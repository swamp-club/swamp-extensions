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

import { join } from "jsr:@std/path@1";
import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  assertDatastoreExportConformance,
  assertVerifierConformance,
} from "@systeminit/swamp-testing";
import {
  assertReplicaPathConformance,
  assertReplicaTargetConformance,
  assertStorageConformance,
  assertWritableDatastoreControlPlaneStoreConformance,
  type DatastoreStorage as ConformanceDatastoreStorage,
  type DatastoreSyncService as ConformanceDatastoreSyncService,
  replicaTargetProblem,
  type WritableDatastoreControlPlaneStore as ConformanceWritableStore,
} from "@swamp-club/swamp-testing";
import type { DatastoreHealthResult } from "./_lib/interfaces.ts";
import { GcsClient } from "./_lib/gcs_client.ts";
import {
  GcsReplicaPathStore,
  type ReplicaPathClient,
  replicaPathFenceProblem,
} from "./_lib/gcs_replica_paths.ts";
import {
  type GcsEmulatorState,
  withGcsEmulator,
} from "./_lib/gcs_emulator_test_util.ts";
import { datastore, emulatorHostMatches, replicaPrefixProblem } from "./gcs.ts";

Deno.test("datastore export conforms to DatastoreProvider contract", () => {
  assertDatastoreExportConformance(datastore, {
    validConfigs: [
      { bucket: "my-test-bucket", projectId: "my-project" },
      { bucket: "my-test-bucket" },
      {
        bucket: "my-test-bucket",
        prefix: "swamp-data",
        projectId: "my-project",
        apiEndpoint: "http://localhost:4443",
      },
      { bucket: "my_underscore_bucket" },
      { bucket: "my.dotted.bucket" },
    ],
    invalidConfigs: [
      {},
      { projectId: "my-project" },
      { bucket: "ab" },
      { bucket: "MyBucket" },
      { bucket: "my-test-bucket", apiEndpoint: "not-a-url" },
      { bucket: "goog-reserved-prefix" },
      { bucket: "contains-google-name" },
    ],
  });
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => datastore.createProvider({}),
    Error,
  );
});

Deno.test("provider.resolveDatastorePath returns .swamp under repoDir", () => {
  const provider = datastore.createProvider({ bucket: "my-test-bucket" });
  assertEquals(
    provider.resolveDatastorePath("/tmp/my-repo"),
    join("/tmp/my-repo", ".swamp"),
  );
});

// swamp core duck-types `resolveCachePath`: a missing method and a method
// returning `undefined` take different code paths. The method must be defined
// AND return `undefined` for the repoId-keyed fallback in core to fire.
Deno.test("provider defines resolveCachePath and returns undefined", () => {
  const provider = datastore.createProvider({ bucket: "my-test-bucket" });
  assertEquals(typeof provider.resolveCachePath, "function");
  assertEquals(provider.resolveCachePath!("/tmp/my-repo"), undefined);
});

// --- Verifier behavioral test using a local mock GCS server ---

// The GCS client uses fetch() which keeps TCP connections alive in the
// global HTTP agent, which trips Deno's resource leak detection.
// sanitizeResources: false is safe here because those connections are
// reclaimed when the runtime tears down between test runs.
Deno.test({
  name: "gcs verifier: reports healthy when bucket is accessible",
  sanitizeResources: false,
  fn: async () => {
    // The mock honours generation preconditions, which verify() now probes
    // after the bucket GET.
    const { server, endpoint } = createMockGcsServer();

    try {
      const provider = datastore.createProvider({
        bucket: "my-test-bucket",
        apiEndpoint: endpoint,
      });

      const verifier = provider.createVerifier();
      const result = await verifier.verify();

      assertEquals(result.healthy, true);
      assertEquals(result.datastoreType, "@swamp/gcs-datastore");
      assertEquals(result.details?.bucket, "my-test-bucket");
      assertEquals(result.details?.conditionalWrites, "supported");
      assertEquals(result.details?.probeCleanup, "ok");
      assertEquals(typeof result.latencyMs, "number");

      await assertVerifierConformance(verifier);
      // Served from the probe memo on the second call — same verdict, and
      // no second round of probe writes.
      assertEquals(
        (await verifier.verify()).details?.conditionalWrites,
        "supported",
      );
    } finally {
      await server.shutdown();
    }
  },
});

// sanitizeResources: false is required here for the same reason as the
// healthy-probe test above — fetch()'s pooled connections outlive the
// test body.
Deno.test({
  name: "gcs verifier: reports unhealthy when bucket is not accessible",
  sanitizeResources: false,
  fn: async () => {
    const server = Deno.serve(
      { port: 0, hostname: "127.0.0.1", onListen() {} },
      (_req) => {
        return new Response(
          JSON.stringify({
            error: { code: 404, message: "Not Found" },
          }),
          { status: 404, headers: { "Content-Type": "application/json" } },
        );
      },
    );

    const addr = server.addr as Deno.NetAddr;
    const endpoint = `http://localhost:${addr.port}`;

    try {
      const provider = datastore.createProvider({
        bucket: "nonexistent-bucket",
        apiEndpoint: endpoint,
      });

      const verifier = provider.createVerifier();
      const result = await verifier.verify();

      assertEquals(result.healthy, false);
      assertEquals(result.datastoreType, "@swamp/gcs-datastore");
    } finally {
      await server.shutdown();
    }
  },
});

// --- Namespace manifest tests using a stateful mock GCS server ---

/**
 * Stateful mock GCS endpoint.
 *
 * Options carry the ways a real GCS-compatible endpoint deviates, one knob
 * per deviation, so the deviations compose instead of each needing its own
 * near-copy of the handler. The handler only enforces a precondition it
 * actually read, which is what keeps "saw it and enforced it" distinguishable
 * from "never looked at it".
 */
