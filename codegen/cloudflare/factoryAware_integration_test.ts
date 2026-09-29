// Integration test: exercises the factory-aware update/sync identifier
// argument against a mock Cloudflare API server. Validates the full lifecycle:
// create multiple resources → update with identifier → sync with identifier →
// update without identifier (backward compatibility).

import { assertEquals, assertRejects } from "@std/assert";
import { generateCloudflareExtensionModel } from "./extensionModelGenerator.ts";
import { generateCloudflareLibFile } from "./libGenerator.ts";
import type { CloudflareResource } from "./pipeline.ts";

// ---------------------------------------------------------------------------
// Stateful mock Cloudflare API server
// ---------------------------------------------------------------------------

interface MockRecord {
  id: string;
  [key: string]: unknown;
}

function createMockCfServer(): {
  port: number;
  close: () => Promise<void>;
  records: Map<string, MockRecord>;
  readonly requestCount: number;
  readonly lastWrite: { method: string; body: Record<string, unknown> } | null;
  readonly requests: string[];
} {
  const records = new Map<string, MockRecord>();
  const state = {
    requests: [] as string[],
    requestCount: 0,
    lastWrite: null as
      | { method: string; body: Record<string, unknown> }
      | null,
  };

  function cfOk(result: unknown): Response {
    return Response.json({
      success: true,
      errors: [],
      messages: [],
      result,
    });
  }

  function cfError(
    status: number,
    code: number,
    message: string,
  ): Response {
    return Response.json(
      {
        success: false,
        errors: [{ code, message }],
        messages: [],
        result: null,
      },
      { status },
    );
  }

  function cfList(items: unknown[]): Response {
    return Response.json({
      success: true,
      errors: [],
      messages: [],
      result: items,
      result_info: {
        page: 1,
        per_page: 100,
        total_pages: 1,
        count: items.length,
        total_count: items.length,
      },
    });
  }

  const server = Deno.serve(
    { port: 0, onListen: () => {} },
    async (req) => {
      const url = new URL(req.url);
      const path = url.pathname;
      const method = req.method;
      state.requestCount++;
      state.requests.push(`${method} ${path}`);

      const authHeader = req.headers.get("Authorization");
      if (!authHeader?.startsWith("Bearer ")) {
        return cfError(401, 9109, "Invalid access token");
      }

      if (path === "/client/v4/user/tokens/verify" && method === "GET") {
        return cfOk({ id: "test", status: "active" });
      }

      const listMatch = path.match(
        /^\/client\/v4\/zones\/([^/]+)\/dns_records$/,
      );
      const itemMatch = path.match(
        /^\/client\/v4\/zones\/([^/]+)\/dns_records\/([^/]+)$/,
      );

      if (listMatch) {
        if (method === "GET") {
          return cfList([...records.values()]);
        }
        if (method === "POST") {
          const body = await req.json() as Record<string, unknown>;
          const id = crypto.randomUUID().replace(/-/g, "").slice(0, 32);
          const record: MockRecord = { ...body, id };
          records.set(id, record);
          return cfOk(record);
        }
      }

      if (itemMatch) {
        const resourceId = itemMatch[2];

        if (method === "GET") {
          const record = records.get(resourceId);
          if (!record) return cfError(404, 81044, "Record not found");
          return cfOk(record);
        }

        if (method === "PATCH" || method === "PUT") {
          const body = await req.json() as Record<string, unknown>;
          state.lastWrite = { method, body };
          const record = records.get(resourceId);
          if (!record) return cfError(404, 81044, "Record not found");
          // PUT replaces the record; PATCH merges into it.
          const updated: MockRecord = method === "PUT"
            ? { ...body, id: resourceId }
            : { ...record, ...body, id: resourceId };
          records.set(resourceId, updated);
          return cfOk(updated);
        }

        if (method === "DELETE") {
          const existed = records.has(resourceId);
          if (!existed) return cfError(404, 81044, "Record not found");
          records.delete(resourceId);
          return cfOk({ id: resourceId });
        }
      }

      return cfError(404, 7003, "Could not route to requested endpoint");
    },
  );

  const addr = server.addr as Deno.NetAddr;
  return {
    port: addr.port,
    close: () => server.shutdown(),
    records,
    get requestCount() {
      return state.requestCount;
    },
    get lastWrite() {
      return state.lastWrite;
    },
    get requests() {
      return state.requests;
    },
  };
}

