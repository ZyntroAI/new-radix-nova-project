title: "S3 Custom Cache for Turborepo"
aliases:
 
- "ใช้ S3 เป็นที่เก็บแคชของ Turborepo"
- "Turborepo Remote Cache with AWS S3 R2 GCS"
slug: turborepo-s3-custom-cache
icon: 🪣
color: orange
type: guide
status: active
priority: high
tags:
- type/guide
- topic/monorepo
- topic/devops
- topic/ci-cd
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent:
- "[[Turborepo + Changesets]]"
children: []
related:
- "[[Turborepo + Changesets]]"
- "[[Monorepo Dependency Management]]"
- "[[CI/CD]]"
 
 
 
🪣 S3 Custom Cache — ใช้ S3/R2/GCS เป็นที่เก็บแคชของ Turborepo
 
แทนที่จะใช้ Vercel Remote Cache — คุณสามารถใช้ Bucket ที่คุณควบคุมเองได้ ✅ AWS S3, Cloudflare R2, Google Cloud Storage — ทั้งหมดทำได้เหมือนกัน
 
 
 
🎯 ทำไมต้องใช้ Custom S3 Cache?
 
ข้อดี คำอธิบาย 
🔒 ควบคุมข้อมูลเอง ไฟล์แคชอยู่ในบัญชีของคุณ — ตามนโยบายองค์กร 
💰 ค่าใช้จ่ายคงที่/ถูกกว่า จ่ายตามการใช้งานจริง — R2 ไม่มีค่าเรียกเก็บข้อมูลออก 
🌍 เลือกที่ตั้งได้ เลือก Region ใกล้ทีมของคุณ 
🔄 ไม่ต้องพึ่ง Vercel ทำงานได้กับทุก CI/CD และทุกแพลตฟอร์ม 
 
 
 
📦 สิ่งที่ต้องเตรียม
 
- ✅ Bucket (S3 / R2 / GCS) ที่สร้างเรียบร้อยแล้ว
- ✅ Credential ที่มีสิทธิ์อ่าน/เขียนใน Bucket
- ✅ Server ฝั่งกลาง — เพราะ Turborepo ยังไม่เชื่อม S3 โดยตรง ต้องมี Cache Server คอยรับคำขอจาก Turborepo แล้วเรียก S3 แทน
 
 
 
🚀 ตัวเลือก Cache Server
 
Server ภาษา/แพลตฟอร์ม เหมาะกับ 
✅ turborepo-remote-cache Node.js — โฮสต์ได้ทุกที่ เริ่มต้นง่ายที่สุด 🔥 
✅ Cloudflare Worker + R2 Serverless — ไม่มีเซิร์ฟเวอร์ ฟรี/ถูก เร็วทั่วโลก 🌍 
✅ AWS Lambda + S3 Serverless บน AWS ถ้ามีระบบอยู่แล้ว ใช้ต่อได้ 
 
 
 
⚡ ตัวเลือกที่ 1: turborepo-remote-cache + S3 — เริ่มต้นง่ายสุด
 
✅ ขั้นที่ 1: เตรียม AWS S3 Bucket
 
bash
  
# สร้าง Bucket
aws s3 mb s3://your-turborepo-cache --region ap-southeast-1

# ตั้งค่า Life Cycle — ลบแคชเก่าอัตโนมัติ
aws s3api put-bucket-lifecycle-configuration \
  --bucket your-turborepo-cache \
  --lifecycle-configuration '{
    "Rules": [{
      "ID": "DeleteOldCache",
      "Status": "Enabled",
      "Expiration": { "Days": 30 }
    }]
  }'
 
 
✅ ขั้นที่ 2: Deploy Cache Server
 
ใช้ Docker หรือ Deploy บน Fly.io/Railway/Render:
 
bash
  
# Pull Image
docker pull ghcr.io/maxscharwath/turborepo-remote-cache:latest

# รัน
docker run -d \
  -p 3000:3000 \
  -e STORAGE_PROVIDER=s3 \
  -e AWS_ACCESS_KEY_ID=AKIA... \
  -e AWS_SECRET_ACCESS_KEY=... \
  -e AWS_REGION=ap-southeast-1 \
  -e AWS_S3_BUCKET=your-turborepo-cache \
  -e TURBO_TOKEN=your-strong-token-here \
  ghcr.io/maxscharwath/turborepo-remote-cache:latest
 
 
หรือใช้  docker-compose.yml :
 
yaml
  
