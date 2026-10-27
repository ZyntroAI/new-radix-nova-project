Security Owner

**Security Owner** คือบุคคลหรือบทบาทที่รับผิดชอบด้าน security governance ของ Agent และระบบที่ Agent เข้าถึง—not necessarily the person who writes code or owns the business outcome. หน้าที่หลักคือกำหนด risk boundaries, approval requirements, access-control policy, monitoring criteria และ incident escalation สำหรับงานที่มีความเสี่ยง

ควรกำหนด Security Owner แบบมีชื่อหรือ role ชัดเจนสำหรับ Agent ทุกตัว, credential, integration และ high-risk workflow เพื่อให้มีคนรับผิดชอบเมื่อเกิด permission drift, secret exposure, unusual tool usage หรือ incident[1][2][3]

## แยกบทบาทที่เกี่ยวข้อง

| Role | รับผิดชอบอะไร | ไม่ควรรับผิดชอบแทน |
|---|---|---|
| Business Owner | เป้าหมายธุรกิจ, acceptable risk, ผลลัพธ์ | การออกแบบ security control |
| Technical Owner | โค้ด, integration, runtime, reliability | การอนุมัติ policy/security exception คนเดียว |
| Security Owner | policy, permissions, approval tier, monitoring, incident criteria | แก้ทุก bug หรือบริหาร roadmap |
| Data Owner | สิทธิ์และการใช้ข้อมูล, retention, classification | deploy/runtime implementation |
| Compliance/Privacy Owner | หลักฐาน, regulatory/privacy obligations | เขียน control ทางเทคนิคทุกส่วน |
| Approver | อนุมัติ action เฉพาะครั้งตาม tier | กำหนด security policy ทั้งระบบ |

หลักปฏิบัติที่ดีคือแยก **agent permissions** ออกจาก human permissions, ใช้ least privilege, strong agent identity และ review สิทธิ์เป็นรอบ[2]

## Responsibilities ของ Security Owner

Security Owner ต้องมี authority จริงในการอนุมัติ, ปฏิเสธ, จำกัด, หรือหยุด Agent/workflow ที่เสี่ยง ไม่ควรเป็นชื่อในเอกสารเฉย ๆ

### Governance

- กำหนด `risk` และ `approval_tier` สำหรับ workflow, skill และ integration
- อนุมัติหรือปฏิเสธ security exception
- กำหนด action ที่ Agent ทำเองได้, ต้อง preview, หรือต้อง human approval
- ทบทวน `[[Policy - Approval Rules]]`, `[[Policy - Security]]`, `[[Policy - Agent Permissions]]`
- อนุมัติการเชื่อม connector ใหม่หรือการเพิ่ม tool ที่มีสิทธิ์เขียนข้อมูล

### Access and Secrets

- ออกแบบ least-privilege role สำหรับ Agent
- ตรวจ agent identity, service account, OAuth scopes และ API permissions
- ยืนยันว่าไม่ใช้ shared human credentials
- ดูแล secret lifecycle: issue, rotate, revoke และ decommission
- ทบทวน integration ที่มีสิทธิ์เข้าถึง Supabase, GitHub, Vercel, email หรือ external APIs

### Monitoring and Incident Response

- กำหนด audit fields ที่ต้องเก็บ: agent ID, tool, target, arguments, approval, result และ timestamp
- ตรวจ policy violations, failed approvals, unusual tool usage และ permission drift
- กำหนด threshold สำหรับ escalation เช่น production write, bulk action, export data, public publish หรือ security-policy change
- เป็น escalation point สำหรับ secret exposure, unauthorized action, suspicious automation หรือ sensitive-data incident
- ตรวจและทดสอบ runbook ก่อนเกิด incident โดย runbook ควรระบุ trigger, step-by-step action และ escalation path[4]

## Properties ที่ควรเพิ่ม

อย่าใช้แค่:

```yaml
owner: security
```

