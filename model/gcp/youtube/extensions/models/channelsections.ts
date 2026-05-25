// Auto-generated extension model for @swamp/gcp/youtube/channelsections
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data ChannelSections.
 *
 * Retrieves a list of resources, possibly filtered.
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
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://youtube.googleapis.com/";

const INSERT_CONFIG = {
  "id": "youtube.channelSections.insert",
  "path": "youtube/v3/channelSections",
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
  "id": "youtube.channelSections.update",
  "path": "youtube/v3/channelSections",
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
  "id": "youtube.channelSections.delete",
  "path": "youtube/v3/channelSections",
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
  "id": "youtube.channelSections.list",
  "path": "youtube/v3/channelSections",
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
    "mine": {
      "location": "query",
    },
    "onBehalfOfContentOwner": {
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
    channels: z.array(z.string()).describe(
      "The channel ids for type multiple_channels.",
    ).optional(),
    playlists: z.array(z.string()).describe(
      "The playlist ids for type single_playlist and multiple_playlists. For singlePlaylist, only one playlistId is allowed.",
    ).optional(),
  }).describe(
    "Details about a channelsection, including playlists and channels.",
  ).optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the channel section.",
  ).optional(),
  snippet: z.object({
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the channel that published the channel section.",
    ).optional(),
    defaultLanguage: z.string().describe(
      "The language of the channel section's default title and description.",
    ).optional(),
    localized: z.object({
      title: z.string().describe(
        "The localized strings for channel section's title.",
      ).optional(),
    }).describe("ChannelSection localization setting").optional(),
    position: z.number().int().describe(
      "The position of the channel section in the channel.",
    ).optional(),
    style: z.enum([
      "channelsectionStyleUnspecified",
      "horizontalRow",
      "verticalList",
    ]).describe("The style of the channel section.").optional(),
    title: z.string().describe(
      "The channel section's title for multiple_playlists and multiple_channels.",
    ).optional(),
    type: z.enum([
      "channelsectionTypeUndefined",
      "singlePlaylist",
      "multiplePlaylists",
      "popularUploads",
      "recentUploads",
      "likes",
      "allPlaylists",
      "likedPlaylists",
      "recentPosts",
      "recentActivity",
      "liveEvents",
      "upcomingEvents",
      "completedEvents",
      "multipleChannels",
      "postedVideos",
      "postedPlaylists",
      "subscriptions",
    ]).describe("The type of the channel section.").optional(),
  }).describe(
    "Basic details about a channel section, including title, style and position.",
  ).optional(),
  targeting: z.object({
    countries: z.array(z.string()).describe(
      "The country the channel section is targeting.",
    ).optional(),
    languages: z.array(z.string()).describe(
      "The language the channel section is targeting.",
    ).optional(),
    regions: z.array(z.string()).describe(
      "The region the channel section is targeting.",
    ).optional(),
  }).describe("ChannelSection targeting setting.").optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails.",
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
    channels: z.array(z.string()),
    playlists: z.array(z.string()),
  }).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  localizations: z.record(z.string(), z.unknown()).optional(),
  snippet: z.object({
    channelId: z.string(),
    defaultLanguage: z.string(),
    localized: z.object({
      title: z.string(),
    }),
    position: z.number(),
    style: z.string(),
    title: z.string(),
    type: z.string(),
  }).optional(),
  targeting: z.object({
    countries: z.array(z.string()),
    languages: z.array(z.string()),
    regions: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  contentDetails: z.object({
    channels: z.array(z.string()).describe(
      "The channel ids for type multiple_channels.",
    ).optional(),
    playlists: z.array(z.string()).describe(
      "The playlist ids for type single_playlist and multiple_playlists. For singlePlaylist, only one playlistId is allowed.",
    ).optional(),
  }).describe(
    "Details about a channelsection, including playlists and channels.",
  ).optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the channel section.",
  ).optional(),
  snippet: z.object({
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the channel that published the channel section.",
    ).optional(),
    defaultLanguage: z.string().describe(
      "The language of the channel section's default title and description.",
    ).optional(),
    localized: z.object({
      title: z.string().describe(
        "The localized strings for channel section's title.",
      ).optional(),
    }).describe("ChannelSection localization setting").optional(),
    position: z.number().int().describe(
      "The position of the channel section in the channel.",
    ).optional(),
    style: z.enum([
      "channelsectionStyleUnspecified",
      "horizontalRow",
      "verticalList",
    ]).describe("The style of the channel section.").optional(),
    title: z.string().describe(
      "The channel section's title for multiple_playlists and multiple_channels.",
    ).optional(),
    type: z.enum([
      "channelsectionTypeUndefined",
      "singlePlaylist",
      "multiplePlaylists",
      "popularUploads",
      "recentUploads",
      "likes",
      "allPlaylists",
      "likedPlaylists",
      "recentPosts",
      "recentActivity",
      "liveEvents",
      "upcomingEvents",
      "completedEvents",
      "multipleChannels",
      "postedVideos",
      "postedPlaylists",
      "subscriptions",
    ]).describe("The type of the channel section.").optional(),
  }).describe(
    "Basic details about a channel section, including title, style and position.",
  ).optional(),
  targeting: z.object({
    countries: z.array(z.string()).describe(
      "The country the channel section is targeting.",
    ).optional(),
    languages: z.array(z.string()).describe(
      "The language the channel section is targeting.",
    ).optional(),
    regions: z.array(z.string()).describe(
      "The region the channel section is targeting.",
    ).optional(),
  }).describe("ChannelSection targeting setting.").optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part names that you can include in the parameter value are snippet and contentDetails.",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
  onBehalfOfContentOwnerChannel: z.string().describe(
    "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
  ).optional(),
});

