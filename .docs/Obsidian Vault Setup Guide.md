[]()title: "Obsidian Vault Setup Guide | คู่มือตั้งค่า Vault มาตรฐาน"
aliases:
 
- "ตั้งค่า Obsidian Vault"
- "มาตรฐานโครงสร้าง Vault"
slug: obsidian-vault-setup-guide
icon: 🏗️
color: purple
type: guide
status: active
priority: essential
tags:
- type/guide
- topic/obsidian
- topic/knowledge-management
- topic/setup
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — แผนที่ระบบความรู้ทั้งหมด]]"
parent:
- "[[MOC — แผนที่ระบบความรู้ทั้งหมด]]"
children: []
related:
- "[[MOC — แผนที่ระบบความรู้ทั้งหมด]]"
- "[[AGENTS WORKFLOWS]]"
- "[[Model Context Protocol]]"
- "[[Obsidian Properties]]"
 
 
 
🏗️ Obsidian Vault Setup Guide | คู่มือตั้งค่า Vault มาตรฐาน
 
 
 
🎯 วัตถุประสงค์
 
สร้างโครงสร้าง Vault ที่เป็นมาตรฐาน ตั้งแต่เริ่มต้น — ทำให้ค้นหาง่าย เชื่อมโยงกันได้ดี ขยายระบบได้ในอนาคต และทำงานร่วมกันได้ง่ายขึ้น
 
 
 
📂 ขั้นที่ 1: โครงสร้างโฟลเดอร์ที่แนะนำ
 
plaintext
  
Your-Vault/
├── 📁 00-MOCs/                    # แผนที่ความรู้หลัก
│   ├── MOC — แผนที่ระบบความรู้ทั้งหมด.md
│   ├── MOC — DevOps.md
│   ├── MOC — API Design.md
│   └── MOC — Knowledge Management.md
│
├── 📁 01-Concepts/                # แนวคิด หลักการ ความรู้พื้นฐาน
│   ├── Obsidian Properties.md
│   └── API Design.md
│
├── 📁 02-Resources/               # แหล่งอ้างอิง คู่มือ ความรู้เชิงลึก
│   ├── NGINX — Best Practices.md
│   └── Obsidian Vault Setup Guide.md
│
├── 📁 03-Templates/               # แม่แบบโน้ต
│   ├── Note — Standard.md
│   ├── Note — Reference.md
│   └── Note — Task.md
│
├── 📁 04-Areas/                   # ด้านงาน/โครงการเฉพาะ
│   ├── DevOps/
│   ├── API/
│   └── Personal/
│
├── 📁 05-Daily/                   # โน้ตประจำวัน
│   └── 2026-10-27.md
│
├── 📁 06-Attachments/             # รูปภาพ ไฟล์แนบ
│   ├── Images/
│   └── Files/
│
└── 📁 07-Archive/                 # เก็บของเก่า ไม่ได้ใช้แล้ว
    └── 2026-Q3/
 
 
💡 หลักการ PARA — Projects → Areas → Resources → Archives ปรับให้เข้ากับระบบความรู้ของคุณได้เลย ✅
 
 
 
⚙️ ขั้นที่ 2: ตั้งค่าเริ่มต้นที่สำคัญ
 
🔹 พื้นฐาน
 
1. Files & Links → ✅ Confirm file deletion — เปิดไว้ ป้องกันลบผิด
2. Files & Links → New link format → Shortest path when possible — ลิงก์สั้น สะอาด
3. Files & Links → Default location for new attachments → ในโฟลเดอร์เฉพาะ เช่น  06-Attachments/Images  — ไฟล์ไม่ปนกัน
4. Editor → ✅ Show inline title — ซ่อนชื่อซ้ำที่หัวโน้ต
5. About → ตั้งชื่อ Vault ให้ชัดเจน
 
🔹 ปลั๊กอินหลัก (Core Plugins)
 
เปิดใช้งานสิ่งเหล่านี้:
 
- ✅ Properties — จัดการข้อมูลเมตา
- ✅ Backlinks — ดูว่าโน้ตนี้ถูกอ้างอิงจากที่ไหนบ้าง
- ✅ Outgoing Links — ดูลิงก์ที่ออกจากโน้ตนี้
- ✅ Graph View — แผนภาพความเชื่อมโยง
- ✅ Tag Pane — ดูแท็กทั้งหมด
- ✅ Search — ค้นหาขั้นสูง
- ✅ Command Palette — กด  Ctrl/Cmd+P  คู่มือทุกคำสั่ง
- ✅ Templates — ใช้แม่แบบโน้ต
 
🔹 ปลั๊กอินชุมชนแนะนำ (Community Plugins)
 
- 🔄 Templater — แม่แบบอัจฉริยะ แทรกวันที่/ค่าอัตโนมัติ
- 📊 Dataview — สร้างรายการ ตาราง แดชบอร์ดจาก Properties
- 📅 Daily Notes / Periodic Notes — โน้ตประจำวัน/สัปดาห์
- 🔍 Better Search — ค้นหาได้ละเอียดขึ้น
- 📈 Excalidraw — วาดไดอะแกรมในโน้ต
- 🔗 Obsidian Git — สำรองและซิงค์ผ่าน Git (แนะนำมาก!)
 
 
 
📝 ขั้นที่ 3: สร้างแม่แบบโน้ตมาตรฐาน
 
สร้างไฟล์ใน  03-Templates/Note — Standard.md :
 
yaml
  
---
title: 
aliases: []
tags: []
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
type: note
status: in-progress
moc: 
parent: 
---

# <% tp.file.title %>

## 🎯 Summary

> เขียนสรุปสั้นๆ ที่นี่

---

## 📌 Content

