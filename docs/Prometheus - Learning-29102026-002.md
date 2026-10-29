เขียนไฟล์ prometheus.yml ตัวอย่างสำหรับ ZyntroAI

ได้ครับ ด้านล่างคือ **`prometheus.yml`** ตัวอย่างสำหรับ ZyntroAI แบบเริ่มต้นในเครื่อง โดยเปิดใช้งานเฉพาะการตรวจ Prometheus เอง ส่วน API และ Node Exporter เป็นตัวอย่างที่คอมเมนต์ไว้ เพื่อไม่ให้เกิด target ล้มเหลวจากบริการที่ยังไม่ได้ติดตั้ง

ยังไม่ได้ยืนยันว่ามีบริการใดของ ZyntroAI เปิด `/metrics` จริง จึงไม่ผูก repository กับ runtime service โดยอัตโนมัติ

## ไฟล์ `prometheus.yml`

ตัวอย่างนี้สมมติว่า Prometheus รันเป็น binary บนเครื่องของคุณ และบริการตัวอย่างจะรันบนเครื่องเดียวกัน

```yaml
# prometheus.yml
# ZyntroAI — local development example
#
# Active target:
#   - Prometheus itself
#
# Optional examples:
#   - Application metrics on localhost:8000
#   - Node Exporter on localhost:9100
#
# Do not store passwords, API keys, or tokens in this file.

global:
  # Default collection interval for all jobs.
  scrape_interval: 15s

  # Maximum duration of a scrape.
  # Keep this shorter than or equal to scrape_interval.
  scrape_timeout: 10s

  # Interval for evaluating recording and alerting rules.
  evaluation_interval: 15s

  # These labels are attached when communicating with external systems.
  # They do not automatically appear on every locally stored metric.
  external_labels:
    organization: zyntroai
    monitor: zyntroai-local

scrape_configs:
  # ------------------------------------------------------------
  # 1. Prometheus self-monitoring — enabled
  # ------------------------------------------------------------
  - job_name: prometheus

    scheme: http
    metrics_path: /metrics

    static_configs:
      - targets:
          - localhost:9090
        labels:
          project: zyntroai
          environment: development
          service: prometheus

  # ------------------------------------------------------------
  # 2. Application metrics — optional
  #
  # Enable only after verifying that this endpoint exists.
  # "orders-api" is an example service name, not a verified
  # deployment associated with a ZyntroAI repository.
  # ------------------------------------------------------------
  # - job_name: zyntroai-api
  #
  #   scheme: http
  #   metrics_path: /metrics
  #
  #   static_configs:
  #     - targets:
  #         - localhost:8000
  #       labels:
  #         project: zyntroai
  #         environment: development
  #         service: orders-api

  # ------------------------------------------------------------
  # 3. Host metrics through Node Exporter — optional
  #
  # Enable only after installing and starting Node Exporter.
  # ------------------------------------------------------------
  # - job_name: zyntroai-node
  #
  #   scheme: http
  #   metrics_path: /metrics
  #
  #   static_configs:
  #     - targets:
  #         - localhost:9100
  #       labels:
  #         project: zyntroai
  #         environment: development
  #         service: host-metrics
```

การใช้ `global`, `scrape_configs`, `job_name` และ `static_configs` เป็นรูปแบบมาตรฐานของ Prometheus ส่วน self-monitoring เป็นตัวอย่างเริ่มต้นในเอกสารทางการ[1][2]

## ตรวจสอบก่อนเริ่มรัน

บันทึกเป็น `prometheus.yml` แล้วตรวจด้วย:

```bash
promtool check config prometheus.yml
```

คำสั่งนี้ตรวจความถูกต้องของ configuration แต่ไม่ได้ยืนยันว่า target เปิดอยู่หรือเข้าถึงได้จริง[3]

หากผ่านแล้ว เริ่ม Prometheus:

```bash
./prometheus \
  --config.file=prometheus.yml \
  --web.listen-address=127.0.0.1:9090
```

ตัวอย่างนี้กำหนดให้หน้าเว็บรับการเชื่อมต่อเฉพาะเครื่องตัวเอง เหมาะกับการทดลองก่อนเปิดให้เครื่องอื่นเข้าถึง จากนั้นเปิด:

```text
http://127.0.0.1:9090
```

Prometheus รองรับการระบุไฟล์ผ่าน `--config.file` ตามตัวอย่าง getting-started[2][4]

## Query สำหรับตรวจผล

### ตรวจว่า scrape Prometheus สำเร็จหรือไม่

```promql
up{job="prometheus"}
```

ค่า `1` หมายถึง scrape สำเร็จ ส่วน `0` หมายถึง scrape ล้มเหลว ไม่ใช่การยืนยันสุขภาพของ application ทั้งระบบ[5]

### ดู target ในโครงการ ZyntroAI

```promql
up{project="zyntroai"}
```

Query นี้ใช้ได้เพราะเราเพิ่ม `project` ไว้ใน `static_configs.labels` ไม่ใช่เพราะ `external_labels` ซึ่งมีหน้าที่สำหรับการสื่อสารกับระบบภายนอก[1][2]

## เมื่อพร้อมเพิ่ม API

ก่อนเอาคอมเมนต์ส่วน `zyntroai-api` ออก ให้ตรวจ endpoint:

```bash
curl --fail --show-error \
  http://127.0.0.1:8000/metrics
```

สิ่งที่ต้องตรวจ:

- Endpoint มีอยู่จริงและส่ง metrics ในรูปแบบที่ Prometheus รองรับ
- พอร์ตและ path ตรงกับ application
- Prometheus เข้าถึง endpoint จากเครือข่ายที่มันรันอยู่ได้
- ไม่มี secrets หรือข้อมูลส่วนบุคคลปะปนใน metrics

การเพิ่ม target ใน YAML ไม่ได้สร้าง `/metrics` ให้ application ต้องเพิ่ม instrumentation หรือ exporter ก่อน[1][6]

> [!warning] หากใช้ Docker Compose
> `localhost:8000` ภายใน container ของ Prometheus หมายถึง container นั้นเอง ไม่ใช่ API container ให้เปลี่ยน target เป็นชื่อ service ที่เข้าถึงได้ใน network เดียวกัน เช่น `api:8000` โดยใช้ชื่อจริงจาก `compose.yaml` ของคุณ

## ขอบเขตของไฟล์นี้

ไฟล์นี้ยังไม่ตั้งค่า:

- Alert rules และ Alertmanager
- การส่งแจ้งเตือน
- การเก็บข้อมูลระยะยาวหรือ remote storage
- Production authentication และ TLS
- Kubernetes service discovery

Prometheus ประเมิน alert rules ส่วน Alertmanager จัดการการรวมกลุ่ม ลดแจ้งซ้ำ และส่งต่อการแจ้งเตือน จึงควรเพิ่มส่วนนี้หลังจากยืนยันว่า scrape บริการจริงได้แล้ว[7][8]

สำหรับ Obsidian ให้เชื่อมโน้ต configuration นี้กับ `[[Prometheus]]`, `[[Service Inventory]]` และ `[[Skill - Daily Briefing]]` โดยบันทึกด้วยว่าเป็น configuration สำหรับ local development ไม่ใช่ production ที่ตรวจสอบแล้ว

การอ้างอิง:
[1] Configuration - Prometheus https://prometheus.io/docs/prometheus/latest/configuration/configuration/
[2] prometheus.io · docs · prometheusGetting started - Prometheus https://prometheus.io/docs/prometheus/3.11/getting_started/
[3] promtool https://prometheus.io/docs/prometheus/latest/command-line/promtool/
[4] prometheus | Prometheus https://prometheus.io/docs/prometheus/3.14/command-line/prometheus/
[5] Getting started | Prometheus https://prometheus.io/docs/prometheus/latest/getting_started/
[6] Overview | Prometheus https://prometheus.io/docs/introduction/overview/
[7] Alertmanager | Prometheus https://prometheus.io/docs/alerting/latest/alertmanager/
[8] Alerting overview https://prometheus.io/docs/alerting/latest/overview/
[9] HTTP configuration for promtool - Prometheus https://prometheus.io/docs/prometheus/3.9/configuration/promtool/
[10] prometheus.io › docs › prometheuspromtool | Prometheus https://prometheus.io/docs/prometheus/3.15/command-line/promtool/
[[Obsidian/Prometheus - learning-29102026-001|Prometheus - learning-29102026-001]]
[[Obsidian/Repository Inventory|Repository Inventory]]

เพิ่ม service สำหรับ Docker เข้าไปในไฟล์นี้อย่างไร

เพิ่มได้โดยใส่ job ชื่อ **`docker`** ใต้ `scrape_configs` ใน `prometheus.yml` แต่ต้องเปิด metrics ของ Docker Engine ก่อน ตัวอย่างด้านล่างต่อจากรูปแบบเดิมที่ Prometheus รันเป็น binary บนเครื่องเดียวกับ Docker Engine[1][2]

> [!note] เลือกสิ่งที่ต้องการตรวจ
> - Docker Engine metrics: ตรวจการทำงานของ Docker daemon
> - Container metrics ผ่าน cAdvisor: ตรวจ CPU, memory และข้อมูลทรัพยากรของ containers
>
> ทั้งสองอย่างไม่เหมือนกัน หากต้องการดูทรัพยากรราย container ให้เพิ่ม cAdvisor แยกภายหลัง[1][3]

## 1. เปิด metrics ของ Docker Engine

สำหรับ Docker Engine บน Linux ให้เพิ่มค่าต่อไปนี้ใน `/etc/docker/daemon.json`:

```json
{
  "metrics-addr": "127.0.0.1:9323"
}
```

ถ้าไฟล์มี configuration อยู่แล้ว ให้เพิ่มเฉพาะ property `metrics-addr` เข้าไป อย่าเขียนทับค่าทั้งไฟล์ ส่วน Docker Desktop ให้ปรับ configuration ของ Docker Engine ผ่านหน้าการตั้งค่าของโปรแกรม[1][4]

ตัวอย่างเมื่อมีค่าเดิม:

```json
{
  "log-driver": "json-file",
  "metrics-addr": "127.0.0.1:9323"
}
```

> [!warning] การ restart มีผลกับระบบ
> Docker ต้องโหลด configuration ใหม่จึงจะเปิด metrics ตามที่ตั้งไว้ สำหรับ Linux ที่ใช้ systemd สามารถ restart ด้วยคำสั่งด้านล่าง แต่ควรตรวจผลกระทบต่อ containers และเลือกช่วงเวลาที่เหมาะสมก่อน[1]

```bash
sudo systemctl restart docker
```

ทดสอบว่า endpoint ตอบกลับ:

```bash
curl --fail --show-error \
  http://127.0.0.1:9323/metrics
```

Docker จะเปิด metrics ที่ Prometheus อ่านได้ผ่านพอร์ต `9323` ตาม configuration นี้[2]

## 2. เพิ่ม Docker ลงใน `prometheus.yml`

นี่คือไฟล์ฉบับรวม โดยคง self-monitoring เดิมและเพิ่ม Docker Engine:

```yaml
# prometheus.yml
# ZyntroAI — local development
#
# Assumption:
# Prometheus binary and Docker Engine run on the same machine.

global:
  scrape_interval: 15s
  scrape_timeout: 10s
  evaluation_interval: 15s

  external_labels:
    organization: zyntroai
    monitor: zyntroai-local

scrape_configs:
  # Prometheus self-monitoring
  - job_name: prometheus
    scheme: http
    metrics_path: /metrics

    static_configs:
      - targets:
          - 127.0.0.1:9090
        labels:
          project: zyntroai
          environment: development
          service: prometheus

  # Docker Engine metrics
  - job_name: docker
    scheme: http
    metrics_path: /metrics

    static_configs:
      - targets:
          - 127.0.0.1:9323
        labels:
          project: zyntroai
          environment: development
          service: docker-engine
```

