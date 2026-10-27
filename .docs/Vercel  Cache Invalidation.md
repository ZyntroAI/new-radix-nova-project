ช่วยออกแบบ properties สำหรับ workflow หรือ task ใน vault หน่อยครับ

ได้ครับ ผมแนะนำให้ใช้ schema เดียวกันสำหรับ **Workflow** และ **Task** แต่แยก properties เป็น 3 ชั้น: `identity`, `execution`, และ `governance` เพื่อให้ใช้กับ Obsidian Properties, Bases, Dataview และ AI Agent ได้สม่ำเสมอ

หลักสำคัญคือชื่อ property ต้องคงที่ ใช้ `snake_case` ชุดเดียว ไม่สร้างความหมายซ้ำ เช่น `due`, `due_date`, `deadline` พร้อมกัน เพราะ dashboard และ query จะพังง่ายเมื่อข้อมูลไม่มาตรฐาน[1][2]

## หลักออกแบบ

### แยก Workflow กับ Task

| สิ่ง | ความหมาย | ตัวอย่าง |
|---|---|---|
| **Workflow** | ขั้นตอนทำงานที่นำกลับมาใช้ซ้ำ | “Review Pull Request”, “Supabase Migration” |
| **Task** | งานเฉพาะครั้งที่ต้องทำให้เสร็จ | “Review PR #144”, “Add index to orders table” |
| **Runbook** | ขั้นตอนรับมือเหตุการณ์/ปัญหา | “Fix package-lock conflict”, “Rollback deployment” |
| **Project** | กลุ่มงานที่มีเป้าหมายเดียวกัน | “API Docs Automation” |

Workflow ไม่ควรใช้ `due`, `assignee`, `completed_at` เพราะมันเป็นแม่แบบ กระบวนการไม่ได้ “เสร็จ” แบบ task หนึ่งชิ้น ส่วน task ควร link ไป workflow ที่มันใช้

```text
[[Task - Restore Vercel Deployment]]
          ↓ uses_workflow
[[Workflow - Vercel Deployment Recovery]]
          ↓ governed_by
[[Approval Rules]]
```

## Controlled vocabulary

ให้กำหนดค่ากลางนี้ไว้ใน `[[Obsidian Metadata Standard]]`

```yaml
status:
  workflow:
    - draft
    - review
    - active
    - deprecated
    - archived

  task:
    - inbox
    - planned
    - ready
    - in_progress
    - waiting
    - blocked
    - done
    - cancelled

priority:
  - P0
  - P1
  - P2
  - P3

risk:
  - low
  - medium
  - high
  - critical

approval_tier:
  - T0
  - T1
  - T2
  - T3
  - T4

review_cycle:
  - monthly
  - quarterly
  - semiannual
  - annual
  - event_driven
```

### ความหมายของ task status

| Status | ใช้เมื่อ | Agent ทำงานต่อได้หรือไม่ |
|---|---|---|
| `inbox` | เพิ่งรับเข้ามา ยังไม่ triage | ไม่ควรทำ |
| `planned` | รู้ว่างานคืออะไร แต่ยังไม่พร้อม | ไม่ควรทำ |
| `ready` | scope ชัด ไม่มี blocker | ทำได้ |
| `in_progress` | มีคนหรือ Agent claim แล้ว | เฉพาะ owner ที่ claim |
| `waiting` | รอ approval, ข้อมูล, หรือคนอื่น | ไม่ควรทำ |
| `blocked` | มี dependency หรือปัญหาที่ต้องแก้ก่อน | ไม่ควรทำ |
| `done` | เสร็จและ validate แล้ว | ไม่ทำซ้ำ |
| `cancelled` | ยกเลิกโดยตั้งใจ | ไม่ทำซ้ำ |

## Properties สำหรับ Workflow

วาง workflow ไว้ในโฟลเดอร์ เช่น:

```text
05-workflows/
├── Workflow - Pull Request Review.md
├── Workflow - Supabase Change.md
├── Workflow - Vercel Cache Invalidation.md
└── Workflow - REST API Documentation Sync.md
```

### Template Workflow

```markdown
---
id: workflow-vercel-cache-invalidation
title: Vercel Cache Invalidation
aliases:
  - Vercel CDN Purge Workflow
  - Vercel Cache Refresh
type: workflow
domain: vercel
status: active
owner: engineering
risk: high
approval_tier: T3
review_cycle: quarterly
last_reviewed: 2026-10-04
next_review: 2027-01-04
created: 2026-10-04
updated: 2026-10-04

triggers:
  - public_content_updated
  - api_docs_generated
  - incorrect_public_cache
  - cache_incident

inputs:
  - cache_tag
  - target_environment
  - change_reason

outputs:
  - cache_invalidation_result
  - validation_result
  - audit_record

systems:
  - vercel
  - github

preconditions:
  - target_is_resolved
  - cache_tag_is_allowlisted
  - response_is_public
  - approval_is_valid

approval_required: true
rollback_workflow: "[[Runbook - CDN Cache Incident]]"
governed_by:
  - "[[Approval Rules]]"
  - "[[Vercel Cache-Control and Cache Tags]]"
related:
  - "[[Rate Limiting and Cost Control]]"
  - "[[Vercel Deployment Workflow]]"

tags:
  - workflow
  - vercel
  - caching
  - cdn
  - production
---
```

### Property groups สำหรับ Workflow

| Group | Properties | ใช้ทำอะไร |
|---|---|---|
| Identity | `id`, `title`, `aliases`, `type`, `domain` | ระบุและค้นหา workflow |
| Lifecycle | `status`, `owner`, `created`, `updated`, `last_reviewed`, `next_review` | ควบคุม version และ review |
| Risk | `risk`, `approval_tier`, `approval_required`, `governed_by` | กำหนด guardrail |
| Execution | `triggers`, `inputs`, `outputs`, `preconditions`, `systems` | ให้ Agent เลือกใช้ workflow ถูกจังหวะ |
| Recovery | `rollback_workflow`, `related` | พา Agent ไปยัง runbook เมื่อเกิดปัญหา |
| Discovery | `tags`, `aliases` | รองรับ search และ dashboard |

### เนื้อหา Workflow หลัง Frontmatter

```markdown
# Workflow - Vercel Cache Invalidation

> [!summary]
> ใช้ invalidate cache tag เมื่อ public content เปลี่ยน
> และใช้ delete/purge เฉพาะกรณี stale content ไม่ปลอดภัย

## Trigger

ใช้ workflow นี้เมื่อ:

- Public product, article, API docs หรือ status content เปลี่ยน
- Cron สร้าง REST API documentation สำเร็จ
- พบ cache แสดงข้อมูล public ที่ล้าสมัย
- มี approved incident ที่ต้องล้าง cache

## Preconditions

- ระบุ Vercel project, environment และ cache tag แล้ว
- ยืนยันว่า response เป็น public และ safe-to-share
- Tag อยู่ใน allowlist
- Approval สำหรับ action ที่จะทำยัง valid
- มี rollback หรือ incident path หาก invalidation ผิด scope

## Procedure

1. ตรวจ target, environment และ affected cache tags
2. เลือก `invalidate` สำหรับ update ปกติ
3. เลือก `dangerously-delete` เฉพาะเมื่อ stale content ยอมรับไม่ได้
4. ห้าม full CDN purge หากยังใช้ resource tag ได้
5. Execute เฉพาะ action ที่ได้รับ approval
6. ตรวจ `x-vercel-cache` และเนื้อหาหลัง action
7. บันทึก audit record และอัปเดต task

## Completion Criteria

- [ ] Cache tag ถูก invalidate/delete ตาม scope ที่อนุมัติ
- [ ] Content ใหม่ปรากฏใน endpoint เป้าหมาย
- [ ] ไม่มี sensitive response ถูก shared-cache
- [ ] Audit record ถูกบันทึก
- [ ] Task ถูกอัปเดต
```

## Properties สำหรับ Task

แนะนำให้สร้าง task เป็น note แยกหนึ่งงานต่อหนึ่งไฟล์ แทนเก็บ task สำคัญทั้งหมดใน `TASKS.md` เพราะจะ query, assign, link dependency และทำ dashboard ได้แม่นกว่า YAML frontmatter ใน `TASKS.md` เดียว[3][4]

โครงสร้าง:

```text
tasks/
├── Task - Invalidate API Docs Cache.md
├── Task - Review Vercel Cache Headers.md
├── Task - Inspect Supabase Schema.md
└── Task - Resolve Lockfile Conflict.md
```

### Template Task

```markdown
---
id: task-invalidate-api-docs-cache-20261004
title: Invalidate REST API Documentation Cache
aliases:
  - Refresh API Docs Cache
type: task
domain: vercel
status: ready
priority: P1
risk: high

project: "[[Project - API Documentation Automation]]"
uses_workflow: "[[Workflow - Vercel Cache Invalidation]]"
governed_by:
  - "[[Approval Rules]]"
  - "[[Vercel Cache-Control and Cache Tags]]"

owner: fig-agent
requested_by: user
created: 2026-10-04
updated: 2026-10-04
due: 2026-10-05
scheduled_for: 2026-10-04
started_at:
completed_at:

estimated_minutes: 15
actual_minutes:

approval_required: true
approval_tier: T3
approval_status: not_requested
approval_reference:
approval_expires_at:

environment: production
systems:
  - vercel
  - github

target:
  type: cache_tag
  value: api-docs
  project: example-project

dependencies: []
blocked_by: []
blocks: []

acceptance_criteria:
  - api_docs_cache_invalidated
  - endpoint_returns_latest_docs
  - x_vercel_cache_verified
  - audit_record_created

result_status:
result_summary:
evidence:
  - ""

rollback_workflow: "[[Runbook - CDN Cache Incident]]"
related:
  - "[[REST API Documentation Cron Job]]"
  - "[[Vercel Cache Invalidation]]"

tags:
  - task
  - vercel
  - cache
  - api-docs
  - production
---
```

### Property groups สำหรับ Task

| Group | Properties | เหตุผล |
|---|---|---|
| Identity | `id`, `title`, `aliases`, `type`, `domain` | หาและอ้างถึง task ให้ถูกต้อง |
| Work state | `status`, `priority`, `owner`, `requested_by` | เลือก P0/P1 และป้องกันทำงานซ้ำ |
| Time | `created`, `updated`, `due`, `scheduled_for`, `started_at`, `completed_at` | dashboard งานค้าง งานเลยกำหนด และ cycle time |
| Scope | `project`, `uses_workflow`, `systems`, `environment`, `target` | บอก Agent ว่ากำลังทำอะไรกับระบบใด |
| Dependencies | `dependencies`, `blocked_by`, `blocks` | ป้องกัน Agent หยิบ task ที่ทำไม่ได้ |
| Governance | `risk`, `approval_required`, `approval_tier`, `approval_status`, `approval_reference`, `approval_expires_at` | ทำ approval gate |
| Success | `acceptance_criteria`, `result_status`, `result_summary`, `evidence` | ตรวจว่า “เสร็จ” อย่างมีหลักฐาน |
| Recovery | `rollback_workflow`, `related` | รับมือเมื่อ action ผิดพลาด |
| Estimation | `estimated_minutes`, `actual_minutes` | ปรับ planning และวิเคราะห์ workload |
| Discovery | `tags`, `aliases` | search และ MOC |

## Minimum Task Template

ถ้ายังไม่ต้องการ metadata เยอะ ให้เริ่มเท่านี้ก่อน:

```yaml
---
id: task-short-description-yyyymmdd
title: Clear Task Title
type: task
status: ready
priority: P1
owner: fig-agent
domain: supabase
risk: medium
due: 2026-10-10
uses_workflow: "[[Workflow - Supabase Change]]"
blocked_by: []
approval_required: false
acceptance_criteria:
  - clear_completion_condition
tags:
  - task
---
```

## Optional properties

เพิ่มเฉพาะเมื่อจำเป็น ไม่ต้องใช้ทุก task:

```yaml
recurrence: "0 */12 * * *"
execution_mode: manual
run_id:
parent_task:
child_tasks: []
source:
  type: github_issue
  url: https://github.com/org/repo/issues/123
external_id: "PROJ-123"
cost_limit_usd:
token_budget:
retry_policy: none
max_attempts: 1
idempotency_key:
lock_owner:
lock_expires_at:
```

### ใช้เมื่อใด

| Property | ใช้เมื่อ |
|---|---|
| `recurrence` | งาน recurring เช่น cron/docs sync |
| `execution_mode` | แยก `manual`, `scheduled`, `agent`, `external_trigger` |
| `parent_task`, `child_tasks` | งานใหญ่แตกเป็น subtasks |
| `source`, `external_id` | เชื่อม GitHub, Jira, Asana หรือ Supabase event |
| `cost_limit_usd`, `token_budget` | งานเรียก AI, external API หรือมีค่าใช้จ่าย |
| `retry_policy`, `max_attempts` | งาน automation ที่ retry ได้ |
| `idempotency_key` | webhooks, cron, mutation หรือ action ที่ห้ามซ้ำ |
| `lock_owner`, `lock_expires_at` | หลาย agent/session ทำงานพร้อมกัน |

## Task status transition

กำหนด transition ชัดเจนเพื่อไม่ให้ Agent “ข้ามสถานะ”:

```text
inbox
  → planned
  → ready
  → in_progress
  → done

ready
  → waiting
  → blocked
  → cancelled

waiting / blocked
  → ready

in_progress
  → waiting
  → blocked
  → done
  → cancelled
```

กฎสำคัญ:

```text
- Agent MUST NOT move a task to in_progress until it has checked dependencies,
  scope, environment, and approval status.
- Agent MUST NOT mark a task done until all acceptance_criteria are satisfied.
- A task with approval_required: true MUST NOT move from ready to in_progress
  for a write action until approval_status: approved is valid and unexpired.
- A task with blocked_by entries MUST remain blocked until blockers are resolved.
- Only the current owner may update an in_progress task unless ownership is
  explicitly transferred.
```

