// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-adassets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.AdAssets.
 *
 * A single ad asset.
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

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.advertisers.adAssets.get",
  "path": "v4/advertisers/{+advertiserId}/adAssets/{+adAssetId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "adAssetId",
  ],
  "parameters": {
    "adAssetId": {
      "location": "path",
      "required": true,
    },
    "advertiserId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.advertisers.adAssets.create",
  "path": "v4/advertisers/{+advertiserId}/adAssets",
  "httpMethod": "POST",
  "parameterOrder": [
    "advertiserId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  adAsset: z.object({
    adAssetId: z.string().describe(
      "Output only. The ID of the ad asset. Referred to as the asset ID when assigned to an ad.",
    ).optional(),
    adAssetType: z.enum([
      "AD_ASSET_TYPE_UNSPECIFIED",
      "AD_ASSET_TYPE_IMAGE",
      "AD_ASSET_TYPE_YOUTUBE_VIDEO",
    ]).describe("Required. The type of the ad asset.").optional(),
    entityStatus: z.enum([
      "ENTITY_STATUS_UNSPECIFIED",
      "ENTITY_STATUS_ACTIVE",
      "ENTITY_STATUS_ARCHIVED",
      "ENTITY_STATUS_DRAFT",
      "ENTITY_STATUS_PAUSED",
      "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
    ]).describe("Output only. The entity status of the ad asset.").optional(),
    name: z.string().describe("Identifier. The resource name of the ad asset.")
      .optional(),
    youtubeVideoAsset: z.object({
      youtubeVideoId: z.string().describe(
        "Required. The YouTube video id of the asset. This is the 11 char string value used in the YouTube video URL.",
      ).optional(),
    }).describe("Data for a YouTube video ad asset.").optional(),
  }).describe("A single ad asset.").optional(),
  advertiserId: z.string().describe(
    "Required. The ID of the advertiser this ad asset belongs to.",
  ),
});

const StateSchema = z.object({
  adAssetId: z.string().optional(),
  adAssetType: z.string().optional(),
  entityStatus: z.string().optional(),
  name: z.string(),
  youtubeVideoAsset: z.object({
    youtubeVideoId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  adAsset: z.object({
    adAssetId: z.string().describe(
      "Output only. The ID of the ad asset. Referred to as the asset ID when assigned to an ad.",
    ).optional(),
    adAssetType: z.enum([
      "AD_ASSET_TYPE_UNSPECIFIED",
      "AD_ASSET_TYPE_IMAGE",
      "AD_ASSET_TYPE_YOUTUBE_VIDEO",
    ]).describe("Required. The type of the ad asset.").optional(),
    entityStatus: z.enum([
      "ENTITY_STATUS_UNSPECIFIED",
      "ENTITY_STATUS_ACTIVE",
      "ENTITY_STATUS_ARCHIVED",
      "ENTITY_STATUS_DRAFT",
      "ENTITY_STATUS_PAUSED",
      "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
    ]).describe("Output only. The entity status of the ad asset.").optional(),
    name: z.string().describe("Identifier. The resource name of the ad asset.")
      .optional(),
    youtubeVideoAsset: z.object({
      youtubeVideoId: z.string().describe(
        "Required. The YouTube video id of the asset. This is the 11 char string value used in the YouTube video URL.",
      ).optional(),
    }).describe("Data for a YouTube video ad asset.").optional(),
  }).describe("A single ad asset.").optional(),
  advertiserId: z.string().describe(
    "Required. The ID of the advertiser this ad asset belongs to.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.AdAssets. Registered at `@swamp/gcp/displayvideo/advertisers-adassets`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-adassets",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single ad asset.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a adAssets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["adAsset"] !== undefined) body["adAsset"] = g["adAsset"];
        if (g["name"] !== undefined) params["adAssetId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a adAssets",
      arguments: z.object({
        identifier: z.string().describe("The name of the adAssets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["adAssetId"] = args.identifier;
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
      description: "Sync adAssets state from GCP",
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
          if (g["advertiserId"] !== undefined) {
            params["advertiserId"] = String(g["advertiserId"]);
          } else if (existing["advertiserId"]) {
            params["advertiserId"] = String(existing["advertiserId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["adAssetId"] = identifier;
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
    bulk_create: {
      description: "bulk create",
      arguments: z.object({
        adAssets: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["adAssets"] !== undefined) body["adAssets"] = args["adAssets"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.advertisers.adAssets.bulkCreate",
            "path": "v4/advertisers/{+advertiserId}/adAssets:bulkCreate",
            "httpMethod": "POST",
            "parameterOrder": ["advertiserId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    upload: {
      description: "upload",
      arguments: z.object({
        adAssetType: z.any().optional(),
        filename: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["adAssetType"] !== undefined) {
          body["adAssetType"] = args["adAssetType"];
        }
        if (args["filename"] !== undefined) body["filename"] = args["filename"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.advertisers.adAssets.upload",
            "path": "v4/advertisers/{+advertiserId}/adAssets:uploadAdAsset",
            "httpMethod": "POST",
            "parameterOrder": ["advertiserId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
