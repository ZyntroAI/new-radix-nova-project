Knowledge Indexing Strategy

ใช้ **Hybrid Knowledge Index**: Obsidian เป็น source of truth, YAML frontmatter เป็น structured metadata, `[[links]]` เป็น graph edges, แล้วสร้าง chunk + vector + keyword index สำหรับ retrieval โดยให้ MCP เป็นชั้นเรียกใช้งานและควบคุมสิทธิ์ แนวทางนี้เหมาะกับ Agent OS ของคุณเพราะรองรับทั้ง semantic search, exact lookup, graph traversal และ governance ต่อ request[1][2][3]

## เป้าหมายการ index

อย่า index “ทั้ง vault” เป็นก้อนเดียว ให้แยกวัตถุประสงค์ออกเป็น 4 ชั้น:

| ชั้น | เก็บอะไร | ใช้ทำอะไร |
|---|---|---|
| **Source layer** | Markdown, PDF, code, logs, attachments | ต้นทางของความจริงและ provenance |
| **Entity layer** | Agent, Skill, Policy, Task, Run, Artifact, Decision | ให้ระบบเข้าใจว่า “อะไรคืออะไร” |
| **Retrieval layer** | Chunks, embeddings, keyword fields, summaries | ค้นหาบริบทที่เกี่ยวข้องเร็วและแม่น |
| **Graph layer** | Nodes, typed relationships, weights, state | ไล่ความสัมพันธ์และทำ multi-hop reasoning |

Obsidian frontmatter เหมาะกับ structured facts ระดับทั้งไฟล์ เช่น `status`, `owner`, `created`, `updated`, และ links ไปยังโน้ตที่เกี่ยวข้อง  ส่วน MCP resources เหมาะกับการ expose ไฟล์, schema, หรือข้อมูลบริบทให้ client อ่านผ่าน `resources/read`[1][4]

## Canonical object model

กำหนด entity หลักให้นิ่งก่อน แล้วค่อยขยาย:

```text
Agent ─uses→ Skill
Agent ─governed_by→ Policy
Task ─delegated_to→ Agent
Task ─depends_on→ Task
Run ─executes→ Task
Run ─produces→ Artifact
Artifact ─validated_by→ Validation
Event ─correlates_to→ Run
Decision ─supersedes→ Decision
```

ทุก entity ควรมี ID ถาวร, `type`, `status`, `version`, `owner`, timestamps, sensitivity, และ source path เพื่อให้ retrieval กรองได้และตรวจย้อนกลับได้ การแนบ metadata เช่น ownership, effective date, last-validated timestamp และ lineage identifier ถือเป็นแนวปฏิบัติสำคัญของระบบ production RAG[2]

```yaml
---
id: skill-obsidian-auto-debug
type: skill
name: Obsidian Auto Debug
version: "1.1.0"
status: active
owner: self
domain: obsidian
sensitivity: internal
created: 2026-10-08
updated: 2026-10-08
source: "[[SKILL - Obsidian Auto Debug]]"
related:
  - "[[Agent - Developer]]"
  - "[[Policy - Safe Remediation]]"
  - "[[Tool - Obsidian CLI]]"
tags:
  - skill
  - debugging
  - obsidian
  - error-checking
---
```

## Chunking strategy

อย่า chunk ตามจำนวนตัวอักษรเพียงอย่างเดียว ให้ chunk ตาม **โครงสร้าง Markdown ก่อน** แล้วค่อยใช้ token limit:

- แยกตาม heading: `#`, `##`, `###`
- แยก code block เป็น chunk แยก พร้อมเก็บ language และ file path
- แยก YAML frontmatter เป็น document metadata ไม่ใช่เนื้อหาค้นหา
- รวม paragraph สั้นที่อยู่ใน heading เดียวกัน
- เก็บ parent heading และ breadcrumb ไว้ใน metadata
- ใช้ overlap เล็กน้อยเฉพาะเนื้อหายาว เพื่อไม่ให้บริบทถูกตัดขาด

แนวทาง recursive splitting, sliding windows และ Small-to-Big ถูกใช้เพื่อรักษา semantic completeness ขณะควบคุมขนาด context; การผูก metadata เช่น title, timestamp, category และ keywords ช่วยให้ filtering และ reranking ทำงานได้ดีขึ้น[3][5]

