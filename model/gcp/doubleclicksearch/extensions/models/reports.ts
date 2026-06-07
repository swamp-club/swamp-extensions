// Auto-generated extension model for @swamp/gcp/doubleclicksearch/reports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Search Ads 360 Reports.
 *
 * A DoubleClick Search report. This object contains the report request, some report metadata such as currency code, and the generated report rows or report files.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://doubleclicksearch.googleapis.com/";

const GET_CONFIG = {
  "id": "doubleclicksearch.reports.get",
  "path": "doubleclicksearch/v2/reports/{reportId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "reportId",
  ],
  "parameters": {
    "reportId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

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
});

const StateSchema = z.object({
  files: z.array(z.object({
    byteCount: z.string(),
    url: z.string(),
  })).optional(),
  id: z.string().optional(),
  isReportReady: z.boolean().optional(),
  kind: z.string().optional(),
  request: z.object({
    columns: z.array(z.object({
      columnName: z.string(),
      customDimensionName: z.string(),
      customMetricName: z.string(),
      endDate: z.string(),
      groupByColumn: z.boolean(),
      headerText: z.string(),
      platformSource: z.string(),
      productReportPerspective: z.string(),
      savedColumnName: z.string(),
      startDate: z.string(),
    })),
    downloadFormat: z.string(),
    filters: z.array(z.object({
      column: z.object({
        columnName: z.string(),
        customDimensionName: z.string(),
        customMetricName: z.string(),
        endDate: z.string(),
        groupByColumn: z.boolean(),
        headerText: z.string(),
        platformSource: z.string(),
        productReportPerspective: z.string(),
        savedColumnName: z.string(),
        startDate: z.string(),
      }),
      operator: z.string(),
      values: z.array(z.string()),
    })),
    includeDeletedEntities: z.boolean(),
    includeRemovedEntities: z.boolean(),
    maxRowsPerFile: z.number(),
    orderBy: z.array(z.object({
      column: z.object({
        columnName: z.string(),
        customDimensionName: z.string(),
        customMetricName: z.string(),
        endDate: z.string(),
        groupByColumn: z.boolean(),
        headerText: z.string(),
        platformSource: z.string(),
        productReportPerspective: z.string(),
        savedColumnName: z.string(),
        startDate: z.string(),
      }),
      sortOrder: z.string(),
    })),
    reportScope: z.object({
      adGroupId: z.string(),
      adId: z.string(),
      advertiserId: z.string(),
      agencyId: z.string(),
      campaignId: z.string(),
      engineAccountId: z.string(),
      keywordId: z.string(),
    }),
    reportType: z.string(),
    rowCount: z.number(),
    startRow: z.number(),
    statisticsCurrency: z.string(),
    timeRange: z.object({
      changedAttributesSinceTimestamp: z.string(),
      changedMetricsSinceTimestamp: z.string(),
      endDate: z.string(),
      startDate: z.string(),
    }),
    verifySingleTimeZone: z.boolean(),
  }).optional(),
  rowCount: z.number().optional(),
  rows: z.array(z.record(z.string(), z.unknown())).optional(),
  statisticsCurrencyCode: z.string().optional(),
  statisticsTimeZone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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

/** Swamp extension model for Google Cloud Search Ads 360 Reports. Registered at `@swamp/gcp/doubleclicksearch/reports`. */
export const model = {
  type: "@swamp/gcp/doubleclicksearch/reports",
  version: "2026.06.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A DoubleClick Search report. This object contains the report request, some re...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a reports",
      arguments: z.object({
        identifier: z.string().describe("The name of the reports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["reportId"] = args.identifier;
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
      description: "Sync reports state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["reportId"] = identifier;
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
    generate: {
      description: "generate",
      arguments: z.object({
        columns: z.any().optional(),
        downloadFormat: z.any().optional(),
        filters: z.any().optional(),
        includeDeletedEntities: z.any().optional(),
        includeRemovedEntities: z.any().optional(),
        maxRowsPerFile: z.any().optional(),
        orderBy: z.any().optional(),
        reportScope: z.any().optional(),
        reportType: z.any().optional(),
        rowCount: z.any().optional(),
        startRow: z.any().optional(),
        statisticsCurrency: z.any().optional(),
        timeRange: z.any().optional(),
        verifySingleTimeZone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["columns"] !== undefined) body["columns"] = args["columns"];
        if (args["downloadFormat"] !== undefined) {
          body["downloadFormat"] = args["downloadFormat"];
        }
        if (args["filters"] !== undefined) body["filters"] = args["filters"];
        if (args["includeDeletedEntities"] !== undefined) {
          body["includeDeletedEntities"] = args["includeDeletedEntities"];
        }
        if (args["includeRemovedEntities"] !== undefined) {
          body["includeRemovedEntities"] = args["includeRemovedEntities"];
        }
        if (args["maxRowsPerFile"] !== undefined) {
          body["maxRowsPerFile"] = args["maxRowsPerFile"];
        }
        if (args["orderBy"] !== undefined) body["orderBy"] = args["orderBy"];
        if (args["reportScope"] !== undefined) {
          body["reportScope"] = args["reportScope"];
        }
        if (args["reportType"] !== undefined) {
          body["reportType"] = args["reportType"];
        }
        if (args["rowCount"] !== undefined) body["rowCount"] = args["rowCount"];
        if (args["startRow"] !== undefined) body["startRow"] = args["startRow"];
        if (args["statisticsCurrency"] !== undefined) {
          body["statisticsCurrency"] = args["statisticsCurrency"];
        }
        if (args["timeRange"] !== undefined) {
          body["timeRange"] = args["timeRange"];
        }
        if (args["verifySingleTimeZone"] !== undefined) {
          body["verifySingleTimeZone"] = args["verifySingleTimeZone"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "doubleclicksearch.reports.generate",
            "path": "doubleclicksearch/v2/reports/generate",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
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
    get_file: {
      description: "get file",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["reportId"] = existing["reportId"]?.toString() ??
          g["reportId"]?.toString() ?? "";
        params["reportFragment"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "doubleclicksearch.reports.getFile",
            "path":
              "doubleclicksearch/v2/reports/{reportId}/files/{reportFragment}",
            "httpMethod": "GET",
            "parameterOrder": ["reportId", "reportFragment"],
            "parameters": {
              "reportFragment": { "location": "path", "required": true },
              "reportId": { "location": "path", "required": true },
            },
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
    get_id_mapping_file: {
      description: "get id mapping file",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
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
        params["agencyId"] = existing["agencyId"]?.toString() ??
          g["agencyId"]?.toString() ?? "";
        params["advertiserId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "doubleclicksearch.reports.getIdMappingFile",
            "path":
              "doubleclicksearch/v2/agency/{agencyId}/advertiser/{advertiserId}/idmapping",
            "httpMethod": "GET",
            "parameterOrder": ["agencyId", "advertiserId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "agencyId": { "location": "path", "required": true },
            },
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
    request: {
      description: "request",
      arguments: z.object({
        columns: z.any().optional(),
        downloadFormat: z.any().optional(),
        filters: z.any().optional(),
        includeDeletedEntities: z.any().optional(),
        includeRemovedEntities: z.any().optional(),
        maxRowsPerFile: z.any().optional(),
        orderBy: z.any().optional(),
        reportScope: z.any().optional(),
        reportType: z.any().optional(),
        rowCount: z.any().optional(),
        startRow: z.any().optional(),
        statisticsCurrency: z.any().optional(),
        timeRange: z.any().optional(),
        verifySingleTimeZone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["columns"] !== undefined) body["columns"] = args["columns"];
        if (args["downloadFormat"] !== undefined) {
          body["downloadFormat"] = args["downloadFormat"];
        }
        if (args["filters"] !== undefined) body["filters"] = args["filters"];
        if (args["includeDeletedEntities"] !== undefined) {
          body["includeDeletedEntities"] = args["includeDeletedEntities"];
        }
        if (args["includeRemovedEntities"] !== undefined) {
          body["includeRemovedEntities"] = args["includeRemovedEntities"];
        }
        if (args["maxRowsPerFile"] !== undefined) {
          body["maxRowsPerFile"] = args["maxRowsPerFile"];
        }
        if (args["orderBy"] !== undefined) body["orderBy"] = args["orderBy"];
        if (args["reportScope"] !== undefined) {
          body["reportScope"] = args["reportScope"];
        }
        if (args["reportType"] !== undefined) {
          body["reportType"] = args["reportType"];
        }
        if (args["rowCount"] !== undefined) body["rowCount"] = args["rowCount"];
        if (args["startRow"] !== undefined) body["startRow"] = args["startRow"];
        if (args["statisticsCurrency"] !== undefined) {
          body["statisticsCurrency"] = args["statisticsCurrency"];
        }
        if (args["timeRange"] !== undefined) {
          body["timeRange"] = args["timeRange"];
        }
        if (args["verifySingleTimeZone"] !== undefined) {
          body["verifySingleTimeZone"] = args["verifySingleTimeZone"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "doubleclicksearch.reports.request",
            "path": "doubleclicksearch/v2/reports",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
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
