// Integration test: generated Vercel model global arguments against a mock
// Vercel API server. Create-only required fields are optional in
// GlobalArgsSchema (so model create and get/lookup/sync work without them)
// and enforced by create and by full-replacement PUT updates. The resource is
// shaped like an Edge Config, whose own `slug` collides with the team `slug`
// arg and is exposed as `resourceSlug`.

import { assertEquals, assertRejects } from "@std/assert";
import { generateVercelExtensionModel } from "./extensionModelGenerator.ts";
import { generateVercelLibFile } from "./libGenerator.ts";
import type { VercelResource } from "./pipeline.ts";

// ---------------------------------------------------------------------------
// Stateful mock Vercel API server
// ---------------------------------------------------------------------------

const BASE = "/v1/edge-config";

interface Write {
  method: string;
  query: string;
  body: Record<string, unknown>;
}

function createMockVercelServer() {
  const records = new Map<string, Record<string, unknown>>();
  const state = {
    requests: [] as string[],
    lastWrite: null as Write | null,
  };

  const server = Deno.serve(
    { port: 0, onListen: () => {} },
    async (req) => {
      const url = new URL(req.url);
      state.requests.push(`${req.method} ${url.pathname}`);
      const id = url.pathname.startsWith(`${BASE}/`)
        ? decodeURIComponent(url.pathname.slice(BASE.length + 1))
        : null;

      if (req.method === "POST" && url.pathname === BASE) {
        const body = await req.json();
        state.lastWrite = { method: "POST", query: url.search, body };
        const created = { id: "ecfg_new", slug: body.slug };
        records.set("ecfg_new", created);
        return Response.json(created);
      }
      if (id !== null && req.method === "GET") {
        const record = records.get(id);
        return record
          ? Response.json(record)
          : Response.json({ error: { code: "not_found" } }, { status: 404 });
      }
      if (id !== null && req.method === "PUT") {
        const body = await req.json();
        state.lastWrite = { method: "PUT", query: url.search, body };
        const updated = { id, ...body };
        records.set(id, updated);
        return Response.json(updated);
      }
      return new Response("unexpected request", { status: 500 });
    },
  );

  return {
    port: server.addr.port,
    close: () => server.shutdown(),
    records,
    get requests() {
      return state.requests;
    },
    get lastWrite() {
      return state.lastWrite;
    },
  };
}

// ---------------------------------------------------------------------------
// Generated model loader
// ---------------------------------------------------------------------------

interface LoadedModel {
  globalArguments: { safeParse: (input: unknown) => { success: boolean } };
  methods: Record<
    string,
    {
      execute: (
        args: Record<string, unknown>,
        context: Record<string, unknown>,
      ) => Promise<Record<string, unknown>>;
    }
  >;
}

const edgeConfig: VercelResource = {
  resourcePath: "edge-config",
  service: "edge-config",
  modelSlug: "edge-config",
  fileName: "edge_config.ts",
  displayName: "Edge Config",
  basePath: BASE,
  idPath: `${BASE}/{edgeConfigId}`,
  createPath: BASE,
  createMethod: "POST",
  listPath: null,
  readBasePath: BASE,
  hasIndividualRead: true,
  updateBasePath: BASE,
  deleteBasePath: BASE,
  createProperties: {
    slug: { type: "string" },
    items: { type: "object" },
  },
  updateProperties: { slug: { type: "string" } },
  resourceProperties: { id: { type: "string" }, slug: { type: "string" } },
  createRequiredProperties: ["slug"],
  handlers: { create: true, read: true, update: true, delete: true },
  updateMethod: "PUT",
  identifyingField: "id",
  idParam: "edgeConfigId",
  namingField: "name",
  syntheticName: true,
  createOnlyProperties: new Set(["items"]),
  paginationStyle: "none",
  paginationCursorParam: null,
  parentParams: [],
  bodyTransform: "none",
  responseUnwrapKey: null,
  createResponseStyle: "direct",
};

