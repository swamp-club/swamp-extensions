# @swamp/gcs-datastore

Store swamp data in a Google Cloud Storage bucket with local cache
synchronization, distributed locking, and health checks.

## Installation

```bash
swamp extension pull @swamp/gcs-datastore
```

## Configuration

```bash
swamp datastore setup @swamp/gcs-datastore \
  --config '{"bucket": "my-swamp-bucket", "prefix": "swamp"}' --json
```

| Field              | Required | Description                                                                                                                                                                                                                                |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `bucket`           | Yes      | GCS bucket name (3-63 chars, lowercase `[a-z0-9._-]`, cannot start with `goog` or contain `google`)                                                                                                                                        |
| `prefix`           | No       | Object name prefix within the bucket (e.g. `swamp/prod`)                                                                                                                                                                                   |
| `projectId`        | No       | GCP project ID. Defaults to the project from Application Default Credentials.                                                                                                                                                              |
| `apiEndpoint`      | No       | Custom API endpoint URL for emulators (e.g. [fake-gcs-server](https://github.com/fsouza/fake-gcs-server)). When set, authentication is skipped — matching the behavior of Google's official client libraries with `STORAGE_EMULATOR_HOST`. |
| `pullConcurrency`  | No       | Maximum concurrent GCS downloads during pull (default: `50`, max: `1000`).                                                                                                                                                                 |
| `pushConcurrency`  | No       | Maximum concurrent GCS uploads during push (default: `25`, max: `1000`).                                                                                                                                                                   |
| `requestTimeoutMs` | No       | Per-request timeout in milliseconds (default: `30000`, range: 1000-600000). Override with `SWAMP_GCS_REQUEST_TIMEOUT_MS` env var (env var takes precedence).                                                                               |

## Timeouts and cancellation

Every outbound GCS request runs under a composite abort signal: the per-request
deadline (`requestTimeoutMs`, 30 s default) composed with any caller-supplied
`AbortSignal`. Stalls surface as `TimeoutError`; upstream cancellation surfaces
as `AbortError`. Prior to this, stalled sockets could hang indefinitely —
switching to bounded timeouts is a user-visible behavior change: operations that
legitimately exceed 30 s now error instead of hanging. Raise `requestTimeoutMs`
in the datastore config or set the `SWAMP_GCS_REQUEST_TIMEOUT_MS` environment
variable if your workload needs longer deadlines:

```bash
export SWAMP_GCS_REQUEST_TIMEOUT_MS=120000
```

Errors from GCS now carry structured detail:

- `GcsOperationError` exposes `httpStatusCode`, `code` (the
  `error.errors[0].reason` from the JSON envelope, e.g. `"authError"` or
  `"rateLimitExceeded"`), `bodyPreview` (first 256 bytes of the response body),
  and `uploadId` (the `X-GUploader-UploadID` response header, populated on
  upload-path responses).
- `NotFoundError` (404) and `PreconditionFailedError` (412) are preserved as
  narrow types so existing catches keep matching.
- 401/403 responses include a credential-source hint in the error message to
  shorten the diagnostic loop.

### Example `.swamp.yaml`

```yaml
datastore:
  type: "@swamp/gcs-datastore"
  config:
    bucket: my-team-swamp
    prefix: production
```

## Authentication

This datastore uses **Google Cloud Application Default Credentials (ADC)**. No
credentials are stored in the config — authentication is resolved from the
environment at runtime.

> **Note:** When `apiEndpoint` is configured (emulator mode), authentication is
> skipped entirely. No credentials are required.

ADC checks the following sources in order:

1. **`GOOGLE_APPLICATION_CREDENTIALS`** environment variable — path to a service
   account key JSON file.
2. **gcloud CLI credentials** — created by running
   `gcloud auth application-default login`. Stored at
   `~/.config/gcloud/application_default_credentials.json`.
3. **Attached service account** — automatically available on GCE instances,
   Cloud Run services, GKE pods, and Cloud Functions.

For local development, the simplest approach is:

```bash
gcloud auth application-default login
```

For CI/CD and production, use a service account key or
[workload identity federation](https://cloud.google.com/iam/docs/workload-identity-federation).

## Required IAM Permissions

The authenticated principal needs the following permissions on the bucket:

| Permission               | Used for                                                               |
| ------------------------ | ---------------------------------------------------------------------- |
| `storage.buckets.get`    | Health checks (verify bucket exists)                                   |
| `storage.objects.get`    | Reading data and lock files                                            |
| `storage.objects.create` | Writing data, acquiring locks, and the health-check precondition probe |
| `storage.objects.delete` | Releasing locks, cleanup, and removing the health-check probe object   |
| `storage.objects.list`   | Sync service (listing remote files)                                    |

### Recommended approach: custom role

For least-privilege, create a custom role with exactly these permissions:

```bash
gcloud iam roles create swampDatastore \
  --project=my-project \
  --title="Swamp Datastore" \
  --permissions=storage.buckets.get,storage.objects.get,storage.objects.create,storage.objects.delete,storage.objects.list
```

Then bind it to your service account:

```bash
gcloud storage buckets add-iam-policy-binding gs://my-swamp-bucket \
  --member="serviceAccount:swamp@my-project.iam.gserviceaccount.com" \
  --role="projects/my-project/roles/swampDatastore"
```

### Alternative: predefined roles

If you prefer predefined roles, you need two:

- **`roles/storage.objectUser`** — covers `objects.get`, `objects.create`,
  `objects.delete`, and `objects.list` (lighter than `objectAdmin` — no IAM
  policy permissions)
- **`roles/storage.legacyBucketReader`** — covers `buckets.get`

```bash
gcloud storage buckets add-iam-policy-binding gs://my-swamp-bucket \
  --member="serviceAccount:swamp@my-project.iam.gserviceaccount.com" \
  --role="roles/storage.objectUser"

gcloud storage buckets add-iam-policy-binding gs://my-swamp-bucket \
  --member="serviceAccount:swamp@my-project.iam.gserviceaccount.com" \
  --role="roles/storage.legacyBucketReader"
```

## How It Works

### Distributed Locking

Locks use **GCS generation-based preconditions** for atomic lock acquisition.
Every GCS object has a `generation` number — a monotonically increasing value
assigned by GCS on each write — enabling compare-and-swap (CAS) semantics:

- **Acquire** — writes a lock object with `ifGenerationMatch=0`, which only
  succeeds if no live version of the object exists (generation 0 means "create
  only"). This is an atomic create-if-absent operation.
- **Heartbeat** — while the lock is held, a background interval extends the lock
  using a CAS write with `ifGenerationMatch=<current generation>`. If the
  generation changed (meaning another process took the lock), the CAS fails and
  the holder knows it lost ownership.
- **Release** — deletes the lock object with
  `ifGenerationMatch=<current generation>`, ensuring we only delete our own
  lock. If a heartbeat raced with the release, the cleanup path handles the new
  generation.
- **Stale lock cleanup** — if a lock object's `updated` timestamp plus its TTL
  is in the past, another acquirer will delete the stale lock and retry. Default
  TTL is 30 seconds. The steal path is rate-limited by a randomized 200-500 ms
  backoff between attempts so two contenders never tight-loop against the real
  holder's heartbeat.

### Health Checks

The verifier issues a `GET /storage/v1/b/{bucket}` request (the standard GCS
bucket metadata endpoint) to confirm:

- The bucket exists
- Credentials are valid
- IAM permissions are sufficient (`storage.buckets.get`)

Returns latency metrics and diagnostic hints on failure (missing bucket, bad
credentials, insufficient permissions). The configured `requestTimeoutMs`
applies to these requests.

It then probes generation preconditions, because everything above can succeed on
an endpoint that would still corrupt data. Locking rests on `ifGenerationMatch`
(see [Distributed Locking](#distributed-locking)), and an endpoint that silently
ignores it — 200 where a 412 is required — hands the lock to every writer at
once and loses index updates, with nothing reporting it. Real GCS honours
preconditions; the exposure is emulators, proxies, and GCS-compatible fronts.

The probe writes a throwaway `_control/conditional-write-probe-<uuid>` key,
repeats the write to confirm the precondition is enforced, tries a deliberately
stale `ifGenerationMatch`, and deletes the key. The result is reported as
`details.conditionalWrites`:

| Verdict        | Healthy | Meaning                                                                                                                                                                                                         |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `supported`    | yes     | preconditions are enforced                                                                                                                                                                                      |
| `ignored`      | **no**  | a precondition was silently ignored; distributed locking would not be safe                                                                                                                                      |
| `write-denied` | **no**  | the request was not authenticated, or lacks `storage.objects.create` / `storage.objects.delete` under the configured prefix — named separately so a permissions problem is not mistaken for a compatibility bug |
| `inconclusive` | **no**  | the probe could not run                                                                                                                                                                                         |

A failed precondition is accepted as either a 412 (what real GCS returns) or a
409, so an endpoint that reports the conflict with the wrong status is not
misread as ignoring the precondition.

`_control/` is deliberate: `isInternalCacheFile` already filters it from cache
hydration, so a probe object left behind cannot surface as a phantom data file.

The verdict is memoized per process for 5 minutes, keyed on endpoint, bucket and
prefix — `swamp serve` streams health once a second, and the probe must not
become sustained write traffic. A repaired endpoint therefore takes up to 5
minutes to report healthy again in a long-running `swamp serve`;
`swamp datastore setup` runs in a fresh process and always probes for real.

Cleanup is best-effort. An endpoint that honours preconditions but rejects
`DELETE` is still safe for locking, so verification stays healthy and reports
`details.probeCleanup: "failed"` with the key it could not remove. Probe objects
then accumulate under `_control/` (at most one per process per 5 minutes) and
need occasional manual cleanup.

### Bidirectional Sync

The cache sync service maintains a local cache directory and syncs with GCS:

- **Pull** — downloads a metadata index from GCS, compares file sizes against
  local files, and downloads only new or changed files. Uses configurable
  concurrent batches (default: 50) for throughput.
- **Push** — walks the local cache directory, compares size and mtime against
  the index, and uploads only changed files. Uses configurable concurrent
  batches (default: 25). Updates the remote index after a successful push.
- **Index** — a `.datastore-index.json` file in GCS tracks file sizes,
  timestamps, and SHA-256 content hashes. The local copy has a 60-second TTL to
  avoid redundant fetches during rapid command sequences.
- **Shard-first index** — after migration to v2
  (`swamp datastore migrate-index`), per-model partition shards under `_index/`
  are the source of truth. Commits write only the dirty shards and `_meta.json`,
  skipping the monolithic `.datastore-index.json` upload entirely. Pre-v2 repos
  continue dual-writing both formats. Every shard and `_meta.json` write is a
  compare-and-swap merge (`ifGenerationMatch`) with bounded retry: a writer
  applies only its own additions and deletions, so concurrent writers never drop
  each other's index entries, with or without the global lock. Shards emptied by
  deletions are unlisted from `_meta.json` but left in place as empty objects.
  When core provides a scoped sync context (`context.models`), pull reads only
  the relevant partition files instead of the full monolithic index. Falls back
  to monolithic when partition files are missing (old writer).
- **Content hashing** — push computes SHA-256 for each uploaded file and stores
  it in the index. Change detection uses three branches: size differs → push;
  same size + same mtime → skip (stat-only); same size + different mtime →
  compare SHA-256 hashes (avoids redundant uploads when only mtime drifted).
- **Per-path dirty tracking** — `markDirty(options)` accepts a `relPath`
  argument and tracks per-path dirty sets (capped at 200 paths). When pushing,
  only dirty directories/files are walked instead of the entire cache. Overflows
  (> 200 paths) or path-escape trigger a full walk fallback. Such a push
  assembles only the partition shards that can hold files under a dirty path (a
  data name's `latest` sits in the type shard and its version files in the model
  shard), so it merges its delta into the on-disk `.datastore-index.json` rather
  than replacing it, and it re-arms the pull fast path when the sidecar was
  already at the `commitSeq` the push read — a process that writes often keeps
  its own fast path armed instead of disarming it on every write.
- **Scoped sync** — advertises `capabilities().scopedSync = true`. When core
  passes `context.models`, pull reads partition files for just those models,
  avoiding the full monolithic index parse.
- **Config refresh / subdir-scoped pull** — advertises
  `capabilities().configRefresh = true`. When core passes `subdirs` (e.g.
  `["config"]`), pull only lists, walks, prunes, and downloads index entries
  under those prefixes. A scoped pull does not advance the fast-path sidecar or
  clear lazy hydration, so a later full pull still picks up out-of-scope
  changes.
- **Namespace-scoped sync** — when `options.namespace` is set, index operations
  scope to `{namespace}/.datastore-index.json` and data walks are restricted to
  the namespace subtree. The pull's bulk-diff listing is scoped the same way —
  it lists `{namespace}/` plus the root-level segments the index references, so
  a bucket prefix shared with other namespaces costs O(this namespace) rather
  than O(every namespace under the prefix). The root-level segments are still
  listed because `pullFile` falls back to a pre-namespace root key when the
  namespaced key 404s. Three additional methods support multi-repo shared
  datastores: `exportCatalog`, `pullForeignCatalogs`, and `fetchForeignContent`.
  Solo mode (no namespace) is fully backward compatible.
- **Namespace manifest support** — the provider implements `registerNamespace`
  and `listNamespaces` for multi-repo conflict detection. `registerNamespace`
  writes a `.namespace.json` manifest to `{namespace}/.namespace.json` in the
  bucket, with check-then-write conflict detection (a second repo with a
  different `repoId` is rejected). `listNamespaces` scans the bucket for all
  registered namespace manifests and returns the namespace slugs.
- **Fast path** — a `.datastore-sync-state.json` sidecar (v2) records the remote
  index's GCS `generation` from the last verified-clean sync, along with dirty
  paths and bulk-invalidation state. The next `pullChanged` / `pushChanged`
  HEADs the remote index first; on generation match (and clean local state), it
  short-circuits without the full index GET or the cache walk. Self-healing: any
  remote mutation changes the generation and falls through to the slow path.
  External writers into the cache (e.g. swamp-core's repository layer using
  `atomicWriteFile`) MUST call `DatastoreSyncService.markDirty()` so the
  fast-path short-circuit knows to run a full walk on the next `pushChanged`.
  Without `markDirty`, the external write is silently skipped on the next sync.
- **Tracing** — set `SWAMP_GCS_SYNC_TRACE=1` to emit coarse per-phase timing
  lines (`[gcs-sync] pullChanged.fastpath <ms> hit`,
  `[gcs-sync] pushChanged.walk <ms> toPush=<n>`, etc.). Off by default; useful
  when diagnosing a slow sync.
- **Retry envelope** — per-object GET / PUT (including the index writeback) runs
  under a 3-attempt exponential-backoff retry with ±25% jitter. Retryable
  conditions: 5xx, 429, `TimeoutError`, and transport-level failures
  (ECONNRESET, DNS, TLS). 4xx other than 429, `NotFoundError`,
  `PreconditionFailedError`, and `AbortError` are terminal (no retry).
  Conditional writes used by the lock (`putObjectConditional`, `putObjectCas`)
  are **not** retry-wrapped: retrying a lost CAS would retry a known-losing
  race. One operator-visible consequence of the retry envelope: a single
  transient-5xx-affected file may be billed up to 3× on Cloud Storage PUT
  metrics — by design, not a regression.

## Observability

The extension emits [OpenTelemetry](https://opentelemetry.io/) spans for GCS
operations, lock acquisition/release, and push/pull sync. Spans are no-ops when
no `TracerProvider` is configured in the host process. When swamp is running
with OTel enabled, datastore activity appears in traces with attributes
following OTel semantic conventions (bucket, key, HTTP status).

## Backward compatibility

- Pre-v2 repos continue to write the monolithic `.datastore-index.json`
  alongside partition shards (dual-write). After v2 migration, the monolithic
  index is no longer written on push — shards are the source of truth. Clients
  that only read the monolith should migrate.
- Old clients ignore the `sha256` field in index entries (JSON forward compat).
- A v1 sidecar read by the new code triggers a full walk (safe fallback).
- The `_index/` directory is excluded from sync — old clients never see it.
- Versions before 2026.09.24.1 wrote lazily hydrated files under a doubled
  `<namespace>/<namespace>/data/` path in the local cache and could push them
  back to `<namespace>/<namespace>/data/...` keys (swamp-club#2404). Those paths
  are never synced now. On a full-walk push a stray local file is deleted when
  the index shows the same content at the real path, and kept and reported
  otherwise. Every client sharing the datastore needs this version before new
  stray objects stop appearing. Existing remote `<namespace>/<namespace>/`
  objects are inert and can be deleted by hand. Namespaces named after a
  datastore subdirectory (`data`, `files`, `outputs`, …) are left alone, because
  their paths are ambiguous.

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
