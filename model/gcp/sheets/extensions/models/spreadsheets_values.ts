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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).describe(
    "The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS.",
  ).optional(),
  range: z.string().describe(
    "The range the values cover, in [A1 notation](https://developers.google.com/workspace/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended.",
  ).optional(),
  values: z.array(z.array(z.string())).describe(
    "The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string.",
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
  majorDimension: z.enum(["DIMENSION_UNSPECIFIED", "ROWS", "COLUMNS"]).describe(
    "The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS.",
  ).optional(),
  range: z.string().describe(
    "The range the values cover, in [A1 notation](https://developers.google.com/workspace/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended.",
  ).optional(),
  values: z.array(z.array(z.string())).describe(
    "The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Sheets Spreadsheets.Values. Registered at `@swamp/gcp/sheets/spreadsheets-values`. */
export const model = {
  type: "@swamp/gcp/sheets/spreadsheets-values",
  version: "2026.05.21.2",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        }
        params["range"] = args.identifier;
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
    update: {
      description: "Update values attributes",
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
        if (g["spreadsheetId"] !== undefined) {
          params["spreadsheetId"] = String(g["spreadsheetId"]);
        } else if (existing["spreadsheetId"]) {
          params["spreadsheetId"] = String(existing["spreadsheetId"]);
        }
        params["range"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["majorDimension"] !== undefined) {
          body["majorDimension"] = g["majorDimension"];
        }
        if (g["values"] !== undefined) body["values"] = g["values"];
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
    sync: {
      description: "Sync values state from GCP",
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
    append: {
      description: "append",
      arguments: z.object({
        majorDimension: z.any().optional(),
        range: z.any().optional(),
        values: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["range"] !== undefined) params["range"] = String(g["range"]);
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
        params["spreadsheetId"] = existing["spreadsheetId"]?.toString() ??
          g["spreadsheetId"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["majorDimension"] !== undefined) {
          body["majorDimension"] = args["majorDimension"];
        }
        if (args["range"] !== undefined) body["range"] = args["range"];
        if (args["values"] !== undefined) body["values"] = args["values"];
        const result = await createResource(
          BASE_URL,
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
        const projectId = await getProjectId();
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
        params["spreadsheetId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["ranges"] !== undefined) body["ranges"] = args["ranges"];
        const result = await createResource(
          BASE_URL,
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
        const projectId = await getProjectId();
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
        params["spreadsheetId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["dataFilters"] !== undefined) {
          body["dataFilters"] = args["dataFilters"];
        }
        const result = await createResource(
          BASE_URL,
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
        );
        return { result };
      },
    },
    batch_get: {
      description: "batch get",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["spreadsheetId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
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
          {},
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
        const projectId = await getProjectId();
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
        params["spreadsheetId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
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
          BASE_URL,
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
        const projectId = await getProjectId();
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
        params["spreadsheetId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
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
          BASE_URL,
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
        const projectId = await getProjectId();
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
        params["spreadsheetId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
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
          BASE_URL,
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
        );
        return { result };
      },
    },
    clear: {
      description: "clear",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["range"] !== undefined) params["range"] = String(g["range"]);
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
        params["spreadsheetId"] = existing["spreadsheetId"]?.toString() ??
          g["spreadsheetId"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
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
        );
        return { result };
      },
    },
  },
};
