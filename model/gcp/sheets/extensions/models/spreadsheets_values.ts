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

// Auto-generated extension model for @swamp/gcp/sheets/spreadsheets-values
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Sheets Spreadsheets.Values.
 *
 * Data within a range of the spreadsheet.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://sheets.googleapis.com/";

const GET_CONFIG = {
  "id": "sheets.spreadsheets.values.get",
  "path": "v4/spreadsheets/{spreadsheetId}/values/{range}",
  "httpMethod": "GET",
  "parameterOrder": [
    "spreadsheetId",
    "range",
  ],
  "parameters": {
    "dateTimeRenderOption": {
      "location": "query",
    },
    "majorDimension": {
      "location": "query",
    },
    "range": {
      "location": "path",
      "required": true,
    },
    "spreadsheetId": {
      "location": "path",
      "required": true,
    },
    "valueRenderOption": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "sheets.spreadsheets.values.update",
  "path": "v4/spreadsheets/{spreadsheetId}/values/{range}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "spreadsheetId",
    "range",
  ],
  "parameters": {
    "includeValuesInResponse": {
      "location": "query",
    },
    "range": {
      "location": "path",
      "required": true,
    },
    "responseDateTimeRenderOption": {
      "location": "query",
    },
    "responseValueRenderOption": {
      "location": "query",
    },
    "spreadsheetId": {
      "location": "path",
      "required": true,
    },
    "valueInputOption": {
      "location": "query",
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
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
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).describe(
    "The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS.",
  ).optional(),
  range: z.string().describe(
    "The range the values cover, in [A1 notation](https://developers.google.com/workspace/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended.",
  ).optional(),
  values: z.array(z.array(z.string())).describe(
    "The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string.",
  ).optional(),
  spreadsheetId: z.string().describe(
    "The ID of the spreadsheet to retrieve data from.",
  ),
  includeValuesInResponse: z.string().describe(
    "Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns).",
  ).optional(),
  responseDateTimeRenderOption: z.string().describe(
    "Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.",
  ).optional(),
  responseValueRenderOption: z.string().describe(
    "Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.",
  ).optional(),
  valueInputOption: z.string().describe(
    "How the input data should be interpreted.",
  ).optional(),
});

