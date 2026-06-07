// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-youtubeadgroupads
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.YoutubeAdGroupAds.
 *
 * A single ad associated with a YouTube ad group.
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
  "id": "displayvideo.advertisers.youtubeAdGroupAds.get",
  "path":
    "v2/advertisers/{+advertiserId}/youtubeAdGroupAds/{+youtubeAdGroupAdId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "youtubeAdGroupAdId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "youtubeAdGroupAdId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.youtubeAdGroupAds.list",
  "path": "v2/advertisers/{+advertiserId}/youtubeAdGroupAds",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
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
  adGroupAdId: z.string().optional(),
  adGroupId: z.string().optional(),
  adUrls: z.array(z.object({
    type: z.string(),
    url: z.string(),
  })).optional(),
  advertiserId: z.string().optional(),
  audioAd: z.object({
    displayUrl: z.string(),
    finalUrl: z.string(),
    trackingUrl: z.string(),
    video: z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    }),
  }).optional(),
  bumperAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string(),
      actionHeadline: z.string(),
      companionBanner: z.object({
        assetId: z.string(),
        fileSize: z.string(),
        fullSize: z.object({
          heightPixels: z.number(),
          widthPixels: z.number(),
        }),
        mimeType: z.string(),
      }),
      displayUrl: z.string(),
      finalUrl: z.string(),
      trackingUrl: z.string(),
      video: z.object({
        id: z.string(),
        unavailableReason: z.string(),
        videoAssetId: z.string(),
      }),
    }),
  }).optional(),
  displayName: z.string().optional(),
  displayVideoSourceAd: z.object({
    creativeId: z.string(),
  }).optional(),
  entityStatus: z.string().optional(),
  inStreamAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string(),
      actionHeadline: z.string(),
      companionBanner: z.object({
        assetId: z.string(),
        fileSize: z.string(),
        fullSize: z.object({
          heightPixels: z.number(),
          widthPixels: z.number(),
        }),
        mimeType: z.string(),
      }),
      displayUrl: z.string(),
      finalUrl: z.string(),
      trackingUrl: z.string(),
      video: z.object({
        id: z.string(),
        unavailableReason: z.string(),
        videoAssetId: z.string(),
      }),
    }),
    customParameters: z.record(z.string(), z.unknown()),
  }).optional(),
  mastheadAd: z.object({
    autoplayVideoDuration: z.string(),
    autoplayVideoStartMillisecond: z.string(),
    callToActionButtonLabel: z.string(),
    callToActionFinalUrl: z.string(),
    callToActionTrackingUrl: z.string(),
    companionYoutubeVideos: z.array(z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    })),
    description: z.string(),
    headline: z.string(),
    showChannelArt: z.boolean(),
    video: z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    }),
    videoAspectRatio: z.string(),
  }).optional(),
  name: z.string(),
  nonSkippableAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string(),
      actionHeadline: z.string(),
      companionBanner: z.object({
        assetId: z.string(),
        fileSize: z.string(),
        fullSize: z.object({
          heightPixels: z.number(),
          widthPixels: z.number(),
        }),
        mimeType: z.string(),
      }),
      displayUrl: z.string(),
      finalUrl: z.string(),
      trackingUrl: z.string(),
      video: z.object({
        id: z.string(),
        unavailableReason: z.string(),
        videoAssetId: z.string(),
      }),
    }),
    customParameters: z.record(z.string(), z.unknown()),
  }).optional(),
  videoDiscoverAd: z.object({
    description1: z.string(),
    description2: z.string(),
    headline: z.string(),
    thumbnail: z.string(),
    video: z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    }),
  }).optional(),
  videoPerformanceAd: z.object({
    actionButtonLabels: z.array(z.string()),
    companionBanners: z.array(z.object({
      assetId: z.string(),
      fileSize: z.string(),
      fullSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
      mimeType: z.string(),
    })),
    customParameters: z.record(z.string(), z.unknown()),
    descriptions: z.array(z.string()),
    displayUrlBreadcrumb1: z.string(),
    displayUrlBreadcrumb2: z.string(),
    domain: z.string(),
    finalUrl: z.string(),
    headlines: z.array(z.string()),
    longHeadlines: z.array(z.string()),
    trackingUrl: z.string(),
    videos: z.array(z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    })),
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

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.YoutubeAdGroupAds. Registered at `@swamp/gcp/displayvideo/advertisers-youtubeadgroupads`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-youtubeadgroupads",
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
      description: "A single ad associated with a YouTube ad group.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a youtubeAdGroupAds",
      arguments: z.object({
        identifier: z.string().describe("The name of the youtubeAdGroupAds"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["youtubeAdGroupAdId"] = args.identifier;
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
      description: "Sync youtubeAdGroupAds state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["youtubeAdGroupAdId"] = identifier;
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
      description: "List youtubeAdGroupAds resources",
      arguments: z.object({
        filter: z.string().describe(
          'Allows filtering by custom YouTube ad group ad fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` and `OR`. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `adGroupId` * `displayName` * `entityStatus` * `adGroupAdId` Examples: * All ad group ads under an ad group: `adGroupId="1234"` * All ad group ads under an ad group with an entityStatus of `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED`: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED") AND adGroupId="12345"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information.',
        ).optional(),
        orderBy: z.string().describe(
          'Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.',
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Must be between `1` and `100`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.",
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
          "youtubeAdGroupAds",
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
