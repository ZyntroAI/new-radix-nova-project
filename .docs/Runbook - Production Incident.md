Runbook - Production Incident

# Runbook: Production Incident

Use this runbook to coordinate response to a production incident: establish command, assess user impact, mitigate first, verify recovery, communicate clearly, and capture evidence for a blameless postmortem. The core operating principle is: **stop the bleeding, restore service, then investigate root cause.**[1][2]

```md
---
title: Runbook - Production Incident
aliases:
  - Production Incident Runbook
  - Incident Response Runbook
  - Outage Runbook
  - Service Incident Procedure
cssclasses:
  - runbook
  - incident-response
tags:
  - runbook
  - sre
  - operations
  - production
  - incident-management
  - reliability
  - security/operational
type: runbook
status: active
severity: variable
owner: "[[SRE Team]]"
review_cadence: quarterly
last_reviewed: 2026-10-08
next_review: 2027-01-08
---

# Runbook - Production Incident

> [!danger]
> **Primary objective:** reduce user impact and restore safe service. Do not make unreviewed, broad, or irreversible changes while the incident is active.

## Scope

Use this runbook for a production issue involving one or more of:

- Customer-facing outage or major degradation
- Elevated error rates, latency, or failed background jobs
- Data integrity or availability concerns
- Authentication, authorization, payment, or security-impacting failure
- Failed deployment, infrastructure incident, or third-party dependency outage

For a suspected security breach, credential exposure, or active data exfiltration, also activate [[Security Incident Response]] immediately.

## Severity and declaration

| Severity | Typical impact | Response target | Examples |
|---|---|---|---|
| SEV-1 | Critical or widespread customer impact; material security or data risk | Declare immediately; assemble incident team | Full outage, confirmed data exposure, payments unavailable |
| SEV-2 | Major feature degraded; significant group of users affected | Declare promptly; assign an Incident Commander | High API error rate, login failures for a region |
| SEV-3 | Limited impact; workaround exists; no broad customer outage | On-call responder leads; escalate if impact grows | Intermittent queue delay, one non-critical integration failing |
| SEV-4 | Minor issue, low urgency, or internal-only impact | Create ticket and schedule remediation | Cosmetic defect, noisy but non-actionable alert |

> [!important]
> When unsure, declare the incident at the higher severity. It is easier to downgrade a well-managed incident than recover time lost through delayed coordination.

## Roles

| Role | Assigned to | Responsibilities |
|---|---|---|
| Incident Commander (IC) | `TBD` | Owns coordination, severity, priorities, decisions, and incident closure |
| Operations Lead (Ops) | `TBD` | Performs or assigns technical diagnosis and mitigation |
| Communications Lead (Comms) | `TBD` | Posts stakeholder updates and maintains external/internal communication |
| Scribe | `TBD` | Maintains the timeline, decisions, hypotheses, actions, and evidence |
| Subject-matter experts | `TBD` | Advise and execute bounded technical work under IC coordination |

Only the Operations Lead and explicitly assigned responders should modify production systems. The IC coordinates the response and the Communications Lead is the designated source for updates. [220][223]

## First 10 minutes

1. **Acknowledge** the alert and open an incident channel:
   ```text
   #inc-YYYY-MM-DD-short-description
   ```

2. **Declare** the incident and assign an Incident Commander.

3. **Create the incident record** using the template below.

4. **Assess impact:**
   - Which services, regions, customers, and workflows are affected?
   - When did the incident begin or when was it first detected?
   - Is the impact growing, stable, or recovering?
   - Are data integrity, privacy, security, or financial systems involved?

5. **Freeze nonessential production changes:**
   - Pause deployments, schema migrations, infrastructure changes, and feature-flag rollouts.
   - Record the latest known deployment and configuration changes.

6. **Assign roles:**
   - IC, Ops Lead, Communications Lead, and Scribe.
   - Page service owners or subject-matter experts when needed.

7. **Post the initial update** to the designated stakeholder channel.

## Immediate triage

### Confirm the incident

- [ ] Check the alert source, timestamp, threshold, and affected service.
- [ ] Check customer-facing health indicators: availability, errors, latency, throughput, queue depth, and failed jobs.
- [ ] Compare impact across regions, tenants, deployments, and dependency boundaries.
- [ ] Identify the most recent deploy, configuration change, flag change, certificate rotation, or dependency event.
- [ ] Check status pages for cloud, payment, identity, DNS, CDN, and other external dependencies.
- [ ] Record confirmed facts separately from hypotheses.

### Preserve evidence

- [ ] Link dashboards, logs, traces, alerts, and deployment records in the incident document.
- [ ] Record timestamps in one timezone, preferably UTC.
- [ ] Preserve relevant request IDs, trace IDs, error signatures, and configuration versions.
- [ ] Do not paste secrets, customer personal data, access tokens, or unredacted credentials into incident channels or notes.

## Mitigation ladder

Choose the smallest reversible change that reduces user impact. Confirm its result before making another change.

| Mitigation | Use when | Required verification | Rollback |
|---|---|---|---|
| Roll back deployment | Impact began after a release | Error rate and latency return toward baseline | Redeploy the prior version only after review |
| Disable feature flag | A specific feature causes failures | Affected workflow recovers; dependent metrics stabilize | Re-enable only after validation |
| Shift or drain traffic | One region, cluster, or dependency is unhealthy | Capacity and error metrics remain safe in destination | Restore traffic gradually |
| Scale capacity | Saturation, backlog, CPU, memory, or connection limits are confirmed | Queue depth and latency decline without new saturation | Scale down after stabilization |
| Restart a bounded component | A known safe restart addresses a stuck process | Health checks recover and errors reduce | Stop further restarts if impact worsens |
| Enable degraded mode | A noncritical dependency is failing | Critical user path remains available | Disable after the dependency recovers |
| Rate limit or shed load | Protecting core service is necessary | Core service stays within SLO; impact is contained | Gradually relax limits |

> [!warning]
> Do not run destructive operations, broad database changes, bulk deletions, Terraform apply/destroy, credential rotation, or irreversible data repair as an ad hoc mitigation. Escalate and use a reviewed change process.

## Technical investigation

After user impact is contained:

1. Form 2–3 testable hypotheses.
2. Assign each hypothesis to a named responder.
3. Record the evidence that would confirm or reject it.
4. Avoid multiple responders changing the same system simultaneously.
5. Re-check user impact after each significant action.
6. Distinguish clearly:
   - **Observed:** verified by metrics, logs, traces, or direct reproduction
   - **Hypothesis:** plausible but unconfirmed explanation
   - **Decision:** an action approved by the IC
   - **Action:** change actually performed and its result

### Common checks

- Recent deploys, rollbacks, feature flags, and configuration changes
- Error-rate, latency, saturation, and traffic changes
- Database availability, replication lag, locks, connection usage, and slow queries
- Queue backlog, consumer health, retries, dead-letter queues, and job failures
- Cache eviction, hit ratio, capacity, and connection limits
- DNS, TLS certificate, CDN, load balancer, and network health
- Upstream API status, rate limits, authentication failures, and timeouts
- Resource saturation: CPU, memory, disk, file descriptors, connection pools
- Regional, availability-zone, or tenant-specific patterns

## Verification and recovery

Do not close the incident merely because an alert stopped.

- [ ] Error rate, latency, and availability have returned to a defined safe baseline.
- [ ] Critical user journeys have been manually or synthetically verified.
- [ ] Backlogs, retries, and failed jobs are draining or have a recovery plan.
- [ ] No secondary systems are degraded due to mitigation.
- [ ] Monitoring is stable for the agreed observation period.
- [ ] Any temporary feature flags, capacity changes, traffic shifts, or access changes are documented.
- [ ] A rollback or recovery plan exists for temporary mitigations.

## Communication templates

### Initial internal update

```text
[SEV-X] Investigating: <short incident title>

