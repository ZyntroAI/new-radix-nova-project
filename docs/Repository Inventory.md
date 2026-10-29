สร้าง [[Repository Inventory]] สำหรับ ZyntroAI ต่อ

ได้ครับ ด้านล่างคือเนื้อหาสำหรับโน้ต **Repository Inventory** ของ `ZyntroAI` โดยแยกสิ่งที่ตรวจพบจริงออกจากข้อมูลที่ยังต้องตรวจเพิ่ม และเชื่อมต่อกับ `[[Skill - Daily Briefing]]` ได้ทันที

รอบนี้เปิดหน้า GitHub ของ `ZyntroAI` สำเร็จ แต่การดึงรายการผ่าน API และหน้ารายการ repositories โดยตรงไม่สำเร็จ จึงเป็น inventory จากข้อมูลสาธารณะที่อ่านได้ ไม่ใช่การสำรวจครบทุก repository

## ผลตรวจสอบรอบนี้

- หน้า GitHub แสดงข้อความ “Showing 10 of 16 repositories”
- พบ 10 รายการในส่วน Repositories และอีก 2 รายการที่ไม่ซ้ำกันในส่วน Popular repositories
- จึงยืนยันชื่อได้ 12 repository จากหน้าเดียวกัน ยังไม่ครบ 16 รายการตามจำนวนที่หน้าเว็บระบุ
- ไม่ได้ตรวจ private repositories, default branch, สถานะ archived, CI หรือ deployment[1]

ด้านล่างเป็นเนื้อหาสำหรับคัดลอกลง `Repository Inventory.md` ไม่มีการเขียนเข้า vault หรือแก้ไข GitHub ให้อัตโนมัติ

## เนื้อหาโน้ตสำหรับ Obsidian

````markdown
---
title: Repository Inventory
type: inventory
owner: ZyntroAI
created: 2026-10-29
last-reviewed: 2026-10-29
status: partial
coverage: public-profile-only
mode: read-only
reported-repository-count: 16
observed-repository-count: 12
tags:
  - zyntroai
  - github
  - inventory
aliases:
  - ZyntroAI Repository Inventory
related:
  - "[[ZyntroAI Dashboard]]"
  - "[[Skill - Daily Briefing]]"
source: https://github.com/ZyntroAI
---

# Repository Inventory — ZyntroAI

> [!summary] วัตถุประสงค์
> จัดทำทะเบียน repository ภายใต้ owner `ZyntroAI`
> เพื่อเป็นฐานสำหรับ Daily Briefing การตรวจสอบโครงการ
> และการเลือกงานที่ควรติดตาม โดยยังไม่เลือก repository หลักล่วงหน้า

## สถานะการสำรวจ

| รายการ | ผล |
|---|---|
| Owner ที่ใช้เป็นขอบเขต | ZyntroAI |
| วันที่ตรวจ | 2026-10-29 |
| แหล่งข้อมูล | หน้า GitHub สาธารณะ |
| จำนวนที่หน้าเว็บระบุ | 16 |
| จำนวนชื่อไม่ซ้ำที่ตรวจพบ | 12 |
| ความครบถ้วน | ยังไม่ครบ |
| Private repositories | ยังไม่ได้ตรวจ |
| การแก้ไขข้อมูลภายนอก | ไม่มี |

> [!warning] ข้อจำกัด
> จำนวน 16 มาจากข้อความบนหน้าเว็บ ไม่ใช่ผลนับจาก API ที่อ่านครบทุกหน้า
> จำนวน 12 คือชื่อ repository ที่พบไม่ซ้ำกันในหน้าโปรไฟล์
> อย่าตีความส่วนต่างว่าเป็น private repositories
> และอย่าสร้างชื่อให้รายการที่ยังไม่พบ

## 1. รายการที่ตรวจพบ

### A. ไม่พบป้าย Fork ในหน้าที่อ่าน

การจัดกลุ่มนี้ไม่ได้ยืนยันประวัติความเป็นเจ้าของโค้ด
เพียงบันทึกว่าหน้ารายการที่ตรวจไม่แสดงป้าย Fork

