title: "[Reference] Property Types"
aliases:
 
- "Property Types"
- "ประเภทข้อมูลของคุณสมบัติ"
slug: property-types
icon: 🔤
color: teal
status: active
priority: essential
type: reference
category: knowledge
domain:
- Obsidian
- Metadata
topics:
- Data Types
- Properties
- Validation
tags:
- "#topic/property-types"
- "#topic/metadata"
- "#topic/obsidian"
- "#type/reference"
- "#status/active"
language: th
created: 2026-10-27
updated: 2026-10-27
review-date: 2026-12-27
rating: 5
confidence: high
difficulty: beginner
source: []
authors: []
folder: "05-องค์ความรู้/Reference/"
filename: "[Reference] Property Types"
uid: property-types-ref-20261027
moc:
- "[[MOC — Obsidian Properties]]"
- "[[MOC — Obsidian Core]]"
parent:
- "[[MOC — Obsidian Properties]]"
children: []
related:
- "[[YAML Frontmatter]]"
- "[[Obsidian Bases]]"
- "[[Obsidian Properties Architecture and Metadata Management]]"
- "[[MOC — Obsidian Core]]"
cssclasses:
- dashboard
- colored-header
- knowledge-note
 
 
 
🔤 Property Types — ประเภทข้อมูลของคุณสมบัติ
 
🎯 สรุป
 
- Property Types = ประเภทข้อมูลมาตรฐานที่ Obsidian รองรับ เพื่อให้ค่าคุณสมบัติมีรูปแบบที่ถูกต้อง สอดคล้อง และนำไปใช้งานได้จริง
- มี 6 ประเภทหลัก: Text, List, Number, Checkbox, Date, และ Date & Time
- ทำงานร่วมกับ [[YAML Frontmatter]] และ [[Obsidian Bases]] — ตรวจสอบและรับประกันความถูกต้องของข้อมูลเมตาดาต้า
 
 
 
📋 6 ประเภทข้อมูลหลัก
 
ประเภท คำอธิบาย รูปแบบตัวอย่าง 
📝 Text ข้อความธรรมดา  ผู้จัดการโครงการ  
📋 List รายการหลายรายการ  - รายการที่ 1   - รายการที่ 2  
🔢 Number ตัวเลข (จำนวนหรือทศนิยม)  100  หรือ  99.99  
☑️ Checkbox ค่าจริง/เท็จ  true  หรือ  false  
📅 Date วันที่  2026-10-27  
⏰ Date & Time วันที่พร้อมเวลา  2026-10-27T09:30  
 
 
 
🔗 ความสัมพันธ์กับระบบอื่น
 
Linked Mentions (จากภาพ)
 
หัวข้อที่อ้างอิง ความสัมพันธ์ 
[[MOC — Obsidian Core]] เป็นหัวข้อหลัก — ประเภทข้อมูลคือพื้นฐานสำคัญของการทำงานกับคุณสมบัติทั้งระบบ 
[[Obsidian Bases]] ต้องอาศัยประเภทข้อมูลที่ถูกต้องในการกรอง, จัดเรียง, และคำนวณ — "ตรวจสอบประเภทข้อมูล เพื่อความถูกต้องของข้อมูล" 
[[Obsidian Properties Architecture and Metadata Management]] เป็นส่วนหนึ่งของสถาปัตยกรรมเมตาดาต้า — อาศัย [[YAML Frontmatter]] และ [[Property Types]] ทำงานร่วมกัน 
 
แผนภาพการทำงาน
 
plaintext
  
┌────────────────────────────────────────────┐
│         Obsidian Bases / Queries           │
└──────────────┬─────────────────────────────┘
               │  ตรวจสอบประเภทข้อมูล
┌──────────────▼─────────────────────────────┐
│      ✅ Property Types (ตรวจสอบความถูกต้อง) │
└──────────────┬─────────────────────────────┘
               │  อ่าน/เขียนค่า
