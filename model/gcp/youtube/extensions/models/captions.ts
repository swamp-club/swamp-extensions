// Auto-generated extension model for @swamp/gcp/youtube/captions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data Captions.
 *
 * A *caption* resource represents a YouTube caption track. A caption track is associated with exactly one YouTube video.
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
  "id": "youtube.captions.insert",
  "path": "youtube/v3/captions",
  "httpMethod": "POST",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "onBehalfOf": {
      "location": "query",
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
    "sync": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "youtube.captions.update",
  "path": "youtube/v3/captions",
  "httpMethod": "PUT",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "onBehalfOf": {
      "location": "query",
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
    "sync": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "youtube.captions.delete",
  "path": "youtube/v3/captions",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "query",
      "required": true,
    },
    "onBehalfOf": {
      "location": "query",
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "youtube.captions.list",
  "path": "youtube/v3/captions",
  "httpMethod": "GET",
  "parameterOrder": [
    "part",
    "videoId",
  ],
  "parameters": {
    "id": {
      "location": "query",
    },
    "onBehalfOf": {
      "location": "query",
    },
    "onBehalfOfContentOwner": {
      "location": "query",
    },
    "part": {
      "location": "query",
      "required": true,
    },
    "videoId": {
      "location": "query",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the caption track.",
  ).optional(),
  snippet: z.object({
    audioTrackType: z.enum(["unknown", "primary", "commentary", "descriptive"])
      .describe("The type of audio track associated with the caption track.")
      .optional(),
    failureReason: z.enum([
      "unknownFormat",
      "unsupportedFormat",
      "processingFailed",
    ]).describe(
      "The reason that YouTube failed to process the caption track. This property is only present if the state property's value is failed.",
    ).optional(),
    isAutoSynced: z.boolean().describe(
      "Indicates whether YouTube synchronized the caption track to the audio track in the video. The value will be true if a sync was explicitly requested when the caption track was uploaded. For example, when calling the captions.insert or captions.update methods, you can set the sync parameter to true to instruct YouTube to sync the uploaded track to the video. If the value is false, YouTube uses the time codes in the uploaded caption track to determine when to display captions.",
    ).optional(),
    isCC: z.boolean().describe(
      "Indicates whether the track contains closed captions for the deaf and hard of hearing. The default value is false.",
    ).optional(),
    isDraft: z.boolean().describe(
      "Indicates whether the caption track is a draft. If the value is true, then the track is not publicly visible. The default value is false. @mutable youtube.captions.insert youtube.captions.update",
    ).optional(),
    isEasyReader: z.boolean().describe(
      'Indicates whether caption track is formatted for "easy reader," meaning it is at a third-grade level for language learners. The default value is false.',
    ).optional(),
    isLarge: z.boolean().describe(
      "Indicates whether the caption track uses large text for the vision-impaired. The default value is false.",
    ).optional(),
    language: z.string().describe(
      "The language of the caption track. The property value is a BCP-47 language tag.",
    ).optional(),
    lastUpdated: z.string().describe(
      "The date and time when the caption track was last updated.",
    ).optional(),
    name: z.string().describe(
      "The name of the caption track. The name is intended to be visible to the user as an option during playback.",
    ).optional(),
    status: z.enum(["serving", "syncing", "failed"]).describe(
      "The caption track's status.",
    ).optional(),
    trackKind: z.enum(["standard", "ASR", "forced"]).describe(
      "The caption track's type.",
    ).optional(),
    videoId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the video associated with the caption track. @mutable youtube.captions.insert",
    ).optional(),
  }).describe(
    "Basic details about a caption track, such as its language and name.",
  ).optional(),
  part: z.string().describe(
    "The *part* parameter specifies the caption resource parts that the API response will include. Set the parameter value to snippet.",
  ),
  onBehalfOf: z.string().describe(
    "ID of the Google+ Page for the channel that the request is be on behalf of",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
  sync: z.string().describe(
    "Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio.",
  ).optional(),
});

const StateSchema = z.object({
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  snippet: z.object({
    audioTrackType: z.string(),
    failureReason: z.string(),
    isAutoSynced: z.boolean(),
    isCC: z.boolean(),
    isDraft: z.boolean(),
    isEasyReader: z.boolean(),
    isLarge: z.boolean(),
    language: z.string(),
    lastUpdated: z.string(),
    name: z.string(),
    status: z.string(),
    trackKind: z.string(),
    videoId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  id: z.string().describe(
    "The ID that YouTube uses to uniquely identify the caption track.",
  ).optional(),
  snippet: z.object({
    audioTrackType: z.enum(["unknown", "primary", "commentary", "descriptive"])
      .describe("The type of audio track associated with the caption track.")
      .optional(),
    failureReason: z.enum([
      "unknownFormat",
      "unsupportedFormat",
      "processingFailed",
    ]).describe(
      "The reason that YouTube failed to process the caption track. This property is only present if the state property's value is failed.",
    ).optional(),
    isAutoSynced: z.boolean().describe(
      "Indicates whether YouTube synchronized the caption track to the audio track in the video. The value will be true if a sync was explicitly requested when the caption track was uploaded. For example, when calling the captions.insert or captions.update methods, you can set the sync parameter to true to instruct YouTube to sync the uploaded track to the video. If the value is false, YouTube uses the time codes in the uploaded caption track to determine when to display captions.",
    ).optional(),
    isCC: z.boolean().describe(
      "Indicates whether the track contains closed captions for the deaf and hard of hearing. The default value is false.",
    ).optional(),
    isDraft: z.boolean().describe(
      "Indicates whether the caption track is a draft. If the value is true, then the track is not publicly visible. The default value is false. @mutable youtube.captions.insert youtube.captions.update",
    ).optional(),
    isEasyReader: z.boolean().describe(
      'Indicates whether caption track is formatted for "easy reader," meaning it is at a third-grade level for language learners. The default value is false.',
    ).optional(),
    isLarge: z.boolean().describe(
      "Indicates whether the caption track uses large text for the vision-impaired. The default value is false.",
    ).optional(),
    language: z.string().describe(
      "The language of the caption track. The property value is a BCP-47 language tag.",
    ).optional(),
    lastUpdated: z.string().describe(
      "The date and time when the caption track was last updated.",
    ).optional(),
    name: z.string().describe(
      "The name of the caption track. The name is intended to be visible to the user as an option during playback.",
    ).optional(),
    status: z.enum(["serving", "syncing", "failed"]).describe(
      "The caption track's status.",
    ).optional(),
    trackKind: z.enum(["standard", "ASR", "forced"]).describe(
      "The caption track's type.",
    ).optional(),
    videoId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the video associated with the caption track. @mutable youtube.captions.insert",
    ).optional(),
  }).describe(
    "Basic details about a caption track, such as its language and name.",
  ).optional(),
  part: z.string().describe(
    "The *part* parameter specifies the caption resource parts that the API response will include. Set the parameter value to snippet.",
  ).optional(),
  onBehalfOf: z.string().describe(
    "ID of the Google+ Page for the channel that the request is be on behalf of",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
  sync: z.string().describe(
    "Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio.",
  ).optional(),
});

/** Swamp extension model for Google Cloud YouTube Data Captions. Registered at `@swamp/gcp/youtube/captions`. */
export const model = {
  type: "@swamp/gcp/youtube/captions",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A *caption* resource represents a YouTube caption track. A caption track is a...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a captions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        const body: Record<string, unknown> = {};
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["onBehalfOf"] !== undefined) body["onBehalfOf"] = g["onBehalfOf"];
        if (g["onBehalfOfContentOwner"] !== undefined) {
          body["onBehalfOfContentOwner"] = g["onBehalfOfContentOwner"];
        }
        if (g["sync"] !== undefined) body["sync"] = g["sync"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
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
      description: "Get a captions",
      arguments: z.object({
        identifier: z.string().describe("The name of the captions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        if (g["videoId"] !== undefined) {
          params["videoId"] = String(g["videoId"]);
        }
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
      description: "Update captions attributes",
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
      description: "Delete the captions",
      arguments: z.object({
        identifier: z.string().describe("The name of the captions"),
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
      description: "Sync captions state from GCP",
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
          if (g["videoId"] !== undefined) {
            params["videoId"] = String(g["videoId"]);
          } else if (existing["videoId"]) {
            params["videoId"] = String(existing["videoId"]);
          }
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
    download: {
      description: "download",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "youtube.captions.download",
            "path": "youtube/v3/captions/{id}",
            "httpMethod": "GET",
            "parameterOrder": ["id"],
            "parameters": {
              "id": { "location": "path", "required": true },
              "onBehalfOf": { "location": "query" },
              "onBehalfOfContentOwner": { "location": "query" },
              "tfmt": { "location": "query" },
              "tlang": { "location": "query" },
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