| Repository | คำอธิบายบน GitHub | ภาษาที่หน้าเว็บแสดง | โน้ตภายใน |
|---|---|---|---|
| [fastapi-python-boilerplate](https://github.com/ZyntroAI/fastapi-python-boilerplate) | FastAPI + Python Boilerplate — พร้อมใช้งาน โครงสร้างมาตรฐาน พัฒนาได้เร็วขึ้น | Python | [[Repo - ZyntroAI - fastapi-python-boilerplate]] |
| [new-crystalcastle](https://github.com/ZyntroAI/new-crystalcastle) | Testing all feature | JavaScript | [[Repo - ZyntroAI - new-crystalcastle]] |
| [new-radix-nova-project](https://github.com/ZyntroAI/new-radix-nova-project) | Pong Game | Rich Text Format | [[Repo - ZyntroAI - new-radix-nova-project]] |

> [!note] คำอธิบายไม่ใช่ผลประเมิน
> คำว่า “พร้อมใช้งาน” เป็นข้อความจากคำอธิบาย repository
> ไม่ใช่ข้อยืนยันว่าผ่าน security review, integration tests
> หรือพร้อม production แล้ว

### B. Repository ที่หน้าเว็บระบุว่าเป็น Fork

| Repository | Fork จาก | คำอธิบายโดยย่อ | โน้ตภายใน |
|---|---|---|---|
| [crystalcastleX](https://github.com/ZyntroAI/crystalcastleX) | [1napz/crystalcastleX](https://github.com/1napz/crystalcastleX) | Runner AI powered By Zyntro-Media-AI | [[Repo - ZyntroAI - crystalcastleX]] |
| [Organization](https://github.com/ZyntroAI/Organization) | [ZyntroAI/main](https://github.com/ZyntroAI/main) | Public feedback discussions | [[Repo - ZyntroAI - Organization]] |
| [puppeteer](https://github.com/ZyntroAI/puppeteer) | [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) | JavaScript API for Chrome and Firefox | [[Repo - ZyntroAI - puppeteer]] |
| [genai-stack](https://github.com/ZyntroAI/genai-stack) | [docker/genai-stack](https://github.com/docker/genai-stack) | Langchain + Docker + Neo4j + Ollama | [[Repo - ZyntroAI - genai-stack]] |
| [main](https://github.com/ZyntroAI/main) | [community/community](https://github.com/community/community) | Public feedback discussions | [[Repo - ZyntroAI - main]] |
| [gemini-cli2](https://github.com/ZyntroAI/gemini-cli2) | [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | AI agent สำหรับ terminal | [[Repo - ZyntroAI - gemini-cli2]] |
| [Staging](https://github.com/ZyntroAI/Staging) | [1napz/crystalcastleX](https://github.com/1napz/crystalcastleX) | Runner AI powered By Zyntro-Media-AI | [[Repo - ZyntroAI - Staging]] |
| [gemini-cli](https://github.com/ZyntroAI/gemini-cli) | [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | AI agent สำหรับ terminal | [[Repo - ZyntroAI - gemini-cli]] |
| [vscode-markdownlint](https://github.com/ZyntroAI/vscode-markdownlint) | [DavidAnson/vscode-markdownlint](https://github.com/DavidAnson/vscode-markdownlint) | Markdown linting สำหรับ VS Code | [[Repo - ZyntroAI - vscode-markdownlint]] |

## 2. ข้อมูลที่ยังต้องตรวจต่อ

- [ ] รายการ repositories ให้ครบตามสิทธิ์ที่เข้าถึงได้
- [ ] ประเภทบัญชี owner: user หรือ organization
- [ ] Default branch ของแต่ละ repository
- [ ] สถานะ archived และ disabled
- [ ] License จากไฟล์จริง
- [ ] README และเป้าหมายปัจจุบัน
- [ ] Workflow files และผลรันล่าสุด
- [ ] Open pull requests ที่ยังเกี่ยวข้อง
- [ ] Issues และ blocker ที่ยืนยันได้
- [ ] ความแตกต่างระหว่าง fork กับ upstream
- [ ] บทบาทที่ผู้ใช้กำหนดให้แต่ละ repository

## 3. ความสัมพันธ์ที่ตรวจพบและที่ต้องยืนยัน

### ความสัมพันธ์ที่ GitHub ระบุ

```text
1napz/crystalcastleX
├── ZyntroAI/crystalcastleX
└── ZyntroAI/Staging

google-gemini/gemini-cli
├── ZyntroAI/gemini-cli
└── ZyntroAI/gemini-cli2

community/community
└── ZyntroAI/main
    └── ZyntroAI/Organization
```

แผนผังนี้แสดงความสัมพันธ์ Fork ตามหน้าเว็บ
ไม่ได้แสดง deployment architecture หรือการใช้งานจริง

### ความสัมพันธ์ที่ห้ามสรุปจากชื่อเพียงอย่างเดียว

- `Staging` ไม่ได้ยืนยันว่าเป็น staging environment ที่ deploy อยู่
- `main` เป็นชื่อ repository ไม่ใช่หลักฐานว่าเป็น default branch ของโครงการอื่น
- `Organization` เป็นชื่อ repository ไม่ใช่หลักฐานประเภทบัญชี owner
- `gemini-cli` และ `gemini-cli2` ไม่ได้ยืนยันว่าอันใดเป็นตัวหลัก
- `new-crystalcastle` ไม่ได้ยืนยันว่าแทนที่ `crystalcastleX`

## 4. นโยบายสำหรับ Daily Briefing

> [!tip] ค่าเริ่มต้น
> เก็บทุก repository ที่ตรวจพบไว้ใน inventory
> แต่ยังไม่ติดป้าย active, production หรือ primary
> จนกว่าจะมีหลักฐานหรือเจ้าของโครงการยืนยัน

### ขั้นตอนการเลือกข้อมูล

1. ใช้ inventory เป็นรายการตั้งต้น
2. ตรวจว่ามี repository เพิ่ม เปลี่ยนชื่อ หรือหายไปจากสิทธิ์ที่เข้าถึงหรือไม่
3. เก็บกิจกรรมตามช่วงเวลาที่กำหนด
4. แยกกิจกรรมของ fork ออกจาก upstream
5. สรุปเฉพาะสิ่งที่มีหลักฐาน
6. ระบุ repository ที่ตรวจไม่สำเร็จ

### เงื่อนไขที่ควรแจ้งให้ตรวจ

- Workflow ที่เกี่ยวข้องล้มเหลว
- Pull request ที่ต้องการ review
- Issue ที่มี blocker ยืนยันได้
- Release ใหม่ใน repository ที่ติดตาม
- การเปลี่ยนแปลง configuration สำคัญ

### สิ่งที่ไม่ถือเป็นหลักฐานโดยลำพัง

- Updated timestamp
- จำนวนดาว
- ตำแหน่งใน Popular repositories
- คำอธิบายว่า production-ready
- การไม่มีข้อมูล workflow ในหน้าที่อ่าน

## 5. ขอบเขตที่ยังไม่รวม

| รายการ | เหตุผล |
|---|---|
| zyntromedia/ZyntroAI-Project | owner ต่างจาก ZyntroAI; รอการยืนยันขอบเขต |
| Repository ที่ยังไม่พบชื่อ | ไม่เดาหรือสร้างรายการเอง |
| Private repositories | ยังไม่มีการตรวจผ่านสิทธิ์ GitHub |

## 6. งานถัดไป

- [ ] ยืนยันรายการ repository ให้ครบ
- [ ] สร้างโน้ตจาก [[Repository Template]]
- [ ] ตรวจ README และ configuration แบบอ่านอย่างเดียว
- [ ] ตรวจ CI และ PR โดยไม่รันโค้ดที่ไม่เชื่อถือ
- [ ] ให้เจ้าของกำหนดบทบาท primary / experiment / reference
- [ ] สร้าง [[ZyntroAI Daily Briefing - Pilot]]

## Related

- [[ZyntroAI Dashboard]]
- [[Skill - Daily Briefing]]
- [[Repository Template]]
- [[GitHub Actions]]
- [[Secrets Management]]

## External sources

- [GitHub — ZyntroAI](https://github.com/ZyntroAI)
- [GitHub REST API — Repositories](https://docs.github.com/en/rest/repos/repos)
````

รายชื่อทั้ง 12 รายการ คำอธิบาย และความสัมพันธ์ fork ในโน้ตข้างต้นอิงจากหน้าโปรไฟล์ที่ตรวจในรอบนี้ ส่วน checklist และนโยบายเป็นข้อเสนอสำหรับระบบของคุณ ไม่ใช่สถานะที่ตรวจเสร็จแล้ว[1]

## Template สำหรับโน้ตแต่ละ repository

ใช้ไฟล์ `Repository Template.md` เพื่อให้ทุกโครงการมีโครงสร้างเดียวกัน โดยไม่เติมสถานะที่ยังไม่ทราบ:

```markdown
---
title: "Repo - OWNER - REPOSITORY"
type: repository
owner: ""
repository: ""
url: ""
visibility: unknown
fork-status: unknown
upstream: ""
default-branch: ""
archived-status: unknown
project-role: unassigned
review-status: pending
last-reviewed:
tags:
  - github/repository
related:
  - "[[Repository Inventory]]"
---

# OWNER/REPOSITORY

## เป้าหมาย
ยังไม่ได้ตรวจสอบ

## ข้อเท็จจริงที่ยืนยันได้
| ข้อเท็จจริง | หลักฐาน | วันที่ตรวจ |
|---|---|---|
|  |  |  |

## โครงสร้างและเทคโนโลยี
ยังไม่ได้ตรวจสอบ

## CI / Tests / Deployment
- CI: ยังไม่ได้ตรวจ
- Tests: ยังไม่ได้ตรวจ
- Deployment: ยังไม่ได้ตรวจ

## ความเกี่ยวข้องกับโครงการอื่น
ยังไม่ได้ยืนยัน

## คำถามที่ต้องตอบ
- Repository นี้ยังใช้งานอยู่หรือไม่?
- เป็นโครงการหลัก การทดลอง หรือแหล่งอ้างอิง?
- หากเป็น fork มีการแก้ไขอะไรจาก upstream?
- ใครเป็นผู้ดูแลและอนุมัติการเปลี่ยนแปลง?

## งานถัดไป
- [ ] อ่าน README
- [ ] ตรวจ default branch
- [ ] ตรวจ workflow และผลรัน
- [ ] บันทึกหลักฐานพร้อมวันที่

## เชื่อมโยง
- [[Repository Inventory]]
- [[Skill - Daily Briefing]]
```

> [!note] การเชื่อมโยงไม่ใช่การสร้างไฟล์อัตโนมัติ
> `[[Repo - ZyntroAI - …]]` เป็นลิงก์ภายใน เมื่อยังไม่มีโน้ตปลายทาง คุณสามารถกดลิงก์เพื่อสร้างโน้ตแล้ววาง template ได้ การใช้ `[[...]]` อย่างเดียวไม่ได้ดึงข้อมูลจาก GitHub หรือสร้างระบบติดตามอัตโนมัติ[2]

ขั้นต่อไปที่สำคัญที่สุดคือยืนยัน inventory ให้ครบก่อนให้ Daily Briefing สรุปว่า “ตรวจทุกโครงการแล้ว” โดยระหว่างนี้สามารถใช้ทั้ง 12 รายการเป็นฐานทดลองแบบ coverage บางส่วนได้อย่างชัดเจน ไม่ต้องเลือก repository หลักก่อนครับ

การอ้างอิง:
[1] Zyntro​ Media https://github.com/ZyntroAI
[2] Internal links - Obsidian Help https://obsidian.md/help/links
[[Obsidian/Copilot for Obsidian|Copilot for Obsidian]]

[[Obsidian/Obsidian - How to build a Plugin|Obsidian - How to build a Plugin]]
[[Obsidian/Repository Inventory|Repository Inventory]]
[[Obsidian/Skill - Daily Briefing|Skill - Daily Briefing]]