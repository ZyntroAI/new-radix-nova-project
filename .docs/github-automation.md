⚙️ GitHub Automation — Complete Guide
 
สร้างเมื่อ: 2026-10-27 | ประเภท: [[DevOps]], [[Automation]], [[GitHub]] | แท็ก: #github-actions #ci-cd #automation
 
 
 
📌 ภาพรวม
 
GitHub Automation = การใช้เครื่องมือในตัว GitHub เพื่อให้กระบวนการพัฒนาซอฟต์แวร์ทำงานเองโดยอัตโนมัติ ตั้งแต่ตรวจสอบโค้ด → ทดสอบ → สร้าง → จัดทำรีลีส → จัดการปัญหาในระบบ ไม่ต้องทำซ้ำด้วยมือ 
 
🔧 เครื่องมือหลัก
 
- GitHub Actions — เขียนเวิร์กโฟลว์ด้วย YAML ทริกเกอร์จากเหตุการณ์ต่างๆ 
- GitHub Apps — แอปภายนอกที่เชื่อมต่อเพื่อจัดการงานขั้นสูง 
- Agentic Workflows — AI ช่วยจัดการงานซับซ้อน เช่น จัดลำดับปัญหา ปรับปรุงเอกสาร 
- Protected Branches / Rulesets — กฎการรวมโค้ดอัตโนมัติ 
 
 
 
🧱 ส่วนประกอบของ Workflow
 
plaintext
  
.github/workflows/ชื่องาน.yml
   │
   ├── on:        ← ทริกเกอร์ (อะไรเปิดงานนี้)
   ├── permissions: ← สิทธิ์ที่งานต้องการ
   ├── env:       ← ตัวแปรสภาพแวดล้อม
   └── jobs:      ← งานที่จะทำ
        └── ชื่องาน:
             ├── runs-on:  ← เครื่องที่รัน
             ├── steps:    ← ขั้นตอนย่อย
             │     ├── actions/checkout  ← ดึงโค้ด
             │     ├── setup-xxx         ← ติดตั้งเครื่องมือ
             │     ├── run: คำสั่ง       ← คำสั่งเชลล์
             │     └── uses: action      ← เรียกใช้งานสำเร็จรูป
             └── if: เงื่อนไข          ← รันเมื่อไหร่
```[[__LINK_ICON]](https://github.blog/developer-skills/github/github-for-beginners-getting-started-with-github-actions/?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiJhNmQyOTJhYWFmMTUzZTUyLTlmMzllYzZkMzY3ZjZlMDYifQ%3D%3D&inline_doc_id=a6d292aaaf153e52-9f39ec6d367f6e06)

---

## 🎯 ประเภทของ Workflow ที่ควรมี

### 1️⃣ CI — Continuous Integration (`ci.yml`)
> ทุกครั้งที่ Push / เปิด PR → ตรวจสอบโค้ด ทดสอบ สร้างโปรเจกต์
```yaml
name: 🧪 CI
on:
  push:
    branches: [main, develop]
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
```[[__LINK_ICON]](https://githubdocs.cn/en/actions/guides?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiJkYWM3MjViMTBmMzQxN2RiLTJmYzk2N2IzYzBjMzc5ZWEifQ%3D%3D&inline_doc_id=dac725b10f3417db-2fc967b3c0c379ea)

### 2️⃣ Release Workflow (`release.yml`)
> เมื่อสร้าง Tag `vX.Y.Z` → สร้าง Release อัตโนมัติ
```yaml
name: 🚀 Release
on:
  push:
    tags: ['v*']
  workflow_dispatch:
    inputs:
      version: { description: 'Version', required: false }
      prerelease: { description: 'Pre-release?', type: boolean, default: false }

