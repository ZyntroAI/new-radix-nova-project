---
title: Stale Data Management
aliases:
  - Data Cleanup
  - Archive Old Records
  - Retention Policy
created: 2026-10-04
updated: 2026-10-04
repo: ZyntroAI/new-crystalcastle
tags:
  - data
  - maintenance
  - database
  - cleanup
  - policy
version: 1.0
related: fetch_releases.py, task.md
---

# 🧹 Stale Data Management — Complete Guide

## � Overview
**Stale data** = ข้อมูลที่ล้าสมัย ไม่ถูกอ้างอิง ไม่เปลี่ยนแปลง และไม่จำเป็นต้องเข้าถึงบ่อย การจัดการอย่างเป็นระบบช่วยลดต้นทุนพื้นที่ เพิ่มประสิทธิภาพการค้นหา และรักษาความเร็วของระบบ

---

## 📋 1. Define Stale — เมื่อไหร่เรียกว่า "ล้าสมัย"

| Category | Definition | Threshold | Action |
|---|---|---|---|
| **Active** | เข้าถึง/อัปเดตภายใน 30 วัน | ≤ 30d | Keep, index, hot storage |
| **Warm** | ไม่มีการเปลี่ยนแปลง 30–90 วัน | 30–90d | Keep, compress, fewer indexes |
| **Stale** | ไม่มีการเข้าถึง > 90 วัน | 90–365d | Archive, move to cold storage |
| **Expired** | เก็บครบกำหนดตามนโยบาย | > 365d | Delete / anonymize / permanent archive |
| **Duplicate** | มี `id` ซ้ำกันหรือเนื้อหาเหมือนกัน | Any time | Remove newer copy |
| **Orphaned** | ไม่มี parent/foreign key เชื่อมโยง | Any time | Review → delete |

**For our project:**
- GitHub Releases → **never delete** (immutable), but mark & archive
- PRs / Issues → closed > 180d = stale
- Checkpoint files → older than latest run = safe to archive
- NDJSON staging → imported > 7d = safe to remove

---

## ⚖️ 2. Retention Policy — นโยบายการเก็บรักษา

### Default Rules
| Data Type | Retention Period | Storage Tier | After Expiry |
|---|---|---|---|
| Active work logs | 90 days | Hot / indexed | Archive → cold |
| Checkpoint files | 30 days | Working dir | Purge old ones |
| Raw fetched NDJSON | Imported + 7 days | Working dir | Remove after verified |
| Historical releases | Permanent | Cold / indexed | Keep forever, suppress re-fetch |
| Closed PRs & Issues | 2 years | Cold / indexed | Anonymize → archive |
| Audit logs | 3 years | Immutable archive | Write-only, no delete |

### Legal / Compliance Notes
- GitHub public data does not require PII removal unless user accounts are involved
- Keep original `id` fields for cross-referencing
- Log deletion events in `data_maintenance.log`

---

## 🔍 3. Detection Methods — ค้นหาข้อมูลที่ล้าสมัย

