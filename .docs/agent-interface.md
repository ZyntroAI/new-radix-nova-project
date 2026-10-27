https://chatgpt.com/share/6ac029c6-ae00-83ec-a8c3-10f893b596b0?ogimg=plain

---

type: agent-interface
name: agent-interface
display_name: Agent Interface
version: 2.0.0
status: active
authority: authoritative
source: agent/interface/
category: agent-runtime
owner: ZyntroAI

description: >
Cross-language public contract for agent requests, responses,
lifecycle events, planning, skill execution, validation,
repair, permissions, and observability.

languages:

- python
- typescript
- javascript
- go
- tsx
- jsx

interfaces:

- AgentRequest
- AgentResult
- AgentEvent
- AgentInterface
- AgentContext
- AgentPlan
- AgentStep

lifecycle:
states:
- idle
- planning
- running
- validating
- repairing
- completed
- failed
- cancelled

events:
- agent.created
- agent.started
- plan.created
- plan.updated
- skill.started
- skill.completed
- skill.failed
- validation.started
- validation.passed
- validation.failed
- repair.started
- repair.completed
- repair.failed
- artifact.created
- agent.completed
- agent.failed
- agent.cancelled

architecture:
planner: true
event_bus: true
skill_executor: true
validation: true
repair: true
permissions: true
journal: true
observability: true

integrations:

- skill-registry
- daily-jobs
- test-station
- journal
- obsidian
- github
- github-actions
- kubernetes

execution:
mode: synchronous-or-asynchronous
idempotency: required
source_revision: required
event_ordering: required
structured_errors: required

repair:
enabled: true
max_attempts: 3
require_validation: true
require_human_approval_after: 3

security:
permission_boundary: required
least_privilege: true
high_risk_approval: required
audit_events: required

observability:
journal_events: true
metrics: true
reports: true
trace_id: supported
run_id: required

validation:
schema: required
contract_tests: required
integration_tests: recommended
cross_language_compatibility: required

tags:

- agent
- agent-interface
- runtime
- planner
- executor
- validation
- repair
- event-bus
- skills
- observability
- zyntroai

---

Agent Interface v2

«Cross-language public contract for the ZyntroAI Agent Runtime.»

Architecture

User / API / CLI
       │
       ▼
Agent Interface
       │
       ▼
Agent Request
       │
       ▼
Planner
       │
       ▼
Plan + Skills
       │
       ▼
Skill Registry
       │
       ▼
Permission Check
       │
       ▼
Skill Executor
       │
 ┌─────┼─────────┐
 ▼     ▼         ▼
Execute Validate Repair
 │     │         │
 └─────┼─────────┘
       ▼
 Agent Result
       │
 ┌─────┼──────────┐
 ▼     ▼          ▼
Journal Reports Metrics
       │
       ▼
Obsidian View

Agent State Machine

IDLE
  │
  ▼
PLANNING
  │
  ▼
RUNNING
  │
  ▼
VALIDATING
  │
  ├── PASS ───────► COMPLETED
  │
  └── FAIL
       │
       ▼
    REPAIRING
       │
       ├── FIXED ──► VALIDATING
       │
       └── FAILED
              │
              ▼
            FAILED

Cancellation may occur from any cancellable execution state:

PLANNING
RUNNING
VALIDATING
REPAIRING
    │
    ▼
CANCELLED

Event Contract

Every event MUST contain:

event_id: uuid
type: skill.completed
agent_id: zyntro-agent
run_id: uuid
timestamp: 2026-10-03T00:00:00Z
source_revision: git-sha
skill: test-station
data: {}

Permission Boundary

Agent
  │
  ▼
Skill Registry
  │
  ▼
Permission Check
  │
  ├── allowed ───────► Execute
  │
  ├── approval ──────► Human Approval
  │
  └── denied ────────► Block

High-risk operations MUST pass the configured approval policy.

Example:

skill: kubernetes
risk: high
requires_approval: true

permissions:
  - cluster.read
  - deployment.read
  - deployment.update

Low-risk example:

skill: test-station
risk: low
requires_approval: false

permissions:
  - filesystem.read
  - process.execute

Execution Context

AgentRequest
├── task
├── agent_id
├── run_id
├── context
│   ├── project
│   ├── repository
│   ├── branch
│   └── source_revision
├── skills
├── constraints
├── permissions
└── metadata

The execution context establishes:

Task
 ↓
Project
 ↓
Repository
 ↓