ถ้าแก้ไฟล์เดิม ให้เพิ่มเฉพาะบล็อก `- job_name: docker` ต่อท้ายรายการเดิม ไม่สร้าง `scrape_configs:` ซ้ำ รูปแบบการเพิ่ม Docker target สอดคล้องกับตัวอย่างของ Docker และ Prometheus[1][5]

## 3. ตรวจ config และเริ่ม Prometheus ใหม่

```bash
promtool check config prometheus.yml
```

เมื่อผ่าน ให้หยุด Prometheus ที่กำลังรันใน terminal แล้วเริ่มใหม่:

```bash
./prometheus \
  --config.file=prometheus.yml \
  --web.listen-address=127.0.0.1:9090
```

`promtool check config` ตรวจ configuration แต่ไม่ได้ยืนยันว่า Docker endpoint เข้าถึงได้จริง ต้องตรวจ target เพิ่มในขั้นถัดไป[6]

## 4. ตรวจผลใน Prometheus

เปิด:

```text
http://127.0.0.1:9090
```

แล้วใช้ query:

```promql
up{job="docker"}
```

- `1`: Prometheus ดึง metrics จาก Docker สำเร็จ
- `0`: Prometheus พยายามดึง แต่ไม่สำเร็จ
- ไม่มีผลลัพธ์: ตรวจว่า job ถูกโหลดแล้วหรือไม่ และช่วงเวลาที่เลือกมีข้อมูลหรือไม่

ค่า `up` ยืนยันความสำเร็จของการ scrape ไม่ได้ยืนยันว่า containers หรือ application ทุกตัวทำงานถูกต้อง[7]

## 5. ถ้า Prometheus รันใน Docker container

อย่าใช้ `127.0.0.1:9323` แบบตัวอย่างข้างบนทันที เพราะใน container จะหมายถึงตัว container เอง

ต้องออกแบบเส้นทางให้ Prometheus container เข้าถึง metrics บน host ได้จริง ตัวอย่างเอกสาร Docker ใช้:

```yaml
- job_name: docker
  static_configs:
    - targets:
        - host.docker.internal:9323
```

อย่างไรก็ตาม ชื่อนี้ไม่ได้ทำให้ endpoint ที่ bind เฉพาะ host loopback เข้าถึงได้โดยอัตโนมัติทุกระบบ ต้องตรวจทั้ง host-name resolution, network และ address ที่ Docker metrics รับฟังอยู่ก่อน[1][8]

> [!warning] อย่าแก้ด้วย `0.0.0.0` โดยไม่ประเมินความเสี่ยง
> การเปลี่ยน `metrics-addr` เป็น `0.0.0.0:9323` ทำให้ endpoint รับการเชื่อมต่อจากเครือข่ายที่กว้างขึ้น ควรจำกัดด้วย private interface และ firewall ตามสภาพแวดล้อม ไม่เปิดพอร์ต metrics ออกอินเทอร์เน็ต[1]

สำหรับโครงสร้างเดิมของคุณ ให้เริ่มด้วย Prometheus binary + Docker Engine บนเครื่องเดียวกันก่อน จะใช้ `127.0.0.1` ได้ตรงไปตรงมา แล้วบันทึกขั้นตอนนี้ไว้ใน `[[Docker Monitoring]]` เชื่อมกับ `[[Prometheus]]` และ `[[Service Inventory]]` ครับ

การอ้างอิง:
[1] Collect Docker Metrics With Prometheus https://docs.docker.com/engine/daemon/prometheus/
[2] dockerd https://docs.docker.com/reference/cli/dockerd/
[3] Monitoring Docker container metrics using cAdvisor https://prometheus.io/docs/guides/cadvisor/
[4] Docker daemon configuration overview https://docs.docker.com/engine/daemon/
[5] prometheus/documentation/examples/prometheus-docker.yml at main · prometheus/prometheus https://github.com/prometheus/prometheus/blob/main/documentation/examples/prometheus-docker.yml
[6] promtool https://prometheus.io/docs/prometheus/latest/command-line/promtool/
[7] Getting started | Prometheus https://prometheus.io/docs/prometheus/latest/getting_started/
[8] metrics-addr should be 0.0.0.0:9323 for a dockerized prometheus to ... https://github.com/docker/docs/issues/21632
[9] Docker Swarm https://prometheus.io/docs/guides/dockerswarm/
[10] Installation https://prometheus.io/docs/prometheus/latest/installation/
[11] Docker メトリクスを Prometheus で収集 https://docs.docker.jp/v19.03/config/daemon/prometheus.html
[12] Instructions for collecting Docker metrics using Prometheus from docs is not reproducible · Issue #22367 · docker/docs https://github.com/docker/docs/issues/22367
[13] Docker - Prometheus | MTI TEK https://mtitek.com/tutorials/docker/prometheus
[14] prometheus/documentation/examples/prometheus-docker.yml at release-3.15 · prometheus/prometheus https://github.com/prometheus/prometheus/blob/release-3.15/documentation/examples/prometheus-docker.yml
[15] Prometheus isn't scrapping cadvisor and node-exporter are ... https://discuss.prometheus.io/t/prometheus-isnt-scrapping-cadvisor-and-node-exporter-are-down/316
[16] Docker Target Always Showing State as 'DOWN' · prometheus prometheus · Discussion #12797 https://github.com/prometheus/prometheus/discussions/12797
[17] cadvisor/docs/storage/prometheus.md at release-v0.47 · google/cadvisor https://github.com/google/cadvisor/blob/release-v0.47/docs/storage/prometheus.md?plain=1
นำไฟล์นี้ไปรันใน Docker Compose แทนได้ไหม

ได้ครับ ย้าย **Prometheus มารันด้วย Docker Compose** ได้ โดย mount `prometheus.yml` เข้า container และใช้ named volume เก็บ metrics เพื่อไม่ให้ข้อมูลหายเมื่อสร้าง container ใหม่[1][2]

แต่ไฟล์เดิมมี Docker Engine target เป็น `127.0.0.1:9323` ซึ่งจะใช้ตรง ๆ ใน container แบบ bridge ไม่ได้ เพราะจะชี้กลับมาที่ Prometheus container เอง ผมจะแยกตัวอย่างเป็นแบบเริ่มต้นที่ใช้ได้ก่อน และแบบเก็บ Docker Engine metrics บน Linux

## 1. จัดโครงสร้างไฟล์

```text
zyntroai-monitoring/
├── compose.yaml
└── prometheus.yml
```

## 2. สร้าง `compose.yaml`

ตัวอย่างนี้เปิดหน้าเว็บเฉพาะบนเครื่อง host และไม่ mount Docker socket เข้า Prometheus:

```yaml
# compose.yaml
name: zyntroai-monitoring

services:
  prometheus:
    image: prom/prometheus:latest
    restart: unless-stopped

    ports:
      - "127.0.0.1:9090:9090"

    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.path=/prometheus"
      - "--storage.tsdb.retention.time=15d"

    volumes:
      - type: bind
        source: ./prometheus.yml
        target: /etc/prometheus/prometheus.yml
        read_only: true

      - prometheus-data:/prometheus

volumes:
  prometheus-data:
```

Prometheus รองรับการ mount configuration ที่ `/etc/prometheus/prometheus.yml` และเก็บข้อมูลที่ `/prometheus` โดยเอกสารแนะนำ named volume สำหรับจัดการข้อมูลข้ามการอัปเกรด container[1]

> [!warning] Image version
> `latest` ใช้เพื่อทดลองให้เริ่มได้ง่าย แต่เปลี่ยนได้เมื่อ pull ครั้งใหม่ ก่อนใช้งานจริงควรเลือก version ที่ตรวจสอบแล้วและ pin tag หรือ digest ไม่ควรอัปเกรด production โดยไม่ทดสอบ

## 3. ใช้ `prometheus.yml` สำหรับทดลองก่อน

เริ่มด้วย self-monitoring และยังไม่เปิด Docker target:

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  scrape_timeout: 10s
  evaluation_interval: 15s

  external_labels:
    organization: zyntroai
    monitor: zyntroai-local

scrape_configs:
  - job_name: prometheus
    metrics_path: /metrics

    static_configs:
      - targets:
          - localhost:9090
        labels:
          project: zyntroai
          environment: development
          service: prometheus
```

ในกรณีนี้ `localhost:9090` ถูกต้อง เพราะเราต้องการให้ Prometheus scrape ตัวมันเองภายใน container[3]

## 4. ตรวจ config และเริ่มรัน

จากโฟลเดอร์ `zyntroai-monitoring/`:

```bash
# ตรวจรูปแบบ Compose
docker compose config

# ตรวจ Prometheus configuration
docker compose run --rm --no-deps \
  --entrypoint /bin/promtool \
  prometheus check config /etc/prometheus/prometheus.yml

# เริ่มบริการ
docker compose up -d

# ตรวจสถานะและ logs
docker compose ps
docker compose logs --tail=100 prometheus
```

`promtool check config` ตรวจ configuration แต่ไม่ได้ยืนยันว่า target เข้าถึงได้จริง[4]

เปิด:

```text
http://127.0.0.1:9090
```

แล้ว query:

```promql
up{job="prometheus"}
```

หลัง scrape สำเร็จควรได้ `1`[5]

## 5. เพิ่ม Docker Engine metrics บน Linux

หากคุณใช้ Docker Engine บน Linux และตั้ง daemon ไว้แบบเดิม:

```json
{
  "metrics-addr": "127.0.0.1:9323"
}
```

วิธีที่ตรงไปตรงมาคือให้ Prometheus ใช้ host networking เพื่อเข้าถึง host loopback โดยไม่ต้องเปิด metrics ออกทุก interface รูปแบบนี้เหมาะกับเครื่อง Linux ที่เชื่อถือได้ ไม่ใช่ตัวอย่างข้ามแพลตฟอร์ม[6][7]

### เปลี่ยน `compose.yaml`

เพิ่ม `network_mode: host` และลบ `ports:` ออก:

```yaml
name: zyntroai-monitoring

services:
  prometheus:
    image: prom/prometheus:latest
    restart: unless-stopped

    network_mode: host

    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.path=/prometheus"
      - "--storage.tsdb.retention.time=15d"
      - "--web.listen-address=127.0.0.1:9090"

    volumes:
      - type: bind
        source: ./prometheus.yml
        target: /etc/prometheus/prometheus.yml
        read_only: true

      - prometheus-data:/prometheus

volumes:
  prometheus-data:
```

> [!warning] ข้อแลกเปลี่ยน
> Host networking ลดการแยก network ระหว่าง container กับ host ใช้เฉพาะเมื่อเข้าใจขอบเขต และไม่ใส่ `ports:` ร่วมกับรูปแบบนี้

### เพิ่ม Docker target ใน `prometheus.yml`

ต่อท้ายรายการใต้ `scrape_configs:` เดิม:

```yaml
  - job_name: docker
    metrics_path: /metrics

    static_configs:
      - targets:
          - 127.0.0.1:9323
        labels:
          project: zyntroai
          environment: development
          service: docker-engine
```

Docker Engine ต้องเปิด metrics endpoint อยู่ก่อนแล้ว การเพิ่ม scrape job ไม่ได้เปิด daemon metrics ให้เอง[8]

จากนั้นตรวจ config อีกครั้ง แล้วรัน:

```bash
docker compose up -d
docker compose restart prometheus
```

ตรวจ:

```promql
up{job="docker"}
```

ค่า `1` ยืนยันว่า scrape Docker metrics สำเร็จ ไม่ได้แปลว่า application ในทุก container ทำงานถูกต้อง[5]

## 6. หากใช้ Docker Desktop บน Windows หรือ macOS

ใช้ Compose แบบ bridge ในข้อ 2 เป็นจุดเริ่มต้น แล้วพิจารณา Docker target:

```yaml
  - job_name: docker
    static_configs:
      - targets:
          - host.docker.internal:9323
        labels:
          project: zyntroai
          environment: development
          service: docker-engine
