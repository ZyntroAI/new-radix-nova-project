วิธีการใช้งาน Aliases ร่วมกับ Internal Links ใน Obsidian

# วิธีใช้ Aliases ร่วมกับ Internal Links ใน Obsidian

**Aliases** คือชื่อทางเลือกของ note ที่ใช้เรียกผ่าน **Internal Link** ได้ โดย Obsidian จะสร้าง link แบบ `[[ชื่อจริง|alias]]` ให้อัตโนมัติ [4463][4465][4464]

## เพิ่ม Alias

```yaml
---
aliases:
  - AI
  - Artificial Intelligence
---
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| `aliases` [4463][4464] | กำหนดชื่อทางเลือก [4463][4464] |
| **List** [4463][4464] | ใส่หลายชื่อ [4463][4464] |
| **YAML** [4463][4464] | อยู่ใน frontmatter [4463][4464] |
| **Note** [4463][4464] | ชี้ไปที่ note เดียว [4463][4464] |

ใช้ `aliases` เพื่อ alternate name [4463][4464][4465]

## ลิงก์ด้วย Alias

```markdown
[[Artificial Intelligence|AI]]
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Typing alias** [4463][4465] | ขึ้น suggestion [4463][4465] |
| **Curved arrow** [4463][4465] | ระบุว่าเป็น alias [4463][4465] |
| **Pipe** [4463][4465] | แสดง alias [4463][4465] |
| **Real target** [4463][4465] | ชี้ไป note จริง [4463][4465] |

ใช้ `|` เพื่อ display text [4463][4465][4464]

## Alias vs Custom Display

| แบบ | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| **Alias** [4463][4465] | ใช้ซ้ำทั้ง vault [4463][4465] | `[[Artificial Intelligence|AI]]` [4463][4465] |
| **Custom display** [4463][4465] | ใช้ครั้งเดียว [4463][4465] | `[[Note|ชื่อเฉพาะ]]` [4463][4465] |

ใช้ alias เมื่อ reuse [4463][4465][4464]

## กรณีใช้งาน

| กรณี | ตัวอย่าง |
|---|---|
| **Acronym** [4463][4465] | `AI` → `Artificial Intelligence` [4463][4465] |
| **Nickname** [4463][4465] | `Bob` → `Robert` [4463][4465] |
| **หลายภาษา** [4463][4465] | `AI` / `ปัญญาประดิษฐ์` [4463][4465] |
| **ชื่อเต็ม / สั้น** [4463][4465] | `FastAPI` / `Fast API` [4463][4465] |

ใช้ alias เพื่อ flexibility [4463][4465][4464]

## Unlinked Mentions

```text
พิมพ์ alias ใน note → Unlinked mention → คลิกเพื่อสร้าง link
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Detect** [4463][4465] | เจอ alias ใน text [4463][4465] |
| **Convert** [4463][4465] | กลายเป็น internal link [4463][4465] |
| **Display alias** [4463][4465] | ใช้ alias เป็น display [4463][4465] |
| **Backlink** [4463][4465] | เชื่อมกลับ note [4463][4465] |

ใช้ unlinked mention เพื่อ auto-link [4463][4465][4464]

## Best Practices

- [ ] ใช้ `aliases` เป็น list [4463][4464][4465]
- [ ] ใช้ alias สำหรับชื่อที่ใช้ซ้ำ [4463][4465][4464]
- [ ] ใช้ custom display สำหรับครั้งเดียว [4463][4465][4464]
- [ ] ใช้ acronym + full name [4463][4465][4464]
- [ ] ใช้หลายภาษาถ้าจำเป็น [4463][4465][4464]
- [ ] ทบทวน alias เป็นรอบ [4463][4465][4464]

## Anti-Patterns

| Anti-pattern | ปัญหา | ทางแก้ |
|---|---|---|
| ใช้ custom display ซ้ำ ๆ [4463][4465] | ไม่ reusable [4463][4465] | ใช้ alias [4463][4465] |
| ใช้ alias เยอะเกิน [4463][4465] | สับสน [4463][4465] | จำกัดจำนวน [4463][4465] |
| ไม่ใช้ list [4463][4464] | Parse ผิด [4463][4464] | ใช้ YAML list [4463][4464] |
| ใช้ alias ชนกัน [4463][4465] | Link ผิด [4463][4465] | ตั้งชื่อไม่ซ้ำ [4463][4465] |
| ไม่ทบทวน | Stale [4463][4465] | Review [4463][4465] |

## Checklist

- [ ] มี `aliases`
- [ ] ใช้ YAML list
- [ ] ใช้ `|` สำหรับ display
- [ ] ใช้ alias สำหรับ reuse
- [ ] ใช้ unlinked mention
- [ ] ทบทวน alias

## Related Notes

- [[MOC - Obsidian]]
- [[Obsidian Properties — Complete Guide]]
- [[Organize notes with MOCs]]
- [[วิธีใช้ MOC ร่วมกับ Obsidian Graph View]]
- [[Security Fundamentals]]
- [[MOC - Platform Engineering]]

การอ้างอิง:
[1] Aliases - Obsidian Help https://obsidian.md/help/Linking+notes+and+files/Aliases
[2] Obsidian Changelog https://obsidian.md/bn/changelog/page/13/
[3] obsidian-help/en/Linking notes and files/Internal links.md ... https://github.com/obsidianmd/obsidian-help/blob/master/en/Linking%20notes%20and%20files/Internal%20links.md
[4] Obsidian-Official-Documentation/en/Linking notes and files ... https://github.com/chrisblifeos-pixel/Obsidian-Official-Documentation/blob/master/en/Linking%20notes%20and%20files/Internal%20links.md
