Obsidian Merge

```markdown
## Obsidian Merge

> [!summary]
> **Merge** คือการรวมโน้ตหนึ่งเข้ากับอีกโน้ตหนึ่ง เพื่อลดโน้ตซ้ำซ้อน
> รวมเนื้อหาที่เกี่ยวข้องไว้ที่เดียว และคง links ที่ชี้มายังโน้ตเดิมได้
> ใน Obsidian ใช้ core plugin **Note composer** สำหรับ merge notes

## เมื่อไรควร Merge

ใช้ merge เมื่อโน้ตมีเนื้อหาซ้ำหรือเกี่ยวข้องกันจนแยกไว้ไม่มีประโยชน์ เช่น:

- มีโน้ตสองไฟล์เกี่ยวกับหัวข้อเดียวกัน
- มี draft หลายไฟล์แต่ควรรวมเป็นโน้ตหลัก
- มี capture ใน Inbox ที่ควรรวมเข้ากับ reference note เดิม
- มีโน้ตสั้นที่ควรเป็น section ของโน้ตใหญ่
- มีโน้ตชื่อใกล้กัน เช่น `Android permissions`, `Android permission policy`, `Permissions Android`
- มีโน้ตที่แยกกันแต่เนื้อหาทับซ้อนและค้นหาได้ยาก

> [!tip]
> ก่อน merge ให้ถามว่า:  
> “ถ้าผมค้นหาหัวข้อนี้ในอนาคต ผมอยากเจอโน้ตเดียวที่ครบ หรือหลายโน้ตที่แยกกัน?”

## วิธี Merge ใน Obsidian

### 1. เปิดโน้ตต้นทาง

เปิดโน้ตที่ต้องการ **ย้ายเนื้อหาออก** หรือโน้ตที่ต้องการ merge เข้าไปยังโน้ตอื่น

### 2. เรียก Command Palette

```text
Ctrl/Cmd + P
```

### 3. เลือก Merge current file with another file

ค้นหาคำสั่ง:

```text
Note composer: Merge current file with another file...
```

### 4. เลือกโน้ตปลายทาง

เลือกโน้ตที่ต้องการให้เนื้อหาถูกรวมเข้าไป เช่น:

```text
Android app management policy.md
```

### 5. เลือกการจัดการ links

Obsidian จะถามว่าต้องการจัดการ links ที่ชี้มายังโน้ตต้นทางอย่างไร

| ตัวเลือก | ผลลัพธ์ |
|---|---|
| Update links | Links ที่ชี้ไปยังโน้ตต้นทางจะถูกเปลี่ยนให้ชี้ไปยังโน้ตปลายทาง |
| Keep links | Links เดิมยังชี้ไปยังโน้ตต้นทาง ซึ่งอาจทำให้เกิด broken links หลังลบโน้ตต้นทาง |
| Ask every time | Obsidian จะถามทุกครั้งที่ merge |

> [!recommendation]
> โดยทั่วไปให้เลือก **Update links**  
> เพื่อให้ backlinks, wikilinks และ references ชี้ไปยังโน้ตหลักหลัง merge

## ตัวอย่างการ Merge

ก่อน merge มีสองโน้ต:

```text
Android permissions.md
Android app management policy.md
```

ใน `Android permissions.md`:

```markdown
# Android permissions

- ตรวจ Location, Camera, Microphone และ Files/Media
- ใช้ least privilege
- อนุญาตเฉพาะสิ่งที่จำเป็น
```

ใน `Android app management policy.md`:

```markdown
# Android app management policy

## Permission review

- ตรวจ permissions รายไตรมาส
- ตรวจ Location, Camera, Microphone, Contacts, SMS และ Accessibility
```

Merge `Android permissions.md` เข้าไปยัง `Android app management policy.md`:

```text
Android permissions.md
        ↓ merge into
Android app management policy.md
```

หลัง merge:

```text
Android app management policy.md
```

จากนั้นตรวจและจัดระเบียบเนื้อหาในโน้ตปลายทาง เช่น:

```markdown
# Android app management policy

## Permission review