```

Docker Desktop มีชื่อ `host.docker.internal` สำหรับเชื่อมจาก container ไปยัง host แต่ยังต้องตรวจว่า endpoint metrics ของ Docker Engine ในสภาพแวดล้อมนั้นรับการเชื่อมต่อได้จริง อย่าเปลี่ยน `metrics-addr` เป็น `0.0.0.0` เพื่อแก้ปัญหาโดยไม่ตรวจ firewall และขอบเขตการเปิดพอร์ต[8][9]

## 7. หยุดและเก็บข้อมูลอย่างระมัดระวัง

หยุดบริการโดยเก็บ named volume ไว้:

```bash
docker compose down
```

อย่าเติม `-v` หากยังต้องการข้อมูล metrics เพราะคำสั่งนี้จะลบ named volume ที่ Compose จัดการด้วย:

```bash
# ใช้เฉพาะเมื่อจงใจลบข้อมูล metrics
docker compose down -v
```

Compose ใช้ named volume เดิมในการเริ่มครั้งต่อไป ตราบใดที่ volume ยังไม่ได้ถูกลบ[2][10]

สำหรับ ZyntroAI ให้เริ่มจาก self-monitoring ใน Compose ก่อน แล้วเปิด Docker Engine target ตามระบบปฏิบัติการจริง วิธีนี้ช่วยแยกได้ว่าปัญหาเกิดจาก Prometheus configuration หรือเส้นทาง network ไปยัง Docker daemon โดยไม่ต้องเปิดพอร์ตเพิ่มเกินจำเป็น

การอ้างอิง:
[1] prometheus.io · docs · prometheusInstallation - Prometheus https://prometheus.io/docs/prometheus/3.15/installation/
[2] Define and manage volumes in Docker Compose | Docker Docs https://docs.docker.com/reference/compose-file/volumes/
[3] prometheus.io · docs · prometheusGetting started - Prometheus https://prometheus.io/docs/prometheus/3.11/getting_started/
[4] promtool https://prometheus.io/docs/prometheus/latest/command-line/promtool/
[5] Getting started | Prometheus https://prometheus.io/docs/prometheus/latest/getting_started/
[6] dockerd https://docs.docker.com/reference/cli/dockerd/
[7] Prometheus with docker works on 0.0.0.0:9323 but not with 127.0 ... https://forums.docker.com/t/prometheus-with-docker-works-on-0-0-0-0-9323-but-not-with-127-0-0-1-in-daemon-json/147357
[8] Collect Docker Metrics With Prometheus https://docs.docker.com/engine/daemon/prometheus/
[9] Explore networking how-tos on Docker Desktop https://docs.docker.com/desktop/features/networking/networking-how-tos/
[10] Docker Documentation https://docs.docker.com/engine/storage/volumes.md
[11] Configuration | Prometheus https://prometheus.io/docs/prometheus/3.12/configuration/configuration/
[12] Docker section: fix review findings on getting-started, monitoring, S… · albertoirurueta/docs@97a8ade https://github.com/albertoirurueta/docs/commit/97a8adeafc98eb1a22a22322857e13f6c0ae2f07
[13] Allow `--metrics-addr=host-gateway:9323` to only export metrics internally · Issue #42816 · moby/moby https://github.com/moby/moby/issues/42816
อยากเพิ่ม Grafana เข้ามาใน docker-compose นี้ด้วย

ได้ครับ เพิ่ม **Grafana** เป็น service อีกตัวใน Docker Compose และตั้งให้เชื่อม Prometheus อัตโนมัติผ่าน provisioning ได้เลย โดย Grafana จะใช้ URL `http://prometheus:9090` บน network ภายใน Compose ไม่ใช่ `localhost:9090`[1]

ตัวอย่างหลักด้านล่างใช้ bridge network เหมาะสำหรับเริ่มทดลอง หากคุณเลือก `network_mode: host` จากตัวอย่างก่อนหน้า ให้ดูส่วนท้ายก่อนนำไปใช้

## 1. โครงสร้างไฟล์

```text
zyntroai-monitoring/
├── compose.yaml
├── prometheus.yml
├── .gitignore
├── secrets/
│   └── grafana_admin_password.txt
└── grafana/
    └── provisioning/
        └── datasources/
            └── prometheus.yaml
```

## 2. แก้ `compose.yaml`

```yaml
name: zyntroai-monitoring

services:
  prometheus:
    image: prom/prometheus:latest
    restart: unless-stopped

    ports:
      - "127.0.0.1:9090:9090"

    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.path=/prometheus"
      - "--storage.tsdb.retention.time=15d"

    volumes:
      - type: bind
        source: ./prometheus.yml
        target: /etc/prometheus/prometheus.yml
        read_only: true

      - prometheus-data:/prometheus

  grafana:
    image: grafana/grafana:latest
    restart: unless-stopped

    ports:
      - "127.0.0.1:3000:3000"

    environment:
      GF_SECURITY_ADMIN_USER: admin
      GF_SECURITY_ADMIN_PASSWORD__FILE: /run/secrets/grafana_admin_password
      GF_AUTH_ANONYMOUS_ENABLED: "false"
      GF_USERS_ALLOW_SIGN_UP: "false"

    secrets:
      - grafana_admin_password

    volumes:
      - grafana-data:/var/lib/grafana

      - type: bind
        source: ./grafana/provisioning/datasources
        target: /etc/grafana/provisioning/datasources
        read_only: true

    depends_on:
      - prometheus

secrets:
  grafana_admin_password:
    file: ./secrets/grafana_admin_password.txt

volumes:
  prometheus-data:
  grafana-data:
```

Grafana รองรับการอ่านค่ารหัสผ่านจากไฟล์ด้วย `GF_SECURITY_ADMIN_PASSWORD__FILE` จึงไม่ต้องใส่รหัสผ่านจริงใน YAML ส่วน named volumes แยกข้อมูล metrics ของ Prometheus ออกจากข้อมูลและการตั้งค่าของ Grafana[2][3]

> [!warning] สำหรับ local lab
> ตัวอย่างใช้ `latest` เพื่อเริ่มทดลอง ก่อนใช้งานจริงควร pin image version หรือ digest ที่ทดสอบแล้ว และสำรองข้อมูลก่อนอัปเกรด

## 3. สร้างไฟล์รหัสผ่าน

สร้างโฟลเดอร์:

```bash
mkdir -p secrets grafana/provisioning/datasources
```

ใส่รหัสผ่านที่รัดกุมในไฟล์นี้ด้วย text editor:

```text
secrets/grafana_admin_password.txt
```

ไฟล์ควรมีเฉพาะรหัสผ่าน ไม่ต้องใส่ `PASSWORD=` หรือเครื่องหมายคำพูด

เพิ่ม `.gitignore`:

```gitignore
# Local credentials
secrets/
.env
.env.*
```

> [!warning] Secret ยังเป็นไฟล์บนเครื่อง
> วิธีนี้ช่วยไม่ให้รหัสผ่านอยู่ใน Compose YAML แต่ไม่ได้ทำให้ไฟล์ต้นทางถูกเข้ารหัส ควรจำกัดผู้ที่อ่านโฟลเดอร์นี้ได้ และอย่านำเข้า Git หรือคลังความรู้ที่ส่งให้ AI

## 4. ตั้ง Prometheus data source อัตโนมัติ

สร้าง `grafana/provisioning/datasources/prometheus.yaml`:

```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    uid: zyntroai-prometheus
    type: prometheus
    access: proxy

    url: http://prometheus:9090

    isDefault: true
    editable: false

    jsonData:
      httpMethod: POST
      timeInterval: 15s
```

Grafana รองรับ data source provisioning ผ่าน YAML และ `prometheus` ใน URL คือชื่อ service ที่ Grafana เข้าถึงได้ภายใน Compose ส่วน `timeInterval` ควรสอดคล้องกับ scrape interval ซึ่งตัวอย่างนี้ตั้งไว้ 15 วินาที[1][4][5]

## 5. ใช้ `prometheus.yml` เดิมได้

สำหรับ bridge network ให้เริ่มจาก self-monitoring:

```yaml
global:
  scrape_interval: 15s
  scrape_timeout: 10s
  evaluation_interval: 15s

  external_labels:
    organization: zyntroai
    monitor: zyntroai-local

scrape_configs:
  - job_name: prometheus
    metrics_path: /metrics

    static_configs:
      - targets:
          - localhost:9090
        labels:
          project: zyntroai
          environment: development
          service: prometheus
```

ตรงนี้ `localhost:9090` ยังถูกต้อง เพราะเป็น Prometheus scrape ตัวเอง ไม่ใช่ URL ที่ Grafana ใช้เชื่อมต่อ[6]

หากเพิ่ม Docker Engine target ไว้แล้ว ให้คงไว้เฉพาะเมื่อยืนยันว่า container เข้าถึง endpoint นั้นได้จริง อย่าใช้ `127.0.0.1:9323` ใน bridge container เพื่อหมายถึง Docker host

## 6. ตรวจและเริ่มระบบ

รันจากโฟลเดอร์เดียวกับ `compose.yaml`:

```bash
docker compose config

docker compose run --rm --no-deps \
  --entrypoint /bin/promtool \
  prometheus check config /etc/prometheus/prometheus.yml

docker compose up -d

docker compose ps
docker compose logs --tail=100 grafana
```

`promtool` ตรวจ configuration ของ Prometheus ไม่ได้ตรวจว่า Grafana เชื่อม data source สำเร็จ จึงต้องทดสอบเพิ่มเติมในหน้า Grafana[7]

เปิด:

```text
Grafana:     http://127.0.0.1:3000
Prometheus:  http://127.0.0.1:9090
```

เข้าสู่ Grafana ด้วย:

- Username: `admin`
- Password: ค่าที่ใส่ใน `grafana_admin_password.txt`

รหัสผ่านนี้ใช้สำหรับสร้าง admin ตอนเริ่มฐานข้อมูล Grafana ครั้งแรก หากมี `grafana-data` เดิมอยู่แล้ว การเปลี่ยนไฟล์ secret ไม่ควรถือว่าจะเปลี่ยนรหัสผ่านบัญชีเดิมให้ทันที ให้เปลี่ยนผ่านระบบจัดการบัญชีแทน

## 7. ทดสอบด้วย query แรก

ใน Grafana:

1. เปิด Explore
2. เลือก data source `Prometheus`
3. ใส่ query:

```promql
up{project="zyntroai"}
```

4. กด Run query

ควรเห็น series ของ Prometheus หลัง scrape สำเร็จ แล้วค่อยสร้าง dashboard จากผลนี้ ค่า `up = 1` หมายถึง scrape สำเร็จ ไม่ได้ยืนยันสุขภาพของทุก application[8]

> [!note] Dashboard Docker ยังไม่ปรากฏครบเอง
> การเพิ่ม Grafana ไม่ได้สร้าง container CPU/memory metrics ให้ ต้องติดตั้งและตั้งค่า exporter ที่เหมาะสม เช่น cAdvisor ก่อน จึงจะใช้ dashboard ที่อาศัย metrics เหล่านั้นได้[9]

## 8. หากใช้ `network_mode: host` สำหรับ Prometheus อยู่แล้ว

อย่าผสมกับ provisioning ข้างต้นโดยไม่ปรับ network เพราะ Grafana บน bridge จะไม่เชื่อมไปยัง Prometheus ที่ bind เฉพาะ host loopback ผ่าน `http://prometheus:9090` ได้ตามตัวอย่างนั้น

