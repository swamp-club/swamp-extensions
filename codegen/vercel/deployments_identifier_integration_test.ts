// Integration test: a generated deployments-shaped Vercel model against a
// mock Vercel API server (swamp-club #2843). Get, adopt and create return the
// deployment's `id`, while list items (used by lookup) carry only `uid`, so
// sync must work from state written by any of them. Lookup filters on list
// item fields: `project` is matched against the item's `projectId`.

import { assertEquals, assertRejects } from "@std/assert";
import { generateVercelExtensionModel } from "./extensionModelGenerator.ts";
import { generateVercelLibFile } from "./libGenerator.ts";
import type { VercelResource } from "./pipeline.ts";

// ---------------------------------------------------------------------------
// Stateful mock Vercel API server
// ---------------------------------------------------------------------------

const BASE = "/v13/deployments";
const LIST = "/v7/deployments";

function createMockVercelServer() {
  // Deployments by id, in the shape the read endpoint returns (no uid).
  const records = new Map<string, Record<string, unknown>>();
  const requests: string[] = [];

  const server = Deno.serve(
    { port: 0, onListen: () => {} },
    async (req) => {
      const url = new URL(req.url);
      requests.push(`${req.method} ${url.pathname}`);

      if (req.method === "POST" && url.pathname === BASE) {
        const body = await req.json();
        const created = {
          id: "dpl_new",
          name: body.name,
          projectId: "prj_1",
          readyState: "QUEUED",
        };
        records.set("dpl_new", created);
        return Response.json(created);
      }
      if (req.method === "GET" && url.pathname === LIST) {
        // List items carry uid, not id.
        const deployments = [...records.values()].map(({ id, ...rest }) => ({
          uid: id,
          ...rest,
        }));
        return Response.json({ deployments, pagination: {} });
      }
      if (req.method === "GET" && url.pathname.startsWith(`${BASE}/`)) {
        const id = decodeURIComponent(url.pathname.slice(BASE.length + 1));
        const record = records.get(id);
        return record
          ? Response.json(record)
          : Response.json({ error: { code: "not_found" } }, { status: 404 });
      }
      return new Response("unexpected request", { status: 500 });
    },
  );

  return {
    port: server.addr.port,
    close: () => server.shutdown(),
    records,
    requests,
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

// Mirrors what the pipeline builds for /v13/deployments: the read identifier
// is `id` and list items carry `uid` and `projectId`.
const deployments: VercelResource = {
  resourcePath: "deployments",
  service: "deployments",
  modelSlug: "deployments",
  fileName: "deployments.ts",
  displayName: "Deployments",
  basePath: BASE,
  idPath: `${BASE}/{idOrUrl}`,
  createPath: BASE,
  createMethod: "POST",
  listPath: LIST,
  readBasePath: BASE,
  hasIndividualRead: true,
  updateBasePath: null,
  deleteBasePath: null,
  createProperties: {
    name: { type: "string" },
    project: { type: "string" },
    gitAccessToken: { type: "string", sensitive: true },
  },
  updateProperties: {},
  resourceProperties: { id: { type: "string" } },
  createRequiredProperties: ["name"],
  handlers: { create: true, read: true, update: false, delete: false },
  updateMethod: "PATCH",
  identifyingField: "id",
  listIdentifyingField: "uid",
  listItemProperties: ["uid", "name", "projectId", "readyState"],
  idParam: "idOrUrl",
  namingField: "name",
  syntheticName: false,
  createOnlyProperties: new Set(["project", "gitAccessToken"]),
  paginationStyle: "cursor",
  paginationCursorParam: "until",
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
    resource: deployments,
    extensionName: "@swamp/vercel/deployments",
    version: "2026.01.01.1",
  }).replaceAll(`from "./_lib/vercel.ts"`, `from "${libDir}/vercel.ts"`);
  const modelPath = `${tmpDir}/extensions/models/deployments.ts`;
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
      modelType: "@swamp/vercel/deployments/deployments",
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
    stored(instanceName: string): Record<string, unknown> {
      const bytes = artifacts.get(instanceName);
      if (!bytes) throw new Error(`no state for ${instanceName}`);
      return JSON.parse(new TextDecoder().decode(bytes));
    },
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
  name: "deployments: sync works on state written by adopt (id, no uid)",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      server.records.set("dpl_1", {
        id: "dpl_1",
        name: "site",
        readyState: "BUILDING",
      });
      const { context, stored } = createMockContext({ name: "site" });
      await model.methods.adopt.execute({ id: "dpl_1" }, context);
      assertEquals(stored("site").uid, undefined);

      server.records.set("dpl_1", {
        id: "dpl_1",
        name: "site",
        readyState: "READY",
      });
      await model.methods.sync.execute({}, context);
      assertEquals(stored("site").readyState, "READY");
      assertEquals(server.requests.at(-1), `GET ${BASE}/dpl_1`);
    });
  },
});

// sanitizeResources: false for the same reason as the test above.
Deno.test({
  name: "deployments: sync works on state written by create",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      const { context, stored } = createMockContext({ name: "site" });
      await model.methods.create.execute({}, context);
      assertEquals(stored("site").id, "dpl_new");

      server.records.get("dpl_new")!.readyState = "READY";
      await model.methods.sync.execute({}, context);
      assertEquals(stored("site").readyState, "READY");
    });
  },
});

// sanitizeResources: false for the same reason as the tests above.
Deno.test({
  name:
    "deployments: lookup by project matches projectId, and sync works on its uid-only state",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      server.records.set("dpl_1", {
        id: "dpl_1",
        name: "site",
        projectId: "prj_1",
        readyState: "BUILDING",
      });
      server.records.set("dpl_2", {
        id: "dpl_2",
        name: "site",
        projectId: "prj_2",
        readyState: "READY",
      });
      // gitAccessToken is create-only and secret: it must not be a filter,
      // or lookup could never match.
      const { context, stored } = createMockContext({
        name: "site",
        project: "prj_1",
        gitAccessToken: "ghs_secret",
      });
      await model.methods.lookup.execute({}, context);
      assertEquals(stored("site").uid, "dpl_1");
      assertEquals(stored("site").id, undefined);

      server.records.get("dpl_1")!.readyState = "READY";
      await model.methods.sync.execute({}, context);
      assertEquals(stored("site").id, "dpl_1");
      assertEquals(stored("site").readyState, "READY");
    });
  },
});

// sanitizeResources: false for the same reason as the tests above.
Deno.test({
  name:
    "deployments: lookup with no match names the filters but not the secret",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (_server, model) => {
      const { context } = createMockContext({
        name: "site",
        project: "prj_missing",
        gitAccessToken: "ghs_secret",
      });
      const err = await assertRejects(
        () => model.methods.lookup.execute({}, context),
        Error,
        `project="prj_missing" (matched against projectId)`,
      );
      assertEquals(err.message.includes("ghs_secret"), false);
    });
  },
});

// sanitizeResources: false for the same reason as the tests above.
Deno.test({
  name: "deployments: sync of a deleted deployment records not_found by id",
  sanitizeResources: false,
  async fn() {
    await withMockApi(async (server, model) => {
      server.records.set("dpl_1", { id: "dpl_1", name: "site" });
      const { context, stored } = createMockContext({ name: "site" });
      await model.methods.adopt.execute({ id: "dpl_1" }, context);

      server.records.delete("dpl_1");
      await model.methods.sync.execute({}, context);
      assertEquals(stored("site").id, "dpl_1");
      assertEquals(stored("site").status, "not_found");
    });
  },
});