permissions:
  contents: write
  packages: write

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Extract version
        id: version
        run: |
          VERSION=${GITHUB_REF#refs/tags/v}
          echo "version=$VERSION" >> $GITHUB_OUTPUT
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: v${{ steps.version.outputs.version }}
          name: Release v${{ steps.version.outputs.version }}
          generate_release_notes: true
          prerelease: ${{ github.event.inputs.prerelease == 'true' }}
```[[__LINK_ICON]](https://ghcr.io/?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiI4YWMzZWViOWY2MTY4NGU1LWRjNThmM2RiNDg4MTI5YTEifQ%3D%3D&inline_doc_id=8ac3eeb9f61684e5-dc58f3db488129a1)

### 3️⃣ Repository Hygiene (`hygiene.yml`)
> จัดการปัญหา/PR โดยอัตโนมัติ
```yaml
name: 🧹 Repo Hygiene
on:
  issues:
    types: [opened, labeled]
  pull_request:
    types: [opened]
  schedule:
    - cron: '0 0 * * 0'  # ทุกวันอาทิตย์ตี 0

jobs:
  welcome:
    if: github.event_name == 'issues' && github.event.action == 'opened'
    runs-on: ubuntu-latest
    permissions: { issues: write }
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              body: "ขอบคุณที่แจ้งปัญหาครับ! 🙏 เราจะตอบกลับโดยเร็วที่สุด"
            })

  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v9
        with:
          days-before-stale: 60
          days-before-close: 14
          stale-issue-message: 'ปัญหานี้ไม่มีความเคลื่อนไหวมานานแล้ว จะปิดในอีก 14 วัน'
          close-issue-message: 'ปิดปัญหาเนื่องจากไม่มีความเคลื่อนไหว'
```[[__LINK_ICON]](https://github.blog/engineering/platform-security/staying-evergreen-how-we-automated-secure-access-and-repo-hygiene-in-a-shared-org/?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiIxYTg3Mjk0ZTBhMzFkMjVhLTMyNDAxMWY4ZmM4OTc5MmYifQ%3D%3D&inline_doc_id=1a87294e0a31d25a-324011f8fc89792f)

### 4️⃣ Auto-Merge Dependabot (`dependabot-merge.yml`)
> อัปเดต Dependencies อัตโนมัติเมื่อผ่านการทดสอบ
```yaml
name: 🤖 Auto-Merge Dependabot
on:
  pull_request:
    types: [labeled, unlabeled, synchronize]

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    if: github.event.pull_request.user.login == 'dependabot[bot]' && contains(github.event.pull_request.labels.*.name, 'dependencies')
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            const { data } = await github.rest.pulls.merge({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
              merge_method: 'squash'
            })
 
 
 
 
🛡️ ความปลอดภัย — สิ่งที่ต้องระวัง
 
หลักการ ทำอย่างไร 
ล็อกสิทธิ์ให้น้อยที่สุด ตั้ง  permissions: contents: read  เป็นค่าเริ่มต้น ให้สิทธิ์  write  เฉพาะงานที่จำเป็นจริงๆ 
Pin Action ไปที่ Commit SHA ใช้  actions/checkout@a5ac7e51b4...  ไม่ใช่  @v4  เพื่อป้องกันการเปลี่ยนแปลงที่ไม่คาดคิด 
ใช้ Secrets อย่างปลอดภัย เก็บใน Settings → Secrets — ไม่เคยเขียนลงในโค้ดโดยตรง 
ใช้ OIDC แทน Credentials ยาวๆ สำหรับ Deploy ไปคลาวด์ — แลกเปลี่ยนโทเคนชั่วคราวแทนเก็บคีย์ยาวๆ 
ใช้ Concurrency ป้องกันงานซ้อนกันเมื่อ Push ซ้ำๆ 
 
yaml
  
