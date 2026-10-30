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

Chunk storage's `touch` rewrites an object onto itself, which these already
cover (`storage.objects.get`, `.create` and `.delete`); it needs no
`storage.objects.update`.

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
  using a CAS write with `ifGenerationMatch=<current generation>`. A CAS miss
  alone does not prove the lock changed hands — an earlier write may have landed
  with its response lost — so the holder reads the lock back and checks the
  nonce before deciding.
- **Release** — deletes the lock object with
  `ifGenerationMatch=<current generation>`, ensuring we only delete our own
  lock. If a heartbeat raced with the release, the cleanup path handles the new
  generation.
- **Stale lock cleanup** — if a lock object's `updated` timestamp plus its TTL
  is in the past, another acquirer will delete the stale lock and retry. Default
  TTL is 30 seconds. The steal path is rate-limited by a randomized 200-500 ms
  backoff between attempts so two contenders never tight-loop against the real
  holder's heartbeat.

Losing a lock is never silent. Two answers end the hold outright: the lock
object is gone, or it carries another holder's nonce. Anything else — an
unreachable endpoint, a 403, a write that threw, or a CAS miss that cannot be
read back — leaves the lock held and retries on the next tick, because none of
those establish that the lock changed hands. That grace is bounded by the TTL:
the object is stealable once its `updated` time is `ttlMs` old, so the hold ends
just before that — counted from when the last confirmed write was sent, which is
never later than when it committed, and enforced by a timer of its own rather
than the next heartbeat tick. If a heartbeat write commits after the hold has
already ended, it is deleted again (fenced on the generation it created), and
`release()` after a given-up hold removes our last write if nobody has replaced
it, so contenders do not wait out a TTL for a lock nobody holds. A lock lost
while its operation is still running is logged as a warning naming the key, as
is the first failed heartbeat of an outage.

Reading the lock reports failures rather than hiding them: `inspect()` returns
`null` only when GCS says the lock object does not exist, and throws when the
bucket cannot be read, so an outage is never mistaken for an unheld lock.

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
  `migrate-index` on a remote with no v2 `_meta.json` merges any shards already
  in the bucket with the monolith rather than overwriting them, because a
  leftover monolith can be missing newer commits. The newer entry wins, an entry
  whose object is gone from the bucket is dropped, another namespace's entries
  stay out, and an unreadable shard stops the migration until it is repaired or
  removed. A credential scoped to its namespace cannot confirm a delete or see
  other namespaces' markers at the root, so it drops nothing and leaves out only
  what its own prefix marks.
- **Content hashing** — push computes SHA-256 for each uploaded file and stores
  it in the index. Change detection on push and pull: size differs → changed;
  same size and this copy's own mtime record (`.datastore-local-mtimes.json`,
  local-only and never synced) shows the file unchanged → skip; otherwise
  compare SHA-256 hashes. The index's `localMtime` is the pushing machine's, so
  it never decides on its own. A same-size file whose entry has no sha256 is
  pushed once unless this copy recorded it, which adds the hash. A cache
  upgraded from an earlier version has no record yet: on its first sync it seeds
  one, once, from its local index for entries without a sha256 whose file still
  has the indexed size and mtime, so those legacy files are trusted as before
  rather than re-uploaded.
