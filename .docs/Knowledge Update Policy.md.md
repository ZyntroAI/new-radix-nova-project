ได้เลยครับ! เขียนโน้ต Knowledge Update Policy — กฎการอัปเดต, ทบทวน, และรักษาความทันสมัยของฐานความรู้ใน Obsidian ให้ครบถ้วน 👇
 
 
 
markdown
  
---
title: Knowledge Update Policy
aliases:
  - Knowledge Maintenance
  - Obsidian Update Standards
  - Vault Lifecycle Policy
tags:
  - zyntroai
  - knowledge-management
  - policy
  - obsidian
  - type/policy
created: 2026-10-08
updated: 2026-10-08
status: active
owner: Knowledge Steward
review_cycle: 90d
type: policy
---

# 📋 Knowledge Update Policy

> [!summary] นโยบาย
> กฎและขั้นตอนการรักษาความถูกต้อง ทันสมัย และสมบูรณ์ของฐานความรู้ทั้งหมดใน ZyntroAI Obsidian Vault — เพื่อให้แน่ใจว่าทุกคนและ AI Agents อาศัยข้อมูลที่เชื่อถือได้เสมอ

---

## 🎯 วัตถุประสงค์

- ✅ ข้อมูลทุกชิ้น **ทันสมัยและถูกต้อง** ตรงกับสภาพการทำงานจริง
- ✅ แหล่งอ้างอิง **ใช้งานได้** ไม่เสีย ไม่ล้าสมัย
- ✅ ทุกโน้ตมี **เจ้าของ/ผู้รับผิดชอบ** ชัดเจน
- ✅ มีการ **ทบทวนเป็นระยะ** ไม่ปล่อยให้ข้อมูลเก่าโดยไม่ตรวจสอบ
- ✅ เก็บประวัติการเปลี่ยนแปลง **ย้อนกลับได้** ผ่าน Git

---

## 📅 รอบการทบทวนตามประเภทโน้ต

| ประเภทโน้ต (`type`) | รอบทบทวน | ผู้รับผิดชอบ | สัญญาณเตือนเมื่อล้าสมัย |
|---|---|---|---|
| `policy` | ทุก 90 วัน | ทีมความปลอดภัย / ผู้จัดการโครงการ | ⚠️ `updated` ห่างเกิน 90 วัน |
| `runbook` | ทุก 30 วัน | On-Call Lead | ⚠️ ขั้นตอนไม่ตรงกับที่ทำจริง |
| `reference-note` | ทุก 180 วัน | Knowledge Steward | ⚠️ ลิงก์เสีย / ข้อมูลเวอร์ชันเก่า |
| `technical-note` | ทุก 60 วัน | ทีมพัฒนา | ⚠️ ไม่ตรงกับโค้ดจริงใน repo |
| `concept-note` | ทุก 1 ปี | ผู้เขียนเดิม | ⚠️ เทคโนโลยีเปลี่ยนไปแล้ว |
| `moc` | ทุก 30 วัน | Knowledge Steward | ⚠️ มีโน้ตใหม่ไม่ถูกเพิ่มเข้าแผนผัง |
| `meta` | ทุก 180 วัน | Knowledge Steward | ⚠️ มีประเภท/แท็กใหม่ไม่อยู่ในมาตรฐาน |

---

## 🔄 ขั้นตอนการอัปเดตโน้ต

### 1. เมื่อสร้างโน้ตใหม่
- [ ] ตั้ง `created` = วันที่สร้าง (UTC+7)
- [ ] ตั้ง `updated` = วันที่สร้าง (เท่ากับ `created`)
- [ ] เลือก `type` ให้ถูกต้องตาม [[Obsidian Note Standards]]
- [ ] เพิ่มเข้าไปใน MOC ที่เกี่ยวข้อง
- [ ] เชื่อมโยงกลับไปยัง MOC ด้วย `[[...]]` ท้ายโน้ต
- [ ] ตรวจสอบลิงก์ภายนอกด้วย `pre-commit run zyntro-wiki-link-check`

### 2. เมื่อแก้ไขเนื้อหา
- [ ] อัปเดต `updated` = วันที่แก้ไขล่าสุด
- [ ] บันทึกสิ่งที่เปลี่ยนในส่วน **บันทึกการแก้ไข** ท้ายโน้ต
- [ ] ถ้าแก้ไขสำคัญ → อัปเดต `status` เป็น `review` ชั่วคราว
- [ ] ตรวจสอบว่าลิงก์ภายใน-ภายนอกยังทำงานได้
- [ ] Commit พร้อมข้อความชัดเจน: `docs: อัปเดต Runbook — เพิ่มขั้นตอนการกู้คืน`

