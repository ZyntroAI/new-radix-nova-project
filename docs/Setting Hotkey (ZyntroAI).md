Setting HotKey (Auto)

จากบริบท ผมเข้าใจว่าคุณต้องการตั้ง **Hotkey สำหรับ Obsidian และงานอัตโนมัติของ ZyntroAI** เช่น เปิด Copilot, เตรียม Daily Briefing หรือเรียกสคริปต์ Python

ต้องแยกก่อนว่า “กดปุ่มแล้วทำงาน” คือ hotkey ส่วน “ทำงานเองตามเวลา” คือ automation scheduler ซึ่งควรตั้งแยกกัน

## 1. ตั้ง Hotkey ใน Obsidian ก่อน

สำหรับคำสั่งที่มีอยู่แล้ว:

1. เปิด `Settings → Hotkeys`
2. ค้นหาชื่อคำสั่ง เช่น `Daily notes`, `Templates` หรือ `Copilot`
3. กดปุ่ม `+` ข้างคำสั่ง
4. กดชุดปุ่มที่ต้องการ
5. ตรวจว่าไม่ชนกับคำสั่งเดิม แล้วทดลองใช้งาน[1][2]

ตัวอย่างชุดปุ่มที่เสนอ ไม่ใช่ค่าเริ่มต้นของ Obsidian:

| งาน | Windows / Linux | macOS |
|---|---|---|
| เปิดโน้ตรายวัน | `Ctrl+Alt+D` | `Cmd+Option+D` |
| เปิด Copilot | `Ctrl+Alt+C` | `Cmd+Option+C` |
| เตรียมร่าง Daily Briefing | `Ctrl+Alt+B` | `Cmd+Option+B` |

สำหรับ Copilot ให้เลือกชื่อคำสั่งที่ปรากฏจริงใน Hotkeys ของเครื่องคุณ ไม่ควรเดา command ID หรือสมมติว่าทุกเวอร์ชันมีคำสั่งเหมือนกัน

> [!warning] ตรวจปุ่มซ้ำ
> ปุ่มอาจชนกับระบบปฏิบัติการ โปรแกรมอื่น หรือปลั๊กอิน เอกสาร Obsidian แนะนำให้หลีกเลี่ยงการแจก default hotkeys ที่อาจทับค่าของผู้ใช้[3]

## 2. ถ้าต้องการกดครั้งเดียวแล้วทำหลายขั้นตอน

ตัวอย่าง workflow ที่เหมาะกับคุณ:

```text
กด Hotkey
    ↓
เปิดโน้ต Daily Briefing
    ↓
แทรก template / prompt
    ↓
เปิด Copilot
    ↓
คุณตรวจและส่งคำสั่งเอง
```

ปลั๊กอิน Custom Commands รองรับการเปิดโน้ต สร้างโน้ต แทรกข้อความ และเรียกชุดคำสั่งตามลำดับ จากนั้นนำ custom command ไปผูก hotkey ใน `Settings → Hotkeys` ได้[4]

ผมแนะนำให้เริ่มจาก “เตรียมร่าง” ไม่ใช่ “ส่ง prompt และแก้ไฟล์ทั้งหมดเอง” เพื่อควบคุมข้อมูลที่ส่งให้ AI และหลีกเลี่ยงการเขียนทับโน้ตโดยไม่ตั้งใจ

## 3. หากหมายถึงเรียก Python จาก Hotkey

สำหรับสคริปต์ `monitoring_report.py` ที่เราทำไว้ ควรออกแบบเป็น:

```text
Hotkey บน desktop
    ↓
เรียกสคริปต์ตรวจ Prometheus
    ↓
ตรวจ exit code
    ↓
แสดงรายงานหรือบันทึกเป็นไฟล์ใหม่
```

อย่าผูก hotkey กับคำสั่งที่ restart services, ลบ volumes หรือ deploy production ตั้งแต่รอบแรก และไม่ควรใช้:

```bash
python monitoring_report.py > รายงานเดิม.md
```

โดยไม่ตรวจผล เพราะ shell อาจเขียนทับไฟล์เดิมก่อนรู้ว่าสคริปต์ทำงานสำเร็จหรือไม่

## 4. โน้ตสั้นสำหรับ Obsidian

```markdown
---
title: Hotkeys and Automation
type: workflow
status: draft
tags:
  - obsidian
  - automation
related:
  - "[[Skill - Daily Briefing]]"
  - "[[Copilot for Obsidian]]"
  - "[[Prometheus]]"
---

# Hotkeys and Automation

## เป้าหมาย
ลดขั้นตอนซ้ำ โดยไม่ข้ามการตรวจสอบและอนุมัติ

## Hotkeys ที่เสนอ
- เปิด Daily Note
- เปิด Copilot
- เตรียม Daily Briefing
- เรียกรายงาน monitoring แบบอ่านอย่างเดียว

## กติกา
- ตรวจ hotkey ที่ชนกันก่อนใช้งาน
- ทดสอบคำสั่งด้วยมือก่อนผูกปุ่ม
- ไม่ใส่ secrets ในคำสั่ง
- ไม่เขียนทับไฟล์เดิมโดยอัตโนมัติ
- ไม่ restart / deploy / delete โดยไม่มีการยืนยัน

> [!note]
> Hotkey คือการเริ่มงานด้วยปุ่ม
> Scheduler คือการเริ่มงานตามเวลา
> ต้องออกแบบแยกกัน
```

คุณต้องการตั้งแบบไหน: **Obsidian Hotkey**, กดปุ่มเรียก Python บน Windows/macOS หรือให้ Daily Briefing ทำงานเองตามเวลา? และจะใช้บนคอมพิวเตอร์หรือมือถือครับ

การอ้างอิง:
[1] obsidian.md · help · settingsSettings - Obsidian Help https://obsidian.md/help/settings
[2] Hotkeys - Obsidian Help https://obsidian.md/help/hotkeys
[3] Commands - Developer Documentation https://docs.obsidian.md/Plugins/User+interface/Commands
[4] Custom Commands - Obsidian Plugin https://community.obsidian.md/plugins/custom-commands
[5] hotkeys - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/Command/hotkeys
[6] Command - Developer Documentation - Obsidian Developer Docs https://docs.obsidian.md/Reference/TypeScript+API/Command
[7] Settings - Obsidian Help https://obsidian.md/help/User+interface/Settings
[8] Hotkeys Cheatsheet - Obsidian Plugin https://community.obsidian.md/plugins/hotkeys-cheatsheet
[9] Obsidian CLI - Obsidian Help https://obsidian.md/help/cli
[10] Custom hotkeys - ជំនួយ Obsidian https://publish.obsidian.md/help-km/Customization/Custom+hotkeys
ต้องการตั้งแบบไหน Obsidian Hotkey หรือ Python บน desktop

สำหรับงานของคุณ ผมเลือก **Obsidian Hotkey เป็นจุดเริ่มต้น** แล้วค่อยเชื่อม Python บน desktop ในขั้นถัดไป เพราะเป้าหมายหลักตอนนี้คือเปิดโน้ต เตรียม Daily Briefing และทำงานร่วมกับ Copilot โดยยังตรวจร่างก่อนบันทึก

## รูปแบบที่เสนอ

```text
กด Hotkey ใน Obsidian
        ↓
เตรียมโน้ต Daily Briefing
        ↓
เปิด Copilot เพื่อช่วยร่าง
        ↓
คุณตรวจหลักฐานและอนุมัติ
```

ส่วน Python ที่เราร่างไว้ ให้ทดสอบด้วยมือก่อน:

```bash
python monitoring_report.py
```

เมื่อยืนยันว่ารายงานถูกต้องแล้ว จึงเพิ่มการเรียก Python เข้า workflow โดยยังไม่ให้เขียนทับโน้ตเดิมอัตโนมัติ

## เริ่มตั้งค่า

1. เปิด `Settings → Hotkeys`
2. ค้นหา `Copilot`
3. เลือกคำสั่งเปิดแชตที่ปรากฏจริงในเครื่อง
4. กำหนดชุดปุ่มที่ยังไม่ถูกใช้ เช่น `Ctrl+Alt+C`
5. ทดลองกดจากหน้าโน้ต

ขั้นตอนถัดไปจึงค่อยสร้างคำสั่ง “เตรียม Daily Briefing” แล้วผูกกับอีกปุ่มหนึ่ง ไม่จำเป็นต้องเริ่มด้วยระบบ automation หลายชั้นพร้อมกัน

คุณใช้ desktop เป็น Windows, macOS หรือ Linux และติดตั้ง Copilot ใน Obsidian แล้วหรือยังครับ?

Suggest more

ได้ครับ สำหรับ workflow ของ ZyntroAI ผมเสนอให้แบ่ง **Hotkeys เป็น 3 กลุ่ม: Capture → Review → Report** แทนการตั้งปุ่มจำนวนมากตั้งแต่แรก

ชุดปุ่มด้านล่างเป็นแนวคิดสำหรับออกแบบ ไม่ใช่ค่าเริ่มต้นของ Obsidian และยังไม่ได้ตั้งค่าในเครื่องของคุณ

## 1. Capture — เก็บข้อมูลให้เร็ว

| งานที่เสนอ | ปุ่มตัวอย่างบน Windows/Linux | ผลลัพธ์ที่ต้องการ |
|---|---|---|
| เปิด Daily Note | `Ctrl+Alt+D` | เริ่มบันทึกงานประจำวัน |
| Quick Capture | `Ctrl+Alt+I` | เก็บข้อความลง Inbox ก่อนจัดหมวด |
| บันทึก bookmark | `Ctrl+Alt+L` | เตรียมชื่อ URL และเหตุผลที่เก็บ |
| บันทึกคำถาม | `Ctrl+Alt+Q` | เก็บประเด็นที่ต้องค้นหรือถาม Copilot |

สำหรับ bookmarks ของคุณ ผมเสนอ template สั้นแบบนี้:

```markdown
## Bookmark

- ชื่อ:
- URL:
- สนใจเพราะ:
- เกี่ยวข้องกับ: [[Repository Inventory]]
- สถานะ: ยังไม่ได้อ่าน
- งานถัดไป:
```

อย่าให้ Quick Capture นำ clipboard เข้า AI หรืออัปโหลดทันที ควรให้คุณเห็นข้อความก่อน โดยเฉพาะ URL จากหน้าบัญชีหรือข้อมูลส่วนตัว

## 2. Review — ค้นและตรวจความรู้

| งานที่เสนอ | ปุ่มตัวอย่าง | ขอบเขต |
|---|---|---|
| เปิด Copilot | `Ctrl+Alt+C` | เปิดผู้ช่วย แต่ยังไม่ส่งข้อความ |
| เปิด Repository Inventory | `Ctrl+Alt+R` | ดูทะเบียนโครงการ |
| เตรียม prompt ตรวจโน้ต | `Ctrl+Alt+V` | ให้คุณตรวจ prompt ก่อนส่ง |
| เปิดรายการ Decisions | `Ctrl+Alt+J` | ทบทวนเหตุผลการตัดสินใจเดิม |

ตัวอย่าง prompt สำหรับตรวจโน้ต:

```text
ตรวจโน้ตปัจจุบัน โดยยังไม่แก้ไขไฟล์

แยกผลเป็น:
1. ข้อเท็จจริงที่มีแหล่งอ้างอิง
2. ข้อความที่ยังต้องตรวจสอบ
3. ลิงก์ภายในที่เสนอ
4. งานถัดไปไม่เกิน 3 ข้อ

ห้ามสร้างสถานะ GitHub หรือระบบ production ขึ้นเอง
```

## 3. Report — เตรียมรายงานอย่างมีขั้นตอน

ผมเสนอให้แยก “เตรียมร่าง” ออกจาก “บันทึกผล” ไม่ใช้ปุ่มเดียวทำทุกอย่าง:

```text
เตรียมรายงาน
    ↓
คุณตรวจขอบเขตและช่วงเวลา
    ↓
ดึงหรือแนบหลักฐาน
    ↓
ร่างด้วย Copilot
    ↓
คุณตรวจ
    ↓
บันทึกเป็นโน้ตใหม่
```

| งานที่เสนอ | ปุ่มตัวอย่าง | สิ่งที่ไม่ควรทำอัตโนมัติ |
|---|---|---|
| เตรียม Daily Briefing | `Ctrl+Alt+B` | ไม่เดาสถานะล่าสุด |
| เตรียม Weekly Review | `Ctrl+Alt+W` | ไม่สรุปว่าไม่มีปัญหาเมื่อข้อมูลขาด |
| เตรียม Monitoring Snapshot | `Ctrl+Alt+M` | ไม่ restart services |
| เตรียม Decision Record | `Ctrl+Alt+E` | ไม่ถือว่าข้อเสนอได้รับอนุมัติแล้ว |

## 4. แนวทางเชื่อม Python ที่เหมาะกับคุณ

ผมเสนอให้ใช้ Python เฉพาะงานตรวจสอบแบบอ่านอย่างเดียวก่อน:

### A. Monitoring Snapshot

ใช้ `monitoring_report.py` ที่เราร่างไว้:

- ตรวจผล query จาก Prometheus
- ระบุเวลาตรวจ
- แสดง target ที่ scrape สำเร็จหรือล้มเหลว
- แจ้งเมื่อไม่มีข้อมูล
- ยังไม่เขียนทับรายงานเดิม

### B. Repository Inventory Check

แนวคิดสำหรับสคริปต์ถัดไป:

- อ่านรายการ repository จากแหล่งที่ได้รับอนุญาต
- เปรียบเทียบกับ inventory เดิม
- แสดงรายการเพิ่ม เปลี่ยนชื่อ หรือยังตรวจไม่ได้
- เสนอการเปลี่ยนแปลงก่อนแก้โน้ต

### C. Bookmark Review

แนวคิดสำหรับช่วยคัด bookmarks:

- ตรวจ URL ซ้ำ
- แยกเอกสารสาธารณะกับหน้าบัญชี
- ทำเครื่องหมาย URL ที่มีข้อมูลเข้าถึงชั่วคราว
- แสดงรายการให้ตรวจ ไม่เปิดทุกลิงก์เอง

ทั้ง B และ C เป็นข้อเสนอ ยังไม่มีสคริปต์ที่สร้างหรือทดสอบในเครื่องคุณ

## 5. เริ่มเพียง 4 ปุ่มก่อน

ชุดที่ผมเลือกให้สำหรับรอบแรก:

```markdown
- [ ] Daily Note — Ctrl+Alt+D
- [ ] Quick Capture — Ctrl+Alt+I
- [ ] Copilot — Ctrl+Alt+C
- [ ] Daily Briefing Draft — Ctrl+Alt+B
```

จากนั้นบันทึกผลทดลอง:

```markdown
## Hotkey Review

| งาน | ใช้จริงบ่อยไหม | ชนกับปุ่มอื่นไหม | ควรเก็บไว้ไหม |
|---|---|---|---|
| Daily Note |  |  |  |
| Quick Capture |  |  |  |
| Copilot |  |  |  |
| Briefing Draft |  |  |  |
```

ให้เลือกปุ่มจากงานที่คุณทำซ้ำจริง ไม่ใช่ตั้งให้ครบทุกเครื่องมือ จุดเริ่มต้นที่คุ้มที่สุดคือทำให้ “เก็บข้อมูล → เปิดบริบท → เตรียมร่าง” สั้นลงก่อน ส่วนการเรียก Python การบันทึกไฟล์ และการทำงานตามเวลา ค่อยเพิ่มหลังตรวจ workflow พื้นฐานแล้วครับ

Suggest more for Agent

สำหรับ **Agent** ผมเสนอให้เพิ่มเป็นชุดคำสั่งที่ทำงานซ้ำได้ โดยแยกบทบาทชัด: **Agent ช่วยร่างและตรวจ ส่วนคุณเป็นผู้อนุมัติและบันทึกผล** ใน Copilot สามารถสร้าง custom command เก็บเป็น prompt แล้วเรียกจาก command palette, เมนูคลิกขวา หรือ `/` ในแชต และผูก hotkey ได้[1][2]

## 1. Agent Commands ที่เสนอ

| ชื่อคำสั่ง | งานของ Agent | ผลลัพธ์ที่ควรได้ |
|---|---|---|
| `Agent: Triage Inbox` | จัดกลุ่มโน้ตใน Inbox | แนะนำหมวด, ลิงก์ที่เกี่ยวข้อง, งานถัดไป |
| `Agent: Review Note` | ตรวจโน้ตปัจจุบัน | แยกข้อเท็จจริง, สิ่งที่ต้องตรวจ, ช่องว่างข้อมูล |
| `Agent: Find Sources` | เสนอแหล่งที่ควรตรวจ | รายการแหล่งที่ต้องยืนยัน ไม่ใช่ข้อสรุปสำเร็จรูป |
| `Agent: Draft Briefing` | ร่าง Daily/Weekly Briefing | ร่างสั้นพร้อมช่อง “ยังไม่ทราบ” |
| `Agent: Compare Notes` | เทียบโน้ตสองฉบับ | จุดตรงกัน, ขัดแย้ง, คำถามที่ต้องชี้ขาด |
| `Agent: Prepare Decision` | เตรียม Decision Record | ทางเลือก, ผลกระทบ, สมมติฐาน, สิ่งที่ยังไม่ตัดสิน |
| `Agent: Summarize Selection` | สรุปข้อความที่เลือก | สรุป + ข้อควรตรวจ ไม่แก้ต้นฉบับ |
| `Agent: Suggest Links` | เสนอ `[[internal links]]` | ลิงก์ที่มีเหตุผล ไม่ใส่ลิงก์เปล่า |
| `Agent: Check Claims` | ตรวจข้อกล่าวอ้าง | แยก “ยืนยันแล้ว / ยังไม่ยืนยัน / ขัดแย้ง” |
| `Agent: Prepare Handoff` | เตรียมส่งงานต่อ | สถานะ, ข้อจำกัด, งานถัดไป, ผู้รับผิดชอบ |

