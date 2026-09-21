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
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  assertDatastoreExportConformance,
  assertVerifierConformance,
} from "@systeminit/swamp-testing";
import type { DatastoreHealthResult } from "./_lib/interfaces.ts";
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
