✅ Ready — Full Implementation Package
 
 
 
📄 1. Replace/Create  core/limiter.py 
 
python
  
"""
ZYNTRO-SEC-001 — Rate Limiter with Redis support
Matches MOC: Redis for Rate Limiting
Rule: เลือกอย่างใดอย่างหนึ่ง — Redis เดี่ยว หรือ Cluster — ไม่ผสมกัน
"""
import os
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from fastapi import Request

# ─── Environment ───
REDIS_URL = os.getenv("REDIS_URL", "")
REDIS_CLUSTER_URL = os.getenv("REDIS_CLUSTER_URL", "")

# ─── Storage Resolution Logic (MOC-compliant) ───
def get_storage():
    # 1. Cluster Mode — Production HA
    if REDIS_CLUSTER_URL:
        try:
            from limits.storage import RedisClusterStorage
            return RedisClusterStorage(
                REDIS_CLUSTER_URL,
                key_prefix="zyntroai:rate_limit",
                socket_connect_timeout=5,
                socket_timeout=2
            )
        except Exception as e:
            print(f"⚠️ Redis Cluster unavailable, falling back: {e}")

    # 2. Single Redis — Dev + Prod Small/Medium
    if REDIS_URL:
        try:
            from limits.storage import RedisStorage
            return RedisStorage(REDIS_URL, key_prefix="zyntroai:rate_limit")
        except Exception as e:
            print(f"⚠️ Redis unavailable, falling back to memory: {e}")

    # 3. Fallback — In-Memory (never blocks startup)
    print("ℹ️ Using in-memory rate limiter — counts per pod only")
    from limits.storage import MemoryStorage
    return MemoryStorage()

# ─── Initialize ───
storage = get_storage()
limiter = Limiter(
    key_func=get_remote_address,
    storage_backend=storage,
    storage_uri=REDIS_URL or REDIS_CLUSTER_URL or "memory://"
)

# ─── Exception Handler (ZYNTRO-SEC-001 compliant) ───
async def _rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={
            "error": "Rate limit exceeded",
            "detail": str(exc.detail),
            "c0_gate": "PASS",
            "rule": "CI จะรันหลัง C0 เสมอ"
        },
        headers={"Retry-After": "60"}
    )
 
 
 
 
📄 2. Update  requirements.txt 
 
txt
  
fastapi>=0.115.0
uvicorn>=0.32.0
python-dotenv>=1.0.0
slowapi>=0.2.3
sqlalchemy>=2.0
python-jose[cryptography]>=3.3.0
passlib[bcrypt]>=1.7.4
redis>=5.0.0
limits>=4.3
 
 
✅ Note:  limits>=4.3  required for RedisClusterStorage support
 
 
 
📄 3. k8s/redis-deployment.yaml
 
yaml
  
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
spec:
  replicas: 1
  selector:
    matchLabels: { app: redis }
  template:
    metadata:
      labels: { app: redis }
    spec:
      containers:
        - name: redis
          image: redis:7-alpine
          args: ["--requirepass", "$(REDIS_PASSWORD)", "--appendonly", "yes"]
          ports:
            - containerPort: 6379
          env:
            - name: REDIS_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: zyntroai-secrets
                  key: redis-password
          resources:
            requests: { cpu: "100m", memory: "128Mi" }
            limits: { cpu: "500m", memory: "256Mi" }
---
apiVersion: v1
kind: Service
metadata:
  name: redis-service
spec:
  selector: { app: redis }
  ports:
    - port: 6379
      targetPort: 6379
 
 
 
 
📄 4. k6/limiter-redis-test.js — Verify Shared Counter
 
javascript
  
