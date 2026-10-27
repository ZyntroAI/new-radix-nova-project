---
title: "GitHub Checks API — Check Run vs Check Suite"
aliases:
  - "Check Run vs Check Suite"
  - "GitHub Checks API"
tags:
  - github
  - ci-cd
  - devsecops
  - api
created: 2026-10-27
status: evergreen
type: reference
---

# GitHub Checks API — Check Run vs Check Suite

## 🧩 Core Distinction

- **Check Run** = individual execution/result of one checking service (test, lint, security scan, build).
- **Check Suite** = container that groups related check runs for a commit or Git reference.

```text
Check suite: the collection or group
Check run:   one individual check within that collection
Convert to YAML Frontmatter  : 
Untitled 1
🧩 Core distinction

A check run is an individual execution or result produced by a checking service. It represents one specific activity performed against a commit, such as a test job, linter, security scan, build, or other validation process. A check run can report its own status, conclusion, details, and feedback, including annotations associated with particular lines of code.

A check suite is a container that groups related check runs for a particular commit or Git reference. Instead of representing one test or validation task, a check suite represents the broader collection of checks associated with an application, commit, or repository event.

The simplest way to express the relationship is:

• Check suite: the collection or group • Check run: one individual check within that collection

For example, a continuous integration system might evaluate one commit using a unit-test job, an integration-test job, a code-quality job, and a security-scanning job. Each job can be represented as a separate check run, while the group of related jobs can be organized within a check suite.

⚙️ What a check run represents

A check run focuses on the execution and result of one checking process. The process may begin in a queued or in-progress state and later produce a completed result. The individual run is therefore the most detailed level of reporting in the Checks API.

A check run commonly answers questions such as:

• What specific check was performed? • Which application or integration performed it? • Which commit was evaluated? • Is the check queued, in progress, or completed? • Did the check succeed, fail, remain neutral, or require an action? • What diagnostic output should be shown to the developer? • Which files and lines contain reported problems?

The GitHub Checks API supports operations for creating, retrieving, updating, and rerunning individual check runs. It also provides an endpoint for listing annotations associated with a run, along with endpoints for listing runs within a check suite or for a particular Git reference.

A check run is especially useful when detailed feedback must be attached to a specific validation task. A linter, for example, can create one run and attach annotations identifying the file path, affected line range, message, and severity of each issue. A test runner can create a different run and report failed test names, logs, summaries, or other output.

The run is therefore the appropriate object when an integration needs to communicate detailed, task-level information. It can be updated as processing progresses, allowing an application to publish an initial in-progress state and later update the same run with its final conclusion and diagnostic output.

📦 What a check suite represents

A check suite focuses on the group of checks associated with a commit or reference. It provides a higher-level organizational and coordination layer above individual check runs.

A suite commonly answers questions such as:

• Which collection of checks belongs to this commit? • Which application or integration owns the collection? • Which individual check runs are included? • Should the suite be rerun as a group? • What is the aggregate or suite-level state? • Should check suites be created automatically for repository activity?

The Checks API provides operations for creating, retrieving, updating, and rerunning check suites. It also supports listing check suites for a Git reference and updating repository preferences that control automatic check-suite creation.

A suite does not replace the individual runs. Instead, it gives GitHub and integrations a way to associate multiple runs with the same broader checking activity. This is useful when one application performs several validations for the same commit and those validations need to be represented as one coordinated set.

For example, an application could create a suite containing separate runs for:

• Unit tests • Integration tests • Static analysis • Dependency scanning • Build verification

Each run can have its own output and conclusion, while the suite provides the grouping needed to inspect or rerun the collection as a whole.

🔗 Relationship within the GitHub Checks API

The GitHub Checks API is organized around both check runs and check suites. The API documentation separates its endpoints into two related groups: endpoints for check runs and endpoints for check suites.

The check-run portion includes seven operations:

Create a check run
Get a check run
Update a check run
List check-run annotations
Rerequest a check run
List check runs in a check suite
List check runs for a Git reference
The check-suite portion includes five operations:

Create a check suite
Update repository preferences for check suites
Get a check suite
Rerequest a check suite
List check suites for a Git reference
This endpoint structure reflects the difference in responsibility. Check-run endpoints manage individual validations and their detailed results, while check-suite endpoints manage collections of validations and their repository-level organization.

The relationship can be represented conceptually as:

text Repository └── Git reference or commit └── Check suite ├── Check run: unit tests ├── Check run: linting ├── Check run: security scan └── Check run: build

A check suite can contain multiple check runs, and the same Git reference can have multiple suites associated with it. A check run can also be queried directly when the integration needs its specific result, or indirectly through its containing suite when the integration is examining the complete group of checks.

🧭 Difference in scope

The most important conceptual difference is scope.

A check run has a narrow scope. It represents one task performed by one checking process. Its output is normally specific to that task, such as test results, lint messages, scan findings, or build information.

A check suite has a broad scope. It represents the collection of checks associated with a larger checking operation. Its purpose is to organize related runs and provide a higher-level view of the validation activity.

Aspect Check run Check suite

Primary purpose Represents one individual check Groups related checks

Scope Task-level Collection-level

Typical content Status, conclusion, output, annotations Association between a commit and multiple runs

Main user Tool or application reporting a result Integration coordinating a group of results

Rerun behavior Reruns one check Reruns the suite's related checking activity

Detail level Fine-grained High-level

API relationship Belongs to or is queried through a suite Contains or organizes check runs

The distinction matters because a developer may need either a detailed result or an overview. Looking at a check run answers what happened in one validation task. Looking at a check suite answers what group of validations was associated with the commit and how the collection is being managed.

🔄 Lifecycle relationship

The lifecycle generally begins with a Git reference, such as a commit, branch, tag, or SHA, that needs to be checked. A checking application can create or use a check suite associated with that reference. Individual check runs are then created within the broader suite to represent separate validation tasks.

A run can move through its own execution lifecycle independently. For instance, one run may complete successfully while another remains in progress or fails. This independence allows different jobs to report results at different times without requiring every check to finish simultaneously.

The suite provides the grouping context while the runs provide the execution detail. This separation is important for parallel CI systems, where several jobs may begin together, finish at different times, and produce different types of output.

Rerunning at the run level and rerunning at the suite level also reflects this distinction. Rerequesting a check run targets one individual validation. Rerequesting a check suite targets the broader collection, making it suitable when the whole set of checks needs to be requested again.

📝 Detailed feedback and annotations

Check runs are the primary level for detailed developer feedback. The Checks API includes a specific operation for listing annotations associated with a check run, which allows an integration to expose findings tied to particular source-code locations.

For example, a static-analysis run may report that a specific line violates a coding rule. A security-scanning run may identify a vulnerable dependency declaration. A test run may report a failure associated with a source file. These findings belong to the individual run because they describe the output of one checking process.

A check suite generally does not need to contain every diagnostic message from every run directly. Instead, it provides the structure through which the related runs can be found and inspected. The suite gives the overview, while each run retains the detailed evidence produced by its own tool.

This separation also prevents unrelated output from being merged into one indistinguishable result. Test failures remain associated with the test run, lint findings remain associated with the lint run, and security findings remain associated with the security run.

🔍 Querying by suite and Git reference

The Checks API supports two important ways to discover check runs.

The first is to list check runs within a particular check suite. This is useful when the application already knows which suite is being inspected and wants to retrieve the individual runs belonging to it.

The second is to list check runs for a Git reference. This is useful when the application starts with a branch name, tag, or commit SHA and wants to discover the checks associated with that reference without first selecting a particular suite.

The corresponding suite operation lists check suites for a Git reference. This creates a two-level discovery pattern:

Find suites associated with a Git reference.
Find runs associated with a selected suite.
Alternatively, an integration can query runs directly for the Git reference when the suite-level grouping is not the primary concern.

🛠️ Practical API usage pattern

An application that integrates with the Checks API can use the objects in a sequence similar to the following:

Identify the commit or Git reference that requires validation.
Create or locate the relevant check suite.
Create individual check runs for the validation tasks.
Update each run as its associated task progresses.
Add output or annotations to the appropriate run.
Retrieve the runs through the suite or Git reference.
Rerun one run when only one validation needs to be repeated.
Rerun the suite when the broader collection needs to be requested again.
This pattern keeps responsibility separated. The suite identifies the checking group, while each run reports the behavior and result of one component within that group.

🧱 Why both objects are needed

Using only check runs would make it possible to report individual results, but it would be harder to organize related checks into a coherent collection. An application might create many independent results for one commit without a clear grouping mechanism.

Using only check suites would provide grouping, but it would not provide a suitable place for detailed task-level output and annotations. A suite alone could indicate that a collection of checks exists, but it would not adequately distinguish a failed unit test from a failed security scan or a linting warning.

The two-object model supports both levels of information:

• Check suites provide organization and coordination. • Check runs provide execution state and detailed feedback. • Suite queries provide collection-level discovery. • Run queries provide task-level inspection. • Suite reruns provide broader retry behavior. • Run reruns provide targeted retry behavior.

The GitHub Checks API therefore uses check suites and check runs as complementary resources rather than competing alternatives. One describes the group, and the other describes the individual validation within that group.

🧪 Example: a commit validated by several tools

Consider a commit submitted to a repository where an integration performs four validation tasks. The integration can represent the overall activity as one check suite and create four check runs within it.

The first run can report whether the project builds successfully. The second can report unit-test results. The third can publish linting findings and source annotations. The fourth can report security-scan results and identify affected files.

```yaml
---
title: "GitHub Checks API — Check Run vs Check Suite"
aliases:
  - "Check Run vs Check Suite"
  - "GitHub Checks API"