version: "3"
services:
  turborepo-cache:
    image: ghcr.io/maxscharwath/turborepo-remote-cache:latest
    ports:
      - "3000:3000"
    environment:
      STORAGE_PROVIDER: s3
      AWS_REGION: ap-southeast-1
      AWS_S3_BUCKET: your-turborepo-cache
      AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}
      AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}
      TURBO_TOKEN: ${TURBO_TOKEN}
 
 
 
 
☁️ ตัวเลือกที่ 2: Cloudflare R2 + Worker — ฟรี เร็ว ไม่มีค่าถ่ายโอน
 
🔥 แนะนำที่สุดสำหรับส่วนใหญ่ — ไม่มีค่าแชร์แบนด์วิดท์ ทั่วโลกในไม่กี่วินาที
 
✅ ขั้นที่ 1: สร้าง R2 Bucket
 
bash
  
# ติดตั้ง Wrangler
npm install -g wrangler
wrangler login

# สร้าง Bucket
wrangler r2 bucket create turborepo-cache
 
 
✅ ขั้นที่ 2: Deploy Worker Server
 
สร้างไฟล์  wrangler.toml :
 
toml
  
name = "turborepo-cache"
compatibility_date = "2024-01-01"

[[r2_buckets]]
binding = "CACHE"
bucket_name = "turborepo-cache"
 
 
โค้ด Worker ( src/index.js ):
 
javascript
  
