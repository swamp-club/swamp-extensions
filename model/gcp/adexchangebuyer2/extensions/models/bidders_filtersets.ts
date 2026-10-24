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

// Auto-generated extension model for @swamp/gcp/adexchangebuyer2/bidders-filtersets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Ad Exchange Buyer Bidders.FilterSets.
 *
 * A set of filters that is applied to a request for data. Within a filter set, an AND operation is performed across the filters represented by each field. An OR operation is performed across the filters represented by the multiple values of a repeated field, for example, "format=VIDEO AND deal_id=12 AND (seller_network_id=34 OR seller_network_id=56)".
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/filterSets/${shortName}`;
}

const BASE_URL = "https://adexchangebuyer.googleapis.com/";

const GET_CONFIG = {
  "id": "adexchangebuyer2.bidders.filterSets.get",
  "path": "v2beta1/{+name}",
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
  "id": "adexchangebuyer2.bidders.filterSets.create",
  "path": "v2beta1/{+ownerName}/filterSets",
  "httpMethod": "POST",
  "parameterOrder": [
    "ownerName",
  ],
  "parameters": {
    "isTransient": {
      "location": "query",
    },
    "ownerName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "adexchangebuyer2.bidders.filterSets.delete",
  "path": "v2beta1/{+name}",
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
  "id": "adexchangebuyer2.bidders.filterSets.list",
  "path": "v2beta1/{+ownerName}/filterSets",
  "httpMethod": "GET",
  "parameterOrder": [
    "ownerName",
  ],
  "parameters": {
    "ownerName": {
      "location": "path",
      "required": true,
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
  "https://www.googleapis.com/auth/adexchange.buyer",
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
  absoluteDateRange: z.object({
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
      "The end date of the range (inclusive). Must be within the 30 days leading up to current date, and must be equal to or after start_date.",
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
      "The start date of the range (inclusive). Must be within the 30 days leading up to current date, and must be equal to or before end_date.",
    ).optional(),
  }).describe(
    "An absolute date range, defined by a start date and an end date. Interpreted relative to Pacific time zone.",
  ).optional(),
  breakdownDimensions: z.array(
    z.enum(["BREAKDOWN_DIMENSION_UNSPECIFIED", "PUBLISHER_IDENTIFIER"]),
  ).describe(
    "The set of dimensions along which to break down the response; may be empty. If multiple dimensions are requested, the breakdown is along the Cartesian product of the requested dimensions.",
  ).optional(),
  creativeId: z.string().describe(
    "The ID of the creative on which to filter; optional. This field may be set only for a filter set that accesses account-level troubleshooting data, for example, one whose name matches the `bidders/*/accounts/*/filterSets/*` pattern.",
  ).optional(),
  dealId: z.string().describe(
    "The ID of the deal on which to filter; optional. This field may be set only for a filter set that accesses account-level troubleshooting data, for example, one whose name matches the `bidders/*/accounts/*/filterSets/*` pattern.",
  ).optional(),
  environment: z.enum(["ENVIRONMENT_UNSPECIFIED", "WEB", "APP"]).describe(
    "The environment on which to filter; optional.",
  ).optional(),
  format: z.enum([
    "FORMAT_UNSPECIFIED",
    "NATIVE_DISPLAY",
    "NATIVE_VIDEO",
    "NON_NATIVE_DISPLAY",
    "NON_NATIVE_VIDEO",
  ]).describe("Creative format bidded on or allowed to bid on, can be empty.")
    .optional(),
  name: z.string().describe(
    "A user-defined name of the filter set. Filter set names must be unique globally and match one of the patterns: - `bidders/*/filterSets/*` (for accessing bidder-level troubleshooting data) - `bidders/*/accounts/*/filterSets/*` (for accessing account-level troubleshooting data) This field is required in create operations.",
  ).optional(),
  platforms: z.array(
    z.enum(["PLATFORM_UNSPECIFIED", "DESKTOP", "TABLET", "MOBILE"]),
  ).describe(
    "The list of platforms on which to filter; may be empty. The filters represented by multiple platforms are ORed together (for example, if non-empty, results must match any one of the platforms).",
  ).optional(),
  publisherIdentifiers: z.array(z.string()).describe(
    "For Open Bidding partners only. The list of publisher identifiers on which to filter; may be empty. The filters represented by multiple publisher identifiers are ORed together.",
  ).optional(),
  realtimeTimeRange: z.object({
    startTimestamp: z.string().describe(
      "The start timestamp of the real-time RTB metrics aggregation.",
    ).optional(),
  }).describe(
    "An open-ended realtime time range, defined by the aggregation start timestamp.",
  ).optional(),
  relativeDateRange: z.object({
    durationDays: z.number().int().describe(
      "The number of days in the requested date range, for example, for a range spanning today: 1. For a range spanning the last 7 days: 7.",
    ).optional(),
    offsetDays: z.number().int().describe(
      "The end date of the filter set, specified as the number of days before today, for example, for a range where the last date is today: 0.",
    ).optional(),
  }).describe(
    "A relative date range, defined by an offset from today and a duration. Interpreted relative to Pacific time zone.",
  ).optional(),
  sellerNetworkIds: z.array(z.number().int()).describe(
    "For Authorized Buyers only. The list of IDs of the seller (publisher) networks on which to filter; may be empty. The filters represented by multiple seller network IDs are ORed together (for example, if non-empty, results must match any one of the publisher networks). See [seller-network-ids](https://developers.google.com/authorized-buyers/rtb/downloads/seller-network-ids) file for the set of existing seller network IDs.",
  ).optional(),
  timeSeriesGranularity: z.enum([
    "TIME_SERIES_GRANULARITY_UNSPECIFIED",
    "HOURLY",
    "DAILY",
  ]).describe(
    "The granularity of time intervals if a time series breakdown is preferred; optional.",
  ).optional(),
  isTransient: z.string().describe(
    "Whether the filter set is transient, or should be persisted indefinitely. By default, filter sets are not transient. If transient, it will be available for at least 1 hour after creation.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  absoluteDateRange: z.object({
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
  }).optional(),
  breakdownDimensions: z.array(z.string()).optional(),
  creativeId: z.string().optional(),
  dealId: z.string().optional(),
  environment: z.string().optional(),
  format: z.string().optional(),
  formats: z.array(z.string()).optional(),
  name: z.string(),
  platforms: z.array(z.string()).optional(),
  publisherIdentifiers: z.array(z.string()).optional(),
  realtimeTimeRange: z.object({
    startTimestamp: z.string(),
  }).optional(),
  relativeDateRange: z.object({
    durationDays: z.number(),
    offsetDays: z.number(),
  }).optional(),
  sellerNetworkIds: z.array(z.number()).optional(),
  timeSeriesGranularity: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  absoluteDateRange: z.object({
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
      "The end date of the range (inclusive). Must be within the 30 days leading up to current date, and must be equal to or after start_date.",
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
      "The start date of the range (inclusive). Must be within the 30 days leading up to current date, and must be equal to or before end_date.",
    ).optional(),
  }).describe(
    "An absolute date range, defined by a start date and an end date. Interpreted relative to Pacific time zone.",
  ).optional(),
  breakdownDimensions: z.array(
    z.enum(["BREAKDOWN_DIMENSION_UNSPECIFIED", "PUBLISHER_IDENTIFIER"]),
  ).describe(
    "The set of dimensions along which to break down the response; may be empty. If multiple dimensions are requested, the breakdown is along the Cartesian product of the requested dimensions.",
  ).optional(),
  creativeId: z.string().describe(
    "The ID of the creative on which to filter; optional. This field may be set only for a filter set that accesses account-level troubleshooting data, for example, one whose name matches the `bidders/*/accounts/*/filterSets/*` pattern.",
  ).optional(),
  dealId: z.string().describe(
    "The ID of the deal on which to filter; optional. This field may be set only for a filter set that accesses account-level troubleshooting data, for example, one whose name matches the `bidders/*/accounts/*/filterSets/*` pattern.",
  ).optional(),
  environment: z.enum(["ENVIRONMENT_UNSPECIFIED", "WEB", "APP"]).describe(
    "The environment on which to filter; optional.",
  ).optional(),
  format: z.enum([
    "FORMAT_UNSPECIFIED",
    "NATIVE_DISPLAY",
    "NATIVE_VIDEO",
    "NON_NATIVE_DISPLAY",
    "NON_NATIVE_VIDEO",
  ]).describe("Creative format bidded on or allowed to bid on, can be empty.")
    .optional(),
  name: z.string().describe(
    "A user-defined name of the filter set. Filter set names must be unique globally and match one of the patterns: - `bidders/*/filterSets/*` (for accessing bidder-level troubleshooting data) - `bidders/*/accounts/*/filterSets/*` (for accessing account-level troubleshooting data) This field is required in create operations.",
  ).optional(),
  platforms: z.array(
    z.enum(["PLATFORM_UNSPECIFIED", "DESKTOP", "TABLET", "MOBILE"]),
  ).describe(
    "The list of platforms on which to filter; may be empty. The filters represented by multiple platforms are ORed together (for example, if non-empty, results must match any one of the platforms).",
  ).optional(),
  publisherIdentifiers: z.array(z.string()).describe(
    "For Open Bidding partners only. The list of publisher identifiers on which to filter; may be empty. The filters represented by multiple publisher identifiers are ORed together.",
  ).optional(),
  realtimeTimeRange: z.object({
    startTimestamp: z.string().describe(
      "The start timestamp of the real-time RTB metrics aggregation.",
    ).optional(),
  }).describe(
    "An open-ended realtime time range, defined by the aggregation start timestamp.",
  ).optional(),
  relativeDateRange: z.object({
    durationDays: z.number().int().describe(
      "The number of days in the requested date range, for example, for a range spanning today: 1. For a range spanning the last 7 days: 7.",
    ).optional(),
    offsetDays: z.number().int().describe(
      "The end date of the filter set, specified as the number of days before today, for example, for a range where the last date is today: 0.",
    ).optional(),
  }).describe(
    "A relative date range, defined by an offset from today and a duration. Interpreted relative to Pacific time zone.",
  ).optional(),
  sellerNetworkIds: z.array(z.number().int()).describe(
    "For Authorized Buyers only. The list of IDs of the seller (publisher) networks on which to filter; may be empty. The filters represented by multiple seller network IDs are ORed together (for example, if non-empty, results must match any one of the publisher networks). See [seller-network-ids](https://developers.google.com/authorized-buyers/rtb/downloads/seller-network-ids) file for the set of existing seller network IDs.",
  ).optional(),
  timeSeriesGranularity: z.enum([
    "TIME_SERIES_GRANULARITY_UNSPECIFIED",
    "HOURLY",
    "DAILY",
  ]).describe(
    "The granularity of time intervals if a time series breakdown is preferred; optional.",
  ).optional(),
  isTransient: z.string().describe(
    "Whether the filter set is transient, or should be persisted indefinitely. By default, filter sets are not transient. If transient, it will be available for at least 1 hour after creation.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Ad Exchange Buyer Bidders.FilterSets. Registered at `@swamp/gcp/adexchangebuyer2/bidders-filtersets`. */
