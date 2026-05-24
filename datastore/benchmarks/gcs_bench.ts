import { join } from "@std/path";
import { ensureDir } from "@std/fs";
import { GcsClient } from "../gcs/extensions/datastores/_lib/gcs_client.ts";
import { GcsCacheSyncService } from "../gcs/extensions/datastores/_lib/gcs_cache_sync.ts";
import { runScenario } from "./_lib/trial_runner.ts";
import {
  bulkModifyFiles,
  modifyOneFile,
  seedTestData,
} from "./_lib/data_seeder.ts";
import {
  formatResultsJson,
  formatResultsTable,
  type ScenarioResult,
} from "./_lib/results.ts";
import {
  createGcsBucket,
  startEmulators,
  stopEmulators,
} from "./_lib/emulators.ts";

let bucketCounter = 0;
const REAL_GCS = "https://storage.googleapis.com";

function isRealGcs(endpoint: string): boolean {
  return endpoint.startsWith(REAL_GCS);
}

function nextBucket(endpoint: string): string {
  // Real GCS: use a single pre-existing bucket (from env), isolate via prefix
  // Emulator: create a new bucket per scenario group
  if (isRealGcs(endpoint)) {
    const b = Deno.env.get("BENCHMARK_GCS_BUCKET");
    if (!b) {
      throw new Error(
        "BENCHMARK_GCS_BUCKET must be set when running against real GCS",
      );
    }
    return b;
  }
  return `bench-gcs-${Date.now()}-${bucketCounter++}`;
}

function nextPrefix(endpoint: string): string | undefined {
  if (isRealGcs(endpoint)) {
    return `bench-${Date.now()}-${bucketCounter++}`;
  }
  return undefined;
}

function createSyncService(
  endpoint: string,
  bucket: string,
  cachePath: string,
  prefix?: string,
): GcsCacheSyncService {
  const client = isRealGcs(endpoint)
    ? new GcsClient({ bucket, prefix })
    : new GcsClient({ bucket, prefix, apiEndpoint: endpoint });
  return new GcsCacheSyncService(client, cachePath);
}

async function verifyGcsGenerationHeader(endpoint: string): Promise<boolean> {
  const testBucket = `probe-${Date.now()}`;
  await createGcsBucket(endpoint, testBucket);

  const uploadUrl =
    `${endpoint}/upload/storage/v1/b/${testBucket}/o?uploadType=media&name=probe.txt`;
  const uploadResp = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream" },
    body: new TextEncoder().encode("probe"),
  });
  await uploadResp.body?.cancel();

  const getUrl = `${endpoint}/storage/v1/b/${testBucket}/o/probe.txt?alt=media`;
  const resp = await fetch(getUrl);
  await resp.body?.cancel();
  const gen = resp.headers.get("x-goog-generation");

  if (gen) {
    console.log(`x-goog-generation header confirmed: ${gen}`);
    return true;
  } else {
    console.warn(
      "WARNING: x-goog-generation header not returned by emulator. " +
        "Sidecar fast-path benchmarks may fall back to full sync.",
    );
    return false;
  }
}

