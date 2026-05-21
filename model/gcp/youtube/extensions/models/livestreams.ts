// Auto-generated extension model for @swamp/gcp/youtube/livestreams
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data LiveStreams.
 *
 * A live stream describes a live ingestion point.
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
  "id": "youtube.liveStreams.insert",
  "path": "youtube/v3/liveStreams",
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
  "id": "youtube.liveStreams.update",
  "path": "youtube/v3/liveStreams",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "youtube.liveStreams.delete",
  "path": "youtube/v3/liveStreams",
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
    "onBehalfOfContentOwnerChannel": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "youtube.liveStreams.list",
  "path": "youtube/v3/liveStreams",
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
  cdn: z.object({
    format: z.string().describe(
      "The format of the video stream that you are sending to Youtube.",
    ).optional(),
    frameRate: z.enum(["30fps", "60fps", "variable"]).describe(
      "The frame rate of the inbound video data.",
    ).optional(),
    ingestionInfo: z.object({
      backupIngestionAddress: z.string().describe(
        "The backup ingestion URL that you should use to stream video to YouTube. You have the option of simultaneously streaming the content that you are sending to the ingestionAddress to this URL.",
      ).optional(),
      ingestionAddress: z.string().describe(
        "The primary ingestion URL that you should use to stream video to YouTube. You must stream video to this URL. Depending on which application or tool you use to encode your video stream, you may need to enter the stream URL and stream name separately or you may need to concatenate them in the following format: *STREAM_URL/STREAM_NAME*",
      ).optional(),
      rtmpsBackupIngestionAddress: z.string().describe(
        "This ingestion url may be used instead of backupIngestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams.",
      ).optional(),
      rtmpsIngestionAddress: z.string().describe(
        "This ingestion url may be used instead of ingestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams.",
      ).optional(),
      streamName: z.string().describe(
        "The stream name that YouTube assigns to the video stream.",
      ).optional(),
    }).describe(
      "Describes information necessary for ingesting an RTMP, HTTP, or SRT stream.",
    ).optional(),
    ingestionType: z.enum(["rtmp", "dash", "webrtc", "hls"]).describe(
      "The method or protocol used to transmit the video stream.",
    ).optional(),
    resolution: z.enum([
      "240p",
      "360p",
      "480p",
      "720p",
      "1080p",
      "1440p",
      "2160p",
      "variable",
    ]).describe("The resolution of the inbound video data.").optional(),
  }).describe("Brief description of the live stream cdn settings.").optional(),
  contentDetails: z.object({
    closedCaptionsIngestionUrl: z.string().describe(
      "The ingestion URL where the closed captions of this stream are sent.",
    ).optional(),
    isReusable: z.boolean().describe(
      "Indicates whether the stream is reusable, which means that it can be bound to multiple broadcasts. It is common for broadcasters to reuse the same stream for many different broadcasts if those broadcasts occur at different times. If you set this value to false, then the stream will not be reusable, which means that it can only be bound to one broadcast. Non-reusable streams differ from reusable streams in the following ways: - A non-reusable stream can only be bound to one broadcast. - A non-reusable stream might be deleted by an automated process after the broadcast ends. - The liveStreams.list method does not list non-reusable streams if you call the method and set the mine parameter to true. The only way to use that method to retrieve the resource for a non-reusable stream is to use the id parameter to identify the stream.",
    ).optional(),
  }).describe("Detailed settings of a stream.").optional(),
  id: z.string().describe(
    "The ID that YouTube assigns to uniquely identify the stream.",
  ).optional(),
  snippet: z.object({
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the channel that is transmitting the stream.",
    ).optional(),
    description: z.string().describe(
      "The stream's description. The value cannot be longer than 10000 characters.",
    ).optional(),
    isDefaultStream: z.boolean().optional(),
    publishedAt: z.string().describe(
      "The date and time that the stream was created.",
    ).optional(),
    title: z.string().describe(
      "The stream's title. The value must be between 1 and 128 characters long.",
    ).optional(),
  }).optional(),
  status: z.object({
    healthStatus: z.object({
      configurationIssues: z.array(z.object({
        description: z.string().describe(
          "The long-form description of the issue and how to resolve it.",
        ).optional(),
        reason: z.string().describe("The short-form reason for this issue.")
          .optional(),
        severity: z.enum(["info", "warning", "error"]).describe(
          "How severe this issue is to the stream.",
        ).optional(),
        type: z.enum([
          "gopSizeOver",
          "gopSizeLong",
          "gopSizeShort",
          "openGop",
          "badContainer",
          "audioBitrateHigh",
          "audioBitrateLow",
          "audioSampleRate",
          "bitrateHigh",
          "bitrateLow",
          "audioCodec",
          "videoCodec",
          "noAudioStream",
          "noVideoStream",
          "multipleVideoStreams",
          "multipleAudioStreams",
          "audioTooManyChannels",
          "interlacedVideo",
          "frameRateHigh",
          "resolutionMismatch",
          "videoCodecMismatch",
          "videoInterlaceMismatch",
          "videoProfileMismatch",
          "videoBitrateMismatch",
          "framerateMismatch",
          "gopMismatch",
          "audioSampleRateMismatch",
          "audioStereoMismatch",
          "audioCodecMismatch",
          "audioBitrateMismatch",
          "videoResolutionSuboptimal",
          "videoResolutionUnsupported",
          "videoIngestionStarved",
          "videoIngestionFasterThanRealtime",
        ]).describe("The kind of error happening.").optional(),
      })).describe("The configurations issues on this stream").optional(),
      lastUpdateTimeSeconds: z.string().describe(
        "The last time this status was updated (in seconds)",
      ).optional(),
      status: z.enum(["good", "ok", "bad", "noData", "revoked"]).describe(
        "The status code of this stream",
      ).optional(),
    }).optional(),
    streamStatus: z.enum(["created", "ready", "active", "inactive", "error"])
      .optional(),
  }).describe("Brief description of the live stream status.").optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, cdn, content_details, and status.",
  ),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
  onBehalfOfContentOwnerChannel: z.string().describe(
    "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
  ).optional(),
});

