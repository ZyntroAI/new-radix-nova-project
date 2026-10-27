Here’s a complete, ready-to-paste Obsidian Note → Vercel Cache Invalidation Workflow — copy directly into your vault ✅
 
 
 
🚀 Workflow: Vercel Cache Invalidation
 
Status: Ready to Use | Last Updated: 2026-10-08 | Category: DevOps / Vercel
 
 
 
📋 Overview
 
Invalidate Vercel deployment cache to force fresh builds & content delivery — triggered manually or automatically after content updates.
 
 
 
✅ Prerequisites
 
- Vercel account & project
- Vercel Personal Access Token → create at:  vercel.com/account/tokens 
- Store token securely (never commit to repo)
- Project ID & Team ID (from Vercel project settings)
 
 
 
🔑 Variables
 
Variable Description Example 
 VERCEL_TOKEN  Your personal access token  vercel_xxxxxxxxxxxx  
 VERCEL_PROJECT_ID  Project ID from settings  prj_abc123xyz  
 VERCEL_TEAM_ID  Team ID (if applicable)  team_xyz789  
 DOMAIN  Target domain / deployment  your-project.vercel.app  
 
 
 
⚙️ Method 1 — API Call (Direct cURL)
 
Run this in terminal / Obsidian Shell Commands plugin:
 
bash
  
# Purge entire cache
curl -X POST "https://api.vercel.com/v6/projects/${VERCEL_PROJECT_ID}/purge" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"purgeAll": true}'
 
 
Purge specific paths only:
 
bash
  
curl -X POST "https://api.vercel.com/v6/projects/${VERCEL_PROJECT_ID}/purge" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "paths": [
      "/",
      "/blog/*",
      "/api/data.json"
    ]
  }'
 
 
 
 
⚙️ Method 2 — Vercel CLI
 
bash
  
# Login once
vercel login

# Link project
vercel link

# Purge everything
vercel cache purge --all