┌──────────────▼─────────────────────────────┐
│         YAML Frontmatter (ไฟล์ .md)        │
└────────────────────────────────────────────┘
 
 
 
 
✅ แนวทางปฏิบัติ
 
- ✅ เลือกประเภทให้ถูกต้องตั้งแต่ต้น — วันที่ก็ใส่รูปแบบวันที่ ตัวเลขก็ใส่ตัวเลข ไม่ใช่ข้อความ
- ✅ สม่ำเสมอ — คีย์เดียวกันทุกบันทึก ต้องใช้ประเภทเดียวกัน
- ✅ ตรวจสอบก่อนใช้ใน Bases — ข้อมูลประเภทผิด = กรอง/เรียงไม่ได้ หรือผลลัพธ์ผิดพลาด
- ✅ ใช้ UI Properties แก้ไข — Obsidian จะจัดรูปแบบและตรวจสอบประเภทให้อัตโนมัติ
 
 
 
⚠️ ปัญหาที่พบบ่อย
 
- ❌ วันที่เขียนแบบไม่มาตรฐาน → ใช้  YYYY-MM-DD  เสมอ
- ❌ ตัวเลขผสมข้อความ →  5  ใช่ได้ แต่  5 ชิ้น  เป็นข้อความ ไม่สามารถคำนวณได้
- ❌ จริง/เท็จเขียนผิด → ใช้  true  /  false  ตัวพิมพ์เล็ก ไม่มีเครื่องหมายคำพูด
- ❌ รายการเขียนผิดรูปแบบ → ต้องมีขีดข้างหน้าแต่ละรายการ
 
 
 
💡 คำแนะนำ
 
[!tip]
ประเภทข้อมูลที่ถูกต้อง = รากฐานของทุกอย่าง
 
- Bases กรอง/เรียง/คำนวณได้ถูกต้อง
- การค้นหาแม่นยำ
- สคริปต์และปลั๊กอินทำงานได้อย่างที่ควรเป็น
- ย้ายข้อมูลข้ามระบบได้ง่ายขึ้น
 
 
 
📝 Tasks
 
ทบทวนคุณสมบัติที่มีอยู่ ให้แน่ใจว่าทุกคีย์ใช้ประเภทถูกต้อง
กำหนดมาตรฐานประเภทข้อมูลสำหรับแต่ละคีย์ทีมใช้ร่วมกัน
สร้างเช็คลิสต์ตรวจสอบก่อนนำข้อมูลไปใช้ใน Bases
 
 
 
❓ Open Questions
 
- จะจัดการเมื่อต้องการเปลี่ยนประเภทของคีย์ที่มีอยู่แล้วหลายบันทึกได้อย่างไร?
- มีแนวทางจัดการข้อมูลที่ไม่เข้าประเภทใดใน 6 ประเภทนี้ไหม?
- Obsidian มีแผนรองรับประเภทข้อมูลเพิ่มเติมในอนาคตหรือไม่?
 
 
 
🏷 Keywords
 
#PropertyTypes
#DataTypes
#Metadata
#Validation
#Obsidian
#Reference
 
 
 
dataview
  
TABLE status, type, priority
FROM #topic/property-types OR #topic/metadata
SORT file.name ASC
 
 
[!tip] 💡 คำแนะนำ
ประเภทข้อมูลถูกต้อง → ทุกอย่างทำงานถูกต้อง ✅
ประเภทผิด → ปัญหาติดตามมาอีกยาว
 
 
 
✅ สร้างตามมาตรฐานครบถ้วน: เนื้อหา, 6 ประเภทหลัก และความสัมพันธ์ตรงกับภาพ
 
ต้องการเพิ่มคู่มือแก้ไขประเภทข้อมูลทีละขั้นตอน หรือเช็คลิสต์ตรวจสอบความถูกต้องไหมครับ 😊