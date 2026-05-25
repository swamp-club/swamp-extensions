// Auto-generated extension model for @swamp/gcp/analytics/management-uploads
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.Uploads.
 *
 * Metadata returned for an upload operation.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.management.uploads.get",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/uploads/{uploadId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "customDataSourceId",
    "uploadId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "customDataSourceId": {
      "location": "path",
      "required": true,
    },
    "uploadId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "analytics.management.uploads.deleteUploadData",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/deleteUploadData",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "customDataSourceId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "customDataSourceId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "analytics.management.uploads.list",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/uploads",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "customDataSourceId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "customDataSourceId": {
      "location": "path",
      "required": true,
    },
    "max-results": {
      "location": "query",
    },
    "start-index": {
      "location": "query",
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  customDataSourceId: z.string().optional(),
  errors: z.array(z.string()).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  status: z.string().optional(),
  uploadTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.Uploads. Registered at `@swamp/gcp/analytics/management-uploads`. */
export const model = {
  type: "@swamp/gcp/analytics/management-uploads",
  version: "2026.05.25.1",
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
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Metadata returned for an upload operation.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a uploads",
      arguments: z.object({
        identifier: z.string().describe("The name of the uploads"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["customDataSourceId"] !== undefined) {
          params["customDataSourceId"] = String(g["customDataSourceId"]);
        }
        params["uploadId"] = args.identifier;
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
    delete: {
      description: "Delete the uploads",
      arguments: z.object({
        identifier: z.string().describe("The name of the uploads"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        params["customDataSourceId"] = args.identifier;
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
      description: "Sync uploads state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          if (g["webPropertyId"] !== undefined) {
            params["webPropertyId"] = String(g["webPropertyId"]);
          } else if (existing["webPropertyId"]) {
            params["webPropertyId"] = String(existing["webPropertyId"]);
          }
          if (g["customDataSourceId"] !== undefined) {
            params["customDataSourceId"] = String(g["customDataSourceId"]);
          } else if (existing["customDataSourceId"]) {
            params["customDataSourceId"] = String(
              existing["customDataSourceId"],
            );
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["uploadId"] = identifier;
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
    list: {
      description: "List uploads resources",
      arguments: z.object({
        max_results: z.number().describe(
          "The maximum number of uploads to include in this response.",
        ).optional(),
        start_index: z.number().describe(
          "A 1-based index of the first upload to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["customDataSourceId"] !== undefined) {
          params["customDataSourceId"] = String(g["customDataSourceId"]);
        }
        if (args["max_results"] !== undefined) {
          params["max-results"] = String(args["max_results"]);
        }
        if (args["start_index"] !== undefined) {
          params["start-index"] = String(args["start_index"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
          (args.maxPages as number | undefined) ?? 10,
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
    upload_data: {
      description: "upload data",
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
        params["accountId"] = existing["accountId"]?.toString() ??
          g["accountId"]?.toString() ?? "";
        params["webPropertyId"] = existing["webPropertyId"]?.toString() ??
          g["webPropertyId"]?.toString() ?? "";
        params["customDataSourceId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "analytics.management.uploads.uploadData",
            "path":
              "management/accounts/{accountId}/webproperties/{webPropertyId}/customDataSources/{customDataSourceId}/uploads",
            "httpMethod": "POST",
            "parameterOrder": [
              "accountId",
              "webPropertyId",
              "customDataSourceId",
            ],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "customDataSourceId": { "location": "path", "required": true },
              "webPropertyId": { "location": "path", "required": true },
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
