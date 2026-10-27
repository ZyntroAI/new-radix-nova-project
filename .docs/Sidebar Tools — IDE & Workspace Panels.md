🧩 Sidebar & Panel Tools — Your Workspace at a Glance
 
VS Code • Obsidian • IDEs • Bilingual EN/TH • Ready for Obsidian
 
 
 
📝 Note 10 — Sidebar Tools & Productivity Panels
 
Filename:  Sidebar Tools — IDE & Workspace Panels.md 
 
markdown
  
---
title: "Sidebar Tools — IDE & Workspace Panels"
type: reference/tools
status: active
tags: ["Sidebar", "VSCode", "Obsidian", "Productivity", "Extensions"]
created: 2026-10-09
---

# 🧩 Sidebar Tools — Everything Within Reach
**The best tools are the ones always visible — organized, accessible, one click away<br>เครื่องมือที่ดีที่สุด คือสิ่งที่มองเห็นตลอดเวลา — เป็นระเบียบ เข้าถึงง่าย เพียงคลิกเดียว**

---

## 📋 Table of Contents / สารบัญ

| Section | Tools |
|---------|-------|
| 🟦 [VS Code Sidebar Essentials](#-1-vs-code-sidebar-essentials) | Explorer, Search, Source Control, Run & Debug, Extensions |
| 🤖 [AI Assistant Sidebars](#-2-ai-assistant-sidebars) | Copilot, Cline, Continue, Cursor, Windsurf |
| 📓 [Obsidian Sidebar Plugins](#-3-obsidian-sidebar-plugins) | File Explorer, Tag Pane, Recent Files, Bookmarks, Tabs |
| 🐙 [Git & DevOps Panels](#-4-git--devops-panels) | GitLens, Git Graph, Docker, Kubernetes, Terminal |
| 📊 [Project & Task Sidebars](#-5-project--task-sidebars) | Todo Trees, Project Manager, Kanban, Calendar |
| ⚙️ [Custom Sidebar Workflows](#-6-build-your-own-layout) | How to arrange for maximum efficiency |

---

## 🟦 1. VS Code Sidebar Essentials / แผงด้านข้างพื้นฐานของ VS Code

### Default Activity Bar / แถบเมนูด้านซ้าย
| Icon | Panel / แผง | What It Does / คำอธิบาย | Keyboard Shortcut |
|------|-------------|------------------------|-------------------|
| 📁 | **Explorer** — File Navigator<br>ตัวนำทางไฟล์ | Browse, open, create, rename, delete files<br>ดูและจัดการไฟล์ในโปรเจกต์ | `Ctrl+Shift+E` |
| 🔍 | **Search** — Find in Files<br>ค้นหาข้อความในทุกไฟล์ | Search across all files with regex support<br>ค้นหาข้อความในโปรเจกต์ทั้งหมด รองรับรีจเอกซ์ | `Ctrl+Shift+F` |
| 🌿 | **Source Control** — Git<br>จัดการการเปลี่ยนแปลง | See changes, commit, branch, push/pull — without CLI<br>ดูความแตกต่าง บันทึก เปลี่ยนสาขา ส่ง/ดึง — ไม่ต้องใช้คำสั่ง | `Ctrl+Shift+G` |
| 🐛 | **Run & Debug**<br>รันและดีบัก | Set breakpoints, inspect variables, step through code<br>ตั้งจุดหยุด ดูตัวแปร ดูการทำงานทีละบรรทัด | `Ctrl+Shift+D` |
| 📦 | **Extensions**<br>ส่วนเสริม | Browse, install, manage VS Code extensions<br>ค้นหาและติดตั้งส่วนเสริมเพิ่มเติม | `Ctrl+Shift+X` |

---

## 🤖 2. AI Assistant Sidebars / แผงผู้ช่วย AI

> 💡 **Right-side panel = your AI conversation partner — always visible, never blocks your code**<br>💡 **แผงด้านขวา = ห้องสนทนากับ AI — มองเห็นตลอดเวลา ไม่บังโค้ดของคุณ**

### 🤖 GitHub Copilot Chat
| Feature / คุณสมบัติ | Description / คำอธิบาย |
|---------------------|------------------------|
| **Sidebar Location** | Right panel — Chat icon 💬<br>แผงด้านขวา — ไอคอนรูปข้อความ |
| **What It Can Do** | Explain code, refactor, debug, generate tests, fix errors<br>อธิบายโค้ด ปรับโครงสร้าง ดีบัก สร้างทดสอบ แก้ไขข้อผิดพลาด |
| **Key Commands** | `/explain` — understand code<br>`/refactor` — improve structure<br>`/fix` — resolve errors<br>`/tests` — generate unit tests |
| **Best For** | Quick questions about your current file<br>คำถามสั้นๆ เกี่ยวกับโค้ดที่กำลังเปิดอยู่ |

### 🤖 Cline (formerly Continue)
| Feature / คุณสมบัติ | Description / คำอธิบาย |
|---------------------|------------------------|
| **Sidebar Location** | Left activity bar — Cline icon 🧠<br>แถบเมนูด้านซ้าย — ไอคอนสมอง |
| **What It Can Do** | Edit files directly, run terminal commands, multi-step tasks<br>แก้ไขไฟล์โดยตรง รันคำสั่งในเทอร์มินัล ทำงานหลายขั้นตอน |
| **Key Capabilities** | ✅ Can see your entire codebase<br>✅ Can create new files<br>✅ Can run tests and fix failures<br>✅ Supports multiple models (GPT-4o, Claude, Gemini)<br>เห็นโค้ดทั้งโปรเจกต์ • สร้างไฟล์ใหม่ได้ • รันทดสอบและแก้ไขความล้มเหลว • เลือกโมเดลได้ |
| **Best For** | Coding tasks that span multiple files<br>งานเขียนโค้ดที่เกี่ยวข้องหลายไฟล์พร้อมกัน |

### 🤖 Cursor / Windsurf — Built-in AI Sidebar
| Feature / คุณสมบัติ | Description / คำอธิบาย |
|---------------------|------------------------|
| **Sidebar Location** | Right panel — always visible<br>แผงด้านขวา — มองเห็นตลอดเวลา |
| **What It Can Do** | Command+K quick edit, Command+L chat, full codebase index<br>แก้ไขด้วยคำสั่ง แชทแบบสนทนา เข้าใจทั้งโปรเจกต์ |
| **Best For** | Developers wanting AI deeply integrated<br>สำหรับนักพัฒนาที่ต้องการ AI ผสานรวมอย่างลึกซึ้ง |

---

## 🐙 3. Git & DevOps Panels / แผงจัดการ Git และ DevOps

### GitLens — Supercharge Git
| Sidebar Panel / แผง | What It Shows / แสดงอะไร |
|---------------------|------------------------|
| **GitLens — Commits** | Browse all commits → see what changed in each<br>ดูรายการบันทึกทั้งหมด → ดูความแตกต่าง |
| **GitLens — Branches** | Switch, compare, merge branches visually<br>เปลี่ยน เปรียบเทียบ และรวมสาขาแบบภาพ |
| **GitLens — File History** | Who changed this file, when, and why<br>ใครแก้ไฟล์นี้ เมื่อไหร่ และทำไม |
| **Git Graph** 📊 | Visual commit graph — click to explore<br>แสดงแผนผังการรวมสาขาแบบภาพ คลิกเพื่อดูรายละเอียด |

### Docker Extension
| Sidebar Panel / แผง | What It Does / คำอธิบาย |
|---------------------|------------------------|
| **Containers** 🐳 | List → start/stop → view logs → exec shell — all without CLI<br>ดูรายการ เริ่ม/หยุด ดูบันทึก เข้าไปใช้งาน — ไม่ต้องพิมพ์คำสั่ง |
| **Images** | Pull, run, inspect, delete images<br>ดึง สร้าง ตรวจสอบ และลบอิมเมจ |
| **Volumes & Networks** | Manage persistent data and connections<br>จัดการพื้นที่เก็บข้อมูลถาวรและการเชื่อมต่อ |

### Kubernetes Extension
| Sidebar Panel / แผง | What It Does / คำอธิบาย |
|---------------------|------------------------|
| **Clusters** ☸️ | Switch contexts → view nodes → check cluster health<br>เปลี่ยนคลัสเตอร์ ดูโหนด ตรวจสอบสถานะระบบ |
| **Workloads** | Deployments, Pods, StatefulSets — one-click view<br>ดูแอป พอด และชุดข้อมูล — คลิกเดียว |
| **Services & Ingress** | View endpoints → copy URLs → check status<br>ดูจุดเชื่อมต่อ → คัดลอกที่อยู่ → ตรวจสอบสถานะ |

---

## 📓 4. Obsidian Sidebar Plugins / ส่วนเสริมแถบด้านข้างสำหรับ Obsidian

### Core Sidebars
| Panel / แผง | Purpose / หน้าที่ | Shortcut |
|-------------|------------------|----------|
| 📁 **Files** | Navigate your vault<br>นำทางในคลังความรู้ | `Ctrl+O` |
| 🏷️ **Tags** | Filter notes by tag<br>กรองบันทึกตามป้ายกำกับ | — |
| 🔍 **Search** | Full-text search across all notes<br>ค้นหาข้อความในทุกบันทึก | `Ctrl+Shift+F` |
| 📜 **Bookmarks** | Pin frequently used notes<br>ปักหมุดบันทึกที่ใช้บ่อย | — |
| 📅 **Calendar** | Jump to daily notes by date<br>ข้ามไปยังบันทึกประจำวันตามวันที่ | — |

### Community Plugins — Sidebar Essentials
| Plugin Name | What It Adds / เพิ่มอะไร | Best For / เหมาะสำหรับ |
|-------------|------------------------|----------------------|
| **Recent Files** 🕐 | Sidebar list of recently opened notes<br>แสดงรายการบันทึกที่เปิดล่าสุด | Quickly switch between active projects<br>สลับไปมาระหว่างงานที่กำลังทำได้รวดเร็ว |
| **Tag Wrangler** 🏷️ | Manage tags in sidebar — merge, rename, restructure<br>จัดการป้ายกำกับ — รวม เปลี่ยนชื่อ จัดระเบียบ | Cleaning up messy tag systems<br>จัดระเบียบป้ายกำกับที่ยุ่งเหยิง |
| **Excalidraw** ✏️ | Drawing canvas panel — diagrams directly in notes<br>แผงวาดรูป — สร้างแผนภาพแนบบันทึก | Architecture diagrams, flowcharts<br>วาดแผนผังระบบ แผนภูมิการทำงาน |
| **Kanban** 📋 | Sidebar project board from links<br>แผงงานแบบคานบานจากรายการบันทึก | Project planning — To Do / In Progress / Done<br>วางแผนงาน — รอทำ / กำลังทำ / เสร็จแล้ว |
| **Note Tabs** 📑 | Multi-tab sidebar — open multiple notes at once<br>แถบแท็บ — เปิดหลายบันทึกพร้อมกัน | Cross-referencing notes<br>เปิดอ้างอิงข้ามบันทึกได้พร้อมกัน |
| **Vault Statistics** 📊 | Sidebar dashboard — note count, links, tags, backlinks<br>แผงข้อมูลรวม — จำนวนบันทึก การเชื่อมโยง ป้ายกำกับ | Understanding your knowledge base<br>ภาพรวมคลังความรู้ของคุณ |
| **Backlinks Panel** 🔗 | Shows "What links here" on every note<br>แสดง "บันทึกไหนเชื่อมถึงที่นี่" ที่ด้านล่าง | Discovering related content<br>ค้นพบความสัมพันธ์ระหว่างบันทึก |

---

## 📊 5. Project & Task Sidebars / แผงจัดการงานและโปรเจกต์

### VS Code Productivity Panels
| Extension | Sidebar Feature / คุณสมบัติ | Use Case / สถานการณ์ |
|-----------|---------------------------|---------------------|
| **Todo Tree** ✅ | Scans your project for `TODO:`, `FIXME:`, `BUG:` → shows in sidebar<br>สแกนโปรเจกต์หาข้อความเตือน → แสดงรายการรวม | See all pending tasks across your codebase<br>เห็นงานที่ค้างอยู่ทั้งโปรเจกต์ในที่เดียว |
| **Project Manager** 📂 | Switch between projects instantly from sidebar<br>เปลี่ยนโปรเจกต์ได้ทันทีจากแถบด้านข้าง | Working on multiple repositories<br>สลับไปมาระหว่างหลายโปรเจกต์ |
| **Tasks** ⚡ | Define custom commands → run from sidebar<br>กำหนดคำสั่งลัด → รันจากแถบด้านข้าง | `npm run dev`, `terraform plan`, `kubectl apply`<br>สั่งงานที่ใช้บ่อยได้คลิกเดียว |
| **Error Lens** 🔴 | Shows errors/warnings inline in the editor<br>แสดงข้อผิดพลาดเด่นชัดทันทีที่บรรทัด | Catch issues as you type<br>รู้ทันทีเมื่อพิมพ์ผิดหรือมีปัญหา |

---

## ⚙️ 6. Build Your Own Layout / จัดเลย์เอาต์ให้เหมาะสม

### 🎯 Recommended Layouts / รูปแบบที่แนะนำ

#### 💻 Daily Coding Layout
 
 
┌─────────────────────────────────────────────────────┐
│  📁 Explorer  │  📝 Editor Area        │  💬 AI Chat │
│  🔍 Search    │                         │  Copilot/   │
│  🌿 Git       │  ← Your Code Here      │  Cline      │
│  🐳 Docker    │                         │  Assistant  │
└─────────────────────────────────────────────────────┘
Left: Navigation      Center: Work          Right: Help
ซ้าย: นำทาง           กลาง: ทำงาน            ขวา: ผู้ช่วย
 
plaintext
  

#### 📖 Knowledge Management Layout (Obsidian)
 
 
┌─────────────────────────────────────────────────────┐
│  📁 Files     │  📝 Active Note         │  🏷️ Tags    │
│  📅 Calendar  │                         │  🔗 Backlinks│
│  📜 Bookmarks │  ← Writing/Reading       │  📊 Stats    │
│  🕐 Recent    │                         │             │
└─────────────────────────────────────────────────────┘
Left: Navigation      Center: Note          Right: Context
ซ้าย: นำทาง           กลาง: บันทึก           ขวา: บริบท
 
plaintext
  

#### 🚀 DevOps Workflow Layout
 
 
┌─────────────────────────────────────────────────────┐
│  🌿 Git Graph │  📄 Config/Manifest      │  ☸️ K8s     │
│  ☸️ Kubernetes│  ← Editing Here          │  🐳 Docker  │
│  🐳 Docker    │                          │  📋 Todo    │
└─────────────────────────────────────────────────────┘
Left: Infrastructure  Center: Code/Config    Right: Status
ซ้าย: ทรัพยากร       กลาง: โค้ด/ค่าตั้งค่า    ขวา: สถานะ
 
plaintext
  

### ⌨️ Essential Shortcuts / คีย์ลัดที่ต้องรู้

| Shortcut | What It Does |
|----------|-------------|
| `Ctrl+B` | Toggle **Sidebar** visibility — maximize workspace instantly<br>แสดง/ซ่อนแถบด้านข้าง — เพิ่มพื้นที่ทำงานทันที |
| `Ctrl+Shift+P` → "View: Toggle Panel" | Toggle **Bottom Panel** (terminal, problems, output)<br>แสดง/ซ่อนแผงด้านล่าง |
| `Ctrl+Shift+E` | Focus **Explorer** — navigate files fast<br>ไปที่แผงไฟล์ — นำทางได้รวดเร็ว |
| `Ctrl+Shift+G` | Focus **Source Control** — check changes often<br>ไปที่แผง Git — ตรวจสอบการเปลี่ยนแปลง |
| `Ctrl+Shift+X` | Open **Extensions Marketplace**<br>เปิดร้านส่วนเสริม |
| `Ctrl+Shift+.` | Quick **Open Recent** — jump between projects<br>เปิดรายการล่าสุด — สลับโปรเจกต์เร็วขึ้น |

---

## ⚡ Pro Tips / เทคนิคมือโปร

| 💡 Tip | Why It Works |
|--------|-------------|
| **Keep only what you use visible**<br>แสดงเฉพาะสิ่งที่ใช้จริง | Right-click activity bar → hide icons you rarely use. Less clutter = faster focus.<br>คลิกขวาที่แถบเมนู → ซ่อนไอคอนที่ไม่ได้ใช้ ลดความยุ่งเหยิง |
| **Use the Right Panel for AI**<br>ใช้แผงด้านขวาสำหรับ AI | AI chat on the right → code stays undisturbed on the left.<br>แชทอยู่ขวา → โค้ดทางซ้ายไม่ถูกบัง |
| **Drag & Drop to rearrange**<br>ลากเพื่อจัดลำดับใหม่ | Drag icons on the activity bar → put your most-used tools at the top.<br>ลากไอคอนขึ้นลง — จัดเรียงเครื่องมือที่ใช้บ่อยไว้ข้างบน |
| **Split panels vertically**<br>แยกแผงออกเป็นคอลัมน์ | Terminal + file tree side-by-side — no more switching back and forth.<br>เทอร์มินัลข้างๆ โครงสร้างไฟล์ — ไม่ต้องสลับหน้าต่างบ่อย |

---

### 🔗 Related Notes
`[[CLI Tools — DevOps Complete Reference]]` • `[[AI Agents — Tools Skills & Capabilities]]`

---

*Last Updated: 2026-10-09*
 
 
 
 
📥 How to Add to Obsidian
 
1. Create new note:  Sidebar Tools — IDE & Workspace Panels.md 
2. Copy the content above
3. Link from your main reference:  [[DevOps Toolchain Reference]]  →  [[Sidebar Tools — IDE & Workspace Panels]] 
4. Add tags:  #Productivity #VSCode #Obsidian #Workspace #Reference 
 
 
 
Would you like me to dive deeper into any specific sidebar tool — like configuring Cline, setting up an Obsidian dashboard, or customizing your VS Code activity bar? 😊🧩 Sidebar Tools — IDE & Workspace Panels
 
 
 
📌 ภาพรวม
 
Sidebar / Activity Bar คือแถบเครื่องมือแนวตั้ง มักอยู่ด้านซ้ายของหน้าต่าง IDE — ทำหน้าที่เป็น "จุดรวมทางลัด" เพื่อสลับไปมาระหว่างแผงทำงานต่างๆ ได้อย่างรวดเร็ว โดยไม่ทำให้พื้นที่แก้ไขโค้ดแคบลง ✨
 
 
 
🧭 VS Code — Activity Bar & Sidebar
 
🔹 Activity Bar (แถบไอคอนด้านซ้ายสุด)
 
แถบแนวตั้งที่มีเฉพาะไอคอน — คลิกเพื่อเปิด/ปิดแผงด้านข้าง
 
ไอคอน แผงทำงาน หน้าที่หลัก แป้นลัด 
📂 Explorer แผงจัดการไฟล์ ดู สร้าง ย้าย ลบไฟล์และโฟลเดอร์  Ctrl/Cmd + E  
🔍 Search ค้นหา ค้นหาข้อความในไฟล์ทั้งโปรเจกต์ + แทนที่  Ctrl/Cmd + Shift + F  
🌿 Source Control Git & การควบคุมเวอร์ชัน ดูการเปลี่ยนแปลง, Commit, Push, Pull, สาขา  Ctrl/Cmd + Shift + G  
🐛 Run & Debug ดีบักและรัน เริ่มโปรแกรม ตั้งจุดพัก ดูค่าตัวแปร  Ctrl/Cmd + Shift + D  
📦 Extensions จัดการส่วนขยาย ติดตั้ง/เปิดใช้/ปิดใช้ส่วนขยายเพิ่มเติม  Ctrl/Cmd + Shift + X  
📋 Profiles โปรไฟล์การตั้งค่า สลับชุดการตั้งค่า, ส่วนขยาย, รูปลักษณ์ — 
⚙️ Settings การตั้งค่า ปรับแต่งพฤติกรรม, รูปแบบ, คีย์ลัดของ IDE  Ctrl/Cmd + ,  
 
🔹 Sidebar Panels (แผงเนื้อหาที่เปิดออกมา)
 
แผงแต่ละประเภทอาจมีแถบเมนูย่อยที่ด้านบนของแผง:
 
แผง แถบเมนูย่อย สิ่งที่ทำได้ 
📂 Explorer Open Editors • Explorer • Outline • Timeline ดูไฟล์ที่เปิดอยู่ • โครงสร้างไฟล์ • โครงสร้างโค้ด • ประวัติการแก้ไข 
🔍 Search Search • Replace ค้นหาในไฟล์ • ค้นหาและแทนที่ • ใช้ Regular Expression 
🌿 Source Control Source Control • Source Control Graph ดู Diff • สเตจ/ไม่สเตจไฟล์ • ประวัติคอมมิตแบบกราฟ 
🐛 Run & Debug Run and Debug • Debug Console ตั้งค่า Launch • เริ่มดีบัก • ดูข้อความคอนโซล 
 
 
 
🗂️ แผงย่อยที่มักมองข้ามแต่มีประโยชน์มาก
 
📑 Outline — โครงสร้างไฟล์
 
แสดงรายการฟังก์ชัน คลาส ตัวแปร ทั้งหมดในไฟล์ที่เปิดอยู่ — คลิกเพื่อกระโดดไปที่บรรทัดนั้นทันที
 
- ใช้แทนการเลื่อนหาโค้ดที่ยาวๆ ได้ดีมาก
- แสดงระดับการซ้อนของโค้ด ช่วยตรวจสอบความถูกต้องของโครงสร้าง
 
⏳ Timeline — ประวัติการแก้ไข
 
แสดงประวัติการแก้ไขไฟล์นั้นๆ ตามเวลา — ดูว่าใคร แก้เมื่อไหร่ และเปลี่ยนอะไร
 
- เปรียบเทียบเวอร์ชันก่อนหน้าได้โดยตรง
- เหมาะเมื่อลบโค้ดบางอย่างไปแล้วอยากกู้คืน
 
📁 Open Editors — ไฟล์ที่เปิดอยู่
 
แสดงรายการไฟล์ที่คุณเปิดแท็บไว้ — จัดเรียง ปิดที่ไม่ใช้ ล้างรายการได้
 
- ช่วยเมื่อเปิดไฟล์เยอะจนแท็บมองไม่ถูก
 
 
 
🔧 ปรับแต่ง Sidebar ให้เข้ามือ
 
ย้ายตำแหน่ง Sidebar
 
- ย้ายไปขวา:  เมนู > View > Move Sidebar to Right 
- ซ่อน/แสดง:  Ctrl/Cmd + B  — ซ่อนทั้งแถบเพื่อเพิ่มพื้นที่หน้าจอชั่วคราว
 
เพิ่ม/ลบไอคอนใน Activity Bar
 
- คลิกขวาที่พื้นที่ว่างใน Activity Bar → เลือก "Hide/Show Activity Bar Items"
- ติ๊กถูก/เอาออกตามความจำเป็น — เหลือแค่ที่ใช้จริงจะไม่รกตา
 
เปิดแผงอื่นๆ ที่ซ่อนอยู่
 
-  Ctrl/Cmd + Shift + P  → พิมพ์ "View: Toggle Panel" หรือชื่อแผงที่ต้องการ เช่น "Output", "Problems", "Terminal"
- สามารถลากแผงไปวางซ้อนกันได้เหมือนแท็บ — คลิกชื่อแล้วลากไปไว้แถวเดียวกัน
 
 
 
💡 เคล็ดลับการใช้งานให้คล่องมือ
 
สิ่งที่ต้องการทำ วิธีที่เร็วที่สุด 
เปิด/ปิด Sidebar ทั้งหมด  Ctrl/Cmd + B  
โฟกัสไปที่แผง Explorer  Ctrl/Cmd + 0  แล้วกด 1 
สลับแผงอย่างรวดเร็ว  Ctrl/Cmd + Shift + E / F / G / D / X  
ซ่อนแผงเมื่อไม่ใช้งาน คลิกไอคอนที่กำลังเปิดอยู่อีกครั้งเพื่อปิด 
เปิดแผงค้างไว้หลายแผง ลากชื่อแผงไปวางแยกกันได้ (ด้านล่าง/ข้างๆ กัน) 
 
 
 
🆘 ปัญหาที่พบบ่อย & วิธีแก้
 
อาการ สาเหตุ วิธีแก้ 
หายไปไหนไม่รู้ กดปิดโดยบังเอิญ  เมนู > View > Activity Bar  เพื่อแสดงกลับมา 
ไอคอนน้อย/เกินไป ถูกซ่อนไว้ คลิกขวาที่ Activity Bar → เลือกรายการที่ต้องการแสดง 
แผงเล็ก/ใหญ่เกินไป ขอบถูกลากย่อ/ขยาย ลากขอบด้านขวาของ Sidebar เพื่อปรับความกว้าง 
อยากให้เปิดแผงเดิมที่ค้างไว้ ปิดโปรแกรมก่อนปิดแผง บันทึกงานแล้วปิด VS Code อย่างถูกวิธี — โปรแกรมจะจดจำสถานะล่าสุดให้เอง 
 
 
 
💡 หลักการทอง: Sidebar มีไว้เพื่อช่วย — ไม่ต้องเปิดทิ้งไว้ตลอดเวลา เปิดเมื่อต้องการใช้ → ทำงานเสร็จ → ปิด เพื่อให้พื้นที่เขียนโค้ดกว้างที่สุดเท่าที่จะเป็นไปได้ ✅
 
ต้องการเจาะลึกแผงใดเป็นพิเศษไหมครับ เช่น Explorer, Source Control, หรือ Run & Debug 😊📂🔍🐛 VS Code — เจาะลึก 3 แผงหลัก
 
 
 
📂 แผง Explorer — จัดการไฟล์และโครงสร้างโปรเจกต์
 
ทางลัด:  Ctrl/Cmd + E  | ไอคอน: 📂
 
📌 ส่วนประกอบภายในแผง
 
ส่วน หน้าที่ 
Open Editors แสดงไฟล์ที่คุณเปิดแท็บไว้ — ปิดที่ไม่ใช้ได้ครั้งเดียวทุกไฟล์ 
Explorer แสดงโครงสร้างโฟลเดอร์และไฟล์แบบต้นไม้ — คลิกเพื่อเปิด ดับเบิลคลิกเพื่อแก้ไข 
Outline แสดงรายการฟังก์ชัน คลาส ตัวแปร ภายในไฟล์ที่เปิดอยู่ — คลิกเพื่อกระโดดไปที่บรรทัดนั้นทันที 
Timeline แสดงประวัติการแก้ไขไฟล์นั้นๆ ตามเวลา — ดูว่าใครแก้เมื่อไหร่ และเปลี่ยนอะไร 
 
⚡ การทำงานพื้นฐาน
 
การกระทำ วิธีทำ 
สร้างไฟล์ใหม่ คลิกไอคอน ⨕ ที่ด้านบนแผง 
สร้างโฟลเดอร์ใหม่ คลิกไอคอน ⨁ ที่ด้านบนแผง 
เปลี่ยนชื่อไฟล์ คลิกขวาที่ไฟล์ → Rename หรือกด  F2  
ลบไฟล์ คลิกขวา → Delete หรือกด  Del  
คัดลอก/วาง  Ctrl+C  /  Ctrl+V  ทำงานได้ตรงกับไฟล์ปกติ 
เปิดในระบบไฟล์ คลิกขวา → Reveal in File Explorer/Finder 
 
💡 เคล็ดลับ
 
- ✅ กรองไฟล์: พิมพ์ในช่องค้นหาที่ด้านบนแผง เพื่อซ่อนไฟล์ที่ไม่ต้องการเห็น
- ✅ เปิดหลายไฟล์: กด  Ctrl  แล้วคลิกเลือกไฟล์หลายไฟล์พร้อมกัน
- ✅ จัดกลุ่ม: คลิกไอคอน  ⋮  → Sort By → เลือกจัดเรียงตามชื่อ/ประเภท/วันที่/ขนาด
- ✅ Quick Open: กด  Ctrl/Cmd + P  พิมพ์ชื่อไฟล์เพื่อเปิดทันทีโดยไม่ต้องหาในแผง
 
 
 
🌿 แผง Source Control — จัดการ Git และการควบคุมเวอร์ชัน
 
ทางลัด:  Ctrl/Cmd + Shift + G  | ไอคอน: 🌿
 
📌 ส่วนประกอบภายในแผง
 
ส่วน หน้าที่ 
Changes ไฟล์ที่แก้ไขแล้วยังไม่ได้สเตจ — แสดงว่าแก้อะไรไปบ้าง 
Staged Changes ไฟล์ที่เตรียมพร้อมสำหรับคอมมิต — จะถูกบันทึกลงในประวัติ 
Merge Changes แสดงเมื่อเกิดการรวมสาขาที่ขัดแย้งกัน — ต้องแก้ไขก่อนดำเนินการต่อ 
Branches สลับ สร้าง หรือจัดการสาขาทั้งหมดในโปรเจกต์ 
Remotes แสดงการเชื่อมต่อกับที่เก็บระยะไกล (GitHub/GitLab ฯลฯ) 
 
⚡ คำสั่งที่ใช้บ่อยที่สุด
 
การกระทำ วิธีทำ 
สเตจไฟล์ คลิกเครื่องหมาย  +  ข้างชื่อไฟล์ หรือคลิก Stage All Changes 
ยกเลิกสเตจ คลิกเครื่องหมาย  -  ข้างชื่อไฟล์ในส่วน Staged 
เขียนข้อความคอมมิต พิมพ์ที่ช่องด้านบน → กด  Ctrl+Enter  เพื่อคอมมิต 
ส่งไปยังรีโมท (Push) คลิกไอคอน ⬆️ ที่แถบด้านล่างแผง 
ดึงข้อมูลล่าสุด (Pull) คลิกไอคอน ⬇️ ที่แถบด้านล่างแผง 
ดูความแตกต่าง คลิกชื่อไฟล์ — จะเห็นบรรทัดที่ถูกลบ (แดง) และเพิ่ม (เขียว) 
ยกเลิกการแก้ไข คลิกขวาที่ไฟล์ในส่วน Changes → Discard Changes 
สร้างสาขาใหม่ คลิกชื่อสาขาที่ด้านล่าง → + Create new branch 
 
⚠️ สัญญาณที่ควรสังเกต
 
สัญญาณ ความหมาย ควรทำ 
 ● n  มีไฟล์เปลี่ยนแปลง n ไฟล์ ตรวจสอบและคอมมิต 
 ↓ n  มีการเปลี่ยนแปลงใหม่บนเซิร์ฟเวอร์ ดึงข้อมูลก่อนทำงานต่อ 
 ↑ n  มีคอมมิตที่ยังไม่ได้ส่งขึ้นเซิร์ฟเวอร์ กด Push 
 ⚠️  เกิดความขัดแย้งในการรวมสาขา แก้ไขไฟล์ที่ขัดแย้งก่อนสเตจ 
 
 
 
🐛 แผง Run & Debug — รันโปรแกรมและดีบัก
 
ทางลัด:  Ctrl/Cmd + Shift + D  | ไอคอน: 🐛
 
📌 ส่วนประกอบภายในแผง
 
ส่วน หน้าที่ 
เมนูดรอปดาวน์ เลือกการกำหนดค่าที่จะรัน (เช่น "Run Server", "Debug Tests") 
ปุ่มควบคุม ▶️ เริ่ม • ⏸️ หยุดชั่วคราว • ⏹️ หยุด • ↺ รีสตาร์ท • ⏭️ ข้ามไปขั้นตอนถัดไป 
Variables ดูค่าตัวแปรทั้งหมดในขณะที่โปรแกรมหยุดทำงาน — ขยายเพื่อดูรายละเอียด 
Watch เพิ่มตัวแปร/นิพจน์ที่ต้องการเฝ้าดูค่าตลอดเวลา 
Call Stack แสดงลำดับฟังก์ชันที่เรียกมาจนถึงจุดปัจจุบัน — คลิกเพื่อกระโดดกลับ 
Breakpoints รายการจุดพักทั้งหมด — เปิด/ปิด หรือลบจุดพักได้ 
 
⚡ การเริ่มใช้งานครั้งแรก
 
1. เปิดแผง Run & Debug → คลิก "create a launch.json file"
2. เลือกประเภทสภาพแวดล้อม (เช่น Node.js, Python, C++, Chrome)
3. VS Code จะสร้างไฟล์  .vscode/launch.json  ให้อัตโนมัติ
4. เลือกการกำหนดค่าจากเมนูดรอปดาวน์ → กด ▶️ เพื่อเริ่ม
 
🔑 สิ่งที่ต้องรู้เกี่ยวกับจุดพัก (Breakpoint)
 
การกระทำ วิธีทำ 
ตั้งจุดพัก คลิกด้านซ้ายของเลขบรรทัด — จะเห็นจุดแดง 🔴 
ยกเลิกจุดพัก คลิกจุดแดงอีกครั้งเพื่อลบ 
เงื่อนไขการพัก คลิกขวาที่เลขบรรทัด → Add Conditional Breakpoint — พิมพ์เงื่อนไข เช่น  x > 10  
บันทึกข้อความเมื่อถึงจุด คลิกขวา → Add Log Point — พิมพ์ข้อความ เช่น  "ค่า x คือ {x}"  
ปิดทั้งหมด คลิกขวาที่รายการในส่วน Breakpoints → Disable All Breakpoints 
 
📊 แผงด้านล่าง — Debug Console
 
แสดงผลลัพธ์ขณะรันโปรแกรม และพิมพ์คำสั่งเพื่อทดสอบได้แบบเรียลไทม์
 
- พิมพ์ชื่อตัวแปร → กด Enter เพื่อดูค่า
- พิมพ์นิพจน์ เช่น  2 + 2  หรือ  user.name.toUpperCase()  → ดูผลลัพธ์ทันที
- กด ↑↓ เพื่อเรียกคำสั่งที่เคยพิมพ์ไว้
 
 
 
📋 สรุปเปรียบเทียบ
 
 📂 Explorer 🌿 Source Control 🐛 Run & Debug 
ทำเพื่ออะไร จัดการไฟล์ จัดการประวัติและการเปลี่ยนแปลง รันและตรวจสอบโปรแกรม 
เมื่อไหร่ใช้ ตอนสร้าง/ย้าย/เปิดไฟล์ ก่อนและหลังแก้ไขงาน เพื่อบันทึกส่งทีม เมื่อต้องการทดสอบหรือหาข้อผิดพลาด 
ทางลัด  Ctrl/Cmd + E   Ctrl/Cmd + Shift + G   Ctrl/Cmd + Shift + D  
สิ่งสำคัญที่สุด รู้ว่าไฟล์อยู่ที่ไหน คอมมิตบ่อยๆ อธิบายชัดเจน ตั้งจุดพัก ตรวจสอบค่า รันขั้นตอนทีละบรรทัด 
 
 
 
ต้องการเจาะลึกเรื่องใดเพิ่มไหมครับ เช่น วิธีตั้งค่า launch.json, การแก้ Merge Conflict, หรือเคล็ดลับการค้นหาใน Explorer 😊⚙️ คู่มือ: วิธีตั้งค่า  launch.json  — ฉบับสมบูรณ์
 
 launch.json  คือไฟล์การกำหนดค่าที่บอก VS Code ว่า "จะรันโปรแกรมอย่างไร ด้วยอะไร และส่งค่าอะไรไปบ้าง" — อยู่ที่  .vscode/launch.json  ภายในโปรเจกต์ ✨
 
 
 
📌 ขั้นตอนสร้างไฟล์ครั้งแรก
 
1. เปิดแผง Run & Debug →  Ctrl/Cmd + Shift + D 
2. คลิก "create a launch.json file"
3. เลือกประเภทสภาพแวดล้อมของโปรเจกต์ (เช่น Node.js, Python, C++, Chrome)
4. VS Code สร้างโฟลเดอร์  .vscode/  และไฟล์  launch.json  ให้อัตโนมัติ ✅
 
 
 
📐 โครงสร้างพื้นฐานของไฟล์
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "ชื่อที่แสดงในเมนู",
      "type": "ประเภทของโปรแกรม",
      "request": "วิธีการรัน — launch หรือ attach",
      "program": "เส้นทางไปยังไฟล์ที่จะรัน",
      "args": ["ค่าที่ส่งให้โปรแกรม", "ตัวที่สอง"],
      "cwd": "/โฟลเดอร์/ที่ทำงาน",
      "env": {
        "ตัวแปรสภาพแวดล้อม": "ค่า"
      }
    }
  ]
}
 
 
🔹 คีย์หลักที่ต้องรู้
 
คีย์ ความหมาย ค่าที่เป็นไปได้ 
 name  ชื่อที่แสดงในเมนูดรอปดาวน์ เช่น "▶️ รันเซิร์ฟเวอร์", "🐛 ดีบักโค้ด" 
 type  ประเภทสภาพแวดล้อม  node ,  python ,  cppdbg ,  chrome ,  java  ฯลฯ 
 request  วิธีเริ่มทำงาน  launch  = รันใหม่ตั้งแต่ต้น •  attach  = เข้าไปติดโปรแกรมที่กำลังรันอยู่แล้ว 
 program  ไฟล์หลักที่จะรัน เช่น  "${workspaceFolder}/src/index.js"  
 args  อาร์กิวเมนต์ส่งให้โปรแกรม  ["--port", "3000", "--debug"]  
 cwd  โฟลเดอร์ที่ทำงาน  "${workspaceFolder}"  = รูทโปรเจกต์ 
 env  ตัวแปรสภาพแวดล้อม  {"PORT": "3000", "NODE_ENV": "development"}  
 skipFiles  ข้ามไฟล์ที่ไม่ต้องการเข้าไปดีบัก  ["<node_internals>/**", "node_modules/**"]  
 
 
 
🎯 ตัวอย่างตามภาษา/สภาพแวดล้อมยอดนิยม
 
🟢 Node.js / JavaScript
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "▶️ รันแอปพลิเคชัน",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/index.js",
      "cwd": "${workspaceFolder}",
      "env": {
        "NODE_ENV": "development",
        "PORT": "3000"
      },
      "skipFiles": ["<node_internals>/**", "node_modules/**"]
    },
    {
      "name": "🐛 ดีบักไฟล์ปัจจุบัน",
      "type": "node",
      "request": "launch",
      "program": "${file}",
      "cwd": "${workspaceFolder}"
    }
  ]
}
 
 
🐍 Python
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "▶️ รันแอปพลิเคชัน",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/src/main.py",
      "cwd": "${workspaceFolder}",
      "args": ["--debug"],
      "env": {
        "PYTHONPATH": "${workspaceFolder}",
        "PORT": "8000"
      }
    },
    {
      "name": "🐛 ดีบักไฟล์ปัจจุบัน",
      "type": "python",
      "request": "launch",
      "program": "${file}"
    }
  ]
}
 
 
🌐 เบราว์เซอร์ Chrome (สำหรับเว็บไซต์/Frontend)
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🌐 เปิดใน Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
 
 
⚛️ C / C++
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "▶️ รันโปรแกรม",
      "type": "cppdbg",
      "request": "launch",
      "program": "${workspaceFolder}/build/app.exe",
      "cwd": "${workspaceFolder}",
      "stopAtEntry": false,
      "MIMode": "gdb",
      "miDebuggerPath": "gdb"
    }
  ]
}
 
 
🐳 Attach — เข้าดีบักโปรแกรมที่กำลังรันอยู่แล้ว
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🔌 เข้าดีบักเซิร์ฟเวอร์ที่กำลังรัน",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "address": "localhost",
      "skipFiles": ["<node_internals>/**", "node_modules/**"]
    }
  ]
}
 
 
 
 
🧩 ตัวแปรพิเศษที่ใช้บ่อย
 
