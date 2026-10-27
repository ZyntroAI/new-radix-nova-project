Obsidian Plugin AGENTS SKILLS

```markdown
---
title: "Obsidian Plugin AGENTS SKILLS"
aliases:
  - "Obsidian agent skills"
  - "AGENTS.md skills"
  - "AI Agents plugin skills"
tags:
  - "obsidian"
  - "ai-agents"
  - "skills"
  - "plugin"
type: "guide"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# Obsidian Plugin AGENTS SKILLS

> [!summary]
> **AGENTS** และ **SKILLS** คือวิธีจัดระเบียบความสามารถของ AI agent ใน Obsidian vault  
> `AGENTS.md` ใช้กำหนดบทบาท, กติกา, ขอบเขตและวิธีทำงานของ agent  
> ส่วน `Skills/` ใช้แยกความสามารถเฉพาะงาน เช่น cleanup vault, research, daily review หรือ writing  
> การแยกแบบนี้ช่วยให้ agent นำกลับมาใช้ซ้ำได้ ตรวจสอบได้ และปรับ permissions ได้ง่ายขึ้น

## แนวคิดหลัก

```text
AGENTS.md
   ↓ กำหนดว่า agent คือใคร ทำอะไร และมีกติกาอะไร

Skills/
   ↓ แยกความสามารถเป็นหน่วยย่อยที่นำกลับมาใช้ได้

Tools & permissions
   ↓ กำหนดว่า agent อ่าน เขียน ค้นหา หรือเชื่อม external services ได้แค่ไหน

Session logs
   ↓ บันทึกว่า agent ทำอะไร เปลี่ยนอะไร และผู้ใช้อนุมัติอะไร
```

Plugin เช่น **AI Agents** รองรับการสร้างและจัดการ agent จาก Markdown files ใน vault ส่วน **Copilot for Obsidian V4** มี Agent Mode และ Agent Skills System ที่ให้ agent เรียกใช้ tools เพื่อทำงานกับ vault และบริการภายนอกได้ [242][245][249]

## โครงสร้าง vault ที่แนะนำ

```text
Vault/
├── AGENTS.md
├── Agents/
│   ├── Vault Cleanup Agent.md
│   ├── Research Assistant.md
│   └── Daily Note Assistant.md
├── Skills/
│   ├── vault-cleanup.md
│   ├── research-summary.md
│   ├── daily-review.md
│   └── note-linking.md
├── Templates/
│   ├── Agent session.md
│   └── Skill definition.md
├── Logs/
│   └── Agent sessions/
└── Inbox/
```

> [!tip]
> ใช้ชื่อ skill แบบ kebab-case เช่น `vault-cleanup.md` และ `research-summary.md`  
> เพื่อให้เรียกใช้, อ้างอิง และค้นหาได้สม่ำเสมอ

## AGENTS.md

`AGENTS.md` คือแฟ้มคำสั่งระดับ vault หรือ project ที่อธิบายว่า agent ควรทำงานอย่างไร ควรเขียนให้ชัดเจน สั้น และบังคับใช้ได้จริง

```markdown
# AGENTS.md

## Vault context

Vault นี้ใช้เก็บ personal knowledge, project notes, references และ policies

## General rules

- อ่านโน้ตที่เกี่ยวข้องก่อนเสนอการเปลี่ยนแปลง
- อย่าลบ ย้าย หรือ merge ไฟล์โดยไม่ได้รับอนุมัติ
- ใช้ `[[wikilinks]]` เมื่อเห็นความสัมพันธ์ระหว่างโน้ต
- ใช้ Frontmatter เฉพาะเมื่อโน้ตต้องถูก track หรือ query
- ใช้ชื่อไฟล์ที่สื่อความหมายและค้นหาได้ง่าย
- หากไม่แน่ใจ ให้สร้าง dry-run report ก่อน

## Folder rules

- `Inbox/`: ใช้ capture สิ่งใหม่ ห้ามลบโดยไม่ได้รับอนุมัติ
- `Archive/`: ห้ามแก้ไข เว้นแต่ผู้ใช้ขออย่างชัดเจน
- `Templates/`: ห้ามแก้ไขโดยอัตโนมัติ
- `Logs/`: ใช้เก็บ agent session logs
- `Projects/`: แก้ไขได้เฉพาะโน้ตที่ผู้ใช้ระบุ

