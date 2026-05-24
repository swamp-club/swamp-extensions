import { join } from "@std/path";
import { ensureDir } from "@std/fs";
import { S3Client } from "../s3/extensions/datastores/_lib/s3_client.ts";
import { S3CacheSyncService } from "../s3/extensions/datastores/_lib/s3_cache_sync.ts";
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
  createS3Bucket,
  startEmulators,
  stopEmulators,
} from "./_lib/emulators.ts";

let bucketCounter = 0;

function isEmulator(endpoint: string): boolean {
  return endpoint.includes("localhost") || endpoint.includes("127.0.0.1");
}

function nextBucket(endpoint: string): string {
  if (!isEmulator(endpoint)) {
    const b = Deno.env.get("BENCHMARK_S3_BUCKET");
    if (!b) {
      throw new Error(
        "BENCHMARK_S3_BUCKET must be set when running against real S3",
      );
    }
    return b;
  }
  return `bench-s3-${Date.now()}-${bucketCounter++}`;
}

function nextPrefix(endpoint: string): string | undefined {
  if (!isEmulator(endpoint)) {
    return `bench-${Date.now()}-${bucketCounter++}`;
  }
  return undefined;
}

function createSyncService(
  endpoint: string,
  bucket: string,
  cachePath: string,
  prefix?: string,
): S3CacheSyncService {
  const client = new S3Client({
    bucket,
    prefix,
    endpoint: isEmulator(endpoint) ? endpoint : undefined,
    forcePathStyle: isEmulator(endpoint),
    region: Deno.env.get("AWS_REGION") ?? "us-east-1",
  });
  return new S3CacheSyncService(client, cachePath);
}

async function main() {
  const originalDebug = console.debug;
  console.debug = () => {};

  const endpoints = await startEmulators();

  if (isEmulator(endpoints.s3)) {
    Deno.env.set(
      "AWS_ACCESS_KEY_ID",
      Deno.env.get("AWS_ACCESS_KEY_ID") ?? "minioadmin",
    );
    Deno.env.set(
      "AWS_SECRET_ACCESS_KEY",
      Deno.env.get("AWS_SECRET_ACCESS_KEY") ?? "minioadmin",
    );
    Deno.env.set("AWS_REGION", Deno.env.get("AWS_REGION") ?? "us-east-1");
  }

  const results: ScenarioResult[] = [];
  const cleanups: string[] = [];

  try {
    // -----------------------------------------------------------------------
    // Scenario 1: Push 1000 files (cold)
    // Each trial gets a fresh bucket + fresh cache dir = isolated swamp repo
    // -----------------------------------------------------------------------
    {
      let cachePath: string;
      let prefix: string | undefined;
      const bucket = nextBucket(endpoints.s3);
      if (isEmulator(endpoints.s3)) await createS3Bucket(endpoints.s3, bucket);
      results.push(
        await runScenario({
          name: "Push 1000 files (cold)",
          warmup: 0,
          async setup() {
            prefix = nextPrefix(endpoints.s3);
            cachePath = await Deno.makeTempDir({
              prefix: "bench-s3-push-cold-",
            });
            await seedTestData({ cachePath, fileCount: 1000, modelCount: 50 });
          },
          async run() {
            const svc = createSyncService(
              endpoints.s3,
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
    // Setup: fresh repo with 1000 files already pushed, then modify one
    // -----------------------------------------------------------------------
    {
      let svc: S3CacheSyncService;

      // One-time setup: create repo with data already synced
      const bucket = nextBucket(endpoints.s3);
      const prefix = nextPrefix(endpoints.s3);
      if (isEmulator(endpoints.s3)) await createS3Bucket(endpoints.s3, bucket);
      const cachePath = await Deno.makeTempDir({
        prefix: "bench-s3-push-incr-",
      });
      const seedResult = await seedTestData({
        cachePath,
        fileCount: 1000,
        modelCount: 50,
      });
      svc = createSyncService(endpoints.s3, bucket, cachePath, prefix);
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
            svc = createSyncService(endpoints.s3, bucket, cachePath, prefix);
            await svc.markDirty({ relPath });
          },
          async run() {
            await svc.pushChanged();
          },
        }),
      );

      // -----------------------------------------------------------------------
      // Scenario 3: No-op push (sidecar fast path)
      // Reuses same repo — nothing changed since last push
      // -----------------------------------------------------------------------
      results.push(
        await runScenario({
          name: "No-op push (fast path)",
          warmup: 0,
          setup() {
            svc = createSyncService(endpoints.s3, bucket, cachePath, prefix);
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
            svc = createSyncService(endpoints.s3, bucket, cachePath, prefix);
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
    // Fresh bucket with 1000 files pushed, then pull into empty cache
    // -----------------------------------------------------------------------
    {
      const sourceBucket = nextBucket(endpoints.s3);
      const sourcePrefix = nextPrefix(endpoints.s3);
      if (isEmulator(endpoints.s3)) {
        await createS3Bucket(endpoints.s3, sourceBucket);
      }
      const sourceCache = await Deno.makeTempDir({ prefix: "bench-s3-src-" });
      const seedResult = await seedTestData({
        cachePath: sourceCache,
        fileCount: 1000,
        modelCount: 50,
      });
      const sourceSvc = createSyncService(
        endpoints.s3,
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
              prefix: "bench-s3-pull-cold-",
            });
            await ensureDir(pullCache);
          },
          async run() {
            const svc = createSyncService(
              endpoints.s3,
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

      const pullCache6 = await Deno.makeTempDir({
        prefix: "bench-s3-pull-incr-",
      });
      let svc6 = createSyncService(
        endpoints.s3,
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
              prefix: "bench-s3-mod-",
            });
            const modSeed = await seedTestData({
              cachePath: modCache,
              fileCount: 1000,
              modelCount: 50,
            });
            await modifyOneFile(modCache, modSeed.models, 0);
            const modSvc = createSyncService(
              endpoints.s3,
              sourceBucket,
              modCache,
              sourcePrefix,
            );
            await modSvc.pushChanged();
            await Deno.remove(modCache, { recursive: true });

            svc6 = createSyncService(
              endpoints.s3,
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

      results.push(
        await runScenario({
          name: "No-op pull (fast path)",
          warmup: 0,
          setup() {
            svc6 = createSyncService(
              endpoints.s3,
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

      results.push(
        await runScenario({
          name: "Scoped pull 1/50 models (partition)",
          warmup: 0,
          setup() {
            svc6 = createSyncService(
              endpoints.s3,
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

      results.push(
        await runScenario({
          name: "Writeback partitioned (parallel)",
          warmup: 0,
          async setup() {
            await bulkModifyFiles(pullCache6, seedResult.models, 10);
            svc6 = createSyncService(
              endpoints.s3,
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
    console.log("\n\nS3 Benchmark Results\n");
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
