title: "Self-hosted Turborepo Cache on Kubernetes"
aliases:
 
- "Deploy turborepo-remote-cache to K8s"
- "โฮสต์แคชของตัวเองบนคลัสเตอร์"
slug: turborepo-cache-kubernetes
icon: ☸️
color: blue
type: guide
status: active
priority: high
tags:
- type/guide
- topic/kubernetes
- topic/devops
- topic/monorepo
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent:
- "[[S3 Custom Cache for Turborepo]]"
children: []
related:
- "[[S3 Custom Cache for Turborepo]]"
- "[[Turborepo Remote Cache]]"
- "[[CI/CD]]"
 
 
 
☸️ Self-hosted Turborepo Cache บน Kubernetes
 
โฮสต์ Turborepo Remote Cache ภายในคลัสเตอร์ของคุณ — ควบคุมทั้งระบบ, ปรับขนาดเอง, และรักษาข้อมูลภายในองค์กร 
 
 
 
📦 ภาพรวมสถาปัตยกรรม
 
plaintext
  
┌─────────────────────────────────────────────────┐
│              Kubernetes Cluster                  │
│                                                  │
│  ┌─────────────┐      ┌──────────────────────┐   │
│  │   Ingress   │      │  turborepo-remote-    │   │
│  │  Controller │─────▶│  cache Service       │   │
│  │  (HTTPS/LE) │      │  (Deployment + 2×)    │   │
│  └─────────────┘      └───────────┬──────────┘   │
│                                   │              │
│                         ┌─────────┴─────────┐    │
│                         │ Storage Backend   │    │
│                         │  • S3-Compatible  │    │
│                         │  • MinIO / AWS S3 │    │
│                         └───────────────────┘    │
└─────────────────────────────────────────────────┘
 
 
ส่วนประกอบหลัก:
 
- turborepo-remote-cache — API Server รับคำขอจาก Turborepo CLI 
- Storage Backend — เก็บไฟล์แคช: MinIO(ภายใน) หรือ S3(ภายนอก)
- Ingress — เปิดทางเข้าแบบ HTTPS ภายนอก
- Secrets — เก็บ Token และ Credentials อย่างปลอดภัย
 
 
 
🚀 ขั้นที่ 1: เตรียมและสร้าง Namespace
 
bash
  
kubectl create namespace turborepo-cache
 
 
 
 
🗄️ ขั้นที่ 2: ตั้งค่า Storage — เลือกแหล่งเก็บข้อมูล
 
ตัวเลือก A: ใช้ MinIO ภายในคลัสเตอร์ (แนะนำสำหรับเริ่มต้น)
 
bash
  
# ติดตั้ง MinIO ด้วย Helm
helm repo add minio https://charts.min.io/
helm install minio minio/minio \
  --namespace turborepo-cache \
  --set mode=distributed \
  --set persistence.size=50Gi \
  --set resources.requests.memory=1Gi
 
 
สร้าง Bucket และ Credential:
 
bash
  
# เข้า MinIO Console → สร้าง Bucket ชื่อ turborepo-cache
# สร้าง Service Account ที่มีสิทธิ์ Read/Write
 
 
ตัวเลือก B: ใช้ AWS S3 / GCS / R2 ภายนอก
 
ข้ามขั้นตอนติดตั้ง MinIO — เตรียม Credential จากผู้ให้บริการภายนอกแทน
 
 
 
🔑 ขั้นที่ 3: สร้าง Secret
 
สร้างไฟล์  secrets.yaml :
 
yaml
  
apiVersion: v1
kind: Secret
metadata:
  name: trrc-secrets
  namespace: turborepo-cache
type: Opaque
stringData:
  # ── Authentication ──
  TURBO_TOKENS: "token-1-for-team-a,token-2-for-team-b"
  
  # ── Storage ──
  STORAGE_PROVIDER: "s3"
  STORAGE_PATH: "turborepo-cache"
  
  # ── MinIO (ภายในคลัสเตอร์) ──
  AWS_ACCESS_KEY_ID: "minio-access-key"
  AWS_SECRET_ACCESS_KEY: "minio-secret-key"
  AWS_REGION: "us-east-1"
  S3_ENDPOINT: "http://minio.turborepo-cache.svc.cluster.local:9000"
  S3_FORCE_PATH_STYLE: "true"
  
  # ── หรือ AWS S3 ภายนอก ──
  # AWS_ACCESS_KEY_ID: "AKIA..."
  # AWS_SECRET_ACCESS_KEY: "..."
  # AWS_REGION: "ap-southeast-1"
  # S3_ENDPOINT: ""
 
 
