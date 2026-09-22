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

Verification does more than reach the bucket: it also probes conditional
writes (see below), so the credentials need `s3:PutObject` and
`s3:DeleteObject` under the configured prefix, not just `s3:ListBucket`.

## S3-compatible endpoints

The datastore speaks the S3 API, so any S3-compatible object store works. Set
`endpoint` (and `forcePathStyle: true` where required) to point at MinIO,
DigitalOcean Spaces, Cloudflare R2, or other providers.

Correctness rests on conditional writes. Lock acquisition is a PutObject with
`If-None-Match: *`, and the shard-first index merges with `If-Match`. Setup,
`swamp datastore status` and `swamp doctor datastores` all probe both under a
throwaway `_control/conditional-write-probe-<uuid>` key, and an endpoint can
answer in three ways:

- **Both honoured** — healthy, `details.conditionalWrites: "supported"`.
- **`If-Match` answers `NotImplemented`** — still healthy,
  `details.conditionalWrites: "if-match-unsupported"`. Acquiring a lock only
  needs `If-None-Match`, so locks stay exclusive; the extension warns once
  and falls back to unconditional writes. Index merges drop to
  merge-on-write without compare-and-swap, so concurrent writers can still
  lose index entries, and the lock heartbeat loses its fence — a lock stolen
  between the heartbeat's ownership check and its write can be overwritten
  by the previous holder.
- **Either header silently ignored** (200 where a 412 is required) — setup
  fails and status reports unhealthy, with
  `details.conditionalWrites: "ignored"`. This is the dangerous case: every
  writer would "acquire" the lock at once and index merges would lose
  updates, with nothing reporting it.

Losing a lock is never silent. The heartbeat re-checks ownership before
every extension, and two answers end the hold outright: the lock object is
gone, or it carries another holder's nonce. Anything else — an unreachable
endpoint, a 403, a write that threw or could not be confirmed — leaves the
lock held and retries on the next tick, because none of those establish that
the lock changed hands. That grace is bounded by the TTL: once `ttlMs` has
passed with no confirmed write, the object is stealable by any other process
on the same rule this extension applies to everyone else, so the hold ends
too. A lock lost while its operation is still running is logged as a warning
naming the key, as is the first failed heartbeat of an outage.

The verdict is memoized per process for 5 minutes, keyed on endpoint, bucket
and prefix — `swamp serve` streams health once a second, and the probe must
not become sustained write traffic. A repaired endpoint therefore takes up to
5 minutes to report healthy again in a long-running `swamp serve`;
`swamp datastore setup` runs in a fresh process and always probes for real.

If the endpoint honours both headers but rejects `DeleteObject`, verification
still reports healthy with `details.probeCleanup: "failed"` and names the key
it could not remove. Probe objects then accumulate under `_control/` (at most
one per process per 5 minutes) and need occasional manual cleanup.

## Sync configuration

Transfer concurrency is configurable via the `pullConcurrency` and
`pushConcurrency` config fields (defaults: 50 and 25 respectively).
Users on constrained S3-compatible endpoints can dial these back:

```bash
swamp datastore setup @swamp/s3-datastore \
  --config '{"bucket": "my-bucket", "pullConcurrency": 10, "pushConcurrency": 5}'
```

The per-request timeout defaults to 30 seconds and can be overridden via
the `requestTimeoutMs` config field (1000–600000 ms) or the
`SWAMP_S3_REQUEST_TIMEOUT_MS` environment variable (env var takes
precedence). Increase this on slow or high-latency links to avoid
silent timeout failures on large objects:

```bash
export SWAMP_S3_REQUEST_TIMEOUT_MS=120000
```

## Efficiency features

- **Per-path dirty tracking**: `markDirty({ relPath })` records which
  directories changed. `pushChanged` walks only those directories instead
  of the entire cache. A 200-path cap falls back to a full walk for bulk
  operations.
- **SHA-256 content hashing**: File content is hashed on push and stored in
  the index. On subsequent pushes, files with matching size and mtime skip
  I/O entirely; files with matching size but different mtime are hash-compared
  to avoid redundant uploads across machines with clock skew.
