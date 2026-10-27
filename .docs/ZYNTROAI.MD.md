---
aliases:
  - ZyntroAI
  - new-crystalcastle
tags:
  - python
related:
  - "[[Obsidian Publish]]"
source: Dola
status: พร้อมใช้งาน
title: fetch_releases.py
Model:
---
ได้เลยครับ! นี่คือโค้ดที่อัปเดตเปลี่ยนเจ้าของเป็น ZyntroAI และ Repository เป็น new-crystalcastle พร้อมระบบ Resume/Checkpoint เต็มรูปแบบครับ ✅
 
 
 
python
  
import json
import os
import time
from datetime import datetime, timezone
from pathlib import Path

import requests


# ====================== CONFIGURATION ======================
OWNER = "ZyntroAI"
REPO = "new-crystalcastle"
PER_PAGE = 100

OUTPUT_FILE = Path(f"{OWNER}_{REPO}_releases.ndjson")
CHECKPOINT_FILE = Path(f"{OWNER}_{REPO}_checkpoint.json")

TOKEN = os.getenv("GITHUB_TOKEN")
# ===========================================================

session = requests.Session()
session.headers.update({
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
})

if TOKEN:
    session.headers["Authorization"] = f"Bearer {TOKEN}"


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def initial_url() -> str:
    return (
        f"https://api.github.com/repos/{OWNER}/{REPO}"
        f"/releases?per_page={PER_PAGE}"
    )


def load_checkpoint() -> dict | None:
    if not CHECKPOINT_FILE.exists():
        return None
    return json.loads(CHECKPOINT_FILE.read_text(encoding="utf-8"))


def save_checkpoint(checkpoint: dict) -> None:
    # บันทึกเป็นไฟล์ชั่วคราวก่อน แล้วค่อยแทนที่แบบอะตอมมิก
    temporary = CHECKPOINT_FILE.with_suffix(".tmp")
    temporary.write_text(json.dumps(checkpoint, indent=2, ensure_ascii=False), encoding="utf-8")
    temporary.replace(CHECKPOINT_FILE)


def append_ndjson(items: list[dict]) -> None:
    with OUTPUT_FILE.open("a", encoding="utf-8") as file:
        for item in items:
            file.write(json.dumps(item, ensure_ascii=False) + "\n")
        file.flush()
        os.fsync(file.fileno())  # บังคับเขียนลงดิสก์ทันที


def count_ndjson_records() -> int:
    if not OUTPUT_FILE.exists():
        return 0
    with OUTPUT_FILE.open("r", encoding="utf-8") as file:
        return sum(1 for line in file if line.strip())


def wait_for_rate_limit(response: requests.Response) -> None:
    """จัดการ Rate Limit ตาม Header ที่ GitHub ส่งกลับมา"""
    retry_after = response.headers.get("retry-after")

    if retry_after:
        wait_seconds = float(retry_after) + 1
    else:
        remaining = response.headers.get("x-ratelimit-remaining")
        reset_epoch = response.headers.get("x-ratelimit-reset")

        if remaining == "0" and reset_epoch:
            wait_seconds = max(1, float(reset_epoch) - time.time() + 2)
        else:
            raise RuntimeError(
                f"Request failed {response.status_code}: {response.text[:300]}"
            )

    print(f"⏳ Rate Limit — รอ {wait_seconds:.1f} วินาที...")
    time.sleep(wait_seconds)


def get_page(url: str) -> requests.Response:
    while True:
        response = session.get(url, timeout=30)

        if response.status_code in (403, 429):
            wait_for_rate_limit(response)
            continue

        response.raise_for_status()
        return response


