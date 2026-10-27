governance

**Governance** is the system of policies, technical controls, ownership, and audit evidence that determines what an AI agent may access, decide, and do—and who is accountable when it acts. For Cursor Cloud Agents, it means governing agent mode, repository scope, MCP tools, network access, secrets, approvals, and logs rather than trusting prompts alone.[1][2]

## Core model

A practical governance rule is:

```text
Can this agent, on behalf of this requester,
perform this action, on this resource, using this tool,
in this environment, at this time?
```

Your policy engine should answer that question deterministically. Prompts and rules guide behavior, but they are not enforceable security boundaries; use approvals, tool permissions, sandboxing, hooks, network controls, and repository protections as the actual enforcement layers. Cursor specifically recommends defense in depth rather than relying on guardrails or rules alone.[3][4]

## Governance layers

| Layer | What it governs | Example control |
|---|---|---|
| Identity and ownership | Who owns the agent and approves its use | Named business owner and technical owner for every agent |
| Purpose and scope | What the agent is allowed to accomplish | “Documentation validation only” or “Terraform plan review only” |
| Mode and autonomy | Whether it can plan, edit, or act | Default to `plan`; permit `agent` only for bounded, low-risk changes |
| Repository and path scope | Which repositories and files it can read or alter | Allow `docs/**`; deny `.env`, credentials, production configs |
| MCP capability scope | Which MCP servers and individual tools are allowed | Permit a read-only plan parser; deny apply, delete, or write tools |
| Network egress | Which destinations agents and MCPs can reach | `Allowlist only` for cloud agents handling sensitive repositories |
| Secrets and credentials | What identity or token the agent receives | Short-lived, scoped credentials; no production admin token |
| Change controls | What outputs the agent can create | Branch/PR allowed; merge, deploy, and production migration denied |
| Human oversight | When a human must approve a step | Required before merge, deployment, external communication, or destructive action |
| Observability and audit | Evidence of what occurred | Store run ID, mode, policy version, MCP profile IDs, artifacts, and outcome |

These categories align with governance guidance to define scope, decision boundaries, workflow/API access limits, accountability, risk management, and continuous monitoring.[5][6]

## Governance for follow-ups

In your Cursor follow-up design, treat each override as a **new capability decision**.

```text
Incoming request
  → classify task type
  → select policy
  → select permitted mode
  → resolve approved MCP profiles
  → constrain repository paths and network
  → submit follow-up run
  → collect audit event
  → require human approval where policy says so
```

Do **not** use this pattern:

```ts
await sendCursorFollowUp(agentId, {
  prompt: request.body.prompt,
  mode: request.body.mode,
  mcpServers: request.body.mcpServers,
});
```

It lets an untrusted caller expand the agent’s capabilities.

Use policy-selected configuration instead:

```ts
type TaskType =
  | "docs_update"
  | "workflow_review"
  | "workflow_repair"
  | "terraform_plan_review"
  | "security_triage";

const POLICY = {
  docs_update: {
    mode: "agent" as const,
    profiles: ["knowledge-readonly", "markdown-validator"],
    allowedPaths: ["docs/**", "vault/**"],
    requiresApproval: false,
  },

  workflow_review: {
    mode: "plan" as const,
    profiles: ["actionlint", "workflow-contract-reader"],
    allowedPaths: [".github/workflows/**", "contracts/**", "tests/**"],
    requiresApproval: false,
  },

  workflow_repair: {
    mode: "agent" as const,
    profiles: ["actionlint", "workflow-contract-reader", "test-runner"],
    allowedPaths: [".github/workflows/**", "contracts/**", "tests/**"],
    requiresApproval: true,
  },

  terraform_plan_review: {
    mode: "plan" as const,
    profiles: ["terraform-plan-reader", "opa-policy-reader"],
    allowedPaths: ["modules/**", "environments/**", "policies/**", "artifacts/**"],
    requiresApproval: false,
  },

  security_triage: {
    mode: "plan" as const,
    profiles: ["sbom-reader", "readonly-logs"],
    allowedPaths: ["src/**", "package.json", "package-lock.json"],
    requiresApproval: true,
  },
} as const;
```

The application—not the requester—chooses the mode and resolves every MCP profile to a known, reviewed server definition. This is vital because MCP servers can connect agents to databases, APIs, and other external tools; Cursor supports admin control over approved servers, individual tools, and each server’s network policy.[4][7]

## Minimum policy rules

### Default deny

- No arbitrary MCP URL, command, headers, or environment variables from clients.
- No arbitrary model, mode, repo, branch, or environment selection.
- No production deploy, merge, infrastructure apply, database migration, secret rotation, or credential changes by an agent.
- No use of production credentials in agent runtimes unless there is a separately approved exception.

### Least privilege

- Use `plan` for investigation, architecture review, security triage, and Terraform plan analysis.
- Use `agent` only for tightly bounded editing such as documentation updates, test fixes, or an isolated pull request.
- Give each task only the files, MCP tools, network destinations, and credentials it needs.
- Separate read-only MCP tools from write/destructive tools.
- Prefer short-lived identity tokens over broad, long-lived keys.

### Human gates

Require a human approval for:

- Any external side effect: deployment, production change, merge, sending communications, changing access, or publishing.
- Modifications to workflow, infrastructure, access-control, authentication, or payment code.
- Any task that touches regulated, customer, financial, or security-sensitive data.
- Adding or changing an MCP server, especially `stdio` servers.

