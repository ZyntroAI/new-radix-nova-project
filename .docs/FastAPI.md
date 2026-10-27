title: "FastAPI"
aliases:
 
- "FastAPI — Modern Python Web Framework"
- "สร้าง API ด้วย Python"
slug: fastapi
icon: ⚡
color: green
type: guide
status: active
priority: high
tags:
- type/guide
- topic/backend
- topic/api
- topic/python
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — Backend Development]]"
parent:
- "[[API Design]]"
children: []
related:
- "[[API Design]]"
- "[[Vercel — Frontend Deployment]]"
- "[[Docker]]"
 
 
 
⚡ FastAPI — คู่มือฉบับสมบูรณ์
 
🎯 คืออะไร?
 
FastAPI = Web Framework สมัยใหม่ของ Python ออกแบบมาเพื่อสร้าง API โดยเฉพาะ — รวดเร็ว เสถียร พร้อมใช้งานจริง  
 
- สร้างโดย: Sebastián Ramírez (ธันวาคม 2018)
- ภายในใช้: Starlette (web server) + Pydantic (data validation)
- มาตรฐาน: OpenAPI + JSON Schema อัตโนมัติ  
 
 
 
✅ คุณสมบัติหลัก
 
ข้อดี คำอธิบาย 
🚀 เร็วมาก ประสิทธิภาพเทียบเท่า Node.js และ Go — ASGI + Async [__LINK_ICON] 
⚡ เขียนเร็ว พัฒนาได้เร็วขึ้น 200–300% [__LINK_ICON] 
✅ ตรวจสอบข้อมูลอัตโนมัติ ใช้ Type Hint Python — ตรวจสอบให้เอง ลดข้อผิดพลาด ~40% [__LINK_ICON] 
📖 เอกสารอัตโนมัติ Swagger UI + Redoc พร้อมใช้ทันที ไม่ต้องเขียนเอง [__LINK_ICON] 
🔧 ใช้งานง่าย เรียนรู้ไว, รองรับ Editor Autocomplete [__LINK_ICON] 
🔄 Async รองรับในตัว เขียน  async def  ได้เลย รองรับ Concurrent request 
 
 
 
🚀 เริ่มต้นใช้งาน
 
1️⃣ ติดตั้ง
 
bash
  
pip install fastapi uvicorn
 
 
2️⃣ เขียนโปรแกรม —  main.py 
 
python
  
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(title="My API", version="1.0")

