Obsidian : AGENTS SKILLS ENGINEERING

For **Obsidian engineering**, use a root-level `AGENTS.md` for permanent vault rules, then create focused reusable `SKILL.md` files for repeatable workflows. This keeps your vault [[conventions]] consistent across agent sessions while letting skills handle specialized work such as note creation, research ingestion, architecture documentation, and release notes. Agent integrations commonly load `AGENTS.md` as standing context, and project-level instruction files can provide more-specific rules where needed.[1][2]

## Suggested vault structure

```text
Your-Obsidian-Vault/
├── AGENTS.md
├── Inbox/
├── Projects/
│   └── crystalcastleX/
│       ├── README.md
│       ├── Architecture.md
│       ├── Decisions/
│       ├── Changelog.md
│       └── AGENTS.md
├── Areas/
│   └── Engineering/
├── Resources/
├── Archive/
└── .agents/
    └── skills/
        ├── obsidian-note/
        │   └── SKILL.md
        ├── engineering-docs/
        │   └── SKILL.md
        ├── changelog/
        │   └── SKILL.md
        └── research-ingest/
            └── SKILL.md
```

A root `AGENTS.md` should define shared rules—folder routing, naming, frontmatter, linking, evidence standards, safe editing limits, and what the agent must report after work. Skills should cover repeatable procedures instead of embedding every workflow in one huge instruction file.[2][3]

## Root AGENTS.md

```md
# Obsidian Vault Instructions

## Purpose
This vault is an engineering knowledge base and project workspace.
Prioritize accuracy, traceability, concise writing, and durable links between notes.

## Operating rules
- Read a note before making claims about its content or editing it.
- Preserve existing YAML frontmatter, wikilinks, embeds, callouts, and formatting.
- Make the smallest change that fully completes the requested task.
- Do not delete notes, rename folders, move multiple files, or overwrite substantial content without confirmation.
- Do not invent project facts, decisions, release details, implementation status, or sources.
- Mark unknown or unverified details clearly as `TODO` or `Unverified`.
- Use available skills for repeatable workflows instead of improvising them.
- When work is complete, report the notes created or changed and anything that could not be verified.

## Vault routing
- `Inbox/`: unprocessed captures and temporary notes.
- `Projects/`: time-bounded projects with a defined outcome.
- `Areas/Engineering/`: durable engineering practices, concepts, and runbooks.
- `Resources/`: reference material, source summaries, and reusable documentation.
- `Archive/`: inactive or completed material.

## Naming
- Use descriptive title-case filenames: `API Authentication.md`.
- Use ISO dates where a date is meaningful: `2026-10-07 Release Notes.md`.
- Avoid duplicate notes; search the vault before creating a new concept note.
- Prefer one concept per note for durable reference notes.

## Markdown [[conventions]]
- Use Obsidian [[wikilinks]]: `[[Note Title]]`.
- Link relevant existing notes when creating or updating a note.
- Use headings in this order: `#`, then `##`, then `###`.
- Use callouts only for important warnings, decisions, or actionable next steps.
- Prefer concise paragraphs and flat bullet lists.

## Properties
Use YAML frontmatter for structured metadata when it adds retrieval value.

Required for project and reference notes:
---
title: ""
type: ""
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
aliases: []
---

Allowed `type` values:
- project
- decision
- architecture
- runbook
- reference
- meeting
- changelog
- research
- note

Allowed `status` values:
- inbox
- draft
- active
- blocked
- review
- complete
- archived

## Evidence
- Preserve source URLs and identify the source title or organization when available.
- Separate confirmed facts from interpretation or recommendations.
- Do not present generated summaries as primary evidence.
- For engineering decisions, record alternatives, trade-offs, and rationale.

## Engineering documentation
- Put project-specific instructions in `Projects/<Project>/AGENTS.md`.
- Record consequential technical choices in `Projects/<Project>/Decisions/`.
- Update `Architecture.md` when implementation changes affect components, data flow, interfaces, or deployment.
- Use `Changelog.md` for user-facing changes; do not include internal implementation noise unless it affects users.

## Completion criteria
Before finishing:
1. Verify internal links and filenames.
2. Preserve valid frontmatter.
3. Add or update relevant properties, tags, and aliases.
4. State exactly which notes changed.
```

This covers the practical categories recommended for agent instructions: organization, naming and properties, evidence requirements, boundaries, routing to skills, and a definition of done.[2][4]

## Project AGENTS.md

Place this inside `Projects/crystalcastleX/AGENTS.md` to specialize behavior for that project:

```md
# crystalcastleX Project Instructions

## Scope
This folder contains product, engineering, and release documentation for crystalcastleX.

## Source of truth
- Product behavior: `README.md` and linked product notes.
- Architecture: `Architecture.md`.
- Decisions: `Decisions/`.
- User-visible releases: `Changelog.md`.

Do not infer implementation details from task titles, screenshots, pull-request titles, or changelog entries alone.

## Documentation updates
When a completed change affects users:
- Update `Changelog.md`.
- Use plain-language, user-facing wording.
- Group entries as `New`, `Improved`, `Fixed`, or `Removed`.
- Do not expose credentials, internal endpoints, private issue identifiers, or sensitive implementation details.

When a completed change affects system design:
- Update `Architecture.md`.
- Create an ADR-style note in `Decisions/` if the change involves a meaningful trade-off.

## Terminology
- **Alias**: an alternate name that refers to the same item.
- **Tag**: a label used for categorization, filtering, or discovery.
- **Property**: structured metadata associated with an item.

## Changelog style
Use this format:

## Version X.Y.Z — YYYY-MM-DD

### New
- Added support for aliases, tags, and properties to improve organization and item metadata.

### Improved
- Improved ...