## Dashboard query: Ready tasks

### Dataview

```dataview
TABLE
  priority AS Priority,
  owner AS Owner,
  domain AS Domain,
  due AS Due,
  risk AS Risk,
  approval_status AS Approval
FROM "tasks"
WHERE type = "task"
  AND status = "ready"
  AND (!blocked_by OR length(blocked_by) = 0)
SORT priority ASC, due ASC, risk DESC
```

### P0 tasks ready for agent

```dataview
TABLE
  owner AS Owner,
  due AS Due,
  uses_workflow AS Workflow,
  environment AS Environment,
  approval_status AS Approval
FROM "tasks"
WHERE type = "task"
  AND status = "ready"
  AND priority = "P0"
  AND (!blocked_by OR length(blocked_by) = 0)
  AND (
    !approval_required
    OR approval_status = "approved"
  )
SORT due ASC, file.name ASC
```

## Dashboard query: Approval queue

```dataview
TABLE
  priority AS Priority,
  owner AS Owner,
  environment AS Environment,
  approval_tier AS Tier,
  target AS Target,
  due AS Due
FROM "tasks"
WHERE type = "task"
  AND approval_required = true
  AND (
    approval_status = "not_requested"
    OR approval_status = "requested"
    OR approval_status = "expired"
  )
  AND status != "done"
  AND status != "cancelled"
SORT approval_tier DESC, priority ASC, due ASC
```

## Recommended Vault Structure

```text
00-mocs/
├── MOC - Document Operations.md
├── MOC - Workflows.md
├── MOC - Tasks.md
└── Dashboard - Operations.md

05-workflows/
├── Workflow - Pull Request Review.md
├── Workflow - Supabase Change.md
├── Workflow - Vercel Cache Invalidation.md
└── Workflow - REST API Documentation Sync.md

06-runbooks/
├── Runbook - CDN Cache Incident.md
├── Runbook - Lockfile Merge Conflict.md
└── Runbook - Supabase Migration Failure.md

07-projects/
├── Project - API Documentation Automation.md
└── Project - Supabase Reliability.md

08-tasks/
├── active/
├── waiting/
├── done/
└── archived/

09-templates/
├── Template - Workflow.md
├── Template - Task.md
└── Template - Project.md
```

## แนะนำใช้จริง

เริ่มจาก workflow properties ชุดนี้ก่อน:

```yaml
id:
title:
type: workflow
domain:
status: active
owner:
risk:
approval_tier:
triggers: []
preconditions: []
systems: []
governed_by: []
related: []
last_reviewed:
next_review:
tags: []
```

และ task properties ชุดนี้:

```yaml
id:
title:
type: task
status: ready
priority: P1
owner:
domain:
risk:
due:
uses_workflow:
blocked_by: []
approval_required: false
acceptance_criteria: []
tags:
  - task
```

จากนั้นค่อยเพิ่ม `target`, `environment`, `approval_status`, `dependencies`, `evidence`, `idempotency_key` และ `lock_owner` สำหรับงานที่เกี่ยวข้องกับ production, external systems, cron หรือหลาย Agent พร้อมกัน

การใช้ frontmatter เป็น data model ก่อน แล้วค่อยสร้าง Bases/Dataview dashboard เป็นแนวทางที่ทนต่อการขยายระบบ: `.base` คือ live view จาก note properties, file metadata และ formula properties ไม่ใช่ตารางที่ต้องกรอกซ้ำเอง[5][6]

การอ้างอิง:
[1] Obsidian Dataview for Project Tracking: Complete Setup Guide https://notes-automate.com/posts/obsidian-dataview-for-project-tracking/
[2] YAML in Obsidian: Properties, Syntax, Bases, and Dataview https://www.itechguides.com/yaml-in-obsidian-a-guide-to-better-metadata-management/
[3] FAQ — Project Planner https://projectplanner.md/faq/
[4] raw.githubusercontent.com https://raw.githubusercontent.com/zhishile/tasknotes/refs/heads/main/docs/views/task-list.md
[5] 0.1.0 • obsidian-toolkit • pantheon-ai • Registry https://tessl.io/registry/pantheon-ai/obsidian-toolkit/files/obsidian-bases/SKILL.md
[6] obsidian-skills/skills/obsidian-bases/SKILL.md at main https://github.com/kepano/obsidian-skills/blob/main/skills/obsidian-bases/SKILL.md
[7] Task Properties Settings - TaskNotes documentation https://tasknotes.dev/obsidian/settings/task-properties/
[8] Obsidian Bases: The Complete Guide to Database Views ... https://got.md/obsidian-bases/
[9] How Can You Display Properties in a Table in Obsidian? https://enkledesigns.com/how-to-display-properties-in-table-obsidian/
[10] github.com · tasks-and-dataview-pluginstil/obsidian/tasks-and-dataview-plugins.md at main ... - GitHub https://github.com/bryanfosler/til/blob/main/obsidian/tasks-and-dataview-plugins.md
[11] Task Properties - Tasks User Guide https://publish.obsidian.md/tasks/Scripting/Task+Properties
ออกแบบ Bases view หรือ Dataview ต่อจากนี้ยังไงดี

แนะนำให้เริ่มด้วย **Obsidian Bases เป็น operational UI หลัก** สำหรับดูและแก้ properties ของ workflow/task แบบตารางหรือ Kanban แล้วใช้ **Dataview เป็น dashboard/report** สำหรับ query ซับซ้อน เช่น งาน overdue, approval queue, review compliance และสรุปตาม domain

Bases เป็น core plugin ที่ทำ database-like views จาก Properties ได้โดยตรง และรองรับ table, list, cards, Kanban, map, filters, sort, group และ formulas; Dataview เหมาะกับ query/report ที่ต้อง `WHERE`, `GROUP BY`, `SORT`, `LIMIT` และ task query แบบยืดหยุ่น[1][2]

## Architecture ที่แนะนำ

```text
00-mocs/
├── Dashboard - Operations.md
├── Dashboard - Knowledge.md
└── Dashboard - Security.md

08-tasks/
├── active/
├── waiting/
├── done/
└── archived/

05-workflows/
├── Workflow - Supabase Change.md
├── Workflow - Vercel Cache Invalidation.md
└── Workflow - Pull Request Review.md

10-bases/
├── Tasks.base
├── Workflows.base
├── Approvals.base
└── Knowledge Health.base
```

> [!tip]
> เก็บ `.base` ไว้ใน `10-bases/` เพื่อแยก “view definition” ออกจาก notes จริง และใช้ field ชุดเดิมจาก YAML frontmatter ที่ออกแบบไว้แล้ว

## 1. Tasks.base

สร้างไฟล์:

```text
10-bases/Tasks.base
```

ไฟล์นี้เป็น operational board สำหรับ Agent และทีม: ดูงานตาม priority, ownership, deadline, status และ approval

```yaml
filters:
  and:
    - 'type == "task"'
    - 'file.path.contains("08-tasks")'

formulas:
  days_until_due: 'if(due, date(due) - today(), null)'
  is_overdue: 'if(due, due < today() && status != "done" && status != "cancelled", false)'
  is_ready: 'status == "ready" && (!blocked_by || blocked_by.length == 0)'
  needs_approval: 'approval_required == true && approval_status != "approved"'
  priority_score: 'if(priority == "P0", 0, if(priority == "P1", 1, if(priority == "P2", 2, 3)))'

views:
  - type: table
    name: Ready Queue
    filters:
      and:
        - 'status == "ready"'
        - 'is_ready == true'
        - 'needs_approval == false'
    order:
      - file.name
      - priority
      - owner
      - domain
      - due
      - risk
      - uses_workflow
    sort:
      - property: priority_score
        direction: ASC
      - property: due
        direction: ASC

  - type: kanban
    name: Work Board
    group_by: status
    filters:
      and:
        - 'status != "done"'
        - 'status != "cancelled"'
    order:
      - file.name
      - priority
      - owner
      - due
      - approval_status
      - blocked_by
    sort:
      - property: priority_score
        direction: ASC
      - property: due
        direction: ASC

  - type: table
    name: P0 and P1
    filters:
      or:
        - 'priority == "P0"'
        - 'priority == "P1"'
    order:
      - file.name
      - status
      - priority
      - owner
      - due
      - risk
      - approval_status
    sort:
      - property: priority_score
        direction: ASC
      - property: due
        direction: ASC

  - type: table
    name: Overdue
    filters:
      and:
        - 'is_overdue == true'
    order:
      - file.name
      - priority
      - owner
      - due
      - days_until_due
      - status
    sort:
      - property: due
        direction: ASC

  - type: table
    name: Waiting and Blocked
    filters:
      or:
        - 'status == "waiting"'
        - 'status == "blocked"'
    order:
      - file.name
      - priority
      - owner
      - blocked_by
      - approval_status
      - due
    sort:
      - property: priority_score
        direction: ASC
      - property: due
        direction: ASC

  - type: table
    name: Completed
    filters:
      and:
        - 'status == "done"'
    order:
      - file.name
      - owner
      - domain
      - completed_at
      - actual_minutes
      - result_status
    sort:
      - property: completed_at
        direction: DESC
```

### Views ที่ควรใช้ทุกวัน

| View | ใช้เมื่อ |
|---|---|
| `Ready Queue` | ให้ Agent เลือก task ถัดไปที่ทำได้จริง |
| `Work Board` | ดูงานตามสถานะ: ready → in progress → waiting/blocked |
| `P0 and P1` | Daily planning และ daily briefing |
| `Overdue` | ตรวจงานหลุด deadline |
| `Waiting and Blocked` | ติดตาม approval, dependency, external blocker |
| `Completed` | สรุป standup, weekly review และ audit |

> [!note]
> syntax ของ Bases อาจมีความต่างตามเวอร์ชัน Obsidian ที่ใช้ ให้สร้าง view จาก UI สักหนึ่ง view ก่อน แล้วดูรูปแบบ YAML ที่ Obsidian generate ให้ จากนั้นค่อยปรับ filters/formulas เพิ่ม เพราะ Base รองรับ global filter และ view-level filter รวมถึง formula properties ที่นำไป filter/sort ได้[3][4]

## 2. Workflows.base

ใช้เป็น registry ของ workflow ที่ active, workflows เสี่ยงสูง และ workflows ที่ใกล้ถึงรอบ review

```yaml
filters:
  and:
    - 'type == "workflow"'
    - 'file.path.contains("05-workflows")'

formulas:
  review_due: 'if(next_review, next_review <= today(), false)'
  days_to_review: 'if(next_review, next_review - today(), null)'
  is_high_risk: 'risk == "high" || risk == "critical"'
  approval_label: 'if(approval_required, approval_tier, "None")'

views:
  - type: table
    name: Active Workflows
    filters:
      and:
        - 'status == "active"'
    order:
      - file.name
      - domain
      - owner
      - risk
      - approval_label
      - last_reviewed
      - next_review
    sort:
      - property: risk
        direction: DESC
      - property: next_review
        direction: ASC

  - type: table
    name: Review Due
    filters:
      and:
        - 'status == "active"'
        - 'review_due == true'
    order:
      - file.name
      - domain
      - owner
      - risk
      - last_reviewed
      - next_review
    sort:
      - property: next_review
        direction: ASC

  - type: table
    name: High Risk
    filters:
      and:
        - 'is_high_risk == true'
        - 'status == "active"'
    order:
      - file.name
      - domain
      - risk
      - approval_tier
      - governed_by
      - rollback_workflow
    sort:
      - property: next_review
        direction: ASC

  - type: cards
    name: Workflow Catalog
    filters:
      and:
        - 'status == "active"'
    group_by: domain
    order:
      - file.name
      - risk
      - triggers
      - systems
      - approval_tier
```

## 3. Approvals.base

นี่คือ view ที่สำคัญสำหรับ Agent ที่มี write access เพราะแยกงานที่ “ทำได้” ออกจากงานที่ “รออนุมัติ”

```yaml
filters:
  and:
    - 'type == "task"'
    - 'approval_required == true'

formulas:
  is_pending: 'approval_status == "not_requested" || approval_status == "requested"'
  is_expired: 'if(approval_expires_at, approval_expires_at < now(), false)'
  is_actionable: 'approval_status == "approved" && !is_expired'
  priority_score: 'if(priority == "P0", 0, if(priority == "P1", 1, if(priority == "P2", 2, 3)))'

views:
  - type: table
    name: Approval Queue
    filters:
      and:
        - 'is_pending == true'
        - 'status != "done"'
        - 'status != "cancelled"'
    order:
      - file.name
      - priority
      - approval_tier
      - owner
      - environment
      - target
      - due
      - approval_status
    sort:
      - property: priority_score
        direction: ASC
      - property: due
        direction: ASC

  - type: table
    name: Approved and Executable
    filters:
      and:
        - 'is_actionable == true'
        - 'status == "ready"'
    order:
      - file.name
      - priority
      - approval_tier
      - environment
      - target
      - approval_expires_at
    sort:
      - property: approval_expires_at
        direction: ASC

  - type: table
    name: Expired Approval
    filters:
      and:
        - 'is_expired == true'
        - 'status != "done"'
    order:
      - file.name
      - priority
      - approval_tier
      - approval_reference
      - approval_expires_at
      - owner
    sort:
      - property: approval_expires_at
        direction: ASC
```

## 4. Dataview: Operations Dashboard

สร้างไฟล์:

```text
00-mocs/Dashboard - Operations.md
```

Dataview จะช่วยสร้าง landing page ที่รวม “สิ่งที่ต้องทำตอนนี้” มากกว่าแสดงข้อมูลทุกอย่าง

