title: Local LLM — Build API Server
aliases:
 
- "สร้าง API สำหรับ Local LLM"
- "Ollama API & FastAPI Integration"
slug: local-llm-api
icon: 🔌
color: violet
type: guide
status: active
priority: high
tags:
- type/guide
- topic/ai
- topic/llm
- topic/api
- topic/fastapi
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[Local LLM]]"
related:
- "[[Local LLM]]"
- "[[API]]"
- "[[Obsidian & FastAPI]]"
 
 
 
🔌 สร้าง API สำหรับ Local LLM — Ollama + FastAPI
 
เปิดบริการ LLM ในรูปแบบ API — ให้แอปอื่นในเครือข่ายเรียกใช้ได้ ✅
 
 
 
📋 สารบัญ
 
- 🔹 ส่วนที่ 1 — ใช้ API ของ Ollama โดยตรง
- 🔹 ส่วนที่ 2 — สร้าง API ด้วย FastAPI (แนะนำ)
- 🔹 ส่วนที่ 3 — ติดตั้ง & รันจริง
- 🔹 ส่วนที่ 4 — ตัวอย่างเรียกใช้งาน
- 🔹 ส่วนที่ 5 — ความปลอดภัย & Deployment
 
 
 
🔹 ส่วนที่ 1 — ใช้ API ของ Ollama โดยตรง
 
เมื่อรัน  ollama serve  จะมี API พร้อมใช้งานที่  http://localhost:11434 
 
✅ ทดสอบเรียกใช้
 
bash
  
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5",
  "prompt": "อธิบายวิธีต้มไข่ให้สุกพอดี",
  "stream": false
}'
 
 
📌 Endpoints หลัก
 
Method Endpoint หน้าที่ 
POST  /api/generate  ข้อความถาม-ตอบทั่วไป 
POST  /api/chat  แชทแบบมีประวัติ 
GET  /api/tags  ดูรายการโมเดลที่มี 
POST  /api/pull  ดาวน์โหลดโมเดลใหม่ 
 
ข้อจำกัด: ไม่มีการตรวจสอบสิทธิ์, ไม่มีควบคุมการใช้งาน, ไม่มี Log — เหมาะสำหรับใช้ในเครื่องเท่านั้น
 
 
 
🔹 ส่วนที่ 2 — สร้าง API ด้วย FastAPI (แนะนำ)
 
✅ โครงสร้างโปรเจกต์
 
plaintext
  
llm-api/
├── main.py          # โค้ดหลัก API
├── .env             # ตัวแปรลับ
├── requirements.txt # รายการแพ็กเกจ
└── README.md        # คู่มือใช้งาน
 
 
📄  requirements.txt 
 
txt
  
fastapi==0.115.0
uvicorn==0.31.0
pydantic==2.9.2
python-dotenv==1.0.1
httpx==0.27.2
 
 
📄  .env 
 
env
  
# Server
HOST=0.0.0.0
PORT=8000
API_KEY=เปลี่ยน-เป็น-รหัสผ่าน-ของคุณ

# Ollama
OLLAMA_URL=http://localhost:11434
DEFAULT_MODEL=qwen2.5
 
 
📄  main.py  — โค้ดเต็ม
 
python
  
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyHeader
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import os
import httpx
from typing import Optional, List, Dict, Any

# โหลดตัวแปรสภาพแวดล้อม
load_dotenv()

# การตั้งค่า
API_KEY = os.getenv("API_KEY", "dev-key-change-me")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
DEFAULT_MODEL = os.getenv("DEFAULT_MODEL", "qwen2.5")

# ตรวจสอบ API Key
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

async def verify_api_key(api_key: Optional[str] = Depends(api_key_header)):
    if not api_key or api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API Key"
        )
    return api_key

