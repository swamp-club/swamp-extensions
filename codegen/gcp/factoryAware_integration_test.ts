// Integration test: exercises the factory-aware update/sync identifier
// argument against a mock GCP API server. Validates the full lifecycle:
// list → update with identifier → sync with identifier → update without
// identifier (backward compatibility).

import { assertEquals, assertRejects } from "@std/assert";
import {
  type GcpExtensionModelInput,
  generateGcpExtensionModel,
} from "./extensionModelGenerator.ts";
import { generateGcpLibFile } from "./libGenerator.ts";
import type { GcpMethodConfig, GcpParsedResource } from "./pipeline.ts";

// ---------------------------------------------------------------------------
// Stateful mock GCP API server
// ---------------------------------------------------------------------------

interface MockInstance {
  name: string;
  zone: string;
  machineType: string;
  status: string;
  fingerprint: string;
}

function createMockGcpServer(): {
  port: number;
  close: () => Promise<void>;
  instances: Map<string, MockInstance>;
  lastRequest: { method: string; path: string; body?: unknown } | null;
  lastWrite: { method: string; body: unknown } | null;
  requestCount: number;
} {
  const instances = new Map<string, MockInstance>();
  const state = {
    instances,
    lastRequest: null as
      | { method: string; path: string; body?: unknown }
      | null,
    lastWrite: null as { method: string; body: unknown } | null,
    requestCount: 0,
  };

  const server = Deno.serve({ port: 0, onListen() {} }, async (req) => {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    state.lastRequest = { method, path };
    state.requestCount++;

    // List instances: GET /compute/v1projects/{project}/zones/{zone}/instances
    // (buildUrl concatenates baseUrl + path without a separator)
    const listMatch = path.match(
      /^\/compute\/v1projects\/[^/]+\/zones\/[^/]+\/instances$/,
    );
    if (listMatch && method === "GET") {
      return Response.json({
        items: [...instances.values()],
      });
    }

    // Get/Patch/Delete instance
    const itemMatch = path.match(
      /^\/compute\/v1projects\/[^/]+\/zones\/[^/]+\/instances\/([^/?]+)/,
    );
    if (itemMatch) {
      const instanceName = itemMatch[1];

      if (method === "GET") {
        const inst = instances.get(instanceName);
        if (!inst) {
          return Response.json(
            { error: { code: 404, message: "Not found" } },
            { status: 404 },
          );
        }
        return Response.json(inst);
      }

      if (method === "PATCH" || method === "PUT") {
        const body = await req.json();
        state.lastRequest.body = body;
        state.lastWrite = { method, body };
        const inst = instances.get(instanceName);
        if (!inst) {
          return Response.json(
            { error: { code: 404, message: "Not found" } },
            { status: 404 },
          );
        }
        const updated = { ...inst, ...body, fingerprint: "new-fp" };
        instances.set(instanceName, updated);
        return Response.json(updated);
      }

      if (method === "DELETE") {
        const existed = instances.has(instanceName);
        instances.delete(instanceName);
        return Response.json(
          existed ? { status: "DONE" } : { status: "NOT_FOUND" },
        );
      }
    }

    return Response.json(
      { error: { code: 404, message: `Unknown route: ${method} ${path}` } },
      { status: 404 },
    );
  });

  return {
    port: server.addr.port,
    close: () => server.shutdown(),
    instances: state.instances,
    get lastRequest() {
      return state.lastRequest;
    },
    get lastWrite() {
      return state.lastWrite;
    },
    get requestCount() {
      return state.requestCount;
    },
  };
}

// ---------------------------------------------------------------------------
// Generate and import model + lib
// ---------------------------------------------------------------------------

function makeMethodConfig(
  overrides: Partial<GcpMethodConfig> & { id: string },
): GcpMethodConfig {
  return {
    path: "",
    httpMethod: "GET",
    parameterOrder: ["project"],
    parameters: { project: { location: "path", required: true } },
    ...overrides,
  };
}

