// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-insertionorders
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.InsertionOrders.
 *
 * A single insertion order.
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
  "id": "displayvideo.advertisers.insertionOrders.get",
  "path": "v4/advertisers/{+advertiserId}/insertionOrders/{+insertionOrderId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "insertionOrderId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "insertionOrderId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.advertisers.insertionOrders.create",
  "path": "v4/advertisers/{+advertiserId}/insertionOrders",
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
  "id": "displayvideo.advertisers.insertionOrders.patch",
  "path": "v4/advertisers/{+advertiserId}/insertionOrders/{+insertionOrderId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "advertiserId",
    "insertionOrderId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "insertionOrderId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.insertionOrders.delete",
  "path": "v4/advertisers/{+advertiserId}/insertionOrders/{+insertionOrderId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
    "insertionOrderId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "insertionOrderId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.insertionOrders.list",
  "path": "v4/advertisers/{+advertiserId}/insertionOrders",
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
    "Output only. The unique ID of the advertiser the insertion order belongs to.",
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
    automationType: z.enum([
      "INSERTION_ORDER_AUTOMATION_TYPE_UNSPECIFIED",
      "INSERTION_ORDER_AUTOMATION_TYPE_BUDGET",
      "INSERTION_ORDER_AUTOMATION_TYPE_NONE",
      "INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET",
    ]).describe(
      "Optional. The type of automation used to manage bid and budget for the insertion order. If this field is unspecified in creation, the value defaults to `INSERTION_ORDER_AUTOMATION_TYPE_NONE`.",
    ).optional(),
    budgetSegments: z.array(z.object({
      budgetAmountMicros: z.string().describe(
        "Required. The budget amount the insertion order will spend for the given date_range. The amount is in micros. Must be greater than 0. For example, 500000000 represents 500 standard units of the currency.",
      ).optional(),
      campaignBudgetId: z.string().describe(
        "Optional. The budget_id of the campaign budget that this insertion order budget segment is a part of.",
      ).optional(),
      dateRange: z.object({
        endDate: z.object({
          day: z.unknown().describe(
            "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
          ).optional(),
          month: z.unknown().describe(
            "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
          ).optional(),
          year: z.unknown().describe(
            "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
          ).optional(),
        }).describe(
          "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
        ).optional(),
        startDate: z.object({
          day: z.unknown().describe(
            "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
          ).optional(),
          month: z.unknown().describe(
            "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
          ).optional(),
          year: z.unknown().describe(
            "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
          ).optional(),
        }).describe(
          "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
        ).optional(),
      }).describe("A date range.").optional(),
      description: z.string().describe(
        "Optional. The budget segment description. It can be used to enter Purchase Order information for each budget segment and have that information printed on the invoices. Must be UTF-8 encoded.",
      ).optional(),
    })).describe(
      "Required. The list of budget segments. Use a budget segment to specify a specific budget for a given period of time an insertion order is running.",
    ).optional(),
    budgetUnit: z.enum([
      "BUDGET_UNIT_UNSPECIFIED",
      "BUDGET_UNIT_CURRENCY",
      "BUDGET_UNIT_IMPRESSIONS",
    ]).describe(
      "Required. Immutable. The budget unit specifies whether the budget is currency based or impression based.",
    ).optional(),
  }).describe("Settings that control how insertion order budget is allocated.")
    .optional(),
  campaignId: z.string().describe(
    "Required. Immutable. The unique ID of the campaign that the insertion order belongs to.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the insertion order. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not the insertion order can spend its budget and bid on inventory. * For CreateInsertionOrder method, only `ENTITY_STATUS_DRAFT` is allowed. To activate an insertion order, use UpdateInsertionOrder method and update the status to `ENTITY_STATUS_ACTIVE` after creation. * An insertion order cannot be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * An insertion order cannot be set to `ENTITY_STATUS_ACTIVE` if its parent campaign is not active.",
  ).optional(),
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
  insertionOrderType: z.enum([
    "INSERTION_ORDER_TYPE_UNSPECIFIED",
    "RTB",
    "OVER_THE_TOP",
  ]).describe(
    "Optional. The type of insertion order. If this field is unspecified in creation, the value defaults to `RTB`.",
  ).optional(),
  integrationDetails: z.object({
    details: z.string().describe(
      "Additional details of the entry in string format. Must be UTF-8 encoded with a length of no more than 1000 characters.",
    ).optional(),
    integrationCode: z.string().describe(
      "An external identifier to be associated with the entry. The integration code will show up together with the entry in many places in the system, for example, reporting. Must be UTF-8 encoded with a length of no more than 500 characters.",
    ).optional(),
  }).describe("Integration details of an entry.").optional(),
  kpi: z.object({
    kpiAlgorithmId: z.string().describe(
      "Optional. Custom Bidding Algorithm ID associated with KPI_CUSTOM_IMPRESSION_VALUE_OVER_COST. This field is ignored if the proper KPI is not selected.",
    ).optional(),
    kpiAmountMicros: z.string().describe(
      "The goal amount, in micros of the advertiser's currency. Applicable when kpi_type is one of: * `KPI_TYPE_CPM` * `KPI_TYPE_CPC` * `KPI_TYPE_CPA` * `KPI_TYPE_CPIAVC` * `KPI_TYPE_VCPM` For example: 1500000 represents 1.5 standard units of the currency.",
    ).optional(),
    kpiPercentageMicros: z.string().describe(
      "The decimal representation of the goal percentage in micros. Applicable when kpi_type is one of: * `KPI_TYPE_CTR` * `KPI_TYPE_VIEWABILITY` * `KPI_TYPE_CLICK_CVR` * `KPI_TYPE_IMPRESSION_CVR` * `KPI_TYPE_VTR` * `KPI_TYPE_AUDIO_COMPLETION_RATE` * `KPI_TYPE_VIDEO_COMPLETION_RATE` For example: 70000 represents 7% (decimal 0.07).",
    ).optional(),
    kpiString: z.string().describe(
      "A KPI string, which can be empty. Must be UTF-8 encoded with a length of no more than 100 characters. Applicable when kpi_type is `KPI_TYPE_OTHER`.",
    ).optional(),
    kpiType: z.enum([
      "KPI_TYPE_UNSPECIFIED",
      "KPI_TYPE_CPM",
      "KPI_TYPE_CPC",
      "KPI_TYPE_CPA",
      "KPI_TYPE_CTR",
      "KPI_TYPE_VIEWABILITY",
      "KPI_TYPE_CPIAVC",
      "KPI_TYPE_CPE",
      "KPI_TYPE_CPV",
      "KPI_TYPE_CLICK_CVR",
      "KPI_TYPE_IMPRESSION_CVR",
      "KPI_TYPE_VCPM",
      "KPI_TYPE_VTR",
      "KPI_TYPE_AUDIO_COMPLETION_RATE",
      "KPI_TYPE_VIDEO_COMPLETION_RATE",
      "KPI_TYPE_CPCL",
      "KPI_TYPE_CPCV",
      "KPI_TYPE_TOS10",
      "KPI_TYPE_MAXIMIZE_PACING",
      "KPI_TYPE_CUSTOM_IMPRESSION_VALUE_OVER_COST",
      "KPI_TYPE_OTHER",
    ]).describe("Required. The type of KPI.").optional(),
  }).describe(
    "Settings that control the key performance indicator, or KPI, of an insertion order.",
  ).optional(),
  optimizationObjective: z.enum([
    "OPTIMIZATION_OBJECTIVE_UNSPECIFIED",
    "CONVERSION",
    "CLICK",
    "BRAND_AWARENESS",
    "CUSTOM",
    "NO_OBJECTIVE",
  ]).describe(
    "Optional. Required. The optimization objective of the insertion order.",
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
    "Optional. The partner costs associated with the insertion order. If absent or empty in CreateInsertionOrder method, the newly created insertion order will inherit partner costs from the partner settings.",
  ).optional(),
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
    automationType: z.string(),
    budgetSegments: z.array(z.object({
      budgetAmountMicros: z.string(),
      campaignBudgetId: z.string(),
      dateRange: z.object({
        endDate: z.object({
          day: z.unknown(),
          month: z.unknown(),
          year: z.unknown(),
        }),
        startDate: z.object({
          day: z.unknown(),
          month: z.unknown(),
          year: z.unknown(),
        }),
      }),
      description: z.string(),
    })),
    budgetUnit: z.string(),
  }).optional(),
  campaignId: z.string().optional(),
  displayName: z.string().optional(),
  entityStatus: z.string().optional(),
  frequencyCap: z.object({
    maxImpressions: z.number(),
    maxViews: z.number(),
    timeUnit: z.string(),
    timeUnitCount: z.number(),
    unlimited: z.boolean(),
  }).optional(),
  insertionOrderId: z.string().optional(),
  insertionOrderType: z.string().optional(),
  integrationDetails: z.object({
    details: z.string(),
    integrationCode: z.string(),
  }).optional(),
  kpi: z.object({
    kpiAlgorithmId: z.string(),
    kpiAmountMicros: z.string(),
    kpiPercentageMicros: z.string(),
    kpiString: z.string(),
    kpiType: z.string(),
  }).optional(),
  name: z.string(),
  optimizationObjective: z.string().optional(),
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
  reservationType: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the insertion order belongs to.",
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
    automationType: z.enum([
      "INSERTION_ORDER_AUTOMATION_TYPE_UNSPECIFIED",
      "INSERTION_ORDER_AUTOMATION_TYPE_BUDGET",
      "INSERTION_ORDER_AUTOMATION_TYPE_NONE",
      "INSERTION_ORDER_AUTOMATION_TYPE_BID_BUDGET",
    ]).describe(
      "Optional. The type of automation used to manage bid and budget for the insertion order. If this field is unspecified in creation, the value defaults to `INSERTION_ORDER_AUTOMATION_TYPE_NONE`.",
    ).optional(),
    budgetSegments: z.array(z.object({
      budgetAmountMicros: z.string().describe(
        "Required. The budget amount the insertion order will spend for the given date_range. The amount is in micros. Must be greater than 0. For example, 500000000 represents 500 standard units of the currency.",
      ).optional(),
      campaignBudgetId: z.string().describe(
        "Optional. The budget_id of the campaign budget that this insertion order budget segment is a part of.",
      ).optional(),
      dateRange: z.object({
        endDate: z.object({
          day: z.unknown().describe(
            "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
          ).optional(),
          month: z.unknown().describe(
            "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
          ).optional(),
          year: z.unknown().describe(
            "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
          ).optional(),
        }).describe(
          "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
        ).optional(),
        startDate: z.object({
          day: z.unknown().describe(
            "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
          ).optional(),
          month: z.unknown().describe(
            "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
          ).optional(),
          year: z.unknown().describe(
            "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
          ).optional(),
        }).describe(
          "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
        ).optional(),
      }).describe("A date range.").optional(),
      description: z.string().describe(
        "Optional. The budget segment description. It can be used to enter Purchase Order information for each budget segment and have that information printed on the invoices. Must be UTF-8 encoded.",
      ).optional(),
    })).describe(
      "Required. The list of budget segments. Use a budget segment to specify a specific budget for a given period of time an insertion order is running.",
    ).optional(),
    budgetUnit: z.enum([
      "BUDGET_UNIT_UNSPECIFIED",
      "BUDGET_UNIT_CURRENCY",
      "BUDGET_UNIT_IMPRESSIONS",
    ]).describe(
      "Required. Immutable. The budget unit specifies whether the budget is currency based or impression based.",
    ).optional(),
  }).describe("Settings that control how insertion order budget is allocated.")
    .optional(),
  campaignId: z.string().describe(
    "Required. Immutable. The unique ID of the campaign that the insertion order belongs to.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the insertion order. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not the insertion order can spend its budget and bid on inventory. * For CreateInsertionOrder method, only `ENTITY_STATUS_DRAFT` is allowed. To activate an insertion order, use UpdateInsertionOrder method and update the status to `ENTITY_STATUS_ACTIVE` after creation. * An insertion order cannot be changed back to `ENTITY_STATUS_DRAFT` status from any other status. * An insertion order cannot be set to `ENTITY_STATUS_ACTIVE` if its parent campaign is not active.",
  ).optional(),
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
  insertionOrderType: z.enum([
    "INSERTION_ORDER_TYPE_UNSPECIFIED",
    "RTB",
    "OVER_THE_TOP",
  ]).describe(
    "Optional. The type of insertion order. If this field is unspecified in creation, the value defaults to `RTB`.",
  ).optional(),
  integrationDetails: z.object({
    details: z.string().describe(
      "Additional details of the entry in string format. Must be UTF-8 encoded with a length of no more than 1000 characters.",
    ).optional(),
    integrationCode: z.string().describe(
      "An external identifier to be associated with the entry. The integration code will show up together with the entry in many places in the system, for example, reporting. Must be UTF-8 encoded with a length of no more than 500 characters.",
    ).optional(),
  }).describe("Integration details of an entry.").optional(),
  kpi: z.object({
    kpiAlgorithmId: z.string().describe(
      "Optional. Custom Bidding Algorithm ID associated with KPI_CUSTOM_IMPRESSION_VALUE_OVER_COST. This field is ignored if the proper KPI is not selected.",
    ).optional(),
    kpiAmountMicros: z.string().describe(
      "The goal amount, in micros of the advertiser's currency. Applicable when kpi_type is one of: * `KPI_TYPE_CPM` * `KPI_TYPE_CPC` * `KPI_TYPE_CPA` * `KPI_TYPE_CPIAVC` * `KPI_TYPE_VCPM` For example: 1500000 represents 1.5 standard units of the currency.",
    ).optional(),
    kpiPercentageMicros: z.string().describe(
      "The decimal representation of the goal percentage in micros. Applicable when kpi_type is one of: * `KPI_TYPE_CTR` * `KPI_TYPE_VIEWABILITY` * `KPI_TYPE_CLICK_CVR` * `KPI_TYPE_IMPRESSION_CVR` * `KPI_TYPE_VTR` * `KPI_TYPE_AUDIO_COMPLETION_RATE` * `KPI_TYPE_VIDEO_COMPLETION_RATE` For example: 70000 represents 7% (decimal 0.07).",
    ).optional(),
    kpiString: z.string().describe(
      "A KPI string, which can be empty. Must be UTF-8 encoded with a length of no more than 100 characters. Applicable when kpi_type is `KPI_TYPE_OTHER`.",
    ).optional(),
    kpiType: z.enum([
      "KPI_TYPE_UNSPECIFIED",
      "KPI_TYPE_CPM",
      "KPI_TYPE_CPC",
      "KPI_TYPE_CPA",
      "KPI_TYPE_CTR",
      "KPI_TYPE_VIEWABILITY",
      "KPI_TYPE_CPIAVC",
      "KPI_TYPE_CPE",
      "KPI_TYPE_CPV",
      "KPI_TYPE_CLICK_CVR",
      "KPI_TYPE_IMPRESSION_CVR",
      "KPI_TYPE_VCPM",
      "KPI_TYPE_VTR",
      "KPI_TYPE_AUDIO_COMPLETION_RATE",
      "KPI_TYPE_VIDEO_COMPLETION_RATE",
      "KPI_TYPE_CPCL",
      "KPI_TYPE_CPCV",
      "KPI_TYPE_TOS10",
      "KPI_TYPE_MAXIMIZE_PACING",
      "KPI_TYPE_CUSTOM_IMPRESSION_VALUE_OVER_COST",
      "KPI_TYPE_OTHER",
    ]).describe("Required. The type of KPI.").optional(),
  }).describe(
    "Settings that control the key performance indicator, or KPI, of an insertion order.",
  ).optional(),
  optimizationObjective: z.enum([
    "OPTIMIZATION_OBJECTIVE_UNSPECIFIED",
    "CONVERSION",
    "CLICK",
    "BRAND_AWARENESS",
    "CUSTOM",
    "NO_OBJECTIVE",
  ]).describe(
    "Optional. Required. The optimization objective of the insertion order.",
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
    "Optional. The partner costs associated with the insertion order. If absent or empty in CreateInsertionOrder method, the newly created insertion order will inherit partner costs from the partner settings.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.InsertionOrders. Registered at `@swamp/gcp/displayvideo/advertisers-insertionorders`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-insertionorders",
  version: "2026.05.21.2",
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
      toVersion: "2026.04.04.1",
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
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single insertion order.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a insertionOrders",
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
        if (g["campaignId"] !== undefined) body["campaignId"] = g["campaignId"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["frequencyCap"] !== undefined) {
          body["frequencyCap"] = g["frequencyCap"];
        }
        if (g["insertionOrderType"] !== undefined) {
          body["insertionOrderType"] = g["insertionOrderType"];
        }
        if (g["integrationDetails"] !== undefined) {
          body["integrationDetails"] = g["integrationDetails"];
        }
        if (g["kpi"] !== undefined) body["kpi"] = g["kpi"];
        if (g["optimizationObjective"] !== undefined) {
          body["optimizationObjective"] = g["optimizationObjective"];
        }
        if (g["pacing"] !== undefined) body["pacing"] = g["pacing"];
        if (g["partnerCosts"] !== undefined) {
          body["partnerCosts"] = g["partnerCosts"];
        }
        if (g["name"] !== undefined) {
          params["insertionOrderId"] = String(g["name"]);
        }
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
      description: "Get a insertionOrders",
      arguments: z.object({
        identifier: z.string().describe("The name of the insertionOrders"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["insertionOrderId"] = args.identifier;
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
      description: "Update insertionOrders attributes",
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
        params["insertionOrderId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["bidStrategy"] !== undefined) {
          body["bidStrategy"] = g["bidStrategy"];
        }
        if (g["budget"] !== undefined) body["budget"] = g["budget"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["frequencyCap"] !== undefined) {
          body["frequencyCap"] = g["frequencyCap"];
        }
        if (g["insertionOrderType"] !== undefined) {
          body["insertionOrderType"] = g["insertionOrderType"];
        }
        if (g["integrationDetails"] !== undefined) {
          body["integrationDetails"] = g["integrationDetails"];
        }
        if (g["kpi"] !== undefined) body["kpi"] = g["kpi"];
        if (g["optimizationObjective"] !== undefined) {
          body["optimizationObjective"] = g["optimizationObjective"];
        }
        if (g["pacing"] !== undefined) body["pacing"] = g["pacing"];
        if (g["partnerCosts"] !== undefined) {
          body["partnerCosts"] = g["partnerCosts"];
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
      description: "Delete the insertionOrders",
      arguments: z.object({
        identifier: z.string().describe("The name of the insertionOrders"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["insertionOrderId"] = args.identifier;
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
      description: "Sync insertionOrders state from GCP",
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
          params["insertionOrderId"] = identifier;
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
  },
};
