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
  assertEquals,
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  assertDatastoreExportConformance,
  assertVerifierConformance,
} from "@systeminit/swamp-testing";
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
    // Start a mock S3 server that responds to HeadBucket
    const server = Deno.serve({ port: 0, onListen() {} }, (req) => {
      // HeadBucket is a HEAD request to /{bucket}
      if (req.method === "HEAD") {
        return new Response(null, { status: 200 });
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
      assertEquals(typeof result.latencyMs, "number");

      // Also passes the generic verifier conformance
      await assertVerifierConformance(verifier);
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
