title: "Changesets สำหรับ Publish แพ็กเกจ"
aliases:
 
- "Changesets — จัดการเวอร์ชันและเผยแพร่อัตโนมัติ"
- "Monorepo Release Workflow"
slug: changesets-guide
icon: 📝
color: purple
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
- "[[Monorepo Dependency Management]]"
children: []
related:
- "[[Monorepo Dependency Management]]"
- "[[CI/CD]]"
- "[[Dependency Security]]"
 
 
 
📝 Changesets — คู่มือจัดการเวอร์ชันและเผยแพร่แพ็กเกจอัตโนมัติ
 
Changesets = เครื่องมือมาตรฐานสำหรับ Monorepo — ประกาศการเปลี่ยนแปลง → อัปเดตเวอร์ชันอัตโนมัติ → สร้าง Changelog → Publish ขึ้น Registry ครบในขั้นตอนเดียว ✅
 
 
 
🎯 มันทำอะไรได้บ้าง?
 
ขั้นตอน สิ่งที่ Changesets จัดการให้คุณ 
✅ นักพัฒนาเขียน ประกาศว่าแก้อะไร และควรเป็น Patch/Minor/Major 
✅ อัตโนมัติ คำนวณเวอร์ชันใหม่ตาม SemVer อ่านจากไฟล์ Changeset 
✅ อัตโนมัติ อัปเดต  package.json  + สร้าง/อัปเดต  CHANGELOG.md  
✅ อัตโนมัติ Publish เฉพาะแพ็กเกจที่เวอร์ชันเปลี่ยนขึ้น npm Registry 
 
💡 สิ่งที่มันไม่ทำ: ไม่ Build, ไม่ทดสอบ, ไม่จัดการ Git Tag ให้ — คุณต้องเพิ่มขั้นตอนเหล่านั้นเอง ✅
 
 
 
🚀 ขั้นที่ 1: ติดตั้งและตั้งค่า
 
✅ ติดตั้งที่ Root ของ Monorepo
 
bash
  
pnpm add -Dw @changesets/cli
pnpm changeset init
 
 
จะสร้างโฟลเดอร์  .changeset/  พร้อมไฟล์  config.json  
 
⚙️ ตั้งค่า  .changeset/config.json 
 
json
  
{
  "$schema": "https://unpkg.com/@changesets/config@3/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,           // ❌ ไม่ Commit ให้อัตโนมัติ — คุณจัดการเอง
  "fixed": [],               // แพ็กเกจที่ต้องปล่อยพร้อมกันเวอร์ชันเดียวกัน
  "linked": [],              // แพ็กเกจที่เวอร์ชันต้องสอดคล้องกัน
  "access": "public",        // หรือ "restricted" สำหรับ Private Package
  "baseBranch": "main",      // สายหลักของคุณ
  "updateInternalDependencies": "patch",  // อัปเดต Dep ภายในเป็น Patch เท่านั้น
  "ignore": []               // แพ็กเกจที่ไม่ต้อง Publish
}
 
 
📝 เพิ่ม Script ที่ Root  package.json 
 
json
  
{
  "scripts": {
    "changeset": "changeset",
    "changeset:version": "changeset version",
    "changeset:publish": "pnpm build && changeset publish"
  }
}
 
 
 
 
📌 ขั้นที่ 2: วงจรการทำงาน
 
plaintext
  
┌─────────────┐
│  แก้โค้ด    │ ← ปรับปรุงแพ็กเกจของคุณ
└──────┬──────┘
       │
┌──────▼──────┐
│ เขียน Changeset │ ← pnpm changeset
└──────┬──────┘
       │  ไฟล์ .changeset/xxx.md ถูกสร้างขึ้นและ Commit
       │
┌──────▼──────┐
│ Merge เข้า main │
└──────┬──────┘
       │
┌──────▼──────┐
│ Version อัปเดต │ ← pnpm changeset version
└──────┬──────┘
       │  อัปเดต package.json + สร้าง CHANGELOG.md + ลบไฟล์ Changeset
       │
┌──────▼──────┐
│ Publish     │ ← pnpm changeset:publish
└─────────────┘
 
 
 
 
✍️ ขั้นที่ 3: เขียน Changeset — เมื่อแก้ไขแพ็กเกจ
 
bash
  
