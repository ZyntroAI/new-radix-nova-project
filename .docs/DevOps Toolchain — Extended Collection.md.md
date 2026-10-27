🛠️ More DevOps Tools — Expanded Collection
 
Even more tools across every DevOps category • Bilingual EN/TH • Ready for Obsidian
 
 
 
🔄 CI/CD & Orchestration เพิ่มเติม
 
Tool Use Case Description / คำอธิบาย 
Tekton K8s-native CI/CD pipelines ระบบ CI/CD ที่ออกแบบมาสำหรับ Kubernetes Open-source, standard Cloud Events, reusable tasks มาตรฐานบน K8s รองรับ Cloud Events สร้างขั้นตอนที่นำกลับมาใช้ใหม่ได้ 
Spinnaker Multi-cloud continuous delivery ระบบส่งมอบแอปข้ามคลาวด์ Netflix OSS — Blue/Green, Canary, Rollback จาก Netflix รองรับ Blue/Green Canary และย้อนกลับข้ามคลาวด์ 
Flux CD GitOps continuous delivery GitOps tool สำหรับ K8s Pull-based — Git is the single source of truth ดึงการเปลี่ยนแปลงจาก Git โดยอัตโนมัติ 
Drone CI Lightweight cloud-native CI/CD ระบบ CI/CD ที่เบาและรวดเร็ว Container-first • self-hosted or cloud เน้นคอนเทนเนอร์ ติดตั้งง่าย รวดเร็ว 
GitOps Toolkit / Weave GitOps Enterprise-grade Flux UI หน้าจอจัดการ Flux สำหรับองค์กร Visual dashboard + multi-tenancy + RBAC มีหน้าจอภาพ รองรับหลายทีมและระบบสิทธิ์ 
Tekton Triggers / Chains Event-triggered pipelines & provenance ทริกเกอร์จากเหตุการณ์ + บันทึกแหล่งที่มา Build provenance for supply chain security สร้างหลักฐานที่มาของซอฟต์แวร์ เพื่อความปลอดภัย 
 
 
 
🐳 Container, Registry & Runtime เพิ่มเติม
 
Tool Use Case Description / คำอธิบาย 
Podman Daemonless container engine เครื่องรันคอนเทนเนอร์แบบไม่มี daemon Rootless • Docker-compatible • daemon-free รันได้โดยไม่ต้องใช้สิทธิ์รูท คำสั่งเหมือน Docker 
CRI-O Lightweight K8s container runtime ตัวรันคอนเทนเนอร์สำหรับ Kubernetes OCI-compliant • minimal • secure เบา ปลอดภัย รองรับมาตรฐาน OCI 
Zot Lightweight OCI registry ที่เก็บอิมเมจที่เบาและรวดเร็ว Distributed • minimal • open-source กระจายได้ ใช้ทรัพยากรน้อย โอเพ่นซอร์ส 
Quay Enterprise container registry ที่เก็บอิมเมจระดับองค์กร Red Hat • build triggers • security scanning จาก Red Hat มีระบบแจ้งเตือนและสแกนความปลอดภัยในตัว 
Skopeo Container image transfer tool เครื่องมือย้ายและตรวจสอบอิมเมจ Copy, inspect, sign images — no daemon needed คัดลอก ตรวจสอบ และลงนามอิมเมจ โดยไม่ต้องรัน daemon 
imgpkg OCI artifact packaging บรรจุและจัดการแพ็กเกจ K8s Bundle + lock + relocation for air-gapped environments รวบรวมไฟล์ทั้งชุด ย้ายไปใช้ในระบบที่ไม่มีอินเทอร์เน็ต 
K3s / K0s / MicroK8s Lightweight K8s distributions Kubernetes รุ่นเบาๆ Edge, IoT, dev, single-node clusters สำหรับ Edge อุปกรณ์ฝังตัว และเครื่องพัฒนา 
 
 
 
☁️ Infrastructure as Code เพิ่มเติม
 
