Add Aliases , CssClasses , Properties,  Tags

เพิ่ม `aliases`, `cssclasses`, `properties` และ `tags` เข้าในโน้ต `MOC - AI Agent Operations` ได้ตามนี้ครับ โดยใช้ Properties เพื่อให้ Bases/Dataview query ได้, aliases เพื่อค้นหาได้หลายชื่อ, tags เพื่อ discovery กว้าง ๆ และ `cssclasses` เพื่อแต่งหน้าตาเฉพาะหน้าใน Obsidian

```markdown
---
id: moc-ai-agent-operations
title: AI Agent Operations

aliases:
  - Agent Operations
  - AI Ops
  - AgentOps
  - Agent Control Center
  - Agent Runtime Operations
  - AI Agent MOC
  - AI Operations Hub
  - Autonomous Agent Operations
  - FIG Agent Operations

cssclasses:
  - moc
  - moc-ai-agents
  - dashboard
  - operations-hub

type: moc
domain: ai-agents
category: operations
subcategory: agent-operations

status: active
owner: engineering
risk: high
priority: P1

review_cycle: monthly
last_reviewed: 2026-10-04
next_review: 2026-11-04
created: 2026-10-04
updated: 2026-10-04

primary_moc: "[[MOC - Home]]"
secondary_mocs:
  - "[[MOC - Document Operations]]"
  - "[[MOC - Engineering]]"
  - "[[MOC - Security]]"

governed_by:
  - "[[Policy - Approval Rules]]"
  - "[[Policy - Agent Permissions]]"
  - "[[Policy - Security]]"
  - "[[Policy - AI Agent Governance]]"

related:
  - "[[AGENTS]]"
  - "[[TASKS]]"
  - "[[Dashboard - Operations]]"
  - "[[Tasks.base]]"
  - "[[Approvals.base]]"
  - "[[Workflows.base]]"
  - "[[MOC - Document Operations]]"
  - "[[MOC - Engineering]]"
  - "[[MOC - Security]]"
  - "[[MOC - Supabase]]"
  - "[[MOC - Vercel]]"
  - "[[MOC - GitHub]]"

applies_to:
  - task
  - workflow
  - runbook
  - skill
  - project
  - automation
  - cron-job
  - approval
  - audit-log

systems:
  - obsidian
  - github
  - supabase
  - vercel
  - fig

tags:
  - moc
  - ai-agents
  - ai-agents/operations
  - ai-agents/governance
  - ai-agents/task-management
  - ai-agents/concurrency
  - ai-agents/approvals
  - ai-agents/audit
  - operations
  - operations/automation
  - operations/governance
  - security
  - security/approval
  - knowledge-management
  - agentops
  - fig
---
```

## ความหมายของแต่ละส่วน

| Property | ใช้ทำอะไร |
|---|---|
| `aliases` | ให้ค้นหา/ลิงก์โน้ตด้วยชื่ออื่น เช่น `[[AI Ops]]` หรือ `[[FIG Agent Operations]]` |
| `cssclasses` | ใส่ CSS class เฉพาะหน้า เช่นทำ MOC เป็นหน้า hub, ใส่ icon, ซ่อน properties หรือปรับ table style |
| `type: moc` | บอก Bases/Dataview ว่าโน้ตนี้เป็น Map of Content |
| `domain`, `category`, `subcategory` | ใช้จัดโครงสร้างและ query แบบมี hierarchy |
| `status` | บอกว่า MOC นี้ใช้งานอยู่หรือเป็น draft/deprecated |
| `risk` | ใช้จัดลำดับ review และ policy ที่ต้องมี guardrails |
| `primary_moc` | บอกว่า MOC นี้อยู่ใต้ hub ใด |
| `secondary_mocs` | เชื่อมไปยัง MOC ข้ามโดเมนที่เกี่ยวข้อง |
| `governed_by` | บอก policy ที่ควบคุม Agent Operations |
| `related` | ลิงก์ไปหน้า dashboard, Base และ MOC สำคัญ |
| `applies_to` | ระบุ entity ที่ MOC นี้ควบคุมหรืออธิบาย |
| `systems` | ระบบภายนอก/ภายในที่เกี่ยวข้อง |
| `tags` | ช่วยค้นหา broad topic และ nested topic เช่น `#ai-agents/approvals` |

