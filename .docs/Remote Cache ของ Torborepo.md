title: "Turborepo Remote Cache"
aliases:
 
- "แคชกลางสำหรับทีมและ CI"
- "Share Build Cache across machines"
slug: turborepo-remote-cache
icon: ☁️
color: skyblue
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
 
 
 
☁️ Turborepo Remote Cache — แคชกลางสำหรับทีมและ CI
 
Local Cache = แคชอยู่ที่เครื่องคุณเท่านั้น

Remote Cache = แคชเก็บที่เซิร์ฟเวอร์กลาง — ทุกคนในทีม + CI ทุกเครื่อง ดึง/อัปโหลดใช้ร่วมกันได้ ✅
 
 
 
🎯 ทำไมต้องใช้ Remote Cache?
 
สถานการณ์ ไม่มี Remote Cache ❌ มี Remote Cache ✅ 
นักพัฒนาคนอื่น Pull โค้ดใหม่ ต้อง Build ทั้งหมดเองตั้งแต่ต้น ดึงแคชจากที่คุณ Build ไว้ — ข้ามไปเลย ⚡ 
CI รันงานซ้ำๆ Build ทุกครั้ง เสียเวลา+ทรัพยากร ดึงแคช → ผ่านทันที 
PR หลายอันทำงานพร้อมกัน แต่ละ PR Build เอง แชร์แคชร่วมกัน — Build ครั้งเดียว ใช้ได้ทุกที่ 
ย้ายเครื่อง/เครื่องใหม่ เริ่มศูนย์ ล็อกอิน → ดึงแคช → ทำงานต่อได้ทันที 
 
⏱️ ประหยัดเวลาได้ตั้งแต่ 50–90% ของเวลา Build ใน CI — คุ้มค่ามากสำหรับทีมและโปรเจกต์ขนาดใหญ่ 
 
 
 
📦 ตัวเลือกที่มี
 
ตัวเลือก ผู้ให้บริการ ราคา เหมาะกับ 
✅ Vercel Remote Cache Vercel ฟรีในขอบเขต / จ่ายตามการใช้งาน ส่วนใหญ่ — ง่ายและเร็วที่สุด[__LINK_ICON] 
✅ Self-hosted Cache Turborepo OSS / Custom Server ฟรี — โฮสต์เอง องค์กรที่ต้องควบคุมข้อมูลเอง 
✅ Custom S3 Bucket AWS S3 / R2 / GCS จ่ายตามการใช้งาน ทีมที่มีอยู่แล้ว ใช้ของเดิมได้เลย 
 
 
 
🚀 ขั้นที่ 1: ตั้งค่า Vercel Remote Cache
 
✅ ขั้นตอนที่เครื่องนักพัฒนา
 
bash
  
# 1. ล็อกอินเข้า Turborepo/Vercel
npx turbo login
# จะเปิดเบราว์เซอร์ → อนุญาต → กลับมาที่ Terminal ✅

# 2. เชื่อมต่อ Repo นี้กับทีมของคุณ
npx turbo link
# เลือกทีม → เสร็จ ✅
 
 
จะสร้างไฟล์  .turbo/config.json  — Commit ไฟล์นี้เข้า Git ด้วยนะครับ 
 
json
  
// .turbo/config.json
{
  "teamId": "team_xxxx",
  "apiUrl": "https://vercel.com/api"
}
 
 
✅ ตั้งค่าใน GitHub Actions
 
ไปที่ Vercel Dashboard → Account Settings → Create Scoped Access Token  
 
จากนั้นไปที่ GitHub Repo → Settings → Secrets and Variables → Actions:
 
ชื่อ Secret/Variable ค่า 
 TURBO_TOKEN  Scoped Access Token จาก Vercel 
 TURBO_TEAM  Slug ของทีม — ส่วนที่ตามหลัง  vercel.com/  ใน URL ทีมของคุณ [__LINK_ICON] 
 
อัปเดตไฟล์ CI:
 
yaml
  
# .github/workflows/ci.yml
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
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "pnpm"

      # ✅ เพิ่ม Environment Variables สำหรับ Remote Cache
      - name: Build & Test
        env:
          TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
          TURBO_TEAM: ${{ vars.TURBO_TEAM }}
        run: |
          pnpm install --frozen-lockfile
          pnpm build
          pnpm test
 
 
💡 ไม่ต้องใส่  TURBO_API  ถ้าใช้ Vercel — ค่าเริ่มต้นคือ  https://vercel.com/api  แล้ว 
 
 
 
⚙️ ขั้นที่ 2: ตั้งค่าใน  turbo.json 
 
json
  
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"],
      "cache": true       // ✅ เปิดใช้แคช — ค่าเริ่มต้น true
    },
    "test": {
      "outputs": [],
      "cache": true       // ✅ ก็แคชผลลัพธ์การทดสอบด้วย
    }
  },
  "remote": {
    "signature": true    // ✅ ตรวจสอบความถูกต้องของแคช — ป้องกันการปลอมแปลง
  }
}
 
 
🔹 ปิดแคชบางงาน (ถ้าจำเป็น)
 
json
  