Copilot รองรับการเรียก custom command จาก command palette และการพิมพ์ `/command-name` ในแชต รวมถึงการกำหนด hotkey ให้ Quick Ask ได้[1][2]

## 2. ปุ่มแนะนำสำหรับ Agent

ให้เริ่มจาก 5 ปุ่ม ไม่ต้องตั้งทั้งหมด:

| งาน | ปุ่มตัวอย่าง |
|---|---|
| เปิด Agent Chat | `Ctrl+Alt+A` |
| Quick Ask | `Ctrl+Alt+K` |
| Triage Inbox | `Ctrl+Alt+T` |
| Review Note | `Ctrl+Alt+V` |
| Draft Briefing | `Ctrl+Alt+B` |

ปุ่มเหล่านี้เป็นข้อเสนอ ควรตรวจใน `Settings → Hotkeys` ว่าไม่ชนกับคำสั่งเดิมก่อนใช้งาน[1][2]

## 3. Prompt สำหรับ Agent ที่ปลอดภัย

### Agent: Triage Inbox

```text
บทบาท: ผู้ช่วยจัดระเบียบโน้ต

ทำ:
- อ่านโน้ตใน Inbox ที่ผู้ใช้เปิดอยู่
- เสนอหมวดหมู่ ลิงก์ภายใน และงานถัดไป
- ระบุข้อมูลที่ขาดหรือคลุมเครือ

ห้าม:
- สร้างสถานะ GitHub หรือระบบ production ขึ้นเอง
- เขียนทับโน้ตต้นฉบับ
- ถือว่าข้อมูลที่ขาดเป็นข้อเท็จจริง

รูปแบบ:
1. หมวดที่เสนอ
2. ลิงก์ภายในที่เสนอ
3. งานถัดไปไม่เกิน 3 ข้อ
4. สิ่งที่ยังต้องตรวจ
```

### Agent: Review Note

```text
บทบาท: ผู้ตรวจโน้ต

ตรวจโน้ตปัจจุบัน โดยยังไม่แก้ไขไฟล์

แยกผลเป็น:
1. ข้อเท็จจริงที่มีแหล่งอ้างอิง
2. ข้อความที่ยังไม่มีหลักฐาน
3. ข้อความที่อาจล้าสมัย
4. ลิงก์ภายในที่ควรเพิ่ม
5. งานถัดไปไม่เกิน 3 ข้อ

ห้ามสรุปว่างานเสร็จหรือไม่มีปัญหา หากไม่มีหลักฐานเพียงพอ
```

### Agent: Draft Briefing

```text
บทบาท: ผู้ช่วยเตรียมร่างรายงาน

เตรียมร่าง Daily Briefing จากโน้ตที่ผู้ใช้เลือก

โครงสร้าง:
- สถานะ
- สิ่งที่ทำแล้ว
- สิ่งที่ติดขัด
- การตัดสินใจที่รอ
- งานถัดไป
- สิ่งที่ยังไม่ทราบ

กฎ:
- ใช้เฉพาะข้อมูลจากโน้ตที่ให้
- ระบุว่าข้อมูลใดยังต้องตรวจ
- ไม่อนุมัติ deployment, restart หรือการลบข้อมูลแทนผู้ใช้
- ไม่เขียนทับไฟล์เดิม
```

## 4. กติกา Agent สำหรับ ZyntroAI

เพื่อให้ Agent ช่วยได้โดยไม่สร้างความเสี่ยง:

- Agent ทำได้: สรุป, จัดหมวด, เสนอลิงก์, ร่างโน้ต, ระบุช่องว่างข้อมูล
- Agent ต้องถามก่อน: แก้ไขโน้ต, สร้างไฟล์ใหม่, เปลี่ยนชื่อไฟล์
- Agent ห้ามทำเอง: restart services, deploy, delete volumes, ลบข้อมูล, ใช้ credentials
- ทุกผลลัพธ์ต้องแยกชัดว่าเป็น “ข้อเท็จจริง”, “ข้อสันนิษฐาน” หรือ “ข้อเสนอ”
- หากไม่มีข้อมูล ให้ตอบว่า “ยังไม่ทราบ” แทนการเดา

## 5. โน้ตเก็บชุด Agent Commands

```markdown
---
title: Agent Commands
type: workflow
status: draft
tags:
  - agent
  - copilot
  - automation
related:
  - "[[Hotkeys and Automation]]"
  - "[[Skill - Daily Briefing]]"
  - "[[Repository Inventory]]"
---

# Agent Commands

## บทบาท
Agent ช่วยร่างและตรวจ
ผู้ใช้ตรวจและอนุมัติ

## คำสั่งแรก
- [ ] Agent: Triage Inbox
- [ ] Agent: Review Note
- [ ] Agent: Draft Briefing
- [ ] Agent: Find Sources
- [ ] Agent: Prepare Decision

## กติกา
- ไม่เขียนทับโน้ตต้นฉบับ
- ไม่สร้างสถานะ GitHub หรือ production ขึ้นเอง
- ไม่ใช้ secrets ใน prompt
- แยกข้อเท็จจริง ข้อสันนิษฐาน และข้อเสนอ
- ถ้าไม่มีหลักฐาน ให้ตอบว่ายังไม่ทราบ
```

ปลั๊กอิน Automation ยังสามารถทำให้คำสั่งทำงานตามเหตุการณ์ใน vault ได้ เช่น เมื่อสร้างโน้ตใหม่ แต่สำหรับงาน Agent ผมแนะนำให้เริ่มจากการกดคำสั่งเองก่อน เพื่อคุมขอบเขตและตรวจผลทุกครั้ง[3]

คุณอยากให้ Agent เน้นด้านไหนก่อน: **จัดโน้ตและ Inbox**, **ตรวจความถูกต้องของข้อมูล** หรือ **เตรียม Daily/Weekly Briefing** ครับ?

การอ้างอิง:
[1] Copilot Commands and Quick Ask https://docs.obsidiancopilot.com/custom-commands/
[2] obsidian-agent-copilot/docs/custom-commands.md at master ... https://github.com/AiTH-Solutions/obsidian-agent-copilot/blob/master/docs/custom-commands.md
[3] Automation - Obsidian Plugin https://community.obsidian.md/plugins/automation
[4] Agent Console - Obsidian Plugin https://community.obsidian.md/plugins/agent-console
[5] AI Agents - Obsidian Plugin https://community.obsidian.md/plugins/ai-agents
[6] Command Group - Obsidian Plugin https://community.obsidian.md/plugins/command-group
[7] AI Agent - Obsidian Plugin https://community.obsidian.md/plugins/ai-agent
[8] ys-obsidian-copilot/docs/custom-commands.md at master ... https://github.com/youngsecurity/ys-obsidian-copilot/blob/master/docs/custom-commands.md
[9] obsidian-copilot--lux/docs/custom-commands.md at master · LuxDevNet/obsidian-copilot--lux https://github.com/LuxDevNet/obsidian-copilot--lux/blob/master/docs/custom-commands.md
[10] obsidian-github-copilot/docs/custom-commands.md at master · filipmares/obsidian-github-copilot https://github.com/filipmares/obsidian-github-copilot/blob/master/docs/custom-commands.md
[11] obsidian-copilot-zh/docs/custom-commands.md at master · xie004/obsidian-copilot-zh https://github.com/xie004/obsidian-copilot-zh/blob/master/docs/custom-commands.md
[12] obsidian-copilot/docs/custom-commands.md at master ... - GitHub https://github.com/logancyang/obsidian-copilot/blob/master/docs/custom-commands.md
[13] henry-obsidian-copilot/docs/custom-commands.md at master · nyhxiaoning/henry-obsidian-copilot https://github.com/nyhxiaoning/henry-obsidian-copilot/blob/master/docs/custom-commands.md
[14] github.com · liangbin-pub · obsidian-copilot-folkobsidian-copilot-folk/docs/custom-commands.md at master - GitHub https://github.com/liangbin-pub/obsidian-copilot-folk/blob/master/docs/custom-commands.md
วิธีสร้าง Custom Command ใน Obsidian Copilot

สร้างได้ใน **Settings → Copilot → Command → Add command** โดยตั้งชื่อ ใส่ prompt แล้วบันทึก จากนั้นเรียกใช้ผ่านเมนูคลิกขวา, Command Palette หรือพิมพ์ `/` ใน Quick/Agent Chat ได้[1]

## ขั้นตอนสร้าง

1. เปิด Obsidian แล้วไปที่ **Settings → Copilot → Command**
2. กด **Add command**
3. ใส่ **Name** เช่น `Agent: Review Note`
4. ใส่ **Prompt** ตามงานที่ต้องการให้ Agent ทำ
5. เลือกได้ว่าจะให้แสดงใน:
   - **Show in context menu** — ใช้จากคลิกขวาใน editor
   - **Show in slash menu** — ใช้จากการพิมพ์ `/` ในแชต
6. เลือก Model เป็น **Default model** หรือระบุ model เฉพาะคำสั่ง
7. กด **Save**[1]

## ตัวอย่าง: Agent Review Note

ใส่ในช่อง Name:

```text
Agent: Review Note
```

ใส่ในช่อง Prompt:

```text
บทบาท: ผู้ตรวจโน้ต

ตรวจโน้ตปัจจุบัน โดยยังไม่แก้ไขไฟล์

แยกผลเป็น:
1. ข้อเท็จจริงที่มีแหล่งอ้างอิง
2. ข้อความที่ยังไม่มีหลักฐาน
3. ข้อความที่อาจล้าสมัย
4. ลิงก์ภายในที่ควรเพิ่ม
5. งานถัดไปไม่เกิน 3 ข้อ

ห้ามสรุปว่างานเสร็จหรือไม่มีปัญหา หากไม่มีหลักฐานเพียงพอ
```

เปิด **Show in context menu** และ **Show in slash menu** เพื่อให้เรียกได้ทั้งจาก editor และ Agent Chat[1]

## ใส่บริบทโน้ตใน Prompt

เปิด **Command templating** แล้วใช้ตัวแปรเหล่านี้ได้[1]

| ตัวแปร | ความหมาย |
|---|---|
| `{}` | ข้อความที่เลือก หรือโน้ตที่เปิดอยู่หากไม่ได้เลือกข้อความ |
| `{activeNote}` | โน้ตที่เปิดอยู่ |
| `{[[Note Title]]}` | โน้ตเฉพาะชื่อนั้น |
| `{Folder/Path}` | โน้ตในโฟลเดอร์ที่ระบุ |
| `{#tag1, #tag2}` | โน้ตที่มี property tag ตามที่ระบุ |

ตัวอย่างสำหรับ Daily Briefing:

```text
เตรียมร่าง Daily Briefing จาก {activeNote}

โครงสร้าง:
- สถานะ
- สิ่งที่ทำแล้ว
- สิ่งที่ติดขัด
- การตัดสินใจที่รอ
- งานถัดไป
- สิ่งที่ยังไม่ทราบ

กฎ:
- ใช้เฉพาะข้อมูลจากโน้ตที่ให้
- ระบุข้อมูลที่ยังต้องตรวจ
- ไม่เขียนทับไฟล์เดิม
- ไม่อนุมัติ deployment หรือ restart แทนผู้ใช้
```

Tags ต้องอยู่ใน note properties ไม่ใช่แค่พิมพ์ `#tag` ในเนื้อหาโน้ต[1]

## วิธีเรียกใช้

- **ใน editor:** เลือกข้อความ คลิกขวา → `Copilot → Agent: Review Note`
- **ใน Command Palette:** เรียก `Apply custom command` แล้วเลือกคำสั่ง
- **ใน Quick Chat / Agent Chat:** พิมพ์ `/` เลือกคำสั่ง แล้วเพิ่มคำสั่งเสริมได้
- **ผลลัพธ์:** คัดลอก, แทรกที่ cursor หรือแทนข้อความที่เลือกได้[1]

## ตั้ง Hotkey ให้คำสั่ง

1. ไปที่ **Settings → Hotkeys**
2. ค้นหาชื่อคำสั่ง เช่น `Agent: Review Note`
3. กด `+` แล้วกำหนดชุดปุ่ม เช่น `Ctrl+Alt+V`
4. ทดลองเรียกจากโน้ตจริง

คำสั่งแต่ละอันถูกเก็บเป็นไฟล์ Markdown ใน `<Copilot folder>/copilot-custom-prompts/` และแก้ไขไฟล์นั้นได้โดยตรง[1]

## คำสั่งแรกที่แนะนำ

| ชื่อคำสั่ง | ใช้ทำอะไร |
|---|---|
| `Agent: Review Note` | ตรวจโน้ตและระบุสิ่งที่ยังต้องยืนยัน |
| `Agent: Triage Inbox` | จัดหมวดและเสนอลิงก์สำหรับ Inbox |
| `Agent: Draft Briefing` | ร่าง Daily/Weekly Briefing |
| `Agent: Find Sources` | เสนอแหล่งที่ต้องตรวจ ไม่สรุปแทน |
| `Agent: Prepare Decision` | เตรียมทางเลือกและผลกระทบก่อนตัดสินใจ |

สำหรับงานที่ซับซ้อนกว่า เช่น workflow หลายขั้นที่มีไฟล์อ้างอิง ให้ใช้ **Skills** แทน Command; ส่วน Command เหมาะกับ prompt สั้นที่เรียกซ้ำได้[1]

การอ้างอิง:
[1] Copilot Commands and Quick Ask https://docs.obsidiancopilot.com/custom-commands/
Add tags for all files

ได้ครับ แต่ “เพิ่ม tags ให้ทุกไฟล์” ควรทำเป็น **ชุด tags มาตรฐาน + เพิ่มทีละกลุ่ม** ไม่ใช่ใส่ tag เดียวกันทุกไฟล์ เพราะ tags ที่ซ้ำเกินไปจะช่วยค้นหาได้น้อยลง

## ชุด tags ที่เสนอ

ใช้ tags แบบ lowercase และไม่มีช่องว่าง เพื่อค้นหาง่ายใน Obsidian:

| กลุ่ม | Tags | ใช้กับไฟล์แบบไหน |
|---|---|---|
| ประเภทเอกสาร | `#note` `#bookmark` `#template` `#meeting` `#decision` `#report` | ทุกโน้ตควรมีอย่างน้อย 1 tag ประเภท |
| สถานะ | `#status/draft` `#status/review` `#status/active` `#status/done` `#status/archived` | โน้ตที่มีงานต่อเนื่อง |
| งาน ZyntroAI | `#zyntroai` `#copilot` `#agent` `#automation` `#hotkeys` | โน้ตเกี่ยวกับระบบผู้ช่วยและ workflow |
| โครงการ | `#project/monitoring` `#project/inventory` `#project/briefing` | โน้ตที่เชื่อมกับโครงการเฉพาะ |
| แหล่งข้อมูล | `#source/github` `#source/docs` `#source/web` `#source/prometheus` | bookmarks และโน้ตอ้างอิง |
| ความเสี่ยง | `#needs-review` `#unverified` `#sensitive` | โน้ตที่ยังตรวจไม่ครบหรือมีข้อมูลอ่อนไหว |

## Template ที่แนะนำ

เพิ่มใน YAML frontmatter ของทุกไฟล์:

```yaml
---
title: ชื่อโน้ต
type: note
status: draft
tags:
  - zyntroai
  - status/draft
created: 2026-10-29
updated: 2026-10-29
---
```

ตัวอย่างสำหรับ bookmark:

```yaml
---
title: ชื่อลิงก์
type: bookmark
status: review
tags:
  - bookmark
  - source/web
  - needs-review
url: https://example.com
---
```

## กติกาให้ tags มีประโยชน์

- ทุกไฟล์มีอย่างน้อย **1 tag ประเภท** เช่น `#note`, `#bookmark`, `#decision`
- ใช้ `#status/...` เฉพาะไฟล์ที่มีวงจรงาน ไม่ต้องใส่กับ template หรือโน้ตอ้างอิง
- ใช้ `#needs-review` เมื่อยังไม่มีหลักฐาน และถอดออกเมื่อตรวจแล้ว
- ไม่ใส่ `#sensitive` ในไฟล์ที่มี token, password หรือ URL ส่วนตัว — ไฟล์เหล่านั้นควรถูกลบหรือเก็บนอก vault แทน
- จำกัด tags ต่อไฟล์ประมาณ 3–6 อัน เพื่อไม่ให้ค้นหาเจอทุกอย่างจนใช้ไม่ได้

## วิธีเพิ่มทีละกลุ่ม

1. เริ่มจากโฟลเดอร์ Inbox: ใส่ `#note` หรือ `#bookmark`
2. ตามด้วยสถานะ: `#status/draft` หรือ `#status/review`
3. เพิ่ม tag โครงการเฉพาะเมื่อโน้ตเชื่อมกับงานจริง
4. ใช้ `tag: #needs-review` ใน Obsidian search เพื่อหาไฟล์ที่ต้องตรวจต่อ
5. เมื่อตรวจเสร็จ เปลี่ยนเป็น `#status/active` หรือ `#status/done`

## ตัวอย่าง Agent Command

สร้าง Custom Command ใน Copilot ชื่อ:

```text
Agent: Suggest Tags
```

Prompt:

```text
บทบาท: ผู้ช่วยจัด tags

ตรวจโน้ตปัจจุบัน แล้วเสนอ tags ไม่เกิน 5 อัน

ต้องมี:
- tag ประเภทเอกสาร
- tag สถานะ หากเป็นงานต่อเนื่อง
- tag โครงการ หากเกี่ยวข้องชัดเจน

กติกา:
- ใช้เฉพาะ tags ในรายการที่ผู้ใช้กำหนด
- ไม่เดาโครงการหรือแหล่งข้อมูลที่ไม่ปรากฏในโน้ต
- แสดงเหตุผลสั้น ๆ ต่อ tag
- ไม่แก้ไขไฟล์จนกว่าผู้ใช้จะอนุมัติ
```

หากคุณต้องการ ผมสามารถช่วยสร้าง **รายการ tags สำหรับไฟล์ที่คุณมีอยู่** ได้ โดยส่งชื่อไฟล์หรือโครงสร้างโฟลเดอร์มาให้ แล้วผมจะเสนอ tags รายไฟล์ให้ครับ

