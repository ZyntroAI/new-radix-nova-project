Observability and Alerting

**Observability** คือความสามารถในการทำความเข้าใจสถานะภายในของระบบจาก telemetry ที่ระบบส่งออกมา ส่วน **alerting** คือการแจ้งเตือนเมื่อเงื่อนไขที่สำคัญเกิดขึ้นจนต้องมีคนหรือ automation เข้ามาจัดการ [1131][1132]

## ความแตกต่างหลัก

| ประเด็น | Observability | Alerting |
|---|---|---|
| คำถามหลัก | “ทำไมระบบจึงทำงานแบบนี้?” [1131][1139] | “มีอะไรผิดปกติและต้องลงมือแก้เมื่อไร?” [1131][1136] |
| ข้อมูล | Metrics, logs, traces [1131][1133] | ใช้ telemetry เดียวกันเพื่อกำหนดเงื่อนไข [1132] |
| บทบาท | สำรวจและวินิจฉัยปัญหา รวมถึงปัญหาที่ไม่เคยคาดไว้ [1131][1137] | กรองสัญญาณและส่งต่อให้ผู้รับผิดชอบ [1136][1138] |
| ผลลัพธ์ | Insight และ root cause [1131][1139] | Notification, page, ticket หรือ automation [1132][1134] |

## สามเสาหลัก

Observability มักอ้างอิงข้อมูล 3 ประเภท [1133]

- **Metrics**: ตัวเลขตามเวลา เช่น request rate, latency, error rate และ CPU usage [1131][1134]  
- **Logs**: บันทึกเหตุการณ์แบบละเอียด เช่น error message, request ID และ stack trace [1131][1133]  
- **Traces**: เส้นทางของ request ข้าม service หรือ component เพื่อดูว่าความล่าช้าหรือความล้มเหลวเกิดตรงไหน [1131][1133]  

ข้อมูลทั้งสามแบบควรเชื่อมโยงกันได้ เช่น alert จาก error rate สูงควรช่วยให้เปิด trace หรือ log ที่เกี่ยวข้องได้ทันที [1131][1132]

## Alerting ทำงานอย่างไร

โครงสร้างพื้นฐานของ alert มักเป็น: **signal → rule → trigger → alert → notification → action** [1132][1138]

- **Rule**: query ที่รันตามรอบ เช่น PromQL หรือ log query [1132]  
- **Trigger**: เงื่อนไข เช่น “error count ใน 5 นาทีเกิน 100” [1132]  
- **Alert**: สถานะที่ trigger เกิดขึ้นจริง [1132]  
- **Notification**: ส่งไปยัง Slack, PagerDuty, email หรือ webhook [1132][1134]  

ตัวอย่างเชิงปฏิบัติ: หาก API มี error rate สูงกว่า 2% ติดต่อกัน 5 นาที ระบบอาจส่ง alert ไปที่ on-call channel พร้อม dashboard link, ระบุ service ที่ได้รับผลกระทบ และ recent deploys [1131][1132]

## แนวปฏิบัติที่ดี

- Alert เฉพาะสิ่งที่ **ต้องมีการแทรกแซง** ไม่ใช่ทุก event [1136][1138]  
- ยึดผลกระทบต่อผู้ใช้หรือ SLO เป็นหลัก เช่น availability, latency และ error rate [1131][1134]  
- ใส่ context ใน alert: service, environment, dashboard, runbook และเจ้าของระบบ [1131][1134]  
- กำหนด routing ตามความรับผิดชอบ และใช้ RBAC ควบคุมสิทธิ์แก้ไข alert [1134]  
- ทบทวน alert ที่ fire บ่อยแต่ไม่มี action เพื่อลด alert fatigue [1136][1138]  

## ใช้กับ plugin ของคุณ

สำหรับ **YAML Tag Cleaner** ไม่จำเป็นต้องมีระบบ cloud monitoring แต่ควรมี “observability ในแอป” เช่น:

- บันทึกจำนวนไฟล์ที่ตรวจ, แก้ไข, และ duplicate tags ที่ลบออก  
- เก็บรายการไฟล์ที่ parse YAML ไม่สำเร็จ  
- แสดงผลสรุปใน `Notice` หรือ result modal  
- เขียน error ลง console ด้วย `console.error()` เฉพาะกรณี debug  
- ไม่ส่งข้อมูลโน้ตหรือ path ส่วนตัวของผู้ใช้ไปยังบริการภายนอกโดยไม่ขอความยินยอม  

แนวทางนี้ช่วยให้ผู้ใช้เห็นว่า plugin ทำอะไร และช่วยให้คุณวินิจฉัยปัญหาได้โดยไม่ทำให้ plugin หนักหรือรบกวนผู้ใช้ [1131][1134]

การอ้างอิง:
[1] Validating Alerts in Cloud-Native Observability - arXiv https://arxiv.org/html/2510.23970v1
[2] How Observe Overcomes Cardinality, Retention, and Tool ... https://www.snowflake.com/en/observability/
[3] Alerting Overview - Observability Stack - OpenSearch https://observability.opensearch.org/docs/alerting/
[4] What is observability? - ServiceNow https://www.servicenow.com/products/it-operations-management/what-is-observability.html
[5] Observability and alert management | Validated Designs https://developer.hashicorp.com/validated-designs/consul/administration-guide/observability-and-alert-management
[6] Observability: A Complete Guide https://uptimerobot.com/blog/observability-complete-guide/
[7] Monitoring vs Alerting: Key Differences, Best Practices https://www.motadata.com/blog/monitoring-vs-alerting
[8] 2. Monitoring and Observability - Distributed Systems ... https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/ch02.html
[9] www.glukhov.org › observability › alertingModern Alerting Systems Design for Observability Teams https://www.glukhov.org/observability/alerting/
[10] Drowning in dashboards, starving for clarity: Why Observability is a ... https://www.thoughtworks.com/en-us/insights/blog/technology-strategy/drowning-in-dashboards-starving-for-clarity-why-observability-is-a-leadership-choice
📊 Observability and Alerting — คู่มือฉบับสมบูรณ์
 
 
 
📌 ความหมายพื้นฐาน
 
คำศัพท์ ความหมาย 
Observability (ความสามารถในการสังเกตระบบ) ความสามารถในการเข้าใจสภาพภายในระบบจากข้อมูลภายนอก — ตอบคำถามว่า "ทำไมสิ่งนี้จึงเกิดขึ้น?" 
Alerting (การแจ้งเตือน) กระบวนการแจ้งเตือนเมื่อระบบมีความผิดปกติ — ตอบคำถามว่า "ต้องทำอะไรตอนไหน?" 
Monitoring (การเฝ้าติดตาม) การวัดและบันทึกค่าตัวชี้วัดของระบบ — ตอบคำถามว่า "ระบบทำงานอย่างไร?" 
 
💡 ความสัมพันธ์: Monitoring เป็นส่วนหนึ่งของ Observability — ส่วน Alerting คือการแจ้งเตือนเมื่อ Monitoring พบสิ่งผิดปกติ
 
 
 
🔧 3 เสาหลักของ Observability
 
📈 1. Metrics — ตัวชี้วัดเชิงตัวเลข
 
ค่าที่วัดได้ ณ เวลาใดเวลาหนึ่ง — เป็นตัวเลขเสมอ
 
