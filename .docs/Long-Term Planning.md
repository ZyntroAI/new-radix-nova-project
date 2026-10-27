Long-Term Planning , Schema

```markdown
---
title: "Long-Term Planning & Schema"
aliases:
  - "Long-term planning"
  - "Database schema planning"
  - "PostgreSQL schema roadmap"
tags:
  - "planning"
  - "postgresql"
  - "schema-design"
  - "supabase"
  - "roadmap"
type: "guide"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# Long-Term Planning & Schema

> [!summary]
> **Long-Term Planning** คือการออกแบบระบบให้รองรับการเติบโตในอนาคต
> โดยไม่ต้อง rebuild ทั้งหมดเมื่อมี feature, user หรือ integration เพิ่มขึ้น  
> **Schema** คือโครงสร้างของข้อมูลใน PostgreSQL ที่กำหนด tables, columns,
> relationships, constraints และ access rules  
> การวางแผน schema ที่ดีควรเริ่มจาก domain และ workflow จริง ไม่ใช่เริ่มจาก UI

## Planning principles

```text
1. เริ่มจาก use case และ workflow จริง
2. แยก domain ให้ชัดเจน
3. ออกแบบ ownership และ access control ตั้งแต่ต้น
4. ใช้ migration แทนการแก้ schema โดยตรงใน production
5. ออกแบบให้ขยายได้ แต่อย่า over-engineer
6. ทดสอบ RLS และ query performance ตั้งแต่ early stage
7. วางแผน backup, retention และ rollback ล่วงหน้า
```

## Planning horizon

| Horizon | ระยะเวลา | เป้าหมาย |
|---|---|---|
| Short-term | 0–1 เดือน | MVP, core tables, basic RLS |
| Medium-term | 1–6 เดือน | Multi-user, delegation, audit, dashboard |
| Long-term | 6–18 เดือน | Multi-tenant, analytics, integrations, scale |
| Strategic | 18+ เดือน | Platform, API ecosystem, advanced governance |

## MVP schema

```text
public.users
public.projects
tasks.tasks
tasks.task_status_history
tasks.task_delegations
audit.audit_events
```

### Core entities

```text
User
├── owns Tasks
├── delegates Tasks
└── belongs to Organization

Task
├── belongs to User
├── may be delegated to User or Agent
├── has Status
├── has Quadrant
└── has Due date

TaskStatusEvent
└── records status changes

AuditEvent
└── records important actions
```

## Long-term schema layout

```text
public
├── users
├── organizations
├── organization_members
└── invitations

tasks
├── tasks
├── task_status_events
├── task_delegations
├── task_comments
└── task_attachments

vault
├── vaults
├── notes
├── note_revisions
├── attachments
└── note_links

sync
├── sync_jobs
├── sync_files
├── sync_conflicts
└── sync_logs

agent
├── agents
├── agent_skills
├── agent_runs
└── agent_permissions

audit
├── audit_events
└── audit_sessions

analytics
├── task_metrics
└── productivity_metrics
```

## Create schemas

```sql
create schema if not exists public;
create schema if not exists tasks;
create schema if not exists vault;
create schema if not exists sync;
create schema if not exists agent;
create schema if not exists audit;
```

## Core tables

### users

```sql
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email citext unique not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### tasks

```sql
create table if not exists tasks.tasks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users (id) on delete cascade,
  delegate_id uuid references public.users (id) on delete set null,
  title text not null,
  description text not null default '',
  status text not null default 'open',
  urgency text not null default 'medium',
  importance text not null default 'medium',
  quadrant text not null default 'schedule',
  due timestamptz,
  delegated_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint tasks_status_check
  check (status in (
    'open',
    'delegated',
    'in-progress',
    'waiting-review',
    'changes-requested',
    'completed',
    'cancelled'
  )),

  constraint tasks_urgency_check
  check (urgency in (
    'low',
    'medium',
    'high',
    'critical'
  )),

  constraint tasks_importance_check
  check (importance in (
    'low',
    'medium',
    'high',
    'critical'
  )),

  constraint tasks_quadrant_check
  check (quadrant in (
    'do',
    'schedule',
    'delegate',
    'delete'
  ))
);

create index if not exists tasks_owner_status_idx
on tasks.tasks (owner_id, status);

create index if not exists tasks_delegate_status_idx
on tasks.tasks (delegate_id, status);

create index if not exists tasks_due_idx
on tasks.tasks (due asc)
where status not in ('completed', 'cancelled');
```

### task_status_events

```sql
create table if not exists tasks.task_status_events (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references tasks.tasks (id) on delete cascade,
  actor_id uuid references public.users (id) on delete set null,
  from_status text,
  to_status text not null,
  reason text,
  created_at timestamptz not null default now()
);

create index if not exists task_status_events_task_idx
on tasks.task_status_events (task_id, created_at desc);
```

### audit_events

