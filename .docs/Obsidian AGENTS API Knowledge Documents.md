Obsidian AGENTS API Knowledge Documents

**Obsidian AGENTS API Knowledge Documents** คือชั้นที่ทำให้ Agent อ่าน–ค้น–สร้าง–อัปเดตความรู้ใน vault ได้อย่างมีโครงสร้าง โดยให้ `AGENTS.md` เป็น contract สำหรับพฤติกรรม agent, Markdown + YAML frontmatter เป็น [[Knowledge Document]], และ MCP เป็นชั้น expose เป็น Resources/Tools ให้ LLM ใช้ได้ MCP กำหนดให้ Resources ใช้แชร์ context/data และ Tools ใช้ execute งานกับระบบภายนอก[1][2]

## สถาปัตยกรรม

```text
Agent / LLM
   ↓
AGENTS.md  ← กฎการใช้ vault, สิทธิ์, workflow
   ↓
Obsidian AGENTS API
   ├── Knowledge Documents (Markdown + YAML)
   ├── Search / Graph / Validation
   └── MCP Resources + Tools
   ↓
Obsidian Vault![[Agent / LLM
   ↓
AGENTS.md  ← กฎการใช้ vault, สิทธิ์, workflow
   ↓
Obsidian AGENTS API
   ├── Knowledge Documents (Markdown + YAML)
   ├── Search / Graph / Validation
   └── MCP Resources + Tools
   ↓
Obsidian Vault

ไดอะแกรมนี้ถูกต้องแล้ว แต่ควรขยายให้ชัดว่า **AGENTS.md ไม่ใช่ API** แต่เป็น “สัญญาการทำงาน” ที่ Agent อ่านก่อน ส่วน **Obsidian AGENTS API** คือ service ที่แปลงคำขอของ Agent เป็นการอ่าน/ค้น/เขียน vault อย่างมี governance MCP ใช้ client-host-server: Host เช่น Claude Desktop หรือ IDE สร้าง Client ต่อ Server แต่ละตัว, Server expose Resources/Tools/Prompts และ Tools เป็นฟังก์ชันที่ model เลือกเรียกได้[1][2][3]

## สถาปัตยกรรมที่แนะนำ

```text
┌─────────────────────────────────────────────┐
│                 AGENT / LLM                  │
│  Understand → Plan → Select Tool → Validate  │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                   AGENTS.md                  │
│  • Vault conventions                         │
│  • Read/write permissions                    │
│  • Required workflow                         │
│  • Safety and approval rules                 │
│  • [[Knowledge Document]] contract               │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│              OBSIDIAN AGENTS API             │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │        Knowledge Document Layer        │ │
│  │  Markdown + YAML frontmatter + links   │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │           Retrieval Layer              │ │
│  │  Search • Graph • Validation • Rank    │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │            MCP Interface               │ │
│  │  Resources • Tools • Prompts           │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │           Governance Layer             │ │
│  │  AuthZ • Policies • Audit • Approval   │ │
│  └────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│                OBSIDIAN VAULT                │
│  00-inbox • 10-knowledge • 20-agents         │
│  30-skills • 30-policies • 40-tasks          │
│  50-runs • 60-artifacts • 70-feedback        │
└─────────────────────────────────────────────┘
```

`AGENTS.md` ทำหน้าที่เป็น “README สำหรับ agent”: ระบุบริบท, กติกา และวิธีทำงานกับ project ในที่เดียวที่คาดเดาได้  ส่วน MCP Resources ให้บริบทแบบอ่าน เช่น เนื้อหาไฟล์หรือข้อมูลจาก API และ Tools ใช้ execute action เช่น file operation หรือ query[1][4]

## ความรับผิดชอบแต่ละชั้น

| ชั้น | หน้าที่ | ห้ามทำ |
|---|---|---|
| **Agent / LLM** | เข้าใจคำถาม, วางแผน, เลือก tool, สร้างคำตอบ | อย่าเขียนไฟล์ตรง ๆ โดยไม่ผ่าน API |
| **AGENTS.md** | กำหนดกฎ, workflow, ขอบเขตสิทธิ์ | อย่าเก็บ secret หรือข้อมูล dynamic |
| **Knowledge Documents** | เก็บความรู้ canonical เป็น Markdown + YAML | อย่าใส่หลาย concept ในไฟล์เดียว |
| **Search / Graph / Validation** | ค้นหา, ขยายความสัมพันธ์, ตรวจ schema/link | อย่าให้ผลลัพธ์ข้าม sensitivity |
| **MCP Interface** | expose context และ action ให้ LLM | อย่าให้ tool ใด bypass policy |
| **Governance Layer** | ตรวจสิทธิ์, บันทึก audit, ขอ approval | อย่าอนุญาต destructive action อัตโนมัติ |
| **Obsidian Vault** | เก็บ source of truth ทั้งหมด | อย่าให้ raw inbox ถูก agent แก้ไข |

## Data flow มาตรฐาน

```text
User request
   ↓
