// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.campaigns.list",
  "path": "v4/advertisers/{+advertiserId}/campaigns",
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

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/display-video",
  "https://www.googleapis.com/auth/display-video-mediaplanning",
  "https://www.googleapis.com/auth/display-video-user-management",
  "https://www.googleapis.com/auth/doubleclickbidmanager",
];

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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
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
        "The upper bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`.",
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
        "The lower bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`.",
      ).optional(),
    }).describe(
      "Required. The date range for the campaign budget. Linked budget segments may have a different date range. They are resolved relative to the parent advertiser's time zone. Both `start_date` and `end_date` must be before the year 2037.",
    ).optional(),
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
        "Required. Relevant client, product, and estimate codes from the Mediaocean Prisma tool.",
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
    }).describe(
      "Additional metadata for use by the Mediaocean Prisma tool. Required for Mediaocean budgets. Only applicable to prisma_enabled advertisers.",
    ).optional(),
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
        "The upper bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`.",
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
        "The lower bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`.",
      ).optional(),
    }).describe(
      "Required. The dates that the campaign is expected to run. They are resolved relative to the parent advertiser's time zone. * The dates specified here will not affect serving. They are used to generate alerts and warnings. For example, if the flight date of any child insertion order is outside the range of these dates, the user interface will show a warning. * `start_date` is required and must be the current date or later. * `end_date` is optional. If specified, it must be the `start_date` or later. * Any specified date must be before the year 2037.",
    ).optional(),
    plannedSpendAmountMicros: z.string().describe(
      "The amount the campaign is expected to spend for its given planned_dates. This will not limit serving, but will be used for tracking spend in the DV360 UI. The amount is in micros. Must be greater than or equal to 0. For example, 500000000 represents 500 standard units of the currency.",
    ).optional(),
  }).describe("Required. The planned spend and duration of the campaign.")
    .optional(),
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
    }).describe(
      "Required. The performance goal of the campaign. Acceptable values for performance_goal_type are: * `PERFORMANCE_GOAL_TYPE_CPM` * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_CTR` * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_OTHER`",
    ).optional(),
  }).describe("Required. The goal of the campaign.").optional(),
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
    "Required. The frequency cap setting of the campaign. *Warning*: On **February 28, 2025**, frequency cap time periods greater than 30 days will no longer be accepted. [Read more about this announced change](/display-video/api/deprecations#features.lifetime_frequency_cap)",
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
        "The upper bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`.",
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
        "The lower bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`.",
      ).optional(),
    }).describe(
      "Required. The date range for the campaign budget. Linked budget segments may have a different date range. They are resolved relative to the parent advertiser's time zone. Both `start_date` and `end_date` must be before the year 2037.",
    ).optional(),
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
        "Required. Relevant client, product, and estimate codes from the Mediaocean Prisma tool.",
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
    }).describe(
      "Additional metadata for use by the Mediaocean Prisma tool. Required for Mediaocean budgets. Only applicable to prisma_enabled advertisers.",
    ).optional(),
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
        "The upper bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`.",
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
        "The lower bound of the date range, inclusive. Must specify a positive value for `year`, `month`, and `day`.",
      ).optional(),
    }).describe(
      "Required. The dates that the campaign is expected to run. They are resolved relative to the parent advertiser's time zone. * The dates specified here will not affect serving. They are used to generate alerts and warnings. For example, if the flight date of any child insertion order is outside the range of these dates, the user interface will show a warning. * `start_date` is required and must be the current date or later. * `end_date` is optional. If specified, it must be the `start_date` or later. * Any specified date must be before the year 2037.",
    ).optional(),
    plannedSpendAmountMicros: z.string().describe(
      "The amount the campaign is expected to spend for its given planned_dates. This will not limit serving, but will be used for tracking spend in the DV360 UI. The amount is in micros. Must be greater than or equal to 0. For example, 500000000 represents 500 standard units of the currency.",
    ).optional(),
  }).describe("Required. The planned spend and duration of the campaign.")
    .optional(),
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
    }).describe(
      "Required. The performance goal of the campaign. Acceptable values for performance_goal_type are: * `PERFORMANCE_GOAL_TYPE_CPM` * `PERFORMANCE_GOAL_TYPE_CPC` * `PERFORMANCE_GOAL_TYPE_CPA` * `PERFORMANCE_GOAL_TYPE_CPIAVC` * `PERFORMANCE_GOAL_TYPE_CTR` * `PERFORMANCE_GOAL_TYPE_VIEWABILITY` * `PERFORMANCE_GOAL_TYPE_OTHER`",
    ).optional(),
  }).describe("Required. The goal of the campaign.").optional(),
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
    "Required. The frequency cap setting of the campaign. *Warning*: On **February 28, 2025**, frequency cap time periods greater than 30 days will no longer be accepted. [Read more about this announced change](/display-video/api/deprecations#features.lifetime_frequency_cap)",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.Campaigns. Registered at `@swamp/gcp/displayvideo/advertisers-campaigns`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-campaigns",
  version: "2026.10.07.1",
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
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.07.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          credentials,
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
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["campaignId"] = args.identifier;
        const result = await readResource(
          baseUrl,
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
    update: {
      description: "Update campaigns attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific campaigns by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        } else if (existing["advertiserId"]) {
          params["advertiserId"] = String(existing["advertiserId"]);
        }
        const resourceId = existing["campaignId"]?.toString() ??
          g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["campaignId"] = resourceId;
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
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["campaignId"] = args.identifier;
        const { existed } = await deleteResource(
          baseUrl,
          DELETE_CONFIG,
          params,
          credentials,
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific campaigns by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          if (g["advertiserId"] !== undefined) {
            params["advertiserId"] = String(g["advertiserId"]);
          } else if (existing["advertiserId"]) {
            params["advertiserId"] = String(existing["advertiserId"]);
          }
          const identifier = existing["campaignId"]?.toString() ??
            g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["campaignId"] = identifier;
          const result = await readResource(
            baseUrl,
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
      description: "List campaigns resources",
      arguments: z.object({
        filter: z.string().describe(
          'Allows filtering by campaign fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. Supported fields: * `campaignId` * `displayName` * `entityStatus` * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Examples: * All `ENTITY_STATUS_ACTIVE` or `ENTITY_STATUS_PAUSED` campaigns under an advertiser: `(entityStatus="ENTITY_STATUS_ACTIVE" OR entityStatus="ENTITY_STATUS_PAUSED")` * All campaigns with an update time less than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime<="2020-11-04T18:54:47Z"` * All campaigns with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information.',
        ).optional(),
        orderBy: z.string().describe(
          'Field by which to sort the list. Acceptable values are: * `displayName` (default) * `entityStatus` * `updateTime` The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `displayName desc`.',
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Must be between `1` and `200`. If unspecified will default to `100`.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
          LIST_CONFIG,
          params,
          "campaigns",
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
