// Auto-generated extension model for @swamp/gcp/displayvideo/targetingtypes-targetingoptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 TargetingTypes.TargetingOptions.
 *
 * Represents a single targeting option, which is a targetable concept in DV360.
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
  "id": "displayvideo.targetingTypes.targetingOptions.get",
  "path":
    "v4/targetingTypes/{+targetingType}/targetingOptions/{+targetingOptionId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "targetingType",
    "targetingOptionId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "targetingOptionId": {
      "location": "path",
      "required": true,
    },
    "targetingType": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  ageRangeDetails: z.object({
    ageRange: z.string(),
  }).optional(),
  appCategoryDetails: z.object({
    displayName: z.string(),
  }).optional(),
  audioContentTypeDetails: z.object({
    audioContentType: z.string(),
  }).optional(),
  authorizedSellerStatusDetails: z.object({
    authorizedSellerStatus: z.string(),
  }).optional(),
  browserDetails: z.object({
    displayName: z.string(),
  }).optional(),
  businessChainDetails: z.object({
    businessChain: z.string(),
    geoRegion: z.string(),
    geoRegionType: z.string(),
  }).optional(),
  carrierAndIspDetails: z.object({
    displayName: z.string(),
    type: z.string(),
  }).optional(),
  categoryDetails: z.object({
    displayName: z.string(),
  }).optional(),
  contentDurationDetails: z.object({
    contentDuration: z.string(),
  }).optional(),
  contentGenreDetails: z.object({
    displayName: z.string(),
  }).optional(),
  contentInstreamPositionDetails: z.object({
    contentInstreamPosition: z.string(),
  }).optional(),
  contentOutstreamPositionDetails: z.object({
    contentOutstreamPosition: z.string(),
  }).optional(),
  contentStreamTypeDetails: z.object({
    contentStreamType: z.string(),
  }).optional(),
  contentThemeDetails: z.object({
    contentTheme: z.string(),
  }).optional(),
  deviceMakeModelDetails: z.object({
    displayName: z.string(),
  }).optional(),
  deviceTypeDetails: z.object({
    deviceType: z.string(),
  }).optional(),
  digitalContentLabelDetails: z.object({
    contentRatingTier: z.string(),
  }).optional(),
  environmentDetails: z.object({
    environment: z.string(),
  }).optional(),
  exchangeDetails: z.object({
    exchange: z.string(),
  }).optional(),
  genderDetails: z.object({
    gender: z.string(),
  }).optional(),
  geoRegionDetails: z.object({
    displayName: z.string(),
    geoRegionType: z.string(),
  }).optional(),
  householdIncomeDetails: z.object({
    householdIncome: z.string(),
  }).optional(),
  languageDetails: z.object({
    displayName: z.string(),
  }).optional(),
  name: z.string(),
  nativeContentPositionDetails: z.object({
    contentPosition: z.string(),
  }).optional(),
  omidDetails: z.object({
    omid: z.string(),
  }).optional(),
  onScreenPositionDetails: z.object({
    onScreenPosition: z.string(),
  }).optional(),
  operatingSystemDetails: z.object({
    displayName: z.string(),
  }).optional(),
  parentalStatusDetails: z.object({
    parentalStatus: z.string(),
  }).optional(),
  poiDetails: z.object({
    displayName: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
  sensitiveCategoryDetails: z.object({
    sensitiveCategory: z.string(),
  }).optional(),
  subExchangeDetails: z.object({
    displayName: z.string(),
  }).optional(),
  targetingOptionId: z.string().optional(),
  targetingType: z.string().optional(),
  userRewardedContentDetails: z.object({
    userRewardedContent: z.string(),
  }).optional(),
  videoPlayerSizeDetails: z.object({
    videoPlayerSize: z.string(),
  }).optional(),
  viewabilityDetails: z.object({
    viewability: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 TargetingTypes.TargetingOptions. Registered at `@swamp/gcp/displayvideo/targetingtypes-targetingoptions`. */
export const model = {
  type: "@swamp/gcp/displayvideo/targetingtypes-targetingoptions",
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
      description:
        "Represents a single targeting option, which is a targetable concept in DV360.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a targetingOptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the targetingOptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["targetingType"] !== undefined) {
          params["targetingType"] = String(g["targetingType"]);
        }
        params["targetingOptionId"] = args.identifier;
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
      description: "Sync targetingOptions state from GCP",
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
          if (g["targetingType"] !== undefined) {
            params["targetingType"] = String(g["targetingType"]);
          } else if (existing["targetingType"]) {
            params["targetingType"] = String(existing["targetingType"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["targetingOptionId"] = identifier;
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
    search: {
      description: "search",
      arguments: z.object({
        advertiserId: z.any().optional(),
        businessChainSearchTerms: z.any().optional(),
        geoRegionSearchTerms: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        poiSearchTerms: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["targetingType"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["advertiserId"] !== undefined) {
          body["advertiserId"] = args["advertiserId"];
        }
        if (args["businessChainSearchTerms"] !== undefined) {
          body["businessChainSearchTerms"] = args["businessChainSearchTerms"];
        }
        if (args["geoRegionSearchTerms"] !== undefined) {
          body["geoRegionSearchTerms"] = args["geoRegionSearchTerms"];
        }
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["poiSearchTerms"] !== undefined) {
          body["poiSearchTerms"] = args["poiSearchTerms"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.targetingTypes.targetingOptions.search",
            "path":
              "v4/targetingTypes/{+targetingType}/targetingOptions:search",
            "httpMethod": "POST",
            "parameterOrder": ["targetingType"],
            "parameters": {
              "targetingType": { "location": "path", "required": true },
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