ตัวแปร แทนที่ด้วย ใช้ทำอะไร 
 ${workspaceFolder}  โฟลเดอร์รูทของโปรเจกต์ปัจจุบัน อ้างอิงไฟล์ภายในโปรเจกต์ 
 ${file}  ไฟล์ที่กำลังเปิด/แกที่อยู่ รันไฟล์ปัจจุบันโดยไม่ต้องระบุชื่อ 
 ${fileDirname}  โฟลเดอร์ของไฟล์ปัจจุบัน อ้างอิงไฟล์ในโฟลเดอร์เดียวกัน 
 ${env:ชื่อตัวแปร}  ค่าตัวแปรสภาพแวดล้อมของระบบ อ่านค่าจากภายนอก 
 
💡 ข้อดี: ใช้ตัวแปรเหล่านี้แทนพาธแบบตรง เพื่อให้ไฟล์  launch.json  ใช้งานได้บนคอมพิวเตอร์ทุกเครื่อง
 
 
 
🔧 หลายการกำหนดค่าในไฟล์เดียว
 
คุณสามารถมีหลาย  configurations  ในไฟล์เดียว — เลือกจากเมนูดรอปดาวน์ที่ด้านบนแผง Run & Debug ได้เลยครับ:
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    { "name": "🟢 Dev Mode", "type": "node", ... },
    { "name": "🔴 Production", "type": "node", ... },
    { "name": "🧪 Run Tests", "type": "node", ... }
  ]
}
 
 
 
 
⚠️ ปัญหาที่พบบ่อย & วิธีแก้
 