Tool Use Case Description / คำอธิบาย 
OpenTofu Terraform OSS alternative ทางเลือกโอเพ่นซอร์สแทน Terraform Drop-in replacement • community-governed ใช้แทนกันได้เลย พัฒนาโดยชุมชน 
Terraform Cloud / Terraform Enterprise Remote state + collaboration จัดการสถานะและทำงานร่วมกันบนคลาวด์ Remote state locking • cost estimation • RBAC ล็อกสถานะ ประเมินค่าใช้จ่าย จัดการสิทธิ์ 
Ansible Tower / AWX Web UI for Ansible หน้าจอเว็บสำหรับจัดการ Ansible Scheduled jobs • inventory management • RBAC รันงานตามตาราง จัดการรายการเครื่อง จัดการสิทธิ์ 
Terraform CDK IaC with TypeScript/Python/Go เขียน Terraform ด้วยภาษาโปรแกรมจริง HCL → real code • loops, functions, OOP จากนั้นไปเป็นโค้ดจริง ใช้ลูป ฟังก์ชัน และคลาสได้ 
Terrakube Open-source Terraform UI หน้าจอจัดการ Terraform แบบโอเพ่นซอร์ส Remote state • job scheduler • API จัดการสถานะระยะไกล ตารางงาน และ API 
Atlantis Terraform Pull Request Automation รัน Terraform จาก Pull Request Plan/apply from GitHub/GitLab comments รันคำสั่ง plan/apply จากหน้า PR ได้เลย 
Infisical End-to-end secrets platform แพลตฟอร์มจัดการความลับแบบครบวงจร IaC + CI/CD + app secrets • open-source จัดการรหัสทุกจุดตั้งแต่พัฒนาจนถึงผลิตภัณฑ์ 
 
 
 
🔒 Security, Scanning & Policy เพิ่มเติม
 
Tool Use Case Description / คำอธิบาย 
Trivy Operator K8s continuous scanning สแกนความปลอดภัยในคลัสเตอร์ตลอดเวลา Operator-based — auto-scans new resources ติดตั้งเป็น Operator สแกนสิ่งที่เข้ามาใหม่อัตโนมัติ 
Falco K8s runtime threat detection ตรวจจับภัยคุกคามขณะระบบทำงาน Kernel-level rules — detect suspicious behavior เฝ้าดูที่ระดับเคอร์เนล แจ้งเตือนพฤติกรรมที่ผิดปกติ 
Kyverno K8s policy management ระบบจัดการนโยบายความปลอดภัยสำหรับ K8s Validate, mutate, generate — no YAML hell ตรวจสอบ แก้ไข และสร้างกฎโดยไม่ต้องเขียนโค้ดซับซ้อน 
OPA / Gatekeeper General-purpose policy engine เครื่องมือจัดการนโยบายทั่วไป Enforce custom rules across your stack บังคับใช้กฎที่คุณกำหนดเองได้ทั้งระบบ 
Grype Vulnerability scanner เครื่องสแกนช่องโหว่ Anchore — fast, open-source, image+directory จาก Anchore สแกนทั้งอิมเมจและโฟลเดอร์ในเครื่อง 
Cosign / Sigstore Software supply chain signing ลงนามและตรวจสอบความถูกต้องของซอฟต์แวร์ Sign images/artifacts • verify provenance ลงนามดิจิทัล ตรวจสอบแหล่งที่มาและความถูกต้อง 
CycloneDX / SPDX Software Bill of Materials (SBOM) รายการส่วนประกอบซอฟต์แวร์มาตรฐาน Generate SBOM for compliance & audit สร้างรายการไลบรารีเพื่อการตรวจสอบและปฏิบัติตามกฎระเบียบ 
Checkov IaC static analysis ตรวจสอบไฟล์โครงสร้างพื้นฐาน Scan Terraform/CloudFormation/K8s for misconfig สแกนไฟล์ IaC หาการตั้งค่าที่ไม่ปลอดภัย 
OpenVEX Vulnerability status communication สื่อสารสถานะช่องโหว่ Clarify which vulnerabilities matter — reduce noise ระบุชัดเจนว่าอะไรอันตรายและอะไรปลอดภัย ลดสัญญาณรบกวน 
 
 
 
📊 Monitoring, Logging & Tracing เพิ่มเติม
 
