title: "Authentication — ยืนยันตัวตน & สิทธิ์"
aliases:
 
- "Auth for Developers"
- "JWT OAuth2 Session"
slug: authentication
icon: 🔐
color: orange
type: guide
status: active
priority: critical
tags:
- type/guide
- topic/security
- topic/api
- topic/fastapi
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — Backend Development]]"
parent:
- "[[FastAPI]]"
children: []
related:
- "[[FastAPI]]"
- "[[API Design]]"
- "[[Incident Response]]"
 
 
 
🔐 Authentication — ยืนยันตัวตน & การควบคุมสิทธิ์
 
Authentication (AuthN) = ใครคุณ? → ล็อกอิน, ตรวจสอบตัวตน
Authorization (AuthZ) = คุณทำอะไรได้บ้าง? → สิทธิ์การเข้าถึง
 
 
 
📌 แนวคิดพื้นฐาน
 
คำศัพท์ ความหมาย 
Identity ตัวตนของผู้ใช้ — อีเมล/ชื่อผู้ใช้/ID 
Credentials หลักฐานยืนยันตัวตน — รหัสผ่าน/Token/ใบรับรอง 
Token "บัตรผ่านประตู" — ข้อความที่เซิร์ฟเวอร์รับรองว่าถูกต้อง 
Claim ข้อมูลที่ระบุใน Token — เช่น  user_id ,  role  
Scope ขอบเขตสิทธิ์ — เช่น  read ,  write  
 
 
 
🎯 วิธียืนยันตัวตนที่นิยมใช้
 
1️⃣ Token-Based Authentication (JWT) — 🔥 นิยมที่สุด
 
เหมาะกับ: REST API, SPA, Mobile App
 
กระบวนการ:
 
plaintext
  
ผู้ใช้ → ส่งชื่อ+รหัส → เซิร์ฟเวอร์ตรวจสอบ → ส่ง JWT กลับ
ผู้ใช้ → ส่ง JWT ในทุก Request → เซิร์ฟเวอร์ตรวจสอบลายเซ็น → ตอบกลับ
 
 
โครงสร้าง JWT:
 
plaintext
  
Header.Payload.Signature
 
 
- Header: อัลกอริทึมและประเภท
- Payload: ข้อมูลผู้ใช้ (⚠️ Base64 — อ่านได้! ห้ามใส่ข้อมูลลับ)
- Signature: ลายเซ็นเข้ารหัส — ป้องกันการปลอมแปลง
 
2️⃣ Session Cookies — แบบดั้งเดิม
 
เหมาะกับ: เว็บไซต์แบบ Server-Rendered
 
- เซิร์ฟเวอร์เก็บ Session ID ในฐานข้อมูล/หน่วยความจำ
- ส่งกลับเป็น Cookie — เบราว์เซอร์ส่งกลับเองอัตโนมัติ
- ❌ ไม่สะดวกกับ SPA/Mobile
 
3️⃣ OAuth 2.0 — Delegated Access
 
เหมาะกับ: เข้าสู่ระบบด้วย Google/GitHub/Facebook
 
- ผู้ให้บริการภายนอกเป็นคนตรวจสอบ
- ได้ Permission แทนที่จะได้รหัสผ่าน
- Flow มาตรฐาน: Authorization Code Flow
 
4️⃣ API Key — ง่ายที่สุด
 
เหมาะกับ: ระบบภายใน, Service-to-Service, ไม่ใช่ผู้ใช้ทั่วไป
 
- ส่งค่าคงที่ใน Header เช่น  X-API-Key: abc123 
- ❌ ไม่ปลอดภัยเท่าวิธีอื่น — Key รั่ว = โดนแฮ็กทันที
 
 
 
⚡ JWT Authentication ใน FastAPI — ฉบับสมบูรณ์
 
✅ ติดตั้งแพ็กเกจ
 
bash
  
pip install python-jose[cryptography] passlib[bcrypt] python-multipart
 
 
🔑 ตัวอย่างโค้ด —  auth.py 
 
