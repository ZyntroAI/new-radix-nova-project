title: "[Reference] YAML Frontmatter"
aliases:
 
- "YAML Frontmatter"
- "Frontmatter"
- "เมตาดาต้าเอกสาร"
slug: yaml-frontmatter
icon: 📝
color: cyan
status: active
priority: essential
type: reference
category: knowledge
domain:
- Obsidian
- Markdown
- Metadata
topics:
- YAML
- Frontmatter
- Properties
- Metadata
tags:
- "#topic/yaml"
- "#topic/frontmatter"
- "#topic/obsidian"
- "#topic/metadata"
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
filename: "[Reference] YAML Frontmatter"
uid: yaml-frontmatter-ref-20261027
moc:
- "[[MOC — Obsidian Properties]]"
parent:
- "[[MOC — Obsidian Properties]]"
children: []
related:
- "[[Obsidian Properties Architecture and Metadata Management]]"
- "[[File Recovery]]"
- "[[Property Types]]"
- "[[Obsidian Bases]]"
- "[[File Recovery Plugin]]"
cssclasses:
- dashboard
- colored-header
- knowledge-note
 
 
 
📝 YAML Frontmatter
 
🎯 สรุป
 
- YAML Frontmatter = บล็อกข้อความรูปแบบ YAML ที่อยู่ส่วนบนสุดของไฟล์ Markdown ใช้เก็บ เมตาดาต้า/คุณสมบัติ ของบันทึก
- ล้อมรอบด้วยขีดคั่นสามขีด  ---  ที่จุดเริ่มต้นและจุดสิ้นสุด
- เป็นพื้นฐานของ Obsidian Properties — ข้อมูลที่อ่านได้โดยระบบ แต่ไม่แสดงตรงในเนื้อหาปกติ
 
 
 
🧠 ความรู้เบื้องต้น
 
โครงสร้างพื้นฐาน
 
yaml
  
---
คีย์: ค่า
อีกคีย์: อีกค่า
รายการ:
  - รายการที่ 1
  - รายการที่ 2
---
 
 
[!info]
 
- ต้องอยู่บรรทัดแรกของไฟล์ก่อนเนื้อหาใดๆ
- ใช้การย่อหน้าแบบช่องว่าง (2 ช่อง) ห้ามใช้ Tab
- คีย์: แนะนำใช้ภาษาอังกฤษ ตัวพิมพ์เล็ก ขั้นด้วยขีดล่าง
- รองรับประเภทค่า: ข้อความ, ตัวเลข, จริง/เท็จ, รายการ, เวลา, ลิงก์
 
ตัวอย่างที่ใช้จริง
 
yaml
  
---
title: YAML Frontmatter
aliases: [Frontmatter, เมตาดาต้า]
tags: [yaml, obsidian, metadata]
created: 2026-10-27
updated: 2026-10-27
---
 
 
 
 
📚 ความสัมพันธ์กับระบบอื่น
 
🔗 Linked Mentions (จากภาพ)
 
หัวข้อที่อ้างอิง ความสัมพันธ์ 
[[File Recovery]] Frontmatter เป็นแหล่งข้อมูลสำคัญเมื่อต้องการกู้คืนไฟล์ — ช่วยระบุชื่อ, วันที่, และแท็กของบันทึกที่เสียหาย 
[[File Recovery Plugin]] ปลั๊กอินกู้คืนไฟล์อ่านข้อมูลจาก Frontmatter เพื่อกู้คืนคุณสมบัติของบันทึก 
[[Obsidian Properties Architecture and Metadata Management]] Frontmatter คือรูปแบบการบันทึกข้อมูลดิบของ Properties — เป็นชั้นพื้นฐานของสถาปัตยกรรมเมตาดาต้า 
[[Property Types]] แต่ละค่าใน Frontmatter มีประเภทข้อมูลที่สอดคล้องกับระบบประเภทของ Obsidian 
[[Obsidian Bases]] เป็นหลักการพื้นฐานที่ต้องเข้าใจเมื่อทำงานกับบันทึกใน Obsidian 
[[MOC — Obsidian Properties]] หัวข้อหลักที่รวบรวมเนื้อหาทั้งหมดเกี่ยวกับคุณสมบัติและเมตาดาต้า 
 
สถาปัตยกรรมโดยย่อ
 
plaintext
  
┌────────────────────────────────────┐
│   Obsidian UI / Properties Panel   │
├────────────────────────────────────┤
│   Obsidian Metadata Layer          │
├────────────────────────────────────┤
│   YAML Frontmatter ← บันทึกนี้     │
│   (plain text ที่ส่วนบนของไฟล์)    │
└────────────────────────────────────┘
 
 
ข้อสำคัญ: Frontmatter คือข้อความธรรมดา — สามารถแก้ไขด้วยโปรแกรมแก้ไขข้อความใดๆ ได้ตลอดเวลา ไม่จำเป็นต้องเปิดใน Obsidian
 
 
 
