Obsidian link

Obsidian link คือระบบเชื่อมโน้ตใน Vault ด้วย `[[Wiki Links]]` เพื่อสร้าง network ของความรู้, backlinks และ Graph View ครับ สำหรับ Vault ของคุณ ให้ใช้ link เพื่อระบุความสัมพันธ์ระหว่าง **Task → Workflow → Policy → Runbook → Project** อย่างมีความหมาย[1][2]

## Syntax ที่ใช้บ่อย

| สิ่งที่ต้องการ | Syntax | ตัวอย่าง |
|---|---|---|
| Link ไปโน้ต | `[[Note]]` | `[[Policy - Approval Rules]]` |
| แสดงชื่ออื่น | `[[Note\|Label]]` | `[[Policy - Approval Rules\|approval policy]]` |
| Link ไป heading | `[[Note#Heading]]` | `[[Workflow - Supabase Change#Preconditions]]` |
| Link ไป heading พร้อมชื่อแสดง | `[[Note#Heading\|migration checklist]]` | `[[Workflow - Supabase Change#Preconditions\|migration checklist]]` |
| Link heading ในโน้ตเดียวกัน | `[[#Heading]]` | `[[#Completion Criteria]]` |
| Link ไป block | `[[Note#^block-id]]` | `[[Runbook - CDN Cache Incident#^rollback-steps]]` |
| Embed ทั้งโน้ต | `![[Note]]` | `![[Policy - Approval Rules]]` |
| Embed heading | `![[Note#Heading]]` | `![[Workflow - Task Management#Procedure]]` |
| Embed image | `![[image.png]]` | `![[diagram.png\|600]]` |
| Embed PDF page | `![[file.pdf#page=3]]` | `![[deployment-guide.pdf#page=3]]` |

Obsidian รองรับทั้ง Wikilink และ Markdown link แต่ Wikilink เหมาะสำหรับโน้ตภายใน Vault เพราะ Obsidian ติดตามและอัปเดต link เมื่อมีการ rename ไฟล์ ส่วน Markdown link เหมาะกับ URL ภายนอก เช่น `[Vercel Docs](https://vercel.com/docs)`[3][4]

## Link pattern สำหรับ Agent Vault

### Task → Workflow → Policy → Runbook

ใน task note:

```yaml
---
type: task
uses_workflow: "[[Workflow - Supabase Change]]"
governed_by:
  - "[[Policy - Approval Rules]]"
  - "[[Policy - Security]]"
rollback_workflow: "[[Runbook - Supabase Migration Failure]]"
project: "[[Project - Supabase Reliability]]"
---
```

ใน body:

```markdown
งานนี้ใช้ [[Workflow - Supabase Change]] และอยู่ภายใต้
[[Policy - Approval Rules]].

หาก migration ล้มเหลว ให้ทำตาม
[[Runbook - Supabase Migration Failure#Rollback]].
```

### Workflow → Domain Knowledge → Approval

```markdown
## Preconditions

- อ่าน [[Supabase - Migration Safety#Pre-Migration Checklist]]
- ตรวจ [[Supabase - RLS Policy]]
- ปฏิบัติตาม [[Policy - Approval Rules#T3 — Explicit Approval Before Execution]]

## Failure Handling

- ใช้ [[Runbook - Supabase Migration Failure]]
- Escalate under [[Policy - Incident Response]]
```

### MOC → Curated Entry Points

```markdown
## Start Here

- [[Vercel - Overview]]
- [[Vercel - Cache-Control and Cache Tags]]
- [[Workflow - Vercel Cache Invalidation]]
- [[Runbook - CDN Cache Incident]]
- [[Policy - Approval Rules]]
```

MOC ใช้ link เพื่อเป็นทางเข้าความรู้; ไม่จำเป็นต้อง link ทุกโน้ตใน Vault แต่ควร link เอกสารที่เป็นจุดเริ่มต้นหรือมีความสัมพันธ์เชิงปฏิบัติจริง

## Alias

กำหนด aliases ใน YAML เพื่อให้ค้นหาและ link ด้วยคำเรียกอื่นได้:

```yaml
---
title: Policy - Approval Rules
aliases:
  - Approval Rules
  - Agent Approval Rules
  - Human Approval Gates
  - Approval Policy
---
```