- **Per-path dirty tracking** — `markDirty(options)` accepts a `relPath`
  argument and tracks per-path dirty sets (capped at 200 paths). When pushing,
  only dirty directories/files are walked instead of the entire cache. Overflows
  (> 200 paths) or path-escape trigger a full walk fallback. Such a push
  assembles only the partition shards that can hold files under a dirty path (a
  data name's `latest` sits in the type shard and its version files in the model
  shard), so it merges its delta into the on-disk `.datastore-index.json` rather
  than replacing it, and it re-arms the pull fast path when the sidecar was
  already at the `commitSeq` the push read — a process that writes often keeps
  its own fast path armed instead of disarming it on every write. A push with
  nothing to send records the remote `commitSeq` only after it has read the
  whole index; after a model-scoped pull it leaves the sidecar's `commitSeq` as
  it was, so the next full pull still fetches what other hosts committed.
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
- **Single-file remote read** — `fetchContent(relPath, options)` returns the
  bytes of one object as the bucket holds it, or `null` when it does not exist,
  and writes nothing to the local cache, index, or sync state. `relPath` is
  cache-relative, so with a namespace it already starts with `{namespace}/` and
  is used as the object key as given; a path outside `options.namespace`, an
  absolute path, or one with a `..` segment is rejected. The pre-namespace root
  key that `pullFile` falls back to is not read. GCS also answers 404 for a
  bucket that does not exist, so a miss is reported as `null` only after an
  object listing confirms the bucket (`storage.objects.list`, which sync already
  needs); any other failure is an error. Transient failures are retried with
  backoff, as on a pull.
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
  A pull never marks the cache clean. It still replaces a changed file with the
  bucket's copy when they differ, but the cache stays marked dirty until a push
  succeeds, so a retry that writes the change again and calls `markDirty` pushes
  it instead of taking the fast path. The cost is one slow-path push after such
  a pull, even when nothing is left to send. A push clears only the marks it
  handled: it takes a snapshot of the dirty marks before it reads anything, and
  clears a mark only when nobody marked that path (or the whole cache) again
  while it ran, so a write that lands during a push, from a parallel workflow
  step sharing the service, stays dirty for the next one. A push's own uploads
  do not mark the cache dirty, and a failed push leaves its marks as they were.
  A file that vanishes while a push walks or uploads it is skipped and its mark
  kept: it never fails the push, and it is never read as a deletion of the files
  beside it. Only a marked path that is itself absent is deleted from the
  bucket. A whole-cache walk that cannot finish fails the push instead of
  reading what it did not visit as deleted. Atomic-write temp files
  (`.<uuid>.tmp`) are never synced. A file a peer deletes stays
  deleted. When a pull or push reads the bucket's index, a local file whose
  entry was in the last-synced index but is gone from the bucket's is removed
  from the cache, with any directories that leaves empty. Without this the file
  would stay cached with no index entry, and the next push would upload it
  again, undoing the peer's `swamp data gc`. Only a copy that is unchanged since
  it was synced is removed: same size and a matching sha256, or for an entry
  without one, this copy's own recorded mtime. A copy changed locally is kept,
  and a later push that walks it uploads it. The saved index is updated only
  after the removal, so an interrupted pull is finished by the next one. Nothing
  is removed when the bucket's index is missing or lists no entries in scope,
  since that reads the same as a wiped index. Files already orphaned by earlier
  versions are not in the last-synced index, so they are not removed; run
  `swamp data gc` once on that peer to clear them. An index entry whose object
  is missing from the bucket is different: the pull drops the entry but keeps
  the local copy, so a later push can upload it again, since the object may have
  gone because of an expiry rule or a mistaken delete and the local copy may be
  the last one.
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

## Datastore-wide control plane and the v3 writer lease