```markdown
---
id: dashboard-operations
title: Operations Dashboard
aliases:
  - Agent Operations Dashboard
  - Work Dashboard
type: dashboard
domain: operations
status: active
owner: engineering
tags:
  - dashboard
  - operations
  - tasks
  - workflows
  - approvals
---

# Operations Dashboard

> [!summary]
> ภาพรวมสำหรับเลือกงานต่อไป, ตรวจ blocker, ตรวจ approval
> และดู workflow ที่ต้องทบทวน

## Next Tasks — P0 and P1 Ready

```dataview
TABLE
  priority AS Priority,
  owner AS Owner,
  domain AS Domain,
  due AS Due,
  risk AS Risk,
  uses_workflow AS Workflow
FROM "08-tasks"
WHERE type = "task"
  AND status = "ready"
  AND (priority = "P0" OR priority = "P1")
  AND (!blocked_by OR length(blocked_by) = 0)
  AND (
    !approval_required
    OR approval_status = "approved"
  )
SORT choice(priority = "P0", 0, choice(priority = "P1", 1, 2)) ASC,
     due ASC,
     file.name ASC
```

## Waiting for Approval

```dataview
TABLE
  priority AS Priority,
  approval_tier AS Tier,
  environment AS Environment,
  target AS Target,
  owner AS Owner,
  due AS Due
FROM "08-tasks"
WHERE type = "task"
  AND approval_required = true
  AND (
    approval_status = "not_requested"
    OR approval_status = "requested"
    OR approval_status = "expired"
  )
  AND status != "done"
  AND status != "cancelled"
SORT choice(priority = "P0", 0, choice(priority = "P1", 1, 2)) ASC,
     due ASC
```

## Blocked Work

```dataview
TABLE
  priority AS Priority,
  owner AS Owner,
  blocked_by AS Blocked By,
  due AS Due,
  uses_workflow AS Workflow
FROM "08-tasks"
WHERE type = "task"
  AND (
    status = "blocked"
    OR status = "waiting"
  )
SORT due ASC, file.name ASC
```

## Overdue Tasks

```dataview
TABLE
  priority AS Priority,
  owner AS Owner,
  domain AS Domain,
  due AS Due,
  status AS Status
FROM "08-tasks"
WHERE type = "task"
  AND status != "done"
  AND status != "cancelled"
  AND due
  AND due < date(today)
SORT due ASC
```

## High-Risk Active Workflows

```dataview
TABLE
  domain AS Domain,
  risk AS Risk,
  approval_tier AS Approval Tier,
  owner AS Owner,
  next_review AS Next Review
FROM "05-workflows"
WHERE type = "workflow"
  AND status = "active"
  AND (risk = "high" OR risk = "critical")
SORT next_review ASC
```

## Workflows Due for Review

```dataview
TABLE
  domain AS Domain,
  owner AS Owner,
  risk AS Risk,
  last_reviewed AS "Last Reviewed",
  next_review AS "Next Review"
FROM "05-workflows"
WHERE type = "workflow"
  AND status = "active"
  AND (
    !next_review
    OR next_review <= date(today)
  )
SORT next_review ASC
```
```

Dataview รองรับ `TABLE`, `LIST`, `TASK`, `WHERE`, `SORT`, `GROUP BY` และ `LIMIT`; ใช้ `TASK` เมื่อคุณเก็บงานเป็น Markdown checkbox ส่วนใช้ `TABLE` เมื่อ task เป็น note ที่มี YAML frontmatter ตาม schema ที่เราวางไว้[2][5]

## 5. Dataview: Daily Briefing

สร้างไฟล์:

```text
00-mocs/Dashboard - Daily Briefing.md
```

```markdown
# Daily Briefing

## Today

```dataview
TABLE
  priority AS Priority,
  due AS Due,
  owner AS Owner,
  uses_workflow AS Workflow
FROM "08-tasks"
WHERE type = "task"
  AND status = "ready"
  AND due
  AND due = date(today)
SORT choice(priority = "P0", 0, choice(priority = "P1", 1, 2)) ASC
```

## Top Three Ready Tasks

```dataview
TABLE
  priority AS Priority,
  domain AS Domain,
  due AS Due,
  risk AS Risk
FROM "08-tasks"
WHERE type = "task"
  AND status = "ready"
  AND (!blocked_by OR length(blocked_by) = 0)
  AND (!approval_required OR approval_status = "approved")
SORT choice(priority = "P0", 0, choice(priority = "P1", 1, choice(priority = "P2", 2, 3))) ASC,
     due ASC
LIMIT 3
```

## Blockers

```dataview
TABLE
  priority AS Priority,
  blocked_by AS Blocked By,
  owner AS Owner,
  due AS Due
FROM "08-tasks"
WHERE type = "task"
  AND (status = "blocked" OR status = "waiting")
SORT due ASC
```

## Recently Completed

```dataview
TABLE
  completed_at AS Completed,
  result_status AS Result,
  actual_minutes AS Minutes
FROM "08-tasks"
WHERE type = "task"
  AND status = "done"
  AND completed_at >= date(today) - dur(1 day)
SORT completed_at DESC
```
```

## 6. ลำดับสร้างที่ดีที่สุด

อย่าเริ่มทำทุก view พร้อมกัน ให้สร้างตามลำดับนี้:

1. สร้าง `Tasks.base` ด้วย `Ready Queue`, `Work Board`, `Waiting and Blocked`
2. ตรวจว่าทุก task ใช้ `status`, `priority`, `owner`, `due`, `blocked_by`, `approval_required`, `approval_status` เหมือนกัน
3. เพิ่ม `Approvals.base` เมื่อเริ่มมี tasks ที่ต้อง request approval
4. สร้าง `Dashboard - Operations.md` เป็นหน้า landing page
5. สร้าง `Workflows.base` เพื่อ governance, review cycle และ high-risk workflow
6. เพิ่ม Daily Briefing หลังข้อมูล task เริ่มถูกอัปเดตสม่ำเสมอ
7. ค่อยเพิ่ม formula เช่น `is_overdue`, `days_until_due`, `priority_score`

## Best practices

- ใช้ **Base หนึ่งไฟล์ต่อ entity**: Tasks, Workflows, Approvals, Knowledge Health
- ใช้ global filter ให้ Base เห็นเฉพาะ `type` และ folder ที่เกี่ยวข้อง; view filter ใช้สำหรับ slice เช่น `ready`, `overdue`, `high risk`
- ทำ dashboard ให้นำไปสู่ action: “What do I do next?”, “What is blocked?”, “What needs approval?”
- อย่าใช้ dashboard เป็น source of truth; source of truth คือ properties ใน note
- แยก `status` กับ `approval_status`; งานอาจ `ready` แต่ยัง `approval_status: requested`
- อย่าให้ Agent เลือก task จาก priority เพียงอย่างเดียว ต้อง filter `blocked_by`, `approval_required`, `approval_status`, environment และ owner
- ใช้ formula properties เพื่อคำนวณ ไม่ต้องกรอก field ที่ derive ได้ เช่น `days_until_due`, `is_overdue`, `is_ready`
- เก็บ `done` task ไว้ใน view ได้ แต่ archive รายไตรมาสเพื่อลดความรก
- เมื่อ `status: done` ให้บังคับมี `completed_at`, `result_status`, `evidence`
- เมื่อ `status: blocked` หรือ `waiting` ให้บังคับมี `blocked_by` หรือ `blocker_reason` เพิ่มใน task schema

Bases สามารถมีหลาย views โดยแต่ละ view มี filter, sort และ layout แยกกันได้ ส่วน formulas สามารถใช้คำนวณค่า, compare dates, สร้าง logical flag และนำผลลัพธ์ไป sort/filter ต่อได้[3][4]

การอ้างอิง:
[1] Introduction to Bases - Obsidian Help https://obsidian.md/help/bases
[2] Structure of a Query - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/queries/structure/
[3] Views - Obsidian Help https://obsidian.md/help/bases/views
[4] Formulas - Obsidian Help https://obsidian.md/help/formulas
[5] obsidian-dataview/docs/docs/queries/query-types.md at master · blacksmithgu/obsidian-dataview https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/queries/query-types.md
[6] https://raw.githubusercontent.com/obsidian-communi... https://raw.githubusercontent.com/obsidian-community/obsidian-hub/main/04%20-%20Guides,%20Workflows,%20&%20Courses/Guides/An%20Introduction%20to%20Dataview.md
[7] Dataview - Simone Riflesso - Obsidian Publish https://publish.obsidian.md/simoneriflesso/Obsidian/Plugins/Core+plugins/Dataview
[8] Obsidian-Official-Documentation/zh/Bases/Bases 语法.md at master ... https://github.com/chrisblifeos-pixel/Obsidian-Official-Documentation/blob/master/zh/Bases/Bases%20%E8%AF%AD%E6%B3%95.md
[9] github.com › obsidian-bases › SKILLobsidian-skills/skills/obsidian-bases/SKILL.md at main ... https://github.com/kepano/obsidian-skills/blob/main/skills/obsidian-bases/SKILL.md?plain=1
[10] Dataview in Obsidian: A Beginner's Guide https://obsidian.rocks/dataview-in-obsidian-a-beginners-guide/
[11] Dataview翻译by 寡人- Obsidian中文教程 https://publish.obsidian.md/chinesehelp/01+2021%E6%96%B0%E6%95%99%E7%A8%8B/Dataview%E7%BF%BB%E8%AF%91+by+%E5%AF%A1%E4%BA%BA
เปรียบเทียบข้อดีของ Bases กับ Dataview ให้ฟังหน่อย

ทั้ง **Bases** และ **Dataview** ทำให้ Obsidian Vault กลายเป็นระบบข้อมูลที่ query ได้จาก YAML Frontmatter แต่เหมาะกับงานคนละแบบครับ: ใช้ **Bases สำหรับจัดการข้อมูลแบบ interactive** และใช้ **Dataview สำหรับสร้าง dashboard/report ที่ query ซับซ้อน**

Bases เป็น core plugin ของ Obsidian สำหรับสร้าง views จาก Properties โดยตรง เช่น table, cards, list และ view อื่น ๆ; Dataview เป็น plugin ที่มี live index และ query language สำหรับ filter, sort, group และ render report จากข้อมูลใน vault[1][2]

## เปรียบเทียบหลัก

| มิติ | Obsidian Bases | Dataview |
|---|---|---|
| สถานะ | Core plugin ใน Obsidian | Community plugin |
| เหมาะกับ | จัดการและดูข้อมูลรายวัน | Dashboard, report, audit |
| วิธีใช้งาน | UI-first + `.base` file | Query-first ใน Markdown code block |
| การแก้ Properties | ทำได้สะดวกใน table view | เน้นอ่าน/แสดงผล ไม่ใช่ editor หลัก |
| รูปแบบ view | Table, list, cards และ views ของ Bases | Table, list, task list; DataviewJS ทำ custom output ได้ |
| Filtering | UI filters + YAML filters | `FROM`, `WHERE`, `GROUP BY`, `SORT`, `LIMIT` |
| Formulas | Formula properties ใน `.base` | Expressions และ DataviewJS |
| Task checkbox | ไม่ใช่จุดแข็งหลัก | ดีมากผ่าน `TASK` query |
| Complex report | ทำได้ระดับหนึ่ง | เด่นกว่า โดยเฉพาะ aggregate/group/custom logic |
| Setup | ง่ายกว่าและ native | ต้องเรียน syntax เพิ่ม |
| Portability | `.base` เป็น YAML อยู่ใน vault | Query อยู่ใน Markdown note; ต้องติดตั้ง plugin จึง render |
| AI Agent | เหมาะเป็น view สำหรับตรวจ/แก้ metadata | เหมาะเป็นหน้าสรุป context ให้ Agent อ่าน |
| Performance | เหมาะกับ database-like browsing | ดีสำหรับ live index แต่ query ใหญ่จาก root อาจหนัก |

## จุดเด่นของ Bases

Bases เหมาะเมื่อคุณอยากเปิดหน้าเดียวแล้ว **เห็นและแก้ status/priority/owner/due date ได้ทันที** เช่น task board, workflow registry หรือ approval queue เพราะมันใช้ note properties, file properties และ formula properties เป็น column/filter ได้โดยตรง[3][4]

### ตัวอย่างที่เหมาะกับ Bases

- Task board: `ready`, `in_progress`, `waiting`, `blocked`, `done`
- ตาราง P0/P1 tasks ที่ต้องทำก่อน
- Approval queue ที่ต้องเปลี่ยน `approval_status`
- Workflow catalog ที่ filter ตาม `domain`, `risk`, `owner`
- Knowledge registry ที่ต้องอัปเดต `status`, `last_reviewed`, `next_review`
- Project list ที่จัดกลุ่มตาม owner หรือ phase

ตัวอย่างมุมมองที่ใช้ทุกวัน:

```text
Tasks.base
├── Ready Queue
├── Work Board
├── P0 and P1
├── Waiting and Blocked
├── Overdue
└── Completed
```

### ข้อดีของ Bases

- เป็น native/core plugin จึงลด dependency ต่อ community plugin
- ใช้ UI สร้าง filter, sort, group และเลือก columns ได้เร็ว
- เหมาะกับคนที่ไม่อยากเขียน query
- แก้ properties ใน workflow/task note ได้สะดวก
- เก็บ definition เป็น `.base` file จึง version control กับ Git ได้
- formula properties เหมาะกับค่าที่ derive ได้ เช่น `is_overdue`, `days_until_due`, `priority_score`[5]

### ข้อจำกัดของ Bases

- การทำ report ข้ามหลาย entity หรือ logic หลายชั้นอาจไม่ยืดหยุ่นเท่า Dataview
- ไม่เหมาะเป็นหน้า narrative dashboard ยาว ๆ ที่สอดแทรกข้อความ, callout, context และหลาย query
- syntax/feature ของ Bases ยังเปลี่ยนตามเวอร์ชัน Obsidian ได้ จึงควรให้ UI generate YAML เริ่มต้นแล้วค่อยแก้
- ไม่ใช่ workflow engine, queue, scheduler หรือ database transaction system

## จุดเด่นของ Dataview

