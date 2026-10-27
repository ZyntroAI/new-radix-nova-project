Obsidian YAML Frontmatter -> build dashboard

คุณสามารถใช้ **YAML Frontmatter/Properties** ใน Obsidian เป็น metadata กลาง แล้วสร้าง dashboard แบบอัตโนมัติด้วย **Dataview** หรือ **Obsidian Bases** ได้เลย โดย Dataview index ข้อมูลจาก frontmatter และ inline fields แล้วแสดงเป็น table, list, task view, หรือ report แบบ query ได้[1][2]

## โครงสร้างข้อมูลที่แนะนำ

กำหนด Properties ให้สม่ำเสมอก่อน เพราะ dashboard จะดีได้ก็ต่อเมื่อ field มีมาตรฐานเดียวกัน

```yaml
---
id: vercel-cache-control-and-cache-tags
title: Vercel Cache-Control and Cache Tags
aliases:
  - Vercel CDN Caching
  - Vercel Cache Tags
type: guide
domain: vercel
status: active
owner: engineering
risk: high
priority: P1
review_cycle: quarterly
last_reviewed: 2026-09-30
next_review: 2026-12-30
created: 2026-09-30
updated: 2026-09-30
tags:
  - vercel
  - caching
  - cdn
  - cost-control
related:
  - "[[Approval Rules]]"
  - "[[Vercel Cache Invalidation]]"
---
```

### Properties ขั้นต่ำ

| Property | ตัวอย่าง | ใช้ใน Dashboard |
|---|---|---|
| `title` | `Vercel Cache-Control and Cache Tags` | ชื่อเอกสาร |
| `type` | `policy`, `workflow`, `runbook`, `skill` | แยกประเภทเอกสาร |
| `domain` | `vercel`, `supabase`, `security` | แยกตามระบบ |
| `status` | `draft`, `review`, `active`, `deprecated` | ติดตาม lifecycle |
| `owner` | `engineering`, `security` | หาเอกสารที่ต้องดูแล |
| `risk` | `low`, `medium`, `high`, `critical` | จัดลำดับการ review |
| `priority` | `P0`, `P1`, `P2`, `P3` | งานและเอกสารเร่งด่วน |
| `last_reviewed` | `2026-09-30` | ตรวจ freshness |
| `next_review` | `2026-12-30` | dashboard เอกสารถึงรอบ review |
| `tags` | `[vercel, caching]` | ค้นหาและจัดกลุ่ม |
| `related` | `[[Approval Rules]]` | เชื่อม semantic knowledge |

Obsidian เก็บ note properties ใน YAML frontmatter ที่ต้นไฟล์ และรองรับชนิดข้อมูล เช่น text, list, number, checkbox, date และ date-time ซึ่งเหมาะกับการทำ index และ dashboard[3][4]

## Dashboard หลัก

สร้างไฟล์:

```text
00-mocs/Dashboard - Knowledge Operations.md
```

วางเนื้อหานี้:

```markdown
---
id: dashboard-knowledge-operations
title: Knowledge Operations Dashboard
aliases:
  - Knowledge Dashboard
  - Documentation Dashboard
  - Agent Knowledge Dashboard
type: dashboard
domain: operations
status: active
owner: engineering
tags:
  - dashboard
  - knowledge-management
  - operations
  - ai-agents
---

# Knowledge Operations Dashboard

> [!summary]
> Dashboard สำหรับตรวจสถานะเอกสาร, workflow, policy, runbook และ skill
> ที่ใช้โดยทีมและ AI Agent

[[dashboard]] [[knowledge-management]] [[operations]] [[ai-agents]]

## Quick Navigation

- [[MOC - Document Operations]]
- [[MOC - AI Agent Operations]]
- [[AGENTS]]
- [[TASKS]]
- [[Approval Rules]]
- [[Documentation Standards]]

## Active Knowledge

```dataview
TABLE
  type AS Type,
  domain AS Domain,
  owner AS Owner,
  risk AS Risk,
  last_reviewed AS "Last Reviewed",
  next_review AS "Next Review"
