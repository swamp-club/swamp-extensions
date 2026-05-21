// Auto-generated extension model for @swamp/gcp/youtube/comments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data Comments.
 *
 * A *comment* represents a single YouTube comment.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://youtube.googleapis.com/";

const INSERT_CONFIG = {
  "id": "youtube.comments.insert",
  "path": "youtube/v3/comments",
  "httpMethod": "POST",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "youtube.comments.update",
  "path": "youtube/v3/comments",
  "httpMethod": "PUT",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "youtube.comments.delete",
  "path": "youtube/v3/comments",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "youtube.comments.list",
  "path": "youtube/v3/comments",
  "httpMethod": "GET",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "id": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parentId": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
    "textFormat": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the comment.",
  ).optional(),
  snippet: z.object({
    authorChannelId: z.object({
      value: z.string().describe("The id of the author's YouTube channel.")
        .optional(),
    }).describe("Contains the id of the author's YouTube channel, if any.")
      .optional(),
    authorChannelUrl: z.string().describe(
      "Link to the author's YouTube channel, if any.",
    ).optional(),
    authorDisplayName: z.string().describe(
      "The name of the user who posted the comment.",
    ).optional(),
    authorProfileImageUrl: z.string().describe(
      "The URL for the avatar of the user who posted the comment.",
    ).optional(),
    canRate: z.boolean().describe(
      "Whether the current viewer can rate this comment.",
    ).optional(),
    channelId: z.string().describe(
      "The id of the corresponding YouTube channel. In case of a channel comment this is the channel the comment refers to. In case of a video or post comment it's the video/post's channel.",
    ).optional(),
    likeCount: z.number().int().describe(
      "The total number of likes this comment has received.",
    ).optional(),
    moderationStatus: z.enum([
      "published",
      "heldForReview",
      "likelySpam",
      "rejected",
    ]).describe(
      "The comment's moderation status. Will not be set if the comments were requested through the id filter.",
    ).optional(),
    parentId: z.string().describe(
      "The unique id of the top-level comment, only set for replies.",
    ).optional(),
    postId: z.string().describe(
      "The ID of the post the comment refers to, if any.",
    ).optional(),
    publishedAt: z.string().describe(
      "The date and time when the comment was originally published.",
    ).optional(),
    textDisplay: z.string().describe(
      "The comment's text. The format is either plain text or HTML dependent on what has been requested. Even the plain text representation may differ from the text originally posted in that it may replace video links with video titles etc.",
    ).optional(),
    textOriginal: z.string().describe(
      "The comment's original raw text as initially posted or last updated. The original text will only be returned if it is accessible to the viewer, which is only guaranteed if the viewer is the comment's author.",
    ).optional(),
    updatedAt: z.string().describe(
      "The date and time when the comment was last updated.",
    ).optional(),
    videoId: z.string().describe(
      "The ID of the video the comment refers to, if any.",
    ).optional(),
    viewerRating: z.enum(["none", "like", "dislike"]).describe(
      "The rating the viewer has given to this comment. For the time being this will never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This may change in the future.",
    ).optional(),
  }).describe("Basic details about a comment, such as its author and text.")
    .optional(),
  part: z.string().describe(
    "The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units.",
  ),
});

