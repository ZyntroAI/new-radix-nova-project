⚙️ SETUP.md — การตั้งค่า Environment & Configuration
 
โปรเจกต์: new-radix-nova-project
อัปเดตล่าสุด: 25 ตุลาคม 2026
 
 
 
📑 สารบัญ
 
- 1. หลักการทำงานของ Environment Variables ใน Next.js
- 2. ลำดับการโหลดไฟล์ Environment
- 3. สร้างไฟล์ .env.example และ .env.local
- 4. รายการตัวแปรทั้งหมดที่ต้องตั้งค่า
- 5. ความแตกต่าง: Server-side vs Client-side
- 6. การตั้งค่าสำหรับ Production / Vercel
- 7. การตรวจสอบและ Type-safe ด้วย TypeScript
- 8. ความปลอดภัยและแนวปฏิบัติที่ดี
- 9. ปัญหาที่พบบ่อย
 
 
 
1. หลักการทำงานของ Environment Variables ใน Next.js
 
Next.js รองรับไฟล์  .env  ภายในโปรเจกต์โดยอัตโนมัติ 
 
ประเภท กฎการตั้งชื่อ มองเห็นได้ที่ไหน 
Server-side ไม่มี prefix เฉพาะใน Node.js (API Routes, Server Components) เท่านั้น ❌ ไม่ส่งไปที่ Browser 
Client-side ขึ้นต้นด้วย  NEXT_PUBLIC_  สามารถเข้าถึงได้ที่ฝั่ง Browser ⚠️ ข้อมูลจะถูกฝังใน JS bundle 
 
⚠️ สำคัญ: ข้อมูลที่เป็นความลับ เช่น API keys, Database URL — ห้ามใส่ prefix  NEXT_PUBLIC_  
 
 
 
2. ลำดับการโหลดไฟล์ Environment
 
Next.js โหลดไฟล์ตามลำดับนี้ — ตัวที่โหลดก่อนจะมีความสำคัญสูงกว่า
 
plaintext  
.env.{environment}.local   ← สูงสุด (เช่น .env.development.local)
.env.local
.env.{environment}          ← เช่น .env.production
.env                        ← ต่ำสุด (ค่าเริ่มต้น)
 
 
 .env*.local  จะถูก ignore ใน Git เสมอ — เหมาะสำหรับความลับส่วนตัวเครื่องพัฒนา
 
 
 
3. สร้างไฟล์ .env.example และ .env.local
 
3.1 📄 สร้าง  .env.example  (สำหรับอ้างอิงใน Git)
 
ไฟล์นี้ สามารถ commit ขึ้น Git ได้ — แค่รายการชื่อตัวแปร ไม่ต้องใส่ค่าจริง
 
env  
# ==========================================
# 🔐 AI PROVIDER CONFIGURATION
# ==========================================

# OpenAI — สำหรับ /api/ai endpoint
OPENAI_API_KEY=sk-...

# Anthropic Claude — สำหรับ /api/chat endpoint
ANTHROPIC_API_KEY=sk-ant-...

# ==========================================
# 🌐 APPLICATION CONFIGURATION
# ==========================================

# สภาพแวดล้อม: development | production | test
NODE_ENV=development

# URL ของแอป — ใช้สำหรับ callback, links
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ==========================================
# 📤 OPTIONAL: FEATURE FLAGS
# ==========================================

# เปิด/ปิด AI features
NEXT_PUBLIC_ENABLE_AI_FEATURES=true

# Debug mode (แสดง log เพิ่ม)
DEBUG=false
 
 
3.2 🔐 สร้าง  .env.local  (ใช้งานจริง เครื่องเดียว)
 
คัดลอกจาก  .env.example  แล้วใส่ค่าจริง — อย่า commit นี้ขึ้น Git!
 
bash  
# ในโฟลเดอร์โปรเจกต์
cp .env.example .env.local
# หรือ Windows
copy .env.example .env.local
 
 
แก้ไขค่าภายใน:
 
