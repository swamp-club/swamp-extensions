// Copyright (C) 2026 Elder Swamp Club, Inc.
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

// Contract cases the storage/1 conformance suite does not cover (swamp-club
// #3492): aborts mid-upload, request counts for has and touch, malformed and
// failing responses, and input validation. All run against the in-process GCS
// emulator.
//
// sanitizeResources: false throughout: fetch()'s pooled connections outlive
// the test body.

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import {
  GcsChunkStorage,
  LIST_THRESHOLD,
  MAX_CHUNK_BYTES,
} from "./gcs_storage.ts";
import {
  type GcsEmulatorState,
  withGcsEmulator,
} from "./gcs_emulator_test_util.ts";

const NS = "test-ns";
const never = () => new AbortController().signal;

/** A well-formed hash in the given shard, unique by `n`. */
function hashIn(shard: string, n: number): string {
  return shard + n.toString(16).padStart(62, "0");
}

/** `count` hashes spread evenly over all 256 shards: at most 4 per shard. */
function sparseHashes(count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => hashIn((i % 256).toString(16).padStart(2, "0"), i),
  );
}

function chunkKey(sha256: string): string {
  return `_blobs/${NS}/sha256/${sha256.slice(0, 2)}/${sha256}`;
}

/** Stores chunks straight into the emulator, without a request. */
function seed(state: GcsEmulatorState, hashes: readonly string[]): void {
  for (const sha256 of hashes) {
    state.objects.set(chunkKey(sha256), {
      body: new TextEncoder().encode(sha256),
      generation: 1,
      updated: new Date(),
    });
  }
}

function counts(state: GcsEmulatorState) {
  const of = (kind: string) =>
    state.requests.filter((r) => r.kind === kind).length;
  return {
    head: of("metadata"),
    list: of("list"),
    copy: of("rewrite"),
    upload: of("upload"),
    other: of("media") + of("delete") + of("bucket"),
  };
}

Deno.test({
  name: "capabilities: 16 MiB chunks, touch supported",
  fn: async () => {
    await withGcsEmulator({}, (gcs) => {
      const storage = new GcsChunkStorage(gcs);
      assertEquals(storage.capabilities(), {
        maxChunkBytes: 16 * 1024 * 1024,
        touch: true,
      });
      assertEquals(MAX_CHUNK_BYTES, 16 * 1024 * 1024);
      assertEquals(LIST_THRESHOLD, 13);
      return Promise.resolve();
    });
  },
  sanitizeResources: false,
});

Deno.test({
  name: "put: an abort mid-upload leaves no object and no resumable session",
  sanitizeResources: false,
  fn: async () => {
    let arrived!: () => void;
    const arrival = new Promise<void>((r) => arrived = r);
    let release!: () => void;
    const held = new Promise<void>((r) => release = r);
    await withGcsEmulator({
      holdUpload: () => {
        arrived();
        return held;
      },
    }, async (gcs, state) => {
      const storage = new GcsChunkStorage(gcs);
      const sha256 = hashIn("ab", 1);
      const controller = new AbortController();
      const put = storage.put(
        NS,
        sha256,
        new Uint8Array(MAX_CHUNK_BYTES),
        controller.signal,
      );
      await arrival;
      controller.abort();
      await assertRejects(() => put);
      // Give the emulator time to see the connection close before the held
      // request resumes: where the loopback buffers the whole body (Windows),
      // it would otherwise read the complete upload and commit it.
      await new Promise((r) => setTimeout(r, 50));
      release();
      // Let the emulator finish the request it was holding.
      await new Promise((r) => setTimeout(r, 50));
      assertEquals(state.objects.has(chunkKey(sha256)), false);
      // One simple upload was attempted, and nothing else: the emulator
      // refuses any upload that is not uploadType=media, so no resumable
      // session was opened.
      assertEquals(
        state.requests.map((r) => `${r.kind} ${r.status}`),
        ["upload 499"],
      );
    });
  },
});

Deno.test({
  name:
    "has: 10 sparse hashes cost 10 HEADs, plus one listing to confirm the bucket for the misses",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (gcs, state) => {
      const hashes = sparseHashes(10);
      seed(state, hashes.slice(0, 5));
      state.requests.length = 0;
      const found = await new GcsChunkStorage(gcs).has(NS, hashes, never());
      assertEquals(found, new Set(hashes.slice(0, 5)));
      // Five misses also cost the one listing that confirms the bucket.
      assertEquals(counts(state), {
        head: 10,
        list: 1,
        copy: 0,
        upload: 0,
        other: 0,
      });
    });
  },
});

