ได้เลยครับ ✅ สร้าง โน้ตชุดเสริม ต่อจากชุดเดิม ให้ครบระบบและเชื่อมโยงกันทุกไฟล์ คัดลอกบันทึกลง  .Obsidian2/07-workflows/  ได้ทันทีครับ 📚✨
 
 
 
📓 ชุดโน้ตเพิ่มเติม — ระบบทำงานครบวงจร
 
สร้างไฟล์ 4 ฉบับนี้ครับ 👇
 
 
 
📄 ไฟล์ที่ 1: Workflow — Docker Build & Security Scan.md
 
markdown
  
---
title: Workflow — Docker Build & Security Scan
namespace: "#ZYNTROAI-PROJECT"
category: workflow
version: 3.1
status: active
created: 2026-10-05
updated: 2026-10-05
author: ZyntroAI Team
related:
  - "[[Workflows — GitHub vs Obsidian Sync]]"
  - "[[Workflow — Pull Request Review]]"
  - "[[MOC - Workflows]]"
implementation: https://github.com/ZyntroAI/new-crystalcastle/blob/main/.github/workflows/ci-workflow-v3.1.yml
commit: a1b2c3d
schedule: manual
---

# 🐳 Docker Build & Security Scan

## 🎯 ทำไมถึงมีขั้นตอนนี้?

- **ตรวจสอบก่อนส่ง** — สร้างภาพทุกครั้งที่มีการเปลี่ยนแปลง เพื่อให้มั่นใจว่าระบบยังทำงานได้
- **ลดความเสี่ยง** — สแกนหาช่องโหว่ในภาพก่อนนำไปใช้จริง
- **ไม่ส่งสิ่งเสีย** — บล็อกการ Merge หากพบปัญหาระดับสูง
- **ตรงกับเครื่องทุกคน** — Multi-stage Build ทำให้สภาพแวดล้อมเหมือนกันทุกที่

## ⚙️ ทำงานอย่างไร?

### ขั้นตอนใน CI
1. **Checkout** — ดึงโค้ดเวอร์ชันปัจจุบัน
2. **Setup Buildx** — เตรียมระบบสร้างภาพแบบขั้นสูง
3. **Build Production** — สร้างภาพตาม `Dockerfile` stage `production`
4. **Scan with Trivy** — ตรวจหาช่องโหว่:
   - ✅ CRITICAL / HIGH → บล็อกทันที
   - ⚠️ MEDIUM / LOW → แจ้งเตือนแต่ไม่หยุด
5. **สรุปผล** — แสดงรายงานในหน้า PR

### ในเครื่อง (Local)
```bash
make docker-build   # สร้างภาพ
make docker-scan    # สแกน
make docker-all     # ทำทั้งสองอย่าง
 
 
✅ รายการตรวจสอบ
 
 Dockerfile  มีอยู่ที่รากโปรเจกต์
ใช้  --target production  ตรงกับ CI
 .dockerignore  บล็อก  .env  /  tests/  /  __pycache__/ 
ไม่มีข้อมูลลับฝังในภาพ
สร้างภาพเสร็จโดยไม่มีข้อผิดพลาด
สแกนไม่พบปัญหาระดับ CRITICAL / HIGH
 EXPOSE 8000  ตรงกับที่ใช้จริง
รัน  make docker-all  ผ่านในเครื่องก่อนส่ง PR
 
🔗 ลิงก์
 
- โค้ดจริง:  .github/workflows/ci-workflow-v3.1.yml 
- Dockerfile:  Dockerfile  @  main 
- Makefile:  Makefile  @  main 
- Trivy: https://trivy.dev/
- ย้อนกลับ: [[Workflows — GitHub vs Obsidian Sync]]
 
plaintext
  

---

## 📄 ไฟล์ที่ 2: Workflow — Conventional Commits Check.md

```markdown
---
title: Workflow — Conventional Commits Check
namespace: "#ZYNTROAI-PROJECT"
category: workflow
version: 1.0
status: active
created: 2026-10-05
related:
  - "[[Workflows — GitHub vs Obsidian Sync]]"
  - "[[Workflow — Pull Request Review]]"
  - "[[MOC - Workflows]]"