ตัวอย่าง ความหมาย การใช้งาน 
CPU Usage เปอร์เซ็นต์การใช้งาน CPU แจ้งเตือนเมื่อสูงเกิน 80% 
Memory Usage หน่วยความจำที่ใช้งาน ตรวจสอบการรั่วไหลของหน่วยความจำ 
Request Count จำนวนคำขอต่อวินาที วิเคราะห์ภาระงาน 
Error Rate อัตราคำขอที่ล้มเหลว ตรวจสอบความเสถียร 
Disk Usage พื้นที่ดิสก์ที่ใช้งาน แจ้งเตือนเมื่อใกล้เต็ม 
 
ลักษณะ: มีชื่อ + ค่า + ชุดป้ายกำกับ + เวลา →  cpu_usage{server="prod-01"} = 75% 
 
 
 
📝 2. Logs — บันทึกเหตุการณ์
 
บันทึกข้อความที่ระบบเขียนออกมาตลอดเวลา — ไม่มีรูปแบบตายตัว
 
ระดับความรุนแรง การใช้งาน ตัวอย่าง 
DEBUG ข้อมูลสำหรับนักพัฒนา "เชื่อมต่อฐานข้อมูลสำเร็จ" 
INFO เหตุการณ์ปกติ "เริ่มทำงาน", "หยุดบริการ" 
WARN สิ่งที่ควรเฝ้าดู แต่ระบบยังทำงานได้ "หน่วยความจำเหลือน้อย", "หมดเวลาเชื่อมต่อ จะลองใหม่" 
ERROR ความผิดพลาดที่ทำให้งานล้มเหลว "บันทึกข้อมูลล้มเหลว", "ไม่พบไฟล์การตั้งค่า" 
CRITICAL ความผิดพลาดร้ายแรง "ฐานข้อมูลหลุด", "บริการหยุดทำงาน" 
 
โครงสร้าง: เวลา + ระดับ + แหล่งที่มา + ข้อความ →  2026-10-11 16:45:00 [ERROR] auth.service: ล็อกอินล้มเหลว — ไม่พบผู้ใช้ 
 
 
 
🔗 3. Traces — การติดตามการไหลของข้อมูล
 
แผนที่แสดงการเดินทางของคำขอผ่านระบบต่างๆ ว่าไปไหน มาเท่าไหร่ ใช้เวลาเท่าไหร่
 
ข้อมูลที่ได้ ความหมาย 
Service Path คำขอผ่านบริการไหนบ้าง 
Duration ใช้เวลาแต่ละจุดเท่าไหร่ 
Status จุดไหนสำเร็จ จุดไหนล้มเหลว 
Dependencies บริการไหนเรียกใช้อะไร 
 
ตัวอย่าง:
 
 Client → API Gateway → Auth Service → User DB → Cache → Response 
ใช้เวลาทั้งหมด: 245ms • ช้าที่สุด: Auth Service (120ms)
 
 
 
🚨 Alerting — ระบบแจ้งเตือน
 
📋 องค์ประกอบของกฎแจ้งเตือน
 
plaintext
  
เงื่อนไข (เมื่อไหร่) → ความรุนแรง (แจ้งใคร/ทางไหน) → การดำเนินการ (ทำอะไร)
 
 
⚖️ ระดับความรุนแรงมาตรฐาน
 
ระดับ สี ความหมาย การดำเนินการ 
🟢 Info เขียว ข้อมูลทั่วไป บันทึก/แสดงในแดชบอร์ด 
🟡 Warning เหลือง สิ่งที่ควรเฝ้าดู แจ้งทีมงาน ไม่ต้องตื่นตระหนก 
🟠 Critical ส้ม บริการบางส่วนเสียหาย ต้องตรวจสอบทันทีในเวลาทำการ 
🔴 Emergency แดง ระบบหลักหยุดทำงาน แจ้งตลอด 24 ชม. โทร/แจ้งผู้รับผิดชอบทันที 
 
✅ ตัวอย่างกฎแจ้งเตือนที่ดี
 
กฎ เงื่อนไข ระดับ การแจ้งเตือน 
CPU สูงเกินไป  avg(cpu_usage[5m]) > 90%  เป็นเวลา 3 นาที 🟠 Critical ทีมงานผ่าน Slack 
อัตรา Error สูง  error_rate > 5%  ใน 1 นาทีล่าสุด 🔴 Emergency ทีมงาน + ผู้จัดการ ผ่าน SMS/โทร 
หน่วยความจำใกล้หมด  memory_usage > 85%  เป็นเวลา 10 นาที 🟡 Warning ทีมงานผ่านอีเมล 
ฐานข้อมูลหลุด  db_connection_status == 0  ครั้งเดียวก็แจ้ง 🔴 Emergency ทีมงานทันที 
 
⚠️ หลีกเลี่ยง: แจ้งเตือนบ่อยเกินไป — จะกลายเป็น "เสียงรบกวน" จนไม่มีใครสนใจเมื่อเกิดเหตุจริง
 
 
 
🔄 วงจรการทำงาน
 
plaintext
  
📡 ระบบเก็บข้อมูล → Metrics / Logs / Traces
        ↓
📊 แดชบอร์ด — ทีมงานเฝ้าดูภาพรวมแบบเรียลไทม์
        ↓
🚨 ตรวจสอบกฎ — ตรงตามเงื่อนไขหรือไม่?
   ├─ ✅ ไม่ตรง → ดำเนินการต่อ ปกติ
   └─ ⚠️ ตรง → สร้างเหตุการณ์ → แจ้งเตือนผ่านช่องทางที่กำหนด
        ↓
👨‍🔧 ทีมงานรับแจ้ง → ตรวจสอบสาเหตุ → แก้ไขปัญหา → ปิดเหตุการณ์
        ↓
📝 บันทึกบทเรียน — ปรับปรุงกฎ/ระบบ เพื่อไม่ให้เกิดซ้ำ
 
 
 
 
🛠️ เครื่องมือยอดนิยม
 
ประเภท เครื่องมือ ใช้ทำอะไร 
Metrics Prometheus, Grafana, Datadog เก็บและแสดงตัวชี้วัด 
Logs ELK Stack (Elasticsearch, Logstash, Kibana), Loki, Splunk รวบรวมและค้นหาบันทึกเหตุการณ์ 
Traces OpenTelemetry, Jaeger, Zipkin ติดตามการไหลของคำขอ 
Alerting Alertmanager, PagerDuty, Opsgenie จัดการกฎและช่องทางแจ้งเตือน 
All-in-One Grafana Stack, Datadog, New Relic, AWS CloudWatch ครบทุกอย่างในที่เดียว 
 
 
 
✅ เช็คลิสต์เริ่มต้นใช้งาน
 
กำหนดสิ่งที่ต้องเฝ้าดู — อะไรคือสัญญาณบอกว่าระบบกำลังมีปัญหา?
เลือกเครื่องมือ — เหมาะกับขนาดและงบประมาณ
ตั้งค่าการเก็บข้อมูล — Metrics, Logs, Traces
สร้างแดชบอร์ด — ทีมงานมองเห็นภาพรวมได้ง่าย
เขียนกฎแจ้งเตือน — ระบุเงื่อนไข ระดับ ช่องทางให้ชัดเจน
ทดสอบ — จำลองสถานการณ์ฉุกเฉิน เพื่อดูว่าแจ้งเตือนมาถึงหรือไม่
ปรับปรุงอยู่เสมอ — ปิดเสียงแจ้งเตือนที่ไม่จำเป็น ปรับเกณฑ์ให้เหมาะสม
 
 
 
