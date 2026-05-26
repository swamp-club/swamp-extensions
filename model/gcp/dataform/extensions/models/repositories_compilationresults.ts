// Auto-generated extension model for @swamp/gcp/dataform/repositories-compilationresults
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataform Repositories.CompilationResults.
 *
 * Represents the result of compiling a Dataform project.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/compilationResults/${shortName}`;
}

const BASE_URL = "https://dataform.googleapis.com/";

const GET_CONFIG = {
  "id": "dataform.projects.locations.repositories.compilationResults.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dataform.projects.locations.repositories.compilationResults.create",
  "path": "v1/{+parent}/compilationResults",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dataform.projects.locations.repositories.compilationResults.list",
  "path": "v1/{+parent}/compilationResults",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  codeCompilationConfig: z.object({
    assertionSchema: z.string().describe(
      "Optional. The default schema (BigQuery dataset ID) for assertions.",
    ).optional(),
    builtinAssertionNamePrefix: z.string().describe(
      "Optional. The prefix to prepend to built-in assertion names.",
    ).optional(),
    databaseSuffix: z.string().describe(
      "Optional. The suffix that should be appended to all database (Google Cloud project ID) names.",
    ).optional(),
    defaultDatabase: z.string().describe(
      "Optional. The default database (Google Cloud project ID).",
    ).optional(),
    defaultLocation: z.string().describe(
      'Optional. The default BigQuery location to use. Defaults to "US". See the BigQuery docs for a full list of locations: https://cloud.google.com/bigquery/docs/locations.',
    ).optional(),
    defaultNotebookRuntimeOptions: z.object({
      aiPlatformNotebookRuntimeTemplate: z.string().describe(
        "Optional. The resource name of the [Colab runtime template] (https://cloud.google.com/colab/docs/runtimes), from which a runtime is created for notebook executions. If not specified, a runtime is created with Colab's default specifications.",
      ).optional(),
      gcsOutputBucket: z.string().describe(
        "Optional. The Google Cloud Storage location to upload the result to. Format: `gs://bucket-name`.",
      ).optional(),
    }).describe("Configures various aspects of Dataform notebook runtime.")
      .optional(),
    defaultSchema: z.string().describe(
      "Optional. The default schema (BigQuery dataset ID).",
    ).optional(),
    schemaSuffix: z.string().describe(
      "Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names.",
    ).optional(),
    tablePrefix: z.string().describe(
      "Optional. The prefix that should be prepended to all table names.",
    ).optional(),
    vars: z.record(z.string(), z.string()).describe(
      "Optional. User-defined variables that are made available to project code during compilation.",
    ).optional(),
  }).describe("Configures various aspects of Dataform code compilation.")
    .optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string().describe(
      "Required. The KMS key version name with which data of a resource is encrypted.",
    ).optional(),
  }).describe("Describes encryption state of a resource.").optional(),
  gitCommitish: z.string().describe(
    "Immutable. Git commit/tag/branch name at which the repository should be compiled. Must exist in the remote repository. Examples: - a commit SHA: `12ade345` - a tag: `tag1` - a branch name: `branch1`",
  ).optional(),
  privateResourceMetadata: z.object({
    userScoped: z.boolean().describe(
      "Output only. If true, this resource is user-scoped, meaning it is either a workspace or sourced from a workspace.",
    ).optional(),
  }).describe("Metadata used to identify if a resource is user scoped.")
    .optional(),
  releaseConfig: z.string().describe(
    "Immutable. The name of the release config to compile. Must be in the format `projects/*/locations/*/repositories/*/releaseConfigs/*`.",
  ).optional(),
  workspace: z.string().describe(
    "Immutable. The name of the workspace to compile. Must be in the format `projects/*/locations/*/repositories/*/workspaces/*`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  codeCompilationConfig: z.object({
    assertionSchema: z.string(),
    builtinAssertionNamePrefix: z.string(),
    databaseSuffix: z.string(),
    defaultDatabase: z.string(),
    defaultLocation: z.string(),
    defaultNotebookRuntimeOptions: z.object({
      aiPlatformNotebookRuntimeTemplate: z.string(),
      gcsOutputBucket: z.string(),
    }),
    defaultSchema: z.string(),
    schemaSuffix: z.string(),
    tablePrefix: z.string(),
    vars: z.record(z.string(), z.unknown()),
  }).optional(),
  compilationErrors: z.array(z.object({
    actionTarget: z.object({
      database: z.string(),
      name: z.string(),
      schema: z.string(),
    }),
    message: z.string(),
    path: z.string(),
    stack: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string(),
  }).optional(),
  dataformCoreVersion: z.string().optional(),
  gitCommitish: z.string().optional(),
  internalMetadata: z.string().optional(),
  name: z.string(),
  privateResourceMetadata: z.object({
    userScoped: z.boolean(),
  }).optional(),
  releaseConfig: z.string().optional(),
  resolvedGitCommitSha: z.string().optional(),
  workspace: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  codeCompilationConfig: z.object({
    assertionSchema: z.string().describe(
      "Optional. The default schema (BigQuery dataset ID) for assertions.",
    ).optional(),
    builtinAssertionNamePrefix: z.string().describe(
      "Optional. The prefix to prepend to built-in assertion names.",
    ).optional(),
    databaseSuffix: z.string().describe(
      "Optional. The suffix that should be appended to all database (Google Cloud project ID) names.",
    ).optional(),
    defaultDatabase: z.string().describe(
      "Optional. The default database (Google Cloud project ID).",
    ).optional(),
    defaultLocation: z.string().describe(
      'Optional. The default BigQuery location to use. Defaults to "US". See the BigQuery docs for a full list of locations: https://cloud.google.com/bigquery/docs/locations.',
    ).optional(),
    defaultNotebookRuntimeOptions: z.object({
      aiPlatformNotebookRuntimeTemplate: z.string().describe(
        "Optional. The resource name of the [Colab runtime template] (https://cloud.google.com/colab/docs/runtimes), from which a runtime is created for notebook executions. If not specified, a runtime is created with Colab's default specifications.",
      ).optional(),
      gcsOutputBucket: z.string().describe(
        "Optional. The Google Cloud Storage location to upload the result to. Format: `gs://bucket-name`.",
      ).optional(),
    }).describe("Configures various aspects of Dataform notebook runtime.")
      .optional(),
    defaultSchema: z.string().describe(
      "Optional. The default schema (BigQuery dataset ID).",
    ).optional(),
    schemaSuffix: z.string().describe(
      "Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names.",
    ).optional(),
    tablePrefix: z.string().describe(
      "Optional. The prefix that should be prepended to all table names.",
    ).optional(),
    vars: z.record(z.string(), z.string()).describe(
      "Optional. User-defined variables that are made available to project code during compilation.",
    ).optional(),
  }).describe("Configures various aspects of Dataform code compilation.")
    .optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string().describe(
      "Required. The KMS key version name with which data of a resource is encrypted.",
    ).optional(),
  }).describe("Describes encryption state of a resource.").optional(),
  gitCommitish: z.string().describe(
    "Immutable. Git commit/tag/branch name at which the repository should be compiled. Must exist in the remote repository. Examples: - a commit SHA: `12ade345` - a tag: `tag1` - a branch name: `branch1`",
  ).optional(),
  privateResourceMetadata: z.object({
    userScoped: z.boolean().describe(
      "Output only. If true, this resource is user-scoped, meaning it is either a workspace or sourced from a workspace.",
    ).optional(),
  }).describe("Metadata used to identify if a resource is user scoped.")
    .optional(),
  releaseConfig: z.string().describe(
    "Immutable. The name of the release config to compile. Must be in the format `projects/*/locations/*/repositories/*/releaseConfigs/*`.",
  ).optional(),
  workspace: z.string().describe(
    "Immutable. The name of the workspace to compile. Must be in the format `projects/*/locations/*/repositories/*/workspaces/*`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataform Repositories.CompilationResults. Registered at `@swamp/gcp/dataform/repositories-compilationresults`. */
export const model = {
  type: "@swamp/gcp/dataform/repositories-compilationresults",
  version: "2026.05.26.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents the result of compiling a Dataform project.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a compilationResults",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["codeCompilationConfig"] !== undefined) {
          body["codeCompilationConfig"] = g["codeCompilationConfig"];
        }
        if (g["dataEncryptionState"] !== undefined) {
          body["dataEncryptionState"] = g["dataEncryptionState"];
        }
        if (g["gitCommitish"] !== undefined) {
          body["gitCommitish"] = g["gitCommitish"];
        }
        if (g["privateResourceMetadata"] !== undefined) {
          body["privateResourceMetadata"] = g["privateResourceMetadata"];
        }
        if (g["releaseConfig"] !== undefined) {
          body["releaseConfig"] = g["releaseConfig"];
        }
        if (g["workspace"] !== undefined) body["workspace"] = g["workspace"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a compilationResults",
      arguments: z.object({
        identifier: z.string().describe("The name of the compilationResults"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync compilationResults state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    list: {
      description: "List compilationResults resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter for the returned list. LINT.ThenChange(//depot/google3/google/cloud/dataform/v2main/data_pipelines.proto:ListCompilationResultsRequest)",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. This field only supports ordering by `name` and `create_time`. If unspecified, the server will choose the ordering. If specified, the default order is ascending for the `name` field.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of compilation results to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "compilationResults",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    query: {
      description: "query",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "dataform.projects.locations.repositories.compilationResults.query",
            "path": "v1/{+name}:query",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "filter": { "location": "query" },
              "name": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
