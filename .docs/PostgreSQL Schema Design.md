PostgreSQL Schema Design

```markdown
---
title: "PostgreSQL Schema Design"
aliases:
  - "Postgres schema design"
  - "Database schema design"
  - "PostgreSQL database design"
tags:
  - "postgresql"
  - "database"
  - "schema-design"
  - "supabase"
  - "rls"
type: "guide"
status: "active"
created: "2026-10-11"
updated: "2026-10-11"
review-cycle: "90d"
---

# PostgreSQL Schema Design

> [!summary]
> **Schema** ใน PostgreSQL คือ namespace ที่จัดกลุ่ม tables, views, functions,
> data types และ operators ภายใน database เดียว  
> การออกแบบ schema ที่ดีช่วยแยก domain, จำกัด privileges, รองรับ RLS,
> ลด naming collision และทำให้ database ขยายได้ในระยะยาว

## Core concepts

```text
Database
└── Schema
    ├── Table
    ├── View
    ├── Materialized view
    ├── Function
    ├── Procedure
    ├── Sequence
    ├── Type
    └── Index
```

PostgreSQL schema เป็น namespace ที่มี named objects เช่น tables, data types, functions และ operators โดยชื่อ object สามารถซ้ำกันได้หากอยู่คนละ schema [336][338]

## Schema vs database

| ระดับ | ความหมาย | ใช้เมื่อ |
|---|---|---|
| Database | ฐานข้อมูลแยกสมบูรณ์ | แยก environment หรือ product ที่แยกข้อมูลจริง |
| Schema | Namespace ภายใน database | แยก domain, module หรือ tenant |
| Table | เก็บข้อมูลจริง | จัดเก็บ entity หรือ event |
| View | Query ที่ถูกตั้งชื่อ | สรุปหรือปรับรูปแบบข้อมูล |
| Function | Logic ฝั่ง database | Reusable business logic |

Schema ไม่ใช่การแยก database อย่างสมบูรณ์ ผู้ใช้ที่มี privileges สามารถเข้าถึง object ใน schema อื่นใน database เดียวกันได้ [344]

## Naming conventions

```text
- ใช้ snake_case สำหรับ tables, columns, functions และ indexes
- ใช้ singular table name เช่น user, project, task
- ใช้ plural table name ได้ แต่ต้องสม่ำเสมอทั้งระบบ
- ใช้ schema name สั้น ชัด และอธิบาย domain
- ใช้ prefix ตาม domain เช่น vault_, sync_, agent_, audit_
- หลีกเลี่ยง reserved keywords
- ใช้ snake_case สำหรับ constraint และ index
```

### ตัวอย่าง naming

```text
vault.notes
vault.note_revisions
sync.sync_jobs
sync.sync_conflicts
agent.agent_runs
audit.audit_events
```

## Schema layout

### แบบ Domain-oriented

```text
public
├── users
├── projects
└── tasks

vault
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
```

### แบบ Multi-tenant

```text
public
├── organizations
├── users
└── organization_members

vault
├── vaults
├── notes
└── note_revisions

sync
├── sync_jobs
└── sync_conflicts
```

## Create schema

```sql
create schema if not exists vault;
create schema if not exists sync;
create schema if not exists agent;
create schema if not exists audit;
```

`CREATE SCHEMA` สร้าง namespace ใหม่ใน database ปัจจุบัน และชื่อ schema ต้องไม่ซ้ำกับ schema ที่มีอยู่แล้ว [336][337]

## Qualified names

ใช้ชื่อแบบ qualified เพื่อระบุ schema ชัดเจน:

```sql
select *
from vault.notes;

insert into sync.sync_jobs (
  user_id,
  status
) values (
  auth.uid(),
  'queued'
);
```

PostgreSQL ใช้ `schema.table` เพื่อระบุ object อย่างชัดเจน หรือใช้ `search_path` เพื่อค้นหา object ตามลำดับ schema [338][340]

## Search path

```sql
show search_path;

set search_path to vault, sync, public;
```

> [!warning]
> หลีกเลี่ยงการพึ่ง `search_path` ใน production query  
> ให้ใช้ qualified names เช่น `vault.notes` เสมอ เพื่อลดความเสี่ยงจาก schema shadowing

## Privileges

```sql
-- ให้ role ใช้ schema ได้
grant usage on schema vault to authenticated;

-- ให้ role อ่านตาราง
grant select on vault.notes to authenticated;

-- ให้ role insert/update/delete
grant insert, update, delete on vault.notes to authenticated;

