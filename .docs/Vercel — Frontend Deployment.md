title: "Vercel — Frontend Deployment"
aliases:
 
- "Deploy Frontend with Vercel"
- "แนะนำการใช้ Vercel"
slug: vercel-frontend-deployment
icon: ▲
color: cyan
type: guide
status: active
priority: high
tags:
- type/guide
- topic/frontend
- topic/deployment
- topic/devops
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — Frontend Development]]"
parent: []
children: []
related:
- "[[Incident Response]]"
- "[[DevOps]]"
- "[[API Design]]"
 
 
 
▲ Vercel — Frontend Deployment Guide
 
Vercel = แพลตฟอร์มสำหรับ Deploy Frontend & Serverless Functions — ออกแบบมาเพื่อ Next.js โดยตรง แต่ใช้กับทุก Framework ได้เลย ✅ Zero-config, Global CDN, Auto HTTPS, Preview Deployments
 
 
 
🎯 ทำไมต้อง Vercel?
 
ข้อดี คำอธิบาย 
⚡ Zero Config เชื่อมต่อ Git → กด Deploy → เสร็จ! ไม่ต้องจัดการเซิร์ฟเวอร์ 
🌍 Global Edge Network โฮสต์ที่ Edge ทั่วโลก — โหลดเร็วจากทุกที่ 
🔒 Auto HTTPS SSL Certificate ฟรีและต่ออายุเอง 
🔁 Preview Deployments ทุก Pull Request ได้ลิงก์ตัวอย่างให้ทดสอบก่อน Merge 
🚀 Built-in CI/CD ทุก Push ไปที่ Main → Deploy อัตโนมัติ 
💰 Free Tier เพียงพอสำหรับโปรเจกต์ส่วนตัว/ต้นแบบ 
 
 
 
🚀 ขั้นที่ 1: เริ่มต้นใช้งาน
 
✅ สิ่งที่ต้องเตรียม
 
- บัญชี GitHub / GitLab / Bitbucket
- โปรเจกต์ Frontend ที่มี  package.json 
 
🔧 ติดตั้ง Vercel CLI (ทางเลือก)
 
bash
  
npm i -g vercel
# หรือใช้ npx
npx vercel
 
 
 
 
📦 ขั้นที่ 2: Deploy แบบเชื่อมต่อ Git (แนะนำ!)
 
1️⃣ เข้าสู่ระบบ
 
- ไปที่ vercel.com → Sign up ด้วยบัญชี Git ของคุณ
 
2️⃣ Import Project
 
- Add New → Project
- เลือก Repository ที่มีโค้ดของคุณ → Import
 
3️⃣ Configure Project
 
การตั้งค่า ค่าแนะนำ 
Project Name ชื่อโปรเจกต์ของคุณ 
Framework Preset เลือกอัตโนมัติ — Next.js, Vite, Create React App, Vue, Svelte... 
Root Directory ปล่อยว่างถ้าไฟล์อยู่ที่ Root 
Build Command ปล่อยว่าง (ใช้ค่าเริ่มต้นของ Framework) 
Output Directory ปล่อยว่าง 
Environment Variables เพิ่มตัวแปรที่จำเป็น เช่น  API_URL=https://...  
 
- กด Deploy ✅ รอ 1–3 นาที — เสร็จ! 🎉
 
ลิงก์เว็บไซต์ของคุณจะเป็น:  project-name.vercel.app 
 
 
 
🖥️ ขั้นที่ 3: Deploy ด้วย Vercel CLI
 
bash
  
# 1. เข้าสู่ระบบ (ครั้งแรก)
vercel login

# 2. ในโฟลเดอร์โปรเจกต์ของคุณ
vercel          # Deploy Preview / Staging
vercel --prod   # Deploy ขึ้น Production
 
 
💡 ใช้ CLI สะดวกสำหรับทดสอบก่อน Push ขึ้น Git — แต่ใช้ Git Integration จะดีที่สุดสำหรับทีม
 
 
 
⚙️ ขั้นที่ 4: ตั้งค่า vercel.json
 
สร้างไฟล์  vercel.json  ที่ Root ของโปรเจกต์ เพื่อปรับแต่งการทำงาน:
 
json
  
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ],
  "trailingSlash": false
}
 
 
📌 ตัวอย่างตาม Framework
 
Framework Output Directory 
Next.js  .next  (ปล่อยว่างได้เลย) 
Vite  dist  
Create React App  build  
Vue (Vite)  dist  
SvelteKit  .svelte-kit/output  
 
 
 
🔐 Environment Variables
 
ตั้งค่าที่: Project → Settings → Environment Variables
 
ชื่อตัวแปร ค่าตัวอย่าง ขอบเขต 
 API_URL   https://api.example.com  ✅ ✅ ✅ 
 PUBLIC_KEY   abc123  ✅ ✅ ✅ 
 DATABASE_URL   postgresql://...  ⚠️ Sensitive — ใช้ได้เฉพาะ Server/Edge Runtime 
 
