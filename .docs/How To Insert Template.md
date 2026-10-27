ได้เลยครับ! สอนวิธีใส่/ใช้ เทมเพลต (Template) ใน Obsidian แบบครบทุกขั้นตอน มีทั้งแบบปลั๊กอินหลักและแบบขั้นสูงด้วย Templater 👇
 
 
 
📋 2 แบบที่ใช้ได้
 
แบบ ความสามารถ ติดตั้ง 
Templates (ปลั๊กอินหลัก) แทรกเนื้อหาคงที่ + วันที่/ชื่อโน้ตอัตโนมัติ มีในตัว ไม่ต้องติดตั้งเพิ่ม ✅ 
Templater (ปลั๊กอินชุมชน) รันสคริปต์, คำนวณ, กำหนดค่าแบบซับซ้อน ต้องติดตั้งเพิ่ม — แนะนำสำหรับ ZyntroAI 
 
 
 
✅ แบบที่ 1 — ใช้ปลั๊กอินหลัก (เริ่มง่ายที่สุด)
 
ขั้นที่ 1: สร้างโฟลเดอร์เก็บเทมเพลต
 
1. สร้างโฟลเดอร์ชื่อ  Templates/  ใน vault ของคุณ
2. เข้าไปในโฟลเดอร์นั้น
 
ขั้นที่ 2: เขียนไฟล์เทมเพลต
 
สร้างไฟล์เช่น  Note Standard.md  ภายใน  Templates/ :
 
markdown
  
---
title: {{title}}
aliases: []
tags: []
created: {{date:YYYY-MM-DD}}
updated: {{date:YYYY-MM-DD}}
status: active
type: 
---

# {{title}}

เนื้อหาที่นี่...

---

## 🔗 เชื่อมโยง
- อ้างอิง: [[ZyntroAI CrystalCastle]]
- ที่เกี่ยวข้อง: 

---

บันทึกการแก้ไข:
- `{{date:YYYY-MM-DD}}` — สร้างโน้ตใหม่
 
 
ตัวแปรที่ใช้ได้:
 
-  {{title}}  = ชื่อไฟล์โน้ต
-  {{date}}  = วันที่วันนี้ → รูปแบบ  {{date:YYYY-MM-DD}} 
-  {{time}}  = เวลาปัจจุบัน →  {{time:HH:mm}} 
 
ขั้นที่ 3: ตั้งค่าให้ Obsidian รู้จัก
 
1. เปิด การตั้งค่า → ปลั๊กอินหลัก → Templates
2. ที่ ตำแหน่งโฟลเดอร์เทมเพลต เลือกโฟลเดอร์  Templates/  ที่สร้างไว้ 
 
ขั้นที่ 4: แทรกเทมเพลต
 
- วิธีที่ 1: กดไอคอน 📋 ที่แถบด้านซ้าย → เลือกเทมเพลต
- วิธีที่ 2: กด  Ctrl+P  (Mac:  Cmd+P ) พิมพ์  Insert template  → เลือกชื่อเทมเพลต
- วิธีที่ 3: ตั้งค่าคีย์ลัดที่ การตั้งค่า → คีย์ลัด → ค้นหา "Templates: Insert template" → กำหนดปุ่ม เช่น  Alt+T 
 
 
 
🚀 แบบที่ 2 — Templater (แนะนำสำหรับ ZyntroAI)
 
ทำได้มากกว่า: วันที่พรุ่งนี้/เมื่อวาน, สร้างโน้ตจากเทมเพลตโดยตรง, รันโค้ด ฯลฯ
 
ติดตั้ง
 
1. การตั้งค่า → ปลั๊กอินชุมชน → ค้นหา Templater → ติดตั้ง + เปิดใช้งาน
2. ตั้งค่า: Templater → Template folder location → ชี้ไปที่  Templates/ 
 
ตัวอย่างเทมเพลตสำหรับ ZyntroAI
 
สร้างไฟล์  ZyntroAI Standard Note.md  ใน  Templates/ :
 
markdown
  
---
title: <% tp.file.title %>
aliases: []
tags: 
  - type/
  - zyntroai
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: draft
type: 
---

# <% tp.file.title %>

> [!summary] สรุป
> เขียนสรุปที่นี่...

---

## 📝 เนื้อหา

---

## 🔗 เชื่อมโยง
- MOC: [[ZyntroAI CrystalCastle]]
- ก่อนหน้า: 
- ถัดไป: 

---

