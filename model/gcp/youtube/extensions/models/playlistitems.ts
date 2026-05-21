// Auto-generated extension model for @swamp/gcp/youtube/playlistitems
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data PlaylistItems.
 *
 * A *playlistItem* resource identifies another resource, such as a video, that is included in a playlist. In addition, the playlistItem resource contains details about the included resource that pertain specifically to how that resource is used in that playlist. YouTube uses playlists to identify special collections of videos for a channel, such as: - uploaded videos - favorite videos - positively rated (liked) videos - watch history - watch later To be more specific, these lists are associated with a channel, which is a collection of a person, group, or company's videos, playlists, and other YouTube information. You can retrieve the playlist IDs for each of these lists from the channel resource for a given channel. You can then use the playlistItems.list method to retrieve any of those lists. You can also add or remove items from those lists by calling the playlistItems.insert and playlistItems.delete methods. For example, if a user gives a positive rating to a video, you would insert that video into the liked videos playlist for that user's channel.
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
  "id": "youtube.playlistItems.insert",
  "path": "youtube/v3/playlistItems",
  "httpMethod": "POST",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "youtube.playlistItems.update",
  "path": "youtube/v3/playlistItems",
  "httpMethod": "PUT",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "youtube.playlistItems.delete",
  "path": "youtube/v3/playlistItems",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "query",
      "required": true,
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "youtube.playlistItems.list",
  "path": "youtube/v3/playlistItems",
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
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
    "playlistId": {
      "location": "query",
    },
    "videoId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  contentDetails: z.object({
    endAt: z.string().describe(
      "The time, measured in seconds from the start of the video, when the video should stop playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) By default, assume that the video.endTime is the end of the video.",
    ).optional(),
    note: z.string().describe("A user-generated note for this item.")
      .optional(),
    startAt: z.string().describe(
      "The time, measured in seconds from the start of the video, when the video should start playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) The default value is 0.",
    ).optional(),
    videoId: z.string().describe(
      "The ID that YouTube uses to uniquely identify a video. To retrieve the video resource, set the id query parameter to this value in your API request.",
    ).optional(),
    videoPublishedAt: z.string().describe(
      "The date and time that the video was published to YouTube.",
    ).optional(),
  }).optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the playlist item.",
  ).optional(),
  snippet: z.object({
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the user that added the item to the playlist.",
    ).optional(),
    channelTitle: z.string().describe(
      "Channel title for the channel that the playlist item belongs to.",
    ).optional(),
    description: z.string().describe("The item's description.").optional(),
    playlistId: z.string().describe(
      "The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in.",
    ).optional(),
    position: z.number().int().describe(
      "The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth.",
    ).optional(),
    publishedAt: z.string().describe(
      "The date and time that the item was added to the playlist.",
    ).optional(),
    resourceId: z.object({
      channelId: z.string().describe(
        "The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel.",
      ).optional(),
      kind: z.string().describe("The type of the API resource.").optional(),
      playlistId: z.string().describe(
        "The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist.",
      ).optional(),
      videoId: z.string().describe(
        "The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video.",
      ).optional(),
    }).describe(
      "A resource id is a generic reference that points to another YouTube resource.",
    ).optional(),
    thumbnails: z.object({
      default: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      high: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      maxres: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      medium: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      standard: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
    }).describe("Internal representation of thumbnails for a YouTube resource.")
      .optional(),
    title: z.string().describe("The item's title.").optional(),
    videoOwnerChannelId: z.string().describe(
      "Channel id for the channel this video belongs to.",
    ).optional(),
    videoOwnerChannelTitle: z.string().describe(
      "Channel title for the channel this video belongs to.",
    ).optional(),
  }).describe(
    "Basic details about a playlist, including title, description and thumbnails. Basic details of a YouTube Playlist item provided by the author. Next ID: 15",
  ).optional(),
  status: z.object({
    privacyStatus: z.enum(["public", "unlisted", "private"]).describe(
      "This resource's privacy status.",
    ).optional(),
  }).describe("Information about the playlist item's privacy status.")
    .optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.",
  ),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
});

