Delegate

```markdown
---
title: "Delegate"
aliases:
  - "Task delegation"
  - "Delegate work"
  - "Delegation workflow"
tags:
  - "productivity"
  - "task-management"
  - "obsidian"
  - "ai-agents"
type: "guide"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# Delegate

> [!summary]
> **Delegate** คือการส่งงานให้บุคคล ทีม หรือ AI agent ทำแทน
> โดยต้องระบุ outcome, scope, deadline, owner และวิธีตรวจรับงานให้ชัดเจน
> เป้าหมายไม่ใช่แค่ “ส่งงานต่อ” แต่คือทำให้งานเดินหน้าได้โดยยังคงควบคุมคุณภาพและความเสี่ยงได้

## Delegation principles

```text
1. Define outcome
   ระบุว่า “เสร็จ” หน้าตาเป็นอย่างไร

2. Choose delegate
   เลือกคนหรือ agent ที่มี capability และ authority เหมาะสม

3. Set scope
   จำกัดสิ่งที่ทำได้ ห้ามทำ และขอบเขตข้อมูล

4. Provide context
   แนบโน้ต, links, constraints และแหล่งอ้างอิง

5. Set deadline
   ระบุ due date และ checkpoint

6. Review result
   ตรวจผลลัพธ์ก่อนนำไปใช้
```

การ delegate ให้ AI agent ควรระบุ outcome ที่ชัด, context ที่เกี่ยวข้อง และ return path สำหรับผลลัพธ์ เพื่อให้งานยังติดตามได้จากโน้ตเจ้าของงาน [335]

## When to delegate

| สถานการณ์ | ควร delegate หรือไม่ | เหตุผล |
|---|---|---|
| งานซ้ำ ๆ ที่มีขั้นตอนชัด | ใช่ | ประหยัดเวลาและลด context switching |
| งาน research หรือ summarize | ใช่ | AI ช่วยรวบรวมและจัดระเบียบได้ |
| งานที่ต้องใช้ judgment สูง | ไม่ หรือ delegate บางส่วน | ต้องมีมนุษย์ตรวจสอบ |
| งานที่มีข้อมูล sensitive | ไม่ หรือต้องจำกัด scope มาก | ต้องควบคุม access และ retention |
| งาน destructive เช่น delete/merge | ไม่โดยตรง | ต้องมี dry-run และ approval |
| งานเร่งด่วนแต่ไม่สำคัญ | ใช่ | เหมาะกับ Eisenhower “Delegate” quadrant |
| งานที่ต้องใช้ความเชี่ยวชาญเฉพาะ | ใช่ หากมีผู้เชี่ยวชาญ | ได้คุณภาพและความรับผิดชอบชัดเจน |

TaskMatrix และ task management plugins หลายตัวใช้แนวคิด Eisenhower Matrix โดยแยก quadrant **Delegate** สำหรับงานที่ urgent แต่ไม่จำเป็นต้องทำเอง [322][325][328]

## Delegation brief template

```markdown
***
title: "Delegation — {{title}}"
type: "delegation"
status: "open"
delegate: 
owner: 
created: "{{date}}"
due: 
priority: 
risk-tier: 
***

# Delegation — {{title}}

## Outcome

- 

## Definition of done

- [ ] 
- [ ] 
- [ ] 

## Scope

### Allowed

- 

### Not allowed

- 

## Context

- [[Related note]]
- [[Reference note]]

## Constraints

- 

## Deliverables

- 

## Checkpoints

- [ ] 

## Approval

- [ ] Review result
- [ ] Verify quality
- [ ] Approve completion
```

## Example: Research delegation

```markdown
***
title: "Delegation — Research Supabase Storage RLS"
type: "delegation"
status: "open"
delegate: "[[Research Assistant]]"
owner: "เจ้าของ vault"
created: "2026-10-11"
due: "2026-10-13"
priority: "high"
risk-tier: "low"
***

# Delegation — Research Supabase Storage RLS

## Outcome