```yaml
chunk:
  id: chunk_skill_obsidian_auto_debug_003
  source_id: skill-obsidian-auto-debug
  source_type: skill
  heading_path:
    - "Obsidian Auto Debug"
    - "Error-checking gates"
  content_type: procedure
  token_count: 214
  language: en
  keywords:
    - obsidian
    - dev:errors
    - dev:console
    - plugin reload
  sensitivity: internal
  valid_from: 2026-10-08
  last_validated: 2026-10-08
```

## Hybrid retrieval

ใช้ **hybrid search** เป็นค่าเริ่มต้น ไม่ใช่ vector-only:

| วิธี | เหมาะกับ | ตัวอย่าง |
|---|---|---|
| Keyword / BM25 | ชื่อ plugin, command, error code, file path | `dev:errors`, `manifest.json`, `TASK-001` |
| Dense vector | คำถามธรรมชาติและความหมายใกล้กัน | “ทำไม plugin โหลดแล้วคำสั่งไม่ทำงาน” |
| Metadata filter | จำกัดขอบเขตและสิทธิ์ | `type=skill`, `status=active`, `sensitivity=internal` |
| Graph traversal | หาสิ่งที่เกี่ยวข้องหลาย hop | Task → Agent → Skill → Policy → Run |
| Reranker | จัดลำดับผลลัพธ์หลังค้นหา | เลือก 5–10 chunks ที่เกี่ยวข้องจริง |

Production systems มักผสม semantic vector search กับ keyword search เช่น BM25 แล้วกรองด้วย domain, permissions หรือ content classification; จากนั้นจึง rerank และบีบอัด context ให้พอดี token budget  MCP-compatible retrieval systems ก็รองรับทั้ง hybrid, vector, และ text search แยกตามลักษณะคำถาม[2][6]

## Graph projection

อย่าส่ง graph ทั้งหมดให้ LLM ให้ทำ **Graph Projection**: query → หา seed nodes → expand ตาม relationship และ weight → คัดเฉพาะ subgraph ที่เกี่ยวข้อง

```text
Query: “Why did the Obsidian plugin fail?”
        ↓
Seed: Skill - Obsidian Auto Debug
        ↓
Expand:
  Skill → Agent - Developer
  Skill → Policy - Safe Remediation
  Skill → Tool - Obsidian CLI
  Skill → Run - RUN-1042
  Run → Feedback - validation.failed
        ↓
Return: relevant policy + recent failure evidence + safe repair procedure
```

GraphRAG ใช้ knowledge graph จัดโครงสร้างความรู้ก่อน แล้วดึง raw chunks ที่เกี่ยวข้องมาให้โมเดล ทำให้รองรับ reasoning ข้ามเอกสารและลดความไม่สอดคล้องได้ดีกว่า flat vector index เพียงอย่างเดียว[3]

## Freshness และ authority

อย่าให้ผลค้นหาเก่าหรือขัดแย้งกันชนะเพียงเพราะ similarity สูง ให้คำนวณ ranking แบบประกอบ:

```text
final_score =
  relevance
  + authority
  + freshness
  + confidence
  - risk_penalty
  - duplication_penalty
```

| ค่า | ความหมาย | ตัวอย่าง |
|---|---|---|
| `relevance` | ความตรงกับคำถาม | Hybrid search + reranker |
| `authority` | ความน่าเชื่อถือของแหล่ง | Official docs > personal note > chat export |
| `freshness` | ความทันสมัย | Spec ปัจจุบัน > note เก่า |
| `confidence` | ความมั่นใจจากหลักฐาน | Reproducible error > single anecdote |
| `risk` | ผลกระทบหากใช้ผิด | Production policy ต้องมี human approval |

การจัดลำดับแหล่งข้อมูล เช่น ให้ specification ปัจจุบันมาก่อนเอกสารอ้างอิงหรือ metadata ทั่วไป และการ deduplicate ด้วย normalized content hash เป็นแนวทางที่ใช้ได้จริงใน knowledge base ขนาดใหญ่[7]

## MCP integration

ให้ MCP Server expose 3 กลุ่ม:

- **Tools**: `knowledge_search`, `knowledge_get`, `graph_expand`, `index_status`, `reindex_source`
- **Resources**: vault notes, skill files, policy files, run logs, artifact metadata
- **Prompts**: `debug_with_knowledge`, `answer_with_sources`, `plan_task_with_context`