Dataview เหมาะกับการเขียนหน้า dashboard แบบ “ตอบคำถาม” เช่น:

- วันนี้ต้องทำอะไร?
- P0 task ไหนพร้อมทำและไม่ติด blocker?
- งานใดรอ approval?
- เอกสาร high-risk ไหนเกินรอบ review?
- Workflow ไหนไม่มี owner?
- งาน done ใน 7 วันล่าสุดมีอะไรบ้าง?

Dataview รองรับ pipeline query เช่น `FROM`, `WHERE`, `SORT`, `GROUP BY` และ `LIMIT`; ใช้ `TASK` query ได้โดยตรงหากคุณเก็บงานเป็น Markdown checkbox[6]

### ตัวอย่าง Dataview

```dataview
TABLE
  priority AS Priority,
  owner AS Owner,
  domain AS Domain,
  due AS Due,
  uses_workflow AS Workflow
FROM "08-tasks"
WHERE type = "task"
  AND status = "ready"
  AND (priority = "P0" OR priority = "P1")
  AND (!blocked_by OR length(blocked_by) = 0)
  AND (!approval_required OR approval_status = "approved")
SORT choice(priority = "P0", 0, choice(priority = "P1", 1, 2)) ASC,
     due ASC
```

### ข้อดีของ Dataview

- ทำ dashboard หลาย section ในโน้ตเดียวได้
- ทำ table/list/task query ได้ละเอียด
- เหมาะกับ audit, review, compliance และ weekly report
- Query ใช้ซ้ำใน MOC, dashboard และ operational note ได้
- รองรับ `DataviewJS` เมื่อ logic ขั้นสูง เช่น score, chart, custom rendering
- ดึงข้อมูลจาก YAML Frontmatter, tags, inline fields และ file metadata ได้[2]

### ข้อจำกัดของ Dataview

- ต้องติดตั้ง community plugin และ dashboard จะไม่ render หาก plugin ปิดหรือเปิด vault ใน environment ที่ไม่มี plugin
- ไม่เหมาะเป็น interface หลักสำหรับแก้ properties ทีละหลาย note
- Query ยาวอาจดูแลยาก โดยเฉพาะหากไม่ใช้ controlled vocabulary
- DataviewJS เพิ่มพลัง แต่เพิ่มภาระด้าน maintainability และ security review

## ใช้ร่วมกันแบบดีที่สุด

สำหรับ Vault ของคุณ แนะนำ hybrid model นี้:

```text
YAML Frontmatter = Source of truth
        ↓
Bases = Operational management UI
        ↓
Dataview = Dashboard, reporting, audit
        ↓
AI Agent = อ่าน AGENTS.md + Task/Workflow note + dashboard ที่เกี่ยวข้อง
```

### แบ่งหน้าที่

| งาน | ใช้ Bases | ใช้ Dataview |
|---|---:|---:|
| เปลี่ยน task `status` | ✓ |  |
| เปลี่ยน `owner`, `due`, `priority` | ✓ |  |
| ดู Kanban งานทั้งหมด | ✓ |  |
| ดู approval queue แบบแก้ไขได้ | ✓ |  |
| Daily briefing |  | ✓ |
| Top 3 tasks วันนี้ |  | ✓ |
| รายงาน P0 ที่ unblock แล้ว |  | ✓ |
| Weekly report |  | ✓ |
| Compliance audit |  | ✓ |
| หา workflow ที่ review เกินกำหนด | ✓ | ✓ |
| Catalog skills/workflows | ✓ | ✓ |
| Custom scoring/aggregation |  | ✓ |
| Render chart/visual custom |  | ✓ ผ่าน DataviewJS |

## ชุดเริ่มต้นที่แนะนำ

### Bases

```text
10-bases/
├── Tasks.base
├── Workflows.base
├── Approvals.base
└── Knowledge Health.base
```

### Dataview dashboards

```text
00-mocs/
├── Dashboard - Operations.md
├── Dashboard - Daily Briefing.md
├── Dashboard - Knowledge Health.md
└── Dashboard - Security and Approval.md
```

## กฎเลือกใช้

เลือก **Bases** เมื่อคำถามคือ:

> “ฉันต้องการเปิดดูและแก้ข้อมูลของหลายโน้ตอย่างรวดเร็ว”

เลือก **Dataview** เมื่อคำถามคือ:

> “ฉันต้องการสรุป วิเคราะห์ จัดกลุ่ม และตอบคำถามจากข้อมูลใน vault”

## Recommendation

เริ่มจาก `Tasks.base` ก่อน เพราะช่วยให้คุณจัดการ `status`, `priority`, `due`, `owner`, `approval_status` ได้เป็นธรรมชาติที่สุด แล้วสร้าง `Dashboard - Operations.md` ด้วย Dataview เพื่อสรุป:

1. P0/P1 ที่พร้อมทำ
2. งานรอ approval
3. งาน blocked/waiting
4. งานเลย due
5. workflow ความเสี่ยงสูงที่ต้อง review

อย่าสร้าง dashboard เยอะในวันแรก ให้เริ่มจาก views ที่ช่วยให้ตัดสินใจได้จริงทุกวัน แล้วค่อยเพิ่ม report เมื่อข้อมูลใน YAML มีความสม่ำเสมอครับ.

การอ้างอิง:
[1] Build a Bases view - Developer Documentation https://docs.obsidian.md/plugins/guides/bases-view
[2] cheat-sheets-plus/text/obsidian/dataview.md at main · doctorfree/cheat-sheets-plus https://github.com/doctorfree/cheat-sheets-plus/blob/main/text/obsidian/dataview.md
[3] deepwiki.com › obsidianmd › obsidian-helpIntroduction to Bases | obsidianmd/obsidian-help | DeepWiki https://deepwiki.com/obsidianmd/obsidian-help/5.1-introduction-to-bases
[4] deepwiki.com · obsidianmd · obsidian-helpBases Database System | obsidianmd/obsidian-help | DeepWiki https://deepwiki.com/obsidianmd/obsidian-help/5-bases-database-system
[5] Formulas - Obsidian Help https://obsidian.md/help/formulas
[6] Structure of a Query - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/queries/structure/
[7] Bases Toolbox - Obsidian Plugin https://community.obsidian.md/plugins/bases-toolbox
[8] Extended Base - Obsidian Plugin https://community.obsidian.md/plugins/extended-base
กรณีไหนควรใช้ทั้งคู่ร่วมกันใน vault เดียว

ควรใช้ **Bases + Dataview ร่วมกันใน vault เดียว** เมื่อคุณมีข้อมูล structured จริง เช่น task, workflow, project, skill, approval หรือ documentation lifecycle และต้องการทั้ง “หน้าจอจัดการข้อมูล” กับ “รายงานที่ตอบคำถามเชิงบริบท”

สรุปสั้นที่สุด: **Bases ใช้จัดการและแก้ข้อมูล**, ส่วน **Dataview ใช้สรุป วิเคราะห์ และแสดงข้อมูลในบริบทของโน้ต** ทั้งคู่สามารถอ่าน YAML Frontmatter ชุดเดียวกันได้ จึงไม่ทำให้ข้อมูลซ้ำกันครับ[1][2]

## กรณีที่ควรใช้ร่วมกัน

### 1. มี task จำนวนมากและอัปเดตทุกวัน

ใช้ Bases เป็น task manager เพราะแก้ `status`, `priority`, `owner`, `due`, `approval_status` จาก table หรือ Kanban ได้สะดวก

ใช้ Dataview ในหน้า daily briefing เพื่อสรุปเฉพาะสิ่งที่ต้องตัดสินใจวันนี้

```text
Bases:
- งาน P0/P1 ทั้งหมด
- Kanban: ready → in_progress → waiting → blocked → done
- แก้ due date, owner, priority
- approval queue

Dataview:
- Top 3 งานที่พร้อมทำวันนี้
- งานที่ overdue
- งานที่ถูก block
- งานที่รอ approval
- งานที่เสร็จใน 24 ชั่วโมงล่าสุด
```

นี่คือกรณีที่ดีที่สุดสำหรับ workflow ของคุณ เพราะ Agent ต้องเลือกงานจาก structured state แต่คุณต้องการหน้า summary แบบอ่านเร็วด้วย

### 2. มี workflow/runbook/policy จำนวนมาก

ใช้ Bases ทำ registry เพื่อ browse และดูแล lifecycle ของเอกสาร:

```text
Workflows.base
- Active workflows
- High-risk workflows
- Workflow ที่ review เกินกำหนด
- Workflow แยกตาม domain
- Workflow ที่ต้อง approval
```

ใช้ Dataview แสดง workflow ที่สัมพันธ์กับหน้าเฉพาะบริบท เช่นใน `[[MOC - Supabase]]`:

```dataview
TABLE
  risk AS Risk,
  owner AS Owner,
  approval_tier AS Approval,
  next_review AS "Next Review"
FROM "05-workflows"
WHERE domain = "supabase"
  AND status = "active"
SORT risk DESC, next_review ASC
```

Bases ตอบคำถามว่า **“มี workflow ทั้งหมดอะไรบ้างและแก้ metadata ตรงไหน?”**  
Dataview ตอบคำถามว่า **“ในบริบท Supabase ตอนนี้ workflow ไหนเกี่ยวข้อง?”**

### 3. ต้องการ dashboard หลายระดับ

ใช้ Bases สำหรับ dashboard ระดับ entity หรือ collection:

```text
Tasks.base
Workflows.base
Approvals.base
Knowledge Health.base
Projects.base
```

ใช้ Dataview สำหรับ dashboard ระดับ executive/operations ที่รวมหลาย entities ในหน้าเดียว:

```text
Dashboard - Operations.md
├── P0/P1 tasks ที่พร้อมทำ
├── tasks ที่รอ approval
├── blocked work
├── overdue tasks
├── high-risk workflows
└── workflows due for review
```

Bases เป็นเหมือน spreadsheet/database UI  
Dataview เป็นเหมือน report page หรือ command center

## ตัวอย่าง vault ของคุณ

```text
vault/
├── 00-mocs/
│   ├── Dashboard - Operations.md        ← Dataview
│   ├── Dashboard - Daily Briefing.md    ← Dataview
│   ├── Dashboard - Security.md          ← Dataview
│   └── MOC - Document Operations.md
│
├── 05-workflows/
│   ├── Workflow - Supabase Change.md
│   ├── Workflow - Vercel Cache Invalidation.md
│   ├── Workflow - PR Review.md
│   └── Workflow - REST API Docs Sync.md
│
├── 08-tasks/
│   ├── active/
│   ├── waiting/
│   ├── done/
│   └── archived/
│
├── 10-bases/
│   ├── Tasks.base                       ← Bases
│   ├── Workflows.base                   ← Bases
│   ├── Approvals.base                   ← Bases
│   └── Knowledge Health.base            ← Bases
│
└── 09-templates/
    ├── Template - Task.md
    └── Template - Workflow.md
```

## แบ่งหน้าที่ให้ชัด

| กรณี | Bases | Dataview |
|---|---:|---:|
| เปลี่ยน `status` ของ task | ใช่ | ไม่ควร |
| เปลี่ยน `owner`, `due`, `priority` | ใช่ | ไม่ควร |
| ดู Kanban งาน | ใช่ | ใช้ได้ แต่ไม่ใช่จุดเด่น |
| ดู task ทั้งหมดแบบ filter/sort | ใช่ | ใช้ได้ |
| ทำ daily briefing |  | ใช่ |
| สรุป “วันนี้ต้องทำอะไร” |  | ใช่ |
| สร้าง weekly report |  | ใช่ |
| แสดง query ใน MOC |  | ใช่ |
| หาเอกสารไม่มี owner | ใช่ | ใช่ |
| ทำ compliance/audit report |  | ใช่ |
| วิเคราะห์ cross-folder/cross-type | จำกัด | ใช่ |
| คำนวณ custom score ซับซ้อน | จำกัด | ใช่ โดยเฉพาะ DataviewJS |
| แก้ frontmatter หลายโน้ตแบบ interactive | ใช่ | ไม่ควร |
| ใช้บน mobile แบบไม่เขียน query | ใช่ | ใช้ได้ แต่ Bases สะดวกกว่า |

## แนวทาง Hybrid ที่แนะนำ

ใช้ schema YAML เดียว:

```yaml
---
id: task-invalidate-api-docs-cache
title: Invalidate REST API Documentation Cache
type: task
status: ready
priority: P1
owner: fig-agent
domain: vercel
risk: high
due: 2026-10-05
approval_required: true
approval_status: approved
uses_workflow: "[[Workflow - Vercel Cache Invalidation]]"
blocked_by: []
---
```

จากนั้น:

```text
Bases อ่าน YAML นี้เพื่อ:
- แสดง task เป็น row/card
- แก้ status, priority, owner และ due
- filter งาน ready หรือ waiting
- จัดกลุ่มตาม status

Dataview อ่าน YAML เดียวกันเพื่อ:
- ดึง P0/P1 ที่ ready และ approved
- แสดง blocked work
- สรุปงาน due วันนี้
- ทำ daily briefing / weekly report
- ตรวจ compliance เช่น high-risk task ที่ไม่มี workflow
```

แนวคิดคือ **Base ไม่ใช่ source of truth** และ Dataview ก็ไม่ใช่ source of truth เช่นกัน ทั้งคู่เป็นเพียง views เหนือ Markdown notes และ Properties เดียวกัน

## ตัวอย่างการทำงานจริง

### ตอนเช้า

1. เปิด `Dashboard - Daily Briefing.md`
2. Dataview แสดง:
   - Top 3 ready tasks
   - งาน due วันนี้
   - งานที่ต้อง approval
   - blocker
3. เลือกงานที่จะทำ
4. เปิด `Tasks.base`
5. เปลี่ยน task เป็น `in_progress` และกำหนด owner

### ระหว่างวัน