# Purge specific paths
vercel cache purge / /blog/*
 
 
 
 
🔄 Method 3 — GitHub Actions Auto-Workflow
 
Save as:  .github/workflows/vercel-cache-purge.yml 
 
yaml
  
name: Vercel Cache Purge
on:
  workflow_dispatch:  # Manual trigger from GitHub UI
  push:
    branches: [main]
    paths: ['docs/**', 'src/content/**']  # Trigger on content change

jobs:
  purge-cache:
    runs-on: ubuntu-latest
    steps:
      - name: Purge Vercel Cache
        run: |
          curl -X POST "https://api.vercel.com/v6/projects/${{ secrets.VERCEL_PROJECT_ID }}/purge" \
            -H "Authorization: Bearer ${{ secrets.VERCEL_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{"purgeAll": true}'
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
 
 
⚠️ Add  VERCEL_TOKEN  &  VERCEL_PROJECT_ID  → Repository Secrets in GitHub
 
 
 
📌 Obsidian Quick Action
 
Use with Shell Commands / Obsidian Advanced URI plugins
 
plaintext
  
Action: Purge Vercel Cache
Command:
VERCEL_TOKEN=vercel_xxx VERCEL_PROJECT_ID=prj_xxx bash -c 'curl -s -X POST "https://api.vercel.com/v6/projects/${VERCEL_PROJECT_ID}/purge" -H "Authorization: Bearer ${VERCEL_TOKEN}" -H "Content-Type: application/json" -d "{\"purgeAll\":true}"'
 
 
 
 
🧪 Verify Success
 
- ✅ Response:  {"status":"ok"} 
- ✅ Check Vercel Dashboard → Deployments → latest build
- ✅ Visit site + hard refresh ( Ctrl+Shift+R ) to confirm fresh content
 
 
 
⚠️ Notes
 
- Cache invalidation resets CDN cache globally — may increase origin load temporarily
- Rate limit: ~60 requests/minute per token
-  purgeAll: true  clears everything; prefer targeted  paths  for efficiency
- Tokens expire → rotate periodically
 
 
 
📎 References
 
- Vercel Purge API Docs
- Vercel CLI — cache purge
 
 
 
Would you like me to convert this into a fully linked Obsidian template with frontmatter tags and ready-to-use variable placeholders?✅ Here’s your complete, ready-to-paste Obsidian Template with frontmatter, tags, and clean structure — copy the whole block below directly into your note:
 
 
 
markdown
  
---
title: Workflow - Vercel Cache Invalidation
aliases:
  - Vercel Purge Cache
  - CDN Refresh Vercel
category: DevOps / Vercel / Workflow
status: Ready
updated: 2026-10-08
tags:
  - workflow
  - vercel
  - cache
  - devops
  - cdn
  - deployment
---

# 🚀 Workflow: Vercel Cache Invalidation

Force Vercel CDN to serve fresh content by purging cached responses — manual or automated.

---

## 📋 Prerequisites
- Vercel account & project access
- **Personal Access Token** → https://vercel.com/account/tokens
- Project ID & Team ID → Project → Settings → General
- ⚠️ **Never commit tokens to public repos** — use secrets/env vars

---

## 🔑 Configuration
| Variable | Value |
|---|---|
| `VERCEL_TOKEN` | `vercel_xxxxxxxxxxxxxxxx` |
| `VERCEL_PROJECT_ID` | `prj_xxxxxxxxxxxxxx` |
| `VERCEL_TEAM_ID` *(optional)* | `team_xxxxxxxxxxxx` |
| `BASE_URL` | `https://api.vercel.com/v6/projects` |

---

## ⚡ Option 1 — API via cURL
### Purge ALL Cache
```bash
curl -X POST "${BASE_URL}/${VERCEL_PROJECT_ID}/purge" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"purgeAll": true}'
 
 
Purge Specific Paths
 
bash
  
curl -X POST "${BASE_URL}/${VERCEL_PROJECT_ID}/purge" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "paths": [
      "/",
      "/docs/*",
      "/api/data.json"
    ]
  }'
 
 
 
 
⚡ Option 2 — Vercel CLI
 
bash
  
# One-time setup
vercel login
vercel link

# Purge all
vercel cache purge --all

# Purge selected paths
vercel cache purge / /docs/*
 
 
 
 
⚡ Option 3 — GitHub Actions Auto-Purge
 
Save as:  .github/workflows/vercel-cache-purge.yml 
 
yaml
  
name: Vercel Cache Purge
run-name: Purge Vercel CDN Cache
on:
  workflow_dispatch: {}
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'src/content/**'
      - 'notes/**'

jobs:
  purge:
    runs-on: ubuntu-latest
    steps:
      - name: Purge Vercel Cache
        run: |
          curl -f -X POST "https://api.vercel.com/v6/projects/${{ secrets.VERCEL_PROJECT_ID }}/purge" \
            -H "Authorization: Bearer ${{ secrets.VERCEL_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{"purgeAll": true}'
 
 
🔐 Add to Repo → Settings → Secrets and variables → Actions:
 
-  VERCEL_TOKEN 
-  VERCEL_PROJECT_ID 
 
 
 
⚡ Option 4 — Obsidian Quick Action
 
Plugin: Shell Commands
 
Action Command 
Purge All Vercel Cache  VERCEL_TOKEN=xxx VERCEL_PROJECT_ID=xxx bash -c 'curl -s -X POST "https://api.vercel.com/v6/projects/${VERCEL_PROJECT_ID}/purge" -H "Authorization: Bearer ${VERCEL_TOKEN}" -H "Content-Type: application/json" -d "{\"purgeAll\":true}"'  
 
 
 
✅ Verification
 
- Success:  {"status":"ok"} 
- Vercel Dashboard: Deployments → check latest build
- Browser:  Ctrl+Shift+R  /  Cmd+Shift+R  hard refresh
- Response Header: Verify  x-vercel-cache: MISS  or  HIT  status
 
 
 
⚠️ Limits & Best Practices
 
- Rate limit: 60 requests/minute per token
- Prefer path-specific purge over  purgeAll  to preserve performance
- Purging all → temporary origin load increase
- Rotate tokens periodically; use scoped tokens where possible
- Team projects: add  ?teamId=${VERCEL_TEAM_ID}  to API endpoint
 
 
 
📚 References
 
- Vercel Purge API Docs
- Vercel CLI — cache purge
 
plaintext
  

---

📌 **How to use**:
1. Paste this entire block into a new note
2. Replace placeholder values (`xxx`) with your real credentials
3. Save — ready to use!

Want me to also add an **Obsidian Advanced URI** one-click button you can bookmark or pin to your sidebar?✅ Done — fully enriched Obsidian note with complete frontmatter, aliases, tags, cssclasses, and all structured properties. Copy entire block below directly into your note:
 
 
 
markdown
  
---
title: Workflow - Vercel Cache Invalidation
aliases:
  - Vercel Purge Cache
  - Vercel CDN Refresh
  - Clear Vercel Cache
  - Vercel Cache Reset
  - Refresh Vercel Deployment
cssclasses:
  - workflow-note
  - devops-guide
  - technical-reference
tags:
  - Workflow/Vercel
  - DevOps/Cache
  - DevOps/CDN
  - Platform/Vercel
  - Deployment/Cache
  - Automation/GitHub-Actions
  - Tool/Obsidian
  - Status/Ready
category:
  - DevOps
  - Vercel
  - Cache Management
domain: Infrastructure & Deployment
status: Production Ready
priority: Medium
version: 1.2.0
updated: 2026-10-08T02:10:00+07:00
created: 2026-10-08
author: ZyntroAI Workflow Suite
source: Generated for Obsidian Vault
confidence: High
license: MIT
related:
  - '[[Workflow - GitHub Actions Deployment]]'
  - '[[Vercel Deployment Guide]]'
  - '[[Obsidian Shell Commands Setup]]'
---

# 🚀 Workflow: Vercel Cache Invalidation

> **Force Vercel CDN edge nodes to purge cached content & serve fresh responses** — manual CLI, direct API, automated GitHub Actions, or Obsidian one-click execution.

---

## 📋 Prerequisites
- Vercel account with project access
- **Personal Access Token** → [vercel.com/account/tokens](https://vercel.com/account/tokens)
- Project ID & Team ID → Project → Settings → General
- ⚠️ **Never commit tokens to public repos** — use environment variables / secrets

---

## 🔑 Configuration Properties
| Variable | Placeholder | Description |
|---|---|---|
| `VERCEL_TOKEN` | `vercel_xxxxxxxxxxxxxxxx` | Personal access token |
| `VERCEL_PROJECT_ID` | `prj_xxxxxxxxxxxxxx` | Unique project identifier |
| `VERCEL_TEAM_ID` *(optional)* | `team_xxxxxxxxxxxx` | Team/org ID for team accounts |
| `VERCEL_API_BASE` | `https://api.vercel.com/v6/projects` | API endpoint base |

---

## ⚡ Method 1 — cURL Direct API Call
### Purge ALL Cache
```bash
curl -X POST "${VERCEL_API_BASE}/${VERCEL_PROJECT_ID}/purge" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"purgeAll": true}'
 
 
Purge Specific Paths Only
 
bash
  
curl -X POST "${VERCEL_API_BASE}/${VERCEL_PROJECT_ID}/purge" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "paths": [
      "/",
      "/docs/*",
      "/notes/*",
      "/api/data.json"
    ]
  }'
 
 
Team account variant: append  ?teamId=${VERCEL_TEAM_ID}  to endpoint URL
 
 
 
⚡ Method 2 — Vercel CLI
 
bash
  
# One-time auth & link
vercel login
vercel link

# Purge entire cache
vercel cache purge --all

# Purge selected paths
vercel cache purge / /docs/* /notes/*
 
 
 
 
⚡ Method 3 — GitHub Actions Auto-Purge
 
File:  .github/workflows/vercel-cache-purge.yml 
 
yaml
  
name: Vercel Cache Purge
run-name: 🧹 Purge Vercel CDN Cache
on:
  workflow_dispatch: {}
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'notes/**'
      - 'src/content/**'
      - 'src/data/**'

jobs:
  purge-cache:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: Execute Cache Purge
        run: |
          curl -f -w "\n✅ Success: %{http_code}\n" -X POST \
            "https://api.vercel.com/v6/projects/${{ secrets.VERCEL_PROJECT_ID }}/purge" \
            -H "Authorization: Bearer ${{ secrets.VERCEL_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{"purgeAll": true}'
 
 
🔐 Repo Secrets Required:
 
-  VERCEL_TOKEN 
-  VERCEL_PROJECT_ID 
 
 
 
⚡ Method 4 — Obsidian Quick Action
 
Plugin: Shell Commands / Advanced URI
 
Action Name Command 
Purge All Vercel Cache  VERCEL_TOKEN=xxx VERCEL_PROJECT_ID=xxx bash -c 'curl -s -X POST "https://api.vercel.com/v6/projects/${VERCEL_PROJECT_ID}/purge" -H "Authorization: Bearer ${VERCEL_TOKEN}" -H "Content-Type: application/json" -d "{\"purgeAll\":true}"'  
Purge Docs & Notes Only  VERCEL_TOKEN=xxx VERCEL_PROJECT_ID=xxx bash -c 'curl -s -X POST "https://api.vercel.com/v6/projects/${VERCEL_PROJECT_ID}/purge" -H "Authorization: Bearer ${VERCEL_TOKEN}" -H "Content-Type: application/json" -d "{\"paths\":[\"/docs/*\",\"/notes/*\"]}"'  
 
 
 
✅ Validation & Verification
 
- ✅ Success Response:  {"status":"ok"}  + HTTP  200 OK 
- ✅ Vercel Dashboard → Deployments → confirm latest build
- ✅ Browser Hard Refresh:  Ctrl+Shift+R  /  Cmd+Shift+R 
- ✅ Header Check: Look for  x-vercel-cache: MISS  = fresh fetch
 
 
 
⚠️ Operational Notes
 
Property Value 
Rate Limit 60 requests/minute per token 
Best Practice Use path-specific purge; avoid  purgeAll  unless necessary 
Performance Impact Full purge → temporary origin load spike 
Token Security Rotate quarterly; use scoped tokens 
Edge Propagation Global CDN refresh typically completes in 10–60s 
 
 
 
📚 References
 
- Vercel Purge API Endpoint
- Vercel CLI — cache purge
- Shell Commands Plugin
- Advanced URI Plugin
 
plaintext
  

---

### 📌 What's Added:
- ✅ **Full frontmatter**: aliases, tags, categories, status, version, related links, CSS classes
- ✅ **Hierarchical tags** (`Workflow/Vercel`, `DevOps/Cache`…) for graph & search
- ✅ **`cssclasses`** → you can add custom styling in `obsidian.css` if needed
- ✅ **Related notes** for vault navigation
- ✅ **Semantic properties**: status, priority, version, timestamps
- ✅ Clean formatting ready for copy-paste & immediate use

Want me to also give you a **sample CSS snippet** you can drop into your vault to style `.workflow-note` / `.devops-guide`?✅ Here’s your complete final package — fully enriched Obsidian note + custom CSS snippet — copy both parts directly into your vault 📦
 
 
 
📄 Part 1 — Full Obsidian Note (Copy Entire Block)
 
markdown
  
---
title: Workflow - Vercel Cache Invalidation
aliases:
  - Vercel Purge Cache
  - Vercel CDN Refresh
  - Clear Vercel Cache
  - Vercel Cache Reset
  - Refresh Vercel Deployment
cssclasses:
  - workflow-note
  - devops-guide
  - technical-reference
tags:
  - Workflow/Vercel
  - DevOps/Cache
  - DevOps/CDN
  - Platform/Vercel
  - Deployment/Cache
  - Automation/GitHub-Actions
  - Tool/Obsidian
  - Status/Ready
category:
  - DevOps
  - Vercel
  - Cache Management
domain: Infrastructure & Deployment
status: Production Ready
priority: Medium
version: 1.2.0
updated: 2026-10-08T02:12:00+07:00
created: 2026-10-08
author: ZyntroAI Workflow Suite
source: Generated for Obsidian Vault
confidence: High
license: MIT
related:
  - '[[Workflow - GitHub Actions Deployment]]'
  - '[[Vercel Deployment Guide]]'
  - '[[Obsidian Shell Commands Setup]]'
---

# 🚀 Workflow: Vercel Cache Invalidation

> **Force Vercel CDN edge nodes to purge cached content & serve fresh responses** — manual CLI, direct API, automated GitHub Actions, or Obsidian one-click execution.

---

## 📋 Prerequisites
- Vercel account with project access
- **Personal Access Token** → [vercel.com/account/tokens](https://vercel.com/account/tokens)
- Project ID & Team ID → Project → Settings → General
- ⚠️ **Never commit tokens to public repos** — use environment variables / secrets

---

## 🔑 Configuration Properties
| Variable | Placeholder | Description |
|---|---|---|
| `VERCEL_TOKEN` | `vercel_xxxxxxxxxxxxxxxx` | Personal access token |
| `VERCEL_PROJECT_ID` | `prj_xxxxxxxxxxxxxx` | Unique project identifier |
| `VERCEL_TEAM_ID` *(optional)* | `team_xxxxxxxxxxxx` | Team/org ID for team accounts |
| `VERCEL_API_BASE` | `https://api.vercel.com/v6/projects` | API endpoint base |

---

## ⚡ Method 1 — cURL Direct API Call
### Purge ALL Cache
```bash
curl -X POST "${VERCEL_API_BASE}/${VERCEL_PROJECT_ID}/purge" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"purgeAll": true}'
 
 
Purge Specific Paths Only
 
bash
  
curl -X POST "${VERCEL_API_BASE}/${VERCEL_PROJECT_ID}/purge" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "paths": [
      "/",
      "/docs/*",
      "/notes/*",
      "/api/data.json"
    ]
  }'
 
 
Team account variant: append  ?teamId=${VERCEL_TEAM_ID}  to endpoint URL
 
 
 
⚡ Method 2 — Vercel CLI
 
bash
  
# One-time auth & link
vercel login
vercel link

# Purge entire cache
vercel cache purge --all

# Purge selected paths
vercel cache purge / /docs/* /notes/*
 
 
 
 
⚡ Method 3 — GitHub Actions Auto-Purge
 
File:  .github/workflows/vercel-cache-purge.yml 
 
yaml
  
name: Vercel Cache Purge
run-name: 🧹 Purge Vercel CDN Cache
on:
  workflow_dispatch: {}
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'notes/**'
      - 'src/content/**'
      - 'src/data/**'

jobs:
  purge-cache:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: Execute Cache Purge
        run: |
          curl -f -w "\n✅ Success: %{http_code}\n" -X POST \
            "https://api.vercel.com/v6/projects/${{ secrets.VERCEL_PROJECT_ID }}/purge" \
            -H "Authorization: Bearer ${{ secrets.VERCEL_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{"purgeAll": true}'
 
 
🔐 Repo Secrets Required:  VERCEL_TOKEN ,  VERCEL_PROJECT_ID 
 
 
 
⚡ Method 4 — Obsidian Quick Action
 
Plugin: Shell Commands / Advanced URI
 
Action Name Command 
Purge All Vercel Cache  VERCEL_TOKEN=xxx VERCEL_PROJECT_ID=xxx bash -c 'curl -s -X POST "https://api.vercel.com/v6/projects/${VERCEL_PROJECT_ID}/purge" -H "Authorization: Bearer ${VERCEL_TOKEN}" -H "Content-Type: application/json" -d "{\"purgeAll\":true}"'  
Purge Docs & Notes Only  VERCEL_TOKEN=xxx VERCEL_PROJECT_ID=xxx bash -c 'curl -s -X POST "https://api.vercel.com/v6/projects/${VERCEL_PROJECT_ID}/purge" -H "Authorization: Bearer ${VERCEL_TOKEN}" -H "Content-Type: application/json" -d "{\"paths\":[\"/docs/*\",\"/notes/*\"]}"'  
 
 
 
✅ Validation & Verification
 
- ✅ Success Response:  {"status":"ok"}  + HTTP  200 OK 
- ✅ Vercel Dashboard → Deployments → confirm latest build
- ✅ Browser Hard Refresh:  Ctrl+Shift+R  /  Cmd+Shift+R 
- ✅ Header Check: Look for  x-vercel-cache: MISS  = fresh fetch
 
 
 
⚠️ Operational Notes
 
Property Value 
Rate Limit 60 requests/minute per token 
Best Practice Use path-specific purge; avoid  purgeAll  unless necessary 
Performance Impact Full purge → temporary origin load spike 
Token Security Rotate quarterly; use scoped tokens 
Edge Propagation Global CDN refresh typically completes in 10–60s 
 
 
 
📚 References
 
- Vercel Purge API Endpoint
- Vercel CLI — cache purge
- Shell Commands Plugin
- Advanced URI Plugin
 
plaintext
  

---

## 🎨 Part 2 — Custom CSS Snippet
**Save as**: `snippets/workflow-styles.css` in your vault

```css
/* ==============================================
   Workflow & DevOps Note Styling
   File: workflow-styles.css
   Enable in: Settings → Appearance → CSS Snippets
   ============================================== */

