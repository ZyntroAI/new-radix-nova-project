ได้เลยครับ ✅ สร้าง  .docs/Gemini_REST_API.md  — คู่มือการใช้งาน Gemini REST API ฉบับสมบูรณ์ พร้อมตัวอย่างโค้ดและการผสานเข้ากับ ZyntroAI 🤖✨
 
 
 
markdown  
---
title: Gemini REST API — คู่มือการใช้งาน
version: 1.0.0
status: active
category: api
tags:
  - zyntroai
  - gemini
  - google
  - api
  - llm
  - integration
created: 2026-10-04
namespace: ZyntroAI/new-crystalcastle
---

# 🤖 Gemini REST API — คู่มือฉบับสมบูรณ์

## 📌 ข้อมูลเบื้องต้น

**Google Gemini API** คือชุดเครื่องมือเชื่อมต่อกับโมเดลภาษาของ Google รองรับทั้งข้อความ, รูปภาพ, เสียง และวิดีโอ

| รายการ | ข้อมูล |
|---|---|
| **ที่อยู่ API** | `https://generativelanguage.googleapis.com/v1` |
| **เวอร์ชันล่าสุด** | `v1` |
| **โมเดลหลัก** | `gemini-2.0-flash`, `gemini-1.5-pro`, `gemini-1.5-flash` |
| **รับคีย์ได้ที่** | https://aistudio.google.com/app/apikey |
| **ขีดจำกัดฟรี** | 15 คำขอ/นาที — `gemini-2.0-flash` |

---

## 🔑 การเตรียมคีย์ API

### 1. รับคีย์
1. ไปที่ https://aistudio.google.com/app/apikey
2. กด **Create API Key** → สร้างโปรเจกต์ใหม่/เลือกโปรเจกต์
3. คัดลอกคีย์ — เริ่มต้นด้วย `AIza...`