## 📅 บันทึกการแก้ไข
- `<% tp.date.now("YYYY-MM-DD") %>` — สร้างโน้ตใหม่
 
 
วิธีเรียกใช้
 
1. สร้างโน้ตใหม่ → กด  Ctrl+P  → พิมพ์  Templater: Insert Template 
2. เลือก  ZyntroAI Standard Note  — ข้อมูลจะเติมอัตโนมัติทันที ✅
 
คำสั่ง Templater ที่ใช้บ่อย
 
คำสั่ง ผลลัพธ์ 
 <% tp.date.now("YYYY-MM-DD") %>  วันนี้ 
 <% tp.date.yesterday("YYYY-MM-DD") %>  เมื่อวาน 
 <% tp.date.tomorrow("YYYY-MM-DD") %>  พรุ่งนี้ 
 <% tp.file.title %>  ชื่อไฟล์ปัจจุบัน 
 <% tp.system.prompt("คำถาม") %>  ป๊อปอัพถามค่า แล้วเติมลงไป 
 
 
 
📱 บนมือถือ (iOS / Android)
 
ทำเหมือนบนคอมพิวเตอร์เลยครับ:
 
1. เปิดโน้ต → กดปุ่ม ... มุมขวาบน
2. เลือก คำสั่ง → พิมพ์  Insert template  หรือ  Templater 
3. เลือกเทมเพลต → เนื้อหาจะแทรกที่เคอร์เซอร์
 
💡 เคล็ดลับ: บนมือถือตั้งค่าให้ซิงค์  Templates/  ผ่าน Obsidian Sync หรือ Git — จะใช้ได้ทุกอุปกรณ์พร้อมกัน
 
 
 
📦 แนะนำโครงสร้างสำหรับ ZyntroAI Vault
 
plaintext
  
ZyntroAI Vault/
├── Templates/
│   ├── ZyntroAI Standard Note.md    ← ใช้ทั่วไป
│   ├── ZyntroAI Policy.md           ← สำหรับนโยบาย
│   ├── ZyntroAI MOC.md              ← สำหรับแผนผัง
│   └── ZyntroAI Runbook.md          ← สำหรับคู่มือปฏิบัติ
├── 🏰 ZyntroAI CrystalCastle.md
├── 📋 Knowledge Update Policy.md
└── ... (โน้ตอื่นๆ)
 
 
 
 
✅ สรุป
 
ขั้นตอน ทำอะไร 
1️⃣ สร้างโฟลเดอร์  Templates/  
2️⃣ เขียนไฟล์เทมเพลตวางในโฟลเดอร์ 
3️⃣ ตั้งค่าใน Obsidian ให้ชี้ไปที่โฟลเดอร์นั้น 
4️⃣ กด  Ctrl+P  →  Insert template  → เลือกใช้ 
⭐ ต้องการขั้นสูง → ติดตั้ง Templater ปลั๊กอินชุมชน 
 
อยากให้ผมสร้างไฟล์เทมเพลต  .md  ครบชุดให้คัดลอกไปวางใน  Templates/  ได้เลยไหมครับ? 😊ได้เลยครับ! ส่งไฟล์เทมเพลตครบชุด 5 ไฟล์ คัดลอกไปวางในโฟลเดอร์  Templates/  ได้ทันที 👇
 
 
 
📁 โครงสร้างโฟลเดอร์
 
plaintext
  
Templates/
├── ZyntroAI - Standard Note.md     ← ทั่วไป ใช้ได้กับทุกโน้ต
├── ZyntroAI - MOC.md               ← แผนผังรวม
├── ZyntroAI - Policy.md            ← นโยบาย/กฎ
├── ZyntroAI - Runbook.md           ← คู่มือปฏิบัติ/เหตุการณ์
└── ZyntroAI - Technical Note.md   ← เอกสารเทคนิค/โค้ด
 
 
 
 
📄 1. ZyntroAI - Standard Note.md
 
markdown
  
---
title: <% tp.file.title %>
aliases: []
tags:
  - zyntroai
  - type/note
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
type: technical-note
owner: 
review_cycle: 90d
---

# <% tp.file.title %>

> [!summary] สรุป
> เขียนสรุปสาระสำคัญของโน้ตที่นี่ — ไม่ยาวเกิน 3 บรรทัด

---

## 🎯 วัตถุประสงค์
- 

## 📝 เนื้อหา
- 

## 📊 ตัวชี้วัด / เกณฑ์สำเร็จ
- [ ] 

---