Git SHA
 ↓
Allowed Skills
 ↓
Execution Policy

Planning

Request
   │
   ▼
Planner
   │
   ▼
Plan
   ├── Step 1: inspect
   ├── Step 2: modify
   ├── Step 3: test
   └── Step 4: validate
   │
   ▼
Approval / Policy
   │
   ▼
Executor

Example:

plan_id: plan-001
run_id: run-001

steps:
  - id: step-1
    skill: repository-inspector
    action: inspect

  - id: step-2
    skill: code-editor
    action: modify

  - id: step-3
    skill: test-station
    action: validate

Self-Healing

Execute
   │
   ▼
Validate
   │
   ├── PASS ─────► Complete
   │
   └── FAIL
        │
        ▼
     Diagnose
        │
        ▼
      Repair
        │
        ▼
     Validate
        │
        ├── PASS ──► Complete
        │
        └── FAIL
              │
              ▼
             Retry
              │
              ▼
          Max Attempts
              │
              ▼
            Failed

Repair policy:

repair:
  enabled: true
  max_attempts: 3
  require_validation: true
  require_human_approval_after: 3

Runtime Integration

                 Agent Interface
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    Skill Registry  DailyJobs   Obsidian
          │            │            │
          ▼            ▼            ▼
       Planner       Queue       Context
          │
          ▼
     Skill Executor
          │
          ▼
     Test Station
          │
          ▼
      Validation
          │
     ┌────┴────┐
     ▼         ▼
   PASS       FAIL
     │         │
     │         ▼
     │       Repair
     │         │
     └────┬────┘
          ▼
       Journal
          │
          ▼
        Report

Module Boundary

agent/
├── interface/
│   ├── Agent-Interface.py
│   ├── Agent-Interface.ts
│   ├── Agent-Interface.go
│   └── Agent-Interface.tsx
│
├── core/
│   ├── agent.py
│   ├── planner.py
│   ├── executor.py
│   ├── state.py
│   └── context.py
│
├── events/
│   ├── events.py
│   └── event-bus.py
│
├── policy/
│   ├── permissions.py
│   └── approval.py
│
├── repair/
│   ├── diagnose.py
│   └── repair.py
│
└── validation/
    └── validator.py

The interface layer is the public contract.

The following are internal implementations:

Planner
Executor
Validator
Repair
Policy
Event Bus
Context
State Machine

Public API Boundary

Public API
     │
     ▼
Agent Interface
     │
     ├── Planner
     ├── Policy
     ├── Skill Registry
     ├── Executor
     ├── Validator
     ├── Repair
     └── Event Bus
             │
             ▼
        Agent Runtime

Supported Runtime Targets

CLI
 │
 ├── Python
 ├── TypeScript
 └── Go
 │
 ▼
API
 │
 ▼
Web UI
 │
 ▼
GitHub Actions
 │
 ▼
Kubernetes Worker
 │
 ▼
Obsidian Control Plane

Authority Model

Agent-Interface
      │
      ├── Public Contract
      │
      ├── Event Schema
      │
      └── Runtime Boundary
             │
             ▼
      Authoritative Systems
             │
      ┌──────┼────────┐
      ▼      ▼        ▼
 Skill   DailyJobs  Test Station
Registry     │        │
             ▼        ▼
           Queue    Validation

The interface defines the contract.

It does not become the authority for:

- Skill definitions
- Job queue state
- Test results
- Git repository state
- Kubernetes runtime state
- Journal history

Those remain owned by their respective authoritative systems.

Definition of Done

- [ ] YAML frontmatter validated
- [ ] Agent states defined
- [ ] Event contract defined
- [ ] Request contract defined
- [ ] Result contract defined
- [ ] Execution context defined
- [ ] Plan schema defined
- [ ] Skill permission boundary defined
- [ ] Validation lifecycle defined
- [ ] Repair lifecycle defined
- [ ] Retry limits defined
- [ ] Event ordering defined
- [ ] Run ID required
- [ ] Source revision supported
- [ ] Python implementation compatible
- [ ] TypeScript implementation compatible
- [ ] JSX UI compatible
- [ ] TSX UI compatible
- [ ] Go implementation compatible
- [ ] Cross-language contract tests added
- [ ] Journal integration added
- [ ] Test Station integration added
- [ ] Skill Registry integration added
- [ ] DailyJobs integration added
- [ ] Obsidian synchronization documented
- [ ] Security policy validated
- [ ] Observability implemented