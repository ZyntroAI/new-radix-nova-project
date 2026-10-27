Generate an incident command roles checklist

Below is a copy-ready **Incident Command Roles Checklist** for an Obsidian runbook. Assign the four core roles within the first five minutes of a major incident: Incident Commander, Operations/Technical Lead, Communications Lead, and Scribe. Clear separation lets the IC coordinate recovery rather than becoming overloaded with hands-on debugging, stakeholder updates, and note-taking.[1][2]

```md
---
title: Incident Command Roles Checklist
aliases:
  - Incident Roles Checklist
  - Incident Command Checklist
  - IC Roles and Responsibilities
  - Outage Response Roles
cssclasses:
  - runbook
  - incident-response
  - checklist
tags:
  - runbook
  - sre
  - operations
  - incident-management
  - production
  - checklist
type: checklist
status: active
owner: "[[SRE Team]]"
review_cadence: quarterly
last_reviewed: 2026-10-08
---

# Incident Command Roles Checklist

> [!important]
> **Response objective:** restore safe service and reduce user impact first. Root-cause analysis, permanent fixes, and follow-up work come after impact is controlled.

## Incident details

| Field | Value |
|---|---|
| Incident title |  |
| Severity | `SEV-1` / `SEV-2` / `SEV-3` / `SEV-4` |
| Declared at | `YYYY-MM-DD HH:MM UTC` |
| Incident channel |  |
| Incident document |  |
| Affected services |  |
| Customer impact |  |
| Incident Commander |  |
| Operations Lead |  |
| Communications Lead |  |
| Scribe |  |
| Next update time |  |

## First five minutes

- [ ] Acknowledge the alert or reported issue
- [ ] Confirm there is a credible production impact or elevated risk
- [ ] Declare the incident and assign an initial severity
- [ ] Create the incident channel, for example `#inc-YYYY-MM-DD-short-title`
- [ ] Create or link the incident record
- [ ] Name the Incident Commander
- [ ] Assign Operations/Technical Lead
- [ ] Assign Communications Lead
- [ ] Assign Scribe
- [ ] State the immediate objective, such as “Restore checkout availability”
- [ ] Identify affected services, regions, customer groups, and critical workflows
- [ ] Set the first internal update deadline
- [ ] Pause nonessential production deployments and changes
- [ ] Page service owners or subject-matter experts as needed

## Role assignments

| Role | Person | Backup | Status |
|---|---|---|---|
| Incident Commander |  |  | `Assigned` / `Unassigned` |
| Operations Lead |  |  | `Assigned` / `Unassigned` |
| Communications Lead |  |  | `Assigned` / `Unassigned` |
| Scribe |  |  | `Assigned` / `Unassigned` |
| Security Lead, if needed |  |  | `Assigned` / `Not needed` |
| Vendor or dependency liaison, if needed |  |  | `Assigned` / `Not needed` |

## Incident Commander

**Owns:** coordination, severity, priorities, staffing, decisions, escalation, and incident closure.

- [ ] Announce command ownership in the incident channel
- [ ] Confirm severity and update it as impact changes
- [ ] Define and repeat the immediate recovery objective
- [ ] Assign every investigation or mitigation action to one accountable person
- [ ] Ensure each action has an expected outcome and a verification signal
- [ ] Keep responders focused on mitigation before root-cause analysis
- [ ] Approve or reject proposed production changes according to change policy
- [ ] Avoid becoming the primary hands-on operator unless staffing is insufficient
- [ ] Request additional responders, service owners, vendor support, or leadership help early
- [ ] Run a regular check-in cadence, usually every 10–15 minutes for SEV-1 or SEV-2
- [ ] Confirm the Communications Lead is posting updates on schedule
- [ ] Decide when to escalate, downgrade, hand off, or close the incident
- [ ] Confirm recovery criteria before declaring resolution
- [ ] Assign postmortem ownership and follow-up tracking before closure

> [!note]
> The Incident Commander does not need to be the deepest technical expert. Their job is to manage state, priorities, decisions, and resources so technical responders can investigate and mitigate effectively. [238][243]

## Operations Lead

**Owns:** technical investigation, mitigation proposals, execution coordination, and recovery validation.

