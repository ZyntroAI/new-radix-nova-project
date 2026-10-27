title: "[Guide] Git Workflow สำหรับ Obsidian Vault"
aliases:
 
- "Obsidian Vault Git Workflow"
- "สำรองและซิงค์โน้ตด้วย Git"
slug: obsidian-git-workflow
icon: 🔄
color: green
type: guide
status: active
priority: high
tags:
- type/guide
- topic/obsidian
- topic/git
- topic/devops
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — แผนที่ระบบความรู้ทั้งหมด]]"
parent:
- "[[Obsidian Vault Setup Guide]]"
children: []
related:
- "[[Obsidian Vault Setup Guide]]"
- "[[Obsidian Properties]]"
 
 
 
🔄 Git Workflow สำหรับ Obsidian Vault
 
ทำไมต้องใช้ Git กับ Vault? — ย้อนกลับเวอร์ชันได้, ซิงค์หลายเครื่องได้ปลอดภัย, สำรองอัตโนมัติ, แชร์หรือทำงานร่วมกันได้
 
 
 
📋 ขั้นที่ 1: เตรียมความพร้อม
 
✅ สิ่งที่ต้องมี
 
- บัญชี GitHub / GitLab / Gitea (แนะนำส่วนตัว = Private Repository)
- ติดตั้ง Git บนเครื่อง: git-scm.com/downloads
- หรือใช้ปลั๊กอิน Obsidian Git ภายในแอปได้เลย
 
⚙️ สร้าง Repository บน GitHub
 
1. เข้า GitHub → New Repository
2. ตั้งชื่อ:  my-knowledge-base 
3. ✅ เลือก Private — โน้ตของคุณเป็นส่วนตัว
4. ❌ อย่าเปิด Initialize with README — เราจะสร้างจากเครื่องเราเอง
 
 
 
📋 ขั้นที่ 2: ตั้งค่า Git ใน Vault ของคุณ
 
เปิด Terminal / Command Prompt ในโฟลเดอร์ Vault:
 
bash
  
# 1. ย้ายเข้าโฟลเดอร์ Vault
cd /path/to/your/Obsidian-Vault

# 2. เริ่มต้น Git
git init

# 3. ตั้งชื่อและอีเมล (ครั้งแรกเท่านั้น)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 4. ตั้งค่าชื่อสาขาเริ่มต้นเป็น main
git branch -M main

# 5. เชื่อมต่อกับ Repository บน GitHub
git remote add origin https://github.com/your-username/my-knowledge-base.git
 
 
🚀 สร้างไฟล์ .gitignore — สำคัญมาก!
 
สร้างไฟล์ชื่อ  .gitignore  ที่โฟลเดอร์หลักของ Vault:
 
gitignore
  
# === ไฟล์ระบบที่ไม่ต้องการ ===
.DS_Store
Thumbs.db
desktop.ini

