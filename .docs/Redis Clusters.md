🚀 SlowAPI + Redis Cluster — High Availability Setup
 
กระจายข้อมูล • ทนทาน • รันหลาย pod ได้อย่างมั่นใจ ✅
 
 
 
📊 Redis Cluster คืออะไร?
 
แทนที่จะมี Redis ตัวเดียว → มี 6 nodes (3 Masters + 3 Replicas) ทำงานร่วมกัน
 
- ข้อมูลกระจายกัน → ไม่มีจุดล้มเหลวจุดเดียว
- ถ้า node หนึ่งล่ม → อันอื่นทำงานต่อได้
- รองรับปริมาณข้อมูลและการเชื่อมต่อที่เติบโตได้เรื่อยๆ
 
plaintext
  
               ┌────────────────────────────┐
               │    📊 REDIS CLUSTER         │
               │                            │
      ┌────────┼──────┐    ┌────────┼──────┐
      │ Master 1 │     │    │ Master 2 │     │
      │ Slot 0-5460│   │    │ Slot 5461-10922│
      └────┬─────┘    │    └────┬─────┘    │
           │          │         │          │
      ┌────▼─────┐    │    ┌────▼─────┐    │
      │Replica 1 │    │    │Replica 2 │    │
      └──────────┘    │    └──────────┘    │
                      │                     │
      ┌────────┼──────┐    ┌────────┼──────┐
      │ Master 3 │     │    │ Replica 3 │     │
      │ Slot 10923-16383│  │ (Failover) │
      └──────────────┘    └──────────────┘
               └────────────────────────────┘
                      ▲
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
     ┌─────────┐  ┌─────────┐  ┌─────────┐
     │  Pod 1   │  │  Pod 2   │  │  Pod 3   │
     │ SlowAPI  │  │ SlowAPI  │  │ SlowAPI  │
     └─────────┘  └─────────┘  └─────────┘
 
 
 
 
✅ Step 1 — ติดตั้งแพ็กเกจเพิ่ม
 
bash
  
pip install redis-py-cluster
# หรือ requirements.txt เพิ่ม:
redis-py-cluster>=2.1.3
 
 
💡 สำคัญ:  limits  library รองรับ Redis Cluster โดยใช้  RedisClusterStorage 
 
 
 
📝 Step 2 — โค้ด FastAPI + Redis Cluster
 
 main.py 
 
python
  
from fastapi import FastAPI, Request, HTTPException
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from limits.storage import RedisClusterStorage
from limits.strategies import FixedWindowRateLimiter
import os
from dotenv import load_dotenv

load_dotenv()

# ─── Redis Cluster Connection ───
# รูปแบบ: host1:port,host2:port,host3:port
REDIS_CLUSTER_NODES = os.getenv(
    "REDIS_CLUSTER_NODES",
    "redis-cluster-0.redis-cluster:6379,redis-cluster-1.redis-cluster:6379,redis-cluster-2.redis-cluster:6379"
).split(",")

REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", None)
REDIS_MAX_CONNECTS = int(os.getenv("REDIS_MAX_CONNECTS", "5"))

# ─── Initialize Redis Cluster Storage ───
storage = RedisClusterStorage(
    nodes=[tuple(node.split(":")) for node in REDIS_CLUSTER_NODES],
    password=REDIS_PASSWORD,
    max_connections_per_node=REDIS_MAX_CONNECTS,
    retry_on_timeout=True,
    socket_connect_timeout=5,
)

limiter = Limiter(
    key_func=get_remote_address,
    storage_backend=storage,
    strategy=FixedWindowRateLimiter()
)

