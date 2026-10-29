Prometheus

**Prometheus** คือระบบเก็บและค้นข้อมูล metrics สำหรับติดตามสุขภาพและประสิทธิภาพของระบบ เช่น จำนวน HTTP requests, อัตราข้อผิดพลาด, ระยะเวลาตอบสนอง และการใช้ทรัพยากร โดยเก็บข้อมูลเป็น time series พร้อม timestamp และ labels[1]

สำหรับ ZyntroAI ผมแนะนำให้ใช้ Prometheus เป็นแหล่งหลักฐานด้านการทำงานของบริการ แล้วให้ `[[Skill - Daily Briefing]]` สรุปเฉพาะผลที่ตรวจสอบได้ ไม่ใช้ Prometheus แทน GitHub หรือคลังความรู้ Obsidian

## 1. Prometheus อยู่ตรงไหนในระบบของคุณ

```text
Application / Infrastructure
          │
          │ เปิด metrics endpoint
          ▼
      /metrics
          │
          │ Prometheus ดึงข้อมูลเป็นระยะ
          ▼
Prometheus → PromQL → กราฟ / รายงาน
          │
          │ ประเมิน alert rules
          ▼
     Alertmanager
          │
          ▼
อีเมล / ระบบแจ้งเตือน / Webhook
```

Prometheus ใช้ pull model ผ่าน HTTP เป็นหลัก ส่วน Alertmanager จัดกลุ่ม ลดการแจ้งซ้ำ และส่งแจ้งเตือนไปยังปลายทางที่ตั้งไว้ การเขียน alert rule อย่างเดียวยังไม่ทำให้มีอีเมลหรือข้อความแจ้งเตือน ต้องตั้งค่าการเชื่อม Alertmanager เพิ่มด้วย[1][2][3]

### แยกหน้าที่ให้ชัด

| เครื่องมือ | คำถามที่เหมาะสม |
|---|---|
| GitHub | โค้ดอะไรเปลี่ยน? PR หรือ CI เป็นอย่างไร? |
| Prometheus | บริการกำลังตอบสนองดีหรือไม่? มีปัญหาช่วงไหน? |
| Obsidian | เราออกแบบอะไรไว้? เคยตัดสินใจอย่างไร? |
| Copilot / Daily Briefing | หลักฐานเหล่านี้บอกอะไร และควรตรวจเรื่องใดต่อ? |

Repository หนึ่งอาจมีหลายบริการหรือยังไม่ deploy เลย ดังนั้นไม่ควรสร้าง monitoring target จากรายชื่อ repository โดยอัตโนมัติ

## 2. แนวคิดสำคัญที่ควรรู้

### Metrics และ labels

ตัวอย่างข้อมูลสมมติ:

```text
http_requests_total{
  service="orders-api",
  environment="staging",
  method="GET",
  route="/orders",
  status="200"
} 1250
```

อ่านได้ว่า series นี้นับ requests ตามชุด labels ที่ระบุ ไม่ได้หมายถึง requests ทั้งระบบ Prometheus ใช้ metric name และชุด label-value pairs เพื่อจำแนก time series[1]

### PromQL

PromQL คือภาษาสำหรับค้นและคำนวณข้อมูลใน Prometheus เช่น:

```promql
up
```

ค่า `up` ใช้ตรวจผลการ scrape ของ target: `1` หมายถึง scrape สำเร็จ ส่วน `0` หมายถึง scrape ล้มเหลว ไม่ใช่ผลทดสอบว่าทุกฟังก์ชันทางธุรกิจทำงานถูกต้อง[4][5]

> [!warning] ไม่มีข้อมูล ≠ ระบบปกติ
> Target อาจไม่ได้ถูกตั้งค่า ถูกถอดออก หรือไม่มีข้อมูลในช่วงเวลาที่เลือก จึงต้องแยก “ค่าเป็นศูนย์” ออกจาก “ไม่พบ series”

## 3. ทดลองในเครื่องโดยไม่แตะ production

เริ่มจากให้ Prometheus ตรวจตัวเองก่อน ตาม getting-started ของโครงการ วิธีนี้ไม่ต้องเพิ่มโค้ดใน repository ของคุณทันที[4]

### โครงสร้างไฟล์

```text
prometheus-lab/
└── prometheus.yml
```

สร้าง `prometheus.yml`:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets:
          - localhost:9090
