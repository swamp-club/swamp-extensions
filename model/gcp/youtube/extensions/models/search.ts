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
  getProjectId,
  isResourceNotFoundError,
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
});

/** Swamp extension model for Google Cloud YouTube Data Search. Registered at `@swamp/gcp/youtube/search`. */
export const model = {
  type: "@swamp/gcp/youtube/search",
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
    sync: {
      description: "Sync search state from GCP",
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