-- ให้ role สร้าง object ใน schema
grant create on schema vault to app_owner;
```

โดยปกติ user ไม่สามารถเข้าถึง object ใน schema ที่ตนไม่ได้เป็นเจ้าของ จนกว่า owner จะ grant `USAGE` ให้ และหากต้องสร้าง object ใน schema นั้นต้องมี `CREATE` privilege [338][342]

## Table design

### users

```sql
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email citext unique not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists users_email_idx
on public.users (email);
```

### vault.notes

```sql
create table if not exists vault.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  content text not null default '',
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint notes_status_check
  check (status in ('draft', 'active', 'archived'))
);

create index if not exists notes_user_id_idx
on vault.notes (user_id);

create index if not exists notes_updated_at_idx
on vault.notes (updated_at desc);

create index if not exists notes_user_updated_idx
on vault.notes (user_id, updated_at desc);
```

### sync.sync_jobs

```sql
create table if not exists sync.sync_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  status text not null default 'queued',
  started_at timestamptz,
  completed_at timestamptz,
  error_message text,
  created_at timestamptz not null default now(),

  constraint sync_jobs_status_check
  check (status in (
    'queued',
    'running',
    'completed',
    'failed',
    'cancelled'
  ))
);

create index if not exists sync_jobs_user_status_idx
on sync.sync_jobs (user_id, status);

create index if not exists sync_jobs_created_at_idx
on sync.sync_jobs (created_at desc);
```

## Data types

| ข้อมูล | Data type ที่แนะนำ |
|---|---|
| Identifier | `uuid` |
| Timestamp | `timestamptz` |
| Date | `date` |
| Amount | `numeric` |
| Boolean | `boolean` |
| JSON | `jsonb` |
| Text | `text` |
| Enum-like value | `text` + `check` หรือ Postgres enum |
| Array | `text[]`, `uuid[]` หรือ `jsonb` |
| Binary | `bytea` |

> [!tip]
> ใช้ `timestamptz` แทน `timestamp` เกือบทุกกรณี  
> เพราะเก็บ timezone-aware timestamp และเหมาะกับระบบ multi-timezone

## Constraints

```sql
alter table vault.notes
add constraint notes_title_not_empty
check (length(trim(title)) > 0);

alter table vault.notes
add constraint notes_updated_at_gte_created_at
check (updated_at >= created_at);
```

### Common constraints

```sql
-- Primary key
primary key (id)

-- Foreign key
references public.users (id) on delete cascade

-- Unique
unique (user_id, title)

-- Check
check (status in ('draft', 'active', 'archived'))

-- Not null
not null
```

## Indexing policy

```sql
-- Foreign key index
create index if not exists notes_user_id_idx
on vault.notes (user_id);

-- Sort query index
create index if not exists notes_updated_at_idx
on vault.notes (updated_at desc);

-- Composite index
create index if not exists notes_user_updated_idx
on vault.notes (user_id, updated_at desc);

-- Partial index
create index if not exists notes_active_idx
on vault.notes (user_id, updated_at desc)
where status = 'active';
```

> [!warning]
> อย่าสร้าง index ทุก column เพราะทำให้ write ช้าและใช้ storage เพิ่ม  
> สร้างจาก query pattern ที่ใช้จริง

## RLS design

Supabase แนะนำให้เปิด RLS และตั้ง grants ให้ตรงกับ application สำหรับทุกตารางใน exposed schema แล้วเขียน policy แยกตาม operation และทดสอบ allow/deny สำหรับ `anon` และ `authenticated` [345]

```sql
alter table vault.notes enable row level security;

create policy "users_select_own_notes"
on vault.notes
for select
to authenticated
using (
  user_id = auth.uid()
);

create policy "users_insert_own_notes"
on vault.notes
for insert
to authenticated
with check (
  user_id = auth.uid()
);

create policy "users_update_own_notes"
on vault.notes
for update
to authenticated
using (
  user_id = auth.uid()
)
with check (
  user_id = auth.uid()
);