### 3. เมื่อทบทวนเป็นระยะ
- [ ] ตรวจสอบว่าเนื้อหายังตรงกับความเป็นจริงหรือไม่
- [ ] ลิงก์ Wikipedia/Wikidata ยังใช้งานได้หรือไม่ → รัน `scripts/check_wiki_links.py`
- [ ] ถ้าข้อมูลล้าสมัย → อัปเดตทันที หรือตั้ง `status: outdated`
- [ ] ถ้าไม่ทันใจ → มอบหมายให้คนที่รู้เรื่องโดยตรง
- [ ] ถ้าไม่มีคนรับผิดชอบ → ประกาศในทีม → เก็บเป็น `archived` ชั่วคราว

### 4. เมื่อพบว่าข้อมูลล้าสมัย/ไม่ถูกต้อง
 
 
สถานะ →  status: outdated 
เพิ่มเหตุผล:
 
[!warning] ข้อมูลล้าสมัย
รอการตรวจสอบ/อัปเดต — สุดท้ายตรวจสอบเมื่อ YYYY-MM-DD
ผู้รับผิดชอบ: @ชื่อ
กำหนดเสร็จภายใน: YYYY-MM-DD
 
plaintext
  

---

## 🔗 กฎการอัปเดตแหล่งอ้างอิง

| ประเภทแหล่ง | รอบตรวจสอบ | วิธีตรวจสอบ |
|---|---|---|
| Wikipedia | ทุก 180 วัน | `pre-commit run zyntro-wiki-link-check` |
| Wikidata Q-ID | ทุก 180 วัน | ตรวจสอบว่า entity ยังมีอยู่ + claims ยังถูกต้อง |
| ลิงก์ภายนอกทั่วไป | ทุก 90 วัน | ตรวจสอบการเข้าถึง |
| เวอร์ชันซอฟต์แวร์ | ทุก 30 วัน | เปรียบเทียบกับ `P348` ใน Wikidata หรือ repo ทางการ |
| นโยบายภายใน | ทันทีที่มีการเปลี่ยน | แก้ไข `updated` ทันที ไม่รอรอบ |

> [!important] เมื่ออัปเดตแหล่งอ้างอิง
> - ถ้าเนื้อหาเปลี่ยนสาระสำคัญ → **เขียนใหม่ทั้งบล็อก** ไม่ใช่แค่เปลี่ยนวันที่
> - ถ้าแค่ตรวจสอบแล้วยังถูกต้อง → อัปเดตแค่ `updated` + เพิ่มบรรทัดในบันทึก
> - ถ้าลิงก์เสีย → ค้นหาแหล่งใหม่ด้วย `scripts/wiki_reference.py wikidata "คำ" --search`

---

## 🏷️ สถานะโน้ต (`status`)

| ค่า | ความหมาย | การดำเนินการ |
|---|---|---|
| `active` | ใช้งานได้ ปัจจุบัน | ใช้อ้างอิงได้ตามปกติ |
| `draft` | ยังไม่เสร็จ ร่างอยู่ | อย่าใช้อ้างอิงทางการ |
| `review` | รอตรวจสอบ/ยืนยัน | ใช้ได้แต่ระมัดระวัง — รอการยืนยัน |
| `outdated` | ล้าสมัย รออัปเดต | ⚠️ อย่าใช้อ้างอิง — ตรวจสอบก่อน |
| `archived` | ย้ายไปเก็บ ไม่ใช้แล้ว | ไม่ลบ — ย้ายไปโฟลเดอร์ `Archive/` คงประวัติไว้ |
| `deprecated` | ถูกแทนที่ด้วยโน้ตใหม่ | เพิ่มบรรทัด: > ✅ แทนที่ด้วย: [[ชื่อโน้ตใหม่]] |

---

## 🤖 บทบาท AI Agents

