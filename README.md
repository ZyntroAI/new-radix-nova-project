## What this is
A Next.js (App Router) TypeScript web app scaffold that provides an AI-assisted UI built with Radix UI + Tailwind CSS and a small backend of API routes for chat/AI features — intended for developers building an interactive, component-driven UI with TypeScript-first tooling.

### Stack
- **Language(s):** TypeScript (primary), CSS (Tailwind), small JS surface
- **Framework / runtime:** Next.js (App Router / app/), React
- **Notable libraries:** Tailwind CSS, Radix UI (Radix-based components & UI patterns), shadcn-style/component patterns (theme-provider + component folder), TypeScript

## How it's organized
```
README.md                — repo overview, install & dev instructions
INSTALL.md, SETUP.md     — setup and environment notes
app/                     — Next.js App Router app; pages/layout + server/client components + API routes
  page.tsx               — simple home page component
  layout.tsx             — root layout (imports ThemeProvider from components)
  globals.css            — global styles (Tailwind + custom vars)
  api/
    ai/route.ts          — AI-related server route
    chat/route.ts        — chat API route
backend/                 — (backend services / server-side code; runtime pieces)
components/              — UI components and theme-provider used by app/
components.json          — component metadata
lib/                     — small library code used by app (shared helpers)
public/                  — static assets
src/
  store/
    kpi.ts               — small client-side state/store (KPI/example)
.next / pnpm-lock.yaml   — build lockfiles / Next build artifacts
tailwind.config.ts       — Tailwind configuration
next.config.mjs          — Next.js configuration
package.json             — scripts and dependency pins
.workflows/              — CI workflows (automation)
.docs, docs/             — additional documentation / guides
```

How it fits together:
- The app/ directory is the runtime: layout.tsx wraps pages with a ThemeProvider from components/, page.tsx is the UI entry. API endpoints live under app/api (ai and chat) and provide server-side logic for AI and chat functionality. UI is composed from components/ and styled via Tailwind (tailwind.config.ts + globals.css). Small client state lives under src/store (kpi.ts). package.json scripts drive dev/build/test flows and pnpm-lock.yaml indicates pnpm is used in CI/development.

## How to run it
Minimum quick path (repo includes pnpm lock; pnpm recommended):

1) Clone and install
```
git clone https://github.com/zyntromedia/new-radix-nova-project.git
cd new-radix-nova-project
# using pnpm (preferred because pnpm-lock.yaml exists)
pnpm install
# or with npm:
# npm install
```

2) Start dev server
```
pnpm dev
# or
# npm run dev
```

3) Build / start for production
```
pnpm build
pnpm start
# or
# npm run build
# npm run start
```

Notes / required env:
- Node.js 18+ is expected (README lists a Node prereq).
- The app includes AI/chat API routes; you will need provider API keys / secrets (e.g., OpenAI/Anthropic or whatever your ai route expects) configured as environment variables — check app/api/ai/route.ts and AGENTS.md / CLAUDE.md for the exact variables the server expects.
- If you use pnpm in CI, ensure the runner supports pnpm or use npm with the lock conversion step.

## Try asking
- "Can you audit app/api/ai/route.ts for places where API keys or user input are forwarded to external AI providers and recommend safer handling?"
- "List all Radix UI components used by the app — can you map them to files in components/ and show where they’re imported (e.g., in app/layout.tsx or pages)?"
- "Walk me through adding an .env.example with the environment variables (names and purpose) required by app/api/chat/route.ts and app/api/ai/route.ts so new devs can run locally."

3. **Style with Tailwind** - use utility classes
4. **Type safely** with TypeScript
5. **Run checks** before committing:
   ```bash
   npm run typecheck && npm run lint && npm run format
   ```

## Built with v0

This repository is linked to a v0 project. You can use AI-assisted development:

- Visit [the v0 project](https://v0.app/chat/projects/prj_Xx8jZ4X8FSlcobnA0R0kx48ruvBo)
- Start new chats to make changes
- v0 will push commits directly to this repository

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel. Deploy in one click:

1. Push to GitHub
2. Connect your repository to Vercel
3. Vercel automatically deploys on push

For detailed instructions, see [INSTALL.md](./INSTALL.md#build--deploy).

## Philosophy

This project follows principles inspired by [OpenClaw's Vision](https://github.com/openclaw/openclaw/blob/7a589567681bd814497059cc920f9cdb71cb41a4/VISION.md):

- **Transparent Setup** - Clear prerequisites and installation steps
- **Explicit Configuration** - Setup is visible and configurable
- **Type Safety** - Full TypeScript for reliable code
- **Best Practices** - ESLint, Prettier, and type checking built-in
- **Developer Experience** - Fast iteration with Turbopack and hot reload

## Documentation

- [Installation Guide](./INSTALL.md) - Step-by-step setup instructions
- [Setup Guide](./SETUP.md) - Configuration and environment setup
- [Next.js Documentation](https://nextjs.org/docs) - Framework reference
- [Radix UI Documentation](https://www.radix-ui.com/docs) - Component library
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Styling framework
- [v0 Documentation](https://v0.app/docs) - AI-assisted development

## Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Dependencies not installing:**
```bash
npm cache clean --force && rm -rf node_modules && npm install
```

**TypeScript errors:**
```bash
npm run typecheck
```

For more troubleshooting, see [INSTALL.md](./INSTALL.md#troubleshooting).

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run checks: `npm run typecheck && npm run lint && npm run format`
4. Submit a pull request

## License

See LICENSE file for details.

---
<div>12AUG2026</div>
<div>add html</div>
<html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Grant Resolution Engine</title>
    <style>
        @page {
            size: A4;
            margin: 15mm 12mm;
            background-color: #0f172a;
        }

        *, *::before, *::after {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #0f172a;
            color: #e2e8f0;
            line-height: 1.5;
            font-size: 10.5pt;
        }

        .header {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }

        h1 {
            margin: 0 0 8px 0;
            font-size: 18pt;
            color: #38bdf8;
            letter-spacing: -0.5px;
        }

        .subtitle {
            margin: 0;
            color: #94a3b8;
            font-size: 10pt;
        }

        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 8pt;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background-color: rgba(56, 189, 248, 0.1);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.3);
            margin-top: 8px;
        }

        .section-title {
            font-size: 12pt;
            font-weight: 600;
            color: #f1f5f9;
            margin: 20px 0 10px 0;
            padding-left: 10px;
            border-left: 3px solid #38bdf8;
            page-break-after: avoid;
        }

        pre {
            background-color: #1e293b;
            border: 1px solid #334155;
            border-radius: 6px;
            padding: 12px 15px;
            overflow-x: auto;
            font-family: "JetBrains Mono", "Fira Code", Consolas, Monaco, monospace;
            font-size: 8.5pt;
            line-height: 1.45;
            color: #e2e8f0;
            margin: 10px 0;
        }

        code {
            font-family: "JetBrains Mono", "Fira Code", Consolas, Monaco, monospace;
        }

        /* Syntax Highlighting Mock */
        .kw { color: #f43f5e; } /* Keyword */
        .dt { color: #38bdf8; } /* Type/Enum */
        .st { color: #34d399; } /* String */
        .cm { color: #64748b; font-style: italic; } /* Comment */
        .fn { color: #fbbf24; } /* Function */
        .num { color: #f97316; } /* Number */

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            background-color: #1e293b;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid #334155;
        }

        th {
            background-color: #0f172a;
            color: #f8fafc;
            text-align: left;
            padding: 10px 12px;
            font-size: 9pt;
            font-weight: 600;
            border-bottom: 1px solid #334155;
        }

        td {
            padding: 10px 12px;
            font-size: 9pt;
            border-bottom: 1px solid #1e293b;
            color: #cbd5e1;
            vertical-align: top;
        }

        tr:last-child td {
            border-bottom: none;
        }

        tr:nth-child(even) {
            background-color: rgba(255, 255, 255, 0.02);
        }

        .math {
            font-family: 'Times New Roman', serif;
            font-style: italic;
            font-weight: bold;
            color: #38bdf8;
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>Dynamic Grant Resolution Engine</h1>
        <p class="subtitle">TypeScript / Node.js implementation for automated CRUD permission mapping and adaptive resolution.</p>
        <div class="badge">TypeScript Engine</div>
    </div>

    <div class="section-title">1. Definition of Grants & Operations</div>
    <pre><code><span class="kw">export enum</span> <span class="dt">Grant</span> {
  <span class="dt">READ</span> = <span class="st">"READ"</span>,       <span class="cm">// Viewing, searching, fetching</span>
  <span class="dt">CREATE</span> = <span class="st">"CREATE"</span>,   <span class="cm">// Adding, inserting, creating</span>
  <span class="dt">UPDATE</span> = <span class="st">"UPDATE"</span>,   <span class="cm">// Editing, updating, patching</span>
  <span class="dt">DELETE</span> = <span class="st">"DELETE"</span>,   <span class="cm">// Removing, destroying</span>
  <span class="dt">MANAGE</span> = <span class="st">"MANAGE"</span>    <span class="cm">// Full administrative access</span>
}

<span class="kw">export interface</span> <span class="dt">OperationContext</span> {
  action?: <span class="dt">string</span>;        <span class="cm">// e.g., "getUser", "editProfile", "addNewDocument"</span>
  method?: <span class="dt">string</span>;        <span class="cm">// e.g., "GET", "POST", "PUT", "PATCH", "DELETE"</span>
  path?: <span class="dt">string</span>;          <span class="cm">// e.g., "/api/v1/reports"</span>
  payload?: <span class="dt">Record</span>&lt;<span class="dt">string</span>, <span class="dt">any</span>&gt;;
  isOwner?: <span class="dt">boolean</span>;      <span class="cm">// Ownership flags for context-aware auto-pick</span>
}

<span class="kw">export interface</span> <span class="dt">GrantResolution</span> {
  requiredGrant: <span class="dt">Grant</span>;
  reason: <span class="dt">string</span>;
  confidence: <span class="st">"EXACT"</span> | <span class="st">"INFERRED"</span> | <span class="st">"DEFAULT"</span>;
}</code></pre>

    <div class="section-title">2. Auto-Pick Engine Logic</div>
    <pre><code><span class="kw">export class</span> <span class="dt">GrantResolver</span> {
  <span class="cm">/**
   * Automatically picks the expected grant based on operation context.
   */</span>
  <span class="kw">public static</span> <span class="fn">autoPickGrant</span>(context: <span class="dt">OperationContext</span>): <span class="dt">GrantResolution</span> {
    <span class="kw">const</span> { action, method, path, payload, isOwner } = context;

    <span class="cm">// Rule 1: HTTP Method Mapping (Exact Match)</span>
    <span class="kw">if</span> (method) {
      <span class="kw">const</span> verb = method.<span class="fn">toUpperCase</span>();
      <span class="kw">switch</span> (verb) {
        <span class="kw">case</span> <span class="st">"GET"</span>:
        <span class="kw">case</span> <span class="st">"HEAD"</span>:
        <span class="kw">case</span> <span class="st">"OPTIONS"</span>:
          <span class="kw">return</span> { requiredGrant: <span class="dt">Grant</span>.<span class="dt">READ</span>, reason: <span class="st">`HTTP Verb '${verb}' requires read access.`</span>, confidence: <span class="st">"EXACT"</span> };
        <span class="kw">case</span> <span class="st">"POST"</span>:
          <span class="kw">return</span> { requiredGrant: <span class="dt">Grant</span>.<span class="dt">CREATE</span>, reason: <span class="st">`HTTP Verb 'POST' creates a new resource.`</span>, confidence: <span class="st">"EXACT"</span> };
        <span class="kw">case</span> <span class="st">"PUT"</span>:
        <span class="kw">case</span> <span class="st">"PATCH"</span>:
          <span class="kw">return</span> { requiredGrant: <span class="dt">Grant</span>.<span class="dt">UPDATE</span>, reason: <span class="st">`HTTP Verb '${verb}' modifies an existing resource.`</span>, confidence: <span class="st">"EXACT"</span> };
        <span class="kw">case</span> <span class="st">"DELETE"</span>:
          <span class="kw">return</span> { requiredGrant: <span class="dt">Grant</span>.<span class="dt">DELETE</span>, reason: <span class="st">`HTTP Verb 'DELETE' removes a resource.`</span>, confidence: <span class="st">"EXACT"</span> };
      }
    }

    <span class="cm">// Rule 2: Action Keyword Intent Recognition</span>
    <span class="kw">if</span> (action) {
      <span class="kw">const</span> act = action.<span class="fn">toLowerCase</span>();

      <span class="cm">// Read actions</span>
      <span class="kw">if</span> (<span class="st">/(get|read|view|fetch|list|search|export|download|find)/</span>.<span class="fn">test</span>(act)) {
        <span class="kw">return</span> { requiredGrant: <span class="dt">Grant</span>.<span class="dt">READ</span>, reason: <span class="st">`Action '${action}' detected as read-only.`</span>, confidence: <span class="st">"INFERRED"</span> };
      }

      <span class="cm">// Add / Create actions</span>
      <span class="kw">if</span> (<span class="st">/(add|create|insert|new|append|register|upload|publish)/</span>.<span class="fn">test</span>(act)) {
        <span class="kw">return</span> { requiredGrant: <span class="dt">Grant</span>.<span class="dt">CREATE</span>, reason: <span class="st">`Action '${action}' detected as creation.`</span>, confidence: <span class="st">"INFERRED"</span> };
      }

      <span class="cm">// Update / Edit actions</span>
      <span class="kw">if</span> (<span class="st">/(edit|update|modify|patch|change|revise|toggle|set)/</span>.<span class="fn">test</span>(act)) {
        <span class="kw">return</span> { requiredGrant: <span class="dt">Grant</span>.<span class="dt">UPDATE</span>, reason: <span class="st">`Action '${action}' detected as modification.`</span>, confidence: <span class="st">"INFERRED"</span> };
      }

      <span class="cm">// Delete actions</span>
      <span class="kw">if</span> (<span class="st">/(delete|remove|destroy|archive|trash|purge)/</span>.<span class="fn">test</span>(act)) {
        <span class="kw">return</span> { requiredGrant: <span class="dt">Grant</span>.<span class="dt">DELETE</span>, reason: <span class="st">`Action '${action}' detected as deletion.`</span>, confidence: <span class="st">"INFERRED"</span> };
      }
    }

    <span class="cm">// Rule 3: Payload Inspection Heuristic</span>
    <span class="kw">if</span> (payload && <span class="dt">Object</span>.<span class="fn">keys</span>(payload).length > <span class="num">0</span>) {
      <span class="kw">if</span> (payload.id && <span class="dt">Object</span>.<span class="fn">keys</span>(payload).length > <span class="num">1</span>) {
        <span class="kw">return</span> { requiredGrant: <span class="dt">Grant</span>.<span class="dt">UPDATE</span>, reason: <span class="st">"Payload contains existing ID and updated fields."</span>, confidence: <span class="st">"INFERRED"</span> };
      }
      <span class="kw">if</span> (!payload.id) {
        <span class="kw">return</span> { requiredGrant: <span class="dt">Grant</span>.<span class="dt">CREATE</span>, reason: <span class="st">"Payload lacks ID; inferred new record insertion."</span>, confidence: <span class="st">"INFERRED"</span> };
      }
    }

    <span class="cm">// Fallback: Default to Least Privilege (READ)</span>
    <span class="kw">return</span> {
      requiredGrant: <span class="dt">Grant</span>.<span class="dt">READ</span>,
      reason: <span class="st">"Could not decisively infer mutation intent; defaulting to least privilege (READ)."</span>,
      confidence: <span class="st">"DEFAULT"</span>
    };
  }

  <span class="cm">/**
   * Verifies if user's granted permissions fulfill the required auto-picked grant.
   */</span>
  <span class="kw">public static</span> <span class="fn">evaluateAccess</span>(userGrants: <span class="dt">Grant</span>[], context: <span class="dt">OperationContext</span>): { authorized: <span class="dt">boolean</span>; resolution: <span class="dt">GrantResolution</span> } {
    <span class="kw">const</span> resolution = <span class="kw">this</span>.<span class="fn">autoPickGrant</span>(context);

    <span class="cm">// Full administrative grant bypasses specific checks</span>
    <span class="kw">if</span> (userGrants.<span class="fn">includes</span>(<span class="dt">Grant</span>.<span class="dt">MANAGE</span>)) {
      <span class="kw">return</span> { authorized: <span class="kw">true</span>, resolution };
    }

    <span class="kw">const</span> authorized = userGrants.<span class="fn">includes</span>(resolution.requiredGrant);
    <span class="kw">return</span> { authorized, resolution };
  }
}</code></pre>

    <div class="section-title">3. Execution & Use-Case Test Suite</div>
    <pre><code><span class="kw">const</span> testCases: <span class="dt">OperationContext</span>[] = [
  <span class="cm">// Use-Case 1: Read Request</span>
  { action: <span class="st">"fetchUserProfile"</span>, method: <span class="st">"GET"</span> },

  <span class="cm">// Use-Case 2: Add / Create Request</span>
  { action: <span class="st">"addNewDocument"</span>, payload: { title: <span class="st">"Q3 Report"</span>, content: <span class="st">"..."</span> } },

  <span class="cm">// Use-Case 3: Edit / Update Request</span>
  { action: <span class="st">"editProductDetails"</span>, payload: { id: <span class="st">"prod_123"</span>, price: <span class="num">99.99</span> } },

  <span class="cm">// Use-Case 4: Auto-pick from raw endpoint</span>
  { method: <span class="st">"PATCH"</span>, path: <span class="st">"/api/v1/settings"</span> },

  <span class="cm">// Use-Case 5: Ambiguous action falling back to auto-picker heuristic</span>
  { action: <span class="st">"syncData"</span> }
];

<span class="kw">const</span> userPermissions = [<span class="dt">Grant</span>.<span class="dt">READ</span>, <span class="dt">Grant</span>.<span class="dt">UPDATE</span>];

console.<span class="fn">log</span>(<span class="st">"=== AUTO-PICK GRANT ENGINE RESULTS ===\n"</span>);

testCases.<span class="fn">forEach</span>((ctx, index) => {
  <span class="kw">const</span> result = <span class="dt">GrantResolver</span>.<span class="fn">evaluateAccess</span>(userPermissions, ctx);
  console.<span class="fn">log</span>(<span class="st">`Test Case ${index + 1}:`</span>, <span class="dt">JSON</span>.<span class="fn">stringify</span>(ctx));
  console.<span class="fn">log</span>(<span class="st">` - Auto-Picked Grant : ${result.resolution.requiredGrant}`</span>);
  console.<span class="fn">log</span>(<span class="st">` - Confidence Level : ${result.resolution.confidence}`</span>);
  console.<span class="fn">log</span>(<span class="st">` - Reasoning        : ${result.resolution.reason}`</span>);
  console.<span class="fn">log</span>(<span class="st">` - User Authorized? : ${result.authorized ? "✅ YES" : "❌ NO"}`</span>);
  console.<span class="fn">log</span>(<span class="st">"-"</span>.<span class="fn">repeat</span>(<span class="num">50</span>));
});</code></pre>

    <div class="section-title">Key Logic Mechanisms</div>
    <table>
        <thead>
            <tr>
                <th>Feature</th>
                <th>Execution Strategy</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>HTTP Verb Parsing</strong></td>
                <td>Maps standard HTTP verbs (<span class="math">GET → READ</span>, <span class="math">POST → CREATE</span>, <span class="math">PUT/PATCH → UPDATE</span>, <span class="math">DELETE → DELETE</span>).</td>
            </tr>
            <tr>
                <td><strong>Keyword Intent Matching</strong></td>
                <td>Evaluates function or RPC action names against specific regex groups for read, add, update, and delete intents.</td>
            </tr>
            <tr>
                <td><strong>Payload Structural Inspection</strong></td>
                <td>Distinguishes between <code>CREATE</code> and <code>UPDATE</code> operations based on the presence of existing entity identifiers (<code>id</code>).</td>
            </tr>
            <tr>
                <td><strong>Least-Privilege Fallback</strong></td>
                <td>Defaults to <code>READ</code> when context is ambiguous to prevent accidental authorization escalation.</td>
            </tr>
        </tbody>
    </table>

</body>
</html>
