// Auto-generated extension model for @swamp/gcp/dfareporting/studiocreatives
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 StudioCreatives.
 *
 * *Beta:* This API resource is available only to a very limited number of customers. If you'd like to use this resource, please reach out to your Google sales representative. Contains studio creative information.
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
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.studioCreatives.get",
  "path": "studio/creatives/{+studioCreativeId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "studioCreativeId",
  ],
  "parameters": {
    "studioCreativeId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dfareporting.studioCreatives.insert",
  "path": "studio/creatives",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const GlobalArgsSchema = z.object({
  assetIds: z.array(z.string()).describe(
    "List of assets associated with this studio creative. It is a required field on insertion.",
  ).optional(),
  backupImageAssetId: z.string().describe(
    "Backup image asset ID of this studio creative. It is a required field on insertion.",
  ).optional(),
  createdInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  dimension: z.object({
    height: z.number().int().describe("Height of the studio creative.")
      .optional(),
    width: z.number().int().describe("Width of the studio creative.")
      .optional(),
  }).describe("Dimension information for a studio creative.").optional(),
  dynamicProfileId: z.string().describe(
    "Dynamic profile ID of this studio creative.",
  ).optional(),
  format: z.enum([
    "UNKNOWN",
    "BANNER",
    "EXPANDING",
    "INTERSTITIAL",
    "VPAID_LINEAR_VIDEO",
  ]).describe(
    "Format of this studio creative. This is a required field on insertion.",
  ).optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  name: z.string().describe(
    "Identifier. Name of this studio creative. This is a required field on insertion.",
  ).optional(),
  studioAccountId: z.string().describe(
    "Studio account ID of this creative. This field, if left unset, will be auto-populated.",
  ).optional(),
  studioAdvertiserId: z.string().describe(
    "Studio advertiser ID of this studio creative. This is a required field on insertion.",
  ).optional(),
  studioCampaignId: z.string().describe(
    "Studio campaign ID of this studio creative. This is a required field on insertion.",
  ).optional(),
});

const StateSchema = z.object({
  assetIds: z.array(z.string()).optional(),
  backupImageAssetId: z.string().optional(),
  createdInfo: z.object({
    time: z.string(),
  }).optional(),
  dimension: z.object({
    height: z.number(),
    width: z.number(),
  }).optional(),
  dynamicProfileId: z.string().optional(),
  format: z.string().optional(),
  id: z.string().optional(),
  lastModifiedInfo: z.object({
    time: z.string(),
  }).optional(),
  name: z.string(),
  status: z.string().optional(),
  studioAccountId: z.string().optional(),
  studioAdvertiserId: z.string().optional(),
  studioCampaignId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  assetIds: z.array(z.string()).describe(
    "List of assets associated with this studio creative. It is a required field on insertion.",
  ).optional(),
  backupImageAssetId: z.string().describe(
    "Backup image asset ID of this studio creative. It is a required field on insertion.",
  ).optional(),
  createdInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  dimension: z.object({
    height: z.number().int().describe("Height of the studio creative.")
      .optional(),
    width: z.number().int().describe("Width of the studio creative.")
      .optional(),
  }).describe("Dimension information for a studio creative.").optional(),
  dynamicProfileId: z.string().describe(
    "Dynamic profile ID of this studio creative.",
  ).optional(),
  format: z.enum([
    "UNKNOWN",
    "BANNER",
    "EXPANDING",
    "INTERSTITIAL",
    "VPAID_LINEAR_VIDEO",
  ]).describe(
    "Format of this studio creative. This is a required field on insertion.",
  ).optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  name: z.string().describe(
    "Identifier. Name of this studio creative. This is a required field on insertion.",
  ).optional(),
  studioAccountId: z.string().describe(
    "Studio account ID of this creative. This field, if left unset, will be auto-populated.",
  ).optional(),
  studioAdvertiserId: z.string().describe(
    "Studio advertiser ID of this studio creative. This is a required field on insertion.",
  ).optional(),
  studioCampaignId: z.string().describe(
    "Studio campaign ID of this studio creative. This is a required field on insertion.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 StudioCreatives. Registered at `@swamp/gcp/dfareporting/studiocreatives`. */
export const model = {
  type: "@swamp/gcp/dfareporting/studiocreatives",
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
        "*Beta:* This API resource is available only to a very limited number of custo...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a studioCreatives",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["assetIds"] !== undefined) body["assetIds"] = g["assetIds"];
        if (g["backupImageAssetId"] !== undefined) {
          body["backupImageAssetId"] = g["backupImageAssetId"];
        }
        if (g["createdInfo"] !== undefined) {
          body["createdInfo"] = g["createdInfo"];
        }
        if (g["dimension"] !== undefined) body["dimension"] = g["dimension"];
        if (g["dynamicProfileId"] !== undefined) {
          body["dynamicProfileId"] = g["dynamicProfileId"];
        }
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["studioAccountId"] !== undefined) {
          body["studioAccountId"] = g["studioAccountId"];
        }
        if (g["studioAdvertiserId"] !== undefined) {
          body["studioAdvertiserId"] = g["studioAdvertiserId"];
        }
        if (g["studioCampaignId"] !== undefined) {
          body["studioCampaignId"] = g["studioCampaignId"];
        }
        if (g["name"] !== undefined) {
          params["studioCreativeId"] = String(g["name"]);
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
      description: "Get a studioCreatives",
      arguments: z.object({
        identifier: z.string().describe("The name of the studioCreatives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["studioCreativeId"] = args.identifier;
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
    sync: {
      description: "Sync studioCreatives state from GCP",
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
          params["studioCreativeId"] = identifier;
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
    publish: {
      description: "publish",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["studioCreativeId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "dfareporting.studioCreatives.publish",
            "path": "studio/creatives/{+studioCreativeId}/publish",
            "httpMethod": "POST",
            "parameterOrder": ["studioCreativeId"],
            "parameters": {
              "studioCreativeId": { "location": "path", "required": true },
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
