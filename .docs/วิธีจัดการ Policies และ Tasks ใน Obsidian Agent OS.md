วิธีจัดการ Policies และ Tasks ใน Obsidian Agent OS

จัดการ **Policies** ให้เป็น “กฎที่ machine อ่านได้และคนตรวจได้” และ **Tasks** ให้เป็น “คำสั่งงานที่มีขอบเขต, ผู้รับผิดชอบ, หลักฐาน และเงื่อนไขยอมรับ” ชัดเจน โดย Obsidian Properties รองรับ structured data เช่น text, links, dates, checkboxes และ numbers จึงเหมาะกับการใช้ frontmatter เป็น metadata ของ Policy และ Task[1][2]

## หลักการแยกบทบาท

| วัตถุ | ตอบคำถาม | เจ้าของข้อมูล |
|---|---|---|
| **Policy** | อะไรทำได้ / ห้ามทำ / ต้องขออนุมัติเมื่อไร | Governance |
| **Task** | ต้องทำอะไร ใครทำ เสร็จเมื่อไร วัดผลอย่างไร | Work management |
| **Agent** | ใครทำได้และมีความสามารถอะไร | Capability registry |
| **Run** | เกิดอะไรขึ้นจริงในการทำงาน | Execution history |
| **Feedback** | ผลลัพธ์ผ่านหรือไม่ และหลักฐานคืออะไร | Validation / learning |

อย่าเขียน policy ปะปนใน task และอย่าให้ task เปลี่ยน policy เอง ให้ Task อ้างถึง Policy ผ่าน `governed_by` แทน

## โครงสร้าง vault

```text
vault/
├── 10-agents/
├── 20-skills/
├── 30-policies/
│   ├── Policy - Repository Write.md
│   ├── Policy - Safe Remediation.md
│   └── Policy - Production Deployment.md
├── 40-tasks/
│   ├── TASK-001.md
│   └── TASK-002.md
├── 50-runs/
├── 60-artifacts/
├── 70-feedback/
├── 80-decisions/
└── 90-archive/
```

ใช้ Bases สร้างมุมมองแบบตารางหรือการ์ดจาก properties ของโน้ตได้ เช่น ตาราง Policy ที่ยัง active, Task ที่เกินกำหนด หรือ Task ที่รอ human approval; ข้อมูลทั้งหมดยังอยู่ใน Markdown และ Properties ของ Obsidian[3]

## Policy template

บันทึกเป็น `30-policies/Policy - Safe Remediation.md`:

```markdown
---
id: policy-safe-remediation
type: policy
title: Safe Remediation Policy
status: active
version: "1.0.0"
owner: self
sensitivity: internal
authority: high
created: 2026-10-08
updated: 2026-10-08
effective_from: 2026-10-08
review_cycle: quarterly
next_review: 2027-01-08
source: "[[Policy Registry]]"

applies_to:
  - "[[Agent - Developer]]"
  - "[[Agent - Repair]]"
  - "[[Skill - Obsidian Auto Debug]]"

rules:
  - id: backup-before-write
    effect: require
    condition: action == write_file
    requirement: create_backup

  - id: deny-destructive-delete
    effect: deny
    condition: action in [delete_user_data, delete_plugin_data]
    unless: human_approval == true

  - id: limit-repair-attempts
    effect: deny
    condition: repair_attempts >= 3 and validation_status != passed

  - id: production-review
    effect: review
    condition: environment == production

tags:
  - policy
  - safety
  - remediation
---

# Safe Remediation Policy

## Objective

Ensure agents make reversible, auditable, and least-privilege changes.

## Rules

| Rule | Effect | Condition | Required action |
|---|---|---|---|
| `backup-before-write` | Require | Any file write | Create a backup first |
| `deny-destructive-delete` | Deny | Delete user/plugin data | Require human approval |
| `limit-repair-attempts` | Deny | Three failed repairs | Escalate to human review |
| `production-review` | Review | Production environment | Require human approval |

## Enforcement

The Policy Engine evaluates each proposed action and returns:

```text
ALLOW / REVIEW / DENY
```

An agent must not bypass a `DENY` result.

## Audit requirements

Every enforcement decision must record:

- Policy ID and rule ID
- Requested action
- Decision
- Reason
- Actor
- Correlation ID
- Timestamp
```