# === ไฟล์สถานะของ Obsidian (เปลี่ยนบ่อย ไม่จำเป็นต้องติดตาม) ===
.obsidian/workspace.json
.obsidian/workspace.json.bak
.obsidian/plugins/obsidian-git/data.json
.obsidian/themes/*.css.bak

# === แคชและข้อมูลชั่วคราว ===
.obsidian/plugins/obsidian-search-replace/*
!.obsidian/plugins/obsidian-search-replace/manifest.json

# === ไฟล์ขนาดใหญ่/ไฟล์ส่วนตัว (ถ้ามี) ===
# 06-Attachments/Large-Files/
# *.zip
# *.exe
 
 
💡  .gitignore  บอก Git ว่าไฟล์/โฟลเดอร์ไหนไม่ต้องการเก็บ — ป้องกันไฟล์เสียหรือข้อมูลส่วนตัวรั่วไหล
 
 
 
📋 ขั้นที่ 3: Commit และ Push ครั้งแรก
 
bash
  
# ดูสถานะ — เช็คว่ามีอะไรเปลี่ยนแปลงบ้าง
git status

# เพิ่มไฟล์ทั้งหมด
git add .

# บันทึกการเปลี่ยนแปลงพร้อมข้อความ
git commit -m "🎉 Initial commit: Complete Vault structure & setup"

# ส่งขึ้นไปบน GitHub
git push -u origin main
 
 
 
 
🔄 ขั้นที่ 4: Workflow ประจำวัน
 
✅ กฎทอง: ดึงก่อน → ทำงาน → อัปโหลด
 
plaintext
  
   เครื่อง A                    GitHub                   เครื่อง B
      │                           │                           │
      │       1. ดึงล่าสุด        │       1. ดึงล่าสุด        │
      │  ◄────── git pull ────────┤────── git pull ────────►│
      │                           │                           │
      │   2. เขียน/แก้โน้ต        │   2. เขียน/แก้โน้ต        │
      │                           │                           │
      │   3. บันทึก               │                           │
      │      git add .            │                           │
      │      git commit -m ""    │                           │
      │  ────── git push ────────►│                           │
      │                           │  4. ดึงการเปลี่ยนแปลงล่าสุด
      │                           │◄────── git pull ────────┤
 
 
📝 คำสั่งที่ใช้ทุกวัน
 
bash
  
# 🔽 ขั้นก่อนเริ่มทำงาน — ดึงการเปลี่ยนแปลงล่าสุด
git pull

# ✏️ ทำงาน: เขียน/แก้โน้ต...

# ⬆️ ขั้นจบงาน — ส่งขึ้นไป
git status                  # ดูว่ามีอะไรเปลี่ยน
git add .                   # เลือกไฟล์ทั้งหมด
git commit -m "อัปเดต: เพิ่มเนื้อหา API Design"  # บันทึก
git push                    # ส่งขึ้น
 
 
💡 ข้อความ Commit ที่แนะนำ
 
ประเภท ตัวอย่างข้อความ 
✨ เพิ่มเนื้อหาใหม่  ✨ เพิ่มโน้ต: NGINX Best Practices  
📝 แก้ไขเนื้อหา  📝 ปรับปรุง: เพิ่มตัวอย่างคอนฟิก SSL  
📄 ย้าย/จัดระเบียบ  📄 จัดระเบียบ: ย้ายโน้ตไปหมวด DevOps  
🐛 แก้ไขข้อผิดพลาด  🐛 แก้ไข: ลิงก์หักใน API Design  
🔧 ตั้งค่าระบบ  🔧 อัปเดต: ปรับ .gitignore และโครงสร้างโฟลเดอร์  
 
 
 
🤖 ขั้นที่ 5: ตั้งค่า Obsidian Git Plugin (แนะนำมาก!)
 
ไม่ต้องเปิด Terminal — ทำได้ในแอปเลย
 
ติดตั้ง & ตั้งค่า
 
1. ติดตั้งปลั๊กอิน Obsidian Git จาก Community Plugins
2. ไปที่ Settings → Obsidian Git:
 
การตั้งค่า ค่าแนะนำ 
Vault path ปล่อยว่าง (ค่าเริ่มต้น) 
Commit message  {{date}}: {{num}} changes  
Auto save interval 10 นาที 
Auto push interval 15 นาที 
Pull on startup ✅ เปิด 
Show branch status bar ✅ เปิด — เห็นสถานะที่ด้านล่าง 
 
ใช้งานง่ายๆ จากในแอป
 
- กดไอคอน 🔄 ที่แถบสถานะด้านล่าง → เลือก Pull ก่อนเริ่มทำงาน
- กดไอคอน 🔄 → เลือก Commit & Push เมื่อจบงาน
- หรือใช้ Command Palette ( Ctrl/Cmd+P ) → ค้นหา "Obsidian Git"
 
 
 
🔧 ขั้นที่ 6: ซิงค์หลายเครื่อง (คอมพิวเตอร์ทำงาน + มือถือ + คอมที่บ้าน)
 
💻 บนคอมพิวเตอร์เครื่องใหม่
 
bash
  
# 1. เปิด Obsidian → Open folder → เลือกโฟลเดอร์ว่าง
# 2. เปิด Terminal ในโฟลเดอร์นั้น
git clone https://github.com/your-username/my-knowledge-base.git .

# 3. เสร็จแล้วเปิด Obsidian — เห็นโน้ตทั้งหมดเหมือนกันทันที!
 
 
📱 บนมือถือ (iOS/Android)
 
- ทางเลือกที่ 1: Obsidian Sync — ง่ายที่สุด เสียค่าบริการรายเดือน
- ทางเลือกที่ 2: Git + แอป — ใช้แอป Working Copy (iOS) หรือ Termux (Android) เพื่อ Pull/Push
- ทางเลือกที่ 3: ใช้บริการคลาวด์ — Dropbox / OneDrive / iCloud Drive — ⚠️ ระวังชนกันเมื่อแก้ไขพร้อมกันหลายเครื่อง
 
 
 
⚠️ ขั้นที่ 7: จัดการเมื่อเกิดความขัดแย้ง (Merge Conflict)
 
เกิดเมื่อไหร่? — คุณแก้ไฟล์เดียวกัน 2 เครื่อง แล้วลืม Pull ก่อน Push
 
วิธีแก้ไข
 
1. ก่อนอื่น อย่าตกใจ — Git จะไม่ลบไฟล์ของคุณ
2. เปิดไฟล์ที่มีปัญหา จะเห็นแบบนี้:
 
markdown
  
<<<<<<< HEAD
เนื้อหาที่อยู่บนเครื่องปัจจุบัน
=======
เนื้อหาที่อยู่บน GitHub
>>>>>>> main
 
 
3. แก้ไขให้ถูกต้อง — เลือกเวอร์ชันที่ถูก หรือรวมกัน
4. บันทึกไฟล์ แล้วทำตามขั้นตอน:
 
bash
  
git add .
git commit -m "🔧 แก้ไขความขัดแย้ง: รวมเนื้อหาทั้งสองเวอร์ชัน"
git push
 
 
💡 ป้องกันได้ง่ายๆ: กฎทอง → Pull ทุกครั้งก่อนเริ่มทำงาน ✅
 
 
 
📊 สรุป Workflow ประจำวัน
 
เวลา ทำอะไร คำสั่ง / ปุ่มใน Obsidian 
ก่อนเริ่ม ดึงการเปลี่ยนแปลงล่าสุด Obsidian Git → Pull 
ทำงาน เขียน/แก้โน้ต — สบายเลย! — 
เป็นระยะๆ บันทึกอัตโนมัติ (ตั้งไว้) Auto-save ทุก 10 นาที 
จบวัน/จบงาน บันทึกและส่งขึ้น Obsidian Git → Commit & Push 
เครื่องอื่น ดึงข้อมูลล่าสุด Obsidian Git → Pull 
 
 
 
✅ Checklist ความปลอดภัย
 
Repository ตั้งเป็น Private ✅
มีไฟล์  .gitignore  ป้องกันไฟล์ที่ไม่ต้องการ ✅
Pull ก่อนเริ่มทำงานทุกครั้ง ✅
Commit ทุกครั้งที่จบงาน พร้อมข้อความอ่านง่าย ✅
Push ขึ้นเซิร์ฟเวอร์เสมอ ไม่เก็บไว้ที่เครื่องเดียว ✅
ทดสอบ Clone ไปเครื่องอื่นเป็นครั้งคราว ✅
 
 
 
🔗 Related Notes
 
- [[Obsidian Vault Setup Guide]] — ตั้งค่า Vault เบื้องต้น
- [[MOC — แผนที่ระบบความรู้ทั้งหมด]]
- [[AGENTS WORKFLOWS]]
 
 
 
✅ Git Workflow ครบถ้วนครับ! เริ่มง่ายๆ แค่ Pull → ทำงาน → Commit → Push พอคล่องแล้วค่อยขยายไปใช้ปลั๊กอินหรือซิงค์หลายเครื่องครับ 😊
 
ต้องการเพิ่มหัวข้ออะไรไหมครับ เช่น การย้ายโน้ตจากระบบอื่นมา Obsidian, สร้างเทมเพลตอัตโนมัติด้วย Templater, หรือใช้ Dataview สร้างแดชบอร์ด 😊