// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-lineitems
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.LineItems.
 *
 * A single line item.
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
  "id": "displayvideo.advertisers.lineItems.get",
  "path": "v4/advertisers/{+advertiserId}/lineItems/{+lineItemId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "lineItemId",
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
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.advertisers.lineItems.create",
  "path": "v4/advertisers/{+advertiserId}/lineItems",
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
  "id": "displayvideo.advertisers.lineItems.patch",
  "path": "v4/advertisers/{+advertiserId}/lineItems/{+lineItemId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "advertiserId",
    "lineItemId",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.lineItems.delete",
  "path": "v4/advertisers/{+advertiserId}/lineItems/{+lineItemId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
    "lineItemId",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.lineItems.list",
  "path": "v4/advertisers/{+advertiserId}/lineItems",
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
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the line item belongs to.",
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
  budget: z.object({
    budgetAllocationType: z.enum([
      "LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNSPECIFIED",
      "LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC",
      "LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED",
      "LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED",
    ]).describe(
      "Required. The type of the budget allocation. `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC` is only applicable when automatic budget allocation is enabled for the parent insertion order. This field must be set to `LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED` for Demand Gen line items.",
    ).optional(),
    budgetUnit: z.enum([
      "BUDGET_UNIT_UNSPECIFIED",
      "BUDGET_UNIT_CURRENCY",
      "BUDGET_UNIT_IMPRESSIONS",
    ]).describe(
      "Output only. The budget unit specifies whether the budget is currency based or impression based. This value is inherited from the parent insertion order.",
    ).optional(),
    maxAmount: z.string().describe(
      "The maximum budget amount the line item will spend. Must be greater than 0. When budget_allocation_type is: * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC`, this field is immutable and is set by the system. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED`, if budget_unit is: - `BUDGET_UNIT_CURRENCY`, this field represents maximum budget amount to spend, in micros of the advertiser's currency. For example, 1500000 represents 1.5 standard units of the currency. - `BUDGET_UNIT_IMPRESSIONS`, this field represents the maximum number of impressions to serve. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED`, this field is not applicable and will be ignored by the system.",
    ).optional(),
  }).describe("Settings that control how budget is allocated.").optional(),
  containsEuPoliticalAds: z.enum([
    "EU_POLITICAL_ADVERTISING_STATUS_UNKNOWN",
    "CONTAINS_EU_POLITICAL_ADVERTISING",
    "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
  ]).describe(
    "Whether this line item will serve European Union political ads. If contains_eu_political_ads has been set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` in the parent advertiser, then this field will be assigned `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` if not otherwise specified. This field can then be updated using the UI, API, or Structured Data Files. This field must be assigned when creating a new line item. Otherwise, **the `advertisers.lineItems.create` request will fail**.",
  ).optional(),
  conversionCounting: z.object({
    floodlightActivityConfigs: z.array(z.object({
      floodlightActivityId: z.string().describe(
        "Required. The ID of the Floodlight activity.",
      ).optional(),
      postClickLookbackWindowDays: z.number().int().describe(
        "Required. The number of days after an ad has been clicked in which a conversion may be counted. Must be between 0 and 90 inclusive.",
      ).optional(),
      postViewLookbackWindowDays: z.number().int().describe(
        "Required. The number of days after an ad has been viewed in which a conversion may be counted. Must be between 0 and 90 inclusive.",
      ).optional(),
    })).describe(
      "The Floodlight activity configs used to track conversions. The number of conversions counted is the sum of all of the conversions counted by all of the Floodlight activity IDs specified in this field. This field can't be updated if a custom bidding algorithm is assigned to the line item. If you set this field and assign a custom bidding algorithm in the same request, the floodlight activities must match the ones used by the custom bidding algorithm.",
    ).optional(),
    postViewCountPercentageMillis: z.string().describe(
      "The percentage of post-view conversions to count, in millis (1/1000 of a percent). Must be between 0 and 100000 inclusive. For example, to track 50% of the post-click conversions, set a value of 50000.",
    ).optional(),
    primaryAttributionModelId: z.string().describe(
      "Optional. The attribution model to use for conversion measurement. This attribution model will determine how conversions are counted. The Primary model can be set by you for a floodlight config or group. More details [here](https://support.google.com/displayvideo/answer/7409983). Only applicable to Demand Gen line items. Retrieval and management of Demand Gen resources is currently in beta. This field is only available to allowlisted users.",
    ).optional(),
  }).describe(
    "Settings that control how conversions are counted. All post-click conversions will be counted. A percentage value can be set for post-view conversions counting.",
  ).optional(),
  creativeIds: z.array(z.string()).describe(
    "The IDs of the creatives associated with the line item.",
  ).optional(),
  demandGenSettings: z.object({
    geoLanguageTargetingEnabled: z.boolean().describe(
      "Optional. Immutable. Whether location and language targeting can be set at the line item level. Otherwise, relevant targeting types must be assigned directly to ad groups.",
    ).optional(),
    linkedMerchantId: z.string().describe(
      "Optional. The ID of the Merchant Center account used to provide a product feed. This Merchant Center account must already be linked to the advertiser.",
    ).optional(),
    thirdPartyMeasurementConfigs: z.object({
      brandLiftVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring brand lift. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_DYNATA` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_INTAGE` * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_MACROMILL`",
      ).optional(),
      brandSafetyVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring brand safety. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_ZEFR` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE`",
      ).optional(),
      reachVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring reach. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_VIDEO_RESEARCH` * `THIRD_PARTY_VENDOR_MEDIA_SCOPE` * `THIRD_PARTY_VENDOR_AUDIENCE_PROJECT` * `THIRD_PARTY_VENDOR_VIDEO_AMP` * `THIRD_PARTY_VENDOR_ISPOT_TV` * `THIRD_PARTY_VENDOR_GEMIUS`",
      ).optional(),
      viewabilityVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring viewability. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_MOAT` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_TELEMETRY` * `THIRD_PARTY_VENDOR_MEETRICS`",
      ).optional(),
    }).describe(
      "Settings that control what third-party vendors are measuring specific line item metrics.",
    ).optional(),
  }).describe("Settings for Demand Gen line items.").optional(),
  displayName: z.string().describe(
    "Required. The display name of the line item. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not the line item can spend its budget and bid on inventory. * For CreateLineItem method, only `ENTITY_STATUS_DRAFT` is allowed. To activate a line item, use UpdateLineItem method and update the status to `ENTITY_STATUS_ACTIVE` after creation. * A line item cannot be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * If the line item's parent insertion order is not active, the line item can't spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`.",
  ).optional(),
  excludeNewExchanges: z.boolean().describe(
    "Whether to exclude new exchanges from automatically being targeted by the line item. This field is false by default.",
  ).optional(),
  flight: z.object({
    dateRange: z.object({
      endDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      startDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
    }).describe("A date range.").optional(),
    flightDateType: z.enum([
      "LINE_ITEM_FLIGHT_DATE_TYPE_UNSPECIFIED",
      "LINE_ITEM_FLIGHT_DATE_TYPE_INHERITED",
      "LINE_ITEM_FLIGHT_DATE_TYPE_CUSTOM",
    ]).describe("Required. The type of the line item's flight dates.")
      .optional(),
  }).describe("Settings that control the active duration of a line item.")
    .optional(),
  frequencyCap: z.object({
    maxImpressions: z.number().int().describe(
      "The maximum number of times a user may be shown the same ad during this period. Must be greater than 0. Required when unlimited is `false` and max_views is not set.",
    ).optional(),
    maxViews: z.number().int().describe(
      "Optional. The maximum number of times a user may click-through or fully view an ad during this period until it is no longer served to them. Must be greater than 0. Only applicable to YouTube and Partners resources. Required when unlimited is `false` and max_impressions is not set.",
    ).optional(),
    timeUnit: z.enum([
      "TIME_UNIT_UNSPECIFIED",
      "TIME_UNIT_LIFETIME",
      "TIME_UNIT_MONTHS",
      "TIME_UNIT_WEEKS",
      "TIME_UNIT_DAYS",
      "TIME_UNIT_HOURS",
      "TIME_UNIT_MINUTES",
    ]).describe(
      "The time unit in which the frequency cap will be applied. Required when unlimited is `false`.",
    ).optional(),
    timeUnitCount: z.number().int().describe(
      "The number of time_unit the frequency cap will last. Required when unlimited is `false`. The following restrictions apply based on the value of time_unit: * `TIME_UNIT_MONTHS` - must be 1 * `TIME_UNIT_WEEKS` - must be between 1 and 4 * `TIME_UNIT_DAYS` - must be between 1 and 6 * `TIME_UNIT_HOURS` - must be between 1 and 23 * `TIME_UNIT_MINUTES` - must be between 1 and 59",
    ).optional(),
    unlimited: z.boolean().describe(
      "Whether unlimited frequency capping is applied. When this field is set to `true`, the remaining frequency cap fields are not applicable.",
    ).optional(),
  }).describe(
    "Settings that control the number of times a user may be shown with the same ad during a given time period.",
  ).optional(),
  insertionOrderId: z.string().describe(
    "Required. Immutable. The unique ID of the insertion order that the line item belongs to.",
  ).optional(),
  integrationDetails: z.object({
    details: z.string().describe(
      "Additional details of the entry in string format. Must be UTF-8 encoded with a length of no more than 1000 characters.",
    ).optional(),
    integrationCode: z.string().describe(
      "An external identifier to be associated with the entry. The integration code will show up together with the entry in many places in the system, for example, reporting. Must be UTF-8 encoded with a length of no more than 500 characters.",
    ).optional(),
  }).describe("Integration details of an entry.").optional(),
  lineItemType: z.enum([
    "LINE_ITEM_TYPE_UNSPECIFIED",
    "LINE_ITEM_TYPE_DISPLAY_DEFAULT",
    "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INSTALL",
    "LINE_ITEM_TYPE_VIDEO_DEFAULT",
    "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INSTALL",
    "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INVENTORY",
    "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INVENTORY",
    "LINE_ITEM_TYPE_AUDIO_DEFAULT",
    "LINE_ITEM_TYPE_VIDEO_OVER_THE_TOP",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_ACTION",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_AUDIO",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE_OVER_THE_TOP",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH_OVER_THE_TOP",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE_OVER_THE_TOP",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_TARGET_FREQUENCY",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIEW",
    "LINE_ITEM_TYPE_DISPLAY_OUT_OF_HOME",
    "LINE_ITEM_TYPE_VIDEO_OUT_OF_HOME",
    "LINE_ITEM_TYPE_DEMAND_GEN",
  ]).describe("Required. Immutable. The type of the line item.").optional(),
  mobileApp: z.object({
    appId: z.string().describe(
      "Required. The ID of the app provided by the platform store. Android apps are identified by the bundle ID used by Android's Play store, such as `com.google.android.gm`. iOS apps are identified by a nine-digit app ID used by Apple's App store, such as `422689480`.",
    ).optional(),
    displayName: z.string().describe("Output only. The app name.").optional(),
    platform: z.enum(["PLATFORM_UNSPECIFIED", "IOS", "ANDROID"]).describe(
      "Output only. The app platform.",
    ).optional(),
    publisher: z.string().describe("Output only. The app publisher.")
      .optional(),
  }).describe("A mobile app promoted by a mobile app install line item.")
    .optional(),
  optimizeFixedBidding: z.boolean().describe(
    "Optional. Whether to enable DV360's bid optimization for fixed bid line items. By default, DV360 optimizes your fixed bid by automatically lowering bids for impressions that are less likely to perform well. This optimization is enabled by default (value is true). When this field is set to `false`, this optimization is disabled, and the bid will not be lowered for any reason. This setting only applies to line items with a `bidding_strategy` of type `FIXED_BID`.",
  ).optional(),
  pacing: z.object({
    dailyMaxImpressions: z.string().describe(
      "Maximum number of impressions to serve every day. Applicable when the budget is impression based. Must be greater than 0.",
    ).optional(),
    dailyMaxMicros: z.string().describe(
      "Maximum currency amount to spend every day in micros of advertiser's currency. Applicable when the budget is currency based. Must be greater than 0. For example, for 1.5 standard unit of the currency, set this field to 1500000. The value assigned will be rounded to whole billable units for the relevant currency by the following rules: any positive value less than a single billable unit will be rounded up to one billable unit and any value larger than a single billable unit will be rounded down to the nearest billable value. For example, if the currency's billable unit is 0.01, and this field is set to 10257770, it will round down to 10250000, a value of 10.25. If set to 505, it will round up to 10000, a value of 0.01.",
    ).optional(),
    pacingPeriod: z.enum([
      "PACING_PERIOD_UNSPECIFIED",
      "PACING_PERIOD_DAILY",
      "PACING_PERIOD_FLIGHT",
    ]).describe(
      "Required. The time period in which the pacing budget will be spent. When automatic budget allocation is enabled at the insertion order via automationType, this field is output only and defaults to `PACING_PERIOD_FLIGHT`.",
    ).optional(),
    pacingType: z.enum([
      "PACING_TYPE_UNSPECIFIED",
      "PACING_TYPE_AHEAD",
      "PACING_TYPE_ASAP",
      "PACING_TYPE_EVEN",
    ]).describe(
      "Required. The type of pacing that defines how the budget amount will be spent across the pacing_period. `PACING_TYPE_ASAP` is not compatible with pacing_period `PACING_PERIOD_FLIGHT` for insertion orders.",
    ).optional(),
  }).describe("Settings that control the rate at which a budget is spent.")
    .optional(),
  partnerCosts: z.array(z.object({
    costType: z.enum([
      "PARTNER_COST_TYPE_UNSPECIFIED",
      "PARTNER_COST_TYPE_ADLOOX",
      "PARTNER_COST_TYPE_ADLOOX_PREBID",
      "PARTNER_COST_TYPE_ADSAFE",
      "PARTNER_COST_TYPE_ADXPOSE",
      "PARTNER_COST_TYPE_AGGREGATE_KNOWLEDGE",
      "PARTNER_COST_TYPE_AGENCY_TRADING_DESK",
      "PARTNER_COST_TYPE_DV360_FEE",
      "PARTNER_COST_TYPE_COMSCORE_VCE",
      "PARTNER_COST_TYPE_DATA_MANAGEMENT_PLATFORM",
      "PARTNER_COST_TYPE_DEFAULT",
      "PARTNER_COST_TYPE_DOUBLE_VERIFY",
      "PARTNER_COST_TYPE_DOUBLE_VERIFY_PREBID",
      "PARTNER_COST_TYPE_EVIDON",
      "PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE_VIDEO",
      "PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE_PREBID",
      "PARTNER_COST_TYPE_MEDIA_COST_DATA",
      "PARTNER_COST_TYPE_MOAT_VIDEO",
      "PARTNER_COST_TYPE_NIELSEN_DAR",
      "PARTNER_COST_TYPE_SHOP_LOCAL",
      "PARTNER_COST_TYPE_TERACENT",
      "PARTNER_COST_TYPE_THIRD_PARTY_AD_SERVER",
      "PARTNER_COST_TYPE_TRUST_METRICS",
      "PARTNER_COST_TYPE_VIZU",
      "PARTNER_COST_TYPE_CUSTOM_FEE_1",
      "PARTNER_COST_TYPE_CUSTOM_FEE_2",
      "PARTNER_COST_TYPE_CUSTOM_FEE_3",
      "PARTNER_COST_TYPE_CUSTOM_FEE_4",
      "PARTNER_COST_TYPE_CUSTOM_FEE_5",
      "PARTNER_COST_TYPE_SCIBIDS_FEE",
    ]).describe("Required. The type of the partner cost.").optional(),
    feeAmount: z.string().describe(
      "The CPM fee amount in micros of advertiser's currency. Applicable when the fee_type is `PARTNER_FEE_TYPE_CPM_FEE`. Must be greater than or equal to 0. For example, for 1.5 standard unit of the advertiser's currency, set this field to 1500000.",
    ).optional(),
    feePercentageMillis: z.string().describe(
      "The media fee percentage in millis (1/1000 of a percent). Applicable when the fee_type is `PARTNER_FEE_TYPE_MEDIA_FEE`. Must be greater than or equal to 0. For example: 100 represents 0.1%.",
    ).optional(),
    feeType: z.enum([
      "PARTNER_COST_FEE_TYPE_UNSPECIFIED",
      "PARTNER_COST_FEE_TYPE_CPM_FEE",
      "PARTNER_COST_FEE_TYPE_MEDIA_FEE",
    ]).describe("Required. The fee type for this partner cost.").optional(),
    invoiceType: z.enum([
      "PARTNER_COST_INVOICE_TYPE_UNSPECIFIED",
      "PARTNER_COST_INVOICE_TYPE_DV360",
      "PARTNER_COST_INVOICE_TYPE_PARTNER",
    ]).describe(
      "The invoice type for this partner cost. * Required when cost_type is one of: - `PARTNER_COST_TYPE_ADLOOX` - `PARTNER_COST_TYPE_DOUBLE_VERIFY` - `PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE`. * Output only for other types.",
    ).optional(),
  })).describe(
    "The partner costs associated with the line item. If absent or empty in CreateLineItem method, the newly created line item will inherit partner costs from its parent insertion order.",
  ).optional(),
  partnerRevenueModel: z.object({
    markupAmount: z.string().describe(
      "Required. The markup amount of the partner revenue model. Must be greater than or equal to 0. * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM`, this field represents the CPM markup in micros of advertiser's currency. For example, 1500000 represents 1.5 standard units of the currency. * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP`, this field represents the media cost percent markup in millis. For example, 100 represents 0.1% (decimal 0.001). * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP`, this field represents the total media cost percent markup in millis. For example, 100 represents 0.1% (decimal 0.001).",
    ).optional(),
    markupType: z.enum([
      "PARTNER_REVENUE_MODEL_MARKUP_TYPE_UNSPECIFIED",
      "PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM",
      "PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP",
      "PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP",
    ]).describe(
      "Required. The markup type of the partner revenue model. This field must be set to `PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP` for Demand Gen line items.",
    ).optional(),
  }).describe("Settings that control how partner revenue is calculated.")
    .optional(),
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
  youtubeAndPartnersSettings: z.object({
    contentCategory: z.enum([
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_UNSPECIFIED",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_STANDARD",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_EXPANDED",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_LIMITED",
    ]).describe(
      "Output only. The kind of content on which the YouTube and Partners ads will be shown. *Warning*: This field will be removed in the near future. Use effective_content_category instead.",
    ).optional(),
    effectiveContentCategory: z.enum([
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_UNSPECIFIED",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_STANDARD",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_EXPANDED",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_LIMITED",
    ]).describe(
      "Output only. The content category which takes effect when serving the line item. When content category is set in both line item and advertiser, the stricter one will take effect when serving the line item. New line items will only inherit the advertiser level setting.",
    ).optional(),
    inventorySourceSettings: z.object({
      includeGoogleTv: z.boolean().describe(
        "Optional. Whether to target inventory in video apps available with Google TV.",
      ).optional(),
      includeYoutube: z.boolean().describe(
        "Optional. Whether to target inventory on YouTube. This includes both search, channels and videos.",
      ).optional(),
      includeYoutubeVideoPartners: z.boolean().describe(
        "Whether to target inventory on a collection of partner sites and apps that follow the same brand safety standards as YouTube.",
      ).optional(),
    }).describe(
      "Settings that control what YouTube related inventories the YouTube and Partners line item will target.",
    ).optional(),
    leadFormId: z.string().describe(
      "Optional. The ID of the form to generate leads.",
    ).optional(),
    linkedMerchantId: z.string().describe(
      "Optional. The ID of the Merchant Center account used to provide a product feed. This Merchant Center account must already be linked to the advertiser.",
    ).optional(),
    relatedVideoIds: z.array(z.string()).describe(
      "Optional. The IDs of the videos appear below the primary video ad when the ad is playing in the YouTube app on mobile devices.",
    ).optional(),
    targetFrequency: z.object({
      targetCount: z.string().describe(
        "The target number of times, on average, the ads will be shown to the same person in the timespan dictated by time_unit and time_unit_count.",
      ).optional(),
      timeUnit: z.enum([
        "TIME_UNIT_UNSPECIFIED",
        "TIME_UNIT_LIFETIME",
        "TIME_UNIT_MONTHS",
        "TIME_UNIT_WEEKS",
        "TIME_UNIT_DAYS",
        "TIME_UNIT_HOURS",
        "TIME_UNIT_MINUTES",
      ]).describe(
        "The unit of time in which the target frequency will be applied. The following time unit is applicable: * `TIME_UNIT_WEEKS`",
      ).optional(),
      timeUnitCount: z.number().int().describe(
        "The number of time_unit the target frequency will last. The following restrictions apply based on the value of time_unit: * `TIME_UNIT_WEEKS` - must be 1",
      ).optional(),
    }).describe(
      "Setting that controls the average number of times the ads will show to the same person over a certain period of time.",
    ).optional(),
    thirdPartyMeasurementConfigs: z.object({
      brandLiftVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring brand lift. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_DYNATA` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_INTAGE` * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_MACROMILL`",
      ).optional(),
      brandSafetyVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring brand safety. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_ZEFR` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE`",
      ).optional(),
      reachVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring reach. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_VIDEO_RESEARCH` * `THIRD_PARTY_VENDOR_MEDIA_SCOPE` * `THIRD_PARTY_VENDOR_AUDIENCE_PROJECT` * `THIRD_PARTY_VENDOR_VIDEO_AMP` * `THIRD_PARTY_VENDOR_ISPOT_TV` * `THIRD_PARTY_VENDOR_GEMIUS`",
      ).optional(),
      viewabilityVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring viewability. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_MOAT` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_TELEMETRY` * `THIRD_PARTY_VENDOR_MEETRICS`",
      ).optional(),
    }).describe(
      "Settings that control what third-party vendors are measuring specific line item metrics.",
    ).optional(),
    videoAdInventoryControl: z.object({
      allowInFeed: z.boolean().describe(
        "Optional. Whether ads can serve as in-feed format.",
      ).optional(),
      allowInStream: z.boolean().describe(
        "Optional. Whether ads can serve as in-stream format.",
      ).optional(),
      allowNonSkippableInStream: z.boolean().describe(
        "Optional. Indicates whether ads can serve as non-skippable in-stream format.",
      ).optional(),
      allowShorts: z.boolean().describe(
        "Optional. Whether ads can serve as shorts format.",
      ).optional(),
    }).describe(
      "The video ad inventory control used in certain YouTube line item types.",
    ).optional(),
    videoAdSequenceSettings: z.object({
      minimumDuration: z.enum([
        "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_UNSPECIFIED",
        "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_WEEK",
        "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_MONTH",
      ]).describe(
        "The minimum time interval before the same user sees this sequence again.",
      ).optional(),
      steps: z.array(z.object({
        adGroupId: z.string().describe(
          "The ID of the corresponding ad group of the step.",
        ).optional(),
        interactionType: z.enum([
          "INTERACTION_TYPE_UNSPECIFIED",
          "INTERACTION_TYPE_PAID_VIEW",
          "INTERACTION_TYPE_SKIP",
          "INTERACTION_TYPE_IMPRESSION",
          "INTERACTION_TYPE_ENGAGED_IMPRESSION",
        ]).describe(
          "The interaction on the previous step that will lead the viewer to this step. The first step does not have interaction_type.",
        ).optional(),
        previousStepId: z.string().describe(
          "The ID of the previous step. The first step does not have previous step.",
        ).optional(),
        stepId: z.string().describe("The ID of the step.").optional(),
      })).describe("The steps of which the sequence consists.").optional(),
    }).describe("Settings related to VideoAdSequence.").optional(),
    viewFrequencyCap: z.object({
      maxImpressions: z.number().int().describe(
        "The maximum number of times a user may be shown the same ad during this period. Must be greater than 0. Required when unlimited is `false` and max_views is not set.",
      ).optional(),
      maxViews: z.number().int().describe(
        "Optional. The maximum number of times a user may click-through or fully view an ad during this period until it is no longer served to them. Must be greater than 0. Only applicable to YouTube and Partners resources. Required when unlimited is `false` and max_impressions is not set.",
      ).optional(),
      timeUnit: z.enum([
        "TIME_UNIT_UNSPECIFIED",
        "TIME_UNIT_LIFETIME",
        "TIME_UNIT_MONTHS",
        "TIME_UNIT_WEEKS",
        "TIME_UNIT_DAYS",
        "TIME_UNIT_HOURS",
        "TIME_UNIT_MINUTES",
      ]).describe(
        "The time unit in which the frequency cap will be applied. Required when unlimited is `false`.",
      ).optional(),
      timeUnitCount: z.number().int().describe(
        "The number of time_unit the frequency cap will last. Required when unlimited is `false`. The following restrictions apply based on the value of time_unit: * `TIME_UNIT_MONTHS` - must be 1 * `TIME_UNIT_WEEKS` - must be between 1 and 4 * `TIME_UNIT_DAYS` - must be between 1 and 6 * `TIME_UNIT_HOURS` - must be between 1 and 23 * `TIME_UNIT_MINUTES` - must be between 1 and 59",
      ).optional(),
      unlimited: z.boolean().describe(
        "Whether unlimited frequency capping is applied. When this field is set to `true`, the remaining frequency cap fields are not applicable.",
      ).optional(),
    }).describe(
      "Settings that control the number of times a user may be shown with the same ad during a given time period.",
    ).optional(),
  }).describe("Settings for YouTube and Partners line items.").optional(),
});

