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

import {
  assert,
  assertEquals,
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  assertDatastoreExportConformance,
  assertVerifierConformance,
} from "@systeminit/swamp-testing";
import type { DatastoreHealthResult } from "./_lib/interfaces.ts";
import {
  assertStorageConformance,
  assertWritableDatastoreControlPlaneStoreConformance,
  type DatastoreStorage as ConformanceDatastoreStorage,
  type DatastoreSyncService as ConformanceDatastoreSyncService,
  type WritableDatastoreControlPlaneStore as ConformanceWritableStore,
} from "@swamp-club/swamp-testing";
import {
  createS3EmulatorHandler,
  type S3EmulatorState,
  withS3Emulator,
} from "./_lib/s3_emulator_test_util.ts";
import { S3Client } from "./_lib/s3_client.ts";
import { datastore } from "./s3.ts";

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
    "/tmp/my-repo/.swamp",
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