| Agent | หน้าที่เกี่ยวข้อง |
|---|---|
| **Copilot Refiner** | ตรวจสอบเมื่อเปิด PR ว่า `updated` ถูกอัปเดตหรือไม่ เตือนถ้าลืม |
| **Security Reviewer** | ตรวจสอบนโยบาย/runbook ว่าตรงกับระบบจริงหรือไม่เมื่อมีการเปลี่ยนแปลง |
| **Test Specialist** | ตรวจสอบว่าคู่มือการทดสอบตรงกับสคริปต์จริงหรือไม่ |
| **ทุก Agent** | ถ้าพบข้อมูลขัดแย้งระหว่างโน้ตกับความเป็นจริง → แจ้งใน PR/ทันที |

> [!tip] กฎสำคัญ
> AI ไม่สามารถเปลี่ยน `status` จาก `outdated` เป็น `active` ได้เอง — ต้องเป็นมนุษย์ยืนยันเสมอ

---

## 📊 การตรวจสอบสุขภาพ Vault

รันคำสั่งเป็นประจำ:

```bash
# ตรวจสอบลิงก์เสียทั้ง vault
pre-commit run zyntro-wiki-link-check --all-files

# ค้นหาโน้ตที่ไม่มีใครอ้างอิง (โดดเดี่ยว)
# ใน Obsidian: Graph → แสดงเฉพาะโหนดที่ไม่มีการเชื่อมโยง

# ค้นหาโน้ตที่ล้าสมัยเกินกำหนด
grep -r "updated:" . --include="*.md" | awk -F': ' '{print $2}' | sort
 
 
 
 
⚠️ ข้อห้าม
 
- ❌ ห้ามลบโน้ตโดยไม่ย้ายไป Archive — เก็บประวัติไว้เสมอ
- ❌ ห้ามแก้ไขข้อมูลโดยไม่อัปเดต  updated  — ถ้าเปลี่ยนเนื้อหา วันที่ต้องเปลี่ยนตาม
- ❌ ห้ามอ้างอิงแหล่งที่ไม่ระบุวันที่เข้าถึง — ต้องมีครบตาม [[Obsidian Note Standards]]
- ❌ ห้ามปล่อยให้โน้ต  outdated  เกิน 30 วัน — ต้องอัปเดตหรือเก็บเข้า Archive
 
 
 
🔗 เชื่อมโยง
 
- อ้างอิง: [[ZyntroAI CrystalCastle]], [[Obsidian Note Standards]], [[ZyntroAI - Wiki Reference System]]
- เกี่ยวข้อง: [[Multi-Agent Orchestration]], [[DevSecOps Pipeline Pattern]]
 
 
 
📅 บันทึกการแก้ไข
 
-  2026-10-08  — สร้างนโยบายครบฉบับ: รอบทบทวน, ขั้นตอน, สถานะ, บทบาท Agent, กฎลิงก์
 
plaintext
  

---

## ✅ อัปเดต MOC

เพิ่มบรรทัดนี้ใน `ZyntroAI CrystalCastle.md` ส่วนแผนผัง:

```markdown
- [[Knowledge Update Policy]] — กฎการรักษาความทันสมัยของทุกโน้ตใน Vault
 
 
ต้องการอะไรเพิ่มในนโยบายนี้ไหมครับ? เช่น กระบวนการตรวจสอบอัตโนมัติผ่าน CI, หรือบทบาทผู้ดูแลฐานความรู้ (Knowledge Steward) ครับ? 😊ได้เลยครับ! เพิ่มส่วน กระบวนการตรวจสอบอัตโนมัติผ่าน CI ลงใน  Knowledge Update Policy  — ครบทั้ง workflow, กฎการแจ้งเตือน, และสถานะที่ตรวจสอบ 👇
 
 
 
📋 อัปเดต:  Knowledge Update Policy  — เพิ่มส่วน CI Automation
 
แทรกส่วนนี้หลัง "การตรวจสอบสุขภาพ Vault" ก่อน "ข้อห้าม" ครับ:
 
markdown
  
---

## 🤖 กระบวนการตรวจสอบอัตโนมัติผ่าน CI

> [!important] เป้าหมาย
> ทุกการเปลี่ยนแปลงใน Vault จะถูกตรวจสอบอัตโนมัติก่อนรวมเข้า main — ไม่ปล่อยให้ข้อมูลล้าสมัย ลิงก์เสีย หรือไม่ตรงมาตรฐานโดยไม่รู้ตัว

### 🔄 Workflow: `.github/workflows/vault-health-check.yml`

