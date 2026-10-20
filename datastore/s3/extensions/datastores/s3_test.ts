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
import type { DatastoreHealthResult } from "./_lib/interfaces.ts";
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
import {
  createS3EmulatorHandler,
  type S3EmulatorState,
  withS3Emulator,
} from "./_lib/s3_emulator_test_util.ts";
import { S3Client } from "./_lib/s3_client.ts";
import {
  type ReplicaPathClient,
  replicaPathFenceProblem,
  S3ReplicaPathStore,
} from "./_lib/s3_replica_paths.ts";
import {
  datastore,
  replicaEndpointProblem,
  replicaPrefixProblem,
} from "./s3.ts";

Deno.test("datastore export conforms to DatastoreProvider contract", () => {
  assertDatastoreExportConformance(datastore, {
    validConfigs: [
      { bucket: "my-test-bucket", region: "us-east-1" },
      { bucket: "my-test-bucket" },
      {
        bucket: "my-test-bucket",
        prefix: "swamp-data",
        region: "eu-west-1",
        endpoint: "https://nyc3.digitaloceanspaces.com",
        forcePathStyle: true,
      },
    ],
    invalidConfigs: [
      {},
      { region: "us-east-1" },
      { bucket: "ab" },
      { bucket: "MyBucket" },
      { bucket: "my-test-bucket", endpoint: "not-a-url" },
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

// --- Verifier behavioral test using a local mock S3 server ---

// The AWS SDK keeps TCP connections alive (connection pooling), which
// triggers Deno's resource leak detection. sanitizeResources: false is safe
// here because the connections are cleaned up when the SDK client is
// garbage collected at end-of-test.
Deno.test({
  name: "s3 verifier: reports healthy when bucket is accessible",
  sanitizeResources: false,
  fn: async () => {
    // Answers HeadBucket and honours the conditional-write probe that
    // verify() now runs after it.
    const server = Deno.serve(
      { port: 0, onListen() {} },
      conditionalWriteHandler(),
    );

    const addr = server.addr as Deno.NetAddr;
    const endpoint = `http://localhost:${addr.port}`;

    const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

    try {
      const provider = datastore.createProvider({
        bucket: "my-test-bucket",
        region: "us-east-1",
        endpoint,
        forcePathStyle: true,
      });

      const verifier = provider.createVerifier();
      const result = await verifier.verify();

      assertEquals(result.healthy, true);
      assertEquals(result.datastoreType, "@swamp/s3-datastore");
      assertEquals(result.details?.bucket, "my-test-bucket");
      assertEquals(result.details?.conditionalWrites, "supported");
      assertEquals(typeof result.latencyMs, "number");

      // Also passes the generic verifier conformance, which calls verify()
      // a second time — served from the probe memo, same verdict.
      await assertVerifierConformance(verifier);
      assertEquals(
        (await verifier.verify()).details?.conditionalWrites,
        "supported",
      );
    } finally {
      if (originalKey) {
        Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
      } else {
        Deno.env.delete("AWS_ACCESS_KEY_ID");
      }
      if (originalSecret) {
        Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
      } else {
        Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      }
      await server.shutdown();
    }
  },
});

// sanitizeResources: false is required here for the same reason as the
// healthy-probe test above — the AWS SDK's pooled connections outlive the
// test body but are reclaimed by GC.
Deno.test({
  name: "s3 verifier: reports unhealthy when bucket is not accessible",
  sanitizeResources: false,
  fn: async () => {
    const server = Deno.serve({ port: 0, onListen() {} }, (req) => {
      if (req.method === "HEAD") {
        return new Response(null, { status: 404 });
      }
      return new Response(null, { status: 404 });
    });

    const addr = server.addr as Deno.NetAddr;
    const endpoint = `http://localhost:${addr.port}`;

    const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

    try {
      const provider = datastore.createProvider({
        bucket: "nonexistent-bucket",
        region: "us-east-1",
        endpoint,
        forcePathStyle: true,
      });

      const verifier = provider.createVerifier();
      const result = await verifier.verify();

      assertEquals(result.healthy, false);
      assertEquals(result.datastoreType, "@swamp/s3-datastore");
    } finally {
      if (originalKey) {
        Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
      } else {
        Deno.env.delete("AWS_ACCESS_KEY_ID");
      }
      if (originalSecret) {
        Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
      } else {
        Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      }
      await server.shutdown();
    }
  },
});

// --- swamp-club#2300: conditional-write conformance probe ----------------

const MOCK_ETAG = '"abc123"';

function xmlError(code: string, status: number): Response {
  return new Response(
    `<?xml version="1.0"?><Error><Code>${code}</Code><Message>${code}</Message></Error>`,
    { status, headers: { "content-type": "application/xml" } },
  );
}

/**
 * A mock S3 endpoint that honours If-None-Match / If-Match, with knobs for
 * each way a real S3-compatible store deviates. The handler only enforces a
 * precondition it actually read, so "saw the header and enforced it" is
 * distinguishable from "never looked at it".
 */
function conditionalWriteHandler(
  opts: {
    ignoreConditionals?: boolean;
    ifMatchNotImplemented?: boolean;
    denyPut?: boolean;
    denyDelete?: boolean;
    nonXmlPreconditionBody?: boolean;
  } = {},
): (req: Request) => Promise<Response> {
  const storage = new Set<string>();

  const precondition = () =>
    opts.nonXmlPreconditionBody
      ? new Response("precondition failed", {
        status: 412,
        headers: { "content-type": "text/plain" },
      })
      : xmlError("PreconditionFailed", 412);

  return async (req) => {
    const key = new URL(req.url).pathname;

    if (req.method === "HEAD") return new Response(null, { status: 200 });

    if (req.method === "DELETE") {
      if (opts.denyDelete) return xmlError("AccessDenied", 403);
      storage.delete(key);
      return new Response(null, { status: 204 });
    }

    if (req.method === "PUT") {
      await req.arrayBuffer();
      if (opts.denyPut) return xmlError("AccessDenied", 403);

      const ifNoneMatch = req.headers.get("if-none-match");
      const ifMatch = req.headers.get("if-match");

      if (ifMatch !== null && opts.ifMatchNotImplemented) {
        return xmlError("NotImplemented", 501);
      }
      if (!opts.ignoreConditionals) {
        if (ifNoneMatch === "*" && storage.has(key)) return precondition();
        if (ifMatch !== null && ifMatch !== MOCK_ETAG) return precondition();
      }

      storage.add(key);
      return new Response(null, {
        status: 200,
        headers: { etag: MOCK_ETAG },
      });
    }

    return new Response(null, { status: 404 });
  };
}

/**
 * Runs `fn` against a verifier wired to a fresh mock endpoint. Each case gets
 * its own `Deno.serve({ port: 0 })`, so the endpoint is distinct — and since
 * the probe memo is keyed on endpoint|bucket|prefix, that alone isolates the
 * cases from each other. Narrowing the memo key to the bucket would make
 * these tests read each other's cached verdicts and fail here.
 */
async function withProbeVerifier(
  handler: (req: Request) => Promise<Response>,
  fn: (result: DatastoreHealthResult) => void,
): Promise<void> {
  const server = Deno.serve({ port: 0, onListen() {} }, handler);
  const addr = server.addr as Deno.NetAddr;

  const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
  Deno.env.set("AWS_ACCESS_KEY_ID", "test");
  Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

  try {
    const provider = datastore.createProvider({
      bucket: "my-test-bucket",
      region: "us-east-1",
      endpoint: `http://localhost:${addr.port}`,
      forcePathStyle: true,
    });
    fn(await provider.createVerifier().verify());
  } finally {
    if (originalKey) Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
    else Deno.env.delete("AWS_ACCESS_KEY_ID");
    if (originalSecret) Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
    else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
    await server.shutdown();
  }
}

// sanitizeResources: false throughout — the AWS SDK's pooled connections
// outlive the test body but are reclaimed by GC.
Deno.test({
  name: "s3 verifier: endpoint honouring both conditional headers is healthy",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(conditionalWriteHandler(), (result) => {
      assertEquals(result.healthy, true);
      assertEquals(result.details?.conditionalWrites, "supported");
      assertEquals(result.details?.probeCleanup, "ok");
    }),
});

Deno.test({
  name: "s3 verifier: endpoint ignoring conditional writes is unhealthy",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(
      conditionalWriteHandler({ ignoreConditionals: true }),
      (result) => {
        assertEquals(result.healthy, false);
        assertEquals(result.details?.conditionalWrites, "ignored");
        assert(result.message.includes("conditional writes"));
        assert(result.message.includes("locking would not be safe"));
      },
    ),
});

Deno.test({
  name:
    "s3 verifier: If-Match NotImplemented stays healthy (documented fallback)",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(
      conditionalWriteHandler({ ifMatchNotImplemented: true }),
      (result) => {
        assertEquals(result.healthy, true);
        assertEquals(result.details?.conditionalWrites, "if-match-unsupported");
      },
    ),
});

Deno.test({
  name: "s3 verifier: probe write denied reports permissions, not a compat bug",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(
      conditionalWriteHandler({ denyPut: true }),
      (result) => {
        assertEquals(result.healthy, false);
        assertEquals(result.details?.conditionalWrites, "write-denied");
        assert(result.message.includes("PutObject"));
        assert(result.message.includes("DeleteObject"));
        // Must not send a narrow-IAM user hunting for an S3 compat bug.
        assert(!result.message.includes("ignores conditional writes"));
      },
    ),
});

Deno.test({
  name: "s3 verifier: a non-XML 412 body still reads as supported",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(
      conditionalWriteHandler({ nonXmlPreconditionBody: true }),
      (result) => {
        // The endpoint does honour If-None-Match, it just returns an
        // unparseable error body — which is what the widened match in
        // putObjectConditional exists to handle.
        assertEquals(result.healthy, true);
        assertEquals(result.details?.conditionalWrites, "supported");
      },
    ),
});

Deno.test({
  name:
    "s3 verifier: a rejected cleanup delete cannot turn a working endpoint unhealthy",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(
      conditionalWriteHandler({ denyDelete: true }),
      (result) => {
        assertEquals(result.healthy, true);
        assertEquals(result.details?.conditionalWrites, "supported");
        assertEquals(result.details?.probeCleanup, "failed");
        assert(result.message.includes("_control/conditional-write-probe-"));
      },
    ),
});

// --- swamp-club #2337: If-Match must accept the object's current ETag ---
//
// The stale-ETag step alone passed on Ceph RGW Squid, which rejects every
// quoted If-Match on PutObject, so setup reported "supported" on a backend
// where every compare-and-swap failed. No conformance helper covers the
// conditionalWrites detail, hence the direct assertions.

Deno.test({
  name:
    "s3 verifier: quoted If-Match rejected, unquoted honoured → healthy if-match-unquoted",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(
      createS3EmulatorHandler({ quotedIfMatch: "reject" }).handler,
      (result) => {
        assertEquals(result.healthy, true);
        assertEquals(result.details?.conditionalWrites, "if-match-unquoted");
        assertEquals(result.details?.probeCleanup, "ok");
        assert(result.message.includes("quoted"));
      },
    ),
});

Deno.test({
  name:
    "s3 verifier: RGW-style rejection with a non-XML 412 still reads if-match-unquoted",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(
      createS3EmulatorHandler({
        quotedIfMatch: "reject",
        nonXmlPreconditionBody: true,
      }).handler,
      (result) => {
        assertEquals(result.healthy, true);
        assertEquals(result.details?.conditionalWrites, "if-match-unquoted");
      },
    ),
});

Deno.test({
  name:
    "s3 verifier: current ETag rejected in both forms → healthy if-match-unsupported",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(
      createS3EmulatorHandler({
        quotedIfMatch: "reject",
        unquotedIfMatch: "reject",
      }).handler,
      (result) => {
        assertEquals(result.healthy, true);
        assertEquals(result.details?.conditionalWrites, "if-match-unsupported");
        assert(result.message.includes("merge-on-write"));
      },
    ),
});

Deno.test({
  name:
    "s3 verifier: unquoted If-Match ignored is never trusted → if-match-unsupported",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(
      createS3EmulatorHandler({
        quotedIfMatch: "reject",
        unquotedIfMatch: "ignore",
      }).handler,
      (result) => {
        assertEquals(result.healthy, true);
        assertEquals(result.details?.conditionalWrites, "if-match-unsupported");
      },
    ),
});

Deno.test({
  name: "s3 verifier: a stateful endpoint honouring quoted ETags is supported",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(createS3EmulatorHandler().handler, (result) => {
      assertEquals(result.healthy, true);
      assertEquals(result.details?.conditionalWrites, "supported");
      assertEquals(result.details?.probeCleanup, "ok");
    }),
});

Deno.test({
  name:
    "s3 verifier: no ETag on HEAD skips the current-ETag check and stays supported",
  sanitizeResources: false,
  fn: () =>
    withProbeVerifier(
      createS3EmulatorHandler({ omitHeadETag: true }).handler,
      (result) => {
        assertEquals(result.healthy, true);
        assertEquals(result.details?.conditionalWrites, "supported");
      },
    ),
});

// --- Namespace manifest tests using a stateful mock S3 server ---

function createMockS3Server(): {
  server: Deno.HttpServer;
  endpoint: string;
  storage: Map<string, Uint8Array>;
} {
  const storage = new Map<string, Uint8Array>();

  const server = Deno.serve({ port: 0, onListen() {} }, async (req) => {
    const url = new URL(req.url);
    const path = decodeURIComponent(url.pathname);
    const keyMatch = path.match(/^\/[^/]+\/(.+)$/);
    const key = keyMatch ? keyMatch[1] : null;

    if (req.method === "GET" && url.searchParams.has("list-type")) {
      const prefix = url.searchParams.get("prefix") ?? "";
      const matching = [...storage.entries()].filter(([k]) =>
        k.startsWith(prefix)
      );
      const entries = matching
        .map(
          ([k, v]) =>
            `<Contents><Key>${k}</Key><Size>${v.length}</Size><ETag>&quot;abc&quot;</ETag></Contents>`,
        )
        .join("");
      const xml =
        `<?xml version="1.0"?><ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Name>test-bucket</Name><KeyCount>${matching.length}</KeyCount><MaxKeys>1000</MaxKeys><IsTruncated>false</IsTruncated>${entries}</ListBucketResult>`;
      return new Response(xml, {
        status: 200,
        headers: { "content-type": "application/xml" },
      });
    }

    if (req.method === "GET" && key) {
      const data = storage.get(key);
      if (data) {
        return new Response(data.buffer as ArrayBuffer, { status: 200 });
      }
      return new Response(
        `<?xml version="1.0"?><Error><Code>NoSuchKey</Code><Message>Not found</Message></Error>`,
        { status: 404, headers: { "content-type": "application/xml" } },
      );
    }

    if (req.method === "PUT" && key) {
      const ifNoneMatch = req.headers.get("if-none-match");
      if (ifNoneMatch === "*" && storage.has(key)) {
        await req.arrayBuffer();
        return new Response(
          `<?xml version="1.0"?><Error><Code>PreconditionFailed</Code><Message>At least one of the pre-conditions you specified did not hold</Message></Error>`,
          { status: 412, headers: { "content-type": "application/xml" } },
        );
      }
      const body = new Uint8Array(await req.arrayBuffer());
      storage.set(key, body);
      return new Response(null, {
        status: 200,
        headers: { etag: '"abc123"' },
      });
    }

    if (req.method === "HEAD") {
      return new Response(null, { status: 200 });
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

// AWS SDK connection pooling triggers Deno's resource leak detector.
Deno.test({
  name: "registerNamespace writes .namespace.json to bucket",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint, storage } = createMockS3Server();
    const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        region: "us-east-1",
        endpoint,
        forcePathStyle: true,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");

      const raw = storage.get("infra/.namespace.json");
      assertEquals(raw !== undefined, true);
      const manifest = JSON.parse(new TextDecoder().decode(raw!));
      assertEquals(manifest.namespace, "infra");
      assertEquals(manifest.repoId, "repo-aaa");
      assertEquals(typeof manifest.registeredAt, "string");
    } finally {
      if (originalKey) {
        Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
      } else {
        Deno.env.delete("AWS_ACCESS_KEY_ID");
      }
      if (originalSecret) {
        Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
      } else {
        Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      }
      await server.shutdown();
    }
  },
});

// AWS SDK connection pooling triggers Deno's resource leak detector.
Deno.test({
  name: "registerNamespace re-registration with same repoId succeeds",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockS3Server();
    const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        region: "us-east-1",
        endpoint,
        forcePathStyle: true,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
    } finally {
      if (originalKey) {
        Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
      } else {
        Deno.env.delete("AWS_ACCESS_KEY_ID");
      }
      if (originalSecret) {
        Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
      } else {
        Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      }
      await server.shutdown();
    }
  },
});

// AWS SDK connection pooling triggers Deno's resource leak detector.
Deno.test({
  name: "registerNamespace throws conflict when different repoId",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockS3Server();
    const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        region: "us-east-1",
        endpoint,
        forcePathStyle: true,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
      await assertRejects(
        () => provider.registerNamespace!("/tmp/ds", "infra", "repo-bbb"),
        Error,
        "already registered by repo repo-aaa",
      );
    } finally {
      if (originalKey) {
        Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
      } else {
        Deno.env.delete("AWS_ACCESS_KEY_ID");
      }
      if (originalSecret) {
        Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
      } else {
        Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      }
      await server.shutdown();
    }
  },
});

// AWS SDK connection pooling triggers Deno's resource leak detector.
Deno.test({
  name: "listNamespaces returns empty array when no namespaces registered",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockS3Server();
    const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        region: "us-east-1",
        endpoint,
        forcePathStyle: true,
      });

      const result = await provider.listNamespaces!("/tmp/ds");
      assertEquals(result, []);
    } finally {
      if (originalKey) {
        Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
      } else {
        Deno.env.delete("AWS_ACCESS_KEY_ID");
      }
      if (originalSecret) {
        Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
      } else {
        Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      }
      await server.shutdown();
    }
  },
});

