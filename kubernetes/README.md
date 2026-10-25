# @swamp/kubernetes

Kubernetes operational toolkit — 17 model types covering pods, deployments,
statefulsets, services, RBAC, storage, networking, autoscaling, batch jobs,
External Secrets, and more. Includes
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
| `statefulset` | `@swamp/kubernetes/statefulset` | StatefulSet listing, scaling, rolling restart, and delete |
| `service` | `@swamp/kubernetes/service` | Service CRUD, endpoint inspection, and selector diagnosis |
| `namespace` | `@swamp/kubernetes/namespace` | Namespace CRUD, resource quotas, limit ranges, resource counts, health |
| `node` | `@swamp/kubernetes/node` | Node conditions, capacity, taints, cordon/uncordon, drain, metrics. `list` syncs: upserts live nodes and prunes departed ones. |
| `configmap` | `@swamp/kubernetes/configmap` | ConfigMap CRUD |
| `secret` | `@swamp/kubernetes/secret` | Secret CRUD with base64 decoding and vault-backed sensitive storage, idempotent `ensure`, and metadata-only `getMeta` |
| `ingress` | `@swamp/kubernetes/ingress` | Ingress CRUD with TLS and rule inspection |
| `pvc` | `@swamp/kubernetes/pvc` | PersistentVolumeClaim and PersistentVolume listing |
| `hpa` | `@swamp/kubernetes/hpa` | HorizontalPodAutoscaler CRUD and status |
| `job` | `@swamp/kubernetes/job` | Job CRUD, log retrieval, and cleanup |
| `netpol` | `@swamp/kubernetes/netpol` | NetworkPolicy listing, analysis, and connectivity testing |
| `rbac` | `@swamp/kubernetes/rbac` | Roles, ClusterRoles, bindings, and ServiceAccounts |
| `event` | `@swamp/kubernetes/event` | Cluster events with filtering by type and involved object |
| `externalsecret` | `@swamp/kubernetes/externalsecret` | External Secrets Operator ExternalSecrets: list, get, and `forceSync` to request an immediate resync |

### Rotating a credential synced by External Secrets

After rotating a value in the external store, ask External Secrets Operator to
resync, then restart the workload so its pods read the new Secret:

```bash
swamp model method run my-externalsecret forceSync --input externalSecretName=worker-creds
swamp model method run my-externalsecret get --input externalSecretName=worker-creds
swamp model method run my-statefulset restart --input statefulSetName=worker
```

`forceSync` sets the `force-sync` annotation to the current time with a merge
patch and returns at once; it does not wait for the controller. Check
`refreshTime` and `ready` from `get` before restarting. `restart` on
`statefulset` and `deployment` does what `kubectl rollout restart` does: it sets
`kubectl.kubernetes.io/restartedAt` on the pod template.

`externalsecret` needs the External Secrets Operator CRDs installed and, for
`forceSync`, permission to `patch` `externalsecrets.external-secrets.io`. It
uses `external-secrets.io/v1` and falls back to `v1beta1` when `v1` is not
served; pass `apiVersion` to pin one. It never reads secret values, and it does
not store the `data` entries or their remote keys.

### Secrets without stored values

`get`, `create` and `update` write the decoded values to the `secret`
resource (sensitive, so stored in the vault). `ensure` and `getMeta` write only
the `secretMeta` resource — name, type, data key names, labels and
`resourceVersion` — so secret values never reach swamp's datastore.

- `getMeta` reads one Secret's metadata. It fails if the Secret does not exist.
- `ensure` creates the Secret if it is absent. Otherwise it replaces it only when
  the data or labels differ, and records `action` as `created`, `updated` or
  `unchanged`. The replace carries the read `resourceVersion`, so a concurrent
  change makes it fail with a 409 rather than overwrite.
- `ensure` merges the given keys into the existing data. With `prune: true` the
  data becomes exactly the given keys. Labels are merged and never removed, and
  annotations are left alone. `type` defaults to `Opaque` when creating; on an
  existing Secret it is checked only when given. A Secret's type cannot change,
  so a different `type` fails; delete and recreate the Secret instead.
- A later `list` or `getMeta` overwrites the stored `secretMeta`, so read
  `action` from the `ensure` step's own output.

Every model drops the `kubectl.kubernetes.io/last-applied-configuration`
annotation before storing an object. `kubectl apply` copies the whole object
into it, so for a Secret it holds the values in plain text. Versions before
2026.10.25.1 stored it: if you ran `secret` `list` or `getMeta` against Secrets
created with `kubectl apply`, delete the old `secretMeta` data with
`swamp data gc` or `swamp data delete`. Other tools that copy a spec into an
annotation (such as Helm or Argo CD) are not filtered.

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
