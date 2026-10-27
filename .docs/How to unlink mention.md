How to unlink mention

```markdown
---
title: "How to unlink mention"
aliases:
  - "Unlink mention"
  - "Remove backlink"
  - "Remove wikilink"
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

# How to unlink mention

> [!summary]
> ใน Obsidian ไม่มีปุ่ม **Unlink** โดยตรงใน Backlinks pane ในปัจจุบัน  
> วิธี unlink mention คือเปิดโน้ตต้นทางที่มี `[[wikilink]]` แล้วลบวงเล็บเหลี่ยมคู่ออก  
> ข้อความจะยังอยู่เป็น plain text แต่จะไม่ถูกนับเป็น linked mention อีกต่อไป

## 1. เปิด Backlinks

เปิดโน้ตปลายทางที่ต้องการตรวจ backlinks แล้วเปิดแผง:

```text
Right sidebar → Backlinks
```

หรือใช้ Command Palette:

```text
Ctrl/Cmd + P
→ Backlinks: Open backlinks for the current note
```

Backlinks pane แบ่งเป็น **Linked mentions** และ **Unlinked mentions**  
โดย Linked mentions คือโน้ตที่มี internal link ชี้มายังโน้ตปัจจุบัน [452][453]

## 2. หา mention ที่ต้องการ unlink

ใน **Linked mentions** ให้คลิก mention เพื่อเปิดโน้ตต้นทาง

ตัวอย่าง หากโน้ต `MOC — Document Operations` มี backlink จาก `Daily Note`:

```markdown
- [[MOC — Document Operations]]
```

ให้เปิดโน้ต `Daily Note` เพื่อแก้ไข

## 3. Unlink แบบ manual

แก้จาก:

```markdown
- [[MOC — Document Operations]]
```

เป็น:

```markdown
- MOC — Document Operations
```

หลังบันทึก โน้ตนี้จะไม่ปรากฏใน **Linked mentions** ของ `MOC — Document Operations` อีกต่อไป

## 4. Unlink แบบคง alias ไว้

หากเดิมเป็น:

```markdown
- [[MOC — Document Operations|Document operations]]
```

ให้แก้เป็น:

```markdown
- Document operations
```

## 5. Unlink แบบ heading link

หากเดิมเป็น:

```markdown
- [[MOC — Document Operations#Merge|Merge workflow]]
```

ให้แก้เป็น:

```markdown
- Merge workflow
```

## 6. Unlink แบบ Markdown link

หาก vault ใช้ Markdown link:

```markdown
- [Document operations](MOC%20—%20Document%20Operations.md)
```

ให้แก้เป็น:

```markdown
- Document operations
```

## 7. Unlink หลาย mention

ใช้ Find and replace:

```text
Ctrl/Cmd + H
```

ค้นหา:

```text
[[MOC — Document Operations]]
```

แทนด้วย:

```text
MOC — Document Operations
```

> [!warning]
> ใช้ Find and replace ทั้ง vault อย่างระมัดระวัง  
> ควร preview ผลลัพธ์และทำ backup ก่อน replace ทั้ง vault

## 8. Unlink แบบเปลี่ยนเป็น plain text

| เดิม | หลัง unlink |
|---|---|
| `[[Note name]]` | `Note name` |
| `[[Note name|Display text]]` | `Display text` |
| `[[Note name#Heading]]` | `Note name#Heading` |
| `[[Note name#Heading|Display text]]` | `Display text` |
| `[Display text](Note%20name.md)` | `Display text` |

## 9. ตรวจหลัง unlink

หลังแก้ไข ให้กลับไปที่โน้ตปลายทางแล้วเปิด:

```text
Backlinks → Linked mentions
```

mention ที่ถูก unlink ควรหายไปจาก **Linked mentions**  
และอาจปรากฏใน **Unlinked mentions** หากข้อความยังตรงกับชื่อหรือ alias ของโน้ต

Obsidian แยก Linked mentions คือลิงก์ที่มีอยู่จริง ออกจาก Unlinked mentions ซึ่งเป็นข้อความที่ตรงกับชื่อหรือ alias แต่ยังไม่ได้ทำเป็นลิงก์ [452][453]

## 10. Unlink policy

```markdown
## Unlink policy

1. ตรวจว่า mention นั้นควรถูก unlink จริงหรือไม่

2. เปิดโน้ตต้นทางจาก Linked mentions

3. ลบ `[[` และ `]]` รอบข้อความ

4. คงข้อความ display เดิมไว้

5. บันทึกโน้ต

6. กลับไปตรวจ Backlinks อีกครั้ง

7. หากต้องการ unlink หลายจุด ให้ใช้ Find and replace อย่างระมัดระวัง
```

## Quick reference

```markdown
| ต้องการทำอะไร | วิธีทำ |
|---|---|
| Unlink wikilink | ลบ `[[` และ `]]` |
| Unlink แบบ alias | ลบ `[[` และ `]]` คง display text ไว้ |
| Unlink heading link | ลบ `[[` และ `]]` คง heading หรือ display text |
| Unlink Markdown link | ลบ `[...](...)` เหลือ display text |
| หา linked mentions | Backlinks → Linked mentions |
| หา unlinked mention | Backlinks → Unlinked mentions |
```

> [!success]
> Unlink mention คือการลบ `[[...]]` ในโน้ตต้นทาง  
> ข้อความยังอยู่ แต่จะไม่สร้าง backlink อีกต่อไป
```

การอ้างอิง:
[1] Backlinks - Obsidian Help https://obsidian.md/help/backlinks
[2] Backlinks - Obsidian Help https://obsidian.md/help/plugins/backlinks
[3] Better Backlinks - Obsidian Plugin https://community.obsidian.md/plugins/better-backlinks
[4] Outgoing links - Obsidian Help https://obsidian.md/help/plugins/outgoing-links
[5] Link notes - Obsidian Help https://obsidian.md/help/link-notes
[6] Changelog - Obsidian https://obsidian.md/changelog/page/23/
[7] Backlinks - ជំនួយ Obsidian https://publish.obsidian.md/help-km/Plugins/Backlinks
[8] deepwiki.com · obsidianmd · obsidian-helpInternal Links and Backlinks | obsidianmd/obsidian-help |... https://deepwiki.com/obsidianmd/obsidian-help/4.2-internal-links-and-backlinks
[9] How to use Obsidian backlinks | Connecting notes and finding ... https://note.com/ryu_obsidian/n/nab329261d7b6?hl=en
[10] Aliases - Obsidian https://obsidianmd-obsidian-help.mintlify.app/linking/aliases
[11] Internal Links and Backlinks | victor-software-house/obsidian ... https://deepwiki.com/victor-software-house/obsidian-help/3.1-internal-links-and-backlinks
[12] note.com › plu_tra_ › nTrying out Backlinks and Outgoing Links in Obsidian https://note.com/plu_tra_/n/nec58a57f34aa?hl=en
[13] Quick unlinking from the linked mentions section - Obsidian Forum https://forum.obsidian.md/t/quick-unlinking-from-the-linked-mentions-section/114608
[14] A use for Obsidian Unlinked Mentions - Learning Aloud https://learningaloud.com/blog/2024/02/25/a-use-for-obsidian-unlinked-mentions/
[15] Topics tagged unlinked - Obsidian Forum https://forum.obsidian.md/tag/unlinked/63
