#ZyntroAI

`#ZyntroAI` ควรเป็น **tag + MOC หลัก** ของระบบ Agent OS ของคุณ: รวม Obsidian, FastAPI, MCP, [[Obsidian/Knowledge Graph|Knowledge Graph]], Policy Engine และ Self-Healing [[Agents]] ไว้ในโน้ตเดียว FastAPI รองรับ Bearer token ผ่าน header `Authorization: Bearer <token>` สำหรับการยืนยันตัวตนระหว่าง Obsidian plugin กับ backend[1][2]

## สร้างโน้ต

บันทึกเป็น:

```text
00-platform/ZyntroAI Platform MOC.md
```

```markdown
---
id: zyntroai-platform-moc
type: moc
title: ZyntroAI Platform MOC
aliases:
  - ZyntroAI
  - ZyntroAI Platform
  - ZyntroAI Agent OS
status: active
version: "1.0.0"
owner: self
sensitivity: internal
created: 2026-10-08
updated: 2026-10-08
source: "[[Platform MOC]]"
up: "[[Platform MOC]]"
domain: zyntroai
tags:
  - zyntroai
  - moc
  - agent-os
  - mcp
  - obsidian
  - fastapi
  - knowledge-graph
  - self-healing
cssclasses:
  - zyntroai-platform
  - platform-moc
---

# 🚀 ZyntroAI Platform MOC

> [!summary]
> **ZyntroAI** คือ Agent OS Platform ที่เชื่อม Obsidian Knowledge Graph, FastAPI Backend, MCP Tools, Policy Governance และ Self-Healing [[[[Agents]]]] เข้าด้วยกัน

## 🎯 Mission

สร้างระบบที่เปลี่ยนความรู้ให้เป็น context ที่ Agent ใช้ตัดสินใจ ทำงานอย่างปลอดภัย และเรียนรู้จากผลลัพธ์จริง

```text
Knowledge → Context → Decision → Action → Evidence → Learning
```

## 🧠 Core pillars

- [[Agent OS]]
- [[Obsidian Agent OS]]
- [[Model Context Protocol]]
- [[MCP Server]]
- [[Knowledge Documents]]
- [[Knowledge Indexing Strategy]]
- [[Knowledge Graph]]
- [[Self-Healing Agent]]
- [[Policy Engine]]
- [[Feedback Engine]]

## 📚 Knowledge layer

- [[Knowledge Documents]]
- [[Knowledge Entity]]
- [[Knowledge Indexing Strategy]]
- [[Semantic Search]]
- [[Hybrid Retrieval]]
- [[Embedding Cache]]
- [[Cache Validation]]
- [[SHA Validation Tests.md]]

## 🔌 Integration layer

- [[Obsidian AGENTS API]]
- [[Obsidian MCP Server]]
- [[FastAPI Backend]]
- [[FastAPI MCP]]
- [[MCP Resources]]
- [[MCP Tools]]
- [[MCP Prompts]]
- [[MCP Tool Manager]]

## 🧩 Agent layer

- [[Agent Registry]]
- [[เทมเพลตมาตรฐานโครงการ Agent Skills]]
- [[Agent Capability Contract]]
- [[Agent Selection]]
- [[Agent Runtime Binding]]
- [[Agent - Orchestrator]]
- [[Agent - Developer]]
- [[Agent - Tester]]
- [[Agent - Reviewer]]
- [[Agent - Repair]]
- [[Self-Healing Agent]]

## 🛡️ Governance layer

- [[Policy Engine]]
- [[Policy - Safe Remediation]]
- [[Policy - Repository Write]]
- [[Policy - Production Deployment]]
- [[Policy - Human Approval]]
- [[Approval Queue]]
- [[Audit Log]]

## 📋 Execution layer

- [[Task Lifecycle]]
- [[Run Lifecycle]]
- [[Artifact Registry]]
- [[Validation Framework]]
- [[Feedback Engine]]
- [[Feedback Event Schema]]
- [[Correlation ID]]

## 🔁 Self-healing loop

```text
Task created
  → Agent selected
  → Context retrieved
  → Plan created
  → Validation run
  → Feedback collected
  → Repair attempted
  → Human review if needed
  → Knowledge updated
