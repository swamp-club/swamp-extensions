// Auto-generated extension model for @swamp/gcp/youtube/playlists
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data Playlists.
 *
 * A *playlist* resource represents a YouTube playlist. A playlist is a collection of videos that can be viewed sequentially and shared with other users. A playlist can contain up to 200 videos, and YouTube does not limit the number of playlists that each user creates. By default, playlists are publicly visible to other users, but playlists can be public or private. YouTube also uses playlists to identify special collections of videos for a channel, such as: - uploaded videos - favorite videos - positively rated (liked) videos - watch history - watch later To be more specific, these lists are associated with a channel, which is a collection of a person, group, or company's videos, playlists, and other YouTube information. You can retrieve the playlist IDs for each of these lists from the channel resource for a given channel. You can then use the playlistItems.list method to retrieve any of those lists. You can also add or remove items from those lists by calling the playlistItems.insert and playlistItems.delete methods.
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
  "id": "youtube.playlists.insert",
  "path": "youtube/v3/playlists",
  "httpMethod": "POST",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "onBehalfOfContentOwnerChannel": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "youtube.playlists.update",
  "path": "youtube/v3/playlists",
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
  "id": "youtube.playlists.delete",
  "path": "youtube/v3/playlists",
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
  "id": "youtube.playlists.list",
  "path": "youtube/v3/playlists",
  "httpMethod": "GET",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "channelId": {
      "location": "query",
    },
    "hl": {
      "location": "query",
    },
    "id": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "mine": {
      "location": "query",
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "onBehalfOfContentOwnerChannel": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  contentDetails: z.object({
    itemCount: z.number().int().describe(
      "The number of videos in the playlist.",
    ).optional(),
  }).optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the playlist.",
  ).optional(),
  localizations: z.record(
    z.string(),
    z.object({
      description: z.string().describe(
        "The localized strings for playlist's description.",
      ).optional(),
      title: z.string().describe("The localized strings for playlist's title.")
        .optional(),
    }),
  ).describe("Localizations for different languages").optional(),
  player: z.object({
    embedHtml: z.string().describe(
      "An  tag that embeds a player that will play the playlist.",
    ).optional(),
  }).optional(),
  snippet: z.object({
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the channel that published the playlist.",
    ).optional(),
    channelTitle: z.string().describe(
      "The channel title of the channel that the video belongs to.",
    ).optional(),
    defaultLanguage: z.string().describe(
      "The language of the playlist's default title and description.",
    ).optional(),
    description: z.string().describe("The playlist's description.").optional(),
    localized: z.object({
      description: z.string().describe(
        "The localized strings for playlist's description.",
      ).optional(),
      title: z.string().describe("The localized strings for playlist's title.")
        .optional(),
    }).describe("Playlist localization setting").optional(),
    publishedAt: z.string().describe(
      "The date and time that the playlist was created.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "Keyword tags associated with the playlist.",
    ).optional(),
    thumbnailVideoId: z.string().describe(
      "Note: if the playlist has a custom thumbnail, this field will not be populated. The video id selected by the user that will be used as the thumbnail of this playlist. This field defaults to the first publicly viewable video in the playlist, if: 1. The user has never selected a video to be the thumbnail of the playlist. 2. The user selects a video to be the thumbnail, and then removes that video from the playlist. 3. The user selects a non-owned video to be the thumbnail, but that video becomes private, or gets deleted.",
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
    title: z.string().describe("The playlist's title.").optional(),
  }).describe(
    "Basic details about a playlist, including title, description and thumbnails.",
  ).optional(),
  status: z.object({
    podcastStatus: z.enum(["enabled", "disabled"]).describe(
      "The playlist's podcast status.",
    ).optional(),
    privacyStatus: z.enum(["public", "unlisted", "private"]).describe(
      "The playlist's privacy status.",
    ).optional(),
  }).optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.",
  ),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
  onBehalfOfContentOwnerChannel: z.string().describe(
    "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
  ).optional(),
});

