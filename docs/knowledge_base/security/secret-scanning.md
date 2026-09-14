# 🔒 Secret Scanning — ZyntroAI/new-radix-nova-project

URL: https://github.com/ZyntroAI/new-radix-nova-project/settings/security/secret-scanning
สถานะ: ✅ พร้อมเปิดใช้ | ❌ ลิงก์เดิมใช้ไม่ได้ (ขาด `/settings/`)
อัปเดต: 2026-09-13

## ลิงก์ที่ถูกต้อง
- ❌ เดิม: `https://github.com/ZyntroAI/new-radix-nova-project/security/secret-scanning`
- ✅ ใหม่: `https://github.com/ZyntroAI/new-radix-nova-project/settings/security/secret-scanning`

## ฟีเจอร์
- ตรวจจับ API key, token, รหัสผ่าน, private key
- สแกนโค้ด, คอมมิต, issue, release, PR
- **Push protection** — บล็อกตั้งแต่ก่อน merge
- เชื่อมต่อ: Slack, Jira, Code Scanning, Dependabot

## การตั้งค่า (ระดับ repo — ไม่ใช่ workflow)
1. Repo → **Settings → Security → Secret scanning**
2. เปิด **Secret scanning** = ON
3. เปิด **Push protection** (บล็อกคอมมิตที่มีความลับ)
4. ทางเลือก: ตั้งค่าการแจ้งเตือน → Slack / อีเมล

## สิทธิ์ที่ต้องใช้
- Role: Owner / Security Manager / Admin
- Token scopes: `repo`, `security_events`, `admin:repo_hook`

## Workflow CI
`.github/workflows/secret-scanning.yml` — สแกนด้วย **Gitleaks** บน push / PR / รายวัน (cron) / manual

> ⚠️ ไฟล์ workflow นี้ **ต้องวางผ่าน UI หรือ CLI ที่มีสิทธิ์ `workflows`** — GitHub App ปัจจุบันยังไม่มีสโคปนี้ จึงดันไฟล์นี้ผ่านบอทไม่ได้ (ดูหัวข้อ "ช่องทางติดตั้ง" ด้านล่าง)

## ⚠️ จุดที่แก้จากเวอร์ชันเดิม
| ต้นฉบับ | ปัญหา | ที่แก้ |
| --- | --- | --- |
| `actions/secret-scanning@v1` | repo ไม่มีจริง (HTTP 404) | ตัดออก — native secret scanning เป็นฟีเจอร์ระดับ repo ไม่ใช่ action |
| `zricethezav/gitleaks-action@v2` | repo ย้ายที่ (301) | ใช้ `gitleaks/gitleaks-action@v2` |
| action ปักหมุด `@vN` | ผิดนโยบาย SHA-pinning | ปักหมุด SHA 40 ตัวทุกตัว |
| `secretScanningEnabled` (GraphQL) | ฟิลด์ไม่มีใน schema | ใช้ REST `/repos/{owner}/{repo}` + `/secret-scanning/alerts` |
| `actions/upload-artifact` ไม่มีไฟล์ | ขั้นตอน fail เมื่อไม่มี `alerts.json` | ใช้ `results.sarif` ของ Gitleaks + `if-no-files-found: ignore` |
| Slack step อ้าง secret เสมอ | fail เมื่อไม่ได้ตั้ง webhook | ตรวจ `SLACK_WEBHOOK` ก่อน แล้วข้ามถ้าไม่ได้ตั้ง |

## ช่องทางติดตั้ง workflow
1. **UI (แนะนำ):** เปิด Actions → New workflow → สร้างไฟล์ `.github/workflows/secret-scanning.yml` แล้ววางเนื้อหาที่แนบมา
2. **CLI:** `gh api -X PUT repos/ZyntroAI/new-radix-nova-project/contents/.github/workflows/secret-scanning.yml ...` ด้วย PAT ที่มีสโคป `workflow`
3. **ให้สิทธิ์ App:** เปิดสโคป `workflows` ให้ GitHub App `fig-ai-agent` แล้วจึงดันผ่านบอทได้

## สคริปต์ตรวจสอบ
`scripts/check-secrets.mjs` — ตรวจสถานะการเปิดใช้ + นับ alert ค้าง (ใช้ REST API)

```bash
GITHUB_TOKEN=xxx node scripts/check-secrets.mjs ZyntroAI/new-radix-nova-project
```
