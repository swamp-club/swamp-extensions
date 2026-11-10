# @swamp/kubernetes

Kubernetes operational toolkit — 17 model types covering pods, deployments,
statefulsets, services, RBAC, storage, networking, autoscaling, batch jobs,
External Secrets, and more. Includes 14 ready-to-run workflows for namespace
debugging, security audits, RBAC analysis, cluster health, and operational
diagnostics.

All models authenticate via the standard kubeconfig. Point at a specific context
or kubeconfig file through `globalArguments`, or let it pick up the default.

A cluster's `tls-server-name` may be a DNS name or an IP address, as with
kubectl. This suits tunnels and port-forwards where `server` is
`https://127.0.0.1:<port>`. For an IP address the API server's certificate is
checked against that IP, which must be in its subject alternative names. When
`server` is itself an IP address, as in a tunnel, no SNI is sent.

Methods that change an existing object by reading it and replacing it (`update`,
`scale`, `pause`, `resume`, `restart`, `cordon`, `uncordon`, `taint`, `untaint`,
`secret` `ensure`) send the `resourceVersion` they read, so they never overwrite
a concurrent change. When a controller or another client writes the object in
between, the API server answers 409 Conflict and the method reads it again and
reapplies its change, up to five attempts.

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

| Field        | Default     | Notes                                                            |
| ------------ | ----------- | ---------------------------------------------------------------- |
| `namespace`  | `"default"` | Kubernetes namespace to operate in.                              |
| `context`    | (optional)  | Kubeconfig context name. Uses current context if omitted.        |
| `kubeconfig` | (optional)  | Path to kubeconfig file. Uses default location if omitted.       |
| `labels`     | (optional)  | Label selector string for filtering (e.g. `"app=web,env=prod"`). |

Cluster-scoped models (`namespace`, `node`) omit the `namespace` field.

## Models

| Model            | Type                               | Description                                                                                                                    |
| ---------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `pod`            | `@swamp/kubernetes/pod`            | Pod lifecycle, logs, metrics, and exec                                                                                         |
| `pod_summary`    | `@swamp/kubernetes/pod-summary`    | Aggregated pod statistics from stored data                                                                                     |
| `deployment`     | `@swamp/kubernetes/deployment`     | Deployment CRUD, scaling, rolling restart, pause/resume, rollout status, `getLogs` from the current pod                        |
| `statefulset`    | `@swamp/kubernetes/statefulset`    | StatefulSet listing, scaling, rolling restart, and delete                                                                      |
| `service`        | `@swamp/kubernetes/service`        | Service CRUD, endpoint inspection, and selector diagnosis                                                                      |
| `namespace`      | `@swamp/kubernetes/namespace`      | Namespace CRUD, resource quotas, limit ranges, resource counts, health                                                         |
| `node`           | `@swamp/kubernetes/node`           | Node conditions, capacity, taints, cordon/uncordon, drain, metrics. `list` syncs: upserts live nodes and prunes departed ones. |
| `configmap`      | `@swamp/kubernetes/configmap`      | ConfigMap CRUD                                                                                                                 |
| `secret`         | `@swamp/kubernetes/secret`         | Secret CRUD with base64 decoding and vault-backed sensitive storage, idempotent `ensure`, and metadata-only `getMeta`          |
| `ingress`        | `@swamp/kubernetes/ingress`        | Ingress CRUD with TLS and rule inspection                                                                                      |
| `pvc`            | `@swamp/kubernetes/pvc`            | PersistentVolumeClaim and PersistentVolume listing                                                                             |
| `hpa`            | `@swamp/kubernetes/hpa`            | HorizontalPodAutoscaler CRUD and status                                                                                        |
| `job`            | `@swamp/kubernetes/job`            | Job CRUD, log retrieval, and cleanup                                                                                           |
| `netpol`         | `@swamp/kubernetes/netpol`         | NetworkPolicy listing, analysis, and connectivity testing                                                                      |
| `rbac`           | `@swamp/kubernetes/rbac`           | Roles, ClusterRoles, bindings; ServiceAccount create/update/delete, expiring token requests, and access checks                 |
| `event`          | `@swamp/kubernetes/event`          | Cluster events with filtering by type and involved object                                                                      |
| `externalsecret` | `@swamp/kubernetes/externalsecret` | External Secrets Operator ExternalSecrets: list, get, and `forceSync` to request an immediate resync                           |

