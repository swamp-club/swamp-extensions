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

- `s3:HeadBucket`
- `s3:GetObject`
- `s3:PutObject`
- `s3:DeleteObject`
- `s3:ListBucket`
- `s3:HeadObject`

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

## S3-compatible endpoints

The datastore speaks the S3 API, so any S3-compatible object store works. Set
`endpoint` (and `forcePathStyle: true` where required) to point at MinIO,
DigitalOcean Spaces, Cloudflare R2, or other providers.

## Sync configuration

Transfer concurrency is configurable via the `pullConcurrency` and
`pushConcurrency` config fields (defaults: 50 and 25 respectively).
Users on constrained S3-compatible endpoints can dial these back:

```bash
swamp datastore setup @swamp/s3-datastore \
  --config '{"bucket": "my-bucket", "pullConcurrency": 10, "pushConcurrency": 5}'
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
- **Partitioned index**: Alongside the monolithic `.datastore-index.json`, per-model
  partition files are written under `_index/`. Scoped pulls read only the
  relevant partitions instead of the full index.
- **Scoped sync**: The extension advertises `scopedSync` capability. When the
  framework passes `context.models`, pull and push operate only on the
  specified models.

## Backward compatibility

- Old clients continue to read `.datastore-index.json` (always written first).
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

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
