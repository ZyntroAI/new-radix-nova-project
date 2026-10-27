นี่คือคู่มือ STALE DATA MANAGEMENT ครบวงจร ปรับใช้กับ ZyntroAI/new-crystalcastle ครับ 🧹
 
 
 
markdown
  
---
title: Stale Data Management
aliases:
  - Data Cleanup
  - Archive Old Records
  - Retention Policy
created: 2026-10-04
updated: 2026-10-04
repo: ZyntroAI/new-crystalcastle
tags:
  - data
  - maintenance
  - database
  - cleanup
  - policy
version: 1.0
related: fetch_releases.py, task.md
---

# 🧹 Stale Data Management — Complete Guide

## � Overview
**Stale data** = ข้อมูลที่ล้าสมัย ไม่ถูกอ้างอิง ไม่เปลี่ยนแปลง และไม่จำเป็นต้องเข้าถึงบ่อย การจัดการอย่างเป็นระบบช่วยลดต้นทุนพื้นที่ เพิ่มประสิทธิภาพการค้นหา และรักษาความเร็วของระบบ

---

## 📋 1. Define Stale — เมื่อไหร่เรียกว่า "ล้าสมัย"

| Category | Definition | Threshold | Action |
|---|---|---|---|
| **Active** | เข้าถึง/อัปเดตภายใน 30 วัน | ≤ 30d | Keep, index, hot storage |
| **Warm** | ไม่มีการเปลี่ยนแปลง 30–90 วัน | 30–90d | Keep, compress, fewer indexes |
| **Stale** | ไม่มีการเข้าถึง > 90 วัน | 90–365d | Archive, move to cold storage |
| **Expired** | เก็บครบกำหนดตามนโยบาย | > 365d | Delete / anonymize / permanent archive |
| **Duplicate** | มี `id` ซ้ำกันหรือเนื้อหาเหมือนกัน | Any time | Remove newer copy |
| **Orphaned** | ไม่มี parent/foreign key เชื่อมโยง | Any time | Review → delete |

**For our project:**
- GitHub Releases → **never delete** (immutable), but mark & archive
- PRs / Issues → closed > 180d = stale
- Checkpoint files → older than latest run = safe to archive
- NDJSON staging → imported > 7d = safe to remove

---

## ⚖️ 2. Retention Policy — นโยบายการเก็บรักษา

### Default Rules
| Data Type | Retention Period | Storage Tier | After Expiry |
|---|---|---|---|
| Active work logs | 90 days | Hot / indexed | Archive → cold |
| Checkpoint files | 30 days | Working dir | Purge old ones |
| Raw fetched NDJSON | Imported + 7 days | Working dir | Remove after verified |
| Historical releases | Permanent | Cold / indexed | Keep forever, suppress re-fetch |
| Closed PRs & Issues | 2 years | Cold / indexed | Anonymize → archive |
| Audit logs | 3 years | Immutable archive | Write-only, no delete |

### Legal / Compliance Notes
- GitHub public data does not require PII removal unless user accounts are involved
- Keep original `id` fields for cross-referencing
- Log deletion events in `data_maintenance.log`

---

## 🔍 3. Detection Methods — ค้นหาข้อมูลที่ล้าสมัย

