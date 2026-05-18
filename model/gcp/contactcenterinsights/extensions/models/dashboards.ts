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
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
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
      container: z.string().describe(
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
      container: z.string(),
      filter: z.string(),
    })),
    width: z.number(),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
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
      container: z.string().describe(
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

/** Swamp extension model for Google Cloud Contact Center AI Insights Dashboards. Registered at `@swamp/gcp/contactcenterinsights/dashboards`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/dashboards",
  version: "2026.05.18.2",
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
        const projectId = await getProjectId();
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync dashboards state from GCP",
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