สรุปแนวทาง RLS สำหรับ private bucket ที่ใช้เก็บ Obsidian vault
โดยเน้น user-scoped path และแยก list/download permissions

## Definition of done

- [ ] อธิบาย RLS policies ที่จำเป็น
- [ ] ระบุ SQL examples
- [ ] ระบุ test cases
- [ ] อ้างอิงแหล่งข้อมูล
- [ ] เสนอ wikilinks ไปยังโน้ตที่เกี่ยวข้อง

## Scope

### Allowed

- อ่านโน้ตใน `Resources/Supabase/`
- ค้นหาโน้ตที่เกี่ยวข้อง
- สร้าง research draft

### Not allowed

- แก้ไข policy files
- ลบโน้ต
- เข้าถึง credentials หรือ secrets
- deploy ไปยัง Supabase

## Context

- [[การ Sync ไฟล์ Obsidian เข้า Supabase Storage ร่วมกับ RLS]]
- [[GitHub Actions Security]]

## Deliverables

- `Resources/Supabase/Supabase Storage RLS research.md`

## Checkpoints

- [ ] Outline review
- [ ] Draft review
- [ ] Final review
```

## Example: Cleanup delegation

```markdown
***
title: "Delegation — Vault cleanup review"
type: "delegation"
status: "open"
delegate: "[[Vault Cleanup Agent]]"
owner: "เจ้าของ vault"
created: "2026-10-11"
due: "2026-10-12"
priority: "medium"
risk-tier: "medium"
***

# Delegation — Vault cleanup review

## Outcome

รายงานโน้ตที่ซ้ำ, broken links และ Inbox items ที่ควรจัดระเบียบ

## Definition of done

- [ ] ระบุ duplicate candidates
- [ ] ระบุ broken links
- [ ] ระบุ Inbox backlog
- [ ] เสนอ Keep / Merge / Archive / Delete
- [ ] สร้าง dry-run report
- [ ] ไม่ลบหรือ merge ไฟล์จริง

## Scope

### Allowed

- อ่านโน้ตใน `Inbox/`, `Projects/`, `Resources/`
- ค้นหา links และ duplicate candidates
- สร้าง cleanup report

### Not allowed

- Delete notes
- Merge notes
- Move notes
- Modify `Archive/`
- เข้าถึง sensitive notes

## Deliverables

- `Logs/Agent sessions/Vault cleanup review — 2026-10-11.md`
```

## Delegation decision tree

```text
มีงานที่ต้องทำ
   ↓
ต้องทำเองหรือไม่?
   ├── ใช่ → Keep
   │
   └── ไม่ใช่
        ↓
งานเร่งด่วนแต่ไม่สำคัญหรือไม่?
   ├── ใช่ → Delegate
   │
   └── ไม่ใช่
        ↓
งานสำคัญแต่ยังไม่เร่งด่วนหรือไม่?
   ├── ใช่ → Schedule
   │
   └── ไม่ใช่
        ↓
งานไม่มีคุณค่าหรือไม่?
   ├── ใช่ → Delete
   └── ไม่ใช่ → Keep หรือ archive
```

## Delegate to AI agent

```markdown
## Delegation prompt

You are delegated to complete the following task.

### Outcome

- 

### Definition of done

- [ ] 

### Allowed actions

- 

### Prohibited actions

- 

### Context

- [[Related note]]
- [[Reference note]]

### Deliverable

- 

### Safety rules

- Do not delete files without approval.
- Do not access credentials or sensitive notes.
- Produce a dry-run report before destructive actions.
- Ask for approval before bulk edits, merges, moves, or deletions.
```

AI Agent plugin ใน Obsidian รองรับการ delegate งานพื้นฐานให้ agent เช่น อ่าน, เขียน, แก้ไข และสร้างโน้ตหรือโฟลเดอร์ใน vault ได้ [321]  
ส่วน Abele รองรับ agent delegation ที่ลึกขึ้น โดย agent สามารถส่งงานให้ agent อื่นหรือ fan out งานเดียวให้ sub-agents หลายตัว พร้อมเก็บ transcript ของแต่ละ run [329]

## Agent delegation policy

```markdown
## AI agent delegation policy

