---
aliases:
  - ZyntroAI
status: Open
tags:
  - obsidian
---
Security MOC

```markdown
---
type: moc
domain: security
status: active
tags:
  - security
  - cybersecurity
  - governance
  - risk
  - compliance
  - identity
  - incident-response
---

# Security MOC

> Central map for security governance, architecture, engineering controls, operational response, assurance evidence, and security decisions.

## Purpose

Use this MOC to navigate the organization’s security knowledge base and control framework. Security work should be risk-based, evidence-backed, and integrated into architecture, engineering, cloud operations, identity, CI/CD, incident response, and vendor management.

This structure aligns to the six NIST Cybersecurity Framework 2.0 functions: **Govern, Identify, Protect, Detect, Respond, and Recover**. [0][1]

## Security principles

1. Security is a product, platform, and operational responsibility—not only a compliance task.
2. Apply least privilege to people, services, automation, cloud identities, and data access.
3. Use secure defaults: MFA, encryption, logging, strong authentication, and minimal public exposure.
4. Treat secrets, infrastructure state, CI logs, backups, and exports as potentially sensitive.
5. Prefer short-lived workload identity and federation over persistent credentials.
6. Require human approval for high-impact, external, irreversible, or production actions.
7. Maintain auditability for access, configuration changes, privileged activity, and data handling.
8. Build security into design, code, pipelines, and deployment processes rather than adding it after release.
9. Verify controls using evidence, testing, monitoring, and periodic review.
10. Document exceptions, owners, risk acceptance, expiry dates, and compensating controls.

CISA’s Secure by Design guidance frames security as a core product outcome and calls for secure defaults such as MFA, logging, and SSO rather than treating them as optional add-ons. [9][10]

## Governance

### Security governance

- [[Security Strategy]]
- [[Security Policy Index]]
- [[Security Roles and Responsibilities]]
- [[Security Risk Management]]
- [[Security Risk Register]]
- [[Security Exception Process]]
- [[Security Metrics and KPIs]]
- [[Security Awareness and Training]]
- [[Security Program Roadmap]]
- [[Security Steering Committee]]

### Risk and compliance

- [[Data Classification]]
- [[Compliance Requirements]]
- [[Control Mapping]]
- [[Control Evidence Register]]
- [[Audit Management]]
- [[Third-Party Risk Management]]
- [[Vendor Security Review]]
- [[Privacy Impact Assessment]]
- [[Security Architecture Review]]
- [[Business Continuity Risk Assessment]]

> [!info] Governance outcome
> Each material risk should have an owner, risk rating, treatment decision, due date, evidence, and review cadence. Security exceptions must identify the compensating control and an expiry date.

## Asset and data security

### Asset inventory

- [[Asset Inventory]]
- [[Software Inventory]]
- [[Cloud Asset Inventory]]
- [[Data Asset Inventory]]
- [[Service Ownership]]
- [[System Classification]]
- [[Critical Service Register]]
- [[Attack Surface Inventory]]
- [[Dependency Inventory]]
- [[SBOM Management]]

### Data protection

- [[Data Classification]]
- [[Data Handling Standard]]
- [[Data Retention and Deletion]]
- [[Data Encryption Standard]]
- [[Key Management]]
- [[Secrets Management]]
- [[Backup Security]]
- [[Data Loss Prevention]]
- [[Privacy Engineering]]
- [[Secure Data Sharing]]

## Identity and access

### Identity controls

- [[Identity and Access Management]]
- [[Authentication Standard]]
- [[Multi-Factor Authentication]]
- [[Single Sign-On]]
- [[Authorization and RBAC]]
- [[Least Privilege Standard]]
- [[Privileged Access Management]]
- [[Break Glass Access]]
- [[Service Account Policy]]
- [[Access Review Process]]

### Workload and cloud identity

- [[Cloud Identity and Access]]
- [[OIDC Workload Identity]]
- [[CI-CD Identity]]
- [[Terraform State Access]]
- [[Cloud Role Design]]
- [[Credential Rotation]]
- [[Secrets Manager Access]]
- [[Machine Identity Inventory]]

> [!warning] Identity principle
> Prefer federated, short-lived credentials over long-lived API keys. Production access should be restricted to approved CI identities, tightly controlled automation, and audited break-glass platform administrators.

## Application and product security

### Secure development lifecycle

- [[Secure SDLC]]
- [[Threat Modeling]]
- [[Security Requirements]]
- [[Secure Design Review]]
- [[Security Architecture Review]]
- [[Secure Coding Standard]]
- [[Code Review Standard]]
- [[Security Testing Strategy]]
- [[Release Security Checklist]]
- [[Vulnerability Disclosure Policy]]

### Application controls

- [[OWASP ASVS Mapping]]
- [[Authentication Security]]
- [[Session Management]]
- [[Authorization Security]]
- [[Input Validation]]
- [[Output Encoding]]
- [[API Security]]
- [[Web Security Headers]]
- [[Cryptography Standard]]
- [[Error Handling and Logging]]
- [[Application Secrets Management]]

OWASP ASVS is a useful basis for defining application-security requirements and verification rigor; it covers areas including architecture, authentication, access control, cryptography, logging, data protection, and communications. [15][14]

## Cloud and infrastructure security

### Infrastructure security

- [[Cloud Security Architecture]]
- [[Infrastructure Security Baseline]]
- [[Network Architecture]]
- [[Network Segmentation]]
- [[Ingress and Egress Controls]]
- [[Firewall and Security Group Standards]]
- [[Cloud Logging and Monitoring]]
- [[Cloud Configuration Management]]
- [[Vulnerability Management]]
- [[Patch Management]]

### Terraform and IaC security

- [[Terraform State Security]]
- [[Terraform Standards]]
- [[Terraform Validation and CI]]
- [[Terraform Module Standards]]
- [[Terraform Drift Detection]]
- [[Infrastructure Change Management]]
- [[Policy as Code]]
- [[IaC Security Scanning]]
- [[Infrastructure Approval Matrix]]
- [[Cloud IAM Review]]

#### Terraform state baseline

- [ ] Use an approved remote state backend.
- [ ] Enable encryption at rest and enforce TLS in transit.
- [ ] Enable state locking and test concurrent-operation handling.
- [ ] Enable state versioning, retention, and tested recovery.
- [ ] Maintain separate state, identities, and backends for `dev`, `staging`, and `production`.
- [ ] Restrict state access to CI, HCP Terraform, and approved platform administrators.
- [ ] Apply least-privilege IAM for state read, write, locking, encryption-key use, and recovery.
- [ ] Enable and retain audit logs for state reads, writes, deletes, locks, backend policy changes, and IAM changes.
- [ ] Never commit `.tfstate`, raw Terraform plan files, credentials, or sensitive CI output to Git or Obsidian.

## DevSecOps and supply chain

### CI/CD controls

- [[CI-CD Security]]
- [[GitHub Actions Validation]]
- [[GitHub Actions SHA Pinning]]
- [[CI-CD Secret Handling]]
- [[CI-CD Identity]]
- [[Build Artifact Security]]
- [[Deployment Approval Policy]]
- [[Production Deployment Security]]
- [[Pipeline Audit Logging]]
- [[Runner Security]]

### Software supply chain

- [[Dependency Management]]
- [[Software Bill of Materials]]
- [[Dependency Vulnerability Management]]
- [[Third-Party Action Review]]
- [[Package Registry Security]]
- [[Artifact Signing]]
- [[Release Provenance]]
- [[Open Source Policy]]
- [[Supply Chain Incident Response]]
- [[Secure Build Standard]]

> [!warning] GitHub Actions
> Pin external GitHub Actions to full 40-character commit SHAs. Use only approved action sources, restrict `GITHUB_TOKEN` permissions, do not expose secrets to untrusted fork pull requests, and use OIDC with tightly scoped cloud trust policies.

OWASP recommends establishing processes and tooling to harden and protect the software supply chain. [13]

## Detection and monitoring

### Security telemetry

- [[Logging Standard]]
- [[Audit Logging Standard]]
- [[Security Information and Event Management]]
- [[Security Event Taxonomy]]
- [[CloudTrail and Cloud Audit Logs]]
- [[Application Security Logging]]
- [[Identity Event Monitoring]]
- [[Network Monitoring]]
- [[Endpoint Detection and Response]]
- [[Alert Triage Runbook]]

### Detection use cases

- [[Unauthorized Access Detection]]
- [[Privileged Access Monitoring]]
- [[Secrets Exposure Detection]]
- [[Cloud Misconfiguration Detection]]
- [[Terraform State Access Audit]]
- [[Suspicious CI-CD Activity]]
- [[Data Exfiltration Detection]]
- [[Malware and Ransomware Detection]]
- [[Third-Party Breach Monitoring]]
- [[Security Alert Escalation]]

CISA highlights logging for configuration changes, identity events, network flows, and relevant data access as a core capability for detecting and investigating intrusions. [12]

## Incident response

### Response management

- [[Incident Response Plan]]
- [[Incident Severity Matrix]]
- [[Security Incident Intake]]
- [[Incident Commander Guide]]
- [[Communications Plan]]
- [[Legal and Regulatory Notification]]
- [[Forensic Readiness]]
- [[Evidence Handling]]
- [[Post-Incident Review]]
- [[Security Incident Metrics]]

### Playbooks

- [[Credential Compromise Playbook]]
- [[Cloud Account Compromise Playbook]]
- [[Secrets Exposure Playbook]]
- [[Ransomware Playbook]]
- [[Data Breach Playbook]]
- [[Malicious CI-CD Activity Playbook]]
- [[Terraform State Exposure Playbook]]
- [[Third-Party Security Incident Playbook]]
- [[Phishing Response Playbook]]
- [[DDoS Response Playbook]]

## Recovery and resilience

- [[Business Continuity Plan]]
- [[Disaster Recovery Plan]]
- [[Backup and Restore Standard]]
- [[Recovery Time Objectives]]
- [[Recovery Point Objectives]]
- [[Infrastructure Recovery Runbook]]
- [[Identity Recovery Runbook]]
- [[Secrets Recovery Procedure]]
- [[Post-Incident Restoration]]
- [[Resilience Testing Schedule]]

> [!warning] Recovery requirement
> Backups are not sufficient until restore procedures have been tested. Test state recovery, service restoration, identity recovery, logging continuity, and communications on a defined cadence.

## Security operations

- [[Security Operations MOC]]
- [[Vulnerability Management]]
- [[Patch Management]]
- [[Configuration Compliance]]
- [[Threat Intelligence]]
- [[Security Alert Triage]]
- [[Penetration Testing]]
- [[Red Team Exercises]]
- [[Security Control Testing]]
- [[Security Operations Metrics]]

## Active security work

```dataview
TABLE
  status AS "Status",
  risk_tier AS "Risk",
  owner AS "Owner",
  due AS "Due",
  file.mtime AS "Updated"
