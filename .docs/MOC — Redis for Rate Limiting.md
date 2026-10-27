---
title: "MOC — Redis for Rate Limiting"
type: MOC
tags: [redis, rate-limiting, slowapi, devops]
created: 2026-10-11
related-topics: [[MOC - Acoustic Intelligence]] [[Mental Models]], [[DevSecOps MOC]]
---

# 📌 Redis — สำหรับ Rate Limiting ด้วย SlowAPI

## 🧠 Redis คืออะไร?
> **Redis = In-Memory Data Store ที่เร็วมาก** ใช้เป็น **"ที่เก็บกลาง"** ให้ทุกแอปพลิเคชัน/pod เข้าถึงข้อมูลเดียวกัน แก้ปัญหาที่แต่ละ pod นับค่าแยกกันไม่ตรงกัน

---

## 🆚 Redis เดี่ยว vs Redis Cluster — เลือกใช้อะไร?

| ด้าน | Redis เดี่ยว | Redis Cluster |
|------|-------------|---------------|
| **สถาปัตยกรรม** | 1 ตัว (อาจมี Replica สำรอง) | 3+ Master กระจายข้อมูล + Replica อัตโนมัติ |
| **จุดล้มเหลวจุดเดียว** | ❌ มี — ล่มก็ล่มเลย | ✅ ไม่มี — Auto-failover ทำงานแทนทันที |
| **ความจุ/ขีดความสามารถ** | จำกัดตามเครื่องเดียว | ✅ ขยายได้ไม่สิ้นสุด — เพิ่ม node ก็เพิ่มความจุ |
| **ความซับซ้อน** | ติดตั้งง่าย จัดการง่าย | ต้องเรียนรู้เพิ่มเล็กน้อย |
| **เหมาะกับ** | Dev, ทดสอบ, ระบบขนาดเล็ก–กลาง | Production, ปริมาณมาก, ต้องการความต่อเนื่อง |
| **Connection URL** | `redis://host:6379/0` | `redis+cluster://host1:6379,host2:6379,...` |

---

## 🔑 สิ่งที่ต้องรู้สำหรับ SlowAPI

### ✅ Redis เดี่ยว
```python
from limits.storage import RedisStorage
storage = RedisStorage("redis://redis-service:6379/0")
