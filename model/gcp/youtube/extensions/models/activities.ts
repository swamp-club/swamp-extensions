// Auto-generated extension model for @swamp/gcp/youtube/activities
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data Activities.
 *
 * An *activity* resource contains information about an action that a particular channel, or user, has taken on YouTube.The actions reported in activity feeds include rating a video, sharing a video, marking a video as a favorite, commenting on a video, uploading a video, and so forth. Each activity resource identifies the type of action, the channel associated with the action, and the resource(s) associated with the action, such as the video that was rated or uploaded.
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
  "id": "youtube.activities.list",
  "path": "youtube/v3/activities",
  "httpMethod": "GET",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "channelId": {
      "location": "query",
    },
    "home": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "mine": {
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
    "regionCode": {
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
  contentDetails: z.object({
    bulletin: z.object({
      resourceId: z.object({
        channelId: z.string(),
        kind: z.string(),
        playlistId: z.string(),
        videoId: z.string(),
      }),
    }),
    channelItem: z.object({
      resourceId: z.object({
        channelId: z.string(),
        kind: z.string(),
        playlistId: z.string(),
        videoId: z.string(),
      }),
    }),
    comment: z.object({
      resourceId: z.object({
        channelId: z.string(),
        kind: z.string(),
        playlistId: z.string(),
        videoId: z.string(),
      }),
    }),
    favorite: z.object({
      resourceId: z.object({
        channelId: z.string(),
        kind: z.string(),
        playlistId: z.string(),
        videoId: z.string(),
      }),
    }),
    like: z.object({
      resourceId: z.object({
        channelId: z.string(),
        kind: z.string(),
        playlistId: z.string(),
        videoId: z.string(),
      }),
    }),
    playlistItem: z.object({
      playlistId: z.string(),
      playlistItemId: z.string(),
      resourceId: z.object({
        channelId: z.string(),
        kind: z.string(),
        playlistId: z.string(),
        videoId: z.string(),
      }),
    }),
    promotedItem: z.object({
      adTag: z.string(),
      clickTrackingUrl: z.string(),
      creativeViewUrl: z.string(),
      ctaType: z.string(),
      customCtaButtonText: z.string(),
      descriptionText: z.string(),
      destinationUrl: z.string(),
      forecastingUrl: z.array(z.string()),
      impressionUrl: z.array(z.string()),
      videoId: z.string(),
    }),
    recommendation: z.object({
      reason: z.string(),
      resourceId: z.object({
        channelId: z.string(),
        kind: z.string(),
        playlistId: z.string(),
        videoId: z.string(),
      }),
      seedResourceId: z.object({
        channelId: z.string(),
        kind: z.string(),
        playlistId: z.string(),
        videoId: z.string(),
      }),
    }),
    social: z.object({
      author: z.string(),
      imageUrl: z.string(),
      referenceUrl: z.string(),
      resourceId: z.object({
        channelId: z.string(),
        kind: z.string(),
        playlistId: z.string(),
        videoId: z.string(),
      }),
      type: z.string(),
    }),
    subscription: z.object({
      resourceId: z.object({
        channelId: z.string(),
        kind: z.string(),
        playlistId: z.string(),
        videoId: z.string(),
      }),
    }),
    upload: z.object({
      videoId: z.string(),
    }),
  }).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  snippet: z.object({
    channelId: z.string(),
    channelTitle: z.string(),
    description: z.string(),
    groupId: z.string(),
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
    type: z.string(),
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

/** Swamp extension model for Google Cloud YouTube Data Activities. Registered at `@swamp/gcp/youtube/activities`. */
export const model = {
  type: "@swamp/gcp/youtube/activities",
  version: "2026.06.07.1",
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
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An *activity* resource contains information about an action that a particular...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a activities",
      arguments: z.object({
        identifier: z.string().describe("The name of the activities"),
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
      description: "Sync activities state from GCP",
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
      description: "List activities resources",
      arguments: z.object({
        channelId: z.string().optional(),
        maxResults: z.number().describe(
          "The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.",
        ).optional(),
        mine: z.boolean().optional(),
        part: z.string().describe(
          "The *part* parameter specifies a comma-separated list of one or more activity resource properties that the API response will include. If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in an activity resource, the snippet property contains other properties that identify the type of activity, a display title for the activity, and so forth. If you set *part=snippet*, the API response will also contain all of those nested properties.",
        ).optional(),
        publishedAfter: z.string().optional(),
        publishedBefore: z.string().optional(),
        regionCode: z.string().optional(),
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
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["mine"] !== undefined) params["mine"] = String(args["mine"]);
        if (args["part"] !== undefined) params["part"] = String(args["part"]);
        if (args["publishedAfter"] !== undefined) {
          params["publishedAfter"] = String(args["publishedAfter"]);
        }
        if (args["publishedBefore"] !== undefined) {
          params["publishedBefore"] = String(args["publishedBefore"]);
        }
        if (args["regionCode"] !== undefined) {
          params["regionCode"] = String(args["regionCode"]);
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