const StateSchema = z.object({
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
  budget: z.object({
    budgetAllocationType: z.string(),
    budgetUnit: z.string(),
    maxAmount: z.string(),
  }).optional(),
  campaignId: z.string().optional(),
  containsEuPoliticalAds: z.string().optional(),
  conversionCounting: z.object({
    floodlightActivityConfigs: z.array(z.object({
      floodlightActivityId: z.string(),
      postClickLookbackWindowDays: z.number(),
      postViewLookbackWindowDays: z.number(),
    })),
    postViewCountPercentageMillis: z.string(),
    primaryAttributionModelId: z.string(),
  }).optional(),
  creativeIds: z.array(z.string()).optional(),
  demandGenSettings: z.object({
    geoLanguageTargetingEnabled: z.boolean(),
    linkedMerchantId: z.string(),
    thirdPartyMeasurementConfigs: z.object({
      brandLiftVendorConfigs: z.array(z.object({
        placementId: z.string(),
        vendor: z.string(),
      })),
      brandSafetyVendorConfigs: z.array(z.object({
        placementId: z.string(),
        vendor: z.string(),
      })),
      reachVendorConfigs: z.array(z.object({
        placementId: z.string(),
        vendor: z.string(),
      })),
      viewabilityVendorConfigs: z.array(z.object({
        placementId: z.string(),
        vendor: z.string(),
      })),
    }),
  }).optional(),
  displayName: z.string().optional(),
  entityStatus: z.string().optional(),
  excludeNewExchanges: z.boolean().optional(),
  flight: z.object({
    dateRange: z.object({
      endDate: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      startDate: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
    }),
    flightDateType: z.string(),
  }).optional(),
  frequencyCap: z.object({
    maxImpressions: z.number(),
    maxViews: z.number(),
    timeUnit: z.string(),
    timeUnitCount: z.number(),
    unlimited: z.boolean(),
  }).optional(),
  insertionOrderId: z.string().optional(),
  integrationDetails: z.object({
    details: z.string(),
    integrationCode: z.string(),
  }).optional(),
  lineItemId: z.string().optional(),
  lineItemType: z.string().optional(),
  mobileApp: z.object({
    appId: z.string(),
    displayName: z.string(),
    platform: z.string(),
    publisher: z.string(),
  }).optional(),
  name: z.string(),
  optimizeFixedBidding: z.boolean().optional(),
  pacing: z.object({
    dailyMaxImpressions: z.string(),
    dailyMaxMicros: z.string(),
    pacingPeriod: z.string(),
    pacingType: z.string(),
  }).optional(),
  partnerCosts: z.array(z.object({
    costType: z.string(),
    feeAmount: z.string(),
    feePercentageMillis: z.string(),
    feeType: z.string(),
    invoiceType: z.string(),
  })).optional(),
  partnerRevenueModel: z.object({
    markupAmount: z.string(),
    markupType: z.string(),
  }).optional(),
  reservationType: z.string().optional(),
  targetingExpansion: z.object({
    audienceExpansionLevel: z.string(),
    audienceExpansionSeedListExcluded: z.boolean(),
    enableOptimizedTargeting: z.boolean(),
    excludeDemographicExpansion: z.boolean(),
  }).optional(),
  updateTime: z.string().optional(),
  warningMessages: z.array(z.string()).optional(),
  youtubeAndPartnersSettings: z.object({
    contentCategory: z.string(),
    effectiveContentCategory: z.string(),
    inventorySourceSettings: z.object({
      includeGoogleTv: z.boolean(),
      includeYoutube: z.boolean(),
      includeYoutubeVideoPartners: z.boolean(),
    }),
    leadFormId: z.string(),
    linkedMerchantId: z.string(),
    relatedVideoIds: z.array(z.string()),
    targetFrequency: z.object({
      targetCount: z.string(),
      timeUnit: z.string(),
      timeUnitCount: z.number(),
    }),
    thirdPartyMeasurementConfigs: z.object({
      brandLiftVendorConfigs: z.array(z.object({
        placementId: z.string(),
        vendor: z.string(),
      })),
      brandSafetyVendorConfigs: z.array(z.object({
        placementId: z.string(),
        vendor: z.string(),
      })),
      reachVendorConfigs: z.array(z.object({
        placementId: z.string(),
        vendor: z.string(),
      })),
      viewabilityVendorConfigs: z.array(z.object({
        placementId: z.string(),
        vendor: z.string(),
      })),
    }),
    videoAdInventoryControl: z.object({
      allowInFeed: z.boolean(),
      allowInStream: z.boolean(),
      allowNonSkippableInStream: z.boolean(),
      allowShorts: z.boolean(),
    }),
    videoAdSequenceSettings: z.object({
      minimumDuration: z.string(),
      steps: z.array(z.object({
        adGroupId: z.string(),
        interactionType: z.string(),
        previousStepId: z.string(),
        stepId: z.string(),
      })),
    }),
    viewFrequencyCap: z.object({
      maxImpressions: z.number(),
      maxViews: z.number(),
      timeUnit: z.string(),
      timeUnitCount: z.number(),
      unlimited: z.boolean(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the line item belongs to.",
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
  budget: z.object({
    budgetAllocationType: z.enum([
      "LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNSPECIFIED",
      "LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC",
      "LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED",
      "LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED",
    ]).describe(
      "Required. The type of the budget allocation. `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC` is only applicable when automatic budget allocation is enabled for the parent insertion order. This field must be set to `LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED` for Demand Gen line items.",
    ).optional(),
    budgetUnit: z.enum([
      "BUDGET_UNIT_UNSPECIFIED",
      "BUDGET_UNIT_CURRENCY",
      "BUDGET_UNIT_IMPRESSIONS",
    ]).describe(
      "Output only. The budget unit specifies whether the budget is currency based or impression based. This value is inherited from the parent insertion order.",
    ).optional(),
    maxAmount: z.string().describe(
      "The maximum budget amount the line item will spend. Must be greater than 0. When budget_allocation_type is: * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_AUTOMATIC`, this field is immutable and is set by the system. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_FIXED`, if budget_unit is: - `BUDGET_UNIT_CURRENCY`, this field represents maximum budget amount to spend, in micros of the advertiser's currency. For example, 1500000 represents 1.5 standard units of the currency. - `BUDGET_UNIT_IMPRESSIONS`, this field represents the maximum number of impressions to serve. * `LINE_ITEM_BUDGET_ALLOCATION_TYPE_UNLIMITED`, this field is not applicable and will be ignored by the system.",
    ).optional(),
  }).describe("Settings that control how budget is allocated.").optional(),
  containsEuPoliticalAds: z.enum([
    "EU_POLITICAL_ADVERTISING_STATUS_UNKNOWN",
    "CONTAINS_EU_POLITICAL_ADVERTISING",
    "DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING",
  ]).describe(
    "Whether this line item will serve European Union political ads. If contains_eu_political_ads has been set to `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` in the parent advertiser, then this field will be assigned `DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING` if not otherwise specified. This field can then be updated using the UI, API, or Structured Data Files. This field must be assigned when creating a new line item. Otherwise, **the `advertisers.lineItems.create` request will fail**.",
  ).optional(),
  conversionCounting: z.object({
    floodlightActivityConfigs: z.array(z.object({
      floodlightActivityId: z.string().describe(
        "Required. The ID of the Floodlight activity.",
      ).optional(),
      postClickLookbackWindowDays: z.number().int().describe(
        "Required. The number of days after an ad has been clicked in which a conversion may be counted. Must be between 0 and 90 inclusive.",
      ).optional(),
      postViewLookbackWindowDays: z.number().int().describe(
        "Required. The number of days after an ad has been viewed in which a conversion may be counted. Must be between 0 and 90 inclusive.",
      ).optional(),
    })).describe(
      "The Floodlight activity configs used to track conversions. The number of conversions counted is the sum of all of the conversions counted by all of the Floodlight activity IDs specified in this field. This field can't be updated if a custom bidding algorithm is assigned to the line item. If you set this field and assign a custom bidding algorithm in the same request, the floodlight activities must match the ones used by the custom bidding algorithm.",
    ).optional(),
    postViewCountPercentageMillis: z.string().describe(
      "The percentage of post-view conversions to count, in millis (1/1000 of a percent). Must be between 0 and 100000 inclusive. For example, to track 50% of the post-click conversions, set a value of 50000.",
    ).optional(),
    primaryAttributionModelId: z.string().describe(
      "Optional. The attribution model to use for conversion measurement. This attribution model will determine how conversions are counted. The Primary model can be set by you for a floodlight config or group. More details [here](https://support.google.com/displayvideo/answer/7409983). Only applicable to Demand Gen line items. Retrieval and management of Demand Gen resources is currently in beta. This field is only available to allowlisted users.",
    ).optional(),
  }).describe(
    "Settings that control how conversions are counted. All post-click conversions will be counted. A percentage value can be set for post-view conversions counting.",
  ).optional(),
  creativeIds: z.array(z.string()).describe(
    "The IDs of the creatives associated with the line item.",
  ).optional(),
  demandGenSettings: z.object({
    geoLanguageTargetingEnabled: z.boolean().describe(
      "Optional. Immutable. Whether location and language targeting can be set at the line item level. Otherwise, relevant targeting types must be assigned directly to ad groups.",
    ).optional(),
    linkedMerchantId: z.string().describe(
      "Optional. The ID of the Merchant Center account used to provide a product feed. This Merchant Center account must already be linked to the advertiser.",
    ).optional(),
    thirdPartyMeasurementConfigs: z.object({
      brandLiftVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring brand lift. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_DYNATA` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_INTAGE` * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_MACROMILL`",
      ).optional(),
      brandSafetyVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring brand safety. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_ZEFR` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE`",
      ).optional(),
      reachVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring reach. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_VIDEO_RESEARCH` * `THIRD_PARTY_VENDOR_MEDIA_SCOPE` * `THIRD_PARTY_VENDOR_AUDIENCE_PROJECT` * `THIRD_PARTY_VENDOR_VIDEO_AMP` * `THIRD_PARTY_VENDOR_ISPOT_TV` * `THIRD_PARTY_VENDOR_GEMIUS`",
      ).optional(),
      viewabilityVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring viewability. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_MOAT` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_TELEMETRY` * `THIRD_PARTY_VENDOR_MEETRICS`",
      ).optional(),
    }).describe(
      "Settings that control what third-party vendors are measuring specific line item metrics.",
    ).optional(),
  }).describe("Settings for Demand Gen line items.").optional(),
  displayName: z.string().describe(
    "Required. The display name of the line item. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not the line item can spend its budget and bid on inventory. * For CreateLineItem method, only `ENTITY_STATUS_DRAFT` is allowed. To activate a line item, use UpdateLineItem method and update the status to `ENTITY_STATUS_ACTIVE` after creation. * A line item cannot be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * If the line item's parent insertion order is not active, the line item can't spend its budget even if its own status is `ENTITY_STATUS_ACTIVE`.",
  ).optional(),
  excludeNewExchanges: z.boolean().describe(
    "Whether to exclude new exchanges from automatically being targeted by the line item. This field is false by default.",
  ).optional(),
  flight: z.object({
    dateRange: z.object({
      endDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      startDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
    }).describe("A date range.").optional(),
    flightDateType: z.enum([
      "LINE_ITEM_FLIGHT_DATE_TYPE_UNSPECIFIED",
      "LINE_ITEM_FLIGHT_DATE_TYPE_INHERITED",
      "LINE_ITEM_FLIGHT_DATE_TYPE_CUSTOM",
    ]).describe("Required. The type of the line item's flight dates.")
      .optional(),
  }).describe("Settings that control the active duration of a line item.")
    .optional(),
  frequencyCap: z.object({
    maxImpressions: z.number().int().describe(
      "The maximum number of times a user may be shown the same ad during this period. Must be greater than 0. Required when unlimited is `false` and max_views is not set.",
    ).optional(),
    maxViews: z.number().int().describe(
      "Optional. The maximum number of times a user may click-through or fully view an ad during this period until it is no longer served to them. Must be greater than 0. Only applicable to YouTube and Partners resources. Required when unlimited is `false` and max_impressions is not set.",
    ).optional(),
    timeUnit: z.enum([
      "TIME_UNIT_UNSPECIFIED",
      "TIME_UNIT_LIFETIME",
      "TIME_UNIT_MONTHS",
      "TIME_UNIT_WEEKS",
      "TIME_UNIT_DAYS",
      "TIME_UNIT_HOURS",
      "TIME_UNIT_MINUTES",
    ]).describe(
      "The time unit in which the frequency cap will be applied. Required when unlimited is `false`.",
    ).optional(),
    timeUnitCount: z.number().int().describe(
      "The number of time_unit the frequency cap will last. Required when unlimited is `false`. The following restrictions apply based on the value of time_unit: * `TIME_UNIT_MONTHS` - must be 1 * `TIME_UNIT_WEEKS` - must be between 1 and 4 * `TIME_UNIT_DAYS` - must be between 1 and 6 * `TIME_UNIT_HOURS` - must be between 1 and 23 * `TIME_UNIT_MINUTES` - must be between 1 and 59",
    ).optional(),
    unlimited: z.boolean().describe(
      "Whether unlimited frequency capping is applied. When this field is set to `true`, the remaining frequency cap fields are not applicable.",
    ).optional(),
  }).describe(
    "Settings that control the number of times a user may be shown with the same ad during a given time period.",
  ).optional(),
  insertionOrderId: z.string().describe(
    "Required. Immutable. The unique ID of the insertion order that the line item belongs to.",
  ).optional(),
  integrationDetails: z.object({
    details: z.string().describe(
      "Additional details of the entry in string format. Must be UTF-8 encoded with a length of no more than 1000 characters.",
    ).optional(),
    integrationCode: z.string().describe(
      "An external identifier to be associated with the entry. The integration code will show up together with the entry in many places in the system, for example, reporting. Must be UTF-8 encoded with a length of no more than 500 characters.",
    ).optional(),
  }).describe("Integration details of an entry.").optional(),
  lineItemType: z.enum([
    "LINE_ITEM_TYPE_UNSPECIFIED",
    "LINE_ITEM_TYPE_DISPLAY_DEFAULT",
    "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INSTALL",
    "LINE_ITEM_TYPE_VIDEO_DEFAULT",
    "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INSTALL",
    "LINE_ITEM_TYPE_DISPLAY_MOBILE_APP_INVENTORY",
    "LINE_ITEM_TYPE_VIDEO_MOBILE_APP_INVENTORY",
    "LINE_ITEM_TYPE_AUDIO_DEFAULT",
    "LINE_ITEM_TYPE_VIDEO_OVER_THE_TOP",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_ACTION",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIDEO_SEQUENCE",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_AUDIO",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_NON_SKIPPABLE_OVER_THE_TOP",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_REACH_OVER_THE_TOP",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_SIMPLE_OVER_THE_TOP",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_TARGET_FREQUENCY",
    "LINE_ITEM_TYPE_YOUTUBE_AND_PARTNERS_VIEW",
    "LINE_ITEM_TYPE_DISPLAY_OUT_OF_HOME",
    "LINE_ITEM_TYPE_VIDEO_OUT_OF_HOME",
    "LINE_ITEM_TYPE_DEMAND_GEN",
  ]).describe("Required. Immutable. The type of the line item.").optional(),
  mobileApp: z.object({
    appId: z.string().describe(
      "Required. The ID of the app provided by the platform store. Android apps are identified by the bundle ID used by Android's Play store, such as `com.google.android.gm`. iOS apps are identified by a nine-digit app ID used by Apple's App store, such as `422689480`.",
    ).optional(),
    displayName: z.string().describe("Output only. The app name.").optional(),
    platform: z.enum(["PLATFORM_UNSPECIFIED", "IOS", "ANDROID"]).describe(
      "Output only. The app platform.",
    ).optional(),
    publisher: z.string().describe("Output only. The app publisher.")
      .optional(),
  }).describe("A mobile app promoted by a mobile app install line item.")
    .optional(),
  optimizeFixedBidding: z.boolean().describe(
    "Optional. Whether to enable DV360's bid optimization for fixed bid line items. By default, DV360 optimizes your fixed bid by automatically lowering bids for impressions that are less likely to perform well. This optimization is enabled by default (value is true). When this field is set to `false`, this optimization is disabled, and the bid will not be lowered for any reason. This setting only applies to line items with a `bidding_strategy` of type `FIXED_BID`.",
  ).optional(),
  pacing: z.object({
    dailyMaxImpressions: z.string().describe(
      "Maximum number of impressions to serve every day. Applicable when the budget is impression based. Must be greater than 0.",
    ).optional(),
    dailyMaxMicros: z.string().describe(
      "Maximum currency amount to spend every day in micros of advertiser's currency. Applicable when the budget is currency based. Must be greater than 0. For example, for 1.5 standard unit of the currency, set this field to 1500000. The value assigned will be rounded to whole billable units for the relevant currency by the following rules: any positive value less than a single billable unit will be rounded up to one billable unit and any value larger than a single billable unit will be rounded down to the nearest billable value. For example, if the currency's billable unit is 0.01, and this field is set to 10257770, it will round down to 10250000, a value of 10.25. If set to 505, it will round up to 10000, a value of 0.01.",
    ).optional(),
    pacingPeriod: z.enum([
      "PACING_PERIOD_UNSPECIFIED",
      "PACING_PERIOD_DAILY",
      "PACING_PERIOD_FLIGHT",
    ]).describe(
      "Required. The time period in which the pacing budget will be spent. When automatic budget allocation is enabled at the insertion order via automationType, this field is output only and defaults to `PACING_PERIOD_FLIGHT`.",
    ).optional(),
    pacingType: z.enum([
      "PACING_TYPE_UNSPECIFIED",
      "PACING_TYPE_AHEAD",
      "PACING_TYPE_ASAP",
      "PACING_TYPE_EVEN",
    ]).describe(
      "Required. The type of pacing that defines how the budget amount will be spent across the pacing_period. `PACING_TYPE_ASAP` is not compatible with pacing_period `PACING_PERIOD_FLIGHT` for insertion orders.",
    ).optional(),
  }).describe("Settings that control the rate at which a budget is spent.")
    .optional(),
  partnerCosts: z.array(z.object({
    costType: z.enum([
      "PARTNER_COST_TYPE_UNSPECIFIED",
      "PARTNER_COST_TYPE_ADLOOX",
      "PARTNER_COST_TYPE_ADLOOX_PREBID",
      "PARTNER_COST_TYPE_ADSAFE",
      "PARTNER_COST_TYPE_ADXPOSE",
      "PARTNER_COST_TYPE_AGGREGATE_KNOWLEDGE",
      "PARTNER_COST_TYPE_AGENCY_TRADING_DESK",
      "PARTNER_COST_TYPE_DV360_FEE",
      "PARTNER_COST_TYPE_COMSCORE_VCE",
      "PARTNER_COST_TYPE_DATA_MANAGEMENT_PLATFORM",
      "PARTNER_COST_TYPE_DEFAULT",
      "PARTNER_COST_TYPE_DOUBLE_VERIFY",
      "PARTNER_COST_TYPE_DOUBLE_VERIFY_PREBID",
      "PARTNER_COST_TYPE_EVIDON",
      "PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE_VIDEO",
      "PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE_PREBID",
      "PARTNER_COST_TYPE_MEDIA_COST_DATA",
      "PARTNER_COST_TYPE_MOAT_VIDEO",
      "PARTNER_COST_TYPE_NIELSEN_DAR",
      "PARTNER_COST_TYPE_SHOP_LOCAL",
      "PARTNER_COST_TYPE_TERACENT",
      "PARTNER_COST_TYPE_THIRD_PARTY_AD_SERVER",
      "PARTNER_COST_TYPE_TRUST_METRICS",
      "PARTNER_COST_TYPE_VIZU",
      "PARTNER_COST_TYPE_CUSTOM_FEE_1",
      "PARTNER_COST_TYPE_CUSTOM_FEE_2",
      "PARTNER_COST_TYPE_CUSTOM_FEE_3",
      "PARTNER_COST_TYPE_CUSTOM_FEE_4",
      "PARTNER_COST_TYPE_CUSTOM_FEE_5",
      "PARTNER_COST_TYPE_SCIBIDS_FEE",
    ]).describe("Required. The type of the partner cost.").optional(),
    feeAmount: z.string().describe(
      "The CPM fee amount in micros of advertiser's currency. Applicable when the fee_type is `PARTNER_FEE_TYPE_CPM_FEE`. Must be greater than or equal to 0. For example, for 1.5 standard unit of the advertiser's currency, set this field to 1500000.",
    ).optional(),
    feePercentageMillis: z.string().describe(
      "The media fee percentage in millis (1/1000 of a percent). Applicable when the fee_type is `PARTNER_FEE_TYPE_MEDIA_FEE`. Must be greater than or equal to 0. For example: 100 represents 0.1%.",
    ).optional(),
    feeType: z.enum([
      "PARTNER_COST_FEE_TYPE_UNSPECIFIED",
      "PARTNER_COST_FEE_TYPE_CPM_FEE",
      "PARTNER_COST_FEE_TYPE_MEDIA_FEE",
    ]).describe("Required. The fee type for this partner cost.").optional(),
    invoiceType: z.enum([
      "PARTNER_COST_INVOICE_TYPE_UNSPECIFIED",
      "PARTNER_COST_INVOICE_TYPE_DV360",
      "PARTNER_COST_INVOICE_TYPE_PARTNER",
    ]).describe(
      "The invoice type for this partner cost. * Required when cost_type is one of: - `PARTNER_COST_TYPE_ADLOOX` - `PARTNER_COST_TYPE_DOUBLE_VERIFY` - `PARTNER_COST_TYPE_INTEGRAL_AD_SCIENCE`. * Output only for other types.",
    ).optional(),
  })).describe(
    "The partner costs associated with the line item. If absent or empty in CreateLineItem method, the newly created line item will inherit partner costs from its parent insertion order.",
  ).optional(),
  partnerRevenueModel: z.object({
    markupAmount: z.string().describe(
      "Required. The markup amount of the partner revenue model. Must be greater than or equal to 0. * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM`, this field represents the CPM markup in micros of advertiser's currency. For example, 1500000 represents 1.5 standard units of the currency. * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP`, this field represents the media cost percent markup in millis. For example, 100 represents 0.1% (decimal 0.001). * When the markup_type is set to be `PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP`, this field represents the total media cost percent markup in millis. For example, 100 represents 0.1% (decimal 0.001).",
    ).optional(),
    markupType: z.enum([
      "PARTNER_REVENUE_MODEL_MARKUP_TYPE_UNSPECIFIED",
      "PARTNER_REVENUE_MODEL_MARKUP_TYPE_CPM",
      "PARTNER_REVENUE_MODEL_MARKUP_TYPE_MEDIA_COST_MARKUP",
      "PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP",
    ]).describe(
      "Required. The markup type of the partner revenue model. This field must be set to `PARTNER_REVENUE_MODEL_MARKUP_TYPE_TOTAL_MEDIA_COST_MARKUP` for Demand Gen line items.",
    ).optional(),
  }).describe("Settings that control how partner revenue is calculated.")
    .optional(),
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
  youtubeAndPartnersSettings: z.object({
    contentCategory: z.enum([
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_UNSPECIFIED",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_STANDARD",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_EXPANDED",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_LIMITED",
    ]).describe(
      "Output only. The kind of content on which the YouTube and Partners ads will be shown. *Warning*: This field will be removed in the near future. Use effective_content_category instead.",
    ).optional(),
    effectiveContentCategory: z.enum([
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_UNSPECIFIED",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_STANDARD",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_EXPANDED",
      "YOUTUBE_AND_PARTNERS_CONTENT_CATEGORY_LIMITED",
    ]).describe(
      "Output only. The content category which takes effect when serving the line item. When content category is set in both line item and advertiser, the stricter one will take effect when serving the line item. New line items will only inherit the advertiser level setting.",
    ).optional(),
    inventorySourceSettings: z.object({
      includeGoogleTv: z.boolean().describe(
        "Optional. Whether to target inventory in video apps available with Google TV.",
      ).optional(),
      includeYoutube: z.boolean().describe(
        "Optional. Whether to target inventory on YouTube. This includes both search, channels and videos.",
      ).optional(),
      includeYoutubeVideoPartners: z.boolean().describe(
        "Whether to target inventory on a collection of partner sites and apps that follow the same brand safety standards as YouTube.",
      ).optional(),
    }).describe(
      "Settings that control what YouTube related inventories the YouTube and Partners line item will target.",
    ).optional(),
    leadFormId: z.string().describe(
      "Optional. The ID of the form to generate leads.",
    ).optional(),
    linkedMerchantId: z.string().describe(
      "Optional. The ID of the Merchant Center account used to provide a product feed. This Merchant Center account must already be linked to the advertiser.",
    ).optional(),
    relatedVideoIds: z.array(z.string()).describe(
      "Optional. The IDs of the videos appear below the primary video ad when the ad is playing in the YouTube app on mobile devices.",
    ).optional(),
    targetFrequency: z.object({
      targetCount: z.string().describe(
        "The target number of times, on average, the ads will be shown to the same person in the timespan dictated by time_unit and time_unit_count.",
      ).optional(),
      timeUnit: z.enum([
        "TIME_UNIT_UNSPECIFIED",
        "TIME_UNIT_LIFETIME",
        "TIME_UNIT_MONTHS",
        "TIME_UNIT_WEEKS",
        "TIME_UNIT_DAYS",
        "TIME_UNIT_HOURS",
        "TIME_UNIT_MINUTES",
      ]).describe(
        "The unit of time in which the target frequency will be applied. The following time unit is applicable: * `TIME_UNIT_WEEKS`",
      ).optional(),
      timeUnitCount: z.number().int().describe(
        "The number of time_unit the target frequency will last. The following restrictions apply based on the value of time_unit: * `TIME_UNIT_WEEKS` - must be 1",
      ).optional(),
    }).describe(
      "Setting that controls the average number of times the ads will show to the same person over a certain period of time.",
    ).optional(),
    thirdPartyMeasurementConfigs: z.object({
      brandLiftVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring brand lift. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_DYNATA` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_INTAGE` * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_MACROMILL`",
      ).optional(),
      brandSafetyVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring brand safety. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_ZEFR` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE`",
      ).optional(),
      reachVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring reach. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_NIELSEN` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_KANTAR` * `THIRD_PARTY_VENDOR_VIDEO_RESEARCH` * `THIRD_PARTY_VENDOR_MEDIA_SCOPE` * `THIRD_PARTY_VENDOR_AUDIENCE_PROJECT` * `THIRD_PARTY_VENDOR_VIDEO_AMP` * `THIRD_PARTY_VENDOR_ISPOT_TV` * `THIRD_PARTY_VENDOR_GEMIUS`",
      ).optional(),
      viewabilityVendorConfigs: z.array(z.object({
        placementId: z.string().describe(
          "The ID used by the platform of the third-party vendor to identify the line item.",
        ).optional(),
        vendor: z.enum([
          "THIRD_PARTY_VENDOR_UNSPECIFIED",
          "THIRD_PARTY_VENDOR_MOAT",
          "THIRD_PARTY_VENDOR_DOUBLE_VERIFY",
          "THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE",
          "THIRD_PARTY_VENDOR_COMSCORE",
          "THIRD_PARTY_VENDOR_TELEMETRY",
          "THIRD_PARTY_VENDOR_MEETRICS",
          "THIRD_PARTY_VENDOR_ZEFR",
          "THIRD_PARTY_VENDOR_NIELSEN",
          "THIRD_PARTY_VENDOR_KANTAR",
          "THIRD_PARTY_VENDOR_DYNATA",
          "THIRD_PARTY_VENDOR_TRANSUNION",
          "THIRD_PARTY_VENDOR_ORIGIN",
          "THIRD_PARTY_VENDOR_GEMIUS",
          "THIRD_PARTY_VENDOR_MEDIA_SCOPE",
          "THIRD_PARTY_VENDOR_AUDIENCE_PROJECT",
          "THIRD_PARTY_VENDOR_VIDEO_AMP",
          "THIRD_PARTY_VENDOR_ISPOT_TV",
          "THIRD_PARTY_VENDOR_INTAGE",
          "THIRD_PARTY_VENDOR_MACROMILL",
          "THIRD_PARTY_VENDOR_VIDEO_RESEARCH",
        ]).describe("The third-party measurement vendor.").optional(),
      })).describe(
        "Optional. The third-party vendors measuring viewability. The following third-party vendors are applicable: * `THIRD_PARTY_VENDOR_MOAT` * `THIRD_PARTY_VENDOR_DOUBLE_VERIFY` * `THIRD_PARTY_VENDOR_INTEGRAL_AD_SCIENCE` * `THIRD_PARTY_VENDOR_COMSCORE` * `THIRD_PARTY_VENDOR_TELEMETRY` * `THIRD_PARTY_VENDOR_MEETRICS`",
      ).optional(),
    }).describe(
      "Settings that control what third-party vendors are measuring specific line item metrics.",
    ).optional(),
    videoAdInventoryControl: z.object({
      allowInFeed: z.boolean().describe(
        "Optional. Whether ads can serve as in-feed format.",
      ).optional(),
      allowInStream: z.boolean().describe(
        "Optional. Whether ads can serve as in-stream format.",
      ).optional(),
      allowNonSkippableInStream: z.boolean().describe(
        "Optional. Indicates whether ads can serve as non-skippable in-stream format.",
      ).optional(),
      allowShorts: z.boolean().describe(
        "Optional. Whether ads can serve as shorts format.",
      ).optional(),
    }).describe(
      "The video ad inventory control used in certain YouTube line item types.",
    ).optional(),
    videoAdSequenceSettings: z.object({
      minimumDuration: z.enum([
        "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_UNSPECIFIED",
        "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_WEEK",
        "VIDEO_AD_SEQUENCE_MINIMUM_DURATION_MONTH",
      ]).describe(
        "The minimum time interval before the same user sees this sequence again.",
      ).optional(),
      steps: z.array(z.object({
        adGroupId: z.string().describe(
          "The ID of the corresponding ad group of the step.",
        ).optional(),
        interactionType: z.enum([
          "INTERACTION_TYPE_UNSPECIFIED",
          "INTERACTION_TYPE_PAID_VIEW",
          "INTERACTION_TYPE_SKIP",
          "INTERACTION_TYPE_IMPRESSION",
          "INTERACTION_TYPE_ENGAGED_IMPRESSION",
        ]).describe(
          "The interaction on the previous step that will lead the viewer to this step. The first step does not have interaction_type.",
        ).optional(),
        previousStepId: z.string().describe(
          "The ID of the previous step. The first step does not have previous step.",
        ).optional(),
        stepId: z.string().describe("The ID of the step.").optional(),
      })).describe("The steps of which the sequence consists.").optional(),
    }).describe("Settings related to VideoAdSequence.").optional(),
    viewFrequencyCap: z.object({
      maxImpressions: z.number().int().describe(
        "The maximum number of times a user may be shown the same ad during this period. Must be greater than 0. Required when unlimited is `false` and max_views is not set.",
      ).optional(),
      maxViews: z.number().int().describe(
        "Optional. The maximum number of times a user may click-through or fully view an ad during this period until it is no longer served to them. Must be greater than 0. Only applicable to YouTube and Partners resources. Required when unlimited is `false` and max_impressions is not set.",
      ).optional(),
      timeUnit: z.enum([
        "TIME_UNIT_UNSPECIFIED",
        "TIME_UNIT_LIFETIME",
        "TIME_UNIT_MONTHS",
        "TIME_UNIT_WEEKS",
        "TIME_UNIT_DAYS",
        "TIME_UNIT_HOURS",
        "TIME_UNIT_MINUTES",
      ]).describe(
        "The time unit in which the frequency cap will be applied. Required when unlimited is `false`.",
      ).optional(),
      timeUnitCount: z.number().int().describe(
        "The number of time_unit the frequency cap will last. Required when unlimited is `false`. The following restrictions apply based on the value of time_unit: * `TIME_UNIT_MONTHS` - must be 1 * `TIME_UNIT_WEEKS` - must be between 1 and 4 * `TIME_UNIT_DAYS` - must be between 1 and 6 * `TIME_UNIT_HOURS` - must be between 1 and 23 * `TIME_UNIT_MINUTES` - must be between 1 and 59",
      ).optional(),
      unlimited: z.boolean().describe(
        "Whether unlimited frequency capping is applied. When this field is set to `true`, the remaining frequency cap fields are not applicable.",
      ).optional(),
    }).describe(
      "Settings that control the number of times a user may be shown with the same ad during a given time period.",
    ).optional(),
  }).describe("Settings for YouTube and Partners line items.").optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.LineItems. Registered at `@swamp/gcp/displayvideo/advertisers-lineitems`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-lineitems",
  version: "2026.05.21.1",
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
      description: "Added: optimizeFixedBidding",
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
      description: "Removed: optimizeFixedBidding",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { optimizeFixedBidding: _optimizeFixedBidding, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: optimizeFixedBidding",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: optimizeFixedBidding",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { optimizeFixedBidding: _optimizeFixedBidding, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: optimizeFixedBidding",
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
      description: "A single line item.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a lineItems",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["bidStrategy"] !== undefined) {
          body["bidStrategy"] = g["bidStrategy"];
        }
        if (g["budget"] !== undefined) body["budget"] = g["budget"];
        if (g["containsEuPoliticalAds"] !== undefined) {
          body["containsEuPoliticalAds"] = g["containsEuPoliticalAds"];
        }
        if (g["conversionCounting"] !== undefined) {
          body["conversionCounting"] = g["conversionCounting"];
        }
        if (g["creativeIds"] !== undefined) {
          body["creativeIds"] = g["creativeIds"];
        }
        if (g["demandGenSettings"] !== undefined) {
          body["demandGenSettings"] = g["demandGenSettings"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["excludeNewExchanges"] !== undefined) {
          body["excludeNewExchanges"] = g["excludeNewExchanges"];
        }
        if (g["flight"] !== undefined) body["flight"] = g["flight"];
        if (g["frequencyCap"] !== undefined) {
          body["frequencyCap"] = g["frequencyCap"];
        }
        if (g["insertionOrderId"] !== undefined) {
          body["insertionOrderId"] = g["insertionOrderId"];
        }
        if (g["integrationDetails"] !== undefined) {
          body["integrationDetails"] = g["integrationDetails"];
        }
        if (g["lineItemType"] !== undefined) {
          body["lineItemType"] = g["lineItemType"];
        }
        if (g["mobileApp"] !== undefined) body["mobileApp"] = g["mobileApp"];
        if (g["optimizeFixedBidding"] !== undefined) {
          body["optimizeFixedBidding"] = g["optimizeFixedBidding"];
        }
        if (g["pacing"] !== undefined) body["pacing"] = g["pacing"];
        if (g["partnerCosts"] !== undefined) {
          body["partnerCosts"] = g["partnerCosts"];
        }
        if (g["partnerRevenueModel"] !== undefined) {
          body["partnerRevenueModel"] = g["partnerRevenueModel"];
        }
        if (g["targetingExpansion"] !== undefined) {
          body["targetingExpansion"] = g["targetingExpansion"];
        }
        if (g["youtubeAndPartnersSettings"] !== undefined) {
          body["youtubeAndPartnersSettings"] = g["youtubeAndPartnersSettings"];
        }
        if (g["name"] !== undefined) params["lineItemId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "advertiserId": String(g["advertiserId"] ?? "") },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a lineItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the lineItems"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["lineItemId"] = args.identifier;
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
      description: "Update lineItems attributes",
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
        params["lineItemId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["bidStrategy"] !== undefined) {
          body["bidStrategy"] = g["bidStrategy"];
        }
        if (g["budget"] !== undefined) body["budget"] = g["budget"];
        if (g["containsEuPoliticalAds"] !== undefined) {
          body["containsEuPoliticalAds"] = g["containsEuPoliticalAds"];
        }
        if (g["conversionCounting"] !== undefined) {
          body["conversionCounting"] = g["conversionCounting"];
        }
        if (g["creativeIds"] !== undefined) {
          body["creativeIds"] = g["creativeIds"];
        }
        if (g["demandGenSettings"] !== undefined) {
          body["demandGenSettings"] = g["demandGenSettings"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["excludeNewExchanges"] !== undefined) {
          body["excludeNewExchanges"] = g["excludeNewExchanges"];
        }
        if (g["flight"] !== undefined) body["flight"] = g["flight"];
        if (g["frequencyCap"] !== undefined) {
          body["frequencyCap"] = g["frequencyCap"];
        }
        if (g["integrationDetails"] !== undefined) {
          body["integrationDetails"] = g["integrationDetails"];
        }
        if (g["mobileApp"] !== undefined) body["mobileApp"] = g["mobileApp"];
        if (g["optimizeFixedBidding"] !== undefined) {
          body["optimizeFixedBidding"] = g["optimizeFixedBidding"];
        }
        if (g["pacing"] !== undefined) body["pacing"] = g["pacing"];
        if (g["partnerCosts"] !== undefined) {
          body["partnerCosts"] = g["partnerCosts"];
        }
        if (g["partnerRevenueModel"] !== undefined) {
          body["partnerRevenueModel"] = g["partnerRevenueModel"];
        }
        if (g["targetingExpansion"] !== undefined) {
          body["targetingExpansion"] = g["targetingExpansion"];
        }
        if (g["youtubeAndPartnersSettings"] !== undefined) {
          body["youtubeAndPartnersSettings"] = g["youtubeAndPartnersSettings"];
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
      description: "Delete the lineItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the lineItems"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["lineItemId"] = args.identifier;
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
      description: "Sync lineItems state from GCP",
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
          params["lineItemId"] = identifier;
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
        createRequests: z.any().optional(),
        deleteRequests: z.any().optional(),
        lineItemIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["createRequests"] !== undefined) {
          body["createRequests"] = args["createRequests"];
        }
        if (args["deleteRequests"] !== undefined) {
          body["deleteRequests"] = args["deleteRequests"];
        }
        if (args["lineItemIds"] !== undefined) {
          body["lineItemIds"] = args["lineItemIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.advertisers.lineItems.bulkEditAssignedTargetingOptions",
            "path":
              "v4/advertisers/{+advertiserId}/lineItems:bulkEditAssignedTargetingOptions",
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
              "displayvideo.advertisers.lineItems.bulkListAssignedTargetingOptions",
            "path":
              "v4/advertisers/{+advertiserId}/lineItems:bulkListAssignedTargetingOptions",
            "httpMethod": "GET",
            "parameterOrder": ["advertiserId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "filter": { "location": "query" },
              "lineItemIds": { "location": "query" },
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
    bulk_update: {
      description: "bulk update",
      arguments: z.object({
        lineItemIds: z.any().optional(),
        targetLineItem: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["lineItemIds"] !== undefined) {
          body["lineItemIds"] = args["lineItemIds"];
        }
        if (args["targetLineItem"] !== undefined) {
          body["targetLineItem"] = args["targetLineItem"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.advertisers.lineItems.bulkUpdate",
            "path": "v4/advertisers/{+advertiserId}/lineItems:bulkUpdate",
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
    duplicate: {
      description: "duplicate",
      arguments: z.object({
        containsEuPoliticalAds: z.any().optional(),
        targetDisplayName: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
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
        params["lineItemId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["containsEuPoliticalAds"] !== undefined) {
          body["containsEuPoliticalAds"] = args["containsEuPoliticalAds"];
        }
        if (args["targetDisplayName"] !== undefined) {
          body["targetDisplayName"] = args["targetDisplayName"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.advertisers.lineItems.duplicate",
            "path":
              "v4/advertisers/{+advertiserId}/lineItems/{+lineItemId}:duplicate",
            "httpMethod": "POST",
            "parameterOrder": ["advertiserId", "lineItemId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "lineItemId": { "location": "path", "required": true },
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
