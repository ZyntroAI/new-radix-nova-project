title: "Dependency Security — ความปลอดภัยของไลบรารีและแพ็กเกจ"
aliases:
 
- "Supply Chain Security"
- "จัดการความเสี่ยงจาก Dependencies"
slug: dependency-security
icon: 📦
color: yellow
type: guide
status: active
priority: critical
tags:
- type/guide
- topic/security
- topic/devops
- topic/ci-cd
created: 2026-10-27
updated: 2026-10-27
moc:
- "[[MOC — DevOps Security]]"
parent:
- "[[Secure Coding Practices]]"
children: []
related:
- "[[Secure Coding Practices]]"
- "[[Security Fundamentals]]"
- "[[Incident Response]]"
 
 
 
📦 Dependency Security — ปกป้องห่วงโซ่ซอฟต์แวร์
 
ระวัง! รหัสที่คุณไม่ได้เขียน ก็สามารถแฮ็กคุณได้ — ไลบรารีภายนอก = รหัสคนอื่นที่ทำงานบนระบบของคุณ
 
 
 
⚠️ ทำไมเรื่องนี้สำคัญมาก?
 
- แฮ็กเกอร์โจมตีห่วงโซ่อุปทานซอฟต์แวร์เพิ่มขึ้นทุกปี
- 90% ของโค้ดในแอปพลิเคชันสมัยใหม่มาจาก Dependencies ไม่ใช่โค้ดของเรา
- ช่องโหว่ในแพ็กเกจเดียว = อาจกระทบทั้งแอป → ทั้งองค์กร → ลูกค้าหลายล้านคน
- Log4j, SolarWinds, node-ipc, ua-parser-js = ตัวอย่างที่เกิดขึ้นจริงและส่งผลกระทบมหาศาล
 
 
 
� ประเภทของความเสี่ยงจาก Dependencies
 
ประเภท ความหมาย ตัวอย่าง 
Known Vulnerabilities มี CVE ที่เป็นที่รู้จักแล้วในเวอร์ชันที่ใช้ Log4j, Spring4Shell, npm audit findings 
Typosquatting แพ็กเกจชื่อคล้ายของจริง แต่มีไวรัส  node-sass  ←  node-sasss ,  reqeusts  ←  requests  
Compromised Packages แพ็กเกจที่เชื่อถือได้ถูกแฮ็ก → อัปเดตมัลแวร์  coa ,  rc ,  eslint-utils  
Unmaintained ผู้ดูแลเลิกพัฒนา → ช่องโหว่ไม่ได้รับการแก้ไข แพ็กเกจเวอร์ชันเก่าไม่มีอัปเดตมานาน >1 ปี 
License Risk ใบอนุญาตใช้งานขัดแย้ง อาจมีผลทางกฎหมาย Copyleft (GPL) ในโปรเจกต์เชิงพาณิชย์ 
Hidden Malicious Code แทรกโค้ดอันตรายโดยไม่ถูกค้นพบทันที ขโมย Credentials, ขุดคริปโต, ส่งข้อมูลกลับ 
 
 
 
📋 แนวทางปฏิบัติ — Software Supply Chain Security
 
1️⃣ เลือกแพ็กเกจอย่างรอบคอบ ✅
 
ก่อนติดตั้ง ตรวจสอบอะไร ทำไม 
แหล่งที่มา ทางการ, Repository หลัก, URL ถูกต้อง ป้องกัน Typosquatting 
ความนิยม จำนวน Star, Downloader, ผู้ดูแลที่น่าเชื่อถือ ยิ่งใช้กันมาก ยิ่งมีโอกาสถูกตรวจสอบ 
ความเคลื่อนไหว อัปเดตล่าสุดเมื่อไหร่? เปิด PR/Issue ไหม? หลีกเลี่ยงแพ็กเกจที่เลิกพัฒนาแล้ว 
ขนาดและเนื้อหา มีโค้ดแค่ที่จำเป็นไหม? หรือดึง Dependencies เยอะเกินไป? ลดพื้นที่เสี่ยง 
ใบอนุญาต Compatible กับโปรเจกต์เราไหม? ป้องกันปัญหาทางกฎหมาย 
 
💡 ถ้าทำได้ → เขียนเองดีกว่าใช้แพ็กเกจเล็กๆ ที่ไม่มีใครดูแล ✅
 
 
 
