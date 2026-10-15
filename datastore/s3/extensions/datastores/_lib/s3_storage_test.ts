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
// failing responses, and input validation. All run against the in-process S3
// emulator.
//
// sanitizeResources: false throughout: the AWS SDK's keep-alive connection
// pool outlives each test body.

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import {
  LIST_THRESHOLD,
  MAX_CHUNK_BYTES,
  S3ChunkStorage,
} from "./s3_storage.ts";
import {
  type S3EmulatorState,
  withS3Emulator,
} from "./s3_emulator_test_util.ts";

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
function seed(state: S3EmulatorState, hashes: readonly string[]): void {
  for (const sha256 of hashes) {
    state.objects.set(chunkKey(sha256), {
      body: new TextEncoder().encode(sha256),
      etag: sha256.slice(0, 32),
      lastModified: new Date(),
    });
  }
}

function counts(state: S3EmulatorState) {
  return {
    head: state.requests.filter((r) => r.method === "HEAD").length,
    list: state.requests.filter((r) => r.listPrefix !== null).length,
    copy: state.requests.filter((r) => r.copySource !== null).length,
    upload:
      state.requests.filter((r) => r.method === "PUT" && r.copySource === null)
        .length,
    other:
      state.requests.filter((r) =>
        r.method !== "HEAD" && r.listPrefix === null && r.method !== "PUT"
      ).length,
  };
}

