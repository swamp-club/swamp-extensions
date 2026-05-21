// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-negativekeywordlists
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.NegativeKeywordLists.
 *
 * A list of negative keywords used for targeting.
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

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.advertisers.negativeKeywordLists.get",
  "path":
    "v4/advertisers/{+advertiserId}/negativeKeywordLists/{+negativeKeywordListId}",
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
    "negativeKeywordListId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.advertisers.negativeKeywordLists.create",
  "path": "v4/advertisers/{+advertiserId}/negativeKeywordLists",
  "httpMethod": "POST",
  "parameterOrder": [
    "advertiserId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "displayvideo.advertisers.negativeKeywordLists.patch",
  "path":
    "v4/advertisers/{+advertiserId}/negativeKeywordLists/{negativeKeywordListId}",
  "httpMethod": "PATCH",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.negativeKeywordLists.delete",
  "path":
    "v4/advertisers/{+advertiserId}/negativeKeywordLists/{+negativeKeywordListId}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.negativeKeywordLists.list",
  "path": "v4/advertisers/{+advertiserId}/negativeKeywordLists",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
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
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the negative keyword list belongs to.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the negative keyword list. Must be UTF-8 encoded with a maximum size of 255 bytes.",
  ).optional(),
});

const StateSchema = z.object({
  advertiserId: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  negativeKeywordListId: z.string().optional(),
  targetedLineItemCount: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the negative keyword list belongs to.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the negative keyword list. Must be UTF-8 encoded with a maximum size of 255 bytes.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.NegativeKeywordLists. Registered at `@swamp/gcp/displayvideo/advertisers-negativekeywordlists`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-negativekeywordlists",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A list of negative keywords used for targeting.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a negativeKeywordLists",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) {
          params["negativeKeywordListId"] = String(g["name"]);
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
            listParams: { "advertiserId": String(g["advertiserId"] ?? "") },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a negativeKeywordLists",
      arguments: z.object({
        identifier: z.string().describe("The name of the negativeKeywordLists"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["negativeKeywordListId"] = args.identifier;
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
      description: "Update negativeKeywordLists attributes",
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
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        } else if (existing["advertiserId"]) {
          params["advertiserId"] = String(existing["advertiserId"]);
        }
        params["negativeKeywordListId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
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
      description: "Delete the negativeKeywordLists",
      arguments: z.object({
        identifier: z.string().describe("The name of the negativeKeywordLists"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["negativeKeywordListId"] = args.identifier;
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
      description: "Sync negativeKeywordLists state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["negativeKeywordListId"] = identifier;
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