const StateSchema = z.object({
  contentDetails: z.object({
    endAt: z.string(),
    note: z.string(),
    startAt: z.string(),
    videoId: z.string(),
    videoPublishedAt: z.string(),
  }).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  snippet: z.object({
    channelId: z.string(),
    channelTitle: z.string(),
    description: z.string(),
    playlistId: z.string(),
    position: z.number(),
    publishedAt: z.string(),
    resourceId: z.object({
      channelId: z.string(),
      kind: z.string(),
      playlistId: z.string(),
      videoId: z.string(),
    }),
    thumbnails: z.object({
      default: z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      }),
      high: z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      }),
      maxres: z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      }),
      medium: z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      }),
      standard: z.object({
        height: z.number(),
        url: z.string(),
        width: z.number(),
      }),
    }),
    title: z.string(),
    videoOwnerChannelId: z.string(),
    videoOwnerChannelTitle: z.string(),
  }).optional(),
  status: z.object({
    privacyStatus: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  contentDetails: z.object({
    endAt: z.string().describe(
      "The time, measured in seconds from the start of the video, when the video should stop playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) By default, assume that the video.endTime is the end of the video.",
    ).optional(),
    note: z.string().describe("A user-generated note for this item.")
      .optional(),
    startAt: z.string().describe(
      "The time, measured in seconds from the start of the video, when the video should start playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) The default value is 0.",
    ).optional(),
    videoId: z.string().describe(
      "The ID that YouTube uses to uniquely identify a video. To retrieve the video resource, set the id query parameter to this value in your API request.",
    ).optional(),
    videoPublishedAt: z.string().describe(
      "The date and time that the video was published to YouTube.",
    ).optional(),
  }).optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the playlist item.",
  ).optional(),
  snippet: z.object({
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the user that added the item to the playlist.",
    ).optional(),
    channelTitle: z.string().describe(
      "Channel title for the channel that the playlist item belongs to.",
    ).optional(),
    description: z.string().describe("The item's description.").optional(),
    playlistId: z.string().describe(
      "The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in.",
    ).optional(),
    position: z.number().int().describe(
      "The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth.",
    ).optional(),
    publishedAt: z.string().describe(
      "The date and time that the item was added to the playlist.",
    ).optional(),
    resourceId: z.object({
      channelId: z.string().describe(
        "The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel.",
      ).optional(),
      kind: z.string().describe("The type of the API resource.").optional(),
      playlistId: z.string().describe(
        "The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist.",
      ).optional(),
      videoId: z.string().describe(
        "The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video.",
      ).optional(),
    }).describe(
      "A resource id is a generic reference that points to another YouTube resource.",
    ).optional(),
    thumbnails: z.object({
      default: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      high: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      maxres: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      medium: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
      standard: z.object({
        height: z.number().int().describe(
          "(Optional) Height of the thumbnail image.",
        ).optional(),
        url: z.string().describe("The thumbnail image's URL.").optional(),
        width: z.number().int().describe(
          "(Optional) Width of the thumbnail image.",
        ).optional(),
      }).describe("A thumbnail is an image representing a YouTube resource.")
        .optional(),
    }).describe("Internal representation of thumbnails for a YouTube resource.")
      .optional(),
    title: z.string().describe("The item's title.").optional(),
    videoOwnerChannelId: z.string().describe(
      "Channel id for the channel this video belongs to.",
    ).optional(),
    videoOwnerChannelTitle: z.string().describe(
      "Channel title for the channel this video belongs to.",
    ).optional(),
  }).describe(
    "Basic details about a playlist, including title, description and thumbnails. Basic details of a YouTube Playlist item provided by the author. Next ID: 15",
  ).optional(),
  status: z.object({
    privacyStatus: z.enum(["public", "unlisted", "private"]).describe(
      "This resource's privacy status.",
    ).optional(),
  }).describe("Information about the playlist item's privacy status.")
    .optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
});

/** Swamp extension model for Google Cloud YouTube Data PlaylistItems. Registered at `@swamp/gcp/youtube/playlistitems`. */
export const model = {
  type: "@swamp/gcp/youtube/playlistitems",
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
      description:
        "A *playlistItem* resource identifies another resource, such as a video, that ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a playlistItems",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        const body: Record<string, unknown> = {};
        if (g["contentDetails"] !== undefined) {
          body["contentDetails"] = g["contentDetails"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["onBehalfOfContentOwner"] !== undefined) {
          body["onBehalfOfContentOwner"] = g["onBehalfOfContentOwner"];
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
      description: "Get a playlistItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the playlistItems"),
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
      description: "Update playlistItems attributes",
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
        if (g["contentDetails"] !== undefined) {
          body["contentDetails"] = g["contentDetails"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["status"] !== undefined) body["status"] = g["status"];
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
      description: "Delete the playlistItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the playlistItems"),
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
      description: "Sync playlistItems state from GCP",
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
  },
};
