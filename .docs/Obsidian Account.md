Learn about https://obsidian.md/auth?returnto=%2Faccount%2F

```markdown
[Obsidian Account](https://obsidian.md/auth?returnto=%2Faccount%2F)
```

หรือถ้าต้องการแบบเปิดในแท็บใหม่:

```markdown
[Obsidian Account](https://obsidian.md/auth?returnto=%2Faccount%2F){:target="_blank"}
```

หรือแบบ callout สำหรับวางในโน้ต:

```markdown
> [!link] Obsidian Account
> [เข้าสู่ระบบหรือจัดการบัญชี Obsidian](https://obsidian.md/auth?returnto=%2Faccount%2F)
```

ลิงก์นี้คือหน้า **Sign in / authentication ของ Obsidian** ซึ่งพาผู้ใช้ไปยัง `/account/` หลังล็อกอินสำเร็จ ใช้สำหรับเข้าถึงหรือจัดการบัญชี Obsidian เช่น Sync, Publish หรือการตั้งค่าที่เกี่ยวกับบัญชี

```markdown
[Obsidian Account](https://obsidian.md/auth?returnto=%2Faccount%2F)
```

## ความหมายของ URL

```text
https://obsidian.md/auth?returnto=%2Faccount%2F
```

| ส่วน | ความหมาย |
|---|---|
| `https://obsidian.md` | เว็บไซต์ทางการของ Obsidian |
| `/auth` | หน้ายืนยันตัวตนหรือ sign in |
| `?returnto=%2Faccount%2F` | หลังล็อกอินแล้ว ให้กลับไปที่ `/account/` |
| `%2F` | URL encoding ของ `/` |

ดังนั้น `returnto=%2Faccount%2F` จะถอดรหัสเป็น:

```text
returnto=/account/
```

## โค้ดสำหรับ Obsidian

### ลิงก์ปกติ

```markdown
[Obsidian Account](https://obsidian.md/auth?returnto=%2Faccount%2F)
```

ผลลัพธ์: [Obsidian Account](https://obsidian.md/auth?returnto=%2Faccount%2F)

### ลิงก์พร้อมคำอธิบาย

```markdown
[เข้าสู่ระบบบัญชี Obsidian](https://obsidian.md/auth?returnto=%2Faccount%2F)
```

### External link ใน Frontmatter

```yaml
---
title: "Obsidian Account"
type: "reference"
source: "https://obsidian.md/auth?returnto=%2Faccount%2F"
---
```

### Callout

```markdown
> [!info] Obsidian Account
> [เข้าสู่ระบบหรือจัดการบัญชี Obsidian](https://obsidian.md/auth?returnto=%2Faccount%2F)
```

### ในตาราง

```markdown
| บริการ | ลิงก์ |
|---|---|
| Obsidian Account | [Sign in / Account](https://obsidian.md/auth?returnto=%2Faccount%2F) |
```

## ตัวอย่างโน้ตอ้างอิง

```markdown
---
title: "Obsidian Account"
aliases:
  - "Obsidian sign in"
  - "Obsidian account login"
tags:
  - "obsidian"
  - "account"
  - "reference"
type: "reference"
created: "2026-10-11"
updated: "2026-10-11"
source: "https://obsidian.md/auth?returnto=%2Faccount%2F"
---

# Obsidian Account

ใช้ลิงก์นี้เพื่อเข้าสู่ระบบบัญชี Obsidian  
หลังล็อกอินสำเร็จ ระบบจะนำไปยังหน้า account

[เข้าสู่ระบบบัญชี Obsidian](https://obsidian.md/auth?returnto=%2Faccount%2F)

> [!note]
> พารามิเตอร์ `returnto=%2Faccount%2F` หมายถึงหลัง sign in แล้วให้ไปที่ `/account/`
```

> [!warning]
> อย่าแชร์ลิงก์ authentication ที่มี session token, one-time code หรือ parameter ส่วนตัว  
> ลิงก์นี้ปลอดภัยเพราะเป็นเพียง URL หน้า sign in และ `returnto` ปกติ ไม่มี token ฝังอยู่