Deno.test({
  name: "has: 1,000 sparse hashes (at most 4 per shard) cost 1,000 HEADs",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (gcs, state) => {
      const hashes = sparseHashes(1000);
      seed(state, hashes);
      state.requests.length = 0;
      const found = await new GcsChunkStorage(gcs).has(NS, hashes, never());
      assertEquals(found.size, 1000);
      assertEquals(counts(state), {
        head: 1000,
        list: 0,
        copy: 0,
        upload: 0,
        other: 0,
      });
    });
  },
});

Deno.test({
  name: "has: 1,000 hashes in 2 shards cost 2 listings and no HEAD",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (gcs, state) => {
      const hashes = [
        ...Array.from({ length: 500 }, (_, i) => hashIn("0a", i)),
        ...Array.from({ length: 500 }, (_, i) => hashIn("0b", i)),
      ];
      seed(state, hashes.filter((_, i) => i % 2 === 0));
      state.requests.length = 0;
      const found = await new GcsChunkStorage(gcs).has(NS, hashes, never());
      assertEquals(found, new Set(hashes.filter((_, i) => i % 2 === 0)));
      assertEquals(counts(state), {
        head: 0,
        list: 2,
        copy: 0,
        upload: 0,
        other: 0,
      });
    });
  },
});

Deno.test({
  name: "has: a shard is listed from 13 hashes in it, HEADed at 12",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (gcs, state) => {
      const storage = new GcsChunkStorage(gcs);
      const thirteen = Array.from({ length: 13 }, (_, i) => hashIn("cd", i));
      seed(state, thirteen);

      state.requests.length = 0;
      await storage.has(NS, thirteen.slice(0, 12), never());
      assertEquals(counts(state).head, 12);
      assertEquals(counts(state).list, 0);

      state.requests.length = 0;
      await storage.has(NS, thirteen, never());
      assertEquals(counts(state).head, 0);
      assertEquals(counts(state).list, 1);
    });
  },
});

Deno.test({
  name: "has: a listed shard is read page by page",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({ maxResults: 5 }, async (gcs, state) => {
      const hashes = Array.from({ length: 13 }, (_, i) => hashIn("ef", i));
      seed(state, hashes);
      state.requests.length = 0;
      const found = await new GcsChunkStorage(gcs).has(NS, hashes, never());
      assertEquals(found.size, 13);
      assertEquals(counts(state).list, 3);
    });
  },
});

Deno.test({
  name: "touch: one rewrite per chunk, no upload, missing ones returned",
  sanitizeResources: false,
  fn: async () => {
    for (const size of [10, 1000]) {
      await withGcsEmulator({}, async (gcs, state) => {
        const hashes = sparseHashes(size);
        const missing = hashes.slice(0, 3);
        seed(state, hashes.slice(3));
        const before = new Date(0);
        for (const sha256 of hashes.slice(3)) {
          state.objects.get(chunkKey(sha256))!.updated = before;
        }
        state.requests.length = 0;
        const result = await new GcsChunkStorage(gcs).touch(
          NS,
          hashes,
          never(),
        );
        assertEquals(result, new Set(missing));
        // GCS answers 404 for a missing bucket too, so the misses cost the
        // one listing that confirms the bucket.
        assertEquals(counts(state), {
          head: 0,
          list: 1,
          copy: size,
          upload: 0,
          other: 0,
        });
        for (const sha256 of hashes.slice(3)) {
          const object = state.objects.get(chunkKey(sha256))!;
          assert(object.updated.getTime() > before.getTime());
          assertEquals(new TextDecoder().decode(object.body), sha256);
        }
      });
    }
  },
});

Deno.test({
  name: "get: a 404 with a non-JSON body is null once the bucket is confirmed",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({
      respondTo: (method, name) =>
        method === "GET" && name.startsWith("_blobs/")
          ? new Response("not found", {
            status: 404,
            headers: { "content-type": "text/plain" },
          })
          : undefined,
    }, async (gcs) => {
      assertEquals(
        await new GcsChunkStorage(gcs).get(NS, hashIn("01", 1), never()),
        null,
      );
    });
  },
});

