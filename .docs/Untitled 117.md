จัดการ unlinked mentions

```markdown
---
title: "จัดการ unlinked mentions"
aliases:
  - "Unlinked mentions"
  - "Manage unlinked mentions"
  - "Obsidian backlinks"
tags:
  - "obsidian"
  - "backlinks"
  - "links"
  - "vault-maintenance"
type: "guide"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# จัดการ unlinked mentions

> [!summary]
> **Unlinked mention** คือข้อความในโน้ตที่ตรงกับชื่อหรือ alias ของโน้ตอื่น  
> แต่ยังไม่ได้ทำเป็น `[[wikilink]]`  
> การจัดการคือเลือกว่าจะ **Link**, **Ignore** หรือ **Rename**  
> เพื่อให้ vault มีความสัมพันธ์ชัดเจนและลด broken links ในอนาคต

## 1. เปิด Unlinked mentions

เปิดโน้ตปลายทางที่ต้องการตรวจ แล้วเปิดแผง:

```text
Right sidebar → Backlinks
```

หรือใช้ Command Palette:

```text
Ctrl/Cmd + P
→ Backlinks: Open backlinks for the current note
```

ใน Backlinks pane จะมีสองส่วน:

```text
Linked mentions
Unlinked mentions
```

- **Linked mentions** — โน้ตที่มี `[[wikilink]]` ชี้มายังโน้ตปัจจุบัน
- **Unlinked mentions** — โน้ตที่มีข้อความตรงกับชื่อหรือ alias แต่ยังไม่ได้ลิงก์

Obsidian แยก Linked mentions และ Unlinked mentions ใน Backlinks pane โดย unlinked mention คือข้อความธรรมดาที่ตรงกับชื่อโน้ต active note [467]

## 2. ตัวอย่าง

มีโน้ตชื่อ:

```text
Android app management policy.md
```

และมีโน้ตอื่นเขียนว่า:

```markdown
ตรวจ Android app management policy ทุก 90 วัน
```

ข้อความ `Android app management policy` จะปรากฏใน **Unlinked mentions**  
เพราะยังไม่ได้เขียนเป็น:

```markdown
[[Android app management policy]]
```

## 3. เลือก Link mention

ใน **Unlinked mentions** ให้คลิกปุ่ม:

```text
Link mention
```

Obsidian จะเปลี่ยน:

```markdown
ตรวจ Android app management policy ทุก 90 วัน
```

เป็น:

```markdown
ตรวจ [[Android app management policy]] ทุก 90 วัน
```

หลังจากนั้น ข้อความจะย้ายจาก **Unlinked mentions** ไปอยู่ใน **Linked mentions** [467][470]

## 4. เลือก Ignore mention

หากไม่ต้องการให้ข้อความนั้นกลายเป็น wikilink ให้เลือก:

```text
Ignore
```

Obsidian จะบันทึกว่าไม่ต้องแนะนำ mention นี้อีก

เหมาะกับกรณี เช่น:

```markdown
Android app management policy คือชื่อเอกสาร ไม่ใช่หัวข้อที่ต้องเชื่อมโยง
```

## 5. จัดการ alias

หากโน้ตหลักมี alias เช่น:

```yaml
***
title: "Android app management policy"
aliases:
  - "Android app policy"
  - "นโยบายจัดการแอป Android"
***
```

และมีโน้ตอื่นเขียน:

```markdown
ตรวจ Android app policy ทุก 90 วัน
```

ข้อความ `Android app policy` จะปรากฏใน **Unlinked mentions**  
เมื่อกด **Link mention** Obsidian จะสร้าง:

```markdown
[[Android app management policy|Android app policy]]
```

การใช้ alias ช่วยให้ค้นหา unlinked mention จากชื่อเรียกอื่นได้ และเมื่อ link แล้ว Obsidian จะใช้ alias เป็น display text [470][471]

## 6. จัดการหลาย mention

เปิดโน้ตที่มีข้อความหลายจุด เช่น:

```markdown
ตรวจ Android app management policy ทุก 90 วัน

