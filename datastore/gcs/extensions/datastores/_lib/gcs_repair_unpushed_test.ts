// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { assert, assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1";
import { assertSyncServiceRoundTripConformance } from "@swamp-club/swamp-testing";
import { GcsCacheSyncService, isInternalCacheFile } from "./gcs_cache_sync.ts";
import { GcsClient } from "./gcs_client.ts";
import {
  createGcsEmulatorHandler,
  type GcsEmulatorState,
  withGcsEmulator,
} from "./gcs_emulator_test_util.ts";

// Repair and last-synced behaviour over the real client and a local emulator
// (swamp-club#4112, #4137). The S3 tests run the same cases.
const opts = {};

type Svc = GcsCacheSyncService;
const SvcClass = GcsCacheSyncService;
const SYNC_SOURCE = "gcs_cache_sync.ts";

function worldOf(
  client: GcsClient,
  state: GcsEmulatorState,
  caches: string[],
): World {
  let generation = 1;
  return {
    connect: async (dir, pushConcurrency) => {
      const cache = dir ?? await Deno.makeTempDir({ prefix: "gcsrepair-" });
      caches.push(cache);
      const svc = new GcsCacheSyncService(
        client,
        cache,
        pushConcurrency ? { pushConcurrency } : undefined,
      );
      return { svc, dir: cache };
    },
    has: (key) => state.objects.has(key),
    get: (key) => state.objects.get(key)?.body,
    put: (key, body, metadata) => {
      state.objects.set(key, {
        body,
        generation: generation++,
        updated: new Date(),
        metadata,
      });
    },
    del: (key) => {
      state.objects.delete(key);
    },
    metadata: (key) => state.objects.get(key)?.metadata,
    requests: () =>
      state.requests.map((r) => ({
        op: r.kind === "metadata"
          ? "head"
          : r.kind === "media"
          ? "get"
          : r.kind === "upload"
          ? "put"
          : r.kind,
        key: r.name,
      })),
    // A multipart upload names its object in the body, so the emulator sees
    // no name in the query: only a repair's creates look like this.
    respondToCreate: (fn) => {
      state.options.respondTo = (method, name) =>
        method === "POST" && name === "" ? fn() : undefined;
    },
    onRequest: (fn) => {
      state.options.respondTo = (method, name) => {
        fn(
          method === "GET" ? "get" : method === "POST" ? "put" : "other",
          name,
        );
        return undefined;
      };
    },
    denyWrites: (denied) => {
      state.options.respondTo = (method, name) =>
        method === "POST" && name === denied
          ? Response.json({ error: { code: 403, message: "Denied" } }, {
            status: 403,
          })
          : undefined;
    },
    refused: () =>
      Response.json({ error: { code: 412, message: "Precondition" } }, {
        status: 412,
      }),
    conflict: () =>
      Response.json({ error: { code: 409, message: "Conflict" } }, {
        status: 409,
      }),
    noConditionalCreate: () =>
      Response.json({ error: { code: 400, message: "Unsupported" } }, {
        status: 400,
      }),
  };
}

function world(fn: (w: World) => Promise<void>): Promise<void> {
  return withGcsEmulator({}, async (client, state) => {
    const caches: string[] = [];
    try {
      await fn(worldOf(client, state, caches));
    } finally {
      for (const cache of new Set(caches)) {
        await Deno.remove(cache, { recursive: true });
      }
    }
  });
}

interface Conn {
  svc: Svc;
  dir: string;
}

interface World {
  connect(dir?: string, pushConcurrency?: number): Promise<Conn>;
  has(key: string): boolean;
  get(key: string): Uint8Array | undefined;
  put(key: string, body: Uint8Array, metadata?: Record<string, string>): void;
  del(key: string): void;
  metadata(key: string): Record<string, string> | undefined;
  requests(): Array<{ op: string; key: string }>;
  /** Answers a repair's create-only uploads, when `fn` returns a response. */
  respondToCreate(fn: () => Response | undefined): void;
  onRequest(fn: (op: string, key: string) => void): void;
  /** Answers writes of `key` with a 403, which is not retried, until reset. */
  denyWrites(key: string | null): void;
  refused(): Response;
  conflict(): Response;
  noConditionalCreate(): Response;
}

interface Entry {
  key: string;
  size: number;
  lastModified: string;
  localMtime?: string;
  sha256?: string;
}

const META = "_index/_meta.json";
const SHARD = "_index/data--mt--mid.json";
const INDEX = ".datastore-index.json";
const SIDECAR = ".datastore-sync-state.json";
const PEER_DELETED = ".datastore-peer-deleted.json";
const encode = (text: string) => new TextEncoder().encode(text);
const rawPath = (n: number | string) => `data/mt/mid/name/${n}/raw`;

async function write(dir: string, rel: string, text: string): Promise<void> {
  const path = join(dir, rel);
  await Deno.mkdir(join(path, ".."), { recursive: true });
  await Deno.writeTextFile(path, text);
}

async function push(c: Conn, rel: string, text: string): Promise<void> {
  await write(c.dir, rel, text);
  await c.svc.markDirty({ relPath: rel });
  await c.svc.pushChanged();
}

async function lastSynced(dir: string): Promise<Record<string, Entry>> {
  const text = await Deno.readTextFile(join(dir, INDEX));
  return JSON.parse(text).entries;
}

function meta(w: World, key = META) {
  const body = w.get(key);
  return body ? JSON.parse(new TextDecoder().decode(body)) : null;
}

async function exists(path: string): Promise<boolean> {
  try {
    await Deno.lstat(path);
    return true;
  } catch {
    return false;
  }
}

async function sha256Of(text: string): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", encode(text));
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** A cache that has synced an empty remote and is clean. */
async function synced(w: World, pushConcurrency?: number): Promise<Conn> {
  const c = await w.connect(undefined, pushConcurrency);
  await c.svc.pullChanged();
  await c.svc.pullChanged();
  return c;
}

/** Publishes entries with no sha256, as releases before 2026-05-24 wrote them. */
function seedHashless(w: World, files: Record<string, string>): void {
  const entries: Record<string, Entry> = {};
  for (const [rel, text] of Object.entries(files)) {
    w.put(rel, encode(text));
    entries[rel] = {
      key: rel,
      size: encode(text).length,
      lastModified: "2026-01-01T00:00:00.000Z",
    };
  }
  w.put(SHARD, encode(JSON.stringify({ version: 1, entries })));
  w.put(
    META,
    encode(
      JSON.stringify({
        version: 2,
        partitions: ["data--mt--mid"],
        commitSeq: 5,
      }),
    ),
  );
}