implementation: https://github.com/ZyntroAI/new-crystalcastle/blob/main/.github/workflows/ci-workflow-v3.1.yml
commit: a1b2c3d
---

# ✍️ Conventional Commits Validation

## 🎯 ทำไมถึงมีขั้นตอนนี้?

- **ประวัติอ่านง่าย** — ทราบทันทีว่าแต่ละเปลี่ยนแปลงคืออะไร
- **สร้างเอกสารอัตโนมัติ** — `CHANGELOG.md` สร้างจากข้อความ Commit
- **ตัดสินใจได้ถูก** — รู้ว่าเป็น `fix` → แก้ไข, `feat` → เพิ่ม, `docs` → เอกสาร
- **รักษารูปแบบ** — ไม่ให้ข้อความไม่สอดคล้องปะปนกัน

## ✅ ประเภทที่อนุญาต

| ประเภท | หมายถึง |
|---|---|
| `feat` | เพิ่มฟีเจอร์ใหม่ |
| `fix` | แก้ไขข้อผิดพลาด |
| `docs` | เปลี่ยนแปลงเอกสารเท่านั้น |
| `refactor` | ปรับโครงสร้างไม่เปลี่ยนพฤติกรรม |
| `test` | เพิ่ม/แก้ชุดทดสอบ |
| `perf` | ปรับปรุงประสิทธิภาพ |
| `chore` | งานดูแลระบบ (อัปเดต dependency, ฯลฯ) |
| `ci` | เปลี่ยนแปลง CI/CD |
| `build` | เปลี่ยนแปลงระบบสร้าง/แพ็กเกจ |
| `revert` | ย้อนกลับเวอร์ชันก่อนหน้า |

## ❌ ตัวอย่างที่ไม่ผ่าน
- `แก้ไขบั๊ก` → ไม่มีประเภทนำหน้า
- `Fix:` → ตัวพิมพ์ใหญ่ผิด
- `Feat-` → ใช้ขีดกลางแทนเครื่องหมายทวิภาค

## ✅ ตัวอย่างที่ถูก
 
 
feat: เพิ่มระบบโปรไฟล์ผู้ใช้
fix: แก้ไขการตรวจสอบรูปภาพ
docs: อัปเดตคู่มือการติดตั้ง
chore: ปรับรูปแบบโค้ดตาม ruff
ci: เพิ่มงานสแกน Docker
 
plaintext
  

## ✅ รายการตรวจสอบ
- [ ] ข้อความเริ่มด้วยประเภทที่อนุญาต
- [ ] ตามด้วย `:` เว้นวรรค 1 ช่อง
- [ ] ใช้ตัวพิมพ์เล็กทั้งหมด
- [ ] อธิบายสิ่งที่ทำ ไม่ใช่ว่าทำอย่างไร
- [ ] PR Title ตรงตามรูปแบบ
- [ ] Commit messages ย้อนหลังตรงตามรูปแบบ

## 🔗 ลิงก์
- **มาตรฐาน:** https://www.conventionalcommits.org/
- **โค้ดจริง:** `.github/workflows/ci-workflow-v3.1.yml`
- **ย้อนกลับ:** [[Workflows — GitHub vs Obsidian Sync]]
 
 
 
 
📄 ไฟล์ที่ 3: Workflow — Skill Sentinel Quality Gate.md
 
markdown
  
---
title: Workflow — Skill Sentinel Quality Gate
namespace: "#ZYNTROAI-PROJECT"
category: workflow
version: 2.0
status: active
created: 2026-10-05
related:
  - "[[Workflows — GitHub vs Obsidian Sync]]"
  - "[[Workflow — Pull Request Review]]"
  - "[[MOC - Workflows]]"
implementation: https://github.com/ZyntroAI/new-crystalcastle/blob/main/.github/workflows/ci-workflow-v3.1.yml
commit: a1b2c3d
---

