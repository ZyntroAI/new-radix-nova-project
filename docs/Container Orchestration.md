Help me write obsidian 📝

Here’s a ready-to-paste **Obsidian note** for your “Container Orchestration” page, including frontmatter, linked concepts, and a practical example.

***
title: Container Orchestration
type: concept
created: 2026-10-29
status: learning
tags:
  - containers
  - devops
  - infrastructure
aliases:
  - Container Management
  - Container Scheduling
***

# Container Orchestration

> [!summary]
> Container orchestration automates the deployment, scheduling, scaling, networking, and recovery of containerized applications. Kubernetes manages these tasks by continuously reconciling the actual infrastructure with a declared desired state.[1][2]

## Why orchestration matters

Running one container is straightforward. Running many containers across multiple machines introduces questions:

- Where should each container run?
- How do services find and communicate with one another?
- What happens when a container or machine fails?
- How do we deploy a new version without taking everything offline?
- How do we provide configuration, secrets, and persistent storage?

An orchestration platform coordinates these concerns instead of requiring operators to manage each container manually.[1]

## Mental model: desired state

```text
Declare desired state
        │
        ▼
Control plane compares
desired vs. actual state
        │
        ▼
Schedule, replace, or update workloads
        │
        ▼
Observe and repeat
```

Example:

> “Run three replicas of my API.”

If a replica fails, the platform works to restore the requested replica count. Kubernetes uses ongoing control loops rather than a one-time deployment script.[1]

## Core capabilities

| Capability | Purpose |
|---|---|
| Scheduling | Place workloads on available machines |
| Self-healing | Replace failed workloads |
| Scaling | Adjust the number of running replicas |
| Service discovery | Give workloads stable ways to find one another |
| Load balancing | Distribute traffic across available instances |
| Rollouts | Introduce application changes progressively |
| Configuration management | Separate runtime settings from container images |
| Secret management | Supply credentials without baking them into images |

Kubernetes provides these capabilities as part of managing containerized workloads.[1][2]

## Docker Compose vs. cluster orchestration

| Tool | Main role | Typical use |
|---|---|---|
| Docker Compose | Define and run a multi-container application | Local development, CI, and single-host deployments |
| Docker Swarm | Manage services across Docker hosts | Docker-native clustered deployments |
| Kubernetes | Manage containerized workloads through declarative APIs and controllers | Clustered applications needing automated operations |

Compose can be used in production, particularly on a single host. It is not, by itself, a replacement for multi-host cluster orchestration. Docker Swarm adds cluster management to Docker Engine.[3][4][5]

## Kubernetes vocabulary

Use these as linked notes to expand later:

- [[Kubernetes Cluster]]
- [[Kubernetes Control Plane]]
- [[Kubernetes Nodes]]
- [[Kubernetes Pods]]
- [[Kubernetes Deployments]]
- [[Kubernetes Services]]
- [[Kubernetes ConfigMaps]]
- [[Kubernetes Secrets]]
- [[Persistent Volumes]]

These concepts separate workload execution, networking, configuration, and storage into distinct parts of the Kubernetes system.[6]

## Example: API with two replicas

This example runs two NGINX replicas and exposes them through an internal Kubernetes Service:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: nginx
          image: nginx:stable
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80
```

The Deployment declares the desired replica count. The Service provides a stable network endpoint for matching Pods instead of requiring clients to track individual Pod addresses.[2]

> [!note]
> This is a learning example, not a complete production configuration. It does not include application-specific health checks, resource sizing, external access, or security controls.

## Configuration and secrets

Keep configuration separate from application images:

```text
Container image
└── Application code and dependencies

Runtime configuration
├── Non-sensitive settings
└── Credentials and tokens
```

Kubernetes Secrets can supply sensitive values through environment variables or mounted files, allowing credentials to remain outside application code and container images. Secret storage still requires appropriate access controls and operational safeguards.[7]

## Suggested project structure

```text
my-app/
├── src/
├── Dockerfile
├── compose.yaml
├── infrastructure/
│   ├── terraform/
│   └── kubernetes/
│       ├── deployment.yaml
│       └── service.yaml
└── README.md
```

Use this as an organizational starting point:

- `Dockerfile`: package the application.
- `compose.yaml`: define the local multi-container environment.
- `terraform/`: keep infrastructure provisioning configuration.
- `kubernetes/`: keep application workload manifests.

## Learning checklist

- [ ] Understand images versus containers.
- [ ] Run an application with Docker Compose.
- [ ] Learn the relationship between Pods, Deployments, and Services.
- [ ] Deploy a two-replica application.
- [ ] Observe what happens when a Pod is deleted.
- [ ] Practice a rolling update.
- [ ] Add health checks and resource requests.
- [ ] Separate configuration from secrets.
- [ ] Learn persistent storage before running databases.

## Related notes

- [[Docker]]
- [[Kubernetes]]
- [[Infrastructure as Code]]
- [[Terraform Patterns]]
- [[CI-CD]]
- [[Secrets Management]]
- [[Observability]]

## Questions to revisit

- Does this application need a cluster, or would a single-host deployment suffice?
- Which components can be replaced freely, and which retain important data?
- What should happen when traffic increases or a machine fails?
- Who owns upgrades, monitoring, and incident response?

การอ้างอิง:
[1] Overview https://kubernetes.io/docs/concepts/overview/
[2] kubernetes.ioProduction-Grade Container Orchestration - Kubernetes https://kubernetes.io/?source=about_page-------------------------------------
[3] Use Compose in production https://docs.docker.com/compose/how-tos/production/
[4] Migrate to Compose V2 https://docs.docker.com/compose/
[5] Swarm mode key concepts - Docker Docs https://docs.docker.com/engine/swarm/key-concepts/
[6] Concepts https://kubernetes.io/docs/concepts/
[7] kubernetes.io › docs › conceptsSecrets - Kubernetes https://kubernetes.io/docs/concepts/configuration/secret/?azure-portal=true
[8] 13524.jpg https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/images/1064638370/314b83b4-1f45-49ed-a279-16b4753ce97b/13524.jpg
[9] kubernetes.io · docs · conceptsOverview - Kubernetes https://kubernetes.io/docs/concepts/overview/?source=post_page-----8db6c301b18---------------------------------------
[10] Docker Documentation https://docs.docker.com/engine/swarm.md
[11] Why Use Compose https://docs.docker.com/compose/intro/features-uses/
[12] Hybrid networking https://docs.docker.com/compose/how-tos/networking/
[13] What is Docker Compose? https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-docker-compose/
[14] How Compose works https://docs.docker.com/compose/intro/compose-application-model/
[15] Docker Compose https://docs.docker.com/compose/gettingstarted/
[16] Deploy a stack to a swarm https://docs.docker.com/engine/swarm/stack-deploy/
