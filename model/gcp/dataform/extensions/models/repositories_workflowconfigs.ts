// Auto-generated extension model for @swamp/gcp/dataform/repositories-workflowconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataform Repositories.WorkflowConfigs.
 *
 * Represents a Dataform workflow configuration.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/workflowConfigs/${shortName}`;
}

const BASE_URL = "https://dataform.googleapis.com/";

const GET_CONFIG = {
  "id": "dataform.projects.locations.repositories.workflowConfigs.get",
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
  "id": "dataform.projects.locations.repositories.workflowConfigs.create",
  "path": "v1/{+parent}/workflowConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "workflowConfigId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataform.projects.locations.repositories.workflowConfigs.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataform.projects.locations.repositories.workflowConfigs.delete",
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

const GlobalArgsSchema = z.object({
  cronSchedule: z.string().describe(
    "Optional. Optional schedule (in cron format) for automatic execution of this workflow config.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Disables automatic creation of workflow invocations.",
  ).optional(),
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
  name: z.string().describe("Identifier. The workflow config's name.")
    .optional(),
  releaseConfig: z.string().describe(
    "Required. The name of the release config whose release_compilation_result should be executed. Must be in the format `projects/*/locations/*/repositories/*/releaseConfigs/*`.",
  ).optional(),
  timeZone: z.string().describe(
    "Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left unspecified, the default is UTC.",
  ).optional(),
  workflowConfigId: z.string().describe(
    "Required. The ID to use for the workflow config, which will become the final component of the workflow config's resource name.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  cronSchedule: z.string().optional(),
  disabled: z.boolean().optional(),
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
  name: z.string(),
  recentScheduledExecutionRecords: z.array(z.object({
    errorStatus: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    executionTime: z.string(),
    workflowInvocation: z.string(),
  })).optional(),
  releaseConfig: z.string().optional(),
  timeZone: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  cronSchedule: z.string().describe(
    "Optional. Optional schedule (in cron format) for automatic execution of this workflow config.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Disables automatic creation of workflow invocations.",
  ).optional(),
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
  name: z.string().describe("Identifier. The workflow config's name.")
    .optional(),
  releaseConfig: z.string().describe(
    "Required. The name of the release config whose release_compilation_result should be executed. Must be in the format `projects/*/locations/*/repositories/*/releaseConfigs/*`.",
  ).optional(),
  timeZone: z.string().describe(
    "Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left unspecified, the default is UTC.",
  ).optional(),
  workflowConfigId: z.string().describe(
    "Required. The ID to use for the workflow config, which will become the final component of the workflow config's resource name.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataform Repositories.WorkflowConfigs. Registered at `@swamp/gcp/dataform/repositories-workflowconfigs`. */
export const model = {
  type: "@swamp/gcp/dataform/repositories-workflowconfigs",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a Dataform workflow configuration.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a workflowConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["cronSchedule"] !== undefined) {
          body["cronSchedule"] = g["cronSchedule"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["invocationConfig"] !== undefined) {
          body["invocationConfig"] = g["invocationConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["releaseConfig"] !== undefined) {
          body["releaseConfig"] = g["releaseConfig"];
        }
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
        if (g["workflowConfigId"] !== undefined) {
          body["workflowConfigId"] = g["workflowConfigId"];
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
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a workflowConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the workflowConfigs"),
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
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
    update: {
      description: "Update workflowConfigs attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["cronSchedule"] !== undefined) {
          body["cronSchedule"] = g["cronSchedule"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["invocationConfig"] !== undefined) {
          body["invocationConfig"] = g["invocationConfig"];
        }
        if (g["releaseConfig"] !== undefined) {
          body["releaseConfig"] = g["releaseConfig"];
        }
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the workflowConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the workflowConfigs"),
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
      description: "Sync workflowConfigs state from GCP",
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
  },
};