เนื้อหาที่นี่...

---

## 🔗 Related Notes

- [[ชื่อโน้ตที่เกี่ยวข้อง]]

---

> ✅ สร้างด้วย: [[Obsidian Vault Setup Guide]]
 
 
 
 
🔗 ขั้นที่ 4: สร้างหน้าแรก — MOC หลัก
 
ไฟล์:  00-MOCs/MOC — แผนที่ระบบความรู้ทั้งหมด.md 
 
yaml
  
---
title: "แผนที่ระบบความรู้ทั้งหมด"
aliases: ["Home", "หน้าแรก"]
tags: [MOC, index]
type: moc
created: 2026-10-27
---

# 🌍 แผนที่ระบบความรู้ทั้งหมด

ยินดีต้อนรับสู่ระบบความรู้ของคุณ เลือกหัวข้อที่ต้องการสำรวจ:

## 📂 หมวดหลัก

### 💻 เทคโนโลยี & การพัฒนา
- [[MOC — DevOps]] — Container, K8s, IaC, NGINX
- [[MOC — API Design]] — REST, GraphQL, gRPC, Best Practices
- [[MOC — Software Engineering]] — การออกแบบระบบ, หลักการพัฒนา

### 🧠 ความรู้ & การจัดการ
- [[MOC — Knowledge Management]] — Obsidian, PARA, Zettelkasten
- [[Obsidian Vault Setup Guide]] — คู่มือตั้งค่า Vault นี้
- [[Obsidian Properties]] — คู่มือการใช้งาน Properties

## 📊 สถานะระบบ
- 📝 โน้ตทั้งหมด: `$=dv.pages().length`
- 🏷️ แท็กทั้งหมด: `$=dv.pages().flatMap(p=>p.file.tags).distinct().length`
- 📅 สร้างล่าสุด: `$=dv.pages().sort(p=>p.file.ctime, 'desc').limit(5).map(p=>`[[${p.file.name}]] — ${moment(p.file.ctime).format('YYYY-MM-DD')}`).join('<br>')`

---

> 💡 **วิธีใช้**: คลิกที่ลิงก์สีน้ำเงินเพื่อเข้าไปดูรายละเอียด → กด `Ctrl+←` เพื่อย้อนกลับมาที่นี่
 
 
 
 
🔒 ขั้นที่ 5: สำรอง & ซิงค์ข้อมูล
 
🔄 ด้วย Git (แนะนำฟรี & ปลอดภัย)
 
bash
  
# ในโฟลเดอร์ Vault ของคุณ
git init
echo ".obsidian/workspace.json" >> .gitignore
echo ".obsidian/plugins/obsidian-git/data.json" >> .gitignore
git add .
git commit -m "Initial commit: Vault structure"
# เชื่อมต่อกับ GitHub/GitLab repository ส่วนตัวของคุณ
 
 
💡 ใช้ปลั๊กอิน Obsidian Git → ตั้งค่าให้ commit และ push อัตโนมัติเป็นประจำ
 
☁️ ด้วยบริการอื่น
 
- Obsidian Sync — บริการทางการจากผู้พัฒนา
- Dropbox / OneDrive / Google Drive — ซิงค์โฟลเดอร์ปกติ ระวังการชนกันเมื่อแก้ไขพร้อมกันหลายเครื่อง
- iCloud Drive (เฉพาะ Apple) — ทำงานได้ดี แต่ระวังการอัปโหลดล่าช้า
 
 
 
✅ Checklist การตั้งค่าให้สมบูรณ์
 
สร้างโครงสร้างโฟลเดอร์ตามมาตรฐาน ✅
ตั้งค่า Obsidian พื้นฐานครบถ้วน ✅
เปิดปลั๊กอิน Core ที่จำเป็น ✅
ติดตั้งปลั๊กอินชุมชนพื้นฐาน ✅
สร้างแม่แบบโน้ตมาตรฐาน ✅
สร้างหน้าแรก / MOC หลัก ✅
ตั้งค่าการสำรองข้อมูล (Git หรือ Sync) ✅
ทดสอบสร้างโน้ตใหม่จากแม่แบบ ✅
ทดสอบลิงก์และ Backlinks ✅
 
 
 
⚠️ หลักการสำคัญที่อย่าลืม
 
💡 KISS — Keep It Simple, Stupid
 
- ไม่ต้องสมบูรณ์แบบตั้งแต่วันแรก — เริ่มง่ายๆ แล้วค่อยปรับ
- โครงสร้างที่ดี = ช่วยให้คุณค้นหาเจอ ไม่ใช่ทำให้สวย
- กฎสำคัญที่สุด: ใช้งานจริง สม่ำเสมอ — ระบบที่ดีที่สุดคือระบบที่คุณใช้จริงทุกวัน
 
 
 
🔗 Linked Mentions
 
- [[MOC — แผนที่ระบบความรู้ทั้งหมด]] — หน้าแรกของระบบความรู้
- [[AGENTS WORKFLOWS]] — ขั้นตอนการทำงานอัตโนมัติ
- [[Model Context Protocol]] — การเชื่อมต่อข้อมูลระหว่างระบบ
- [[Obsidian Properties]] — กำหนดคุณสมบัติให้โน้ต
 
 
 
✅ คู่มือตั้งค่า Vault เสร็จสมบูรณ์ครับ! เริ่มจากโครงสร้างพื้นฐาน แล้วค่อยขยายตามความต้องการใช้งานจริงได้เลย 😊
 
ต้องการเพิ่มหัวข้อใดเพิ่มเติมไหมครับ เช่น Git Workflow สำหรับ Vault, การซิงค์หลายเครื่อง, หรือย้ายจากระบบอื่นมา Obsidian 😊