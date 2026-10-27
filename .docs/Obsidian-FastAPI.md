==🟣Obsidian==-FastAPI

`Obsidian-FastAPI` คือการเชื่อม **Obsidian Plugin** เข้ากับ **FastAPI backend** เพื่อให้ vault มี MCP Server, semantic search, policy engine และ feedback API โดย FastAPI ทำหน้าที่เป็น backend และ MCP boundary, ส่วน Obsidian เป็น UI/knowledge layer `requestUrl()` ของ Obsidian เรียก HTTP/HTTPS ได้โดยไม่ติด CORS restriction[1][2]

## สถาปัตยกรรม

```text
Obsidian Plugin: agent-os-bridge
              ↓ HTTP + Bearer JWT
FastAPI Backend
├── /api/v1/knowledge/search
├── /api/v1/knowledge/validate
├── /api/v1/knowledge/reindex
├── /api/v1/tasks
├── /api/v1/feedback
└── /mcp
              ↓
MCP Server + Policy Engine
              ↓
Obsidian Vault / Vector Index / Audit Log
```

FastAPI-MCP สามารถ wrap FastAPI app แล้ว mount MCP ที่ `/mcp` ด้วย `mcp.mount_http()`; รองรับ authentication ผ่าน FastAPI dependencies และแนะนำ HTTP transport สำหรับ MCP ปัจจุบัน[3][4][5]

## โครงสร้างโปรเจกต์

```text
obsidian-fastapi/
├── .env
├── requirements.txt
├── main.py
├── auth.py
├── schemas.py
├── services/
│   ├── knowledge.py
│   └── vault.py
└── tests/
    └── test_knowledge.py
```

## `requirements.txt`

```text
fastapi>=0.115.0
uvicorn[standard]>=0.30.0
fastapi-mcp>=0.3.0
pydantic>=2.7.0
python-dotenv>=1.0.0
PyJWT>=2.8.0
sentence-transformers>=3.0.0
numpy>=1.26.0
pytest>=8.0.0
httpx>=0.27.0
```

ติดตั้ง:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## `.env`

```env
OBSIDIAN_VAULT_PATH=/absolute/path/to/your/vault
AGENT_OS_JWT_SECRET=change-this-to-a-long-random-secret
AGENT_OS_ACCESS_TOKEN_EXPIRE_MINUTES=60
```

## `schemas.py`

```python
from pydantic import BaseModel, Field


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class KnowledgeSearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=1000)
    folder: str = ""
    limit: int = Field(default=5, ge=1, le=20)
    minimum_score: float = Field(default=0.30, ge=0.0, le=1.0)


class KnowledgeSearchResult(BaseModel):
    score: float
    relative_path: str
    title: str
    heading: str
    chunk_id: str
    excerpt: str


class KnowledgeSearchResponse(BaseModel):
    results: list[KnowledgeSearchResult]


class ValidationResponse(BaseModel):
    valid: bool
    errors: list[str] = []
    warnings: list[str] = []
    chunk_count: int = 0
    vector_dimension: int | None = None


class ReindexResponse(BaseModel):
    indexed_notes: int
    new_or_changed_chunks: int
    total_chunks: int


class FeedbackRequest(BaseModel):
    type: str
    severity: str = "info"
    correlation_id: str | None = None
    run_id: str | None = None
    message: str
    context: dict[str, object] = {}
```

## `auth.py`

```python
import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import load_dotenv
from fastapi import HTTPException, status
from fastapi.security import HTTPBearer

load_dotenv()

SECRET_KEY = os.getenv(
    "AGENT_OS_SECRET_KEY",
    "change-this-in-production",
)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("AGENT_OS_ACCESS_TOKEN_EXPIRE_MINUTES", "60")
)

bearer_scheme = HTTPBearer(
    scheme_name="Agent OS Bearer",
    description="Agent OS access token",
)


def create_access_token(
    subject: str,
    expires_minutes: int | None = None,
) -> str:
    expires_delta = timedelta(
        minutes=expires_minutes or ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": subject,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + expires_delta,
        "scope": "agent-os:read agent-os:write",
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def verify_access_token(
    credentials=Depends(bearer_scheme),
) -> str:
    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        subject = payload.get("sub")

        if not subject:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
            )

        return subject
    except jwt.ExpiredSignatureError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
        ) from error
    except jwt.InvalidTokenError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        ) from error
```

