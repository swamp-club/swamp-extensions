// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/youtube/search
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data Search.
 *
 * A search result contains information about a YouTube video, channel, or playlist that matches the search parameters specified in an API request. While a search result points to a uniquely identifiable resource, like a video, it does not have its own persistent data.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://youtube.googleapis.com/";

const LIST_CONFIG = {
  "id": "youtube.search.list",
  "path": "youtube/v3/search",
  "httpMethod": "GET",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "channelId": {
      "location": "query",
    },
    "channelType": {
      "location": "query",
    },
    "eventType": {
      "location": "query",
    },
    "forContentOwner": {
      "location": "query",
    },
    "forDeveloper": {
      "location": "query",
    },
    "forMine": {
      "location": "query",
    },
    "location": {
      "location": "query",
    },
    "locationRadius": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "order": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
    "publishedAfter": {
      "location": "query",
    },
    "publishedBefore": {
      "location": "query",
    },
    "q": {
      "location": "query",
    },
    "regionCode": {
      "location": "query",
    },
    "relevanceLanguage": {
      "location": "query",
    },
    "safeSearch": {
      "location": "query",
    },
    "topicId": {
      "location": "query",
    },
    "type": {
      "location": "query",
    },
    "videoCaption": {
      "location": "query",
    },
    "videoCategoryId": {
      "location": "query",
    },
    "videoDefinition": {
      "location": "query",
    },
    "videoDimension": {
      "location": "query",
    },
    "videoDuration": {
      "location": "query",
    },
    "videoEmbeddable": {
      "location": "query",
    },
    "videoLicense": {
      "location": "query",
    },
    "videoPaidProductPlacement": {
      "location": "query",
    },
    "videoSyndicated": {
      "location": "query",
    },
    "videoType": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
});

