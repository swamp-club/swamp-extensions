// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-youtubeadgroups-targetingtypes-assignedtargetingoptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.YoutubeAdGroups.TargetingTypes.AssignedTargetingOptions.
 *
 * A single assigned targeting option, which defines the state of a targeting option for an entity with targeting settings.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id":
    "displayvideo.advertisers.youtubeAdGroups.targetingTypes.assignedTargetingOptions.get",
  "path":
    "v2/advertisers/{+advertiserId}/youtubeAdGroups/{+youtubeAdGroupId}/targetingTypes/{+targetingType}/assignedTargetingOptions/{+assignedTargetingOptionId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "youtubeAdGroupId",
    "targetingType",
    "assignedTargetingOptionId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "assignedTargetingOptionId": {
      "location": "path",
      "required": true,
    },
    "targetingType": {
      "location": "path",
      "required": true,
    },
    "youtubeAdGroupId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id":
    "displayvideo.advertisers.youtubeAdGroups.targetingTypes.assignedTargetingOptions.list",
  "path":
    "v2/advertisers/{+advertiserId}/youtubeAdGroups/{+youtubeAdGroupId}/targetingTypes/{+targetingType}/assignedTargetingOptions",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "youtubeAdGroupId",
    "targetingType",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
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
    "targetingType": {
      "location": "path",
      "required": true,
    },
    "youtubeAdGroupId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
});

