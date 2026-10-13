// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/curationpartners/curators-reports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Curation Partners Curators.Reports.
 *
 * The `Report` resource.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/reports/${shortName}`;
}

const BASE_URL = "https://curationpartners.googleapis.com/";

const GET_CONFIG = {
  "id": "curationpartners.curators.reports.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "curationpartners.curators.reports.create",
  "path": "v1/{+parent}/reports",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "curationpartners.curators.reports.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "curationpartners.curators.reports.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "curationpartners.curators.reports.list",
  "path": "v1/{+parent}/reports",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
    "parent": {
      "location": "path",
      "required": true,
    },
    "skip": {
      "location": "query",
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/curation-partners",
];

const GlobalArgsSchema = z.object({
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
  displayName: z.string().describe("Optional. Display name for the report.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the report. Report resource name have the form: `curators/{account_id}/reports/{report_id}`",
  ).optional(),
  reportDefinition: z.object({
    currencyCode: z.string().describe(
      "Optional. The ISO 4217 currency code for this report. Defaults to account currency code if not specified.",
    ).optional(),
    dateRange: z.object({
      fixed: z.object({
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
        }).describe("Required. The end date (inclusive) of this date range.")
          .optional(),
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
        }).describe("Required. The start date of this date range.").optional(),
      }).describe("A fixed date range.").optional(),
      relative: z.enum([
        "RELATIVE_DATE_RANGE_UNSPECIFIED",
        "TODAY",
        "YESTERDAY",
        "THIS_WEEK_TO_DATE",
        "THIS_WEEK_TO_YESTERDAY",
        "THIS_MONTH_TO_DATE",
        "THIS_MONTH_TO_YESTERDAY",
        "THIS_QUARTER_TO_DATE",
        "THIS_QUARTER_TO_YESTERDAY",
        "THIS_YEAR_TO_DATE",
        "THIS_YEAR_TO_YESTERDAY",
        "LAST_WEEK",
        "LAST_WEEK_STARTING_SUNDAY",
        "LAST_MONTH",
        "LAST_QUARTER",
        "LAST_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_60_DAYS",
        "LAST_90_DAYS",
        "LAST_93_DAYS",
        "LAST_180_DAYS",
        "LAST_360_DAYS",
        "LAST_365_DAYS",
        "LAST_3_MONTHS",
        "LAST_6_MONTHS",
        "LAST_12_MONTHS",
        "ALL_AVAILABLE",
      ]).describe("A relative date range.").optional(),
    }).describe("Required. The primary date range of this report.").optional(),
    dimensions: z.array(
      z.enum([
        "DIMENSION_UNSPECIFIED",
        "ADVERTISER_DOMAIN",
        "COUNTRY",
        "CURATION_DATA_SEGMENT_ID",
        "CURATION_DATA_SEGMENT_RESPONSE_STATUS",
        "CURATION_DATA_SEGMENT_RESPONSE_STATUS_NAME",
        "CURATOR_FEE_TYPE",
        "DATE",
        "DEAL_ID",
        "DEAL_NAME",
        "DETECTED_ADVERTISER_NAME",
        "DSP_NAME",
        "DSP_SEAT_ID",
        "ENVIRONMENT",
        "ENVIRONMENT_NAME",
        "HOLDING_COMPANY_NAME",
        "HOUR",
        "MOBILE_APP_ID",
        "MOBILE_APP_NAME",
        "MOBILE_OS",
        "MONTH",
        "PACKAGE_FEE_VISIBILITY",
        "PLATFORM",
        "PUBLISHER_DOMAIN",
        "PUBLISHER_ID",
        "PUBLISHER_NAME",
        "WEEK",
      ]),
    ).describe(
      "Required. The list of dimensions to report on. If empty, the report will have no dimensions, and any metrics will be totals.",
    ).optional(),
    filters: z.array(z.object({
      andFilter: z.object({
        filters: z.array(z.unknown()).describe("Required. A list of filters.")
          .optional(),
      }).describe("A list of filters whose results are AND-ed.").optional(),
      fieldFilter: z.object({
        field: z.object({
          dimension: z.unknown().describe(
            "The dimension this field represents.",
          ).optional(),
          metric: z.unknown().describe("The metric this field represents.")
            .optional(),
        }).describe("Required. The field to filter on.").optional(),
        operation: z.enum([
          "IN",
          "NOT_IN",
          "CONTAINS",
          "NOT_CONTAINS",
          "LESS_THAN",
          "LESS_THAN_EQUALS",
          "GREATER_THAN",
          "GREATER_THAN_EQUALS",
          "BETWEEN",
          "MATCHES",
          "NOT_MATCHES",
        ]).describe("Required. The operation of this filter.").optional(),
        values: z.array(z.unknown()).describe("Required. Values to filter to.")
          .optional(),
      }).describe("A filter on a single field.").optional(),
      notFilter: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Filter",
      ).optional(),
      orFilter: z.object({
        filters: z.array(z.unknown()).describe("Required. A list of filters.")
          .optional(),
      }).describe("A list of filters whose results are OR-ed.").optional(),
    })).describe("Optional. The filters for this report.").optional(),
    metrics: z.array(
      z.enum([
        "METRIC_UNSPECIFIED",
        "ACTIVE_VIEW_MEASURABILITY_RATE",
        "ACTIVE_VIEW_MEASURABLE",
        "ACTIVE_VIEW_VIEWABILITY_RATE",
        "ACTIVE_VIEW_VIEWABLE",
        "AUCTIONS_WON",
        "BIDS",
        "BIDS_IN_AUCTION",
        "BID_REQUESTS",
        "CLICKS",
        "CURATION_PARTNER_FEE",
        "DATA_SEGMENT_REQUESTS",
        "IMPRESSIONS",
        "SPEND",
      ]),
    ).describe(
      "Required. The list of metrics to report on. If empty, the report will have no metrics.",
    ).optional(),
    sorts: z.array(z.object({
      descending: z.boolean().describe(
        "Optional. The sort order. If true the sort will be descending.",
      ).optional(),
      field: z.object({
        dimension: z.enum([
          "DIMENSION_UNSPECIFIED",
          "ADVERTISER_DOMAIN",
          "COUNTRY",
          "CURATION_DATA_SEGMENT_ID",
          "CURATION_DATA_SEGMENT_RESPONSE_STATUS",
          "CURATION_DATA_SEGMENT_RESPONSE_STATUS_NAME",
          "CURATOR_FEE_TYPE",
          "DATE",
          "DEAL_ID",
          "DEAL_NAME",
          "DETECTED_ADVERTISER_NAME",
          "DSP_NAME",
          "DSP_SEAT_ID",
          "ENVIRONMENT",
          "ENVIRONMENT_NAME",
          "HOLDING_COMPANY_NAME",
          "HOUR",
          "MOBILE_APP_ID",
          "MOBILE_APP_NAME",
          "MOBILE_OS",
          "MONTH",
          "PACKAGE_FEE_VISIBILITY",
          "PLATFORM",
          "PUBLISHER_DOMAIN",
          "PUBLISHER_ID",
          "PUBLISHER_NAME",
          "WEEK",
        ]).describe("The dimension this field represents.").optional(),
        metric: z.enum([
          "METRIC_UNSPECIFIED",
          "ACTIVE_VIEW_MEASURABILITY_RATE",
          "ACTIVE_VIEW_MEASURABLE",
          "ACTIVE_VIEW_VIEWABILITY_RATE",
          "ACTIVE_VIEW_VIEWABLE",
          "AUCTIONS_WON",
          "BIDS",
          "BIDS_IN_AUCTION",
          "BID_REQUESTS",
          "CLICKS",
          "CURATION_PARTNER_FEE",
          "DATA_SEGMENT_REQUESTS",
          "IMPRESSIONS",
          "SPEND",
        ]).describe("The metric this field represents.").optional(),
      }).describe("Required. A field (dimension or metric) to sort by.")
        .optional(),
    })).describe("Optional. Default sorts to apply to this report.").optional(),
    timeZone: z.string().describe(
      'Optional. If time_zone_source is PROVIDED, this is the time zone to use for this report. Leave empty for any other time zone source. Time zone in IANA format. For example, "America/New_York".',
    ).optional(),
    timeZoneSource: z.enum([
      "TIME_ZONE_SOURCE_UNSPECIFIED",
      "AD_EXCHANGE",
      "UTC",
      "PROVIDED",
    ]).describe(
      "Optional. Where to get the time zone for this report. Defaults to using the Pacific time zone (PT). If source is PROVIDED, the time_zone field in the report definition must also set a time zone.",
    ).optional(),
  }).describe("Required. The report definition of the report.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  locale: z.string().optional(),
  name: z.string(),
  reportDefinition: z.object({
    currencyCode: z.string(),
    dateRange: z.object({
      fixed: z.object({
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
      relative: z.string(),
    }),
    dimensions: z.array(z.string()),
    filters: z.array(z.object({
      andFilter: z.object({
        filters: z.array(z.unknown()),
      }),
      fieldFilter: z.object({
        field: z.object({
          dimension: z.unknown(),
          metric: z.unknown(),
        }),
        operation: z.string(),
        values: z.array(z.unknown()),
      }),
      notFilter: z.record(z.string(), z.unknown()),
      orFilter: z.object({
        filters: z.array(z.unknown()),
      }),
    })),
    metrics: z.array(z.string()),
    sorts: z.array(z.object({
      descending: z.boolean(),
      field: z.object({
        dimension: z.string(),
        metric: z.string(),
      }),
    })),
    timeZone: z.string(),
    timeZoneSource: z.string(),
  }).optional(),
  reportId: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  displayName: z.string().describe("Optional. Display name for the report.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the report. Report resource name have the form: `curators/{account_id}/reports/{report_id}`",
  ).optional(),
  reportDefinition: z.object({
    currencyCode: z.string().describe(
      "Optional. The ISO 4217 currency code for this report. Defaults to account currency code if not specified.",
    ).optional(),
    dateRange: z.object({
      fixed: z.object({
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
        }).describe("Required. The end date (inclusive) of this date range.")
          .optional(),
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
        }).describe("Required. The start date of this date range.").optional(),
      }).describe("A fixed date range.").optional(),
      relative: z.enum([
        "RELATIVE_DATE_RANGE_UNSPECIFIED",
        "TODAY",
        "YESTERDAY",
        "THIS_WEEK_TO_DATE",
        "THIS_WEEK_TO_YESTERDAY",
        "THIS_MONTH_TO_DATE",
        "THIS_MONTH_TO_YESTERDAY",
        "THIS_QUARTER_TO_DATE",
        "THIS_QUARTER_TO_YESTERDAY",
        "THIS_YEAR_TO_DATE",
        "THIS_YEAR_TO_YESTERDAY",
        "LAST_WEEK",
        "LAST_WEEK_STARTING_SUNDAY",
        "LAST_MONTH",
        "LAST_QUARTER",
        "LAST_YEAR",
        "LAST_7_DAYS",
        "LAST_30_DAYS",
        "LAST_60_DAYS",
        "LAST_90_DAYS",
        "LAST_93_DAYS",
        "LAST_180_DAYS",
        "LAST_360_DAYS",
        "LAST_365_DAYS",
        "LAST_3_MONTHS",
        "LAST_6_MONTHS",
        "LAST_12_MONTHS",
        "ALL_AVAILABLE",
      ]).describe("A relative date range.").optional(),
    }).describe("Required. The primary date range of this report.").optional(),
    dimensions: z.array(
      z.enum([
        "DIMENSION_UNSPECIFIED",
        "ADVERTISER_DOMAIN",
        "COUNTRY",
        "CURATION_DATA_SEGMENT_ID",
        "CURATION_DATA_SEGMENT_RESPONSE_STATUS",
        "CURATION_DATA_SEGMENT_RESPONSE_STATUS_NAME",
        "CURATOR_FEE_TYPE",
        "DATE",
        "DEAL_ID",
        "DEAL_NAME",
        "DETECTED_ADVERTISER_NAME",
        "DSP_NAME",
        "DSP_SEAT_ID",
        "ENVIRONMENT",
        "ENVIRONMENT_NAME",
        "HOLDING_COMPANY_NAME",
        "HOUR",
        "MOBILE_APP_ID",
        "MOBILE_APP_NAME",
        "MOBILE_OS",
        "MONTH",
        "PACKAGE_FEE_VISIBILITY",
        "PLATFORM",
        "PUBLISHER_DOMAIN",
        "PUBLISHER_ID",
        "PUBLISHER_NAME",
        "WEEK",
      ]),
    ).describe(
      "Required. The list of dimensions to report on. If empty, the report will have no dimensions, and any metrics will be totals.",
    ).optional(),
    filters: z.array(z.object({
      andFilter: z.object({
        filters: z.array(z.unknown()).describe("Required. A list of filters.")
          .optional(),
      }).describe("A list of filters whose results are AND-ed.").optional(),
      fieldFilter: z.object({
        field: z.object({
          dimension: z.unknown().describe(
            "The dimension this field represents.",
          ).optional(),
          metric: z.unknown().describe("The metric this field represents.")
            .optional(),
        }).describe("Required. The field to filter on.").optional(),
        operation: z.enum([
          "IN",
          "NOT_IN",
          "CONTAINS",
          "NOT_CONTAINS",
          "LESS_THAN",
          "LESS_THAN_EQUALS",
          "GREATER_THAN",
          "GREATER_THAN_EQUALS",
          "BETWEEN",
          "MATCHES",
          "NOT_MATCHES",
        ]).describe("Required. The operation of this filter.").optional(),
        values: z.array(z.unknown()).describe("Required. Values to filter to.")
          .optional(),
      }).describe("A filter on a single field.").optional(),
      notFilter: z.record(z.string(), z.unknown()).describe(
        "Circular reference to Filter",
      ).optional(),
      orFilter: z.object({
        filters: z.array(z.unknown()).describe("Required. A list of filters.")
          .optional(),
      }).describe("A list of filters whose results are OR-ed.").optional(),
    })).describe("Optional. The filters for this report.").optional(),
    metrics: z.array(
      z.enum([
        "METRIC_UNSPECIFIED",
        "ACTIVE_VIEW_MEASURABILITY_RATE",
        "ACTIVE_VIEW_MEASURABLE",
        "ACTIVE_VIEW_VIEWABILITY_RATE",
        "ACTIVE_VIEW_VIEWABLE",
        "AUCTIONS_WON",
        "BIDS",
        "BIDS_IN_AUCTION",
        "BID_REQUESTS",
        "CLICKS",
        "CURATION_PARTNER_FEE",
        "DATA_SEGMENT_REQUESTS",
        "IMPRESSIONS",
        "SPEND",
      ]),
    ).describe(
      "Required. The list of metrics to report on. If empty, the report will have no metrics.",
    ).optional(),
    sorts: z.array(z.object({
      descending: z.boolean().describe(
        "Optional. The sort order. If true the sort will be descending.",
      ).optional(),
      field: z.object({
        dimension: z.enum([
          "DIMENSION_UNSPECIFIED",
          "ADVERTISER_DOMAIN",
          "COUNTRY",
          "CURATION_DATA_SEGMENT_ID",
          "CURATION_DATA_SEGMENT_RESPONSE_STATUS",
          "CURATION_DATA_SEGMENT_RESPONSE_STATUS_NAME",
          "CURATOR_FEE_TYPE",
          "DATE",
          "DEAL_ID",
          "DEAL_NAME",
          "DETECTED_ADVERTISER_NAME",
          "DSP_NAME",
          "DSP_SEAT_ID",
          "ENVIRONMENT",
          "ENVIRONMENT_NAME",
          "HOLDING_COMPANY_NAME",
          "HOUR",
          "MOBILE_APP_ID",
          "MOBILE_APP_NAME",
          "MOBILE_OS",
          "MONTH",
          "PACKAGE_FEE_VISIBILITY",
          "PLATFORM",
          "PUBLISHER_DOMAIN",
          "PUBLISHER_ID",
          "PUBLISHER_NAME",
          "WEEK",
        ]).describe("The dimension this field represents.").optional(),
        metric: z.enum([
          "METRIC_UNSPECIFIED",
          "ACTIVE_VIEW_MEASURABILITY_RATE",
          "ACTIVE_VIEW_MEASURABLE",
          "ACTIVE_VIEW_VIEWABILITY_RATE",
          "ACTIVE_VIEW_VIEWABLE",
          "AUCTIONS_WON",
          "BIDS",
          "BIDS_IN_AUCTION",
          "BID_REQUESTS",
          "CLICKS",
          "CURATION_PARTNER_FEE",
          "DATA_SEGMENT_REQUESTS",
          "IMPRESSIONS",
          "SPEND",
        ]).describe("The metric this field represents.").optional(),
      }).describe("Required. A field (dimension or metric) to sort by.")
        .optional(),
    })).describe("Optional. Default sorts to apply to this report.").optional(),
    timeZone: z.string().describe(
      'Optional. If time_zone_source is PROVIDED, this is the time zone to use for this report. Leave empty for any other time zone source. Time zone in IANA format. For example, "America/New_York".',
    ).optional(),
    timeZoneSource: z.enum([
      "TIME_ZONE_SOURCE_UNSPECIFIED",
      "AD_EXCHANGE",
      "UTC",
      "PROVIDED",
    ]).describe(
      "Optional. Where to get the time zone for this report. Defaults to using the Pacific time zone (PT). If source is PROVIDED, the time_zone field in the report definition must also set a time zone.",
    ).optional(),
  }).describe("Required. The report definition of the report.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Curation Partners Curators.Reports. Registered at `@swamp/gcp/curationpartners/curators-reports`. */
export const model = {
  type: "@swamp/gcp/curationpartners/curators-reports",
  version: "2026.10.13.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The `Report` resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a reports",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["reportDefinition"] !== undefined) {
          body["reportDefinition"] = g["reportDefinition"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update reports attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific reports by name (e.g. one discovered by list)",
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
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["reportDefinition"] !== undefined) {
          body["reportDefinition"] = g["reportDefinition"];
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
      description: "Delete the reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync reports state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific reports by name (e.g. one discovered by list)",
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
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
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
      description: "List reports resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Expression to filter the response. See syntax details at https://developers.google.com/ad-manager/api/beta/filters",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Expression to specify sorting order. See syntax details at https://developers.google.com/ad-manager/api/beta/filters#order",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of `Reports` to return. The service may return fewer than this value. If unspecified, at most 50 `Reports` will be returned. The maximum value is 1000; values greater than 1000 will be coerced to 1000.",
        ).optional(),
        skip: z.number().describe(
          "Optional. Number of individual resources to skip while paginating.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["skip"] !== undefined) params["skip"] = String(args["skip"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "reports",
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
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "curationpartners.curators.reports.run",
            "path": "v1/{+name}:run",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
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