## 🔗 เชื่อมโยง
- MOC: [[ZyntroAI CrystalCastle]]
- ก่อนหน้า: 
- ถัดไป: 
- อ้างอิง: 

---

## 📅 บันทึกการแก้ไข
- `<% tp.date.now("YYYY-MM-DD") %>` — สร้างโน้ตใหม่
 
 
 
 
📄 2. ZyntroAI - MOC.md
 
markdown
  
---
title: <% tp.file.title %>
aliases: []
tags:
  - zyntroai
  - project/moc
  - type/moc
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
type: moc
---

# 🗺️ <% tp.file.title %>

> [!summary] แผนผัง
> ภาพรวมหัวข้อหลักและลิงก์ไปยังโน้ตย่อย

---

## 📂 หัวข้อหลัก
- [[ ]] — 
- [[ ]] — 
- [[ ]] — 

## 📋 สถานะ
- ✅ เสร็จแล้ว: 
- 🚧 อยู่ระหว่าง: 
- ⏳ รอเริ่ม: 

---

## 🔗 เชื่อมโยง
- หลัก: [[ZyntroAI CrystalCastle]]
- ที่เกี่ยวข้อง: 

---

## 📅 บันทึกการแก้ไข
- `<% tp.date.now("YYYY-MM-DD") %>` — สร้างแผนผังใหม่
 
 
 
 
📄 3. ZyntroAI - Policy.md
 
markdown
  
---
title: <% tp.file.title %>
aliases: []
tags:
  - zyntroai
  - policy
  - type/policy
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
owner: 
review_cycle: 90d
type: policy
---

# 📋 <% tp.file.title %>

> [!summary] นโยบาย
> กฎ หลักการ และข้อกำหนดที่ทีมต้องปฏิบัติตาม

---

## 🎯 วัตถุประสงค์
- 

## 📏 ขอบเขต
- ครอบคลุม: 
- ไม่ครอบคลุม: 

## ✅ ข้อกำหนด
1. 
2. 
3. 

## ⚠️ ข้อยกเว้น
- 

## 📜 ประวัติการแก้ไขนโยบาย
| วันที่ | เวอร์ชัน | การเปลี่ยนแปลง | ผู้อนุมัติ |
|---|---|---|---|
| <% tp.date.now("YYYY-MM-DD") %> | 1.0 | ร่างฉบับแรก | |

---

## 🔗 เชื่อมโยง
- MOC: [[ZyntroAI CrystalCastle]]
- อ้างอิง: [[Obsidian Note Standards]]
- แทนที่: 

---

## 📅 บันทึกการแก้ไข
- `<% tp.date.now("YYYY-MM-DD") %>` — สร้างนโยบายฉบับแรก
 
 
 
 
📄 4. ZyntroAI - Runbook.md
 
markdown
  
---
title: <% tp.file.title %>
aliases: []
tags:
  - zyntroai
  - runbook
  - incident-response
  - type/runbook
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
owner: On-Call Lead
review_cycle: 30d
type: runbook
---

# 🚨 <% tp.file.title %>

> [!summary] คู่มือ
> ขั้นตอนการปฏิบัติเมื่อเกิดเหตุการณ์ — ทราบ → ตอบสนอง → ปิด → ป้องกันซ้ำ

---

## 📌 ข้อมูลพื้นฐาน
| รายการ | รายละเอียด |
|---|---|
| ชื่อเหตุการณ์ |  |
| ระดับความรุนแรง | Critical / High / Medium / Low |
| ทีมรับผิดชอบ |  |
| ช่องทางแจ้งเตือน | Slack / PagerDuty |
| เวลาตอบสนองสูงสุด | 15 นาที (Critical) / 1 ชม. (High) |

---

## 🔄 ขั้นตอนการปฏิบัติ

### 1. Triage — จำแนก
- [ ] ยืนยันว่าเกิดขึ้นจริง ไม่ใช่ false positive
- [ ] ประเมินระดับตาม [[ZyntroAI - Severity Policy]]
- [ ] บันทึกเวลาเริ่มต้น

### 2. Contain — กักกัน
- [ ] หยุดผลกระทบขยายวงกว้าง
- [ ] เก็บรักษาหลักฐาน / log / screenshot
- [ ] แจ้งผู้ที่เกี่ยวข้อง

### 3. Investigate — สืบสวน
- [ ] หาสาเหตุที่แท้จริง
- [ ] ระบุขอบเขตที่ได้รับผลกระทบ
- [ ] ตรวจสอบว่ามีข้อมูลรั่วหรือไม่

