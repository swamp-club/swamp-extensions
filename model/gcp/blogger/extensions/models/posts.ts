// Auto-generated extension model for @swamp/gcp/blogger/posts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Blogger Posts.
 *
 * Gets a post by blog id and post id
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

const BASE_URL = "https://blogger.googleapis.com/";

const GET_CONFIG = {
  "id": "blogger.posts.get",
  "path": "v3/blogs/{blogId}/posts/{postId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "blogId",
    "postId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "fetchBody": {
      "location": "query",
    },
    "fetchImages": {
      "location": "query",
    },
    "maxComments": {
      "location": "query",
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

const INSERT_CONFIG = {
  "id": "blogger.posts.insert",
  "path": "v3/blogs/{blogId}/posts",
  "httpMethod": "POST",
  "parameterOrder": [
    "blogId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "fetchBody": {
      "location": "query",
    },
    "fetchImages": {
      "location": "query",
    },
    "isDraft": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "blogger.posts.update",
  "path": "v3/blogs/{blogId}/posts/{postId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "blogId",
    "postId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "fetchBody": {
      "location": "query",
    },
    "fetchImages": {
      "location": "query",
    },
    "maxComments": {
      "location": "query",
    },
    "postId": {
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
  "id": "blogger.posts.delete",
  "path": "v3/blogs/{blogId}/posts/{postId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "blogId",
    "postId",
  ],
  "parameters": {
    "blogId": {
      "location": "path",
      "required": true,
    },
    "postId": {
      "location": "path",
      "required": true,
    },
    "useTrash": {
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
  }).describe("The author of this Post.").optional(),
  blog: z.object({
    id: z.string().describe(
      "The identifier of the Blog that contains this Post.",
    ).optional(),
  }).describe("Data about the blog containing this Post.").optional(),
  content: z.string().describe(
    "The content of the Post. May contain HTML markup.",
  ).optional(),
  id: z.string().describe("The identifier of this Post.").optional(),
  images: z.array(z.object({
    url: z.string().optional(),
  })).describe("Display image for the Post.").optional(),
  labels: z.array(z.string()).describe(
    "The list of labels this Post was tagged with.",
  ).optional(),
  location: z.object({
    lat: z.number().describe("Location's latitude.").optional(),
    lng: z.number().describe("Location's longitude.").optional(),
    name: z.string().describe("Location name.").optional(),
    span: z.string().describe(
      "Location's viewport span. Can be used when rendering a map preview.",
    ).optional(),
  }).describe("The location for geotagged posts.").optional(),
  published: z.string().describe(
    "RFC 3339 date-time when this Post was published.",
  ).optional(),
  readerComments: z.enum([
    "ALLOW",
    "DONT_ALLOW_SHOW_EXISTING",
    "DONT_ALLOW_HIDE_EXISTING",
  ]).describe("Comment control and display setting for readers of this post.")
    .optional(),
  replies: z.object({
    items: z.array(z.object({
      author: z.object({
        displayName: z.string().describe("The display name.").optional(),
        id: z.string().describe("The identifier of the creator.").optional(),
        image: z.object({
          url: z.unknown().describe("The creator's avatar URL.").optional(),
        }).describe("The creator's avatar.").optional(),
        url: z.string().describe("The URL of the creator's Profile page.")
          .optional(),
      }).describe("The author of this Comment.").optional(),
      blog: z.object({
        id: z.string().describe(
          "The identifier of the blog containing this comment.",
        ).optional(),
      }).describe("Data about the blog containing this comment.").optional(),
      content: z.string().describe(
        "The actual content of the comment. May include HTML markup.",
      ).optional(),
      id: z.string().describe("The identifier for this resource.").optional(),
      inReplyTo: z.object({
        id: z.string().describe("The identified of the parent of this comment.")
          .optional(),
      }).describe("Data about the comment this is in reply to.").optional(),
      kind: z.string().describe(
        "The kind of this entry. Always blogger#comment.",
      ).optional(),
      post: z.object({
        id: z.string().describe(
          "The identifier of the post containing this comment.",
        ).optional(),
      }).describe("Data about the post containing this comment.").optional(),
      published: z.string().describe(
        "RFC 3339 date-time when this comment was published.",
      ).optional(),
      selfLink: z.string().describe(
        "The API REST URL to fetch this resource from.",
      ).optional(),
      status: z.enum(["LIVE", "EMPTIED", "PENDING", "SPAM"]).describe(
        "The status of the comment (only populated for admin users).",
      ).optional(),
      updated: z.string().describe(
        "RFC 3339 date-time when this comment was last updated.",
      ).optional(),
    })).describe("The List of Comments for this Post.").optional(),
    selfLink: z.string().describe("The URL of the comments on this post.")
      .optional(),
    totalItems: z.string().describe("The count of comments on this post.")
      .optional(),
  }).describe("The container of comments on this Post.").optional(),
  status: z.enum(["LIVE", "DRAFT", "SCHEDULED", "SOFT_TRASHED"]).describe(
    "Status of the post. Only set for admin-level requests.",
  ).optional(),
  title: z.string().describe("The title of the Post.").optional(),
  titleLink: z.string().describe(
    "The title link URL, similar to atom's related link.",
  ).optional(),
  trashed: z.string().describe(
    "RFC 3339 date-time when this Post was last trashed.",
  ).optional(),
  updated: z.string().describe(
    "RFC 3339 date-time when this Post was last updated.",
  ).optional(),
  url: z.string().describe("The URL where this Post is displayed.").optional(),
  blogId: z.string().describe("The blogId for this resource"),
  fetchBody: z.string().describe("The fetchBody for this resource").optional(),
  fetchImages: z.string().describe("The fetchImages for this resource")
    .optional(),
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
  customMetaData: z.string().optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  images: z.array(z.object({
    url: z.string(),
  })).optional(),
  kind: z.string().optional(),
  labels: z.array(z.string()).optional(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    name: z.string(),
    span: z.string(),
  }).optional(),
  published: z.string().optional(),
  readerComments: z.string().optional(),
  replies: z.object({
    items: z.array(z.object({
      author: z.object({
        displayName: z.string(),
        id: z.string(),
        image: z.object({
          url: z.unknown(),
        }),
        url: z.string(),
      }),
      blog: z.object({
        id: z.string(),
      }),
      content: z.string(),
      id: z.string(),
      inReplyTo: z.object({
        id: z.string(),
      }),
      kind: z.string(),
      post: z.object({
        id: z.string(),
      }),
      published: z.string(),
      selfLink: z.string(),
      status: z.string(),
      updated: z.string(),
    })),
    selfLink: z.string(),
    totalItems: z.string(),
  }).optional(),
  selfLink: z.string().optional(),
  status: z.string().optional(),
  title: z.string().optional(),
  titleLink: z.string().optional(),
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
  }).describe("The author of this Post.").optional(),
  blog: z.object({
    id: z.string().describe(
      "The identifier of the Blog that contains this Post.",
    ).optional(),
  }).describe("Data about the blog containing this Post.").optional(),
  content: z.string().describe(
    "The content of the Post. May contain HTML markup.",
  ).optional(),
  id: z.string().describe("The identifier of this Post.").optional(),
  images: z.array(z.object({
    url: z.string().optional(),
  })).describe("Display image for the Post.").optional(),
  labels: z.array(z.string()).describe(
    "The list of labels this Post was tagged with.",
  ).optional(),
  location: z.object({
    lat: z.number().describe("Location's latitude.").optional(),
    lng: z.number().describe("Location's longitude.").optional(),
    name: z.string().describe("Location name.").optional(),
    span: z.string().describe(
      "Location's viewport span. Can be used when rendering a map preview.",
    ).optional(),
  }).describe("The location for geotagged posts.").optional(),
  published: z.string().describe(
    "RFC 3339 date-time when this Post was published.",
  ).optional(),
  readerComments: z.enum([
    "ALLOW",
    "DONT_ALLOW_SHOW_EXISTING",
    "DONT_ALLOW_HIDE_EXISTING",
  ]).describe("Comment control and display setting for readers of this post.")
    .optional(),
  replies: z.object({
    items: z.array(z.object({
      author: z.object({
        displayName: z.string().describe("The display name.").optional(),
        id: z.string().describe("The identifier of the creator.").optional(),
        image: z.object({
          url: z.unknown().describe("The creator's avatar URL.").optional(),
        }).describe("The creator's avatar.").optional(),
        url: z.string().describe("The URL of the creator's Profile page.")
          .optional(),
      }).describe("The author of this Comment.").optional(),
      blog: z.object({
        id: z.string().describe(
          "The identifier of the blog containing this comment.",
        ).optional(),
      }).describe("Data about the blog containing this comment.").optional(),
      content: z.string().describe(
        "The actual content of the comment. May include HTML markup.",
      ).optional(),
      id: z.string().describe("The identifier for this resource.").optional(),
      inReplyTo: z.object({
        id: z.string().describe("The identified of the parent of this comment.")
          .optional(),
      }).describe("Data about the comment this is in reply to.").optional(),
      kind: z.string().describe(
        "The kind of this entry. Always blogger#comment.",
      ).optional(),
      post: z.object({
        id: z.string().describe(
          "The identifier of the post containing this comment.",
        ).optional(),
      }).describe("Data about the post containing this comment.").optional(),
      published: z.string().describe(
        "RFC 3339 date-time when this comment was published.",
      ).optional(),
      selfLink: z.string().describe(
        "The API REST URL to fetch this resource from.",
      ).optional(),
      status: z.enum(["LIVE", "EMPTIED", "PENDING", "SPAM"]).describe(
        "The status of the comment (only populated for admin users).",
      ).optional(),
      updated: z.string().describe(
        "RFC 3339 date-time when this comment was last updated.",
      ).optional(),
    })).describe("The List of Comments for this Post.").optional(),
    selfLink: z.string().describe("The URL of the comments on this post.")
      .optional(),
    totalItems: z.string().describe("The count of comments on this post.")
      .optional(),
  }).describe("The container of comments on this Post.").optional(),
  status: z.enum(["LIVE", "DRAFT", "SCHEDULED", "SOFT_TRASHED"]).describe(
    "Status of the post. Only set for admin-level requests.",
  ).optional(),
  title: z.string().describe("The title of the Post.").optional(),
  titleLink: z.string().describe(
    "The title link URL, similar to atom's related link.",
  ).optional(),
  trashed: z.string().describe(
    "RFC 3339 date-time when this Post was last trashed.",
  ).optional(),
  updated: z.string().describe(
    "RFC 3339 date-time when this Post was last updated.",
  ).optional(),
  url: z.string().describe("The URL where this Post is displayed.").optional(),
  blogId: z.string().describe("The blogId for this resource").optional(),
  fetchBody: z.string().describe("The fetchBody for this resource").optional(),
  fetchImages: z.string().describe("The fetchImages for this resource")
    .optional(),
  isDraft: z.string().describe("The isDraft for this resource").optional(),
});