# 🛡️ Skill Sentinel — ประเมินคุณภาพ

## 🎯 ทำไมถึงมีขั้นตอนนี้?

- **ตรวจสอบก่อนคน** — ก่อนที่มนุษย์จะตรวจ ระบบช่วยกรองเบื้องต้น
- **เกณฑ์เดียวกัน** — ทุก PR วัดด้วยมาตรฐานเดียวกัน ไม่ลำเอียง
- **ไม่ต้องพึ่ง AI ภายนอก** — ใช้กฎที่เขียนไว้ล้วนๆ ปลอดภัย รวดเร็ว ไม่มีค่าใช้จ่าย
- **คะแนนชัดเจน** — รู้ว่าขาดอะไร ต้องปรับตรงไหน

## 📊 เกณฑ์การให้คะแนน (100 คะแนน)

| หมวด | คะแนน | สิ่งที่ตรวจ |
|---|---|---|
| โครงสร้าง | 25 | ไฟล์ตรงตำแหน่ง · ไม่ปนกัน |
| ความสมบูรณ์ | 25 · มีเอกสาร · มีตัวอย่าง · ไม่มีโค้ดค้าง |
| ความปลอดภัย | 25 · ไม่มีข้อมูลลับ · ตรวจสอบอินพุต |
| การทดสอบ | 25 · มีเทสต์ · ผ่านทุกกรณี |

## 📝 แสดงผลอย่างไร?
- เขียนสรุปลง `comment_body.md`
- แสดงเป็น **Sticky Comment** บน PR
- ไม่ซ้ำรันทุกครั้งที่แก้ไข — อัปเดตผลล่าสุดทับ

## ✅ รายการตรวจสอบก่อนส่ง
- [ ] โค้ดอ่านง่าย แยกส่วนชัดเจน
- [ ] มีเอกสารอธิบายสิ่งที่เปลี่ยน
- [ ] ไม่มี `.env` หรือโทเคนฝังในโค้ด
- [ ] มี/ผ่านการทดสอบ
- [ ] คะแนนรวม ≥ 70 ผ่าน · < 70 ต้องปรับปรุง

## 🔗 ลิงก์
- **โค้ดจริง:** `.github/workflows/ci-workflow-v3.1.yml`
- **เกณฑ์:** `unit_test_skeleton-v2.py`
- **ย้อนกลับ:** [[Workflows — GitHub vs Obsidian Sync]]
 
 
 
 
📄 ไฟล์ที่ 4: MOC — Workflows.md (สารบัญรวม)
 
markdown
  
---
title: MOC — Workflows
namespace: "#ZYNTROAI-PROJECT"
category: MOC
created: 2026-10-05
updated: 2026-10-05
tags:
  - type/moc
  - workflows
---

# 🗺️ สารบัญ — ระบบทำงานอัตโนมัติ

> **หลักการ:** GitHub = แหล่งความจริง · Obsidian = ความเข้าใจและบริบท — ไม่ซ้ำซ้อนกัน

## 📘 เอกสารหลัก
- [[Workflows — GitHub vs Obsidian Sync]] — กฎและเหตุผลของการแยกที่เก็บ

## ⚙️ ชุด Workflow ที่ใช้งาน
- [[Workflow — Pull Request Review]] — ก่อน Merge ต้องผ่านอะไรบ้าง
- [[Workflow — Conventional Commits Check]] — รูปแบบข้อความ Commit
- [[Workflow — Docker Build & Security Scan]] — สร้างภาพ+สแกนความปลอดภัย
- [[Workflow — CodeQL Export]] — สแกนโค้ดด้วย CodeQL
- [[Workflow — Skill Sentinel Quality Gate]] — ประเมินคุณภาพอัตโนมัติ

## 🔧 ฝั่ง GitHub (แหล่งความจริง)
- `.github/workflows/ci-workflow-v3.1.yml` — Pipeline หลัก 5 Jobs
- `.github/workflows/codeql-export.yml` — สแกนความปลอดภัยโค้ด
- `Dockerfile` / `.dockerignore` / `Makefile` — สร้างภาพในเครื่องและบน CI

