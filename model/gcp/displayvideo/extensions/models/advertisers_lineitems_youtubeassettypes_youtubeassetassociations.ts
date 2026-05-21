// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-lineitems-youtubeassettypes-youtubeassetassociations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.LineItems.YoutubeAssetTypes.YoutubeAssetAssociations.
 *
 * An association between a resource and a YouTube asset.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const INSERT_CONFIG = {
  "id":
    "displayvideo.advertisers.lineItems.youtubeAssetTypes.youtubeAssetAssociations.create",
  "path":
    "v4/advertisers/{+advertiserId}/lineItems/{+lineItemId}/youtubeAssetTypes/{+youtubeAssetType}/youtubeAssetAssociations",
  "httpMethod": "POST",
  "parameterOrder": [
    "advertiserId",
    "lineItemId",
    "youtubeAssetType",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "lineItemId": {
      "location": "path",
      "required": true,
    },
    "linkedEntity.adGroupId": {
      "location": "query",
    },
    "youtubeAssetType": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "displayvideo.advertisers.lineItems.youtubeAssetTypes.youtubeAssetAssociations.delete",
  "path":
    "v4/advertisers/{+advertiserId}/lineItems/{+lineItemId}/youtubeAssetTypes/{+youtubeAssetType}/youtubeAssetAssociations/{+youtubeAssetAssociationId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
    "lineItemId",
    "youtubeAssetType",
    "youtubeAssetAssociationId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "lineItemId": {
      "location": "path",
      "required": true,
    },
    "linkedEntity.adGroupId": {
      "location": "query",
    },
    "youtubeAssetAssociationId": {
      "location": "path",
      "required": true,
    },
    "youtubeAssetType": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id":
    "displayvideo.advertisers.lineItems.youtubeAssetTypes.youtubeAssetAssociations.list",
  "path":
    "v4/advertisers/{+advertiserId}/lineItems/{+lineItemId}/youtubeAssetTypes/{+youtubeAssetType}/youtubeAssetAssociations",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "lineItemId",
    "youtubeAssetType",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "lineItemId": {
      "location": "path",
      "required": true,
    },
    "linkedEntity.adGroupId": {
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
    "youtubeAssetType": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  linkedYoutubeAsset: z.object({
    affiliateLocationAssetFilter: z.object({
      affiliateLocationMatchingFunction: z.object({
        chains: z.array(z.object({
          chainId: z.unknown().describe(
            "Required. ID of the affiliate location chain.",
          ).optional(),
        })).describe(
          "Optional. The selected affiliate location chain IDs. This field is required if affiliate_location_matching_type is `SELECTED_CHAINS`.",
        ).optional(),
      }).describe(
        "The matching function for an affiliate location asset filter.",
      ).optional(),
      affiliateLocationMatchingType: z.enum([
        "AFFILIATE_LOCATION_MATCHING_TYPE_UNSPECIFIED",
        "SELECT_ALL",
        "SELECTED_CHAINS",
        "DISABLED",
      ]).describe(
        "Required. The matching type of this affiliate location asset filter.",
      ).optional(),
      assetSetId: z.string().describe(
        "Output only. The ID of the asset set that matches the affiliate location assets eligible for serving.",
      ).optional(),
    }).describe(
      "An asset filter that matches eligible affiliate location assets for serving.",
    ).optional(),
    locationAssetFilter: z.object({
      assetSetId: z.string().describe(
        "Output only. The ID of the asset set that matches the location assets eligible for serving.",
      ).optional(),
      locationMatchingFunction: z.object({
        business: z.string().describe(
          "Optional. The business name to match with. This field is optional and can only be set if location_matching_type is `FILTER`.",
        ).optional(),
        labels: z.array(z.string()).describe(
          "Optional. The labels to match with. Labels are logically OR'ed together. This field is optional and can only be set if location_matching_type is `FILTER`.",
        ).optional(),
        locationAssetIds: z.array(z.string()).describe(
          "Optional. The selected location asset IDs. This field is required if location_matching_type is `SELECTED_ASSETS`.",
        ).optional(),
      }).describe("The matching function for a location asset filter.")
        .optional(),
      locationMatchingType: z.enum([
        "LOCATION_MATCHING_TYPE_UNSPECIFIED",
        "SELECT_ALL",
        "FILTER",
        "SELECTED_ASSETS",
        "DISABLED",
      ]).describe("Required. The matching type of this location asset filter.")
        .optional(),
    }).describe(
      "An asset filter that matches eligible location assets for serving.",
    ).optional(),
    sitelinkAsset: z.object({
      assetId: z.string().describe("Required. ID of the sitelink asset.")
        .optional(),
    }).describe("A sitelink asset.").optional(),
  }).describe(
    "A YouTube asset linked to a resource in a YoutubeAssetAssociation.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the association. For line item-level associations: The name pattern is `advertisers/{advertiser_id}/lineItems/{line_item_id}/youtubeAssetTypes/{youtube_asset_type}/youtubeAssetAssociations/{youtube_asset_association_id}`. For ad group-level associations: The name pattern is `advertisers/{advertiser_id}/adGroups/{ad_group_id}/youtubeAssetTypes/{youtube_asset_type}/youtubeAssetAssociations/{youtube_asset_association_id}`. For `YOUTUBE_ASSET_TYPE_LOCATION` and `YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION` associations: `youtube_asset_association_id` is the ID of the asset set linked, or 0 if the location_matching_type or affiliate_location_matching_type is `DISABLED`. For `YOUTUBE_ASSET_TYPE_SITELINK` associations: `youtube_asset_association_id` is be the ID of the sitelink asset linked.",
  ).optional(),
  youtubeAssetType: z.enum([
    "YOUTUBE_ASSET_TYPE_UNSPECIFIED",
    "YOUTUBE_ASSET_TYPE_LOCATION",
    "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION",
    "YOUTUBE_ASSET_TYPE_SITELINK",
  ]).describe(
    "Required. The type of YouTube asset associated with the resource.",
  ).optional(),
  advertiserId: z.string().describe(
    "Required. The ID of the advertiser that the linked entity belongs to.",
  ),
  lineItemId: z.string().describe("The ID of a line item."),
  linkedEntity_adGroupId: z.string().describe("The ID of an ad group.")
    .optional(),
});

