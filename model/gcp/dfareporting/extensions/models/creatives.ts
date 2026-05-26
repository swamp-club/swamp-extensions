// Auto-generated extension model for @swamp/gcp/dfareporting/creatives
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 Creatives.
 *
 * Contains properties of a Creative.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.creatives.get",
  "path": "userprofiles/{+profileId}/creatives/{+id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dfareporting.creatives.insert",
  "path": "userprofiles/{+profileId}/creatives",
  "httpMethod": "POST",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dfareporting.creatives.update",
  "path": "userprofiles/{+profileId}/creatives",
  "httpMethod": "PUT",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dfareporting.creatives.list",
  "path": "userprofiles/{+profileId}/creatives",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "active": {
      "location": "query",
    },
    "advertiserId": {
      "location": "query",
    },
    "archived": {
      "location": "query",
    },
    "campaignId": {
      "location": "query",
    },
    "companionCreativeIds": {
      "location": "query",
    },
    "creativeFieldIds": {
      "location": "query",
    },
    "ids": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "renderingIds": {
      "location": "query",
    },
    "searchString": {
      "location": "query",
    },
    "sizeIds": {
      "location": "query",
    },
    "sortField": {
      "location": "query",
    },
    "sortOrder": {
      "location": "query",
    },
    "studioCreativeId": {
      "location": "query",
    },
    "types": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this creative. This field, if left unset, will be auto-generated for both insert and update operations. Applicable to all creative types.",
  ).optional(),
  active: z.boolean().describe(
    "Whether the creative is active. Applicable to all creative types.",
  ).optional(),
  adParameters: z.string().describe(
    "Ad parameters user for VPAID creative. This is a read-only field. Applicable to the following creative types: all VPAID.",
  ).optional(),
  adTagKeys: z.array(z.string()).describe(
    "Keywords for a Rich Media creative. Keywords let you customize the creative settings of a Rich Media ad running on your site without having to contact the advertiser. You can use keywords to dynamically change the look or functionality of a creative. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  additionalSizes: z.array(z.object({
    height: z.number().int().describe(
      "Height of this size. Acceptable values are 0 to 32767, inclusive.",
    ).optional(),
    iab: z.boolean().describe(
      "IAB standard size. This is a read-only, auto-generated field.",
    ).optional(),
    id: z.string().describe(
      "ID of this size. This is a read-only, auto-generated field.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
    ).optional(),
    width: z.number().int().describe(
      "Width of this size. Acceptable values are 0 to 32767, inclusive.",
    ).optional(),
  })).describe(
    "Additional sizes associated with a responsive creative. When inserting or updating a creative either the size ID field or size width and height fields can be used. Applicable to DISPLAY creatives when the primary asset type is HTML_IMAGE.",
  ).optional(),
  advertiserId: z.string().describe(
    "Required. Advertiser ID of this creative. This is a required field. Applicable to all creative types.",
  ).optional(),
  allowScriptAccess: z.boolean().describe(
    "Whether script access is allowed for this creative. This is a read-only and deprecated field which will automatically be set to true on update. Applicable to the following creative types: FLASH_INPAGE.",
  ).optional(),
  archived: z.boolean().describe(
    "Whether the creative is archived. Applicable to all creative types.",
  ).optional(),
  artworkType: z.enum([
    "ARTWORK_TYPE_FLASH",
    "ARTWORK_TYPE_HTML5",
    "ARTWORK_TYPE_MIXED",
    "ARTWORK_TYPE_IMAGE",
  ]).describe(
    "Type of artwork used for the creative. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  authoringSource: z.enum([
    "CREATIVE_AUTHORING_SOURCE_DCM",
    "CREATIVE_AUTHORING_SOURCE_DBM",
    "CREATIVE_AUTHORING_SOURCE_STUDIO",
    "CREATIVE_AUTHORING_SOURCE_GWD",
    "CREATIVE_AUTHORING_SOURCE_ACS",
    "CREATIVE_AUTHORING_SOURCE_ADOBE",
    "CREATIVE_AUTHORING_SOURCE_TYPEFACE_AI",
    "CREATIVE_AUTHORING_SOURCE_REMBRAND",
    "CREATIVE_AUTHORING_SOURCE_TRACKTO_STUDIO",
    "CREATIVE_AUTHORING_SOURCE_BORNLOGIC",
    "CREATIVE_AUTHORING_SOURCE_BEGEN_AI",
  ]).describe(
    "Source application where creative was authored. Presently, only DBM authored creatives will have this field set. Applicable to all creative types.",
  ).optional(),
  authoringTool: z.enum(["NINJA", "SWIFFY"]).describe(
    "Authoring tool for HTML5 banner creatives. This is a read-only field. Applicable to the following creative types: HTML5_BANNER.",
  ).optional(),
  autoAdvanceImages: z.boolean().describe(
    "Whether images are automatically advanced for image gallery creatives. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY.",
  ).optional(),
  backgroundColor: z.string().describe(
    "The 6-character HTML color code, beginning with #, for the background of the window area where the Flash file is displayed. Default is white. Applicable to the following creative types: FLASH_INPAGE.",
  ).optional(),
  backupImageClickThroughUrl: z.object({
    computedClickThroughUrl: z.string().describe(
      "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
    ).optional(),
    customClickThroughUrl: z.string().describe(
      "Custom click-through URL. Applicable if the landingPageId field is left unset.",
    ).optional(),
    landingPageId: z.string().describe(
      "ID of the landing page for the click-through URL.",
    ).optional(),
  }).describe("Click-through URL").optional(),
  backupImageFeatures: z.array(
    z.enum([
      "CSS_FONT_FACE",
      "CSS_BACKGROUND_SIZE",
      "CSS_BORDER_IMAGE",
      "CSS_BORDER_RADIUS",
      "CSS_BOX_SHADOW",
      "CSS_FLEX_BOX",
      "CSS_HSLA",
      "CSS_MULTIPLE_BGS",
      "CSS_OPACITY",
      "CSS_RGBA",
      "CSS_TEXT_SHADOW",
      "CSS_ANIMATIONS",
      "CSS_COLUMNS",
      "CSS_GENERATED_CONTENT",
      "CSS_GRADIENTS",
      "CSS_REFLECTIONS",
      "CSS_TRANSFORMS",
      "CSS_TRANSFORMS3D",
      "CSS_TRANSITIONS",
      "APPLICATION_CACHE",
      "CANVAS",
      "CANVAS_TEXT",
      "DRAG_AND_DROP",
      "HASH_CHANGE",
      "HISTORY",
      "AUDIO",
      "VIDEO",
      "INDEXED_DB",
      "INPUT_ATTR_AUTOCOMPLETE",
      "INPUT_ATTR_AUTOFOCUS",
      "INPUT_ATTR_LIST",
      "INPUT_ATTR_PLACEHOLDER",
      "INPUT_ATTR_MAX",
      "INPUT_ATTR_MIN",
      "INPUT_ATTR_MULTIPLE",
      "INPUT_ATTR_PATTERN",
      "INPUT_ATTR_REQUIRED",
      "INPUT_ATTR_STEP",
      "INPUT_TYPE_SEARCH",
      "INPUT_TYPE_TEL",
      "INPUT_TYPE_URL",
      "INPUT_TYPE_EMAIL",
      "INPUT_TYPE_DATETIME",
      "INPUT_TYPE_DATE",
      "INPUT_TYPE_MONTH",
      "INPUT_TYPE_WEEK",
      "INPUT_TYPE_TIME",
      "INPUT_TYPE_DATETIME_LOCAL",
      "INPUT_TYPE_NUMBER",
      "INPUT_TYPE_RANGE",
      "INPUT_TYPE_COLOR",
      "LOCAL_STORAGE",
      "POST_MESSAGE",
      "SESSION_STORAGE",
      "WEB_SOCKETS",
      "WEB_SQL_DATABASE",
      "WEB_WORKERS",
      "GEO_LOCATION",
      "INLINE_SVG",
      "SMIL",
      "SVG_HREF",
      "SVG_CLIP_PATHS",
      "TOUCH",
      "WEBGL",
      "SVG_FILTERS",
      "SVG_FE_IMAGE",
    ]),
  ).describe(
    "List of feature dependencies that will cause a backup image to be served if the browser that serves the ad does not support them. Feature dependencies are features that a browser must be able to support in order to render your HTML5 creative asset correctly. This field is initially auto-generated to contain all features detected by Campaign Manager for all the assets of this creative and can then be modified by the client. To reset this field, copy over all the creativeAssets' detected features. Applicable to the following creative types: HTML5_BANNER. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  backupImageReportingLabel: z.string().describe(
    "Reporting label used for HTML5 banner backup image. Applicable to the following creative types: DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  backupImageTargetWindow: z.object({
    customHtml: z.string().describe("User-entered value.").optional(),
    targetWindowOption: z.enum(["NEW_WINDOW", "CURRENT_WINDOW", "CUSTOM"])
      .describe(
        "Type of browser window for which the backup image of the flash creative can be displayed.",
      ).optional(),
  }).describe("Target Window.").optional(),
  clickTags: z.array(z.object({
    clickThroughUrl: z.object({
      computedClickThroughUrl: z.string().describe(
        "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
      ).optional(),
      customClickThroughUrl: z.string().describe(
        "Custom click-through URL. Applicable if the landingPageId field is left unset.",
      ).optional(),
      landingPageId: z.string().describe(
        "ID of the landing page for the click-through URL.",
      ).optional(),
    }).describe("Click-through URL").optional(),
    eventName: z.string().describe(
      "Advertiser event name associated with the click tag. This field is used by DISPLAY_IMAGE_GALLERY and HTML5_BANNER creatives. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
    ).optional(),
    name: z.string().describe(
      "Parameter name for the specified click tag. For DISPLAY_IMAGE_GALLERY creative assets, this field must match the value of the creative asset's creativeAssetId.name field.",
    ).optional(),
  })).describe(
    "Click tags of the creative. For DISPLAY, FLASH_INPAGE, and HTML5_BANNER creatives, this is a subset of detected click tags for the assets associated with this creative. After creating a flash asset, detected click tags will be returned in the creativeAssetMetadata. When inserting the creative, populate the creative clickTags field using the creativeAssetMetadata.clickTags field. For DISPLAY_IMAGE_GALLERY creatives, there should be exactly one entry in this list for each image creative asset. A click tag is matched with a corresponding creative asset by matching the clickTag.name field with the creativeAsset.assetIdentifier.name field. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, FLASH_INPAGE, HTML5_BANNER. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  commercialId: z.string().describe(
    "Industry standard ID assigned to creative for reach and frequency. Applicable to INSTREAM_VIDEO_REDIRECT creatives.",
  ).optional(),
  companionCreatives: z.array(z.string()).describe(
    "List of companion creatives assigned to an in-Stream video creative. Acceptable values include IDs of existing flash and image creatives. Applicable to the following creative types: all VPAID, all INSTREAM_AUDIO and all INSTREAM_VIDEO with dynamicAssetSelection set to false.",
  ).optional(),
  compatibility: z.array(
    z.enum([
      "DISPLAY",
      "DISPLAY_INTERSTITIAL",
      "APP",
      "APP_INTERSTITIAL",
      "IN_STREAM_VIDEO",
      "IN_STREAM_AUDIO",
    ]),
  ).describe(
    'Compatibilities associated with this creative. This is a read-only field. DISPLAY and DISPLAY_INTERSTITIAL refer to rendering either on desktop or on mobile devices or in mobile apps for regular or interstitial ads, respectively. APP and APP_INTERSTITIAL are for rendering in mobile apps. Only pre-existing creatives may have these compatibilities since new creatives will either be assigned DISPLAY or DISPLAY_INTERSTITIAL instead. IN_STREAM_VIDEO refers to rendering in in-stream video ads developed with the VAST standard. IN_STREAM_AUDIO refers to rendering in in-stream audio ads developed with the VAST standard. Applicable to all creative types. Acceptable values are: - "APP" - "APP_INTERSTITIAL" - "IN_STREAM_VIDEO" - "IN_STREAM_AUDIO" - "DISPLAY" - "DISPLAY_INTERSTITIAL"',
  ).optional(),
  convertFlashToHtml5: z.boolean().describe(
    "Whether Flash assets associated with the creative need to be automatically converted to HTML5. This flag is enabled by default and users can choose to disable it if they don't want the system to generate and use HTML5 asset for this creative. Applicable to the following creative type: FLASH_INPAGE. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  counterCustomEvents: z.array(z.object({
    advertiserCustomEventId: z.string().describe(
      "Unique ID of this event used by Reporting and Data Transfer. This is a read-only field.",
    ).optional(),
    advertiserCustomEventName: z.string().describe(
      "User-entered name for the event.",
    ).optional(),
    advertiserCustomEventType: z.enum([
      "ADVERTISER_EVENT_TIMER",
      "ADVERTISER_EVENT_EXIT",
      "ADVERTISER_EVENT_COUNTER",
    ]).describe("Type of the event. This is a read-only field.").optional(),
    artworkLabel: z.string().describe(
      "Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion.",
    ).optional(),
    artworkType: z.enum([
      "ARTWORK_TYPE_FLASH",
      "ARTWORK_TYPE_HTML5",
      "ARTWORK_TYPE_MIXED",
      "ARTWORK_TYPE_IMAGE",
    ]).describe("Artwork type used by the creative.This is a read-only field.")
      .optional(),
    exitClickThroughUrl: z.object({
      computedClickThroughUrl: z.string().describe(
        "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
      ).optional(),
      customClickThroughUrl: z.string().describe(
        "Custom click-through URL. Applicable if the landingPageId field is left unset.",
      ).optional(),
      landingPageId: z.string().describe(
        "ID of the landing page for the click-through URL.",
      ).optional(),
    }).describe("Click-through URL").optional(),
    id: z.string().describe(
      "ID of this event. This is a required field and should not be modified after insertion.",
    ).optional(),
    popupWindowProperties: z.object({
      dimension: z.object({
        height: z.number().int().describe(
          "Height of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
        iab: z.boolean().describe(
          "IAB standard size. This is a read-only, auto-generated field.",
        ).optional(),
        id: z.string().describe(
          "ID of this size. This is a read-only, auto-generated field.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
        ).optional(),
        width: z.number().int().describe(
          "Width of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
      }).describe(
        "Represents the dimensions of ads, placements, creatives, or creative assets.",
      ).optional(),
      offset: z.object({
        left: z.number().int().describe(
          "Offset distance from left side of an asset or a window.",
        ).optional(),
        top: z.number().int().describe(
          "Offset distance from top side of an asset or a window.",
        ).optional(),
      }).describe("Offset Position.").optional(),
      positionType: z.enum(["CENTER", "COORDINATES"]).describe(
        "Popup window position either centered or at specific coordinate.",
      ).optional(),
      showAddressBar: z.boolean().describe(
        "Whether to display the browser address bar.",
      ).optional(),
      showMenuBar: z.boolean().describe(
        "Whether to display the browser menu bar.",
      ).optional(),
      showScrollBar: z.boolean().describe(
        "Whether to display the browser scroll bar.",
      ).optional(),
      showStatusBar: z.boolean().describe(
        "Whether to display the browser status bar.",
      ).optional(),
      showToolBar: z.boolean().describe(
        "Whether to display the browser tool bar.",
      ).optional(),
      title: z.string().describe("Title of popup window.").optional(),
    }).describe("Popup Window Properties.").optional(),
    targetType: z.enum([
      "TARGET_BLANK",
      "TARGET_TOP",
      "TARGET_SELF",
      "TARGET_PARENT",
      "TARGET_POPUP",
    ]).describe("Target type used by the event.").optional(),
    videoReportingId: z.string().describe(
      "Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field.",
    ).optional(),
  })).describe(
    "List of counter events configured for the creative. For DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated from clickTags. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID.",
  ).optional(),
  creativeAssets: z.array(z.object({
    actionScript3: z.boolean().describe(
      "Whether ActionScript3 is enabled for the flash asset. This is a read-only field. Applicable to the following creative type: FLASH_INPAGE. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
    ).optional(),
    active: z.boolean().describe(
      "Whether the video or audio asset is active. This is a read-only field for VPAID_NON_LINEAR_VIDEO assets. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    additionalSizes: z.array(z.object({
      height: z.number().int().describe(
        "Height of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
      iab: z.boolean().describe(
        "IAB standard size. This is a read-only, auto-generated field.",
      ).optional(),
      id: z.string().describe(
        "ID of this size. This is a read-only, auto-generated field.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
      ).optional(),
      width: z.number().int().describe(
        "Width of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
    })).describe(
      "Additional sizes associated with this creative asset. HTML5 asset generated by compatible software such as GWD will be able to support more sizes this creative asset can render.",
    ).optional(),
    alignment: z.enum([
      "ALIGNMENT_TOP",
      "ALIGNMENT_RIGHT",
      "ALIGNMENT_BOTTOM",
      "ALIGNMENT_LEFT",
    ]).describe(
      "Possible alignments for an asset. This is a read-only field. Applicable to the following creative types: RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL.",
    ).optional(),
    artworkType: z.enum([
      "ARTWORK_TYPE_FLASH",
      "ARTWORK_TYPE_HTML5",
      "ARTWORK_TYPE_MIXED",
      "ARTWORK_TYPE_IMAGE",
    ]).describe(
      "Artwork type of rich media creative. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    assetIdentifier: z.object({
      name: z.string().describe(
        'Name of the creative asset. This is a required field while inserting an asset. After insertion, this assetIdentifier is used to identify the uploaded asset. Characters in the name must be alphanumeric or one of the following: ".-_ ". Spaces are allowed.',
      ).optional(),
      type: z.enum(["IMAGE", "FLASH", "VIDEO", "HTML", "HTML_IMAGE", "AUDIO"])
        .describe(
          "Type of asset to upload. This is a required field. FLASH and IMAGE are no longer supported for new uploads. All image assets should use HTML_IMAGE.",
        ).optional(),
    }).describe("Creative Asset ID.").optional(),
    audioBitRate: z.number().int().describe(
      "Audio stream bit rate in kbps. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    audioSampleRate: z.number().int().describe(
      "Audio sample bit rate in hertz. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    backupImageExit: z.object({
      advertiserCustomEventId: z.string().describe(
        "Unique ID of this event used by Reporting and Data Transfer. This is a read-only field.",
      ).optional(),
      advertiserCustomEventName: z.string().describe(
        "User-entered name for the event.",
      ).optional(),
      advertiserCustomEventType: z.enum([
        "ADVERTISER_EVENT_TIMER",
        "ADVERTISER_EVENT_EXIT",
        "ADVERTISER_EVENT_COUNTER",
      ]).describe("Type of the event. This is a read-only field.").optional(),
      artworkLabel: z.string().describe(
        "Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion.",
      ).optional(),
      artworkType: z.enum([
        "ARTWORK_TYPE_FLASH",
        "ARTWORK_TYPE_HTML5",
        "ARTWORK_TYPE_MIXED",
        "ARTWORK_TYPE_IMAGE",
      ]).describe(
        "Artwork type used by the creative.This is a read-only field.",
      ).optional(),
      exitClickThroughUrl: z.object({
        computedClickThroughUrl: z.string().describe(
          "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
        ).optional(),
        customClickThroughUrl: z.string().describe(
          "Custom click-through URL. Applicable if the landingPageId field is left unset.",
        ).optional(),
        landingPageId: z.string().describe(
          "ID of the landing page for the click-through URL.",
        ).optional(),
      }).describe("Click-through URL").optional(),
      id: z.string().describe(
        "ID of this event. This is a required field and should not be modified after insertion.",
      ).optional(),
      popupWindowProperties: z.object({
        dimension: z.object({
          height: z.unknown().describe(
            "Height of this size. Acceptable values are 0 to 32767, inclusive.",
          ).optional(),
          iab: z.unknown().describe(
            "IAB standard size. This is a read-only, auto-generated field.",
          ).optional(),
          id: z.unknown().describe(
            "ID of this size. This is a read-only, auto-generated field.",
          ).optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
          ).optional(),
          width: z.unknown().describe(
            "Width of this size. Acceptable values are 0 to 32767, inclusive.",
          ).optional(),
        }).describe(
          "Represents the dimensions of ads, placements, creatives, or creative assets.",
        ).optional(),
        offset: z.object({
          left: z.unknown().describe(
            "Offset distance from left side of an asset or a window.",
          ).optional(),
          top: z.unknown().describe(
            "Offset distance from top side of an asset or a window.",
          ).optional(),
        }).describe("Offset Position.").optional(),
        positionType: z.enum(["CENTER", "COORDINATES"]).describe(
          "Popup window position either centered or at specific coordinate.",
        ).optional(),
        showAddressBar: z.boolean().describe(
          "Whether to display the browser address bar.",
        ).optional(),
        showMenuBar: z.boolean().describe(
          "Whether to display the browser menu bar.",
        ).optional(),
        showScrollBar: z.boolean().describe(
          "Whether to display the browser scroll bar.",
        ).optional(),
        showStatusBar: z.boolean().describe(
          "Whether to display the browser status bar.",
        ).optional(),
        showToolBar: z.boolean().describe(
          "Whether to display the browser tool bar.",
        ).optional(),
        title: z.string().describe("Title of popup window.").optional(),
      }).describe("Popup Window Properties.").optional(),
      targetType: z.enum([
        "TARGET_BLANK",
        "TARGET_TOP",
        "TARGET_SELF",
        "TARGET_PARENT",
        "TARGET_POPUP",
      ]).describe("Target type used by the event.").optional(),
      videoReportingId: z.string().describe(
        "Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field.",
      ).optional(),
    }).describe("Creative Custom Event.").optional(),
    bitRate: z.number().int().describe(
      "Detected bit-rate for audio or video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    childAssetType: z.enum([
      "CHILD_ASSET_TYPE_FLASH",
      "CHILD_ASSET_TYPE_VIDEO",
      "CHILD_ASSET_TYPE_IMAGE",
      "CHILD_ASSET_TYPE_DATA",
    ]).describe(
      "Rich media child asset type. This is a read-only field. Applicable to the following creative types: all VPAID.",
    ).optional(),
    collapsedSize: z.object({
      height: z.number().int().describe(
        "Height of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
      iab: z.boolean().describe(
        "IAB standard size. This is a read-only, auto-generated field.",
      ).optional(),
      id: z.string().describe(
        "ID of this size. This is a read-only, auto-generated field.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
      ).optional(),
      width: z.number().int().describe(
        "Width of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
    }).describe(
      "Represents the dimensions of ads, placements, creatives, or creative assets.",
    ).optional(),
    companionCreativeIds: z.array(z.string()).describe(
      "List of companion creatives assigned to an in-stream video creative asset. Acceptable values include IDs of existing flash and image creatives. Applicable to INSTREAM_VIDEO creative type with dynamicAssetSelection set to true.",
    ).optional(),
    customStartTimeValue: z.number().int().describe(
      "Custom start time in seconds for making the asset visible. Applicable to the following creative types: all RICH_MEDIA. Value must be greater than or equal to 0.",
    ).optional(),
    detectedFeatures: z.array(
      z.enum([
        "CSS_FONT_FACE",
        "CSS_BACKGROUND_SIZE",
        "CSS_BORDER_IMAGE",
        "CSS_BORDER_RADIUS",
        "CSS_BOX_SHADOW",
        "CSS_FLEX_BOX",
        "CSS_HSLA",
        "CSS_MULTIPLE_BGS",
        "CSS_OPACITY",
        "CSS_RGBA",
        "CSS_TEXT_SHADOW",
        "CSS_ANIMATIONS",
        "CSS_COLUMNS",
        "CSS_GENERATED_CONTENT",
        "CSS_GRADIENTS",
        "CSS_REFLECTIONS",
        "CSS_TRANSFORMS",
        "CSS_TRANSFORMS3D",
        "CSS_TRANSITIONS",
        "APPLICATION_CACHE",
        "CANVAS",
        "CANVAS_TEXT",
        "DRAG_AND_DROP",
        "HASH_CHANGE",
        "HISTORY",
        "AUDIO",
        "VIDEO",
        "INDEXED_DB",
        "INPUT_ATTR_AUTOCOMPLETE",
        "INPUT_ATTR_AUTOFOCUS",
        "INPUT_ATTR_LIST",
        "INPUT_ATTR_PLACEHOLDER",
        "INPUT_ATTR_MAX",
        "INPUT_ATTR_MIN",
        "INPUT_ATTR_MULTIPLE",
        "INPUT_ATTR_PATTERN",
        "INPUT_ATTR_REQUIRED",
        "INPUT_ATTR_STEP",
        "INPUT_TYPE_SEARCH",
        "INPUT_TYPE_TEL",
        "INPUT_TYPE_URL",
        "INPUT_TYPE_EMAIL",
        "INPUT_TYPE_DATETIME",
        "INPUT_TYPE_DATE",
        "INPUT_TYPE_MONTH",
        "INPUT_TYPE_WEEK",
        "INPUT_TYPE_TIME",
        "INPUT_TYPE_DATETIME_LOCAL",
        "INPUT_TYPE_NUMBER",
        "INPUT_TYPE_RANGE",
        "INPUT_TYPE_COLOR",
        "LOCAL_STORAGE",
        "POST_MESSAGE",
        "SESSION_STORAGE",
        "WEB_SOCKETS",
        "WEB_SQL_DATABASE",
        "WEB_WORKERS",
        "GEO_LOCATION",
        "INLINE_SVG",
        "SMIL",
        "SVG_HREF",
        "SVG_CLIP_PATHS",
        "TOUCH",
        "WEBGL",
        "SVG_FILTERS",
        "SVG_FE_IMAGE",
      ]),
    ).describe(
      "List of feature dependencies for the creative asset that are detected by Campaign Manager. Feature dependencies are features that a browser must be able to support in order to render your HTML5 creative correctly. This is a read-only, auto-generated field. Applicable to the following creative types: HTML5_BANNER. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
    ).optional(),
    displayType: z.enum([
      "ASSET_DISPLAY_TYPE_INPAGE",
      "ASSET_DISPLAY_TYPE_FLOATING",
      "ASSET_DISPLAY_TYPE_OVERLAY",
      "ASSET_DISPLAY_TYPE_EXPANDING",
      "ASSET_DISPLAY_TYPE_FLASH_IN_FLASH",
      "ASSET_DISPLAY_TYPE_FLASH_IN_FLASH_EXPANDING",
      "ASSET_DISPLAY_TYPE_PEEL_DOWN",
      "ASSET_DISPLAY_TYPE_VPAID_LINEAR",
      "ASSET_DISPLAY_TYPE_VPAID_NON_LINEAR",
      "ASSET_DISPLAY_TYPE_BACKDROP",
    ]).describe(
      "Type of rich media asset. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    duration: z.number().int().describe(
      "Duration in seconds for which an asset will be displayed. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and VPAID_LINEAR_VIDEO. Value must be greater than or equal to 1.",
    ).optional(),
    durationType: z.enum([
      "ASSET_DURATION_TYPE_AUTO",
      "ASSET_DURATION_TYPE_NONE",
      "ASSET_DURATION_TYPE_CUSTOM",
    ]).describe(
      "Duration type for which an asset will be displayed. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    expandedDimension: z.object({
      height: z.number().int().describe(
        "Height of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
      iab: z.boolean().describe(
        "IAB standard size. This is a read-only, auto-generated field.",
      ).optional(),
      id: z.string().describe(
        "ID of this size. This is a read-only, auto-generated field.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
      ).optional(),
      width: z.number().int().describe(
        "Width of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
    }).describe(
      "Represents the dimensions of ads, placements, creatives, or creative assets.",
    ).optional(),
    fileSize: z.string().describe(
      "File size associated with this creative asset. This is a read-only field. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT.",
    ).optional(),
    flashVersion: z.number().int().describe(
      "Flash version of the asset. This is a read-only field. Applicable to the following creative types: FLASH_INPAGE, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
    ).optional(),
    frameRate: z.number().describe(
      "Video frame rate for video asset in frames per second. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    hideFlashObjects: z.boolean().describe(
      "Whether to hide Flash objects flag for an asset. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    hideSelectionBoxes: z.boolean().describe(
      "Whether to hide selection boxes flag for an asset. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    horizontallyLocked: z.boolean().describe(
      "Whether the asset is horizontally locked. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    id: z.string().describe(
      "Numeric ID of this creative asset. This is a required field and should not be modified. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT.",
    ).optional(),
    idDimensionValue: z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
      id: z.string().describe("The ID associated with the value if available.")
        .optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dimensionValue.",
      ).optional(),
      matchType: z.enum([
        "EXACT",
        "BEGINS_WITH",
        "CONTAINS",
        "WILDCARD_EXPRESSION",
      ]).describe(
        "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
      ).optional(),
      value: z.string().describe("The value of the dimension.").optional(),
    }).describe("Represents a DimensionValue resource.").optional(),
    mediaDuration: z.number().describe(
      "Detected duration for audio or video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    mimeType: z.string().describe(
      "Detected MIME type for audio or video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    offset: z.object({
      left: z.number().int().describe(
        "Offset distance from left side of an asset or a window.",
      ).optional(),
      top: z.number().int().describe(
        "Offset distance from top side of an asset or a window.",
      ).optional(),
    }).describe("Offset Position.").optional(),
    orientation: z.enum(["LANDSCAPE", "PORTRAIT", "SQUARE"]).describe(
      "Orientation of video asset. This is a read-only, auto-generated field.",
    ).optional(),
    originalBackup: z.boolean().describe(
      "Whether the backup asset is original or changed by the user in Campaign Manager. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    politeLoad: z.boolean().describe(
      "Whether this asset is used as a polite load asset.",
    ).optional(),
    position: z.object({
      left: z.number().int().describe(
        "Offset distance from left side of an asset or a window.",
      ).optional(),
      top: z.number().int().describe(
        "Offset distance from top side of an asset or a window.",
      ).optional(),
    }).describe("Offset Position.").optional(),
    positionLeftUnit: z.enum([
      "OFFSET_UNIT_PIXEL",
      "OFFSET_UNIT_PERCENT",
      "OFFSET_UNIT_PIXEL_FROM_CENTER",
    ]).describe(
      "Offset left unit for an asset. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    positionTopUnit: z.enum([
      "OFFSET_UNIT_PIXEL",
      "OFFSET_UNIT_PERCENT",
      "OFFSET_UNIT_PIXEL_FROM_CENTER",
    ]).describe(
      "Offset top unit for an asset. This is a read-only field if the asset displayType is ASSET_DISPLAY_TYPE_OVERLAY. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    progressiveServingUrl: z.string().describe(
      "Progressive URL for video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    pushdown: z.boolean().describe(
      "Whether the asset pushes down other content. Applicable to the following creative types: all RICH_MEDIA. Additionally, only applicable when the asset offsets are 0, the collapsedSize.width matches size.width, and the collapsedSize.height is less than size.height.",
    ).optional(),
    pushdownDuration: z.number().describe(
      "Pushdown duration in seconds for an asset. Applicable to the following creative types: all RICH_MEDIA.Additionally, only applicable when the asset pushdown field is true, the offsets are 0, the collapsedSize.width matches size.width, and the collapsedSize.height is less than size.height. Acceptable values are 0 to 9.99, inclusive.",
    ).optional(),
    role: z.enum([
      "PRIMARY",
      "BACKUP_IMAGE",
      "ADDITIONAL_IMAGE",
      "ADDITIONAL_FLASH",
      "PARENT_VIDEO",
      "TRANSCODED_VIDEO",
      "OTHER",
      "ALTERNATE_VIDEO",
      "PARENT_AUDIO",
      "TRANSCODED_AUDIO",
    ]).describe(
      "Role of the asset in relation to creative. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT. This is a required field. PRIMARY applies to DISPLAY, FLASH_INPAGE, HTML5_BANNER, IMAGE, DISPLAY_IMAGE_GALLERY, all RICH_MEDIA (which may contain multiple primary assets), and all VPAID creatives. BACKUP_IMAGE applies to FLASH_INPAGE, HTML5_BANNER, all RICH_MEDIA, and all VPAID creatives. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. ADDITIONAL_IMAGE and ADDITIONAL_FLASH apply to FLASH_INPAGE creatives. OTHER refers to assets from sources other than Campaign Manager, such as Studio uploaded assets, applicable to all RICH_MEDIA and all VPAID creatives. PARENT_VIDEO refers to videos uploaded by the user in Campaign Manager and is applicable to INSTREAM_VIDEO and VPAID_LINEAR_VIDEO creatives. TRANSCODED_VIDEO refers to videos transcoded by Campaign Manager from PARENT_VIDEO assets and is applicable to INSTREAM_VIDEO and VPAID_LINEAR_VIDEO creatives. ALTERNATE_VIDEO refers to the Campaign Manager representation of child asset videos from Studio, and is applicable to VPAID_LINEAR_VIDEO creatives. These cannot be added or removed within Campaign Manager. For VPAID_LINEAR_VIDEO creatives, PARENT_VIDEO, TRANSCODED_VIDEO and ALTERNATE_VIDEO assets that are marked active serve as backup in case the VPAID creative cannot be served. Only PARENT_VIDEO assets can be added or removed for an INSTREAM_VIDEO or VPAID_LINEAR_VIDEO creative. PARENT_AUDIO refers to audios uploaded by the user in Campaign Manager and is applicable to INSTREAM_AUDIO creatives. TRANSCODED_AUDIO refers to audios transcoded by Campaign Manager from PARENT_AUDIO assets and is applicable to INSTREAM_AUDIO creatives.",
    ).optional(),
    size: z.object({
      height: z.number().int().describe(
        "Height of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
      iab: z.boolean().describe(
        "IAB standard size. This is a read-only, auto-generated field.",
      ).optional(),
      id: z.string().describe(
        "ID of this size. This is a read-only, auto-generated field.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
      ).optional(),
      width: z.number().int().describe(
        "Width of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
    }).describe(
      "Represents the dimensions of ads, placements, creatives, or creative assets.",
    ).optional(),
    sslCompliant: z.boolean().describe(
      "Whether the asset is SSL-compliant. This is a read-only field. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT.",
    ).optional(),
    startTimeType: z.enum([
      "ASSET_START_TIME_TYPE_NONE",
      "ASSET_START_TIME_TYPE_CUSTOM",
    ]).describe(
      "Initial wait time type before making the asset visible. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    streamingServingUrl: z.string().describe(
      "Streaming URL for video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    transparency: z.boolean().describe(
      "Whether the asset is transparent. Applicable to the following creative types: all RICH_MEDIA. Additionally, only applicable to HTML5 assets.",
    ).optional(),
    verticallyLocked: z.boolean().describe(
      "Whether the asset is vertically locked. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    windowMode: z.enum(["OPAQUE", "WINDOW", "TRANSPARENT"]).describe(
      "Window mode options for flash assets. Applicable to the following creative types: FLASH_INPAGE, RICH_MEDIA_DISPLAY_EXPANDING, RICH_MEDIA_IM_EXPAND, RICH_MEDIA_DISPLAY_BANNER, and RICH_MEDIA_INPAGE_FLOATING.",
    ).optional(),
    zIndex: z.number().int().describe(
      "zIndex value of an asset. Applicable to the following creative types: all RICH_MEDIA.Additionally, only applicable to assets whose displayType is NOT one of the following types: ASSET_DISPLAY_TYPE_INPAGE or ASSET_DISPLAY_TYPE_OVERLAY. Acceptable values are -999999999 to 999999999, inclusive.",
    ).optional(),
    zipFilename: z.string().describe(
      "File name of zip file. This is a read-only field. Applicable to the following creative types: HTML5_BANNER.",
    ).optional(),
    zipFilesize: z.string().describe(
      "Size of zip file. This is a read-only field. Applicable to the following creative types: HTML5_BANNER.",
    ).optional(),
  })).describe(
    "Assets associated with a creative. Applicable to all but the following creative types: INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and REDIRECT",
  ).optional(),
  creativeFieldAssignments: z.array(z.object({
    creativeFieldId: z.string().describe("ID of the creative field.")
      .optional(),
    creativeFieldValueId: z.string().describe("ID of the creative field value.")
      .optional(),
  })).describe(
    "Creative field assignments for this creative. Applicable to all creative types.",
  ).optional(),
  customKeyValues: z.array(z.string()).describe(
    "Custom key-values for a Rich Media creative. Key-values let you customize the creative settings of a Rich Media ad running on your site without having to contact the advertiser. You can use key-values to dynamically change the look or functionality of a creative. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  exitCustomEvents: z.array(z.object({
    advertiserCustomEventId: z.string().describe(
      "Unique ID of this event used by Reporting and Data Transfer. This is a read-only field.",
    ).optional(),
    advertiserCustomEventName: z.string().describe(
      "User-entered name for the event.",
    ).optional(),
    advertiserCustomEventType: z.enum([
      "ADVERTISER_EVENT_TIMER",
      "ADVERTISER_EVENT_EXIT",
      "ADVERTISER_EVENT_COUNTER",
    ]).describe("Type of the event. This is a read-only field.").optional(),
    artworkLabel: z.string().describe(
      "Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion.",
    ).optional(),
    artworkType: z.enum([
      "ARTWORK_TYPE_FLASH",
      "ARTWORK_TYPE_HTML5",
      "ARTWORK_TYPE_MIXED",
      "ARTWORK_TYPE_IMAGE",
    ]).describe("Artwork type used by the creative.This is a read-only field.")
      .optional(),
    exitClickThroughUrl: z.object({
      computedClickThroughUrl: z.string().describe(
        "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
      ).optional(),
      customClickThroughUrl: z.string().describe(
        "Custom click-through URL. Applicable if the landingPageId field is left unset.",
      ).optional(),
      landingPageId: z.string().describe(
        "ID of the landing page for the click-through URL.",
      ).optional(),
    }).describe("Click-through URL").optional(),
    id: z.string().describe(
      "ID of this event. This is a required field and should not be modified after insertion.",
    ).optional(),
    popupWindowProperties: z.object({
      dimension: z.object({
        height: z.number().int().describe(
          "Height of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
        iab: z.boolean().describe(
          "IAB standard size. This is a read-only, auto-generated field.",
        ).optional(),
        id: z.string().describe(
          "ID of this size. This is a read-only, auto-generated field.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
        ).optional(),
        width: z.number().int().describe(
          "Width of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
      }).describe(
        "Represents the dimensions of ads, placements, creatives, or creative assets.",
      ).optional(),
      offset: z.object({
        left: z.number().int().describe(
          "Offset distance from left side of an asset or a window.",
        ).optional(),
        top: z.number().int().describe(
          "Offset distance from top side of an asset or a window.",
        ).optional(),
      }).describe("Offset Position.").optional(),
      positionType: z.enum(["CENTER", "COORDINATES"]).describe(
        "Popup window position either centered or at specific coordinate.",
      ).optional(),
      showAddressBar: z.boolean().describe(
        "Whether to display the browser address bar.",
      ).optional(),
      showMenuBar: z.boolean().describe(
        "Whether to display the browser menu bar.",
      ).optional(),
      showScrollBar: z.boolean().describe(
        "Whether to display the browser scroll bar.",
      ).optional(),
      showStatusBar: z.boolean().describe(
        "Whether to display the browser status bar.",
      ).optional(),
      showToolBar: z.boolean().describe(
        "Whether to display the browser tool bar.",
      ).optional(),
      title: z.string().describe("Title of popup window.").optional(),
    }).describe("Popup Window Properties.").optional(),
    targetType: z.enum([
      "TARGET_BLANK",
      "TARGET_TOP",
      "TARGET_SELF",
      "TARGET_PARENT",
      "TARGET_POPUP",
    ]).describe("Target type used by the event.").optional(),
    videoReportingId: z.string().describe(
      "Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field.",
    ).optional(),
  })).describe(
    "List of exit events configured for the creative. For DISPLAY and DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated from clickTags, For DISPLAY, an event is also created from the backupImageReportingLabel. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  fsCommand: z.object({
    left: z.number().int().describe(
      "Distance from the left of the browser.Applicable when positionOption is DISTANCE_FROM_TOP_LEFT_CORNER.",
    ).optional(),
    positionOption: z.enum(["CENTERED", "DISTANCE_FROM_TOP_LEFT_CORNER"])
      .describe("Position in the browser where the window will open.")
      .optional(),
    top: z.number().int().describe(
      "Distance from the top of the browser. Applicable when positionOption is DISTANCE_FROM_TOP_LEFT_CORNER.",
    ).optional(),
    windowHeight: z.number().int().describe("Height of the window.").optional(),
    windowWidth: z.number().int().describe("Width of the window.").optional(),
  }).describe("FsCommand.").optional(),
  htmlCode: z.string().describe(
    "HTML code for the creative. This is a required field when applicable. This field is ignored if htmlCodeLocked is true. Applicable to the following creative types: all CUSTOM, FLASH_INPAGE, and HTML5_BANNER, and all RICH_MEDIA.",
  ).optional(),
  htmlCodeLocked: z.boolean().describe(
    "Whether HTML code is generated by Campaign Manager or manually entered. Set to true to ignore changes to htmlCode. Applicable to the following creative types: FLASH_INPAGE and HTML5_BANNER.",
  ).optional(),
  id: z.string().describe(
    "ID of this creative. This is a read-only, auto-generated field. Applicable to all creative types.",
  ).optional(),
  idDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  latestTraffickedCreativeId: z.string().describe(
    "Latest Studio trafficked creative ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  mediaDescription: z.string().describe(
    "Description of the audio or video ad. Applicable to the following creative types: all INSTREAM_VIDEO, INSTREAM_AUDIO, and all VPAID.",
  ).optional(),
  mediaDuration: z.number().describe(
    "Creative audio or video duration in seconds. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO, INSTREAM_AUDIO, all RICH_MEDIA, and all VPAID.",
  ).optional(),
  name: z.string().describe(
    "Required. Name of the creative. This must be less than 256 characters long. Applicable to all creative types.",
  ).optional(),
  obaIcon: z.object({
    iconClickThroughUrl: z.string().describe(
      "URL to redirect to when an OBA icon is clicked.",
    ).optional(),
    iconClickTrackingUrl: z.string().describe(
      "URL to track click when an OBA icon is clicked.",
    ).optional(),
    iconViewTrackingUrl: z.string().describe(
      "URL to track view when an OBA icon is clicked.",
    ).optional(),
    program: z.string().describe(
      "Identifies the industry initiative that the icon supports. For example, AdChoices.",
    ).optional(),
    resourceUrl: z.string().describe(
      "OBA icon resource URL. Campaign Manager only supports image and JavaScript icons. Learn more",
    ).optional(),
    size: z.object({
      height: z.number().int().describe(
        "Height of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
      iab: z.boolean().describe(
        "IAB standard size. This is a read-only, auto-generated field.",
      ).optional(),
      id: z.string().describe(
        "ID of this size. This is a read-only, auto-generated field.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
      ).optional(),
      width: z.number().int().describe(
        "Width of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
    }).describe(
      "Represents the dimensions of ads, placements, creatives, or creative assets.",
    ).optional(),
    xPosition: z.string().describe(
      "OBA icon x coordinate position. Accepted values are left or right.",
    ).optional(),
    yPosition: z.string().describe(
      "OBA icon y coordinate position. Accepted values are top or bottom.",
    ).optional(),
  }).describe("Online Behavioral Advertiser icon.").optional(),
  overrideCss: z.string().describe(
    "Override CSS value for rich media creatives. Applicable to the following creative types: all RICH_MEDIA.",
  ).optional(),
  progressOffset: z.object({
    offsetPercentage: z.number().int().describe(
      "Duration, as a percentage of video duration. Do not set when offsetSeconds is set. Acceptable values are 0 to 100, inclusive.",
    ).optional(),
    offsetSeconds: z.number().int().describe(
      "Duration, in seconds. Do not set when offsetPercentage is set. Acceptable values are 0 to 86399, inclusive.",
    ).optional(),
  }).describe("Video Offset").optional(),
  redirectUrl: z.string().describe(
    "URL of hosted image or hosted video or another ad tag. For INSTREAM_VIDEO_REDIRECT creatives this is the in-stream video redirect URL. The standard for a VAST (Video Ad Serving Template) ad response allows for a redirect link to another VAST 2.0 or 3.0 call. This is a required field when applicable. Applicable to the following creative types: DISPLAY_REDIRECT, INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and INSTREAM_VIDEO_REDIRECT",
  ).optional(),
  renderingId: z.string().describe(
    "ID of current rendering version. This is a read-only field. Applicable to all creative types.",
  ).optional(),
  renderingIdDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  requiredFlashPluginVersion: z.string().describe(
    "The minimum required Flash plugin version for this creative. For example, 11.2.202.235. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  requiredFlashVersion: z.number().int().describe(
    "The internal Flash version for this creative as calculated by Studio. This is a read-only field. Applicable to the following creative types: FLASH_INPAGE all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  size: z.object({
    height: z.number().int().describe(
      "Height of this size. Acceptable values are 0 to 32767, inclusive.",
    ).optional(),
    iab: z.boolean().describe(
      "IAB standard size. This is a read-only, auto-generated field.",
    ).optional(),
    id: z.string().describe(
      "ID of this size. This is a read-only, auto-generated field.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
    ).optional(),
    width: z.number().int().describe(
      "Width of this size. Acceptable values are 0 to 32767, inclusive.",
    ).optional(),
  }).describe(
    "Represents the dimensions of ads, placements, creatives, or creative assets.",
  ).optional(),
  skipOffset: z.object({
    offsetPercentage: z.number().int().describe(
      "Duration, as a percentage of video duration. Do not set when offsetSeconds is set. Acceptable values are 0 to 100, inclusive.",
    ).optional(),
    offsetSeconds: z.number().int().describe(
      "Duration, in seconds. Do not set when offsetPercentage is set. Acceptable values are 0 to 86399, inclusive.",
    ).optional(),
  }).describe("Video Offset").optional(),
  skippable: z.boolean().describe(
    "Whether the user can choose to skip the creative. Applicable to the following creative types: all INSTREAM_VIDEO and all VPAID.",
  ).optional(),
  sslCompliant: z.boolean().describe(
    "Whether the creative is SSL-compliant. This is a read-only field. Applicable to all creative types.",
  ).optional(),
  sslOverride: z.boolean().describe(
    "Whether creative should be treated as SSL compliant even if the system scan shows it's not. Applicable to all creative types.",
  ).optional(),
  studioAdvertiserId: z.string().describe(
    "Studio advertiser ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  studioCreativeId: z.string().describe(
    "Studio creative ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  studioTraffickedCreativeId: z.string().describe(
    "Studio trafficked creative ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this creative. This field, if left unset, will be auto-generated for both insert and update operations. Applicable to all creative types.",
  ).optional(),
  thirdPartyBackupImageImpressionsUrl: z.string().describe(
    "Third-party URL used to record backup image impressions. Applicable to the following creative types: all RICH_MEDIA.",
  ).optional(),
  thirdPartyRichMediaImpressionsUrl: z.string().describe(
    "Third-party URL used to record rich media impressions. Applicable to the following creative types: all RICH_MEDIA.",
  ).optional(),
  thirdPartyUrls: z.array(z.object({
    thirdPartyUrlType: z.enum([
      "IMPRESSION",
      "CLICK_TRACKING",
      "VIDEO_START",
      "VIDEO_FIRST_QUARTILE",
      "VIDEO_MIDPOINT",
      "VIDEO_THIRD_QUARTILE",
      "VIDEO_COMPLETE",
      "VIDEO_MUTE",
      "VIDEO_PAUSE",
      "VIDEO_REWIND",
      "VIDEO_FULLSCREEN",
      "VIDEO_STOP",
      "VIDEO_CUSTOM",
      "SURVEY",
      "RICH_MEDIA_IMPRESSION",
      "RICH_MEDIA_RM_IMPRESSION",
      "RICH_MEDIA_BACKUP_IMPRESSION",
      "VIDEO_SKIP",
      "VIDEO_PROGRESS",
    ]).describe(
      "Third-party URL type for in-stream video and in-stream audio creatives.",
    ).optional(),
    url: z.string().describe("URL for the specified third-party URL type.")
      .optional(),
  })).describe(
    "Third-party URLs for tracking in-stream creative events. Applicable to the following creative types: all INSTREAM_VIDEO, all INSTREAM_AUDIO, and all VPAID.",
  ).optional(),
  timerCustomEvents: z.array(z.object({
    advertiserCustomEventId: z.string().describe(
      "Unique ID of this event used by Reporting and Data Transfer. This is a read-only field.",
    ).optional(),
    advertiserCustomEventName: z.string().describe(
      "User-entered name for the event.",
    ).optional(),
    advertiserCustomEventType: z.enum([
      "ADVERTISER_EVENT_TIMER",
      "ADVERTISER_EVENT_EXIT",
      "ADVERTISER_EVENT_COUNTER",
    ]).describe("Type of the event. This is a read-only field.").optional(),
    artworkLabel: z.string().describe(
      "Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion.",
    ).optional(),
    artworkType: z.enum([
      "ARTWORK_TYPE_FLASH",
      "ARTWORK_TYPE_HTML5",
      "ARTWORK_TYPE_MIXED",
      "ARTWORK_TYPE_IMAGE",
    ]).describe("Artwork type used by the creative.This is a read-only field.")
      .optional(),
    exitClickThroughUrl: z.object({
      computedClickThroughUrl: z.string().describe(
        "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
      ).optional(),
      customClickThroughUrl: z.string().describe(
        "Custom click-through URL. Applicable if the landingPageId field is left unset.",
      ).optional(),
      landingPageId: z.string().describe(
        "ID of the landing page for the click-through URL.",
      ).optional(),
    }).describe("Click-through URL").optional(),
    id: z.string().describe(
      "ID of this event. This is a required field and should not be modified after insertion.",
    ).optional(),
    popupWindowProperties: z.object({
      dimension: z.object({
        height: z.number().int().describe(
          "Height of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
        iab: z.boolean().describe(
          "IAB standard size. This is a read-only, auto-generated field.",
        ).optional(),
        id: z.string().describe(
          "ID of this size. This is a read-only, auto-generated field.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
        ).optional(),
        width: z.number().int().describe(
          "Width of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
      }).describe(
        "Represents the dimensions of ads, placements, creatives, or creative assets.",
      ).optional(),
      offset: z.object({
        left: z.number().int().describe(
          "Offset distance from left side of an asset or a window.",
        ).optional(),
        top: z.number().int().describe(
          "Offset distance from top side of an asset or a window.",
        ).optional(),
      }).describe("Offset Position.").optional(),
      positionType: z.enum(["CENTER", "COORDINATES"]).describe(
        "Popup window position either centered or at specific coordinate.",
      ).optional(),
      showAddressBar: z.boolean().describe(
        "Whether to display the browser address bar.",
      ).optional(),
      showMenuBar: z.boolean().describe(
        "Whether to display the browser menu bar.",
      ).optional(),
      showScrollBar: z.boolean().describe(
        "Whether to display the browser scroll bar.",
      ).optional(),
      showStatusBar: z.boolean().describe(
        "Whether to display the browser status bar.",
      ).optional(),
      showToolBar: z.boolean().describe(
        "Whether to display the browser tool bar.",
      ).optional(),
      title: z.string().describe("Title of popup window.").optional(),
    }).describe("Popup Window Properties.").optional(),
    targetType: z.enum([
      "TARGET_BLANK",
      "TARGET_TOP",
      "TARGET_SELF",
      "TARGET_PARENT",
      "TARGET_POPUP",
    ]).describe("Target type used by the event.").optional(),
    videoReportingId: z.string().describe(
      "Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field.",
    ).optional(),
  })).describe(
    "List of timer events configured for the creative. For DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated from clickTags. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset is not HTML_IMAGE.",
  ).optional(),
  totalFileSize: z.string().describe(
    "Combined size of all creative assets. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  type: z.enum([
    "IMAGE",
    "DISPLAY_REDIRECT",
    "CUSTOM_DISPLAY",
    "INTERNAL_REDIRECT",
    "CUSTOM_DISPLAY_INTERSTITIAL",
    "INTERSTITIAL_INTERNAL_REDIRECT",
    "TRACKING_TEXT",
    "RICH_MEDIA_DISPLAY_BANNER",
    "RICH_MEDIA_INPAGE_FLOATING",
    "RICH_MEDIA_IM_EXPAND",
    "RICH_MEDIA_DISPLAY_EXPANDING",
    "RICH_MEDIA_DISPLAY_INTERSTITIAL",
    "RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL",
    "RICH_MEDIA_MOBILE_IN_APP",
    "FLASH_INPAGE",
    "INSTREAM_VIDEO",
    "VPAID_LINEAR_VIDEO",
    "VPAID_NON_LINEAR_VIDEO",
    "INSTREAM_VIDEO_REDIRECT",
    "RICH_MEDIA_PEEL_DOWN",
    "HTML5_BANNER",
    "DISPLAY",
    "DISPLAY_IMAGE_GALLERY",
    "BRAND_SAFE_DEFAULT_INSTREAM_VIDEO",
    "INSTREAM_AUDIO",
  ]).describe(
    "Required. Type of this creative. Applicable to all creative types. *Note:* FLASH_INPAGE, HTML5_BANNER, and IMAGE are only used for existing creatives. New creatives should use DISPLAY as a replacement for these types.",
  ).optional(),
  universalAdId: z.object({
    registry: z.enum([
      "OTHER",
      "AD_ID_OFFICIAL",
      "CLEARCAST",
      "DCM",
      "ARPP",
      "CUSV",
    ]).describe("Registry used for the Ad ID value.").optional(),
    value: z.string().describe(
      'ID value for this creative. Only alphanumeric characters and the following symbols are valid: "_/\\-". Maximum length is 64 characters. Read only when registry is DCM.',
    ).optional(),
  }).describe(
    "A Universal Ad ID as per the VAST 4.0 spec. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and VPAID.",
  ).optional(),
  version: z.number().int().describe(
    "The version number helps you keep track of multiple versions of your creative in your reports. The version number will always be auto-generated during insert operations to start at 1. For tracking creatives the version cannot be incremented and will always remain at 1. For all other creative types the version can be incremented only by 1 during update operations. In addition, the version will be automatically incremented by 1 when undergoing Rich Media creative merging. Applicable to all creative types.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  active: z.boolean().optional(),
  adParameters: z.string().optional(),
  adTagKeys: z.array(z.string()).optional(),
  additionalSizes: z.array(z.object({
    height: z.number(),
    iab: z.boolean(),
    id: z.string(),
    kind: z.string(),
    width: z.number(),
  })).optional(),
  advertiserId: z.string().optional(),
  allowScriptAccess: z.boolean().optional(),
  archived: z.boolean().optional(),
  artworkType: z.string().optional(),
  authoringSource: z.string().optional(),
  authoringTool: z.string().optional(),
  autoAdvanceImages: z.boolean().optional(),
  backgroundColor: z.string().optional(),
  backupImageClickThroughUrl: z.object({
    computedClickThroughUrl: z.string(),
    customClickThroughUrl: z.string(),
    landingPageId: z.string(),
  }).optional(),
  backupImageFeatures: z.array(z.string()).optional(),
  backupImageReportingLabel: z.string().optional(),
  backupImageTargetWindow: z.object({
    customHtml: z.string(),
    targetWindowOption: z.string(),
  }).optional(),
  clickTags: z.array(z.object({
    clickThroughUrl: z.object({
      computedClickThroughUrl: z.string(),
      customClickThroughUrl: z.string(),
      landingPageId: z.string(),
    }),
    eventName: z.string(),
    name: z.string(),
  })).optional(),
  commercialId: z.string().optional(),
  companionCreatives: z.array(z.string()).optional(),
  compatibility: z.array(z.string()).optional(),
  convertFlashToHtml5: z.boolean().optional(),
  counterCustomEvents: z.array(z.object({
    advertiserCustomEventId: z.string(),
    advertiserCustomEventName: z.string(),
    advertiserCustomEventType: z.string(),
    artworkLabel: z.string(),
    artworkType: z.string(),
    exitClickThroughUrl: z.object({
      computedClickThroughUrl: z.string(),
      customClickThroughUrl: z.string(),
      landingPageId: z.string(),
    }),
    id: z.string(),
    popupWindowProperties: z.object({
      dimension: z.object({
        height: z.number(),
        iab: z.boolean(),
        id: z.string(),
        kind: z.string(),
        width: z.number(),
      }),
      offset: z.object({
        left: z.number(),
        top: z.number(),
      }),
      positionType: z.string(),
      showAddressBar: z.boolean(),
      showMenuBar: z.boolean(),
      showScrollBar: z.boolean(),
      showStatusBar: z.boolean(),
      showToolBar: z.boolean(),
      title: z.string(),
    }),
    targetType: z.string(),
    videoReportingId: z.string(),
  })).optional(),
  creativeAssets: z.array(z.object({
    actionScript3: z.boolean(),
    active: z.boolean(),
    additionalSizes: z.array(z.object({
      height: z.number(),
      iab: z.boolean(),
      id: z.string(),
      kind: z.string(),
      width: z.number(),
    })),
    alignment: z.string(),
    artworkType: z.string(),
    assetIdentifier: z.object({
      name: z.string(),
      type: z.string(),
    }),
    audioBitRate: z.number(),
    audioSampleRate: z.number(),
    backupImageExit: z.object({
      advertiserCustomEventId: z.string(),
      advertiserCustomEventName: z.string(),
      advertiserCustomEventType: z.string(),
      artworkLabel: z.string(),
      artworkType: z.string(),
      exitClickThroughUrl: z.object({
        computedClickThroughUrl: z.string(),
        customClickThroughUrl: z.string(),
        landingPageId: z.string(),
      }),
      id: z.string(),
      popupWindowProperties: z.object({
        dimension: z.object({
          height: z.unknown(),
          iab: z.unknown(),
          id: z.unknown(),
          kind: z.unknown(),
          width: z.unknown(),
        }),
        offset: z.object({
          left: z.unknown(),
          top: z.unknown(),
        }),
        positionType: z.string(),
        showAddressBar: z.boolean(),
        showMenuBar: z.boolean(),
        showScrollBar: z.boolean(),
        showStatusBar: z.boolean(),
        showToolBar: z.boolean(),
        title: z.string(),
      }),
      targetType: z.string(),
      videoReportingId: z.string(),
    }),
    bitRate: z.number(),
    childAssetType: z.string(),
    collapsedSize: z.object({
      height: z.number(),
      iab: z.boolean(),
      id: z.string(),
      kind: z.string(),
      width: z.number(),
    }),
    companionCreativeIds: z.array(z.string()),
    customStartTimeValue: z.number(),
    detectedFeatures: z.array(z.string()),
    displayType: z.string(),
    duration: z.number(),
    durationType: z.string(),
    expandedDimension: z.object({
      height: z.number(),
      iab: z.boolean(),
      id: z.string(),
      kind: z.string(),
      width: z.number(),
    }),
    fileSize: z.string(),
    flashVersion: z.number(),
    frameRate: z.number(),
    hideFlashObjects: z.boolean(),
    hideSelectionBoxes: z.boolean(),
    horizontallyLocked: z.boolean(),
    id: z.string(),
    idDimensionValue: z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    }),
    mediaDuration: z.number(),
    mimeType: z.string(),
    offset: z.object({
      left: z.number(),
      top: z.number(),
    }),
    orientation: z.string(),
    originalBackup: z.boolean(),
    politeLoad: z.boolean(),
    position: z.object({
      left: z.number(),
      top: z.number(),
    }),
    positionLeftUnit: z.string(),
    positionTopUnit: z.string(),
    progressiveServingUrl: z.string(),
    pushdown: z.boolean(),
    pushdownDuration: z.number(),
    role: z.string(),
    size: z.object({
      height: z.number(),
      iab: z.boolean(),
      id: z.string(),
      kind: z.string(),
      width: z.number(),
    }),
    sslCompliant: z.boolean(),
    startTimeType: z.string(),
    streamingServingUrl: z.string(),
    transparency: z.boolean(),
    verticallyLocked: z.boolean(),
    windowMode: z.string(),
    zIndex: z.number(),
    zipFilename: z.string(),
    zipFilesize: z.string(),
  })).optional(),
  creativeFieldAssignments: z.array(z.object({
    creativeFieldId: z.string(),
    creativeFieldValueId: z.string(),
  })).optional(),
  customKeyValues: z.array(z.string()).optional(),
  exitCustomEvents: z.array(z.object({
    advertiserCustomEventId: z.string(),
    advertiserCustomEventName: z.string(),
    advertiserCustomEventType: z.string(),
    artworkLabel: z.string(),
    artworkType: z.string(),
    exitClickThroughUrl: z.object({
      computedClickThroughUrl: z.string(),
      customClickThroughUrl: z.string(),
      landingPageId: z.string(),
    }),
    id: z.string(),
    popupWindowProperties: z.object({
      dimension: z.object({
        height: z.number(),
        iab: z.boolean(),
        id: z.string(),
        kind: z.string(),
        width: z.number(),
      }),
      offset: z.object({
        left: z.number(),
        top: z.number(),
      }),
      positionType: z.string(),
      showAddressBar: z.boolean(),
      showMenuBar: z.boolean(),
      showScrollBar: z.boolean(),
      showStatusBar: z.boolean(),
      showToolBar: z.boolean(),
      title: z.string(),
    }),
    targetType: z.string(),
    videoReportingId: z.string(),
  })).optional(),
  fsCommand: z.object({
    left: z.number(),
    positionOption: z.string(),
    top: z.number(),
    windowHeight: z.number(),
    windowWidth: z.number(),
  }).optional(),
  htmlCode: z.string().optional(),
  htmlCodeLocked: z.boolean().optional(),
  id: z.string(),
  idDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  kind: z.string().optional(),
  lastModifiedInfo: z.object({
    time: z.string(),
  }).optional(),
  latestTraffickedCreativeId: z.string().optional(),
  mediaDescription: z.string().optional(),
  mediaDuration: z.number().optional(),
  name: z.string().optional(),
  obaIcon: z.object({
    iconClickThroughUrl: z.string(),
    iconClickTrackingUrl: z.string(),
    iconViewTrackingUrl: z.string(),
    program: z.string(),
    resourceUrl: z.string(),
    size: z.object({
      height: z.number(),
      iab: z.boolean(),
      id: z.string(),
      kind: z.string(),
      width: z.number(),
    }),
    xPosition: z.string(),
    yPosition: z.string(),
  }).optional(),
  overrideCss: z.string().optional(),
  progressOffset: z.object({
    offsetPercentage: z.number(),
    offsetSeconds: z.number(),
  }).optional(),
  redirectUrl: z.string().optional(),
  renderingId: z.string().optional(),
  renderingIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  requiredFlashPluginVersion: z.string().optional(),
  requiredFlashVersion: z.number().optional(),
  size: z.object({
    height: z.number(),
    iab: z.boolean(),
    id: z.string(),
    kind: z.string(),
    width: z.number(),
  }).optional(),
  skipOffset: z.object({
    offsetPercentage: z.number(),
    offsetSeconds: z.number(),
  }).optional(),
  skippable: z.boolean().optional(),
  sslCompliant: z.boolean().optional(),
  sslOverride: z.boolean().optional(),
  studioAdvertiserId: z.string().optional(),
  studioCreativeId: z.string().optional(),
  studioTraffickedCreativeId: z.string().optional(),
  subaccountId: z.string().optional(),
  thirdPartyBackupImageImpressionsUrl: z.string().optional(),
  thirdPartyRichMediaImpressionsUrl: z.string().optional(),
  thirdPartyUrls: z.array(z.object({
    thirdPartyUrlType: z.string(),
    url: z.string(),
  })).optional(),
  timerCustomEvents: z.array(z.object({
    advertiserCustomEventId: z.string(),
    advertiserCustomEventName: z.string(),
    advertiserCustomEventType: z.string(),
    artworkLabel: z.string(),
    artworkType: z.string(),
    exitClickThroughUrl: z.object({
      computedClickThroughUrl: z.string(),
      customClickThroughUrl: z.string(),
      landingPageId: z.string(),
    }),
    id: z.string(),
    popupWindowProperties: z.object({
      dimension: z.object({
        height: z.number(),
        iab: z.boolean(),
        id: z.string(),
        kind: z.string(),
        width: z.number(),
      }),
      offset: z.object({
        left: z.number(),
        top: z.number(),
      }),
      positionType: z.string(),
      showAddressBar: z.boolean(),
      showMenuBar: z.boolean(),
      showScrollBar: z.boolean(),
      showStatusBar: z.boolean(),
      showToolBar: z.boolean(),
      title: z.string(),
    }),
    targetType: z.string(),
    videoReportingId: z.string(),
  })).optional(),
  totalFileSize: z.string().optional(),
  type: z.string().optional(),
  universalAdId: z.object({
    registry: z.string(),
    value: z.string(),
  }).optional(),
  version: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this creative. This field, if left unset, will be auto-generated for both insert and update operations. Applicable to all creative types.",
  ).optional(),
  active: z.boolean().describe(
    "Whether the creative is active. Applicable to all creative types.",
  ).optional(),
  adParameters: z.string().describe(
    "Ad parameters user for VPAID creative. This is a read-only field. Applicable to the following creative types: all VPAID.",
  ).optional(),
  adTagKeys: z.array(z.string()).describe(
    "Keywords for a Rich Media creative. Keywords let you customize the creative settings of a Rich Media ad running on your site without having to contact the advertiser. You can use keywords to dynamically change the look or functionality of a creative. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  additionalSizes: z.array(z.object({
    height: z.number().int().describe(
      "Height of this size. Acceptable values are 0 to 32767, inclusive.",
    ).optional(),
    iab: z.boolean().describe(
      "IAB standard size. This is a read-only, auto-generated field.",
    ).optional(),
    id: z.string().describe(
      "ID of this size. This is a read-only, auto-generated field.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
    ).optional(),
    width: z.number().int().describe(
      "Width of this size. Acceptable values are 0 to 32767, inclusive.",
    ).optional(),
  })).describe(
    "Additional sizes associated with a responsive creative. When inserting or updating a creative either the size ID field or size width and height fields can be used. Applicable to DISPLAY creatives when the primary asset type is HTML_IMAGE.",
  ).optional(),
  advertiserId: z.string().describe(
    "Required. Advertiser ID of this creative. This is a required field. Applicable to all creative types.",
  ).optional(),
  allowScriptAccess: z.boolean().describe(
    "Whether script access is allowed for this creative. This is a read-only and deprecated field which will automatically be set to true on update. Applicable to the following creative types: FLASH_INPAGE.",
  ).optional(),
  archived: z.boolean().describe(
    "Whether the creative is archived. Applicable to all creative types.",
  ).optional(),
  artworkType: z.enum([
    "ARTWORK_TYPE_FLASH",
    "ARTWORK_TYPE_HTML5",
    "ARTWORK_TYPE_MIXED",
    "ARTWORK_TYPE_IMAGE",
  ]).describe(
    "Type of artwork used for the creative. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  authoringSource: z.enum([
    "CREATIVE_AUTHORING_SOURCE_DCM",
    "CREATIVE_AUTHORING_SOURCE_DBM",
    "CREATIVE_AUTHORING_SOURCE_STUDIO",
    "CREATIVE_AUTHORING_SOURCE_GWD",
    "CREATIVE_AUTHORING_SOURCE_ACS",
    "CREATIVE_AUTHORING_SOURCE_ADOBE",
    "CREATIVE_AUTHORING_SOURCE_TYPEFACE_AI",
    "CREATIVE_AUTHORING_SOURCE_REMBRAND",
    "CREATIVE_AUTHORING_SOURCE_TRACKTO_STUDIO",
    "CREATIVE_AUTHORING_SOURCE_BORNLOGIC",
    "CREATIVE_AUTHORING_SOURCE_BEGEN_AI",
  ]).describe(
    "Source application where creative was authored. Presently, only DBM authored creatives will have this field set. Applicable to all creative types.",
  ).optional(),
  authoringTool: z.enum(["NINJA", "SWIFFY"]).describe(
    "Authoring tool for HTML5 banner creatives. This is a read-only field. Applicable to the following creative types: HTML5_BANNER.",
  ).optional(),
  autoAdvanceImages: z.boolean().describe(
    "Whether images are automatically advanced for image gallery creatives. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY.",
  ).optional(),
  backgroundColor: z.string().describe(
    "The 6-character HTML color code, beginning with #, for the background of the window area where the Flash file is displayed. Default is white. Applicable to the following creative types: FLASH_INPAGE.",
  ).optional(),
  backupImageClickThroughUrl: z.object({
    computedClickThroughUrl: z.string().describe(
      "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
    ).optional(),
    customClickThroughUrl: z.string().describe(
      "Custom click-through URL. Applicable if the landingPageId field is left unset.",
    ).optional(),
    landingPageId: z.string().describe(
      "ID of the landing page for the click-through URL.",
    ).optional(),
  }).describe("Click-through URL").optional(),
  backupImageFeatures: z.array(
    z.enum([
      "CSS_FONT_FACE",
      "CSS_BACKGROUND_SIZE",
      "CSS_BORDER_IMAGE",
      "CSS_BORDER_RADIUS",
      "CSS_BOX_SHADOW",
      "CSS_FLEX_BOX",
      "CSS_HSLA",
      "CSS_MULTIPLE_BGS",
      "CSS_OPACITY",
      "CSS_RGBA",
      "CSS_TEXT_SHADOW",
      "CSS_ANIMATIONS",
      "CSS_COLUMNS",
      "CSS_GENERATED_CONTENT",
      "CSS_GRADIENTS",
      "CSS_REFLECTIONS",
      "CSS_TRANSFORMS",
      "CSS_TRANSFORMS3D",
      "CSS_TRANSITIONS",
      "APPLICATION_CACHE",
      "CANVAS",
      "CANVAS_TEXT",
      "DRAG_AND_DROP",
      "HASH_CHANGE",
      "HISTORY",
      "AUDIO",
      "VIDEO",
      "INDEXED_DB",
      "INPUT_ATTR_AUTOCOMPLETE",
      "INPUT_ATTR_AUTOFOCUS",
      "INPUT_ATTR_LIST",
      "INPUT_ATTR_PLACEHOLDER",
      "INPUT_ATTR_MAX",
      "INPUT_ATTR_MIN",
      "INPUT_ATTR_MULTIPLE",
      "INPUT_ATTR_PATTERN",
      "INPUT_ATTR_REQUIRED",
      "INPUT_ATTR_STEP",
      "INPUT_TYPE_SEARCH",
      "INPUT_TYPE_TEL",
      "INPUT_TYPE_URL",
      "INPUT_TYPE_EMAIL",
      "INPUT_TYPE_DATETIME",
      "INPUT_TYPE_DATE",
      "INPUT_TYPE_MONTH",
      "INPUT_TYPE_WEEK",
      "INPUT_TYPE_TIME",
      "INPUT_TYPE_DATETIME_LOCAL",
      "INPUT_TYPE_NUMBER",
      "INPUT_TYPE_RANGE",
      "INPUT_TYPE_COLOR",
      "LOCAL_STORAGE",
      "POST_MESSAGE",
      "SESSION_STORAGE",
      "WEB_SOCKETS",
      "WEB_SQL_DATABASE",
      "WEB_WORKERS",
      "GEO_LOCATION",
      "INLINE_SVG",
      "SMIL",
      "SVG_HREF",
      "SVG_CLIP_PATHS",
      "TOUCH",
      "WEBGL",
      "SVG_FILTERS",
      "SVG_FE_IMAGE",
    ]),
  ).describe(
    "List of feature dependencies that will cause a backup image to be served if the browser that serves the ad does not support them. Feature dependencies are features that a browser must be able to support in order to render your HTML5 creative asset correctly. This field is initially auto-generated to contain all features detected by Campaign Manager for all the assets of this creative and can then be modified by the client. To reset this field, copy over all the creativeAssets' detected features. Applicable to the following creative types: HTML5_BANNER. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  backupImageReportingLabel: z.string().describe(
    "Reporting label used for HTML5 banner backup image. Applicable to the following creative types: DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  backupImageTargetWindow: z.object({
    customHtml: z.string().describe("User-entered value.").optional(),
    targetWindowOption: z.enum(["NEW_WINDOW", "CURRENT_WINDOW", "CUSTOM"])
      .describe(
        "Type of browser window for which the backup image of the flash creative can be displayed.",
      ).optional(),
  }).describe("Target Window.").optional(),
  clickTags: z.array(z.object({
    clickThroughUrl: z.object({
      computedClickThroughUrl: z.string().describe(
        "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
      ).optional(),
      customClickThroughUrl: z.string().describe(
        "Custom click-through URL. Applicable if the landingPageId field is left unset.",
      ).optional(),
      landingPageId: z.string().describe(
        "ID of the landing page for the click-through URL.",
      ).optional(),
    }).describe("Click-through URL").optional(),
    eventName: z.string().describe(
      "Advertiser event name associated with the click tag. This field is used by DISPLAY_IMAGE_GALLERY and HTML5_BANNER creatives. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
    ).optional(),
    name: z.string().describe(
      "Parameter name for the specified click tag. For DISPLAY_IMAGE_GALLERY creative assets, this field must match the value of the creative asset's creativeAssetId.name field.",
    ).optional(),
  })).describe(
    "Click tags of the creative. For DISPLAY, FLASH_INPAGE, and HTML5_BANNER creatives, this is a subset of detected click tags for the assets associated with this creative. After creating a flash asset, detected click tags will be returned in the creativeAssetMetadata. When inserting the creative, populate the creative clickTags field using the creativeAssetMetadata.clickTags field. For DISPLAY_IMAGE_GALLERY creatives, there should be exactly one entry in this list for each image creative asset. A click tag is matched with a corresponding creative asset by matching the clickTag.name field with the creativeAsset.assetIdentifier.name field. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, FLASH_INPAGE, HTML5_BANNER. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  commercialId: z.string().describe(
    "Industry standard ID assigned to creative for reach and frequency. Applicable to INSTREAM_VIDEO_REDIRECT creatives.",
  ).optional(),
  companionCreatives: z.array(z.string()).describe(
    "List of companion creatives assigned to an in-Stream video creative. Acceptable values include IDs of existing flash and image creatives. Applicable to the following creative types: all VPAID, all INSTREAM_AUDIO and all INSTREAM_VIDEO with dynamicAssetSelection set to false.",
  ).optional(),
  compatibility: z.array(
    z.enum([
      "DISPLAY",
      "DISPLAY_INTERSTITIAL",
      "APP",
      "APP_INTERSTITIAL",
      "IN_STREAM_VIDEO",
      "IN_STREAM_AUDIO",
    ]),
  ).describe(
    'Compatibilities associated with this creative. This is a read-only field. DISPLAY and DISPLAY_INTERSTITIAL refer to rendering either on desktop or on mobile devices or in mobile apps for regular or interstitial ads, respectively. APP and APP_INTERSTITIAL are for rendering in mobile apps. Only pre-existing creatives may have these compatibilities since new creatives will either be assigned DISPLAY or DISPLAY_INTERSTITIAL instead. IN_STREAM_VIDEO refers to rendering in in-stream video ads developed with the VAST standard. IN_STREAM_AUDIO refers to rendering in in-stream audio ads developed with the VAST standard. Applicable to all creative types. Acceptable values are: - "APP" - "APP_INTERSTITIAL" - "IN_STREAM_VIDEO" - "IN_STREAM_AUDIO" - "DISPLAY" - "DISPLAY_INTERSTITIAL"',
  ).optional(),
  convertFlashToHtml5: z.boolean().describe(
    "Whether Flash assets associated with the creative need to be automatically converted to HTML5. This flag is enabled by default and users can choose to disable it if they don't want the system to generate and use HTML5 asset for this creative. Applicable to the following creative type: FLASH_INPAGE. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  counterCustomEvents: z.array(z.object({
    advertiserCustomEventId: z.string().describe(
      "Unique ID of this event used by Reporting and Data Transfer. This is a read-only field.",
    ).optional(),
    advertiserCustomEventName: z.string().describe(
      "User-entered name for the event.",
    ).optional(),
    advertiserCustomEventType: z.enum([
      "ADVERTISER_EVENT_TIMER",
      "ADVERTISER_EVENT_EXIT",
      "ADVERTISER_EVENT_COUNTER",
    ]).describe("Type of the event. This is a read-only field.").optional(),
    artworkLabel: z.string().describe(
      "Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion.",
    ).optional(),
    artworkType: z.enum([
      "ARTWORK_TYPE_FLASH",
      "ARTWORK_TYPE_HTML5",
      "ARTWORK_TYPE_MIXED",
      "ARTWORK_TYPE_IMAGE",
    ]).describe("Artwork type used by the creative.This is a read-only field.")
      .optional(),
    exitClickThroughUrl: z.object({
      computedClickThroughUrl: z.string().describe(
        "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
      ).optional(),
      customClickThroughUrl: z.string().describe(
        "Custom click-through URL. Applicable if the landingPageId field is left unset.",
      ).optional(),
      landingPageId: z.string().describe(
        "ID of the landing page for the click-through URL.",
      ).optional(),
    }).describe("Click-through URL").optional(),
    id: z.string().describe(
      "ID of this event. This is a required field and should not be modified after insertion.",
    ).optional(),
    popupWindowProperties: z.object({
      dimension: z.object({
        height: z.number().int().describe(
          "Height of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
        iab: z.boolean().describe(
          "IAB standard size. This is a read-only, auto-generated field.",
        ).optional(),
        id: z.string().describe(
          "ID of this size. This is a read-only, auto-generated field.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
        ).optional(),
        width: z.number().int().describe(
          "Width of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
      }).describe(
        "Represents the dimensions of ads, placements, creatives, or creative assets.",
      ).optional(),
      offset: z.object({
        left: z.number().int().describe(
          "Offset distance from left side of an asset or a window.",
        ).optional(),
        top: z.number().int().describe(
          "Offset distance from top side of an asset or a window.",
        ).optional(),
      }).describe("Offset Position.").optional(),
      positionType: z.enum(["CENTER", "COORDINATES"]).describe(
        "Popup window position either centered or at specific coordinate.",
      ).optional(),
      showAddressBar: z.boolean().describe(
        "Whether to display the browser address bar.",
      ).optional(),
      showMenuBar: z.boolean().describe(
        "Whether to display the browser menu bar.",
      ).optional(),
      showScrollBar: z.boolean().describe(
        "Whether to display the browser scroll bar.",
      ).optional(),
      showStatusBar: z.boolean().describe(
        "Whether to display the browser status bar.",
      ).optional(),
      showToolBar: z.boolean().describe(
        "Whether to display the browser tool bar.",
      ).optional(),
      title: z.string().describe("Title of popup window.").optional(),
    }).describe("Popup Window Properties.").optional(),
    targetType: z.enum([
      "TARGET_BLANK",
      "TARGET_TOP",
      "TARGET_SELF",
      "TARGET_PARENT",
      "TARGET_POPUP",
    ]).describe("Target type used by the event.").optional(),
    videoReportingId: z.string().describe(
      "Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field.",
    ).optional(),
  })).describe(
    "List of counter events configured for the creative. For DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated from clickTags. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID.",
  ).optional(),
  creativeAssets: z.array(z.object({
    actionScript3: z.boolean().describe(
      "Whether ActionScript3 is enabled for the flash asset. This is a read-only field. Applicable to the following creative type: FLASH_INPAGE. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
    ).optional(),
    active: z.boolean().describe(
      "Whether the video or audio asset is active. This is a read-only field for VPAID_NON_LINEAR_VIDEO assets. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    additionalSizes: z.array(z.object({
      height: z.number().int().describe(
        "Height of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
      iab: z.boolean().describe(
        "IAB standard size. This is a read-only, auto-generated field.",
      ).optional(),
      id: z.string().describe(
        "ID of this size. This is a read-only, auto-generated field.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
      ).optional(),
      width: z.number().int().describe(
        "Width of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
    })).describe(
      "Additional sizes associated with this creative asset. HTML5 asset generated by compatible software such as GWD will be able to support more sizes this creative asset can render.",
    ).optional(),
    alignment: z.enum([
      "ALIGNMENT_TOP",
      "ALIGNMENT_RIGHT",
      "ALIGNMENT_BOTTOM",
      "ALIGNMENT_LEFT",
    ]).describe(
      "Possible alignments for an asset. This is a read-only field. Applicable to the following creative types: RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL.",
    ).optional(),
    artworkType: z.enum([
      "ARTWORK_TYPE_FLASH",
      "ARTWORK_TYPE_HTML5",
      "ARTWORK_TYPE_MIXED",
      "ARTWORK_TYPE_IMAGE",
    ]).describe(
      "Artwork type of rich media creative. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    assetIdentifier: z.object({
      name: z.string().describe(
        'Name of the creative asset. This is a required field while inserting an asset. After insertion, this assetIdentifier is used to identify the uploaded asset. Characters in the name must be alphanumeric or one of the following: ".-_ ". Spaces are allowed.',
      ).optional(),
      type: z.enum(["IMAGE", "FLASH", "VIDEO", "HTML", "HTML_IMAGE", "AUDIO"])
        .describe(
          "Type of asset to upload. This is a required field. FLASH and IMAGE are no longer supported for new uploads. All image assets should use HTML_IMAGE.",
        ).optional(),
    }).describe("Creative Asset ID.").optional(),
    audioBitRate: z.number().int().describe(
      "Audio stream bit rate in kbps. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    audioSampleRate: z.number().int().describe(
      "Audio sample bit rate in hertz. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    backupImageExit: z.object({
      advertiserCustomEventId: z.string().describe(
        "Unique ID of this event used by Reporting and Data Transfer. This is a read-only field.",
      ).optional(),
      advertiserCustomEventName: z.string().describe(
        "User-entered name for the event.",
      ).optional(),
      advertiserCustomEventType: z.enum([
        "ADVERTISER_EVENT_TIMER",
        "ADVERTISER_EVENT_EXIT",
        "ADVERTISER_EVENT_COUNTER",
      ]).describe("Type of the event. This is a read-only field.").optional(),
      artworkLabel: z.string().describe(
        "Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion.",
      ).optional(),
      artworkType: z.enum([
        "ARTWORK_TYPE_FLASH",
        "ARTWORK_TYPE_HTML5",
        "ARTWORK_TYPE_MIXED",
        "ARTWORK_TYPE_IMAGE",
      ]).describe(
        "Artwork type used by the creative.This is a read-only field.",
      ).optional(),
      exitClickThroughUrl: z.object({
        computedClickThroughUrl: z.string().describe(
          "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
        ).optional(),
        customClickThroughUrl: z.string().describe(
          "Custom click-through URL. Applicable if the landingPageId field is left unset.",
        ).optional(),
        landingPageId: z.string().describe(
          "ID of the landing page for the click-through URL.",
        ).optional(),
      }).describe("Click-through URL").optional(),
      id: z.string().describe(
        "ID of this event. This is a required field and should not be modified after insertion.",
      ).optional(),
      popupWindowProperties: z.object({
        dimension: z.object({
          height: z.unknown().describe(
            "Height of this size. Acceptable values are 0 to 32767, inclusive.",
          ).optional(),
          iab: z.unknown().describe(
            "IAB standard size. This is a read-only, auto-generated field.",
          ).optional(),
          id: z.unknown().describe(
            "ID of this size. This is a read-only, auto-generated field.",
          ).optional(),
          kind: z.unknown().describe(
            'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
          ).optional(),
          width: z.unknown().describe(
            "Width of this size. Acceptable values are 0 to 32767, inclusive.",
          ).optional(),
        }).describe(
          "Represents the dimensions of ads, placements, creatives, or creative assets.",
        ).optional(),
        offset: z.object({
          left: z.unknown().describe(
            "Offset distance from left side of an asset or a window.",
          ).optional(),
          top: z.unknown().describe(
            "Offset distance from top side of an asset or a window.",
          ).optional(),
        }).describe("Offset Position.").optional(),
        positionType: z.enum(["CENTER", "COORDINATES"]).describe(
          "Popup window position either centered or at specific coordinate.",
        ).optional(),
        showAddressBar: z.boolean().describe(
          "Whether to display the browser address bar.",
        ).optional(),
        showMenuBar: z.boolean().describe(
          "Whether to display the browser menu bar.",
        ).optional(),
        showScrollBar: z.boolean().describe(
          "Whether to display the browser scroll bar.",
        ).optional(),
        showStatusBar: z.boolean().describe(
          "Whether to display the browser status bar.",
        ).optional(),
        showToolBar: z.boolean().describe(
          "Whether to display the browser tool bar.",
        ).optional(),
        title: z.string().describe("Title of popup window.").optional(),
      }).describe("Popup Window Properties.").optional(),
      targetType: z.enum([
        "TARGET_BLANK",
        "TARGET_TOP",
        "TARGET_SELF",
        "TARGET_PARENT",
        "TARGET_POPUP",
      ]).describe("Target type used by the event.").optional(),
      videoReportingId: z.string().describe(
        "Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field.",
      ).optional(),
    }).describe("Creative Custom Event.").optional(),
    bitRate: z.number().int().describe(
      "Detected bit-rate for audio or video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    childAssetType: z.enum([
      "CHILD_ASSET_TYPE_FLASH",
      "CHILD_ASSET_TYPE_VIDEO",
      "CHILD_ASSET_TYPE_IMAGE",
      "CHILD_ASSET_TYPE_DATA",
    ]).describe(
      "Rich media child asset type. This is a read-only field. Applicable to the following creative types: all VPAID.",
    ).optional(),
    collapsedSize: z.object({
      height: z.number().int().describe(
        "Height of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
      iab: z.boolean().describe(
        "IAB standard size. This is a read-only, auto-generated field.",
      ).optional(),
      id: z.string().describe(
        "ID of this size. This is a read-only, auto-generated field.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
      ).optional(),
      width: z.number().int().describe(
        "Width of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
    }).describe(
      "Represents the dimensions of ads, placements, creatives, or creative assets.",
    ).optional(),
    companionCreativeIds: z.array(z.string()).describe(
      "List of companion creatives assigned to an in-stream video creative asset. Acceptable values include IDs of existing flash and image creatives. Applicable to INSTREAM_VIDEO creative type with dynamicAssetSelection set to true.",
    ).optional(),
    customStartTimeValue: z.number().int().describe(
      "Custom start time in seconds for making the asset visible. Applicable to the following creative types: all RICH_MEDIA. Value must be greater than or equal to 0.",
    ).optional(),
    detectedFeatures: z.array(
      z.enum([
        "CSS_FONT_FACE",
        "CSS_BACKGROUND_SIZE",
        "CSS_BORDER_IMAGE",
        "CSS_BORDER_RADIUS",
        "CSS_BOX_SHADOW",
        "CSS_FLEX_BOX",
        "CSS_HSLA",
        "CSS_MULTIPLE_BGS",
        "CSS_OPACITY",
        "CSS_RGBA",
        "CSS_TEXT_SHADOW",
        "CSS_ANIMATIONS",
        "CSS_COLUMNS",
        "CSS_GENERATED_CONTENT",
        "CSS_GRADIENTS",
        "CSS_REFLECTIONS",
        "CSS_TRANSFORMS",
        "CSS_TRANSFORMS3D",
        "CSS_TRANSITIONS",
        "APPLICATION_CACHE",
        "CANVAS",
        "CANVAS_TEXT",
        "DRAG_AND_DROP",
        "HASH_CHANGE",
        "HISTORY",
        "AUDIO",
        "VIDEO",
        "INDEXED_DB",
        "INPUT_ATTR_AUTOCOMPLETE",
        "INPUT_ATTR_AUTOFOCUS",
        "INPUT_ATTR_LIST",
        "INPUT_ATTR_PLACEHOLDER",
        "INPUT_ATTR_MAX",
        "INPUT_ATTR_MIN",
        "INPUT_ATTR_MULTIPLE",
        "INPUT_ATTR_PATTERN",
        "INPUT_ATTR_REQUIRED",
        "INPUT_ATTR_STEP",
        "INPUT_TYPE_SEARCH",
        "INPUT_TYPE_TEL",
        "INPUT_TYPE_URL",
        "INPUT_TYPE_EMAIL",
        "INPUT_TYPE_DATETIME",
        "INPUT_TYPE_DATE",
        "INPUT_TYPE_MONTH",
        "INPUT_TYPE_WEEK",
        "INPUT_TYPE_TIME",
        "INPUT_TYPE_DATETIME_LOCAL",
        "INPUT_TYPE_NUMBER",
        "INPUT_TYPE_RANGE",
        "INPUT_TYPE_COLOR",
        "LOCAL_STORAGE",
        "POST_MESSAGE",
        "SESSION_STORAGE",
        "WEB_SOCKETS",
        "WEB_SQL_DATABASE",
        "WEB_WORKERS",
        "GEO_LOCATION",
        "INLINE_SVG",
        "SMIL",
        "SVG_HREF",
        "SVG_CLIP_PATHS",
        "TOUCH",
        "WEBGL",
        "SVG_FILTERS",
        "SVG_FE_IMAGE",
      ]),
    ).describe(
      "List of feature dependencies for the creative asset that are detected by Campaign Manager. Feature dependencies are features that a browser must be able to support in order to render your HTML5 creative correctly. This is a read-only, auto-generated field. Applicable to the following creative types: HTML5_BANNER. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
    ).optional(),
    displayType: z.enum([
      "ASSET_DISPLAY_TYPE_INPAGE",
      "ASSET_DISPLAY_TYPE_FLOATING",
      "ASSET_DISPLAY_TYPE_OVERLAY",
      "ASSET_DISPLAY_TYPE_EXPANDING",
      "ASSET_DISPLAY_TYPE_FLASH_IN_FLASH",
      "ASSET_DISPLAY_TYPE_FLASH_IN_FLASH_EXPANDING",
      "ASSET_DISPLAY_TYPE_PEEL_DOWN",
      "ASSET_DISPLAY_TYPE_VPAID_LINEAR",
      "ASSET_DISPLAY_TYPE_VPAID_NON_LINEAR",
      "ASSET_DISPLAY_TYPE_BACKDROP",
    ]).describe(
      "Type of rich media asset. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    duration: z.number().int().describe(
      "Duration in seconds for which an asset will be displayed. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and VPAID_LINEAR_VIDEO. Value must be greater than or equal to 1.",
    ).optional(),
    durationType: z.enum([
      "ASSET_DURATION_TYPE_AUTO",
      "ASSET_DURATION_TYPE_NONE",
      "ASSET_DURATION_TYPE_CUSTOM",
    ]).describe(
      "Duration type for which an asset will be displayed. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    expandedDimension: z.object({
      height: z.number().int().describe(
        "Height of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
      iab: z.boolean().describe(
        "IAB standard size. This is a read-only, auto-generated field.",
      ).optional(),
      id: z.string().describe(
        "ID of this size. This is a read-only, auto-generated field.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
      ).optional(),
      width: z.number().int().describe(
        "Width of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
    }).describe(
      "Represents the dimensions of ads, placements, creatives, or creative assets.",
    ).optional(),
    fileSize: z.string().describe(
      "File size associated with this creative asset. This is a read-only field. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT.",
    ).optional(),
    flashVersion: z.number().int().describe(
      "Flash version of the asset. This is a read-only field. Applicable to the following creative types: FLASH_INPAGE, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
    ).optional(),
    frameRate: z.number().describe(
      "Video frame rate for video asset in frames per second. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    hideFlashObjects: z.boolean().describe(
      "Whether to hide Flash objects flag for an asset. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    hideSelectionBoxes: z.boolean().describe(
      "Whether to hide selection boxes flag for an asset. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    horizontallyLocked: z.boolean().describe(
      "Whether the asset is horizontally locked. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    id: z.string().describe(
      "Numeric ID of this creative asset. This is a required field and should not be modified. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT.",
    ).optional(),
    idDimensionValue: z.object({
      dimensionName: z.string().describe("The name of the dimension.")
        .optional(),
      etag: z.string().describe(
        "The eTag of this response for caching purposes.",
      ).optional(),
      id: z.string().describe("The ID associated with the value if available.")
        .optional(),
      kind: z.string().describe(
        "The kind of resource this is, in this case dfareporting#dimensionValue.",
      ).optional(),
      matchType: z.enum([
        "EXACT",
        "BEGINS_WITH",
        "CONTAINS",
        "WILDCARD_EXPRESSION",
      ]).describe(
        "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
      ).optional(),
      value: z.string().describe("The value of the dimension.").optional(),
    }).describe("Represents a DimensionValue resource.").optional(),
    mediaDuration: z.number().describe(
      "Detected duration for audio or video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    mimeType: z.string().describe(
      "Detected MIME type for audio or video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    offset: z.object({
      left: z.number().int().describe(
        "Offset distance from left side of an asset or a window.",
      ).optional(),
      top: z.number().int().describe(
        "Offset distance from top side of an asset or a window.",
      ).optional(),
    }).describe("Offset Position.").optional(),
    orientation: z.enum(["LANDSCAPE", "PORTRAIT", "SQUARE"]).describe(
      "Orientation of video asset. This is a read-only, auto-generated field.",
    ).optional(),
    originalBackup: z.boolean().describe(
      "Whether the backup asset is original or changed by the user in Campaign Manager. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    politeLoad: z.boolean().describe(
      "Whether this asset is used as a polite load asset.",
    ).optional(),
    position: z.object({
      left: z.number().int().describe(
        "Offset distance from left side of an asset or a window.",
      ).optional(),
      top: z.number().int().describe(
        "Offset distance from top side of an asset or a window.",
      ).optional(),
    }).describe("Offset Position.").optional(),
    positionLeftUnit: z.enum([
      "OFFSET_UNIT_PIXEL",
      "OFFSET_UNIT_PERCENT",
      "OFFSET_UNIT_PIXEL_FROM_CENTER",
    ]).describe(
      "Offset left unit for an asset. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    positionTopUnit: z.enum([
      "OFFSET_UNIT_PIXEL",
      "OFFSET_UNIT_PERCENT",
      "OFFSET_UNIT_PIXEL_FROM_CENTER",
    ]).describe(
      "Offset top unit for an asset. This is a read-only field if the asset displayType is ASSET_DISPLAY_TYPE_OVERLAY. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    progressiveServingUrl: z.string().describe(
      "Progressive URL for video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    pushdown: z.boolean().describe(
      "Whether the asset pushes down other content. Applicable to the following creative types: all RICH_MEDIA. Additionally, only applicable when the asset offsets are 0, the collapsedSize.width matches size.width, and the collapsedSize.height is less than size.height.",
    ).optional(),
    pushdownDuration: z.number().describe(
      "Pushdown duration in seconds for an asset. Applicable to the following creative types: all RICH_MEDIA.Additionally, only applicable when the asset pushdown field is true, the offsets are 0, the collapsedSize.width matches size.width, and the collapsedSize.height is less than size.height. Acceptable values are 0 to 9.99, inclusive.",
    ).optional(),
    role: z.enum([
      "PRIMARY",
      "BACKUP_IMAGE",
      "ADDITIONAL_IMAGE",
      "ADDITIONAL_FLASH",
      "PARENT_VIDEO",
      "TRANSCODED_VIDEO",
      "OTHER",
      "ALTERNATE_VIDEO",
      "PARENT_AUDIO",
      "TRANSCODED_AUDIO",
    ]).describe(
      "Role of the asset in relation to creative. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT. This is a required field. PRIMARY applies to DISPLAY, FLASH_INPAGE, HTML5_BANNER, IMAGE, DISPLAY_IMAGE_GALLERY, all RICH_MEDIA (which may contain multiple primary assets), and all VPAID creatives. BACKUP_IMAGE applies to FLASH_INPAGE, HTML5_BANNER, all RICH_MEDIA, and all VPAID creatives. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE. ADDITIONAL_IMAGE and ADDITIONAL_FLASH apply to FLASH_INPAGE creatives. OTHER refers to assets from sources other than Campaign Manager, such as Studio uploaded assets, applicable to all RICH_MEDIA and all VPAID creatives. PARENT_VIDEO refers to videos uploaded by the user in Campaign Manager and is applicable to INSTREAM_VIDEO and VPAID_LINEAR_VIDEO creatives. TRANSCODED_VIDEO refers to videos transcoded by Campaign Manager from PARENT_VIDEO assets and is applicable to INSTREAM_VIDEO and VPAID_LINEAR_VIDEO creatives. ALTERNATE_VIDEO refers to the Campaign Manager representation of child asset videos from Studio, and is applicable to VPAID_LINEAR_VIDEO creatives. These cannot be added or removed within Campaign Manager. For VPAID_LINEAR_VIDEO creatives, PARENT_VIDEO, TRANSCODED_VIDEO and ALTERNATE_VIDEO assets that are marked active serve as backup in case the VPAID creative cannot be served. Only PARENT_VIDEO assets can be added or removed for an INSTREAM_VIDEO or VPAID_LINEAR_VIDEO creative. PARENT_AUDIO refers to audios uploaded by the user in Campaign Manager and is applicable to INSTREAM_AUDIO creatives. TRANSCODED_AUDIO refers to audios transcoded by Campaign Manager from PARENT_AUDIO assets and is applicable to INSTREAM_AUDIO creatives.",
    ).optional(),
    size: z.object({
      height: z.number().int().describe(
        "Height of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
      iab: z.boolean().describe(
        "IAB standard size. This is a read-only, auto-generated field.",
      ).optional(),
      id: z.string().describe(
        "ID of this size. This is a read-only, auto-generated field.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
      ).optional(),
      width: z.number().int().describe(
        "Width of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
    }).describe(
      "Represents the dimensions of ads, placements, creatives, or creative assets.",
    ).optional(),
    sslCompliant: z.boolean().describe(
      "Whether the asset is SSL-compliant. This is a read-only field. Applicable to all but the following creative types: all REDIRECT and TRACKING_TEXT.",
    ).optional(),
    startTimeType: z.enum([
      "ASSET_START_TIME_TYPE_NONE",
      "ASSET_START_TIME_TYPE_CUSTOM",
    ]).describe(
      "Initial wait time type before making the asset visible. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    streamingServingUrl: z.string().describe(
      "Streaming URL for video asset. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO and all VPAID.",
    ).optional(),
    transparency: z.boolean().describe(
      "Whether the asset is transparent. Applicable to the following creative types: all RICH_MEDIA. Additionally, only applicable to HTML5 assets.",
    ).optional(),
    verticallyLocked: z.boolean().describe(
      "Whether the asset is vertically locked. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA.",
    ).optional(),
    windowMode: z.enum(["OPAQUE", "WINDOW", "TRANSPARENT"]).describe(
      "Window mode options for flash assets. Applicable to the following creative types: FLASH_INPAGE, RICH_MEDIA_DISPLAY_EXPANDING, RICH_MEDIA_IM_EXPAND, RICH_MEDIA_DISPLAY_BANNER, and RICH_MEDIA_INPAGE_FLOATING.",
    ).optional(),
    zIndex: z.number().int().describe(
      "zIndex value of an asset. Applicable to the following creative types: all RICH_MEDIA.Additionally, only applicable to assets whose displayType is NOT one of the following types: ASSET_DISPLAY_TYPE_INPAGE or ASSET_DISPLAY_TYPE_OVERLAY. Acceptable values are -999999999 to 999999999, inclusive.",
    ).optional(),
    zipFilename: z.string().describe(
      "File name of zip file. This is a read-only field. Applicable to the following creative types: HTML5_BANNER.",
    ).optional(),
    zipFilesize: z.string().describe(
      "Size of zip file. This is a read-only field. Applicable to the following creative types: HTML5_BANNER.",
    ).optional(),
  })).describe(
    "Assets associated with a creative. Applicable to all but the following creative types: INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and REDIRECT",
  ).optional(),
  creativeFieldAssignments: z.array(z.object({
    creativeFieldId: z.string().describe("ID of the creative field.")
      .optional(),
    creativeFieldValueId: z.string().describe("ID of the creative field value.")
      .optional(),
  })).describe(
    "Creative field assignments for this creative. Applicable to all creative types.",
  ).optional(),
  customKeyValues: z.array(z.string()).describe(
    "Custom key-values for a Rich Media creative. Key-values let you customize the creative settings of a Rich Media ad running on your site without having to contact the advertiser. You can use key-values to dynamically change the look or functionality of a creative. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  exitCustomEvents: z.array(z.object({
    advertiserCustomEventId: z.string().describe(
      "Unique ID of this event used by Reporting and Data Transfer. This is a read-only field.",
    ).optional(),
    advertiserCustomEventName: z.string().describe(
      "User-entered name for the event.",
    ).optional(),
    advertiserCustomEventType: z.enum([
      "ADVERTISER_EVENT_TIMER",
      "ADVERTISER_EVENT_EXIT",
      "ADVERTISER_EVENT_COUNTER",
    ]).describe("Type of the event. This is a read-only field.").optional(),
    artworkLabel: z.string().describe(
      "Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion.",
    ).optional(),
    artworkType: z.enum([
      "ARTWORK_TYPE_FLASH",
      "ARTWORK_TYPE_HTML5",
      "ARTWORK_TYPE_MIXED",
      "ARTWORK_TYPE_IMAGE",
    ]).describe("Artwork type used by the creative.This is a read-only field.")
      .optional(),
    exitClickThroughUrl: z.object({
      computedClickThroughUrl: z.string().describe(
        "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
      ).optional(),
      customClickThroughUrl: z.string().describe(
        "Custom click-through URL. Applicable if the landingPageId field is left unset.",
      ).optional(),
      landingPageId: z.string().describe(
        "ID of the landing page for the click-through URL.",
      ).optional(),
    }).describe("Click-through URL").optional(),
    id: z.string().describe(
      "ID of this event. This is a required field and should not be modified after insertion.",
    ).optional(),
    popupWindowProperties: z.object({
      dimension: z.object({
        height: z.number().int().describe(
          "Height of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
        iab: z.boolean().describe(
          "IAB standard size. This is a read-only, auto-generated field.",
        ).optional(),
        id: z.string().describe(
          "ID of this size. This is a read-only, auto-generated field.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
        ).optional(),
        width: z.number().int().describe(
          "Width of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
      }).describe(
        "Represents the dimensions of ads, placements, creatives, or creative assets.",
      ).optional(),
      offset: z.object({
        left: z.number().int().describe(
          "Offset distance from left side of an asset or a window.",
        ).optional(),
        top: z.number().int().describe(
          "Offset distance from top side of an asset or a window.",
        ).optional(),
      }).describe("Offset Position.").optional(),
      positionType: z.enum(["CENTER", "COORDINATES"]).describe(
        "Popup window position either centered or at specific coordinate.",
      ).optional(),
      showAddressBar: z.boolean().describe(
        "Whether to display the browser address bar.",
      ).optional(),
      showMenuBar: z.boolean().describe(
        "Whether to display the browser menu bar.",
      ).optional(),
      showScrollBar: z.boolean().describe(
        "Whether to display the browser scroll bar.",
      ).optional(),
      showStatusBar: z.boolean().describe(
        "Whether to display the browser status bar.",
      ).optional(),
      showToolBar: z.boolean().describe(
        "Whether to display the browser tool bar.",
      ).optional(),
      title: z.string().describe("Title of popup window.").optional(),
    }).describe("Popup Window Properties.").optional(),
    targetType: z.enum([
      "TARGET_BLANK",
      "TARGET_TOP",
      "TARGET_SELF",
      "TARGET_PARENT",
      "TARGET_POPUP",
    ]).describe("Target type used by the event.").optional(),
    videoReportingId: z.string().describe(
      "Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field.",
    ).optional(),
  })).describe(
    "List of exit events configured for the creative. For DISPLAY and DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated from clickTags, For DISPLAY, an event is also created from the backupImageReportingLabel. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  fsCommand: z.object({
    left: z.number().int().describe(
      "Distance from the left of the browser.Applicable when positionOption is DISTANCE_FROM_TOP_LEFT_CORNER.",
    ).optional(),
    positionOption: z.enum(["CENTERED", "DISTANCE_FROM_TOP_LEFT_CORNER"])
      .describe("Position in the browser where the window will open.")
      .optional(),
    top: z.number().int().describe(
      "Distance from the top of the browser. Applicable when positionOption is DISTANCE_FROM_TOP_LEFT_CORNER.",
    ).optional(),
    windowHeight: z.number().int().describe("Height of the window.").optional(),
    windowWidth: z.number().int().describe("Width of the window.").optional(),
  }).describe("FsCommand.").optional(),
  htmlCode: z.string().describe(
    "HTML code for the creative. This is a required field when applicable. This field is ignored if htmlCodeLocked is true. Applicable to the following creative types: all CUSTOM, FLASH_INPAGE, and HTML5_BANNER, and all RICH_MEDIA.",
  ).optional(),
  htmlCodeLocked: z.boolean().describe(
    "Whether HTML code is generated by Campaign Manager or manually entered. Set to true to ignore changes to htmlCode. Applicable to the following creative types: FLASH_INPAGE and HTML5_BANNER.",
  ).optional(),
  id: z.string().describe(
    "ID of this creative. This is a read-only, auto-generated field. Applicable to all creative types.",
  ).optional(),
  idDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  latestTraffickedCreativeId: z.string().describe(
    "Latest Studio trafficked creative ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  mediaDescription: z.string().describe(
    "Description of the audio or video ad. Applicable to the following creative types: all INSTREAM_VIDEO, INSTREAM_AUDIO, and all VPAID.",
  ).optional(),
  mediaDuration: z.number().describe(
    "Creative audio or video duration in seconds. This is a read-only field. Applicable to the following creative types: INSTREAM_VIDEO, INSTREAM_AUDIO, all RICH_MEDIA, and all VPAID.",
  ).optional(),
  name: z.string().describe(
    "Required. Name of the creative. This must be less than 256 characters long. Applicable to all creative types.",
  ).optional(),
  obaIcon: z.object({
    iconClickThroughUrl: z.string().describe(
      "URL to redirect to when an OBA icon is clicked.",
    ).optional(),
    iconClickTrackingUrl: z.string().describe(
      "URL to track click when an OBA icon is clicked.",
    ).optional(),
    iconViewTrackingUrl: z.string().describe(
      "URL to track view when an OBA icon is clicked.",
    ).optional(),
    program: z.string().describe(
      "Identifies the industry initiative that the icon supports. For example, AdChoices.",
    ).optional(),
    resourceUrl: z.string().describe(
      "OBA icon resource URL. Campaign Manager only supports image and JavaScript icons. Learn more",
    ).optional(),
    size: z.object({
      height: z.number().int().describe(
        "Height of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
      iab: z.boolean().describe(
        "IAB standard size. This is a read-only, auto-generated field.",
      ).optional(),
      id: z.string().describe(
        "ID of this size. This is a read-only, auto-generated field.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
      ).optional(),
      width: z.number().int().describe(
        "Width of this size. Acceptable values are 0 to 32767, inclusive.",
      ).optional(),
    }).describe(
      "Represents the dimensions of ads, placements, creatives, or creative assets.",
    ).optional(),
    xPosition: z.string().describe(
      "OBA icon x coordinate position. Accepted values are left or right.",
    ).optional(),
    yPosition: z.string().describe(
      "OBA icon y coordinate position. Accepted values are top or bottom.",
    ).optional(),
  }).describe("Online Behavioral Advertiser icon.").optional(),
  overrideCss: z.string().describe(
    "Override CSS value for rich media creatives. Applicable to the following creative types: all RICH_MEDIA.",
  ).optional(),
  progressOffset: z.object({
    offsetPercentage: z.number().int().describe(
      "Duration, as a percentage of video duration. Do not set when offsetSeconds is set. Acceptable values are 0 to 100, inclusive.",
    ).optional(),
    offsetSeconds: z.number().int().describe(
      "Duration, in seconds. Do not set when offsetPercentage is set. Acceptable values are 0 to 86399, inclusive.",
    ).optional(),
  }).describe("Video Offset").optional(),
  redirectUrl: z.string().describe(
    "URL of hosted image or hosted video or another ad tag. For INSTREAM_VIDEO_REDIRECT creatives this is the in-stream video redirect URL. The standard for a VAST (Video Ad Serving Template) ad response allows for a redirect link to another VAST 2.0 or 3.0 call. This is a required field when applicable. Applicable to the following creative types: DISPLAY_REDIRECT, INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and INSTREAM_VIDEO_REDIRECT",
  ).optional(),
  renderingId: z.string().describe(
    "ID of current rendering version. This is a read-only field. Applicable to all creative types.",
  ).optional(),
  renderingIdDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  requiredFlashPluginVersion: z.string().describe(
    "The minimum required Flash plugin version for this creative. For example, 11.2.202.235. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  requiredFlashVersion: z.number().int().describe(
    "The internal Flash version for this creative as calculated by Studio. This is a read-only field. Applicable to the following creative types: FLASH_INPAGE all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset type is not HTML_IMAGE.",
  ).optional(),
  size: z.object({
    height: z.number().int().describe(
      "Height of this size. Acceptable values are 0 to 32767, inclusive.",
    ).optional(),
    iab: z.boolean().describe(
      "IAB standard size. This is a read-only, auto-generated field.",
    ).optional(),
    id: z.string().describe(
      "ID of this size. This is a read-only, auto-generated field.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
    ).optional(),
    width: z.number().int().describe(
      "Width of this size. Acceptable values are 0 to 32767, inclusive.",
    ).optional(),
  }).describe(
    "Represents the dimensions of ads, placements, creatives, or creative assets.",
  ).optional(),
  skipOffset: z.object({
    offsetPercentage: z.number().int().describe(
      "Duration, as a percentage of video duration. Do not set when offsetSeconds is set. Acceptable values are 0 to 100, inclusive.",
    ).optional(),
    offsetSeconds: z.number().int().describe(
      "Duration, in seconds. Do not set when offsetPercentage is set. Acceptable values are 0 to 86399, inclusive.",
    ).optional(),
  }).describe("Video Offset").optional(),
  skippable: z.boolean().describe(
    "Whether the user can choose to skip the creative. Applicable to the following creative types: all INSTREAM_VIDEO and all VPAID.",
  ).optional(),
  sslCompliant: z.boolean().describe(
    "Whether the creative is SSL-compliant. This is a read-only field. Applicable to all creative types.",
  ).optional(),
  sslOverride: z.boolean().describe(
    "Whether creative should be treated as SSL compliant even if the system scan shows it's not. Applicable to all creative types.",
  ).optional(),
  studioAdvertiserId: z.string().describe(
    "Studio advertiser ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  studioCreativeId: z.string().describe(
    "Studio creative ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  studioTraffickedCreativeId: z.string().describe(
    "Studio trafficked creative ID associated with rich media and VPAID creatives. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this creative. This field, if left unset, will be auto-generated for both insert and update operations. Applicable to all creative types.",
  ).optional(),
  thirdPartyBackupImageImpressionsUrl: z.string().describe(
    "Third-party URL used to record backup image impressions. Applicable to the following creative types: all RICH_MEDIA.",
  ).optional(),
  thirdPartyRichMediaImpressionsUrl: z.string().describe(
    "Third-party URL used to record rich media impressions. Applicable to the following creative types: all RICH_MEDIA.",
  ).optional(),
  thirdPartyUrls: z.array(z.object({
    thirdPartyUrlType: z.enum([
      "IMPRESSION",
      "CLICK_TRACKING",
      "VIDEO_START",
      "VIDEO_FIRST_QUARTILE",
      "VIDEO_MIDPOINT",
      "VIDEO_THIRD_QUARTILE",
      "VIDEO_COMPLETE",
      "VIDEO_MUTE",
      "VIDEO_PAUSE",
      "VIDEO_REWIND",
      "VIDEO_FULLSCREEN",
      "VIDEO_STOP",
      "VIDEO_CUSTOM",
      "SURVEY",
      "RICH_MEDIA_IMPRESSION",
      "RICH_MEDIA_RM_IMPRESSION",
      "RICH_MEDIA_BACKUP_IMPRESSION",
      "VIDEO_SKIP",
      "VIDEO_PROGRESS",
    ]).describe(
      "Third-party URL type for in-stream video and in-stream audio creatives.",
    ).optional(),
    url: z.string().describe("URL for the specified third-party URL type.")
      .optional(),
  })).describe(
    "Third-party URLs for tracking in-stream creative events. Applicable to the following creative types: all INSTREAM_VIDEO, all INSTREAM_AUDIO, and all VPAID.",
  ).optional(),
  timerCustomEvents: z.array(z.object({
    advertiserCustomEventId: z.string().describe(
      "Unique ID of this event used by Reporting and Data Transfer. This is a read-only field.",
    ).optional(),
    advertiserCustomEventName: z.string().describe(
      "User-entered name for the event.",
    ).optional(),
    advertiserCustomEventType: z.enum([
      "ADVERTISER_EVENT_TIMER",
      "ADVERTISER_EVENT_EXIT",
      "ADVERTISER_EVENT_COUNTER",
    ]).describe("Type of the event. This is a read-only field.").optional(),
    artworkLabel: z.string().describe(
      "Artwork label column, used to link events in Campaign Manager back to events in Studio. This is a required field and should not be modified after insertion.",
    ).optional(),
    artworkType: z.enum([
      "ARTWORK_TYPE_FLASH",
      "ARTWORK_TYPE_HTML5",
      "ARTWORK_TYPE_MIXED",
      "ARTWORK_TYPE_IMAGE",
    ]).describe("Artwork type used by the creative.This is a read-only field.")
      .optional(),
    exitClickThroughUrl: z.object({
      computedClickThroughUrl: z.string().describe(
        "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If landingPageId is specified then that landing page's URL is assigned to this field. - Otherwise, the customClickThroughUrl is assigned to this field.",
      ).optional(),
      customClickThroughUrl: z.string().describe(
        "Custom click-through URL. Applicable if the landingPageId field is left unset.",
      ).optional(),
      landingPageId: z.string().describe(
        "ID of the landing page for the click-through URL.",
      ).optional(),
    }).describe("Click-through URL").optional(),
    id: z.string().describe(
      "ID of this event. This is a required field and should not be modified after insertion.",
    ).optional(),
    popupWindowProperties: z.object({
      dimension: z.object({
        height: z.number().int().describe(
          "Height of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
        iab: z.boolean().describe(
          "IAB standard size. This is a read-only, auto-generated field.",
        ).optional(),
        id: z.string().describe(
          "ID of this size. This is a read-only, auto-generated field.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string "dfareporting#size".',
        ).optional(),
        width: z.number().int().describe(
          "Width of this size. Acceptable values are 0 to 32767, inclusive.",
        ).optional(),
      }).describe(
        "Represents the dimensions of ads, placements, creatives, or creative assets.",
      ).optional(),
      offset: z.object({
        left: z.number().int().describe(
          "Offset distance from left side of an asset or a window.",
        ).optional(),
        top: z.number().int().describe(
          "Offset distance from top side of an asset or a window.",
        ).optional(),
      }).describe("Offset Position.").optional(),
      positionType: z.enum(["CENTER", "COORDINATES"]).describe(
        "Popup window position either centered or at specific coordinate.",
      ).optional(),
      showAddressBar: z.boolean().describe(
        "Whether to display the browser address bar.",
      ).optional(),
      showMenuBar: z.boolean().describe(
        "Whether to display the browser menu bar.",
      ).optional(),
      showScrollBar: z.boolean().describe(
        "Whether to display the browser scroll bar.",
      ).optional(),
      showStatusBar: z.boolean().describe(
        "Whether to display the browser status bar.",
      ).optional(),
      showToolBar: z.boolean().describe(
        "Whether to display the browser tool bar.",
      ).optional(),
      title: z.string().describe("Title of popup window.").optional(),
    }).describe("Popup Window Properties.").optional(),
    targetType: z.enum([
      "TARGET_BLANK",
      "TARGET_TOP",
      "TARGET_SELF",
      "TARGET_PARENT",
      "TARGET_POPUP",
    ]).describe("Target type used by the event.").optional(),
    videoReportingId: z.string().describe(
      "Video reporting ID, used to differentiate multiple videos in a single creative. This is a read-only field.",
    ).optional(),
  })).describe(
    "List of timer events configured for the creative. For DISPLAY_IMAGE_GALLERY creatives, these are read-only and auto-generated from clickTags. Applicable to the following creative types: DISPLAY_IMAGE_GALLERY, all RICH_MEDIA, and all VPAID. Applicable to DISPLAY when the primary asset is not HTML_IMAGE.",
  ).optional(),
  totalFileSize: z.string().describe(
    "Combined size of all creative assets. This is a read-only field. Applicable to the following creative types: all RICH_MEDIA, and all VPAID.",
  ).optional(),
  type: z.enum([
    "IMAGE",
    "DISPLAY_REDIRECT",
    "CUSTOM_DISPLAY",
    "INTERNAL_REDIRECT",
    "CUSTOM_DISPLAY_INTERSTITIAL",
    "INTERSTITIAL_INTERNAL_REDIRECT",
    "TRACKING_TEXT",
    "RICH_MEDIA_DISPLAY_BANNER",
    "RICH_MEDIA_INPAGE_FLOATING",
    "RICH_MEDIA_IM_EXPAND",
    "RICH_MEDIA_DISPLAY_EXPANDING",
    "RICH_MEDIA_DISPLAY_INTERSTITIAL",
    "RICH_MEDIA_DISPLAY_MULTI_FLOATING_INTERSTITIAL",
    "RICH_MEDIA_MOBILE_IN_APP",
    "FLASH_INPAGE",
    "INSTREAM_VIDEO",
    "VPAID_LINEAR_VIDEO",
    "VPAID_NON_LINEAR_VIDEO",
    "INSTREAM_VIDEO_REDIRECT",
    "RICH_MEDIA_PEEL_DOWN",
    "HTML5_BANNER",
    "DISPLAY",
    "DISPLAY_IMAGE_GALLERY",
    "BRAND_SAFE_DEFAULT_INSTREAM_VIDEO",
    "INSTREAM_AUDIO",
  ]).describe(
    "Required. Type of this creative. Applicable to all creative types. *Note:* FLASH_INPAGE, HTML5_BANNER, and IMAGE are only used for existing creatives. New creatives should use DISPLAY as a replacement for these types.",
  ).optional(),
  universalAdId: z.object({
    registry: z.enum([
      "OTHER",
      "AD_ID_OFFICIAL",
      "CLEARCAST",
      "DCM",
      "ARPP",
      "CUSV",
    ]).describe("Registry used for the Ad ID value.").optional(),
    value: z.string().describe(
      'ID value for this creative. Only alphanumeric characters and the following symbols are valid: "_/\\-". Maximum length is 64 characters. Read only when registry is DCM.',
    ).optional(),
  }).describe(
    "A Universal Ad ID as per the VAST 4.0 spec. Applicable to the following creative types: INSTREAM_AUDIO, INSTREAM_VIDEO and VPAID.",
  ).optional(),
  version: z.number().int().describe(
    "The version number helps you keep track of multiple versions of your creative in your reports. The version number will always be auto-generated during insert operations to start at 1. For tracking creatives the version cannot be incremented and will always remain at 1. For all other creative types the version can be incremented only by 1 during update operations. In addition, the version will be automatically incremented by 1 when undergoing Rich Media creative merging. Applicable to all creative types.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 Creatives. Registered at `@swamp/gcp/dfareporting/creatives`. */
export const model = {
  type: "@swamp/gcp/dfareporting/creatives",
  version: "2026.05.26.1",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Contains properties of a Creative.",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["adParameters"] !== undefined) {
          body["adParameters"] = g["adParameters"];
        }
        if (g["adTagKeys"] !== undefined) body["adTagKeys"] = g["adTagKeys"];
        if (g["additionalSizes"] !== undefined) {
          body["additionalSizes"] = g["additionalSizes"];
        }
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["allowScriptAccess"] !== undefined) {
          body["allowScriptAccess"] = g["allowScriptAccess"];
        }
        if (g["archived"] !== undefined) body["archived"] = g["archived"];
        if (g["artworkType"] !== undefined) {
          body["artworkType"] = g["artworkType"];
        }
        if (g["authoringSource"] !== undefined) {
          body["authoringSource"] = g["authoringSource"];
        }
        if (g["authoringTool"] !== undefined) {
          body["authoringTool"] = g["authoringTool"];
        }
        if (g["autoAdvanceImages"] !== undefined) {
          body["autoAdvanceImages"] = g["autoAdvanceImages"];
        }
        if (g["backgroundColor"] !== undefined) {
          body["backgroundColor"] = g["backgroundColor"];
        }
        if (g["backupImageClickThroughUrl"] !== undefined) {
          body["backupImageClickThroughUrl"] = g["backupImageClickThroughUrl"];
        }
        if (g["backupImageFeatures"] !== undefined) {
          body["backupImageFeatures"] = g["backupImageFeatures"];
        }
        if (g["backupImageReportingLabel"] !== undefined) {
          body["backupImageReportingLabel"] = g["backupImageReportingLabel"];
        }
        if (g["backupImageTargetWindow"] !== undefined) {
          body["backupImageTargetWindow"] = g["backupImageTargetWindow"];
        }
        if (g["clickTags"] !== undefined) body["clickTags"] = g["clickTags"];
        if (g["commercialId"] !== undefined) {
          body["commercialId"] = g["commercialId"];
        }
        if (g["companionCreatives"] !== undefined) {
          body["companionCreatives"] = g["companionCreatives"];
        }
        if (g["compatibility"] !== undefined) {
          body["compatibility"] = g["compatibility"];
        }
        if (g["convertFlashToHtml5"] !== undefined) {
          body["convertFlashToHtml5"] = g["convertFlashToHtml5"];
        }
        if (g["counterCustomEvents"] !== undefined) {
          body["counterCustomEvents"] = g["counterCustomEvents"];
        }
        if (g["creativeAssets"] !== undefined) {
          body["creativeAssets"] = g["creativeAssets"];
        }
        if (g["creativeFieldAssignments"] !== undefined) {
          body["creativeFieldAssignments"] = g["creativeFieldAssignments"];
        }
        if (g["customKeyValues"] !== undefined) {
          body["customKeyValues"] = g["customKeyValues"];
        }
        if (g["exitCustomEvents"] !== undefined) {
          body["exitCustomEvents"] = g["exitCustomEvents"];
        }
        if (g["fsCommand"] !== undefined) body["fsCommand"] = g["fsCommand"];
        if (g["htmlCode"] !== undefined) body["htmlCode"] = g["htmlCode"];
        if (g["htmlCodeLocked"] !== undefined) {
          body["htmlCodeLocked"] = g["htmlCodeLocked"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["latestTraffickedCreativeId"] !== undefined) {
          body["latestTraffickedCreativeId"] = g["latestTraffickedCreativeId"];
        }
        if (g["mediaDescription"] !== undefined) {
          body["mediaDescription"] = g["mediaDescription"];
        }
        if (g["mediaDuration"] !== undefined) {
          body["mediaDuration"] = g["mediaDuration"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["obaIcon"] !== undefined) body["obaIcon"] = g["obaIcon"];
        if (g["overrideCss"] !== undefined) {
          body["overrideCss"] = g["overrideCss"];
        }
        if (g["progressOffset"] !== undefined) {
          body["progressOffset"] = g["progressOffset"];
        }
        if (g["redirectUrl"] !== undefined) {
          body["redirectUrl"] = g["redirectUrl"];
        }
        if (g["renderingId"] !== undefined) {
          body["renderingId"] = g["renderingId"];
        }
        if (g["renderingIdDimensionValue"] !== undefined) {
          body["renderingIdDimensionValue"] = g["renderingIdDimensionValue"];
        }
        if (g["requiredFlashPluginVersion"] !== undefined) {
          body["requiredFlashPluginVersion"] = g["requiredFlashPluginVersion"];
        }
        if (g["requiredFlashVersion"] !== undefined) {
          body["requiredFlashVersion"] = g["requiredFlashVersion"];
        }
        if (g["size"] !== undefined) body["size"] = g["size"];
        if (g["skipOffset"] !== undefined) body["skipOffset"] = g["skipOffset"];
        if (g["skippable"] !== undefined) body["skippable"] = g["skippable"];
        if (g["sslCompliant"] !== undefined) {
          body["sslCompliant"] = g["sslCompliant"];
        }
        if (g["sslOverride"] !== undefined) {
          body["sslOverride"] = g["sslOverride"];
        }
        if (g["studioAdvertiserId"] !== undefined) {
          body["studioAdvertiserId"] = g["studioAdvertiserId"];
        }
        if (g["studioCreativeId"] !== undefined) {
          body["studioCreativeId"] = g["studioCreativeId"];
        }
        if (g["studioTraffickedCreativeId"] !== undefined) {
          body["studioTraffickedCreativeId"] = g["studioTraffickedCreativeId"];
        }
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["thirdPartyBackupImageImpressionsUrl"] !== undefined) {
          body["thirdPartyBackupImageImpressionsUrl"] =
            g["thirdPartyBackupImageImpressionsUrl"];
        }
        if (g["thirdPartyRichMediaImpressionsUrl"] !== undefined) {
          body["thirdPartyRichMediaImpressionsUrl"] =
            g["thirdPartyRichMediaImpressionsUrl"];
        }
        if (g["thirdPartyUrls"] !== undefined) {
          body["thirdPartyUrls"] = g["thirdPartyUrls"];
        }
        if (g["timerCustomEvents"] !== undefined) {
          body["timerCustomEvents"] = g["timerCustomEvents"];
        }
        if (g["totalFileSize"] !== undefined) {
          body["totalFileSize"] = g["totalFileSize"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["universalAdId"] !== undefined) {
          body["universalAdId"] = g["universalAdId"];
        }
        if (g["version"] !== undefined) body["version"] = g["version"];
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "profileId": String(g["profileId"] ?? "") },
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.id ?? g.id)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
        identifier: z.string().describe("The id of the creatives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.id ?? g.id)?.toString() ?? args.identifier).replace(
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
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
        params["profileId"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["adParameters"] !== undefined) {
          body["adParameters"] = g["adParameters"];
        }
        if (g["adTagKeys"] !== undefined) body["adTagKeys"] = g["adTagKeys"];
        if (g["additionalSizes"] !== undefined) {
          body["additionalSizes"] = g["additionalSizes"];
        }
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["allowScriptAccess"] !== undefined) {
          body["allowScriptAccess"] = g["allowScriptAccess"];
        }
        if (g["archived"] !== undefined) body["archived"] = g["archived"];
        if (g["artworkType"] !== undefined) {
          body["artworkType"] = g["artworkType"];
        }
        if (g["authoringSource"] !== undefined) {
          body["authoringSource"] = g["authoringSource"];
        }
        if (g["authoringTool"] !== undefined) {
          body["authoringTool"] = g["authoringTool"];
        }
        if (g["autoAdvanceImages"] !== undefined) {
          body["autoAdvanceImages"] = g["autoAdvanceImages"];
        }
        if (g["backgroundColor"] !== undefined) {
          body["backgroundColor"] = g["backgroundColor"];
        }
        if (g["backupImageClickThroughUrl"] !== undefined) {
          body["backupImageClickThroughUrl"] = g["backupImageClickThroughUrl"];
        }
        if (g["backupImageFeatures"] !== undefined) {
          body["backupImageFeatures"] = g["backupImageFeatures"];
        }
        if (g["backupImageReportingLabel"] !== undefined) {
          body["backupImageReportingLabel"] = g["backupImageReportingLabel"];
        }
        if (g["backupImageTargetWindow"] !== undefined) {
          body["backupImageTargetWindow"] = g["backupImageTargetWindow"];
        }
        if (g["clickTags"] !== undefined) body["clickTags"] = g["clickTags"];
        if (g["commercialId"] !== undefined) {
          body["commercialId"] = g["commercialId"];
        }
        if (g["companionCreatives"] !== undefined) {
          body["companionCreatives"] = g["companionCreatives"];
        }
        if (g["compatibility"] !== undefined) {
          body["compatibility"] = g["compatibility"];
        }
        if (g["convertFlashToHtml5"] !== undefined) {
          body["convertFlashToHtml5"] = g["convertFlashToHtml5"];
        }
        if (g["counterCustomEvents"] !== undefined) {
          body["counterCustomEvents"] = g["counterCustomEvents"];
        }
        if (g["creativeAssets"] !== undefined) {
          body["creativeAssets"] = g["creativeAssets"];
        }
        if (g["creativeFieldAssignments"] !== undefined) {
          body["creativeFieldAssignments"] = g["creativeFieldAssignments"];
        }
        if (g["customKeyValues"] !== undefined) {
          body["customKeyValues"] = g["customKeyValues"];
        }
        if (g["exitCustomEvents"] !== undefined) {
          body["exitCustomEvents"] = g["exitCustomEvents"];
        }
        if (g["fsCommand"] !== undefined) body["fsCommand"] = g["fsCommand"];
        if (g["htmlCode"] !== undefined) body["htmlCode"] = g["htmlCode"];
        if (g["htmlCodeLocked"] !== undefined) {
          body["htmlCodeLocked"] = g["htmlCodeLocked"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["latestTraffickedCreativeId"] !== undefined) {
          body["latestTraffickedCreativeId"] = g["latestTraffickedCreativeId"];
        }
        if (g["mediaDescription"] !== undefined) {
          body["mediaDescription"] = g["mediaDescription"];
        }
        if (g["mediaDuration"] !== undefined) {
          body["mediaDuration"] = g["mediaDuration"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["obaIcon"] !== undefined) body["obaIcon"] = g["obaIcon"];
        if (g["overrideCss"] !== undefined) {
          body["overrideCss"] = g["overrideCss"];
        }
        if (g["progressOffset"] !== undefined) {
          body["progressOffset"] = g["progressOffset"];
        }
        if (g["redirectUrl"] !== undefined) {
          body["redirectUrl"] = g["redirectUrl"];
        }
        if (g["renderingId"] !== undefined) {
          body["renderingId"] = g["renderingId"];
        }
        if (g["renderingIdDimensionValue"] !== undefined) {
          body["renderingIdDimensionValue"] = g["renderingIdDimensionValue"];
        }
        if (g["requiredFlashPluginVersion"] !== undefined) {
          body["requiredFlashPluginVersion"] = g["requiredFlashPluginVersion"];
        }
        if (g["requiredFlashVersion"] !== undefined) {
          body["requiredFlashVersion"] = g["requiredFlashVersion"];
        }
        if (g["size"] !== undefined) body["size"] = g["size"];
        if (g["skipOffset"] !== undefined) body["skipOffset"] = g["skipOffset"];
        if (g["skippable"] !== undefined) body["skippable"] = g["skippable"];
        if (g["sslCompliant"] !== undefined) {
          body["sslCompliant"] = g["sslCompliant"];
        }
        if (g["sslOverride"] !== undefined) {
          body["sslOverride"] = g["sslOverride"];
        }
        if (g["studioAdvertiserId"] !== undefined) {
          body["studioAdvertiserId"] = g["studioAdvertiserId"];
        }
        if (g["studioCreativeId"] !== undefined) {
          body["studioCreativeId"] = g["studioCreativeId"];
        }
        if (g["studioTraffickedCreativeId"] !== undefined) {
          body["studioTraffickedCreativeId"] = g["studioTraffickedCreativeId"];
        }
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["thirdPartyBackupImageImpressionsUrl"] !== undefined) {
          body["thirdPartyBackupImageImpressionsUrl"] =
            g["thirdPartyBackupImageImpressionsUrl"];
        }
        if (g["thirdPartyRichMediaImpressionsUrl"] !== undefined) {
          body["thirdPartyRichMediaImpressionsUrl"] =
            g["thirdPartyRichMediaImpressionsUrl"];
        }
        if (g["thirdPartyUrls"] !== undefined) {
          body["thirdPartyUrls"] = g["thirdPartyUrls"];
        }
        if (g["timerCustomEvents"] !== undefined) {
          body["timerCustomEvents"] = g["timerCustomEvents"];
        }
        if (g["totalFileSize"] !== undefined) {
          body["totalFileSize"] = g["totalFileSize"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["universalAdId"] !== undefined) {
          body["universalAdId"] = g["universalAdId"];
        }
        if (g["version"] !== undefined) body["version"] = g["version"];
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
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync creatives state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
        active: z.boolean().describe(
          "Select only active creatives. Leave blank to select active and inactive creatives.",
        ).optional(),
        advertiserId: z.string().describe(
          "Select only creatives with this advertiser ID.",
        ).optional(),
        archived: z.boolean().describe(
          "Select only archived creatives. Leave blank to select archived and unarchived creatives.",
        ).optional(),
        campaignId: z.string().describe(
          "Select only creatives with this campaign ID.",
        ).optional(),
        companionCreativeIds: z.string().describe(
          "Select only in-stream video creatives with these companion IDs.",
        ).optional(),
        creativeFieldIds: z.string().describe(
          "Select only creatives with these creative field IDs.",
        ).optional(),
        ids: z.string().describe("Select only creatives with these IDs.")
          .optional(),
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        renderingIds: z.string().describe(
          "Select only creatives with these rendering IDs.",
        ).optional(),
        searchString: z.string().describe(
          'Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "creative*2015" will return objects with names like "creative June 2015", "creative April 2015", or simply "creative 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "creative" will match objects with name "my creative", "creative 2015", or simply "creative".',
        ).optional(),
        sizeIds: z.string().describe(
          "Select only creatives with these size IDs.",
        ).optional(),
        sortField: z.string().describe("Field by which to sort the list.")
          .optional(),
        sortOrder: z.string().describe("Order of sorted results.").optional(),
        studioCreativeId: z.string().describe(
          "Select only creatives corresponding to this Studio creative ID.",
        ).optional(),
        types: z.string().describe(
          "Select only creatives with these creative types.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (args["active"] !== undefined) {
          params["active"] = String(args["active"]);
        }
        if (args["advertiserId"] !== undefined) {
          params["advertiserId"] = String(args["advertiserId"]);
        }
        if (args["archived"] !== undefined) {
          params["archived"] = String(args["archived"]);
        }
        if (args["campaignId"] !== undefined) {
          params["campaignId"] = String(args["campaignId"]);
        }
        if (args["companionCreativeIds"] !== undefined) {
          params["companionCreativeIds"] = String(args["companionCreativeIds"]);
        }
        if (args["creativeFieldIds"] !== undefined) {
          params["creativeFieldIds"] = String(args["creativeFieldIds"]);
        }
        if (args["ids"] !== undefined) params["ids"] = String(args["ids"]);
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["renderingIds"] !== undefined) {
          params["renderingIds"] = String(args["renderingIds"]);
        }
        if (args["searchString"] !== undefined) {
          params["searchString"] = String(args["searchString"]);
        }
        if (args["sizeIds"] !== undefined) {
          params["sizeIds"] = String(args["sizeIds"]);
        }
        if (args["sortField"] !== undefined) {
          params["sortField"] = String(args["sortField"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        if (args["studioCreativeId"] !== undefined) {
          params["studioCreativeId"] = String(args["studioCreativeId"]);
        }
        if (args["types"] !== undefined) {
          params["types"] = String(args["types"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "creatives",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