// AWS SDK connection pooling triggers Deno's resource leak detector.
Deno.test({
  name: "listNamespaces returns registered namespace slugs",
  sanitizeResources: false,
  fn: async () => {
    const { server, endpoint } = createMockS3Server();
    const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    Deno.env.set("AWS_ACCESS_KEY_ID", "test");
    Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

    try {
      const provider = datastore.createProvider({
        bucket: "test-bucket",
        region: "us-east-1",
        endpoint,
        forcePathStyle: true,
      });

      await provider.registerNamespace!("/tmp/ds", "infra", "repo-aaa");
      await provider.registerNamespace!("/tmp/ds", "staging", "repo-bbb");

      const result = await provider.listNamespaces!("/tmp/ds");
      assertEquals(result.sort(), ["infra", "staging"]);
    } finally {
      if (originalKey) {
        Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
      } else {
        Deno.env.delete("AWS_ACCESS_KEY_ID");
      }
      if (originalSecret) {
        Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
      } else {
        Deno.env.delete("AWS_SECRET_ACCESS_KEY");
      }
      await server.shutdown();
    }
  },
});

// --- swamp-club#3395 / #3492: datastore-wide control plane and storage/1 ---
//
// Both suites run against the in-process S3 emulator here, so they run in
// every verification. The same suites run against a real S3-compatible
// endpoint (ministack) when SWAMP_TEST_S3_ENDPOINT and SWAMP_TEST_S3_BUCKET
// are set; see the cases at the end.
//
// sanitizeResources: false throughout: the AWS SDK's keep-alive connection
// pool outlives each test body.

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
    const cacheDir = await Deno.makeTempDir({ prefix: "s3-cp-conformance-" });
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
    region: "us-east-1",
    endpoint,
    forcePathStyle: true,
  }) as ReturnType<typeof datastore.createProvider> & ConformanceProvider;
}