Tool Use Case Description / คำอธิบาย 
Thanos Prometheus long-term storage ระบบจัดเก็บข้อมูล Prometheus แบบยาวนาน Global query • infinite retention • HA เชื่อมข้อมูลทุกคลัสเตอร์ ดูย้อนหลังได้ตลอดเวลา 
Mimir Grafana Labs — scalable metrics ระบบเก็บตัวชี้วัดขนาดใหญ่จาก Grafana Labs Unlimited scale • Prometheus-compatible รองรับข้อมูลปริมาณมหาศาล ใช้เหมือน Prometheus 
VictoriaMetrics Fast, cost-effective time-series DB ฐานข้อมูลอนุกรมเวลาที่เร็วและประหยัด 10x compression • Prometheus protocol บีบอัดได้ดี ใช้พื้นที่น้อย รองรับโปรโตคอล Prometheus 
Elasticsearch + Kibana Full-text search + logs dashboard ค้นหาแบบเต็มข้อความ + แสดงผลบันทึก ELK Stack — search + logs + dashboards ชุด ELK ค้นหาและวิเคราะห์บันทึกเหตุการณ์ได้ละเอียด 
OpenSearch Community-driven Elasticsearch fork ทางเลือกโอเพ่นซอร์สแทน Elasticsearch AWS-backed • Apache 2.0 license พัฒนาโดยสังคม รองรับโดย AWS ใบอนุญาตเปิดกว้าง 
Jaeger Distributed tracing ติดตามการทำงานที่แพร่กระจายหลายระบบ End-to-end request flow visualization เห็นเส้นทางการทำงานของคำขอตั้งแต่ต้นจนจบ 
Zipkin Lightweight distributed tracing ระบบติดตามที่เบาและเรียบง่าย Twitter OSS • minimal • integrates with Brave จาก Twitter เริ่มต้นง่าย เชื่อมต่อได้รวดเร็ว 
Fluentd / Fluent Bit Log collection & forwarding รวบรวมและส่งต่อบันทึกเหตุการณ์ Lightweight • many output plugins เบามาก รองรับปลายทางมากกว่า 100 ชนิด 
Vector High-performance data pipeline ท่อส่งข้อมูลประสิทธิภาพสูง Logs + metrics + events in one tool จัดการทั้งบันทึก ตัวชี้วัด และเหตุการณ์ในเครื่องเดียว 
Netdata Real-time performance monitoring เฝ้าดูประสิทธิภาพแบบเรียลไทม์ Per-second metrics • auto-dashboards เก็บข้อมูลทุกวินาที สร้างกราฟอัตโนมัติ 
Uptime Kuma Simple uptime monitoring ตรวจสอบความพร้อมใช้งานอย่างเรียบง่าย Self-hosted • beautiful UI • notifications ติดตั้งเองได้ หน้าสวย แจ้งเตือนได้หลายช่องทาง 
 
 
 
🚀 Kubernetes Workloads & Delivery เพิ่มเติม
 
Tool Use Case Description / คำอธิบาย 
Argo Workflows K8s-native workflow engine ระบบจัดการขั้นตอนการทำงานบน K8s DAG workflows • parallel/conditional steps กำหนดลำดับงานแบบแผนผัง ทำงานขนานหรือตามเงื่อนไขได้ 
Argo Rollouts Advanced deployment strategies กลยุทธ์การส่งมอบที่ยืดหยุ่น Canary • Blue/Green • Traffic splitting • Analysis รองรับ Canary และการทดสอบก่อนเปิดให้ทุกคนเห็น 
Kargo / Carvel K8s packaging & distribution ชุดเครื่องมือจัดการแพ็กเกจ K8s ytt + kbld + kapp — templating + build + deploy ชุดเครื่องมือที่ครบถ้วนสำหรับทำแพ็กเกจ K8s 
Flagger Progressive delivery operator ตัวจัดการการส่งมอบแบบค่อยเป็นค่อยไป Canary analysis • traffic shifting • auto-rollback ทดสอบก่อนเปลี่ยนเส้นทางจราจร ย้อนกลับอัตโนมัติเมื่อพบปัญหา 
Kustomize K8s configuration customization ปรับแต่งไฟล์ K8s แบบไม่แก้ต้นฉบับ Patch base manifests — no templating syntax วางซ้อนการเปลี่ยนแปลงบนไฟล์หลัก ไม่ต้องใช้เทมเพลตที่ซับซ้อน 
Kapp Simple K8s app deployment ติดตั้งแอป K8s อย่างเรียบง่าย Change diff • apply order • delete in order เห็นความแตกต่างกันสั่งงาน จัดลำดับติดตั้งและลบให้ถูกต้อง 
Velero K8s backup & disaster recovery สำรองและกู้คืนคลัสเตอร์ K8s Backup/restore resources • cross-cluster migration สำรองข้อมูลทั้งแอปและข้อมูล ย้ายข้ามคลัสเตอร์ได้ 
Rancher Multi-cluster K8s management จัดการหลายคลัสเตอร์ K8s จากที่เดียว Central UI • auth • monitoring • catalog หน้าจอเดียวดูทุกคลัสเตอร์ จัดการสิทธิ์และแอปพลิเคชัน 
OpenClusterManagement / Karmada Multi-cluster orchestration จัดการแอปข้ามหลายคลัสเตอร์ K8s Deploy once — run anywhere • unified control plane สั่งงานที่เดียว แอปไปทำงานที่คลัสเตอร์ใกล้เคียงหรือถูกที่สุด 
 
 
 
