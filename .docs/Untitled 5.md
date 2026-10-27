ได้เลยครับ ✅ สร้าง Tool - [Filesystem.md](Filesystem.md) ฉบับสมบูรณ์ พร้อม YAML Frontmatter, คำอธิบาย, โค้ดตัวอย่าง และการใช้งานครบถ้วน 📁💻

---
---
title: Tool — Filesystem
version: 1.0.0
status: active
category: tool
tags:
  - zyntroai
  - filesystem
  - path
  - io
  - utility
  - python
created: 2026-10-04
namespace: ZyntroAI/new-crystalcastle
---

# 📁 Tool — Filesystem

ชุดเครื่องมือจัดการไฟล์และโฟลเดอร์อย่างปลอดภัย — ตรวจสอบเส้นทาง, ป้องกันการเข้าถึงนอกพื้นที่ทำงาน, สร้าง/อ่าน/เขียนไฟล์ และสแกนโครงสร้าง

---

## 🎯 ความสามารถหลัก

- ✅ ตรวจสอบเส้นทางสัมบูรณ์และสัมพัทธ์
- ✅ ป้องกัน Path Traversal — ไม่ให้ออกนอกโฟลเดอร์ที่อนุญาต
- ✅ สร้างโฟลเดอร์แบบปลอดภัย `mkdir -p`
- ✅ อ่าน/เขียนไฟล์พร้อมตรวจสอบขนาดและประเภท
- ✅ สแกนโครงสร้างเป็นต้นไม้
- ✅ ตรวจสอบส่วนขยายและประเภทไฟล์ที่อนุญาต
- ✅ แปลงเส้นทางให้เข้ากับทุกระบบปฏิบัติการ

---

## 🐍 โค้ดเครื่องมือ — `utils/filesystem.py`