สำหรับ local Linux lab ทางเลือกหนึ่งคือ:

- คง Prometheus เป็น host networking
- เพิ่ม `network_mode: host` ให้ Grafana ด้วย
- ลบ `ports:` ของ Grafana
- เพิ่ม environment ให้ Grafana ฟังเฉพาะ loopback:

```yaml
environment:
  GF_SERVER_HTTP_ADDR: "127.0.0.1"
  GF_SERVER_HTTP_PORT: "3000"
  GF_SECURITY_ADMIN_USER: admin
  GF_SECURITY_ADMIN_PASSWORD__FILE: /run/secrets/grafana_admin_password
  GF_AUTH_ANONYMOUS_ENABLED: "false"
  GF_USERS_ALLOW_SIGN_UP: "false"
```

และเปลี่ยน data source URL เป็น:

```yaml
url: http://127.0.0.1:9090
```

เลือกให้สอดคล้องกันทั้ง stack: bridge network สำหรับตัวอย่างหลัก หรือ host networking สำหรับ Linux lab ที่ต้องใช้ host loopback อย่าเปลี่ยนสลับเฉพาะบาง service โดยไม่ทดสอบเส้นทางเชื่อมต่อ

สุดท้าย ใช้ `docker compose down` เพื่อหยุดระบบโดยเก็บข้อมูลไว้ และหลีกเลี่ยง `docker compose down -v` หากยังต้องการ metrics, dashboards และบัญชี Grafana เพราะตัวเลือก `-v` จะลบ named volumes ด้วย[3][10]

การอ้างอิง:
[1] Monitor a Golang application with Prometheus and Grafana https://docs.docker.com/guides/go-prometheus-monitoring/
[2] Configure a Grafana Docker image https://grafana.com/docs/grafana/latest/setup-grafana/configure-docker/
[3] Define and manage volumes in Docker Compose | Docker Docs https://docs.docker.com/reference/compose-file/volumes/
[4] Configure the Prometheus data source | Grafana documentation https://grafana.com/docs/grafana/latest/datasources/prometheus/configure/
[5] Provision Grafana | Grafana documentation https://grafana.com/docs/grafana/latest/administration/provisioning/
[6] prometheus.io · docs · prometheusGetting started - Prometheus https://prometheus.io/docs/prometheus/3.11/getting_started/
[7] promtool https://prometheus.io/docs/prometheus/latest/command-line/promtool/
[8] Getting started | Prometheus https://prometheus.io/docs/prometheus/latest/getting_started/
[9] Monitoring Docker container metrics using cAdvisor https://prometheus.io/docs/guides/cadvisor/
[10] Docker Documentation https://docs.docker.com/engine/storage/volumes.md
[11] Configure a Grafana Docker image | Grafana documentation https://grafana.com/docs/grafana/v13.2/setup-grafana/configure-docker/
[12] Grafana Labs https://grafana.com/docs/grafana/latest/setup-grafana/configure-docker.md
[13] grafana.com · v13 · setup-grafanaGrafana Labs https://grafana.com/docs/grafana/v13.1/setup-grafana/configure-docker.md
[14] Docker and system monitoring - Grafana Labs https://grafana.com/grafana/dashboards/13496-docker-and-system-monitoring/
[15] Docker and system monitoring https://grafana.com/grafana/dashboards/893-main/
[16] Docker and system monitoring (nodeexporter v1.3.1) - Grafana Labs https://grafana.com/grafana/dashboards/16310-docker-and-system-monitoring/
สร้าง datasource ให้อัตโนมัติผ่าน provisioning

ได้ครับ ตั้งค่า **data source provisioning** ให้ Grafana สร้างการเชื่อมต่อ Prometheus อัตโนมัติเมื่อเริ่มทำงานได้ โดยไม่ต้องเพิ่มผ่านหน้า UI ทุกครั้ง[1]

ตัวอย่างนี้ต่อจาก Compose แบบ bridge network ที่มี service ชื่อ `prometheus` และ `grafana` อยู่ในไฟล์เดียวกัน

## 1. สร้างไฟล์ provisioning

โครงสร้าง:

```text
zyntroai-monitoring/
├── compose.yaml
├── prometheus.yml
└── grafana/
    └── provisioning/
        └── datasources/
            └── prometheus.yaml
```

สร้างโฟลเดอร์:

```bash
mkdir -p grafana/provisioning/datasources
```

ใส่เนื้อหานี้ใน `grafana/provisioning/datasources/prometheus.yaml`:

```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    uid: zyntroai-prometheus
    orgId: 1
    type: prometheus
    access: proxy

    # Grafana connects through the Compose network.
    url: http://prometheus:9090

    isDefault: true
    editable: false
    version: 1

    jsonData:
      httpMethod: POST
      prometheusType: Prometheus
      timeInterval: 15s
```

Grafana รองรับการประกาศ Prometheus data source ผ่าน YAML และแนะนำใช้ hostname ของ service เมื่ออยู่ใน Docker Compose ไม่ใช่ `localhost` ของ Grafana container[2]

### ความหมายของค่าที่สำคัญ

| ค่า | หน้าที่ |
|---|---|
| `uid` | ตัวระบุคงที่ เพื่อให้ dashboard อ้างถึง data source เดิมได้ |
| `url` | ที่อยู่ Prometheus ซึ่งต้องเข้าถึงได้จาก Grafana |
| `isDefault` | กำหนดเป็น data source เริ่มต้นของ organization |
| `editable: false` | ไม่ให้แก้ configuration นี้ผ่าน UI |
| `version` | รุ่นของ configuration ไม่ใช่เวอร์ชัน Prometheus |
| `timeInterval: 15s` | ช่วงเวลาขั้นต่ำสำหรับการคำนวณ query ให้สอดคล้องกับ scrape interval |

รักษา `uid` เดิมไว้เมื่อปรับ configuration และเพิ่ม `version` เมื่อออกรุ่นใหม่ โดยเฉพาะหากมีหลาย Grafana instance ใช้ provisioning ร่วมกัน[3][4]

## 2. ตรวจ mount ใน `compose.yaml`

ใต้ service `grafana` ให้มี volume นี้ หากใส่ไว้จากตัวอย่างก่อนแล้ว ไม่ต้องเพิ่มซ้ำ:

```yaml
services:
  grafana:
    # Keep the existing image, ports, environment, and secrets.

    volumes:
      - grafana-data:/var/lib/grafana

      - type: bind
        source: ./grafana/provisioning/datasources
        target: /etc/grafana/provisioning/datasources
        read_only: true
```

นี่เป็นเพียงส่วนที่ต้องตรวจหรือรวมเข้ากับ service เดิม อย่าแทนที่ Compose ทั้งไฟล์ด้วย snippet นี้ เพราะยังต้องเก็บ image, ports, environment, secrets และ top-level volumes เดิมไว้

Grafana จะอ่านไฟล์ data source จาก provisioning directory ตอนเริ่มทำงาน[1]

## 3. โหลด configuration

ตรวจ Compose ก่อน:

```bash
docker compose config
```

หากเพิ่งเพิ่มหรือเปลี่ยน volume mount ให้สร้าง container ตาม configuration ใหม่:

```bash
docker compose up -d grafana
```

หาก mount มีอยู่แล้วและแก้เฉพาะ YAML provisioning ให้ restart Grafana:

```bash
docker compose restart grafana
```

จากนั้นดู logs:

```bash
docker compose logs --tail=100 grafana
```

เอกสาร Grafana ระบุให้ restart เพื่อโหลดการเปลี่ยนแปลงของ provisioning manifest[1]

## 4. ตรวจว่าเชื่อมต่อได้จริง

เปิด:

```text
http://127.0.0.1:3000
```

ไปที่ Connections → Data sources และตรวจว่ามี `Prometheus` จากนั้นเปิด Explore เลือก data source นี้ แล้วรัน:

```promql
up{job="prometheus"}
```

หลัง Prometheus scrape ตัวเองสำเร็จควรเห็นค่า `1` หากไม่มีผลลัพธ์ ให้แยกตรวจว่า data source เชื่อมไม่ได้ หรือ Prometheus ยังไม่มีข้อมูลที่ query ต้องการ[5]

> [!warning] Provisioning สำเร็จ ไม่เท่ากับเชื่อมต่อสำเร็จ
> Grafana อาจสร้างรายการ data source ได้ แต่เรียก Prometheus ไม่สำเร็จเพราะ URL, network หรือ service ยังไม่พร้อม จึงต้องทดลอง query เพิ่มเสมอ

## 5. จุดที่ต้องระวัง

### ถ้าใช้ host networking

หากทั้ง Grafana และ Prometheus ใช้ `network_mode: host` บน Linux ตามตัวเลือกก่อนหน้า ให้เปลี่ยนเป็น:

```yaml
url: http://127.0.0.1:9090
```

อย่าสลับ URL นี้กับ `http://prometheus:9090` โดยไม่ตรวจรูปแบบ network ที่ใช้อยู่

### อย่าเปิด `prune` โดยไม่ตั้งใจ

ตัวอย่างนี้ไม่ใส่:

```yaml
prune: true
```

เพราะเมื่อเปิดค่านี้ Grafana สามารถลบ provisioned data sources ที่ถูกนำออกจาก manifest และลบได้เมื่อเอาไฟล์ provisioning ออกทั้งไฟล์ด้วย เหมาะเมื่อคุณตั้งใจให้ configuration เป็นแหล่งควบคุมการลบอย่างชัดเจนแล้ว[3]

### อย่าลบ volume เพื่อแก้ provisioning

ไม่จำเป็นต้องใช้:

```bash
docker compose down -v
```

เพื่อโหลด YAML ใหม่ เพราะอาจลบข้อมูล Grafana และ Prometheus ที่เก็บไว้ ให้ตรวจ logs และ restart เฉพาะ Grafana ก่อน

เมื่อใช้งานได้แล้ว สามารถ commit `prometheus.yaml` เข้า Git เพื่อทบทวนการเปลี่ยนแปลงแบบ code review ได้ ส่วนรหัสผ่านและ secrets ให้คงแยกจาก provisioning file ตามเดิม[6]

การอ้างอิง:
[1] Provision dashboards and data sources https://grafana.com/tutorials/provision-dashboards-and-data-sources/
[2] Grafana Labs https://grafana.com/docs/grafana/latest/datasources/prometheus/configure.md
[3] Grafana Labs https://grafana.com/docs/grafana/latest/administration/provisioning.md
[4] Provision Grafana | Grafana documentation https://grafana.com/docs/grafana/latest/administration/provisioning/
[5] Getting started | Prometheus https://prometheus.io/docs/prometheus/latest/getting_started/
[6] Data sources | Grafana documentation https://grafana.com/docs/grafana/latest/datasources/
[7] Configure the Prometheus data source - Grafana Cloud https://grafana.com/docs/grafana-cloud/observe-and-act/connect-externally-hosted/data-sources/prometheus/configure/
[8] Prometheus data source | Grafana documentation https://grafana.com/docs/grafana/latest/datasources/prometheus/
[9] Configure the Amazon Managed Service for Prometheus ... https://grafana.com/docs/plugins/grafana-amazonprometheus-datasource/latest/configure/
[10] Configure the Azure Monitor Managed Service for Prometheus data … https://grafana.com/docs/plugins/grafana-azureprometheus-datasource/latest/configure/
เพิ่มรหัสผ่านแอดมินให้ Grafana อย่างไร

เพิ่มรหัสผ่านแอดมินให้ Grafana ใน Compose เดิมได้ด้วย **Docker Compose secrets** โดยให้ Grafana อ่านจากไฟล์ผ่าน `GF_SECURITY_ADMIN_PASSWORD__FILE` แทนการใส่รหัสผ่านตรง ๆ ใน YAML[1]