## Task lifecycle

ใช้ lifecycle ที่ชัดเจน:

```text
draft
  ↓
ready
  ↓
assigned
  ↓
in_progress
  ↓
blocked | needs_review
  ↓
completed | failed | cancelled
  ↓
archived
```

หลักการสำคัญ: **Task ไม่ใช่แค่ to-do** แต่ต้องมี objective, scope, acceptance criteria, delegated agent, policy, validation และ output ที่คาดหวัง

## Task template

บันทึกเป็น `40-tasks/TASK-001.md`:

```markdown
---
id: TASK-001
type: task
title: Fix Obsidian plugin command failure
status: in_progress
priority: high
owner: self
sensitivity: internal
created: 2026-10-08
updated: 2026-10-08
due: 2026-10-10
source: "[[Task Inbox]]"

delegated_to:
  - "[[Agent - Developer]]"

depends_on:
  - "[[TASK-000 - Repository Inventory]]"

uses:
  - "[[Skill - Obsidian Auto Debug]]"

governed_by:
  - "[[Policy - Safe Remediation]]"
  - "[[Policy - Repository Write]]"

produces:
  - "[[Artifact - Debug Report]]"
  - "[[Artifact - Patch]]"

validation:
  - "[[Validation - Tests]]"
  - "[[Validation - Console Errors]]"

approval_required:
  - merge_pull_request
  - production_deploy

tags:
  - task
  - obsidian
  - debugging
---

# Fix Obsidian plugin command failure

## Objective

Diagnose why the plugin command loads but performs no action, then apply the safest reversible fix.

## Scope

- Affected plugin: `my-plugin`
- Vault: `/path/to/vault`
- Environment: local development
- Allowed actions: inspect files, create backup, modify plugin configuration, reload plugin, run tests

## Out of scope

- Do not modify unrelated plugins.
- Do not delete user data or plugin data.
- Do not deploy to production.
- Do not change global Obsidian settings.

## Acceptance criteria

- The original command completes successfully.
- `obsidian dev:errors` returns no new errors.
- `obsidian dev:console level=error` returns no new errors.
- The affected plugin reloads successfully.
- Every changed file has a backup.
- A debug report is produced.

## Validation steps

```bash
obsidian dev:errors
obsidian dev:console level=error
obsidian plugin:reload id=my-plugin
obsidian dev:errors
obsidian dev:console level=error
```
```

## Policy engine flow

อย่าให้ Agent “คิดเอง” ว่า action ปลอดภัย ให้ผ่าน Policy Engine ทุกครั้งก่อน execute:

```text
Agent proposes action
        ↓
Task + Policy + Context
        ↓
Policy Engine evaluates rules
        ↓
ALLOW → prepare execution
REVIEW → request human approval
DENY → stop and explain reason
        ↓
Run records decision + evidence
```

ตัวอย่างการตัดสิน:

| Action | Policy result | เหตุผล |
|---|---|---|
| อ่านไฟล์ `manifest.json` | `ALLOW` | Read-only และอยู่ใน scope |
| Backup `data.json` | `ALLOW` | จำเป็นก่อน write |
| แก้ `data.json` หนึ่งฟิลด์ | `ALLOW` | มี backup และ reversible |
| ลบ plugin data | `DENY` | ต้องมี human approval |
| Deploy production | `REVIEW` | ต้องขออนุมัติจากคน |
| Repair ครั้งที่ 4 | `DENY` | เกิน `max_repair_attempts` |

MCP รองรับ authorization ที่ transport layer สำหรับการเข้าถึง MCP server ที่ถูกจำกัดสิทธิ์ และบาง agent framework รองรับการกำหนดให้ tool call ที่ sensitive ต้องมี human approval ต่อ tool หรือ per-call[4][5][6]