create policy "users_delete_own_notes"
on vault.notes
for delete
to authenticated
using (
  user_id = auth.uid()
);
```

Grants กำหนดว่า role ทำ operation กับ table ได้หรือไม่ ส่วน RLS policies กำหนดว่า operation นั้นใช้กับ rows ใดได้ [345]

## RLS policy checklist

```markdown
- [ ] เปิด RLS ทุกตารางที่ expose ผ่าน API
- [ ] จำกัด grants ให้น้อยที่สุด
- [ ] เขียน policy แยกตาม select, insert, update, delete
- [ ] ทดสอบ anon และ authenticated
- [ ] ทดสอบ cross-user access
- [ ] ทดสอบ foreign-key cascade
- [ ] ใช้ `security definer` อย่างระมัดระวัง
- [ ] ตั้ง `search_path = ''` ใน security definer function
- [ ] ใช้ qualified names ใน function
- [ ] มี SQL test สำหรับ allow และ deny cases
```

Supabase แนะนำให้ตั้ง `search_path = ''` ในทุก `security definer` function และใช้ qualified names ภายใน function เพื่อลดความเสี่ยงด้าน security [345]

## Security definer function

```sql
create or replace function vault.get_own_note(
  p_note_id uuid
)
returns setof vault.notes
language sql
security definer
set search_path = ''
as $$
  select *
  from vault.notes
  where id = p_note_id
    and user_id = auth.uid();
$$;
```

## Migration policy

```text
1. สร้าง migration ใหม่ทุกครั้งที่เปลี่ยน schema
2. อย่าแก้ migration ที่ deploy ไปแล้ว
3. ใช้ migration แบบ additive ก่อน
4. แยก destructive migration ออกเป็น release ถัดไป
5. ทดสอบ migration บน staging ก่อน production
6. มี rollback plan สำหรับทุก migration
7. ตรวจ RLS หลัง migration
```

## Schema review checklist

```markdown
- [ ] มี schema แยกตาม domain หรือไม่
- [ ] ทุก table มี primary key
- [ ] ทุก foreign key มี index
- [ ] ทุก timestamp ใช้ timestamptz
- [ ] มี created_at และ updated_at
- [ ] มี constraint สำหรับ status หรือ enum
- [ ] มี index ตาม query pattern
- [ ] เปิด RLS สำหรับตารางที่ expose
- [ ] มี policy สำหรับทุก operation
- [ ] มี SQL test สำหรับ allow/deny cases
- [ ] มี migration และ rollback plan
- [ ] ใช้ qualified names ใน production query
```

## Quick reference

```markdown
| ต้องการทำอะไร | SQL |
|---|---|
| สร้าง schema | `create schema if not exists vault;` |
| อ่านตาราง | `select * from vault.notes;` |
| ให้ role ใช้ schema | `grant usage on schema vault to authenticated;` |
| ให้ role อ่านตาราง | `grant select on vault.notes to authenticated;` |
| เปิด RLS | `alter table vault.notes enable row level security;` |
| จำกัด row ตาม user | `using (user_id = auth.uid())` |
| สร้าง index | `create index ... on vault.notes (...);` |
```

> [!success]
> Schema ที่ดีไม่ใช่แค่การจัดกลุ่มตาราง  
> แต่คือการออกแบบ ownership, privileges, RLS, indexes และ migration path ให้สอดคล้องกันตั้งแต่ต้น
```

การอ้างอิง:
[1] PostgreSQL: Documentation: 16: CREATE SCHEMA https://www.postgresql.org/docs/16/sql-createschema.html
[2] Create Schema https://www.postgresql.org/docs/current/sql-createschema.html
[3] PostgreSQL: Documentation: 18: 5.10. Schemas https://www.postgresql.org/docs/current/ddl-schemas.html
[4] Documentation: 13: Create Schema https://www.postgresql.org/docs/13/sql-createschema.html
[5] PostgreSQL 17 https://www.postgresql.org/docs/17/ddl-schemas.html
[6] Documentation: 12: 5.9. Schemas https://www.postgresql.org/docs/12/ddl-schemas.html
[7] Documentation: 14: 5.9. Schemas https://www.postgresql.org/docs/14/ddl-schemas.html
[8] 5.8. Schemas https://www.postgresql.org/docs/11/ddl-schemas.html
[9] PostgreSQL: Documentation: 15: 5.9. Schemas https://www.postgresql.org/docs/15/ddl-schemas.html
[10] Row Level Security - Docs https://supabase.com/docs/guides/database/postgres/row-level-security
[11] supabase.com › storage › securitysupabase.com https://supabase.com/docs/guides/storage/security/access-control.md
[12] CREATE SCHEMA - PostgreSQL https://docs.postgresql.fr/18/sql-createschema.html
[13] CREATE SCHEMA - PostgreSQL https://docs.postgresql.fr/13/sql-createschema.html
[14] 5.8. Schémas - Documentation PostgreSQL https://docs.postgresql.fr/9.6/ddl-schemas.html