python
  
from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

# ⚠️ ค่าเหล่านี้ควรเก็บใน Environment Variables
SECRET_KEY = "your-secret-key-keep-it-safe-env-only"  # เปลี่ยนเลย!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# 🔐 Hash Password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 📥 รับ Token จาก Header: Authorization: Bearer xxx
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# 📋 โมเดลข้อมูล
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# ✅ ตรวจสอบรหัสผ่าน
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# ✅ แปลงรหัสผ่านเป็น Hash
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# ✅ สร้าง JWT Token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ✅ ตรวจสอบและดึงข้อมูลผู้ใช้จาก Token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="ไม่สามารถตรวจสอบสิทธิ์ได้",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    return token_data
 
 
🔌 เชื่อมต่อกับ Main App
 
python
  
from fastapi import FastAPI, Depends, HTTPException, status
from datetime import timedelta
from auth import (
    verify_password, create_access_token,
    get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES,
    Token
)

app = FastAPI(title="Auth Demo API")

# 🗄️ ข้อมูลจำลอง — ใช้จริงให้เปลี่ยนเป็นฐานข้อมูล
fake_users_db = {
    "somchai": {
        "username": "somchai",
        "full_name": "สมชาย มั่นคง",
        "email": "somchai@example.com",
        "hashed_password": "$2b$12$...",  # ใช้ get_password_hash("mypassword") สร้าง
        "disabled": False,
        "role": "user"
    }
}

# 🔐 ล็อกอิน — รับ Token
@app.post("/login", response_model=Token)
async def login_for_access_token(username: str, password: str):
    user = fake_users_db.get(username)
    if not user or not verify_password(password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": username, "role": user["role"]},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# 🔒 ใช้งาน — ต้องมี Token
@app.get("/users/me")
async def read_users_me(current_user = Depends(get_current_user)):
    return {"username": current_user.username}

# 🔒 เฉพาะผู้ดูแลระบบ
async def get_current_admin(current_user = Depends(get_current_user)):
    user = fake_users_db.get(current_user.username)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="ต้องเป็นผู้ดูแลระบบ")
    return user

@app.delete("/admin/users/{username}")
async def delete_user(username: str, admin = Depends(get_current_admin)):
    return {"message": f"ลบผู้ใช้ {username} สำเร็จโดย {admin['username']}"}
 
 
 
 
🔑 Access Token vs Refresh Token
 
 Access Token Refresh Token 
อายุ สั้น — 15–60 นาที ยาว — 7–30 วัน 
ใช้ทำอะไร ยืนยันตัวตนกับ API ขอ Access Token ใหม่โดยไม่ต้องล็อกอินซ้ำ 
ความเสี่ยงถ้ารั่ว จำกัดเวลา — หมดอายุเอง สูงมาก → ต้องเก็บอย่างปลอดภัย 
เก็บที่ไหน Memory / Http-Only Cookie Http-Only, Secure, SameSite Cookie 
 
💡 Flow ที่ปลอดภัย:
 
1. ส่งชื่อ+รหัส → ได้  access_token  (อายุสั้น) +  refresh_token  (ใน Cookie)
2. ใช้  access_token  กับทุก Request
3. เมื่อหมดอายุ → ส่ง  refresh_token  ไปขออันใหม่ — ไม่ต้องส่งรหัสผ่านอีก
4. ถ้า  refresh_token  รั่ว → สามารถ Revoke ที่เซิร์ฟเวอร์ได้
 
 
 
🛡️ Best Practices — อย่าลืม!
 
✅ การจัดการรหัสผ่าน
 
- ❌ ห้ามเก็บรหัสผ่านเป็นข้อความธรรมดาเด็ดขาด!
- ✅ ใช้ Strong Hashing: bcrypt, Argon2, PBKDF2
- ✅ เพิ่ม Salt อัตโนมัติ (Passlib ทำให้แล้ว)
- ✅ ตรวจสอบความยาวและความซับซ้อน: อย่างน้อย 8 ตัวอักษร
 
