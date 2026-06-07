// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-creatives
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.Creatives.
 *
 * A single Creative.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.advertisers.creatives.get",
  "path": "v4/advertisers/{+advertiserId}/creatives/{+creativeId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "creativeId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "creativeId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.advertisers.creatives.create",
  "path": "v4/advertisers/{+advertiserId}/creatives",
  "httpMethod": "POST",
  "parameterOrder": [
    "advertiserId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "displayvideo.advertisers.creatives.patch",
  "path": "v4/advertisers/{+advertiserId}/creatives/{+creativeId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "advertiserId",
    "creativeId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "creativeId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.creatives.delete",
  "path": "v4/advertisers/{+advertiserId}/creatives/{+creativeId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
    "creativeId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "creativeId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.creatives.list",
  "path": "v4/advertisers/{+advertiserId}/creatives",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
  ],
  "parameters": {
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
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
  additionalDimensions: z.array(z.object({
    heightPixels: z.number().int().describe("The height in pixels.").optional(),
    widthPixels: z.number().int().describe("The width in pixels.").optional(),
  })).describe(
    "Optional. Additional dimensions. Applicable when creative_type is one of: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_LIGHTBOX` * `CREATIVE_TYPE_PUBLISHER_HOSTED` If this field is specified, width_pixels and height_pixels are both required and must be greater than or equal to 0.",
  ).optional(),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the creative belongs to.",
  ).optional(),
  appendedTag: z.string().describe(
    "Optional. Third-party HTML tracking tag to be appended to the creative tag.",
  ).optional(),
  assets: z.array(z.object({
    asset: z.object({
      content: z.string().describe(
        "The asset content. For uploaded assets, the content is the serving path.",
      ).optional(),
      mediaId: z.string().describe(
        "Media ID of the uploaded asset. This is a unique identifier for the asset. This ID can be passed to other API calls, e.g. CreateCreative to associate the asset with a creative. The Media ID space updated on **April 5, 2023**. Update media IDs cached before **April 5, 2023** by retrieving the new media ID from associated creative resources or re-uploading the asset.",
      ).optional(),
    }).describe("A single asset.").optional(),
    role: z.enum([
      "ASSET_ROLE_UNSPECIFIED",
      "ASSET_ROLE_MAIN",
      "ASSET_ROLE_BACKUP",
      "ASSET_ROLE_POLITE_LOAD",
      "ASSET_ROLE_HEADLINE",
      "ASSET_ROLE_LONG_HEADLINE",
      "ASSET_ROLE_BODY",
      "ASSET_ROLE_LONG_BODY",
      "ASSET_ROLE_CAPTION_URL",
      "ASSET_ROLE_CALL_TO_ACTION",
      "ASSET_ROLE_ADVERTISER_NAME",
      "ASSET_ROLE_PRICE",
      "ASSET_ROLE_ANDROID_APP_ID",
      "ASSET_ROLE_IOS_APP_ID",
      "ASSET_ROLE_RATING",
      "ASSET_ROLE_ICON",
      "ASSET_ROLE_COVER_IMAGE",
      "ASSET_ROLE_BACKGROUND_COLOR",
      "ASSET_ROLE_ACCENT_COLOR",
      "ASSET_ROLE_REQUIRE_LOGO",
      "ASSET_ROLE_REQUIRE_IMAGE",
      "ASSET_ROLE_ENABLE_ASSET_ENHANCEMENTS",
    ]).describe("Optional. The role of this asset for the creative.")
      .optional(),
  })).describe("Required. Assets associated to this creative.").optional(),
  cmTrackingAd: z.object({
    cmAdId: z.string().describe(
      "Optional. The ad ID of the campaign manager 360 tracking Ad.",
    ).optional(),
    cmCreativeId: z.string().describe(
      "Optional. The creative ID of the campaign manager 360 tracking Ad.",
    ).optional(),
    cmPlacementId: z.string().describe(
      "Optional. The placement ID of the campaign manager 360 tracking Ad.",
    ).optional(),
  }).describe("A Campaign Manager 360 tracking ad.").optional(),
  companionCreativeIds: z.array(z.string()).describe(
    "Optional. The IDs of companion creatives for a video creative. You can assign existing display creatives (with image or HTML5 assets) to serve surrounding the publisher's video player. Companions display around the video player while the video is playing and remain after the video has completed. Creatives contain additional dimensions can not be companion creatives. This field is only supported for the following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO`",
  ).optional(),
  counterEvents: z.array(z.object({
    name: z.string().describe("Required. The name of the counter event.")
      .optional(),
    reportingName: z.string().describe(
      "Required. The name used to identify this counter event in reports.",
    ).optional(),
  })).describe(
    "Optional. Counter events for a rich media creative. Counters track the number of times that a user interacts with any part of a rich media creative in a specified way (mouse-overs, mouse-outs, clicks, taps, data loading, keyboard entries, etc.). Any event that can be captured in the creative can be recorded as a counter. Leave it empty or unset for creatives containing image assets only.",
  ).optional(),
  creativeType: z.enum([
    "CREATIVE_TYPE_UNSPECIFIED",
    "CREATIVE_TYPE_STANDARD",
    "CREATIVE_TYPE_EXPANDABLE",
    "CREATIVE_TYPE_VIDEO",
    "CREATIVE_TYPE_NATIVE",
    "CREATIVE_TYPE_TEMPLATED_APP_INSTALL",
    "CREATIVE_TYPE_NATIVE_SITE_SQUARE",
    "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL",
    "CREATIVE_TYPE_LIGHTBOX",
    "CREATIVE_TYPE_NATIVE_APP_INSTALL",
    "CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE",
    "CREATIVE_TYPE_AUDIO",
    "CREATIVE_TYPE_PUBLISHER_HOSTED",
    "CREATIVE_TYPE_NATIVE_VIDEO",
    "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO",
    "CREATIVE_TYPE_ASSET_BASED_CREATIVE",
  ]).describe("Required. Immutable. The type of the creative.").optional(),
  dimensions: z.object({
    heightPixels: z.number().int().describe("The height in pixels.").optional(),
    widthPixels: z.number().int().describe("The width in pixels.").optional(),
  }).describe("Dimensions.").optional(),
  displayName: z.string().describe(
    "Required. The display name of the creative. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not the creative can serve. Accepted values are: * `ENTITY_STATUS_ACTIVE` * `ENTITY_STATUS_ARCHIVED` * `ENTITY_STATUS_PAUSED`",
  ).optional(),
  exitEvents: z.array(z.object({
    name: z.string().describe(
      "Optional. The name of the click tag of the exit event. The name must be unique within one creative. Leave it empty or unset for creatives containing image assets only.",
    ).optional(),
    reportingName: z.string().describe(
      "Optional. The name used to identify this event in reports. Leave it empty or unset for creatives containing image assets only.",
    ).optional(),
    type: z.enum([
      "EXIT_EVENT_TYPE_UNSPECIFIED",
      "EXIT_EVENT_TYPE_DEFAULT",
      "EXIT_EVENT_TYPE_BACKUP",
    ]).describe("Required. The type of the exit event.").optional(),
    url: z.string().describe(
      "Required. The click through URL of the exit event. This is required when type is: * `EXIT_EVENT_TYPE_DEFAULT` * `EXIT_EVENT_TYPE_BACKUP`",
    ).optional(),
  })).describe(
    "Required. Exit events for this creative. An exit (also known as a click tag) is any area in your creative that someone can click or tap to open an advertiser's landing page. Every creative must include at least one exit. You can add an exit to your creative in any of the following ways: * Use Google Web Designer's tap area. * Define a JavaScript variable called \"clickTag\". * Use the Enabler (Enabler.exit()) to track exits in rich media formats.",
  ).optional(),
  expandOnHover: z.boolean().describe(
    "Optional. Indicates the creative will automatically expand on hover. Optional and only valid for third-party expandable creatives. Third-party expandable creatives are creatives with following hosting source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_EXPANDABLE`",
  ).optional(),
  expandingDirection: z.enum([
    "EXPANDING_DIRECTION_UNSPECIFIED",
    "EXPANDING_DIRECTION_NONE",
    "EXPANDING_DIRECTION_UP",
    "EXPANDING_DIRECTION_DOWN",
    "EXPANDING_DIRECTION_LEFT",
    "EXPANDING_DIRECTION_RIGHT",
    "EXPANDING_DIRECTION_UP_AND_LEFT",
    "EXPANDING_DIRECTION_UP_AND_RIGHT",
    "EXPANDING_DIRECTION_DOWN_AND_LEFT",
    "EXPANDING_DIRECTION_DOWN_AND_RIGHT",
    "EXPANDING_DIRECTION_UP_OR_DOWN",
    "EXPANDING_DIRECTION_LEFT_OR_RIGHT",
    "EXPANDING_DIRECTION_ANY_DIAGONAL",
  ]).describe(
    "Optional. Specifies the expanding direction of the creative. Required and only valid for third-party expandable creatives. Third-party expandable creatives are creatives with following hosting source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_EXPANDABLE`",
  ).optional(),
  hostingSource: z.enum([
    "HOSTING_SOURCE_UNSPECIFIED",
    "HOSTING_SOURCE_CM",
    "HOSTING_SOURCE_THIRD_PARTY",
    "HOSTING_SOURCE_HOSTED",
    "HOSTING_SOURCE_RICH_MEDIA",
  ]).describe("Required. Indicates where the creative is hosted.").optional(),
  iasCampaignMonitoring: z.boolean().describe(
    "Optional. Indicates whether Integral Ad Science (IAS) campaign monitoring is enabled. To enable this for the creative, make sure the Advertiser.creative_config.ias_client_id has been set to your IAS client ID.",
  ).optional(),
  integrationCode: z.string().describe(
    "Optional. ID information used to link this creative to an external system. Must be UTF-8 encoded with a length of no more than 10,000 characters.",
  ).optional(),
  jsTrackerUrl: z.string().describe(
    "Optional. JavaScript measurement URL from supported third-party verification providers (ComScore, DoubleVerify, IAS, Moat). HTML script tags are not supported. This field is only writeable in the following creative_type: * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO`",
  ).optional(),
  notes: z.string().describe(
    "Optional. User notes for this creative. Must be UTF-8 encoded with a length of no more than 20,000 characters.",
  ).optional(),
  obaIcon: z.object({
    clickTrackingUrl: z.string().describe(
      "Required. The click tracking URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com`",
    ).optional(),
    dimensions: z.object({
      heightPixels: z.number().int().describe("The height in pixels.")
        .optional(),
      widthPixels: z.number().int().describe("The width in pixels.").optional(),
    }).describe("Dimensions.").optional(),
    landingPageUrl: z.string().describe(
      "Required. The landing page URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com`",
    ).optional(),
    position: z.enum([
      "OBA_ICON_POSITION_UNSPECIFIED",
      "OBA_ICON_POSITION_UPPER_RIGHT",
      "OBA_ICON_POSITION_UPPER_LEFT",
      "OBA_ICON_POSITION_LOWER_RIGHT",
      "OBA_ICON_POSITION_LOWER_LEFT",
    ]).describe("Optional. The position of the OBA icon on the creative.")
      .optional(),
    program: z.string().describe(
      "Optional. The program of the OBA icon. For example: “AdChoices”.",
    ).optional(),
    resourceMimeType: z.string().describe(
      "Optional. The MIME type of the OBA icon resource.",
    ).optional(),
    resourceUrl: z.string().describe(
      "Optional. The URL of the OBA icon resource.",
    ).optional(),
    viewTrackingUrl: z.string().describe(
      "Required. The view tracking URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com`",
    ).optional(),
  }).describe("OBA Icon for a Creative").optional(),
  progressOffset: z.object({
    percentage: z.string().describe(
      "Optional. The offset in percentage of the audio or video duration.",
    ).optional(),
    seconds: z.string().describe(
      "Optional. The offset in seconds from the start of the audio or video.",
    ).optional(),
  }).describe("The length an audio or a video has been played.").optional(),
  requireHtml5: z.boolean().describe(
    "Optional. Indicates that the creative relies on HTML5 to render properly. Optional and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`",
  ).optional(),
  requireMraid: z.boolean().describe(
    "Optional. Indicates that the creative requires MRAID (Mobile Rich Media Ad Interface Definitions system). Set this if the creative relies on mobile gestures for interactivity, such as swiping or tapping. Optional and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`",
  ).optional(),
  requirePingForAttribution: z.boolean().describe(
    "Optional. Indicates that the creative will wait for a return ping for attribution. Only valid when using a Campaign Manager 360 tracking ad with a third-party ad server parameter and the ${DC_DBM_TOKEN} macro. Optional and only valid for third-party tag creatives or third-party VAST tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO`",
  ).optional(),
  reviewStatus: z.object({
    approvalStatus: z.enum([
      "APPROVAL_STATUS_UNSPECIFIED",
      "APPROVAL_STATUS_PENDING_NOT_SERVABLE",
      "APPROVAL_STATUS_PENDING_SERVABLE",
      "APPROVAL_STATUS_APPROVED_SERVABLE",
      "APPROVAL_STATUS_REJECTED_NOT_SERVABLE",
    ]).describe(
      "Represents the basic approval needed for a creative to begin serving. Summary of creative_and_landing_page_review_status and content_and_policy_review_status.",
    ).optional(),
    contentAndPolicyReviewStatus: z.enum([
      "REVIEW_STATUS_UNSPECIFIED",
      "REVIEW_STATUS_APPROVED",
      "REVIEW_STATUS_REJECTED",
      "REVIEW_STATUS_PENDING",
    ]).describe("Content and policy review status for the creative.")
      .optional(),
    creativeAndLandingPageReviewStatus: z.enum([
      "REVIEW_STATUS_UNSPECIFIED",
      "REVIEW_STATUS_APPROVED",
      "REVIEW_STATUS_REJECTED",
      "REVIEW_STATUS_PENDING",
    ]).describe("Creative and landing page review status for the creative.")
      .optional(),
    exchangeReviewStatuses: z.array(z.object({
      exchange: z.enum([
        "EXCHANGE_UNSPECIFIED",
        "EXCHANGE_GOOGLE_AD_MANAGER",
        "EXCHANGE_APPNEXUS",
        "EXCHANGE_BRIGHTROLL",
        "EXCHANGE_ADFORM",
        "EXCHANGE_ADMETA",
        "EXCHANGE_ADMIXER",
        "EXCHANGE_ADSMOGO",
        "EXCHANGE_ADSWIZZ",
        "EXCHANGE_BIDSWITCH",
        "EXCHANGE_BRIGHTROLL_DISPLAY",
        "EXCHANGE_CADREON",
        "EXCHANGE_DAILYMOTION",
        "EXCHANGE_FIVE",
        "EXCHANGE_FLUCT",
        "EXCHANGE_FREEWHEEL",
        "EXCHANGE_GENIEE",
        "EXCHANGE_GUMGUM",
        "EXCHANGE_IMOBILE",
        "EXCHANGE_IBILLBOARD",
        "EXCHANGE_IMPROVE_DIGITAL",
        "EXCHANGE_INDEX",
        "EXCHANGE_KARGO",
        "EXCHANGE_MICROAD",
        "EXCHANGE_MOPUB",
        "EXCHANGE_NEND",
        "EXCHANGE_ONE_BY_AOL_DISPLAY",
        "EXCHANGE_ONE_BY_AOL_MOBILE",
        "EXCHANGE_ONE_BY_AOL_VIDEO",
        "EXCHANGE_OOYALA",
        "EXCHANGE_OPENX",
        "EXCHANGE_PERMODO",
        "EXCHANGE_PLATFORMONE",
        "EXCHANGE_PLATFORMID",
        "EXCHANGE_PUBMATIC",
        "EXCHANGE_PULSEPOINT",
        "EXCHANGE_REVENUEMAX",
        "EXCHANGE_RUBICON",
        "EXCHANGE_SMARTCLIP",
        "EXCHANGE_SMARTRTB",
        "EXCHANGE_SMARTSTREAMTV",
        "EXCHANGE_SOVRN",
        "EXCHANGE_SPOTXCHANGE",
        "EXCHANGE_STROER",
        "EXCHANGE_TEADSTV",
        "EXCHANGE_TELARIA",
        "EXCHANGE_TVN",
        "EXCHANGE_UNITED",
        "EXCHANGE_YIELDLAB",
        "EXCHANGE_YIELDMO",
        "EXCHANGE_UNRULYX",
        "EXCHANGE_OPEN8",
        "EXCHANGE_TRITON",
        "EXCHANGE_TRIPLELIFT",
        "EXCHANGE_TABOOLA",
        "EXCHANGE_INMOBI",
        "EXCHANGE_SMAATO",
        "EXCHANGE_AJA",
        "EXCHANGE_SUPERSHIP",
        "EXCHANGE_NEXSTAR_DIGITAL",
        "EXCHANGE_WAZE",
        "EXCHANGE_SOUNDCAST",
        "EXCHANGE_SHARETHROUGH",
        "EXCHANGE_FYBER",
        "EXCHANGE_RED_FOR_PUBLISHERS",
        "EXCHANGE_MEDIANET",
        "EXCHANGE_TAPJOY",
        "EXCHANGE_VISTAR",
        "EXCHANGE_DAX",
        "EXCHANGE_JCD",
        "EXCHANGE_PLACE_EXCHANGE",
        "EXCHANGE_APPLOVIN",
        "EXCHANGE_CONNATIX",
        "EXCHANGE_RESET_DIGITAL",
        "EXCHANGE_HIVESTACK",
        "EXCHANGE_DRAX",
        "EXCHANGE_APPLOVIN_GBID",
        "EXCHANGE_FYBER_GBID",
        "EXCHANGE_UNITY_GBID",
        "EXCHANGE_CHARTBOOST_GBID",
        "EXCHANGE_ADMOST_GBID",
        "EXCHANGE_TOPON_GBID",
        "EXCHANGE_NETFLIX",
        "EXCHANGE_CORE",
        "EXCHANGE_COMMERCE_GRID",
        "EXCHANGE_SPOTIFY",
        "EXCHANGE_TUBI",
        "EXCHANGE_SNAP",
        "EXCHANGE_CADENT",
      ]).describe("The exchange reviewing the creative.").optional(),
      status: z.enum([
        "REVIEW_STATUS_UNSPECIFIED",
        "REVIEW_STATUS_APPROVED",
        "REVIEW_STATUS_REJECTED",
        "REVIEW_STATUS_PENDING",
      ]).describe("Status of the exchange review.").optional(),
    })).describe("Exchange review statuses for the creative.").optional(),
  }).describe("Review statuses for the creative.").optional(),
  skipOffset: z.object({
    percentage: z.string().describe(
      "Optional. The offset in percentage of the audio or video duration.",
    ).optional(),
    seconds: z.string().describe(
      "Optional. The offset in seconds from the start of the audio or video.",
    ).optional(),
  }).describe("The length an audio or a video has been played.").optional(),
  skippable: z.boolean().describe(
    "Optional. Whether the user can choose to skip a video creative. This field is only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO`",
  ).optional(),
  thirdPartyTag: z.string().describe(
    "Optional. The original third-party tag used for the creative. Required and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`",
  ).optional(),
  thirdPartyUrls: z.array(z.object({
    type: z.enum([
      "THIRD_PARTY_URL_TYPE_UNSPECIFIED",
      "THIRD_PARTY_URL_TYPE_IMPRESSION",
      "THIRD_PARTY_URL_TYPE_CLICK_TRACKING",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_START",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_FIRST_QUARTILE",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_MIDPOINT",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_THIRD_QUARTILE",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_COMPLETE",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_MUTE",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_PAUSE",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_REWIND",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_FULLSCREEN",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_STOP",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_CUSTOM",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_SKIP",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_PROGRESS",
    ]).describe(
      "Optional. The type of interaction needs to be tracked by the tracking URL",
    ).optional(),
    url: z.string().describe(
      "Optional. Tracking URL used to track the interaction. Provide a URL with optional path or query string, beginning with `https:`. For example, `https://www.example.com/path`",
    ).optional(),
  })).describe(
    "Optional. Tracking URLs from third parties to track interactions with a video creative. This field is only supported for the following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_NATIVE_VIDEO`",
  ).optional(),
  timerEvents: z.array(z.object({
    name: z.string().describe("Required. The name of the timer event.")
      .optional(),
    reportingName: z.string().describe(
      "Required. The name used to identify this timer event in reports.",
    ).optional(),
  })).describe(
    "Optional. Timer custom events for a rich media creative. Timers track the time during which a user views and interacts with a specified part of a rich media creative. A creative can have multiple timer events, each timed independently. Leave it empty or unset for creatives containing image assets only.",
  ).optional(),
  trackerUrls: z.array(z.string()).describe(
    "Optional. Tracking URLs for analytics providers or third-party ad technology vendors. The URLs must start with `https:` (except on inventory that doesn't require SSL compliance). If using macros in your URL, use only macros supported by Display & Video 360. Standard URLs only, no IMG or SCRIPT tags. This field is only writeable in the following creative_type: * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO`",
  ).optional(),
  universalAdId: z.object({
    id: z.string().describe("Optional. The unique creative identifier.")
      .optional(),
    registry: z.enum([
      "UNIVERSAL_AD_REGISTRY_UNSPECIFIED",
      "UNIVERSAL_AD_REGISTRY_OTHER",
      "UNIVERSAL_AD_REGISTRY_AD_ID",
      "UNIVERSAL_AD_REGISTRY_CLEARCAST",
      "UNIVERSAL_AD_REGISTRY_DV360",
      "UNIVERSAL_AD_REGISTRY_CM",
    ]).describe("Optional. The registry provides unique creative identifiers.")
      .optional(),
  }).describe(
    "A creative identifier provided by a registry that is unique across all platforms. This is part of the VAST 4.0 standard.",
  ).optional(),
  vastTagUrl: z.string().describe(
    "Optional. The URL of the VAST tag for a third-party VAST tag creative. Required and only valid for third-party VAST tag creatives. Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO`",
  ).optional(),
});

