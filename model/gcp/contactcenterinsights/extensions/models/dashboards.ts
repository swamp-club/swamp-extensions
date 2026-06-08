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

// Auto-generated extension model for @swamp/gcp/contactcenterinsights/dashboards
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights Dashboards.
 *
 * Configurable dashboard
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
  return `${parent}/dashboards/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id": "contactcenterinsights.projects.locations.dashboards.get",
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
  "id": "contactcenterinsights.projects.locations.dashboards.create",
  "path": "v1/{+parent}/dashboards",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "dashboardId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "contactcenterinsights.projects.locations.dashboards.patch",
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
  "id": "contactcenterinsights.projects.locations.dashboards.delete",
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
  "id": "contactcenterinsights.projects.locations.dashboards.list",
  "path": "v1/{+parent}/dashboards",
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
  description: z.string().describe("Dashboard description").optional(),
  displayName: z.string().describe(
    "User provided display name of the dashboard.",
  ).optional(),
  filter: z.string().describe(
    "Filter applied to all charts in the dashboard. Should support scope later.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Dashboard resource name. Format: projects/{project}/locations/{location}/dashboards/{dashboard}",
  ).optional(),
  rootContainer: z.object({
    containerId: z.string().describe(
      "Output only. Unique ID for the container.",
    ).optional(),
    dateRangeConfig: z.object({
      absoluteDateRange: z.object({
        endTime: z.string().describe(
          "Required. The end time of the time window.",
        ).optional(),
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
    description: z.string().describe("Container description").optional(),
    displayName: z.string().describe(
      "User provided display name of the Container.",
    ).optional(),
    filter: z.string().describe(
      "Filter applied to all charts in the container. Should support scope later.",
    ).optional(),
    height: z.number().int().describe(
      "The height of the container in grid units.",
    ).optional(),
    widgets: z.array(z.object({
      chart: z.object({
        action: z.object({
          redirectAction: z.unknown().describe(
            "The redirect action to be taken when the chart is clicked.",
          ).optional(),
        }).describe("The action to be taken when the chart is clicked.")
          .optional(),
        chartType: z.enum([
          "CHART_TYPE_UNSPECIFIED",
          "SYSTEM_DEFINED",
          "USER_DEFINED",
        ]).describe("Output only. Chart type.").optional(),
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
        createTime: z.string().describe("Output only. Chart create time.")
          .optional(),
        dataSource: z.object({
          generativeInsights: z.unknown().describe(
            "Request that use natural language query to generate the chart.",
          ).optional(),
          queryMetrics: z.unknown().describe(
            "Request data that use the existing QueryMetrics.",
          ).optional(),
        }).describe(
          "The request data for visualizing the dataset in the chart.",
        ).optional(),
        dateRangeConfig: z.object({
          absoluteDateRange: z.unknown().describe(
            "A time window for querying conversations.",
          ).optional(),
          relativeDateRange: z.unknown().describe(
            "Relative date range configuration.",
          ).optional(),
        }).describe("Date range configuration for dashboard charts.")
          .optional(),
        description: z.string().describe("Chart description").optional(),
        displayName: z.string().describe(
          "User provided display name of the chart.",
        ).optional(),
        filter: z.string().describe(
          "Filter applied to all charts in the container. Should support scope later.",
        ).optional(),
        height: z.number().int().describe(
          "The height of the chart in grid units.",
        ).optional(),
        name: z.string().describe(
          "Identifier. Chart resource name. Format: projects/{project}/locations/{location}/dashboards/{dashboard}/charts/{chart}",
        ).optional(),
        updateTime: z.string().describe("Output only. Chart last update time.")
          .optional(),
        width: z.number().int().describe(
          "The width of the chart in grid units.",
        ).optional(),
      }).describe(
        "Configurable dashboard's widget that displays data as a chart.",
      ).optional(),
      chartReference: z.string().describe(
        "A reference to a chart widget. Format: projects/{project}/locations/{location}/dashboards/{dashboard}/charts/{chart}",
      ).optional(),
      container: z.record(z.string(), z.unknown()).describe(
        "Circular reference to GoogleCloudContactcenterinsightsV1Container",
      ).optional(),
      filter: z.string().describe(
        "Filter applied to all charts in the container. Should support scope later.",
      ).optional(),
    })).describe("Widgets in the Container.").optional(),
    width: z.number().int().describe(
      "The width of the container in grid units.",
    ).optional(),
  }).describe(
    "Configurable dashboard's container. Container can contain multiple widgets.",
  ).optional(),
  dashboardId: z.string().describe(
    "Optional. A unique ID for the new Dashboard. This ID will become the final component of the Dashboard's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
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
  name: z.string(),
  readOnly: z.boolean().optional(),
  rootContainer: z.object({
    containerId: z.string(),
    dateRangeConfig: z.object({
      absoluteDateRange: z.object({
        endTime: z.string(),
        startTime: z.string(),
      }),
      relativeDateRange: z.object({
        quantity: z.string(),
        unit: z.string(),
      }),
    }),
    description: z.string(),
    displayName: z.string(),
    filter: z.string(),
    height: z.number(),
    widgets: z.array(z.object({
      chart: z.object({
        action: z.object({
          redirectAction: z.unknown(),
        }),
        chartType: z.string(),
        chartVisualizationType: z.string(),
        createTime: z.string(),
        dataSource: z.object({
          generativeInsights: z.unknown(),
          queryMetrics: z.unknown(),
        }),
        dateRangeConfig: z.object({
          absoluteDateRange: z.unknown(),
          relativeDateRange: z.unknown(),
        }),
        description: z.string(),
        displayName: z.string(),
        filter: z.string(),
        height: z.number(),
        name: z.string(),
        updateTime: z.string(),
        width: z.number(),
      }),
      chartReference: z.string(),
      container: z.record(z.string(), z.unknown()),
      filter: z.string(),
    })),
    width: z.number(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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
  description: z.string().describe("Dashboard description").optional(),
  displayName: z.string().describe(
    "User provided display name of the dashboard.",
  ).optional(),
  filter: z.string().describe(
    "Filter applied to all charts in the dashboard. Should support scope later.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Dashboard resource name. Format: projects/{project}/locations/{location}/dashboards/{dashboard}",
  ).optional(),
  rootContainer: z.object({
    containerId: z.string().describe(
      "Output only. Unique ID for the container.",
    ).optional(),
    dateRangeConfig: z.object({
      absoluteDateRange: z.object({
        endTime: z.string().describe(
          "Required. The end time of the time window.",
        ).optional(),
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
    description: z.string().describe("Container description").optional(),
    displayName: z.string().describe(
      "User provided display name of the Container.",
    ).optional(),
    filter: z.string().describe(
      "Filter applied to all charts in the container. Should support scope later.",
    ).optional(),
    height: z.number().int().describe(
      "The height of the container in grid units.",
    ).optional(),
    widgets: z.array(z.object({
      chart: z.object({
        action: z.object({
          redirectAction: z.unknown().describe(
            "The redirect action to be taken when the chart is clicked.",
          ).optional(),
        }).describe("The action to be taken when the chart is clicked.")
          .optional(),
        chartType: z.enum([
          "CHART_TYPE_UNSPECIFIED",
          "SYSTEM_DEFINED",
          "USER_DEFINED",
        ]).describe("Output only. Chart type.").optional(),
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
        createTime: z.string().describe("Output only. Chart create time.")
          .optional(),
        dataSource: z.object({
          generativeInsights: z.unknown().describe(
            "Request that use natural language query to generate the chart.",
          ).optional(),
          queryMetrics: z.unknown().describe(
            "Request data that use the existing QueryMetrics.",
          ).optional(),
        }).describe(
          "The request data for visualizing the dataset in the chart.",
        ).optional(),
        dateRangeConfig: z.object({
          absoluteDateRange: z.unknown().describe(
            "A time window for querying conversations.",
          ).optional(),
          relativeDateRange: z.unknown().describe(
            "Relative date range configuration.",
          ).optional(),
        }).describe("Date range configuration for dashboard charts.")
          .optional(),
        description: z.string().describe("Chart description").optional(),
        displayName: z.string().describe(
          "User provided display name of the chart.",
        ).optional(),
        filter: z.string().describe(
          "Filter applied to all charts in the container. Should support scope later.",
        ).optional(),
        height: z.number().int().describe(
          "The height of the chart in grid units.",
        ).optional(),
        name: z.string().describe(
          "Identifier. Chart resource name. Format: projects/{project}/locations/{location}/dashboards/{dashboard}/charts/{chart}",
        ).optional(),
        updateTime: z.string().describe("Output only. Chart last update time.")
          .optional(),
        width: z.number().int().describe(
          "The width of the chart in grid units.",
        ).optional(),
      }).describe(
        "Configurable dashboard's widget that displays data as a chart.",
      ).optional(),
      chartReference: z.string().describe(
        "A reference to a chart widget. Format: projects/{project}/locations/{location}/dashboards/{dashboard}/charts/{chart}",
      ).optional(),
      container: z.record(z.string(), z.unknown()).describe(
        "Circular reference to GoogleCloudContactcenterinsightsV1Container",
      ).optional(),
      filter: z.string().describe(
        "Filter applied to all charts in the container. Should support scope later.",
      ).optional(),
    })).describe("Widgets in the Container.").optional(),
    width: z.number().int().describe(
      "The width of the container in grid units.",
    ).optional(),
  }).describe(
    "Configurable dashboard's container. Container can contain multiple widgets.",
  ).optional(),
  dashboardId: z.string().describe(
    "Optional. A unique ID for the new Dashboard. This ID will become the final component of the Dashboard's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`.",
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

/** Swamp extension model for Google Cloud Contact Center AI Insights Dashboards. Registered at `@swamp/gcp/contactcenterinsights/dashboards`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/dashboards",
  version: "2026.06.08.1",
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
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Configurable dashboard",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a dashboards",
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
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rootContainer"] !== undefined) {
          body["rootContainer"] = g["rootContainer"];
        }
        if (g["dashboardId"] !== undefined) {
          body["dashboardId"] = g["dashboardId"];
        }
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
      description: "Get a dashboards",
      arguments: z.object({
        identifier: z.string().describe("The name of the dashboards"),
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
      description: "Update dashboards attributes",
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
        if (g["rootContainer"] !== undefined) {
          body["rootContainer"] = g["rootContainer"];
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
      description: "Delete the dashboards",
      arguments: z.object({
        identifier: z.string().describe("The name of the dashboards"),
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
      description: "Sync dashboards state from GCP",
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
      description: "List dashboards resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. The filter expression to filter dashboards listed in the response.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. The order by expression to order dashboards listed in the response.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of dashboards to return. The service may return fewer than this value. The default and maximum value is 100.",
        ).optional(),
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
          BASE_URL,
          LIST_CONFIG,
          params,
          "dashboards",
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
