---
name: gitlab-devsecops-automation
description: >
  Analyze, validate, debug, repair, optimize, secure, and operate GitLab
  CI/CD pipelines, GitLab Runner, DevSecOps workflows, Docker builds,
  artifacts, deployments, observability, cost controls, and self-healing
  automation. Use when working with .gitlab-ci.yml, GitLab pipelines,
  failed jobs, runners, security scans, deployments, CI performance,
  or GitLab automation. Never assume custom Orbit commands are GitLab-native;
  verify command availability and project configuration before execution.
---

# GitLab DevSecOps Automation Skill

## 1. Purpose

This skill provides a safe, repeatable workflow for GitLab CI/CD engineering.

Primary objectives:

- validate `.gitlab-ci.yml`
- detect pipeline configuration problems
- analyze failed jobs
- classify failures
- propose minimal fixes
- rerun failed jobs safely
- optimize pipeline execution
- enforce security gates
- manage artifacts and cache
- inspect GitLab Runner health
- verify deployments
- collect structured reports
- track cost and resource usage
- support controlled self-healing
- preserve traceability with `trace_id`

The default behavior is:

`Inspect → Validate → Diagnose → Plan → Patch → Verify → Rerun → Report`

Never modify production infrastructure without an explicit authorization boundary.

---

# 2. Operating Rules

## 2.1 Source of truth

Treat these as authoritative in this order:

1. Repository files
2. GitLab project configuration
3. GitLab CI/CD configuration
4. Runner configuration
5. Environment variables / protected variables
6. Deployment configuration
7. External documentation
8. AI inference

Do not invent unsupported GitLab configuration.

## 2.2 GitLab-native vs custom tooling

Classify every command/configuration as:

- `GITLAB_NATIVE`
- `RUNNER_NATIVE`
- `DOCKER_NATIVE`
- `KUBERNETES_NATIVE`
- `CUSTOM_TOOL`
- `UNVERIFIED`

Examples of potentially custom concepts:

- `gitlab-orbit`
- `orbit trace`
- `orbit state`
- `orbit:deploy`
- `gitlab_orbit.Client`
- `OrbitState`
- `orbit: { enabled: true }`

These must be treated as `CUSTOM_TOOL` or `UNVERIFIED` unless the repository explicitly provides the implementation.

Never silently convert a conceptual example into executable production configuration.

---

# 3. Standard Pipeline Model

Prefer this logical lifecycle:

```text
prepare
  ↓
lint
  ↓
test
  ↓
build
  ↓
security
  ↓
package
  ↓
deploy
  ↓
verify
  ↓
report
  ↓
cleanup
```

For larger systems:

```text
plan
  ↓
code
  ↓
test ──────────────┐
  ↓                │
build              │
  ↓                │
security ──────────┘
  ↓
package
  ↓
deploy
  ↓
observe
  ↓
cost
```

Use parallel execution whenever jobs are independent.

---

# 4. Pipeline Inspection

When asked to inspect a GitLab pipeline:

### Step 1 — Locate configuration

Inspect:

```text
.gitlab-ci.yml
.gitlab/
scripts/
Dockerfile
docker-compose.yml
package.json
pyproject.toml
requirements.txt
Makefile
helm/
k8s/
terraform/
```

### Step 2 — Identify pipeline stages

Extract:

- stages
- jobs
- rules
- needs
- dependencies
- artifacts
- cache
- images
- services
- variables
- environments
- security templates
- deployment commands

### Step 3 — Build dependency graph

Represent:

```text
job → needs → job
```

Detect:

- circular dependencies
- unnecessary serialization
- missing dependencies
- jobs that can run in parallel
- artifacts required by downstream jobs

### Step 4 — Validate assumptions

Check:

- image availability
- command availability
- runner tags
- required variables
- required services
- permissions
- artifact paths
- deployment scripts
- secret availability

---

# 5. Failure Classification

Classify every failed job before changing code.