### Fixed
- Fixed ...
```

## Reusable skills

A skill is a compact procedure the agent can select for a recurring task; examples of existing Obsidian-oriented skill sets include Markdown [[conventions]], Bases, Canvas, CLI workflows, and web-to-Markdown extraction.[5][6]

### `.agents/skills/changelog/SKILL.md`

```md
---
name: changelog
description: Create or update clear user-facing release notes in an Obsidian project.
---

# Changelog Skill

## Use when
- A feature, improvement, fix, or removal is ready to document.
- A pull request or release needs user-facing copy.

## Workflow
1. Read the project `AGENTS.md`, `Changelog.md`, and relevant project notes.
2. Identify only confirmed, user-visible changes.
3. Classify each item as `New`, `Improved`, `Fixed`, or `Removed`.
4. Write plain-language entries that state user value.
5. Avoid internal code names, issue numbers, speculative claims, and implementation-only details.
6. Add the release date and version only if they are known.
7. Report the exact changelog section added or updated.

## Template
## Version X.Y.Z — YYYY-MM-DD

### New
- Added ...

### Improved
- Improved ...

### Fixed
- Fixed ...
```

### `.agents/skills/engineering-docs/SKILL.md`

```md
---
name: engineering-docs
description: Maintain accurate engineering documentation, architecture notes, and decision records.
---

# Engineering Documentation Skill

## Use when
- A component, integration, data flow, interface, deployment path, or technical decision changes.

## Workflow
1. Read `AGENTS.md`, the project instructions, and the notes that may be affected.
2. Identify the minimum documentation update required.
3. Update architecture documentation only with verified information.
4. Create a decision record when there is a lasting trade-off.
5. Link affected notes with wikilinks.
6. Preserve existing note structure and frontmatter.
7. Report changed notes and unresolved facts.

## Decision record template
---
type: decision
status: accepted
created: YYYY-MM-DD
tags: [engineering, decision]
aliases: []
---

# ADR: Decision title

## Context
What problem or constraint prompted this decision?

## Decision
What was chosen?

## Alternatives considered
What other viable options existed?

## Consequences
What benefits, costs, or follow-up work result?
```

### `.agents/skills/obsidian-note/SKILL.md`

```md
---
name: obsidian-note
description: Create a clean, linked Obsidian note with correct properties, aliases, and tags.
---

# Obsidian Note Skill

## Workflow
1. Search for existing notes on the same concept.
2. Create a new note only when it adds distinct value.
3. Add frontmatter with `type`, `status`, `created`, `updated`, `tags`, and `aliases`.
4. Choose a descriptive title and matching filename.
5. Link at least one related note when one exists.
6. Mark gaps as `TODO` rather than guessing.
7. Report the note location and links added.
```

## Property pattern

For your specific needs—**aliases, tags, and properties**—this is a clean Obsidian frontmatter pattern:

```yaml
---
title: Changelog
aliases:
  - Release notes
  - What's new
tags:
  - product
  - release
  - changelog
type: changelog
status: active
project: "[[crystalcastleX]]"
created: 2026-10-07
updated: 2026-10-07
---
```

Use:
- `aliases` for alternate search and link names, such as “Release notes” for a “Changelog” note.
- `tags` for broad cross-vault classification, such as `#engineering`, `#release`, or `#documentation`.
- ordinary properties such as `type`, `status`, `project`, `owner`, `version`, and dates for structured filtering and future database-style views.

For example, an individual release note can use:

```yaml
---
title: Version 1.0.0
aliases:
  - Initial release
tags:
  - release
  - crystalcastlex
type: changelog
status: complete
project: "[[crystalcastleX]]"
version: 1.0.0
released: 2026-10-07
---
```

This design keeps **navigation semantic**: use links for relationships, tags for broad grouping, aliases for alternate vocabulary, and properties for fields you want to filter or query consistently.

การอ้างอิง:
[1] Agentic Chat - Obsidian Plugin https://community.obsidian.md/plugins/agentic-chat
[2] github.com › blob › masterys-obsidian-copilot/docs/agents-md-examples.md at master ... -... https://github.com/youngsecurity/ys-obsidian-copilot/blob/master/docs/agents-md-examples.md
[3] obsidianos_work/AGENTS.md at main - GitHub https://github.com/benoror/obsidianos_work/blob/main/AGENTS.md
[4] github.com › blob › masterobsidian-copilot/docs/agents-md-examples.md at master - GitHub https://github.com/logancyang/obsidian-copilot/blob/master/docs/agents-md-examples.md
[5] Paul Iusztin's Post - LinkedIn https://www.linkedin.com/posts/pauliusztin_i-found-a-useful-repo-for-turning-ai-agents-activity-7463204463915311104-HFmy
[6] Understanding AGENTS.md and Skills | davidvkimball/obsidian ... https://deepwiki.com/davidvkimball/obsidian-sample-theme-plus/3.1-understanding-agents.md-and-skills
[7] AGENTS.md - Ar9av/obsidian-wiki - GitHub https://github.com/Ar9av/obsidian-wiki/blob/main/AGENTS.md
[8] obsidianos_work/README.md at main https://github.com/benoror/obsidianos_work/blob/main/README.md
[9] benoror/obsidianos_work: ObsidianOS - Work Vault - GitHub https://github.com/benoror/obsidianos_work
[10] "Obsidian CEO personally wrote the official Agent Skills ... https://x.com/dr_cintas/status/2054241755336425806
[11] GitHub - pbeens/obsidian-agents.md https://github.com/pbeens/obsidian-agents.md
[12] agentic-vault - Obsidian Vault Template | Vault Hub https://obsidianvaulthub.com/r/kurtvalcorza/agentic-vault
[13] Obsidian Agentic Skills - GitHub https://github.com/adriangrantdotorg/Obsidian-Skills
[14] Obsidian × Codex | Letting AI Directly Handle Your Knowledge Base https://note.com/soine_soudane/n/nf9ab9e9823a7?hl=en
[15] Automating Obsidian with Gemini CLI and MCP https://www.linkedin.com/posts/shridhar600_engineering-obsidian-gemini-activity-7419959501484789760-h2Vz
Show me an example SKILL.md for a custom workflow

