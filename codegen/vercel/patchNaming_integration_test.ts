// Integration test: a generated Vercel PATCH update against a mock Vercel API
// server that, like /v9/projects, rejects a PATCH whose name is the project's
// current name with 409 "already exists" (swamp-club #3231). The update must
// leave an unchanged name out of the body and still send a changed one.

import { assertEquals } from "@std/assert";
import { generateVercelExtensionModel } from "./extensionModelGenerator.ts";
import { generateVercelLibFile } from "./libGenerator.ts";
import type { VercelResource } from "./pipeline.ts";

// ---------------------------------------------------------------------------
// Stateful mock Vercel API server
// ---------------------------------------------------------------------------

const BASE = "/v9/projects";

function createMockVercelServer() {
  const records = new Map<string, Record<string, unknown>>();
  const state = {
    patches: [] as Record<string, unknown>[],
    // Answer PATCH without the name, as a partial response would.
    omitNameInResponse: false,
  };

  const server = Deno.serve(
    { port: 0, onListen: () => {} },
    async (req) => {
      const url = new URL(req.url);
      if (req.method === "POST" && url.pathname === BASE) {
        const body = await req.json();
        const created = { id: "prj_1", ...body };
        records.set("prj_1", created);
        return Response.json(created);
      }
      const id = url.pathname.startsWith(`${BASE}/`)
        ? decodeURIComponent(url.pathname.slice(BASE.length + 1))
        : null;
      if (id !== null && req.method === "PATCH") {
        const body = await req.json();
        state.patches.push(body);
        const record = records.get(id);
        if (!record) {
          return Response.json({ error: { code: "not_found" } }, {
            status: 404,
          });
        }
        if (body.name !== undefined && body.name === record.name) {
          return Response.json({
            error: {
              code: "conflict",
              message: `Project "${body.name}" already exists.`,
            },
          }, { status: 409 });
        }
        const updated = { ...record, ...body };
        records.set(id, updated);
        if (state.omitNameInResponse) {
          const { name: _name, ...partial } = updated;
          return Response.json(partial);
        }
        return Response.json(updated);
      }
      return new Response("unexpected request", { status: 500 });
    },
  );

  return {
    port: server.addr.port,
    close: () => server.shutdown(),
    records,
    get patches() {
      return state.patches;
    },
    set omitNameInResponse(value: boolean) {
      state.omitNameInResponse = value;
    },
  };
}

// ---------------------------------------------------------------------------
// Generated model loader
// ---------------------------------------------------------------------------

interface LoadedModel {
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

const project: VercelResource = {
  resourcePath: "projects",
  service: "projects",
  modelSlug: "projects",
  fileName: "projects.ts",
  displayName: "Projects",
  basePath: BASE,
  idPath: `${BASE}/{idOrName}`,
  createPath: BASE,
  createMethod: "POST",
  listPath: null,
  readBasePath: BASE,
  hasIndividualRead: true,
  updateBasePath: BASE,
  deleteBasePath: BASE,
  createProperties: {
    name: { type: "string" },
    rootDirectory: { type: "string" },
  },
  updateProperties: {
    name: { type: "string" },
    rootDirectory: { type: "string" },
  },
  resourceProperties: {
    id: { type: "string" },
    name: { type: "string" },
    rootDirectory: { type: "string" },
  },
  createRequiredProperties: ["name"],
  handlers: { create: true, read: true, update: true, delete: true },
  updateMethod: "PATCH",
  identifyingField: "id",
  listIdentifyingField: "id",
  listItemProperties: null,
  idParam: "idOrName",
  namingField: "name",
  syntheticName: false,
  createOnlyProperties: new Set<string>(),
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
    resource: project,
    extensionName: "@swamp/vercel/projects",
    version: "2026.01.01.1",
  }).replaceAll(`from "./_lib/vercel.ts"`, `from "${libDir}/vercel.ts"`);
  const modelPath = `${tmpDir}/extensions/models/projects.ts`;
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
      modelType: "@swamp/vercel/projects/projects",
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

function storeState(
  artifacts: Map<string, Uint8Array>,
  instanceName: string,
  data: Record<string, unknown>,
): void {
  artifacts.set(instanceName, new TextEncoder().encode(JSON.stringify(data)));
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
  let cleanup: (() => Promise<void>) | undefined;
  try {
    Deno.env.set("VERCEL_API_BASE", `http://localhost:${server.port}`);
    Deno.env.set("VERCEL_TOKEN", "test-mock-token");
    const imported = await importGeneratedModel();
    cleanup = imported.cleanup;
    await fn(server, imported.model);
  } finally {
    await cleanup?.();
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
  name: "PATCH update leaves an unchanged name out of the body",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      const globalArgs: Record<string, unknown> = { name: "ai-usage" };
      const { context } = createMockContext(globalArgs);
      await model.methods.create.execute({}, context);

      globalArgs.rootDirectory = "site";
      await model.methods.update.execute({}, context);

      assertEquals(server.patches, [{ rootDirectory: "site" }]);
      assertEquals(server.records.get("prj_1")?.rootDirectory, "site");
      assertEquals(server.records.get("prj_1")?.name, "ai-usage");
    });
  },
});

Deno.test({
  name: "PATCH update sends the name when stored state holds a different one",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      server.records.set("prj_1", { id: "prj_1", name: "old-name" });
      const { context, artifacts } = createMockContext({ name: "ai-usage" });
      storeState(artifacts, "ai-usage", { id: "prj_1", name: "old-name" });

      await model.methods.update.execute({}, context);

      assertEquals(server.patches, [{ name: "ai-usage" }]);
      assertEquals(server.records.get("prj_1")?.name, "ai-usage");
    });
  },
});

Deno.test({
  name: "PATCH update sends the name when stored state has none",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      server.records.set("prj_1", { id: "prj_1", name: "old-name" });
      const { context, artifacts } = createMockContext({ name: "ai-usage" });
      storeState(artifacts, "ai-usage", { id: "prj_1" });

      await model.methods.update.execute({}, context);

      assertEquals(server.patches, [{ name: "ai-usage" }]);
    });
  },
});

Deno.test({
  name: "PATCH update with only an unchanged name sends no request",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      const { context, artifacts } = createMockContext({ name: "ai-usage" });
      await model.methods.create.execute({}, context);

      const result = await model.methods.update.execute({}, context);

      assertEquals(server.patches, []);
      assertEquals(result.dataHandles, [{ type: "state", name: "ai-usage" }]);
      assertEquals(
        JSON.parse(new TextDecoder().decode(artifacts.get("ai-usage"))).name,
        "ai-usage",
      );
    });
  },
});

Deno.test({
  name:
    "PATCH update keeps the name in stored state when the response omits it",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      const globalArgs: Record<string, unknown> = { name: "ai-usage" };
      const { context, artifacts } = createMockContext(globalArgs);
      await model.methods.create.execute({}, context);
      server.omitNameInResponse = true;

      globalArgs.rootDirectory = "site";
      await model.methods.update.execute({}, context);
      assertEquals(
        JSON.parse(new TextDecoder().decode(artifacts.get("ai-usage"))).name,
        "ai-usage",
      );

      globalArgs.rootDirectory = "web";
      await model.methods.update.execute({}, context);

      assertEquals(server.patches, [
        { rootDirectory: "site" },
        { rootDirectory: "web" },
      ]);
    });
  },
});
