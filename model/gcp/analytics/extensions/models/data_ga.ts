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

// Auto-generated extension model for @swamp/gcp/analytics/data-ga
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Data.Ga.
 *
 * Analytics data for a given view (profile).
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.data.ga.get",
  "path": "data/ga",
  "httpMethod": "GET",
  "parameterOrder": [
    "ids",
    "start-date",
    "end-date",
    "metrics",
  ],
  "parameters": {
    "dimensions": {
      "location": "query",
    },
    "end-date": {
      "location": "query",
      "required": true,
    },
    "filters": {
      "location": "query",
    },
    "ids": {
      "location": "query",
      "required": true,
    },
    "include-empty-rows": {
      "location": "query",
    },
    "max-results": {
      "location": "query",
    },
    "metrics": {
      "location": "query",
      "required": true,
    },
    "output": {
      "location": "query",
    },
    "samplingLevel": {
      "location": "query",
    },
    "segment": {
      "location": "query",
    },
    "sort": {
      "location": "query",
    },
    "start-date": {
      "location": "query",
      "required": true,
    },
    "start-index": {
      "location": "query",
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/analytics",
  "https://www.googleapis.com/auth/analytics.edit",
  "https://www.googleapis.com/auth/analytics.manage.users",
  "https://www.googleapis.com/auth/analytics.manage.users.readonly",
  "https://www.googleapis.com/auth/analytics.provision",
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/analytics.user.deletion",
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
  ids: z.string().describe(
    "Unique table ID for retrieving Analytics data. Table ID is of the form ga:XXXX, where XXXX is the Analytics view (profile) ID.",
  ),
  start_date: z.string().describe(
    "Start date for fetching Analytics data. Requests can specify a start date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is 7daysAgo.",
  ),
  end_date: z.string().describe(
    "End date for fetching Analytics data. Request can should specify an end date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is yesterday.",
  ),
});

const StateSchema = z.object({
  columnHeaders: z.array(z.object({
    columnType: z.string(),
    dataType: z.string(),
    name: z.string(),
  })).optional(),
  containsSampledData: z.boolean().optional(),
  dataLastRefreshed: z.string().optional(),
  dataTable: z.object({
    cols: z.array(z.object({
      id: z.string(),
      label: z.string(),
      type: z.string(),
    })),
    rows: z.array(z.object({
      c: z.array(z.object({
        v: z.unknown(),
      })),
    })),
  }).optional(),
  id: z.string().optional(),
  itemsPerPage: z.number().optional(),
  kind: z.string().optional(),
  nextLink: z.string().optional(),
  previousLink: z.string().optional(),
  profileInfo: z.object({
    accountId: z.string(),
    internalWebPropertyId: z.string(),
    profileId: z.string(),
    profileName: z.string(),
    tableId: z.string(),
    webPropertyId: z.string(),
  }).optional(),
  query: z.object({
    dimensions: z.string(),
    end_date: z.string(),
    filters: z.string(),
    ids: z.string(),
    max_results: z.number(),
    metrics: z.array(z.string()),
    samplingLevel: z.string(),
    segment: z.string(),
    sort: z.array(z.string()),
    start_date: z.string(),
    start_index: z.number(),
  }).optional(),
  rows: z.array(z.array(z.string())).optional(),
  sampleSize: z.string().optional(),
  sampleSpace: z.string().optional(),
  selfLink: z.string().optional(),
  totalResults: z.number().optional(),
  totalsForAllResults: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  ids: z.string().describe(
    "Unique table ID for retrieving Analytics data. Table ID is of the form ga:XXXX, where XXXX is the Analytics view (profile) ID.",
  ).optional(),
  start_date: z.string().describe(
    "Start date for fetching Analytics data. Requests can specify a start date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is 7daysAgo.",
  ).optional(),
  end_date: z.string().describe(
    "End date for fetching Analytics data. Request can should specify an end date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is yesterday.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
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
  };
}

/** Swamp extension model for Google Cloud Google Analytics Data.Ga. Registered at `@swamp/gcp/analytics/data-ga`. */
export const model = {
  type: "@swamp/gcp/analytics/data-ga",
  version: "2026.10.13.1",
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
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description:
        "Added: accessToken, credentialsJson, project, scopes, ids, start_date, end_date",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Analytics data for a given view (profile).",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a ga",
      arguments: z.object({
        identifier: z.string().describe("The name of the ga"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["ids"] !== undefined) params["ids"] = String(g["ids"]);
        if (g["start_date"] !== undefined) {
          params["start-date"] = String(g["start_date"]);
        }
        if (g["end_date"] !== undefined) {
          params["end-date"] = String(g["end_date"]);
        }
        params["metrics"] = args.identifier;
        const result = await readResource(
          BASE_URL,
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
    sync: {
      description: "Sync ga state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific ga by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
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
          if (g["ids"] !== undefined) params["ids"] = String(g["ids"]);
          else if (existing["ids"]) params["ids"] = String(existing["ids"]);
          if (g["start_date"] !== undefined) {
            params["start-date"] = String(g["start_date"]);
          } else if (existing["start-date"]) {
            params["start-date"] = String(existing["start-date"]);
          }
          if (g["end_date"] !== undefined) {
            params["end-date"] = String(g["end_date"]);
          } else if (existing["end-date"]) {
            params["end-date"] = String(existing["end-date"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["metrics"] = identifier;
          const result = await readResource(
            BASE_URL,
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
  },
};