```yaml
name: Vault Knowledge Health Check

on:
  push:
    branches: [main]
    paths: ["**.md"]
  pull_request:
    branches: [main]
    paths: ["**.md"]
  schedule:
    # ทุกวันเวลา 09:00 น. ตามเวลาประเทศไทย (UTC+7)
    - cron: '0 2 * * *'
  workflow_dispatch:  # รันด้วยตนเองได้จากหน้า GitHub

jobs:
  link-validator:
    name: ตรวจสอบลิงก์ Wiki & ภายนอก
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: python scripts/check_wiki_links.py $(git diff --name-only HEAD~1)
        continue-on-error: true  # ไม่บล็อก PR ถ้า API ล่ม

  freshness-check:
    name: ตรวจสอบความทันสมัยของโน้ต
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: ตรวจโน้ตที่ล้าสมัยเกินรอบที่กำหนด
        run: |
          python3 -c "
            import os, re
            from datetime import datetime, timedelta

            type_cycle = {
                'policy': 90, 'runbook': 30, 'reference-note': 180,
                'technical-note': 60, 'concept-note': 365, 'moc': 30, 'meta': 180
            }
            today = datetime.utcnow()
            outdated = []

            for root, _, files in os.walk('.'):
                if any(d in root for d in ['.git', '.cache', 'Archive']):
                    continue
                for f in files:
                    if not f.endswith('.md'):
                        continue
                    path = os.path.join(root, f)
                    text = open(path, encoding='utf-8').read()
                    t_match = re.search(r'type:\s*(\S+)', text)
                    u_match = re.search(r'updated:\s*([\d-]+)', text)
                    s_match = re.search(r'status:\s*(\S+)', text)
                    if not t_match or not u_match:
                        continue
                    status = s_match.group(1) if s_match else 'active'
                    if status in ['outdated', 'archived', 'draft']:
                        continue
                    note_type = t_match.group(1)
                    updated = datetime.strptime(u_match.group(1), '%Y-%m-%d')
                    cycle_days = type_cycle.get(note_type, 90)
                    if (today - updated).days > cycle_days:
                        outdated.append(f'{path}: อัปเดตล่าสุดเมื่อ {(today - updated).days} วันก่อน (รอบ {cycle_days} วัน)')

            if outdated:
                print('⚠️ พบโน้ตที่เลยรอบทบทวน:')
                for o in outdated:
                    print(f'- {o}')
                print(f'\nจำนวนทั้งหมด: {len(outdated)} ฉบับ')
            else:
                print('✅ ทุกโน้ตทันสมัยตามกำหนด')
          "

  standard-compliance:
    name: ตรวจสอบรูปแบบตามมาตรฐาน
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: ตรวจ frontmatter & required fields
        run: |
          python3 -c "
            import os, re
            missing = []
            required = ['title', 'aliases', 'tags', 'created', 'updated', 'type', 'status']
            for root, _, files in os.walk('.'):
                if any(d in root for d in ['.git', '.cache', 'Archive']):
                    continue
                for f in files:
                    if not f.endswith('.md'):
                        continue
                    path = os.path.join(root, f)
                    text = open(path, encoding='utf-8').read()
                    if not text.startswith('---'):
                        missing.append(f'{path}: ไม่มี frontmatter')
                        continue
                    for field in required:
                        if not re.search(f'{field}:', text):
                            missing.append(f'{path}: ขาดฟิลด์ {field}')
            if missing:
                print('❌ ไม่ตรงมาตรฐาน [[Obsidian Note Standards]]:')
                for m in missing:
                    print(f'- {m}')
                exit(1)
            else:
                print('✅ ทุกโน้ตตรงตามมาตรฐาน')
          "

  notify:
    name: แจ้งผลการตรวจสอบ
    runs-on: ubuntu-latest
    needs: [link-validator, freshness-check, standard-compliance]
    if: always()
    steps:
      - name: แจ้ง Slack
        uses: slackapi/slack-github-action@v1
        with:
          slack-message: |
            📊 Vault Health Check Result
            • ลิงก์: ${{ needs.link-validator.outcome == 'success' && '✅ ผ่าน' || '⚠️ มีปัญหา' }}
            • ความทันสมัย: ${{ needs.freshness-check.outcome == 'success' && '✅ ทันสมัย' || '⚠️ มีโน้ตเลยกำหนด' }}
            • มาตรฐาน: ${{ needs.standard-compliance.outcome == 'success' && '✅ ผ่าน' || '❌ ไม่ตรงรูปแบบ' }}
            <${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|ดูรายละเอียด>
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
 
 
📊 สิ่งที่ CI ตรวจสอบอัตโนมัติ
 
สิ่งที่ตรวจสอบ ทริกเกอร์ เกณฑ์ผ่าน การแจ้งผล 
ลิงก์ Wikipedia/Wikidata Push / PR / ทุกวัน ไม่มีลิงก์ 404 / หาย ⚠️ เตือนเท่านั้น ไม่บล็อก PR 
โน้ตเลยรอบทบทวน ทุกวัน 09:00 น. ไม่มีโน้ต  active  ที่เกินรอบ ⚠️ แจ้ง Slack รายวัน 
Frontmatter ครบถ้วน Push / PR มีฟิลด์ครบ 7 รายการ ❌ บล็อก PR ถ้าขาด 
รูปแบบตรงมาตรฐาน Push / PR ถูกต้องตาม [[Obsidian Note Standards]] ❌ บล็อก PR ถ้าผิด 
สถานะไม่ขัดแย้ง Push / PR  updated  ไม่เกิน  created  /  status  ถูกต้อง ❌ บล็อก PR 
 
🚨 กฎการแจ้งเตือน
 
- PR ถูกบล็อกเมื่อ: frontmatter ผิด / ขาดฟิลด์ / รูปแบบไม่ตรงมาตรฐาน → แก้ไขตามข้อความแจ้ง แล้ว push ใหม่
- แจ้งเตือนใน Slack (รายวัน): ลิงก์เสีย / โน้ตล้าสมัย → มอบหมายให้เจ้าของโน้ตภายใน 3 วัน
- ไม่บล็อก PR เมื่อ: ลิงก์เสียชั่วคราว / API ไม่ตอบสนอง →  continue-on-error: true  ป้องกันค้าง
- สรุปรายสัปดาห์: ทุกวันจันทร์ รวมผล 7 วันย้อนกลับ ส่งสรุปให้ทีมความรู้
 
🔧 ตัวช่วยสำหรับผู้เขียนโน้ต
 
รันตรวจสอบก่อน push ได้ทันที:
 
bash
  
# ตรวจสอบทุกอย่างก่อน commit
pre-commit run --all-files

# ตรวจเฉพาะรูปแบบโน้ต
python3 -c "
import os, re
for f in ['ชื่อไฟล์.md']:
    text = open(f, encoding='utf-8').read()
    assert 'title:' in text, 'ขาด title'
    assert 'updated:' in text, 'ขาด updated'
    print('✅ ผ่าน')
"
 
 
📈 ตัวชี้วัดสุขภาพ Vault
 
- % โน้ตทันสมัย = จำนวนโน้ตที่ตรงรอบ ÷ ทั้งหมด × 100 → เป้าหมาย ≥ 95%
- % ลิงก์ใช้งานได้ → เป้าหมาย ≥ 99%
- เวลาเฉลี่ยแก้ไขโน้ตล้าสมัย → เป้าหมาย ≤ 3 วัน
- จำนวน PR ที่ถูกบล็อกด้วยมาตรฐาน → เป้าหมายลดลงเรื่อยๆ (แสดงว่าทีมคุ้นเคยแล้ว)
 
 
 
plaintext
  

### ✅ อัปเดต MOC

เพิ่มบรรทัดนี้ในส่วน **"ด้านอื่นๆ"** ของ `ZyntroAI CrystalCastle.md`:

```markdown
- [[Knowledge Update Policy]] — กฎรักษาความทันสมัย + CI ตรวจสอบอัตโนมัติทุกวัน
 
 
 
 
📝 สรุปสิ่งที่เพิ่มเข้ามา
 