> [!important] แยกสองกรณีก่อน
> - ยังไม่เคยเริ่ม Grafana ด้วยฐานข้อมูลนี้: ตั้งรหัสผ่านเริ่มต้นผ่าน secret ได้
> - เคยเริ่มแล้วและมี `grafana-data` อยู่: เปลี่ยนไฟล์ secret อย่างเดียวไม่เปลี่ยนรหัสผ่านเดิม เพราะ `admin_password` ใช้ตอนเริ่มครั้งแรกเท่านั้น ให้เปลี่ยนผ่านหน้าเว็บหรือ CLI[2]

## 1. สร้างไฟล์รหัสผ่าน

โครงสร้างที่ใช้:

```text
zyntroai-monitoring/
├── compose.yaml
├── .gitignore
└── secrets/
    └── grafana_admin_password.txt
```

สร้างโฟลเดอร์:

```bash
mkdir -p secrets
```

เปิด `secrets/grafana_admin_password.txt` ด้วย text editor แล้วใส่รหัสผ่านที่รัดกุมเพียงค่าเดียว:

```text
ใส่รหัสผ่านจริงของคุณที่นี่
```

ไม่ต้องใส่ `PASSWORD=` หรือเครื่องหมายคำพูด และอย่าใช้ข้อความตัวอย่างนี้เป็นรหัสผ่านจริง

เพิ่มใน `.gitignore`:

```gitignore
secrets/
```

> [!warning] ไฟล์ยังเป็นข้อมูลลับบนเครื่อง
> วิธีนี้แยกรหัสผ่านออกจาก Compose แต่ไม่ได้เข้ารหัสไฟล์ต้นทาง ต้องจำกัดสิทธิ์ผู้ที่เข้าถึงโฟลเดอร์ และไม่เก็บรหัสผ่านไว้ใน Obsidian, Git หรือข้อความที่ส่งให้ AI

## 2. เพิ่ม configuration ใน `compose.yaml`

รวมส่วนนี้เข้ากับ service `grafana` เดิม โดยเก็บ volume provisioning และค่าอื่นที่มีอยู่ไว้:

```yaml
services:
  grafana:
    image: grafana/grafana:latest
    restart: unless-stopped

    ports:
      - "127.0.0.1:3000:3000"

    environment:
      GF_SECURITY_ADMIN_USER: admin
      GF_SECURITY_ADMIN_PASSWORD__FILE: /run/secrets/grafana_admin_password
      GF_AUTH_ANONYMOUS_ENABLED: "false"
      GF_USERS_ALLOW_SIGN_UP: "false"

    secrets:
      - grafana_admin_password

    volumes:
      - grafana-data:/var/lib/grafana

      - type: bind
        source: ./grafana/provisioning/datasources
        target: /etc/grafana/provisioning/datasources
        read_only: true

secrets:
  grafana_admin_password:
    file: ./secrets/grafana_admin_password.txt

volumes:
  grafana-data:
```

Grafana รองรับ suffix `__FILE` เพื่ออ่านค่าจาก secret file โดยตรง[1]

นี่เป็นส่วนของ Grafana เท่านั้น ไม่ใช่ไฟล์แทนที่ทั้ง stack ให้คง service `prometheus` และ `prometheus-data` เดิมไว้ด้วย หากมี `secrets:` หรือ `volumes:` ระดับบนสุดอยู่แล้ว ให้เพิ่มรายการในบล็อกเดิม ไม่สร้าง key ซ้ำ

## 3. เริ่ม Grafana

```bash
docker compose config
docker compose up -d grafana
docker compose logs --tail=100 grafana
```

เปิด:

```text
http://127.0.0.1:3000
```

เข้าสู่ระบบด้วย:

- Username: `admin`
- Password: ค่าจากไฟล์ secret

รหัสผ่านนี้จะใช้สร้างบัญชีเริ่มต้นเมื่อ Grafana ยังไม่มีฐานข้อมูลผู้ใช้เดิม[2]

## 4. ถ้าเคยเปิด Grafana ไปแล้ว

ทางเลือกแรกคือเข้าสู่ระบบด้วยรหัสผ่านเดิม แล้วเปลี่ยนรหัสผ่านผ่านการตั้งค่าบัญชี

หากลืมรหัสผ่าน สามารถใช้ Grafana CLI เพื่อ reset โดยไม่ต้องลบ volume ได้[3]

สำหรับ Compose ที่ใช้ไฟล์ secret ตามตัวอย่าง ให้แก้ไฟล์เป็นรหัสผ่านใหม่ แล้วรัน:

```bash
docker compose exec grafana sh -c \
  'grafana cli --homepath /usr/share/grafana \
  admin reset-admin-password "$(cat /run/secrets/grafana_admin_password)"'
```

คำสั่งนี้อ่านค่าจากไฟล์ใน container แทนการพิมพ์รหัสผ่านจริงลงใน shell command หากเพิ่งเพิ่ม secret mount และยังไม่มีไฟล์ใน container ให้รัน `docker compose up -d grafana` ก่อน

CLI จะ reset บัญชี admin ID `1` โดยค่าเริ่มต้น หากบัญชีเป้าหมายใช้ ID อื่น ต้องระบุ `--user-id` ให้ถูกต้อง[4]

> [!warning] อย่าใช้การลบ volume เพื่อแก้รหัสผ่าน
> ไม่จำเป็นต้องรัน `docker compose down -v` เพราะจะเสี่ยงลบฐานข้อมูล Grafana รวมถึง dashboards และค่าที่บันทึกไว้ ใช้การเปลี่ยนรหัสผ่านหรือ CLI reset แทน

สำหรับ Obsidian ให้บันทึกเฉพาะวิธีจัดการไว้ใน `[[Grafana Administration]]` และเชื่อมกับ `[[Secrets Management]]` ไม่บันทึกรหัสผ่านจริงลงโน้ตครับ

การอ้างอิง:
[1] Configure a Grafana Docker image https://grafana.com/docs/grafana/latest/setup-grafana/configure-docker/
[2] Configure Grafana | Grafana documentation https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/
[3] Grafana server CLI | Grafana documentation https://grafana.com/docs/grafana/latest/administration/cli/
[4] grafana.com › docs › grafanaGrafana Labs https://grafana.com/docs/grafana/latest/administration/cli.md
[5] docs: clarify admin credentials are only applied on first startup · kovan/grafana@d44ef2f https://github.com/kovan/grafana/commit/d44ef2f0a43d0a2d18ac7df754ba05e9684cecfe
[6] docs: clarify admin credentials are only applied on first startup · kovan/grafana@8acda9e https://github.com/kovan/grafana/commit/8acda9ed5ed631d65486a4bb6dbc2c7d9217a250
ถ้าจะเก็บรหัสผ่านเป็น Environment ตัวแปรธรรมดาทำได้ไหม

ทำได้ครับ Grafana รองรับ **`GF_SECURITY_ADMIN_PASSWORD`** เป็น environment variable โดยตรง เหมาะกับ local lab หรือการทดลอง แต่ Docker แนะนำให้ใช้ secrets สำหรับรหัสผ่าน เพราะ environment variables มีความเสี่ยงถูกเปิดเผยผ่านเครื่องมือดู configuration หรือข้อมูล container ได้[1][2][3]

## วิธีที่แนะนำสำหรับทดลอง: ใช้ `.env` ร่วมกับ Compose

### 1. สร้างไฟล์ `.env`

วางไว้ข้าง `compose.yaml`:

```dotenv
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD='replace-with-a-long-unique-password'
```

เปลี่ยนเป็นรหัสผ่านจริงของคุณก่อนใช้งาน การครอบด้วย single quotes ใน `.env` ช่วยให้ค่าที่มี `$` ถูกอ่านเป็นข้อความตรงตัว แทนการนำไปทำ variable interpolation[4]

เพิ่มใน `.gitignore`:

```gitignore
.env
.env.*
!.env.example
```

> [!warning] `.env` ไม่ใช่ไฟล์เข้ารหัส
> การแยกไฟล์ช่วยไม่ให้รหัสผ่านอยู่ใน YAML แต่ยังเป็น plaintext และเมื่อส่งเข้า container ก็ยังเป็น environment variable อยู่ ไม่ได้มีคุณสมบัติเท่ากับ secrets[2][3]

### 2. เปลี่ยนส่วน `environment` ของ Grafana

ใน service `grafana` เดิม ใช้:

```yaml
services:
  grafana:
    # เก็บ image, ports, volumes และ depends_on เดิมไว้

    environment:
      GF_SECURITY_ADMIN_USER: "${GRAFANA_ADMIN_USER:-admin}"
      GF_SECURITY_ADMIN_PASSWORD: "${GRAFANA_ADMIN_PASSWORD:?Set GRAFANA_ADMIN_PASSWORD in .env}"
      GF_AUTH_ANONYMOUS_ENABLED: "false"
      GF_USERS_ALLOW_SIGN_UP: "false"
```

`${GRAFANA_ADMIN_PASSWORD:?...}` ทำให้ Compose หยุดพร้อมข้อความผิดพลาดหากตัวแปรไม่ได้ตั้งค่าหรือเป็นค่าว่าง แทนการเริ่มด้วยรหัสผ่านที่ไม่ตั้งใจ[4]

ไฟล์ `.env` ใช้สำหรับแทนค่าใน Compose; ไม่ได้ส่งทุกตัวแปรเข้า container อัตโนมัติ ตัวอย่างนี้ส่งเฉพาะค่าที่อ้างไว้ใน `environment`[2][4]

### 3. นำ configuration แบบ secret เดิมออก

ลบรายการนี้ออกจาก `environment`:

```yaml
GF_SECURITY_ADMIN_PASSWORD__FILE: /run/secrets/grafana_admin_password
```

และลบการอ้าง secret ของ Grafana:

```yaml
secrets:
  - grafana_admin_password
```

หากไม่มี service อื่นใช้งานแล้ว จึงลบ declaration ระดับบนสุดนี้ด้วย:

```yaml
secrets:
  grafana_admin_password:
    file: ./secrets/grafana_admin_password.txt
```

ไม่ควรเก็บทั้ง `GF_SECURITY_ADMIN_PASSWORD` และ `GF_SECURITY_ADMIN_PASSWORD__FILE` พร้อมกัน เพื่อหลีกเลี่ยง configuration ที่ขัดกัน

## เริ่มด้วยค่าใหม่

ตรวจ Compose โดยไม่แสดง configuration ที่แทนค่ารหัสผ่านแล้ว:

```bash
docker compose config --quiet
```

จากนั้นให้ Compose สร้าง container Grafana ใหม่ตาม environment ที่เปลี่ยน:

```bash
docker compose up -d --force-recreate grafana
```

หลีกเลี่ยงการคัดลอกผล `docker compose config` แบบเต็มไปลงแชตหรือ issue เพราะอาจมีรหัสผ่านที่ถูกแทนค่าแล้ว และการ `restart` อย่างเดียวไม่ใช่วิธีนำ environment ใหม่เข้า container

## ถ้ามีบัญชี Grafana อยู่แล้ว

> [!important] ตัวแปรนี้ตั้งรหัสผ่านตอนเริ่มครั้งแรก
> `GF_SECURITY_ADMIN_PASSWORD` ใช้ตั้งรหัสผ่านเริ่มต้นเมื่อ Grafana สร้างฐานข้อมูลครั้งแรก การเปลี่ยน `.env` แล้ว recreate container ไม่เปลี่ยนรหัสผ่านบัญชีเดิมที่เก็บอยู่ใน `grafana-data`[1]

หากเคยเปิด Grafana แล้ว ให้:

- เปลี่ยนรหัสผ่านผ่านหน้าเว็บเมื่อยังเข้าสู่ระบบได้
- ใช้ Grafana CLI reset เมื่อจำเป็น โดยไม่ต้องลบ volume[5]