1. Delegate ได้เฉพาะงานที่มี outcome และ definition of done ชัดเจน

2. จำกัด vault access ตาม folder และ file type ที่จำเป็น

3. เริ่มด้วย read-only หรือ propose-only

4. ห้าม delegate destructive actions โดยไม่มี dry-run และ approval

5. ห้ามให้ agent เข้าถึง credentials, recovery codes หรือ sensitive data

6. บันทึก delegation brief, result และ review decision

7. ตรวจผลลัพธ์ก่อนนำไปใช้หรือ merge เข้า vault หลัก

8. หากงานมีความเสี่ยงสูง ให้แบ่งเป็น checkpoint และ review ทุกขั้น
```

## Delegation statuses

```markdown
| Status | ความหมาย |
|---|---|
| `open` | ยังไม่ได้ส่งงาน |
| `assigned` | ส่งให้ delegate แล้ว |
| `in-progress` | delegate กำลังทำงาน |
| `review` | รอผู้รับผิดชอบตรวจ |
| `changes-requested` | ต้องแก้ไขเพิ่ม |
| `completed` | งานเสร็จและผ่านการตรวจ |
| `cancelled` | ยกเลิกงาน |
```

## Delegation log

```markdown
***
title: "Delegation log — {{date}}"
type: "delegation-log"
created: "{{date}}"
***

# Delegation log — {{date}}

| Task | Delegate | Status | Due | Result | Review |
|---|---|---|---|---|---|
| [[Delegation — Research Supabase Storage RLS]] | [[Research Assistant]] | review | 2026-10-13 | Draft created | Pending |
| [[Delegation — Vault cleanup review]] | [[Vault Cleanup Agent]] | completed | 2026-10-12 | Cleanup report | Approved |
```

## Daily delegation checklist

```markdown
- [ ] ระบุงานที่ควร delegate
- [ ] เลือก delegate ที่เหมาะสม
- [ ] เขียน outcome และ definition of done
- [ ] จำกัด scope และ prohibited actions
- [ ] แนบ context และ references
- [ ] ตั้ง deadline และ checkpoint
- [ ] ตรวจผลลัพธ์ก่อนปิดงาน
- [ ] บันทึกผลและ follow-up
```

## Quick reference

```markdown
| องค์ประกอบ | คำถามหลัก |
|---|---|
| Outcome | เสร็จหน้าตาเป็นอย่างไร |
| Delegate | ใครหรือ agent ใดเหมาะสม |
| Scope | ทำอะไรได้และห้ามทำอะไร |
| Context | ต้องรู้อะไรบ้าง |
| Deadline | ต้องเสร็จเมื่อไร |
| Deliverable | ต้องส่งอะไรกลับมา |
| Review | ใครตรวจและยอมรับงาน |
```

> [!success]
> Delegation ที่ดีไม่ใช่การบอกว่า “ช่วยทำเรื่องนี้หน่อย”  
> แต่คือการระบุ outcome, scope, constraints, deliverable และวิธีตรวจรับงานอย่างชัดเจน
```