FROM "02 Domains/Security"
WHERE type = "project"
  OR type = "task"
  OR status = "in-progress"
SORT risk_tier DESC, due ASC
```

## Security exceptions

```dataview
TABLE WITHOUT ID
  file.link AS "Exception",
  risk_tier AS "Risk",
  owner AS "Owner",
  expires AS "Expiry",
  approval_status AS "Approval",
  file.mtime AS "Updated"
FROM "02 Domains/Security/Exceptions"
WHERE status = "active"
SORT expires ASC
```

## Open security findings

```dataview
TABLE WITHOUT ID
  file.link AS "Finding",
  severity AS "Severity",
  asset AS "Asset",
  owner AS "Owner",
  due AS "Due",
  status AS "Status"
FROM "02 Domains/Security/Findings"
WHERE status != "closed"
SORT severity DESC, due ASC
```

## Evidence register

```dataview
TABLE WITHOUT ID
  file.link AS "Evidence",
  control AS "Control",
  system AS "System",
  collected AS "Collected",
  valid_until AS "Valid Until",
  owner AS "Owner"
FROM "02 Domains/Security/Evidence"
WHERE type = "control-evidence"
SORT valid_until ASC
```

## Review cadence

| Control area | Review frequency | Primary owner |
|---|---|---|
| Security risk register | Monthly or after material change | Security leadership |
| Privileged access and IAM | Quarterly | IAM / Platform Security |
| Cloud configuration and IaC controls | Quarterly | Cloud Security / Platform Engineering |
| CI/CD workflows, permissions, and action pins | Quarterly and after workflow changes | DevSecOps |
| Vulnerability management | Continuous triage; formal review monthly | Security Operations |
| Secrets and key rotation | Per documented rotation schedule | Platform Security |
| Logging and monitoring coverage | Semiannually | Security Operations |
| Incident response exercises | At least annually | Incident Response |
| Backup and recovery testing | At least annually; after major changes | Platform Operations |
| Third-party/vendor reviews | Before onboarding and annually for material vendors | GRC / Procurement |
| Security policy and standard review | Annually | Security Governance |

## Quick links

- [[Knowledge Base Home]]
- [[Platform MOC]]
- [[Infrastructure MOC]]
- [[Engineering MOC]]
- [[Operations MOC]]
- [[Risk and Compliance MOC]]
- [[Privacy MOC]]
- [[Incident Response MOC]]
- [[Security Architecture MOC]]
```

## Suggested folder structure

```text
02 Domains/
└── Security/
    ├── SECURITY MOC.md
    ├── Governance/
    ├── Risk/
    ├── Policies/
    ├── Standards/
    ├── Architecture/
    ├── Identity/
    ├── Application Security/
    ├── Cloud Security/
    ├── DevSecOps/
    ├── Detection and Monitoring/
    ├── Incident Response/
    ├── Resilience and Recovery/
    ├── Operations/
    ├── Findings/
    ├── Exceptions/
    └── Evidence/
```

