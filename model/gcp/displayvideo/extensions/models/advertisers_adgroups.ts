// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-adgroups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.AdGroups.
 *
 * A single ad group associated with a line item.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.advertisers.adGroups.get",
  "path": "v4/advertisers/{+advertiserId}/adGroups/{+adGroupId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "adGroupId",
  ],
  "parameters": {
    "adGroupId": {
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
  "id": "displayvideo.advertisers.adGroups.create",
  "path": "v4/advertisers/{+advertiserId}/adGroups",
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

const PATCH_CONFIG = {
  "id": "displayvideo.advertisers.adGroups.patch",
  "path": "v4/advertisers/{+advertiserId}/adGroups/{+adGroupId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "advertiserId",
    "adGroupId",
  ],
  "parameters": {
    "adGroupId": {
      "location": "path",
      "required": true,
    },
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.adGroups.delete",
  "path": "v4/advertisers/{+advertiserId}/adGroups/{+adGroupId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
    "adGroupId",
  ],
  "parameters": {
    "adGroupId": {
      "location": "path",
      "required": true,
    },
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
  adGroupFormat: z.enum([
    "AD_GROUP_FORMAT_UNSPECIFIED",
    "AD_GROUP_FORMAT_IN_STREAM",
    "AD_GROUP_FORMAT_VIDEO_DISCOVERY",
    "AD_GROUP_FORMAT_BUMPER",
    "AD_GROUP_FORMAT_NON_SKIPPABLE_IN_STREAM",
    "AD_GROUP_FORMAT_AUDIO",
    "AD_GROUP_FORMAT_RESPONSIVE",
    "AD_GROUP_FORMAT_REACH",
    "AD_GROUP_FORMAT_MASTHEAD",
    "AD_GROUP_FORMAT_DEMAND_GEN",
  ]).describe("Required. Immutable. The format of the ads in the ad group.")
    .optional(),
  adGroupInventoryControl: z.object({
    adGroupInventoryStrategy: z.enum([
      "AD_GROUP_INVENTORY_STRATEGY_UNSPECIFIED",
      "AD_GROUP_INVENTORY_STRATEGY_ALL_GOOGLE_AND_DISPLAY_NETWORK_INVENTORY",
      "AD_GROUP_INVENTORY_STRATEGY_ALL_GOOGLE_INVENTORY",
    ]).describe("The inventory strategy.").optional(),
    selectedInventories: z.object({
      allowDiscover: z.boolean().describe(
        "Whether the ad group is opted-in to Discover inventory.",
      ).optional(),
      allowGmail: z.boolean().describe(
        "Whether the ad group is opted-in to Gmail inventory.",
      ).optional(),
      allowGoogleDisplayNetwork: z.boolean().describe(
        "Whether the ad group is opted-in to Google Display Network inventory.",
      ).optional(),
      allowYoutubeFeed: z.boolean().describe(
        "Whether the ad group is opted-in to YouTube in-feed inventory.",
      ).optional(),
      allowYoutubeShorts: z.boolean().describe(
        "Whether the ad group is opted-in to YouTube shorts inventory.",
      ).optional(),
      allowYoutubeStream: z.boolean().describe(
        "Whether the ad group is opted-in to YouTube in-stream inventory.",
      ).optional(),
    }).describe("The inventory control of the ad group.").optional(),
  }).describe("The inventory control of the ad group.").optional(),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the ad group belongs to.",
  ).optional(),
  bidStrategy: z.object({
    demandGenBid: z.object({
      effectiveBiddingValue: z.string().describe(
        "Output only. The value effectively used by the bidding strategy. This field will be the same as value if set. If value is not set and the strategy is assigned to an ad group, this field will be inherited from the line item's bidding strategy. If type is not `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPA` or `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_ROAS`, this field will be 0.",
      ).optional(),
      effectiveBiddingValueSource: z.enum([
        "BIDDING_SOURCE_UNSPECIFIED",
        "BIDDING_SOURCE_LINE_ITEM",
        "BIDDING_SOURCE_AD_GROUP",
      ]).describe("Output only. Source of the effective bidding value.")
        .optional(),
      type: z.enum([
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_UNSPECIFIED",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPA",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_ROAS",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSIONS",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSION_VALUE",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_MAXIMIZE_CLICKS",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPC",
      ]).describe(
        "Optional. The type of the bidding strategy. This can only be set when assigned to a line item. Ad groups will inherit this value from their line item.",
      ).optional(),
      value: z.string().describe(
        "Optional. The value used by the bidding strategy. This can be set when assigned to line items or ad groups. This field is only applicable for the following strategy types: * `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPC` * `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_ROAS` Value of this field is in micros of the advertiser's currency or ROAS value. For example, 1000000 represents 1.0 standard units of the currency or 100% ROAS value. If not using an applicable strategy, the value of this field will be 0.",
      ).optional(),
    }).describe(
      "Settings that control the bid strategy for Demand Gen resources.",
    ).optional(),
    fixedBid: z.object({
      bidAmountMicros: z.string().describe(
        "The fixed bid amount, in micros of the advertiser's currency. For insertion order entity, bid_amount_micros should be set as 0. For line item entity, bid_amount_micros must be greater than or equal to billable unit of the given currency and smaller than or equal to the upper limit 1000000000. For example, 1500000 represents 1.5 standard units of the currency.",
      ).optional(),
    }).describe("A strategy that uses a fixed bidding price.").optional(),
    maximizeSpendAutoBid: z.object({
      customBiddingAlgorithmId: z.string().describe(
        "The ID of the Custom Bidding Algorithm used by this strategy. Only applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`. Assigning a custom bidding algorithm that uses floodlight activities not identified in floodlightActivityConfigs will return an error.",
      ).optional(),
      maxAverageCpmBidAmountMicros: z.string().describe(
        "The maximum average CPM that may be bid, in micros of the advertiser's currency. Must be greater than or equal to a billable unit of the given currency. For example, 1500000 represents 1.5 standard units of the currency.",
      ).optional(),
      performanceGoalType: z.enum([
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_UNSPECIFIED",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_REACH",
      ]).describe(
        "Required. The type of the performance goal that the bidding strategy tries to minimize while spending the full budget. `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` is not supported for this strategy.",
      ).optional(),
      raiseBidForDeals: z.boolean().describe(
        "Whether the strategy takes deal floor prices into account.",
      ).optional(),
    }).describe(
      "A strategy that automatically adjusts the bid to optimize a specified performance goal while spending the full budget.",
    ).optional(),
    performanceGoalAutoBid: z.object({
      customBiddingAlgorithmId: z.string().describe(
        "The ID of the Custom Bidding Algorithm used by this strategy. Only applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`. Assigning a custom bidding algorithm that uses floodlight activities not identified in floodlightActivityConfigs will return an error.",
      ).optional(),
      maxAverageCpmBidAmountMicros: z.string().describe(
        "The maximum average CPM that may be bid, in micros of the advertiser's currency. Must be greater than or equal to a billable unit of the given currency. Not applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`. For example, 1500000 represents 1.5 standard units of the currency.",
      ).optional(),
      performanceGoalAmountMicros: z.string().describe(
        "Required. The performance goal the bidding strategy will attempt to meet or beat, in micros of the advertiser's currency or in micro of the ROAS (Return On Advertising Spend) value which is also based on advertiser's currency. Must be greater than or equal to a billable unit of the given currency and smaller or equal to upper bounds. Each performance_goal_type has its upper bound: * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA`, upper bound is 10000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC`, upper bound is 1000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, upper bound is 1000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`, upper bound is 1000.00 and lower bound is 0.01. Example: If set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, the bid price will be based on the probability that each available impression will be viewable. For example, if viewable CPM target is $2 and an impression is 40% likely to be viewable, the bid price will be $0.80 CPM (40% of $2). For example, 1500000 represents 1.5 standard units of the currency or ROAS value.",
      ).optional(),
      performanceGoalType: z.enum([
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_UNSPECIFIED",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_REACH",
      ]).describe(
        "Required. The type of the performance goal that the bidding strategy will try to meet or beat. For line item level usage, the value must be one of: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`.",
      ).optional(),
    }).describe(
      "A strategy that automatically adjusts the bid to meet or beat a specified performance goal.",
    ).optional(),
    youtubeAndPartnersBid: z.object({
      adGroupEffectiveTargetCpaSource: z.enum([
        "BIDDING_SOURCE_UNSPECIFIED",
        "BIDDING_SOURCE_LINE_ITEM",
        "BIDDING_SOURCE_AD_GROUP",
      ]).describe(
        "Output only. Source of the effective target CPA value for ad group.",
      ).optional(),
      adGroupEffectiveTargetCpaValue: z.string().describe(
        "Output only. The effective target CPA for ad group, in micros of advertiser's currency.",
      ).optional(),
      type: z.enum([
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_UNSPECIFIED",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPV",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPM",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPM",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_RESERVE_CPM",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_LIFT",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSIONS",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPV",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSION_VALUE",
      ]).describe("The type of the bidding strategy.").optional(),
      value: z.string().describe(
        "The value used by the bidding strategy. When the bidding strategy is assigned at the line item level, this field is only applicable for the following strategy types: * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS` When the bidding strategy is assigned at the ad group level, this field is only applicable for the following strategy types: * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPV` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_RESERVE_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS` If not using an applicable strategy, the value of this field will be 0.",
      ).optional(),
    }).describe(
      "Settings that control the bid strategy for YouTube and Partners resources.",
    ).optional(),
  }).describe(
    "Settings that control the bid strategy. Bid strategy determines the bid price.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the ad group. Must be UTF-8 encoded with a maximum size of 255 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not the ad group can spend its budget and bid on inventory. If the ad group's parent line item is not active, the ad group can't spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`.",
  ).optional(),
  lineItemId: z.string().describe(
    "Required. Immutable. The unique ID of the line item that the ad group belongs to.",
  ).optional(),
  productFeedData: z.object({
    isFeedDisabled: z.boolean().describe(
      "Whether the product feed has opted-out of showing products.",
    ).optional(),
    productMatchDimensions: z.array(z.object({
      customLabel: z.object({
        key: z.enum([
          "CUSTOM_LABEL_KEY_UNSPECIFIED",
          "CUSTOM_LABEL_KEY_0",
          "CUSTOM_LABEL_KEY_1",
          "CUSTOM_LABEL_KEY_2",
          "CUSTOM_LABEL_KEY_3",
          "CUSTOM_LABEL_KEY_4",
        ]).describe("The key of the label.").optional(),
        value: z.string().describe("The value of the label.").optional(),
      }).describe("The key and value of a custom label.").optional(),
      productOfferId: z.string().describe(
        "The ID of the product offer to match with a product with the same offer ID.",
      ).optional(),
    })).describe("A list of dimensions used to match products.").optional(),
    productMatchType: z.enum([
      "PRODUCT_MATCH_TYPE_UNSPECIFIED",
      "PRODUCT_MATCH_TYPE_ALL_PRODUCTS",
      "PRODUCT_MATCH_TYPE_SPECIFIC_PRODUCTS",
      "PRODUCT_MATCH_TYPE_CUSTOM_LABEL",
    ]).describe("How products are selected by the product feed.").optional(),
  }).describe("The details of product feed.").optional(),
  targetingExpansion: z.object({
    audienceExpansionLevel: z.enum([
      "UNKNOWN",
      "NO_REACH",
      "LEAST_REACH",
      "MID_REACH",
      "MOST_REACH",
    ]).describe(
      "Output only. Magnitude of expansion for eligible first-party user lists under this ad group. This field only applies to YouTube and Partners line item and ad group resources.",
    ).optional(),
    audienceExpansionSeedListExcluded: z.boolean().describe(
      "Output only. Whether to exclude seed list for audience expansion. This field only applies to YouTube and Partners line item and ad group resources.",
    ).optional(),
    enableOptimizedTargeting: z.boolean().describe(
      "Required. Whether to enable Optimized Targeting for the line item. Optimized targeting is not compatible with all bid strategies. Attempting to set this field to `true` for a line item using the BiddingStrategy field fixed_bid or one of the following combinations of BiddingStrategy fields and BiddingStrategyPerformanceGoalType will result in an error: maximize_auto_spend_bid: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED` performance_goal_auto_bid: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` This also applies if the line item inherits one of the above bid strategies from the parent insertion order. Bid strategies set at the insertion order-level will be inherited by their line items if the `InsertionOrder` budget field automationType is set to `INSERTION_ORDER_AUTOMATION_TYPE_BUDGET` or `INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET`.",
    ).optional(),
    excludeDemographicExpansion: z.boolean().describe(
      "Optional. Whether to exclude demographic expansion for Optimized Targeting. This field can only be set for Demand Gen ad groups. Retrieval and management of Demand Gen resources is currently in beta. This field is only available to allowlisted users.",
    ).optional(),
  }).describe(
    "Settings that control the [optimized targeting](//support.google.com/displayvideo/answer/12060859) settings of the line item.",
  ).optional(),
});

