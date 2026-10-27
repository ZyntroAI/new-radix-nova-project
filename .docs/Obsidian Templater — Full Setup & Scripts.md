🚀 Obsidian Templater — Full Setup & Scripts
 
Complete guide to install, configure, and use Templater with your bilingual translation workflow.
 
 
 
🔧 Step 1: Install & Configure Templater
 
Install the Plugin
 
1. Open Settings → Community Plugins
2. Disable Restricted Mode / Safe Mode
3. Search for Templater (by SilentVoid13)
4. Click Install → then Enable
 
Configure Template Folder
 
1. Go to Settings → Templater
2. Under Template folder location, set your folder:
plaintext
  
Templates/Templater
 
 
(Create this folder in your vault first if it doesn't exist)
3. ✅ Done — Templater is ready!
 
 
 
📁 Recommended Folder Structure
 
plaintext
  
YourVault/
├── 📂 Templates/
│   ├── 📂 Templater/              ← Set this in Templater settings
│   │   ├── AI Translation Prompt.md
│   │   ├── New Bilingual Note.md
│   │   ├── Translation Review.md
│   │   └── Update File Frontmatter.md
└── 📂 Scripts/
    └── templater-scripts.js        ← Reusable user scripts
 
 
 
 
📄 Script 1 — One-Click AI Translation Prompt
 
Filename:  Templates/Templater/AI Translation Prompt.md 
 
✅ Inserts the full translation prompt at your cursor — ready to copy-paste into ChatGPT/Claude
 
markdown
  
---
templater: true
created: <% tp.date.now("YYYY-MM-DD") %>
---

🤖 **AI Translation Prompt — EN → TH**

> Copy everything below ↓

````markdown
# Translation Task: English → Thai Technical Documentation

## 🎯 ROLE
You are a senior technical translator specializing in software development and DevOps documentation. Your goal: **accurate, natural Thai that reads like it was originally written by a Thai developer — not machine-translated.**

---

## ⚠️ NON-NEGOTIABLE RULES

### 🔒 MUST STAY IN ENGLISH — DO NOT TRANSLATE:
- All code blocks: ``` ... ```
- Inline code: \`git commit\`, \`npm run build\`
- File paths: \`.github/workflows/\`, \`docs/en/\`
- URLs: https://github.com/yourname/project
- Technical terms: GitHub, Git, API, JSON, YAML, CI/CD, PR, CLI, UI, UX
- Product/brand names exactly as written
- Commands and terminal output

### 📚 USE APPROVED GLOSSARY — Match these exactly:
| English | Thai Translation | Notes |
|---|---|---|
| Authentication | การพิสูจน์ตัวตน | ❌ NOT "เข้าสู่ระบบ" |
| Authorization | การตรวจสอบสิทธิ์ | Distinct from Authentication |
| Repository | คลังเก็บโค้ด | NOT just "โฟลเดอร์" |
| Branch | สาขา | Keep "Branch" in parentheses if needed |
| Commit | บันทึกการเปลี่ยนแปลง | Keep "Commit" in parentheses if needed |
| Pull Request | คำขอรวมโค้ด | May write PR in parentheses |
| Merge | รวม | |
| Deployment | การเผยแพร่สู่ระบบจริง | NOT just "เผยแพร่" |
| Environment | สภาพแวดล้อม | Dev/Staging/Production |
| Pipeline | ขั้นตอนอัตโนมัติ | CI/CD Pipeline |

### ✍️ STYLE GUIDE
- Keep it **clear and direct** — match the original tone
- Use **consistent terminology** from the table above
- When a term has no standard Thai equivalent → keep English and add Thai in parentheses: \`API (อินเทอร์เฟซโปรแกรม)\`
- Preserve all markdown formatting — headings, lists, links, bold text

---

## 📤 OUTPUT FORMAT — FOLLOW EXACTLY

For each paragraph or section:

\`\`\`
[CONFIDENCE: 🟢🟡🔴] — Brief reason
Thai translation here
\`\`\`

### Confidence Guide
- 🟢 **90–100%**: Standard term, clear context, direct match
- 🟡 **70–89%**: Understandable but phrasing could vary; check recommended
- 🔴 **<70%**: Ambiguous, idiomatic, or highly technical; needs human review

### Final Summary
End your response with:

\`\`\`
📊 SUMMARY
✅ Sections ready: __/Total__
⚠️ Needs review: __
🔴 Needs human translation: __
💬 Notes: [any terms that need special attention]
\`\`\`

---

## 📝 CONTENT TO TRANSLATE:

---

[PASTE YOUR ENGLISH CONTENT HERE]

---
 
 
⚡ Insert: Press  Ctrl+P  → "Templater: Insert template" → Select "AI Translation Prompt"
📎 Related: [[Translation Prompt.md]] — full reference
 
plaintext
  

---

## 📄 Script 2 — Create New Bilingual Note
**Filename:** `Templates/Templater/New Bilingual Note.md`

> ✅ Creates both EN + TH files at once with correct frontmatter

```markdown
---
templater: true
created: <% tp.date.now("YYYY-MM-DD") %>
---

<%*
// Ask user for base filename
const baseName = await tp.system.prompt("Enter base filename (e.g., Getting Started):");
if (!baseName) return;

// Ask for category
const categories = ["Documentation", "Guide", "Reference", "Tutorial", "Note"];
const category = await tp.system.suggester(categories, categories);

// Get today's date
const today = tp.date.now("YYYY-MM-DD");
%>

✅ Ready to create: **<% baseName %>.en.md** + **<% baseName %>.th.md**

---

### 🇬🇧 File 1: <% baseName %>.en.md
```markdown
---
lang: en
category: <% category %>
source-file: <% baseName %>.en.md
translated-to: <% baseName %>.th.md
last-synced: <% today %>
needs-review: false
---

# <% baseName %>

> English content goes here...
 
 
 
 
🇹🇭 File 2: <% baseName %>.th.md
 
markdown
  
---
lang: th
category: <% category %>
source-file: <% baseName %>.en.md
translated-from: <% baseName %>.en.md
last-synced: <% today %>
needs-review: true
---

# <% baseName %>

> Thai content — AI translate from English version...
> ⚠️ **needs-review: true** — remove after translation complete
 
 
 
 
📌 Next steps:
 
1. Create both files above in your desired folder
2. Write English content first
3. Use  [[AI Translation Prompt.md]]  to generate Thai draft
4. Review → set  needs-review: false 
5. Move on! 🚀
 
plaintext
  

---

## 📄 Script 3 — Update Translation Status
**Filename:** `Templates/Templater/Update Translation Status.md`

> ✅ Quick-update frontmatter when you finish reviewing a translation

```markdown
---
templater: true
created: <% tp.date.now("YYYY-MM-DD") %>
---

<%*
// Get current file
const file = tp.file.find_tfile(tp.file.path);
if (!file) {
  new Notice("❌ No active file found");
  return;
}

// Confirm it's a Thai file
if (!file.basename.endsWith(".th")) {
  new Notice("⚠️ This only works on Thai translation files");
  return;
}

// Ask status
const status = await tp.system.suggester(
  ["✅ Complete — Approved", "🔄 Updated — Needs review", "⏳ Pending — In progress"],
  ["complete", "stale", "pending"]
);

const today = tp.date.now("YYYY-MM-DD");

// Update frontmatter
const app = this.app;
await app.fileManager.processFrontMatter(file, (fm) => {
  fm["last-synced"] = today;
  fm["needs-review"] = status !== "complete";
  if (status === "complete") {
    fm["reviewed-by"] = "<% tp.user.current_user() %>";
  }
});

new Notice(`✅ Updated: ${file.basename}`);
%>

✅ **Frontmatter Updated!**

| Field | Value |
|---|---|
| `last-synced` | <% tp.date.now("YYYY-MM-DD") %> |
| `needs-review` | <% status !== "complete" %> |

> 💡 Dataview on your Translation Status dashboard will update automatically
> 📎 Dashboard: [[Translation Status.en.md]]
 
 
 
 
📄 Script 4 — Translation Review Checklist
 
Filename:  Templates/Templater/Translation Review.md 
 
✅ Step-by-step review checklist — insert directly into your note
 
markdown
  
---
templater: true
created: <% tp.date.now("YYYY-MM-DD") %>
---

# ✅ Translation Review — <% tp.file.title %>
**Date:** <% tp.date.now("YYYY-MM-DD") %>
**Reviewer:** <% tp.user.current_user() %>

---

## 🔍 Quick Scan
- [ ] Code blocks, commands, paths, URLs → remain in English
- [ ] Brand/product names → not translated
- [ ] Markdown formatting preserved correctly
- [ ] File structure matches English source

## 📚 Terminology
- [ ] Key terms match approved glossary
- [ ] No forbidden translations used
- [ ] New terms added to glossary

## ✍️ Quality Check
- [ ] Meaning matches English exactly
- [ ] Natural Thai phrasing — not literal word-for-word
- [ ] Consistent terminology throughout
- [ ] Technical accuracy maintained

## 📋 Final
- [ ] Frontmatter: `needs-review: false`
- [ ] `last-synced` updated to <% tp.date.now("YYYY-MM-DD") %>
- [ ] AI confidence markers removed
- [ ] Links work correctly

---

<%*
const result = await tp.system.suggester(
  ["✅ All checks passed — Publish!", "⚠️ Some issues — Review again", "🔴 Major issues — Re-translate"],
  ["pass", "review", "fail"]
);

if (result === "pass") {
  tR += "\n🎉 **Review Complete!** Ready to publish.";
} else if (result === "review") {
  tR += "\n⚠️ **Please address the items above, then re-run this checklist.**";
} else {
  tR += "\n🔴 **Translation needs significant revision. Consider re-running AI prompt or manual rewrite.**";
}
%>
 
 
 
 
📄 Script 5 — User Scripts (Reusable Functions)
 
Filename:  Scripts/templater-scripts.js 
 
💡 Set this folder in Settings → Templater → User Scripts functions folder
 
javascript
  
/**
 * User Scripts for Templater
 * Call in templates: <% tp.user.functionName(args) %>
 */

module.exports = {
  // Get today's date in YYYY-MM-DD
  today: () => new Date().toISOString().split('T')[0],
  
  // Generate EN ↔ TH file pair names
  getFilePair: (baseName) => ({
    en: `${baseName}.en.md`,
    th: `${baseName}.th.md`
  }),
  
  // Check if glossary terms appear in content
  validateGlossary: (content) => {
    const forbidden = ['เข้าสู่ระบบ', 'ล็อกอิน'];
    const found = forbidden.filter(term => content.includes(term));
    return found.length === 0 ? "✅ OK" : `❌ Found forbidden terms: ${found.join(', ')}`;
  },
  
  // Current user (from vault config or prompt)
  current_user: async (tp) => {
    const config = require('obsidian').Vault;
    return 'Reviewer'; // Customize this!
  }
};
 
 
 
 
✅ How to Use — Quick Reference
 
What You Want How to Do It 
Insert AI prompt  Ctrl+P  → Templater: Insert template → "AI Translation Prompt" 
Create bilingual note Open folder → Insert template → "New Bilingual Note" → Enter filename 
Mark translation complete Open  .th.md  file → Insert "Update Translation Status" → Select ✅ Complete 
Run review checklist Open Thai file → Insert "Translation Review" → Check items off 
Quick access Assign hotkey: Settings → Hotkeys → Templater: Insert template → Set  Ctrl+Alt+T  
 
 
 
💡 Pro Tips
 
- Prefix your templates: Name them starting with  TPL —   so they group together and are easy to find
- Use Command Palette:  Ctrl/Cmd + P  → type "Templater" for all available commands
- User Scripts folder: Put shared JS functions there → call them from any template with  <% tp.user.functionName() %> 
- Frontmatter updates: Use  processFrontMatter  API (shown in Script 3) — it safely updates only what changes, preserves other fields
- Test first: Try each template in a scratch note before relying on it — tweak the prompts/checklists to match your team's workflow
 
 
 
All 5 templates/scripts are ready to drop in! Just create each file in your  Templates/Templater/  folder and paste the content. 😊
 
Would you like me to also create a quick-start guide note that links all these scripts together in one place?🚀 Bilingual Translation Workspace — Quick Start Guide
 
Your central hub for every template, script, and workflow step
 
 
 
📌 At a Glance
 
Everything you need — one place, one click away. Start here every time you work on translations. ✨
 
 
 
🗺️ Quick Navigation — Jump Straight In
 
What do you need to do today? 🔗 Click Here 
🆓 Create a brand new bilingual note  [[New Bilingual Note.md]]  
🤖 Generate AI translation draft  [[AI Translation Prompt.md]]  
✅ Review & approve a translation  [[Translation Review.md]]  
✍️ Mark translation as complete  [[Update Translation Status.md]]  
📚 Check approved terminology  [[Glossary Master.en.md]]  ·  [[Glossary Master.th.md]]  
🛡️ Terms that stay in English  [[Protected Terms.md]]  
📊 See what's done & what's pending  [[Translation Status.en.md]]  
 
 
 
🔁 Standard Workflow — Step by Step
 
Follow this flow every time you start a new document:
 
plaintext
  
🆓 Step 1: [[New Bilingual Note.md]]
        ↓
✍️ Step 2: Write & finalize ENGLISH content
        ↓
🤖 Step 3: [[AI Translation Prompt.md]] → Generate Thai draft
        ↓
📚 Step 4: Check terms against [[Glossary Master.th.md]]
        ↓
✅ Step 5: [[Translation Review.md]] → Run full checklist
        ↓
✍️ Step 6: [[Update Translation Status.md]] → Mark complete
        ↓
📊 Step 7: Check progress on [[Translation Status.en.md]]
 
 
 
 
🧩 All Templates & Scripts — Complete Index
 
📝 Document Templates
 
# Name What It Does 
T-01  [[New Bilingual Note.md]]  Creates matching EN + TH files with correct frontmatter 
T-02  [[AI Translation Prompt.md]]  One-click copy block for ChatGPT/Claude 
T-03  [[Translation Review.md]]  Step-by-step quality checklist 
T-04  [[Update Translation Status.md]]  Quick-update frontmatter:  needs-review  /  last-synced  
 
📚 Glossary & Reference
 
# Name What It Does 
R-01  [[Glossary Master.en.md]]  Approved English source terms 
R-02  [[Glossary Master.th.md]]  Approved Thai translations 
R-03  [[Protected Terms.md]]  Terms that MUST stay in English 
R-04  [[Glossary Map.md]]  Quick EN ↔ TH term index 
 
🤖 AI Review System
 
# Name What It Does 
A-01  [[AI Review Template.en.md]]  Full guide: how AI review works 
A-02  [[AI Review Template.th.md]]  คู่มือฉบับภาษาไทย 
A-03  [[Translation Prompt.md]]  Complete reference prompt 
A-04  [[Review Checklist.en.md]]  Detailed review criteria 
A-05  [[Review Checklist.th.md]]  รายการตรวจสอบฉบับสมบูรณ์ 
 
📊 Dashboards & Status
 
# Name What It Does 
D-01  [[Translation Status.en.md]]  All files: progress, completion, stale items 
D-02  [[Translation Status.th.md]]  สถานะภาพรวมทั้งหมด 
 
🔧 Scripts & Utilities
 
# Name What It Does 
S-01  Scripts/ai-review-helper.js  Scans drafts for low-confidence/forbidden terms 
S-02  Scripts/validate-glossary.js  Checks all files against approved terminology 
S-03  Scripts/templater-scripts.js  Reusable helper functions for templates 
 
 
 
⌨️ Keyboard Shortcuts — Work Faster
 
Action Shortcut (suggested) What It Does 
Insert Template  Ctrl+Alt+T  Open Templater picker instantly 
Command Palette  Ctrl/Cmd + P  Search everything — type "Templater" or "Translate" 
Toggle Status Dashboard Assign in Hotkeys Jump straight to progress overview 
 
💡 Set these now: Settings → Hotkeys → Search "Templater" → Assign your preferred keys
 
 
 
⚡ Quick Cheat Sheet — Common Situations
 
Situation 🎯 Go Here 
"I need a new document in both languages"  [[New Bilingual Note.md]]  
"English is done — time to translate"  [[AI Translation Prompt.md]]  → copy → paste into AI 
"AI gave me a draft — now what?"  [[Translation Review.md]]  → check all boxes 
"Translation is finished and reviewed"  [[Update Translation Status.md]]  → Mark ✅ Complete 
"Is this the right translation for…?"  [[Glossary Master.th.md]]  → Search the table 
"Can I leave this term in English?"  [[Protected Terms.md]]  → Check the list 
"What still needs to be translated?"  [[Translation Status.en.md]]  → See the full table 
"English changed — need to re-translate" Open TH file → set  needs-review: true  → run AI prompt again 
"Found a new term not in glossary" Open  [[Glossary Master.en.md]]  → Add it → add Thai → both files stay consistent 
 
 
 
💡 Pro Tips
 
- 📌 Pin this note to your sidebar — keep it open whenever you're working
- 🔍 Use search: Type any keyword in the vault search bar — everything is linked
- 🔄 Update this guide: As you add new templates/scripts, add them to the index above — it stays your one-stop hub
- 📅 Daily routine: Start at  [[Translation Status.en.md]]  → see what's pending → pick a file → run the workflow
- ⚠️ Always write English FIRST: Finalize the English source before generating any Thai draft — it avoids rework
 
 
 
🎯 Ready? Let's Go!
 
✅ Your first step today:
Open  [[New Bilingual Note.md]]  and create your first bilingual file!
 
📖 Need the full setup guide? → See:  [[AI Review Template.en.md]]  ·  [[Glossary Master.en.md]] 
 
 
 
Would you like me to turn this into a canvas card or a desktop dashboard layout for your Obsidian workspace? 😊