- [ ] Confirm the affected service, environment, region, and customer workflow
- [ ] Gather current dashboards, alerts, logs, traces, error signatures, and deployment history
- [ ] Identify recent deployments, configuration changes, flag changes, capacity events, and dependency changes
- [ ] Separate confirmed observations from unverified hypotheses
- [ ] Create a small set of testable hypotheses
- [ ] Assign technical investigations to named responders
- [ ] Propose the smallest reversible mitigation first
- [ ] State risk, rollback path, expected result, and verification metric before each production action
- [ ] Coordinate execution so multiple responders do not modify the same system simultaneously
- [ ] Re-check user impact after every material change
- [ ] Track temporary changes: feature flags, rate limits, traffic shifts, capacity adjustments, and manual repairs
- [ ] Verify critical customer journeys after recovery
- [ ] Confirm queues, retries, replication, caches, and secondary systems are recovering
- [ ] Hand unresolved technical risks and follow-up work to the postmortem owner

> [!warning]
> Do not perform destructive or irreversible operations during an incident without explicit approval, a rollback plan when possible, and documentation in the incident timeline. This includes broad data changes, credential rotation, infrastructure apply/destroy, or unreviewed production migrations.

## Communications Lead

**Owns:** accurate, timely internal and external updates; stakeholder questions; and status-page coordination.

- [ ] Identify audiences: responders, engineering leadership, support, customer success, partners, and customers
- [ ] Post an initial update with confirmed impact, status, IC, and next update time
- [ ] Use only verified facts; label uncertainty clearly
- [ ] Do not present a hypothesis as root cause
- [ ] Publish updates on the agreed schedule even when there is no material change
- [ ] Maintain a single source of truth for stakeholder communication
- [ ] Coordinate external statements with the approved authority
- [ ] Capture known workarounds and provide them to support teams
- [ ] Keep customer-facing language clear, specific, and free of internal-only details
- [ ] Announce impact reduction, recovery, monitoring, and resolution as confirmed
- [ ] Save final communications links in the incident record
- [ ] Record communication follow-ups for the postmortem

### Initial update template

```text
[SEV-X] Investigating: <short title>

Impact: <affected users, service, workflow, or region>
Start time: <UTC time or “under investigation”>
Status: Investigating
Incident Commander: <name>
Next update: <time and timezone>

Known facts:
- <confirmed fact>
- <confirmed fact>

Workaround: <if known>
```

### Recovery update template

```text
[SEV-X] Monitoring: <short title>

Impact: <current impact; state whether it is reduced or resolved>
Action taken: <confirmed mitigation>
Result: <verified metric or customer-path result>
Status: Monitoring recovery
Next update: <time and timezone>
```

## Scribe

**Owns:** real-time timeline, decisions, actions, evidence links, and unresolved follow-ups.

- [ ] Start the timeline at first alert or first known customer impact
- [ ] Record all timestamps in UTC
- [ ] Capture role assignments and handoffs
- [ ] Record exact incident severity changes and the reason for each change
- [ ] Record confirmed impact statements and evidence links
- [ ] Log each meaningful action: owner, start time, outcome, and rollback if applicable
- [ ] Distinguish facts, hypotheses, decisions, and completed actions
- [ ] Record key dashboards, alerts, trace IDs, log searches, deployment IDs, and vendor ticket links
- [ ] Capture customer and stakeholder updates with timestamps
- [ ] Track decisions that need follow-up after recovery
- [ ] Maintain an action-item list with a named owner
- [ ] Confirm that the final timeline is complete before incident closure
- [ ] Prepare the timeline for the blameless postmortem

### Timeline format

| Time (UTC) | Type | Event | Owner | Evidence / result |
|---|---|---|---|---|
| `HH:MM` | Alert | Error-rate alert triggered | Monitoring | `<dashboard link>` |
| `HH:MM` | Decision | Declared SEV-2 | IC | Customer checkout failures confirmed |
| `HH:MM` | Action | Rolled back release `vX.Y.Z` | Ops Lead | Error rate declining |
| `HH:MM` | Comms | Internal update posted | Comms Lead | `<message link>` |
| `HH:MM` | Recovery | Checkout verified | Ops Lead | Synthetic test passed |

## Optional roles

### Security Lead

Assign if there is suspected unauthorized access, data exposure, credential compromise, malware, or active exfiltration.

- [ ] Activate [[Security Incident Response]]
- [ ] Preserve evidence and avoid modifying compromised systems unnecessarily
- [ ] Restrict access and revoke credentials only through an approved containment plan
- [ ] Coordinate legal, privacy, compliance, and executive escalation where required
- [ ] Determine notification obligations with authorized stakeholders

### Vendor or dependency liaison

Assign when a cloud provider, payment processor, identity provider, CDN, DNS service, or critical third party may be involved.

- [ ] Open a vendor support case
- [ ] Record ticket ID, severity, support channel, and vendor contact
- [ ] Share only approved diagnostic information
- [ ] Track vendor updates and translate them into incident-relevant impact
- [ ] Escalate according to contractual support terms if impact is severe