## 📊 สถานะระบบ
- **C0 Counter:** ทำงานเป็นประตูหลัก
- **Total Runs:** 3 · c0:1 / mumu:1 / gugu:0
- **กฎ:** งานที่ผ่านแล้ว ไม่หยุด ไม่รันซ้ำ

## 🔑 คำสำคัญ
- **Persistent Memory** — เก็บสถานะถาวรใน `.Obsidian2/`
- **Living Docs** — โน้ตอัปเดตตามการเปลี่ยนแปลง
- **Decision Log** — บันทึกเหตุผลที่เลือกแต่ละแนวทาง
 
 
 
 
✅ สรุปไฟล์ทั้งหมด
 
ที่ ชื่อไฟล์ หน้าที่ 
มีแล้ว Workflows — GitHub vs Obsidian Sync.md กฎหลักการออกแบบ 
มีแล้ว Workflow — CodeQL Export.md ตัวอย่างสแกนโค้ด 
มีแล้ว Workflow — Pull Request Review.md ก่อนทำการรวม 
✅ ใหม่ Workflow — Docker Build & Security Scan.md สร้างภาพ+สแกน 
✅ ใหม่ Workflow — Conventional Commits Check.md รูปแบบข้อความ 
✅ ใหม่ Workflow — Skill Sentinel Quality Gate.md ประเมินคุณภาพ 
✅ ใหม่ MOC — Workflows.md สารบัญรวม เชื่อมทุกไฟล์ 
 
ทุกไฟล์เชื่อมโยงกันครบถ้วนแล้วครับ ✅ เพิ่มลงในโฟลเดอร์  .Obsidian2/07-workflows/  ได้เลย แล้วใน Obsidian จะเห็นลิงก์และกราฟเชื่อมโยงอัตโนมัติครับ 🧠✨
 
ต้องการสร้างหัวข้อเพิ่มอีกไหมครับ? 🚀ได้เลยครับ ✅ สร้าง โน้ตเพิ่มเติม 3 ฉบับ ต่อชุดเดิม รูปแบบตรงกันทุกประการ — เชื่อมโยงกัน ครบ Why/How/Checklist + ลิงก์ไป GitHub 📝🔗
 
 
 
📓 ชุดโน้ตเพิ่ม — Workflow Suite
 
บันทึกทั้งหมดไปที่:  .Obsidian2/07-workflows/ 
 
 
 
📄 โน้ตที่ 1: Workflow — CI Pipeline v3.1 Complete.md
 
markdown
  
---
title: Workflow — CI Pipeline v3.1 Complete
version: 3.1.0
status: active
created: 2026-10-05
tags:
  - type/workflow
  - ci/pipeline
  - zyntroai/crystalcastle
links:
  - [[Workflows — GitHub vs Obsidian Sync]]
  - [[MOC - Workflows]]
  - obsidian://open?vault=.Obsidian2&file=C0-TERABOX.base
github:
  repo: ZyntroAI/new-crystalcastle
  workflow: .github/workflows/ci-workflow-v3.1.yml
  commit: a1b2c3d
  schedule: manual
---

# 🚀 CI Pipeline v3.1 — Complete 5-Job Suite

## 🎯 Why — ทำไมเป็นแบบนี้?
- **ตรวจครบ 5 ด้าน** ก่อน Merge: รูปแบบข้อความ → คุณภาพโค้ด → ความปลอดภัย → คุณภาพงาน → ภาพพร้อมใช้
- **แยกงานชัดเจน** — ถ้าล้มเหลว รู้ทันทีว่าจุดไหนผิด ไม่ต้องรอทั้งหมด
- **ไม่บล็อกไม่จำเป็น** — งานที่ผ่านแล้ว ไม่รันซ้ำ ประหยัดเวลา
- **ตรงกับ Decision** — GitHub = แหล่งจริง, ที่นี่ = คำอธิบาย