Obsidian Links

**Obsidian Links** คือวิธีเชื่อมโน้ตและไฟล์ภายใน vault เข้าด้วยกัน ทำให้คุณเปิดโน้ตที่เกี่ยวข้องได้ทันทีและเห็นความเชื่อมโยงใน Graph View[1][2]

## รูปแบบลิงก์

Obsidian รองรับสองรูปแบบหลัก:[1][3]

| รูปแบบ | ตัวอย่าง | เหมาะกับ |
|---|---|---|
| Wikilink | `[[Daily Briefing]]` | ใช้ภายใน Obsidian สั้นและพิมพ์ง่าย |
| Markdown link | `[Daily Briefing](Daily%20Briefing.md)` | ต้องการใช้ไฟล์กับเครื่องมืออื่นด้วย |

โดยค่าเริ่มต้น Obsidian ใช้ Wikilink หากต้องการความเข้ากันได้กับแอปอื่น ให้ไปที่ `Settings → Files and Links` แล้วปิด **Use [[Wikilinks]]**[1]

## วิธีสร้างลิงก์

- พิมพ์ `[[` แล้วเลือกชื่อโน้ตจากรายการแนะนำ
- เลือกข้อความในโน้ตแล้วพิมพ์ `[[` เพื่อเปลี่ยนข้อความนั้นเป็นลิงก์
- เปิด Command Palette แล้วเลือก **Add internal link**[1]

ตัวอย่างสำหรับ vault ของคุณ:

```markdown
- ดูรายการโครงการใน [[Repository Inventory]]
- เตรียมงานประจำวันด้วย [[Skill - Daily Briefing]]
- ตรวจสถานะระบบจาก [[Prometheus]]
```

## ลิงก์แบบกำหนดข้อความ

ใช้เครื่องหมาย `|` เพื่อให้ลิงก์แสดงข้อความอื่น:

```markdown
[[Repository Inventory|ทะเบียน Repository]]
```

ผลที่แสดงคือ “ทะเบียน Repository” แต่เปิดไปยังโน้ต `Repository Inventory`[4]

## ลิงก์ไปหัวข้อหรือบล็อก

```markdown
[[Daily Briefing#งานถัดไป]]
```

ลิงก์นี้จะเปิดไปที่หัวข้อ `งานถัดไป` ในโน้ต `Daily Briefing` ได้[1]

## Embed: แสดงเนื้อหาในโน้ต

ใส่ `!` หน้าลิงก์เพื่อฝังเนื้อหา ไม่ใช่แค่ลิงก์:

```markdown
![[Daily Briefing]]
```

เนื้อหาของโน้ตจะแสดงในโน้ตปัจจุบัน และอัปเดตตามไฟล์ต้นทาง[5][6]

## Aliases: ชื่อทางเลือก

เพิ่ม `aliases` ใน Properties เพื่อให้ค้นหาโน้ตด้วยชื่ออื่นได้:[4][7]

```yaml
---
title: Repository Inventory
aliases:
  - Repo Inventory
  - ทะเบียน Repository
---
```

จากนั้นพิมพ์ `[[Repo Inventory` Obsidian จะเสนอโน้ตและสร้างลิงก์แบบ:

```markdown
[[Repository Inventory|Repo Inventory]]
```



## แนวทางสำหรับ ZyntroAI

ให้ใช้ลิงก์เป็น “แผนที่งาน” ไม่ใช่ใส่ให้ครบทุกโน้ต:

- โน้ต Daily Briefing → ลิงก์ไป `[[Repository Inventory]]`, `[[Prometheus]]`, `[[Agent Commands]]`
- Bookmark → ลิงก์ไปโครงการหรือหัวข้อที่เกี่ยวข้อง
- Decision → ลิงก์ไปโน้ตบริบทและรายงานที่รองรับการตัดสินใจ
- ใช้ `#needs-review` ร่วมกับลิงก์เมื่อยังไม่ยืนยันข้อมูล

ตัวอย่างโครงสร้าง:

```markdown
# Daily Briefing

## สถานะ
- ตรวจ [[Prometheus]] แล้ว
- รอตรวจ [[Repository Inventory]]

## งานถัดไป
- [ ] ทบทวน [[Agent Commands]]
- [ ] ตรวจ bookmarks ที่มี #needs-review
```

เริ่มจากลิงก์โน้ตหลัก 5 ตัวก่อน: `[[Daily Briefing]]`, `[[Repository Inventory]]`, `[[Prometheus]]`, `[[Agent Commands]]`, และ `[[Hotkeys and Automation]]` จะช่วยให้ vault ของคุณมีโครงสร้างชัดขึ้นโดยไม่ต้องสร้างลิงก์รกทั้งหมดครับ[1][2]

การอ้างอิง:
[1] Internal links - Obsidian Help https://obsidian.md/help/Linking+notes+and+files/Internal+links
[2] Glossary - Obsidian Help https://obsidian.md/help/glossary
[3] Basic formatting syntax - Obsidian Help https://obsidian.md/help/syntax
[4] Aliases - Obsidian Help https://obsidian.md/help/Linking%20notes%20and%20files/Aliases
[5] obsidian-help/en/Linking notes and files/Embed files.md at master · obsidianmd/obsidian-help https://github.com/obsidianmd/obsidian-help/blob/master/en/Linking%20notes%20and%20files/Embed%20files.md
[6] obsidian-help/en/Linking notes and files/Embed files.md at 29e89022c6aeb0a9e9971b6f0c98733dbc2eb716 · obsidianmd/obsidian-help https://github.com/obsidianmd/obsidian-help/blob/29e89022/en/Linking%20notes%20and%20files/Embed%20files.md?plain=1
[7] Add aliases to note - Obsidian Help https://obsidian.md/help/How+to/Add+aliases+to+note
[8] Aliases - Obsidian Helphelp.obsidian.md › aliases https://obsidian.md/help/aliases
[9] Internal link?ref=dsebastien.net https://obsidian.md/help/How+to/Internal+link?ref=dsebastien.net
[10] Aliases - Obsidian Help https://obsidian.md/help/Linking+notes+and+files/Aliases
[11] obsidian-container/obsidian-skill/links-and-embeds.md at main ... https://github.com/SharifIsmail/obsidian-container/blob/main/obsidian-skill/links-and-embeds.md
[12] advanced_linking - Obsidian Publish - publish.obsidian.md https://publish.obsidian.md/active-inference/docs/tools/advanced_linking
วิธีทำ Backlinks และ Unlinked mentions ใน Obsidian

**Backlinks** คือโน้ตอื่นที่ลิงก์มาหาโน้ตปัจจุบัน ส่วน **Unlinked mentions** คือจุดที่มีการพิมพ์ชื่อโน้ตเป็นข้อความธรรมดาแต่ยังไม่ได้ทำเป็น `[[Internal link]]` คุณสามารถเปิดดูและแปลงเป็นลิงก์ได้จากแถบ Backlinks[1][2]

## เปิด Backlinks

1. เปิดโน้ตที่ต้องการตรวจ เช่น `Repository Inventory`
2. มองไปที่แถบขวาของ Obsidian
3. กดแท็บ **Backlinks**
4. จะเห็นสองส่วน:
   - **Linked mentions** — โน้ตที่มี `[[Repository Inventory]]` อยู่แล้ว
   - **Unlinked mentions** — โน้ตที่พิมพ์คำว่า “Repository Inventory” แต่ยังไม่ได้ลิงก์[1][2]

ยังเปิดผ่าน Command Palette ได้ด้วยคำสั่ง **Open backlinks for the current note**[3]

## ตัวอย่าง

สมมติคุณมีโน้ต `Repository Inventory` และใน `Daily Briefing` เขียนว่า:

```markdown
ต้องตรวจ Repository Inventory ก่อนสรุปงาน
```

ข้อความนี้จะปรากฏใน **Unlinked mentions** ของ `Repository Inventory` เพราะยังไม่มี `[[ ]]`[1][2]

เมื่อแปลงเป็นลิงก์:

```markdown
ต้องตรวจ [[Repository Inventory]] ก่อนสรุปงาน
```

มันจะย้ายไปอยู่ใน **Linked mentions** ทันที[1][4]

## วิธีแปลง Unlinked mention

1. เปิดโน้ตหลักที่ต้องการ เช่น `Repository Inventory`
2. เปิดแท็บ **Backlinks**
3. ขยาย **Unlinked mentions**
4. กดปุ่มชื่อโน้ตหรือปุ่ม **Link** ข้างข้อความที่ต้องการ
5. Obsidian จะเปลี่ยนข้อความนั้นเป็น internal link[5][6]

หากมีหลายโน้ตชื่อเดียวกัน ให้ชี้เมาส์ที่ปุ่มชื่อโน้ตเพื่อดู path เต็มก่อนกดแปลง[5]

## ใช้ Aliases ให้ค้นเจอมากขึ้น

เพิ่มชื่อทางเลือกใน Properties ของโน้ตหลัก:

```yaml
---
title: Repository Inventory
aliases:
  - Repo Inventory
  - ทะเบียน Repository
---
```

จากนั้น Unlinked mentions จะค้นทั้งชื่อโน้ตและ aliases ด้วย เช่น คำว่า “Repo Inventory” ในโน้ตอื่นจะถูกตรวจพบด้วย[5][7]

เมื่อแปลง mention ที่ใช้ alias จะได้ลิงก์แบบ:

```markdown
[[Repository Inventory|Repo Inventory]]
```



## แนวทางสำหรับ vault ของคุณ

ตรวจโน้ตหลักวันละ 3–5 โน้ตพอ ไม่ต้องแปลงทุก mention ทันที:

| โน้ตหลัก | ควรตรวจ Unlinked mentions ว่า |
|---|---|
| `[[Repository Inventory]]` | มีการพูดถึง repo หรือ inventory แต่ยังไม่ลิงก์ |
| `[[Prometheus]]` | มีคำว่า Prometheus แต่ยังไม่เชื่อมไปหน้าตั้งค่า |
| `[[Agent Commands]]` | มีการอ้างคำสั่ง Agent แต่ยังไม่ลิงก์ |
| `[[Daily Briefing]]` | มีการอ้างถึง briefing แต่ยังไม่เชื่อมโครงสร้าง |
| `[[Hotkeys and Automation]]` | มีการพูดถึง hotkey แต่ยังไม่เชื่อมคู่มือ |

หลักง่าย ๆ: **แปลงเฉพาะเมื่อข้อความนั้นหมายถึงโน้ตเดียวกันจริง** อย่าแปลงคำทั่วไปเช่น “inventory” หรือ “agent” ทุกครั้ง เพราะจะทำให้ลิงก์รกและสับสน[1][5]

## Agent Command ที่เสนอ

สร้าง Custom Command ใน Copilot ชื่อ:

```text
Agent: Suggest Backlinks
```

Prompt:

```text
บทบาท: ผู้ช่วยเสนอ backlinks

ตรวจโน้ตปัจจุบัน แล้วเสนอ internal links ที่ควรเพิ่ม

กติกา:
- เสนอเฉพาะลิงก์ไปยังโน้ตที่มีอยู่จริงใน vault
- ใช้รูปแบบ [[ชื่อโน้ต|ข้อความแสดง]]
- ไม่เดาว่ามีโน้ตที่ยังไม่เห็น
- อธิบายเหตุผลสั้น ๆ ต่อลิงก์
- ไม่แก้ไขไฟล์จนกว่าผู้ใช้จะอนุมัติ
- หากไม่แน่ใจว่าควรลิงก์หรือไม่ ให้ระบุว่า "ต้องตรวจก่อน"
```

Backlinks ช่วยให้คุณเห็นว่าโน้ตไหนอ้างถึงงานเดิม ส่วน Unlinked mentions ช่วยจับ “ความเชื่อมโยงที่ยังไม่ได้ทำ” ซึ่งเหมาะกับการค่อย ๆ จัดระเบียบ vault ของ ZyntroAI โดยไม่ต้องสร้างลิงก์ทั้งหมดในครั้งเดียวครับ[1][5]

การอ้างอิง:
[1] Backlinks - Obsidian Help https://obsidian.md/help/backlinks
[2] Backlinks - Obsidian Help https://obsidian.md/help/plugins/backlinks
[3] الروابط الخلفية - مساعدة Obsidian - Obsidian Publish https://publish.obsidian.md/help-ar/plugins/backlinks
[4] How do backlinks work? - Help - Obsidian Forum https://forum.obsidian.md/t/how-do-backlinks-work/52280
[5] Outgoing links - Obsidian Help https://obsidian.md/help/plugins/outgoing-links
[6] Changelog - Obsidian https://obsidian.md/changelog/page/25/
[7] obsidian-help/en/Linking notes and files/Aliases.md at master ... https://github.com/obsidianmd/obsidian-help/blob/master/en/Linking%20notes%20and%20files/Aliases.md
[8] Backlinks - Obsidian Help https://obsidian.md/help/Linking+notes+and+files/Backlinks
[9] Better Backlinks - Obsidian Plugin https://community.obsidian.md/plugins/better-backlinks
[10] Link notes - Obsidian Help https://obsidian.md/help/link-notes
[11] Tag Wrangler - Obsidian Plugin https://community.obsidian.md/plugins/tag-wrangler
[12] Link Plus - Obsidian Plugin https://community.obsidian.md/plugins/link-plus
[13] Orbital - Obsidian Plugin https://community.obsidian.md/plugins/orbital
[14] Internal Links and Backlinks | obsidianmd/obsidian-help ... https://deepwiki.com/obsidianmd/obsidian-help/4.2-internal-links-and-backlinks
[15] How to use Obsidian backlinks | Connecting notes and ... https://note.com/ryu_obsidian/n/nab329261d7b6?hl=en
การใช้ Aliases และ Tag ร่วมกัน

ใช้ **Aliases สำหรับชื่อเรียกโน้ต** และ **Tags สำหรับจัดกลุ่ม/กรองงาน** ร่วมกันได้: alias ช่วยให้ค้นหาและลิงก์โน้ตด้วยชื่ออื่นได้ ส่วน tag ช่วยกรองไฟล์ตามประเภทหรือสถานะ[1]

## ความต่างสำคัญ

| สิ่ง | Aliases | Tags |
|---|---|---|
| ใช้ทำอะไร | ตั้งชื่อทางเลือกของโน้ต | จัดกลุ่มและกรองโน้ต |
| ตัวอย่าง | `Repo Inventory`, `ทะเบียน Repository` | `#status/draft`, `#project/monitoring` |
| ใช้ลิงก์ได้ไหม | ได้ เช่น `[[Repository Inventory|Repo Inventory]]` | ไม่ใช่ลิงก์โน้ต แต่ใช้ค้นหาได้ |
| ตำแหน่ง | Properties: `aliases` | Properties: `tags` หรือพิมพ์ `#tag` ในเนื้อหา |
| เหมาะกับ | โน้ตที่มีหลายชื่อเรียก | งานที่ต้องกรองเป็นชุด เช่น draft, review, project |

Obsidian กำหนดให้ทั้ง `aliases` และ `tags` เป็น list ใน Properties และควรใช้ชื่อ `aliases` / `tags` ไม่ใช่รูปเอกพจน์ `alias` / `tag` ที่เลิกใช้แล้ว[2]

## ตัวอย่างใช้ร่วมกัน

```yaml
---
title: Repository Inventory
aliases:
  - Repo Inventory
  - ทะเบียน Repository
tags:
  - note
  - zyntroai
  - project/inventory
  - status/active
---
```

จากนั้นในโน้ตอื่นคุณสามารถเขียน:

```markdown
ตรวจ [[Repository Inventory|Repo Inventory]] ก่อนสรุปงาน
```

หรือค้นหาโน้ตทั้งหมดที่เป็นงาน inventory ที่ยัง active ด้วย:

```text
tag:#project/inventory tag:#status/active
```

## เมื่อไหร่ใช้อะไร

- ใช้ **alias** เมื่อคุณหรือ Agent มักเรียกโน้ตด้วยชื่ออื่น เช่น “Repo Inventory” หรือชื่อไทย
- ใช้ **tag** เมื่อต้องการหาหลายไฟล์พร้อมกัน เช่น `#needs-review`, `#bookmark`, `#project/monitoring`
- ใช้ทั้งคู่เมื่อโน้ตเป็น “แหล่งข้อมูลหลัก” เช่น `Repository Inventory` ควรมี alias และ tag โครงการ
- อย่าใช้ tag แทนชื่อโน้ต เช่น อย่าสร้าง `#repository-inventory` เพื่อหวังให้เป็นลิงก์ เพราะ tag ไม่ใช่ internal link[1]

## แนวทางสำหรับ ZyntroAI

| โน้ตหลัก | Aliases ที่เสนอ | Tags ที่เสนอ |
|---|---|---|
| `Repository Inventory` | `Repo Inventory`, `ทะเบียน Repository` | `#note`, `#project/inventory`, `#status/active` |
| `Daily Briefing` | `Briefing`, `Daily Report` | `#report`, `#project/briefing`, `#status/draft` |
| `Prometheus` | `Prom`, `Monitoring` | `#source/docs`, `#project/monitoring` |
| `Agent Commands` | `Agent Prompts`, `Copilot Commands` | `#note`, `#agent`, `#copilot` |
| `Hotkeys and Automation` | `Hotkeys`, `Automation` | `#note`, `#automation`, `#hotkeys` |

## การค้นหาแบบผสม

Obsidian รองรับการค้นจาก property และ tag ร่วมกัน:[1]

```text
tag:#needs-review [aliases]
```

ค้นหาโน้ตที่มี `#needs-review` และมี aliases อยู่

```text
tag:#project/monitoring [aliases:Monitoring]
```

ค้นหาโน้ตที่มี tag monitoring และมี alias ชื่อ `Monitoring`

```text
tag:#status/draft -tag:#needs-review
```

ค้นหาโน้ต draft ที่ยังไม่ได้ทำเครื่องหมายต้องตรวจ