Agent reads AGENTS.md
   ↓
Agent calls knowledge_search
   ↓
API filters by sensitivity + status + type
   ↓
Hybrid retrieval: keyword + vector + metadata
   ↓
Graph expansion for related entities
   ↓
Validation: schema, freshness, authority, conflict
   ↓
Agent receives grounded context
   ↓
Agent proposes answer or Markdown patch
   ↓
Policy Engine evaluates write action
   ↓
ALLOW → backup → write → reindex → audit
REVIEW → request human approval
DENY → stop with reason
```

MCP ออกแบบให้ Server declare capabilities เช่น resource subscriptions, tool support และ prompt templates ระหว่าง initialization; Host ควบคุม connection permission, lifecycle, security policy และ consent[2][5]

## MCP contract

```yaml
mcp:
  server:
    name: obsidian-agents-knowledge
    version: "1.0.0"

  resources:
    - uri: obsidian://agents/instructions
      name: AGENTS.md
      description: Vault-wide agent rules, permissions, and workflow
      mimeType: text/markdown

    - uri: obsidian://knowledge/{id}
      name: [[[[Knowledge Document]]]]
      description: Canonical [[[[[[knowledge document]]]]]] with YAML metadata
      mimeType: text/markdown

    - uri: obsidian://knowledge/index
      name: Knowledge Index
      description: Searchable index of knowledge entities and chunks
      mimeType: application/json

  tools:
    - name: knowledge_search
      description: Search active knowledge using hybrid retrieval.
      inputSchema:
        type: object
        properties:
          query:
            type: string
          filters:
            type: object
          limit:
            type: integer
            default: 8
        required:
          - query

    - name: graph_expand
      description: Expand a knowledge entity through typed relationships.
      inputSchema:
        type: object
        properties:
          node_id:
            type: string
          relations:
            type: array
            items:
              type: string
          max_depth:
            type: integer
            default: 2
        required:
          - node_id

    - name: knowledge_update
      description: Update a [[[[[[knowledge document]]]]]] after backup and policy checks.
      inputSchema:
        type: object
        properties:
          id:
            type: string
          document:
            type: string
          change_summary:
            type: string
        required:
          - id
          - document
          - change_summary
```

MCP Tools ถูกออกแบบให้ model-controlled: LLM ค้นพบและเรียกใช้ tool ได้จากบริบทและ prompt ของผู้ใช้ โดย client ใช้ `tools/list` เพื่อค้นหา และ `tools/call` เพื่อเรียกใช้[3]

## กฎการอนุญาต

```yaml
permissions:
  read:
    - "10-knowledge/**"
    - "20-agents/**"
    - "30-skills/**"
    - "30-policies/**"
    - "40-tasks/**"
    - "50-runs/**"
    - "60-artifacts/**"
    - "70-feedback/**"

  create:
    - "10-knowledge/**"

  update:
    - "10-knowledge/**"

  delete:
    - none

  denied:
    - "00-inbox/raw/**"
    - ".obsidian/**"
    - "**/*.key"
    - "**/*.env"

  approval_required:
    - "30-policies/**"
    - "delete_user_data"
    - "delete_plugin_data"
    - "production_deploy"
```

หลักสำคัญ: **raw source ห้ามแก้**, **knowledge แก้ได้แบบมี backup**, **policy เปลี่ยนได้เฉพาะคน**, และ **ทุก write ต้องมี Run + Feedback + Audit**

## ตัวอย่างการทำงาน

ผู้ใช้ถาม: “ทำไม Obsidian plugin ของฉันโหลดแล้วคำสั่งไม่ทำงาน?”

```text
Agent
 ↓ อ่าน AGENTS.md
 ↓ knowledge_search("Obsidian plugin command not working")
 ↓ ได้ Skill - Obsidian Auto Debug + Policy - Safe Remediation
 ↓ graph_expand(skill-obsidian-auto-debug)
 ↓ ได้ Tool - Obsidian CLI + Validation - Console Errors
 ↓ เสนอแผน: อ่าน manifest, run dev:errors, reload plugin, re-check
 ↓ Policy Engine: ALLOW read + reload; DENY delete plugin data
 ↓ ทำงานและบันทึก RUN + Feedback
 ↓ ตอบผู้ใช้พร้อม evidence