const TURBO_TOKEN = "your-strong-token-here"; // ตั้งค่าเป็น Secret จริงๆ

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const auth = request.headers.get("Authorization");
    
    if (!auth || auth !== `Bearer ${TURBO_TOKEN}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    const key = url.pathname.slice(1);
    
    if (request.method === "PUT") {
      await env.CACHE.put(key, request.body);
      return new Response(null, { status: 200 });
    }
    
    if (request.method === "GET") {
      const object = await env.CACHE.get(key);
      if (!object) return new Response("Not Found", { status: 404 });
      return new Response(object.body);
    }
    
    if (request.method === "HEAD") {
      const object = await env.CACHE.head(key);
      if (!object) return new Response("Not Found", { status: 404 });
      return new Response(null, { status: 200 });
    }
    
    return new Response("Method Not Allowed", { status: 405 });
  }
}
 
 
Deploy:
 
bash
  
wrangler deploy
# จะได้ URL: https://turborepo-cache.your-name.workers.dev
 
 
 
 
🔧 ขั้นที่ 3: ตั้งค่า Turborepo ให้ใช้ Custom Cache
 
✅ อัปเดต  turbo.json 
 
json
  
{
  "$schema": "https://turbo.build/schema.json",
  "remoteCache": {
    "enabled": true,
    "signature": true,
    "preflight": true
  },
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
 
 
✅ Environment Variables — ทั้งเครื่องนักพัฒนาและ CI
 
ตั้งค่าเหล่านี้ใน Environment หรือใน GitHub Secrets:
 
ตัวแปร ค่า 
 TURBO_API  URL ของ Cache Server —  https://turborepo-cache.your-name.workers.dev  
 TURBO_TEAM  ชื่อทีม — ใส่อะไรก็ได้ เช่น  team-default  
 TURBO_TOKEN  Token ที่ตรงกับฝั่ง Server — ต้องเหมือนกันทุกเครื่อง 
 TURBO_REMOTE_CACHE_SIGNATURE_KEY  รหัสลับสำหรับเซ็นแคช — สุ่มสตริงยาวๆ เก็บเป็น Secret 
 
✅ ทดสอบที่เครื่อง
 
bash
  
# ตั้งค่า Env Vars หรือใส่ใน .env
export TURBO_API=https://turborepo-cache.your-name.workers.dev
export TURBO_TEAM=team-default
export TURBO_TOKEN=your-strong-token-here
export TURBO_REMOTE_CACHE_SIGNATURE_KEY=your-signature-key-here

# รัน Build
pnpm build
# ↑ ครั้งแรก: cache miss → อัปโหลด
# ครั้งที่สอง: cache hit → ดึงจาก S3/R2 ⚡
 
 
 
 
🤖 ตั้งค่าใน GitHub Actions
 
อัปเดต CI ของคุณ:
 
yaml
  
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      - name: Build
        env:
          TURBO_API: ${{ vars.TURBO_API }}
          TURBO_TEAM: ${{ vars.TURBO_TEAM }}
          TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
          TURBO_REMOTE_CACHE_SIGNATURE_KEY: ${{ secrets.TURBO_SIGNATURE_KEY }}
        run: |
          pnpm install --frozen-lockfile
          pnpm build
 
 
 
 
🔐 ความปลอดภัย
 
ข้อแนะนำ ทำไม 
✅ เปิด  signature: true  +  TURBO_REMOTE_CACHE_SIGNATURE_KEY  ป้องกันการปลอมแปลงแคช[__LINK_ICON] 
✅ ใช้ Token ยาวและสุ่ม ป้องกันคนภายนอกเรียกใช้ Cache Server 
✅ บังคับใช้ HTTPS เสมอ ป้องกันการดักจับ Token ระหว่างทาง 
✅ ตั้งค่า Bucket Policy — ปิด Public Access ไฟล์ใน S3/R2 ไม่ควรเข้าถึงสาธารณะ 
✅ หมดอายุแคชอัตโนมัติ ป้องกันพื้นที่เต็มและเก็บของเก่าเกินไป 
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ ✅ วิธีแก้ 
401 Unauthorized  TURBO_TOKEN  ไม่ตรงกัน ตรวจสอบทั้งฝั่ง Server และ Client ให้ตรงกัน 
403 Forbidden S3 Bucket Permission ผิด ตรวจสอบ IAM Policy — ต้องมี s3:PutObject, s3:GetObject, s3:ListBucket 
Cache Miss ทุกครั้ง  TURBO_API  ผิด หรือ Server ไม่เข้าถึงได้ ทดสอบเรียกด้วย  curl -H "Authorization: Bearer $TURBO_TOKEN" $TURBO_API/health  
ดึงช้ามาก Region ไม่เหมาะสม เลือก Region ใกล้ทีม/CI ของคุณ — R2 ดีที่สุดเพราะกระจายทั่วโลก 
พื้นที่เต็ม ไม่มี Life Cycle Rule ตั้งค่าให้ลบไฟล์เก่ากว่า 30 วันอัตโนมัติ 
 
 
 
📊 เปรียบเทียบตัวเลือก
 
 Vercel Cache S3 + Self-hosted Cloudflare R2 + Worker 
ติดตั้ง ⭐ ง่ายที่สุด ⭐⭐ ปานกลาง ⭐⭐ ปานกลาง 
ค่าใช้จ่าย ฟรีจำกัด / จ่ายตามแผน จ่ายตาม S3 usage ฟรีถึงขีดจำกัด / ราคาถูกมาก 
ควบคุมข้อมูล ❌ Vercel จัดการ ✅ คุณจัดการเอง ✅ คุณจัดการเอง 
ความเร็ว 🌍 ดีมาก ⚡ ขึ้นอยู่กับ Region 🌍 ดีที่สุด — Edge ทั่วโลก 
Maintenance ไม่มี ต้องดูแล Server ไม่มี — Serverless 
 
💡 แนะนำ: เริ่มด้วย Vercel ถ้าเพียงพอ → ต้องการควบคุมเอง/ประหยัด → Cloudflare R2 + Worker คือตัวเลือกที่ดีที่สุดในปัจจุบัน 🔥
 
 
 
✅ Checklist — พร้อมใช้ Custom Cache ไหม?
 
สร้าง Bucket และตั้งค่า Private Access ✅
เลือกและ Deploy Cache Server ✅
ตั้งค่า Environment Variables ที่เครื่องนักพัฒนา ✅
เพิ่ม Secrets ใน GitHub Actions ✅
เปิด Signature Verification ใน turbo.json ✅
ทดสอบ: Build → Cache Miss → อัปโหลด → Build อีกครั้ง → Cache Hit ✅
ตั้งค่า Life Cycle Rule ใน Bucket — ลบแคชเก่า ✅
ปรับแต่งสิทธิ์ IAM — ให้น้อยที่สุดเท่าที่จำเป็น ✅
 
 
 
🔗 Related Notes
 
- [[Turborepo + Changesets]] — รวม Cache เข้ากับ Release Workflow
- [[Turborepo Remote Cache]] — ภาพรวม Remote Cache ทั่วไป
- [[CI/CD]] — Pipeline และตัวแปร Environment
- [[Dependency Security]] — ความปลอดภัยตลอดกระบวนการ Build
 
 
 
✅ สรุปสั้นๆ: S3 Custom Cache = คุณเป็นเจ้าของข้อมูล จ่ายน้อยกว่า และทำงานได้ทุกที่ — Cloudflare R2 + Worker คือทางเลือกที่สมดุลที่สุด: ฟรี, เร็วทั่วโลก, ไม่ต้องดูแลเซิร์ฟเวอร์ 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Self-hosted Cache บน Kubernetes, OIDC Authentication สำหรับ GitHub Actions กับ AWS, หรือ Cache Invalidation Strategy 😊