// Auto-generated extension model for @swamp/gcp/dataform/repositories-releaseconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataform Repositories.ReleaseConfigs.
 *
 * Represents a Dataform release configuration.
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
  return `${parent}/releaseConfigs/${shortName}`;
}

const BASE_URL = "https://dataform.googleapis.com/";

const GET_CONFIG = {
  "id": "dataform.projects.locations.repositories.releaseConfigs.get",
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
  "id": "dataform.projects.locations.repositories.releaseConfigs.create",
  "path": "v1/{+parent}/releaseConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "releaseConfigId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "dataform.projects.locations.repositories.releaseConfigs.patch",
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
  "id": "dataform.projects.locations.repositories.releaseConfigs.delete",
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
  cronSchedule: z.string().describe(
    "Optional. Optional schedule (in cron format) for automatic creation of compilation results.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Disables automatic creation of compilation results.",
  ).optional(),
  gitCommitish: z.string().describe(
    "Required. Git commit/tag/branch name at which the repository should be compiled. Must exist in the remote repository. Examples: - a commit SHA: `12ade345` - a tag: `tag1` - a branch name: `branch1`",
  ).optional(),
  name: z.string().describe("Identifier. The release config's name.")
    .optional(),
  releaseCompilationResult: z.string().describe(
    "Optional. The name of the currently released compilation result for this release config. This value is updated when a compilation result is automatically created from this release config (using cron_schedule), or when this resource is updated by API call (perhaps to roll back to an earlier release). The compilation result must have been created using this release config. Must be in the format `projects/*/locations/*/repositories/*/compilationResults/*`.",
  ).optional(),
  timeZone: z.string().describe(
    "Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left unspecified, the default is UTC.",
  ).optional(),
  releaseConfigId: z.string().describe(
    "Required. The ID to use for the release config, which will become the final component of the release config's resource name.",
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
  cronSchedule: z.string().optional(),
  disabled: z.boolean().optional(),
  gitCommitish: z.string().optional(),
  internalMetadata: z.string().optional(),
  name: z.string(),
  recentScheduledReleaseRecords: z.array(z.object({
    compilationResult: z.string(),
    errorStatus: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    releaseTime: z.string(),
  })).optional(),
  releaseCompilationResult: z.string().optional(),
  timeZone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
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
  cronSchedule: z.string().describe(
    "Optional. Optional schedule (in cron format) for automatic creation of compilation results.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Disables automatic creation of compilation results.",
  ).optional(),
  gitCommitish: z.string().describe(
    "Required. Git commit/tag/branch name at which the repository should be compiled. Must exist in the remote repository. Examples: - a commit SHA: `12ade345` - a tag: `tag1` - a branch name: `branch1`",
  ).optional(),
  name: z.string().describe("Identifier. The release config's name.")
    .optional(),
  releaseCompilationResult: z.string().describe(
    "Optional. The name of the currently released compilation result for this release config. This value is updated when a compilation result is automatically created from this release config (using cron_schedule), or when this resource is updated by API call (perhaps to roll back to an earlier release). The compilation result must have been created using this release config. Must be in the format `projects/*/locations/*/repositories/*/compilationResults/*`.",
  ).optional(),
  timeZone: z.string().describe(
    "Optional. Specifies the time zone to be used when interpreting cron_schedule. Must be a time zone name from the time zone database (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). If left unspecified, the default is UTC.",
  ).optional(),
  releaseConfigId: z.string().describe(
    "Required. The ID to use for the release config, which will become the final component of the release config's resource name.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataform Repositories.ReleaseConfigs. Registered at `@swamp/gcp/dataform/repositories-releaseconfigs`. */
export const model = {
  type: "@swamp/gcp/dataform/repositories-releaseconfigs",
  version: "2026.05.19.2",
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
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a Dataform release configuration.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a releaseConfigs",
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
        if (g["cronSchedule"] !== undefined) {
          body["cronSchedule"] = g["cronSchedule"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["gitCommitish"] !== undefined) {
          body["gitCommitish"] = g["gitCommitish"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["releaseCompilationResult"] !== undefined) {
          body["releaseCompilationResult"] = g["releaseCompilationResult"];
        }
        if (g["timeZone"] !== undefined) body["timeZone"] = g["timeZone"];
        if (g["releaseConfigId"] !== undefined) {
          body["releaseConfigId"] = g["releaseConfigId"];
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
      description: "Get a releaseConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the releaseConfigs"),
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
      description: "Update releaseConfigs attributes",
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
        if (g["codeCompilationConfig"] !== undefined) {
          body["codeCompilationConfig"] = g["codeCompilationConfig"];
        }
        if (g["cronSchedule"] !== undefined) {
          body["cronSchedule"] = g["cronSchedule"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["gitCommitish"] !== undefined) {
          body["gitCommitish"] = g["gitCommitish"];
        }
        if (g["releaseCompilationResult"] !== undefined) {
          body["releaseCompilationResult"] = g["releaseCompilationResult"];
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
      description: "Delete the releaseConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the releaseConfigs"),
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
      description: "Sync releaseConfigs state from GCP",
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
