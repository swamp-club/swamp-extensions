# Datastore Benchmarks

Measures push/pull/writeback performance of the S3 and GCS datastore extensions
against local emulators (MinIO and fake-gcs-server). Catches regressions by
comparing per-phase timings across runs.

Each scenario spins up isolated swamp repos (unique bucket + temp cache dir) so
results don't bleed between scenarios.

## Usage

```bash
cd datastore/benchmarks

# Requires Docker
deno task benchmark:s3
deno task benchmark:gcs
```

Docker containers (MinIO, fake-gcs-server) start and stop automatically. To skip
Docker and use already-running emulators:

```bash
BENCHMARK_S3_ENDPOINT=http://localhost:9000 \
BENCHMARK_GCS_ENDPOINT=http://localhost:4443 \
deno task benchmark:s3
```

Set `BENCHMARK_TRIALS=N` to control how many measured runs per scenario
(default: 5).

## Running against real S3

The S3 benchmark works against real AWS S3 — point the endpoint at your region
and provide credentials:

```bash
BENCHMARK_S3_ENDPOINT=https://s3.us-east-1.amazonaws.com \
BENCHMARK_GCS_ENDPOINT=http://localhost:4443 \
AWS_ACCESS_KEY_ID=AKIA... \
AWS_SECRET_ACCESS_KEY=... \
AWS_REGION=us-east-1 \
deno task benchmark:s3
```

Both endpoint env vars must be set to skip Docker startup. If you only want to
test S3, point the GCS endpoint at any reachable URL (it won't be used).

## Running against real GCS

Point the endpoint at real GCS and provide a bucket + credentials via ADC:

```bash
BENCHMARK_GCS_ENDPOINT=https://storage.googleapis.com \
BENCHMARK_S3_ENDPOINT=http://localhost:9000 \
BENCHMARK_GCS_BUCKET=my-bench-bucket \
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json \
deno task benchmark:gcs
```

The benchmark detects `https://storage.googleapis.com` and omits the emulator
endpoint override, so the GCS client uses Application Default Credentials. Each
scenario group gets a unique prefix within the bucket for isolation.

## What it measures

9 scenarios per backend covering the sync lifecycle:

1. Push 1000 files cold
2. Push 1 modified file out of 1000 (dirty sidecar scoped walk)
3. No-op push (sidecar fast path — should be <5ms)
4. Push with >200 dirty paths (cap triggers full walk fallback)
5. Pull 1000 files cold
6. Pull 1 changed file out of 1000 (incremental)
7. No-op pull (sidecar fast path — should be <5ms)
8. Scoped pull 1 model out of 50 (partitioned index)
9. Writeback with parallel partition writes

Results print as a table with min/avg/max per phase. Set
`BENCHMARK_JSON=/path/to/out.json` to also write structured results.