1. ใช้ `Tasks.base` ดู Kanban
2. แก้ `priority`, `due`, `owner`, `status`
3. ใช้ `Approvals.base` ตรวจ task ที่ approval หมดอายุ
4. Agent อ่าน task note และ workflow ที่ link อยู่

### ก่อนจบวัน

1. เปิด `Dashboard - Operations.md`
2. Dataview สรุป:
   - งาน done วันนี้
   - งานที่ยัง blocked
   - งานที่ due พรุ่งนี้
   - workflow หรือ policy ที่ต้อง review
3. เปลี่ยน task ที่เสร็จผ่าน Bases เป็น `done`
4. บันทึก `completed_at`, `result_summary`, `evidence`

## เมื่อไม่จำเป็นต้องใช้ทั้งคู่

ใช้ **Bases อย่างเดียว** หาก:

- Vault ยังเล็ก
- ต้องการ table/card/kanban ที่แก้ข้อมูลได้
- ไม่มี dashboard เชิงวิเคราะห์
- ไม่อยากพึ่ง community plugin
- ข้อมูลทั้งหมดเป็น YAML frontmatter สม่ำเสมอ

ใช้ **Dataview อย่างเดียว** หาก:

- เน้น report และ query ใน MOC
- เก็บ task เป็น Markdown checkbox มากกว่า one-note-per-task
- ต้องการ inline query หรือ query ซับซ้อน
- ไม่ต้องแก้ metadata หลายโน้ตจาก table UI

## ข้อควรระวัง

- อย่าทำ view ซ้ำกันทุกหน้า เช่น `Tasks.base` และ dashboard Dataview แสดงตาราง active tasks เหมือนกันทั้งหมดโดยไม่มีเป้าหมายต่างกัน
- อย่าใช้ property ชื่อคนละแบบในแต่ละ note เช่น `deadline`, `due_date`, `due`
- อย่าให้ Agent เปลี่ยน YAML property ผ่าน Dataview query เพราะ Dataview เหมาะกับ read/report
- อย่าใช้ Base หรือ Dataview เป็น workflow engine, scheduler, approval enforcement หรือ distributed lock
- ตรวจ controlled vocabulary เป็นระยะ เช่น status ต้องมีเพียง `ready`, ไม่ใช่ `Ready`, `todo`, `open`, `pending` ปะปน
- สำหรับ task ความเสี่ยงสูง ให้ task note link ไป `[[Approval Rules]]`, workflow ที่ใช้ และหลักฐานการอนุมัติเสมอ

## Recommendation

สำหรับ vault ของคุณ ให้ใช้ทั้งคู่ทันทีเมื่อเริ่มมี:

- tasks มากกว่า 15–20 รายการ
- อย่างน้อย 3 workflows
- tasks ที่มี `approval_required`, `blocked_by`, `due` หรือ `owner`
- documentation ที่ต้อง review เป็นรอบ
- ความต้องการ daily briefing หรือ weekly operational report

เริ่มจาก 3 ไฟล์ก่อน:

```text
10-bases/Tasks.base
10-bases/Approvals.base
00-mocs/Dashboard - Operations.md
```

แล้วใช้ Dataview เป็นหน้า “ตัดสินใจ” และ Bases เป็นหน้า “จัดการข้อมูล” จะได้ระบบที่ไม่ซ้ำซ้อนและขยายต่อไปได้ดีครับ.

การอ้างอิง:
[1] Obsidian Bases for AI Meeting Notes: A Database Without a ... https://www.shadow.do/blog/obsidian-bases-ai-meeting-notes-2026
[2] Obsidian Bases: How to Build No-Code Databases in Your Vault https://www.obsibrain.com/blog/obsidian-bases-guide
[3] 5 Obsidian Tips for Better Note-Taking - OpenReplay Blog https://blog.openreplay.com/5-obsidian-note-taking-tips/
[4] Obsidian - Bases Insider Release (2025) - brainfeed.ai https://brainfeed.ai/pages/obsidian-bases-insider-release-2025-VxR9J.html
[5] Obsibrain Blog https://www.obsibrain.com/blog
[6] How I Turned 20,000 Notes Into Live Dashboards With ... https://www.dsebastien.net/how-i-turned-20-000-notes-into-live-dashboards-with-obsidian-bases/
[7] Goodbye Dataview! Hello Obsidian Bases! | Daniel Lyons https://dandylyons.net/posts/goodbye-dataview-hello-obsidian-bases/
[8] Obsidian Bases vs Dataview for Freelance Workflow - LinkedIn https://www.linkedin.com/posts/eran-cohen-550788215_obsidianai-pkm-knowledgemanagement-activity-7490662993232506880-P0Rm
[9] wiki-dashboard • obsidian-wiki • Ar9av • Skills • Registry - Tessl https://tessl.io/registry/skills/github/Ar9av/obsidian-wiki/wiki-dashboard
[10] How to Migrate to Obsidian Bases from Dataview - Practical PKM https://practicalpkm.com/moving-to-obsidian-bases-from-dataview/
[11] obsidianmate.com › article › obsidian-propertiesObsidian Properties: The Complete Guide | Obsidian Mate https://obsidianmate.com/article/obsidian-properties-complete-guide
ขอตัวอย่างโครงสร้าง folder ใน Vault ด้วยครับ

ด้านล่างเป็นโครงสร้าง Vault ที่เหมาะกับการใช้ **Obsidian + AI Agent + Bases + Dataview + GitHub + Supabase + Vercel** โดยแยกตาม “หน้าที่ของข้อมูล” ไม่ใช่แยกตาม tag หรือหัวข้อเพียงอย่างเดียว: งานปัจจุบัน, ความรู้ถาวร, workflow, operational state, dashboard และ archive

แนวทางนี้ใช้โฟลเดอร์แบบมีเลขนำหน้าเพื่อให้เรียงใน sidebar สม่ำเสมอ, เก็บ attachments/templates/bases แยกชัดเจน, และใช้ MOC/links สำหรับการเชื่อมโยงข้ามโดเมนแทนการซ้อนโฟลเดอร์ลึกเกินไป[1][2][3]

## Recommended Vault Structure

```text
agent-operations-vault/
│
├── README.md
├── AGENTS.md
├── TASKS.md
├── CHANGELOG.md
│
├── 00-inbox/
│   ├── Inbox.md
│   ├── Unprocessed Research.md
│   └── Agent Captures/
│
├── 01-dashboards/
│   ├── Dashboard - Home.md
│   ├── Dashboard - Operations.md
│   ├── Dashboard - Daily Briefing.md
│   ├── Dashboard - Knowledge Health.md
│   ├── Dashboard - Security and Approval.md
│   └── Dashboard - Vercel Cost and Cache.md
│
├── 02-mocs/
│   ├── MOC - Home.md
│   ├── MOC - Document Operations.md
│   ├── MOC - AI Agent Operations.md
│   ├── MOC - Engineering.md
│   ├── MOC - Supabase.md
│   ├── MOC - Vercel.md
│   ├── MOC - GitHub.md
│   ├── MOC - Security.md
│   ├── MOC - Workflows.md
│   └── MOC - Tasks.md
│
├── 03-governance/
│   ├── Policy - Approval Rules.md
│   ├── Policy - Security.md
│   ├── Policy - Agent Permissions.md
│   ├── Policy - Documentation Standards.md
│   ├── Policy - Data Classification.md
│   ├── Policy - Secret Management.md
│   ├── Policy - Change Management.md
│   ├── Policy - Retention and Archive.md
│   └── Policy - AI Agent Governance.md
│
├── 04-context/
│   ├── Business Context.md
│   ├── Product Overview.md
│   ├── Team and Ownership.md
│   ├── Glossary.md
│   ├── System Inventory.md
│   ├── Environment Inventory.md
│   └── External Integrations.md
│
├── 05-architecture/
│   ├── System Overview.md
│   ├── Agent Architecture.md
│   ├── Data Flow.md
│   ├── Integration Map.md
│   ├── Security Architecture.md
│   ├── Deployment Architecture.md
│   ├── decisions/
│   │   ├── ADR 001 - Local First Knowledge.md
│   │   ├── ADR 002 - Task Metadata Model.md
│   │   └── ADR 003 - Cache Invalidation Strategy.md
│   └── canvas/
│       ├── Canvas - Agent Architecture.canvas
│       ├── Canvas - Deployment Flow.canvas
│       └── Canvas - Knowledge Graph.canvas
│
├── 06-domains/
│   ├── supabase/
│   │   ├── Overview.md
│   │   ├── Schema Conventions.md
│   │   ├── Migration Safety.md
│   │   ├── RLS Policy.md
│   │   ├── Concurrency and Idempotency.md
│   │   └── Database Incident Guide.md
│   │
│   ├── vercel/
│   │   ├── Overview.md
│   │   ├── Deployment Workflow.md
│   │   ├── Deployment Retention and Recovery.md
│   │   ├── Cache-Control and Cache Tags.md
│   │   ├── Cache Invalidation.md
│   │   ├── Rate Limiting and Cost Control.md
│   │   └── REST API Docs Cron Job.md
│   │
│   ├── github/
│   │   ├── Overview.md
│   │   ├── Branching Strategy.md
│   │   ├── Pull Request Review.md
│   │   ├── Commit Convention.md
│   │   ├── Dependency Management.md
│   │   ├── Package Lockfile Conflicts.md
│   │   └── Release Process.md
│   │
│   ├── integrations/
│   │   ├── Connection Management.md
│   │   ├── OAuth and Token Safety.md
│   │   ├── Webhook Security.md
│   │   └── Connector Inventory.md
│   │
│   └── ai-agents/
│       ├── Agent Operating Model.md
│       ├── Agent Task Prioritization.md
│       ├── Agent Error Handling.md
│       ├── Agent Knowledge Retrieval.md
│       ├── Agent Handover.md
│       └── Concurrent Agent Coordination.md
│
├── 07-workflows/
│   ├── Workflow - Task Management.md
│   ├── Workflow - Daily Briefing.md
│   ├── Workflow - Standup.md
│   ├── Workflow - Pull Request Review.md
│   ├── Workflow - Supabase Change.md
│   ├── Workflow - Vercel Cache Invalidation.md
│   ├── Workflow - REST API Documentation Sync.md
│   ├── Workflow - Dependency Update.md
│   ├── Workflow - Documentation Review.md
│   └── Workflow - Incident Triage.md
│
├── 08-runbooks/
│   ├── Runbook - CDN Cache Incident.md
│   ├── Runbook - Vercel Deployment Restore.md
│   ├── Runbook - Lockfile Merge Conflict.md
│   ├── Runbook - package.json Lockfile Mismatch.md
│   ├── Runbook - Supabase Migration Failure.md
│   ├── Runbook - RLS Access Issue.md
│   ├── Runbook - Rollback Deployment.md
│   ├── Runbook - Cron Job Failure.md
│   └── Runbook - Agent Tool Failure.md
│
├── 09-projects/
│   ├── Project - API Documentation Automation/
│   │   ├── Project - API Documentation Automation.md
│   │   ├── Scope.md
│   │   ├── Decisions.md
│   │   ├── Reports/
│   │   └── Assets/
│   │
│   ├── Project - Supabase Reliability/
│   │   ├── Project - Supabase Reliability.md
│   │   ├── Scope.md
│   │   ├── Decisions.md
│   │   └── Reports/
│   │
│   └── Project - Agent Knowledge System/
│       ├── Project - Agent Knowledge System.md
│       ├── Scope.md
│       ├── Decisions.md
│       └── Reports/
│
├── 10-tasks/
│   ├── active/
│   │   ├── Task - Inspect Supabase Schema.md
│   │   ├── Task - Review Vercel Cache Headers.md
│   │   └── Task - Invalidate API Docs Cache.md
│   ├── waiting/
│   │   ├── Task - Await Production Migration Approval.md
│   │   └── Task - Await Write Grant.md
│   ├── done/
│   │   └── Task - Completed Example.md
│   └── archived/
│       └── 2026-Q4/
│
├── 11-reports/
│   ├── daily/
│   │   └── 2026-10-04 - Daily Operations.md
│   ├── weekly/
│   │   └── 2026-W40 - Weekly Operations.md
│   ├── incident/
│   ├── security/
│   ├── reviews/
│   └── audits/
│
├── 12-bases/
│   ├── Tasks.base
│   ├── Workflows.base
│   ├── Approvals.base
│   ├── Projects.base
│   ├── Knowledge Health.base
│   └── Document Review.base
│
├── 13-templates/
│   ├── Template - Task.md
│   ├── Template - Workflow.md
│   ├── Template - Runbook.md
│   ├── Template - Policy.md
│   ├── Template - Project.md
│   ├── Template - ADR.md
│   ├── Template - Daily Report.md
│   ├── Template - Weekly Report.md
│   ├── Template - Incident.md
│   └── Template - Knowledge Note.md
│
├── 14-assets/
│   ├── images/
│   ├── pdfs/
│   ├── diagrams/
│   ├── exports/
│   └── attachments/
│
├── 15-reference/
│   ├── API Contracts.md
│   ├── SQL Patterns.md
│   ├── Coding Standards.md
│   ├── External Systems.md
│   ├── Glossary Extensions.md
│   └── Research Notes/
│
├── 16-logs/
│   ├── Agent Activity/
│   ├── Automation/
│   ├── Cache Invalidation/
│   ├── Approvals/
│   └── Cron Runs/
│
├── 17-private/
│   └── README - Do Not Store Secrets Here.md
│
├── 90-archive/
│   ├── deprecated/
│   ├── completed-projects/
│   ├── old-reports/
│   ├── old-tasks/
│   └── historical-decisions/
│
└── 99-system/
    ├── Obsidian Metadata Standard.md
    ├── Tag Taxonomy.md
    ├── Naming Convention.md
    ├── Vault Guide.md
    ├── Plugin Configuration.md
    ├── Indexing Rules.md
    ├── Agent Integration Contract.md
    ├── scripts/
    └── .gitkeep
```

## แก่นของแต่ละโฟลเดอร์

