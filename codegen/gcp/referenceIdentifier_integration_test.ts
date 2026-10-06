// Integration test (swamp-club #2669): a resource whose id lives in a nested
// reference object rather than a top-level `name` field. Generates a
// BigQuery-dataset-shaped model, runs it against a mock API server, and checks
// update and sync address the dataset by datasetReference.datasetId.

import { assertEquals, assertRejects } from "@std/assert";
import {
  type GcpExtensionModelInput,
  generateGcpExtensionModel,
} from "./extensionModelGenerator.ts";
import { generateGcpLibFile } from "./libGenerator.ts";
import {
  type GcpMethodConfig,
  type GcpParsedResource,
  resolveStateIdentifierPaths,
} from "./pipeline.ts";

interface MockDataset {
  kind: string;
  // Composite "project:dataset" — deliberately not usable as the path param.
  id: string;
  datasetReference: { projectId: string; datasetId: string };
  friendlyName?: string;
}

function createMockBigQueryServer() {
  const datasets = new Map<string, MockDataset>();
  const requests: string[] = [];

  const server = Deno.serve({ port: 0, onListen() {} }, async (req) => {
    const { pathname } = new URL(req.url);
    requests.push(`${req.method} ${pathname}`);

    const collection = pathname.match(
      /^\/bigquery\/v2\/projects\/([^/]+)\/datasets$/,
    );
    if (collection && req.method === "POST") {
      const body = await req.json();
      const datasetId = body.datasetReference.datasetId;
      const dataset: MockDataset = {
        kind: "bigquery#dataset",
        id: `${collection[1]}:${datasetId}`,
        datasetReference: { projectId: collection[1], datasetId },
        friendlyName: body.friendlyName,
      };
      datasets.set(datasetId, dataset);
      return Response.json(dataset);
    }

    const item = pathname.match(
      /^\/bigquery\/v2\/projects\/[^/]+\/datasets\/([^/:]+)$/,
    );
    const dataset = item ? datasets.get(item[1]) : undefined;
    if (item && dataset && req.method === "GET") {
      return Response.json(dataset);
    }
    if (item && dataset && req.method === "PATCH") {
      const updated = { ...dataset, ...(await req.json()) };
      datasets.set(item[1], updated);
      return Response.json(updated);
    }

    return Response.json(
      { error: { code: 404, message: `Not found: ${req.method} ${pathname}` } },
      { status: 404 },
    );
  });

  return {
    port: server.addr.port,
    close: () => server.shutdown(),
    datasets,
    requests,
  };
}

function datasetConfig(
  id: string,
  httpMethod: string,
  path = "projects/{+projectId}/datasets/{+datasetId}",
  parameterOrder = ["projectId", "datasetId"],
): GcpMethodConfig {
  return {
    id,
    path,
    httpMethod,
    parameterOrder,
    parameters: Object.fromEntries(
      parameterOrder.map((p) => [p, { location: "path", required: true }]),
    ),
  };
}

type Model = {
  methods: Record<
    string,
    {
      execute: (
        args: Record<string, unknown>,
        context: Record<string, unknown>,
      ) => Promise<unknown>;
    }
  >;
};

async function importDatasetModel(mockPort: number): Promise<{
  model: Model;
  cleanup: () => Promise<void>;
}> {
  const tmpDir = await Deno.makeTempDir();
  const modelDir = `${tmpDir}/extensions/models`;
  await Deno.mkdir(`${modelDir}/_lib`, { recursive: true });
  await Deno.writeTextFile(`${modelDir}/_lib/gcp.ts`, generateGcpLibFile());

  const configs = {
    get: datasetConfig("bigquery.datasets.get", "GET"),
    insert: datasetConfig(
      "bigquery.datasets.insert",
      "POST",
      "projects/{+projectId}/datasets",
      ["projectId"],
    ),
    patch: datasetConfig("bigquery.datasets.patch", "PATCH"),
  };
  const resource: GcpParsedResource = {
    service: "bigquery",
    apiTitle: "BigQuery API",
    apiVersion: "v2",
    baseUrl: `http://localhost:${mockPort}/bigquery/v2/`,
    resourcePath: ["datasets"],
    typeName: "Google Cloud BigQuery Datasets",
    description: "A BigQuery dataset",
    domainProperties: {
      datasetReference: {
        type: "object",
        properties: {
          datasetId: { type: "string" },
          projectId: { type: "string" },
        },
      },
      friendlyName: { type: "string" },
    },
    resourceValueProperties: {},
    requiredProperties: [],
    createRequiredProperties: [],
    createOnlyProperties: [],
    insertProperties: new Set(["datasetReference", "friendlyName"]),
    updateProperties: new Set(["datasetReference", "friendlyName"]),
    primaryIdentifier: ["name"],
    // Resolved exactly as the pipeline does, from the GET response schema.
    stateIdentifierPaths: resolveStateIdentifierPaths(
      {
        type: "object",
        properties: {
          kind: { type: "string" },
          id: { type: "string" },
          datasetReference: {
            type: "object",
            properties: {
              datasetId: { type: "string" },
              projectId: { type: "string" },
            },
          },
          friendlyName: { type: "string" },
        },
      },
      [configs.get, configs.patch],
      "name",
    ),
    handlers: { create: true, read: true, update: true, delete: false },
    isGlobalOnly: false,
    hasGlobalEndpoint: false,
    listOnly: false,
    methodConfigs: configs,
    actionMethods: [],
    usesFullResourceName: false,
    oauthScopes: [],
  };

  const input: GcpExtensionModelInput = {
    resource,
    zodResult: {
      extractedSchemas: [],
      inputSchemaBody: [
        `  name: z.string().optional(),`,
        `  datasetReference: z.object({ datasetId: z.string(), projectId: z.string().optional() }).optional(),`,
        `  friendlyName: z.string().optional(),`,
      ].join("\n"),
      resourceSchemaBody: [
        `  kind: z.string().optional(),`,
        `  id: z.string().optional(),`,
        `  datasetReference: z.object({ datasetId: z.string(), projectId: z.string() }).optional(),`,
        `  friendlyName: z.string().optional(),`,
      ].join("\n"),
    },
    onlyProperties: {
      primaryIdentifier: ["name"],
      readOnly: ["kind", "id"],
      writeOnly: [],
      createOnly: [],
    },
    version: "2026.01.01.1",
    modelType: "@swamp/gcp/bigquery/datasets",
    extensionName: "@swamp/gcp/bigquery",
  };

  await Deno.writeTextFile(
    `${modelDir}/datasets.ts`,
    generateGcpExtensionModel(input),
  );
  const mod = await import(
    `file://${modelDir}/datasets.ts?v=${crypto.randomUUID()}`
  );
  return {
    model: mod.model,
    cleanup: () => Deno.remove(tmpDir, { recursive: true }),
  };
}

