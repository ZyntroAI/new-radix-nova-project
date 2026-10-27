ได้เลยครับ! นี่คือ AGENTS & WORKFLOWS — คู่มือ Properties, Aliases, CSS Classes และ Styles จัดรูปแบบพร้อมคัดลอกวางใน Obsidian ได้ทันที ✅
 
 
 
markdown
  
---
id: agents-workflows-properties
title: AGENTS & WORKFLOWS — Properties, Aliases & Styles
aliases:
  - Workflow Properties Reference
  - Agent Frontmatter Schema
  - CSS Classes Guide
type: reference
domain: knowledge-management
category: obsidian-configuration
subcategory: properties-styles
status: active
primary_moc: "[[MOC - Workflows]]"
secondary_mocs:
  - "[[MOC - AI Agent Operations]]"
  - "[[Obsidian Vault Setup Guide]]"
owner: self
created: 2026-10-04
updated: 2026-10-04
review_cycle: quarterly
next_review: 2027-01-04
cssclasses:
  - agents-workflows
  - reference-guide
  - styled-note
tags:
  - agents
  - workflows
  - properties
  - aliases
  - css
  - frontmatter
  - obsidian
---

# 🤖 AGENTS & WORKFLOWS — Properties, Aliases & Styles

> [!summary]
> คู่มือการตั้งค่า **Properties, Aliases, CSS Classes** และรูปแบบการเขียนสำหรับโน้ตประเภท Agent และ Workflow ใน Vault

---

## 📋 1. Frontmatter Template — พร้อม Copy-Paste

