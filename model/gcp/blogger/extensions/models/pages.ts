// Auto-generated extension model for @swamp/gcp/blogger/pages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud blogger Pages.
 *
 * Gets a page by blog id and page id.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://blogger.googleapis.com/";

const GET_CONFIG = {
  "id": "blogger.pages.get",
  "path": "v3/blogs/{blogId}/pages/{pageId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "blogId",
    "pageId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "pageId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "blogger.pages.insert",
  "path": "v3/blogs/{blogId}/pages",
  "httpMethod": "POST",
  "parameterOrder": [
    "blogId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "isDraft": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "blogger.pages.update",
  "path": "v3/blogs/{blogId}/pages/{pageId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "blogId",
    "pageId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "pageId": {
      "location": "path",
      "required": true,
    },
    "publish": {
      "location": "query",
    },
    "revert": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "blogger.pages.delete",
  "path": "v3/blogs/{blogId}/pages/{pageId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "blogId",
    "pageId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "pageId": {
      "location": "path",
      "required": true,
    },
    "useTrash": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "blogger.pages.list",
  "path": "v3/blogs/{blogId}/pages",
  "httpMethod": "GET",
  "parameterOrder": [
    "blogId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "fetchBodies": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "status": {
      "location": "query",
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
  author: z.object({
    displayName: z.string().describe("The display name.").optional(),
    id: z.string().describe("The identifier of the creator.").optional(),
    image: z.object({
      url: z.string().describe("The creator's avatar URL.").optional(),
    }).describe("The creator's avatar.").optional(),
    url: z.string().describe("The URL of the creator's Profile page.")
      .optional(),
  }).describe("The author of this Page.").optional(),
  blog: z.object({
    id: z.string().describe("The identifier of the blog containing this page.")
      .optional(),
  }).describe("Data about the blog containing this Page.").optional(),
  content: z.string().describe("The body content of this Page, in HTML.")
    .optional(),
  id: z.string().describe("The identifier for this resource.").optional(),
  published: z.string().describe(
    "RFC 3339 date-time when this Page was published.",
  ).optional(),
  status: z.enum(["LIVE", "DRAFT", "SOFT_TRASHED"]).describe(
    "The status of the page for admin resources (either LIVE or DRAFT).",
  ).optional(),
  title: z.string().describe(
    "The title of this entity. This is the name displayed in the Admin user interface.",
  ).optional(),
  trashed: z.string().describe("RFC 3339 date-time when this Page was trashed.")
    .optional(),
  updated: z.string().describe(
    "RFC 3339 date-time when this Page was last updated.",
  ).optional(),
  url: z.string().describe("The URL that this Page is displayed at.")
    .optional(),
  blogId: z.string().describe("The blogId for this resource"),
  isDraft: z.string().describe("The isDraft for this resource").optional(),
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
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  published: z.string().optional(),
  selfLink: z.string().optional(),
  status: z.string().optional(),
  title: z.string().optional(),
  trashed: z.string().optional(),
  updated: z.string().optional(),
  url: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  author: z.object({
    displayName: z.string().describe("The display name.").optional(),
    id: z.string().describe("The identifier of the creator.").optional(),
    image: z.object({
      url: z.string().describe("The creator's avatar URL.").optional(),
    }).describe("The creator's avatar.").optional(),
    url: z.string().describe("The URL of the creator's Profile page.")
      .optional(),
  }).describe("The author of this Page.").optional(),
  blog: z.object({
    id: z.string().describe("The identifier of the blog containing this page.")
      .optional(),
  }).describe("Data about the blog containing this Page.").optional(),
  content: z.string().describe("The body content of this Page, in HTML.")
    .optional(),
  id: z.string().describe("The identifier for this resource.").optional(),
  published: z.string().describe(
    "RFC 3339 date-time when this Page was published.",
  ).optional(),
  status: z.enum(["LIVE", "DRAFT", "SOFT_TRASHED"]).describe(
    "The status of the page for admin resources (either LIVE or DRAFT).",
  ).optional(),
  title: z.string().describe(
    "The title of this entity. This is the name displayed in the Admin user interface.",
  ).optional(),
  trashed: z.string().describe("RFC 3339 date-time when this Page was trashed.")
    .optional(),
  updated: z.string().describe(
    "RFC 3339 date-time when this Page was last updated.",
  ).optional(),
  url: z.string().describe("The URL that this Page is displayed at.")
    .optional(),
  blogId: z.string().describe("The blogId for this resource").optional(),
  isDraft: z.string().describe("The isDraft for this resource").optional(),
});

/** Swamp extension model for Google Cloud blogger Pages. Registered at `@swamp/gcp/blogger/pages`. */
export const model = {
  type: "@swamp/gcp/blogger/pages",
  version: "2026.05.26.1",
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
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Gets a page by blog id and page id.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a pages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        const body: Record<string, unknown> = {};
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["blog"] !== undefined) body["blog"] = g["blog"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["trashed"] !== undefined) body["trashed"] = g["trashed"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["url"] !== undefined) body["url"] = g["url"];
        if (g["isDraft"] !== undefined) body["isDraft"] = g["isDraft"];
        if (g["name"] !== undefined) params["pageId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "blogId": String(g["blogId"] ?? "") },
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
      description: "Get a pages",
      arguments: z.object({
        identifier: z.string().describe("The name of the pages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        params["pageId"] = args.identifier;
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
      description: "Update pages attributes",
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
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        else if (existing["blogId"]) {
          params["blogId"] = String(existing["blogId"]);
        }
        params["pageId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["blog"] !== undefined) body["blog"] = g["blog"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["trashed"] !== undefined) body["trashed"] = g["trashed"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["url"] !== undefined) body["url"] = g["url"];
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
    delete: {
      description: "Delete the pages",
      arguments: z.object({
        identifier: z.string().describe("The name of the pages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        params["pageId"] = args.identifier;
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
      description: "Sync pages state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["pageId"] = identifier;
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
      description: "List pages resources",
      arguments: z.object({
        fetchBodies: z.boolean().optional(),
        maxResults: z.number().optional(),
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
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        if (args["fetchBodies"] !== undefined) {
          params["fetchBodies"] = String(args["fetchBodies"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
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
    publish: {
      description: "publish",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
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
        params["pageId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "blogger.pages.publish",
            "path": "v3/blogs/{blogId}/pages/{pageId}/publish",
            "httpMethod": "POST",
            "parameterOrder": ["blogId", "pageId"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "pageId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    revert: {
      description: "revert",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
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
        params["pageId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "blogger.pages.revert",
            "path": "v3/blogs/{blogId}/pages/{pageId}/revert",
            "httpMethod": "POST",
            "parameterOrder": ["blogId", "pageId"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "pageId": { "location": "path", "required": true },
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
