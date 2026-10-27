SHA-Validation-Tests

`SHA-Validation-Tests` ควรเป็นชุดทดสอบที่ตรวจว่า **content hash ถูกสร้างถูกต้อง, ตรวจจับไฟล์ที่เปลี่ยน, ปฏิเสธ input ผิดรูปแบบ, และ cache JSON/NPZ ยังสอดคล้องกัน** ใช้ `hashlib.sha256()` สำหรับ hash และ pytest สำหรับ test/assertion/fixture[1][2][3]

## โครงสร้าง test

```text
tests/
├── conftest.py
├── test_sha_validation.py
└── test_semantic_cache_integrity.py
```

ติดตั้ง:

```bash
pip install pytest
```

รัน:

```bash
pytest -q
```

## ฟังก์ชันที่ต้องมี

ใน `server.py` หรือ `sha_utils.py`:

```python
import hashlib

def compute_sha256(text: str) -> str:
    """Return the lowercase SHA-256 digest of UTF-8 text."""
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def validate_sha256(value: str) -> bool:
    """Return True only for a valid 64-character lowercase SHA-256 digest."""
    if not isinstance(value, str):
        return False

    return len(value) == 64 and all(
        character in "0123456789abcdef"
        for character in value
    )
```

Python `hashlib.sha256()` รับ bytes-like input ผ่าน `update()` หรือ constructor และสร้าง digest ได้; SHA-256 ผลลัพธ์เป็น 256-bit digest หรือ 64 hex characters[1][4]

## `tests/test_sha_validation.py`

```python
import pytest

from server import compute_sha256, validate_sha256


def test_sha256_of_empty_string():
    assert compute_sha256("") == (
        "e3b0c44298fc1c149afbf4c8996fb924"
        "27ae41e4649b934ca495991b7852b855"
    )


def test_sha256_known_vector():
    # NIST reference: SHA-256("abc")
    assert compute_sha256("abc") == (
        "ba7816bf8f01cfea414140de5dae2223"
        "b00361a396177a9cb410ff61f20015ad"
    )


def test_sha256_is_deterministic():
    text = "Obsidian Agent OS"

    assert compute_sha256(text) == compute_sha256(text)


def test_sha256_detects_content_change():
    original = compute_sha256("original note")
    changed = compute_sha256("original note changed")

    assert original != changed


def test_sha256_is_lowercase_hex():
    digest = compute_sha256("test")

    assert digest == digest.lower()
    assert validate_sha256(digest)


@pytest.mark.parametrize(
    "invalid_value",
    [
        "",
        "abc",
        "z" * 64,
        "A" * 64,
        "0123456789abcdef" * 4 + "x",
        123,
        None,
    ],
)
def test_validate_sha256_rejects_invalid_values(invalid_value):
    assert validate_sha256(invalid_value) is False


def test_validate_sha256_accepts_valid_digest():
    digest = compute_sha256("valid")

    assert validate_sha256(digest) is True
```

NIST ระบุตัวอย่างมาตรฐานว่า SHA-256 ของ `"abc"` คือ `ba7816bf...f20015ad`; การใส่ known test vector ไว้ใน test ช่วยยืนยันว่า implementation ไม่ผิด[5]

## `tests/conftest.py`

```python
import json
from pathlib import Path

import numpy as np
import pytest


@pytest.fixture
def semantic_cache(tmp_path):
    """Create a small valid semantic cache for integration tests."""
    cache_dir = tmp_path / ".obsidian-mcp"
    cache_dir.mkdir()

    json_path = cache_dir / "semantic-index.json"
    npz_path = cache_dir / "semantic-index.npz"

    chunk_id = "10-knowledge/note.md::0"
    metadata = {
        chunk_id: {
            "relative_path": "10-knowledge/note.md",
            "title": "Note",
            "heading": "Overview",
            "content": "Semantic search example",
            "content_hash": (
                "a" * 64
            ),
        }
    }

    json_path.write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    np.savez_compressed(
        npz_path,
        chunk_ids=np.array([chunk_id], dtype=object),
        vectors=np.array([[0.1] * 384], dtype=np.float32),
    )

    return {
        "json_path": json_path,
        "npz_path": npz_path,
        "metadata": metadata,
        "chunk_ids": [chunk_id],
    }
```