pnpm changeset
 
 
คำถามที่จะถาม:
 
1. แพ็กเกจไหนที่คุณแก้ไข? — เลือกได้หลายรายการ
2. ประเภทการเปลี่ยนแปลง?
-  major  — พังการใช้งานเดิม ❗
-  minor  — เพิ่มฟีเจอร์ใหม่ ไม่พัง ✨
-  patch  — แก้บั๊ก/ปรับปรุงเล็กน้อย 🔧
3. เขียนข้อความสรุปสั้นๆ — จะไปปรากฏใน CHANGELOG.md
 
📄 ไฟล์ Changeset ตัวอย่าง
 
markdown
  
---
"@your-org/ui": minor
"@your-org/utils": patch
---

✨ เพิ่ม Button component รองรับ theme และขนาดต่างๆ
🐛 แก้ปัญหา formatNumber ไม่ถูกต้องเมื่อเป็นเลขลบ
 
 
💡 Commit ไฟล์นี้เข้า Git ด้วย — นี่คือบันทึกเจตนาการเปลี่ยนแปลงของคุณ
 
 
 
🏷️ ขั้นที่ 4: อัปเดตเวอร์ชันและ Changelog
 
เมื่อรวมโค้ดเข้า  main  พร้อมที่จะปล่อยแล้ว:
 
bash
  
# 1. อ่านไฟล์ Changeset → อัปเดตเวอร์ชัน + สร้าง Changelog
pnpm changeset:version

# ผลลัพธ์:
# ✅ packages/ui/package.json   0.1.0 → 0.2.0
# ✅ packages/utils/package.json 0.1.0 → 0.1.1
# ✅ packages/ui/CHANGELOG.md ถูกอัปเดต
# ✅ ไฟล์ .changeset/ ถูกลบออกแล้ว

# 2. อัปเดต Lockfile
pnpm install

# 3. ตรวจสอบความถูกต้อง
git diff

# 4. Commit การเปลี่ยนแปลง
git add .
git commit -m "release: update versions and changelogs"
git push
```[[__LINK_ICON]](https://www.pnpm.cn/zh-TW/next/using-changesets?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiIzMGNjZDBjZDFmMjhmNjNkLTUzOGU2Y2M0Njc5MmUxZWYifQ%3D%3D&inline_doc_id=30ccd0cd1f28f63d-538e6cc46792e1ef)

---

## 📤 ขั้นที่ 5: Publish ขึ้น Registry

### ✅ ตรวจสอบก่อน Publish
- ตรวจสอบว่า Build ผ่าน ✅
- ตรวจสอบว่า `npm whoami` แสดงบัญชีที่ถูกต้อง ✅
- ตรวจสอบ `package.json` → `name` และ `version` ถูกต้อง ✅
- ตรวจสอบ `files` — เฉพาะไฟล์ที่จำเป็น ✅

### ✅ Publish
```bash
# ตรวจสอบ NPM Token
# เพิ่มใน .npmrc ที่ Root หรือ Environment Variable:
# //registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE

# Publish — เฉพาะแพ็กเกจที่เวอร์ชันยังไม่มีใน Registry เท่านั้น
pnpm changeset:publish

# ส่ง Tag ขึ้น Git ด้วย
git push --follow-tags
 
 
💡 สิ่งที่เกิดขึ้น:
 
- อ่านเวอร์ชันจาก  package.json 
- ตรวจสอบว่าเวอร์ชันนี้มีใน Registry หรือยัง
- ถ้ายัง → Publish ขึ้น npm
- ถ้ามีแล้ว → ข้ามไปเลย — ปลอดภัย ไม่ซ้ำซ้อน ✅
 
 
 
🤖 ขั้นที่ 6: อัตโนมัติด้วย GitHub Actions
 
สร้างไฟล์  .github/workflows/release.yml :
 
yaml
  
name: Release
on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
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
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm test

      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm changeset:publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
 
 
✅ ทำงานอย่างไร?
 
1. เมื่อมี Changeset Merge เข้า main → Action จะสร้าง/อัปเดต PR ชื่อ "Version Packages"
2. เปิด PR → ตรวจสอบความถูกต้อง → Merge
3. Merge เสร็จ → Action รัน  changeset publish  อัตโนมัติ → ขึ้น npm ทันที 🚀
 
 
 
