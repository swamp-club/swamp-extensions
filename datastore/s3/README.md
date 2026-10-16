# @swamp/s3-datastore

Swamp datastore backend that stores repository state in an
[Amazon S3](https://aws.amazon.com/s3/) bucket and keeps a local cache in sync
with it. Distributed locking is implemented on top of S3 conditional writes so
that multiple swamp processes can safely share the same bucket.

## Installation

```sh
swamp extension pull @swamp/s3-datastore
```

The companion workflow extension
[`@swamp/s3-datastore-bootstrap`](../../workflows/s3-bootstrap/README.md)
provisions a bucket and a least-privilege IAM managed policy in one step.

## Configuration

Credentials are resolved via the standard AWS credential chain — no credentials
in config. Provide them via one of:

- Environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- AWS profile: `~/.aws/credentials`
- IAM role attached to the instance, task, or pod

The calling principal needs these S3 actions on the target bucket and objects:

- `s3:GetObject` (authorizes GetObject, HeadObject)
- `s3:PutObject`
- `s3:DeleteObject`
- `s3:ListBucket` (authorizes ListBucket, HeadBucket)

Chunk storage's `touch` is a CopyObject, which these already cover
(`s3:GetObject` on the source, `s3:PutObject` on the destination).

## Usage

Switch the current swamp repository over to an S3-backed datastore:

```bash
swamp datastore setup @swamp/s3-datastore \
  --config '{"bucket": "my-bucket", "prefix": "swamp", "region": "us-east-1"}' \
  --json
```

Check the active datastore and its health:

```bash
swamp datastore status
swamp datastore verify
```

Verification does more than reach the bucket: it also probes conditional writes
(see below), so the credentials need `s3:PutObject` and `s3:DeleteObject` under
the configured prefix, not just `s3:ListBucket`.

## S3-compatible endpoints

The datastore speaks the S3 API, so any S3-compatible object store works. Set
`endpoint` (and `forcePathStyle: true` where required) to point at MinIO,
DigitalOcean Spaces, Cloudflare R2, or other providers.

Correctness rests on conditional writes. Lock acquisition is a PutObject with
`If-None-Match: *`, and the shard-first index merges and lock heartbeat
compare-and-swap with `If-Match`. Setup, `swamp datastore status` and
`swamp doctor datastores` all probe both under a throwaway
`_control/conditional-write-probe-<uuid>` key — `If-Match` with a stale ETag
(which must be rejected) and with the object's current ETag (which must be
accepted) — and an endpoint can answer in four ways:

- **Both honoured** — healthy, `details.conditionalWrites: "supported"`.
- **`If-Match` rejected when the ETag is quoted** — still healthy,
  `details.conditionalWrites: "if-match-unquoted"`. S3 returns ETags quoted and
  the extension sends them back that way, but some endpoints (Ceph RGW Squid —
  verified on 19.2.5 and 19.2.6; Tentacle 20.2 is fixed) answer 412 to a quoted
  `If-Match` on PutObject even when it matches. The extension notices when a
  write is rejected although the object still carries the ETag it sent, confirms
  on a throwaway key that the unquoted form is enforced, and sends ETags
  unquoted from then on, with compare-and-swap intact.
- **`If-Match` unusable** — the endpoint answers `NotImplemented`, rejects the
  current ETag in both forms, or ignores the unquoted form. Still healthy,
  `details.conditionalWrites: "if-match-unsupported"`. Acquiring a lock only
  needs `If-None-Match`, so locks stay exclusive; the extension warns once and
  falls back to unconditional writes. Index merges drop to merge-on-write
  without compare-and-swap, so concurrent writers can still lose index entries,
  and the lock heartbeat loses its fence — a lock stolen between the heartbeat's
  ownership check and its write can be overwritten by the previous holder.
- **Either header silently ignored** (200 where a 412 is required) — setup fails
  and status reports unhealthy, with `details.conditionalWrites: "ignored"`.
  This is the dangerous case: every writer would "acquire" the lock at once and
  index merges would lose updates, with nothing reporting it.

Losing a lock is never silent. The heartbeat re-checks ownership before every
extension, and two answers end the hold outright: the lock object is gone, or it
carries another holder's nonce. Anything else — an unreachable endpoint, a 403,
a write that threw or could not be confirmed — leaves the lock held and retries
on the next tick, because none of those establish that the lock changed hands.
That grace is bounded by the TTL: the object is stealable once its
`LastModified` time is `ttlMs` old, so the hold ends just before that — counted
from when the last confirmed write was sent, which is never later than when it
committed, and enforced by a timer of its own rather than the next heartbeat
tick. A lock lost while its operation is still running is logged as a warning
naming the key, as is the first failed heartbeat of an outage.

