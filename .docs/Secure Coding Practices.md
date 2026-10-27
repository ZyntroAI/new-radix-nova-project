title: "Secure Coding Practices — แนวทางเขียนโค้ดอย่างปลอดภัย"
aliases:
 
- "เขียนโค้ดให้ปลอดภัย"
- "Secure Development Guidelines"
slug: secure-coding-practices
icon: 🛡️
color: blue
type: guide
status: active
priority: critical
tags:
- type/guide
- topic/security
- topic/development
- topic/devops
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent:
- "[[Security Fundamentals]]"
children: []
related:
- "[[Security Fundamentals]]"
- "[[Authentication]]"
- "[[FastAPI]]"
- "[[Incident Response]]"
 
 
 
🛡️ Secure Coding Practices — แนวทางเขียนโค้ดอย่างปลอดภัย
 
"ความปลอดภัยต้องสร้างตั้งแต่ต้น ไม่ใช่เสริมทีหลัง" — Shift Left Security ✅
 
 
 
📌 หลักการพื้นฐาน
 
หลักการ ความหมาย 
Trust No One ข้อมูลจากภายนอกทั้งหมดเป็นภัยคุกคาม — ไม่เชื่อเลย จนกว่าจะตรวจสอบ 
Defense in Depth มีการตรวจสอบหลายชั้น — ถ้าชั้นนอกหลุด ชั้นในยังป้องกันได้ 
Secure by Default ค่าเริ่มต้นต้องปลอดภัย — ไม่ต้องไปเปิด/ตั้งค่าเอง 
Least Privilege โค้ดและผู้ใช้มีสิทธิ์น้อยที่สุดเท่าที่จำเป็น 
Keep It Simple ซับซ้อน = จุดอ่อน — เขียนให้เข้าใจง่ายที่สุด 
Don't Roll Your Own Crypto อย่าประดิษฐ์อัลกอริทึมความปลอดภัยเอง ใช้มาตรฐานสากล 
 
 
 
🚪 Input Validation — ไม่เชื่อข้อมูลใครก็ตามที่ส่งมา
 
❌ "Garbage In, Garbage Out" → ✅ "Garbage In, Rejected Immediately"
 
✅ กฎสำคัญ
 
- ตรวจสอบ ทุกอย่าง ที่มาจาก: Form, Query String, JSON Body, Header, Cookie, URL Parameter, File Upload
- ตรวจสอบที่ ฝั่งเซิร์ฟเวอร์เสมอ — ฝั่งผู้ใช้เป็นแค่ความสะดวก แฮ็กเกอร์ข้ามได้
- ใช้ Allow List ✅ ไม่ใช่ Block List ❌ — บอกว่าอะไรผ่านได้ ดีกว่าบอกว่าอะไรห้าม
 
📝 ตัวอย่าง
 
python
  
# ❌ ผิด — เชื่อข้อมูลที่ส่งมา
username = request.query.get("username")  # อันตราย!

# ✅ ถูก — ตรวจสอบทุกอย่าง
from pydantic import BaseModel, Field, EmailStr, field_validator

class UserInput(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, pattern=r'^[a-zA-Z0-9_]+$')
    email: EmailStr
    age: int = Field(..., ge=0, le=120)

    @field_validator('username')
    def no_special_chars(cls, v):
        if not v.isalnum() and '_' not in v:
            raise ValueError('ชื่อผู้ใช้ต้องมีแค่ตัวอักษร ตัวเลข และ _')
        return v
 
 
 
 
💉 Injection Prevention — ป้องกันการแทรกคำสั่ง
 
🔹 SQL Injection — ใช้ Parameterized Queries / ORM เสมอ
 
python
  
# ❌ ผิด — อันตรายมาก!
query = f"SELECT * FROM users WHERE email = '{user_input}'"  # 💥 SQL Injection!

# ✅ ถูก — Parameterized Query
cursor.execute("SELECT * FROM users WHERE email = %s", [user_input])

# ✅ ดีที่สุด — ใช้ ORM เช่น SQLAlchemy
user = db.query(User).filter(User.email == user_input).first()
 
 
🔹 NoSQL Injection
 
python
  
# ❌ ผิด
db.users.find({"username": request.username})  # อาจโดนแทรก operator