function createMockGcsServer(opts: {
  /** Accept every upload regardless of ifGenerationMatch. */
  ignorePreconditions?: boolean;
  /**
   * Enforce ifGenerationMatch=0 but ignore a CAS generation. Isolates the
   * stale-CAS probe step, which an endpoint ignoring everything never
   * reaches.
   */
  ignoreCasPrecondition?: boolean;
  /** Status used for a failed precondition (real GCS: 412). */
  preconditionStatus?: number;
  /** Status returned for every upload, before preconditions are read. */
  uploadStatus?: number;
  /** Return a non-JSON body on a failed precondition. */
  nonJsonPreconditionBody?: boolean;
  /** Reject DELETE with 403. */
  denyDelete?: boolean;
  /**
   * Commit the upload but answer with an unparseable body — the ambiguous
   * shape where the object exists although the client sees a failure.
   */
  malformedUploadResponse?: boolean;
  /** Hang the bucket GET until the returned controller aborts. */
  stallBucketGet?: AbortSignal;
} = {}): {
  server: Deno.HttpServer;
  endpoint: string;
  storage: Map<string, Uint8Array>;
} {
  const storage = new Map<string, Uint8Array>();
  const generations = new Map<string, number>();
  let nextGeneration = 100;

  const preconditionFailed = () =>
    opts.nonJsonPreconditionBody
      ? new Response("precondition failed", {
        status: opts.preconditionStatus ?? 412,
        headers: { "Content-Type": "text/plain" },
      })
      : new Response(
        JSON.stringify({
          error: {
            code: opts.preconditionStatus ?? 412,
            message: "Precondition Failed",
          },
        }),
        {
          status: opts.preconditionStatus ?? 412,
          headers: { "Content-Type": "application/json" },
        },
      );

  const server = Deno.serve(
    { port: 0, hostname: "127.0.0.1", onListen() {} },
    async (req) => {
      const url = new URL(req.url);
      const path = url.pathname;

      // LIST objects: GET /storage/v1/b/{bucket}/o
      if (req.method === "GET" && path.match(/\/storage\/v1\/b\/[^/]+\/o$/)) {
        const prefix = url.searchParams.get("prefix") ?? "";
        const items = [...storage.entries()]
          .filter(([k]) => k.startsWith(prefix))
          .map(([k, v]) => ({
            name: k,
            size: String(v.length),
            generation: String(generations.get(k) ?? 1),
            updated: "2026-01-01T00:00:00.000Z",
          }));
        return new Response(
          JSON.stringify({ kind: "storage#objects", items }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // GET object: GET /storage/v1/b/{bucket}/o/{key}?alt=media
      if (
        req.method === "GET" &&
        path.match(/\/storage\/v1\/b\/[^/]+\/o\//) &&
        url.searchParams.get("alt") === "media"
      ) {
        const objectName = decodeURIComponent(
          path.replace(/^\/storage\/v1\/b\/[^/]+\/o\//, ""),
        );
        const data = storage.get(objectName);
        if (data) {
          return new Response(data.buffer as ArrayBuffer, {
            status: 200,
            headers: {
              "x-goog-generation": String(generations.get(objectName) ?? 1),
            },
          });
        }
        return new Response(
          JSON.stringify({ error: { code: 404, message: "Not Found" } }),
          { status: 404, headers: { "Content-Type": "application/json" } },
        );
      }

      // DELETE object: DELETE /storage/v1/b/{bucket}/o/{key}
      if (req.method === "DELETE") {
        if (opts.denyDelete) {
          return new Response(
            JSON.stringify({ error: { code: 403, message: "Forbidden" } }),
            { status: 403, headers: { "Content-Type": "application/json" } },
          );
        }
        const objectName = decodeURIComponent(
          path.replace(/^\/storage\/v1\/b\/[^/]+\/o\//, ""),
        );
        storage.delete(objectName);
        generations.delete(objectName);
        return new Response(null, { status: 204 });
      }

      // PUT object: POST /upload/storage/v1/b/{bucket}/o?uploadType=media&name={key}
      if (
        req.method === "POST" &&
        path.match(/\/upload\/storage\/v1\/b\/[^/]+\/o/)
      ) {
        const uploaded = new Uint8Array(await req.arrayBuffer());
        if (opts.uploadStatus !== undefined) {
          return new Response(
            JSON.stringify({
              error: { code: opts.uploadStatus, message: "Upload rejected" },
            }),
            {
              status: opts.uploadStatus,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        const objectName = url.searchParams.get("name");
        const ifGenMatch = url.searchParams.get("ifGenerationMatch");

        const skipCheck = opts.ignorePreconditions ||
          (opts.ignoreCasPrecondition && ifGenMatch !== "0");
        if (!skipCheck && objectName && ifGenMatch !== null) {
          const live = generations.get(objectName);
          // ifGenerationMatch=0 means "only if absent"; anything else must
          // match the live generation exactly.
          if (
            ifGenMatch === "0"
              ? live !== undefined
              : String(live) !== ifGenMatch
          ) {
            return preconditionFailed();
          }
        }

        if (objectName) {
          storage.set(objectName, uploaded);
          generations.set(objectName, ++nextGeneration);
          if (opts.malformedUploadResponse) {
            // Committed, but the client cannot read the response.
            return new Response("<html>gateway</html>", {
              status: 200,
              headers: { "Content-Type": "text/html" },
            });
          }
          return new Response(
            JSON.stringify({
              kind: "storage#object",
              generation: String(generations.get(objectName)),
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        }
        return new Response(
          JSON.stringify({ kind: "storage#object", generation: "1" }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }

      // Object metadata: GET /storage/v1/b/{bucket}/o/{key}
      if (req.method === "GET" && path.match(/\/storage\/v1\/b\/[^/]+\/o\//)) {
        const objectName = decodeURIComponent(
          path.replace(/^\/storage\/v1\/b\/[^/]+\/o\//, ""),
        );
        const data = storage.get(objectName);
        if (!data) {
          return new Response(
            JSON.stringify({ error: { code: 404, message: "Not Found" } }),
            { status: 404, headers: { "Content-Type": "application/json" } },
          );
        }
        return new Response(
          JSON.stringify({
            size: String(data.length),
            generation: String(generations.get(objectName) ?? 1),
            updated: new Date().toISOString(),
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }

      // Bucket check: GET /storage/v1/b/{bucket}
      if (req.method === "GET" && path.match(/\/storage\/v1\/b\/[^/]+$/)) {
        if (opts.stallBucketGet) {
          // Resolves only when the test aborts, so shutdown() can never block
          // on an in-flight request.
          await new Promise<void>((resolve) => {
            opts.stallBucketGet!.addEventListener("abort", () => resolve(), {
              once: true,
            });
          });
        }
        return new Response(
          JSON.stringify({ kind: "storage#bucket", name: "test-bucket" }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }

      return new Response(null, { status: 404 });
    },
  );

  const addr = server.addr as Deno.NetAddr;
  return {
    server,
    endpoint: `http://localhost:${addr.port}`,
    storage,
  };
}

// GCS client uses fetch() with connection pooling which trips Deno's
// resource leak detection.
Deno.test({
  name: "registerNamespace writes .namespace.json to bucket",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint, storage } = createMockGcsServer();

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        apiEndpoint: endpoint,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");

      const raw = storage.get("infra/.namespace.json");
      assertEquals(raw !== undefined, true);
      const manifest = JSON.parse(new TextDecoder().decode(raw!));
      assertEquals(manifest.namespace, "infra");
      assertEquals(manifest.repoId, "repo-aaa");
      assertEquals(typeof manifest.registeredAt, "string");
    } finally {
      await server.shutdown();
    }
  },
});

// GCS client uses fetch() with connection pooling which trips Deno's
// resource leak detection.
Deno.test({
  name: "registerNamespace re-registration with same repoId succeeds",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockGcsServer();

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        apiEndpoint: endpoint,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
    } finally {
      await server.shutdown();
    }
  },
});

// GCS client uses fetch() with connection pooling which trips Deno's
// resource leak detection.
Deno.test({
  name: "registerNamespace throws conflict when different repoId",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockGcsServer();

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        apiEndpoint: endpoint,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
      await assertRejects(
        () => provider.registerNamespace!("/tmp/ds", "infra", "repo-bbb"),
        Error,
        "already registered by repo repo-aaa",
      );
    } finally {
      await server.shutdown();
    }
  },
});

// GCS client uses fetch() with connection pooling which trips Deno's
// resource leak detection.
Deno.test({
  name: "listNamespaces returns empty array when no namespaces registered",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockGcsServer();

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        apiEndpoint: endpoint,
      });

      const result = await provider.listNamespaces!("/tmp/ds");
      assertEquals(result, []);
    } finally {
      await server.shutdown();
    }
  },
});

// GCS client uses fetch() with connection pooling which trips Deno's
// resource leak detection.
Deno.test({
  name: "listNamespaces returns registered namespace slugs",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockGcsServer();

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        apiEndpoint: endpoint,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
      await provider.registerNamespace!("/tmp/ds", "staging", "repo-bbb");

      const result = await provider.listNamespaces!("/tmp/ds");
      assertEquals(result.sort(), ["infra", "staging"]);
    } finally {
      await server.shutdown();
    }
  },
});

// --- Tests for conflict detection when backend ignores preconditions ---

// GCS client uses fetch() with connection pooling which trips Deno's
// resource leak detection.
Deno.test({
  name:
    "registerNamespace detects conflict even when backend ignores ifGenerationMatch",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockGcsServer({
      ignorePreconditions: true,
    });

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        apiEndpoint: endpoint,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
      await assertRejects(
        () => provider.registerNamespace!("/tmp/ds", "infra", "repo-bbb"),
        Error,
        "already registered by repo repo-aaa",
      );
    } finally {
      await server.shutdown();
    }
  },
});

// GCS client uses fetch() with connection pooling which trips Deno's
// resource leak detection.
Deno.test({
  name:
    "registerNamespace re-registration succeeds when backend ignores ifGenerationMatch",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockGcsServer({
      ignorePreconditions: true,
    });

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        apiEndpoint: endpoint,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
    } finally {
      await server.shutdown();
    }
  },
});

// --- Tests for prefix configuration ---

// GCS client uses fetch() with connection pooling which trips Deno's
// resource leak detection.
Deno.test({
  name: "registerNamespace with prefix throws conflict when different repoId",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockGcsServer();

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        prefix: "shared-prefix",
        apiEndpoint: endpoint,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
      await assertRejects(
        () => provider.registerNamespace!("/tmp/ds", "infra", "repo-bbb"),
        Error,
        "already registered by repo repo-aaa",
      );
    } finally {
      await server.shutdown();
    }
  },
});

// GCS client uses fetch() with connection pooling which trips Deno's
// resource leak detection.
Deno.test({
  name:
    "registerNamespace with prefix detects conflict when backend ignores ifGenerationMatch",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockGcsServer({
      ignorePreconditions: true,
    });

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        prefix: "shared-prefix",
        apiEndpoint: endpoint,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
      await assertRejects(
        () => provider.registerNamespace!("/tmp/ds", "infra", "repo-bbb"),
        Error,
        "already registered by repo repo-aaa",
      );
    } finally {
      await server.shutdown();
    }
  },
});