Deno.test({
  name: "get, has and touch reject, not report missing, without a bucket",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({ missingBucket: true }, async (gcs) => {
      const storage = new GcsChunkStorage(gcs);
      const sha256 = hashIn("02", 1);
      await assertRejects(() => storage.get(NS, sha256, never()));
      await assertRejects(() => storage.has(NS, [sha256], never()));
      await assertRejects(() => storage.touch(NS, [sha256], never()));
    });
  },
});

Deno.test({
  name: "get, has and touch reject on a 403 with an HTML body",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({
      respondTo: () =>
        new Response("<html><body>Forbidden</body></html>", {
          status: 403,
          headers: { "content-type": "text/html" },
        }),
    }, async (gcs) => {
      const storage = new GcsChunkStorage(gcs);
      const sha256 = hashIn("03", 1);
      const error = await assertRejects(() => storage.get(NS, sha256, never()));
      assertStringIncludes((error as Error).message, "HTTP 403");
      await assertRejects(() => storage.has(NS, [sha256], never()));
      await assertRejects(() => storage.touch(NS, [sha256], never()));
    });
  },
});

Deno.test({
  name: "has rejects on a 500, after retrying",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({
      respondTo: (method) =>
        method === "GET" ? new Response(null, { status: 500 }) : undefined,
    }, async (gcs) => {
      await assertRejects(() =>
        new GcsChunkStorage(gcs).has(NS, [hashIn("04", 1)], never())
      );
    });
  },
});

Deno.test({
  name: "every method rejects a bad namespace or hash without a request",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (gcs, state) => {
      const storage = new GcsChunkStorage(gcs);
      const good = hashIn("af", 0xabcdef);
      for (const ns of ["", ".", "..", "a/b", "a\\b"]) {
        await assertRejects(() => storage.get(ns, good, never()));
        await assertRejects(() => storage.has(ns, [good], never()));
      }
      for (
        const sha256 of [good.toUpperCase(), good.slice(1), "x".repeat(64)]
      ) {
        await assertRejects(() => storage.get(NS, sha256, never()));
        await assertRejects(() =>
          storage.put(NS, sha256, new Uint8Array(), never())
        );
        await assertRejects(() => storage.touch(NS, [sha256], never()));
        await assertRejects(() => storage.delete(NS, sha256, never()));
      }
      assertEquals(state.requests.length, 0);
    });
  },
});

Deno.test({
  name: "list skips keys that are not a chunk in its own shard",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (gcs, state) => {
      const good = hashIn("06", 1);
      seed(state, [good]);
      const body = {
        body: new Uint8Array(),
        generation: 1,
        updated: new Date(),
      };
      state.objects.set(`_blobs/${NS}/sha256/07/${good}`, body);
      state.objects.set(`_blobs/${NS}/sha256/06/not-a-hash`, body);
      state.objects.set(`_blobs/${NS}/sha256/stray`, body);
      const listed = await Array.fromAsync(
        new GcsChunkStorage(gcs).list(NS, never()),
      );
      assertEquals(listed.map((c) => c.sha256), [good]);
    });
  },
});

Deno.test({
  name: "touch follows rewriteToken until a multi-call rewrite is done",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({ rewriteCalls: 3 }, async (gcs, state) => {
      const sha256 = hashIn("0c", 1);
      seed(state, [sha256]);
      state.objects.get(chunkKey(sha256))!.updated = new Date(0);
      state.requests.length = 0;
      const missing = await new GcsChunkStorage(gcs).touch(
        NS,
        [sha256],
        never(),
      );
      assertEquals(missing.size, 0);
      assertEquals(counts(state).copy, 3);
      assert(state.objects.get(chunkKey(sha256))!.updated.getTime() > 0);
    });
  },
});

Deno.test({
  name: "touch stops sending requests once one fails",
  sanitizeResources: false,
  fn: async () => {
    const hashes = sparseHashes(1000);
    await withGcsEmulator({
      respondTo: (method, name) =>
        method === "POST" && name === chunkKey(hashes[2])
          ? new Response(JSON.stringify({ error: { code: 403 } }), {
            status: 403,
            headers: { "content-type": "application/json" },
          })
          : undefined,
    }, async (gcs, state) => {
      seed(state, hashes);
      state.requests.length = 0;
      await assertRejects(() =>
        new GcsChunkStorage(gcs).touch(NS, hashes, never())
      );
      // Give workers that kept going time to show it, then count: only what
      // was already in flight finishes; the rest never goes out.
      await new Promise((r) => setTimeout(r, 500));
      assert(
        counts(state).copy < 100,
        `${counts(state).copy} rewrites after the failure`,
      );
    });
  },
});