Deno.test({
  ...opts,
  name: "repair: uploads a stranded file create-only, and a peer pulls it",
  fn: () =>
    world(async (w) => {
      const a = await synced(w), b = await synced(w);
      await push(a, rawPath(1), "tracked");
      await a.svc.pullChanged();
      await write(a.dir, rawPath(2), "stranded");
      const sidecar = await Deno.readTextFile(join(a.dir, SIDECAR));

      const preview = await a.svc.repairUnpushedFiles({ dryRun: true });
      assertEquals(preview.unpushed, 1);
      assertEquals(preview.samplePaths, [rawPath(2)]);
      assertEquals(preview.uploaded, 0);
      assertEquals(w.has(rawPath(2)), false);

      const seqBefore = meta(w).commitSeq;
      const summary = await a.svc.repairUnpushedFiles();
      assertEquals(summary.uploaded, 1);
      assertEquals(summary.unpushed, 0);
      assertEquals(
        w.metadata(rawPath(2))?.sha256,
        await sha256Of("stranded"),
      );
      assert(meta(w).commitSeq > seqBefore);
      assertEquals(
        (await lastSynced(a.dir))[rawPath(2)].sha256,
        await sha256Of("stranded"),
      );
      assertEquals(
        await Deno.readTextFile(join(a.dir, SIDECAR)),
        sidecar,
        "a repair must leave dirty state and the fingerprint alone",
      );

      await b.svc.pullChanged();
      assertEquals(
        await Deno.readTextFile(join(b.dir, rawPath(2))),
        "stranded",
      );
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: refuses a v1 _meta.json, a monolith with no _meta.json, and a cache with no last-synced index",
  fn: () =>
    world(async (w) => {
      const a = await w.connect();
      await write(
        a.dir,
        INDEX,
        JSON.stringify({ version: 1, lastPulled: "", entries: {} }),
      );
      w.put(META, encode(JSON.stringify({ version: 1, partitions: [] })));
      const v1 = await assertRejects(() => a.svc.repairUnpushedFiles());
      assertEquals((v1 as Error).name, "RepairUnpushedRefusedError");
      assert((v1 as Error).message.includes("migrate-index"));

      w.del(META);
      w.put(
        INDEX,
        encode(JSON.stringify({ version: 1, lastPulled: "", entries: {} })),
      );
      const monolith = await assertRejects(() =>
        a.svc.repairUnpushedFiles({ dryRun: true })
      );
      assertEquals((monolith as Error).name, "RepairUnpushedRefusedError");
      assert((monolith as Error).message.includes("migrate-index"));

      w.del(INDEX);
      const peer = await synced(w);
      await push(peer, rawPath(1), "one");
      const fresh = await w.connect();
      const none = await assertRejects(() => fresh.svc.repairUnpushedFiles());
      assertEquals((none as Error).name, "RepairUnpushedRefusedError");
      assert((none as Error).message.includes("last-synced"));
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: refuses a remote with shards or data but no _meta.json, leaving its shards listed by nothing new",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await push(a, rawPath(1), "one");
      await a.svc.pullChanged();
      await write(a.dir, "data/other/mid/name/1/raw", "stranded");
      w.del(META);

      const shards = await assertRejects(() => a.svc.repairUnpushedFiles());
      assertEquals((shards as Error).name, "RepairUnpushedRefusedError");
      assert((shards as Error).message.includes("migrate-index"));
      assertEquals(meta(w), null, "a refusal must not create a _meta.json");
      assertEquals(w.has("data/other/mid/name/1/raw"), false);

      w.del(SHARD);
      const data = await assertRejects(() =>
        a.svc.repairUnpushedFiles({ dryRun: true })
      );
      assertEquals((data as Error).name, "RepairUnpushedRefusedError");
    }),
});

Deno.test({
  ...opts,
  name: "repair: a peer's entry committed after the upload is not replaced",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await write(a.dir, rawPath(1), "ours");
      const peerEntry: Entry = {
        key: rawPath(1),
        size: 6,
        lastModified: "2026-03-03T00:00:00.000Z",
        sha256: await sha256Of("theirs"),
      };
      let raced = false;
      w.respondToCreate(() => {
        if (raced) return undefined;
        raced = true;
        w.put(
          SHARD,
          encode(
            JSON.stringify({
              version: 1,
              entries: { [rawPath(1)]: peerEntry },
            }),
          ),
        );
        w.put(
          META,
          encode(
            JSON.stringify({
              version: 2,
              partitions: ["data--mt--mid"],
              commitSeq: meta(w).commitSeq + 1,
            }),
          ),
        );
        return undefined;
      });
      await a.svc.repairUnpushedFiles();
      const shard = JSON.parse(new TextDecoder().decode(w.get(SHARD)));
      assertEquals(shard.entries[rawPath(1)], peerEntry);
    }),
});

