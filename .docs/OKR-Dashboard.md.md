🎯 OKR — Obsidian Note Template Pack
 
Ready-to-use with Frontmatter + Dataview support! Just copy → paste into a new note → fill in ✨
 
 
 
📄 Template 1: Standard OKR — Full Version
 
Save as:  Templates/OKR-Standard.md 
 
markdown
  
---
title: "OKR — <% tp.file.title %>"
type: okr
period: 
start_date: <% tp.date.now("YYYY-MM-DD") %>
end_date: 
owner: 
team: 
status: active
tags: [okr, goal]
---

# 🎯 <% tp.file.title %>

> **Period:** `=this.period` | **Owner:** `=this.owner` | **Team:** `=this.team`
> **Status:** `=this.status` | **Dates:** `=this.start_date` → `=this.end_date`

---

## 🎯 Objective 1: 

> *Short, inspiring goal — what you want to achieve*

| # | ✅ Key Result | Baseline | Target | Current | % | Status |
|---|--------------|----------|--------|---------|---|--------|
| 1 |  |  |  |  |  | ⚪ |
| 2 |  |  |  |  |  | ⚪ |
| 3 |  |  |  |  |  | ⚪ |
| 4 |  |  |  |  |  | ⚪ |

**🚀 Initiatives / Actions:**
- [ ] 
- [ ] 
- [ ] 

---

## 🎯 Objective 2: 

| # | ✅ Key Result | Baseline | Target | Current | % | Status |
|---|--------------|----------|--------|---------|---|--------|
| 1 |  |  |  |  |  | ⚪ |
| 2 |  |  |  |  |  | ⚪ |
| 3 |  |  |  |  |  | ⚪ |

**🚀 Initiatives / Actions:**
- [ ] 
- [ ] 

---

## 📅 Check-ins

| Date | Overall Status | Notes / Blockers | Next Steps |
|------|----------------|------------------|------------|
| W1 | ⚪ |  |  |
| W2 | ⚪ |  |  |
| W3 | ⚪ |  |  |
| W4 | ⚪ |  |  |

---

## ✅ Review — End of Period

**Overall Score:** __ / 10

**✅ What went well:**
- 

**⚠️ What could be improved:**
- 

**📌 Lessons for next time:**
- 

---

### 📊 Quick Summary
| Objective | KRs Complete | Avg Progress | Status |
|-----------|-------------|--------------|--------|
| Obj 1 | — / 4 | — % | ⚪ |
| Obj 2 | — / 3 | — % | ⚪ |
| **Total** | — / 7 | — % | ⚪ |

---

> 🟢 On Track (70–100%) · 🟡 At Risk (40–69%) · 🔴 Off Track (0–39%) · ⚪ Not Started
 
 
 
 
📄 Template 2: Personal OKR — Compact Monthly
 
Save as:  Templates/OKR-Monthly-Personal.md 
 
markdown
  
---
title: "OKR — <% tp.date.now("YYYY-MM") %>"
type: okr
period: <% tp.date.now("YYYY-MM") %>
start_date: <% tp.date.now("YYYY-MM-01") %>
end_date: <% tp.date.now("YYYY-MM-t", "2026-10-31") %>
owner: 
status: active
tags: [okr, monthly, personal]
---

# 🗓️ OKR — `=this.period`

---

## 🎯 Objective: 

| # | Key Result | Target | Current | % | Status |
|---|-----------|--------|---------|---|--------|
| 1 |  |  |  |  | ⚪ |
| 2 |  |  |  |  | ⚪ |
| 3 |  |  |  |  | ⚪ |

### 🚀 Actions
- [ ] Due: ______
- [ ] Due: ______
- [ ] Due: ______

### 📈 Weekly Check-ins
| Week | Status | Notes |
|------|--------|-------|
| W1 | ⚪ |  |
| W2 | ⚪ |  |
| W3 | ⚪ |  |
| W4 | ⚪ |  |

### ✅ End of Month
**Result:** ______% achieved
**Reflection:** ________________________________________
 
 
 
 
📄 Template 3: Team Quarterly OKR
 
Save as:  Templates/OKR-Team-Quarterly.md 
 
markdown
  
---
title: "OKR — Q<% tp.system.prompt("Quarter (1-4)") %> <% tp.system.prompt("Year") %>"
type: okr
period: Q<% tp.system.prompt("Quarter (1-4)") %> <% tp.system.prompt("Year") %>
start_date: 
end_date: 
team: 
lead: 
status: planning
tags: [okr, quarterly, team]
---

# 🏢 Team OKR — `=this.period`
> **Team:** `=this.team` | **Lead:** `=this.lead`

---

## 🎯 Objective 1: 

| KR | Description | Baseline | Target | Owner | Status |
|----|-------------|----------|--------|-------|--------|
| 1 |  |  |  |  | ⚪ |
| 2 |  |  |  |  | ⚪ |
| 3 |  |  |  |  | ⚪ |

---

## 🎯 Objective 2: 

| KR | Description | Baseline | Target | Owner | Status |
|----|-------------|----------|--------|-------|--------|
| 1 |  |  |  |  | ⚪ |
| 2 |  |  |  |  | ⚪ |
| 3 |  |  |  |  | ⚪ |

---

## 🎯 Objective 3: 

| KR | Description | Baseline | Target | Owner | Status |
|----|-------------|----------|--------|-------|--------|
| 1 |  |  |  |  | ⚪ |
| 2 |  |  |  |  | ⚪ |

---

### ⚠️ Risks & Dependencies
| Risk/Dependency | Impact | Owner | Status |
|-----------------|--------|-------|--------|
|  |  |  | ⚪ |

### 📅 Review Schedule
- **Mid-quarter review:** __________
- **Final review:** __________
 
 
 
 
📊 Bonus: Dataview Query — OKR Dashboard
 
Create a note named  OKR-Dashboard.md  and paste this in to see ALL your OKRs in one view:
 
dataview
  
TABLE period, owner, team, status, end_date as "Ends"
WHERE type = "okr"
SORT end_date ASC
 
 
Show only active OKRs:
 
dataview
  
TABLE period, owner, team, end_date as "Ends"
WHERE type = "okr" AND status = "active"
SORT end_date ASC
 
 
Show by tag/team:
 
dataview
  
TABLE period, owner, status, end_date as "Ends"
WHERE type = "okr" AND contains(tags, "quarterly")
SORT end_date DESC
 
 
 
 
✅ How to Use These Templates
 
Step-by-Step Setup
 
1. Create a folder:  Templates/  in your vault
2. Enable plugin: Settings → Core Plugins → Turn on Templates
3. Set folder: Settings → Templates → Template folder location → Select  Templates/ 
4. Create new OKR note: New Note → Name it → Click Template icon → Pick your OKR template → Fill in ✨
 
💡 If using Templater plugin
 
- Save files to your templates folder
- When creating a new note: Command palette → Templater: Insert template
- Dynamic fields like  <% tp.file.title %>  will auto-fill
 
 
 
📌 File Naming Convention
 
plaintext
  
OKR-2026-Q4-Team-Name.md
OKR-2026-10-Personal.md
OKR-Project-Launch.md
 
 
 
 
💡 Pro Tip: Keep your OKR notes linked from your [[Home-MOC]] or a dedicated [[Goals]] note so they're easy to find and track throughout the period! 🎯
 
Would you like a Quarterly OKR Calendar & Review Schedule template to go with these? 😊