// --- swamp-club#2315: generation-precondition conformance probe ----------
//
// One case per deviation a real GCS-compatible endpoint exhibits. Each gets
// its own Deno.serve port, which is what isolates them from each other: the
// probe memo is keyed on endpoint|bucket|prefix, so sharing a port would
// have one case read another's cached verdict.
//
// sanitizeResources: false throughout for the same reason as the tests
// above — fetch()'s pooled connections outlive the test body.

async function probeResult(
  mock: { server: Deno.HttpServer; endpoint: string },
): Promise<DatastoreHealthResult> {
  try {
    const provider = datastore.createProvider({
      bucket: "my-test-bucket",
      apiEndpoint: mock.endpoint,
    });
    return await provider.createVerifier().verify();
  } finally {
    await mock.server.shutdown();
  }
}

Deno.test({
  name: "gcs verifier: endpoint ignoring generation preconditions is unhealthy",
  sanitizeResources: false,
  fn: async () => {
    const result = await probeResult(
      createMockGcsServer({ ignorePreconditions: true }),
    );
    assertEquals(result.healthy, false);
    assertEquals(result.details?.conditionalWrites, "ignored");
    assertStringIncludes(result.message, "ifGenerationMatch=0");
    assertStringIncludes(result.message, "locking would not be safe");
  },
});

