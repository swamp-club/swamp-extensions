// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

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
import type { DatastoreHealthResult } from "./_lib/interfaces.ts";
import { datastore } from "./gcs.ts";

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
    "/tmp/my-repo/.swamp",
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
    const server = Deno.serve({ port: 0, onListen() {} }, (_req) => {
      return new Response(
        JSON.stringify({
          error: { code: 404, message: "Not Found" },
        }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    });

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

  const server = Deno.serve({ port: 0, onListen() {} }, async (req) => {
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
      return new Response(JSON.stringify({ kind: "storage#objects", items }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
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
          ifGenMatch === "0" ? live !== undefined : String(live) !== ifGenMatch
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
  });

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
