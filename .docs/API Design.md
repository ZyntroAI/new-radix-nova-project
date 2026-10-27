title: "[MOC] API Design"
aliases:
 
- "การออกแบบ API"
- "API Architecture & Best Practices"
slug: api-design
icon: 🔌
color: purple
type: moc
status: active
priority: essential
tags:
- type/moc
- topic/api
- topic/backend
- topic/architecture
created: 2026-10-27
updated: 2026-10-27
moc: []
parent:
- "[[MOC — Software Engineering]]"
children: []
related:
- "[[OBSIDIAN Plugin API]]"
- "[[System Design]]"
- "[[OCR]]"
- "[[Continuous Integration]]"
 
 
 
🔌 MOC — API Design
 
📋 Overview
 
แผนที่ความรู้ด้านการออกแบบ API — รวมหลักการ ประเภท สถาปัตยกรรม มาตรฐาน และแนวทางปฏิบัติที่ดี เพื่อสร้าง API ที่ใช้งานง่าย สอดคล้องกัน ทนทาน และปลอดภัย
 
 
 
🧱 Core Areas
 
📌 Fundamentals
 
API คืออะไร — บทบาทและความสำคัญในระบบ
ประเภทของ API — REST, GraphQL, gRPC, WebSocket, SOAP
หลักการออกแบบที่ดี — อ่านง่าย, สอดคล้องกัน, ยืดหยุ่น, เข้าใจง่าย
 
🌐 REST API Design
 
Resource Naming — ตั้งชื่อ URI ด้วยคำนาม, พหูพจน์, ล่างสุด
HTTP Methods — GET/POST/PUT/PATCH/DELETE ความหมายและการใช้งานที่ถูกต้อง
Status Codes — 2xx สำเร็จ, 3xx เปลี่ยนทาง, 4xx ผู้ใช้ผิด, 5xx เซิร์ฟเวอร์ผิด
Versioning —  /v1/resource , Header, Query Parameter
Pagination, Filtering, Sorting — Query Parameters มาตรฐาน
Response Format — โครงสร้าง JSON ที่สอดคล้องกัน, Error Response มาตรฐาน
 
📊 Other API Styles
 
GraphQL — Single endpoint, Query ตามต้องการ, Schema & Type
gRPC — Protocol Buffers, High performance, HTTP/2, Service Definition
WebSocket — การสื่อสารแบบสองทางแบบเรียลไทม์
Webhooks — Event-driven API, ส่งแจ้งเตือนเมื่อเกิดเหตุการณ์
 
🔐 Security & Authentication
 
Authentication — API Key, Basic Auth, OAuth 2.0, JWT, Bearer Token
Authorization — ระดับการเข้าถึง, Scope, Role-based Access
Data Protection — HTTPS เสมอ, Input Validation, Sanitization
Rate Limiting & Throttling — ป้องกันการใช้งานมากเกินไป
CORS — Cross-Origin Resource Sharing, Security Headers
 
📖 Documentation & Testing
 
OpenAPI / Swagger — เขียนเอกสารเป็นโค้ด, ทดสอบได้จริง
API Specification as Contract — สัญญาระหว่างทีม Frontend-Backend
Testing — Unit, Integration, Contract, Load, Security Testing
Postman / Insomnia / curl — เครื่องมือทดสอบ API
 
🚀 Implementation & Lifecycle
 
Design-First vs Code-First — เปรียบเทียบแนวทาง
Error Handling Strategy — รูปแบบข้อผิดพลาดมาตรฐาน
API Evolution — การเปลี่ยนแปลงโดยไม่ทำลายระบบเดิม, Deprecation Policy
Monitoring & Observability — Log, Metrics, Latency, Availability
CI/CD for APIs — [[Continuous Integration]] — ตรวจสอบ Schema, ทดสอบอัตโนมัติ
 
🛠️ Specialized APIs
 
OBSIDIAN Plugin API — [[OBSIDIAN Plugin API]] — ส่วนติดต่อสำหรับพัฒนาปลั๊กอินใน Obsidian
System Design & API — [[System Design]] — วางแผน API ให้สอดคล้องกับสถาปัตยกรรมระบบโดยรวม
OCR API — [[OCR]] — ตัวอย่าง API สำหรับแปลงภาพเป็นข้อความ
 
 
 