function chunkObjectKey(namespace: string, sha256: string): string {
  return `_blobs/${namespace}/sha256/${sha256.slice(0, 2)}/${sha256}`;
}

function backdate(state: S3EmulatorState) {
  return (namespace: string, sha256: string, date: Date) => {
    const object = state.objects.get(chunkObjectKey(namespace, sha256));
    if (!object) {
      return Promise.reject(new Error(`no chunk ${namespace}/${sha256}`));
    }
    object.lastModified = date;
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
    "writable datastore-wide control plane conformance, namespaced push included (S3 emulator)",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (_s3, state, endpoint) => {
      await runWritableControlPlaneConformance(
        emulatorProvider(endpoint),
        (namespace) => {
          state.objects.set(`${namespace}/.datastore-index.json`, {
            body: legacyIndex(),
            etag: crypto.randomUUID().replaceAll("-", ""),
            lastModified: new Date(),
          });
          return Promise.resolve();
        },
      );
    });
  },
});

Deno.test({
  name: "storage/1 conformance (S3 emulator)",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (_s3, state, endpoint) => {
      const provider = emulatorProvider(endpoint);
      await assertStorageConformance(
        () => provider.storage!() as ConformanceDatastoreStorage,
        { setLastModified: backdate(state) },
      );
    });
  },
});