อย่าใช้ `docker compose down -v` เพื่อให้รหัสผ่านใหม่มีผล เพราะเสี่ยงลบ dashboards และข้อมูลที่เก็บไว้

สำหรับชุดทดลอง ZyntroAI ใช้ `.env` ได้ แต่เมื่อใช้งานจริงหรือมีผู้ดูแลหลายคน ให้กลับไปใช้ไฟล์ secrets หรือระบบจัดการ secrets และไม่เก็บรหัสผ่านจริงไว้ใน Obsidian ครับ[6]

การอ้างอิง:
[1] Configure Grafana | Grafana documentation https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/
[2] Set environment variables within your container's environment https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/
[3] docs.docker.com · compose · how-tosManage secrets securely in Docker Compose https://docs.docker.com/compose/how-tos/use-secrets/
[4] Set, use, and manage variables in a Compose file with ... https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/
[5] Grafana server CLI | Grafana documentation https://grafana.com/docs/grafana/latest/administration/cli/
[6] Best practices for working with environment variables in ... https://docs.docker.com/compose/how-tos/environment-variables/best-practices/
[7] Managing Secrets | Docker Docs https://docs.docker.com/ai/docker-agent/guides/secrets/
[8] Defining and using secrets in... https://docs.docker.com/engine/swarm/secrets/
[9] Secrets https://docs.docker.com/reference/compose-file/secrets/
[10] Configure pre-defined environment variables in Docker ... https://docs.docker.com/compose/how-tos/environment-variables/envvars/
[11] Set Up a Model https://docs.docker.com/ai/docker-agent/getting-started/set-up-a-model/
วิธีตั้งค่าตัวแปรใน .env ตัวอื่นเพิ่มเติมนอกจากรหัสผ่าน

เพิ่มตัวแปรอื่นใน **`.env`** ได้เหมือนรหัสผ่านครับ เช่น พอร์ตที่เปิดบนเครื่อง, image tag, ระยะเวลาเก็บ metrics และค่า Grafana โดยต้องนำตัวแปรไปอ้างใน `compose.yaml` ด้วย การประกาศใน `.env` อย่างเดียวไม่ได้ส่งค่าทั้งหมดเข้า container อัตโนมัติ[1][2]

## 1. ตัวอย่าง `.env` สำหรับ ZyntroAI

วางไฟล์นี้ไว้ข้าง `compose.yaml`:

```dotenv
# Compose project
COMPOSE_PROJECT_NAME=zyntroai-monitoring

# Images — latest ใช้สำหรับทดลอง
PROMETHEUS_IMAGE=prom/prometheus:latest
GRAFANA_IMAGE=grafana/grafana:latest

# Host binding and ports
BIND_ADDRESS=127.0.0.1
PROMETHEUS_PORT=9090
GRAFANA_PORT=3000

# Prometheus storage
PROMETHEUS_RETENTION=15d

# Grafana initial admin account
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD='replace-with-a-long-unique-password'

# Grafana configuration
GRAFANA_ROOT_URL=http://localhost:3000/
GRAFANA_ALLOW_SIGN_UP=false
GRAFANA_ANONYMOUS_ENABLED=false
GRAFANA_LOG_LEVEL=info
```

ตัวแปรที่ขึ้นต้น `GRAFANA_` ในตัวอย่างเป็นชื่อที่เราตั้งเอง ต้อง map ไปยังชื่อ `GF_...` ที่ Grafana รองรับ ส่วนชื่อ image และพอร์ตใช้ควบคุม Compose ไม่จำเป็นต้องส่งเข้า container[3][4]

> [!warning] ก่อนใช้งานจริง
> เปลี่ยนรหัสผ่านตัวอย่าง และ pin image version หรือ digest ที่ทดสอบแล้ว แทนการใช้ `latest`

## 2. นำตัวแปรมาใช้ใน `compose.yaml`

ตัวอย่างนี้เป็น configuration แบบ bridge network และใช้ provisioning data source เดิมของคุณ:

```yaml
services:
  prometheus:
    image: "${PROMETHEUS_IMAGE:?Set PROMETHEUS_IMAGE}"
    restart: unless-stopped

    ports:
      - "${BIND_ADDRESS:-127.0.0.1}:${PROMETHEUS_PORT:-9090}:9090"

    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.path=/prometheus"
      - "--storage.tsdb.retention.time=${PROMETHEUS_RETENTION:-15d}"

    volumes:
      - type: bind
        source: ./prometheus.yml
        target: /etc/prometheus/prometheus.yml
        read_only: true

      - prometheus-data:/prometheus

  grafana:
    image: "${GRAFANA_IMAGE:?Set GRAFANA_IMAGE}"
    restart: unless-stopped

    ports:
      - "${BIND_ADDRESS:-127.0.0.1}:${GRAFANA_PORT:-3000}:3000"

    environment:
      GF_SECURITY_ADMIN_USER: "${GRAFANA_ADMIN_USER:-admin}"
      GF_SECURITY_ADMIN_PASSWORD: "${GRAFANA_ADMIN_PASSWORD:?Set GRAFANA_ADMIN_PASSWORD}"
      GF_SERVER_ROOT_URL: "${GRAFANA_ROOT_URL:-http://localhost:3000/}"
      GF_USERS_ALLOW_SIGN_UP: "${GRAFANA_ALLOW_SIGN_UP:-false}"
      GF_AUTH_ANONYMOUS_ENABLED: "${GRAFANA_ANONYMOUS_ENABLED:-false}"
      GF_LOG_LEVEL: "${GRAFANA_LOG_LEVEL:-info}"

    volumes:
      - grafana-data:/var/lib/grafana

      - type: bind
        source: ./grafana/provisioning/datasources
        target: /etc/grafana/provisioning/datasources
        read_only: true

    depends_on:
      - prometheus

volumes:
  prometheus-data:
  grafana-data:
```

Compose รองรับรูปแบบเหล่านี้:[5]

```yaml
# ใช้ค่าจากตัวแปร
image: "${GRAFANA_IMAGE}"

# ใช้ค่าเริ่มต้นหากไม่ได้ตั้งค่าหรือเป็นค่าว่าง
image: "${GRAFANA_IMAGE:-grafana/grafana:latest}"

# หยุดพร้อมข้อความผิดพลาดหากไม่มีค่า
image: "${GRAFANA_IMAGE:?Set GRAFANA_IMAGE}"
```

หากเปลี่ยนมาจาก secret file ให้ลบ `GF_SECURITY_ADMIN_PASSWORD__FILE` และการอ้าง `grafana_admin_password` เดิมออก ไม่ใช้สองวิธีพร้อมกัน

## 3. เปลี่ยนพอร์ตโดยไม่ทำให้ data source ผิด

ตัวอย่างเปลี่ยน Grafana เป็นพอร์ต `3100`:

```dotenv
GRAFANA_PORT=3100
GRAFANA_ROOT_URL=http://localhost:3100/
```

จากนั้นเปิด:

```text
http://localhost:3100
```

หากเปลี่ยน Prometheus host port เป็น `9091`:

```dotenv
PROMETHEUS_PORT=9091
```

URL ในไฟล์ provisioning ยังคงเป็น:

```yaml
url: http://prometheus:9090
```

เพราะ Grafana ติดต่อ Prometheus ผ่านชื่อ service และพอร์ตภายใน container ไม่ใช่พอร์ตที่เผยแพร่บน host[6][7]

> [!note] ตัวแปรในไฟล์ที่ mount ไม่ถูกแทนค่าโดย Compose
> การใส่ `${PROMETHEUS_RETENTION}` ใน `compose.yaml` จะถูกแทนค่า แต่ Compose ไม่ได้เปิดไฟล์ `prometheus.yml` ที่ mount อยู่เพื่อแทน `${...}` ให้อัตโนมัติ ตัวอย่างนี้จึงส่ง retention ผ่าน command flag แทน

## 4. `.env` ต่างจาก `env_file` อย่างไร

| วิธี | ใช้ทำอะไร |
|---|---|
| `.env` หรือ `docker compose --env-file ...` | ให้ Compose ใช้แทน `${VARIABLE}` ใน configuration |
| `environment:` | ส่งตัวแปรที่ระบุเข้า container |
| `env_file:` ใต้ service | ส่งตัวแปรจากไฟล์นั้นเข้า container |

ตัวอย่าง `env_file`:

```yaml
services:
  grafana:
    env_file:
      - ./grafana.env
```

โดย `grafana.env` ต้องใช้ชื่อที่ Grafana เข้าใจ:

```dotenv
GF_LOG_LEVEL=info
GF_USERS_ALLOW_SIGN_UP=false
GF_AUTH_ANONYMOUS_ENABLED=false
```

สำหรับระบบของคุณ ผมแนะนำ `.env` + `environment:` แบบตัวอย่างหลัก เพราะมองเห็นชัดว่าแต่ละ service ได้รับตัวแปรใดบ้าง หากใช้ `environment:` และ `env_file:` พร้อมกัน ค่าจาก `environment:` จะทับค่าชื่อเดียวกันใน `env_file:`[2]

## 5. ตรวจและนำค่าใหม่ไปใช้

ตรวจโดยไม่พิมพ์ configuration ที่มีรหัสผ่าน:

```bash
docker compose config --quiet
```

แล้วนำการเปลี่ยนแปลงไปใช้:

```bash
docker compose up -d
docker compose ps
```

หากต้องการบังคับสร้าง container ใหม่:

```bash
docker compose up -d --force-recreate
```

อย่าใช้เพียง `docker compose restart` เพื่อหวังให้ container รับ environment ใหม่ และหลีกเลี่ยงการแชร์ผล `docker compose config` แบบเต็ม เพราะมีค่าที่แทนจาก `.env` รวมถึงรหัสผ่าน

> [!important] รหัสผ่าน Grafana เดิม
> แม้ container ได้รับ environment ใหม่แล้ว ค่า admin password ยังใช้ตั้งบัญชีตอนสร้างฐานข้อมูลครั้งแรกเท่านั้น ไม่ได้เปลี่ยนรหัสผ่านบัญชีที่อยู่ใน `grafana-data` แล้ว[8]

## 6. ข้อควรระวังในการเขียน `.env`

- ใช้รูปแบบ `NAME=value` หนึ่งตัวแปรต่อบรรทัด
- ใช้ `#` สำหรับบรรทัดคำอธิบาย
- ค่าที่มี `$` และต้องการเก็บตรงตัว ให้ใช้ single quotes
- ตัวแปรใน shell อาจทับค่าที่คาดว่าจะมาจาก `.env` ได้
- ไม่ commit ไฟล์จริง ให้ commit `.env.example` ที่ไม่มี secrets แทน[1][2][9]

สำหรับ Obsidian เชื่อมขั้นตอนนี้ไว้ที่ `[[Docker Compose Environment Variables]]`, `[[Grafana Administration]]` และ `[[Secrets Management]]` โดยเก็บเฉพาะตัวอย่างที่ลบข้อมูลลับแล้วครับ