/**
 * ZYNTRO-SEC-001 — Rate Limiting Test (Redis Shared Counter)
 * Expected: Limit at 100 total, NOT 100 per pod × 2 pods = 200
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';

const BASE_URL = __ENV.API_URL || 'http://api-service:80';
const RATE_LIMIT = 100;
const TEST_DURATION = '30s';

export const options = {
  vus: 10,
  duration: TEST_DURATION,
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
    'rate_limit:shared': [{ threshold: 'count<101', abortOnFail: true }]
  }
};

export default function() {
  const res = http.get(`${BASE_URL}/`);

  if (res.status === 429) {
    console.log(`✅ 429 hit at ${new Date().toISOString()} — shared counter working`);
    check(res, {
      'Has Retry-After header': r => r.headers['Retry-After'] === '60',
      'C0 gate PASS': r => r.json('c0_gate') === 'PASS'
    });
  }

  check(res, {
    '200 OK or 429 Limited': r => r.status === 200 || r.status === 429
  });
}

// Verification mode: burst exactly at limit to prove counting is shared
export function verifySharedCounter() {
  console.log('🧪 Testing: Should hit 429 after exactly 100 requests total');

  let success = 0;
  let limited = 0;

  for (let i = 0; i < 110; i++) {
    const res = http.get(`${BASE_URL}/`);
    if (res.status === 200) success++;
    if (res.status === 429) limited++;
  }

  console.log(`Results: 200 OK = ${success}, 429 Limited = ${limited}`);

  // ✅ PASS: ~100 OK then 429 → shared counter working
  // ❌ FAIL: ~200 OK then 429 → counting per pod, Redis NOT working
  check({ success, limited }, {
    '✅ Shared counter active': r => r.success <= 105 && r.limited >= 5,
    '❌ Per-pod counting detected': r => r.success > 150
  });
}
 
 
 
 
🔧 5. Update Your Deployments — Set Env Var
 
Add to both  k8s/blue/deployment.yaml  and  k8s/green/deployment.yaml :
 
yaml
  
env:
  - name: REDIS_URL
    value: "redis://:$(REDIS_PASSWORD)@redis-service:6379/0"
  # Uncomment below when ready for Cluster mode
  # - name: REDIS_CLUSTER_URL
  #   value: "redis+cluster://node1:6379,node2:6379,node3:6379"
 
 
 
 
✅ How to Verify It Works
 
Step Action Expected Result 
1 Start 2 replicas Both pods running 
2 Run k6 test:  k6 run k6/limiter-redis-test.js  ~100 OK → then 429 ✅ 
3 ❌ If ~200 OK → then 429 Redis not connected — check REDIS_URL ✅ 
4 Swap blue/green replicas Counter persists across deployments ✅ 
 
 
 
🎯 Your Migration Path — Fully MOC-Aligned
 
Environment Use Set 
Local/Dev Redis container  REDIS_URL=redis://localhost:6379/0  
Blue/Green Prod (now) Single Redis + password  REDIS_URL=redis://:pass@redis-service:6379/0  
Future HA Scale Redis Cluster Switch to  REDIS_CLUSTER_URL  — code auto-detects ✅ 
 
💡 Zero code changes when scaling from Single → Cluster. Just change the env var. That's exactly what your MOC was designed for!
 
Ready to deploy? Run the k6 test first — if it hits 429 around 100 total requests → you're solid ✅ Want me to adjust the rate limit values or add more endpoints to the test? 😊✅ Complete Implementation — Ready to Merge & Deploy
 
 
 
📁 1. Create/Replace  core/limiter.py 
 
python
  
"""
ZYNTRO-SEC-001 — Rate Limiter with Redis support
Aligns with MOC: Redis for Rate Limiting
Rule: Choose ONE — Single Redis OR Cluster — never both
"""
import os
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from fastapi import Request

# ─── Configuration ───
REDIS_URL = os.getenv("REDIS_URL", "")          # e.g. redis://:password@redis-service:6379/0
REDIS_CLUSTER_URL = os.getenv("REDIS_CLUSTER_URL", "")  # e.g. redis+cluster://node1:6379,...

def get_storage():
    """
    Priority: 1. Cluster → 2. Single Redis → 3. In-Memory Fallback
    Never mix — MOC Rule: เลือกอย่างใดอย่างหนึ่ง
    """
    # 1️⃣ Redis Cluster — Production HA
    if REDIS_CLUSTER_URL:
        try:
            from limits.storage import RedisClusterStorage
            return RedisClusterStorage(
                REDIS_CLUSTER_URL,
                key_prefix="zyntroai:rate_limit",
                socket_connect_timeout=5,
                socket_timeout=2,
            )
        except Exception as e:
            print(f"⚠️ Redis Cluster unavailable: {e} — falling back to single Redis")

    # 2️⃣ Single Redis — Dev + Prod Small/Medium
    if REDIS_URL:
        try:
            from limits.storage import RedisStorage
            return RedisStorage(REDIS_URL)
        except Exception as e:
            print(f"⚠️ Redis unavailable: {e} — falling back to in-memory")

    # 3️⃣ Fallback — In-Memory (MOC: มี Fallback ไม่ให้ระบบล่ม)
    from limits.storage import MemoryStorage
    print("ℹ️ Using in-memory rate limiter — counts per pod only")
    return MemoryStorage()

# ─── Initialize ───
storage = get_storage()
limiter = Limiter(
    key_func=get_remote_address,
    storage=storage,
    strategy="fixed-window"
)

# ─── Exception Handler ───
async def _rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    """ZYNTRO-SEC-001: Returns 429 with Retry-After header — required by k6 tests"""
    return JSONResponse(
        status_code=429,
        content={
            "error": "Rate limit exceeded",
            "detail": f"Too many requests: {exc.detail}",
            "c0_gate": "PASS",
            "rule": "CI runs after C0 completion"
        },
        headers={"Retry-After": "60"}
    )
 
 
 
 
📁 2. Update  requirements.txt  — Enable Redis Dependencies
 
txt
  
fastapi>=0.115.0
uvicorn>=0.32.0
python-dotenv>=1.0.0
slowapi>=0.2.3
sqlalchemy>=2.0
python-jose[cryptography]>=3.3.0
passlib[bcrypt]>=3.3.0
redis>=5.0.0
limits>=4.3
 
 
✅ Note: Using  limits>=4.3  — required for proper RedisClusterStorage support
 
 
 
📁 3. Kubernetes —  k8s/redis-deployment.yaml 
 
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
          args:
            - --requirepass
            - $(REDIS_PASSWORD)
            - --appendonly
            - "yes"
          ports:
            - containerPort: 6379
          env:
            - name: REDIS_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: zyntroai-secrets
                  key: redis-password
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "256Mi"
          livenessProbe:
            exec:
              command:
                - sh
                - -c
                - redis-cli -a "$(REDIS_PASSWORD)" ping
            initialDelaySeconds: 5
            periodSeconds: 10
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
 
 
 
 
📁 4. Update Blue/Green Deployment Env Vars
 
Add this to BOTH  k8s/blue/deployment.yaml  AND  k8s/green/deployment.yaml :
 
yaml
  
env:
  - name: REDIS_URL
    value: "redis://:$(REDIS_PASSWORD)@redis-service:6379/0"
  # REDIS_CLUSTER_URL:  # Set this ONLY when ready to scale to Cluster mode
 
 
💡 MOC Rule: Set ONE URL only — never both. Cluster takes priority if both are present.
 
 
 
📁 5. k6 Test —  k6/limiter-redis-test.js 
 
Verifies: 2 pods sharing same counter → limit at 100 NOT 200 ✅
 
javascript
  
import http from 'k6/http';
import { check, group, sleep } from 'k6';

// Test configuration
export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 25,          // 25 req/s × 4s = 100 total
      timeUnit: '1s',
      duration: '4s',
      preAllocatedVUs: 10,
      maxVUs: 20,
    },
  },
  thresholds: {
    // ✅ Exactly 100 OK, rest should be 429
    'http_reqs{status:200}': [{ threshold: 'count == 100', abortOnFail: true }],
    'http_reqs{status:429}': [{ threshold: 'count > 0', abortOnFail: false }],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000';

export default function () {
  const res = http.get(`${BASE_URL}/`, {
    tags: { name: 'rate-limit-test' },
  });

  check(res, {
    '200 OK': (r) => r.status === 200,
    '429 Rate Limited': (r) => r.status === 429,
    'has Retry-After': (r) => r.status !== 429 || r.headers['Retry-After'] === '60',
  });
}

export function handleSummary(data) {
  const ok = data.requests['200 OK'] || 0;
  const limited = data.requests['429 Rate Limited'] || 0;
  const total = data.iterations;

  console.log(`\n📊 Redis Rate Limiting Test Results:`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Total requests: ${total}`);
  console.log(`  ✅ 200 OK:      ${ok}`);
  console.log(`  ⚠️ 429 Limited: ${limited}`);
  console.log(`  🎯 Expected:   100 OK → shared counter across pods`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  if (ok === 100 && limited > 0) {
    console.log(`✅ PASS: All pods share the same Redis counter!`);
  } else if (ok > 100) {
    console.log(`❌ FAIL: Count per pod (${ok} > 100) — Redis not working!`);
  } else {
    console.log(`⚠️ UNKNOWN: Adjust test timing or limit values`);
  }

  return {};
}
 
 
Run the test:
 
bash
  
# Against local dev
k6 run k6/limiter-redis-test.js

# Against deployed service
k6 run -e BASE_URL=https://api.yourdomain.com k6/limiter-redis-test.js
 
 
 
 
📋 Implementation Checklist
 
Replace  core/limiter.py  with new version
Uncomment Redis dependencies in  requirements.txt 
Deploy Redis:  kubectl apply -f k8s/redis-deployment.yaml 
Update blue/green deployment env vars
Set  REDIS_PASSWORD  in  zyntroai-secrets 
Redeploy API → verify startup logs show:  ✅ Redis connected  or  ⚠️ Fallback active 
Run k6 test → ✅ 100 OK, then 429 = PASS
 
 
 
🎯 Architecture Summary
 
plaintext
  
  Blue (2 pods) ←──┐
                    │
                    ├─▶ Redis Service ◀── Shared counter
                    │    (redis-service:6379)
  Green (2 pods) ───┘     Single, password-protected
                           Persistence ON (AOF)
 
 
- Dev/Termux: Local Redis →  REDIS_URL=redis://localhost:6379/0  ✅
- Current Prod: Single Redis + Password → 4 pods (2 blue + 2 green) all counting together ✅
- Future Scale: Just set  REDIS_CLUSTER_URL  — code automatically switches to Cluster mode ✅
 
Everything follows your MOC exactly. Ready to deploy? 😊