const StateSchema = z.object({
  etag: z.string().optional(),
  id: z.object({
    channelId: z.string(),
    kind: z.string(),
    playlistId: z.string(),
    videoId: z.string(),
  }).optional(),
  kind: z.string().optional(),
  snippet: z.object({
    channelId: z.string(),
    channelTitle: z.string(),
    description: z.string(),
    liveBroadcastContent: z.string(),
    publishedAt: z.string(),
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
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud YouTube Data Search. Registered at `@swamp/gcp/youtube/search`. */
export const model = {
  type: "@swamp/gcp/youtube/search",
  version: "2026.06.24.2",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.24.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A search result contains information about a YouTube video, channel, or playl...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a search",
      arguments: z.object({
        identifier: z.string().describe("The name of the search"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
          credentials,
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
      description: "Sync search state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
      description: "List search resources",
      arguments: z.object({
        channelId: z.string().describe(
          "Filter on resources belonging to this channelId. (Force TAP rebuild)",
        ).optional(),
        channelType: z.string().describe("Add a filter on the channel search.")
          .optional(),
        eventType: z.string().describe(
          "Filter on the livestream status of the videos.",
        ).optional(),
        forContentOwner: z.boolean().describe(
          "Search owned by a content owner.",
        ).optional(),
        forDeveloper: z.boolean().describe(
          "Restrict the search to only retrieve videos uploaded using the project id of the authenticated user.",
        ).optional(),
        forMine: z.boolean().describe(
          "Search for the private videos of the authenticated user.",
        ).optional(),
        location: z.string().describe("Filter on location of the video")
          .optional(),
        locationRadius: z.string().describe(
          "Filter on distance from the location (specified above).",
        ).optional(),
        maxResults: z.number().describe(
          "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
        ).optional(),
        onBehalfOfContentOwner: z.string().describe(
          "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
        ).optional(),
        order: z.string().describe("Sort order of the results.").optional(),
        part: z.string().describe(
          "The *part* parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet.",
        ).optional(),
        publishedAfter: z.string().describe(
          "Filter on resources published after this date.",
        ).optional(),
        publishedBefore: z.string().describe(
          "Filter on resources published before this date.",
        ).optional(),
        q: z.string().describe("Textual search terms to match.").optional(),
        regionCode: z.string().describe(
          "Display the content as seen by viewers in this country.",
        ).optional(),
        relevanceLanguage: z.string().describe(
          "Return results relevant to this language.",
        ).optional(),
        safeSearch: z.string().describe(
          "Indicates whether the search results should include restricted content as well as standard content.",
        ).optional(),
        topicId: z.string().describe("Restrict results to a particular topic.")
          .optional(),
        type: z.string().describe(
          "Restrict results to a particular set of resource types from One Platform.",
        ).optional(),
        videoCaption: z.string().describe(
          "Filter on the presence of captions on the videos.",
        ).optional(),
        videoCategoryId: z.string().describe(
          "Filter on videos in a specific category.",
        ).optional(),
        videoDefinition: z.string().describe(
          "Filter on the definition of the videos.",
        ).optional(),
        videoDimension: z.string().describe("Filter on 3d videos.").optional(),
        videoDuration: z.string().describe(
          "Filter on the duration of the videos.",
        ).optional(),
        videoEmbeddable: z.string().describe("Filter on embeddable videos.")
          .optional(),
        videoLicense: z.string().describe(
          "Filter on the license of the videos.",
        ).optional(),
        videoPaidProductPlacement: z.string().optional(),
        videoSyndicated: z.string().describe("Filter on syndicated videos.")
          .optional(),
        videoType: z.string().describe("Filter on videos of a specific type.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        if (args["channelId"] !== undefined) {
          params["channelId"] = String(args["channelId"]);
        }
        if (args["channelType"] !== undefined) {
          params["channelType"] = String(args["channelType"]);
        }
        if (args["eventType"] !== undefined) {
          params["eventType"] = String(args["eventType"]);
        }
        if (args["forContentOwner"] !== undefined) {
          params["forContentOwner"] = String(args["forContentOwner"]);
        }
        if (args["forDeveloper"] !== undefined) {
          params["forDeveloper"] = String(args["forDeveloper"]);
        }
        if (args["forMine"] !== undefined) {
          params["forMine"] = String(args["forMine"]);
        }
        if (args["location"] !== undefined) {
          params["location"] = String(args["location"]);
        }
        if (args["locationRadius"] !== undefined) {
          params["locationRadius"] = String(args["locationRadius"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["onBehalfOfContentOwner"] !== undefined) {
          params["onBehalfOfContentOwner"] = String(
            args["onBehalfOfContentOwner"],
          );
        }
        if (args["order"] !== undefined) {
          params["order"] = String(args["order"]);
        }
        if (args["part"] !== undefined) params["part"] = String(args["part"]);
        if (args["publishedAfter"] !== undefined) {
          params["publishedAfter"] = String(args["publishedAfter"]);
        }
        if (args["publishedBefore"] !== undefined) {
          params["publishedBefore"] = String(args["publishedBefore"]);
        }
        if (args["q"] !== undefined) params["q"] = String(args["q"]);
        if (args["regionCode"] !== undefined) {
          params["regionCode"] = String(args["regionCode"]);
        }
        if (args["relevanceLanguage"] !== undefined) {
          params["relevanceLanguage"] = String(args["relevanceLanguage"]);
        }
        if (args["safeSearch"] !== undefined) {
          params["safeSearch"] = String(args["safeSearch"]);
        }
        if (args["topicId"] !== undefined) {
          params["topicId"] = String(args["topicId"]);
        }
        if (args["type"] !== undefined) params["type"] = String(args["type"]);
        if (args["videoCaption"] !== undefined) {
          params["videoCaption"] = String(args["videoCaption"]);
        }
        if (args["videoCategoryId"] !== undefined) {
          params["videoCategoryId"] = String(args["videoCategoryId"]);
        }
        if (args["videoDefinition"] !== undefined) {
          params["videoDefinition"] = String(args["videoDefinition"]);
        }
        if (args["videoDimension"] !== undefined) {
          params["videoDimension"] = String(args["videoDimension"]);
        }
        if (args["videoDuration"] !== undefined) {
          params["videoDuration"] = String(args["videoDuration"]);
        }
        if (args["videoEmbeddable"] !== undefined) {
          params["videoEmbeddable"] = String(args["videoEmbeddable"]);
        }
        if (args["videoLicense"] !== undefined) {
          params["videoLicense"] = String(args["videoLicense"]);
        }
        if (args["videoPaidProductPlacement"] !== undefined) {
          params["videoPaidProductPlacement"] = String(
            args["videoPaidProductPlacement"],
          );
        }
        if (args["videoSyndicated"] !== undefined) {
          params["videoSyndicated"] = String(args["videoSyndicated"]);
        }
        if (args["videoType"] !== undefined) {
          params["videoType"] = String(args["videoType"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
