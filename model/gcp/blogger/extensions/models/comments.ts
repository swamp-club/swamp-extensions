// Auto-generated extension model for @swamp/gcp/blogger/comments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Blogger Comments.
 *
 * Gets a comment by id.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://blogger.googleapis.com/";

const GET_CONFIG = {
  "id": "blogger.comments.get",
  "path": "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "blogId",
    "postId",
    "commentId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "commentId": {
      "location": "path",
      "required": true,
    },
    "postId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "blogger.comments.delete",
  "path": "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "blogId",
    "postId",
    "commentId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "commentId": {
      "location": "path",
      "required": true,
    },
    "postId": {
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
  author: z.object({
    displayName: z.string(),
    id: z.string(),
    image: z.object({
      url: z.string(),
    }),
    url: z.string(),
  }).optional(),
  blog: z.object({
    id: z.string(),
  }).optional(),
  content: z.string().optional(),
  id: z.string().optional(),
  inReplyTo: z.object({
    id: z.string(),
  }).optional(),
  kind: z.string().optional(),
  post: z.object({
    id: z.string(),
  }).optional(),
  published: z.string().optional(),
  selfLink: z.string().optional(),
  status: z.string().optional(),
  updated: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Blogger Comments. Registered at `@swamp/gcp/blogger/comments`. */
export const model = {
  type: "@swamp/gcp/blogger/comments",
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
      description: "Gets a comment by id.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a comments",
      arguments: z.object({
        identifier: z.string().describe("The name of the comments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        if (g["postId"] !== undefined) params["postId"] = String(g["postId"]);
        params["commentId"] = args.identifier;
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
      description: "Delete the comments",
      arguments: z.object({
        identifier: z.string().describe("The name of the comments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        if (g["postId"] !== undefined) params["postId"] = String(g["postId"]);
        params["commentId"] = args.identifier;
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
      description: "Sync comments state from GCP",
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
          if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
          else if (existing["blogId"]) {
            params["blogId"] = String(existing["blogId"]);
          }
          if (g["postId"] !== undefined) params["postId"] = String(g["postId"]);
          else if (existing["postId"]) {
            params["postId"] = String(existing["postId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["commentId"] = identifier;
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
    approve: {
      description: "approve",
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
        params["blogId"] = existing["blogId"]?.toString() ??
          g["blogId"]?.toString() ?? "";
        params["postId"] = existing["postId"]?.toString() ??
          g["postId"]?.toString() ?? "";
        params["commentId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "blogger.comments.approve",
            "path":
              "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/approve",
            "httpMethod": "POST",
            "parameterOrder": ["blogId", "postId", "commentId"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "commentId": { "location": "path", "required": true },
              "postId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    list_by_blog: {
      description: "list by blog",
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
        params["blogId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "blogger.comments.listByBlog",
            "path": "v3/blogs/{blogId}/comments",
            "httpMethod": "GET",
            "parameterOrder": ["blogId"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "endDate": { "location": "query" },
              "fetchBodies": { "location": "query" },
              "maxResults": { "location": "query" },
              "pageToken": { "location": "query" },
              "startDate": { "location": "query" },
              "status": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    mark_as_spam: {
      description: "mark as spam",
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
        params["blogId"] = existing["blogId"]?.toString() ??
          g["blogId"]?.toString() ?? "";
        params["postId"] = existing["postId"]?.toString() ??
          g["postId"]?.toString() ?? "";
        params["commentId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "blogger.comments.markAsSpam",
            "path":
              "v3/blogs/{blogId}/posts/{postId}/comments/{commentId}/spam",
            "httpMethod": "POST",
            "parameterOrder": ["blogId", "postId", "commentId"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "commentId": { "location": "path", "required": true },
              "postId": { "location": "path", "required": true },
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