อาการ สาเหตุที่เป็นไปได้ วิธีแก้ 
ไม่มีตัวเลือกประเภทที่ต้องการ ยังไม่ได้ติดตั้งส่วนขยายภาษานั้นๆ ติดตั้งส่วนขยาย เช่น Python Extension, Node.js Support 
รันแล้วบอกว่าไม่พบไฟล์ พาธผิด หรือ  cwd  ไม่ถูกต้อง ใช้  ${workspaceFolder}  แทนพาธตรวจสอบชื่อไฟล์ 
ตัวแปรสภาพแวดล้อมไม่ขึ้น ใส่ผิดที่ — ต้องอยู่ใน  "env"  ภายใน config ย้าย  env  มาไว้ในออบเจกต์ configuration นั้นๆ 
ดีบักไม่หยุดที่จุดพัก เปิดไฟล์ผิด หรือ source map ผิด ตรวจสอบ  webRoot  หรือ  sourceMap  ให้ถูกต้อง 
มองไม่เห็นโฟลเดอร์  .vscode  ถูกซ่อนไว้ตามค่าเริ่มต้น ตั้งค่าให้แสดงไฟล์ที่ซ่อนอยู่ในระบบปฏิบัติการ 
 
 
 
✅ เช็คลิสต์กดรัน
 