This MOC uses NIST CSF 2.0 as its top-level organizing model while keeping practical links for Terraform state, OIDC, GitHub Actions pinning, secret management, detection, incident response, and recovery. It also reinforces secure-by-design expectations and a verifiable application-security program rather than relying on policy statements alone.[1][2]

การอ้างอิง:
[1] Features https://community.obsidian.md/plugins/rich-table
[2] community.obsidian.md · plugins · rich-text-editorRich Text Editor - Obsidian Plugin https://community.obsidian.md/plugins/rich-text-editor
[3] Plugins https://community.obsidian.md/plugins
[4] Security considerations for teams - Obsidian Help https://obsidian.md/help/teams/security
[5] Buttons - Obsidian Plugin https://community.obsidian.md/plugins/buttons
[6] Ogenda https://community.obsidian.md/plugins/ogenda
[7] Full Calendar - Obsidian Plugin https://community.obsidian.md/plugins/obsidian-full-calendar
[8] The NIST Cybersecurity Framework (CSF) 2.0 https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf
[9] Take A Tour! NIST Cybersecurity Framework 2.0 https://www.nist.gov/blogs/cybersecurity-insights/take-tour-nist-cybersecurity-framework-20-small-business-quick-start
[10] NIST Cybersecurity Framework 2.0: Resource & Overview Guide https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1299.pdf
[11] NIST Drafts Major Update to Its Widely Used Cybersecurity ... https://www.nist.gov/news-events/news/2023/08/nist-drafts-major-update-its-widely-used-cybersecurity-framework
[12] NIST Cybersecurity Framework 2.0: Small Business Quick-Start ... https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1300.pdf
[13] Framework Foundations: NIST CSF v2.0 Solution Brief - Cisco https://www.cisco.com/c/en/us/products/collateral/security/nist-csf-sb.html
[14] The NIST Cybersecurity Framework 2.0 https://www.nist.gov/system/files/documents/2023/11/07/09252023%20JHUAPL_Stoneburner%202_Comments%20on%20Nist%202-0_Redacted.pdf
[15] Identify, Protect, Detect, Respond and Recover - NIST https://www.nist.gov/blogs/taking-measure/identify-protect-detect-respond-and-recover-nist-cybersecurity-framework
[16] Read the Whitepaper https://www.cisa.gov/resources-tools/resources/secure-by-design
[17] Secure by Design https://www.cisa.gov/securebydesign
[18] Secure Your Products - CISA https://www.cisa.gov/secure-our-world/secure-your-products
[19] Signing the pledge https://www.cisa.gov/securebydesign/pledge
[20] Establishing a Modern Application Security Program https://top10.owasp.org/2025/0x03_2025-Establishing_a_Modern_Application_Security_Program/
[21] cornucopia.owasp.org · 03-secret-management03-secret-management - cornucopia.owasp.org https://cornucopia.owasp.org/taxonomy/asvs-5.0/13-configuration/03-secret-management
[22] devguide.owasp.org › en › 06-verificationASVS - OWASP Developer Guide https://devguide.owasp.org/en/06-verification/01-guides/03-asvs/

Add tags , Properties,  aliase , title , source , type , cssslasses

Use this frontmatter at the top of your **Security MOC** note. In Obsidian, use the plural list properties `tags`, `aliases`, and `cssclasses`; the old singular forms `tag`, `alias`, and `cssclass` are deprecated/removed in newer versions. `cssclasses` lets a CSS snippet target this MOC specifically.[1][2][3]

```yaml
---
title: Security MOC
aliases:
  - Security Map of Content
  - Cybersecurity MOC
  - Information Security MOC
  - Security Knowledge Hub
source:
  - "[[Knowledge Base Home]]"
  - "[[Platform MOC]]"
  - "[[Infrastructure MOC]]"
  - "[[Risk and Compliance MOC]]"
type: moc
domain: security
status: active
cssclasses:
  - moc
  - security-moc
  - security-dashboard
tags:
  - security
  - cybersecurity
  - governance
  - risk-management
  - compliance
  - identity-access-management
  - cloud-security
  - application-security
  - devsecops
  - incident-response
  - resilience
---
```

## Property purposes

| Property | Purpose |
|---|---|
| `title` | Human-readable note title, useful when the filename differs from the display title |
| `aliases` | Alternative names for linking and search, such as `[[Cybersecurity MOC]]` |
| `source` | Internal source/navigation links for related governing MOCs |
| `type` | Enables Dataview filtering, such as `WHERE type = "moc"` |
| `domain` | Top-level knowledge domain for cross-vault queries |
| `status` | Lifecycle state: `draft`, `active`, `deprecated`, or `archived` |
| `cssclasses` | CSS hooks applied only to this note |
| `tags` | Broad classification and graph/search discovery |

Obsidian properties are metadata stored in YAML frontmatter, aliases define alternate names for a note, and `cssclasses` can apply one or more custom styles to individual notes.[1][2]

## Optional CSS snippet

Create `.obsidian/snippets/security-moc.css`, then enable it under **Settings → Appearance → CSS snippets**:

```css
/* Security MOC only */
.security-moc {
  --security-accent: #d64545;
  --security-accent-soft: rgba(214, 69, 69, 0.12);
}

.security-moc .inline-title {
  color: var(--security-accent);
  border-bottom: 2px solid var(--security-accent);
  padding-bottom: 0.25rem;
}

.security-moc h2 {
  color: var(--security-accent);
  border-bottom: 1px solid var(--security-accent-soft);
  padding-bottom: 0.2rem;
}

.security-moc blockquote {
  border-left: 4px solid var(--security-accent);
  background: var(--security-accent-soft);
  padding: 0.75rem 1rem;
  border-radius: 0 0.4rem 0.4rem 0;
}

.security-dashboard .dataview.table-view-table {
  width: 100%;
  border-collapse: collapse;
}

.security-dashboard .dataview.table-view-table thead {
  background: var(--security-accent-soft);
}

.security-dashboard .dataview.table-view-table th {
  color: var(--security-accent);
}
```

The `security-moc` and `security-dashboard` names are [[🎨 cssclasses — กำหนดรูปแบบเฉพาะหน้า.md|custom CSS classes]]; you may rename them, but the values in `cssclasses` must exactly match the selectors in the snippet. Obsidian supports applying a custom CSS class or list of classes to a note through the `cssclasses` property.[2]