```text
CONFIGURATION
DEPENDENCY
CODE
TEST
BUILD
SECURITY
NETWORK
AUTHORIZATION
RUNNER
DOCKER
KUBERNETES
DEPLOYMENT
RESOURCE
TIMEOUT
FLAKY
UNKNOWN
```

Example:

```text
exit code 1
→ inspect final command
→ identify failing process
→ classify
→ reproduce if possible
→ patch minimal cause
```

Do not treat every `exit code 1` as a code defect.

---

# 6. Auto-Debug Workflow

For a failed job:

```text
1. Read job status
2. Read failure log
3. Find first meaningful error
4. Ignore cascading errors
5. Identify failing command
6. Inspect relevant source/config
7. Determine root cause
8. Generate minimal patch
9. Validate syntax
10. Run local/static validation
11. Commit only when authorized
12. Rerun affected job
13. Compare result
14. Record diagnosis
```

Prefer the **first causal error** over the last visible error.

Example:

```text
ERROR A
  ↓
ERROR B
  ↓
ERROR C
  ↓
exit code 1
```

If A caused B and C, fix A.

---

# 7. Safe Auto-Retry

Retry only when the failure is plausibly transient.

Retry candidates:

```text
NETWORK
RATE_LIMIT
TEMPORARY_RUNNER_FAILURE
REGISTRY_TIMEOUT
TRANSIENT_SERVICE_ERROR
FLAKY_TEST
```

Do not automatically retry:

```text
SYNTAX_ERROR
TYPE_ERROR
AUTHORIZATION_ERROR
MISSING_FILE
INVALID_CONFIGURATION
SECURITY_VIOLATION
DETERMINISTIC_TEST_FAILURE
```

Recommended policy:

```yaml
retry:
  max_attempts: 2
  exponential_backoff: true
  jitter: true
```

Never create an infinite retry loop.

Track:

```text
attempt
failure_class
job
pipeline_id
commit_sha
trace_id
result
```

---

# 8. Auto-Fix Policy

Use three levels.

## Level 0 — Observe

No modifications.

Use for:

- production
- protected branches
- security findings
- ambiguous failures

## Level 1 — Suggest

Generate:

- diagnosis
- patch
- commands
- expected result

Require human approval.

## Level 2 — Controlled Repair

Allowed only when:

- repository policy permits it
- branch is non-production
- change is low-risk
- validation succeeds
- rollback exists

Never auto-fix:

- secrets
- authentication policy
- production infrastructure
- destructive database operations
- firewall/security boundaries
- IAM/RBAC
- protected branch policy

---

# 9. GitLab CI YAML Standards

Prefer explicit rules:

```yaml
rules:
  - if: '$CI_COMMIT_BRANCH == "main"'
  - if: '$CI_MERGE_REQUEST_IID'
```

Avoid introducing new `only/except` configurations unless compatibility requires them.

Prefer stable images:

```yaml
image: python:3.12-slim
```

instead of:

```yaml
image: python:latest
```

Use pinned versions for critical tooling.

Keep stages ASCII and predictable:

```yaml
stages:
  - prepare
  - test
  - build
  - security
  - deploy
  - verify
```

---

# 10. Security

Required controls:

```text
Secret Detection
SAST
Dependency/SCA scanning
Container scanning
License/compliance checks
Protected variables
Protected branches
Least-privilege tokens
Environment protection
Artifact controls
Runner isolation
```

Never place secrets in:

```text
.gitlab-ci.yml
source code
Dockerfile
logs
artifacts
chat output
commit messages
```

Never print:

```bash
echo "$SECRET"
```

Use masked/protected CI/CD variables.

---

# 11. Docker Security

Avoid exposing the Docker socket unless explicitly required.

If Docker socket access is required:

```text
1. document why
2. restrict runner scope
3. isolate runner
4. avoid shared production runner
5. monitor Docker access
```

Avoid destructive cleanup such as:

```bash
docker system prune -a
```

inside shared runners unless the runner is explicitly dedicated and cleanup is part of its lifecycle.

Prefer targeted cleanup.

---

# 12. Runner Diagnostics

Check:

```bash
sudo gitlab-runner status
sudo gitlab-runner list
sudo gitlab-runner verify
sudo gitlab-runner restart
```

