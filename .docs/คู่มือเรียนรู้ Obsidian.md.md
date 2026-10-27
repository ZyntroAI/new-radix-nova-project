🧠 คู่มือเรียนรู้ Obsidian — ฉบับสมบูรณ์
 
ตั้งแต่เริ่มต้น → เชี่ยวชาญ | ทีละขั้นตอน | พร้อมตัวอย่างใช้งานจริง ✅
 
 
 
📑 สารบัญ
 
1. ทำความรู้จัก Obsidian
2. ติดตั้ง & สร้างคลังแรก
3. เขียนบันทึก — Markdown พื้นฐาน
4. เชื่อมโยงความคิด — ลิงก์ & แท็ก
5. Frontmatter — ข้อมูลเชิงโครงสร้าง
6. ปลั๊กอินที่จำเป็น
7. เทคนิคขั้นสูง — MOC, Dataview, แม่แบบ
8. เวิร์กโฟลว์แนะนำ
9. ทรัพยากรเรียนรู้เพิ่ม
 
 
 
1. ทำความรู้จัก Obsidian
 
อะไรคือ Obsidian?
 
แอปจดบันทึกที่ทำงานบนไฟล์ Markdown ธรรมดา ในเครื่องของคุณ — ไม่มีรูปแบบลับ ไม่มีล็อกอินบังคับ
 
จุดเด่นหลัก
 
คุณสมบัติ คำอธิบาย 
📂 Local-First บันทึกอยู่ในเครื่องคุณ — ควบคุมได้เต็มที่ 
🔗 ลิงก์สองทาง เขียน  [[ชื่อบันทึก]]  → อีกฝั่งเห็นว่ามีใครอ้างถึงอัตโนมัติ 
🕸️ มุมมองกราฟ เห็นภาพเครือข่ายความคิดทั้งหมด 
🔌 ขยายได้ไม่สิ้นสุด ปลั๊กอินกว่า 2,000 รายการ 
💾 เปิดเสมอ ไฟล์  .md  เปิดได้ในโปรแกรมอะไรก็ได้ 
 
คำศัพท์หลัก
 
คำศัพท์ ความหมาย 
Vault คลังบันทึก = โฟลเดอร์หนึ่งในเครื่อง 
Note ไฟล์ Markdown 1 ไฟล์ = 1 หัวข้อ 
Link / Wikilink  [[ชื่อบันทึก]]  เชื่อมถึงกัน 
Backlink รายการบันทึกที่อ้างถึงหน้านี้ 
MOC Map of Content — หน้าแผนผังรวมลิงก์ที่เกี่ยวข้อง [__LINK_ICON] 
Frontmatter ข้อมูลเมตาที่ส่วนบนของไฟล์ ในบล็อก  ---  
 
 
 
2. ติดตั้ง & สร้างคลังแรก
 
ขั้นตอน
 
1. ดาวน์โหลดจาก obsidian.md → รองรับ Windows/macOS/Linux/iOS/Android
2. เปิดแอป → เลือก Create new vault
3. ตั้งชื่อ → เลือกตำแหน่งบันทึก → เสร็จ ✅
 
โครงสร้างเริ่มต้นแนะนำ
 
plaintext
  
คลังของฉัน/
├── 📂 00-Inbox/          # บันทึกด่วน ยังไม่จัด
├── 📂 01-Notes/          # บันทึกหลัก
├── 📂 02-Projects/       # โปรเจกต์เฉพาะ
├── 📂 03-Resources/      # เอกสารอ้างอิง
├── 📂 Templates/         # แม่แบบ
├── 📂 Attachments/        # รูปภาพ/ไฟล์แนบ
└── 📄 Home.md            # หน้าแรก
 
 
การตั้งค่าพื้นฐานที่ควรเปลี่ยน
 
ไปที่ Settings → Files & Links
 
- ✅ Default location for new notes →  00-Inbox/ 
- ✅ Automatically update internal links → เปิด
- ✅ Attachment folder path →  Attachments/ 
- ✅ Use [[Wikilinks]] → เปิด
 
 
 
3. เขียนบันทึก — Markdown พื้นฐาน
 
รูปแบบที่ใช้บ่อยที่สุด
 
markdown
  
# หัวข้อหลัก
## หัวข้อรอง
### หัวข้อย่อย

**ตัวหนา** | *ตัวเอียง* | ~~ขีดฆ่า~~ | ==เน้น==

- รายการทั่วไป
- [ ] ยังไม่ทำ
- [ ] ทำแล้ว

1. ลำดับที่หนึ่ง
2. ลำดับที่สอง

`โค้ดบรรทัดเดียว`