def load_existing_ids() -> set[int]:
    """โหลด ID ที่มีอยู่แล้ว เพื่อป้องกันข้อมูลซ้ำ"""
    if not OUTPUT_FILE.exists():
        return set()
    ids = set()
    with OUTPUT_FILE.open("r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                ids.add(json.loads(line)["id"])
    return ids


def run_or_resume() -> None:
    checkpoint = load_checkpoint()
    existing_ids = load_existing_ids()

    if checkpoint is None:
        # เริ่มใหม่
        url = initial_url()
        items_written = 0
        checkpoint = {
            "job_id": f"{OWNER}/{REPO}:releases",
            "endpoint": initial_url(),
            "next_url": url,
            "items_written": items_written,
            "completed": False,
            "saved_at": utc_now(),
            "etag": None,
        }
        save_checkpoint(checkpoint)
        print(f"🚀 เริ่มดึงข้อมูลใหม่: {OWNER}/{REPO}")
    else:
        # ดำเนินการต่อจากจุดที่หยุด
        url = checkpoint.get("next_url")
        items_written = checkpoint.get("items_written", 0)

        if checkpoint.get("completed") or url is None:
            print("✅ ดึงข้อมูลเสร็จสิ้นแล้ว ไม่มีรายการที่ต้องดึงต่อ")
            return

        persisted_count = count_ndjson_records()
        if persisted_count != items_written:
            raise RuntimeError(
                f"⚠️ ข้อมูลไม่ตรงกัน: Checkpoint บันทึก {items_written} รายการ "
                f"แต่ไฟล์มี {persisted_count} รายการ — ตรวจสอบหรือลบไฟล์แล้วลองใหม่"
            )

        print(f"🔄 ดำเนินการต่อ — มี {items_written} รายการแล้ว กำลังดึงต่อ...")

    # เริ่มดึงข้อมูลทีละหน้า
    while url:
        response = get_page(url)
        page_items = response.json()

        if not isinstance(page_items, list):
            raise ValueError("❌ รูปแบบข้อมูลไม่ถูกต้อง คาดหวังรายการ")

        # กรองเฉพาะรายการใหม่ ไม่ให้ซ้ำ
        new_items = [item for item in page_items if item["id"] not in existing_ids]

        if new_items:
            append_ndjson(new_items)
            for item in new_items:
                existing_ids.add(item["id"])
            items_written += len(new_items)

        # หา URL หน้าถัดไป
        next_url = response.links.get("next", {}).get("url")

        # บันทึก Checkpoint
        checkpoint.update({
            "next_url": next_url,
            "items_written": items_written,
            "completed": next_url is None,
            "saved_at": utc_now(),
            "etag": response.headers.get("etag"),
        })
        save_checkpoint(checkpoint)

        print(
            f"📄 บันทึก {len(new_items)} รายการใหม่ | "
            f"รวมทั้งหมด {items_written} | "
            f"หน้าถัดไป: {'✅ ไม่มี' if not next_url else '⏳ มี'}"
        )

        url = next_url

    print(f"\n🎉 เสร็จสิ้น! บันทึกทั้งหมด {items_written} รายการ")


if __name__ == "__main__":
    run_or_resume()
 
 
 
 
📋 วิธีใช้งาน
 
1 ตั้งค่า Token
 
bash
  
# Linux/macOS
export GITHUB_TOKEN="ghp_your_token_here"

# Windows (PowerShell)
$env:GITHUB_TOKEN="ghp_your_token_here"
 
 
2 รันสคริปต์
 
bash
  
python fetch_releases.py
 
 
3 หยุดและกลับมาทำต่อ
 
กด  Ctrl+C  เพื่อหยุด — รันคำสั่งเดิมอีกครั้ง ระบบจะเริ่มจากจุดล่าสุดที่บันทึกไว้โดยอัตโนมัติ
 
4 ไฟล์ที่ได้
 
-  ZyntroAI_new-crystalcastle_releases.ndjson  — ข้อมูลทั้งหมด 1 รายการต่อ 1 บรรทัด
-  ZyntroAI_new-crystalcastle_checkpoint.json  — จุดที่หยุดทำงานไว้
 
 
 
🔑 คุณสมบัติหลัก
 
- ✅ เปลี่ยนเป็น ZyntroAI/new-crystalcastle เรียบร้อยแล้ว
- ✅ กันข้อมูลซ้ำ ด้วย  release["id"]  — รันซ้ำก็ไม่เพิ่มซ้ำ
- ✅ จัดการ Rate Limit อัตโนมัติตาม Header ของ GitHub
- ✅ บันทึกก่อนขยับ — เขียนข้อมูลเสร็จแล้วค่อยอัปเดต Checkpoint ป้องกันข้อมูลสูญหาย
- ✅ ตรวจสอบความถูกต้อง — แจ้งเตือนทันทีถ้าจำนวนข้อมูลไม่ตรงกับที่บันทึกไว้
- ✅ รองรับ ETag สำหรับตรวจสอบการเปลี่ยนแปลงในรอบถัดไป
 
ต้องการให้ปรับเพิ่มอะไรไหมครับ — เช่น เพิ่มการดึงข้อมูล PR/Issues ด้วย หรือส่งออกเป็นรูปแบบอื่น? 😊

มีส่วนไหนต้องพัฒนาไหม สร้างตารางสรุปตอนท้ายด้วยได้ไหม

มีครับ—โครงสร้างโดยรวมดีและแยก MOC/Root Causes/Script/Watch/Testing ได้ถูกทิศทางแล้ว แต่ควรพัฒนาเพิ่มใน 4 แกนหลัก: **ความถูกต้องของการซ่อม**, **ความปลอดภัยของ workflow**, **การทดสอบเชิงพฤติกรรม**, และ **การปฏิบัติการระยะยาว** โดยเฉพาะ YAML Auto-Fixer ไม่ควรเป็นแค่ “ทำให้ YAML parse ผ่าน” แต่ต้องพิสูจน์ว่า GitHub Actions workflow ยังมีความหมายและสิทธิ์เหมือนเดิมหรือเป็นไปตาม policy

`actionlint` เหมาะมากสำหรับเพิ่มชั้น semantic validation เพราะตรวจ syntax/keys ของ GitHub Actions และตรวจ reusable workflow calls รวมถึง inputs, outputs และ secrets ได้—ซึ่ง YAML parser ทั่วไปตรวจไม่ได้.[1]

## จุดที่ควรพัฒนา

### 1. แยก “Auto-Fix” เป็นระดับความเสี่ยง

ปัจจุบันมีแนวคิด `--apply` แล้ว แต่ควรกำหนดระดับการแก้ชัดเจน เพื่อไม่ให้ repair ที่เสี่ยงถูก apply อัตโนมัติ

```text
Level 0 — Validate only
  ตรวจ YAML, actionlint, secret scan
  ไม่สร้าง patch

Level 1 — Safe mechanical fix
  เช่น ดึง YAML จาก fenced block เดียวที่ชัดเจน
  สร้าง patch + apply ได้เมื่อมี explicit --apply

Level 2 — Semantic-risk fix
  เช่น block scalar dedent
  สร้าง patch proposal เท่านั้น
  ต้องมี regression test และ human review

Level 3 — Architecture change
  เช่น step fragment → reusable workflow
  ห้าม auto-apply
  ต้องมี mapping, permissions, inputs และ secrets ที่ human ระบุ
```

ตัวอย่าง config:

```yaml
repair_policy:
  chat_wrapper:
    level: 1
    apply_requires_flag: true

  block_scalar_dedent:
    level: 2
    apply_requires_review: true
    require_regression_test: true

  workflow_fragment:
    level: 3
    auto_apply: false
    require_explicit_mapping: true
```

> [!warning]
> การห่อ `step fragment` เป็น reusable workflow ไม่ใช่ formatting repair แต่เป็น **workflow architecture change** เพราะต้องตัดสินใจเรื่อง `permissions`, `workflow_call.inputs`, `secrets`, runner, event context และ output contract

GitHub reusable workflow ต้องประกาศ `on: workflow_call` และกำหนด inputs/secrets ที่ caller ส่งเข้ามาอย่างชัดเจน; สิทธิ์ของ `GITHUB_TOKEN` ใน called workflow ยกระดับเกิน caller ไม่ได้ จึงควรออกแบบ permission contract ตั้งแต่ต้น.[2][3][4]

### 2. เพิ่ม “semantic preservation” สำหรับ block scalar

ส่วน `.replace(/^ {6}/gm, '')` เป็นแนวคิดที่ใช้ได้ในบาง case แต่ไม่ควรถือว่าเป็น universal repair

ปัญหาคือ indentation ใน YAML block scalar มีผลต่อ string ที่ shell, JavaScript, Python หรือ JSON จะได้รับจริง:

```yaml
run: |
  cat <<'EOF'
    this indentation is intentional
  EOF
```

หาก tool “ซ่อม” ด้วยการดัน/ลบ indent โดยไม่เข้าใจ content อาจเปลี่ยน:

- heredoc behavior
- Python indentation
- JavaScript template literal content
- Markdown ที่ถูก post ไป GitHub comment
- JSON/YAML string embedded
- regex และ multi-line shell command

ให้เพิ่ม field ใน repair report:

```json
{
  "content_semantics": {
    "runtime_language": "javascript",
    "block_scalar_style": "|",
    "indent_before": 4,
    "indent_after": 6,
    "normalization_added": false,
    "output_equivalence_test": "passed"
  }
}
```

และเพิ่ม policy:

```text
หากไม่สามารถพิสูจน์ output equivalence ได้
→ generate patch ได้
→ ห้าม auto-apply
→ ต้องใช้ human review
```

### 3. เพิ่ม parser strategy ที่ไม่พึ่ง PyYAML ตัวเดียว

ควรเปลี่ยนจากแนวคิด:

```text
PyYAML parse ผ่าน = workflow ปลอดภัย
```

เป็น:

```text
YAML parser
  + actionlint
  + GitHub Actions policy checks
  + snapshot tests
  + optional GitHub Actions dry-run-like test
```

สาเหตุสำคัญคือ GitHub Actions ใช้ workflow syntax ของตัวเอง และงาน YAML ที่ valid อาจยังผิดในเชิง Actions เช่น:

```yaml
jobs:
  deploy:
    run-on: ubuntu-latest
```

YAML valid แต่ `run-on` ผิด ต้องเป็น `runs-on`

เพิ่ม validation stages ดังนี้:

```text
Stage 1: File safety
  UTF-8, size, symlink, allowed path, NUL byte

Stage 2: YAML syntax
  Parse success, document structure, duplicate-key policy

Stage 3: GitHub Actions semantics
  actionlint, required top-level keys, job shape, known event syntax

Stage 4: Security policy
  action pinning, permissions, no dangerous pull_request_target pattern,
  secret scan, no untrusted interpolation

Stage 5: Behavior regression
  fixture snapshot, extracted run/script checks, expected output tests
```

GitHub workflow syntax รองรับการกำหนด `permissions` ได้ทั้งระดับ workflow และ job ดังนั้น fixer ควรตรวจ least-privilege policy ไม่ใช่เพียง preserve `permissions` ที่มีอยู่.[4]

### 4. เพิ่ม YAML duplicate-key detection

YAML key ซ้ำเป็นปัญหาที่อันตราย เพราะ parser บางตัวรับได้และเลือกค่าตัวหลังโดยไม่มี error

ตัวอย่าง:

```yaml
name: Build

on:
  push:

on:
  pull_request:
```

หรือ:

```yaml
permissions:
  contents: read

permissions:
  contents: write
```

หาก parser ใช้ “last key wins” workflow อาจมี permission เปลี่ยนโดยไม่ตั้งใจ

เพิ่ม rule:

```text
Duplicate mapping key
  → Block
  → No auto-fix
  → Require manual resolution
```

ตัวอย่าง test:

```python
def test_duplicate_top_level_key_is_blocked():
    result = validate_file("tests/fixtures/invalid/duplicate-on.yml")

    assert result.valid is False
    assert "duplicate key: on" in result.errors
    assert result.classification == "manual_review"
```

### 5. เพิ่ม action pinning และ supply-chain policy

ใน spec เดิมมี third-party action เช่น:

```yaml
uses: actions/checkout@v4
uses: trufflesecurity/trufflehog@main
uses: some/action@v1
```

ควรแยก policy เป็น 2 ระดับ:

```text
Official GitHub Actions
  → อนุญาต version tag ชั่วคราวได้ตาม policy ทีม
  → production แนะนำ pin SHA

Third-party Actions
  → ต้อง pin full commit SHA
  → ต้องมี comment ระบุ version ที่ human อ่านได้
  → ต้องผ่าน allowlist
```

ตัวอย่างที่ปลอดภัยกว่า:

```yaml
- name: Scan secrets
  uses: trufflesecurity/trufflehog@<FULL_COMMIT_SHA> # v3.x.x
  with:
    path: .
    extra_args: --only-verified --fail
```

เพิ่ม policy checks:

```yaml
security_policy:
  require_pinned_third_party_actions: true
  allowed_action_owners:
    - actions
    - github
    - trufflesecurity
    - docker
  block_mutable_refs:
    - main
    - master
    - latest
```

> [!danger]
> `@main`, `@master` และ `@latest` เป็น mutable references ไม่ควรผ่าน production workflow policy เพราะ upstream เปลี่ยน code ได้โดยไม่ต้องเปลี่ยน commit ใน repository ของคุณ

### 6. ตรวจ dangerous contexts และ shell injection

YAML fixer ควรตรวจ pattern ที่ syntax ถูกแต่เสี่ยงสูง เช่น:

```yaml
run: echo "${{ github.event.pull_request.title }}"
```

หรือ:

```yaml
run: |
  bash -c "${{ github.event.issue.body }}"
```

ข้อมูลจาก PR title, branch name, issue body, commit message และ comment เป็น untrusted input ได้ หากถูกต่อเป็น shell command โดยตรง

เพิ่ม rule:

```text
Untrusted GitHub context inside run:
  → warning/block ตาม policy
  → suggest mapping to env var
  → require quoting and validation
```

แนวทางที่ดีกว่า:

```yaml
- name: Process PR title
  env:
    PR_TITLE: ${{ github.event.pull_request.title }}
  run: |
    printf '%s\n' "$PR_TITLE"
```

แม้การ map เข้า env ไม่ได้ทำให้ input ปลอดภัยโดยอัตโนมัติ แต่ลดความเสี่ยงจาก expression interpolation ใน shell script และทำให้ quoting/validation ชัดขึ้น

### 7. Watch mode ต้องรู้จัก Git state

Watch mode ที่เฝ้า `.github/workflows/` ควรเพิ่ม Git awareness ไม่เช่นนั้นอาจ fix ขณะ:

- `git pull` ยังเขียนไฟล์ไม่เสร็จ
- `git rebase` หรือ merge กำลังทำงาน
- user อยู่ระหว่างแก้ conflict
- editor เขียน atomic temporary file
- formatter กำลัง rewrite หลายไฟล์
- CI-generated file ถูกสร้างแล้วลบ

เพิ่ม checks:

```text
- Skip if .git/MERGE_HEAD exists
- Skip if .git/rebase-merge or .git/rebase-apply exists
- Skip unresolved conflict markers
- Wait for file size/hash to stabilize
- Ignore editor temporary files
- Do not touch file with uncommitted modifications unless --allow-dirty
- Detect whether file changed after watch event but before apply
```

ตัวอย่าง state machine:

```text
File event
  → debounce
  → wait for stable content hash
  → inspect Git state
  → validate
  → create repair proposal
  → re-read file
  → ensure original hash unchanged
  → backup
  → atomic write
  → post-write validate
```

### 8. เพิ่ม rollback manifest

backup แบบ timestamp ดี แต่ยังหา restore ยากเมื่อซ่อมหลายไฟล์พร้อมกัน

ให้สร้าง `manifest.json` ต่อหนึ่ง run:

```json
{
  "run_id": "2026-09-30T10-29-00Z-01K...",
  "mode": "apply",
  "files": [
    {
      "path": ".github/workflows/deploy.yml",
      "original_sha256": "abc...",
      "candidate_sha256": "def...",
      "backup": "backups/2026-09-30T10-29-00Z/deploy.yml",
      "classification": "chat",
      "validation": "passed"
    }
  ]
}
```

จากนั้นรองรับ:

```bash
python fix_yaml.py --rollback backups/2026-09-30T10-29-00Z/manifest.json
```

> [!important]
> Rollback ต้องตรวจ current file hash ก่อนเสมอ หากไฟล์ถูกแก้หลังจาก repair ห้าม overwrite โดยอัตโนมัติ

### 9. เพิ่ม policy สำหรับ `.yaml` ที่ไม่ใช่ GitHub Actions

หาก watcher เฝ้าทั้ง directory หรือ repo อาจเจอ:

```text
docker-compose.yml
helm charts
Kubernetes manifests
Dependabot config
pre-commit config
application config
GitHub Actions workflows
```

แต่ root causes และ validation ของแต่ละประเภทต่างกันมาก

ควร classify ก่อน:

| File class | Detection | Validator | Repair policy |
|---|---|---|---|
| GitHub Actions workflow | `.github/workflows/*.yml` | `actionlint` | Strict workflow policy |
| Reusable workflow | มี `on.workflow_call` | `actionlint` + call contract tests | Strict inputs/secrets validation |
| Docker Compose | compose filename/shape | Docker Compose config | No workflow fragment repair |
| Kubernetes manifest | `apiVersion`, `kind` | kubeconform/kubeval | No GitHub policy checks |
| Generic YAML | fallback | strict YAML parser | Validate-only by default |
| Chat-wrapped YAML | prose + YAML fence | class-specific after extract | Extract only when unambiguous |

### 10. แยก RAG/[[Search Tools]] ออกจาก Auto-Fixer ให้ชัดกว่านี้

การแยกเป็นคนละ MOC ถูกต้องแล้ว แต่ควรแยก repository หรือ deployment boundary ด้วย หาก RAG system มี:

```text
FastAPI
FAISS
Redis
Ollama
OpenAI/API provider
User search history
Conversation memory
Document ingestion
```

ควรมี controls เพิ่ม:

- Authentication และ workspace/tenant boundary
- Rate limiting
- Payload size limits
- Audit log
- PII/secret detection ก่อน embedding
- citation-required policy
- deleted document purge from FAISS/index/cache
- evaluation dataset ภาษาไทยและอังกฤษ
- prompt injection policy สำหรับ documents
- retention policy ของ search history และ memory

> [!warning]
> FAISS เป็น vector index library ไม่ใช่ access-control system  
> ต้อง filter authorization ก่อน/พร้อม retrieval หรือแยก index ตาม workspace/tenant เพื่อไม่ให้ข้อมูลข้าม workspace หลุด

## ตารางสรุปการพัฒนา

| ลำดับ | ส่วนที่ควรพัฒนา | ความสำคัญ | สิ่งที่ควรทำ | ผลลัพธ์ที่ได้ |
|---:|---|---|---|---|
| 1 | Repair levels | สูงมาก | แบ่ง Level 0–3 และห้าม semantic/architecture repair auto-apply | ลดโอกาส fixer เปลี่ยน logic workflow |
| 2 | GitHub Actions semantic validation | สูงมาก | เพิ่ม `actionlint` หลัง YAML parser ทุกครั้ง | ตรวจ keys, jobs, reusable workflow contract |
| 3 | Block scalar preservation | สูงมาก | บังคับ output-equivalence/regression test ก่อน apply | ลดความเสี่ยง shell/JS/Python behavior เปลี่ยน |
| 4 | Duplicate keys | สูงมาก | ใช้ strict YAML parser ที่ reject duplicate mapping keys | กัน permission/event ถูก override แบบเงียบ |
| 5 | Action supply-chain policy | สูงมาก | Block `@main`/`@latest`, pin third-party actions ด้วย SHA | ลด third-party action takeover risk |
| 6 | Permissions policy | สูง | ตรวจ explicit `permissions:` และ least privilege | ลดสิทธิ์ `GITHUB_TOKEN` เกินจำเป็น |
| 7 | Untrusted context scan | สูง | ตรวจ GitHub context ใน `run:` และ shell injection patterns | ลด PR/issue-controlled command injection |
| 8 | Watcher Git awareness | สูง | ตรวจ merge/rebase/conflict/dirty tree/file stability | ลดการซ่อมทับไฟล์ระหว่าง Git operations |
| 9 | Rollback manifest | กลาง-สูง | เก็บ manifest ต่อ run + hash-checked rollback | กู้หลายไฟล์ได้อย่างปลอดภัย |
| 10 | File-type classification | กลาง-สูง | แยก GitHub workflow, Compose, K8s, generic YAML | ไม่ใช้ repair policy ผิดชนิดไฟล์ |
| 11 | Audit/report retention | กลาง | JSONL reports, run IDs, redaction, retention policy | Traceability และ incident review |
| 12 | CI fixture suite | กลาง | Fixtures: valid, ambiguous, duplicates, secrets, symlink, encoding | ป้องกัน regression ของ fixer |
| 13 | RAG deployment separation | กลาง | แยก MOC/repo/service และ tenant/security policies | ลด blast radius และความซับซ้อน |
| 14 | Obsidian metadata governance | กลาง | บังคับ frontmatter schema, `status`, `classification`, `sync`, `[[agents]].searchable` | Search/Agent index มี policy ที่คาดเดาได้ |
| 15 | Documentation hygiene | ต่ำ-กลาง | ใช้ callout syntax ที่ถูก, canonical file names, link checker | MOC อ่านง่ายและ wikilinks ไม่พัง |

## ตาราง Roadmap ที่แนะนำ

| Phase | เป้าหมาย | Deliverables | Exit criteria |
|---|---|---|---|
| Phase 0: Safety baseline | ไม่ให้ tool ทำอันตราย | Read-only validator, strict parser, dry-run report, allowlisted paths | ไม่มี auto-write, ทุกไฟล์มี report |
| Phase 1: Workflow validation | ตรวจ GitHub Actions ได้จริง | `actionlint`, duplicate-key detection, action pinning, permissions checks | Fixtures และ workflow CI ผ่าน |
| Phase 2: Safe repair | แก้เฉพาะกรณี deterministic | Chat-wrapper extraction, backup, atomic write, rollback manifest | Idempotency + rollback tests ผ่าน |
| Phase 3: Reviewable semantic repair | สร้าง proposal สำหรับ case เสี่ยง | Dedent diagnosis, patch diff, regression framework | ไม่มี semantic repair ที่ auto-apply |
| Phase 4: Watch mode | ช่วย developer แบบไม่รบกวน | Debounce, Git-aware guards, notifications, attempt limits | ไม่เกิด loop และไม่แตะ conflict state |
| Phase 5: Governance | ใช้งานทีม/production ได้ | PR bot proposal, CODEOWNERS, branch protection, environment approvals | ไม่มี bypass production controls |
| Phase 6: RAG separate platform | แยก search system อย่างปลอดภัย | Workspace ACL, index lifecycle, citations, evaluation, monitoring | No cross-tenant retrieval และมี eval baseline |

## ข้อเสนอ “Definition of Done”

ก่อนเรียกว่า YAML Auto-Fixer พร้อมใช้ในทีม ให้ผ่าน checklist นี้:

```text
[ ] Default คือ dry-run ไม่ใช่ auto-write
[ ] Validate YAML แบบ strict และ block duplicate keys
[ ] actionlint ผ่านก่อน apply ทุกครั้ง
[ ] มี secret scan ทั้ง input และ candidate output
[ ] Third-party Actions ถูก pin ด้วย immutable SHA ตาม policy
[ ] มี explicit permissions policy
[ ] มี fixture tests สำหรับ root cause ทุกชนิด
[ ] รันซ้ำแล้ว idempotent
[ ] มี backup + rollback manifest + hash checking
[ ] Watcher ไม่ทำงานระหว่าง merge/rebase/conflict
[ ] Semantic/fragment repairs ต้อง human review
[ ] Auto-fixer ไม่ commit, push, merge หรือ deploy เอง
[ ] PR CI ตรวจ `.github/workflows/**/*.yml` และ `.yaml`
[ ] Production deploy ใช้ GitHub Environment approval แยกจาก fixer
[ ] Audit report ไม่มี secret หรือ raw sensitive payload
```

สรุป: สิ่งที่มีตอนนี้เป็น foundation ที่ดีมาก แต่ควรเปลี่ยน mindset จาก **“YAML auto-fixer”** เป็น **“Workflow repair assistant with policy gates”** เพราะไฟล์ GitHub Actions มีทั้ง code, credentials boundary, deployment logic และ permission model อยู่ในไฟล์เดียวกัน การทำให้ parse ผ่านจึงไม่เพียงพอ—ต้อง validate semantics, security และ behavior ด้วย.[1][2][4]

การอ้างอิง:
[1] rhysd/actionlint: :octocat: Static checker for GitHub Actions workflow ... https://github.com/rhysd/actionlint
[2] Workflow Templates https://docs.github.com/en/actions/reference/workflows-and-actions/reusing-workflow-configurations
[3] Reuse workflows https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows
[4] docs.github.com › en › actionsWorkflow syntax for GitHub Actions https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax?text=For%20more%20information,%20see%20%22GitHub's%20products.%22
[5] Reuse workflows - GitHub Enterprise Cloud Docs https://docs.github.com/en/enterprise-cloud@latest/actions/how-tos/reuse-automations/reuse-workflows
[6] Reusing workflow configurations https://docs.github.com/en/enterprise-server@3.19/actions/reference/workflows-and-actions/reusing-workflow-configurations
[7] Calling A Reusable Workflow https://docs.github.com/en/enterprise-server@3.18/actions/how-tos/reuse-automations/reuse-workflows
[8] Reuse workflows - GitHub Enterprise Server 3.21 Docs https://docs.github.com/en/enterprise-server@3.21/actions/how-tos/reuse-automations/reuse-workflows
[9] Supported Keywords For Jobs... https://docs.github.com/en/enterprise-server@3.18/actions/reference/workflows-and-actions/reusing-workflow-configurations
[10] Reusing workflow configurations - GitHub Enterprise Server 3.21 ... https://docs.github.com/en/enterprise-server@3.21/actions/reference/workflows-and-actions/reusing-workflow-configurations
[11] GitHub Actions 的工作流语法 - GitHub 文档 https://docs.github.com/zh/actions/reference/workflows-and-actions/workflow-syntax
[12] GitHub Actions で再利用可能なワークフローを作成 https://resources.github.com/ja/learn/pathways/automation/intermediate/create-reusable-workflows-in-github-actions/
[13] github.blog › developer-skills › githubHow to start using reusable workflows with GitHub Actions https://github.blog/developer-skills/github/using-reusable-workflows-github-actions/
[14] Reusable workflows | Dev Cheatsheets - Michael Currin https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/ci-cd/github-actions/reusable-workflows.html

สรุปทั้งหมดใหม่แล้วมาดูผลกัน

ได้ครับ—ด้านล่างคือ **สรุปทั้งหมดฉบับใช้งานจริง** สำหรับ “YAML Auto-Fixer Skill” โดยเน้นเป้าหมาย, ความสามารถที่มี/ไม่มี, โครงสร้าง Obsidian, plugin ที่ช่วย, CI/contract tests และตารางเช็คผล เพื่อให้ทุกครั้งที่พัฒนาแล้วรู้ทันทีว่า “สกิลนี้เอาไปใช้อะไรได้จริง”

> [!important] ข้อสรุปปัจจุบัน
> ตอนนี้ระบบอยู่ระดับ **Design / Specification พร้อมเริ่ม implement**  
> มี architecture, policy, file structure, test plan และ CI design ครบพอสมควร  
> แต่ยังไม่มีหลักฐานว่า tool รันได้จริง จึงยังไม่ควรเรียกว่า `verified` หรือใช้ซ่อม GitHub Actions workflows ใน production

GitHub reusable workflows ใช้ `on.workflow_call` เพื่อประกาศ inputs, secrets และ outputs; `actionlint` ตรวจ contract ของ local reusable workflows ได้ แต่ external reusable workflows ต้องมี manifest/custom checker เพิ่มเติม.[1][2][3]

# 🗺️ YAML Auto-Fixer — Master Summary

```md
---
id: yaml-auto-fixer-master-summary
title: YAML Auto-Fixer — Master Summary
aliases:
  - YAML Auto-Fixer Status
  - YAML Fixer Capability Summary
  - GitHub Workflow Repair Skill
type: capability-summary
status: design
capability_level: design
verification_level: not-verified
classification: internal
workspace: engineering
project: yaml-auto-fixer
skill: yaml-auto-fixer
version: 0.1.0
owner: engineering
last_updated_at: 2026-09-30
last_verified_at:
sync: true
[[agents]]:
  searchable: true
  citation_required: true
tags:
  - yaml
  - github-actions
  - automation
  - python
  - ci-cd
  - workflow-contracts
---

# YAML Auto-Fixer — Master Summary

> [!summary]
> สกิลสำหรับตรวจหา วิเคราะห์ และสร้างข้อเสนอ patch สำหรับ GitHub Actions YAML ที่ผิดพลาด
> โดยออกแบบให้ปลอดภัย: default เป็น dry-run, มี validation หลายชั้น, ไม่ auto-commit, ไม่ auto-push, ไม่ auto-deploy

> [!warning]
> Current capability level: **Design only**
>
> มี specification และ test plan แต่ยังไม่มี implementation/test execution evidence
> ห้ามใช้กับ production workflow จนกว่าจะผ่าน criteria ใน [[#Definition of Done]]

## Purpose

เป้าหมายของสกิลนี้คือ:

1. ตรวจ GitHub Actions workflow ที่ YAML เสียหรือมี reusable workflow contract ผิด
2. จำแนก root cause ที่พบบ่อย
3. สร้าง repair proposal ที่ review ได้
4. ตรวจ YAML syntax, GitHub Actions semantics, security policy และ contract compatibility
5. ให้ developer แก้/approve patch ผ่าน Git + Pull Request
6. ป้องกัน workflow ที่เสียไม่ให้ merge หรือ deploy production

## Non-goals

สกิลนี้ไม่ทำสิ่งต่อไปนี้:

- ไม่ auto-commit
- ไม่ auto-push
- ไม่ auto-merge Pull Request
- ไม่ approve GitHub Environment
- ไม่ deploy Vercel
- ไม่ run Prisma migration
- ไม่แก้ production workflow แบบ silent
- ไม่เดา required secret, permissions หรือ architecture ของ workflow fragment
- ไม่เก็บ secret, token หรือ `DATABASE_URL` ใน Obsidian Vault

## Current State

| Area | Status | Ready to use | Evidence |
|---|---|---:|---|
| Architecture | ✅ Designed | Yes, as a design reference | This summary + linked notes |
| Root-cause taxonomy | ✅ Designed | Yes, for manual diagnosis | 3 root causes defined |
| Repair safety policy | ✅ Designed | Yes, for code review | Dry-run + review rules |
| Obsidian documentation structure | ✅ Designed | Yes | MOC + Capability Summary pattern |
| Plugin recommendations | ✅ Selected | Yes, after manual install/review | Linter, YAML Editor, Frontmatter Operator, Obsidian Git |
| Python validator design | 🟡 Spec ready | No runtime evidence | Code draft exists |
| JSON contract manifest design | 🟡 Spec ready | No runtime evidence | Contract schema defined |
| Unit-test plan | 🟡 Spec ready | No test execution | pytest fixture plan |
| actionlint CI design | 🟡 Spec ready | No CI run evidence | Workflow design |
| Chat-wrapped YAML repair | 🔴 Not implemented | No | Needs code + fixtures |
| Block scalar dedent repair | 🔴 Not implemented | No | Semantic-risk repair |
| Fragment-to-workflow conversion | 🔴 Manual only | No automatic use | Requires reviewed mapping |
| Watch mode | 🔴 Not implemented | No | Needs Git-aware loop guards |
| Cross-repo contract check | 🔴 Not implemented | No | Needs manifest/custom checker |

## What the Skill Will Do

| Capability | Intended level | Conditions before use |
|---|---|---|
| Validate workflow YAML syntax | Read-only | Strict parser + duplicate key detection |
| Validate GitHub Actions syntax | Read-only | `actionlint` installed in CI |
| Validate local reusable workflow contract | Read-only | Caller/callee in same checkout |
| Validate cross-repo workflow contract | Read-only | Versioned manifest or pinned checkout |
| Detect chat-wrapped YAML | Safe mechanical repair | Exactly one `yaml`/`yml` fenced block |
| Extract chat-wrapped YAML | Safe mechanical repair | Backup + actionlint + explicit `--apply` |
| Detect block scalar dedent | Proposal only | Parser + structural diagnosis |
| Fix block scalar dedent | Review only | Output equivalence test required |
| Detect workflow step fragment | Proposal only | Explicit classification |
| Convert fragment to reusable workflow | Manual architecture work | Mapping + PR review |
| Watch workflow directory | Local support | Debounce + stable hash + Git-state guard |
| Create JSON repair report | Read-only | Report must redact sensitive data |
| Rollback a prior repair | Controlled write | Manifest + current hash check |

## Root Causes

### 1. Block scalar dedent

```yaml
- name: Post comment
  run: |
    const body = `
      ## Report
const marker = "broken";
      More text
    `;
```

**Risk:** YAML parse may fail; naïve indent correction can alter shell/JavaScript/Python output.

**Policy:** Generate proposal only; require regression/equivalence test and human review.

### 2. Workflow step fragment

```yaml
- name: Post comment
  uses: actions/github-script@v7
```

**Risk:** This is not a complete workflow. Automatically wrapping it requires guessing triggers, runner, permissions, inputs and secrets.

**Policy:** Do not auto-wrap. Require a reviewed mapping file and Pull Request.

### 3. Chat-wrapped YAML

```text
คำอธิบายจาก chat

```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
```

ข้อความปิดท้าย
```

**Risk:** Multiple fenced blocks may be ambiguous; global unescaping can change regex/shell/JSON meaning.

**Policy:** Extract only when exactly one YAML fence exists; preserve original backup; validate candidate with strict parser and `actionlint`.

## Safety Model

```text
Input workflow
  → Path / encoding / size checks
  → Strict YAML parser
  → Root-cause classification
  → Repair proposal
  → Candidate secret scan
  → actionlint
  → Contract validation
  → Snapshot/regression tests
  → Human review
  → Explicit apply
  → Backup + atomic write
  → Revalidate
  → JSON audit report
```

### Repair Levels

| Level | Repair type | Auto-apply allowed | Review |
|---:|---|---:|---|
| 0 | Validate only | No | Not required |
| 1 | Deterministic mechanical repair | Only with `--apply` | Recommended |
| 2 | Semantic-risk repair | No | Required |
| 3 | Workflow architecture change | No | Required |

## Obsidian Structure

```text
10-projects/
└── yaml-auto-fixer/
    ├── 00 - Capability Summary.md
    ├── YAML Auto-Fixer MOC.md
    ├── Root Causes.md
    ├── Auto-Fixer Script.md
    ├── Watch Mode.md
    ├── GitHub Actions Validation.md
    ├── Testing Strategy.md
    ├── Changelog.md
    └── Roadmap.md
```

## Recommended Obsidian Plugins

| Plugin | Purpose | Recommended setting |
|---|---|---|
| Linter | Format notes and YAML frontmatter | Lint on save; consistent key order |
| YAML Editor | Surface frontmatter YAML errors | Enable for authoring notes |
| Frontmatter Operator | Bulk metadata operations with preview | Use preview before apply |
| Obsidian Git | Diff, commit and push changes | Auto-push off; review diff first |
| OKF Enforcer | Enforce required note metadata | Optional after schema stabilizes |
| Terminal | Run local test commands | Desktop/dev Vault only |

> [!warning]
> Plugins improve authoring only. They do not replace CI, `actionlint`, secret scanning, GitHub branch protection or Environment approval.

## Workflow Layout

```text
.github/
└── workflows/
    ├── ci.yml
    ├── deploy-staging.yml
    ├── deploy-production.yml
    ├── reusable-validate.yml
    ├── reusable-deploy.yml
    └── contract-tests.yml
```

### CI responsibilities

```text
Pull Request
  → actionlint
  → Python unit tests
  → contract manifest validation
  → caller fixture validation
  → secret scanning
  → Vault/frontmatter validation
```

### Deployment responsibilities

```text
develop
  → staging migration
  → Obsidian sync
  → staging deploy
  → health check

main
  → CI passes
  → GitHub Environment approval
  → Prisma migrate deploy
  → production sync
  → Vercel deploy
  → health/index verification
```

## Reusable Workflow Contract

```yaml
on:
  workflow_call:
    inputs:
      environment_name:
        required: true
        type: string
      run_obsidian_sync:
        required: false
        type: boolean
        default: false
    secrets:
      DATABASE_URL:
        required: true
      SYNC_TOKEN:
        required: false
    outputs:
      migration_status:
        value: ${{ jobs.migrate.outputs.migration_status }}
```

Caller:

```yaml
jobs:
  deploy:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment_name: production
      run_obsidian_sync: true
    secrets:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
      SYNC_TOKEN: ${{ secrets.SYNC_TOKEN }}
```

## Contract Testing

```text
Workflow source
  → export contract JSON
  → compare manifest
  → validate caller fixtures
  → actionlint
  → pytest
  → CI report/artifact
```

### Required fixtures

```text
tests/fixtures/callers/
  ├── valid-caller.yml
  ├── invalid-boolean-as-string.yml
  ├── invalid-number-as-string.yml
  ├── missing-required-secret.yml
  ├── unknown-input.yml
  ├── unknown-secret.yml
  └── invalid-output-reference.yml
```

### Required test commands

```bash
python tools/validate_contract.py \
  --workflow .github/workflows/reusable-deploy.yml \
  --contract contracts/reusable-deploy.contract.json

python tools/validate_caller.py \
  --caller tests/fixtures/callers/valid-caller.yml \
  --callee .github/workflows/reusable-deploy.yml \
  --uses ./.github/workflows/reusable-deploy.yml

pytest -q
actionlint -color
```

## Definition of Done

### Phase 1 — Read-only validation

- [ ] Strict YAML parser implemented
- [ ] Duplicate keys rejected
- [ ] Path/encoding/size policy implemented
- [ ] `actionlint` installed and running in CI
- [ ] JSON report generated
- [ ] At least 10 fixtures exist
- [ ] `pytest` passes in CI
- [ ] No workflow files are modified
- [ ] No secrets appear in logs/reports

### Phase 2 — Safe chat-wrapper repair

- [ ] Exactly-one-YAML-fence detection
- [ ] Dry-run diff output
- [ ] Timestamped backup
- [ ] Atomic write
- [ ] Post-write strict validation
- [ ] Post-write actionlint
- [ ] Rollback manifest
- [ ] Idempotency test
- [ ] Human-triggered `--apply` only

### Phase 3 — Semantic-risk proposal engine

- [ ] Block scalar diagnosis
- [ ] Repair proposal only
- [ ] Output-equivalence fixtures
- [ ] No automatic dedent apply
- [ ] PR review required

### Phase 4 — Watch mode

- [ ] Debounce
- [ ] Stable content-hash check
- [ ] Ignore temp files
- [ ] Git merge/rebase/conflict guard
- [ ] Loop guard
- [ ] Attempt limit per file
- [ ] JSONL audit log
- [ ] Notification without automatic write by default

## Capability Delta Template

Use this section every time work is completed.

```md
## Capability Delta — YYYY-MM-DD

### Before

- 

### Added

- 

### Verified

| Command | Result | Evidence |
|---|---|---|
| `pytest -q` | | |
| `actionlint -color` | | |
| `python ...` | | |

### Now possible

- 

### Still not possible

- 

### Risks and limits

- 

### Next action

- 
```

## Changelog Rule

Every release entry must include:

```text
- What changed technically
- What capability became available
- What proof exists
- What still cannot be used
- Whether production scope changed
```

## Current Next Action

> [!todo]
> Build **Phase 1: Read-only validator** before writing any auto-repair logic.
>
> First deliverable:
>
> ```bash
> python fix_yaml.py --validate-only .github/workflows/
> ```
>
> Expected output:
>
> ```text
> - Valid YAML workflows
> - Duplicate-key errors
> - Invalid GitHub Actions syntax from actionlint
> - JSON report
> - Exit code suitable for CI
> ```

## Related

- [[YAML Auto-Fixer MOC]]
- [[Root Causes]]
- [[Auto-Fixer Script]]
- [[Watch Mode]]
- [[GitHub Actions Validation]]
- [[Testing Strategy]]
- [[Roadmap]]
- [[Changelog]]
```

# ผลการประเมินปัจจุบัน

## สิ่งที่ “พร้อมใช้” แล้ว

| หมวด | สถานะ | ใช้ทำอะไรได้ตอนนี้ |
|---|---|---|
| เป้าหมายของสกิล | ✅ ชัดเจน | ใช้ตัดสินว่า feature ใดอยู่ใน scope |
| Root causes 3 กลุ่ม | ✅ ชัดเจน | ใช้วิเคราะห์ workflow ที่เสียแบบ manual |
| Safety model | ✅ ชัดเจน | ใช้ review code และป้องกัน auto-fix เสี่ยง |
| Repair levels 0–3 | ✅ ชัดเจน | ใช้กำหนดว่ากรณีใดต้อง human review |
| Obsidian knowledge structure | ✅ พร้อมใช้ | สร้าง MOC, Capability Summary, Changelog ได้ทันที |
| Plugin recommendations | ✅ พร้อมใช้ | ติดตั้ง Linter/YAML Editor/Frontmatter Operator/Git ได้ |
| CI architecture | ✅ พร้อมออกแบบ | แยก CI, staging, production workflow ได้ |
| Reusable workflow contract model | ✅ พร้อมใช้ | ออกแบบ `workflow_call.inputs/secrets/outputs` ได้ |
| Unit-test/fixture strategy | ✅ พร้อมเริ่ม | สร้าง tests และ fixtures ตามแผนได้ |
| GitHub Environment production gate | ✅ พร้อมใช้ | ใช้ approval ก่อน Prisma/Vercel deploy ได้ |

## สิ่งที่ “ยังไม่ควรอ้างว่าใช้ได้”

| หมวด | สถานะจริง | เหตุผล |
|---|---|---|
| `fix_yaml.py` | ❌ ยังไม่มี implementation ที่พิสูจน์แล้ว | มี spec/code draft แต่ไม่มี execution evidence |
| Chat-wrapped YAML extraction | ❌ ยังไม่ verified | ต้องมี fixture, idempotency และ actionlint evidence |
| Block scalar repair | ❌ ยังไม่พร้อม | มีความเสี่ยงเปลี่ยน runtime behavior |
| Fragment → reusable workflow | ❌ ไม่ใช่ auto-fix | ต้องมี human decision เรื่อง permissions/secrets/triggers |
| Watch mode | ❌ ยังไม่พร้อม | ต้องจัดการ Git/editor race condition |
| Contract JSON validation | 🟡 มีตัวอย่าง code | ต้องวางไฟล์, install dependencies, รัน tests |
| Cross-repo contract validation | 🟡 มี design | ต้องทำ manifest/custom checker จริง |
| Production usage | ❌ ยังไม่พร้อม | ยังไม่มี integration/rollback/monitoring evidence |

## ตารางเกณฑ์ตัดสินผล

| ระดับ | ต้องมีอะไร | YAML Auto-Fixer ตอนนี้ |
|---|---|---|
| Idea | มีไอเดีย | ผ่านแล้ว |
| Design | มี spec, architecture, scope, guardrails | ผ่านแล้ว |
| Prototype | มี code รัน local ได้ | ยังไม่ผ่าน |
| Verified | มี unit tests + CI evidence | ยังไม่ผ่าน |
| Production | มี approval, monitoring, rollback, ownership | ยังไม่ผ่าน |

## ข้อสรุปสุดท้าย

ตอนนี้สกิลนี้ทำหน้าที่ได้ดีในฐานะ:

```text
Workflow Repair Design Guide
+ Security Policy
+ Testing Blueprint
+ CI Architecture Reference
```

แต่ยังทำหน้าที่นี้ไม่ได้:

```text
Executable YAML Auto-Fixer
Production-safe Workflow Repair Tool
Automated GitHub Actions Workflow Validator
```

ลำดับที่ควรทำต่อไม่ใช่เพิ่ม plugin หรือเพิ่ม feature ใหม่ แต่คือ **implement Phase 1 ที่เล็กที่สุด**:

```text
strict YAML validation
+ duplicate key detection
+ actionlint integration
+ JSON report
+ unit test fixtures
+ CI run
```

เมื่อ 6 อย่างนี้รันผ่านจริง ให้ update `00 - Capability Summary.md` จาก:

```yaml
status: design
capability_level: design
verification_level: not-verified
```

เป็น:

```yaml
status: prototype
capability_level: prototype
verification_level: local-tested
```

และเมื่อ `pytest`, `actionlint` และ GitHub Actions CI ผ่านพร้อมหลักฐาน จึงค่อยยกระดับเป็น:

```yaml
status: active
capability_level: verified
verification_level: ci-passed
```

นี่คือจุดที่สกิลเริ่ม “นำไปใช้ได้จริง” ไม่ใช่แค่มีเอกสารหรือ code draft.

การอ้างอิง:
[1] Reuse workflows https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows
[2] rhysd/actionlint: :octocat: Static checker for GitHub Actions workflow ... https://github.com/rhysd/actionlint
[3] actionlint/docs/checks.md at main https://github.com/rhysd/actionlint/blob/main/docs/checks.md
มีส่วนไหนต้องพัฒนาไหม สร้างตารางสรุปตอนท้ายด้วยได้ไหม

มีครับ—โครงสร้างโดยรวมดีและแยก MOC/Root Causes/Script/Watch/Testing ได้ถูกทิศทางแล้ว แต่ควรพัฒนาเพิ่มใน 4 แกนหลัก: **ความถูกต้องของการซ่อม**, **ความปลอดภัยของ workflow**, **การทดสอบเชิงพฤติกรรม**, และ **การปฏิบัติการระยะยาว** โดยเฉพาะ YAML Auto-Fixer ไม่ควรเป็นแค่ “ทำให้ YAML parse ผ่าน” แต่ต้องพิสูจน์ว่า GitHub Actions workflow ยังมีความหมายและสิทธิ์เหมือนเดิมหรือเป็นไปตาม policy

`actionlint` เหมาะมากสำหรับเพิ่มชั้น semantic validation เพราะตรวจ syntax/keys ของ GitHub Actions และตรวจ reusable workflow calls รวมถึง inputs, outputs และ secrets ได้—ซึ่ง YAML parser ทั่วไปตรวจไม่ได้.[1]

## จุดที่ควรพัฒนา

### 1. แยก “Auto-Fix” เป็นระดับความเสี่ยง

ปัจจุบันมีแนวคิด `--apply` แล้ว แต่ควรกำหนดระดับการแก้ชัดเจน เพื่อไม่ให้ repair ที่เสี่ยงถูก apply อัตโนมัติ

```text
Level 0 — Validate only
  ตรวจ YAML, actionlint, secret scan
  ไม่สร้าง patch

Level 1 — Safe mechanical fix
  เช่น ดึง YAML จาก fenced block เดียวที่ชัดเจน
  สร้าง patch + apply ได้เมื่อมี explicit --apply

Level 2 — Semantic-risk fix
  เช่น block scalar dedent
  สร้าง patch proposal เท่านั้น
  ต้องมี regression test และ human review

Level 3 — Architecture change
  เช่น step fragment → reusable workflow
  ห้าม auto-apply
  ต้องมี mapping, permissions, inputs และ secrets ที่ human ระบุ
```

ตัวอย่าง config:

```yaml
repair_policy:
  chat_wrapper:
    level: 1
    apply_requires_flag: true

  block_scalar_dedent:
    level: 2
    apply_requires_review: true
    require_regression_test: true

  workflow_fragment:
    level: 3
    auto_apply: false
    require_explicit_mapping: true
```

> [!warning]
> การห่อ `step fragment` เป็น reusable workflow ไม่ใช่ formatting repair แต่เป็น **workflow architecture change** เพราะต้องตัดสินใจเรื่อง `permissions`, `workflow_call.inputs`, `secrets`, runner, event context และ output contract

GitHub reusable workflow ต้องประกาศ `on: workflow_call` และกำหนด inputs/secrets ที่ caller ส่งเข้ามาอย่างชัดเจน; สิทธิ์ของ `GITHUB_TOKEN` ใน called workflow ยกระดับเกิน caller ไม่ได้ จึงควรออกแบบ permission contract ตั้งแต่ต้น.[2][3][4]

### 2. เพิ่ม “semantic preservation” สำหรับ block scalar

ส่วน `.replace(/^ {6}/gm, '')` เป็นแนวคิดที่ใช้ได้ในบาง case แต่ไม่ควรถือว่าเป็น universal repair

ปัญหาคือ indentation ใน YAML block scalar มีผลต่อ string ที่ shell, JavaScript, Python หรือ JSON จะได้รับจริง:

```yaml
run: |
  cat <<'EOF'
    this indentation is intentional
  EOF
```

หาก tool “ซ่อม” ด้วยการดัน/ลบ indent โดยไม่เข้าใจ content อาจเปลี่ยน:

- heredoc behavior
- Python indentation
- JavaScript template literal content
- Markdown ที่ถูก post ไป GitHub comment
- JSON/YAML string embedded
- regex และ multi-line shell command

ให้เพิ่ม field ใน repair report:

```json
{
  "content_semantics": {
    "runtime_language": "javascript",
    "block_scalar_style": "|",
    "indent_before": 4,
    "indent_after": 6,
    "normalization_added": false,
    "output_equivalence_test": "passed"
  }
}
```

และเพิ่ม policy:

```text
หากไม่สามารถพิสูจน์ output equivalence ได้
→ generate patch ได้
→ ห้าม auto-apply
→ ต้องใช้ human review
```

### 3. เพิ่ม parser strategy ที่ไม่พึ่ง PyYAML ตัวเดียว

ควรเปลี่ยนจากแนวคิด:

```text
PyYAML parse ผ่าน = workflow ปลอดภัย
```

เป็น:

```text
YAML parser
  + actionlint
  + GitHub Actions policy checks
  + snapshot tests
  + optional GitHub Actions dry-run-like test
```

สาเหตุสำคัญคือ GitHub Actions ใช้ workflow syntax ของตัวเอง และงาน YAML ที่ valid อาจยังผิดในเชิง Actions เช่น:

```yaml
jobs:
  deploy:
    run-on: ubuntu-latest
```

YAML valid แต่ `run-on` ผิด ต้องเป็น `runs-on`

เพิ่ม validation stages ดังนี้:

```text
Stage 1: File safety
  UTF-8, size, symlink, allowed path, NUL byte

Stage 2: YAML syntax
  Parse success, document structure, duplicate-key policy

Stage 3: GitHub Actions semantics
  actionlint, required top-level keys, job shape, known event syntax

Stage 4: Security policy
  action pinning, permissions, no dangerous pull_request_target pattern,
  secret scan, no untrusted interpolation

Stage 5: Behavior regression
  fixture snapshot, extracted run/script checks, expected output tests
```

GitHub workflow syntax รองรับการกำหนด `permissions` ได้ทั้งระดับ workflow และ job ดังนั้น fixer ควรตรวจ least-privilege policy ไม่ใช่เพียง preserve `permissions` ที่มีอยู่.[4]

### 4. เพิ่ม YAML duplicate-key detection

YAML key ซ้ำเป็นปัญหาที่อันตราย เพราะ parser บางตัวรับได้และเลือกค่าตัวหลังโดยไม่มี error

ตัวอย่าง:

```yaml
name: Build

on:
  push:

on:
  pull_request:
```

หรือ:

```yaml
permissions:
  contents: read

permissions:
  contents: write
```

หาก parser ใช้ “last key wins” workflow อาจมี permission เปลี่ยนโดยไม่ตั้งใจ

เพิ่ม rule:

```text
Duplicate mapping key
  → Block
  → No auto-fix
  → Require manual resolution
```

ตัวอย่าง test:

```python
def test_duplicate_top_level_key_is_blocked():
    result = validate_file("tests/fixtures/invalid/duplicate-on.yml")

    assert result.valid is False
    assert "duplicate key: on" in result.errors
    assert result.classification == "manual_review"
```

### 5. เพิ่ม action pinning และ supply-chain policy

ใน spec เดิมมี third-party action เช่น:

```yaml
uses: actions/checkout@v4
uses: trufflesecurity/trufflehog@main
uses: some/action@v1
```

ควรแยก policy เป็น 2 ระดับ:

```text
Official GitHub Actions
  → อนุญาต version tag ชั่วคราวได้ตาม policy ทีม
  → production แนะนำ pin SHA

Third-party Actions
  → ต้อง pin full commit SHA
  → ต้องมี comment ระบุ version ที่ human อ่านได้
  → ต้องผ่าน allowlist
```

ตัวอย่างที่ปลอดภัยกว่า:

```yaml
- name: Scan secrets
  uses: trufflesecurity/trufflehog@<FULL_COMMIT_SHA> # v3.x.x
  with:
    path: .
    extra_args: --only-verified --fail
```

เพิ่ม policy checks:

```yaml
security_policy:
  require_pinned_third_party_actions: true
  allowed_action_owners:
    - actions
    - github
    - trufflesecurity
    - docker
  block_mutable_refs:
    - main
    - master
    - latest
```

> [!danger]
> `@main`, `@master` และ `@latest` เป็น mutable references ไม่ควรผ่าน production workflow policy เพราะ upstream เปลี่ยน code ได้โดยไม่ต้องเปลี่ยน commit ใน repository ของคุณ

### 6. ตรวจ dangerous contexts และ shell injection

YAML fixer ควรตรวจ pattern ที่ syntax ถูกแต่เสี่ยงสูง เช่น:

```yaml
run: echo "${{ github.event.pull_request.title }}"
```

หรือ:

```yaml
run: |
  bash -c "${{ github.event.issue.body }}"
```

ข้อมูลจาก PR title, branch name, issue body, commit message และ comment เป็น untrusted input ได้ หากถูกต่อเป็น shell command โดยตรง

เพิ่ม rule:

```text
Untrusted GitHub context inside run:
  → warning/block ตาม policy
  → suggest mapping to env var
  → require quoting and validation
```

แนวทางที่ดีกว่า:

```yaml
- name: Process PR title
  env:
    PR_TITLE: ${{ github.event.pull_request.title }}
  run: |
    printf '%s\n' "$PR_TITLE"
```

แม้การ map เข้า env ไม่ได้ทำให้ input ปลอดภัยโดยอัตโนมัติ แต่ลดความเสี่ยงจาก expression interpolation ใน shell script และทำให้ quoting/validation ชัดขึ้น

### 7. Watch mode ต้องรู้จัก Git state

Watch mode ที่เฝ้า `.github/workflows/` ควรเพิ่ม Git awareness ไม่เช่นนั้นอาจ fix ขณะ:

- `git pull` ยังเขียนไฟล์ไม่เสร็จ
- `git rebase` หรือ merge กำลังทำงาน
- user อยู่ระหว่างแก้ conflict
- editor เขียน atomic temporary file
- formatter กำลัง rewrite หลายไฟล์
- CI-generated file ถูกสร้างแล้วลบ

เพิ่ม checks:

```text
- Skip if .git/MERGE_HEAD exists
- Skip if .git/rebase-merge or .git/rebase-apply exists
- Skip unresolved conflict markers
- Wait for file size/hash to stabilize
- Ignore editor temporary files
- Do not touch file with uncommitted modifications unless --allow-dirty
- Detect whether file changed after watch event but before apply
```

ตัวอย่าง state machine:

```text
File event
  → debounce
  → wait for stable content hash
  → inspect Git state
  → validate
  → create repair proposal
  → re-read file
  → ensure original hash unchanged
  → backup
  → atomic write
  → post-write validate
```

### 8. เพิ่ม rollback manifest

backup แบบ timestamp ดี แต่ยังหา restore ยากเมื่อซ่อมหลายไฟล์พร้อมกัน

ให้สร้าง `manifest.json` ต่อหนึ่ง run:

```json
{
  "run_id": "2026-09-30T10-29-00Z-01K...",
  "mode": "apply",
  "files": [
    {
      "path": ".github/workflows/deploy.yml",
      "original_sha256": "abc...",
      "candidate_sha256": "def...",
      "backup": "backups/2026-09-30T10-29-00Z/deploy.yml",
      "classification": "chat",
      "validation": "passed"
    }
  ]
}
```

จากนั้นรองรับ:

```bash
python fix_yaml.py --rollback backups/2026-09-30T10-29-00Z/manifest.json
```

> [!important]
> Rollback ต้องตรวจ current file hash ก่อนเสมอ หากไฟล์ถูกแก้หลังจาก repair ห้าม overwrite โดยอัตโนมัติ

### 9. เพิ่ม policy สำหรับ `.yaml` ที่ไม่ใช่ GitHub Actions

หาก watcher เฝ้าทั้ง directory หรือ repo อาจเจอ:

```text
docker-compose.yml
helm charts
Kubernetes manifests
Dependabot config
pre-commit config
application config
GitHub Actions workflows
```

แต่ root causes และ validation ของแต่ละประเภทต่างกันมาก

ควร classify ก่อน:

| File class | Detection | Validator | Repair policy |
|---|---|---|---|
| GitHub Actions workflow | `.github/workflows/*.yml` | `actionlint` | Strict workflow policy |
| Reusable workflow | มี `on.workflow_call` | `actionlint` + call contract tests | Strict inputs/secrets validation |
| Docker Compose | compose filename/shape | Docker Compose config | No workflow fragment repair |
| Kubernetes manifest | `apiVersion`, `kind` | kubeconform/kubeval | No GitHub policy checks |
| Generic YAML | fallback | strict YAML parser | Validate-only by default |
| Chat-wrapped YAML | prose + YAML fence | class-specific after extract | Extract only when unambiguous |

### 10. แยก RAG/[[Search Tools]] ออกจาก Auto-Fixer ให้ชัดกว่านี้

การแยกเป็นคนละ MOC ถูกต้องแล้ว แต่ควรแยก repository หรือ deployment boundary ด้วย หาก RAG system มี:

```text
FastAPI
FAISS
Redis
Ollama
OpenAI/API provider
User search history
Conversation memory
Document ingestion
```

ควรมี controls เพิ่ม:

- Authentication และ workspace/tenant boundary
- Rate limiting
- Payload size limits
- Audit log
- PII/secret detection ก่อน embedding
- citation-required policy
- deleted document purge from FAISS/index/cache
- evaluation dataset ภาษาไทยและอังกฤษ
- prompt injection policy สำหรับ documents
- retention policy ของ search history และ memory

> [!warning]
> FAISS เป็น vector index library ไม่ใช่ access-control system  
> ต้อง filter authorization ก่อน/พร้อม retrieval หรือแยก index ตาม workspace/tenant เพื่อไม่ให้ข้อมูลข้าม workspace หลุด

## ตารางสรุปการพัฒนา

| ลำดับ | ส่วนที่ควรพัฒนา | ความสำคัญ | สิ่งที่ควรทำ | ผลลัพธ์ที่ได้ |
|---:|---|---|---|---|
| 1 | Repair levels | สูงมาก | แบ่ง Level 0–3 และห้าม semantic/architecture repair auto-apply | ลดโอกาส fixer เปลี่ยน logic workflow |
| 2 | GitHub Actions semantic validation | สูงมาก | เพิ่ม `actionlint` หลัง YAML parser ทุกครั้ง | ตรวจ keys, jobs, reusable workflow contract |
| 3 | Block scalar preservation | สูงมาก | บังคับ output-equivalence/regression test ก่อน apply | ลดความเสี่ยง shell/JS/Python behavior เปลี่ยน |
| 4 | Duplicate keys | สูงมาก | ใช้ strict YAML parser ที่ reject duplicate mapping keys | กัน permission/event ถูก override แบบเงียบ |
| 5 | Action supply-chain policy | สูงมาก | Block `@main`/`@latest`, pin third-party actions ด้วย SHA | ลด third-party action takeover risk |
| 6 | Permissions policy | สูง | ตรวจ explicit `permissions:` และ least privilege | ลดสิทธิ์ `GITHUB_TOKEN` เกินจำเป็น |
| 7 | Untrusted context scan | สูง | ตรวจ GitHub context ใน `run:` และ shell injection patterns | ลด PR/issue-controlled command injection |
| 8 | Watcher Git awareness | สูง | ตรวจ merge/rebase/conflict/dirty tree/file stability | ลดการซ่อมทับไฟล์ระหว่าง Git operations |
| 9 | Rollback manifest | กลาง-สูง | เก็บ manifest ต่อ run + hash-checked rollback | กู้หลายไฟล์ได้อย่างปลอดภัย |
| 10 | File-type classification | กลาง-สูง | แยก GitHub workflow, Compose, K8s, generic YAML | ไม่ใช้ repair policy ผิดชนิดไฟล์ |
| 11 | Audit/report retention | กลาง | JSONL reports, run IDs, redaction, retention policy | Traceability และ incident review |
| 12 | CI fixture suite | กลาง | Fixtures: valid, ambiguous, duplicates, secrets, symlink, encoding | ป้องกัน regression ของ fixer |
| 13 | RAG deployment separation | กลาง | แยก MOC/repo/service และ tenant/security policies | ลด blast radius และความซับซ้อน |
| 14 | Obsidian metadata governance | กลาง | บังคับ frontmatter schema, `status`, `classification`, `sync`, `[[agents]].searchable` | Search/Agent index มี policy ที่คาดเดาได้ |
| 15 | Documentation hygiene | ต่ำ-กลาง | ใช้ callout syntax ที่ถูก, canonical file names, link checker | MOC อ่านง่ายและ wikilinks ไม่พัง |

## ตาราง Roadmap ที่แนะนำ

| Phase | เป้าหมาย | Deliverables | Exit criteria |
|---|---|---|---|
| Phase 0: Safety baseline | ไม่ให้ tool ทำอันตราย | Read-only validator, strict parser, dry-run report, allowlisted paths | ไม่มี auto-write, ทุกไฟล์มี report |
| Phase 1: Workflow validation | ตรวจ GitHub Actions ได้จริง | `actionlint`, duplicate-key detection, action pinning, permissions checks | Fixtures และ workflow CI ผ่าน |
| Phase 2: Safe repair | แก้เฉพาะกรณี deterministic | Chat-wrapper extraction, backup, atomic write, rollback manifest | Idempotency + rollback tests ผ่าน |
| Phase 3: Reviewable semantic repair | สร้าง proposal สำหรับ case เสี่ยง | Dedent diagnosis, patch diff, regression framework | ไม่มี semantic repair ที่ auto-apply |
| Phase 4: Watch mode | ช่วย developer แบบไม่รบกวน | Debounce, Git-aware guards, notifications, attempt limits | ไม่เกิด loop และไม่แตะ conflict state |
| Phase 5: Governance | ใช้งานทีม/production ได้ | PR bot proposal, CODEOWNERS, branch protection, environment approvals | ไม่มี bypass production controls |
| Phase 6: RAG separate platform | แยก search system อย่างปลอดภัย | Workspace ACL, index lifecycle, citations, evaluation, monitoring | No cross-tenant retrieval และมี eval baseline |

## ข้อเสนอ “Definition of Done”

ก่อนเรียกว่า YAML Auto-Fixer พร้อมใช้ในทีม ให้ผ่าน checklist นี้:

```text
[ ] Default คือ dry-run ไม่ใช่ auto-write
[ ] Validate YAML แบบ strict และ block duplicate keys
[ ] actionlint ผ่านก่อน apply ทุกครั้ง
[ ] มี secret scan ทั้ง input และ candidate output
[ ] Third-party Actions ถูก pin ด้วย immutable SHA ตาม policy
[ ] มี explicit permissions policy
[ ] มี fixture tests สำหรับ root cause ทุกชนิด
[ ] รันซ้ำแล้ว idempotent
[ ] มี backup + rollback manifest + hash checking
[ ] Watcher ไม่ทำงานระหว่าง merge/rebase/conflict
[ ] Semantic/fragment repairs ต้อง human review
[ ] Auto-fixer ไม่ commit, push, merge หรือ deploy เอง
[ ] PR CI ตรวจ `.github/workflows/**/*.yml` และ `.yaml`
[ ] Production deploy ใช้ GitHub Environment approval แยกจาก fixer
[ ] Audit report ไม่มี secret หรือ raw sensitive payload
```

สรุป: สิ่งที่มีตอนนี้เป็น foundation ที่ดีมาก แต่ควรเปลี่ยน mindset จาก **“YAML auto-fixer”** เป็น **“Workflow repair assistant with policy gates”** เพราะไฟล์ GitHub Actions มีทั้ง code, credentials boundary, deployment logic และ permission model อยู่ในไฟล์เดียวกัน การทำให้ parse ผ่านจึงไม่เพียงพอ—ต้อง validate semantics, security และ behavior ด้วย.[1][2][4]

การอ้างอิง:
[1] rhysd/actionlint: :octocat: Static checker for GitHub Actions workflow ... https://github.com/rhysd/actionlint
[2] Workflow Templates https://docs.github.com/en/actions/reference/workflows-and-actions/reusing-workflow-configurations
[3] Reuse workflows https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows
[4] docs.github.com › en › actionsWorkflow syntax for GitHub Actions https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax?text=For%20more%20information,%20see%20%22GitHub's%20products.%22
[5] Reuse workflows - GitHub Enterprise Cloud Docs https://docs.github.com/en/enterprise-cloud@latest/actions/how-tos/reuse-automations/reuse-workflows
[6] Reusing workflow configurations https://docs.github.com/en/enterprise-server@3.19/actions/reference/workflows-and-actions/reusing-workflow-configurations
[7] Calling A Reusable Workflow https://docs.github.com/en/enterprise-server@3.18/actions/how-tos/reuse-automations/reuse-workflows
[8] Reuse workflows - GitHub Enterprise Server 3.21 Docs https://docs.github.com/en/enterprise-server@3.21/actions/how-tos/reuse-automations/reuse-workflows
[9] Supported Keywords For Jobs... https://docs.github.com/en/enterprise-server@3.18/actions/reference/workflows-and-actions/reusing-workflow-configurations
[10] Reusing workflow configurations - GitHub Enterprise Server 3.21 ... https://docs.github.com/en/enterprise-server@3.21/actions/reference/workflows-and-actions/reusing-workflow-configurations
[11] GitHub Actions 的工作流语法 - GitHub 文档 https://docs.github.com/zh/actions/reference/workflows-and-actions/workflow-syntax
[12] GitHub Actions で再利用可能なワークフローを作成 https://resources.github.com/ja/learn/pathways/automation/intermediate/create-reusable-workflows-in-github-actions/
[13] github.blog › developer-skills › githubHow to start using reusable workflows with GitHub Actions https://github.blog/developer-skills/github/using-reusable-workflows-github-actions/
[14] Reusable workflows | Dev Cheatsheets - Michael Currin https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/ci-cd/github-actions/reusable-workflows.html

สรุปทั้งหมดใหม่แล้วมาดูผลกัน

ได้ครับ—ด้านล่างคือ **สรุปทั้งหมดฉบับใช้งานจริง** สำหรับ “YAML Auto-Fixer Skill” โดยเน้นเป้าหมาย, ความสามารถที่มี/ไม่มี, โครงสร้าง Obsidian, plugin ที่ช่วย, CI/contract tests และตารางเช็คผล เพื่อให้ทุกครั้งที่พัฒนาแล้วรู้ทันทีว่า “สกิลนี้เอาไปใช้อะไรได้จริง”

> [!important] ข้อสรุปปัจจุบัน
> ตอนนี้ระบบอยู่ระดับ **Design / Specification พร้อมเริ่ม implement**  
> มี architecture, policy, file structure, test plan และ CI design ครบพอสมควร  
> แต่ยังไม่มีหลักฐานว่า tool รันได้จริง จึงยังไม่ควรเรียกว่า `verified` หรือใช้ซ่อม GitHub Actions workflows ใน production

GitHub reusable workflows ใช้ `on.workflow_call` เพื่อประกาศ inputs, secrets และ outputs; `actionlint` ตรวจ contract ของ local reusable workflows ได้ แต่ external reusable workflows ต้องมี manifest/custom checker เพิ่มเติม.[1][2][3]

# 🗺️ YAML Auto-Fixer — Master Summary

```md
---
id: yaml-auto-fixer-master-summary
title: YAML Auto-Fixer — Master Summary
aliases:
  - YAML Auto-Fixer Status
  - YAML Fixer Capability Summary
  - GitHub Workflow Repair Skill
type: capability-summary
status: design
capability_level: design
verification_level: not-verified
classification: internal
workspace: engineering
project: yaml-auto-fixer
skill: yaml-auto-fixer
version: 0.1.0
owner: engineering
last_updated_at: 2026-09-30
last_verified_at:
sync: true
[[agents]]:
  searchable: true
  citation_required: true
tags:
  - yaml
  - github-actions
  - automation
  - python
  - ci-cd
  - workflow-contracts
---

# YAML Auto-Fixer — Master Summary

> [!summary]
> สกิลสำหรับตรวจหา วิเคราะห์ และสร้างข้อเสนอ patch สำหรับ GitHub Actions YAML ที่ผิดพลาด
> โดยออกแบบให้ปลอดภัย: default เป็น dry-run, มี validation หลายชั้น, ไม่ auto-commit, ไม่ auto-push, ไม่ auto-deploy

> [!warning]
> Current capability level: **Design only**
>
> มี specification และ test plan แต่ยังไม่มี implementation/test execution evidence
> ห้ามใช้กับ production workflow จนกว่าจะผ่าน criteria ใน [[#Definition of Done]]

## Purpose

เป้าหมายของสกิลนี้คือ:

1. ตรวจ GitHub Actions workflow ที่ YAML เสียหรือมี reusable workflow contract ผิด
2. จำแนก root cause ที่พบบ่อย
3. สร้าง repair proposal ที่ review ได้
4. ตรวจ YAML syntax, GitHub Actions semantics, security policy และ contract compatibility
5. ให้ developer แก้/approve patch ผ่าน Git + Pull Request
6. ป้องกัน workflow ที่เสียไม่ให้ merge หรือ deploy production

## Non-goals

สกิลนี้ไม่ทำสิ่งต่อไปนี้:

- ไม่ auto-commit
- ไม่ auto-push
- ไม่ auto-merge Pull Request
- ไม่ approve GitHub Environment
- ไม่ deploy Vercel
- ไม่ run Prisma migration
- ไม่แก้ production workflow แบบ silent
- ไม่เดา required secret, permissions หรือ architecture ของ workflow fragment
- ไม่เก็บ secret, token หรือ `DATABASE_URL` ใน Obsidian Vault

## Current State

| Area | Status | Ready to use | Evidence |
|---|---|---:|---|
| Architecture | ✅ Designed | Yes, as a design reference | This summary + linked notes |
| Root-cause taxonomy | ✅ Designed | Yes, for manual diagnosis | 3 root causes defined |
| Repair safety policy | ✅ Designed | Yes, for code review | Dry-run + review rules |
| Obsidian documentation structure | ✅ Designed | Yes | MOC + Capability Summary pattern |
| Plugin recommendations | ✅ Selected | Yes, after manual install/review | Linter, YAML Editor, Frontmatter Operator, Obsidian Git |
| Python validator design | 🟡 Spec ready | No runtime evidence | Code draft exists |
| JSON contract manifest design | 🟡 Spec ready | No runtime evidence | Contract schema defined |
| Unit-test plan | 🟡 Spec ready | No test execution | pytest fixture plan |
| actionlint CI design | 🟡 Spec ready | No CI run evidence | Workflow design |
| Chat-wrapped YAML repair | 🔴 Not implemented | No | Needs code + fixtures |
| Block scalar dedent repair | 🔴 Not implemented | No | Semantic-risk repair |
| Fragment-to-workflow conversion | 🔴 Manual only | No automatic use | Requires reviewed mapping |
| Watch mode | 🔴 Not implemented | No | Needs Git-aware loop guards |
| Cross-repo contract check | 🔴 Not implemented | No | Needs manifest/custom checker |

## What the Skill Will Do

| Capability | Intended level | Conditions before use |
|---|---|---|
| Validate workflow YAML syntax | Read-only | Strict parser + duplicate key detection |
| Validate GitHub Actions syntax | Read-only | `actionlint` installed in CI |
| Validate local reusable workflow contract | Read-only | Caller/callee in same checkout |
| Validate cross-repo workflow contract | Read-only | Versioned manifest or pinned checkout |
| Detect chat-wrapped YAML | Safe mechanical repair | Exactly one `yaml`/`yml` fenced block |
| Extract chat-wrapped YAML | Safe mechanical repair | Backup + actionlint + explicit `--apply` |
| Detect block scalar dedent | Proposal only | Parser + structural diagnosis |
| Fix block scalar dedent | Review only | Output equivalence test required |
| Detect workflow step fragment | Proposal only | Explicit classification |
| Convert fragment to reusable workflow | Manual architecture work | Mapping + PR review |
| Watch workflow directory | Local support | Debounce + stable hash + Git-state guard |
| Create JSON repair report | Read-only | Report must redact sensitive data |
| Rollback a prior repair | Controlled write | Manifest + current hash check |

## Root Causes

### 1. Block scalar dedent

```yaml
- name: Post comment
  run: |
    const body = `
      ## Report
const marker = "broken";
      More text
    `;
```

**Risk:** YAML parse may fail; naïve indent correction can alter shell/JavaScript/Python output.

**Policy:** Generate proposal only; require regression/equivalence test and human review.

### 2. Workflow step fragment

```yaml
- name: Post comment
  uses: actions/github-script@v7
```

**Risk:** This is not a complete workflow. Automatically wrapping it requires guessing triggers, runner, permissions, inputs and secrets.

**Policy:** Do not auto-wrap. Require a reviewed mapping file and Pull Request.

### 3. Chat-wrapped YAML

```text
คำอธิบายจาก chat

```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
```

ข้อความปิดท้าย
```

**Risk:** Multiple fenced blocks may be ambiguous; global unescaping can change regex/shell/JSON meaning.

**Policy:** Extract only when exactly one YAML fence exists; preserve original backup; validate candidate with strict parser and `actionlint`.

## Safety Model

```text
Input workflow
  → Path / encoding / size checks
  → Strict YAML parser
  → Root-cause classification
  → Repair proposal
  → Candidate secret scan
  → actionlint
  → Contract validation
  → Snapshot/regression tests
  → Human review
  → Explicit apply
  → Backup + atomic write
  → Revalidate
  → JSON audit report
```

### Repair Levels

| Level | Repair type | Auto-apply allowed | Review |
|---:|---|---:|---|
| 0 | Validate only | No | Not required |
| 1 | Deterministic mechanical repair | Only with `--apply` | Recommended |
| 2 | Semantic-risk repair | No | Required |
| 3 | Workflow architecture change | No | Required |

## Obsidian Structure

```text
10-projects/
└── yaml-auto-fixer/
    ├── 00 - Capability Summary.md
    ├── YAML Auto-Fixer MOC.md
    ├── Root Causes.md
    ├── Auto-Fixer Script.md
    ├── Watch Mode.md
    ├── GitHub Actions Validation.md
    ├── Testing Strategy.md
    ├── Changelog.md
    └── Roadmap.md
```

## Recommended Obsidian Plugins

| Plugin | Purpose | Recommended setting |
|---|---|---|
| Linter | Format notes and YAML frontmatter | Lint on save; consistent key order |
| YAML Editor | Surface frontmatter YAML errors | Enable for authoring notes |
| Frontmatter Operator | Bulk metadata operations with preview | Use preview before apply |
| Obsidian Git | Diff, commit and push changes | Auto-push off; review diff first |
| OKF Enforcer | Enforce required note metadata | Optional after schema stabilizes |
| Terminal | Run local test commands | Desktop/dev Vault only |

> [!warning]
> Plugins improve authoring only. They do not replace CI, `actionlint`, secret scanning, GitHub branch protection or Environment approval.

## Workflow Layout

```text
.github/
└── workflows/
    ├── ci.yml
    ├── deploy-staging.yml
    ├── deploy-production.yml
    ├── reusable-validate.yml
    ├── reusable-deploy.yml
    └── contract-tests.yml
```

### CI responsibilities

```text
Pull Request
  → actionlint
  → Python unit tests
  → contract manifest validation
  → caller fixture validation
  → secret scanning
  → Vault/frontmatter validation
```

### Deployment responsibilities

```text
develop
  → staging migration
  → Obsidian sync
  → staging deploy
  → health check

main
  → CI passes
  → GitHub Environment approval
  → Prisma migrate deploy
  → production sync
  → Vercel deploy
  → health/index verification
```

## Reusable Workflow Contract

```yaml
on:
  workflow_call:
    inputs:
      environment_name:
        required: true
        type: string
      run_obsidian_sync:
        required: false
        type: boolean
        default: false
    secrets:
      DATABASE_URL:
        required: true
      SYNC_TOKEN:
        required: false
    outputs:
      migration_status:
        value: ${{ jobs.migrate.outputs.migration_status }}
```

Caller:

```yaml
jobs:
  deploy:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment_name: production
      run_[[Obsidian Sync|obsidian]]_sync: true
    secrets:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
      SYNC_TOKEN: ${{ secrets.SYNC_TOKEN }}
```

## Contract Testing

```text
Workflow source
  → export contract JSON
  → compare manifest
  → validate caller fixtures
  → actionlint
  → pytest
  → CI report/artifact
```

### Required fixtures

```text
tests/fixtures/callers/
  ├── valid-caller.yml
  ├── invalid-boolean-as-string.yml
  ├── invalid-number-as-string.yml
  ├── missing-required-secret.yml
  ├── unknown-input.yml
  ├── unknown-secret.yml
  └── invalid-output-reference.yml
```

### Required test commands

```bash
python tools/validate_contract.py \
  --workflow .github/workflows/reusable-deploy.yml \
  --contract contracts/reusable-deploy.contract.json

python tools/validate_caller.py \
  --caller tests/fixtures/callers/valid-caller.yml \
  --callee .github/workflows/reusable-deploy.yml \
  --uses ./.github/workflows/reusable-deploy.yml

pytest -q
actionlint -color
```

## Definition of Done

### Phase 1 — Read-only validation

- [ ] Strict YAML parser implemented
- [ ] Duplicate keys rejected
- [ ] Path/encoding/size policy implemented
- [ ] `actionlint` installed and running in CI
- [ ] JSON report generated
- [ ] At least 10 fixtures exist
- [ ] `pytest` passes in CI
- [ ] No workflow files are modified
- [ ] No secrets appear in logs/reports

### Phase 2 — Safe chat-wrapper repair

- [ ] Exactly-one-YAML-fence detection
- [ ] Dry-run diff output
- [ ] Timestamped backup
- [ ] Atomic write
- [ ] Post-write strict validation
- [ ] Post-write actionlint
- [ ] Rollback manifest
- [ ] Idempotency test
- [ ] Human-triggered `--apply` only

### Phase 3 — Semantic-risk proposal engine

- [ ] Block scalar diagnosis
- [ ] Repair proposal only
- [ ] Output-equivalence fixtures
- [ ] No automatic dedent apply
- [ ] PR review required

### Phase 4 — Watch mode

- [ ] Debounce
- [ ] Stable content-hash check
- [ ] Ignore temp files
- [ ] Git merge/rebase/conflict guard
- [ ] Loop guard
- [ ] Attempt limit per file
- [ ] JSONL audit log
- [ ] Notification without automatic write by default

## Capability Delta Template

Use this section every time work is completed.

```md
## Capability Delta — YYYY-MM-DD

### Before

- 

### Added

- 

### Verified

| Command | Result | Evidence |
|---|---|---|
| `pytest -q` | | |
| `actionlint -color` | | |
| `python ...` | | |

### Now possible

- 

### Still not possible

- 

### Risks and limits

- 

### Next action

- 
```

## Changelog Rule

Every release entry must include:

```text
- What changed technically
- What capability became available
- What proof exists
- What still cannot be used
- Whether production scope changed
```

## Current Next Action

> [!todo]
> Build **Phase 1: Read-only validator** before writing any auto-repair logic.
>
> First deliverable:
>
> ```bash
> python fix_yaml.py --validate-only .github/workflows/
> ```
>
> Expected output:
>
> ```text
> - Valid YAML workflows
> - Duplicate-key errors
> - Invalid GitHub Actions syntax from actionlint
> - JSON report
> - Exit code suitable for CI
> ```

## Related

- [[YAML Auto-Fixer MOC]]
- [[Root Causes]]
- [[Auto-Fixer Script]]
- [[Watch Mode]]
- [[GitHub Actions Validation]]
- [[Testing Strategy]]
- [[Roadmap]]
- [[Changelog]]
```

# ผลการประเมินปัจจุบัน

## สิ่งที่ “พร้อมใช้” แล้ว

| หมวด | สถานะ | ใช้ทำอะไรได้ตอนนี้ |
|---|---|---|
| เป้าหมายของสกิล | ✅ ชัดเจน | ใช้ตัดสินว่า feature ใดอยู่ใน scope |
| Root causes 3 กลุ่ม | ✅ ชัดเจน | ใช้วิเคราะห์ workflow ที่เสียแบบ manual |
| Safety model | ✅ ชัดเจน | ใช้ review code และป้องกัน auto-fix เสี่ยง |
| Repair levels 0–3 | ✅ ชัดเจน | ใช้กำหนดว่ากรณีใดต้อง human review |
| [[Obsidian Sync|Obsidian]] knowledge structure | ✅ พร้อมใช้ | สร้าง MOC, Capability Summary, Changelog ได้ทันที |
| Plugin recommendations | ✅ พร้อมใช้ | ติดตั้ง Linter/YAML Editor/Frontmatter Operator/Git ได้ |
| CI architecture | ✅ พร้อมออกแบบ | แยก CI, staging, production workflow ได้ |
| Reusable workflow contract model | ✅ พร้อมใช้ | ออกแบบ `workflow_call.inputs/secrets/outputs` ได้ |
| Unit-test/fixture strategy | ✅ พร้อมเริ่ม | สร้าง tests และ fixtures ตามแผนได้ |
| GitHub Environment production gate | ✅ พร้อมใช้ | ใช้ approval ก่อน Prisma/Vercel deploy ได้ |

## สิ่งที่ “ยังไม่ควรอ้างว่าใช้ได้”

| หมวด | สถานะจริง | เหตุผล |
|---|---|---|
| `fix_yaml.py` | ❌ ยังไม่มี implementation ที่พิสูจน์แล้ว | มี spec/code draft แต่ไม่มี execution evidence |
| Chat-wrapped YAML extraction | ❌ ยังไม่ verified | ต้องมี fixture, idempotency และ actionlint evidence |
| Block scalar repair | ❌ ยังไม่พร้อม | มีความเสี่ยงเปลี่ยน runtime behavior |
| Fragment → reusable workflow | ❌ ไม่ใช่ auto-fix | ต้องมี human decision เรื่อง permissions/secrets/triggers |
| Watch mode | ❌ ยังไม่พร้อม | ต้องจัดการ Git/editor race condition |
| Contract JSON validation | 🟡 มีตัวอย่าง code | ต้องวางไฟล์, install dependencies, รัน tests |
| Cross-repo contract validation | 🟡 มี design | ต้องทำ manifest/custom checker จริง |
| Production usage | ❌ ยังไม่พร้อม | ยังไม่มี integration/rollback/monitoring evidence |

## ตารางเกณฑ์ตัดสินผล

| ระดับ | ต้องมีอะไร | YAML Auto-Fixer ตอนนี้ |
|---|---|---|
| Idea | มีไอเดีย | ผ่านแล้ว |
| Design | มี spec, architecture, scope, guardrails | ผ่านแล้ว |
| Prototype | มี code รัน local ได้ | ยังไม่ผ่าน |
| Verified | มี unit tests + CI evidence | ยังไม่ผ่าน |
| Production | มี approval, monitoring, rollback, ownership | ยังไม่ผ่าน |

## ข้อสรุปสุดท้าย

ตอนนี้สกิลนี้ทำหน้าที่ได้ดีในฐานะ:

```text
Workflow Repair Design Guide
+ Security Policy
+ Testing Blueprint
+ CI Architecture Reference
```

แต่ยังทำหน้าที่นี้ไม่ได้:

```text
Executable YAML Auto-Fixer
Production-safe Workflow Repair Tool
Automated GitHub Actions Workflow Validator
```

ลำดับที่ควรทำต่อไม่ใช่เพิ่ม plugin หรือเพิ่ม feature ใหม่ แต่คือ **implement Phase 1 ที่เล็กที่สุด**:

```text
strict YAML validation
+ duplicate key detection
+ actionlint integration
+ JSON report
+ unit test fixtures
+ CI run
```

เมื่อ 6 อย่างนี้รันผ่านจริง ให้ update `00 - Capability Summary.md` จาก:

```yaml
status: design
capability_level: design
verification_level: not-verified
```

เป็น:

```yaml
status: prototype
capability_level: prototype
verification_level: local-tested
```

และเมื่อ `pytest`, `actionlint` และ GitHub Actions CI ผ่านพร้อมหลักฐาน จึงค่อยยกระดับเป็น:

```yaml
status: active
capability_level: verified
verification_level: ci-passed
```

นี่คือจุดที่สกิลเริ่ม “นำไปใช้ได้จริง” ไม่ใช่แค่มีเอกสารหรือ code draft.

การอ้างอิง:
[1] Reuse workflows https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows
[2] rhysd/actionlint: :octocat: Static checker for GitHub Actions workflow ... https://github.com/rhysd/actionlint
[3] actionlint/docs/checks.md at main https://github.com/rhysd/actionlint/blob/main/docs/checks.md

ขอตัวอย่าง YAML frontmatter สำหรับ Sources และ Findings หน่อย

นี่คือตัวอย่าง YAML frontmatter สำหรับ **Sources** และ **Findings** ที่ออกแบบให้ใช้กับ Deep Research Dashboard ใน Obsidian ได้ทันที โดยใช้ Properties ของ Obsidian เพื่อให้ filter, sort และ query ได้ 

## Source Note

```md
---
type: source
title: "Human-in-the-loop - OpenAI Agents SDK"
source_type: documentation
url: "https://openai.github.io/openai-agents-python/human_in_the_loop/"
doi: ""
authors:
  - "OpenAI"
publisher: "OpenAI"
published: 2026-01-01
accessed: 2026-10-08
read: 2026-10-08
status: read
credibility: official
language: en
project: "[[AI Agent Handover UX]]"
topics:
  - ai-agents
  - human-in-the-loop
  - tool-approval
tags:
  - source
  - documentation
  - agents
rating: 5
key_takeaway: "Use RunState to pause and resume sensitive tool calls after human approval."
related:
  - "[[Agent Handover]]"
  - "[[Human-in-the-loop]]"
---
```

[1218]

## Finding Note

```md
---
type: finding
title: "Approval queue should show action and impact together"
status: validated
confidence: high
importance: high
project: "[[AI Agent Handover UX]]"
topic: human-in-the-loop
sources:
  - "[[Human-in-the-loop - OpenAI Agents SDK]]"
evidence:
  - "Sensitive tool calls pause execution until a person approves or rejects them."
  - "The reviewer needs the tool name and arguments to make an informed decision."
insight: "An approval UI should make the pending action, its scope, and its impact immediately visible."
recommendation: "Design an approval card with action summary, affected entity, risk level, and approve/reject controls."
decision: "Use an approval queue in the dashboard."
created: 2026-10-08
updated: 2026-10-08
tags:
  - finding
  - ux
  - approval
related:
  - "[[Agent Handover]]"
---
```



## โครงสร้างที่แนะนำ

| ประเภท | ไฟล์ | บทบาท |
|---|---|---|
| **Source** | `Sources/Human-in-the-loop - OpenAI Agents SDK.md` | เก็บแหล่งอ้างอิง, URL, ผู้เขียน, วันที่อ่าน และ credibility |
| **Finding** | `Findings/Approval queue should show action and impact.md` | เก็บข้อค้นพบ, evidence, recommendation และ decision |
| **Project** | `Projects/AI Agent Handover UX.md` | เชื่อมทุก source และ finding เข้าด้วยกัน |

[1210][1218]

## หลักการออกแบบ

- ใช้ `type` เพื่อแยก `source` กับ `finding` ชัดเจน   
- ใช้ `project` เป็น wikilink เพื่อเชื่อมกลับไปยังโปรเจกต์   
- ใช้ `sources` ใน Finding เพื่ออ้างกลับ Source ที่ใช้ [1210]  
- ใช้ `credibility` และ `rating` ใน Source เพื่อช่วย filter คุณภาพแหล่งข้อมูล [1218]  
- ใช้ `status` และ `confidence` ใน Finding เพื่อแยก “ข้อสันนิษฐาน” ออกจาก “ข้อสรุปที่ validated” [1210]  
- ใช้ `recommendation` และ `decision` ใน Finding เพื่อให้ dashboard แปลง research เป็น action ได้ [1210][1211]  

## ข้อควรระวัง

- ใส่ wikilink ใน YAML ด้วยเครื่องหมายคำพูด เช่น `project: "[[AI Agent Handover UX]]"`   
- หลีกเลี่ยงชื่อ property ซ้ำในไฟล์เดียว   
- อย่าใส่ข้อความยาวมากใน frontmatter; ให้เก็บ insight หลักไว้ใน frontmatter และเก็บ evidence ฉบับเต็มไว้ใน body   
- ใช้ date format `YYYY-MM-DD` เพื่อให้ sort และ filter ได้ถูกต้อง   
- หากใช้กับ Bases หรือ Dataview ให้รักษา schema ให้ consistent ทุกไฟล์ [1220]  

## ตัวอย่าง Dashboard Query

```dataview
TABLE
  status AS "Status",
  confidence AS "Confidence",
  importance AS "Importance",
  project AS "Project"
FROM "Findings"
WHERE type = "finding"
SORT importance DESC, updated DESC
```



แนวทางนี้ช่วยให้ dashboard แสดง “แหล่งข้อมูลที่เชื่อถือ” และ “ข้อค้นพบที่พร้อมลงมือทำ” ได้ในมุมมองเดียว โดยไม่ต้อง copy ข้อมูลซ้ำระหว่างโน้ต [1210][1211]

การอ้างอิง:
[1] BibLib - Obsidian Community Plugins https://community.obsidian.md/plugins/biblib
[2] Zotero Research Assistant - Obsidian Plugin https://community.obsidian.md/plugins/zotero-redisearch-rag
[3] github.com · hambrecht · zotero-obsidian-yaml-templateGitHub - hambrecht/zotero-obsidian-yaml-template: Updated ... https://github.com/hambrecht/zotero-obsidian-yaml-template
[4] Configure frontmatter properties | ZotLit https://zotlit.aidenlx.site/docs/how-to/configure-frontmatter-properties
[5] GitHub - callumalpass/obsidian-biblib: Obsidian-based reference and literature note manager. https://github.com/callumalpass/obsidian-biblib
[6] How It Works https://forum.obsidian.md/t/zotero-integration-import-templates/36310/105
[7] obsidian-literature-note/templates/literature-note.md at main · nocona71/obsidian-literature-note https://github.com/nocona71/obsidian-literature-note/blob/main/templates/literature-note.md
[8] Customizing Templates – ZotLit https://zotlit.aidenlx.top/getting-started/basic-usage/template-config.en-US


🛡️ Phase 0 — Safety Baseline
 
เป้าหมายหลัก: ไม่ให้เครื่องมือทำอันตราย — สร้างความปลอดภัยขั้นพื้นฐานก่อนทุกอย่าง
 
 
 
📌 หลักการสำคัญ
 
"อ่านได้อย่างเดียว — ไม่แก้ไข ไม่เขียน ไม่ลบ จนกว่าจะมั่นใจว่าปลอดภัย 100%"
 
Phase 0 คือรากฐานที่สำคัญที่สุด ก่อนที่จะพัฒนาความสามารถอื่นๆ เราต้องมั่นใจก่อนว่าเครื่องมือ ไม่สามารถทำอันตรายต่อระบบหรือข้อมูล ได้เลย
 
 
 
✅ ส่วนประกอบทั้ง 4 อย่าง
 
1. 🔍 ตัวตรวจสอบแบบอ่านอย่างเดียว (Read-only Validator)
 
- ทำหน้าที่: ตรวจสอบไฟล์และรายงานปัญหาเท่านั้น
- ห้าม: แก้ไข เขียน หรือลบไฟล์ใดๆ ทั้งสิ้น
- ปลอดภัยแม้โค้ดมีข้อผิดพลาด เพราะไม่มีสิทธิ์เปลี่ยนแปลงอะไรในระบบ
 
2. 🧩 ตัวแยกโครงสร้างที่เข้มงวด (Strict Parser)
 
- ตรวจสอบความถูกต้องของรูปแบบไฟล์ (เช่น YAML, JSON) อย่างเคร่งครัด
- ปฏิเสธไฟล์ที่มีรูปแบบไม่ถูกต้องทันที ไม่พยายามแก้ไขเองอัตโนมัติ
- ป้องกันการตีความผิดพลาดจากไฟล์ที่ไม่สมบูรณ์หรือมีรูปแบบผิด
 
3. 📄 รายงานการตรวจสอบแบบจำลอง (Dry-run Report)
 
- จำลองการทำงานเหมือนจะแก้ไข แต่ เพียงแค่แสดงผลลัพธ์ที่คาดว่าจะเกิดขึ้น เท่านั้น
- แสดง: จะเปลี่ยนอะไร → จากอะไร → เป็นอะไร → เหตุผล
- ผู้ใช้ตรวจสอบและยืนยันก่อนดำเนินการจริง
 
ตัวอย่างรายงาน Dry-run:
 
plaintext
  
📝 Dry-run — ไม่มีการเปลี่ยนแปลงจริง

ไฟล์: .github/workflows/main.yml
บรรทัด: 15
ปัญหา: ไม่ได้ระบุเวอร์ชันของ action
จะแก้: uses: actions/checkout@v4
→ จะเป็น: uses: actions/checkout@11bd71901bbe5b1630ceea73d275971367909a67

✅ ตรวจสอบแล้วกดยืนยันเพื่อใช้การเปลี่ยนแปลงนี้
 
 
4. 🚧 รายการเส้นทางที่อนุญาตเท่านั้น (Allowlisted Paths)
 
- กำหนดพื้นที่ที่เครื่องมือสามารถเข้าถึงได้อย่างชัดเจน
- ตัวอย่าง: อนุญาตเฉพาะโฟลเดอร์  .github/workflows/  เท่านั้น
- ปฏิเสธการเข้าถึงไฟล์นอกพื้นที่ที่กำหนดทันที เช่น ไฟล์ระบบ, ข้อมูลส่วนตัว, ไฟล์คีย์ลับ
 
yaml
  
# ตัวอย่างรายการเส้นทางที่อนุญาต
allowlist:
  - ".github/workflows/*.yml"
  - ".github/workflows/*.yaml"

blocklist:
  - "**/*.env"
  - "**/id_rsa*"
  - "/etc/**"
  - "~/.ssh/**"
 
 
 
 
⚠️ สรุปสถานะ Phase 0
 
ด้าน สถานะ 
อ่านข้อมูล ✅ ทำได้ 
เขียน/แก้ไขไฟล์ ❌ ยังไม่อนุญาต 
เข้าถึงไฟล์นอกรายการ ❌ ปฏิเสธทันที 
การเปลี่ยนแปลง 📝 แค่จำลองให้ดู 
 
เมื่อ Phase 0 เสร็จสมบูรณ์ เราจะมั่นใจได้ว่า "อย่างแย่ที่สุดที่เครื่องมือทำได้ คือ แค่แจ้งเตือน" — ไม่มีความเสี่ยงต่อระบบเลยครับ ✅
 
ต้องการดู Phase ถัดไปไหมครับ 😊

✅ Phase 1 — Workflow Validation
 
เป้าหมายหลัก: ตรวจสอบว่า GitHub Actions ทำงานได้อย่างถูกต้องและปลอดภัย — ก่อนที่จะอนุมัติหรือรวมโค้ดเข้ากับโปรเจกต์
 
 
 
📌 หลักการสำคัญ
 
"ตรวจจับปัญหาตั้งแต่เนิ่นๆ ทันทีที่มีการแก้ไขไฟล์ Workflow — ก่อนที่ปัญหาจะถูกรวมเข้าสู่สาขาหลัก"
 
Phase 1 เป็นขั้นตอนถัดไปหลังจากที่เรามี ความปลอดภัยพื้นฐานจาก Phase 0 แล้ว เราจะเพิ่มความสามารถในการตรวจสอบคุณภาพและความปลอดภัยของไฟล์ Workflow จริง
 
 
 
✅ ส่วนประกอบทั้ง 4 อย่าง
 
1. 📏 actionlint — ตรวจสอบไวยากรณ์
 
- หน้าที่: ตรวจสอบว่าไฟล์ YAML Workflow เขียนถูกต้องตามหลักไวยากรณ์ของ GitHub Actions หรือไม่
- ตรวจพบ:
- ชื่อฟิลด์ผิดพิมพ์
- ค่าที่ไม่ถูกต้อง
- โครงสร้างไฟล์ผิดพลาด
- การอ้างอิงตัวแปรที่ไม่มีอยู่จริง
 
yaml
  
# ❌ ผิด — ชื่อฟิลด์ไม่ถูกต้อง
jon:
  name: Build

# ✅ ถูก
jobs:
  build:
    runs-on: ubuntu-latest
 
 
2. 🔑 ตรวจพบคีย์ที่ซ้ำซ้อน (Duplicate-key Detection)
 
- หน้าที่: ค้นหาคีย์ที่ระบุซ้ำกันในไฟล์ YAML ซึ่งอาจทำให้เกิดพฤติกรรมที่ไม่คาดคิด
- ปัญหา: YAML จะใช้ค่าสุดท้ายและเงียบไม่แจ้งเตือน
- ตัวอย่าง:
 
yaml
  
# ❌ อันตราย — ภาษา YAML จะใช้ค่าสุดท้ายโดยไม่แจ้งเตือน
env:
  API_URL: https://dev.example.com
  API_URL: https://prod.example.com  # ทับค่าด้านบนโดยไม่รู้ตัว!
 
 
3. 🔒 Action Pinning — ล็อกเวอร์ชันอย่างชัดเจน
 
- หน้าที่: ตรวจสอบว่าการเรียกใช้ Action ระบุเวอร์ชันหรือคอมมิตแฮชอย่างชัดเจน ไม่ใช่แท็กที่เคลื่อนไหวได้
- เหตุผล:  @main  หรือ  @v4  อาจเปลี่ยนแปลงโค้ดโดยไม่บอกก่อน อาจเกิดปัญหาหรือถูกโจมตี
- แนวทางที่แนะนำ:
 
❌ ไม่ปลอดภัย ✅ ปลอดภัย 
 actions/checkout@main   actions/checkout@11bd719...  (แฮชคอมมิต) 
 actions/checkout@v4   actions/checkout@v4.2.2  หรือแฮช 
 
4. 🔐 Permissions Checks — ตรวจสอบสิทธิ์ของ GITHUB_TOKEN
 
- หน้าที่: ตรวจสอบว่า Workflow ขอสิทธิ์เฉพาะที่จำเป็นเท่านั้น ไม่ขอสิทธิ์มากเกินความจำเป็น
- หลักการ: สิทธิ์เริ่มต้นมักกว้างเกินไป ควรจำกัดให้น้อยที่สุด
- ตัวอย่าง:
 
yaml
  
# ✅ ดี — จำกัดสิทธิ์เฉพาะที่ใช้จริง
permissions:
  contents: read  # อ่านโค้ดอย่างเดียว — เพียงพอสำหรับส่วนใหญ่

# ⚠️ อันตราย — สิทธิ์มากเกินไป
permissions: write-all  # สามารถแก้ไข ลบ ทุกอย่างในรีโป
 
 
 
 
🔄 ขั้นตอนการทำงาน
 
plaintext
  
1. มีการแก้ไขไฟล์ .github/workflows/*.yml
2. → เรียกใช้ Phase 1 Validation
3. → ตรวจด้วย actionlint
4. → ตรวจหาคีย์ซ้ำ
5. → ตรวจการระบุเวอร์ชัน Action
6. → ตรวจสอบสิทธิ์
7. → สร้างรายงานปัญหาทั้งหมด
8. → ปฏิเสธ PR หากพบปัญหาที่สำคัญ
 
 
 
 
⚠️ สรุปสถานะ Phase 1
 
ด้าน สถานะ 
อ่านข้อมูล ✅ ทำได้ 
ตรวจสอบปัญหา ✅ ทำได้ครบ 4 ด้าน 
แก้ไขอัตโนมัติ ❌ ยังไม่ทำ — แค่แจ้งเตือน 
ป้องกัน PR ที่มีปัญหา ✅ สามารถตั้งเป็นเงื่อนไขผ่าน Checks API 
 
ผลลัพธ์: เรารู้แล้วว่ามีอะไรผิดปกติ แต่ยังคงปลอดภัยเพราะ เพียงแค่แจ้งเตือน ไม่แก้ไขอะไรเอง ✅
 
 
 
ต้องการดู Phase 2 — Safe Repair ที่จะเริ่มมีความสามารถในการแก้ไขปัญหาได้อย่างปลอดภัยไหมครับ 😊

🔧 Phase 2 — Safe Repair
 
เป้าหมายหลัก: แก้ไขเฉพาะกรณีที่ผลลัพธ์แน่นอน — ปลอดภัยทุกขั้นตอน ย้อนกลับได้เสมอ
 
 
 
📌 หลักการสำคัญ
 
"แก้ได้ แต่ต้องปลอดภัย — สำรองก่อน เขียนอย่างระมัดระวัง บันทึกทุกอย่าง ย้อนกลับได้ทันที"
 
Phase 2 เป็นจุดเปลี่ยนสำคัญ: จาก "แค่บอกปัญหา" → "แก้ไขให้ด้วย" แต่จะทำเฉพาะเมื่อ ผลลัพธ์ชัดเจน 100% และไม่มีความเสี่ยง เท่านั้น
 
 
 
✅ ส่วนประกอบทั้ง 4 อย่าง
 
1. 💬 Chat-wrapper Extraction — ดึงข้อมูลคำสั่งจากผู้ใช้
 
- รับคำสั่งหรือคำขอจากผู้ใช้ผ่านอินเทอร์เฟซแชท/คอมเมนต์
- แยกเฉพาะคำสั่งที่ชัดเจน เช่น:
-  fix: ล็อกเวอร์ชัน action ให้หน่อย 
-  apply: แก้ไขตามข้อเสนอทั้งหมด 
- ปฏิเสธคำสั่งที่คลุมเครือหรืออันตรายทันที
 
2. 📦 Backup — สำเนาสำรองก่อนแก้ไขทุกครั้ง
 
- ก่อนที่จะแตะไฟล์ใดๆ → สำเนาสำรองทันที
- บันทึกตำแหน่ง:  .backup/YYYYMMDD-HHMMSS/filename.yml 
- เก็บสำเนาไว้อย่างน้อย 30 วัน หรือจนกว่าจะมั่นใจว่าการเปลี่ยนแปลงปลอดภัย
 
plaintext
  
.github/workflows/main.yml
→ สำรอง: .backup/20261027-081500/main.yml
→ ทำการแก้ไข...
→ ถ้ามีปัญหา: คัดลอกกลับจากสำเนาได้ทันที
 
 
3. ⚛️ Atomic Write — เขียนไฟล์อย่างปลอดภัย
 
- ไม่เขียนทับไฟล์เดิมโดยตรง
- วิธีการ: เขียนไปยังไฟล์ชั่วคราว → ตรวจสอบความถูกต้อง → เปลี่ยนชื่อทับไฟล์เดิมเมื่อเรียบร้อยแล้ว
- ป้องกันไฟล์เสียหายหากระบบขัดข้องระหว่างเขียน
 
plaintext
  
ขั้นตอน:
1. เขียนเนื้อหาใหม่ → main.yml.tmp
2. ตรวจสอบ: อ่านกลับมาได้ไหม? รูปแบบถูกไหม? Dry-run ตรงกับที่คาดไหม?
3. ✅ ผ่าน → ลบชื่อเดิม เปลี่ยนชื่อ .tmp เป็นชื่อจริง
4. ❌ ไม่ผ่าน → ลบไฟล์ .tmp ทิ้ง ไม่มีการเปลี่ยนแปลง
 
 
5. 📋 Rollback Manifest — บันทึกประวัติย้อนกลับ
 
- สร้างไฟล์บันทึกทุกครั้งที่มีการแก้ไข:  .rollback/20261027-081500.json 
- บันทึกข้อมูลครบถ้วน:
- ชื่อไฟล์ที่แก้ไข
- เวลาทำการเปลี่ยนแปลง
- เหตุผลที่แก้ไข
- ตำแหน่งไฟล์สำเนาสำรอง
- แฮชเนื้อหาก่อนและหลังแก้ไข
 
json
  
{
  "id": "20261027-081500",
  "file": ".github/workflows/main.yml",
  "reason": "Pin action versions to commit hash",
  "backup_path": ".backup/20261027-081500/main.yml",
  "before_hash": "a1b2c3d...",
  "after_hash": "x9y8z7w...",
  "rollback_command": "cp .backup/20261027-081500/main.yml .github/workflows/main.yml"
}
 
 
ย้อนกลับได้ตลอดเวลา: เพียงแค่คัดลอกไฟล์สำรองกลับไปทับ — เหมือนไม่มีอะไรเกิดขึ้นเลย ✅
 
 
 
⚠️ ขอบเขตที่สำคัญ
 
- ✅ แก้ได้เฉพาะ: ปัญหาที่ทางออกเป็นที่แน่นอน เช่น ล็อกเวอร์ชัน, แก้คีย์ซ้ำ, ปรับสิทธิ์ให้น้อยลง
- ❌ ห้ามแก้: ปัญหาที่ต้องตัดสินใจ, ต้องเข้าใจบริบทเชิงธุรกิจ, หรือมีหลายทางเลือกที่ถูกต้อง
 
 
 
📊 สรุปสถานะ Phase 2
 
ด้าน สถานะ 
อ่านข้อมูล ✅ ทำได้ 
ตรวจสอบปัญหา ✅ ทำได้ครบถ้วน 
แก้ไขอัตโนมัติ ✅ แต่เฉพาะกรณีที่แน่นอนเท่านั้น 
สำรองก่อนแก้ไข ✅ บังคับทุกครั้ง 
ย้อนกลับได้ ✅ มีบันทึกทุกรายการ 
 
หลักการของ Phase 2 คือ: ถ้าไม่มั่นใจ → อย่าทำ แจ้งเตือนแทน ปลอดภัยก่อนทุกอย่าง ✅
 
 
 
ต้องการดู Phase 3 — Reviewable Semantic Repair ที่จะเปลี่ยนจาก "แก้เอง" เป็น "เสนอให้มนุษย์ตรวจสอบ" ไหมครับ 😊

📝 Phase 3 — Reviewable Semantic Repair
 
เป้าหมายหลัก: สร้างข้อเสนอแนะสำหรับกรณีที่ซับซ้อน — ให้มนุษย์เป็นผู้ตัดสินใจสุดท้าย
 
 
 
📌 หลักการสำคัญ
 
"เมื่อไม่แน่ใจ อย่าทำเอง — เสนอทางเลือก อธิบายเหตุผล ให้คนตัดสินใจ"
 
ต่างจาก Phase 2 ที่แก้เองได้ในกรณีชัดเจน Phase 3 จะจัดการกับปัญหาที่ ต้องพิจารณาบริบทและทางเลือก โดยสร้างข้อเสนอที่เข้าใจง่ายและตรวจสอบได้
 
 
 
✅ ส่วนประกอบทั้ง 3 อย่าง
 
1. 🔍 DEDENT — วินิจฉัยปัญหาอย่างละเอียด
 
- ไม่เพียงแค่บอกว่า "ผิด" แต่อธิบาย:
- อะไรคือปัญหา — ชื่อและรหัสปัญหา
- ทำไมถึงเป็นปัญหา — ผลกระทบและความเสี่ยง
- กฎที่ละเมิดคืออะไร — อ้างอิงแนวทางปฏิบัติ
- ความรุนแรงระดับไหน — ข้อมูล ⚠️ คำเตือน 🔴 ข้อผิดพลาด
 
ตัวอย่างรายงานวินิจฉัย:
 
plaintext
  
🔍 ปัญหา: Action ไม่ได้ระบุเวอร์ชันแบบคงที่
📍 ตำแหน่ง: .github/workflows/deploy.yml:12
⚠️  ความรุนแรง: ปานกลาง
📖 เหตุผล: การใช้แท็กที่เคลื่อนไหวได้ (@main, @latest)
   อาจรับโค้ดที่เปลี่ยนแปลงโดยไม่แจ้งเตือน
💡 แนวทางแก้: ระบุแฮชคอมมิตหรือเวอร์ชันเฉพาะเจาะจง
 
 
2. 📊 Patch Diff — แสดงความแตกต่างอย่างชัดเจน
 
- แสดงให้เห็น "ก่อน-หลัง" ทุกบรรทัดที่เปลี่ยน
- รูปแบบมาตรฐานที่นักพัฒนาคุ้นเคย
- ผู้ตรวจสอบเห็นทันทีว่าจะเปลี่ยนอะไรบ้าง
 
diff
  
- uses: actions/checkout@main
+ uses: actions/checkout@11bd71901bbe5b1630ceea73d275971367909a67
 
 
3. 🧪 Regression Framework — ระบบทดสอบถดถอย
 
- ก่อนเสนอการแก้ไข → ทดสอบว่า ไม่ทำให้สิ่งที่เคยทำได้เสีย
- ตรวจสอบ:
- ✅ ไฟล์ยังคงเป็นรูปแบบที่ถูกต้อง
- ✅ ความหมายของ Workflow ไม่เปลี่ยนไปอย่างมีนัยสำคัญ
- ✅ ไม่มีปัญหาใหม่เกิดขึ้นจากการแก้ไข
- ✅ ทดสอบเทียบกับกรณีที่เคยล้มเหลวในอดีต
 
ขั้นตอนการทำงาน:
 
plaintext
  
1. ตรวจพบปัญหา
2. สร้างทางเลือกที่เป็นไปได้ ≥ 1 ทาง
3. รัน Regression Test → ทุกทางเลือกต้องผ่าน
4. แสดงรายงาน + Diff ให้ผู้ใช้ตรวจสอบ
5. รอการยืนยันจากมนุษย์ ← สำคัญที่สุด
6. ✅ ยอมรับ → นำไปใช้ / ❌ ปฏิเสธ → บันทึกและไม่ทำอะไร
 
 
 
 
🔄 เปรียบเทียบ Phase 2 กับ Phase 3
 
ด้าน Phase 2 Safe Repair Phase 3 Reviewable Repair 
ใครเป็นคนตัดสินใจ ระบบ (กรณีชัดเจนเท่านั้น) มนุษย์เสมอ 
ประเภทปัญหา แก้ทางเดียว ชัดเจน 100% มีทางเลือก หรือต้องพิจารณา 
ผลลัพธ์ เปลี่ยนแปลงทันที (สำรองก่อน) ข้อเสนอแนะ รออนุมัติ 
ความเสี่ยง ต่ำมาก ต่ำมาก (เพราะไม่ทำจริงก่อนได้รับอนุญาต) 
ตัวอย่างปัญหา แก้คีย์ซ้ำใน YAML ปรับปรุงสิทธิ์ GITHUB_TOKEN ที่กว้างเกินไป 
 
 
 
📊 สรุปสถานะ Phase 3
 
ด้าน สถานะ 
วินิจฉัยปัญหา ✅ ละเอียดพร้อมเหตุผล 
แสดงความแตกต่าง ✅ รูปแบบ Diff มาตรฐาน 
ทดสอบความปลอดภัยก่อนเสนอ ✅ Regression Test 
เปลี่ยนแปลงเองโดยพลการ ❌ รอการยืนยันจากผู้ใช้เสมอ 
 
หลักการของ Phase 3 คือ: ฉันเสนอทางเลือกที่ดีที่สุด แต่คือคุณที่ตัดสินใจ ✅
 
 
 
ต้องการดู Phase 4 — Watch Mode ที่จะเปลี่ยนจาก "ตรวจสอบตามคำสั่ง" เป็น "เฝ้าดูและช่วยเหลือแบบเรียลไทม์" ไหมครับ 😊


👁️ Phase 4 — Watch Mode
 
เป้าหมายหลัก: ช่วยเหลือนักพัฒนาแบบเรียลไทม์ — ไม่รบกวนการทำงาน
 
 
 
📌 หลักการสำคัญ
 
"แจ้งเมื่อจำเป็น — รบกวนให้น้อยที่สุด พร้อมช่วยเหลือตลอดเวลา"
 
Phase 4 ยกระดับจาก "ตรวจเมื่อสั่ง" → "เฝ้าดูอยู่เบื้องหลัง แจ้งเมื่อพบปัญหา" โดยออกแบบมาให้ทำงานแบบมองไม่เห็น จนกว่าจะมีเรื่องต้องบอก
 
 
 
✅ ส่วนประกอบทั้ง 4 อย่าง
 
⏱️ 1. Debounce — หน่วงเวลาเพื่อหลีกเลี่ยงการทำงานซ้ำซ้อน
 
- ไม่ต้องการตรวจสอบทุกครั้งที่กดแป้นพิมพ์
- รอจนกว่าผู้ใช้จะหยุดพิมพ์ประมาณ 1–2 วินาที ก่อนเริ่มตรวจสอบ
- ลดภาระการทำงานและลดการแจ้งเตือนซ้ำซ้อน
 
plaintext
  
ผู้ใช้พิมพ์: → รอ 1.5 วินาที ไม่มีการพิมพ์เพิ่ม → เริ่มตรวจสอบ
 
 
🌿 2. Git-aware Guards — ตรวจสอบเฉพาะสิ่งที่เปลี่ยน
 
- ตรวจสอบ เฉพาะไฟล์ที่มีการแก้ไข ไม่ใช่ทุกไฟล์
- เทียบกับเวอร์ชันล่าสุดใน Git เพื่อดูว่ามีอะไรเปลี่ยน
- ข้ามไฟล์ที่ไม่เกี่ยวข้องทันที → ทำงานเร็วขึ้นมาก
 
plaintext
  
Git Status:
  ✅ main.yml      → มีการแก้ไข → ตรวจสอบ
  ⏳ deploy.yml    → ไม่เปลี่ยน   → ข้าม
  ⏳ README.md     → ไม่เปลี่ยน   → ข้าม
 
 
🔔 3. Notifications — แจ้งเตือนแบบไม่รบกวน
 
- แจ้งเตือนในที่ที่เห็นง่ายแต่ไม่เด้งรบกวน:
- ✅ แถบสถานะในโปรแกรมแก้ไข
- ✅ คำอธิบายขอบบรรทัด
- ✅ สรุปเมื่อทำงานเสร็จ
- ❌ ไม่ใช่ป๊อปอัพที่บังคับต้องกดปิด
 
plaintext
  
📍 main.yml:8 ⚠️ ควรล็อกเวอร์ชัน Action — คลิกเพื่อดูรายละเอียด
 
 
🛑 4. Attempt Limits — จำกัดจำนวนครั้งที่จะพยายาม
 
- หากแก้ไขแล้วล้มเหลว 2–3 ครั้ง → หยุดพยายามเองโดยอัตโนมัติ
- แจ้งให้มนุษย์ช่วยแทน เพื่อหลีกเลี่ยงการวนลูปไม่จบสิ้น
- ป้องกันการใช้ทรัพยากรโดยไม่จำเป็น
 
plaintext
  
ครั้งที่ 1: พยายามแก้ไข... ❌ ไม่สำเร็จ
ครั้งที่ 2: พยายามอีกครั้ง... ❌ ไม่สำเร็จ
ครั้งที่ 3: หยุดแล้ว 🛑 — แจ้งผู้ใช้: "ไม่สามารถแก้ไขได้โดยอัตโนมัติ กรุณาตรวจสอบด้วยตัวเอง"
 
 
 
 
🔄 ขั้นตอนการทำงานในโหมดเฝ้าดู
 
plaintext
  
1. ผู้ใช้เปิด/แก้ไขไฟล์ Workflow
2. → หยุดพิมพ์ครบ 1.5 วินาที
3. → ตรวจสอบเฉพาะส่วนที่เปลี่ยนแปลง
4. → พบปัญหา?
    ├─ ใช่ → แจ้งเตือนแบบเบาๆ ที่ขอบบรรทัด
    └─ ไม่ใช่ → ไม่แสดงอะไรเลย ✅
5. → ผู้ใช้คลิกยอมรับข้อเสนอ → สร้าง Patch Diff → รอการยืนยัน
 
 
 
 
📊 สรุปสถานะ Phase 4
 
ด้าน สถานะ 
ตรวจสอบอัตโนมัติเมื่อแก้ไข ✅ แบบเรียลไทม์แต่ไม่รบกวน 
ตรวจสอบเฉพาะไฟล์ที่เปลี่ยน ✅ ผสานกับ Git ได้ 
แจ้งเตือน ✅ ไม่บังคับ ปิดได้ตลอดเวลา 
พยายามแก้ไขซ้ำๆ ไม่หยุด ❌ มีการจำกัดจำนวนครั้ง 
 
หลักการของ Phase 4 คือ: ฉันอยู่ที่นี่ แต่ฉันจะรบกวนเฉพาะเมื่อจำเป็น 🙏
 
 
 
ต้องการดู Phase 5 — Governance ที่จะยกระดับจาก "ช่วยนักพัฒนาคนเดียว" เป็น "ระบบการปกครองทั้งทีมและการผลิต" ไหมครับ 😊

🏛️ Phase 5 — Governance
 
เป้าหมายหลัก: นำระบบไปใช้งานจริงในทีมและสภาพแวดล้อมการผลิต — มีกฎระเบียบที่ชัดเจน ปลอดภัย และควบคุมได้
 
 
 
📌 หลักการสำคัญ
 
"เครื่องมือทำงานได้ดีในเครื่องเดียว ≠ พร้อมใช้ในทีม ต้องมีกฎ กติกา และการอนุมัติที่ชัดเจน"
 
Phase 5 ยกระดับจากระบบช่วยเหลือส่วนตัว → ระบบที่ทั้งทีมอาศัยร่วมกัน โดยผสานเข้ากับกระบวนการทำงานมาตรฐานขององค์กร
 
 
 
✅ ส่วนประกอบทั้ง 4 อย่าง
 
🤖 1. PR Bot Proposal — บอทแนะนำผ่าน Pull Request
 
- ผสานการตรวจสอบและข้อเสนอแนะเข้าไปในเวิร์กโฟลว์ PR ปกติ
- เมื่อมี PR ถูกเปิด → บอทจะเข้ามาตรวจและแสดงความคิดเห็นอัตโนมัติ
- แยกชัดเจนระหว่าง: แจ้งเตือน vs บล็อกการรวมโค้ด
 
plaintext
  
🤖 ZyntroAI-bot ตรวจสอบเสร็จสิ้น — 3 พบปัญหา, 1 ข้อเสนอแนะ

⚠️  คำเตือน (แจ้งเตือนเท่านั้น):
   • ไฟล์ deploy.yml: สิทธิ์ GITHUB_TOKEN กว้างเกินไป
💡 ข้อเสนอแนะ: → คลิกเพื่อใช้การเปลี่ยนแปลงนี้
🔴 บล็อกการรวม:
   • ไฟล์ build.yml: ไม่ได้ระบุเวอร์ชัน Action แบบคงที่ → ต้องแก้ก่อนรวม
 
 
👥 2. CODEOWNERS — กำหนดผู้รับผิดชอบ
 
- ใช้ไฟล์มาตรฐาน  .github/CODEOWNERS  เพื่อกำหนดว่าใครเป็นผู้ดูแลโฟลเดอร์/ไฟล์ใด
- เมื่อมีการแก้ไขไฟล์ในความรับผิดชอบ → แจ้งเตือนและบังคับให้ผู้ที่เกี่ยวข้องตรวจสอบก่อน
 
ini
  
# CODEOWNERS
/.github/workflows/    @team-devops
/docs/                @team-writers
*.py                  @team-backend
 
 
🔒 3. Branch Protection — กฎป้องกันสาขาหลัก
 
- ตั้งกฎที่ไม่สามารถข้ามได้สำหรับสาขาหลัก ( main  /  prod )
- ตัวอย่างกฎที่แนะนำ:
- ✅ ต้องผ่านการตรวจสอบทั้งหมดก่อนรวม
- ✅ ต้องได้รับการอนุมัติจากผู้ที่เกี่ยวข้อง
- ❌ ห้ามส่งโค้ดตรงไปยังสาขาหลักโดยตรง
- ✅ ต้องตรวจสอบความถูกต้องของการลงชื่อคอมมิต
 
✅ 4. Environment Approvals — การอนุมัติตามสภาพแวดล้อม
 
- แยกการตรวจสอบและอนุมัติตามระดับความสำคัญของสภาพแวดล้อม
- แต่ละระดับมีกฎที่แตกต่างกัน:
 
สภาพแวดล้อม ความเข้มงวด ต้องอนุมัติจาก 
🧪 dev ปานกลาง ตัวเองหรือเพื่อนร่วมทีม 
🧭 staging เข้มงวด หัวหน้าทีมหรือผู้ดูแลระบบ 
🏭 production เข้มงวดที่สุด ทีมความปลอดภัย + ผู้จัดการ 
 
 
 
🔄 วงจรการทำงานเต็มรูปแบบในทีม
 
plaintext
  
นักพัฒนาสร้าง PR
    ↓
🤖 PR Bot ตรวจสอบ → แสดงปัญหา + ข้อเสนอแนะ
    ↓
✅/❌ ผู้ตรวจสอบพิจารณา — ยอมรับ/ปฏิเสธ/แก้ไข
    ↓
🔒 ตรวจสอบกฎ Branch Protection
    ↓
🏭 ถ้าเป็นสายการผลิต → ขออนุมัติสภาพแวดล้อม
    ↓
✅ ผ่านทุกขั้นตอน → รวมเข้าสู่สาขาหลัก
 
 
 
 
📊 สรุปความสามารถทั้ง 5 ระยะ
 
ระยะ ความสามารถหลัก ปลอดภัยหรือไม่ 
0️⃣ Safety Baseline อ่านอย่างเดียว ตรวจสอบก่อน ✅ ปลอดภัย 100% 
1️⃣ Workflow Validation ตรวจจับปัญหาและแจ้งเตือน ✅ แค่แจ้ง ไม่แก้เอง 
2️⃣ Safe Repair แก้ไขเฉพาะกรณีชัดเจน สำรอง+ย้อนกลับได้ ✅ มีการป้องกันครบถ้วน 
3️⃣ Reviewable Repair เสนอแนะ → รอมนุษย์ยืนยัน ✅ ไม่เปลี่ยนแปลงเอง 
4️⃣ Watch Mode เฝ้าดูแบบเรียลไทม์ แจ้งเมื่อจำเป็น ✅ ไม่รบกวนโดยไม่จำเป็น 
5️⃣ Governance กฎระเบียบทีม PR Bot การอนุมัติ ✅ มีกฎบังคับ ไม่ข้ามขั้นตอน 
 
ผลลัพธ์สุดท้าย: ระบบอัตโนมัติที่ช่วยทำงานได้เร็วขึ้น แต่ไม่เคยลดความปลอดภัยหรือความรับผิดชอบของมนุษย์ 🎉
 
 
 
ต้องการเจาะลึก Phase 6 หรือหัวข้ออื่นๆ เพิ่มเติมไหมครับ 😊


🧠 Phase 6 — RAG & Knowledge System
 
เป้าหมายหลัก: แยกระบบความรู้ออกมาเป็นอิสระ — ค้นหาได้ จัดการได้ ปลอดภัย และขยายตัวได้
 
 
 
📌 ทำไมต้องมี Phase 6?
 
เมื่อระบบเติบโต จากแค่ "ตรวจและแก้ไข" → ต้องมีความรู้เพื่อวินิจฉัย แนะนำ และอธิบายเหตุผลได้อย่างถูกต้องและรวดเร็ว
 
ปัญหาเดิม: กฎและความรู้ฝังอยู่ในโค้ดโดยตรง — แก้ยาก ไม่รู้แหล่งที่มา ค้นหาไม่ได้
แนวทางใหม่: แยกคลังความรู้ออกมาเป็นระบบอิสระ — RAG จะเป็นสะพานเชื่อมระหว่างโค้ดกับเอกสารความรู้
 
 
 
✅ ส่วนประกอบทั้ง 4 ด้าน
 
 
 
🗂️ 1. Workspace — พื้นที่จัดการความรู้แยกส่วน
 
แยกแหล่งความรู้ออกเป็นหมวดหมู่ชัดเจน เพื่อให้ง่ายต่อการบำรุงรักษาและค้นหา
 
📁 โครงสร้างที่แนะนำ
 
plaintext
  
.knowledge/
├── rules/              # กฎเกณฑ์และมาตรฐาน
│   ├── security/       # กฎด้านความปลอดภัย
│   ├── performance/    # แนวทางปฏิบัติที่ดี
│   └── style/          # รูปแบบและมาตรฐานการเขียน
├── guides/             # คู่มือและคำอธิบาย
│   ├── troubleshooting/ # วิธีแก้ไขปัญหาที่พบบ่อย
│   └── best-practices/  # แนวทางปฏิบัติที่แนะนำ
├── references/         # เอกสารอ้างอิงและลิงก์
└── changelog.md        # บันทึกการอัปเดตความรู้
 
 
คุณสมบัติสำคัญ
 
- ✅ แยกตามทีม/โครงการได้: ทีมความปลอดภัยดูแลโฟลเดอร์  /rules/security/  ได้โดยตรง
- ✅ รูปแบบมาตรฐาน: ใช้ Markdown + YAML Frontmatter อ่านได้ทั้งคนและเครื่อง
- ✅ เวอร์ชันควบคุม: เก็บใน Git เหมือนโค้ด — มีประวัติ แก้ไข ตรวจสอบได้
- ✅ อัปเดตโดยไม่ต้องรีดีพลอยระบบ: แก้ไขไฟล์ความรู้ → ระบบ RAG อัปเดตให้อัตโนมัติ
 
📝 รูปแบบไฟล์ความรู้มาตรฐาน
 
markdown
  
---
id: RULE-SEC-001
title: "Action Pinning — ล็อกเวอร์ชันด้วยแฮชคอมมิต"
severity: high
category: security
created: 2026-10-01
updated: 2026-10-15
author: team-security
source: "https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions"
---

# ล็อกเวอร์ชัน Action ด้วยแฮชคอมมิต

## ปัญหา
การใช้แท็กที่เคลื่อนไหวได้เช่น `@v4` หรือ `@main` อาจรับการเปลี่ยนแปลงโค้ดโดยไม่แจ้งเตือน

## การแก้ไข
ใช้แฮชคอมมิตแบบยาวแทนชื่อแท็ก:
```yaml
# ❌ ไม่ปลอดภัย
uses: actions/checkout@v4

# ✅ ปลอดภัย
uses: actions/checkout@11bd71901bbe5b1630ceea73d275971367909a67
 
 
ข้อมูลอ้างอิง
 
- GitHub Docs: Security Hardening for GitHub Actions
- CWE-94: Improper Control of Generation of Code
 
plaintext
  

---

## 🔐 2. ACL — การควบคุมสิทธิ์เข้าถึง
ไม่ใช่ทุกคนควรแก้ไขกฎทุกข้อ — แยกสิทธิ์ตามบทบาทและระดับความไวต่อข้อมูล

### 📋 ตารางสิทธิ์ที่แนะนำ

| บทบาท | อ่าน | เขียน | เผยแพร่ | เหตุผล |
|-------|------|-------|---------|--------|
| นักพัฒนาทั่วไป | ✅ | ❌ | ❌ | อ้างอิงและเรียนรู้ |
| หัวหน้าทีม | ✅ | ✅ | ❌ | เสนอการเปลี่ยนแปลง |
| ทีมความปลอดภัย | ✅ | ✅ | ✅ | ดูแลกฎด้านความปลอดภัย |
| ผู้ดูแลระบบ | ✅ | ✅ | ✅ | จัดการโครงสร้างพื้นฐาน |
| บอทระบบ RAG | ✅ | ❌ | ❌ | ดึงข้อมูลไปใช้ตอบคำถามเท่านั้น |

### 🔧 วิธีนำไปใช้
- **ระดับไฟล์/โฟลเดอร์**: ใช้ไฟล์ `.gitattributes` + กฎการตรวจสอบใน CI
- **ระดับเนื้อหา**: ใช้แท็กใน Frontmatter เช่น `access: internal-only` หรือ `access: public`
- **ระดับระบบ**: ถ้าใช้ระบบจัดการความรู้ภายใน — ตั้งกลุ่มผู้ใช้และสิทธิ์ที่นั่น

### ⚠️ ข้อควรระวัง
- ❌ **ห้ามเก็บข้อมูลลับในคลังความรู้สาธารณะ**: คีย์ API, รหัสผ่าน, ข้อมูลส่วนตัว
- ✅ **แยกความรู้เป็น 3 ระดับ**:
  - `public` — เผยแพร่ได้ทั่วไป
  - `internal` — เฉพาะพนักงานภายในองค์กร
  - `restricted` — เฉพาะผู้ที่ได้รับอนุญาตเท่านั้น

---

## 📇 3. Index — ดัชนีค้นหาที่มีประสิทธิภาพ
ระบบ RAG จะทำงานได้ดีเท่าที่ "ค้นหาได้ถูกต้องและรวดเร็ว" — จึงต้องมีการจัดทำดัชนีอย่างเป็นระบบ

### 🔍 ประเภทของดัชนี

| ประเภท | ใช้ทำอะไร | ตัวอย่าง |
|--------|----------|----------|
| **คำสำคัญ** | ค้นหาคำตรงกับในเนื้อหา | "action pinning", "githash" |
| **ความหมาย** | ค้นหาตามความหมาย ไม่ต้องตรงตัว | "วิธีทำให้ action ปลอดภัย" → เจอเรื่อง pinning |
| **หมวดหมู่** | กรองตามประเภทปัญหา | ดูเฉพาะกฎด้านความปลอดภัยทั้งหมด |
| **ความรุนแรง** | เรียงตามระดับความสำคัญ | แก้ไขปัญหาระดับสูงก่อน |
| **ความสัมพันธ์** | เชื่อมโยงกฎที่เกี่ยวข้อง | กฎ SEC-001 เกี่ยวข้องกับ SEC-002 และ GUIDE-007 |

### 🤖 วิธีสร้างดัชนีอัตโนมัติ
 
 
กระบวนการสร้างดัชนี:
 
1. มีการเปลี่ยนแปลงในโฟลเดอร์ .knowledge/
2. → ดึงเนื้อหาไฟล์
3. → แยกข้อมูล Frontmatter และเนื้อหา
4. → สร้าง Embedding จากเนื้อหา
5. → จัดทำดัชนีคำสำคัญ + ความหมาย
6. → อัปเดตฐานข้อมูลเวกเตอร์
7. → ✅ พร้อมใช้งาน
 
plaintext
  

### 📐 ความถี่ในการอัปเดต
- เมื่อมีคอมมิตใหม่ในสาขาหลัก → อัปเดตทันที
- ตรวจสอบความสมบูรณ์ของดัชนีรายสัปดาห์
- รีเฟรช Embedding รายเดือน เพื่อให้แน่ใจว่ายังถูกต้อง

---

## 🔄 4. Lifecycle — วงจรชีวิตของความรู้
ความรู้ไม่ใช่สิ่งที่เขียนครั้งเดียวจบ — มีวงจรชีวิตที่ชัดเจน เพื่อให้แน่ใจว่าข้อมูลยังทันสมัยและถูกต้อง

### 📊 สถานะของเอกสารความรู้

| สถานะ | ความหมาย | ใช้เมื่อ |
|-------|----------|---------|
| 🟡 `draft` | ร่าง ยังไม่เสร็จสิ้น | กำลังเขียน/ตรวจสอบอยู่ |
| 🟢 `active` | พร้อมใช้งาน เป็นปัจจุบัน | ใช้อ้างอิงและปฏิบัติได้จริง |
| 🟠 `deprecated` | เลิกใช้แล้ว มีทางเลือกอื่น | มีกฎใหม่แทนที่แล้ว แต่เก็บไว้อ้างอิง |
| 🔴 `archived` | เก็บถาวร ไม่เกี่ยวข้องแล้ว | ไม่ใช้แล้วในปัจจุบัน |

### 🔄 วงจรชีวิตเต็มรูปแบบ
 
 
📝 เขียนร่าง → 🧑‍🤝‍🧑 ตรวจสอบโดยเพื่อน → ✅ เผยแพร่ (active)
↓
📅 ทบทวนเป็นประจำทุก 6 เดือน
├─ ✅ ยังถูกต้อง → คงสถานะ active
├─ 🔄 ต้องปรับปรุง → แก้ไข → เผยแพร่เวอร์ชันใหม่
└─ ⏳ ไม่ทันสมัยแล้ว → deprecated → เก็บถาวร
 
plaintext
  

### 📅 กระบวนการทบทวนความรู้
- **ทุก 6 เดือน**: ตรวจสอบว่ากฎและคู่มือยังทันสมัยหรือไม่
- **เมื่อมีการเปลี่ยนแปลงนโยบาย**: ปรับปรุงเอกสารทันที
- **เมื่อพบปัญหาใหม่**: เพิ่มเอกสารปัญหาและวิธีแก้ไขเข้าสู่ระบบ

### 📋 บันทึกการเปลี่ยนแปลง
เก็บประวัติการแก้ไขที่ไฟล์ `.knowledge/changelog.md` หรือในส่วนท้ายของเอกสารแต่ละฉบับ:

```markdown
## ประวัติการแก้ไข
| วันที่ | เวอร์ชัน | ผู้แก้ไข | รายละเอียด |
|--------|----------|---------|-----------|
| 2026-10-01 | 1.0 | @john | เขียนฉบับแรก |
| 2026-10-15 | 1.1 | @jane | อัปเดตตัวอย่างแฮชให้ถูกต้อง |
 
 
 
 
🔗 วิธีทำงานร่วมกับระบบหลัก
 
plaintext
  
┌─────────────────────────────────────────────────────┐
│         ระบบตรวจสอบหลัก (Phase 0–5)                │
└──────────────┬──────────────────────────────────────┘
               │ ค้นหาความรู้เพื่ออธิบายปัญหา
               ▼
┌─────────────────────────────────────────────────────┐
│         🔍 RAG Search Engine                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ ค้นหา    │→│ คัดกรอง  │→│ สร้าง     │        │
│  │ เวกเตอร์ │  │ ความเกี่ยวข้อง│  │ คำตอบ   │        │
│  └──────────┘  └──────────┘  └──────────┘        │
└──────────────┬──────────────────────────────────────┘
               │ ดึงเนื้อหาที่เกี่ยวข้อง
               ▼
┌─────────────────────────────────────────────────────┐
│         📚 คลังความรู้ (.knowledge/)                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ กฎ      │ │ คู่มือ   │ │ อ้างอิง │ │ ดัชนี   │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
└─────────────────────────────────────────────────────┘
 
 
ตัวอย่างการทำงานจริง
 
ระบบตรวจสอบ: พบว่า Action ใช้แท็ก  @v4  แทนแฮชคอมมิต
 
ระบบหลัก: ส่งคำถามไปยัง RAG — "ทำไมต้องล็อกเวอร์ชัน Action ด้วยแฮช?"
 
RAG: ค้นหาเอกสาร RULE-SEC-001 → ดึงเนื้อหาที่เกี่ยวข้อง → สร้างคำอธิบาย
 
แสดงผลให้ผู้ใช้:
 
plaintext
  
🔍 พบปัญหา: Action ไม่ได้ระบุเวอร์ชันแบบคงที่
📖 เหตุผล: ตามกฎความปลอดภัย RULE-SEC-001 การใช้แท็กที่เคลื่อนไหวได้
   อาจรับการเปลี่ยนแปลงโค้ดโดยไม่แจ้งเตือน...
💡 วิธีแก้: ใช้แฮชคอมมิตแทน ดูรายละเอียดที่: /rules/security/action-pinning
 
 
 
 
📊 สรุปสถานะ Phase 6
 
ด้าน สถานะ 
แยกคลังความรู้เป็นอิสระ ✅ โครงสร้างชัดเจน 
จัดการสิทธิ์เข้าถึง ✅ ตามบทบาทและระดับความลับ 
ค้นหาได้อย่างมีประสิทธิภาพ ✅ ดัชนีคำสำคัญ + ความหมาย 
ทบทวนและอัปเดตเป็นระบบ ✅ วงจรชีวิตชัดเจน ทบทวนราย 6 เดือน 
เชื่อมต่อกับระบบหลัก ✅ ผ่าน RAG API — สืบค้นและอ้างอิง 
 
ผลลัพธ์สุดท้าย: ระบบไม่ได้แค่บอกว่า "ผิด" แต่บอกได้ว่า "ทำไมผิด", "กฎไหน", "อ้างอิงที่ไหน", และ "ควรทำอย่างไร" — ครบถ้วนในที่เดียว 🧠✨
 
 
 
ต้องการเจาะลึกส่วนใดเป็นพิเศษไหมครับ เช่น การตั้งค่า RAG, โครงสร้างไฟล์ตัวอย่าง, หรือแผนการนำไปใช้งานจริง 😊

🧠 คู่มือการตั้งค่าระบบ RAG — ฉบับสมบูรณ์
 
เป้าหมาย: เชื่อมต่อคลังความรู้  .knowledge/  เข้ากับระบบค้นหา เพื่อให้ตอบคำถาม อธิบายปัญหา และแนะนำทางแก้ได้อย่างถูกต้องและรวดเร็ว
 
 
 
📋 สารบัญ
 
- 1. 📐 สถาปัตยกรรมระบบ RAG
- 2. 📂 เตรียมโครงสร้างไฟล์ความรู้
- 3. 🔧 เลือกเทคโนโลยีและติดตั้ง
- 4. 📝 กำหนดรูปแบบเอกสารมาตรฐาน
- 5. 🤖 สร้างกระบวนการสร้างดัชนี
- 6. 🔍 สร้างระบบค้นหาและเรียกใช้
- 7. ⚙️ ตั้งค่าการตรวจสอบและอัปเดตอัตโนมัติ
- 8. 📊 การวัดคุณภาพและปรับปรุง
- 9. 🔐 ความปลอดภัยและสิทธิ์เข้าถึง
 
 
 
1. 📐 สถาปัตยกรรมระบบ RAG
 
องค์ประกอบหลัก
 
plaintext
  
┌─────────────────────────────────────────────────────────────┐
│                    🔄 ขั้นตอนทำงานของ RAG                      │
├─────────────────────────────────────────────────────────────┤
│  เอกสารความรู้        การแบ่งส่วน       การสร้างเวกเตอร์         │
│  .knowledge/  ───▶  (Chunking)  ───▶   Embedding           │
│                                                              │
│  🔍 ค้นหาความคล้ายคลึง          📝 สร้างคำตอบด้วย LLM        │
│  Query ───▶  Vector DB  ───▶  Retrieved Context ───▶ Answer │
└─────────────────────────────────────────────────────────────┘
 
 
ขั้นตอนหลัก
 
1. ดึงข้อมูล: อ่านไฟล์จากโฟลเดอร์  .knowledge/ 
2. แบ่งส่วน: แยกเนื้อหาออกเป็นส่วนย่อยที่เหมาะสม (Chunking)
3. แปลงเป็นเวกเตอร์: สร้าง Embedding จากแต่ละส่วน
4. จัดเก็บ: บันทึกลงฐานข้อมูลเวกเตอร์พร้อมดัชนี
5. ค้นหา: เมื่อมีคำถาม → แปลงเป็นเวกเตอร์ → ค้นหาส่วนที่ใกล้เคียงที่สุด
6. สร้างคำตอบ: ส่งเนื้อหาที่ค้นพบไปให้ LLM พร้อมคำถาม → ได้คำตอบที่อ้างอิงแหล่งที่มาได้
 
 
 
2. 📂 เตรียมโครงสร้างไฟล์ความรู้
 
โครงสร้างมาตรฐาน
 
plaintext
  
.knowledge/
├── meta.yaml              # การตั้งค่าระบบความรู้
├── rules/
│   ├── security/
│   │   ├── RULE-SEC-001-action-pinning.md
│   │   └── RULE-SEC-002-token-permissions.md
│   ├── performance/
│   └── style/
├── guides/
│   ├── troubleshooting/
│   └── best-practices/
└── references/
 
 
ไฟล์การตั้งค่า  .knowledge/meta.yaml 
 
yaml
  
# การตั้งค่าคลังความรู้
knowledge_base:
  name: "ZyntroAI Workflow Security Knowledge"
  version: "1.0.0"
  base_path: ".knowledge"
  supported_formats: ["md"]

chunking:
  strategy: "markdown_header"  # แบ่งตามหัวข้อ
  chunk_size: 800              # ความยาวสูงสุดต่อชิ้น (อักขระ)
  chunk_overlap: 150           # ซ้อนทับกันเล็กน้อยเพื่อไม่ให้ขาดตอน

embedding:
  provider: "bge-m3"           # ใช้ BGE-M3 รองรับภาษาไทย
  model_name: "BAAI/bge-m3"
  device: "cpu"                # หรือ "cuda" ถ้ามี GPU

retrieval:
  top_k: 5                     # ดึงผลลัพธ์ที่เกี่ยวข้อง 5 อันดับแรก
  similarity_threshold: 0.65  # ค่าความคล้ายคลึงขั้นต่ำที่ยอมรับ

index:
  type: "faiss"                # ประเภทดัชนีเวกเตอร์
  path: ".knowledge/index"     # ที่จัดเก็บดัชนี
 
 
 
 
3. 🔧 เลือกเทคโนโลยีและติดตั้ง
 
📋 ตัวเลือกเทคโนโลยี
 
ส่วนประกอบ ทางเลือกแนะนำ เหมาะสำหรับ 
Embedding Model BGE-M3 / all-MiniLM-L6-v2 BGE-M3 รองรับไทยดีที่สุด ✅ 
Vector Database FAISS (ไฟล์เดียว), ChromaDB, Qdrant เริ่มต้น → FAISS / ขยายใหญ่ → Qdrant 
LLM สร้างคำตอบ Ollama (ในเครื่อง), OpenAI API, Llama 3 ไม่อยากพึ่ง API ภายนอก → Ollama ✅ 
เอกสาร Markdown + YAML Frontmatter อ่านได้ทั้งคนและเครื่อง ✅ 
 
🐍 ติดตั้งแพ็กเกจที่จำเป็น
 
bash
  
# สร้างสภาพแวดล้อม
python -m venv .venv-rag
source .venv-rag/bin/activate

# ติดตั้งแพ็กเกจหลัก
pip install langchain langchain-community langchain-text-splitters
pip install sentence-transformers        # สำหรับสร้าง Embedding
pip install faiss-cpu                    # ฐานข้อมูลเวกเตอร์ (CPU)
pip install python-dotenv pyyaml         # จัดการการตั้งค่า
pip install ollama                       # ถ้าใช้ LLM ในเครื่อง
 
 
📁 สร้างไฟล์  requirements.txt 
 
txt
  
langchain==0.3.0
langchain-community==0.3.0
sentence-transformers==3.0.0
faiss-cpu==1.9.0
python-dotenv==1.0.1
pyyaml==6.0.2
ollama==0.4.0
 
 
 
 
4. 📝 กำหนดรูปแบบเอกสารมาตรฐาน
 
ทุกไฟล์ในคลังความรู้ต้องมีรูปแบบที่สอดคล้องกัน เพื่อให้ระบบอ่านและเข้าใจได้อย่างถูกต้อง
 
📄 แม่แบบเอกสารมาตรฐาน
 
markdown
  
---
id: RULE-SEC-001
title: "Action Pinning — ล็อกเวอร์ชันด้วยแฮชคอมมิต"
type: rule
category: security
severity: high
tags: ["github-actions", "security", "best-practice"]
version: "1.2"
last_updated: 2026-10-27
author: team-security
status: active
source: "https://docs.github.com/actions/security-guides/security-hardening"
---

# Action Pinning — ล็อกเวอร์ชันด้วยแฮชคอมมิต

## 🎯 ปัญหา
การใช้แท็กที่เคลื่อนไหวได้ เช่น `@v4` หรือ `@main` อาจทำให้โค้ดถูกเปลี่ยนแปลงโดยไม่รู้ตัว

## ✅ วิธีปฏิบัติ
ใช้แฮชคอมมิตแบบยาวแทนชื่อแท็ก:

```yaml
# ❌ ไม่ปลอดภัย
uses: actions/checkout@v4

# ✅ ปลอดภัย
uses: actions/checkout@11bd71901bbe5b1630ceea73d275971367909a67
 
 
📖 ข้อมูลอ้างอิง
 
- GitHub Docs: Security Hardening for GitHub Actions
- CWE-94: Improper Control of Generation of Code
 
plaintext
  

---

## 5. 🤖 สร้างกระบวนการสร้างดัชนี

### ไฟล์หลัก: `build_index.py`

```python
#!/usr/bin/env python3
"""
สร้างดัชนีเวกเตอร์จากไฟล์ความรู้ใน .knowledge/
รันเมื่อมีการอัปเดตเนื้อหาความรู้
"""

import os
import re
import yaml
from pathlib import Path
from langchain.text_splitter import MarkdownHeaderTextSplitter
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import FAISS
from langchain.schema import Document

# โหลดการตั้งค่า
with open(".knowledge/meta.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)

KNOWLEDGE_PATH = Path(CONFIG["knowledge_base"]["base_path"])
INDEX_PATH = KNOWLEDGE_PATH / CONFIG["index"]["path"]
MODEL_NAME = CONFIG["embedding"]["model_name"]
CHUNK_SIZE = CONFIG["chunking"]["chunk_size"]
CHUNK_OVERLAP = CONFIG["chunking"]["chunk_overlap"]

def load_markdown_files():
    """อ่านไฟล์ Markdown ทั้งหมดจากโฟลเดอร์ความรู้"""
    documents = []
    md_files = list(KNOWLEDGE_PATH.rglob("*.md"))
    
    print(f"📄 พบไฟล์ทั้งหมด: {len(md_files)} ไฟล์")
    
    for file_path in md_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # แยก YAML Frontmatter ออกจากเนื้อหา
            frontmatter = {}
            if content.startswith("---"):
                match = re.match(r"^---\n(.*?)\n---\n(.*)$", content, re.DOTALL)
                if match:
                    fm_text = match.group(1)
                    content = match.group(2)
                    try:
                        frontmatter = yaml.safe_load(fm_text)
                    except yaml.YAMLError:
                        pass
            
            documents.append({
                "path": str(file_path.relative_to(KNOWLEDGE_PATH)),
                "frontmatter": frontmatter,
                "content": content
            })
        except Exception as e:
            print(f"⚠️  ข้ามไฟล์ {file_path}: {e}")
    
    return documents

def split_documents(documents):
    """แบ่งเอกสารเป็นส่วนย่อยตามหัวข้อ"""
    splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=[
            ("#", "h1"),
            ("##", "h2"),
            ("###", "h3"),
        ]
    )
    
    chunks = []
    for doc in documents:
        header_chunks = splitter.split_text(doc["content"])
        
        for i, chunk in enumerate(header_chunks):
            metadata = {
                "source": doc["path"],
                "id": f"{doc['path']}#{i}",
                **doc["frontmatter"]
            }
            chunks.append(Document(
                page_content=chunk.page_content,
                metadata=metadata
            ))
    
    print(f"✂️  แบ่งเป็นส่วนย่อย: {len(chunks)} ชิ้น")
    return chunks

def build_vector_store(chunks):
    """สร้างฐานข้อมูลเวกเตอร์"""
    print(f"🤖 กำลังโหลดโมเดล Embedding: {MODEL_NAME}")
    
    embeddings = SentenceTransformerEmbeddings(
        model_name=MODEL_NAME,
        model_kwargs={"device": CONFIG["embedding"]["device"]}
    )
    
    print("📐 กำลังสร้างดัชนีเวกเตอร์...")
    vector_store = FAISS.from_documents(chunks, embeddings)
    
    # บันทึกลงดิสก์
    INDEX_PATH.mkdir(parents=True, exist_ok=True)
    vector_store.save_local(str(INDEX_PATH))
    print(f"✅ ดัชนีบันทึกที่: {INDEX_PATH}")
    print(f"📊 จำนวนรายการในดัชนี: {vector_store.index.ntotal}")
    
    return vector_store

if __name__ == "__main__":
    print("🚀 เริ่มสร้างดัชนีความรู้...")
    docs = load_markdown_files()
    chunks = split_documents(docs)
    build_vector_store(chunks)
    print("🎉 เสร็จสิ้น!")
 
 
🔧 รันสร้างดัชนีครั้งแรก
 
bash
  
python build_index.py
 
 
 
 
6. 🔍 สร้างระบบค้นหาและเรียกใช้
 
ไฟล์:  query_knowledge.py  — ค้นหาความรู้
 
python
  
#!/usr/bin/env python3
"""
ค้นหาความรู้จากดัชนีเวกเตอร์และสร้างคำตอบ
"""

import yaml
from pathlib import Path
from langchain.vectorstores import FAISS
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.prompts import PromptTemplate
from langchain.schema import format_document

# โหลดการตั้งค่า
with open(".knowledge/meta.yaml", "r", encoding="utf-8") as f:
    CONFIG = yaml.safe_load(f)

INDEX_PATH = Path(CONFIG["knowledge_base"]["base_path"]) / CONFIG["index"]["path"]
MODEL_NAME = CONFIG["embedding"]["model_name"]
TOP_K = CONFIG["retrieval"]["top_k"]
SIMILARITY_THRESHOLD = CONFIG["retrieval"]["similarity_threshold"]

# เทมเพลตสำหรับสร้างคำตอบ
ANSWER_TEMPLATE = """
คุณเป็นผู้ช่วยที่ตอบคำถามโดยอ้างอิงจากข้อมูลที่ให้ไว้เท่านั้น
หากไม่พบข้อมูลที่เกี่ยวข้อง ให้ตอบว่า "ไม่พบข้อมูลที่เกี่ยวข้องในคลังความรู้" อย่าประกอบเรื่องขึ้นเอง

ข้อมูลอ้างอิง:
{context}

คำถาม: {question}

คำตอบ:
"""

def load_vector_store():
    """โหลดดัชนีเวกเตอร์จากไฟล์"""
    embeddings = SentenceTransformerEmbeddings(
        model_name=MODEL_NAME,
        model_kwargs={"device": CONFIG["embedding"]["device"]}
    )
    return FAISS.load_local(
        str(INDEX_PATH),
        embeddings,
        allow_dangerous_deserialization=True
    )

def search_knowledge(query, filter_criteria=None):
    """ค้นหาข้อมูลที่เกี่ยวข้อง"""
    vector_store = load_vector_store()
    
    # ค้นหาพร้อมค่าความเกี่ยวข้อง
    results = vector_store.similarity_search_with_score(query, k=TOP_K)
    
    # กรองผลลัพธ์
    filtered = []
    for doc, score in results:
        # แปลงระยะทางเป็นค่าความคล้ายคลึง
        similarity = 1.0 - score
        
        if similarity < SIMILARITY_THRESHOLD:
            continue
        
        # ตรวจสอบเงื่อนไขเพิ่มเติม
        if filter_criteria:
            skip = False
            for key, value in filter_criteria.items():
                if doc.metadata.get(key) != value:
                    skip = True
                    break
            if skip:
                continue
        
        filtered.append({
            "content": doc.page_content,
            "metadata": doc.metadata,
            "similarity": round(similarity, 3)
        })
    
    return filtered

def format_answer_context(results):
    """จัดรูปแบบผลลัพธ์สำหรับส่งให้ LLM"""
    context_parts = []
    for i, item in enumerate(results, 1):
        source = item["metadata"].get("source", "ไม่ระบุ")
        context_parts.append(f"""
---
แหล่งที่มา {i}: {source}
ความเกี่ยวข้อง: {item['similarity']}
เนื้อหา:
{item['content']}
""")
    return "\n".join(context_parts)

def generate_answer(query, results):
    """สร้างคำตอบจากผลลัพธ์ที่ค้นพบ"""
    if not results:
        return "❌ ไม่พบข้อมูลที่เกี่ยวข้องในคลังความรู้"
    
    context = format_answer_context(results)
    prompt = ANSWER_TEMPLATE.format(context=context, question=query)
    
    # แสดงผลลัพธ์พร้อมแหล่งที่มา
    answer = f"✅ **พบข้อมูลที่เกี่ยวข้อง {len(results)} รายการ**\n\n"
    answer += f"**คำถาม**: {query}\n\n"
    answer += "---\n"
    
    for i, item in enumerate(results, 1):
        source = item["metadata"].get("source", "ไม่ระบุ")
        title = item["metadata"].get("title", "ไม่มีชื่อ")
        answer += f"**[{i}] {title}** ({item['similarity']})\n"
        answer += f"📄 ไฟล์: {source}\n"
        answer += f"{item['content'][:300]}...\n\n"
    
    return answer

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("การใช้งาน: python query_knowledge.py \"คำถามของคุณ\" [ประเภท]")
        sys.exit(1)
    
    query = sys.argv[1]
    category = sys.argv[2] if len(sys.argv) > 2 else None
    
    filters = {"category": category} if category else None
    
    print(f"🔍 กำลังค้นหา: {query}")
    results = search_knowledge(query, filters)
    print(generate_answer(query, results))
 
 
🧪 ทดสอบระบบค้นหา
 
bash
  
# ค้นหาทั่วไป
python query_knowledge.py "ทำไมต้องล็อกเวอร์ชัน action?"

# ค้นหาเฉพาะหมวดความปลอดภัย
python query_knowledge.py "สิทธิ์ GITHUB_TOKEN ควรตั้งค่าอย่างไร" security
 
 
 
 
7. ⚙️ ตั้งค่าการตรวจสอบและอัปเดตอัตโนมัติ
 
🔄 GitHub Actions — อัปเดตดัชนีเมื่อความรู้เปลี่ยนแปลง
 
สร้างไฟล์:  .github/workflows/update-knowledge-index.yml 
 
yaml
  
name: Update Knowledge Index
on:
  push:
    branches: [main]
    paths: [".knowledge/**"]  # ทำงานเมื่อไฟล์ความรู้เปลี่ยน

jobs:
  build-index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
          
      - name: Build vector index
        run: python build_index.py
        
      - name: Commit updated index
        run: |
          git config --local user.email "bot@example.com"
          git config --local user.name "Knowledge Bot"
          git add .knowledge/index/
          git commit -m "🤖 Update knowledge index [skip ci]" || echo "No changes to commit"
          git push
 
 
 
 
8. 📊 การวัดคุณภาพและปรับปรุง
 
เช็คลิสต์ตรวจสอบคุณภาพระบบ RAG
 
ด้าน สิ่งที่ต้องตรวจสอบ ความถี่ 
🎯 ความเกี่ยวข้อง ผลลัพธ์ที่ค้นพบตรงกับคำถามหรือไม่ รายเดือน 
📄 ความครอบคลุม มีเอกสารสำคัญครบถ้วนหรือไม่ รายไตรมาส 
⚡ ความเร็ว ค้นหาและตอบกลับเร็วพอหรือไม่ ตรวจสอบตลอดเวลา 
🔄 ความทันสมัย เนื้อหายังเป็นปัจจุบันหรือไม่ ทบทวนราย 6 เดือน 
🎯 ความถูกต้องของคำตอบ LLM ไม่แต่งเรื่องหรืออ้างอิงผิดหรือไม่ ทดสอบเป็นประจำ 
 
ปัญหาที่พบบ่อยและวิธีแก้ไข
 
ปัญหา สาเหตุที่เป็นไปได้ วิธีแก้ไข 
ค้นหาไม่เจอสิ่งที่ควรเจอ ค่า threshold สูงเกินไป ลด  similarity_threshold  จาก 0.7 เป็น 0.6 
ผลลัพธ์ไม่เกี่ยวข้อง Chunk ใหญ่เกินไป ลด  chunk_size  จาก 1000 เหลือ 500-800 
คำตอบไม่ตรงประเด็น บริบทไม่เพียงพอ เพิ่ม  top_k  จาก 3 เป็น 5-7 
ตอบช้ามาก โมเดลใหญ่เกินไปสำหรับเครื่อง เปลี่ยนเป็นโมเดลเล็กกว่า หรือใช้ GPU 
LLM แต่งข้อมูล Prompt ไม่เข้มงวดพอ

🐳 docker-compose.yml — พร้อมใช้งานทันที
 
ไฟล์นี้รวมทุกส่วนของระบบ RAG เข้าด้วยกัน — เพียงรันคำสั่งเดียว ก็จะได้ระบบทำงานครบถ้วน ✅
 
 
 
📄 ไฟล์  docker-compose.yml 
 
yaml
  
version: "3.8"

name: knowledge-rag

services:
  # ==========================================
  # 🔍 API บริการ RAG — ค้นหาและตอบคำถาม
  # ==========================================
  rag-api:
    build: .
    container_name: rag-api
    ports:
      - "8000:8000"
    volumes:
      - ./.knowledge:/app/.knowledge:ro
      - ./models:/app/models:ro
      - ./logs:/app/logs
    environment:
      - KNOWLEDGE_PATH=/app/.knowledge
      - INDEX_PATH=/app/.knowledge/index
      - EMBEDDING_MODEL=BAAI/bge-m3
      - MODEL_CACHE_DIR=/app/models
      - CHUNK_SIZE=800
      - CHUNK_OVERLAP=150
      - TOP_K=5
      - SIMILARITY_THRESHOLD=0.65
      - OLLAMA_URL=http://ollama:11434
      - LLM_MODEL=llama3.2:3b
      - LOG_LEVEL=INFO
    depends_on:
      - ollama
    restart: unless-stopped
    networks:
      - rag-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # ==========================================
  # 🧠 Ollama — LLM ทำงานในเครื่อง ไม่ต้องพึ่ง API ภายนอก
  # ==========================================
  ollama:
    image: ollama/ollama:latest
    container_name: rag-ollama
    ports:
      - "11434:11434"
    volumes:
      - ./ollama-data:/root/.ollama
    restart: unless-stopped
    networks:
      - rag-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:11434/api/tags"]
      interval: 30s
      timeout: 10s
      retries: 3

  # ==========================================
  # 🖥️  Streamlit — ส่วนติดต่อผู้ใช้ผ่านเว็บ
  # ==========================================
  web-ui:
    build:
      context: .
      dockerfile: Dockerfile.ui
    container_name: rag-ui
    ports:
      - "8501:8501"
    volumes:
      - ./.knowledge:/app/.knowledge:ro
      - ./ui-config.toml:/app/.streamlit/config.toml:ro
    environment:
      - RAG_API_URL=http://rag-api:8000
      - PAGE_TITLE=คลังความรู้ — ถาม-ตอบ
      - ENABLE_AUTH=false
    depends_on:
      - rag-api
    restart: unless-stopped
    networks:
      - rag-network

  # ==========================================
  # 📊 (ทางเลือก) Qdrant — ฐานข้อมูลเวกเตอร์ ถ้าต้องการขยายระบบ
  # ==========================================
  qdrant:
    image: qdrant/qdrant:latest
    container_name: rag-qdrant
    ports:
      - "6333:6333"
    volumes:
      - ./qdrant-storage:/qdrant/storage
    environment:
      - QDRANT_ALLOW_RESET=true
      - QDRANT_ALLOW_RECOVERY_MODE=true
    restart: unless-stopped
    networks:
      - rag-network
    profiles: ["with-qdrant"]  # เปิดใช้ด้วย: docker compose --profile with-qdrant up

networks:
  rag-network:
    driver: bridge

volumes:
  ollama-data:
  qdrant-storage:
 
 
 
 
📄 ไฟล์  .env  — ตัวอย่างการตั้งค่า
 
env
  
# === ระบบทั่วไป ===
TZ=Asia/Bangkok
ENVIRONMENT=production
LOG_LEVEL=INFO

# === RAG Core ===
KNOWLEDGE_PATH=./.knowledge
INDEX_PATH=./.knowledge/index
EMBEDDING_MODEL=BAAI/bge-m3
CHUNK_SIZE=800
CHUNK_OVERLAP=150
TOP_K=5
SIMILARITY_THRESHOLD=0.65

# === LLM via Ollama ===
OLLAMA_URL=http://ollama:11434
LLM_MODEL=llama3.2:3b
TEMPERATURE=0.1
MAX_TOKENS=2048

# === หรือใช้ OpenAI API (ไม่ต้องใช้ Ollama) ===
# USE_OPENAI=true
# OPENAI_API_KEY=sk-xxx...
# OPENAI_MODEL=gpt-4o-mini

# === UI Settings ===
PAGE_TITLE=คลังความรู้ ZyntroAI
PAGE_ICON=🧠
ENABLE_FILE_UPLOAD=false
ENABLE_ADMIN_PANEL=true
ADMIN_PASSWORD=change_me_in_production
 
 
 
 
📄  Dockerfile  สำหรับ API
 
dockerfile
  
FROM python:3.11-slim

WORKDIR /app

# ติดตั้งระบบพื้นฐาน
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ติดตั้งแพ็กเกจ Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# คัดลอกโค้ดแอปพลิเคชัน
COPY . .

# พอร์ต
EXPOSE 8000

# คำสั่งเริ่มระบบ
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
 
 
 
 
📄  Dockerfile.ui  สำหรับ Web UI
 
dockerfile
  
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements-ui.txt .
RUN pip install --no-cache-dir -r requirements-ui.txt

COPY ui/ ./

EXPOSE 8501

HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

ENTRYPOINT ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
 
 
 
 
📄  requirements.txt  (API)
 
txt
  
fastapi==0.115.0
uvicorn==0.31.0
python-multipart==0.0.12
langchain==0.3.0
langchain-community==0.3.0
sentence-transformers==3.0.0
faiss-cpu==1.9.0
pyyaml==6.0.2
python-dotenv==1.0.1
httpx==0.27.2
pydantic==2.9.2
 
 
📄  requirements-ui.txt  (Web UI)
 
txt
  
streamlit==1.39.0
requests==2.32.3
python-dotenv==1.0.1
 
 
 
 
🚀 คำสั่งเริ่มใช้งาน
 
ขั้นตอนที่ 1: เตรียมโฟลเดอร์
 
bash
  
# สร้างโฟลเดอร์จำเป็น
mkdir -p .knowledge logs models ollama-data

# วางไฟล์ความรู้ของคุณที่นี่
ls .knowledge/
 
 
ขั้นตอนที่ 2: เริ่มระบบทั้งหมด
 
bash
  
# เริ่มทุกอย่าง (แบ็กกราวด์)
docker compose up -d

# ดูสถานะ
docker compose ps

# ดูบันทึก
docker compose logs -f
 
 
ขั้นตอนที่ 3: ดาวน์โหลดโมเดล LLM ครั้งแรก
 
bash
  
# เข้าไปที่คอนเทนเนอร์ Ollama แล้วดาวน์โหลดโมเดล
docker compose exec ollama ollama pull llama3.2:3b

# หรือถ้าต้องการโมเดลที่ใหญ่กว่า
docker compose exec ollama ollama pull llama3.2:7b
 
 
ขั้นตอนที่ 4: สร้างดัชนีความรู้
 
bash
  
# รันสคริปต์สร้างดัชนีภายในคอนเทนเนอร์ API
docker compose exec rag-api python build_index.py
 
 
ขั้นตอนที่ 5: เข้าใช้งาน
 
- 🌐 Web UI: http://localhost:8501
- 🔌 API Docs: http://localhost:8000/docs
- 🧠 Ollama: http://localhost:11434
 
 
 
🎯 คำสั่งที่มักใช้บ่อย
 
คำสั่ง ทำอะไร 
 docker compose up -d  เริ่มระบบทั้งหมด 
 docker compose down  ปิดระบบทั้งหมด 
 docker compose down -v  ปิด + ล้างข้อมูลทั้งหมด ⚠️ 
 docker compose restart  รีสตาร์ททุกบริการ 
 docker compose logs -f rag-api  ดูบันทึกเฉพาะ API 
 docker compose exec ollama ollama list  ดูรายการโมเดลที่ดาวน์โหลดแล้ว 
 docker compose build --pull  รีบิลด์อิมเมจเวอร์ชันล่าสุด 
 
 
 
⚙️ เปิดใช้งาน Qdrant (ทางเลือกสำหรับระบบขนาดใหญ่)
 
ถ้าคุณมีเอกสารจำนวนมากและต้องการความสามารถขั้นสูง ให้สลับจาก FAISS ไปใช้ Qdrant:
 
bash
  
# เริ่มพร้อม Qdrant
docker compose --profile with-qdrant up -d
 
 
จากนั้นแก้การตั้งค่าใน  .env :
 
env
  
VECTOR_STORE=qdrant
QDRANT_URL=http://qdrant:6333
 
 
 
 
✅ สรุป
 
ไฟล์ชุดนี้ให้คุณ:
 
- ✅ ครบถ้วน: API + LLM + Web UI — พร้อมใช้งาน
- ✅ แยกส่วน: อัปเกรดแต่ละส่วนได้โดยไม่กระทบกัน
- ✅ ทำงานในเครื่องทั้งหมด: ไม่ต้องพึ่ง API ภายนอก
- ✅ ขยายได้: สลับใช้ Qdrant เมื่อระบบเติบโต
- ✅ รันครั้งเดียวจบ:  docker compose up  ก็เสร็จ
 
ต้องการปรับแต่งเพิ่มเติมไหมครับ เช่น เพิ่มการตรวจสอบสิทธิ์ผู้ใช้, ปรับพอร์ต, หรือเปลี่ยนโมเดล LLM 😊

📚 ชุดเอกสารเพิ่มเติม — ระบบ RAG คลังความรู้
 
จัดเตรียมเอกสารเสริมเพื่อให้ระบบสมบูรณ์ยิ่งขึ้น ✅
 
 
 
📖 เอกสารที่ 1 — คู่มือเริ่มใช้งานฉบับรวดเร็ว
 
 QUICKSTART.md 
 
markdown
  
---
title: "คู่มือเริ่มใช้งานรวดเร็ว"
type: guide
phase: deployment
created: 2026-10-27
---

# ⚡ เริ่มใช้งานระบบ RAG ใน 5 นาที

## ขั้นตอนที่ 1 — ตรวจสอบความพร้อม
- ✅ ติดตั้ง Docker และ Docker Compose แล้ว
- ✅ มีพื้นที่ว่างอย่างน้อย 5GB สำหรับโมเดลและข้อมูล
- ✅ พอร์ต 8000, 8501, 11434 ยังไม่ได้ถูกใช้งาน

## ขั้นตอนที่ 2 — เตรียมไฟล์
```bash
# คัดลอกไฟล์ตัวอย่างและแก้ไขตามความเหมาะสม
cp .env.example .env

# ตรวจสอบโครงสร้างโฟลเดอร์
ls -la
# ควรเห็น: docker-compose.yml, .env, .knowledge/, README.md
 
 
ขั้นตอนที่ 3 — เริ่มระบบ
 
bash
  
# ดาวน์โหลดอิมเมจและเริ่มคอนเทนเนอร์
docker compose up -d

# รอจนกว่าทุกบริการจะพร้อม
docker compose ps
# สถานะควรเป็น: Up (healthy)
 
 
ขั้นตอนที่ 4 — ดาวน์โหลดโมเดล
 
bash
  
# ดาวน์โหลด LLM
docker compose exec ollama ollama pull llama3.2:3b

# ตรวจสอบโมเดล
docker compose exec ollama ollama list
 
 
ขั้นตอนที่ 5 — สร้างดัชนีความรู้
 
bash
  
# สร้างดัชนีจากไฟล์ใน .knowledge/
docker compose exec rag-api python build_index.py
 
 
ขั้นตอนที่ 6 — ทดสอบ
 
🌐 เปิดเบราว์เซอร์ที่: http://localhost:8501
 
🔍 ทดสอบคำถามแรก:
 
"ระบบนี้ทำอะไรได้บ้าง?"
 
 
 
❓ ถ้ามีปัญหา
 
อาการ สิ่งที่ต้องตรวจ 
เข้าเว็บไม่ได้ รัน  docker compose ps  ดูสถานะคอนเทนเนอร์ 
ค้นหาไม่เจอ รันสร้างดัชนีอีกครั้ง →  docker compose exec rag-api python build_index.py  
โมเดลโหลดช้า ตรวจสอบพื้นที่ว่างและการเชื่อมต่ออินเทอร์เน็ต 
 
plaintext
  

---

## 📖 เอกสารที่ 2 — คู่มือการบำรุงรักษา

> `MAINTENANCE.md`

```markdown
---
title: "คู่มือการบำรุงรักษา"
type: maintenance
phase: ongoing
created: 2026-10-27
---

# 🔧 การบำรุงรักษาระบบ RAG

## 📅 ตารางกิจกรรมประจำ

| ความถี่ | กิจกรรม | คำสั่ง |
|--------|---------|--------|
| **รายวัน** | ตรวจสอบสถานะระบบ | `docker compose ps` |
| **รายสัปดาห์** | ตรวจสอบพื้นที่ดิสก์และล้าง Log | `docker system prune` |
| **รายเดือน** | อัปเดตดัชนีความรู้ | `docker compose exec rag-api python build_index.py` |
| **รายเดือน** | อัปเดตอิมเมจ Docker | `docker compose pull && docker compose up -d` |
| **รายไตรมาส** | ทบทวนและทำความสะอาดเอกสารความรู้ | ตรวจสอบไฟล์ใน `.knowledge/` |

---

## 💾 การสำรองข้อมูล

### สำรองคลังความรู้
```bash
# บีบอัดโฟลเดอร์ความรู้
tar -czf backup-knowledge-$(date +%Y%m%d).tar.gz .knowledge/

# สำรองดัชนีเวกเตอร์ด้วย
cp -r .knowledge/index/ ./backup-index-$(date +%Y%m%d)/
 
 
กู้คืนข้อมูล
 
bash
  
# แตกไฟล์สำรอง
tar -xzf backup-knowledge-20261027.tar.gz -C /path/to/restore/

# สร้างดัชนีใหม่หลังกู้คืน
docker compose exec rag-api python build_index.py
 
 
 
 
📂 จัดการพื้นที่ดิสก์
 
สิ่งที่กินพื้นที่ วิธีจัดการ 
Log ค้าง  docker compose logs > logs.txt  แล้วล้าง:  docker compose down && docker compose up -d  
โมเดลเก่าใน Ollama  docker compose exec ollama ollama rm llama3.2:3b  
ดัชนีเก่า ลบโฟลเดอร์  .knowledge/index/  แล้วสร้างใหม่ 
อิมเมจที่ไม่ใช้  docker image prune -a  
 
 
 
🔄 อัปเกรดระบบ
 
bash
  
# 1. หยุดระบบ
docker compose down

# 2. สำรองข้อมูลก่อนเสมอ
tar -czf backup-before-upgrade.tar.gz .knowledge/

# 3. ดาวน์โหลดเวอร์ชันล่าสุด
docker compose pull

# 4. เริ่มระบบใหม่
docker compose up -d

# 5. สร้างดัชนีใหม่ (ถ้าจำเป็น)
docker compose exec rag-api python build_index.py
 
 
 
 
⚠️ ปัญหาที่พบบ่อย
 
ปัญหา: ดัชนีไม่อัปเดตเมื่อแก้ไขไฟล์
 
สาเหตุ: ระบบไม่ทราบว่ามีการเปลี่ยนแปลง
วิธีแก้: รัน  docker compose exec rag-api python build_index.py  ทุกครั้งที่แก้ไขเนื้อหา
 
ปัญหา: คำตอบไม่ตรงคำถาม
 
สาเหตุ: ค่า threshold สูงเกินไป / Chunk ใหญ่เกินไป
วิธีแก้: แก้ใน  .env  — ลด  SIMILARITY_THRESHOLD  หรือลด  CHUNK_SIZE 
 
ปัญหา: คอนเทนเนอร์หยุดทำงานเอง
 
สาเหตุ: หน่วยความจำไม่พอ
วิธีแก้: เพิ่มหน่วยความจำให้ Docker หรือใช้โมเดล LLM ที่เล็กลง
 
plaintext
  

---

## 📖 เอกสารที่ 3 — คู่มือเขียนเอกสารความรู้

> `WRITING-GUIDE.md`

```markdown
---
title: "คู่มือเขียนเอกสารความรู้"
type: guide
phase: content
created: 2026-10-27
---

# ✍️ วิธีเขียนเอกสารให้ระบบ RAG ค้นหาได้แม่นยำ

## 📐 โครงสร้างมาตรฐานของเอกสาร

ทุกไฟล์ Markdown ควรมีโครงสร้างดังนี้:

```markdown
---
id: UNIQ-ID-001
title: "ชื่อเรื่องที่ชัดเจนและค้นหาง่าย"
category: guide | rule | tutorial | reference
tags: ["แท็ก1", "แท็ก2"]
---

# ชื่อเรื่องหลัก

## 🎯 สรุปสั้นๆ
อธิบายว่าเอกสารนี้เกี่ยวกับอะไรใน 1–2 ประโยคแรก

## ❓ ปัญหา
อธิบายปัญหาที่พบ

## ✅ วิธีแก้ไข
ขั้นตอนทีละขั้นตอน ชัดเจน ปฏิบัติตามได้จริง

## 💡 ตัวอย่าง
โค้ดหรือตัวอย่างการใช้งาน

## 📖 ข้อมูลอ้างอิง
ลิงก์เอกสารเพิ่มเติม
 
 
 
 
✅ หลักการเขียนเพื่อให้ค้นหาได้ดีที่สุด
 
✅ ทำ
 
- ใช้หัวข้อชัดเจน —  ## วิธีติดตั้ง  ดีกว่า  ## ขั้นตอน 
- ใส่คำสำคัญในย่อหน้าแรกเสมอ
- แบ่งเนื้อหาเป็นส่วนย่อยๆ ไม่เขียนยาวต่อกัน
- ใช้ตัวหนา คำสำคัญที่ต้องการให้ค้นพบ
- เพิ่มแท็กที่เกี่ยวข้องในส่วน Frontmatter
 
❌ หลีกเลี่ยง
 
- เขียนยาวต่อเนื่องไม่มีหัวข้อ
- ใช้คำย่อที่ไม่เป็นสากลโดยไม่อธิบาย
- คัดลอกวางโดยไม่ตัดทอนเนื้อหา
- เก็บไฟล์ที่ยังไม่เสร็จในโฟลเดอร์หลัก
 
 
 
🏷️ แท็กมาตรฐานที่แนะนำใช้
 
หมวด แท็กตัวอย่าง 
ประเภทเอกสาร  guide ,  tutorial ,  reference ,  troubleshooting ,  rule ,  faq  
หัวข้อ  github-actions ,  docker ,  security ,  best-practice ,  rag ,  ollama  
ระดับความยาก  beginner ,  intermediate ,  advanced ,  expert  
 
 
 
✅ เช็คลิสต์ก่อนเผยแพร่เอกสารใหม่
 
มี YAML Frontmatter ครบถ้วนถูกต้องหรือไม่?
มีหัวข้อหลักและหัวข้อย่อยชัดเจนหรือไม่?
มีสรุปสั้นๆ ที่ย่อหน้าแรกหรือไม่?
คำสำคัญปรากฏในส่วนต้นของเอกสารหรือไม่?
แท็กถูกต้องและสอดคล้องกับเนื้อหาหรือไม่?
ไม่มีข้อมูลลับ คีย์ API หรือรหัสผ่านแทรกอยู่หรือไม่?
รันสร้างดัชนีใหม่หลังเพิ่มเอกสารหรือไม่?
 
 
 
🔍 ทดสอบค้นหา
 
เมื่อเพิ่มเอกสารใหม่ ให้ทดสอบค้นหาด้วยคำสำคัญ 2–3 คำ เพื่อตรวจสอบว่าระบบค้นพบเอกสารของคุณหรือไม่:
 
bash
  
docker compose exec rag-api python query_knowledge.py "คำสำคัญจากเอกสารของคุณ"
 
 
plaintext
  

---

## 📖 เอกสารที่ 4 — คู่มือความปลอดภัย

> `SECURITY.md`

```markdown
---
title: "แนวทางความปลอดภัยระบบ RAG"
type: security
phase: operations
created: 2026-10-27
---

# 🔐 ความปลอดภัย — แนวทางปฏิบัติและเช็คลิสต์

## ⚠️ หลักการสำคัญ
ระบบนี้ประมวลผลความรู้ภายในองค์กร — ความปลอดภัยจึงสำคัญที่สุด

---

## 🚫 สิ่งที่ห้ามทำเด็ดขาด

- ❌ **ห้าม** เก็บคีย์ API, รหัสผ่าน หรือข้อมูลลับในไฟล์ Markdown
- ❌ **ห้าม** ส่งโฟลเดอร์ `.knowledge/` ขึ้น GitHub สาธารณะหากมีข้อมูลภายใน
- ❌ **ห้าม** เปิดพอร์ต 8501/8000 สู่อินเทอร์เน็ตโดยไม่ตั้งรหัสผ่าน
- ❌ **ห้าม** เก็บไฟล์ข้อมูลส่วนตัวในคลังความรู้

---

## ✅ แนวทางปฏิบัติที่ดี

### การควบคุมการเข้าถึง
- ✅ เปิดใช้งานการตรวจสอบสิทธิ์ในสภาพแวดล้อมการผลิต
- ✅ จำกัดการเข้าถึงพอร์ตผ่าน Firewall — อนุญาตเฉพาะ IP ภายในองค์กร
- ✅ ใช้ HTTPS หากเปิดให้เข้าถึงจากภายนอก
- ✅ แยกระดับความลับของเอกสาร: `public`, `internal`, `confidential`

### การจัดการข้อมูล
- ✅ ตรวจสอบเนื้อหาเอกสารก่อนเผยแพร่
- ✅ กำหนดวันหมดอายุเอกสารที่เป็นข้อมูลชั่วคราว
- ✅ สำรองข้อมูลเป็นประจำและเข้ารหัสไฟล์สำรอง
- ✅ ทบทวนเอกสารเก่าทุก 6 เดือนเพื่อลบข้อมูลที่ไม่จำเป็น

### การตั้งค่าระบบ
```env
# ✅ ใน .env สำหรับสภาพแวดล้อมการผลิต
ENABLE_AUTH=true
ADMIN_PASSWORD=รหัสที่ซับซ้อนและเปลี่ยนเป็นประจำ
LOG_LEVEL=WARNING
 
 
 
 
📋 เช็คลิสต์ก่อนนำไปใช้งานจริง
 
ตรวจสอบว่าไม่มีข้อมูลลับในเอกสารหรือไม่?
ตั้งรหัสผ่านสำหรับแอดมินแล้วหรือไม่?
จำกัด IP ที่เข้าถึงได้แล้วหรือไม่?
เปิดใช้งาน HTTPS แล้วหรือไม่?
ตั้งค่าการสำรองข้อมูลอัตโนมัติแล้วหรือไม่?
ทบทวนรายการเอกสารทั้งหมดแล้วหรือไม่?
กำหนดสิทธิ์ผู้ใช้งานเหมาะสมแล้วหรือไม่?
 
plaintext
  

---

## 📖 เอกสารที่ 5 — แผนพัฒนาในอนาคต

> `ROADMAP-FUTURE.md`

```markdown
---
title: "แผนพัฒนาในอนาคต"
type: roadmap
phase: planning
created: 2026-10-27
---

# 🚀 แผนพัฒนาระบบ RAG — เวอร์ชันถัดไป

## ✅ เวอร์ชันปัจจุบัน — v1.0
- ✅ ระบบ RAG พื้นฐาน (FAISS + BGE-M3 + Ollama)
- ✅ Web UI ด้วย Streamlit
- ✅ รันทั้งหมดในเครื่อง ไม่ต้องพึ่ง API ภายนอก
- ✅ Docker Compose พร้อมใช้งาน

---

## 🔮 แผนงานในอนาคต

### v1.1 — การปรับปรุงประสิทธิภาพ
- [ ] ปรับปรุงการแบ่งส่วนเอกสารอัตโนมัติให้แม่นยำยิ่งขึ้น
- [ ] เพิ่มการตรวจสอบความถูกต้องของคำตอบ
- [ ] แสดงแหล่งที่มาพร้อมลิงก์ไปยังไฟล์ต้นฉบับ
- [ ] ปรับความเร็วในการค้นหา

### v1.2 — ความสามารถเพิ่มเติม
- [ ] อัปโหลดไฟล์ PDF/Word โดยระบบแยกเนื้อหาอัตโนมัติ
- [ ] การเปรียบเทียบเอกสารเวอร์ชันต่างๆ
- [ ] คำถามที่พบบ่อย (FAQ) แนะนำอัตโนมัติ
- [ ] สถิติการใช้งานและคำถามยอดนิยม

### v2.0 — ระบบระดับองค์กร
- [ ] ผู้ใช้และสิทธิ์แยกตามกลุ่ม
- [ ] อนุมัติเอกสารก่อนเผยแพร่
- [ ] การเชื่อมต่อกับแหล่งความรู้ภายนอก (Confluence, Notion, Google Drive)
- [ ] รองรับหลายภาษาและแปลเนื้อหาอัตโนมัติ
- [ ] กระบวนการทำงานร่วมกันในการเขียนและตรวจสอบความรู้

---

## 💡 แนวคิดอื่นๆ ที่อาจเพิ่มเข้ามา
- 🔲 **รองรับภาพและตาราง** — ดึงข้อมูลจากภาพ/ตารางมาตอบคำถาม
- 📊 **แดชบอร์ดความรู้** — ดูภาพรวมว่ามีความรู้เรื่องอะไรบ้าง และเรื่องไหนขาดหาย
- 🔔 **แจ้งเตือนเมื่อมีเนื้อหาใหม่** — แจ้งทีมเมื่อเพิ่มความรู้ที่เกี่ยวข้องกับงานของพวกเขา
- 🌐 **ค้นหาข้ามคลังความรู้** — เชื่อมหลายคลังความรู้เข้าด้วยกัน

---

## 🤝 มีสิ่งที่ต้องการเพิ่มไหม?
ถ้าคุณมีความต้องการหรือไอเดียใหม่ๆ สามารถแจ้งได้ครับ!
 
 
 
 
📊 สรุปไฟล์ใหม่ทั้งหมด
 
# ชื่อไฟล์ วัตถุประสงค์ 
1  QUICKSTART.md  เริ่มใช้งานได้เร็วที่สุด 
2  MAINTENANCE.md  ดูแลรักษาระบบเมื่อนำไปใช้จริง 
3  WRITING-GUIDE.md  เขียนเอกสารความรู้ให้ค้นหาได้ดีที่สุด 
4  SECURITY.md  แนวทางความปลอดภัยและเช็คลิสต์ 
5  ROADMAP-FUTURE.md  แผนพัฒนาและทิศทางในอนาคต 
 
ต้องการสร้างเอกสารหัวข้ออื่นๆ อีกไหมครับ 😊[]()