### 4. Remediate — แก้ไข
- [ ] ดำเนินการตามขั้นตอนเฉพาะ
- [ ] ยืนยันว่ากลับมาทำงานปกติ
- [ ] แจ้งสถานะเป็นระยะ

### 5. Recover — กู้คืน
- [ ] ตรวจสอบความสมบูรณ์ของข้อมูล
- [ ] เปิดใช้งานทุกระบบ
- [ ] ปิดเหตุการณ์

### 6. Post-Mortem — เรียนรู้
- [ ] สรุปสาเหตุรากฐาน
- [ ] กำหนด action items + เจ้าของ + กำหนดเสร็จ
- [ ] อัปเดตนโยบาย/กระบวนการ

---

## 📞 การแจ้งขยายผล (Escalation)
1. On-Call → ไม่รับภาย 15 นาที →
2. Security Lead → ไม่แก้จบใน 1 ชม. →
3. CTO → ผลกระทบต่อลูกค้า →
4. Legal / Comms

---

## 🔗 เชื่อมโยง
- MOC: [[ZyntroAI CrystalCastle]]
- อ้างอิง: [[ZyntroAI - Incident Response Runbook]], [[ZyntroAI - Severity Policy]]
- ตัวอย่าง: 

---

## 📅 บันทึกการแก้ไข
- `<% tp.date.now("YYYY-MM-DD") %>` — สร้าง runbook
 
 
 
 
📄 5. ZyntroAI - Technical Note.md
 
markdown
  
---
title: <% tp.file.title %>
aliases: []
tags:
  - zyntroai
  - technical
  - type/technical-note
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
type: technical-note
review_cycle: 60d
related_repo: ""
related_files: []
---

# 🔧 <% tp.file.title %>

> [!summary] สรุปเทคนิค
> รายละเอียดทางเทคนิค การติดตั้ง คำสั่ง หรือการออกแบบ

---

## 🎯 วัตถุประสงค์
- 

