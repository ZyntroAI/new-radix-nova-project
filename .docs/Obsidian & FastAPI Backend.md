[[Obsidian & FastAPI]] Backend

Obsidian และ **FastAPI backend** เป็นคู่ที่เหมาะสำหรับสร้างระบบอัตโนมัติหรือ AI workflow รอบ vault: Obsidian เป็นหน้าจอและฐานโน้ต Markdown ส่วน FastAPI เป็นบริการ Python ที่รับคำสั่ง ประมวลผลข้อมูล ค้นหา/เขียนโน้ต และส่งผลลัพธ์กลับผ่าน plugin หรือ HTTP API. ตัวอย่าง plugin ในชุมชนใช้รูปแบบ Obsidian plugin → local FastAPI service → งานเช่น ingest, ค้นหา, สรุป, OCR หรือ orchestration ของ LLM.[1][2]

## ภาพรวมสถาปัตยกรรม

```text
Obsidian UI / Community Plugin
            │
            │ HTTP: localhost only
            ▼
      FastAPI backend
            │
   ┌────────┼───────────────────────────┐
   ▼        ▼                           ▼
Vault I/O  Search / Index          AI / External APIs
Markdown   SQLite / vector DB      Ollama / LLM / OCR
   │
   ▼
Obsidian Vault (.md files)
```

### หน้าที่แต่ละส่วน

| ส่วนประกอบ | หน้าที่ |
|---|---|
| **Obsidian vault** | เก็บ Markdown, attachments, Properties, `[[WikiLinks]]`, tags และความรู้ของคุณ |
| **Obsidian plugin** | ปุ่ม คำสั่ง แผง UI และการส่ง request จาก Obsidian ไป backend |
| **FastAPI** | API server, validation, business logic, job orchestration, authentication และ logging |
| **File watcher** | ตรวจการเปลี่ยนแปลงใน vault แล้วอัปเดต index หรือฐานข้อมูล |
| **Search/index layer** | Full-text search, metadata search หรือ semantic/vector search |
| **LLM/OCR/transcription** | งานประมวลผลหนัก เช่น สรุปโน้ต สร้าง tags ดึงข้อความจาก PDF หรือถอดเสียง |

> [!note]
> ถ้าต้องการเพียงอ่านหรือเขียน Markdown ใน vault อาจไม่จำเป็นต้องมี plugin ก็ได้—FastAPI สามารถทำงานกับไฟล์ `.md` โดยตรง แต่ plugin จะให้ประสบการณ์ใช้งานที่สะดวกกว่าใน Obsidian เช่นคำสั่งใน Command Palette, status panel และ progress UI.

## Use cases ที่เหมาะ

- **AI note assistant** — ค้นและตอบคำถามจากโน้ต, สรุปโน้ต, สร้าง action items และเพิ่ม `[[WikiLinks]]`
- **Inbox processing** — รับ URL, ไฟล์ หรือข้อความ แล้วสร้าง Markdown note พร้อม Properties และ tags
- **RAG สำหรับ vault** — index เนื้อหาและ embeddings เพื่อถามคำถามเชิงความหมายจากคลังโน้ต
- **Research pipeline** — ดึงหน้าเว็บ, OCR, ถอดเสียง, จัดรูปแบบเป็น Obsidian Markdown
- **Daily-note automation** — สร้าง daily note, ดึงงานค้าง, รวม meeting notes หรือข้อมูลจาก calendar
- **Dashboard/API** — สร้าง web dashboard แยกที่อ่านสถานะ projects, tasks และ metadata จาก vault

ชุมชน Obsidian มีตัวอย่างระบบที่ใช้ FastAPI เป็น orchestrator คู่กับ plugin และ local models รวมถึงระบบที่มี file watcher และขั้นตอน initial ingestion ของ vault.  อีกตัวอย่างใช้ backend ท้องถิ่นเพื่อรับ URL, ถอดความ/OCR และเขียน Markdown กลับเข้า vault.[1][2]

## แนวทางที่แนะนำ

### เริ่มจาก Localhost

สำหรับ vault ส่วนตัว ให้ FastAPI ฟังเฉพาะ loopback interface:

```bash
uvicorn app.main:app --host 127.0.0.1 --port 8765
```

จุดสำคัญคือใช้ `127.0.0.1` ไม่ใช่ `0.0.0.0` หากไม่จำเป็นต้องให้เครื่องอื่นเข้าถึง เพราะ `0.0.0.0` เปิด service ไปยังเครือข่ายที่เครื่องเข้าถึงได้

### แยกสิทธิ์อ่านกับเขียน

จัดโฟลเดอร์ใน vault เช่น:

```text
MyVault/
├── 00 Inbox/
├── 01 Notes/
├── 02 Projects/
├── 90 Templates/
├── 99 Archive/
└── .obsidian/
```

กำหนดให้ backend:

- อ่านได้ทั้ง vault หากจำเป็นต่อการค้นหา
- เขียนได้เฉพาะ `00 Inbox/` หรือ `01 Notes/AI/`
- ห้ามเขียน `.obsidian/`, `.git/`, `.env` และโฟลเดอร์ sensitive
- สร้างไฟล์ใหม่ก่อนแทนการแก้ไขโน้ตต้นฉบับโดยอัตโนมัติ
- ใช้ชื่อไฟล์แบบ `YYYY-MM-DD-short-title.md`

### รักษา Obsidian Markdown

ให้ backend สร้าง Markdown ที่มี Properties และ links อย่างถูกต้อง:

```markdown
---
title: FastAPI Integration Plan
aliases:
  - Obsidian FastAPI plan
tags:
  - obsidian
  - fastapi
  - integration
type: project-note
status: draft
created: 2026-09-29
source: "[[Research Notes]]"
---

# FastAPI Integration Plan

> [!summary]
> แผนเชื่อม Obsidian กับ FastAPI backend สำหรับประมวลผลโน้ตแบบ local-first

## Related notes

- [[Obsidian Vault]]
- [[FastAPI Backend]]
- [[Model Context Protocol]]
```

## FastAPI backend แบบขั้นต่ำ

ตัวอย่างนี้รับข้อความ สร้างโน้ต Markdown ลงในโฟลเดอร์ที่อนุญาต และป้องกัน path traversal เบื้องต้น:

```python
from datetime import date
from pathlib import Path
import re

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Obsidian Local Backend")

VAULT = Path.home() / "Documents" / "MyVault"
OUTPUT_DIR = VAULT / "00 Inbox" / "AI"

class CreateNoteRequest(BaseModel):
    title: str
    body: str
    tags: list[str] = []

def safe_slug(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9ก-๙\s-]", "", value)
    return re.sub(r"\s+", "-", value)[:80].strip("-") or "untitled"

@app.post("/api/notes")
def create_note(payload: CreateNoteRequest):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    slug = safe_slug(payload.title)
    path = OUTPUT_DIR / f"{date.today().isoformat()}-{slug}.md"

    if path.exists():
        raise HTTPException(status_code=409, detail="Note already exists")

    tags = "\n".join(f"  - {tag}" for tag in payload.tags)
    content = f"""---
title: "{payload.title}"
tags:
{tags or "  - inbox"}
type: ai-generated
status: draft
created: {date.today().isoformat()}
---

# {payload.title}

{payload.body}
"""

    path.write_text(content, encoding="utf-8")
    return {"ok": True, "path": str(path.relative_to(VAULT))}
```

เริ่ม server:

```bash
uvicorn app.main:app --host 127.0.0.1 --port 8765 --reload
```

ทดสอบด้วย request:

```bash
curl -X POST http://127.0.0.1:8765/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "FastAPI ทดลองสร้างโน้ต",
    "body": "โน้ตนี้ถูกสร้างโดย local FastAPI backend",
    "tags": ["obsidian", "fastapi", "test"]
  }'
```

## เชื่อมกับ Obsidian plugin

ใน Obsidian plugin ใช้ `requestUrl` แทน `fetch` สำหรับ HTTP request ของ Obsidian:

```ts
import { requestUrl } from "obsidian";

const response = await requestUrl({
  url: "http://127.0.0.1:8765/api/notes",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "FastAPI ทดลองสร้างโน้ต",
    body: "สร้างจาก Obsidian plugin",
    tags: ["obsidian", "fastapi"],
  }),
});

console.log(response.json);
```

หาก frontend ที่เป็น browser-based หรือ web dashboard เรียก API ข้าม origin คุณต้องตั้งค่า **CORS middleware** ใน FastAPI; FastAPI ระบุว่า CORS ถูกเพิ่มผ่าน middleware ของแอป.[3]

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type", "Authorization"],
)
```

> [!warning]
> หลีกเลี่ยง `allow_origins=["*"]` ร่วมกับ authentication หรือ credentials และอย่าเปิด endpoint เขียนไฟล์ให้เข้าถึงผ่าน public internet โดยไม่มีการยืนยันตัวตนและการกำหนดสิทธิ์ที่รัดกุม

## งานเบื้องหลังและ indexing

งานที่เร็ว เช่น สร้างโน้ตสั้น ๆ สามารถตอบกลับได้ทันที แต่การสร้าง embeddings, OCR, ถอดเสียง หรือสรุปเอกสารขนาดใหญ่ควรทำแยกจาก request หลัก

FastAPI มี `BackgroundTasks` สำหรับกำหนดงานให้ทำหลังส่ง response กลับแล้ว เหมาะกับงานเบา ๆ ที่ไม่ต้องรอผลทันที.[4][5]

```python
from fastapi import BackgroundTasks, FastAPI

app = FastAPI()

def update_index(note_path: str) -> None:
    # Parse Markdown, update search index, or queue an embedding job
    pass