# ─── App Setup ───
app = FastAPI(title="SlowAPI + Redis Cluster Demo")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ─── Test Routes ───
@app.get("/")
@limiter.limit("10/minute")
async def root(request: Request):
    return {
        "message": "✅ Hello from API! (Redis Cluster)",
        "pod": os.uname()[1],
        "rate_limit": "10 requests/minute",
        "cluster_mode": True
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
    try:
        # ทดสอบเชื่อมต่อ Cluster
        storage.client.ping()
        cluster_info = storage.client.cluster_info()
        return {
            "status": "healthy",
            "redis_cluster": cluster_info.get("cluster_state", "unknown"),
            "known_nodes": cluster_info.get("cluster_known_nodes", "0")
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
 
 
 .env 
 
env
  
REDIS_CLUSTER_NODES=redis-cluster-0.redis-cluster:6379,redis-cluster-1.redis-cluster:6379,redis-cluster-2.redis-cluster:6379
REDIS_PASSWORD=your-strong-password-here
 
 
 
 
🐳 Step 3 — Kubernetes Manifests: Redis Cluster (6 Pods: 3 Master + 3 Replica)
 
Option A: Bitnami Helm Chart (แนะนำ — ง่ายและเชื่อถือได้)
 
bash
  
# เพิ่ม Helm repo
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# ติดตั้ง Redis Cluster
helm install redis-cluster bitnami/redis-cluster \
  --namespace redis \
  --create-namespace \
  --set cluster.nodes=6 \
  --set cluster.replicas=1 \
  --set auth.password=your-strong-password-here \
  --set persistence.enabled=true \
  --set persistence.size=8Gi \
  --set metrics.enabled=true
 
 
Option B: Manual YAML manifests
 
 k8s/redis-cluster/  folder structure:
 
 redis-cluster-statefulset.yaml 
 
yaml
  
apiVersion: v1
kind: ConfigMap
metadata:
  name: redis-cluster-config
data:
  redis.conf: |
    cluster-enabled yes
    cluster-config-file nodes.conf
    cluster-node-timeout 5000
    appendonly yes
    appendfsync everysec
    port 6379
    bind 0.0.0.0
    maxmemory 2gb
    maxmemory-policy allkeys-lru
---
apiVersion: v1
kind: Service
metadata:
  name: redis-cluster
spec:
  selector:
    app: redis-cluster
  ports:
  - port: 6379
    targetPort: 6379
  clusterIP: None  # Headless service for DNS discovery
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis-cluster
spec:
  serviceName: redis-cluster
  replicas: 6  # 3 Masters + 3 Replicas
  selector:
    matchLabels:
      app: redis-cluster
  template:
    metadata:
      labels:
        app: redis-cluster
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
          name: client
        - containerPort: 16379
          name: cluster
        volumeMounts:
        - name: conf
          mountPath: /etc/redis/
        - name: data
          mountPath: /data
        command:
        - sh
        - -c
        - |
          redis-server /etc/redis/redis.conf \
          --cluster-announce-ip $(POD_IP) \
          --cluster-announce-port 6379 \
          --cluster-announce-bus-port 16379
        env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        resources:
          requests:
            cpu: "100m"
            memory: "256Mi"
          limits:
            cpu: "500m"
            memory: "1Gi"
      volumes:
      - name: conf
        configMap:
          name: redis-cluster-config
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 8Gi
 
 
 
 
🔧 Step 4 — Initialize the Redis Cluster (ครั้งแรกเท่านั้น)
 
รันครั้งเดียวเพื่อสร้าง cluster:
 
bash
  
# เข้าไปที่ pod ใดก็ได้
kubectl exec -it redis-cluster-0 -- redis-cli -a your-password --cluster create \
  redis-cluster-0.redis-cluster:6379 \
  redis-cluster-1.redis-cluster:6379 \
  redis-cluster-2.redis-cluster:6379 \
  redis-cluster-3.redis-cluster:6379 \
  redis-cluster-4.redis-cluster:6379 \
  redis-cluster-5.redis-cluster:6379 \
  --cluster-replicas 1
 
 
พิมพ์  yes  เพื่อยืนยันการจัดสรร hash slots ✅
 
 
 
📋 Step 5: Verify & Test
 
ตรวจสอบสถานะ Cluster
 
bash
  
# ดูสถานะ cluster
kubectl exec -it redis-cluster-0 -- redis-cli -a your-password CLUSTER INFO
# ควรเห็น: cluster_state:ok, cluster_known_nodes:6 ✅

# ดูรายการ nodes
kubectl exec -it redis-cluster-0 -- redis-cli -a your-password CLUSTER NODES
 
 
ทดสอบ API
 
bash
  
# เช็ค health endpoint — ควรแสดง cluster_state:ok ✅
curl http://localhost:8000/health

# ทดสอบ rate limiting — ส่งไปเรื่อยๆ จะเห็นว่านับถูกต้อง แม้กระจายไปหลาย pod
for i in {1..15}; do
  curl -s http://localhost:8000/ | jq .message
done
 
 
 
 
⚠️ ข้อแตกต่างจาก Single Redis
 
ด้าน Single Redis Redis Cluster 
ความทนทาน ❌ ถ้าล่ม ข้อมูลหาย ✅ ถ้า node ล่ม อันอื่นทำงานต่อ 
ความจุข้อมูล จำกัดที่ node เดียว ✅ กระจายหลาย node ขยายได้เรื่อยๆ 
ความเร็วการอ่าน จำกัดที่ node เดียว ✅ อ่านจาก replica nodes ได้ 
ความซับซ้อน ติดตั้งง่าย ⚠️ ต้องดูแลเรื่อง cluster initialization 
ค่าใช้จ่าย 1 node ⚠️ 6 nodes (3M+3R) 
URL เชื่อมต่อ  redis://host:port  รายการ nodes อย่างน้อย 3 ตัว 
 
 
 
🧠 Best Practices
 
✅ ใช้ Redis Cluster เมื่อ:
 
- ต้องการความทนทาน — ไม่อยากให้ระบบหยุดทำงาน
- ปริมาณคำขอสูงขึ้นเรื่อยๆ
- ต้องการกระจายโหลดการอ่าน
 
⚠️ ข้อควรระวัง
 
- ทุก pod ต้องเห็นทุก node — ใช้ DNS ที่ถูกต้อง ( redis-cluster-X.redis-cluster )
- รหัสผ่าน ต้องตรงกันทุก node
- Initialization ทำครั้งเดียวเท่านั้น — ไม่ต้องรันซ้ำ
- Persistence เปิดใช้งานทุก node ด้วย PersistentVolume
- Backup — ใช้ Redis Cluster ที่มี replica ไม่ได้หมายความว่าไม่ต้อง backup ไปที่อื่นเลย
 
 
 
📌 สรุปการเลือกใช้
 
สถานการณ์ แนะนำ 
ทดสอบ / พัฒนาในเครื่อง Single Redis ✅ 
งานเล็ก-ปานกลาง ไม่ซีเรียสเรื่อง downtime Single Redis + Persistence ✅ 
งานจริง ต้องการความพร้อมใช้สูง Redis Cluster (3M+3R) ✅✅✅ 
ปริมาณการอ่านมากๆ Redis Cluster + เพิ่ม replicas ✅ 
 
ต้องการปรับแต่งอะไรเพิ่มไหมครับ — เช่น การตั้งค่าให้ failover อัตโนมัติ, monitoring ด้วย Prometheus/Grafana, หรือ encryption กับ TLS? 😊🚀 SlowAPI + Redis Cluster — High Availability Setup
 
รองรับหลาย Pod + กระจายข้อมูล + ไม่มีจุดล้มเหลวจุดเดียว ✅
 
 
 
📦 Redis Cluster คืออะไร?
 
แทนที่จะมี Redis ตัวเดียว → มี 3+ Master nodes กระจายข้อมูลกัน + Replica nodes สำรอง
ข้อมูลแบ่งเป็น 16,384 hash slots กระจายไปที่แต่ละ Master — ถ้า node หนึ่งล่ม อันอื่นทำงานต่อได้ ✅
 
plaintext
  
                    ┌─────────────────────────────────┐
                    │      📊 REDIS CLUSTER           │
                    │                                  │
          ┌─────────┼──────────┐      ┌──────────────┼──────────┐
          ▼         │          ▼      ▼              │          ▼
    ┌─────────────┐│   ┌─────────────┐   ┌─────────────┐ │   ┌─────────────┐
    │  Master 1   ││   │  Master 2   │   │  Master 3   │ │   │  Replicas   │
    │  Slots 0-5k ││   │ Slots 5k-11k│   │Slots 11k-16k│ │   │ (auto-failover)│
    └──────┬──────┘│   └──────┬───────┘   └──────┬──────┘ │   └─────────────┘
           │        │          │                 │        │
           └────────┼──────────┼─────────────────┼────────┘
                    │
           ┌────────┼────────┐      ┌────────────┼────────┐
           ▼        ▼        ▼      ▼            ▼        ▼
        ┌─────────────────────┐  ┌─────────────────────┐
        │      Pod 1          │  │      Pod 2          │
        │    SlowAPI          │  │    SlowAPI          │
        └─────────────────────┘  └─────────────────────┘
 
 
 
 
✅ Step 1 — ติดตั้งเพิ่มเติม
 
bash
  
pip install slowapi limits redis
# requirements.txt:
slowapi>=0.1.9
limits>=4.3          # ✅ ต้องเวอร์ชัน 4.3+ รองรับ Redis Cluster
redis>=5.0
 
 
💡  limits  library มี  RedisClusterStorage  สำหรับ Redis Cluster โดยเฉพาะ
 
 
 
📝 Step 2 — โค้ด FastAPI + Redis Cluster
 
 main.py 
 
python
  
from fastapi import FastAPI, Request, HTTPException
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from limits.storage import RedisClusterStorage
from limits.strategies import FixedWindowRateLimiter
import os
from dotenv import load_dotenv

load_dotenv()

# ─── Redis Cluster Connection ───
# รูปแบบ: redis+cluster://[:password@]host1:port,host2:port,host3:port
REDIS_CLUSTER_URL = os.getenv(
    "REDIS_CLUSTER_URL",
    "redis+cluster://redis-cluster-0.redis-cluster:6379,redis-cluster-1.redis-cluster:6379,redis-cluster-2.redis-cluster:6379"
)

# ─── Initialize Cluster Storage ───
try:
    storage = RedisClusterStorage(
        REDIS_CLUSTER_URL,
        key_prefix="rate_limit",  # ✅ ป้องกัน key ชนกับข้อมูลอื่น
        max_connections=100,     # ต่อ node
        socket_connect_timeout=5,
        socket_timeout=2,
    )
    # ทดสอบเชื่อมต่อ
    from redis.cluster import RedisCluster
    nodes = [n.split(':') for n in REDIS_CLUSTER_URL.replace("redis+cluster://", "").split(',')]
    rc = RedisCluster(startup_nodes=[{"host": h, "port": int(p)} for h, p in nodes])
    rc.ping()
    print("✅ Redis Cluster connected!")
except Exception as e:
    print(f"⚠️ Redis Cluster unavailable: {e} — falling back to in-memory storage")
    from limits.storage import MemoryStorage
    storage = MemoryStorage()

# ─── Limiter Setup ───
limiter = Limiter(
    key_func=get_remote_address,
    storage_backend=storage,
    strategy=FixedWindowRateLimiter()
)

# ─── App Setup ───
app = FastAPI(title="SlowAPI + Redis Cluster Demo")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ─── Routes ───
@app.get("/")
@limiter.limit("20/minute")
async def root(request: Request):
    return {
        "message": "✅ Hello from Redis Cluster!",
        "pod": os.uname()[1],
        "rate_limit": "20 requests/minute",
        "storage": "Redis Cluster" if not isinstance(storage, MemoryStorage) else "Fallback: Memory"
    }

@app.get("/health/cluster")
async def cluster_health():
    if isinstance(storage, RedisClusterStorage):
        return {
            "status": "connected",
            "mode": "redis-cluster",
            "key_prefix": storage.key_prefix
        }
    return {"status": "degraded", "mode": "in-memory-fallback"}
 
 
 .env 
 
env
  
REDIS_CLUSTER_URL=redis+cluster://redis-cluster-0.redis-cluster:6379,redis-cluster-1.redis-cluster:6379,redis-cluster-2.redis-cluster:6379
# มีรหัสผ่าน: REDIS_CLUSTER_URL=redis+cluster://:yourpass@redis-cluster-0.redis-cluster:6379,...
 
 
 
 
🐳 Step 3 — Deploy Redis Cluster on Kubernetes
 
Option A: Bitnami Helm Chart (Recommended — ใช้ง่าย สนับสนุนดี) 
 
bash
  
# เพิ่ม Helm repo
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# ติดตั้ง Redis Cluster — 3 Master + 3 Replica
helm install redis-cluster bitnami/redis-cluster \
  --namespace redis \
  --create-namespace \
  --set cluster.nodes=3 \
  --set cluster.replicas=1 \
  --set auth.enabled=false  # เปลี่ยนเป็น true ใน production!
 
 
Option B: Manual YAML manifests (ควบคุมเอง)
 
 k8s/redis-cluster/statefulset.yaml 
 
yaml
  
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis-cluster
spec:
  serviceName: redis-cluster
  replicas: 3
  selector:
    matchLabels:
      app: redis-cluster
  template:
    metadata:
      labels:
        app: redis-cluster
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
          name: redis
        command:
          - sh
          - -c
          - |
            redis-server --port 6379 \
              --cluster-enabled yes \
              --cluster-config-file nodes.conf \
              --cluster-node-timeout 5000 \
              --appendonly yes \
              --cluster-announce-ip $(POD_IP) \
              --cluster-announce-port 6379
        env:
        - name: POD_IP
          valueFrom: { fieldRef: { fieldPath: status.podIP } }
        volumeMounts:
        - name: data
          mountPath: /data
        resources:
          requests: { cpu: "100m", memory: "128Mi" }
          limits: { cpu: "500m", memory: "512Mi" }
  volumeClaimTemplates:
  - metadata: { name: data }
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources: { requests: { storage: 1Gi } }
---
apiVersion: v1
kind: Service
metadata:
  name: redis-cluster
spec:
  selector:
    app: redis-cluster
  ports:
  - port: 6379
    targetPort: 6379
  clusterIP: None  # Headless service — DNS: redis-cluster-0.redis-cluster.default.svc
 
 
Initialize the Cluster (ครั้งแรกเท่านั้น)
 
bash
  
# เข้าไปที่ pod แรก
kubectl exec -it redis-cluster-0 -- sh

# สร้าง cluster — 3 masters, 1 replica แต่ละตัว
redis-cli --cluster create \
  redis-cluster-0.redis-cluster:6379 \
  redis-cluster-1.redis-cluster:6379 \
  redis-cluster-2.redis-cluster:6379 \
  --cluster-replicas 1

# พิมพ์ yes เพื่อยืนยัน ✅

# ตรวจสอบสถานะ
redis-cli cluster info
# ควรเห็น: cluster_state:ok
 
 
 
 
🔍 Step 4 — ทดสอบ
 
ตรวจสอบ Cluster Status
 
bash
  
# ดู nodes ทั้งหมด
kubectl exec -it redis-cluster-0 -- redis-cli cluster nodes

# ดูข้อมูลสรุป
kubectl exec -it redis-cluster-0 -- redis-cli cluster info
 
 
ทดสอบ Rate Limiting ผ่านหลาย Pod
 
bash
  
# ส่งคำขอไปยัง API service (กระจายไปหลาย pod อัตโนมัติ)
for i in {1..25}; do
  curl -s http://localhost:8080/ | jq .message
  sleep 0.3
done

# ✅ ควรเห็น: 20 ครั้งแรกสำเร็จ → ครั้งที่ 21-25 ได้ 429 Too Many Requests
# ✅ ไม่ว่าจะไป pod ไหน นับรวมถูกต้อง เพราะมาจาก Redis Cluster เดียวกัน
 
 
 
 
⚠️ ข้อแตกต่าง & ข้อควรระวัง
 
ปัญหา Redis เดี่ยว Redis Cluster 
Connection URL  redis://host:6379/0   redis+cluster://host1:6379,host2:6379,...  ✅ 
High Availability ❌ ล่มก็ล่มเลย ✅ Auto-failover ถ้า Master ล่ม Replica ขึ้นแทนทันที 
Scalability จำกัดด้วยเครื่องเดียว ✅ เพิ่ม node เพิ่มความจุได้เรื่อยๆ 
การ Migrate ย้ายทีละครั้ง ✅ เพิ่ม node → ย้าย slot อัตโนมัติ → ไม่มี downtime 
Key Distribution ที่เดียวหมด ✅ กระจาย 16,384 slots อัตโนมัติ 
 
Production Checklist ✅
 
เปิดใช้ Auth/Password —  auth.enabled: true  ใน Bitnami chart
ตั้ง PVC/Persistence — ข้อมูลไม่หายเมื่อ restart
ตั้ง Pod Disruption Budget — ไม่ให้ล่มพร้อมกันทีละหลายตัว
ตรวจสอบ  cluster_state:ok  เป็นประจำ
เพิ่ม Monitoring — redis-exporter + Prometheus/Grafana
ตั้ง Key Prefix — ป้องกัน key ชนกับแอปอื่นที่ใช้ cluster เดียวกัน
 
 
 
📊 เมื่อไหร่ควรใช้อะไร?
 
ขนาดระบบ แนะนำ ทำไม 
Dev / ทดสอบ Redis เดี่ยว เรียบง่าย ไม่ต้องจัดการหลาย node 
Production < 1k RPS Redis เดี่ยว + Replica เพียงพอ ง่ายกว่า 
Production > 1k RPS / HA ต้องการ Redis Cluster ✅ กระจายโหลด ไม่มีจุดล้มเหลวเดียว 
 
ต้องการเพิ่มอะไรอีกไหมครับ — เช่น Redis Cluster with TLS/SSL, password authentication, หรือ monitoring dashboard? 😊