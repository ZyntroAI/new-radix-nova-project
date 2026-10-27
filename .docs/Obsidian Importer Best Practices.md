Obsidian Importer Best Practices

# Obsidian Importer Best Practices

**Obsidian Importer** คือ plugin ทางการสำหรับย้ายข้อมูลจาก app อื่นเข้า vault โดยแปลงเป็น **plain-text Markdown + attachments** — ใช้เป็น **one-time migration** ไม่ใช่ sync service [4560][4564][4565]

## Import Flow

```text
Export from source → Install Importer → Select format → Preview → Import → Verify
```

| ขั้น | ใช้ทำอะไร |
|---|---|
| **Export** [4565][4563] | เตรียมไฟล์ต้นทาง [4565][4563] |
| **Install** [4558][4560] | เปิด plugin [4558][4560] |
| **Select format** [4558][4560] | เลือก source [4558][4560] |
| **Preview** [4558][4560] | ตรวจ template [4558][4560] |
| **Import** [4558][4560] | แปลง [4558][4560] |
| **Verify** [4565][4560] | ตรวจผล [4565][4560] |

ใช้ flow นี้เพื่อ migration [4558][4560][4565]

## Pre-Import Checklist

- [ ] Backup vault [4565][4560]
- [ ] Export จาก source ให้ครบ [4565][4563]
- [ ] เลือก format ที่ Importer รองรับ [4560][4565]
- [ ] ตั้ง destination folder [4565][4560]
- [ ] ตั้ง attachment folder [4565][4560]
- [ ] ตั้ง attachment size limit [4561][4562]
- [ ] ตั้ง minimum image size [4561][4562]
- [ ] Preview template [4558][4560]
- [ ] Import ทีละก้อน [4565][4560]
- [ ] Verify หลัง import [4565][4560]

ใช้ checklist เพื่อ safety [4565][4560][4558]

## Format Selection

| Source | Format | หมายเหตุ |
|---|---|---|
| **Markdown** [4558][4564] | `.md` / `.zip` [4558][4564] | ใช้ได้ทั่วไป [4558][4564] |
| **HTML** [4561][4562] | `.html` / folder [4561][4562] | เว็บ / export อื่น [4561][4562] |
| **Evernote** [4563][4565] | `.enex` [4563][4565] | ต่อ notebook [4563][4565] |
| **Notion** [4565] | HTML zip [4565] | ดีกว่า Markdown [4565] |
| **OneNote** [4565] | export [4565] | section → folder [4565] |

ใช้ format ตาม source [4560][4565][4558]

## Template Usage

```yaml
title: "{{title}}"
created: "{{date}}"
tags:
  - imported
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Title** [4560][4558] | ตั้งชื่อ note [4560][4558] |
| **Properties** [4560][4558] | เพิ่ม metadata [4560][4558] |
| **Content** [4560][4558] | ปรับ body [4560][4558] |
| **Consistent** [4560][4558] | ทุก note เหมือนกัน [4560][4558] |

ใช้ template เพื่อ standardize [4560][4558][4565]

## Attachment Handling

```yaml
attachment size limit: 10 MB
minimum image size: 100 px
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Size limit** [4561][4562] | ตัดไฟล์ใหญ่ [4561][4562] |
| **Min image size** [4561][4562] | ตัด icon [4561][4562] |
| **Folder** [4565][4560] | จัดเก็บ [4565][4560] |
| **Reference** [4565][4560] | link ใน note [4565][4560] |

ใช้ attachment เพื่อ vault hygiene [4561][4562][4565]

## Post-Import

- [ ] ตรวจ broken link [4565][4560]
- [ ] ตรวจ attachment [4565][4560]
- [ ] ตรวจ frontmatter [4565][4560]
- [ ] ตรวจ tag hierarchy [4563][4565]
- [ ] สร้าง MOC [4565][4560]
- [ ] ทบทวน structure [4565][4560]

ใช้ post-import เพื่อ quality [4565][4560][4558]

## Best Practices

- [ ] Backup ก่อน [4565][4560][4558]
- [ ] Import ทีละก้อน [4565][4560][4558]
- [ ] ใช้ template [4560][4558][4565]
- [ ] ใช้ attachment limit [4561][4562][4565]
- [ ] ใช้ preview [4558][4560][4565]
- [ ] ใช้ destination folder [4565][4560][4558]
- [ ] ใช้ post-import check [4565][4560][4558]
- [ ] ทบทวน structure [4565][4560][4558]

## Anti-Patterns

| Anti-pattern | ปัญหา | ทางแก้ |
|---|---|---|
| Import ทั้ง vault ครั้งเดียว [4565][4560] | พังยากแก้ [4565][4560] | แบ่ง import [4565][4560] |
| ไม่มี backup [4565][4560] | กู้ไม่ได้ [4565][4560] | Backup ก่อน [4565][4560] |
| ไม่ใช้ template [4560][4558] | ไม่ consistent [4560][4558] | ใช้ template [4560][4558] |
| ไม่จำกัด attachment [4561][4562] | Vault บวม [4561][4562] | ตั้ง limit [4561][4562] |
| ไม่ verify [4565][4560] | Link พัง [4565][4560] | ตรวจหลัง import [4565][4560] |

## Checklist

- [ ] มี backup
- [ ] มี export
- [ ] มี format
- [ ] มี template
- [ ] มี attachment limit
- [ ] มี preview
- [ ] มี import
- [ ] มี verify
- [ ] มี post-import
- [ ] ทบทวน structure

## Related Notes