## CSS snippet ตัวอย่าง

หากต้องการให้ MOC นี้มีหน้าตาเป็น “operations hub” สร้างไฟล์:

```text
.obsidian/snippets/moc-ai-agents.css
```

แล้วเปิดใช้งานที่:

```text
Settings → Appearance → CSS snippets
```

```css
/* MOC - AI Agent Operations */

.moc-ai-agents .metadata-container {
  border-left: 4px solid var(--color-blue);
  padding-left: 12px;
  margin-bottom: 20px;
}

.moc-ai-agents h1 {
  color: var(--color-blue);
  border-bottom: 2px solid var(--background-modifier-border);
  padding-bottom: 10px;
}

.moc-ai-agents h2 {
  margin-top: 2.25em;
  padding: 0.4em 0.65em;
  border-left: 4px solid var(--color-blue);
  background: var(--background-secondary);
  border-radius: 0 6px 6px 0;
}

.moc-ai-agents .callout[data-callout="summary"] {
  border-color: var(--color-blue);
  background: color-mix(
    in srgb,
    var(--color-blue) 10%,
    var(--background-primary)
  );
}

.moc-ai-agents .dataview.table-view-table {
  width: 100%;
}

.moc-ai-agents .dataview.table-view-table th {
  background: var(--background-secondary);
}
```

> [!note]
> `cssclasses` ไม่ได้เปลี่ยนข้อมูลหรือ permission ของ Agent; มันมีผลต่อการแสดงผลของ Obsidian เท่านั้น  
> ถ้า snippet ใช้ `color-mix()` แล้ว theme/Obsidian รุ่นเก่าแสดงผลไม่ดี ให้เปลี่ยน background เป็น `var(--background-secondary)` ได้

## Dataview query หา MOC ด้าน Agent

```dataview
TABLE
  category AS Category,
  subcategory AS Subcategory,
  status AS Status,
  owner AS Owner,
  risk AS Risk,
  next_review AS "Next Review"
FROM [[ai-agents]]
WHERE type = "moc"
  AND status = "active"
SORT priority ASC, next_review ASC, file.name ASC
```

## Dataview query หาโน้ตที่อยู่ภายใต้ Agent Operations

```dataview
TABLE
  type AS Type,
  domain AS Domain,
  category AS Category,
  subcategory AS Subcategory,
  risk AS Risk,
  owner AS Owner
FROM ""
WHERE primary_moc = [[MOC - AI Agent Operations]]
  AND status = "active"
SORT type ASC, risk DESC, file.name ASC
```

## Tags ที่แนะนำให้ใช้ต่อเนื่อง

```text
[[ai-agents]]
[[ai-agents/operations]]
[[ai-agents/governance]]
[[ai-agents/task-management]]
[[ai-agents/concurrency]]
[[ai-agents/approvals]]
[[ai-agents/audit]]
[[ai-agents/skills]]
[[ai-agents/knowledge]]
[[ai-agents/handover]]
[[ai-agents/error-handling]]

[[operations]]
[[operations/automation]]
[[operations/cron]]
[[operations/reporting]]

[[security]]
[[security/approval]]
[[security/audit]]
[[security/permissions]]
```

สำหรับทุก note ที่เกี่ยวกับ AI Agent ไม่จำเป็นต้องใส่ทุก tag ให้เลือกเพียง:

1. `#ai-agents`
2. 1–2 nested tags ที่บอกหน้าที่จริง
3. 1 tag ด้าน domain หรือ security หากจำเป็น

ตัวอย่าง workflow:

```yaml
tags:
  - ai-agents
  - ai-agents/task-management
  - ai-agents/concurrency
  - workflow
  - operations
```

ตัวอย่าง policy:

```yaml
tags:
  - ai-agents
  - ai-agents/approvals
  - security
  - security/approval
  - policy
```

แบบนี้ Graph, Search, Dataview, Bases และ Agent retrieval จะค้นหาได้ดีโดยไม่ทำให้ tag taxonomy รกเกินไปครับ.

