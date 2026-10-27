🚀 SlowAPI + Redis — ใช้งานร่วมกันหลาย Pod บน Kubernetes
 
แบบครบถ้วน • ทดสอบได้ • พร้อมรันจริง
 
 
 
📦 แนวคิดหลัก
 
ปกติ SlowAPI ใช้หน่วยความจำในตัวแอปฯ จำกัดอัตราเร็ว → ทำงานแยกกันในแต่ละ pod → นับซ้ำกันไม่ได้ ❌
ใช้ Redis เป็นที่เก็บกลาง → ทุก pod นับค่าจากที่เดียวกัน → จำกัดอัตราเร็วถูกต้องแม่นยำ ✅
 
plaintext
  
┌─────────────┐
│  📊 Redis   │  ◄─── ที่เก็บกลาง (แยกออกมาต่างหาก)
│   (Central) │      นับค่าทุกคำขอจากทุกที่นี่
└──────┬──────┘
       │
   ┌───┼───────┐      ┌───────┐
   ▼   ▼      ▼      ▼       ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│  Pod 1  │ │  Pod 2  │ │  Pod 3  │
│ SlowAPI│ │ SlowAPI│ │ SlowAPI│
└─────────┘ └─────────┘ └─────────┘
 
 
 
 
✅ Step 1 — ติดตั้งแพ็กเกจ
 
bash
  
pip install slowapi limits redis
# หรือ requirements.txt:
slowapi>=0.1.9
limits>=3.10.1
redis>=5.0
 
 
💡 สำคัญ: SlowAPI ใช้  limits  library สำหรับ Redis backend — ไม่ใช้ slowapi มาเองโดยตรง
 
 
 
📝 Step 2 — โค้ดตัวอย่าง (FastAPI + SlowAPI + Redis)
 
 main.py 
 
python
  
from fastapi import FastAPI, Request, HTTPException
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from limits.storage import RedisStorage
from limits.strategies import FixedWindowRateLimiter
import os
from dotenv import load_dotenv

load_dotenv()

# ─── Redis Connection ───
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# ─── Initialize Limiter with Redis ───
storage = RedisStorage(REDIS_URL)
limiter = Limiter(
    key_func=get_remote_address,
    storage_backend=storage,
    strategy=FixedWindowRateLimiter()  # หรือ MovingWindowRateLimiter
)

# ─── App Setup ───
app = FastAPI(title="SlowAPI + Redis Demo")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ─── Test Routes ───
@app.get("/")
@limiter.limit("10/minute")
async def root(request: Request):
    return {
        "message": "✅ Hello from API!",
        "pod": os.uname()[1],  # แสดงชื่อ pod เพื่อดูว่าถูกโหลดไปที่ไหน
        "rate_limit": "10 requests/minute"
    }

@app.get("/api/heavy")
@limiter.limit("100/hour")
async def heavy_endpoint(request: Request):
    return {
        "message": "⚡ Heavy endpoint",
        "pod": os.uname()[1],
        "rate_limit": "100 requests/hour"
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "redis": REDIS_URL}
 
 
 .env 
 
env
  
REDIS_URL=redis://redis-service:6379/0
# สำหรับทดสอบที่เครื่อง: REDIS_URL=redis://localhost:6379/0
 
 
 
 
⚙️ Step 3 — Redis URL รูปแบบ
 
plaintext
  
redis://[:password@]host:port/db_number
 
 
สถานการณ์ ตัวอย่าง 
Localhost ไม่มีรหัส  redis://localhost:6379/0  
Kubernetes Service  redis://redis-service:6379/0  
มีรหัสผ่าน  redis://:mypassword@redis-service:6379/0  
Redis Cluster  redis://node1:6379,node2:6379,node3:6379/0  
 
 
 
🐳 Step 4 — Kubernetes Manifests
 
4.1 Redis Deployment + Service
 
 k8s/redis.yaml 
 
yaml
  
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "256Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: redis-service
spec:
  selector:
    app: redis
  ports:
  - port: 6379
    targetPort: 6379
  clusterIP: None  # Headless service
 
 
4.2 API Deployment — หลาย Pod
 
 k8s/api.yaml 
 
yaml
  
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3  # ✅ 3 Pods ทั้งหมดใช้ Redis เดียวกัน
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: your-api-image:latest
        ports:
        - containerPort: 8000
        env:
        - name: REDIS_URL
          value: "redis://redis-service:6379/0"
        resources:
          requests:
            cpu: "100m"
            memory: "128Mi"
          limits:
            cpu: "500m"
            memory: "256Mi"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  selector:
    app: api
  ports:
  - port: 80
    targetPort: 8000
  type: LoadBalancer
 
 
 
 
