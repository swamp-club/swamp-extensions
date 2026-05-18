// Auto-generated extension model for @swamp/gcp/displayvideo/inventorysources
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 InventorySources.
 *
 * An inventory source.
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

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.inventorySources.get",
  "path": "v4/inventorySources/{+inventorySourceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "inventorySourceId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "inventorySourceId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.inventorySources.create",
  "path": "v4/inventorySources",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "displayvideo.inventorySources.patch",
  "path": "v4/inventorySources/{+inventorySourceId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "inventorySourceId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "query",
    },
    "inventorySourceId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  commitment: z.enum([
    "INVENTORY_SOURCE_COMMITMENT_UNSPECIFIED",
    "INVENTORY_SOURCE_COMMITMENT_GUARANTEED",
    "INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED",
  ]).describe(
    "Whether the inventory source has a guaranteed or non-guaranteed delivery.",
  ).optional(),
  creativeConfigs: z.array(z.object({
    creativeType: z.enum([
      "CREATIVE_TYPE_UNSPECIFIED",
      "CREATIVE_TYPE_STANDARD",
      "CREATIVE_TYPE_EXPANDABLE",
      "CREATIVE_TYPE_VIDEO",
      "CREATIVE_TYPE_NATIVE",
      "CREATIVE_TYPE_TEMPLATED_APP_INSTALL",
      "CREATIVE_TYPE_NATIVE_SITE_SQUARE",
      "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL",
      "CREATIVE_TYPE_LIGHTBOX",
      "CREATIVE_TYPE_NATIVE_APP_INSTALL",
      "CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE",
      "CREATIVE_TYPE_AUDIO",
      "CREATIVE_TYPE_PUBLISHER_HOSTED",
      "CREATIVE_TYPE_NATIVE_VIDEO",
      "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO",
      "CREATIVE_TYPE_ASSET_BASED_CREATIVE",
    ]).describe(
      "The type of creative that can be assigned to the inventory source. Only the following types are supported: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_VIDEO`",
    ).optional(),
    displayCreativeConfig: z.object({
      creativeSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
    }).describe("The configuration for display creatives.").optional(),
    videoCreativeConfig: z.object({
      duration: z.string().describe(
        "The duration requirements for the video creatives that can be assigned to the inventory source.",
      ).optional(),
    }).describe("The configuration for video creatives.").optional(),
  })).describe(
    "The creative requirements of the inventory source. Not applicable for auction packages.",
  ).optional(),
  dealId: z.string().describe(
    "The ID in the exchange space that uniquely identifies the inventory source. Must be unique across buyers within each exchange but not necessarily unique across exchanges.",
  ).optional(),
  deliveryMethod: z.enum([
    "INVENTORY_SOURCE_DELIVERY_METHOD_UNSPECIFIED",
    "INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC",
    "INVENTORY_SOURCE_DELIVERY_METHOD_TAG",
  ]).describe(
    "The delivery method of the inventory source. * For non-guaranteed inventory sources, the only acceptable value is `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`. * For guaranteed inventory sources, acceptable values are `INVENTORY_SOURCE_DELIVERY_METHOD_TAG` and `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`.",
  ).optional(),
  displayName: z.string().describe(
    "The display name of the inventory source. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  exchange: z.enum([
    "EXCHANGE_UNSPECIFIED",
    "EXCHANGE_GOOGLE_AD_MANAGER",
    "EXCHANGE_APPNEXUS",
    "EXCHANGE_BRIGHTROLL",
    "EXCHANGE_ADFORM",
    "EXCHANGE_ADMETA",
    "EXCHANGE_ADMIXER",
    "EXCHANGE_ADSMOGO",
    "EXCHANGE_ADSWIZZ",
    "EXCHANGE_BIDSWITCH",
    "EXCHANGE_BRIGHTROLL_DISPLAY",
    "EXCHANGE_CADREON",
    "EXCHANGE_DAILYMOTION",
    "EXCHANGE_FIVE",
    "EXCHANGE_FLUCT",
    "EXCHANGE_FREEWHEEL",
    "EXCHANGE_GENIEE",
    "EXCHANGE_GUMGUM",
    "EXCHANGE_IMOBILE",
    "EXCHANGE_IBILLBOARD",
    "EXCHANGE_IMPROVE_DIGITAL",
    "EXCHANGE_INDEX",
    "EXCHANGE_KARGO",
    "EXCHANGE_MICROAD",
    "EXCHANGE_MOPUB",
    "EXCHANGE_NEND",
    "EXCHANGE_ONE_BY_AOL_DISPLAY",
    "EXCHANGE_ONE_BY_AOL_MOBILE",
    "EXCHANGE_ONE_BY_AOL_VIDEO",
    "EXCHANGE_OOYALA",
    "EXCHANGE_OPENX",
    "EXCHANGE_PERMODO",
    "EXCHANGE_PLATFORMONE",
    "EXCHANGE_PLATFORMID",
    "EXCHANGE_PUBMATIC",
    "EXCHANGE_PULSEPOINT",
    "EXCHANGE_REVENUEMAX",
    "EXCHANGE_RUBICON",
    "EXCHANGE_SMARTCLIP",
    "EXCHANGE_SMARTRTB",
    "EXCHANGE_SMARTSTREAMTV",
    "EXCHANGE_SOVRN",
    "EXCHANGE_SPOTXCHANGE",
    "EXCHANGE_STROER",
    "EXCHANGE_TEADSTV",
    "EXCHANGE_TELARIA",
    "EXCHANGE_TVN",
    "EXCHANGE_UNITED",
    "EXCHANGE_YIELDLAB",
    "EXCHANGE_YIELDMO",
    "EXCHANGE_UNRULYX",
    "EXCHANGE_OPEN8",
    "EXCHANGE_TRITON",
    "EXCHANGE_TRIPLELIFT",
    "EXCHANGE_TABOOLA",
    "EXCHANGE_INMOBI",
    "EXCHANGE_SMAATO",
    "EXCHANGE_AJA",
    "EXCHANGE_SUPERSHIP",
    "EXCHANGE_NEXSTAR_DIGITAL",
    "EXCHANGE_WAZE",
    "EXCHANGE_SOUNDCAST",
    "EXCHANGE_SHARETHROUGH",
    "EXCHANGE_FYBER",
    "EXCHANGE_RED_FOR_PUBLISHERS",
    "EXCHANGE_MEDIANET",
    "EXCHANGE_TAPJOY",
    "EXCHANGE_VISTAR",
    "EXCHANGE_DAX",
    "EXCHANGE_JCD",
    "EXCHANGE_PLACE_EXCHANGE",
    "EXCHANGE_APPLOVIN",
    "EXCHANGE_CONNATIX",
    "EXCHANGE_RESET_DIGITAL",
    "EXCHANGE_HIVESTACK",
    "EXCHANGE_DRAX",
    "EXCHANGE_APPLOVIN_GBID",
    "EXCHANGE_FYBER_GBID",
    "EXCHANGE_UNITY_GBID",
    "EXCHANGE_CHARTBOOST_GBID",
    "EXCHANGE_ADMOST_GBID",
    "EXCHANGE_TOPON_GBID",
    "EXCHANGE_NETFLIX",
    "EXCHANGE_CORE",
    "EXCHANGE_COMMERCE_GRID",
    "EXCHANGE_SPOTIFY",
    "EXCHANGE_TUBI",
    "EXCHANGE_SNAP",
    "EXCHANGE_CADENT",
  ]).describe("The exchange to which the inventory source belongs.").optional(),
  guaranteedOrderId: z.string().describe(
    "Immutable. The ID of the guaranteed order that this inventory source belongs to. Only applicable when commitment is `INVENTORY_SOURCE_COMMITMENT_GUARANTEED`.",
  ).optional(),
  inventorySourceType: z.enum([
    "INVENTORY_SOURCE_TYPE_UNSPECIFIED",
    "INVENTORY_SOURCE_TYPE_PRIVATE",
    "INVENTORY_SOURCE_TYPE_AUCTION_PACKAGE",
  ]).describe("Denotes the type of the inventory source.").optional(),
  publisherName: z.string().describe(
    "The publisher/seller name of the inventory source.",
  ).optional(),
  rateDetails: z.object({
    inventorySourceRateType: z.enum([
      "INVENTORY_SOURCE_RATE_TYPE_UNSPECIFIED",
      "INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED",
      "INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR",
      "INVENTORY_SOURCE_RATE_TYPE_CPD",
      "INVENTORY_SOURCE_RATE_TYPE_CPH",
      "INVENTORY_SOURCE_RATE_TYPE_FLAT",
    ]).describe(
      "The rate type. Acceptable values are `INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED`, `INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR`, and `INVENTORY_SOURCE_RATE_TYPE_CPD`.",
    ).optional(),
    minimumSpend: z.object({
      currencyCode: z.string().describe(
        "The three-letter currency code defined in ISO 4217.",
      ).optional(),
      nanos: z.number().int().describe(
        "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
      ).optional(),
      units: z.string().describe(
        'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
      ).optional(),
    }).describe("Represents an amount of money with its currency type.")
      .optional(),
    rate: z.object({
      currencyCode: z.string().describe(
        "The three-letter currency code defined in ISO 4217.",
      ).optional(),
      nanos: z.number().int().describe(
        "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
      ).optional(),
      units: z.string().describe(
        'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
      ).optional(),
    }).describe("Represents an amount of money with its currency type.")
      .optional(),
    unitsPurchased: z.string().describe(
      "Required for guaranteed inventory sources. The number of impressions guaranteed by the seller.",
    ).optional(),
  }).describe("The rate related settings of the inventory source.").optional(),
  readWriteAccessors: z.object({
    advertisers: z.object({
      advertiserIds: z.array(z.string()).describe("The IDs of the advertisers.")
        .optional(),
    }).describe("The advertisers with access to the inventory source.")
      .optional(),
    partner: z.object({
      partnerId: z.string().describe("The ID of the partner.").optional(),
    }).describe("The partner with access to the inventory source.").optional(),
  }).describe("The partner or advertisers with access to the inventory source.")
    .optional(),
  status: z.object({
    configStatus: z.enum([
      "INVENTORY_SOURCE_CONFIG_STATUS_UNSPECIFIED",
      "INVENTORY_SOURCE_CONFIG_STATUS_PENDING",
      "INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED",
    ]).describe(
      "Output only. The configuration status of the inventory source. Only applicable for guaranteed inventory sources. Acceptable values are `INVENTORY_SOURCE_CONFIG_STATUS_PENDING` and `INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED`. An inventory source must be configured (fill in the required fields, choose creatives, and select a default campaign) before it can serve.",
    ).optional(),
    entityPauseReason: z.string().describe(
      "The user-provided reason for pausing this inventory source. Must not exceed 100 characters. Only applicable when entity_status is set to `ENTITY_STATUS_PAUSED`.",
    ).optional(),
    entityStatus: z.enum([
      "ENTITY_STATUS_UNSPECIFIED",
      "ENTITY_STATUS_ACTIVE",
      "ENTITY_STATUS_ARCHIVED",
      "ENTITY_STATUS_DRAFT",
      "ENTITY_STATUS_PAUSED",
      "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
    ]).describe(
      "Whether or not the inventory source is servable. Acceptable values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`.",
    ).optional(),
    sellerPauseReason: z.string().describe(
      "Output only. The seller-provided reason for pausing this inventory source. Only applicable for inventory sources synced directly from the publishers and when seller_status is set to `ENTITY_STATUS_PAUSED`.",
    ).optional(),
    sellerStatus: z.enum([
      "ENTITY_STATUS_UNSPECIFIED",
      "ENTITY_STATUS_ACTIVE",
      "ENTITY_STATUS_ARCHIVED",
      "ENTITY_STATUS_DRAFT",
      "ENTITY_STATUS_PAUSED",
      "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
    ]).describe(
      "Output only. The status set by the seller for the inventory source. Only applicable for inventory sources synced directly from the publishers. Acceptable values are `ENTITY_STATUS_ACTIVE` and `ENTITY_STATUS_PAUSED`.",
    ).optional(),
  }).describe("The status related settings of the inventory source.")
    .optional(),
  timeRange: z.object({
    endTime: z.string().describe(
      "Required. The upper bound of a time range, inclusive.",
    ).optional(),
    startTime: z.string().describe(
      "Required. The lower bound of a time range, inclusive.",
    ).optional(),
  }).describe("A time range.").optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that the request is being made within.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that the request is being made within.",
  ).optional(),
});