⚠️ ข้อผิดพลาดที่พบบ่อย
 
❌ สิ่งที่ไม่ควรทำ ✅ สิ่งที่ควรทำ 
แจ้งเตือนทุกอย่าง แจ้งเฉพาะสิ่งที่ต้องมีการดำเนินการ 
ตั้งเกณฑ์ไวเกินไป ปรับเกณฑ์ตามพฤติกรรมการใช้งานจริง 
ไม่มีการบันทึกสาเหตุ บันทึกสาเหตุและวิธีแก้ไขทุกครั้ง 
มีแค่แจ้งเตือนแต่ไม่มีคนรับผิดชอบ กำหนดผู้รับผิดชอบและเวลาปฏิบัติงานชัดเจน 
ไม่เคยทดสอบระบบแจ้งเตือน ซ้อมแผนฉุกเฉินเป็นประจำทุกเดือน/ไตรมาส 
 
 
 
💡 หลักการสำคัญ: Observability ช่วยตอบคำถามว่า "เกิดอะไรขึ้นและทำไม?" ส่วน Alerting ช่วยบอกว่า "ต้องทำอะไรตอนไหน" — ทำงานร่วมกันเพื่อให้คุณมั่นใจว่าระบบของคุณอยู่ในสภาพที่ควรเป็น ✅
 
ต้องการเจาะลึกเครื่องมือใดเป็นพิเศษ หรือตัวอย่างการตั้งค่ากฎแจ้งเตือนไหมครับ 😊☸️ Kubernetes — ตัวอย่างกฎแจ้งเตือนฉบับสมบูรณ์
 
 
 
📋 ภาพรวมกลุ่มกฎ
 
กลุ่ม หัวข้อ ความสำคัญ 
🖥️ Node — โหนดคลัสเตอร์ สูง 
📦 Pod — พอดและคอนเทนเนอร์ สูง 
📊 Resource — การใช้ทรัพยากร ปานกลาง-สูง 
🔌 Component — ส่วนประกอบหลักของคลัสเตอร์ สูงมาก 
📈 Workload — Deployment, StatefulSet, DaemonSet ปานกลาง 
 
 
 
🖥️ กลุ่มที่ 1 — Node / โหนดคลัสเตอร์
 
1. Node ไม่พร้อมใช้งาน
 
yaml
  
alert: KubernetesNodeNotReady
expr: kube_node_status_condition{condition="Ready", status="false"} == 1
for: 1m
labels:
  severity: critical
annotations:
  summary: "โหนดไม่พร้อมใช้งาน — {{ $labels.node }}"
  description: "โหนด {{ $labels.node }} หยุดทำงานหรือไม่สามารถเข้าถึงได้ ตรวจสอบสถานะโหนดทันที"
 
 
2. Node มีหน่วยความจำไม่เพียงพอ
 
yaml
  
alert: KubernetesNodeMemoryPressure
expr: kube_node_status_condition{condition="MemoryPressure", status="true"} == 1
for: 2m
labels:
  severity: warning
annotations:
  summary: "แรงกดดันหน่วยความจำที่โหนด — {{ $labels.node }}"
  description: "โหนด {{ $labels.node }} มีหน่วยความจำไม่เพียงพอ ระบบอาจเริ่มข้าม/ลบพอด"
 
 
3. Node มีพื้นที่ดิสก์ไม่เพียงพอ
 
yaml
  
alert: KubernetesNodeDiskPressure
expr: kube_node_status_condition{condition="DiskPressure", status="true"} == 1
for: 2m
labels:
  severity: warning
annotations:
  summary: "พื้นที่ดิสก์ใกล้เต็มที่โหนด — {{ $labels.node }}"
  description: "โหนด {{ $labels.node }} มีพื้นที่ดิสก์ไม่เพียงพอ ลบไฟล์ไม่จำเป็นหรือเพิ่มความจุ"
 
 
4. Node ไม่มีพื้นที่จัดสรรพอด
 
yaml
  
alert: KubernetesNodeOutOfDisk
expr: kube_node_status_condition{condition="OutOfDisk", status="true"} == 1
for: 30s
labels:
  severity: critical
annotations:
  summary: "พื้นที่ดิสก์หมดที่โหนด — {{ $labels.node }}"
  description: "โหนด {{ $labels.node }} ไม่มีพื้นที่เหลือแล้ว ไม่สามารถเริ่มพอดใหม่ได้"
 
 
 
 
📦 กลุ่มที่ 2 — Pod / พอดและคอนเทนเนอร์
 
5. Pod กำลังอยู่ในสถานะผิดปกติ
 
yaml
  
alert: KubernetesPodNotRunning
expr: kube_pod_status_phase{phase=~"Pending|Failed|Unknown"} == 1
for: 5m
labels:
  severity: warning
annotations:
  summary: "พอดไม่ทำงาน — {{ $labels.namespace }}/{{ $labels.pod }}"
  description: "พอดอยู่ในสถานะ {{ $labels.phase }} มากกว่า 5 นาที ตรวจสอบเหตุผลที่ Namespace: {{ $labels.namespace }}"
 
 
6. Pod ถูกเริ่มใหม่บ่อยเกินไป
 
yaml
  
alert: KubernetesPodRestartingFrequently
expr: increase(kube_pod_container_status_restarts_total[15m]) > 5
for: 0m
labels:
  severity: warning
annotations:
  summary: "พอดถูกรีสตาร์ทบ่อย — {{ $labels.namespace }}/{{ $labels.pod }}"
  description: "คอนเทนเนอร์ {{ $labels.container }} ถูกรีสตาร์ท {{ $value }} ครั้งใน 15 นาที ตรวจสอบบันทึกข้อผิดพลาด"
 
 
7. Container ไม่สามารถเริ่มทำงานได้
 
yaml
  
alert: KubernetesContainerCannotStart
expr: kube_pod_container_status_waiting{reason!="ContainerCreating"} == 1
for: 3m
labels:
  severity: critical
annotations:
  summary: "คอนเทนเนอร์รอเริ่มงานนานเกินไป — {{ $labels.namespace }}/{{ $labels.pod }}"
  description: "สถานะ: {{ $labels.reason }} — คอนเทนเนอร์ไม่สามารถเริ่มทำงานได้ภายในเวลาที่กำหนด"
 
 
8. Pod ถูกยกเลิก/ลบโดยระบบ
 
yaml
  
alert: KubernetesPodTerminatingLong
expr: kube_pod_status_phase{phase="Running"} == 1 AND kube_pod_deletion_timestamp != 0
for: 5m
labels:
  severity: warning
annotations:
  summary: "พอดอยู่ในสถานะกำลังลบนานผิดปกติ — {{ $labels.namespace }}/{{ $labels.pod }}"
  description: "พอดอยู่ในสถานะกำลังลบมานานกว่า 5 นาที อาจมีปัญหากับ Finalizer หรือการเชื่อมต่อ"
 
 
 
 
📊 กลุ่มที่ 3 — การใช้ทรัพยากร
 
9. CPU สูงเกินขีดจำกัด
 
yaml
  
