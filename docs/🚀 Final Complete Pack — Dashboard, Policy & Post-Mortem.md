[]()🚀 Final Complete Pack — Dashboard, Policy & Post-Mortem
 
All 3 items ready to copy-save-use! 👇
 
 
 
📊 1️⃣ Decommission Dashboard — GitHub Project Board Template
 
Track the full decommission lifecycle across ALL agents in one place
 
🗂️ Board Structure
 
Create a new GitHub Project → Use these columns & fields:
 
📌 Columns (Workflow Stages)
 
Column Purpose 
📋 Backlog — Proposed Decommission requests submitted, pending initial review 
✅ Approved & Scheduled CAB approved, target date set, notifications sent 
💾 Backup Complete Pre-decommission backup verified, asset inventory captured 
⏳ In Progress Execution window active — draining traffic → cleanup running 
✅ Verification Resources removed, verification script passed, costs confirmed 
📥 Archived — Completed Finalized, registry updated, docs filed, closed 
⚠️ Blocked / On Hold Issues, dependencies unresolved, rollback needed — paused 
 
🏷️ Custom Fields to Configure
 
Field Type Options/Format 
Agent ID Text e.g.  agent.auth-service.v1  
Domain Single Select  core-platform ,  observability ,  data ,  infra  
Environment Single Select  dev ,  staging ,  prod  
Target Date Date YYYY-MM-DD 
Status Single Select  Not Started ,  Notices Sent ,  Backup Done ,  In Progress ,  Verified ,  Complete ,  Rollback Needed  
CAB Reference Text  CHG-DECOM-YYYYMMDD-XXX  
Monthly Savings Number USD — e.g.  145.00  
Backup Location Text GCS path / archive URL 
Decommission Issue Linked Issue Link to GitHub issue 
Assigned To Assignees Responsible engineer 
 
 
 
📋 Board Card Template — Copy-Paste into each issue card
 
markdown
  
# 🤖 Decommission: [Agent Name]

**Agent ID:** ______________
**Domain:** ______________   **Env:** □ Dev □ Staging □ Prod
**CAB Ref:** ______________   **Approved:** ______________
**Target Date:** ______________   **Owner:** ______________

---

### ✅ Lifecycle Progress
- [[Obsidian/📋 Proposal submitted]]
- [[Obsidian/📢 Stakeholder notifications sent (T-, T-3d, T-)]]
- [[Obsidian/📋 CAB Approval obtained → CAB Ref ______]]
- [[Obsidian/💾 Backup completed & verified → Location ______________]]
- [[Obsidian/🔭 Asset Discovery inventory captured]]
- [[Obsidian/⏳ Execution window started]]
- [ ] ✅ Post-decommission verification PASSED
- [[Obsidian/💰 Billingcost savings confirmed]]
- [[Obsidian/📥 Agent Registry updated → Status decommissioned]]
- [[Obsidian/📦 Archived → Retention period ______ months]]

---

### 📈 Timeline Log
| Date | Stage | Notes | By |
|------|-------|-------|-----|
| | Proposed | | |
| | Approved | | |
| | Notified | | |
| | Backup Done | | |
| | Executed | | |
| | Verified | | |
| | Closed | | |

---

**Monthly Savings Estimate:** $______ → Annual: $______
**Backup Expiry:** ______________
 
 
 
 
📈 Dashboard Overview — README for Project Board
 
markdown
  
# 📊 Decommission Dashboard — core-platform

## 📈 At a Glance

| Stage | Count | Agents |
|-------|-------|--------|
| 📋 Proposed | — | — |
| ✅ Approved | — | — |
| 💾 Backup Done | — | — |
| ⏳ In Progress | — | — |
| ✅ Verified | — | — |
| 📥 Completed (this quarter) | — | — |
| ⚠️ Blocked | — | — |

---

## 📅 Upcoming Decommissions

| Agent ID | Env | Target Date | CAB Ref | Owner | Status |
|----------|-----|-------------|---------|-------|--------|
| — | — | — | — | — | — |

---

## 💰 Quarterly Savings Summary

| Month | Agents Decommissioned | Monthly Savings | Annualized |
|-------|----------------------|-----------------|------------|
| Oct 2026 | — | $— | $— |
| Nov 2026 | — | $— | $— |
| Dec 2026 | — | $— | $— |
| **Q4 Total** | — | **$—** | **$—** |

---