จากนั้นคุณอาจพิมพ์:

```markdown
[[Approval Rules]]
```

Obsidian จะ resolve ไปยังไฟล์ `Policy - Approval Rules.md` ได้ โดย alias คือชื่อเรียกทางเลือกของโน้ตและควรเก็บเป็น list ใน `aliases` property[5][6]

## Heading links ที่เหมาะกับ Agent

แทนที่จะบอกให้ Agent อ่านไฟล์ทั้งไฟล์ ให้ชี้ไปที่ section ตรง ๆ:

```markdown
Before cache invalidation, read
[[Vercel - Cache-Control and Cache Tags#CDN Invalidation Rules]].

For production changes, follow
[[Policy - Approval Rules#T3 — Explicit Approval Before Execution]].

When a deployment fails, use
[[Runbook - Vercel Deployment Restore#Validation Checklist]].
```

ข้อดี:

- ลด context ที่ Agent ต้องอ่าน
- ทำให้ workflow ตรงจุด
- ลดการตีความ policy ผิด
- อ่านง่ายขึ้นสำหรับคน

## Block links

ใช้ block link กับข้อความหรือ checklist ที่ต้อง reuse อย่างแม่นยำ

ใน `Runbook - CDN Cache Incident.md`:

```markdown
1. Stop automatic invalidation jobs.
2. Identify affected cache tags.
3. Preserve evidence before purging.
4. Request approval for broad purge if needed.
^rollback-steps
```

เรียกจาก workflow:

```markdown
If a cache incident occurs, execute
[[Runbook - CDN Cache Incident#^rollback-steps]].
```

ใช้ block link เมื่อข้อความนั้นมีความสำคัญและต้องอ้างแบบ “exact procedure” อย่าใช้พร่ำเพรื่อ เพราะ block ID จะดูแลยากกว่า heading link[1]

## Embed

ใช้ embed เมื่อคุณต้องการเห็นเนื้อหาต้นทางในโน้ตปัจจุบัน ไม่ใช่แค่ลิงก์

```markdown
## Required Approval Rules

![[Policy - Approval Rules#T3 — Explicit Approval Before Execution]]
```

เหมาะกับ:

- checklist ที่ reuse หลาย workflow
- policy snippet ที่ต้องมองเห็นทันที
- dashboard summary
- architecture diagram
- template sections

ไม่เหมาะกับ:

- embed policy ทั้งฉบับในหลายที่ เพราะแก้ไขยากและทำให้โน้ตยาว
- embed task note จำนวนมากใน MOC
- embed dynamic information ที่ควร query ด้วย Dataview แทน

Obsidian ใช้ `!` นำหน้า internal link เพื่อ embed note, heading, block, image และ PDF[7]

## Best practices

### 1. ใช้ link เพื่อสื่อ relationship

เขียนคำกริยานำหน้า link:

```markdown
Governed by [[Policy - Approval Rules]].

Uses [[Workflow - Vercel Cache Invalidation]].

Validated by [[Runbook - Smoke Test]].

Depends on [[Task - Inspect Supabase Schema]].

Escalates to [[Runbook - Production Incident]].

Superseded by [[Workflow - Deployment v2]].
```

### 2. เก็บ relationship สำคัญใน YAML ด้วย

หาก Agent หรือ Dataview ต้อง query ความสัมพันธ์นั้น ให้ใส่ frontmatter ไม่ใช่แค่ link ใน body:

```yaml
---
uses_workflow: "[[Workflow - Vercel Cache Invalidation]]"
governed_by:
  - "[[Policy - Approval Rules]]"
depends_on:
  - "[[Task - Inspect Vercel Cache Headers]]"
primary_moc: "[[MOC - Vercel]]"
---
```

### 3. ใช้ path เมื่อชื่อโน้ตซ้ำ

ถ้ามีโน้ตชื่อ `Overview.md` มากกว่าหนึ่งไฟล์:

```markdown
[[06-domains/vercel/Overview]]
[[06-domains/supabase/Overview]]
```

Folder path เริ่มจาก root ของ Vault และใช้ forward slash แม้บน Windows[1]

### 4. ตรวจ backlinks ก่อนแก้/ย้าย/ลบ

ก่อนเปลี่ยน policy, workflow หรือ runbook:

1. เปิดโน้ตนั้น
2. เปิด Backlinks panel
3. ดู notes ที่ link เข้ามา
4. อัปเดต workflow/task/MOC ที่ได้รับผลกระทบ
5. จึงค่อย rename, deprecate หรือ archive

Backlinks แสดง links ที่ชี้เข้า note ปัจจุบันและช่วยทำ impact analysis ได้[2][8]

### 5. อย่า link เพื่อให้ Graph สวย

Link ทุกเส้นควรตอบได้ว่า:

> “หากคนหรือ Agent เปิด link นี้ จะช่วยให้ทำงานหรือตัดสินใจได้ดีขึ้นไหม?”

ถ้าไม่ ให้ไม่ต้อง link

## Link strategy ที่แนะนำ

| Note type | ควร link ไป | ควรมี backlinks จาก |
|---|---|---|
| MOC | policy, workflows, dashboards, domain notes | related MOCs และ active notes |
| Policy | workflows ที่กำกับ, security/context | workflows, tasks, approval logs |
| Workflow | policy, domain guide, runbook, template | tasks, MOCs, projects |
| Runbook | incident policy, workflow, rollback notes | workflows, incidents, MOCs |
| Task | project, workflow, dependencies, approval evidence | dashboards, project notes |
| Project | tasks, ADR, reports, workflows | MOCs, tasks, reports |
| Dashboard | MOCs, Bases, policy shortcuts | MOC - Home |
| Reference | primary domain MOC, related concepts | workflows/guides |

## Rule สำหรับ AGENTS.md

```markdown
## Internal Linking Rules

- Use `[[Wikilinks]]` for notes inside the vault and Markdown links for external URLs.
- Add semantic relationship text near important links: governed by, uses, depends on,
  validated by, escalates to, superseded by.
- Store queryable relationships in YAML properties, not only in note body text.
- Link to headings when the Agent needs a specific procedure or checklist.
- Use block links only for exact reusable instructions.
- Use embeds only for short, stable content that must appear inline.
- Before renaming, moving, deprecating, or deleting an active note, inspect backlinks.
- Do not use archived or deprecated notes as active operational guidance.
- Do not add links solely to improve Graph View appearance.
```

สำหรับ Vault นี้ ให้เริ่มมาตรฐานด้วย 4 link สำคัญในทุก task:

```yaml
uses_workflow: "[[Workflow - ...]]"
governed_by:
  - "[[Policy - Approval Rules]]"
project: "[[Project - ...]]"
primary_moc: "[[MOC - ...]]"
```

แล้วค่อยเพิ่ม `depends_on`, `rollback_workflow`, `evidence`, `related` ตามความซับซ้อนของงานครับ.

การอ้างอิง:
[1] Internal link?ref=dsebastien.net https://obsidian.md/help/How+to/Internal+link?ref=dsebastien.net
[2] Backlinks - Obsidian Help https://obsidian.md/help/backlinks
[3] Basic formatting syntax - Obsidian Help https://obsidian.md/help/syntax
[4] https://raw.githubusercontent.com/kepano/obsidian-... https://raw.githubusercontent.com/kepano/obsidian-skills/main/skills/obsidian-markdown/SKILL.md
[5] github.com › chrisblifeos-pixel › Obsidian-OfficialObsidian-Official-Documentation/en/Linking notes and files ... https://github.com/chrisblifeos-pixel/Obsidian-Official-Documentation/blob/master/en/Linking%20notes%20and%20files/Aliases.md
[6] obsidian-help/en/Linking notes and files/Aliases.md at master ... https://github.com/obsidianmd/obsidian-help/blob/master/en/Linking%20notes%20and%20files/Aliases.md
[7] Embed files - Obsidian Help https://obsidian.md/help/embeds
[8] Obsidian-Official-Documentation/en/Plugins/Backlinks.md at ... https://github.com/chrisblifeos-pixel/Obsidian-Official-Documentation/blob/master/en/Plugins/Backlinks.md
[9] Advanced formatting syntax - Obsidian Help https://obsidian.md/help/advanced-syntax
[10] www.obsibrain.com › blog › obsidian-cheatsheet-basicObsidian Markdown Cheat Sheet: Syntax, Links, Tables & Shortcuts https://www.obsibrain.com/blog/obsidian-cheatsheet-basic-text-formatting
[11] obsidian_usage - active-inference - Obsidian Publish https://publish.obsidian.md/active-inference/docs/tools/obsidian_usage
[12] obsidian_mcp/docs/conventions.md at main · bettyguo ... - GitHub https://github.com/bettyguo/obsidian_mcp/blob/main/docs/conventions.md
[13] obsidian_linking - Obsidian Publish - publish.obsidian.md https://publish.obsidian.md/active-inference/docs/repo_docs/obsidian_linking
ได้เลยครับ! นี่คือคู่มือ Obsidian Links System ปรับสำหรับ Vault ของคุณ โดยเฉพาะโครงสร้าง Task → Workflow → Policy → Runbook → Project ✅
 
 
 