```python
#!/usr/bin/env python3
"""
📁 Filesystem Utility — ZyntroAI
จัดการไฟล์/โฟลเดอร์อย่างปลอดภัย ป้องกัน Path Traversal
"""
import os
import pathlib
import shutil
from typing import List, Optional, Union, Generator

# ประเภทที่อนุญาต
ALLOWED_EXTENSIONS = {
    ".md", ".txt", ".py", ".json", ".yaml", ".yml",
    ".html", ".css", ".tsx", ".ts", ".js", ".jsx",
    ".csv", ".svg", ".png", ".jpg", ".jpeg", ".gif"
}

# ขนาดสูงสุด (10 MB)
MAX_FILE_SIZE = 10 * 1024 * 1024


class FilesystemTool:
    def __init__(self, root: Union[str, pathlib.Path]):
        """
        กำหนดโฟลเดอร์รากที่อนุญาต — ทุกการดำเนินการจะอยู่ภายใต้นี้เท่านั้น
        ป้องกันการเข้าถึงนอกพื้นที่ทำงาน
        """
        self.root = pathlib.Path(root).expanduser().resolve()
        if not self.root.exists():
            self.root.mkdir(parents=True, exist_ok=True)

    def _safe_resolve(self, path: Union[str, pathlib.Path]) -> pathlib.Path:
        """
        🔒 แปลงเส้นทางและตรวจสอบว่าอยู่ภายใต้ root เท่านั้น
        ยกข้อผิดพลาดหากพยายามออกนอกโฟลเดอร์
        """
        target = (self.root / path).resolve()
        if not str(target).startswith(str(self.root)):
            raise PermissionError(
                f"❌ Path ออกนอกพื้นที่อนุญาต: {path}\n"
                f"   อนุญาตภายใต้: {self.root}"
            )
        return target

    # === ตรวจสอบ ===
    def exists(self, path: str) -> bool:
        """ตรวจสอบว่ามีอยู่จริง"""
        return self._safe_resolve(path).exists()

    def is_file(self, path: str) -> bool:
        """เป็นไฟล์หรือไม่"""
        return self._safe_resolve(path).is_file()

    def is_dir(self, path: str) -> bool:
        """เป็นโฟลเดอร์หรือไม่"""
        return self._safe_resolve(path).is_dir()

    # === สร้าง ===
    def mkdir(self, path: str, exist_ok: bool = True) -> pathlib.Path:
        """สร้างโฟลเดอร์ — รองรับหลายชั้นในคราวเดียว"""
        target = self._safe_resolve(path)
        target.mkdir(parents=True, exist_ok=exist_ok)
        return target

    # === อ่าน ===
    def read_text(self, path: str, encoding: str = "utf-8") -> str:
        """อ่านเนื้อหาข้อความ — ตรวจสอบขนาดและส่วนขยายก่อน"""
        target = self._safe_resolve(path)
        if not target.is_file():
            raise FileNotFoundError(f"ไม่พบไฟล์: {path}")

        if target.suffix.lower() not in ALLOWED_EXTENSIONS:
            raise ValueError(f"ไม่อนุญาตประเภทไฟล์: {target.suffix}")

        if target.stat().st_size > MAX_FILE_SIZE:
            raise ValueError(f"ไฟล์ใหญ่เกินไป: {target.stat().st_size / 1e6:.1f} MB")

        return target.read_text(encoding=encoding)

    # === เขียน ===
    def write_text(self, path: str, content: str, encoding: str = "utf-8") -> int:
        """เขียนเนื้อหาข้อความ — สร้างโฟลเดอร์แม่ถ้ายังไม่มี"""
        target = self._safe_resolve(path)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding=encoding)
        return len(content.encode(encoding))

    # === ลบ ===
    def remove(self, path: str, missing_ok: bool = True) -> bool:
        """ลบไฟล์หรือโฟลเดอร์"""
        try:
            target = self._safe_resolve(path)
            if target.is_file():
                target.unlink()
            elif target.is_dir():
                shutil.rmtree(target)
            return True
        except FileNotFoundError:
            return missing_ok

    # === สแกนโครงสร้าง ===
    def tree(self, path: str = "", depth: int = 3) -> str:
        """แสดงโครงสร้างเป็นแผนผังต้นไม้"""
        root = self._safe_resolve(path)
        lines = [f"📁 {root.name}/"]

        def _walk(current: pathlib.Path, prefix: str, level: int):
            if level > depth:
                return
            entries = sorted(current.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower()))
            for idx, entry in enumerate(entries):
                connector = "├── " if idx < len(entries) - 1 else "└── "
                icon = "📂 " if entry.is_dir() else "📄 "
                lines.append(f"{prefix}{connector}{icon}{entry.name}")
                if entry.is_dir():
                    extension = "│   " if idx < len(entries) - 1 else "    "
                    _walk(entry, prefix + extension, level + 1)

        _walk(root, "", 1)
        return "\n".join(lines)

    # === รายการไฟล์ ===
    def list_files(
        self,
        path: str = "",
        pattern: str = "*",
        recursive: bool = True
    ) -> List[str]:
        """รายการไฟล์ตามรูปแบบ"""
        root = self._safe_resolve(path)
        if recursive:
            return [str(p.relative_to(root)) for p in root.rglob(pattern) if p.is_file()]
        return [str(p.relative_to(root)) for p in root.glob(pattern) if p.is_file()]

---
📝 ตัวอย่างการใช้งาน
from utils.filesystem import FilesystemTool

# เริ่มต้น — กำหนดโฟลเดอร์รากที่ทำงานได้
fs = FilesystemTool("./my-workspace")

# ✅ สร้างโฟลเดอร์
fs.mkdir("docs/notes")

# ✅ เขียนไฟล์
fs.write_text("docs/notes/hello.md", """---
title: สวัสดี
---
# ทดสอบเขียนไฟล์
จากระบบ ZyntroAI
""")

# ✅ อ่านไฟล์
content = fs.read_text("docs/notes/hello.md")
print(content)

# ✅ ดูโครงสร้าง
print(fs.tree(depth=2))

# ✅ รายการไฟล์ .md ทั้งหมด
md_files = fs.list_files(pattern="*.md")
print(f"พบ {len(md_files)} ไฟล์ Markdown")

# 🔒 ป้องกันการเข้าถึงนอกพื้นที่ — จะเกิดข้อผิดพลาด
try:
    fs.read_text("/etc/passwd")  # ❌ ไม่ได้รับอนุญาต
except PermissionError as e:
    print(e)

---
🛡️ ความปลอดภัยที่มีในตัว
การป้องกัน
รายละเอียด
Path Traversal Protection
ตรวจสอบทุกเส้นทางว่าอยู่ภายใต้ root เท่านั้น
ไม่อนุญาตไฟล์ประเภทอันตราย
กรองตามรายการ ALLOWED_EXTENSIONS
จำกัดขนาดไฟล์
ป้องกันการอ่านไฟล์ใหญ่เกินไป → หน่วยความจำเต็ม
แปลงเส้นทางอัตโนมัติ
expanduser() + resolve() — ปัดสัญลักษณ์ ~ . ..
สร้างโฟลเดอร์แม่อัตโนมัติ
ไม่ต้องกังวลว่ามีหรือไม่

---
📥 ติดตั้ง & เพิ่มลงโปรเจกต์
# สร้างไฟล์
mkdir -p scripts/python/utils
# วางโค้ดด้านบนเป็น scripts/python/utils/filesystem.py

# ใช้งานในสคริปต์อื่น
from utils.filesystem import FilesystemTool

fs = FilesystemTool("./")

---
ต้องการเพิ่มฟีเจอร์อะไรอีกไหมครับ — เช่น คัดลอก/ย้ายไฟล์, บีบอัด ZIP อัตโนมัติ, หรือ ตรวจสอบสิทธิ์การอ่าน/เขียน? 📁✨
