# @swamp/kubernetes

Kubernetes operational toolkit — 15 model types covering pods, deployments,
services, RBAC, storage, networking, autoscaling, batch jobs, and more. Includes
14 ready-to-run workflows for namespace debugging, security audits, RBAC
analysis, cluster health, and operational diagnostics.

All models authenticate via the standard kubeconfig. Point at a specific context
or kubeconfig file through `globalArguments`, or let it pick up the default.

## Installation

```sh
swamp extension pull @swamp/kubernetes
```

## Quick start

Create a model instance scoped to a namespace, then run methods against it:

```bash
swamp model create @swamp/kubernetes/pod my-pods \
  --input namespace=production

swamp model method run my-pods list --json
swamp model method run my-pods get --input podName=api-server-0 --json
swamp model method run my-pods getLogs \
  --input podName=api-server-0 --input tailLines=50 --json
```

## Global arguments

Shared across all namespaced models (`pod`, `deployment`, `service`, etc.):

| Field        | Default     | Notes |
| ------------ | ----------- | ----- |
| `namespace`  | `"default"` | Kubernetes namespace to operate in. |
| `context`    | (optional)  | Kubeconfig context name. Uses current context if omitted. |
| `kubeconfig` | (optional)  | Path to kubeconfig file. Uses default location if omitted. |
| `labels`     | (optional)  | Label selector string for filtering (e.g. `"app=web,env=prod"`). |

Cluster-scoped models (`namespace`, `node`) omit the `namespace` field.

## Models

| Model | Type | Description |
| ----- | ---- | ----------- |
| `pod` | `@swamp/kubernetes/pod` | Pod lifecycle, logs, metrics, and exec |
| `pod_summary` | `@swamp/kubernetes/pod-summary` | Aggregated pod statistics from stored data |
| `deployment` | `@swamp/kubernetes/deployment` | Deployment CRUD, scaling, rolling restart, pause/resume, rollout status |
| `service` | `@swamp/kubernetes/service` | Service CRUD, endpoint inspection, and selector diagnosis |
| `namespace` | `@swamp/kubernetes/namespace` | Namespace CRUD, resource quotas, limit ranges, resource counts, health |
| `node` | `@swamp/kubernetes/node` | Node conditions, capacity, taints, cordon/uncordon, drain, metrics |
| `configmap` | `@swamp/kubernetes/configmap` | ConfigMap CRUD |
| `secret` | `@swamp/kubernetes/secret` | Secret CRUD with base64 decoding and vault-backed sensitive storage |
| `ingress` | `@swamp/kubernetes/ingress` | Ingress CRUD with TLS and rule inspection |
| `pvc` | `@swamp/kubernetes/pvc` | PersistentVolumeClaim and PersistentVolume listing |
| `hpa` | `@swamp/kubernetes/hpa` | HorizontalPodAutoscaler CRUD and status |
| `job` | `@swamp/kubernetes/job` | Job CRUD, log retrieval, and cleanup |
| `netpol` | `@swamp/kubernetes/netpol` | NetworkPolicy listing, analysis, and connectivity testing |
| `rbac` | `@swamp/kubernetes/rbac` | Roles, ClusterRoles, bindings, and ServiceAccounts |
| `event` | `@swamp/kubernetes/event` | Cluster events with filtering by type and involved object |

## Workflows

| Workflow | Description |
| -------- | ----------- |
| `namespace-debug` | Debug a namespace — pods, events, deployments, services |
| `debug-namespace-deep` | Deep namespace debug with logs and network policies |
| `deployment-status` | Deployment rollout status with ReplicaSets and pod health |
| `service-connectivity` | Service endpoint and selector diagnosis |
| `cluster-health` | Cluster-wide node, pod, and storage health |
| `cluster-summary` | High-level cluster overview across namespaces |
| `security-audit` | RBAC, network policies, and pod security review |
| `rbac-audit` | Detailed RBAC role and binding analysis |
| `storage-health` | PVC binding status and PV capacity review |
| `autoscaling-status` | HPA metrics and scaling status |
| `batch-jobs-status` | Job completion, failures, and active runs |
| `network-audit` | NetworkPolicy coverage and connectivity analysis |
| `pod-inventory` | Pod inventory with phase and restart counts |
| `pod-health-check` | Pod health with metrics and event correlation |

## Requirements

- A valid kubeconfig with access to the target cluster.
- `kubectl` on `$PATH` (only required for the `pod.exec` method).
- `metrics-server` installed in the cluster (only required for metrics methods).

## License

AGPL-3.0 — see [LICENSE.txt](LICENSE.txt).
