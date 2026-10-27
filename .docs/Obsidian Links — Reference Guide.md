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

Want me to **generate the full updated frontmatter blocks** for each of your existing files so you can just copy-paste? 😊Obsidian Links — Reference Guide

```markdown
---
title: "Obsidian Links — Reference Guide"
aliases:
  - "Obsidian links reference"
  - "Internal links guide"
  - "Wikilinks reference"
  - "Backlinks guide"
tags:
  - "obsidian"
  - "links"
  - "backlinks"
  - "reference"
  - "vault-maintenance"
type: "reference"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# Obsidian Links — Reference Guide

> [!summary]
> **Links** คือหัวใจของ Obsidian เพราะเชื่อมโน้ต, attachments, headings และ blocks
> เข้าด้วยกันเป็นเครือข่ายความรู้  
> คู่มือนี้รวม syntax, ประเภทลิงก์, backlinks, unlinked mentions,
> aliases และแนวปฏิบัติสำหรับจัดการ links ใน vault

## Link types

| ประเภท | ใช้เมื่อ | Syntax |
|---|---|---|
| Internal link | เชื่อมโน้ตใน vault | `[[Note name]]` |
| Markdown link | ต้องการความเข้ากันได้กับ editor อื่น | `[Display text](Note%20name.md)` |
| External link | เชื่อมไปเว็บหรือ URL | `[Display text](https://example.com)` |
| Heading link | ลิงก์ไปยังหัวข้อ | `[[Note#Heading]]` |
| Block link | ลิงก์ไปยัง block เฉพาะ | `[[Note#^block-id]]` |
| Embed | แสดงเนื้อหาจากโน้ตหรือไฟล์ | `![[Note]]` |
| Alias link | ใช้ชื่อแสดงอื่น | `[[Note|Display text]]` |

Obsidian รองรับ internal links ทั้งแบบ Wikilink และ Markdown link โดย Wikilink ใช้ `[[Note]]` และ Markdown link ใช้ `[Display text](Note.md)` [483][484]

## Internal links

### Wikilink

```markdown
[[Android app management policy]]
```

### Markdown link

```markdown
[Android app management policy](Android%20app%20management%20policy.md)
```

### Link พร้อม path

```markdown
[[Projects/Android app management policy]]
```

```markdown
[Android app management policy](Projects/Android%20app%20management%20policy.md)
```

Obsidian รองรับการระบุ folder path นำหน้าชื่อโน้ต โดย path เริ่มจาก vault root และใช้ `/` แม้บน Windows [483]

## Display text

ใช้ `|` เพื่อกำหนดข้อความที่แสดง:

```markdown
[[Android app management policy|นโยบายจัดการแอป Android]]
```

ผลลัพธ์:

```markdown
นโยบายจัดการแอป Android
```

## Heading links

ลิงก์ไปยัง heading ในโน้ตเดียวกัน:

```markdown
[[#Permission Review]]
```

ลิงก์ไปยัง heading ในโน้ตอื่น:

```markdown
[[Android app management policy#Permission Review]]
```

ลิงก์พร้อม display text:

```markdown
[[Android app management policy#Permission Review|Permission review]]
```

Obsidian ใช้ `#` ต่อท้าย link destination ตามด้วยชื่อ heading เพื่อลิงก์ไปยัง section นั้น [483]

## Block links

ลิงก์ไปยัง block เฉพาะ:

```markdown
[[Android app management policy#^block-id]]
```

เพิ่ม block identifier ในโน้ตปลายทาง:

```markdown
- ตรวจ permissions ทุกไตรมาส ^block-id
```

Obsidian ใช้ `#^` ตามด้วย block identifier เพื่อลิงก์ไปยัง block เฉพาะ [483]

## Embeds

Embed โน้ต:

```markdown
![[Android app management policy]]
```

Embed section:

```markdown
![[Android app management policy#Permission Review]]
```

Embed image:

```markdown
![[diagram.png]]
```

Embed PDF:

```markdown
![[document.pdf]]
```

Obsidian ใช้ `!` นำหน้าลิงก์เพื่อ embed ไฟล์หรือโน้ตแทนการสร้างลิงก์ปกติ [483][487]

## External links

```markdown
[Obsidian Help](https://obsidian.md/help)
```

```markdown
[Supabase Storage Access Control](https://supabase.com/docs/guides/storage/security/access-control)
```

```markdown
[GitHub Actions Secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)
```

## Aliases

เพิ่ม alias ใน Frontmatter:

```yaml
***
title: "Android app management policy"
aliases:
  - "Android app policy"
  - "นโยบายจัดการแอป Android"
***
```

ใช้ alias ใน wikilink:

```markdown
[[Android app management policy|Android app policy]]
```

หรือ:

```markdown
[[Android app management policy|นโยบายจัดการแอป Android]]
```

## Backlinks

Backlink คือลิงก์จากโน้ตอื่นมายังโน้ตปัจจุบัน

```text
Backlinks → Linked mentions
```

ตัวอย่าง:

```markdown
- [[Android app management policy]]
```

โน้ตนี้จะปรากฏใน **Linked mentions** ของ `Android app management policy`

Obsidian แยก **Linked mentions** คือ backlinks ที่มี internal link จริง ออกจาก **Unlinked mentions** ซึ่งเป็นข้อความที่ตรงกับชื่อหรือ alias แต่ยังไม่ได้ทำเป็นลิงก์ [452][453]

## Unlinked mentions

```markdown
ตรวจ Android app management policy ทุก 90 วัน
```

ข้อความนี้จะปรากฏใน **Unlinked mentions** ของโน้ต `Android app management policy`

เปลี่ยนเป็น wikilink:

```markdown
ตรวจ [[Android app management policy]] ทุก 90 วัน
```

## Outgoing links

```markdown
- [[Android app management policy]]
- [[Android App Permissions]]
- [[Android Storage Management]]
```

โน้ตปัจจุบันจะมี outgoing links ไปยังโน้ตเหล่านี้

Outgoing Links pane แสดงลิงก์ที่โน้ตปัจจุบันชี้ไป และ potential links จากข้อความที่ตรงกับโน้ตอื่น [455][486]

## Unlink mention

จาก:

```markdown
- [[Android app management policy]]
```

เป็น:

```markdown
- Android app management policy
```

จาก:

```markdown
- [[Android app management policy|นโยบายจัดการแอป Android]]
```

เป็น:

```markdown
- นโยบายจัดการแอป Android
```

## Link policy

```markdown
## Link policy

1. ใช้ wikilinks เมื่อเห็นความสัมพันธ์ระหว่างโน้ต

2. ใช้ aliases เมื่อมีชื่อเรียกหลายแบบ

3. ใช้ heading links เมื่อต้องการชี้ไปยัง section เฉพาะ

4. ใช้ block links เมื่อต้องการอ้างอิงข้อความหรือตารางเฉพาะ

5. ใช้ embeds เมื่อต้องการแสดงเนื้อหาจากโน้ตอื่น

6. ใช้ external links สำหรับแหล่งอ้างอิงนอก vault

7. ตรวจ unlinked mentions ทุก 90 วัน

8. ตรวจ broken links หลัง rename หรือ move โน้ต
```

## Link workflow

```text
เขียนโน้ต
   ↓
พิมพ์ [[ เพื่อค้นหาโน้ตที่เกี่ยวข้อง
   ↓
เลือกโน้ตหรือสร้างใหม่
   ↓
เพิ่ม display text หากจำเป็น
   ↓
ตรวจ Backlinks และ Outgoing links
   ↓
จัดการ unlinked mentions
   ↓
ตรวจ broken links
```

## Quick reference

```markdown
| ต้องการทำอะไร | Syntax |
|---|---|
| ลิงก์โน้ต | `[[Note]]` |
| ลิงก์พร้อม display text | `[[Note|Display text]]` |
| ลิงก์ไปยัง heading | `[[Note#Heading]]` |
| ลิงก์ไปยัง block | `[[Note#^block-id]]` |
| Embed โน้ต | `![[Note]]` |
| Embed image | `![[image.png]]` |
| External link | `[Display text](https://example.com)` |
| ดู backlinks | Backlinks pane |
| ดู outgoing links | Outgoing links pane |
```

> [!success]
> ใช้ wikilinks เพื่อสร้างความสัมพันธ์ระหว่างโน้ต  
> ใช้ backlinks เพื่อดูว่าใครอ้างถึงโน้ตนี้  
> และใช้ outgoing links เพื่อดูว่าโน้ตนี้เชื่อมไปที่ใด
```

การอ้างอิง:
[1] Internal links - Obsidian Help https://obsidian.md/help/Linking%20notes%20and%20files/Internal%20links
[2] Attachments - Obsidian Help https://obsidian.md/help/attachments
[3] Settings - Obsidian Help https://obsidian.md/help/settings
[4] deepwiki.com › obsidianmd › obsidian-helpMobile Applications | obsidianmd/obsidian-help | DeepWiki https://deepwiki.com/obsidianmd/obsidian-help/7.1-mobile-applications
[5] Accepted file formats - Obsidian https://obsidianmd-obsidian-help.mintlify.app/files/accepted-formats
[6] www.obsibrain.com › blog › obsidian-linking-theHow to Link Notes in Obsidian: Wikilinks, Backlinks & Examples https://www.obsibrain.com/blog/obsidian-linking-the-complete-guide-to-connecting-your-notes
วิธีลิงก์ไปยังหัวข้อเฉพาะในโน้ต

```markdown
---
title: "วิธีลิงก์ไปยังหัวข้อเฉพาะในโน้ต"
aliases:
  - "Link to heading"
  - "Obsidian heading link"
  - "Obsidian section link"
tags:
  - "obsidian"
  - "links"
  - "headings"
  - "reference"
type: "guide"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# วิธีลิงก์ไปยังหัวข้อเฉพาะในโน้ต

> [!summary]
> ใช้ `#` ต่อท้ายชื่อโน้ตเพื่อลิงก์ไปยัง heading ที่ต้องการ  
> เช่น `[[ชื่อโน้ต#หัวข้อ]]`  
> สามารถใช้ `|` เพื่อเปลี่ยนข้อความที่แสดง และใช้ `!` เพื่อ embed เฉพาะ section ได้

## 1. ลิงก์ไปยัง heading ในโน้ตเดียวกัน

```markdown
[[#Permission Review]]
```

หากโน้ตปัจจุบันมี heading:

```markdown
## Permission Review
```

ลิงก์จะพาไปยัง heading นั้น

## 2. ลิงก์ไปยัง heading ในโน้ตอื่น

```markdown
[[Android app management policy#Permission Review]]
```

ผลลัพธ์:

```markdown
Android app management policy#Permission Review
```

Obsidian ใช้ `#` ต่อท้ายชื่อโน้ตตามด้วยชื่อ heading เพื่อลิงก์ไปยัง section นั้น [489][490]

## 3. ลิงก์พร้อม display text

```markdown
[[Android app management policy#Permission Review|Permission review]]
```

ผลลัพธ์:

```markdown
Permission review
```

ใช้ `|` เพื่อเปลี่ยนข้อความที่แสดงแทนชื่อโน้ตและ heading [489][491]

## 4. ลิงก์ไปยัง subheading

หากมี heading:

```markdown
## Permission Review

### Camera
```

ลิงก์ไปยัง subheading:

```markdown
[[Android app management policy#Permission Review#Camera]]
```

หรือใช้ display text:

```markdown
[[Android app management policy#Permission Review#Camera|Camera permission review]]
```

## 5. วิธีสร้างลิงก์ใน Obsidian

```text
1. พิมพ์ [[
2. เลือกโน้ตปลายทาง
3. กด #
4. เลือก heading
5. กด Enter
```

เมื่อพิมพ์ `[[` แล้วเลือกโน้ต จากนั้นกด `#` Obsidian จะแสดงรายการ headings ในโน้ตนั้นให้เลือก [491][493]

## 6. ตัวอย่างในโน้ต

```markdown
# Android Security Checklist

## Related

- [[Android app management policy#Permission Review|Permission review]]
- [[Android app management policy#Battery Restriction Policy|Battery policy]]
- [[Android app management policy#Pre-uninstall Checklist|Pre-uninstall checklist]]
```

## 7. Embed heading

ใช้ `!` นำหน้าเพื่อ embed เฉพาะ section:

```markdown
![[Android app management policy#Permission Review]]
```

Obsidian จะแสดงเนื้อหาใต้ heading นั้น จนถึง heading ระดับเดียวกันถัดไป [494]

## 8. Embed พร้อม display text

```markdown
![[Android app management policy#Permission Review|Permission review]]
```

## 9. ลิงก์ไปยัง heading ในโน้ตเดียวกัน

```markdown
[[#Permission Review]]
```

หรือใช้ display text:

```markdown
[[#Permission Review|ดู Permission Review]]
```

## 10. ข้อควรระวัง

```markdown
- ชื่อ heading ต้องตรงกับที่อยู่ในโน้ตปลายทาง
- หากแก้ชื่อ heading ลิงก์อาจเสีย
- ใช้ display text เพื่อให้ลิงก์อ่านง่าย
- ใช้ `#` คั่นระหว่างชื่อโน้ตและ heading
- ใช้ `|` เพื่อเปลี่ยนข้อความที่แสดง
- ใช้ `!` เพื่อ embed section
```

## Quick reference

```markdown
| ต้องการทำอะไร | Syntax |
|---|---|
| ลิงก์ไปยัง heading ในโน้ตเดียวกัน | `[[#Heading]]` |
| ลิงก์ไปยัง heading ในโน้ตอื่น | `[[Note#Heading]]` |
| ลิงก์พร้อม display text | `[[Note#Heading|Display text]]` |
| ลิงก์ไปยัง subheading | `[[Note#Heading#Subheading]]` |
| Embed section | `![[Note#Heading]]` |
| Embed section พร้อม display text | `![[Note#Heading|Display text]]` |
```

> [!success]
> ใช้ heading link เพื่อชี้ไปยัง section เฉพาะ  
> แทนการลิงก์ไปยังทั้งโน้ต  
> เพื่อให้ผู้อ่านไปถึงข้อมูลที่ต้องการได้เร็วขึ้น
```

การอ้างอิง:
[1] Link notes - Obsidian https://obsidianmd-obsidian-help.mintlify.app/getting-started/link-notes
[2] Linking to other pages in the docs - Tasks Contributing https://publish.obsidian.md/tasks-contributing/Documentation/Linking+to+other+pages+in+the+docs
[3] Internal Link - Obsidian Help https://obisian.bearblog.dev/internal-link/
[4] Obsidian-Official-Documentation/en/Linking notes and files ... https://github.com/chrisblifeos-pixel/Obsidian-Official-Documentation/blob/master/en/Linking%20notes%20and%20files/Embed%20files.md
[5] Is there an easy way to create a link to a section in another file? - Help https://forum.obsidian.md/t/is-there-an-easy-way-to-create-a-link-to-a-section-in-another-file/89609
[6] Embed files - Obsidian https://obsidianmd-obsidian-help.mintlify.app/linking/embed-files
[7] Notes Overview and Obsidian Help - ---------- Brain 2.0 https://publish.obsidian.md/ykaravas/Notes+Overview+and+Obsidian+Help
[8] Newbie question about linking two things inside the same note https://www.reddit.com/r/ObsidianMD/comments/19bt8n5/newbie_question_about_linking_two_things_inside/
[9] advanced_linking - active-inference - Obsidian Publish https://publish.obsidian.md/active-inference/docs/tools/advanced_linking
วิธี Embedded โน้ตหรือหัวข้อมาแสดง

```markdown
---
title: "วิธี Embedded โน้ตหรือหัวข้อมาแสดง"
aliases:
  - "Obsidian embed note"
  - "Embed heading"
  - "Obsidian transclusion"
tags:
  - "obsidian"
  - "embeds"
  - "links"
  - "reference"
type: "guide"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# วิธี Embedded โน้ตหรือหัวข้อมาแสดง

> [!summary]
> ใช้ `!` นำหน้า internal link เพื่อ **embed** โน้ต, section หรือ block  
> จากโน้ตอื่นมาแสดงในโน้ตปัจจุบัน  
> เนื้อหาที่ embed จะอัปเดตตาม source note เมื่อมีการแก้ไข

## 1. Embed ทั้งโน้ต

```markdown
![[Android app management policy]]
```

ผลลัพธ์: แสดงเนื้อหาทั้งโน้ต `Android app management policy` ในโน้ตปัจจุบัน

Obsidian ใช้ `!` นำหน้า internal link เพื่อ embed ไฟล์หรือโน้ต และเนื้อหาจะอัปเดตตาม source file เมื่อมีการแก้ไข [498][499]

## 2. Embed เฉพาะ heading

```markdown
![[Android app management policy#Permission Review]]
```

ผลลัพธ์: แสดงเฉพาะเนื้อหาใต้ heading `Permission Review`  
จนถึง heading ระดับเดียวกันถัดไป

## 3. Embed พร้อม display text

```markdown
![[Android app management policy#Permission Review|Permission review]]
```

ใช้ `|` เพื่อกำหนดข้อความที่แสดงแทนชื่อโน้ตและ heading

## 4. Embed subheading

หากมี heading:

```markdown
## Permission Review

### Camera
```

embed subheading:

```markdown
![[Android app management policy#Permission Review#Camera]]
```

## 5. Embed block

เพิ่ม block identifier ในโน้ตต้นทาง:

```markdown
- ตรวจ permissions ทุกไตรมาส ^block-id
```

embed block:

```markdown
![[Android app management policy#^block-id]]
```

Obsidian ใช้ `#^block-id` เพื่อ embed block เฉพาะ [498][503]

## 6. Embed image

```markdown
![[diagram.png]]
```

## 7. Embed PDF

```markdown
![[document.pdf]]
```

## 8. Embed canvas

```markdown
![[Eisenhower Matrix.canvas]]
```

## 9. Embed จาก folder

```markdown
![[Projects/Android app management policy]]
```

## 10. Embed พร้อม path

```markdown
![[Projects/Android app management policy#Permission Review]]
```

## 11. ตัวอย่างในโน้ต

```markdown
# Android Security Checklist

## Permission review

![[Android app management policy#Permission Review]]

## Battery policy

![[Android app management policy#Battery Restriction Policy]]
```

## 12. Embed policy

```markdown
## Embed policy

1. ใช้ embed เมื่อต้องการแสดงเนื้อหาจากโน้ตอื่น

2. ใช้ link ปกติเมื่อต้องการอ้างอิงโดยไม่ต้องแสดงเนื้อหา

3. ใช้ heading embed เมื่อต้องการแสดงเฉพาะ section

4. ใช้ block embed เมื่อต้องการแสดง block เฉพาะ

5. หลีกเลี่ยงการ embed โน้ตใหญ่เกินไป

6. ตรวจ broken links หลัง rename หรือ move โน้ต

7. ทดสอบ embed ก่อนใช้กับ vault จริง
```

## Quick reference

```markdown
| ต้องการทำอะไร | Syntax |
|---|---|
| Embed ทั้งโน้ต | `![[Note]]` |
| Embed heading | `![[Note#Heading]]` |
| Embed subheading | `![[Note#Heading#Subheading]]` |
| Embed block | `![[Note#^block-id]]` |
| Embed image | `![[image.png]]` |
| Embed PDF | `![[document.pdf]]` |
| Embed canvas | `![[canvas.canvas]]` |
```

> [!success]
> ใช้ embed เพื่อ reuse content จากโน้ตอื่น  
> โดยไม่ต้อง copy เนื้อหา  
> และเนื้อหาจะอัปเดตตาม source note เมื่อมีการแก้ไข
```

การอ้างอิง:
[1] Embed files - Obsidian Help https://obsidian.md/help/embeds
[2] Accepted file formats - Obsidian Help https://obsidian.md/help/file-formats
[3] obsidian.md › help › embed-web-pagesEmbed web pages - Obsidian Help https://obsidian.md/help/embed-web-pages
[4] obisian.bearblog.dev › embed-filesEmbed files – Obsidian Help https://obisian.bearblog.dev/embed-files/
[5] Explicitly reference note embedding on "Internal Links" page · Issue #844 · obsidianmd/obsidian-help https://github.com/obsidianmd/obsidian-help/issues/844
[6] Markdown Syntax - Obsidian Hub https://publish.obsidian.md/hub/04+-+Guides,+Workflows,+&+Courses/Guides/Markdown+Syntax
[7] https://raw.githubusercontent.com/kepano/obsidian-... https://raw.githubusercontent.com/kepano/obsidian-skills/main/skills/obsidian-markdown/SKILL.md
[8] How do I link to a note in its entirety, but to some part of it (word ... https://forum.obsidian.md/t/how-do-i-link-to-a-note-in-its-entirety-but-to-some-part-of-it-word-phrase-line/92175
วิธีปรับแต่งขนาดรูปภาพที่ embed

```markdown
---
title: "วิธีปรับแต่งขนาดรูปภาพที่ embed"
aliases:
  - "Obsidian image resize"
  - "Embed image size"
  - "Obsidian image width"
tags:
  - "obsidian"
  - "embeds"
  - "images"
  - "markdown"
  - "reference"
type: "guide"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# วิธีปรับแต่งขนาดรูปภาพที่ embed

> [!summary]
> ใช้ `|` ตามด้วยความกว้างเป็น pixel เพื่อปรับขนาดรูปที่ embed ใน Obsidian  
> เช่น `![[image.png|300]]`  
> หรือระบุทั้งกว้างและสูง เช่น `![[image.png|300x200]]`  
> แนะนำให้ระบุเฉพาะความกว้าง เพื่อให้ภาพคงสัดส่วนเดิม

## 1. Embed รูปปกติ

```markdown
![[diagram.png]]
```

## 2. กำหนดความกว้าง

```markdown
![[diagram.png|300]]
```

ผลลัพธ์: ภาพจะกว้าง 300 px และคงสัดส่วนเดิม

Obsidian รองรับการใส่ความกว้างหลัง `|` เช่น `![[image.png|300]]` โดยความสูงจะปรับตามสัดส่วนเดิม [507][509]

## 3. กำหนดทั้งกว้างและสูง

```markdown
![[diagram.png|300x200]]
```

ผลลัพธ์: ภาพจะกว้าง 300 px และสูง 200 px

> [!warning]
> การกำหนดทั้งกว้างและสูงอาจทำให้ภาพบิดเบี้ยว  
> ควรใช้เมื่อต้องการ fit พอดีกับ layout จริง ๆ

## 4. ใช้ Markdown link

```markdown

```

หรือ:

```markdown

```

สำหรับ Markdown image syntax ให้ใส่ขนาดใน alt text ก่อนวงเล็บของ path [507][512]

## 5. ตัวอย่างในโน้ต

```markdown
# Android Security Checklist

## Permission review

![[android-permissions.png|400]]

## Architecture

![[architecture.png|600]]
```

## 6. ขนาดที่แนะนำ

| การใช้งาน | ความกว้างแนะนำ |
|---|---|
| Icon หรือ screenshot เล็ก | 200–300 px |
| Diagram ในโน้ต | 400–600 px |
| Screenshot แนวนอน | 600–800 px |
| Full-width diagram | 800–1000 px |
| Mobile-friendly | 300–500 px |

## 7. ใช้ CSS snippet

หากต้องการให้ภาพทุกภาพมีขนาดสม่ำเสมอ ให้สร้าง CSS snippet:

```css
.image-embed img {
  max-width: 600px;
  height: auto;
}
```

วางไฟล์ใน:

```text
Vault/.obsidian/snippets/image-size.css
```

จากนั้นเปิดใช้งาน:

```text
Settings → Appearance → CSS snippets
```

## 8. ใช้ plugin Resizer

```text
Settings → Community plugins → Browse
→ ค้นหา Resizer
→ Install
→ Enable
```

วิธีใช้:

```text
1. คลิกภาพใน Live Preview
2. ลากมุมภาพเพื่อ resize
3. Obsidian จะอัปเดต Markdown อัตโนมัติ
```

Resizer รองรับการลากมุมภาพเพื่อ resize และเขียนค่ากลับเป็น `![[image.png|width]]` อัตโนมัติ [508]

## 9. Embed policy

```markdown
## Embed image policy

1. ใช้ width เดียว เพื่อคงสัดส่วนภาพ

2. ใช้ 300–600 px สำหรับ diagram หรือ screenshot ทั่วไป

3. ใช้ 800–1000 px เมื่อต้องการ full-width

4. หลีกเลี่ยงการระบุ height หากไม่จำเป็น

5. ใช้ CSS snippet เมื่อต้องการให้ทุกภาพมีขนาดสม่ำเสมอ

6. ทดสอบบน desktop และ mobile ก่อนใช้งานจริง
```

## Quick reference

```markdown
| ต้องการทำอะไร | Syntax |
|---|---|
| Embed รูป | `![[image.png]]` |
| กำหนดความกว้าง | `![[image.png|300]]` |
| กำหนดกว้างและสูง | `![[image.png|300x200]]` |
| ใช้ Markdown link | `![Alt|300](image.png)` |
| ใช้ CSS snippet | `.image-embed img { max-width: 600px; }` |
```

> [!success]
> ใช้ `|width` เพื่อปรับขนาดภาพโดยคงสัดส่วน  
> และใช้ CSS snippet เมื่อต้องการให้ทุกภาพมีขนาดสม่ำเสมอ
```

การอ้างอิง:
[1] Style guide - Obsidian Help https://obsidian.md/help/style-guide
[2] Image Copy and Reveal - Obsidian Plugin https://community.obsidian.md/plugins/image-copy-reveal
[3] Resizer - Obsidian Plugin https://community.obsidian.md/plugins/resizer
[4] Advanced formatting syntax - Obsidian Help https://obsidian.md/help/advanced-syntax
[5] Image Adjustments - SlRvb's Documentation - Obsidian Publish https://publish.obsidian.md/slrvb-docs/ITS+Theme/Image+Adjustments
[6] hysa/obsidian-image-resizer - GitHub https://github.com/hysa/obsidian-image-resizer
[7] zenn.dev · secula · articlesResizing Images in Obsidian - Zenn https://zenn.dev/secula/articles/d1f3e9c57847ee?locale=en
[8] Resize embedded content - Page 2 - Feature archive https://forum.obsidian.md/t/resize-embedded-content/877?page=2
[9] Better In-File Media Handling - Help https://forum.obsidian.md/t/better-in-file-media-handling/106736
[10] Obsidian-Cheatsheet/Obsidian Cheatsheet.md at main · kobbled/Obsidian-Cheatsheet https://github.com/kobbled/Obsidian-Cheatsheet/blob/main/Obsidian%20Cheatsheet.md
[11] Image resizing, like in Notion or Evernote - Help - Obsidian Forum https://forum.obsidian.md/t/image-resizing-like-in-notion-or-evernote/40132
[12] Resize image - Help https://forum.obsidian.md/t/resize-image/6517