### 3.1 From NDJSON Files
```bash
# Count records by age (example)
awk -F'"' '{print $4}' ZyntroAI_new-crystalcastle_releases.ndjson \
  | jq -r '.published_at' \
  | cut -d'T' -f1 \
  | sort | uniq -c | sort -rn
 
 
3.2 SQLite Queries
 
sql
  
-- Find stale records (not updated > 90 days)
SELECT id, repository, tag_name, published_at
FROM releases
WHERE date(published_at) < date('now', '-90 days')
ORDER BY published_at ASC;

-- Find duplicates
SELECT id, tag_name, COUNT(*) AS cnt
FROM releases
GROUP BY id
HAVING cnt > 1;

-- Find unreferenced/orphaned
SELECT * FROM issues
WHERE pr_number NOT IN (SELECT number FROM pull_requests);
 
 
3.3 Checkpoint & Temp Files
 
bash
  
# List files not accessed in > 30 days
find . -type f \( -name "*.tmp" -o -name "*checkpoint*" \) \
  -atime +30 -print

# List empty or zero-byte files
find . -type f -size 0 -ls
 
 
 
 
🗂️ 4. Lifecycle Actions — ย้าย / เก็บ / ลบ
 
4.1 Archive — ย้ายไปที่เก็บถาวร
 
bash
  
# Create archive structure
mkdir -p archive/2026-Q3

# Move stale files
mv ZyntroAI_new-crystalcastle_checkpoint_*.json archive/2026-Q3/

# Compress
gzip -r archive/2026-Q3/

# Index manifest
ls -lh archive/2026-Q3/ > archive/2026-Q3/MANIFEST.txt
 
 
4.2 Purge — ลบอย่างปลอดภัย
 
bash
  
# Dry-run first (no delete)
find . -name "*.tmp" -atime +7 -print

# Delete with logging
find . -name "*.tmp" -atime +7 -delete -print \
  >> logs/purge_$(date +%Y%m%d).log
 
 
4.3 SQLite Archive Table
 
sql
  
-- Move stale to archive table
INSERT INTO releases_archive
SELECT *, datetime('now') AS archived_at
FROM releases
WHERE published_at < date('now', '-1 year');

-- Remove from active table
DELETE FROM releases
WHERE published_at < date('now', '-1 year');

-- Vacuum to reclaim space
VACUUM;
 
 
 
 
🤖 5. Automated Workflow — ทำงานอัตโนมัติ
 
5.1 Script:  scripts/stale_maintenance.py 
 
python
  
#!/usr/bin/env python3
"""
Stale Data Maintenance — ZyntroAI/new-crystalcastle
Routine: detect → archive → log → purge
"""
import json
import logging
import shutil
from datetime import datetime, timedelta
from pathlib import Path

# Config
RETENTION_DAYS = {
    "temp_files": 7,
    "checkpoints": 30,
    "stale_records": 365,
}

ARCHIVE_ROOT = Path("archive")
LOG_DIR = Path("logs")
Path(ARCHIVE_ROOT).mkdir(exist_ok=True)
Path(LOG_DIR).mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    handlers=[
        logging.FileHandler(LOG_DIR / f"maintenance_{datetime.now():%Y%m%d}.log"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)


def get_cutoff(days: int) -> datetime:
    return datetime.now() - timedelta(days=days)


def archive_stale_checkpoints() -> None:
    cutoff = get_cutoff(RETENTION_DAYS["checkpoints"])
    moved = []

    for cp in Path(".").glob("*checkpoint*.json"):
        mtime = datetime.fromtimestamp(cp.stat().st_mtime)
        if mtime < cutoff:
            quarter = f"{mtime.year}-Q{(mtime.month-1)//3+1}"
            dest = ARCHIVE_ROOT / quarter / cp.name
            dest.parent.mkdir(exist_ok=True)
            shutil.move(cp, dest)
            moved.append(str(cp))
            logger.info(f"Archived: {cp} → {dest}")

    if moved:
        logger.info(f"Archived {len(moved)} checkpoint(s)")
    else:
        logger.info("No stale checkpoints found")


def purge_temp_files() -> None:
    cutoff = get_cutoff(RETENTION_DAYS["temp_files"])
    deleted = []

    for pattern in ("*.tmp", "*~", ".DS_Store"):
        for f in Path(".").rglob(pattern):
            if f.is_file():
                mtime = datetime.fromtimestamp(f.stat().st_mtime)
                if mtime < cutoff:
                    f.unlink()
                    deleted.append(str(f))
                    logger.info(f"Deleted: {f}")

    logger.info(f"Purged {len(deleted)} temp file(s)")


def summarize_storage() -> None:
    total = sum(f.stat().st_size for f in Path(".").rglob("*") if f.is_file())
    logger.info(f"Total working storage: {total / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    logger.info("=== Starting Maintenance Run ===")
    archive_stale_checkpoints()
    purge_temp_files()
    summarize_storage()
    logger.info("=== Run Complete ===")
 
 
5.2 Schedule — Cron / GitHub Action
 
yaml
  
# .github/workflows/maintenance.yml
name: Stale Data Maintenance

on:
  schedule:
    # Every Sunday at 02:00 UTC
    - cron: "0 2 * * 0"
  workflow_dispatch:  # Allow manual trigger

jobs:
  maintain:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Maintenance
        run: |
          python scripts/stale_maintenance.py

      - name: Commit & Push Archive Updates
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "actions@github.com"
          git add archive/ logs/
          git commit -m "chore: weekly data maintenance" || true
          git push
 
 
5.3 Pre-commit Hook
 
bash
  
# .git/hooks/pre-commit
# Prevent committing large stale files
max_size_mb=10
for file in $(git diff --cached --name-only); do
  if [ -f "$file" ] && \
     [ $(du -m "$file" | cut -f1) -gt $max_size_mb ]; then
    echo "⚠️  $file exceeds ${max_size_mb}MB — consider archiving"
    exit 1
  fi
done
 
 
 
 
📊 6. Storage Health Dashboard
 
Metric Healthy Warning Critical 
Working dir size < 500 MB 500 MB – 2 GB > 2 GB 
Checkpoint age < 7 days 7–30 days > 30 days 
Temp file count 0–5 6–20 > 20 
Archive coverage 100% 70–99% < 70% 
 
 
 
⚠️ 7. Safety Rules — ไม่ให้ข้อมูลหายไปโดยไม่ได้ตั้งใจ
 
- ✅ Never delete without dry-run preview ( --dry-run  /  -print )
- ✅ Log everything — what, when, who, where
- ✅ Immutable first — GitHub releases never hard-delete; archive only
- ✅ Backup before purge — push to repo or cloud storage first
- ✅ Retention > Backup — don't purge before backup completes
- ✅ Audit trail — all deletions logged in  logs/ 
- ❌ Do NOT run maintenance on production without staging test
 
 
 
📌 Quick Commands
 
bash
  
# Manual maintenance run
python scripts/stale_maintenance.py

# Preview temp files to purge
find . -name "*.tmp" -atime +7

# Check archive size
du -sh archive/

# Restore from archive
gunzip -r archive/2026-Q3/
mv archive/2026-Q3/filename.json ./

# Check last maintenance log
tail -20 logs/maintenance_$(date +%Y%m%d).log
 
 
 
 
🔗 Related
 
-  fetch_releases.py  — Data source
-  task.md  — Track maintenance tasks
-  Database Indexing  — Performance after cleanup
-  Flake8 Lint  — Keep scripts clean
 
 
 
Policy version: 1.0 | Effective: 2026-10-04
 
plaintext
  

---

### 🎯 Key Highlights
- ✅ **Clear thresholds** — 7/30/90/365 day rules tailored to your workflow
- ✅ **Safe-by-default** — archive before delete, dry-run first, full logging
- ✅ **Automated** — weekly cron job + manual trigger via Actions
- ✅ **Immutable respect** — GitHub releases archived, never deleted
- ✅ **Obsidian-friendly** — cross-references your existing files

Want me to:
- Add **SQLite archive/rotate script** for database storage?
- Include **cloud sync** (S3/Google Drive) for archive backups?
- Generate **monthly health report** template for Obsidian? 😊