FastAPI รองรับ `HTTPBearer` สำหรับอ่าน `Authorization: Bearer <token>` และ OAuth2 password flow ต้องส่ง username/password เป็น form data ไม่ใช่ JSON[6][7]

## `main.py`

```python
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi_mcp import AuthConfig, FastApiMCP

from auth import create_access_token, verify_access_token
from schemas import (
    FeedbackRequest,
    KnowledgeSearchRequest,
    KnowledgeSearchResponse,
    ReindexResponse,
    TokenResponse,
    ValidationResponse,
)
from services.knowledge import (
    build_semantic_index,
    search_semantic_index,
    validate_semantic_cache,
)

load_dotenv()

VAULT_PATH = Path(
    os.getenv("OBSIDIAN_VAULT_PATH", "")
).resolve()

if not VAULT_PATH.exists():
    raise RuntimeError(
        f"Obsidian vault path does not exist: {VAULT_PATH}"
    )

app = FastAPI(
    title="Obsidian Agent OS API",
    version="0.1.0",
    description="FastAPI backend for the Obsidian Agent OS platform.",
)


@app.post(
    "/auth/token",
    response_model=TokenResponse,
    tags=["auth"],
)
async def issue_token() -> TokenResponse:
    """
    Issue a local development token.

    Replace this with a real login flow before exposing
    the service beyond localhost.
    """
    return TokenResponse(
        access_token=create_access_token(
            subject="obsidian-agent-os-bridge"
        )
    )


@app.post(
    "/api/v1/knowledge/search",
    response_model=KnowledgeSearchResponse,
    tags=["knowledge"],
)
async def search_knowledge(
    request: KnowledgeSearchRequest,
    subject: str = Depends(verify_access_token),
) -> KnowledgeSearchResponse:
    results = search_semantic_index(
        query=request.query,
        folder=request.folder,
        limit=request.limit,
        minimum_score=request.minimum_score,
    )

    return KnowledgeSearchResponse(results=results)


@app.post(
    "/api/v1/knowledge/validate",
    response_model=ValidationResponse,
    tags=["knowledge"],
)
async def validate_knowledge(
    subject: str = Depends(verify_access_token),
) -> ValidationResponse:
    return validate_semantic_cache()


@app.post(
    "/api/v1/knowledge/reindex",
    response_model=ReindexResponse,
    tags=["knowledge"],
)
async def reindex_knowledge(
    subject: str = Depends(verify_access_token),
) -> ReindexResponse:
    return build_semantic_index(force_rebuild=True)


@app.post(
    "/api/v1/feedback",
    tags=["feedback"],
)
async def create_feedback(
    request: FeedbackRequest,
    subject: str = Depends(verify_access_token),
) -> dict:
    feedback_id = f"feedback-{int(datetime.now().timestamp() * 1000)}"

    return {
        "id": feedback_id,
        "status": "accepted",
        "type": request.type,
        "severity": request.severity,
        "message": request.message,
        "subject": subject,
    }


token_auth_scheme = HTTPBearer()


async def verify_mcp_token(
    token=Depends(token_auth_scheme),
) -> str:
    if not token.credentials:
        raise HTTPException(
            status_code=401,
            detail="Missing Agent OS token",
        )

    return verify_access_token(token)


mcp = FastApiMCP(
    app,
    name="Obsidian Agent OS MCP",
    description="MCP server for Obsidian knowledge search and validation.",
    auth_config=AuthConfig(
        dependencies=[Depends(verify_mcp_token)]
    ),
)

mcp.mount_http()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )
```