const StateSchema = z.object({
  adGroupFormat: z.string().optional(),
  adGroupId: z.string().optional(),
  adGroupInventoryControl: z.object({
    adGroupInventoryStrategy: z.string(),
    selectedInventories: z.object({
      allowDiscover: z.boolean(),
      allowGmail: z.boolean(),
      allowGoogleDisplayNetwork: z.boolean(),
      allowYoutubeFeed: z.boolean(),
      allowYoutubeShorts: z.boolean(),
      allowYoutubeStream: z.boolean(),
    }),
  }).optional(),
  advertiserId: z.string().optional(),
  bidStrategy: z.object({
    demandGenBid: z.object({
      effectiveBiddingValue: z.string(),
      effectiveBiddingValueSource: z.string(),
      type: z.string(),
      value: z.string(),
    }),
    fixedBid: z.object({
      bidAmountMicros: z.string(),
    }),
    maximizeSpendAutoBid: z.object({
      customBiddingAlgorithmId: z.string(),
      maxAverageCpmBidAmountMicros: z.string(),
      performanceGoalType: z.string(),
      raiseBidForDeals: z.boolean(),
    }),
    performanceGoalAutoBid: z.object({
      customBiddingAlgorithmId: z.string(),
      maxAverageCpmBidAmountMicros: z.string(),
      performanceGoalAmountMicros: z.string(),
      performanceGoalType: z.string(),
    }),
    youtubeAndPartnersBid: z.object({
      adGroupEffectiveTargetCpaSource: z.string(),
      adGroupEffectiveTargetCpaValue: z.string(),
      type: z.string(),
      value: z.string(),
    }),
  }).optional(),
  displayName: z.string().optional(),
  entityStatus: z.string().optional(),
  lineItemId: z.string().optional(),
  name: z.string(),
  productFeedData: z.object({
    isFeedDisabled: z.boolean(),
    productMatchDimensions: z.array(z.object({
      customLabel: z.object({
        key: z.string(),
        value: z.string(),
      }),
      productOfferId: z.string(),
    })),
    productMatchType: z.string(),
  }).optional(),
  targetingExpansion: z.object({
    audienceExpansionLevel: z.string(),
    audienceExpansionSeedListExcluded: z.boolean(),
    enableOptimizedTargeting: z.boolean(),
    excludeDemographicExpansion: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  adGroupFormat: z.enum([
    "AD_GROUP_FORMAT_UNSPECIFIED",
    "AD_GROUP_FORMAT_IN_STREAM",
    "AD_GROUP_FORMAT_VIDEO_DISCOVERY",
    "AD_GROUP_FORMAT_BUMPER",
    "AD_GROUP_FORMAT_NON_SKIPPABLE_IN_STREAM",
    "AD_GROUP_FORMAT_AUDIO",
    "AD_GROUP_FORMAT_RESPONSIVE",
    "AD_GROUP_FORMAT_REACH",
    "AD_GROUP_FORMAT_MASTHEAD",
    "AD_GROUP_FORMAT_DEMAND_GEN",
  ]).describe("Required. Immutable. The format of the ads in the ad group.")
    .optional(),
  adGroupInventoryControl: z.object({
    adGroupInventoryStrategy: z.enum([
      "AD_GROUP_INVENTORY_STRATEGY_UNSPECIFIED",
      "AD_GROUP_INVENTORY_STRATEGY_ALL_GOOGLE_AND_DISPLAY_NETWORK_INVENTORY",
      "AD_GROUP_INVENTORY_STRATEGY_ALL_GOOGLE_INVENTORY",
    ]).describe("The inventory strategy.").optional(),
    selectedInventories: z.object({
      allowDiscover: z.boolean().describe(
        "Whether the ad group is opted-in to Discover inventory.",
      ).optional(),
      allowGmail: z.boolean().describe(
        "Whether the ad group is opted-in to Gmail inventory.",
      ).optional(),
      allowGoogleDisplayNetwork: z.boolean().describe(
        "Whether the ad group is opted-in to Google Display Network inventory.",
      ).optional(),
      allowYoutubeFeed: z.boolean().describe(
        "Whether the ad group is opted-in to YouTube in-feed inventory.",
      ).optional(),
      allowYoutubeShorts: z.boolean().describe(
        "Whether the ad group is opted-in to YouTube shorts inventory.",
      ).optional(),
      allowYoutubeStream: z.boolean().describe(
        "Whether the ad group is opted-in to YouTube in-stream inventory.",
      ).optional(),
    }).describe("The inventory control of the ad group.").optional(),
  }).describe("The inventory control of the ad group.").optional(),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the ad group belongs to.",
  ).optional(),
  bidStrategy: z.object({
    demandGenBid: z.object({
      effectiveBiddingValue: z.string().describe(
        "Output only. The value effectively used by the bidding strategy. This field will be the same as value if set. If value is not set and the strategy is assigned to an ad group, this field will be inherited from the line item's bidding strategy. If type is not `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPA` or `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_ROAS`, this field will be 0.",
      ).optional(),
      effectiveBiddingValueSource: z.enum([
        "BIDDING_SOURCE_UNSPECIFIED",
        "BIDDING_SOURCE_LINE_ITEM",
        "BIDDING_SOURCE_AD_GROUP",
      ]).describe("Output only. Source of the effective bidding value.")
        .optional(),
      type: z.enum([
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_UNSPECIFIED",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPA",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_ROAS",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSIONS",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSION_VALUE",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_MAXIMIZE_CLICKS",
        "DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPC",
      ]).describe(
        "Optional. The type of the bidding strategy. This can only be set when assigned to a line item. Ad groups will inherit this value from their line item.",
      ).optional(),
      value: z.string().describe(
        "Optional. The value used by the bidding strategy. This can be set when assigned to line items or ad groups. This field is only applicable for the following strategy types: * `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_CPC` * `DEMAND_GEN_BIDDING_STRATEGY_TYPE_TARGET_ROAS` Value of this field is in micros of the advertiser's currency or ROAS value. For example, 1000000 represents 1.0 standard units of the currency or 100% ROAS value. If not using an applicable strategy, the value of this field will be 0.",
      ).optional(),
    }).describe(
      "Settings that control the bid strategy for Demand Gen resources.",
    ).optional(),
    fixedBid: z.object({
      bidAmountMicros: z.string().describe(
        "The fixed bid amount, in micros of the advertiser's currency. For insertion order entity, bid_amount_micros should be set as 0. For line item entity, bid_amount_micros must be greater than or equal to billable unit of the given currency and smaller than or equal to the upper limit 1000000000. For example, 1500000 represents 1.5 standard units of the currency.",
      ).optional(),
    }).describe("A strategy that uses a fixed bidding price.").optional(),
    maximizeSpendAutoBid: z.object({
      customBiddingAlgorithmId: z.string().describe(
        "The ID of the Custom Bidding Algorithm used by this strategy. Only applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`. Assigning a custom bidding algorithm that uses floodlight activities not identified in floodlightActivityConfigs will return an error.",
      ).optional(),
      maxAverageCpmBidAmountMicros: z.string().describe(
        "The maximum average CPM that may be bid, in micros of the advertiser's currency. Must be greater than or equal to a billable unit of the given currency. For example, 1500000 represents 1.5 standard units of the currency.",
      ).optional(),
      performanceGoalType: z.enum([
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_UNSPECIFIED",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_REACH",
      ]).describe(
        "Required. The type of the performance goal that the bidding strategy tries to minimize while spending the full budget. `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` is not supported for this strategy.",
      ).optional(),
      raiseBidForDeals: z.boolean().describe(
        "Whether the strategy takes deal floor prices into account.",
      ).optional(),
    }).describe(
      "A strategy that automatically adjusts the bid to optimize a specified performance goal while spending the full budget.",
    ).optional(),
    performanceGoalAutoBid: z.object({
      customBiddingAlgorithmId: z.string().describe(
        "The ID of the Custom Bidding Algorithm used by this strategy. Only applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`. Assigning a custom bidding algorithm that uses floodlight activities not identified in floodlightActivityConfigs will return an error.",
      ).optional(),
      maxAverageCpmBidAmountMicros: z.string().describe(
        "The maximum average CPM that may be bid, in micros of the advertiser's currency. Must be greater than or equal to a billable unit of the given currency. Not applicable when performance_goal_type is set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`. For example, 1500000 represents 1.5 standard units of the currency.",
      ).optional(),
      performanceGoalAmountMicros: z.string().describe(
        "Required. The performance goal the bidding strategy will attempt to meet or beat, in micros of the advertiser's currency or in micro of the ROAS (Return On Advertising Spend) value which is also based on advertiser's currency. Must be greater than or equal to a billable unit of the given currency and smaller or equal to upper bounds. Each performance_goal_type has its upper bound: * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA`, upper bound is 10000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC`, upper bound is 1000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, upper bound is 1000.00 USD. * when performance_goal_type is `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`, upper bound is 1000.00 and lower bound is 0.01. Example: If set to `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM`, the bid price will be based on the probability that each available impression will be viewable. For example, if viewable CPM target is $2 and an impression is 40% likely to be viewable, the bid price will be $0.80 CPM (40% of $2). For example, 1500000 represents 1.5 standard units of the currency or ROAS value.",
      ).optional(),
      performanceGoalType: z.enum([
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_UNSPECIFIED",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED",
        "BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_REACH",
      ]).describe(
        "Required. The type of the performance goal that the bidding strategy will try to meet or beat. For line item level usage, the value must be one of: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CPC` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CUSTOM_ALGO`.",
      ).optional(),
    }).describe(
      "A strategy that automatically adjusts the bid to meet or beat a specified performance goal.",
    ).optional(),
    youtubeAndPartnersBid: z.object({
      adGroupEffectiveTargetCpaSource: z.enum([
        "BIDDING_SOURCE_UNSPECIFIED",
        "BIDDING_SOURCE_LINE_ITEM",
        "BIDDING_SOURCE_AD_GROUP",
      ]).describe(
        "Output only. Source of the effective target CPA value for ad group.",
      ).optional(),
      adGroupEffectiveTargetCpaValue: z.string().describe(
        "Output only. The effective target CPA for ad group, in micros of advertiser's currency.",
      ).optional(),
      type: z.enum([
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_UNSPECIFIED",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPV",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPM",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPM",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_RESERVE_CPM",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_LIFT",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSIONS",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPV",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS",
        "YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MAXIMIZE_CONVERSION_VALUE",
      ]).describe("The type of the bidding strategy.").optional(),
      value: z.string().describe(
        "The value used by the bidding strategy. When the bidding strategy is assigned at the line item level, this field is only applicable for the following strategy types: * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS` When the bidding strategy is assigned at the ad group level, this field is only applicable for the following strategy types: * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_MANUAL_CPV` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPA` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_RESERVE_CPM` * `YOUTUBE_AND_PARTNERS_BIDDING_STRATEGY_TYPE_TARGET_ROAS` If not using an applicable strategy, the value of this field will be 0.",
      ).optional(),
    }).describe(
      "Settings that control the bid strategy for YouTube and Partners resources.",
    ).optional(),
  }).describe(
    "Settings that control the bid strategy. Bid strategy determines the bid price.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the ad group. Must be UTF-8 encoded with a maximum size of 255 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not the ad group can spend its budget and bid on inventory. If the ad group's parent line item is not active, the ad group can't spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`.",
  ).optional(),
  lineItemId: z.string().describe(
    "Required. Immutable. The unique ID of the line item that the ad group belongs to.",
  ).optional(),
  productFeedData: z.object({
    isFeedDisabled: z.boolean().describe(
      "Whether the product feed has opted-out of showing products.",
    ).optional(),
    productMatchDimensions: z.array(z.object({
      customLabel: z.object({
        key: z.enum([
          "CUSTOM_LABEL_KEY_UNSPECIFIED",
          "CUSTOM_LABEL_KEY_0",
          "CUSTOM_LABEL_KEY_1",
          "CUSTOM_LABEL_KEY_2",
          "CUSTOM_LABEL_KEY_3",
          "CUSTOM_LABEL_KEY_4",
        ]).describe("The key of the label.").optional(),
        value: z.string().describe("The value of the label.").optional(),
      }).describe("The key and value of a custom label.").optional(),
      productOfferId: z.string().describe(
        "The ID of the product offer to match with a product with the same offer ID.",
      ).optional(),
    })).describe("A list of dimensions used to match products.").optional(),
    productMatchType: z.enum([
      "PRODUCT_MATCH_TYPE_UNSPECIFIED",
      "PRODUCT_MATCH_TYPE_ALL_PRODUCTS",
      "PRODUCT_MATCH_TYPE_SPECIFIC_PRODUCTS",
      "PRODUCT_MATCH_TYPE_CUSTOM_LABEL",
    ]).describe("How products are selected by the product feed.").optional(),
  }).describe("The details of product feed.").optional(),
  targetingExpansion: z.object({
    audienceExpansionLevel: z.enum([
      "UNKNOWN",
      "NO_REACH",
      "LEAST_REACH",
      "MID_REACH",
      "MOST_REACH",
    ]).describe(
      "Output only. Magnitude of expansion for eligible first-party user lists under this ad group. This field only applies to YouTube and Partners line item and ad group resources.",
    ).optional(),
    audienceExpansionSeedListExcluded: z.boolean().describe(
      "Output only. Whether to exclude seed list for audience expansion. This field only applies to YouTube and Partners line item and ad group resources.",
    ).optional(),
    enableOptimizedTargeting: z.boolean().describe(
      "Required. Whether to enable Optimized Targeting for the line item. Optimized targeting is not compatible with all bid strategies. Attempting to set this field to `true` for a line item using the BiddingStrategy field fixed_bid or one of the following combinations of BiddingStrategy fields and BiddingStrategyPerformanceGoalType will result in an error: maximize_auto_spend_bid: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_CIVA` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_IVO_TEN` * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_AV_VIEWED` performance_goal_auto_bid: * `BIDDING_STRATEGY_PERFORMANCE_GOAL_TYPE_VIEWABLE_CPM` This also applies if the line item inherits one of the above bid strategies from the parent insertion order. Bid strategies set at the insertion order-level will be inherited by their line items if the `InsertionOrder` budget field automationType is set to `INSERTION_ORDER_AUTOMATION_TYPE_BUDGET` or `INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET`.",
    ).optional(),
    excludeDemographicExpansion: z.boolean().describe(
      "Optional. Whether to exclude demographic expansion for Optimized Targeting. This field can only be set for Demand Gen ad groups. Retrieval and management of Demand Gen resources is currently in beta. This field is only available to allowlisted users.",
    ).optional(),
  }).describe(
    "Settings that control the [optimized targeting](//support.google.com/displayvideo/answer/12060859) settings of the line item.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.AdGroups. Registered at `@swamp/gcp/displayvideo/advertisers-adgroups`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-adgroups",
  version: "2026.05.19.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.04.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.22.1",
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
      description: "A single ad group associated with a line item.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a adGroups",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["adGroupFormat"] !== undefined) {
          body["adGroupFormat"] = g["adGroupFormat"];
        }
        if (g["adGroupInventoryControl"] !== undefined) {
          body["adGroupInventoryControl"] = g["adGroupInventoryControl"];
        }
        if (g["bidStrategy"] !== undefined) {
          body["bidStrategy"] = g["bidStrategy"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["lineItemId"] !== undefined) body["lineItemId"] = g["lineItemId"];
        if (g["productFeedData"] !== undefined) {
          body["productFeedData"] = g["productFeedData"];
        }
        if (g["targetingExpansion"] !== undefined) {
          body["targetingExpansion"] = g["targetingExpansion"];
        }
        if (g["name"] !== undefined) params["adGroupId"] = String(g["name"]);
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
      description: "Get a adGroups",
      arguments: z.object({
        identifier: z.string().describe("The name of the adGroups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["adGroupId"] = args.identifier;
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
      description: "Update adGroups attributes",
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
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        } else if (existing["advertiserId"]) {
          params["advertiserId"] = String(existing["advertiserId"]);
        }
        params["adGroupId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["adGroupInventoryControl"] !== undefined) {
          body["adGroupInventoryControl"] = g["adGroupInventoryControl"];
        }
        if (g["bidStrategy"] !== undefined) {
          body["bidStrategy"] = g["bidStrategy"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["productFeedData"] !== undefined) {
          body["productFeedData"] = g["productFeedData"];
        }
        if (g["targetingExpansion"] !== undefined) {
          body["targetingExpansion"] = g["targetingExpansion"];
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
    delete: {
      description: "Delete the adGroups",
      arguments: z.object({
        identifier: z.string().describe("The name of the adGroups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["adGroupId"] = args.identifier;
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
      description: "Sync adGroups state from GCP",
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
          params["adGroupId"] = identifier;
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
    bulk_edit_assigned_targeting_options: {
      description: "bulk edit assigned targeting options",
      arguments: z.object({
        adGroupIds: z.any().optional(),
        createRequests: z.any().optional(),
        deleteRequests: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["adGroupIds"] !== undefined) {
          body["adGroupIds"] = args["adGroupIds"];
        }
        if (args["createRequests"] !== undefined) {
          body["createRequests"] = args["createRequests"];
        }
        if (args["deleteRequests"] !== undefined) {
          body["deleteRequests"] = args["deleteRequests"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.advertisers.adGroups.bulkEditAssignedTargetingOptions",
            "path":
              "v4/advertisers/{+advertiserId}/adGroups:bulkEditAssignedTargetingOptions",
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
    bulk_list_assigned_targeting_options: {
      description: "bulk list assigned targeting options",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.advertisers.adGroups.bulkListAssignedTargetingOptions",
            "path":
              "v4/advertisers/{+advertiserId}/adGroups:bulkListAssignedTargetingOptions",
            "httpMethod": "GET",
            "parameterOrder": ["advertiserId"],
            "parameters": {
              "adGroupIds": { "location": "query" },
              "advertiserId": { "location": "path", "required": true },
              "filter": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
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