เลือก ประเภท  type  ให้ตรงกับภาษาที่ใช้
ระบุ  program  หรือ  url  ถูกต้อง
ใช้  ${workspaceFolder}  แทนพาธตรง
ตั้งค่า  cwd  ถูกต้องตามโครงสร้างโปรเจกต์
เพิ่ม  skipFiles  เพื่อข้ามโค้ดภายนอก
เลือกชื่อการกำหนดค่าจากเมนูดรอปดาวน์กด ▶️
 
 
 
ต้องการตัวอย่างสำหรับภาษาหรือเฟรมเวิร์กใดเป็นพิเศษไหมครับ เช่น React, Vue, Express, Django, Go 😊⚙️ คู่มือ: วิธีตั้งค่า  launch.json  — เพิ่มเติม 5 เฟรมเวิร์ก
 
 
 
⚛️ React (Vite / Create React App)
 
🟢 Vite
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "⚛️ React (Vite) — เปิดใน Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*",
        "virtual:@vite/*": "${webRoot}/*"
      }
    }
  ]
}
 
 
🟡 Create React App
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "⚛️ React (CRA) — เปิดใน Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true
    }
  ]
}
 
 
💡 ใช้งาน: รัน  npm run dev  หรือ  npm start  ในเทอร์มินัลก่อน แล้วกด ▶️ ที่แผง Run & Debug เพื่อเปิดเบราว์เซอร์และดีบัก
 
 
 