เพราะ `owner` อาจหมายถึง technical owner หรือ document owner ได้ ควรแยก property ตาม accountability:

```yaml
---
owner: engineering
technical_owner: platform-engineering
security_owner: security-team
business_owner: product-owner
data_owner: data-governance

approvers:
  - release-manager
  - security-team

escalation_contact: security-oncall
incident_runbook: "[[Runbook - Security Incident]]"
---
```

สำหรับ production หรือ high-risk task:

```yaml
---
type: task
risk: high
approval_tier: T3

technical_owner: platform-engineering
security_owner: security-oncall
business_owner: product-owner

approval_required: true
approval_status: requested
approval_approvers:
  - repository-maintainer
  - security-oncall

escalation_contact: security-oncall
incident_runbook: "[[Runbook - Production Incident]]"
---
```

## ตัวอย่าง Policy

สร้างไฟล์:

```text
03-governance/Policy - Security Owner Responsibilities.md
```

```markdown
---
id: policy-security-owner-responsibilities
title: Security Owner Responsibilities
aliases:
  - Security Owner
  - Agent Security Owner
  - Security Governance Owner
  - Security Accountability
type: policy
domain: security
category: governance
subcategory: ownership
status: active

owner: security
security_owner: security-team
technical_owner: platform-engineering
business_owner: product-owner

risk: critical
approval_tier: T4
review_cycle: quarterly
last_reviewed: 2026-10-04
next_review: 2027-01-04
created: 2026-10-04
updated: 2026-10-04

primary_moc: "[[MOC - Security]]"
secondary_mocs:
  - "[[MOC - AI Agent Operations]]"
  - "[[MOC - Document Operations]]"

governed_by:
  - "[[Policy - Approval Rules]]"
  - "[[Policy - Security]]"
  - "[[Policy - Agent Permissions]]"

applies_to:
  - agent
  - skill
  - workflow
  - connector
  - integration
  - service-account
  - secret
  - production-environment

tags:
  - policy
  - security
  - security/governance
  - security/ownership
  - ai-agents
  - ai-agents/governance
---

# Policy - Security Owner Responsibilities

> [!summary]
> กำหนดบทบาทและ authority ของ Security Owner สำหรับ AI Agents,
> skills, connectors, credentials, workflows และ high-risk production actions

[[security]] [[security/governance]] [[security/ownership]] [[ai-agents]]

## Purpose

Ensure that every production Agent, connector, credential, and high-risk workflow
has a named security owner with authority to define controls, review risk,
approve exceptions, require remediation, and stop unsafe operations.

## Scope

This policy applies to:

- AI Agents and agent identities
- Skills, prompts, workflows, and runbooks
- Tool access, connectors, APIs, webhooks, and integrations
- Supabase, GitHub, Vercel, cloud, email, and external communication systems
- Service accounts, OAuth clients, API keys, secret references, and permissions
- Scheduled jobs, webhooks, production changes, and external actions

## Role Definition

The Security Owner is accountable for security control design and enforcement
requirements for an Agent’s permitted actions.

The Security Owner MUST have authority to:

- Approve or reject high-risk access scope
- Require least-privilege access changes
- Require approval gates and audit logging
- Suspend or disable an unsafe Agent, connector, credential, or workflow
- Require incident response and post-incident remediation
- Approve or reject documented security exceptions

## Responsibilities

### Policy and Risk

- Define risk tiers and approval thresholds.
- Review high-risk and critical workflows before activation.
- Review security-sensitive changes to skills, prompts, tool definitions, and connectors.
- Ensure action scope, blast radius, reversibility, and data sensitivity are assessed.
- Approve security exceptions only with expiry, scope, compensating controls, and owner.

### Identity and Access

- Require distinct Agent identities and prohibit shared human credentials.
- Enforce least privilege, scoped roles, short-lived credentials where possible,
  and separation between human and Agent permissions.
- Review permissions at least quarterly and after material scope changes.
- Review OAuth scopes, service roles, API tokens, deployment permissions, and
  database access before production enablement.
- Require credential rotation and revocation procedures.

### Approval and Audit

- Define which actions require T2, T3, or T4 approval.
- Ensure approval binds to exact tool, target, environment, arguments, and expiry.
- Require audit records for state-changing, external, production, and high-risk actions.
- Review denied, expired, failed, or bypassed approval events.
- Ensure approval cannot be self-issued by the Agent.

### Monitoring and Incident Response

- Define monitoring signals and escalation thresholds.
- Review unusual tool calls, unexpected data access, permission drift, failed
  validations, repeated retries, and anomalous scheduled-job behavior.
- Maintain and test security incident runbooks.
- Coordinate incident response for suspected credential exposure, unauthorized
  access, data leakage, unsafe automation, or policy bypass.
- Require post-incident root-cause analysis and remediation tracking.

## Required Ownership Metadata

Every production Agent and high-risk operational note MUST define:

```yaml
technical_owner: team-or-role
security_owner: team-or-role
business_owner: team-or-role
escalation_contact: team-or-role
incident_runbook: "[[Runbook - Relevant Incident]]"
```

## Approval Authority

| Action | Minimum Approval | Security Owner Requirement |
|---|---|---|
| Read-only analysis | T0 | No approval required |
| Internal reversible change | T1/T2 | Review policy if data/security scope changes |
| Add new connector or expand OAuth scope | T3 | Security Owner approval required |
| Production migration, deploy, cache delete, bulk data write | T3 | Security Owner consulted for high-risk scope |
| Change RLS, IAM, auth policy, security controls, or secrets | T3/T4 | Security Owner approval required |
| Export sensitive data, disable audit logging, change admin ownership | T4 | Security Owner plus independent approver required |
| Incident emergency action | Per runbook | Security Owner notified immediately or as soon as safe |

## Security Exceptions

A security exception MUST include:

```yaml
exception_id: security-exception-id
scope: exact system/action/permission
reason: business justification
risk: high | critical
compensating_controls: []
approved_by: security_owner
approved_at: ISO-8601 timestamp
expires_at: ISO-8601 timestamp
review_date: YYYY-MM-DD
rollback_or_revocation_plan: "[[Runbook - ...]]"
```

Exceptions MUST expire and MUST NOT become permanent access by default.

## Escalation Triggers

Escalate to the Security Owner immediately when:

- A secret, token, API key, private key, password, or credential may be exposed
- Agent attempts an action outside approved scope
- Approval is bypassed, forged, expired, or ambiguous
- Agent identity, permissions, OAuth scope, role, or connector changes unexpectedly
- PII, customer data, private tenant data, or sensitive logs are exposed
- A production system receives unexpected writes, deletes, deployments, or public messages
- Monitoring, audit logging, backups, MFA, WAF, RLS, or security controls are disabled
- A high-risk automation job retries unexpectedly or runs outside its schedule
- A tool, connector, or skill integrity check fails

## Completion Criteria

- [ ] Named Security Owner is recorded
- [ ] Technical, business, and data ownership are identified where applicable
- [ ] Risk tier and approval requirements are defined
- [ ] Permissions are least-privilege and reviewed
- [ ] Audit and monitoring requirements are configured
- [ ] Incident runbook and escalation contact are linked
- [ ] Exceptions are documented, approved, and time-bound
- [ ] Review date is set

## Related Notes

- [[Policy - Approval Rules]]
- [[Policy - Security]]
- [[Policy - Agent Permissions]]
- [[Policy - Secret Management]]
- [[Runbook - Security Incident]]
- [[Runbook - Agent Tool Failure]]
- [[MOC - Security]]
- [[MOC - AI Agent Operations]]
```