2️⃣ ล็อกเวอร์ชัน & ตรวจสอบ Integrity ✅
 
❌  latest  = อันตรายที่สุด — ไม่เคยใช้ใน Production!
 
ภาษา/ระบบ Lock File ทำหน้าที่อะไร 
JavaScript/Node.js  package-lock.json  /  yarn.lock  /  pnpm-lock.yaml  บันทึกเวอร์ชันที่แน่นอน + Hash ตรวจสอบความถูกต้อง 
Python  requirements.txt  /  Pipfile.lock  /  poetry.lock  ล็อกเวอร์ชันและ Hash 
Go  go.sum  บันทึก Hash ของแพ็กเกจ 
Rust  Cargo.lock  ล็อกเวอร์ชัน 
 
bash
  
# ✅ Commit Lock File เข้า Git ทุกครั้ง
# ❌ ไม่เคยเพิ่ม *.lock เข้า .gitignore
 
 
Integrity Hash = ตรวจสอบว่าโค้ดที่ดาวน์โหลดมา เหมือนกับที่ผู้พัฒนาอัปโหลดจริงหรือไม่ — ป้องกันการแก้ไขระหว่างทางหรือ Registry ที่ถูกบุกรุก
 
 
 
3️⃣ สแกนช่องโหว่ — อัตโนมัติทุกที่ ✅
 
🔹 สแกนที่เครื่องนักพัฒนา
 
bash
  
# === Node.js ===
npm audit                    # สแกนพื้นฐาน
npx auditjs@latest audit     # ลึกกว่า เชื่อม NVD
yarn audit                    # สำหรับ Yarn

# === Python ===
pip install pip-audit
pip-audit

# หรือใช้ Safety
pip install safety
safety check --full-report

# === Python + Poetry ===
poetry run pip-audit

# === Go ===
go list -json -m all | nancy sleuth

# === Rust ===
cargo audit
 
 
🔹 สแกนอัตโนมัติใน CI/CD — ไม่ให้โค้ดที่มีปัญหาผ่านไปได้ ✅
 
GitHub Actions ตัวอย่าง:
 
yaml
  
# .github/workflows/audit.yml
name: Dependency Audit
on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # === Node.js ===
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm audit --audit-level=high  # Fail ถ้ามี Critical/High
      
      # === Python ===
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - run: pip install -r requirements.txt
      - name: Run pip-audit
        uses: pypa/gh-action-pip-audit@v1.0.0
        with:
          requirements: requirements.txt
          vulnerability-level: high
 
 
🔹 บริการฟรีจากแพลตฟอร์ม
 
- GitHub Dependabot — แจ้งเตือน + เปิด PR อัปเดตอัตโนมัติ
- GitLab Dependency Scanning — ใน CI/CD Pipeline
- Snyk / Sonatype Lift / OWASP Dependency-Check — เครื่องมือฟรียอดนิยม
 
เปิดทันที: Repository → Settings → Code security and analysis → Enable all ✅
 
 
 
4️⃣ อัปเดตอย่างมีสติ ไม่ใช่แค่ล่าสุด ✅
 
สถานการณ์ คำแนะนำ 
Patch Update (1.2.3 → 1.2.4) ✅ อัปเดตได้เลย — แก้บั๊ก/ความปลอดภัย ไม่เปลี่ยนการทำงาน 
Minor Update (1.2.3 → 1.3.0) ✅ อ่าน Release Note → ทดสอบ → อัปเดต 
Major Update (1.2.3 → 2.0.0) ⚠️ อ่านเอกสาร → ปรับโค้ด → ทดสอบละเอียด → ค่อยอัปเดต 
มีช่องโหว่ Critical 🚨 อัปเดตทันที แม้จะต้องแก้โค้ดบางส่วน 
 
💡 อัปเดตบ่อยๆ = เปลี่ยนน้อยต่อครั้ง = ปัญหาน้อยลง — ดีกว่ากองไว้อัปเดตทีเดียวทีหลายเวอร์ชัน
 
Semantic Versioning ที่ต้องจำ:
 
plaintext
  
MAJOR.MINOR.PATCH
   ↑     ↑     ↑
  พังได้  ของใหม่ แก้บั๊ก
 
 
 
 
5️⃣ ปกป้อง Registry & ใช้ Mirror ที่เชื่อถือได้ ✅
 