/** Swamp extension model for Google Cloud YouTube Data ChannelSections. Registered at `@swamp/gcp/youtube/channelsections`. */
export const model = {
  type: "@swamp/gcp/youtube/channelsections",
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
      description: "Retrieves a list of resources, possibly filtered.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a channelSections",
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
        if (g["targeting"] !== undefined) body["targeting"] = g["targeting"];
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
      description: "Get a channelSections",
      arguments: z.object({
        identifier: z.string().describe("The name of the channelSections"),
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
      description: "Update channelSections attributes",
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
        if (g["targeting"] !== undefined) body["targeting"] = g["targeting"];
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
      description: "Delete the channelSections",
      arguments: z.object({
        identifier: z.string().describe("The name of the channelSections"),
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
      description: "Sync channelSections state from GCP",
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
    list: {
      description: "List channelSections resources",
      arguments: z.object({
        channelId: z.string().describe(
          "Return the ChannelSections owned by the specified channel ID.",
        ).optional(),
        id: z.string().describe(
          "Return the ChannelSections with the given IDs for Stubby or Apiary.",
        ).optional(),
        mine: z.boolean().describe(
          "Return the ChannelSections owned by the authenticated user.",
        ).optional(),
        onBehalfOfContentOwner: z.string().describe(
          "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
        ).optional(),
        part: z.string().describe(
          "The *part* parameter specifies a comma-separated list of one or more channelSection resource properties that the API response will include. The part names that you can include in the parameter value are id, snippet, and contentDetails. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a channelSection resource, the snippet property contains other properties, such as a display title for the channelSection. If you set *part=snippet*, the API response will also contain all of those nested properties.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        if (args["channelId"] !== undefined) {
          params["channelId"] = String(args["channelId"]);
        }
        if (args["id"] !== undefined) params["id"] = String(args["id"]);
        if (args["mine"] !== undefined) params["mine"] = String(args["mine"]);
        if (args["onBehalfOfContentOwner"] !== undefined) {
          params["onBehalfOfContentOwner"] = String(
            args["onBehalfOfContentOwner"],
          );
        }
        if (args["part"] !== undefined) params["part"] = String(args["part"]);
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
