// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-channels-sites
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.Channels.Sites.
 *
 * A single site. Sites are apps or websites belonging to a channel.
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
  "id": "displayvideo.advertisers.channels.sites.create",
  "path": "v4/advertisers/{advertiserId}/channels/{+channelId}/sites",
  "httpMethod": "POST",
  "parameterOrder": [
    "advertiserId",
    "channelId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "channelId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.channels.sites.delete",
  "path":
    "v4/advertisers/{advertiserId}/channels/{+channelId}/sites/{+urlOrAppId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
    "channelId",
    "urlOrAppId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "channelId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "query",
    },
    "urlOrAppId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.channels.sites.list",
  "path": "v4/advertisers/{+advertiserId}/channels/{+channelId}/sites",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "channelId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "channelId": {
      "location": "path",
      "required": true,
    },
    "filter": {
      "location": "query",
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
    "partnerId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  urlOrAppId: z.string().describe(
    "Required. The app ID or URL of the site. Must be UTF-8 encoded with a maximum length of 240 bytes.",
  ).optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that owns the parent channel.",
  ),
  channelId: z.string().describe(
    "Required. The ID of the parent channel in which the site will be created.",
  ),
  partnerId: z.string().describe(
    "The ID of the partner that owns the parent channel.",
  ).optional(),
});

const StateSchema = z.object({
  name: z.string(),
  urlOrAppId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  urlOrAppId: z.string().describe(
    "Required. The app ID or URL of the site. Must be UTF-8 encoded with a maximum length of 240 bytes.",
  ).optional(),
  advertiserId: z.string().describe(
    "The ID of the advertiser that owns the parent channel.",
  ).optional(),
  channelId: z.string().describe(
    "Required. The ID of the parent channel in which the site will be created.",
  ).optional(),
  partnerId: z.string().describe(
    "The ID of the partner that owns the parent channel.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.Channels.Sites. Registered at `@swamp/gcp/displayvideo/advertisers-channels-sites`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-channels-sites",
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
      description:
        "A single site. Sites are apps or websites belonging to a channel.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sites",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["channelId"] !== undefined) {
          params["channelId"] = String(g["channelId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["urlOrAppId"] !== undefined) body["urlOrAppId"] = g["urlOrAppId"];
        if (g["partnerId"] !== undefined) body["partnerId"] = g["partnerId"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
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
      description: "Get a sites",
      arguments: z.object({
        identifier: z.string().describe("The name of the sites"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["channelId"] !== undefined) {
          params["channelId"] = String(g["channelId"]);
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
      description: "Delete the sites",
      arguments: z.object({
        identifier: z.string().describe("The name of the sites"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["channelId"] !== undefined) {
          params["channelId"] = String(g["channelId"]);
        }
        params["urlOrAppId"] = args.identifier;
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
      description: "Sync sites state from GCP",
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
          if (g["channelId"] !== undefined) {
            params["channelId"] = String(g["channelId"]);
          } else if (existing["channelId"]) {
            params["channelId"] = String(existing["channelId"]);
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
        advertiserId: z.any().optional(),
        createdSites: z.any().optional(),
        deletedSites: z.any().optional(),
        partnerId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["channelId"] !== undefined) {
          params["channelId"] = String(g["channelId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["advertiserId"] !== undefined) {
          body["advertiserId"] = args["advertiserId"];
        }
        if (args["createdSites"] !== undefined) {
          body["createdSites"] = args["createdSites"];
        }
        if (args["deletedSites"] !== undefined) {
          body["deletedSites"] = args["deletedSites"];
        }
        if (args["partnerId"] !== undefined) {
          body["partnerId"] = args["partnerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.advertisers.channels.sites.bulkEdit",
            "path":
              "v4/advertisers/{advertiserId}/channels/{+channelId}/sites:bulkEdit",
            "httpMethod": "POST",
            "parameterOrder": ["advertiserId", "channelId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "channelId": { "location": "path", "required": true },
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
        advertiserId: z.any().optional(),
        newSites: z.any().optional(),
        partnerId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (g["channelId"] !== undefined) {
          params["channelId"] = String(g["channelId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["advertiserId"] !== undefined) {
          body["advertiserId"] = args["advertiserId"];
        }
        if (args["newSites"] !== undefined) body["newSites"] = args["newSites"];
        if (args["partnerId"] !== undefined) {
          body["partnerId"] = args["partnerId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "displayvideo.advertisers.channels.sites.replace",
            "path":
              "v4/advertisers/{advertiserId}/channels/{+channelId}/sites:replace",
            "httpMethod": "POST",
            "parameterOrder": ["advertiserId", "channelId"],
            "parameters": {
              "advertiserId": { "location": "path", "required": true },
              "channelId": { "location": "path", "required": true },
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