const StateSchema = z.object({
  contentDetails: z.object({
    itemCount: z.number(),
  }).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  localizations: z.record(z.string(), z.unknown()).optional(),
  player: z.object({
    embedHtml: z.string(),
  }).optional(),
  snippet: z.object({
    channelId: z.string(),
    channelTitle: z.string(),
    defaultLanguage: z.string(),
    description: z.string(),
    localized: z.object({
      description: z.string(),
      title: z.string(),
    }),
    publishedAt: z.string(),
    tags: z.array(z.string()),
    thumbnailVideoId: z.string(),
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
  }).optional(),
  status: z.object({
    podcastStatus: z.string(),
    privacyStatus: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  contentDetails: z.object({
    itemCount: z.number().int().describe(
      "The number of videos in the playlist.",
    ).optional(),
  }).optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the playlist.",
  ).optional(),
  localizations: z.record(
    z.string(),
    z.object({
      description: z.string().describe(
        "The localized strings for playlist's description.",
      ).optional(),
      title: z.string().describe("The localized strings for playlist's title.")
        .optional(),
    }),
  ).describe("Localizations for different languages").optional(),
  player: z.object({
    embedHtml: z.string().describe(
      "An  tag that embeds a player that will play the playlist.",
    ).optional(),
  }).optional(),
  snippet: z.object({
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the channel that published the playlist.",
    ).optional(),
    channelTitle: z.string().describe(
      "The channel title of the channel that the video belongs to.",
    ).optional(),
    defaultLanguage: z.string().describe(
      "The language of the playlist's default title and description.",
    ).optional(),
    description: z.string().describe("The playlist's description.").optional(),
    localized: z.object({
      description: z.string().describe(
        "The localized strings for playlist's description.",
      ).optional(),
      title: z.string().describe("The localized strings for playlist's title.")
        .optional(),
    }).describe("Playlist localization setting").optional(),
    publishedAt: z.string().describe(
      "The date and time that the playlist was created.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "Keyword tags associated with the playlist.",
    ).optional(),
    thumbnailVideoId: z.string().describe(
      "Note: if the playlist has a custom thumbnail, this field will not be populated. The video id selected by the user that will be used as the thumbnail of this playlist. This field defaults to the first publicly viewable video in the playlist, if: 1. The user has never selected a video to be the thumbnail of the playlist. 2. The user selects a video to be the thumbnail, and then removes that video from the playlist. 3. The user selects a non-owned video to be the thumbnail, but that video becomes private, or gets deleted.",
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
    title: z.string().describe("The playlist's title.").optional(),
  }).describe(
    "Basic details about a playlist, including title, description and thumbnails.",
  ).optional(),
  status: z.object({
    podcastStatus: z.enum(["enabled", "disabled"]).describe(
      "The playlist's podcast status.",
    ).optional(),
    privacyStatus: z.enum(["public", "unlisted", "private"]).describe(
      "The playlist's privacy status.",
    ).optional(),
  }).optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
  onBehalfOfContentOwnerChannel: z.string().describe(
    "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
  ).optional(),
});

/** Swamp extension model for Google Cloud YouTube Data Playlists. Registered at `@swamp/gcp/youtube/playlists`. */
export const model = {
  type: "@swamp/gcp/youtube/playlists",
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
      description:
        "A *playlist* resource represents a YouTube playlist. A playlist is a collecti...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a playlists",
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
        if (g["localizations"] !== undefined) {
          body["localizations"] = g["localizations"];
        }
        if (g["player"] !== undefined) body["player"] = g["player"];
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["onBehalfOfContentOwner"] !== undefined) {
          body["onBehalfOfContentOwner"] = g["onBehalfOfContentOwner"];
        }
        if (g["onBehalfOfContentOwnerChannel"] !== undefined) {
          body["onBehalfOfContentOwnerChannel"] =
            g["onBehalfOfContentOwnerChannel"];
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
      description: "Get a playlists",
      arguments: z.object({
        identifier: z.string().describe("The name of the playlists"),
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
      description: "Update playlists attributes",
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
        if (g["localizations"] !== undefined) {
          body["localizations"] = g["localizations"];
        }
        if (g["player"] !== undefined) body["player"] = g["player"];
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
      description: "Delete the playlists",
      arguments: z.object({
        identifier: z.string().describe("The name of the playlists"),
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
      description: "Sync playlists state from GCP",
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