💚 Vue (Vite / Vue CLI)
 
🟢 Vite
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "💚 Vue (Vite) — เปิดใน Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///./src/*": "${webRoot}/*"
      }
    }
  ]
}
 
 
🟡 Vue CLI
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "💚 Vue (Vue CLI) — เปิดใน Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
 
 
💡 เคล็ดลับ: ติดตั้งส่วนขยาย Vue - VS Code Extension เพื่อให้จุดพักทำงานกับไฟล์  .vue  ได้ถูกต้อง
 
 
 
🚀 Express (Node.js Backend)
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🚀 Express Server",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/index.js",
      "cwd": "${workspaceFolder}",
      "args": [],
      "env": {
        "NODE_ENV": "development",
        "PORT": "3000",
        "MONGODB_URI": "mongodb://localhost:27017/myapp"
      },
      "skipFiles": ["<node_internals>/**", "node_modules/**"]
    },
    {
      "name": "🚀 Express — Attach",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "restart": true,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
 
 
💡 โหมด Attach: รันเซิร์ฟเวอร์ด้วย  node --inspect index.js  แล้วใช้ config "Attach" เพื่อเข้ามาดีบักโดยไม่ต้องรีสตาร์ทเซิร์ฟเวอร์
 
 
 
🐍 Django (Python Backend)
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🐍 Django: Run Server",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/manage.py",
      "args": ["runserver", "0.0.0.0:8000", "--noreload"],
      "cwd": "${workspaceFolder}",
      "env": {
        "DJANGO_SETTINGS_MODULE": "myproject.settings",
        "PYTHONPATH": "${workspaceFolder}"
      },
      "django": true,
      "justMyCode": true
    },
    {
      "name": "🐍 Django: Shell",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/manage.py",
      "args": ["shell"],
      "cwd": "${workspaceFolder}",
      "env": {
        "PYTHONPATH": "${workspaceFolder}"
      }
    },
    {
      "name": "🐍 Django: Migrate",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/manage.py",
      "args": ["migrate"],
      "cwd": "${workspaceFolder}"
    }
  ]
}
 
 
💡 สำคัญ: ใช้  --noreload  ใน  args  เพื่อให้จุดพักทำงานได้ถูกต้อง (ถ้าไม่ใช้จะมีเซิร์ฟเวอร์ทำงาน 2 กระบวนการ)
 