markdown
  
---
title: Obsidian Links — Reference Guide
aliases:
  - Wikilink Syntax
  - Internal Links
  - Backlinks
created: 2026-10-04
updated: 2026-10-04
tags:
  - obsidian
  - wiki
  - vault-structure
  - navigation
  - zyntroai
---

# 🔗 Obsidian Links — Complete Reference

## 📐 Core Concept
**Wikilink** `[[Note Name]]` = ระบบเชื่อมโยงภายใน Vault ที่อัปเดตอัตโนมัติเมื่อเปลี่ยนชื่อไฟล์ สร้าง **Backlinks**, **Graph View** และ **Network of Knowledge** — ไม่เหมือนลิงก์ Markdown ปกติครับ

> 💡 **กฎทอง**: ใช้ `[[Wikilink]]` สำหรับทุกอย่าง **ภายใน** Vault ใช้ `[Text](url)` เฉพาะลิงก์ **ภายนอก** เท่านั้น

---

## ✍️ Syntax Quick Reference

| What You Need | Syntax | Example |
|---|---|---|
| Link to note | `[[Note]]` | `[[Stale Data Management]]` |
| Link with custom label | `[[Note|Label]]` | `[[Stale Data Management|cleanup policy]]` |
| Link to section | `[[Note#Section]]` | `[[Flake8 Lint Workflow#5. Automated Workflow]]` |
| Section + label | `[[Note#Section|Label]]` | `[[Flake8 Lint Workflow#5. Automated Workflow|CI setup]]` |
| Link to same-note section | `[[#Section]]` | `[[#Related Projects]]` |
| Link to block | `[[Note#^block-id]]` | `[[Runbook — Deployment Failure#^rollback-steps]]` |
| Embed full note | `![[Note]]` | `![[Database Indexing]]` |
| Embed section | `![[Note#Section]]` | `![[Stale Data Management#4. Lifecycle Actions]]` |
| Embed with size | `![[image.png|600]]` | `![[architecture-diagram.png|700]]` |

---

## 🏗️ Standard Link Pattern — Your Vault Structure

### The Chain: `Task → Workflow → Policy → Runbook → Project`