pytest fixtures ใช้สร้าง test context ที่คาดเดาได้และ teardown อัตโนมัติ; `tmp_path` เป็น built-in fixture สำหรับ temporary directory[6][7]

## `tests/test_semantic_cache_integrity.py`

```python
import json

import numpy as np
import pytest

from server import validate_semantic_cache


def test_valid_cache_passes(semantic_cache):
    report = validate_semantic_cache(
        json_path=semantic_cache["json_path"],
        npz_path=semantic_cache["npz_path"],
    )

    assert report["valid"] is True
    assert report["errors"] == []
    assert report["chunk_count"] == 1
    assert report["vector_dimension"] == 384


def test_missing_json_cache_fails(semantic_cache):
    semantic_cache["json_path"].unlink()

    report = validate_semantic_cache(
        json_path=semantic_cache["json_path"],
        npz_path=semantic_cache["npz_path"],
    )

    assert report["valid"] is False
    assert "JSON cache file does not exist" in report["errors"]


def test_missing_npz_cache_fails(semantic_cache):
    semantic_cache["npz_path"].unlink()

    report = validate_semantic_cache(
        json_path=semantic_cache["json_path"],
        npz_path=semantic_cache["npz_path"],
    )

    assert report["valid"] is False
    assert "NPZ cache file does not exist" in report["errors"]


def test_invalid_json_fails(semantic_cache):
    semantic_cache["json_path"].write_text("{invalid json", encoding="utf-8")

    report = validate_semantic_cache(
        json_path=semantic_cache["json_path"],
        npz_path=semantic_cache["npz_path"],
    )

    assert report["valid"] is False
    assert any("Invalid JSON cache" in error for error in report["errors"])


def test_mismatched_chunk_count_fails(semantic_cache):
    data = np.load(semantic_cache["npz_path"], allow_pickle=False)

    np.savez_compressed(
        semantic_cache["npz_path"],
        chunk_ids=data["chunk_ids"],
        vectors=data["vectors"][:-1],
    )

    report = validate_semantic_cache(
        json_path=semantic_cache["json_path"],
        npz_path=semantic_cache["npz_path"],
    )

    assert report["valid"] is False
    assert any(
        "does not match vector count" in error
        for error in report["errors"]
    )


def test_nan_vector_fails(semantic_cache):
    data = np.load(semantic_cache["npz_path"], allow_pickle=False)
    vectors = data["vectors"].copy()
    vectors[0][0] = np.nan

    np.savez_compressed(
        semantic_cache["npz_path"],
        chunk_ids=data["chunk_ids"],
        vectors=vectors,
    )

    report = validate_semantic_cache(
        json_path=semantic_cache["json_path"],
        npz_path=semantic_cache["npz_path"],
    )

    assert report["valid"] is False
    assert any("NaN or infinity" in error for error in report["errors"])


def test_wrong_embedding_dimension_fails(semantic_cache):
    report = validate_semantic_cache(
        json_path=semantic_cache["json_path"],
        npz_path=semantic_cache["npz_path"],
        expected_embedding_dimension=768,
    )

    assert report["valid"] is False
    assert any(
        "Expected embedding dimension 768" in error
        for error in report["errors"]
    )


def test_missing_metadata_fails(semantic_cache):
    metadata = json.loads(
        semantic_cache["json_path"].read_text(encoding="utf-8")
    )

    chunk_id = semantic_cache["chunk_ids"][0]
    del metadata[chunk_id]

    semantic_cache["json_path"].write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    report = validate_semantic_cache(
        json_path=semantic_cache["json_path"],
        npz_path=semantic_cache["npz_path"],
    )

    assert report["valid"] is False
    assert any(
        "Missing JSON metadata" in error
        for error in report["errors"]
    )
```

## Content-hash integration test

เพิ่มใน `tests/test_sha_validation.py`:

```python
def test_cache_content_hash_detects_note_change(semantic_cache):
    metadata = json.loads(
        semantic_cache["json_path"].read_text(encoding="utf-8")
    )

    chunk_id = semantic_cache["chunk_ids"][0]
    original_hash = metadata[chunk_id]["content_hash"]

    changed_content = metadata[chunk_id]["content"] + " updated"
    changed_hash = compute_sha256(changed_content)

    assert original_hash != changed_hash
    assert validate_sha256(changed_hash) is True
```

## Test coverage ที่แนะนำ

| กลุ่ม | ต้องทดสอบ |
|---|---|
| SHA-256 | empty string, known vector, deterministic, changed content, lowercase format |
| Input validation | ความยาวไม่ 64, ตัวอักษรนอก hex, uppercase, non-string |
| Cache existence | JSON หาย, NPZ หาย |
| Cache format | JSON พัง, NPZ อ่านไม่ได้, key หาย |
| Cache consistency | จำนวน ID/vector ไม่เท่า, ID ซ้ำ, metadata หาย |
| Vector integrity | NaN, Inf, dimension ผิด |
| Provenance | content hash เปลี่ยนเมื่อเนื้อหาเปลี่ยน |
| Security | ปฏิเสธ path traversal และไม่ใช้ `allow_pickle=True` |

pytest รองรับ `assert`, `pytest.raises()` สำหรับ expected exception, fixtures และ parametrize สำหรับทดสอบหลาย input อัตโนมัติ  การใส่ known SHA-256 vector ของ `"abc"` ช่วยให้มั่นใจว่า hashing implementation ถูกต้องตามมาตรฐาน[2][3][5][8]

การอ้างอิง:
[1] hashlib — Secure hashes and message digests — Python 3.14.8 ... https://docs.python.org/3/library/hashlib.html
[2] Full pytest documentation https://docs.pytest.org/en/stable/contents.html
[3] Get Started - pytest documentation https://docs.pytest.org/en/stable/getting-started.html
[4] docs.python.org › 3 › libraryhashlib — Secure hashes and message digests — Python 3.11.17 ... https://docs.python.org/3.11//library/hashlib.html
[5] NSRL Test Data - NIST https://www.nist.gov/itl/ssd/software-quality-group/nsrl-test-data
[6] How to use fixtures https://docs.pytest.org/en/stable/how-to/fixtures.html
[7] Fixtures reference¶ https://docs.pytest.org/en/latest/reference/fixtures.html
[8] About fixtures¶ https://docs.pytest.org/en/stable/explanation/fixtures.html
[9] — Secure hashes and message digests¶ https://docs.python.org/3.7/library/hashlib.html
[10] Secure Hashes and Message Digests https://docs.python.org/3.9/library/hashlib.html
[11] hashlib — Secure hashes and message digests — Python 3.13.16 ... https://docs.python.org/3.13/library/hashlib.html
[12] About Fixtures https://docs.pytest.org/en/7.1.x/explanation/fixtures.html
[13] Fixtures reference https://docs.pytest.org/en/stable/reference/fixtures.html
[14] _pytest.assertion - pytest documentation https://docs.pytest.org/en/stable/_modules/_pytest/assertion.html
[15] How-to Guides https://docs.pytest.org/en/7.1.x/how-to/index.html
วิธีใช้ pytest parametrize กับเทสนี้

ใช้ `@pytest.mark.parametrize` เพื่อรัน test เดียวกันหลาย input โดยไม่ต้อง copy function ซ้ำ เหมาะกับ `SHA-Validation-Tests` เช่น ทดสอบ hash format, invalid digest, empty string, และ cache error หลายแบบใน test function เดียว pytest จะสร้าง test case แยกสำหรับแต่ละชุด argument และแสดง ID ของ case ที่ fail ให้เห็นชัด[1][2]

## รูปแบบพื้นฐาน

```python
import pytest

from server import validate_sha256


@pytest.mark.parametrize(
    "digest, expected",
    [
        ("a" * 64, True),
        ("A" * 64, False),
        ("abc", False),
        ("", False),
        (None, False),
        (123, False),
    ],
)
def test_validate_sha256(digest, expected):
    assert validate_sha256(digest) is expected
```