| Folder | เก็บอะไร | Agent ใช้อย่างไร |
|---|---|---|
| `00-inbox` | ข้อมูลดิบ ยังไม่จัดหมวด | อ่านได้ แต่ไม่ใช่ policy หรือ source of truth |
| `01-dashboards` | Dataview landing pages และ daily/weekly view | อ่านเพื่อเลือกงานและเห็นภาพรวม |
| `02-mocs` | Map of Content และ navigation hub | ใช้หาบริบทและเอกสารที่เกี่ยวข้อง |
| `03-governance` | Policy, approval, security, permissions | Agent ต้องอ่านก่อน action สำคัญ |
| `04-context` | บริบทธุรกิจ ทีม ระบบ และ environment | ใช้ตีความงานและเลือก target |
| `05-architecture` | System design, data flow, ADR, Canvas | ใช้ก่อนออกแบบหรือเปลี่ยนระบบใหญ่ |
| `06-domains` | ความรู้เฉพาะ Supabase, Vercel, GitHub, integrations | เลือกอ่านตามระบบที่เกี่ยวข้อง |
| `07-workflows` | ขั้นตอนทำงานซ้ำได้ | Agent ใช้เป็น execution guide |
| `08-runbooks` | แก้ incident, failure, rollback | ใช้เมื่อระบบผิดปกติหรือมี error |
| `09-projects` | scope/decision/report ของงานมีเป้าหมาย | เชื่อม task หลายงานเข้าด้วยกัน |
| `10-tasks` | task note แบบ one-file-per-task | Source of truth สำหรับ state งาน |
| `11-reports` | report ที่มี timestamp | ใช้ดู history ไม่ใช่กฎปัจจุบัน |
| `12-bases` | `.base` operational views | เปิดจัดการ task/workflow/properties |
| `13-templates` | Template มาตรฐาน | Agent ใช้สร้าง note ใหม่ |
| `14-assets` | PDF, image, diagram, export | embed/reference; ไม่ควรเป็น logic หลัก |
| `15-reference` | lookup/reference ที่ไม่ใช่ policy | ใช้ประกอบการตัดสินใจ |
| `16-logs` | audit และ automation logs | ใช้ trace/debug; ไม่ใช่ knowledge หลัก |
| `17-private` | placeholder เตือนเรื่องข้อมูล sensitive | ไม่เก็บ secrets จริง |
| `90-archive` | ของเก่า/เลิกใช้/เสร็จแล้ว | Agent ไม่ใช้เป็น guidance ปัจจุบัน |
| `99-system` | schema, conventions, indexing, scripts | อ่านเมื่อสร้าง/validate vault content |

## ปรับให้เริ่มง่าย

โครงสร้างเต็มด้านบนเหมาะเมื่อ vault มี agent workflow หลายตัว แต่คุณไม่ต้องสร้างทุกโฟลเดอร์ตั้งแต่วันแรก

เริ่มด้วยเวอร์ชันนี้ก่อน:

```text
agent-vault/
├── README.md
├── AGENTS.md
├── TASKS.md
│
├── 00-inbox/
├── 01-dashboards/
│   ├── Dashboard - Operations.md
│   └── Dashboard - Daily Briefing.md
│
├── 02-mocs/
│   ├── MOC - Home.md
│   ├── MOC - Document Operations.md
│   └── MOC - Engineering.md
│
├── 03-governance/
│   ├── Policy - Approval Rules.md
│   ├── Policy - Documentation Standards.md
│   └── Policy - Security.md
│
├── 06-domains/
│   ├── supabase/
│   ├── vercel/
│   └── github/
│
├── 07-workflows/
│   ├── Workflow - Task Management.md
│   ├── Workflow - Supabase Change.md
│   └── Workflow - Pull Request Review.md
│
├── 08-runbooks/
│   ├── Runbook - Lockfile Merge Conflict.md
│   └── Runbook - Rollback Deployment.md
│
├── 10-tasks/
│   ├── active/
│   ├── waiting/
│   └── done/
│
├── 12-bases/
│   ├── Tasks.base
│   └── Approvals.base
│
├── 13-templates/
│   ├── Template - Task.md
│   └── Template - Workflow.md
│
├── 14-assets/
│   └── attachments/
│
├── 90-archive/
│
└── 99-system/
    ├── Obsidian Metadata Standard.md
    └── Vault Guide.md
```

## Naming conventions

ใช้ naming convention แบบนี้เพื่อให้ search, MOC, Agent และ Git diff อ่านง่าย:

```text
Policy - Approval Rules.md
Workflow - Supabase Change.md
Runbook - CDN Cache Incident.md
Task - Inspect Supabase Schema.md
Project - API Documentation Automation.md
Dashboard - Operations.md
MOC - Vercel.md
ADR 001 - Local First Knowledge.md
2026-10-04 - Daily Operations.md
2026-W40 - Weekly Operations.md
```

สำหรับ task ที่ต้องเรียงตามเวลาหรือ query ให้เก็บวันไว้ใน frontmatter แทนการใส่ timestamp ในชื่อไฟล์ ยกเว้น daily/weekly report และ log ที่เวลาคือ identity ของเอกสาร

## สำคัญ: ไม่เก็บ Secrets

แม้จะมี `17-private/` ก็ไม่ควรเก็บสิ่งต่อไปนี้ไว้ใน Vault หรือ Git:

```text
API keys
Vercel tokens
Supabase service_role key
Database URL ที่มี password
OAuth refresh token
SSH private key
Webhook secret
Production credentials
Customer PII exports
```

ให้เก็บใน secret manager, environment variables หรือ password manager แล้วใส่เพียงชื่อ secret/reference ใน vault เช่น:

```yaml
secret_reference: VERCEL_AUTOMATION_TOKEN
```

## Git และ Obsidian config

แนะนำ `.gitignore`:

```gitignore
# Obsidian workspace and personal UI state
.obsidian/workspace.json
.obsidian/workspace-mobile.json

# Trash
.trash/

# OS files
.DS_Store
Thumbs.db

# Local secrets and environment files
.env
.env.*
*.pem
*.key
*.p12

# Optional: generated logs if too noisy
16-logs/**/*.jsonl
16-logs/**/*.log
```

ให้ commit `.obsidian/` เฉพาะ settings ที่แชร์ร่วมกัน เช่น plugins, hotkeys, app settings หากทีมใช้ชุดเดียวกัน แต่ไม่ commit workspace layout ส่วนตัว เพราะสร้าง conflict บ่อย

## Navigation flow สำหรับ Agent

กำหนดใน `AGENTS.md` ให้ Agent ใช้ flow นี้:

```text
1. Read AGENTS.md
2. Read TASKS.md or open 01-dashboards/Dashboard - Operations.md
3. Open the relevant task note from 10-tasks/
4. Read uses_workflow from 07-workflows/
5. Read related domain knowledge from 06-domains/
6. Read governance policy from 03-governance/ when action is state-changing
7. Use 08-runbooks/ when failure or incident occurs
8. Update task note and write report/log only after allowed action
9. Move completed work to done/ and archive on the defined retention cycle
```

การจัด folder ตาม **intent/workflow** แล้วใช้ Properties, tags และ wiki links สำหรับหัวข้อข้ามโดเมน ทำให้ vault ไม่แข็งตัวเมื่อโน้ตหนึ่งเกี่ยวกับหลายระบบ เช่น task เดียวที่แตะทั้ง Vercel, Supabase และ GitHub ครับ[2][4]

การอ้างอิง:
[1] Designing a Machine-Readable Knowledge Base with Obsidian https://www.jamescroft.co.uk/designing-a-machine-readable-knowledge-base-with-obsidian/
[2] Directory Structure Reference | thor314/obsidian-setup | DeepWiki https://deepwiki.com/thor314/obsidian-setup/9-directory-structure-reference
[3] github.com › KalebCole › obsidian-setupGitHub - KalebCole/obsidian-setup: Obsidian + AI Agent vault ... https://github.com/KalebCole/obsidian-setup
[4] 12 Proven Obsidian Techniques for Researchers https://www.trendix.tech/12-proven-obsidian-techniques-for-researchers/
[5] Vault Reorganizer - Obsidian Plugin https://community.obsidian.md/plugins/vault-reorganizer
[6] hoonsubin/obsidian-research-vault-template: This is a ... https://github.com/hoonsubin/obsidian-research-vault-template
[7] GUIDE-Demarrage-Rapide (3) - CCPLC https://publish.obsidian.md/ccplc/_OPS/00-META/GUIDE-Demarrage-Rapide+(3)
[8] GitHub - BryanHogan/obsidian-vault-template: A ... https://github.com/BryanHogan/obsidian-vault-template
[9] Help with structure for STEM thesis vault! https://www.reddit.com/r/ObsidianMD/comments/137waw1/help_with_structure_for_stem_thesis_vault/
[10] Vault File Structure | mathisgauthey/obsidian-workflow ... https://deepwiki.com/mathisgauthey/obsidian-workflow-template-docs/3.4-vault-file-structure
[11] How to Build an AI Second Brain with Claude Code and Obsidian https://www.mindstudio.ai/blog/build-ai-second-brain-claude-code-obsidian
[12] folder_structure - Obsidian Publish https://publish.obsidian.md/active-inference/docs/repo_docs/folder_structure
[13] obsidian-vault-template/README.md at main · voidashi/obsidian-vault-template https://github.com/voidashi/obsidian-vault-template/blob/main/README.md
[14] Claude.Md Content https://gist.github.com/gopaljigaur/dc4eaa5bbed6d1bbb9f798647d44eda7
วิธีจัดการ MOCs และ Links ใน Vault นี้

ให้จัดการ MOC และ Links แบบ “**MOC เป็น navigation layer, Links เป็น semantic relationship layer**” ครับ กล่าวคือ MOC ไม่ควรเป็นสารบัญที่รวมทุกไฟล์แบบยาว ๆ แต่เป็นหน้า hub ที่ช่วยให้คนและ Agent รู้ว่าเริ่มอ่านจากไหน, งานไหนเกี่ยวข้องกัน, และเอกสารใดเป็นกฎ/ขั้นตอน/แหล่งอ้างอิงหลัก

MOC คือโน้ตที่ curate links ของหัวข้อหนึ่ง ส่วน wiki links `[[...]]` และ backlinks ทำให้ Obsidian สร้างความสัมพันธ์ระหว่างโน้ตอัตโนมัติ[1][2]

## โครงสร้าง MOC ที่แนะนำ

ใช้ 3 ระดับพอ:

```text
MOC - Home
│
├── MOC - Document Operations
├── MOC - AI Agent Operations
├── MOC - Engineering
├── MOC - Security
├── MOC - Supabase
├── MOC - Vercel
└── MOC - GitHub
```

จากนั้น MOC ระดับโดเมนค่อย link ไปยัง:

```text
MOC - Vercel
├── Overview
├── Policies
├── Workflows
├── Runbooks
├── Active Projects
├── Dashboards
└── Related Domains
```

อย่าทำ MOC ระดับที่ 4 หรือ 5 เว้นแต่โดเมนนั้นใหญ่มากจริง ๆ เพราะ Agent และคนจะหลง path ได้ง่าย

## 1. MOC - Home

ไฟล์:

```text
02-mocs/MOC - Home.md
```

```markdown
---
id: moc-home
title: Vault Home
aliases:
  - Home
  - Vault Home
  - Main MOC
  - Knowledge Home
type: moc
domain: operations
status: active
owner: engineering
risk: low
review_cycle: quarterly
last_reviewed: 2026-10-04
created: 2026-10-04
updated: 2026-10-04
tags:
  - moc
  - home
  - navigation
  - knowledge-management
related:
  - "[[MOC - Document Operations]]"
  - "[[MOC - AI Agent Operations]]"
  - "[[MOC - Engineering]]"
  - "[[MOC - Security]]"
---

# MOC - Home

> [!summary]
> จุดเริ่มต้นของ Vault สำหรับคนและ AI Agent
>
> เริ่มที่ [[AGENTS]] เมื่อ Agent ต้องทำงาน  
> เริ่มที่ [[Dashboard - Operations]] เมื่อผู้ใช้ต้องดูสถานะงาน  
> เริ่มที่ MOC ตามโดเมนเมื่อต้องค้นหาความรู้

[[moc]] [[home]] [[navigation]] [[knowledge-management]]

## Start Here

| หากต้องการ | เปิด |
|---|---|
| ดูงานที่ต้องทำตอนนี้ | [[Dashboard - Operations]] |
| ดูแผนรายวัน | [[Dashboard - Daily Briefing]] |
| ดู task และ approval | [[Tasks.base]] · [[Approvals.base]] |
| ให้ Agent เริ่มงาน | [[AGENTS]] |
| ดูกฎ approval | [[Policy - Approval Rules]] |
| ดูมาตรฐานเอกสาร | [[Policy - Documentation Standards]] |
| เพิ่ม task ใหม่ | [[Template - Task]] |
| สร้าง workflow ใหม่ | [[Template - Workflow]] |

## Main Maps

- [[MOC - Document Operations]]
- [[MOC - AI Agent Operations]]
- [[MOC - Engineering]]
- [[MOC - Security]]
- [[MOC - Supabase]]
- [[MOC - Vercel]]
- [[MOC - GitHub]]
- [[MOC - Workflows]]
- [[MOC - Tasks]]

## Current Operations

- [[Dashboard - Operations]]
- [[Dashboard - Daily Briefing]]
- [[Dashboard - Security and Approval]]
- [[Tasks.base]]
- [[Workflows.base]]
- [[Approvals.base]]

## Governance

- [[Policy - Approval Rules]]
- [[Policy - Security]]
- [[Policy - Agent Permissions]]
- [[Policy - Documentation Standards]]
- [[AGENTS]]

## Maintenance

- [[Obsidian Metadata Standard]]
- [[Tag Taxonomy]]
- [[Naming Convention]]
- [[Vault Guide]]
- [[Knowledge Health.base]]
```