env  
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
 
 
3.3 ตรวจสอบ  .gitignore 
 
ให้แน่ใจว่ามีรายการเหล่านี้ในไฟล์  .gitignore  แล้ว:
 
plaintext  
# Environment files
.env
.env.local
.env.*.local
 
 
 
 
4. รายการตัวแปรทั้งหมดที่ต้องตั้งค่า
 
ตัวแปร ประเภท จำเป็น ค่าเริ่มต้น คำอธิบาย 
 OPENAI_API_KEY  Server ❌ ถ้าใช้ OpenAI — รับจาก https://platform.openai.com/api-keys 
 ANTHROPIC_API_KEY  Server ❌ ถ้าใช้ Claude — รับจาก https://console.anthropic.com/keys 
 NODE_ENV  Server ✅  development  สภาพแวดล้อมอัตโนมัติจาก Next.js 
 NEXT_PUBLIC_APP_URL  Client ✅  http://localhost:3000  URL ฐานของแอป ใช้สร้างลิงก์, callback 
 NEXT_PUBLIC_ENABLE_AI_FEATURES  Client ❌  true  แสดง/ซ่อนส่วน UI ที่เกี่ยวกับ AI 
 DEBUG  Server ❌  false  เปิด log การทำงานเพื่อ debug 
 
 
 
5. ความแตกต่าง: Server-side vs Client-side
 
✅ อ่านค่าที่ฝั่ง Server (API Route / Server Component)
 
typescript  
// app/api/ai/route.ts
const openAiKey = process.env.OPENAI_API_KEY;

if (!openAiKey) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}
 
 
✅ อ่านค่าที่ฝั่ง Client (Component ที่รันใน Browser)
 
tsx  
// components/AppConfig.tsx
'use client';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export function AppConfig() {
  return <div>App URL: {appUrl}</div>;
}
 
 
❌ ห้ามทำแบบนี้:
 
tsx  
// ❌ ERROR: ตัวแปรไม่มี NEXT_PUBLIC_ prefix จะเป็น undefined ที่ฝั่ง Browser
const key = process.env.OPENAI_API_KEY;
 
 
 
 
6. การตั้งค่าสำหรับ Production / Vercel
 
เมื่อ Deploy ไป Vercel ไฟล์  .env.local  จะไม่ถูกส่งขึ้น ต้องตั้งค่าผ่าน Dashboard โดยตรง
 
ขั้นตอน
 
1. เข้า Vercel Dashboard → เลือกโปรเจกต์
2. ไปที่ Settings → Environment Variables
3. เพิ่มตัวแปรทีละรายการ:
- ใส่ชื่อตัวแปร (เช่น  OPENAI_API_KEY )
- ใส่ค่าจริง
- เลือก Environment ที่จะใช้: Production / Preview / Development
- กด Save
4. Redeploy เพื่อให้ค่ามีผล
 
💡 หรือใช้ Vercel CLI:
 
bash  
vercel env add OPENAI_API_KEY
# ตามขั้นตอน แล้วเลือก environment ที่จะใช้
 
 
 
 
7. การตรวจสอบและ Type-safe ด้วย TypeScript
 
สร้างไฟล์  lib/env.ts  เพื่อตรวจสอบความถูกต้องและมี Type Safety
 
typescript  
// lib/env.ts
const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
};

const optional = (key: string, fallback: string = ""): string => {
  return process.env[key] ?? fallback;
};

export const env = {
  // 🔐 Server-side — Secret keys
  OPENAI_API_KEY: optional("OPENAI_API_KEY", ""),
  ANTHROPIC_API_KEY: optional("ANTHROPIC_API_KEY", ""),
  
  // 🌐 Client-side — Public config
  NEXT_PUBLIC_APP_URL: required("NEXT_PUBLIC_APP_URL"),
  NEXT_PUBLIC_ENABLE_AI_FEATURES: optional("NEXT_PUBLIC_ENABLE_AI_FEATURES", "true") === "true",
  
  // ⚙️ System
  NODE_ENV: process.env.NODE_ENV || "development",
  DEBUG: optional("DEBUG", "false") === "true",
} as const;
 
 
ใช้งาน:
 