For service logs:

```bash
sudo journalctl -u gitlab-runner -f
```

For Docker executor issues:

```bash
docker info
docker ps
id
groups
```

Classify runner problems:

```text
OFFLINE
AUTH
NETWORK
DOCKER
RESOURCE
CONFIG
PERMISSION
CAPACITY
```

Never expose runner registration tokens.

---

# 13. Cache Optimization

Use cache for expensive reproducible dependencies.

Examples:

```text
node_modules/
.npm/
.pip-cache/
.gradle/
.m2/
```

Do not cache:

```text
secrets
credentials
production state
mutable deployment state
```

Cache key should reflect relevant dependency state.

Example:

```yaml
cache:
  key:
    files:
      - package-lock.json
  paths:
    - .npm/
```

Avoid state-blind caches that can reuse incompatible dependencies.

---

# 14. Artifact Management

Artifacts should be:

```text
minimal
versioned
traceable
time-limited
non-sensitive
```

Store:

```text
test reports
coverage
security reports
build packages
deployment evidence
diagnostic reports
```

Define retention intentionally:

```yaml
artifacts:
  expire_in: 1 week
```

Production evidence may require longer retention according to policy.

---

# 15. Observability

Every important pipeline execution should expose:

```text
pipeline_id
job_id
commit_sha
project
environment
stage
status
duration
failure_class
trace_id
```

Recommended log structure:

```json
{
  "timestamp": "...",
  "level": "INFO",
  "stage": "test",
  "job": "unit-test",
  "trace_id": "tr_xxx",
  "pipeline_id": "123",
  "commit_sha": "abc123",
  "status": "success"
}
```

Never log secrets.

Use OpenTelemetry when the application/infrastructure supports it.

Useful metrics:

```text
pipeline_duration_seconds
job_duration_seconds
pipeline_success_rate
job_failure_rate
cache_hit_ratio
runner_queue_time
deployment_failure_rate
rollback_rate
```

---

# 16. Cost Optimization

Track:

```text
runner_minutes
pipeline_duration
artifact storage
registry storage
cache usage
external API calls
AI token usage
deployment frequency
retry count
```

Apply:

```text
cache first
parallelize independent work
skip unaffected jobs
avoid duplicate scans
use appropriate runner size
expire artifacts
avoid unnecessary AI calls
avoid infinite retries
```

For AI-assisted CI:

```text
input hash → cache lookup → AI call only on miss
```

Do not assume a custom token/cost system exists unless implemented.

---

# 17. GitOps / Deployment

Production deployment should normally follow:

```text
Build
  ↓
Security Gate
  ↓
Artifact
  ↓
Staging
  ↓
Health Verification
  ↓
Approval
  ↓
Production
  ↓
Post-deploy Verification
```

Prefer progressive delivery where supported:

```text
Canary
Blue/Green
Rolling
```

Production must have:

```text
protected environment
approval policy
rollback mechanism
health checks
observability
audit trail
```

---

# 18. Self-Healing

Use the lifecycle:

```text
Detect
  ↓
Classify
  ↓
Isolate
  ↓
Remediate
  ↓
Verify
  ↓
Learn
```

Self-healing mechanisms may include:

```text
retry with backoff
circuit breaker
bulkhead isolation
health checks
auto-scaling
auto-restart
auto-rollback
drift correction
```

Every automated remediation must be:

```text
bounded
idempotent
auditable
observable
reversible
```

---

# 19. Kubernetes Integration

For Kubernetes deployments verify:

```text
livenessProbe
readinessProbe
startupProbe
resources.requests
resources.limits
PodDisruptionBudget
HPA/VPA/KEDA
RBAC
NetworkPolicy
image security
```

Health model:

```text
liveness  → restart
readiness → remove from traffic
startup   → protect slow startup
```

Never claim that a deployment is healthy merely because `kubectl apply` succeeded.

Verify runtime health.

---

# 20. AI Agent Behavior

The agent must operate as:

```text
Planner
  ↓
Validator
  ↓
Executor
  ↓
Observer
  ↓
Debugger
  ↓
Reporter
```

Before executing:

```text
What will change?
Why?
What can fail?
What permissions are required?
Can the operation be reversed?
```

After executing:

```text
Did it succeed?
What changed?
What remains broken?
What evidence proves success?
```

---

# 21. Pull Request / Commit Integration

Recommended commit format:

```text
fix(ci): repair failing GitLab pipeline
fix(runner): restore runner connectivity
ci(security): update security scanning
ci(cache): optimize dependency cache
ci(build): stabilize Docker build
ci(deploy): fix staging deployment
```

PR report:

```markdown
## Root Cause

...

## Fix

...

## Validation

- [ ] YAML validation
- [ ] Tests
- [ ] Security scan
- [ ] Build
- [ ] Deployment verification

## Pipeline

- Before: failed
- After: passed

## Risk

Low / Medium / High
```

---

# 22. Validation Checklist

Before declaring success:

```text
[ ] YAML syntax valid
[ ] Pipeline configuration valid
[ ] Jobs resolve correctly
[ ] Rules behave correctly
[ ] Needs/dependencies valid
[ ] Required variables exist
[ ] Secrets are protected
[ ] Runner is available
[ ] Build succeeds
[ ] Tests succeed
[ ] Security gates succeed
[ ] Artifacts generated
[ ] Deployment succeeds
[ ] Health checks succeed
[ ] Logs contain no secrets
[ ] Retry count bounded
[ ] Rollback path exists
[ ] Trace/report generated
```

Never report `success` from configuration validation alone.

---

# 23. Failure Report Format

Use:

```markdown
# GitLab Pipeline Failure Report

## Pipeline

- Project:
- Pipeline:
- Job:
- Commit:
- Branch:
- Environment:
- Trace ID:

## Classification

- Category:
- Severity:
- Transient: yes/no
- Auto-retry: yes/no
- Auto-fix: yes/no

## Root Cause

...

## Evidence

...

## Fix

...

## Validation

...

## Retry

- Attempt:
- Result:

## Remaining Risk

...

## Recommended Action

...
```

---

# 24. Hard Safety Rules

The agent MUST NOT:

```text
delete production resources
disable security scanning
expose secrets
disable authentication
modify protected branch policy
remove audit logs
force-push production branches
destroy shared runner resources
execute destructive cleanup on shared infrastructure
auto-approve production deployment
```

without explicit authorization.

The agent MUST:

```text
prefer minimal changes
preserve evidence
use least privilege
validate before execution
verify after execution
record failures
bound retries
maintain rollback capability
```

---

# 25. Default Decision Algorithm

```python
def handle_gitlab_failure(job):
    inspect(job)

    error = find_first_causal_error(job.log)

    category = classify(error)

    if category in TRANSIENT_FAILURES:
        return bounded_retry(job)

    if category in LOW_RISK_AUTOFIX:
        patch = generate_minimal_patch(job)
        validate(patch)

        if validation_passed(patch):
            return controlled_repair(job, patch)

    if category in HIGH_RISK_FAILURES:
        return request_human_approval(job)

    return generate_diagnostic_report(job)
```

---

# 26. Default Skill Output

For every completed operation return:

```text
STATUS
ROOT_CAUSE
ACTION
FILES_CHANGED
VALIDATION
PIPELINE_RESULT
SECURITY
RISK
NEXT_ACTION
```

Example:

```text
STATUS: FIXED
ROOT_CAUSE: missing CI dependency
ACTION: added dependency installation step
FILES_CHANGED: .gitlab-ci.yml
VALIDATION: YAML + local test passed
PIPELINE_RESULT: rerun required
SECURITY: no secrets changed
RISK: low
NEXT_ACTION: rerun failed job
```

---

# 27. Principle

The skill follows:

```text
Do not guess.
Do not hide failures.
Do not retry blindly.
Do not auto-fix dangerous changes.
Do not claim success without evidence.

Inspect.
Diagnose.
Patch minimally.
Validate.
Execute.
Verify.
Record.
Learn.
```