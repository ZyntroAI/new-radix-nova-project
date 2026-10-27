Obsidian Properties — Complete Guide

# Obsidian Properties — Complete Guide

**Properties** คือ structured metadata ที่เก็บใน **YAML frontmatter** ด้านบนของ note ใช้สำหรับ **จัดหมวด, ค้นหา, กรอง, template และ Bases** [4468][4469][4421]

## Basic Syntax

```yaml
---
title: Security Fundamentals
created: 2026-10-27
status: seedling
tags:
  - security
  - platform-engineering
---
```

| ส่วน | ความหมาย |
|---|---|
| `---` [4468][4469] | เปิด/ปิด frontmatter [4468][4469] |
| `key` [4468][4469] | ชื่อ property [4468][4469] |
| `value` [4468][4469] | ค่าของ property [4468][4469] |
| `tags` [4468][4469] | tag ของ note [4468][4469] |

ใช้ YAML เพื่อ metadata [4468][4469][4421]

## Property Types

| Type | ตัวอย่าง | ใช้เมื่อ |
|---|---|---|
| **Text** [4468][4469] | `title: My Note` [4468][4469] | ข้อความ / link [4468][4469] |
| **List** [4468][4469] | `tags: [a, b]` [4468][4469] | หลายค่า [4468][4469] |
| **Number** [4468][4469] | `rating: 4.5` [4468][4469] | ตัวเลข [4468][4469] |
| **Checkbox** [4468][4469] | `done: true` [4468][4469] | true/false [4468][4469] |
| **Date** [4468][4469] | `created: 2026-10-27` [4468][4469] | วันที่ [4468][4469] |
| **Date & time** [4468][4469] | `due: 2026-10-27T14:30:00` [4468][4469] | วัน+เวลา [4468][4469] |
| **Tags** [4468][4469] | `tags:` list [4468][4469] | tag [4468][4469] |

ใช้ type ตามข้อมูล [4468][4469][4421]

## Internal Links

```yaml
related: "[[Security Fundamentals]]"
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Quote** [4468][4469] | ต้องมี `"` [4468][4469] |
| **Wikilink** [4468][4469] | `[[Note]]` [4468][4469] |
| **List link** [4468][4469] | หลาย link [4468][4469] |
| **Clickable** [4468][4469] | ใช้งานได้ [4468][4469] |

ใช้ link เพื่อ connect [4468][4469][4421]

## Reserved Properties

| Property | ใช้ทำอะไร |
|---|---|
| `tags` [4468][4469] | Tag ของ note [4468][4469] |
| `aliases` [4468][4469] | ชื่ออื่น [4468][4469] |
| `cssclasses` [4468][4469] | CSS hook [4468][4469] |

> ⚠️ ตั้งแต่ Obsidian 1.4 ให้ใช้ `tags`, `aliases`, `cssclasses` แทนรูปเอกพจน์เดิม [4468]

ใช้ reserved เพื่อ built-in [4468][4469][4421]

## Search Syntax

```text
["status":seedling]
["created":2026-10-27]
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Search syntax** [4469][4468] | ค้นหาตาม property [4469][4468] |
| **Template** [4469][4468] | ใส่ property อัตโนมัติ [4469][4468] |
| **Merge** [4469][4468] | รวมกับที่มีอยู่ [4469][4468] |
| **Consistent** [4469][4468] | ทุก note เหมือนกัน [4469][4468] |

ใช้ search + template เพื่อ workflow [4469][4468][4421]

## Bases Integration

```yaml
status: seedling
area: platform-engineering
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Filter** [4421][4469] | กรอง note [4421][4469] |
| **Sort** [4421][4469] | เรียง [4421][4469] |
| **View** [4421][4469] | Table / card [4421][4469] |
| **Formula** [4421][4469] | คำนวณ [4421][4469] |

ใช้ Bases เพื่อ database-like [4421][4469][4468]

## Best Practices

- [ ] ใช้ property น้อยแต่ชัด [4468][4469][4421]
- [ ] ใช้ type ให้ถูก [4468][4469][4421]
- [ ] ใช้ quote สำหรับ link [4468][4469][4421]
- [ ] ใช้ `tags` สำหรับ tag [4468][4469][4421]
- [ ] ใช้ `aliases` สำหรับชื่ออื่น [4468][4469][4421]
- [ ] ใช้ Bases สำหรับ dashboard [4421][4469][4468]
- [ ] ใช้ template สำหรับ consistency [4468][4469][4421]
- [ ] ทบทวน schema เป็นรอบ [4468][4469][4421]

## Anti-Patterns

| Anti-pattern | ปัญหา | ทางแก้ |
|---|---|---|
| Property เยอะเกิน [4468][4469] | ดูแลยาก [4468][4469] | ลดให้เหลือจำเป็น [4468][4469] |
| ไม่มี type [4468][4469] | ใช้ยาก [4468][4469] | กำหนด type [4468][4469] |
| Link ไม่ quote [4468][4469] | Parse ผิด [4468][4469] | เพิ่ม quote [4468][4469] |
| ใช้ `tags` ผิด [4468][4469] | สับสน [4468][4469] | ใช้ reserved ให้ถูก [4468][4469] |
| ไม่มี template [4468][4469] | ไม่ consistent [4468][4469] | ใช้ template [4468][4469] |

## Checklist

- [ ] มี frontmatter
- [ ] มี property type
- [ ] มี internal link
- [ ] มี reserved property
- [ ] มี search syntax
- [ ] มี template
- [ ] มี Bases
- [ ] ทบทวน schema

## Related Notes

- [[MOC - Obsidian]]
- [[Organize notes with MOCs]]
- [[วิธีใช้ MOC ร่วมกับ Obsidian Graph View]]
- [[วิธีตั้งค่า Group และสีใน Graph View]]
- [[Security Fundamentals]]
- [[MOC - Platform Engineering]]

การอ้างอิง:
[1] Obsidian Changelog https://obsidian.md/de/changelog/page/13/
[2] Obsidian Properties: The Complete Guide | Obsidian Mate https://obsidianmate.com/article/obsidian-properties-complete-guide