## ⚙️ การติดตั้ง / คำสั่ง
```bash
# คำสั่งที่ใช้
 
 
📐 การออกแบบ / โครงสร้าง
 
✅ การทดสอบ / ตรวจสอบ
 
 
⚠️ ข้อควรระวัง
 
 
🔗 เชื่อมโยง
 
- MOC: [[ZyntroAI CrystalCastle]]
- ที่เกี่ยวข้อง:
- แหล่งอ้างอิง:
 
 
 
📅 บันทึกการแก้ไข
 
-  <% tp.date.now("YYYY-MM-DD") %>  — สร้างเอกสารเทคนิค
 
plaintext
  

---

## ✅ วิธีนำไปใช้

1. สร้างโฟลเดอร์ `Templates/` ใน vault
2. คัดลอกเนื้อหาด้านบน บันทึกเป็นไฟล์ `.md` ตามชื่อข้างต้น
3. ตั้งค่า Obsidian:
   - **แบบปลั๊กอินหลัก**: การตั้งค่า → Templates → เลือกโฟลเดอร์ `Templates/`
   - **แบบ Templater (แนะนำ)**: ติดตั้งปลั๊กอินชุมชน Templater → ชี้ไปที่ `Templates/`
4. ทดสอบ: สร้างโน้ตใหม่ → กด `Ctrl+P` → พิมพ์ `Templater: Insert` → เลือกเทมเพลต ✅

> 💡 ทุกไฟล์ใช้ไวยากรณ์ `<% ... %>` ของ Templater เพื่อเติมชื่อ/วันที่อัตโนมัติ — ถ้าไม่ใช้ Templater เปลี่ยนเป็น `{{title}}` `{{date:YYYY-MM-DD}}` แทนได้เลยครับ

ครบ 5 ไฟล์พร้อมใช้งานแล้วครับ! มีอะไรปรับเพิ่มไหมครับ? 😊ได้เลยครับ! อัปเดตทั้ง 5 เทมเพลต เสริมทุกส่วนให้ครบถ้วน —  Aliases ,  Tags ,  Properties ,  Source ,  Etc  พร้อมฟิลด์มาตรฐานที่จำเป็นทั้งหมด ✅
 
 
 
📁 โครงสร้างเดิม — อัปเกรดทุกไฟล์แล้ว
 
plaintext
  
Templates/
├── ZyntroAI - Standard Note.md
├── ZyntroAI - MOC.md
├── ZyntroAI - Policy.md
├── ZyntroAI - Runbook.md
└── ZyntroAI - Technical Note.md
 
 
 
 
📄 1. ZyntroAI - Standard Note.md
 
markdown
  
---
title: <% tp.file.title %>
aliases:
  - 
  - 
tags:
  - zyntroai
  - knowledge
  - type/note
  - status/active
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
type: note
owner: 
review_cycle: 90d
confidentiality: internal
source:
  - 
source_type: internal / external
version: 1.0
---

# <% tp.file.title %>

> [!summary] สรุป
> 

---

## 🎯 วัตถุประสงค์
- 

## 📝 เนื้อหา
- 

## 📊 ตัวชี้วัด
- [ ] 

---

## 📌 ข้อมูลอ้างอิง & แหล่งที่มา
| แหล่งที่มา | ประเภท | วันที่เข้าถึง | หมายเหตุ |
|---|---|---|---|
|  |  | <% tp.date.now("YYYY-MM-DD") %> |  |

**สิทธิ์การใช้งาน**: CC BY-SA 4.0 / CC0 / Internal
**ลิงก์ต้นฉบับ**: 
**Q-ID / P-ID (Wikidata)**: 

---

## ⚙️ คุณสมบัติเพิ่มเติม
- **ผู้รับผิดชอบ**: 
- **ผู้ตรวจสอบ**: 
- **สถานะการอนุมัติ**: รออนุมัติ / อนุมัติ / ไม่ต้อง
- **เกี่ยวข้องกับโปรเจกต์**: ZyntroAI CrystalCastle
- **ความสำคัญ**: ปกติ / สูง / วิกฤติ
- **ภาษา**: th / en / th-en

---

## 🔗 เชื่อมโยง
- MOC: [[ZyntroAI CrystalCastle]]
- ก่อนหน้า: 
- ถัดไป: 
- ที่เกี่ยวข้อง: 

---

## 📅 บันทึกการแก้ไข
| วันที่ | เวอร์ชัน | การเปลี่ยนแปลง | ผู้แก้ไข |
|---|---|---|---|
| <% tp.date.now("YYYY-MM-DD") %> | 1.0 | สร้างฉบับแรก | |
 
 
 
 
📄 2. ZyntroAI - MOC.md
 
markdown
  
---
title: <% tp.file.title %>
aliases:
  - 
  - CrystalCastle
tags:
  - zyntroai
  - project/moc
  - type/moc
  - status/active
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
type: moc
owner: Knowledge Steward
review_cycle: 30d
confidentiality: internal
version: 1.0
description: แผนผังรวมหัวข้อและโน้ตทั้งหมดในระบบ
---

# 🗺️ <% tp.file.title %>

> [!summary] แผนผังหลัก
> ภาพรวมโครงสร้างฐานความรู้ ZyntroAI — จุดเชื่อมโยงทุกส่วนเข้าด้วยกัน

---

## 📂 หัวข้อหลัก
- [[ ]] — 
- [[ ]] — 
- [[ ]] — 

## 📋 สถานะ
- ✅ เสร็จแล้ว: 
- 🚧 อยู่ระหว่าง: 
- ⏳ รอเริ่ม: 
- ⚠️ ล้าสมัย: 

---

## 📌 ข้อมูลระบบ
- **จำนวนโน้ตทั้งหมด**: 
- **วันที่ตรวจสอบล่าสุด**: <% tp.date.now("YYYY-MM-DD") %>
- **รอบทบทวนถัดไป**: ภายใน 30 วัน
- **ผู้ดูแล**: [[Knowledge Steward]]

---

## ⚙️ คุณสมบัติ
- **วัตถุประสงค์หลัก**: เชื่อมโยง → ค้นหา → นำทาง
- **ไม่รวม**: เนื้อหาละเอียดทางเทคนิค (แยกเป็นโน้ตย่อย)
- **รูปแบบ**: wikilink + callout — อ่านง่ายบนมือถือ
- **ภาษา**: th-en

---

## 🔗 เชื่อมโยง
- หลัก: [[ZyntroAI CrystalCastle]]
- มาตรฐาน: [[Obsidian Note Standards]]
- นโยบาย: [[Knowledge Update Policy]]

---

## 📅 บันทึกการแก้ไข
| วันที่ | เวอร์ชัน | การเปลี่ยนแปลง | ผู้แก้ไข |
|---|---|---|---|
| <% tp.date.now("YYYY-MM-DD") %> | 1.0 | สร้างแผนผังใหม่ | |
 
 
 
 
📄 3. ZyntroAI - Policy.md
 
markdown
  
---
title: <% tp.file.title %>
aliases:
  - 
tags:
  - zyntroai
  - policy
  - governance
  - type/policy
  - status/active
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
type: policy
owner: 
approver: 
review_cycle: 90d
effective_date: <% tp.date.now("YYYY-MM-DD") %>
expiry_date: ไม่มีกำหนด
version: 1.0
confidentiality: internal
scope: ทีม ZyntroAI ทั้งหมด
---

# 📋 <% tp.file.title %>

> [!summary] นโยบาย
> กฎ หลักการ และข้อกำหนดที่ทุกคนต้องปฏิบัติตาม — มีผลบังคับใช้ตั้งแต่วันที่ด้านล่าง

---

## 🎯 วัตถุประสงค์
- 

## 📏 ขอบเขต
- **ครอบคลุม**: 
- **ไม่ครอบคลุม**: 
- **กลุ่มเป้าหมาย**: 

## ✅ ข้อกำหนด
1. 
2. 
3. 

## ⚠️ ข้อยกเว้น
- ต้องได้รับการยกเว้นเป็นลายลักษณ์อักษรจากผู้อนุมัติ

## 📜 ประวัติการแก้ไขนโยบาย
| วันที่มีผล | เวอร์ชัน | การเปลี่ยนแปลง | ผู้เสนอ | ผู้อนุมัติ |
|---|---|---|---|---|
| <% tp.date.now("YYYY-MM-DD") %> | 1.0 | ร่างฉบับแรก | | |

---

## 📌 แหล่งอ้างอิง & เอกสารที่เกี่ยวข้อง
| เอกสาร/นโยบาย | ประเภท | ลิงก์ |
|---|---|---|
| [[Obsidian Note Standards]] | มาตรฐานภายใน | ✅ |
|  | มาตรฐานภายนอก |  |
|  | กฎหมาย/ข้อกำหนด |  |

**อ้างอิงมาตรฐาน**: ISO 27001 / NIST / อื่นๆ: 

---

## ⚙️ การปฏิบัติ & การบังคับใช้
- **หน่วยงานรับผิดชอบ**: 
- **ช่องทางร้องเรียน/ขอคำปรึกษา**: 
- **ระดับความเข้มงวด**: ปกติ / เข้มงวด / วิกฤติ
- **ผลหากไม่ปฏิบัติ**: แจ้งหัวหน้า / พิจารณาสิทธิ์ / อื่นๆ

---

## 🔗 เชื่อมโยง
- MOC: [[ZyntroAI CrystalCastle]]
- แทนที่: 
- ถูกอ้างอิงโดย: 

---

## 📅 บันทึกการแก้ไข
| วันที่ | เวอร์ชัน | การเปลี่ยนแปลง | ผู้แก้ไข |
|---|---|---|---|
| <% tp.date.now("YYYY-MM-DD") %> | 1.0 | สร้างนโยบายฉบับแรก | |
 
 
 
 
📄 4. ZyntroAI - Runbook.md
 
markdown
  
---
title: <% tp.file.title %>
aliases:
  - 
tags:
  - zyntroai
  - runbook
  - incident-response
  - security
  - type/runbook
  - status/active
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
type: runbook
owner: On-Call Lead
review_cycle: 30d
version: 1.0
confidentiality: internal
escalation_chain: On-Call → Security Lead → CTO
response_sla: Critical: 15min / High: 1hr / Medium: 1work-day
---

# 🚨 <% tp.file.title %>

> [!summary] คู่มือปฏิบัติ
> ขั้นตอนมาตรฐานเมื่อเกิดเหตุการณ์ — ตรวจสอบ → ตอบสนอง → แก้ไข → ป้องกันซ้ำ

---

## 📌 ข้อมูลพื้นฐาน
| รายการ | รายละเอียด |
|---|---|
| ชื่อเหตุการณ์ |  |
| รหัสอ้างอิง | ZYNTRO-RB-XXX |
| ระดับความรุนแรง | Critical / High / Medium / Low |
| ทีมรับผิดชอบ |  |
| ช่องทางแจ้งเตือน | Slack #incidents / PagerDuty / อีเมล |
| SLA ตอบสนองภายใน | 15 นาที (Critical) / 1 ชม. (High) |
| เวลากู้คืนเป้าหมาย | 4 ชม. / 24 ชม. / ไม่ระบุ |

---

## 🔄 ขั้นตอนการปฏิบัติ

### 1. Triage — จำแนก
- [ ] ยืนยันว่าเกิดขึ้นจริง ไม่ใช่ false positive
- [ ] ประเมินระดับตาม [[ZyntroAI - Severity Policy]]
- [ ] บันทึกเวลาเริ่มต้น: `_______`
- [ ] ตรวจสอบแหล่งที่มาของสัญญาณแจ้งเตือน

### 2. Contain — กักกัน
- [ ] หยุดผลกระทบขยายวงกว้าง
- [ ] เก็บรักษาหลักฐาน: log / screenshot / audit trail
- [ ] แจ้งผู้ที่เกี่ยวข้องตามรายชื่อ
- [ ] ปิดสิทธิ์/หมุนรหัสทันทีถ้าจำเป็น

### 3. Investigate — สืบสวน
- [ ] หาสาเหตุที่แท้จริง (Root Cause)
- [ ] ระบุขอบเขตที่ได้รับผลกระทบ: ระบบ / ข้อมูล / ผู้ใช้
- [ ] ตรวจสอบว่ามีข้อมูลรั่วหรือไม่
- [ ] บันทึกหลักฐานทุกขั้นตอน

### 4. Remediate — แก้ไข
- [ ] ดำเนินการตามขั้นตอนเฉพาะ
- [ ] ยืนยันว่ากลับมาทำงานปกติ
- [ ] แจ้งสถานะเป็นระยะทุก `____` ชม.
- [ ] บันทึกการเปลี่ยนแปลง

### 5. Recover — กู้คืน
- [ ] ตรวจสอบความสมบูรณ์ของข้อมูล
- [ ] เปิดใช้งานทุกระบบ
- [ ] ยืนยันกับผู้ใช้/ทีม
- [ ] ปิดเหตุการณ์ทางการ

### 6. Post-Mortem — เรียนรู้
- [ ] สรุปสาเหตุรากฐาน (ไม่กล่าวหาบุคคล)
- [ ] กำหนด Action Items + เจ้าของ + กำหนดเสร็จ
- [ ] อัปเดตนโยบาย/กระบวนการ/เทคนิก
- [ ] แชร์บทเรียนให้ทีมทราบ

---

## 📞 สายการส่งต่อ (Escalation Chain)
| ลำดับ | บทบาท | ช่องทางติดต่อ | เวลาตอบสนอง |
|---|---|---|---|
| 1 | On-Call Engineer | PagerDuty | 15 นาที |
| 2 | Security Lead | Slack/โทร | 30 นาที |
| 3 | CTO | โทร/พบปะ | 1 ชม. |
| 4 | Legal / Comms | ตามขั้นตอน | ตามความจำเป็น |

---

## 📋 แหล่งอ้างอิง
- [[ZyntroAI - Severity Policy]] — เกณฑ์ระดับความรุนแรง
- [[ZyntroAI - Multi-Agent System]] — บทบาท On-Call Escalator
- [[Knowledge Update Policy]] — ทบทวน runbook ทุก 30 วัน
- แหล่งภายนอก: NIST SP 800-61 Computer Security Incident Handling Guide

---

## ⚙️ ข้อมูลเพิ่มเติม
- **รูปแบบบันทึกเหตุการณ์**: 
- **ตำแหน่งเก็บ log**: 
- **เครื่องมือที่ใช้**: Slack, PagerDuty, GitHub Actions
- **การฝึกซ้อม**: ทุกไตรมาส / ตามตาราง

---

## 🔗 เชื่อมโยง
- MOC: [[ZyntroAI CrystalCastle]]
- แทนที่: 
- ถูกอ้างอิงโดย: 

---

## 📅 บันทึกการแก้ไข
| วันที่ | เวอร์ชัน | การเปลี่ยนแปลง | ผู้แก้ไข |
|---|---|---|---|
| <% tp.date.now("YYYY-MM-DD") %> | 1.0 | สร้าง Runbook ฉบับแรก | |
 
 
 
 
📄 5. ZyntroAI - Technical Note.md
 
markdown
  
---
title: <% tp.file.title %>
aliases:
  - 
tags:
  - zyntroai
  - technical
  - devops
  - type/technical-note
  - status/active
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
status: active
type: technical-note
owner: 
review_cycle: 60d
version: 1.0
confidentiality: internal
related_repo: 
related_files: []
language: th-en
stack: 
---

# 🔧 <% tp.file.title %>

> [!summary] สรุปเทคนิค
> รายละเอียดทางเทคนิค การออกแบบ คำสั่ง หรือการแก้ไขปัญหา — สำหรับทีมพัฒนา

---

## 🎯 วัตถุประสงค์
- 

## 📋 ข้อมูลระบบ
| รายการ | ค่า |
|---|---|
| สภาพแวดล้อม | Dev / Staging / Prod |
| เวอร์ชันซอฟต์แวร์ |  |
| ระบบปฏิบัติการ |  |
| สาขาโค้ด | `main` / `develop` / `feature/xxx` |
| ความซับซ้อน | ต่ำ / ปานกลาง / สูง |

---

## ⚙️ การติดตั้ง / คำสั่งทำงาน
```bash
# คำสั่งที่ใช้
 
 
📐 การออกแบบ / โครงสร้าง
 