const StateSchema = z.object({
  commitment: z.string().optional(),
  creativeConfigs: z.array(z.object({
    creativeType: z.string(),
    displayCreativeConfig: z.object({
      creativeSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
    }),
    videoCreativeConfig: z.object({
      duration: z.string(),
    }),
  })).optional(),
  dealId: z.string().optional(),
  deliveryMethod: z.string().optional(),
  displayName: z.string().optional(),
  exchange: z.string().optional(),
  guaranteedOrderId: z.string().optional(),
  inventorySourceId: z.string().optional(),
  inventorySourceProductType: z.string().optional(),
  inventorySourceType: z.string().optional(),
  name: z.string(),
  publisherName: z.string().optional(),
  rateDetails: z.object({
    inventorySourceRateType: z.string(),
    minimumSpend: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
    rate: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
    unitsPurchased: z.string(),
  }).optional(),
  readAdvertiserIds: z.array(z.string()).optional(),
  readPartnerIds: z.array(z.string()).optional(),
  readWriteAccessors: z.object({
    advertisers: z.object({
      advertiserIds: z.array(z.string()),
    }),
    partner: z.object({
      partnerId: z.string(),
    }),
  }).optional(),
  status: z.object({
    configStatus: z.string(),
    entityPauseReason: z.string(),
    entityStatus: z.string(),
    sellerPauseReason: z.string(),
    sellerStatus: z.string(),
  }).optional(),
  timeRange: z.object({
    endTime: z.string(),
    startTime: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  commitment: z.enum([
    "INVENTORY_SOURCE_COMMITMENT_UNSPECIFIED",
    "INVENTORY_SOURCE_COMMITMENT_GUARANTEED",
    "INVENTORY_SOURCE_COMMITMENT_NON_GUARANTEED",
  ]).describe(
    "Whether the inventory source has a guaranteed or non-guaranteed delivery.",
  ).optional(),
  creativeConfigs: z.array(z.object({
    creativeType: z.enum([
      "CREATIVE_TYPE_UNSPECIFIED",
      "CREATIVE_TYPE_STANDARD",
      "CREATIVE_TYPE_EXPANDABLE",
      "CREATIVE_TYPE_VIDEO",
      "CREATIVE_TYPE_NATIVE",
      "CREATIVE_TYPE_TEMPLATED_APP_INSTALL",
      "CREATIVE_TYPE_NATIVE_SITE_SQUARE",
      "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL",
      "CREATIVE_TYPE_LIGHTBOX",
      "CREATIVE_TYPE_NATIVE_APP_INSTALL",
      "CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE",
      "CREATIVE_TYPE_AUDIO",
      "CREATIVE_TYPE_PUBLISHER_HOSTED",
      "CREATIVE_TYPE_NATIVE_VIDEO",
      "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO",
      "CREATIVE_TYPE_ASSET_BASED_CREATIVE",
    ]).describe(
      "The type of creative that can be assigned to the inventory source. Only the following types are supported: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_VIDEO`",
    ).optional(),
    displayCreativeConfig: z.object({
      creativeSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
    }).describe("The configuration for display creatives.").optional(),
    videoCreativeConfig: z.object({
      duration: z.string().describe(
        "The duration requirements for the video creatives that can be assigned to the inventory source.",
      ).optional(),
    }).describe("The configuration for video creatives.").optional(),
  })).describe(
    "The creative requirements of the inventory source. Not applicable for auction packages.",
  ).optional(),
  dealId: z.string().describe(
    "The ID in the exchange space that uniquely identifies the inventory source. Must be unique across buyers within each exchange but not necessarily unique across exchanges.",
  ).optional(),
  deliveryMethod: z.enum([
    "INVENTORY_SOURCE_DELIVERY_METHOD_UNSPECIFIED",
    "INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC",
    "INVENTORY_SOURCE_DELIVERY_METHOD_TAG",
  ]).describe(
    "The delivery method of the inventory source. * For non-guaranteed inventory sources, the only acceptable value is `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`. * For guaranteed inventory sources, acceptable values are `INVENTORY_SOURCE_DELIVERY_METHOD_TAG` and `INVENTORY_SOURCE_DELIVERY_METHOD_PROGRAMMATIC`.",
  ).optional(),
  displayName: z.string().describe(
    "The display name of the inventory source. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  exchange: z.enum([
    "EXCHANGE_UNSPECIFIED",
    "EXCHANGE_GOOGLE_AD_MANAGER",
    "EXCHANGE_APPNEXUS",
    "EXCHANGE_BRIGHTROLL",
    "EXCHANGE_ADFORM",
    "EXCHANGE_ADMETA",
    "EXCHANGE_ADMIXER",
    "EXCHANGE_ADSMOGO",
    "EXCHANGE_ADSWIZZ",
    "EXCHANGE_BIDSWITCH",
    "EXCHANGE_BRIGHTROLL_DISPLAY",
    "EXCHANGE_CADREON",
    "EXCHANGE_DAILYMOTION",
    "EXCHANGE_FIVE",
    "EXCHANGE_FLUCT",
    "EXCHANGE_FREEWHEEL",
    "EXCHANGE_GENIEE",
    "EXCHANGE_GUMGUM",
    "EXCHANGE_IMOBILE",
    "EXCHANGE_IBILLBOARD",
    "EXCHANGE_IMPROVE_DIGITAL",
    "EXCHANGE_INDEX",
    "EXCHANGE_KARGO",
    "EXCHANGE_MICROAD",
    "EXCHANGE_MOPUB",
    "EXCHANGE_NEND",
    "EXCHANGE_ONE_BY_AOL_DISPLAY",
    "EXCHANGE_ONE_BY_AOL_MOBILE",
    "EXCHANGE_ONE_BY_AOL_VIDEO",
    "EXCHANGE_OOYALA",
    "EXCHANGE_OPENX",
    "EXCHANGE_PERMODO",
    "EXCHANGE_PLATFORMONE",
    "EXCHANGE_PLATFORMID",
    "EXCHANGE_PUBMATIC",
    "EXCHANGE_PULSEPOINT",
    "EXCHANGE_REVENUEMAX",
    "EXCHANGE_RUBICON",
    "EXCHANGE_SMARTCLIP",
    "EXCHANGE_SMARTRTB",
    "EXCHANGE_SMARTSTREAMTV",
    "EXCHANGE_SOVRN",
    "EXCHANGE_SPOTXCHANGE",
    "EXCHANGE_STROER",
    "EXCHANGE_TEADSTV",
    "EXCHANGE_TELARIA",
    "EXCHANGE_TVN",
    "EXCHANGE_UNITED",
    "EXCHANGE_YIELDLAB",
    "EXCHANGE_YIELDMO",
    "EXCHANGE_UNRULYX",
    "EXCHANGE_OPEN8",
    "EXCHANGE_TRITON",
    "EXCHANGE_TRIPLELIFT",
    "EXCHANGE_TABOOLA",
    "EXCHANGE_INMOBI",
    "EXCHANGE_SMAATO",
    "EXCHANGE_AJA",
    "EXCHANGE_SUPERSHIP",
    "EXCHANGE_NEXSTAR_DIGITAL",
    "EXCHANGE_WAZE",
    "EXCHANGE_SOUNDCAST",
    "EXCHANGE_SHARETHROUGH",
    "EXCHANGE_FYBER",
    "EXCHANGE_RED_FOR_PUBLISHERS",
    "EXCHANGE_MEDIANET",
    "EXCHANGE_TAPJOY",
    "EXCHANGE_VISTAR",
    "EXCHANGE_DAX",
    "EXCHANGE_JCD",
    "EXCHANGE_PLACE_EXCHANGE",
    "EXCHANGE_APPLOVIN",
    "EXCHANGE_CONNATIX",
    "EXCHANGE_RESET_DIGITAL",
    "EXCHANGE_HIVESTACK",
    "EXCHANGE_DRAX",
    "EXCHANGE_APPLOVIN_GBID",
    "EXCHANGE_FYBER_GBID",
    "EXCHANGE_UNITY_GBID",
    "EXCHANGE_CHARTBOOST_GBID",
    "EXCHANGE_ADMOST_GBID",
    "EXCHANGE_TOPON_GBID",
    "EXCHANGE_NETFLIX",
    "EXCHANGE_CORE",
    "EXCHANGE_COMMERCE_GRID",
    "EXCHANGE_SPOTIFY",
    "EXCHANGE_TUBI",
    "EXCHANGE_SNAP",
    "EXCHANGE_CADENT",
  ]).describe("The exchange to which the inventory source belongs.").optional(),
  guaranteedOrderId: z.string().describe(
    "Immutable. The ID of the guaranteed order that this inventory source belongs to. Only applicable when commitment is `INVENTORY_SOURCE_COMMITMENT_GUARANTEED`.",
  ).optional(),
  inventorySourceType: z.enum([
    "INVENTORY_SOURCE_TYPE_UNSPECIFIED",
    "INVENTORY_SOURCE_TYPE_PRIVATE",
    "INVENTORY_SOURCE_TYPE_AUCTION_PACKAGE",
  ]).describe("Denotes the type of the inventory source.").optional(),
  publisherName: z.string().describe(
    "The publisher/seller name of the inventory source.",
  ).optional(),
  rateDetails: z.object({
    inventorySourceRateType: z.enum([
      "INVENTORY_SOURCE_RATE_TYPE_UNSPECIFIED",
      "INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED",
      "INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR",
      "INVENTORY_SOURCE_RATE_TYPE_CPD",
      "INVENTORY_SOURCE_RATE_TYPE_CPH",
      "INVENTORY_SOURCE_RATE_TYPE_FLAT",
    ]).describe(
      "The rate type. Acceptable values are `INVENTORY_SOURCE_RATE_TYPE_CPM_FIXED`, `INVENTORY_SOURCE_RATE_TYPE_CPM_FLOOR`, and `INVENTORY_SOURCE_RATE_TYPE_CPD`.",
    ).optional(),
    minimumSpend: z.object({
      currencyCode: z.string().describe(
        "The three-letter currency code defined in ISO 4217.",
      ).optional(),
      nanos: z.number().int().describe(
        "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
      ).optional(),
      units: z.string().describe(
        'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
      ).optional(),
    }).describe("Represents an amount of money with its currency type.")
      .optional(),
    rate: z.object({
      currencyCode: z.string().describe(
        "The three-letter currency code defined in ISO 4217.",
      ).optional(),
      nanos: z.number().int().describe(
        "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
      ).optional(),
      units: z.string().describe(
        'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
      ).optional(),
    }).describe("Represents an amount of money with its currency type.")
      .optional(),
    unitsPurchased: z.string().describe(
      "Required for guaranteed inventory sources. The number of impressions guaranteed by the seller.",
    ).optional(),
  }).describe("The rate related settings of the inventory source.").optional(),
  readWriteAccessors: z.object({
    advertisers: z.object({
      advertiserIds: z.array(z.string()).describe("The IDs of the advertisers.")
        .optional(),
    }).describe("The advertisers with access to the inventory source.")
      .optional(),
    partner: z.object({
      partnerId: z.string().describe("The ID of the partner.").optional(),
    }).describe("The partner with access to the inventory source.").optional(),
  }).describe("The partner or advertisers with access to the inventory source.")
    .optional(),
  status: z.object({
    configStatus: z.enum([
      "INVENTORY_SOURCE_CONFIG_STATUS_UNSPECIFIED",
      "INVENTORY_SOURCE_CONFIG_STATUS_PENDING",
      "INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED",
    ]).describe(
      "Output only. The configuration status of the inventory source. Only applicable for guaranteed inventory sources. Acceptable values are `INVENTORY_SOURCE_CONFIG_STATUS_PENDING` and `INVENTORY_SOURCE_CONFIG_STATUS_COMPLETED`. An inventory source must be configured (fill in the required fields, choose creatives, and select a default campaign) before it can serve.",
    ).optional(),
    entityPauseReason: z.string().describe(
      "The user-provided reason for pausing this inventory source. Must not exceed 100 characters. Only applicable when entity_status is set to `ENTITY_STATUS_PAUSED`.",
    ).optional(),
    entityStatus: z.enum([
      "ENTITY_STATUS_UNSPECIFIED",
      "ENTITY_STATUS_ACTIVE",
      "ENTITY_STATUS_ARCHIVED",
      "ENTITY_STATUS_DRAFT",
      "ENTITY_STATUS_PAUSED",
      "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
    ]).describe(
      "Whether or not the inventory source is servable. Acceptable values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. Default value is `ENTITY_STATUS_ACTIVE`.",
    ).optional(),
    sellerPauseReason: z.string().describe(
      "Output only. The seller-provided reason for pausing this inventory source. Only applicable for inventory sources synced directly from the publishers and when seller_status is set to `ENTITY_STATUS_PAUSED`.",
    ).optional(),
    sellerStatus: z.enum([
      "ENTITY_STATUS_UNSPECIFIED",
      "ENTITY_STATUS_ACTIVE",
      "ENTITY_STATUS_ARCHIVED",
      "ENTITY_STATUS_DRAFT",
      "ENTITY_STATUS_PAUSED",
      "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
    ]).describe(
      "Output only. The status set by the seller for the inventory source. Only applicable for inventory sources synced directly from the publishers. Acceptable values are `ENTITY_STATUS_ACTIVE` and `ENTITY_STATUS_PAUSED`.",
    ).optional(),
  }).describe("The status related settings of the inventory source.")
    .optional(),
  timeRange: z.object({
    endTime: z.string().describe(
      "Required. The upper bound of a time range, inclusive.",
    ).optional(),
    startTime: z.string().describe(
      "Required. The lower bound of a time range, inclusive.",
    ).optional(),
  }).describe("A time range.").optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that the request is being made within.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that the request is being made within.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 InventorySources. Registered at `@swamp/gcp/displayvideo/inventorysources`. */
export const model = {
  type: "@swamp/gcp/displayvideo/inventorysources",
  version: "2026.05.18.2",
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
      toVersion: "2026.04.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An inventory source.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a inventorySources",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["commitment"] !== undefined) body["commitment"] = g["commitment"];
        if (g["creativeConfigs"] !== undefined) {
          body["creativeConfigs"] = g["creativeConfigs"];
        }
        if (g["dealId"] !== undefined) body["dealId"] = g["dealId"];
        if (g["deliveryMethod"] !== undefined) {
          body["deliveryMethod"] = g["deliveryMethod"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["exchange"] !== undefined) body["exchange"] = g["exchange"];
        if (g["guaranteedOrderId"] !== undefined) {
          body["guaranteedOrderId"] = g["guaranteedOrderId"];
        }
        if (g["inventorySourceType"] !== undefined) {
          body["inventorySourceType"] = g["inventorySourceType"];
        }
        if (g["publisherName"] !== undefined) {
          body["publisherName"] = g["publisherName"];
        }
        if (g["rateDetails"] !== undefined) {
          body["rateDetails"] = g["rateDetails"];
        }
        if (g["readWriteAccessors"] !== undefined) {
          body["readWriteAccessors"] = g["readWriteAccessors"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["timeRange"] !== undefined) body["timeRange"] = g["timeRange"];
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["partnerId"] !== undefined) body["partnerId"] = g["partnerId"];
        if (g["name"] !== undefined) {
          params["inventorySourceId"] = String(g["name"]);
        }
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
      description: "Get a inventorySources",
      arguments: z.object({
        identifier: z.string().describe("The name of the inventorySources"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["inventorySourceId"] = args.identifier;
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
      description: "Update inventorySources attributes",
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
        params["inventorySourceId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["commitment"] !== undefined) body["commitment"] = g["commitment"];
        if (g["creativeConfigs"] !== undefined) {
          body["creativeConfigs"] = g["creativeConfigs"];
        }
        if (g["dealId"] !== undefined) body["dealId"] = g["dealId"];
        if (g["deliveryMethod"] !== undefined) {
          body["deliveryMethod"] = g["deliveryMethod"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["exchange"] !== undefined) body["exchange"] = g["exchange"];
        if (g["inventorySourceType"] !== undefined) {
          body["inventorySourceType"] = g["inventorySourceType"];
        }
        if (g["publisherName"] !== undefined) {
          body["publisherName"] = g["publisherName"];
        }
        if (g["rateDetails"] !== undefined) {
          body["rateDetails"] = g["rateDetails"];
        }
        if (g["readWriteAccessors"] !== undefined) {
          body["readWriteAccessors"] = g["readWriteAccessors"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["timeRange"] !== undefined) body["timeRange"] = g["timeRange"];
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
      description: "Sync inventorySources state from GCP",
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
          params["inventorySourceId"] = identifier;
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
    edit_inventory_source_read_write_accessors: {
      description: "edit inventory source read write accessors",
      arguments: z.object({
        advertisersUpdate: z.any().optional(),
        assignPartner: z.any().optional(),
        partnerId: z.any().optional(),
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
        params["inventorySourceId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["advertisersUpdate"] !== undefined) {
          body["advertisersUpdate"] = args["advertisersUpdate"];
        }
        if (args["assignPartner"] !== undefined) {
          body["assignPartner"] = args["assignPartner"];
        }
        if (args["partnerId"] !== undefined) {
          body["partnerId"] = args["partnerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.inventorySources.editInventorySourceReadWriteAccessors",
            "path":
              "v4/inventorySources/{+inventorySourceId}:editInventorySourceReadWriteAccessors",
            "httpMethod": "POST",
            "parameterOrder": ["inventorySourceId"],
            "parameters": {
              "inventorySourceId": { "location": "path", "required": true },
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