Deno.test({
  name:
    "gcs verifier: endpoint ignoring only the CAS precondition is unhealthy",
  sanitizeResources: false,
  fn: async () => {
    // Honours ifGenerationMatch=0, so the probe reaches the stale-CAS step —
    // the precondition the shard-first index merge relies on. Without this
    // case that step could be dead and every other case would still pass.
    const result = await probeResult(
      createMockGcsServer({ ignoreCasPrecondition: true }),
    );
    assertEquals(result.healthy, false);
    assertEquals(result.details?.conditionalWrites, "ignored");
    assertStringIncludes(result.message, "ifGenerationMatch=<generation>");
  },
});

Deno.test({
  name: "gcs verifier: 409 instead of 412 still reads as supported",
  sanitizeResources: false,
  fn: async () => {
    // The endpoint does honour the precondition, it just reports it with a
    // Conflict. This is isPreconditionFailure seen end to end through
    // verify(), not just at the client.
    const result = await probeResult(
      createMockGcsServer({ preconditionStatus: 409 }),
    );
    assertEquals(result.healthy, true);
    assertEquals(result.details?.conditionalWrites, "supported");
  },
});

Deno.test({
  name: "gcs verifier: a non-JSON precondition body still reads as supported",
  sanitizeResources: false,
  fn: async () => {
    // GCS maps 412 on status alone, before any body parsing, so an
    // unparseable error body cannot turn a working endpoint unhealthy.
    const result = await probeResult(
      createMockGcsServer({ nonJsonPreconditionBody: true }),
    );
    assertEquals(result.healthy, true);
    assertEquals(result.details?.conditionalWrites, "supported");
  },
});

Deno.test({
  name:
    "gcs verifier: probe write denied reports permissions, not a compat bug",
  sanitizeResources: false,
  fn: async () => {
    const result = await probeResult(
      createMockGcsServer({ uploadStatus: 403 }),
    );
    assertEquals(result.healthy, false);
    assertEquals(result.details?.conditionalWrites, "write-denied");
    assertStringIncludes(result.message, "storage.objects.create");
    assertStringIncludes(result.message, "storage.objects.delete");
    // Must not send a narrow-IAM user hunting for a compatibility bug.
    assert(!result.message.includes("ignores generation preconditions"));
  },
});

Deno.test({
  name: "gcs verifier: an unauthenticated probe write reads as write-denied",
  sanitizeResources: false,
  fn: async () => {
    // The shape GCS has and S3 does not: a token that expired between the
    // bucket GET and the probe upload. Without 401 in isWriteDenied this
    // falls through to "inconclusive" with a useless message.
    const result = await probeResult(
      createMockGcsServer({ uploadStatus: 401 }),
    );
    assertEquals(result.healthy, false);
    assertEquals(result.details?.conditionalWrites, "write-denied");
    assertStringIncludes(result.message, "storage.objects.create");
  },
});

Deno.test({
  name: "gcs verifier: a rejected probe cleanup does not flip healthy",
  sanitizeResources: false,
  fn: async () => {
    // An endpoint that honours preconditions but rejects DELETE is still
    // safe for locking, so the leaked key is reported rather than failing
    // verification.
    const result = await probeResult(createMockGcsServer({ denyDelete: true }));
    assertEquals(result.healthy, true);
    assertEquals(result.details?.conditionalWrites, "supported");
    assertEquals(result.details?.probeCleanup, "failed");
    assertStringIncludes(result.message, "_control/conditional-write-probe-");
  },
});