FROM ""
WHERE status = "active"
  AND (
    type = "policy"
    OR type = "workflow"
    OR type = "runbook"
    OR type = "skill"
    OR type = "guide"
  )
SORT risk DESC, next_review ASC, file.name ASC
```

## Documents Needing Review

```dataview
TABLE
  type AS Type,
  domain AS Domain,
  owner AS Owner,
  risk AS Risk,
  last_reviewed AS "Last Reviewed",
  next_review AS "Next Review"
FROM ""
WHERE status = "active"
  AND (
    !last_reviewed
    OR !next_review
    OR next_review <= date(today)
  )
SORT risk DESC, next_review ASC
```

## High-Risk Documents

```dataview
TABLE
  type AS Type,
  domain AS Domain,
  owner AS Owner,
  status AS Status,
  last_reviewed AS "Last Reviewed"
FROM ""
WHERE risk = "high" OR risk = "critical"
SORT status ASC, last_reviewed ASC
```

## Drafts and Reviews

```dataview
TABLE
  type AS Type,
  domain AS Domain,
  owner AS Owner,
  updated AS Updated
FROM ""
WHERE status = "draft" OR status = "review"
SORT updated ASC
```

## Deprecated Documents

```dataview
TABLE
  type AS Type,
  domain AS Domain,
  superseded_by AS "Replaced By",
  updated AS Updated
FROM ""
WHERE status = "deprecated"
SORT updated DESC
```

## Knowledge by Domain

```dataview
TABLE
  length(rows) AS "Document Count"
FROM ""
WHERE status = "active"
GROUP BY domain
SORT length(rows) DESC
```

## Knowledge by Owner

```dataview
TABLE
  length(rows) AS "Document Count"
FROM ""
WHERE status = "active"
GROUP BY owner
SORT length(rows) DESC
```

## Notes Missing Required Metadata

```dataview
TABLE
  file.folder AS Folder,
  type AS Type,
  domain AS Domain,
  status AS Status,
  owner AS Owner,
  risk AS Risk
FROM ""
WHERE file.path != this.file.path
  AND (
    !type
    OR !domain
    OR !status
    OR !owner
    OR !risk
  )
SORT file.folder ASC, file.name ASC
```
```

## Dashboard สำหรับ Agent Skills

สร้างไฟล์:

```text
00-mocs/Dashboard - Agent Skills.md
```

```markdown
---
id: dashboard-agent-skills
title: Agent Skills Dashboard
aliases:
  - Skills Registry
  - AI Skills Dashboard
type: dashboard
domain: ai-agents
status: active
owner: engineering
tags:
  - dashboard
  - skills
  - ai-agents
---

# Agent Skills Dashboard

> [!summary]
> Registry สำหรับตรวจ Skills ที่ active, skills ความเสี่ยงสูง,
> skills ที่ต้อง review และ skills ที่ยังเป็น draft

[[dashboard]] [[skills]] [[ai-agents]]

## Active Skills

```dataview
TABLE
  domain AS Domain,
  owner AS Owner,
  risk AS Risk,
  last_reviewed AS "Last Reviewed",
  next_review AS "Next Review"
FROM "06-skills"
WHERE type = "skill"
  AND status = "active"
SORT risk DESC, domain ASC, file.name ASC
```

## High-Risk Skills

```dataview
TABLE
  domain AS Domain,
  owner AS Owner,
  status AS Status,
  last_reviewed AS "Last Reviewed",
  related AS "Governed By"
FROM "06-skills"
WHERE type = "skill"
  AND (risk = "high" OR risk = "critical")
SORT risk DESC, last_reviewed ASC
```

## Skills Requiring Review

```dataview
TABLE
  domain AS Domain,
  owner AS Owner,
  risk AS Risk,
  next_review AS "Next Review"
FROM "06-skills"
WHERE type = "skill"
  AND status = "active"
  AND (
    !next_review
    OR next_review <= date(today)
  )
SORT risk DESC, next_review ASC
```

## Skills by Domain

```dataview
TABLE
  length(rows) AS "Skills"