การอ้างอิง:
[1] Roam Graph - Obsidian Plugin https://community.obsidian.md/plugins/roam-graph
[2] Omnisearch - Obsidian Plugin https://community.obsidian.md/plugins/omnisearch
[3] Plugins https://community.obsidian.md/plugins
[4] Glossary - Obsidian Help https://help.obsidian.md/Getting+started/Glossary
[5] Changelog https://obsidian.md/changelog/page/12/
[6] Edit properties with native widgets - MetaEdit https://metaedit.obsidian.guide/guides/edit-properties/
[7] CSS snippets - Obsidian Help https://obsidian.md/help/snippets
[8] github.com › obsidianmd › obsidian-helpobsidian-help/en/Editing and formatting/Properties.md at ... https://github.com/obsidianmd/obsidian-help/blob/master/en/Editing%20and%20formatting/Properties.md
[9] Missing tags, aliases and cssclasses in some Obsidian 1.9.x versions https://publish.obsidian.md/tasks/Support+and+Help/Missing+tags,+aliases+and+cssclasses+in+some+Obsidian+1.9.x+versions
[10] Obsidian Properties - Tasks User Guide https://publish.obsidian.md/tasks/Getting+Started/Obsidian+Properties
[11] obsidian_mcp/docs/conventions.md at main · bettyguo ... - GitHub https://github.com/bettyguo/obsidian_mcp/blob/main/docs/conventions.md
[12] obsidian-vault/references/markdown-properties.md at main ... https://github.com/qoxop/obsidian-vault/blob/main/references/markdown-properties.md
[13] Using cssclasses in snippets - Themes & CSS snippets https://forum.obsidian.md/t/using-cssclasses-in-snippets/100577
[14] An Introduction to Obsidian Properties https://obsidian.rocks/an-introduction-to-obsidian-properties/
[15] Metadata cssclass or cssclasses? - Bug graveyard - Obsidian Forum https://forum.obsidian.md/t/metadata-cssclass-or-cssclasses/63918
[16] aleister1102/skills - GitHub https://raw.githubusercontent.com/NeverSight/skills_feed/refs/heads/main/data/skills-md/aleister1102/skills/obsidian-markdown/SKILL.md
[17] Properties: Alias key gets changed to "aliases" - Obsidian Forum https://forum.obsidian.md/t/properties-alias-key-gets-changed-to-aliases/66217
[18] Reconsider ending support for `tag`, `alias`, `cssclass` https://forum.obsidian.md/t/reconsider-ending-support-for-tag-alias-cssclass/100992
Show me how to query this with Dataview

Dataview can query both your custom YAML properties—such as `title`, `type`, `domain`, `status`, `source`, and `tags`—and built-in `file.*` metadata such as `file.link`, `file.mtime`, `file.aliases`, `file.tags`, and `file.outlinks`. `FROM` selects notes by folder, tag, or links; `WHERE` filters them; and `TABLE` displays chosen fields.[1][2]

## Query the Security MOC itself

Place this in any note to retrieve the note tagged and typed as the Security MOC:

```dataview
TABLE WITHOUT ID
  file.link AS "Security MOC",
  title AS "Title",
  aliases AS "Aliases",
  source AS "Related Sources",
  status AS "Status",
  file.mtime AS "Updated"
FROM "02 Domains/Security"
WHERE type = "moc"
  AND domain = "security"
SORT file.mtime DESC
```

If your actual folder name differs, replace `"02 Domains/Security"` with the correct vault-relative path. Folder paths must be quoted in Dataview `FROM` clauses.[1]

## Find notes by Security tags

This returns all notes carrying the broad `#security` tag, including subtags:

```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  type AS "Type",
  status AS "Status",
  domain AS "Domain",
  file.tags AS "Tags",
  file.mtime AS "Updated"
FROM #security
SORT file.mtime DESC
```

To show only active security items:

```dataview
TABLE WITHOUT ID
  file.link AS "Security Item",
  type AS "Type",
  status AS "Status",
  owner AS "Owner",
  risk_tier AS "Risk",
  file.mtime AS "Updated"
FROM #security
WHERE status = "active"
SORT file.mtime DESC
```

Dataview supports tags as a data source—for example, `FROM #security`—and `file.tags` exposes the note’s full tag list.[1][2]

## Query MOCs across the vault

This lists all Map-of-Content notes, whether they are security, platform, infrastructure, engineering, or other domains:

```dataview
TABLE WITHOUT ID
  file.link AS "MOC",
  title AS "Title",
  domain AS "Domain",
  status AS "Status",
  aliases AS "Aliases",
  file.mtime AS "Updated"
FROM ""
WHERE type = "moc"
SORT domain ASC, title ASC
```

For only active MOCs:

```dataview
TABLE WITHOUT ID
  file.link AS "MOC",
  domain AS "Domain",
  file.mtime AS "Updated"
FROM ""
WHERE type = "moc"
  AND status = "active"
SORT domain ASC, file.mtime DESC
```

`FROM ""` searches the entire vault. Use it carefully in very large vaults; a folder or tag source will generally be more focused.

## Find notes with a CSS class

To retrieve notes styled as a security dashboard, query your `cssclasses` list with `contains()`:

```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  title AS "Title",
  cssclasses AS "CSS Classes",
  type AS "Type",
  file.mtime AS "Updated"
FROM "02 Domains"
WHERE contains(cssclasses, "security-dashboard")
SORT file.mtime DESC
```

You can find every MOC with the generic `moc` CSS class:

```dataview
TABLE WITHOUT ID
  file.link AS "MOC",
  domain AS "Domain",
  cssclasses AS "CSS Classes",
  file.mtime AS "Updated"
FROM ""
WHERE contains(cssclasses, "moc")
SORT domain ASC, file.name ASC
```

Because `tags`, `aliases`, `cssclasses`, and `source` are YAML list properties, use `contains()` to test whether a specific item exists in the list. Dataview indexes frontmatter properties and supports list fields alongside built-in file metadata.[1][2]

## Query aliases and sources

### Notes that have aliases

```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  aliases AS "Aliases",
  type AS "Type",
  domain AS "Domain",
  file.mtime AS "Updated"
FROM ""
WHERE length(aliases) > 0
SORT file.mtime DESC
```

You can use `file.aliases` instead of `aliases` if you want the built-in Dataview file metadata field:

```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  file.aliases AS "Aliases",
  file.mtime AS "Updated"
FROM ""
WHERE length(file.aliases) > 0
SORT file.mtime DESC
```

`file.aliases` is a built-in list field that includes aliases defined in YAML frontmatter.[2]

### Notes sourced from the Security MOC

If your notes use a linked `source` property:

```yaml
source:
  - "[[Security MOC]]"
```

query them with:

```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  type AS "Type",
  status AS "Status",
  source AS "Source",
  file.mtime AS "Updated"
FROM ""
WHERE contains(source, [[Security MOC]])
SORT file.mtime DESC
```

If `source` is stored as plain text rather than an Obsidian link, use:

```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  source AS "Source",
  file.mtime AS "Updated"
FROM ""
WHERE contains(source, "Security MOC")
SORT file.mtime DESC
```

Use the first form whenever possible: a real `[[Security MOC]]` link is more robust than a text match when notes are renamed.

## Query active security work

This is a practical dashboard table for the **Security MOC**:

```dataview
TABLE WITHOUT ID
  file.link AS "Work Item",
  type AS "Type",
  status AS "Status",
  risk_tier AS "Risk",
  owner AS "Owner",
  due AS "Due",
  file.mtime AS "Updated"
FROM "02 Domains/Security"
WHERE status = "in-progress"
  OR status = "pending-review"
  OR status = "blocked"
SORT due ASC, file.mtime DESC
```

For high-risk work only:

```dataview
TABLE WITHOUT ID
  file.link AS "Security Item",
  risk_tier AS "Risk",
  status AS "Status",
  owner AS "Owner",
  due AS "Due",
  source AS "Source"
FROM "02 Domains/Security"
WHERE risk_tier = "critical"
  OR risk_tier = "high"
SORT due ASC
```

## Query open findings

Use a consistent frontmatter schema for findings:

```yaml
---
title: Public Storage Exposure
type: finding
domain: security
status: open
severity: high
asset: "[[Production Storage]]"
owner: platform-security
due: 2026-10-15
tags:
  - security
  - finding
  - cloud-security
---
```

Then query them:

```dataview
TABLE WITHOUT ID
  file.link AS "Finding",
  severity AS "Severity",
  asset AS "Asset",
  owner AS "Owner",
  due AS "Due",
  status AS "Status",
  file.mtime AS "Updated"
FROM "02 Domains/Security/Findings"
WHERE status != "closed"
SORT severity DESC, due ASC
```

If `severity` is text, alphabetical sorting puts `medium` above `high` in some cases. Use a numeric `severity_score` property if you need a true severity-ranked dashboard:

```yaml
severity: high
severity_score: 3
```

```dataview
TABLE WITHOUT ID
  file.link AS "Finding",
  severity AS "Severity",
  owner AS "Owner",
  due AS "Due"
FROM "02 Domains/Security/Findings"
WHERE status != "closed"
SORT severity_score DESC, due ASC
```

## Query linked notes

### Notes linking to Security MOC

```dataview
TABLE WITHOUT ID
  file.link AS "Referencing Note",
  type AS "Type",
  domain AS "Domain",
  file.mtime AS "Updated"
FROM [[Security MOC]]
SORT file.mtime DESC
```

This uses Dataview’s link source selector to find pages that link to `[[Security MOC]]`.[1]

### Notes linked from Security MOC

Place this query inside `Security MOC.md`:

```dataview
TABLE WITHOUT ID
  file.link AS "Linked Note",
  type AS "Type",
  status AS "Status",
  file.mtime AS "Updated"
FROM outgoing([[Security MOC]])
SORT file.name ASC
```

This is useful for reviewing whether the MOC has links to all expected security standards, runbooks, exception records, and response playbooks.

## Query recently updated notes

```dataview
TABLE WITHOUT ID
  file.link AS "Recently Updated",
  type AS "Type",
  domain AS "Domain",
  status AS "Status",
  file.mtime AS "Updated"
FROM "02 Domains/Security"
WHERE file.mtime >= date(today) - dur(14 days)
SORT file.mtime DESC
```

Dataview supports file creation/modification fields, and time comparisons such as `file.mtime >= date(today) - dur(1 day)`.[1][3]

## Query missing properties

This helps maintain metadata quality across your Security folder:

```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  type AS "Type",
  status AS "Status",
  owner AS "Owner",
  file.mtime AS "Updated"
FROM "02 Domains/Security"
WHERE !type
  OR !status
SORT file.mtime DESC
```

Find security records that are missing an owner:

```dataview
TABLE WITHOUT ID
  file.link AS "Unowned Item",
  type AS "Type",
  status AS "Status",
  risk_tier AS "Risk",
  due AS "Due"
FROM "02 Domains/Security"
WHERE (type = "finding" OR type = "exception" OR type = "project")
  AND !owner
SORT risk_tier DESC, due ASC
```

## Recommended schema

Use this common property baseline on security notes so your queries remain consistent:

```yaml
---
title: <Human-readable title>
aliases: []
source:
  - "[[Security MOC]]"
type: <moc | policy | standard | finding | exception | project | task | runbook | evidence>
domain: security
status: <draft | active | in-progress | pending-review | pending-approval | blocked | closed | archived>
risk_tier: <low | medium | high | critical>
severity: <informational | low | medium | high | critical>
owner: <team-or-person>
due: YYYY-MM-DD
review_date: YYYY-MM-DD
cssclasses:
  - security-note
tags:
  - security
---
```

With a consistent schema, you can build dashboard tables, exception registers, evidence registers, work queues, and review reminders without changing each query.

การอ้างอิง:
[1] Plugins https://community.obsidian.md/plugins
[2] Kanux - Obsidian Community plugins https://community.obsidian.md/plugins/kanux
[3] Bullet - Obsidian Plugin https://community.obsidian.md/plugins/bullet
[4] Frequently Asked Questions - Dataview https://blacksmithgu.github.io/obsidian-dataview/resources/faq/
[5] Data Commands - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/queries/data-commands/
[6] Dataview - Obsidian Plugin https://community.obsidian.md/plugins/dataview
[7] www.obsibrain.com › blog › obsidian-dataviewObsidian Dataview: The Complete Guide to Dynamic Dashboards ... https://www.obsibrain.com/blog/obsidian-dataview-complete-guide
[8] obsidian-dataview-cheatsheet/README.md at main · seburbandev/obsidian-dataview-cheatsheet https://github.com/seburbandev/obsidian-dataview-cheatsheet/blob/main/README.md
[9] obsidian-dataview/docs/docs/annotation/metadata-pages.md at ... https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/annotation/metadata-pages.md
[10] dataview.table - kObsidian MCP https://glama.ai/mcp/servers/bezata/kObsidian/tools/dataview.table
[11] publish.obsidian.md › hub › 04+-+Guides,+WorkflowsAn Introduction to Dataview - Obsidian Hub - Obsidian Publish https://publish.obsidian.md/hub/04+-+Guides,+Workflows,+&+Courses/Guides/An+Introduction+to+Dataview
[12] obsidian-dataview/docs/docs/queries/structure.md at master · blacksmithgu/obsidian-dataview https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/queries/structure.md
[13] obsidian-dataview/docs/docs/index.md at master · blacksmithgu ... https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/index.md
[14] Dataview in Obsidian: A Beginner's Guide https://obsidian.rocks/dataview-in-obsidian-a-beginners-guide/
[15] Dataview - Simone Riflesso - Obsidian Publish https://publish.obsidian.md/simoneriflesso/Obsidian/Plugins/Core+plugins/Dataview
[16] DataView - mnml's vault - Obsidian Publish https://publish.obsidian.md/manuel/Wiki/General/Software/DataView
[17] GitHub - seburbandev/obsidian-dataview-cheatsheet: This cheatsheet provides a handy reference guide for writing powerful queries using the dataview plugin in Obsidian. https://github.com/seburbandev/obsidian-dataview-cheatsheet
[18] Obsidian Dataview Queries - Never Complete Only ... https://publish.obsidian.md/xybre/permalink/ae619f49-24d1-44a2-a2f9-997d0862537d
Show me how to group them by status

Use `GROUP BY status` to collapse all matching notes into one row per status. After grouping, individual note fields move into the `rows` collection, so reference them as `rows.file.link`, `rows.owner`, `rows.risk_tier`, and so on.[1][2]

## Simple status groups

This produces one grouped list per status:

```dataview
LIST rows.file.link
FROM "02 Domains/Security"
WHERE status
GROUP BY status
SORT key ASC
```

Example display:

```text
active
- [[Security MOC]]
- [[Identity and Access Management]]

blocked
- [[Cloud Logging Upgrade]]

in-progress
- [[Terraform State Security Review]]
```

`key` is the status value used as the group heading, while `rows` contains the notes that belong to that status.[1][2]

## Status dashboard table

For your Security MOC, this shows a count and the linked notes under each status:

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Items",
  rows.risk_tier AS "Risk",
  rows.owner AS "Owner",
  rows.due AS "Due"
FROM "02 Domains/Security"
WHERE status
GROUP BY status
SORT key ASC
```

The output groups all notes with the same `status` property into a single row. `length(rows)` counts the notes in that group; `rows.file.link` displays their links.[1][2]

## Group active work by status

This version excludes reference notes such as policies, standards, and MOCs, then groups operational work items:

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Items",
  rows.file.link AS "Work",
  rows.risk_tier AS "Risk",
  rows.owner AS "Owner",
  rows.due AS "Due",
  rows.file.mtime AS "Updated"
FROM "02 Domains/Security"
WHERE status
  AND (
    type = "finding"
    OR type = "exception"
    OR type = "project"
    OR type = "task"
    OR type = "incident"
  )
GROUP BY status
SORT key ASC
```

## Group Terraform change requests by status

For the queue structure you used earlier:

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Plan",
  rows.environment AS "Environment",
  rows.risk_tier AS "Risk",
  rows.approval_status AS "Approval",
  rows.owner AS "Owner",
  rows.file.mtime AS "Updated"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
GROUP BY status
SORT key ASC
```

If you want only approval-related status groups:

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Plan",
  rows.environment AS "Environment",
  rows.risk_tier AS "Risk",
  rows.approval_status AS "Approval",
  rows.file.mtime AS "Updated"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status = "pending-approval"
  OR status = "approved"
  OR status = "rejected"
  OR status = "changes-requested"
GROUP BY status
SORT key ASC
```

## Control custom status order

Alphabetical sorting often is not the workflow order you want. Define an ordered numeric value, then sort by it:

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Items",
  rows.owner AS "Owner",
  rows.due AS "Due"
FROM "02 Domains/Security"
WHERE status
GROUP BY status
FLATTEN choice(
  key = "blocked", 1,
  key = "pending-approval", 2,
  key = "pending-review", 3,
  key = "in-progress", 4,
  key = "active", 5,
  key = "closed", 6,
  99
) AS status_order
SORT status_order ASC
```

This yields a practical operational sequence:

1. `blocked`
2. `pending-approval`
3. `pending-review`
4. `in-progress`
5. `active`
6. `closed`
7. Any unexpected or uncategorized status

## Status with missing-value group

To make missing status values visible rather than excluding them, group on a computed status:

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Items",
  rows.type AS "Type",
  rows.file.mtime AS "Updated"
FROM "02 Domains/Security"
GROUP BY choice(status, status, "missing-status")
SORT key ASC
```

This is useful as a metadata-quality dashboard because notes with no `status` property appear under `missing-status`.

## One section per status

If you prefer headings and note lists rather than a compact table:

```dataview
LIST rows.file.link
FROM "02 Domains/Security"
WHERE status
GROUP BY status
SORT key ASC
```

For more detail per item, use a grouped table rather than a list:

```dataview
TABLE
  rows.file.link AS "Note",
  rows.type AS "Type",
  rows.owner AS "Owner",
  rows.risk_tier AS "Risk",
  rows.due AS "Due"
FROM "02 Domains/Security"
WHERE status
GROUP BY status
SORT key ASC
```

## Important syntax rule

Before grouping, use fields directly:

```dataview
TABLE file.link, status, owner
FROM "02 Domains/Security"
```

After `GROUP BY status`, use:

```dataview
TABLE key, rows.file.link, rows.owner
FROM "02 Domains/Security"
GROUP BY status
```

That change is necessary because `GROUP BY` returns one result per distinct group and nests the matching notes in `rows`.[1][2]

การอ้างอิง:
[1] Plugins https://community.obsidian.md/plugins
[2] Omnisearch - Obsidian Plugin https://community.obsidian.md/plugins/omnisearch
[3] Query Types - Dataview https://blacksmithgu.github.io/obsidian-dataview/queries/query-types/
[4] Structure of a Query - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/queries/structure/
[5] Data Arrays - Dataview https://blacksmithgu.github.io/obsidian-dataview/api/data-array/
[6] obsidian-dataview/docs/docs/queries/data-commands.md at master · blacksmithgu/obsidian-dataview https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/queries/data-commands.md
[7] Example GROUP BY Queries - Dataview Example Vault https://s-blu.github.io/obsidian_dataview_example_vault/20%20Dataview%20Queries/Example%20GROUP%20BY%20Queries/
[8] https://raw.githubusercontent.com/obsidian-communi... https://raw.githubusercontent.com/obsidian-community/obsidian-hub/main/04%20-%20Guides,%20Workflows,%20&%20Courses/Guides/An%20Introduction%20to%20Dataview.md
[9] Advanced DQL Commands | s-blu/obsidian_dataview_example_vault ... https://deepwiki.com/s-blu/obsidian_dataview_example_vault/2.2-advanced-dql-commands
[10] obsidian-wiki/.skills/wiki-dashboard/SKILL.md at main ... - GitHub https://github.com/Ar9av/obsidian-wiki/blob/main/.skills/wiki-dashboard/SKILL.md
[11] DataView Data Screen https://knowledgecenter.insurity.com/SmartView/2.2.1/Doc/Content/020-Setup%20and%20Configuration/DataView%20Data%20Screen.htm
[12] Dataview List Query - Group By and Display Link + Field - Help https://forum.obsidian.md/t/dataview-list-query-group-by-and-display-link-field/70210
[13] How do you group by twice in either dataview or [[📊 DataView — คู่มือการใช้งาน.md|dataviewjs]]? - Help https://forum.obsidian.md/t/how-do-you-group-by-twice-in-either-dataview-or-[[[[[[[[[[[[[[[[[[📊 DataView — คู่มือการใช้งาน.md]]]]]]]]]]]]]]]]|dataviewjs]]/51737
How do I filter out completed items from this query

Add a `WHERE status != "completed"` condition **before** `GROUP BY status`. This filters the individual notes first, so the completed group never appears in the grouped output. Dataview supports `!=` as its not-equal operator in `WHERE` expressions.[1][2]

## Your grouped query, excluding completed

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Plan",
  rows.environment AS "Environment",
  rows.risk_tier AS "Risk",
  rows.approval_status AS "Approval",
  rows.owner AS "Owner",
  rows.file.mtime AS "Updated"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND status != "completed"
GROUP BY status
SORT key ASC
```

## Also exclude closed and archived

For operational dashboards, it is often useful to hide several terminal states:

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Plan",
  rows.environment AS "Environment",
  rows.risk_tier AS "Risk",
  rows.approval_status AS "Approval",
  rows.owner AS "Owner",
  rows.file.mtime AS "Updated"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND status != "completed"
  AND status != "closed"
  AND status != "archived"
GROUP BY status
SORT key ASC
```