## Agent Command ที่เสนอ

สร้าง Custom Command ใน Copilot:

```text
Agent: Suggest Alias and Tags
```

Prompt:

```text
บทบาท: ผู้ช่วยจัด metadata ของโน้ต

ตรวจโน้ตปัจจุบัน แล้วเสนอ:
1. aliases ไม่เกิน 3 ชื่อ
2. tags ไม่เกิน 5 อัน

กติกา:
- aliases ใช้สำหรับชื่อเรียกโน้ตเดียวกันเท่านั้น
- tags ใช้เฉพาะจากรายการที่ผู้ใช้กำหนด
- ต้องมี tag ประเภทเอกสารอย่างน้อย 1 อัน
- ไม่เดาโครงการหรือแหล่งข้อมูลที่ไม่ปรากฏในโน้ต
- แสดงเหตุผลสั้น ๆ ต่อรายการ
- ไม่แก้ไขไฟล์จนกว่าผู้ใช้จะอนุมัติ
```

หลักจำง่าย: **Alias ช่วยให้ “หาโน้ตนี้เจอ” หลายชื่อ, Tag ช่วยให้ “จัดกลุ่มหลายโน้ต” ได้** ครับ[1]

การอ้างอิง:
[1] Search - Obsidian Help https://obsidian.md/help/plugins/search
[2] Missing tags, aliases and cssclasses in some Obsidian 1.9.x versions https://publish.obsidian.md/tasks/Support+and+Help/Missing+tags,+aliases+and+cssclasses+in+some+Obsidian+1.9.x+versions
[3] obsidian-help/en/Editing and formatting/Properties.md at 9cf8c2913e56830e75c13f33ba198d7e70b6d9ef · obsidianmd/obsidian-help https://github.com/obsidianmd/obsidian-help/blob/9cf8c2913e56830e75c13f33ba198d7e70b6d9ef/en/Editing%20and%20formatting/Properties.md
[4] obsidian-help/en/Editing and formatting/Properties.md at 29e89022c6aeb0a9e9971b6f0c98733dbc2eb716 · obsidianmd/obsidian-help https://github.com/obsidianmd/obsidian-help/blob/29e89022/en/Editing%20and%20formatting/Properties.md?plain=1
[5] publish.obsidian.md › Obsidian+PropertiesObsidian Properties - Tasks User Guide - Obsidian Publish https://publish.obsidian.md/tasks/Getting+Started/Obsidian+Properties
ตัวอย่างการตั้งชื่อ Properties อื่นๆ ที่มีประโยชน์

นอกจาก `aliases` และ `tags` ควรตั้ง Properties เพิ่มเฉพาะที่ช่วยให้ **ค้นหา จัดลำดับ และตรวจสอบงานได้จริง** Obsidian รองรับ property แบบ Text, List, Number, Checkbox, Date, Date & time และ Tags[1][2]

## Properties ที่แนะนำ

| Property | ประเภท | ใช้ทำอะไร | ตัวอย่าง |
|---|---|---|---|
| `title` | Text | ชื่อที่แสดงชัดเจน | `Repository Inventory` |
| `type` | Text | ประเภทเอกสาร | `note`, `bookmark`, `decision`, `report` |
| `status` | Text | สถานะงาน | `draft`, `review`, `active`, `done` |
| `created` | Date | วันที่สร้าง | `2026-10-29` |
| `updated` | Date | วันที่แก้ล่าสุด | `2026-10-29` |
| `due` | Date | กำหนดส่งหรือตรวจ | `2026-11-05` |
| `priority` | Number | ลำดับความสำคัญ | `1`, `2`, `3` |
| `owner` | Text | ผู้รับผิดชอบ | `you` |
| `project` | Text | โครงการหลัก | `monitoring`, `inventory` |
| `source` | Text | แหล่งข้อมูล | `prometheus`, `github`, `web` |
| `url` | Text | ลิงก์ภายนอก | `https://example.com` |
| `related` | List | โน้ตที่เกี่ยวข้อง | `[[Prometheus]]`, `[[Agent Commands]]` |
| `reviewed` | Checkbox | ตรวจแล้วหรือยัง | `false` |
| `confidence` | Text | ระดับความมั่นใจ | `high`, `medium`, `low` |

Properties เก็บข้อมูลโครงสร้าง เช่น ข้อความ ลิงก์ วันที่ checkbox และตัวเลข ซึ่งช่วยให้จัดระเบียบโน้ตได้ดีกว่าการพึ่ง tags เพียงอย่างเดียว[1]

## Template สำหรับโน้ตทั่วไป

```yaml
---
title: Daily Briefing
type: report
status: draft
priority: 2
project: briefing
created: 2026-10-29
updated: 2026-10-29
reviewed: false
confidence: medium
related:
  - "[[Repository Inventory]]"
  - "[[Prometheus]]"
  - "[[Agent Commands]]"
tags:
  - report
  - project/briefing
  - status/draft
---
```

ลิงก์ภายในใน property แบบ list ต้องอยู่ในเครื่องหมายคำพูด เช่น `"[[Prometheus]]"`[1]

## Template สำหรับ Bookmark

```yaml
---
title: Prometheus Query Basics
type: bookmark
status: review
source: docs
url: https://prometheus.io/docs/
created: 2026-10-29
reviewed: false
confidence: low
project: monitoring
related:
  - "[[Prometheus]]"
tags:
  - bookmark
  - source/docs
  - needs-review
---
```

## Template สำหรับ Decision Record

```yaml
---
title: Decision - Use Prometheus for Monitoring
type: decision
status: review
created: 2026-10-29
updated: 2026-10-29
decision_date: 2026-10-29
owner: you
project: monitoring
reviewed: false
confidence: medium
related:
  - "[[Prometheus]]"
  - "[[Daily Briefing]]"
tags:
  - decision
  - project/monitoring
  - status/review
---
```

## กติกาตั้งชื่อ Property

- ใช้ตัวพิมพ์เล็กและคั่นคำด้วยขีดล่าง เช่น `decision_date`, `next_review`
- ใช้ชื่อเดียวกันทุกโน้ต เช่น อย่าสลับ `created` กับ `date_created`
- ใช้ `status` เป็นค่าที่จำกัด เช่น `draft`, `review`, `active`, `done`
- ใช้ `reviewed: false` กับโน้ตที่ยังไม่ยืนยัน แล้วเปลี่ยนเป็น `true` เมื่อตรวจแล้ว
- หลีกเลี่ยงการใส่ secrets, API keys หรือ token ใน properties เพราะเป็นข้อมูลที่อ่านง่ายและค้นหาได้

## การค้นหาจาก Properties

Obsidian รองรับการค้นหาโดยระบุ property และค่า เช่น:

```text
[status:draft]
```

ค้นหาโน้ตที่ยังเป็นร่าง

```text
[project:monitoring] [reviewed:false]
```

ค้นหางาน monitoring ที่ยังไม่ได้ตรวจ

```text
[1] [status:active]
```

ค้นหางานสำคัญที่กำลังดำเนินการ[3]

## Agent Command ที่เสนอ

```text
Agent: Suggest Properties

บทบาท: ผู้ช่วยเติม metadata

ตรวจโน้ตปัจจุบัน แล้วเสนอ properties ที่ควรเพิ่ม

ต้องเสนอเฉพาะ:
- title
- type
- status
- created
- updated
- project
- related
- reviewed
- confidence

กติกา:
- ไม่เดาค่าที่ไม่ปรากฏในโน้ต
- ใช้เฉพาะค่า status ที่ผู้ใช้กำหนด
- ใช้ internal links เฉพาะโน้ตที่มีอยู่จริง
- ไม่ใส่ secrets หรือข้อมูลส่วนบุคคล
- ไม่แก้ไขไฟล์จนกว่าผู้ใช้จะอนุมัติ
```

สำหรับ vault ของคุณ ผมแนะนำให้เริ่มจาก 7 properties นี้: `title`, `type`, `status`, `created`, `updated`, `project`, `related` แล้วค่อยเพิ่ม `reviewed` และ `confidence` เมื่อเริ่มใช้ Agent ตรวจโน้ตจริงครับ[1]

การอ้างอิง:
[1] github.com · chrisblifeos-pixel · Obsidian-OfficialObsidian-Official-Documentation/en/Editing and... https://github.com/chrisblifeos-pixel/Obsidian-Official-Documentation/blob/master/en/Editing%20and%20formatting/Properties.md
[2] The Complete Guide to Obsidian Properties - Sébastien Dubois https://www.dsebastien.net/the-complete-guide-to-obsidian-properties/
[3] Properties view - Obsidian Help https://obsidian.md/help/plugins/properties
[4] Template Property Types (Beta) https://quickadd.obsidian.guide/docs/TemplatePropertyTypes/
[5] List view - Obsidian Help https://obsidian.md/help/bases/views/list
[6] PROPERTIES.md https://github.com/kepano/obsidian-skills/blob/main/skills/obsidian-markdown/references/PROPERTIES.md
[7] obsidian-gemini/prompts/bundled-skills/obsidian-properties ... https://github.com/allenhutchison/obsidian-gemini/blob/master/prompts/bundled-skills/obsidian-properties/SKILL.md
[8] github.com · blob · mainobsidian-vault/references/markdown-properties.md at main · qoxop... https://github.com/qoxop/obsidian-vault/blob/main/references/markdown-properties.md
ตัวอย่างการใช้ Dataview ร่วมกับ Properties เหล่านี้

**Dataview** ใช้ Properties ใน frontmatter เป็นฐานข้อมูลของ vault ทำให้คุณสร้างตารางงาน, รายการที่ต้องตรวจ และ dashboard ได้โดยอัตโนมัติ Dataview รองรับผลลัพธ์แบบ `LIST`, `TABLE`, `TASK` และ `CALENDAR`[1][2]

## โครงสร้าง Query

```dataview
TABLE field1, field2
FROM "folder" OR #tag
WHERE condition
SORT field ASC
LIMIT 10
```

- `FROM` เลือกแหล่งข้อมูล เช่น โฟลเดอร์หรือ tag
- `WHERE` กรองตาม Properties เช่น `status`, `project`, `reviewed`
- `SORT` จัดลำดับผลลัพธ์
- `LIMIT` จำกัดจำนวนแถว[1][3][4]

## ตัวอย่าง Properties

สมมติโน้ตของคุณมี frontmatter แบบนี้:

```yaml
---
title: Prometheus Setup
type: note
status: active
project: monitoring
priority: 1
created: 2026-10-29
updated: 2026-10-29
reviewed: false
confidence: medium
related:
  - "[[Daily Briefing]]"
tags:
  - project/monitoring
  - status/active
---
```

## 1. ตารางงานที่ยังไม่ตรวจ

```dataview
TABLE status, project, priority, updated
FROM ""
WHERE reviewed = false
SORT priority ASC, updated DESC
LIMIT 20
```

ใช้ดูโน้ตที่ยังไม่ได้ตรวจ โดยเรียงตามความสำคัญและแก้ไขล่าสุด Dataview ใช้ `WHERE` เพื่อกรองตาม field ได้[3][5]

## 2. งาน Monitoring ที่กำลังทำ

```dataview
TABLE title, status, priority, updated
FROM #project/monitoring
WHERE status = "active"
SORT priority ASC
```

ใช้ tag `#project/monitoring` เป็นแหล่งข้อมูล แล้วกรองเฉพาะโน้ตที่ `status = "active"`[3][4]

## 3. Daily Briefing ที่ยังเป็นร่าง

```dataview
TABLE title, created, updated, confidence
FROM #project/briefing
WHERE status = "draft"
SORT updated DESC
```

เหมาะสำหรับหน้า Dashboard ที่ช่วยให้เห็น briefing ที่ยังต้องตรวจก่อนเผยแพร่[2][3]

## 4. Bookmarks ที่ต้องตรวจ

```dataview
TABLE title, url, source, confidence
FROM #bookmark
WHERE reviewed = false
SORT created DESC
LIMIT 15
```

ใช้กับ bookmarks ที่คุณเก็บไว้ โดยแสดง URL, แหล่งที่มา และระดับความมั่นใจ[3][5]

## 5. โน้ตที่เกี่ยวข้องกับ Prometheus

```dataview
TABLE title, status, updated
FROM [[Prometheus]]
WHERE status != "archived"
SORT updated DESC
```

`FROM [[Prometheus]]` เลือกโน้ตที่มี outgoing link ไปยัง `Prometheus` ได้[3][4]

## 6. รายการโน้ตใหม่ในสัปดาห์นี้

```dataview
TABLE title, type, status, created
FROM ""
WHERE created >= date(today) - dur(7 days)
SORT created DESC
```

ใช้ `created` เป็น Date property แล้วกรองเฉพาะโน้ตที่สร้างใน 7 วันล่าสุด[3][6]

## 7. Task ที่ยังไม่เสร็จ

```dataview
TASK
FROM #project/monitoring
WHERE !completed
SORT due ASC
```

Query แบบ `TASK` ทำงานที่ระดับ task ไม่ใช่ระดับไฟล์ และสามารถกรอง task ที่ยังไม่เสร็จได้[2][7]

## 8. Dashboard สำหรับ ZyntroAI

สร้างโน้ตชื่อ `ZyntroAI Dashboard` แล้วใส่:

```markdown
# ZyntroAI Dashboard

## งานสำคัญที่ยังไม่ตรวจ

```dataview
TABLE status, project, priority, updated
FROM ""
WHERE reviewed = false AND priority <= 2
SORT priority ASC
LIMIT 10
```

## Briefing ที่ยังเป็นร่าง

```dataview
TABLE title, updated, confidence
FROM #project/briefing
WHERE status = "draft"
SORT updated DESC
```

## Bookmarks ที่ต้องตรวจ

```dataview
TABLE title, url, confidence
FROM #bookmark
WHERE reviewed = false
SORT created DESC
LIMIT 10
```
```

## ข้อควรระวัง

- Dataview อ่านค่าจาก frontmatter ดังนั้น `status: draft` ต้องเขียนตรงกับ query เช่น `WHERE status = "draft"`
- ใช้ `reviewed = false` ไม่ใช่ `"false"` เมื่อ property เป็น Checkbox
- ควรใช้ `LIMIT` กับ dashboard เพื่อไม่ให้ผลลัพธ์ยาวเกินไป
- ไม่ควรให้ Dataview เป็นแหล่งความจริงเพียงอย่างเดียว ให้เปิดโน้ตต้นทางตรวจก่อนตัดสินใจ
- การติ๊ก task ในผลลัพธ์ TASK จะเปลี่ยนสถานะ task ในไฟล์ต้นทางด้วย[2]

สำหรับเริ่มต้น ผมแนะนำสร้าง 3 query ก่อน: **งานที่ยังไม่ตรวจ**, **briefing ที่ยังเป็นร่าง** และ **bookmarks ที่ต้องตรวจ** เพราะตรงกับ workflow “เก็บข้อมูล → ตรวจ → สรุป” ของคุณครับ[2][3]

การอ้างอิง:
[1] Structure of a Query - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/queries/structure/
[2] obsidian-dataview/docs/docs/queries/query-types.md at master · blacksmithgu/obsidian-dataview https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/queries/query-types.md
[3] Data Commands - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/queries/data-commands/
[4] Sources - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/reference/sources/
[5] Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/
[6] Dataview in Obsidian: A Beginner's Guide https://obsidian.rocks/dataview-in-obsidian-a-beginners-guide/
[7] Basic Task Queries - Dataview Example Vault - GitHub Pages https://s-blu.github.io/obsidian_dataview_example_vault/20%20Dataview%20Queries/Basic%20Task%20Queries/
[8] Dataview - Obsidian Plugin https://community.obsidian.md/plugins/dataview
[9] Frequently Asked Questions - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/resources/faq/
[10] Dataview - Tasks User Guide - Obsidian Publish https://publish.obsidian.md/tasks/Other+Plugins/Dataview
[11] obsidian-dataview/docs/docs/annotation/metadata-tasks.md at master ... https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/annotation/metadata-tasks.md
[12] Actions For Obsidian › Objects › Dataview Table Row reference https://docs.actions.work/actions-for-obsidian/objects/dataview-table-row/
[13] Dataview task query - Help - Obsidian Forum https://forum.obsidian.md/t/dataview-task-query/82794
[14] An Introduction to Dataview - Obsidian Hub https://publish.obsidian.md/hub/04+-+Guides,+Workflows,+&+Courses/Guides/An+Introduction+to+Dataview
ตัวอย่าง DataviewJS สำหรับคำนวณข้อมูลขั้นสูง

**DataviewJS** เหมาะกับการคำนวณที่ Dataview Query ปกติทำยาก เช่น นับจำนวนตามสถานะ, คำนวณอายุโน้ต, สรุปตามโครงการ และสร้าง dashboard แบบกำหนดเอง โดยใช้ block ` ```dataviewjs ` และตัวแปร `dv` [1][2]

> [!note] เปิดใช้งานก่อน
> ต้องเปิด **Enable JavaScript Queries** ใน Settings ของ Dataview ก่อน จึงจะรัน `dataviewjs` ได้ [3]

## 1. สรุปจำนวนโน้ตตามสถานะ

```dataviewjs
const pages = dv.pages()
  .where(p => p.status);

const counts = pages.groupBy(p => p.status)
  .sort(g => g.rows.length, "desc");

dv.table(
  ["สถานะ", "จำนวนโน้ต"],
  counts.map(g => [g.key, g.rows.length])
);
```

ใช้ `dv.pages()` เพื่อดึงโน้ตทั้ง vault, `.where()` กรองเฉพาะโน้ตที่มี `status`, และ `.groupBy()` เพื่อนับตามสถานะ [2][4]

## 2. สรุปงานตามโครงการ

```dataviewjs
const pages = dv.pages()
  .where(p => p.project)
  .where(p => p.status !== "archived");

const groups = pages.groupBy(p => p.project);

