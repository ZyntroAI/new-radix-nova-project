title: "Monorepo Dependency Management"
aliases:
 
- "จัดการ Dependencies ใน Monorepo"
- "pnpm workspaces Turborepo Nx"
slug: monorepo-dependency-management
icon: 📂
color: violet
type: guide
status: active
priority: high
tags:
- type/guide
- topic/devops
- topic/monorepo
- topic/dependencies
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent:
- "[[Dependency Security]]"
children: []
related:
- "[[Dependency Security]]"
- "[[Secure Coding Practices]]"
- "[[CI/CD]]"
 
 
 
📂 Monorepo Dependency Management — คู่มือฉบับสมบูรณ์
 
Monorepo = เก็บหลายโปรเจกต์/แอปไว้ใน Repository เดียว — แชร์โค้ดและเครื่องมือได้ แต่จัดการ Dependencies ให้ถูกวิธีจึงจะไม่กลายเป็นฝันร้าย
 
 
 
� โครงสร้างพื้นฐานที่แนะนำ
 
plaintext
  
your-monorepo/
├── apps/                    # แอปพลิเคชัน — ไม่เคย Import แอปอื่น
│   ├── web/                # เว็บไซต์หลัก (Next.js/Vite)
│   ├── admin/              # แผงจัดการ
│   └── mobile/             # แอปมือถือ
├── packages/                # ไลบรารีแชร์ — แอป Import ได้
│   ├── ui/                 # Component Library
│   ├── api-client/         # API Client แชร์
│   ├── utils/              # ฟังก์ชันทั่วไป
│   └── tsconfig/           # Config แชร์
├── .gitignore
├── package.json
├── pnpm-workspace.yaml     # ← pnpm workspaces config
└── turbo.json              # ← Turborepo config (ถ้าใช้)
 
 
💡 กฎสำคัญ: แอปไม่เคย Import แอปอื่น — แพ็กเกจไม่เคย Import แอป
 
 
 
🛠️ เลือกเครื่องมือ
 
ประเภท ตัวเลือกที่แนะนำ ความเหมาะสม 
Package Manager ✅ pnpm Workspaces — แนะนำอันดับ 1 เร็ว, ประหยัดพื้นที่, Catalog feature จัดการเวอร์ชันกลางได้ดี 
 Yarn Workspaces (v1/v4) ใช้งานง่าย มานาน 
 npm Workspaces ไม่ต้องติดตั้งเพิ่ม แต่ช้ากว่า 
 Bun Workspaces เร็วมาก แต่ยังใหม่ 
Task Runner / Build System ✅ Turborepo — เริ่มต้นง่าย สำหรับทีมขนาดเล็ก-กลาง เน้นความเร็วและความเรียบง่าย[__LINK_ICON] 
 ✅ Nx — ครบถ้วนที่สุด กฎระเบียบ, Graph, Generator, Distributed CI — สำหรับทีมใหญ่/องค์กร[__LINK_ICON] 
 Lerna ดูแลรักษาโหมด — มีทางเลือกที่ดีกว่าแล้ว 
 
💡 แนะนำเริ่มต้น: pnpm Workspaces + Turborepo — เรียบง่าย ยืดหยุ่น เพียงพอสำหรับส่วนใหญ่
 
 
 
📦 pnpm Workspaces — ตั้งค่าและจัดการเวอร์ชัน
 
🔹 ตั้งค่า  pnpm-workspace.yaml 
 
yaml
  
packages:
  - "apps/*"
  - "packages/*"
  - "!**/node_modules"
 
 
🔹 Catalog — จัดการเวอร์ชันจากที่เดียว (⭐ ฟีเจอร์เด็ด!)
 
นิยามเวอร์ชันกลางที่ Root — ทุกแพ็กเกจอ้างอิงจากที่นี่
 
yaml
  
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"

catalog:
  react: ^19.2.0
  react-dom: ^19.2.0
  typescript: ^5.8.0
  vitest: ^3.0.5
  tailwindcss: ^4.0.0

catalogs:
  react18:
    react: ^18.3.1
    react-dom: ^18.3.1