```

ดังนั้นควรมองไดอะแกรมเดิมเป็น **control-flow หลัก** และเพิ่ม Governance Layer เป็นชั้นขนานกับ MCP: ทุก request ต้องผ่านทั้ง “context selection” และ “permission/policy evaluation” ก่อนแตะ vault จริง[1][2]

การอ้างอิง:
[1] Architecture overview https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture
[2] Architecture https://modelcontextprotocol.io/specification/2025-11-25/architecture
[3] Tools - What is the Model Context Protocol (MCP)? https://modelcontextprotocol.io/specification/2025-11-25/server/tools
[4] AGENTS.md https://agents.md/index
[5] modelcontextprotocol.io › 2025/06/18 › architectureArchitecture - Model Context Protocol https://modelcontextprotocol.io/specification/2025-06-18/architecture
[6] Architecture overview - Model Context Protocol https://modelcontextprotocol.io/docs/2025-06-18/learn/architecture
[7] Architecture - Model Context Protocol https://modelcontextprotocol.io/specification/2025-03-26/architecture
[8] Resources https://modelcontextprotocol.info/docs/concepts/resources/
]]
```

แนวทางนี้สอดคล้องกับรูปแบบที่นิยมใช้: `AGENTS.md` เป็นเอกสาร authoritative ที่ agent อ่านก่อนทำงาน, `raw/` เป็น inbox แบบ read-only, และ `wiki/` เป็น knowledge base ที่ agent สร้างหรือปรับปรุงได้  แนวคิดเดียวกันนี้ถูกใช้ใน Obsidian knowledge-agent pipeline ที่ใช้ `AGENTS.md` และ `.agents/` เป็น Markdown-native contract สำหรับ agent หลายตัว[3][4]

## โครงสร้าง vault

```text
vault/
├── AGENTS.md
├── .agents/
│   ├── schemas/
│   ├── policies/
│   └── templates/
├── 00-inbox/
│   └── raw/
├── 10-knowledge/
│   ├── concepts/
│   ├── references/
│   ├── decisions/
│   └── runbooks/
├── 20-agents/
├── 30-skills/
├── 30-policies/
├── 40-tasks/
├── 50-runs/
├── 60-artifacts/
├── 70-feedback/
└── 90-archive/
```

หลักการสำคัญ:

- `AGENTS.md` = กฎการทำงานและขอบเขตสิทธิ์
- `00-inbox/raw/` = แหล่งดิบที่ agent อ่านได้แต่ห้ามแก้
- `10-knowledge/` = ความรู้ที่ curated และ cross-linked
- `20-agents/`, `30-skills/`, `30-policies/` = Agent OS registry
- `40-tasks/` ถึง `70-feedback/` = execution และ audit trail

## AGENTS.md

วางไว้ที่ root ของ vault:

```markdown
# Obsidian AGENTS

You are operating inside an Obsidian Agent OS vault.

Before performing any write action, read this document completely.

## Source of truth

- `10-knowledge/` contains curated, authoritative knowledge.
- `00-inbox/raw/` contains unprocessed source material.
- `20-agents/`, `30-skills/`, and `30-policies/` define agent capabilities and governance.
- `40-tasks/`, `50-runs/`, `60-artifacts/`, and `70-feedback/` record work and evidence.

## Rules

1. Read the relevant Knowledge Documents before answering or planning.
2. Prefer existing documents over creating duplicates.
3. Use canonical IDs and typed `[[wikilinks]]`.
4. Never modify or delete files in `00-inbox/raw/`.
5. Create new knowledge only in `10-knowledge/`.
6. Back up a file before modifying it.
7. Do not expose confidential content, credentials, or private notes.
8. Require human approval for destructive actions, policy changes, production deployment, or deletion of user data.
9. Record every material write as a Run and attach Feedback evidence.
10. If evidence conflicts, preserve both versions and mark the conflict for review.

## Knowledge document contract

Every Knowledge Document must include:

```yaml
id
type
title
status
version
owner
sensitivity
created
updated
source
tags
```

## Allowed operations

| Operation | Allowed location | Approval |
|---|---|---|
| Read | Entire vault | No |
| Search | Entire vault | No |
| Create knowledge | `10-knowledge/` | No, unless confidential |
| Update knowledge | `10-knowledge/` | Backup required |
| Delete knowledge | `10-knowledge/` | Human approval |
| Modify policy | `30-policies/` | Human approval |
| Delete raw source | `00-inbox/raw/` | Denied |
```