const StateSchema = z.object({
  ageRangeDetails: z.object({
    ageRange: z.string(),
  }).optional(),
  appCategoryDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  appDetails: z.object({
    appId: z.string(),
    appPlatform: z.string(),
    displayName: z.string(),
    negative: z.boolean(),
  }).optional(),
  assignedTargetingOptionId: z.string().optional(),
  assignedTargetingOptionIdAlias: z.string().optional(),
  audienceGroupDetails: z.object({
    excludedGoogleAudienceGroup: z.object({
      settings: z.array(z.object({
        googleAudienceId: z.string(),
      })),
    }),
    includedCombinedAudienceGroup: z.object({
      settings: z.array(z.object({
        combinedAudienceId: z.string(),
      })),
    }),
    includedCustomListGroup: z.object({
      settings: z.array(z.object({
        customListId: z.string(),
      })),
    }),
    includedGoogleAudienceGroup: z.object({
      settings: z.array(z.object({
        googleAudienceId: z.string(),
      })),
    }),
  }).optional(),
  audioContentTypeDetails: z.object({
    audioContentType: z.string(),
  }).optional(),
  authorizedSellerStatusDetails: z.object({
    authorizedSellerStatus: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  browserDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  businessChainDetails: z.object({
    displayName: z.string(),
    proximityRadiusAmount: z.number(),
    proximityRadiusUnit: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  carrierAndIspDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  categoryDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  channelDetails: z.object({
    channelId: z.string(),
    negative: z.boolean(),
  }).optional(),
  contentDurationDetails: z.object({
    contentDuration: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  contentGenreDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  contentInstreamPositionDetails: z.object({
    adType: z.string(),
    contentInstreamPosition: z.string(),
  }).optional(),
  contentOutstreamPositionDetails: z.object({
    adType: z.string(),
    contentOutstreamPosition: z.string(),
  }).optional(),
  contentStreamTypeDetails: z.object({
    contentStreamType: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  dayAndTimeDetails: z.object({
    dayOfWeek: z.string(),
    endHour: z.number(),
    startHour: z.number(),
    timeZoneResolution: z.string(),
  }).optional(),
  deviceMakeModelDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  deviceTypeDetails: z.object({
    deviceType: z.string(),
    youtubeAndPartnersBidMultiplier: z.number(),
  }).optional(),
  digitalContentLabelExclusionDetails: z.object({
    excludedContentRatingTier: z.string(),
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
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  householdIncomeDetails: z.object({
    householdIncome: z.string(),
  }).optional(),
  inheritance: z.string().optional(),
  inventorySourceDetails: z.object({
    inventorySourceId: z.string(),
  }).optional(),
  inventorySourceGroupDetails: z.object({
    inventorySourceGroupId: z.string(),
  }).optional(),
  keywordDetails: z.object({
    exemptedPolicyNames: z.array(z.string()),
    keyword: z.string(),
    negative: z.boolean(),
  }).optional(),
  languageDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  name: z.string(),
  nativeContentPositionDetails: z.object({
    contentPosition: z.string(),
  }).optional(),
  negativeKeywordListDetails: z.object({
    negativeKeywordListId: z.string(),
  }).optional(),
  omidDetails: z.object({
    omid: z.string(),
  }).optional(),
  onScreenPositionDetails: z.object({
    adType: z.string(),
    onScreenPosition: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  operatingSystemDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  parentalStatusDetails: z.object({
    parentalStatus: z.string(),
  }).optional(),
  poiDetails: z.object({
    displayName: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    proximityRadiusAmount: z.number(),
    proximityRadiusUnit: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  proximityLocationListDetails: z.object({
    proximityLocationListId: z.string(),
    proximityRadius: z.number(),
    proximityRadiusUnit: z.string(),
  }).optional(),
  regionalLocationListDetails: z.object({
    negative: z.boolean(),
    regionalLocationListId: z.string(),
  }).optional(),
  sensitiveCategoryExclusionDetails: z.object({
    excludedSensitiveCategory: z.string(),
  }).optional(),
  sessionPositionDetails: z.object({
    sessionPosition: z.string(),
  }).optional(),
  subExchangeDetails: z.object({
    targetingOptionId: z.string(),
  }).optional(),
  targetingType: z.string().optional(),
  thirdPartyVerifierDetails: z.object({
    adloox: z.object({
      excludedAdlooxCategories: z.array(z.string()),
    }),
    doubleVerify: z.object({
      appStarRating: z.object({
        avoidInsufficientStarRating: z.boolean(),
        avoidedStarRating: z.string(),
      }),
      avoidedAgeRatings: z.array(z.string()),
      brandSafetyCategories: z.object({
        avoidUnknownBrandSafetyCategory: z.boolean(),
        avoidedHighSeverityCategories: z.array(z.string()),
        avoidedMediumSeverityCategories: z.array(z.string()),
      }),
      customSegmentId: z.string(),
      displayViewability: z.object({
        iab: z.string(),
        viewableDuring: z.string(),
      }),
      fraudInvalidTraffic: z.object({
        avoidInsufficientOption: z.boolean(),
        avoidedFraudOption: z.string(),
      }),
      videoViewability: z.object({
        playerImpressionRate: z.string(),
        videoIab: z.string(),
        videoViewableRate: z.string(),
      }),
    }),
    integralAdScience: z.object({
      customSegmentId: z.array(z.string()),
      displayViewability: z.string(),
      excludeUnrateable: z.boolean(),
      excludedAdFraudRisk: z.string(),
      excludedAdultRisk: z.string(),
      excludedAlcoholRisk: z.string(),
      excludedDrugsRisk: z.string(),
      excludedGamblingRisk: z.string(),
      excludedHateSpeechRisk: z.string(),
      excludedIllegalDownloadsRisk: z.string(),
      excludedOffensiveLanguageRisk: z.string(),
      excludedViolenceRisk: z.string(),
      traqScoreOption: z.string(),
      videoViewability: z.string(),
    }),
  }).optional(),
  urlDetails: z.object({
    negative: z.boolean(),
    url: z.string(),
  }).optional(),
  userRewardedContentDetails: z.object({
    targetingOptionId: z.string(),
    userRewardedContent: z.string(),
  }).optional(),
  videoPlayerSizeDetails: z.object({
    videoPlayerSize: z.string(),
  }).optional(),
  viewabilityDetails: z.object({
    viewability: z.string(),
  }).optional(),
  youtubeChannelDetails: z.object({
    channelId: z.string(),
    negative: z.boolean(),
  }).optional(),
  youtubeVideoDetails: z.object({
    negative: z.boolean(),
    videoId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.YoutubeAdGroups.TargetingTypes.AssignedTargetingOptions. Registered at `@swamp/gcp/displayvideo/advertisers-youtubeadgroups-targetingtypes-assignedtargetingoptions`. */
export const model = {
  type:
    "@swamp/gcp/displayvideo/advertisers-youtubeadgroups-targetingtypes-assignedtargetingoptions",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A single assigned targeting option, which defines the state of a targeting op...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a assignedTargetingOptions",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the assignedTargetingOptions",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["youtubeAdGroupId"] !== undefined) {
          params["youtubeAdGroupId"] = String(g["youtubeAdGroupId"]);
        }
        if (g["targetingType"] !== undefined) {
          params["targetingType"] = String(g["targetingType"]);
        }
        params["assignedTargetingOptionId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Sync assignedTargetingOptions state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          if (g["youtubeAdGroupId"] !== undefined) {
            params["youtubeAdGroupId"] = String(g["youtubeAdGroupId"]);
          } else if (existing["youtubeAdGroupId"]) {
            params["youtubeAdGroupId"] = String(existing["youtubeAdGroupId"]);
          }
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
          params["assignedTargetingOptionId"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
            credentials,
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
      description: "List assignedTargetingOptions resources",
      arguments: z.object({
        filter: z.string().describe(
          'Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedTargetingOptionId` Examples: * `AssignedTargetingOption` resources with ID 1 or 2: `assignedTargetingOptionId="1" OR assignedTargetingOptionId="2"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information.',
        ).optional(),
        orderBy: z.string().describe(
          'Field by which to sort the list. Acceptable values are: * `assignedTargetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`.',
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Must be between `1` and `5000`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["youtubeAdGroupId"] !== undefined) {
          params["youtubeAdGroupId"] = String(g["youtubeAdGroupId"]);
        }
        if (g["targetingType"] !== undefined) {
          params["targetingType"] = String(g["targetingType"]);
        }
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
          "assignedTargetingOptions",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
  },
};
