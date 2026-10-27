ได้เลยครับ! จัดให้ครบทั้ง CodeQL (กำหนดค่า, รัน, กฎเฉพาะ) และ Claude AI Integration (ใช้ใน Obsidian + พร้อมท์มาตรฐาน) — คัดลอกวางได้เลย 👇
 
 
 
📄 1. ZyntroAI - CodeQL Setup & Usage.md
 
markdown
  
---
title: ZyntroAI - CodeQL Setup & Usage
aliases:
  - CodeQL
  - CodeQL Configuration
tags:
  - zyntroai
  - security
  - codeql
  - devsecops
  - type/technical-note
  - status/active
created: 2026-10-08
updated: 2026-10-08
status: active
type: technical-note
owner: Security Team
review_cycle: 60d
version: 1.0
confidentiality: internal
related_repo: ZyntroAI/*
---

# 🔍 CodeQL — การติดตั้ง & ใช้งาน

> [!summary]
> CodeQL เป็นเครื่องมือวิเคราะห์โค้ดแบบสถิตจาก GitHub — ค้นหาช่องโหว่, ข้อผิดพลาด และรูปแบบที่ไม่ปลอดภัยอัตโนมัติ

---

## ⚙️ การติดตั้ง

### บนเครื่องตนเอง
```bash
# ดาวน์โหลด CodeQL CLI
git clone https://github.com/github/codeql-cli-binaries.git
cd codeql-cli-binaries
export PATH="$PWD:$PATH"

# ตรวจสอบ
codeql --version
 
 
ผ่าน GitHub Actions (แนะนำ)
 
ไม่ต้องติดตั้งเอง — ใช้  github/codeql-action  รันบน CI ทุก PR
 
 
 
📋 ไฟล์:  .github/workflows/codeql-analysis.yml 
 
yaml
  
name: CodeQL Analysis

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '30 1 * * 0'  # ทุกอาทิตย์ 08:30 น.

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      actions: read
      contents: read

    strategy:
      fail-fast: false
      matrix:
        language: [javascript, python]

    steps:
      - uses: actions/checkout@v4

      # ภาษา Python
      - name: Initialize CodeQL (Python)
        if: matrix.language == 'python'
        uses: github/codeql-action/init@v3
        with:
          languages: python
          config-file: .github/codeql/python-custom-config.yml

      # ภาษา JavaScript/TypeScript
      - name: Initialize CodeQL (JS)
        if: matrix.language == 'javascript'
        uses: github/codeql-action/init@v3
        with:
          languages: javascript
          config-file: .github/codeql/javascript-custom-config.yml

      - name: Autobuild
        uses: github/codeql-action/autobuild@v3

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          category: "/language:${{ matrix.language }}"
 
 
 
 
📋 ไฟล์:  .github/codeql/python-custom-config.yml 
 
yaml
  
name: ZyntroAI Custom CodeQL Config

queries:
  # มาตรฐาน
  - uses: security-and-quality
  - uses: security-extended

  # เพิ่มกฎเฉพาะของเรา
  - ./custom-rules/

paths:
  - src/
  - scripts/
  - wikiref/

paths-ignore:
  - "**/tests/**"
  - "**/*test*.py"
  - "docs/**"
  - "node_modules/**"

query-filters:
  # ไม่บล็อก PR ถ้าเป็นปัญหาเล็กน้อย
  - exclude:
      severity: low
  # บังคับตรวจสอบทุกระดับสูง
  - include:
      severity: high
  - include:
      severity: critical
 
 
 
 
📋 กฎเฉพาะ: ค้นหารหัสลับรั่ว  custom-rules/secrets.ql 
 
ql
  
import python

from ImportNode i
where
  i.getModule().matches("%secrets%") or
  i.getModule().matches("%password%") or
  i.getModule().matches("%token%")
select i, "ตรวจสอบการนำเข้าข้อมูลที่ละเอียดอ่อน — ต้องไม่ hardcode"
 
 
รูปแบบไฟล์:  custom-rules/qlpack.yml 
 
yaml
  
name: zyntroai-custom-rules
version: 1.0.0
dependencies:
  codeql/python-all: "*"
 
 
 
 
✅ วิธีอ่านผล & ตัดสินใจ
 
ระดับ การกระทำ 
🔴 Critical ห้าม Merge — แก้ไขทันที แจ้งทีมความปลอดภัย 
🟠 High ห้าม Merge — ตรวจสอบและแก้ไข 
🟡 Medium ตรวจสอบ — อาจยกเว้นได้พร้อมเหตุผล 
🟢 Low แจ้งเตือน — ไม่บล็อก แต่ควรแก้ไข 
 