const StateSchema = z.object({
  majorDimension: z.string().optional(),
  range: z.string().optional(),
  values: z.array(z.array(z.string())).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).describe(
    "The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS.",
  ).optional(),
  range: z.string().describe(
    "The range the values cover, in [A1 notation](https://developers.google.com/workspace/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended.",
  ).optional(),
  values: z.array(z.array(z.string())).describe(
    "The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string.",
  ).optional(),
  spreadsheetId: z.string().describe(
    "The ID of the spreadsheet to retrieve data from.",
  ).optional(),
  includeValuesInResponse: z.string().describe(
    "Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns).",
  ).optional(),
  responseDateTimeRenderOption: z.string().describe(
    "Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.",
  ).optional(),
  responseValueRenderOption: z.string().describe(
    "Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.",
  ).optional(),
  valueInputOption: z.string().describe(
    "How the input data should be interpreted.",
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

/** Swamp extension model for Google Cloud Google Sheets Spreadsheets.Values. Registered at `@swamp/gcp/sheets/spreadsheets-values`. */
export const model = {
  type: "@swamp/gcp/sheets/spreadsheets-values",
  version: "2026.09.29.1",
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
      toVersion: "2026.07.19.2",
      description: "Added: spreadsheetId",
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
      toVersion: "2026.08.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description:
        "Added: includeValuesInResponse, responseDateTimeRenderOption, responseValueRenderOption, valueInputOption",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Data within a range of the spreadsheet.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a values",
      arguments: z.object({
        identifier: z.string().describe("The name of the values"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        params["range"] = args.identifier;
        const result = await readResource(
          baseUrl,
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
    update: {
      description: "Update values attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific values by name (e.g. one discovered by list)",
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
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        } else if (existing["spreadsheetId"]) {
          params["spreadsheetId"] = String(existing["spreadsheetId"]);
        }
        params["range"] = existing["range"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["majorDimension"] !== undefined) {
          body["majorDimension"] = g["majorDimension"];
        }
        if (g["values"] !== undefined) body["values"] = g["values"];
        if (g["includeValuesInResponse"] !== undefined) {
          params["includeValuesInResponse"] = String(
            g["includeValuesInResponse"],
          );
        } else if (existing["includeValuesInResponse"] !== undefined) {
          params["includeValuesInResponse"] = String(
            existing["includeValuesInResponse"],
          );
        }
        if (g["responseDateTimeRenderOption"] !== undefined) {
          params["responseDateTimeRenderOption"] = String(
            g["responseDateTimeRenderOption"],
          );
        } else if (existing["responseDateTimeRenderOption"] !== undefined) {
          params["responseDateTimeRenderOption"] = String(
            existing["responseDateTimeRenderOption"],
          );
        }
        if (g["responseValueRenderOption"] !== undefined) {
          params["responseValueRenderOption"] = String(
            g["responseValueRenderOption"],
          );
        } else if (existing["responseValueRenderOption"] !== undefined) {
          params["responseValueRenderOption"] = String(
            existing["responseValueRenderOption"],
          );
        }
        if (g["valueInputOption"] !== undefined) {
          params["valueInputOption"] = String(g["valueInputOption"]);
        } else if (existing["valueInputOption"] !== undefined) {
          params["valueInputOption"] = String(existing["valueInputOption"]);
        }
        let live: Record<string, unknown> | undefined;
        const unset = ["majorDimension", "values"].filter((k) =>
          body[k] === undefined
        );
        if (unset.length > 0) {
          live = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
          ) as Record<string, unknown>;
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const concurrency: Record<string, unknown> = live ?? existing;
        for (const key of Object.keys(concurrency)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = concurrency[key];
          }
        }
        const result = await updateResource(
          baseUrl,
          UPDATE_CONFIG,
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
    sync: {
      description: "Sync values state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific values by name (e.g. one discovered by list)",
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
          if (g["spreadsheetId"] !== undefined) {
            params["spreadsheetId"] = String(g["spreadsheetId"]);
          } else if (existing["spreadsheetId"]) {
            params["spreadsheetId"] = String(existing["spreadsheetId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["range"] = identifier;
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
    append: {
      description: "append",
      arguments: z.object({
        majorDimension: z.any().optional(),
        range: z.any().optional(),
        values: z.any().optional(),
        includeValuesInResponse: z.any().optional(),
        insertDataOption: z.any().optional(),
        responseDateTimeRenderOption: z.any().optional(),
        responseValueRenderOption: z.any().optional(),
        valueInputOption: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        if (g["range"] !== undefined) params["range"] = String(g["range"]);
        if (args["includeValuesInResponse"] !== undefined) {
          params["includeValuesInResponse"] = String(
            args["includeValuesInResponse"],
          );
        }
        if (args["insertDataOption"] !== undefined) {
          params["insertDataOption"] = String(args["insertDataOption"]);
        }
        if (args["responseDateTimeRenderOption"] !== undefined) {
          params["responseDateTimeRenderOption"] = String(
            args["responseDateTimeRenderOption"],
          );
        }
        if (args["responseValueRenderOption"] !== undefined) {
          params["responseValueRenderOption"] = String(
            args["responseValueRenderOption"],
          );
        }
        if (args["valueInputOption"] !== undefined) {
          params["valueInputOption"] = String(args["valueInputOption"]);
        }
        const body: Record<string, unknown> = {};
        if (args["majorDimension"] !== undefined) {
          body["majorDimension"] = args["majorDimension"];
        }
        if (args["range"] !== undefined) body["range"] = args["range"];
        if (args["values"] !== undefined) body["values"] = args["values"];
        const result = await createResource(
          baseUrl,
          {
            "id": "sheets.spreadsheets.values.append",
            "path": "v4/spreadsheets/{spreadsheetId}/values/{range}:append",
            "httpMethod": "POST",
            "parameterOrder": ["spreadsheetId", "range"],
            "parameters": {
              "includeValuesInResponse": { "location": "query" },
              "insertDataOption": { "location": "query" },
              "range": { "location": "path", "required": true },
              "responseDateTimeRenderOption": { "location": "query" },
              "responseValueRenderOption": { "location": "query" },
              "spreadsheetId": { "location": "path", "required": true },
              "valueInputOption": { "location": "query" },
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
    batch_clear: {
      description: "batch clear",
      arguments: z.object({
        ranges: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["ranges"] !== undefined) body["ranges"] = args["ranges"];
        const result = await createResource(
          baseUrl,
          {
            "id": "sheets.spreadsheets.values.batchClear",
            "path": "v4/spreadsheets/{spreadsheetId}/values:batchClear",
            "httpMethod": "POST",
            "parameterOrder": ["spreadsheetId"],
            "parameters": {
              "spreadsheetId": { "location": "path", "required": true },
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
    batch_clear_by_data_filter: {
      description: "batch clear by data filter",
      arguments: z.object({
        dataFilters: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["dataFilters"] !== undefined) {
          body["dataFilters"] = args["dataFilters"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "sheets.spreadsheets.values.batchClearByDataFilter",
            "path":
              "v4/spreadsheets/{spreadsheetId}/values:batchClearByDataFilter",
            "httpMethod": "POST",
            "parameterOrder": ["spreadsheetId"],
            "parameters": {
              "spreadsheetId": { "location": "path", "required": true },
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
    batch_get: {
      description: "batch get",
      arguments: z.object({
        dateTimeRenderOption: z.any().optional(),
        majorDimension: z.any().optional(),
        ranges: z.any().optional(),
        valueRenderOption: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        if (args["dateTimeRenderOption"] !== undefined) {
          params["dateTimeRenderOption"] = String(args["dateTimeRenderOption"]);
        }
        if (args["majorDimension"] !== undefined) {
          params["majorDimension"] = String(args["majorDimension"]);
        }
        if (args["ranges"] !== undefined) {
          params["ranges"] = String(args["ranges"]);
        }
        if (args["valueRenderOption"] !== undefined) {
          params["valueRenderOption"] = String(args["valueRenderOption"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "sheets.spreadsheets.values.batchGet",
            "path": "v4/spreadsheets/{spreadsheetId}/values:batchGet",
            "httpMethod": "GET",
            "parameterOrder": ["spreadsheetId"],
            "parameters": {
              "dateTimeRenderOption": { "location": "query" },
              "majorDimension": { "location": "query" },
              "ranges": { "location": "query" },
              "spreadsheetId": { "location": "path", "required": true },
              "valueRenderOption": { "location": "query" },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    batch_get_by_data_filter: {
      description: "batch get by data filter",
      arguments: z.object({
        dataFilters: z.any().optional(),
        dateTimeRenderOption: z.any().optional(),
        majorDimension: z.any().optional(),
        valueRenderOption: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["dataFilters"] !== undefined) {
          body["dataFilters"] = args["dataFilters"];
        }
        if (args["dateTimeRenderOption"] !== undefined) {
          body["dateTimeRenderOption"] = args["dateTimeRenderOption"];
        }
        if (args["majorDimension"] !== undefined) {
          body["majorDimension"] = args["majorDimension"];
        }
        if (args["valueRenderOption"] !== undefined) {
          body["valueRenderOption"] = args["valueRenderOption"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "sheets.spreadsheets.values.batchGetByDataFilter",
            "path":
              "v4/spreadsheets/{spreadsheetId}/values:batchGetByDataFilter",
            "httpMethod": "POST",
            "parameterOrder": ["spreadsheetId"],
            "parameters": {
              "spreadsheetId": { "location": "path", "required": true },
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
    batch_update: {
      description: "batch update",
      arguments: z.object({
        data: z.any().optional(),
        includeValuesInResponse: z.any().optional(),
        responseDateTimeRenderOption: z.any().optional(),
        responseValueRenderOption: z.any().optional(),
        valueInputOption: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["data"] !== undefined) body["data"] = args["data"];
        if (args["includeValuesInResponse"] !== undefined) {
          body["includeValuesInResponse"] = args["includeValuesInResponse"];
        }
        if (args["responseDateTimeRenderOption"] !== undefined) {
          body["responseDateTimeRenderOption"] =
            args["responseDateTimeRenderOption"];
        }
        if (args["responseValueRenderOption"] !== undefined) {
          body["responseValueRenderOption"] = args["responseValueRenderOption"];
        }
        if (args["valueInputOption"] !== undefined) {
          body["valueInputOption"] = args["valueInputOption"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "sheets.spreadsheets.values.batchUpdate",
            "path": "v4/spreadsheets/{spreadsheetId}/values:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["spreadsheetId"],
            "parameters": {
              "spreadsheetId": { "location": "path", "required": true },
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
    batch_update_by_data_filter: {
      description: "batch update by data filter",
      arguments: z.object({
        data: z.any().optional(),
        includeValuesInResponse: z.any().optional(),
        responseDateTimeRenderOption: z.any().optional(),
        responseValueRenderOption: z.any().optional(),
        valueInputOption: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["data"] !== undefined) body["data"] = args["data"];
        if (args["includeValuesInResponse"] !== undefined) {
          body["includeValuesInResponse"] = args["includeValuesInResponse"];
        }
        if (args["responseDateTimeRenderOption"] !== undefined) {
          body["responseDateTimeRenderOption"] =
            args["responseDateTimeRenderOption"];
        }
        if (args["responseValueRenderOption"] !== undefined) {
          body["responseValueRenderOption"] = args["responseValueRenderOption"];
        }
        if (args["valueInputOption"] !== undefined) {
          body["valueInputOption"] = args["valueInputOption"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "sheets.spreadsheets.values.batchUpdateByDataFilter",
            "path":
              "v4/spreadsheets/{spreadsheetId}/values:batchUpdateByDataFilter",
            "httpMethod": "POST",
            "parameterOrder": ["spreadsheetId"],
            "parameters": {
              "spreadsheetId": { "location": "path", "required": true },
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
    clear: {
      description: "clear",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        if (g["range"] !== undefined) params["range"] = String(g["range"]);
        const result = await createResource(
          baseUrl,
          {
            "id": "sheets.spreadsheets.values.clear",
            "path": "v4/spreadsheets/{spreadsheetId}/values/{range}:clear",
            "httpMethod": "POST",
            "parameterOrder": ["spreadsheetId", "range"],
            "parameters": {
              "range": { "location": "path", "required": true },
              "spreadsheetId": { "location": "path", "required": true },
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
  },
};