```python
def hello():
    print("สวัสดี")
 
 
[!NOTE] ข้อความแจ้ง
ข้อมูลที่ควรทราบ
 
[!WARNING] คำเตือน
ระวังตรงนี้นะ
 
ข้อความลิงก์
[[ชื่อบันทึกที่อ้างถึง]]
[[[[ชื่อบันทึก]]|ข้อความที่แสดง]]
 
![[รูปภาพ.png]]
 
plaintext
  

---

## 4. เชื่อมโยงความคิด — ลิงก์ & แท็ก
### 🔗 ลิงก์ภายใน
```markdown
[[ชื่อบันทึก]]                     → ไปยังหน้านั้น
[[ชื่อบันทึก#หัวข้อย่อย]]          → ข้ามไปยังส่วน
[[ชื่อบันทึก|ข้อความอื่นที่แสดง]]   → เปลี่ยนข้อความที่ปรากฏ
 
 
- เมื่อพิมพ์  [[__LINK_ICON]](https://publish.obsidian.md/help-zh/%E7%94%B1%E6%AD%A4%E5%BC%80%E5%A7%8B?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiI4YzMxMmIxODQ5ZWY1YWNmLTU4NmQyMDcyMjhmMjBlOTIifQ%3D%3D&inline_doc_id=8c312b1849ef5acf-586d207228f20e92)[[  → แนะนำชื่อให้อัตโนมัติ
- แถบด้านข้าง Backlinks → เห็นทุกหน้าที่อ้างถึงหน้านี้
 
🏷️ แท็ก
 
markdown
  
ในเนื้อหา: #งาน #สำคัญ/สูง #โครงการ/เขียนหนังสือ

ใน Frontmatter (แนะนำกว่า):
---
tags: [งาน, สำคัญ/สูง, โครงการ/เขียนหนังสือ]
---
 
 
- แท็กที่มี  /  → จัดกลุ่มในแผงด้านข้าง
- คลิกที่แท็ก → เห็นทุกบันทึกที่มีแท็กเดียวกัน
 
 
 
5. Frontmatter — ข้อมูลเชิงโครงสร้าง
 
วางที่ บรรทัดแรกสุด ก่อนเนื้อหา
 
yaml
  
---
title: ชื่อเรื่อง
aliases: [ชื่ออื่น, ชื่อย่อ]
tags: [หมวด/ที่1, หมวด/ที่2]
created: 2026-10-08
updated: 2026-10-08
status: ร่าง | กำลังทำ | เสร็จ
type: บันทึก | โปรเจกต์ | แหล่งอ้างอิง
---

เนื้อหา...
 
 
- กด  Ctrl/Cmd + ;  → เปิดแผงแก้ไขแบบฟอร์ม ไม่ต้องพิมพ์โค้ด  
- ข้อมูลส่วนนี้สามารถ ค้นหา/กรอง ด้วยปลั๊กอิน Dataview ได้
 
 
 
6. ปลั๊กอินที่จำเป็น
 
✅ ปลั๊กอินหลัก (ติดมากับแอป — เปิดใช้เลย)
 
ไปที่ Settings → Core plugins  
 
ปลั๊กอิน ทำหน้าที่ 
Backlinks แสดงรายการหน้าที่อ้างถึง 
Outgoing Links แสดงหน้าที่หน้านี้อ้างถึง 
Graph View แสดงแผนผังเครือข่าย 
Tags View ดูบันทึกตามแท็ก 
Templates แทรกแม่แบบ 
Daily Notes บันทึกประจำวันอัตโนมัติ 
Properties แก้ไขข้อมูลเมตาแบบฟอร์ม 
 
🔌 ปลั๊กอินชุมชน (ต้องติดตั้งเพิ่ม)
 
ไปที่ Settings → Community plugins → Browse
 
ปลั๊กอิน ประโยชน์ 
Dataview สร้างตาราง/รายการอัตโนมัติจากข้อมูล [__LINK_ICON] 
Templater แม่แบบขั้นสูง — ใส่วันที่/ชื่ออัตโนมัติ 
Obsidian Git สำรอง/เวอร์ชันด้วย Git 
Excalidraw วาดแผนผัง/ไดอะแกรมในบันทึก 
Kanban บอร์ดงานจากแท็ก/ค้นหา 
Advanced Tables ตารางง่ายขึ้นเยอะ 
 
 
 
7. เทคนิคขั้นสูง
 
🗺️ MOC — แผนผังเนื้อหา
 
หน้าที่รวบรวมลิงก์ทั้งหมดในหัวข้อนั้น  
 
markdown
  
# 📚 MOC — การเรียนรู้ Obsidian

## พื้นฐาน
- [[ติดตั้งและเริ่มต้น]]
- [[เขียนด้วย Markdown]]
- [[การเชื่อมโยงบันทึก]]

## ขั้นสูง
- [[การใช้ Frontmatter]]
- [[ปลั๊กอิน Dataview]]
- [[สร้างแม่แบบเอง]]

## 📊 บันทึกทั้งหมดในหมวดนี้
```dataview
LIST
WHERE type = "บันทึก" AND topic = "Obsidian"
SORT created DESC
 
 
plaintext
  

### 📋 แม่แบบ
สร้างไฟล์ในโฟลเดอร์ `Templates/` แล้วเรียกใช้: `Ctrl/Cmd + P` → **Insert template**
```markdown
---
title: 
created: <% tp.date.now("YYYY-MM-DD") %>
tags: []
status: ร่าง
---

# {{title}}

## สรุป
- 

## หัวข้อ
- 

## อ้างอิง
- 
 
 
📊 Dataview — ดึงข้อมูลอัตโนมัติ
 
วางที่ไหนก็ได้ → อัปเดตเองตลอด  
 
markdown
  
## 📝 บันทึกล่าสุด
```dataview
LIST
WHERE file.name != "Home"
SORT file.mtime DESC
LIMIT 5
 
 
✅ งานที่ต้องทำ
 
dataview
  
TASK
WHERE !completed
SORT due ASC
 
 
📂 โปรเจกต์ที่กำลังดำเนิน
 
dataview
  
TABLE status, created
WHERE type = "โปรเจกต์" AND status != "เสร็จ"
SORT priority DESC
 
 
plaintext
  

---

## 8. เวิร์กโฟลว์แนะนำ
### วิธีเริ่มต้น (ไม่ต้องซับซ้อน)
 
 
วันที่คิดอะไร → เขียนสั้นๆ ที่ Inbox
↓
ว่าง → ย้ายไปหมวดหมู่ ตั้งชื่อ เชื่อมโยง
↓
พัฒนาต่อ → เติมรายละเอียด ใส่แท็ก อ้างอิง
↓
สร้าง MOC → รวมหัวข้อที่เกี่ยวข้องเข้าด้วยกัน
 
plaintext
  

### กฎทอง 5 ข้อ
1. **หนึ่งบันทึก = หนึ่งหัวข้อ** — ไม่ยัดทุกอย่างไว้หน้าเดียว
2. **ตั้งชื่อให้ค้นหาง่าย** → ใช้ "ชื่อหัวข้อ" ไม่ใช่ "บันทึกที่ 1"
3. **เชื่อมโยงทุกครั้งที่นึกถึง** → พิมพ์ `[[__LINK_ICON]](https://obsidian.md/pt-BR/help/In%C3%ADcio?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiI2ZmMwNTMzY2IzNjhlNDhiLWI4ZTc5OWVlNjA0N2NjNzcifQ%3D%3D&inline_doc_id=6fc0533cb368e48b-b8e799ee6047cc77)[[` แล้วเลือก
4. **อย่ากังวลเรื่องโครงสร้างตายตัว** → ปรพันธ์ตามความคิดเติบโต
5. **เริ่มง่ายๆ ก่อน** → ไม่ต้องเปิดทุกปลั๊กอินในวันแรก 

---

## 9. ทรัพยากรเรียนรู้เพิ่ม
### ทางการ
- 🌐 **help.obsidian.md** — คู่มือทางการครบถ้วน 
- 📺 **ช่องทางการทางการ** — วิดีโอสอนสั้นๆ
- 📖 **Obsidian Publish** — ตัวอย่างคลังสาธารณะ

### ชุมชน
- 💬 **Discord** — พูดคุยกับผู้ใช้ทั่วโลก
- 🧠 **Reddit r/ObsidianMD** — แชร์ไอเดีย/เวิร์กโฟลว์
- 🎥 **YouTube** คำค้น: "Obsidian tutorial" — มีคลิปสอนทุกระดับ

---

## ✅ สรุปเส้นทางการเรียนรู้
| ขั้น | เป้าหมาย | ประมาณเวลา |
|---|---|---|
| 1️⃣ เริ่มต้น | ติดตั้ง → เขียนบันทึกแรก → รู้สึกคุ้นเคย | 1 วัน |
| 2️⃣ เชื่อมโยง | ใช้ลิงก์ `[[]]` → เห็น Backlinks → เข้าใจกราฟ | 1 สัปดาห์ |
| 3️⃣ จัดระบบ | แท็ก → โฟลเดอร์ → แม่แบบ → สะดวกขึ้น | 2 สัปดาห์ |
| 4️⃣ ขยายผล | Dataview → MOC → ปลั๊กอิน → คลังทำงานแทนคุณ | 1 เดือน |
| 5️⃣ เป็นธรรมชาติ | คิดเป็นลิงก์ → เขียนโดยไม่ต้องคิดระบบ | ตลอดไป |

---

ต้องการให้สร้าง **แม่แบบเริ่มต้น** หรือ **ตัวอย่างคลังพร้อมนำเข้า** เพื่อเริ่มใช้งานทันทีไหมครับ? 🚀def hello():
    print("สวัสดี")
 
 
[!NOTE] ข้อความแจ้ง
ข้อมูลที่ควรทราบ
 
[!WARNING] คำเตือน
ระวังตรงนี้นะ
 
ข้อความลิงก์
[[ชื่อบันทึกที่อ้างถึง]]
[[ชื่อบันทึก|ข้อความที่แสดง]]
 
![[รูปภาพ.png]]
 
plaintext
  

---

## 4. เชื่อมโยงความคิด — ลิงก์ & แท็ก
### 🔗 ลิงก์ภายใน
```markdown
[[ชื่อบันทึก]]                     → ไปยังหน้านั้น
[[ชื่อบันทึก#หัวข้อย่อย]]          → ข้ามไปยังส่วน
[[ชื่อบันทึก|ข้อความอื่นที่แสดง]]   → เปลี่ยนข้อความที่ปรากฏ
 
 
- เมื่อพิมพ์  [[__LINK_ICON]](https://publish.obsidian.md/help-zh/%E7%94%B1%E6%AD%A4%E5%BC%80%E5%A7%8B?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiI4YzMxMmIxODQ5ZWY1YWNmLTU4NmQyMDcyMjhmMjBlOTIifQ%3D%3D&inline_doc_id=8c312b1849ef5acf-586d207228f20e92)[[  → แนะนำชื่อให้อัตโนมัติ
- แถบด้านข้าง Backlinks → เห็นทุกหน้าที่อ้างถึงหน้านี้
 
🏷️ แท็ก
 
markdown
  
ในเนื้อหา: #งาน #สำคัญ/สูง #โครงการ/เขียนหนังสือ

ใน Frontmatter (แนะนำกว่า):
---
tags: [งาน, สำคัญ/สูง, โครงการ/เขียนหนังสือ]
---
 
 
- แท็กที่มี  /  → จัดกลุ่มในแผงด้านข้าง
- คลิกที่แท็ก → เห็นทุกบันทึกที่มีแท็กเดียวกัน
 
 
 
5. Frontmatter — ข้อมูลเชิงโครงสร้าง
 
วางที่ บรรทัดแรกสุด ก่อนเนื้อหา
 
yaml
  
---
title: ชื่อเรื่อง
aliases: [ชื่ออื่น, ชื่อย่อ]
tags: [หมวด/ที่1, หมวด/ที่2]
created: 2026-10-08
updated: 2026-10-08
status: ร่าง | กำลังทำ | เสร็จ
type: บันทึก | โปรเจกต์ | แหล่งอ้างอิง
---

เนื้อหา...
 
 
- กด  Ctrl/Cmd + ;  → เปิดแผงแก้ไขแบบฟอร์ม ไม่ต้องพิมพ์โค้ด  
- ข้อมูลส่วนนี้สามารถ ค้นหา/กรอง ด้วยปลั๊กอิน Dataview ได้
 
 
 
6. ปลั๊กอินที่จำเป็น
 
✅ ปลั๊กอินหลัก (ติดมากับแอป — เปิดใช้เลย)
 
ไปที่ Settings → Core plugins  
 
ปลั๊กอิน ทำหน้าที่ 
Backlinks แสดงรายการหน้าที่อ้างถึง 
Outgoing Links แสดงหน้าที่หน้านี้อ้างถึง 
Graph View แสดงแผนผังเครือข่าย 
Tags View ดูบันทึกตามแท็ก 
Templates แทรกแม่แบบ 
Daily Notes บันทึกประจำวันอัตโนมัติ 
Properties แก้ไขข้อมูลเมตาแบบฟอร์ม 
 
🔌 ปลั๊กอินชุมชน (ต้องติดตั้งเพิ่ม)
 
ไปที่ Settings → Community plugins → Browse
 
ปลั๊กอิน ประโยชน์ 
Dataview สร้างตาราง/รายการอัตโนมัติจากข้อมูล [__LINK_ICON] 
Templater แม่แบบขั้นสูง — ใส่วันที่/ชื่ออัตโนมัติ 
Obsidian Git สำรอง/เวอร์ชันด้วย Git 
Excalidraw วาดแผนผัง/ไดอะแกรมในบันทึก 
Kanban บอร์ดงานจากแท็ก/ค้นหา 
Advanced Tables ตารางง่ายขึ้นเยอะ 
 
 
 
7. เทคนิคขั้นสูง
 
🗺️ MOC — แผนผังเนื้อหา
 
หน้าที่รวบรวมลิงก์ทั้งหมดในหัวข้อนั้น  
 
markdown
  
# 📚 MOC — การเรียนรู้ Obsidian

## พื้นฐาน
- [[ติดตั้งและเริ่มต้น]]
- [[เขียนด้วย Markdown]]
- [[การเชื่อมโยงบันทึก]]

## ขั้นสูง
- [[การใช้ Frontmatter]]
- [[ปลั๊กอิน Dataview]]
- [[สร้างแม่แบบเอง]]

## 📊 บันทึกทั้งหมดในหมวดนี้
```dataview
LIST
WHERE type = "บันทึก" AND topic = "Obsidian"
SORT created DESC
 
 
plaintext
  

### 📋 แม่แบบ
สร้างไฟล์ในโฟลเดอร์ `Templates/` แล้วเรียกใช้: `Ctrl/Cmd + P` → **Insert template**
```markdown
---
title: 
created: <% tp.date.now("YYYY-MM-DD") %>
tags: []
status: ร่าง
---

# {{title}}

## สรุป
- 

## หัวข้อ
- 

## อ้างอิง
- 
 
 
📊 Dataview — ดึงข้อมูลอัตโนมัติ
 
วางที่ไหนก็ได้ → อัปเดตเองตลอด  
 
markdown
  
## 📝 บันทึกล่าสุด
```dataview
LIST
WHERE file.name != "Home"
SORT file.mtime DESC
LIMIT 5
 
 
✅ งานที่ต้องทำ
 
dataview
  
TASK
WHERE !completed
SORT due ASC
 
 
📂 โปรเจกต์ที่กำลังดำเนิน
 
dataview
  
TABLE status, created
WHERE type = "โปรเจกต์" AND status != "เสร็จ"
SORT priority DESC
 
 
plaintext
  

---

## 8. เวิร์กโฟลว์แนะนำ
### วิธีเริ่มต้น (ไม่ต้องซับซ้อน)
 
 
วันที่คิดอะไร → เขียนสั้นๆ ที่ Inbox
↓
ว่าง → ย้ายไปหมวดหมู่ ตั้งชื่อ เชื่อมโยง
↓
พัฒนาต่อ → เติมรายละเอียด ใส่แท็ก อ้างอิง
↓
สร้าง MOC → รวมหัวข้อที่เกี่ยวข้องเข้าด้วยกัน
 
plaintext
  

### กฎทอง 5 ข้อ
1. **หนึ่งบันทึก = หนึ่งหัวข้อ** — ไม่ยัดทุกอย่างไว้หน้าเดียว
2. **ตั้งชื่อให้ค้นหาง่าย** → ใช้ "ชื่อหัวข้อ" ไม่ใช่ "บันทึกที่ 1"
3. **เชื่อมโยงทุกครั้งที่นึกถึง** → พิมพ์ `[[__LINK_ICON]](https://obsidian.md/pt-BR/help/In%C3%ADcio?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiI2ZmMwNTMzY2IzNjhlNDhiLWI4ZTc5OWVlNjA0N2NjNzcifQ%3D%3D&inline_doc_id=6fc0533cb368e48b-b8e799ee6047cc77)[[` แล้วเลือก
4. **อย่ากังวลเรื่องโครงสร้างตายตัว** → ปรพันธ์ตามความคิดเติบโต
5. **เริ่มง่ายๆ ก่อน** → ไม่ต้องเปิดทุกปลั๊กอินในวันแรก 

---

## 9. ทรัพยากรเรียนรู้เพิ่ม
### ทางการ
- 🌐 **help.obsidian.md** — คู่มือทางการครบถ้วน 
- 📺 **ช่องทางการทางการ** — วิดีโอสอนสั้นๆ
- 📖 **Obsidian Publish** — ตัวอย่างคลังสาธารณะ

### ชุมชน
- 💬 **Discord** — พูดคุยกับผู้ใช้ทั่วโลก
- 🧠 **Reddit r/ObsidianMD** — แชร์ไอเดีย/เวิร์กโฟลว์
- 🎥 **YouTube** คำค้น: "Obsidian tutorial" — มีคลิปสอนทุกระดับ

---

## ✅ สรุปเส้นทางการเรียนรู้
| ขั้น | เป้าหมาย | ประมาณเวลา |
|---|---|---|
| 1️⃣ เริ่มต้น | ติดตั้ง → เขียนบันทึกแรก → รู้สึกคุ้นเคย | 1 วัน |
| 2️⃣ เชื่อมโยง | ใช้ลิงก์ `[[]]` → เห็น Backlinks → เข้าใจกราฟ | 1 สัปดาห์ |
| 3️⃣ จัดระบบ | แท็ก → โฟลเดอร์ → แม่แบบ → สะดวกขึ้น | 2 สัปดาห์ |
| 4️⃣ ขยายผล | Dataview → MOC → ปลั๊กอิน → คลังทำงานแทนคุณ | 1 เดือน |
| 5️⃣ เป็นธรรมชาติ | คิดเป็นลิงก์ → เขียนโดยไม่ต้องคิดระบบ | ตลอดไป |

---

ต้องการให้สร้าง **แม่แบบเริ่มต้น** หรือ **ตัวอย่างคลังพร้อมนำเข้า** เพื่อเริ่มใช้งานทันทีไหมครับ? 🚀

เนื้อหานี้มีพื้นฐานดี แต่ Markdown บางส่วน render ไม่ถูกต้องเพราะ code fence ไม่ครบ, callout ยังไม่มี `>` นำหน้า, มี placeholder link/icon ที่หลุดเข้ามา และ Dataview queries ต้องปิดด้วย triple backticks ให้ครบ

ด้านล่างคือ **ฉบับแก้ไขพร้อมวางใน Obsidian ได้ทันที** ตั้งแต่ตัวอย่าง Python, Callouts, Links, Tags, Frontmatter, Plugins, MOC, Templates, Dataview, Workflow และแหล่งเรียนรู้

```markdown
## 3. เขียนโค้ดและ Callouts

### Code block

ใช้ triple backticks พร้อมชื่อภาษาเพื่อให้ syntax highlighting:

````markdown
```python
def hello():
    print("สวัสดี")
```
````

ผลลัพธ์:

```python
def hello():
    print("สวัสดี")
```

### Callouts

Callout ต้องใช้ blockquote marker `>` ทุกบรรทัด:

```markdown
> [!note] ข้อความแจ้ง
> ข้อมูลที่ควรทราบ
```

```markdown
> [!warning] คำเตือน
> ระวังตรงนี้นะ
```

```markdown
> [!tip] เคล็ดลับ
> ใช้ `Ctrl+P` หรือ `Cmd+P` เพื่อเปิด Command Palette
```

```markdown
> [!danger] การทำงานที่มีความเสี่ยง
> อย่าลบไฟล์หรือแก้ไขข้อมูลสำคัญโดยไม่มี backup หรือ rollback plan
```

### Links และ Embeds

```markdown
ข้อความลิงก์ไปยัง [[ชื่อบันทึกที่อ้างถึง]]

[[ชื่อบันทึก|ข้อความที่แสดง]]

![[รูปภาพ.png]]
```

---

## 4. เชื่อมโยงความคิด — ลิงก์และแท็ก

### 🔗 ลิงก์ภายใน

```markdown
[[ชื่อบันทึก]]                    → ไปยังโน้ตนั้น
[[ชื่อบันทึก#หัวข้อย่อย]]         → ข้ามไปยัง section ที่กำหนด
[[[[ชื่อบันทึก]]|ข้อความที่แสดง]]      → เปลี่ยนข้อความที่ปรากฏ
[[[[ชื่อบันทึก]]^block-id]]           → ลิงก์ไปยัง block เฉพาะ
![[ชื่อบันทึก]]                   → embed ทั้งโน้ต
![[[[ชื่อบันทึก]]#หัวข้อย่อย]]        → embed เฉพาะ section
```

เมื่อพิมพ์ `[[` ใน Obsidian ระบบจะแนะนำชื่อโน้ต, headings และ aliases ที่มีอยู่ใน vault

> [!tip]
> ใช้ **Backlinks** เพื่อดูทุกโน้ตที่อ้างถึงโน้ตปัจจุบัน และใช้ **Outgoing links** เพื่อดูว่าโน้ตปัจจุบันเชื่อมไปหาอะไรบ้าง

### 🏷️ Tags

ใส่ tag ภายในเนื้อหา:

```markdown
#งาน
#สำคัญ/สูง
#โครงการ/เขียนหนังสือ
#obsidian/markdown
```

หรือใช้ Frontmatter ซึ่งเหมาะกว่าเมื่อ tags เป็น metadata ของทั้งโน้ต:

```yaml
***
tags:
  - "งาน"
  - "สำคัญ/สูง"
  - "โครงการ/เขียนหนังสือ"
***
```

- Tag ที่มี `/` ช่วยจัดเป็นกลุ่มหรือ hierarchy ใน Tags view
- คลิก tag เพื่อดูทุกโน้ตที่มี tag เดียวกัน
- ใช้ tag สำหรับ classification กว้าง ๆ และใช้ `[[wikilinks]]` สำหรับความสัมพันธ์เชิงความหมาย

> [!example]
> `#project/api` บอกว่าโน้ตอยู่ในหมวด project/API  
> `[[Product API]]` บอกว่าโน้ตนี้เกี่ยวข้องโดยตรงกับ Product API

---

## 5. Frontmatter — ข้อมูลเชิงโครงสร้าง

วาง YAML frontmatter ไว้ที่บรรทัดแรกสุดของไฟล์ ก่อนเนื้อหา:

```yaml
***
title: "ชื่อเรื่อง"
aliases:
  - "ชื่ออื่น"
  - "ชื่อย่อ"
tags:
  - "หมวด/ที่1"
  - "หมวด/ที่2"
created: "2026-10-08"
updated: "2026-10-08"
status: "ร่าง"
type: "บันทึก"
***
```

จากนั้นเขียนเนื้อหาต่อ:

```markdown
# ชื่อเรื่อง

เนื้อหา...
```

ใช้ Frontmatter สำหรับข้อมูลที่ต้องการค้นหา, filter, sort หรือแสดงเป็นตาราง:

| Property | ใช้สำหรับ |
|---|---|
| `title` | ชื่อที่แสดงของโน้ต |
| `aliases` | ชื่อเรียกอื่นสำหรับค้นหาและ wikilinks |
| `tags` | จัดหมวดหมู่ |
| `created` | วันที่สร้าง |
| `updated` | วันที่แก้ไขล่าสุด |
| `status` | เช่น `ร่าง`, `กำลังทำ`, `เสร็จ`, `archived` |
| `type` | เช่น `บันทึก`, `โปรเจกต์`, `แหล่งอ้างอิง`, `guide` |
| `related` | รายการโน้ตที่เกี่ยวข้อง |
| `source` | แหล่งอ้างอิงภายนอก |

> [!tip]
> ใช้ Properties view เพื่อแก้ metadata แบบ form โดยไม่ต้องแก้ YAML ด้วยมือ  
> คีย์ลัดของ Properties หรือ Command Palette อาจต่างกันตามการตั้งค่าและเวอร์ชันของ Obsidian

---

## 6. ปลั๊กอินที่จำเป็น

### ✅ Core plugins

เปิดได้ที่:

```text
Settings → Core plugins
```

| Plugin | หน้าที่ |
|---|---|
| Backlinks | แสดงโน้ตที่อ้างถึงโน้ตปัจจุบัน |
| Outgoing links | แสดงโน้ตที่โน้ตปัจจุบันอ้างถึง |
| Graph view | แสดงแผนผังเครือข่ายของโน้ต |
| Tags view | ดูโน้ตตาม tags |
| Templates | แทรกแม่แบบในโน้ต |
| Daily notes | สร้างบันทึกประจำวัน |
| Properties view | แก้ไข metadata แบบ form |
| Command palette | เรียกคำสั่งต่าง ๆ |
| Quick switcher | ค้นหาและเปิดโน้ตอย่างรวดเร็ว |
| Note composer | Merge และ extract note |
| File recovery | ช่วยกู้คืนไฟล์ที่แก้ไขหรือลบล่าสุด |
| Footnotes view | แสดง footnotes ของ active note |

### 🔌 Community plugins

ติดตั้งได้ที่:

```text
Settings → Community plugins → Browse
```

| Plugin | ประโยชน์ |
|---|---|
| Dataview | สร้าง table, list และ task view จาก metadata |
| Templater | Templates ขั้นสูง เช่น วันที่, ชื่อไฟล์ และ logic |
| Obsidian Git | สำรองและจัดการ version ของ vault ผ่าน Git |
| Excalidraw | วาดแผนผัง, diagram และ whiteboard |
| Kanban | จัดงานแบบ board |
| Advanced Tables | ช่วยแก้ไข Markdown tables |
| Calendar | แสดง Daily Notes แบบ calendar |
| Tasks | จัดการ task พร้อม due dates และ query |
| Linter | จัดรูปแบบ Markdown และ Frontmatter อัตโนมัติ |

> [!warning]
> เริ่มจาก Core plugins ก่อน อย่าติดตั้ง community plugins จำนวนมากในวันแรก  
> เลือกติดตั้งเมื่อมี workflow หรือปัญหาที่ plugin นั้นแก้ได้จริง

---

## 7. เทคนิคขั้นสูง

### 🗺️ [[MOC — Map of Content]]

MOC คือโน้ตที่รวบรวมลิงก์สำหรับหัวข้อหนึ่ง ช่วยนำทางใน vault โดยไม่ต้องพึ่ง folder structure เพียงอย่างเดียว

```markdown
***
title: "MOC — การเรียนรู้ Obsidian"
type: "moc"
tags:
  - "obsidian"
  - "moc"
***

# 📚 MOC — การเรียนรู้ Obsidian

## พื้นฐาน

- [[ติดตั้งและเริ่มต้น]]
- [[Obsidian Markdown]]
- [[การเชื่อมโยงบันทึก]]
- [[Obsidian Properties]]
- [[Obsidian Callouts]]
- [[[[Obsidian Footnotes]]]]

## ขั้นสูง

- [[Obsidian Aliases]]
- [[Obsidian Note Composer]]
- [[การใช้ Frontmatter]]
- [[ปลั๊กอิน Dataview]]
- [[สร้างแม่แบบเอง]]
- [[Obsidian Git]]

## ความปลอดภัยและการดูแล vault

- [[Dry-run and Approval Flow]]
- [[Destructive Command Policy]]
- [[Quick Switcher & Note Composer Guide]]
- [[File recovery]]

## บันทึกล่าสุดในหมวด Obsidian

```dataview
LIST
FROM #obsidian
WHERE file.name != this.file.name
SORT file.mtime DESC
LIMIT 10
```
```

> [!note]
> ส่วน Dataview ทำงานได้เมื่อมีการติดตั้งและเปิด Community plugin ชื่อ Dataview แล้ว

### 📋 Templates

สร้างไฟล์ template ในโฟลเดอร์ `Templates/` แล้วเลือก:

```text
Ctrl/Cmd + P → Templates: Insert template
```

#### Template พื้นฐาน

```markdown
***
title: "{{title}}"
aliases: []
tags: []
type: "note"
status: "draft"
created: "{{date}}"
updated: "{{date}}"
***

# {{title}}

## Summary

- 

## Notes

- 

## Related

- 

## Sources

- 
```

> [!note]
> `{{title}}` และ `{{date}}` เป็นตัวอย่าง placeholder  
> รูปแบบที่แท้จริงขึ้นกับว่าคุณใช้ Core Templates หรือ Community plugin Templater

#### Template สำหรับ Templater

```markdown
***
title: "<% tp.file.title %>"
aliases: []
tags: []
type: "note"
status: "draft"
created: "<% tp.date.now('YYYY-MM-DD') %>"
updated: "<% tp.date.now('YYYY-MM-DD') %>"
***

# <% tp.file.title %>

## Summary

- 

## Notes

- 

## Related

- 

## Sources

- 
```

### 📊 Dataview — ดึงข้อมูลอัตโนมัติ

Dataview query ช่วยสร้างรายการ ตาราง และ task list จาก Frontmatter, tags และ file metadata

#### บันทึกล่าสุด

````markdown
```dataview
LIST
WHERE file.name != "Home"
SORT file.mtime DESC
LIMIT 5
```
````

#### งานที่ยังไม่เสร็จ

````markdown
```dataview
TASK
WHERE !completed
SORT due ASC
```
````

#### โปรเจกต์ที่กำลังดำเนินอยู่

````markdown
```dataview
TABLE status, created
WHERE type = "โปรเจกต์" AND status != "เสร็จ"
SORT priority DESC
```
````

#### ตารางเอกสาร Obsidian

````markdown
```dataview
TABLE type, status, updated
FROM #obsidian
WHERE type = "guide"
SORT updated DESC
```
````

> [!warning]
> Dataview อ่านข้อมูลจากโน้ตใน vault อย่าใช้ query ที่กว้างมากใน vault ขนาดใหญ่โดยไม่จำเป็น เพราะอาจทำให้การแสดงผลช้าลง

---

## 8. เวิร์กโฟลว์แนะนำ

### วิธีเริ่มต้นแบบไม่ซับซ้อน

```text
เกิดไอเดียหรือมีข้อมูลใหม่
   ↓
เขียนสั้น ๆ ใน Inbox
   ↓
เมื่อมีเวลา จัดชื่อ ย้ายหมวดหมู่ และเติม metadata
   ↓
เชื่อมโยงกับโน้ตที่เกี่ยวข้อง
   ↓
เพิ่มรายละเอียด, sources และ tags
   ↓
สร้างหรืออัปเดต MOC ของหัวข้อนั้น
```

### Workflow รายวัน

```markdown
1. Capture ความคิด, งาน หรือ reference ลง `Inbox/`
2. เปิด Daily Note เพื่อบันทึก context ของวัน
3. ใช้ Quick Switcher ค้นหาโน้ตเดิมก่อนสร้างโน้ตใหม่
4. ใช้ `[[wikilinks]]` เมื่อเห็นความสัมพันธ์
5. ใส่ Frontmatter สำหรับโน้ตที่ต้องติดตามระยะยาว
6. Review Inbox อย่างน้อยสัปดาห์ละครั้ง
7. ย้าย, merge หรือ archive โน้ตเมื่อจำเป็น
```

### กฎทอง 5 ข้อ

1. **หนึ่งโน้ต = หนึ่งหัวข้อหลัก**  
   อย่ายัดหลายหัวข้อที่ไม่เกี่ยวข้องกันในโน้ตเดียว

2. **ตั้งชื่อให้ค้นหาง่าย**  
   ใช้ชื่อหัวข้อที่สื่อความหมาย ไม่ใช่ `บันทึกที่ 1` หรือ `Untitled`

3. **เชื่อมโยงเมื่อเห็นความสัมพันธ์**  
   พิมพ์ `[[` แล้วเลือกโน้ตที่มีอยู่หรือสร้างใหม่

4. **อย่ายึดติดกับโครงสร้างตายตัว**  
   ปรับ folders, tags, MOCs และ naming convention ตามการเติบโตของความรู้

5. **เริ่มง่ายก่อน**  
   ไม่ต้องเปิดทุก plugin หรือสร้างระบบซับซ้อนในวันแรก

> [!tip]
> ระบบที่ใช้ทุกวันแบบเรียบง่าย มีคุณค่ามากกว่าระบบที่ซับซ้อนแต่ไม่เคยเปิดใช้

---

## 9. ทรัพยากรเรียนรู้เพิ่ม

### ทางการ

- [Obsidian Help](https://help.obsidian.md/) — คู่มือทางการ
- [Obsidian Forum](https://forum.obsidian.md/) — ชุมชนและประกาศ
- [Obsidian Publish](https://obsidian.md/publish) — ตัวอย่าง public vaults
- [Obsidian Sync](https://obsidian.md/sync) — ข้อมูลเกี่ยวกับการ sync vault
- [Obsidian GitHub](https://github.com/obsidianmd) — โปรเจกต์และ integrations ที่เกี่ยวข้อง

### ชุมชน

- [Obsidian Discord](https://discord.gg/obsidianmd) — พูดคุยกับผู้ใช้
- [r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/) — แชร์ workflow และไอเดีย
- YouTube — ค้นหา `Obsidian tutorial`, `Obsidian workflow`, `Obsidian Dataview`
- [Obsidian Hub](https://publish.obsidian.md/hub/) — ความรู้และ community resources
- [Awesome Obsidian](https://github.com/kmaasrud/awesome-obsidian) — รายชื่อ resources และ plugins

---

## ✅ สรุปเส้นทางการเรียนรู้

| ขั้น | เป้าหมาย | ระยะเวลาโดยประมาณ |
|---|---|---|
| 1️⃣ เริ่มต้น | ติดตั้ง, สร้าง vault, เขียนโน้ตแรก, ใช้ Markdown พื้นฐาน | 1 วัน |
| 2️⃣ เชื่อมโยง | ใช้ `[[wikilinks]]`, Backlinks และเข้าใจ Graph view | 1 สัปดาห์ |
| 3️⃣ จัดระบบ | ใช้ folders, tags, properties และ templates | 2 สัปดาห์ |
| 4️⃣ ขยายผล | ใช้ MOC, Dataview และ plugins ที่จำเป็น | 1 เดือน |
| 5️⃣ เป็นธรรมชาติ | คิดเป็น links, capture เร็ว และพัฒนาระบบตามการใช้งานจริง | ต่อเนื่อง |

> [!success]
> เป้าหมายไม่ใช่การสร้าง vault ที่สมบูรณ์แบบตั้งแต่วันแรก  
> แต่คือการสร้างระบบที่ช่วยให้คุณบันทึก ค้นหา เชื่อมโยง และนำความรู้กลับมาใช้ได้จริง
```

1. Capture ความคิด, งาน หรือ reference ลง `Inbox/`
2. เปิด Daily Note เพื่อบันทึก context ของวัน
3. ใช้ Quick Switcher ค้นหาโน้ตเดิมก่อนสร้างโน้ตใหม่
4. ใช้ `[[wikilinks]]` เมื่อเห็นความสัมพันธ์
5. ใส่ Frontmatter สำหรับโน้ตที่ต้องติดตามระยะยาว
6. Review Inbox อย่างน้อยสัปดาห์ละครั้ง
7. ย้าย, merge หรือ archive โน้ตเมื่อจำเป็น

```markdown
## Daily Obsidian Workflow

```text
1. Capture ความคิด, งาน หรือ reference ลง `Inbox/`
2. เปิด Daily Note เพื่อบันทึก context ของวัน
3. ใช้ Quick Switcher ค้นหาโน้ตเดิมก่อนสร้างโน้ตใหม่
4. ใช้ `[[wikilinks]]` เมื่อเห็นความสัมพันธ์
5. ใส่ Frontmatter สำหรับโน้ตที่ต้องติดตามระยะยาว
6. Review Inbox อย่างน้อยสัปดาห์ละครั้ง
7. ย้าย, merge หรือ archive โน้ตเมื่อจำเป็น
```

## 1. Capture ลง Inbox

เก็บทุกอย่างที่เข้ามาในหัวก่อน โดยไม่ต้องจัดระบบให้สมบูรณ์ทันที

```markdown
- ความคิด
- Task
- ลิงก์
- ข้อความสำคัญ
- Reference
- คำถามที่ต้องหาคำตอบ
- สิ่งที่ต้องตัดสินใจ
```

สร้างโน้ตใน `Inbox/` ด้วยชื่อที่สั้นและเข้าใจได้ เช่น:

```text
Inbox/ไอเดีย — ระบบจัดการงานส่วนตัว.md
Inbox/ลิงก์ — Obsidian Dataview.md
Inbox/คำถาม — วิธีจัดการ permissions ใน Android.md
```

> [!tip]
> อย่าให้ Inbox กลายเป็นที่เก็บถาวร  
> Inbox มีไว้เพื่อ capture ก่อน แล้วค่อย process ในภายหลัง

## 2. เปิด Daily Note

ใช้ Daily Note เป็นบันทึก context ของวัน เช่น สิ่งที่ทำ, การประชุม, ปัญหาที่พบ, ความคืบหน้า และ next actions

```markdown
***
title: "2026-10-11"
type: "daily"
tags:
  - "daily"
created: "2026-10-11"
***

# 2026-10-11

## Focus

- 

## Tasks

- [ ] 

## Notes

- 

## Captures

- 

## Tomorrow

- 
```

ลิงก์สิ่งที่เกี่ยวข้องไปยังโน้ตถาวร:

```markdown
- ทบทวน [[Android app management policy]]
- เขียน [[Obsidian Daily Note workflow]]
- ตรวจ Inbox และสร้าง [[MOC — การเรียนรู้ Obsidian]]
```

> [!note]
> Daily Note ไม่จำเป็นต้องสมบูรณ์  
> ให้เน้นบันทึก context และลิงก์ไปยังโน้ตหลัก

## 3. ค้นหาก่อนสร้างใหม่

ก่อนสร้างโน้ตใหม่ ให้ใช้ Quick Switcher ค้นหาโน้ตเดิมก่อน

```text
Ctrl/Cmd + O
```

ค้นหาด้วย:

- ชื่อโน้ต
- alias
- คำสำคัญในชื่อ
- ชื่อหัวข้อที่เกี่ยวข้อง

ตัวอย่าง:

```text
แทนที่จะสร้าง "Android permissions 2"
ให้ค้นหา "Android permissions"
แล้วเพิ่มเนื้อหาเข้าไปในโน้ตเดิม
```

> [!warning]
> การสร้างโน้ตใหม่ซ้ำ ๆ โดยไม่ค้นหาก่อน ทำให้ vault กระจัดกระจายและค้นหายาก

## 4. ใช้ [[Wikilinks]] เมื่อเห็นความสัมพันธ์

เมื่อโน้ตหนึ่งเกี่ยวข้องกับอีกโน้ตหนึ่ง ให้เชื่อมด้วย `[[wikilinks]]`

```markdown
- [[Android app management policy]]
- [[Android App Permissions]]
- [[Android Storage Management]]
- [[Password Manager and 2FA Recovery]]
- [[Obsidian Daily Note workflow]]
```

ใช้ alias เมื่อต้องการให้ข้อความแสดงแบบอื่น:

```markdown
ดู [[Android app management policy|นโยบายการจัดการแอป Android]]
```

ลิงก์ไปยัง section เฉพาะ:

```markdown
ดู [[Android app management policy#Permission Review]]
```

> [!tip]
> ลิงก์ไม่จำเป็นต้องสมบูรณ์ในครั้งเดียว  
> เริ่มจากลิงก์ที่ชัดเจนที่สุดก่อน แล้วเพิ่มเติมเมื่อความสัมพันธ์ชัดขึ้น

## 5. ใส่ Frontmatter สำหรับโน้ตระยะยาว

ใช้ Frontmatter เฉพาะโน้ตที่ต้องการค้นหา, filter, track หรือเชื่อมกับระบบอัตโนมัติ

```yaml
***
title: "Android app management policy"
aliases:
  - "Android app policy"
  - "นโยบายจัดการแอป Android"
tags:
  - "android"
  - "security"
  - "mobile"
  - "policy"
type: "policy"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
related:
  - "[[Android App Permissions]]"
  - "[[Android Storage Management]]"
  - "[[Android Battery Management]]"
***
```

ใช้ properties ที่จำเป็นเท่านั้น อย่าเพิ่ม field ที่ไม่เคยใช้

> [!note]
> โน้ตสั้นหรือ capture ชั่วคราวอาจไม่ต้องมี Frontmatter ครบ  
> เพิ่มเมื่อโน้ตกลายเป็น reference หรือ policy ที่ต้องติดตาม

## 6. Review Inbox รายสัปดาห์

กำหนดเวลาทบทวน Inbox อย่างน้อยสัปดาห์ละครั้ง เช่น ทุกวันศุกร์

สำหรับแต่ละโน้ตใน Inbox ให้ตัดสินใจ:

```text
Keep
   ↓
ย้ายไปหมวดที่เหมาะสม

Merge
   ↓
รวมเข้ากับโน้ตที่มีอยู่

Archive
   ↓
ย้ายไป Archive หากไม่ต้องใช้ทันที

Delete
   ↓
ลบหากไม่มีคุณค่าและไม่มีข้อมูลสำคัญ
```

Checklist:

```markdown
- [ ] โน้ตนี้ควรอยู่ใน Inbox ต่อหรือไม่
- [ ] มีโน้ตที่ซ้ำหรือเกี่ยวข้องอยู่แล้วหรือไม่
- [ ] ควร merge เข้ากับโน้ตเดิมหรือไม่
- [ ] ควรเปลี่ยนชื่อให้ค้นหาง่ายขึ้นหรือไม่
- [ ] ควรเพิ่ม [[wikilinks]] หรือไม่
- [ ] ควรเพิ่ม Frontmatter หรือไม่
- [ ] ควรย้ายไป Archive หรือลบหรือไม่
```

> [!tip]
> ใช้ Note Composer เพื่อ merge โน้ตและคง links ที่ชี้มาที่โน้ตเดิมไว้

## 7. ย้าย, Merge หรือ Archive

เมื่อโน้ตมีบทบาทชัดเจนแล้ว ให้จัดการตามเงื่อนไข:

| สถานการณ์ | การจัดการ |
|---|---|
| โน้ตมีหัวข้อชัดและจะใช้ต่อ | ย้ายไป folder ที่เหมาะสม |
| โน้ตซ้ำกับโน้ตเดิม | Merge เข้าโน้ตหลัก |
| โน้ตยังไม่ได้ใช้แต่ไม่อยากลบ | Archive |
| โน้ตเป็น reference ถาวร | จัดเป็น reference note และเพิ่ม source |
| โน้ตเป็นงานที่ต้องทำ | แปลงเป็น task หรือ project note |
| โน้ตไม่มีคุณค่าและไม่มี dependency | Delete |

```markdown
## Folder structure ตัวอย่าง

Inbox/
Daily/
Projects/
Areas/
Resources/
Archive/
Templates/
```

> [!warning]
> ก่อน merge หรือ delete ให้ตรวจ backlinks, outgoing links, embedded files และข้อมูลที่อาจสูญหาย  
> หากไม่แน่ใจ ให้ archive ก่อนแทนการลบถาวร

## Weekly Review Template

```markdown
***
title: "Weekly review — YYYY-Www"
type: "review"
tags:
  - "weekly-review"
  - "obsidian"
created: "YYYY-MM-DD"
***

# Weekly review — YYYY-Www

## Inbox review

- [ ] ทบทวนทุกโน้ตใน `Inbox/`
- [ ] ย้ายโน้ตที่มีหัวข้อชัดเจน
- [ ] Merge โน้ตที่ซ้ำหรือเกี่ยวข้องกัน
- [ ] Archive โน้ตที่ยังไม่ใช้
- [ ] ลบโน้ตที่ไม่มีคุณค่า

## Links and structure

- [ ] เพิ่ม [[wikilinks]] ให้โน้ตใหม่
- [ ] ตรวจ broken links
- [ ] อัปเดต MOC ที่เกี่ยวข้อง
- [ ] ตรวจ aliases และชื่อโน้ต

## Tasks

- [ ] ทบทวน task ที่ยังไม่เสร็จ
- [ ] ปรับ priority
- [ ] ย้าย task ที่ค้างนานไปยัง project note

## Follow-up

- [ ] โน้ตที่ต้องพัฒนาต่อ
- [ ] หัวข้อที่ควรสร้าง MOC
- [ ] แหล่งอ้างอิงที่ต้องเก็บเพิ่ม
```

## Minimal Daily Checklist

```markdown
- [ ] Capture สิ่งใหม่ลง Inbox
- [ ] เขียน Daily Note
- [ ] ค้นหาโน้ตเดิมก่อนสร้างใหม่
- [ ] เพิ่ม [[wikilinks]] เมื่อเห็นความเชื่อมโยง
- [ ] ใส่ Frontmatter ให้โน้ตที่ต้อง track
- [ ] Review Inbox สัปดาห์ละครั้ง
- [ ] Archive, merge หรือย้ายโน้ตเมื่อจำเป็น
```