`FastApiMCP(app)` และ `mcp.mount_http()` ทำให้ MCP พร้อมใช้ที่ `/mcp`; `AuthConfig(dependencies=[...])` ใช้ dependency เดิมของ FastAPI เพื่อป้องกัน MCP endpoint[3][5][8]

## `services/knowledge.py`

```python
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
from sentence_transformers import SentenceTransformer

from schemas import (
    KnowledgeSearchResult,
    ValidationResponse,
)

VAULT_PATH = Path(
    os.getenv("OBSIDIAN_VAULT_PATH", "")
).resolve()

CACHE_DIR = VAULT_PATH / ".obsidian-mcp"
JSON_CACHE_PATH = CACHE_DIR / "semantic-index.json"
NPZ_CACHE_PATH = CACHE_DIR / "semantic-index.npz"

EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
EMBEDDING_DIMENSION = 384

model: SentenceTransformer | None = None


def get_model() -> SentenceTransformer:
    global model

    if model is None:
        model = SentenceTransformer(EMBEDDING_MODEL_NAME)

    return model


def content_hash(text: str) -> str:
    return hashlib.sha256(
        text.encode("utf-8")
    ).hexdigest()


def split_markdown(text: str) -> list[dict]:
    chunks = []
    current_heading = ""
    current_content: list[str] = []

    for line in text.splitlines():
        if line.startswith("#"):
            if current_content:
                chunks.append(
                    {
                        "heading": current_heading,
                        "content": "\n".join(current_content).strip(),
                    }
                )

            current_heading = line.lstrip("#").strip()
            current_content = [line]
            continue

        current_content.append(line)

    if current_content:
        chunks.append(
            {
                "heading": current_heading,
                "content": "\n".join(current_content).strip(),
            }
        )

    return [chunk for chunk in chunks if chunk["content"]]


def build_semantic_index(
    folder: str = "",
    force_rebuild: bool = False,
) -> ReindexResponse:
    folder_path = VAULT_PATH / folder if folder else VAULT_PATH
    metadata: dict[str, dict] = {}
    chunk_ids: list[str] = []
    vectors: list[list[float]] = []

    for path in folder_path.rglob("*.md"):
        relative_path = path.relative_to(VAULT_PATH).as_posix()
        text = path.read_text(encoding="utf-8")
        file_hash = content_hash(text)

        for index, chunk in enumerate(split_markdown(text)):
            chunk_id = f"{relative_path}::{index}"
            chunk_hash = content_hash(chunk["content"])

            metadata[chunk_id] = {
                "relative_path": relative_path,
                "title": path.stem,
                "heading": chunk["heading"],
                "content": chunk["content"],
                "content_hash": chunk_hash,
                "file_hash": file_hash,
            }

            chunk_ids.append(chunk_id)

    if chunk_ids:
        model = get_model()
        texts = [
            metadata[chunk_id]["content"]
            for chunk_id in chunk_ids
        ]

        vectors = model.encode(
            texts,
            normalize_embeddings=True,
            show_progress_bar=False,
        ).tolist()

    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    json_tmp = JSON_CACHE_PATH.with_suffix(".json.tmp")
    npz_tmp = NPZ_CACHE_PATH.with_suffix(".npz.tmp")

    json_tmp.write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    np.savez_compressed(
        npz_tmp,
        chunk_ids=np.array(chunk_ids, dtype=object),
        vectors=np.array(
            vectors,
            dtype=np.float32,
        ),
    )

    json_tmp.replace(JSON_CACHE_PATH)
    npz_tmp.replace(NPZ_CACHE_PATH)

    return ReindexResponse(
        indexed_notes=len(list(folder_path.rglob("*.md"))),
        new_or_changed_chunks=len(chunk_ids),
        total_chunks=len(chunk_ids),
    )


def validate_semantic_cache() -> ValidationResponse:
    errors: list[str] = []
    warnings: list[str] = []

    if not JSON_CACHE_PATH.exists():
        errors.append("JSON cache file does not exist")

    if not NPZ_CACHE_PATH.exists():
        errors.append("NPZ cache file does not exist")

    if errors:
        return ValidationResponse(
            valid=False,
            errors=errors,
            warnings=warnings,
        )

    metadata = json.loads(
        JSON_CACHE_PATH.read_text(encoding="utf-8")
    )

    with np.load(NPZ_CACHE_PATH, allow_pickle=False) as data:
        chunk_ids = data["chunk_ids"].tolist()
        vectors = data["vectors"]

    if len(chunk_ids) != len(vectors):
        errors.append(
            "Chunk ID count does not match vector count"
        )

    if vectors.ndim != 2 or vectors.shape[1] != EMBEDDING_DIMENSION:
        errors.append(
            f"Invalid embedding shape: {vectors.shape}"
        )

    if not np.isfinite(vectors).all():
        errors.append("Vectors contain NaN or infinity values")

    missing_metadata = [
        chunk_id
        for chunk_id in chunk_ids
        if chunk_id not in metadata
    ]

    if missing_metadata:
        errors.append(
            f"Missing metadata for {len(missing_metadata)} chunks"
        )

    return ValidationResponse(
        valid=len(errors) == 0,
        errors=errors,
        warnings=warnings,
        chunk_count=len(chunk_ids),
        vector_dimension=(
            int(vectors.shape[1]) if vectors.ndim == 2 else None
        ),
    )


def search_semantic_index(
    query: str,
    folder: str = "",
    limit: int = 5,
    minimum_score: float = 0.30,
) -> list[KnowledgeSearchResult]:
    if not NPZ_CACHE_PATH.exists() or not JSON_CACHE_PATH.exists():
        return []

    metadata = json.loads(
        JSON_CACHE_PATH.read_text(encoding="utf-8")
    )

    with np.load(NPZ_CACHE_PATH, allow_pickle=False) as data:
        chunk_ids = data["chunk_ids"].tolist()
        vectors = data["vectors"]

    if len(chunk_ids) == 0:
        return []

    model = get_model()

    query_vector = model.encode(
        query,
        normalize_embeddings=True,
        show_progress_bar=False,
    )

    similarities = model.similarity(
        query_vector,
        vectors,
    )[0]

    ranked_indices = np.argsort(similarities)[::-1]
    results: list[KnowledgeSearchResult] = []

    for index in ranked_indices:
        score = float(similarities[index])

        if score < minimum_score:
            break

        chunk_id = str(chunk_ids[index])
        chunk = metadata.get(chunk_id)

        if not chunk:
            continue

        results.append(
            KnowledgeSearchResult(
                score=round(float(score), 4),
                relative_path=chunk["relative_path"],
                title=chunk["title"],
                heading=chunk["heading"],
                chunk_id=chunk_id,
                excerpt=chunk["content"][:500],
            )
        )

        if len(results) >= limit:
            break

    return results
```