⚠️ สำคัญ: ตัวแปรที่ขึ้นต้นด้วย  NEXT_PUBLIC_  (Next.js) หรือ  VITE_  (Vite) จะถูกส่งไปยังฝั่งผู้ใช้ — ห้ามใส่ Secret ใดๆ!
 
 
 
🌐 Custom Domain — โดเมนของตัวเอง
 
1. Project → Settings → Domains
2. พิมพ์ชื่อโดเมนของคุณ → Add Domain
3. Vercel จะแจ้งให้ตั้งค่า DNS:
- ใช้ Vercel DNS: เปลี่ยน Nameserver ของโดเมนไปใช้ของ Vercel — ง่ายที่สุด ✅
- ใช้ DNS เดิม: เพิ่ม Record ตามที่ Vercel บอก:
plaintext
  
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
 
4. รอสักครู่ → ✅ พร้อมใช้งาน พร้อม SSL อัตโนมัติ
 
 
 
🔄 Workflow การทำงาน
 
plaintext
  
Local Dev → Git Push → GitHub → Vercel Build & Deploy → ✅ Live!
                │
                └→ PR → Preview Deploy (ทดสอบก่อน)
                └→ Merge to Main → Production Deploy อัตโนมัติ
 
 
ประเภท เมื่อเกิดขึ้น ลิงก์ตัวอย่าง 
Production Deployment Push/Merge ไปที่ Main  yourdomain.com  /  project.vercel.app  
Preview Deployment เปิด Pull Request  pr-123--project.vercel.app  
Deployment from CLI รัน  vercel  ในเครื่อง  project-hash.vercel.app  
 
 
 
🐛 ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุที่เป็นไปได้ ✅ วิธีแก้ 
❌ Build Failed ขาดตัวแปร Environment Variable เช็คว่าตั้งครบทุกตัวใน Settings → Env Vars 
❌ Build Failed ต้องใช้ Node.js เวอร์ชันเฉพาะ Settings → General → Node.js Version → ตั้งให้ตรงกัน เช่น 18, 20 
⚠️ รูป/ไฟล์ 404 Path ผิด หรือ Base Path ไม่ถูกต้อง ตรวจสอบ  vercel.json  และตรวจสอบว่าไฟล์อยู่ใน Public folder 
⚠️ API เรียกไม่ได้ CORS หรือตัวแปรไม่มีตอน Build ตั้ง  API_URL  ให้ถูกต้อง; สำหรับฝั่ง Server ใช้ Vercel Edge Functions แทน 
⚠️ เวอร์ชันเก่ายังแสดงอยู่ CDN Cache เพิ่ม Cache-Control header หรือรอสักครู่ — Vercel ค่อยๆ อัปเดตทั่วโลก 
 
 
 
📊 Pricing & Limits (Free Tier)
 
รายการ ขีดจำกัด 
Bandwidth 100 GB / เดือน 
Build Minutes 6,000 นาที / เดือน 
Serverless Functions 102,400 GB-วินาที / เดือน 
Edge Functions ไม่จำกัด (ภายใต้การใช้งานปกติ) 
Deployments ไม่จำกัด 
Domains ไม่จำกัด 
 
💡 เพียงพอมากสำหรับโปรเจกต์ส่วนตัว — ถ้าเกิน อัปเกรดเป็น Pro ได้ตามการใช้งาน
 
 
 
✅ Checklist ก่อน Deploy
 
ตั้งค่า Environment Variables ครบถ้วน ✅
ทดสอบ Build ที่เครื่องตัวเองก่อน:  npm run build  ✅
ตรวจสอบว่าไม่มี Secret ในโค้ดหรือ Env Vars ฝั่ง Client ✅
ตั้งค่า Node.js Version ให้ตรงกับโปรเจกต์ ✅
ทดสอบใน Preview Deployment ก่อน Merge เข้า Main ✅
ตั้งค่า Custom Domain และตรวจสอบ SSL ✅
 
 
 
🔗 Related Notes
 
- [[API Design]] — เชื่อมต่อ Frontend กับ Backend/API
- [[DevOps]] — การรวม Deployment ในกระบวนการพัฒนา
- [[Incident Response]] — หน้าจอแจ้งเหตุและการจัดการเมื่อ Deploy ไม่สำเร็จ
 
 
 
✅ Vercel คือทางลัดที่ดีที่สุดสำหรับ Frontend Deployment — ลืมเรื่องเซิร์ฟเวอร์ไปได้เลย โฟกัสที่โค้ดและผลิตภัณฑ์ 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Serverless/Edge Functions, Environment Strategy สำหรับ Dev/Prod, หรือ Deploy จาก Monorepo 😊