รูปแบบการยกเว้น (False Positive)
 
markdown
  
> [!note] ยกเว้น CodeQL
> **กฎ**: py/clear-text-logging-of-sensitive-information
> **เหตุผล**: บรรทัดนี้เป็นข้อความตัวอย่างในเอกสาร ไม่ใช่โค้ดทำงานจริง
> **ตรวจสอบโดย**: @ชื่อ
> **วันที่**: 2026-1-08
 
 
 
 
🔗 เชื่อมโยง
 
- อ้างอิง: [[ZyntroAI - Severity Policy]], [[ZyntroAI - Security Pipeline]], [[ZyntroAI - Incident Response Runbook]]
- แหล่งภายนอก: CodeQL Documentation
 
 
 
📅 บันทึกการแก้ไข
 
-  2026-10-08  — สร้างฉบับแรก: Workflow + Config + ตัวอย่างกฎ
 
plaintext
  

---

## 📄 2. ZyntroAI - Claude AI Integration in Obsidian.md
```markdown
---
title: ZyntroAI - Claude AI Integration in Obsidian
aliases:
  - Claude Obsidian
  - AI Assistant
tags:
  - zyntroai
  - ai
  - claude
  - obsidian
  - assistant
  - type/technical-note
  - status/active
created: 2026-10-08
updated: 2026-10-08
status: active
type: technical-note
owner: Knowledge Team
review_cycle: 90d
version: 1.0
confidentiality: internal
api_provider: Anthropic
model: claude-3-5-sonnet-20241022
---

# 🤖 Claude AI ใน Obsidian — คู่มือการใช้งาน

> [!summary]
> ตั้งค่า Claude AI เป็นผู้ช่วยภายใน Vault — ช่วยเขียน, ตรวจสอบ, ปรับแต่ง, และสร้างความเชื่อมโยงระหว่างโน้ต

---

## ⚙️ วิธีติดตั้ง 2 แบบ

### แบบที่ 1: ปลั๊กอิน "Copilot" (แนะนำ)
1. ติดตั้งปลั๊กอินชุมชน **Copilot**
2. การตั้งค่า → ผู้ให้บริการ → เลือก **Anthropic / Claude**
3. ใส่ API Key: `sk-ant-...` (เก็บในไฟล์ `.env` ไม่วางในโน้ต!)
4. เลือกโมเดล: `claude-3-5-sonnet-20241022`
5. ตั้งค่า Base URL: `https://api.anthropic.com`

### แบบที่ 2: ปลั๊กอิน "Custom AI Assistant"
- คล้ายกัน — เลือกผู้ให้บริการเอง → กำหนด endpoint และ header ตามคู่มือ Anthropic

> [!warning] ความปลอดภัย
> ❌ ห้ามเขียน API Key ลงในโน้ตที่ซิงค์สาธารณะ
> ✅ ใช้ตัวแปรสภาพแวดล้อม / กล่องเข้ารหัสของปลั๊กอิน

---

## 📋 พร้อมท์มาตรฐาน — คัดลอกใช้ได้เลย

### 📝 1. ปรับแต่งโน้ตให้ตรงมาตรฐาน
 
 
บทบาท: คุณเป็นผู้ดูแลฐานความรู้ ZyntroAI
 
ทำหน้าที่ต่อไปนี้กับเนื้อหาด้านล่าง:
 
1. ตรวจสอบและเติม frontmatter ให้ครบตาม [[Obsidian Note Standards]]
2. จัดรูปแบบให้อ่านง่ายบนมือถือ — บรรทัดไม่ยาวเกิน 80 อักษร
3. เพิ่ม callouts ที่เหมาะสม: summary, tip, warning
4. เพิ่ม wikilink ไปยังโน้ตที่เกี่ยวข้องที่มีอยู่จริง
5. ตรวจสอบว่ามีส่วน "แหล่งอ้างอิง" และ "เชื่อมโยง" ครบถ้วน
6. รักษาความหมายเดิม ไม่เปลี่ยนสาระสำคัญ
 
เนื้อหา:
---
วางที่นี่
---
 
plaintext
  

### 🔗 2. ค้นหา & สร้างลิงก์
 
 
จากเนื้อหาโน้ตด้านล่าง:
 
