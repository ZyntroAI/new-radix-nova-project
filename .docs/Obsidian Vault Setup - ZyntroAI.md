---
aliases:
  - Dola
tags:
  - CodeQL
  - Skill-Registry
  - API
  - ai-agents
  - 02-Skills
  - 1E40AF
  - 0F172A
  - 03-Tasks
  - 04-Policies
  - 06-Validation
  - 07-Audit
  - 05-Runtime
  - สรุป
  - A5B4FC
  - About
  - Agent-Orchestrator
  - Agent
  - Agent-Registry
  - agent-runtime
  - Agents
  - AgentSystem
---
สรุปทั้งหมดให้พร้อม copy ไปวางใน obsidian app

ได้เลยครับ — ด้านล่างคือโน้ตสรุปแบบพร้อมคัดลอกไปวางใน Obsidian ได้ทันที ครอบคลุมการตั้งค่า Obsidian Sync, โครงสร้าง MOC, Child Workflows, YAML, และการตั้งค่า Graph node size/node color ครับ

```markdown
---
id: obsidian-vault-setup-guide
title: Obsidian Vault Setup Guide
aliases:
  - Obsidian Setup
  - Vault Architecture Guide
  - MOC and Workflow System

type: guide
domain: knowledge-management
category: obsidian
subcategory: vault-architecture
status: active

primary_moc: "[[MOC - Home]]"

secondary_mocs:
  - "[[MOC - Workflows]]"
  - "[[MOC - Learning]]"
  - "[[MOC - Engineering]]"

owner: self
created: 2026-10-04
updated: 2026-10-04
review_cycle: quarterly
next_review: 2027-01-04

tags:
  - obsidian
  - guide
  - knowledge-management
  - moc
  - workflows
  - yaml
  - sync
  - graph
---

# Obsidian Vault Setup Guide

> [!summary]
> คู่มือนี้อธิบายการวางโครงสร้าง Obsidian Vault สำหรับจัดการ MOC, Workflows,
> YAML metadata, Obsidian Sync และ Graph View
>
> หลักการสำคัญ:
>
> ```text
> MOC - Home
>   → MOC - Workflows
>     → Workflow Notes
>       → Checklist / Template / Runbook / Reference
> ```
>
> ใช้ MOC เป็นจุดนำทาง ใช้ YAML เพื่อจัดระเบียบข้อมูล
> ใช้ links เพื่อสร้างความสัมพันธ์ และใช้ Sync เพื่อเข้าถึง Vault ได้หลายอุปกรณ์

[[obsidian]] [[knowledge-management]] [[moc]] [[workflows]] [[yaml]] [[sync]] [[graph]]

## Vault Architecture

```text
MOC - Home
│
├── MOC - Workflows
│   ├── Workflow - Pull Request Review
│   ├── Workflow - Build and Test Validation
│   ├── Workflow - Vercel Deployment Recovery
│   ├── Workflow - Supabase Change
│   └── Workflow - Agent Approval Request
│
├── MOC - Engineering
│
├── MOC - AI Agent Operations
│
├── MOC - Security
│
├── MOC - Learning
│
├── MOC - Tasks
│
├── MOC - GitHub
│
├── MOC - Supabase
│
└── MOC - Vercel
```

## Recommended Folder Structure

```text
00-inbox/
01-daily/
02-mocs/
03-projects/
04-tasks/
05-policies/
06-runbooks/
07-workflows/
08-checklists/
09-templates/
10-reference/
11-assets/
12-archive/
13-learning/
```

### Workflow Folder Structure

```text
07-workflows/
├── core-operations/
│   ├── Workflow - Task Management.md
│   ├── Workflow - Daily Briefing.md
│   └── Workflow - Documentation Review.md
│
├── ai-agents/
│   ├── Workflow - Agent Task Selection.md
│   ├── Workflow - Concurrent Agent Coordination.md
│   ├── Workflow - Agent Approval Request.md
│   └── Workflow - Agent Handover.md
│
├── engineering/
│   ├── Workflow - Pull Request Review.md
│   ├── Workflow - Build and Test Validation.md
│   ├── Workflow - Dependency Update.md
│   └── Workflow - Release.md
│
├── supabase/
│   ├── Workflow - Supabase Change.md
│   ├── Workflow - Supabase Migration Review.md
│   └── Workflow - RLS Policy Review.md
│
└── vercel/
    ├── Workflow - Vercel Cache Invalidation.md
    ├── Workflow - Vercel Deployment Recovery.md
    └── Workflow - Rate Limit Review.md
```

## MOC Hierarchy

### MOC - Home

File:

```text
02-mocs/MOC - Home.md
```

```yaml
***
id: moc-home
title: Home
aliases:
  - Vault Home
  - Knowledge Home
  - Main MOC

type: moc
domain: knowledge-management
category: navigation
status: active

is_root: true
primary_moc:

owner: self
created: 2026-10-04
updated: 2026-10-04
review_cycle: monthly
next_review: 2026-11-04

tags:
  - moc
  - navigation
  - home
***
```

```markdown
# MOC - Home

> [!summary]
> จุดเริ่มต้นสำหรับการนำทางภายใน Vault

## Main Maps

- [[MOC - Workflows]]
- [[MOC - Engineering]]
- [[MOC - AI Agent Operations]]
- [[MOC - Security]]
- [[MOC - Tasks]]
- [[MOC - Learning]]
- [[MOC - GitHub]]
- [[MOC - Supabase]]
- [[MOC - Vercel]]

## Current Operations

- [[Dashboard - Operations]]
- [[Dashboard - Daily Briefing]]
- [[Tasks.base]]
- [[Workflows.base]]
- [[Approvals.base]]

## Recent Notes

```dataview
TABLE
  type AS Type,
  status AS Status,
  updated AS Updated
FROM ""
WHERE status = "active"
SORT updated DESC
LIMIT 20
```
```

### MOC - Workflows

File:

```text
02-mocs/MOC - Workflows.md
```

```yaml
***
id: moc-workflows
title: Workflows
aliases:
  - Workflow MOC
  - Operations Workflows

type: moc
domain: operations
category: workflows
status: active

parent_moc: "[[MOC - Home]]"
primary_moc: "[[MOC - Home]]"

secondary_mocs:
  - "[[MOC - AI Agent Operations]]"
  - "[[MOC - Engineering]]"
  - "[[MOC - Security]]"

owner: self
created: 2026-10-04
updated: 2026-10-04
review_cycle: monthly
next_review: 2026-11-04

tags:
  - moc
  - operations
  - workflows
***
```

```markdown
# MOC - Workflows

> Parent: [[MOC - Home]]

> [!summary]
> ศูนย์รวม workflow, operational process, approval flow,
> automation procedure และ runbook ที่ใช้ใน Vault

## Navigation

- Parent: [[MOC - Home]]
- Engineering: [[MOC - Engineering]]
- AI Agents: [[MOC - AI Agent Operations]]
- Security: [[MOC - Security]]
- GitHub: [[MOC - GitHub]]
- Supabase: [[MOC - Supabase]]
- Vercel: [[MOC - Vercel]]

## Core Operations

- [[Workflow - Task Management]]
- [[Workflow - Daily Briefing]]
- [[Workflow - Documentation Review]]

## AI Agent Workflows

- [[Workflow - Agent Task Selection]]
- [[Workflow - Concurrent Agent Coordination]]
- [[Workflow - Agent Approval Request]]
- [[Workflow - Agent Handover]]

## Engineering Workflows

- [[Workflow - Pull Request Review]]
- [[Workflow - Build and Test Validation]]
- [[Workflow - Dependency Update]]
- [[Workflow - Release]]

## Supabase Workflows

- [[Workflow - Supabase Change]]
- [[Workflow - Supabase Migration Review]]
- [[Workflow - RLS Policy Review]]

## Vercel Workflows

- [[Workflow - Vercel Cache Invalidation]]
- [[Workflow - Vercel Deployment Recovery]]
- [[Workflow - Rate Limit Review]]

## All Child Workflows

```dataview
TABLE
  domain AS Domain,
  category AS Category,
  status AS Status,
  risk AS Risk,
  approval_tier AS Approval,
  owner AS Owner,
  next_review AS "Next Review"
FROM "07-workflows"
WHERE type = "workflow"
  AND parent_moc = [[MOC - Workflows]]
SORT domain ASC, category ASC, file.name ASC
```

## Workflows by Domain

```dataview
TABLE rows.file.link AS Workflows
FROM "07-workflows"
WHERE type = "workflow"
  AND status = "active"
  AND parent_moc = [[MOC - Workflows]]
GROUP BY domain
SORT domain ASC
```
```

## Workflow Note Template

File:

```text
09-templates/Template - Workflow.md
```

```markdown
***
id: workflow-{{VALUE:slug}}
title: {{VALUE:title}}
aliases: []