Impact: <who or what is affected>
Start time: <UTC timestamp or “under investigation”>
Current status: Investigating
Incident Commander: <name>
Next update: <time and timezone>

Known facts:
- <confirmed fact>
- <confirmed fact>

Customer action: <workaround, if any>
```

### Ongoing update

```text
[SEV-X] Update: <short incident title>

Impact: <current customer impact>
Status: Investigating | Mitigating | Monitoring
Actions taken: <completed mitigation or diagnostic action>
Current result: <measured effect>
Next update: <time and timezone>
```

### Resolved update

```text
[SEV-X] Resolved: <short incident title>

Customer impact: <summary and duration>
Resolution: <what restored service>
Current status: Service is operating normally and being monitored.
Follow-up: A blameless postmortem and corrective actions will be tracked at <link>.
```

## Incident timeline

| Time (UTC) | Event | Owner | Evidence / link |
|---|---|---|---|
| `YYYY-MM-DD HH:MM` | Alert fired |  |  |
| `YYYY-MM-DD HH:MM` | Incident declared; IC assigned |  |  |
| `YYYY-MM-DD HH:MM` | Impact confirmed |  |  |
| `YYYY-MM-DD HH:MM` | Mitigation started |  |  |
| `YYYY-MM-DD HH:MM` | Customer impact reduced |  |  |
| `YYYY-MM-DD HH:MM` | Service recovered |  |  |
| `YYYY-MM-DD HH:MM` | Incident closed |  |  |

## Escalation

Escalate immediately when any of the following is true:

- Confirmed or suspected data exposure, unauthorized access, credential compromise, or active exfiltration
- Data loss, corruption, or irreversible integrity risk
- Payment, billing, authentication, or authorization systems are broadly unavailable
- The service is unavailable for more than the defined SLO/error-budget threshold
- A mitigation requires privileged access, irreversible action, or a production database change
- The on-call responder lacks the expertise or authority required to proceed safely
- A third-party dependency needs vendor escalation

## Closure criteria

The Incident Commander may close the incident only when:

- Customer impact is resolved or an explicitly accepted workaround is in place.
- Monitoring has remained stable for the agreed observation period.
- The incident timeline, impact, mitigations, and unresolved risks are documented.
- Ownership of follow-up work is assigned.
- Stakeholders received a final status update.

## Post-incident follow-up

Within the agreed review window:

- [ ] Create a blameless [[Production Incident Postmortem]].
- [ ] Document customer impact, timeline, contributing factors, mitigation, and resolution.
- [ ] Identify corrective actions with an owner and due date.
- [ ] Prioritize prevention work based on recurrence likelihood and impact.
- [ ] Update this runbook, service-specific runbooks, alerts, dashboards, tests, and rollback procedures.
- [ ] Review whether detection, escalation, access, communication, or mitigation steps delayed recovery.

> [!note]
> A postmortem should explain what happened, how users were affected, how the team mitigated the issue, and what changes will prevent recurrence. It should be blameless: focus on systems, decisions, and conditions rather than individual fault.

## Related

- [[On-Call Operations]]
- [[Service Level Objectives]]
- [[Production Incident Postmortem]]
- [[Security Incident Response]]
- [[Deployment Rollback Runbook]]
- [[Database Incident Runbook]]
- [[Disaster Recovery Plan]]
- [[Observability and Alerting]]
```