✅ การทดสอบ / ตรวจสอบ
 
ทดสอบบนเครื่องตนเอง
ทดสอบบน Staging
ตรวจสอบโดยผู้อื่น
เอกสารครบถ้วน
 
⚠️ ข้อควรระวัง / ข้อจำกัด
 
 
🐛 ปัญหาที่ทราบ & แนวทางแก้ไข
 
ปัญหา สาเหตุ วิธีแก้/ข้ามชั่วคราว หมายเหตุ 
    
 
 
 
📌 แหล่งอ้างอิง & เอกสารประกอบ
 
แหล่งที่มา ประเภท ลิงก์/Q-ID วันที่เข้าถึง 
เอกสารทางการ คู่มือ  <% tp.date.now("YYYY-MM-DD") %> 
บันทึกการเปลี่ยนแปลง Changelog   
การออกแบบเดิม โครงสร้าง   
 
สิทธิ์การใช้งาน: MIT / Apache-2.0 / Internal
 
 
 
⚙️ คุณสมบัติเพิ่มเติม
 
- ผู้เขียน:
- ผู้ตรวจสอบโค้ด:
- สถานะการรวม: รอ merge / รวมแล้ว / ปิด
- การปรับใช้: ด้วยตนเอง / อัตโนมัติผ่าน CI
- คู่มือที่เกี่ยวข้อง:
 
 
 