Named ownership, documented approval paths, least-privilege boundaries, and audit trails are recurring agent-governance controls; security defines the control model while engineering implements the runtime enforcement.[5][6][7]

## Dataview Queries

### High-risk notes without a Security Owner

```dataview
TABLE
  type AS Type,
  domain AS Domain,
  risk AS Risk,
  technical_owner AS "Technical Owner",
  business_owner AS "Business Owner"
FROM ""
WHERE status = "active"
  AND (
    risk = "high"
    OR risk = "critical"
  )
  AND !security_owner
SORT risk DESC, domain ASC, file.name ASC
```

### Workflows due for Security Review

```dataview
TABLE
  domain AS Domain,
  risk AS Risk,
  security_owner AS "Security Owner",
  last_reviewed AS "Last Reviewed",
  next_review AS "Next Review"
FROM "07-workflows"
WHERE type = "workflow"
  AND status = "active"
  AND (
    risk = "high"
    OR risk = "critical"
  )
  AND (
    !next_review
    OR next_review <= date(today)
  )
SORT next_review ASC, risk DESC
```

### Tasks needing Security Owner involvement

```dataview
TABLE
  priority AS Priority,
  domain AS Domain,
  environment AS Environment,
  approval_tier AS Tier,
  approval_status AS Approval,
  security_owner AS "Security Owner",
  due AS Due
FROM "10-tasks"
WHERE type = "task"
  AND status != "done"
  AND status != "cancelled"
  AND (
    risk = "high"
    OR risk = "critical"
    OR approval_tier = "T3"
    OR approval_tier = "T4"
  )
SORT due ASC, priority ASC
```