type: workflow
domain: {{VALUE:domain}}
category:
subcategory:

status: draft

parent_moc: "[[MOC - Workflows]]"
primary_moc: "[[MOC - Workflows]]"

secondary_mocs: []

owner: self
technical_owner:
business_owner:
security_owner:

risk: medium
approval_required: false
approval_tier:

triggers: []
inputs: []
outputs: []
systems: []

preconditions: []
acceptance_criteria: []

governed_by:
  - "[[Policy - Approval Rules]]"

incident_runbook:
rollback_workflow:

review_cycle: quarterly
last_reviewed:
next_review:

created: 2026-10-04
updated: 2026-10-04

tags:
  - workflow
***

# Workflow - {{VALUE:title}}

> Parent: [[MOC - Workflows]]
> Domain: [[MOC - {{VALUE:domain-title}}]]
> Governed by: [[Policy - Approval Rules]]

## Purpose

อธิบายผลลัพธ์ที่ workflow นี้ต้องสร้าง

## Scope

อธิบายสิ่งที่รวมอยู่และไม่รวมอยู่ใน workflow

## Trigger

ใช้ workflow นี้เมื่อ:

- 

## Preconditions

- 
- 

## Inputs

- 

## Procedure

1. 
2. 
3. 

## Approval Gates

- 

## Validation

- [ ] 
- [ ] 

## Failure Handling

- ใช้ [[Runbook - ...]]
- Escalate ตาม [[Policy - Incident Response]]

## Completion Criteria

- [ ] 
- [ ] 

## Supporting Notes

```dataview
LIST
FROM ""
WHERE parent_workflow = this.file.link
  AND status = "active"
SORT type ASC, file.name ASC
```

## Related Notes

- [[MOC - Workflows]]
- [[MOC - {{VALUE:domain-title}}]]
- [[Policy - Approval Rules]]
```

## Example Workflow Note

File:

```text
07-workflows/engineering/Workflow - Pull Request Review.md
```

```markdown
***
id: workflow-pull-request-review
title: Pull Request Review
aliases:
  - PR Review
  - Code Review Workflow

type: workflow
domain: engineering
category: code-quality
subcategory: pull-request-review
status: active

parent_moc: "[[MOC - Workflows]]"
primary_moc: "[[MOC - Workflows]]"

secondary_mocs:
  - "[[MOC - Engineering]]"
  - "[[MOC - GitHub]]"

owner: engineering
technical_owner: engineering

risk: medium
approval_required: false
approval_tier:

triggers:
  - pull-request-opened
  - pull-request-ready-for-review

systems:
  - github

governed_by:
  - "[[Policy - Pull Request Standards]]"

related:
  - "[[Checklist - Pull Request Review]]"
  - "[[Runbook - Failed Deployment]]"

review_cycle: quarterly
last_reviewed: 2026-10-04
next_review: 2027-01-04

created: 2026-10-04
updated: 2026-10-04

tags:
  - workflow
  - engineering
  - github
  - code-review
***

# Workflow - Pull Request Review

> Parent: [[MOC - Workflows]]
> Domain: [[MOC - Engineering]]
> Tool: [[MOC - GitHub]]

## Purpose

ตรวจสอบคุณภาพ ความปลอดภัย และความถูกต้องของ Pull Request
ก่อน merge เข้าสู่ branch หลัก

## Trigger

ใช้ workflow นี้เมื่อ Pull Request พร้อมสำหรับ review

## Preconditions

- Pull Request มี description
- CI pipeline ทำงานแล้ว
- Branch ล่าสุดกับ base branch
- Reviewer มีสิทธิ์เข้าถึง repository

## Procedure

1. อ่าน Pull Request description และ acceptance criteria
2. ตรวจสอบ scope ของการเปลี่ยนแปลง
3. ตรวจสอบ code quality และ naming
4. ตรวจสอบ test coverage
5. ตรวจสอบ security impact
6. ตรวจสอบ CI result
7. ส่ง review comment หรือ approve
8. Merge เมื่อผ่าน requirement ทั้งหมด

## Validation

- [ ] CI ผ่าน
- [ ] Tests ผ่าน
- [ ] ไม่มี critical security issue
- [ ] Approval ครบตาม policy
- [ ] Documentation อัปเดตเมื่อจำเป็น

## Related Notes

- [[Checklist - Pull Request Review]]
- [[Policy - Pull Request Standards]]
- [[MOC - Engineering]]
- [[MOC - GitHub]]
```

## Supporting Child Notes

ใช้ `parent_workflow` เมื่อโน้ตนั้นเป็นส่วนประกอบเฉพาะของ Workflow หนึ่ง

ตัวอย่าง:

```text
Workflow - Pull Request Review
├── Checklist - Pull Request Review
├── Template - Pull Request Description
├── Reference - Code Review Guidelines
└── Runbook - Failed Deployment
```

### Checklist YAML Example

```yaml
***
id: checklist-pull-request-review
title: Pull Request Review Checklist
aliases:
  - PR Review Checklist

type: checklist
domain: engineering
category: code-quality
status: active

parent_workflow: "[[Workflow - Pull Request Review]]"
primary_moc: "[[MOC - Workflows]]"

secondary_mocs:
  - "[[MOC - Engineering]]"
  - "[[MOC - GitHub]]"

owner: engineering
risk: low

related:
  - "[[Workflow - Pull Request Review]]"
  - "[[Policy - Pull Request Standards]]"

created: 2026-10-04
updated: 2026-10-04
next_review: 2027-01-04

tags:
  - checklist
  - workflow-support
  - engineering
  - github
***
```

## YAML Field Reference

| Field | Purpose | Example |
|---|---|---|
| `id` | Unique ID ของโน้ต | `workflow-pull-request-review` |
| `title` | ชื่อหลักของโน้ต | `Pull Request Review` |
| `aliases` | ชื่ออื่นสำหรับ link/search | `PR Review` |
| `type` | ประเภทของโน้ต | `workflow`, `moc`, `task`, `project` |
| `domain` | พื้นที่งานหลัก | `engineering`, `security`, `supabase` |
| `category` | หมวดหมู่ย่อย | `deployment`, `code-quality` |
| `status` | สถานะของโน้ต | `draft`, `active`, `deprecated`, `archived` |
| `parent_moc` | MOC ที่เป็น parent โดยตรง | `[[MOC - Workflows]]` |
| `primary_moc` | MOC หลักสำหรับ navigation/query | `[[MOC - Workflows]]` |
| `secondary_mocs` | MOC ที่เกี่ยวข้องเพิ่มเติม | `[[MOC - Engineering]]` |
| `parent_workflow` | Parent workflow ของ supporting note | `[[Workflow - Pull Request Review]]` |
| `uses_workflow` | Workflow ที่ task ใช้ | `[[Workflow - Pull Request Review]]` |
| `risk` | ระดับความเสี่ยง | `low`, `medium`, `high`, `critical` |
| `approval_required` | ต้องอนุมัติหรือไม่ | `true`, `false` |
| `approval_tier` | ระดับ approval | `T1`, `T2`, `T3` |
| `governed_by` | Policy ที่ควบคุม | `[[Policy - Approval Rules]]` |
| `incident_runbook` | Runbook เมื่อเกิดปัญหา | `[[Runbook - Failed Deployment]]` |
| `review_cycle` | รอบการทบทวน | `monthly`, `quarterly` |
| `next_review` | วันที่ต้องทบทวนครั้งถัดไป | `2027-01-04` |
| `tags` | Tags สำหรับ Graph/search | `workflow`, `engineering` |

## YAML Rules

- YAML ต้องอยู่บรรทัดแรกของไฟล์
- เริ่มและจบด้วย `---`
- ใช้ spaces 2 ตัวสำหรับ list indentation
- ห้ามใช้ tab ใน YAML
- ใช้วันที่รูปแบบ `YYYY-MM-DD`
- ใช้ list สำหรับค่าหลายค่า
- ใช้ `[]` สำหรับ list ว่าง
- ใส่ wikilink ในเครื่องหมาย quote

ตัวอย่าง:

```yaml
primary_moc: "[[MOC - Workflows]]"

secondary_mocs:
  - "[[MOC - Engineering]]"
  - "[[MOC - GitHub]]"

tags:
  - workflow
  - engineering