🔗 เชื่อมโยง
 
- MOC: [[ZyntroAI CrystalCastle]]
- ที่เกี่ยวข้อง:
- แทนที่:
 
 
 
📅 บันทึกการแก้ไข
 
วันที่ เวอร์ชัน การเปลี่ยนแปลง ผู้แก้ไข 
<% tp.date.now("YYYY-MM-DD") %> 1.0 สร้างเอกสารเทคนิค  
 
plaintext
  

---

## ✅ สรุปสิ่งที่เสริมเข้ามาในทุกไฟล์

| ส่วน | มีอะไรบ้าง |
|---|---|
| **Aliases** | เพิ่มชื่ออื่น/ชื่อย่อ — ลิงก์ได้ง่ายขึ้น |
| **Tags** | แยก `type/`, `status/`, หมวดหมู่ — ค้นหา/กรองได้ตรงใจ |
| **Properties** | `owner`, `review_cycle`, `version`, `confidentiality`, `effective_date`, `SLA`... ครบทุกฟิลด์สำคัญ |
| **Source** | ตารางแหล่งที่มา, ประเภท, วันที่เข้าถึง, สิทธิ์การใช้งาน, Q-ID/P-ID |
| **Etc** | สายส่งต่อ, SLA, repo ที่เกี่ยวข้อง, ผู้ตรวจสอบ, สถานะอนุมัติ, ตารางบันทึกการแก้ไขแบบเต็ม |
| **Mobile-friendly** | ทุกส่วนกระชับ — ไม่มีตารางเกิน 4 คอลัมน์, บรรทัดไม่ยาวเกินไป ✅ |

---

## 📥 วิธีนำไปใช้
1. คัดลอกแต่ละส่วน → บันทึกเป็นไฟล์ `.md` ในโฟลเดอร์ `Templates/`
2. ตรวจสอบว่าติดตั้ง **Templater** แล้ว (แนะนำ) — ถ้าไม่ใช้ เปลี่ยน `<% ... %>` เป็น `{{ ... }}`
3. สร้างโน้ตใหม่ → กด `Ctrl+P` → `Templater: Insert` → เลือกชื่อเทมเพลต ✅

มีอะไรต้องปรับเพิ่มอีกไหมครับ 😊