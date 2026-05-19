// Auto-generated extension model for @swamp/gcp/recommendationengine/catalogs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Recommendations AI (Beta) Catalogs.
 *
 * The catalog configuration. Next ID: 5.
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
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://recommendationengine.googleapis.com/";

const PATCH_CONFIG = {
  "id": "recommendationengine.projects.locations.catalogs.patch",
  "path": "v1beta1/{+name}",
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

const LIST_CONFIG = {
  "id": "recommendationengine.projects.locations.catalogs.list",
  "path": "v1beta1/{+parent}/catalogs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  catalogItemLevelConfig: z.object({
    eventItemLevel: z.enum([
      "CATALOG_ITEM_LEVEL_UNSPECIFIED",
      "VARIANT",
      "MASTER",
    ]).describe(
      "Optional. Level of the catalog at which events are uploaded. See https://cloud.google.com/recommendations-ai/docs/catalog#catalog-levels for more details.",
    ).optional(),
    predictItemLevel: z.enum([
      "CATALOG_ITEM_LEVEL_UNSPECIFIED",
      "VARIANT",
      "MASTER",
    ]).describe(
      "Optional. Level of the catalog at which predictions are made. See https://cloud.google.com/recommendations-ai/docs/catalog#catalog-levels for more details.",
    ).optional(),
  }).describe(
    "Configures the catalog level that users send events to, and the level at which predictions are made.",
  ).optional(),
  defaultEventStoreId: z.string().describe(
    "Required. The ID of the default event store.",
  ).optional(),
  displayName: z.string().describe("Required. The catalog display name.")
    .optional(),
  name: z.string().describe("The fully qualified resource name of the catalog.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  catalogItemLevelConfig: z.object({
    eventItemLevel: z.string(),
    predictItemLevel: z.string(),
  }).optional(),
  defaultEventStoreId: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  catalogItemLevelConfig: z.object({
    eventItemLevel: z.enum([
      "CATALOG_ITEM_LEVEL_UNSPECIFIED",
      "VARIANT",
      "MASTER",
    ]).describe(
      "Optional. Level of the catalog at which events are uploaded. See https://cloud.google.com/recommendations-ai/docs/catalog#catalog-levels for more details.",
    ).optional(),
    predictItemLevel: z.enum([
      "CATALOG_ITEM_LEVEL_UNSPECIFIED",
      "VARIANT",
      "MASTER",
    ]).describe(
      "Optional. Level of the catalog at which predictions are made. See https://cloud.google.com/recommendations-ai/docs/catalog#catalog-levels for more details.",
    ).optional(),
  }).describe(
    "Configures the catalog level that users send events to, and the level at which predictions are made.",
  ).optional(),
  defaultEventStoreId: z.string().describe(
    "Required. The ID of the default event store.",
  ).optional(),
  displayName: z.string().describe("Required. The catalog display name.")
    .optional(),
  name: z.string().describe("The fully qualified resource name of the catalog.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Recommendations AI (Beta) Catalogs. Registered at `@swamp/gcp/recommendationengine/catalogs`. */
export const model = {
  type: "@swamp/gcp/recommendationengine/catalogs",
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
      description: "The catalog configuration. Next ID: 5.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a catalogs",
      arguments: z.object({
        identifier: z.string().describe("The name of the catalogs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Update catalogs attributes",
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
        if (g["catalogItemLevelConfig"] !== undefined) {
          body["catalogItemLevelConfig"] = g["catalogItemLevelConfig"];
        }
        if (g["defaultEventStoreId"] !== undefined) {
          body["defaultEventStoreId"] = g["defaultEventStoreId"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
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
      description: "Sync catalogs state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
