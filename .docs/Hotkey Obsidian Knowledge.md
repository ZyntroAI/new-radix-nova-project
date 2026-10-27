Obsidian Hotkeys & Automation Guide

Obsidian hotkeys are customizable keyboard shortcuts that trigger almost any command, letting you work without your mouse. They are distinct from system-level editing shortcuts (like Ctrl+C for copy), which are handled by your OS and cannot be changed within Obsidian.

---

🔑 Core Concept: Hotkeys vs. Editing Shortcuts

· Hotkeys – Customizable shortcuts you assign to Obsidian commands (e.g., open a pane, insert a template). Manage them in Settings → Hotkeys.
· Editing shortcuts – Standard text-editing actions provided by your operating system or the underlying framework (e.g., Ctrl+C, Ctrl+Z, arrow-key navigation). These are not customizable inside Obsidian.

---

⚙️ Managing Hotkeys

All hotkey management happens in Settings → Hotkeys.

· View a command’s hotkey – Open the Command Palette (Ctrl/Cmd + P) and look for the shortcut listed next to the command name.
· Set a hotkey – Find the command, click the + icon, press your desired key combination, then click Save. You can assign multiple hotkeys to the same command by clicking + again.
· Remove a hotkey – Click the X icon next to the key combination.
· Filter the list – Click the filter icon to show only commands that already have a hotkey assigned.

Note on keyboard layouts
Hotkeys are displayed as they appear on a US keyboard layout. The actual key you press works correctly regardless of your physical layout, as long as you don’t change your system’s keyboard layout after recording the hotkey.

---

⌨️ Default Hotkeys

Essential Customizable Hotkeys

Action Windows / Linux macOS
Command Palette Ctrl + P Cmd + P
Quick Switcher (find/open notes) Ctrl + O Cmd + O
New Note Ctrl + N Cmd + N
Toggle Edit/Reading View Ctrl + E Cmd + E
Global Search Ctrl + Shift + F Cmd + Shift + F
Toggle Bold Ctrl + B Cmd + B
Toggle Italics Ctrl + I Cmd + I
Insert Markdown Link Ctrl + K Cmd + K
Open Graph View Ctrl + G Cmd + G
Reopen Last Closed Tab Ctrl + Shift + T Cmd + Shift + T
Open Settings Ctrl + , Cmd + ,

Common Editing Shortcuts (System / Framework – Not Customizable)

Action Windows / Linux macOS
Copy / Cut / Paste Ctrl+C / Ctrl+X / Ctrl+V Cmd+C / Cmd+X / Cmd+V
Paste Without Formatting Ctrl+Shift+V Cmd+Shift+V
Undo / Redo Ctrl+Z / Ctrl+Shift+Z (or Ctrl+Y) Cmd+Z / Cmd+Shift+Z
Delete Current Line Ctrl+Shift+K Cmd+Shift+K
Move Cursor by Word Ctrl+← / Ctrl+→ Option+← / Option+→
Go to Start/End of Line Home / End Cmd+← / Cmd+→
Go to Start/End of Note Ctrl+Home / Ctrl+End Cmd+↑ / Cmd+↓

---

🧩 Community Plugins for Hotkey Power-Ups

Plugin Description
Hotkey Helper Shows hotkey assignments and conflicts directly in the Community Plugins tab. Hover icons to see counts; colour changes indicate conflicts.
Spacekeys Define hotkeys based on sequences of keypresses (inspired by Spacemacs). Uses a leader key and a YAML keymap.
Keyboard Analyzer Visualises all hotkeys as a heatmap; helps find unassigned keys and edit hotkeys directly from the plugin.
Hotkeys Cheatsheet Live, searchable reference card for all shortcuts. Includes filters for “Conflicts only” and “Modified only”.
Leader Hotkeys Adds support for leader-key sequences (like Space followed by another key), similar to Vim/tmux.
Keyshots Introduces powerful IDE-style hotkeys inspired by VS Code and JetBrains.
Shortcuts Trigger commands by chaining single keys, modifier combos, or full sequences (e.g., A then B+C then D).
Doubleshift Trigger commands by double-tapping Shift (or other simple actions). Great for high-frequency operations.
Commander Create “macros” – one hotkey can trigger multiple commands in sequence.
Vim Commands / Vimakase For Vim users: map Obsidian commands to Vim-style multi-key sequences (e.g., space e to open file explorer).

---

🚀 Advanced Customization & Troubleshooting

Multiple Hotkeys per Command

Assign several key combinations to the same command – useful for a quick shortcut plus a mnemonic one. In Settings → Hotkeys, set the first, then click + again.

Context-Specific Hotkeys (Scopes)