```

Prometheus จะอ่าน `/metrics` เป็นค่าเริ่มต้น ดังนั้น target นี้คือ endpoint ของ Prometheus เอง[5][6]

### เริ่มรัน

ดาวน์โหลด binary ที่เหมาะกับระบบปฏิบัติการจาก [Prometheus Download](https://prometheus.io/download/) แล้วรันจากโฟลเดอร์ที่มี config:

```bash
./prometheus --config.file=prometheus.yml
```

จากนั้นเปิด:

```text
http://localhost:9090
```

ใช้ PromQL:

```promql
up{job="prometheus"}
```

หลัง scrape สำเร็จ ควรเห็นค่า `1` สำหรับ target นี้[4]

> [!warning] ขอบเขตการทดลอง
> ใช้ในเครื่องหรือเครือข่ายทดลองที่เชื่อถือได้ก่อน อย่าเปิดพอร์ต monitoring ออกอินเทอร์เน็ตโดยยังไม่ออกแบบการเข้าถึงและการป้องกัน

## 4. เพิ่มบริการจริงทีละตัว

เมื่อ application มี metrics endpoint ที่ Prometheus อ่านได้แล้ว จึงเพิ่ม target:

```yaml
scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets:
          - localhost:9090

  - job_name: orders-api
    metrics_path: /metrics
    static_configs:
      - targets:
          - localhost:8000
        labels:
          service: orders-api
          environment: development
```

ตัวอย่างนี้สมมติว่า application เปิด `/metrics` ที่พอร์ต `8000` และ Prometheus เข้าถึงได้จริง การเพิ่ม config ไม่ได้สร้าง endpoint ให้ application ต้องมี instrumentation หรือ exporter ที่เหมาะสมก่อน[1][5]

หาก Prometheus อยู่ใน container คำว่า `localhost` หมายถึง container นั้น ไม่ใช่ application บนเครื่องอื่น ให้กำหนด address ตามเครือข่ายที่ใช้งานจริง

## 5. ตัวอย่าง query สำหรับบริการ HTTP

ตัวอย่างต่อไปนี้ใช้ได้เมื่อ application ส่ง metric และ labels ตามชื่อที่แสดง ต้องตรวจชื่อจริงก่อนนำไปใช้

### Requests ต่อวินาที

```promql
sum by (service) (
  rate(http_requests_total[5m])
)
```

### สัดส่วน HTTP 5xx

```promql
sum by (service) (
  rate(http_requests_total{status=~"5.."}[5m])
)
/
sum by (service) (
  rate(http_requests_total[5m])
)
```

อย่าตีความผลว่างหรือช่วงที่ไม่มี traffic เป็น “error rate 0%” โดยอัตโนมัติ

### p95 latency สำหรับ classic histogram

```promql
histogram_quantile(
  0.95,
  sum by (le, service) (
    rate(http_request_duration_seconds_bucket[5m])
  )
)
```

Query นี้สมมติว่ามี classic histogram ชื่อ `http_request_duration_seconds` และ bucket series ที่ลงท้าย `_bucket` ไม่ใช่สูตรที่ใช้กับ metric ชื่อใดก็ได้

## 6. นำมาใช้กับ Daily Briefing อย่างถูกต้อง

เพิ่ม “Service Inventory” แยกจาก “Repository Inventory”:

```yaml
---
title: Service - orders-api
type: service
status: proposed
repository: "[[Repo - ZyntroAI - fastapi-python-boilerplate]]"
environment: unknown
metrics-endpoint: ""
prometheus-job: ""
owner: ""
last-verified:
tags:
  - observability
  - service
---
```

ตัวอย่างนี้เป็นโครงเสนอเท่านั้น ยังไม่ได้ยืนยันว่า repository ดังกล่าว deploy เป็น `orders-api`

จากนั้นให้ briefing มีส่วน:

```markdown
## Runtime Health

### ขอบเขต
- เวลาเริ่ม:
- เวลาสิ้นสุด:
- Timezone:
- Environment:
- แหล่งข้อมูล:

### ผลตรวจ
| Service | Scrape status | Error rate | p95 latency | หลักฐาน |
|---|---|---|---|---|

### ข้อมูลที่ขาด
- บริการที่ยังไม่มี metrics
- Query ที่ไม่พบ series
- ช่วงเวลาที่เก็บข้อมูลไม่ครบ

