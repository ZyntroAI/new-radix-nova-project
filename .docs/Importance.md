Importance

```markdown
## Importance

**Importance** คือระดับความสำคัญของงานต่อเป้าหมาย ผลลัพธ์ หรือความเสี่ยง  
ไม่ได้หมายถึงว่างานนั้นเร่งด่วนหรือไม่

ใน Eisenhower Matrix ให้แยกสองแกน:

| แกน | คำถามหลัก |
|---|---|
| **Urgency** | ต้องทำเมื่อไร |
| **Importance** | งานนี้สำคัญกับเป้าหมายหรือผลลัพธ์แค่ไหน |

## ระดับ Importance

| ระดับ | ความหมาย | ตัวอย่าง |
|---|---|---|
| **Critical** | กระทบเป้าหมายหลัก, security หรือ production โดยตรง | แก้ security incident, กู้คืน database |
| **High** | สำคัญต่อเป้าหมายหรือ project หลัก | ทำ migration, สร้าง API หลัก |
| **Medium** | ช่วยให้ระบบหรือ workflow ดีขึ้น | ปรับ dashboard, เพิ่ม documentation |
| **Low** | Nice to have หรือทำภายหลังได้ | จัดรูปแบบโน้ต, เพิ่ม label สวยงาม |

## ใช้ใน Task properties

```yaml
***
title: "Review Supabase RLS policies"
type: "task"
status: "delegated"
importance: "critical"
urgency: "high"
quadrant: "do"
due: "2026-10-13"
***
```

หรือใช้ inline properties:

```markdown
- [ ] Review Supabase RLS policies [importance:: critical] [urgency:: high] [quadrant:: do]
```

## ผสานกับ Eisenhower Matrix

```text
┌─────────────────────┬─────────────────────┐
│ Do                  │ Schedule            │
│ Urgent + Important  │ Not urgent +        │
│                     │ Important           │
├─────────────────────┼─────────────────────┤
│ Delegate            │ Delete              │
│ Urgent + Not        │ Not urgent +        │
│ Important           │ Not important       │
└─────────────────────┴─────────────────────┘
```

| Importance | Urgent | Quadrant | การจัดการ |
|---|---|---|---|
| High / Critical | High | `do` | ทำทันที |
| High / Critical | Low | `schedule` | กำหนดเวลาทำ |
| Low | High | `delegate` | มอบหมายหรือจำกัดเวลา |
| Low | Low | `delete` | ลบหรือ archive |

## ตัวอย่างการจัดงาน

```markdown
- [ ] Fix broken RLS policy [importance:: critical] [urgency:: high] [quadrant:: do]
- [ ] Create Task API migrations [importance:: high] [urgency:: medium] [quadrant:: schedule]
- [ ] Reply to non-critical support request [importance:: low] [urgency:: high] [quadrant:: delegate]
- [ ] Remove unused demo tasks [importance:: low] [urgency:: low] [quadrant:: delete]
```

## หลักการตัดสิน

```markdown
1. งานนี้กระทบเป้าหมายหลักหรือไม่
2. หากไม่ทำ จะเกิดความเสียหายหรือความเสี่ยงอะไร
3. งานนี้ช่วยให้ project หรือ system ก้าวหน้าหรือไม่
4. งานนี้จำเป็นต่อ security, compliance หรือ reliability หรือไม่
5. งานนี้ต้องทำเอง หรือ delegate ได้
6. งานนี้มี deadline จริงหรือแค่รู้สึกเร่ง
```

> [!tip]
> อย่าให้ความเร่งด่วนบอกว่างานสำคัญเสมอไป  
> งานที่ urgent แต่ low importance มักเหมาะกับการ delegate มากกว่าการทำเอง