- ตรวจ permissions รายไตรมาส
- ตรวจ Location, Camera, Microphone, Contacts, SMS และ Accessibility
- ใช้หลัก least privilege
- อนุญาตเฉพาะ permissions ที่จำเป็น
```

## Merge vs Move vs Link

| การกระทำ | ใช้เมื่อ | ผลลัพธ์ |
|---|---|---|
| **Merge** | เนื้อหาซ้ำหรือควรอยู่ในโน้ตเดียว | เนื้อหาถูกรวมและโน้ตต้นทางถูกลบ |
| **Move** | โน้ตยังควรแยกอยู่ แต่อยู่ผิด folder | ตำแหน่งไฟล์เปลี่ยน แต่เนื้อหายังแยก |
| **Link** | โน้ตเกี่ยวข้องแต่มีหัวข้อต่างกัน | สร้างความสัมพันธ์ด้วย `[[wikilinks]]` |
| **Embed** | ต้องการแสดงเนื้อหาจากโน้ตอื่นในโน้ตปัจจุบัน | ใช้ `![[โน้ต]]` โดยโน้ตต้นทางยังอยู่ |
| **Archive** | ยังไม่ใช้ แต่ไม่ต้องการลบ | ย้ายไป `Archive/` เพื่อลด clutter |

> [!note]
> อย่า merge เพียงเพราะสองโน้ตอยู่หัวข้อใกล้กัน  
> หากแต่ละโน้ตมีบทบาทชัดเจน เช่น policy, checklist และ reference การใช้ links อาจดีกว่า

## Pre-merge Checklist

```markdown
- [ ] โน้ตสองไฟล์เกี่ยวกับหัวข้อเดียวกันจริงหรือไม่
- [ ] มีเนื้อหาซ้ำหรือทับซ้อนหรือไม่
- [ ] โน้ตไหนควรเป็นโน้ตหลักหรือปลายทาง
- [ ] มี Frontmatter ที่ต้องรวมหรือไม่
- [ ] มี tags หรือ aliases ที่ควรคงไว้หรือไม่
- [ ] มี backlinks ที่ชี้มายังโน้ตต้นทางหรือไม่
- [ ] มี embedded files หรือ images ที่ต้องตรวจ path หรือไม่
- [ ] มี task, draft หรือข้อมูล local ที่ต้องเก็บไว้หรือไม่
- [ ] ควรเลือก Update links หรือไม่
- [ ] มี backup หรือ version history เพียงพอหรือไม่
```

## Post-merge Checklist

```markdown
- [ ] โน้ตต้นทางถูกลบแล้ว
- [ ] เนื้อหาในโน้ตปลายทางไม่ซ้ำซ้อน
- [ ] Frontmatter ถูกรวมอย่างถูกต้อง
- [ ] Tags และ aliases ยังเหมาะสม
- [ ] Wikilinks ยังทำงานได้
- [ ] Backlinks ชี้ไปยังโน้ตหลักแล้ว
- [ ] Images และ attachments ยังเปิดได้
- [ ] โครงสร้าง headings อ่านง่าย
- [ ] MOC ที่เกี่ยวข้องได้รับการอัปเดต
- [ ] ไม่มี broken links หลงเหลืออยู่
```

## Merge Policy

```markdown
## Obsidian merge policy

1. Merge เฉพาะเมื่อเนื้อหาซ้ำ, ทับซ้อน หรือควรอยู่ในโน้ตเดียวกัน

2. เลือกโน้ตปลายทางที่:
   - มีชื่อชัดเจนที่สุด
   - มีเนื้อหาครบที่สุด
   - มี backlinks มากที่สุด
   - เป็น canonical note ของหัวข้อนั้น

3. ก่อน merge ให้ตรวจ Frontmatter, tags, aliases, attachments และ links

4. ใช้ "Update links" เป็นค่าเริ่มต้นเพื่อรักษา graph ของ vault

5. หลัง merge ให้จัดระเบียบ headings, ลบเนื้อหาซ้ำ และอัปเดต MOC

6. หากไม่แน่ใจว่าควร merge หรือไม่ ให้ archive โน้ตต้นทางไว้ชั่วคราวแทนการลบ

7. หลีกเลี่ยงการ merge โน้ตที่เป็น:
   - policy
   - checklist
   - reference
   - daily note
   - project note
   โดยไม่มีเหตุผลชัดเจน เพราะแต่ละประเภทมีบทบาทต่างกัน
```

## Merge Decision Tree

```text
พบโน้ตสองไฟล์ที่เกี่ยวข้องกัน
   ↓
เนื้อหาซ้ำหรือทับซ้อนหรือไม่?
   ├── ไม่ใช่
   │    ↓
   │  เกี่ยวข้องกันแต่หัวข้อต่างกัน
   │    ↓
   │  ใช้ [[wikilinks]] แทนการ merge
   │
   └── ใช่
        ↓
โน้ตไหนควรเป็น canonical note?
   ↓
เลือกโน้ตที่ชื่อชัด, เนื้อหาครบ และมี backlinks มากที่สุด
   ↓
ตรวจ Frontmatter, tags, aliases, attachments และ links
   ↓
Merge โน้ตต้นทางเข้าโน้ตปลายทาง
   ↓
เลือก Update links
   ↓
จัดระเบียบเนื้อหาและลบส่วนซ้ำ
   ↓
อัปเดต MOC และตรวจ broken links
```

## Quick Reference

```markdown
| ต้องการทำอะไร | ใช้คำสั่ง |
|---|---|
| รวมโน้ตปัจจุบันเข้ากับโน้ตอื่น | `Note composer: Merge current file with another file...` |
| แยก section ออกเป็นโน้ตใหม่ | `Note composer: Extract current selection...` |
| ย้ายโน้ตไป folder อื่น | File explorer หรือ drag and drop |
| เชื่อมโน้ตสองหัวข้อ | `[[ชื่อโน้ต]]` |
| แสดงเนื้อหาโน้ตอื่น | `![[ชื่อโน้ต]]` |
| ค้นหาโน้ตเดิม | `Ctrl/Cmd + O` |
| เปิด Command Palette | `Ctrl/Cmd + P` |
```

> [!danger]
> Merge เป็น destructive action เพราะโน้ตต้นทางจะถูกลบ  
> ก่อน merge ให้แน่ใจว่ามี backup, Git history หรือ File recovery พร้อมใช้งาน

> [!success]
> Merge ที่ดีทำให้ vault มี canonical notes ชัดเจน  
> ลด duplicate content, รักษา backlinks และทำให้ค้นหาความรู้ได้ง่ายขึ้น
```