@app.post("/api/notes")
def create_note(
    payload: CreateNoteRequest,
    background_tasks: BackgroundTasks,
):
    # create note ...
    note_path = "00 Inbox/AI/example.md"
    background_tasks.add_task(update_index, note_path)

    return {
        "ok": True,
        "status": "created",
        "indexing": "scheduled",
    }
```

สำหรับงานหนักหรือสำคัญ เช่น batch OCR, bulk embedding, อัปโหลดวิดีโอ และงานที่ต้อง retry ควรใช้ job queue/worker แยกต่างหากแทน BackgroundTasks ใน process เดียว เพื่อให้ติดตามสถานะ ทำ retry และกู้คืนจากการ restart ได้

## ความปลอดภัย

| ความเสี่ยง | แนวทางลดความเสี่ยง |
|---|---|
| Backend ถูกเข้าถึงจากเครือข่าย | Bind กับ `127.0.0.1` และใช้ firewall |
| เขียนไฟล์นอก vault | ใช้ allowlist ของ output directory และตรวจ path หลัง resolve |
| เขียนทับโน้ตเดิม | ใช้ create-only, versioning หรือ explicit `overwrite: true` |
| Prompt injection จากเนื้อหาโน้ต | แยก “ข้อมูลจากโน้ต” ออกจาก “คำสั่งระบบ”, จำกัด write scope และขอ confirmation ก่อนแก้ไข |
| Secret หลุดเข้า vault/Git | ใช้ environment variables, `.env` ที่ ignore แล้ว และ secret manager ตามความเหมาะสม |
| API ถูกเรียกซ้ำหรือถูกใช้โดยไม่ได้รับอนุญาต | ใช้ token, rate limiting, audit logs และจำกัด origin/host |
| ไฟล์เสียหรือ frontmatter พัง | Validate Markdown/properties, เขียนไฟล์ชั่วคราวก่อน atomic rename และเก็บ backup/Git commits |

## ขั้นต่อไป

1. เริ่มจาก API แบบ read-only เช่น `GET /api/search` หรือ `GET /api/notes/{path}`  
2. เพิ่ม `POST /api/notes` ที่เขียนได้เฉพาะ `00 Inbox/AI/`  
3. เพิ่ม plugin command เช่น **Send selection to backend**  
4. เพิ่ม file watcher เพื่อ re-index เมื่อโน้ตเปลี่ยน  
5. เชื่อม local LLM หรือ embedding model หากต้องการ semantic search  
6. เพิ่ม authentication, audit log และ job queue ก่อนเปิดใช้ข้ามเครือข่าย  

FastAPI backend จึงเหมาะเป็น “ชั้นบริการ” ระหว่าง Obsidian กับงาน Python/AI: เริ่มแบบ local-first และ write scope แคบ ๆ ก่อน แล้วค่อยเพิ่ม plugin, indexing และ workflow automation ตามความจำเป็น.

การอ้างอิง:
[1] Lumen - AI Brain - Obsidian Plugin https://community.obsidian.md/plugins/researcher
[2] AnyContent Vault Importer - Obsidian Plugin https://community.obsidian.md/plugins/anycontent-vault-importer
[3] CORS (Cross-Origin Resource Sharing) - FastAPI https://fastapi.tiangolo.com/tutorial/cors/
[4] Background Tasks https://fastapi.tiangolo.com/tutorial/background-tasks/
[5] Background Tasks - BackgroundTasks - FastAPI https://fastapi.tiangolo.com/reference/background/
[6] ️ BackgroundTasks - FastAPI https://fastapi.tiangolo.com/em/tutorial/background-tasks/
[7] Moving from Flask to FastAPI https://testdriven.io/blog/moving-from-flask-to-fastapi/
[8] Douyin Favorites Sync - Obsidian Plugin https://community.obsidian.md/plugins/douyin-favorites-sync
[9] Add To Vault - Obsidian Community plugins https://community.obsidian.md/plugins/add-to-vault
[10] fastapi/docs/fr/docs/tutorial/background-tasks.md at master · fastapi/fastapi https://github.com/fastapi/fastapi/blob/master/docs/fr/docs/tutorial/background-tasks.md
[11] Background Tasks | FastAPI Basics | FastAPI Tutorial https://www.fastapiinteractive.com/fastapi-basics/35-background-tasks
[12] ObsidianRAG - GitHub https://github.com/Vasallo94/ObsidianRAG
[13] Deploying a FastAPI App | Klutch.sh Docs https://docs.klutch.sh/guides/frameworks-and-languages/python/fast-api/
[14] obsidian-mcp by unnitin https://glama.ai/mcp/servers/unnitin/obsidian-mcp
[15] How To Build A Private Ai Assistant That Syncs With Your ... https://www.alibaba.com/product-insights/how-to-build-a-private-ai-assistant-that-syncs-with-your-local-obsidian-vault-and-calendar.html
