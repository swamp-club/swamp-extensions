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

// Auto-generated extension model for @swamp/gcp/bigquery/tabledata
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud BigQuery Tabledata.
 *
 * List the content of a table in rows.
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
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://bigquery.googleapis.com/bigquery/v2/";

const LIST_CONFIG = {
  "id": "bigquery.tabledata.list",
  "path": "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/data",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "datasetId",
    "tableId",
  ],
  "parameters": {
    "datasetId": {
      "location": "path",
      "required": true,
    },
    "formatOptions.timestampOutputFormat": {
      "location": "query",
    },
    "formatOptions.useInt64Timestamp": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "selectedFields": {
      "location": "query",
    },
    "startIndex": {
      "location": "query",
    },
    "tableId": {
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
  f: z.array(z.object({
    v: z.string(),
  })).optional(),
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

/** Swamp extension model for Google Cloud BigQuery Tabledata. Registered at `@swamp/gcp/bigquery/tabledata`. */
export const model = {
  type: "@swamp/gcp/bigquery/tabledata",
  version: "2026.06.08.1",
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
      description: "List the content of a table in rows.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a tabledata",
      arguments: z.object({
        identifier: z.string().describe("The name of the tabledata"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        }
        if (g["tableId"] !== undefined) {
          params["tableId"] = String(g["tableId"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync tabledata state from GCP",
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
          if (g["datasetId"] !== undefined) {
            params["datasetId"] = String(g["datasetId"]);
          } else if (existing["datasetId"]) {
            params["datasetId"] = String(existing["datasetId"]);
          }
          if (g["tableId"] !== undefined) {
            params["tableId"] = String(g["tableId"]);
          } else if (existing["tableId"]) {
            params["tableId"] = String(existing["tableId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List tabledata resources",
      arguments: z.object({
        formatOptions_timestampOutputFormat: z.string().describe(
          "Optional. The API output format for a timestamp. This offers more explicit control over the timestamp output format as compared to the existing `use_int64_timestamp` option.",
        ).optional(),
        formatOptions_useInt64Timestamp: z.boolean().describe(
          "Optional. Output timestamp as usec int64. Default is false.",
        ).optional(),
        maxResults: z.number().describe("Row limit of the table.").optional(),
        selectedFields: z.string().describe(
          'Subset of fields to return, supports select into sub fields. Example: selected_fields = "a,e.d.f";',
        ).optional(),
        startIndex: z.string().describe("Start row index of the table.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["datasetId"] !== undefined) {
          params["datasetId"] = String(g["datasetId"]);
        }
        if (g["tableId"] !== undefined) {
          params["tableId"] = String(g["tableId"]);
        }
        if (args["formatOptions_timestampOutputFormat"] !== undefined) {
          params["formatOptions.timestampOutputFormat"] = String(
            args["formatOptions_timestampOutputFormat"],
          );
        }
        if (args["formatOptions_useInt64Timestamp"] !== undefined) {
          params["formatOptions.useInt64Timestamp"] = String(
            args["formatOptions_useInt64Timestamp"],
          );
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["selectedFields"] !== undefined) {
          params["selectedFields"] = String(args["selectedFields"]);
        }
        if (args["startIndex"] !== undefined) {
          params["startIndex"] = String(args["startIndex"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "rows",
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
    insert_all: {
      description: "insert all",
      arguments: z.object({
        ignoreUnknownValues: z.any().optional(),
        kind: z.any().optional(),
        rows: z.any().optional(),
        skipInvalidRows: z.any().optional(),
        templateSuffix: z.any().optional(),
        traceId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
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
        params["datasetId"] = existing["datasetId"]?.toString() ??
          g["datasetId"]?.toString() ?? "";
        params["tableId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["ignoreUnknownValues"] !== undefined) {
          body["ignoreUnknownValues"] = args["ignoreUnknownValues"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["rows"] !== undefined) body["rows"] = args["rows"];
        if (args["skipInvalidRows"] !== undefined) {
          body["skipInvalidRows"] = args["skipInvalidRows"];
        }
        if (args["templateSuffix"] !== undefined) {
          body["templateSuffix"] = args["templateSuffix"];
        }
        if (args["traceId"] !== undefined) body["traceId"] = args["traceId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigquery.tabledata.insertAll",
            "path":
              "projects/{+projectId}/datasets/{+datasetId}/tables/{+tableId}/insertAll",
            "httpMethod": "POST",
            "parameterOrder": ["projectId", "datasetId", "tableId"],
            "parameters": {
              "datasetId": { "location": "path", "required": true },
              "projectId": { "location": "path", "required": true },
              "tableId": { "location": "path", "required": true },
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