## รัน FastAPI

```bash
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

ทดสอบ:

```bash
curl http://127.0.0.1:8000/docs
```

MCP endpoint จะอยู่ที่:

```text
http://127.0.0.1:8000/mcp
```

FastAPI-MCP ระบุว่าเมื่อรัน FastAPI แล้ว MCP จะพร้อมใช้ที่ `/mcp` และ `mount_http()` เป็น HTTP transport ที่แนะนำ[4][5]

## เชื่อม Obsidian Plugin

ใน `src/main.ts` ให้เพิ่ม token และส่ง `Authorization` header:

```typescript
interface AgentOsSettings {
  mcpBaseUrl: string;
  accessToken: string;
  knowledgeFolder: string;
  taskFolder: string;
}
```

แก้ `requestAgentOs()`:

```typescript
private async requestAgentOs(
  endpoint: string,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const response = await requestUrl({
    url: `${this.settings.mcpBaseUrl}${endpoint}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.settings.accessToken}`,
    },
    body: JSON.stringify(body),
    throw: false,
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `Agent OS API returned ${response.status}: ${response.text}`
    );
  }

  return response.json as Record<string, unknown>;
}
```

และเพิ่ม settings field:

```typescript
new Setting(containerEl)
  .setName("Access token")
  .setDesc("Agent OS API access token.")
  .addText((text) =>
    text
      .setPlaceholder("Paste access token")
      .setValue(this.plugin.settings.accessToken)
      .onChange(async (value) => {
        this.plugin.settings.accessToken = value.trim();
        await this.plugin.saveSettings();
      })
  );