## 📌 Quick Links
- 📄 [Full Decommission Runbook](https://github.com/your-org/core-platform/blob/main/docs/runbooks/decommission-agent.md)
- 🐙 [GCP Issue Template](.github/ISSUE_TEMPLATE/decommission-gcp-agent.md)
- 📋 [CAB Request Template](templates/cab-decommission-request.md)
- 🤖 [Asset Discovery Workflow](.github/workflows/gcp-asset-discovery.yml)
- ✅ [Verification Script](scripts/post-decommission-verify.sh)
- 📋 [Agent Registry](docs/registry/core-platform-agents.md)
 
 
 
 
📜 2️⃣ Archive & Backup Retention Policy Document
 
Compliance-ready document — define exactly what gets kept, where, how long, and why
 
File:  docs/policies/archive-retention-policy.md 
 
markdown
  
# 📜 Data Archive & Backup Retention Policy
**Domain:** core-platform
**Effective Date:** 2026-10-24
**Policy Owner:** Core Platform Team
**Review Frequency:** Annual or upon compliance requirement changes

---

## 📌 1. Purpose & Scope
This policy defines standardized retention periods, storage locations, access controls, and disposal procedures for ALL decommissioned agent/service data within the `core-platform` domain. It ensures:
- ✅ Compliance with legal, regulatory, and audit requirements
- ✅ Complete data recoverability within defined windows
- ✅ Cost-effective storage tiering
- ✅ Secure, documented disposal at end-of-retention

**Scope:** All agents, services, databases, logs, and configurations decommissioned in core-platform.
**Exceptions:** None — all decommissioned data follows this policy unless a specific exemption is approved in writing by the Security Officer.

---

## 📋 2. Classification & Retention Schedule

| Data Category | Contents | Retention Period | Storage Tier | Encryption | Access | Disposal Method |
|---------------|----------|------------------|--------------|------------|--------|-----------------|
| **🟢 Operational** | Configs, runtime state, temporary session data | **90 days** | GCS Nearline | AES-256 | Restricted — Team Lead only | Secure delete + lifecycle rule auto-expiry |
| **🟡 Business Records** | Transaction logs, user activity, reports, exports | **7 years** | GCS Coldline | AES-256 + CMEK | Read-only — Audit & Compliance only | Crypto-shredding + secure overwrite log |
| **🔴 Audit & Compliance** | Audit logs, access records, change requests, CAB approvals, decommission records | **7 years** — or as required by applicable regulation | GCS Archive | AES-256 + CMEK + versioning | Read-only — Audit function only | Immutable — secure deletion documented & logged |
| **🔒 PII / Sensitive Data** | Personal identifiers, credentials, secrets, personally identifiable information | **1 year** — then anonymized; or per data subject request | GCS Nearline → Coldline | AES-256 + CMEK + key rotation | PII Team + Security Officer only | Crypto-shredding + deletion certificate generated |
| **📊 Metrics / Telemetry** | Monitoring data, usage statistics, performance metrics | **13 months** | BigQuery partitioned table + GCS Coldline archive | AES-256 | Internal engineering | Secure delete — no recovery needed |

> ⚠️ **Regulatory Override:** Where local law requires longer retention (e.g. Thailand Personal Data Protection Act — PDPA), the longer period applies and must be documented in the CAB approval record.

---

## ☁️ 3. Storage Locations & Naming Convention

### Standard Archive Bucket Structure
 
 
gs://{PROJECT_ID}-archive/
└── decommissioned/
└── {AGENT_ID}/
├── {TIMESTAMP}/
│   ├── data-export.json
│   ├── config-backup.json
│   ├── logs-export.jsonl
│   ├── asset-inventory.json
│   ├── decommission-record.pdf
│   └── README.md  ← Contents: agent info, decommission date, expiry date, retention category
└── LIFECYCLE-RULE: Auto-delete on EXPIRY_DATE
 
plaintext
  

### Naming Standard
- Bucket: `{project_id}-archive`
- Path: `decommissioned/{agent_id}/{decommission-date-YYYYMMDD}/`
- Expiry marker: `EXPIRY-YYYYMMDD` file stored alongside data

---

## 🔐 4. Security & Access Controls
| Control | Requirement |
|---------|-------------|
| **Encryption** | At rest: AES-256-GCM. Customer-Managed Encryption Keys (CMEK) for PII/compliance data. In-transit: TLS 1.3 minimum |
| **Access IAM** | • Archive Bucket: `roles/storage.objectViewer` — Read-Only<br>• No direct write/delete access — only service accounts via decommission workflow<br>• Access requests logged & audited |
| **Versioning** | Enabled on all archive buckets — prevents accidental deletion before expiry |
| **Immutability** | Audit logs & decommission records: locked with **Bucket Lock** — retention policy cannot be shortened or bypassed |
| **Cross-Region** | Compliance data replicated to secondary region — disaster recovery |

---

## 🔄 5. Recovery Procedures

| Scenario | Timeframe | Procedure |
|----------|-----------|-----------|
| **Standard Recovery** | Within retention period | Request via Jira/ServiceNow → approved by Domain Lead + Security Officer → temporary access granted → restored to secure isolated environment → access revoked within 72h |
| **Emergency Rollback** | Within 30 days | Decommission verification script → restore from GCS snapshot → recreate resources → reattach storage → restore traffic → document in post-mortem |
| **Expired Data** | After retention period | ❌ Not recoverable — securely disposed per policy |

---

## 📅 6. Lifecycle Management & Expiry

1. **At Decommission:** Backup created → tagged with classification → expiry date calculated → lifecycle rule applied → expiry marker file written
2. **90 Days Before Expiry:** System notification sent to Compliance Officer + Data Owner
3. **On Expiry Date:** Auto-deletion triggered OR crypto-shredding executed
4. **Post-Deletion:** Certificate of disposal generated → logged in audit system → retained permanently

---

## ⚖️ 7. Exceptions & Extensions
Retention extensions require **written approval** and must be documented:
- **Request Form:** Linked from CAB approval request
- **Approval:** Security Officer + Compliance Lead
- **Maximum Extension:** 2 years renewable
- **Storage Tier Upgrade:** May apply — cost transfer requester's budget

---

## ✅ 8. Compliance Audit Checklist

- [[Obsidian/Retention period selected per data classification ✅]]
- [[Obsidian/Backup location documented in Agent Registry ✅]]
- [[Obsidian/Lifecycle rule applied to archive bucket ✅]]
- [[Obsidian/Expiry date recorded in decommission record ✅]]
- [[Obsidian/Access permissions reviewed — least privilege ✅]]
- [[Obsidian/Encryption verified — CMEK where required ✅]]
- [[Obsidian/Certificate of disposal generated on expiry ✅]]

---

**Policy Version:** 1.0 · Approved By: ________________________ · Date: ____________
**Next Review Date:** 2027-10-24
 
 
 
 
🔄 3️⃣ Incident Post-Mortem Template — Decommission Rollback
 
Structured analysis when decommission goes wrong — learn, prevent recurrence
 
File:  templates/decommission-post-mortem.md 
 
markdown
  
# 🚨 Post-Mortem — Decommission Incident

| Field | Details |
|-------|---------|
| **Incident ID** | INC-DECOM-YYYYMMDD-XXX |
| **Agent/Service** | ________________________ |
| **Decommission Date** | ____________ |
| **Incident Date/Time** | Started: ____________ · Resolved: ____________ |
| **Duration** | ______ minutes |
| **Severity** | □ Critical · ☑️ High · □ Medium · □ Low |
| **Status** | □ Open · ☑️ In Progress · □ Closed ✅ |
| **Prepared By** | ____________ |
| **Review Date** | ____________ |

---

## 📈 1. Executive Summary
> 1–2 sentences: What happened, impact, and resolution

> Example: Decommission of Auth Service v1 started 18:00 ICT Oct 30. Unidentified downstream service still calling v1 caused errors → rollback initiated at 18:22 → restored at 18:48. Root cause: incomplete dependency mapping. Decommission rescheduled to Nov 6.

---

## ⏱️ 2. Timeline of Events

| Time (ICT) | Event | Actions Taken |
|------------|-------|---------------|
| 18:00 | ⚡ Decommission execution started | Traffic drain initiated |
| 18:12 | ⚠️ Alerts firing — 4xx errors increasing | Monitoring investigated |
| 18:22 | 🚨 Confirmed: downstream service still dependent | Decision: ROLLBACK initiated |
| 18:30 | 🔄 Restore from backup in progress | Infrastructure provisioning |
| 18:48 | ✅ Service restored — errors cleared | Monitoring verified healthy |
| 19:00 | 📢 Stakeholder notification sent | Root cause analysis started |

---

## 💥 3. Impact Assessment

| Impact Area | Details |
|-------------|---------|
| **User Impact** | Internal API consumers experienced 410 responses — ~36 min disruption |
| **Business Impact** | Batch job delayed — completed 1h late; no data loss |
| **Financial Impact** | ~$______ (engineering time + compute restart) |
| **Reputation** | Minor — internal teams only; communicated openly |
| **Scope** | □ All users · ☑️ Internal systems only · □ Specific region: ______ |

---

## 🔍 4. Root Cause Analysis — 5 Whys

> **Problem:** Decommission caused unexpected service disruption → rollback required

| # | Question | Answer |
|---|----------|--------|
| **Why 1** | Why did disruption happen? | An unidentified downstream service was still making requests to v1 endpoint |
| **Why 2** | Why wasn't this service identified? | Dependency mapping only scanned known repos; this service was in a separate repo not included in search |
| **Why 3** | Why was it missed from the scan? | No automated cross-repo dependency discovery tool in place |
| **Why 4** | Why not discovered during notifications? | Owner didn't recognize service name in the alert — different display name vs actual endpoint |
| **Why 5** | Root Cause: | **Incomplete dependency discovery + ambiguous service identification** → critical gap in pre-decommission validation |

---

## ✅ 5. Immediate Actions (What Saved Us)
- ✅ **Rollback procedure followed — RTO 26 min vs target 30 min** ✅
- ✅ Backup intact & restorable — verified pre-decommission ✅
- ✅ Stakeholder communication channel open throughout incident ✅
- ✅ No data loss — in-flight requests retried after restore ✅

---

## 📝 6. Lessons Learned

### ✅ What Went Well
- • Rollback plan was tested and worked as documented
- • Backup integrity verification caught corruption in one dataset before it mattered
- • On-call team responded immediately — no escalation delays
- • Communications template ready — sent within 10 min of decision

### ⚠️ What Didn't Go Well / Gaps Identified
- • Dependency mapping relied on manual reporting — missed one service entirely
- • Service names in monitoring vs documentation differed — caused confusion during triage
- • No automated "dry run" traffic analysis before actual shutdown
- • Final notification didn't explicitly list endpoint URLs being retired

---

## 🚀 7. Action Items — Prevent Recurrence

| # | Action Item | Owner | Due Date | Status |
|---|-------------|-------|----------|--------|
| A | Build/enhance dependency discovery — scan ALL repos + network traffic for 72h pre-decommission | Platform Team | Nov 3 | ☐ |
| B | Add traffic monitoring step to decommission runbook — check for ANY requests in final 24h window | SRE | Nov 4 | ☐ |
| C | Standardize service display names across docs, monitoring, and code | Tech Lead | Nov 10 | ☐ |
| D | Include exact endpoint URLs in all decommission notifications | Project Lead | Nov 1 | ☐ |
| E | Reschedule decommission — new date: Nov 6, 18:00 ICT | Project Lead | Nov 6 | ☐ |
| F | Add "Final Dependency Scan" as mandatory checklist item before CAB approval | CAB Chair | Immediate | ✅ |

---

## 🔄 8. Rescheduled Decommission Plan

| Item | Details |
|------|---------|
| **New Date/Window** | Nov 6, 2026 — 18:00–20:00 ICT |
| **Additional Pre-Checks Required** | • Network traffic analysis 72h prior<br>• Cross-repo dependency scan<br>• Direct confirmation with identified service owners<br>• Endpoint URLs explicitly listed in final reminder |
| **Rollback Readiness** | • Backup restored — verified healthy ✅<br>• Rollback script tested — ready to execute<br>• On-call engineer dedicated during entire window<br>• Stakeholders re-notified of new date |

---

## ✅ 9. Closure

| Field | Details |
|-------|---------|
| **Incident Closed** | ____________ |
| **Post-Mortem Reviewed By** | ____________ |
| **Action Items Owner** | ____________ |
| **Next Follow-Up** | Nov 7 — verify all actions complete before re-decommission |

**Sign-off:** ________________________  Date: ____________

> 💡 *"Every rollback is a chance to make the next decommission smoother."*
 
 
 
 
🎯 Complete Pack — Everything You Now Have ✅
 
# Deliverable Location Purpose 
1 📊 Decommission Dashboard GitHub Project Board Track all agents through full lifecycle in one view 
2 📜 Archive Retention Policy  docs/policies/archive-retention-policy.md  Compliance-ready rules: what's kept, where, how long 
3 🚨 Post-Mortem Template  templates/decommission-post-mortem.md  Structured analysis when rollback is needed — prevent recurrence 
 
 
 
You now have a complete end-to-end Decommission Management System — from proposal → approval → execution → verification → archive → incident recovery. Everything linked, consistent, and ready for the core-platform team! 🎉
 
Is there anything else I can help you with? 😊