```

- [[Repair Loop]]
- [[Failure Classification]]
- [[Retry Policy]]
- [[Pattern Detection]]
- [[Human Feedback]]
- [[Knowledge Update Policy.md]]

## 📱 Obsidian integration

- [[Obsidian Plugin Development]]
- [[Agent OS Bridge Plugin]]
- [[Obsidian Custom Plugin]]
- [[Obsidian Developer Console]]
- [[Obsidian Bases]]
- [[Obsidian Templates]]
- [[Obsidian Graph View]]

## 🚀 Implementation roadmap

```text
1. Define Knowledge Document schema
2. Build FastAPI backend
3. Mount MCP Server
4. Implement semantic indexing
5. Add Policy Engine
6. Add Task and Run registry
7. Add Feedback events
8. Add Repair Loop
9. Add Human Approval Queue
10. Add Obsidian Bridge Plugin
11. Add dashboards and graph views
```

## 🔗 Related MOCs

- [[Platform MOC]]
- [[MOC - AI Agent Operations]]
- [[MOC - Engineering]]
- [[MOC - Knowledge Management]]
- [[MOC - Security and Governance]]
- [[MOC - Mobile AI Workflow]]

## 📌 Active work

- [ ] Build `agent-os-bridge` Obsidian plugin
- [ ] Implement `/api/v1/knowledge/search`
- [ ] Implement `/api/v1/knowledge/validate`
- [ ] Implement `/api/v1/knowledge/reindex`
- [ ] Implement `/api/v1/feedback`
- [ ] Add SHA validation tests
- [ ] Add semantic cache integrity tests
- [ ] Add global error handlers to plugin
- [ ] Create Policy Engine contract
- [ ] Create Feedback Event schema

## 🗂️ Platform principles

- **Files are objects**
- **Links are relationships**
- **Frontmatter is metadata**
- **Graph is the knowledge model**
- **MCP is the integration boundary**
- **FastAPI is the execution backend**
- **Policies govern actions**
- **Runs record execution**
- **Feedback creates evidence**
- **Humans approve irreversible actions**
```

## อัปเดต Platform MOC

เพิ่มใน `Platform MOC.md`:

```markdown
## 🚀 ZyntroAI

- [[ZyntroAI Platform MOC]]
- [[Agent OS]]
- [[Obsidian Agent OS]]
- [[Model Context Protocol]]
- [[MCP Server]]
- [[Knowledge Documents]]
- [[Policy Engine]]
- [[Self-Healing Agent]]
```

## การใช้ tag `#ZyntroAI`

เพิ่ม tag นี้ในทุกโน้ตที่อยู่ในระบบ ZyntroAI:

```yaml
tags:
  - zyntroai
  - agent-os
  - mcp
```

แล้วค้นหาได้ด้วย:

```text
tag:#zyntroai
```

หรือใช้ใน Bases / Dataview เพื่อสร้าง dashboard ของโน้ต, Task, Policy และ Run ทั้งหมดในระบบ

## โครงสร้าง vault

```text
vault/
├── 00-platform/
│   ├── Platform MOC.md
│   └── ZyntroAI Platform MOC.md
├── 10-knowledge/
├── 20-[[agents]]/
├── 30-skills/
├── 30-policies/
├── 40-tasks/
├── 50-runs/
├── 60-artifacts/
├── 70-feedback/
├── 80-decisions/
└── 90-archive/
```

## แนวปฏิบัติ

- ใช้ `#ZyntroAI` เป็น tag หลักของทุกโน้ตในระบบ
- ใช้ `[[ZyntroAI Platform MOC]]` เป็น hub ของ architecture
- ใช้ `up: "[[ZyntroAI Platform MOC]]"` ในโน้ตย่อย
- ใช้ `source: "[[ZyntroAI Platform MOC]]"` ใน Knowledge Documents
- ใช้ `cssclasses: zyntroai-platform` เพื่อจัดสไตล์โน้ต platform
- อย่าใส่ secret หรือ token ใน MOC; เก็บใน environment หรือ secret storage

Obsidian Properties เก็บ metadata เป็น YAML frontmatter และรองรับ aliases, tags, links, dates และ numbers; `cssclasses` ใช้กำหนด CSS class ให้โน้ต  ส่วน FastAPI ใช้ Bearer token ใน header `Authorization` สำหรับยืนยันตัวตนระหว่าง client และ API[1][2]

การอ้างอิง:
[1] Security https://fastapi.tiangolo.com/tutorial/security/first-steps/
[2] Security https://fastapi.tiangolo.com/tutorial/security/