// ---------------------------------------------------------------------------
// Generate and import model + lib
// ---------------------------------------------------------------------------

async function importGeneratedModel(
  _mockPort: number,
  opts: { putUpdate?: boolean } = {},
): Promise<{
  model: {
    globalArguments: {
      safeParse: (input: unknown) => { success: boolean };
    };
    methods: Record<
      string,
      {
        execute: (
          args: Record<string, unknown>,
          context: Record<string, unknown>,
        ) => Promise<Record<string, unknown>>;
      }
    >;
  };
  cleanup: () => Promise<void>;
}> {
  const tmpDir = await Deno.makeTempDir();
  const libDir = `${tmpDir}/extensions/models/_lib`;
  await Deno.mkdir(libDir, { recursive: true });

  const libCode = generateCloudflareLibFile();
  await Deno.writeTextFile(`${libDir}/cloudflare.ts`, libCode);

  const resource: CloudflareResource = {
    displayName: "DNS Record",
    scope: "zone",
    basePath: "/zones/{zone_id}/dns_records",
    idPath: "/zones/{zone_id}/dns_records/{dns_record_id}",
    resourcePath: "dns_records",
    service: "dns",
    modelSlug: "dns_records",
    fileName: "dns_records.ts",
    idParam: "dns_record_id",
    identifyingField: "id",
    namingField: "name",
    syntheticName: false,
    paginationStyle: "page",
    listEndpointSuffix: "",
    updateMethod: opts.putUpdate ? "PUT" : "PATCH",
    handlers: { create: true, read: true, update: true, delete: true },
    createProperties: {
      name: { type: "string", description: "Record name" },
      type: { type: "string", description: "Record type" },
      content: { type: "string", description: "Record content" },
      ttl: { type: "integer", description: "TTL" },
    },
    updateProperties: {
      name: { type: "string", description: "Record name" },
      content: { type: "string", description: "Record content" },
      ttl: { type: "integer", description: "TTL" },
    },
    resourceProperties: {
      id: { type: "string" },
      name: { type: "string" },
      type: { type: "string" },
      content: { type: "string" },
      ttl: { type: "number" },
    },
    createRequiredProperties: ["name", "type", "content"],
    createOnlyProperties: new Set(["type"]),
  };

  let modelCode = generateCloudflareExtensionModel({
    resource,
    extensionName: "@swamp/cloudflare/dns",
    version: "2026.01.01.1",
  });

  modelCode = modelCode.replaceAll(
    `from "./_lib/cloudflare.ts"`,
    `from "${libDir}/cloudflare.ts"`,
  );

  const modelPath = `${tmpDir}/extensions/models/dns_records.ts`;
  await Deno.writeTextFile(modelPath, modelCode);

  const fmt = new Deno.Command("deno", {
    args: ["fmt", "--no-config", tmpDir],
  });
  await fmt.output();

  const mod = await import(
    `file://${modelPath}?v=${crypto.randomUUID()}`
  );

  return {
    model: mod.model,
    cleanup: async () => {
      await Deno.remove(tmpDir, { recursive: true });
    },
  };
}

// ---------------------------------------------------------------------------
// Mock context: simulates swamp's data repository
// ---------------------------------------------------------------------------

function createMockContext(globalArgs: Record<string, unknown>) {
  const artifacts = new Map<string, Uint8Array>();

  return {
    context: {
      globalArgs,
      modelType: "@swamp/cloudflare/dns/dns_records",
      modelId: "test-model",
      dataRepository: {
        getContent(
          _modelType: string,
          _modelId: string,
          instanceName: string,
        ): Uint8Array | null {
          return artifacts.get(instanceName) ?? null;
        },
      },
      writeResource(
        _type: string,
        instanceName: string,
        data: unknown,
      ): { type: string; name: string } {
        artifacts.set(
          instanceName,
          new TextEncoder().encode(JSON.stringify(data)),
        );
        return { type: "state", name: instanceName };
      },
    },
    artifacts,
  };
}