```

## Obsidian Sync Setup

### Before Setup

- สำรอง Vault ก่อนเริ่ม Sync
- เลือกอุปกรณ์หลักหนึ่งเครื่องเป็น source of truth
- ใช้ Vault ที่ข้อมูลครบที่สุดเป็นเครื่องแรก
- เตรียมเก็บ encryption password ใน password manager
- อย่าสร้าง remote vault หลายอันสำหรับ Vault เดียวกัน

### Setup First Device

1. เปิด Vault หลักใน Obsidian
2. ไปที่ `Settings → Core plugins`
3. เปิดใช้งาน `Sync`
4. ไปที่ `Settings → Sync`
5. Sign in ด้วย [[Obsidian account]]
6. เลือก `Create new remote vault`
7. ตั้งชื่อ remote vault
8. เลือก server region ที่ใกล้ที่สุด
9. เปิดใช้ End-to-End Encryption
10. ตั้งและบันทึก encryption password
11. กด Connect
12. รอให้ upload ทั้งหมดเสร็จ

### Setup Second Device

1. ติดตั้งและเปิด Obsidian
2. Sign in ด้วย [[Obsidian account]] เดียวกัน
3. เปิด `Settings → Core plugins → Sync`
4. ไปที่ `Settings → Sync`
5. เลือก remote vault เดิม
6. กรอก encryption password
7. เลือก folder ว่างหรือ folder ใหม่สำหรับ local vault
8. รอให้ download ทั้งหมดเสร็จก่อนเริ่มแก้ไข

### Recommended Sync Settings

```text
Sync on all devices

✓ Markdown notes
✓ Attachments
✓ Templates
✓ CSS snippets
✓ Core plugin settings
✓ Community plugins หลังจากทดสอบแล้ว
✓ Community plugin settings หลังจากทดสอบแล้ว

Keep local per device

✗ Workspace layout
✗ Open files / open tabs
✗ Device-specific interface settings
✗ Mobile-specific appearance settings
```

### Sync Best Practices

- รอให้ Sync เสร็จก่อนเปลี่ยนอุปกรณ์
- หลีกเลี่ยงการแก้ไข note เดียวกันพร้อมกันหลายอุปกรณ์
- แก้ไข MOC หรือ template หลักจากอุปกรณ์หลักเพียงเครื่องเดียว
- ตรวจสอบ conflict file ทันทีเมื่อ Sync แจ้งเตือน
- เก็บ backup แยกจาก Obsidian Sync เสมอ
- ทำ backup ก่อน rename, move folder หรือ bulk edit
- ทดสอบ plugin บนทุกอุปกรณ์ก่อนพึ่งพาในการทำงานจริง
- ใช้ folder ว่างเมื่อเชื่อมอุปกรณ์ใหม่ครั้งแรก

## Graph View Setup

### Node Size

1. เปิด `Global Graph`
2. กดไอคอนรูปเฟือง
3. ไปที่ส่วน `Display`
4. ปรับ slider `Node size`

> [!note]
> Node ที่มี backlinks มาก เช่น `MOC - Home` และ `MOC - Workflows`
> จะมีขนาดใหญ่ขึ้นโดยอัตโนมัติ
>
> Obsidian Graph แบบมาตรฐานไม่รองรับการกำหนดขนาดเฉพาะราย node ผ่าน YAML

### Recommended Graph Colors

| Note Type | Query | Color |
|---|---|---|
| MOC | `tag:moc` | Blue |
| Workflow | `tag:workflow` | Purple |
| Project | `tag:project` | Orange |
| Task | `tag:task` | Yellow |
| Policy | `tag:policy` | Red |
| Learning | `tag:learning` | Green |
| Runbook / Checklist | `tag:runbook OR tag:checklist` | Teal |

### Create Node Color Groups

1. เปิด `Global Graph`
2. กดไอคอนรูปเฟือง
3. เปิดส่วน `Groups`
4. กด `New group`
5. ใส่ query
6. เลือกสีจากวงกลมสี
7. ทำซ้ำสำหรับแต่ละ note type

### Recommended Group Queries

```text
tag:moc
```

```text
tag:workflow
```

```text
tag:project
```

```text
tag:task
```

```text
tag:policy
```

```text
tag:learning
```

```text
tag:runbook OR tag:checklist
```

### Property-Based Graph Queries

หากทุกโน้ตใช้ YAML `type` สม่ำเสมอ สามารถใช้:

```text
type:moc
```

```text
type:workflow
```

```text
type:project
```

```text
type:task
```

```text
type:learning
```

ตัวอย่าง filter สำหรับดู workflow ทั้งหมด:

```text
path:"07-workflows"
```

ตัวอย่าง filter สำหรับซ่อนไฟล์ระบบและ attachments:

```text
-path:.obsidian -file:*.png -file:*.jpg -file:*.jpeg -file:*.pdf
```

## Dataview Queries

### Active Workflows

```dataview
TABLE
  domain AS Domain,
  category AS Category,
  risk AS Risk,
  status AS Status,
  owner AS Owner,
  next_review AS "Next Review"
FROM "07-workflows"
WHERE type = "workflow"
  AND status = "active"
SORT domain ASC, category ASC, file.name ASC
```

### High-Risk Workflows

```dataview
TABLE
  domain AS Domain,
  approval_tier AS Approval,
  owner AS Owner,
  next_review AS "Next Review"
FROM "07-workflows"
WHERE type = "workflow"
  AND (risk = "high" OR risk = "critical")
SORT next_review ASC, file.name ASC
```

### Workflows Requiring Approval

```dataview
TABLE
  domain AS Domain,
  risk AS Risk,
  approval_tier AS Approval,
  governed_by AS Policy
FROM "07-workflows"
WHERE type = "workflow"
  AND approval_required = true
SORT risk DESC, file.name ASC
```

### Supporting Notes for Current Workflow

```dataview
LIST
FROM ""
WHERE parent_workflow = this.file.link
  AND status = "active"
SORT type ASC, file.name ASC
```

### Notes Needing Review

```dataview
TABLE
  type AS Type,
  status AS Status,
  next_review AS "Next Review"
FROM ""
WHERE next_review
  AND next_review <= date(today)
  AND status = "active"
SORT next_review ASC
```

## Task YAML Example

```yaml
***
id: task-review-api-pr-142
title: Review API Pull Request 142

type: task
status: in-progress
priority: high

parent_moc: "[[MOC - Tasks]]"
primary_moc: "[[MOC - Tasks]]"

uses_workflow: "[[Workflow - Pull Request Review]]"

owner: self
assignee:
due: 2026-10-06
started: 2026-10-04
completed:

related:
  - "[[MOC - Engineering]]"
  - "[[MOC - GitHub]]"

tags:
  - task
  - engineering
  - github
  - pull-request
***
```

## Project YAML Example

```yaml
***
id: project-html5-canvas-game
title: HTML5 Canvas Game
aliases:
  - Canvas Game Project

type: project
domain: engineering
category: frontend
status: active

primary_moc: "[[MOC - Engineering]]"

secondary_mocs:
  - "[[MOC - Learning]]"
  - "[[MOC - Workflows]]"

owner: self
priority: medium

started: 2026-10-04
target_date: 2026-11-15
completed:

technologies:
  - html
  - css
  - javascript
  - html5-canvas

uses_workflows:
  - "[[Workflow - Pull Request Review]]"
  - "[[Workflow - Build and Test Validation]]"

tags:
  - project
  - frontend
  - javascript
  - canvas
  - game-development
***
```

## Learning Note YAML Example

```yaml
***
id: learning-basic-html5-canvas-games
title: Basic HTML5 Canvas Games
aliases:
  - HTML5 Canvas Game Basics
  - Canvas Game Development

type: learning
domain: web-development
category: frontend
subcategory: html5-canvas
status: active

learning_status: studying
difficulty: beginner
mastery: 1
confidence: medium

primary_moc: "[[MOC - Learning]]"

secondary_mocs:
  - "[[MOC - Engineering]]"

author: Ben Centra
source_type: article
source_title: Basic HTML5 Canvas Games
source_url:
published_at: 2017-07-11

started_at: 2026-10-04
last_studied: 2026-10-04
next_review: 2026-10-11

tags:
  - learning
  - web-development
  - frontend
  - javascript
  - canvas
  - game-development
***
```

## AGENTS.md Rules

```markdown
# AGENTS.md

## MOC Hierarchy Rules

- Every active MOC MUST define one `primary_moc`, except `MOC - Home`.
- Every top-level operational MOC MUST use:
  `primary_moc: "[[MOC - Home]]"`.
- Every active MOC MUST be visibly linked from its parent MOC.
- Use `secondary_mocs` only for meaningful cross-domain navigation.
- Before creating a new MOC, check whether an existing MOC can contain the topic.

## Workflow Child Note Rules

- Every active workflow MUST define:
  `parent_moc: "[[MOC - Workflows]]"`
  and
  `primary_moc: "[[MOC - Workflows]]"`.

- Supporting notes MUST use:
  `parent_workflow: "[[Workflow - Name]]"`.

