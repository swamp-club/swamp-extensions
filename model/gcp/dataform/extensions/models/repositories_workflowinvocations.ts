// Auto-generated extension model for @swamp/gcp/dataform/repositories-workflowinvocations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataform Repositories.WorkflowInvocations.
 *
 * Represents a single invocation of a compilation result.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/workflowInvocations/${shortName}`;
}

const BASE_URL = "https://dataform.googleapis.com/";

const GET_CONFIG = {
  "id": "dataform.projects.locations.repositories.workflowInvocations.get",
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
  "id": "dataform.projects.locations.repositories.workflowInvocations.create",
  "path": "v1/{+parent}/workflowInvocations",
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

const DELETE_CONFIG = {
  "id": "dataform.projects.locations.repositories.workflowInvocations.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "dataform.projects.locations.repositories.workflowInvocations.list",
  "path": "v1/{+parent}/workflowInvocations",
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
  compilationResult: z.string().describe(
    "Immutable. The name of the compilation result to use for this invocation. Must be in the format `projects/*/locations/*/repositories/*/compilationResults/*`.",
  ).optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string().describe(
      "Required. The KMS key version name with which data of a resource is encrypted.",
    ).optional(),
  }).describe("Describes encryption state of a resource.").optional(),
  invocationConfig: z.object({
    fullyRefreshIncrementalTablesEnabled: z.boolean().describe(
      "Optional. When set to true, any incremental tables will be fully refreshed.",
    ).optional(),
    includedTags: z.array(z.string()).describe(
      "Optional. The set of tags to include.",
    ).optional(),
    includedTargets: z.array(z.object({
      database: z.string().describe(
        "Optional. The action's database (Google Cloud project ID).",
      ).optional(),
      name: z.string().describe(
        "Optional. The action's name, within `database` and `schema`.",
      ).optional(),
      schema: z.string().describe(
        "Optional. The action's schema (BigQuery dataset ID), within `database`.",
      ).optional(),
    })).describe("Optional. The set of action identifiers to include.")
      .optional(),
    queryPriority: z.enum([
      "QUERY_PRIORITY_UNSPECIFIED",
      "INTERACTIVE",
      "BATCH",
    ]).describe(
      "Optional. Specifies the priority for query execution in BigQuery. More information can be found at https://cloud.google.com/bigquery/docs/running-queries#queries.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Optional. The service account to run workflow invocations under.",
    ).optional(),
    transitiveDependenciesIncluded: z.boolean().describe(
      "Optional. When set to true, transitive dependencies of included actions will be executed.",
    ).optional(),
    transitiveDependentsIncluded: z.boolean().describe(
      "Optional. When set to true, transitive dependents of included actions will be executed.",
    ).optional(),
  }).describe(
    "Includes various configuration options for a workflow invocation. If both `included_targets` and `included_tags` are unset, all actions will be included.",
  ).optional(),
  invocationTiming: z.object({
    endTime: z.string().describe(
      "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
    ).optional(),
    startTime: z.string().describe(
      "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
    ).optional(),
  }).describe(
    "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
  ).optional(),
  privateResourceMetadata: z.object({
    userScoped: z.boolean().describe(
      "Output only. If true, this resource is user-scoped, meaning it is either a workspace or sourced from a workspace.",
    ).optional(),
  }).describe("Metadata used to identify if a resource is user scoped.")
    .optional(),
  workflowConfig: z.string().describe(
    "Immutable. The name of the workflow config to invoke. Must be in the format `projects/*/locations/*/repositories/*/workflowConfigs/*`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  compilationResult: z.string().optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string(),
  }).optional(),
  internalMetadata: z.string().optional(),
  invocationConfig: z.object({
    fullyRefreshIncrementalTablesEnabled: z.boolean(),
    includedTags: z.array(z.string()),
    includedTargets: z.array(z.object({
      database: z.string(),
      name: z.string(),
      schema: z.string(),
    })),
    queryPriority: z.string(),
    serviceAccount: z.string(),
    transitiveDependenciesIncluded: z.boolean(),
    transitiveDependentsIncluded: z.boolean(),
  }).optional(),
  invocationTiming: z.object({
    endTime: z.string(),
    startTime: z.string(),
  }).optional(),
  name: z.string(),
  privateResourceMetadata: z.object({
    userScoped: z.boolean(),
  }).optional(),
  resolvedCompilationResult: z.string().optional(),
  state: z.string().optional(),
  workflowConfig: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  compilationResult: z.string().describe(
    "Immutable. The name of the compilation result to use for this invocation. Must be in the format `projects/*/locations/*/repositories/*/compilationResults/*`.",
  ).optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string().describe(
      "Required. The KMS key version name with which data of a resource is encrypted.",
    ).optional(),
  }).describe("Describes encryption state of a resource.").optional(),
  invocationConfig: z.object({
    fullyRefreshIncrementalTablesEnabled: z.boolean().describe(
      "Optional. When set to true, any incremental tables will be fully refreshed.",
    ).optional(),
    includedTags: z.array(z.string()).describe(
      "Optional. The set of tags to include.",
    ).optional(),
    includedTargets: z.array(z.object({
      database: z.string().describe(
        "Optional. The action's database (Google Cloud project ID).",
      ).optional(),
      name: z.string().describe(
        "Optional. The action's name, within `database` and `schema`.",
      ).optional(),
      schema: z.string().describe(
        "Optional. The action's schema (BigQuery dataset ID), within `database`.",
      ).optional(),
    })).describe("Optional. The set of action identifiers to include.")
      .optional(),
    queryPriority: z.enum([
      "QUERY_PRIORITY_UNSPECIFIED",
      "INTERACTIVE",
      "BATCH",
    ]).describe(
      "Optional. Specifies the priority for query execution in BigQuery. More information can be found at https://cloud.google.com/bigquery/docs/running-queries#queries.",
    ).optional(),
    serviceAccount: z.string().describe(
      "Optional. The service account to run workflow invocations under.",
    ).optional(),
    transitiveDependenciesIncluded: z.boolean().describe(
      "Optional. When set to true, transitive dependencies of included actions will be executed.",
    ).optional(),
    transitiveDependentsIncluded: z.boolean().describe(
      "Optional. When set to true, transitive dependents of included actions will be executed.",
    ).optional(),
  }).describe(
    "Includes various configuration options for a workflow invocation. If both `included_targets` and `included_tags` are unset, all actions will be included.",
  ).optional(),
  invocationTiming: z.object({
    endTime: z.string().describe(
      "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
    ).optional(),
    startTime: z.string().describe(
      "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
    ).optional(),
  }).describe(
    "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
  ).optional(),
  privateResourceMetadata: z.object({
    userScoped: z.boolean().describe(
      "Output only. If true, this resource is user-scoped, meaning it is either a workspace or sourced from a workspace.",
    ).optional(),
  }).describe("Metadata used to identify if a resource is user scoped.")
    .optional(),
  workflowConfig: z.string().describe(
    "Immutable. The name of the workflow config to invoke. Must be in the format `projects/*/locations/*/repositories/*/workflowConfigs/*`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataform Repositories.WorkflowInvocations. Registered at `@swamp/gcp/dataform/repositories-workflowinvocations`. */
