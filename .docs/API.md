title: API
aliases:
 
- "API Reference"
- "FastAPI Integration"
slug: api
icon: 🌐
color: blue
type: guide
status: active
priority: high
tags:
- type/guide
- topic/api
- topic/fastapi
- topic/obsidian
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[Home-MOC]]"
parent:
- "[[Obsidian & FastAPI]]"
children: []
related:
- "[[Obsidian & FastAPI]]"
- "[[Settings Tab + API Fetch]]"
 
 
 
🌐 API — FastAPI Backend Integration
 
หน้าเอกสารกลาง — รวมข้อมูล API Endpoints, การตรวจสอบสิทธิ์ และการเรียกใช้งานจาก Obsidian ✅
 
 
 
📌 ภาพรวม
 
plaintext
  
Obsidian Plugin ↔ FastAPI Backend
       [HTTPS / JSON]
       ↗️        ↖️
  Token Auth    Validate & Respond
 
 
ส่วน รับผิดชอบ 
FastAPI Backend ประมวลผลคำขอ, ตรวจสอบสิทธิ์, ส่งคืนข้อมูล 
Obsidian Plugin รับอินพุตจากผู้ใช้, เรียก API, แสดง/บันทึกผลลัพธ์ 
 
 
 
🔐 การตรวจสอบสิทธิ์
 
✅ ส่ง Header ทุกครั้ง
 
http
  
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
 
 
✅ รูปแบบการตอบกลับมาตรฐาน
 
json
  
{
  "success": true,
  "data": { /* ผลลัพธ์ */ },
  "message": "ดำเนินการสำเร็จ"
}
 
 
✅ รูปแบบข้อผิดพลาด
 
json
  
{
  "success": false,
  "error": "ข้อความอธิบายข้อผิดพลาด",
  "code": "VALIDATION_ERROR"
}
 
 
 
 
📋 Endpoints Reference
 
# Method Endpoint คำอธิบาย สิทธิ์ 
1  GET   /api/health  ตรวจสอบสถานะระบบ สาธารณะ 
2  GET   /api/data  ดึงข้อมูลทั้งหมด ต้องมี Token 
3  POST   /api/data  สร้าง/อัปเดตข้อมูล ต้องมี Token 
4  GET   /api/data/{id}  ดึงข้อมูลรายการเดียว ต้องมี Token 
5  DELETE   /api/data/{id}  ลบข้อมูล ต้องมี Token 
6  GET   /api/user/profile  ข้อมูลผู้ใช้ปัจจุบัน ต้องมี Token 
 
 
 
💻 ตัวอย่างการเรียกใช้จาก Obsidian
 
typescript
  
async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const baseUrl = "https://your-api-domain.com";
  const apiKey = this.settings.apiKey;

  const res = await request({
    url: `${baseUrl}${endpoint}`,
    method: options.method || "GET",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return JSON.parse(res);
}

// ใช้งาน
const result = await fetchFromAPI("/api/data");
 
 
 
 
🚀 ตัวอย่าง FastAPI Backend (ด้าน Server)
 
python
  
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

app = FastAPI(title="Obsidian API", version="1.0.0")
security = HTTPBearer()

API_KEYS = {"your-api-key-here"}

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials.credentials not in API_KEYS:
        raise HTTPException(403, "Invalid API Key")
    return credentials.credentials

# Health Check
@app.get("/api/health")
def health_check():
    return {"success": True, "message": "API is running"}

# ดึงข้อมูล
@app.get("/api/data")
def get_data(token: str = Depends(verify_token)):
    return {
        "success": True,
        "data": [
            {"id": 1, "title": "ตัวอย่างบันทึก", "content": "เนื้อหาที่ซิงค์จาก API"}
        ]
    }
 
 
 
 
⚠️ รหัสสถานะที่ควรทราบ
 
รหัส ความหมาย การดำเนินการ 
 200  ✅ สำเร็จ อ่านผลลัพธ์ได้เลย 
 400  ⚠️ ข้อมูลไม่ถูกต้อง ตรวจสอบรูปแบบคำขอ 
 401  🔒 ไม่มีสิทธิ์ / Token หมดอายุ ตรวจสอบ API Key 
 403  🚫 ห้ามเข้าใช้ API Key ไม่ถูกต้อง 
 404  ❌ ไม่พบ Endpoint ตรวจสอบ URL 
 500  💥 ข้อผิดพลาดที่ Server ลองใหม่ หรือติดต่อผู้ดูแลระบบ 
 
 
 
🔗 การเชื่อมโยง
 
- [[Obsidian & FastAPI]] — ภาพรวมระบบทั้งหมด
- [[Settings Tab + API Fetch]] — ตั้งค่าและโค้ดปลั๊กอิน
- [[Home-MOC]] — กลับสู่หน้าหลัก
 
 
 
✅ สรุปสั้นๆ: หน้านี้เป็นศูนย์รวมเอกสาร API — ทุกครั้งที่เพิ่ม/แก้ไข Endpoint อย่าลืมอัปเดตที่นี่ เพื่อให้ทีมเห็นภาพตรงกันครับ 😊