⚠️ ต้องติดตั้ง Python Debugger extension ของ Microsoft ก่อนใช้งาน
 
 
 
🐹 Go
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🐹 Go: Run",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/server/main.go",
      "cwd": "${workspaceFolder}",
      "env": {
        "PORT": "8080",
        "GO_ENV": "development"
      },
      "args": [],
      "showLog": true
    },
    {
      "name": "🐹 Go: Run Current File",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${fileDirname}",
      "cwd": "${fileDirname}"
    },
    {
      "name": "🐹 Go: Test Current Package",
      "type": "go",
      "request": "launch",
      "mode": "test",
      "program": "${fileDirname}",
      "showLog": true
    }
  ]
}
 
 
💡 ติดตั้งก่อน: ต้องติดตั้งส่วนขยาย Go by Go Team at Google — VS Code จะแจ้งให้ติดตั้งเครื่องมือเพิ่มเติมเมื่อเปิดโปรเจกต์ Go ครั้งแรก
 
 
 
📋 สรุปเปรียบเทียบ
 
เฟรมเวิร์ก ประเภท  type  พอร์ตเริ่มต้น ไฟล์หลักที่รัน 
⚛️ React  chrome  5173 / 3000 เบราว์เซอร์ (URL) 
💚 Vue  chrome  5173 / 8080 เบราว์เซอร์ (URL) 
🚀 Express  node  3000  src/index.js  
🐍 Django  python  8000  manage.py runserver  
🐹 Go  go  8080  cmd/main.go  หรือโฟลเดอร์ 
 
 
 
ต้องการเพิ่มเฟรมเวิร์กอื่นๆ อีกไหมครับ เช่น Next.js, Nuxt.js, FastAPI, NestJS, Gin 😊🐹 Go — ตัวอย่าง  launch.json  แบบครบถ้วน
 
 
 