### 3.1 From NDJSON Files
```bash
# Count records by age (example)
awk -F'"' '{print $4}' ZyntroAI_new-crystalcastle_releases.ndjson \
  | jq -r '.published_at' \
  | cut -d'T' -f1 \
  | sort | uniq -c | sort -rn

title: "[Data] Stale Data Management — Complete Guide"
aliases:
 
- "คู่มือการจัดการข้อมูลที่ล้าสมัย"
- "Data Cleanup"
- "Archive Old Records"
- "Retention Policy"
slug: stale-data-management
icon: 🧹
color: yellow
status: active
priority: high
type: evergreen
category: knowledge
domain:
- Data Management
- Database Administration
topics:
- Data Lifecycle
- Data Cleanup
- Retention Policy
tags:
- "#topic/data"
- "#topic/data/maintenance"
- "#topic/database"
- "#topic/policy"
- "#type/evergreen"
- "#status/active"
language: th
created: 2026-10-04
updated: 2026-10-04
review-date: 2026-12-04
rating: 5
confidence: high
difficulty: intermediate
source:
- "ZyntroAI/new-crystalcastle"
repo: "ZyntroAI/new-crystalcastle"
related:
- "fetch_releases.py"
- "task.md"
version: "0.10"
authors: []
folder: "05-องค์ความรู้/Evergreen/"
filename: "[Data] Stale Data Management — Complete Guide"
uid: stale-data-mgmt-20261004
moc:
- "[[MOC - Data Management]]"
parent:
- "[[MOC - Data Management]]"
children: []
cssclasses:
- dashboard
- colored-header
- knowledge-note
 
 
 
🧹 Stale Data Management — Complete Guide
 
🎯 สรุป
 
- Stale Data = ข้อมูลที่ล้าสมัย ไม่ถูกอ้างอิง ไม่เปลี่ยนแปลง และไม่จำเป็นต้องเข้าถึงบ่อย
- การจัดการอย่างเป็นระบบช่วยลดต้นทุนพื้นที่ เพิ่มประสิทธิภาพการค้นหา และรักษาความเร็วของระบบ
- ประกอบด้วย 3 ส่วนหลัก: การนิยามความล้าสมัย → นโยบายการเก็บรักษา → วิธีการตรวจค้นและดำเนินการ
 
 
 
🧠 แนวคิดสำคัญ
 
ความหมายของ Stale Data
 
[!info]
ข้อมูลที่ยังคงถูกเก็บไว้ในระบบแต่:
 
- ไม่มีการเข้าถึงหรือแก้ไขเป็นเวลานาน
- ถูกแทนที่ด้วยข้อมูลเวอร์ชันใหม่
- หมดความจำเป็นตามวัตถุประสงค์ทางธุรกิจหรือกฎหมาย
- ไม่มีความสัมพันธ์กับข้อมูลปัจจุบัน (Orphaned/Duplicate)
 
 
 
📚 รายละเอียด
 
1️⃣ Define Stale — เมื่อไหร่เรียกว่า "ล้าสมัย"
 
Category Definition Threshold Action 
Active เข้าถึง/อัปเดต ภายใน 30 วัน ≤ 30 วัน Keep, index, hot storage 
Warm ไม่มีการเปลี่ยนแปลง 30–90 วัน 30–90 วัน Keep, compress, fewer indexes 
Stale ไม่มีการเข้าถึง > 90 วัน 90–365 วัน Archive, move to cold storage 
Expired เก็บครบกำหนดตามนโยบาย > 365 วัน Delete / Anonymize / Permanent Archive 
Duplicate มี  id  ซ้ำกันหรือเนื้อหาเหมือนกัน Any time Remove older copy 
Orphaned ไม่มี parent/foreign key เชื่อมโยง Any time Review → Delete if confirmed safe 
 
📌 กฎเฉพาะสำหรับโครงการ ZyntroAI / CrystalCastle
 
- GitHub Releases → ❌ ไม่เคยลบ (Immutable) ✅ แต่ทำเครื่องหมาย + Archive
- PRs / Issues → ปิดแล้ว > 180 วัน = ถือว่า Stale
- Checkpoint files → เก่ากว่าไฟล์รันล่าสุด = ปลอดภัยที่จะ Archive
- NDJSON staging data → นำเข้าแล้ว > 7 วัน = ปลอดภัยที่จะลบ
 
 
 
2️⃣ Retention Policy — นโยบายการเก็บรักษา
 
Data Type Retention Period Storage Tier After Expiry 
Active work logs 90 วัน Hot / Indexed Archive → Cold Storage 
Checkpoint files 30 วัน Working Directory ลบไฟล์ที่เก่ากว่าเก็บล่าสุด 
Raw fetched NDJSON นำเข้า + 7 วัน Working Directory ลบหลังจากตรวจสอบความถูกต้อง 
Historical releases Permanent Cold / Indexed เก็บตลอด, ป้องกันการดึงซ้ำ 
Closed PRs & Issues 2 ปี Cold / Indexed ปกปิดข้อมูลส่วนตัว → Archive 
Audit logs 3 ปี Immutable Archive เขียนอย่างเดียว ห้ามลบ 
 
⚖️ Legal / Compliance Notes
 
- ข้อมูลสาธารณะจาก GitHub ไม่ต้องขออนุญาตจัดการ ยกเว้น ข้อมูลบัญชีผู้ใช้
- เก็บ  original_id  ไว้เสมอสำหรับการอ้างอิงข้ามระบบ
- บันทึกเหตุการณ์การลบ/ย้ายข้อมูลลงไฟล์  data_maintenance.log 
 
 
 
3️⃣ Detection Methods — ค้นหาข้อมูลที่ล้าสมัย
 
3.1 จากไฟล์ NDJSON
 
bash
  
# นับจำนวนระเบียนตามช่วงเวลา (ตัวอย่าง)
awk -F'"' '{print $4}' ZyntroAI_new-crystalcastle_releases.ndjson \
  | jq -r '.published_at' \
  | cut -d'T' -f1 \
  | sort | uniq -c | sort -rn
 
 
3.2 จากฐานข้อมูล / ระบบอื่นๆ
 
- ตรวจสอบ  last_accessed  /  last_modified  timestamp
- ค้นหาระเบียนที่ไม่มีการอ้างอิงจากตารางอื่น
- เปรียบเทียบกับข้อมูลเวอร์ชันล่าสุดเพื่อระบุรายการที่ซ้ำซ้อน
 
 
 
✅ Best Practices
 
- ✅ กำหนดนโยบายชัดเจน และบันทึกเป็นลายลักษณ์อักษร
- ✅ แยกชั้นจัดเก็บ: Hot → Warm → Cold ตามความถี่การใช้งาน
- ✅ ทำสำเนาก่อนลบ: ย้ายไปยัง Archive ก่อน ลบเมื่อมั่นใจแล้ว
- ✅ บันทึกทุกการกระทำ: เก็บ Log การลบ/ย้ายข้อมูลเสมอ
- ✅ ทดสอบกับข้อมูลชุดเล็ก ก่อนนำไปใช้จริงกับระบบทั้งหมด
- ✅ อัตโนมัติ: เขียน Script/Job ทำงานเป็นระยะๆ (รายเดือน/รายไตรมาส)
 
 
 
⚠️ ข้อควรระวัง
 
- 🔴 สำรจัญผิดพลาด: ข้อมูลที่ดูเหมือนไม่ใช้อาจยังจำเป็นสำหรับรายงานประวัติ
- 🔴 ข้อกำหนดทางกฎหมาย: บางประเภทข้อมูลต้องเก็บตามกำหนดเวลาที่กฎหมายระบุ
- 🟡 Archive ก่อนลบ: ถ้าไม่แน่ใจ ให้ย้ายไป Cold Storage ก่อน รอการยืนยัน
- 🟡 Immutable Data: บางอย่างเช่น Releases ไม่ควรถูกลบเด็ดขาด แค่ย้ายที่เก็บ
 
 
 
💡 Insights
 
- 💡 การจัดการข้อมูลที่ล้าสมัยไม่ใช่แค่เรื่องพื้นที่ แต่เป็นเรื่อง ประสิทธิภาพการค้นหาและความเร็วของระบบ โดยรวม
- 💡 แยกชั้นการจัดเก็บช่วยลดต้นทุนได้มาก — ข้อมูลส่วนใหญ่เข้าถึงบ่อยแค่ช่วงแรก แล้วกลายเป็นข้อมูลประวัติ
- 💡 การมีนโยบายชัดเจนช่วยลดการถกเถียงเมื่อต้องตัดสินใจว่าจะเก็บอะไร ลบอะไร
 
 
 
🔗 ความเชื่อมโยง
 
Related Notes
 
- [[Database Design Patterns]]
- [[Data Lifecycle Management]]
- [[Backup & Archive Strategy]]
 
Parent Topics
 
- [[MOC - Data Management]]
 
Child Topics
 
- (เพิ่มเติมได้ตามความเหมาะสม)
 
 
 
📝 Tasks
 
✅ กำหนดเกณฑ์ Stale Data ให้ครบทุกประเภท
✅ เขียน Retention Policy เบื้องต้น
ทดสอบ Script ตรวจจับข้อมูลล้าสมัยกับ NDJSON files
ตั้งเวลา Auto-Job สำหรับตรวจสอบรายเดือน
จัดทำ Archive Storage และขั้นตอนการกู้คืน
ทบทวนนโยบายทุก 6 เดือน
 
 
 
❓ Open Questions
 
- จะตรวจจับ "Orphaned Data" ได้อย่างมีประสิทธิภาพโดยไม่กระทบประสิทธิภาพระบบ?
- ระยะเวลาเก็บรักษาข้อมูลประเภทต่างๆ สอดคล้องกับข้อกำหนดทางกฎหมายหรือไม่?
- มีวิธีอัตโนมัติที่จะแจ้งเตือนเมื่อข้อมูลใกล้ครบกำหนดหรือไม่?
 
 
 
📖 References
 
- 📁 Repository:  ZyntroAI/new-crystalcastle 
- 📄 ไฟล์ที่เกี่ยวข้อง:  fetch_releases.py ,  task.md 
- 📝 Log File:  data_maintenance.log 
- 📅 เวอร์ชัน: 0.10 (4 ตุลาคม 2026)
 
 
 
🏷 Keywords
 
#DataManagement
#StaleData
#DataCleanup
#RetentionPolicy
#Archive
#DatabaseMaintenance
#CrystalCastle
#ZyntroAI
 
 
 
dataview
  
TABLE status, type, priority, repo, version
FROM #topic/data
SORT file.name ASC
 
 
[!tip] 💡 คำแนะนำ
เริ่มจากการทำความเข้าใจรูปแบบข้อมูลและการใช้งานก่อนกำหนดนโยบายครับ — ไม่มีกฎตายตัว เลือกเกณฑ์ที่เหมาะสมกับลักษณะงานของเราที่สุด ✅
 
 
 
✅ สร้างตามมาตรฐานครบถ้วน: YAML Frontmatter · Alias · Tags · MOC · Related Notes · Summary · Tasks · References · Wiki Links · Dataview Ready · Repository Metadata
 
ต้องการปรับเกณฑ์ Retention Policy, เพิ่ม Script ตัวอย่าง, หรือสร้าง Note ย่อยสำหรับแต่ละประเภทข้อมูลไหมครับ 😊