const StateSchema = z.object({
  additionalDimensions: z.array(z.object({
    heightPixels: z.number(),
    widthPixels: z.number(),
  })).optional(),
  advertiserId: z.string().optional(),
  appendedTag: z.string().optional(),
  assets: z.array(z.object({
    asset: z.object({
      content: z.string(),
      mediaId: z.string(),
    }),
    role: z.string(),
  })).optional(),
  cmPlacementId: z.string().optional(),
  cmTrackingAd: z.object({
    cmAdId: z.string(),
    cmCreativeId: z.string(),
    cmPlacementId: z.string(),
  }).optional(),
  companionCreativeIds: z.array(z.string()).optional(),
  counterEvents: z.array(z.object({
    name: z.string(),
    reportingName: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  creativeAttributes: z.array(z.string()).optional(),
  creativeId: z.string().optional(),
  creativeType: z.string().optional(),
  dimensions: z.object({
    heightPixels: z.number(),
    widthPixels: z.number(),
  }).optional(),
  displayName: z.string().optional(),
  dynamic: z.boolean().optional(),
  entityStatus: z.string().optional(),
  exitEvents: z.array(z.object({
    name: z.string(),
    reportingName: z.string(),
    type: z.string(),
    url: z.string(),
  })).optional(),
  expandOnHover: z.boolean().optional(),
  expandingDirection: z.string().optional(),
  hostingSource: z.string().optional(),
  html5Video: z.boolean().optional(),
  iasCampaignMonitoring: z.boolean().optional(),
  integrationCode: z.string().optional(),
  jsTrackerUrl: z.string().optional(),
  lineItemIds: z.array(z.string()).optional(),
  mediaDuration: z.string().optional(),
  mp3Audio: z.boolean().optional(),
  name: z.string(),
  notes: z.string().optional(),
  obaIcon: z.object({
    clickTrackingUrl: z.string(),
    dimensions: z.object({
      heightPixels: z.number(),
      widthPixels: z.number(),
    }),
    landingPageUrl: z.string(),
    position: z.string(),
    program: z.string(),
    resourceMimeType: z.string(),
    resourceUrl: z.string(),
    viewTrackingUrl: z.string(),
  }).optional(),
  oggAudio: z.boolean().optional(),
  progressOffset: z.object({
    percentage: z.string(),
    seconds: z.string(),
  }).optional(),
  requireHtml5: z.boolean().optional(),
  requireMraid: z.boolean().optional(),
  requirePingForAttribution: z.boolean().optional(),
  reviewStatus: z.object({
    approvalStatus: z.string(),
    contentAndPolicyReviewStatus: z.string(),
    creativeAndLandingPageReviewStatus: z.string(),
    exchangeReviewStatuses: z.array(z.object({
      exchange: z.string(),
      status: z.string(),
    })),
  }).optional(),
  skipOffset: z.object({
    percentage: z.string(),
    seconds: z.string(),
  }).optional(),
  skippable: z.boolean().optional(),
  thirdPartyTag: z.string().optional(),
  thirdPartyUrls: z.array(z.object({
    type: z.string(),
    url: z.string(),
  })).optional(),
  timerEvents: z.array(z.object({
    name: z.string(),
    reportingName: z.string(),
  })).optional(),
  trackerUrls: z.array(z.string()).optional(),
  transcodes: z.array(z.object({
    audioBitRateKbps: z.string(),
    audioSampleRateHz: z.string(),
    bitRateKbps: z.string(),
    dimensions: z.object({
      heightPixels: z.number(),
      widthPixels: z.number(),
    }),
    fileSizeBytes: z.string(),
    frameRate: z.number(),
    mimeType: z.string(),
    name: z.string(),
    transcoded: z.boolean(),
  })).optional(),
  universalAdId: z.object({
    id: z.string(),
    registry: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
  vastTagUrl: z.string().optional(),
  vpaid: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  additionalDimensions: z.array(z.object({
    heightPixels: z.number().int().describe("The height in pixels.").optional(),
    widthPixels: z.number().int().describe("The width in pixels.").optional(),
  })).describe(
    "Optional. Additional dimensions. Applicable when creative_type is one of: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_LIGHTBOX` * `CREATIVE_TYPE_PUBLISHER_HOSTED` If this field is specified, width_pixels and height_pixels are both required and must be greater than or equal to 0.",
  ).optional(),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the creative belongs to.",
  ).optional(),
  appendedTag: z.string().describe(
    "Optional. Third-party HTML tracking tag to be appended to the creative tag.",
  ).optional(),
  assets: z.array(z.object({
    asset: z.object({
      content: z.string().describe(
        "The asset content. For uploaded assets, the content is the serving path.",
      ).optional(),
      mediaId: z.string().describe(
        "Media ID of the uploaded asset. This is a unique identifier for the asset. This ID can be passed to other API calls, e.g. CreateCreative to associate the asset with a creative. The Media ID space updated on **April 5, 2023**. Update media IDs cached before **April 5, 2023** by retrieving the new media ID from associated creative resources or re-uploading the asset.",
      ).optional(),
    }).describe("A single asset.").optional(),
    role: z.enum([
      "ASSET_ROLE_UNSPECIFIED",
      "ASSET_ROLE_MAIN",
      "ASSET_ROLE_BACKUP",
      "ASSET_ROLE_POLITE_LOAD",
      "ASSET_ROLE_HEADLINE",
      "ASSET_ROLE_LONG_HEADLINE",
      "ASSET_ROLE_BODY",
      "ASSET_ROLE_LONG_BODY",
      "ASSET_ROLE_CAPTION_URL",
      "ASSET_ROLE_CALL_TO_ACTION",
      "ASSET_ROLE_ADVERTISER_NAME",
      "ASSET_ROLE_PRICE",
      "ASSET_ROLE_ANDROID_APP_ID",
      "ASSET_ROLE_IOS_APP_ID",
      "ASSET_ROLE_RATING",
      "ASSET_ROLE_ICON",
      "ASSET_ROLE_COVER_IMAGE",
      "ASSET_ROLE_BACKGROUND_COLOR",
      "ASSET_ROLE_ACCENT_COLOR",
      "ASSET_ROLE_REQUIRE_LOGO",
      "ASSET_ROLE_REQUIRE_IMAGE",
      "ASSET_ROLE_ENABLE_ASSET_ENHANCEMENTS",
    ]).describe("Optional. The role of this asset for the creative.")
      .optional(),
  })).describe("Required. Assets associated to this creative.").optional(),
  cmTrackingAd: z.object({
    cmAdId: z.string().describe(
      "Optional. The ad ID of the campaign manager 360 tracking Ad.",
    ).optional(),
    cmCreativeId: z.string().describe(
      "Optional. The creative ID of the campaign manager 360 tracking Ad.",
    ).optional(),
    cmPlacementId: z.string().describe(
      "Optional. The placement ID of the campaign manager 360 tracking Ad.",
    ).optional(),
  }).describe("A Campaign Manager 360 tracking ad.").optional(),
  companionCreativeIds: z.array(z.string()).describe(
    "Optional. The IDs of companion creatives for a video creative. You can assign existing display creatives (with image or HTML5 assets) to serve surrounding the publisher's video player. Companions display around the video player while the video is playing and remain after the video has completed. Creatives contain additional dimensions can not be companion creatives. This field is only supported for the following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO`",
  ).optional(),
  counterEvents: z.array(z.object({
    name: z.string().describe("Required. The name of the counter event.")
      .optional(),
    reportingName: z.string().describe(
      "Required. The name used to identify this counter event in reports.",
    ).optional(),
  })).describe(
    "Optional. Counter events for a rich media creative. Counters track the number of times that a user interacts with any part of a rich media creative in a specified way (mouse-overs, mouse-outs, clicks, taps, data loading, keyboard entries, etc.). Any event that can be captured in the creative can be recorded as a counter. Leave it empty or unset for creatives containing image assets only.",
  ).optional(),
  creativeType: z.enum([
    "CREATIVE_TYPE_UNSPECIFIED",
    "CREATIVE_TYPE_STANDARD",
    "CREATIVE_TYPE_EXPANDABLE",
    "CREATIVE_TYPE_VIDEO",
    "CREATIVE_TYPE_NATIVE",
    "CREATIVE_TYPE_TEMPLATED_APP_INSTALL",
    "CREATIVE_TYPE_NATIVE_SITE_SQUARE",
    "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_INTERSTITIAL",
    "CREATIVE_TYPE_LIGHTBOX",
    "CREATIVE_TYPE_NATIVE_APP_INSTALL",
    "CREATIVE_TYPE_NATIVE_APP_INSTALL_SQUARE",
    "CREATIVE_TYPE_AUDIO",
    "CREATIVE_TYPE_PUBLISHER_HOSTED",
    "CREATIVE_TYPE_NATIVE_VIDEO",
    "CREATIVE_TYPE_TEMPLATED_APP_INSTALL_VIDEO",
    "CREATIVE_TYPE_ASSET_BASED_CREATIVE",
  ]).describe("Required. Immutable. The type of the creative.").optional(),
  dimensions: z.object({
    heightPixels: z.number().int().describe("The height in pixels.").optional(),
    widthPixels: z.number().int().describe("The width in pixels.").optional(),
  }).describe("Dimensions.").optional(),
  displayName: z.string().describe(
    "Required. The display name of the creative. Must be UTF-8 encoded with a maximum size of 240 bytes.",
  ).optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe(
    "Required. Controls whether or not the creative can serve. Accepted values are: * `ENTITY_STATUS_ACTIVE` * `ENTITY_STATUS_ARCHIVED` * `ENTITY_STATUS_PAUSED`",
  ).optional(),
  exitEvents: z.array(z.object({
    name: z.string().describe(
      "Optional. The name of the click tag of the exit event. The name must be unique within one creative. Leave it empty or unset for creatives containing image assets only.",
    ).optional(),
    reportingName: z.string().describe(
      "Optional. The name used to identify this event in reports. Leave it empty or unset for creatives containing image assets only.",
    ).optional(),
    type: z.enum([
      "EXIT_EVENT_TYPE_UNSPECIFIED",
      "EXIT_EVENT_TYPE_DEFAULT",
      "EXIT_EVENT_TYPE_BACKUP",
    ]).describe("Required. The type of the exit event.").optional(),
    url: z.string().describe(
      "Required. The click through URL of the exit event. This is required when type is: * `EXIT_EVENT_TYPE_DEFAULT` * `EXIT_EVENT_TYPE_BACKUP`",
    ).optional(),
  })).describe(
    "Required. Exit events for this creative. An exit (also known as a click tag) is any area in your creative that someone can click or tap to open an advertiser's landing page. Every creative must include at least one exit. You can add an exit to your creative in any of the following ways: * Use Google Web Designer's tap area. * Define a JavaScript variable called \"clickTag\". * Use the Enabler (Enabler.exit()) to track exits in rich media formats.",
  ).optional(),
  expandOnHover: z.boolean().describe(
    "Optional. Indicates the creative will automatically expand on hover. Optional and only valid for third-party expandable creatives. Third-party expandable creatives are creatives with following hosting source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_EXPANDABLE`",
  ).optional(),
  expandingDirection: z.enum([
    "EXPANDING_DIRECTION_UNSPECIFIED",
    "EXPANDING_DIRECTION_NONE",
    "EXPANDING_DIRECTION_UP",
    "EXPANDING_DIRECTION_DOWN",
    "EXPANDING_DIRECTION_LEFT",
    "EXPANDING_DIRECTION_RIGHT",
    "EXPANDING_DIRECTION_UP_AND_LEFT",
    "EXPANDING_DIRECTION_UP_AND_RIGHT",
    "EXPANDING_DIRECTION_DOWN_AND_LEFT",
    "EXPANDING_DIRECTION_DOWN_AND_RIGHT",
    "EXPANDING_DIRECTION_UP_OR_DOWN",
    "EXPANDING_DIRECTION_LEFT_OR_RIGHT",
    "EXPANDING_DIRECTION_ANY_DIAGONAL",
  ]).describe(
    "Optional. Specifies the expanding direction of the creative. Required and only valid for third-party expandable creatives. Third-party expandable creatives are creatives with following hosting source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_EXPANDABLE`",
  ).optional(),
  hostingSource: z.enum([
    "HOSTING_SOURCE_UNSPECIFIED",
    "HOSTING_SOURCE_CM",
    "HOSTING_SOURCE_THIRD_PARTY",
    "HOSTING_SOURCE_HOSTED",
    "HOSTING_SOURCE_RICH_MEDIA",
  ]).describe("Required. Indicates where the creative is hosted.").optional(),
  iasCampaignMonitoring: z.boolean().describe(
    "Optional. Indicates whether Integral Ad Science (IAS) campaign monitoring is enabled. To enable this for the creative, make sure the Advertiser.creative_config.ias_client_id has been set to your IAS client ID.",
  ).optional(),
  integrationCode: z.string().describe(
    "Optional. ID information used to link this creative to an external system. Must be UTF-8 encoded with a length of no more than 10,000 characters.",
  ).optional(),
  jsTrackerUrl: z.string().describe(
    "Optional. JavaScript measurement URL from supported third-party verification providers (ComScore, DoubleVerify, IAS, Moat). HTML script tags are not supported. This field is only writeable in the following creative_type: * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO`",
  ).optional(),
  notes: z.string().describe(
    "Optional. User notes for this creative. Must be UTF-8 encoded with a length of no more than 20,000 characters.",
  ).optional(),
  obaIcon: z.object({
    clickTrackingUrl: z.string().describe(
      "Required. The click tracking URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com`",
    ).optional(),
    dimensions: z.object({
      heightPixels: z.number().int().describe("The height in pixels.")
        .optional(),
      widthPixels: z.number().int().describe("The width in pixels.").optional(),
    }).describe("Dimensions.").optional(),
    landingPageUrl: z.string().describe(
      "Required. The landing page URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com`",
    ).optional(),
    position: z.enum([
      "OBA_ICON_POSITION_UNSPECIFIED",
      "OBA_ICON_POSITION_UPPER_RIGHT",
      "OBA_ICON_POSITION_UPPER_LEFT",
      "OBA_ICON_POSITION_LOWER_RIGHT",
      "OBA_ICON_POSITION_LOWER_LEFT",
    ]).describe("Optional. The position of the OBA icon on the creative.")
      .optional(),
    program: z.string().describe(
      "Optional. The program of the OBA icon. For example: “AdChoices”.",
    ).optional(),
    resourceMimeType: z.string().describe(
      "Optional. The MIME type of the OBA icon resource.",
    ).optional(),
    resourceUrl: z.string().describe(
      "Optional. The URL of the OBA icon resource.",
    ).optional(),
    viewTrackingUrl: z.string().describe(
      "Required. The view tracking URL of the OBA icon. Only URLs of the following domains are allowed: * `https://info.evidon.com` * `https://l.betrad.com`",
    ).optional(),
  }).describe("OBA Icon for a Creative").optional(),
  progressOffset: z.object({
    percentage: z.string().describe(
      "Optional. The offset in percentage of the audio or video duration.",
    ).optional(),
    seconds: z.string().describe(
      "Optional. The offset in seconds from the start of the audio or video.",
    ).optional(),
  }).describe("The length an audio or a video has been played.").optional(),
  requireHtml5: z.boolean().describe(
    "Optional. Indicates that the creative relies on HTML5 to render properly. Optional and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`",
  ).optional(),
  requireMraid: z.boolean().describe(
    "Optional. Indicates that the creative requires MRAID (Mobile Rich Media Ad Interface Definitions system). Set this if the creative relies on mobile gestures for interactivity, such as swiping or tapping. Optional and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`",
  ).optional(),
  requirePingForAttribution: z.boolean().describe(
    "Optional. Indicates that the creative will wait for a return ping for attribution. Only valid when using a Campaign Manager 360 tracking ad with a third-party ad server parameter and the ${DC_DBM_TOKEN} macro. Optional and only valid for third-party tag creatives or third-party VAST tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE` Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO`",
  ).optional(),
  reviewStatus: z.object({
    approvalStatus: z.enum([
      "APPROVAL_STATUS_UNSPECIFIED",
      "APPROVAL_STATUS_PENDING_NOT_SERVABLE",
      "APPROVAL_STATUS_PENDING_SERVABLE",
      "APPROVAL_STATUS_APPROVED_SERVABLE",
      "APPROVAL_STATUS_REJECTED_NOT_SERVABLE",
    ]).describe(
      "Represents the basic approval needed for a creative to begin serving. Summary of creative_and_landing_page_review_status and content_and_policy_review_status.",
    ).optional(),
    contentAndPolicyReviewStatus: z.enum([
      "REVIEW_STATUS_UNSPECIFIED",
      "REVIEW_STATUS_APPROVED",
      "REVIEW_STATUS_REJECTED",
      "REVIEW_STATUS_PENDING",
    ]).describe("Content and policy review status for the creative.")
      .optional(),
    creativeAndLandingPageReviewStatus: z.enum([
      "REVIEW_STATUS_UNSPECIFIED",
      "REVIEW_STATUS_APPROVED",
      "REVIEW_STATUS_REJECTED",
      "REVIEW_STATUS_PENDING",
    ]).describe("Creative and landing page review status for the creative.")
      .optional(),
    exchangeReviewStatuses: z.array(z.object({
      exchange: z.enum([
        "EXCHANGE_UNSPECIFIED",
        "EXCHANGE_GOOGLE_AD_MANAGER",
        "EXCHANGE_APPNEXUS",
        "EXCHANGE_BRIGHTROLL",
        "EXCHANGE_ADFORM",
        "EXCHANGE_ADMETA",
        "EXCHANGE_ADMIXER",
        "EXCHANGE_ADSMOGO",
        "EXCHANGE_ADSWIZZ",
        "EXCHANGE_BIDSWITCH",
        "EXCHANGE_BRIGHTROLL_DISPLAY",
        "EXCHANGE_CADREON",
        "EXCHANGE_DAILYMOTION",
        "EXCHANGE_FIVE",
        "EXCHANGE_FLUCT",
        "EXCHANGE_FREEWHEEL",
        "EXCHANGE_GENIEE",
        "EXCHANGE_GUMGUM",
        "EXCHANGE_IMOBILE",
        "EXCHANGE_IBILLBOARD",
        "EXCHANGE_IMPROVE_DIGITAL",
        "EXCHANGE_INDEX",
        "EXCHANGE_KARGO",
        "EXCHANGE_MICROAD",
        "EXCHANGE_MOPUB",
        "EXCHANGE_NEND",
        "EXCHANGE_ONE_BY_AOL_DISPLAY",
        "EXCHANGE_ONE_BY_AOL_MOBILE",
        "EXCHANGE_ONE_BY_AOL_VIDEO",
        "EXCHANGE_OOYALA",
        "EXCHANGE_OPENX",
        "EXCHANGE_PERMODO",
        "EXCHANGE_PLATFORMONE",
        "EXCHANGE_PLATFORMID",
        "EXCHANGE_PUBMATIC",
        "EXCHANGE_PULSEPOINT",
        "EXCHANGE_REVENUEMAX",
        "EXCHANGE_RUBICON",
        "EXCHANGE_SMARTCLIP",
        "EXCHANGE_SMARTRTB",
        "EXCHANGE_SMARTSTREAMTV",
        "EXCHANGE_SOVRN",
        "EXCHANGE_SPOTXCHANGE",
        "EXCHANGE_STROER",
        "EXCHANGE_TEADSTV",
        "EXCHANGE_TELARIA",
        "EXCHANGE_TVN",
        "EXCHANGE_UNITED",
        "EXCHANGE_YIELDLAB",
        "EXCHANGE_YIELDMO",
        "EXCHANGE_UNRULYX",
        "EXCHANGE_OPEN8",
        "EXCHANGE_TRITON",
        "EXCHANGE_TRIPLELIFT",
        "EXCHANGE_TABOOLA",
        "EXCHANGE_INMOBI",
        "EXCHANGE_SMAATO",
        "EXCHANGE_AJA",
        "EXCHANGE_SUPERSHIP",
        "EXCHANGE_NEXSTAR_DIGITAL",
        "EXCHANGE_WAZE",
        "EXCHANGE_SOUNDCAST",
        "EXCHANGE_SHARETHROUGH",
        "EXCHANGE_FYBER",
        "EXCHANGE_RED_FOR_PUBLISHERS",
        "EXCHANGE_MEDIANET",
        "EXCHANGE_TAPJOY",
        "EXCHANGE_VISTAR",
        "EXCHANGE_DAX",
        "EXCHANGE_JCD",
        "EXCHANGE_PLACE_EXCHANGE",
        "EXCHANGE_APPLOVIN",
        "EXCHANGE_CONNATIX",
        "EXCHANGE_RESET_DIGITAL",
        "EXCHANGE_HIVESTACK",
        "EXCHANGE_DRAX",
        "EXCHANGE_APPLOVIN_GBID",
        "EXCHANGE_FYBER_GBID",
        "EXCHANGE_UNITY_GBID",
        "EXCHANGE_CHARTBOOST_GBID",
        "EXCHANGE_ADMOST_GBID",
        "EXCHANGE_TOPON_GBID",
        "EXCHANGE_NETFLIX",
        "EXCHANGE_CORE",
        "EXCHANGE_COMMERCE_GRID",
        "EXCHANGE_SPOTIFY",
        "EXCHANGE_TUBI",
        "EXCHANGE_SNAP",
        "EXCHANGE_CADENT",
      ]).describe("The exchange reviewing the creative.").optional(),
      status: z.enum([
        "REVIEW_STATUS_UNSPECIFIED",
        "REVIEW_STATUS_APPROVED",
        "REVIEW_STATUS_REJECTED",
        "REVIEW_STATUS_PENDING",
      ]).describe("Status of the exchange review.").optional(),
    })).describe("Exchange review statuses for the creative.").optional(),
  }).describe("Review statuses for the creative.").optional(),
  skipOffset: z.object({
    percentage: z.string().describe(
      "Optional. The offset in percentage of the audio or video duration.",
    ).optional(),
    seconds: z.string().describe(
      "Optional. The offset in seconds from the start of the audio or video.",
    ).optional(),
  }).describe("The length an audio or a video has been played.").optional(),
  skippable: z.boolean().describe(
    "Optional. Whether the user can choose to skip a video creative. This field is only supported for the following creative_type: * `CREATIVE_TYPE_VIDEO`",
  ).optional(),
  thirdPartyTag: z.string().describe(
    "Optional. The original third-party tag used for the creative. Required and only valid for third-party tag creatives. Third-party tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_STANDARD` * `CREATIVE_TYPE_EXPANDABLE`",
  ).optional(),
  thirdPartyUrls: z.array(z.object({
    type: z.enum([
      "THIRD_PARTY_URL_TYPE_UNSPECIFIED",
      "THIRD_PARTY_URL_TYPE_IMPRESSION",
      "THIRD_PARTY_URL_TYPE_CLICK_TRACKING",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_START",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_FIRST_QUARTILE",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_MIDPOINT",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_THIRD_QUARTILE",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_COMPLETE",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_MUTE",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_PAUSE",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_REWIND",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_FULLSCREEN",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_STOP",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_CUSTOM",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_SKIP",
      "THIRD_PARTY_URL_TYPE_AUDIO_VIDEO_PROGRESS",
    ]).describe(
      "Optional. The type of interaction needs to be tracked by the tracking URL",
    ).optional(),
    url: z.string().describe(
      "Optional. Tracking URL used to track the interaction. Provide a URL with optional path or query string, beginning with `https:`. For example, `https://www.example.com/path`",
    ).optional(),
  })).describe(
    "Optional. Tracking URLs from third parties to track interactions with a video creative. This field is only supported for the following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO` * `CREATIVE_TYPE_NATIVE_VIDEO`",
  ).optional(),
  timerEvents: z.array(z.object({
    name: z.string().describe("Required. The name of the timer event.")
      .optional(),
    reportingName: z.string().describe(
      "Required. The name used to identify this timer event in reports.",
    ).optional(),
  })).describe(
    "Optional. Timer custom events for a rich media creative. Timers track the time during which a user views and interacts with a specified part of a rich media creative. A creative can have multiple timer events, each timed independently. Leave it empty or unset for creatives containing image assets only.",
  ).optional(),
  trackerUrls: z.array(z.string()).describe(
    "Optional. Tracking URLs for analytics providers or third-party ad technology vendors. The URLs must start with `https:` (except on inventory that doesn't require SSL compliance). If using macros in your URL, use only macros supported by Display & Video 360. Standard URLs only, no IMG or SCRIPT tags. This field is only writeable in the following creative_type: * `CREATIVE_TYPE_NATIVE` * `CREATIVE_TYPE_NATIVE_SITE_SQUARE` * `CREATIVE_TYPE_NATIVE_VIDEO`",
  ).optional(),
  universalAdId: z.object({
    id: z.string().describe("Optional. The unique creative identifier.")
      .optional(),
    registry: z.enum([
      "UNIVERSAL_AD_REGISTRY_UNSPECIFIED",
      "UNIVERSAL_AD_REGISTRY_OTHER",
      "UNIVERSAL_AD_REGISTRY_AD_ID",
      "UNIVERSAL_AD_REGISTRY_CLEARCAST",
      "UNIVERSAL_AD_REGISTRY_DV360",
      "UNIVERSAL_AD_REGISTRY_CM",
    ]).describe("Optional. The registry provides unique creative identifiers.")
      .optional(),
  }).describe(
    "A creative identifier provided by a registry that is unique across all platforms. This is part of the VAST 4.0 standard.",
  ).optional(),
  vastTagUrl: z.string().describe(
    "Optional. The URL of the VAST tag for a third-party VAST tag creative. Required and only valid for third-party VAST tag creatives. Third-party VAST tag creatives are creatives with following hosting_source: * `HOSTING_SOURCE_THIRD_PARTY` combined with following creative_type: * `CREATIVE_TYPE_AUDIO` * `CREATIVE_TYPE_VIDEO`",
  ).optional(),
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

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.Creatives. Registered at `@swamp/gcp/displayvideo/advertisers-creatives`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-creatives",
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
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single Creative.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a creatives",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["additionalDimensions"] !== undefined) {
          body["additionalDimensions"] = g["additionalDimensions"];
        }
        if (g["appendedTag"] !== undefined) {
          body["appendedTag"] = g["appendedTag"];
        }
        if (g["assets"] !== undefined) body["assets"] = g["assets"];
        if (g["cmTrackingAd"] !== undefined) {
          body["cmTrackingAd"] = g["cmTrackingAd"];
        }
        if (g["companionCreativeIds"] !== undefined) {
          body["companionCreativeIds"] = g["companionCreativeIds"];
        }
        if (g["counterEvents"] !== undefined) {
          body["counterEvents"] = g["counterEvents"];
        }
        if (g["creativeType"] !== undefined) {
          body["creativeType"] = g["creativeType"];
        }
        if (g["dimensions"] !== undefined) body["dimensions"] = g["dimensions"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["exitEvents"] !== undefined) body["exitEvents"] = g["exitEvents"];
        if (g["expandOnHover"] !== undefined) {
          body["expandOnHover"] = g["expandOnHover"];
        }
        if (g["expandingDirection"] !== undefined) {
          body["expandingDirection"] = g["expandingDirection"];
        }
        if (g["hostingSource"] !== undefined) {
          body["hostingSource"] = g["hostingSource"];
        }
        if (g["iasCampaignMonitoring"] !== undefined) {
          body["iasCampaignMonitoring"] = g["iasCampaignMonitoring"];
        }
        if (g["integrationCode"] !== undefined) {
          body["integrationCode"] = g["integrationCode"];
        }
        if (g["jsTrackerUrl"] !== undefined) {
          body["jsTrackerUrl"] = g["jsTrackerUrl"];
        }
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["obaIcon"] !== undefined) body["obaIcon"] = g["obaIcon"];
        if (g["progressOffset"] !== undefined) {
          body["progressOffset"] = g["progressOffset"];
        }
        if (g["requireHtml5"] !== undefined) {
          body["requireHtml5"] = g["requireHtml5"];
        }
        if (g["requireMraid"] !== undefined) {
          body["requireMraid"] = g["requireMraid"];
        }
        if (g["requirePingForAttribution"] !== undefined) {
          body["requirePingForAttribution"] = g["requirePingForAttribution"];
        }
        if (g["reviewStatus"] !== undefined) {
          body["reviewStatus"] = g["reviewStatus"];
        }
        if (g["skipOffset"] !== undefined) body["skipOffset"] = g["skipOffset"];
        if (g["skippable"] !== undefined) body["skippable"] = g["skippable"];
        if (g["thirdPartyTag"] !== undefined) {
          body["thirdPartyTag"] = g["thirdPartyTag"];
        }
        if (g["thirdPartyUrls"] !== undefined) {
          body["thirdPartyUrls"] = g["thirdPartyUrls"];
        }
        if (g["timerEvents"] !== undefined) {
          body["timerEvents"] = g["timerEvents"];
        }
        if (g["trackerUrls"] !== undefined) {
          body["trackerUrls"] = g["trackerUrls"];
        }
        if (g["universalAdId"] !== undefined) {
          body["universalAdId"] = g["universalAdId"];
        }
        if (g["vastTagUrl"] !== undefined) body["vastTagUrl"] = g["vastTagUrl"];
        if (g["name"] !== undefined) params["creativeId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "advertiserId": String(g["advertiserId"] ?? "") },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
      description: "Get a creatives",
      arguments: z.object({
        identifier: z.string().describe("The name of the creatives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["creativeId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
    update: {
      description: "Update creatives attributes",
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
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        } else if (existing["advertiserId"]) {
          params["advertiserId"] = String(existing["advertiserId"]);
        }
        params["creativeId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["additionalDimensions"] !== undefined) {
          body["additionalDimensions"] = g["additionalDimensions"];
        }
        if (g["appendedTag"] !== undefined) {
          body["appendedTag"] = g["appendedTag"];
        }
        if (g["assets"] !== undefined) body["assets"] = g["assets"];
        if (g["cmTrackingAd"] !== undefined) {
          body["cmTrackingAd"] = g["cmTrackingAd"];
        }
        if (g["companionCreativeIds"] !== undefined) {
          body["companionCreativeIds"] = g["companionCreativeIds"];
        }
        if (g["counterEvents"] !== undefined) {
          body["counterEvents"] = g["counterEvents"];
        }
        if (g["dimensions"] !== undefined) body["dimensions"] = g["dimensions"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["exitEvents"] !== undefined) body["exitEvents"] = g["exitEvents"];
        if (g["expandOnHover"] !== undefined) {
          body["expandOnHover"] = g["expandOnHover"];
        }
        if (g["expandingDirection"] !== undefined) {
          body["expandingDirection"] = g["expandingDirection"];
        }
        if (g["hostingSource"] !== undefined) {
          body["hostingSource"] = g["hostingSource"];
        }
        if (g["iasCampaignMonitoring"] !== undefined) {
          body["iasCampaignMonitoring"] = g["iasCampaignMonitoring"];
        }
        if (g["integrationCode"] !== undefined) {
          body["integrationCode"] = g["integrationCode"];
        }
        if (g["jsTrackerUrl"] !== undefined) {
          body["jsTrackerUrl"] = g["jsTrackerUrl"];
        }
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["obaIcon"] !== undefined) body["obaIcon"] = g["obaIcon"];
        if (g["progressOffset"] !== undefined) {
          body["progressOffset"] = g["progressOffset"];
        }
        if (g["requireHtml5"] !== undefined) {
          body["requireHtml5"] = g["requireHtml5"];
        }
        if (g["requireMraid"] !== undefined) {
          body["requireMraid"] = g["requireMraid"];
        }
        if (g["requirePingForAttribution"] !== undefined) {
          body["requirePingForAttribution"] = g["requirePingForAttribution"];
        }
        if (g["reviewStatus"] !== undefined) {
          body["reviewStatus"] = g["reviewStatus"];
        }
        if (g["skipOffset"] !== undefined) body["skipOffset"] = g["skipOffset"];
        if (g["skippable"] !== undefined) body["skippable"] = g["skippable"];
        if (g["thirdPartyTag"] !== undefined) {
          body["thirdPartyTag"] = g["thirdPartyTag"];
        }
        if (g["thirdPartyUrls"] !== undefined) {
          body["thirdPartyUrls"] = g["thirdPartyUrls"];
        }
        if (g["timerEvents"] !== undefined) {
          body["timerEvents"] = g["timerEvents"];
        }
        if (g["trackerUrls"] !== undefined) {
          body["trackerUrls"] = g["trackerUrls"];
        }
        if (g["universalAdId"] !== undefined) {
          body["universalAdId"] = g["universalAdId"];
        }
        if (g["vastTagUrl"] !== undefined) body["vastTagUrl"] = g["vastTagUrl"];
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
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          credentials,
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
      description: "Delete the creatives",
      arguments: z.object({
        identifier: z.string().describe("The name of the creatives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["creativeId"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync creatives state from GCP",
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
          if (g["advertiserId"] !== undefined) {
            params["advertiserId"] = String(g["advertiserId"]);
          } else if (existing["advertiserId"]) {
            params["advertiserId"] = String(existing["advertiserId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["creativeId"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
      description: "List creatives resources",
      arguments: z.object({
        filter: z.string().describe(
          'Allows filtering by creative fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by `AND` or `OR` logical operators. A sequence of restrictions implicitly uses `AND`. * A restriction has the form of `{field} {operator} {value}`. * The `lineItemIds` field must use the `HAS (:)` operator. * The `updateTime` field must use the `GREATER THAN OR EQUAL TO (>=)` or `LESS THAN OR EQUAL TO (<=)` operators. * All other fields must use the `EQUALS (=)` operator. * For `entityStatus`, `minDuration`, `maxDuration`, `updateTime`, and `dynamic` fields, there may be at most one restriction. Supported Fields: * `approvalStatus` * `creativeId` * `creativeType` * `dimensions` (input in the form of `{width}x{height}`) * `dynamic` * `entityStatus` * `exchangeReviewStatus` (input in the form of `{exchange}-{reviewStatus}`) * `lineItemIds` * `maxDuration` (input in the form of `{duration}s`. Only seconds are supported) * `minDuration` (input in the form of `{duration}s`. Only seconds are supported) * `updateTime` (input in ISO 8601 format, or `YYYY-MM-DDTHH:MM:SSZ`) Notes: * For `updateTime`, a creative resource\'s field value reflects the last time that a creative has been updated, which includes updates made by the system (e.g. creative review updates). Examples: * All native creatives: `creativeType="CREATIVE_TYPE_NATIVE"` * All active creatives with 300x400 or 50x100 dimensions: `entityStatus="ENTITY_STATUS_ACTIVE" AND (dimensions="300x400" OR dimensions="50x100")` * All dynamic creatives that are approved by AdX or AppNexus, with a minimum duration of 5 seconds and 200ms: `dynamic="true" AND minDuration="5.2s" AND (exchangeReviewStatus="EXCHANGE_GOOGLE_AD_MANAGER-REVIEW_STATUS_APPROVED" OR exchangeReviewStatus="EXCHANGE_APPNEXUS-REVIEW_STATUS_APPROVED")` * All video creatives that are associated with line item ID 1 or 2: `creativeType="CREATIVE_TYPE_VIDEO" AND (lineItemIds:1 OR lineItemIds:2)` * Find creatives by multiple creative IDs: `creativeId=1 OR creativeId=2` * All creatives with an update time greater than or equal to 2020-11-04T18:54:47Z (format of ISO 8601): `updateTime>="2020-11-04T18:54:47Z"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information.',
        ).optional(),
        orderBy: z.string().describe(
          'Field by which to sort the list. Acceptable values are: * `creativeId` (default) * `createTime` * `mediaDuration` * `dimensions` (sorts by width first, then by height) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `createTime desc`.',
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. Must be between `1` and `200`. If unspecified will default to `100`. Returns error code `INVALID_ARGUMENT` if an invalid value is specified.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "creatives",
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