✅ แบบที่ 1 — โปรเจกต์มาตรฐาน (มี  cmd/main.go )
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🐹 Go: Run Server (:8080)",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/main.go",
      "cwd": "${workspaceFolder}",
      "env": {
        "PORT": "8080",
        "GO_ENV": "development"
      },
      "args": [],
      "showLog": true
    }
  ]
}
 
 
 
 
✅ แบบที่ 2 — รันทั้งโฟลเดอร์ (เมื่อมีหลายไฟล์)
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🐹 Go: Run Folder (:8080)",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/",
      "cwd": "${workspaceFolder}",
      "env": {
        "PORT": "8080",
        "GO_ENV": "development"
      },
      "args": [],
      "showLog": true
    }
  ]
}
 
 
 
 
✅ แบบรวม — มีครบทุกแบบในไฟล์เดียว
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🐹 Go: Run main.go (:8080)",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/main.go",
      "cwd": "${workspaceFolder}",
      "env": {
        "PORT": "8080",
        "GO_ENV": "development"
      },
      "args": [],
      "showLog": true
    },
    {
      "name": "🐹 Go: Run Folder (:8080)",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/",
      "cwd": "${workspaceFolder}",
      "env": {
        "PORT": "8080",
        "GO_ENV": "development"
      },
      "args": [],
      "showLog": true
    },
    {
      "name": "🐹 Go: Run Current File",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${fileDirname}",
      "cwd": "${fileDirname}",
      "showLog": true
    }
  ]
}
 
 
 
 
📌 คำอธิบายคีย์สำคัญ
 
คีย์ ค่าที่ใช้ ความหมาย 
 type   "go"  บอกว่าเป็นโปรเจกต์ภาษา Go 
 request   "launch"  รันโปรแกรมใหม่ตั้งแต่ต้น 
 mode   "debug"  โหมดดีบัก — สามารถตั้งจุดพักได้ 
 program   ${workspaceFolder}/cmd/main.go  พาธไปยังไฟล์หรือโฟลเดอร์ที่มี  package main  
 cwd   ${workspaceFolder}  โฟลเดอร์รูทโปรเจกต์ 
 env.PORT   "8080"  พอร์ตเซิร์ฟเวอร์ตามที่ต้องการ 
 
 
 
⚠️ ข้อควรรู้ก่อนใช้งาน
 
- ✅ ติดตั้งส่วนขยาย: ต้องติดตั้ง Go by Go Team จาก VS Code Marketplace ก่อน
- ✅ โครงสร้างแนะนำ:
plaintext
  
your-project/
├── .vscode/
│   └── launch.json   ↬ วางไฟล์นี้ที่นี่
├── cmd/
│   └── main.go       ↬ จุดเริ่มต้นโปรแกรม
├── go.mod
└── go.sum
 
- ✅ เลือกชื่อจากเมนูดรอปดาวน์ → กด ▶️ เพื่อเริ่มรันที่พอร์ต 8080
 
ต้องการปรับพอร์ต หรือเพิ่มค่า  env  อื่นๆ ไหมครับ 😊🐹 Go — ตัวอย่าง launch.json ฉบับสมบูรณ์
 
 
 
📐 โครงสร้างไฟล์
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🐹 Go: Run Server",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/server/main.go",
      "cwd": "${workspaceFolder}",
      "env": {
        "PORT": "8080",
        "GO_ENV": "development"
      },
      "args": [],
      "showLog": true
    },
    {
      "name": "🐹 Go: Run Folder",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/server/",
      "cwd": "${workspaceFolder}",
      "env": {
        "PORT": "8080",
        "GO_ENV": "development"
      },
      "showLog": true
    },
    {
      "name": "🐹 Go: Run Current File",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${fileDirname}",
      "cwd": "${fileDirname}",
      "showLog": true
    }
  ]
}
 
 
 
 
🔹 คีย์หลักที่ใช้สำหรับ Go
 
คีย์ ค่าตัวอย่าง ความหมาย 
 type   "go"  บอกว่าเป็นโปรเจกต์ภาษา Go 
 request   "launch"  รันโปรแกรมใหม่ตั้งแต่ต้น 
 mode   "debug"  โหมดดีบัก • อีกค่าคือ  "executable"  สำหรับรันไฟล์ .jar ที่คอมไพล์แล้ว 
 program   ${workspaceFolder}/cmd/server/main.go  จุดเริ่มต้น — ระบุไฟล์  .go  หรือโฟลเดอร์ที่มี  package main  
 cwd   ${workspaceFolder}  โฟลเดอร์รูทโปรเจกต์ 
 env   {"PORT": "8080"}  ตัวแปรสภาพแวดล้อม 
 showLog   true  แสดงผลลัพธ์กระบวนการดีบักในคอนโซล 
 
 
 
📂 โครงสร้างโปรเจกต์ที่แนะนำ
 
plaintext
  
your-project/
├── .vscode/
│   └── launch.json     ← วางไฟล์นี้ที่นี่
├── cmd/
│   └── server/
│       └── main.go     ← จุดเริ่มต้นโปรแกรม
├── internal/
├── go.mod
└── go.sum
 
 
 
 
✅ ขั้นตอนใช้งาน
 
1. ติดตั้งส่วนขยาย: ติดตั้ง Go by Go Team at Google ใน VS Code
2. เปิดโปรเจกต์: เปิดโฟลเดอร์รูท (ที่มี  go.mod ) ใน VS Code
3. เลือกการกำหนดค่า: ที่แผง Run & Debug เลือกเมนูดรอปดาวน์ เช่น "🐹 Go: Run Server"
4. กดรัน: กด ▶️ หรือ F5 เพื่อเริ่มดีบัก
 
💡 เคล็ดลับ: ถ้าใช้  program: "${fileDirname}"  จะรันโฟลเดอร์ที่ไฟล์ปัจจุบันอยู่ — เหมาะเมื่อเปิดไฟล์  main.go  แล้วกดรันได้ทันที ไม่ต้องเปลี่ยน config
 
ต้องการปรับแต่งอะไรเพิ่มไหมครับ เช่น เพิ่ม arguments, environment variables, หรือโหมด attach 😊🐹 Go — launch.json ฉบับสมบูรณ์ (เพิ่มเติม)
 
 
 
📐 ไฟล์เต็ม  .vscode/launch.json 
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🐹 Go: Run Server",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/server/",
      "cwd": "${workspaceFolder}",
      "args": ["--config=config/dev.yaml", "--port=8080", "--debug"],
      "env": {
        "PORT": "8080",
        "GO_ENV": "development",
        "DB_HOST": "localhost",
        "DB_PORT": "5432",
        "DB_NAME": "mydb",
        "API_KEY": "dev-key-only"
      },
      "showLog": true
    },
    {
      "name": "🐹 Go: Run Current File",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${fileDirname}",
      "cwd": "${fileDirname}",
      "args": [],
      "env": {
        "GO_ENV": "development"
      },
      "showLog": true
    },
    {
      "name": "🔌 Go: Attach (เข้าดีบักกระบวนการที่รันอยู่)",
      "type": "go",
      "request": "attach",
      "mode": "remote",
      "remotePath": "${workspaceFolder}",
      "host": "127.0.0.1",
      "port": "40000",
      "showLog": true
    }
  ]
}
 
 
 
 
🔹 Arguments — ส่งค่าทางบรรทัดคำสั่ง
 
ใช้ฟิลด์  args  เป็น Array ของสตริง:
 
json
  
"args": [
  "--config=config/prod.yaml",
  "--port=8080",
  "--log-level=info",
  "--enable-cors",
  "extra-argument-here"
]
 
 
💡 เทียบเท่ากับรันในเทอร์มินัล:
 go run ./cmd/server --config=config/dev.yaml --port=8080 --debug 
 
 
 
🔹 Environment Variables — ตัวแปรสภาพแวดล้อม
 
ใช้ฟิลด์  env  เป็นออบเจกต์:
 
json
  
