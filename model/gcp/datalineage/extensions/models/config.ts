// Auto-generated extension model for @swamp/gcp/datalineage/config
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Data Lineage Config.
 *
 * Configuration for Data Lineage. Defines different configuration options for Lineage customers to control behaviour of lineage systems.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://datalineage.googleapis.com/";

const GET_CONFIG = {
  "id": "datalineage.folders.locations.config.get",
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

const PATCH_CONFIG = {
  "id": "datalineage.folders.locations.config.patch",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  etag: z.string().describe(
    "Optional. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a config from overwriting each other. It is required that systems make use of the `etag` in the read-modify-write cycle to perform config updates in order to avoid race conditions: An `etag` is returned in the response to `GetConfig`, and systems are expected to put that etag in the request to `UpdateConfig` to ensure that their change will be applied to the same version of the config. If an `etag` is not provided in the call to `UpdateConfig`, then the existing config, if any, will be overwritten.",
  ).optional(),
  ingestion: z.object({
    rules: z.array(z.object({
      integrationSelector: z.object({
        integration: z.enum([
          "INTEGRATION_UNSPECIFIED",
          "DATAPROC",
          "LOOKER_CORE",
        ]).describe(
          "Required. Integration to which the rule applies. This field can be used to specify the integration against which the ingestion rule should be applied.",
        ).optional(),
      }).describe(
        "Integration selector of the rule. The rule is only applied to the Integration selected by the selector.",
      ).optional(),
      lineageEnablement: z.object({
        enabled: z.boolean().describe(
          "Optional. If true, ingestion of lineage should be enabled. If false, it should be disabled. If unspecified, the system default value is used.",
        ).optional(),
      }).describe(
        "Lineage enablement configuration. Defines configurations for the ingestion of lineage for the resource and its children.",
      ).optional(),
    })).describe("Optional. List of rules for Data Lineage ingestion.")
      .optional(),
  }).describe("Defines how Lineage should be ingested for a given resource.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the config. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config`",
  ).optional(),
});

const StateSchema = z.object({
  etag: z.string().optional(),
  ingestion: z.object({
    rules: z.array(z.object({
      integrationSelector: z.object({
        integration: z.string(),
      }),
      lineageEnablement: z.object({
        enabled: z.boolean(),
      }),
    })),
  }).optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  etag: z.string().describe(
    "Optional. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a config from overwriting each other. It is required that systems make use of the `etag` in the read-modify-write cycle to perform config updates in order to avoid race conditions: An `etag` is returned in the response to `GetConfig`, and systems are expected to put that etag in the request to `UpdateConfig` to ensure that their change will be applied to the same version of the config. If an `etag` is not provided in the call to `UpdateConfig`, then the existing config, if any, will be overwritten.",
  ).optional(),
  ingestion: z.object({
    rules: z.array(z.object({
      integrationSelector: z.object({
        integration: z.enum([
          "INTEGRATION_UNSPECIFIED",
          "DATAPROC",
          "LOOKER_CORE",
        ]).describe(
          "Required. Integration to which the rule applies. This field can be used to specify the integration against which the ingestion rule should be applied.",
        ).optional(),
      }).describe(
        "Integration selector of the rule. The rule is only applied to the Integration selected by the selector.",
      ).optional(),
      lineageEnablement: z.object({
        enabled: z.boolean().describe(
          "Optional. If true, ingestion of lineage should be enabled. If false, it should be disabled. If unspecified, the system default value is used.",
        ).optional(),
      }).describe(
        "Lineage enablement configuration. Defines configurations for the ingestion of lineage for the resource and its children.",
      ).optional(),
    })).describe("Optional. List of rules for Data Lineage ingestion.")
      .optional(),
  }).describe("Defines how Lineage should be ingested for a given resource.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the config. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config`",
  ).optional(),
});

/** Swamp extension model for Google Cloud Data Lineage Config. Registered at `@swamp/gcp/datalineage/config`. */
export const model = {
  type: "@swamp/gcp/datalineage/config",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Configuration for Data Lineage. Defines different configuration options for L...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a config",
      arguments: z.object({
        identifier: z.string().describe("The name of the config"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Update config attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["ingestion"] !== undefined) body["ingestion"] = g["ingestion"];
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
    sync: {
      description: "Sync config state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