typescript  
// แทนที่จะอ่านจาก process.env โดยตรง
import { env } from '@/lib/env';

console.log(env.NEXT_PUBLIC_APP_URL);
const key = env.OPENAI_API_KEY;
 
 
✅ ประโยชน์:
 
- ตรวจสอบตอนเริ่มรัน — รู้ทันทีว่าตั้งค่าครบไหม
- มี Type Autocomplete — พิมพ์ผิดจะแจ้งเตือน
- จุดเดียวในการเปลี่ยนแปลงค่าเริ่มต้น
 
 
 
8. ความปลอดภัยและแนวปฏิบัติที่ดี
 
✅ DO
 
เก็บ secret keys ไว้ในตัวแปร Server-side เท่านั้น (ไม่มี  NEXT_PUBLIC_  prefix)
มีไฟล์  .env.example  สำหรับนักพัฒนาอื่นๆ
เพิ่ม  .env*  ใน  .gitignore 
หมุนเปลี่ยน API keys เป็นประจำ
ใช้แยก API key สำหรับ Development และ Production
 
❌ DON'T
 
❌ อย่า commit ไฟล์  .env  หรือ  .env.local  ขึ้น Git
❌ อย่าใส่ secret ในโค้ดโดยตรง
❌ อย่าใช้  NEXT_PUBLIC_  กับข้อมูลที่เป็นความลับ
❌ อย่าแชร์ API key ใน log หรือ error message
 
 
 
9. ปัญหาที่พบบ่อย
 
❌ ปัญหา: ตัวแปรเป็น  undefined 
 
สาเหตุ & วิธีแก้:
 
- ✅ รัน  pnpm dev  ใหม่ทุกครั้งที่แก้ไขไฟล์  .env  — Next.js อ่านครั้งเดียวตอนเริ่ม
- ✅ ตรวจสอบชื่อตัวแปรตรงกันพอดี (ตัวใหญ่-เล็กสำคัญ)
- ✅ ถ้าใช้ที่ฝั่ง Client ต้องมี prefix  NEXT_PUBLIC_ 
- ✅ ตรวจสอบว่าไฟล์ชื่อถูกต้อง:  .env.local  ไม่ใช่  .env.local.txt 
 
❌ ปัญหา: API route ตอบกลับมาว่า "Missing API key"
 
สาเหตุ & วิธีแก้:
 
- ✅ ตรวจสอบว่าได้ใส่ค่าใน  .env.local  แล้ว
- ✅ รัน  pnpm dev  ใหม่
- ✅ ตรวจสอบว่าชื่อตัวแปรในโค้ดตรงกับในไฟล์  .env  พอดี
 
❌ ปัญหา: Vercel Deploy — ทำงานไม่ได้ใน Production
 
สาเหตุ & วิธีแก้:
 
- ✅ ต้องตั้งค่า Environment Variables ใน Vercel Dashboard ด้วย
- ✅ หลังเพิ่ม/แก้ไข → ต้อง Redeploy
- ✅ ตรวจสอบว่าเลือก Environment ให้ถูกต้อง (Production ✅)
 
 
 
✅ ตรวจสอบความพร้อมก่อนพัฒนาต่อ
 
มีไฟล์  .env.example  ในโฟลเดอร์โปรเจกต์
มีไฟล์  .env.local  และใส่ค่าที่จำเป็นครบถ้วน
 .env*  อยู่ใน  .gitignore  แล้ว
รัน  pnpm dev  และตรวจสอบว่าไม่มี error แจ้งเรื่องตัวแปรหาย
เข้า  /api/ai  และ  /api/chat  ได้โดยไม่มี error เรื่อง API key
 
 
 
ต้องการเพิ่มตัวแปรอื่นๆ, ตัวอย่างการตั้งค่า Database, หรือเอกสารส่วนอื่นๆ เพิ่มไหมครับ? 😊