// --- the same suites against a real S3-compatible endpoint (ministack) ---
//
// Set SWAMP_TEST_S3_ENDPOINT (e.g. http://localhost:4566) and
// SWAMP_TEST_S3_BUCKET (an existing bucket). Each run uses a fresh prefix, so
// the namespaced-push case always starts from an empty datastore root.
// Credentials come from the environment; when none are set, dummy ones are
// used and removed afterwards. The lastModified-refresh checks of the storage
// suite are skipped there: a real endpoint cannot backdate an object.

const realEndpoint = Deno.env.get("SWAMP_TEST_S3_ENDPOINT");
const realBucket = Deno.env.get("SWAMP_TEST_S3_BUCKET");

async function withRealEndpoint(
  fn: (config: {
    bucket: string;
    prefix: string;
    region: string;
    endpoint: string;
    forcePathStyle: boolean;
  }) => Promise<void>,
): Promise<void> {
  const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
  if (priorKey === undefined) Deno.env.set("AWS_ACCESS_KEY_ID", "test");
  if (priorSecret === undefined) Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");
  try {
    await fn({
      bucket: realBucket!,
      prefix: `swamp-conformance-${crypto.randomUUID().slice(0, 8)}`,
      region: Deno.env.get("AWS_REGION") ?? "us-east-1",
      endpoint: realEndpoint!,
      forcePathStyle: true,
    });
  } finally {
    if (priorKey === undefined) Deno.env.delete("AWS_ACCESS_KEY_ID");
    if (priorSecret === undefined) Deno.env.delete("AWS_SECRET_ACCESS_KEY");
  }
}