MCP กำหนดให้ resources ใช้แชร์ context เช่นไฟล์หรือ schema ให้ client และ client ดึงเนื้อหาผ่าน `resources/read`  ส่วน tools คือฟังก์ชันที่ model เลือกเรียกเองตามคำขอผู้ใช้[1]

```yaml
mcp:
  tools:
    - name: knowledge_search
      description: Hybrid keyword, vector, metadata, and graph-aware search
      input:
        query: string
        filters:
          type: string[]
          status: string[]
          sensitivity: string[]
        limit: integer
    - name: graph_expand
      description: Expand a knowledge node through typed relationships
      input:
        node_id: string
        relations: string[]
        max_depth: integer
    - name: knowledge_get
      description: Fetch a canonical source document and its metadata
      input:
        source_id: string
```

## Reindex policy

อย่า reindex ทุกอย่างทุกครั้ง ให้ใช้ event-driven incremental indexing:

1. ตรวจ content hash และ `updated` timestamp
2. ถ้าไฟล์เปลี่ยน ให้ reparse เฉพาะไฟล์นั้น
3. สร้าง chunk ใหม่ แต่คง `source_id` และ version
4. อัปเดต embeddings เฉพาะ chunks ที่เปลี่ยน
5. อัปเดต graph edges เมื่อ frontmatter หรือ `[[links]]` เปลี่ยน
6. ลบ chunk เก่าที่ orphan แล้ว แต่เก็บ audit history
7. รัน validation: schema, broken links, duplicate hash, permission leakage

ควรกำหนด trigger เช่น `note.saved`, `plugin.updated`, `run.completed`, `policy.approved`, และ `sync.conflict.resolved` แทนการ schedule full reindex ทุกชั่วโมง

## โครงสร้าง vault ที่แนะนำ

```text
vault/
├── 00-inbox/
├── 10-agents/
├── 20-skills/
├── 30-policies/
├── 40-tasks/
├── 50-runs/
├── 60-artifacts/
├── 70-feedback/
├── 80-decisions/
├── 90-archive/
└── _meta/
    ├── schemas/
    ├── indexes/
    └── audit/
```

หลักการสำคัญ: **folder ใช้จัดการและควบคุมสิทธิ์**, แต่ `id`, `type`, `status`, links และ relationships ต้องเป็น canonical identity ของ knowledge object ดังนั้นการย้ายไฟล์ไม่ควรทำให้ graph หรือ retrieval เสีย

## KPI ที่ควรวัด

- **Retrieval precision@5**: สัดส่วนผลลัพธ์ 5 อันดับแรกที่เกี่ยวข้องจริง
- **Answer groundedness**: คำตอบอ้างอิง source ที่มีอยู่จริง
- **Freshness rate**: สัดส่วนผลลัพธ์ที่ validated ภายในกรอบเวลา
- **Index latency**: เวลาจากบันทึกโน้ตถึงพร้อมค้นหา
- **Context token cost**: token ที่ใช้ต่อการตอบหนึ่งครั้ง
- **Broken-link rate**: สัดส่วน `[[links]]` ที่ชี้ไปไม่มีไฟล์
- **Duplicate-chunk rate**: chunks ซ้ำที่ยังติดอยู่ใน index
- **Permission violation rate**: จำนวนครั้งที่ agent ได้รับบริบทเกินสิทธิ์

เริ่มจาก metadata schema + Markdown structural chunking + hybrid search ก่อน แล้วค่อยเพิ่ม graph projection, reranker และ self-healing repair loop—ลำดับนี้ให้ผลลัพธ์ใช้งานได้เร็วโดยไม่ต้องสร้าง dashboard หรือ orchestration ทั้งหมดก่อน[2][8]