```sql
create table if not exists audit.audit_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_events_user_idx
on audit.audit_events (user_id, created_at desc);

create index if not exists audit_events_entity_idx
on audit.audit_events (entity_type, entity_id);
```

## Long-term planning matrix

| พื้นที่ | Short-term | Medium-term | Long-term |
|---|---|---|---|
| Task management | CRUD, status, due date | Delegation, recurrence, dependencies | Workflow automation, SLA |
| Security | Basic RLS | Granular RLS, audit | Policy testing, compliance |
| Storage | Private bucket | Versioning, retention | Lifecycle policies |
| Integration | Supabase Storage | GitHub Actions, Calendar | External APIs, MCP |
| AI agents | Read-only assistant | Delegation, skills | Multi-agent orchestration |
| Reporting | Basic Dataview | Dashboards, metrics | Analytics warehouse |
| Multi-tenancy | Single user | Organization members | Tenant isolation |

## Schema evolution

```text
MVP
   ↓
Add delegation
   ↓
Add audit trail
   ↓
Add organizations
   ↓
Add multi-tenant isolation
   ↓
Add analytics
   ↓
Add integrations
```

### Migration principles

```markdown
1. สร้าง migration ใหม่ทุกครั้งที่เปลี่ยน schema
2. อย่าแก้ migration ที่ deploy ไปแล้ว
3. ใช้ additive migration ก่อน
4. แยก destructive migration ออกเป็น release ถัดไป
5. ทดสอบ migration บน staging
6. มี rollback plan ทุก migration
7. ตรวจ RLS หลัง migration
```

## RLS long-term policy

```sql
alter table tasks.tasks enable row level security;

create policy "users_select_own_or_delegated_tasks"
on tasks.tasks
for select
to authenticated
using (
  owner_id = auth.uid()
  or delegate_id = auth.uid()
);

create policy "users_insert_own_tasks"
on tasks.tasks
for insert
to authenticated
with check (
  owner_id = auth.uid()
);

create policy "owners_update_own_tasks"
on tasks.tasks
for update
to authenticated
using (
  owner_id = auth.uid()
)
with check (
  owner_id = auth.uid()
);

create policy "delegates_update_assigned_tasks"
on tasks.tasks
for update
to authenticated
using (
  delegate_id = auth.uid()
)
with check (
  delegate_id = auth.uid()
);
```

## Multi-tenant planning

```text
Organization
├── Members
├── Projects
├── Tasks
├── Vaults
└── Integrations
```

```sql
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),

  primary key (organization_id, user_id),

  constraint organization_members_role_check
  check (role in ('owner', 'admin', 'member', 'viewer'))
);

create index if not exists organization_members_user_idx
on public.organization_members (user_id);
```

## Retention policy

| ข้อมูล | Retention |
|---|---|
| Active tasks | เก็บตราบใดที่ยังใช้งาน |
| Completed tasks | เก็บ 12 เดือน แล้ว archive |
| Cancelled tasks | เก็บ 90 วัน แล้ว archive |
| Sync logs | เก็บ 180 วัน |
| Audit events | เก็บ 12 เดือน หรือตาม compliance requirement |
| Agent session logs | เก็บ 90 วัน แล้ว archive |
| Backups | เก็บ 30 วัน และเก็บ monthly snapshot 1 ปี |

## Planning checklist

```markdown
- [ ] ระบุ use cases หลัก
- [ ] ระบุ entities และ relationships
- [ ] กำหนด ownership และ access model
- [ ] ออกแบบ multi-tenant หรือ single-user
- [ ] กำหนด status lifecycle
- [ ] ออกแบบ audit trail
- [ ] ออกแบบ retention policy
- [ ] ออกแบบ indexes จาก query pattern
- [ ] ออกแบบ RLS policies
- [ ] ออกแบบ migration path
- [ ] ออกแบบ backup และ recovery
- [ ] ทดสอบ performance และ security
```

## Quick reference

```markdown
| ประเด็น | คำถามหลัก |
|---|---|
| Domain | ระบบนี้มี entities อะไรบ้าง |
| Ownership | ใครเป็นเจ้าของข้อมูล |
| Access | ใครอ่าน เขียน หรือลบได้ |
| Lifecycle | ข้อมูลมีสถานะอะไรบ้าง |
| Scale | จะรองรับ user และ tenant เพิ่มอย่างไร |
| Audit | ต้องตรวจสอบ action ใดบ้าง |
| Retention | เก็บข้อมูลนานแค่ไหน |
| Recovery | กู้คืนอย่างไรเมื่อเกิดปัญหา |
```

> [!success]
> Long-term planning ไม่ใช่การคาดเดาทุก feature ในอนาคต  
> แต่คือการออกแบบ schema ให้มี ownership, access control, lifecycle และ migration path ที่ชัดเจน  
> เพื่อให้ระบบเปลี่ยนแปลงได้โดยไม่ต้องทำลายโครงสร้างเดิม
```