ดู Android app policy สำหรับ permission review
```

เปิด Backlinks ของ `Android app management policy` แล้วเลือก:

```text
Link mention
```

ทำซ้ำกับทุก mention ที่ต้องการ

## 7. Bulk link ด้วย plugin

ติดตั้ง plugin:

```text
Settings → Community plugins → Browse
→ ค้นหา Link Unlinked Mentions
→ Install
→ Enable
```

ใช้คำสั่ง:

```text
Ctrl/Cmd + P
→ Link mentions of other notes in current note
```

Plugin จะแสดง preview ของทุก match ก่อนแก้ไข และแยกกรณีที่คลุมเครือออกให้ตรวจก่อน [468]

> [!warning]
> อย่า bulk link ทั้ง vault โดยไม่ตรวจ preview  
> เพราะคำเดียวกันอาจหมายถึงโน้ตหลายตัวหรือเป็นข้อความทั่วไป

## 8. ใช้ Inline Link Suggestions

ติดตั้ง plugin:

```text
Settings → Community plugins → Browse
→ ค้นหา Inline Link Suggestions
→ Install
→ Enable
```

Plugin นี้จะขีดเส้นใต้ข้อความที่ตรงกับชื่อหรือ alias ของโน้ตที่มีอยู่  
คลิกข้อความเพื่อเปลี่ยนเป็น wikilink ได้ทันที [469]

## 9. Unlink mention

หาก link ผิด ให้เปิดโน้ตต้นทางแล้วลบ `[[` และ `]]`

จาก:

```markdown
ตรวจ [[Android app management policy]] ทุก 90 วัน
```

เป็น:

```markdown
ตรวจ Android app management policy ทุก 90 วัน
```

ข้อความจะกลับไปเป็น **Unlinked mention** อีกครั้ง

## 10. Unlinked mentions policy

```markdown
## Unlinked mentions policy

1. ตรวจ Unlinked mentions ทุก 90 วัน

2. Link เฉพาะเมื่อข้อความหมายถึงโน้ตนั้นจริง

3. ใช้ Ignore เมื่อข้อความเป็นคำทั่วไปหรือไม่ควรเชื่อมโยง

4. ใช้ aliases เพื่อให้ค้นหาชื่อเรียกอื่นได้

5. หลีกเลี่ยง bulk link โดยไม่ตรวจ context

6. หาก link ผิด ให้ unlink โดยลบ `[[` และ `]]`

7. ทบทวน broken links หลังจัดการ unlinked mentions
```

## 11. Workflow

```text
เปิดโน้ตปลายทาง
   ↓
เปิด Backlinks
   ↓
ดู Unlinked mentions
   ↓
ตรวจ context ของแต่ละ mention
   ↓
เลือก Link หรือ Ignore
   ↓
ตรวจ wikilink ที่สร้าง
   ↓
ตรวจ broken links
   ↓
อัปเดต MOC
```

## 12. Quick reference

```markdown
| ต้องการทำอะไร | วิธีทำ |
|---|---|
| ดู unlinked mentions | Backlinks → Unlinked mentions |
| เปลี่ยนเป็น wikilink | Link mention |
| ไม่ต้องการเชื่อมโยง | Ignore |
| ใช้ alias | ตั้ง aliases ใน Frontmatter |
| ยกเลิก link | ลบ `[[` และ `]]` |
| Bulk link | ใช้ Link Unlinked Mentions plugin |
```

> [!success]
> จัดการ unlinked mentions เป็นระยะ เพื่อเปลี่ยนข้อความที่เกี่ยวข้องให้เป็น wikilinks  
> โดยไม่สร้าง link ที่ไม่มีความหมายหรือทำให้ vault รก
```

