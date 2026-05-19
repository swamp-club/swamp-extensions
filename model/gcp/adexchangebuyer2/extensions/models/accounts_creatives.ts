// Auto-generated extension model for @swamp/gcp/adexchangebuyer2/accounts-creatives
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Creatives.
 *
 * A creative and its classification data.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://adexchangebuyer.googleapis.com/";

const GET_CONFIG = {
  "id": "adexchangebuyer2.accounts.creatives.get",
  "path": "v2beta1/accounts/{accountId}/creatives/{creativeId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "creativeId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "creativeId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "adexchangebuyer2.accounts.creatives.create",
  "path": "v2beta1/accounts/{accountId}/creatives",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "duplicateIdMode": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "adexchangebuyer2.accounts.creatives.update",
  "path": "v2beta1/accounts/{accountId}/creatives/{creativeId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "creativeId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "creativeId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accountId: z.string().describe(
    "The account that this creative belongs to. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  adChoicesDestinationUrl: z.string().describe(
    "The link to AdChoices destination page.",
  ).optional(),
  adTechnologyProviders: z.object({
    detectedProviderIds: z.array(z.string()).describe(
      "The detected ad technology provider IDs for this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/providers.csv for mapping of provider ID to provided name, a privacy policy URL, and a list of domains which can be attributed to the provider. If the creative contains provider IDs that are outside of those listed in the `BidRequest.adslot.consented_providers_settings.consented_providers` field on the (Google bid protocol)[https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto] and the `BidRequest.user.ext.consented_providers_settings.consented_providers` field on the (OpenRTB protocol)[https://developers.google.com/authorized-buyers/rtb/downloads/openrtb-adx-proto], and a bid is submitted with that creative for an impression that will serve to an EEA user, the bid will be filtered before the auction.",
    ).optional(),
    hasUnidentifiedProvider: z.boolean().describe(
      "Whether the creative contains an unidentified ad technology provider. If true for a given creative, any bid submitted with that creative for an impression that will serve to an EEA user will be filtered before the auction.",
    ).optional(),
  }).describe("Detected ad technology provider information.").optional(),
  advertiserName: z.string().describe(
    "The name of the company being advertised in the creative.",
  ).optional(),
  agencyId: z.string().describe("The agency ID for this creative.").optional(),
  attributes: z.array(
    z.enum([
      "ATTRIBUTE_UNSPECIFIED",
      "IMAGE_RICH_MEDIA",
      "ADOBE_FLASH_FLV",
      "IS_TAGGED",
      "IS_COOKIE_TARGETED",
      "IS_USER_INTEREST_TARGETED",
      "EXPANDING_DIRECTION_NONE",
      "EXPANDING_DIRECTION_UP",
      "EXPANDING_DIRECTION_DOWN",
      "EXPANDING_DIRECTION_LEFT",
      "EXPANDING_DIRECTION_RIGHT",
      "EXPANDING_DIRECTION_UP_LEFT",
      "EXPANDING_DIRECTION_UP_RIGHT",
      "EXPANDING_DIRECTION_DOWN_LEFT",
      "EXPANDING_DIRECTION_DOWN_RIGHT",
      "CREATIVE_TYPE_HTML",
      "CREATIVE_TYPE_VAST_VIDEO",
      "EXPANDING_DIRECTION_UP_OR_DOWN",
      "EXPANDING_DIRECTION_LEFT_OR_RIGHT",
      "EXPANDING_DIRECTION_ANY_DIAGONAL",
      "EXPANDING_ACTION_ROLLOVER_TO_EXPAND",
      "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH",
      "RICH_MEDIA_CAPABILITY_TYPE_MRAID",
      "RICH_MEDIA_CAPABILITY_TYPE_FLASH",
      "RICH_MEDIA_CAPABILITY_TYPE_HTML5",
      "SKIPPABLE_INSTREAM_VIDEO",
      "RICH_MEDIA_CAPABILITY_TYPE_SSL",
      "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL",
      "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL",
      "NON_SKIPPABLE_INSTREAM_VIDEO",
      "NATIVE_ELIGIBILITY_ELIGIBLE",
      "NON_VPAID",
      "NATIVE_ELIGIBILITY_NOT_ELIGIBLE",
      "ANY_INTERSTITIAL",
      "NON_INTERSTITIAL",
      "IN_BANNER_VIDEO",
      "RENDERING_SIZELESS_ADX",
      "OMSDK_1_0",
      "RENDERING_PLAYABLE",
    ]),
  ).describe(
    "All attributes for the ads that may be shown from this creative. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  clickThroughUrls: z.array(z.string()).describe(
    "The set of destination URLs for the creative.",
  ).optional(),
  creativeId: z.string().describe(
    "The buyer-defined creative ID of this creative. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  declaredClickThroughUrls: z.array(z.string()).describe(
    "The set of declared destination URLs for the creative.",
  ).optional(),
  html: z.object({
    height: z.number().int().describe(
      "The height of the HTML snippet in pixels.",
    ).optional(),
    snippet: z.string().describe(
      "The HTML snippet that displays the ad when inserted in the web page.",
    ).optional(),
    width: z.number().int().describe("The width of the HTML snippet in pixels.")
      .optional(),
  }).describe("HTML content for a creative.").optional(),
  impressionTrackingUrls: z.array(z.string()).describe(
    "The set of URLs to be called to record an impression.",
  ).optional(),
  native: z.object({
    advertiserName: z.string().describe(
      "The name of the advertiser or sponsor, to be displayed in the ad creative.",
    ).optional(),
    appIcon: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    body: z.string().describe("A long description of the ad.").optional(),
    callToAction: z.string().describe(
      "A label for the button that the user is supposed to click.",
    ).optional(),
    clickLinkUrl: z.string().describe(
      "The URL that the browser/SDK will load when the user clicks the ad.",
    ).optional(),
    clickTrackingUrl: z.string().describe("The URL to use for click tracking.")
      .optional(),
    headline: z.string().describe("A short title for the ad.").optional(),
    image: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    logo: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    priceDisplayText: z.string().describe(
      "The price of the promoted app including currency info.",
    ).optional(),
    starRating: z.number().describe(
      "The app rating in the app store. Must be in the range [0-5].",
    ).optional(),
    storeUrl: z.string().describe(
      "The URL to the app store to purchase/download the promoted app.",
    ).optional(),
    videoUrl: z.string().describe("The URL to fetch a native video ad.")
      .optional(),
  }).describe("Native content for a creative.").optional(),
  restrictedCategories: z.array(z.enum(["NO_RESTRICTED_CATEGORIES", "ALCOHOL"]))
    .describe(
      "All restricted categories for the ads that may be shown from this creative.",
    ).optional(),
  vendorIds: z.array(z.number().int()).describe(
    "All vendor IDs for the ads that may be shown from this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for possible values.",
  ).optional(),
  video: z.object({
    videoUrl: z.string().describe("The URL to fetch a video ad.").optional(),
    videoVastXml: z.string().describe(
      "The contents of a VAST document for a video ad. This document should conform to the VAST 2.0 or 3.0 standard.",
    ).optional(),
  }).describe("Video content for a creative.").optional(),
  duplicateIdMode: z.string().describe(
    "Indicates if multiple creatives can share an ID or not. Default is NO_DUPLICATES (one ID per creative).",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  adChoicesDestinationUrl: z.string().optional(),
  adTechnologyProviders: z.object({
    detectedProviderIds: z.array(z.string()),
    hasUnidentifiedProvider: z.boolean(),
  }).optional(),
  advertiserName: z.string().optional(),
  agencyId: z.string().optional(),
  apiUpdateTime: z.string().optional(),
  attributes: z.array(z.string()).optional(),
  clickThroughUrls: z.array(z.string()).optional(),
  corrections: z.array(z.object({
    contexts: z.array(z.object({
      all: z.string(),
      appType: z.object({
        appTypes: z.unknown(),
      }),
      auctionType: z.object({
        auctionTypes: z.unknown(),
      }),
      location: z.object({
        geoCriteriaIds: z.unknown(),
      }),
      platform: z.object({
        platforms: z.unknown(),
      }),
      securityType: z.object({
        securities: z.unknown(),
      }),
    })),
    details: z.array(z.string()),
    type: z.string(),
  })).optional(),
  creativeId: z.string().optional(),
  dealsStatus: z.string().optional(),
  declaredClickThroughUrls: z.array(z.string()).optional(),
  detectedAdvertiserIds: z.array(z.string()).optional(),
  detectedDomains: z.array(z.string()).optional(),
  detectedLanguages: z.array(z.string()).optional(),
  detectedProductCategories: z.array(z.number()).optional(),
  detectedSensitiveCategories: z.array(z.number()).optional(),
  html: z.object({
    height: z.number(),
    snippet: z.string(),
    width: z.number(),
  }).optional(),
  impressionTrackingUrls: z.array(z.string()).optional(),
  native: z.object({
    advertiserName: z.string(),
    appIcon: z.object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    }),
    body: z.string(),
    callToAction: z.string(),
    clickLinkUrl: z.string(),
    clickTrackingUrl: z.string(),
    headline: z.string(),
    image: z.object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    }),
    logo: z.object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    }),
    priceDisplayText: z.string(),
    starRating: z.number(),
    storeUrl: z.string(),
    videoUrl: z.string(),
  }).optional(),
  openAuctionStatus: z.string().optional(),
  restrictedCategories: z.array(z.string()).optional(),
  servingRestrictions: z.array(z.object({
    contexts: z.array(z.object({
      all: z.string(),
      appType: z.object({
        appTypes: z.unknown(),
      }),
      auctionType: z.object({
        auctionTypes: z.unknown(),
      }),
      location: z.object({
        geoCriteriaIds: z.unknown(),
      }),
      platform: z.object({
        platforms: z.unknown(),
      }),
      securityType: z.object({
        securities: z.unknown(),
      }),
    })),
    disapproval: z.object({
      details: z.array(z.string()),
      reason: z.string(),
    }),
    disapprovalReasons: z.array(z.object({
      details: z.array(z.unknown()),
      reason: z.string(),
    })),
    status: z.string(),
  })).optional(),
  vendorIds: z.array(z.number()).optional(),
  version: z.number().optional(),
  video: z.object({
    videoUrl: z.string(),
    videoVastXml: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accountId: z.string().describe(
    "The account that this creative belongs to. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  adChoicesDestinationUrl: z.string().describe(
    "The link to AdChoices destination page.",
  ).optional(),
  adTechnologyProviders: z.object({
    detectedProviderIds: z.array(z.string()).describe(
      "The detected ad technology provider IDs for this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/providers.csv for mapping of provider ID to provided name, a privacy policy URL, and a list of domains which can be attributed to the provider. If the creative contains provider IDs that are outside of those listed in the `BidRequest.adslot.consented_providers_settings.consented_providers` field on the (Google bid protocol)[https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto] and the `BidRequest.user.ext.consented_providers_settings.consented_providers` field on the (OpenRTB protocol)[https://developers.google.com/authorized-buyers/rtb/downloads/openrtb-adx-proto], and a bid is submitted with that creative for an impression that will serve to an EEA user, the bid will be filtered before the auction.",
    ).optional(),
    hasUnidentifiedProvider: z.boolean().describe(
      "Whether the creative contains an unidentified ad technology provider. If true for a given creative, any bid submitted with that creative for an impression that will serve to an EEA user will be filtered before the auction.",
    ).optional(),
  }).describe("Detected ad technology provider information.").optional(),
  advertiserName: z.string().describe(
    "The name of the company being advertised in the creative.",
  ).optional(),
  agencyId: z.string().describe("The agency ID for this creative.").optional(),
  attributes: z.array(
    z.enum([
      "ATTRIBUTE_UNSPECIFIED",
      "IMAGE_RICH_MEDIA",
      "ADOBE_FLASH_FLV",
      "IS_TAGGED",
      "IS_COOKIE_TARGETED",
      "IS_USER_INTEREST_TARGETED",
      "EXPANDING_DIRECTION_NONE",
      "EXPANDING_DIRECTION_UP",
      "EXPANDING_DIRECTION_DOWN",
      "EXPANDING_DIRECTION_LEFT",
      "EXPANDING_DIRECTION_RIGHT",
      "EXPANDING_DIRECTION_UP_LEFT",
      "EXPANDING_DIRECTION_UP_RIGHT",
      "EXPANDING_DIRECTION_DOWN_LEFT",
      "EXPANDING_DIRECTION_DOWN_RIGHT",
      "CREATIVE_TYPE_HTML",
      "CREATIVE_TYPE_VAST_VIDEO",
      "EXPANDING_DIRECTION_UP_OR_DOWN",
      "EXPANDING_DIRECTION_LEFT_OR_RIGHT",
      "EXPANDING_DIRECTION_ANY_DIAGONAL",
      "EXPANDING_ACTION_ROLLOVER_TO_EXPAND",
      "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH",
      "RICH_MEDIA_CAPABILITY_TYPE_MRAID",
      "RICH_MEDIA_CAPABILITY_TYPE_FLASH",
      "RICH_MEDIA_CAPABILITY_TYPE_HTML5",
      "SKIPPABLE_INSTREAM_VIDEO",
      "RICH_MEDIA_CAPABILITY_TYPE_SSL",
      "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL",
      "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL",
      "NON_SKIPPABLE_INSTREAM_VIDEO",
      "NATIVE_ELIGIBILITY_ELIGIBLE",
      "NON_VPAID",
      "NATIVE_ELIGIBILITY_NOT_ELIGIBLE",
      "ANY_INTERSTITIAL",
      "NON_INTERSTITIAL",
      "IN_BANNER_VIDEO",
      "RENDERING_SIZELESS_ADX",
      "OMSDK_1_0",
      "RENDERING_PLAYABLE",
    ]),
  ).describe(
    "All attributes for the ads that may be shown from this creative. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  clickThroughUrls: z.array(z.string()).describe(
    "The set of destination URLs for the creative.",
  ).optional(),
  creativeId: z.string().describe(
    "The buyer-defined creative ID of this creative. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  declaredClickThroughUrls: z.array(z.string()).describe(
    "The set of declared destination URLs for the creative.",
  ).optional(),
  html: z.object({
    height: z.number().int().describe(
      "The height of the HTML snippet in pixels.",
    ).optional(),
    snippet: z.string().describe(
      "The HTML snippet that displays the ad when inserted in the web page.",
    ).optional(),
    width: z.number().int().describe("The width of the HTML snippet in pixels.")
      .optional(),
  }).describe("HTML content for a creative.").optional(),
  impressionTrackingUrls: z.array(z.string()).describe(
    "The set of URLs to be called to record an impression.",
  ).optional(),
  native: z.object({
    advertiserName: z.string().describe(
      "The name of the advertiser or sponsor, to be displayed in the ad creative.",
    ).optional(),
    appIcon: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    body: z.string().describe("A long description of the ad.").optional(),
    callToAction: z.string().describe(
      "A label for the button that the user is supposed to click.",
    ).optional(),
    clickLinkUrl: z.string().describe(
      "The URL that the browser/SDK will load when the user clicks the ad.",
    ).optional(),
    clickTrackingUrl: z.string().describe("The URL to use for click tracking.")
      .optional(),
    headline: z.string().describe("A short title for the ad.").optional(),
    image: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    logo: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    priceDisplayText: z.string().describe(
      "The price of the promoted app including currency info.",
    ).optional(),
    starRating: z.number().describe(
      "The app rating in the app store. Must be in the range [0-5].",
    ).optional(),
    storeUrl: z.string().describe(
      "The URL to the app store to purchase/download the promoted app.",
    ).optional(),
    videoUrl: z.string().describe("The URL to fetch a native video ad.")
      .optional(),
  }).describe("Native content for a creative.").optional(),
  restrictedCategories: z.array(z.enum(["NO_RESTRICTED_CATEGORIES", "ALCOHOL"]))
    .describe(
      "All restricted categories for the ads that may be shown from this creative.",
    ).optional(),
  vendorIds: z.array(z.number().int()).describe(
    "All vendor IDs for the ads that may be shown from this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for possible values.",
  ).optional(),
  video: z.object({
    videoUrl: z.string().describe("The URL to fetch a video ad.").optional(),
    videoVastXml: z.string().describe(
      "The contents of a VAST document for a video ad. This document should conform to the VAST 2.0 or 3.0 standard.",
    ).optional(),
  }).describe("Video content for a creative.").optional(),
  duplicateIdMode: z.string().describe(
    "Indicates if multiple creatives can share an ID or not. Default is NO_DUPLICATES (one ID per creative).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Creatives. Registered at `@swamp/gcp/adexchangebuyer2/accounts-creatives`. */
export const model = {
  type: "@swamp/gcp/adexchangebuyer2/accounts-creatives",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A creative and its classification data.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a creatives",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["adChoicesDestinationUrl"] !== undefined) {
          body["adChoicesDestinationUrl"] = g["adChoicesDestinationUrl"];
        }
        if (g["adTechnologyProviders"] !== undefined) {
          body["adTechnologyProviders"] = g["adTechnologyProviders"];
        }
        if (g["advertiserName"] !== undefined) {
          body["advertiserName"] = g["advertiserName"];
        }
        if (g["agencyId"] !== undefined) body["agencyId"] = g["agencyId"];
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["clickThroughUrls"] !== undefined) {
          body["clickThroughUrls"] = g["clickThroughUrls"];
        }
        if (g["creativeId"] !== undefined) body["creativeId"] = g["creativeId"];
        if (g["declaredClickThroughUrls"] !== undefined) {
          body["declaredClickThroughUrls"] = g["declaredClickThroughUrls"];
        }
        if (g["html"] !== undefined) body["html"] = g["html"];
        if (g["impressionTrackingUrls"] !== undefined) {
          body["impressionTrackingUrls"] = g["impressionTrackingUrls"];
        }
        if (g["native"] !== undefined) body["native"] = g["native"];
        if (g["restrictedCategories"] !== undefined) {
          body["restrictedCategories"] = g["restrictedCategories"];
        }
        if (g["vendorIds"] !== undefined) body["vendorIds"] = g["vendorIds"];
        if (g["video"] !== undefined) body["video"] = g["video"];
        if (g["duplicateIdMode"] !== undefined) {
          body["duplicateIdMode"] = g["duplicateIdMode"];
        }
        if (g["name"] !== undefined) params["creativeId"] = String(g["name"]);
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
      description: "Get a creatives",
      arguments: z.object({
        identifier: z.string().describe("The name of the creatives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        params["creativeId"] = args.identifier;
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
    update: {
      description: "Update creatives attributes",
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
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        } else if (existing["accountId"]) {
          params["accountId"] = String(existing["accountId"]);
        }
        params["creativeId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["adChoicesDestinationUrl"] !== undefined) {
          body["adChoicesDestinationUrl"] = g["adChoicesDestinationUrl"];
        }
        if (g["adTechnologyProviders"] !== undefined) {
          body["adTechnologyProviders"] = g["adTechnologyProviders"];
        }
        if (g["advertiserName"] !== undefined) {
          body["advertiserName"] = g["advertiserName"];
        }
        if (g["agencyId"] !== undefined) body["agencyId"] = g["agencyId"];
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["clickThroughUrls"] !== undefined) {
          body["clickThroughUrls"] = g["clickThroughUrls"];
        }
        if (g["declaredClickThroughUrls"] !== undefined) {
          body["declaredClickThroughUrls"] = g["declaredClickThroughUrls"];
        }
        if (g["html"] !== undefined) body["html"] = g["html"];
        if (g["impressionTrackingUrls"] !== undefined) {
          body["impressionTrackingUrls"] = g["impressionTrackingUrls"];
        }
        if (g["native"] !== undefined) body["native"] = g["native"];
        if (g["restrictedCategories"] !== undefined) {
          body["restrictedCategories"] = g["restrictedCategories"];
        }
        if (g["vendorIds"] !== undefined) body["vendorIds"] = g["vendorIds"];
        if (g["video"] !== undefined) body["video"] = g["video"];
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
          UPDATE_CONFIG,
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
      description: "Sync creatives state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["creativeId"] = identifier;
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
    stop_watching: {
      description: "stop watching",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["creativeId"] !== undefined) {
          params["creativeId"] = String(g["creativeId"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "adexchangebuyer2.accounts.creatives.stopWatching",
            "path":
              "v2beta1/accounts/{accountId}/creatives/{creativeId}:stopWatching",
            "httpMethod": "POST",
            "parameterOrder": ["accountId", "creativeId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "creativeId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    watch: {
      description: "watch",
      arguments: z.object({
        topic: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["creativeId"] !== undefined) {
          params["creativeId"] = String(g["creativeId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["topic"] !== undefined) body["topic"] = args["topic"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "adexchangebuyer2.accounts.creatives.watch",
            "path": "v2beta1/accounts/{accountId}/creatives/{creativeId}:watch",
            "httpMethod": "POST",
            "parameterOrder": ["accountId", "creativeId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "creativeId": { "location": "path", "required": true },
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
