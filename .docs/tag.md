Convert to YAML Frontmatter:
tag
tag

A tag in Obsidian is a searchable label for grouping related notes across folders. Use tags for broad categories such as project, area, workflow, status, or topic—not for detailed structured fields like due dates, assignees, or priorities. Obsidian supports tags in YAML frontmatter through the tags list and inline with #tag; nested tags use /.[1][2]

Correct format
Use the plural tags, always as a YAML list:

---
tags:
  - task
  - project/eisenhower-matrix
  - status/open
  - quadrant/schedule
---
Avoid the deprecated singular property:

# Avoid
tag: task
Use tags, aliases, and cssclasses—not the older tag, alias, or cssclass spellings. Recent Obsidian behavior expects these fields as lists.[3][4]

Recommended task tags
For your Eisenhower Matrix Dashboard and Task API project:

tags:
  - task
  - project/eisenhower-matrix
  - area/task-management
  - status/open
  - quadrant/do
  - backend/flask
  - database/postgresql
Use a small, consistent taxonomy:

Tag group	Examples	Purpose
Note type	task, project, reference, decision	Identifies what the note is
Project	project/eisenhower-matrix	Groups notes belonging to one project
Area	area/task-management, area/backend	Broad long-lived responsibility
Status	status/open, status/blocked, status/complete	Quick cross-vault filtering
Eisenhower quadrant	quadrant/do, quadrant/schedule, quadrant/delegate, quadrant/delete	Optional visual grouping
Technology	backend/flask, database/postgresql, api/rest	Technical subject grouping
Nested tags such as project/eisenhower-matrix and quadrant/do form a hierarchy in Obsidian’s Tags view, making it easier to browse related notes.[2]

```yaml
---
title: Obsidian Tags
aliases:
  - Tag
  - Note Tags
  - Tag Taxonomy
  - Obsidian Tag Guide
cssclasses:
  - obsidian-guide
  - tag-reference
tags:
  - obsidian
  - reference
  - knowledge-management
  - organization
  - tags
type: reference
status: active
topic: Obsidian tags
created: 2026-10-08
updated: 2026-10-08
---
```

# Obsidian Tags

A tag in Obsidian is a searchable label for grouping related notes across folders. Use tags for broad categories such as project, area, workflow, status, or topic—not for structured values such as due dates, assignees, importance, or urgency.

## Correct format

Use the plural `tags` as a YAML list:

```yaml
tags:
  - task
  - project/eisenhower-matrix
  - status/open
  - quadrant/schedule
```

Avoid the old singular property:

```yaml
# Avoid
tag: task
```

Use these current list-based properties:

```yaml
aliases:
  - Alternative note name

cssclasses:
  - custom-note-style

tags:
  - category
  - nested/category
```

## Task tag template

```yaml
---
title: "{{task title}}"
aliases: []
cssclasses:
  - task-note
tags:
  - task
  - project/eisenhower-matrix
  - area/task-management
  - status/open
  - quadrant/do
  - backend/flask
  - database/postgresql
type: task
status: open
completed: false
importance: high
urgency: high
quadrant: do
project: "[[Eisenhower Matrix Dashboard และ Task API]]"
created: 2026-10-08
updated: 2026-10-08
---
```

## Recommended taxonomy

| Tag group | Examples | Purpose |
|---|---|---|
| Note type | `task`, `project`, `reference`, `decision` | Identifies the type of note |
| Project | `project/eisenhower-matrix` | Groups notes from one project |
| Area | `area/task-management`, `area/backend` | Identifies long-lived responsibility areas |
| Status | `status/open`, `status/blocked`, `status/complete` | Supports cross-vault status filtering |
| Eisenhower quadrant | `quadrant/do`, `quadrant/schedule`, `quadrant/delegate`, `quadrant/delete` | Supports Matrix views and visual grouping |
| Technology | `backend/flask`, `database/postgresql`, `api/rest` | Groups technical notes by technology |

## Nested tags

Use `/` to make a tag hierarchy:

```yaml
tags:
  - project/eisenhower-matrix
  - status/open
  - quadrant/do
  - backend/flask
  - database/postgresql
```

This appears in Obsidian’s Tags view as:

```text
project
└── eisenhower-matrix

status
└── open

quadrant
└── do

backend
└── flask

database
└── postgresql
```

## Tag versus property

```yaml
tags:
  - task
  - project/eisenhower-matrix
  - status/open

completed: false
importance: high
urgency: medium
quadrant: schedule
due_at: 2026-10-15T17:00:00+07:00
assignee: "[[Nina]]"
```

Use `tags` for broad classification. Use properties for values that need precise filtering, sorting, calculation, or regular updates.

