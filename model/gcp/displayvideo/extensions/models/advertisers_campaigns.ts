// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-campaigns
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.Campaigns.
 *
 * A single campaign.
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
  "id": "displayvideo.advertisers.campaigns.get",
  "path": "v4/advertisers/{+advertiserId}/campaigns/{+campaignId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "campaignId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "campaignId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.advertisers.campaigns.create",
  "path": "v4/advertisers/{+advertiserId}/campaigns",
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
  "id": "displayvideo.advertisers.campaigns.patch",
  "path": "v4/advertisers/{+advertiserId}/campaigns/{+campaignId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "advertiserId",
    "campaignId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "campaignId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.campaigns.delete",
  "path": "v4/advertisers/{+advertiserId}/campaigns/{+campaignId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
    "campaignId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "campaignId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the campaign belongs to.",
  ).optional(),
  campaignBudgets: z.array(z.object({
    budgetAmountMicros: z.string().describe(
      "Required. The total amount the linked insertion order segments can budget. The amount is in micros. Must be greater than 0. For example, 500000000 represents 500 standard units of the currency.",
    ).optional(),
    budgetId: z.string().describe(
      "The unique ID of the campaign budget. Assigned by the system. Do not set for new budgets. Must be included when updating or adding budgets to campaign_budgets. Otherwise, a new ID will be generated and assigned.",
    ).optional(),
    budgetUnit: z.enum([
      "BUDGET_UNIT_UNSPECIFIED",
      "BUDGET_UNIT_CURRENCY",
      "BUDGET_UNIT_IMPRESSIONS",
    ]).describe(
      "Required. Immutable. Specifies whether the budget is measured in currency or impressions.",
    ).optional(),
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
    displayName: z.string().describe(
      "Required. The display name of the budget. Must be UTF-8 encoded with a maximum size of 240 bytes.",
    ).optional(),
    externalBudgetId: z.string().describe(
      'Immutable. The ID identifying this budget to the external source. If this field is set and the invoice detail level of the corresponding billing profile is set to "Budget level PO", all impressions served against this budget will include this ID on the invoice. Must be unique under the campaign.',
    ).optional(),
    externalBudgetSource: z.enum([
      "EXTERNAL_BUDGET_SOURCE_UNSPECIFIED",
      "EXTERNAL_BUDGET_SOURCE_NONE",
      "EXTERNAL_BUDGET_SOURCE_MEDIA_OCEAN",
    ]).describe("Required. The external source of the budget.").optional(),
    invoiceGroupingId: z.string().describe(
      'Immutable. The ID used to group budgets to be included the same invoice. If this field is set and the invoice level of the corresponding billing profile is set to "Budget invoice grouping ID", all external_budget_id sharing the same invoice_grouping_id will be grouped in the same invoice.',
    ).optional(),
    prismaConfig: z.object({
      prismaCpeCode: z.object({
        prismaClientCode: z.string().describe("The Prisma client code.")
          .optional(),
        prismaEstimateCode: z.string().describe("The Prisma estimate code.")
          .optional(),
        prismaProductCode: z.string().describe("The Prisma product code.")
          .optional(),
      }).describe(
        "Google Payments Center supports searching and filtering on the component fields of this code.",
      ).optional(),
      prismaType: z.enum([
        "PRISMA_TYPE_UNSPECIFIED",
        "PRISMA_TYPE_DISPLAY",
        "PRISMA_TYPE_SEARCH",
        "PRISMA_TYPE_VIDEO",
        "PRISMA_TYPE_AUDIO",
        "PRISMA_TYPE_SOCIAL",
        "PRISMA_TYPE_FEE",
      ]).describe("Required. The Prisma type.").optional(),
      supplier: z.string().describe(
        "Required. The entity allocated this budget (DSP, site, etc.).",
      ).optional(),
    }).describe("Settings specific to the Mediaocean Prisma tool.").optional(),
  })).describe(
    "The list of budgets available to this campaign. If this field is not set, the campaign uses an unlimited budget.",
  ).optional(),
  campaignFlight: z.object({
    plannedDates: z.object({
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
    plannedSpendAmountMicros: z.string().describe(
      "The amount the campaign is expected to spend for its given planned_dates. This will not limit serving, but will be used for tracking spend in the DV360 UI. The amount is in micros. Must be greater than or equal to 0. For example, 500000000 represents 500 standard units of the currency.",
    ).optional(),
  }).describe(
    "Settings that track the planned spend and duration of a campaign.",
  ).optional(),
  campaignGoal: z.object({
    campaignGoalType: z.enum([
      "CAMPAIGN_GOAL_TYPE_UNSPECIFIED",
      "CAMPAIGN_GOAL_TYPE_APP_INSTALL",
      "CAMPAIGN_GOAL_TYPE_BRAND_AWARENESS",
      "CAMPAIGN_GOAL_TYPE_OFFLINE_ACTION",
      "CAMPAIGN_GOAL_TYPE_ONLINE_ACTION",
    ]).describe("Required. The type of the campaign goal.").optional(),
    performanceGoal: z.object({
      performanceGoalAmountMicros: z.string().describe(
        "The goal amount, in micros of the advertiser's currency. Applicable when performance_goal_type is one of: * `PERFORMANCE_GOAL_TYPE_CPM` * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_VCPM` For example 1500000 represents 1.5 standard units of the currency.",
      ).optional(),
      performanceGoalPercentageMicros: z.string().describe(
        "The decimal representation of the goal percentage in micros. Applicable when performance_goal_type is one of: * `PERFORMANCE_GOAL_TYPE_CTR` * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_CLICK_CVR` * `PERFORMANCE_GOAL_TYPE_IMPRESSION_CVR` * `PERFORMANCE_GOAL_TYPE_VTR` * `PERFORMANCE_GOAL_TYPE_AUDIO_COMPLETION_RATE` * `PERFORMANCE_GOAL_TYPE_VIDEO_COMPLETION_RATE` For example, 70000 represents 7% (decimal 0.07).",
      ).optional(),
      performanceGoalString: z.string().describe(
        "A key performance indicator (KPI) string, which can be empty. Must be UTF-8 encoded with a length of no more than 100 characters. Applicable when performance_goal_type is set to `PERFORMANCE_GOAL_TYPE_OTHER`.",
      ).optional(),
      performanceGoalType: z.enum([
        "PERFORMANCE_GOAL_TYPE_UNSPECIFIED",
        "PERFORMANCE_GOAL_TYPE_CPM",
        "PERFORMANCE_GOAL_TYPE_CPC",
        "PERFORMANCE_GOAL_TYPE_CPA",
        "PERFORMANCE_GOAL_TYPE_CTR",
        "PERFORMANCE_GOAL_TYPE_VIEWABILITY",
        "PERFORMANCE_GOAL_TYPE_CPIAVC",
        "PERFORMANCE_GOAL_TYPE_CPE",
        "PERFORMANCE_GOAL_TYPE_CPV",
        "PERFORMANCE_GOAL_TYPE_CLICK_CVR",
        "PERFORMANCE_GOAL_TYPE_IMPRESSION_CVR",
        "PERFORMANCE_GOAL_TYPE_VCPM",
        "PERFORMANCE_GOAL_TYPE_VTR",
        "PERFORMANCE_GOAL_TYPE_AUDIO_COMPLETION_RATE",
        "PERFORMANCE_GOAL_TYPE_VIDEO_COMPLETION_RATE",
        "PERFORMANCE_GOAL_TYPE_OTHER",
      ]).describe("Required. The type of the performance goal.").optional(),
    }).describe("Settings that control the performance goal of a campaign.")
      .optional(),
  }).describe("Settings that control the goal of a campaign.").optional(),
  displayName: z.string().describe(
    "Required. The display name of the campaign. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not the insertion orders under this campaign can spend their budgets and bid on inventory. * Accepted values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. * For CreateCampaign method, `ENTITY_STATUS_ARCHIVED` is not allowed.",
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
});

const StateSchema = z.object({
  advertiserId: z.string().optional(),
  campaignBudgets: z.array(z.object({
    budgetAmountMicros: z.string(),
    budgetId: z.string(),
    budgetUnit: z.string(),
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
    displayName: z.string(),
    externalBudgetId: z.string(),
    externalBudgetSource: z.string(),
    invoiceGroupingId: z.string(),
    prismaConfig: z.object({
      prismaCpeCode: z.object({
        prismaClientCode: z.string(),
        prismaEstimateCode: z.string(),
        prismaProductCode: z.string(),
      }),
      prismaType: z.string(),
      supplier: z.string(),
    }),
  })).optional(),
  campaignFlight: z.object({
    plannedDates: z.object({
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
    plannedSpendAmountMicros: z.string(),
  }).optional(),
  campaignGoal: z.object({
    campaignGoalType: z.string(),
    performanceGoal: z.object({
      performanceGoalAmountMicros: z.string(),
      performanceGoalPercentageMicros: z.string(),
      performanceGoalString: z.string(),
      performanceGoalType: z.string(),
    }),
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
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the campaign belongs to.",
  ).optional(),
  campaignBudgets: z.array(z.object({
    budgetAmountMicros: z.string().describe(
      "Required. The total amount the linked insertion order segments can budget. The amount is in micros. Must be greater than 0. For example, 500000000 represents 500 standard units of the currency.",
    ).optional(),
    budgetId: z.string().describe(
      "The unique ID of the campaign budget. Assigned by the system. Do not set for new budgets. Must be included when updating or adding budgets to campaign_budgets. Otherwise, a new ID will be generated and assigned.",
    ).optional(),
    budgetUnit: z.enum([
      "BUDGET_UNIT_UNSPECIFIED",
      "BUDGET_UNIT_CURRENCY",
      "BUDGET_UNIT_IMPRESSIONS",
    ]).describe(
      "Required. Immutable. Specifies whether the budget is measured in currency or impressions.",
    ).optional(),
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
    displayName: z.string().describe(
      "Required. The display name of the budget. Must be UTF-8 encoded with a maximum size of 240 bytes.",
    ).optional(),
    externalBudgetId: z.string().describe(
      'Immutable. The ID identifying this budget to the external source. If this field is set and the invoice detail level of the corresponding billing profile is set to "Budget level PO", all impressions served against this budget will include this ID on the invoice. Must be unique under the campaign.',
    ).optional(),
    externalBudgetSource: z.enum([
      "EXTERNAL_BUDGET_SOURCE_UNSPECIFIED",
      "EXTERNAL_BUDGET_SOURCE_NONE",
      "EXTERNAL_BUDGET_SOURCE_MEDIA_OCEAN",
    ]).describe("Required. The external source of the budget.").optional(),
    invoiceGroupingId: z.string().describe(
      'Immutable. The ID used to group budgets to be included the same invoice. If this field is set and the invoice level of the corresponding billing profile is set to "Budget invoice grouping ID", all external_budget_id sharing the same invoice_grouping_id will be grouped in the same invoice.',
    ).optional(),
    prismaConfig: z.object({
      prismaCpeCode: z.object({
        prismaClientCode: z.string().describe("The Prisma client code.")
          .optional(),
        prismaEstimateCode: z.string().describe("The Prisma estimate code.")
          .optional(),
        prismaProductCode: z.string().describe("The Prisma product code.")
          .optional(),
      }).describe(
        "Google Payments Center supports searching and filtering on the component fields of this code.",
      ).optional(),
      prismaType: z.enum([
        "PRISMA_TYPE_UNSPECIFIED",
        "PRISMA_TYPE_DISPLAY",
        "PRISMA_TYPE_SEARCH",
        "PRISMA_TYPE_VIDEO",
        "PRISMA_TYPE_AUDIO",
        "PRISMA_TYPE_SOCIAL",
        "PRISMA_TYPE_FEE",
      ]).describe("Required. The Prisma type.").optional(),
      supplier: z.string().describe(
        "Required. The entity allocated this budget (DSP, site, etc.).",
      ).optional(),
    }).describe("Settings specific to the Mediaocean Prisma tool.").optional(),
  })).describe(
    "The list of budgets available to this campaign. If this field is not set, the campaign uses an unlimited budget.",
  ).optional(),
  campaignFlight: z.object({
    plannedDates: z.object({
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
    plannedSpendAmountMicros: z.string().describe(
      "The amount the campaign is expected to spend for its given planned_dates. This will not limit serving, but will be used for tracking spend in the DV360 UI. The amount is in micros. Must be greater than or equal to 0. For example, 500000000 represents 500 standard units of the currency.",
    ).optional(),
  }).describe(
    "Settings that track the planned spend and duration of a campaign.",
  ).optional(),
  campaignGoal: z.object({
    campaignGoalType: z.enum([
      "CAMPAIGN_GOAL_TYPE_UNSPECIFIED",
      "CAMPAIGN_GOAL_TYPE_APP_INSTALL",
      "CAMPAIGN_GOAL_TYPE_BRAND_AWARENESS",
      "CAMPAIGN_GOAL_TYPE_OFFLINE_ACTION",
      "CAMPAIGN_GOAL_TYPE_ONLINE_ACTION",
    ]).describe("Required. The type of the campaign goal.").optional(),
    performanceGoal: z.object({
      performanceGoalAmountMicros: z.string().describe(
        "The goal amount, in micros of the advertiser's currency. Applicable when performance_goal_type is one of: * `PERFORMANCE_GOAL_TYPE_CPM` * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_VCPM` For example 1500000 represents 1.5 standard units of the currency.",
      ).optional(),
      performanceGoalPercentageMicros: z.string().describe(
        "The decimal representation of the goal percentage in micros. Applicable when performance_goal_type is one of: * `PERFORMANCE_GOAL_TYPE_CTR` * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_CLICK_CVR` * `PERFORMANCE_GOAL_TYPE_IMPRESSION_CVR` * `PERFORMANCE_GOAL_TYPE_VTR` * `PERFORMANCE_GOAL_TYPE_AUDIO_COMPLETION_RATE` * `PERFORMANCE_GOAL_TYPE_VIDEO_COMPLETION_RATE` For example, 70000 represents 7% (decimal 0.07).",
      ).optional(),
      performanceGoalString: z.string().describe(
        "A key performance indicator (KPI) string, which can be empty. Must be UTF-8 encoded with a length of no more than 100 characters. Applicable when performance_goal_type is set to `PERFORMANCE_GOAL_TYPE_OTHER`.",
      ).optional(),
      performanceGoalType: z.enum([
        "PERFORMANCE_GOAL_TYPE_UNSPECIFIED",
        "PERFORMANCE_GOAL_TYPE_CPM",
        "PERFORMANCE_GOAL_TYPE_CPC",
        "PERFORMANCE_GOAL_TYPE_CPA",
        "PERFORMANCE_GOAL_TYPE_CTR",
        "PERFORMANCE_GOAL_TYPE_VIEWABILITY",
        "PERFORMANCE_GOAL_TYPE_CPIAVC",
        "PERFORMANCE_GOAL_TYPE_CPE",
        "PERFORMANCE_GOAL_TYPE_CPV",
        "PERFORMANCE_GOAL_TYPE_CLICK_CVR",
        "PERFORMANCE_GOAL_TYPE_IMPRESSION_CVR",
        "PERFORMANCE_GOAL_TYPE_VCPM",
        "PERFORMANCE_GOAL_TYPE_VTR",
        "PERFORMANCE_GOAL_TYPE_AUDIO_COMPLETION_RATE",
        "PERFORMANCE_GOAL_TYPE_VIDEO_COMPLETION_RATE",
        "PERFORMANCE_GOAL_TYPE_OTHER",
      ]).describe("Required. The type of the performance goal.").optional(),
    }).describe("Settings that control the performance goal of a campaign.")
      .optional(),
  }).describe("Settings that control the goal of a campaign.").optional(),
  displayName: z.string().describe(
    "Required. The display name of the campaign. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not the insertion orders under this campaign can spend their budgets and bid on inventory. * Accepted values are `ENTITY_STATUS_ACTIVE`, `ENTITY_STATUS_ARCHIVED`, and `ENTITY_STATUS_PAUSED`. * For CreateCampaign method, `ENTITY_STATUS_ARCHIVED` is not allowed.",
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
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.Campaigns. Registered at `@swamp/gcp/displayvideo/advertisers-campaigns`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-campaigns",
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
      description: "A single campaign.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a campaigns",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["campaignBudgets"] !== undefined) {
          body["campaignBudgets"] = g["campaignBudgets"];
        }
        if (g["campaignFlight"] !== undefined) {
          body["campaignFlight"] = g["campaignFlight"];
        }
        if (g["campaignGoal"] !== undefined) {
          body["campaignGoal"] = g["campaignGoal"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["frequencyCap"] !== undefined) {
          body["frequencyCap"] = g["frequencyCap"];
        }
        if (g["name"] !== undefined) params["campaignId"] = String(g["name"]);
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
      description: "Get a campaigns",
      arguments: z.object({
        identifier: z.string().describe("The name of the campaigns"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["campaignId"] = args.identifier;
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
      description: "Update campaigns attributes",
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
        params["campaignId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["campaignBudgets"] !== undefined) {
          body["campaignBudgets"] = g["campaignBudgets"];
        }
        if (g["campaignFlight"] !== undefined) {
          body["campaignFlight"] = g["campaignFlight"];
        }
        if (g["campaignGoal"] !== undefined) {
          body["campaignGoal"] = g["campaignGoal"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["frequencyCap"] !== undefined) {
          body["frequencyCap"] = g["frequencyCap"];
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
      description: "Delete the campaigns",
      arguments: z.object({
        identifier: z.string().describe("The name of the campaigns"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["campaignId"] = args.identifier;
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
      description: "Sync campaigns state from GCP",
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
          params["campaignId"] = identifier;
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