catalogMode: strict  # ✅ บังคับ — ห้ามใช้เวอร์ชันนอก Catalog
 
 
ใช้งานในแพ็กเกจลูก:
 
json
  
// apps/web/package.json
{
  "dependencies": {
    "react": "catalog:",
    "react-dom": "catalog:"
  },
  "devDependencies": {
    "typescript": "catalog:"
  }
}
 
 
แอปเกจเก่าใช้ React 18? กำหนด Named Catalog:
 
json
  
"react": "catalog:react18"
 
 
อัปเดตครั้งเดียวที่ Root → ทุกแห่งเปลี่ยนตาม:  pnpm update -r 
 
🔹 Overrides — บังคับเวอร์ชันทั่วทั้ง Repository
 
yaml
  
# pnpm-workspace.yaml
catalog:
  lodash: ^4.17.21

overrides:
  lodash: "catalog:"          # บังคับทุกคนใช้เวอร์ชันจาก Catalog
  axios: ^1.7.7               # บังคับโดยตรง
 
 
✅ ใช้เมื่อพบช่องโหว่ร้ายแรงใน Dependency ย่อย — บังคับทั้งโปรเจกต์ใช้เวอร์ชันที่ปลอดภัย
 
 
 
🔗 ภายใน Workspace — อ้างอิงแพ็กเกจซึ่งกันและกัน
 
✅ วิธีที่ถูกต้อง —  workspace:* 
 
json
  