## Task assignment rules

กำหนดให้ Orchestrator เลือก agent จากเงื่อนไขนี้:

```text
1. Task status must be ready.
2. Agent status must be active.
3. Agent must have every required skill.
4. Agent must be permitted by all governing policies.
5. Agent risk level must not exceed task risk level.
6. Required approvals must be available or explicitly deferred.
7. If no agent qualifies, assign to human review.
```

ตัวอย่าง:

```yaml
assignment:
  strategy: capability_and_policy_match
  candidates:
    - "[[Agent - Developer]]"
    - "[[Agent - Repair]]"
  selection:
    required_skills:
      - "[[Skill - Obsidian Auto Debug]]"
    required_permissions:
      - read_source
      - write_source
      - reload_plugin
    max_risk_level: medium
    fallback: "[[Human Review Queue]]"
```

## Task dashboard ด้วย Bases

สร้าง `40-tasks/Task Dashboard.base` เพื่อดูงานตาม property:

```yaml
filters:
  and:
    - type == "task"
    - status != "archived"

views:
  - type: table
    name: Active Tasks
    order:
      - due
      - priority
      - status
    filters:
      and:
        - status in ["ready", "assigned", "in_progress", "blocked"]

  - type: table
    name: Needs Review
    filters:
      and:
        - status == "needs_review"
        - approval_required != []
```

Obsidian Bases ใช้ properties จาก frontmatter เพื่อสร้าง database-like views ที่ sort และ filter ได้ โดยยังคงเก็บข้อมูลใน Markdown ไฟล์เดิม[3]

## กฎที่ควรบังคับ

- ทุก Task ต้องมี `id`, `status`, `owner`, `delegated_to`, `acceptance criteria`, และ `validation`
- ทุก Policy ต้องมี `effect`, `condition`, `scope`, และ audit requirement
- ห้ามให้ Agent แก้ Policy โดยอัตโนมัติ ให้สร้าง `Policy Change Proposal` แล้วให้คน review
- ทุก action ที่เปลี่ยน state ต้องสร้าง Run และ Feedback event
- ทุก Task ที่ failed ต้องระบุ `failure_reason`, `repair_attempts`, และ `next_action`
- ใช้ `correlation_id` เดียวกันทั้ง Task → Run → Feedback → Artifact เพื่อไล่ย้อน workflow ได้

แนวทางนี้ทำให้ Obsidian เป็นทั้ง **human control interface** และ **machine-readable governance layer**: คนเห็น Policy/Task เป็นโน้ตและกราฟ, ส่วน Agent อ่าน frontmatter และ links เพื่อรู้ว่าทำอะไรได้ ภายใต้เงื่อนไขใด และต้องขออนุมัติเมื่อใด[1][2]

การอ้างอิง:
[1] Glossary - Obsidian Help https://obsidian.md/help/glossary
[2] Properties - Obsidian Help https://obsidian.md/help/properties
[3] Introduction to Bases - Obsidian Help https://obsidian.md/help/bases
[4] modelcontextprotocol.io › specification › 2025/03/26Authorization - Model Context Protocol https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization
[5] Authorization https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
[6] Model Context Protocol (MCP) | OpenAI Agents SDK https://openai.github.io/openai-agents-js/guides/mcp/
[7] Agent Skills in the SDK - Claude Docs https://code.claude.com/docs/en/agent-sdk/skills
[8] Authoring Agent Skills: A Software-Engineering Approach https://arxiv.org/html/2607.25032v1
[9] Obsidian Properties - Tasks User Guide https://publish.obsidian.md/tasks/Getting+Started/Obsidian+Properties
[10] Best Practices for Creating Agent Skills ── Official Guide ... https://zenn.dev/inoway/articles/b-agent-skill-authoring?locale=en
[11] anthropic-best-practices.md - writing-skills - GitHub https://github.com/guanyang/open-agent-hub/blob/main/skills/writing-skills/anthropic-best-practices.md