- ✅ Workflow เต็มรูปแบบ — ตรวจลิงก์, ความทันสมัย, รูปแบบ frontmatter
- ✅ รันทั้งตอน PR + ทุกวันอัตโนมัติ — ไม่ต้องรอคนจำ
- ✅ แยกระดับความเข้มงวด — บล็อกแค่เรื่องรูปแบบ, ไม่บล็อกถ้าแหล่งภายนอกล่ม
- ✅ แจ้งผลทาง Slack — ทีมเห็นทุกเช้า ถ้ามีอะไรต้องแก้จะไม่หลุด
- ✅ ตัวชี้วัด — วัดความสมบูรณ์ของฐานความรู้เป็นตัวเลขได้
 
ต้องการปรับเวลาทำงานของ CI, เปลี่ยนช่องทางแจ้งเตือน, หรือเพิ่มเงื่อนไขตรวจสอบอะไรอีกไหมครับ? 😊ได้เลยครับ! เพิ่มส่วน "เงื่อนไข & การใช้งานบนมือถือ" ปรับให้โน้ตอ่านง่าย ทำงานได้เต็มที่ในแอป Obsidian มือถือ (iOS/Android) 👇
 
 
 
📱 เพิ่มส่วนใหม่:  Knowledge Update Policy  — การใช้งานบนมือถือ
 