⚙️ กลยุทธ์การจัดการเวอร์ชัน
 
🔹 Fixed Mode — ปล่อยทุกแพ็กเกจพร้อมกันเวอร์ชันเดียว
 
json
  
// .changeset/config.json
{
  "fixed": [["@company/ui", "@company/icons", "@company/theme"]]
}
 
 
ทั้ง 3 แพ็กเกจจะมีเวอร์ชันเหมือนกันเสมอ — เหมาะกับระบบที่ออกแบบมาทำงานร่วมกัน
 
🔹 Linked Mode — อัปเดตตามกลุ่ม แต่ไม่บังคับเลขเดียวกัน
 
json
  
"linked": [
  ["@company/api-client", "@company/types"]
]
 
 
เมื่ออัปเดตตัวหนึ่ง → อีกตัวจะได้ Patch Update ด้วย เพื่อให้เข้ากัน
 
🔹 Independent Mode — แต่ละแพ็กเกจอิสระกัน
 
ปล่อย  fixed  และ  linked  ว่างไว้ — แต่ละแพ็กเกจมีวงจรชีวิตของตัวเอง เหมาะกับไลบรารีสาธารณะทั่วไป
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ ✅ วิธีแก้ 
Publish ล้มเหลว 403 Forbidden NPM Token ไม่ถูกต้อง หรือ ไม่มีสิทธิ์ ตรวจสอบ  NPM_TOKEN  ใน Secrets, ตรวจสอบสิทธิ์บัญชีในองค์กร 
แพ็กเกจไม่ขึ้น npm เวอร์ชันมีอยู่แล้วใน Registry หรือ  private: true  ใน package.json ตรวจสอบ  npm view ชื่อแพ็กเกจ version  — ถ้ามีแล้วต้องเพิ่ม Changeset ใหม่ 
Dependency ภายในอัปเดตเป็น Major โดยไม่ตั้งใจ  updateInternalDependencies  ไม่ได้ตั้งค่า ตั้งค่าเป็น  "patch"  — จะอัปเดตแค่เลข Patch เท่านั้น 
ไฟล์ใน npm package มากเกินไป ไม่ได้ระบุ  files  ใน package.json เพิ่ม  "files": ["dist", "src", "README.md"]  — ลดขนาดแพ็กเกจ 
ต้องการข้ามแพ็กเกจไม่ให้ Publish อยู่ในรายการ  ignore  หรือ มี  "private": true  เพิ่มชื่อใน  ignore  หรือ ตั้ง  private: true  ใน package.json 
 
 
 
✅ Checklist — พร้อม Publish ไหม?
 
ติดตั้ง @changesets/cli ที่ Root แล้ว ✅
ตั้งค่า .changeset/config.json ถูกต้อง ✅
แต่ละแพ็กเกจมี  name ,  version , และ  access  ถูกต้อง ✅
 .npmrc  มี NPM Token ที่ถูกต้อง (หรือใช้ Environment Variable) ✅
เขียน Changeset ทุกครั้งที่แก้ไขแพ็กเกจ ✅
Merge Changeset → สร้าง PR เวอร์ชัน → ตรวจสอบ → Merge → Publish ✅
GitHub Actions ตั้งค่า NPM_TOKEN และ GITHUB_TOKEN ใน Secrets ✅
ตั้งค่า 2FA ในบัญชี NPM — ป้องกันการเผยแพร่โดยไม่ได้รับอนุญาต ✅
 
 
 
🔗 Related Notes
 
- [[Monorepo Dependency Management]] — จัดการ Dependencies ใน Monorepo
- [[Dependency Security]] — ความปลอดภัยก่อนและหลัง Publish
- [[CI/CD]] — รวม Release Workflow เข้า Pipeline
- [[Secure Coding Practices]] — ตรวจสอบโค้ดก่อนปล่อยสู่สาธารณะ
 
 
 
✅ สรุปสั้นๆ: เขียน Changeset → Merge → PR อัปเดตเวอร์ชันตรวจสอบได้ → Merge → Publish อัตโนมัติ — ง่าย ปลอดภัย และทุกการเปลี่ยนแปลงมีเอกสารบันทึกไว้ 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Turborepo + Changesets, Canary/Pre-release Versions, หรือ Publishing to GitHub Packages 😊