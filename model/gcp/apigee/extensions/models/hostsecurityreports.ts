// Auto-generated extension model for @swamp/gcp/apigee/hostsecurityreports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Apigee HostSecurityReports.
 *
 * SecurityReport saves all the information about the created security report.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/hostSecurityReports/${shortName}`;
}

const BASE_URL = "https://apigee.googleapis.com/";

const GET_CONFIG = {
  "id": "apigee.organizations.hostSecurityReports.get",
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
  "id": "apigee.organizations.hostSecurityReports.create",
  "path": "v1/{+parent}/hostSecurityReports",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  csvDelimiter: z.string().describe(
    "Delimiter used in the CSV file, if `outputFormat` is set to `csv`. Defaults to the `,` (comma) character. Supported delimiter characters include comma (`,`), pipe (`|`), and tab (`\\t`).",
  ).optional(),
  dimensions: z.array(z.string()).describe(
    "A list of dimensions. https://docs.apigee.com/api-platform/analytics/analytics-reference#dimensions",
  ).optional(),
  displayName: z.string().describe(
    "Security Report display name which users can specify.",
  ).optional(),
  envgroupHostname: z.string().describe(
    "Hostname needs to be specified if query intends to run at host level. This field is only allowed when query is submitted by CreateHostSecurityReport where analytics data will be grouped by organization and hostname.",
  ).optional(),
  filter: z.string().describe(
    "Boolean expression that can be used to filter data. Filter expressions can be combined using AND/OR terms and should be fully parenthesized to avoid ambiguity. See Analytics metrics, dimensions, and filters reference https://docs.apigee.com/api-platform/analytics/analytics-reference for more information on the fields available to filter on. For more information on the tokens that you use to build filter expressions, see Filter expression syntax. https://docs.apigee.com/api-platform/analytics/asynch-reports-api#filter-expression-syntax",
  ).optional(),
  groupByTimeUnit: z.string().describe(
    "Time unit used to group the result set. Valid values include: second, minute, hour, day, week, or month. If a query includes groupByTimeUnit, then the result is an aggregation based on the specified time unit and the resultant timestamp does not include milliseconds precision. If a query omits groupByTimeUnit, then the resultant timestamp includes milliseconds precision.",
  ).optional(),
  limit: z.number().int().describe(
    "Maximum number of rows that can be returned in the result.",
  ).optional(),
  metrics: z.array(z.object({
    aggregationFunction: z.string().describe(
      "Aggregation function: avg, min, max, or sum.",
    ).optional(),
    alias: z.string().describe(
      "Alias for the metric. Alias will be used to replace metric name in query results.",
    ).optional(),
    name: z.string().describe("Required. Metric name.").optional(),
    operator: z.string().describe("One of `+`, `-`, `/`, `%`, `*`.").optional(),
    value: z.string().describe(
      "Operand value should be provided when operator is set.",
    ).optional(),
  })).describe("A list of Metrics.").optional(),
  mimeType: z.string().describe(
    "Valid values include: `csv` or `json`. Defaults to `json`. Note: Configure the delimiter for CSV output using the csvDelimiter property.",
  ).optional(),
  reportDefinitionId: z.string().describe("Report Definition ID.").optional(),
  timeRange: z.string().describe(
    'Required. Time range for the query. Can use the following predefined strings to specify the time range: `last60minutes` `last24hours` `last7days` Or, specify the timeRange as a structure describing start and end timestamps in the ISO format: yyyy-mm-ddThh:mm:ssZ. Example: "timeRange": { "start": "2018-07-29T00:13:00Z", "end": "2018-08-01T00:18:00Z" }',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  created: z.string().optional(),
  displayName: z.string().optional(),
  envgroupHostname: z.string().optional(),
  error: z.string().optional(),
  executionTime: z.string().optional(),
  queryParams: z.object({
    dimensions: z.array(z.string()),
    endTimestamp: z.string(),
    metrics: z.array(z.string()),
    mimeType: z.string(),
    startTimestamp: z.string(),
    timeUnit: z.string(),
  }).optional(),
  reportDefinitionId: z.string().optional(),
  result: z.object({
    expires: z.string(),
    self: z.string(),
  }).optional(),
  resultFileSize: z.string().optional(),
  resultRows: z.string().optional(),
  self: z.string().optional(),
  state: z.string().optional(),
  updated: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  csvDelimiter: z.string().describe(
    "Delimiter used in the CSV file, if `outputFormat` is set to `csv`. Defaults to the `,` (comma) character. Supported delimiter characters include comma (`,`), pipe (`|`), and tab (`\\t`).",
  ).optional(),
  dimensions: z.array(z.string()).describe(
    "A list of dimensions. https://docs.apigee.com/api-platform/analytics/analytics-reference#dimensions",
  ).optional(),
  displayName: z.string().describe(
    "Security Report display name which users can specify.",
  ).optional(),
  envgroupHostname: z.string().describe(
    "Hostname needs to be specified if query intends to run at host level. This field is only allowed when query is submitted by CreateHostSecurityReport where analytics data will be grouped by organization and hostname.",
  ).optional(),
  filter: z.string().describe(
    "Boolean expression that can be used to filter data. Filter expressions can be combined using AND/OR terms and should be fully parenthesized to avoid ambiguity. See Analytics metrics, dimensions, and filters reference https://docs.apigee.com/api-platform/analytics/analytics-reference for more information on the fields available to filter on. For more information on the tokens that you use to build filter expressions, see Filter expression syntax. https://docs.apigee.com/api-platform/analytics/asynch-reports-api#filter-expression-syntax",
  ).optional(),
  groupByTimeUnit: z.string().describe(
    "Time unit used to group the result set. Valid values include: second, minute, hour, day, week, or month. If a query includes groupByTimeUnit, then the result is an aggregation based on the specified time unit and the resultant timestamp does not include milliseconds precision. If a query omits groupByTimeUnit, then the resultant timestamp includes milliseconds precision.",
  ).optional(),
  limit: z.number().int().describe(
    "Maximum number of rows that can be returned in the result.",
  ).optional(),
  metrics: z.array(z.object({
    aggregationFunction: z.string().describe(
      "Aggregation function: avg, min, max, or sum.",
    ).optional(),
    alias: z.string().describe(
      "Alias for the metric. Alias will be used to replace metric name in query results.",
    ).optional(),
    name: z.string().describe("Required. Metric name.").optional(),
    operator: z.string().describe("One of `+`, `-`, `/`, `%`, `*`.").optional(),
    value: z.string().describe(
      "Operand value should be provided when operator is set.",
    ).optional(),
  })).describe("A list of Metrics.").optional(),
  mimeType: z.string().describe(
    "Valid values include: `csv` or `json`. Defaults to `json`. Note: Configure the delimiter for CSV output using the csvDelimiter property.",
  ).optional(),
  reportDefinitionId: z.string().describe("Report Definition ID.").optional(),
  timeRange: z.string().describe(
    'Required. Time range for the query. Can use the following predefined strings to specify the time range: `last60minutes` `last24hours` `last7days` Or, specify the timeRange as a structure describing start and end timestamps in the ISO format: yyyy-mm-ddThh:mm:ssZ. Example: "timeRange": { "start": "2018-07-29T00:13:00Z", "end": "2018-08-01T00:18:00Z" }',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Apigee HostSecurityReports. Registered at `@swamp/gcp/apigee/hostsecurityreports`. */
export const model = {
  type: "@swamp/gcp/apigee/hostsecurityreports",
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
      description:
        "SecurityReport saves all the information about the created security report.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a hostSecurityReports",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["csvDelimiter"] !== undefined) {
          body["csvDelimiter"] = g["csvDelimiter"];
        }
        if (g["dimensions"] !== undefined) body["dimensions"] = g["dimensions"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["envgroupHostname"] !== undefined) {
          body["envgroupHostname"] = g["envgroupHostname"];
        }
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["groupByTimeUnit"] !== undefined) {
          body["groupByTimeUnit"] = g["groupByTimeUnit"];
        }
        if (g["limit"] !== undefined) body["limit"] = g["limit"];
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["mimeType"] !== undefined) body["mimeType"] = g["mimeType"];
        if (g["reportDefinitionId"] !== undefined) {
          body["reportDefinitionId"] = g["reportDefinitionId"];
        }
        if (g["timeRange"] !== undefined) body["timeRange"] = g["timeRange"];
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
      description: "Get a hostSecurityReports",
      arguments: z.object({
        identifier: z.string().describe("The name of the hostSecurityReports"),
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
      description: "Sync hostSecurityReports state from GCP",
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
    get_result: {
      description: "get result",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.hostSecurityReports.getResult",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_result_view: {
      description: "get result view",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "apigee.organizations.hostSecurityReports.getResultView",
            "path": "v1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