## Cleaner version with `contains`

When you have several statuses to exclude, use a list:

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Plan",
  rows.environment AS "Environment",
  rows.risk_tier AS "Risk",
  rows.approval_status AS "Approval",
  rows.owner AS "Owner",
  rows.file.mtime AS "Updated"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY status
SORT key ASC
```

This is easier to maintain—add a status such as `"cancelled"` to the list rather than writing another `AND status != ...` condition.

## If you mean task checkboxes

If “completed” refers to Markdown tasks such as:

```markdown
- [x] Submit Terraform plan
```

use a `TASK` query and Dataview’s built-in task field:

```dataview
TASK
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE !completed
```

For your current query, though, `status` is frontmatter metadata, so `status != "completed"` is the appropriate filter. Dataview treats task completion separately from a note’s YAML `status` property.

การอ้างอิง:
[1] Plugins https://community.obsidian.md/plugins
[2] Omnisearch - Obsidian Plugin https://community.obsidian.md/plugins/omnisearch
[3] Metadata on Tasks and Lists - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-tasks/
[4] Expressions - Dataview - GitHub Pages https://blacksmithgu.github.io/obsidian-dataview/reference/expressions/
[5] Dataview query WHERE is not - Help - Obsidian Forum https://forum.obsidian.md/t/dataview-query-where-is-not/74678
[6] Dataview Query Language (DQL) | s-blu/obsidian_dataview ... https://deepwiki.com/s-blu/obsidian_dataview_example_vault/2.1-dataview-query-language-(dql)
[7] DQL - KiwiFS — Markdown filesystem for agents and teams https://docs.kiwifs.com/concepts/dql
[8] Obsidian Dataview Tutorial for Absolute Beginners https://note.com/csfive/n/nb59bd9da5d52?hl=en
[9] Showing incomplete tasks using Dataview in Minimal theme https://forum.obsidian.md/t/showing-incomplete-tasks-using-dataview-in-minimal-theme/100414
[10] DataView - eriktuck - Obsidian Publish https://publish.obsidian.md/eriktuck/base/Obsidian/DataView
How do I sort the remaining groups by count

Sort after `GROUP BY` using `length(rows) DESC`. The grouped `rows` object contains all notes in that status group, so its length is the group count.[1][2]

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Plan",
  rows.environment AS "Environment",
  rows.risk_tier AS "Risk",
  rows.approval_status AS "Approval",
  rows.owner AS "Owner",
  rows.file.mtime AS "Updated"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY status
SORT length(rows) DESC
```

## Add a tie-breaker

If two statuses have the same number of items, sort their names alphabetically as a secondary rule:

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Plan",
  rows.environment AS "Environment",
  rows.risk_tier AS "Risk",
  rows.approval_status AS "Approval",
  rows.owner AS "Owner",
  rows.file.mtime AS "Updated"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY status
SORT length(rows) DESC, key ASC
```

`length(rows)` calculates the number of notes in each grouped status, and `SORT` must come after `GROUP BY` because the `rows` collection only exists after grouping.[1][2]

การอ้างอิง:
[1] Plugins https://community.obsidian.md/plugins
[2] Omnisearch - Obsidian Plugin https://community.obsidian.md/plugins/omnisearch
[3] Personalize a Dataview https://tech.rochester.edu/wp-content/uploads/Personalize_Dataviews.pdf
[4] Sorting a table in DataView - Help - Obsidian Forum https://forum.obsidian.md/t/sorting-a-table-in-dataview/68999
[5] blacksmithgu/obsidian-dataview: A data index and query ... - GitHub https://github.com/blacksmithgu/obsidian-dataview
[6] Dataview tags report - Help - Obsidian Forum https://forum.obsidian.md/t/dataview-tags-report/98384
[7] How to do a count with group by and a total in dataview https://stackoverflow.com/questions/79560500/how-to-do-a-count-with-group-by-and-a-total-in-dataview/79560820
[8] Dataview — Query Your Notes - Visual Studio Marketplace https://marketplace.visualstudio.com/items?itemName=walkeemon.markdown-dataview
[9] The Complete Guide to Dataview in Obsidian - Sébastien Dubois https://www.dsebastien.net/the-complete-guide-to-dataview-in-obsidian/
[10] obsidian-dataview/README.md at master · blacksmithgu/obsidian-dataview https://github.com/blacksmithgu/obsidian-dataview/blob/master/README.md
[11] Obsidian Dataview Overview & Snippets.md https://gist.github.com/Goondrious/e91bfd8b221ffac052cc9f1aa7f21e26

How do I count total items instead of grouped rows

To show **one total count of all matching notes**, group everything into a single group with `GROUP BY true`, then count the resulting `rows`. Do not group by `status`, because that produces one `rows` collection per status.[1][2]

```dataview
TABLE WITHOUT ID
  length(rows) AS "Total Open Change Requests"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY true
```

This returns one row, for example:

| Total Open Change Requests |
|---:|
| 14 |

## Include a label

```dataview
TABLE WITHOUT ID
  "Open Terraform Change Requests" AS "Metric",
  length(rows) AS "Count"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY true
```

## Count all items, including completed

Remove the status filter:

```dataview
TABLE WITHOUT ID
  length(rows) AS "Total Change Requests"
FROM "90 Agent Inbox/Terraform Change Requests"
GROUP BY true
```

## Total plus grouped breakdown

Use two separate Dataview blocks: one for the overall total and one for the status distribution.

```dataview
TABLE WITHOUT ID
  length(rows) AS "Total Open Items"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY true
```

```dataview
TABLE WITHOUT ID
  key AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Plans"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY status
SORT length(rows) DESC, key ASC
```

The pattern is:

```dataview
TABLE WITHOUT ID
  length(rows) AS "Total"
FROM "<folder>"
WHERE <filters>
GROUP BY true
```

`GROUP BY true` places every matching note in one aggregate group, and `length(rows)` counts the notes in that group.[1]

การอ้างอิง:
[1] Omnisearch - Obsidian Plugin https://community.obsidian.md/plugins/omnisearch
[2] Plugins https://community.obsidian.md/plugins
[3] slickgrid - UNPKG https://app.unpkg.com/slickgrid@3.0.2/files/slick.dataview.js.txt
[4] Dataview JS https://blacksmithgu.github.io/obsidian-dataview/queries/dql-js-inline/
[5] Query Language | blacksmithgu/obsidian-dataview | DeepWiki https://deepwiki.com/blacksmithgu/obsidian-dataview/5-query-language
[6] How to do a count with group by and a total in dataview https://stackoverflow.com/questions/79560500/how-to-do-a-count-with-group-by-and-a-total-in-dataview
[7] Display count (number of rows) that a dataview query returns https://forum.obsidian.md/t/display-count-number-of-rows-that-a-dataview-query-returns/47044
[[Show me how to split this total across multiple files

To split one overall total across **multiple files**, query each file explicitly in the `FROM` clause using `OR`, then group by `file.link`. Each source file becomes its own group, and `length(rows)` counts the matching items associated with that file. Dataview supports composing sources with `or`, and `GROUP BY` creates one output row per distinct group key.[1]

## Count items per specific file

For example, if you have separate Terraform queues in different Markdown files:

```dataview
TABLE WITHOUT ID
  key AS "Source File",
  length(rows) AS "Open Items"