FROM "06-skills"
WHERE type = "skill"
  AND status = "active"
GROUP BY domain
SORT length(rows) DESC
```

## Skills Missing Safety Links

```dataview
TABLE
  domain AS Domain,
  risk AS Risk,
  related AS Related
FROM "06-skills"
WHERE type = "skill"
  AND status = "active"
  AND (risk = "high" OR risk = "critical")
  AND !related
SORT risk DESC, file.name ASC
```
```

## Dashboard สำหรับ Tasks

ถ้า task อยู่ใน `TASKS.md` แบบ checkbox ปกติ ใช้ Dataview task query ได้:

```markdown
# Task Dashboard

## P0 Tasks

```dataview
TASK
FROM "TASKS"
WHERE !completed
  AND contains(text, "P0")
```

## Waiting On

```dataview
TASK
FROM "TASKS"
WHERE !completed
  AND contains(text, "Waiting On")
```
```

แต่แนวทางที่ดีกว่าสำหรับ dashboard คือสร้าง task เป็นโน้ตแยกในโฟลเดอร์ `tasks/` เพื่อให้มี YAML properties ที่ query ได้แม่นยำ:

```yaml
---
id: inspect-supabase-schema
title: Inspect Supabase Live Schema
type: task
status: active
priority: P0
owner: fig-agent
domain: supabase
risk: high
due: 2026-10-05
blocked_by: []
related:
  - "[[Supabase Migration Safety]]"
  - "[[TASKS]]"
tags:
  - task
  - supabase
  - schema
---
```

จากนั้นสร้าง Task Dashboard:

```markdown
# Task Dashboard

## P0 — Ready to Work

```dataview
TABLE
  owner AS Owner,
  domain AS Domain,
  due AS Due,
  risk AS Risk,
  blocked_by AS Blocked
FROM "tasks"
WHERE type = "task"
  AND status = "active"
  AND priority = "P0"
  AND (!blocked_by OR length(blocked_by) = 0)
SORT due ASC, risk DESC, file.name ASC
```

## Overdue Tasks

```dataview
TABLE
  priority AS Priority,
  owner AS Owner,
  domain AS Domain,
  due AS Due
FROM "tasks"
WHERE type = "task"
  AND status != "done"
  AND due
  AND due < date(today)
SORT due ASC
```

## Waiting on Approval

```dataview
TABLE
  priority AS Priority,
  owner AS Owner,
  approval_required AS "Approval Required",
  due AS Due
FROM "tasks"
WHERE type = "task"
  AND status = "waiting"
SORT priority ASC, due ASC
```
```

## Obsidian Bases ทางเลือก

Obsidian มี **Bases** ในตัว ซึ่ง query properties จาก frontmatter, file properties และ formula properties ในไฟล์ `.base` ได้ โดยไม่จำเป็นต้องพึ่ง Dataview สำหรับ dashboard แบบ table/card/list พื้นฐาน[4]

ตัวอย่าง concept สำหรับ `Knowledge.base`:

```yaml
filters:
  and:
    - 'status == "active"'
views:
  - type: table
    name: Active Knowledge
    filters:
      and:
        - 'type == "policy" || type == "workflow" || type == "runbook"'
    order:
      - file.name
      - domain
      - owner
      - risk
      - last_reviewed
      - next_review
```

เลือกใช้:

| ความต้องการ | เครื่องมือ |
|---|---|
| Table/list/filter แบบ native และ simple | Obsidian Bases |
| Task queries, grouping, aggregation, advanced reports | Dataview |
| Custom charts, complex logic, computed dashboards | DataviewJS |
| Board/kanban | Kanban plugin หรือ task notes ที่มี status |

## Dataview Best Practices

