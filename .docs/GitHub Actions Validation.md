GitHub Actions Validation

**GitHub Actions validation** should check more than YAML formatting: validate workflow syntax and expressions, shell scripts, action inputs, permissions, secrets handling, and supply-chain controls before workflows run on protected branches. `actionlint` is the primary static checker for Actions workflows, while GitHub recommends pinning third-party actions to full commit SHAs for immutable references.[1]

## Validation layers

| Layer | What it catches | Recommended tool/control |
|---|---|---|
| YAML validity | Indentation, invalid YAML, malformed files | `yamllint` |
| Workflow syntax | Invalid keys, job/step structure, invalid `uses:` forms | `actionlint` |
| Expression checks | Bad `${{ }}` expressions, invalid context fields, type mismatches | `actionlint` |
| Shell safety | Shell syntax errors in `run:` steps | `actionlint`, `shellcheck` |
| Action metadata | Bad `action.yml`, invalid composite action declarations | `actionlint` |
| Dependency integrity | Mutable tags, untrusted external actions | Pin to full commit SHA; action allowlists |
| Permission scope | Overly broad `GITHUB_TOKEN` permissions | `permissions: {}` baseline; grant per job |
| Secret safety | Secrets exposed through logs, forks, or untrusted input | Scoped secrets, masking, event design |
| Runtime tests | Incorrect behavior that static validation cannot detect | Isolated test workflow/repository |

`actionlint` checks workflow syntax, expressions, action usage and inputs, and shell scripts. It also validates action metadata files, including required keys and supported action runtime declarations.[2][3]

## Recommended workflow

Create `.github/workflows/validate-actions.yml`:

```yaml
name: Validate GitHub Actions

on:
  pull_request:
    paths:
      - ".github/workflows/**"
      - ".github/actions/**"
      - "action.yml"
      - "action.yaml"
  push:
    branches:
      - main
    paths:
      - ".github/workflows/**"
      - ".github/actions/**"
      - "action.yml"
      - "action.yaml"

permissions: {}

jobs:
  validate:
    name: Lint workflows
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2

      - name: Run actionlint
        uses: raven-actions/actionlint@v2
```

This runs only when workflows or local actions change. The `permissions: {}` default gives the workflow’s `GITHUB_TOKEN` no permissions unless a job explicitly needs them; this is a strong least-privilege starting point.

The Marketplace action for `actionlint` supports validating GitHub Actions workflow files without separately installing third-party packages on the runner.[4]

## Add YAML linting

YAML correctness is useful, but it does not understand GitHub Actions semantics. Use it as a complement—not a replacement—for `actionlint`.

```yaml
      - name: Run YAML lint
        uses: ibiqlik/action-yamllint@v3
        with:
          file_or_dir: ".github/workflows/**/*.yml .github/workflows/**/*.yaml"
          config_file: ".yamllint.yml"
```

Example `.yamllint.yml`:

```yaml
extends: default

rules:
  line-length:
    max: 120
  truthy:
    allowed-values:
      - "true"
      - "false"
      - "on"
      - "off"
  document-start: disable
```

GitHub Actions uses `on:` as a YAML key, but some YAML linters interpret `on` using YAML 1.1 truthiness behavior. Configure the linter appropriately or use an in-file rule suppression where needed.

## Validate locally

Install `actionlint` locally using the project’s documented install method, then run:

```bash
actionlint
```

Lint a specific workflow:

```bash
actionlint .github/workflows/validate-actions.yml
```

Add shell checking where workflow steps contain nontrivial Bash:

```bash
shellcheck scripts/*.sh
```

For local workflow execution testing, use a separate test repository or test branch. Static linting can verify shape and many semantic errors, but cannot prove that external actions, secrets, permissions, networking, artifacts, or deployment behavior will work correctly in GitHub-hosted runtime conditions.

## Security validation

### Pin every external action

Avoid mutable tag references:

```yaml
# Avoid for high-assurance workflows
uses: actions/checkout@v4
```

Use a full 40-character commit SHA:

```yaml
uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
```

GitHub states that full-length commit SHA pinning is currently the only way to use an immutable action release. Verify that the SHA belongs to the intended upstream repository, not a fork.[5]

### Restrict token permissions

Declare only the permissions required by each job:

```yaml
permissions:
  contents: read

jobs:
  publish:
    permissions:
      contents: write
      id-token: write
```

Avoid broad implicit permissions. A workflow that only checks out code and runs tests commonly needs only:

```yaml
permissions:
  contents: read
```

### Treat pull-request content as untrusted

Do not interpolate untrusted fields directly into shell commands. Fields such as PR title, branch name, issue title/body, commit messages, and external webhook data can contain shell syntax.

Unsafe:

```yaml
- run: echo "${{ github.event.pull_request.title }}"
```

Safer:

```yaml
- name: Read PR title from environment
  env:
    PR_TITLE: ${{ github.event.pull_request.title }}
  run: |
    printf '%s\n' "$PR_TITLE"
```

Also avoid running privileged workflows on untrusted fork code. Be particularly cautious with `pull_request_target`, which runs in the base repository context and can access secrets/privileged tokens if configured carelessly.

### Protect secrets

- Store secrets in GitHub Actions secrets or environment secrets, not workflow files.
- Do not print contexts, environment dumps, request headers, credentials, or tokens.
- Mask sensitive values that are generated at runtime with `::add-mask::VALUE`.
- Do not pass repository secrets to workflows triggered by untrusted forks.
- Prefer short-lived OIDC credentials over long-lived cloud access keys where your cloud provider supports it.