function withTestToken(): () => void {
  const origToken = Deno.env.get("CLOUDFLARE_API_TOKEN");
  const origKey = Deno.env.get("CLOUDFLARE_API_KEY");
  const origEmail = Deno.env.get("CLOUDFLARE_EMAIL");
  Deno.env.set("CLOUDFLARE_API_TOKEN", "test-mock-token");
  Deno.env.delete("CLOUDFLARE_API_KEY");
  Deno.env.delete("CLOUDFLARE_EMAIL");
  return () => {
    if (origToken === undefined) Deno.env.delete("CLOUDFLARE_API_TOKEN");
    else Deno.env.set("CLOUDFLARE_API_TOKEN", origToken);
    if (origKey === undefined) Deno.env.delete("CLOUDFLARE_API_KEY");
    else Deno.env.set("CLOUDFLARE_API_KEY", origKey);
    if (origEmail === undefined) Deno.env.delete("CLOUDFLARE_EMAIL");
    else Deno.env.set("CLOUDFLARE_EMAIL", origEmail);
  };
}

function redirectFetchToMock(
  mockPort: number,
): { restore: () => void } {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    let url: string;
    if (input instanceof Request) {
      url = input.url;
    } else if (input instanceof URL) {
      url = input.toString();
    } else {
      url = input;
    }
    const rewritten = url.replace(
      "https://api.cloudflare.com",
      `http://localhost:${mockPort}`,
    );
    if (input instanceof Request) {
      return originalFetch(new Request(rewritten, input), init);
    }
    return originalFetch(rewritten, init);
  }) as typeof fetch;

  return {
    restore: () => {
      globalThis.fetch = originalFetch;
    },
  };
}

// ---------------------------------------------------------------------------
// Integration tests
// ---------------------------------------------------------------------------

