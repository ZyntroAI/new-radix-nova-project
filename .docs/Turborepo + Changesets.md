title: "Turborepo + Changesets — Integration Guide"
aliases:
 
- "Turborepo และ Changesets ทำงานร่วมกัน"
- "Build + Version + Publish Workflow แบบอัตโนมัติ"
slug: turborepo-changesets
icon: 🔀
color: orange
type: guide
status: active
priority: high
tags:
- type/guide
- topic/monorepo
- topic/devops
- topic/release
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent:
- "[[Changesets สำหรับ Publish แพ็กเกจ]]"
children: []
related:
- "[[Monorepo Dependency Management]]"
- "[[Changesets สำหรับ Publish แพ็กเกจ]]"
- "[[CI/CD]]"
 
 
 
🔀 Turborepo + Changesets — Build + Version + Publish ครบในระบบเดียว
 
Turborepo = จัดการ Build/Test/Task → เร็ว แค่สิ่งที่เปลี่ยน
Changesets = จัดการเวอร์ชัน/Changelog/Publish → อัตโนมัติ ควบคุมได้
ร่วมกัน = ระบบ Release ที่สมบูรณ์ที่สุดสำหรับ Monorepo ✅
 
 
 
📊 บทบาทของแต่ละเครื่องมือ
 
เครื่องมือ หน้าที่ ทำอะไร 
Turborepo Task Orchestrator Build, Test, Lint, Typecheck — เฉพาะที่เปลี่ยนแปลง + Cache 
Changesets Versioning & Release ประกาศการเปลี่ยนแปลง → อัปเดตเวอร์ชัน → สร้าง Changelog → Publish ขึ้น Registry 
 
ทำงานร่วมกันแต่แยกหน้าที่ชัดเจน — ไม่ทับซ้อนกัน ✅
 
 
 
🚀 ขั้นที่ 1: ติดตั้งและตั้งค่าพื้นฐาน
 
✅ ติดตั้งแพ็กเกจที่ Root
 
bash
  
# ติดตั้ง Turborepo และ Changesets
pnpm add -Dw turbo @changesets/cli

# สร้างไฟล์เริ่มต้น
pnpm changeset init
 
 
📁 โครงสร้างที่ได้
 
plaintext
  
your-monorepo/
├── apps/
├── packages/
├── .changeset/
│   ├── config.json    # ← ตั้งค่า Changesets
│   └── README.md
├── turbo.json         # ← ตั้งค่า Turborepo
├── pnpm-workspace.yaml
└── package.json
 
 
 
 
⚙️ ขั้นที่ 2: ตั้งค่าไฟล์สำคัญ
 
🔹  turbo.json  — Pipeline ของ Turborepo
 
json
  
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"],
      "cache": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": [],
      "cache": true
    },
    "lint": {
      "outputs": [],
      "cache": true
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": [],
      "cache": true
    }
  }
}
 
 
🔹  .changeset/config.json  — ตั้งค่า Changesets
 
json
  
{
  "$schema": "https://unpkg.com/@changesets/config@3/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@your-org/web", "@your-org/admin"]  # ❌ แอปไม่ต้อง Publish
}
 
 
🔹 Root  package.json  — Scripts รวม
 
json
  
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "build:affected": "turbo build --filter=[origin/main...HEAD]",
    "test": "turbo test",
    "lint": "turbo lint",
    
    "changeset": "changeset",
    "changeset:version": "changeset version",
    "changeset:publish": "turbo build --filter='./packages/*' && changeset publish"
  }
}
 
 
💡 สำคัญ:  changeset:publish  เรียก  turbo build  ก่อนเสมอ — ให้ Turborepo จัดการ Build ให้ถูกต้องตามลำดับและ Cache แล้วค่อย Publish
 
 
 
🔄 ขั้นที่ 3: Workflow การทำงาน
 
✅ วงจรปกติของนักพัฒนา
 
plaintext
  
1. แก้ไขโค้ดใน packages/ui
2. pnpm changeset  → เขียนบันทึกการเปลี่ยนแปลง
3. Commit + Push → สร้าง PR
4. CI รัน: turbo lint, turbo typecheck, turbo test
5. Merge เข้า main
 
 
✅ ขั้นตอน Release
 
plaintext
  
# เมื่อพร้อมปล่อยเวอร์ชันใหม่
1. pnpm changeset:version    # อัปเดตเวอร์ชัน + Changelog
2. pnpm install              # อัปเดต Lock File
3. git diff                  # ตรวจสอบความถูกต้อง
4. git add . && git commit -m "release: version packages"
5. git push
6. → PR "Version Packages" ถูกสร้าง/อัปเดตโดย Action
7. ตรวจสอบ → Merge → Publish อัตโนมัติ 🚀
 
 
 
 
🤖 ขั้นที่ 4: CI/CD อัตโนมัติด้วย GitHub Actions
 