Here’s a complete example for an **Obsidian custom workflow**: turning a raw engineering update, pull request summary, or feature note into linked project documentation and a user-facing changelog entry.

A valid skill lives in its own folder with a required `SKILL.md`; its YAML `name` and `description` tell agents when to activate it, while the Markdown body holds the step-by-step process. Supporting templates or references can live alongside it if the workflow grows.[1][2]

## Folder layout

```text
Your-Obsidian-Vault/
└── .agents/
    └── skills/
        └── release-documentation/
            └── SKILL.md
```

The folder name should match the lowercase, hyphenated `name` value in the frontmatter.[2][3]

## Example SKILL.md

```md
---
name: release-documentation
description: Convert confirmed engineering changes, pull request summaries, or release notes into accurate Obsidian project documentation and user-facing changelog entries. Use when a feature, improvement, bug fix, or removal is ready to document. Do not use for incomplete, unverified, or purely internal exploratory work.
compatibility: Requires access to an Obsidian vault with project notes and permission to edit Markdown files.
metadata:
  author: Your team
  category: engineering-documentation
---

# Release Documentation

## Goal

Turn a confirmed product or engineering change into clear, durable documentation.

The output should:
- Preserve factual accuracy.
- Update only notes that are genuinely affected.
- Separate internal implementation details from user-facing release notes.
- Link related Obsidian notes using wikilinks.
- Record unknown details as `TODO` rather than guessing.

## Use when

Use this skill when the input includes one or more of the following:

- A merged pull request or approved change summary.
- A confirmed feature announcement.
- A completed bug fix.
- A completed product improvement.
- A release candidate that needs release notes.
- A request to update `Changelog.md`, architecture notes, or decision records.

## Do not use when

Do not use this skill when:

- The work is only proposed, planned, or under investigation.
- Facts about the implementation or user impact are missing.
- The request is to write marketing copy only.
- The change is a routine refactor with no user-facing or documentation impact.

## Required reading

Before editing:

1. Read the vault-level `AGENTS.md`, if present.
2. Read the project's local `AGENTS.md`, if present.
3. Read the relevant `Changelog.md`.
4. Read `Architecture.md` if the change may affect components, data flow, interfaces, permissions, or deployment.
5. Search for existing notes about the feature or issue before creating a new note.

## Workflow

### 1. Extract confirmed facts

Identify only what is supported by the provided material.

Capture:

- What changed.
- Who experiences the change.
- Whether it is new, improved, fixed, or removed.
- Any limitations, migration requirements, or known follow-up work.
- Whether architecture documentation needs updating.

Do not infer details from issue titles, screenshots, branch names, or vague descriptions.

### 2. Decide which notes change

Use this routing guide:

| Change type | Update |
|---|---|
| User-visible feature | `Changelog.md`; relevant feature or project note |
| User-visible bug fix | `Changelog.md`; relevant troubleshooting note if one exists |
| System design or integration change | `Architecture.md`; possibly a decision note |
| Lasting technical trade-off | New note in `Decisions/` |
| Internal refactor only | No changelog entry unless it changes user behavior, performance, reliability, security, or compatibility |

Make the smallest set of edits that fully documents the confirmed change.

### 3. Write the changelog entry

Use plain language. State the user outcome first.

Classify every entry under one of these headings:

- `New`
- `Improved`
- `Fixed`
- `Removed`

Use this format:

```md
## Version X.Y.Z — YYYY-MM-DD

### New
- Added ...

### Improved
- Improved ...

### Fixed
- Fixed ...

### Removed
- Removed ...
```

Rules:

- Use the version and date only if they are known.
- Avoid pull request numbers, code names, filenames, internal API names, and implementation trivia.
- Avoid unsupported claims such as “faster,” “more secure,” or “more reliable” unless verified.
- Keep each item to one concise sentence where possible.

### 4. Update project documentation

If the change affects documented behavior, update the existing project note rather than creating duplicate documentation.

Add wikilinks to related notes when they exist.

For new notes, use this frontmatter:

```yaml
***
title: ""
aliases: []
tags:
  - engineering
type: reference
status: active
project: "[[Project Name]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
***
```

Use aliases for alternative names a person might search or link with. Use tags for broad cross-vault classification. Use properties such as `type`, `status`, and `project` for filtering and structured retrieval.

### 5. Record a decision when needed

Create a note in `Decisions/` only if the change reflects a meaningful, lasting choice between alternatives.

Use this template:

```md
***
title: ADR: Decision title
aliases: []
tags:
  - engineering
  - decision
type: decision
status: accepted
project: "[[Project Name]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
***

# ADR: Decision title

## Context
What problem or constraint required a decision?

## Decision
What was chosen?

## Alternatives considered
What viable options were considered?

## Consequences
What benefits, costs, risks, or follow-up work result from this choice?
```

### 6. Validate before finishing

Check all of the following:

- The documentation contains no invented facts.
- User-facing copy has no private implementation details.
- Existing frontmatter and headings remain valid.
- Wikilinks point to real notes or are intentionally marked as `TODO`.
- The changelog entry accurately reflects the confirmed scope.
- Duplicate notes were not created.
- All changed notes have an updated `updated` date when the vault convention requires it.

## Example

### Input

> The update adds aliases, tags, and custom properties to items. Aliases provide alternate names. Tags let users categorize and filter items. Properties store structured metadata. The release version is 1.2.0. The release date is October 8, 2026.

### Changelog output

```md
## Version 1.2.0 — 2026-10-08

### New
- Added aliases so items can be found and linked using alternate names.
- Added tags for categorizing and filtering items.
- Added custom properties for storing structured item metadata.
```

### Documentation update

```md
***
title: Item Organization
aliases:
  - Metadata
  - Item metadata
tags:
  - product
  - organization
  - engineering
