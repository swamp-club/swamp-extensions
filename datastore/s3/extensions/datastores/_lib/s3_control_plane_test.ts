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

// The datastore-wide control plane (swamp-club#3395). Core reads the format
// marker through it before every command once the provider offers it, in
// place of a fresh sync service's controlPlaneStore(), so its reads must
// match that path: the same bytes, null only for a missing record, and a
// rejection for anything else.
//
// sanitizeResources: false throughout: the AWS SDK's keep-alive connection
// pool outlives each test body.

import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { S3DatastoreControlPlaneStore } from "./s3_control_plane.ts";
import { type S3Client, S3OperationError } from "./s3_client.ts";
import { S3CacheSyncService } from "./s3_cache_sync.ts";
import { withS3Emulator } from "./s3_emulator_test_util.ts";

const MARKER = "datastore-format";

Deno.test({
  name: "get: same bytes as a never-pulled sync service reads",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (s3, state) => {
      const bytes = new TextEncoder().encode('{"format":3}');
      state.objects.set(`_control/${MARKER}`, {
        body: bytes,
        etag: "e1",
        lastModified: new Date(),
      });
      const cacheDir = await Deno.makeTempDir({ prefix: "s3-cp-parity-" });
      try {
        const viaSync = await new S3CacheSyncService(s3, cacheDir)
          .controlPlaneStore().get(MARKER);
        const viaStore = await new S3DatastoreControlPlaneStore(s3).get(MARKER);
        assertEquals(viaStore, bytes);
        assertEquals(viaStore, viaSync);
      } finally {
        await Deno.remove(cacheDir, { recursive: true });
      }
    });
  },
});

Deno.test({
  name: "get: one request and no HeadBucket preflight",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (s3, state) => {
      state.objects.set(`_control/${MARKER}`, {
        body: new Uint8Array([1]),
        etag: "e1",
      });
      await new S3DatastoreControlPlaneStore(s3).get(MARKER);
      assertEquals(
        state.requests.map((r) => `${r.method} ${r.key}`),
        [`GET _control/${MARKER}`],
      );
    });
  },
});

Deno.test({
  name: "get: a missing record is null",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (s3) => {
      assertEquals(
        await new S3DatastoreControlPlaneStore(s3).get(MARKER),
        null,
      );
    });
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
        await new S3DatastoreControlPlaneStore(s3).get(MARKER),
        null,
      );
    });
  },
});

Deno.test({
  name: "get: a missing bucket rejects instead of reading as absent",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({ missingBucket: true }, async (s3) => {
      await assertRejects(() =>
        new S3DatastoreControlPlaneStore(s3).get(MARKER)
      );
    });
  },
});

Deno.test({
  name: "get: a 403 rejects with the status, not null",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({
      respondTo: () =>
        new Response("<html>Forbidden</html>", {
          status: 403,
          headers: { "content-type": "text/html" },
        }),
    }, async (s3) => {
      const error = await assertRejects(() =>
        new S3DatastoreControlPlaneStore(s3).get(MARKER)
      );
      assertStringIncludes((error as Error).message, "HTTP 403");
    });
  },
});

Deno.test({
  name: "get: an aborted signal rejects before any request",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (s3, state) => {
      const controller = new AbortController();
      controller.abort();
      await assertRejects(() =>
        new S3DatastoreControlPlaneStore(s3).get(MARKER, {
          signal: controller.signal,
        })
      );
      assertEquals(state.requests.length, 0);
    });
  },
});

Deno.test({
  name: "get: an abort during retry backoff rejects promptly",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({
      respondTo: () => new Response(null, { status: 503 }),
    }, async (s3) => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 100);
      const started = Date.now();
      await assertRejects(() =>
        new S3DatastoreControlPlaneStore(s3).get(MARKER, {
          signal: controller.signal,
        })
      );
      // Without the abort, the backoff alone is 500 ms then 1.5 s.
      const elapsed = Date.now() - started;
      if (elapsed > 1000) throw new Error(`abort took ${elapsed} ms`);
    });
  },
});

Deno.test({
  name: "put, putIfAbsent, list and delete stay at the root _control/",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (s3, state) => {
      const store = new S3DatastoreControlPlaneStore(s3);
      await store.put("writer/lease", new Uint8Array([1]));
      assertEquals(
        await store.putIfAbsent("writer/fence", new Uint8Array([2])),
        true,
      );
      assertEquals(
        await store.putIfAbsent("writer/fence", new Uint8Array([3])),
        false,
      );
      assertEquals(
        [...state.objects.keys()].sort(),
        ["_control/writer/fence", "_control/writer/lease"],
      );
      assertEquals(
        (await store.list("writer/")).sort(),
        ["writer/fence", "writer/lease"],
      );
      await store.delete("writer/lease");
      await store.delete("writer/lease");
      assertEquals(await store.list("writer/"), ["writer/fence"]);
    });
  },
});

/**
 * A client whose first conditional create commits but loses its answer (a
 * 5xx), so the retry is refused because the record now exists. `existing`
 * is what the record already held before the call, if anything.
 */
function lostResponseClient(existing?: Uint8Array) {
  let stored = existing;
  let attempts = 0;
  const client = {
    putObjectConditional: (_key: string, data: Uint8Array) => {
      attempts++;
      if (stored) return Promise.resolve(false);
      if (attempts === 1) {
        stored = data;
        return Promise.reject(
          new S3OperationError("S3 putObjectConditional failed HTTP 500", {
            name: "InternalError",
            cause: undefined,
            httpStatusCode: 500,
            code: "InternalError",
            requestId: undefined,
            bodyPreview: undefined,
          }),
        );
      }
      return Promise.resolve(true);
    },
    getObject: () => Promise.resolve({ data: stored ?? new Uint8Array() }),
  } as unknown as S3Client;
  return { client, attempts: () => attempts };
}

Deno.test("putIfAbsent: a create whose answer was lost still counts as won", async () => {
  const { client, attempts } = lostResponseClient();
  const store = new S3DatastoreControlPlaneStore(client);
  assertEquals(
    await store.putIfAbsent("writer/fence", new Uint8Array([7])),
    true,
  );
  assertEquals(attempts(), 2);
});

Deno.test("putIfAbsent: another writer's record is still a refusal", async () => {
  const { client } = lostResponseClient(new Uint8Array([9]));
  const store = new S3DatastoreControlPlaneStore(client);
  assertEquals(
    await store.putIfAbsent("writer/fence", new Uint8Array([7])),
    false,
  );
});