การอ้างอิง:
[1] الروابط الخلفية - مساعدة Obsidian https://obsidian.md/ar/help/plugins/backlinks
[2] Link Unlinked Mentions - Obsidian Plugin https://community.obsidian.md/plugins/link-unlinked-mentions
[3] Inline Link Suggestions - Obsidian Plugin https://community.obsidian.md/plugins/inline-link-suggestions
[4] obsidian-help/en/Linking notes and files/Aliases.md at master ... https://github.com/obsidianmd/obsidian-help/blob/master/en/Linking%20notes%20and%20files/Aliases.md
[5] Obsidian-Official-Documentation/en/Linking notes and files ... https://github.com/chrisblifeos-pixel/Obsidian-Official-Documentation/blob/master/en/Linking%20notes%20and%20files/Aliases.md
[6] List unresolved links as unlinked mentions - Obsidian Forum https://forum.obsidian.md/t/list-unresolved-links-as-unlinked-mentions/55659
วิธีใช้ Link Unlinked Mentions plugin

```markdown
---
title: "วิธีใช้ Link Unlinked Mentions plugin"
aliases:
  - "Link Unlinked Mentions"
  - "Bulk link unlinked mentions"
  - "Obsidian unlinked mentions plugin"
tags:
  - "obsidian"
  - "backlinks"
  - "links"
  - "plugins"
  - "vault-maintenance"
type: "guide"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# วิธีใช้ Link Unlinked Mentions plugin

> [!summary]
> **Link Unlinked Mentions** ใช้ค้นหาข้อความที่ตรงกับชื่อหรือ alias ของโน้ต active  
> แล้วเปลี่ยนเป็น `[[wikilinks]]` ได้ทั้งในโน้ตเดียวหรือทั่ว vault  
> เหมาะกับการเชื่อมโยง mention จำนวนมาก แต่ควร preview ก่อน bulk link เสมอ  
> เพราะคำเดียวกันอาจหมายถึงโน้ตหลายตัวหรือเป็นข้อความทั่วไป

## 1. ติดตั้ง plugin

```text
Settings → Community plugins
→ ปิด Restricted mode หากยังปิดอยู่
→ Browse
→ ค้นหา Link Unlinked Mentions
→ Install
→ Enable
```

Plugin นี้ใช้ bulk-link unlinked mentions ของ active note และ aliases ทั่วทั้ง vault [475]

## 2. เปิดใช้งาน

เปิดโน้ตปลายทางที่ต้องการค้นหา mention เช่น:

```text
Android app management policy.md
```

จากนั้นใช้ Command Palette:

```text
Ctrl/Cmd + P
→ Link Unlinked Mentions: Link mentions of other notes in current note
```

หรือคลิกขวาที่โน้ตใน File explorer แล้วเลือก:

```text
Link mentions of this note in other notes
```

## 3. ตัวอย่างการใช้งาน

มีโน้ตปลายทาง:

```text
Android app management policy.md
```

และมีโน้ตอื่นเขียน:

```markdown
ตรวจ Android app management policy ทุก 90 วัน

ดู Android app policy สำหรับ permission review
```

เมื่อรัน plugin จะค้นหา:

```text
Android app management policy
Android app policy
```

แล้วเสนอให้เปลี่ยนเป็น:

```markdown
ตรวจ [[Android app management policy]] ทุก 90 วัน

ดู [[Android app management policy|Android app policy]] สำหรับ permission review
```

## 4. Preview ก่อน link

Plugin จะแสดง preview ของทุก match ก่อนแก้ไข

```text
File: Daily Note.md
Match: Android app management policy
Replacement: [[Android app management policy]]
```

ให้ตรวจ context รอบข้อความก่อนกดยืนยัน

> [!warning]
> อย่ากด bulk link ทั้ง vault โดยไม่ตรวจ preview  
> เพราะคำทั่วไปอาจถูกแปลงเป็น wikilink ผิด context

## 5. จัดการ ambiguous matches

หากคำที่พบอาจหมายถึงหลายโน้ต plugin จะแยกไว้ให้ผู้ใช้เลือกก่อน

ตัวอย่าง:

```text
Android permissions
```

อาจหมายถึง:

```text
Android App Permissions.md
Android app management policy.md
```

ให้เลือกโน้ตปลายทางที่ถูกต้องก่อนกด link

## 6. ตั้งค่าที่แนะนำ

```text
Settings → Community plugins → Link Unlinked Mentions
```

| การตั้งค่า | ค่าที่แนะนำ |
|---|---|
| Case-insensitive matching | เปิด |
| Minimum match length | 4 หรือ 5 |
| Exclude folders | `Templates/`, `Archive/`, `.obsidian/` |
| Exclude note titles | คำทั่วไป เช่น `Home`, `Daily`, `Inbox` |
| Require confirmation | เปิด |
| Auto-rescan | ปิด หาก vault ใหญ่ |

การจำกัด minimum match length และ exclude folders ช่วยลด false positive จากคำสั้นหรือโน้ต template [473]

## 7. Workflow ที่แนะนำ

```text
เปิดโน้ต canonical ที่ต้องการหา mention
   ↓