// The generated model dynamically imports the lib which creates connections
// that outlive the test scope. sanitizeResources: false is required.
Deno.test({
  name:
    "factory-aware: update and sync target specific resources by identifier",
  sanitizeResources: false,
  async fn() {
    const restoreToken = withTestToken();
    const server = createMockCfServer();
    const { restore: restoreFetch } = redirectFetchToMock(server.port);

    const rec1Id = "aaaa1111bbbb2222cccc3333dddd4444";
    const rec2Id = "eeee5555ffff6666aaaa7777bbbb8888";
    const rec3Id = "cccc9999dddd0000eeee1111ffff2222";
    server.records.set(rec1Id, {
      id: rec1Id,
      name: "www.example.com",
      type: "A",
      content: "1.2.3.4",
      ttl: 300,
    });
    server.records.set(rec2Id, {
      id: rec2Id,
      name: "api.example.com",
      type: "A",
      content: "5.6.7.8",
      ttl: 300,
    });
    server.records.set(rec3Id, {
      id: rec3Id,
      name: "mail.example.com",
      type: "MX",
      content: "mx.example.com",
      ttl: 3600,
    });

    const { model, cleanup: modelCleanup } = await importGeneratedModel(
      server.port,
    );

    try {
      const globalArgs = { zone_id: "test-zone-id" };

      // --- Step 1: Seed artifacts as if lookup/adopt wrote them ---
      const { context: updateCtx, artifacts } = createMockContext(globalArgs);
      for (const [_id, record] of server.records) {
        updateCtx.writeResource("state", record.name as string, { ...record });
      }
      assertEquals(artifacts.size, 3, "should have 3 seeded artifacts");

      // --- Step 2: Update api.example.com by identifier ---
      await model.methods.update.execute(
        { identifier: "api.example.com" },
        updateCtx,
      );
      const updatedArtifact = JSON.parse(
        new TextDecoder().decode(artifacts.get("api.example.com")!),
      );
      assertEquals(
        updatedArtifact.id,
        rec2Id,
        "update should target the api.example.com record",
      );

      // --- Step 3: Sync mail.example.com by identifier ---
      const { context: syncCtx, artifacts: syncArtifacts } = createMockContext(
        globalArgs,
      );
      for (const [name, data] of artifacts) {
        const content = JSON.parse(new TextDecoder().decode(data));
        syncCtx.writeResource("state", name, content);
      }

      await model.methods.sync.execute(
        { identifier: "mail.example.com" },
        syncCtx,
      );
      const syncedArtifact = JSON.parse(
        new TextDecoder().decode(syncArtifacts.get("mail.example.com")!),
      );
      assertEquals(
        syncedArtifact.id,
        rec3Id,
        "sync should target the mail.example.com record",
      );

      // --- Step 4: Update without identifier falls back to "current" ---
      const { context: noIdCtx } = createMockContext(globalArgs);
      await assertRejects(
        () => model.methods.update.execute({}, noIdCtx),
        Error,
        "No data found",
        "update without identifier should look for 'current' artifact and fail",
      );

      // --- Step 5: Update with g.name (no identifier) uses g.name ---
      const { context: namedCtx, artifacts: namedArtifacts } =
        createMockContext({
          ...globalArgs,
          name: "www.example.com",
        });
      for (const [name, data] of artifacts) {
        const content = JSON.parse(new TextDecoder().decode(data));
        namedCtx.writeResource("state", name, content);
      }
      await model.methods.update.execute({}, namedCtx);
      const namedArtifact = JSON.parse(
        new TextDecoder().decode(namedArtifacts.get("www.example.com")!),
      );
      assertEquals(
        namedArtifact.id,
        rec1Id,
        "update with g.name should target www.example.com",
      );

      // --- Step 6: g.name takes precedence over identifier ---
      const { context: precedenceCtx, artifacts: precArtifacts } =
        createMockContext({
          ...globalArgs,
          name: "www.example.com",
        });
      for (const [name, data] of artifacts) {
        const content = JSON.parse(new TextDecoder().decode(data));
        precedenceCtx.writeResource("state", name, content);
      }
      await model.methods.update.execute(
        { identifier: "api.example.com" },
        precedenceCtx,
      );
      const precArtifact = JSON.parse(
        new TextDecoder().decode(precArtifacts.get("www.example.com")!),
      );
      assertEquals(
        precArtifact.id,
        rec1Id,
        "g.name should take precedence over args.identifier",
      );
    } finally {
      restoreFetch();
      await modelCleanup();
      await server.close();
      restoreToken();
    }
  },
});

// Create-only required fields are optional in GlobalArgsSchema (so model
// create and get/lookup/sync work with only the scope arg) and enforced by the
// generated create method. sanitizeResources: false for the same reason as the
// test above.
Deno.test({
  name:
    "create-required fields: optional in GlobalArgsSchema, enforced by create",
  sanitizeResources: false,
  async fn() {
    const restoreToken = withTestToken();
    const server = createMockCfServer();
    const { restore: restoreFetch } = redirectFetchToMock(server.port);
    const { model, cleanup: modelCleanup } = await importGeneratedModel(
      server.port,
    );

    try {
      assertEquals(
        model.globalArguments.safeParse({ zone_id: "test-zone-id" }).success,
        true,
        "GlobalArgsSchema should accept input without create-only fields",
      );
      assertEquals(
        model.globalArguments.safeParse({ name: "www.example.com" }).success,
        false,
        "zone_id is the scope arg and must stay required",
      );

      const recId = "aaaa1111bbbb2222cccc3333dddd4444";
      server.records.set(recId, {
        id: recId,
        name: "www.example.com",
        type: "A",
        content: "1.2.3.4",
      });
      const { context: getCtx, artifacts } = createMockContext({
        zone_id: "test-zone-id",
      });
      await model.methods.get.execute({ id: recId }, getCtx);
      assertEquals(artifacts.size, 1, "get should run with only zone_id");

      const { context: createCtx } = createMockContext({
        zone_id: "test-zone-id",
        name: "new.example.com",
      });
      const before = server.requestCount;
      await assertRejects(
        () => model.methods.create.execute({}, createCtx),
        Error,
        "create requires global arguments: content, type",
      );
      assertEquals(
        server.requestCount,
        before,
        "create must fail before any API call",
      );
    } finally {
      restoreFetch();
      await modelCleanup();
      await server.close();
      restoreToken();
    }
  },
});