export const model = {
  type: "@swamp/gcp/dataform/repositories-workflowinvocations",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a single invocation of a compilation result.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a workflowInvocations",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["compilationResult"] !== undefined) {
          body["compilationResult"] = g["compilationResult"];
        }
        if (g["dataEncryptionState"] !== undefined) {
          body["dataEncryptionState"] = g["dataEncryptionState"];
        }
        if (g["invocationConfig"] !== undefined) {
          body["invocationConfig"] = g["invocationConfig"];
        }
        if (g["invocationTiming"] !== undefined) {
          body["invocationTiming"] = g["invocationTiming"];
        }
        if (g["privateResourceMetadata"] !== undefined) {
          body["privateResourceMetadata"] = g["privateResourceMetadata"];
        }
        if (g["workflowConfig"] !== undefined) {
          body["workflowConfig"] = g["workflowConfig"];
        }
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING", "SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Get a workflowInvocations",
      arguments: z.object({
        identifier: z.string().describe("The name of the workflowInvocations"),
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
    delete: {
      description: "Delete the workflowInvocations",
      arguments: z.object({
        identifier: z.string().describe("The name of the workflowInvocations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync workflowInvocations state from GCP",
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
    cancel: {
      description: "cancel",
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
              "dataform.projects.locations.repositories.workflowInvocations.cancel",
            "path": "v1/{+name}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
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
              "dataform.projects.locations.repositories.workflowInvocations.query",
            "path": "v1/{+name}:query",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
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