async function importGeneratedModel(
  mockPort: number,
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

  const libCode = generateGcpLibFile().replaceAll(
    "https://compute.googleapis.com",
    `http://localhost:${mockPort}`,
  );
  await Deno.writeTextFile(`${libDir}/gcp.ts`, libCode);

  const resource: GcpParsedResource = {
    service: "compute",
    apiTitle: "Compute Engine API",
    apiVersion: "v1",
    baseUrl: `http://localhost:${mockPort}/compute/v1`,
    resourcePath: ["instances"],
    typeName: "Google Cloud Compute Engine Instances",
    description: "A compute instance",
    domainProperties: {
      name: { type: "string", description: "Instance name" },
      zone: { type: "string", description: "Zone" },
      machineType: { type: "string", description: "Machine type" },
    },
    resourceValueProperties: {
      name: { type: "string" },
      zone: { type: "string" },
      machineType: { type: "string" },
      status: { type: "string" },
      fingerprint: { type: "string" },
    },
    requiredProperties: ["zone"],
    createRequiredProperties: ["name", "machineType"],
    createOnlyProperties: ["zone"],
    insertProperties: new Set(["name", "zone", "machineType"]),
    updateProperties: new Set(["machineType"]),
    primaryIdentifier: ["name"],
    handlers: { create: true, read: true, update: true, delete: true },
    isGlobalOnly: false,
    hasGlobalEndpoint: false,
    listOnly: false,
    methodConfigs: {
      get: makeMethodConfig({
        id: "compute.instances.get",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: "GET",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
      insert: makeMethodConfig({
        id: "compute.instances.insert",
        path: "projects/{project}/zones/{zone}/instances",
        httpMethod: "POST",
        parameterOrder: ["project", "zone"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
        },
      }),
      [opts.putUpdate ? "update" : "patch"]: makeMethodConfig({
        id: opts.putUpdate
          ? "compute.instances.update"
          : "compute.instances.patch",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: opts.putUpdate ? "PUT" : "PATCH",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
      delete: makeMethodConfig({
        id: "compute.instances.delete",
        path: "projects/{project}/zones/{zone}/instances/{instance}",
        httpMethod: "DELETE",
        parameterOrder: ["project", "zone", "instance"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
          instance: { location: "path", required: true },
        },
      }),
      list: makeMethodConfig({
        id: "compute.instances.list",
        path: "projects/{project}/zones/{zone}/instances",
        httpMethod: "GET",
        parameterOrder: ["project", "zone"],
        parameters: {
          project: { location: "path", required: true },
          zone: { location: "path", required: true },
        },
      }),
    },
    actionMethods: [],
    usesFullResourceName: false,
    oauthScopes: [],
    listResponseArrayField: "items",
    listQueryParams: [],
  };

  const input: GcpExtensionModelInput = {
    resource,
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody: [
        `  name: z.string().describe("Instance name").optional(),`,
        `  zone: z.string().describe("Zone"),`,
        `  machineType: z.string().describe("Machine type").optional(),`,
      ].join("\n"),
      resourceSchemaBody: [
        `  name: z.string().optional(),`,
        `  zone: z.string().optional(),`,
        `  machineType: z.string().optional(),`,
        `  status: z.string().optional(),`,
        `  fingerprint: z.string().optional(),`,
      ].join("\n"),
    },
    onlyProperties: {
      primaryIdentifier: ["name"],
      readOnly: ["status", "fingerprint"],
      writeOnly: [],
      createOnly: ["zone"],
    },
    version: "2026.01.01.1",
    modelType: "@swamp/gcp/compute/instances",
    extensionName: "@swamp/gcp/compute",
  };

  let modelCode = generateGcpExtensionModel(input);
  modelCode = modelCode.replaceAll(
    "https://compute.googleapis.com",
    `http://localhost:${mockPort}`,
  );

  const modelDir = `${tmpDir}/extensions/models`;
  await Deno.writeTextFile(`${modelDir}/instances.ts`, modelCode);

  // Format before import
  const fmt = new Deno.Command("deno", {
    args: ["fmt", "--no-config", tmpDir],
  });
  await fmt.output();

  const mod = await import(
    `file://${modelDir}/instances.ts?v=${crypto.randomUUID()}`
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
      modelType: "@swamp/gcp/compute/instances",
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

// ---------------------------------------------------------------------------
// Integration tests
// ---------------------------------------------------------------------------

// The generated model dynamically imports the lib which creates connections
// that outlive the test scope. sanitizeResources: false is required.
Deno.test({
  name:
    "factory-aware: list writes per-resource artifacts, update targets by identifier",
  sanitizeResources: false,
  async fn() {
    const origToken = Deno.env.get("GCP_ACCESS_TOKEN");
    const origProject = Deno.env.get("GCP_PROJECT");
    Deno.env.set("GCP_ACCESS_TOKEN", "test-token");
    Deno.env.set("GCP_PROJECT", "test-project");

    const server = createMockGcpServer();
    server.instances.set("web-1", {
      name: "web-1",
      zone: "us-central1-a",
      machineType: "n1-standard-1",
      status: "RUNNING",
      fingerprint: "fp-1",
    });
    server.instances.set("web-2", {
      name: "web-2",
      zone: "us-central1-a",
      machineType: "n1-standard-2",
      status: "RUNNING",
      fingerprint: "fp-2",
    });
    server.instances.set("web-3", {
      name: "web-3",
      zone: "us-central1-a",
      machineType: "n1-standard-4",
      status: "RUNNING",
      fingerprint: "fp-3",
    });

    const { model, cleanup: modelCleanup } = await importGeneratedModel(
      server.port,
    );

    try {
      const globalArgs = { zone: "us-central1-a" };

      // --- Step 1: List discovers all instances ---
      const { context: listCtx, artifacts: listArtifacts } = createMockContext(
        globalArgs,
      );
      const listResult = await model.methods.list.execute(
        {},
        listCtx,
      );
      assertEquals(
        (listResult as { result: { count: number } }).result.count,
        3,
      );
      assertEquals(
        listArtifacts.has("web-1"),
        true,
        "list should write artifact for web-1",
      );
      assertEquals(
        listArtifacts.has("web-2"),
        true,
        "list should write artifact for web-2",
      );
      assertEquals(
        listArtifacts.has("web-3"),
        true,
        "list should write artifact for web-3",
      );

      // --- Step 2: Update web-2 by identifier ---
      // Seed the data repo with list-written artifacts
      const { context: updateCtx } = createMockContext(globalArgs);
      for (const [name, data] of listArtifacts) {
        const content = JSON.parse(new TextDecoder().decode(data));
        updateCtx.writeResource("state", name, content);
      }

      await model.methods.update.execute(
        { identifier: "web-2" },
        updateCtx,
      );
      // Verify the API targeted the correct instance
      assertEquals(
        server.lastRequest?.path.includes("/instances/web-2"),
        true,
        "update should target web-2 via the API",
      );

      // --- Step 3: Sync web-3 by identifier ---
      const { context: syncCtx } = createMockContext(globalArgs);
      for (const [name, data] of listArtifacts) {
        const content = JSON.parse(new TextDecoder().decode(data));
        syncCtx.writeResource("state", name, content);
      }

      await model.methods.sync.execute(
        { identifier: "web-3" },
        syncCtx,
      );
      assertEquals(
        server.lastRequest?.path.includes("/instances/web-3"),
        true,
        "sync should target web-3 via the API",
      );

      // --- Step 4: Update without identifier falls back to "current" ---
      const { context: noIdCtx } = createMockContext(globalArgs);
      await assertRejects(
        () => model.methods.update.execute({}, noIdCtx),
        Error,
        "No existing state found",
        "update without identifier should look for 'current' artifact and fail",
      );

      // --- Step 5: Update without identifier but with g.name uses g.name ---
      const { context: namedCtx } = createMockContext({
        ...globalArgs,
        name: "web-1",
      });
      for (const [name, data] of listArtifacts) {
        const content = JSON.parse(new TextDecoder().decode(data));
        namedCtx.writeResource("state", name, content);
      }
      await model.methods.update.execute({}, namedCtx);
      assertEquals(
        server.lastRequest?.path.includes("/instances/web-1"),
        true,
        "update with g.name should target web-1 via the API",
      );
    } finally {
      if (origToken === undefined) Deno.env.delete("GCP_ACCESS_TOKEN");
      else Deno.env.set("GCP_ACCESS_TOKEN", origToken);
      if (origProject === undefined) Deno.env.delete("GCP_PROJECT");
      else Deno.env.set("GCP_PROJECT", origProject);
      await server.close();
      await modelCleanup();
    }
  },
});

// Create-only required fields are optional in GlobalArgsSchema (so list/get/
// delete run without them) and enforced by the generated create method.
// sanitizeResources: false for the same reason as the test above.
Deno.test({
  name:
    "create-required fields: optional in GlobalArgsSchema, enforced by create",
  sanitizeResources: false,
  async fn() {
    const origToken = Deno.env.get("GCP_ACCESS_TOKEN");
    const origProject = Deno.env.get("GCP_PROJECT");
    Deno.env.set("GCP_ACCESS_TOKEN", "test-token");
    Deno.env.set("GCP_PROJECT", "test-project");

    const server = createMockGcpServer();
    const { model, cleanup: modelCleanup } = await importGeneratedModel(
      server.port,
    );

    try {
      assertEquals(
        model.globalArguments.safeParse({ zone: "us-central1-a" }).success,
        true,
        "GlobalArgsSchema should accept input without create-only fields",
      );
      assertEquals(
        model.globalArguments.safeParse({ name: "web-1" }).success,
        false,
        "zone is read by get/list/delete and must stay required",
      );

      const { context } = createMockContext({ zone: "us-central1-a" });
      await assertRejects(
        () => model.methods.create.execute({}, context),
        Error,
        "create requires global arguments: machineType, name",
      );
      assertEquals(
        server.lastRequest,
        null,
        "create should fail before calling the API",
      );
    } finally {
      if (origToken === undefined) Deno.env.delete("GCP_ACCESS_TOKEN");
      else Deno.env.set("GCP_ACCESS_TOKEN", origToken);
      if (origProject === undefined) Deno.env.delete("GCP_PROJECT");
      else Deno.env.set("GCP_PROJECT", origProject);
      await server.close();
      await modelCleanup();
    }
  },
});

// A full-replacement PUT update must still send create-required fields, which
// are optional in GlobalArgsSchema: they are carried from stored state, and
// update fails before the API call when neither source has them.
// sanitizeResources: false for the same reason as the tests above.
Deno.test({
  name: "PUT update carries create-required fields from stored state",
  sanitizeResources: false,
  async fn() {
    const origToken = Deno.env.get("GCP_ACCESS_TOKEN");
    const origProject = Deno.env.get("GCP_PROJECT");
    Deno.env.set("GCP_ACCESS_TOKEN", "test-token");
    Deno.env.set("GCP_PROJECT", "test-project");

    const server = createMockGcpServer();
    server.instances.set("web-1", {
      name: "web-1",
      zone: "us-central1-a",
      machineType: "n1-standard-2",
      status: "RUNNING",
      fingerprint: "fp-1",
    });
    const { model, cleanup: modelCleanup } = await importGeneratedModel(
      server.port,
      { putUpdate: true },
    );

    try {
      const globalArgs = { zone: "us-central1-a" };
      const { context, artifacts } = createMockContext(globalArgs);
      await model.methods.list.execute({}, context);
      assertEquals(artifacts.has("web-1"), true);

      await model.methods.update.execute({ identifier: "web-1" }, context);
      assertEquals(server.lastWrite?.method, "PUT");
      assertEquals(
        (server.lastWrite?.body as Record<string, unknown>).machineType,
        "n1-standard-2",
        "PUT body should carry machineType from stored state",
      );

      const { context: bareCtx } = createMockContext(globalArgs);
      bareCtx.writeResource("state", "web-2", { name: "web-2" });
      const requestsBefore = server.requestCount;
      await assertRejects(
        () => model.methods.update.execute({ identifier: "web-2" }, bareCtx),
        Error,
        "update requires global arguments: machineType",
      );
      assertEquals(
        server.requestCount,
        requestsBefore,
        "update should fail before calling the API",
      );
    } finally {
      if (origToken === undefined) Deno.env.delete("GCP_ACCESS_TOKEN");
      else Deno.env.set("GCP_ACCESS_TOKEN", origToken);
      if (origProject === undefined) Deno.env.delete("GCP_PROJECT");
      else Deno.env.set("GCP_PROJECT", origProject);
      await server.close();
      await modelCleanup();
    }
  },
});