export const model = {
  type: "@swamp/gcp/adexchangebuyer2/bidders-filtersets",
  version: "2026.10.23.1",
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
      toVersion: "2026.05.18.1",
      description: "Added: parent. Removed: ownerName",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { ownerName: _ownerName, ...rest } = old;
        return rest;
      },
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
      toVersion: "2026.07.17.2",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A set of filters that is applied to a request for data. Within a filter set, ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a filterSets",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) {
          params["ownerName"] = String(g["parent"]);
        }
        const body: Record<string, unknown> = {};
        if (g["absoluteDateRange"] !== undefined) {
          body["absoluteDateRange"] = g["absoluteDateRange"];
        }
        if (g["breakdownDimensions"] !== undefined) {
          body["breakdownDimensions"] = g["breakdownDimensions"];
        }
        if (g["creativeId"] !== undefined) body["creativeId"] = g["creativeId"];
        if (g["dealId"] !== undefined) body["dealId"] = g["dealId"];
        if (g["environment"] !== undefined) {
          body["environment"] = g["environment"];
        }
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["platforms"] !== undefined) body["platforms"] = g["platforms"];
        if (g["publisherIdentifiers"] !== undefined) {
          body["publisherIdentifiers"] = g["publisherIdentifiers"];
        }
        if (g["realtimeTimeRange"] !== undefined) {
          body["realtimeTimeRange"] = g["realtimeTimeRange"];
        }
        if (g["relativeDateRange"] !== undefined) {
          body["relativeDateRange"] = g["relativeDateRange"];
        }
        if (g["sellerNetworkIds"] !== undefined) {
          body["sellerNetworkIds"] = g["sellerNetworkIds"];
        }
        if (g["timeSeriesGranularity"] !== undefined) {
          body["timeSeriesGranularity"] = g["timeSeriesGranularity"];
        }
        if (g["isTransient"] !== undefined) {
          params["isTransient"] = String(g["isTransient"]);
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
            listParams: { "ownerName": String(g["ownerName"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a filterSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the filterSets"),
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
    delete: {
      description: "Delete the filterSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the filterSets"),
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
      description: "Sync filterSets state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific filterSets by name (e.g. one discovered by list)",
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
      description: "List filterSets resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default.",
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
        if (g["parent"] !== undefined) {
          params["ownerName"] = String(g["parent"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "filterSets",
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
