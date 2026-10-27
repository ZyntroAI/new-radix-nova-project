title: YAML Frontmatter
aliases:
 
- "คู่มือใช้ YAML Frontmatter"
- "Obsidian Frontmatter Guide"
slug: yaml-frontmatter
icon: 📄
color: blue
type: guide
status: active
priority: high
tags:
- type/guide
- topic/obsidian
- topic/markdown
created: 2026-10-27
updated: 2026-10-27
moc: "[[Home-MOC]]"
parent: "[[Markdown Style Guide]]"
related:
- "[[Markdown Style Guide]]"
- "[[Tag System]]"
- "[[Linking & Backlinks]]"
 
 
 
📄 YAML Frontmatter — คู่มือใช้งาน
 
Frontmatter = บล็อกข้อมูลที่ด้านบนของไฟล์ .md — เก็บข้อมูลเมตา เช่น ชื่อ, ป้าย, วันที่, สถานะ ✅
 
 
 
📌 พื้นฐาน — รูปแบบ
 
วางที่ บรรทัดแรก ของไฟล์ ล้อมด้วย  ---  ทั้งบนและล่าง:
 
markdown
  
---
key: value
key-list:
  - รายการที่ 1
  - รายการที่ 2
---

เนื้อหาบันทึกเริ่มต้นที่นี่...
 
 
 
 
✅ แม่แบบมาตรฐาน — คัดลอกใช้ได้เลย
 
yaml
  
---
title: "ชื่อหัวข้อ"
aliases: ["ชื่ออื่น", "ชื่อย่อ"]
slug: link-short-name
icon: 📌
color: blue
type: guide
status: active
priority: medium
tags:
  - type/guide
  - topic/obsidian
created: 2026-10-27
updated: 2026-10-27
author: ชื่อของคุณ
version: "1.0"
---
 
 
 
 
📖 คำอธิบายแต่ละฟิลด์
 
ฟิลด์ ความหมาย ตัวอย่าง หมายเหตุ 
title ชื่อที่แสดง  "Linking & Backlinks"  ใส่เครื่องหมายคำพูด ถ้ามีช่องว่าง 
aliases ชื่ออื่นๆ ที่เรียกหัวข้อนี้  ["ลิงก์ย้อนกลับ", "Backlinks"]  พิมพ์ชื่ออื่น → กระโดดมาหาหน้านี้ได้ 
slug ชื่อลิงก์ย่อ  linking-backlinks  ใช้เมื่อเผยแพร่สู่เว็บ เช่น Quartz 
icon ไอคอนแสดง  🔗  อีโมจิ 1 ตัว 
color สีประจำหัวข้อ  purple  สำหรับแยกประเภทในแผ่นผัง 
type ประเภทเนื้อหา  guide / reference / checklist / template  ดู [[Tag System]] 
status สถานะ  draft / active / archived / needs-review   active =ใช้งาน,  draft =ร่าง 
priority ความสำคัญ  high / medium / low  จัดลำดับความสำคัญ 
tags ป้ายหมวดหมู่  - topic/obsidian  หลายรายการได้ 
created วันที่สร้าง  2026-10-27  รูปแบบ YYYY-MM-DD 
updated วันที่แก้ไขล่าสุด  2026-10-27  อัปเดตทุกครั้งที่แก้ไขเนื้อหาสำคัญ 
author ผู้เขียน  "สมชาย มั่นคง"  ไม่บังคับ ใส่เมื่อต้องการระบุ 
version เวอร์ชัน  "1.2"  สำหรับเอกสารที่มีการแก้ไขบ่อย 
 
 
 
📝 รูปแบบที่ถูกต้อง
 
✅ ข้อความธรรมดา
 
yaml
  
title: Linking & Backlinks
 
 
✅ ข้อความมีช่องว่าง/อักขระพิเศษ → ใส่ในเครื่องหมายคำพูด
 
yaml
  
title: "การใช้ลิงก์และลิงก์ย้อนกลับ"
description: "คู่มือฉบับปรับปรุงล่าสุด (ตุลาคม 2026)"
 
 
✅ รายการ — แบบที่ 1: แต่ละบรรทัด
 
yaml
  
tags:
  - type/guide
  - topic/obsidian