🔍 Step 5 — ทดสอบว่าทำงานถูกต้อง
 
ทดสอบในเครื่อง
 
bash
  
# รัน Redis ก่อน
docker run -d -p 6379:6379 --name test-redis redis:7-alpine

# รันแอป
uvicorn main:app --reload

# ส่งคำขอซ้ำๆ ดูว่านับถูกไหม
for i in {1..15}; do
  curl -s http://127.0.0.1:8000/ | jq .message
  sleep 0.5
done
# ควรได้: 10 ครั้งแรกสำเร็จ → ครั้งที่ 11-15 ได้ 429 Too Many Requests ✅
 
 
ทดสอบบน Kubernetes
 
bash
  
# ติดตั้ง k6 สำหรับทดสอบโหลด หรือใช้ curl loop แบบกระจายไปหลาย pod
kubectl port-forward svc/api-service 8080:80

# ส่งคำขอเร็วๆ ไปยัง service (กระจายไป 3 pod อัตโนมัติ)
for i in {1..12}; do
  curl -s http://localhost:8080/
  echo " # Request $i"
done

# ✅ ถ้าทำงานถูกต้อง: รวมกันได้ 10 ครั้ง → ครั้งที่ 11 ถูกจำกัด ไม่ว่าจะไปที่ pod ไหน
 
 
 
 
🧠 กลยุทธ์การจำกัดอัตราเร็ว — เลือกอันที่เหมาะสม
 
กลยุทธ์ ความแม่นยำ กระจายหลาย Pod เหมาะสำหรับ 
FixedWindow ⏱️ ปานกลาง ✅ ได้ ความเรียบง่าย, ปริมาณสม่ำเสมอ 
MovingWindow 📈 สูงกว่า ✅ ได้ ป้องกันการพุ่งกระชากที่ขอบช่วงเวลา 
SlidingWindow 🪟 สูงสุด ✅ ได้ ความแม่นยำสูง, ปรมาณการใช้งานสม่ำเสมอ 
 
💡  FixedWindow  เร็วและใช้ทรัพยากรน้อยที่สุด — เพียงพอสำหรับส่วนใหญ่แล้วครับ
 
 
 
⚠️ ข้อควรระวัง & การปรับแต่ง
 
ปัญหาที่พบบ่อย
 
ปัญหา สาเหตุ วิธีแก้ 
นับไม่ตรงกันระหว่าง pod ยังใช้ InMemoryStorage เปลี่ยนเป็น RedisStorage ✅ 
Redis ช้า/เป็นจุดคอขวด ใช้ Redis เดี่ยว อาจไม่พอ เพิ่มทรัพยากร หรือใช้ Redis Cluster 
Redis ล่ม → จำกัดอัตราเร็วหาย ไม่มี fallback เพิ่ม fallback ไปที่ InMemory เมื่อ Redis ไม่ได้ ✅ 
เครื่องเวลาไม่ตรงกันระหว่าง pod แต่ละเครื่องเวลาต่างกัน ตรวจสอบเวลา NTP ใน Kubernetes node ✅ 
 
เพิ่ม Fallback เมื่อ Redis ไม่ได้
 
python
  
try:
    storage = RedisStorage(REDIS_URL)
    # ทดสอบเชื่อมต่อ
    storage.client.ping()
except Exception:
    print("⚠️ Redis not available, falling back to in-memory storage")
    from limits.storage import MemoryStorage
    storage = MemoryStorage()
 
 
Redis Persistence — ป้องกันสถานะหาย
 
yaml
  
# ใน redis.yaml เพิ่ม เพื่อให้ข้อมูลไม่หายเมื่อ Redis รีสตาร์ท
volumeMounts:
- name: redis-data
  mountPath: /data
volumes:
- name: redis-data
  persistentVolumeClaim:
    claimName: redis-pvc
 
 
 
 
📋 สรุป Checklist
 
ติดตั้ง  limits  และ  redis  พร้อม  slowapi 
ใช้  RedisStorage  แทนค่าเริ่มต้น
ตั้ง  REDIS_URL  ให้ทุก pod ชี้ไปที่เดียวกัน
Deploy Redis เป็นส่วนกลาง แยกจากแอปฯ
ทดสอบส่งคำขอเกินโควต้า → ได้ 429 ✅
กระจายไปหลาย pod → นับรวมถูกต้อง ✅
 
ต้องการเพิ่มอะไรอีกไหมครับ — เช่น Redis Cluster, auth/รหัสผ่าน, หรือปรับแต่งกลยุทธ์การจำกัดอัตราเร็วให้ละเอียดขึ้น? 😊