# 📌 โมเดลข้อมูล
class Item(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None

# 📌 Endpoint พื้นฐาน
@app.get("/")
def read_root():
    return {"message": "Hello FastAPI!"}

# 📌 Path Parameter
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

# 📌 POST — รับ Request Body
@app.post("/items/", status_code=201)
def create_item(item: Item):
    return {"item_name": item.name, "price": item.price}
 
 
3️⃣ รันเซิร์ฟเวอร์
 
bash
  
uvicorn main:app --reload
# หรือระบุโฮสต์และพอร์ต
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
 
 
4️⃣ เข้าใช้งาน
 
- API: http://127.0.0.1:8000
- 📖 Swagger UI: http://127.0.0.1:8000/docs  
- 📖 Redoc: http://127.0.0.1:8000/redoc  
 
 
 
📡 HTTP Methods & CRUD
 
Method Path การทำงาน คืนค่า 
GET  /items  อ่านรายการทั้งหมด  List[Item]  
POST  /items  สร้างรายการใหม่  Item  + 201 
GET  /items/{id}  อ่านรายการเดียว  Item  หรือ 404 
PUT  /items/{id}  แก้ไขทั้งหมด  Item  
PATCH  /items/{id}  แก้ไขบางส่วน  Item  
DELETE  /items/{id}  ลบรายการ 204 No Content 
 
ตัวอย่าง:
 
python
  
from fastapi import FastAPI, HTTPException

app = FastAPI()

# ข้อมูลชั่วคราว
db = []

@app.get("/items", response_model=List[Item])
def list_items():
    return db

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id < 1 or item_id > len(db):
        raise HTTPException(status_code=404, detail="Item not found")
    return db[item_id - 1]

@app.post("/items", response_model=Item, status_code=201)
def add_item(item: Item):
    db.append(item)
    return item
 
 
 
 
🔐 Query, Path & Request Body
 
python
  
from fastapi import FastAPI, Query, Path
from typing import Annotated

app = FastAPI()

# ✅ Path Parameter — ในส่วนของ URL
@app.get("/users/{user_id}")
def get_user(
    user_id: Annotated[int, Path(gt=0, description="ID ผู้ใช้")]
):
    return {"user_id": user_id}

# ✅ Query Parameter — หลัง ? ใน URL
@app.get("/products")
def list_products(
    search: Annotated[Optional[str], Query(max_length=50)] = None,
    page: int = 1,
    limit: Annotated[int, Query(ge=1, le=100)] = 10
):
    return {"search": search, "page": page, "limit": limit}

# ✅ Request Body — ส่งเป็น JSON
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

@app.post("/users")
def create_user(user: UserCreate):
    return {"username": user.username, "email": user.email}
 
 
 
 
📦 Pydantic — Data Validation
 
Pydantic = หัวใจสำคัญของ FastAPI  — ประกาศชนิดข้อมูล → ตรวจสอบอัตโนมัติ
 
python
  
from pydantic import BaseModel, Field, EmailStr, field_validator

class User(BaseModel):
    id: int
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr  # ✅ ตรวจสอบรูปแบบอีเมลอัตโนมัติ
    age: Optional[int] = Field(None, ge=0, le=150)

    @field_validator('username')
    def username_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('ต้องเป็นตัวอักษรและตัวเลขเท่านั้น')
        return v

# ใช้งาน
user = User(id=1, username="somchai", email="somchai@example.com")
print(user.model_dump())  # แปลงเป็น dict
 
 
⚠️ ส่งข้อมูลผิด → ได้  422 Unprocessable Entity  พร้อมข้อความบอกว่าผิดตรงไหน  
 
 
 
🔄 Async vs Sync
 
python
  
import time
import asyncio

# ✅ ปกติ — รอทำเสร็จก่อน
@app.get("/sync")
def sync_endpoint():
    time.sleep(1)  # บล็อกทุกคน
    return {"message": "Synchronous"}

# ✅ Async — ทำอย่างอื่นได้ระหว่างรอ
@app.get("/async")
async def async_endpoint():
    await asyncio.sleep(1)  # ไม่บล็อก
    return {"message": "Asynchronous"}
 
 
💡 ใช้  async def  เมื่อเรียกฐานข้อมูล/API ภายนอก — จะรองรับผู้ใช้ได้มากขึ้นโดยไม่บล็อก
 
 
 
🐛 Error Handling
 
python
  
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

# ✅ Error แบบมาตรฐาน
@app.get("/divide/{a}/{b}")
def divide(a: int, b: int):
    if b == 0:
        raise HTTPException(
            status_code=400,
            detail="ตัวหารต้องไม่เป็นศูนย์",
            headers={"X-Error": "Division by zero"}
        )
    return {"result": a / b}
 
 
📋 Status Codes ที่ใช้บ่อย
 
รหัส ความหมาย เมื่อใช้ 
200 OK สำเร็จทั่วไป 
201 Created สร้างข้อมูลสำเร็จ 
400 Bad Request ข้อมูลจากผู้ใช้ผิดพลาด 
401 Unauthorized ยังไม่ล็อกอิน 
403 Forbidden ไม่มีสิทธิ์ 
404 Not Found ไม่พบทรัพยากร 
422 Unprocessable Entity ตรวจสอบข้อมูลไม่ผ่าน (Pydantic) 
500 Internal Server Error ข้อผิดพลาดที่เซิร์ฟเวอร์ 
 
 
 
🔐 Dependencies — ฉีดความสามารถที่ใช้ร่วมกัน
 
python
  
from fastapi import FastAPI, Depends, Header

app = FastAPI()

# ตรวจสอบ Token
async def get_token(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(401, "ต้องการ Token")
    return authorization.replace("Bearer ", "")

# ใช้งาน
@app.get("/protected")
def protected_route(token: str = Depends(get_token)):
    return {"token": token}
 
 
 
 
🐳 Deploy ด้วย Docker
 
สร้างไฟล์  Dockerfile :
 
dockerfile
  
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
 
 
 requirements.txt :
 
plaintext
  
fastapi>=0.100.0
uvicorn>=0.23.2
 
 
รัน:
 
bash
  
docker build -t my-fastapi .
docker run -p 8000:8000 my-fastapi
 
 
 
 
✅ Checklist ก่อนขึ้น Production
 
เพิ่ม Authentication/Authorization ✅
ตั้งค่า CORS Middleware ✅
ใช้ Environment Variables ไม่ Hardcode ✅
เขียน Error Handling ที่ครอบคลุม ✅
เพิ่ม Logging ✅
ทดสอบที่  /docs  ว่าทุก Endpoint ทำงานถูกต้อง ✅
เลือก ASGI Server: Uvicorn หรือ Hypercorn ✅
 
CORS Middleware ตัวอย่าง
 
python
  
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.com"],  # หรือ ["*"] สำหรับพัฒนา
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
 
 
 
🔗 Related Notes
 
- [[API Design]] — หลักการออกแบบ API ที่ดี
- [[Vercel — Frontend Deployment]] — เชื่อมต่อ Frontend กับ FastAPI Backend
- [[Docker]] — คอนเทนเนอร์สำหรับ Deploy FastAPI
- [[Incident Response]] — การจัดการเมื่อ API มีปัญหา
 
 
 
✅ FastAPI = ตัวเลือกที่ดีที่สุดสำหรับสร้าง API ด้วย Python — เรียนง่าย เขียนไว พร้อมใช้งานจริงทันที 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Authentication (JWT/OAuth2), การเชื่อมต่อฐานข้อมูล (SQLAlchemy/Prima), Background Tasks, หรือ Deploy FastAPI บน Vercel/Railway 😊