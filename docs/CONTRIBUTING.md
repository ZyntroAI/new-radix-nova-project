🤝 docs/CONTRIBUTING.md — คู่มือการมีส่วนร่วม
 
markdown  
# 🤝 Contributing to new-radix-nova-project

First off, thank you for considering contributing! 🎉 Every contribution helps make this project better.

---

## 📑 Table of Contents
- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Development Setup](#-development-setup)
- [Style Guidelines](#-style-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Release & Versioning](#-release--versioning)

---

## 🧑‍🤝‍🧑 Code of Conduct

This project follows a **Code of Conduct**. By participating, you agree to be respectful and constructive. Please report unacceptable behavior to the project maintainers[[__LINK_ICON]](http://raw.githubusercontent.com/version14/ui/HEAD/CONTRIBUTING.md?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiIxOWUwYzA4NTEzYzdhZDkyLWIxNzUwNDRkZjQwYjcwNDAifQ%3D%3D&inline_doc_id=19e0c08513c7ad92-b175044df40b7040).

---

## 💡 How Can I Contribute?

### 🐛 Report Bugs
Before creating a bug report:
- **Search existing issues** — someone might have already reported it
- Include clear steps to reproduce
- Describe what you expected vs what actually happened
- Add environment info: OS, Node version, package manager

### ✨ Propose New Features
- Open a **GitHub Discussion** first to gather feedback before coding
- Explain the use case — who benefits and how
- Keep scope focused; large changes are easier in smaller phases[[__LINK_ICON]](http://raw.githubusercontent.com/vercel/next.js/HEAD/contributing.md?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiIxYmZkOWNlZjE0MDI4ZTE4LWY2YTBlNTA0MmNjZTQ5YWQifQ%3D%3D&inline_doc_id=1bfd9cef14028e18-f6a0e5042cce49ad)

### 📝 Improve Documentation
Fix typos, clarify instructions, add examples — these are **excellent first contributions!**

### 🔧 Submit Code Changes
Look for issues labeled **`good first issue`** — perfect starting points[[__LINK_ICON]](http://raw.githubusercontent.com/vercel/next.js/HEAD/contributing.md?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiIxYmZkOWNlZjE0MDI4ZTE4LWY2YTBlNTA0MmNjZTQ5YWQifQ%3D%3D&inline_doc_id=1bfd9cef14028e18-f6a0e5042cce49ad).

---

## 🛠️ Development Setup

### Prerequisites
- **Node.js** 18+ LTS
- **pnpm** (recommended) or npm
- **Git**

### Step-by-Step
```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/your-username/new-radix-nova-project.git
cd new-radix-nova-project

# 2. Add upstream remote
git remote add upstream https://github.com/ZyntroAI/new-radix-nova-project.git

# 3. Install dependencies
pnpm install

# 4. Create your .env.local file (never commit this!)
cp .env.example .env.local
# Edit .env.local with your API keys

# 5. Start dev server
pnpm dev
 
 
See  INSTALL.md  for full installation guide
 
 
 
🎨 Style Guidelines
 
Code Standards
 
- TypeScript only — new files =  .ts  /  .tsx 
- No  any  — use  unknown  with proper type narrowing instead
- Explicit return types on public functions
- Server vs Client Components — add  'use client'  only when truly needed
- Environment variables: Server-side only in API routes; prefix public ones with  NEXT_PUBLIC_ 
 
Run Checks Before Committing
 
bash  
pnpm run typecheck   # ✅ No errors
pnpm run lint        # ✅ No warnings
pnpm run format      # ✅ Consistent formatting
pnpm build           # ✅ Build succeeds
 
 
Commit Messages — Conventional Commits
 
plaintext  
<type>(<scope>): <description>

<body>
 
 
Type Use for 
 feat  New feature 
 fix  Bug fix 
 docs  Documentation updates 
 refactor  No behavior change 
 perf  Performance improvement 
 test  Adding tests 
 chore  Dependencies, CI, config 
 
Example:  feat(model-selector): add Gemini 2.0 Flash option  
 
 
 
📥 Pull Request Process
 
1. Sync with upstream —  git pull upstream main  before branching
2. Create a branch —  git checkout -b feature/your-feature-name 
3. Make focused changes — one feature/fix per PR
4. Run all checks locally — see above
5. Update docs — README,  .env.example , or guides as needed
6. Push & open PR — fill in the PR template completely 
7. Wait for review — address feedback; don't force-push during review
 
PR Title Format
 
plaintext  
feat: add brief description
fix: resolve login timeout issue
docs: update installation steps
 
 
PR Checklist
 
My code follows the project style
I've run  pnpm typecheck && pnpm lint && pnpm build  — all pass
I've updated relevant documentation
No secrets or API keys are committed
My changes don't break existing functionality
 
 
 
🏷️ Release & Versioning
 
- We use Semantic Versioning ( MAJOR.MINOR.PATCH )
- See  docs/CHANGELOG.md  for release history
- Every release has a git tag and changelog entry 
 
 
 
🔒 Security & Secrets
 
- ❌ Never commit  .env ,  .env.local , or any file containing credentials
- ✅ Update only  .env.example  when adding new variables
- ⚠️ Found a security vulnerability? Do NOT open a public issue — email security@zyntroai.com instead. See  SECURITY.md  
 
 
 
💬 Need Help?
 
- Check existing Discussions
- Open a Question issue
- Read  AGENTS.md  for project architecture & conventions
 
 
 
Once again — thank you! 🙌 Your contributions make a real difference. Happy coding! 🚀
 
plaintext  

---

Save this as **`docs/CONTRIBUTING.md`** or at the repo root — GitHub will automatically link it when anyone opens a new Issue or Pull Request[[__LINK_ICON]](https://ospo.library.jhu.edu/wp-content/uploads/sites/60/2025/11/OSPO-Explainer_-CONTRIBUTING.md-Slides.pdf?f_link_type=f_linkinlinenote&flow_extra=eyJpbmxpbmVfZGlzcGxheV9wb3NpdGlvbiI6MCwiZG9jX3Bvc2l0aW9uIjowLCJkb2NfaWQiOiJjY2E2ZWQ4MDk4YzU2NzQxLTljOWE4NGJkOThmM2YzMGIifQ%3D%3D&inline_doc_id=cca6ed8098c56741-9c9a84bd98f3f30b).

Would you like me to also add a **Pull Request Template** (`.github/PULL_REQUEST_TEMPLATE.md`) or **Issue Templates** next? 😊