## Practical default

หากทีมยังเล็ก ให้เริ่มด้วย ownership matrix นี้:

```yaml
business_owner: product-owner
technical_owner: engineering-lead
security_owner: security-oncall
data_owner: data-owner
escalation_contact: security-oncall
```

ถ้ายังไม่มี security team แยกจริง ๆ ให้ใช้ role ที่มี authority ด้าน production access และ incident response เช่น `engineering-lead` ชั่วคราว แต่ควรระบุชัดว่าเป็น **interim security owner** และแยกหน้าที่/approval สำหรับ action T4 ออกจากคนเดียวกัน เพื่อลด single-person control risk ครับ.

การอ้างอิง:
[1] Govern and secure AI agents https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/governance-security-across-organization
[2] Agent identity and permission management - Agentic AI Lens https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec03.html
[3] AI Agent Security Best Practices for Enterprise Teams https://www.orchid.security/guides/ai-agent-security-best-practices
[4] agentops07-bp04.md https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentops07-bp04.md
[5] cheatsheetseries.owasp.org › cheatsheets › Secure_Coding_withSecure Coding with AI - OWASP Cheat Sheet Series https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html
[6] How should security, compliance, and engineering teams share ... https://nhimg.org/faq/how-should-security-compliance-and-engineering-teams-share-responsibility-for-ai/
[7] What should IAM teams do when AI agents spread across multiple ... https://nhimg.org/faq/what-should-iam-teams-do-when-ai-agents-spread-across-multiple-functions/
[8] AI Governance in the SOC: Who Owns What https://panther.com/blog/ai-governance-responsibilities
[9] AI Security Best Practices for MSPs https://www.huntress.com/msp-guide/ai-agent-security-checklist
[10] AI Agent Governance: Framework, Risks, Controls, and Best ... https://easy-flow.ai/blog/ai-agent-governance-framework
[11] AI Agent Governance Framework: Identity, Authorization, Policy, and ... https://www.encryptionconsulting.com/ai-agent-governance-framework/
[12] Who should be accountable for securing autonomous ... https://nhimg.org/faq/who-should-be-accountable-for-securing-autonomous-systems-across-security-and-pl/
[13] Who should be accountable for risk decisions in ... https://nhimg.org/faq/who-should-be-accountable-for-risk-decisions-in-autonomous-ai-systems/
[14] How to Audit AI Agents: A 12-Domain Enterprise Framework - KLA https://kla.digital/blog/how-to-audit-ai-agent-system