### Planning Lead

Assign for extended SEV-1 incidents or multi-team incidents.

- [ ] Track parallel workstreams and dependencies
- [ ] Maintain a rolling 30–60 minute action plan
- [ ] Identify resource gaps and escalation needs
- [ ] Prepare shift handoff notes for long-running incidents
- [ ] Keep remediation, recovery, and investigation work clearly separated

## Decision checkpoints

At each check-in, the Incident Commander confirms:

- [ ] What is the current customer impact?
- [ ] Is the impact improving, stable, or worsening?
- [ ] What is the immediate recovery objective?
- [ ] Which mitigations are underway, and who owns them?
- [ ] What evidence supports each current hypothesis?
- [ ] Are any actions risky, irreversible, or outside the approved change boundary?
- [ ] Do we need more responders, a vendor escalation, or security/legal review?
- [ ] Was the scheduled stakeholder update sent?
- [ ] What must be true before recovery can be declared?
- [ ] When is the next command check-in?

## Handoff checklist

Use when the Incident Commander, Operations Lead, Communications Lead, or Scribe changes.

- [ ] Name outgoing and incoming role holders
- [ ] Confirm current severity and customer impact
- [ ] State the current recovery objective
- [ ] List active investigations, mitigation actions, owners, and expected completion times
- [ ] Identify all risky or temporary production changes
- [ ] Link the incident timeline, dashboards, logs, and communication channel
- [ ] State the next stakeholder update deadline
- [ ] State the next command check-in time
- [ ] Confirm the incoming owner accepts the handoff

## Closure checklist

- [ ] User impact is resolved or an approved workaround is in place
- [ ] Availability, latency, errors, and backlog metrics are stable
- [ ] Critical customer workflows are verified
- [ ] Temporary mitigations and residual risks are documented
- [ ] Final stakeholder update has been sent
- [ ] Incident timeline is complete
- [ ] Postmortem owner and due date are assigned
- [ ] Corrective actions have named owners and tracking links
- [ ] Runbook improvements are captured

## Related

- [[Runbook - Production Incident]]
- [[Production Incident Postmortem]]
- [[Security Incident Response]]
- [[On-Call Operations]]
- [[Service Level Objectives]]
- [[Deployment Rollback Runbook]]
- [[Observability and Alerting]]
```

## Small-team adaptation

If fewer than four people are available, combine roles deliberately rather than leaving responsibilities implicit:

| Responders available | Suggested assignment |
|---:|---|
| 1 | One person coordinates, investigates, communicates minimal updates, and records a short timeline; escalate early |
| 2 | Person A: IC + Communications + brief notes. Person B: Operations/technical response |
| 3 | Person A: IC. Person B: Operations. Person C: Communications + Scribe |
| 4+ | Keep IC, Operations, Communications, and Scribe separate |

For a two-person incident, protect the operator’s attention: the IC should avoid hands-on changes unless necessary, and the operator should not be interrupted with stakeholder questions. As the incident grows or communications become frequent, split Communications and Scribe roles first.[3][4]

การอ้างอิง:
[1] Incident management best practices: Complete guide 2026 | Blog https://incident.io/blog/incident-management-best-practices-2026
[2] How should an incident runbook be designed: detect, mitigate ... https://www.ixc.co.kr/en/insights/incident-response-runbook
[3] How to Run Incident Command Safely with Combined ... https://oneuptime.com/blog/post/2026-09-29-small-team-incident-command-roles/view
[4] Handoff Checklist https://oneuptime.com/blog/post/2026-01-30-sre-incident-response-procedures/view
[5] AI Incident Response From Alert Triage to Post- ... https://www.tencentcloud.com/techpedia/148009
[6] How Incident Management Roles Should Evolve as Your ... https://www.uptimelabs.io/learn/incident-management-roles
[7] Incident Management for SRE: Building Resilient Response Systems https://ataiva.com/incident-management-sre/
[8] Incident Response Framework: SEV Classification and ... https://www.sre.wang/en/posts/sre-incident-response-framework/
[9] Incident Commander: Roles, Responsibilities and Best ... https://rootly.com/incident-response/incident-commander
[10] GitHub - nitinpanchal2011/SRE-Templates: Here you shall find ... https://github.com/nitinpanchal2011/SRE-Templates
[11] [PDF] Don't Panic Effective Incident Response - GitHub Pages https://conf42.github.io/static/slides/Conf42%20SRE%202021%20Slides%20-%20Quintessence%20Anx.pdf