// A full-replacement PUT update clears whatever the body leaves out. Every
// field globalArgs leave unset is filled from the live resource, not stored
// state, so changes made outside swamp since the last get/sync are kept and
// an unset optional field keeps its value. A create-required field missing
// from both is rejected before the PUT.
// sanitizeResources: false for the same reason as the tests above.
Deno.test({
  name: "PUT update fills unset fields from the live resource",
  sanitizeResources: false,
  async fn() {
    const restoreToken = withTestToken();
    const server = createMockCfServer();
    const { restore: restoreFetch } = redirectFetchToMock(server.port);
    const { model, cleanup: modelCleanup } = await importGeneratedModel(
      server.port,
      { putUpdate: true },
    );

    const recId = "aaaa1111bbbb2222cccc3333dddd4444";
    const itemPath = `/client/v4/zones/test-zone-id/dns_records/${recId}`;

    try {
      // Stored state is stale: the record was renamed and repointed outside
      // swamp after the last get/sync.
      server.records.set(recId, {
        id: recId,
        name: "renamed.example.com",
        type: "A",
        content: "9.9.9.9",
        ttl: 300,
      });
      const { context, artifacts } = createMockContext({
        zone_id: "test-zone-id",
        ttl: 600,
      });
      context.writeResource("state", "www.example.com", {
        id: recId,
        name: "www.example.com",
        type: "A",
        content: "1.2.3.4",
        ttl: 300,
      });

      await model.methods.update.execute(
        { identifier: "www.example.com" },
        context,
      );
      assertEquals(server.lastWrite?.method, "PUT");
      assertEquals(
        server.lastWrite?.body,
        { name: "renamed.example.com", content: "9.9.9.9", ttl: 600 },
        "unset create-required fields come from the live resource, not stale state",
      );
      assertEquals(artifacts.size, 1);

      // An unset optional field keeps its live value instead of being
      // cleared by the PUT.
      const { context: optCtx } = createMockContext({
        zone_id: "test-zone-id",
        content: "5.5.5.5",
      });
      optCtx.writeResource("state", "www.example.com", { id: recId });
      await model.methods.update.execute(
        { identifier: "www.example.com" },
        optCtx,
      );
      assertEquals(
        server.lastWrite?.body,
        { name: "renamed.example.com", content: "5.5.5.5", ttl: 600 },
        "unset optional ttl is kept from the live resource",
      );

      // Every update-body field set in globalArgs: no extra GET.
      const { context: fullCtx } = createMockContext({
        zone_id: "test-zone-id",
        name: "www.example.com",
        content: "1.2.3.4",
        ttl: 300,
      });
      fullCtx.writeResource("state", "www.example.com", { id: recId });
      const before = server.requests.length;
      await model.methods.update.execute({}, fullCtx);
      assertEquals(
        server.requests.slice(before).filter((r) => r === `GET ${itemPath}`),
        [],
        "no live read when globalArgs supply every update-body field",
      );

      // Live resource lacks a create-required field: reject before the PUT.
      server.records.set(recId, { id: recId, name: "renamed.example.com" });
      const { context: gapCtx } = createMockContext({
        zone_id: "test-zone-id",
      });
      gapCtx.writeResource("state", "current", { id: recId });
      const beforeGap = server.requests.length;
      await assertRejects(
        () => model.methods.update.execute({}, gapCtx),
        Error,
        "update requires global arguments: content",
      );
      assertEquals(
        server.requests.slice(beforeGap).some((r) => r.startsWith("PUT ")),
        false,
        "update must fail before the PUT",
      );
    } finally {
      restoreFetch();
      await modelCleanup();
      await server.close();
      restoreToken();
    }
  },
});
