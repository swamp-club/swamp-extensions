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

// Auto-generated extension model for @swamp/gcp/contactcenterinsights/dashboards-charts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights Dashboards.Charts.
 *
 * Configurable dashboard's widget that displays data as a chart.
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
  return `${parent}/charts/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id": "contactcenterinsights.projects.locations.dashboards.charts.get",
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
  "id": "contactcenterinsights.projects.locations.dashboards.charts.create",
  "path": "v1/{+parent}/charts",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "chartId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "contactcenterinsights.projects.locations.dashboards.charts.patch",
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
  "id": "contactcenterinsights.projects.locations.dashboards.charts.delete",
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
  "id": "contactcenterinsights.projects.locations.dashboards.charts.list",
  "path": "v1/{+parent}/charts",
  "httpMethod": "GET",
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
  action: z.object({
    redirectAction: z.object({
      queryParams: z.record(z.string(), z.string()).describe(
        "The query params to be added to the redirect path.",
      ).optional(),
      relativePath: z.string().describe("The relative path to redirect to.")
        .optional(),
    }).describe("The redirect action to be taken when the chart is clicked.")
      .optional(),
  }).describe("The action to be taken when the chart is clicked.").optional(),
  chartVisualizationType: z.enum([
    "CHART_VISUALIZATION_TYPE_UNSPECIFIED",
    "BAR",
    "LINE",
    "AREA",
    "PIE",
    "SCATTER",
    "TABLE",
    "SCORE_CARD",
    "SUNBURST",
    "GAUGE",
    "SANKEY",
  ]).describe("Chart visualization type.").optional(),
  dataSource: z.object({
    generativeInsights: z.object({
      chartCheckpoint: z.object({
        revisionId: z.string().describe("The revision id of the chart.")
          .optional(),
        sessionId: z.string().describe("The session id of the chart.")
          .optional(),
      }).describe("The current chart checkpoint state.").optional(),
      chartConversations: z.array(z.object({
        conversationId: z.string().describe("The conversation id of the chart.")
          .optional(),
        createTime: z.string().describe("The create time of the conversation.")
          .optional(),
        messages: z.array(z.unknown()).describe(
          "Ordered list of messages, including user inputs and system responses.",
        ).optional(),
        updateTime: z.string().describe("The update time of the conversation.")
          .optional(),
      })).describe(
        "Output only. The chart conversations used to generate the chart.",
      ).optional(),
      chartSpec: z.record(z.string(), z.string()).describe(
        "Chart spec for the chart.",
      ).optional(),
      request: z.record(z.string(), z.string()).optional(),
      sqlComparisonKey: z.string().describe(
        "Optional. For charts with comparison, this key will determine the metric that will be compared between the current and another dataset.",
      ).optional(),
      sqlQuery: z.string().describe("SQL query used to generate the chart.")
        .optional(),
    }).describe(
      "Request that use natural language query to generate the chart.",
    ).optional(),
    queryMetrics: z.object({
      request: z.record(z.string(), z.string()).optional(),
    }).describe("Request data that use the existing QueryMetrics.").optional(),
  }).describe("The request data for visualizing the dataset in the chart.")
    .optional(),
  dateRangeConfig: z.object({
    absoluteDateRange: z.object({
      endTime: z.string().describe("Required. The end time of the time window.")
        .optional(),
      startTime: z.string().describe(
        "Required. The start time of the time window.",
      ).optional(),
    }).describe("A time window for querying conversations.").optional(),
    relativeDateRange: z.object({
      quantity: z.string().describe(
        "Required. The quantity of units in the past.",
      ).optional(),
      unit: z.enum([
        "TIME_UNIT_UNSPECIFIED",
        "DAY",
        "WEEK",
        "MONTH",
        "QUARTER",
        "YEAR",
      ]).describe("Required. The unit of time.").optional(),
    }).describe("Relative date range configuration.").optional(),
  }).describe("Date range configuration for dashboard charts.").optional(),
  description: z.string().describe("Chart description").optional(),
  displayName: z.string().describe("User provided display name of the chart.")
    .optional(),
  filter: z.string().describe(
    "Filter applied to all charts in the container. Should support scope later.",
  ).optional(),
  height: z.number().int().describe("The height of the chart in grid units.")
    .optional(),
  name: z.string().describe(
    "Identifier. Chart resource name. Format: projects/{project}/locations/{location}/dashboards/{dashboard}/charts/{chart}",
  ).optional(),
  width: z.number().int().describe("The width of the chart in grid units.")
    .optional(),
  chartId: z.string().describe(
    "Optional. A unique ID for the new Chart. This ID will become the final component of the Chart's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  action: z.object({
    redirectAction: z.object({
      queryParams: z.record(z.string(), z.unknown()),
      relativePath: z.string(),
    }),
  }).optional(),
  chartType: z.string().optional(),
  chartVisualizationType: z.string().optional(),
  createTime: z.string().optional(),
  dataSource: z.object({
    generativeInsights: z.object({
      chartCheckpoint: z.object({
        revisionId: z.string(),
        sessionId: z.string(),
      }),
      chartConversations: z.array(z.object({
        conversationId: z.string(),
        createTime: z.string(),
        messages: z.array(z.unknown()),
        updateTime: z.string(),
      })),
      chartSpec: z.record(z.string(), z.unknown()),
      request: z.record(z.string(), z.unknown()),
      sqlComparisonKey: z.string(),
      sqlQuery: z.string(),
    }),
    queryMetrics: z.object({
      request: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  dateRangeConfig: z.object({
    absoluteDateRange: z.object({
      endTime: z.string(),
      startTime: z.string(),
    }),
    relativeDateRange: z.object({
      quantity: z.string(),
      unit: z.string(),
    }),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  filter: z.string().optional(),
  height: z.number().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
  width: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  action: z.object({
    redirectAction: z.object({
      queryParams: z.record(z.string(), z.string()).describe(
        "The query params to be added to the redirect path.",
      ).optional(),
      relativePath: z.string().describe("The relative path to redirect to.")
        .optional(),
    }).describe("The redirect action to be taken when the chart is clicked.")
      .optional(),
  }).describe("The action to be taken when the chart is clicked.").optional(),
  chartVisualizationType: z.enum([
    "CHART_VISUALIZATION_TYPE_UNSPECIFIED",
    "BAR",
    "LINE",
    "AREA",
    "PIE",
    "SCATTER",
    "TABLE",
    "SCORE_CARD",
    "SUNBURST",
    "GAUGE",
    "SANKEY",
  ]).describe("Chart visualization type.").optional(),
  dataSource: z.object({
    generativeInsights: z.object({
      chartCheckpoint: z.object({
        revisionId: z.string().describe("The revision id of the chart.")
          .optional(),
        sessionId: z.string().describe("The session id of the chart.")
          .optional(),
      }).describe("The current chart checkpoint state.").optional(),
      chartConversations: z.array(z.object({
        conversationId: z.string().describe("The conversation id of the chart.")
          .optional(),
        createTime: z.string().describe("The create time of the conversation.")
          .optional(),
        messages: z.array(z.unknown()).describe(
          "Ordered list of messages, including user inputs and system responses.",
        ).optional(),
        updateTime: z.string().describe("The update time of the conversation.")
          .optional(),
      })).describe(
        "Output only. The chart conversations used to generate the chart.",
      ).optional(),
      chartSpec: z.record(z.string(), z.string()).describe(
        "Chart spec for the chart.",
      ).optional(),
      request: z.record(z.string(), z.string()).optional(),
      sqlComparisonKey: z.string().describe(
        "Optional. For charts with comparison, this key will determine the metric that will be compared between the current and another dataset.",
      ).optional(),
      sqlQuery: z.string().describe("SQL query used to generate the chart.")
        .optional(),
    }).describe(
      "Request that use natural language query to generate the chart.",
    ).optional(),
    queryMetrics: z.object({
      request: z.record(z.string(), z.string()).optional(),
    }).describe("Request data that use the existing QueryMetrics.").optional(),
  }).describe("The request data for visualizing the dataset in the chart.")
    .optional(),
  dateRangeConfig: z.object({
    absoluteDateRange: z.object({
      endTime: z.string().describe("Required. The end time of the time window.")
        .optional(),
      startTime: z.string().describe(
        "Required. The start time of the time window.",
      ).optional(),
    }).describe("A time window for querying conversations.").optional(),
    relativeDateRange: z.object({
      quantity: z.string().describe(
        "Required. The quantity of units in the past.",
      ).optional(),
      unit: z.enum([
        "TIME_UNIT_UNSPECIFIED",
        "DAY",
        "WEEK",
        "MONTH",
        "QUARTER",
        "YEAR",
      ]).describe("Required. The unit of time.").optional(),
    }).describe("Relative date range configuration.").optional(),
  }).describe("Date range configuration for dashboard charts.").optional(),
  description: z.string().describe("Chart description").optional(),
  displayName: z.string().describe("User provided display name of the chart.")
    .optional(),
  filter: z.string().describe(
    "Filter applied to all charts in the container. Should support scope later.",
  ).optional(),
  height: z.number().int().describe("The height of the chart in grid units.")
    .optional(),
  name: z.string().describe(
    "Identifier. Chart resource name. Format: projects/{project}/locations/{location}/dashboards/{dashboard}/charts/{chart}",
  ).optional(),
  width: z.number().int().describe("The width of the chart in grid units.")
    .optional(),
  chartId: z.string().describe(
    "Optional. A unique ID for the new Chart. This ID will become the final component of the Chart's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Contact Center AI Insights Dashboards.Charts. Registered at `@swamp/gcp/contactcenterinsights/dashboards-charts`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/dashboards-charts",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
      description: "Added: action",
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
      toVersion: "2026.05.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: action",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { action: _action, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: action",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: action",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { action: _action, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: action",
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
      description: "Removed: action",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { action: _action, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "Added: action",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Configurable dashboard's widget that displays data as a chart.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a charts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["chartVisualizationType"] !== undefined) {
          body["chartVisualizationType"] = g["chartVisualizationType"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["dateRangeConfig"] !== undefined) {
          body["dateRangeConfig"] = g["dateRangeConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["height"] !== undefined) body["height"] = g["height"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["width"] !== undefined) body["width"] = g["width"];
        if (g["chartId"] !== undefined) body["chartId"] = g["chartId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
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
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a charts",
      arguments: z.object({
        identifier: z.string().describe("The name of the charts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update charts attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["chartVisualizationType"] !== undefined) {
          body["chartVisualizationType"] = g["chartVisualizationType"];
        }
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["dateRangeConfig"] !== undefined) {
          body["dateRangeConfig"] = g["dateRangeConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["height"] !== undefined) body["height"] = g["height"];
        if (g["width"] !== undefined) body["width"] = g["width"];
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
      description: "Delete the charts",
      arguments: z.object({
        identifier: z.string().describe("The name of the charts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync charts state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
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
    list: {
      description: "List charts resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "charts",
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