type: reference
status: active
project: "[[crystalcastleX]]"
created: 2026-10-08
updated: 2026-10-08
***

# Item Organization

Items support [[Aliases]], [[Tags]], and [[Properties]].

## Aliases
Aliases are alternate names for the same item.

## Tags
Tags categorize items and support filtering.

## Properties
Properties store structured metadata associated with an item.
```

## Completion report

After completing the workflow, respond with:

```md
## Documentation updated

Changed:
- `Projects/Project Name/Changelog.md`
- `Projects/Project Name/Item Organization.md`

Added:
- `Projects/Project Name/Decisions/ADR-...md` (only if applicable)

Not documented:
- [Any unverified or out-of-scope detail, with the reason.]
```
```

## Why this works

The trigger description is deliberately specific: it tells the agent both **when to use** the skill and when not to use it. This matters because descriptions are typically what the agent sees before it decides to load the full skill.[4][5]

The body then provides:

- A clear goal and scope.
- Preconditions and reading order.
- A repeatable sequence of actions.
- Boundaries against hallucinated information.
- Templates for reliable output.
- A verification checklist and completion report.

This is the recommended structure for robust skills: procedural steps, examples, edge-case guidance, and explicit exit criteria. Keep the core `SKILL.md` concise—commonly under roughly 500 lines—and move lengthy specs, templates, or scripts into `references/`, `assets/`, or `scripts/` only when needed.[6][7]

การอ้างอิง:
[1] Skills | OpenAI API https://developers.openai.com/api/docs/guides/tools-skills
[2] agentskills.io https://agentskills.io/skill.md
[3] docs.augmentcode.com › cli › skillsAgent Skills - Augment https://docs.augmentcode.com/cli/skills
[4] Using skills to accelerate OSS maintenance https://developers.openai.com/blog/skills-agents-sdk
[5] Agent Skills Overview - Agent Skills https://agentskills.io/home
[6] Agent Skills | Microsoft Learn https://learn.microsoft.com/en-us/agent-framework/agents/skills
[7] Specification https://agentskills.io/specification
[8] Use Agent Skills in VS Code https://code.visualstudio.com/docs/agent-customization/agent-skills
[9] docs.openhands.dev › sdk › guidesAgent Skills & Context - OpenHands Docs https://docs.openhands.dev/sdk/guides/skill
[10] Agent Skills - Claude Platform Docs https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
[11] Workflows to skills migration | Google Antigravity Docs https://antigravity.google/docs/migration/workflows-to-skills/
[12] agent-skills/agent-skills/SKILL.md at main - GitHub https://github.com/magnus919/agent-skills/blob/main/agent-skills/SKILL.md
[13] agents/docs/agent-skills.md at main · wshobson/agents - GitHub https://github.com/wshobson/agents/blob/main/docs/agent-skills.md
[14] agent-skills/docs/getting-started.md at main https://github.com/addyosmani/agent-skills/blob/main/docs/getting-started.md
[15] skills/skills/.system/skill-creator/SKILL.md at main · openai ... https://github.com/openai/skills/blob/main/skills/.system/skill-creator/SKILL.md
How do I add a supporting reference template

Add a `references/` folder inside the skill directory, place the detailed template there, and explicitly tell the agent when to read it from `SKILL.md`. Supporting reference files are loaded on demand, which keeps the main skill focused and makes the template reusable.[1][2]

## Folder structure

For the release-documentation skill from the previous example:

```text
Your-Obsidian-Vault/
└── .agents/
    └── skills/
        └── release-documentation/
            ├── SKILL.md
            └── references/
                └── changelog-template.md
```

Use `references/` for explanatory material, detailed rules, examples, and templates that the agent should read but does not need in every skill invocation. Use paths relative to the skill root when referring to them.[1][3]

## Add this to SKILL.md

Put a short, explicit instruction in the relevant part of your workflow:

```md
## Changelog writing

Before creating or changing a changelog entry, read:

- `references/changelog-template.md`

Follow its required format and writing rules. If its instructions conflict
with the current project’s `AGENTS.md`, follow the project’s `AGENTS.md`.
```

The agent now has a clear trigger: it should load the reference only when the task involves changelog work, instead of reading it for unrelated documentation updates.[1][4]

## Reference template file

Create `.agents/skills/release-documentation/references/changelog-template.md`:

```md
# Changelog Template

Use this template for confirmed, user-visible changes.

## Version X.Y.Z — YYYY-MM-DD

### New
- Added [feature] so [user benefit].

### Improved
- Improved [existing behavior] by [user-visible outcome].

### Fixed
- Fixed an issue where [user-visible problem].

### Removed
- Removed [feature or behavior]. [Include migration guidance if needed.]

## Writing rules

- Write for product users, not developers.
- Start each item with an action verb: Added, Improved, Fixed, Removed.
- State the outcome or benefit when it is known.
- Use one sentence per change whenever possible.
- Include a version number and release date only when confirmed.
- Do not mention pull request numbers, issue IDs, branch names, internal services, file paths, or private implementation details.
- Do not claim improved performance, security, reliability, or compatibility unless the evidence confirms it.
- Do not document planned work as released work.

## Classification guide

| Change | Section |
|---|---|
| A capability did not exist before | New |
| Existing behavior is better or easier | Improved |
| Incorrect behavior now works correctly | Fixed |
| A capability is no longer available | Removed |

## Examples

### Good

```md
### New
- Added aliases so items can be found and linked using alternate names.
- Added tags for categorizing and filtering items.
- Added custom properties for storing structured item metadata.
```

### Avoid

```md
- Merged PR #41.
- Refactored `ItemModel.ts`.
- Updated database schema.
- Improved performance.
```

The examples above are too implementation-focused or make claims that are not specific and verifiable.
```

## Updated skill excerpt

Here is how the relevant portion of your main `SKILL.md` would look:

```md
## Workflow

### 3. Write the changelog entry

Before writing or modifying `Changelog.md`, read:

- `references/changelog-template.md`

Use its section headings, writing rules, classification guide, and examples.

If the project contains its own changelog style guide or `AGENTS.md`,
that project-specific guidance overrides this reference template.

Only document confirmed, user-visible changes.
```

## When to use each folder

| Content | Location | Example |
|---|---|---|
| Activation rules and essential workflow steps | `SKILL.md` | “Read the project’s `AGENTS.md` before editing.” |
| Detailed documentation, templates, examples, long policy rules | `references/` | `changelog-template.md` |
| Executable deterministic automation | `scripts/` | `validate-frontmatter.py` |
| Files copied into or used by an output | `assets/` | `adr-template.md`, a diagram starter, or a JSON schema |

A practical rule: keep the primary `SKILL.md` to the instructions needed to select and run the workflow, then move deeper reference material into single-purpose files in `references/`. Avoid chains where one reference requires reading several more references; direct, one-level paths are easier for agents to follow reliably.[1][5]

การอ้างอิง:
[1] Skills - Docs by LangChain https://docs.langchain.com/oss/python/deepagents/skills
[2] GitHub - agentskills/agentskills: Specification and documentation... https://github.com/agentskills/agentskills
[3] Agent Skills - Docus https://docus.dev/en/ai/skills
[4] How to add skills support to your agent https://agentskills.io/client-implementation/adding-skills-support
[5] semantic-kernel-docs/agent-framework/agents/skills.md at main https://github.com/MicrosoftDocs/semantic-kernel-docs/blob/main/agent-framework/agents/skills.md
[6] What Are Agent Skills and How To Use Them - JetBrains https://www.jetbrains.com/pages/ai-agents/architecture/agent-skills/
[7] The SKILL.md Format - Hugging Face https://huggingface.co/learn/context-course/en/unit1/skill-format
[8] Agent Skill Anatomy | pm-skills https://product-on-purpose.github.io/pm-skills/concepts/agent-skill-anatomy/
[9] skills/SKILLS_GUIDE.md at main · open-edge-platform/skills - GitHub https://github.com/open-edge-platform/skills/blob/main/SKILLS_GUIDE.md
[10] The SKILL.md Format - Hugging Face https://huggingface.co/learn/context-course/unit1/skill-format
Show me an example SKILL.md using a template

Below is a complete **template-driven** `SKILL.md` for an Obsidian workflow. It tells the agent exactly when to load a template, how to fill it, and which facts it must not invent.

A skill can include a required `SKILL.md` plus optional materials such as templates and references; `references/` is the appropriate place for policies, examples, schemas, and long-form templates.[1][2]

## Folder structure

```text
Your-Obsidian-Vault/
└── .agents/
    └── skills/
        └── feature-note/
            ├── SKILL.md
            └── references/
                └── feature-note-template.md
```

## SKILL.md

Create `.agents/skills/feature-note/SKILL.md`:

```md
---
name: feature-note
description: Create or update a structured Obsidian feature note from confirmed product or engineering information. Use when documenting a released or approved feature, including its purpose, behavior, limitations, related notes, aliases, tags, and properties. Do not use for speculative ideas, incomplete investigations, or unverified implementation details.
compatibility: Requires access to an Obsidian vault and permission to create or edit Markdown files.
metadata:
  author: Your team
  category: obsidian-documentation
---

# Feature Note

## Goal

Create a durable, linked note that explains a confirmed product feature.

The note must:
- Follow the vault and project `AGENTS.md` instructions.
- Use the supplied feature-note template.
- Preserve confirmed facts and mark missing facts as `TODO`.
- Use Obsidian properties, aliases, tags, and wikilinks consistently.
- Avoid duplicating an existing note.

## Use when

Use this skill when the task asks to:

- Document a released feature.
- Turn an approved feature brief into an Obsidian note.
- Update feature documentation after a confirmed product change.
- Create a linked reference page for a feature such as aliases, tags, or properties.

## Do not use when

Do not use this skill when:

- The feature is only an idea, proposal, or backlog item.
- The input has insufficient confirmed information.
- The task is limited to a user-facing changelog entry.
- The request requires an architecture decision record instead.

## Required reading

Before creating or editing a note:

1. Read the vault-level `AGENTS.md`, if it exists.
2. Read the closest project-level `AGENTS.md`, if it exists.
3. Search the vault for an existing note with the feature name, its aliases, or related terminology.
4. Read this template:

   `references/feature-note-template.md`

5. Read related project notes when they exist, including product, architecture, and changelog notes.

## Workflow

### 1. Confirm the scope

Extract only facts supported by the input and existing vault notes.

Identify:

- The feature name.
- Its user-facing purpose.
- Its confirmed behavior.
- Known limitations or requirements.
- Related concepts or notes.
- Whether it has a release version or date.

If any detail is absent or uncertain, write `TODO: Confirm ...` instead of guessing.

### 2. Find or create the note

- Update an existing feature note if one already covers the same feature.
- Create a new note only if the feature is distinct.
- Use a title-case filename that matches the note title.
- Save the note in the folder specified by the vault or project instructions.
- If no folder convention exists, use `Projects/<Project Name>/Features/`.

### 3. Apply the template

Copy the structure in `references/feature-note-template.md`.

Complete each section with confirmed information only.

Follow these rules:

- Keep required frontmatter properties.
- Add aliases that users may naturally search for or use in links.
- Add only useful, stable tags; do not turn every keyword into a tag.
- Use wikilinks for related notes that already exist.
- Use plain text plus `TODO` when a related note does not exist.
- Do not remove template sections; write `Not applicable` when a confirmed section does not apply.

### 4. Validate the note

Before finishing, confirm:

- The title and filename match.
- YAML frontmatter is valid.
- `aliases` and `tags` are lists.
- All known dates use `YYYY-MM-DD`.
- Existing wikilinks refer to real notes.
- No unsupported claims, release dates, versions, or technical details were added.
- The `updated` property reflects the date of the edit if required by vault rules.
- There is no duplicate feature note.

## Example request

> Document the new item organization feature. It adds aliases, tags, and custom properties. Aliases let users refer to an item by alternate names. Tags support categorization and filtering. Properties store structured metadata. The feature was released in version 1.2.0 on 2026-10-08.

## Expected result

Create or update a note named `Item Organization.md` using
`references/feature-note-template.md`, with:

- `Aliases`, `Tags`, and `Properties` as aliases or linked related notes where appropriate.
- `product`, `organization`, and the project tag in frontmatter.
- A confirmed release value of `1.2.0`.
- A confirmed release date of `2026-10-08`.
- Separate sections explaining aliases, tags, and properties.
- No implementation-specific claims unless supplied by a verified source.

## Completion report

After completing the work, respond with:

```md
## Feature note updated