Deno.test({
  name:
    "writable datastore-wide control plane conformance (SWAMP_TEST_S3_ENDPOINT, ministack)",
  ignore: !realEndpoint || !realBucket,
  sanitizeResources: false,
  fn: async () => {
    await withRealEndpoint(async (config) => {
      const provider = datastore.createProvider(config) as
        & ReturnType<typeof datastore.createProvider>
        & ConformanceProvider;
      const s3 = new S3Client(config);
      await runWritableControlPlaneConformance(provider, async (namespace) => {
        await s3.putObject(`${namespace}/.datastore-index.json`, legacyIndex());
      });
    });
  },
});

Deno.test({
  name: "storage/1 conformance (SWAMP_TEST_S3_ENDPOINT, ministack)",
  ignore: !realEndpoint || !realBucket,
  sanitizeResources: false,
  fn: async () => {
    await withRealEndpoint(async (config) => {
      const provider = datastore.createProvider(config);
      await assertStorageConformance(
        () => provider.storage!() as ConformanceDatastoreStorage,
      );
    });
  },
});

Deno.test({
  name:
    "a namespaced push into an upgraded namespace leaves writer/ and lineage/ records at the root (swamp-club#3482)",
  sanitizeResources: false,
  fn: async () => {
    await withS3Emulator({}, async (_client, state, endpoint) => {
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
        etag: crypto.randomUUID().replaceAll("-", ""),
        lastModified: new Date(),
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

/** A provider's replicaTarget(), for a config that may carry any field. */
function replicaTargetFor(config: Record<string, unknown>) {
  const provider = datastore.createProvider({ bucket: "my-bucket", ...config });
  const target = provider.replicaTarget!();
  if (target.type !== "s3") throw new Error(`expected s3, got ${target.type}`);
  return target;
}

Deno.test("replicaTarget: bucket and prefix, nothing else, by default", () => {
  assertEquals(replicaTargetFor({}), {
    type: "s3",
    bucket: "my-bucket",
    prefix: "",
  });
  assertEquals(replicaTargetFor({ prefix: "swamp" }).prefix, "swamp");
  assertEquals(
    replicaTargetFor({ prefix: "team/prod/swamp" }).prefix,
    "team/prod/swamp",
  );
});

Deno.test("replicaTarget: region only when it is set and non-empty", () => {
  assertEquals(
    replicaTargetFor({ region: "eu-west-1" }),
    { type: "s3", bucket: "my-bucket", prefix: "", region: "eu-west-1" },
  );
  assertEquals("region" in replicaTargetFor({ region: "" }), false);
});

Deno.test("replicaTarget: an endpoint always states path style", () => {
  const endpoint = "https://nyc3.digitaloceanspaces.com";
  // The SDK leaves path style off when it is unset, while an unset
  // forcePathStyle in a target means on whenever there is an endpoint, so
  // the target must say false.
  assertEquals(replicaTargetFor({ endpoint }), {
    type: "s3",
    bucket: "my-bucket",
    prefix: "",
    endpoint,
    forcePathStyle: false,
  });
  assertEquals(
    replicaTargetFor({ endpoint, forcePathStyle: true }).forcePathStyle,
    true,
  );
  assertEquals(
    replicaTargetFor({ endpoint, forcePathStyle: false }).forcePathStyle,
    false,
  );
  // Without an endpoint, path style is not part of the target.
  assertEquals(
    "forcePathStyle" in replicaTargetFor({ forcePathStyle: true }),
    false,
  );
});

Deno.test("replicaTarget: every target it returns is one swamp accepts", () => {
  const configs: Record<string, unknown>[] = [
    {},
    { prefix: "a" },
    { prefix: "a/b/c", region: "us-east-1" },
    { endpoint: "http://127.0.0.1:9000", forcePathStyle: true },
    { endpoint: "https://s3.example.com/", region: "auto" },
  ];
  for (const config of configs) {
    const target = replicaTargetFor(config);
    assertEquals(
      replicaTargetProblem(target),
      undefined,
      JSON.stringify(config),
    );
  }
});

Deno.test("replicaTarget: refuses a prefix it cannot express, without echoing it", () => {
  // Each refused prefix carries a marker that must not reach the message.
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
    assert(
      err.message.includes("cannot host v3 replication"),
      `${prefix}: ${err.message}`,
    );
    assert(!err.message.includes(marker), `${prefix} leaked: ${err.message}`);
    assert(replicaPrefixProblem(prefix) !== undefined);
  }
});

Deno.test("replicaTarget: refuses an endpoint Litestream cannot use, without echoing it", () => {
  const refused = [
    "ftp://s3.example.com",
    "https://key:secret@s3.example.com",
    "https://s3.example.com/?x-id=1",
    "https://s3.example.com/#frag",
  ];
  for (const endpoint of refused) {
    const err = assertThrows(() => replicaTargetFor({ endpoint }), Error);
    assert(!err.message.includes(endpoint), `${endpoint} leaked`);
    assert(!err.message.includes("secret"), `credentials leaked`);
    assert(replicaEndpointProblem(endpoint) !== undefined);
  }
  assertEquals(replicaEndpointProblem("https://s3.example.com"), undefined);
});

Deno.test("replicaTarget: synchronous, and carries no credentials", () => {
  const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  Deno.env.set("AWS_ACCESS_KEY_ID", "AKIA-should-not-appear");
  try {
    const target = replicaTargetFor({
      prefix: "p",
      region: "us-east-1",
      endpoint: "https://s3.example.com",
    });
    assertEquals(typeof (target as { then?: unknown }).then, "undefined");
    assert(!JSON.stringify(target).includes("AKIA"));
  } finally {
    if (priorKey !== undefined) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
    else Deno.env.delete("AWS_ACCESS_KEY_ID");
  }
});

async function runReplicaTargetConformance(
  config: Record<string, unknown> & { bucket: string },
  objectExists: (key: string) => Promise<boolean>,
): Promise<void> {
  const provider = datastore.createProvider(config);
  await assertReplicaTargetConformance({
    replicaTarget: () => provider.replicaTarget!(),
    bucket: config.bucket,
    openStorage: () => provider.storage!() as ConformanceDatastoreStorage,
    openDatastoreStore: () =>
      provider.datastoreControlPlaneStore!() as ConformanceWritableStore,
    objectExists,
  });
}

for (const prefix of [undefined, "swamp", "team/prod/swamp"]) {
  Deno.test({
    name: `replica target conformance, prefix ${
      prefix ?? "(none)"
    } (S3 emulator)`,
    sanitizeResources: false,
    fn: async () => {
      await withS3Emulator({}, async (_s3, state, endpoint) => {
        await runReplicaTargetConformance(
          {
            bucket: "test-bucket",
            region: "us-east-1",
            endpoint,
            forcePathStyle: true,
            ...(prefix !== undefined ? { prefix } : {}),
          },
          (key) => Promise.resolve(state.objects.has(key)),
        );
      });
    },
  });
}

Deno.test({
  name: "replica target conformance (SWAMP_TEST_S3_ENDPOINT, ministack)",
  ignore: !realEndpoint || !realBucket,
  sanitizeResources: false,
  fn: async () => {
    await withRealEndpoint(async (config) => {
      const s3 = new S3Client({ ...config, prefix: undefined });
      await runReplicaTargetConformance(
        config,
        async (key) => (await s3.headObject(key)).exists,
      );
    });
  },
});

// --- the same target, replicated by Litestream (run by hand) ---
//
// Litestream is not installed where verification runs, and verification's
// datastores target grants no --allow-run, so this check only runs by hand,
// against ministack:
//
//   SWAMP_TEST_S3_ENDPOINT=http://localhost:4566 SWAMP_TEST_S3_BUCKET=<bucket> \
//   SWAMP_TEST_LITESTREAM_BIN=<path to litestream 0.5.x> \
//   deno test --allow-read --allow-write --allow-env --allow-net --allow-sys \
//     --allow-run extensions/datastores/s3_test.ts --filter Litestream
//
// It writes Litestream's config the way swamp does (replication_files.ts)
// from replicaTarget(), with the replica path swamp builds (replicaPathFor:
// the prefix, then _litestream and the fence padded to 12 digits). GCS has
// no equivalent: the only local GCS is an emulator, which needs apiEndpoint,
// and replicaTarget() refuses apiEndpoint.

const litestreamBin = Deno.env.get("SWAMP_TEST_LITESTREAM_BIN");

function runPermitted(): boolean {
  try {
    return Deno.permissions.querySync({ name: "run" }).state === "granted";
  } catch {
    return false;
  }
}

Deno.test({
  name:
    "Litestream replicates under <prefix>/_litestream/ from replicaTarget()",
  ignore: !realEndpoint || !realBucket || !litestreamBin || !runPermitted(),
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    const { DatabaseSync } = await import("node:sqlite");
    await withRealEndpoint(async (config) => {
      const target = datastore.createProvider(config).replicaTarget!();
      if (target.type !== "s3") throw new Error("expected an s3 target");
      const replicaPath = [target.prefix, "_litestream", "000000000001"]
        .filter((s) => s !== "").join("/");
      const dir = await Deno.makeTempDir({ prefix: "litestream-target-" });
      try {
        const dbPath = `${dir}/commits.db`;
        const db = new DatabaseSync(dbPath);
        db.exec("PRAGMA journal_mode=WAL");
        db.exec("CREATE TABLE t (x INTEGER)");
        db.exec("INSERT INTO t VALUES (1)");
        db.close();
        const q = (v: string) => JSON.stringify(v);
        const lines = [
          "dbs:",
          `  - path: ${q(dbPath)}`,
          "    replica:",
          "      type: s3",
          `      path: ${q(replicaPath)}`,
          `      bucket: ${q(target.bucket)}`,
        ];
        if (target.region !== undefined) {
          lines.push(`      region: ${q(target.region)}`);
        }
        if (target.endpoint !== undefined) {
          lines.push(`      endpoint: ${q(target.endpoint)}`);
          lines.push(
            `      force-path-style: ${target.forcePathStyle ?? true}`,
          );
        }
        const configPath = `${dir}/litestream.yml`;
        await Deno.writeTextFile(configPath, lines.join("\n") + "\n");
        const child = new Deno.Command(litestreamBin!, {
          args: ["replicate", "-config", configPath],
          stdout: "null",
          stderr: "piped",
        }).spawn();
        const s3 = new S3Client({ ...config, prefix: undefined });
        let found: string[] = [];
        try {
          const deadline = Date.now() + 30_000;
          while (Date.now() < deadline && found.length === 0) {
            await new Promise((r) => setTimeout(r, 500));
            found = (await s3.listAllObjects(`${replicaPath}/`))
              .map((e) => e.key);
          }
        } finally {
          child.kill("SIGTERM");
          await child.output();
        }
        assert(
          found.length > 0,
          `Litestream wrote nothing under ${replicaPath}/`,
        );
      } finally {
        await Deno.remove(dir, { recursive: true });
      }
    });
  },
});

// --- swamp-club#3531: replicaPaths() for v3 lineage path collection ---

async function runReplicaPathConformance(
  config: Record<string, unknown> & { bucket: string },
  bucket: {
    write: (key: string, bytes: Uint8Array) => Promise<void>;
    remove: (key: string) => Promise<void>;
    exists: (key: string) => Promise<boolean>;
  },
  objectsPerFence?: number,
): Promise<void> {
  const provider = datastore.createProvider(config);
  await assertReplicaPathConformance({
    replicaTarget: () => provider.replicaTarget!(),
    openReplicaPaths: () => provider.replicaPaths!(),
    openStorage: () => provider.storage!() as ConformanceDatastoreStorage,
    writeObject: bucket.write,
    deleteObject: bucket.remove,
    objectExists: bucket.exists,
    objectsPerFence,
  });
}

for (
  const [label, prefix, maxKeys] of [
    ["prefix (none)", undefined, undefined],
    ["nested prefix", "team/prod/swamp", undefined],
    // Two keys a page, so removePath and list must page.
    ["listing pages of two keys", "swamp", 2],
  ] as const
) {
  Deno.test({
    name: `replica path conformance, ${label} (S3 emulator)`,
    sanitizeResources: false,
    fn: async () => {
      await withS3Emulator({ maxKeys }, async (_s3, state, endpoint) => {
        await runReplicaPathConformance(
          {
            bucket: "test-bucket",
            region: "us-east-1",
            endpoint,
            forcePathStyle: true,
            ...(prefix !== undefined ? { prefix } : {}),
          },
          {
            write: (key, bytes) => {
              state.objects.set(key, {
                body: bytes,
                etag: crypto.randomUUID().replaceAll("-", ""),
                lastModified: new Date(),
              });
              return Promise.resolve();
            },
            remove: (key) => {
              state.objects.delete(key);
              return Promise.resolve();
            },
            exists: (key) => Promise.resolve(state.objects.has(key)),
          },
          maxKeys === undefined ? undefined : 5,
        );
      });
    },
  });
}

Deno.test({
  name: "replica path conformance (SWAMP_TEST_S3_ENDPOINT, ministack)",
  ignore: !realEndpoint || !realBucket,
  sanitizeResources: false,
  fn: async () => {
    await withRealEndpoint(async (config) => {
      const s3 = new S3Client({ ...config, prefix: undefined });
      await runReplicaPathConformance(config, {
        write: async (key, bytes) => {
          await s3.putObject(key, bytes);
        },
        remove: (key) => s3.deleteObject(key),
        exists: async (key) => (await s3.headObject(key)).exists,
      });
    });
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
  const store = new S3ReplicaPathStore(client);
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
  const store = new S3ReplicaPathStore(client);
  await store.removePath("000000000001", new AbortController().signal);
  assertEquals(client.calls, ["list _litestream/000000000001/"]);
});

Deno.test("replicaPaths: list returns fence names only, without slashes", async () => {
  const client = fakeReplicaClient([
    "_litestream/000000000001/snapshot",
    "_litestream/000000000002/ltx/0/1",
    "_litestream/stray-object",
  ]);
  const store = new S3ReplicaPathStore(client);
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
  const store = new S3ReplicaPathStore(client);
  const err = await assertRejects(
    () => store.removePath("000000000001", new AbortController().signal),
    Error,
  );
  assertStringIncludes(err.message, "still listed after it was deleted");
});