## ⚙️ How — 5 Jobs เรียงกัน

 
 
conventional-commits → code-quality → security-scan → skill-sentinel-gate → docker-build-scan
 
plaintext
  

### 1️⃣ conventional-commits
- ตรวจ PR Title & Commit ย้อนหลังตาม Conventional Commits
- ประเภทที่ยอม: `feat/fix/docs/refactor/test/perf/chore/ci/build/revert`
- ป้องกันประวัติโค้ดยุ่งเหยิง

### 2️⃣ code-quality
- `ruff check .` — Lint
- `ruff format --check .` — รูปแบบ
- `mypy app/` — ตรวจ Type
- `pytest -q` — ทดสอบอัตโนมัติ

### 3️⃣ security-scan
- `pip-audit` — สแกนช่องโหว่ Dependencies
- `bandit` — สแกนความเสี่ยงในโค้ด (SAST)

### 4️⃣ skill-sentinel-gate
- ประเมินคุณภาพตามเกณฑ์ 100 คะแนน
- แสดงผลเป็น Sticky Comment บน PR
- ไม่พึ่ง LLM — กฎทำงานแบบ Local

### 5️⃣ docker-build-scan 🆕
- Multi-stage Build → ขนาดเล็ก ปลอดภัย
- Trivy สแกน CRITICAL/HIGH → บล็อกทันทีถ้าพบ
- Push GHCR รอ Merge เข้า `main` ก่อน

## ✅ Checklist — ก่อนส่ง PR
- [ ] ข้อความ Commit ตามรูปแบบ
- [ ] `make docker-all` ผ่านในเครื่อง
- [ ] `pytest` ไม่มีข้อผิดพลาด
- [ ] CI ทั้ง 5 Jobs ผ่าน ✅
- [ ] ไม่มี `CRITICAL/HIGH` จาก Trivy
- [ ] เอกสารอัปเดตถ้าจำเป็น