Deno.test({
  ...opts,
  name: "repair: a same-size edit of a hashed entry is reported without exact",
  fn: () =>
    world(async (w) => {
      const a = await synced(w), b = await synced(w);
      await push(a, rawPath(1), "aaaa");
      await b.svc.pullChanged();
      await write(b.dir, rawPath(1), "bbbb");
      const touched = new Date(Date.now() - 60_000);
      await Deno.utime(join(b.dir, rawPath(1)), touched, touched);
      const preview = await b.svc.repairUnpushedFiles({ dryRun: true });
      assertEquals(preview.sampleModified, [rawPath(1)]);
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: a key an unindexed object holds with other bytes is alreadyPresent and left alone",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await write(a.dir, rawPath(1), "ours!");
      await write(a.dir, rawPath(2), "ours, and longer");
      w.put(rawPath(1), encode("their"));
      w.put(rawPath(2), encode("theirs"));

      const preview = await a.svc.repairUnpushedFiles({ dryRun: true });
      assertEquals(preview.alreadyPresent, 1, "another size is known at once");
      assertEquals(preview.unpushed, 1, "an equal size needs the real run");

      const summary = await a.svc.repairUnpushedFiles();
      assertEquals(summary.uploaded, 0);
      assertEquals(summary.alreadyPresent, 2);
      assertEquals(summary.unpushed, 0);
      assertEquals(new TextDecoder().decode(w.get(rawPath(1))), "their");
      assertEquals(new TextDecoder().decode(w.get(rawPath(2))), "theirs");
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: rejects on an endpoint without conditional create, never overwriting",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await write(a.dir, rawPath(1), "ours");
      w.respondToCreate(() => w.noConditionalCreate());
      await assertRejects(() => a.svc.repairUnpushedFiles());
      assertEquals(w.has(rawPath(1)), false);
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: retries a 409 and a refusal that left no object, up to the limit",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await write(a.dir, rawPath(1), "one");
      let conflicts = 2;
      w.respondToCreate(() => conflicts-- > 0 ? w.conflict() : undefined);
      assertEquals((await a.svc.repairUnpushedFiles()).uploaded, 1);
      assertEquals(conflicts, -1, "a 409 is retried until the create lands");

      await write(a.dir, rawPath(2), "two");
      let refusals = 1;
      w.respondToCreate(() => refusals-- > 0 ? w.refused() : undefined);
      assertEquals((await a.svc.repairUnpushedFiles()).uploaded, 1);
      assertEquals(refusals, -1, "a refusal with no object is retried");

      await write(a.dir, rawPath(3), "three");
      let attempts = 0;
      w.respondToCreate(() => {
        attempts++;
        return w.conflict();
      });
      const err = await assertRejects(() => a.svc.repairUnpushedFiles());
      assert((err as Error).message.includes("refused 5 time(s)"));
      assertEquals(attempts, 5);

      attempts = 0;
      w.respondToCreate(() => {
        attempts++;
        return w.refused();
      });
      await assertRejects(() => a.svc.repairUnpushedFiles());
      assertEquals(attempts, 5);
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: settles an orphan by its recorded sha256 without reading it, and by a streamed hash without one",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await write(a.dir, rawPath(1), "orphan one");
      w.put(rawPath(1), encode("orphan one"), {
        sha256: await sha256Of("orphan one"),
      });
      await write(a.dir, rawPath(2), "orphan two");
      w.put(rawPath(2), encode("orphan two"));

      const before = w.requests().length;
      const summary = await a.svc.repairUnpushedFiles();
      const seen = w.requests().slice(before);
      assertEquals(summary.uploaded, 2);
      assertEquals(summary.alreadyPresent, 0);
      assertEquals(
        seen.some((r) => r.op === "get" && r.key === rawPath(1)),
        false,
        "a recorded sha256 settles it without reading the object",
      );
      assert(seen.some((r) => r.op === "get" && r.key === rawPath(2)));
      assertEquals(
        // A GCS multipart create names its object only in its body, so it is
        // recorded with no key.
        seen.some((r) =>
          r.op === "put" &&
          (r.key === rawPath(1) || r.key === rawPath(2) || r.key === "")
        ),
        false,
        "a listed object is settled, not written",
      );
      const index = await lastSynced(a.dir);
      assert(index[rawPath(1)] && index[rawPath(2)]);
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: a create a peer's object refused in this run is settled in this run",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await write(a.dir, rawPath(1), "same bytes");
      await write(a.dir, rawPath(2), "our bytes!");
      let raced = false;
      w.respondToCreate(() => {
        if (raced) return w.refused();
        raced = true;
        w.put(rawPath(1), encode("same bytes"));
        w.put(rawPath(2), encode("peer bytes"));
        return w.refused();
      });
      const summary = await a.svc.repairUnpushedFiles();
      assertEquals(summary.uploaded, 1);
      assertEquals(summary.alreadyPresent, 1);
      assertEquals(summary.sampleAlreadyPresent, [rawPath(2)]);
      assertEquals(new TextDecoder().decode(w.get(rawPath(2))), "peer bytes");
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: exact settles an unknown entry by a remote hash only while the remote entry is unchanged",
  fn: () =>
    world(async (w) => {
      seedHashless(w, { [rawPath(1)]: "aaaa", [rawPath(2)]: "bbbb" });
      const a = await w.connect();
      await a.svc.pullChanged();
      const touched = new Date(Date.now() - 60_000);

      await Deno.utime(join(a.dir, rawPath(1)), touched, touched);
      await write(a.dir, rawPath(2), "BBBB");
      await Deno.utime(join(a.dir, rawPath(2)), touched, touched);

      const loose = await a.svc.repairUnpushedFiles({ dryRun: true });
      assertEquals(loose.unknown, 2);
      assertEquals(loose.sampleUnknown, [rawPath(1), rawPath(2)]);
      assertEquals(loose.locallyModified, 0);

      const exact = await a.svc.repairUnpushedFiles({
        dryRun: true,
        exact: true,
      });
      assertEquals(exact.unknown, 0);
      assertEquals(exact.sampleModified, [rawPath(2)]);

      const moved = JSON.parse(new TextDecoder().decode(w.get(SHARD)));
      moved.entries[rawPath(1)].lastModified = "2026-02-02T00:00:00.000Z";
      w.put(SHARD, encode(JSON.stringify(moved)));
      const stale = await a.svc.repairUnpushedFiles({
        dryRun: true,
        exact: true,
      });
      assertEquals(stale.sampleUnknown, [rawPath(1)]);
      assertEquals(stale.remoteMovedOn, 1);
    }),
});

Deno.test({
  ...opts,
  name: "repair: a dry run does one listing and no request per file",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      for (let i = 0; i < 5; i++) await write(a.dir, rawPath(i), `file ${i}`);
      const before = w.requests().length;
      const preview = await a.svc.repairUnpushedFiles({ dryRun: true });
      const seen = w.requests().slice(before);
      assertEquals(preview.unpushed, 5);
      assertEquals(seen.filter((r) => r.op === "list").length, 1);
      assertEquals(
        seen.filter((r) => r.key.startsWith("data/")).length,
        0,
      );
      assertEquals(seen.filter((r) => r.op === "put").length, 0);
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: batches committed before an abort stay committed, and a rerun finishes",
  fn: () =>
    world(async (w) => {
      const statics = SvcClass as unknown as { REPAIR_COMMIT_BATCH: number };
      const priorBatch = statics.REPAIR_COMMIT_BATCH;
      statics.REPAIR_COMMIT_BATCH = 1;
      try {
        const a = await synced(w, 1);
        for (let i = 0; i < 3; i++) await write(a.dir, rawPath(i), `file ${i}`);
        const abort = new AbortController();
        w.onRequest((op, key) => {
          if (op === "put" && key === META) abort.abort();
        });
        await assertRejects(() =>
          a.svc.repairUnpushedFiles({ signal: abort.signal })
        );
        w.onRequest(() => {});
        const firstBatch = meta(w).partitions.length;
        assertEquals(firstBatch, 1, "the first batch reached the index");

        await a.svc.repairUnpushedFiles();
        const peer = await w.connect();
        await peer.svc.pullChanged();
        for (let i = 0; i < 3; i++) {
          assertEquals(
            await Deno.readTextFile(join(peer.dir, rawPath(i))),
            `file ${i}`,
          );
        }
      } finally {
        statics.REPAIR_COMMIT_BATCH = priorBatch;
      }
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: a pending delete survives the repair and the next push sends it",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await push(a, rawPath(1), "gone");
      await Deno.remove(join(a.dir, rawPath(1)));
      await a.svc.markDirty({ relPath: rawPath(1) });
      await write(a.dir, rawPath(2), "stranded");
      const sidecar = await Deno.readTextFile(join(a.dir, SIDECAR));

      const summary = await a.svc.repairUnpushedFiles();
      assertEquals(summary.pendingChanges, true);
      assertEquals(summary.uploaded, 1);
      assertEquals(w.has(rawPath(1)), true, "a repair deletes nothing");
      assertEquals(await Deno.readTextFile(join(a.dir, SIDECAR)), sidecar);

      await a.svc.pushChanged();
      assertEquals(w.has(rawPath(1)), false);
      assertEquals(w.has(rawPath(2)), true);
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: on a namespaced cache the next push still walks, and sends an edit the repair only reported",
  fn: () =>
    world(async (w) => {
      const ns = "ns";
      const rel = `${ns}/${rawPath(1)}`;
      const peer = await w.connect();
      await peer.svc.pullChanged({ namespace: ns });
      await peer.svc.pullChanged({ namespace: ns });
      await write(peer.dir, rel, "aaaa");
      await peer.svc.markDirty({ relPath: rel, namespace: ns });
      await peer.svc.pushChanged({ namespace: ns });

      const a = await w.connect();
      await a.svc.pullChanged({ namespace: ns });
      await write(a.dir, rel, "edited");
      await write(a.dir, `${ns}/${rawPath(2)}`, "stranded");
      const sidecar = await Deno.readTextFile(join(a.dir, SIDECAR));

      const summary = await a.svc.repairUnpushedFiles({ namespace: ns });
      assertEquals(summary.uploaded, 1);
      assertEquals(summary.sampleModified, [rel]);
      assertEquals(
        await Deno.readTextFile(join(a.dir, SIDECAR)),
        sidecar,
        "the gates must leave the flags that send the next push down the slow path",
      );
      assertEquals(new TextDecoder().decode(w.get(rel)), "aaaa");

      await a.svc.pushChanged({ namespace: ns });
      assertEquals(new TextDecoder().decode(w.get(rel)), "edited");
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: the migration gates run before an upload, and never on a dry run or with nothing to upload",
  fn: () =>
    world(async (w) => {
      const ns = "ns";
      const a = await w.connect();
      await a.svc.pullChanged({ namespace: ns });
      await a.svc.pullChanged({ namespace: ns });
      // A namespaced monolith is what shows the repo was once solo, and so that
      // the root's control-plane keys are its own.
      w.put(
        `${ns}/${INDEX}`,
        encode(JSON.stringify({ version: 1, lastPulled: "", entries: {} })),
      );
      w.put("_control/heartbeats/x", encode("record"));

      await a.svc.repairUnpushedFiles({ namespace: ns, dryRun: true });
      assertEquals(w.has("_control/heartbeats/x"), true);
      await a.svc.repairUnpushedFiles({ namespace: ns });
      assertEquals(w.has("_control/heartbeats/x"), true);

      await write(a.dir, `${ns}/${rawPath(1)}`, "stranded");
      await a.svc.repairUnpushedFiles({ namespace: ns });
      assertEquals(w.has("_control/heartbeats/x"), false);
      assertEquals(w.has(`${ns}/_control/heartbeats/x`), true);
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: internal paths under the namespace are never uploaded or counted",
  fn: () =>
    world(async (w) => {
      const ns = "ns";
      const a = await w.connect();
      await a.svc.pullChanged({ namespace: ns });
      await a.svc.pullChanged({ namespace: ns });
      const internal = [
        `${ns}/_control/x`,
        `${ns}/_index/x.json`,
        `${ns}/_blobs/x`,
        `${ns}/_litestream/x`,
        `${ns}/${INDEX}`,
      ];
      for (const rel of internal) await write(a.dir, rel, "internal");
      await write(a.dir, `${ns}/${rawPath(1)}`, "stranded");

      const preview = await a.svc.repairUnpushedFiles({
        namespace: ns,
        dryRun: true,
      });
      assertEquals(preview.samplePaths, [`${ns}/${rawPath(1)}`]);

      const summary = await a.svc.repairUnpushedFiles({ namespace: ns });
      assertEquals(summary.uploaded, 1);
      for (const rel of internal) assertEquals(w.has(rel), false, rel);
    }),
});

// The three ways a push finds its files. No conformance helper covers which
// cache paths a push walks, so these assert on the bucket directly
// (swamp-club#4191).
const pushWalks: Record<
  string,
  (ns: string, files: string[]) => Array<string | undefined>
> = {
  "the whole-cache walk": () => [undefined],
  "a scoped directory": (ns) => [ns],
  "a scoped file": (_ns, files) => files,
};

for (const [walk, marks] of Object.entries(pushWalks)) {
  Deno.test({
    ...opts,
    name: `push: ${walk} never uploads internal paths under the namespace`,
    fn: () =>
      world(async (w) => {
        const ns = "ns";
        const a = await w.connect();
        await a.svc.pullChanged({ namespace: ns });
        await a.svc.pullChanged({ namespace: ns });
        const internal = [
          `${ns}/_control/x`,
          `${ns}/_index/x.json`,
          `${ns}/_blobs/x`,
          `${ns}/_litestream/x`,
          `${ns}/${INDEX}`,
        ];
        // The second only looks internal: it is data, deeper in the tree.
        const data = [`${ns}/${rawPath(1)}`, `${ns}/data/_control/y`];
        for (const rel of internal) await write(a.dir, rel, "internal");
        for (const rel of data) await write(a.dir, rel, "data");

        for (const relPath of marks(ns, [...internal, ...data])) {
          await a.svc.markDirty({ namespace: ns, relPath });
        }
        await a.svc.pushChanged({ namespace: ns });

        for (const rel of internal) assertEquals(w.has(rel), false, rel);
        for (const rel of data) assertEquals(w.has(rel), true, rel);
      }),
  });
}

Deno.test({
  ...opts,
  name: "repair: symlinks are never followed or uploaded",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await write(a.dir, rawPath(1), "real");
      await Deno.symlink(
        join(a.dir, rawPath(1)),
        join(a.dir, "data/mt/mid/name/1/link"),
      );
      await Deno.symlink(
        join(a.dir, "missing"),
        join(a.dir, "data/mt/mid/name/1/dangling"),
      );
      const summary = await a.svc.repairUnpushedFiles();
      assertEquals(summary.uploaded, 1);
      assertEquals(summary.unpushed, 0);
      assertEquals(w.has("data/mt/mid/name/1/link"), false);
      assertEquals(w.has("data/mt/mid/name/1/dangling"), false);
    }),
});

Deno.test({
  ...opts,
  name: "pull: an empty remote leaves an empty last-synced index",
  fn: () =>
    world(async (w) => {
      const a = await w.connect();
      await a.svc.pullChanged();
      assertEquals(await lastSynced(a.dir), {});
    }),
});

Deno.test({
  ...opts,
  name:
    "pull: a v2 pull records this copy's mtime for downloads and keeps a concurrent push's entries",
  fn: () =>
    world(async (w) => {
      const a = await synced(w), b = await synced(w);
      await push(a, rawPath(1), "one");
      const concurrent: Entry = {
        key: rawPath(9),
        size: 3,
        lastModified: "2026-01-01T00:00:00.000Z",
      };
      let injected = false;
      w.onRequest((op, key) => {
        if (op !== "get" || key !== rawPath(1) || injected) return;
        injected = true;
        // A push on this cache lands while the pull downloads.
        const path = join(b.dir, INDEX);
        const onDisk = JSON.parse(Deno.readTextFileSync(path));
        onDisk.entries[rawPath(9)] = concurrent;
        Deno.writeTextFileSync(path, JSON.stringify(onDisk));
      });
      assertEquals(await b.svc.pullChanged(), 1);
      assert(injected);
      const index = await lastSynced(b.dir);
      assertEquals(index[rawPath(9)], concurrent);
      const stat = await Deno.stat(join(b.dir, rawPath(1)));
      assertEquals(index[rawPath(1)].localMtime, stat.mtime!.toISOString());
    }),
});

Deno.test({
  ...opts,
  name:
    "pull: a models-scoped pull with no last-synced index does not create a partial one",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await push(a, rawPath(1), "one");
      const fresh = await w.connect();
      await fresh.svc.pullChanged({
        context: { models: [{ modelType: "mt", modelId: "mid" }] },
      });
      assert(await exists(join(fresh.dir, rawPath(1))));
      assertEquals(await exists(join(fresh.dir, INDEX)), false);
      const refused = await assertRejects(() =>
        fresh.svc.repairUnpushedFiles({ dryRun: true })
      );
      assert((refused as Error).message.includes("last-synced"));
    }),
});

Deno.test({
  ...opts,
  name:
    "pull: a same-size edit of an entry with no sha256 is still reported after a pull",
  fn: () =>
    world(async (w) => {
      seedHashless(w, { [rawPath(1)]: "aaaa", [rawPath(2)]: "bbbb" });
      const a = await w.connect();
      await a.svc.pullChanged();
      await new Promise((resolve) => setTimeout(resolve, 20));
      await write(a.dir, rawPath(1), "AAAA");
      const edited = (await Deno.stat(join(a.dir, rawPath(1)))).mtime!;

      const peer = await synced(w);
      await push(peer, rawPath(3), "cccc");
      await a.svc.pullChanged();

      const index = await lastSynced(a.dir);
      assert(index[rawPath(1)].localMtime !== edited.toISOString());
      const preview = await a.svc.repairUnpushedFiles({ dryRun: true });
      assertEquals(preview.sampleUnknown, [rawPath(1)]);
    }),
});

Deno.test({
  ...opts,
  name:
    "pull: a fresh process whose first pull is models-scoped keeps last-synced and records its downloads",
  fn: () =>
    world(async (w) => {
      const a = await synced(w), b = await synced(w);
      await push(a, rawPath(1), "one");
      await b.svc.pullChanged();
      await push(a, rawPath(2), "two");

      const fresh = await w.connect(b.dir);
      await fresh.svc.pullChanged({
        context: { models: [{ modelType: "mt", modelId: "mid" }] },
      });
      const index = await lastSynced(b.dir);
      assert(index[rawPath(1)], "the prior entry stays");
      assert(index[rawPath(2)], "the downloaded entry is recorded");
      const stat = await Deno.stat(join(b.dir, rawPath(2)));
      assertEquals(index[rawPath(2)].localMtime, stat.mtime!.toISOString());
    }),
});

Deno.test({
  ...opts,
  name:
    "peer-deleted: a kept copy is recorded, never uploaded, and forgotten once the remote holds it again",
  fn: () =>
    world(async (w) => {
      const a = await synced(w), b = await synced(w);
      await push(a, rawPath(1), "keep me");
      await push(a, rawPath(2), "other");
      await b.svc.pullChanged();
      await write(b.dir, rawPath(1), "edited on b");
      await Deno.remove(join(a.dir, rawPath(1)));
      await a.svc.markDirty({ relPath: rawPath(1) });
      await a.svc.pushChanged();
      await b.svc.pullChanged();

      assertEquals((await lastSynced(b.dir))[rawPath(1)], undefined);
      assert(await exists(join(b.dir, rawPath(1))));
      const recorded = JSON.parse(
        await Deno.readTextFile(join(b.dir, PEER_DELETED)),
      );
      assertEquals(recorded.keys, [rawPath(1)]);
      assert(isInternalCacheFile(PEER_DELETED));

      const summary = await b.svc.repairUnpushedFiles();
      assertEquals(summary.uploaded, 0);
      assertEquals(summary.samplePeerDeleted, [rawPath(1)]);
      assertEquals(w.has(rawPath(1)), false);
      assertEquals(w.has(PEER_DELETED), false);

      await push(a, rawPath(1), "back again");
      await b.svc.pullChanged();
      const after = JSON.parse(
        await Deno.readTextFile(join(b.dir, PEER_DELETED)),
      );
      assertEquals(after.keys, []);
    }),
});

Deno.test({
  ...opts,
  name: "peer-deleted: a corrupt record refuses a repair and fails no sync",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await push(a, rawPath(1), "one");
      await a.svc.pullChanged();
      await write(a.dir, rawPath(2), "kept copy");
      await Deno.writeTextFile(join(a.dir, PEER_DELETED), "{ not json");

      const refused = await assertRejects(() => a.svc.repairUnpushedFiles());
      assertEquals((refused as Error).name, "RepairUnpushedRefusedError");
      assert((refused as Error).message.includes(PEER_DELETED));
      assertEquals(w.has(rawPath(2)), false);

      const peer = await synced(w);
      await push(peer, rawPath(3), "three");
      assertEquals(await a.svc.pullChanged(), 1);
    }),
});

Deno.test({
  ...opts,
  name:
    "peer-deleted: a path under a file that replaced its directory counts as gone and never fails a pull",
  fn: () =>
    world(async (w) => {
      const a = await synced(w), b = await synced(w);
      await push(a, rawPath(1), "keep me");
      await push(a, rawPath(2), "other");
      await b.svc.pullChanged();
      await write(b.dir, rawPath(1), "edited on b");
      await Deno.remove(join(a.dir, rawPath(1)));
      await a.svc.markDirty({ relPath: rawPath(1) });
      await a.svc.pushChanged();
      await b.svc.pullChanged();

      await Deno.remove(join(b.dir, "data/mt/mid/name/1"), { recursive: true });
      await Deno.writeTextFile(join(b.dir, "data/mt/mid/name/1"), "a file");
      await push(a, rawPath(3), "three");
      await b.svc.pullChanged();
      const recorded = JSON.parse(
        await Deno.readTextFile(join(b.dir, PEER_DELETED)),
      );
      assertEquals(recorded.keys, []);
    }),
});

Deno.test({
  ...opts,
  name: "last-synced: only one helper writes the index file",
  fn: async () => {
    const source = await Deno.readTextFile(
      join(import.meta.dirname!, SYNC_SOURCE),
    );
    const writes = source.match(/atomicWriteTextFile\(\s*this\.indexPath/g);
    assertEquals(
      writes?.length,
      1,
      "every write must go through writeLastSynced, which keeps the peer-deleted record",
    );
  },
});

Deno.test({
  ...opts,
  name: "migrate-index: keeps last-synced consistent with a peer's deletion",
  fn: () =>
    world(async (w) => {
      const now = new Date().toISOString();
      const entry = (rel: string, size: number): Entry => ({
        key: rel,
        size,
        lastModified: now,
      });
      const a = await w.connect();
      await write(a.dir, rawPath(1), "keep");
      await write(a.dir, rawPath(2), "gone");
      await write(
        a.dir,
        INDEX,
        JSON.stringify({
          version: 1,
          lastPulled: now,
          entries: {
            [rawPath(1)]: entry(rawPath(1), 4),
            [rawPath(2)]: entry(rawPath(2), 4),
          },
        }),
      );
      // The monolith no longer holds the second entry: a peer deleted it.
      w.put(
        INDEX,
        encode(JSON.stringify({
          version: 1,
          lastPulled: now,
          entries: { [rawPath(1)]: entry(rawPath(1), 4) },
        })),
      );
      w.put(rawPath(1), encode("keep"));

      await a.svc.migrateMonolithToShards();

      // Migrating leaves last-synced and local files alone, so nothing strands.
      assert(await exists(join(a.dir, rawPath(2))));
      assert((await lastSynced(a.dir))[rawPath(2)]);
      assertEquals(
        (await a.svc.repairUnpushedFiles({ dryRun: true })).samplePaths,
        [],
      );

      // The next pull reconciles with the shards. Hashless and never recorded
      // here, so the copy cannot be proved unchanged: it stays, and the record
      // stops a repair uploading it.
      await a.svc.pullChanged();
      assertEquals((await lastSynced(a.dir))[rawPath(2)], undefined);
      assert(await exists(join(a.dir, rawPath(2))));
      const summary = await a.svc.repairUnpushedFiles({ dryRun: true });
      assertEquals(summary.samplePaths, []);
      assertEquals(summary.samplePeerDeleted, [rawPath(2)]);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: migrate, push, migrate against the stale monolith keeps the file and the shards",
  fn: () =>
    world(async (w) => {
      const a = await w.connect();
      const now = new Date().toISOString();
      w.put(
        INDEX,
        encode(JSON.stringify({
          version: 1,
          lastPulled: now,
          entries: {
            [rawPath(1)]: { key: rawPath(1), size: 3, lastModified: now },
          },
        })),
      );
      w.put(rawPath(1), encode("one"));
      await a.svc.pullChanged();
      await a.svc.migrateMonolithToShards();
      await a.svc.pullChanged();
      await push(a, rawPath(2), "two");
      const shard = new TextDecoder().decode(w.get(SHARD));
      assert(shard.includes(rawPath(2)));

      await a.svc.migrateMonolithToShards();

      assertEquals(await Deno.readTextFile(join(a.dir, rawPath(2))), "two");
      assert((await lastSynced(a.dir))[rawPath(2)]);
      assertEquals(new TextDecoder().decode(w.get(SHARD)), shard);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a partition a concurrent writer lists during the rebuild stays listed",
  fn: () =>
    world(async (w) => {
      const a = await synced(w);
      await push(a, rawPath(1), "one");
      let raced = false;
      w.onRequest((op, key) => {
        if (op !== "put" || key !== META || raced) return;
        raced = true;
        const current = meta(w);
        w.put("_index/new.json", encode('{"version":1,"entries":{}}'));
        w.put(
          META,
          encode(JSON.stringify({
            ...current,
            partitions: [...current.partitions, "new"],
            commitSeq: current.commitSeq + 1,
          })),
        );
      });
      const rebuilt = await a.svc.migrateMonolithToShards();
      assert(raced);
      assert(rebuilt.partitions.includes("new"));
      assert(meta(w).partitions.includes("new"));
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a cache armed from a monolith pull does not skip later shard commits, here or on a peer",
  fn: () =>
    world(async (w) => {
      const now = new Date().toISOString();
      w.put(
        INDEX,
        encode(JSON.stringify({
          version: 1,
          lastPulled: now,
          entries: {
            [rawPath(1)]: { key: rawPath(1), size: 3, lastModified: now },
          },
        })),
      );
      w.put(rawPath(1), encode("one"));
      const a = await w.connect(), b = await w.connect();
      await a.svc.pullChanged();
      await b.svc.pullChanged();

      await a.svc.migrateMonolithToShards();
      const peer = await w.connect();
      await peer.svc.pullChanged();
      await push(peer, rawPath(2), "two");

      assertEquals(await a.svc.pullChanged(), 1);
      assertEquals(await Deno.readTextFile(join(a.dir, rawPath(2))), "two");
      assertEquals(await b.svc.pullChanged(), 1);
      assertEquals(await Deno.readTextFile(join(b.dir, rawPath(2))), "two");
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: seeds commitSeq past the existing value and the clock from a monolith",
  fn: () =>
    world(async (w) => {
      const a = await w.connect();
      const now = new Date().toISOString();
      w.put(
        INDEX,
        encode(JSON.stringify({
          version: 1,
          lastPulled: now,
          entries: {
            [rawPath(1)]: { key: rawPath(1), size: 3, lastModified: now },
          },
        })),
      );
      w.put(rawPath(1), encode("one"));
      const before = Date.now();
      const first = await a.svc.migrateMonolithToShards();
      assert(first.commitSeq >= before);

      const far = first.commitSeq + 1_000_000_000;
      w.put(
        META,
        encode(JSON.stringify({ ...first, commitSeq: far })),
      );
      const second = await a.svc.migrateMonolithToShards();
      assertEquals(second.commitSeq, far + 1);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: armed sidecar, deleted _meta.json: the next pull takes the slow path, and shards keep their sha256",
  fn: () =>
    world(async (w) => {
      const a = await synced(w), b = await synced(w);
      await push(a, rawPath(1), "one");
      await b.svc.pullChanged();
      await push(a, rawPath(2), "two");
      const seqBefore = meta(w).commitSeq;
      const shardBefore = new TextDecoder().decode(w.get(SHARD));

      w.del(META);
      const rebuilt = await (await w.connect()).svc.migrateMonolithToShards();

      assert(rebuilt.commitSeq > seqBefore);
      assertEquals(w.has(INDEX), false, "no monolith may appear");
      assertEquals(
        new TextDecoder().decode(w.get(SHARD)),
        shardBefore,
        "shards are the index and keep their sha256",
      );
      await b.svc.pullChanged();
      assertEquals(await Deno.readTextFile(join(b.dir, rawPath(2))), "two");
    }),
});

Deno.test({
  ...opts,
  name:
    "contamination repair: leaves v2 with a higher commitSeq, removes unlisted foreign shards, and the method still runs",
  fn: () =>
    world(async (w) => {
      const ns = "ns";
      const rel = `${ns}/${rawPath(1)}`;
      const metaKey = `${ns}/${META}`;
      const a = await w.connect();
      await a.svc.pullChanged({ namespace: ns });
      await a.svc.pullChanged({ namespace: ns });
      await write(a.dir, rel, "one");
      await a.svc.markDirty({ relPath: rel, namespace: ns });
      await a.svc.pushChanged({ namespace: ns });
      const before = meta(w, metaKey);
      const shardBefore = new TextDecoder().decode(
        w.get(`${ns}/${SHARD}`),
      );

      w.put("other/.namespace.json", encode("{}"));
      w.put(`${ns}/other/data/x/y/z/1/raw`, encode("foreign"));
      w.put(`${ns}/_index/other.json`, encode('{"version":1,"entries":{}}'));
      w.put(`${ns}/_index/inflight.json`, encode('{"version":1,"entries":{}}'));
      // A foreign partition that got listed, next to a writer's shard that is
      // written and not listed yet.
      w.put(
        metaKey,
        encode(
          JSON.stringify({
            ...before,
            partitions: [...before.partitions, "other"],
          }),
        ),
      );

      const fresh = await w.connect();
      const result = await fresh.svc.repairNamespaceContamination({
        namespace: ns,
        dryRun: false,
      });

      assert(result.deleted >= 1);
      const after = meta(w, metaKey);
      assertEquals(after.version, 2);
      assert(after.commitSeq > before.commitSeq);
      assertEquals(after.partitions, before.partitions);
      assertEquals(w.has(`${ns}/_index/other.json`), false);
      assertEquals(
        w.has(`${ns}/_index/inflight.json`),
        true,
        "a shard no meta lists may be one a writer is about to list",
      );
      assertEquals(w.has(`${ns}/${INDEX}`), false, "no monolith may appear");
      assertEquals(
        new TextDecoder().decode(w.get(`${ns}/${SHARD}`)),
        shardBefore,
      );

      const summary = await fresh.svc.repairUnpushedFiles({
        namespace: ns,
        dryRun: true,
      });
      assertEquals(summary.unpushed, 0);
    }),
});

Deno.test({
  ...opts,
  name:
    "contamination repair: a failed meta rewrite deletes nothing, and a rerun finishes",
  fn: () =>
    world(async (w) => {
      const ns = "ns";
      const rel = `${ns}/${rawPath(1)}`;
      const metaKey = `${ns}/${META}`;
      const foreign = `${ns}/other/data/x/y/z/1/raw`;
      const a = await w.connect();
      await a.svc.pullChanged({ namespace: ns });
      await a.svc.pullChanged({ namespace: ns });
      await write(a.dir, rel, "one");
      await a.svc.markDirty({ relPath: rel, namespace: ns });
      await a.svc.pushChanged({ namespace: ns });
      const before = meta(w, metaKey);
      w.put("other/.namespace.json", encode("{}"));
      w.put(foreign, encode("foreign"));

      const fresh = await w.connect();
      w.denyWrites(metaKey);
      await assertRejects(() =>
        fresh.svc.repairNamespaceContamination({ namespace: ns, dryRun: false })
      );
      assertEquals(
        w.has(foreign),
        true,
        "nothing is deleted before the rewrite",
      );
      assertEquals(meta(w, metaKey), before);

      w.denyWrites(null);
      const rerun = await fresh.svc.repairNamespaceContamination({
        namespace: ns,
        dryRun: false,
      });
      assertEquals(rerun.deleted, 1);
      assertEquals(w.has(foreign), false);
      assert(meta(w, metaKey).commitSeq > before.commitSeq);
    }),
});

Deno.test({
  ...opts,
  name:
    "contamination repair: a monolith-only remote keeps its own entries and never becomes an empty v2 index",
  fn: () =>
    world(async (w) => {
      const ns = "ns";
      const now = new Date().toISOString();
      w.put(
        `${ns}/${INDEX}`,
        encode(JSON.stringify({
          version: 1,
          lastPulled: now,
          entries: {
            [rawPath(1)]: { key: rawPath(1), size: 3, lastModified: now },
          },
        })),
      );
      w.put(`${ns}/${rawPath(1)}`, encode("one"));
      w.put("other/.namespace.json", encode("{}"));
      w.put(`${ns}/other/data/x/y/z/1/raw`, encode("foreign"));

      const a = await w.connect();
      const result = await a.svc.repairNamespaceContamination({
        namespace: ns,
        dryRun: false,
      });
      assert(result.deleted >= 1);
      assertEquals(meta(w, `${ns}/${META}`), null, "no empty v2 index");
      const rebuilt = JSON.parse(
        new TextDecoder().decode(w.get(`${ns}/${INDEX}`)),
      );
      assert(rebuilt.entries[rawPath(1)], "own entries survive");
      assertEquals(rebuilt.entries["other/data/x/y/z/1/raw"], undefined);
      assert((await lastSynced(a.dir))[rawPath(1)]);
    }),
});

Deno.test({
  ...opts,
  name:
    "repair: exact counts a hashless entry whose object vanished as unknown, not alreadyPresent",
  fn: () =>
    world(async (w) => {
      seedHashless(w, { [rawPath(1)]: "aaaa", [rawPath(2)]: "bbbb" });
      const b = await w.connect();
      await write(
        b.dir,
        INDEX,
        JSON.stringify({ version: 1, lastPulled: "", entries: {} }),
      );
      await write(b.dir, rawPath(1), "aaaa");
      w.del(rawPath(1));
      const summary = await b.svc.repairUnpushedFiles({
        dryRun: true,
        exact: true,
      });
      assertEquals(summary.sampleUnknown, [rawPath(1)]);
      assertEquals(summary.alreadyPresent, 0);
    }),
});

Deno.test({
  ...opts,
  name:
    "GcsClient: metadata round-trips through a multipart create and a metadata read",
  fn: () =>
    withGcsEmulator({}, async (gcs, state) => {
      const bytes = new Uint8Array([0, 255, 13, 10, 45, 45, 200]);
      const created = await gcs.putObjectConditional(
        "k",
        bytes,
        undefined,
        { metadata: { sha256: "abc" } },
      );
      assert(created?.generation);
      assertEquals(state.objects.get("k")?.body, bytes);
      assertEquals((await gcs.getMetadata("k")).metadata?.sha256, "abc");
      assertEquals(
        await gcs.putObjectConditional("k", bytes, undefined, {
          metadata: { sha256: "def" },
        }),
        null,
        "generation 0 refuses an object that exists",
      );
      assertEquals((await gcs.getMetadata("k")).metadata?.sha256, "abc");
    }),
});

Deno.test({
  ...opts,
  name:
    "GcsClient: a conditional put with no metadata stays a simple media upload",
  fn: async () => {
    const seen: string[] = [];
    const { handler } = createGcsEmulatorHandler();
    const server = Deno.serve(
      { port: 0, hostname: "127.0.0.1", onListen() {} },
      (req) => {
        seen.push(new URL(req.url).searchParams.get("uploadType") ?? "");
        return handler(req);
      },
    );
    try {
      const { port } = server.addr as Deno.NetAddr;
      const gcs = new GcsClient({
        bucket: "test-bucket",
        apiEndpoint: `http://127.0.0.1:${port}`,
      });
      assert(await gcs.putObjectConditional("k", encode("body")));
      assertEquals(seen.at(-1), "media");
      assertEquals((await gcs.getMetadata("k")).metadata, undefined);
    } finally {
      await server.shutdown();
    }
  },
});

Deno.test({
  ...opts,
  name:
    "GcsClient: a multipart create answered with a 409 reads as refused, and a malformed body rejects",
  fn: () =>
    withGcsEmulator({}, async (gcs, state) => {
      state.options.respondTo = () =>
        Response.json({ error: { code: 409, message: "Conflict" } }, {
          status: 409,
        });
      assertEquals(
        await gcs.putObjectConditional("k", encode("body"), undefined, {
          metadata: { sha256: "abc" },
        }),
        null,
      );
      state.options.respondTo = () => new Response("not json", { status: 200 });
      await assertRejects(() =>
        gcs.putObjectConditional("k", encode("body"), undefined, {
          metadata: { sha256: "abc" },
        })
      );
    }),
});

// The other round-trip test in this suite uses an in-memory mock, which never
// reaches the multipart client this method needs.
Deno.test({
  ...opts,
  name: "GcsCacheSyncService passes the round-trip suite over the emulator",
  fn: async () => {
    const result = await assertSyncServiceRoundTripConformance(async () => {
      const { handler } = createGcsEmulatorHandler();
      const server = Deno.serve(
        { port: 0, hostname: "127.0.0.1", onListen() {} },
        handler,
      );
      const { port } = server.addr as Deno.NetAddr;
      const gcs = new GcsClient({
        bucket: "test-bucket",
        apiEndpoint: `http://127.0.0.1:${port}`,
      });
      const connect = async () => {
        const cacheDir = await Deno.makeTempDir({ prefix: "gcsrepair-rt-" });
        return { service: new GcsCacheSyncService(gcs, cacheDir), cacheDir };
      };
      const first = await connect();
      const second = await connect();
      // A first pull of an empty bucket leaves no sidecar, so the next push
      // walks the whole cache. The repair cases need a cache that has synced
      // and is clean, which takes one pull more than the suite's warm-up. A
      // separate service, because a pull binds the namespace.
      await new GcsCacheSyncService(gcs, first.cacheDir).pullChanged();
      return {
        first,
        second,
        namespace: "conformance-ns",
        cleanup: async () => {
          await server.shutdown();
          await Deno.remove(first.cacheDir, { recursive: true });
          await Deno.remove(second.cacheDir, { recursive: true });
        },
      };
    });
    for (
      const name of [
        "repair-unpushed",
        "repair-unpushed-keeps-pending",
        "repair-unpushed-keeps-fingerprint",
        "repair-unpushed-classifies",
        "repair-unpushed-peer-deleted",
        "repair-unpushed-already-present",
      ]
    ) {
      assert(result.passed.includes(name), `${name} did not run`);
    }
  },
});

// swamp-club#4192: with no v2 _meta.json, a leftover monolith looks like a real
// v1 one, so migrate-index merges the shards in rather than overwriting them.
// assertDatastoreExportConformance does not cover migrate-index, and this adds
// nothing to the export contract, so these are direct assertions.
const OLD = "2020-01-01T00:00:00.000Z";
const OLDER = "2019-01-01T00:00:00.000Z";
const OTHER_PATH = "data/mt/other/name/1/raw";
const OTHER_SHARD = "_index/data--mt--other.json";

function entryOf(rel: string, size: number, lastModified = OLD): Entry {
  return { key: rel, size, lastModified };
}

/** A monolith listing `files`, whose objects are put under `prefix`. */
function seedMonolith(
  w: World,
  files: Record<string, string>,
  prefix = "",
): void {
  const entries: Record<string, Entry> = {};
  for (const [rel, text] of Object.entries(files)) {
    entries[rel] = entryOf(rel, text.length);
    w.put(`${prefix}${rel}`, encode(text));
  }
  w.put(
    `${prefix}${INDEX}`,
    encode(JSON.stringify({ version: 1, lastPulled: OLD, entries })),
  );
}

function seedShard(w: World, key: string, entries: Entry[]): void {
  w.put(
    key,
    encode(JSON.stringify({
      version: 1,
      entries: Object.fromEntries(entries.map((e) => [e.key, e])),
    })),
  );
}

function shardEntries(w: World, key: string): Record<string, Entry> {
  return JSON.parse(new TextDecoder().decode(w.get(key))).entries;
}

/** Migrated, then one push the monolith never saw, then `_meta.json` lost. */
async function migratedThenLostMeta(
  w: World,
  files: Record<string, string>,
  pushed: [string, string],
): Promise<Conn> {
  seedMonolith(w, files);
  const a = await w.connect();
  await a.svc.pullChanged();
  await a.svc.migrateMonolithToShards();
  await a.svc.pullChanged();
  await push(a, pushed[0], pushed[1]);
  w.del(META);
  return a;
}

Deno.test({
  ...opts,
  name: "migrate-index: no meta keeps a shard entry the stale monolith lacks",
  fn: () =>
    world(async (w) => {
      await migratedThenLostMeta(w, { [rawPath(1)]: "one" }, [
        rawPath(2),
        "two",
      ]);
      const fresh = await w.connect();
      const rebuilt = await fresh.svc.migrateMonolithToShards();
      assertEquals(Object.keys(shardEntries(w, SHARD)).sort(), [
        rawPath(1),
        rawPath(2),
      ]);
      assertEquals(rebuilt.partitions, ["data--mt--mid"]);
    }),
});

Deno.test({
  ...opts,
  name: "migrate-index: no meta keeps a partition the stale monolith never had",
  fn: () =>
    world(async (w) => {
      await migratedThenLostMeta(w, { [rawPath(1)]: "one" }, [
        OTHER_PATH,
        "other",
      ]);
      const fresh = await w.connect();
      await fresh.svc.migrateMonolithToShards();
      assertEquals(meta(w).partitions, ["data--mt--mid", "data--mt--other"]);
      assert(shardEntries(w, OTHER_SHARD)[OTHER_PATH]);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a version 1 meta keeps a partition the monolith never had",
  fn: () =>
    world(async (w) => {
      await migratedThenLostMeta(w, { [rawPath(1)]: "one" }, [
        OTHER_PATH,
        "other",
      ]);
      w.put(
        META,
        encode(JSON.stringify({ version: 1, partitions: ["data--mt--mid"] })),
      );
      const fresh = await w.connect();
      await fresh.svc.migrateMonolithToShards();
      assertEquals(meta(w).version, 2);
      assertEquals(meta(w).partitions, ["data--mt--mid", "data--mt--other"]);
    }),
});

Deno.test({
  ...opts,
  name: "migrate-index: a peer holding a shard-only entry keeps its file",
  fn: () =>
    world(async (w) => {
      seedMonolith(w, { [rawPath(1)]: "one" });
      const a = await w.connect();
      await a.svc.pullChanged();
      await a.svc.migrateMonolithToShards();
      await a.svc.pullChanged();
      await push(a, rawPath(2), "two");
      const peer = await w.connect();
      await peer.svc.pullChanged();
      await peer.svc.pullChanged();
      assertEquals(await Deno.readTextFile(join(peer.dir, rawPath(2))), "two");

      w.del(META);
      const fresh = await w.connect();
      await fresh.svc.migrateMonolithToShards();
      await peer.svc.pullChanged();

      assertEquals(await Deno.readTextFile(join(peer.dir, rawPath(2))), "two");
      assert((await lastSynced(peer.dir))[rawPath(2)]);
    }),
});

Deno.test({
  ...opts,
  name: "migrate-index: the migrating instance then pulls a shard-only entry",
  fn: () =>
    world(async (w) => {
      await migratedThenLostMeta(w, { [rawPath(1)]: "one" }, [
        rawPath(2),
        "two",
      ]);
      const fresh = await w.connect();
      await fresh.svc.migrateMonolithToShards();
      await fresh.svc.pullChanged();
      assertEquals(await Deno.readTextFile(join(fresh.dir, rawPath(2))), "two");
      assert((await lastSynced(fresh.dir))[rawPath(2)]);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: an entry updated since the monolith keeps the shard's copy",
  fn: () =>
    world(async (w) => {
      await migratedThenLostMeta(w, { [rawPath(1)]: "one" }, [
        rawPath(1),
        "longer",
      ]);
      const pushed = shardEntries(w, SHARD)[rawPath(1)];
      assert(pushed.sha256);
      const fresh = await w.connect();
      await fresh.svc.migrateMonolithToShards();
      assertEquals(shardEntries(w, SHARD)[rawPath(1)], pushed);
    }),
});

Deno.test({
  ...opts,
  name: "migrate-index: an entry deleted since the monolith stays deleted",
  fn: () =>
    world(async (w) => {
      seedMonolith(w, { [rawPath(1)]: "one", [rawPath(2)]: "two" });
      const a = await w.connect();
      await a.svc.pullChanged();
      await a.svc.migrateMonolithToShards();
      await a.svc.pullChanged();
      await Deno.remove(join(a.dir, rawPath(2)));
      await a.svc.markDirty({ relPath: rawPath(2) });
      await a.svc.pushChanged();
      assertEquals(w.has(rawPath(2)), false);

      w.del(META);
      const fresh = await w.connect();
      await fresh.svc.migrateMonolithToShards();
      assertEquals(Object.keys(shardEntries(w, SHARD)), [rawPath(1)]);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a shard left with only deleted entries is emptied, so a rebuild cannot list them",
  fn: () =>
    world(async (w) => {
      seedMonolith(w, { [rawPath(1)]: "one" });
      seedShard(w, OTHER_SHARD, [entryOf(OTHER_PATH, 5)]);
      const a = await w.connect();
      await a.svc.migrateMonolithToShards();
      assertEquals(meta(w).partitions, ["data--mt--mid"]);
      assertEquals(shardEntries(w, OTHER_SHARD), {});
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: an unreadable shard stops the migration and writes nothing",
  fn: () =>
    world(async (w) => {
      seedMonolith(w, { [rawPath(1)]: "one" });
      const corrupt = encode("<Error>not json</Error>");
      w.put(OTHER_SHARD, corrupt);
      const a = await w.connect();
      await assertRejects(
        () => a.svc.migrateMonolithToShards(),
        Error,
        "data--mt--other",
      );
      assertEquals(w.get(OTHER_SHARD), corrupt);
      assertEquals(w.has(SHARD), false);
      assertEquals(w.has(META), false);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a retried interrupted migration still takes the whole monolith",
  fn: () =>
    world(async (w) => {
      seedMonolith(w, { [rawPath(1)]: "one", [OTHER_PATH]: "other" });
      seedShard(w, SHARD, [entryOf(rawPath(1), 3)]);
      const a = await w.connect();
      const rebuilt = await a.svc.migrateMonolithToShards();
      assertEquals(rebuilt.partitions, ["data--mt--mid", "data--mt--other"]);
      assert(shardEntries(w, OTHER_SHARD)[OTHER_PATH]);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a monolith newer than the shard wins, as does one tied with it",
  fn: () =>
    world(async (w) => {
      seedMonolith(w, { [rawPath(1)]: "newer", [rawPath(2)]: "tied" });
      seedShard(w, SHARD, [
        entryOf(rawPath(1), 3, OLDER),
        entryOf(rawPath(2), 9, OLD),
      ]);
      const a = await w.connect();
      await a.svc.migrateMonolithToShards();
      const entries = shardEntries(w, SHARD);
      assertEquals(entries[rawPath(1)].size, 5);
      assertEquals(entries[rawPath(2)].size, 4);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a namespaced migration merges the shards under its prefix",
  fn: () =>
    world(async (w) => {
      const ns = "ns";
      seedMonolith(w, { [rawPath(1)]: "one" }, `${ns}/`);
      w.put(`${ns}/${rawPath(2)}`, encode("two"));
      seedShard(w, `${ns}/${SHARD}`, [entryOf(rawPath(2), 3)]);
      const a = await w.connect();
      await a.svc.migrateMonolithToShards({ namespace: ns });
      assertEquals(Object.keys(shardEntries(w, `${ns}/${SHARD}`)).sort(), [
        rawPath(1),
        rawPath(2),
      ]);
      assertEquals(w.has(META), false);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a namespaced entry whose object is only at the root stays, as a pull reads it there, even if deleted from the namespace",
  fn: () =>
    world(async (w) => {
      const ns = "ns";
      seedMonolith(w, { [rawPath(1)]: "one" }, `${ns}/`);
      w.del(`${ns}/${rawPath(1)}`);
      w.put(rawPath(1), encode("one"));
      w.put(rawPath(2), encode("two"));
      seedShard(w, `${ns}/${SHARD}`, [entryOf(rawPath(2), 3)]);
      const a = await w.connect();
      await a.svc.migrateMonolithToShards({ namespace: ns });
      assertEquals(Object.keys(shardEntries(w, `${ns}/${SHARD}`)).sort(), [
        rawPath(1),
        rawPath(2),
      ]);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a shard entry from another namespace stays out of a bound namespace's index",
  fn: () =>
    world(async (w) => {
      const ns = "ns";
      const foreign = "other/data/x/y/z/1/raw";
      w.put("other/.namespace.json", encode("{}"));
      seedMonolith(w, { [rawPath(1)]: "one" }, `${ns}/`);
      w.put(`${ns}/${foreign}`, encode("foreign"));
      seedShard(w, `${ns}/_index/other.json`, [entryOf(foreign, 7)]);
      const a = await w.connect();
      await a.svc.migrateMonolithToShards({ namespace: ns });
      assertEquals(meta(w, `${ns}/${META}`).partitions, ["data--mt--mid"]);
      assertEquals(shardEntries(w, `${ns}/_index/other.json`), {});
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a shard entry inside a namespace stays out of the root index",
  fn: () =>
    world(async (w) => {
      const foreign = `ns/${rawPath(1)}`;
      w.put("ns/.namespace.json", encode("{}"));
      seedMonolith(w, { [rawPath(1)]: "one" });
      w.put(foreign, encode("foreign"));
      seedShard(w, "_index/ns.json", [entryOf(foreign, 7)]);
      const a = await w.connect();
      await a.svc.migrateMonolithToShards();
      assertEquals(meta(w).partitions, ["data--mt--mid"]);
      assertEquals(shardEntries(w, "_index/ns.json"), {});
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: a sibling namespace named like a layout dir does not hide a shard-only entry",
  fn: () =>
    world(async (w) => {
      const ns = "prod";
      w.put("logs/.namespace.json", encode("{}"));
      seedMonolith(w, { [rawPath(1)]: "one" }, `${ns}/`);
      w.put(`${ns}/logs/app.log`, encode("log"));
      seedShard(w, `${ns}/_index/logs.json`, [entryOf("logs/app.log", 3)]);
      const a = await w.connect();
      await a.svc.migrateMonolithToShards({ namespace: ns });
      assertEquals(meta(w, `${ns}/${META}`).partitions, [
        "data--mt--mid",
        "logs",
      ]);
      assert(shardEntries(w, `${ns}/_index/logs.json`)["logs/app.log"]);
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: an internal file from a shard stays out when the monolith also held a zombie",
  fn: () =>
    world(async (w) => {
      seedMonolith(w, { [rawPath(1)]: "one", "_catalog.db": "zombie" });
      w.put("_catalog.db-wal", encode("w"));
      seedShard(w, "_index/_root.json", [entryOf("_catalog.db-wal", 1)]);
      const a = await w.connect();
      await a.svc.migrateMonolithToShards();
      assertEquals(meta(w).partitions, ["data--mt--mid"]);
      assertEquals(shardEntries(w, "_index/_root.json"), {});
    }),
});

Deno.test({
  ...opts,
  name:
    "migrate-index: when every entry is gone, the shards are emptied before the rebuild from the listing",
  fn: () =>
    world(async (w) => {
      seedMonolith(w, { [rawPath(1)]: "one" });
      w.del(rawPath(1));
      seedShard(w, SHARD, [entryOf(rawPath(2), 3)]);
      const a = await w.connect();
      await a.svc.migrateMonolithToShards();
      assertEquals(meta(w).version, 2);
      assertEquals(shardEntries(w, SHARD), {});
    }),
});