/** Swamp extension model for Google Cloud Blogger Posts. Registered at `@swamp/gcp/blogger/posts`. */
export const model = {
  type: "@swamp/gcp/blogger/posts",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Gets a post by blog id and post id",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a posts",
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
        if (g["images"] !== undefined) body["images"] = g["images"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["readerComments"] !== undefined) {
          body["readerComments"] = g["readerComments"];
        }
        if (g["replies"] !== undefined) body["replies"] = g["replies"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["titleLink"] !== undefined) body["titleLink"] = g["titleLink"];
        if (g["trashed"] !== undefined) body["trashed"] = g["trashed"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["url"] !== undefined) body["url"] = g["url"];
        if (g["fetchBody"] !== undefined) body["fetchBody"] = g["fetchBody"];
        if (g["fetchImages"] !== undefined) {
          body["fetchImages"] = g["fetchImages"];
        }
        if (g["isDraft"] !== undefined) body["isDraft"] = g["isDraft"];
        if (g["name"] !== undefined) params["postId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a posts",
      arguments: z.object({
        identifier: z.string().describe("The name of the posts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
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
    update: {
      description: "Update posts attributes",
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
        params["postId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["author"] !== undefined) body["author"] = g["author"];
        if (g["blog"] !== undefined) body["blog"] = g["blog"];
        if (g["content"] !== undefined) body["content"] = g["content"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["images"] !== undefined) body["images"] = g["images"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["published"] !== undefined) body["published"] = g["published"];
        if (g["readerComments"] !== undefined) {
          body["readerComments"] = g["readerComments"];
        }
        if (g["replies"] !== undefined) body["replies"] = g["replies"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["titleLink"] !== undefined) body["titleLink"] = g["titleLink"];
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
      description: "Delete the posts",
      arguments: z.object({
        identifier: z.string().describe("The name of the posts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["blogId"] !== undefined) params["blogId"] = String(g["blogId"]);
        params["postId"] = args.identifier;
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
      description: "Sync posts state from GCP",
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
    get_by_path: {
      description: "get by path",
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
        params["path"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "blogger.posts.getByPath",
            "path": "v3/blogs/{blogId}/posts/bypath",
            "httpMethod": "GET",
            "parameterOrder": ["blogId", "path"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "maxComments": { "location": "query" },
              "path": { "location": "query", "required": true },
              "view": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
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
        params["postId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "blogger.posts.publish",
            "path": "v3/blogs/{blogId}/posts/{postId}/publish",
            "httpMethod": "POST",
            "parameterOrder": ["blogId", "postId"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "postId": { "location": "path", "required": true },
              "publishDate": { "location": "query" },
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
        params["postId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "blogger.posts.revert",
            "path": "v3/blogs/{blogId}/posts/{postId}/revert",
            "httpMethod": "POST",
            "parameterOrder": ["blogId", "postId"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "postId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    search: {
      description: "search",
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
        params["q"] = existing["name"]?.toString() ?? g["name"]?.toString() ??
          "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "blogger.posts.search",
            "path": "v3/blogs/{blogId}/posts/search",
            "httpMethod": "GET",
            "parameterOrder": ["blogId", "q"],
            "parameters": {
              "blogId": { "location": "path", "required": true },
              "fetchBodies": { "location": "query" },
              "orderBy": { "location": "query" },
              "q": { "location": "query", "required": true },
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