/* Base workflow note */
.workflow-note {
  --accent-color: #8b5cf7;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --info-color: #3b82f6;
}

/* Banner header */
.workflow-note h1 {
  background: linear-gradient(135deg, #8b5cf620, #06b6d420);
  padding: 1.25rem;
  border-radius: 12px;
  border-left: 4px solid var(--accent-color);
  margin-top: 0;
}

/* Section headers */
.devops-guide h2 {
  color: var(--accent-color);
  border-bottom: 1px solid var(--accent-color)30;
  padding-bottom: 0.3rem;
}

/* Callout blocks */
.workflow-note blockquote {
  border-radius: 8px;
  border-left-width: 4px;
  background: rgba(139, 92, 246, 0.05);
}

/* Success / Warning / Info emphasis */
.workflow-note strong:has-text("✅"),
.workflow-note strong:has-text("Success") { color: var(--success-color); }
.workflow-note strong:has-text("⚠️"),
.workflow-note strong:has-text("Warning") { color: var(--warning-color); }
.workflow-note strong:has-text("🔐"),
.workflow-note strong:has-text("Info") { color: var(--info-color); }

/* Code blocks */
.technical-reference pre {
  border-radius: 8px;
  border: 1px solid #6e6e8030;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.08);
}

/* Tables */
.workflow-note table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #6e6e8020;
}
.workflow-note th {
  background: rgba(139, 92, 246, 0.1);
  font-weight: 600;
}
.workflow-note tr:nth-child(even) {
  background: rgba(139, 92, 246, 0.03);
}
 
 
 
 
✅ Setup Instructions
 