## 2. MOC - Supabase

ตัวอย่าง MOC เชิงโดเมนที่มีทั้ง policy, workflow, runbook และ context:

```markdown
---
id: moc-supabase
title: Supabase
aliases:
  - Supabase MOC
  - Database Operations
  - Database Knowledge Hub
type: moc
domain: supabase
status: active
owner: engineering
risk: high
review_cycle: quarterly
last_reviewed: 2026-10-04
created: 2026-10-04
updated: 2026-10-04
tags:
  - moc
  - supabase
  - database
  - engineering
related:
  - "[[MOC - Engineering]]"
  - "[[MOC - Security]]"
  - "[[MOC - AI Agent Operations]]"
  - "[[Policy - Approval Rules]]"
---

# MOC - Supabase

> [!summary]
> ศูนย์รวมความรู้และ operational guidance สำหรับ Supabase:
> schema, migrations, RLS, concurrency, incident response และ Agent safety rules

[[moc]] [[supabase]] [[database]] [[engineering]]

## Start Here

- [[Supabase - Overview]]
- [[Supabase - Schema Conventions]]
- [[Supabase - Migration Safety]]
- [[Supabase - RLS Policy]]
- [[Supabase - Concurrency and Idempotency]]

## Governance

- [[Policy - Approval Rules]]
- [[Policy - Security]]
- [[Policy - Change Management]]
- [[Policy - Agent Permissions]]

## Workflows

- [[Workflow - Supabase Change]]
- [[Workflow - Supabase Schema Inspection]]
- [[Workflow - Supabase Migration Review]]
- [[Workflow - Database Incident Triage]]

## Runbooks

- [[Runbook - Supabase Migration Failure]]
- [[Runbook - RLS Access Issue]]
- [[Runbook - Database Connection Failure]]
- [[Runbook - Database Rollback]]

## Current Work

```dataview
TABLE
  priority AS Priority,
  status AS Status,
  owner AS Owner,
  due AS Due,
  approval_status AS Approval
FROM "10-tasks"
WHERE type = "task"
  AND domain = "supabase"
  AND status != "done"
  AND status != "cancelled"
SORT choice(priority = "P0", 0, choice(priority = "P1", 1, choice(priority = "P2", 2, 3))) ASC,
     due ASC
```

## Related Domains

- [[MOC - Vercel]]
- [[MOC - GitHub]]
- [[MOC - Security]]
- [[MOC - Engineering]]

## Agent Navigation Notes

- ก่อนสร้างหรือแก้ schema ให้เปิด [[Workflow - Supabase Change]]
- ก่อนรัน migration ให้ตรวจ [[Supabase - Migration Safety]] และ [[Policy - Approval Rules]]
- เมื่อเกิด migration failure ให้เปิด [[Runbook - Supabase Migration Failure]]
- Source of truth สำหรับ schema คือ live database และ remote migration history ไม่ใช่ local documentation เพียงอย่างเดียว
```

## 3. MOC - Document Operations

MOC นี้ไม่จำเป็นต้อง link เอกสารทุกฉบับ แต่ต้องชี้ “เอกสารที่กำกับการสร้างและดูแลความรู้”:

```markdown
# MOC - Document Operations

## Start Here

- [[Policy - Documentation Standards]]
- [[Obsidian Metadata Standard]]
- [[Naming Convention]]
- [[Tag Taxonomy]]
- [[Template - Knowledge Note]]
- [[Template - Workflow]]
- [[Template - Runbook]]

## Lifecycle

- [[Workflow - Documentation Review]]
- [[Policy - Retention and Archive]]
- [[Dashboard - Knowledge Health]]
- [[Knowledge Health.base]]

## Governance

- [[Policy - Approval Rules]]
- [[Policy - Security]]
- [[AGENTS]]

## Operational Views

- [[Workflows.base]]
- [[Document Review.base]]
- [[Dashboard - Operations]]

## Related Maps

- [[MOC - AI Agent Operations]]
- [[MOC - Engineering]]
- [[MOC - Security]]
```

## Link rules

### ใช้ Wiki Link เมื่อมี relationship จริง

อย่า link เพื่อให้ graph สวย แต่ link เมื่อ relation มีความหมาย เช่น:

```markdown
This workflow is governed by [[Policy - Approval Rules]].

Before execution, validate against [[Supabase - Migration Safety]].

If validation fails, use [[Runbook - Supabase Migration Failure]].

This task implements [[Project - Supabase Reliability]].
```

คำกริยาหน้า link สำคัญมาก เพราะบอก Agent ว่าควรตีความ link อย่างไร:

| Relationship | ตัวอย่าง |
|---|---|
| Governed by | `Governed by [[Policy - Approval Rules]]` |
| Uses workflow | `Use [[Workflow - Supabase Change]]` |
| Escalates to | `Escalate using [[Runbook - Database Incident]]` |
| Depends on | `Depends on [[Task - Inspect Schema]]` |
| Implements | `Implements [[Project - API Documentation Automation]]` |
| Replaced by | `Superseded by [[Workflow - New Release Process]]` |
| Validated by | `Validated by [[Runbook - Smoke Test]]` |
| Source of truth | `Source of truth: [[Supabase Live Schema]]` |

## Use Properties for structural links

สำหรับความสัมพันธ์ที่ Agent หรือ dashboard ต้อง query ได้ ให้ใส่ใน YAML properties ด้วย ไม่ใช้แค่ link ใน body

### Workflow

```yaml
---
type: workflow
domain: supabase
governed_by:
  - "[[Policy - Approval Rules]]"
  - "[[Policy - Security]]"
related:
  - "[[Supabase - Migration Safety]]"
  - "[[Runbook - Supabase Migration Failure]]"
rollback_workflow: "[[Runbook - Database Rollback]]"
---
```

### Task

```yaml
---
type: task
project: "[[Project - Supabase Reliability]]"
uses_workflow: "[[Workflow - Supabase Change]]"
dependencies:
  - "[[Task - Inspect Supabase Schema]]"
blocked_by: []
governed_by:
  - "[[Policy - Approval Rules]]"
related:
  - "[[Supabase - Migration Safety]]"
---
```

### Policy

```yaml
---
type: policy
applies_to:
  - "[[Workflow - Supabase Change]]"
  - "[[Workflow - Vercel Cache Invalidation]]"
supersedes:
related:
  - "[[Policy - Security]]"
---
```

## Link density guideline

ทุก note ไม่ต้องมี links มากเท่ากัน ให้ใช้ตามบทบาทของ note:

| Note type | Links โดยประมาณ | เป้าหมาย |
|---|---:|---|
| MOC | 10–30 | นำทาง/curate |
| Policy | 3–8 | scope และ governance |
| Workflow | 4–10 | policy, inputs, runbook, validation |
| Runbook | 3–8 | escalation, rollback, related workflow |
| Task | 2–6 | project, workflow, dependency, evidence |
| Project | 5–15 | goal, task, decision, report |
| Reference | 1–5 | source และ related concepts |
| Daily report | 2–8 | task/result/blocker |

อย่าถือว่าเป็นกฎตายตัว แต่ถ้า workflow ไม่มี links เลย มักแปลว่า Agent ไม่มีทางไปหา policy หรือ runbook ต่อ; ถ้า task มี 20 links มักแปลว่าควรแยก context ไป project/workflow note

## Backlinks workflow

Backlinks คือเครื่องมือ impact analysis:

1. ก่อนแก้ policy ให้ดู backlinks เพื่อรู้ว่า workflow ใดอ้างอิง
2. ก่อน deprecate workflow ให้ดู task/runbook/project ที่ยัง link อยู่
3. ก่อนย้ายหรือ rename note ให้ตรวจ inbound links
4. ก่อนสร้าง note ใหม่ ให้ดู unlinked mentions ว่ามี note เดิมอยู่แล้วหรือไม่
5. เมื่อสร้าง workflow ใหม่ ให้ link กลับไปยัง MOC และ policy หลักอย่างน้อยหนึ่งรายการ

ตัวอย่าง:

```text
กำลังเปลี่ยน [[Policy - Approval Rules]]
        ↓
ดู Backlinks
        ↓
พบ [[Workflow - Supabase Change]]
พบ [[Workflow - Vercel Cache Invalidation]]
พบ [[Task - Production Migration]]
        ↓
ประเมินผลกระทบก่อน publish policy ใหม่
```

Obsidian backlinks แสดง incoming references และยังช่วยหา unlinked mentions ได้ จึงใช้ตรวจความสัมพันธ์และลดเอกสารซ้ำได้[2]

## Link syntax ที่ควรใช้

```markdown
[[MOC - Supabase]]
[[Policy - Approval Rules]]
[[Workflow - Supabase Change#Preconditions]]
[[Runbook - Migration Failure#Rollback]]
[[Task - Inspect Schema|Schema inspection task]]
![[Canvas - Agent Architecture]]
```

### ใช้ heading links สำหรับ Agent

เมื่อ Agent ต้องการเฉพาะส่วนของเอกสาร ให้ link ระดับ heading:

```markdown
Before creating a migration, follow
[[Supabase - Migration Safety#Pre-Migration Checklist]].

For production cache invalidation, follow
[[Vercel Cache-Control and Cache Tags#CDN Invalidation Rules]].
```

ประโยชน์คือ Agent ไม่ต้องอ่านไฟล์ทั้งฉบับทุกครั้ง และลด context load

## MOC maintenance schedule

| เมื่อไร | สิ่งที่ต้องทำ |
|---|---|
| สร้าง note ใหม่ | เพิ่มใน MOC หลัก 1 แห่ง และ related MOC ถ้ามี relationship จริง |
| Publish policy/workflow | เพิ่มใน domain MOC และ Document Operations MOC |
| เปลี่ยน status เป็น deprecated | แก้ MOC ให้ชี้ไป note ทดแทน |
| ปิด project | ย้ายลิงก์จาก Current Work ไป Completed/Archive |
| ทุกสัปดาห์ | ตรวจ orphan notes ที่ active ไม่มี inbound/outbound link |
| ทุกเดือน | ตรวจ broken links, placeholder links, MOC ที่ยาวเกิน 30–40 links |
| ทุกไตรมาส | review MOC structure และ archive obsolete navigation |

## Agent rules

เพิ่มส่วนนี้ใน `AGENTS.md`:

```markdown
## MOC and Linking Rules

- Start from `[[MOC - Home]]` when the relevant domain is unclear.
- Read the domain MOC before creating a new policy, workflow, runbook, or project note.
- Search for an existing active note before creating a new one.
- Add each new active note to exactly one primary MOC.
- Add it to a secondary MOC only when the relationship is meaningful.
- Use explicit relationship language near wiki links: governed by, uses, depends on,
  implements, validated by, escalates to, superseded by.
- Store queryable relationships in YAML properties, not only in note body text.
- Link to headings when only a specific procedure or checklist is relevant.
- Do not create links only to improve graph appearance.
- Before deprecating, renaming, moving, or deleting a note, inspect backlinks and
  update affected MOCs, workflows, tasks, and references.
- Do not use archived or deprecated notes as active operational guidance.
```

## Recommended first set

เริ่มสร้าง MOC เพียง 6 หน้าแรกก่อน:

```text
MOC - Home
MOC - Document Operations
MOC - AI Agent Operations
MOC - Supabase
MOC - Vercel
MOC - GitHub
```

เมื่อ knowledge โตขึ้นค่อยเพิ่ม:

```text
MOC - Security
MOC - Engineering
MOC - Workflows
MOC - Tasks
MOC - Projects
```

หลักตัดสินใจง่ายที่สุด:

> **Folder บอกว่า note อยู่ที่ไหน; MOC บอกว่า note ควรเริ่มอ่านตอนไหน; Link บอกว่า note เกี่ยวข้องกันอย่างไร**

ใช้ทั้งสามอย่างร่วมกัน จะทำให้ Vault ของคุณนำทางได้ดีสำหรับทั้งคนและ AI Agent โดยไม่ต้องพึ่งโฟลเดอร์ลึกหรือ tag จำนวนมากครับ.

การอ้างอิง:
[1] How to use Maps of Content (MOC) - mycommonplacebook https://publish.obsidian.md/mycommonplacebook/How+to+use+Maps+of+Content+(MOC)
[2] deepwiki.com › obsidianmd › obsidian-helpInternal Links and Backlinks | obsidianmd/obsidian-help ... https://deepwiki.com/obsidianmd/obsidian-help/4.2-internal-links-and-backlinks
[3] Advanced Techniques: Plugins... https://vault.nimc.gov.ng/blog/master-obsidian-linking-your-folders-seamlessly-1764803157
[4] Understand creating Your First MOC Note - StudyRaid https://app.studyraid.com/en/read/43741/2027774/creating-your-first-moc-note
[5] How I use Obsidian and MOC's to Manage My Vault https://www.reddit.com/r/ObsidianMD/comments/1f4o2ch/how_i_use_obsidian_and_mocs_to_manage_my_vault/
[6] Organize Notes in Obsidian Using MOC (Map of Content) https://blog.shuvangkardas.com/obsidian-moc-map-of-content/

https://www.perplexity.ai/search/fb4cc104-f024-465c-a834-88fc0e45896f#27

https://www.perplexity.ai/search/fb4cc104-f024-465c-a834-88fc0e45896f#28

https://www.perplexity.ai/search/fb4cc104-f024-465c-a834-88fc0e45896f#29

https://www.perplexity.ai/search/fb4cc104-f024-465c-a834-88fc0e45896f#30

https://www.perplexity.ai/search/fb4cc104-f024-465c-a834-88fc0e45896f#31

https://www.perplexity.ai/search/fb4cc104-f024-465c-a834-88fc0e45896f#32

https://www.perplexity.ai/search/fb4cc104-f024-465c-a834-88fc0e45896f#33
More about Obsidian