Deno.test({
  name: "gcs verifier: honours a configured requestTimeoutMs",
  sanitizeResources: false,
  fn: async () => {
    // createVerifier() used to pass the raw datastore config, whose timeout
    // field is requestTimeoutMs, into a client that reads
    // defaultRequestTimeoutMs — so a configured timeout was silently dropped
    // and this reported 30000ms.
    const stall = new AbortController();
    const { server, endpoint } = createMockGcsServer({
      stallBucketGet: stall.signal,
    });

    try {
      const provider = datastore.createProvider({
        bucket: "my-test-bucket",
        apiEndpoint: endpoint,
        requestTimeoutMs: 1000,
      });

      const result = await provider.createVerifier().verify();
      assertEquals(result.healthy, false);
      assertStringIncludes(result.message, "timed out after 1000ms");
    } finally {
      // Release the stalled handler first, so shutdown() cannot block on an
      // in-flight request and hang the run instead of failing it.
      stall.abort();
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "gcs verifier: an ambiguous probe upload is still cleaned up",
  sanitizeResources: false,
  fn: async () => {
    // GCS commits the upload, then the response never parses. The client
    // sees a failure, so the verdict is inconclusive — but the object is
    // there, and skipping cleanup would leak a probe key per attempt with
    // probeCleanup still reporting "ok".
    const { server, endpoint, storage } = createMockGcsServer({
      malformedUploadResponse: true,
    });

    try {
      const provider = datastore.createProvider({
        bucket: "my-test-bucket",
        apiEndpoint: endpoint,
      });
      const result = await provider.createVerifier().verify();

      assertEquals(result.healthy, false);
      assertEquals(result.details?.conditionalWrites, "inconclusive");
      assertEquals(result.details?.probeCleanup, "ok");
      assertEquals(
        [...storage.keys()].filter((k) =>
          k.includes("conditional-write-probe-")
        ),
        [],
        "the committed probe object must not be left behind",
      );
    } finally {
      await server.shutdown();
    }
  },
});

// --- swamp-club#3395 / #3492: datastore-wide control plane and storage/1 ---
//
// Both suites run against the in-process GCS emulator here, so they run in
// every verification. The same suites run against fake-gcs-server when
// SWAMP_TEST_GCS_ENDPOINT and SWAMP_TEST_GCS_BUCKET are set; see the cases at
// the end.
//
// sanitizeResources: false throughout: fetch()'s pooled connections outlive
// the test body.

/** An empty legacy (v1) index: what marks a namespace upgraded from solo. */
function legacyIndex(): Uint8Array {
  return new TextEncoder().encode(JSON.stringify({
    version: 1,
    lastPulled: new Date().toISOString(),
    entries: {},
  }));
}

type ConformanceProvider = {
  datastoreControlPlaneStore?(): unknown;
  createSyncService?(repoDir: string, cachePath: string): unknown;
  storage?(): unknown;
};

async function runWritableControlPlaneConformance(
  provider: ConformanceProvider,
  markNamespaceUpgradedFromSolo: (namespace: string) => Promise<void>,
): Promise<void> {
  const caches: string[] = [];
  const openSyncFixture = async () => {
    const cacheDir = await Deno.makeTempDir({
      prefix: "gcs-cp-conformance-",
    });
    caches.push(cacheDir);
    return {
      service: provider.createSyncService!(
        cacheDir,
        cacheDir,
      ) as ConformanceDatastoreSyncService,
      cacheDir,
    };
  };
  try {
    const result = await assertWritableDatastoreControlPlaneStoreConformance({
      openDatastoreStore: () =>
        provider.datastoreControlPlaneStore!() as ConformanceWritableStore,
      openSyncService: async () => (await openSyncFixture()).service,
      openNamespacedSyncFixture: openSyncFixture,
      markNamespaceUpgradedFromSolo,
    });
    // The case that proves the lease never moves must not silently skip.
    assertEquals(result.namespacedPushSkipped, undefined);
  } finally {
    for (const dir of caches) {
      await Deno.remove(dir, { recursive: true }).catch(() => {});
    }
  }
}

function emulatorProvider(endpoint: string) {
  return datastore.createProvider({
    bucket: "test-bucket",
    apiEndpoint: endpoint,
  }) as ReturnType<typeof datastore.createProvider> & ConformanceProvider;
}

function chunkObjectKey(namespace: string, sha256: string): string {
  return `_blobs/${namespace}/sha256/${sha256.slice(0, 2)}/${sha256}`;
}

function backdate(state: GcsEmulatorState) {
  return (namespace: string, sha256: string, date: Date) => {
    const object = state.objects.get(chunkObjectKey(namespace, sha256));
    if (!object) {
      return Promise.reject(new Error(`no chunk ${namespace}/${sha256}`));
    }
    object.updated = date;
    return Promise.resolve();
  };
}

Deno.test({
  name:
    "provider declares datastoreWideLease and offers the control plane and storage",
  fn: () => {
    const provider = datastore.createProvider({ bucket: "my-test-bucket" });
    assertEquals(provider.datastoreWideLease, true);
    assertEquals(typeof provider.datastoreControlPlaneStore, "function");
    assertEquals(provider.storage?.().contract, "storage/1");
  },
});

Deno.test({
  name:
    "writable datastore-wide control plane conformance, namespaced push included (GCS emulator)",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (_gcs, state, endpoint) => {
      await runWritableControlPlaneConformance(
        emulatorProvider(endpoint),
        (namespace) => {
          state.objects.set(`${namespace}/.datastore-index.json`, {
            body: legacyIndex(),
            generation: 1,
            updated: new Date(),
          });
          return Promise.resolve();
        },
      );
    });
  },
});

Deno.test({
  name: "storage/1 conformance (GCS emulator)",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (_gcs, state, endpoint) => {
      const provider = emulatorProvider(endpoint);
      await assertStorageConformance(
        () => provider.storage!() as ConformanceDatastoreStorage,
        { setLastModified: backdate(state) },
      );
    });
  },
});

// --- the same suites against fake-gcs-server ---
//
// Set SWAMP_TEST_GCS_ENDPOINT (e.g. http://localhost:4443) and
// SWAMP_TEST_GCS_BUCKET (an existing bucket). fake-gcs-server must be 1.56.1
// or later: before 1.56.0 it ignores ifGenerationMatch on simple uploads
// (fsouza/fake-gcs-server#2308), so the putIfAbsent race the writable suite
// always runs cannot pass. Each run uses a fresh prefix, so the
// namespaced-push case always starts from an empty datastore root. The
// lastModified-refresh checks of the storage suite are skipped there: a real
// endpoint cannot backdate an object.

const realEndpoint = Deno.env.get("SWAMP_TEST_GCS_ENDPOINT");
const realBucket = Deno.env.get("SWAMP_TEST_GCS_BUCKET");

function realConfig() {
  return {
    bucket: realBucket!,
    prefix: `swamp-conformance-${crypto.randomUUID().slice(0, 8)}`,
    apiEndpoint: realEndpoint!,
  };
}