The verdict is memoized per process for 5 minutes, keyed on endpoint, bucket and
prefix — `swamp serve` streams health once a second, and the probe must not
become sustained write traffic. A repaired endpoint therefore takes up to 5
minutes to report healthy again in a long-running `swamp serve`;
`swamp datastore setup` runs in a fresh process and always probes for real.

If the endpoint honours both headers but rejects `DeleteObject`, verification
still reports healthy with `details.probeCleanup: "failed"` and names the key it
could not remove. Probe objects then accumulate under `_control/` (at most one
per process per 5 minutes from verification, plus one per command on endpoints
that need the unquoted-ETag check at write time) and need occasional manual
cleanup.

## Sync configuration

Transfer concurrency is configurable via the `pullConcurrency` and
`pushConcurrency` config fields (defaults: 50 and 25 respectively). Users on
constrained S3-compatible endpoints can dial these back:

```bash
swamp datastore setup @swamp/s3-datastore \
  --config '{"bucket": "my-bucket", "pullConcurrency": 10, "pushConcurrency": 5}'
```

The per-request timeout defaults to 30 seconds and can be overridden via the
`requestTimeoutMs` config field (1000–600000 ms) or the
`SWAMP_S3_REQUEST_TIMEOUT_MS` environment variable (env var takes precedence).
Increase this on slow or high-latency links to avoid silent timeout failures on
large objects:

```bash
export SWAMP_S3_REQUEST_TIMEOUT_MS=120000
```

## Efficiency features

- **Per-path dirty tracking**: `markDirty({ relPath })` records which
  directories changed. `pushChanged` walks only those directories instead of the
  entire cache. A 200-path cap falls back to a full walk for bulk operations.
- **SHA-256 content hashing**: File content is hashed on push and stored in the
  index. A same-size file skips the hash only when this copy's own mtime record
  (`.datastore-local-mtimes.json`, local-only and never synced) shows it
  unchanged since this copy last wrote or verified it; otherwise it is
  hash-compared, on push and on pull. The index's `localMtime` is the pushing
  machine's, so it never decides on its own. A same-size file whose entry has no
  sha256 is pushed once unless this copy recorded it, which adds the hash. A
  cache upgraded from an earlier version has no record yet: on its first sync it
  seeds one, once, from its local index for entries without a sha256 whose file
  still has the indexed size and mtime, so those legacy files are trusted as
  before rather than re-uploaded.
- **Shard-first index**: After migration to v2
  (`swamp datastore migrate-index`), per-model partition shards under `_index/`
  are the source of truth. Commits write only the dirty shards and `_meta.json`,
  skipping the monolithic `.datastore-index.json` upload entirely. Pre-v2 repos
  continue dual-writing both formats. Every shard and `_meta.json` write is a
  compare-and-swap merge (If-Match) with bounded retry: a writer applies only
  its own additions and deletions, so concurrent writers (for example
  `swamp serve` and a CLI `datastore sync --push`) never drop each other's index
  entries, with or without the global lock. Shards emptied by deletions are
  unlisted from `_meta.json` but left in place as empty objects.
- **Scoped sync**: The extension advertises `scopedSync` capability. When the
  framework passes `context.models`, pull and push operate only on the specified
  models.
- **Config refresh / subdir-scoped pull**: The extension advertises
  `configRefresh`. When the framework passes `subdirs` (e.g. `["config"]`), pull
  only lists, walks, prunes, and downloads index entries under those prefixes. A
  scoped pull does not advance the fast-path sidecar or clear lazy hydration, so
  a later full pull still picks up out-of-scope changes.
- **Namespace-scoped sync**: When `options.namespace` is set, index operations
  are scoped to `{namespace}/.datastore-index.json` and data walks are
  restricted to the namespace subtree. The pull's bulk-diff listing is scoped
  the same way — it lists `{namespace}/` plus the root-level segments the index
  references, so a bucket prefix shared with other namespaces costs O(this
  namespace) rather than O(every namespace under the prefix). The root-level
  segments are still listed because `pullFile` falls back to a pre-namespace
  root key when the namespaced key 404s. Three additional methods support
  multi-repo shared datastores: `exportCatalog` writes a catalog manifest,
  `pullForeignCatalogs` fetches catalogs from other namespaces, and
  `fetchForeignContent` downloads individual files from foreign namespaces. Solo
  mode (no namespace) is fully backward compatible.