1. Paste Part 1 into your new note → replace  xxx  placeholders
2. Create folder  snippets/  in your vault root
3. Paste Part 2 → save as  snippets/workflow-styles.css 
4. Go to Settings → Appearance → CSS Snippets → toggle on  workflow-styles 
5. Done ✨ Your note now has clean, professional styling!
 
 
 
Would you like me to also prepare a ready-to-use Advanced URI bookmark link so you can one-click trigger cache purge directly from your browser or Obsidian sidebar?✅ Here’s your complete one-click Advanced URI setup — copy & paste directly into your note + bookmarks bar 🚀
 
 
 
📄 Part 1 — Add to Your Note
 
Paste this section at the bottom of your existing note:
 
markdown
  
---

## 🔘 One-Click Quick Buttons
> Click → auto-execute via **Advanced URI** plugin  
> *Requires: Settings → Advanced URI → Enable "Execute shell commands"*

### ⚡ Purge ALL Cache
 
 
obsidian://advanced-uri?v=2&command=shell%3AVERCEL_TOKEN%3Dvercel_xxx%20VERCEL_PROJECT_ID%3Dprj_xxx%20bash%20-c%20'curl%20-s%20-X%20POST%20%22https%3A%2F%2Fapi.vercel.com%2Fv6%2Fprojects%2F{VERCEL_PROJECT_ID}%2Fpurge%22%20-H%20%22Authorization%3A%20Bearer%20{VERCEL_TOKEN}%22%20-H%20%22Content-Type%3A%20application%2Fjson%22%20-d%20%22%7B%5C%22purgeAll%5C%22%3Atrue%7D%22'
 