tags:
  - github
  - ci-cd
  - devsecops
  - api
created: 2026-10-27
status: evergreen
type: reference
---

# GitHub Checks API — Check Run vs Check Suite

## 🧩 Core Distinction

- **Check Run** = individual execution/result of one checking service (test, lint, security scan, build).
- **Check Suite** = container that groups related check runs for a commit or Git reference.

```text
Check suite: the collection or group
Check run:   one individual check within that collection
```

Example: one commit may have separate check runs for unit tests, integration tests, code quality, and security scanning — grouped under one check suite.

## ⚙️ Check Run

A **check run** represents the execution and result of one checking process.

It answers:

- What specific check was performed?
- Which application or integration performed it?
- Which commit was evaluated?
- Is the check queued, in progress, or completed?
- Did it succeed, fail, remain neutral, or require action?
- What diagnostic output should be shown?
- Which files and lines contain reported problems?

### Capabilities

- Create / get / update / rerun a check run
- List annotations for a run
- List runs within a check suite
- List runs for a Git reference

### Use Cases

- Linter: attach annotations with file path, line range, message, severity
- Test runner: report failed tests, logs, summaries
- Security scanner: report vulnerable dependencies and affected files

A check run can start as `queued` or `in_progress`, then be updated with a final conclusion and output.