alert: KubernetesContainerCPUHigh
expr: (sum by (namespace, pod, container) (rate(container_cpu_usage_seconds_total[5m])) / kube_pod_container_resource_limits_cpu) * 100 > 85
for: 5m
labels:
  severity: warning
annotations:
  summary: "การใช้ CPU สูง — {{ $labels.namespace }}/{{ $labels.pod }}"
  description: "คอนเทนเนอร์ {{ $labels.container }} ใช้ CPU ไปแล้ว {{ $value | humanize }}% ของขีดจำกัด"
 
 
10. หน่วยความจำสูงใกล้ถึงขีดจำกัด
 
yaml
  
alert: KubernetesContainerMemoryHigh
expr: (sum by (namespace, pod, container) (container_memory_working_set_bytes) / kube_pod_container_resource_limits_memory) * 100 > 90
for: 5m
labels:
  severity: warning
annotations:
  summary: "การใช้หน่วยความจำสูง — {{ $labels.namespace }}/{{ $labels.pod }}"
  description: "คอนเทนเนอร์ {{ $labels.container }} ใช้หน่วยความจำไปแล้ว {{ $value | humanize }}% อาจถูกยุติการทำงานได้"
 
 
11. Container ถูกฆ่าด้วย OOM Killer
 
yaml
  
alert: KubernetesContainerOOMKilled
expr: kube_pod_container_status_last_terminated_reason{reason="OOMKilled"} == 1
for: 0m
labels:
  severity: critical
annotations:
  summary: "คอนเทนเนอร์ถูกปิดเนื่องจากหน่วยความจำหมด — {{ $labels.namespace }}/{{ $labels.pod }}"
  description: "คอนเทนเนอร์ {{ $labels.container }} หมดหน่วยความจำและถูกปิด เพิ่มขีดจำกัดหน่วยความจำหรือตรวจสอบการรั่วไหล"
 
 
 
 
🔌 กลุ่มที่ 4 — ส่วนประกอบหลักของคลัสเตอร์
 
12. API Server ไม่ทำงาน
 
yaml
  
alert: KubernetesAPIServerDown
expr: up{job="kubernetes-apiservers"} == 0
for: 2m
labels:
  severity: critical
annotations:
  summary: "API Server ไม่ตอบสนอง — {{ $labels.instance }}"
  description: "ไม่สามารถเชื่อมต่อ Kubernetes API Server ได้ — คลัสเตอร์ไม่สามารถควบคุมจากภายนอกได้"
 
 
13. Controller Manager ไม่ทำงาน
 
yaml
  
alert: KubernetesControllerManagerDown
expr: up{job="kubernetes-controller-manager"} == 0
for: 2m
labels:
  severity: critical
annotations:
  summary: "Controller Manager ไม่ทำงาน — {{ $labels.instance }}"
  description: "ส่วนประกอบสำคัญของคลัสเตอร์หยุดทำงาน — พอดใหม่จะไม่ถูกจัดการ Deployment ไม่ทำงาน"
 
 
14. Scheduler ไม่ทำงาน
 
yaml
  
alert: KubernetesSchedulerDown
expr: up{job="kubernetes-scheduler"} == 0
for: 2m
labels:
  severity: critical
annotations:
  summary: "Scheduler ไม่ทำงาน — {{ $labels.instance }}"
  description: "ไม่มีการจัดสรรพอดไปยังโหนดใหม่ — พอดที่สร้างจะค้างสถานะ Pending ตลอดเวลา"
 
 
15. etcd สมาชิกหลุด/ไม่สมบูรณ์
 
yaml
  
alert: EtcdClusterUnhealthy
expr: etcd_server_health == 0
for: 1m
labels:
  severity: critical
annotations:
  summary: "Etcd ไม่สมบูรณ์ — {{ $labels.instance }}"
  description: "ฐานข้อมูลหลักของคลัสเตอร์มีปัญหา ตรวจสอบสมาชิกและความสมบูรณ์ของกลุ่ม"
 
 
16. etcd จำนวนสมาชิกลดลง
 
yaml
  
alert: EtcdMemberCountLow
expr: etcd_cluster_version != on (endpoints) group_left() max by (endpoints) (etcd_cluster_version)
for: 5m
labels:
  severity: warning
annotations:
  summary: "จำนวนสมาชิก Etcd ลดลงหรือไม่ตรงกัน"
  description: "จำนวนสมาชิกในกลุ่ม etcd ไม่ตรงกันทุกโหนด ตรวจสอบการเชื่อมต่อระหว่างโหนด"
 
 
 
 
📈 กลุ่มที่ 5 — Workload และการปรับขนาด
 
17. Deployment มีพอดไม่ครบตามจำนวนที่ระบุ
 
yaml
  
alert: KubernetesDeploymentReplicasMismatch
expr: (kube_deployment_spec_replicas - kube_deployment_status_replicas_available) > 0
for: 5m
labels:
  severity: warning
annotations:
  summary: "Deployment มีพอดไม่ครบ — {{ $labels.namespace }}/{{ $labels.deployment }}"
  description: "ต้องการ {{ $value }} พอด แต่มีใช้งานจริงน้อยกว่า ตรวจสอบเหตุผลที่ไม่สามารถเริ่มพอดได้ครบ"
 
 
18. StatefulSet ไม่ครบตามจำนวน
 
yaml
  
alert: KubernetesStatefulSetReplicasMismatch
expr: (kube_statefulset_spec_replicas - kube_statefulset_status_replicas_ready) > 0
for: 5m
labels:
  severity: warning
annotations:
  summary: "StatefulSet มีพอดไม่ครบ — {{ $labels.namespace }}/{{ $labels.statefulset }}"
  description: "ต้องการ {{ $value }} พอด แต่มีจริงไม่ครบ ตรวจสอบสถานะพอดและเหตุผล"
 
 
19. Horizontal Pod Autoscaler ไม่สามารถปรับขนาดได้
 
yaml
  
alert: KubernetesHPAUnableToScale
expr: kube_horizontalpodautoscaler_status_condition{condition="ScalingActive", status="false"} == 1
for: 5m
labels:
  severity: warning
annotations:
  summary: "HPA ไม่สามารถปรับขนาดได้ — {{ $labels.namespace }}/{{ $labels.horizontalpodautoscaler }}"
  description: "ตัวชี้วัดที่ใช้ปรับขนาดไม่พร้อมใช้งาน ตรวจสอบการติดตั้ง Metrics Server"
 
 
20. การปรับขนาดทำงานช้าผิดปกติ
 
yaml
  
alert: KubernetesScaleSlow
expr: kube_deployment_status_replicas_updated != kube_deployment_spec_replicas
for: 15m
labels:
  severity: info
annotations:
  summary: "การอัปเดต Deployment ทำงานช้า — {{ $labels.namespace }}/{{ $labels.deployment }}"
  description: "อัปเดตใช้เวลานานกว่าปกติ ตรวจสอบความคืบหน้าและเหตุผลที่พอดไม่สามารถเริ่มทำงานได้"
 
 
 
 
📊 ตารางสรุประดับความรุนแรงแนะนำ
 