## Sensitive data

- ห้ามอ่านหรือแก้ไข credentials, API keys, backup codes, recovery codes
- ห้าม export หรือส่งข้อมูล sensitive ออกนอก vault
- หากพบ sensitive data ให้หยุดและแจ้งผู้ใช้

## Destructive actions

ก่อน delete, merge, rename หรือ move จำนวนมาก:

1. สร้างรายการไฟล์ที่จะได้รับผลกระทบ
2. แสดงผลกระทบต่อ backlinks และ attachments
3. เสนอทางเลือก เช่น archive แทน delete
4. รอผู้ใช้อนุมัติ
```

> [!warning]
> `AGENTS.md` ไม่ใช่ระบบ security ที่แข็งแรงเพียงพอในตัวเอง  
> ต้องใช้ร่วมกับการจำกัด tool permissions, approval flow และการตรวจ session logs

## Agent definition

แต่ละ agent ควรมีไฟล์เฉพาะใน `Agents/`

```markdown
***
title: "Vault Cleanup Agent"
type: "agent"
status: "active"
owner: "เจ้าของ vault"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
risk-tier: "medium"
skills:
  - "[[vault-cleanup]]"
  - "[[note-linking]]"
tools:
  - "read_note"
  - "search_notes"
  - "create_review_report"
  - "propose_edit"
***

# Vault Cleanup Agent

## Purpose

ช่วยตรวจหา duplicate notes, broken links, unused notes และ Inbox items
ที่ควรถูกย้าย, merge หรือ archive

## Scope

- `Inbox/`
- `Projects/`
- `Resources/`

## Rules

- อ่านโน้ตก่อนเสนอการเปลี่ยนแปลง
- ห้ามลบไฟล์โดยไม่ได้รับอนุมัติ
- เลือก Archive ก่อน Delete เมื่อไม่แน่ใจ
- สร้าง dry-run report ก่อน merge หรือ move
- รายงาน backlinks ที่จะได้รับผลกระทบ

## Output format

สร้างรายงานในรูปแบบ:

```markdown
## Cleanup report

### Duplicate candidates

| Notes | Recommendation | Reason |

### Broken links

| Source note | Broken link | Recommendation |

### Inbox review

| Note | Recommendation | Reason |
```
```

## Skill definition

Skill คือความสามารถย่อยที่ agent เรียกใช้ได้ ควรแยกเป็นไฟล์เดี่ยวต่อหนึ่งงาน

```markdown
***
title: "vault-cleanup"
type: "skill"
status: "active"
version: "1.0"
created: "2026-10-11"
updated: "2026-10-11"
risk-tier: "medium"
requires:
  - "read_note"
  - "search_notes"
  - "propose_edit"
***

# vault-cleanup

## Purpose

ตรวจหาโน้ตที่ซ้ำ, broken links และโน้ตใน Inbox ที่ควรจัดระเบียบ

## Inputs

- Vault folder หรือ note selection
- Review period
- Cleanup policy

## Steps

1. ค้นหาโน้ตที่ชื่อคล้ายกัน
2. ตรวจ duplicate content
3. ตรวจ broken wikilinks
4. ตรวจ Inbox notes ที่ไม่ได้รับการจัดการ
5. เสนอ Keep, Merge, Archive, Move หรือ Delete
6. สร้าง dry-run report
7. รอ approval ก่อนดำเนินการ

## Rules

- ห้ามลบไฟล์โดยตรง
- ใช้ Archive เมื่อไม่แน่ใจ
- ตรวจ backlinks ก่อน merge
- รายงาน attachments ที่อาจได้รับผลกระทบ

## Output