✅ ความปลอดภัยของ Token
 
- ❌ ห้ามใส่ข้อมูลลับใน JWT Payload — เป็นแค่ Base64 ใครก็อ่านได้
- ✅ ใช้ HTTPS เสมอ — ไม่งั้น Token จะถูกดักจับได้
- ✅ ตั้งเวลาหมดอายุให้สั้นที่สุดเท่าที่ทำได้
- ✅ เก็บ Secret Key ใน Environment Variables — ไม่ Commit เข้า Git
- ✅ ใช้ RS256 แทน HS256 เมื่อเป็นระบบหลายบริการ — ใช้คู่กุญแจ Public/Private
 
✅ CORS & Cookie Security
 
python
  
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.com"],  # ไม่ใช้ ["*"] ใน Production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type"],
    max_age=600,  # Cache Preflight Response
)
 
 
🔒 Cookie Security Flags:
 
-  HttpOnly=true  — ป้องกัน XSS ไม่ให้ JS อ่านได้
-  Secure=true  — ส่งเฉพาะ HTTPS เท่านั้น
-  SameSite=strict  — ป้องกัน CSRF ไม่ให้ส่งจากเว็บอื่น
-  Path=/api/auth  — จำกัดเส้นทาง
 
✅ ป้องกันการโจมตี
 
ภัยคุกคาม วิธีป้องกัน 
Brute Force Rate Limiting — จำนวนครั้งต่อ IP/ผู้ใช้ 
Credential Stuffing ตรวจสอบการล็อกอินผิดพลาดเกิน → ล็อกบัญชี/ต้องยืนยันเพิ่ม 
Token Leak หมดอายุสั้น + Revoke List สำหรับ Refresh Token 
XSS HttpOnly Cookie + Sanitize Input 
CSRF SameSite Cookie + Anti-CSRF Token 
 
 
 
📊 เลือกวิธีไหนดี?
 
สถานการณ์ แนะนำ 
REST API + เว็บ/มือถือ JWT (Access + Refresh Token) ✅ 
เว็บไซต์ Server-Rendered Session Cookies ✅ 
ให้คนอื่น/แอปภายนอกเข้าถึง API ของเรา OAuth 2.0 หรือ API Keys 
เราต้องการเข้าสู่ระบบด้วย Google/GitHub OAuth 2.0 + OpenID Connect 
Service-to-Service ภายในองค์กร API Key หรือ mTLS 
 
 
 
⚠️ ข้อผิดพลาดที่พบบ่อย
 
❌ ผิด ✅ ถูก 
เก็บรหัสผ่านเป็นข้อความธรรมดา Hash ด้วย bcrypt/Argon2 
JWT ไม่ตั้งเวลาหมดอายุ ตั้งเวลา — สั้นที่สุดที่เป็นไปได้ 
Secret Key Hardcode ในโค้ด ใช้ Environment Variables 
ใช้ JWT สำหรับ Session ยาวๆ ใช้ Refresh Token แยกต่างหาก 
อนุญาต CORS จากทุกที่  *  ระบุเฉพาะโดเมนที่เชื่อถือได้ 
ใส่ข้อมูลลับใน JWT Payload JWT = Public Claims เท่านั้น 
 
 
 
🔗 Related Notes
 
- [[FastAPI]] — Framework ที่ใช้สร้าง API
- [[API Design]] — การออกแบบ Endpoint ที่ปลอดภัย
- [[Incident Response]] — แผนรับมือเมื่อความปลอดภัยถูกบุกรุก
- [[Vercel — Frontend Deployment]] — ส่ง Token จาก Frontend ไป Backend อย่างถูกวิธี
 
 
 
✅ Authentication คือหัวใจของความปลอดภัย — ไม่ต้องเขียนเองตั้งแต่ต้น ใช้ Standard Library และแนวทางที่มีการพิสูจน์แล้วครับ 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น OAuth2 Social Login (Google/GitHub), Role-Based Access Control (RBAC), JWT Revocation, หรือ Security Headers 😊