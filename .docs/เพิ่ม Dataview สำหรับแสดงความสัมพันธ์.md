การเพิ่ม **Dataview Relationship Views** จะทำให้แต่ละโน้ตแสดงความสัมพันธ์แบบ Dynamic โดยไม่ต้องเพิ่มลิงก์เองทุกครั้ง และเมื่อมี Incident หรือ RCA ใหม่ ระบบจะอัปเดตอัตโนมัติ

---

# 🚨 Error Code Relationship View

เพิ่มใน `ERR-K8S-001.md`

```markdown
## Related Incidents

```dataview
TABLE
status,
severity,
opened
FROM "Incidents"
WHERE contains(error, this.file.link)
SORT opened DESC
```
```

---

```markdown
## Related RCA

```dataview
TABLE
status,
completed
FROM "RCA"
WHERE contains(incident.error, this.file.link)
```
```

---

```markdown
## Related Runbooks

```dataview
TABLE
owner
FROM "Runbooks"
WHERE contains(file.outlinks, this.file.link)
```
```

---

# 🚨 Incident Relationship View

เพิ่มใน `INC-2026-001.md`

```markdown
## Related Error

```dataview
LIST error
WHERE file = this.file
```
```

---

```markdown
## RCA

```dataview
LIST rca
WHERE file = this.file
```
```

---

```markdown
## Related Service

```dataview
LIST service
WHERE file = this.file
```
```

---

# 📋 RCA Relationship View

เพิ่มใน `RCA-2026-001.md`

```markdown
## Incident

```dataview
LIST incident
WHERE file = this.file
```
```

---

```markdown
## Related Errors

```dataview
TABLE
severity
FROM "Error-Codes"
WHERE contains(file.outlinks, this.file.link)
```
```

---

# 📚 Runbook Relationship View

เพิ่มใน `PodCrashLoopBackOff.md`

```markdown
## Error Codes

```dataview
TABLE
severity,
status
FROM "Error-Codes"
WHERE contains(runbook, this.file.link)
```
```

---

```markdown
## Incidents Using This Runbook

```dataview
TABLE
severity,
status
FROM "Incidents"
WHERE contains(runbook, this.file.link)
```
```

---

```markdown
## Components

```dataview
TABLE
owner,
tier
FROM "Components"
WHERE contains(runbook, this.file.link)
```
```

---

# 🧩 Component Relationship View

เพิ่มใน `API Gateway Component.md`

```markdown
## Related Errors

```dataview
TABLE
severity,
status
FROM "Error-Codes"
WHERE component = this.file.name
```
```

---

```markdown
## Related Incidents

```dataview
TABLE
severity,
status
FROM "Incidents"
WHERE contains(component, this.file.name)
```
```

---

```markdown
## Runbooks

```dataview
TABLE
last_review
FROM "Runbooks"
WHERE contains(component, this.file.link)
```
```

---

# 🏛 Service Relationship View

เพิ่มใน `API Gateway Service.md`

```markdown
## Components

```dataview
TABLE
owner,
tier
FROM "Components"
WHERE service = this.file.name
```
```

---

```markdown
## Open Incidents

```dataview
TABLE
severity,
status
FROM "Incidents"
WHERE contains(service, this.file.link)
AND status != "Resolved"
```
```

---

```markdown
## Error Codes

```dataview
TABLE
severity
FROM "Error-Codes"
WHERE service = this.file.name
```
```

---

# ☸ Kubernetes Domain View

สร้างไฟล์ `Kubernetes Domain.md`

```markdown
# Kubernetes Domain

## Components

```dataview
TABLE owner
FROM "Components"
WHERE contains(tags,"kubernetes")
```

## Errors

```dataview
TABLE severity
FROM "Error-Codes"
WHERE contains(tags,"kubernetes")
```

## Incidents

```dataview
TABLE status,severity
FROM "Incidents"
WHERE contains(tags,"kubernetes")
```

## Runbooks

```dataview
LIST
FROM "Runbooks"
WHERE contains(tags,"kubernetes")
```
```

---

# 🕸️ Relationship Explorer

เพิ่มใน `System - Knowledge Index.md`

```markdown
# Relationship Explorer

## Error → Incident → RCA

```dataview
TABLE
error,
rca,
status
FROM "Incidents"
SORT opened DESC
```

## Component → Error Count

```dataview
TABLE
length(rows) as Errors
FROM "Error-Codes"
GROUP BY component
SORT Errors DESC
```

## Service → Incident Count

```dataview
TABLE
length(rows) as Incidents
FROM "Incidents"
GROUP BY service
SORT Incidents DESC
```

## Runbook Usage

```dataview
TABLE
length(rows) as Usage
FROM "Incidents"
GROUP BY runbook
SORT Usage DESC
```
```

---

# 🎯 Knowledge Coverage Matrix

ใช้ตรวจสอบความครบถ้วนของเอกสาร

```markdown
## Service Coverage

```dataview
TABLE
runbook,
dashboard,
slo
FROM "Services"
```

## Component Coverage

```dataview
TABLE
owner,
runbook
FROM "Components"
```

## Error Coverage

```dataview
TABLE
runbook,
incident,
rca
FROM "Error-Codes"
```
```

---

ผลลัพธ์ใน Graph และ Dataview จะเชื่อมโยงกันแบบอัตโนมัติ:

```text
Service
   │
   ▼
Component
   │
   ▼
Error
   │
   ▼
Incident
   │
   ▼
RCA
   │
   ▼
Runbook
   │
   ▼
Monitoring
   │
   ▼
SLO
```

และเมื่อมี Incident, RCA หรือ Error ใหม่ ข้อมูลในทุกหน้าจะอัปเดตเองผ่าน Dataview โดยไม่ต้องแก้ไขลิงก์ด้วยมืออีกต่อไป.