- Cleanup report
- Proposed changes
- Risk notes
- Approval checklist
```

## Skill catalog

```markdown
| Skill | หน้าที่ | Risk | Tools ที่ต้องใช้ |
|---|---|---|---|
| [[vault-cleanup]] | หา duplicate, broken links และ Inbox backlog | Medium | Read, search, propose |
| [[note-linking]] | เสนอ wikilinks และ MOC updates | Low | Read, search |
| [[research-summary]] | สรุปแหล่งอ้างอิงและสร้าง literature note | Low | Read, search, web |
| [[daily-review]] | สรุป Daily Note และ tasks | Low | Read, write Daily/ |
| [[frontmatter-validator]] | ตรวจ YAML, tags, status และ type | Low | Read, propose |
| [[template-generator]] | สร้างโน้ตจาก template | Low | Read, create note |
| [[archive-manager]] | เสนอโน้ตที่ควร archive | Medium | Read, search, propose |
| [[moc-builder]] | สร้างหรืออัปเดต MOC | Medium | Read, search, propose |
```

## Skill file template

```markdown
***
title: "{{skill-name}}"
type: "skill"
status: "draft"
version: "0.1"
created: "{{date}}"
updated: "{{date}}"
risk-tier: "low"
requires: []
***

# {{skill-name}}

## Purpose

- 

## Inputs

- 

## Steps

1. 
2. 
3. 

## Rules

- 

## Output

- 

## Safety

- [ ] ไม่มี destructive action โดยไม่มี approval
- [ ] ไม่เข้าถึง sensitive data
- [ ] มี dry-run หรือ propose-only mode
```

## Tool permissions

| Tool | ความเสี่ยง | เหมาะกับ |
|---|---|---|
| `read_note` | Low | อ่านโน้ตและสรุป |
| `search_notes` | Low | ค้นหาและเชื่อมโยง |
| `create_review_report` | Low | สร้างรายงาน |
| `propose_edit` | Low–Medium | เสนอ diff หรือ draft |
| `create_note` | Medium | สร้างโน้ตใหม่ |
| `update_note` | Medium | แก้ไขโน้ตที่กำหนด |
| `move_note` | Medium–High | จัดระเบียบ vault |
| `merge_note` | High | รวมโน้ตและจัดการ links |
| `delete_note` | High | ต้องมี approval เสมอ |
| `external_api` | High | ต้องจำกัด scope และ credentials |

> [!danger]
> อย่าให้ skill ใดเรียก `delete_note`, `merge_note` หรือ `external_api` โดยไม่มี dry-run, scope จำกัด และ explicit approval

## Safe skill workflow

```text
User request
   ↓
Agent อ่าน AGENTS.md และ relevant skill
   ↓
Agent ตรวจ scope และ permissions
   ↓
Agent อ่านโน้ตที่เกี่ยวข้อง
   ↓
Agent สร้าง plan
   ↓
Agent สร้าง dry-run report
   ↓
User review และ approve
   ↓
Agent apply changes เฉพาะที่อนุมัติ
   ↓
Agent verify links, frontmatter และ attachments
   ↓
Agent เขียน session log
```

## Session log template

```markdown
***
title: "Agent session — {{date}} — {{agent}}"
type: "agent-session"
agent: "[[{{agent}}]]"
skills-used:
  - "[[{{skill}}]]"
status: "completed"
created: "{{date}}"
***

# Agent session — {{date}} — {{agent}}

## Request

- 

## Skills used

- 

## Files read

- 

## Proposed changes

- 

## Approved changes

- 

## Applied changes

- 

## Rejected or skipped

- 

## Verification

- [ ] No broken links
- [ ] Frontmatter valid
- [ ] Attachments intact
- [ ] No duplicate notes
- [ ] MOC updated
```

## Skill lifecycle

```text
Draft
   ↓ ทดสอบบน sample notes หรือ sandbox vault
Active
   ↓ ใช้งานจริงและเก็บ session logs
Review
   ↓ ตรวจ output, permissions และ relevance
Updated
   ↓ ปรับ prompt, steps หรือ tool permissions
Deprecated
   ↓ หยุดใช้ แต่ยังเก็บไว้อ้างอิง
Retired
   ↓ revoke access, archive logs และลบ skill หากไม่จำเป็น
```

### Skill review checklist

```markdown
- [ ] Skill ยังตอบโจทย์จริงหรือไม่
- [ ] Steps ยังถูกต้องและทำซ้ำได้
- [ ] Tool permissions ยังจำเป็นหรือไม่
- [ ] มี session logs เพียงพอหรือไม่
- [ ] มี destructive action ที่ต้องจำกัดหรือไม่
- [ ] ผลลัพธ์ยังเชื่อถือได้หรือไม่
- [ ] ควร merge เข้ากับ skill อื่นหรือไม่
- [ ] ควร archive หรือ retire หรือไม่
```

## Example: Research Assistant

```markdown
***
title: "Research Assistant"
type: "agent"
status: "active"
owner: "เจ้าของ vault"
risk-tier: "low"
skills:
  - "[[research-summary]]"
  - "[[note-linking]]"