async function main() {
  const originalDebug = console.debug;
  console.debug = () => {};

  const endpoints = await startEmulators();
  if (!isRealGcs(endpoints.gcs)) {
    await verifyGcsGenerationHeader(endpoints.gcs);
  }

  const results: ScenarioResult[] = [];
  const cleanups: string[] = [];

  try {
    // -----------------------------------------------------------------------
    // Scenario 1: Push 1000 files (cold)
    // Each trial: fresh bucket + fresh cache = isolated swamp repo
    // -----------------------------------------------------------------------
    {
      let cachePath: string;
      let prefix: string | undefined;
      const bucket = nextBucket(endpoints.gcs);
      if (!isRealGcs(endpoints.gcs)) {
        await createGcsBucket(endpoints.gcs, bucket);
      }
      results.push(
        await runScenario({
          name: "Push 1000 files (cold)",
          warmup: 0,
          async setup() {
            prefix = nextPrefix(endpoints.gcs);
            cachePath = await Deno.makeTempDir({
              prefix: "bench-gcs-push-cold-",
            });
            await seedTestData({ cachePath, fileCount: 1000, modelCount: 50 });
          },
          async run() {
            const svc = createSyncService(
              endpoints.gcs,
              bucket,
              cachePath,
              prefix,
            );
            await svc.pushChanged();
          },
          async teardown() {
            await Deno.remove(cachePath, { recursive: true });
          },
        }),
      );
    }

    // -----------------------------------------------------------------------
    // Scenario 2: Push 1 modified / 1000 (dirty sidecar)
    // -----------------------------------------------------------------------
    {
      const bucket = nextBucket(endpoints.gcs);
      const prefix = nextPrefix(endpoints.gcs);
      if (!isRealGcs(endpoints.gcs)) {
        await createGcsBucket(endpoints.gcs, bucket);
      }
      const cachePath = await Deno.makeTempDir({
        prefix: "bench-gcs-push-incr-",
      });
      const seedResult = await seedTestData({
        cachePath,
        fileCount: 1000,
        modelCount: 50,
      });
      let svc = createSyncService(endpoints.gcs, bucket, cachePath, prefix);
      await svc.pushChanged();
      cleanups.push(cachePath);

      results.push(
        await runScenario({
          name: "Push 1 modified / 1000",
          warmup: 0,
          async setup() {
            const relPath = await modifyOneFile(
              cachePath,
              seedResult.models,
              0,
            );
            svc = createSyncService(endpoints.gcs, bucket, cachePath, prefix);
            await svc.markDirty({ relPath });
          },
          async run() {
            await svc.pushChanged();
          },
        }),
      );

      // -----------------------------------------------------------------------
      // Scenario 3: No-op push (sidecar fast path)
      // -----------------------------------------------------------------------
      results.push(
        await runScenario({
          name: "No-op push (fast path)",
          warmup: 0,
          setup() {
            svc = createSyncService(endpoints.gcs, bucket, cachePath, prefix);
            return Promise.resolve();
          },
          async run() {
            await svc.pushChanged();
          },
        }),
      );

      // -----------------------------------------------------------------------
      // Scenario 4: Push after bulk import (>200 dirty paths)
      // -----------------------------------------------------------------------
      results.push(
        await runScenario({
          name: "Push >200 dirty paths (full walk)",
          warmup: 0,
          async setup() {
            const paths = await bulkModifyFiles(
              cachePath,
              seedResult.models,
              201,
            );
            svc = createSyncService(endpoints.gcs, bucket, cachePath, prefix);
            for (const p of paths.slice(0, 201)) {
              await svc.markDirty({ relPath: p });
            }
          },
          async run() {
            await svc.pushChanged();
          },
        }),
      );
    }

    // -----------------------------------------------------------------------
    // Scenario 5: Pull 1000 files (cold)
    // Fresh bucket with data, pull into empty repo
    // -----------------------------------------------------------------------
    {
      const sourceBucket = nextBucket(endpoints.gcs);
      const sourcePrefix = nextPrefix(endpoints.gcs);
      if (!isRealGcs(endpoints.gcs)) {
        await createGcsBucket(endpoints.gcs, sourceBucket);
      }
      const sourceCache = await Deno.makeTempDir({ prefix: "bench-gcs-src-" });
      const seedResult = await seedTestData({
        cachePath: sourceCache,
        fileCount: 1000,
        modelCount: 50,
      });
      const sourceSvc = createSyncService(
        endpoints.gcs,
        sourceBucket,
        sourceCache,
        sourcePrefix,
      );
      await sourceSvc.pushChanged();
      await Deno.remove(sourceCache, { recursive: true });

      let pullCache: string;
      results.push(
        await runScenario({
          name: "Pull 1000 files (cold)",
          warmup: 0,
          async setup() {
            pullCache = await Deno.makeTempDir({
              prefix: "bench-gcs-pull-cold-",
            });
            await ensureDir(pullCache);
          },
          async run() {
            const svc = createSyncService(
              endpoints.gcs,
              sourceBucket,
              pullCache,
              sourcePrefix,
            );
            await svc.pullChanged();
          },
          async teardown() {
            await Deno.remove(pullCache, { recursive: true });
          },
        }),
      );

      // -----------------------------------------------------------------------
      // Scenario 6: Pull 1 changed / 1000 (incremental)
      // -----------------------------------------------------------------------
      const pullCache6 = await Deno.makeTempDir({
        prefix: "bench-gcs-pull-incr-",
      });
      let svc6 = createSyncService(
        endpoints.gcs,
        sourceBucket,
        pullCache6,
        sourcePrefix,
      );
      await svc6.pullChanged();
      cleanups.push(pullCache6);

      results.push(
        await runScenario({
          name: "Pull 1 changed / 1000",
          warmup: 0,
          async setup() {
            const modCache = await Deno.makeTempDir({
              prefix: "bench-gcs-mod-",
            });
            const modSeed = await seedTestData({
              cachePath: modCache,
              fileCount: 1000,
              modelCount: 50,
            });
            await modifyOneFile(modCache, modSeed.models, 0);
            const modSvc = createSyncService(
              endpoints.gcs,
              sourceBucket,
              modCache,
              sourcePrefix,
            );
            await modSvc.pushChanged();
            await Deno.remove(modCache, { recursive: true });

            svc6 = createSyncService(
              endpoints.gcs,
              sourceBucket,
              pullCache6,
              sourcePrefix,
            );
          },
          async run() {
            await svc6.pullChanged();
          },
        }),
      );

      // -----------------------------------------------------------------------
      // Scenario 7: No-op pull (sidecar fast path)
      // -----------------------------------------------------------------------
      results.push(
        await runScenario({
          name: "No-op pull (fast path)",
          warmup: 0,
          setup() {
            svc6 = createSyncService(
              endpoints.gcs,
              sourceBucket,
              pullCache6,
              sourcePrefix,
            );
            return Promise.resolve();
          },
          async run() {
            await svc6.pullChanged();
          },
        }),
      );

      // -----------------------------------------------------------------------
      // Scenario 8: Scoped pull 1 model / 50 (partitioned index)
      // -----------------------------------------------------------------------
      results.push(
        await runScenario({
          name: "Scoped pull 1/50 models (partition)",
          warmup: 0,
          setup() {
            svc6 = createSyncService(
              endpoints.gcs,
              sourceBucket,
              pullCache6,
              sourcePrefix,
            );
            return Promise.resolve();
          },
          async run() {
            await svc6.pullChanged({
              context: {
                models: [{
                  modelType: seedResult.models[0].modelType,
                  modelId: seedResult.models[0].modelId,
                }],
              },
            });
          },
        }),
      );

      // -----------------------------------------------------------------------
      // Scenario 9: Writeback with partitions (parallel)
      // -----------------------------------------------------------------------
      results.push(
        await runScenario({
          name: "Writeback partitioned (parallel)",
          warmup: 0,
          async setup() {
            await bulkModifyFiles(pullCache6, seedResult.models, 10);
            svc6 = createSyncService(
              endpoints.gcs,
              sourceBucket,
              pullCache6,
              sourcePrefix,
            );
            for (let i = 0; i < 10; i++) {
              await svc6.markDirty({
                relPath: join(
                  "data",
                  seedResult.models[i].modelType,
                  seedResult.models[i].modelId,
                ),
              });
            }
          },
          async run() {
            await svc6.pushChanged();
          },
          phaseFilter: ["pushChanged.writeback"],
        }),
      );
    }

    // -----------------------------------------------------------------------
    // Output results
    // -----------------------------------------------------------------------
    console.log("\n\nGCS Benchmark Results\n");
    console.log(formatResultsTable(results));

    if (Deno.env.get("BENCHMARK_JSON")) {
      const jsonPath = Deno.env.get("BENCHMARK_JSON");
      if (jsonPath) {
        await Deno.writeTextFile(jsonPath, formatResultsJson(results));
        console.log(`\nJSON results written to: ${jsonPath}`);
      } else {
        console.log("\n" + formatResultsJson(results));
      }
    }
  } finally {
    console.debug = originalDebug;
    for (const p of cleanups) {
      try {
        await Deno.remove(p, { recursive: true });
      } catch { /* already removed */ }
    }
    await stopEmulators();
  }
}

main().catch((err) => {
  console.error("Benchmark failed:", err);
  Deno.exit(1);
});