การอ้างอิง:
[1] Set, use, and manage variables in a Compose file with ... https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/
[2] Define services in Docker Compose - Docker Docs https://docs.docker.com/reference/compose-file/services/
[3] Set environment variables within your container's environment https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/
[4] grafana.com · setup-grafana · installationRun Grafana Docker image | Grafana documentation https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/
[5] Interpolation | Docker Docs https://docs.docker.com/reference/compose-file/interpolation/
[6] Monitor a Golang application with Prometheus and Grafana https://docs.docker.com/guides/go-prometheus-monitoring/
[7] Grafana Labs https://grafana.com/docs/grafana/latest/datasources/prometheus/configure.md
[8] Configure Grafana | Grafana documentation https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/
[9] Environment variables precedence in Docker Compose https://docs.docker.com/compose/how-tos/environment-variables/envvars-precedence/
[10] Use include to modularize Compose files https://docs.docker.com/reference/compose-file/include/
[11] docs.docker.com · reference · compose-fileDocker Documentation https://docs.docker.com/reference/compose-file/services.md
[12] Grafana Enterprise license https://grafana.com/docs/grafana/latest/administration/enterprise-licensing/
[13] docker compose - Docker Docs https://docs.docker.com/reference/cli/docker/compose/
[14] Configure Grafana Enterprise https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/enterprise-configuration/
วิธีตรวจสอบว่า container ดึงค่าตัวแปรไปใช้หรือยัง

ตรวจได้เป็น **3 ระดับ** ครับ: Compose แทนค่าถูกหรือยัง → container ได้รับค่าหรือยัง → Grafana นำค่าไปใช้งานจริงหรือยัง ทั้งสามอย่างไม่ใช่เรื่องเดียวกัน[1][2][3]

## 1. ตรวจว่า Compose อ่านไฟล์ได้

จากโฟลเดอร์ที่มี `compose.yaml` และ `.env`:

```bash
docker compose config --quiet
```

ถ้าไม่มี error แปลว่า configuration ผ่านการตรวจ แต่ยังไม่ได้ยืนยันว่า container ที่กำลังรันได้รับค่าใหม่แล้ว

`docker compose config` ทำงานจากไฟล์ configuration และไม่จำเป็นต้องมี container รันอยู่[1]

> [!warning] ระวังรหัสผ่านหลุด
> อย่าแชร์ผล `docker compose config`, `docker compose config --environment` หรือ `docker inspect` แบบเต็ม เพราะอาจแสดงรหัสผ่านและตัวแปรลับได้ โดย `--environment` จะแสดงค่าที่ Compose ใช้ในการ interpolation[1]

## 2. ตรวจค่าภายใน Grafana container

ตรวจเฉพาะตัวแปรที่ไม่ใช่ความลับ:

```bash
docker compose exec -T grafana sh -c '
  printf "Admin user: %s\n" "$GF_SECURITY_ADMIN_USER"
  printf "Root URL: %s\n" "$GF_SERVER_ROOT_URL"
  printf "Allow sign up: %s\n" "$GF_USERS_ALLOW_SIGN_UP"
  printf "Anonymous access: %s\n" "$GF_AUTH_ANONYMOUS_ENABLED"
  printf "Log level: %s\n" "$GF_LOG_LEVEL"
'
```

ตัวอย่างผลลัพธ์:

```text
Admin user: admin
Root URL: http://localhost:3000/
Allow sign up: false
Anonymous access: false
Log level: info
```

`docker compose exec` รันคำสั่งใน container ที่กำลังทำงาน จึงเหมาะกับตรวจ environment ของ service ปัจจุบัน[2]

ข้อสำคัญคือใช้ single quotes ครอบคำสั่ง `sh -c` เพื่อให้ `$GF_...` ถูกอ่านภายใน container ไม่ใช่แทนค่าจาก shell ของเครื่องคุณก่อน

### ตรวจรหัสผ่านโดยไม่แสดงค่า

```bash
docker compose exec -T grafana sh -c '
  if [ -n "$GF_SECURITY_ADMIN_PASSWORD" ]; then
    printf "Admin password: configured\n"
  else
    printf "Admin password: missing or empty\n"
    exit 1
  fi
'
```

ผล `configured` ยืนยันเพียงว่าตัวแปรมีค่า ไม่ได้ยืนยันว่ารหัสผ่านถูกต้องหรือถูกตั้งให้บัญชี admin แล้ว

## 3. ตรวจว่าตัวแปรชนิดนั้นควรอยู่ตรงไหน

จาก configuration ก่อนหน้า ตัวแปรไม่ได้ถูกส่งเข้า container ทุกตัว:

| ตัวแปรใน `.env` | ใช้ที่ไหน | วิธีตรวจ |
|---|---|---|
| `GRAFANA_ADMIN_USER` | map เป็น `GF_SECURITY_ADMIN_USER` | ตรวจด้วย `exec` |
| `GRAFANA_LOG_LEVEL` | map เป็น `GF_LOG_LEVEL` | ตรวจด้วย `exec` |
| `GRAFANA_PORT` | host port mapping | ใช้ `docker compose port` |
| `PROMETHEUS_RETENTION` | command-line argument | ตรวจ command ของ container |
| `GRAFANA_IMAGE` | เลือก image | ตรวจด้วย `docker compose images` |

`.env` มีหน้าที่ให้ Compose แทนค่า ส่วน container จะได้รับตัวแปรผ่าน `environment:` หรือ `env_file:` ที่ระบุไว้เท่านั้น[4]

### ตรวจพอร์ต Grafana

```bash
docker compose port grafana 3000
```

หากตั้ง `GRAFANA_PORT=3100` และ bind เฉพาะเครื่อง ควรได้ลักษณะนี้:

```text
127.0.0.1:3100
```

### ตรวจ image ที่ใช้อยู่

```bash
docker compose images
```

### ตรวจ retention argument ของ Prometheus

สำหรับ Bash บน Linux/macOS/WSL:

```bash
docker inspect \
  --format '{{json .Config.Cmd}}' \
  "$(docker compose ps -q prometheus)"
```

ควรมี argument เช่น:

```text
"--storage.tsdb.retention.time=15d"
```

นี่เป็นการตรวจเฉพาะ command ไม่ใช่ dump configuration ทั้งหมด ซึ่งช่วยลดการแสดงข้อมูลที่ไม่จำเป็น

## 4. ถ้า container ยังแสดงค่าเดิม

ให้สร้าง container ใหม่ตาม configuration:

```bash
docker compose up -d --force-recreate grafana
```

ถ้าเปลี่ยน Prometheus ด้วย:

```bash
docker compose up -d --force-recreate grafana prometheus
```

จากนั้นรันคำสั่งตรวจอีกครั้ง อย่าใช้เพียง:

```bash
docker compose restart grafana
```

เพราะ Docker ระบุว่า `restart` ไม่อัปเดต environment variables จาก Compose configuration ที่เปลี่ยนไป[5]

หากใช้ไฟล์อื่นแทน `.env` ต้องใช้ให้ตรงกันทั้งตอนตรวจและตอนรัน:

```bash
docker compose --env-file .env.local config --quiet

docker compose --env-file .env.local \
  up -d --force-recreate grafana
```

## 5. ตรวจว่า Grafana ใช้ค่าจริง

หลังยืนยัน environment แล้ว ให้ทดสอบพฤติกรรม:

- เปิด Grafana ผ่านพอร์ตที่ตั้งใหม่
- ตรวจว่าการเข้าถึงแบบ anonymous ถูกปิด
- ตรวจว่า Prometheus data source ยัง query ได้
- ตรวจการเข้าสู่ระบบด้วยบัญชีที่ตั้งใจใช้

> [!important] รหัสผ่านเป็นกรณีพิเศษ
> `GF_SECURITY_ADMIN_PASSWORD` ใช้ตั้งรหัสผ่านตอนเริ่มฐานข้อมูลครั้งแรกเท่านั้น แม้ `exec` ตรวจพบค่าใหม่แล้ว รหัสผ่านของบัญชีใน `grafana-data` เดิมก็ยังไม่เปลี่ยน ต้องเปลี่ยนผ่านหน้าเว็บหรือ Grafana CLI[3]

สำหรับการตรวจประจำวัน ใช้ `config --quiet` → `exec` เฉพาะค่าที่ไม่ลับ → ทดสอบพฤติกรรมจริง จะปลอดภัยและแยกสาเหตุได้ชัดกว่าการพิมพ์ environment ทั้งหมดครับ

การอ้างอิง:
[1] docker compose config https://docs.docker.com/reference/cli/docker/compose/config/
[2] Docker Documentation https://docs.docker.com/compose/gettingstarted.md
[3] Grafana Labs https://grafana.com/docs/grafana/latest/administration/configuration.md
[4] docs.docker.com › compose › how-tosDocker Documentation https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables.md
[5] docker compose restart https://docs.docker.com/reference/cli/docker/compose/restart/
[6] docker compose exec https://docs.docker.com/reference/cli/docker/compose/exec/
[7] Grafana Labs https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana.md
[8] grafana.com · latest · installationGrafana Labs https://grafana.com/docs/grafana/latest/installation/configuration.md
[9] Settings updates at runtime | Grafana documentation https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/settings-updates-at-runtime/
[10] docs.docker.com · reference · compose-fileCompose Develop Specification | Docker Docs https://docs.docker.com/reference/compose-file/develop/
Knowledge & Python Code ที่จำเป็น

สำหรับระบบ Prometheus + Grafana + Docker Compose ที่เรากำลังทำอยู่ สิ่งที่จำเป็นคือ **เข้าใจเส้นทางข้อมูลและตรวจสอบ configuration ได้ก่อน** ส่วน Python ใช้เพิ่ม metrics ให้บริการ หรือดึงผลจาก Prometheus มาร่าง Daily Briefing ไม่จำเป็นต้องใช้ Python เพียงเพื่อเปิด Grafana ครับ

ด้านล่างเป็นชุดความรู้และโค้ดเริ่มต้นสำหรับ ZyntroAI โดยยังไม่ผูกกับ repository ใดโดยอัตโนมัติ

## 1. Knowledge ที่ควรรู้

| เรื่อง | ต้องเข้าใจอะไร | ใช้กับงานนี้ |
|---|---|---|
| Environment variables | `.env` ของ Compose ต่างจาก environment ภายใน container | ตรวจว่าตัวแปรถูกส่งเข้า service จริง |
| Docker networking | `localhost` หมายถึงเครื่องหรือ container ที่คำสั่งกำลังทำงาน | เลือก URL ให้ถูก |
| Metrics | Counter, Gauge และ Histogram มีหน้าที่ต่างกัน | ออกแบบข้อมูลที่ต้องการติดตาม |
| PromQL | Query ตามชื่อ metrics, labels และช่วงเวลา | คำนวณ throughput, errors, latency |
| HTTP/API | Timeout, status code และ JSON validation | ดึงข้อมูลอย่างปลอดภัย |
| Secrets | ไม่ log หรือเก็บ credentials ใน Git/Obsidian | ลดโอกาสข้อมูลลับหลุด |

Prometheus Python client รองรับ Counter, Gauge และ Histogram โดย Counter เหมาะกับจำนวนเหตุการณ์สะสม ส่วน Histogram เหมาะกับการกระจายของค่าที่สังเกต เช่น ระยะเวลาประมวลผล[1][2][3]

> [!important] `.env` ไม่ได้โหลดเข้า Python เอง
> ในตัวอย่างนี้ Python อ่านค่าจาก environment ของ process หากรันผ่าน Compose ต้องส่งด้วย `environment:` หรือ `env_file:` หากรันตรงบนเครื่อง ต้องตั้งตัวแปรใน shell หรือใช้ตัวโหลด `.env` เพิ่มอย่างชัดเจน[4]

## 2. Python ตัวแรก: สร้าง metrics สำหรับทดลอง

ตัวอย่างนี้จำลอง worker ประมวลผลงาน ไม่ใช่ตัวตรวจสุขภาพ repository หรือบริการ production

### ติดตั้ง

```bash
python -m venv .venv
```

เปิด virtual environment:

```bash
# Linux / macOS / WSL
source .venv/bin/activate
```

```powershell
# Windows PowerShell
.venv\Scripts\Activate.ps1
```

ติดตั้ง client:

```bash
python -m pip install prometheus-client
```

แพ็กเกจทางการใช้ชื่อ `prometheus-client` แต่ชื่อ import คือ `prometheus_client`[5]