async function importGeneratedModel(): Promise<{
  model: LoadedModel;
  cleanup: () => Promise<void>;
}> {
  const tmpDir = await Deno.makeTempDir();
  const libDir = `${tmpDir}/extensions/models/_lib`;
  await Deno.mkdir(libDir, { recursive: true });
  await Deno.writeTextFile(`${libDir}/vercel.ts`, generateVercelLibFile());

  const modelCode = generateVercelExtensionModel({
    resource: edgeConfig,
    extensionName: "@swamp/vercel/edge-config",
    version: "2026.01.01.1",
  }).replaceAll(`from "./_lib/vercel.ts"`, `from "${libDir}/vercel.ts"`);
  const modelPath = `${tmpDir}/extensions/models/edge_config.ts`;
  await Deno.writeTextFile(modelPath, modelCode);

  const mod = await import(`file://${modelPath}?v=${crypto.randomUUID()}`);
  return {
    model: mod.model,
    cleanup: () => Deno.remove(tmpDir, { recursive: true }),
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
      modelType: "@swamp/vercel/edge-config/edge-config",
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

// The lib reads VERCEL_API_BASE when it is imported, so it is set before the
// generated model (and its lib) are loaded.
async function withMockApi(
  fn: (
    server: ReturnType<typeof createMockVercelServer>,
    model: LoadedModel,
  ) => Promise<void>,
): Promise<void> {
  const origBase = Deno.env.get("VERCEL_API_BASE");
  const origToken = Deno.env.get("VERCEL_TOKEN");
  const server = createMockVercelServer();
  Deno.env.set("VERCEL_API_BASE", `http://localhost:${server.port}`);
  Deno.env.set("VERCEL_TOKEN", "test-mock-token");
  const { model, cleanup } = await importGeneratedModel();
  try {
    await fn(server, model);
  } finally {
    await cleanup();
    await server.close();
    if (origBase === undefined) Deno.env.delete("VERCEL_API_BASE");
    else Deno.env.set("VERCEL_API_BASE", origBase);
    if (origToken === undefined) Deno.env.delete("VERCEL_TOKEN");
    else Deno.env.set("VERCEL_TOKEN", origToken);
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

// fetch keeps keep-alive connections to the mock server open past the test
// scope, so sanitizeResources: false is required.
Deno.test({
  name:
    "create-required fields: optional in GlobalArgsSchema, enforced by create",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      assertEquals(
        model.globalArguments.safeParse({ name: "cfg" }).success,
        true,
        "GlobalArgsSchema should accept input without create-only fields",
      );
      assertEquals(
        model.globalArguments.safeParse({}).success,
        false,
        "the synthetic name must stay required",
      );

      server.records.set("ecfg_1", { id: "ecfg_1", slug: "cfg" });
      const { context: getCtx, artifacts } = createMockContext({
        name: "cfg",
      });
      await model.methods.get.execute({ id: "ecfg_1" }, getCtx);
      assertEquals(artifacts.size, 1, "get should run without resourceSlug");

      // The team slug is not the Edge Config's slug.
      const { context: createCtx } = createMockContext({
        name: "cfg",
        slug: "my-team",
      });
      const before = server.requests.length;
      await assertRejects(
        () => model.methods.create.execute({}, createCtx),
        Error,
        "create requires global arguments: resourceSlug",
      );
      assertEquals(
        server.requests.length,
        before,
        "create must fail before any API call",
      );
    });
  },
});

// sanitizeResources: false for the same reason as the test above.
Deno.test({
  name:
    "resourceSlug is sent as the body slug; the team slug stays a query param",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      const { context } = createMockContext({
        name: "cfg",
        slug: "my-team",
        resourceSlug: "my-config",
      });
      await model.methods.create.execute({}, context);
      assertEquals(server.lastWrite?.method, "POST");
      assertEquals(server.lastWrite?.body, { slug: "my-config" });
      assertEquals(server.lastWrite?.query, "?slug=my-team");
    });
  },
});

// A full-replacement PUT clears whatever its body leaves out, so an unset
// create-required field is filled from the live resource (not stored state)
// and the update is rejected before the PUT if the live resource lacks it.
// sanitizeResources: false for the same reason as the tests above.
Deno.test({
  name: "PUT update fills create-required fields from the live resource",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      const itemPath = `${BASE}/ecfg_1`;
      // Stored state is stale: the slug was changed outside swamp.
      server.records.set("ecfg_1", { id: "ecfg_1", slug: "renamed" });
      const { context } = createMockContext({ name: "cfg" });
      context.writeResource("state", "cfg", { id: "ecfg_1", slug: "old" });

      await model.methods.update.execute({}, context);
      assertEquals(server.lastWrite?.method, "PUT");
      assertEquals(
        server.lastWrite?.body,
        { slug: "renamed" },
        "an unset create-required field comes from the live resource",
      );

      // resourceSlug set: sent as is, with no live read.
      const { context: setCtx } = createMockContext({
        name: "cfg",
        resourceSlug: "explicit",
      });
      setCtx.writeResource("state", "cfg", { id: "ecfg_1" });
      const before = server.requests.length;
      await model.methods.update.execute({}, setCtx);
      assertEquals(server.lastWrite?.body, { slug: "explicit" });
      assertEquals(
        server.requests.slice(before).filter((r) => r === `GET ${itemPath}`),
        [],
        "no live read when globalArgs set every create-required field",
      );

      // Live resource lacks the field: reject before the PUT.
      server.records.set("ecfg_1", { id: "ecfg_1" });
      const { context: gapCtx } = createMockContext({ name: "cfg" });
      gapCtx.writeResource("state", "cfg", { id: "ecfg_1" });
      const beforeGap = server.requests.length;
      await assertRejects(
        () => model.methods.update.execute({}, gapCtx),
        Error,
        "update requires global arguments: resourceSlug",
      );
      assertEquals(
        server.requests.slice(beforeGap).some((r) => r.startsWith("PUT ")),
        false,
        "update must fail before the PUT",
      );
    });
  },
});