### งานที่เสนอ
- [ ] ตรวจสาเหตุ พร้อมลิงก์หลักฐาน
```

> [!important] Prometheus ไม่ได้ต่อกับ Copilot อัตโนมัติ
> การมีทั้งสองเครื่องมือไม่ได้แปลว่า agent อ่าน metrics ได้แล้ว ต้องกำหนดช่องทางดึงข้อมูลและสิทธิ์ให้ชัด เริ่มจากแนบผล query ที่ตรวจเองก่อน แล้วค่อยพัฒนา integration แบบอ่านอย่างเดียว

## 7. โน้ตสรุปสำหรับ Obsidian

```markdown
---
title: Prometheus
type: technology
status: learning
created: 2026-10-29
tags:
  - observability
  - monitoring
  - prometheus
related:
  - "[[Container Orchestration]]"
  - "[[Kubernetes Cluster]]"
  - "[[Skill - Daily Briefing]]"
  - "[[Repository Inventory]]"
---

# Prometheus

> [!summary]
> ระบบ monitoring ที่เก็บ metrics เป็น time series
> ดึงข้อมูลจาก HTTP endpoints และค้นด้วย PromQL

## ใช้กับ ZyntroAI
- ติดตามสุขภาพบริการที่ deploy แล้ว
- แยกผล scrape ออกจากสุขภาพทางธุรกิจ
- ใช้เป็นหลักฐานประกอบ Daily Briefing
- ไม่ใช้แทน logs, GitHub หรือเอกสารโครงการ

## ขั้นตอนทดลอง
- [ ] ให้ Prometheus scrape ตัวเอง
- [ ] ตรวจ query `up`
- [ ] เลือกบริการทดลองหนึ่งตัว
- [ ] เพิ่ม metrics endpoint
- [ ] ตรวจชื่อ metric และ labels จริง
- [ ] ทดลอง query พร้อมระบุช่วงเวลา
- [ ] ตั้ง alert rule และ Alertmanager ภายหลัง

## ข้อควรระวัง
- ไม่เปิด metrics สู่สาธารณะโดยไม่จำเป็น
- ไม่ใส่ secrets หรือข้อมูลส่วนบุคคลใน metrics
- ไม่ใช้ user ID หรือ request ID เป็น labels โดยไม่ประเมินผล
- ไม่ตีความไม่มีข้อมูลว่าไม่มีปัญหา
- ไม่ยืนยัน production health จาก query เดียว

## เอกสาร
- [Overview](https://prometheus.io/docs/introduction/overview/)
- [Getting started](https://prometheus.io/docs/prometheus/latest/getting_started/)
- [Configuration](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)
- [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/)
```

สำหรับจุดเริ่มต้นของคุณ ให้ทดลอง self-monitoring ก่อน แล้วจึงเลือกบริการที่รันจริงหนึ่งตัว ไม่จำเป็นต้องติดตั้ง Prometheus ครอบคลุมทุก repository ตั้งแต่วันแรก

การอ้างอิง:
[1] Overview | Prometheus https://prometheus.io/docs/introduction/overview/
[2] Alertmanager | Prometheus https://prometheus.io/docs/alerting/latest/alertmanager/
[3] Alerting overview https://prometheus.io/docs/alerting/latest/overview/
[4] Getting started | Prometheus https://prometheus.io/docs/prometheus/latest/getting_started/
[5] Configuration - Prometheus https://prometheus.io/docs/prometheus/latest/configuration/configuration/
[6] Getting started with Prometheus https://prometheus.io/docs/introduction/first_steps/
[7] prometheus.io · docs · prometheusGetting started - Prometheus https://prometheus.io/docs/prometheus/3.14/getting_started/
[8] Alertmanager - Prometheus https://prometheus.io/docs/alerting/0.34/alertmanager/
[9] Configuration https://prometheus.io/docs/prometheus/2.55/configuration/configuration/
[10] prometheus.io › docs › alertingAlerting overview - Prometheus https://prometheus.io/docs/alerting/0.34/overview/
[11] Frequently asked questions - Prometheus https://prometheus.io/docs/introduction/faq/
[12] Download | Prometheus https://prometheus.io/download/
[13] Quickstart | client_java https://prometheus.github.io/client_java/getting-started/quickstart/
[14] Alerting rules https://prometheus.io/docs/prometheus/1.8/configuration/alerting_rules/
[15] Alerting based on metrics https://prometheus.io/docs/tutorials/alerting_based_on_metrics/
![[Obsidian/Skill - Daily Briefing|Skill - Daily Briefing]]