- **Namespace manifest support**: The provider implements `registerNamespace`
  and `listNamespaces` for multi-repo conflict detection. `registerNamespace`
  writes a `.namespace.json` manifest to `{namespace}/.namespace.json` in the
  bucket, with check-then-write conflict detection (a second repo with a
  different `repoId` is rejected). `listNamespaces` scans the bucket for all
  registered namespace manifests and returns the namespace slugs.
- **Single-file remote read**: `fetchContent` returns the bytes of one file as
  the bucket holds it and writes nothing to the local cache, the index or the
  dirty state, so a local change that has not been pushed is left alone. The
  path is cache-relative and is used as the object key as given: with a
  namespace it already starts with `{namespace}/`, and a path outside
  `options.namespace`, an absolute path, or one with a `..` segment is an error.
  Only that key is read: a namespaced file that is missing is absent, even if an
  object sits at the pre-namespace root key a pull would fall back to. Only a
  `NoSuchKey` answer means the file is absent; any other failure, including a
  404 without that error code, is an error rather than a missing file. Transient
  failures are retried with backoff, as on a pull.

## Datastore-wide control plane and the v3 writer lease

Swamp keeps a few records for the whole datastore, outside every namespace, at
`<prefix>/_control/<key>`: the format marker `datastore-format`, which it reads
before a command opens the datastore, the v3 writer lease's records under
`writer/`, and the v3 replication lineage records under `lineage/`
(`lineage/<fence>/started.json`, `head-<writer fence>.json`, `confirmed.json`;
swamp-club#3482). The provider's `datastoreControlPlaneStore()` reads and writes
them:

- It binds no namespace and shares nothing with a sync service. Building it
  makes no request, and a read is one GetObject with no credentials preflight. A
  failure still carries the same credential hint as every other S3 request.
- `get` returns null only when the record is missing. A 403, a 5xx, an abort and
  a missing bucket all reject. A 404 that does not name the key (a non-XML body)
  is confirmed with one listing before it reads as absent; `NoSuchBucket`
  rejects.
- `putIfAbsent` is a conditional PutObject (`If-None-Match: *`), so of
  concurrent creates of one key exactly one wins.

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
  swamp cuts. A put is a single PutObject, never a multipart upload.
- **Atomic puts, clean aborts.** S3 commits a PutObject whole or not at all, so
  a reader never sees a partial chunk. An aborted put therefore leaves no object
  and no multipart upload to clean up. The tests show the client tears the
  request down and that an emulator commits nothing; that S3 itself discards a
  body it never received whole is its documented behaviour, not something the
  tests measure.
- **`has`, tuned for price.** Hashes are grouped by their two-hex shard. A shard
  holding 13 or more of the batch's hashes is listed (one request per 1,000
  chunks in that shard); the rest are checked one HEAD each, 16 at a time. S3
  bills a LIST at the PUT tier
  ($0.005 per 1,000) and a HEAD at the GET tier ($0.0004 per 1,000), 12.5x apart
  (GCS and R2 share the ratio), so a listing only pays for itself at 13 or more
  hashes in a shard. A typical call (one commit's chunks) takes the per-hash
  path; bulk callers list automatically. Only a 404 reads as absent; any other
  failure rejects, so an unreadable chunk never reads as missing. Measured
  request counts:

  | Call                                                               | Requests                |
  | ------------------------------------------------------------------ | ----------------------- |
  | `has` on 10 hashes, all stored                                     | 10 HEADs                |
  | `has` on 1,000 hashes spread over all shards (at most 4 per shard) | 1,000 HEADs             |
  | `has` on 1,000 hashes in 2 shards                                  | 2 listings              |
  | `touch` on 10 or 1,000 hashes                                      | one CopyObject per hash |

  When any hash is missing, `has` adds one listing to confirm the bucket exists,
  since a 404 alone cannot tell a missing chunk from a missing bucket. `touch`
  needs no such listing: CopyObject names a missing source `NoSuchKey`.
- **`touch` without re-uploading.** `touch` copies each chunk onto itself,
  replacing its user metadata (S3 refuses a self-copy that changes nothing): one
  CopyObject per chunk, and no bytes travel. It needs only `s3:GetObject` and
  `s3:PutObject`. The new `lastModified` comes from the server's clock, and no
  permission beyond those listed above is needed. On a versioned bucket every
  touch leaves a noncurrent version, billed as storage while it is retained; a
  lifecycle rule that expires noncurrent versions keeps that bounded.
- **Storage classes.** Do not transition `_blobs/` to S3 Glacier Flexible
  Retrieval or Glacier Deep Archive: those objects must be restored before they
  can be read or copied, so `get` and `touch` fail (`InvalidObjectState`) and
  the commit that needs them fails. The self-copy names no `StorageClass`, so
  `touch` moves a chunk in an infrequent-access class (Standard-IA, One Zone-IA,
  Glacier Instant Retrieval) back to Standard.
- **`lastModified`** is always the server's `LastModified`, never the client's
  clock.

The conformance suites (`assertStorageConformance` and
`assertWritableDatastoreControlPlaneStoreConformance`, namespaced-push case
included) run in every test run against an in-process emulator. To run them
against ministack (or another S3-compatible endpoint) as well, set
`SWAMP_TEST_S3_ENDPOINT` (e.g. `http://localhost:4566`) and
`SWAMP_TEST_S3_BUCKET` (an existing bucket); each run uses a fresh prefix.
Against a real endpoint the storage suite skips its `lastModified`-refresh
checks, since an object cannot be backdated there; a direct measurement on
ministack shows `touch` advancing `LastModified` from the server's clock.

## Litestream replica target (`replicaTarget()`)

A v3 datastore's `commits.db` is replicated by Litestream into this datastore's
own bucket, under `<prefix>/_litestream/<fence>/` (swamp-club#3508). The
provider's `replicaTarget()` tells swamp where that is; swamp builds the
`_litestream/<fence>/` part itself. It returns:

```ts
{ type: "s3", bucket, prefix, region?, endpoint?, forcePathStyle? }
```

- **`prefix`** is the configured prefix exactly as the extension writes keys
  under it, the same root `storage()` and the control plane use (empty when
  unset).
- **`region`** is included when it is configured and not empty.
- **`endpoint`** is included for S3-compatible services (R2, MinIO, DigitalOcean
  Spaces and others), always with **`forcePathStyle`** stated: the configured
  value, or `false` when unset. The extension leaves path style off unless told
  otherwise, while Litestream turns it on for any endpoint, so leaving it out
  would make Litestream address the bucket differently.

`replicaTarget()` refuses, with an error that names the rule but not the value:

- a prefix with a leading, trailing or repeated `/`, or a `.` or `..` segment.
  The extension joins the prefix onto keys as it is, so such a prefix cannot be
  described to swamp, and tidying it would point the replica somewhere other
  than where the datastore writes. Set a prefix without them.
- an endpoint that is not a plain `http` or `https` URL, or that carries
  credentials, a query or a fragment.

**Credentials.** The target never carries credentials. Litestream resolves them
from the same AWS default chain the extension uses (environment variables,
shared config and SSO, container or instance identity). Whatever credentials the
datastore uses must also be visible to the Litestream sidecar, through the same
environment or shared config; swamp passes `AWS_*`, `HOME` and `PATH` through to
it.

**Minimum version.** Swamp's v3 on S3 (datastore rework Phase 4E) needs this
version of the extension or later. An older version has no `replicaTarget()`,
and swamp refuses to set up a v3 datastore on it.

The conformance suite `assertReplicaTargetConformance` runs against the
in-process emulator in every test run (empty and nested prefixes), and against
ministack when `SWAMP_TEST_S3_ENDPOINT` and `SWAMP_TEST_S3_BUCKET` are set. A
check that runs Litestream itself against ministack is run by hand, since
Litestream is not installed where verification runs:

```bash
SWAMP_TEST_S3_ENDPOINT=http://localhost:4566 SWAMP_TEST_S3_BUCKET=<bucket> \
SWAMP_TEST_LITESTREAM_BIN=<path to litestream 0.5.x> \
deno test --allow-read --allow-write --allow-env --allow-net --allow-sys \
  --allow-run extensions/datastores/s3_test.ts --filter Litestream
```

It writes Litestream's config from `replicaTarget()` the way swamp does,
replicates a small database, and checks that objects appear under
`<prefix>/_litestream/000000000001/`.

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

It needs no permission beyond those listed above (`s3:ListBucket` and
`s3:DeleteObject`). Swamp calls it only from Phase 4E's lineage collection: best
effort, never for the current lineage, and only once the new lineage's first
sync is confirmed.

On a versioned bucket, each object `removePath` deletes leaves a noncurrent
version, billed until it expires. A lifecycle rule that expires noncurrent
versions, the same one that bounds what `touch` leaves under `_blobs/`, also
bounds what removed lineage paths leave behind.

The conformance suite `assertReplicaPathConformance` runs against the in-process
emulator in every test run (empty and nested prefixes, and pages of two keys so
listing and removal must page), and against ministack when
`SWAMP_TEST_S3_ENDPOINT` and `SWAMP_TEST_S3_BUCKET` are set.

## Observability

The extension emits [OpenTelemetry](https://opentelemetry.io/) spans for S3
operations, lock acquisition/release, and push/pull sync. Spans are no-ops when
no `TracerProvider` is configured in the host process. When swamp is running
with OTel enabled, datastore activity appears in traces with attributes
following OTel semantic conventions (bucket, key, HTTP status, request ID).

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

## Cache-write contract

The fast-path sync optimization maintains a `.datastore-sync-state.json` sidecar
in the cache directory. Any write into the cache that does not route through the
sync service's internal path MUST be accompanied by a call to
`DatastoreSyncService.markDirty()`; otherwise the next `pushChanged` fast-paths
past the write and the upload is silently skipped. swamp-core calls
`markDirty()` from its repository layer for this reason. Downstream tooling that
writes into the cache directory directly must follow the same contract.

The `markDirty` method now accepts an optional `relPath` parameter for per-path
tracking. When `relPath` is provided, only that directory is walked on the next
push. Without `relPath`, the entire cache is walked (bulk invalidation).

A pull never marks the cache clean. A pull still replaces a changed file with
the bucket's copy when they differ, but the cache stays marked dirty until a
push succeeds. A retry that writes the change again and calls `markDirty` (which
re-marks a path still listed from the failed push) therefore pushes it instead
of taking the zero-diff fast path. The cost is one slow-path push after such a
pull, even when nothing is left to send.

A file a peer deletes stays deleted. When a pull or push reads the bucket's
index, a local file whose entry was in the last-synced index but is gone from
the bucket's is removed from the cache, with any directories that leaves empty.
Without this the file would stay cached with no index entry, and the next push
would upload it again, undoing the peer's `swamp data gc`. Only a copy that is
unchanged since it was synced is removed: same size and a matching sha256, or
for an entry without one, this copy's own recorded mtime. A copy changed locally
is kept, and a later push that walks it uploads it. The saved index is updated
only after the removal, so an interrupted pull is finished by the next one.
Nothing is removed when the bucket's index is missing or lists no entries in
scope, since that reads the same as a wiped index. Files already orphaned by
earlier versions are not in the last-synced index, so they are not removed; run
`swamp data gc` once on that peer to clear them. An index entry whose object is
missing from the bucket is different: the pull drops the entry but keeps the
local copy, so a later push can upload it again, since the object may have gone
because of an expiry rule or a mistaken delete and the local copy may be the
last one.

When `markDirty({ relPath })` is called before removing a file from the cache,
the next `pushChanged` detects the absence and issues an S3 `DeleteObject` for
the corresponding remote key and removes it from the index. If per-path dirty
tracking overflows (>200 paths), the bulk walk compares the full index against
local files and deletes remote-only entries. Deletions are suppressed when lazy
hydration is active to avoid removing un-hydrated content.

A per-path push assembles only the partition shards that can hold files under a
dirty path (a data name's `latest` sits in the type shard and its version files
in the model shard), so it merges its delta into the on-disk
`.datastore-index.json` rather than replacing it — the shards it did not walk
stay in the index. When the sidecar was already at the `commitSeq` the push
read, the push also re-arms the pull fast path: nobody else committed in
between, so this process wrote the only delta and the cache is still complete. A
process that writes often (heartbeats, locks, catalog exports) therefore keeps
its own fast path armed instead of disarming it on every write.

A push with nothing to send records the remote `commitSeq` only after it has
read the whole index. After a model-scoped pull (which reads only those models'
shards) it leaves the sidecar's `commitSeq` as it was, so the next full pull
still fetches what other hosts committed.

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