รัน Link Unlinked Mentions
   ↓
ตรวจ preview ทีละ match
   ↓
เลือกเฉพาะ match ที่ context ถูกต้อง
   ↓
Link mention
   ↓
ตรวจ broken links และ backlinks
   ↓
อัปเดต MOC
```

## 8. ตัวอย่าง workflow

```text
เปิด Android app management policy.md
   ↓
รัน Link Unlinked Mentions
   ↓
พบ mention ใน Daily Note.md
   ↓
ตรวจ context
   ↓
เลือก Android app management policy
   ↓
Link mention
   ↓
กลับไปตรวจ Backlinks
```

## 9. Unlink หาก link ผิด

หาก link ผิด ให้เปิดโน้ตต้นทางแล้วลบ `[[` และ `]]`

จาก:

```markdown
ตรวจ [[Android app management policy]] ทุก 90 วัน
```

เป็น:

```markdown
ตรวจ Android app management policy ทุก 90 วัน
```

## 10. Link Unlinked Mentions policy

```markdown
## Link Unlinked Mentions policy

1. ใช้ plugin เฉพาะกับ canonical note ที่มีชื่อชัดเจน

2. ตรวจ preview ทุก match ก่อน link

3. หลีกเลี่ยง bulk link ทั้ง vault หากไม่จำเป็น

4. จำกัด minimum match length อย่างน้อย 4 ตัวอักษร

5. Exclude Templates, Archive และ system folders

6. ใช้ aliases เพื่อเพิ่มความแม่นยำ

7. หากไม่แน่ใจ ให้ link ทีละ mention แทน bulk link

8. ตรวจ broken links และ backlinks หลัง link
```

## Quick reference

```markdown
| ต้องการทำอะไร | วิธีทำ |
|---|---|
| เปิด plugin | `Ctrl/Cmd + P` → `Link Unlinked Mentions` |
| Link mention เดียว | เลือก match → Link |
| Bulk link ทั้งโน้ต | เลือก Link all |
| Bulk link ทั้ง vault | ใช้ confirmation และตรวจ preview |
| ตั้งค่า plugin | `Settings → Community plugins → Link Unlinked Mentions` |
| ยกเลิก link ผิด | ลบ `[[` และ `]]` |
```

> [!success]
> ใช้ plugin นี้เพื่อเชื่อม mention จำนวนมากอย่างมีประสิทธิภาพ  
> แต่ควรตรวจ preview และทำทีละส่วนเพื่อหลีกเลี่ยง false positive
```

การอ้างอิง:
[1] Link Plus - Obsidian Plugin https://community.obsidian.md/plugins/link-plus
[2] Internal links - Obsidian Help https://obsidian.md/help/links
[3] Link Unlinked Mentions — Obsidian Plugin Observer https://plugin.observer/plugin/link-unlinked-mentions
[4] Auto-linking https://www.reddit.com/r/ObsidianMD/comments/kdhtw3/autolinking/
[5] Unlinked mention https://www.reddit.com/r/ObsidianMD/comments/zr3kh2/unlinked_mention/
[6] Allow batch selecting links in unlinked mentions *before* updating ... https://forum.obsidian.md/t/allow-batch-selecting-links-in-unlinked-mentions-before-updating-the-note/117701
[7] github.com › mii-key › obsidian-linksGitHub - mii-key/obsidian-links: manipulate & manage ... https://github.com/mii-key/obsidian-links
เปรียบเทียบกับ Better Backlinks