Obsidian มีมากกว่าแค่จดโน้ตครับ—สำหรับ Vault ของคุณ มันสามารถเป็น **local-first knowledge operating system** สำหรับเอกสาร, workflows, tasks, dashboards, agent context และการทบทวนความรู้แบบมี version control ได้ เพราะทุกอย่างอยู่ในไฟล์ Markdown และ YAML ที่คุณควบคุมเอง[1][2]

## พื้นฐานที่ควรรู้

### Vault คือโฟลเดอร์จริง

Vault คือโฟลเดอร์บนเครื่อง รวมทุก subfolder และไฟล์ Markdown ภายใน ไม่ใช่ฐานข้อมูลที่ lock อยู่ในแอป คุณเปิด, แก้, สำรอง, sync หรือ version control ด้วย Git ได้ตามปกติ[3][4]

```text
agent-vault/
├── AGENTS.md
├── TASKS.md
├── 02-mocs/
├── 07-workflows/
├── 10-tasks/
└── .obsidian/
```

- `.md` = เนื้อหาและ knowledge
- YAML Frontmatter = metadata/properties
- `.obsidian/` = configuration ของ vault เช่น plugins, theme, hotkeys และ workspace
- Git = history/review/rollback
- Bases/Dataview = live views จาก properties

### Markdown + Properties

Markdown ใช้เก็บเนื้อหา ส่วน Properties ใช้เก็บ structured metadata เช่น text, date, number, checkbox, list และ links[5]

```yaml
---
id: task-review-vercel-cache
title: Review Vercel Cache Headers
type: task
status: ready
priority: P1
owner: fig-agent
due: 2026-10-06
tags:
  - task
  - vercel
  - caching
uses_workflow: "[[Workflow - Vercel Cache Invalidation]]"
---
```

แนวคิดสำคัญ:

```text
Markdown body = อธิบาย “ทำไม” และ “ทำอย่างไร”
Properties = บอก “มันคืออะไร”, “สถานะอะไร”, “ใครรับผิดชอบ”, “กำหนดเมื่อไร”
```

## ฟีเจอร์ที่มีประโยชน์

| Feature | ใช้ทำอะไรใน Vault ของคุณ |
|---|---|
| Internal links | เชื่อม Task → Workflow → Policy → Runbook |
| Backlinks | ตรวจผลกระทบก่อนแก้ policy หรือ deprecate workflow |
| Graph View | สำรวจความสัมพันธ์ของ MOC, project และ domain |
| Properties | สร้าง metadata สำหรับ Agent, Bases และ Dataview |
| Bases | จัดการ task/workflow เป็น table, cards หรือ Kanban |
| Canvas | วาด Agent architecture, data flow, incident flow |
| Templates | สร้าง task, workflow, runbook, ADR ให้มี schema เดียวกัน |
| Search | ค้นข้อความ, tag, property และ link |
| Bookmarks | ปักหน้า Home, Operations Dashboard, Approval Rules |
| Outgoing links | ตรวจว่า note หนึ่งพา Agent ไปยัง policy/workflow ที่ถูกต้องหรือไม่ |
| Tags | Discovery ระดับกว้าง เช่น `#supabase`, `#vercel`, `#security` |
| Publish | เผยแพร่เอกสารเป็น wiki/documentation site ได้ |
| Sync | ซิงก์ vault ข้าม desktop/mobile |

Internal links รองรับทั้ง Wikilinks `[[Note]]` และ Markdown links; backlinks ช่วยเห็นโน้ตที่อ้างถึงโน้ตปัจจุบัน ส่วน Graph View แสดง node และเส้นความสัมพันธ์จาก internal links[6][7][8]

## Workflows ที่แนะนำ

### 1. Capture → Process → Publish

```text
00-inbox/
      ↓
Draft note
      ↓
Review metadata, links, ownership, risk
      ↓
Move to domain/workflow/runbook folder
      ↓
status: active
      ↓
Add primary_moc and related links
      ↓
Git commit + index refresh
```

ใช้ `00-inbox/` สำหรับข้อมูลดิบและ draft เท่านั้น อย่าให้ Agent ใช้ inbox เป็น operational guidance จนกว่าจะผ่าน review และเปลี่ยนสถานะเป็น `active`

### 2. Task lifecycle

```text
inbox
  → planned
  → ready
  → in_progress
  → done
             ↘ archived

ready
  → waiting
  → blocked
  → cancelled

waiting / blocked
  → ready
```

ทุก task note ควรมี:

```yaml
type: task
status: ready
priority: P1
owner: fig-agent
due: 2026-10-06
uses_workflow: "[[Workflow - ...]]"
blocked_by: []
approval_required: false
acceptance_criteria: []
```

### 3. Agent navigation

ให้ Agent เดินตาม path นี้:

```text
AGENTS.md
  → Dashboard - Operations
  → task note
  → linked workflow
  → domain knowledge
  → policy / approval rule
  → runbook when failure occurs
  → update task + report/audit log
```

อย่าให้ Agent เริ่มจาก search ทั้ง vault ทุกครั้ง เพราะทำให้ context ใหญ่, ช้า และอาจเจอ note เก่าหรือ draft ที่ไม่ควรใช้

## MOCs และ Semantic Links

ใช้ **MOC** เป็นหน้า hub สำหรับการนำทาง ไม่ใช่สารบัญทุกไฟล์

```text
MOC - Home
├── MOC - Document Operations
├── MOC - AI Agent Operations
├── MOC - Supabase
├── MOC - Vercel
├── MOC - GitHub
└── MOC - Security
```

ใช้ links เพื่อบอกความสัมพันธ์ที่ชัดเจน:

```markdown
This task uses [[Workflow - Supabase Change]].

This workflow is governed by [[Policy - Approval Rules]].

If validation fails, follow [[Runbook - Supabase Migration Failure]].

This implementation is validated by [[Runbook - Smoke Test]].
```

ก่อนแก้ policy ให้ดู backlinks เพื่อรู้ว่า workflow, task หรือ runbook ใดจะได้รับผลกระทบ

## Bases, Dataview และ Dashboard

### Bases

ใช้เป็น operational UI:

```text
Tasks.base
- Ready Queue
- Work Board
- P0/P1
- Overdue
- Waiting and Blocked

Approvals.base
- Pending approval
- Approved and executable
- Expired approval
```

เหมาะสำหรับแก้ metadata แบบ interactive เช่น `status`, `priority`, `owner`, `due`, `approval_status`

### Dataview

ใช้ทำ report และ dashboard:

```text
Dashboard - Daily Briefing
- Top 3 ready tasks
- Due today
- Pending approvals
- Blockers

Dashboard - Knowledge Health
- Notes without owner
- Workflows due for review
- Active documents without MOC
- High-risk notes with no approval link
```

### Canvas

ใช้กับสิ่งที่อ่านเป็นลำดับหรือความสัมพันธ์เชิงภาพง่ายกว่า text เช่น:

- Agent architecture
- Supabase ↔ Vercel ↔ GitHub data flow
- Approval process
- Incident response path
- Project planning
- Knowledge graph ระดับสูง

Canvas เป็น core plugin สำหรับจัดโน้ต, image, PDF และ links บนพื้นที่แบบ infinite workspace[9]

## Plugins ที่ควรเริ่ม

### Core plugins

เปิดก่อน:

- **Properties** — ดูและแก้ YAML metadata
- **Bases** — table/card/kanban views จาก properties
- **Backlinks** — impact analysis
- **Outgoing Links** — ตรวจ links จาก note ปัจจุบัน
- **Graph View** — สำรวจ network ของ notes
- **Canvas** — architecture/workflow diagrams
- **Templates** — note schema ที่คงที่
- **Bookmarks** — ปักหน้า operations สำคัญ
- **Search** — ค้นหา properties/text/tags
- **Command Palette** — ทำงานเร็ว
- **File Recovery** — recovery ระดับ local

Core plugins ถูกสร้างและรองรับโดย Obsidian โดยตรง และมี Bases, Canvas, Properties, Graph, Publish และ Sync อยู่ใน ecosystem หลัก[9]

### Community plugins

เพิ่มเมื่อเจอปัญหาจริง:

| Plugin | ใช้เมื่อ |
|---|---|
| Dataview | ต้อง query/report จาก frontmatter |
| Templater | template ต้องสร้าง ID/date/logic อัตโนมัติ |
| Obsidian Git | ต้อง commit/pull/push จาก Obsidian |
| Tasks | เก็บ task เป็น checkbox และต้อง query task |
| QuickAdd | capture note/task เร็ว |
| Metadata Menu | ต้องแก้ metadata ซับซ้อน |
| Kanban | ต้องการ board เฉพาะทาง |

> [!warning]
> Community plugins รันโค้ดใน vault ของคุณ ควรติดตั้งเฉพาะ plugin ที่ไว้ใจได้, มีการดูแลต่อเนื่อง และจำเป็นจริง อย่าเปิด plugin เพียงเพราะ dashboard ดูสวย

## Git setup ที่เหมาะ

สำหรับ vault ที่ Agent และทีมใช้ร่วมกัน:

```text
main
  └── active policies, workflows, templates, dashboards

feature/docs-cache-policy
  └── เปลี่ยน cache workflow / policy
```

แนะนำ:

- commit Markdown, templates, `.base`, canvas และ shared `.obsidian` config ที่จำเป็น
- ไม่ commit workspace layout ส่วนบุคคล
- review PR สำหรับ `03-governance/`, `07-workflows/`, `AGENTS.md`, `99-system/`
- อย่าเก็บ secrets, `.env`, production dumps หรือ PII ใน vault
- ใช้ Git history เพื่อ rollback policy/workflow ที่เปลี่ยนผิด

ตัวอย่าง `.gitignore`:

```gitignore
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.trash/
.DS_Store
Thumbs.db
.env
.env.*
*.pem
*.key
*.p12
```

## Obsidian สำหรับ AI Agent

Obsidian ไม่ควรเป็น runtime database, distributed lock, secret manager หรือ scheduler แต่เหมาะเป็น **human-reviewed, versioned knowledge layer**

```text
Obsidian Markdown
  = knowledge, policy, workflow, runbook, architecture, task context

Git
  = versioning, review, rollback

Bases / Dataview
  = views and dashboards

Supabase / Database / Queue
  = runtime state, locks, jobs, retries

Secret manager
  = tokens, passwords, service-role keys

Audit log
  = action and approval history
```

### กฎ Agent ที่ควรมี

```markdown
## Obsidian Knowledge Rules

- Read `AGENTS.md` before operating in the vault.
- Treat only `status: active` policies, workflows, and runbooks as current guidance.
- Use `MOC - Home` and the domain MOC to locate relevant knowledge.
- Do not treat inbox, draft, deprecated, archived, or historical reports as active instructions.
- Search for an existing active note before creating a new note.
- Add `primary_moc`, `type`, `domain`, `owner`, `status`, and `risk` to new operational notes.
- Use templates for task, workflow, runbook, policy, and project notes.
- Inspect backlinks before changing, moving, deprecating, or deleting active notes.
- Never store credentials, tokens, secrets, or unnecessary PII in the vault.
- Use the approval policy before writing shared knowledge or triggering external actions.
```

## เริ่มใน 30 นาที

1. สร้าง vault ใหม่จากโฟลเดอร์ `agent-operations-vault/`
2. สร้างไฟล์ `AGENTS.md`, `TASKS.md`, `README.md`
3. สร้าง folders: `00-inbox`, `01-dashboards`, `02-mocs`, `03-governance`, `07-workflows`, `10-tasks`, `12-bases`, `13-templates`, `90-archive`, `99-system`
4. เปิด Core plugins: Properties, Bases, Backlinks, Canvas, Templates, Bookmarks
5. ติดตั้ง Dataview หากต้องการ dashboard query
6. สร้าง `MOC - Home`, `Policy - Approval Rules`, `Policy - Documentation Standards`
7. สร้าง template สำหรับ `Task` และ `Workflow`
8. สร้าง `Tasks.base` และ `Dashboard - Operations`
9. เพิ่ม task จริง 3–5 งาน เพื่อทดสอบ status/priority/due/approval
10. เริ่มใช้ Git ก่อนให้ Agent หรือหลายคนแก้ vault เดียวกัน

หลักสำคัญที่สุด: **เริ่มจาก Markdown + Properties + Links ให้สม่ำเสมอ** ก่อนเพิ่ม plugin, automation หรือ AI integration เพราะ metadata และ semantic links ที่ดีคือสิ่งที่ทำให้ Bases, Dataview และ Agent ทำงานได้แม่นครับ.

การอ้างอิง:
[1] Home - Obsidian Help https://obsidian.md/help/Home
[2] github.com › chrisblifeos-pixel › Obsidian-OfficialHow Obsidian stores data.md - GitHub https://github.com/chrisblifeos-pixel/Obsidian-Official-Documentation/blob/master/en/Files%20and%20folders/How%20Obsidian%20stores%20data.md
[3] Vault https://docs.obsidian.md/Plugins/Vault
[4] Import Markdown files - Obsidian Help https://obsidian.md/help/import/markdown
[5] Properties - Obsidian Help https://obsidian.md/help/properties
[6] Internal links - Obsidian Help https://obsidian.md/help/links
[7] Backlinks - Obsidian Help https://obsidian.md/help/backlinks
[8] Graph view - Obsidian Help https://obsidian.md/help/plugins/graph
[9] Core plugins - Obsidian Help https://obsidian.md/help/plugins
[10] Home - Developer Documentation - Obsidian https://docs.obsidian.md/Home
[11] Backlinks - Obsidian Help https://obsidian.md/help/plugins/backlinks
[12] External File Embed and Link - Obsidian Plugin https://community.obsidian.md/plugins/external-file-embed-and-link
[13] obsidianmd/obsidian-help | DeepWiki https://deepwiki.com/obsidianmd/obsidian-help
[14] advanced_linking - active-inference - Obsidian Publish https://publish.obsidian.md/active-inference/docs/tools/advanced_linking