Obsidian uses a “scope” system. The active scope (editor, plugin view, modal) receives key presses first and can inherit from parent scopes. This lets plugins create hotkeys that only work when a specific view is focused, avoiding global conflicts.

Managing Conflicts

Multiple commands can share the same key binding, but only one executes at runtime. Use Hotkey Helper (shows conflict indicators) or Hotkeys Cheatsheet (“Conflicts only” filter) to find silent conflicts.

Troubleshooting Common Issues

· Restricted Mode – Ensure it’s disabled in Settings → Community Plugins.
· macOS Input Monitoring – Check System Settings → Privacy & Security → Input Monitoring and grant Obsidian permission.
· Plugin Conflicts – Disable plugins one by one to identify a blocker (e.g., Kanban has blocked Cmd+F).
· OS/Engine-Level Conflicts – Some combos are consumed before Obsidian sees them (e.g., Ctrl+Enter on macOS; use Cmd+Enter or Opt+Enter instead).
· Test with a Fresh Vault – If hotkeys work there, the issue is in your original vault’s configuration.

Best Practices for Hotkeys

· Start with the essentials – Master Command Palette (Ctrl/Cmd+P) and Quick Switcher (Ctrl/Cmd+O) first.
· Assign hotkeys to frequent actions – When you repeatedly use a menu command, give it a shortcut.
· Group logically – Use consistent modifier keys for related commands.
· Don’t fear overriding defaults – Change any shortcut that conflicts with your workflow.
· Back up your configuration – Hotkey assignments live in .obsidian/hotkeys.json. Back it up before major changes.

---

👨‍💻 For Developers

When developing a plugin, you can register commands with optional default hotkeys. The official API recommends avoiding default hotkeys to prevent conflicts with user-configured shortcuts (custom hotkeys always have higher priority). For context-sensitive shortcuts, use the Scope class to register hotkeys that are only active when your plugin’s view is focused.

---

🤖 Advanced Automation

While hotkeys trigger single commands manually, advanced automation chains actions, reacts to events, and connects your vault to external systems. The ecosystem has three main pillars: scripting, visual builders, and AI-powered agents.

📜 Scripting-Based Automation

· Templater & DataviewJS – The classic power duo. Templater runs JavaScript on note creation (standardising frontmatter, dates, dynamic content). DataviewJS writes JavaScript blocks that query your vault like a database to generate live dashboards and lists.
· CustomJS – Write reusable JavaScript classes in a dedicated folder and call them from Templater or DataviewJS. Keeps notes clean and automation modular.
· Shell Commands – Run external scripts (Python, Bash, Node.js) from a command palette action, hotkey, or button. Great for manipulating the current note programmatically.

🖱️ Visual & Trigger-Based Automation

· QuickAdd – The “capture engine”. Creates prompts to quickly add content using predefined templates (e.g., a “New Meeting Note” action that asks for title/date and files it correctly).
· Meta Bind – Modern replacement for the old “Buttons” plugin. Creates interactive buttons and input fields directly in notes. A Meta Bind button can trigger a QuickAdd action, run a Shell Command, or modify frontmatter properties. The combo Meta Bind → QuickAdd is the standard pattern for interactive dashboards.
· Runsh & Cannoli – Runsh executes shell commands from clickable buttons in a note (e.g., launching dev environments). Cannoli builds no-code LLM scripts visually on an Obsidian Canvas using cards and arrows for variables, loops, and branching.

🤖 AI-Powered & External Automation

· AI Workflow Builders – Plugins like Gemini Helper offer a visual node editor for workflows that include LLM commands, HTTP requests, and control flow (if/while).
· MCP (Model Context Protocol) Servers – mcp-obsidian-advanced lets AI agents like Claude deeply understand your vault’s structure and link graph, then perform batch reads, execute Obsidian commands, and create notes based on context.
· External Control via API – The REST and MCP server plugin turns all Obsidian CLI commands into a local HTTP API. Control your vault (create, search, read, modify) from any external script, tool, or AI assistant.
· Autonomous Agents – Agent Fleet lets you build and run AI agents from your vault. They can run on CLI backends (like Claude Code), be scheduled, and connect to Slack/Telegram for interactive control.

💡 Best Practices for Advanced Automation

· Start simple, then chain – Automate one frequent task; once stable, chain it (e.g., a Meta Bind button → QuickAdd capture → Templater script).
· Modularise with CustomJS – Avoid repeating complex code. Put core logic in a CustomJS class and call it from Templater or DataviewJS.
· Use events wisely – The plugin API can listen to workspace events (note creation/modification). Enables background automations but watch performance.
· Version control your config – Use Obsidian Git to version the .obsidian folder (plugin settings, scripts) for backup and rollback.

---

If you have a specific workflow in mind – like automating meeting notes or building a task management system – these building blocks can be combined to suit your needs.