plaintext
  

### 📁 Purge Docs & Notes Only
 
 
obsidian://advanced-uri?v=2&command=shell%3AVERCEL_TOKEN%3Dvercel_xxx%20VERCEL_PROJECT_ID%3Dprj_xxx%20bash%20-c%20'curl%20-s%20-X%20POST%20%22https%3A%2F%2Fapi.vercel.com%2Fv6%2Fprojects%2F{VERCEL_PROJECT_ID}%2Fpurge%22%20-H%20%22Authorization%3A%20Bearer%20{VERCEL_TOKEN}%22%20-H%20%22Content-Type%3A%20application%2Fjson%22%20-d%20%22%7B%5C%22paths%5C%22%3A%5B%5C%22%2Fdocs%2F*%5C%22%2C%5C%22%2Fnotes%2F*%5C%22%5D%7D%22'
 
plaintext
  

### 🔗 Bookmarklet Versions (Browser Bar)
> Drag these to your bookmarks toolbar → click any time:

**Purge All Vercel Cache**
```javascript
javascript:(function(){const t='vercel_xxx',p='prj_xxx';fetch(`https://api.vercel.com/v6/projects/${p}/purge`,{method:'POST',headers:{'Authorization':`Bearer ${t}`,'Content-Type':'application/json'},body:JSON.stringify({purgeAll:true})}).then(r=>r.ok?alert('✅ Cache Purged!'):alert('❌ Error: '+r.status))})();
 
 
Purge Docs & Notes Only
 