Changed:
- `<vault-relative-path>/<Note Title>.md`

Linked:
- [[Related Note 1]]
- [[Related Note 2]]

TODOs:
- None
```

If information could not be confirmed, list it under `TODOs` with the exact detail that requires verification.
```

## Template file

Create `.agents/skills/feature-note/references/feature-note-template.md`:

```md
---
title: "{{feature_name}}"
aliases: []
tags:
  - product
  - feature
type: feature
status: active
project: "[[{{project_name}}]]"
version: ""
released: ""
created: "{{date}}"
updated: "{{date}}"
---

# {{feature_name}}

## Summary

{{One or two sentences describing what the feature does and why it matters to users.}}

## How it works

{{Describe confirmed user-facing behavior.}}

## Use cases

- {{Use case 1}}
- {{Use case 2}}

## Related concepts

- [[{{related_note_1}}]]
- [[{{related_note_2}}]]

## Requirements and limitations

- {{Confirmed requirement or limitation}}
- TODO: Confirm {{missing or uncertain detail}}

## Release information

- **Version:** {{version_or_TODO}}
- **Released:** {{release_date_or_TODO}}

## Notes

{{Optional implementation-neutral context, migration guidance, or follow-up documentation.}}
```

## What it produces

Given your aliases, tags, and properties example, the agent would create something close to this:

```md
---
title: Item Organization
aliases:
  - Item metadata
  - Organization tools
tags:
  - product
  - feature
  - organization
  - crystalcastlex
type: feature
status: active
project: "[[crystalcastleX]]"
version: "1.2.0"
released: 2026-10-08
created: 2026-10-08
updated: 2026-10-08
---

# Item Organization

## Summary

Item Organization lets users add aliases, tags, and custom properties to items so they can describe, categorize, filter, and find information more easily.

## How it works

Users can add alternate names through aliases, apply tags for categorization and filtering, and store structured metadata with custom properties.

## Use cases

- Find or link to an item using an alternate name.
- Filter related items by tag.
- Record structured details that belong to an individual item.

## Related concepts

- [[Aliases]]
- [[Tags]]
- [[Properties]]

## Requirements and limitations

- TODO: Confirm whether aliases must be unique.
- TODO: Confirm supported property types.

## Release information

- **Version:** 1.2.0
- **Released:** 2026-10-08
```

## Design principle

Keep the **selection and workflow logic** in `SKILL.md`; keep the detailed note shape in `references/feature-note-template.md`. The direct template path and explicit “read before creating” instruction ensure the agent knows that the template is mandatory rather than merely optional background material. Smaller focused reference files also allow agents to load only the material needed for the current workflow.[3][4]

การอ้างอิง:
[1] developers.openai.com https://developers.openai.com/plugins/concepts/skills.md
[2] Build skills – Plugins https://developers.openai.com/plugins/build/skills
[3] A Quick Example https://techcommunity.microsoft.com/blog/azuredevcommunityblog/giving-your-ai-agents-reliable-skills-with-the-agent-skills-sdk/4497074
[4] agent-skills/AGENTS.md at main - GitHub https://github.com/neondatabase/agent-skills/blob/main/AGENTS.md
[5] SKILL.md - openai-docs - GitHub https://github.com/openai/skills/blob/main/skills/.curated/openai-docs/SKILL.md
Explain frontmatter and trigger rules

**Frontmatter** is the YAML metadata block at the top of `SKILL.md`. Its most important fields are `name` and `description`; agents commonly use the description as the main signal for deciding whether to load the full skill.[1][2]

**Trigger rules** are the conditions you write—primarily in `description`, optionally reinforced in the Markdown body—that say when the skill should run and when it should not.

## Frontmatter anatomy

A minimal, standards-friendly skill looks like this:

```md
---
name: feature-note
description: Create or update an Obsidian feature note from confirmed product or engineering information. Use when documenting a released or approved feature, including behavior, limitations, aliases, tags, properties, and related notes.
---

# Feature Note

Instructions go here.
```

The first `---` opens the frontmatter, the second closes it, and everything below is ordinary Markdown instructions. The standard requires `name` and `description`; common optional fields include `license`, `compatibility`, and a simple `metadata` map.[2][3]

## Frontmatter fields

| Field | Required | Purpose | Example |
|---|---:|---|---|
| `name` | Yes | Stable identifier for the skill; normally matches its folder name | `feature-note` |
| `description` | Yes | Explains what the skill does and which requests should activate it | `Create feature documentation. Use when…` |
| `compatibility` | No | States the environment, tools, or permissions the skill requires | `Requires access to an Obsidian vault.` |
| `license` | No | Identifies a license or bundled license reference | `MIT` |
| `metadata` | No | Stores simple non-triggering information | author, version, category |

Example with optional fields:

```yaml
---
name: release-documentation
description: Convert confirmed product or engineering changes into Obsidian documentation and user-facing changelog entries. Use when a feature, improvement, bug fix, or removal is ready to document. Do not use for planned, incomplete, or unverified work.
compatibility: Requires access to an Obsidian vault and permission to edit Markdown files.
license: MIT
metadata:
  author: Your team
  version: "1.0.0"
  category: engineering-documentation
---
```