Deno.test({
  name:
    "writable datastore-wide control plane conformance (SWAMP_TEST_GCS_ENDPOINT, fake-gcs-server >= 1.56.1)",
  ignore: !realEndpoint || !realBucket,
  sanitizeResources: false,
  fn: async () => {
    const config = realConfig();
    const provider = datastore.createProvider(config) as
      & ReturnType<typeof datastore.createProvider>
      & ConformanceProvider;
    const gcs = new GcsClient(config);
    await runWritableControlPlaneConformance(provider, async (namespace) => {
      await gcs.putObject(`${namespace}/.datastore-index.json`, legacyIndex());
    });
  },
});

Deno.test({
  name:
    "storage/1 conformance (SWAMP_TEST_GCS_ENDPOINT, fake-gcs-server >= 1.56.1)",
  ignore: !realEndpoint || !realBucket,
  sanitizeResources: false,
  fn: async () => {
    const provider = datastore.createProvider(realConfig());
    await assertStorageConformance(
      () => provider.storage!() as ConformanceDatastoreStorage,
    );
  },
});

Deno.test({
  name:
    "a namespaced push into an upgraded namespace leaves writer/ and lineage/ records at the root (swamp-club#3482)",
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (_client, state, endpoint) => {
      const provider = emulatorProvider(endpoint);
      const store = provider
        .datastoreControlPlaneStore!() as ConformanceWritableStore;
      const keys = [
        "writer/lease",
        "lineage/7/started.json",
        "lineage/7/head-3.json",
      ];
      for (const key of keys) {
        await store.put(key, new TextEncoder().encode(key));
      }
      const namespace = "upgraded-ns";
      state.objects.set(`${namespace}/.datastore-index.json`, {
        body: legacyIndex(),
        generation: 1,
        updated: new Date(),
      });
      const cacheDir = await Deno.makeTempDir({ prefix: "lineage-push-" });
      try {
        const service = provider.createSyncService!(
          cacheDir,
          cacheDir,
        ) as ConformanceDatastoreSyncService;
        const relPath = `${namespace}/data/lineage/file`;
        await service.pullChanged({ namespace });
        await service.markDirty({ relPath, namespace });
        await Deno.mkdir(`${cacheDir}/${namespace}/data/lineage`, {
          recursive: true,
        });
        await Deno.writeTextFile(`${cacheDir}/${relPath}`, "x");
        await service.pushChanged({ namespace });
        for (const key of keys) {
          assertEquals(
            new TextDecoder().decode((await store.get(key))!),
            key,
            `${key} must stay at the datastore root`,
          );
          assertEquals(
            state.objects.has(`${namespace}/_control/${key}`),
            false,
            `${key} must never be copied into the namespace`,
          );
        }
      } finally {
        await Deno.remove(cacheDir, { recursive: true });
      }
    });
  },
});

// --- swamp-club#3508: replicaTarget() for v3 Litestream replication ---

function replicaTargetFor(config: Record<string, unknown>) {
  const provider = datastore.createProvider({ bucket: "my-bucket", ...config });
  return provider.replicaTarget!();
}

Deno.test("replicaTarget: bucket and prefix only", () => {
  assertEquals(replicaTargetFor({}), {
    type: "gcs",
    bucket: "my-bucket",
    prefix: "",
  });
  assertEquals(
    replicaTargetFor({ prefix: "team/prod/swamp", projectId: "my-project" }),
    { type: "gcs", bucket: "my-bucket", prefix: "team/prod/swamp" },
  );
  for (const config of [{}, { prefix: "a" }, { prefix: "a/b/c" }]) {
    assertEquals(replicaTargetProblem(replicaTargetFor(config)), undefined);
  }
});

/** Runs `fn` with STORAGE_EMULATOR_HOST set to `value`, or unset. */
function withEmulatorHost(value: string | undefined, fn: () => void): void {
  const prior = Deno.env.get("STORAGE_EMULATOR_HOST");
  try {
    if (value === undefined) Deno.env.delete("STORAGE_EMULATOR_HOST");
    else Deno.env.set("STORAGE_EMULATOR_HOST", value);
    fn();
  } finally {
    if (prior === undefined) Deno.env.delete("STORAGE_EMULATOR_HOST");
    else Deno.env.set("STORAGE_EMULATOR_HOST", prior);
  }
}

Deno.test("replicaTarget: refuses apiEndpoint, without echoing it", () => {
  withEmulatorHost(undefined, () => {
    const apiEndpoint = "http://127.0.0.1:4443/zq9";
    const err = assertThrows(() => replicaTargetFor({ apiEndpoint }), Error);
    assertStringIncludes(err.message, "apiEndpoint");
    assertStringIncludes(err.message, "Litestream");
    // The test-only escape is named, so a test suite knows what to set.
    assertStringIncludes(err.message, "STORAGE_EMULATOR_HOST");
    assert(!err.message.includes("zq9"), `endpoint leaked: ${err.message}`);
  });
});

Deno.test("replicaTarget: accepts apiEndpoint when STORAGE_EMULATOR_HOST names the same emulator", () => {
  // Litestream reaches a GCS emulator through STORAGE_EMULATOR_HOST, so a
  // matching host and port means the replica lands where the datastore
  // writes (swamp-uat's gcs-v3 backend, Phase 4 H).
  const apiEndpoint = "http://127.0.0.1:4443";
  for (const host of ["127.0.0.1:4443", "http://127.0.0.1:4443"]) {
    withEmulatorHost(host, () => {
      assertEquals(
        replicaTargetFor({ apiEndpoint, prefix: "swamp" }),
        { type: "gcs", bucket: "my-bucket", prefix: "swamp" },
      );
    });
  }
  // The prefix rules still apply.
  withEmulatorHost("127.0.0.1:4443", () => {
    assertThrows(() => replicaTargetFor({ apiEndpoint, prefix: "/zq9" }));
  });
});