const StateSchema = z.object({
  linkedYoutubeAsset: z.object({
    affiliateLocationAssetFilter: z.object({
      affiliateLocationMatchingFunction: z.object({
        chains: z.array(z.object({
          chainId: z.unknown(),
        })),
      }),
      affiliateLocationMatchingType: z.string(),
      assetSetId: z.string(),
    }),
    locationAssetFilter: z.object({
      assetSetId: z.string(),
      locationMatchingFunction: z.object({
        business: z.string(),
        labels: z.array(z.string()),
        locationAssetIds: z.array(z.string()),
      }),
      locationMatchingType: z.string(),
    }),
    sitelinkAsset: z.object({
      assetId: z.string(),
    }),
  }).optional(),
  name: z.string(),
  youtubeAssetType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  linkedYoutubeAsset: z.object({
    affiliateLocationAssetFilter: z.object({
      affiliateLocationMatchingFunction: z.object({
        chains: z.array(z.object({
          chainId: z.unknown().describe(
            "Required. ID of the affiliate location chain.",
          ).optional(),
        })).describe(
          "Optional. The selected affiliate location chain IDs. This field is required if affiliate_location_matching_type is `SELECTED_CHAINS`.",
        ).optional(),
      }).describe(
        "The matching function for an affiliate location asset filter.",
      ).optional(),
      affiliateLocationMatchingType: z.enum([
        "AFFILIATE_LOCATION_MATCHING_TYPE_UNSPECIFIED",
        "SELECT_ALL",
        "SELECTED_CHAINS",
        "DISABLED",
      ]).describe(
        "Required. The matching type of this affiliate location asset filter.",
      ).optional(),
      assetSetId: z.string().describe(
        "Output only. The ID of the asset set that matches the affiliate location assets eligible for serving.",
      ).optional(),
    }).describe(
      "An asset filter that matches eligible affiliate location assets for serving.",
    ).optional(),
    locationAssetFilter: z.object({
      assetSetId: z.string().describe(
        "Output only. The ID of the asset set that matches the location assets eligible for serving.",
      ).optional(),
      locationMatchingFunction: z.object({
        business: z.string().describe(
          "Optional. The business name to match with. This field is optional and can only be set if location_matching_type is `FILTER`.",
        ).optional(),
        labels: z.array(z.string()).describe(
          "Optional. The labels to match with. Labels are logically OR'ed together. This field is optional and can only be set if location_matching_type is `FILTER`.",
        ).optional(),
        locationAssetIds: z.array(z.string()).describe(
          "Optional. The selected location asset IDs. This field is required if location_matching_type is `SELECTED_ASSETS`.",
        ).optional(),
      }).describe("The matching function for a location asset filter.")
        .optional(),
      locationMatchingType: z.enum([
        "LOCATION_MATCHING_TYPE_UNSPECIFIED",
        "SELECT_ALL",
        "FILTER",
        "SELECTED_ASSETS",
        "DISABLED",
      ]).describe("Required. The matching type of this location asset filter.")
        .optional(),
    }).describe(
      "An asset filter that matches eligible location assets for serving.",
    ).optional(),
    sitelinkAsset: z.object({
      assetId: z.string().describe("Required. ID of the sitelink asset.")
        .optional(),
    }).describe("A sitelink asset.").optional(),
  }).describe(
    "A YouTube asset linked to a resource in a YoutubeAssetAssociation.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the association. For line item-level associations: The name pattern is `advertisers/{advertiser_id}/lineItems/{line_item_id}/youtubeAssetTypes/{youtube_asset_type}/youtubeAssetAssociations/{youtube_asset_association_id}`. For ad group-level associations: The name pattern is `advertisers/{advertiser_id}/adGroups/{ad_group_id}/youtubeAssetTypes/{youtube_asset_type}/youtubeAssetAssociations/{youtube_asset_association_id}`. For `YOUTUBE_ASSET_TYPE_LOCATION` and `YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION` associations: `youtube_asset_association_id` is the ID of the asset set linked, or 0 if the location_matching_type or affiliate_location_matching_type is `DISABLED`. For `YOUTUBE_ASSET_TYPE_SITELINK` associations: `youtube_asset_association_id` is be the ID of the sitelink asset linked.",
  ).optional(),
  youtubeAssetType: z.enum([
    "YOUTUBE_ASSET_TYPE_UNSPECIFIED",
    "YOUTUBE_ASSET_TYPE_LOCATION",
    "YOUTUBE_ASSET_TYPE_AFFILIATE_LOCATION",
    "YOUTUBE_ASSET_TYPE_SITELINK",
  ]).describe(
    "Required. The type of YouTube asset associated with the resource.",
  ).optional(),
  advertiserId: z.string().describe(
    "Required. The ID of the advertiser that the linked entity belongs to.",
  ).optional(),
  lineItemId: z.string().describe("The ID of a line item.").optional(),
  linkedEntity_adGroupId: z.string().describe("The ID of an ad group.")
    .optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.LineItems.YoutubeAssetTypes.YoutubeAssetAssociations. Registered at `@swamp/gcp/displayvideo/advertisers-lineitems-youtubeassettypes-youtubeassetassociations`. */
export const model = {
  type:
    "@swamp/gcp/displayvideo/advertisers-lineitems-youtubeassettypes-youtubeassetassociations",
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
      toVersion: "2026.04.04.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An association between a resource and a YouTube asset.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a youtubeAssetAssociations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["lineItemId"] !== undefined) {
          params["lineItemId"] = String(g["lineItemId"]);
        }
        if (g["youtubeAssetType"] !== undefined) {
          params["youtubeAssetType"] = String(g["youtubeAssetType"]);
        }
        const body: Record<string, unknown> = {};
        if (g["linkedYoutubeAsset"] !== undefined) {
          body["linkedYoutubeAsset"] = g["linkedYoutubeAsset"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["linkedEntity_adGroupId"] !== undefined) {
          body["linkedEntity_adGroupId"] = g["linkedEntity_adGroupId"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "advertiserId": String(g["advertiserId"] ?? ""),
              "lineItemId": String(g["lineItemId"] ?? ""),
              "youtubeAssetType": String(g["youtubeAssetType"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a youtubeAssetAssociations",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the youtubeAssetAssociations",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["lineItemId"] !== undefined) {
          params["lineItemId"] = String(g["lineItemId"]);
        }
        if (g["youtubeAssetType"] !== undefined) {
          params["youtubeAssetType"] = String(g["youtubeAssetType"]);
        }
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
    delete: {
      description: "Delete the youtubeAssetAssociations",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the youtubeAssetAssociations",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["lineItemId"] !== undefined) {
          params["lineItemId"] = String(g["lineItemId"]);
        }
        if (g["youtubeAssetType"] !== undefined) {
          params["youtubeAssetType"] = String(g["youtubeAssetType"]);
        }
        params["youtubeAssetAssociationId"] = args.identifier;
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
      description: "Sync youtubeAssetAssociations state from GCP",
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
          if (g["lineItemId"] !== undefined) {
            params["lineItemId"] = String(g["lineItemId"]);
          } else if (existing["lineItemId"]) {
            params["lineItemId"] = String(existing["lineItemId"]);
          }
          if (g["youtubeAssetType"] !== undefined) {
            params["youtubeAssetType"] = String(g["youtubeAssetType"]);
          } else if (existing["youtubeAssetType"]) {
            params["youtubeAssetType"] = String(existing["youtubeAssetType"]);
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