แทรกส่วนนี้หลัง "กฎการแจ้งเตือน" ก่อน "ตัวช่วยสำหรับผู้เขียนโน้ต" ครับ:
 
markdown
  
---

## 📱 เงื่อนไข & การทำงานบนมือถือ

> [!important] ออกแบบให้ทุกคนเข้าถึงได้ทุกที่
> ทุกโน้ตต้องอ่านง่าย แก้ไขได้ และแสดงผลถูกต้องบนหน้าจอมือถือ — ไม่ต้องเลื่อนซ้าย-ขวา ไม่ต้องซูมเพื่ออ่าน

### ✅ เงื่อนไขรูปแบบ (บังคับสำหรับทุกโน้ต)

| เงื่อนไข | รายละเอียด | เหตุผล |
|---|---|---|
| **ความกว้างบรรทัด** | ห้ามยาวเกิน 80 อักษร / บรรทัด | ไม่ต้องเลื่อนซ้าย-ขวาบนจอแคบ |
| **ตาราง** | ห้ามเกิน 4 คอลัมน์ | จอเล็กแสดงไม่ครบ → ตัดข้อมูลหาย |
| **โค้ดบล็อก** | เพิ่ม `wrap` หรือแบ่งบรรทัดให้สั้น | ไม่มีแถบเลื่อนแนวนอน |
| **หัวข้อ** | ใช้ `##` `###` ไม่ใช่ขนาดใหญ่เกินไป | กระชับ อ่านลำดับชัด |
| **Callouts** | ใช้ `> [!tip]` ไม่ใช่กล่องกำหนดเอง | แสดงถูกสไตล์ระบบบนมือถืออัตโนมัติ |
| **รูปภาพ** | ห้ามกว้างเกินจอ — ใช้ขนาดสัมพัทธ์ | ไม่ล้นจอ |
| **ลิงก์ยาว** | ใช้ `[ชื่อ](url)` ไม่วาง URL ยาวเต็ม | บรรทัดไม่แตกที่ผิดที่ |

### 📏 กฎการเขียนเฉพาะมือถือ