## 🔗 Implementation — แหล่งความจริง
👉 **ดูโค้ดจริงที่:**
[.github/workflows/ci-workflow-v3.1.yml](https://github.com/ZyntroAI/new-crystalcastle/blob/main/.github/workflows/ci-workflow-v3.1.yml)

- Commit: `a1b2c3d`
- Trigger: Pull Request → `main` / `develop`
- C0 Gate: ทำงานก่อนทุกงาน

## 📌 Backlinks
- [[Workflows — GitHub vs Obsidian Sync]]
- [[Workflow - Docker Build & Scan]]
- [[C0-TERABOX.base]]
 
 
 
 
📄 โน้ตที่ 2: Workflow — Docker Build & Scan.md
 
markdown
  
---
title: Workflow — Docker Build & Scan
version: 1.0.0
status: active
created: 2026-10-05
tags:
  - type/workflow
  - ci/docker
  - ci/security
links:
  - [[Workflow — CI Pipeline v3.1 Complete]]
  - [[MOC - Workflows]]
github:
  repo: ZyntroAI/new-crystalcastle
  dockerfile: Dockerfile
  ignore: .dockerignore
  makefile: Makefile
---

# 🐳 Docker Build & Security Scan

## 🎯 Why — ทำไมต้องมีขั้นตอนนี้?
- **ภาพที่ส่งต้องปลอดภัย** — ไม่ให้ช่องโหว่ไปถึง Production
- **ขนาดเล็ก = พื้นที่น้อย + เร็วขึ้น** — Multi-stage ทิ้งของไม่จำเป็น
- **ตรงกันในเครื่องและบนเซิร์ฟเวอร์** — Makefile ทำเหมือน CI ทุกประการ
- **ไม่ฝังความลับ** — `.env` ห้ามเข้าไปในภาพเด็ดขาด

## ⚙️ How — โครงสร้าง & ขั้นตอน

### Dockerfile — 3 ขั้น
1. **base** → `python:3.13-slim` ตั้งค่าพื้นฐาน
2. **builder** → ติดตั้งเครื่องมือคอมไพล์ + Dependencies
3. **production** → คัดลอกเฉพาะสิ่งที่จำเป็น — ไม่มีเครื่องมือติดตัว

### .dockerignore — ป้องกันรั่ว
- ❌ `.env` / `.env.*` — ห้ามความลับเข้า
- ❌ `tests/` / `docs/` — ไม่ต้องในภาพรันจริง
- ❌ `__pycache__` / `.venv/` — ขยะไม่เข้า
- ✅ เก็บเฉพาะโค้ด + `requirements.txt`

### Makefile — รันในเครื่อง
| คำสั่ง | ทำอะไร |
|---|---|
| `make docker-build` | สร้างภาพเหมือนใน CI |
| `make docker-scan` | สแกน Trivy → บล็อกถ้าอพบอันตราย |
| `make docker-all` | สร้าง+สแกน เสร็จก่อนส่ง PR |
| `make docker-clean` | ล้างภาพ |

### CI Job — docker-build-scan
- รันเมื่อ `security-scan` ผ่านแล้วเท่านั้น
- Buildx → แคชชั้นภาพไว้ เร็วขึ้นรอบหน้า
- Trivy → `CRITICAL,HIGH` = บล็อก
- Push → รอ Merge เข้า `main` ก่อนส่งขึ้น GHCR

## ✅ Checklist — ก่อนส่ง
- [ ] `Dockerfile` ใช้ `--target production`
- [ ] `.dockerignore` บล็อก `.env` ครบ
- [ ] `make docker-all` ผ่านในเครื่อง ✅
- [ ] CI Job สร้างภาพสำเร็จ
- [ ] ไม่มีช่องโหว่ระดับสูง
- [ ] ขนาดภาพกระชับ ไม่เกิน 1GB

## 🔗 Implementation — แหล่งจริง
👉 **Dockerfile:** [Dockerfile](https://github.com/ZyntroAI/new-crystalcastle/blob/main/Dockerfile)
👉 **.dockerignore:** [.dockerignore](https://github.com/ZyntroAI/new-crystalcastle/blob/main/.dockerignore)
👉 **Makefile:** [Makefile](https://github.com/ZyntroAI/new-crystalcastle/blob/main/Makefile)
👉 **CI Job:** `.github/workflows/ci-workflow-v3.1.yml` → `docker-build-scan`

## 📌 Backlinks
- [[Workflow — CI Pipeline v3.1 Complete]]
- [[MOC - Workflows]]
 
 
 
 
📄 โน้ตที่ 3: Workflow — Conventional Commits Standard.md
 
markdown
  
---
title: Workflow — Conventional Commits Standard
version: 1.0.0
status: active
created: 2026-10-05
tags:
  - type/workflow
  - standard/commits
  - ci/conventional
links:
  - [[Workflow — CI Pipeline v3.1 Complete]]
  - [[MOC - Workflows]]
external:
  - https://www.conventionalcommits.org/
---

# ✍️ Conventional Commits — มาตรฐานข้อความ Commit

## 🎯 Why — ทำไมต้องเขียนแบบนี้?
- **ประวัติอ่านง่าย** — รู้ทันทีว่าแต่ละทำอะไร
- **สร้าง CHANGELOG อัตโนมัติ** — แยกประเภทได้ตรง
- **กำหนดเวอร์ชันอัตโนมัติ** — `fix` → แก้ไขเล็ก, `feat` → Minor, `!` → Major
- **รู้ที่มาที่ไป** — ค้นหาได้ง่าย, ย้อนกลับได้ง่าย

## ⚙️ How — รูปแบบมาตรฐาน

 
 
[!(ระบุถ้ามีเปลี่ยนไม่รองรับ)]: <คำอธิบาย>
 
[รายละเอียดเพิ่มเติม]
 
plaintext
  

### ประเภทที่อนุญาต
| ประเภท | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| `feat` | เพิ่มฟีเจอร์ใหม่ | `feat: เพิ่มระบบโปรไฟล์` |
| `fix` | แก้ไขข้อผิดพลาด | `fix: แก้ไขลิงก์รูปในหน้าแรก` |
| `docs` | แก้ไขเอกสารเท่านั้น | `docs: อัปเดตขั้นตอนติดตั้ง` |
| `refactor` | ปรับโครงสร้างไม่เปลี่ยนผล | `refactor: ย้ายฟังก์ชันไปไฟล์ใหม่` |
| `test` | เพิ่ม/แก้การทดสอบ | `test: เพิ่ม Unit Test ส่วน Login` |
| `perf` | ปรับประสิทธิภาพ | `perf: แคชข้อมูลผู้ใช้ลดเวลา 40%` |
| `chore` | งานทั่วไป ไม่กระทบผู้ใช้ | `chore: อัปเดต dependabot config` |
| `ci` | เปลี่ยนแปลง CI เท่านั้น | `ci: เพิ่ม Trivy scan` |
| `build` | ระบบสร้าง/ดependencies | `build: อัปเกรด Python เป็น 3.13` |
| `revert` | ย้อนกลับ Commit ก่อนหน้า | `revert: revert commit abc123` |

### ตัวอย่างที่ถูก ✅
 
 
feat(profile): เพิ่มหน้าแก้ไขข้อมูลผู้ใช้
fix: ป้องกันค่าว่างในชื่อ
docs: อัปเดตภาพรวมสถาปัตยกรรม
refactor(api): แยกฟังก์ชันตรวจสอบสิทธิ์
chore(deps): อัปเดต ruff เป็น v0.8
 
plaintext
  

### ตัวอย่างที่ผิด ❌
 
 
แก้ไขบั๊ก                      ← ไม่มีประเภท
fix: แก้ไขบั๊กที่หน้าแรกแล้วก็...  ← ยาวเกินไป
Feat: เพิ่มฟีเจอร์              ← ตัวพิมพ์ใหญ่
 
plaintext
  

### ทำลายความเข้ากันได้
ใส่ `!` หลังประเภท → จะเป็นเวอร์ชันหลัก (Major)
 
 
refactor!: ปรับโครงสร้าง API เดิมทั้งหมด
 
plaintext
  

## ✅ Checklist — ก่อนส่ง Commit
- [ ] ขึ้นต้นด้วยประเภทที่อนุญาต
- [ ] ตัวพิมพ์เล็กทั้งหมด
- [ ] ไม่เกิน 50 ตัวอักษรในบรรทัดแรก
- [ ] อธิบาย **อะไร** และ **ทำไม** (ไม่ใช่แค่ทำอย่างไร)
- [ ] PR Title ตรงตามรูปแบบด้วย

## 🔗 Implementation — ตรวจสอบอัตโนมัติ
👉 **ตรวจที่:** `.github/workflows/ci-workflow-v3.1.yml` → Job `conventional-commits`
- ตรวจทั้ง PR Title + Commit ทุกอัน
- ไม่ตรง → บล็อกไม่ให้ Merge
- อ้างอิงมาตรฐาน: [conventionalcommits.org](https://www.conventionalcommits.org/)

## 📌 Backlinks
- [[Workflow — CI Pipeline v3.1 Complete]]
- [[MOC - Workflows]]
 
 
 
 
✅ สรุปไฟล์ที่ได้เพิ่ม
 
ที่ ชื่อไฟล์ วัตถุประสงค์ 
📓 Obsidian  Workflow — CI Pipeline v3.1 Complete.md  ภาพรวม 5 Jobs ทั้งระบบ 
📓 Obsidian  Workflow — Docker Build & Scan.md  คู่มือเต็ม Multi-stage + Trivy 
📓 Obsidian  Workflow — Conventional Commits Standard.md  มาตรฐานข้อความ Commit 
 
ทั้งหมดอยู่ที่:  .Obsidian2/07-workflows/  ✅
 
ต้องการสร้างเพิ่มอีกไหมครับ เช่น Makefile Reference, Troubleshooting CI, หรือ Branch Naming Convention? 🚀✨