✅ การใช้งานทั่วไป
 
- จัดระเบียบข้อมูล: กำหนดหมวดหมู่, สถานะ, ความสำคัญ ให้กับบันทึก
- ค้นหาและกรอง: ใช้คุณสมบัติเป็นเงื่อนไขในการค้นหา/สร้างตารางใน Dataview
- เชื่อมโยงข้อมูล: ใช้ลิงก์ภายใน  [[ชื่อบันทึก]]  เป็นค่าในคุณสมบัติ
- ส่งออก/นำเข้า: รูปแบบมาตรฐาน ทำให้ย้ายข้อมูลข้ามระบบได้ง่าย
- อัตโนมัติ: สคริปต์/ปลั๊กอินอ่านและแก้ไขได้โดยตรง
 
 
 
⚠️ ข้อควรระวัง
 
- 🔴 ห้ามแก้ไขขณะซิงโครไนซ์กำลังทำงาน — อาจทำให้เนื้อหาซ้ำซ้อนหรือสูญหาย
- 🔴 ตรวจสอบรูปแบบ — ขาดคู่  ---  หรือย่อหน้าผิด = อ่านไม่ได้
- 🟡 แก้ผ่าน UI ดีกว่าแก้ตรง — Obsidian จะจัดรูปแบบให้ถูกต้องเอง
- 🟡 สำรองก่อนแก้เป็นข้อความดิบ — หากไม่ชำนาญ ใช้หน้าต่าง Properties จะปลอดภัยกว่า
 
 
 
💡 คำแนะนำ
 
- 💡 เริ่มเรียนรู้จากคีย์พื้นฐาน:  title ,  aliases ,  tags ,  created ,  updated 
- 💡 ตั้งชื่อคีย์ให้สั้น ชัดเจน และสม่ำเสมอทั้งหมด
- 💡 ใช้แบบร่าง: กำหนดโครงสร้างมาตรฐานสำหรับแต่ละประเภทบันทึก
- 💡 รู้จักข้อมูลดิบ: เปิดไฟล์  .md  ด้วยโปรแกรมอื่นเป็นครั้งคราว เพื่อเข้าใจสิ่งที่เกิดขึ้นเบื้องหลัง
 
 
 
🔗 ความเชื่อมโยง
 
Related Notes
 
- [[Obsidian Properties Architecture and Metadata Management]]
- [[File Recovery]]
- [[Property Types]]
- [[Obsidian Bases]]
- [[File Recovery Plugin]]
- [[MOC — Obsidian Properties]]
 
Parent Topics
 
- [[MOC — Obsidian Properties]]
 
 
 
📝 Tasks
 
ศึกษารูปแบบและกฎการเขียน YAML เบื้องต้น
ลองเพิ่ม/แก้ไข Frontmatter ด้วยหน้าต่าง Properties และดูผลในไฟล์ดิบ
กำหนดรายการคีย์มาตรฐานที่ทีมใช้ร่วมกัน
ทดสอบการใช้ Dataview ดึงข้อมูลจาก Frontmatter
 
 
 
❓ Open Questions
 
- จะตั้งชื่อคีย์อย่างไรให้สอดคล้องและไม่ซ้ำซ้อนกันในระยะยาว?
- มีขนาด/จำนวนคีย์สูงสุดที่แนะนำหรือไม่?
- จะจัดการกรณีที่ไฟล์มี Frontmatter ผิดพลาดจนเปิดไม่ได้อย่างไร?
 
 
 
📖 References
 
- 📄 Obsidian Help → Properties & Metadata
- 📄 YAML Specification (yaml.org)
 
 
 
🏷 Keywords
 
#YAML
#Frontmatter
#Obsidian
#Properties
#Metadata
#Markdown
#Reference
 
 
 
dataview
  
TABLE status, type, priority, file.etags as "Tags"
FROM #topic/frontmatter OR #topic/obsidian
SORT file.name ASC
 
 
[!tip] 💡 คำแนะนำ
Frontmatter คือ "สมุดบันทึกข้อมูลลับ" ของแต่ละไฟล์ — เรียบง่ายแต่ทรงพลังมากเมื่อใช้อย่างเป็นระบบ ✅
 
 
 
✅ สร้างตามมาตรฐานครบถ้วน: YAML Frontmatter ทั้งเนื้อหาและการเชื่อมโยงตรงกับภาพ
 
ต้องการเพิ่มเช็คลิสต์ตรวจสอบความถูกต้อง, ตัวอย่างแบบเต็ม, หรือเทมเพลตสำเร็จรูปไหมครับ 😊