## 📦 Check Suite

A **check suite** groups checks associated with a commit or Git reference.

It answers:

- Which collection of checks belongs to this commit?
- Which application or integration owns the collection?
- Which check runs are included?
- Should the suite be rerun as a group?
- What is the aggregate suite-level state?
- Should suites be created automatically for repository activity?

### Capabilities

- Create / get / update / rerun a check suite
- List check suites for a Git reference
- Update repository preferences for automatic suite creation

### Use Cases

- Group unit tests, integration tests, static analysis, dependency scanning, and build verification
- Rerun all related checks as one coordinated set
- Provide a higher-level view of validation activity

## 🔗 Relationship

```text
Repository
└── Git reference / commit
    └── Check suite
        ├── Check run: unit tests
        ├── Check run: linting
        ├── Check run: security scan
        └── Check run: build
```

- One check suite can contain multiple check runs.
- One Git reference can have multiple check suites.
- A check run can be queried directly or through its suite.

## 🧭 Scope Comparison

| Aspect | Check Run | Check Suite |
|---|---|---|
| Primary purpose | Represents one individual check | Groups related checks |
| Scope | Task-level | Collection-level |
| Typical content | Status, conclusion, output, annotations | Association between commit and multiple runs |
| Main user | Tool reporting a result | Integration coordinating results |
| Rerun behavior | Reruns one check | Reruns related checking activity |
| Detail level | Fine-grained | High-level |
| API relationship | Belongs to / queried through a suite | Contains / organizes check runs |

## 🔄 Lifecycle

1. A Git reference (commit, branch, tag, SHA) needs validation.
2. A check suite is created or located for that reference.
3. Individual check runs are created within the suite.
4. Each run progresses independently.
5. Runs may finish at different times.
6. Rerun can target one run or the whole suite.

## 📝 Annotations

Annotations belong to **check runs**, not suites.

Examples:

- Static analysis: line violates a coding rule
- Security scan: vulnerable dependency declaration
- Test run: failure associated with a source file

The suite provides structure; each run retains its own detailed evidence.

## 🔍 Querying

Two discovery patterns:

1. Find suites for a Git reference → find runs in a suite
2. Find runs directly for a Git reference

## 🛠️ Practical API Pattern

1. Identify commit / Git reference
2. Create or locate check suite
3. Create individual check runs
4. Update runs as tasks progress
5. Add output or annotations
6. Retrieve runs via suite or Git reference
7. Rerun one run if needed
8. Rerun suite if broader retry is needed

## 🧪 Example

One commit → one check suite → four check runs:

- Build verification
- Unit tests
- Linting with annotations
- Security scanning

## Related Notes

- [[MOC - Platform Engineering]]
- [[CI/CD]]
- [[GitHub Actions]]
- [[DevSecOps]]
- [[MOC - AI Engineering]]
```