Deno.test("replicaTarget: refuses apiEndpoint when STORAGE_EMULATOR_HOST names another host or port", () => {
  const apiEndpoint = "http://127.0.0.1:4443/zq9";
  for (
    const host of ["127.0.0.1:4444", "localhost:4443", "10.0.0.1:4443", ""]
  ) {
    withEmulatorHost(host === "" ? undefined : host, () => {
      const err = assertThrows(() => replicaTargetFor({ apiEndpoint }), Error);
      assertStringIncludes(err.message, "STORAGE_EMULATOR_HOST");
      assert(!err.message.includes("zq9"), `endpoint leaked: ${err.message}`);
    });
  }
});

Deno.test("emulatorHostMatches: host and port, with or without a scheme", () => {
  assert(emulatorHostMatches("http://localhost:4443", "localhost:4443"));
  assert(
    emulatorHostMatches("http://LOCALHOST:4443/", "http://localhost:4443"),
  );
  assert(emulatorHostMatches("https://emu.example", "https://emu.example:443"));
  assert(emulatorHostMatches("http://emu.example", "emu.example:80"));
  assert(!emulatorHostMatches("http://localhost:4443", "localhost:4444"));
  assert(!emulatorHostMatches("http://localhost:4443", "127.0.0.1:4443"));
  assert(!emulatorHostMatches("http://localhost:4443", undefined));
  assert(!emulatorHostMatches("http://localhost:4443", "::not a host::"));
});

Deno.test("replicaTarget: refuses a prefix it cannot express, without echoing it", () => {
  const marker = "zq9";
  const refused = [
    `/${marker}`,
    `${marker}/`,
    `${marker}//b`,
    `${marker}/./b`,
    `../${marker}`,
    `${marker}/..`,
  ];
  for (const prefix of refused) {
    const err = assertThrows(() => replicaTargetFor({ prefix }), Error);
    assertStringIncludes(err.message, "cannot host v3 replication");
    assert(!err.message.includes(marker), `${prefix} leaked: ${err.message}`);
    assert(replicaPrefixProblem(prefix) !== undefined);
  }
});

// The conformance suite needs a provider that both reaches the emulator and
// answers replicaTarget(). Reaching the emulator takes apiEndpoint, which
// replicaTarget() refuses by design (Litestream has no custom GCS endpoint).
// So the target comes from a twin provider with the same bucket and prefix
// and no apiEndpoint, and storage() and the control plane from the
// emulator-backed one: what the suite proves is that the twin's prefix is
// the root the emulator-backed provider writes under.
//
// sanitizeResources: false is required here for the same reason as the
// healthy-probe test above — fetch()'s pooled connections outlive the
// test body.
for (const prefix of [undefined, "swamp", "team/prod/swamp"]) {
  Deno.test({
    name: `replica target conformance, prefix ${
      prefix ?? "(none)"
    } (GCS emulator)`,
    sanitizeResources: false,
    fn: async () => {
      await withGcsEmulator({}, async (_gcs, state, endpoint) => {
        const base = {
          bucket: "test-bucket",
          ...(prefix !== undefined ? { prefix } : {}),
        };
        const writer = datastore.createProvider({
          ...base,
          apiEndpoint: endpoint,
        });
        const twin = datastore.createProvider(base);
        await assertReplicaTargetConformance({
          replicaTarget: () => twin.replicaTarget!(),
          bucket: base.bucket,
          openStorage: () => writer.storage!() as ConformanceDatastoreStorage,
          openDatastoreStore: () =>
            writer.datastoreControlPlaneStore!() as ConformanceWritableStore,
          objectExists: (key) => Promise.resolve(state.objects.has(key)),
        });
      });
    },
  });
}

// --- swamp-club#3531: replicaPaths() for v3 lineage path collection ---
//
// The suite reads the replica root from replicaTarget(), which refuses
// apiEndpoint by design, and an emulator needs apiEndpoint. So, as for the
// replica target suite above, the target comes from a twin provider with the
// same bucket and prefix and no apiEndpoint, and replicaPaths() and
// storage() from the emulator-backed one.
//
// sanitizeResources: false — fetch()'s pooled connections outlive the test
// body, as for the other emulator-backed tests in this file.

async function runReplicaPathConformance(
  base: { bucket: string; prefix?: string },
  apiEndpoint: string,
  bucket: {
    write: (key: string, bytes: Uint8Array) => Promise<void>;
    remove: (key: string) => Promise<void>;
    exists: (key: string) => Promise<boolean>;
  },
  objectsPerFence?: number,
): Promise<void> {
  const writer = datastore.createProvider({ ...base, apiEndpoint });
  const twin = datastore.createProvider(base);
  await assertReplicaPathConformance({
    replicaTarget: () => twin.replicaTarget!(),
    openReplicaPaths: () => writer.replicaPaths!(),
    openStorage: () => writer.storage!() as ConformanceDatastoreStorage,
    writeObject: bucket.write,
    deleteObject: bucket.remove,
    objectExists: bucket.exists,
    objectsPerFence,
  });
}

for (
  const [label, prefix, maxResults] of [
    ["prefix (none)", undefined, undefined],
    ["nested prefix", "team/prod/swamp", undefined],
    // Two names a page, so removePath and list must page.
    ["listing pages of two names", "swamp", 2],
  ] as const
) {
  Deno.test({
    name: `replica path conformance, ${label} (GCS emulator)`,
    sanitizeResources: false,
    fn: async () => {
      await withGcsEmulator({ maxResults }, async (_gcs, state, endpoint) => {
        await runReplicaPathConformance(
          {
            bucket: "test-bucket",
            ...(prefix !== undefined ? { prefix } : {}),
          },
          endpoint,
          {
            write: (key, bytes) => {
              const prior = state.objects.get(key);
              state.objects.set(key, {
                body: bytes,
                generation: (prior?.generation ?? 0) + 1,
                updated: new Date(),
              });
              return Promise.resolve();
            },
            remove: (key) => {
              state.objects.delete(key);
              return Promise.resolve();
            },
            exists: (key) => Promise.resolve(state.objects.has(key)),
          },
          maxResults === undefined ? undefined : 5,
        );
      });
    },
  });
}