pytest จะรัน 6 ครั้ง:

```text
test_validate_sha256[aaaaaaaa...-True]
test_validate_sha256[AAAAAAAA...-False]
test_validate_sha256[abc-False]
test_validate_sha256[-False]
test_validate_sha256[None-False]
test_validate_sha256[123-False]
```

รูปแบบมาตรฐานคือ `@pytest.mark.parametrize("argnames", argvalues)` โดย `argvalues` เป็น list ของค่าหรือ tuple; pytest จะเรียก test function หนึ่งครั้งต่อหนึ่งชุดค่า[2][3]

## ใช้กับ SHA Validation

สมมติ `server.py` มี:

```python
import hashlib


def compute_sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def validate_sha256(value: str) -> bool:
    if not isinstance(value, str):
        return False

    return (
        len(value) == 64
        and all(character in "0123456789abcdef" for character in value)
    )
```

สร้าง `tests/test_sha_validation.py`:

```python
import pytest

from server import compute_sha256, validate_sha256


@pytest.mark.parametrize(
    "text, expected_digest",
    [
        (
            "",
            "e3b0c44298fc1c149afbf4c8996fb924"
            "27ae41e4649b934ca495991b7852b855",
        ),
        (
            "abc",
            "ba7816bf8f01cfea414140de5dae2223"
            "b00361a396177a9cb410ff61f20015ad",
        ),
        (
            "Obsidian Agent OS",
            compute_sha256("Obsidian Agent OS"),
        ),
    ],
    ids=[
        "empty-string",
        "nist-known-vector",
        "normal-text",
    ],
)
def test_compute_sha256_known_values(text, expected_digest):
    assert compute_sha256(text) == expected_digest


@pytest.mark.parametrize(
    "invalid_digest",
    [
        "",
        "abc",
        "z" * 64,
        "A" * 64,
        "0123456789abcdef" * 4 + "x",
        123,
        None,
        [],
        {},
    ],
    ids=[
        "empty",
        "too-short",
        "invalid-characters",
        "uppercase",
        "too-long",
        "integer",
        "none",
        "list",
        "dict",
    ],
)
def test_validate_sha256_rejects_invalid_values(invalid_digest):
    assert validate_sha256(invalid_digest) is False


@pytest.mark.parametrize(
    "text",
    [
        "note",
        "MCP server",
        "semantic search",
        "SHA validation",
    ],
)
def test_compute_sha256_is_deterministic(text):
    assert compute_sha256(text) == compute_sha256(text)
```

`ids` ทำให้ชื่อ test อ่านง่าย เช่น `test_validate_sha256_rejects_invalid_values[uppercase]` และช่วยให้รันเฉพาะ case ด้วย `-k` ได้[1][4]

## ใช้หลาย argument

สำหรับ semantic cache ให้ parametrize “สถานการณ์” กับ “ผลที่คาดหวัง”:

```python
import json

import numpy as np
import pytest

from server import validate_semantic_cache


@pytest.mark.parametrize(
    "cache_state, expected_valid, expected_error_part",
    [
        (
            "valid",
            True,
            None,
        ),
        (
            "missing_json",
            False,
            "JSON cache file does not exist",
        ),
        (
            "missing_npz",
            False,
            "NPZ cache file does not exist",
        ),
        (
            "invalid_json",
            False,
            "Invalid JSON cache",
        ),
        (
            "mismatched_counts",
            False,
            "does not match vector count",
        ),
        (
            "nan_vector",
            False,
            "NaN or infinity",
        ),
    ],
    ids=[
        "valid-cache",
        "missing-json",
        "missing-npz",
        "invalid-json",
        "count-mismatch",
        "nan-vector",
    ],
)
def test_validate_semantic_cache(
    semantic_cache,
    cache_state,
    expected_valid,
    expected_error_part,
):
    if cache_state == "missing_json":
        semantic_cache["json_path"].unlink()

    elif cache_state == "missing_npz":
        semantic_cache["npz_path"].unlink()

    elif cache_state == "invalid_json":
        semantic_cache["json_path"].write_text(
            "{invalid-json",
            encoding="utf-8",
        )

    elif cache_state == "mismatched_counts":
        data = np.load(
            semantic_cache["npz_path"],
            allow_pickle=False,
        )

        np.savez_compressed(
            semantic_cache["npz_path"],
            chunk_ids=data["chunk_ids"],
            vectors=data["vectors"][:-1],
        )

    elif cache_state == "nan_vector":
        data = np.load(
            semantic_cache["npz_path"],
            allow_pickle=False,
        )

        vectors = data["vectors"].copy()
        vectors[0][0] = np.nan

        np.savez_compressed(
            semantic_cache["npz_path"],
            chunk_ids=data["chunk_ids"],
            vectors=vectors,
        )

    report = validate_semantic_cache(
        json_path=semantic_cache["json_path"],
        npz_path=semantic_cache["npz_path"],
    )

    assert report["valid"] is expected_valid

    if expected_error_part:
        assert any(
            expected_error_part in error
            for error in report["errors"]
        )
```