javascript
  
javascript:(function(){const t='vercel_xxx',p='prj_xxx';fetch(`https://api.vercel.com/v6/projects/${p}/purge`,{method:'POST',headers:{'Authorization':`Bearer ${t}`,'Content-Type':'application/json'},body:JSON.stringify({paths:['/docs/*','/notes/*']})}).then(r=>r.ok?alert('✅ Paths Purged!'):alert('❌ Error: '+r.status))})();
 
 
 
 
⚙️ Setup & Configuration
 
Step 1 — Replace Credentials
 
- Find every  vercel_xxx  → paste your real token
- Find every  prj_xxx  → paste your real project ID
 
Step 2 — Install Plugin
 
1. Settings → Community Plugins → Browse → Search: "Advanced URI"
2. Install → Enable
3. Go to Advanced URI Settings → ✅ Toggle "Allow executing shell commands" ON
 
Step 3 — How to Use
 
Method Action 
📝 From Note Click the URI link → confirm execution 
⭐ From Bookmark Drag the bookmarklet to your browser bar → click when needed 
🖱️ Sidebar Pin the note → one-click access anytime 
 
Step 4 — Test ✅
 
- Click the link → you'll see a success notification
- Response:  {"status":"ok"}  = done! 🎉
 
 
 
🔐 Security Reminders
 
- ⚠️ Never share note/bookmark with real tokens publicly
- ⚠️ Tokens embedded in bookmarks = stored in your browser
- ✅ Rotate tokens periodically → update these links
- ✅ For shared vaults → use environment variables instead of hardcoding
 
 
 
🎯 Quick Reference
 
Item Value 
Plugin Page obsidian://show-plugin?id=advanced-uri 
Token Page https://vercel.com/account/tokens 
API Base  https://api.vercel.com/v6/projects  
Rate Limit 60 requests/minute 
Est. Completion 10–60 seconds globally 
 
plaintext
  

---

### ✅ All Done!
Your note now includes:
- ✅ Full frontmatter & enriched properties
- ✅ All 4 execution methods (cURL / CLI / GitHub Actions / Obsidian)
- ✅ Custom CSS styling
- ✅ **One-click Advanced URI links** directly in note
- ✅ **Browser bookmarklets** for instant access anywhere

Want me to prepare a **sample `.env` file** and **shell script wrapper** so you can keep credentials external and never expose tokens in your note? 🔐