### Immutable audit record

Capture at minimum:

```json
{
  "timestamp": "2026-10-08T00:06:00+07:00",
  "requesterId": "user-or-service-id",
  "agentId": "agent-123",
  "runId": "run-456",
  "taskType": "terraform_plan_review",
  "policyVersion": "2026-10-08.1",
  "mode": "plan",
  "mcpProfileIds": [
    "terraform-plan-reader",
    "opa-policy-reader"
  ],
  "repository": "organization/repository",
  "branch": "agent/review-456",
  "allowedPaths": [
    "modules/**",
    "environments/**",
    "policies/**",
    "artifacts/**"
  ],
  "approvalRequired": false,
  "outcome": "finished"
}
```

This gives you traceability if an agent produces an unexpected result or if an MCP integration is later found to be unsafe.

## Cursor-specific controls

Cursor provides several controls that map directly to governance:

- **MCP governance:** Enterprise admins can control which MCP servers are approved, restrict individual tools per server, and apply network policy per server.[4][7]
- **Cloud Agent isolation:** Each Cloud Agent runs in its own VM boundary, and agents can reach only repositories authorized through the Git provider connection.[8]
- **Network egress:** Configure `Default + allowlist` or `Allowlist only`; enterprise administrators can lock this policy organization-wide.[8][9]
- **Hardening baseline:** Cursor recommends org-wide Privacy Mode, Auto-review rather than Run Everything, sandboxing, distributed hooks, reviewed plugins/MCP servers, and `.cursorignore` for secret or regulated paths.[3]

For any cloud agent with source-code, internal-API, or infrastructure access, choose **Allowlist only** wherever practical. Cursor’s documentation describes that mode as permitting outbound access only to explicitly listed domains.[9]

## Governance charter template

Place this in a repository or internal policy system as `AGENT_GOVERNANCE.md`:

```md
# Agent Governance Policy

## Purpose
AI agents may assist with approved engineering and documentation tasks.
They must not act beyond their defined policy profile.

## Ownership
- Business owner: <team or role>
- Technical owner: <team or role>
- Security reviewer: <team or role>

## Allowed outcomes
- Create documentation updates.
- Create branches and pull requests.
- Run approved validations and tests.
- Produce read-only analysis of Terraform plans and security artifacts.

## Prohibited outcomes
- Merge pull requests.
- Deploy to any environment.
- Run Terraform apply, destroy, import, state, or force-unlock.
- Run production database migrations.
- Change credentials, secrets, access control, or repository permissions.
- Send external messages or publish content without a human approval.

## Runtime policy
- The gateway selects agent mode and MCP profiles.
- Clients may not submit raw MCP definitions or choose arbitrary modes.
- `plan` is the default mode.
- `agent` mode is limited to approved task profiles.
- MCP servers require security review, ownership, a tool allowlist, and a network policy.
- Agents receive only short-lived, least-privilege credentials.
- Cloud Agent network access uses allowlists.

## Approval policy
Human approval is required before:
- Any production-impacting action.
- Any merge, deployment, or public communication.
- Any changes to infrastructure, workflow permissions, authentication, or data access.
- Adding, replacing, or materially changing MCP servers.

## Audit requirements
Record the requester, agent, run, task type, policy version, mode, MCP profile IDs,
repository, branch, file scope, approvals, tool activity, artifacts, and final outcome.

## Incident response
If an agent acts outside its policy:
1. Cancel the active run.
2. Revoke affected MCP credentials and disable the relevant profile.
3. Preserve logs and artifacts.
4. Assess repository, infrastructure, and data impact.
5. Correct the policy before re-enabling the workflow.
```

## Bottom line

Good agent governance is not “write better prompts.” It is **policy-enforced least privilege with accountable owners, human approval for consequential actions, and auditability at every tool call**. For Cursor follow-ups, treat every `mode` or `mcpServers` override as a policy-governed capability grant, never as a caller-controlled convenience setting.

การอ้างอิง:
[1] A Complete Guide to Agentic AI Governance https://www.paloaltonetworks.com/cyberpedia/what-is-agentic-ai-governance
[2] What is agent governance? — Speakeasy https://www.speakeasy.com/resources/agent-governance
[3] Security and Privacy Hardening | Cursor Docs https://cursor.com/docs/enterprise/security-hardening
[4] Model and Integration Management | Cursor Docs https://cursor.com/docs/enterprise/model-and-integration-management
[5] Agentic AI governance—Playbook - IBM https://www.ibm.com/think/insights/agentic-ai-governance-playbook
[6] AI Governance: Definition, Framework & Controls - Arcade.dev https://www.arcade.dev/glossary/ai-governance/
[7] Model Context Protocol (MCP) | Cursor Docs https://cursor.com/docs/mcp
[8] Security overview | Cursor Docs https://cursor.com/docs/cloud-agent/security
[9] Secrets & Network | Cursor Docs https://cursor.com/docs/cloud-agent/security-network
[10] Cursor AI Security Risks: 4 Critical Controls (2026) - Checkmarx https://checkmarx.com/learn/ai-security/cursor-security-risks-practices-4-critical-security-controls/
[11] Security https://cursor.com/security
[12] What is Agent Governance? | OneTrust Glossary https://www.onetrust.com/glossary/agent-governance/
[13] Cloud Agents | Cursor Docs https://cursor.com/docs/cloud-agent