- [[MOC - Obsidian]]
- [[Obsidian Properties — Complete Guide]]
- [[ตัวอย่างการใช้ Templates ร่วมกับ Properties]]
- [[Organize notes with MOCs]]
- [[YAML Frontmatter for auto sync]]
- [[MOC - Platform Engineering]]

การอ้างอิง:
[1] Import Markdown files - Obsidian Help https://obsidian.md/help/import/markdown
[2] Import Markdown files - Obsidian Help https://obsidian.md/help/Import+notes/Import+Markdown+files
[3] Importer - Obsidian Help https://obsidian.md/help/plugins/importer
[4] Import HTML files - Obsidian Help https://obsidian.md/help/import/html
[5] Import HTML files - Obsidian Help https://obsidian.md/help/Import+notes/Import+HTML+files
[6] นำเข้าจาก Evernote - วิธีใช้ Obsidian https://obsidian.md/th/help/import/evernote
[7] obsidian-importer/README.md at 054df1d3f8e368b7c2add22c3bae26d96e721901 · obsidianmd/obsidian-importer https://github.com/obsidianmd/obsidian-importer/blob/054df1d3f8e368b7c2add22c3bae26d96e721901/README.md
[8] Importer for Obsidian: Features, Installation & Examples https://obsidianmate.com/plugins/obsidian-importer
เปลี่ยนเป็น Obsidian note พร้อม YAML ให้หน่อย

```markdown
---
title: "Obsidian Importer Best Practices"
aliases:
  - "Obsidian Importer"
  - "Importer Best Practices"
tags:
  - obsidian
  - importer
  - migration
  - workflow
created: 2026-10-27
status: evergreen
type: reference
---

# Obsidian Importer Best Practices

**Obsidian Importer** คือ plugin ทางการสำหรับย้ายข้อมูลจาก app อื่นเข้า vault โดยแปลงเป็น **plain-text Markdown + attachments** — ใช้เป็น **one-time migration** ไม่ใช่ sync service

## Import Flow

```text
Export from source → Install Importer → Select format → Preview → Import → Verify
```

| ขั้น | ใช้ทำอะไร |
|---|---|
| **Export** | เตรียมไฟล์ต้นทาง |
| **Install** | เปิด plugin |
| **Select format** | เลือก source |
| **Preview** | ตรวจ template |
| **Import** | แปลง |
| **Verify** | ตรวจผล |

ใช้ flow นี้เพื่อ migration

## Pre-Import Checklist

- [ ] Backup vault
- [ ] Export จาก source ให้ครบ
- [ ] เลือก format ที่ Importer รองรับ
- [ ] ตั้ง destination folder
- [ ] ตั้ง attachment folder
- [ ] ตั้ง attachment size limit
- [ ] ตั้ง minimum image size
- [ ] Preview template
- [ ] Import ทีละก้อน
- [ ] Verify หลัง import

ใช้ checklist เพื่อ safety

## Format Selection

| Source | Format | หมายเหตุ |
|---|---|---|
| **Markdown** | `.md` / `.zip` | ใช้ได้ทั่วไป |
| **HTML** | `.html` / folder | เว็บ / export อื่น |
| **Evernote** | `.enex` | ต่อ notebook |
| **Notion** | HTML zip | ดีกว่า Markdown |
| **OneNote** | export | section → folder |

ใช้ format ตาม source

## Template Usage

```yaml
title: "{{title}}"
created: "{{date}}"
tags:
  - imported
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Title** | ตั้งชื่อ note |
| **Properties** | เพิ่ม metadata |
| **Content** | ปรับ body |
| **Consistent** | ทุก note เหมือนกัน |

ใช้ template เพื่อ standardize

## Attachment Handling

```yaml
attachment size limit: 10 MB
minimum image size: 100 px
```

| หลักการ | ใช้ทำอะไร |
|---|---|
| **Size limit** | ตัดไฟล์ใหญ่ |
| **Min image size** | ตัด icon |
| **Folder** | จัดเก็บ |
| **Reference** | link ใน note |

ใช้ attachment เพื่อ vault hygiene

## Post-Import

- [ ] ตรวจ broken link
- [ ] ตรวจ attachment
- [ ] ตรวจ frontmatter
- [ ] ตรวจ tag hierarchy
- [ ] สร้าง MOC
- [ ] ทบทวน structure

ใช้ post-import เพื่อ quality

## Best Practices

- [ ] Backup ก่อน
- [ ] Import ทีละก้อน
- [ ] ใช้ template
- [ ] ใช้ attachment limit
- [ ] ใช้ preview
- [ ] ใช้ destination folder
- [ ] ใช้ post-import check
- [ ] ทบทวน structure

## Anti-Patterns

| Anti-pattern | ปัญหา | ทางแก้ |
|---|---|---|
| Import ทั้ง vault ครั้งเดียว | พังยากแก้ | แบ่ง import |
| ไม่มี backup | กู้ไม่ได้ | Backup ก่อน |
| ไม่ใช้ template | ไม่ consistent | ใช้ template |
| ไม่จำกัด attachment | Vault บวม | ตั้ง limit |
| ไม่ verify | Link พัง | ตรวจหลัง import |

## Checklist

- [ ] มี backup
- [ ] มี export
- [ ] มี format
- [ ] มี template
- [ ] มี attachment limit
- [ ] มี preview
- [ ] มี import
- [ ] มี verify
- [ ] มี post-import
- [ ] ทบทวน structure

## Related Notes

- [[MOC - Obsidian]]
- [[Obsidian Properties — Complete Guide]]
- [[ตัวอย่างการใช้ Templates ร่วมกับ Properties]]
- [[Organize notes with MOCs]]
- [[YAML Frontmatter for auto sync]]
- [[MOC - Platform Engineering]]
```