GitHub advises registering secrets and masking sensitive derived values so they are redacted from logs.[5][6]

## Policy checks

For larger repositories, validate organizational policy in addition to linting.

| Policy | Example enforcement |
|---|---|
| No mutable third-party action tags | Reject `uses: owner/action@v1`; require full SHA |
| Approved action sources only | Allow `actions/*` plus a vetted internal allowlist |
| No broad token default | Require top-level `permissions: {}` or `contents: read` |
| No secrets on fork PRs | Block secret-consuming jobs under `pull_request` from forks |
| Protected deployment environments | Require GitHub Environment approvals for production |
| No risky trigger usage without review | Flag `pull_request_target`, `workflow_run`, `repository_dispatch`, and `issue_comment` |
| Constrained runners | Prevent self-hosted runners from executing untrusted PR code |
| Artifact validation | Scan and verify artifacts before deployment or consumption |

GitHub can enforce allowed-actions policy and SHA pinning at organization or enterprise level, including blocking selected actions or failing workflows that do not pin actions to a full SHA.[7]

## Example hardened validation workflow

```yaml
name: Validate Workflows

on:
  pull_request:
    paths:
      - ".github/workflows/**"
      - ".github/actions/**"
      - "action.yml"
      - "action.yaml"

permissions:
  contents: read

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - name: Check out source
        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2

      - name: Validate GitHub Actions syntax and expressions
        uses: raven-actions/actionlint@v2

      - name: Check workflow YAML formatting
        uses: ibiqlik/action-yamllint@v3
        with:
          file_or_dir: ".github/workflows/**/*.yml .github/workflows/**/*.yaml"
          config_file: ".yamllint.yml"
```

For maximum supply-chain assurance, replace the tagged `raven-actions/actionlint@v2` and `ibiqlik/action-yamllint@v3` references with verified full commit SHAs, then add a comment recording the human-readable version. GitHub’s guidance is explicit that only full-SHA pinning makes an action reference immutable.[5]

## Pull-request gate

Make the validation workflow a required status check in the protected-branch rules for `main` or other deployment branches. A practical merge gate requires:

- `actionlint` passes.
- YAML lint passes.
- SHA-pinning and approved-action policy pass.
- Dependency/security scanning passes.
- Required human review occurs for changes to `.github/workflows/**`, reusable workflow files, action metadata, and deployment scripts.

Workflow files are part of your software supply chain. Treat changes to them with the same review rigor as changes to code that can access secrets, publish packages, deploy infrastructure, or modify production data.

การอ้างอิง:
[1] Bullet - Obsidian Plugin https://community.obsidian.md/plugins/bullet
[2] Buttons - Obsidian Plugin https://community.obsidian.md/plugins/buttons
[3] Interlinear https://community.obsidian.md/plugins/interlinear
[4] CalendarPlanner - Obsidian Plugin https://community.obsidian.md/plugins/calendarplanner
[5] Workspace++ https://community.obsidian.md/plugins/workspace-plus-plus
[6] Plugins https://community.obsidian.md/plugins
[7] Kanux - Obsidian Community plugins https://community.obsidian.md/plugins/kanux
[8] Security hardening for GitHub Actions https://docs.github.com/en/enterprise-cloud@latest/enterprise-onboarding/github-actions-for-your-enterprise/security-hardening-for-github-actions
[9] Security hardening for GitHub Actions - GitHub Enterprise Server 3.12 Docs https://docs.github.com/en/enterprise-server@3.12/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
[10] Secure use reference - GitHub Docs https://docs.github.com/en/actions/reference/security/secure-use
[11] Security hardening for GitHub Actions - GitHub Docs https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions?learn=getting_started&amp;learnProduct=actions
[12] Secure use reference - GitHub Enterprise Cloud Docs https://docs.github.com/en/enterprise-cloud@latest/actions/reference/security/secure-use
[13] Secure use reference - GitHub Enterprise Server 3.22 Docs https://docs.github.com/en/enterprise-server@3.22/actions/reference/security/secure-use
[14] Secure use reference - GitHub Enterprise Server 3.17 Docs https://docs.github.com/en/enterprise-server@3.17/actions/reference/security/secure-use
[15] GitHub Actions Workflow Standards https://developer.wordpress.org/coding-standards/wordpress-coding-standards/github-actions/
[16] GitHub Actions policy now supports blocking and SHA ... https://github.blog/changelog/2025-08-15-github-actions-policy-now-supports-blocking-and-sha-pinning-actions/
[17] actionlint - GitHub Marketplace https://github.com/marketplace/actions/actionlint
[18] github.com › marketplace › actionsYAML Lint · Actions · GitHub Marketplace · GitHub https://github.com/marketplace/actions/yaml-lint
[19] actionlint/README.md at main · rhysd/actionlint https://github.com/rhysd/actionlint/blob/main/README.md
[20] raw.githubusercontent.com https://raw.githubusercontent.com/rhysd/actionlint/main/docs/checks.md
[21] Super-Linter · Actions https://github.com/marketplace/actions/super-linter
[22] GitHub - rhysd/actionlint: :octocat: Static checker for GitHub Actions workflow files https://github.com/rhysd/actionlint/