FROM
  "90 Agent Inbox/Terraform Change Requests/Dev Changes"
  OR "90 Agent Inbox/Terraform Change Requests/Staging Changes"
  OR "90 Agent Inbox/Terraform Change Requests/Production Changes"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY file.link
SORT length(rows) DESC, key ASC
```

This returns a separate total per source file:

| Source File | Open Items |
|---|---:|
| [[Dev Changes]] | 5 |
| [[Staging Changes]] | 3 |
| [[Production Changes]] | 1 |

Use the vault-relative path **without** `.md`. Folder/file sources can be combined with `OR`; a folder source also includes notes in its subfolders. 

## Count all notes by their file

If every Terraform change request is one Markdown note in the same folder, group the folder results by file:

```dataview
TABLE WITHOUT ID
  file.link AS "Plan",
  length(rows) AS "Open Items"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY file.link
SORT length(rows) DESC, key ASC
```

However, if **one note equals one change request**, every file will show a count of `1`. In that case, group by a useful property instead—such as `environment`, `owner`, `risk_tier`, or `status`.

## If one file contains multiple tasks

If each file contains multiple Markdown tasks, use a `TASK` query. This counts open tasks **inside each source note**, rather than counting the notes themselves:

```dataview
TASK
FROM
  "90 Agent Inbox/Terraform Change Requests/Dev Changes"
  OR "90 Agent Inbox/Terraform Change Requests/Staging Changes"
  OR "90 Agent Inbox/Terraform Change Requests/Production Changes"
WHERE !completed
GROUP BY file.link
```

For a more compact list, the same query displays the file name as a heading with unfinished tasks beneath it.

## Split totals by file and status

To see how many open items each file has in each status, use a combined group key:

```dataview
TABLE WITHOUT ID
  key[0] AS "Source File",
  key[1] AS "Status",
  length(rows) AS "Count",
  rows.file.link AS "Items"
FROM "90 Agent Inbox/Terraform Change Requests"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY list(file.link, status)
SORT key[0] ASC, length(rows) DESC, key[1] ASC
```

This creates combinations such as:

| Source File | Status | Count |
|---|---|---:|
| [[Dev Changes]] | in-progress | 4 |
| [[Dev Changes]] | pending-approval | 1 |
| [[Staging Changes]] | blocked | 2 |

## Important distinction

There are two different meanings of “split across multiple files”:

| Your vault pattern | Best query approach |
|---|---|
| One change request per Markdown file | Query the folder; group by `file.link` only if each file can represent multiple indexed rows |
| Many Markdown tasks inside each request file | Use `TASK`, filter `WHERE !completed`, and group by `file.link` |
| Several dedicated queue/dashboard files | Name individual files in `FROM ... OR ...`, then group by `file.link` |
| Notes distributed across several folders | Combine folders with `OR`, then group by a property such as `environment`, `status`, or `owner` |

For a repository of one-note-per-request Terraform plans, this is usually more useful than a per-file count:

```dataview
TABLE WITHOUT ID
  key AS "Environment",
  length(rows) AS "Open Change Requests",
  rows.file.link AS "Plans"
FROM
  "90 Agent Inbox/Terraform Change Requests"
  OR "92 Merge Queue/Approved Infrastructure Changes"
WHERE status
  AND !contains(list("completed", "closed", "archived"), status)
GROUP BY environment
SORT length(rows) DESC, key ASC
```

This combines requests from both workflow folders and gives a meaningful split by environment rather than a list of `1` values per individual request note.

การอ้างอิง:
[1] Plugins https://community.obsidian.md/plugins
[2] Sources - Dataview https://blacksmithgu.github.io/obsidian-dataview/reference/sources/
[3] Dataview https://blacksmithgu.github.io/obsidian-dataview/
[4] Querying with Dataview - ReadmeX https://readmex.com/en-US/blacksmithgu/obsidian-dataview/page-40d5ae756-fd66-4f16-9ade-348c10d5b92e
[5] lvnacy-notes/dataview-cheatsheet - GitHub https://github.com/lvnacy-notes/dataview-cheatsheet
[6] How to have several sources under "from" in dataview - Help https://forum.obsidian.md/t/how-to-have-several-sources-under-from-in-dataview/51531

]]ได้เลยครับ ✅ นี่คือสรุปโดยย่อจากเอกสาร Security Map / MOC 🛡️
 
 
 
📋 สรุปโดยย่อ — Security Map
 
🎯 วัตถุประสงค์
 
เป็นแผนที่รวบรวมและจัดกลุ่ม ทุกเรื่องที่เกี่ยวข้องกับความปลอดภัย ภายในระบบ ZyntroAI — เพื่อให้ค้นหา, อ้างอิง และปฏิบัติตามได้ง่ายเป็นระบบ
 
🗂️ หมวดหมู่หลัก
 
- 🔐 การยืนยันตัวตน & สิทธิ์ — Login, OAuth, Token, สิทธิ์เข้าถึงตามบทบาท
- 🕵️ ป้องกันภัยคุกคาม — ตรวจสอบโค้ด, ป้องกันโจมตี, สแกนความเสี่ยง
- 📝 นโยบาย & มาตรฐาน — กฎการเขียนโค้ดปลอดภัย, การจัดการข้อมูลลับ
- 🧪 ตรวจสอบ & ทดสอบ — CI/CD Security Scan, การทดสอบช่องโหว่
- 📊 เฝ้าดู & แจ้งเตือน — บันทึกเหตุการณ์, แจ้งเมื่อพบสิ่งผิดปกติ
- 📚 คู่มือปฏิบัติ — วิธีทำทีละขั้นตอนสำหรับทีมพัฒนา
 
✅ จุดสำคัญ
 
- ทุกส่วนเชื่อมโยงถึงกัน — ไม่แยกจากกัน
- ปฏิบัติได้จริง — มีขั้นตอน, คำสั่ง, ตัวอย่างโค้ด
- อัปเดตตลอดเวลา — ปรับตามการขยายระบบ
- ทุกคนในทีมต้องรู้และปฏิบัติตาม
 
📌 ใช้ทำอะไร
 
- อ้างอิงเมื่อเขียน/ตรวจสอบโค้ด
- ตรวจสอบความครบถ้วนก่อนส่งงาน
- ฝึกอบรมสมาชิกทีม
- ตรวจสอบสถานะความปลอดภัยโดยรวม
 
 
 
ต้องการขยายหัวข้อไหนเป็นรายละเอียดเพิ่มไหมครับ? 🛡️✨