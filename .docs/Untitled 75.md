สรุปทั้งหมดเป็น MOC - YAML Frontmatter

```yaml
---
title: "[[ApplicationSet Generator Verification|AI Agent บน Windows]]: CUA, Copilot Studio และ Dataverse Logging"
description: "MOC รวมแนวทางสร้างและควบคุม [[ApplicationSet Generator Verification|AI Agent บน Windows]] ตั้งแต่ CUA, Stored Credentials, Access Control, Human Supervision ไปจนถึง Verbose Logs และ Dataverse Capacity"
type: moc
tags:
  - moc
  - ai-agent
  - windows
  - copilot-studio
  - cua
  - computer-use
  - dataverse
  - security
  - governance
category: "AI Agents"
language: "th"
created: "2026-10-12"
modified: "2026-10-12"
status: active
version: "1.0.0"
related-moc: "[[Home MOC]]"
related-skills:
  - "[[AI Agent บน Windows]]"
  - "[[Computer-Using Agent (CUA)]]"
  - "[[Copilot Studio Computer Use]]"
  - "[[Stored Credentials]]"
  - "[[Access Control & Allowlist]]"
  - "[[Human Supervision]]"
  - "[[CUA Verbose Logs]]"
  - "[[Dataverse Capacity Planning]]"
---

# [[ApplicationSet Generator Verification|AI Agent บน Windows]]

MOC นี้รวบรวมแนวทางการสร้างและควบคุม [[ApplicationSet Generator Verification|AI Agent บน Windows]] โดยเน้น **Computer-Using Agent (CUA)** ที่ควบคุมเว็บและ desktop app ผ่าน screenshot, virtual mouse และ virtual keyboard

## ภาพรวม

[[ApplicationSet Generator Verification|[[ApplicationSet Generator Verification|AI Agent บน Windows]]]] แบ่งเป็น 3 เส้นทางหลัก:

- **Microsoft Copilot Studio / Power Automate**: เหมาะกับ low-code, enterprise automation และ legacy app
- **Developer frameworks**: เช่น OpenAI Agents SDK, LangGraph, AutoGen, CrewAI
- **Local AI on Windows**: เช่น Foundry Local และ Windows ML สำหรับ privacy หรือ offline execution

## Computer-Using Agent (CUA)

CUA ทำงานโดย:

1. ถ่าย screenshot ของหน้าจอ
2. ตีความ UI ด้วย vision model
3. เลือก action เช่น click, type, scroll
4. execute action ผ่าน virtual mouse/keyboard
5. ถ่าย screenshot ใหม่และทำซ้ำจน task เสร็จ

เหมาะกับเว็บและ desktop app ที่ไม่มี API หรือมี UI ที่เปลี่ยนแปลงบ่อย

## Copilot Studio Computer Use

Copilot Studio ให้สร้าง CUA โดยไม่ต้องเขียนโค้ดมาก ผ่าน **Tools → Add tool → Computer use**

การตั้งค่าสำคัญ:

- เลือก **Hosted browser** สำหรับเว็บ
- เลือก **Bring-your-own machine** สำหรับ desktop app ภายในองค์กร
- ตั้ง instruction, credentials, access control และ human supervision
- ใช้ dedicated machine และ least-privilege account

## Stored Credentials

ใช้ **Stored credentials** เพื่อให้ agent ล็อกอินอัตโนมัติโดยไม่ต้องใส่ password ใน prompt

- **Website credential**: scope ตาม domain เช่น `intranet.example.com`
- **Desktop credential**: scope ตาม application/process name เช่น `LegacyERP`
- **Azure Key Vault**: เหมาะกับองค์กรที่ต้องการควบคุม secret, rotation และ audit
- **End-user credentials**: ให้ agent ทำงานภายใต้สิทธิ์ของผู้ใช้แต่ละคน ไม่ใช่ maker

## Access Control และ Allowlist

เปิด **Access Control** ทุกครั้งก่อนใช้ CUA ใน production

- จำกัด website เช่น `https://intranet.example.com/*`
- จำกัด desktop app เช่น `LegacyERP`, `msedge`
- เปิด **Enforce HTTPS**
- ใช้ Edge/Intune URL allowlist เสริม
- ใช้ least-privilege account และ dedicated machine

## Human Supervision

เปิด **Human supervision** เพื่อให้ agent หยุดและขอผู้ดูแลตรวจสอบเมื่อเจอกรณีเสี่ยง เช่น CAPTCHA, login fail, หน้า error หรือ action ที่ไม่สามารถย้อนกลับได้

- เพิ่ม reviewer อย่างน้อย 1 คน
- ตั้ง timeout เช่น 10–15 นาที
- ตอบผ่าน email หรือ Activity Panel
- ใช้ร่วมกับ clear instructions และ allowlist

## Verbose Logs ใน Activity Panel

เปิด **Advanced computer use logging** เพื่อดู session replay, screenshot, action, reasoning และ credential ที่ใช้

- เข้าดูผ่าน **Activity → Activity map → Computer use action**
- ใช้ **Transcript** เพื่อดู reasoning แบบ step-by-step
- ใช้ **Session replay** เพื่อดูหน้าจอจริงที่ agent เห็น
- Export session logs สำหรับ audit หรือ troubleshooting

## Dataverse Capacity

CUA logs ใช้ Dataverse capacity 2 ส่วนหลัก:

- **Database capacity**: action metadata, reasoning, session metadata
- **File capacity**: screenshot แบบ full-size

สูตรประมาณการ:

```text
Total storage =
  sessions/day
  × actions/session
  × retention days
  × bytes per action
```

ตัวอย่าง: 100 sessions/day, 40 screenshots/session, retention 30 วัน, screenshot 300 KB จะใช้ประมาณ 34.6 GB โดยส่วนใหญ่เป็น File capacity

## Security และ Governance

- ใช้ **least privilege**
- ใช้ **dedicated machine** แยกจากเครื่องทำงานปกติ
- ใช้ **Agent account** แยกจาก user account
- เปิด **Microsoft Defender for Endpoint** เพื่อป้องกัน prompt injection
- ใช้ **Microsoft Execution Containers (MXC)** เพื่อจำกัด file, network และ desktop access
- ใช้ **Entra Agent ID** สำหรับ identity และ Conditional Access
- เปิด audit log และ Purview integration

## Checklist ก่อน Production

- [ ] เลือก use case ที่วัดผลได้
- [ ] เลือก architecture: low-code, code-first หรือ local-first
- [ ] ตั้ง sandbox และ least privilege
- [ ] เปิด Access Control และ Allowlist
- [ ] ใช้ End-user credentials หรือ dedicated service account
- [ ] เปิด Human Supervision
- [ ] เปิด Verbose Logging
- [ ] ตั้ง Retention Period
- [ ] คำนวณ Dataverse Capacity
- [ ] ทดสอบ prompt injection และ failure case
- [ ] เปิด audit log และ telemetry
- [ ] วางแผน export ไป Data Lake หากต้องเก็บนาน

## Related Notes

- [[AI Agent บน Windows]]
- [[Computer-Using Agent (CUA)]]
- [[Copilot Studio Computer Use]]
- [[Stored Credentials]]
- [[Access Control & Allowlist]]
- [[Human Supervision]]
- [[CUA Verbose Logs]]
- [[Dataverse Capacity Planning]]
- [[Power Automate Desktop]]
- [[Microsoft Foundry Local]]
- [[Windows ML]]
```