tools:
  - "read_note"
  - "search_notes"
  - "web_search"
  - "create_review_report"
***

# Research Assistant

## Purpose

ช่วยสรุปแหล่งอ้างอิง ค้นหาความเชื่อมโยง และเสนอโครงร่าง literature note

## Rules

- อ้างอิงแหล่งที่อ่านจริงเท่านั้น
- แยกข้อเท็จจริงจากการตีความ
- สร้าง summary สั้นก่อน แล้วค่อยขยายรายละเอียด
- เสนอ wikilinks เมื่อพบหัวข้อที่เกี่ยวข้อง
- ห้ามสร้างโน้ตใหม่โดยไม่ได้รับอนุมัติ
```

## Example: Daily Note Assistant

```markdown
***
title: "Daily Note Assistant"
type: "agent"
status: "active"
owner: "เจ้าของ vault"
risk-tier: "low"
skills:
  - "[[daily-review]]"
tools:
  - "read_note"
  - "create_note"
  - "update_note"
***

# Daily Note Assistant

## Purpose

ช่วยสร้าง Daily Note และสรุป tasks, captures และ next actions

## Scope

- `Daily/`
- `Inbox/`
- `Projects/`

## Rules

- สร้าง Daily Note ได้เฉพาะวันที่ปัจจุบัน
- ไม่แก้ Daily Note ของวันก่อนหน้าโดยไม่ได้รับอนุมัติ
- ไม่ลบ tasks
- เสนอ next actions แทนการเปลี่ยน priority เอง
```

## Policy

```markdown
## AGENTS & SKILLS policy

1. ทุก agent ต้องมี `AGENTS.md` หรือ agent definition ที่ระบุ purpose, scope และ rules

2. แยกความสามารถเป็น skill files แทนการใส่ทุกอย่างใน prompt เดียว

3. ทุก skill ต้องระบุ inputs, steps, rules, output และ required tools

4. เริ่ม skill ใหม่ด้วย read-only หรือ propose-only

5. ห้าม destructive skill ทำงานโดยไม่มี dry-run และ approval

6. เก็บ session logs สำหรับ agent ที่เขียน, ย้าย, merge หรือลบไฟล์

7. ทบทวน skills และ permissions ทุก 90 วัน

8. หากไม่ใช้ skill แล้ว ให้ deprecate หรือ retire พร้อม revoke access

9. ห้ามเก็บ credentials หรือ sensitive data ใน agent หรือ skill files

10. ใช้ Git หรือ backup เพื่อให้ย้อนการเปลี่ยนแปลงของ agent และ skill ได้
```

## Quick reference

```markdown
| องค์ประกอบ | หน้าที่ | ไฟล์ตัวอย่าง |
|---|---|---|
| AGENTS.md | กติกาและบริบทของ vault | `AGENTS.md` |
| Agent definition | บทบาทและขอบเขตของ agent | `Agents/Vault Cleanup Agent.md` |
| Skill | ความสามารถเฉพาะงาน | `Skills/vault-cleanup.md` |
| Tool permission | สิทธิ์ที่ agent ใช้ได้ | ระบุใน agent/skill frontmatter |
| Session log | บันทึกการทำงานและการอนุมัติ | `Logs/Agent sessions/` |
| Template | โครงร่างมาตรฐาน | `Templates/Skill definition.md` |
```

> [!success]
> ออกแบบ `AGENTS.md` ให้เป็นกติกา ออกแบบ `Skills/` ให้เป็นความสามารถ  
> และออกแบบ permissions ให้เป็นเขตอนุญาต  
> เมื่อแยกสามส่วนนี้ชัด agent จะช่วยงานได้มากขึ้นโดยความเสี่ยงต่ำลง
```

การอ้างอิง:
[1] AI Agents - Obsidian Plugin https://community.obsidian.md/plugins/ai-agents
[2] Agent Skills System | logancyang/obsidian-copilot | DeepWiki https://deepwiki.com/logancyang/obsidian-copilot/5.3-agent-skills-system
