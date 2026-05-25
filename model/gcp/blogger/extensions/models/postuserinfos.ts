// Auto-generated extension model for @swamp/gcp/blogger/postuserinfos
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Blogger PostUserInfos.
 *
 * Gets one post and user info pair, by post_id and user_id.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://blogger.googleapis.com/";

const GET_CONFIG = {
  "id": "blogger.postUserInfos.get",
  "path": "v3/users/{userId}/blogs/{blogId}/posts/{postId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "blogId",
    "postId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "maxComments": {
      "location": "query",
    },
    "postId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "blogger.postUserInfos.list",
  "path": "v3/users/{userId}/blogs/{blogId}/posts",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "blogId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "endDate": {
      "location": "query",
    },
    "fetchBodies": {
      "location": "query",
    },
    "labels": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "startDate": {
      "location": "query",
    },
    "status": {
      "location": "query",
    },
    "userId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  kind: z.string().optional(),
  post: z.object({
    author: z.object({
      displayName: z.string(),
      id: z.string(),
      image: z.object({
        url: z.string(),
      }),
      url: z.string(),
    }),
    blog: z.object({
      id: z.string(),
    }),
    content: z.string(),
    customMetaData: z.string(),
    etag: z.string(),
    id: z.string(),
    images: z.array(z.object({
      url: z.string(),
    })),
    kind: z.string(),
    labels: z.array(z.string()),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
      name: z.string(),
      span: z.string(),
    }),
    published: z.string(),
    readerComments: z.string(),
    replies: z.object({
      items: z.array(z.object({
        author: z.object({
          displayName: z.unknown(),
          id: z.unknown(),
          image: z.unknown(),
          url: z.unknown(),
        }),
        blog: z.object({
          id: z.unknown(),
        }),
        content: z.string(),
        id: z.string(),
        inReplyTo: z.object({
          id: z.unknown(),
        }),
        kind: z.string(),
        post: z.object({
          id: z.unknown(),
        }),
        published: z.string(),
        selfLink: z.string(),
        status: z.string(),
        updated: z.string(),
      })),
      selfLink: z.string(),
      totalItems: z.string(),
    }),
    selfLink: z.string(),
    status: z.string(),
    title: z.string(),
    titleLink: z.string(),
    trashed: z.string(),
    updated: z.string(),
    url: z.string(),
  }).optional(),
  post_user_info: z.object({
    blogId: z.string(),
    hasEditAccess: z.boolean(),
    kind: z.string(),
    postId: z.string(),
    userId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Blogger PostUserInfos. Registered at `@swamp/gcp/blogger/postuserinfos`. */
export const model = {
  type: "@swamp/gcp/blogger/postuserinfos",
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
      toVersion: "2026.04.04.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Gets one post and user info pair, by post_id and user_id.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a postUserInfos",
      arguments: z.object({
        identifier: z.string().describe("The name of the postUserInfos"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        params["postId"] = args.identifier;
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
      description: "Sync postUserInfos state from GCP",
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
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
          }
          if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
          else if (existing["blogId"]) {
            params["blogId"] = String(existing["blogId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["postId"] = identifier;
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
      description: "List postUserInfos resources",
      arguments: z.object({
        endDate: z.string().optional(),
        fetchBodies: z.boolean().optional(),
        labels: z.string().optional(),
        maxResults: z.number().optional(),
        orderBy: z.string().optional(),
        startDate: z.string().optional(),
        status: z.string().optional(),
        view: z.string().optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        if (args["endDate"] !== undefined) {
          params["endDate"] = String(args["endDate"]);
        }
        if (args["fetchBodies"] !== undefined) {
          params["fetchBodies"] = String(args["fetchBodies"]);
        }
        if (args["labels"] !== undefined) {
          params["labels"] = String(args["labels"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["startDate"] !== undefined) {
          params["startDate"] = String(args["startDate"]);
        }
        if (args["status"] !== undefined) {
          params["status"] = String(args["status"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
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
  },
};