```markdown
---
title: "เปรียบเทียบกับ Better Backlinks"
aliases:
  - "Better Backlinks vs Link Unlinked Mentions"
  - "Obsidian backlinks plugins"
  - "Unlinked mentions plugins"
tags:
  - "obsidian"
  - "backlinks"
  - "links"
  - "plugins"
  - "vault-maintenance"
type: "comparison"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# เปรียบเทียบกับ Better Backlinks

> [!summary]
> **Link Unlinked Mentions** เหมาะกับการ bulk-link mention จำนวนมากทั่ว vault  
> ส่วน **Better Backlinks** เหมาะกับการดู backlinks และ unlinked mentions ในบริบท  
> พร้อมแปลงเป็น wikilink ทีละจุดอย่างรวดเร็ว  
> หากต้องการความแม่นยำและตรวจ context ให้ใช้ Better Backlinks  
> หากต้องการประหยัดเวลาและมี canonical note ชัดเจน ให้ใช้ Link Unlinked Mentions

## ภาพรวม

| ประเด็น | Link Unlinked Mentions | Better Backlinks |
|---|---|---|
| จุดประสงค์หลัก | Bulk-link unlinked mentions ทั่ว vault | แสดง backlinks และ unlinked mentions พร้อมบริบท |
| การเลือก | เลือกได้หลาย mention หรือ bulk | เลือกทีละ mention จากการ์ด |
| การแสดงบริบท | Preview match ก่อน link | แสดง block รอบ mention |
| การทำงานกับ aliases | รองรับ | รองรับ |
| ความเหมาะสม | Vault ใหญ่, canonical note ชัด | ตรวจและ link อย่างระมัดระวัง |
| ความเสี่ยง false positive | สูงกว่าหาก bulk link | ต่ำกว่าเพราะตรวจทีละจุด |

## Link Unlinked Mentions

เหมาะเมื่อมี canonical note ชัดเจน เช่น `Android app management policy`  
และต้องการหา mention ของชื่อโน้ตหรือ alias ทั่ว vault เพื่อเปลี่ยนเป็น wikilink

```text
เปิด Android app management policy.md
   ↓
รัน Link Unlinked Mentions
   ↓
ตรวจ preview
   ↓
Bulk link ทั้ง vault
```

จุดเด่น:

- Bulk-link หลาย mention ในครั้งเดียว
- รองรับ active note และ aliases
- เหมาะกับ canonical note ที่มีชื่อชัดเจน
- ประหยัดเวลาเมื่อมี mention จำนวนมาก
- ควรใช้ร่วมกับ preview และ confirmation

## Better Backlinks

เหมาะเมื่อต้องการดู backlinks พร้อมบริบทรอบข้อความ และเลือก link ทีละจุด

```text
เปิดโน้ตปลายทาง
   ↓
เปิด Better Backlinks
   ↓
ดู unlinked mentions พร้อม context
   ↓
เลือก mention ที่ถูกต้อง
   ↓
คลิกเพื่อสร้าง wikilink
```

จุดเด่น:

- แสดงการ์ดของแต่ละ mention พร้อม block รอบข้อความ
- แสดง title matches และ unlinked mentions
- เลือก link ได้ในคลิกเดียว
- เหมาะกับการตรวจ context ก่อน link
- ลดความเสี่ยง false positive

Better Backlinks แสดง backlinks เป็นการ์ดพร้อม block รอบลิงก์ และแสดง title matches กับ unlinked mentions ที่สามารถ link ได้ในคลิกเดียว [454]

## ความแตกต่างสำคัญ

| หัวข้อ | Link Unlinked Mentions | Better Backlinks |
|---|---|---|
| โหมดหลัก | Bulk link | Review และ link ทีละจุด |
| ขอบเขต | ทั่ว vault | โน้ต active |
| การแสดง context | Preview match | Block context รอบ mention |
| ความเร็ว | เร็วกว่าเมื่อมีหลาย mention | เร็วเมื่อตรวจทีละจุด |
| ความแม่นยำ | ขึ้นกับ preview และ context | สูงกว่าเมื่อตรวจทีละจุด |
| เหมาะกับ canonical note | ใช่ | ใช่ |
| เหมาะกับ ambiguous mention | ต้องระวัง | เหมาะกว่า |
| เหมาะกับ vault ใหญ่ | ใช่ หากมี canonical note ชัด | ใช่ สำหรับ review รายโน้ต |

## เมื่อใช้อะไร

| สถานการณ์ | แนะนำ |
|---|---|
| มี canonical note ชัด เช่น policy หรือ reference | Link Unlinked Mentions |
| ต้องการ link หลาย mention พร้อมกัน | Link Unlinked Mentions |
| ต้องการตรวจ context ก่อน link | Better Backlinks |
| มี ambiguous mention | Better Backlinks |
| ต้องการดู backlinks พร้อมบริบท | Better Backlinks |
| ต้องการ link ทีละจุด | Better Backlinks |
| ต้องการ bulk link อย่างระมัดระวัง | ใช้ Link Unlinked Mentions + preview |

## Workflow ที่แนะนำ

```text
เปิด canonical note
   ↓