for (const group of groups) {
  dv.header(3, group.key);

  dv.table(
    ["โน้ต", "สถานะ", "ลำดับความสำคัญ", "แก้ไขล่าสุด"],
    group.rows
      .sort(p => p.priority ?? 99, "asc")
      .map(p => [
        p.file.link,
        p.status,
        p.priority ?? "-",
        p.updated ?? p.file.mday
      ])
  );
}
```

ใช้ `groupBy(p => p.project)` เพื่อแยกผลลัพธ์เป็นหัวข้อตามโครงการ แล้วแสดงตารางแยกแต่ละกลุ่ม [4][5]

## 3. นับงานที่ยังไม่ตรวจ

```dataviewjs
const pending = dv.pages()
  .where(p => p.reviewed === false);

const byProject = pending.groupBy(p => p.project ?? "ไม่ระบุโครงการ");

dv.table(
  ["โครงการ", "จำนวนที่ยังไม่ตรวจ"],
  byProject
    .sort(g => g.rows.length, "desc")
    .map(g => [g.key, g.rows.length])
);

dv.paragraph(`รวมทั้งหมด **${pending.length}** โน้ตที่ยังไม่ได้ตรวจ`);
```

`p.reviewed === false` ใช้ได้เมื่อ `reviewed` เป็น Checkbox property [2][4]

## 4. หาโน้ตที่ไม่ได้แก้นาน

```dataviewjs
const days = 14;
const cutoff = dv.date("now").minus({ days });

const stale = dv.pages()
  .where(p => p.status === "active")
  .where(p => p.updated)
  .where(p => dv.date(p.updated) < cutoff)
  .sort(p => dv.date(p.updated), "asc");

dv.table(
  ["โน้ต", "โครงการ", "แก้ไขล่าสุด", "จำนวนวันที่ไม่ได้แก้"],
  stale.map(p => [
    p.file.link,
    p.project ?? "-",
    p.updated,
    Math.floor(dv.date("now").diff(dv.date(p.updated), "days").days)
  ])
);
```

ใช้ `dv.date()` แปลงค่าวันที่ให้เป็น `DateTime` แล้วเปรียบเทียบกับวันที่ปัจจุบันได้ [6]

## 5. Dashboard สรุปสุขภาพ vault

```dataviewjs
const all = dv.pages();
const drafts = all.where(p => p.status === "draft").length;
const review = all.where(p => p.status === "review").length;
const unreviewed = all.where(p => p.reviewed === false).length;
const bookmarks = all.where(p => p.type === "bookmark").length;

dv.table(
  ["ตัวชี้วัด", "จำนวน"],
  [
    ["โน้ตทั้งหมด", all.length],
    ["สถานะ draft", drafts],
    ["สถานะ review", review],
    ["ยังไม่ตรวจ", unreviewed],
    ["bookmarks", bookmarks]
  ]
);
```

เหมาะสำหรับหน้า `ZyntroAI Dashboard` เพื่อเห็นภาพรวมโดยไม่ต้องเปิดโน้ตทีละไฟล์ [1][2]

## 6. จัดกลุ่ม Briefing ตามเดือน

```dataviewjs
const briefings = dv.pages("#project/briefing")
  .where(p => p.created)
  .groupBy(p => dv.date(p.created).toFormat("yyyy-MM"));

for (const group of briefings.sort(g => g.key, "desc")) {
  dv.header(3, group.key);

  dv.table(
    ["Briefing", "สถานะ", "วันที่สร้าง"],
    group.rows
      .sort(p => dv.date(p.created), "desc")
      .map(p => [
        p.file.link,
        p.status ?? "-",
        p.created
      ])
  );
}
```

ใช้ `toFormat("yyyy-MM")` เพื่อจัดกลุ่มตามเดือน แล้วเรียงกลุ่มใหม่ไปเก่า [4][6]

## 7. หางานที่ priority สูงและยังไม่เสร็จ

```dataviewjs
const urgent = dv.pages()
  .where(p => p.priority != null)
  .where(p => p.priority <= 2)
  .where(p => p.status !== "done")
  .where(p => p.status !== "archived")
  .sort(p => p.priority, "asc")
  .limit(10);

dv.table(
  ["โน้ต", "โครงการ", "สถานะ", "Priority"],
  urgent.map(p => [
    p.file.link,
    p.project ?? "-",
    p.status ?? "-",
    p.priority
  ])
);
```

ใช้ `.limit(10)` เพื่อไม่ให้ dashboard ยาวเกินไป [2][4]

## แนวปฏิบัติที่ควรทำ

- ใช้ `p.status ?? "-"` เพื่อกันโน้ตที่ไม่มี property
- ใช้ `dv.date()` ทุกครั้งก่อนเปรียบเทียบวันที่
- จำกัดผลลัพธ์ด้วย `.limit()` สำหรับ dashboard
- หลีกเลี่ยงการเขียนไฟล์หรือเรียก API ภายนอกจาก DataviewJS
- ใช้ DataviewJS เฉพาะเมื่อ DQL ทำไม่ได้ เช่น การนับ, จัดกลุ่มซ้อน, หรือคำนวณวันที่

DataviewJS ให้สิทธิ์รัน JavaScript ภายใน vault จึงควรใช้กับโค้ดที่คุณเข้าใจและตรวจแล้ว ไม่ควรวางสคริปต์จากแหล่งภายนอกโดยไม่ตรวจ [1]

## ตัวอย่างเริ่มต้นที่แนะนำ

ให้เริ่มจาก 2 block นี้ใน `ZyntroAI Dashboard`:

1. **สรุปจำนวนตามสถานะ** — เห็นภาพรวมว่ามีงาน draft, review, active เท่าไร
2. **งาน priority 1–2 ที่ยังไม่เสร็จ** — ใช้ตัดสินใจว่าวันนี้ควรทำอะไรก่อน

เมื่อใช้ได้แล้ว จึงเพิ่มการนับ bookmarks ที่ยังไม่ตรวจ และรายงานโน้ตที่ไม่ได้แก้นานครับ [1][2]

การอ้างอิง:
[1] Overview - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/api/intro/
[2] Codeblock Reference - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/
[3] Dataview — Query Your Notes - Visual Studio Marketplace https://marketplace.visualstudio.com/items?itemName=walkeemon.markdown-dataview
[4] DQL, JS and Inlines - Dataview https://blacksmithgu.github.io/obsidian-dataview/queries/dql-js-inline/
[5] obsidian-dataview https://www.npmjs.com/package/obsidian-dataview?activeTab=readme
[6] Codeblock Reference - GitHub https://github.com/blacksmithgu/obsidian-dataview/diffs/0?base_sha=6d9030ef1df9c3f310f42e3502149dc71792dc4d&head_user=lackita&name=master&pull_number=2515&qualified_name=refs/heads/master&sha1=6d9030ef1df9c3f310f42e3502149dc71792dc4d&sha2=d273934d3c525d5941b1faf324b86b4549da5e59&short_path=f1d31e3&unchanged=expanded&w=false
[7] DataviewJS - John's Digital Galaxy https://notes.johnmavrick.com/USV/DataviewJS
[8] Dataviewjs - Fork My Brain https://notes.nicolevanderhoeven.com/Dataviewjs
[9] context7.com › websites › blacksmithgu_github_ioDataview (websites/blacksmithgu_github_io_obsidian-dataview) https://context7.com/websites/blacksmithgu_github_io_obsidian-dataview
[10] DataviewJS | s-blu/obsidian_dataview_example_vault | DeepWiki https://deepwiki.com/s-blu/obsidian_dataview_example_vault/2.3-dataviewjs
[11] dataview_charts_dashboard/dataviewjs.txt at main · elderavo/dataview_charts_dashboard https://github.com/elderavo/dataview_charts_dashboard/blob/main/dataviewjs.txt
[12] Obsidian Dataview (blacksmithgu/obsidian-dataview) https://context7.com/blacksmithgu/obsidian-dataview
[13] The Complete Guide to Dataview in Obsidian - Sébastien Dubois https://www.dsebastien.net/the-complete-guide-to-dataview-in-obsidian/
[14] DataviewJS Snippet Showcase - Page 11 - Workflows & Templates https://forum.obsidian.md/t/dataviewjs-snippet-showcase/17847?page=11
[15] Dataviewjs Examples - Fork My Brain https://notes.nicolevanderhoeven.com/obsidian-playbook/Obsidian+Plugins/Community+Plugins/dataview/Dataviewjs+Examples
ตัวอย่างการใช้ DataviewJS ร่วมกับ HTML และ CSS

ใช้ **DataviewJS + HTML** เพื่อสร้าง dashboard ที่สวยและอ่านง่ายได้ โดยใช้ `dv.el()` สร้าง element HTML และกำหนด class ผ่าน `cls` จากนั้นใส่ CSS ใน CSS snippet ของ Obsidian[1][2]

> [!note] ก่อนใช้งาน
> เปิด **Enable JavaScript Queries** ใน Dataview settings และสร้าง CSS snippet ใน `Settings → Appearance → CSS snippets` ก่อน[2]

## 1. การ์ดสถิติงาน

```dataviewjs
const all = dv.pages();
const draft = all.where(p => p.status === "draft").length;
const review = all.where(p => p.status === "review").length;
const active = all.where(p => p.status === "active").length;
const unreviewed = all.where(p => p.reviewed === false).length;

const cards = [
  ["Draft", draft, "zy-card--warn"],
  ["Review", review, "zy-card--info"],
  ["Active", active, "zy-card--ok"],
  ["ยังไม่ตรวจ", unreviewed, "zy-card--danger"]
];

const wrap = dv.el("div", "", { cls: "zy-cards" });

for (const [label, value, cls] of cards) {
  const card = wrap.createEl("div", { cls: `zy-card ${cls}` });
  card.createEl("div", { text: value, cls: "zy-card__value" });
  card.createEl("div", { text: label, cls: "zy-card__label" });
}
```

`dv.el("div", "", { cls: "zy-cards" })` สร้าง container HTML แล้วเพิ่มการ์ดย่อยด้วย `createEl()` ได้[2][3]

## 2. CSS snippet

สร้างไฟล์ `.obsidian/snippets/zyntroai-dashboard.css` แล้วเปิดใช้งาน:

```css
.zy-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin: 12px 0;
}

.zy-card {
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--background-modifier-border);
  background: var(--background-secondary);
}

.zy-card__value {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.2;
}

.zy-card__label {
  font-size: 0.85rem;
  opacity: 0.75;
}

.zy-card--ok {
  border-left: 4px solid var(--text-success);
}

.zy-card--warn {
  border-left: 4px solid var(--text-warning);
}

.zy-card--info {
  border-left: 4px solid var(--text-accent);
}

.zy-card--danger {
  border-left: 4px solid var(--text-error);
}
```

CSS นี้ใช้ตัวแปรสีของ Obsidian เช่น `--background-secondary` และ `--text-success` เพื่อให้เข้ากับ Light/Dark mode[2]

## 3. ตารางงานที่มีสถานะสี

```dataviewjs
const pages = dv.pages()
  .where(p => p.status)
  .where(p => p.status !== "archived")
  .sort(p => p.priority ?? 99, "asc")
  .limit(10);

const statusClass = {
  draft: "zy-pill--warn",
  review: "zy-pill--info",
  active: "zy-pill--ok",
  done: "zy-pill--done"
};

const table = dv.el("table", "", { cls: "zy-table" });
const head = table.createEl("thead").createEl("tr");

for (const label of ["โน้ต", "โครงการ", "สถานะ", "Priority"]) {
  head.createEl("th", { text: label });
}

const body = table.createEl("tbody");

for (const p of pages) {
  const row = body.createEl("tr");

  row.createEl("td").appendChild(
    dv.fileLink(p.file.path).render
      ? dv.fileLink(p.file.path)
      : document.createTextNode(p.file.name)
  );

  row.createEl("td", { text: p.project ?? "-" });

  const statusCell = row.createEl("td");
  statusCell.createEl("span", {
    text: p.status,
    cls: `zy-pill ${statusClass[p.status] ?? "zy-pill--muted"}`
  });

  row.createEl("td", { text: p.priority ?? "-" });
}
```

แนวทางที่เสถียรกว่าคือแสดงชื่อโน้ตเป็นข้อความและให้ผู้ใช้คลิกเข้าโน้ตจาก Dataview table ปกติ; การสร้าง internal link ใน DOM โดยตรงอาจแตกต่างตามเวอร์ชัน[2][3]

## 4. CSS สำหรับตารางและ pill

```css
.zy-table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
}

.zy-table th,
.zy-table td {
  padding: 8px 10px;
  border-bottom: 1px solid var(--background-modifier-border);
  text-align: left;
}

.zy-table th {
  font-weight: 600;
  background: var(--background-secondary);
}

.zy-pill {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
}

.zy-pill--ok {
  background: color-mix(in srgb, var(--text-success) 18%, transparent);
  color: var(--text-success);
}

.zy-pill--warn {
  background: color-mix(in srgb, var(--text-warning) 18%, transparent);
  color: var(--text-warning);
}

.zy-pill--info {
  background: color-mix(in srgb, var(--text-accent) 18%, transparent);
  color: var(--text-accent);
}

.zy-pill--done {
  background: color-mix(in srgb, var(--text-muted) 18%, transparent);
  color: var(--text-muted);
}

.zy-pill--danger {
  background: color-mix(in srgb, var(--text-error) 18%, transparent);
  color: var(--text-error);
}

.zy-pill--muted {
  background: var(--background-modifier-hover);
  color: var(--text-muted);
}
```

## 5. แบนเนอร์เตือนงานค้าง

```dataviewjs
const overdue = dv.pages()
  .where(p => p.due)
  .where(p => p.status !== "done")
  .where(p => dv.date(p.due) < dv.date("now"))
  .length;

if (overdue > 0) {
  dv.el(
    "div",
    `มีงานที่เลยกำหนด ${overdue} รายการ`,
    {
      cls: "zy-banner zy-banner--danger",
      attr: { role: "status" }
    }
  );
} else {
  dv.el(
    "div",
    "ไม่มีงานที่เลยกำหนด",
    {
      cls: "zy-banner zy-banner--ok",
      attr: { role: "status" }
    }
  );
}
```

`dv.el()` รองรับการส่ง `cls` สำหรับ CSS class และ `attr` สำหรับ attribute ของ element[1][2]

## 6. CSS สำหรับ banner

```css
.zy-banner {
  padding: 12px 14px;
  border-radius: 10px;
  font-weight: 600;
  margin: 12px 0;
}

.zy-banner--danger {
  background: color-mix(in srgb, var(--text-error) 12%, transparent);
  border: 1px solid var(--text-error);
  color: var(--text-error);
}

.zy-banner--ok {
  background: color-mix(in srgb, var(--text-success) 12%, transparent);
  border: 1px solid var(--text-success);
  color: var(--text-success);
}
```

## ข้อควรระวัง

- ใช้ HTML เพื่อ **แสดงผล** เท่านั้น ไม่ควรใช้ DataviewJS แก้ไขไฟล์หรือเรียก API ภายนอก
- หลีกเลี่ยงการใส่ข้อมูลลับ เช่น token หรือ URL ส่วนตัว ลงใน HTML
- ตั้งชื่อ class ขึ้นต้นด้วย prefix เช่น `zy-` เพื่อไม่ชนกับ CSS ของธีมหรือปลั๊กอิน
- ทดสอบทั้ง Light และ Dark mode
- ถ้าต้องการ layout ซับซ้อน ให้แยก CSS ไว้ใน snippet ไม่ควรฝัง `<style>` ในโน้ตทุกครั้ง

สำหรับเริ่มต้น ผมแนะนำทำ **การ์ดสถิติ 4 ใบ** ก่อน: Draft, Review, Active, ยังไม่ตรวจ เพราะใช้ Properties ที่คุณมีอยู่แล้วและช่วยให้เห็นภาพรวมของ vault ได้ทันทีครับ[1][2]

การอ้างอิง:
[1] Changelog - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/changelog/
[2] obsidian-dataview/docs/docs/api/code-reference.md at master ... https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/api/code-reference.md
[3] obsidian-dataview/src/api/inline-api.ts at master ... - GitHub https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/api/inline-api.ts
[4] Touch Guides | DataView https://docs.sencha.com/touch/2.3.2/components/dataview.html
[5] JavaScript DataView - Customization | DHTMLX Suite 9 Docs https://docs.dhtmlx.com/suite/dataview/customization/
[6] JavaScript DataView - css Config | DHTMLX Suite 9 Docs https://docs.dhtmlx.com/suite/dataview/api/dataview_css_config/
[7] docs.runmaestro.ai · dataviewDataview - Maestro https://docs.runmaestro.ai/dataview
[8] Dataview Plugin | adiehl96/obsidian-vault-template-for-gtd | DeepWiki https://deepwiki.com/adiehl96/obsidian-vault-template-for-gtd/4.2-dataview-plugin
[9] github.com · chrisgurney · obsidian-note-toolbarDataview · chrisgurney/obsidian-note-toolbar Wiki · GitHub https://github.com/chrisgurney/obsidian-note-toolbar/wiki/Dataview
[10] obsidian-dataview-serializer/docs/usage.md at main - GitHub https://github.com/dsebastien/obsidian-dataview-serializer/blob/main/docs/usage.md
[11] DataviewJS | blacksmithgu/obsidian-dataview | DeepWiki https://deepwiki.com/blacksmithgu/obsidian-dataview/4.2-dataviewjs
[12] rymawby/dataviewjs-cli - GitHub https://github.com/rymawby/dataviewjs-cli
[13] obsidian-dataview-cards/Obsidian-Vault/en/00 Start.md at main - GitHub https://github.com/2PleXXX/obsidian-dataview-cards/blob/main/Obsidian-Vault/en/00%20Start.md
ตัวอย่างการดึงข้อมูลจากหลายโฟลเดอร์มาแสดงผลรวมกัน

ดึงข้อมูลจากหลายโฟลเดอร์มารวมกันได้ด้วย `FROM "Folder A" OR "Folder B"` ใน DQL หรือ `dv.pages('"Folder A" OR "Folder B"')` ใน DataviewJS โดยชื่อโฟลเดอร์ต้องอยู่ในเครื่องหมายคำพูด[1][2]

## 1. DQL: รวมหลายโฟลเดอร์

```dataview
TABLE status, project, priority, updated
FROM "Projects/Monitoring" OR "Projects/Inventory" OR "Daily"
WHERE status != "archived"
SORT priority ASC, updated DESC
LIMIT 20
```

ใช้เมื่อต้องการรวมโน้ตจากโฟลเดอร์ monitoring, inventory และ Daily เข้าเป็นตารางเดียว `FROM` รองรับการใช้ `OR` ระหว่างโฟลเดอร์[3][4]

## 2. DataviewJS: รวมหลายโฟลเดอร์

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
)
.where(p => p.status && p.status !== "archived")
.sort(p => p.priority ?? 99, "asc")
.limit(20);

dv.table(
  ["โน้ต", "โครงการ", "สถานะ", "Priority", "แก้ไขล่าสุด"],
  pages.map(p => [
    p.file.link,
    p.project ?? "-",
    p.status,
    p.priority ?? "-",
    p.updated ?? p.file.mday
  ])
);
```