# สร้างแอป
app = FastAPI(
    title="Local LLM API",
    description="API Server สำหรับเรียกใช้ Local LLM ผ่าน Ollama",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# เปิด CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ปรับให้จำเพาะในสภาพจริง
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== โมเดลข้อมูล ====================

class GenerateRequest(BaseModel):
    prompt: str = Field(..., description="ข้อความคำถาม/คำสั่ง")
    model: str = Field(default=DEFAULT_MODEL, description="ชื่อโมเดล")
    system_prompt: Optional[str] = Field(default=None, description="คำสั่งระบบ")
    temperature: float = Field(default=0.7, ge=0.0, le=2.0, description="ความสร้างสรรค์")
    max_tokens: int = Field(default=2048, ge=1, description="จำนวนคำสูงสุด")
    stream: bool = Field(default=False, description="ส่งคำตอบทีละส่วน")

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    model: str = Field(default=DEFAULT_MODEL)
    temperature: float = 0.7
    max_tokens: int = 2048

# ==================== Helper ====================

async def call_ollama(endpoint: str, payload: Dict[str, Any]):
    async with httpx.AsyncClient(timeout=120.0) as client:
        try:
            response = await client.post(
                f"{OLLAMA_URL}{endpoint}",
                json=payload
            )
            response.raise_for_status()
            return response.json()
        except httpx.ConnectError:
            raise HTTPException(status_code=503, detail="Cannot connect to Ollama. Is `ollama serve` running?")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Ollama Error: {e.response.text}")

# ==================== Endpoints ====================

@app.get("/", tags=["General"])
async def root():
    return {
        "service": "Local LLM API",
        "version": "1.0.0",
        "ollama_url": OLLAMA_URL,
        "default_model": DEFAULT_MODEL,
        "docs": "/docs"
    }

@app.get("/health", tags=["General"])
async def health_check():
    try:
        async with httpx.AsyncClient() as client:
            r = await client.get(f"{OLLAMA_URL}/api/tags")
            return {"status": "ok", "ollama_connected": True}
    except Exception as e:
        return {"status": "error", "ollama_connected": False, "error": str(e)}

@app.get("/models", tags=["Models"], dependencies=[Depends(verify_api_key)])
async def list_models():
    result = await call_ollama("/api/tags", {})
    return {"models": result.get("models", [])}

@app.post("/generate", tags=["LLM"], dependencies=[Depends(verify_api_key)])
async def generate_text(req: GenerateRequest):
    """สร้างข้อความจากคำสั่ง — เหมาะสำหรับงานเดี่ยวๆ เช่น สรุป แก้ไข เขียน"""
    
    prompt = req.prompt
    if req.system_prompt:
        prompt = f"[INST] {req.system_prompt}\n\n{req.prompt} [/INST]"
    
    payload = {
        "model": req.model,
        "prompt": prompt,
        "stream": req.stream,
        "options": {
            "temperature": req.temperature,
            "num_predict": req.max_tokens
        }
    }
    
    result = await call_ollama("/api/generate", payload)
    
    return {
        "model": req.model,
        "response": result.get("response", ""),
        "done": result.get("done", True),
        "eval_count": result.get("eval_count", 0)
    }

@app.post("/chat", tags=["LLM"], dependencies=[Depends(verify_api_key)])
async def chat_completion(req: ChatRequest):
    """แชทแบบมีประวัติ — เหมาะสำหรับการสนทนาต่อเนื่อง"""
    
    messages = [{"role": m.role, "content": m.content} for m in req.messages]
    
    payload = {
        "model": req.model,
        "messages": messages,
        "stream": False,
        "options": {
            "temperature": req.temperature,
            "num_predict": req.max_tokens
        }
    }
    
    result = await call_ollama("/api/chat", payload)
    
    return {
        "model": req.model,
        "message": result.get("message", {}),
        "done": result.get("done", True)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )
 
 
 
 
🔹 ส่วนที่ 3 — ติดตั้ง & รันจริง
 
✅ ขั้นตอน
 
bash
  
# 1. สร้างโฟลเดอร์
mkdir llm-api && cd llm-api

# 2. ติดตั้งแพ็กเกจ
pip install -r requirements.txt

# 3. เปิด Ollama Server ในอีกหน้าต่างหนึ่ง
ollama serve

# 4. รัน API Server
python main.py
 
 
✅ เข้าใช้งาน
 
- 📄 เอกสารอัตโนมัติ: http://localhost:8000/docs
- 🔗 API Base URL: http://localhost:8000
 
 
 
🔹 ส่วนที่ 4 — ตัวอย่างเรียกใช้งาน
 
🐍 Python
 
python
  
import requests

API_URL = "http://localhost:8000"
API_KEY = "รหัส-ของคุณ"

headers = {"X-API-Key": API_KEY}

# 1. เช็คสถานะ
resp = requests.get(f"{API_URL}/health")
print(resp.json())

# 2. สร้างข้อความ
resp = requests.post(
    f"{API_URL}/generate",
    headers=headers,
    json={
        "prompt": "อธิบายหลักการทำงานของ API แบบเข้าใจง่าย",
        "system_prompt": "คุณเป็นผู้เชี่ยวชาญอธิบายเรื่องเทคนิคให้คนทั่วไปเข้าใจ",
        "temperature": 0.7
    }
)
print(resp.json()["response"])

# 3. ดูรายการโมเดล
resp = requests.get(f"{API_URL}/models", headers=headers)
print(resp.json())
 
 
🟨 JavaScript / Postman
 
- Method: POST
- URL:  http://localhost:8000/generate 
- Headers:
plaintext
  
Content-Type: application/json
X-API-Key: รหัส-ของคุณ
 
- Body:
json
  
{
  "prompt": "สรุปเนื้อหาเอกสารแนบนี้...",
  "model": "qwen2.5",
  "temperature": 0.5
}
 
 
 
 
🔹 ส่วนที่ 5 — ความปลอดภัย & Deployment
 
⚠️ ก่อนเปิดให้คนอื่นใช้
 
- ✅ เปลี่ยน  API_KEY  เป็นรหัสยากๆ ทันที
- ✅ จำกัด  allow_origins  ให้เฉพาะโดเมน/IP ที่จำเป็น
- ✅ อย่าเปิดให้ภายนอกโดยตรง — ใช้ Reverse Proxy (Nginx) + HTTPS
- ✅ จำกัดอัตราการเรียกใช้ — เพิ่ม  slowapi  เพื่อป้องกันโจมตี
 
🐳 ด้วย Docker
 
dockerfile
  
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
 
 
 
 
✅ Checklist API พร้อมใช้งาน
 
รัน  ollama serve  อยู่ในพื้นหลัง ✅
ติดตั้ง Python และแพ็กเกจครบ ✅
ตั้งค่า  API_KEY  ในไฟล์  .env  ✅
ทดสอบ  /health  ผ่านเบราว์เซอร์ได้ ✅
ทดสอบเรียก  /generate  ผ่าน Postman/Python ได้ ✅
ปรับความปลอดภัยก่อนเปิดให้คนอื่นใช้ ✅
 
 
 
🔗 หัวข้อที่เกี่ยวข้อง
 
- [[Local LLM]] — ภาพรวมโมเดลและการติดตั้ง
- [[Obsidian & FastAPI]] — เชื่อมต่อกับปลั๊กอิน Obsidian
- [[API]] — มาตรฐานการออกแบบ API
- [[Docker Deployment]] — รันด้วย Docker ในสภาพจริง
 
 
 
✅ สรุปสั้นๆ:  ollama serve  = API พื้นฐาน / FastAPI = API ที่สมบูรณ์ มีระบบสิทธิ์ เอกสาร และควบคุมได้ — เลือกใช้ตามความต้องการครับ 😊
 
ต้องการเพิ่มฟีเจอร์อะไรต่อไหมครับ เช่น จำกัดจำนวนคำต่อวัน, บันทึกประวัติการใช้งาน, หรือรองรับหลายโมเดลพร้อมกัน 😊