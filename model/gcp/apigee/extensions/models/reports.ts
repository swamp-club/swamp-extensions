// Auto-generated extension model for @swamp/gcp/apigee/reports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee Reports.
 *
 * Retrieve a custom report definition.
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
  return `${parent}/reports/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.reports.get",
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
  "id": "apigee.organizations.reports.create",
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

const UPDATE_CONFIG = {
  "id": "apigee.organizations.reports.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "apigee.organizations.reports.delete",
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
  chartType: z.string().describe(
    "This field contains the chart type for the report",
  ).optional(),
  comments: z.array(z.string()).describe(
    "Legacy field: not used. This field contains a list of comments associated with custom report",
  ).optional(),
  dimensions: z.array(z.string()).describe(
    "This contains the list of dimensions for the report",
  ).optional(),
  displayName: z.string().describe("This is the display name for the report")
    .optional(),
  filter: z.string().describe("This field contains the filter expression")
    .optional(),
  fromTime: z.string().describe(
    "Legacy field: not used. Contains the from time for the report",
  ).optional(),
  limit: z.string().describe(
    "Legacy field: not used This field contains the limit for the result retrieved",
  ).optional(),
  metrics: z.array(z.object({
    function: z.string().describe("aggregate function").optional(),
    name: z.string().describe("name of the metric").optional(),
  })).describe("Required. This contains the list of metrics").optional(),
  name: z.string().describe(
    "Required. Unique identifier for the report T his is a legacy field used to encode custom report unique id",
  ).optional(),
  offset: z.string().describe(
    "Legacy field: not used. This field contains the offset for the data",
  ).optional(),
  properties: z.array(z.object({
    property: z.string().describe("name of the property").optional(),
    value: z.array(z.object({
      name: z.string().describe("API key of the attribute.").optional(),
      value: z.string().describe("Value of the attribute.").optional(),
    })).describe("property values").optional(),
  })).describe("This field contains report properties such as ui metadata etc.")
    .optional(),
  sortByCols: z.array(z.string()).describe(
    "Legacy field: not used much. Contains the list of sort by columns",
  ).optional(),
  sortOrder: z.string().describe(
    "Legacy field: not used much. Contains the sort order for the sort columns",
  ).optional(),
  tags: z.array(z.string()).describe(
    "Legacy field: not used. This field contains a list of tags associated with custom report",
  ).optional(),
  timeUnit: z.string().describe(
    "This field contains the time unit of aggregation for the report",
  ).optional(),
  toTime: z.string().describe(
    "Legacy field: not used. Contains the end time for the report",
  ).optional(),
  topk: z.string().describe(
    "Legacy field: not used. This field contains the top k parameter value for restricting the result",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  chartType: z.string().optional(),
  comments: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  dimensions: z.array(z.string()).optional(),
  displayName: z.string().optional(),
  environment: z.string().optional(),
  filter: z.string().optional(),
  fromTime: z.string().optional(),
  lastModifiedAt: z.string().optional(),
  lastViewedAt: z.string().optional(),
  limit: z.string().optional(),
  metrics: z.array(z.object({
    function: z.string(),
    name: z.string(),
  })).optional(),
  name: z.string(),
  offset: z.string().optional(),
  organization: z.string().optional(),
  properties: z.array(z.object({
    property: z.string(),
    value: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
  })).optional(),
  sortByCols: z.array(z.string()).optional(),
  sortOrder: z.string().optional(),
  tags: z.array(z.string()).optional(),
  timeUnit: z.string().optional(),
  toTime: z.string().optional(),
  topk: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  chartType: z.string().describe(
    "This field contains the chart type for the report",
  ).optional(),
  comments: z.array(z.string()).describe(
    "Legacy field: not used. This field contains a list of comments associated with custom report",
  ).optional(),
  dimensions: z.array(z.string()).describe(
    "This contains the list of dimensions for the report",
  ).optional(),
  displayName: z.string().describe("This is the display name for the report")
    .optional(),
  filter: z.string().describe("This field contains the filter expression")
    .optional(),
  fromTime: z.string().describe(
    "Legacy field: not used. Contains the from time for the report",
  ).optional(),
  limit: z.string().describe(
    "Legacy field: not used This field contains the limit for the result retrieved",
  ).optional(),
  metrics: z.array(z.object({
    function: z.string().describe("aggregate function").optional(),
    name: z.string().describe("name of the metric").optional(),
  })).describe("Required. This contains the list of metrics").optional(),
  name: z.string().describe(
    "Required. Unique identifier for the report T his is a legacy field used to encode custom report unique id",
  ).optional(),
  offset: z.string().describe(
    "Legacy field: not used. This field contains the offset for the data",
  ).optional(),
  properties: z.array(z.object({
    property: z.string().describe("name of the property").optional(),
    value: z.array(z.object({
      name: z.string().describe("API key of the attribute.").optional(),
      value: z.string().describe("Value of the attribute.").optional(),
    })).describe("property values").optional(),
  })).describe("This field contains report properties such as ui metadata etc.")
    .optional(),
  sortByCols: z.array(z.string()).describe(
    "Legacy field: not used much. Contains the list of sort by columns",
  ).optional(),
  sortOrder: z.string().describe(
    "Legacy field: not used much. Contains the sort order for the sort columns",
  ).optional(),
  tags: z.array(z.string()).describe(
    "Legacy field: not used. This field contains a list of tags associated with custom report",
  ).optional(),
  timeUnit: z.string().describe(
    "This field contains the time unit of aggregation for the report",
  ).optional(),
  toTime: z.string().describe(
    "Legacy field: not used. Contains the end time for the report",
  ).optional(),
  topk: z.string().describe(
    "Legacy field: not used. This field contains the top k parameter value for restricting the result",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee Reports. Registered at `@swamp/gcp/apigee/reports`. */
export const model = {
  type: "@swamp/gcp/apigee/reports",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Retrieve a custom report definition.",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["chartType"] !== undefined) body["chartType"] = g["chartType"];
        if (g["comments"] !== undefined) body["comments"] = g["comments"];
        if (g["dimensions"] !== undefined) body["dimensions"] = g["dimensions"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["fromTime"] !== undefined) body["fromTime"] = g["fromTime"];
        if (g["limit"] !== undefined) body["limit"] = g["limit"];
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["offset"] !== undefined) body["offset"] = g["offset"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["sortByCols"] !== undefined) body["sortByCols"] = g["sortByCols"];
        if (g["sortOrder"] !== undefined) body["sortOrder"] = g["sortOrder"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["timeUnit"] !== undefined) body["timeUnit"] = g["timeUnit"];
        if (g["toTime"] !== undefined) body["toTime"] = g["toTime"];
        if (g["topk"] !== undefined) body["topk"] = g["topk"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
      description: "Get a reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Update reports attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["chartType"] !== undefined) body["chartType"] = g["chartType"];
        if (g["comments"] !== undefined) body["comments"] = g["comments"];
        if (g["dimensions"] !== undefined) body["dimensions"] = g["dimensions"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["fromTime"] !== undefined) body["fromTime"] = g["fromTime"];
        if (g["limit"] !== undefined) body["limit"] = g["limit"];
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["offset"] !== undefined) body["offset"] = g["offset"];
        if (g["properties"] !== undefined) body["properties"] = g["properties"];
        if (g["sortByCols"] !== undefined) body["sortByCols"] = g["sortByCols"];
        if (g["sortOrder"] !== undefined) body["sortOrder"] = g["sortOrder"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["timeUnit"] !== undefined) body["timeUnit"] = g["timeUnit"];
        if (g["toTime"] !== undefined) body["toTime"] = g["toTime"];
        if (g["topk"] !== undefined) body["topk"] = g["topk"];
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
          UPDATE_CONFIG,
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
      description: "Delete the reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync reports state from GCP",
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
            String(g["parent"] ?? ""),
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