Swamp keeps a few records for the whole datastore, outside every namespace, at
`<prefix>/_control/<key>`: the format marker `datastore-format`, which it reads
before a command opens the datastore, the v3 writer lease's records under
`writer/`, and the v3 replication lineage records under `lineage/`
(`lineage/<fence>/started.json`, `head-<writer fence>.json`, `confirmed.json`;
swamp-club#3482). The provider's `datastoreControlPlaneStore()` reads and writes
them:

- It binds no namespace and shares nothing with a sync service. Building it
  makes no request, and a read is one object GET with no credentials preflight.
  A failure still carries the same credential hint as every other GCS request.
- `get` returns null only when the record is missing. A 403, a 5xx, an abort and
  a missing bucket all reject. GCS answers 404 for a missing bucket too, so a
  404 is confirmed with one listing before it reads as absent.
- `putIfAbsent` is a simple upload with `ifGenerationMatch=0`, so of concurrent
  creates of one key exactly one wins.

The provider declares `datastoreWideLease: true`: no namespaced pull or push
moves or copies `_control/writer/`. A namespaced push into a namespace that
still has the legacy `<namespace>/.datastore-index.json` (one a solo datastore
was upgraded to) moves the root `_control/` records into
`<namespace>/_control/`, as before, except `_control/writer/...`,
`_control/lineage/...` and `_control/datastore-format`, which stay at the root
where swamp reads them (swamp-club#3395). An older extension version would move
the lease and the lineage. Swamp's v3 on buckets (Phase 4E) needs this version
or later; see the Litestream replica target section below.

The sync service never syncs a datastore it cannot read (swamp-club#3549).
Before its first pull, push or other remote data operation it reads the root
`_control/datastore-format` once, whatever namespace it binds, and refuses a
marker whose `minReaderFormat` (or `format`) is 3 or newer, or one that is not a
valid marker, with code `datastore_format_unsupported` and a message telling the
user to upgrade swamp; nothing is listed, read or written. Swamp releases from
v20261008.201010.0 refuse such a datastore themselves, so this matters for older
binaries, which load this extension from a v3 repository's lockfile. A marker
that cannot be read (a 403, a 5xx, no answer within 3 seconds) does not block:
the operation that met it goes ahead in full as before, as swamp's own check
does, and the next operation swamp starts reads the marker again, up to three
failed reads per service. A marker that was read is remembered. So an operation
refuses at its start or runs to the end: it waits out at most one deadline and
never stops partway, even when another operation re-reads the marker meanwhile
(a push's commit phase belongs to its push). For a pull or push the
read runs alongside the credentials preflight, adding no round trip, and its 3
seconds count from when credentials resolve; for a single-file read they count
from the start, so a cold first one may fail open and leave the check to the
next operation. Building the service, `markDirty` and the control-plane stores
never check.

## Chunk storage (`storage/1`)

The provider's `storage()` returns the `storage/1` chunk storage a v3 datastore
uses: immutable, content-addressed chunks at
`<prefix>/_blobs/<namespace>/sha256/<first two hex>/<sha256>`, where
`<namespace>` is the repository's namespace or `_default` (swamp-club#3492).
Swamp first calls it in datastore rework Phase 4E, which is not yet released;
until then the extension stores nothing there. `_blobs/` is never part of the
file sync: a pull or push neither lists nor uploads it. Nor is `_litestream/`,
where Litestream replicates a v3 datastore's commit log (swamp-club#3549).

- **Chunk size.** `capabilities().maxChunkBytes` is 16 MiB, the largest size
  swamp cuts. A put is a single simple (`uploadType=media`) upload, never a
  resumable one.
- **Atomic puts, clean aborts.** GCS commits a simple upload whole or not at
  all, so a reader never sees a partial chunk. An aborted put therefore leaves
  no object and no resumable session behind. The tests show the client tears the
  request down and that an emulator commits nothing; that GCS itself discards a
  body it never received whole is its documented behaviour, not something the
  tests measure.
- **`has`, tuned for price.** Hashes are grouped by their two-hex shard. A shard
  holding 13 or more of the batch's hashes is listed (one request per 1,000
  chunks in that shard); the rest are checked one metadata GET each, 16 at a
  time. GCS bills a list as a Class A operation
  ($0.005 per 1,000) and a metadata GET as Class B ($0.0004 per 1,000), 12.5x
  apart (S3 and R2 share the ratio), so a listing only pays for itself at 13 or
  more hashes in a shard. A typical call (one commit's chunks) takes the
  per-hash path; bulk callers list automatically. Only a 404 reads as absent;
  any other failure rejects, so an unreadable chunk never reads as missing.
  Measured request counts:

  | Call                                                               | Requests             |
  | ------------------------------------------------------------------ | -------------------- |
  | `has` on 10 hashes, all stored                                     | 10 metadata GETs     |
  | `has` on 1,000 hashes spread over all shards (at most 4 per shard) | 1,000 metadata GETs  |
  | `has` on 1,000 hashes in 2 shards                                  | 2 listings           |
  | `touch` on 10 or 1,000 hashes                                      | one rewrite per hash |

  When any hash is missing, `has` adds one listing to confirm the bucket exists,
  since a 404 alone cannot tell a missing chunk from a missing bucket. `touch`
  does the same when any chunk is missing.
- **`touch` without re-uploading.** `touch` rewrites each chunk onto itself with
  new custom metadata: one `objects.rewrite` call per chunk within one location
  and storage class, and no bytes travel. A rewrite of a dual-region object
  still replicating can take more calls; the extension follows `rewriteToken`
  until it is done. The GCS JSON API allows a rewrite whose source and
  destination are the same object, and overwriting through it needs only
  `storage.objects.get`, `.create` and `.delete`. A metadata PATCH would need
  `storage.objects.update`, which the custom role above does not grant, so it is
  not used. The new `lastModified` comes from the server's clock, and no
  permission beyond those listed above is needed. On a versioned bucket every
  touch leaves a noncurrent generation, billed as storage while it is retained;
  a lifecycle rule that expires noncurrent generations keeps that bounded.
- **Storage classes.** Do not transition `_blobs/` to Nearline, Coldline or
  Archive. Those objects stay readable, but the rewrite names no storage class,
  so `touch` moves each chunk back to the bucket's default class, and replacing
  an object before its minimum storage duration (30, 90 or 365 days) is billed
  as an early deletion, on top of the retrieval charge for reading it.
- **`lastModified`** is always the server's `updated` time, never the client's
  clock.

The conformance suites (`assertStorageConformance` and
`assertWritableDatastoreControlPlaneStoreConformance`, namespaced-push case
included) run in every test run against an in-process emulator. To run them
against fake-gcs-server 1.56.1 or later (earlier versions ignore
`ifGenerationMatch` on simple uploads, fsouza/fake-gcs-server#2308) as well, set
`SWAMP_TEST_GCS_ENDPOINT` (e.g. `http://localhost:4443`) and
`SWAMP_TEST_GCS_BUCKET` (an existing bucket); each run uses a fresh prefix.
Against a real endpoint the storage suite skips its `lastModified`-refresh
checks, since an object cannot be backdated there; a direct measurement on
fake-gcs-server 1.56.1 shows `touch` advancing `updated` time from the server's
clock.

## Litestream replica target (`replicaTarget()`)

A v3 datastore's `commits.db` is replicated by Litestream into this datastore's
own bucket, under `<prefix>/_litestream/<fence>/` (swamp-club#3508). The
provider's `replicaTarget()` tells swamp where that is; swamp builds the
`_litestream/<fence>/` part itself. It returns
`{ type: "gcs", bucket, prefix }`, where `prefix` is the configured prefix
exactly as the extension writes object names under it, the same root `storage()`
and the control plane use (empty when unset).

`replicaTarget()` refuses, with an error that names the rule but not the value:

- **`apiEndpoint` set,** unless `STORAGE_EMULATOR_HOST` names the same host and
  port. Litestream has no custom GCS endpoint setting, so it would replicate to
  Google Cloud Storage instead of the configured endpoint. It does reach a GCS
  emulator through `STORAGE_EMULATOR_HOST`, so a datastore on an emulator such
  as fake-gcs-server can host v3 when that variable is set to the emulator's
  `host:port` (with or without a scheme). The match is exact: `localhost` and
  `127.0.0.1` differ. This is for tests; swamp must also pass
  `STORAGE_EMULATOR_HOST` through to the Litestream sidecar.
- **A prefix it cannot describe:** a leading, trailing or repeated `/`, or a `.`
  or `..` segment. The extension joins the prefix onto object names as it is, so
  tidying it would point the replica somewhere other than where the datastore
  writes. Set a prefix without them.

**Credentials.** The target never carries credentials. Litestream resolves them
from Application Default Credentials, as the extension does. Whatever
credentials the datastore uses must also be visible to the Litestream sidecar,
through the same environment or gcloud configuration; swamp passes
`GOOGLE_APPLICATION_CREDENTIALS`, `CLOUDSDK_*`, `HOME` and `PATH` through to it.

**Minimum version.** Swamp's v3 on GCS (datastore rework Phase 4E) needs this
version of the extension or later. An older version has no `replicaTarget()`,
and swamp refuses to set up a v3 datastore on it.

The conformance suite `assertReplicaTargetConformance` runs against the
in-process emulator in every test run (empty and nested prefixes). Because the
emulator needs `apiEndpoint`, which `replicaTarget()` refuses, the suite reads
the target from a twin provider with the same bucket and prefix and no endpoint,
and writes through the emulator-backed one. There is no local check that runs
Litestream against GCS, for the same reason; the S3 extension has one.

### Lineage paths (`replicaPaths()`)

Each lineage replicates to its own path, `<prefix>/_litestream/<fence>/`, and a
takeover from another checkout starts a new one. `storage/1` is chunk-keyed and
cannot reach these objects, so the provider's `replicaPaths()` lets swamp remove
the path of a lineage a takeover replaced (swamp-club#3531). Until old lineages
are collected, swamp defers chunk collection on the datastore (swamp-club#3491).

- **`list`** returns the fence directories under `<prefix>/_litestream/`, from a
  delimiter listing: one request per 1,000 directories, not per object.
- **`removePath(fence)`** deletes every object under
  `<prefix>/_litestream/<fence>/`, a page at a time until none is left, and
  succeeds when nothing is there. The trailing slash keeps a look-alike
  directory such as `<fence>-old/` out, and every key is checked to be under the
  fence's path before it is deleted. A fence that is not exactly 12 digits from
  `000000000001` is refused before any request. An object listed again after it
  was deleted fails the call rather than looping.

It needs no permission beyond those listed above (`storage.objects.list` and
`storage.objects.delete`). Swamp calls it only from Phase 4E's lineage
collection: best effort, never for the current lineage, and only once the new
lineage's first sync is confirmed.

On a bucket with object versioning, each object `removePath` deletes leaves a
noncurrent version, billed until it expires. A lifecycle rule that expires
noncurrent versions, the same one that bounds what `touch` leaves under
`_blobs/`, also bounds what removed lineage paths leave behind.

The conformance suite `assertReplicaPathConformance` runs against the in-process
emulator in every test run (empty and nested prefixes, and pages of two names so
listing and removal must page), and against fake-gcs-server when
`SWAMP_TEST_GCS_ENDPOINT` and `SWAMP_TEST_GCS_BUCKET` are set. As for the
replica target, the root comes from a twin provider without `apiEndpoint`.

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

## Recovering files a push never sent

`repairUnpushedFiles` (driven by core's doctor stage) finds cache files the
bucket has never received and uploads them. It exists for files written into the
cache behind the sync service and never marked, which no push sends, such as
those an earlier `swamp datastore setup extension` migration left
(swamp-club#4100, #4112).

- **It needs a shard-first index and a synced cache.** A monolithic index is
  refused: run `swamp datastore sync --pull`, then
  `swamp datastore migrate-index`. So is a remote that holds data with no
  `_meta.json`, whose index cannot be read: run `swamp datastore migrate-index`.
  A cache with no last-synced index is refused too, because an unpushed file
  cannot be told apart from one a peer deleted.
- **A dry run changes nothing remote.** It makes one listing of the namespace
  and no request per file, except that `exact` downloads an object when it has
  to hash one. A listing cannot compare bytes, so an object of the
  same size with no index entry counts as unpushed until a real run settles it,
  and the two runs' counts can differ. Check the dry run first.
- **Uploads are create-only** and record the sha256 in object metadata
  (GCS `ifGenerationMatch=0`), so on an endpoint that honours the condition they
  never overwrite a key. An endpoint that rejects conditional create is refused,
  never written to unconditionally. A refused
  create is settled in the same run: the same bytes are indexed as an earlier
  upload, other bytes are reported as `alreadyPresent` and left alone.
- **Pending work is untouched.** It deletes nothing, sets and clears no dirty
  state, and does not advance the sync fingerprint, so the next pull still sees
  every commit this cache has not read, its own included.

Local versions the bucket lacks are reported and never uploaded:
`locallyModified` and `unknown` (an entry with no sha256 whose size matches and
whose mtime does not; `exact` settles it with a streamed hash while the remote
entry is unchanged) compare with the last-synced index, not the bucket.

`.datastore-peer-deleted.json` is a local-only record of keys a sync dropped from
the last-synced index while a regular file stayed at the path, such as a copy
changed locally when a peer deleted its key. Those copies are reported as
`peerDeleted`, and a repair never uploads them. A key is forgotten once the
bucket holds it again or its file is gone. Two limits:

- A deletion pulled before this record existed left no trace, so such a kept copy
  still reads as unpushed, and a real repair uploads it. Review the dry run's
  `samplePaths` before repairing a cache that has been running for a while.
- A key a pull pruned because its object was missing from the bucket is recorded
  too, though no peer may have deleted it. A repair reports it and does not
  upload it. A later push that walks the file still uploads it, as described
  above.

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