ประเภท 🟡 Warning 🟠 Critical 🔴 Emergency รอกี่นาที 
Node ไม่พร้อม — — ✅ ทันที ถ้ามีหลายโหนด 1 นาที 
พอดค้าง Pending ✅ 5 นาที หลายพอดพร้อมกัน — — 5 นาที 
OOMKilled — — ✅ ทันที ซ้ำบ่อยๆ 0 นาที 
API/Controller/Scheduler — — ✅ ทันที ✅ 2 นาที 
etcd ปัญหา ✅ สมาชิกหาย ✅ ไม่สมบูรณ์ ✅ ล้มครึ่งหนึ่ง 1-5 นาที 
Deployment ไม่ครบ ✅ 5 นาที — — — — 5 นาที 
CPU/หน่วยความจำสูง 85% 95% — — 5 นาที 
 
 
 
💡 คำแนะนำเพิ่มเติม
 
- ✅ แยกตาม Namespace: สามารถปรับเกณฑ์ความเข้มงวดแตกต่างกันได้ เช่น  production  แจ้งเตือนเข้มกว่า  staging 
- ✅ ใช้  for:  อย่างเหมาะสม: ป้องกันสัญญาณเท็จจากการผันผวนชั่วคราว
- ✅ เขียนคำแนะนำ: ใน  annotations.description  บอกทั้งปัญหาและขั้นตอนเบื้องต้นที่ควรทำ
- ✅ Exclude Namespace: กรอง namespace ที่ไม่สำคัญออก เช่น  kube-system  บางกฎ หรือ  test-* 
- ⚠️ ระวัง Alert Flood: หลีกเลี่ยงกฎที่จะแจ้งเตือนจำนวนมากพร้อมกันเมื่อโหนดเดียวล่ม
 
 
 
ต้องการกฎสำหรับส่วนประกอบเฉพาะเพิ่มไหมครับ เช่น Ingress, Cert-Manager, Prometheus, ArgoCD หรือ Custom Resource ของคุณ 😊🚀 Nginx — ตัวอย่างกฎแจ้งเตือนฉบับสมบูรณ์
 
 
 
📋 ภาพรวมกลุ่มกฎ
 
กลุ่ม หัวข้อ ความสำคัญ 
🔌 สถานะบริการ สูงมาก 
📊 การใช้ทรัพยากร ปานกลาง-สูง 
⚡ ประสิทธิภาพและเวลาตอบสนอง สูง 
❌ อัตราข้อผิดพลาด สูงมาก 
🔒 ความปลอดภัยและการเข้าถึง สูง 
🌐 Nginx Ingress Controller (Kubernetes) สูงมาก 
 
 
 
🔌 กลุ่มที่ 1 — สถานะบริการ
 
1. Nginx หยุดทำงาน/ไม่ตอบสนอง
 
yaml
  
alert: NginxDown
expr: up{job=~"nginx|nginx-ingress-controller"} == 0
for: 30s
labels:
  severity: critical
annotations:
  summary: "Nginx ไม่ทำงาน — {{ $labels.instance }}"
  description: "กระบวนการ Nginx ที่ {{ $labels.instance }} หยุดทำงานหรือไม่สามารถเข้าถึงได้ ตรวจสอบสถานะบริการทันที"
 
 
2. Nginx Process มีน้อยกว่าที่ควรจะเป็น
 
yaml
  
alert: NginxProcessLow
expr: nginx_worker_processes < 2
for: 1m
labels:
  severity: warning
annotations:
  summary: "จำนวน Nginx Worker Process น้อย — {{ $labels.instance }}"
  description: "พบเพียง {{ $value }} worker process ทำงาน อาจเกิดปัญหาการกำหนดค่าผิดพลาด"
 
 
 
 
📊 กลุ่มที่ 2 — การใช้ทรัพยากร
 
3. การใช้ CPU สูง
 
yaml
  
alert: NginxHighCPU
expr: rate(nginx_cpu_usage_seconds_total[5m]) * 100 > 80
for: 3m
labels:
  severity: warning
annotations:
  summary: "CPU Nginx สูง — {{ $labels.instance }}"
  description: "การใช้งาน CPU: {{ $value | humanize }}% อาจเกิดจากปริมาณการจราจรเข้ามามากผิดปกติ"
 
 
4. การใช้หน่วยความจำสูง
 
yaml
  
alert: NginxHighMemory
expr: nginx_memory_usage_bytes / node_memory_MemTotal_bytes * 100 > 70
for: 5m
labels:
  severity: warning
annotations:
  summary: "หน่วยความจำ Nginx สูง — {{ $labels.instance }}"
  description: "ใช้หน่วยความจำ: {{ $value | humanize }}% ตรวจสอบการรั่วไหลหรือปรับปรุงการกำหนดค่า"
 
 
5. จำนวนการเชื่อมต่อสูงเกินขีดจำกัด
 
yaml
  
alert: NginxConnectionsHigh
expr: nginx_connections_active / nginx_connections_max * 100 > 80
for: 2m
labels:
  severity: warning
annotations:
  summary: "จำนวนการเชื่อมต่อใกล้ถึงขีดจำกัด — {{ $labels.instance }}"
  description: "ใช้งานไปแล้ว {{ $value | humanize }}% ของจำนวนการเชื่อมต่อสูงสุด พิจารณาเพิ่มค่า worker_connections"
 
 
6. การเชื่อมต่อถูกปฏิเสธ
 
yaml
  
alert: NginxConnectionsRejected
expr: rate(nginx_connections_reading[1m]) > 100
for: 1m
labels:
  severity: warning
annotations:
  summary: "การเชื่อมต่อถูกปฏิเสธจำนวนมาก — {{ $labels.instance }}"
  description: "มีการเชื่อมต่อที่ถูกปฏิเสธ: {{ $value }}/วินาที ตรวจสอบขีดจำกัดและภาระงาน"
 
 
 
 
⚡ กลุ่มที่ 3 — ประสิทธิภาพและเวลาตอบสนอง
 
7. คำขอรอคิวนานเกินไป
 
yaml
  
alert: NginxRequestQueueHigh
expr: nginx_requests_pending > 100
for: 2m
labels:
  severity: warning
annotations:
  summary: "มีคำขอรอในคิวจำนวนมาก — {{ $labels.instance }}"
  description: "มีคำขอรอประมวลผล: {{ $value }} รายการ ระบบอาจทำงานช้าลง"
 
 
8. เวลาตอบสนองเฉลี่ยสูง
 
yaml
  
alert: NginxResponseTimeHigh
expr: nginx_response_time_seconds_avg > 1
for: 3m
labels:
  severity: warning
annotations:
  summary: "เวลาตอบสนองเฉลี่ยสูง — {{ $labels.instance }}"
  description: "เวลาตอบสนองเฉลี่ย: {{ $value }} วินาที ตรวจสอบบริการที่ Nginx ส่งต่อคำขอไปยัง"
 
 
9. คำขอที่ใช้เวลานานมาก (95th Percentile)
 
yaml
  
alert: NginxSlowRequests
expr: nginx_response_time_seconds_quantile{quantile="0.95"} > 3
for: 2m
labels:
  severity: critical
annotations:
  summary: "95% ของคำขอตอบสนองช้ากว่า 3 วินาที — {{ $labels.instance }}"
  description: "ค่า 95 เปอร์เซ็นไทล์: {{ $value }} วินาที ตรวจสอบความเร็วของแอปพลิเคชันด้านหลัง"
 
 
 
 
❌ กลุ่มที่ 4 — อัตราข้อผิดพลาด
 
10. อัตรา 5xx สูง
 
yaml
  