สร้างไฟล์  .github/workflows/release.yml :
 
yaml
  
name: Release
on:
  push:
    branches: [main]

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    name: Release
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
          registry-url: "https://registry.npmjs.org"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build affected packages
        run: pnpm build:affected

      - name: Run tests
        run: pnpm test

      - name: Create Version PR or Publish
        uses: changesets/action@v1
        id: changesets
        with:
          publish: pnpm changeset:publish
          version: pnpm changeset:version
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
 
 
✅ ทำงานอย่างไร:
 
- Push ไป main → ตรวจสอบว่ามี Changeset ไหม
- ถ้ามี → สร้าง/อัปเดต PR ชื่อ "Version Packages"
- เมื่อ Merge PR นั้น → รัน  changeset:publish  → Build ด้วย Turborepo → Publish ขึ้น npm อัตโนมัติ 🚀
 
 
 
🧠 กลยุทธ์สำคัญ
 
🔹 Build เฉพาะที่จำเป็น
 
bash
  
# Build ทุกอย่าง
pnpm build

# Build เฉพาะที่เปลี่ยนจาก main
pnpm build:affected

# Build เฉพาะแพ็กเกจและที่ขึ้นอยู่
turbo build --filter=@your-org/ui...
 
 
💡 Turborepo รู้ว่าอะไรเปลี่ยน และอะไรต้อง Rebuild — ไม่เสียเวลาทำซ้ำของเดิม ✅
 
🔹 Filter เฉพาะแพ็กเกจใน  packages/ 
 
bash
  
# Build เฉพาะแพ็กเกจที่จะ Publish — ข้ามแอป
turbo build --filter='./packages/*'

# Publish เฉพาะใน packages/ — ปลอดภัย ไม่เผลอส่งแอปขึ้น npm
pnpm --filter "./packages/**" changeset publish
 
 
🔹 Skip Publish สำหรับแพ็กเกจภายใน
 
บางแพ็กเกจใช้ภายในอย่างเดียว ไม่อยากขึ้น npm — 2 วิธี:
 
json
  
// วิธีที่ 1: ใน package.json
{ "private": true }  // จะถูกข้ามอัตโนมัติ

// วิธีที่ 2: ใน .changeset/config.json
{ "ignore": ["@your-org/internal-utils"] }
 
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ ✅ วิธีแก้ 
Publish ล้มเหลว เพราะ Build ไม่ผ่าน ลืม Build ก่อน Publish ใส่  turbo build  ใน script ก่อน  changeset publish  
แอปใน  apps/  ถูกพยายาม Publish ไม่ได้ระบุ ignore เพิ่มชื่อแอปใน  ignore  หรือตั้ง  private: true  
Dependency ภายในเวอร์ชันผิด  updateInternalDependencies  ไม่ถูกต้อง ตั้งค่าเป็น  "patch"  — อัปเดตแค่เลข Patch ✅ 
Build ซ้ำทุกครั้ง ไม่ได้ใช้ Cache Cache Config ผิดใน turbo.json ตรวจสอบ  outputs  และเปิด Remote Cache ถ้าต้องการ 
Changeset ไม่สร้าง PR CI ไม่มี Permission เขียน ตรวจสอบ GITHUB_TOKEN มีสิทธิ์ write contents 
 
 
 
✅ Checklist — ระบบพร้อมใช้งานไหม?
 
ติดตั้ง Turbo + Changesets ที่ Root ✅
 turbo.json  ตั้งค่า Pipeline และ Outputs ถูกต้อง ✅
 .changeset/config.json  กำหนด  ignore  สำหรับแอป ✅
Root Scripts:  build ,  changeset ,  changeset:version ,  changeset:publish  ✅
 changeset:publish  เรียก  turbo build  ก่อนเสมอ ✅
GitHub Actions ตั้งค่า GITHUB_TOKEN + NPM_TOKEN ✅
แพ็กเกจภายในตั้ง  private: true  หรืออยู่ใน  ignore  ✅
ทดสอบ: เขียน Changeset → Merge → PR Version → Merge → Publish ✅
 
 
 
🔗 Related Notes
 
- [[Changesets สำหรับ Publish แพ็กเกจ]] — ภาพรวม Changesets
- [[Monorepo Dependency Management]] — จัดการ Dependencies ใน Monorepo
- [[CI/CD]] — Pipeline อื่นๆ ที่ควรมี
- [[Dependency Security]] — สแกนความปลอดภัยก่อน Release
 
 
 
✅ สรุปสั้นๆ: Turborepo จัดการ Build/Test ให้เร็ว Changesets จัดการเวอร์ชัน/Changelog/Publish ให้ง่าย — เมื่อรวมกัน คุณจะได้ระบบที่ เร็ว ปลอดภัย อัตโนมัติ และเชื่อถือได้ 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Canary/Prc-release Versions, Remote Cache ของ Turborepo, หรือ Publish to GitHub Packages 😊