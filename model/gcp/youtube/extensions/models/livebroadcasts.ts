// Auto-generated extension model for @swamp/gcp/youtube/livebroadcasts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud YouTube Data LiveBroadcasts.
 *
 * A *liveBroadcast* resource represents an event that will be streamed, via live video, on YouTube.
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
  "id": "youtube.liveBroadcasts.insert",
  "path": "youtube/v3/liveBroadcasts",
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
  "id": "youtube.liveBroadcasts.update",
  "path": "youtube/v3/liveBroadcasts",
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
  "id": "youtube.liveBroadcasts.delete",
  "path": "youtube/v3/liveBroadcasts",
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
  "id": "youtube.liveBroadcasts.list",
  "path": "youtube/v3/liveBroadcasts",
  "httpMethod": "GET",
  "parameterOrder": [
    "part",
  ],
  "parameters": {
    "broadcastStatus": {
      "location": "query",
    },
    "broadcastType": {
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
    boundStreamId: z.string().describe(
      "This value uniquely identifies the live stream bound to the broadcast.",
    ).optional(),
    boundStreamLastUpdateTimeMs: z.string().describe(
      "The date and time that the live stream referenced by boundStreamId was last updated.",
    ).optional(),
    closedCaptionsType: z.enum([
      "closedCaptionsTypeUnspecified",
      "closedCaptionsDisabled",
      "closedCaptionsHttpPost",
      "closedCaptionsEmbedded",
    ]).optional(),
    enableAutoStart: z.boolean().describe(
      "This setting indicates whether auto start is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events.",
    ).optional(),
    enableAutoStop: z.boolean().describe(
      "This setting indicates whether auto stop is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events.",
    ).optional(),
    enableClosedCaptions: z.boolean().describe(
      "This setting indicates whether HTTP POST closed captioning is enabled for this broadcast. The ingestion URL of the closed captions is returned through the liveStreams API. This is mutually exclusive with using the closed_captions_type property, and is equivalent to setting closed_captions_type to CLOSED_CAPTIONS_HTTP_POST.",
    ).optional(),
    enableContentEncryption: z.boolean().describe(
      "This setting indicates whether YouTube should enable content encryption for the broadcast.",
    ).optional(),
    enableDvr: z.boolean().describe(
      "This setting determines whether viewers can access DVR controls while watching the video. DVR controls enable the viewer to control the video playback experience by pausing, rewinding, or fast forwarding content. The default value for this property is true. *Important:* You must set the value to true and also set the enableArchive property's value to true if you want to make playback available immediately after the broadcast ends.",
    ).optional(),
    enableEmbed: z.boolean().describe(
      "This setting indicates whether the broadcast video can be played in an embedded player. If you choose to archive the video (using the enableArchive property), this setting will also apply to the archived video.",
    ).optional(),
    enableLowLatency: z.boolean().describe(
      "Indicates whether this broadcast has low latency enabled.",
    ).optional(),
    latencyPreference: z.enum([
      "latencyPreferenceUnspecified",
      "normal",
      "low",
      "ultraLow",
    ]).describe(
      "If both this and enable_low_latency are set, they must match. LATENCY_NORMAL should match enable_low_latency=false LATENCY_LOW should match enable_low_latency=true LATENCY_ULTRA_LOW should have enable_low_latency omitted.",
    ).optional(),
    mesh: z.string().describe(
      "The mesh for projecting the video if projection is mesh. The mesh value must be a UTF-8 string containing the base-64 encoding of 3D mesh data that follows the Spherical Video V2 RFC specification for an mshp box, excluding the box size and type but including the following four reserved zero bytes for the version and flags.",
    ).optional(),
    monitorStream: z.object({
      broadcastStreamDelayMs: z.number().int().describe(
        "If you have set the enableMonitorStream property to true, then this property determines the length of the live broadcast delay.",
      ).optional(),
      embedHtml: z.string().describe(
        "HTML code that embeds a player that plays the monitor stream.",
      ).optional(),
      enableMonitorStream: z.boolean().describe(
        "This value determines whether the monitor stream is enabled for the broadcast. If the monitor stream is enabled, then YouTube will broadcast the event content on a special stream intended only for the broadcaster's consumption. The broadcaster can use the stream to review the event content and also to identify the optimal times to insert cuepoints. You need to set this value to true if you intend to have a broadcast delay for your event. *Note:* This property cannot be updated once the broadcast is in the testing or live state.",
      ).optional(),
    }).describe("Settings and Info of the monitor stream").optional(),
    projection: z.enum(["projectionUnspecified", "rectangular", "360", "mesh"])
      .describe(
        "The projection format of this broadcast. This defaults to rectangular.",
      ).optional(),
    recordFromStart: z.boolean().describe(
      "Automatically start recording after the event goes live. The default value for this property is true. *Important:* You must also set the enableDvr property's value to true if you want the playback to be available immediately after the broadcast ends. If you set this property's value to true but do not also set the enableDvr property to true, there may be a delay of around one day before the archived video will be available for playback.",
    ).optional(),
    startWithSlate: z.boolean().describe(
      "This setting indicates whether the broadcast should automatically begin with an in-stream slate when you update the broadcast's status to live. After updating the status, you then need to send a liveCuepoints.insert request that sets the cuepoint's eventState to end to remove the in-stream slate and make your broadcast stream visible to viewers.",
    ).optional(),
    stereoLayout: z.enum([
      "stereoLayoutUnspecified",
      "mono",
      "leftRight",
      "topBottom",
    ]).describe(
      "The 3D stereo layout of this broadcast. This defaults to mono.",
    ).optional(),
  }).describe("Detailed settings of a broadcast.").optional(),
  id: z.string().describe(
    "The ID that YouTube assigns to uniquely identify the broadcast.",
  ).optional(),
  monetizationDetails: z.object({
    cuepointSchedule: z.object({
      enabled: z.boolean().describe(
        "This field is semantically required. If it is set false or not set, other fields in this message will be ignored.",
      ).optional(),
      pauseAdsUntil: z.string().describe(
        'If set, automatic cuepoint insertion is paused until this timestamp ("No Ad Zone"). The value is specified in ISO 8601 format.',
      ).optional(),
      repeatIntervalSecs: z.number().int().describe(
        "Interval frequency in seconds that api uses to insert cuepoints automatically.",
      ).optional(),
      scheduleStrategy: z.enum([
        "scheduleStrategyUnspecified",
        "concurrent",
        "nonConcurrent",
      ]).describe("The strategy to use when scheduling cuepoints.").optional(),
    }).describe(
      "Schedule to insert cuepoints into a broadcast by ads automator.",
    ).optional(),
  }).describe("Monetization settings of a broadcast.").optional(),
  snippet: z.object({
    actualEndTime: z.string().describe(
      "The date and time that the broadcast actually ended. This information is only available once the broadcast's state is complete.",
    ).optional(),
    actualStartTime: z.string().describe(
      "The date and time that the broadcast actually started. This information is only available once the broadcast's state is live.",
    ).optional(),
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the channel that is publishing the broadcast.",
    ).optional(),
    description: z.string().describe(
      "The broadcast's description. As with the title, you can set this field by modifying the broadcast resource or by setting the description field of the corresponding video resource.",
    ).optional(),
    isDefaultBroadcast: z.boolean().describe(
      "Indicates whether this broadcast is the default broadcast. Internal only.",
    ).optional(),
    liveChatId: z.string().describe(
      "The id of the live chat for this broadcast.",
    ).optional(),
    publishedAt: z.string().describe(
      "The date and time that the broadcast was added to YouTube's live broadcast schedule.",
    ).optional(),
    scheduledEndTime: z.string().describe(
      "The date and time that the broadcast is scheduled to end.",
    ).optional(),
    scheduledStartTime: z.string().describe(
      "The date and time that the broadcast is scheduled to start.",
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
    title: z.string().describe(
      "The broadcast's title. Note that the broadcast represents exactly one YouTube video. You can set this field by modifying the broadcast resource or by setting the title field of the corresponding video resource.",
    ).optional(),
  }).describe("Basic broadcast information.").optional(),
  statistics: z.object({
    concurrentViewers: z.string().describe(
      "The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended.",
    ).optional(),
  }).describe(
    "Statistics about the live broadcast. These represent a snapshot of the values at the time of the request. Statistics are only returned for live broadcasts.",
  ).optional(),
  status: z.object({
    lifeCycleStatus: z.enum([
      "lifeCycleStatusUnspecified",
      "created",
      "ready",
      "testing",
      "live",
      "complete",
      "revoked",
      "testStarting",
      "liveStarting",
    ]).describe(
      "The broadcast's status. The status can be updated using the API's liveBroadcasts.transition method.",
    ).optional(),
    liveBroadcastPriority: z.enum([
      "liveBroadcastPriorityUnspecified",
      "low",
      "normal",
      "high",
    ]).describe("Priority of the live broadcast event (internal state).")
      .optional(),
    madeForKids: z.boolean().describe(
      "Whether the broadcast is made for kids or not, decided by YouTube instead of the creator. This field is read only.",
    ).optional(),
    privacyStatus: z.enum(["public", "unlisted", "private"]).describe(
      "The broadcast's privacy status. Note that the broadcast represents exactly one YouTube video, so the privacy settings are identical to those supported for videos. In addition, you can set this field by modifying the broadcast resource or by setting the privacyStatus field of the corresponding video resource.",
    ).optional(),
    recordingStatus: z.enum([
      "liveBroadcastRecordingStatusUnspecified",
      "notRecording",
      "recording",
      "recorded",
    ]).describe("The broadcast's recording status.").optional(),
    selfDeclaredMadeForKids: z.boolean().describe(
      "This field will be set to True if the creator declares the broadcast to be kids only: go/live-cw-work.",
    ).optional(),
  }).describe("Live broadcast state.").optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status.",
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
    boundStreamId: z.string(),
    boundStreamLastUpdateTimeMs: z.string(),
    closedCaptionsType: z.string(),
    enableAutoStart: z.boolean(),
    enableAutoStop: z.boolean(),
    enableClosedCaptions: z.boolean(),
    enableContentEncryption: z.boolean(),
    enableDvr: z.boolean(),
    enableEmbed: z.boolean(),
    enableLowLatency: z.boolean(),
    latencyPreference: z.string(),
    mesh: z.string(),
    monitorStream: z.object({
      broadcastStreamDelayMs: z.number(),
      embedHtml: z.string(),
      enableMonitorStream: z.boolean(),
    }),
    projection: z.string(),
    recordFromStart: z.boolean(),
    startWithSlate: z.boolean(),
    stereoLayout: z.string(),
  }).optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  monetizationDetails: z.object({
    cuepointSchedule: z.object({
      enabled: z.boolean(),
      pauseAdsUntil: z.string(),
      repeatIntervalSecs: z.number(),
      scheduleStrategy: z.string(),
    }),
  }).optional(),
  snippet: z.object({
    actualEndTime: z.string(),
    actualStartTime: z.string(),
    channelId: z.string(),
    description: z.string(),
    isDefaultBroadcast: z.boolean(),
    liveChatId: z.string(),
    publishedAt: z.string(),
    scheduledEndTime: z.string(),
    scheduledStartTime: z.string(),
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
  statistics: z.object({
    concurrentViewers: z.string(),
  }).optional(),
  status: z.object({
    lifeCycleStatus: z.string(),
    liveBroadcastPriority: z.string(),
    madeForKids: z.boolean(),
    privacyStatus: z.string(),
    recordingStatus: z.string(),
    selfDeclaredMadeForKids: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  contentDetails: z.object({
    boundStreamId: z.string().describe(
      "This value uniquely identifies the live stream bound to the broadcast.",
    ).optional(),
    boundStreamLastUpdateTimeMs: z.string().describe(
      "The date and time that the live stream referenced by boundStreamId was last updated.",
    ).optional(),
    closedCaptionsType: z.enum([
      "closedCaptionsTypeUnspecified",
      "closedCaptionsDisabled",
      "closedCaptionsHttpPost",
      "closedCaptionsEmbedded",
    ]).optional(),
    enableAutoStart: z.boolean().describe(
      "This setting indicates whether auto start is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events.",
    ).optional(),
    enableAutoStop: z.boolean().describe(
      "This setting indicates whether auto stop is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events.",
    ).optional(),
    enableClosedCaptions: z.boolean().describe(
      "This setting indicates whether HTTP POST closed captioning is enabled for this broadcast. The ingestion URL of the closed captions is returned through the liveStreams API. This is mutually exclusive with using the closed_captions_type property, and is equivalent to setting closed_captions_type to CLOSED_CAPTIONS_HTTP_POST.",
    ).optional(),
    enableContentEncryption: z.boolean().describe(
      "This setting indicates whether YouTube should enable content encryption for the broadcast.",
    ).optional(),
    enableDvr: z.boolean().describe(
      "This setting determines whether viewers can access DVR controls while watching the video. DVR controls enable the viewer to control the video playback experience by pausing, rewinding, or fast forwarding content. The default value for this property is true. *Important:* You must set the value to true and also set the enableArchive property's value to true if you want to make playback available immediately after the broadcast ends.",
    ).optional(),
    enableEmbed: z.boolean().describe(
      "This setting indicates whether the broadcast video can be played in an embedded player. If you choose to archive the video (using the enableArchive property), this setting will also apply to the archived video.",
    ).optional(),
    enableLowLatency: z.boolean().describe(
      "Indicates whether this broadcast has low latency enabled.",
    ).optional(),
    latencyPreference: z.enum([
      "latencyPreferenceUnspecified",
      "normal",
      "low",
      "ultraLow",
    ]).describe(
      "If both this and enable_low_latency are set, they must match. LATENCY_NORMAL should match enable_low_latency=false LATENCY_LOW should match enable_low_latency=true LATENCY_ULTRA_LOW should have enable_low_latency omitted.",
    ).optional(),
    mesh: z.string().describe(
      "The mesh for projecting the video if projection is mesh. The mesh value must be a UTF-8 string containing the base-64 encoding of 3D mesh data that follows the Spherical Video V2 RFC specification for an mshp box, excluding the box size and type but including the following four reserved zero bytes for the version and flags.",
    ).optional(),
    monitorStream: z.object({
      broadcastStreamDelayMs: z.number().int().describe(
        "If you have set the enableMonitorStream property to true, then this property determines the length of the live broadcast delay.",
      ).optional(),
      embedHtml: z.string().describe(
        "HTML code that embeds a player that plays the monitor stream.",
      ).optional(),
      enableMonitorStream: z.boolean().describe(
        "This value determines whether the monitor stream is enabled for the broadcast. If the monitor stream is enabled, then YouTube will broadcast the event content on a special stream intended only for the broadcaster's consumption. The broadcaster can use the stream to review the event content and also to identify the optimal times to insert cuepoints. You need to set this value to true if you intend to have a broadcast delay for your event. *Note:* This property cannot be updated once the broadcast is in the testing or live state.",
      ).optional(),
    }).describe("Settings and Info of the monitor stream").optional(),
    projection: z.enum(["projectionUnspecified", "rectangular", "360", "mesh"])
      .describe(
        "The projection format of this broadcast. This defaults to rectangular.",
      ).optional(),
    recordFromStart: z.boolean().describe(
      "Automatically start recording after the event goes live. The default value for this property is true. *Important:* You must also set the enableDvr property's value to true if you want the playback to be available immediately after the broadcast ends. If you set this property's value to true but do not also set the enableDvr property to true, there may be a delay of around one day before the archived video will be available for playback.",
    ).optional(),
    startWithSlate: z.boolean().describe(
      "This setting indicates whether the broadcast should automatically begin with an in-stream slate when you update the broadcast's status to live. After updating the status, you then need to send a liveCuepoints.insert request that sets the cuepoint's eventState to end to remove the in-stream slate and make your broadcast stream visible to viewers.",
    ).optional(),
    stereoLayout: z.enum([
      "stereoLayoutUnspecified",
      "mono",
      "leftRight",
      "topBottom",
    ]).describe(
      "The 3D stereo layout of this broadcast. This defaults to mono.",
    ).optional(),
  }).describe("Detailed settings of a broadcast.").optional(),
  id: z.string().describe(
    "The ID that YouTube assigns to uniquely identify the broadcast.",
  ).optional(),
  monetizationDetails: z.object({
    cuepointSchedule: z.object({
      enabled: z.boolean().describe(
        "This field is semantically required. If it is set false or not set, other fields in this message will be ignored.",
      ).optional(),
      pauseAdsUntil: z.string().describe(
        'If set, automatic cuepoint insertion is paused until this timestamp ("No Ad Zone"). The value is specified in ISO 8601 format.',
      ).optional(),
      repeatIntervalSecs: z.number().int().describe(
        "Interval frequency in seconds that api uses to insert cuepoints automatically.",
      ).optional(),
      scheduleStrategy: z.enum([
        "scheduleStrategyUnspecified",
        "concurrent",
        "nonConcurrent",
      ]).describe("The strategy to use when scheduling cuepoints.").optional(),
    }).describe(
      "Schedule to insert cuepoints into a broadcast by ads automator.",
    ).optional(),
  }).describe("Monetization settings of a broadcast.").optional(),
  snippet: z.object({
    actualEndTime: z.string().describe(
      "The date and time that the broadcast actually ended. This information is only available once the broadcast's state is complete.",
    ).optional(),
    actualStartTime: z.string().describe(
      "The date and time that the broadcast actually started. This information is only available once the broadcast's state is live.",
    ).optional(),
    channelId: z.string().describe(
      "The ID that YouTube uses to uniquely identify the channel that is publishing the broadcast.",
    ).optional(),
    description: z.string().describe(
      "The broadcast's description. As with the title, you can set this field by modifying the broadcast resource or by setting the description field of the corresponding video resource.",
    ).optional(),
    isDefaultBroadcast: z.boolean().describe(
      "Indicates whether this broadcast is the default broadcast. Internal only.",
    ).optional(),
    liveChatId: z.string().describe(
      "The id of the live chat for this broadcast.",
    ).optional(),
    publishedAt: z.string().describe(
      "The date and time that the broadcast was added to YouTube's live broadcast schedule.",
    ).optional(),
    scheduledEndTime: z.string().describe(
      "The date and time that the broadcast is scheduled to end.",
    ).optional(),
    scheduledStartTime: z.string().describe(
      "The date and time that the broadcast is scheduled to start.",
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
    title: z.string().describe(
      "The broadcast's title. Note that the broadcast represents exactly one YouTube video. You can set this field by modifying the broadcast resource or by setting the title field of the corresponding video resource.",
    ).optional(),
  }).describe("Basic broadcast information.").optional(),
  statistics: z.object({
    concurrentViewers: z.string().describe(
      "The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended.",
    ).optional(),
  }).describe(
    "Statistics about the live broadcast. These represent a snapshot of the values at the time of the request. Statistics are only returned for live broadcasts.",
  ).optional(),
  status: z.object({
    lifeCycleStatus: z.enum([
      "lifeCycleStatusUnspecified",
      "created",
      "ready",
      "testing",
      "live",
      "complete",
      "revoked",
      "testStarting",
      "liveStarting",
    ]).describe(
      "The broadcast's status. The status can be updated using the API's liveBroadcasts.transition method.",
    ).optional(),
    liveBroadcastPriority: z.enum([
      "liveBroadcastPriorityUnspecified",
      "low",
      "normal",
      "high",
    ]).describe("Priority of the live broadcast event (internal state).")
      .optional(),
    madeForKids: z.boolean().describe(
      "Whether the broadcast is made for kids or not, decided by YouTube instead of the creator. This field is read only.",
    ).optional(),
    privacyStatus: z.enum(["public", "unlisted", "private"]).describe(
      "The broadcast's privacy status. Note that the broadcast represents exactly one YouTube video, so the privacy settings are identical to those supported for videos. In addition, you can set this field by modifying the broadcast resource or by setting the privacyStatus field of the corresponding video resource.",
    ).optional(),
    recordingStatus: z.enum([
      "liveBroadcastRecordingStatusUnspecified",
      "notRecording",
      "recording",
      "recorded",
    ]).describe("The broadcast's recording status.").optional(),
    selfDeclaredMadeForKids: z.boolean().describe(
      "This field will be set to True if the creator declares the broadcast to be kids only: go/live-cw-work.",
    ).optional(),
  }).describe("Live broadcast state.").optional(),
  part: z.string().describe(
    "The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status.",
  ).optional(),
  onBehalfOfContentOwner: z.string().describe(
    "*Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.",
  ).optional(),
  onBehalfOfContentOwnerChannel: z.string().describe(
    "This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.",
  ).optional(),
});

/** Swamp extension model for Google Cloud YouTube Data LiveBroadcasts. Registered at `@swamp/gcp/youtube/livebroadcasts`. */
export const model = {
  type: "@swamp/gcp/youtube/livebroadcasts",
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
        "A *liveBroadcast* resource represents an event that will be streamed, via liv...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a liveBroadcasts",
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
        if (g["monetizationDetails"] !== undefined) {
          body["monetizationDetails"] = g["monetizationDetails"];
        }
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["statistics"] !== undefined) body["statistics"] = g["statistics"];
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
      description: "Get a liveBroadcasts",
      arguments: z.object({
        identifier: z.string().describe("The name of the liveBroadcasts"),
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
      description: "Update liveBroadcasts attributes",
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
        if (g["monetizationDetails"] !== undefined) {
          body["monetizationDetails"] = g["monetizationDetails"];
        }
        if (g["snippet"] !== undefined) body["snippet"] = g["snippet"];
        if (g["statistics"] !== undefined) body["statistics"] = g["statistics"];
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
      description: "Delete the liveBroadcasts",
      arguments: z.object({
        identifier: z.string().describe("The name of the liveBroadcasts"),
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
      description: "Sync liveBroadcasts state from GCP",
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
    bind: {
      description: "bind",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "youtube.liveBroadcasts.bind",
            "path": "youtube/v3/liveBroadcasts/bind",
            "httpMethod": "POST",
            "parameterOrder": ["id", "part"],
            "parameters": {
              "id": { "location": "query", "required": true },
              "onBehalfOfContentOwner": { "location": "query" },
              "onBehalfOfContentOwnerChannel": { "location": "query" },
              "part": { "location": "query", "required": true },
              "streamId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    insert_cuepoint: {
      description: "insert cuepoint",
      arguments: z.object({
        cueType: z.any().optional(),
        durationSecs: z.any().optional(),
        etag: z.any().optional(),
        id: z.any().optional(),
        insertionOffsetTimeMs: z.any().optional(),
        walltimeMs: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["cueType"] !== undefined) body["cueType"] = args["cueType"];
        if (args["durationSecs"] !== undefined) {
          body["durationSecs"] = args["durationSecs"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["insertionOffsetTimeMs"] !== undefined) {
          body["insertionOffsetTimeMs"] = args["insertionOffsetTimeMs"];
        }
        if (args["walltimeMs"] !== undefined) {
          body["walltimeMs"] = args["walltimeMs"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "youtube.liveBroadcasts.insertCuepoint",
            "path": "youtube/v3/liveBroadcasts/cuepoint",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {
              "id": { "location": "query" },
              "onBehalfOfContentOwner": { "location": "query" },
              "onBehalfOfContentOwnerChannel": { "location": "query" },
              "part": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    transition: {
      description: "transition",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        if (g["part"] !== undefined) params["part"] = String(g["part"]);
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
        params["broadcastStatus"] = existing["broadcastStatus"]?.toString() ??
          g["broadcastStatus"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "youtube.liveBroadcasts.transition",
            "path": "youtube/v3/liveBroadcasts/transition",
            "httpMethod": "POST",
            "parameterOrder": ["broadcastStatus", "id", "part"],
            "parameters": {
              "broadcastStatus": { "location": "query", "required": true },
              "id": { "location": "query", "required": true },
              "onBehalfOfContentOwner": { "location": "query" },
              "onBehalfOfContentOwnerChannel": { "location": "query" },
              "part": { "location": "query", "required": true },
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