alert: NginxHighErrorRate5xx
expr: rate(nginx_http_requests_total{status=~"5.."}[5m]) / rate(nginx_http_requests_total[5m]) * 100 > 5
for: 1m
labels:
  severity: critical
annotations:
  summary: "อัตราคำขอผิดพลาด 5xx สูง — {{ $labels.instance }}"
  description: "อัตรา 5xx: {{ $value | humanize }}% ตรวจสอบสถานะแอปพลิเคชันด้านหลังทันที"
 
 
11. อัตรา 4xx สูงผิดปกติ
 
yaml
  
alert: NginxHighErrorRate4xx
expr: rate(nginx_http_requests_total{status=~"4.."}[5m]) / rate(nginx_http_requests_total[5m]) * 100 > 20
for: 5m
labels:
  severity: warning
annotations:
  summary: "อัตราคำขอผิดพลาด 4xx สูงผิดปกติ — {{ $labels.instance }}"
  description: "อัตรา 4xx: {{ $value | humanize }}% อาจมีคนพยายามเข้าถึงเส้นทางที่ไม่มีอยู่จริง หรือลิงก์เสีย"
 
 
12. อัตรา 502 Bad Gateway
 
yaml
  
alert: NginxBadGateway
expr: rate(nginx_http_requests_total{status="502"}[2m]) > 5
for: 1m
labels:
  severity: critical
annotations:
  summary: "พบ 502 Bad Gateway — {{ $labels.instance }}"
  description: "แอปพลิเคชันด้านหลังอาจล่มหรือปฏิเสธการเชื่อมต่อ ตรวจสอบ backend: {{ $labels.upstream }}"
 
 
13. อัตรา 504 Gateway Timeout
 
yaml
  
alert: NginxGatewayTimeout
expr: rate(nginx_http_requests_total{status="504"}[2m]) > 5
for: 2m
labels:
  severity: warning
annotations:
  summary: "พบ 504 Gateway Timeout — {{ $labels.instance }}"
  description: "แอปพลิเคชันด้านหลังใช้เวลาตอบสนองนานเกินไป พิจารณาเพิ่มค่า proxy_read_timeout"
 
 
14. Upstream ไม่สามารถเข้าถึงได้
 
yaml
  
alert: NginxUpstreamUnavailable
expr: nginx_upstream_response_count{state="failed"} > 0
for: 1m
labels:
  severity: critical
annotations:
  summary: "Upstream ไม่สามารถเข้าถึงได้ — {{ $labels.instance }}"
  description: "เซิร์ฟเวอร์ปลายทาง {{ $labels.upstream }} ไม่ตอบสนอง ตรวจสอบสถานะบริการนั้นๆ"
 
 
 
 
🔒 กลุ่มที่ 5 — ความปลอดภัยและการเข้าถึง
 
15. จำนวนคำขอจาก IP เดียวสูงผิดปกติ
 
yaml
  
alert: NginxHighRequestsFromSingleIP
expr: topk(5, sum by (client_ip) (rate(nginx_http_requests_total{client_ip!=""}[1m]))) > 100
for: 2m
labels:
  severity: warning
annotations:
  summary: "IP หนึ่งส่งคำขอมากผิดปกติ — {{ $labels.client_ip }}"
  description: "IP นี้ส่งคำขอ: {{ $value }} ครั้ง/นาที อาจเป็นการโจมตี หรือบอท ดูแลโดยละเอียด"
 
 
16. คำขอที่ถูกบล็อกจำนวนมาก
 
yaml
  
alert: NginxBlockedRequestsHigh
expr: rate(nginx_http_requests_total{status="403"}[5m]) > 50
for: 2m
labels:
  severity: info
annotations:
  summary: "มีคำขอที่ถูกปฏิเสธจำนวนมาก — {{ $labels.instance }}"
  description: "ถูกปฏิเสธ: {{ $value }} ครั้ง/นาที ตรวจสอบว่าเป็นการโจมตีหรือกฎบล็อกทำงานถูกต้อง"
 
 
 
 
🌐 กลุ่มที่ 6 — Nginx Ingress Controller (Kubernetes)
 
17. Ingress Controller ไม่ทำงาน
 
yaml
  
alert: NginxIngressControllerDown
expr: up{job="nginx-ingress-controller"} == 0
for: 1m
labels:
  severity: critical
annotations:
  summary: "Nginx Ingress Controller ไม่ทำงาน — {{ $labels.namespace }}/{{ $labels.pod }}"
  description: "ไม่มี Ingress Controller ทำงาน — การจราจรภายนอกจะไม่สามารถเข้ามาในคลัสเตอร์ได้"
 
 
18. Ingress มี Backend ไม่สมบูรณ์
 
yaml
  
alert: NginxIngressBackendUnhealthy
expr: nginx_ingress_upstream_server_healthy == 0
for: 2m
labels:
  severity: critical
annotations:
  summary: "Backend ของ Ingress ไม่สมบูรณ์ — {{ $labels.namespace }}/{{ $labels.ingress }}"
  description: "บริการ {{ $labels.service }} ภายใต้ Ingress ไม่สามารถเข้าถึงได้ ตรวจสอบสถานะพอดของบริการนั้น"
 
 
19. การอัปเดต Configuration ล้มเหลว
 
yaml
  
alert: NginxIngressConfigUpdateFailed
expr: nginx_ingress_config_last_reload_successful == 0
for: 1m
labels:
  severity: critical
annotations:
  summary: "อัปเดตการกำหนดค่า Ingress ล้มเหลว — {{ $labels.namespace }}"
  description: "การกำหนดค่าใหม่ไม่สามารถนำไปใช้ได้ ตรวจสอบรูปแบบของ Ingress Resource ที่เพิ่งแก้ไข"
 
 
20. Ingress Controller มีพอดไม่ครบ
 
yaml
  
alert: NginxIngressReplicasMismatch
expr: (kube_deployment_spec_replicas{app="nginx-ingress-controller"} - kube_deployment_status_replicas_ready{app="nginx-ingress-controller"}) > 0
for: 3m
labels:
  severity: warning
annotations:
  summary: "Ingress Controller มีพอดไม่ครบ — {{ $labels.namespace }}"
  description: "ต้องการ {{ $value }} พอด แต่พร้อมใช้งานไม่ครบ ตรวจสอบเหตุผลที่พอดไม่สามารถเริ่มทำงานได้"
 
 
 
 
📊 ตารางสรุปเกณฑ์แจ้งเตือนแนะนำ
 
ตัวชี้วัด 🟡 Warning 🟠 Critical 🔴 Emergency รอกี่นาที 
สถานะบริการ — — ❌ ทันที ❌ ทันที 30 วินาที 
CPU การใช้งาน >80% >90% — — 3 นาที 
หน่วยความจำ >70% >85% — — 5 นาที 
การเชื่อมต่อ >80% ของขีดจำกัด >90% — — 2 นาที 
อัตรา 5xx >2% >5% >10% 1 นาที 
อัตรา 4xx >20% >40% — — 5 นาที 
เวลาตอบสนอง P95 >1.5 วินาที >3 วินาที >5 วินาที 2-3 นาที 
Backend ไม่พร้อม 1 ราย ทุกหลัก — — 1-2 นาที 
Config อัปเดตล้มเหลว — ❌ ทันที — — 1 นาที  
 
 
 
