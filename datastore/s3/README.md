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

## Cache-write contract

The fast-path sync optimization maintains a `.datastore-sync-state.json`
sidecar (version 2) in the cache directory. Any write into the cache
that does not route through the sync service's internal path MUST be
accompanied by a call to `DatastoreSyncService.markDirty(options?)`;
otherwise the next `pushChanged` fast-paths past the write and the
upload is silently skipped.

`markDirty` supports per-path dirty tracking via `options.relPath`:

- `markDirty({ relPath: "data/foo.yaml" })` — records that specific
  path as dirty. The next `pushChanged` only stats and uploads files
  in the dirty set, skipping the full cache walk.
- `markDirty()` (no options / no relPath) — bulk invalidation. The
  next `pushChanged` performs a full cache walk (legacy behavior).

The sidecar tracks `dirtyPaths` (per-path set) and `bulkInvalidated`
(full-walk flag). Old version 1 sidecars are silently upgraded to
version 2 on first read, treated as bulk-invalidated for safety.

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