const StateSchema = z.object({
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  snippet: z.object({
    authorChannelId: z.object({
      value: z.string(),
    }),
    authorChannelUrl: z.string(),
    authorDisplayName: z.string(),
    authorProfileImageUrl: z.string(),
    canRate: z.boolean(),
    channelId: z.string(),
    likeCount: z.number(),
    moderationStatus: z.string(),
    parentId: z.string(),
    postId: z.string(),
    publishedAt: z.string(),
    textDisplay: z.string(),
    textOriginal: z.string(),
    updatedAt: z.string(),
    videoId: z.string(),
    viewerRating: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the comment.",
  ).optional(),
  snippet: z.object({
    authorChannelId: z.object({
      value: z.string().describe("The id of the author's YouTube channel.")
        .optional(),
    }).describe("Contains the id of the author's YouTube channel, if any.")
      .optional(),
    authorChannelUrl: z.string().describe(
      "Link to the author's YouTube channel, if any.",
    ).optional(),
    authorDisplayName: z.string().describe(
      "The name of the user who posted the comment.",
    ).optional(),
    authorProfileImageUrl: z.string().describe(
      "The URL for the avatar of the user who posted the comment.",
    ).optional(),
    canRate: z.boolean().describe(
      "Whether the current viewer can rate this comment.",
    ).optional(),
    channelId: z.string().describe(
      "The id of the corresponding YouTube channel. In case of a channel comment this is the channel the comment refers to. In case of a video or post comment it's the video/post's channel.",
    ).optional(),
    likeCount: z.number().int().describe(
      "The total number of likes this comment has received.",
    ).optional(),
    moderationStatus: z.enum([
      "published",
      "heldForReview",
      "likelySpam",
      "rejected",
    ]).describe(
      "The comment's moderation status. Will not be set if the comments were requested through the id filter.",
    ).optional(),
    parentId: z.string().describe(
      "The unique id of the top-level comment, only set for replies.",
    ).optional(),
    postId: z.string().describe(
      "The ID of the post the comment refers to, if any.",
    ).optional(),
    publishedAt: z.string().describe(
      "The date and time when the comment was originally published.",
    ).optional(),
    textDisplay: z.string().describe(
      "The comment's text. The format is either plain text or HTML dependent on what has been requested. Even the plain text representation may differ from the text originally posted in that it may replace video links with video titles etc.",
    ).optional(),
    textOriginal: z.string().describe(
      "The comment's original raw text as initially posted or last updated. The original text will only be returned if it is accessible to the viewer, which is only guaranteed if the viewer is the comment's author.",
    ).optional(),
    updatedAt: z.string().describe(
      "The date and time when the comment was last updated.",
    ).optional(),
    videoId: z.string().describe(
      "The ID of the video the comment refers to, if any.",
    ).optional(),
    viewerRating: z.enum(["none", "like", "dislike"]).describe(
      "The rating the viewer has given to this comment. For the time being this will never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This may change in the future.",
    ).optional(),
  }).describe("Basic details about a comment, such as its author and text.")
    .optional(),
  part: z.string().describe(
    "The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units.",
  ).optional(),
});

/** Swamp extension model for Google Cloud YouTube Data Comments. Registered at `@swamp/gcp/youtube/comments`. */
export const model = {
  type: "@swamp/gcp/youtube/comments",
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
      description: "A *comment* represents a single YouTube comment.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a comments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        const body: Record<string, unknown> = {};
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "part": String(g["part"] ?? "") },
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
      description: "Get a comments",
      arguments: z.object({
        identifier: z.string().describe("The name of the comments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
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
    update: {
      description: "Update comments attributes",
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
        params["part"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
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
      description: "Delete the comments",
      arguments: z.object({
        identifier: z.string().describe("The name of the comments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["id"] = args.identifier;
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
          if (g["part"] !== undefined) params["part"] = String(g["part"]);
          else if (existing["part"]) params["part"] = String(existing["part"]);
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
    mark_as_spam: {
      description: "mark as spam",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "youtube.comments.markAsSpam",
            "path": "youtube/v3/comments/markAsSpam",
            "httpMethod": "POST",
            "parameterOrder": ["id"],
            "parameters": { "id": { "location": "query", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_moderation_status: {
      description: "set moderation status",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
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
        params["moderationStatus"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "youtube.comments.setModerationStatus",
            "path": "youtube/v3/comments/setModerationStatus",
            "httpMethod": "POST",
            "parameterOrder": ["id", "moderationStatus"],
            "parameters": {
              "banAuthor": { "location": "query" },
              "id": { "location": "query", "required": true },
              "moderationStatus": { "location": "query", "required": true },
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