นำไปใช้งาน:
 
bash
  
kubectl apply -f secrets.yaml
 
 
⚠️ อย่า Commit ไฟล์นี้เข้า Git! — ใช้ Sealed Secrets / External Secrets Operator สำหรับ Production แทน
 
 
 
🚀 ขั้นที่ 4: Deploy turborepo-remote-cache
 
สร้างไฟล์  deployment.yaml :
 
yaml
  
apiVersion: apps/v1
kind: Deployment
metadata:
  name: turborepo-remote-cache
  namespace: turborepo-cache
spec:
  replicas: 2
  revisionHistoryLimit: 3
  selector:
    matchLabels:
      app: trrc
  template:
    metadata:
      labels:
        app: trrc
    spec:
      containers:
      - name: trrc
        image: ghcr.io/maxscharwath/turborepo-remote-cache:latest
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 3000
        envFrom:
        - secretRef:
            name: trrc-secrets
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "512Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: trrc-service
  namespace: turborepo-cache
spec:
  selector:
    app: trrc
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
 
 
นำไปใช้งาน:
 
bash
  
kubectl apply -f deployment.yaml
kubectl get pods -n turborepo-cache
 
 
ตรวจสอบสถานะ:
 
bash
  
kubectl port-forward svc/trrc-service 8080:80 -n turborepo-cache
curl -H "Authorization: Bearer your-token-here" http://localhost:8080/health
# ควรได้: {"status":"ok"} ✅
 
 
 
 
🌐 ขั้นที่ 5: เปิดทางเข้าด้วย Ingress
 
สร้างไฟล์  ingress.yaml :
 
yaml
  
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: trrc-ingress
  namespace: turborepo-cache
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
      - turbo-cache.your-company.com
    secretName: turbo-cache-tls
  rules:
  - host: turbo-cache.your-company.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: trrc-service
            port:
              number: 80
 
 
นำไปใช้งาน:
 
bash
  
kubectl apply -f ingress.yaml
 
 
ตรวจสอบ:
 
bash
  
kubectl get ingress -n turborepo-cache
# เข้าที่: https://turbo-cache.your-company.com/health
 
 
 
 
🔧 ขั้นที่ 6: ตั้งค่าที่ฝั่ง Client
 
✅ เครื่องนักพัฒนา
 
bash
  
# ตั้งค่าแบบ Manual
turbo login --manual
# API URL: https://turbo-cache.your-company.com
# Team Slug: your-team-name
# Token: จาก TURBO_TOKENS

# หรือตั้งค่า Env Vars:
export TURBO_API=https://turbo-cache.your-company.com
export TURBO_TEAM=your-team-name
export TURBO_TOKEN=your-token-from-secrets
export TURBO_REMOTE_CACHE_SIGNATURE_KEY=your-signature-key
 
 
✅ GitHub Actions / CI
 
yaml
  
env:
  TURBO_API: https://turbo-cache.your-company.com
  TURBO_TEAM: your-team-name
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_REMOTE_CACHE_SIGNATURE_KEY: ${{ secrets.TURBO_SIGNATURE_KEY }}
 
 
ทดสอบ:
 
bash
  
pnpm build
# ↑ ครั้งแรก: Upload
# ครั้งที่สอง: Cache Hit ⚡
 
 
 
 
🔐 ความปลอดภัยใน Production
 
มาตรการ ทำอย่างไร 
✅ เปลี่ยน Token เริ่มต้น สร้างสตริงสุ่มยาวๆ เก็บใน Secret เท่านั้น 
✅ จำกัดการเข้าถึง Ingress ใช้ IP Whitelist หรือ OIDC ก่อนเข้าถึง API 
✅ HTTPS เสมอ เปิดใช้ TLS + HSTS ใน Ingress 
✅ Secrets Management ใช้ External Secrets / Sealed Secrets — ไม่เก็บใน Plaintext 
✅ Monitor Access Logs ดูใครอ่าน/เขียนแคช เมื่อไหร่ 
✅ Life Cycle Policy ตั้งค่าให้ลบแคชเก่ากว่า 30 วันใน Bucket 
✅ Resource Limits ตั้ง CPU/Memory Limit ป้องกันการใช้ทรัพยากรมากเกินไป 
 
 
 