การอ้างอิง:
[1] AI Agent https://community.obsidian.md/plugins/ai-agent
[2] TaskMatrix - Obsidian Plugin https://community.obsidian.md/plugins/task-matrix
[3] Task Vault - Obsidian Plugin https://community.obsidian.md/plugins/task-vault
[4] TaskLoops - Obsidian Plugin https://community.obsidian.md/plugins/taskloops
[5] community.obsidian.md · plugins · task-priority-matrixTask Priority Matrix - Obsidian Plugin https://community.obsidian.md/plugins/task-priority-matrix
[6] Tasks - Obsidian Plugin https://community.obsidian.md/plugins/obsidian-tasks-plugin
[7] Community plugins - Obsidian Help https://obsidian.md/help/community-plugins
[8] QuadTasks - Obsidian Plugin https://community.obsidian.md/plugins/quadtasks
[9] Abele - Obsidian Plugin https://community.obsidian.md/plugins/abele
[10] README.md - lesovsky/obsidian-taskmaster https://github.com/lesovsky/obsidian-taskmaster/blob/main/README.md
[11] cfe84/obsidian-pw: Obsidian plugin ot manage todos and ... https://github.com/cfe84/obsidian-pw
[12] obsidian-tasks-plugin - Obsidian Hub - Obsidian Publish https://publish.obsidian.md/hub/02%20-%20Community%20Expansions/02.05%20All%20Community%20Expansions/Plugins/obsidian-tasks-plugin
[13] obsidian-tasks-plugin - Obsidian Hub https://publish.obsidian.md/hub/02+-+Community+Expansions/02.05+All+Community+Expansions/Plugins/obsidian-tasks-plugin
[14] Task management plugins - Obsidian Hub https://publish.obsidian.md/hub/02+-+Community+Expansions/02.01+Plugins+by+Category/Task+management+plugins
[15] Delegate the Work https://smartconnections.app/smart-loop/core/delegate-work/
เพิ่ม Task status สำหรับงานที่ Delegate

เพิ่มสถานะ `delegated` สำหรับงานที่มอบหมายแล้ว และใช้ `waiting-review` เมื่อผู้รับมอบหมายส่งงานกลับมาแต่ยังไม่ผ่านการตรวจรับครับ นำส่วนนี้ไปเพิ่มในโน้ต `Delegate` ได้เลย:

````markdown
## Task status สำหรับงานที่ Delegate

| Status | ความหมาย | เปลี่ยนเป็นสถานะถัดไปเมื่อ |
|---|---|---|
| `open` | ระบุงานแล้ว แต่ยังไม่ได้มอบหมาย | เลือกผู้รับมอบหมายและส่งรายละเอียดงาน |
| `delegated` | มอบหมายแล้ว รอผู้รับมอบหมายเริ่มงาน | ผู้รับมอบหมายเริ่มทำ |
| `in-progress` | กำลังดำเนินการ | ส่งผลลัพธ์กลับมา |
| `waiting-review` | ส่งงานแล้ว รอเจ้าของงานตรวจรับ | เจ้าของงานตรวจเสร็จ |
| `changes-requested` | ต้องแก้ไขตามข้อเสนอแนะ | ผู้รับมอบหมายเริ่มแก้ |
| `completed` | ตรวจรับและปิดงานแล้ว | — |
| `cancelled` | ยกเลิกงาน | — |

> [!note]
> `delegated` ไม่เท่ากับ `completed`: เจ้าของงานยังต้องติดตามและตรวจรับ
> ผลลัพธ์ก่อนปิดงาน หากต้องการรักษาชื่อสถานะเดิมในโน้ต ให้ใช้ `assigned`
> แทน `delegated` ได้ แต่ควรเลือกใช้อย่างใดอย่างหนึ่งให้สม่ำเสมอ

### ตัวอย่าง Task note

---
type: task
status: delegated
owner: "เจ้าของงาน"
delegate: "ผู้รับมอบหมาย"
delegated-on: 2026-10-11
due: 2026-10-13
---

# ตรวจ RLS policies สำหรับ Obsidian sync

## Definition of done

- [ ] ตรวจสิทธิ์อ่าน เขียน และลบใน private bucket
- [ ] ทดสอบว่าเข้าถึงไฟล์ของผู้ใช้อื่นไม่ได้
- [ ] ส่งผลการตรวจให้เจ้าของงาน

## Follow-up

- ส่งงานเมื่อ:
- ตรวจรับโดย:
- ผลการตรวจรับ:
````

หากใช้ **Obsidian Tasks plugin** อยู่ ให้เก็บ `status: delegated` ในโน้ตตามตัวอย่างก่อน ส่วนการทำให้ checkbox แสดงสถานะพิเศษต้องตั้งค่า custom task status ในปลั๊กอินแยกต่างหากครับ

