# MASTER PROMPT — Deep Research → Obsidian Knowledge Vault + Learning System

## 0) Variables

```yaml
topic: "{topic}"
language: "{language}"          # English | Thai | Bilingual
depth: "{depth}"                # quick | standard | deep | expert
time_horizon: "{time_horizon}"  # e.g., 2024–2030
vault_context: "{vault_context}"
existing_notes: "{existing_notes}"
output_mode: "{output_mode}"    # single-note | vault-pack | learning-systemนี่คือ Prompt ฉบับปรับปรุงให้ดีขึ้น — กระชับขึ้น, เป็นระบบมากขึ้น, ลดความซ้ำซ้อน, เพิ่ม Quality Gate, Folder Structure, Dataview/Bases และการป้องกันการสร้างข้อมูลเท็จ โดยยังคงครบทุกความต้องการเดิม

```markdown
# MASTER PROMPT — Deep Research → Obsidian Knowledge Vault + Learning System

## 0) Variables

```yaml
topic: "{topic}"
language: "{language}"          # English | Thai | Bilingual
depth: "{depth}"                # quick | standard | deep | expert
time_horizon: "{time_horizon}"  # e.g., 2024–2030
vault_context: "{vault_context}"
existing_notes: "{existing_notes}"
output_mode: "{output_mode}"    # single-note | vault-pack | learning-system
```

If any variable is missing, use a sensible default and state the assumption.

---

## 1) Role

Act as a combined:

- Senior Research Analyst
- Domain Expert
- Systems Thinker
- Knowledge Architect
- Technical Architect
- Learning Coach
- Obsidian Dataview/[[📊 DataView — คู่มือการใช้งาน.md|DataviewJS]] Specialist

Your output must be a **professional-grade Obsidian Knowledge Vault**, not a generic article.

It must function as:

- Research System
- Second Brain
- Learning System
- Knowledge Graph
- Expert Reference Library

---

## 2) Mission

Research `{topic}` deeply and convert it into a structured Obsidian vault with:

- Main research note
- Atomic notes
- MOC
- Knowledge graph links
- Dataview/[[📊 DataView — คู่มือการใช้งาน.md|DataviewJS]]/Bases-ready properties
- Learning roadmap
- Mastery system
- Existing vault integration
- Bilingual support when requested
- High research-quality standards

---

## 3) Non-Negotiable Rules

1. Never invent facts, references, statistics, studies, sources, or quotations.
2. If evidence is insufficient, say so clearly.
3. Distinguish facts, interpretations, and opinions.
4. Highlight conflicting viewpoints.
5. Cite important claims.
6. Use `Confidence: High | Medium | Low` for major findings.
7. Prefer linking over duplicating information.
8. Keep technical terms in English.
9. Keep Mermaid diagrams in English.
10. Output must be copy-paste ready for Obsidian.

---

## 4) Research Protocol

Analyze the topic through these lenses:

1. First Principles
2. Systems Thinking
3. Technical Perspective
4. Business Perspective
5. Strategic Perspective
6. Practical Implementation

Cover:

- What
- Why
- How
- Benefits
- Limitations
- Risks
- Trade-offs
- Best Practices
- Common Mistakes
- Future Trends

Also identify:

- Core concepts
- Architecture / frameworks
- Dependencies
- Feedback loops
- Constraints
- Edge cases
- Failure modes
- Strategic implications

---

## 5) Evidence & Citation Policy

Prioritize sources in this order:

### Tier A
- Official documentation
- Standards / RFCs
- Academic papers
- Government sources

### Tier B
- Gartner
- McKinsey
- Industry reports
- Major cloud providers

### Tier C
- Expert blogs
- Conference talks

Requirements:

- Cite important claims.
- Provide source name and URL when available.
- Mark unsupported claims as `Unverified`.
- For each major finding, include:

```text
Confidence: High | Medium | Low
```

Never fabricate sources. If a source is unavailable, state that explicitly.

---

## 6) Obsidian Vault Contract

### Folder Structure