- ใช้ `FROM "folder"` แทน `FROM ""` เมื่อรู้ขอบเขต เพื่อให้ index และ query เร็วขึ้น
- กำหนด controlled vocabulary ให้ fields เช่น `status`, `risk`, `type`, `domain`
- ใช้ ISO date: `YYYY-MM-DD`
- ใช้ YAML list สำหรับ `tags`, `aliases`, `related`, `blocked_by`
- ใช้ `status: active` ไม่ใช้ `status: Active`, `in-progress`, `doing` ปะปนกัน
- ให้ `id` stable; เปลี่ยน title หรือ path ได้ แต่ `id` ไม่ควรเปลี่ยน
- อย่าใช้ metadata ซ้ำกับ tag โดยไม่จำเป็น: `domain: supabase` คือ structured field; `#supabase` ใช้เพื่อ discovery
- ให้ dashboard query แสดงเฉพาะ properties ที่ใช้ตัดสินใจ ไม่ต้องแสดงทุก field
- ใส่ `!this.file.path` หรือ filter dashboard file เองออก หาก query จาก root
- เก็บ dashboard ไว้ในโฟลเดอร์เดียว เช่น `00-mocs/` หรือ `dashboards/`
- อย่า query raw logs, secrets หรือ transient runtime data จาก Obsidian vault

## แนะนำ Dashboard เริ่มต้น

เริ่มเพียง 4 หน้า:

```text
00-mocs/
├── Dashboard - Knowledge Operations.md
├── Dashboard - Agent Skills.md
├── Dashboard - Tasks.md
└── Dashboard - Security and Approval.md
```

`Dashboard - Security and Approval.md` ควร query:

- เอกสาร `risk: high` และ `risk: critical`
- policy/workflow ที่ไม่มี `owner`
- เอกสารที่ถึงรอบ review
- runbook ที่ยังเป็น draft
- skills ความเสี่ยงสูงที่ไม่ link ไป `[[Approval Rules]]`
- task ที่ `approval_required: true`

ด้วยโครงสร้างนี้ Obsidian vault จะกลายเป็น dashboard แบบ live จาก YAML frontmatter โดยไม่ต้องกรอกตารางหลายที่ซ้ำกัน และ Agent ก็ใช้ Properties เดียวกันเพื่อค้นหา เลือก workflow และตรวจ safety ได้ครับ.

การอ้างอิง:
[1] Dataview - Obsidian Plugin https://community.obsidian.md/plugins/dataview
[2] obsidian-dataview/docs/docs/index.md at master · blacksmithgu ... https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/index.md
[3] How metadata works in Obsidian | MetaEdit https://metaedit.obsidian.guide/concepts/metadata-in-obsidian/
[4] Bases syntax - Obsidian Help https://obsidian.md/help/bases/syntax
[5] Migrate Dataview Properties to Frontmatter - QuickAdd https://quickadd.obsidian.guide/docs/Examples/Macro_MigrateDataviewProperties/
[6] YAML Properties - Obsidian Plugin https://community.obsidian.md/plugins/yaml-properties
[7] Property methods | MetaEdit https://metaedit.obsidian.guide/api/properties/
[8] Changelog https://obsidian.md/changelog/page/12/
[9] DataView - mnml's vault - Obsidian Publish https://publish.obsidian.md/manuel/Wiki/General/Software/DataView
[10] www.obsibrain.com › blog › obsidian-dataviewObsidian Dataview: The Complete Guide to Dynamic Dashboards ... https://www.obsibrain.com/blog/obsidian-dataview-complete-guide
[11] Dataview queries worth having in a developer vault - DEV ... https://dev.to/productivityforge/dataview-queries-worth-having-in-a-developer-vault-59e
[12] Frontmatter - Advanced URI Documentation - Obsidian Publish https://publish.obsidian.md/advanced-uri-doc/Actions/Frontmatter
[13] blacksmithgu/obsidian-dataview: A data index and query ... - GitHub https://github.com/blacksmithgu/obsidian-dataview
[14] Obsidian Properties - Tasks User Guide https://publish.obsidian.md/tasks/Getting+Started/Obsidian+Properties
[15] obsidian_dataview_example_vault/20 Dataview Queries/Frontmatter Overview.md at main · s-blu/obsidian_dataview_example_vault https://github.com/s-blu/obsidian_dataview_example_vault/blob/main/20%20Dataview%20Queries/Frontmatter%20Overview.md
