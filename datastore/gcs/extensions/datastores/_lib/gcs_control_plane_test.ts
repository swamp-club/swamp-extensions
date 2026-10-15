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
// sanitizeResources: false throughout: fetch()'s pooled connections outlive
// the test body.

import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { GcsDatastoreControlPlaneStore } from "./gcs_control_plane.ts";
import { type GcsClient, GcsOperationError } from "./gcs_client.ts";
import { GcsCacheSyncService } from "./gcs_cache_sync.ts";
import { withGcsEmulator } from "./gcs_emulator_test_util.ts";

const MARKER = "datastore-format";

Deno.test({
  name: "get: same bytes as a never-pulled sync service reads",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (gcs, state) => {
      const bytes = new TextEncoder().encode('{"format":3}');
      state.objects.set(`_control/${MARKER}`, {
        body: bytes,
        generation: 1,
        updated: new Date(),
      });
      const cacheDir = await Deno.makeTempDir({ prefix: "gcs-cp-parity-" });
      try {
        const viaSync = await new GcsCacheSyncService(gcs, cacheDir)
          .controlPlaneStore().get(MARKER);
        const viaStore = await new GcsDatastoreControlPlaneStore(gcs).get(
          MARKER,
        );
        assertEquals(viaStore, bytes);
        assertEquals(viaStore, viaSync);
      } finally {
        await Deno.remove(cacheDir, { recursive: true });
      }
    });
  },
});

Deno.test({
  name: "get: one request and no credentials preflight",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (gcs, state) => {
      state.objects.set(`_control/${MARKER}`, {
        body: new Uint8Array([1]),
        generation: 1,
        updated: new Date(),
      });
      await new GcsDatastoreControlPlaneStore(gcs).get(MARKER);
      assertEquals(
        state.requests.map((r) => `${r.kind} ${r.name}`),
        [`media _control/${MARKER}`],
      );
    });
  },
});

Deno.test({
  name: "get: a missing record is null",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (gcs) => {
      assertEquals(
        await new GcsDatastoreControlPlaneStore(gcs).get(MARKER),
        null,
      );
    });
  },
});

Deno.test({
  name: "get: a 404 with a non-JSON body is null once the bucket is confirmed",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({
      respondTo: (method, name) =>
        method === "GET" && name.startsWith("_control/")
          ? new Response("not found", {
            status: 404,
            headers: { "content-type": "text/plain" },
          })
          : undefined,
    }, async (gcs) => {
      assertEquals(
        await new GcsDatastoreControlPlaneStore(gcs).get(MARKER),
        null,
      );
    });
  },
});

Deno.test({
  name: "get: a missing bucket rejects instead of reading as absent",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({ missingBucket: true }, async (gcs) => {
      await assertRejects(() =>
        new GcsDatastoreControlPlaneStore(gcs).get(MARKER)
      );
    });
  },
});

Deno.test({
  name: "get: a 403 rejects with the status, not null",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({
      respondTo: () =>
        new Response("<html>Forbidden</html>", {
          status: 403,
          headers: { "content-type": "text/html" },
        }),
    }, async (gcs) => {
      const error = await assertRejects(() =>
        new GcsDatastoreControlPlaneStore(gcs).get(MARKER)
      );
      assertStringIncludes((error as Error).message, "HTTP 403");
    });
  },
});

Deno.test({
  name: "get: an aborted signal rejects before any request",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (gcs, state) => {
      const controller = new AbortController();
      controller.abort();
      await assertRejects(() =>
        new GcsDatastoreControlPlaneStore(gcs).get(MARKER, {
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
    await withGcsEmulator({
      respondTo: () => new Response(null, { status: 503 }),
    }, async (gcs) => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 100);
      const started = Date.now();
      await assertRejects(() =>
        new GcsDatastoreControlPlaneStore(gcs).get(MARKER, {
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
    await withGcsEmulator({}, async (gcs, state) => {
      const store = new GcsDatastoreControlPlaneStore(gcs);
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
      if (stored) return Promise.resolve(null);
      if (attempts === 1) {
        stored = data;
        return Promise.reject(
          new GcsOperationError("GCS putObjectConditional failed HTTP 500", {
            name: "GcsOperationError",
            httpStatusCode: 500,
            code: undefined,
            bodyPreview: undefined,
            uploadId: undefined,
          }),
        );
      }
      return Promise.resolve({ generation: "1" });
    },
    getObject: () => Promise.resolve({ data: stored ?? new Uint8Array() }),
  } as unknown as GcsClient;
  return { client, attempts: () => attempts };
}

Deno.test("putIfAbsent: a create whose answer was lost still counts as won", async () => {
  const { client, attempts } = lostResponseClient();
  const store = new GcsDatastoreControlPlaneStore(client);
  assertEquals(
    await store.putIfAbsent("writer/fence", new Uint8Array([7])),
    true,
  );
  assertEquals(attempts(), 2);
});

Deno.test("putIfAbsent: another writer's record is still a refusal", async () => {
  const { client } = lostResponseClient(new Uint8Array([9]));
  const store = new GcsDatastoreControlPlaneStore(client);
  assertEquals(
    await store.putIfAbsent("writer/fence", new Uint8Array([7])),
    false,
  );
});