ใน `dv.pages()` ต้องเขียนชื่อโฟลเดอร์แบบ `'"Projects/Monitoring"'` คือมีเครื่องหมายคำพูดคู่อยู่ภายใน string[1][2]

## 3. รวมแล้วจัดกลุ่มตามโฟลเดอร์

```dataviewjs
const folders = [
  "Projects/Monitoring",
  "Projects/Inventory",
  "Daily"
];

const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
)
.where(p => p.status !== "archived");

const groups = pages.groupBy(p => p.file.folder);

for (const group of groups.sort(g => g.key, "asc")) {
  dv.header(3, group.key);

  dv.table(
    ["โน้ต", "สถานะ", "Priority", "แก้ไขล่าสุด"],
    group.rows
      .sort(p => p.priority ?? 99, "asc")
      .map(p => [
        p.file.link,
        p.status ?? "-",
        p.priority ?? "-",
        p.updated ?? p.file.mday
      ])
  );
}
```

`p.file.folder` ใช้แสดงโฟลเดอร์ต้นทางของแต่ละโน้ต และ `groupBy()` ช่วยแยกผลลัพธ์เป็นหมวดตามโฟลเดอร์ 

## 4. รวมหลายโฟลเดอร์และกรองด้วย tag

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
)
.where(p => p.tags && p.tags.includes("#needs-review"))
.sort(p => p.file.mtime, "desc");

dv.table(
  ["โน้ต", "โฟลเดอร์", "สถานะ", "แก้ไขล่าสุด"],
  pages.map(p => [
    p.file.link,
    p.file.folder,
    p.status ?? "-",
    p.file.mday
  ])
);
```

ใช้เมื่อต้องการหาเฉพาะโน้ตที่ยังต้องตรวจ จากหลายพื้นที่ใน vault[3][4]

## 5. รวมหลายโฟลเดอร์และนับสถานะ

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
)
.where(p => p.status);

const summary = pages.groupBy(p => p.status)
  .sort(g => g.rows.length, "desc");

dv.table(
  ["สถานะ", "จำนวน"],
  summary.map(g => [g.key, g.rows.length])
);
```

เหมาะสำหรับ Dashboard ที่ต้องการเห็นว่าในหลายโฟลเดอร์มีงาน draft, review, active หรือ done กี่รายการ 

## 6. ตัดโฟลเดอร์ที่ไม่ต้องการออก

```dataview
TABLE status, project, updated
FROM "Projects" OR "Daily"
WHERE !contains(file.folder, "Archive")
SORT updated DESC
```

หรือใน DataviewJS:

```dataviewjs
const pages = dv.pages('"Projects" OR "Daily"')
  .where(p => !p.file.folder.includes("Archive"))
  .sort(p => p.file.mtime, "desc")
  .limit(20);

dv.table(
  ["โน้ต", "โฟลเดอร์", "สถานะ", "แก้ไขล่าสุด"],
  pages.map(p => [
    p.file.link,
    p.file.folder,
    p.status ?? "-",
    p.file.mday
  ])
);
```

การใช้ `!` หรือ `-` ใน `FROM` ช่วยตัดโฟลเดอร์หรือ tag ที่ไม่ต้องการออกได้[3][4]

## โครงสร้างโฟลเดอร์ตัวอย่าง

```text
Projects/
  Monitoring/
  Inventory/
Daily/
Archive/
```

ถ้าต้องการรวมเฉพาะ Monitoring และ Inventory แต่ไม่รวม Archive:

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory"'
)
.where(p => p.status !== "archived");
```

## ข้อควรระวัง

- ใน DQL ใช้ `FROM "Folder" OR "Folder"`
- ใน DataviewJS ใช้ `dv.pages('"Folder" OR "Folder"')`
- อย่าใช้ `WHERE` แทน `FROM` เพื่อเลือกโฟลเดอร์ เพราะ `FROM` จะช่วยจำกัดขอบเขตข้อมูลก่อน
- ใช้ `LIMIT` เมื่อผลลัพธ์อาจเยอะ
- ตรวจ path ให้ตรงกับ vault จริง เช่น `Projects/Monitoring` ไม่ใช่ `Monitoring` หากอยู่ใต้โฟลเดอร์ `Projects`

สำหรับ vault ของคุณ ผมแนะนำเริ่มจาก query รวม `Projects/Monitoring`, `Projects/Inventory` และ `Daily` แล้วกรอง `status != "archived"` ก่อน เพื่อให้ได้ dashboard รวมที่ยังใช้งานอยู่จริงครับ[1][4]

การอ้างอิง:
[1] fix wrong links throughout the docs (#2496) · blacksmithgu/obsidian-dataview@2d1ce30 https://github.com/blacksmithgu/obsidian-dataview/commit/2d1ce308f44504d4ced83143a16ed5864725a1ab
[2] github.com · lexbritvin · obsidian-skills-packobsidian-skills-pack/skills/obsidian-dataview/SKILL.md at ... https://github.com/lexbritvin/obsidian-skills-pack/blob/main/skills/obsidian-dataview/SKILL.md
[3] github.com › trevorblackbourn3 › ObsidianMasteryObsidianMastery-Dataview-Cheatsheet/dataview-cheatsheet.md at ... https://github.com/trevorblackbourn3/ObsidianMastery-Dataview-Cheatsheet/blob/main/dataview-cheatsheet.md
[4] https://raw.githubusercontent.com/obsidian-communi... https://raw.githubusercontent.com/obsidian-community/obsidian-hub/main/04%20-%20Guides,%20Workflows,%20&%20Courses/Guides/An%20Introduction%20to%20Dataview.md
[5] dataview-cheatsheet/README.md at main - GitHub https://github.com/lvnacy-notes/dataview-cheatsheet/blob/main/README.md
[6] GitHub - demonstan/markdown-dataview: Bring Obsidian Dataview ... https://github.com/demonstan/markdown-dataview
ขอ 30 ตัวอย่างเพิ่ม

ได้ครับ ด้านล่างคือ **30 ตัวอย่าง DataviewJS** สำหรับดึงข้อมูลจากหลายโฟลเดอร์มาแสดงรวมกัน โดยสมมติโครงสร้าง:

```text
Projects/Monitoring
Projects/Inventory
Daily
Bookmarks
Archive
```

หลักการพื้นฐานคือใช้ `dv.pages('"Folder A" OR "Folder B"')` แล้วใช้ `.where()`, `.sort()`, `.groupBy()`, `.limit()` ต่อได้[1][2]

## 1. ตารางรวมทุกโฟลเดอร์

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily" OR "Bookmarks"'
);

dv.table(
  ["โน้ต", "โฟลเดอร์", "สถานะ"],
  pages.map(p => [p.file.link, p.file.folder, p.status ?? "-"])
);
```

## 2. ตัดโน้ตที่ archived ออก

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.status !== "archived");

dv.table(["โน้ต", "สถานะ"], pages.map(p => [p.file.link, p.status ?? "-"]));
```

## 3. เรียงตามวันแก้ไขล่าสุด

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).sort(p => p.file.mtime, "desc").limit(20);

dv.table(["โน้ต", "แก้ไขล่าสุด"], pages.map(p => [p.file.link, p.file.mday]));
```

## 4. เรียงตาม priority

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.priority).sort(p => p.priority, "asc");

dv.table(["โน้ต", "Priority"], pages.map(p => [p.file.link, p.priority]));
```

## 5. จำกัด 10 โน้ตล่าสุด

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).sort(p => p.file.mtime, "desc").limit(10);

dv.list(pages.map(p => p.file.link));
```

## 6. จัดกลุ่มตามโฟลเดอร์

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).groupBy(p => p.file.folder);

for (const g of groups) {
  dv.header(3, g.key);
  dv.list(g.rows.map(p => p.file.link));
}
```

## 7. จัดกลุ่มตาม status

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.status).groupBy(p => p.status);

for (const g of groups) {
  dv.header(3, g.key);
  dv.list(g.rows.map(p => p.file.link));
}
```

## 8. นับโน้ตแต่ละโฟลเดอร์

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).groupBy(p => p.file.folder);

dv.table(
  ["โฟลเดอร์", "จำนวน"],
  groups.map(g => [g.key, g.rows.length])
);
```

## 9. นับตาม status

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.status).groupBy(p => p.status);

dv.table(
  ["สถานะ", "จำนวน"],
  groups.map(g => [g.key, g.rows.length])
);
```

## 10. นับตาม project

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.project).groupBy(p => p.project);

dv.table(
  ["โครงการ", "จำนวน"],
  groups.map(g => [g.key, g.rows.length])
);
```

## 11. เฉพาะงาน monitoring

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Daily"'
).where(p => p.project === "monitoring");

dv.table(["โน้ต", "สถานะ"], pages.map(p => [p.file.link, p.status ?? "-"]));
```

## 12. เฉพาะ inventory ที่ยังไม่ตรวจ

```dataviewjs
const pages = dv.pages(
  '"Projects/Inventory" OR "Daily"'
).where(p => p.reviewed === false);

dv.table(["โน้ต", "โฟลเดอร์"], pages.map(p => [p.file.link, p.file.folder]));
```

## 13. งาน priority 1–2

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.priority <= 2).where(p => p.status !== "done");

dv.table(["โน้ต", "Priority", "สถานะ"], pages.map(p => [p.file.link, p.priority, p.status ?? "-"]));
```

## 14. โน้ตที่ไม่มี status

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => !p.status);

dv.list(pages.map(p => p.file.link));
```

## 15. โน้ตที่ไม่มี project

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => !p.project);

dv.table(["โน้ต", "โฟลเดอร์"], pages.map(p => [p.file.link, p.file.folder]));
```

## 16. โน้ตที่สร้างใน 7 วันล่าสุด

```dataviewjs
const cutoff = dv.date("now").minus({ days: 7 });

const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.created && dv.date(p.created) >= cutoff);

dv.table(["โน้ต", "สร้างเมื่อ"], pages.map(p => [p.file.link, p.created]));
```

## 17. โน้ตที่ไม่ได้แก้ 14 วัน

```dataviewjs
const cutoff = dv.date("now").minus({ days: 14 });

const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.updated && dv.date(p.updated) < cutoff);

dv.table(["โน้ต", "แก้ไขล่าสุด"], pages.map(p => [p.file.link, p.updated]));
```

## 18. งานที่เลย due

```dataviewjs
const now = dv.date("now");

const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.due && p.status !== "done" && dv.date(p.due) < now);

dv.table(["โน้ต", "Due", "สถานะ"], pages.map(p => [p.file.link, p.due, p.status ?? "-"]));
```

## 19. งานที่จะครบกำหนดใน 7 วัน

```dataviewjs
const now = dv.date("now");
const soon = now.plus({ days: 7 });

const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.due && dv.date(p.due) >= now && dv.date(p.due) <= soon);

dv.table(["โน้ต", "Due"], pages.map(p => [p.file.link, p.due]));
```

## 20. รวม bookmarks จากหลายโฟลเดอร์

```dataviewjs
const pages = dv.pages(
  '"Bookmarks" OR "Daily" OR "Projects/Inventory"'
).where(p => p.type === "bookmark");

dv.table(["Bookmark", "URL", "สถานะ"], pages.map(p => [p.file.link, p.url ?? "-", p.status ?? "-"]));
```

## 21. bookmarks ที่ยังไม่อ่าน

```dataviewjs
const pages = dv.pages(
  '"Bookmarks" OR "Daily"'
).where(p => p.type === "bookmark").where(p => p.status === "review");

dv.list(pages.map(p => p.file.link));
```

## 22. bookmarks ตามแหล่งที่มา

```dataviewjs
const pages = dv.pages(
  '"Bookmarks" OR "Daily"'
).where(p => p.source).groupBy(p => p.source);

for (const g of groups) {
  dv.header(3, g.key);
  dv.list(g.rows.map(p => p.file.link));
}
```

## 23. รวมโน้ตที่ลิงก์ถึง Prometheus

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Daily" OR "Projects/Inventory"'
).where(p => p.file.outlinks.includes(dv.page("Prometheus")));

dv.table(["โน้ต", "โฟลเดอร์"], pages.map(p => [p.file.link, p.file.folder]));
```

## 24. รวมโน้ตที่มี internal link

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.file.outlinks.length > 0);

dv.table(["โน้ต", "จำนวนลิงก์ออก"], pages.map(p => [p.file.link, p.file.outlinks.length]));
```

## 25. รวมโน้ตที่ยังไม่มีลิงก์

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.file.outlinks.length === 0);

dv.list(pages.map(p => p.file.link));
```

## 26. รวมโน้ตที่มี tag ต้องตรวจ

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily" OR "Bookmarks"'
).where(p => p.tags && p.tags.includes("#needs-review"));

dv.table(["โน้ต", "โฟลเดอร์"], pages.map(p => [p.file.link, p.file.folder]));
```

## 27. รวมโน้ตที่ไม่มี tag

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => !p.tags || p.tags.length === 0);

dv.list(pages.map(p => p.file.link));
```

## 28. Dashboard สรุปหลายโฟลเดอร์

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily" OR "Bookmarks"'
);

const draft = pages.where(p => p.status === "draft").length;
const review = pages.where(p => p.status === "review").length;
const active = pages.where(p => p.status === "active").length;
const done = pages.where(p => p.status === "done").length;

dv.table(
  ["Draft", "Review", "Active", "Done"],
  [[draft, review, active, done]]
);
```

## 29. รวมโน้ตแล้วแสดงเป็น list

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.status === "active").sort(p => p.priority ?? 99, "asc");

dv.list(pages.map(p => `${p.file.link} — ${p.project ?? "ไม่ระบุโครงการ"}`));
```

## 30. รวมหลายโฟลเดอร์แล้วแสดงเป็นการ์ด

```dataviewjs
const folders = [
  "Projects/Monitoring",
  "Projects/Inventory",
  "Daily",
  "Bookmarks"
];

const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily" OR "Bookmarks"'
);

const wrap = dv.el("div", "", { cls: "zy-cards" });

for (const folder of folders) {
  const count = pages.where(p => p.file.folder === folder).length;

  const card = wrap.createEl("div", { cls: "zy-card" });
  card.createEl("div", { text: count, cls: "zy-card__value" });
  card.createEl("div", { text: folder, cls: "zy-card__label" });
}
```

## หมายเหตุการใช้งาน

- `dv.pages()` คืนค่าเป็น Data Array และรองรับ `.where()`, `.sort()`, `.groupBy()`, `.limit()`, `.map()`[1][2]
- การจัดกลุ่มด้วย `groupBy()` จะให้ผลลัพธ์เป็น `group.key` และ `group.rows`[3][4]
- ควรใช้ `LIMIT` หรือ `.limit()` กับ dashboard เพื่อไม่ให้โหลดผลลัพธ์มากเกินไป
- ปรับชื่อโฟลเดอร์และ property ให้ตรงกับ vault ของคุณก่อนใช้งานจริง

หากต้องการ ผมสามารถแปลง 30 ตัวอย่างนี้เป็น **ไฟล์โน้ต Obsidian พร้อม frontmatter และ DataviewJS blocks** ให้คัดลอกไปใช้ได้เลยครับ

การอ้างอิง:
[1] Data Arrays - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/api/data-array/
[2] obsidian-dataview/docs/docs/api/intro.md at master ... - GitHub https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/api/intro.md
[3] blacksmithgu/obsidian-dataview: A data index and query ... - GitHub https://github.com/blacksmithgu/obsidian-dataview
[4] obsidian-dataview/README.md at master - GitHub https://github.com/blacksmithgu/obsidian-dataview/blob/master/README.md
[5] obsidian-dataview/README.md at 5ad0994ff384cbb797de382e7edff2388141b73a · blacksmithgu/obsidian-dataview https://github.com/blacksmithgu/obsidian-dataview/blob/5ad0994ff384cbb797de382e7edff2388141b73a/README.md
[6] obsidian-plugin-dataview/README.md at master · SmartJoy-Tech/obsidian-plugin-dataview https://github.com/SmartJoy-Tech/obsidian-plugin-dataview/blob/master/README.md
[7] Queries by DVJS function - Dataview Example Vault - GitHub Pages https://s-blu.github.io/obsidian_dataview_example_vault/30%20Dataview%20Resources/31%20Query%20Overviews/Queries%20by%20DVJS%20function/
ขอตัวอย่างเพิ่ม (เพิ่มประสิทธิภาพของ Obsidian Properties)

เพิ่มประสิทธิภาพ Properties ได้ด้วยหลักง่าย ๆ: **ใช้ property ให้น้อยแต่มีความหมาย, กำหนดประเภทให้ถูก, จำกัดขอบเขต query และอย่าใช้ DataviewJS สแกนทั้ง vault โดยไม่จำเป็น** Obsidian Properties เก็บ metadata แบบมีโครงสร้างใน YAML frontmatter และรองรับ Text, List, Number, Checkbox, Date และ Date & time[1][2]