### Rotating a credential synced by External Secrets

After rotating a value in the external store, ask External Secrets Operator to
resync, then restart the workload so its pods read the new Secret:

```bash
swamp model method run my-externalsecret forceSync --input externalSecretName=worker-creds
swamp model method run my-externalsecret get --input externalSecretName=worker-creds
swamp model method run my-statefulset restart --input statefulSetName=worker
```

`forceSync` sets the `force-sync` annotation to the current time plus a random
suffix, so every call changes it, with a merge patch. It returns at once and
does not wait for the controller. Check `refreshTime` and `ready` from `get`
before restarting. `restart` on `statefulset` and `deployment` does what
`kubectl rollout restart` does: it sets `kubectl.kubernetes.io/restartedAt` on
the pod template.

`externalsecret` needs the External Secrets Operator CRDs installed and, for
`forceSync`, permission to `patch` `externalsecrets.external-secrets.io`. It
uses `external-secrets.io/v1` and falls back to `v1beta1` when `v1` is not
served; pass `apiVersion` to pin one. It never reads secret values, and it does
not store the `data` entries or their remote keys.

### Patching resources in place

`deployment`, `statefulset`, `service`, `ingress`, `pod`, `configmap`,
`namespace`, `netpol`, `hpa` and `pvc` have a `patch` method; `job` has
`patchJob` and `patchCronJob`, and `rbac` has `patchServiceAccount`. A patch
changes only the fields it names, so it does not fight a GitOps controller over
the rest of the object the way a full replace does. Pick the format with
`patchType`:

- `merge` (default): an RFC 7386 JSON merge patch object. `null` removes a key.
  Lists are replaced whole.
- `strategic`: a Kubernetes strategic merge patch object. Lists such as
  `containers` merge by key, so one container can change without restating the
  others.
- `json`: an RFC 6902 array of operations (`add`, `remove`, `replace`, `move`,
  `copy`, `test`). A failed `test` rejects the whole patch.

```bash
# Point a Deployment's pods at another ServiceAccount
swamp model method run my-deployments patch \
  --input deploymentName=api \
  --input-file patch.yaml   # patch: {spec: {template: {spec: {serviceAccountName: api}}}}

# Scale to zero only if the replica count is still 3
swamp model method run my-deployments patch \
  --input deploymentName=api --input patchType=json \
  --input 'patch=[{"op":"test","path":"/spec/replicas","value":3},{"op":"replace","path":"/spec/replicas","value":0}]'
```

Each method needs `patch` permission on its resource. The patched object is
written to the model's usual resource, as `get` would. `secret` has no `patch`:
the patch body would carry secret values in the method arguments, which are not
stored as sensitive. Use `secret` `update` or `ensure` instead.

### ServiceAccounts, expiring tokens and access checks

`rbac` creates, updates and deletes ServiceAccounts:

- `createServiceAccount` takes optional `annotations`, `labels` and
  `automountToken`. Use it for an IRSA or workload-identity account, e.g.
  `annotations: {"eks.amazonaws.com/role-arn": "arn:aws:iam::123456789012:role/app"}`.
- `updateServiceAccount` sets keys with `setAnnotations` / `setLabels`, removes
  them with `removeAnnotations` / `removeLabels`, and can change
  `automountToken`. It sends a merge patch, so keys you do not name are left as
  they are.
- `deleteServiceAccount` deletes one.

`requestServiceAccountToken` asks the TokenRequest API for a token that expires,
instead of a long-lived token Secret. `expirationSeconds` defaults to 3600 and
must be at least 600. The API server may issue a shorter token than requested,
and `expirationTimestamp` records the expiry it actually issued. The token is a
sensitive field, so swamp stores it in the vault, never in plain data. Each
ServiceAccount has one `serviceAccountToken` record, named `<namespace>_<name>`,
which the next request replaces. The record expires when the token does.
`audiences` defaults to the API server's own.

`checkServiceAccountAccess` asks the API server what a ServiceAccount may do,
with one SubjectAccessReview per entry in `checks` (up to 100):