- **Shard-first index**: After migration to v2 (`swamp datastore migrate-index`),
  per-model partition shards under `_index/` are the source of truth.
  Commits write only the dirty shards and `_meta.json`, skipping the
  monolithic `.datastore-index.json` upload entirely. Pre-v2 repos
  continue dual-writing both formats. Every shard and `_meta.json` write is
  a compare-and-swap merge (If-Match) with bounded retry: a writer applies
  only its own additions and deletions, so concurrent writers (for example
  `swamp serve` and a CLI `datastore sync --push`) never drop each other's
  index entries, with or without the global lock. Shards emptied by
  deletions are unlisted from `_meta.json` but left in place as empty
  objects.
- **Scoped sync**: The extension advertises `scopedSync` capability. When the
  framework passes `context.models`, pull and push operate only on the
  specified models.
- **Config refresh / subdir-scoped pull**: The extension advertises
  `configRefresh`. When the framework passes `subdirs` (e.g. `["config"]`),
  pull only lists, walks, prunes, and downloads index entries under those
  prefixes. A scoped pull does not advance the fast-path sidecar or clear lazy
  hydration, so a later full pull still picks up out-of-scope changes.
- **Namespace-scoped sync**: When `options.namespace` is set, index operations
  are scoped to `{namespace}/.datastore-index.json` and data walks are
  restricted to the namespace subtree. The pull's bulk-diff listing is
  scoped the same way — it lists `{namespace}/` plus the root-level
  segments the index references, so a bucket prefix shared with other
  namespaces costs O(this namespace) rather than O(every namespace under
  the prefix). The root-level segments are still listed because `pullFile`
  falls back to a pre-namespace root key when the namespaced key 404s.
  Three additional methods support
  multi-repo shared datastores: `exportCatalog` writes a catalog manifest,
  `pullForeignCatalogs` fetches catalogs from other namespaces, and
  `fetchForeignContent` downloads individual files from foreign namespaces.
  Solo mode (no namespace) is fully backward compatible.
- **Namespace manifest support**: The provider implements `registerNamespace`
  and `listNamespaces` for multi-repo conflict detection. `registerNamespace`
  writes a `.namespace.json` manifest to `{namespace}/.namespace.json` in the
  bucket, with check-then-write conflict detection (a second repo with a
  different `repoId` is rejected). `listNamespaces` scans the bucket for all
  registered namespace manifests and returns the namespace slugs.

## Observability

The extension emits [OpenTelemetry](https://opentelemetry.io/) spans for S3
operations, lock acquisition/release, and push/pull sync. Spans are no-ops
when no `TracerProvider` is configured in the host process. When swamp is
running with OTel enabled, datastore activity appears in traces with
attributes following OTel semantic conventions (bucket, key, HTTP status,
request ID).

## Backward compatibility

- Pre-v2 repos continue to write the monolithic `.datastore-index.json`
  alongside partition shards (dual-write). After v2 migration, the
  monolithic index is no longer written on push — shards are the source
  of truth. Clients that only read the monolith should migrate.
- Old clients ignore the `sha256` field in index entries (JSON forward compat).
- A v1 sidecar read by the new code triggers a full walk (safe fallback).
- The `_index/` directory is excluded from sync — old clients never see it.

## Cache-write contract

The fast-path sync optimization maintains a `.datastore-sync-state.json`
sidecar in the cache directory. Any write into the cache that does not
route through the sync service's internal path MUST be accompanied by a
call to `DatastoreSyncService.markDirty()`; otherwise the next
`pushChanged` fast-paths past the write and the upload is silently
skipped. swamp-core calls `markDirty()` from its repository layer for
this reason. Downstream tooling that writes into the cache directory
directly must follow the same contract.

The `markDirty` method now accepts an optional `relPath` parameter for
per-path tracking. When `relPath` is provided, only that directory is
walked on the next push. Without `relPath`, the entire cache is walked
(bulk invalidation).

When `markDirty({ relPath })` is called before removing a file from the
cache, the next `pushChanged` detects the absence and issues an S3
`DeleteObject` for the corresponding remote key and removes it from the
index. If per-path dirty tracking overflows (>200 paths), the bulk walk
compares the full index against local files and deletes remote-only
entries. Deletions are suppressed when lazy hydration is active to avoid
removing un-hydrated content.

A per-path push assembles only the dirty partition shards, so it merges
its delta into the on-disk `.datastore-index.json` rather than replacing
it — the shards it did not walk stay in the index. When the sidecar was
already at the `commitSeq` the push read, the push also re-arms the pull
fast path: nobody else committed in between, so this process wrote the
only delta and the cache is still complete. A process that writes often
(heartbeats, locks, catalog exports) therefore keeps its own fast path
armed instead of disarming it on every write.

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