## 1. โครงสร้าง Properties ที่แนะนำ

ใช้ชุด property หลักไม่เกิน 8–10 อัน:

```yaml
---
title: Prometheus Setup
type: note
status: active
priority: 2
project: monitoring
created: 2026-10-29
updated: 2026-10-29
reviewed: false
confidence: medium
related:
  - "[[Daily Briefing]]"
tags:
  - project/monitoring
  - status/active
---
```

`type`, `status`, `project`, `created`, `updated`, `reviewed` และ `confidence` ช่วยให้กรองและเรียงงานได้ชัดเจน โดยไม่ต้องสร้าง property ใหม่สำหรับทุกเรื่อง[1][3]

## 2. กำหนดชนิดข้อมูลให้ถูก

| Property | ควรใช้ประเภท | เหตุผล |
|---|---|---|
| `priority` | Number | เรียงและเปรียบเทียบได้ |
| `created`, `updated`, `due` | Date | กรองตามช่วงเวลาได้ |
| `reviewed` | Checkbox | กรอง `true` / `false` ได้ตรง |
| `related` | List | เก็บหลาย internal links |
| `status` | Text | ใช้ค่ามาตรฐานชุดเดียว |
| `confidence` | Text | ใช้ค่าจำกัด เช่น low / medium / high |

การใช้ property type ที่ถูกต้องช่วยให้ filter และ view ใน Bases ทำงานถูกต้อง เพราะ operator ที่ใช้ได้ขึ้นกับประเภทของ property[1][4]

## 3. ใช้ค่ามาตรฐาน ไม่ใช้ข้อความอิสระ

แทนที่จะเขียน:

```yaml
status: กำลังทำ
status: in progress
status: In Progress
```

ให้ใช้ค่าเดียว:

```yaml
status: active
```

ชุดที่แนะนำ:

```yaml
status: inbox | draft | review | active | done | archived
confidence: low | medium | high
type: note | bookmark | decision | report | meeting | template
```

การมีค่า canonical ช่วยลดข้อมูลซ้ำและทำให้ query หาโน้ตได้แม่นขึ้น[3]

## 4. ใช้ Dataview แบบจำกัดขอบเขต

แทนที่จะสแกนทั้ง vault:

```dataviewjs
const pages = dv.pages();
```

ให้ระบุโฟลเดอร์หรือ tag:

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.status === "active");
```

การจำกัดด้วย path ช่วยลดจำนวนไฟล์ที่ต้องตรวจ และช่วยลดภาระการประมวลผลอย่างชัดเจน โดยเฉพาะ vault ขนาดใหญ่[5]

## 5. ใช้ DQL ก่อน DataviewJS

DQL เหมาะกับงานทั่วไปและอ่านง่ายกว่า:

```dataview
TABLE status, priority, updated
FROM "Projects/Monitoring" OR "Projects/Inventory" OR "Daily"
WHERE status = "active" AND reviewed = false
SORT priority ASC
LIMIT 20
```

ใช้ DataviewJS เฉพาะเมื่อต้องคำนวณ เช่น นับ, จัดกลุ่มซ้อน, หรือคำนวณวันที่:

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
).where(p => p.status === "active");

const groups = pages.groupBy(p => p.project ?? "ไม่ระบุ");

dv.table(
  ["โครงการ", "จำนวน"],
  groups.map(g => [g.key, g.rows.length])
);
```

DataviewJS เหมาะกับ view ซับซ้อนหรือการทำงานร่วมกับปลั๊กอินอื่น แต่ไม่จำเป็นต้องใช้สำหรับทุกตาราง[5]

## 6. ใช้ Bases แทน Query ซ้ำ

ถ้าต้องการดูข้อมูลชุดเดิมหลายมุมมอง ให้สร้าง `.base` แทนการเขียน Dataview หลาย block:

```yaml
filters:
  and:
    - status != "archived"

views:
  - type: table
    name: Active Work
    order:
      - file.name
      - status
      - priority
      - updated
    sort:
      - property: priority
        direction: ASC

  - type: cards
    name: Needs Review
    filter:
      and:
        - reviewed == false
```

Bases สามารถมีหลาย view ในไฟล์เดียว แต่ละ view กรอง เรียง และแสดง Properties ได้ต่างกัน[4][6][7]

## 7. อย่าใส่ข้อมูลที่เปลี่ยนบ่อยใน Properties

ควรเก็บใน frontmatter:

- สถานะงาน
- วันที่สำคัญ
- โครงการ
- ผู้รับผิดชอบ
- ลิงก์โน้ตที่เกี่ยวข้อง
- ระดับความมั่นใจ

ไม่ควรเก็บใน frontmatter:

- เนื้อหายาว
- บันทึกการสนทนา
- log ที่เปลี่ยนทุกนาที
- secrets, API keys, tokens
- ข้อความชั่วคราวที่ควรอยู่ใน Daily Note

Frontmatter เหมาะกับ “ข้อเท็จจริงโครงสร้างเกี่ยวกับโน้ตทั้งฉบับ” เช่น status, rating, วันที่ และลิงก์ที่เกี่ยวข้อง[1][2]

## 8. ใช้ชื่อ property แบบคงที่

ตัวอย่างชื่อที่ควรใช้:

```yaml
created: 2026-10-29
updated: 2026-10-29
next_review: 2026-11-05
decision_date: 2026-10-29
source_url: https://example.com
```

หลีกเลี่ยงการสลับชื่อ เช่น:

```yaml
date_created
createdAt
Created
```

เพราะจะทำให้ Dataview, Bases และ Agent ค้นหาข้อมูลไม่ครบ[2][3]

## 9. ใช้ internal links ใน Properties อย่างถูกต้อง

```yaml
related:
  - "[[Prometheus]]"
  - "[[Repository Inventory]]"
  - "[[Agent Commands]]"
```

ลิงก์ภายในใน YAML ต้องอยู่ในเครื่องหมายคำพูด เพื่อให้ Obsidian ตีความเป็น internal link ได้ถูกต้อง[2]

## 10. จัดกลุ่ม Properties ตามประเภทโน้ต

### Note

```yaml
type: note
status: active
project: monitoring
reviewed: false
```

### Bookmark

```yaml
type: bookmark
source: docs
url: https://example.com
reviewed: false
confidence: low
```

### Decision

```yaml
type: decision
status: review
decision_date: 2026-10-29
owner: you
confidence: medium
```

### Report

```yaml
type: report
status: draft
project: briefing
created: 2026-10-29
updated: 2026-10-29
```

## 11. Query ที่ช่วยตรวจคุณภาพ Properties

### โน้ตที่ไม่มี status

```dataview
LIST
FROM "Projects/Monitoring" OR "Projects/Inventory" OR "Daily"
WHERE !status
```

### โน้ตที่ไม่มี project

```dataview
LIST
FROM "Projects/Monitoring" OR "Projects/Inventory"
WHERE !project
```

### โน้ตที่ไม่มี updated

```dataview
LIST
FROM "Projects/Monitoring" OR "Projects/Inventory" OR "Daily"
WHERE !updated
```

### โน้ตที่ reviewed เป็น false

```dataview
TABLE status, project, updated
FROM "Projects/Monitoring" OR "Projects/Inventory" OR "Daily"
WHERE reviewed = false
SORT updated DESC
```

## 12. ลดการโหลดซ้ำใน Dashboard

แทนที่จะเขียน `dv.pages()` หลายครั้ง:

```dataviewjs
const a = dv.pages();
const b = dv.pages();
const c = dv.pages();
```

ให้ดึงครั้งเดียวแล้วกรองต่อ:

```dataviewjs
const pages = dv.pages(
  '"Projects/Monitoring" OR "Projects/Inventory" OR "Daily"'
);

const draft = pages.where(p => p.status === "draft").length;
const review = pages.where(p => p.status === "review").length;
const active = pages.where(p => p.status === "active").length;

dv.table(
  ["Draft", "Review", "Active"],
  [[draft, review, active]]
);
```

การเรียก `dv.pages()` โดยไม่จำกัดขอบเขตจะประมวลผลไฟล์ทั้ง vault และอาจทำให้ UI ช้าใน vault ขนาดใหญ่[5]

## 13. Template Properties สำหรับ Agent

```yaml
---
title: Agent Review Result
type: report
status: draft
project: agent
created: 2026-10-29
updated: 2026-10-29
reviewed: false
confidence: low
source: copilot
related:
  - "[[Agent Commands]]"
tags:
  - agent
  - status/draft
  - needs-review
---
```

เพิ่ม `source: copilot` เพื่อแยกว่าโน้ตนี้มาจาก Agent และใช้ `reviewed: false` เพื่อบังคับให้คุณตรวจก่อนใช้เป็นข้อสรุป

## 14. กติกาสำคัญ

- เริ่มจาก 7 properties: `title`, `type`, `status`, `created`, `updated`, `project`, `related`
- เพิ่ม `priority`, `reviewed`, `confidence` เมื่อเริ่มใช้งานจริง
- ใช้ DQL สำหรับตารางทั่วไป
- ใช้ DataviewJS เฉพาะงานคำนวณ
- ใช้ Bases เมื่อต้องการหลายมุมมองจากข้อมูลชุดเดียว
- จำกัดขอบเขต query ด้วยโฟลเดอร์หรือ tag ทุกครั้ง
- อย่าเก็บ secrets หรือข้อมูลที่เปลี่ยนบ่อยใน Properties

การจำกัดขอบเขตการค้นหาด้วย path และการใช้ property แบบมีโครงสร้างช่วยให้ vault เร็วและค้นหาได้แม่นขึ้น โดยเฉพาะเมื่อใช้ร่วมกับ Bases หรือ Dataview[4][5]

การอ้างอิง:
[1] How metadata works in Obsidian | MetaEdit https://metaedit.obsidian.guide/concepts/metadata-in-obsidian/
[2] Properties and Metadata | obsidianmd/obsidian-help | DeepWiki https://deepwiki.com/obsidianmd/obsidian-help/4.3-properties-and-metadata
[3] obsidian-notes-template/Documentation/Frontmatter Reference ... https://github.com/edgseu/obsidian-notes-template/blob/main/Documentation/Frontmatter%20Reference.md
[4] Views - Obsidian Help https://obsidian.md/help/bases/views
[5] DataviewJS Vault Performance at Scale - Oyma https://www.getoyma.com/blog/dataview-js-performance-scaling-large-vaults
[6] Introduction to Bases - Obsidian Help https://obsidian.md/help/bases
[7] Bases syntax - Obsidian Help https://obsidian.md/help/bases/syntax
[8] Properties - Developer Documentation https://docs.obsidian.md/Reference/CSS+variables/Editor/Properties
[9] obsidian-guide/guides_for_ai/obsidian-bases.md at main ... https://github.com/sergeypugin/obsidian-guide/blob/main/guides_for_ai/obsidian-bases.md
[10] Frontmatter - Advanced URI Documentation - Obsidian Publish https://publish.obsidian.md/advanced-uri-doc/Actions/Frontmatter
[11] github.com · blob · masterObsidian-Official-Documentation/de/Bases/Bases-Syntax.md at... https://github.com/chrisblifeos-pixel/Obsidian-Official-Documentation/blob/master/de/Bases/Bases-Syntax.md
[12] obsidian-help/en/Editing and formatting/Properties.md at ... https://github.com/obsidianmd/obsidian-help/blob/master/en/Editing%20and%20formatting/Properties.md
[13] obsidian_guides_2_note_metadata_syntax.md - GitHub https://github.com/zoltantill/obsidian-pkm-snippets-guides/blob/main/guides/obsidian_guides_2_note_metadata_syntax.md
ขอวิธีแปลงข้อความธรรมดาให้เป็น Properties อัตโนมัติ

แปลงข้อความธรรมดาให้เป็น Properties อัตโนมัติได้หลายวิธี โดยวิธีที่เหมาะกับคุณคือ **QuickAdd** สำหรับเติม property รายโน้ต, **Linter** สำหรับเติม/ลบ property เป็นชุด และ **Templater** สำหรับสร้างโน้ตใหม่ที่มี frontmatter ครบตั้งแต่ต้น[1][2][3]

## 1. ใช้ QuickAdd: เติม Property รายโน้ต

QuickAdd สามารถเพิ่มหรืออัปเดต property โดยไม่ต้องเปิดโน้ต และเขียนผ่าน frontmatter writer ของ Obsidian[1]

### ตั้งค่า

1. ติดตั้งและเปิดใช้ **QuickAdd**
2. ไปที่ `Settings → QuickAdd`
3. กด **New choice → Capture**
4. เปิด **Capture to active file**
5. ตั้ง **Write position → Property**
6. เลือก **Named property** เช่น `status`
7. เลือก **Set value**
8. ใส่ Capture format เช่น `active`
9. กำหนด hotkey หรือเรียกจาก Command Palette[1][4]

### ตัวอย่าง

เพิ่ม `status: active` ให้โน้ตปัจจุบัน:

```text
Property: status
Action: Set value
Capture format: active
```

เพิ่ม tag เข้า list:

```text
Property: tags
Action: Add to list
Capture format: needs-review
```

QuickAdd รองรับทั้งการตั้งค่า property ใหม่และการเพิ่มรายการเข้า list property[1]

## 2. ใช้ QuickAdd แปลงข้อความเป็นชนิดข้อมูล

ใน `Settings → QuickAdd → Advanced → Properties` เปิด:

```text
Convert string front matter variables to typed properties (Beta)
```

เมื่อเปิดแล้ว QuickAdd จะพยายามแปลงข้อความ เช่น:

| ข้อความเดิม | Property ที่ได้ |
|---|---|
| `"42"` | Number: `42` |
| `"true"` | Checkbox: `true` |
| `"a, b, c"` | List: `a`, `b`, `c` |
| `- a` หรือ `- b` | List |

ฟีเจอร์นี้เป็น Beta และใช้ heuristic จึงควรทดสอบกับโน้ตสำคัญก่อนใช้ทั้ง vault[5]

## 3. ใช้ Templater: สร้างโน้ตใหม่ที่มี Properties อัตโนมัติ

สร้าง template เช่น `Templates/ZyntroAI Note.md`:

```markdown
---
title: <% tp.file.title %>
type: note
status: draft
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
project: 
reviewed: false
confidence: low
related: []
tags:
  - note
  - status/draft
---

# <% tp.file.title %>

## สรุป

## สิ่งที่ยังต้องตรวจ

- [ ] 
```

จากนั้นสร้างโน้ตใหม่จาก template นี้ ระบบจะใส่ `created`, `updated`, `status`, `reviewed` ให้อัตโนมัติ[3]

## 4. ใช้ Linter: เติม Property เป็นชุด

Linter เหมาะกับการเติม property ให้หลายโน้ตพร้อมกัน เช่น เพิ่ม `reviewed: false` ให้ทุกโน้ตในโฟลเดอร์[2]

### ตั้งค่า

1. ติดตั้งและเปิด **Linter**
2. เข้า `Settings → Linter`
3. เปิด **Insert YAML attributes**
4. ใส่ property และค่า เช่น:

```yaml
reviewed: false
confidence: low
status: draft
```

5. เลือกขอบเขต: current file, current folder หรือ entire vault
6. รันคำสั่ง Lint[2]

> [!warning] อย่ารันทั้ง vault ทันที
> ควรทดสอบกับโฟลเดอร์ทดสอบหรือสำเนา vault ก่อน เพราะการเติม property เป็นชุดจะแก้ไขไฟล์จำนวนมาก

## 5. ใช้ QuickAdd User Script: แปลงข้อความในเนื้อหาเป็น Property

สำหรับกรณีที่ต้องการแปลงรูปแบบข้อความ เช่น:

```markdown
Project: monitoring
Status: active
```

ให้ใช้ QuickAdd User Script เพื่ออ่านและย้ายค่าเข้า frontmatter:

```js
module.exports = async (params) => {
  const { app } = params;
  const file = app.workspace.getActiveFile();
  if (!file) return;

  const content = await app.vault.read(file);

  const get = (key) => {
    const match = content.match(new RegExp(`^${key}:\\s*(.+)$`, "mi"));
    return match ? match[1].trim() : undefined;
  };

  const project = get("Project");
  const status = get("Status");

  await app.fileManager.processFrontMatter(file, (fm) => {
    if (project) fm.project = project;
    if (status) fm.status = status.toLowerCase();
    fm.updated = new Date().toISOString().slice(0, 10);
  });
};
```

QuickAdd แนะนำให้ใช้ `app.fileManager.processFrontMatter()` เพื่ออัปเดต frontmatter อย่างปลอดภัย รวมถึงเพิ่ม tag, ตั้งวันที่ หรือลบ property เก่าได้[6]

## 6. ตัวอย่างแปลงข้อความหลายบรรทัด

สมมติโน้ตเดิม:

```markdown
Project: monitoring
Status: active
Priority: 1
Reviewed: false
```

หลังรัน script จะได้:

```yaml
---
project: monitoring
status: active
priority: 1
reviewed: false
updated: 2026-10-29
---
```

## 7. Agent Command ที่เสนอ

สร้าง Custom Command ใน Copilot:

```text
Agent: Extract Properties

บทบาท: ผู้ช่วยแปลงข้อความเป็น Properties

ตรวจโน้ตปัจจุบัน แล้วดึงข้อมูลที่ควรกลายเป็น frontmatter

Property ที่อนุญาต:
- title
- type
- status
- project
- created
- updated
- priority
- reviewed
- confidence
- related

กติกา:
- ดึงเฉพาะข้อมูลที่ปรากฏชัดเจนในโน้ต
- ไม่เดาค่าที่ไม่มีหลักฐาน
- ใช้ค่า status จากชุด: inbox, draft, review, active, done, archived
- ใช้ internal links เฉพาะโน้ตที่มีอยู่จริง
- แสดงผลเป็น YAML ที่ถูกต้อง
- ไม่แก้ไขไฟล์จนกว่าผู้ใช้จะอนุมัติ
```

## 8. แนวทางที่แนะนำสำหรับ ZyntroAI

