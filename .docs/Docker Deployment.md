title: Docker Deployment
aliases:
 
- "คู่มือปรับใช้งานด้วย Docker"
- "Containerize & Deploy Guide"
slug: docker-deployment
icon: 🐳
color: blue
type: guide
status: active
priority: high
tags:
- type/guide
- topic/docker
- topic/devops
- topic/deployment
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[Local LLM — Build API Server]]"
related:
- "[[Local LLM — Build API Server]]"
- "[[Local LLM]]"
- "[[Best Practices]]"
 
 
 
🐳 Docker Deployment — ปรับใช้งานด้วยคอนเทนเนอร์
 
บรรจุทั้งแอปและบริการลงในคอนเทนเนอร์ — ติดตั้งง่าย ทำงานเหมือนกันทุกเครื่อง ✅
 
 
 
📋 สารบัญ
 
- 📁 โครงสร้างโปรเจกต์
- 🐳 ส่วนที่ 1 — Dockerfile
- 📦 ส่วนที่ 2 — Docker Compose (แนะนำ)
- 🔒 ส่วนที่ 3 — การสร้างภาพและรันจริง
- 🌐 ส่วนที่ 4 — เข้าถึงจากภายนอก & Nginx Proxy
- ⚠️ ส่วนที่ 5 — ปัญหาที่พบบ่อย & วิธีแก้
 
 
 
📁 โครงสร้างโปรเจกต์
 
plaintext
  
llm-api/
├── main.py
├── .env
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── README.md
 
 
📄  .dockerignore 
 
plaintext
  
__pycache__/
*.pyc
*.pyo
*.pyd
.env
*.log
.git/
.gitignore
*.md
models/
 
 
 
 
🐳 ส่วนที่ 1 — Dockerfile
 
📄  Dockerfile 
 
dockerfile
  
# ===== ขั้นตอน 1: สร้างภาพฐาน =====
FROM python:3.11-slim

# ติดตั้งแพ็กเกจระบบที่จำเป็น
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ตั้งค่าโฟลเดอร์ทำงาน
WORKDIR /app

# ติดตั้ง Python dependencies — คัดลอกไฟล์ก่อนเพื่อใช้ประโยชน์จาก Cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# คัดลอกโค้ดที่เหลือ
COPY . .

# เปิดพอร์ต
EXPOSE 8000

# คำสั่งเริ่มต้น
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
 
 
 
 
📦 ส่วนที่ 2 — Docker Compose (แนะนำ ⭐)
 
รัน Ollama + API Server พร้อมกันด้วยไฟล์เดียว จัดการง่ายมากครับ
 
📄  docker-compose.yml 
 
yaml
  
version: "3.8"

services:
  # ===== Ollama Backend =====
  ollama:
    image: ollama/ollama:latest
    container_name: llm-ollama
    restart: unless-stopped
    volumes:
      - ollama-models:/root/.ollama
    ports:
      - "11434:11434"
    # ✅ สำหรับ NVIDIA GPU — ลบ # ด้านล่างออกถ้าต้องการใช้การ์ดจอ
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: all
    #           capabilities: [gpu]
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:11434/api/tags"]
      interval: 10s
      timeout: 10s
      retries: 5

  # ===== FastAPI Server =====
  api:
    build: .
    container_name: llm-api
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - HOST=0.0.0.0
      - PORT=8000
      - API_KEY=${API_KEY:-change-this-in-env-file}
      - OLLAMA_URL=http://ollama:11434
      - DEFAULT_MODEL=${DEFAULT_MODEL:-qwen2.5}
    depends_on:
      ollama:
        condition: service_healthy
    volumes:
      - ./logs:/app/logs
    # จำกัดทรัพยากรตามความเหมาะสม
    deploy:
      resources:
        limits:
          cpus: "4.0"
          memory: 8G
        reservations:
          cpus: "1.0"
          memory: 2G

volumes:
  ollama-models:  # เก็บโมเดลไว้ที่นี่ — ไม่ต้องดาวน์โหลดใหม่ทุกครั้ง
 
 
 
 
🔒 ส่วนที่ 3 — สร้างภาพและรันจริง
 
✅ ขั้นตอนทั้งหมด
 
bash
  
# 1. ตรวจสอบไฟล์ทั้งหมดมีครบ
ls -la

# 2. กำหนดตัวแปรสภาพแวดล้อม
cp .env.example .env
nano .env   # แก้ไข API_KEY เป็นรหัสของคุณ

# 3. สร้างภาพและรันทั้งสองบริการ
docker compose up -d --build

# 4. ดูสถานะ
docker compose ps

# 5. ดู Log
docker compose logs -f api
docker compose logs -f ollama

# 6. ดาวน์โหลดโมเดลครั้งแรก
docker compose exec ollama ollama pull qwen2.5

# 7. ทดสอบ
curl http://localhost:8000/health
# หรือเปิดในเบราว์เซอร์: http://localhost:8000/docs
 
 
✅ คำสั่งพื้นฐาน
 
