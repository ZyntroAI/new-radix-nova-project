⚡ GitHub Actions — Workflow Triggers + Full Release Workflow
 
Everything copy-paste ready! 🚀
 
 
 
🎯 Part 1: Common Trigger Types ( on: )
 
🔹 Manual Trigger — Run Any Time
 
Click Run workflow button in GitHub UI → perfect for controlled releases
 
yaml
  
on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to release (e.g. 1.2.3)'
        required: true
        type: string
      prerelease:
        description: 'Mark as pre-release'
        type: boolean
        default: false
 
 
🔹 Tag Push Trigger — Auto on Version Tag
 
 git tag v1.2.0 && git push origin v1.2.0  → workflow runs automatically
 
yaml
  
on:
  push:
    tags:
      - 'v*'   # Matches: v1.0.0, v2.1.3, v0.9.0
 
 
🔹 Branch Push Trigger — On Merge to Main
 
yaml
  
on:
  push:
    branches:
      - main
      - develop
      - 'releases/**'   # All release branches
 
 
🔹 Pull Request Trigger — Validate Before Merge
 
yaml
  
on:
  pull_request:
    branches: [main, develop]
    types: [opened, synchronize, reopened]
 
 
🔹 Release Event Trigger — On Published Release
 
yaml
  
on:
  release:
    types: [published]
 
 
🔹 Scheduled Trigger — Cron Jobs
 
yaml
  
on:
  schedule:
    - cron: '0 9 * * 1'   # Every Monday 09:00 UTC
 
 
🔹 Multiple Triggers Together
 
yaml
  
on:
  push:
    branches: [main]
    tags: ['v*']
  pull_request:
    branches: [main]
  workflow_dispatch:   # Manual button always available
 
 
 
 
🚀 Part 2: Full Release Workflow File
 
Save as:  .github/workflows/release.yml 
 
yaml
  
name: 🚀 Release Workflow

# ─── TRIGGERS ──────────────────────────────────────────────
on:
  push:
    tags:
      - 'v*'   # Auto-run when version tag is pushed
  workflow_dispatch:
    inputs:
      version:
        description: 'Version (leave empty if from tag)'
        required: false
        type: string
      prerelease:
        description: 'Mark as pre-release'
        type: boolean
        default: false

# ─── PERMISSIONS ───────────────────────────────────────────
permissions:
  contents: write    # Required to create releases
  packages: write    # Required if publishing to GitHub Packages

# ─── ENV VARS ──────────────────────────────────────────────
env:
  NODE_VERSION: '20'
  PYTHON_VERSION: '3.12'

# ─── JOBS ──────────────────────────────────────────────────
jobs:
  # 🔬 Job 1: Validate & Test
  test:
    name: 🧪 Run Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint & Type check
        run: |
          npm run lint
          npm run typecheck

      - name: Run tests
        run: npm test

  # 🏗️ Job 2: Build & Publish
  build-and-publish:
    name: 📦 Build & Publish
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Publish to npm
        if: github.ref == 'refs/tags/v*'
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

  # 📝 Job 3: Create GitHub Release
  create-release:
    name: 📝 Create Release
    needs: build-and-publish
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # ─── EXTRACT VERSION ──────────────────────────────────
      - name: Get version
        id: version
        run: |
          if [ "${{ github.event_name }}" = "workflow_dispatch" ]; then
            VERSION=${{ github.event.inputs.version }}
          else
            VERSION=${GITHUB_REF#refs/tags/v}
          fi
          echo "version=$VERSION" >> $GITHUB_OUTPUT
          echo "Release version: $VERSION"

      # ─── CREATE GITHUB RELEASE ────────────────────────────
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: v${{ steps.version.outputs.version }}
          name: Release v${{ steps.version.outputs.version }}
          generate_release_notes: true
          prerelease: ${{ github.event.inputs.prerelease == 'true' }}
          files: |
            dist/
            README.md
            CHANGELOG.md
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
 
 
 
 
🔧 Part 3: How to Use — 2 Ways to Release
 
✅ Method A: Tag Push (Recommended)
 
bash
  
# 1. Update CHANGELOG.md & bump version in files
# 2. Commit
git add .
git commit -m "chore(release): v1.2.0"

# 3. Create & push tag
git tag v1.2.0
git push origin v1.2.0

# ✅ Workflow automatically runs → Tests → Build → Publish → Release created!
 
 
✅ Method B: Manual Trigger
 
1. Go to your repo → Actions tab
2. Select Release Workflow
3. Click Run workflow ▼
4. Fill version:  1.2.3  → Check if pre-release → Click Run workflow
 
 
 
📌 Part 4: Trigger Reference Cheat Sheet
 
What Triggers It  on:  Value Use Case 
Push to branch  push: branches: [main]  CI on merge 
Push tag  v*   push: tags: ['v*']  Auto versioned release 
PR opened/updated  pull_request:  Validate before merge 
Manual button  workflow_dispatch:  Controlled deploy 
Release published  release: types: [published]  Post-release tasks 
Schedule  schedule: - cron: '0 9 * * *'  Daily/weekly tasks 
 
 
 
⚠️ Part 5: Common Pitfalls & Tips
 
- ✅ Permissions: Always set  permissions: contents: write  — release creation will fail without it
- ✅ Tag format: Stick to  vX.Y.Z  — consistency matters
- ✅ GITHUB_TOKEN: Auto-provided — no extra setup needed 
- ✅ Secrets: Store API keys (NPM_TOKEN, etc.) in repo → Settings → Secrets and variables → Actions
- ✅ Draft releases: Set  draft: true  if you want to review before publishing
- ✅ Path filters: Limit when workflow runs:  push: paths: ['src/**', 'package.json'] 
 
 
 
📁 Bonus: Full Workflow File Structure
 
plaintext
  
your-repo/
├── .github/
│   └── workflows/
│       ├── ci.yml          # ← Push + PR → Lint + Test
│       ├── release.yml      # ← Tag + Manual → Build + Publish + Release ✨
│       └── cleanup.yml      # ← Schedule → Housekeeping tasks
├── CHANGELOG.md
├── CONTRIBUTING.md
└── README.md
 
 
Would you like me to also prepare the companion CI workflow file ( ci.yml ) or Issue/PR templates for your repo? 😊