📊 Comparison: API Styles
 
ประเภท จุดแข็ง จุดอ่อน เหมาะสำหรับ 
REST เข้าใจง่าย, มาตรฐาน, ทุกภาษารองรับ Over-fetching, หลาย Request CRUD, เว็บทั่วไป, สาธารณะ 
GraphQL ดึงข้อมูลพอดี, Single Endpoint ซับซ้อน, Caching ยาก แอปมือถือ, ข้อมูลเชื่อมโยงซับซ้อน 
gRPC เร็วมาก, ประสิทธิภาพสูง Binary, อ่านยาก Microservice ภายในระบบ 
WebSocket สองทาง, Real-time จัดการยากกว่า แชท, แจ้งเตือน, เกมส์ 
 
 
 
✅ REST API Design Checklist
 
📍 Endpoint Naming
 
ใช้คำนาม พหูพจน์:  /users  ✅ — ไม่ใช้  /getUsers  ❌
ล่างสุด คั่นด้วยขีดกลาง:  /orders/{id}/order-items  ✅
ไม่ใช้คำกริยาใน path: ใช้ HTTP Method แทน ✅
 
🔄 HTTP Methods
 
Method การใช้งาน Idempotent 
GET ดึงข้อมูล ✅ ใช้ซ้ำได้ 
POST สร้างข้อมูลใหม่ ❌ ไม่เหมือนเดิม 
PUT แทนที่ทั้งหมด ✅ ใช้ซ้ำได้ 
PATCH อัปเดตบางส่วน ❌ ไม่แน่นอน 
DELETE ลบข้อมูล ✅ ใช้ซ้ำได้ 
 
📡 Response & Error Format
 
json
  
// ✅ สำเร็จ
{
  "success": true,
  "data": { /* ข้อมูล */ },
  "meta": { "page": 1, "total": 100 }
}

// ❌ ผิดพลาด
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "อีเมลไม่ถูกต้อง",
    "details": [{ "field": "email", "message": "รูปแบบไม่ถูกต้อง" }]
  }
}
 
 
📋 Status Codes ที่ใช้บ่อย
 
-  200 OK  — สำเร็จ (GET/PUT/PATCH)
-  201 Created  — สร้างสำเร็จ (POST)
-  204 No Content  — สำเร็จแต่ไม่มีข้อมูลคืน (DELETE)
-  400 Bad Request  — ข้อมูลจากผู้ใช้ผิดพลาด
-  401 Unauthorized  — ยังไม่ได้ระบุตัวตน
-  403 Forbidden  — ระบุตัวตนแล้วแต่ไม่มีสิทธิ์
-  404 Not Found  — ไม่พบทรัพยากร
-  422 Unprocessable Entity  — ข้อมูลถูกต้องแต่ไม่ผ่านตรรกะ
-  429 Too Many Requests  — เรียกใช้บ่อยเกินไป
-  500 Internal Server Error  — ข้อผิดพลาดทางเซิร์ฟเวอร์
 
 
 
🔗 Linked Mentions
 
- [[OBSIDIAN Plugin API]] — การออกแบบ API สำหรับปลั๊กอิน Obsidian
- [[System Design]] — การออกแบบ API ในมุมมองระบบรวม
- [[OCR]] — ตัวอย่าง API สำหรับประมวลผลภาพ
- [[Continuous Integration]] — การทดสอบและตรวจสอบ API อัตโนมัติ
 
 
 
💡 หลักการสำคัญที่สุด: API คือสัญญาระหว่างระบบ — เมื่อปล่อยออกไปแล้ว เปลี่ยนแปลงได้ยาก คิดให้รอบคอบตั้งแต่ต้น ✅
 
ต้องการสร้างโน้ตแยกสำหรับหัวข้อใดเป็นพิเศษไหมครับ เช่น RESTful API Checklist, GraphQL vs REST, Authentication Methods, หรือ OpenAPI Specification 😊