Deno.test({
  name:
    "replica path conformance (SWAMP_TEST_GCS_ENDPOINT, fake-gcs-server >= 1.56.1)",
  ignore: !realEndpoint || !realBucket,
  sanitizeResources: false,
  fn: async () => {
    const config = realConfig();
    const gcs = new GcsClient({
      bucket: config.bucket,
      apiEndpoint: config.apiEndpoint,
    });
    await runReplicaPathConformance(
      { bucket: config.bucket, prefix: config.prefix },
      config.apiEndpoint,
      {
        write: async (key, bytes) => {
          await gcs.putObject(key, bytes);
        },
        remove: (key) => gcs.deleteObject(key),
        exists: async (key) => (await gcs.getMetadata(key)).exists,
      },
    );
  },
});

/** A stand-in client recording the calls the store makes. */
function fakeReplicaClient(
  keys: string[],
  options: { ignoreDeletes?: boolean } = {},
): ReplicaPathClient & { calls: string[] } {
  const calls: string[] = [];
  return {
    calls,
    listCommonPrefixes: (subPrefix: string) => {
      calls.push(`dirs ${subPrefix}`);
      const dirs = new Set<string>();
      for (const key of keys) {
        if (!key.startsWith(subPrefix)) continue;
        const at = key.indexOf("/", subPrefix.length);
        if (at >= 0) dirs.add(key.slice(0, at + 1));
      }
      return Promise.resolve([...dirs]);
    },
    listObjects: (subPrefix?: string) => {
      calls.push(`list ${subPrefix}`);
      const entries = keys.filter((key) => key.startsWith(subPrefix ?? ""))
        .slice(0, 2).map((key) => ({ key, size: 1 }));
      return Promise.resolve({ entries, truncated: false });
    },
    deleteObject: (key: string) => {
      calls.push(`delete ${key}`);
      if (!options.ignoreDeletes) keys.splice(keys.indexOf(key), 1);
      return Promise.resolve();
    },
  } as ReplicaPathClient & { calls: string[] };
}

Deno.test("replicaPaths: a malformed fence is refused before any request", async () => {
  const client = fakeReplicaClient(["_litestream/000000000001/snapshot"]);
  const store = new GcsReplicaPathStore(client);
  const signal = new AbortController().signal;
  for (const fence of ["", "1", "000000000000", "../_blobs", "00000000001/"]) {
    await assertRejects(() => store.removePath(fence, signal), Error);
    assert(replicaPathFenceProblem(fence) !== undefined);
  }
  assertEquals(client.calls, []);
  assertEquals(replicaPathFenceProblem("000000000001"), undefined);
});

Deno.test("replicaPaths: an absent fence is one listing and no deletes", async () => {
  const client = fakeReplicaClient(["_litestream/000000000002/snapshot"]);
  const store = new GcsReplicaPathStore(client);
  await store.removePath("000000000001", new AbortController().signal);
  assertEquals(client.calls, ["list _litestream/000000000001/"]);
});

Deno.test("replicaPaths: list returns fence names only, without slashes", async () => {
  const client = fakeReplicaClient([
    "_litestream/000000000001/snapshot",
    "_litestream/000000000002/ltx/0/1",
    "_litestream/stray-object",
  ]);
  const store = new GcsReplicaPathStore(client);
  assertEquals(
    (await store.list(new AbortController().signal)).sort(),
    ["000000000001", "000000000002"],
  );
});

Deno.test("replicaPaths: an endpoint that ignores deletes fails instead of looping", async () => {
  const client = fakeReplicaClient(
    ["_litestream/000000000001/snapshot"],
    { ignoreDeletes: true },
  );
  const store = new GcsReplicaPathStore(client);
  const err = await assertRejects(
    () => store.removePath("000000000001", new AbortController().signal),
    Error,
  );
  assertStringIncludes(err.message, "still listed after it was deleted");
});

Deno.test({
  name:
    "an emulator datastore with STORAGE_EMULATOR_HOST hosts v3: both replica suites, one provider (GCS emulator)",
  // sanitizeResources: false — fetch()'s pooled connections outlive the
  // test body, as for the other emulator-backed tests in this file.
  sanitizeResources: false,
  fn: async () => {
    await withGcsEmulator({}, async (_gcs, state, endpoint) => {
      const prior = Deno.env.get("STORAGE_EMULATOR_HOST");
      Deno.env.set("STORAGE_EMULATOR_HOST", new URL(endpoint).host);
      try {
        const provider = datastore.createProvider({
          bucket: "test-bucket",
          prefix: "swamp",
          apiEndpoint: endpoint,
        });
        const exists = (key: string) => Promise.resolve(state.objects.has(key));
        await assertReplicaTargetConformance({
          replicaTarget: () => provider.replicaTarget!(),
          bucket: "test-bucket",
          openStorage: () => provider.storage!() as ConformanceDatastoreStorage,
          openDatastoreStore: () =>
            provider.datastoreControlPlaneStore!() as ConformanceWritableStore,
          objectExists: exists,
        });
        await assertReplicaPathConformance({
          replicaTarget: () => provider.replicaTarget!(),
          openReplicaPaths: () => provider.replicaPaths!(),
          openStorage: () => provider.storage!() as ConformanceDatastoreStorage,
          writeObject: (key, bytes) => {
            state.objects.set(key, {
              body: bytes,
              generation: (state.objects.get(key)?.generation ?? 0) + 1,
              updated: new Date(),
            });
            return Promise.resolve();
          },
          deleteObject: (key) => {
            state.objects.delete(key);
            return Promise.resolve();
          },
          objectExists: exists,
        });
      } finally {
        if (prior === undefined) Deno.env.delete("STORAGE_EMULATOR_HOST");
        else Deno.env.set("STORAGE_EMULATOR_HOST", prior);
      }
    });
  },
});