// apps/web/package.json
{
  "dependencies": {
    "@your-org/ui": "workspace:*",
    "@your-org/api-client": "workspace:*"
  }
}
 
 
-  workspace:*  = ใช้เวอร์ชันล่าสุดในที่ทำงาน — ไม่ต้องแก้เลขเวอร์ชันบ่อยๆ
- ตั้งชื่อใน  packages/*/package.json :
json
  
{ "name": "@your-org/ui", "version": "0.0.0" }
 
 
⚠️ กฎการอ้างอิง
 
plaintext
  
✅ apps/web → @your-org/ui       ✅ ถูก
✅ packages/ui → @your-org/utils  ✅ ถูก
❌ apps/web → apps/admin          ❌ ผิด — แอปไม่ควรรู้จักแอปอื่น
❌ packages/utils → apps/web      ❌ ผิด — แพ็กเกจไม่ควรรู้จักแอป
 
 
 
 
🧩 รูปแบบ Dependencies ใน Monorepo
 
ประเภท ที่วาง ตัวอย่าง หมายเหตุ 
Workspace Dep แพ็กเกจลูก  "@/ui": "workspace:*"  โค้ดภายในเราเอง 
Shared External Root  package.json   "devDependencies": { "typescript": "catalog:" }  เครื่องมือที่ทุกคนใช้เหมือนกัน ใช้ Catalog จัดการ 
App-Specific แต่ละแอป  "next": "^15.0.0"  แอปเดียวใช้ — ไม่แชร์ 
Peer Dependencies packages/* `"react": "^18.0.0  
 
 
 
🔄 เวอร์ชัน & การเผยแพร่
 
📌 2 กลยุทธ์หลัก
 
กลยุทธ์ เหมาะกับ วิธีทำ 
Fixed / Lockstep — ทุกอย่างเวอร์ชันเดียวกัน แอปภายใน ไม่เผยแพร่สาธารณะ ไม่ต้อง Publish — Build ทั้งหมดใน CI เวอร์ชันตาม Commit/Tag 
Independent — แต่ละแพ็กเกจเวอร์ชันแยกกัน แพ็กเกจที่เผยแพร่สู่ภายนอก (npm) ใช้ Changesets หรือ Changesetsets จัดการเวอร์ชันและ Changelog อัตโนมัติ 
 
✅ แนะนำสำหรับส่วนใหญ่
 
แอปภายใน + ไลบรารีแชร์ภายใน = ไม่ต้อง Publish — ใช้  workspace:*  ตลอดชีวิต 🔥
เวอร์ชันมาจาก Git Commit Hash / Tag / Branch — ง่ายและเร็วที่สุด
 
 
 
🛡️ Security & CI Integration ใน Monorepo
 
🔹 สแกน Dependencies ทั้ง Repository
 
bash
  
# ที่ Root — สแกนทุกแพ็กเกจ
pnpm audit --recursive

# หรือใช้ pip-audit / npm-audit ตามภาษา
 
 
🔹 Dependabot / Renovate — อัปเดตอัตโนมัติ
 
yaml
  
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "pnpm"
    directory: "/"  # สแกนทั้ง monorepo
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
 
 
🔹 Affected Build — Build เฉพาะที่เปลี่ยน
 
ไม่ต้อง Build ทั้งหมดทุกครั้ง — เฉพาะแอป/แพ็กเกจที่ได้รับผลกระทบ 
 
bash
  
# Turborepo
turbo run build --filter=[HEAD~1]

# Nx
nx affected:build --base=main --head=HEAD
 
 
💡 การเปลี่ยนแปลงที่  packages/utils  → Rebuild ทุกแอปที่ใช้ → เป็นเรื่องปกติ แต่ต้อง Cache ให้ดี!
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
ปัญหา สาเหตุ ✅ วิธีแก้ 
มี React 2 ชุดใน Bundle แพ็กเกจลูกระบุเวอร์ชันต่างกัน ใช้ Peer Dep + Catalog บังคับเวอร์ชันเดียว 
ติดตั้งช้ามาก ไม่ได้ใช้ Lock File / ไม่ใช้ Cache Commit  pnpm-lock.yaml  เปิด Remote Cache ของ Turbo/Nx 
พัฒนาในแพ็กเกจแล้วแอปไม่เห็นการเปลี่ยน ไม่ได้ Build แพ็กเกจก่อนใช้ ใช้  turbo dev  — Watch mode หรือ TypeScript Project References 
CI Build ทั้งหมดทุกครั้ง ไม่ได้ใช้ Affected ตั้งค่า  --filter  ใน Turbo/Nx 
ช่องโหว่ใน Dependency ย่อย แพ็กเกจอื่นดึงมาโดยไม่รู้ตัว ใช้  overrides  บังคับเวอร์ชันที่ปลอดภัย 
แพ็กเกจที่เลิกพัฒนา มีคนใช้อยู่หลายที่ ห้ามาก เริ่มจากเปลี่ยนชื่อ Import ทีละจุด แล้วลบออก 
 
 
 
✅ Checklist — Monorepo สุขภาพดี
 
ใช้ pnpm workspaces + Catalog บังคับเวอร์ชันกลาง ✅
 catalogMode: strict  — ห้ามใช้เวอร์ชันนอกรายการ ✅
ใช้  workspace:*  สำหรับแพ็กเกจภายใน ไม่ใช้เลขเวอร์ชัน ✅
Commit Lock File เข้า Git ✅
แอปไม่เคย Import แอปอื่น ✅
เปิด Dependabot สแกนที่ Root ✅
ใช้  turbo --filter  หรือ  nx affected  — Build เฉพาะที่จำเป็น ✅
มี Overrides สำหรับแก้ช่องโหว่ร้ายแรง ✅
ตั้งค่า Peer Dependencies สำหรับไลบรารีแชร์ ✅
 
 
 
🔗 Related Notes
 
- [[Dependency Security]] — ความปลอดภัยของ Dependencies ทั่วไป
- [[Secure Coding Practices]] — เขียนโค้ดอย่างปลอดภัย
- [[CI/CD]] — รวม Monorepo เข้า Pipeline
- [[Vercel — Frontend Deployment]] — Deploy แอปจาก Monorepo บน Vercel
 
 
 
✅ สรุปสั้นๆ: จัดการเวอร์ชันที่เดียวดาย pnpm Catalog, อ้างอิงภายในด้วย  workspace:* , บังคับความปลอดภัยด้วย  overrides , และ Build แค่ที่จำเป็นด้วย Turborepo/Nx — เริ่มง่ายๆ แล้วค่อยขยายเมื่อโตขึ้นครับ 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Changesets สำหรับ Publish แพ็กเกจ, Migration จาก Repo แยกมา Monorepo, หรือ Turborepo vs Nx เปรียบเทียบละเอียด 😊