# ✅ ถูก — ตรวจสอบชนิดและค่าก่อนใช้
if not isinstance(request.username, str):
    raise ValueError("Invalid username")
db.users.find({"username": request.username})
 
 
🔹 Command Injection — ห้ามเรียก Shell ด้วย Input จากผู้ใช้
 
python
  
# ❌ ผิด — อันตรายร้ายแรง!
os.system(f"ping {user_input}")  # user_input = "8.8.8.8; rm -rf /" 💥

# ✅ ถูก — ใช้ Library เฉพาะทาง และ/หรือ ตรวจสอบเข้มงวด
import socket
socket.gethostbyname(user_input)  # ปลอดภัยกว่า
 
 
 
 
🖥️ Output Encoding — ป้องกัน XSS
 
ก่อนส่งข้อมูลกลับไปที่เบราว์เซอร์ ให้แปลงอักขระพิเศษเสมอ
 
python
  
# ❌ ผิด — ส่งตรงอาจมี XSS
return f"<h1>{user_input}</h1>"  # user_input = "<script>alert('hack')</script>" 💥

# ✅ ถูก — Escape อักขระพิเศษ
import html
safe_output = html.escape(user_input)
return f"<h1>{safe_output}</h1>"

# ✅ ดีที่สุด — ใช้ Template Engine ที่มี Auto-escape เช่น Jinja2
 
 
💡 สำหรับ JSON API:  Content-Type: application/json  เบราว์เซอร์จะไม่รันสคริปต์ — แต่ Frontend ต้องระวังเองด้วย ✅
 
 
 
🔒 Authentication & Password Security
 
✅ รหัสผ่าน
 
- ❌ ห้ามเก็บเป็นข้อความธรรมดาเด็ดขาด!
- ✅ ใช้ bcrypt, Argon2 หรือ PBKDF2 — ไม่ใช่ MD5, SHA1
- ✅ ตรวจสอบความยาว ≥ 8 ตัวอักษร (แนะนำ ≥12)
- ✅ ไม่ต้องกำหนดรูปแบบที่ซับซ้อนเกินไป — ยาวดีกว่าประหลาด
- ✅ เปลี่ยนรหัสผ่านเมื่อตรวจพบการรั่วไหล
 
python
  
# ✅ ใช้ passlib
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

hash = pwd_context.hash(user_password)  # เก็บ hash นี้เท่านั้น ✅
pwd_context.verify(plain_password, hash)  # ตรวจสอบ ✅
 
 
✅ Session & Token
 
- Session ID / JWT ห้ามอยู่ใน URL — ปรากฏใน Log, Referer ❌
- ตั้งเวลาหมดอายุให้สั้นที่สุดเท่าที่ทำได้
- Cookie ใช้ Flag ที่จำเป็น:
plaintext
  
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600
 
 
-  HttpOnly  — ป้องกัน XSS ไม่ให JS อ่านได้ ✅
-  Secure  — ส่งเฉพาะ HTTPS เท่านั้น ✅
-  SameSite  — ป้องกัน CSRF ✅
 
 
 
📂 File Uploads — จุดอ่อนยอดฮิต
 
แฮ็กเกอร์ชอบใช้ไฟล์แนบเพื่ออัปโหลดมัลแวร์หรือเขียนโค้ดลงเซิร์ฟเวอร์
 
✅ กฎความปลอดภัย
 
- จำกัดประเภทไฟล์ที่ยอมรับ — ตรวจสอบ MIME Type + ส่วนเนื้อในไฟล์ ไม่เชื่อแค่นามสกุล
- จำกัดขนาดไฟล์สูงสุด
- เปลี่ยนชื่อไฟล์ทุกครั้งที่บันทึก — ไม่ใช่ชื่อเดิมจากผู้ใช้
- เก็บไฟล์ไว้นอก Document Root — ไม่สามารถเข้าถึงผ่าน URL โดยตรง
- ไม่รันไฟล์ที่อัปโหลด — สิทธิ์อ่านอย่างเดียว
 
python
  
# ✅ ตัวอย่างตรวจสอบประเภทไฟล์
import imghdr

ALLOWED_MIME = {"image/jpeg", "image/png"}
MAX_SIZE = 5 * 1024 * 1024  # 5MB