🧪 Testing, Chaos & Performance เพิ่มเติม
 
Tool Use Case Description / คำอธิบาย 
k6 Modern load testing ทดสอบภาระระบบที่ทันสมัย JS/TS scripts • cloud or local • high performance เขียนสคริปต์ด้วย JS รันที่เครื่องหรือบนคลาวด์ 
Gatling High-performance load testing ทดสอบประสิทธิภาพระดับสูง Scala DSL • high throughput • web dashboard รองรับผู้ใช้จำนวนมาก มีหน้าจอแสดงผลบนเว็บ 
Locust Python-based load testing ทดสอบภาระด้วยภาษา Python Code-first • distributed • web UI เขียนด้วย Python ทำงานแบบกระจาย มีหน้าจอเว็บ 
Chaos Mesh K8s chaos engineering ทดสอบความทนทานของระบบ K8s Pod/kill • network delay • I/O latency • CPU hog จำลองความล้มเหลวที่ระดับพอด เครือข่าย ดิสก์ และ CPU 
Gremlin Managed chaos engineering บริการทดสอบความทนทานแบบบริการ Safe controlled failure • attack library • metrics ควบคุมความล้มเหลวอย่างปลอดภัย มีระบบวัดผล 
Artillery API & load testing ทดสอบ API และภาระระบบ Node.js • YAML/JS • serverless friendly ใช้งานง่าย เหมาะกับ API และไมโครเซอร์วิส 
Goss Server validation ตรวจสอบความถูกต้องของเซิร์ฟเวอร์ YAML-based — test packages, services, files, commands เขียนด้วย YAML ตรวจสอบแพ็กเกจ บริการ ไฟล์ และคำสั่ง 
InSpec Infrastructure compliance ตรวจสอบว่าระบบปฏิบัติตามมาตรฐานหรือไม่ DSL for security/compliance • AWS/Azure/GCP ตรวจสอบความปลอดภัยและการปฏิบัติตามกฎระเบียบ 
 
 
 
🧠 AI & Productivity Tools เพิ่มเติม
 
Tool Use Case Description / คำอธิบาย 
Cursor AI-native code editor โปรแกรมแก้ไขโค้ดที่มี AI ในตัว Built-in LLM • instant codebase answers ถามคำถามเกี่ยวกับโค้ดทั้งโปรเจกต์ได้ทันที 
Sourcegraph Universal code search ค้นหาโค้ดทุกที่ในองค์กร Cross-repo search • code intelligence • batch changes ค้นหาข้ามโปรเจกต์ เข้าใจโครงสร้างโค้ด แก้ไขที่เดียวจบ 
Bloop Fast code search & AI chat ค้นหาโค้ดและถาม AI เกี่ยวกับโค้ด Local or cloud • answers from your codebase ทำงานที่เครื่องหรือบนคลาวด์ ตอบคำถามจากโค้ดของคุณ 
Tabby Self-hosted AI code completion ระบบแนะนำโค้ดด้วย AI ที่ติดตั้งเอง Open-source • privacy-first • model-agnostic โอเพ่นซอร์ส ข้อมูลไม่ออกไปไหน เลือกโมเดลได้เอง 
Dify LLMOps platform แพลตฟอร์มพัฒนาแอปพลิเคชัน AI Build/publish LLM apps • prompt engineering • datasets สร้างแอป AI โดยไม่ต้องเขียนโค้ดมาก จัดการพร้อมท์และข้อมูล 
OpenHands AI software engineer ผู้ช่วยพัฒนาซอฟต์แวร์อัจฉริยะ Autonomous coding agent • runs in your environment ผู้ช่วยเขียนโค้ดที่ทำงานในสภาพแวดล้อมของคุณ 
 
 
 
📥 How to Add to Obsidian
 
1. Create a new note:  DevOps Toolchain — Extended Collection.md 
2. Copy all content above
3. Link from your main tool reference:  [[DevOps Toolchain Reference]]  →  [[DevOps Toolchain — Extended Collection]] 
4. Add tags:  #DevOps #Tools #Reference #Extended 
 
 
 
Would you like me to dive deeper into any specific category — like a full comparison of GitOps tools, or a detailed guide for a particular tool? 