## Knowledge Document schema

ตัวอย่างไฟล์ `10-knowledge/concepts/Knowledge Document.md`:

```markdown
---
id: knowledge-document
type: concept
title: Knowledge Document
status: active
version: "1.0.0"
owner: self
sensitivity: internal
created: 2026-10-08
updated: 2026-10-08
source: "[[Obsidian AGENTS API]]"
language: th
authority: high
confidence: 0.95
freshness: 0.98

related:
  - "[[Obsidian AGENTS API]]"
  - "[[Model Context Protocol]]"
  - "[[Agent OS]]"

tags:
  - knowledge
  - obsidian
  - agent-os
  - mcp
---

# Knowledge Document

## Definition

A Knowledge Document is a Markdown file that represents one canonical unit of knowledge in an Obsidian Agent OS vault.

## Structure

A Knowledge Document contains:

- YAML frontmatter for structured metadata
- Markdown content for human-readable explanation
- `[[wikilinks]]` for typed relationships
- Optional code blocks, evidence, and references

## Rules

- One document should represent one concept, decision, procedure, or reference.
- Use a stable `id` even if the filename changes.
- Use `status` to distinguish draft, active, deprecated, and archived knowledge.
- Use `source` to preserve provenance.
- Use `related` links to connect related knowledge.
- Never embed secrets or private user data in a knowledge document.

## Lifecycle

```text
draft → active → deprecated → archived
```
```

## AGENTS API surface

คุณสามารถ implement เป็น REST API หรือ MCP Server ก็ได้ แต่สำหรับ Agent OS แนะนำ **MCP-first**: ใช้ Resources สำหรับ context และ Tools สำหรับ action

| Capability | MCP primitive | ตัวอย่าง |
|---|---|---|
| อ่านเอกสาร | Resource | `obsidian://knowledge/{id}` |
| ค้นหาความรู้ | Tool | `knowledge_search` |
| ดึงเอกสารตาม ID | Tool | `knowledge_get` |
| ขยายความสัมพันธ์ | Tool | `graph_expand` |
| สร้างเอกสาร | Tool | `knowledge_create` |
| อัปเดตเอกสาร | Tool | `knowledge_update` |
| Archive เอกสาร | Tool | `knowledge_archive` |
| ตรวจ schema/link | Tool | `knowledge_validate` |

MCP Resources ใช้แชร์ข้อมูลบริบท เช่น ไฟล์หรือ schema แก่ client ส่วน Tools คือฟังก์ชันที่ model เลือกเรียกเพื่อโต้ตอบกับระบบภายนอก[1][2]

## MCP tool schemas

```yaml
mcp:
  server:
    name: obsidian-agents-knowledge
    version: "1.0.0"

  resources:
    - uri: obsidian://knowledge/{id}
      name: Knowledge Document
      description: Read a canonical knowledge document and its metadata
      mimeType: text/markdown

    - uri: obsidian://knowledge/index
      name: Knowledge Index
      description: Read the current knowledge index and entity registry
      mimeType: application/json

  tools:
    - name: knowledge_search
      description: >
        Search knowledge documents using keyword, semantic, metadata,
        and graph-aware retrieval.
      inputSchema:
        type: object
        properties:
          query:
            type: string
          filters:
            type: object
            properties:
              type:
                type: array
                items:
                  type: string
              status:
                type: array
                items:
                  type: string
              sensitivity:
                type: array
                items:
                  type: string
          limit:
            type: integer
            default: 8
        required:
          - query

    - name: knowledge_get
      description: Retrieve one knowledge document by its stable ID.
      inputSchema:
        type: object
        properties:
          id:
            type: string
        required:
          - id

    - name: knowledge_create
      description: Create a new knowledge document after schema validation.
      inputSchema:
        type: object
        properties:
          document:
            type: string
            description: Full Markdown document including YAML frontmatter
          confirm:
            type: boolean
            default: false
        required:
          - document

    - name: knowledge_update
      description: Update an existing knowledge document with a backup.
      inputSchema:
        type: object
        properties:
          id:
            type: string
          document:
            type: string
          change_summary:
            type: string
        required:
          - id
          - document
          - change_summary
```

## API endpoint แบบ REST

ถ้าต้องการ REST API คู่กับ MCP ให้ใช้ design นี้:

| Method | Endpoint | คำอธิบาย |
|---|---|---|
| `GET` | `/api/v1/knowledge` | ค้นหา / filter knowledge |
| `GET` | `/api/v1/knowledge/{id}` | อ่านเอกสาร |
| `POST` | `/api/v1/knowledge` | สร้างเอกสาร |
| `PATCH` | `/api/v1/knowledge/{id}` | อัปเดตเอกสาร |
| `POST` | `/api/v1/knowledge/{id}/archive` | Archive |
| `GET` | `/api/v1/graph/{id}` | ขยาย graph |
| `POST` | `/api/v1/index/rebuild` | Reindex |
| `GET` | `/api/v1/index/status` | สถานะ index |

ตัวอย่าง response:

```json
{
  "id": "knowledge-document",
  "type": "concept",
  "title": "Knowledge Document",
  "status": "active",
  "version": "1.0.0",
  "sensitivity": "internal",
  "updated": "2026-10-08",
  "content": "# Knowledge Document\n\n...",
  "links": [
    {
      "relation": "related",
      "target": "obsidian-agents-api"
    }
  ],
  "chunks": 3,
  "provenance": {
    "source": "obsidian-agents-api",
    "content_hash": "sha256:..."
  }
}
```

## Indexing pipeline

```text
Markdown file changed
        ↓
Parse YAML frontmatter
        ↓
Validate schema
        ↓
Split by headings / code blocks
        ↓
Create chunks + metadata
        ↓
Generate embeddings
        ↓
Update keyword + vector index
        ↓
Extract [[wikilinks]]
        ↓
Update knowledge graph
        ↓
Publish MCP resource updates
```

ควรใช้ incremental indexing ตาม `content_hash` และ `updated` timestamp แทนการ rebuild ทั้ง vault ทุกครั้ง และควรเก็บ `source_id`, `source_version`, `chunk_id`, และ `content_hash` เพื่อให้ retrieval ตรวจย้อน provenance ได้

## Governance

- **Read**: agent อ่านได้เฉพาะ document ที่ `sensitivity` อนุญาต
- **Create**: ต้องผ่าน schema validation และ duplicate detection
- **Update**: ต้องสร้าง backup, เพิ่ม `version`, และบันทึก `change_summary`
- **Delete**: ห้ามลบจริงโดย default; ให้ `status: archived`
- **Policy change**: ต้องมี human approval เสมอ
- **Raw source**: ห้าม agent แก้ไขหรือลบ
- **Conflict**: เก็บทั้งสองเวอร์ชันและสร้าง `conflict.review` event

แนวปฏิบัติที่พบในระบบ Obsidian knowledge agent คือแยก `raw/` เป็น inbox ที่ agent ห้ามแตะ และให้ `wiki/` หรือ knowledge directory เป็นพื้นที่เดียวที่ agent เขียนและ cross-link ได้[3][4]

## Minimal AGENTS.md prompt

```text
Use the Obsidian AGENTS API.

1. Read AGENTS.md.
2. Search relevant Knowledge Documents.
3. Read the top results and their graph neighbors.
4. Answer only from authoritative active knowledge.
5. If information is missing, identify the gap; do not invent facts.
6. If a knowledge update is needed, propose a Markdown patch with frontmatter.
7. Do not modify raw sources or policies without approval.
```

แบบนี้ทำให้ Obsidian เป็นทั้ง **knowledge base**, **agent context store**, และ **human-controlled governance layer** โดย `AGENTS.md` กำหนดพฤติกรรม, Knowledge Documents เก็บความจริง, และ MCP API เป็นช่องทางมาตรฐานให้ LLM เข้าถึงอย่างปลอดภัย[1][3]

การอ้างอิง:
[1] Specification https://modelcontextprotocol.io/specification/2025-11-25
[2] Specification - What is the Model Context Protocol (MCP)? https://modelcontextprotocol.io/specification/2025-06-18
[3] A Private AI Knowledge Base: Obsidian, GitHub Sync, and ... https://www.billmongan.com/posts/2026/05/obsidian-ai-vault/
[4] Michael-OvO/obsidian-knowledge-agent https://github.com/Michael-OvO/obsidian-knowledge-agent
[5] Specification - Model Context Protocol https://modelcontextprotocol.io/specification/2025-03-26
[6] modelcontextprotocol.io https://modelcontextprotocol.io/llms.txt
[7] The 2026-07-28 Specification https://blog.modelcontextprotocol.io/posts/2026-07-28/
[8] Model Context Protocol · GitHub https://github.com/modelcontextprotocol
[9] Model Context Protocol Specification https://modelcontextprotocol.info/specification/
