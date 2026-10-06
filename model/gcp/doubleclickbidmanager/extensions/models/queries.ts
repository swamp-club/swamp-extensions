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

// Auto-generated extension model for @swamp/gcp/doubleclickbidmanager/queries
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud DoubleClick Bid Manager Queries.
 *
 * A single query used to generate a report.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://doubleclickbidmanager.googleapis.com/v2/";

const GET_CONFIG = {
  "id": "doubleclickbidmanager.queries.get",
  "path": "queries/{queryId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "queryId",
  ],
  "parameters": {
    "queryId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "doubleclickbidmanager.queries.create",
  "path": "queries",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const DELETE_CONFIG = {
  "id": "doubleclickbidmanager.queries.delete",
  "path": "queries/{queryId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "queryId",
  ],
  "parameters": {
    "queryId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "doubleclickbidmanager.queries.list",
  "path": "queries",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
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
  metadata: z.object({
    dataRange: z.object({
      customEndDate: z.object({
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
        "If `CUSTOM_DATES` is assigned to range, this field specifies the end date for the date range that is reported on. This field is required if using `CUSTOM_DATES` range and will be ignored otherwise.",
      ).optional(),
      customStartDate: z.object({
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
        "If `CUSTOM_DATES` is assigned to range, this field specifies the starting date for the date range that is reported on. This field is required if using `CUSTOM_DATES` range and will be ignored otherwise.",
      ).optional(),
      range: z.enum([
        "RANGE_UNSPECIFIED",
        "CUSTOM_DATES",
        "CURRENT_DAY",
        "PREVIOUS_DAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "ALL_TIME",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The preset date range to be reported on. If `CUSTOM_DATES` is assigned to this field, fields custom_start_date and custom_end_date must be set to specify the custom date range.",
      ).optional(),
    }).describe(
      "The date range the report generated by the query will report on. This date range will be defined by the time zone as used by the advertiser.",
    ).optional(),
    format: z.enum(["FORMAT_UNSPECIFIED", "CSV", "XLSX"]).describe(
      "The format of the report generated by the query.",
    ).optional(),
    sendNotification: z.boolean().describe(
      "Whether an email notification is sent to the query creator when a report generated by the query is ready. This value is `false` by default.",
    ).optional(),
    shareEmailAddress: z.array(z.string()).describe(
      "List of additional email addresses with which to share the query. If send_notification is `true`, these email addresses will receive a notification when a report generated by the query is ready. If these email addresses are connected to Display & Video 360 users, the query will be available to them in the Display & Video 360 interface.",
    ).optional(),
    title: z.string().describe(
      "The display name of the query. This value will be used in the file name of reports generated by the query.",
    ).optional(),
  }).describe("The metadata of the query.").optional(),
  params: z.object({
    filters: z.array(z.object({
      type: z.string().describe(
        "The type of value to filter by. Defined by a [Filter](/bid-manager/reference/rest/v2/filters-metrics#filters) value.",
      ).optional(),
      value: z.string().describe(
        "The identifying value to filter by, such as a relevant resource ID.",
      ).optional(),
    })).describe("Filters to limit the scope of reported data.").optional(),
    groupBys: z.array(z.string()).describe(
      "Dimensions by which to segment and group the data. Defined by [Filter](/bid-manager/reference/rest/v2/filters-metrics#filters) values.",
    ).optional(),
    metrics: z.array(z.string()).describe(
      "Metrics to define the data populating the report. Defined by [Metric](/bid-manager/reference/rest/v2/filters-metrics#metrics) values.",
    ).optional(),
    options: z.object({
      includeOnlyTargetedUserLists: z.boolean().describe(
        "Whether to include data for audience lists specifically targeted by filtered line items or insertion orders. Requires the use of `FILTER_INSERTION_ORDER` or `FILTER_LINE_ITEM` filters.",
      ).optional(),
    }).describe("Additional report parameter options.").optional(),
    type: z.enum([
      "REPORT_TYPE_UNSPECIFIED",
      "STANDARD",
      "INVENTORY_AVAILABILITY",
      "AUDIENCE_COMPOSITION",
      "FLOODLIGHT",
      "YOUTUBE",
      "GRP",
      "YOUTUBE_PROGRAMMATIC_GUARANTEED",
      "REACH",
      "UNIQUE_REACH_AUDIENCE",
      "FULL_PATH",
      "PATH_ATTRIBUTION",
    ]).describe(
      "The type of the report. The type of the report determines the dimesions, filters, and metrics that can be used.",
    ).optional(),
  }).describe("The parameters of the report generated by the query.")
    .optional(),
  schedule: z.object({
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
      "The date on which to end the scheduled runs. This field is required if frequency is not set to `ONE_TIME`. Otherwise, it will be ignored.",
    ).optional(),
    frequency: z.enum([
      "FREQUENCY_UNSPECIFIED",
      "ONE_TIME",
      "DAILY",
      "WEEKLY",
      "SEMI_MONTHLY",
      "MONTHLY",
      "QUARTERLY",
      "YEARLY",
    ]).describe(
      "How frequently to run the query. If set to `ONE_TIME`, the query will only be run when queries.run is called.",
    ).optional(),
    nextRunTimezoneCode: z.string().describe(
      "The canonical code for the timezone the query schedule is based on. Scheduled runs are usually conducted in the morning of a given day. Defaults to `America/New_York`.",
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
      "The date on which to begin the scheduled runs. This field is required if frequency is not set to `ONE_TIME`. Otherwise, it will be ignored.",
    ).optional(),
  }).describe(
    "When and how often the query is scheduled to run. If the frequency field is set to `ONE_TIME`, the query will only run when queries.run is called.",
  ).optional(),
});

const StateSchema = z.object({
  metadata: z.object({
    dataRange: z.object({
      customEndDate: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      customStartDate: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      range: z.string(),
    }),
    format: z.string(),
    sendNotification: z.boolean(),
    shareEmailAddress: z.array(z.string()),
    title: z.string(),
  }).optional(),
  params: z.object({
    filters: z.array(z.object({
      type: z.string(),
      value: z.string(),
    })),
    groupBys: z.array(z.string()),
    metrics: z.array(z.string()),
    options: z.object({
      includeOnlyTargetedUserLists: z.boolean(),
    }),
    type: z.string(),
  }).optional(),
  queryId: z.string().optional(),
  schedule: z.object({
    endDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    frequency: z.string(),
    nextRunTimezoneCode: z.string(),
    startDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
  }).optional(),
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
  metadata: z.object({
    dataRange: z.object({
      customEndDate: z.object({
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
        "If `CUSTOM_DATES` is assigned to range, this field specifies the end date for the date range that is reported on. This field is required if using `CUSTOM_DATES` range and will be ignored otherwise.",
      ).optional(),
      customStartDate: z.object({
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
        "If `CUSTOM_DATES` is assigned to range, this field specifies the starting date for the date range that is reported on. This field is required if using `CUSTOM_DATES` range and will be ignored otherwise.",
      ).optional(),
      range: z.enum([
        "RANGE_UNSPECIFIED",
        "CUSTOM_DATES",
        "CURRENT_DAY",
        "PREVIOUS_DAY",
        "WEEK_TO_DATE",
        "MONTH_TO_DATE",
        "QUARTER_TO_DATE",
        "YEAR_TO_DATE",
        "PREVIOUS_WEEK",
        "PREVIOUS_MONTH",
        "PREVIOUS_QUARTER",
        "PREVIOUS_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_90_DAYS",
        "LAST_365_DAYS",
        "ALL_TIME",
        "LAST_14_DAYS",
        "LAST_60_DAYS",
      ]).describe(
        "The preset date range to be reported on. If `CUSTOM_DATES` is assigned to this field, fields custom_start_date and custom_end_date must be set to specify the custom date range.",
      ).optional(),
    }).describe(
      "The date range the report generated by the query will report on. This date range will be defined by the time zone as used by the advertiser.",
    ).optional(),
    format: z.enum(["FORMAT_UNSPECIFIED", "CSV", "XLSX"]).describe(
      "The format of the report generated by the query.",
    ).optional(),
    sendNotification: z.boolean().describe(
      "Whether an email notification is sent to the query creator when a report generated by the query is ready. This value is `false` by default.",
    ).optional(),
    shareEmailAddress: z.array(z.string()).describe(
      "List of additional email addresses with which to share the query. If send_notification is `true`, these email addresses will receive a notification when a report generated by the query is ready. If these email addresses are connected to Display & Video 360 users, the query will be available to them in the Display & Video 360 interface.",
    ).optional(),
    title: z.string().describe(
      "The display name of the query. This value will be used in the file name of reports generated by the query.",
    ).optional(),
  }).describe("The metadata of the query.").optional(),
  params: z.object({
    filters: z.array(z.object({
      type: z.string().describe(
        "The type of value to filter by. Defined by a [Filter](/bid-manager/reference/rest/v2/filters-metrics#filters) value.",
      ).optional(),
      value: z.string().describe(
        "The identifying value to filter by, such as a relevant resource ID.",
      ).optional(),
    })).describe("Filters to limit the scope of reported data.").optional(),
    groupBys: z.array(z.string()).describe(
      "Dimensions by which to segment and group the data. Defined by [Filter](/bid-manager/reference/rest/v2/filters-metrics#filters) values.",
    ).optional(),
    metrics: z.array(z.string()).describe(
      "Metrics to define the data populating the report. Defined by [Metric](/bid-manager/reference/rest/v2/filters-metrics#metrics) values.",
    ).optional(),
    options: z.object({
      includeOnlyTargetedUserLists: z.boolean().describe(
        "Whether to include data for audience lists specifically targeted by filtered line items or insertion orders. Requires the use of `FILTER_INSERTION_ORDER` or `FILTER_LINE_ITEM` filters.",
      ).optional(),
    }).describe("Additional report parameter options.").optional(),
    type: z.enum([
      "REPORT_TYPE_UNSPECIFIED",
      "STANDARD",
      "INVENTORY_AVAILABILITY",
      "AUDIENCE_COMPOSITION",
      "FLOODLIGHT",
      "YOUTUBE",
      "GRP",
      "YOUTUBE_PROGRAMMATIC_GUARANTEED",
      "REACH",
      "UNIQUE_REACH_AUDIENCE",
      "FULL_PATH",
      "PATH_ATTRIBUTION",
    ]).describe(
      "The type of the report. The type of the report determines the dimesions, filters, and metrics that can be used.",
    ).optional(),
  }).describe("The parameters of the report generated by the query.")
    .optional(),
  schedule: z.object({
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
      "The date on which to end the scheduled runs. This field is required if frequency is not set to `ONE_TIME`. Otherwise, it will be ignored.",
    ).optional(),
    frequency: z.enum([
      "FREQUENCY_UNSPECIFIED",
      "ONE_TIME",
      "DAILY",
      "WEEKLY",
      "SEMI_MONTHLY",
      "MONTHLY",
      "QUARTERLY",
      "YEARLY",
    ]).describe(
      "How frequently to run the query. If set to `ONE_TIME`, the query will only be run when queries.run is called.",
    ).optional(),
    nextRunTimezoneCode: z.string().describe(
      "The canonical code for the timezone the query schedule is based on. Scheduled runs are usually conducted in the morning of a given day. Defaults to `America/New_York`.",
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
      "The date on which to begin the scheduled runs. This field is required if frequency is not set to `ONE_TIME`. Otherwise, it will be ignored.",
    ).optional(),
  }).describe(
    "When and how often the query is scheduled to run. If the frequency field is set to `ONE_TIME`, the query will only run when queries.run is called.",
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

/** Swamp extension model for Google Cloud DoubleClick Bid Manager Queries. Registered at `@swamp/gcp/doubleclickbidmanager/queries`. */
export const model = {
  type: "@swamp/gcp/doubleclickbidmanager/queries",
  version: "2026.10.06.1",
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
      toVersion: "2026.05.25.2",
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
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single query used to generate a report.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a queries",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["name"] !== undefined) params["queryId"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
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
      description: "Get a queries",
      arguments: z.object({
        identifier: z.string().describe("The name of the queries"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["queryId"] = args.identifier;
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
    delete: {
      description: "Delete the queries",
      arguments: z.object({
        identifier: z.string().describe("The name of the queries"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["queryId"] = args.identifier;
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
      description: "Sync queries state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific queries by name (e.g. one discovered by list)",
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
          const identifier = existing["queryId"]?.toString() ??
            g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["queryId"] = identifier;
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
      description: "List queries resources",
      arguments: z.object({
        orderBy: z.string().describe(
          "Field to sort the list by. Accepts the following values: * `queryId` (default) * `metadata.title` The default sorting order is ascending. To specify descending order for a field, add the suffix `desc` to the field name. For example, `queryId desc`.",
        ).optional(),
        pageSize: z.number().describe(
          "Maximum number of results per page. Must be between `1` and `100`. Defaults to `100` if unspecified.",
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
          "queries",
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
    run: {
      description: "run",
      arguments: z.object({
        dataRange: z.any().optional(),
        synchronous: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["queryId"] = existing["queryId"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["synchronous"] !== undefined) {
          params["synchronous"] = String(args["synchronous"]);
        }
        const body: Record<string, unknown> = {};
        if (args["dataRange"] !== undefined) {
          body["dataRange"] = args["dataRange"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "doubleclickbidmanager.queries.run",
            "path": "queries/{queryId}:run",
            "httpMethod": "POST",
            "parameterOrder": ["queryId"],
            "parameters": {
              "queryId": { "location": "path", "required": true },
              "synchronous": { "location": "query" },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