bash
  
# หยุดทั้งหมด
docker compose down

# หยุด + ลบข้อมูล (ระวัง — โมเดลจะหายไปด้วย)
docker compose down -v

# อัปเดตและรันใหม่
docker compose up -d --build --force-recreate

# ดูพื้นที่ใช้งาน
docker system df
 
 
 
 
🌐 ส่วนที่ 4 — เข้าถึงจากภายนอก & Nginx Proxy
 
✅ ตัวอย่าง Nginx Configuration —  /etc/nginx/sites-available/llm-api.conf 
 
nginx
  
server {
    listen 80;
    server_name llm.your-domain.com;

    # ขนาดสูงสุดของคำขอ
    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # สำหรับการเชื่อมต่อที่ใช้เวลานาน
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
    }
}
 
 
เปิดใช้และติดตั้ง SSL ด้วย Let's Encrypt:
 
bash
  
sudo ln -s /etc/nginx/sites-available/llm-api.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d llm.your-domain.com
 
 
 
 
⚙️ ส่วนที่ 5 — ปรับแต่งสำหรับสภาพจริง
 
📋 ตัวแปรสภาพแวดล้อมที่สำคัญ
 
ตัวแปร ความหมาย ค่าตั้งต้น 
 API_KEY  รหัสเข้าใช้งาน API ต้องเปลี่ยน 
 OLLAMA_URL  ที่อยู่ Ollama  http://ollama:11434  
 DEFAULT_MODEL  โมเดลเริ่มต้น  qwen2.5  
 HOST  ที่อยู่ที่รัน  0.0.0.0  
 PORT  พอร์ต  8000  
 
🔐 สิ่งที่ต้องทำก่อนเปิดให้ใช้งานจริง
 
เปลี่ยน  API_KEY  เป็นรหัสยากและยาว ✅
ตั้งค่า DNS + SSL ✅
จำกัดการเข้าถึงด้วย Firewall — เปิดเฉพาะพอร์ต 80/443 ✅
สำรองข้อมูล Volume:  ollama-models  ✅
ตั้งค่า Log Rotation ✅
ตรวจสอบการใช้ทรัพยากรเป็นประจำ ✅
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุที่เป็นไปได้ วิธีแก้ 
❌ API เชื่อมต่อ Ollama ไม่ได้ Ollama ยังไม่พร้อม เพิ่ม  depends_on  +  healthcheck  ใน compose file 
🐢 รันโมเดลช้ามาก ไม่ได้ใช้ GPU หรือจำกัด CPU/Memory เปิดใช้ GPU ใน compose file หรือเพิ่มทรัพยากร 
💾 พื้นที่เต็ม มีหลายโมเดล + ภาพเก่า ลบโมเดลที่ไม่ใช้:  docker compose exec ollama ollama rm ชื่อโมเดล  
🔌 พอร์ตซ้ำ มีบริการอื่นใช้พอร์ต 8000/11434 เปลี่ยนพอร์ตใน compose file เช่น  8080:8000  
📥 ดาวน์โหลดโมเดลไม่ได้ ภายในคอนเทนเนอร์ไม่มีอินเทอร์เน็ต ตรวจสอบ DNS/Network ของ Docker 
 
 
 
✅ Checklist พร้อมปรับใช้งานจริง
 
ทดสอบบนเครื่องตัวเองเรียบร้อย ✅
เปลี่ยนรหัส API Key แล้ว ✅
รันทดสอบด้วย  docker compose up -d  ✅
ดาวน์โหลดโมเดลเรียบร้อย ✅
ทดสอบเรียก  /health  และ  /docs  ✅
ตั้งค่า Nginx + SSL ✅
ตั้งค่าให้เริ่มทำงานอัตโนมัติเมื่อเปิดเครื่อง ✅
วางแผนสำรองข้อมูล Volume ✅
 
 
 
🔗 หัวข้อที่เกี่ยวข้อง
 
- [[Local LLM — Build API Server]] — โค้ด API Server ฉบับเต็ม
- [[Local LLM]] — ข้อมูลโมเดลและการติดตั้ง
- [[Best Practices]] — แนวทางปฏิบัติที่ดีที่สุด
- [[Sync & Backup Plugins]] — สำรองข้อมูลก่อนปรับใช้จริง
 
 
 
✅ สรุปสั้นๆ: Docker Compose = วิธีที่ง่ายและเสถียรที่สุด — รันทั้ง Ollama และ API Server พร้อมกัน จัดการด้วยไฟล์เดียว ย้ายเครื่องก็แค่คัดลอกไฟล์และรัน  docker compose up -d  ครับ 😊
 
ต้องการเพิ่มอะไรต่อไหมครับ เช่น Monitor ด้วย Prometheus/Grafana, รองรับ Load Balance หลายโมเดล, หรือสคริปต์สำรองอัตโนมัติ 😊