| สถานการณ์ | เครื่องมือ | เหตุผล |
|---|---|---|
| เพิ่ม `status` หรือ `reviewed` ให้โน้ตปัจจุบัน | QuickAdd | เร็วและกำหนด hotkey ได้ [1] |
| สร้างโน้ตใหม่ที่มี metadata ครบ | Templater | ใส่วันที่และค่าเริ่มต้นอัตโนมัติ [3] |
| เติม property ให้หลายโน้ต | Linter | ทำเป็นชุดตามโฟลเดอร์หรือ vault [2] |
| แปลงข้อความรูปแบบ `Key: value` | QuickAdd User Script | ควบคุมกฎการแปลงได้ [6] |
| ให้ Agent เสนอ YAML | Copilot Custom Command | คุณตรวจก่อนนำไปใช้ |

แนะนำให้เริ่มจาก **QuickAdd สำหรับ `status` และ `reviewed`** ก่อน เพราะใช้บ่อยที่สุดและความเสี่ยงต่ำ จากนั้นจึงใช้ Linter กับโฟลเดอร์ทดสอบ และใช้ Agent เสนอ YAML ให้คุณตรวจก่อนบันทึกครับ[1][2][5]

การอ้างอิง:
[1] The options, one by one https://quickadd.obsidian.guide/docs/Choices/CaptureChoice/
[2] How to Batch Edit Obsidian Properties | Prakash Joshi Pax https://www.patreon.com/posts/how-to-batch-99242923
[3] ComingFromTemplater.md https://quickadd.obsidian.guide/docs/ComingFromTemplater.md
[4] Using Quickadd inline scripts to set properties - Help - Obsidian Forum https://forum.obsidian.md/t/using-quickadd-inline-scripts-to-set-properties/118248
[5] Settings https://quickadd.obsidian.guide/docs/Settings/
[6] quickadd.obsidian.guide · docs · UserScriptsquickadd.obsidian.guide https://quickadd.obsidian.guide/docs/UserScripts.md
[7] Format Syntax https://quickadd.obsidian.guide/docs/FormatSyntax/
[8] QuickAdd CLI https://quickadd.obsidian.guide/docs/Advanced/CLI/
[9] quickadd.obsidian.guide · docs · Choicesquickadd.obsidian.guide https://quickadd.obsidian.guide/docs/Choices/TemplateChoice.md
[10] quickadd.obsidian.guide · docs · InlineScriptsInline scripts | QuickAdd https://quickadd.obsidian.guide/docs/InlineScripts/
[11] quickadd.obsidian.guide · docs · FormatSyntaxquickadd.obsidian.guide https://quickadd.obsidian.guide/docs/FormatSyntax.md
[12] Canvas Capture https://quickadd.obsidian.guide/docs/Examples/Capture_CanvasCapture/
[13] Getting Started | QuickAdd https://quickadd.obsidian.guide/docs/
[14] Frontmatter Templater - Obsidian Plugin https://community.obsidian.md/plugins/frontmatter-templater
วิธีใช้ Linter แปลงข้อความเป็น Properties

ใช้ **Linter** แปลงข้อความเป็น Properties ได้ 2 วิธีหลัก: `Insert YAML attributes` สำหรับเติม property คงที่ และ `Move Dataview inline fields to YAML frontmatter` สำหรับแปลง `key:: value` ในเนื้อหาให้เป็น frontmatter[1][2]

## 1. เติม Properties คงที่

ใช้เมื่อต้องการให้ทุกโน้ตมี property เริ่มต้น เช่น `status`, `reviewed`, `confidence`

1. ติดตั้งและเปิดใช้ **Linter**
2. เข้า `Settings → Linter → YAML`
3. เปิด **Insert YAML attributes**
4. ใส่ข้อความ YAML ในช่อง **Text to insert**:

```yaml
type: note
status: draft
reviewed: false
confidence: low
```

5. รัน Linter กับโน้ตปัจจุบันหรือโฟลเดอร์[1][3]

Linter จะเติม property ที่ยังไม่มีใน frontmatter แต่ไม่ควรถือว่ามันจะเขียนทับค่าที่มีอยู่แล้วเสมอ จึงควรทดสอบกับโน้ตตัวอย่างก่อนใช้ทั้ง vault[1][3]

## 2. แปลง Inline Field เป็น Properties

หากโน้ตเขียนแบบ Dataview inline field:

```markdown
project:: monitoring
status:: active
priority:: 1
```

ให้เปิด rule:

```text
Move Dataview inline fields to YAML frontmatter
```

จากนั้นรัน Linter ผลลัพธ์จะเป็น:

```yaml
---
project: monitoring
status: active
priority: 1
---
```

Rule นี้ย้าย inline field จากเนื้อหาเข้า YAML frontmatter และมีตัวเลือกจัดการกรณีที่ key เดียวกันมีอยู่ใน frontmatter แล้ว[2]

## 3. แปลงข้อความแบบ `Key: value`

หากโน้ตเขียนแบบนี้:

```markdown
Project: monitoring
Status: active
Priority: 1
```

Linter ไม่มี rule สำเร็จรูปที่แปลงรูปแบบนี้เป็น frontmatter โดยตรง แต่ใช้ **Custom Regex Replacements** ได้[2][4]

เข้า `Settings → Linter → Custom → Custom regex replacements` แล้วเพิ่ม rule:

| ช่อง | ค่า |
|---|---|
| Regex to find | `^Project:\s*(.+)$` |
| Flags | `gm` |
| Regex to replace | `project: $1` |

ทำซ้ำสำหรับ:

| ข้อความเดิม | Regex to find | Regex to replace |
|---|---|---|
| `Status: active` | `^Status:\s*(.+)$` | `status: $1` |
| `Priority: 1` | `^Priority:\s*(.+)$` | `priority: $1` |
| `Reviewed: false` | `^Reviewed:\s*(.+)$` | `reviewed: $1` |

Custom regex replacements รองรับการระบุ regex, flags และค่า replacement โดยค่าเริ่มต้นคือ `g` และ `m`[2][4]

> [!warning] ทดสอบก่อนใช้จริง
> Regex ที่กว้างเกินไปอาจแก้ข้อความในเนื้อหาที่ไม่ตั้งใจ เอกสาร Linter เตือนให้ใช้ replacement แบบแคบและทดสอบกับสำเนาโน้ตจริงก่อน[4][5]

## 4. ตัวอย่างก่อน–หลัง

### ก่อน

```markdown
Project: monitoring
Status: active
Priority: 1

# Prometheus Setup

ตรวจ target และ alert rules
```

### หลังใช้ Custom Regex

```markdown
project: monitoring
status: active
priority: 1

# Prometheus Setup

ตรวจ target และ alert rules
```

### หลังใช้ Move inline fields

```markdown
---
project: monitoring
status: active
priority: 1
---

# Prometheus Setup

ตรวจ target และ alert rules
```

## 5. ตั้งค่าให้ทำงานอัตโนมัติ

ใน `Settings → Linter`:

- เปิด **Lint on save** เพื่อให้รันเมื่อบันทึกโน้ต
- หรือรันด้วยมือผ่าน Command Palette: **Linter: Lint the current file**
- หลีกเลี่ยงการเปิด lint ทั้ง vault จนกว่าจะทดสอบกับโฟลเดอร์ทดสอบแล้ว[5][6]

## 6. ข้อควรระวัง

- ทดสอบกับ **สำเนา vault** หรือโฟลเดอร์ทดสอบก่อน
- ใช้ regex ให้แคบ เช่น `^Project:` ไม่ใช่ `Project`
- อย่าใช้ regex แทนที่ข้อความที่อาจปรากฏใน code block หรือ URL
- ตรวจผลลัพธ์ YAML ด้วย Obsidian Properties หลังรัน
- สำหรับข้อมูลลับ เช่น token หรือ URL ส่วนตัว อย่าย้ายเข้า frontmatter

## 7. แนวทางสำหรับ ZyntroAI

| สถานการณ์ | วิธีที่เหมาะ |
|---|---|
| ต้องการให้ทุกโน้ตมี `reviewed: false` | `Insert YAML attributes` [1] |
| โน้ตมี `project:: monitoring` | `Move Dataview inline fields` [2] |
| โน้ตมี `Project: monitoring` | Custom Regex + Move inline fields [4][2] |
| ต้องการควบคุมกฎซับซ้อนหรือแปลงหลายรูปแบบ | QuickAdd User Script หรือ Templater |

สำหรับเริ่มต้น ให้ทำเฉพาะ 3 property ก่อน: `project`, `status`, `reviewed` แล้วทดสอบกับ 5–10 โน้ตในโฟลเดอร์ทดสอบ ก่อนขยายไปทั้ง vault ครับ[1][2][4]

การอ้างอิง:
[1] platers.github.io › obsidian-linter › settingsYAML Rules - Linter - GitHub Pages https://platers.github.io/obsidian-linter/settings/yaml-rules/
[2] obsidian-linter/src/lang/locale/en.ts at master - GitHub https://github.com/platers/obsidian-linter/blob/master/src/lang/locale/en.ts
[3] The Obsidian Linter Plugin: Consistent Frontmatter Without the Discipline https://danholloran.me/posts/obsidian-linter-plugin-consistent-frontmatter-without-the-discipline
[4] Custom Rules - Linter https://platers.github.io/obsidian-linter/settings/custom-rules/
[5] obsidianmate.com · plugins · linterObsidian Linter Setup: Rules, Lint on Save, YAML & Exclusions https://obsidianmate.com/plugins/linter
[6] platers.github.io › obsidian-linterLinter - GitHub Pages https://platers.github.io/obsidian-linter/
[7] Format converter - Obsidian Help https://obsidian.md/help/plugins/format-converter
[8] platers.github.io › obsidian-linter › settingsSpacing Rules - Linter - GitHub Pages https://platers.github.io/obsidian-linter/settings/spacing-rules/
[9] obsidian-linter/docs/rules.md at b4dd3d9f05a393d4765e8823c4d8f8b380dcaae4 · platers/obsidian-linter https://github.com/platers/obsidian-linter/blob/b4dd3d9f/docs/rules.md?plain=1
[10] platers/obsidian-linter: An Obsidian plugin that formats and ... https://github.com/platers/obsidian-linter
[11] Regex rule to format cover image wikilinks in YAML - Obsidian Forum https://forum.obsidian.md/t/regex-rule-to-format-cover-image-wikilinks-in-yaml/103106
[12] GitHub - HardwayLinka/obsidian-linter: An Obsidian plugin that formats and styles your notes with a focus on configurability and extensibility. https://github.com/HardwayLinka/obsidian-linter
[13] obsidian-linter/README.md at b4dd3d9f05a393d4765e8823c4d8f8b380dcaae4 · platers/obsidian-linter https://github.com/platers/obsidian-linter/blob/b4dd3d9f/README.md?plain=1
[14] obsidian-linter/README.md at master - GitHub https://github.com/platers/obsidian-linter/blob/master/README.md
[15] github.com › joshklein › obsidian-linter-pluginobsidian-linter-plugin/README.md at master - GitHub https://github.com/joshklein/obsidian-linter-plugin/blob/master/README.md
แนะนำ พื้นฐาน และ เรื่องที่นำไปใช้งานได้ทันที

เริ่มจาก **3 อย่างที่ใช้ได้ทันที**: สร้าง template Properties มาตรฐาน, ตั้ง QuickAdd ให้เปลี่ยน `status` และ `reviewed` ด้วยปุ่มเดียว, และใช้ Linter เติม property พื้นฐานให้โน้ตใหม่ อย่าเริ่มจากการแปลงทั้ง vault เพราะเสี่ยงแก้ไฟล์ผิดจำนวนมาก[1][2][3]

## เริ่มวันนี้: 3 ขั้นตอน

### 1. สร้าง Template มาตรฐาน

สร้างโน้ต `Templates/ZyntroAI Note.md`:

```markdown
---
title: <% tp.file.title %>
type: note
status: draft
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
project: 
reviewed: false
confidence: low
related: []
tags:
  - note
  - status/draft
---

# <% tp.file.title %>

## สรุป

## สิ่งที่ยังต้องตรวจ

- [ ] 
```

Template นี้ให้ทุกโน้ตใหม่มี `type`, `status`, `created`, `updated`, `reviewed` และ `confidence` ตั้งแต่เริ่ม ทำให้ค้นหาและกรองได้ทันที 

### 2. ตั้ง QuickAdd 2 ปุ่ม

สร้าง Capture choice ชื่อ `Set Status Active`:

```text
Capture to active file
Write position: Property
Property: status
Action: Set value
Capture format: active
```

สร้างอีกอันชื่อ `Mark Reviewed`:

```text
Capture to active file
Write position: Property
Property: reviewed
Action: Set value
Capture format: true
```

QuickAdd รองรับการเขียน property โดยไม่ต้องเปิดโน้ต และรองรับการใช้ widget ตามชนิดของ property เช่น Number หรือ Checkbox[1][4]

### 3. ใช้ Linter เติมค่าเริ่มต้น

ใน `Settings → Linter → YAML` เปิด **Insert YAML attributes** แล้วใส่:

```yaml
type: note
status: draft
reviewed: false
confidence: low
```

จากนั้นรันเฉพาะโฟลเดอร์ทดสอบก่อน เช่น `Projects/Test` ไม่ควรรันทั้ง vault ในครั้งแรก[2][3]

## ชุด Properties ที่ใช้จริง

ใช้เพียง 7 อันนี้ก่อน:

| Property | ค่าที่ใช้ | ใช้ทำอะไร |
|---|---|---|
| `type` | `note`, `bookmark`, `decision`, `report` | แยกประเภทเอกสาร |
| `status` | `draft`, `review`, `active`, `done`, `archived` | ติดตามงาน |
| `project` | `monitoring`, `inventory`, `briefing` | จัดกลุ่มตามโครงการ |
| `created` | วันที่ | รู้ว่าเริ่มเมื่อไร |
| `updated` | วันที่ | รู้ว่าแก้ล่าสุดเมื่อไร |
| `reviewed` | `true` / `false` | แยกงานที่ตรวจแล้ว |
| `confidence` | `low`, `medium`, `high` | ระบุความน่าเชื่อถือของข้อมูล |

Properties เก็บ metadata แบบมีโครงสร้างใน YAML frontmatter และรองรับข้อความ, ลิงก์, วันที่, checkbox และตัวเลข 

## Template สำหรับ Bookmark

```yaml
---
title: Prometheus Query Basics
type: bookmark
status: review
project: monitoring
source: docs
url: https://prometheus.io/docs/
created: 2026-10-29
updated: 2026-10-29
reviewed: false
confidence: low
related:
  - "[[Prometheus]]"
tags:
  - bookmark
  - project/monitoring
  - needs-review
---
```

## Template สำหรับ Daily Briefing

```yaml
---
title: Daily Briefing
type: report
status: draft
project: briefing
created: 2026-10-29
updated: 2026-10-29
reviewed: false
confidence: medium
related:
  - "[[Repository Inventory]]"
  - "[[Prometheus]]"
tags:
  - report
  - project/briefing
  - status/draft
---
```

## Query ที่ใช้ได้ทันที

### งานที่ยังไม่ตรวจ

```dataview
TABLE status, project, updated
FROM "Projects/Monitoring" OR "Projects/Inventory" OR "Daily"
WHERE reviewed = false
SORT updated DESC
LIMIT 20
```

### งาน active ที่สำคัญ

```dataview
TABLE status, priority, updated
FROM "Projects/Monitoring" OR "Projects/Inventory" OR "Daily"
WHERE status = "active" AND priority <= 2
SORT priority ASC
```

### Briefing ที่ยังเป็นร่าง

```dataview
TABLE created, updated, confidence
FROM "Daily" OR "Projects/Briefing"
WHERE type = "report" AND status = "draft"
SORT updated DESC
```

## กติกาใช้งาน

- ใช้ค่า `status` ชุดเดียวเสมอ: `draft`, `review`, `active`, `done`, `archived`
- ใช้ `reviewed: false` เมื่อยังไม่ตรวจ และเปลี่ยนเป็น `true` เมื่อตรวจแล้ว
- ใช้ `confidence: low` กับโน้ตจาก Agent หรือข้อมูลที่ยังไม่มีหลักฐาน
- อย่าใส่ token, password หรือ URL ส่วนตัวใน Properties
- ทดสอบ Linter กับ 5–10 โน้ตก่อนใช้ทั้ง vault

## แผน 7 วัน

| วัน | สิ่งที่ทำ |
|---|---|
| 1 | สร้าง Template และใช้กับโน้ตใหม่ |
| 2 | ตั้ง QuickAdd `Set Status Active` |
| 3 | ตั้ง QuickAdd `Mark Reviewed` |
| 4 | เพิ่ม Properties ให้ bookmarks 10 รายการ |
| 5 | สร้าง Query “งานที่ยังไม่ตรวจ” |
| 6 | ทดสอบ Linter ในโฟลเดอร์ทดสอบ |
| 7 | สร้าง Dashboard สรุป draft, review, active |

เริ่มจาก **Template + QuickAdd 2 ปุ่ม** ก่อนครับ เพราะให้ผลทันทีและความเสี่ยงต่ำที่สุด; ส่วน Linter ให้ใช้หลังมีโครงสร้าง Properties ชัดแล้ว[1][2][3]

การอ้างอิง:
[1] quickadd.obsidian.guide · docs · AdvancedOne-page Inputs | QuickAdd https://quickadd.obsidian.guide/docs/Advanced/onePageInputs/
[2] Linter - Obsidian Plugin https://community.obsidian.md/plugins/obsidian-linter
[3] obsidian-linter/docs/rules.md at master - GitHub https://github.com/platers/obsidian-linter/blob/master/docs/rules.md
[4] Releases · chhoumann/quickadd https://github.com/chhoumann/quickadd/releases
[5] Examples https://quickadd.obsidian.guide/docs/Examples/
[6] QuickAdd - Tasks User Guide - Obsidian Publish https://publish.obsidian.md/tasks/Other+Plugins/QuickAdd