## ใช้ `pytest.param`

ใช้เมื่อต้องการตั้งชื่อ หรือ mark case ใด case หนึ่งแยก:

```python
@pytest.mark.parametrize(
    "digest, expected",
    [
        pytest.param(
            "a" * 64,
            True,
            id="valid-lowercase-sha256",
        ),
        pytest.param(
            "A" * 64,
            False,
            id="uppercase-not-allowed",
        ),
        pytest.param(
            None,
            False,
            id="none-is-invalid",
            marks=pytest.mark.slow,
        ),
    ],
)
def test_validate_sha256(digest, expected):
    assert validate_sha256(digest) is expected
```

`pytest.param` ใช้กำหนด `id` หรือ `marks` ให้แต่ละ parameter set ได้ และ `marks=pytest.mark.slow` ทำให้เลือกข้าม/รันเฉพาะ group นั้นได้[1][5]

## รันเฉพาะ case

```bash
pytest tests/test_sha_validation.py -q
```

รันเฉพาะ invalid digest:

```bash
pytest -k "rejects_invalid_values" -q
```

รันเฉพาะ uppercase:

```bash
pytest -k "uppercase" -q
```

รันเฉพาะ cache test:

```bash
pytest -k "semantic_cache" -q
```

pytest ใช้ generated test IDs ร่วมกับ `-k` เพื่อเลือก case และระบุ case ที่ fail ได้[1][4]

## แบบไหนควรใช้

| สถานการณ์ | ใช้ |
|---|---|
| ทดสอบ hash format หลายแบบ | `parametrize` |
| ทดสอบ invalid SHA หลายรูปแบบ | `parametrize` + `ids` |
| ทดสอบ cache หลาย failure mode | `parametrize` + fixture |
| ทดสอบ embedding dimension หลายค่า | `parametrize` |
| ต้องการ setup ซับซ้อนต่อ case | `fixture(params=[...])` |
| ต้องการ mark case ช้าหรือ optional | `pytest.param(marks=...)` |

`@pytest.fixture(params=[...])` ก็ parametrize ได้เช่นกัน โดยค่าที่ส่งเข้า fixture จะอยู่ใน `request.param`; เหมาะเมื่อแต่ละ case ต้องสร้างไฟล์หรือ environment ต่างกัน[6][7]

การอ้างอิง:
[1] Parametrizing tests https://docs.pytest.org/en/stable/example/parametrize.html
[2] How to parametrize fixtures and test functions https://docs.pytest.org/en/stable/how-to/parametrize.html
[3] How to parametrize fixtures and test functions¶ https://docs.pytest.org/en/latest/how-to/parametrize.html
[4] Parametrizing tests — pytest documentation https://docs.pytest.org/en/7.1.x/example/parametrize.html
[5] API Reference https://docs.pytest.org/en/stable/reference/reference.html
[6] docs.pytest.org › en › 4pytest fixtures: explicit, modular, scalable https://docs.pytest.org/en/4.6.x/fixture.html
[7] pytest fixtures: explicit, modular, scalable ¶ https://docs.pytest.org/en/6.2.x/fixture.html
[8] Parametrizing fixtures and test functions — pytest documentation https://docs.pytest.org/en/4.6.x/parametrize.html
[9] PROPOSAL: Parametrize with fixtures https://docs.pytest.org/en/stable/proposals/parametrize_with_fixtures.html
[10] Get Started — pytest documentation https://docs.pytest.org/en/7.1.x/getting-started.html
[11] Installation and Getting Started — pytest documentation https://docs.pytest.org/en/6.2.x/getting-started.html
[12] Installation and Getting Started - pytest documentation https://docs.pytest.org/en/4.6.x/getting-started.html