"env": {
  "PORT": "8080",
  "GO_ENV": "development",
  "DB_HOST": "localhost",
  "DB_PORT": "5432",
  "DB_USER": "postgres",
  "DB_PASSWORD": "secret",
  "REDIS_ADDR": "localhost:6379",
  "JWT_SECRET": "your-secret-key-here",
  "API_TIMEOUT": "30s"
}
 
 
🔒 ความปลอดภัย: ไม่ควรคอมมิตค่า Secret จริงลง Git! ใช้ไฟล์  .env  แทน:
 
json
  
"envFile": "${workspaceFolder}/.env"
 
 
แล้วเพิ่ม  .env  ใน  .gitignore 
 
 
 
🔌 โหมด Attach — เข้าดีบักโปรแกรมที่กำลังรันอยู่
 
ใช้เมื่อคุณรันโปรแกรมด้วยตัวเองอยู่แล้ว และต้องการให้ VS Code "เข้ามาติด" เพื่อดีบัก:
 
ขั้นตอนใช้งาน:
 
1. รันโปรแกรมด้วย Delve ในเทอร์มินัล:
 
bash
  
dlv debug --headless --listen=:40000 --api-version=2 --accept-multiclient ./cmd/server
 
 
หรือ build แล้วรัน:
 
bash
  
go build -o ./bin/server ./cmd/server
dlv exec --headless --listen=:40000 --api-version=2 ./bin/server
 
 
2. ใน VS Code เลือก config "🔌 Go: Attach" แล้วกด F5
 
คีย์สำคัญของ Attach:
 
คีย์ ค่า ความหมาย 
 "request"   "attach"  บอกว่าไม่รันใหม่ แต่เข้าไปติด 
 "mode"   "remote"  เชื่อมต่อไปยัง Delve ที่รันอยู่แล้ว 
 "host"   "127.0.0.1"  ที่อยู่ของเครื่องที่รันโปรแกรม 
 "port"   40000  พอร์ตที่ Delve เปิดรับการเชื่อมต่อ 
 "remotePath"   "${workspaceFolder}"  พาธบนเครื่องรีโมท (ถ้ามี) 
 
 
 
📌 คุณสมบัติเพิ่มเติมที่มีประโยชน์
 
json
  
{
  "name": "🐹 Go: Full Options",
  "type": "go",
  "request": "launch",
  "mode": "debug",
  "program": "${workspaceFolder}/cmd/server/",
  "cwd": "${workspaceFolder}",
  "args": ["--debug"],
  "envFile": "${workspaceFolder}/.env",
  "env": {},
  "showLog": true,
  "trace": "verbose",
  "stopOnEntry": false,
  "substitutePath": [
    { "from": "${workspaceFolder}", "to": "/app" }
  ]
}
 
 
คีย์ หน้าที่ 
 envFile  โหลดตัวแปรจากไฟล์  .env  แทนเขียนตรงๆ — ปลอดภัยกว่า 
 stopOnEntry  หยุดที่บรรทัดแรกของ  main()  ทันทีที่รัน — เหมาะสำหรับดีบักตั้งแต่ต้น 
 trace  แสดงรายละเอียดการทำงานของตัวดีบักเกอร์ — ช่วยตอนแก้ปัญหา 
 substitutePath  แปลงพาธไฟล์ — ใช้เมื่อดีบักในคอนเทนเนอร์/เครื่องรีโมท 
 
 
 
ต้องการเพิ่มอะไรอีกไหมครับ เช่น รันทดสอบ, build flags, หรือ remote debugging บนคอนเทนเนอร์ 😊🐹 Go — ตั้งค่ารันทดสอบใน  launch.json 
 
 
 
📐 ไฟล์เต็ม เพิ่มส่วนการทดสอบ
 
json
  
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "🐹 Go: Run Server",
      "type": "go",
      "request": "launch",
      "mode": "debug",
      "program": "${workspaceFolder}/cmd/server/",
      "cwd": "${workspaceFolder}",
      "args": ["--config=config/dev.yaml", "--port=8080"],
      "envFile": "${workspaceFolder}/.env",
      "showLog": true
    },

    {
      "name": "🧪 ทดสอบ: ทั้งหมด",
      "type": "go",
      "request": "launch",
      "mode": "test",
      "program": "${workspaceFolder}",
      "cwd": "${workspaceFolder}",
      "env": { "GO_ENV": "test" },
      "showLog": true
    },
    {
      "name": "🧪 ทดสอบ: โฟลเดอร์ปัจจุบัน",
      "type": "go",
      "request": "launch",
      "mode": "test",
      "program": "${fileDirname}",
      "cwd": "${fileDirname}",
      "env": { "GO_ENV": "test" },
      "showLog": true
    },
    {
      "name": "🧪 ทดสอบ: ไฟล์ปัจจุบัน",
      "type": "go",
      "request": "launch",
      "mode": "test",
      "program": "${fileDirname}",
      "cwd": "${fileDirname}",
      "args": ["-run", "^Test${fileBasenameNoExtension}$"],
      "env": { "GO_ENV": "test" },
      "showLog": true
    },
    {
      "name": "🧪 ทดสอบ: ฟังก์ชันเฉพาะ",
      "type": "go",
      "request": "launch",
      "mode": "test",
      "program": "${workspaceFolder}/path/to/package/",
      "cwd": "${workspaceFolder}",
      "args": ["-run", "ชื่อฟังก์ชันทดสอบ"],
      "env": { "GO_ENV": "test" },
      "showLog": true
    },
    {
      "name": "🧪 ทดสอบ: ด้วย Coverage",
      "type": "go",
      "request": "launch",
      "mode": "test",
      "program": "${workspaceFolder}",
      "cwd": "${workspaceFolder}",
      "args": ["-cover", "-coverprofile=coverage.out"],
      "env": { "GO_ENV": "test" },
      "showLog": true
    }
  ]
}
 
 
 
 
🔹 คีย์สำคัญสำหรับโหมดทดสอบ
 
คีย์ ค่า ความหมาย 
 mode   "test"  บอกว่านี่คือโหมดทดสอบ — ไม่รันโปรแกรมปกติ แต่รัน  go test  แทน 
 program  พาธไปยังแพ็กเกจ  .  หรือพาธแพ็กเกจที่จะรันทดสอบ เช่น  ./internal/service/  
 args  พารามิเตอร์ส่งให้  go test   -v  = แสดงรายละเอียด,  -run  = กรองชื่อฟังก์ชัน,  -cover  = คำนวณความคุ้มครองโค้ด 
 
 
 
🧪 ตัวเลือก Arguments ที่ใช้บ่อย
 
อาร์กิวเมนต์ ตัวอย่าง หน้าที่ 
 -v   ["-v"]  แสดงผลละเอียดทุกการทดสอบ 
 -run "ชื่อ"   ["-run", "^TestUserService$"]  รันเฉพาะฟังก์ชันที่ตรงกับชื่อ/รีเจ็กซ์ 
 -short   ["-short"]  ข้ามการทดสอบที่ใช้เวลานาน 
 -count=N   ["-count=3"]  รันซ้ำ N ครั้ง เพื่อตรวจสอบความสม่ำเสมอ 
 -timeout=X   ["-timeout=30s"]  หยุดถ้าทดสอบใช้เวลาเกินกำหนด 
 -cover   ["-cover"]  แสดงเปอร์เซ็นต์ความคุ้มครองโค้ด 
 -coverprofile=ไฟล์   ["-coverprofile=coverage.out"]  บันทึกผลความคุ้มครองลงไฟล์ 
 
 
 
✅ วิธีใช้งาน
 
1. เปิดแผง Run & Debug ( Ctrl/Cmd + Shift + D )
2. เลือกจากเมนูดรอปดาวน์ เช่น "🧪 ทดสอบ: ทั้งหมด"
3. กด ▶️ หรือ F5 เพื่อเริ่ม
4. ดูผลลัพธ์ที่แผง Debug Console ด้านล่าง
 
💡 เคล็ดลับ: เปิดไฟล์ทดสอบก่อน แล้วเลือก "🧪 ทดสอบ: ไฟล์ปัจจุบัน" จะรันเฉพาะไฟล์ที่เปิดอยู่โดยอัตโนมัติ
 
 
 
ต้องการเพิ่มอะไรอีกไหมครับ เช่น รันด้วย Build Flags, ดีบักขณะทดสอบ, หรือรันทดสอบแบบขนาน 😊