รัน Link Unlinked Mentions
   ↓
ตรวจ preview
   ↓
หาก match ชัดเจน → Bulk link
   ↓
หาก match คลุมเครือ → Better Backlinks
   ↓
ตรวจ context ทีละ mention
   ↓
Link เฉพาะที่ถูกต้อง
   ↓
ตรวจ broken links และ backlinks
```

## ตัวอย่าง

มี canonical note:

```text
Android app management policy.md
```

และมี unlinked mention:

```markdown
ตรวจ Android app management policy ทุก 90 วัน
```

### ใช้ Link Unlinked Mentions

```text
เปิด Android app management policy.md
→ รัน Link Unlinked Mentions
→ พบ mention ใน Daily Note.md
→ ตรวจ context
→ Link mention
```

ผลลัพธ์:

```markdown
ตรวจ [[Android app management policy]] ทุก 90 วัน
```

### ใช้ Better Backlinks

```text
เปิด Android app management policy.md
→ เปิด Better Backlinks
→ ดู unlinked mention พร้อม context
→ ตรวจว่าหมายถึง policy จริง
→ คลิก link
```

ผลลัพธ์เหมือนกัน แต่ Better Backlinks ช่วยให้เห็นบริบทรอบข้อความก่อน link

## Policy

```markdown
## Unlinked mentions policy

1. ใช้ Link Unlinked Mentions สำหรับ canonical note ที่ชัดเจน

2. ใช้ Better Backlinks เมื่อต้องการตรวจ context ก่อน link

3. หลีกเลี่ยง bulk link ทั้ง vault หากไม่จำเป็น

4. ตรวจ preview ทุกครั้งก่อน link

5. ใช้ aliases เพื่อเพิ่มความแม่นยำ

6. หาก match คลุมเครือ ให้ใช้ Better Backlinks แทน

7. ตรวจ broken links และ backlinks หลัง link

8. ทบทวน unlinked mentions ทุก 90 วัน
```

## Quick reference

```markdown
| ต้องการทำอะไร | ใช้ plugin |
|---|---|
| Bulk link หลาย mention | Link Unlinked Mentions |
| ตรวจ context ก่อน link | Better Backlinks |
| ดู backlinks พร้อมบริบท | Better Backlinks |
| Link canonical note | Link Unlinked Mentions |
| จัดการ ambiguous mention | Better Backlinks |
| ตรวจ unlinked mentions รายโน้ต | Better Backlinks |
```

> [!success]
> ใช้ **Link Unlinked Mentions** เพื่อความเร็ว  
> ใช้ **Better Backlinks** เพื่อความแม่นยำ  
> และใช้ทั้งคู่ร่วมกันเมื่อ vault ใหญ่และมี canonical notes ชัดเจน
```

การอ้างอิง:
[1] Better options for Backlinks and Outgoing links > Unlinked Mentions https://forum.obsidian.md/t/better-options-for-backlinks-and-outgoing-links-unlinked-mentions/94076
[2] Finding connections in ... https://forum.obsidian.md/t/finding-connections-in-unlinked-notes/83999/3
[3] Better Backlinks - Help https://forum.obsidian.md/t/better-backlinks/33593