aliases:
  - ลิงก์ย้อนกลับ
  - Backlinks
 
 
✅ รายการ — แบบที่ 2: บรรทัดเดียว
 
yaml
  
tags: [type/guide, topic/obsidian]
 
 
✅ วันที่และตัวเลข
 
yaml
  
created: 2026-10-27
version: 1.0
order: 5
 
 
 
 
⚠️ ข้อผิดพลาดที่พบบ่อย
 
❌ ผิด ✅ ถูก สาเหตุ 
 tags: #type/guide   tags: [type/guide]  ไม่ต้องใส่  #  ใน Frontmatter 
 title: การเชื่อมโยง   title: "การเชื่อมโยง"  ภาษาไทย/มีช่องว่าง ควรใส่ "" 
 aliases: ชื่ออื่น   aliases: ["ชื่ออื่น"]  หลายรายการต้องเป็นรายการ/วงเล็บ 
 created: 27/10/2026   created: 2026-10-27  ใช้รูปแบบ YYYY-MM-DD เสมอ 
ขาด  ---  ปิดท้าย ปิดด้วย  ---  บรรทัดสุดท้าย ต้องมีเส้นคั่นทั้งบนและล่าง 
เว้นวรรคไม่ตรงระดับ จัดให้ตรงกัน 2 ช่องว่าง YAML ไวต่อการเยื้องย่อ 
 
 
 
💡 วิธีใช้ใน Obsidian — เคล็ดลับ
 
✅ เปิด/แก้ไข Frontmatter
 
- พิมพ์  ---  บรรทัดแรก → Obsidian จะแสดงเป็นแผงฟอร์มอัตโนมัติ
- หรือคลิกไอคอน ⚙️ ที่มุมขวาบนของหน้าบันทึก → Properties
- กด  Ctrl/Cmd + E  เพื่อสลับโหมดแก้ไข — เห็นโครงสร้างชัดเจน
 
✅ เพิ่มฟิลด์ใหม่
 
- ในโหมด Properties → กด Add Property → พิมพ์ชื่อและเลือกประเภท
- หรือพิมพ์ตรงๆ ในโหมด Source:  field-name: ค่า 
 
✅ ใช้แทนเนื้อหา — ค้นหาและกรอง
 
- พิมพ์ในแถบค้นหา:  tag:#topic/obsidian  หรือ  type:guide 
- สร้างการค้นหาที่บันทึกไว้ → แสดงเฉพาะบันทึกประเภทเดียวกัน
 
✅ ใช้ร่วมกับเทมเพลต
 
- บันทึกแม่แบบนี้ลงในโฟลเดอร์  Templates/ 
- เมื่อสร้างบันทึกใหม่ → แทรกแม่แบบ → พร้อมกรอกข้อมูลได้ทันที
 
 
 
📋 Checklist Frontmatter ถูกต้องไหม?
 
มี  ---  ทั้งบนและล่าง ✅
วางที่บรรทัดแรกของไฟล์ ก่อนเนื้อหา ✅
มี  title  และ  tags  เสมอ ✅
อัปเดต  updated  ทุกครั้งที่แก้ไขเนื้อหาสำคัญ ✅
ชื่อฟิลด์ใช้ kebab-case เสมอ ✅
ข้อความภาษาไทย/มีช่องว่าง ถูกห่อใน "" ✅
รายการใช้  -   หรือ  []  อย่างถูกต้อง ✅
ไม่มีเครื่องหมาย  #  ข้างหน้าค่าใน Frontmatter ✅
 
 
 
🔗 หัวข้อที่เกี่ยวข้อง
 
- [[Markdown Style Guide]] — รูปแบบการเขียนทั้งหมด
- [[Tag System]] — ระบบป้ายและหมวดหมู่
- [[Templates Index]] — แม่แบบที่มี Frontmatter พร้อมใช้งาน
- [[Home-MOC]] — กลับสู่หน้าหลัก
 
 
 
✅ สรุปสั้นๆ: Frontmatter = บัตรประจำตัวบันทึก — ใส่ให้ครบ อ่านง่าย ค้นหาได้ไว และระบบอื่นๆ เช่น Quartz, Dataview ก็จะทำงานได้สมบูรณ์ครับ 😊