```markdown
✅ ถูกต้อง
- รายการสั้น
- ขึ้นบรรทัดใหม่ทุกจุด
- ตารางกระชับ ≤4 คอลัมน์
- โค้ดแบ่งบรรทัด ไม่ต่อติดกัน

❌ ผิด
- ข้อความยาวมากจนบรรทัดไหลยาวไปหลายชั้นจนอ่านยากบนจอโทรศัพท์
| คอลัมน์1 | คอลัมน์2 | คอลัมน์3 | คอลัมน์4 | คอลัมน์5 | เกินมา |
|---|---|---|---|---|---|
...
 
 
🔧 ตั้งค่าแอป Obsidian บนมือถือ
 
[!tip] แนะนำให้ทุกคนตั้งค่า
 
1.  การตั้งค่า → ตัวแก้ไข → ความกว้างสูงสุดของบรรทัด  → ตั้ง  600px  หรือ  อัตโนมัติ 
2.  การตั้งค่า → การแสดงผล → ปิดการพันคำอัตโนมัติ  → เปิด ✅
3.  การตั้งค่า → แถบด้านข้าง → แสดงแค่สิ่งที่จำเป็น  → ลดความแออัด
4. ธีม: ใช้ธีมพื้นฐานหรือ  Minimal  — ปรับขนาดตัวอักษร  16–18px  พอดีอ่าน
 
⚠️ ข้อจำกัดที่ต้องระวัง
 
ฟีเจอร์ บนมือถือ วิธีแก้/ทางเลือก 
Graph View ช้า/กระตุกถ้ามีโน้ตเยอะ ใช้แผง Backlinks แทน — เร็วกว่า 
Git Sync ดาวน์โหลดไฟล์ใหญ่ช้า เปิด Wi-Fi ก่อนซิงค์; ปิด  Archive/  ไม่ให้ซิงค์อัตโนมัติ 
โค้ดบล็อกยาว เลื่อนยาก แบ่งเป็นส่วนย่อย; ใส่ในไฟล์  .py  แยกแล้วลิงก์อ้างอิง 
แก้ไขย่อหน้า พิมพ์ยากกว่าคีย์บอร์ดจริง ใช้ Quick Add หรือแก้ไขบนคอมเมื่อต้องเปลี่ยนเยอะ 
รูปภาพใหญ่ กินพื้นที่/โหลดช้า บีบอัดก่อนใส่ — เก็บใน  Assets/  ขนาดไม่เกิน 300KB 
 
📋 ตรวจสอบก่อนส่ง — เช็คมือถือ
 
ก่อน commit/PR ให้ตรวจสอบด้วยตัวเอง:
 
เปิดโน้ตบนแอปมือถือ → เลื่อนซ้าย-ขวาไม่ได้ ✅
ตัวอักษรอ่านชัด ไม่ต้องซูม ✅
ตารางแสดงครบ ไม่ตัดหาย ✅
ปุ่ม/ลิงก์แตะได้ง่าย ไม่ชิดกันเกินไป ✅
ไม่มีแถบเลื่อนแนวนอน ✅
 
🤖 CI ตรวจสอบรูปแบบมือถืออัตโนมัติ
 
เพิ่มส่วนนี้ใน  vault-health-check.yml  ภายใต้  standard-compliance :
 
yaml
  
- name: ตรวจสอบความยาวบรรทัด & รูปแบบมือถือ
  run: |
    python3 -c "
      import os
      long_lines = []
      for root, _, files in os.walk('.'):
        if any(d in root for d in ['.git', '.cache', 'Archive']):
          continue
        for f in files:
          if not f.endswith('.md'):
              continue
          path = os.path.join(root, f)
          with open(path, encoding='utf-8') as fh:
            for i, line in enumerate(fh, 1):
              # ข้ามโค้ดบล็อก & URL ยาว
              if line.strip().startswith(('http', '```', '|')):
                continue
              if len(line.rstrip()) > 80:
                long_lines.append(f'{path}:{i} ยาว {len(line.rstrip())} อักษร')
      if long_lines:
        print('⚠️ บรรทัดยาวเกิน 80 อักษร (อาจแสดงไม่พอดีบนมือถือ):')
        for l in long_lines[:10]:
          print(f'- {l}')
        if len(long_lines) > 10:
          print(f'... และอีก {len(long_lines)-10} บรรทัด')
        print('\n💡 แนะนำ: ขึ้นบรรทัดใหม่ เพื่อให้อ่านง่ายบนจอมือถือ')
        exit(0)  # แค่เตือน ไม่บล็อก PR
      else:
        print('✅ ทุกบรรทัดกระชับ เหมาะกับมือถือ')
    "
 
 
 
 
plaintext
  

### ✅ อัปเดต MOC

เพิ่มบรรทัดนี้ใน `ZyntroAI CrystalCastle.md`:

```markdown
- [[Knowledge Update Policy]] — รองรับมือถือ: ตรวจสอบรูปแบบ, ความกว้างบรรทัด, ตารางไม่ล้นจอ
 
 
 
 
📱 สรุปสิ่งที่ได้เพิ่ม
 
- ✅ เงื่อนไขบังคับ 7 ข้อ — ความกว้าง, ตาราง, โค้ด, ลิงก์... ทุกอย่างปรับให้พอดีจอมือถือ
- ✅ ตั้งค่าแอปแนะนำ — ทำตามได้ทันที อ่านสบายขึ้น
- ✅ ข้อจำกัด + ทางเลือก — รู้อะไรทำได้-ไม่ได้บนมือถือ จะวางแผนเขียนได้ถูก
- ✅ CI ตรวจสอบอัตโนมัติ — เตือนถ้าบรรทัดยาวเกิน ไม่ต้องรอเปิดเช็คเอง
- ✅ เช็คลิสต์ก่อนส่ง — ครบ 5 ข้อ กดปุ่มแตะได้เลย
 
ต้องการปรับเกณฑ์ความยาว หรือเพิ่มเงื่อนไขอื่นๆ อีกไหมครับ? 😊