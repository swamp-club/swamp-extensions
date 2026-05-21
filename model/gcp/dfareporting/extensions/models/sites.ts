// Auto-generated extension model for @swamp/gcp/dfareporting/sites
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 Sites.
 *
 * Contains properties of a site.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.sites.get",
  "path": "userprofiles/{+profileId}/sites/{+id}",
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
  "id": "dfareporting.sites.insert",
  "path": "userprofiles/{+profileId}/sites",
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
  "id": "dfareporting.sites.update",
  "path": "userprofiles/{+profileId}/sites",
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
  "id": "dfareporting.sites.list",
  "path": "userprofiles/{+profileId}/sites",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "acceptsInStreamVideoPlacements": {
      "location": "query",
    },
    "acceptsInterstitialPlacements": {
      "location": "query",
    },
    "acceptsPublisherPaidPlacements": {
      "location": "query",
    },
    "adWordsSite": {
      "location": "query",
    },
    "approved": {
      "location": "query",
    },
    "campaignIds": {
      "location": "query",
    },
    "directorySiteIds": {
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
    "searchString": {
      "location": "query",
    },
    "sortField": {
      "location": "query",
    },
    "sortOrder": {
      "location": "query",
    },
    "subaccountId": {
      "location": "query",
    },
    "unmappedSite": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this site. This is a read-only field that can be left blank.",
  ).optional(),
  adServingPlatformId: z.string().describe(
    "Optional. Ad serving platform ID to identify the ad serving platform used by the site. Measurement partners can use this field to add ad-server specific macros. If set, this value acts as the default during placement creation. Possible values are: * `1`, Adelphic * `2`, Adform * `3`, Adobe * `4`, Amobee * `5`, Basis (Centro) * `6`, Beeswax * `7`, Amazon * `8`, DV360 (DBM) * `9`, Innovid * `10`, MediaMath * `11`, Roku OneView DSP * `12`, TabMo Hawk * `13`, The Trade Desk * `14`, Xandr Invest DSP * `15`, Yahoo DSP * `16`, Zeta Global * `17`, Scaleout * `18`, Bidtellect * `19`, Unicorn * `20`, Teads * `21`, Quantcast * `22`, Cognitiv * `23`, AdTheorent * `24`, DeepIntent * `25`, Pulsepoint",
  ).optional(),
  approved: z.boolean().describe("Whether this site is approved.").optional(),
  directorySiteId: z.string().describe(
    "Directory site associated with this site. This is a required field that is read-only after insertion.",
  ).optional(),
  directorySiteIdDimensionValue: z.object({
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
  id: z.string().describe(
    "ID of this site. This is a read-only, auto-generated field.",
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
  keyName: z.string().describe(
    "Key name of this site. This is a read-only, auto-generated field.",
  ).optional(),
  name: z.string().describe(
    "Name of this site.This is a required field. Must be less than 128 characters long. If this site is under a subaccount, the name must be unique among sites of the same subaccount. Otherwise, this site is a top-level site, and the name must be unique among top-level sites of the same account.",
  ).optional(),
  siteContacts: z.array(z.object({
    address: z.string().describe("Address of this site contact.").optional(),
    contactType: z.enum(["SALES_PERSON", "TRAFFICKER"]).describe(
      "Site contact type.",
    ).optional(),
    email: z.string().describe(
      "Email address of this site contact. This is a required field.",
    ).optional(),
    firstName: z.string().describe("First name of this site contact.")
      .optional(),
    id: z.string().describe(
      "ID of this site contact. This is a read-only, auto-generated field.",
    ).optional(),
    lastName: z.string().describe("Last name of this site contact.").optional(),
    phone: z.string().describe("Primary phone number of this site contact.")
      .optional(),
    title: z.string().describe("Title or designation of this site contact.")
      .optional(),
  })).describe("Site contacts.").optional(),
  siteSettings: z.object({
    activeViewOptOut: z.boolean().describe(
      "Whether active view creatives are disabled for this site.",
    ).optional(),
    adBlockingOptOut: z.boolean().describe(
      "Whether this site opts out of ad blocking. When true, ad blocking is disabled for all placements under the site, regardless of the individual placement settings. When false, the campaign and placement settings take effect.",
    ).optional(),
    disableNewCookie: z.boolean().describe(
      "Whether new cookies are disabled for this site.",
    ).optional(),
    tagSetting: z.object({
      additionalKeyValues: z.string().describe(
        "Additional key-values to be included in tags. Each key-value pair must be of the form key=value, and pairs must be separated by a semicolon (;). Keys and values must not contain commas. For example, id=2;color=red is a valid value for this field.",
      ).optional(),
      includeClickThroughUrls: z.boolean().describe(
        "Whether static landing page URLs should be included in the tags. New placements will default to the value set on their site.",
      ).optional(),
      includeClickTracking: z.boolean().describe(
        "Whether click-tracking string should be included in the tags.",
      ).optional(),
      includeUnescapedlpurlMacro: z.boolean().describe(
        "Optional. Indicates that the unescapedlpurl macro should be included in the tag for the static landing page. New placements will default to the value set on their site.",
      ).optional(),
      keywordOption: z.enum([
        "PLACEHOLDER_WITH_LIST_OF_KEYWORDS",
        "IGNORE",
        "GENERATE_SEPARATE_TAG_FOR_EACH_KEYWORD",
      ]).describe(
        "Option specifying how keywords are embedded in ad tags. This setting can be used to specify whether keyword placeholders are inserted in placement tags for this site. Publishers can then add keywords to those placeholders.",
      ).optional(),
    }).describe("Tag Settings").optional(),
    videoActiveViewOptOutTemplate: z.boolean().describe(
      "Whether Verification and ActiveView for in-stream video creatives are disabled by default for new placements created under this site. This value will be used to populate the placement.videoActiveViewOptOut field, when no value is specified for the new placement.",
    ).optional(),
    vpaidAdapterChoiceTemplate: z.enum(["DEFAULT", "FLASH", "HTML5", "BOTH"])
      .describe(
        "Default VPAID adapter setting for new placements created under this site. This value will be used to populate the placements.vpaidAdapterChoice field, when no value is specified for the new placement. Controls which VPAID format the measurement adapter will use for in-stream video creatives assigned to the placement. The publisher's specifications will typically determine this setting. For VPAID creatives, the adapter format will match the VPAID format (HTML5 VPAID creatives use the HTML5 adapter). *Note:* Flash is no longer supported. This field now defaults to HTML5 when the following values are provided: FLASH, BOTH.",
      ).optional(),
  }).describe("Site Settings").optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this site. This is a read-only field that can be left blank.",
  ).optional(),
  videoSettings: z.object({
    companionSettings: z.object({
      companionsDisabled: z.boolean().describe(
        "Whether companions are disabled for this site template.",
      ).optional(),
      enabledSizes: z.array(z.object({
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
        "Allowlist of companion sizes to be served via this site template. Set this list to null or empty to serve all companion sizes.",
      ).optional(),
      imageOnly: z.boolean().describe(
        "Whether to serve only static images as companions.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteCompanionSetting".',
      ).optional(),
    }).describe("Companion Settings").optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteVideoSettings".',
    ).optional(),
    obaEnabled: z.boolean().describe(
      "Whether OBA icons are enabled for this placement.",
    ).optional(),
    obaSettings: z.object({
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
    orientation: z.enum(["ANY", "LANDSCAPE", "PORTRAIT"]).describe(
      "Orientation of a site template used for video. This will act as default for new placements created under this site.",
    ).optional(),
    publisherSpecificationId: z.string().describe(
      "Publisher specification ID used to identify site-associated publisher requirements and automatically populate transcode settings. If publisher specification ID is specified, it will take precedence over transcode settings. Possible values are: * `1`, Hulu * `2`, NBC * `3`, CBS * `4`, CBS Desktop * `5`, Discovery * `6`, VEVO HD * `7`, VEVO Vertical * `8`, Fox * `9`, CW Network * `10`, Disney * `11`, IGN * `12`, NFL.com * `13`, Turner Broadcasting * `14`, Tubi on Fox * `15`, Hearst Corporation * `16`, Twitch Desktop * `17`, ABC * `18`, Univision * `19`, MLB.com * `20`, MLB.com Mobile * `21`, MLB.com OTT * `22`, Polsat * `23`, TVN * `24`, Mediaset * `25`, Antena 3 * `26`, Mediamond * `27`, Sky Italia * `28`, Tubi on CBS * `29`, Spotify * `30`, Paramount * `31`, Max",
    ).optional(),
    skippableSettings: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteSkippableSetting".',
      ).optional(),
      progressOffset: z.object({
        offsetPercentage: z.number().int().describe(
          "Duration, as a percentage of video duration. Do not set when offsetSeconds is set. Acceptable values are 0 to 100, inclusive.",
        ).optional(),
        offsetSeconds: z.number().int().describe(
          "Duration, in seconds. Do not set when offsetPercentage is set. Acceptable values are 0 to 86399, inclusive.",
        ).optional(),
      }).describe("Video Offset").optional(),
      skipOffset: z.object({
        offsetPercentage: z.number().int().describe(
          "Duration, as a percentage of video duration. Do not set when offsetSeconds is set. Acceptable values are 0 to 100, inclusive.",
        ).optional(),
        offsetSeconds: z.number().int().describe(
          "Duration, in seconds. Do not set when offsetPercentage is set. Acceptable values are 0 to 86399, inclusive.",
        ).optional(),
      }).describe("Video Offset").optional(),
      skippable: z.boolean().describe(
        "Whether the user can skip creatives served to this site. This will act as default for new placements created under this site.",
      ).optional(),
    }).describe("Skippable Settings").optional(),
    transcodeSettings: z.object({
      enabledVideoFormats: z.array(z.number().int()).describe(
        "Allowlist of video formats to be served to this site template. Set this list to null or empty to serve all video formats.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteTranscodeSetting".',
      ).optional(),
    }).describe("Transcode Settings").optional(),
  }).describe("Video Settings").optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  adServingPlatformId: z.string().optional(),
  approved: z.boolean().optional(),
  directorySiteId: z.string().optional(),
  directorySiteIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  id: z.string(),
  idDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  keyName: z.string().optional(),
  kind: z.string().optional(),
  name: z.string().optional(),
  siteContacts: z.array(z.object({
    address: z.string(),
    contactType: z.string(),
    email: z.string(),
    firstName: z.string(),
    id: z.string(),
    lastName: z.string(),
    phone: z.string(),
    title: z.string(),
  })).optional(),
  siteSettings: z.object({
    activeViewOptOut: z.boolean(),
    adBlockingOptOut: z.boolean(),
    disableNewCookie: z.boolean(),
    tagSetting: z.object({
      additionalKeyValues: z.string(),
      includeClickThroughUrls: z.boolean(),
      includeClickTracking: z.boolean(),
      includeUnescapedlpurlMacro: z.boolean(),
      keywordOption: z.string(),
    }),
    videoActiveViewOptOutTemplate: z.boolean(),
    vpaidAdapterChoiceTemplate: z.string(),
  }).optional(),
  subaccountId: z.string().optional(),
  videoSettings: z.object({
    companionSettings: z.object({
      companionsDisabled: z.boolean(),
      enabledSizes: z.array(z.object({
        height: z.number(),
        iab: z.boolean(),
        id: z.string(),
        kind: z.string(),
        width: z.number(),
      })),
      imageOnly: z.boolean(),
      kind: z.string(),
    }),
    kind: z.string(),
    obaEnabled: z.boolean(),
    obaSettings: z.object({
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
    }),
    orientation: z.string(),
    publisherSpecificationId: z.string(),
    skippableSettings: z.object({
      kind: z.string(),
      progressOffset: z.object({
        offsetPercentage: z.number(),
        offsetSeconds: z.number(),
      }),
      skipOffset: z.object({
        offsetPercentage: z.number(),
        offsetSeconds: z.number(),
      }),
      skippable: z.boolean(),
    }),
    transcodeSettings: z.object({
      enabledVideoFormats: z.array(z.number()),
      kind: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this site. This is a read-only field that can be left blank.",
  ).optional(),
  adServingPlatformId: z.string().describe(
    "Optional. Ad serving platform ID to identify the ad serving platform used by the site. Measurement partners can use this field to add ad-server specific macros. If set, this value acts as the default during placement creation. Possible values are: * `1`, Adelphic * `2`, Adform * `3`, Adobe * `4`, Amobee * `5`, Basis (Centro) * `6`, Beeswax * `7`, Amazon * `8`, DV360 (DBM) * `9`, Innovid * `10`, MediaMath * `11`, Roku OneView DSP * `12`, TabMo Hawk * `13`, The Trade Desk * `14`, Xandr Invest DSP * `15`, Yahoo DSP * `16`, Zeta Global * `17`, Scaleout * `18`, Bidtellect * `19`, Unicorn * `20`, Teads * `21`, Quantcast * `22`, Cognitiv * `23`, AdTheorent * `24`, DeepIntent * `25`, Pulsepoint",
  ).optional(),
  approved: z.boolean().describe("Whether this site is approved.").optional(),
  directorySiteId: z.string().describe(
    "Directory site associated with this site. This is a required field that is read-only after insertion.",
  ).optional(),
  directorySiteIdDimensionValue: z.object({
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
  id: z.string().describe(
    "ID of this site. This is a read-only, auto-generated field.",
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
  keyName: z.string().describe(
    "Key name of this site. This is a read-only, auto-generated field.",
  ).optional(),
  name: z.string().describe(
    "Name of this site.This is a required field. Must be less than 128 characters long. If this site is under a subaccount, the name must be unique among sites of the same subaccount. Otherwise, this site is a top-level site, and the name must be unique among top-level sites of the same account.",
  ).optional(),
  siteContacts: z.array(z.object({
    address: z.string().describe("Address of this site contact.").optional(),
    contactType: z.enum(["SALES_PERSON", "TRAFFICKER"]).describe(
      "Site contact type.",
    ).optional(),
    email: z.string().describe(
      "Email address of this site contact. This is a required field.",
    ).optional(),
    firstName: z.string().describe("First name of this site contact.")
      .optional(),
    id: z.string().describe(
      "ID of this site contact. This is a read-only, auto-generated field.",
    ).optional(),
    lastName: z.string().describe("Last name of this site contact.").optional(),
    phone: z.string().describe("Primary phone number of this site contact.")
      .optional(),
    title: z.string().describe("Title or designation of this site contact.")
      .optional(),
  })).describe("Site contacts.").optional(),
  siteSettings: z.object({
    activeViewOptOut: z.boolean().describe(
      "Whether active view creatives are disabled for this site.",
    ).optional(),
    adBlockingOptOut: z.boolean().describe(
      "Whether this site opts out of ad blocking. When true, ad blocking is disabled for all placements under the site, regardless of the individual placement settings. When false, the campaign and placement settings take effect.",
    ).optional(),
    disableNewCookie: z.boolean().describe(
      "Whether new cookies are disabled for this site.",
    ).optional(),
    tagSetting: z.object({
      additionalKeyValues: z.string().describe(
        "Additional key-values to be included in tags. Each key-value pair must be of the form key=value, and pairs must be separated by a semicolon (;). Keys and values must not contain commas. For example, id=2;color=red is a valid value for this field.",
      ).optional(),
      includeClickThroughUrls: z.boolean().describe(
        "Whether static landing page URLs should be included in the tags. New placements will default to the value set on their site.",
      ).optional(),
      includeClickTracking: z.boolean().describe(
        "Whether click-tracking string should be included in the tags.",
      ).optional(),
      includeUnescapedlpurlMacro: z.boolean().describe(
        "Optional. Indicates that the unescapedlpurl macro should be included in the tag for the static landing page. New placements will default to the value set on their site.",
      ).optional(),
      keywordOption: z.enum([
        "PLACEHOLDER_WITH_LIST_OF_KEYWORDS",
        "IGNORE",
        "GENERATE_SEPARATE_TAG_FOR_EACH_KEYWORD",
      ]).describe(
        "Option specifying how keywords are embedded in ad tags. This setting can be used to specify whether keyword placeholders are inserted in placement tags for this site. Publishers can then add keywords to those placeholders.",
      ).optional(),
    }).describe("Tag Settings").optional(),
    videoActiveViewOptOutTemplate: z.boolean().describe(
      "Whether Verification and ActiveView for in-stream video creatives are disabled by default for new placements created under this site. This value will be used to populate the placement.videoActiveViewOptOut field, when no value is specified for the new placement.",
    ).optional(),
    vpaidAdapterChoiceTemplate: z.enum(["DEFAULT", "FLASH", "HTML5", "BOTH"])
      .describe(
        "Default VPAID adapter setting for new placements created under this site. This value will be used to populate the placements.vpaidAdapterChoice field, when no value is specified for the new placement. Controls which VPAID format the measurement adapter will use for in-stream video creatives assigned to the placement. The publisher's specifications will typically determine this setting. For VPAID creatives, the adapter format will match the VPAID format (HTML5 VPAID creatives use the HTML5 adapter). *Note:* Flash is no longer supported. This field now defaults to HTML5 when the following values are provided: FLASH, BOTH.",
      ).optional(),
  }).describe("Site Settings").optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this site. This is a read-only field that can be left blank.",
  ).optional(),
  videoSettings: z.object({
    companionSettings: z.object({
      companionsDisabled: z.boolean().describe(
        "Whether companions are disabled for this site template.",
      ).optional(),
      enabledSizes: z.array(z.object({
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
        "Allowlist of companion sizes to be served via this site template. Set this list to null or empty to serve all companion sizes.",
      ).optional(),
      imageOnly: z.boolean().describe(
        "Whether to serve only static images as companions.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteCompanionSetting".',
      ).optional(),
    }).describe("Companion Settings").optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteVideoSettings".',
    ).optional(),
    obaEnabled: z.boolean().describe(
      "Whether OBA icons are enabled for this placement.",
    ).optional(),
    obaSettings: z.object({
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
    orientation: z.enum(["ANY", "LANDSCAPE", "PORTRAIT"]).describe(
      "Orientation of a site template used for video. This will act as default for new placements created under this site.",
    ).optional(),
    publisherSpecificationId: z.string().describe(
      "Publisher specification ID used to identify site-associated publisher requirements and automatically populate transcode settings. If publisher specification ID is specified, it will take precedence over transcode settings. Possible values are: * `1`, Hulu * `2`, NBC * `3`, CBS * `4`, CBS Desktop * `5`, Discovery * `6`, VEVO HD * `7`, VEVO Vertical * `8`, Fox * `9`, CW Network * `10`, Disney * `11`, IGN * `12`, NFL.com * `13`, Turner Broadcasting * `14`, Tubi on Fox * `15`, Hearst Corporation * `16`, Twitch Desktop * `17`, ABC * `18`, Univision * `19`, MLB.com * `20`, MLB.com Mobile * `21`, MLB.com OTT * `22`, Polsat * `23`, TVN * `24`, Mediaset * `25`, Antena 3 * `26`, Mediamond * `27`, Sky Italia * `28`, Tubi on CBS * `29`, Spotify * `30`, Paramount * `31`, Max",
    ).optional(),
    skippableSettings: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteSkippableSetting".',
      ).optional(),
      progressOffset: z.object({
        offsetPercentage: z.number().int().describe(
          "Duration, as a percentage of video duration. Do not set when offsetSeconds is set. Acceptable values are 0 to 100, inclusive.",
        ).optional(),
        offsetSeconds: z.number().int().describe(
          "Duration, in seconds. Do not set when offsetPercentage is set. Acceptable values are 0 to 86399, inclusive.",
        ).optional(),
      }).describe("Video Offset").optional(),
      skipOffset: z.object({
        offsetPercentage: z.number().int().describe(
          "Duration, as a percentage of video duration. Do not set when offsetSeconds is set. Acceptable values are 0 to 100, inclusive.",
        ).optional(),
        offsetSeconds: z.number().int().describe(
          "Duration, in seconds. Do not set when offsetPercentage is set. Acceptable values are 0 to 86399, inclusive.",
        ).optional(),
      }).describe("Video Offset").optional(),
      skippable: z.boolean().describe(
        "Whether the user can skip creatives served to this site. This will act as default for new placements created under this site.",
      ).optional(),
    }).describe("Skippable Settings").optional(),
    transcodeSettings: z.object({
      enabledVideoFormats: z.array(z.number().int()).describe(
        "Allowlist of video formats to be served to this site template. Set this list to null or empty to serve all video formats.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#siteTranscodeSetting".',
      ).optional(),
    }).describe("Transcode Settings").optional(),
  }).describe("Video Settings").optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 Sites. Registered at `@swamp/gcp/dfareporting/sites`. */
export const model = {
  type: "@swamp/gcp/dfareporting/sites",
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
      description: "Contains properties of a site.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sites",
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
        if (g["adServingPlatformId"] !== undefined) {
          body["adServingPlatformId"] = g["adServingPlatformId"];
        }
        if (g["approved"] !== undefined) body["approved"] = g["approved"];
        if (g["directorySiteId"] !== undefined) {
          body["directorySiteId"] = g["directorySiteId"];
        }
        if (g["directorySiteIdDimensionValue"] !== undefined) {
          body["directorySiteIdDimensionValue"] =
            g["directorySiteIdDimensionValue"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["keyName"] !== undefined) body["keyName"] = g["keyName"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["siteContacts"] !== undefined) {
          body["siteContacts"] = g["siteContacts"];
        }
        if (g["siteSettings"] !== undefined) {
          body["siteSettings"] = g["siteSettings"];
        }
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["videoSettings"] !== undefined) {
          body["videoSettings"] = g["videoSettings"];
        }
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
      description: "Get a sites",
      arguments: z.object({
        identifier: z.string().describe("The id of the sites"),
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
      description: "Update sites attributes",
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
        if (g["adServingPlatformId"] !== undefined) {
          body["adServingPlatformId"] = g["adServingPlatformId"];
        }
        if (g["approved"] !== undefined) body["approved"] = g["approved"];
        if (g["directorySiteId"] !== undefined) {
          body["directorySiteId"] = g["directorySiteId"];
        }
        if (g["directorySiteIdDimensionValue"] !== undefined) {
          body["directorySiteIdDimensionValue"] =
            g["directorySiteIdDimensionValue"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["keyName"] !== undefined) body["keyName"] = g["keyName"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["siteContacts"] !== undefined) {
          body["siteContacts"] = g["siteContacts"];
        }
        if (g["siteSettings"] !== undefined) {
          body["siteSettings"] = g["siteSettings"];
        }
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["videoSettings"] !== undefined) {
          body["videoSettings"] = g["videoSettings"];
        }
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
      description: "Sync sites state from GCP",
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
  },
};