📊 ปรับขนาด & บำรุงรักษา
 
✅ Scaling
 
bash
  
# เพิ่มจำนวน Replica
kubectl scale deployment turborepo-remote-cache \
  --replicas=3 -n turborepo-cache

# ตั้งค่า HPA อัตโนมัติ
kubectl autoscale deployment turborepo-remote-cache \
  --min=2 --max=10 --cpu-percent=70 -n turborepo-cache
 
 
✅ อัปเกรดเวอร์ชัน
 
bash
  
# ดึงเวอร์ชันล่าสุด → แก้ใน deployment.yaml
kubectl apply -f deployment.yaml
# Kubernetes จะ Rolling Update โดยไม่หยุดให้บริการ
 
 
✅ Backup & Disaster Recovery
 
- ข้อมูลสำคัญทั้งหมดอยู่ที่ Storage Bucket → Backup ตามนโยบายของ S3/MinIO
- Backup Bucket: Versioning + Cross-Region Replication
- Deployment Manifest เก็บใน Git — กู้คืนได้ตลอดเวลา
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ ✅ วิธีแก้ 
❌ 502 Bad Gateway Container ยังไม่พร้อม หรือ Port ผิด ตรวจสอบ Readiness Probe และ Port 3000 
❌ 401 Unauthorized Token ไม่ตรงกัน ตรวจสอบ TURBO_TOKENS ใน Secret — ต้องตรงกับที่ Client ส่ง 
❌ ดึง/อัปโหลดแคชช้ามาก Endpoint S3 ผิด หรือ Region ไกล ใช้ S3 Endpoint ที่ใกล้ หรือ MinIO ภายในคลัสเตอร์ 
❌ พื้นที่เต็มใน Bucket ไม่มี Life Cycle Rule ตั้งค่า Expiration ใน Bucket — ลบเก่ากว่า 30 วัน 
❌ Pod CrashLoopBackOff Credential S3 ผิด หรือ Endpoint ไม่ถูก ดู Log:  kubectl logs <pod-name> -n turborepo-cache  
 
 
 
✅ Checklist — พร้อม Production ไหม?
 
สร้าง Namespace แยกออกมาแล้ว ✅
เลือกและตั้งค่า Storage Backend ✅
ใช้ Kubernetes Secret ไม่ Hardcode ค่าไว้ ✅
Deploy มี ≥ 2 Replicas ✅
มี Health Check (Liveness/Readiness Probe) ✅
เปิด Ingress ด้วย HTTPS + TLS ✅
ตั้งค่า Resource Limit และ HPA ✅
ตั้งค่า Life Cycle ใน Storage Bucket ✅
จำกัดการเข้าถึง Ingress (IP/OIDC) ✅
ทดสอบจากเครื่องนักพัฒนาและ CI ✅
 
 
 
🔗 Related Notes
 
- [[S3 Custom Cache for Turborepo]] — ภาพรวม S3 Cache Options
- [[Turborepo Remote Cache]] — พื้นฐานการใช้ Remote Cache
- [[Kubernetes]] — หลักการพื้นฐานและการจัดการคลัสเตอร์
- [[CI/CD]] — ตั้งค่า CI ให้ใช้ Cache ขององค์กร
 
 
 
✅ สรุปสั้นๆ: Self-hosted บน Kubernetes = ควบคุมทุกอย่างได้เอง — ข้อมูลไม่ออกไปภายนอก, ปรับขนาดตามต้องการ, และผสานเข้ากับระบบองค์กรได้อย่างสมบูรณ์ เหมาะกับทีมที่มีคลัสเตอร์อยู่แล้วและต้องการความเป็นส่วนตัวสูงสุด 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น External Secrets Integration, Multi-Tenant Cache, Monitoring/Prometheus, หรือ Disaster Recovery Strategy 😊