การอ้างอิง:
[1] Resources https://modelcontextprotocol.io/specification/2026-07-28/server/resources
[2] What Is RAG Architecture? End-to-End Guide for 2026 https://atlan.com/know/rag-architecture/
[3] A Survey of Graph Retrieval-Augmented Generation for Customized ... https://arxiv.org/html/2501.13958v1
[4] How metadata works in Obsidian | MetaEdit https://metaedit.obsidian.guide/concepts/metadata-in-obsidian/
[5] [PDF] Retrieval-Augmented Generation to Generate Knowledge Assets ... https://knowledge.lancashire.ac.uk/id/eprint/58932/7/58932%20James%20et%20al.%20VOR.pdf
[6] Connect To The Mcp Server https://learn.microsoft.com/en-us/azure/azure-arc/agents-tools-foundry-local/mcp-server-overview
[7] GitHub - SawabS/mcp-atlas · GitHub https://github.com/SawabS/mcp-index
[8] A Systematic Framework for Enterprise Knowledge Retrieval ... https://arxiv.org/html/2512.05411v2
[9] modelcontextprotocol.io › server › resourcesResources - Model Context Protocol https://modelcontextprotocol.io/specification/2025-06-18/server/resources
[10] Activity Array https://learn.microsoft.com/ro-ro/azure/search/agentic-retrieval-how-to-retrieve
[11] Resources - Model Context Protocol https://modelcontextprotocol.io/specification/draft/server/resources
[12] obsidian_usage - active-inference - Obsidian Publish https://publish.obsidian.md/active-inference/docs/tools/obsidian_usage
[13] Frontmatter - Advanced URI Documentation - Obsidian Publish https://publish.obsidian.md/advanced-uri-doc/Actions/Frontmatter
![[ขอตัวอย่าง YAML frontmatter และ Markdown chunk ที่เหมาะกับ Agent OS

ด้านล่างคือชุด template ที่ใช้ได้จริงสำหรับ **Obsidian Agent OS**: แต่ละไฟล์คือ canonical object, YAML frontmatter คือ metadata สำหรับ filter/index, และ Markdown เนื้อหาถูกแบ่งเป็น chunk ตาม heading เพื่อ retrieval ได้แม่น Obsidian เก็บ note properties ไว้ใน YAML frontmatter และ wikilinks ใน frontmatter จะถูกจับเป็น Link objects ได้[1]

## มาตรฐานกลาง

ทุกไฟล์ควรมีฟิลด์หลักชุดเดียวกัน:

```yaml
id: <stable-unique-id>
type: agent | skill | policy | task | run | artifact | feedback | decision
title: <human-readable-name>
status: draft | active | in_progress | completed | failed | archived
version: "1.0.0"
owner: <person-or-team>
sensitivity: public | internal | confidential
created: YYYY-MM-DD
updated: YYYY-MM-DD
source: "[[Source Note]]"
tags: []
```

หลักการ: **frontmatter ใช้กรองและ index**, `[[wikilinks]]` ใช้สร้าง graph, ส่วน heading ใช้แบ่ง chunk สำหรับ retrieval

## Agent

ไฟล์: `10-agents/Agent - Developer.md`

```markdown
---
id: agent-developer
type: agent
title: Developer Agent
status: active
version: "1.2.0"
owner: self
sensitivity: internal
created: 2026-10-08
updated: 2026-10-08
role: implementation
risk_level: medium
source: "[[Agent Registry]]"

skills:
  - "[[Skill - Coding]]"
  - "[[Skill - Git]]"
  - "[[Skill - Testing]]"
  - "[[Skill - Obsidian Auto Debug]]"

policies:
  - "[[Policy - Repository Write]]"
  - "[[Policy - Code Standards]]"
  - "[[Policy - Production Deployment]]"

tools:
  - "[[Tool - GitHub]]"
  - "[[Tool - Filesystem]]"
  - "[[Tool - Test Runner]]"
  - "[[Tool - Obsidian CLI]]"

can:
  - read_source
  - write_source
  - create_branch
  - create_pull_request
  - run_tests

requires_approval:
  - merge_pull_request
  - production_deploy
  - delete_user_data

tags:
  - agent
  - developer
  - implementation
---

# Developer Agent

## Role

Implementation and code-change agent.

## Responsibilities

- Implement approved tasks.
- Modify source code within the approved scope.
- Run tests, linting, and validation.
- Prepare pull requests with a change summary.
- Report changed files, test results, and remaining risks.

## Workflow

[[Task]]
→ [[Plan]]
→ [[Implementation]]
→ [[Validation]]
→ [[Pull Request]]
→ [[Review]]

## Related agents

- [[Agent - Architect]]
- [[[[Agent - Tester]]]]
- [[Agent - Reviewer]]
- [[Agent - Security]]
```

## Skill

ไฟล์: `20-skills/Skill - Obsidian Auto Debug.md`

```markdown
---
id: skill-obsidian-auto-debug
type: skill
title: Obsidian Auto Debug
status: active
version: "1.1.0"
owner: self
sensitivity: internal
created: 2026-10-08
updated: 2026-10-08
domain: obsidian
risk_level: medium
source: "[[SKILL - Obsidian Auto Debug]]"

used_by:
  - "[[Agent - Developer]]"
  - "[[Agent - Repair]]"

requires:
  - "[[Tool - Obsidian CLI]]"
  - "[[Policy - Safe Remediation]]"

produces:
  - "[[Artifact - Debug Report]]"
  - "[[Artifact - Diagnostic Evidence]]"

tags:
  - skill
  - obsidian
  - debugging
  - error-checking
  - self-healing
---

# Obsidian Auto Debug

## Purpose

Diagnose and repair Obsidian vault, plugin, theme, and configuration failures using safe, evidence-based steps.

## When to use

Use when a user reports an Obsidian error, broken plugin, failed command, blank note, sync problem, or asks to debug Obsidian.

## Procedure

1. Capture the exact symptom, affected plugin, vault path, Obsidian version, and operating system.
2. Run baseline diagnostics:
   ```bash
   obsidian dev:errors
   obsidian dev:console level=error
   ```
3. Reproduce the failing workflow while console capture is active.
4. Inspect plugin manifests, enabled-plugin configuration, and relevant `data.json` files.
5. Apply only one reversible change at a time.
6. Reload the affected plugin and re-run the error checks.
7. Mark the outcome as `fixed`, `improved`, or `unresolved`.

## Error-checking gates

- Baseline errors are recorded before any change.
- The original workflow is reproduced.
- The affected plugin successfully reloads.
- No new errors or unhandled rejections appear after the fix.
- The error count does not increase.
- Changed files are backed up.
```

## Policy

ไฟล์: `30-policies/Policy - Safe Remediation.md`

```markdown
---
id: policy-safe-remediation
type: policy
title: Safe Remediation Policy
status: active
version: "1.0.0"
owner: self
sensitivity: internal
created: 2026-10-08
updated: 2026-10-08
authority: high
source: "[[Policy Registry]]"

applies_to:
  - "[[Agent - Developer]]"
  - "[[Agent - Repair]]"
  - "[[Skill - Obsidian Auto Debug]]"

rules:
  - id: backup-before-write
    effect: require
    condition: action == write_file
    requirement: create_backup

  - id: no-destructive-delete
    effect: deny
    condition: action in [delete_user_data, delete_plugin_data]
    unless: human_approval == true

  - id: validation-before-retry
    effect: deny
    condition: repair_attempts >= 3 and validation_status != passed

  - id: production-approval
    effect: review
    condition: environment == production

tags:
  - policy
  - safety
  - remediation
---

# Safe Remediation Policy

## Objective

Ensure agents make reversible, auditable, and least-privilege changes.

## Rules

- Back up every file before modifying it.
- Never delete notes, attachments, plugin data, or sync-conflicted files without explicit human approval.
- Prefer disabling or reloading a plugin before reinstalling it.
- Limit automated repair attempts to three.
- Require human review for production deployment and irreversible actions.
```

## Task

ไฟล์: `40-tasks/TASK-001.md`

```markdown
---
id: TASK-001
type: task
title: Fix Obsidian plugin command failure
status: in_progress
priority: high
owner: self
sensitivity: internal
created: 2026-10-08
updated: 2026-10-08
due: 2026-10-10
source: "[[Task Inbox]]"

delegated_to:
  - "[[Agent - Developer]]"

depends_on:
  - "[[Task - TASK-000 Repository Inventory]]"

uses:
  - "[[Skill - Obsidian Auto Debug]]"

governed_by:
  - "[[Policy - Safe Remediation]]"

produces:
  - "[[Artifact - Debug Report]]"
  - "[[Artifact - Patch]]"

validation:
  - "[[Validation - Tests]]"
  - "[[Validation - Console Errors]]"

tags:
  - task
  - obsidian
  - debugging
---

# Fix Obsidian plugin command failure

## Objective

Diagnose why the plugin command loads but performs no action, then apply the safest reversible fix.

## Acceptance criteria

- The original command completes successfully.
- `obsidian dev:errors` returns no new errors.
- `obsidian dev:console level=error` returns no new errors.
- The affected plugin reloads successfully.
- All changed files have backups.
- A debug report is produced.

## Constraints

- Do not delete user data or plugin data.
- Do not modify unrelated plugins or global Obsidian settings.
- Limit repair attempts to three.
```

## Run

ไฟล์: `50-runs/RUN-1042.md`

```markdown
---
id: RUN-1042
type: run
title: Auto-debug run for TASK-001
status: failed
owner: self
sensitivity: internal
created: 2026-10-08T23:40:00+07:00
updated: 2026-10-08T23:47:00+07:00
started_at: 2026-10-08T23:40:00+07:00
finished_at: 2026-10-08T23:47:00+07:00
source: "[[Run Log]]"

correlation_id: task-sha-fix
executes: "[[TASK-001]]"
executed_by: "[[Agent - Developer]]"
uses:
  - "[[Skill - Obsidian Auto Debug]]"
governed_by:
  - "[[Policy - Safe Remediation]]"

environment: local
exit_code: 1
result: failed

produces:
  - "[[Artifact - Diagnostic Evidence]]"
  - "[[Feedback - EVT-1042]]"

tags:
  - run
  - failed
  - obsidian
---

# Run RUN-1042

## Summary

The auto-debug workflow identified a plugin initialization failure after reload.

## Commands executed

```bash
obsidian dev:errors
obsidian dev:console level=error
obsidian plugin:reload id=my-plugin
obsidian dev:errors
```

## Result

The plugin reloaded, but the console captured an unhandled rejection during command registration.
```

## Feedback event

ไฟล์: `70-feedback/EVT-1042.md`

```markdown
---
id: EVT-1042
type: feedback
title: Plugin command registration failed
status: open
severity: error
confidence: 0.98
owner: self
sensitivity: internal
created: 2026-10-08T23:47:00+07:00
updated: 2026-10-08T23:47:00+07:00
source: "[[Run RUN-1042]]"

correlation_id: task-sha-fix
run_id: RUN-1042
actor:
  type: agent
  id: agent-developer
target:
  type: plugin
  id: my-plugin

result: failed
classification: initialization_error
repair_status: pending
repair_attempts: 1
max_repair_attempts: 3

evidence:
  - type: console_error
    message: "Unhandled rejection in plugin command registration"
  - type: test
    id: command_registration
    result: failed

impact:
  - "[[Skill - Obsidian Auto Debug]]"
  - "[[Agent - Developer]]"
  - "[[TASK-001]]"

tags:
  - feedback
  - validation-failed
  - obsidian
---

# Feedback: Plugin command registration failed

## Observation

`obsidian dev:console level=error` captured an unhandled rejection after plugin reload.

## Interpretation

The plugin loaded, but its command registration path failed before the command became available.

## Evidence

- Console error: unhandled rejection during command registration.
- Reproduction: plugin reload followed by command invocation.
- Correlation: `RUN-1042` and `TASK-001`.

## Recommended action

Inspect the plugin’s command-registration code and dependency imports, then reload and re-run the error gates.
```

## Chunk ตัวอย่าง

สมมติ indexer แบ่ง `Skill - Obsidian Auto Debug.md` เป็น chunks ตาม heading ได้ดังนี้

### Chunk 1: Purpose

```yaml
chunk_id: chunk_skill_obsidian_auto_debug_001
source_id: skill-obsidian-auto-debug
source_path: "20-skills/Skill - Obsidian Auto Debug.md"
source_type: skill
source_version: "1.1.0"
chunk_index: 1
chunk_type: purpose
heading_path:
  - "Obsidian Auto Debug"
  - "Purpose"
token_count: 48
language: en
sensitivity: internal
status: active
created: 2026-10-08
updated: 2026-10-08
content_hash: sha256:9f2c...
keywords:
  - obsidian
  - debugging
  - plugin
  - vault
related_entities:
  - agent-developer
  - policy-safe-remediation
  - tool-obsidian-cli
```

```markdown
Diagnose and repair Obsidian vault, plugin, theme, and configuration failures using safe, evidence-based steps.
```

### Chunk 2: Procedure

```yaml
chunk_id: chunk_skill_obsidian_auto_debug_002
source_id: skill-obsidian-auto-debug
source_path: "20-skills/Skill - Obsidian Auto Debug.md"
source_type: skill
source_version: "1.1.0"
chunk_index: 2
chunk_type: procedure
heading_path:
  - "Obsidian Auto Debug"
  - "Procedure"
token_count: 186
language: en
sensitivity: internal
status: active
created: 2026-10-08
updated: 2026-10-08
content_hash: sha256:41ab...
keywords:
  - dev:errors
  - dev:console
  - plugin reload
  - data.json
  - manifest.json
related_entities:
  - skill-obsidian-auto-debug
  - policy-safe-remediation
```

```markdown
1. Capture the exact symptom, affected plugin, vault path, Obsidian version, and operating system.
2. Run baseline diagnostics:
   ```bash
   obsidian dev:errors
   obsidian dev:console level=error
   ```
3. Reproduce the failing workflow while console capture is active.
4. Inspect plugin manifests, enabled-plugin configuration, and relevant `data.json` files.
5. Apply only one reversible change at a time.
6. Reload the affected plugin and re-run the error checks.
7. Mark the outcome as `fixed`, `improved`, or `unresolved`.
```

### Chunk 3: Error gates

```yaml
chunk_id: chunk_skill_obsidian_auto_debug_003
source_id: skill-obsidian-auto-debug
source_path: "20-skills/Skill - Obsidian Auto Debug.md"
source_type: skill
source_version: "1.1.0"
chunk_index: 3
chunk_type: validation
heading_path:
  - "Obsidian Auto Debug"
  - "Error-checking gates"
token_count: 112
language: en
sensitivity: internal
status: active
created: 2026-10-08
updated: 2026-10-08
content_hash: sha256:77de...
keywords:
  - error-checking
  - baseline
  - regression
  - unhandled rejection
  - plugin reload
related_entities:
  - skill-obsidian-auto-debug
  - validation-console-errors
```

```markdown
- Baseline errors are recorded before any change.
- The original workflow is reproduced.
- The affected plugin successfully reloads.
- No new errors or unhandled rejections appear after the fix.
- The error count does not increase.
- Changed files are backed up.
```

## กฎการตัด chunk

- แยก YAML frontmatter เป็น metadata ของทั้งเอกสาร ไม่ใช่ chunk เนื้อหา
- แบ่งตาม `#`, `##`, `###` ก่อน แล้วค่อยรวมย่อหน้าสั้นภายใต้ heading เดียวกัน
- แยก code block ออกเป็น chunk ของตัวเอง พร้อมเก็บ `language`, `command`, และ `source_path`
- เก็บ `heading_path`, `chunk_type`, `source_id`, `source_version`, และ `content_hash` ทุก chunk
- ห้ามตัดกลางตาราง, code block, หรือขั้นตอน numbered list
- ใช้ `chunk_type` เช่น `purpose`, `procedure`, `policy`, `validation`, `evidence`, `decision` เพื่อช่วย filter และ rerank

## การใช้กับ MCP

MCP tools ควรมี `name`, `description`, และ `inputSchema` แบบ JSON Schema; ใช้ schema นี้เพื่อให้ agent เรียกค้นหา chunk, ดึง source และขยาย graph ได้อย่างมีโครงสร้าง[2][3][4]

```yaml
mcp:
  tools:
    - name: knowledge_search
      description: >
        Search Agent OS knowledge chunks using hybrid keyword, vector,
        metadata, and graph-aware retrieval.
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
```

สำหรับ Agent Skills ให้คง `name` และ `description` ให้ผ่านเงื่อนไข: `name` เป็น lowercase/hyphen ไม่เกิน 64 ตัวอักษร และ `description` อธิบายทั้งว่า skill ทำอะไรและควรใช้เมื่อใด เพราะระบบโหลดเฉพาะ metadata ทั้งสองฟิลด์นี้ไว้ล่วงหน้าเพื่อเลือก skill[5][6]

การอ้างอิง:
[1] Bases syntax - Obsidian Help https://obsidian.md/help/bases/syntax
[2] Schema Reference https://modelcontextprotocol.io/specification/2025-06-18/schema
[3] modelcontextprotocol.io · specification · 2025/03/26Tools - Model Context Protocol https://modelcontextprotocol.io/specification/2025-03-26/server/tools
[4] Overview https://modelcontextprotocol.io/specification/2026-07-28/basic
[5] Specification https://agentskills.io/specification
[6] Skill authoring best practices - Claude Platform Docs https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
[7] The 2026-07-28 MCP Specification Release Candidate https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/
[8] Example tool patterns https://modelcontextprotocol.info/docs/concepts/tools/
[9] github.com · blob · mainanthropicskills/agent_skills_spec.md at main · imsaif ... https://github.com/imsaif/anthropicskills/blob/main/agent_skills_spec.md
[10] Quickstart – Model Context Protocol （MCP） https://modelcontextprotocol.info/docs/quickstart/quickstart/
]]