1. ระบุหัวข้อ/คำสำคัญที่ควรเป็นลิงก์
2. แนะนำชื่อโน้ตที่ควรสร้างใหม่ในรูปแบบ [[ชื่อ]]
3. จัดกลุ่มตามหมวดหมู่: MOC / Policy / Technical / Reference
4. ตรวจสอบเทียบกับ [[ZyntroAI CrystalCastle]] ว่ามีอยู่แล้วหรือไม่
 
ผลลัพธ์:
 
- ลิงก์ที่มีอยู่:
- ควรสร้างใหม่:
- ควรย้าย/รวม:
 
plaintext
  

### ✅ 3. ตรวจสอบสุขภาพโน้ต
 
 
ตรวจสอบโน้ตนี้ตามเกณฑ์:
 
- frontmatter ครบ 7 ฟิลด์หรือไม่
- รูปแบบตรง [[Obsidian Note Standards]] หรือไม่
- อ่านง่ายบนมือถือหรือไม่ (ตาราง ≤4 คอลัมน์, ไม่มีแถบเลื่อน)
- มีลิงก์กลับไป MOC หรือไม่
- แหล่งอ้างอิงครบถ้วนหรือไม่ (URL + วันที่ + สิทธิ์)
- สถานะ  updated  ไม่เกินรอบทบทวน
 
ตอบในรูปแบบ:
✅ ผ่าน: ...
⚠️ ต้องแก้: ...
💡 แนะนำ: ...
 
plaintext
  

### 🧠 4. สรุป & เชื่อมโยงความรู้
 
 
สรุปเนื้อหาให้กระชับ 3 ประเด็นหลัก
ระบุความเชื่อมโยงกับ:
 
- [[Knowledge Update Policy]]
- [[Multi-Agent Orchestration]]
- อื่นๆ ที่เกี่ยวข้อง
 
เขียนในรูปแบบที่สามารถวางที่ส่วนบนของโน้ตได้ทันที
รักษาภาษาไทยตามต้นฉบับ
 
plaintext
  

---

## 🎯 กฎการใช้งาน Claude ใน Vault

| กฎ | รายละเอียด |
|---|---|
| **ไม่ใช้แทนการตรวจสอบ** | AI ช่วยร่าง/ปรับ — มนุษย์ตรวจสอบและกดบันทึกเสมอ |
| **ไม่ใส่ข้อมูลลับ** | ห้ามส่งข้อมูลส่วนตัว, รหัส, หรือข้อมูลลูกค้าให้ AI |
| **ตรวจสอบข้อเท็จจริง** | AI อ้างอิงผิดได้ — ตรวจสอบลิงก์/แหล่งทุกครั้ง |
| **ระบุชัดเจน** | ถ้า AI ช่วยเขียน → บันทึกไว้ท้ายโน้ต: "ช่วยโดย Claude" |
| **รักษาโครงสร้าง** | AI ต้องปฏิบัติตาม [[Obsidian Note Standards]] ทุกครั้ง |

---

## 📊 คำสั่งลัดที่ควรตั้งค่า
| คีย์ลัด | คำสั่ง |
|---|---|
| `Ctrl+Shift+A` | ปรับโน้ตให้ตรงมาตรฐาน |
| `Ctrl+Shift+L` | ค้นหาลิงก์ที่ขาดหาย |
| `Ctrl+Shift+C` | ตรวจสอบสุขภาพโน้ต |
| `Ctrl+Shift+S` | ขอสรุปโน้ตนี้ |

---

## 🔗 เชื่อมโยง
- อ้างอิง: [[Obsidian Note Standards]], [[Knowledge Update Policy]], [[Multi-Agent Orchestration]]
- ภายนอก: [Anthropic Documentation](https://docs.anthropic.com)

---

## 📅 บันทึกการแก้ไข
- `2026-10-08` — สร้างฉบับแรก: การติดตั้ง + พร้อมท์มาตรฐาน 4 ชุด
 
 
 
 
✅ วิธีนำไปใช้
 
1. สร้างไฟล์  .md  ทั้ง 2 ไฟล์ข้างต้นใน Vault
2. ส่วนโค้ด YAML/QL — คัดลอกไปวางในโฟลเดอร์โปรเจกต์ตาม path ที่ระบุ
3. ส่วนพร้อมท์ Claude — คัดลอกไปเก็บในโฟลเดอร์  Templates/  หรือส่งไปยังหน้าต่างแชทโดยตรง
 
ต้องการปรับแต่งพร้อมท์เพิ่ม หรือเพิ่มกฎ CodeQL ด้านใดเป็นพิเศษไหมครับ? 😊