### 2. เก็บอย่างปลอดภัย
```env
# .env — ไม่เคย Commit ขึ้น GitHub!
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GEMINI_MODEL=gemini-2.0-flash
 
 
 
 
📡 โครงสร้างคำขอพื้นฐาน
 
รูปแบบทั่วไป
 
http  
POST https://generativelanguage.googleapis.com/v1/models/{MODEL}:generateContent?key={API_KEY}
Content-Type: application/json

{
  "contents": [
    {
      "parts": [
        { "text": "คำถามหรือคำสั่งของคุณ" }
      ]
    }
  ]
}
 
 
ตัวอย่าง cURL
 
bash  
curl "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "parts": [
          { "text": "อธิบายระบบ AI แบบเข้าใจง่าย" }
        ]
      }
    ]
  }'
 
 
 
 
🐍 ตัวอย่าง Python — ผสานเข้ากับ ZyntroAI
 
ติดตั้งแพ็กเกจ
 
bash  
pip install google-generativeai python-dotenv
 
 
ไฟล์:  app/integrations/gemini_client.py 
 
python  
"""
🤖 Gemini API Client — ZyntroAI Integration
จัดการการเชื่อมต่อและเรียกใช้งาน Gemini API
"""
import os
import google.generativeai as genai
from dotenv import load_dotenv
from typing import Optional, Dict, Any, List
from PIL import Image

load_dotenv()

class GeminiClient:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
        
        if not self.api_key:
            raise ValueError("ต้องตั้งค่า GEMINI_API_KEY ใน .env")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(self.model_name)

    async def generate_text(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 2048
    ) -> Dict[str, Any]:
        """สร้างข้อความจากข้อความ"""
        try:
            generation_config = {
                "temperature": temperature,
                "max_output_tokens": max_tokens,
            }

            full_prompt = f"{system_prompt}\n\n{prompt}" if system_prompt else prompt
            response = await self.model.generate_content_async(
                full_prompt,
                generation_config=generation_config
            )
            
            return {
                "success": True,
                "text": response.text,
                "model": self.model_name,
                "usage": {
                    "prompt_tokens": getattr(response.usage_metadata, "prompt_token_count", 0),
                    "completion_tokens": getattr(response.usage_metadata, "candidates_token_count", 0)
                }
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "model": self.model_name
            }

    async def analyze_image(
        self,
        image_path: str,
        prompt: str = "บรรยายภาพนี้",
        temperature: float = 0.4
    ) -> Dict[str, Any]:
        """วิเคราะห์ภาพพร้อมคำถาม"""
        try:
            img = Image.open(image_path)
            response = await self.model.generate_content_async(
                [prompt, img],
                generation_config={"temperature": temperature}
            )
            return {
                "success": True,
                "text": response.text,
                "model": self.model_name
            }
        except Exception as e:
            return {"success": False, "error": str(e)}

    def start_chat(self, history: Optional[List[Dict]] = None):
        """เริ่มการสนทนาต่อเนื่อง"""
        return self.model.start_chat(history=history)


# อินสแตนซ์เดียวใช้ทั่วระบบ
gemini = GeminiClient()
 
 
 
 
🔗 เพิ่ม API Endpoint ใน FastAPI
 
ไฟล์:  app/integrations/routes.py 
 
python  
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import get_db
from .gemini_client import gemini

router = APIRouter(prefix="/gemini", tags=["🤖 Gemini AI"])


@router.post("/ask")
async def ask_gemini(
    prompt: str = Form(...),
    system_prompt: str = Form(None),
    temperature: float = Form(0.7),
    db: Session = Depends(get_db)
):
    """ถามคำถามข้อความ"""
    result = await gemini.generate_text(
        prompt=prompt,
        system_prompt=system_prompt,
        temperature=temperature
    )
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
    return result


@router.post("/analyze-image")
async def analyze_image(
    prompt: str = Form("บรรยายภาพนี้"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """วิเคราะห์ภาพ"""
    # บันทึกชั่วคราว
    import tempfile
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        result = await gemini.analyze_image(tmp_path, prompt)
        import os
        os.unlink(tmp_path)
        
        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])
        return result
    except Exception as e:
        os.unlink(tmp_path)
        raise HTTPException(status_code=500, detail=str(e))
 
 
ลงทะเบียนใน  app/main.py 
 
python  
from app.integrations.routes import router as gemini_router

app.include_router(gemini_router)
 
 
 
 
⚙️ ตัวเลือกการตั้งค่า
 
พารามิเตอร์ ค่าเริ่มต้น ช่วง คำอธิบาย 
 temperature   0.7  0.0–2.0 ความสุ่ม — สูง = คิดสร้างสรรค์, ต่ำ = แม่นยำ 
 max_output_tokens   2048  1–8192 ความยาวคำตอบสูงสุด 
 top_p   0.95  0.0–1.0 การเลือกคำถัดไปแบบกลุ่ม 
 top_k   40  1–40 จำนวนตัวเลือกคำถัดไป 
 
 
 
⚠️ การจัดการข้อผิดพลาด
 
รหัส สาเหตุ วิธีแก้ 
401 คีย์ API ไม่ถูกต้อง ตรวจสอบ  GEMINI_API_KEY  
403 ไม่ได้เปิดใช้งาน/หมดโควตา ตรวจสอบที่ Google AI Studio 
429 มีคำขอมากเกินไป รอสักครู่ → เพิ่มการหน่วงเวลา 
500 ข้อผิดพลาดฝั่ง Google ลองใหม่อีกครั้ง 
503 บริการไม่พร้อมใช้งาน รอแล้วลองใหม่ 
 
 
 
📊 เปรียบเทียบโมเดล
 
โมเดล ความเร็ว ขนาดบริบท เหมาะสำหรับ 
 gemini-2.0-flash  ⚡ เร็วมาก 1M โทเคน แชท, วิเคราะห์, งานทั่วไป 
 gemini-1.5-pro  🟢 ปานกลาง 2M โทเคน งานซับซ้อน, เขียนโค้ด, วิเคราะห์เอกสารยาว 
 gemini-1.5-flash  ⚡ เร็วมาก 1M โทเคน ประมวลผลภาพ/เสียง/วิดีโอจำนวนมาก 
 
 
 
🔒 ความปลอดภัย
 
- ✅ ไม่ส่ง  .env  ขึ้น GitHub — เพิ่มใน  .gitignore 
- ✅ ใช้ GitHub Secrets เมื่อรันใน CI/CD
- ✅ ตรวจสอบข้อมูลที่ส่งไป — ไม่ส่งข้อมูลลับโดยไม่จำเป็น
- ✅ จำกัดอัตราคำขอ — ป้องกันการใช้งานเกิน
 
 
 
📝 ตัวอย่างการนำไปใช้งานจริง
 
1. ช่วยเขียนเอกสาร
 
python  
result = await gemini.generate_text(
    prompt="เขียนคู่มือการใช้งานระบบ ZyntroAI แบบเข้าใจง่าย",
    system_prompt="คุณเป็นผู้เขียนเอกสารมืออาชีพ ใช้ภาษาไทยที่ชัดเจน กระชับ",
    temperature=0.3
)
print(result["text"])
 
 
2. วิเคราะห์ข้อมูลผู้ใช้จากภาพ
 
python  
result = await gemini.analyze_image(
    "user_upload.jpg",
    prompt="อ่านข้อมูลจากภาพนี้และแปลงเป็น JSON"
)
 
 
 
 
📌 ลิงก์อ้างอิง
 
- 🔗 Google AI Studio — รับคีย์ API
- 🔗 เอกสารทางการ — Gemini API
- 🔗 คู่มือโมเดล & เวอร์ชัน
- 🔗 ราคา & ขีดจำกัด
 
 
 
สร้างสำหรับ ZyntroAI/new-crystalcastle — อัปเดต: 2026-10-04
 
plaintext  

---

## ✅ สร้างไฟล์และส่งขึ้น
```bash
# สร้างโฟลเดอร์
mkdir -p .docs
# วางเนื้อหาข้างต้นเป็น .docs/Gemini_REST_API.md

# Commit
git add .docs/Gemini_REST_API.md
git commit -s -m "docs: add Gemini REST API guide 🤖

- ✅ API key setup & security
- ✅ Python client — text + image analysis
- ✅ FastAPI endpoints integration
- ✅ Error handling & model comparison
- ✅ Best practices & references
"

git push -u origin feature/add-gemini-docs
 
 
ต้องการเพิ่ม การรับสนทนาต่อเนื่อง (Chat Session), การสตรีมคำตอบแบบเรียลไทม์, หรือ ตัวอย่างการใช้งานร่วมกับ Frontend ไหมครับ? 🤖✨