A useful runbook is a per-service or per-failure-mode guide that tells a responder what to check and do; an incident-management plan supplies the broader severity, roles, escalation, and communication process. Keep this general runbook as the coordination layer, then add focused companions such as `Runbook - API Error Rate Spike`, `Runbook - Database Connection Exhaustion`, or `Runbook - Failed Deployment`.[3][4]

## Keep it operational

Review this runbook after every significant incident and at least quarterly. Test high-risk mitigations—rollback, traffic shifting, degraded mode, and recovery paths—in safe environments or game days; keep dashboard links, owner contacts, and escalation paths current. Clear roles, a living incident document, early declaration, and regular communication materially improve incident response effectiveness.[1][2][5]

การอ้างอิง:
[1] Root Cause Analysis for Probing Incident https://sre.google/workbook/incident-response/
[2] A Managed Incident https://sre.google/sre-book/managing-incidents/
[3] Learn sre incident management and response - Google SRE https://sre.google/resources/practices-and-processes/incident-management-guide/
[4] The incident response process: from alert to postmortem https://clickhouse.com/resources/engineering/incident-response-process
[5] agents/plugins/incident-response/skills/incident-runbook- ... https://github.com/wshobson/agents/blob/main/plugins/incident-response/skills/incident-runbook-templates/SKILL.md
[6] Postmortem Practices for Incident Management - Google SRE https://sre.google/workbook/postmortem-culture/
[7] Anatomy of an incident management handbook - Google SRE https://sre.google/resources/practices-and-processes/anatomy-of-an-incident/
[8] What it Means Being On-Call? | Devops On-Call https://sre.google/workbook/on-call/
[9] Site Reliability Engineering Book Index - Google SRE https://sre.google/workbook/index/
[10] How Google SRE is using agentic AI to improve operations https://cloud.google.com/blog/products/devops-sre/how-google-sre-is-using-agentic-ai-to-improve-operations
[11] How incident management is done at Google https://cloud.google.com/blog/products/gcp/incident-management-at-google-adventures-in-sre-land
[12] How Google SREs Use Gemini CLI to Solve Real-World Outages https://cloud.google.com/blog/topics/developers-practitioners/how-google-sres-use-gemini-cli-to-solve-real-world-outages
[13] [PDF] Large Scale Incident Management at Google – Nov. 2023 - DCU https://doras.dcu.ie/30741/1/EMII%20Nov%202023%20Large%20Scale%20Incident%20Management.pdf
[14] Incident Runbook Templates https://github.com/Dicklesworthstone/pi_agent_rust/blob/main/tests/ext_conformance/artifacts/agents-wshobson/incident-response/skills/incident-runbook-templates/SKILL.md
[15] GitHub - durrello/incident-response-runbooks: SRE incident ... https://github.com/durrello/incident-response-runbooks