- ใช้ Registry ที่เป็นทางการและมีความน่าเชื่อถือ
- พิจารณา Private Registry สำหรับองค์กร: GitHub Packages, GitLab Packages, AWS CodeArtifact
- จำกัดสิทธิ์การเผยแพร่แพ็กเกจ — ไม่ให้ทุกคน Push ได้
- ตั้งค่า 2FA สำหรับบัญชีที่เผยแพร่แพ็กเกจสาธารณะ
 
 
 
🛠️ เครื่องมือที่แนะนำ
 
เครื่องมือ ภาษา/ใช้งาน ประเภท 
npm audit / yarn audit JavaScript Built-in 
Dependabot (GitHub) ทุกภาษา Auto-PR + Alert 
Snyk ทุกภาษา SCA + CI/CD Integration 
OWASP Dependency-Check Java/.NET/JS/Python Standalone Scanner 
pip-audit / safety Python CLI Scanner 
trivy Container/Repo Vulnerability + Secret Scan 
grype Container/FS Vulnerability Scanner 
Socket.dev JavaScript/Node.js ตรวจพฤติกรรมแพ็กเกจ — หามัลแวร์ที่ไม่มี CVE 
 
 
 
🚨 เมื่อพบช่องโหว่ — จะทำอย่างไร?
 
plaintext
  
พบช่องโหว่
    │
    ├─ 🟢 Patch มีแล้ว → อัปเดตเวอร์ชันทันที — ทดสอบ → Deploy
    │
    ├─ 🟡 ยังไม่มี Patch → ดูว่ามี Workaround ไหม? → ปิดการใช้งาน Function ที่เกี่ยวข้อง
    │
    ├─ 🟠 อัปเดตไม่ได้ → หาแพ็กเกจอื่นทดแทน → หรือเขียนเองบางส่วน
    │
    └─ 🔴 ต้องใช้ต่อจริงๆ → แยกกระบวนการ, จำกัดสิทธิ์, บล็อกอินเทอร์เน็ต, เฝ้าดูใกล้ชิด
 
 
💡 ไม่ใช่ทุก CVE ต้องแก้ทันที — ประเมินความรุนแรงและผลกระทบก่อน:
 
- CVSS Score 0–10 → ช่วยตัดสินใจ
- ผลกระทบจริงเทียบกับความยากในการอัปเดต
- บางครั้งช่องโหว่มีอยู่แต่ไม่ได้ถูกเรียกใช้งานในโค้ดของเรา → ความเสี่ยงต่ำ
 
 
 
✅ Checklist — Dependency Security พร้อมแค่ไหน?
 
มี Lock File และ Commit เข้า Git ทุกครั้ง ✅
ไม่ใช้  latest  หรือ Version ที่ไม่ระบุ ✅
เปิด Dependabot / Auto-Dependency Update ✅
มีการสแกนช่องโหว่ใน CI ทุกครั้งที่ Push ✅
อ่าน Release Note ก่อนอัปเดต Major Version ✅
ตรวจสอบชื่อแพ็กเกจก่อนติดตั้ง — ระวัง Typosquatting ✅
รู้ว่ามี Dependencies กี่ตัว และใช้ทำอะไรบ้าง ✅
มีแผนรองรับเมื่อแพ็กเกจที่ใช้ถูกบุกรุกหรือเลิกพัฒนา ✅
 
 
 
🔗 Related Notes
 
- [[Secure Coding Practices]] — หลักการเขียนโค้ดอย่างปลอดภัย
- [[Security Fundamentals]] — ภาพรวมความมั่นคงระบบ
- [[Incident Response]] — ขั้นตอนเมื่อแพ็กเกจที่ใช้มีมัลแวร์หรือช่องโหว่ร้ายแรง
- [[CI/CD]] — รวม Dependency Scan เข้าไปใน Pipeline
 
 
 
✅ สรุปสั้นๆ: ความปลอดภัยของคุณ = ความปลอดภัยของ Dependencies ที่อ่อนแอที่สุดในโปรเจกต์ของคุณ — เลือกอย่างชาญฉลาด ล็อกเวอร์ชัน สแกนสม่ำเสมอ และอัปเดตทันทีเมื่อจำเป็น 😊
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น Monorepo Dependency Management, SBOM (Software Bill of Materials), หรือ Mitigation เมื่อแพ็กเกจยกเลิกพัฒนา/ถูกบุกรุก 😊