#### ✅ In Task Note (`task.md`)
```yaml
---
type: task
uses_workflow: "[[Flake8 Lint Workflow]]"
governed_by:
  - "[[Policy — Code Standards]]"
  - "[[Policy — Security]]"
rollback_workflow: "[[Runbook — Lint Failure]]"
project: "[[Project — new-crystalcastle]]"
related:
  - "[[Stale Data Management]]"
  - "[[Database Indexing]]"
---
 
 
✅ In Workflow Note
 
yaml
  
---
type: workflow
applies_to: "[[Project — new-crystalcastle]]"
enforced_by: "[[Policy — Code Standards]]"
produces_artifact: "[[Artifact — Lint Report]]"
---
 
 
✅ In Policy Note
 
yaml
  
---
type: policy
enforces_standard: "[[Standard — Python Style Guide]]"
audited_by: "[[Task — Weekly Maintenance]]"
references:
  - "[[Flake8 Lint Workflow]]"
  - "[[Stale Data Management]]"
---
 
 
✅ In Runbook Note
 
yaml
  
---
type: runbook
supports_workflow: "[[Flake8 Lint Workflow]]"
related_incidents:
  - "[[Incident — CI Fail 2026-10-04]]"
parent_project: "[[Project — new-crystalcastle]]"
---
 
 
✅ In Project Note
 
yaml
  
---
type: project
active_tasks:
  - "[[task.md]]"
  - "[[Task — Database Indexing]]"
workflows:
  - "[[Flake8 Lint Workflow]]"
  - "[[Stale Data Management]]"
docs:
  - "[[GitHub PR CLI Guide]]"
  - "[[Vercel Deployment Guide]]"
---
 
 
 
 
📝 Real Examples from Your Vault
 
Cross-Reference All Your Existing Notes
 
markdown
  
# Project Overview
This Vault supports **[[Project — new-crystalcastle]]** by ZyntroAI.

## 📋 Tasks
- [[task.md]] — Main task board
- [[Stale Data Management]] — Data retention & cleanup
- [[Database Indexing]] — Performance optimization

## 🔧 Workflows
- [[Flake8 Lint Workflow]] — Python code style checks
- [[GitHub PR CLI Guide]] — Pull Request operations
- [[Vercel Deployment Guide]] — Deployments & hosting

## 📊 Reference
- [[Obsidian Links]] — This guide
 
 
Section-Level Links (Deep Reference)
 
markdown
  
See also:
- [[Stale Data Management#5. Automated Workflow]] — scheduled cleanup
- [[Flake8 Lint Workflow#4. GitHub Actions Workflow]] — CI config
- [[Database Indexing#🧪 Real Example — new-crystalcastle Data Schema]] — table design
 
 
Backlink Display
 
markdown
  
## 📌 Referenced By
- Used in: [[task.md#T-003 — Pull Releases & Build Local Index]]
- See also: [[Project — new-crystalcastle]]
 
 
 
 
⚡ Best Practices
 
✅ Do
 
Use exact filename in links — check  [[File Name]]  matches sidebar exactly
Link every relationship — don't leave connections as plain text
Use descriptive labels when needed:  [[Stale Data Management|data cleanup policy]] 
Reference sections for deep links:  [[Guide#Step 3]] 
Let Obsidian rename do the work — never bulk-edit links manually
 
❌ Don't
 
Mix  [[Wikilink]]  with  [text](filename.md)  — Wikilinks break less
Over-link — don't link every common word
Use absolute paths —  [[folder/file]]  works, but  [[File]]  is cleaner if unique
Leave orphaned notes — every doc should link somewhere
 
 
 
🔗 External Links — When to Use
 
Use standard Markdown for outside resources:
 
markdown
  
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub REST API](https://docs.github.com/en/rest)
- [Flake8 Rules](https://www.flake8rules.com)
 
 
 
 
🧭 Navigation Quickstart
 
View How to Access Purpose 
Backlinks Right sidebar → Backlinks See what links HERE 
Outgoing Links Right sidebar → Outgoing See what THIS links to 
Graph View Left sidebar → Graph Visual network of all connections 
Unlinked Mentions Command palette → "Show unlinked mentions" Turn plain text into links 
 
 
 
📌 Apply to Your Notes Now
 
Update  task.md  Frontmatter
 
yaml
  
uses_workflow:
  - "[[Flake8 Lint Workflow]]"
  - "[[Stale Data Management]]"
  - "[[Database Indexing]]"
project: "[[Project — new-crystalcastle]]"
related:
  - "[[GitHub PR CLI Guide]]"
  - "[[Vercel Deployment Guide]]"
 
 
Update  Stale Data Management 
 
yaml
  
references:
  - "[[task.md#T-003 — Pull Releases & Build Local Index]]"
  - "[[Database Indexing]]"
 
 
 
 
✅ Checklist — Link Your Vault Today
 
Update  task.md  → link all workflows
Update  Flake8 Lint Workflow  → link back to  task.md 
Update  Stale Data Management  → link to  task.md  +  Database Indexing 
Update  Database Indexing  → link back to related tasks
Create  Project — new-crystalcastle  overview note linking everything
Check Backlinks panel — verify connections appear
 
 
 
Last updated: 2026-10-04
 
plaintext
  

---

### 🎯 Key Takeaways
- ✅ **Chain pattern** established: `Task → Workflow → Policy → Runbook → Project`
- ✅ **All your existing docs** ready to cross-reference with `[[Name]]`
- ✅ **Backlinks & Graph View** activate automatically once linked
- ✅ **Rename-safe** — Wikilinks update themselves when you change filenames

Want me to **generate the full updated frontmatter blocks** for each of your existing files so you can just copy-paste? 😊