- Use `parent_workflow` only for notes that exist specifically to support one workflow:
  checklist, template, reference, validation query, or example.

- Every workflow MUST link visibly back to its parent MOC.
- Every supporting note MUST link visibly back to its parent workflow.
- Do not duplicate workflow steps across multiple notes.
- Link shared content instead of copying it.
- Do not use draft, deprecated, or archived notes as active guidance.

## Sync Rules

- The primary desktop vault is the source of truth for initial setup and major restructuring.
- Wait for Sync to complete before switching devices.
- Use a new or empty local folder when connecting a new device.
- Keep workspace layout and open-tab state device-local.
- Back up the vault before mass renames, folder moves, MOC restructuring, or plugin changes.
- Resolve Sync conflicts immediately.
- Do not use Obsidian Sync as the only backup system.

## Naming Rules

- MOCs use: `MOC - Name`
- Workflows use: `Workflow - Name`
- Checklists use: `Checklist - Name`
- Runbooks use: `Runbook - Name`
- Policies use: `Policy - Name`
- Projects use: `Project - Name`
- Templates use: `Template - Name`
- Learning notes use descriptive titles without unnecessary prefixes.
```

## Quick Start Checklist

- [ ] สร้าง folders ตาม Recommended Folder Structure
- [ ] สร้าง `MOC - Home`
- [ ] สร้าง `MOC - Workflows`
- [ ] เพิ่ม `[[MOC - Workflows]]` ใน `MOC - Home`
- [ ] ติดตั้งและเปิดใช้ Dataview
- [ ] สร้าง `Template - Workflow`
- [ ] สร้าง workflow แรก เช่น `Workflow - Pull Request Review`
- [ ] เพิ่ม `parent_moc: "[[MOC - Workflows]]"` ในทุก workflow
- [ ] ตั้งค่า Graph Groups ตาม type/tag
- [ ] ตั้งค่า Obsidian Sync จากอุปกรณ์หลัก
- [ ] ทำ backup ก่อนเชื่อมอุปกรณ์อื่น
- [ ] เชื่อมอุปกรณ์ใหม่ด้วย folder ว่าง
- [ ] เพิ่มกฎใน `AGENTS.md`

## Operating Principle

```text
MOC ทำหน้าที่นำทาง
YAML ทำหน้าที่จัดระเบียบข้อมูล
Wikilinks ทำหน้าที่เชื่อมความรู้
Dataview ทำหน้าที่สร้างรายการอัตโนมัติ
Graph ทำหน้าที่มองเห็นความสัมพันธ์
Sync ทำหน้าที่เชื่อม Vault ข้ามอุปกรณ์
Backup ทำหน้าที่ป้องกันข้อมูลสูญหาย
```

> [!success]
> โครงสร้างที่ดีไม่ใช่โครงสร้างที่ละเอียดที่สุด
> แต่เป็นโครงสร้างที่ค้นหาได้ง่าย ดูแลได้ง่าย
> และยังทำงานได้ดีเมื่อจำนวนโน้ตเพิ่มขึ้น
```

📖 GitHub CodeQL Alerts ผ่าน REST API — คู่มือฉบับสมบูรณ์
 
Related: [[CodeQL and Claude]], [[GitHub REST API]]
Last Updated: 2026-10-02
 
 
 
🎯 ภาพรวม
 
คู่มือนี้อธิบายวิธี ดึงข้อมูล ส่งออก และจัดการ CodeQL alerts จาก GitHub โดยใช้ GitHub CLI ( gh api ) และ REST API โดยตรง เหมาะสำหรับ:
 
- รายงานความปลอดภัยอัตโนมัติ
- ส่งออกข้อมูลไปวิเคราะห์ต่อ (Excel, BI)
- บูรณาการเข้ากับระบบ DevSecOps
 
 
 
🔑 ข้อกำหนดเบื้องต้น
 
สิ่งที่ต้องมี
 
- ✅ GitHub CLI ติดตั้งและล็อกอินแล้ว ( gh auth status )
- ✅ GitHub Advanced Security (GHAS) เปิดใช้งานที่ repository
- ✅ สิทธิ์:  repo:security_events  หรือ  write  ใน repo
- ✅ CodeQL Analysis ทำงานแล้วใน repo
 
ตรวจสอบสิทธิ์
 
bash
  
gh auth status
# ต้องเห็น: ✓ Logged in to github.com as YOUR_USERNAME
 
 
 
 
📡 Endpoint หลักที่ใช้
 
การทำงาน Endpoint 
ดึงรายการทั้งหมด  GET /repos/{owner}/{repo}/code-scanning/alerts  
ดึงรายละเอียดรายการ  GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}  
อัปเดตสถานะ  PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}  
ดึงรายการ analysis  GET /repos/{owner}/{repo}/code-scanning/analyses  
ดึง SARIF ผลลัพธ์  GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}  
 
เอกสารทางการ: REST API endpoints for code scanning 
 
 
 
🚀 คำสั่งพื้นฐาน —  gh api 
 
1. ดึงรายการ Alerts ทั้งหมด
 
bash
  
# รูปแบบทั่วไป
gh api repos/{เจ้าของ}/{ชื่อ-repo}/code-scanning/alerts

# ตัวอย่างจริง
gh api repos/acme/backend-api/code-scanning/alerts
 
 
2. กรองตามเงื่อนไข
 
bash
  
# เฉพาะ alerts ที่ยังเปิดอยู่
gh api repos/acme/backend-api/code-scanning/alerts \
  -f state=open

# เฉพาะระดับความรุนแรงสูงขึ้น
gh api repos/acme/backend-api/code-scanning/alerts \
  -f state=open \
  -f severity=critical,high

# เฉพาะผลจาก CodeQL เท่านั้น + เรียงล่าสุดก่อน
gh api repos/acme/backend-api/code-scanning/alerts \
  -f tool_name=CodeQL \
  -f sort=updated \
  -f direction=desc

# เฉพาะ branch ที่ระบุ
gh api repos/acme/backend-api/code-scanning/alerts \
  -f ref=refs/heads/main
 
 
3. ดึงรายละเอียด Alert รายการ
 
bash
  
# ดูข้อมูลเต็มของ alert หมายเลข 42
gh api repos/acme/backend-api/code-scanning/alerts/42
 
 
4. อัปเดตสถานะ — ปิด/ยกเลิก
 
bash
  
# ปิดว่าแก้ไขแล้ว
gh api repos/acme/backend-api/code-scanning/alerts/42 \
  -X PATCH \
  -f state=fixed

# ยกเลิกว่าไม่เกี่ยวข้อง
gh api repos/acme/backend-api/code-scanning/alerts/42 \
  -X PATCH \
  -f state=dismissed \
  -f dismissed_reason="false positive" \
  -f dismissed_comment="ตรวจสอบแล้ว ไม่เป็นอันตราย — ความเหตุผลที่นี่"
 
 
5. ดึงประวัติ Analysis
 
bash
  
gh api repos/acme/backend-api/code-scanning/analyses \
  -f tool_name=CodeQL \
  -f per_page=10
 
 
 
 
📂 ส่งออกข้อมูล — JSON / CSV
 
ส่งออกเป็น JSON
 
bash
  
# บันทึกลงไฟล์
gh api repos/acme/backend-api/code-scanning/alerts \
  -f state=open \
  > codeql-alerts-$(date +%Y%m%d).json

# ดูสรุปด้วย jq
cat codeql-alerts-*.json | jq '.[] | {number, state, severity, rule:.rule.name}'
 
 
ส่งออกเป็น CSV (พร้อมแปลงฟิลด์)
 
bash
  
#!/usr/bin/env bash
# export-codeql-alerts.sh

OWNER="acme"
REPO="backend-api"
OUTPUT="codeql-alerts-$(date +%Y%m%d).csv"

echo "Number,Severity,State,Rule,File,Line,URL" > "$OUTPUT"

gh api repos/$OWNER/$REPO/code-scanning/alerts \
  --paginate \
  -f per_page=100 \
  | jq -r '.[] | [
    .number,
    .severity,
    .state,
    .rule.name,
    .most_recent_instance.location.file,
    .most_recent_instance.location.start_line,
    .html_url
  ] | @csv' >> "$OUTPUT"

echo "✅ ส่งออกเสร็จสิ้น: $OUTPUT"
 
 
bash
  
# รันสคริปต์
chmod +x export-codeql-alerts.sh
./export-codeql-alerts.sh
 
 
ตัวอย่างผลลัพธ์ CSV
 
csv
  
