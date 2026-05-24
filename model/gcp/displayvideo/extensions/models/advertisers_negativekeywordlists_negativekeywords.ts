// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-negativekeywordlists-negativekeywords
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.NegativeKeywordLists.NegativeKeywords.
 *
 * A negatively targeted keyword that belongs to a negative keyword list.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const INSERT_CONFIG = {
  "id": "displayvideo.advertisers.negativeKeywordLists.negativeKeywords.create",
  "path":
    "v4/advertisers/{advertiserId}/negativeKeywordLists/{+negativeKeywordListId}/negativeKeywords",
  "httpMethod": "POST",
  "parameterOrder": [
    "advertiserId",
    "negativeKeywordListId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "negativeKeywordListId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.negativeKeywordLists.negativeKeywords.delete",
  "path":
    "v4/advertisers/{advertiserId}/negativeKeywordLists/{+negativeKeywordListId}/negativeKeywords/{+keywordValue}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
    "negativeKeywordListId",
    "keywordValue",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "keywordValue": {
      "location": "path",
      "required": true,
    },
    "negativeKeywordListId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.negativeKeywordLists.negativeKeywords.list",
  "path":
    "v4/advertisers/{+advertiserId}/negativeKeywordLists/{+negativeKeywordListId}/negativeKeywords",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "negativeKeywordListId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "filter": {
      "location": "query",
    },
    "negativeKeywordListId": {
      "location": "path",
      "required": true,
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  keywordValue: z.string().describe(
    "Required. Immutable. The negatively targeted keyword, for example `car insurance`. Must be UTF-8 encoded with a maximum size of 255 bytes. Maximum number of characters is 80. Maximum number of words is 10. Valid characters are restricted to ASCII characters only. The only URL-escaping permitted is for representing whitespace between words. Leading or trailing whitespace is ignored.",
  ).optional(),
  advertiserId: z.string().describe(
    "Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs.",
  ),
  negativeKeywordListId: z.string().describe(
    "Required. The ID of the parent negative keyword list in which the negative keyword will be created.",
  ),
});

const StateSchema = z.object({
  keywordValue: z.string().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  keywordValue: z.string().describe(
    "Required. Immutable. The negatively targeted keyword, for example `car insurance`. Must be UTF-8 encoded with a maximum size of 255 bytes. Maximum number of characters is 80. Maximum number of words is 10. Valid characters are restricted to ASCII characters only. The only URL-escaping permitted is for representing whitespace between words. Leading or trailing whitespace is ignored.",
  ).optional(),
  advertiserId: z.string().describe(
    "Required. The ID of the DV360 advertiser to which the parent negative keyword list belongs.",
  ).optional(),
  negativeKeywordListId: z.string().describe(
    "Required. The ID of the parent negative keyword list in which the negative keyword will be created.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.NegativeKeywordLists.NegativeKeywords. Registered at `@swamp/gcp/displayvideo/advertisers-negativekeywordlists-negativekeywords`. */
export const model = {
  type:
    "@swamp/gcp/displayvideo/advertisers-negativekeywordlists-negativekeywords",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A negatively targeted keyword that belongs to a negative keyword list.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a negativeKeywords",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["negativeKeywordListId"] !== undefined) {
          params["negativeKeywordListId"] = String(g["negativeKeywordListId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["keywordValue"] !== undefined) {
          body["keywordValue"] = g["keywordValue"];
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "advertiserId": String(g["advertiserId"] ?? ""),
              "negativeKeywordListId": String(g["negativeKeywordListId"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a negativeKeywords",
      arguments: z.object({
        identifier: z.string().describe("The name of the negativeKeywords"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["negativeKeywordListId"] !== undefined) {
          params["negativeKeywordListId"] = String(g["negativeKeywordListId"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Delete the negativeKeywords",
      arguments: z.object({
        identifier: z.string().describe("The name of the negativeKeywords"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["negativeKeywordListId"] !== undefined) {
          params["negativeKeywordListId"] = String(g["negativeKeywordListId"]);
        }
        params["keywordValue"] = args.identifier;
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
      description: "Sync negativeKeywords state from GCP",
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
          if (g["advertiserId"] !== undefined) {
            params["advertiserId"] = String(g["advertiserId"]);
          } else if (existing["advertiserId"]) {
            params["advertiserId"] = String(existing["advertiserId"]);
          }
          if (g["negativeKeywordListId"] !== undefined) {
            params["negativeKeywordListId"] = String(
              g["negativeKeywordListId"],
            );
          } else if (existing["negativeKeywordListId"]) {
            params["negativeKeywordListId"] = String(
              existing["negativeKeywordListId"],
            );
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
    bulk_edit: {
      description: "bulk edit",
      arguments: z.object({
        createdNegativeKeywords: z.any().optional(),
        deletedNegativeKeywords: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["negativeKeywordListId"] !== undefined) {
          params["negativeKeywordListId"] = String(g["negativeKeywordListId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["createdNegativeKeywords"] !== undefined) {
          body["createdNegativeKeywords"] = args["createdNegativeKeywords"];
        }
        if (args["deletedNegativeKeywords"] !== undefined) {
          body["deletedNegativeKeywords"] = args["deletedNegativeKeywords"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.advertisers.negativeKeywordLists.negativeKeywords.bulkEdit",
            "path":
              "v4/advertisers/{advertiserId}/negativeKeywordLists/{+negativeKeywordListId}/negativeKeywords:bulkEdit",
            "httpMethod": "POST",
            "parameterOrder": ["advertiserId", "negativeKeywordListId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "negativeKeywordListId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    replace: {
      description: "replace",
      arguments: z.object({
        newNegativeKeywords: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["negativeKeywordListId"] !== undefined) {
          params["negativeKeywordListId"] = String(g["negativeKeywordListId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["newNegativeKeywords"] !== undefined) {
          body["newNegativeKeywords"] = args["newNegativeKeywords"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "displayvideo.advertisers.negativeKeywordLists.negativeKeywords.replace",
            "path":
              "v4/advertisers/{advertiserId}/negativeKeywordLists/{+negativeKeywordListId}/negativeKeywords:replace",
            "httpMethod": "POST",
            "parameterOrder": ["advertiserId", "negativeKeywordListId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "negativeKeywordListId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
