# Changelog

All notable changes to **new-radix-nova-project** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- 🔐 Complete JWT authentication system — access + refresh tokens, Redis blacklisting, FastAPI-style dependencies
- 🤖 Unified AI Providers Interface (`lib/ai-providers.ts`) — OpenAI, Anthropic Claude, Google Gemini with streaming support
- 🎯 Model Selector Component (`components/model-selector.tsx`) — grouped dropdown with descriptions and API auto-load
- 📋 Dynamic Grant Resolution Engine — auto-pick permissions from HTTP methods, action names, and payload inspection
- 📄 Project documentation suite: `INSTALL.md`, `SETUP.md`, `SECURITY.md`, `AGENTS.md` / `CLAUDE.md`
- ⚙️ Environment variable management pattern with type-safe loader (`lib/env.ts`)
- 🚀 GitHub Actions CI workflow — CodeQL analysis, dependency scanning

---

## [0.2.0] — 2026-09-07

### Added
- ✅ Initial AI chat API routes (`app/api/ai`, `app/api/chat`)
- ✅ Radix UI + shadcn/ui component scaffold
- ✅ Tailwind CSS + TypeScript configuration
- ✅ Zustand client store example (`src/store/kpi.ts`)
- ✅ Vercel deployment configuration
- ✅ Project README & installation guides

---

## [0.1.0] — 2026-06-17

### Added
- 🎉 Initial project scaffold from v0
- Next.js 14 (App Router) base setup
- Basic theme provider & global styles
- Public assets & folder structure

---

## 📌 Categories Reference

| Category | Description |
|----------|-------------|
| **Added** | New features and functionality |
| **Changed** | Changes to existing behavior |
| **Deprecated** | Features scheduled for future removal |
| **Removed** | Features removed in this release |
| **Fixed** | Bug fixes and corrections |
| **Security** | Vulnerability patches and security improvements |

---

## 💡 How to Update This File

1. Add changes under **[Unreleased]** as you merge features
2. When ready to release:
   - Rename `[Unreleased]` → `[X.Y.Z] — YYYY-MM-DD`
   - Create a fresh empty `[Unreleased]` section at the top
3. Keep entries **user-focused** — explain *what changed and why*, not *how you changed it*
4. Reference PR/issue numbers where helpful

---

> **Example entry:**
> ```markdown
> ### Added
> - Streaming responses in chat API — messages appear word-by-word instead of waiting (#42)
> ```