"deploy": {
  "cache": false   // ❌ ไม่เคยแคชงาน Deploy — ต้องรันทุกครั้ง
}
 
 
 
 
🔍 ตรวจสอบและใช้งาน
 
✅ ดูสถานะแคช
 
เมื่อรันคำสั่ง จะเห็นผลลัพธ์แบบนี้:
 
plaintext
  
✓ build:web: cache hit, replaying output in 42ms
  ↓ Remote → pulled in 1.2s
✓ build:ui: cache miss — building...
  ↑ Remote → uploaded in 800ms
 
 
ข้อความ หมายความว่า 
 cache hit  มีในแคช → ข้ามงานนี้ไปเลย ⚡ 
 cache miss  ไม่มี → ทำงานจริง แล้วอัปโหลดแคชขึ้นไป 
 Remote → pulled  ดึงจาก Remote Cache มาใช้ 
 Remote → uploaded  อัปโหลดผลลัพธ์ขึ้น Remote Cache 
 
✅ ล้าง/ข้ามแคช
 
bash
  
# ล้าง Local Cache
npx turbo prune

# บังคับทำงานใหม่ทั้งหมด — ไม่อ่านแคชเลย
npx turbo build --force

# ลบแคชทั้งหมดใน Remote (ระวัง! ลบแล้วกู้คืนไม่ได้)
npx turbo cache purge --team=ชื่อทีม
 
 
 
 
🔐 ความปลอดภัย & ค่าใช้จ่าย
 
✅ สิ่งที่ต้องระวัง
 
-  TURBO_TOKEN  = สิทธิ์เข้าถึงแคชของทีม — ❌ ห้าม Commit เข้า Git เด็ดขาด เก็บใน Secrets เท่านั้น
- แคชเก็บไฟล์ Output ของคุณ — ❌ ไม่ควรมี Secret/ข้อมูลละเอียดอ่อนใน Output
- เปิด  signature: true  — ตรวจสอบว่าแคชมาจากแหล่งที่เชื่อถือได้ ป้องกันการโจมตี 
 
💰 การจัดการพื้นที่แคช
 
- Vercel มีการจำกัดพื้นที่ตามแผน — ตรวจสอบที่ Dashboard → Storage
- แคชหมดอายุโดยอัตโนมัติ — ลบเก่าทิ้งเพื่อเพิ่มพื้นที่
- ใช้  turbo cache purge  ล้างสิ่งที่ไม่จำเป็น 
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ ✅ วิธีแก้ 
Remote Cache ไม่ทำงาน / แจ้ง 401  TURBO_TOKEN  ไม่ถูกต้อง หรือ หมดอายุ สร้าง Scoped Token ใหม่ อัปเดตใน GitHub Secrets[__LINK_ICON] 
Cache Miss ทุกครั้งที่ CI รัน  fetch-depth  ไม่เพียงพอ — Turbo ต้องเห็น Commit History ตั้ง  fetch-depth: 0  ใน  actions/checkout [__LINK_ICON] 
ดึงแคชไม่ได้ แต่เครื่องตัวเองใช้ได้  TURBO_TEAM  ผิด ตรวจสอบ Team Slug ใน URL Vercel แล้วแก้ไข[__LINK_ICON] 
ข้อมูลในแคชผิด/เสียหาย Hash Collision หรือ Build ไม่สมบูรณ์ รันด้วย  --force  เพื่อสร้างใหม่ แล้วอัปโหลดทับ 
ไฟล์ขึ้นแคชเยอะเกินไป  outputs  ใน turbo.json ไม่ถูกต้อง ระบุเฉพาะโฟลเดอร์ที่จำเป็น เช่น  dist/**  ไม่ใช่  **  
 
 
 
✅ Checklist — พร้อมใช้ Remote Cache ไหม?
 
สร้างบัญชีทีมใน Vercel และสร้าง Scoped Access Token ✅
รัน  turbo login  +  turbo link  ที่เครื่องนักพัฒนา ✅
Commit  .turbo/config.json  เข้า Git ✅
เพิ่ม  TURBO_TOKEN  และ  TURBO_TEAM  ใน GitHub Secrets/Variables ✅
ทดสอบใน CI — เห็น  Remote → pulled/uploaded  ✅
เปิด  signature: true  ใน turbo.json ✅
ตรวจสอบ  outputs  ถูกต้อง — ไม่แคชไฟล์เกินจำเป็น ✅
 
 
 
🔗 Related Notes
 
- [[Turborepo + Changesets]] — Build + Release Workflow ครบถ้วน
- [[Monorepo Dependency Management]] — จัดการ Dependencies ในทีม
- [[CI/CD]] — Pipeline อื่นๆ ที่ควรมี
- [[Dependency Security]] — ความปลอดภัยในทุกขั้นตอน
 
 
 
✅ สรุปสั้นๆ: Remote Cache = ประหยัดเวลาทั้งทีมและ CI — ติดตั้งง่ายมาก แค่ล็อกอิน เชื่อมทีม เพิ่ม Token เข้า CI แล้วปล่อยให้ Turbo จัดการส่วนที่เหลือให้คุณ ⚡😎
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Self-hosted Remote Cache, S3 Custom Cache, หรือ Troubleshooting Cache Miss Issues 😊