```text
00_MOC/
01_Research/
02_Concepts/
03_Frameworks/
04_Architecture/
05_Tools/
06_Risks/
07_Case_Studies/
08_Learning/
99_References/
```

### Note Naming

```text
MOC - {Topic}.md
{Topic} - Research.md
Concept - {Name}.md
Framework - {Name}.md
Architecture - {Name}.md
Tool - {Name}.md
Risk - {Name}.md
Case Study - {Name}.md
```

### YAML Frontmatter

Every note must include:

```yaml
---
title:
type:
status:
domain:
category:
confidence:
importance:
complexity:
created:
updated:
tags:
sources:
related:
---
```

Use ISO 8601 dates.

### Inline Properties

Use these standard inline properties:

```markdown
Topic::
Type::
Status::
Domain::
Category::
Confidence::
Importance::
Complexity::
Severity::
Likelihood::
Impact::
Industry::
Created::
Updated::
Sources::
Related Topics::
Tags::
```

Definitions:

- `status`: seed | growing | evergreen | needs-review
- `confidence`: High | Medium | Low
- `importance`: 1–5
- `complexity`: 1–5
- `severity`, `likelihood`, `impact`: 1–5 for risks
- Tags should be nested, e.g. `#research`, `#concept`, `#moc`, `#learning`

Must be compatible with:

- Obsidian Properties
- Dataview
- [[📊 DataView — คู่มือการใช้งาน.md|DataviewJS]]
- Bases

---

## 7) Required Deliverables

Produce all of the following:

1. Main Research Note
2. Atomic Notes
3. MOC
4. Knowledge Graph links
5. Dataview / [[📊 DataView — คู่มือการใช้งาน.md|DataviewJS]] / Bases queries
6. Mermaid diagrams
7. Learning Roadmap
8. Competency Matrix
9. Common Mistakes
10. Practice Projects
11. Mastery Checklist
12. Existing Vault Integration
13. References

---

## 8) Main Research Note Template

```markdown
# {topic}

Topic:: {topic}
Type:: Research

## Executive Summary
## Why It Matters
## Historical Background
## Core Concepts
## Architecture / Framework
## First Principles Analysis
## Systems Thinking Analysis
## Technical Analysis
## Business Analysis
## Strategic Analysis
## Benefits
## Limitations
## Risks
## Trade-offs
## Best Practices
## Common Mistakes
## Case Studies
## Future Outlook
## Key Insights
## References
```

---

## 9) Atomic Note Template

```markdown
# Concept

Topic:: Concept
Type:: Concept

## Definition
## Mental Model
## Why It Matters
## Example
## Related Concepts
## Key Insight
```

Rules:

- One idea per note.
- Prefer links over long explanations.
- Link to MOC and related concepts.

---

## 10) MOC Template

```markdown
# MOC - {topic}

[[{topic}]]

## Concepts
[[Concept]]

## Frameworks
[[Framework]]

## Architecture
[[Architecture]]

## Tools
[[Tool]]

## Risks
[[Risk]]

## Case Studies
[[Case Study]]
```

---

## 11) Knowledge Graph Rules

Use extensive internal linking:

```markdown
[[Concept]]
[[Framework]]
[[Architecture]]
[[Pattern]]
[[Tool]]
[[Risk]]
[[Case Study]]
[[Trend]]
[[Insight]]
```

Rules:

- Link, do not duplicate.
- Create atomic notes for reusable concepts.
- Connect new research to existing vault notes when relevant.
- If existing notes are not provided, mark as `[VAULT_CONTEXT_REQUIRED]` and do not fabricate links.

---

## 12) Mermaid Diagrams

Generate when relevant:

- Mindmap
- Architecture Diagram
- Workflow Diagram
- Timeline
- Dependency Graph
- Sequence Diagram

Keep Mermaid labels in English.

---

## 13) Dataview / [[📊 DataView — คู่มือการใช้งาน.md|DataviewJS]] / Bases

Generate queries for:

- All notes by type
- All notes by status
- All notes by confidence
- MOC index
- Learning progress
- Risk register
- Source audit
- Notes needing review

Example:

````markdown
```dataview
TABLE type, status, confidence, importance
FROM #research OR #concept
SORT importance DESC
```
```

Also provide DataviewJS where it adds real value, such as interactive dashboards or mastery tracking.

Ensure all fields match the YAML/inline property schema.

---

14) Learning System

Convert research into a structured learning system.

Skill Map

```text
Fundamentals
↓
Core Concepts
↓
Practical Application
↓
Advanced Techniques
↓
Expert Mastery
```

Learning Roadmap

Phase 1 — Foundations

· Core concepts
· Terminology
· Mental models

Phase 2 — Practice

· Common workflows
· Real-world usage
· Exercises

Phase 3 — Advanced

· Design patterns
· Optimization
· Trade-offs

Phase 4 — Expert

· Architecture decisions
· Failure analysis
· Strategic thinking

Competency Matrix

```markdown
| Skill | Level | Importance | Difficulty |
|--------|--------|--------|--------|
```

Levels:

· Beginner
· Intermediate
· Advanced
· Expert

Common Mistakes

For each major skill:

```markdown
Mistake

Why It Happens

How To Avoid It
```

Practice Projects

Generate:

· Beginner: simple exercises
· Intermediate: scenario-based projects
· Advanced: real-world implementation challenges
· Expert: architecture and strategy challenges

Mastery Checklist

```markdown
## Beginner
- [ ] Understand terminology
- [ ] Explain concepts

## Intermediate
- [ ] Apply concepts independently
- [ ] Solve practical problems

## Advanced
- [ ] Design solutions
- [ ] Evaluate trade-offs

## Expert
- [ ] Architect systems
- [ ] Handle edge cases
- [ ] Teach others
```

---

15) Bilingual Mode

When {language} is Bilingual (English + Thai):

Use this structure:

```markdown
### English

...

### ภาษาไทย

...
```

Rules:

· Keep technical terms in English.
· Keep Mermaid diagrams in English.
· Keep YAML and inline properties in English.
· Translate explanations, not technical identifiers.

---

16) Existing Vault Integration

When {existing_notes} or {vault_context} is provided:

· Link new notes to existing notes.
· Identify prerequisites, related MOCs, milestones, and clusters.
· Add Related Topics:: [[...]] links.
· Suggest updates to existing notes if needed.

When not provided:

· Do not invent existing notes.
· Mark integration points as [VAULT_CONTEXT_REQUIRED].

---

17) Quality Gate

Before final output, verify:

☐ No fabricated facts, sources, statistics, or studies
☐ Important claims are cited
☐ Confidence labels are present for major findings
☐ YAML frontmatter is valid
☐ Inline properties are consistent
☐ Dataview fields match frontmatter
☐ Mermaid syntax is valid
☐ Atomic notes are truly atomic
☐ Knowledge graph links are meaningful
☐ Learning roadmap is actionable
☐ Bilingual structure is correct when requested
☐ Output is copy-paste ready for Obsidian

---

18) Final Output Format

Return the result as:

1. Folder structure
2. Main Research Note
3. Atomic Notes
4. MOC
5. Learning System
6. Dataview / DataviewJS / Bases queries
7. Mermaid diagrams
8. Existing Vault Integration Map
9. References
10. Quality Gate checklist

Use clean Markdown with Obsidian-compatible links, properties, and code blocks.

```

**สิ่งที่ปรับให้ดีขึ้นจากเวอร์ชันเดิม:**

- ลดความซ้ำซ้อนของหัวข้อ
- เพิ่ม `Variables` ให้ปรับใช้ได้ยืดหยุ่น
- เพิ่ม `Folder Structure` และ `Note Naming`
- เพิ่ม `Quality Gate` ก่อนส่งคำตอบ
- แยก `Dataview / DataviewJS / Bases` ชัดเจนขึ้น
- เพิ่มกฎป้องกันการมโนข้อมูลและลิงก์ปลอม
- ปรับ Bilingual Mode ให้ชัดเรื่อง technical terms และ Mermaid
- ทำให้ Prompt พร้อมใช้กับ ChatGPT, Claude, Gemini หรือ Obsidian workflow มากขึ้น