Number,Severity,State,Rule,File,Line,URL
42,high,open,sql-injection,src/db/query.js,127,https://github.com/acme/backend-api/security/code-scanning/42
15,medium,open,unchecked-send,src/server/response.js,89,https://github.com/acme/backend-api/security/code-scanning/15
 
 
 
 
🔄 จัดการหน้า (Pagination)
 
เมื่อมีข้อมูลมากกว่า 30 รายการ:
 
bash
  
# วิธีที่ 1 — ให้ gh api จัดการเองด้วย --paginate
gh api repos/acme/backend-api/code-scanning/alerts \
  --paginate \
  -f per_page=100

# วิธีที่ 2 — แบ่งหน้าด้วยตัวเอง
for page in {1..5}; do
  echo "📄 ดึงหน้าที่ $page"
  gh api repos/acme/backend-api/code-scanning/alerts \
    -f page=$page \
    -f per_page=100
done
 
 
 
 
📊 ฟิลด์สำคัญใน Response
 
ฟิลด์ ความหมาย 
 number  หมายเลขอ้างอิง Alert 
 state   open  /  closed  /  dismissed  /  fixed  
 severity   critical  /  high  /  medium  /  low  /  warning  /  note  /  error [__LINK_ICON] 
 rule.name  ชื่อกฎที่ตรวจพบ 
 rule.description  คำอธิบายปัญหา 
 most_recent_instance.location  ตำแหน่งไฟล์และบรรทัด 
 html_url  ลิงก์ไปหน้า GitHub โดยตรง 
 tool.name  ชื่อเครื่องมือ ( CodeQL  หรืออื่นๆ) 
 created_at  /  updated_at  เวลาที่ตรวจพบ/แก้ไขล่าสุด 
 
 
 
⚠️ ข้อควรระวัง & ขีดจำกัด
 
รายการ ค่าขีดจำกัด 
Rate Limit (PAT) 5,000 ครั้ง/ชม. 
Rate Limit (GitHub App) 15,000 ครั้ง/ชม. 
จำนวนต่อหน้า สูงสุด 100 รายการ/หน้า 
ต้องเปิด GHAS repo ต้องเปิดใช้งาน GitHub Advanced Security ก่อนถึงจะเข้าถึงได้[__LINK_ICON] 
สิทธิ์ขั้นต่ำ  security_events:read  
 
ตรวจสอบ Rate Limit
 
bash
  
gh api rate_limit
 
 
 
 
🤖 นำไปใช้ใน CI/CD (GitHub Actions)
 
yaml
  
name: Export CodeQL Alerts
on:
  schedule:
    - cron: '0 9 * * 1'  # ทุกวันจันทร์ 9 โมงเช้า
  workflow_dispatch:      # สามารถสั่งรันด้วยตนเองได้

jobs:
  export:
    runs-on: ubuntu-latest
    permissions:
      security-events: read
    steps:
      - uses: actions/checkout@v4
      
      - name: ดึงข้อมูลและส่งออก
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # ติดตั้ง GitHub CLI
          sudo apt install gh
          
          # ส่งออกเป็น JSON
          gh api repos/${{ github.repository }}/code-scanning/alerts \
            --paginate \
            -f state=open \
            -f per_page=100 \
            > codeql-alerts-latest.json
          
          # แปลงเป็น CSV
          echo "Number,Severity,Rule,File,URL" > report.csv
          cat codeql-alerts-latest.json | jq -r '.[] | [
            .number,.severity,.rule.name,
            .most_recent_instance.location.file,.html_url
          ] | @csv' >> report.csv
          
      - name: อัปโหลดไฟล์รายงาน
        uses: actions/upload-artifact@v4
        with:
          name: codeql-report
          path: |
            codeql-alerts-latest.json
            report.csv
 
 
 
 
📋 คู่มือฉบับย่อ — Cheat Sheet
 
สิ่งที่ต้องการ คำสั่ง 
ดูทั้งหมด  gh api repos/OWNER/REPO/code-scanning/alerts  
ดูเฉพาะที่เปิด  -f state=open  
ดูเฉพาะ CodeQL  -f tool_name=CodeQL  
ดูระดับสูง  -f severity=critical,high  
ดูรายละเอียด  gh api repos/OWNER/REPO/code-scanning/alerts/42  
ปิด alert  -X PATCH -f state=fixed  
ยกเลิก alert  -X PATCH -f state=dismissed -f dismissed_reason="..."  
ส่งออก JSON  > alerts.json  
ส่งออก CSV  | jq -r ... > alerts.csv  
ดึงทุกหน้า  --paginate  
 
 
 
🔗 อ้างอิง
 
- REST API — Code Scanning (ทางการ) 
- CodeQL Documentation
- GitHub CLI —  gh api  Reference
 
 
 
ต้องการเพิ่มส่วนไหนหรือปรับแต่งสคริปต์ให้ตรงกับรูปแบบรายงานของทีมบอกได้เลยครับ 🙏

---
aliases:
  - ZyntroAI Mobile Python
tags:
  - 00-Control
  - 02-Skills
  - 03-Tasks
  - 04-Policies
  - 05-Runtime
  - 06-Validation
created:
source: DeepWiki
related:
  - "[[Obsidian Aliases]]"
---
นี่คือ **Knowledge Base System Architecture & React UI Components** ที่ออกแบบตามมาตรฐาน **Docs-as-Code**, **Diátaxis Framework** และ **C4 Component Model** สำหรับนำไปใช้งานร่วมกับ Next.js 14, Tailwind CSS และ Lucide Icons ครับ

---

### 🏛️ 1. โครงสร้าง Taxonomy และ Metadata (YAML Frontmatter Schema)

โครงสร้างจัดเก็บเอกสารและอนุกรมวิธาน (Taxonomy):

* **Taxonomy:** `concepts` | `howtos` | `runbooks` | `architecture` | `onboarding` | `troubleshooting`

* **Folder Layout:**
```text
kb/
├── architecture/       # High-level System & C4 Diagrams
├── runbooks/           # Incident Response Playbooks
├── howtos/             # Step-by-Step Practical Guides
├── troubleshooting/    # Known Issues & Quick Fixes
├── onboarding/         # New Hire & Developer Setup
└── templates/          # Standard Doc Templates

```



---

### 💻 2. React UI Components สำหรับระบบ Knowledge Base

#### A. `KnowledgeCard.tsx` (การ์ดแสดงผลสรุปเอกสาร)

```tsx
"use client";

import React from "react";
import { 
  BookOpen, 
  Wrench, 
  ShieldAlert, 
  Layers, 
  UserCheck, 
  HelpCircle,
  Clock,
  User,
  ArrowRight
} from "lucide-react";

export interface KnowledgeItem {
  id: string;
  title: string;
  summary: string;
  taxonomy: "concepts" | "howtos" | "runbooks" | "architecture" | "onboarding" | "troubleshooting";
  tags: string[];
  owner: string;
  lastReviewed: string;
  status: "draft" | "review" | "published" | "deprecated";
}

const taxonomyBadgeConfig = {
  concepts: { label: "Concept", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", icon: BookOpen },
  howtos: { label: "How-To", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", icon: Wrench },
  runbooks: { label: "Runbook", bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", icon: ShieldAlert },
  architecture: { label: "Architecture", bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", icon: Layers },
  onboarding: { label: "Onboarding", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", icon: UserCheck },
  troubleshooting: { label: "Troubleshooting", bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", icon: HelpCircle },
};

export function KnowledgeCard({ item }: { item: KnowledgeItem }) {
  const badge = taxonomyBadgeConfig[item.taxonomy];
  const IconComponent = badge.icon;

  return (
    <div className="group relative flex flex-col justify-between p-5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/10">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
            <IconComponent className="w-3.5 h-3.5" />
            {badge.label}
          </span>
          {item.status === "review" && (
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              Needs Review
            </span>
          )}
        </div>

        {/* Title & Summary */}
        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
          {item.title}
        </h3>
        <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
          {item.summary}
        </p>
      </div>

      {/* Footer Meta Data */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col gap-3 text-xs text-slate-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300 font-medium">{item.owner}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{item.lastReviewed}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px]">
                #{tag}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

```

---

#### B. `KnowledgeExplorer.tsx` (ส่วนควบคุม ค้นหา และกักกรองข้อมูล)