วิธีตั้งชื่อ test id ใน pytest parametrize ให้ดูง่าย

ตั้งชื่อ test ID ให้อ่านง่ายด้วย `ids=[...]` หรือ `pytest.param(..., id="...")` โดยใช้ชื่อที่บอก **สิ่งที่ทดสอบ + เงื่อนไข + ผลลัพธ์ที่คาดหวัง** pytest จะนำ ID ไปแสดงใน test report และใช้เลือก test ด้วย `-k` ได้[1][2]

## หลักตั้งชื่อ

ใช้รูปแบบสั้น ๆ:

```text
[สิ่งที่ทดสอบ]-[เงื่อนไข]-[ผลลัพธ์]
```

ตัวอย่างที่ดี:

```text
valid-lowercase-sha256
uppercase-sha256-rejected
empty-string-accepted
nan-vector-rejected
missing-json-cache-fails
```

หลีกเลี่ยง:

```text
test1
case-2
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-True
```

## วิธีที่ 1: `ids=[...]`

เหมาะเมื่อจำนวน ID เท่ากับจำนวน parameter sets:

```python
import pytest

from server import validate_sha256


@pytest.mark.parametrize(
    "digest, expected",
    [
        ("a" * 64, True),
        ("A" * 64, False),
        ("abc", False),
        ("", False),
        (None, False),
    ],
    ids=[
        "valid-lowercase-sha256",
        "uppercase-sha256-rejected",
        "short-digest-rejected",
        "empty-string-rejected",
        "none-rejected",
    ],
)
def test_validate_sha256(digest, expected):
    assert validate_sha256(digest) is expected
```

ผลลัพธ์:

```text
test_validate_sha256[valid-lowercase-sha256]
test_validate_sha256[uppercase-sha256-rejected]
test_validate_sha256[short-digest-rejected]
test_validate_sha256[empty-string-rejected]
test_validate_sha256[none-rejected]
```

`ids` ต้องเรียงตรงกับ `argvalues` ทีละตัว และรองรับ string, int, float, bool หรือ `None`[1][2]

## วิธีที่ 2: `pytest.param(id=...)`

เหมาะเมื่อต้องการตั้งชื่อเฉพาะบาง case หรือใส่ mark:

```python
@pytest.mark.parametrize(
    "digest, expected",
    [
        pytest.param(
            "a" * 64,
            True,
            id="valid-lowercase-sha256",
        ),
        pytest.param(
            "A" * 64,
            False,
            id="uppercase-not-allowed",
        ),
        pytest.param(
            None,
            False,
            id="none-is-invalid",
            marks=pytest.mark.slow,
        ),
    ],
)
def test_validate_sha256(digest, expected):
    assert validate_sha256(digest) is expected
```

`pytest.param(..., id="...")` ให้ผลลัพธ์ชื่อ test เช่น:

```text
test_validate_sha256[valid-lowercase-sha256]
test_validate_sha256[uppercase-not-allowed]
test_validate_sha256[none-is-invalid]
```

`id` ใช้กำหนดชื่อของ parameter set หนึ่ง ๆ ได้โดยตรง และ `marks` ใช้แยกกลุ่ม test เช่น slow หรือ integration[2]

## วิธีที่ 3: callable `ids`

เหมาะเมื่อค่า input ยาวหรือ generate แบบ dynamic เช่น SHA digest:

```python
def sha_id(value):
    if isinstance(value, str) and len(value) == 64:
        return "valid-sha256"

    if isinstance(value, str):
        return f"invalid-{len(value)}-chars"

    return f"invalid-{type(value).__name__}"


@pytest.mark.parametrize(
    "digest, expected",
    [
        ("a" * 64, True),
        ("abc", False),
        ("A" * 64, False),
        (None, False),
        (123, False),
    ],
    ids=sha_id,
)
def test_validate_sha256(digest, expected):
    assert validate_sha256(digest) is expected
```

ผลลัพธ์:

```text
test_validate_sha256[valid-sha256]
test_validate_sha256[invalid-3-chars]
test_validate_sha256[invalid-64-chars]
test_validate_sha256[invalid-NoneType]
test_validate_sha256[invalid-int]
```

`ids` รับ callable ได้ โดย pytest จะเรียก function นั้นกับแต่ละ `argvalue` และใช้ string ที่ return เป็นส่วนหนึ่งของ test ID; ถ้า return `None` จะใช้ auto-generated ID[1][3]

## ตัวอย่างกับ Semantic Cache

```python
@pytest.mark.parametrize(
    "cache_state, expected_valid, expected_error",
    [
        pytest.param(
            "valid",
            True,
            None,
            id="valid-cache-passes",
        ),
        pytest.param(
            "missing_json",
            False,
            "JSON cache file does not exist",
            id="missing-json-cache-fails",
        ),
        pytest.param(
            "missing_npz",
            False,
            "NPZ cache file does not exist",
            id="missing-npz-cache-fails",
        ),
        pytest.param(
            "invalid_json",
            False,
            "Invalid JSON cache",
            id="invalid-json-cache-fails",
        ),
        pytest.param(
            "nan_vector",
            False,
            "NaN or infinity",
            id="nan-vector-rejected",
        ),
    ],
)
def test_validate_semantic_cache(
    semantic_cache,
    cache_state,
    expected_valid,
    expected_error,
):
    ...
```

ผลลัพธ์:

```text
test_validate_semantic_cache[valid-cache-passes]
test_validate_semantic_cache[missing-json-cache-fails]
test_validate_semantic_cache[missing-npz-cache-fails]
test_validate_semantic_cache[invalid-json-cache-fails]
test_validate_semantic_cache[nan-vector-rejected]
```

## แนวปฏิบัติ

- ใช้ **kebab-case** เช่น `valid-cache-passes`
- อย่าใส่ SHA hash เต็มใน ID เพราะทำให้ output ยาวและอ่านยาก
- ตั้งชื่อตาม **behavior** ไม่ใช่หมายเลข เช่น `uppercase-rejected` ดีกว่า `case-2`
- ใช้ `ids=[...]` เมื่อ case น้อยและคงที่
- ใช้ `pytest.param(id=...)` เมื่อต้องการชื่อเฉพาะหรือ mark ราย case
- ใช้ callable `ids` เมื่อค่า input เป็น hash, path, JSON หรือ object ที่ยาว
- อย่าใส่ข้อมูลลับ เช่น token, API key หรือ path ส่วนตัวลงใน test ID

pytest รองรับทั้ง `ids` เป็น sequence หรือ callable, และ `pytest.param(..., id=...)`; ถ้าไม่กำหนด จะสร้าง ID อัตโนมัติจากค่า parameter ซึ่งมักยาวและอ่านยากสำหรับ hash หรือ object[1][2]

การอ้างอิง:
[1] Source code for _pytest.python https://docs.pytest.org/en/stable/_modules/_pytest/python.html
[2] API Reference¶ https://docs.pytest.org/en/latest/reference/reference.html
[3] Reference — pytest documentation https://docs.pytest.org/en/4.6.x/reference.html
[4] API Reference - pytest documentation https://docs.pytest.org/en/7.1.x/reference/reference.html
[5] Parametrizing fixtures and test functions — pytest documentation https://docs.pytest.org/en/6.2.x/parametrize.html
[6] parametrize https://pypi.org/project/parametrize/
[7] pytest - Skill | Smithery https://smithery.ai/skills/bobmatnyc/pytest
[8] qaskills.sh › blog › pytest-parametrize-completePytest Parametrize: The Complete Guide for 2026 (with ... https://qaskills.sh/blog/pytest-parametrize-complete-guide-2026