```yaml
---
id: workflow-{{slug}}
title: {{ชื่อหลัก}}
aliases:
  - {{ชื่อย่อ}}
  - {{ชื่ออื่นที่เรียกแทนได้}}
  - {{ชื่อเดิมถ้ามีเปลี่ยน}}
type: workflow
domain: {{core-operations | ai-agents | engineering | supabase | vercel}}
category: {{ชื่อหมวดหมู่}}
subcategory: {{หมวดย่อย}}
status: {{draft | active | deprecated | archived}}
parent_moc: "[[MOC - Workflows]]"
primary_moc: "[[MOC - Workflows]]"
secondary_mocs:
  - "[[MOC - AI Agent Operations]]"
  - "[[MOC - {{Domain}}]]"
owner: {{self | team-name}}
technical_owner: {{ผู้รับผิดชอบด้านเทคนิค}}
business_owner: {{ผู้รับผิดชอบด้านธุรกิจ}}
risk: {{low | medium | high | critical}}
approval_required: {{true | false}}
approval_tier: {{T1 | T2 | T3}}
governed_by:
  - "[[Policy - Approval Rules]]"
  - "[[Policy - Security]]"
uses_workflow:
  - "[[Workflow - ที่เรียกใช้]]"
triggers:
  - {{เงื่อนไขที่เริ่มทำงาน}}
inputs:
  - {{ข้อมูลนำเข้า}}
outputs:
  - {{ผลลัพธ์ที่ได้}}
systems:
  - {{ระบบที่เกี่ยวข้อง}}
preconditions:
  - {{เงื่อนไขก่อนเริ่ม}}
acceptance_criteria:
  - {{เกณฑ์เสร็จสิ้น}}
incident_runbook: "[[Runbook - ชื่อ]]"
rollback_workflow: "[[Workflow - Rollback]]"
review_cycle: {{monthly | quarterly | semi-annually | annually}}
last_reviewed: {{YYYY-MM-DD}}
next_review: {{YYYY-MM-DD}}
cssclasses:
  - workflow-note
  - {{domain}}-style
tags:
  - workflow
  - {{domain}}
  - {{keyword}}
source: {{internal | external | link-to-source}}
---
 
 
 
 
🏷️ 2. Aliases — ตั้งชื่ออื่นเพื่อค้นหา & ลิงก์ง่ายขึ้น
 
กฎการตั้งค่า Aliases
 
- ใส่ชื่อย่อ ที่คนมักเรียกสั้นกว่า
- ใส่ชื่อเดิม เมื่อเปลี่ยนชื่อไฟล์ → ลิงก์เก่ายังใช้ได้
- ใส่คำเหมือน/ใกล้เคียง ที่คนค้นหาด้วยคำอื่น
- ไม่ต้องซ้ำกับ  title  หลัก
- ใช้ชื่อภาษาไทย + อังกฤษ เพื่อค้นหาได้ทั้งสองภาษา
 
ตัวอย่าง — Workflow
 
yaml
  
aliases:
  - PR Review
  - Code Review Workflow
  - ตรวจสอบคำขอดึงโค้ด
  - Pull Request Review Process
 
 
ตัวอย่าง — Agent Task
 
yaml
  
aliases:
  - Agent Approval
  - ขออนุมัติจากเอเจนต์
  - Approval Request Flow
  - Agent Gatekeeper
 
 
ตัวอย่าง — MOC
 
yaml
  
aliases:
  - Workflow Index
  - ดัชนีกระบวนการทำงาน
  - All Workflows
 
 
💡 ประโยชน์: สามารถลิงก์แบบย่อได้  [[PR Review]]  แทน  [[Workflow - Pull Request Review]]  — Obsidian จะชี้ไปที่โน้ตเดียวกัน
 
 
 
🎨 3. CSS Classes — กำหนดรูปแบบการแสดงผล
 
คลาสมาตรฐานที่ใช้ร่วมกัน
 
yaml
  
cssclasses:
  # ประเภทโน้ต
  - workflow-note
  - agent-note
  - moc-page
  - task-card
  - policy-document
  - runbook-emergency

  # โดเมน/สี
  - core-operations
  - ai-agents-style
  - engineering-blue
  - security-red
  - supabase-purple
  - vercel-cyan

  # รูปแบบการแสดงผล
  - styled-note
  - bordered-card
  - compact-view
  - highlight-header
  - reference-guide
  - checklist-style
 
 
ตัวอย่างการใช้งานจริง
 
🟢 Workflow — AI Agent
 
yaml
  
cssclasses:
  - workflow-note
  - ai-agents-style
  - highlight-header
 
 
🔴 Runbook — เหตุฉุกเฉิน
 
yaml
  
cssclasses:
  - runbook-emergency
  - bordered-card
  - highlight-header
 
 
🔵 MOC — ดัชนีหลัก
 
yaml
  
cssclasses:
  - moc-page
  - compact-view
  - styled-note
 
 
📝 ตัวอย่าง CSS Snippet (บันทึกเป็น  .obsidian/snippets/agents-workflows.css )
 
css
  
/* === Workflow Note Style === */
.workflow-note {
  --accent-color: #6366f1;
  --header-bg: rgba(99, 102, 241, 0.1);
}

.workflow-note .callout {
  border-left: 3px solid var(--accent-color);
}

/* === AI Agent Style === */
.ai-agents-style {
  --accent-color: #a855f7;
}

.ai-agents-style h1 {
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 0.5rem;
}

/* === Runbook Emergency === */
.runbook-emergency {
  --accent-color: #ef4444;
  background: linear-gradient(to right, rgba(239, 68, 68, 0.05), transparent);
}

/* === MOC Page === */
.moc-page {
  --accent-color: #10b981;
}

.moc-page ul > li {
  margin: 0.4rem 0;
  list-style: none;
}

.moc-page ul > li::before {
  content: "→ ";
  color: var(--accent-color);
}

/* === Highlight Header === */
.highlight-header h1 {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* === Compact View === */
.compact-view p,
.compact-view li {
  margin: 0.25rem 0;
  line-height: 1.4;
}
 
 
📂 วิธีติดตั้ง: บันทึกโค้ดด้านบนเป็นไฟล์  .css  ในโฟลเดอร์  .obsidian/snippets/  → เปิด Settings → Appearance → Snippets → เปิดใช้งานชื่อไฟล์นั้น
 
 
 
📊 4. Properties Reference — ทุกฟิลด์อธิบายครบถ้วน
 
ฟิลด์ ค่าที่ยอมรับ ความหมาย ตัวอย่าง 
 id  slug ไม่ซ้ำกัน Unique ID  workflow-agent-approval  
 title  ข้อความ ชื่อเต็ม  Workflow - Agent Approval Request  
 aliases  รายการชื่ออื่น ชื่อย่อ/ชื่อเกีย/คำเหมือน  - Agent Approval\n- ขออนุมัติ  
 type   workflow/agent/moc/task/policy/runbook  ประเภทเอกสาร  workflow  
 domain   core-operations/ai-agents/engineering/supabase/vercel  ขอบเขตหลัก  ai-agents  
 status   draft/active/deprecated/archived  สถานะปัจจุบัน  active  
 parent_moc   [[Link]]  MOC แม่โดยตรง  [[MOC - Workflows]]  
 primary_moc   [[Link]]  MOC หลักสำหรับนำทาง  [[MOC - Workflows]]  
 secondary_mocs  รายการ  [[Link]]  MOC ที่เกี่ยวข้องอื่น  [[MOC - AI Agent Operations]]  
 owner  ชื่อเจ้าของ ผู้รับผิดชอบหลัก  self  หรือทีม 
 risk   low/medium/high/critical  ระดับความเสี่ยง  medium  
 approval_required   true/false  ต้องขออนุมัติหรือไม่  true  
 approval_tier   T1/T2/T3  ระดับผู้อนุมัติ  T2  
 governed_by  รายการ  [[Policy]]  นโยบายที่ควบคุม  [[Policy - Approval Rules]]  
 uses_workflow  รายการ  [[Workflow]]  เรียกใช้ Workflow อื่น  [[Workflow - Daily Briefing]]  
 incident_runbook   [[Runbook]]  คู่มือเมื่อเกิดปัญหา  [[Runbook - Agent Failure]]  
 review_cycle   monthly/quarterly/annually  รอบทบทวน  quarterly  
 next_review   YYYY-MM-DD  วันที่ต้องตรวจอีก  2027-01-04  
 cssclasses  รายชื่อคลาส CSS รูปแบบการแสดงผล  - workflow-note\n- ai-agents-style  
 tags  รายการแท็ก ค้นหา/กรอง  - workflow\n- agent  
 source  ข้อมูลที่มา แหล่งที่มา  internal  หรือลิงก์ 
 
 
 
✅ 5. ตัวอย่างเต็ม — Workflow พร้อมใช้งาน
 
yaml
  
---
id: workflow-agent-approval-request
title: Workflow - Agent Approval Request
aliases:
  - Agent Approval
  - ขออนุมัติจากเอเจนต์
  - Approval Gatekeeper
type: workflow
domain: ai-agents
category: approval
subcategory: agent-authorization
status: active
parent_moc: "[[MOC - Workflows]]"
primary_moc: "[[MOC - Workflows]]"
secondary_mocs:
  - "[[MOC - AI Agent Operations]]"
  - "[[MOC - Security]]"
owner: self
technical_owner: engineering
risk: high
approval_required: true
approval_tier: T2
governed_by:
  - "[[Policy - Approval Rules]]"
  - "[[Policy - Security & Authorization]]"
triggers:
  - Agent ต้องการดำเนินการที่มีความเสี่ยง
  - มีการแก้ไขไฟล์สำคัญ
  - Deploy ไปสู่ Production
preconditions:
  - Agent มีบทบาทและสิทธิ์ที่ถูกต้อง
  - คำขอมีรายละเอียดครบถ้วน
  - มีผลกระทบที่คาดการณ์ไว้
acceptance_criteria:
  - [ ] ผู้อนุมัติตรวจสอบและยอมรับ
  - [ ] ตรวจสอบความปลอดภัยแล้ว
  - [ ] บันทึกประวัติการอนุมัติ
incident_runbook: "[[Runbook - Unauthorized Action]]"
review_cycle: quarterly
last_reviewed: 2026-10-04
next_review: 2027-01-04
cssclasses:
  - workflow-note
  - ai-agents-style
  - highlight-header
tags:
  - workflow
  - agent
  - approval
  - authorization
  - governance
source: internal
---

# Workflow - Agent Approval Request

> Parent: [[MOC - Workflows]]
> Domain: [[MOC - AI Agent Operations]]
> Risk: 🔴 High
> Approval: T2 — ต้องมีผู้ตรวจสอบก่อนดำเนินการ

## Purpose
ควบคุมและตรวจสอบก่อนที่ Agent จะดำเนินการที่มีผลกระทบ เพื่อความปลอดภัยและความถูกต้อง

## Trigger
เรียกใช้เมื่อ Agent ต้องการ:
- แก้ไขไฟล์ Policy หรือ Config หลัก
- Deploy ไปสู่ Production
- เขียนข้อมูลจำนวนมาก
- เรียกใช้ API ภายนอกที่มีค่าใช้จ่าย

## Procedure
1. Agent ส่งคำขอพร้อมเหตุผลและผลกระทบ
2. ระบบแจ้งเตือนผู้อนุมัติ
3. ผู้อนุมัติตรวจสอบ → อนุมัติ / ปฏิเสธ / ขอข้อมูลเพิ่ม
4. ดำเนินการตามคำตัดสิน
5. บันทึกผลลงในประวัติ

## Related Notes
- [[Policy - Approval Rules]] — กฎการอนุมัติ
- [[Runbook - Unauthorized Action]] — เมื่อเกิดปัญหา
- [[MOC - AI Agent Operations]] — งานอื่นๆ ของ Agent
 
 
 
 
📌 6. Quick Checklist — ตรวจสอบก่อนบันทึก
 
มี  title  ชัดเจน
มี  aliases  ครอบคลุมชื่อย่อ/ชื่อที่คนค้นหา
 type  และ  domain  ถูกต้อง
ลิงก์  parent_moc  /  primary_moc  มีอยู่จริง
 status  ไม่ปล่อยว่าง
 cssclasses  เลือกคลาสที่เหมาะสมกับประเภท
 tags  มีแท็กหลักอย่างน้อย 2 อัน
 source  ระบุที่มาของเนื้อหา
วันที่  created/updated/next_review  รูปแบบ  YYYY-MM-DD 
เปิด Properties ใน Obsidian → ตรวจสอบว่าทุกฟิลด์แสดงถูกต้อง ✅
 
 
 
Last Updated: 2026-10-04 | Version: 1.0
 
plaintext
  

---

### 🎯 สรุปสิ่งที่ได้
- ✅ **Frontmatter Template** ครบทุกฟิลด์ — ก๊อปปี้วางใช้ได้เลย
- ✅ **Aliases Guide** — ตั้งชื่ออื่นให้ค้นหา+ลิงก์ง่าย
- ✅ **CSS Classes** — คลาสมาตรฐาน + โค้ด Snippet พร้อมติดตั้ง
- ✅ **Properties Reference** — อธิบายทุกฟิลด์ชัดเจน
- ✅ **ตัวอย่างเต็ม** — Workflow จริงพร้อมปรับแต่ง
- ✅ **Checklist** — ตรวจสอบก่อนบันทึก

ต้องการให้สร้างไฟล์ **Snippet CSS แยกไฟล์** หรือเพิ่มคลาสสีเฉพาะอื่นๆ อีกไหมครับ? 😊