For maximum interoperability, keep the name lowercase and hyphenated, no longer than 64 characters, and match it exactly to the parent folder. Descriptions must be non-empty and are commonly limited to 1,024 characters.[3][4]

## What triggers a skill

An agent often sees only the skill’s `name` and `description` while deciding which skill is relevant. If the description matches the user’s request, it then loads the full `SKILL.md`; this is why the `description` is effectively your primary activation or trigger rule.[1][2]

A strong description contains three parts:

1. **Capability** — what it does.
2. **Use conditions** — specific situations or user wording that should trigger it.
3. **Scope boundaries** — nearby requests that should *not* trigger it.

### Weak trigger rule

```yaml
description: Helps with notes.
```

This is too broad. It may trigger for daily notes, meeting notes, research notes, architecture decisions, changelog updates, or unrelated vault cleanup.

### Strong trigger rule

```yaml
description: Create or update structured Obsidian feature notes from confirmed product or engineering information. Use when documenting a released or approved feature, including its purpose, behavior, limitations, aliases, tags, properties, and related notes. Do not use for speculative ideas, raw meeting notes, changelog-only requests, or architecture decision records.
```

This tells the agent:

- What to create: a structured **feature note**.
- Which facts it needs: confirmed product or engineering information.
- Likely trigger words: “document feature,” “released,” “aliases,” “tags,” “properties.”
- When to avoid the skill: ideas, meeting notes, changelog-only requests, and ADRs.

Descriptions should explicitly state both what the skill does and when it should be used, with concrete keywords that help matching.[4][5][6]

## Body-level trigger rules

Put fine-grained rules in the Markdown body, after the frontmatter. These rules apply **after** the agent has loaded the skill.

```md
## Use when

Use this skill when the request asks to:

- Document a released feature.
- Convert an approved product brief into a feature note.
- Update documentation after confirmed behavior changes.
- Add aliases, tags, or structured properties to an existing feature note.

## Do not use when

Do not use this skill when:

- The feature is only proposed or not approved.
- The user only wants a short changelog entry.
- The user is documenting a long-term technical trade-off; use the `architecture-decision` skill instead.
- The information is too incomplete to describe the feature without inventing facts.
```

The frontmatter determines **skill selection**. The body determines **correct behavior once selected**.

## Trigger rule example

For your Obsidian vault, here is a practical release-note skill:

```md
---
name: obsidian-changelog
description: Write or update user-facing changelog entries in an Obsidian project. Use when a confirmed feature, improvement, bug fix, or removal needs release notes. Trigger for requests mentioning changelog, release notes, what's new, shipped, fixed, improved, aliases, tags, or properties. Do not use for planned work, raw pull request summaries, internal refactors with no user impact, or full feature documentation.
compatibility: Requires access to a project Changelog.md and confirmed change details.
metadata:
  category: release-notes
---
```

This should trigger for:

- “Write release notes for aliases, tags, and properties.”
- “Update the changelog after this bug fix.”
- “What’s new in version 1.2.0?”
- “Turn this shipped feature into user-facing release notes.”

It should **not** trigger for:

- “Explain how the tag data model works.”  
- “Create an ADR for custom properties.”
- “Brainstorm metadata features.”
- “Summarize this PR for engineers.”

## Rule design checklist

Before saving a skill, check:

- Does the `name` match the skill directory, such as `feature-note/SKILL.md`?
- Does the description state both the capability and the activation context?
- Does it include terms a user would naturally write?
- Does it exclude confusing neighboring workflows?
- Are detailed procedures in the body rather than crammed into the description?
- Are key safety limits explicit, such as “do not invent facts” or “do not change release versions unless confirmed”?
- Is only the workflow’s essential information in `SKILL.md`, with long templates in `references/`?

The central principle is: **make the description narrow enough to select the right workflow, but concrete enough that ordinary user language matches it.**

การอ้างอิง:
[1] Optimizing skill descriptions - Agent Skills https://agentskills.io/skill-creation/optimizing-descriptions
[2] Integrate skills into your agent - Agent Skills https://agentskills.io/client-implementation/adding-skills-support.md
[3] Agent Skills | OpenCode https://opencode.ai/docs/skills/
[4] agentskills/docs/specification.mdx at main https://github.com/agentskills/agentskills/blob/main/docs/specification.mdx
[5] Agent Skills | Google Antigravity Docs https://antigravity.google/docs/skills
[6] github.com › shalomb › agent-skillsagent-skills/docs/reference/frontmatter.md at main - GitHub https://github.com/shalomb/agent-skills/blob/main/docs/reference/frontmatter.md
[7] Agent Skills Explained: SKILL.md Format and Adoption ... https://atlan.com/know/ai-agent/ai-agent-skills/what-are-agent-skills/
[8] AGENTS.md https://github.com/coreyhaines31/marketingskills/blob/main/AGENTS.md
[9] https://raw.githubusercontent.com/NeverSight/skill... https://raw.githubusercontent.com/NeverSight/skills_feed/refs/heads/main/data/skills-md/itechmeat/llm-code/skill-master/SKILL.md
How do I write a good description

Write a good skill description as a **routing rule**, not a summary of the workflow. Start with when the agent should load the skill, name the concrete user intent and vocabulary, then exclude close-but-wrong requests. The description is typically the main trigger an agent evaluates before it reads the full `SKILL.md`.[1][2]

## Reliable formula

Use this structure:

```text
Use when [specific situation or user intent].
[Verb + object]: [the outcome the skill produces].
Trigger for [words, phrases, artifacts, or symptoms users commonly mention].
Do not use for [nearby workflows that require a different skill].
```

For many skills, 2–4 concise sentences—or roughly 50 words—is enough. Put the activation conditions first because some systems truncate long descriptions.[1][3][4]