# ตรวจสอบขนาด
if len(file_content) > MAX_SIZE:
    raise ValueError("ไฟล์ใหญ่เกินไป")

# ตรวจสอบเนื้อในไฟล์จริง
if imghdr.what(None, h=file_content) not in ["jpeg", "png"]:
    raise ValueError("ไม่ใช่ไฟล์รูปภาพ")

# เปลี่ยนชื่อและบันทึก
import uuid
safe_filename = f"{uuid.uuid4().hex}.jpg"
 
 
 
 
🔑 Secrets Management — ไม่เคย Hardcode
 
python
  
# ❌ ผิด — Commit เข้า GitHub = รั่วทันที!
API_KEY = "sk-abc123secret..."
DB_PASS = "admin123"

# ✅ ถูก — อ่านจาก Environment Variable
import os
API_KEY = os.getenv("API_KEY")
DB_PASS = os.getenv("DB_PASSWORD")

# ✅ ดีที่สุด — ใช้ .env + .gitignore
# ติดตั้ง: pip install python-dotenv
from dotenv import load_dotenv
load_dotenv()  # อ่านจากไฟล์ .env — ไฟล์นี้ต้องอยู่ใน .gitignore!
 
 
⚠️ ตรวจสอบก่อน Commit เสมอ — ใช้เครื่องมือช่วย:
 
- git-secrets — สแกนก่อน Commit
- gitleaks — ตรวจสอบประวัติ Git ทั้งหมด
- .gitignore — บอกไฟล์ที่ไม่ต้องการ Commit
 
 
 
🌐 API & Endpoint Security
 
✅ CORS — จำกัดโดเมนที่เข้ามาเรียก
 
python
  
# ❌ ผิด — อนุญาตทุกคนใน Production
allow_origins=["*"]

# ✅ ถูก — ระบุเฉพาะโดเมนที่เชื่อถือได้
allow_origins=[
    "https://your-frontend.com",
    "https://staging.your-frontend.com"
]
 
 
✅ Rate Limiting — ป้องกัน Brute Force & Abuse
 
python
  
# FastAPI example
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/login")
@limiter.limit("5/minute")  # 5 ครั้งต่อนาที ต่อ IP
def login(...):
    pass
 
 
✅ Security Headers — เพิ่มเกราะให้เบราว์เซอร์
 
python
  
# FastAPI Middleware ตัวอย่าง
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response
 
 
Header ป้องกันอะไร 
 X-Content-Type-Options: nosniff  ป้องกัน MIME Type Sniffing 
 X-Frame-Options: DENY  ป้องกัน Clickjacking 
 Content-Security-Policy  จำกัดแหล่งที่มาของสคริปต์/รูป/อื่นๆ → ป้องกัน XSS 
 Strict-Transport-Security  บังคับใช้ HTTPS เสหมด 
 
 
 
🐛 Error Handling — ไม่เปิดเผยข้อมูลภายใน
 
python
  
# ❌ ผิด — เปิดเผยรายละเอียดสำคัญ
try:
    db.query("SELECT ...")
except Exception as e:
    return {"error": str(e)}  # 💥 เผย SQL, Path, Stack Trace

# ✅ ถูก — ส่งเฉพาะข้อความทั่วไป
import logging
logger = logging.getLogger(__name__)

try:
    db.query("SELECT ...")
except DatabaseError as e:
    logger.error(f"Database error: {str(e)}")  # บันทึก Log ที่เซิร์ฟเวอร์
    return {"error": "เกิดข้อผิดพลาดในระบบ"}, 500  # ส่งข้อความทั่วไปกลับไป
 
 
💡 Stack Trace, Path, เวอร์ชัน Framework, SQL Queries — ทั้งหมดนี้เป็นข้อมูลที่แฮ็กเกอร์ต้องการ ✅ บันทึกใน Log แต่ ห้ามส่งกลับไปที่ผู้ใช้ ❌
 
 
 
📦 Dependencies — ปลอดภัยตั้งแต่แหล่งที่มา
 
- ใช้ไฟล์ Lock File:  package-lock.json ,  poetry.lock ,  requirements.txt 
- ตรวจสอบช่องโหว่ใน Dependencies:
bash
  
# Python
pip-audit

# Node.js
npm audit

# GitHub — เปิด Dependabot อัตโนมัติ
 