```tsx
"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, Plus, BookOpen, Layers, ShieldAlert, Wrench } from "lucide-react";
import { KnowledgeCard, KnowledgeItem } from "./KnowledgeCard";

const SAMPLE_KB_DATA: KnowledgeItem[] = [
  {
    id: "kb-1",
    title: "FastAPI Async Database Architecture & Redis Cache Strategy",
    summary: "High-level overview of the fail-open Redis caching layer and connection pooling for PostgreSQL.",
    taxonomy: "architecture",
    tags: ["fastapi", "redis", "database"],
    owner: "Backend Team",
    lastReviewed: "2026-09-15",
    status: "published"
  },
  {
    id: "kb-2",
    title: "How-To: Rotate Secrets via HashiCorp Vault in CI/CD Workflow",
    summary: "Step-by-step procedure to rotate deployment keys and update GitHub Action secrets automatically.",
    taxonomy: "howtos",
    tags: ["security", "cicd", "vault"],
    owner: "DevOps",
    lastReviewed: "2026-08-10",
    status: "review"
  },
  {
    id: "kb-3",
    title: "Runbook: Incident Mitigation for Token Rate Limiting Exceeded",
    summary: "Emergency procedures when LLM API costs or token limits hit maximum capacity.",
    taxonomy: "runbooks",
    tags: ["incident", "llm", "cost-saver"],
    owner: "SRE Team",
    lastReviewed: "2026-09-20",
    status: "published"
  }
];

export default function KnowledgeExplorer() {
  const [search, setSearch] = useState("");
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<string>("all");

  const filteredData = useMemo(() => {
    return SAMPLE_KB_DATA.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.summary.toLowerCase().includes(search.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchTaxonomy = selectedTaxonomy === "all" || item.taxonomy === selectedTaxonomy;
      return matchSearch && matchTaxonomy;
    });
  }, [search, selectedTaxonomy]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            Engineering Knowledgebase
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Centralized Docs-as-Code repository for Architecture, Runbooks, and Guidelines
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition">
          <Plus className="w-4 h-4" /> New Document
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title, summary, or [[tag]]..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0">
          {["all", "architecture", "howtos", "runbooks", "concepts", "troubleshooting"].map((tax) => (
            <button
              key={tax}
              onClick={() => setSelectedTaxonomy(tax)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition ${
                selectedTaxonomy === tax
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800"
              }`}
            >
              {tax}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item) => (
          <KnowledgeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

```

---

### ⚙️ 3. สคริปต์อัตโนมัติประจำระบบ (Automated CI & Lifecycle)

สคริปต์ `check_stale_docs.py` สำหรับตรวจสอบเอกสารที่ไม่ได้รีวิวเกิน **90 วัน**:

```python
import os
import yaml
from datetime import datetime, timedelta

DOCS_DIR = "./kb"
STALE_DAYS = 90

def check_stale_documents():
    today = datetime.now()
    stale_docs = []

    for root, _, files in os.walk(DOCS_DIR):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                    if content.startswith("---"):
                        try:
                            parts = content.split("---", 2)
                            metadata = yaml.safe_load(parts[1])
                            last_reviewed = metadata.get("last_reviewed")
                            
                            if last_reviewed:
                                review_date = datetime.strptime(str(last_reviewed), "%Y-%m-%d")
                                if (today - review_date).days > STALE_DAYS:
                                    stale_docs.append((filepath, metadata.get("owner"), last_reviewed))
                        except Exception as e:
                            print(f"Error parsing frontmatter in {filepath}: {e}")

    print(f" Found {len(stale_docs)} stale documents needing review:")
    for doc, owner, date in stale_docs:
        print(f" - [{doc}] Owner: {owner} | Last Reviewed: {date}")

if __name__ == "__main__":
    check_stale_documents()

```
Check out my chat with Copilot.

Self-Healing Agents Project Setup | Shared Copilot Chat
https://m365.cloud.microsoft/chat/share/eyJzaGFyZUlkIjoiYjQwY2QzNjUtZTVhYS00NGNiLTlkMGYtZjNiMjJkNzViMTc0IiwiY29udmVyc2F0aW9uSWQiOiJGVURLR1JDMW9tS1B0RXU1OW1QU2UifQ%3D%3D
Frontend:
  - Next.js
  - React
  - TypeScript
  - Tailwind

Backend:
  - FastAPI
  - GraphQL
  - MCP Gateway

Database:
  - SQL Server
  - Supabase PostgreSQL
  - Redis
  - pgvector

CI/CD:
  - GitHub Actions
  - Vercel

Monitoring:
  - Datadog
  - OpenTelemetry

AI:
  - GitHub Copilot
  - Cursor
  - MCP
  - Self-Healing Agents

Deployment:
  - Blue Green
  - Auto Rollback
  - Health Checks

Assuming you mean a FastAPI-backed chat plugin (embeddable widget plus WebSocket/SSE backend), these are the practices that matter most:
Architecture (app/ vs services/)
app/api/ws.py and app/api/chat.py hold thin transport handlers only; no business logic.
services/chat_service.py holds the LLM calls, history, and moderation, and is transport-agnostic so REST, WS, and SSE can all reuse it.
Use a ConnectionManager class for rooms and sessions, injected via Depends.
Transport
Use SSE for LLM token streaming (simpler, proxy-friendly). Use WebSocket only for true bidirectional needs (typing, presence).
Define typed message envelopes with Pydantic (type, id, session_id, payload) and version them (v1).
Add heartbeat/ping, reconnect with backoff, and idempotent message IDs so retries don't duplicate.
Async and performance
Keep everything async; wrap blocking SDK calls with run_in_threadpool.
Use httpx.AsyncClient as a shared lifespan-managed singleton.
Apply backpressure: bounded asyncio.Queue per connection and a max message size.
Handle client disconnects (WebSocketDisconnect, CancelledError) and cancel upstream LLM streams so you don't burn tokens.
State and scaling
Never keep session state in process memory. Use Redis for history and rate limits, and Redis pub/sub for multi-pod fan-out (required on Kubernetes).
Cap history with a sliding window or summarization to control token cost.
Security
Authenticate on the WS handshake (short-lived token, not a query-string API key).
Validate the Origin header and set strict CORS for the embed domain.
Rate limit per user and IP, sanitize output (XSS in the widget), and add prompt-injection and PII guards in the service layer.
Plugin and widget side
Make it config-driven (data-* attributes or an init object) rather than hardcoded.
Isolate styles with Shadow DOM or an iframe, and keep the bundle small.
Add accessibility basics: ARIA live region, keyboard support, 44px touch targets.
Observability
Add structured logs with a correlation ID per session and metrics for latency, time-to-first-token, and error rate.
Provide /health and /ready endpoints and use graceful shutdown to drain connections.
Testing
Test with TestClient.websocket_connect, mock the LLM provider, and run load tests for concurrent connections.
What next?
Audit your existing app/ and services/ for these issues
Scaffold the ConnectionManager + SSE streaming endpoint
Design the Redis-backed session/history layer
Build the embeddable widget (React, bilingual TH/EN)
Audit your existing app/ and services/ for these issues
Scaffold the ConnectionManager + SSE streaming endpoint
Design the Redis-backed session/history layer
Build the embeddable widget (React, bilingual TH/EN)

Advanced Developer

# Advanced Developer

สำหรับ Obsidian plugin ระดับ advanced ให้คิดว่า plugin เป็น application ขนาดเล็กที่มี lifecycle, state, UI surfaces, data indexes และ write-safety boundaries ของตัวเอง—not just a collection of commands. จุดสำคัญคือการควบคุม lifecycle ให้ถูกต้อง, ทำ UI แบบ reactive แต่ประหยัดทรัพยากร, และแยก editor extension ออกจาก vault-level logic อย่างชัดเจน.[1][2][3][4]

## Architecture

```text
Plugin
│
├── Domain services
│   ├── Vault queries
│   ├── Metadata indexes
│   ├── Validation
│   ├── Safe write operations
│   └── External-service client
│
├── Application layer
│   ├── Commands
│   ├── Event coordination
│   ├── State management
│   └── Background refresh
│
├── UI layer
│   ├── Settings tab
│   ├── Modals
│   ├── ItemView dashboards
│   ├── Status bar
│   └── Editor decorations/widgets
│
└── Infrastructure
    ├── Persistent settings
    ├── In-memory indexes
    ├── Logging
    └── Cleanup / lifecycle handling
```

A maintainable structure:

```text
src/
├── core/
│   ├── types.ts
│   ├── settings.ts
│   ├── logger.ts
│   ├── result.ts
│   └── validation.ts
├── services/
│   ├── note-index.ts
│   ├── metadata-query-service.ts
│   ├── vault-write-service.ts
│   └── agent-service.ts
├── commands/
│   └── register-commands.ts
├── views/
│   ├── dashboard-view.ts
│   └── inspector-view.ts
├── modals/
│   ├── confirm-modal.ts
│   └── diff-preview-modal.ts
├── editor/
│   ├── decorations.ts
│   ├── state-fields.ts
│   └── view-plugin.ts
└── ui/
    ├── renderers.ts
    └── components.ts
```

## Lifecycle management

ใช้ `registerEvent()`, `registerDomEvent()`, `registerInterval()` และ `register()` สำหรับทุก resource ที่มี lifecycle เพื่อให้ Obsidian cleanup เมื่อ plugin หรือ view ถูก unload. `Component`/`ItemView` รองรับ registration methods เหล่านี้โดยตรง.[2][3][4][5]

```ts
import {
  Notice,
  Plugin,
  TFile
} from 'obsidian';

export default class AdvancedPlugin extends Plugin {
  async onload(): Promise<void> {
    this.registerEvent(
      this.app.vault.on('modify', (file) => {
        if (file instanceof TFile && file.extension === 'md') {
          this.handleMarkdownChange(file);
        }
      })
    );

    this.registerInterval(
      window.setInterval(() => {
        this.refreshIfNeeded();
      }, 60_000)
    );

    this.app.workspace.onLayoutReady(() => {
      this.initializeWorkspaceFeatures();
    });
  }

  private handleMarkdownChange(file: TFile): void {
    console.debug('Modified:', file.path);
  }

  private refreshIfNeeded(): void {
    // Keep this lightweight.
  }

  private initializeWorkspaceFeatures(): void {
    new Notice('Workspace features ready.');
  }
}
```

### Avoid unmanaged listeners

```ts
// Avoid: listener may survive unload if not detached manually.
window.addEventListener('resize', this.handleResize);
```

```ts
// Prefer: auto-detached with plugin/view lifecycle.
this.registerDomEvent(
  window,
  'resize',
  this.handleResize.bind(this)
);
```

### Use cancellation for async UI work

เมื่อ user เปลี่ยน note, ปิด modal หรือ unload view ขณะ request ยังทำงานอยู่ ต้องป้องกัน stale response เขียนทับ UI ที่ใหม่กว่า

```ts
class RequestController {
  private currentRequestId = 0;

  async runLatest<T>(
    operation: () => Promise<T>
  ): Promise<T | null> {
    const requestId = ++this.currentRequestId;

    const result = await operation();

    if (requestId !== this.currentRequestId) {
      return null;
    }

    return result;
  }

  cancelPending(): void {
    this.currentRequestId++;
  }
}
```

```ts
class SearchViewController {
  private readonly requests = new RequestController();

  async search(query: string): Promise<void> {
    const result = await this.requests.runLatest(async () => {
      return this.performSearch(query);
    });

    if (!result) {
      return;
    }

    this.renderResults(result);
  }

  onunload(): void {
    this.requests.cancelPending();
  }

  private async performSearch(query: string): Promise<string[]> {
    return [query];
  }

  private renderResults(results: string[]): void {
    console.log(results);
  }
}
```

## Custom views

ใช้ `ItemView` สำหรับ sidebar, dashboard, inspector, review queue, graph panel หรือ agent activity panel ที่ต้องแสดงอยู่ต่อเนื่อง. `ItemView` ผูกกับ `WorkspaceLeaf` และ inherits lifecycle cleanup capabilities จาก `Component`.[3][6][7]

```ts
import {
  ItemView,
  WorkspaceLeaf
} from 'obsidian';

export const REVIEW_QUEUE_VIEW =
  'advanced-review-queue';

export class ReviewQueueView extends ItemView {
  constructor(
    leaf: WorkspaceLeaf,
    private readonly plugin: AdvancedPlugin
  ) {
    super(leaf);
  }

  getViewType(): string {
    return REVIEW_QUEUE_VIEW;
  }

  getDisplayText(): string {
    return 'Review Queue';
  }

  getIcon(): string {
    return 'list-checks';
  }

  async onOpen(): Promise<void> {
    this.registerEvent(
      this.app.metadataCache.on('changed', () => {
        void this.render();
      })
    );

    await this.render();
  }

  async onClose(): Promise<void> {
    this.contentEl.empty();
  }

  async render(): Promise<void> {
    const { contentEl } = this;

    contentEl.empty();
    contentEl.addClass('advanced-review-queue');

    contentEl.createEl('h2', {
      text: 'Notes Needing Review'
    });

    const notes = this.app.vault
      .getMarkdownFiles()
      .filter((file) => {
        const frontmatter = this.app.metadataCache
          .getFileCache(file)
          ?.frontmatter;

        return (
          frontmatter?.status === 'in-review' &&
          frontmatter?.reviewed === false
        );
      })
      .slice(0, 50);

    if (notes.length === 0) {
      contentEl.createEl('p', {
        text: 'No notes need review.',
        cls: 'advanced-muted'
      });

      return;
    }

    const listEl = contentEl.createEl('ul', {
      cls: 'advanced-note-list'
    });

    for (const file of notes) {
      const itemEl = listEl.createEl('li');

      const buttonEl = itemEl.createEl('button', {
        text: file.basename,
        cls: 'advanced-note-button'
      });

      this.registerDomEvent(
        buttonEl,
        'click',
        async () => {
          const leaf = this.app.workspace.getLeaf(false);

          await leaf.openFile(file);
        }
      );

      itemEl.createEl('small', {
        text: file.path,
        cls: 'advanced-muted'
      });
    }
  }
}
```

### Register and activate a view

```ts
async onload(): Promise<void> {
  this.registerView(
    REVIEW_QUEUE_VIEW,
    (leaf) => new ReviewQueueView(leaf, this)
  );

  this.addCommand({
    id: 'open-review-queue',
    name: 'Open review queue',
    callback: async () => {
      await this.activateReviewQueue();
    }
  });
}

async activateReviewQueue(): Promise<void> {
  const existingLeaf = this.app.workspace
    .getLeavesOfType(REVIEW_QUEUE_VIEW)[0];

  const leaf =
    existingLeaf ??
    this.app.workspace.getRightLeaf(false);

  if (!leaf) {
    return;
  }

  await leaf.setViewState({
    type: REVIEW_QUEUE_VIEW,
    active: true
  });

  this.app.workspace.revealLeaf(leaf);
}
```

Avoid relying on `workspace.activeLeaf` without a null check; Obsidian’s API reference explicitly cautions against using it directly.[8]

## Vault indexes

การ scan vault ทุกครั้งที่ user พิมพ์หรือเปิด panel ไม่ scale สำหรับ vault ใหญ่ ให้สร้าง index ใน memory แล้ว update เฉพาะ file ที่เปลี่ยน

```ts
import {
  App,
  TFile
} from 'obsidian';

export interface NoteIndexEntry {
  path: string;
  title: string;
  tags: string[];
  status?: string;
  noteType?: string;
  updated?: string;
}

export class NoteIndex {
  private readonly records = new Map<
    string,
    NoteIndexEntry
  >();

  constructor(private readonly app: App) {}

  rebuild(): void {
    this.records.clear();

    for (const file of this.app.vault.getMarkdownFiles()) {
      this.update(file);
    }
  }

  update(file: TFile): void {
    const frontmatter = this.app.metadataCache
      .getFileCache(file)
      ?.frontmatter ?? {};

    const tags = normalizeStringArray(frontmatter.tags);

    this.records.set(file.path, {
      path: file.path,
      title:
        typeof frontmatter.title === 'string'
          ? frontmatter.title
          : file.basename,
      tags,
      status:
        typeof frontmatter.status === 'string'
          ? frontmatter.status
          : undefined,
      noteType:
        typeof frontmatter.note_type === 'string'
          ? frontmatter.note_type
          : undefined,
      updated:
        typeof frontmatter.updated === 'string'
          ? frontmatter.updated
          : undefined
    });
  }

  remove(path: string): void {
    this.records.delete(path);
  }

  findByTag(tag: string): NoteIndexEntry[] {
    const normalized = tag.replace(/^#/, '')
      .trim()
      .toLowerCase();

    return [...this.records.values()]
      .filter((record) =>
        record.tags.some(
          (item) => item.toLowerCase() === normalized
        )
      );
  }

  findByStatus(status: string): NoteIndexEntry[] {
    return [...this.records.values()]
      .filter(
        (record) => record.status === status
      );
  }
}

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string =>
        typeof item === 'string'
      )
      .map((item) =>
        item.replace(/^#/, '').trim()
      )
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return [value.replace(/^#/, '').trim()]
      .filter(Boolean);
  }

  return [];
}
```

### Lifecycle-aware index updates

```ts
private readonly noteIndex = new NoteIndex(this.app);

async onload(): Promise<void> {
  this.app.workspace.onLayoutReady(() => {
    this.noteIndex.rebuild();
  });

  this.registerEvent(
    this.app.metadataCache.on('changed', (file) => {
      if (file.extension === 'md') {
        this.noteIndex.update(file);
      }
    })
  );

  this.registerEvent(
    this.app.vault.on('delete', (file) => {
      this.noteIndex.remove(file.path);
    })
  );

  this.registerEvent(
    this.app.vault.on('rename', (file, oldPath) => {
      this.noteIndex.remove(oldPath);

      if (file instanceof TFile && file.extension === 'md') {
        this.noteIndex.update(file);
      }
    })
  );
}
```

> [!tip]
> Rebuild index only after metadata becomes available; thereafter use incremental updates. `MetadataCache` is ideal for summaries, while full Markdown reads should happen only on demand.

## Editor extensions

ใช้ `Editor` API สำหรับ action ทั่วไป เช่น read selection, insert text และ replace range. ใช้ CodeMirror 6 เมื่อ feature ต้อง interact กับ editor viewport, decorations, widgets, transactions หรือ custom state. Obsidian documents view plugins as CodeMirror editor extensions that run after the viewport has been recomputed.[9][10][11]

### Editor command

```ts
this.addCommand({
  id: 'convert-selection-to-callout',
  name: 'Convert selection to info callout',
  editorCallback: (editor) => {
    const selected = editor.getSelection().trim();

    if (!selected) {
      return;
    }

    editor.replaceSelection(
      `> [!info]\n> ${selected.replace(/\n/g, '\n> ')}`
    );
  }
});
```

### CodeMirror view plugin lifecycle

```ts
import {
  ViewPlugin,
  ViewUpdate,
  EditorView
} from '@codemirror/view';

class SelectionTracker {
  constructor(
    private readonly view: EditorView
  ) {
    this.reportSelection();
  }

  update(update: ViewUpdate): void {
    if (
      update.selectionSet ||
      update.docChanged
    ) {
      this.reportSelection();
    }
  }

  destroy(): void {
    // Remove external subscriptions or cleanup local state here.
  }

  private reportSelection(): void {
    const selection = this.view.state.selection.main;

    console.debug({
      from: selection.from,
      to: selection.to
    });
  }
}

export const selectionTrackerExtension =
  ViewPlugin.fromClass(SelectionTracker);
```

```ts
this.registerEditorExtension(
  selectionTrackerExtension
);
```

A CodeMirror view plugin typically has `constructor()`, `update()`, and `destroy()` lifecycle methods. It can access the recomputed editor viewport, but should not make changes that affect that viewport from inside the view plugin lifecycle.[10]

### State fields and transactions

ใช้ `StateField` เมื่อ state ต้องอยู่ใน history model ของ editor และควร update ผ่าน transaction

```ts
import {
  StateEffect,
  StateField
} from '@codemirror/state';

interface ReviewState {
  enabled: boolean;
}

const setReviewMode = StateEffect.define<boolean>();

export const reviewModeField =
  StateField.define<ReviewState>({
    create(): ReviewState {
      return {
        enabled: false
      };
    },

    update(value, transaction): ReviewState {
      for (const effect of transaction.effects) {
        if (effect.is(setReviewMode)) {
          return {
            enabled: effect.value
          };
        }
      }

      return value;
    }
  });
```

CodeMirror state is transaction-based so undo/redo and editor changes can be managed consistently; update state through effects and transactions instead of ad hoc mutable global variables.[11]

## Safe concurrent writes

สำหรับ agent workflows หรือ plugin ที่มี async operation นาน ให้ป้องกัน lost updates ด้วย compare-and-write pattern

```ts
import { TFile } from 'obsidian';

async function applyProposal(
  app: App,
  file: TFile,
  expectedContent: string,
  proposedContent: string
): Promise<void> {
  await app.vault.process(file, (current) => {
    if (current !== expectedContent) {
      throw new Error(
        'File changed after the proposal was generated.'
      );
    }

    return proposedContent;
  });
}
```

### Frontmatter updates

```ts
async function updateReviewStatus(
  app: App,
  file: TFile
): Promise<void> {
  await app.fileManager.processFrontMatter(
    file,
    (frontmatter) => {
      frontmatter.status = 'in-review';
      frontmatter.reviewed = false;
      frontmatter.updated = new Date()
        .toISOString()
        .slice(0, 10);
    }
  );
}
```

Recommended write policy:

```text
Read metadata/content
→ Calculate proposal
→ Render diff
→ User confirms
→ Verify target still valid
→ Use Vault.process() / processFrontMatter()
→ Refresh UI/index
→ Record metadata-only audit event
```

## Error handling

ใช้ typed result object สำหรับ domain/service layer เพื่อไม่ให้ UI ต้อง parse arbitrary exception ทุกจุด

```ts
export type Result<T> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      code:
        | 'NOT_FOUND'
        | 'NOT_ALLOWED'
        | 'CONFLICT'
        | 'INVALID_INPUT'
        | 'UNKNOWN';
      message: string;
    };

export function success<T>(value: T): Result<T> {
  return {
    ok: true,
    value
  };
}

export function failure(
  code: Extract<Result<never>, { ok: false }>['code'],
  message: string
): Result<never> {
  return {
    ok: false,
    code,
    message
  };
}
```

```ts
async function getMarkdownFile(
  app: App,
  path: string
): Promise<Result<TFile>> {
  const abstractFile = app.vault.getAbstractFileByPath(path);

  if (!(abstractFile instanceof TFile)) {
    return failure(
      'NOT_FOUND',
      `Markdown file not found: ${path}`
    );
  }

  if (abstractFile.extension !== 'md') {
    return failure(
      'INVALID_INPUT',
      'Target must be a Markdown file.'
    );
  }

  return success(abstractFile);
}
```

UI code:

```ts
const result = await getMarkdownFile(
  this.app,
  requestedPath
);

if (!result.ok) {
  new Notice(result.message);
  return;
}

const file = result.value;
```

## Advanced review checklist

```text
Architecture
[ ] UI code does not directly own complex vault logic
[ ] main.ts registers features but remains thin
[ ] Services have focused responsibilities
[ ] Shared types and validation live outside views

Lifecycle
[ ] Every Obsidian event uses registerEvent()
[ ] Every DOM listener uses registerDomEvent() where applicable
[ ] Timers use registerInterval()
[ ] Async work is cancelable or stale-result safe
[ ] Views clear UI on onClose()

Performance
[ ] No full-vault scan per keystroke
[ ] MetadataCache is used for note summaries
[ ] Expensive scans are scoped, debounced and capped
[ ] Indexes update incrementally
[ ] Editor extensions do not call network or scan vault in update()

Views
[ ] ItemView uses a unique view type
[ ] View refreshes only when relevant data changes
[ ] Rendering uses createEl()/setText(), not innerHTML
[ ] Long lists have limits, pagination or virtualization
[ ] UI works in narrow sidebars and both themes

Writes
[ ] All destructive changes require confirmation
[ ] Proposed changes show a preview/diff
[ ] Content writes use Vault.process()
[ ] Frontmatter writes use processFrontMatter()
[ ] Agent-generated changes default to draft-first
[ ] Conflicts do not overwrite user edits

Security
[ ] No API key or secret in plugin bundle/settings
[ ] Note and AI content are treated as untrusted
[ ] External requests are explicit and disclosed
[ ] Metadata-only logs avoid note bodies and secrets
[ ] Path and scope validation occur before every write
```

## Related notes

- [[Obsidian & Frontend Development]]
- [[Best Practices]]
- [[innerHTML ใน Obsidian Plugins]]
- [[ตัวอย่างโค้ด TypeScript สำหรับเชื่อมต่อ AI Agent กับ Obsidian Plugin API]]
- [[การดึงรายการไฟล์ทั้งหมดที่มีแท็กหรือ Metadata เฉพาะใน Obsidian Vault]]
- [[การดึง Metadata และ Frontmatter ผ่าน Obsidian MetadataCache API]]

การอ้างอิง:
[1] Plugin - Developer Documentation - Obsidian Developer Docs https://docs.obsidian.md/Reference/TypeScript+API/Plugin
[2] EditableFileView - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/EditableFileView
[3] ItemView - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/ItemView
[4] Component - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/Component
[5] registerEvent - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/Component/registerEvent
[6] WorkspaceLeaf - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/WorkspaceLeaf
[7] (constructor) - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/ItemView/(constructor)
[8] Workspace - Developer Documentation - Obsidian Developer Docs https://docs.obsidian.md/Reference/TypeScript+API/Workspace
[9] Editor https://docs.obsidian.md/Plugins/Editor/Editor
[10] View plugins - Developer Documentation https://docs.obsidian.md/Plugins/Editor/View+plugins
[11] State management - Developer Documentation https://docs.obsidian.md/Plugins/Editor/State+management
[12] sitemap.xml https://docs.obsidian.md/sitemap.xml

![[20261003044247.png]]

https://www.meta.ai/share/c/r23Zof29Ip?utm_source=android_meta_ai_sl

https://my.sg.larksuite.com/docx/ZlTgdBPkzouyToxFf5Wl8UG5gMd