## Strong example

For your Obsidian workflow:

```yaml
description: Use when documenting a confirmed or released product feature in an Obsidian vault. Creates or updates a structured feature note with purpose, behavior, limitations, aliases, tags, properties, and related wikilinks. Trigger for requests such as “document this feature,” “create a feature note,” “add aliases,” “add tags,” “add properties,” or “update product documentation.” Do not use for speculative ideas, meeting notes, changelog-only requests, or architecture decision records.
```

Why it is good:

- **Situation first:** “documenting a confirmed or released product feature.”
- **Clear outcome:** create or update a structured feature note.
- **Real vocabulary:** feature note, aliases, tags, properties, product documentation.
- **Boundaries:** prevents the skill from competing with brainstorm, changelog, meeting-note, and ADR skills.

## Weak vs strong

| Description | Problem or benefit |
|---|---|
| `Helps with Obsidian notes.` | Too broad; it might trigger for almost any vault task. |
| `Creates feature documentation.` | Says what it does but not when it should load. |
| `Use when documenting a confirmed or released feature in Obsidian. Trigger for “feature note,” “document this feature,” aliases, tags, properties, and product documentation. Do not use for changelog-only or speculative requests.` | Specific user intent, recognizable vocabulary, and clear exclusions. |

A description that merely names a topic—such as “handles billing” or “helps with notes”—generally triggers less reliably than one that identifies an actual condition—such as “use when writing code that touches the billing library” or “use when documenting a released feature.”[3][5]

## Practical rules

- **Lead with “Use when…”** It makes the activation condition unmistakable.
- **Use the user’s language.** Include natural request phrases: “release notes,” “what’s new,” “ADR,” “bug fix,” “meeting summary,” or “add tags.”
- **Name concrete artifacts.** Mention `Changelog.md`, `AGENTS.md`, Obsidian, an ADR, a `.docx`, `pytest`, etc., when they genuinely define the skill’s scope.
- **Include synonyms and variants.** For example: “changelog,” “release notes,” and “what’s new.”
- **Add negative boundaries.** Say “Do not use for…” when a neighboring skill could be confused with this one.
- **Avoid process details.** Do not fill the description with steps such as “read the vault, copy the template, validate links.” Put those in the Markdown body.
- **Avoid vague qualifiers.** “Improve,” “help,” “handle,” “better,” and “documents” are weak without a specific situation.
- **Keep one primary job per skill.** If it needs many unrelated triggers, split it into distinct skills.

The best descriptions maximize correct matches while minimizing accidental activation. Concrete triggers and exclusions are more useful than generic explanations of capability.[2][6][7]

## Reusable templates

### Documentation skill

```yaml
description: Use when creating or updating [document type] from confirmed [source or domain] information. Trigger for [user phrases, file names, concepts, or artifacts]. Do not use for [adjacent workflow A], [adjacent workflow B], or [unverified/planned work].
```

### Release-note skill

```yaml
description: Use when writing or updating user-facing release notes in an Obsidian project. Trigger for “changelog,” “release notes,” “what’s new,” “shipped,” “fixed,” “improved,” or “version.” Do not use for raw pull request summaries, internal refactors with no user impact, planned work, or full feature documentation.
```

### Architecture-decision skill

```yaml
description: Use when recording a confirmed, lasting technical decision and its trade-offs in an Obsidian architecture decision record. Trigger for “ADR,” “architecture decision,” “trade-off,” “choose between,” “decision rationale,” or “why we selected.” Do not use for routine implementation notes, short changelog entries, or unresolved brainstorming.
```

## Test it before use

Make a small test set of likely requests and near misses. Then check whether the description would activate only for the intended cases.

| Should trigger | Should not trigger |
|---|---|
| “Document the aliases feature.” | “Brainstorm possible alias behavior.” |
| “Create an Obsidian feature note for tags.” | “Write one changelog bullet for tags.” |
| “Update product documentation for custom properties.” | “Create an ADR for the property data model.” |
| “Add aliases and tags to the feature note.” | “Summarize our engineering meeting.” |

If it triggers on a near miss, add a specific **“Do not use for…”** boundary. If it misses an intended request, add the user’s wording or a relevant artifact to the trigger text. Testing with positive and negative examples is a practical way to refine selection behavior rather than relying on intuition.[4][8]

การอ้างอิง:
[1] Designing, Refining, and Maintaining Agent Skills at ... https://www.perplexity.ai/hub/blog/designing-refining-and-maintaining-agent-skills-at-perplexity
[2] writing-skills | Agent Skills Library https://mcpservers.org/agent-skills/openai/writing-skills
[3] Agent Skills Explained: When to Use Them and Why They Fail https://aerospike.com/blog/agent-skills-guide/
[4] Agent Skills 101: a practical guide for engineers - Serghei's Blog https://blog.serghei.pl/posts/agent-skills-101/
[5] 28 - Skills | Agentic Software Development - Courses https://courses.taltech.akaver.com/agentic-software-development/lectures/skills
[6] Best Practices: Agent Skills | Agent Skills Tutorial | OpenCodeDocs https://lzw.me/docs/opencodedocs/vercel-labs/agent-skills/faq/best-practices/
[7] How Do You Build Your First Agent Skill? A Complete SKILL.md ... https://agentman.ai/blog/build-your-first-agent-skill-skillmd-anatomy
[8] Agent Skills https://supachai-j.github.io/agent-skills-training/slides/training-en.html
[9] writing-skills | Claude Skills & Agent Skills Library https://mcpservers.org/agent-skills/obra/writing-skills
[10] Skills in AI Agents and the Current State of Skills in Design https://note.com/kgsi/n/n1e398fc94652?hl=en
[11] How to Write an Agent Skill: SKILL.md Explained - UD Blockchain https://www.ud.hk/en/blogs/insight/article/write-agent-skill-guide-2026-07-27