- อัปเดตเป็นประจำ — ช่องโหว่เก่าๆ คือจุดเข้าที่ง่ายที่สุด
- ❌ ไม่ติดตั้งจากแหล่งที่ไม่น่าเชื่อถือ — ตรวจสอบชื่อ Package ก่อนติดตั้ง (ระวัง Typosquatting!)
 
 
 
🔄 Code Review & Testing — 4 ตาของความปลอดภัย
 
✅ Checklists ก่อนส่งโค้ด
 
ตรวจสอบ Input ทุกที่หรือไม่? ✅
ข้อมูลลับอยู่ใน Environment Variable หรือไม่? ✅
Error Message ไม่เปิดเผยข้อมูลสำคัญหรือไม่? ✅
SQL/Command Query ใช้ Parameterized หรือไม่? ✅
Authentication/Authorization ถูกตรวจสอบทุก Endpoint หรือไม่? ✅
Secrets ไม่อยู่ใน Git หรือไม่? ✅
 
✅ ประเภทการทดสอบความปลอดภัย
 
- SAST — Static Analysis: สแกนโค้ดตอนเขียน → ESLint, Bandit, SonarQube
- DAST — Dynamic Analysis: ทดสอบระบบที่รันอยู่ → OWASP ZAP
- Dependency Scan: ตรวจสอบ Library ที่ใช้ → npm audit, pip-audit
- Penetration Test: จำลองการโจมตีโดยผู้เชี่ยวชาญ
 
 
 
📊 OWASP Secure Coding Guidelines — Quick Reference
 
ประเภท ทำ ✅ ห้าม ❌ 
Input ตรวจสอบความยาว, รูปแบบ, ประเภท เชื่อข้อมูลที่ส่งมาโดยไม่ตรวจสอบ 
SQL ใช้ Parameterized / ORM ต่อสตริงคำสั่ง SQL ด้วย Input 
รหัสผ่าน Hash ด้วย bcrypt/Argon2 เก็บเป็นข้อความธรรมดา หรือใช้ MD5/SHA1 
Secrets Environment Variables / Secret Manager Hardcode ในโค้ด / Commit เข้า Git 
Error Log ที่เซิร์ฟเวอร์ + ข้อความทั่วไปให้ผู้ใช้ ส่ง Stack Trace/Detail กลับไปหาผู้ใช้ 
Session HttpOnly + Secure + Short Expiry เก็บ Token ใน Local Storage สำหรับสิ่งสำคัญ 
ไฟล์แนบ ตรวจสอบเนื้อใน + เปลี่ยนชื่อ + จำกัดสิทธิ์ ใช้ชื่อเดิม + เก็บใน Public Folder + รันได้ 
 
 
 
🧠 Golden Rules — จำให้แม่น
 
1. Input ทุกชนิด = ภัยคุกคาม จงตรวจสอบเสมอ
2. ความลับต้องเป็นความลับ — ไม่แสดง ไม่บันทึก ไม่ส่งให้ใครเห็น
3. เขียนให้เรียบง่าย ซับซ้อนคือศัตรูของความปลอดภัย
4. รหัสความปลอดภัยที่ดีที่สุดคือรหัสที่คุณไม่ได้เขียนเอง — ใช้ Library มาตรฐาน
5. ทดสอบเหมือนแฮ็กเกอร์ — ก่อนที่แฮ็กเกอร์จะมาทดสอบคุณ
 
 
 
🔗 Related Notes
 
- [[Security Fundamentals]] — หลักการพื้นฐานความมั่นคง
- [[Authentication]] — การออกแบบระบบล็อกอินที่ปลอดภัย
- [[FastAPI]] — ตัวอย่างการตรวจสอบข้อมูลและ Error Handling
- [[Incident Response]] — จะทำอย่างไรเมื่อโค้ดมีช่องโหว่และถูกบุกรุก
 
 
 
✅ Secure Coding ไม่ใช่เรื่องยาก — เป็นเพียง นิสัย ที่ต้องฝึกทำทุกวัน: ตรวจสอบข้อมูล, ไม่เชื่อใคร, ปกป้องความลับ, และเรียนรู้จากความผิดพลาด 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น SAST/DAST Tools, Dependency Security, Code Review Checklist, หรือ Threat Modeling 😊