### ไฟล์ `metrics_demo.py`

```python
import logging
import os
import time

from prometheus_client import Counter, Histogram, start_http_server

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)
logger = logging.getLogger(__name__)

JOBS = Counter(
    "zyntroai_jobs_total",
    "Number of completed demo jobs",
    ["result"],
)

JOB_DURATION = Histogram(
    "zyntroai_job_duration_seconds",
    "Time spent processing a demo job",
    buckets=(0.05, 0.1, 0.25, 0.5, 1, 2, 5),
)

# Create both series before the first job runs.
JOBS.labels(result="success")
JOBS.labels(result="error")


def process_job(sequence: int) -> None:
    # Simulated work, not a production health check.
    time.sleep(0.2)

    # Deliberate failure every tenth job.
    if sequence % 10 == 0:
        raise RuntimeError("Simulated job failure")


def main() -> None:
    host = os.environ.get("METRICS_HOST", "127.0.0.1")
    port = int(os.environ.get("METRICS_PORT", "8000"))

    if not 1 <= port <= 65535:
        raise ValueError("METRICS_PORT must be between 1 and 65535")

    start_http_server(port, addr=host)
    logger.info("Metrics server started on %s:%s", host, port)

    sequence = 0

    try:
        while True:
            sequence += 1

            with JOB_DURATION.time():
                try:
                    process_job(sequence)
                except RuntimeError:
                    JOBS.labels(result="error").inc()
                    logger.warning("Demo job failed")
                else:
                    JOBS.labels(result="success").inc()

            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("Stopping demo")


if __name__ == "__main__":
    main()
```

`start_http_server()` เปิด HTTP endpoint สำหรับ scrape ใน background thread และ `.time()` ของ Histogram ใช้วัดระยะเวลาของงานใน block[3][6]

รัน:

```bash
python metrics_demo.py
```

ทดสอบอีก terminal:

```bash
curl --fail http://127.0.0.1:8000/metrics
```

ควรพบชื่อประมาณนี้:

```text
zyntroai_jobs_total
zyntroai_job_duration_seconds_bucket
zyntroai_job_duration_seconds_sum
zyntroai_job_duration_seconds_count
```

Histogram แบบนี้เปิดเผย bucket, sum และ count เพื่อใช้คำนวณการกระจายของเวลาใน PromQL[3]

## 3. ถ้าต้องการรัน Python ใน Compose เดียวกัน

สร้างไฟล์เพิ่ม:

```text
zyntroai-monitoring/
├── compose.yaml
├── prometheus.yml
└── metrics-demo/
    ├── Dockerfile
    ├── requirements.txt
    └── metrics_demo.py
```

### `metrics-demo/requirements.txt`

```text
prometheus-client
```

สำหรับใช้งานจริง ให้ pin dependency version ที่ทดสอบแล้วก่อน release

### `metrics-demo/Dockerfile`

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY metrics_demo.py .

USER 10001:10001

CMD ["python", "metrics_demo.py"]
```

### เพิ่ม service ใน `compose.yaml`

เพิ่มภายใต้ `services:` เดิม ไม่สร้าง `services:` ซ้ำ:

```yaml
  metrics-demo:
    build:
      context: ./metrics-demo
    restart: unless-stopped

    environment:
      METRICS_HOST: "0.0.0.0"
      METRICS_PORT: "8000"
```

ตัวอย่างนี้ไม่เผยแพร่พอร์ต `8000` ออก host เพราะ Prometheus จะติดต่อผ่าน network ภายใน Compose

จากนั้นเพิ่ม job ใน `prometheus.yml`:

```yaml
  - job_name: zyntroai-demo
    metrics_path: /metrics

    static_configs:
      - targets:
          - metrics-demo:8000
        labels:
          project: zyntroai
          environment: development
          service: demo-worker
```

ใช้ชื่อ service `metrics-demo` แทน `localhost` สำหรับการเชื่อมข้าม container ใน Compose[7]

เริ่มบริการและโหลด config ใหม่:

```bash
docker compose up -d --build metrics-demo
docker compose restart prometheus
```

### Query ใน Grafana

จำนวนงานต่อวินาที:

```promql
sum by (result) (
  rate(zyntroai_jobs_total[5m])
)
```

p95 ระยะเวลาประมวลผล:

```promql
histogram_quantile(
  0.95,
  sum by (le) (
    rate(zyntroai_job_duration_seconds_bucket[5m])
  )
)
```

ค่าเหล่านี้มาจากงานจำลองเท่านั้น อย่านำไปสรุปว่าเป็นประสิทธิภาพของ ZyntroAI production

## 4. Python ตัวที่สอง: อ่านข้อมูลจาก Prometheus

สคริปต์นี้ใช้เฉพาะ Python standard library ดึง query `up{project="zyntroai"}` และพิมพ์รายงาน Markdown โดยไม่แก้ไขไฟล์เอง

### ไฟล์ `monitoring_report.py`

```python
import json
import os
import sys
from datetime import datetime, timezone
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit
from urllib.request import urlopen


def query_prometheus(base_url: str, expression: str) -> list:
    parsed = urlsplit(base_url)

    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError("PROMETHEUS_URL must be an HTTP(S) URL")

    if parsed.username or parsed.password:
        raise ValueError("Do not put credentials in PROMETHEUS_URL")

    params = urlencode({"query": expression})
    url = f"{base_url.rstrip('/')}/api/v1/query?{params}"

    with urlopen(url, timeout=10) as response:
        payload = json.load(response)

    if payload.get("status") != "success":
        raise RuntimeError("Prometheus query was not successful")

    # Do not silently ignore partial-result warnings.
    if payload.get("warnings"):
        raise RuntimeError("Prometheus returned query warnings")

    data = payload.get("data", {})

    if data.get("resultType") != "vector":
        raise RuntimeError("Expected an instant-vector result")

    return data.get("result", [])


def markdown_cell(value: str) -> str:
    return value.replace("|", r"\|").replace("\n", " ").replace("\r", " ")


def main() -> int:
    base_url = os.environ.get(
        "PROMETHEUS_URL",
        "http://127.0.0.1:9090",
    )
    expression = 'up{project="zyntroai"}'

    try:
        results = query_prometheus(base_url, expression)
    except (HTTPError, URLError, TimeoutError):
        print("Cannot reach Prometheus; no health conclusion made.", file=sys.stderr)
        return 1
    except (ValueError, RuntimeError, KeyError, TypeError):
        print("Invalid or incomplete Prometheus response.", file=sys.stderr)
        return 1

    checked_at = datetime.now(timezone.utc).isoformat()

    print("# ZyntroAI Monitoring Snapshot")
    print()
    print(f"- Checked at: {checked_at}")
    print(f"- Query: `{expression}`")
    print("- Scope: scrape status only")
    print()

    if not results:
        print("> [!warning] No matching series")
        print("> This is not evidence that all services are healthy.")
        return 2

    print("| Job | Instance | Scrape status |")
    print("|---|---|---|")

    for item in results:
        labels = item["metric"]
        value = float(item["value"][1])

        if value == 1:
            status = "UP"
        elif value == 0:
            status = "DOWN"
        else:
            status = "UNKNOWN"

        job = markdown_cell(labels.get("job", "unknown"))
        instance = markdown_cell(labels.get("instance", "unknown"))

        print(f"| {job} | {instance} | {status} |")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

รันจากเครื่อง host:

```bash
python monitoring_report.py
```

หากเปลี่ยน host port ของ Prometheus:

```bash
PROMETHEUS_URL=http://127.0.0.1:9091 \
python monitoring_report.py
```

หากนำสคริปต์ไปอยู่ใน container บน Compose network เดียวกัน ให้ใช้:

```text
PROMETHEUS_URL=http://prometheus:9090
```

> [!warning] ขอบเขตของรายงาน
> `up = 1` แปลว่า scrape สำเร็จ ไม่ได้แปลว่าผู้ใช้สั่งซื้อสินค้าได้ ฐานข้อมูลไม่มีปัญหา หรือ CI ผ่าน และรายงาน instant query นี้ไม่ใช่ประวัติความพร้อมใช้งานทั้งวัน[8]

## 5. กติกาที่จำเป็นก่อนใช้จริง

- อย่าใช้ `user_id`, email, request ID หรือข้อความ error แบบอิสระเป็น labels โดยไม่ประเมินจำนวน series
- อย่าใส่รหัสผ่านและ tokens ใน metrics หรือ logs
- แยก “ไม่มีข้อมูล” ออกจาก “ค่าเป็นศูนย์”
- ระบุเวลา query, environment และขอบเขตทุกครั้ง
- อย่าให้ agent เปิดเผย monitoring endpoint หรือแก้ production config เอง
- เก็บโค้ดและ configuration ใน Git แต่ไม่เก็บ secrets
- ทดสอบบน local lab ก่อนผูกกับบริการจริง

สำหรับ Obsidian แนะนำเชื่อมโน้ตชุดนี้เป็น:

```markdown
## Knowledge & Python Code

- [[Prometheus]]
- [[Python Metrics Instrumentation]]
- [[Docker Compose Environment Variables]]
- [[Grafana Administration]]
- [[Service Inventory]]
- [[Skill - Daily Briefing]]

> [!note]
> Python metrics demo เป็นข้อมูลจำลอง
> ส่วน monitoring report เป็น snapshot ของ scrape status
> ทั้งสองอย่างยังไม่ใช่ production health assessment
```

ลำดับที่เหมาะสมคือรัน `metrics_demo.py` → ให้ Prometheus scrape → ตรวจใน Grafana → ใช้ `monitoring_report.py` สร้างร่างรายงาน แล้วจึงนำหลักฐานที่ตรวจแล้วไปให้ Copilot สรุปใน Daily Briefing

การอ้างอิง:
[1] Writing client libraries https://prometheus.io/docs/instrumenting/writing_clientlibs/
[2] Counter | client_python https://prometheus.github.io/client_python/instrumenting/counter/
[3] Histogram | client_python https://prometheus.github.io/client_python/instrumenting/histogram/
[4] docs.docker.com › compose › how-tosDocker Documentation https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables.md
[5] client_python https://prometheus.github.io/client_python/
[6] HTTP/HTTPS | client_python - Prometheus https://prometheus.github.io/client_python/exporting/http/
[7] Monitor a Golang application with Prometheus and Grafana https://docs.docker.com/guides/go-prometheus-monitoring/
[8] Getting started | Prometheus https://prometheus.io/docs/prometheus/latest/getting_started/
[9] Workflow syntax for GitHub Actions https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax?ref
[10] Flow trigger endpoints | Langflow Documentation https://docs.langflow.org/api-flows-run
[11] LangChain | Products https://developers.oxylabs.io/products/web-scraper-api/solutions-for-ai-workflows/langchain
[12] Developer Interface — Requests 2.34.2 documentation https://docs.python-requests.org/en/latest/api/?highlight=raise_for_status
[13] Quickstart — Requests 2.34.2 documentation https://docs.python-requests.org/en/latest/user/quickstart/?highlight=raise_for_status
[14] valohai/prometheus-client-python https://github.com/valohai/prometheus-client-python
[15] Python Requests Timeout: Connect, Read and Handle Failures https://learn-api.com/tutorials/python/timeouts/
[16] How to Scrape Google Search Results Without Building Your Own ... https://dev.to/cecilia_hill_d7b1b8d510e7/how-to-scrape-google-search-results-without-building-your-own-scraper-1jho
[17] prometheus-client 0.13.1 - PyPI https://pypi.org/project/prometheus-client/0.13.1/
[18] prometheus-client 0.18.0 https://pypi.org/project/prometheus-client/0.18.0/
[19] [PDF] Requests Documentation https://docs.python-requests.org/_/downloads/en/v2.6.2/pdf/