Deno.test({
  name: "capabilities: 16 MiB chunks, touch supported",
  fn: async () => {
    await withS3Emulator({}, (s3) => {
      const storage = new S3ChunkStorage(s3);
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
  name: "put: an abort mid-upload leaves no object and no multipart upload",
  sanitizeResources: false,
  fn: async () => {
    let arrived!: () => void;
    const arrival = new Promise<void>((r) => arrived = r);
    let release!: () => void;
    const held = new Promise<void>((r) => release = r);
    await withS3Emulator({
      holdPut: () => {
        arrived();
        return held;
      },
    }, async (s3, state) => {
      const storage = new S3ChunkStorage(s3);
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
      release();
      // Let the emulator finish the request it was holding.
      await new Promise((r) => setTimeout(r, 50));
      assertEquals(state.objects.has(chunkKey(sha256)), false);
      // One PutObject was attempted, and nothing else: no
      // CreateMultipartUpload (POST ?uploads) and no UploadPart.
      assertEquals(
        state.requests.filter((r) => r.method === "POST").length,
        0,
      );
      assertEquals(
        state.requests.filter((r) => r.method === "PUT").length,
        1,
      );
    });
  },
});

Deno.test({
  name:
    "has: 10 sparse hashes cost 10 HEADs, plus one listing to confirm the bucket for the misses",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (s3, state) => {
      const hashes = sparseHashes(10);
      seed(state, hashes.slice(0, 5));
      state.requests.length = 0;
      const found = await new S3ChunkStorage(s3).has(NS, hashes, never());
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
    await withS3Emulator({}, async (s3, state) => {
      const hashes = sparseHashes(1000);
      seed(state, hashes);
      state.requests.length = 0;
      const found = await new S3ChunkStorage(s3).has(NS, hashes, never());
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
    await withS3Emulator({}, async (s3, state) => {
      const hashes = [
        ...Array.from({ length: 500 }, (_, i) => hashIn("0a", i)),
        ...Array.from({ length: 500 }, (_, i) => hashIn("0b", i)),
      ];
      seed(state, hashes.filter((_, i) => i % 2 === 0));
      state.requests.length = 0;
      const found = await new S3ChunkStorage(s3).has(NS, hashes, never());
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
    await withS3Emulator({}, async (s3, state) => {
      const storage = new S3ChunkStorage(s3);
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
    await withS3Emulator({ maxKeys: 5 }, async (s3, state) => {
      const hashes = Array.from({ length: 13 }, (_, i) => hashIn("ef", i));
      seed(state, hashes);
      state.requests.length = 0;
      const found = await new S3ChunkStorage(s3).has(NS, hashes, never());
      assertEquals(found.size, 13);
      assertEquals(counts(state).list, 3);
    });
  },
});

Deno.test({
  name: "touch: one copy per chunk, no upload, missing ones returned",
  sanitizeResources: false,
  fn: async () => {
    for (const size of [10, 1000]) {
      await withS3Emulator({}, async (s3, state) => {
        const hashes = sparseHashes(size);
        const missing = hashes.slice(0, 3);
        seed(state, hashes.slice(3));
        const before = new Date(0);
        for (const sha256 of hashes.slice(3)) {
          state.objects.get(chunkKey(sha256))!.lastModified = before;
        }
        state.requests.length = 0;
        const result = await new S3ChunkStorage(s3).touch(
          NS,
          hashes,
          never(),
        );
        assertEquals(result, new Set(missing));
        // CopyObject names a missing source NoSuchKey, which needs no
        // listing to confirm.
        assertEquals(counts(state), {
          head: 0,
          list: 0,
          copy: size,
          upload: 0,
          other: 0,
        });
        for (const sha256 of hashes.slice(3)) {
          const object = state.objects.get(chunkKey(sha256))!;
          assert(object.lastModified!.getTime() > before.getTime());
          assertEquals(new TextDecoder().decode(object.body), sha256);
        }
      });
    }
  },
});

Deno.test({
  name: "get: a 404 with a non-XML body is null once the bucket is confirmed",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({
      respondTo: (method) =>
        method === "GET"
          ? new Response("not found", {
            status: 404,
            headers: { "content-type": "text/plain" },
          })
          : undefined,
    }, async (s3) => {
      assertEquals(
        await new S3ChunkStorage(s3).get(NS, hashIn("01", 1), never()),
        null,
      );
    });
  },
});

Deno.test({
  name: "get, has and touch reject, not report missing, without a bucket",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({ missingBucket: true }, async (s3) => {
      const storage = new S3ChunkStorage(s3);
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
    await withS3Emulator({
      respondTo: () =>
        new Response("<html><body>Forbidden</body></html>", {
          status: 403,
          headers: { "content-type": "text/html" },
        }),
    }, async (s3) => {
      const storage = new S3ChunkStorage(s3);
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
    await withS3Emulator({
      respondTo: (method) =>
        method === "HEAD" ? new Response(null, { status: 500 }) : undefined,
    }, async (s3) => {
      await assertRejects(() =>
        new S3ChunkStorage(s3).has(NS, [hashIn("04", 1)], never())
      );
    });
  },
});

Deno.test({
  name: "every method rejects a bad namespace or hash without a request",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (s3, state) => {
      const storage = new S3ChunkStorage(s3);
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
    await withS3Emulator({}, async (s3, state) => {
      const good = hashIn("06", 1);
      seed(state, [good]);
      const body = {
        body: new Uint8Array(),
        etag: "e",
        lastModified: new Date(),
      };
      state.objects.set(`_blobs/${NS}/sha256/07/${good}`, body);
      state.objects.set(`_blobs/${NS}/sha256/06/not-a-hash`, body);
      state.objects.set(`_blobs/${NS}/sha256/stray`, body);
      const listed = await Array.fromAsync(
        new S3ChunkStorage(s3).list(NS, never()),
      );
      assertEquals(listed.map((c) => c.sha256), [good]);
    });
  },
});

Deno.test({
  name: "touch stops sending requests once one fails",
  sanitizeResources: false,
  fn: async () => {
    const hashes = sparseHashes(1000);
    await withS3Emulator({
      respondTo: (method, key) =>
        method === "PUT" && key === chunkKey(hashes[2])
          ? new Response("<Error><Code>AccessDenied</Code></Error>", {
            status: 403,
            headers: { "content-type": "application/xml" },
          })
          : undefined,
    }, async (s3, state) => {
      seed(state, hashes);
      state.requests.length = 0;
      await assertRejects(() =>
        new S3ChunkStorage(s3).touch(NS, hashes, never())
      );
      // Give workers that kept going time to show it, then count: only what
      // was already in flight finishes; the rest never goes out.
      await new Promise((r) => setTimeout(r, 500));
      assert(
        counts(state).copy < 100,
        `${counts(state).copy} copies after the failure`,
      );
    });
  },
});

Deno.test({
  name: "touch finds a chunk whose namespace needs URL-encoding",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (s3, state) => {
      const storage = new S3ChunkStorage(s3);
      const ns = "team%20a+b";
      const sha256 = hashIn("0d", 1);
      await storage.put(ns, sha256, new Uint8Array([1]), never());
      state.requests.length = 0;
      assertEquals(await storage.touch(ns, [sha256], never()), new Set());
      assertEquals(counts(state).copy, 1);
    });
  },
});