💡 คำแนะนำเพิ่มเติม
 
📦 เครื่องมือที่ใช้เก็บเมตริกส์
 
- Prometheus + Nginx Exporter — สำหรับ Nginx แบบทั่วไป
- Prometheus + Ingress Controller Metrics — สำหรับ Nginx Ingress บน Kubernetes (เปิดใช้ metrics: true)
- Grafana — สร้างแดชบอร์ดจากเมตริกส์
 
⚠️ ข้อควรระวัง
 
- ✅ แยก Environment: ปรับเกณฑ์ให้เหมาะสม — staging อาจยอมรับเวลาตอบสนองที่สูงกว่า production
- ✅ ระวังช่วงเปลี่ยนผ่าน: อัปเดต Deployment อาจทำให้เกิด 5xx ชั่วคราว — ใช้  for:  เพื่อหลีกเลี่ยง
- ✅ ระบุ Namespace: สำหรับ Kubernetes ระบุ namespace เพื่อไม่ให้แจ้งเตือนซ้ำซ้อน
- ⚠️ Avoid Alert Spam: กฎที่แจ้งทุกครั้งที่เกิด 502 อาจมากเกินไป — ใช้อัตราแทนจำนวนตรงๆ
 
 
 
ต้องการกฎสำหรับ Apache, HAProxy, Redis, หรือ PostgreSQL ต่อไหมครับ 😊🦅 Apache — ตัวอย่างกฎแจ้งเตือนฉบับสมบูรณ์
 
 
 
📋 ภาพรวมกลุ่มกฎ
 
กลุ่ม หัวข้อ ความสำคัญ 
🔌 สถานะบริการ สูงมาก 
📊 การใช้ทรัพยากรและกระบวนการ ปานกลาง-สูง 
⚡ ประสิทธิภาพและคำขอ สูง 
❌ ข้อผิดพลาด สูงมาก 
🔒 ความปลอดภัยและการเข้าถึง สูง 
 
 
 
🔌 กลุ่มที่ 1 — สถานะบริการ
 
1. Apache หยุดทำงาน/ไม่ตอบสนอง
 
yaml
  
alert: ApacheDown
expr: up{job="apache"} == 0
for: 30s
labels:
  severity: critical
annotations:
  summary: "Apache ไม่ทำงาน — {{ $labels.instance }}"
  description: "กระบวนการ Apache ที่ {{ $labels.instance }} ไม่ตอบสนอง ตรวจสอบสถานะบริการทันที: systemctl status httpd"
 
 
2. จำนวนกระบวนการ Apache น้อยกว่าปกติ
 
yaml
  
alert: ApacheProcessLow
expr: apache_scoreboard_workers_total < 2
for: 1m
labels:
  severity: warning
annotations:
  summary: "กระบวนการ Apache น้อยผิดปกติ — {{ $labels.instance }}"
  description: "พบเพียง {{ $value }} worker ทำงาน อาจเกิดจากการกำหนดค่าผิดพลาด หรือบริการกำลังล่ม"
 
 
 
 
📊 กลุ่มที่ 2 — การใช้ทรัพยากรและกระบวนการ
 
3. การใช้ CPU สูง
 
yaml
  
alert: ApacheHighCPU
expr: apache_cpu_usage_percent > 85
for: 3m
labels:
  severity: warning
annotations:
  summary: "การใช้ CPU Apache สูง — {{ $labels.instance }}"
  description: "CPU: {{ $value }}% ตรวจสอบจำนวนคำขอหรือสคริปต์ที่ใช้ทรัพยากรมาก"
 
 
4. การใช้หน่วยความจำสูง
 
yaml
  
alert: ApacheHighMemory
expr: apache_memory_usage_bytes / node_memory_MemTotal_bytes * 100 > 75
for: 5m
labels:
  severity: warning
annotations:
  summary: "หน่วยความจำ Apache สูง — {{ $labels.instance }}"
  description: "ใช้หน่วยความจำ: {{ $value | humanize }}% พิจารณาปรับ MaxRequestWorkers หรือตรวจสอบการรั่วไหล"
 
 
5. เซิร์ฟเวอร์ยุ่ง — มีคำขอรอคิวเต็ม
 
yaml
  
alert: ApacheServerBusy
expr: apache_scoreboard_state{state="waiting_for_connection"} / apache_scoreboard_workers_total * 100 > 80
for: 2m
labels:
  severity: warning
annotations:
  summary: "Apache ใกล้เต็มความจุ — มีคำขอรอจำนวนมาก — {{ $labels.instance }}"
  description: "จำนวนการเชื่อมต่อเต็ม: {{ $value | humanize }}% พิจารณาเพิ่ม MaxRequestWorkers หรือตรวจสอบปริมาณจราจร"
 
 
6. จำนวน Process ถึงขีดจำกัด
 
yaml
  
alert: ApacheMaxWorkersReached
expr: apache_scoreboard_workers_total{state="busy"} == apache_mpm_max_workers
for: 1m
labels:
  severity: critical
annotations:
  summary: "Apache ใช้ Worker เต็มจำนวนแล้ว — {{ $labels.instance }}"
  description: "Worker ทั้งหมดถูกใช้งาน — คำขอใหม่จะถูกรอคิวหรือถูกปฏิเสธ เพิ่ม MaxRequestWorkers ทันที"
 
 
 
 
⚡ กลุ่มที่ 3 — ประสิทธิภาพและคำขอ
 
7. อัตราคำขอต่อวินาทีผิดปกติ
 
yaml
  
alert: ApacheRequestRateHigh
expr: rate(apache_access_requests_total[5m]) > 1000
for: 2m
labels:
  severity: warning
annotations:
  summary: "จำนวนคำขอสูงผิดปกติ — {{ $labels.instance }}"
  description: "คำขอ: {{ $value }}/วินาที ตรวจสอบว่าเป็นการจราจรจริงหรือการโจมตี"
 
 
8. คำขอใช้เวลานานเกินไป
 
yaml
  
alert: ApacheSlowRequests
expr: apache_response_time_seconds_avg > 3
for: 3m
labels:
  severity: warning
annotations:
  summary: "เวลาตอบสนองเฉลี่ยสูง — {{ $labels.instance }}"
  description: "เวลาตอบสนองเฉลี่ย: {{ $value }} วินาที ตรวจสอบแอปพลิเคชันด้านหลัง (PHP/DB)"
 
 
9. จำนวนการเชื่อมต่อค้างสูง
 
yaml
  
alert: ApacheSlowConnectionsHigh
expr: rate(apache_duration_seconds_sum[5m]) / rate(apache_access_requests_total[5m]) > 5
for: 3m
labels:
  severity: warning
annotations:
  summary: "มีการเชื่อมต่อที่ใช้เวลานานจำนวนมาก — {{ $labels.instance }}"
  description: "เวลาเฉลี่ยต่อคำขอ: {{ $value }} วินาที ตรวจสอบ KeepAlive และแอปพลิเคชันด้านหลัง"
 
 
 
 
❌ กลุ่มที่ 4 — ข้อผิดพลาด
 
10. อัตรา 5xx สูง
 
yaml
  
alert: ApacheHighErrorRate5xx
expr: rate(apache_access_requests_total{status=~"5.."}[5m]) / rate(apache_access_requests_total[5m]) * 100 > 5
for: 1m
labels:
  severity: critical