```

`requestUrl()` รับ `headers`, `body`, `method` และ `throw` ผ่าน `RequestUrlParam` จึงเหมาะกับการเรียก FastAPI ที่ต้องใช้ Bearer token[1][2]

## ทดสอบ end-to-end

```bash
# Terminal 1: FastAPI
uvicorn main:app --host 127.0.0.1:8000 --reload

# Terminal 2: build Obsidian plugin
cd .obsidian/plugins/agent-os-bridge
npm run dev
```

ใน Obsidian:

1. เปิด **Settings → Community plugins → Agent OS Bridge**
2. ใส่ `http://127.0.0.1:8000` ใน **MCP base URL**
3. วาง access token จาก `/auth/token`
4. เรียก **Agent OS Bridge: Semantic search knowledge**

## แนวปฏิบัติ

- อย่า hardcode token ใน `main.ts`; เก็บใน plugin settings
- ใช้ HTTPS และ reverse proxy เมื่อ expose นอก localhost
- จำกัด CORS และใช้ JWT expiry สั้น ๆ
- เก็บ audit log ทุก write action
- ให้ FastAPI เป็นผู้เขียน vault ผ่าน service layer เท่านั้น
- ห้ามส่งเนื้อหาโน้ตส่วนตัวหรือ secret เข้า external LLM โดยไม่มี consent

FastAPI รองรับ OAuth2 password flow โดย client ต้องส่ง `username` และ `password` เป็น form data และ token endpoint ควรคืน `access_token` พร้อม `token_type: bearer`  FastAPI-MCP ยังรองรับการป้องกัน MCP endpoint ด้วย `AuthConfig` และ FastAPI dependency เดิม[3][7][8]

การอ้างอิง:
[1] requestUrl - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/requestUrl
[2] RequestUrlParam - Developer Documentation https://docs.obsidian.md/Reference/TypeScript+API/RequestUrlParam
[3] FastAPI MCP: Welcome to FastAPI-MCP! https://fastapi-mcp.tadata.com/getting-started/welcome
[4] MCP Transport https://fastapi-mcp.tadata.com/advanced/transport
[5] Quickstart - FastAPI MCP - Tadata https://fastapi-mcp.tadata.com/getting-started/quickstart
[6] Scope_str Instance-Attribute https://fastapi.tiangolo.com/reference/security/
[7] Simple OAuth2 with Password and Bearer https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/
[8] Examples - fastapi_mcp documentation https://thedocs.io/fastapi_mcp/examples/
[9] Deploying the Server - FastAPI MCP - Tadata https://fastapi-mcp.tadata.com/advanced/deploy
[10] API Reference - fastapi_mcp documentation https://thedocs.io/fastapi_mcp/api_reference/
[11] fastapi/docs/de/docs/tutorial/security/simple-oauth2.md at master · fastapi/fastapi https://github.com/fastapi/fastapi/blob/master/docs/de/docs/tutorial/security/simple-oauth2.md
[12] Security - First Steps - Theory | FastAPI Basics https://www.fastapiinteractive.com/fastapi-basics/27-security-first-steps/theory
[13] FastAPI Basics — 45 Interactive Lessons https://www.fastapiinteractive.com/fastapi-basics