function createMockContext(globalArgs: Record<string, unknown>) {
  const artifacts = new Map<string, Uint8Array>();
  return {
    context: {
      globalArgs,
      modelType: "@swamp/gcp/bigquery/datasets",
      modelId: "test-model",
      dataRepository: {
        getContent: (_t: string, _id: string, instanceName: string) =>
          artifacts.get(instanceName) ?? null,
      },
      writeResource: (_type: string, instanceName: string, data: unknown) => {
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

async function withServer(
  fn: (
    server: ReturnType<typeof createMockBigQueryServer>,
    model: Model,
  ) => Promise<void>,
): Promise<void> {
  const origToken = Deno.env.get("GCP_ACCESS_TOKEN");
  const origProject = Deno.env.get("GCP_PROJECT");
  Deno.env.set("GCP_ACCESS_TOKEN", "test-token");
  Deno.env.set("GCP_PROJECT", "test-project");
  const server = createMockBigQueryServer();
  const { model, cleanup } = await importDatasetModel(server.port);
  try {
    await fn(server, model);
  } finally {
    await cleanup();
    await server.close();
    if (origToken === undefined) Deno.env.delete("GCP_ACCESS_TOKEN");
    else Deno.env.set("GCP_ACCESS_TOKEN", origToken);
    if (origProject === undefined) Deno.env.delete("GCP_PROJECT");
    else Deno.env.set("GCP_PROJECT", origProject);
  }
}

const DATASET_PATH = "/bigquery/v2/projects/test-project/datasets/analytics_ds";

Deno.test({
  name: "reference identifier: create then update and sync target datasetId",
  // The generated lib's fetch keep-alive outlives the test body.
  sanitizeResources: false,
  fn: () =>
    withServer(async (server, model) => {
      // Instance name deliberately differs from the dataset id.
      const { context } = createMockContext({
        name: "analytics-model",
        datasetReference: { datasetId: "analytics_ds" },
        friendlyName: "v1",
      });
      await model.methods.create.execute({}, context);

      context.globalArgs.friendlyName = "v2";
      await model.methods.update.execute({}, context);
      assertEquals(server.requests.at(-1), `PATCH ${DATASET_PATH}`);
      assertEquals(server.datasets.get("analytics_ds")?.friendlyName, "v2");

      await model.methods.sync.execute({}, context);
      assertEquals(server.requests.at(-1), `GET ${DATASET_PATH}`);
    }),
});

Deno.test({
  name: "reference identifier: get then update targets datasetId",
  sanitizeResources: false,
  fn: () =>
    withServer(async (server, model) => {
      server.datasets.set("analytics_ds", {
        kind: "bigquery#dataset",
        id: "test-project:analytics_ds",
        datasetReference: {
          projectId: "test-project",
          datasetId: "analytics_ds",
        },
      });
      const { context } = createMockContext({ name: "imported" });
      await model.methods.get.execute({ identifier: "analytics_ds" }, context);

      context.globalArgs.friendlyName = "renamed";
      await model.methods.update.execute({}, context);
      assertEquals(server.requests.at(-1), `PATCH ${DATASET_PATH}`);
    }),
});

Deno.test({
  name:
    "reference identifier: update falls back to globalArgs name when state has no id",
  sanitizeResources: false,
  fn: () =>
    withServer(async (server, model) => {
      server.datasets.set("analytics_ds", {
        kind: "bigquery#dataset",
        id: "test-project:analytics_ds",
        datasetReference: {
          projectId: "test-project",
          datasetId: "analytics_ds",
        },
      });
      // Post-delete state shape: no datasetReference.
      const { context, artifacts } = createMockContext({
        name: "analytics_ds",
        friendlyName: "restored",
      });
      artifacts.set(
        "analytics_ds",
        new TextEncoder().encode(
          JSON.stringify({ identifier: "analytics_ds", status: "deleted" }),
        ),
      );
      await model.methods.update.execute({}, context);
      assertEquals(server.requests.at(-1), `PATCH ${DATASET_PATH}`);
    }),
});

Deno.test({
  name:
    "reference identifier: update with no id anywhere fails with a clear error",
  sanitizeResources: false,
  fn: () =>
    withServer(async (server, model) => {
      const { context, artifacts } = createMockContext({});
      artifacts.set(
        "orphan",
        new TextEncoder().encode(JSON.stringify({ status: "deleted" })),
      );
      await assertRejects(
        () => model.methods.update.execute({ identifier: "orphan" }, context),
        Error,
        "No identifier found in existing state or globalArgs",
      );
      assertEquals(server.requests, []);
    }),
});