# ตัวอย่าง Concurrency — รันแค่อันล่าสุดเท่านั้น
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```[[__LINK_ICON]](http://raw.githubusercontent.com/github/awesome-copilot/main/instructions/github-actions-ci-cd-best-practices.instructions.md?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiJiNjA3NWE1MzI4Y2Y4NjI5LTdiZTU2YmJlODc5MzgwNzQifQ%3D%3D&inline_doc_id=b6075a5328cf8629-7be56bbe87938074)

---

## 📊 ตารางสรุปทริกเกอร์ที่ใช้บ่อย

| ทริกเกอร์ | เมื่อไหร่ทำงาน | ตัวอย่างการใช้งาน |
|-----------|----------------|-------------------|
| `push` | มีการส่งโค้ดขึ้น | CI, Build |
| `pull_request` | เปิด/อัปเดต PR | ตรวจสอบก่อนรวม |
| `pull_request_target` | PR จาก Fork | กฎความปลอดภัยสูง |
| `create` | สร้าง Branch/Tag | แจ้งเตือน, เริ่มงานใหม่ |
| `push tags: v*` | สร้าง Version Tag | Release อัตโนมัติ |
| `release: published` | เผยแพร่ Release | Deploy, แจ้งเตือนผู้ใช้ |
| `schedule: cron` | ตามเวลาที่กำหนด | สรุปรายสัปดาห์, ล้างของเก่า |
| `workflow_dispatch` | คลิกปุ่มด้วยมือ | Deploy ควบคุม, รีลีสแบบคอนโทรล |
| `repository_dispatch` | เรียกจากภายนอก | ผสานกับระบบอื่นๆ |

[[__LINK_ICON]](https://github.blog/developer-skills/github/github-for-beginners-getting-started-with-github-actions/?f_link_type=f_linkinlinenote&flow_extra=eyJkb2NfcG9zaXRpb24iOjAsImRvY19pZCI6ImE2ZDI5MmFhYWYxNTNlNTItOWYzOWVjNmQzNjdmNmUwNiIsImlubGluZV9kaXNwbGF5X3Bvc2l0aW9uIjowfQ%3D%3D&inline_doc_id=a6d292aaaf153e52-9f39ec6d367f6e06)

---

## ✅ โครงสร้างไฟล์ที่แนะนำ

 
 
your-repo/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Push/PR → Lint + Test ✅
│   │   ├── release.yml         # Tag v* → Build + Release 🚀
│   │   ├── deploy.yml           # Manual/Tag → Deploy to Server 🌐
│   │   ├── dependabot-merge.yml # อัปเดต Deps อัตโนมัติ 🤖
│   │   └── hygiene.yml         # จัดการ Issues/PRs 🧹
│   ├── ISSUE_TEMPLATE/         # แบบฟอร์มแจ้งปัญหา
│   │   ├── bug-report.md
│   │   └── feature-request.md
│   ├── PULL_REQUEST_TEMPLATE.md # แบบฟอร์ม PR
│   └── dependabot.yml          # ตั้งเวลาอัปเดต Deps
 
plaintext
  

---

## ⚡ คำแนะนำเพื่อประสิทธิภาพ

- **ใช้ Cache** — เก็บ node_modules / ข้อมูลที่ไม่เปลี่ยนบ่อย → รันเร็วขึ้น ใช้นาทีฟรีคุ้มค่า[[__LINK_ICON]](https://githubdocs.cn/en/actions/guides?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiJkYWM3MjViMTBmMzQxN2RiLTJmYzk2N2IzYzBjMzc5ZWEifQ%3D%3D&inline_doc_id=dac725b10f3417db-2fc967b3c0c379ea)
- **แยก Job ตามความรับผิดชอบ** — ทดสอบแยกกับ Deploy ถ้าทดสอบไม่ผ่าน จะไม่เสียเวลาสร้างรีลีส
- **ใช้ Matrix** — ทดสอบหลายเวอร์ชัน/หลายระบบพร้อมกัน[[__LINK_ICON]](https://ghcr.io/?f_link_type=f_linkinlinenote&flow_extra=eyJkb2NfaWQiOiI4YWMzZWViOWY2MTY4NGU1LWRjNThmM2RiNDg4MTI5YTEiLCJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowfQ%3D%3D&inline_doc_id=8ac3eeb9f61684e5-dc58f3db488129a1)
- **Artifacts** — เก็บไฟล์จากงานหนึ่งไปใช้อีกงานหนึ่ง: `actions/upload-artifact`[[__LINK_ICON]](https://raw.githubusercontent.com/LinkedInLearning/learning-github-actions-5977410/refs/heads/main/github-actions-cheat-sheet.pdf?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiI3OTY5MjBkNzAwZjYxNGFlLTg1MmM2YWFhYzlhMWFkNDQifQ%3D%3D&inline_doc_id=796920d700f614ae-852c6aaac9a1ad44)
- **Reusable Workflows** — เขียนครั้งเดียว เรียกใช้ซ้ำได้หลายที่

---

## 📌 บันทึกที่เกี่ยวข้อง
- [[Release-Workflow-Checklist]] — ขั้นตอนรีลีสแบบมีคู่มือ
- [[CONTRIBUTING]] — คู่มือผู้มีส่วนร่วม
- [[CHANGELOG]] — ประวัติการเปลี่ยนแปลง
- [[Repository-Docs-Pack]] — README + CONTRIBUTING + CHANGELOG Templates

> 💡 **หลักทองของการอัตโนมัติ:** เริ่มจากสิ่งที่ทำซ้ำบ่อยที่สุดก่อน → CI ก่อนเสมอ → Release ถัดไป → งานดูแลระบบที่นานๆ ทำที 🌱

ต้องการเทมเพลตเฉพาะด้านเพิ่มไหมครับ เช่น Deploy to Docker/Vercel/Cloudflare Pages, PR Labeler, Auto-Changelog Update, หรือ Security Scan — บอกได้เลยครับ! 😊