annotations:
  summary: "อัตราคำขอผิดพลาด 5xx สูง — {{ $labels.instance }}"
  description: "อัตรา 5xx: {{ $value | humanize }}% ตรวจสอบบันทึกข้อผิดพลาด Apache และแอปพลิเคชันด้านหลัง"
 
 
11. อัตรา 4xx สูงผิดปกติ
 
yaml
  
alert: ApacheHighErrorRate4xx
expr: rate(apache_access_requests_total{status=~"4.."}[5m]) / rate(apache_access_requests_total[5m]) * 100 > 15
for: 5m
labels:
  severity: warning
annotations:
  summary: "อัตราคำขอผิดพลาด 4xx สูงผิดปกติ — {{ $labels.instance }}"
  description: "อัตรา 4xx: {{ $value | humanize }}% ตรวจสอบลิงก์เสีย หรือการพยายามเข้าถึงที่ไม่ได้รับอนุญาต"
 
 
12. อัตรา 500 Internal Server Error
 
yaml
  
alert: ApacheInternalServerError
expr: rate(apache_access_requests_total{status="500"}[2m]) > 3
for: 1m
labels:
  severity: critical
annotations:
  summary: "พบ 500 Internal Server Error — {{ $labels.instance }}"
  description: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ ตรวจสอบ error.log และสคริปต์ด้านหลังทันที"
 
 
13. อัตรา 502 Bad Gateway
 
yaml
  
alert: ApacheBadGateway
expr: rate(apache_access_requests_total{status="502"}[2m]) > 3
for: 1m
labels:
  severity: critical
annotations:
  summary: "พบ 502 Bad Gateway — {{ $labels.instance }}"
  description: "แอปพลิเคชันด้านหลัง (PHP-FPM/แบ็กเอนด์) ไม่ตอบสนอง ตรวจสอบสถานะบริการนั้นๆ"
 
 
14. อัตรา 504 Gateway Timeout
 
yaml
  
alert: ApacheGatewayTimeout
expr: rate(apache_access_requests_total{status="504"}[2m]) > 3
for: 2m
labels:
  severity: warning
annotations:
  summary: "พบ 504 Gateway Timeout — {{ $labels.instance }}"
  description: "แอปพลิเคชันด้านหลังใช้เวลานานเกินไป พิจารณาเพิ่มค่า timeout หรือปรับปรุงประสิทธิภาพแอป"
 
 
15. บริการไม่สามารถเข้าถึงได้ — 503
 
yaml
  
alert: ApacheServiceUnavailable
expr: rate(apache_access_requests_total{status="503"}[1m]) > 5
for: 1m
labels:
  severity: critical
annotations:
  summary: "พบ 503 Service Unavailable — {{ $labels.instance }}"
  description: "บริการไม่พร้อมใช้งาน — Apache อาจอยู่ระหว่างการบำรุงรักษา หรือเต็มความจุ"
 
 
 
 
🔒 กลุ่มที่ 5 — ความปลอดภัยและการเข้าถึง
 
16. จำนวน 403 Forbidden สูงผิดปกติ
 
yaml
  
alert: ApacheHighForbiddenRequests
expr: rate(apache_access_requests_total{status="403"}[5m]) > 50
for: 2m
labels:
  severity: warning
annotations:
  summary: "มีคำขอถูกปฏิเสธจำนวนมาก — {{ $labels.instance }}"
  description: "ถูกปฏิเสธ: {{ $value }} ครั้ง/นาที ตรวจสอบว่าเป็นการสแกนหรือกฎการเข้าถึงทำงานถูกต้อง"
 
 
17. จำนวน 404 Not Found สูงผิดปกติ
 
yaml
  
alert: ApacheHighNotFound
expr: rate(apache_access_requests_total{status="404"}[5m]) / rate(apache_access_requests_total[5m]) * 100 > 10
for: 5m
labels:
  severity: info
annotations:
  summary: "อัตรา 404 สูง — {{ $labels.instance }}"
  description: "{{ $value | humanize }}% ของคำขอไม่พบหน้า ตรวจสอบลิงก์เสียหรือการสแกนเส้นทาง"
 
 
 
 
📊 ตารางสรุปเกณฑ์แจ้งเตือนแนะนำ
 
ตัวชี้วัด 🟡 Warning 🟠 Critical 🔴 Emergency รอกี่นาที 
สถานะบริการ — — ❌ ทันที ❌ ทันที 30 วินาที 
CPU การใช้งาน >85% >95% — — 3 นาที 
หน่วยความจำ >75% >90% — — 5 นาที 
Worker ยุ่ง >80% >95% 100% 2 นาที 
อัตรา 5xx >2% >5% >10% 1 นาที 
อัตรา 4xx >15% >30% — — 5 นาที 
เวลาตอบสนองเฉลี่ย >2 วินาที >4 วินาที >8 วินาที 3 นาที 
500/502/503 — — >3 ครั้ง/2นาที ต่อเนื่อง 1 นาที 
 
 
 
📦 เครื่องมือที่ใช้เก็บเมตริกส์
 
เครื่องมือ วิธีใช้ 
Apache Exporter เปิด  mod_status  ที่  /server-status?auto  แล้วใช้  prometheus-apache-exporter  ดึงข้อมูล 
mod_status เพิ่ม  ExtendedStatus On  และ  <Location /server-status>  ใน config เพื่อเปิดให้เข้าถึงได้ 
Prometheus ตั้งค่า scrape ไปที่  http://<apache-ip>/server-status?auto  หรือผ่าน exporter 
Grafana ใช้แดชบอร์ดชุมชน ID: 936 หรือ 3994 สำหรับ Apache 
 
 
 
⚙️ การเปิดใช้ mod_status (ต้องทำก่อน)
 
apache
  
# เพิ่มในไฟล์ httpd.conf หรือ httpd-default.conf
ExtendedStatus On

<Location /server-status>
    SetHandler server-status
    Require local
    # หรือระบุ IP ที่อนุญาต Require ip 192.168.1.0/24
</Location>
 
 
 
 
💡 คำแนะนำเพิ่มเติม
 
- ✅ ปรับ MPM Settings: ปรับ  MaxRequestWorkers ,  StartServers ,  MinSpareServers ,  MaxSpareServers  ให้เหมาะสมกับทรัพยากรเครื่อง
- ✅ แยก Frontend/Backend: ถ้า Apache เป็น Reverse Proxy — แยกเมตริกส์ระหว่าง Apache กับแอปพลิเคชันด้านหลังออกจากกัน
- ✅ PHP-FPM: ถ้าใช้กับ PHP-FPM ให้ติดตามสถานะของ PHP-FPM ด้วย ไม่ใช่แค่ Apache
- ⚠️ ระวัง 404 ปกติ: บางไซต์มี 404 เป็นเรื่องปกติ — ปรับเกณฑ์ให้เข้ากับลักษณะการใช้งาน
- ⚠️ การรีโหลด Apache: คำสั่ง  apache2ctl graceful  อาจทำให้กระบวนการหายไปชั่วคราว — ตั้งค่า  for:  ให้เหมาะสมเพื่อหลีกเลี่ยงการแจ้งเตือนเท็จ
 
 
 
ต้องการกฎสำหรับ HAProxy, Redis, PostgreSQL, MySQL, หรือ RabbitMQ ต่อไหมครับ 😊