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

| Field | Required | Description |
|---|---|---|
| `bucket` | Yes | GCS bucket name (3-63 chars, lowercase `[a-z0-9._-]`, cannot start with `goog` or contain `google`) |
| `prefix` | No | Object name prefix within the bucket (e.g. `swamp/prod`) |
| `projectId` | No | GCP project ID. Defaults to the project from Application Default Credentials. |
| `apiEndpoint` | No | Custom API endpoint URL for emulators (e.g. [fake-gcs-server](https://github.com/fsouza/fake-gcs-server)). When set, authentication is skipped — matching the behavior of Google's official client libraries with `STORAGE_EMULATOR_HOST`. |
| `defaultRequestTimeoutMs` | No | Per-request timeout in milliseconds (default: `30000`). Every outbound GCS call is guarded by this deadline. Operations that legitimately run longer than the default (large-file uploads on slow links, say) should raise this. Setting it too low makes transient network blips look like timeouts. |

## Timeouts and cancellation

Every outbound GCS request runs under a composite abort signal: the
per-request deadline (`defaultRequestTimeoutMs`, 30 s default) composed
with any caller-supplied `AbortSignal`. Stalls surface as
`TimeoutError`; upstream cancellation surfaces as `AbortError`. Prior
to this, stalled sockets could hang indefinitely — switching to
bounded timeouts is a user-visible behavior change: operations that
legitimately exceed 30 s now error instead of hanging. Raise
`defaultRequestTimeoutMs` in the datastore config if your workload
needs longer deadlines.

Errors from GCS now carry structured detail:

- `GcsOperationError` exposes `httpStatusCode`, `code` (the
  `error.errors[0].reason` from the JSON envelope, e.g. `"authError"`
  or `"rateLimitExceeded"`), `bodyPreview` (first 256 bytes of the
  response body), and `uploadId` (the `X-GUploader-UploadID`
  response header, populated on upload-path responses).
- `NotFoundError` (404) and `PreconditionFailedError` (412) are
  preserved as narrow types so existing catches keep matching.
- 401/403 responses include a credential-source hint in the error
  message to shorten the diagnostic loop.

### Example `.swamp.yaml`

```yaml
datastore:
  type: "@swamp/gcs-datastore"
  config:
    bucket: my-team-swamp
    prefix: production
```

## Authentication

This datastore uses **Google Cloud Application Default Credentials (ADC)**.
No credentials are stored in the config — authentication is resolved from the
environment at runtime.

> **Note:** When `apiEndpoint` is configured (emulator mode), authentication
> is skipped entirely. No credentials are required.

ADC checks the following sources in order:

1. **`GOOGLE_APPLICATION_CREDENTIALS`** environment variable — path to a
   service account key JSON file.
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

| Permission | Used for |
|---|---|
| `storage.buckets.get` | Health checks (verify bucket exists) |
| `storage.objects.get` | Reading data and lock files |
| `storage.objects.create` | Writing data and acquiring locks |
| `storage.objects.delete` | Releasing locks and cleanup |
| `storage.objects.list` | Sync service (listing remote files) |

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
  `objects.delete`, and `objects.list` (lighter than `objectAdmin` — no
  IAM policy permissions)
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
  succeeds if no live version of the object exists (generation 0 means
  "create only"). This is an atomic create-if-absent operation.
- **Heartbeat** — while the lock is held, a background interval extends the
  lock using a CAS write with `ifGenerationMatch=<current generation>`.
  If the generation changed (meaning another process took the lock), the
  CAS fails and the holder knows it lost ownership.
- **Release** — deletes the lock object with `ifGenerationMatch=<current generation>`,
  ensuring we only delete our own lock. If a heartbeat raced with the
  release, the cleanup path handles the new generation.
- **Stale lock cleanup** — if a lock object's `updated` timestamp plus its
  TTL is in the past, another acquirer will delete the stale lock and retry.
  Default TTL is 30 seconds. The steal path is rate-limited by a
  randomized 200-500 ms backoff between attempts so two contenders
  never tight-loop against the real holder's heartbeat.

### Health Checks

The verifier issues a `GET /storage/v1/b/{bucket}` request (the standard
GCS bucket metadata endpoint) to confirm:
- The bucket exists
- Credentials are valid
- IAM permissions are sufficient (`storage.buckets.get`)

Returns latency metrics and diagnostic hints on failure (missing bucket,
bad credentials, insufficient permissions).

### Bidirectional Sync

The cache sync service maintains a local cache directory and syncs with GCS:

- **Pull** — downloads a metadata index from GCS, compares file sizes against
  local files, and downloads only new or changed files. Uses concurrent
  batches of 10 for throughput.
- **Push** — walks the local cache directory, compares size and mtime against
  the index, and uploads only changed files. Updates the remote index after
  a successful push.
- **Index** — a `.datastore-index.json` file in GCS tracks file sizes and
  timestamps. The local copy has a 60-second TTL to avoid redundant fetches
  during rapid command sequences.
- **Fast path** — a `.datastore-sync-state.json` sidecar records the
  remote index's GCS `generation` from the last verified-clean sync.
  The next `pullChanged` / `pushChanged` HEADs the remote index first;
  on generation match, it short-circuits without the full index GET or
  the cache walk. Self-healing: any remote mutation changes the
  generation and falls through to the slow path. External writers
  into the cache (e.g. swamp-core's repository layer using
  `atomicWriteFile`) MUST call `DatastoreSyncService.markDirty()` so
  the fast-path short-circuit knows to run a full walk on the next
  `pushChanged`. Without `markDirty`, the external write is silently
  skipped on the next sync.
- **Tracing** — set `SWAMP_GCS_SYNC_TRACE=1` to emit coarse per-phase
  timing lines (`[gcs-sync] pullChanged.fastpath <ms> hit`,
  `[gcs-sync] pushChanged.walk <ms> toPush=<n>`, etc.). Off by default;
  useful when diagnosing a slow sync.
- **Retry envelope** — per-object GET / PUT (including the index
  writeback) runs under a 3-attempt exponential-backoff retry with
  ±25% jitter. Retryable conditions: 5xx, 429, `TimeoutError`, and
  transport-level failures (ECONNRESET, DNS, TLS). 4xx other than
  429, `NotFoundError`, `PreconditionFailedError`, and `AbortError`
  are terminal (no retry). Conditional writes used by the lock
  (`putObjectConditional`, `putObjectCas`) are **not** retry-wrapped:
  retrying a lost CAS would retry a known-losing race. One
  operator-visible consequence of the retry envelope: a single
  transient-5xx-affected file may be billed up to 3× on Cloud
  Storage PUT metrics — by design, not a regression.