const StateSchema = z.object({
  cdn: z.object({
    format: z.string(),
    frameRate: z.string(),
    ingestionInfo: z.object({
      backupIngestionAddress: z.string(),
      ingestionAddress: z.string(),
      rtmpsBackupIngestionAddress: z.string(),
      rtmpsIngestionAddress: z.string(),
      streamName: z.string(),
    }),
    ingestionType: z.string(),
    resolution: z.string(),
  }).optional(),
  contentDetails: z.object({
    closedCaptionsIngestionUrl: z.string(),
    isReusable: z.boolean(),
  }).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  snippet: z.object({
    channelId: z.string(),
    description: z.string(),
    isDefaultStream: z.boolean(),
    publishedAt: z.string(),
    title: z.string(),
  }).optional(),
  status: z.object({
    healthStatus: z.object({
      configurationIssues: z.array(z.object({
        description: z.string(),
        reason: z.string(),
        severity: z.string(),
        type: z.string(),
      })),
      lastUpdateTimeSeconds: z.string(),
      status: z.string(),
    }),
    streamStatus: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  cdn: z.object({
    format: z.string().describe(
      "The format of the video stream that you are sending to Youtube.",
    ).optional(),
    frameRate: z.enum(["30fps", "60fps", "variable"]).describe(
      "The frame rate of the inbound video data.",
    ).optional(),
    ingestionInfo: z.object({
      backupIngestionAddress: z.string().describe(
        "The backup ingestion URL that you should use to stream video to YouTube. You have the option of simultaneously streaming the content that you are sending to the ingestionAddress to this URL.",
      ).optional(),
      ingestionAddress: z.string().describe(
        "The primary ingestion URL that you should use to stream video to YouTube. You must stream video to this URL. Depending on which application or tool you use to encode your video stream, you may need to enter the stream URL and stream name separately or you may need to concatenate them in the following format: *STREAM_URL/STREAM_NAME*",
      ).optional(),
      rtmpsBackupIngestionAddress: z.string().describe(
        "This ingestion url may be used instead of backupIngestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams.",
      ).optional(),
      rtmpsIngestionAddress: z.string().describe(
        "This ingestion url may be used instead of ingestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams.",
      ).optional(),
      streamName: z.string().describe(
        "The stream name that YouTube assigns to the video stream.",
      ).optional(),
    }).describe(
      "Describes information necessary for ingesting an RTMP, HTTP, or SRT stream.",
    ).optional(),
    ingestionType: z.enum(["rtmp", "dash", "webrtc", "hls"]).describe(
      "The method or protocol used to transmit the video stream.",
    ).optional(),
    resolution: z.enum([
      "240p",
      "360p",
      "480p",
      "720p",
      "1080p",
      "1440p",
      "2160p",
      "variable",
    ]).describe("The resolution of the inbound video data.").optional(),
  }).describe("Brief description of the live stream cdn settings.").optional(),
  contentDetails: z.object({
    closedCaptionsIngestionUrl: z.string().describe(
      "The ingestion URL where the closed captions of this stream are sent.",
    ).optional(),
    isReusable: z.boolean().describe(
      "Indicates whether the stream is reusable, which means that it can be bound to multiple broadcasts. It is common for broadcasters to reuse the same stream for many different broadcasts if those broadcasts occur at different times. If you set this value to false, then the stream will not be reusable, which means that it can only be bound to one broadcast. Non-reusable streams differ from reusable streams in the following ways: - A non-reusable stream can only be bound to one broadcast. - A non-reusable stream might be deleted by an automated process after the broadcast ends. - The liveStreams.list method does not list non-reusable streams if you call the method and set the mine parameter to true. The only way to use that method to retrieve the resource for a non-reusable stream is to use the id parameter to identify the stream.",
    ).optional(),
  }).describe("Detailed settings of a stream.").optional(),
  id: z.string().describe(
    "The ID that YouTube assigns to uniquely identify the stream.",
  ).optional(),
  snippet: z.object({
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the channel that is transmitting the stream.",
    ).optional(),
    description: z.string().describe(
      "The stream's description. The value cannot be longer than 10000 characters.",
    ).optional(),
    isDefaultStream: z.boolean().optional(),
    publishedAt: z.string().describe(
      "The date and time that the stream was created.",
    ).optional(),
    title: z.string().describe(
      "The stream's title. The value must be between 1 and 128 characters long.",
    ).optional(),
  }).optional(),
  status: z.object({
    healthStatus: z.object({
      configurationIssues: z.array(z.object({
        description: z.string().describe(
          "The long-form description of the issue and how to resolve it.",
        ).optional(),
        reason: z.string().describe("The short-form reason for this issue.")
          .optional(),
        severity: z.enum(["info", "warning", "error"]).describe(
          "How severe this issue is to the stream.",
        ).optional(),
        type: z.enum([
          "gopSizeOver",
          "gopSizeLong",
          "gopSizeShort",
          "openGop",
          "badContainer",
          "audioBitrateHigh",
          "audioBitrateLow",
          "audioSampleRate",
          "bitrateHigh",
          "bitrateLow",
          "audioCodec",
          "videoCodec",
          "noAudioStream",
          "noVideoStream",
          "multipleVideoStreams",
          "multipleAudioStreams",
          "audioTooManyChannels",
          "interlacedVideo",
          "frameRateHigh",
          "resolutionMismatch",
          "videoCodecMismatch",
          "videoInterlaceMismatch",
          "videoProfileMismatch",
          "videoBitrateMismatch",
          "framerateMismatch",
          "gopMismatch",
          "audioSampleRateMismatch",
          "audioStereoMismatch",
          "audioCodecMismatch",
          "audioBitrateMismatch",
          "videoResolutionSuboptimal",
          "videoResolutionUnsupported",
          "videoIngestionStarved",
          "videoIngestionFasterThanRealtime",
        ]).describe("The kind of error happening.").optional(),
      })).describe("The configurations issues on this stream").optional(),
      lastUpdateTimeSeconds: z.string().describe(
        "The last time this status was updated (in seconds)",
      ).optional(),
      status: z.enum(["good", "ok", "bad", "noData", "revoked"]).describe(
        "The status code of this stream",
      ).optional(),
    }).optional(),
    streamStatus: z.enum(["created", "ready", "active", "inactive", "error"])
      .optional(),
  }).describe("Brief description of the live stream status.").optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, cdn, content_details, and status.",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
  onBehalfOfContentOwnerChannel: z.string().describe(
    "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
  ).optional(),
});

/** Swamp extension model for Google Cloud YouTube Data LiveStreams. Registered at `@swamp/gcp/youtube/livestreams`. */
export const model = {
  type: "@swamp/gcp/youtube/livestreams",
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
      description: "A live stream describes a live ingestion point.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a liveStreams",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        const body: Record<string, unknown> = {};
        if (g["cdn"] !== undefined) body["cdn"] = g["cdn"];
        if (g["contentDetails"] !== undefined) {
          body["contentDetails"] = g["contentDetails"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
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
      description: "Get a liveStreams",
      arguments: z.object({
        identifier: z.string().describe("The name of the liveStreams"),
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
      description: "Update liveStreams attributes",
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
        if (g["cdn"] !== undefined) body["cdn"] = g["cdn"];
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
      description: "Delete the liveStreams",
      arguments: z.object({
        identifier: z.string().describe("The name of the liveStreams"),
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
      description: "Sync liveStreams state from GCP",
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
