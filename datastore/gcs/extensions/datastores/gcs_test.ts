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
    // Start a mock GCS server that responds to bucket GET
    const server = Deno.serve({ port: 0, onListen() {} }, (req) => {
      const url = new URL(req.url);
      // GCS JSON API: GET /storage/v1/b/{bucket}
      if (req.method === "GET" && url.pathname.includes("/storage/v1/b/")) {
        return new Response(
          JSON.stringify({ kind: "storage#bucket", name: "my-test-bucket" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
      return new Response(null, { status: 404 });
    });

    const addr = server.addr as Deno.NetAddr;
    const endpoint = `http://localhost:${addr.port}`;

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
      assertEquals(typeof result.latencyMs, "number");

      await assertVerifierConformance(verifier);
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

function createMockGcsServer(): {
  server: Deno.HttpServer;
  endpoint: string;
  storage: Map<string, Uint8Array>;
} {
  const storage = new Map<string, Uint8Array>();

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
          generation: "1",
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
          headers: { "x-goog-generation": "1" },
        });
      }
      return new Response(
        JSON.stringify({ error: { code: 404, message: "Not Found" } }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // PUT object: POST /upload/storage/v1/b/{bucket}/o?uploadType=media&name={key}
    if (
      req.method === "POST" &&
      path.match(/\/upload\/storage\/v1\/b\/[^/]+\/o/)
    ) {
      const objectName = url.searchParams.get("name");
      const ifGenMatch = url.searchParams.get("ifGenerationMatch");
      if (ifGenMatch === "0" && objectName && storage.has(objectName)) {
        await req.arrayBuffer();
        return new Response(
          JSON.stringify({
            error: { code: 412, message: "Precondition Failed" },
          }),
          { status: 412, headers: { "Content-Type": "application/json" } },
        );
      }
      if (objectName) {
        const body = new Uint8Array(await req.arrayBuffer());
        storage.set(objectName, body);
      }
      return new Response(
        JSON.stringify({ kind: "storage#object", generation: "1" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    // Bucket check: GET /storage/v1/b/{bucket}
    if (req.method === "GET" && path.match(/\/storage\/v1\/b\/[^/]+$/)) {
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

// Mock GCS server that does NOT enforce ifGenerationMatch=0 preconditions,
// simulating backends like fake-gcs-server that may ignore generation
// preconditions on the upload endpoint.
function createMockGcsServerNoPreconditions(): {
  server: Deno.HttpServer;
  endpoint: string;
  storage: Map<string, Uint8Array>;
} {
  const storage = new Map<string, Uint8Array>();

  const server = Deno.serve({ port: 0, onListen() {} }, async (req) => {
    const url = new URL(req.url);
    const path = url.pathname;

    if (req.method === "GET" && path.match(/\/storage\/v1\/b\/[^/]+\/o$/)) {
      const prefix = url.searchParams.get("prefix") ?? "";
      const items = [...storage.entries()]
        .filter(([k]) => k.startsWith(prefix))
        .map(([k, v]) => ({
          name: k,
          size: String(v.length),
          generation: "1",
          updated: "2026-01-01T00:00:00.000Z",
        }));
      return new Response(JSON.stringify({ kind: "storage#objects", items }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

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
          headers: { "x-goog-generation": "1" },
        });
      }
      return new Response(
        JSON.stringify({ error: { code: 404, message: "Not Found" } }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Ignores ifGenerationMatch — always writes successfully
    if (
      req.method === "POST" &&
      path.match(/\/upload\/storage\/v1\/b\/[^/]+\/o/)
    ) {
      const objectName = url.searchParams.get("name");
      if (objectName) {
        const body = new Uint8Array(await req.arrayBuffer());
        storage.set(objectName, body);
      }
      return new Response(
        JSON.stringify({ kind: "storage#object", generation: "1" }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    if (req.method === "GET" && path.match(/\/storage\/v1\/b\/[^/]+$/)) {
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
    const { server, endpoint } = createMockGcsServerNoPreconditions();

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
    const { server, endpoint } = createMockGcsServerNoPreconditions();

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
    const { server, endpoint } = createMockGcsServerNoPreconditions();

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