```bash
swamp model method run my-rbac checkServiceAccountAccess \
  --input serviceAccountName=dashboard --input-file checks.yaml
# checks:
#   - {verb: list, resource: pods}
#   - {verb: get, resource: deployments, group: apps, namespace: web}
#   - {verb: list, resource: nodes, clusterScoped: true}
```

Each check writes an `accessReview` record with `allowed`, `denied` and
`reason`. A check runs in the ServiceAccount's namespace unless it names another
`namespace`. Set `clusterScoped: true` for cluster-scoped resources such as
nodes, or to ask whether access holds in every namespace; a check cannot set
both, and `namespace` cannot be empty. Without it, a RoleBinding in one
namespace can grant a check that does not hold cluster-wide. A check cannot be
evaluated when the review request fails, or when the API server answers with an
`evaluationError` and neither allows nor explicitly denies (an authorizer
webhook timing out, say). Its record then carries `evaluationError`, the
remaining checks still run, and the method then fails. An explicit deny is an
answer, even with an `evaluationError` alongside it.

Permissions: `requestServiceAccountToken` needs `create` on
`serviceaccounts/token`; `checkServiceAccountAccess` needs `create` on
`subjectaccessreviews.authorization.k8s.io`, which is cluster-wide.

### Logs from a deployment

`deployment` `getLogs` reads a deployment's logs without knowing a pod name. It
finds the pods by the deployment's pod-template labels (falling back to the
whole `spec.selector`, `matchExpressions` included), and keeps only pods whose
ReplicaSet this deployment owns, so a second deployment with overlapping labels
(a canary, say) is never read. It skips pods that are terminating or finished,
such as evicted pods, and takes a Ready pod first, then a Running one
(crash-looping, say), then a Pending one, newest first within each. With no
`container` it uses the pod's `kubectl.kubernetes.io/default-container`
annotation, then its first container, as `kubectl logs` does. `tailLines`
defaults to 100, and `previous: true` reads the crashed instance. During a
rollout this is usually a pod from the new ReplicaSet. It needs `list` on `pods`
and `get` on `pods/log`, and `list` on `replicasets` in the `apps` group.

```bash
swamp model method run my-deployments getLogs \
  --input deploymentName=api --input tailLines=200
```

### Secrets without stored values

`get`, `create` and `update` write the decoded values to the `secret` resource
(sensitive, so stored in the vault). `ensure` and `getMeta` write only the
`secretMeta` resource — name, type, data key names, labels and `resourceVersion`
— so secret values never reach swamp's datastore.

- `getMeta` reads one Secret's metadata. It fails if the Secret does not exist.
- `ensure` creates the Secret if it is absent. Otherwise it replaces it only
  when the data or labels differ, and records `action` as `created`, `updated`
  or `unchanged`. The replace carries the read `resourceVersion`, so it never
  overwrites a concurrent change: on a 409 it reads the Secret again and
  recomputes, and fails with the 409 only if the conflict persists for five
  attempts.
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

| Workflow               | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `namespace-debug`      | Debug a namespace — pods, events, deployments, services   |
| `debug-namespace-deep` | Deep namespace debug with logs and network policies       |
| `deployment-status`    | Deployment rollout status with ReplicaSets and pod health |
| `service-connectivity` | Service endpoint and selector diagnosis                   |
| `cluster-health`       | Cluster-wide node, pod, and storage health                |
| `cluster-summary`      | High-level cluster overview across namespaces             |
| `security-audit`       | RBAC, network policies, and pod security review           |
| `rbac-audit`           | Detailed RBAC role and binding analysis                   |
| `storage-health`       | PVC binding status and PV capacity review                 |
| `autoscaling-status`   | HPA metrics and scaling status                            |
| `batch-jobs-status`    | Job completion, failures, and active runs                 |
| `network-audit`        | NetworkPolicy coverage and connectivity analysis          |
| `pod-inventory`        | Pod inventory with phase and restart counts               |
| `pod-health-check`     | Pod health with metrics and event correlation             |

## Requirements

- A valid kubeconfig with access to the target cluster.
- `kubectl` on `$PATH` (only required for the `pod.exec` method).
- `metrics-server` installed in the cluster (only required for metrics methods).

## License

AGPL-3.0 — see [LICENSE.txt](LICENSE.txt).
