// Auto-generated extension model for @swamp/gcp/dfareporting/placements
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 Placements.
 *
 * Contains properties of a placement.
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
  "id": "dfareporting.placements.get",
  "path": "userprofiles/{+profileId}/placements/{+id}",
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
  "id": "dfareporting.placements.insert",
  "path": "userprofiles/{+profileId}/placements",
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
  "id": "dfareporting.placements.update",
  "path": "userprofiles/{+profileId}/placements",
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
  "id": "dfareporting.placements.list",
  "path": "userprofiles/{+profileId}/placements",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "activeStatus": {
      "location": "query",
    },
    "advertiserIds": {
      "location": "query",
    },
    "campaignIds": {
      "location": "query",
    },
    "compatibilities": {
      "location": "query",
    },
    "contentCategoryIds": {
      "location": "query",
    },
    "directorySiteIds": {
      "location": "query",
    },
    "groupIds": {
      "location": "query",
    },
    "ids": {
      "location": "query",
    },
    "maxEndDate": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "maxStartDate": {
      "location": "query",
    },
    "minEndDate": {
      "location": "query",
    },
    "minStartDate": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "paymentSource": {
      "location": "query",
    },
    "placementStrategyIds": {
      "location": "query",
    },
    "pricingTypes": {
      "location": "query",
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "searchString": {
      "location": "query",
    },
    "siteIds": {
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
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this placement. This field can be left blank.",
  ).optional(),
  activeStatus: z.enum([
    "PLACEMENT_STATUS_UNKNOWN",
    "PLACEMENT_STATUS_ACTIVE",
    "PLACEMENT_STATUS_INACTIVE",
    "PLACEMENT_STATUS_ARCHIVED",
    "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED",
  ]).describe(
    "Whether this placement is active, inactive, archived or permanently archived.",
  ).optional(),
  adBlockingOptOut: z.boolean().describe(
    "Whether this placement opts out of ad blocking. When true, ad blocking is disabled for this placement. When false, the campaign and site settings take effect.",
  ).optional(),
  adServingPlatformId: z.string().describe(
    "Optional. Ad serving platform ID to identify the ad serving platform used by the placement. Measurement partners can use this field to add ad-server specific macros. Possible values are: * `1`, Adelphic * `2`, Adform * `3`, Adobe * `4`, Amobee * `5`, Basis (Centro) * `6`, Beeswax * `7`, Amazon * `8`, DV360 (DBM) * `9`, Innovid * `10`, MediaMath * `11`, Roku OneView DSP * `12`, TabMo Hawk * `13`, The Trade Desk * `14`, Xandr Invest DSP * `15`, Yahoo DSP * `16`, Zeta Global * `17`, Scaleout * `18`, Bidtellect * `19`, Unicorn * `20`, Teads * `21`, Quantcast * `22`, Cognitiv * `23`, AdTheorent * `24`, DeepIntent * `25`, Pulsepoint",
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
    "Additional sizes associated with this placement. When inserting or updating a placement, only the size ID field is used.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this placement. This field can be left blank.",
  ).optional(),
  advertiserIdDimensionValue: z.object({
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
  allowOnYoutube: z.boolean().describe(
    "Optional. Whether the placement is enabled for YouTube integration.",
  ).optional(),
  campaignId: z.string().describe(
    "Campaign ID of this placement. This field is a required field on insertion.",
  ).optional(),
  campaignIdDimensionValue: z.object({
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
  comment: z.string().describe("Comments for this placement.").optional(),
  compatibility: z.enum([
    "DISPLAY",
    "DISPLAY_INTERSTITIAL",
    "APP",
    "APP_INTERSTITIAL",
    "IN_STREAM_VIDEO",
    "IN_STREAM_AUDIO",
  ]).describe(
    "Placement compatibility. DISPLAY and DISPLAY_INTERSTITIAL refer to rendering on desktop, on mobile devices or in mobile apps for regular or interstitial ads respectively. APP and APP_INTERSTITIAL are no longer allowed for new placement insertions. Instead, use DISPLAY or DISPLAY_INTERSTITIAL. IN_STREAM_VIDEO refers to rendering in in-stream video ads developed with the VAST standard. This field is required on insertion.",
  ).optional(),
  contentCategoryId: z.string().describe(
    "ID of the content category assigned to this placement.",
  ).optional(),
  conversionDomainOverride: z.object({
    conversionDomains: z.array(z.object({
      conversionDomainId: z.string().optional(),
      conversionDomainValue: z.string().optional(),
    })).optional(),
  }).optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  directorySiteId: z.string().describe(
    "Directory site ID of this placement. On insert, you must set either this field or the siteId field to specify the site associated with this placement. This is a required field that is read-only after insertion.",
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
  externalId: z.string().describe("External ID for this placement.").optional(),
  id: z.string().describe(
    "ID of this placement. This is a read-only, auto-generated field.",
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
    "Key name of this placement. This is a read-only, auto-generated field.",
  ).optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  lookbackConfiguration: z.object({
    clickDuration: z.number().int().describe(
      "Lookback window, in days, from the last time a given user clicked on one of your ads. If you enter 0, clicks will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
    ).optional(),
    postImpressionActivitiesDuration: z.number().int().describe(
      "Lookback window, in days, from the last time a given user viewed one of your ads. If you enter 0, impressions will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
    ).optional(),
  }).describe("Lookback configuration settings.").optional(),
  name: z.string().describe(
    "Name of this placement.This is a required field and must be less than or equal to 512 characters long.",
  ).optional(),
  partnerWrappingData: z.object({
    linkStatus: z.enum([
      "MEASUREMENT_PARTNER_UNLINKED",
      "MEASUREMENT_PARTNER_LINKED",
      "MEASUREMENT_PARTNER_LINK_PENDING",
      "MEASUREMENT_PARTNER_LINK_FAILURE",
      "MEASUREMENT_PARTNER_LINK_OPT_OUT",
      "MEASUREMENT_PARTNER_LINK_OPT_OUT_PENDING",
      "MEASUREMENT_PARTNER_LINK_WRAPPING_PENDING",
      "MEASUREMENT_PARTNER_MODE_CHANGE_PENDING",
      "MEASUREMENT_PARTNER_UNLINK_PENDING",
    ]).describe("Placement wrapping status.").optional(),
    measurementPartner: z.enum(["NONE", "INTEGRAL_AD_SCIENCE", "DOUBLE_VERIFY"])
      .describe("Measurement partner used for wrapping the placement.")
      .optional(),
    tagWrappingMode: z.enum([
      "NONE",
      "BLOCKING",
      "MONITORING",
      "MONITORING_READ_ONLY",
      "VIDEO_PIXEL_MONITORING",
      "TRACKING",
      "VPAID_MONITORING",
      "VPAID_BLOCKING",
      "NON_VPAID_MONITORING",
      "VPAID_ONLY_MONITORING",
      "VPAID_ONLY_BLOCKING",
      "VPAID_ONLY_FILTERING",
      "VPAID_FILTERING",
      "NON_VPAID_FILTERING",
      "BLOCKING_FILTERING_VPAID",
      "BLOCKING_FILTERING_VPAID_ONLY",
    ]).describe("Measurement mode for the wrapped placement.").optional(),
    wrappedTag: z.string().describe(
      "Tag provided by the measurement partner during wrapping.",
    ).optional(),
  }).describe("Placement tag wrapping").optional(),
  paymentApproved: z.boolean().describe(
    "Whether payment was approved for this placement. This is a read-only field relevant only to publisher-paid placements.",
  ).optional(),
  paymentSource: z.enum(["PLACEMENT_AGENCY_PAID", "PLACEMENT_PUBLISHER_PAID"])
    .describe(
      "Payment source for this placement. This is a required field that is read-only after insertion.",
    ).optional(),
  placementGroupId: z.string().describe(
    "ID of this placement's group, if applicable.",
  ).optional(),
  placementGroupIdDimensionValue: z.object({
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
  placementStrategyId: z.string().describe(
    "ID of the placement strategy assigned to this placement.",
  ).optional(),
  pricingSchedule: z.object({
    capCostOption: z.enum([
      "CAP_COST_NONE",
      "CAP_COST_MONTHLY",
      "CAP_COST_CUMULATIVE",
    ]).describe("Placement cap cost option.").optional(),
    endDate: z.string().optional(),
    flighted: z.boolean().describe(
      "Whether this placement is flighted. If true, pricing periods will be computed automatically.",
    ).optional(),
    floodlightActivityId: z.string().describe(
      "Floodlight activity ID associated with this placement. This field should be set when placement pricing type is set to PRICING_TYPE_CPA.",
    ).optional(),
    pricingPeriods: z.array(z.object({
      endDate: z.string().optional(),
      pricingComment: z.string().describe("Comments for this pricing period.")
        .optional(),
      rateOrCostNanos: z.string().describe(
        "Rate or cost of this pricing period in nanos (i.e., multiplied by 1000000000). Acceptable values are 0 to 1000000000000000000, inclusive.",
      ).optional(),
      startDate: z.string().optional(),
      units: z.string().describe(
        "Units of this pricing period. Acceptable values are 0 to 10000000000, inclusive.",
      ).optional(),
    })).describe("Pricing periods for this placement.").optional(),
    pricingType: z.enum([
      "PRICING_TYPE_CPM",
      "PRICING_TYPE_CPC",
      "PRICING_TYPE_CPA",
      "PRICING_TYPE_FLAT_RATE_IMPRESSIONS",
      "PRICING_TYPE_FLAT_RATE_CLICKS",
      "PRICING_TYPE_CPM_ACTIVEVIEW",
    ]).describe("Placement pricing type. This field is required on insertion.")
      .optional(),
    startDate: z.string().optional(),
    testingStartDate: z.string().optional(),
  }).describe("Pricing Schedule").optional(),
  primary: z.boolean().describe(
    "Whether this placement is the primary placement of a roadblock (placement group). You cannot change this field from true to false. Setting this field to true will automatically set the primary field on the original primary placement of the roadblock to false, and it will automatically set the roadblock's primaryPlacementId field to the ID of this placement.",
  ).optional(),
  publisherUpdateInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  siteId: z.string().describe(
    "Site ID associated with this placement. On insert, you must set either this field or the directorySiteId field to specify the site associated with this placement. This is a required field that is read-only after insertion.",
  ).optional(),
  siteIdDimensionValue: z.object({
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
  siteServed: z.boolean().describe(
    "Optional. Whether the ads in the placement are served by another platform and CM is only used for tracking or they are served by CM. A false value indicates the ad is served by CM.",
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
  sslRequired: z.boolean().describe(
    "Whether creatives assigned to this placement must be SSL-compliant.",
  ).optional(),
  status: z.enum([
    "PENDING_REVIEW",
    "PAYMENT_ACCEPTED",
    "PAYMENT_REJECTED",
    "ACKNOWLEDGE_REJECTION",
    "ACKNOWLEDGE_ACCEPTANCE",
    "DRAFT",
  ]).describe("Third-party placement status.").optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this placement. This field can be left blank.",
  ).optional(),
  tagFormats: z.array(
    z.enum([
      "PLACEMENT_TAG_STANDARD",
      "PLACEMENT_TAG_IFRAME_JAVASCRIPT",
      "PLACEMENT_TAG_IFRAME_ILAYER",
      "PLACEMENT_TAG_INTERNAL_REDIRECT",
      "PLACEMENT_TAG_JAVASCRIPT",
      "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT",
      "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT",
      "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT",
      "PLACEMENT_TAG_CLICK_COMMANDS",
      "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH",
      "PLACEMENT_TAG_TRACKING",
      "PLACEMENT_TAG_TRACKING_IFRAME",
      "PLACEMENT_TAG_TRACKING_JAVASCRIPT",
      "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3",
      "PLACEMENT_TAG_IFRAME_JAVASCRIPT_LEGACY",
      "PLACEMENT_TAG_JAVASCRIPT_LEGACY",
      "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT_LEGACY",
      "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT_LEGACY",
      "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4",
      "PLACEMENT_TAG_TRACKING_THIRD_PARTY_MEASUREMENT",
    ]),
  ).describe(
    'Tag formats to generate for this placement. This field is required on insertion. Acceptable values are: - "PLACEMENT_TAG_STANDARD" - "PLACEMENT_TAG_IFRAME_JAVASCRIPT" - "PLACEMENT_TAG_IFRAME_ILAYER" - "PLACEMENT_TAG_INTERNAL_REDIRECT" - "PLACEMENT_TAG_JAVASCRIPT" - "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT" - "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT" - "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT" - "PLACEMENT_TAG_CLICK_COMMANDS" - "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH" - "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3" - "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4" - "PLACEMENT_TAG_TRACKING" - "PLACEMENT_TAG_TRACKING_IFRAME" - "PLACEMENT_TAG_TRACKING_JAVASCRIPT"',
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
  videoActiveViewOptOut: z.boolean().describe(
    "Whether Verification and ActiveView are disabled for in-stream video creatives for this placement. The same setting videoActiveViewOptOut exists on the site level -- the opt out occurs if either of these settings are true. These settings are distinct from DirectorySites.settings.activeViewOptOut or Sites.siteSettings.activeViewOptOut which only apply to display ads. However, Accounts.activeViewOptOut opts out both video traffic, as well as display ads, from Verification and ActiveView.",
  ).optional(),
  videoSettings: z.object({
    companionSettings: z.object({
      companionsDisabled: z.boolean().describe(
        "Whether companions are disabled for this placement.",
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
        "Allowlist of companion sizes to be served to this placement. Set this list to null or empty to serve all companion sizes.",
      ).optional(),
      imageOnly: z.boolean().describe(
        "Whether to serve only static images as companions.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#companionSetting".',
      ).optional(),
    }).describe("Companion Settings").optional(),
    durationSeconds: z.number().int().describe(
      "Duration of a video placement in seconds.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#videoSettings".',
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
      "Orientation of a video placement. If this value is set, placement will return assets matching the specified orientation.",
    ).optional(),
    publisherSpecificationId: z.string().describe(
      "Publisher specification ID of a video placement. Possible values are: * `1`, Hulu * `2`, NBC * `3`, CBS * `4`, CBS Desktop * `5`, Discovery * `6`, VEVO HD * `7`, VEVO Vertical * `8`, Fox * `9`, CW Network * `10`, Disney * `11`, IGN * `12`, NFL.com * `13`, Turner Broadcasting * `14`, Tubi on Fox * `15`, Hearst Corporation * `16`, Twitch Desktop * `17`, ABC * `18`, Univision * `19`, MLB.com * `20`, MLB.com Mobile * `21`, MLB.com OTT * `22`, Polsat * `23`, TVN * `24`, Mediaset * `25`, Antena 3 * `26`, Mediamond * `27`, Sky Italia * `28`, Tubi on CBS * `29`, Spotify * `30`, Paramount * `31`, Max",
    ).optional(),
    skippableSettings: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#skippableSetting".',
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
        "Whether the user can skip creatives served to this placement.",
      ).optional(),
    }).describe("Skippable Settings").optional(),
    transcodeSettings: z.object({
      enabledVideoFormats: z.array(z.number().int()).describe(
        "Allowlist of video formats to be served to this placement. Set this list to null or empty to serve all video formats.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#transcodeSetting".',
      ).optional(),
    }).describe("Transcode Settings").optional(),
  }).describe("Video Settings").optional(),
  vpaidAdapterChoice: z.enum(["DEFAULT", "FLASH", "HTML5", "BOTH"]).describe(
    "VPAID adapter setting for this placement. Controls which VPAID format the measurement adapter will use for in-stream video creatives assigned to this placement. *Note:* Flash is no longer supported. This field now defaults to HTML5 when the following values are provided: FLASH, BOTH.",
  ).optional(),
  wrappingOptOut: z.boolean().describe(
    "Whether this placement opts out of tag wrapping.",
  ).optional(),
  youtubeSettings: z.object({
    businessLogoCreativeIds: z.array(z.string()).describe(
      "Optional. The IDs of the creatives to use for the business logo. Currently only one creative is supported.",
    ).optional(),
    businessName: z.string().describe("Optional. The business name.")
      .optional(),
    callToActions: z.array(
      z.enum([
        "CALL_TO_ACTION_UNKNOWN",
        "CALL_TO_ACTION_LEARN_MORE",
        "CALL_TO_ACTION_GET_QUOTE",
        "CALL_TO_ACTION_APPLY_NOW",
        "CALL_TO_ACTION_SIGN_UP",
        "CALL_TO_ACTION_CONTACT_US",
        "CALL_TO_ACTION_SUBSCRIBE",
        "CALL_TO_ACTION_DOWNLOAD",
        "CALL_TO_ACTION_BOOK_NOW",
        "CALL_TO_ACTION_GET_OFFER",
        "CALL_TO_ACTION_SHOP_NOW",
        "CALL_TO_ACTION_VISIT_STORE",
        "CALL_TO_ACTION_CALL_NOW",
        "CALL_TO_ACTION_VIEW_MENU",
        "CALL_TO_ACTION_TEST_DRIVE",
        "CALL_TO_ACTION_SCHEDULE_NOW",
        "CALL_TO_ACTION_BUY_NOW",
        "CALL_TO_ACTION_DONATE_NOW",
        "CALL_TO_ACTION_ORDER_NOW",
        "CALL_TO_ACTION_PLAY_NOW",
        "CALL_TO_ACTION_SEE_MORE",
        "CALL_TO_ACTION_START_NOW",
        "CALL_TO_ACTION_VISIT_SITE",
        "CALL_TO_ACTION_WATCH_NOW",
      ]),
    ).describe(
      "Optional. The call to actions. Currently only one call to action is supported.",
    ).optional(),
    descriptions: z.array(z.string()).describe(
      "Optional. The descriptions. Currently only one description is supported.",
    ).optional(),
    headlines: z.array(z.string()).describe(
      "Optional. The headlines associated with the call to actions. Currently only one headline is supported.",
    ).optional(),
    longHeadlines: z.array(z.string()).describe(
      "Optional. The long headlines. Currently only one long headline is supported.",
    ).optional(),
  }).describe("Contains the YouTube settings.").optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  activeStatus: z.string().optional(),
  adBlockingOptOut: z.boolean().optional(),
  adServingPlatformId: z.string().optional(),
  additionalSizes: z.array(z.object({
    height: z.number(),
    iab: z.boolean(),
    id: z.string(),
    kind: z.string(),
    width: z.number(),
  })).optional(),
  advertiserId: z.string().optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  allowOnYoutube: z.boolean().optional(),
  campaignId: z.string().optional(),
  campaignIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  comment: z.string().optional(),
  compatibility: z.string().optional(),
  contentCategoryId: z.string().optional(),
  conversionDomainOverride: z.object({
    conversionDomains: z.array(z.object({
      conversionDomainId: z.string(),
      conversionDomainValue: z.string(),
    })),
  }).optional(),
  createInfo: z.object({
    time: z.string(),
  }).optional(),
  directorySiteId: z.string().optional(),
  directorySiteIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  externalId: z.string().optional(),
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
  lastModifiedInfo: z.object({
    time: z.string(),
  }).optional(),
  lookbackConfiguration: z.object({
    clickDuration: z.number(),
    postImpressionActivitiesDuration: z.number(),
  }).optional(),
  name: z.string().optional(),
  partnerWrappingData: z.object({
    linkStatus: z.string(),
    measurementPartner: z.string(),
    tagWrappingMode: z.string(),
    wrappedTag: z.string(),
  }).optional(),
  paymentApproved: z.boolean().optional(),
  paymentSource: z.string().optional(),
  placementGroupId: z.string().optional(),
  placementGroupIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  placementStrategyId: z.string().optional(),
  pricingSchedule: z.object({
    capCostOption: z.string(),
    endDate: z.string(),
    flighted: z.boolean(),
    floodlightActivityId: z.string(),
    pricingPeriods: z.array(z.object({
      endDate: z.string(),
      pricingComment: z.string(),
      rateOrCostNanos: z.string(),
      startDate: z.string(),
      units: z.string(),
    })),
    pricingType: z.string(),
    startDate: z.string(),
    testingStartDate: z.string(),
  }).optional(),
  primary: z.boolean().optional(),
  publisherUpdateInfo: z.object({
    time: z.string(),
  }).optional(),
  siteId: z.string().optional(),
  siteIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  siteServed: z.boolean().optional(),
  size: z.object({
    height: z.number(),
    iab: z.boolean(),
    id: z.string(),
    kind: z.string(),
    width: z.number(),
  }).optional(),
  sslRequired: z.boolean().optional(),
  status: z.string().optional(),
  subaccountId: z.string().optional(),
  tagFormats: z.array(z.string()).optional(),
  tagSetting: z.object({
    additionalKeyValues: z.string(),
    includeClickThroughUrls: z.boolean(),
    includeClickTracking: z.boolean(),
    includeUnescapedlpurlMacro: z.boolean(),
    keywordOption: z.string(),
  }).optional(),
  videoActiveViewOptOut: z.boolean().optional(),
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
    durationSeconds: z.number(),
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
  vpaidAdapterChoice: z.string().optional(),
  wrappingOptOut: z.boolean().optional(),
  youtubeSettings: z.object({
    businessLogoCreativeIds: z.array(z.string()),
    businessName: z.string(),
    callToActions: z.array(z.string()),
    descriptions: z.array(z.string()),
    headlines: z.array(z.string()),
    longHeadlines: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this placement. This field can be left blank.",
  ).optional(),
  activeStatus: z.enum([
    "PLACEMENT_STATUS_UNKNOWN",
    "PLACEMENT_STATUS_ACTIVE",
    "PLACEMENT_STATUS_INACTIVE",
    "PLACEMENT_STATUS_ARCHIVED",
    "PLACEMENT_STATUS_PERMANENTLY_ARCHIVED",
  ]).describe(
    "Whether this placement is active, inactive, archived or permanently archived.",
  ).optional(),
  adBlockingOptOut: z.boolean().describe(
    "Whether this placement opts out of ad blocking. When true, ad blocking is disabled for this placement. When false, the campaign and site settings take effect.",
  ).optional(),
  adServingPlatformId: z.string().describe(
    "Optional. Ad serving platform ID to identify the ad serving platform used by the placement. Measurement partners can use this field to add ad-server specific macros. Possible values are: * `1`, Adelphic * `2`, Adform * `3`, Adobe * `4`, Amobee * `5`, Basis (Centro) * `6`, Beeswax * `7`, Amazon * `8`, DV360 (DBM) * `9`, Innovid * `10`, MediaMath * `11`, Roku OneView DSP * `12`, TabMo Hawk * `13`, The Trade Desk * `14`, Xandr Invest DSP * `15`, Yahoo DSP * `16`, Zeta Global * `17`, Scaleout * `18`, Bidtellect * `19`, Unicorn * `20`, Teads * `21`, Quantcast * `22`, Cognitiv * `23`, AdTheorent * `24`, DeepIntent * `25`, Pulsepoint",
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
    "Additional sizes associated with this placement. When inserting or updating a placement, only the size ID field is used.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this placement. This field can be left blank.",
  ).optional(),
  advertiserIdDimensionValue: z.object({
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
  allowOnYoutube: z.boolean().describe(
    "Optional. Whether the placement is enabled for YouTube integration.",
  ).optional(),
  campaignId: z.string().describe(
    "Campaign ID of this placement. This field is a required field on insertion.",
  ).optional(),
  campaignIdDimensionValue: z.object({
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
  comment: z.string().describe("Comments for this placement.").optional(),
  compatibility: z.enum([
    "DISPLAY",
    "DISPLAY_INTERSTITIAL",
    "APP",
    "APP_INTERSTITIAL",
    "IN_STREAM_VIDEO",
    "IN_STREAM_AUDIO",
  ]).describe(
    "Placement compatibility. DISPLAY and DISPLAY_INTERSTITIAL refer to rendering on desktop, on mobile devices or in mobile apps for regular or interstitial ads respectively. APP and APP_INTERSTITIAL are no longer allowed for new placement insertions. Instead, use DISPLAY or DISPLAY_INTERSTITIAL. IN_STREAM_VIDEO refers to rendering in in-stream video ads developed with the VAST standard. This field is required on insertion.",
  ).optional(),
  contentCategoryId: z.string().describe(
    "ID of the content category assigned to this placement.",
  ).optional(),
  conversionDomainOverride: z.object({
    conversionDomains: z.array(z.object({
      conversionDomainId: z.string().optional(),
      conversionDomainValue: z.string().optional(),
    })).optional(),
  }).optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  directorySiteId: z.string().describe(
    "Directory site ID of this placement. On insert, you must set either this field or the siteId field to specify the site associated with this placement. This is a required field that is read-only after insertion.",
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
  externalId: z.string().describe("External ID for this placement.").optional(),
  id: z.string().describe(
    "ID of this placement. This is a read-only, auto-generated field.",
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
    "Key name of this placement. This is a read-only, auto-generated field.",
  ).optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  lookbackConfiguration: z.object({
    clickDuration: z.number().int().describe(
      "Lookback window, in days, from the last time a given user clicked on one of your ads. If you enter 0, clicks will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
    ).optional(),
    postImpressionActivitiesDuration: z.number().int().describe(
      "Lookback window, in days, from the last time a given user viewed one of your ads. If you enter 0, impressions will not be considered as triggering events for floodlight tracking. If you leave this field blank, the default value for your account will be used. Acceptable values are 0 to 90, inclusive.",
    ).optional(),
  }).describe("Lookback configuration settings.").optional(),
  name: z.string().describe(
    "Name of this placement.This is a required field and must be less than or equal to 512 characters long.",
  ).optional(),
  partnerWrappingData: z.object({
    linkStatus: z.enum([
      "MEASUREMENT_PARTNER_UNLINKED",
      "MEASUREMENT_PARTNER_LINKED",
      "MEASUREMENT_PARTNER_LINK_PENDING",
      "MEASUREMENT_PARTNER_LINK_FAILURE",
      "MEASUREMENT_PARTNER_LINK_OPT_OUT",
      "MEASUREMENT_PARTNER_LINK_OPT_OUT_PENDING",
      "MEASUREMENT_PARTNER_LINK_WRAPPING_PENDING",
      "MEASUREMENT_PARTNER_MODE_CHANGE_PENDING",
      "MEASUREMENT_PARTNER_UNLINK_PENDING",
    ]).describe("Placement wrapping status.").optional(),
    measurementPartner: z.enum(["NONE", "INTEGRAL_AD_SCIENCE", "DOUBLE_VERIFY"])
      .describe("Measurement partner used for wrapping the placement.")
      .optional(),
    tagWrappingMode: z.enum([
      "NONE",
      "BLOCKING",
      "MONITORING",
      "MONITORING_READ_ONLY",
      "VIDEO_PIXEL_MONITORING",
      "TRACKING",
      "VPAID_MONITORING",
      "VPAID_BLOCKING",
      "NON_VPAID_MONITORING",
      "VPAID_ONLY_MONITORING",
      "VPAID_ONLY_BLOCKING",
      "VPAID_ONLY_FILTERING",
      "VPAID_FILTERING",
      "NON_VPAID_FILTERING",
      "BLOCKING_FILTERING_VPAID",
      "BLOCKING_FILTERING_VPAID_ONLY",
    ]).describe("Measurement mode for the wrapped placement.").optional(),
    wrappedTag: z.string().describe(
      "Tag provided by the measurement partner during wrapping.",
    ).optional(),
  }).describe("Placement tag wrapping").optional(),
  paymentApproved: z.boolean().describe(
    "Whether payment was approved for this placement. This is a read-only field relevant only to publisher-paid placements.",
  ).optional(),
  paymentSource: z.enum(["PLACEMENT_AGENCY_PAID", "PLACEMENT_PUBLISHER_PAID"])
    .describe(
      "Payment source for this placement. This is a required field that is read-only after insertion.",
    ).optional(),
  placementGroupId: z.string().describe(
    "ID of this placement's group, if applicable.",
  ).optional(),
  placementGroupIdDimensionValue: z.object({
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
  placementStrategyId: z.string().describe(
    "ID of the placement strategy assigned to this placement.",
  ).optional(),
  pricingSchedule: z.object({
    capCostOption: z.enum([
      "CAP_COST_NONE",
      "CAP_COST_MONTHLY",
      "CAP_COST_CUMULATIVE",
    ]).describe("Placement cap cost option.").optional(),
    endDate: z.string().optional(),
    flighted: z.boolean().describe(
      "Whether this placement is flighted. If true, pricing periods will be computed automatically.",
    ).optional(),
    floodlightActivityId: z.string().describe(
      "Floodlight activity ID associated with this placement. This field should be set when placement pricing type is set to PRICING_TYPE_CPA.",
    ).optional(),
    pricingPeriods: z.array(z.object({
      endDate: z.string().optional(),
      pricingComment: z.string().describe("Comments for this pricing period.")
        .optional(),
      rateOrCostNanos: z.string().describe(
        "Rate or cost of this pricing period in nanos (i.e., multiplied by 1000000000). Acceptable values are 0 to 1000000000000000000, inclusive.",
      ).optional(),
      startDate: z.string().optional(),
      units: z.string().describe(
        "Units of this pricing period. Acceptable values are 0 to 10000000000, inclusive.",
      ).optional(),
    })).describe("Pricing periods for this placement.").optional(),
    pricingType: z.enum([
      "PRICING_TYPE_CPM",
      "PRICING_TYPE_CPC",
      "PRICING_TYPE_CPA",
      "PRICING_TYPE_FLAT_RATE_IMPRESSIONS",
      "PRICING_TYPE_FLAT_RATE_CLICKS",
      "PRICING_TYPE_CPM_ACTIVEVIEW",
    ]).describe("Placement pricing type. This field is required on insertion.")
      .optional(),
    startDate: z.string().optional(),
    testingStartDate: z.string().optional(),
  }).describe("Pricing Schedule").optional(),
  primary: z.boolean().describe(
    "Whether this placement is the primary placement of a roadblock (placement group). You cannot change this field from true to false. Setting this field to true will automatically set the primary field on the original primary placement of the roadblock to false, and it will automatically set the roadblock's primaryPlacementId field to the ID of this placement.",
  ).optional(),
  publisherUpdateInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  siteId: z.string().describe(
    "Site ID associated with this placement. On insert, you must set either this field or the directorySiteId field to specify the site associated with this placement. This is a required field that is read-only after insertion.",
  ).optional(),
  siteIdDimensionValue: z.object({
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
  siteServed: z.boolean().describe(
    "Optional. Whether the ads in the placement are served by another platform and CM is only used for tracking or they are served by CM. A false value indicates the ad is served by CM.",
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
  sslRequired: z.boolean().describe(
    "Whether creatives assigned to this placement must be SSL-compliant.",
  ).optional(),
  status: z.enum([
    "PENDING_REVIEW",
    "PAYMENT_ACCEPTED",
    "PAYMENT_REJECTED",
    "ACKNOWLEDGE_REJECTION",
    "ACKNOWLEDGE_ACCEPTANCE",
    "DRAFT",
  ]).describe("Third-party placement status.").optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this placement. This field can be left blank.",
  ).optional(),
  tagFormats: z.array(
    z.enum([
      "PLACEMENT_TAG_STANDARD",
      "PLACEMENT_TAG_IFRAME_JAVASCRIPT",
      "PLACEMENT_TAG_IFRAME_ILAYER",
      "PLACEMENT_TAG_INTERNAL_REDIRECT",
      "PLACEMENT_TAG_JAVASCRIPT",
      "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT",
      "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT",
      "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT",
      "PLACEMENT_TAG_CLICK_COMMANDS",
      "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH",
      "PLACEMENT_TAG_TRACKING",
      "PLACEMENT_TAG_TRACKING_IFRAME",
      "PLACEMENT_TAG_TRACKING_JAVASCRIPT",
      "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3",
      "PLACEMENT_TAG_IFRAME_JAVASCRIPT_LEGACY",
      "PLACEMENT_TAG_JAVASCRIPT_LEGACY",
      "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT_LEGACY",
      "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT_LEGACY",
      "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4",
      "PLACEMENT_TAG_TRACKING_THIRD_PARTY_MEASUREMENT",
    ]),
  ).describe(
    'Tag formats to generate for this placement. This field is required on insertion. Acceptable values are: - "PLACEMENT_TAG_STANDARD" - "PLACEMENT_TAG_IFRAME_JAVASCRIPT" - "PLACEMENT_TAG_IFRAME_ILAYER" - "PLACEMENT_TAG_INTERNAL_REDIRECT" - "PLACEMENT_TAG_JAVASCRIPT" - "PLACEMENT_TAG_INTERSTITIAL_IFRAME_JAVASCRIPT" - "PLACEMENT_TAG_INTERSTITIAL_INTERNAL_REDIRECT" - "PLACEMENT_TAG_INTERSTITIAL_JAVASCRIPT" - "PLACEMENT_TAG_CLICK_COMMANDS" - "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH" - "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_3" - "PLACEMENT_TAG_INSTREAM_VIDEO_PREFETCH_VAST_4" - "PLACEMENT_TAG_TRACKING" - "PLACEMENT_TAG_TRACKING_IFRAME" - "PLACEMENT_TAG_TRACKING_JAVASCRIPT"',
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
  videoActiveViewOptOut: z.boolean().describe(
    "Whether Verification and ActiveView are disabled for in-stream video creatives for this placement. The same setting videoActiveViewOptOut exists on the site level -- the opt out occurs if either of these settings are true. These settings are distinct from DirectorySites.settings.activeViewOptOut or Sites.siteSettings.activeViewOptOut which only apply to display ads. However, Accounts.activeViewOptOut opts out both video traffic, as well as display ads, from Verification and ActiveView.",
  ).optional(),
  videoSettings: z.object({
    companionSettings: z.object({
      companionsDisabled: z.boolean().describe(
        "Whether companions are disabled for this placement.",
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
        "Allowlist of companion sizes to be served to this placement. Set this list to null or empty to serve all companion sizes.",
      ).optional(),
      imageOnly: z.boolean().describe(
        "Whether to serve only static images as companions.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#companionSetting".',
      ).optional(),
    }).describe("Companion Settings").optional(),
    durationSeconds: z.number().int().describe(
      "Duration of a video placement in seconds.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#videoSettings".',
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
      "Orientation of a video placement. If this value is set, placement will return assets matching the specified orientation.",
    ).optional(),
    publisherSpecificationId: z.string().describe(
      "Publisher specification ID of a video placement. Possible values are: * `1`, Hulu * `2`, NBC * `3`, CBS * `4`, CBS Desktop * `5`, Discovery * `6`, VEVO HD * `7`, VEVO Vertical * `8`, Fox * `9`, CW Network * `10`, Disney * `11`, IGN * `12`, NFL.com * `13`, Turner Broadcasting * `14`, Tubi on Fox * `15`, Hearst Corporation * `16`, Twitch Desktop * `17`, ABC * `18`, Univision * `19`, MLB.com * `20`, MLB.com Mobile * `21`, MLB.com OTT * `22`, Polsat * `23`, TVN * `24`, Mediaset * `25`, Antena 3 * `26`, Mediamond * `27`, Sky Italia * `28`, Tubi on CBS * `29`, Spotify * `30`, Paramount * `31`, Max",
    ).optional(),
    skippableSettings: z.object({
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#skippableSetting".',
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
        "Whether the user can skip creatives served to this placement.",
      ).optional(),
    }).describe("Skippable Settings").optional(),
    transcodeSettings: z.object({
      enabledVideoFormats: z.array(z.number().int()).describe(
        "Allowlist of video formats to be served to this placement. Set this list to null or empty to serve all video formats.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#transcodeSetting".',
      ).optional(),
    }).describe("Transcode Settings").optional(),
  }).describe("Video Settings").optional(),
  vpaidAdapterChoice: z.enum(["DEFAULT", "FLASH", "HTML5", "BOTH"]).describe(
    "VPAID adapter setting for this placement. Controls which VPAID format the measurement adapter will use for in-stream video creatives assigned to this placement. *Note:* Flash is no longer supported. This field now defaults to HTML5 when the following values are provided: FLASH, BOTH.",
  ).optional(),
  wrappingOptOut: z.boolean().describe(
    "Whether this placement opts out of tag wrapping.",
  ).optional(),
  youtubeSettings: z.object({
    businessLogoCreativeIds: z.array(z.string()).describe(
      "Optional. The IDs of the creatives to use for the business logo. Currently only one creative is supported.",
    ).optional(),
    businessName: z.string().describe("Optional. The business name.")
      .optional(),
    callToActions: z.array(
      z.enum([
        "CALL_TO_ACTION_UNKNOWN",
        "CALL_TO_ACTION_LEARN_MORE",
        "CALL_TO_ACTION_GET_QUOTE",
        "CALL_TO_ACTION_APPLY_NOW",
        "CALL_TO_ACTION_SIGN_UP",
        "CALL_TO_ACTION_CONTACT_US",
        "CALL_TO_ACTION_SUBSCRIBE",
        "CALL_TO_ACTION_DOWNLOAD",
        "CALL_TO_ACTION_BOOK_NOW",
        "CALL_TO_ACTION_GET_OFFER",
        "CALL_TO_ACTION_SHOP_NOW",
        "CALL_TO_ACTION_VISIT_STORE",
        "CALL_TO_ACTION_CALL_NOW",
        "CALL_TO_ACTION_VIEW_MENU",
        "CALL_TO_ACTION_TEST_DRIVE",
        "CALL_TO_ACTION_SCHEDULE_NOW",
        "CALL_TO_ACTION_BUY_NOW",
        "CALL_TO_ACTION_DONATE_NOW",
        "CALL_TO_ACTION_ORDER_NOW",
        "CALL_TO_ACTION_PLAY_NOW",
        "CALL_TO_ACTION_SEE_MORE",
        "CALL_TO_ACTION_START_NOW",
        "CALL_TO_ACTION_VISIT_SITE",
        "CALL_TO_ACTION_WATCH_NOW",
      ]),
    ).describe(
      "Optional. The call to actions. Currently only one call to action is supported.",
    ).optional(),
    descriptions: z.array(z.string()).describe(
      "Optional. The descriptions. Currently only one description is supported.",
    ).optional(),
    headlines: z.array(z.string()).describe(
      "Optional. The headlines associated with the call to actions. Currently only one headline is supported.",
    ).optional(),
    longHeadlines: z.array(z.string()).describe(
      "Optional. The long headlines. Currently only one long headline is supported.",
    ).optional(),
  }).describe("Contains the YouTube settings.").optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 Placements. Registered at `@swamp/gcp/dfareporting/placements`. */
export const model = {
  type: "@swamp/gcp/dfareporting/placements",
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
      description: "Contains properties of a placement.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a placements",
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
        if (g["activeStatus"] !== undefined) {
          body["activeStatus"] = g["activeStatus"];
        }
        if (g["adBlockingOptOut"] !== undefined) {
          body["adBlockingOptOut"] = g["adBlockingOptOut"];
        }
        if (g["adServingPlatformId"] !== undefined) {
          body["adServingPlatformId"] = g["adServingPlatformId"];
        }
        if (g["additionalSizes"] !== undefined) {
          body["additionalSizes"] = g["additionalSizes"];
        }
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["allowOnYoutube"] !== undefined) {
          body["allowOnYoutube"] = g["allowOnYoutube"];
        }
        if (g["campaignId"] !== undefined) body["campaignId"] = g["campaignId"];
        if (g["campaignIdDimensionValue"] !== undefined) {
          body["campaignIdDimensionValue"] = g["campaignIdDimensionValue"];
        }
        if (g["comment"] !== undefined) body["comment"] = g["comment"];
        if (g["compatibility"] !== undefined) {
          body["compatibility"] = g["compatibility"];
        }
        if (g["contentCategoryId"] !== undefined) {
          body["contentCategoryId"] = g["contentCategoryId"];
        }
        if (g["conversionDomainOverride"] !== undefined) {
          body["conversionDomainOverride"] = g["conversionDomainOverride"];
        }
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["directorySiteId"] !== undefined) {
          body["directorySiteId"] = g["directorySiteId"];
        }
        if (g["directorySiteIdDimensionValue"] !== undefined) {
          body["directorySiteIdDimensionValue"] =
            g["directorySiteIdDimensionValue"];
        }
        if (g["externalId"] !== undefined) body["externalId"] = g["externalId"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["keyName"] !== undefined) body["keyName"] = g["keyName"];
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["lookbackConfiguration"] !== undefined) {
          body["lookbackConfiguration"] = g["lookbackConfiguration"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["partnerWrappingData"] !== undefined) {
          body["partnerWrappingData"] = g["partnerWrappingData"];
        }
        if (g["paymentApproved"] !== undefined) {
          body["paymentApproved"] = g["paymentApproved"];
        }
        if (g["paymentSource"] !== undefined) {
          body["paymentSource"] = g["paymentSource"];
        }
        if (g["placementGroupId"] !== undefined) {
          body["placementGroupId"] = g["placementGroupId"];
        }
        if (g["placementGroupIdDimensionValue"] !== undefined) {
          body["placementGroupIdDimensionValue"] =
            g["placementGroupIdDimensionValue"];
        }
        if (g["placementStrategyId"] !== undefined) {
          body["placementStrategyId"] = g["placementStrategyId"];
        }
        if (g["pricingSchedule"] !== undefined) {
          body["pricingSchedule"] = g["pricingSchedule"];
        }
        if (g["primary"] !== undefined) body["primary"] = g["primary"];
        if (g["publisherUpdateInfo"] !== undefined) {
          body["publisherUpdateInfo"] = g["publisherUpdateInfo"];
        }
        if (g["siteId"] !== undefined) body["siteId"] = g["siteId"];
        if (g["siteIdDimensionValue"] !== undefined) {
          body["siteIdDimensionValue"] = g["siteIdDimensionValue"];
        }
        if (g["siteServed"] !== undefined) body["siteServed"] = g["siteServed"];
        if (g["size"] !== undefined) body["size"] = g["size"];
        if (g["sslRequired"] !== undefined) {
          body["sslRequired"] = g["sslRequired"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["tagFormats"] !== undefined) body["tagFormats"] = g["tagFormats"];
        if (g["tagSetting"] !== undefined) body["tagSetting"] = g["tagSetting"];
        if (g["videoActiveViewOptOut"] !== undefined) {
          body["videoActiveViewOptOut"] = g["videoActiveViewOptOut"];
        }
        if (g["videoSettings"] !== undefined) {
          body["videoSettings"] = g["videoSettings"];
        }
        if (g["vpaidAdapterChoice"] !== undefined) {
          body["vpaidAdapterChoice"] = g["vpaidAdapterChoice"];
        }
        if (g["wrappingOptOut"] !== undefined) {
          body["wrappingOptOut"] = g["wrappingOptOut"];
        }
        if (g["youtubeSettings"] !== undefined) {
          body["youtubeSettings"] = g["youtubeSettings"];
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
      description: "Get a placements",
      arguments: z.object({
        identifier: z.string().describe("The id of the placements"),
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
      description: "Update placements attributes",
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
        if (g["activeStatus"] !== undefined) {
          body["activeStatus"] = g["activeStatus"];
        }
        if (g["adBlockingOptOut"] !== undefined) {
          body["adBlockingOptOut"] = g["adBlockingOptOut"];
        }
        if (g["adServingPlatformId"] !== undefined) {
          body["adServingPlatformId"] = g["adServingPlatformId"];
        }
        if (g["additionalSizes"] !== undefined) {
          body["additionalSizes"] = g["additionalSizes"];
        }
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["allowOnYoutube"] !== undefined) {
          body["allowOnYoutube"] = g["allowOnYoutube"];
        }
        if (g["campaignId"] !== undefined) body["campaignId"] = g["campaignId"];
        if (g["campaignIdDimensionValue"] !== undefined) {
          body["campaignIdDimensionValue"] = g["campaignIdDimensionValue"];
        }
        if (g["comment"] !== undefined) body["comment"] = g["comment"];
        if (g["compatibility"] !== undefined) {
          body["compatibility"] = g["compatibility"];
        }
        if (g["contentCategoryId"] !== undefined) {
          body["contentCategoryId"] = g["contentCategoryId"];
        }
        if (g["conversionDomainOverride"] !== undefined) {
          body["conversionDomainOverride"] = g["conversionDomainOverride"];
        }
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["directorySiteId"] !== undefined) {
          body["directorySiteId"] = g["directorySiteId"];
        }
        if (g["directorySiteIdDimensionValue"] !== undefined) {
          body["directorySiteIdDimensionValue"] =
            g["directorySiteIdDimensionValue"];
        }
        if (g["externalId"] !== undefined) body["externalId"] = g["externalId"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["keyName"] !== undefined) body["keyName"] = g["keyName"];
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["lookbackConfiguration"] !== undefined) {
          body["lookbackConfiguration"] = g["lookbackConfiguration"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["partnerWrappingData"] !== undefined) {
          body["partnerWrappingData"] = g["partnerWrappingData"];
        }
        if (g["paymentApproved"] !== undefined) {
          body["paymentApproved"] = g["paymentApproved"];
        }
        if (g["paymentSource"] !== undefined) {
          body["paymentSource"] = g["paymentSource"];
        }
        if (g["placementGroupId"] !== undefined) {
          body["placementGroupId"] = g["placementGroupId"];
        }
        if (g["placementGroupIdDimensionValue"] !== undefined) {
          body["placementGroupIdDimensionValue"] =
            g["placementGroupIdDimensionValue"];
        }
        if (g["placementStrategyId"] !== undefined) {
          body["placementStrategyId"] = g["placementStrategyId"];
        }
        if (g["pricingSchedule"] !== undefined) {
          body["pricingSchedule"] = g["pricingSchedule"];
        }
        if (g["primary"] !== undefined) body["primary"] = g["primary"];
        if (g["publisherUpdateInfo"] !== undefined) {
          body["publisherUpdateInfo"] = g["publisherUpdateInfo"];
        }
        if (g["siteId"] !== undefined) body["siteId"] = g["siteId"];
        if (g["siteIdDimensionValue"] !== undefined) {
          body["siteIdDimensionValue"] = g["siteIdDimensionValue"];
        }
        if (g["siteServed"] !== undefined) body["siteServed"] = g["siteServed"];
        if (g["size"] !== undefined) body["size"] = g["size"];
        if (g["sslRequired"] !== undefined) {
          body["sslRequired"] = g["sslRequired"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["tagFormats"] !== undefined) body["tagFormats"] = g["tagFormats"];
        if (g["tagSetting"] !== undefined) body["tagSetting"] = g["tagSetting"];
        if (g["videoActiveViewOptOut"] !== undefined) {
          body["videoActiveViewOptOut"] = g["videoActiveViewOptOut"];
        }
        if (g["videoSettings"] !== undefined) {
          body["videoSettings"] = g["videoSettings"];
        }
        if (g["vpaidAdapterChoice"] !== undefined) {
          body["vpaidAdapterChoice"] = g["vpaidAdapterChoice"];
        }
        if (g["wrappingOptOut"] !== undefined) {
          body["wrappingOptOut"] = g["wrappingOptOut"];
        }
        if (g["youtubeSettings"] !== undefined) {
          body["youtubeSettings"] = g["youtubeSettings"];
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
      description: "Sync placements state from GCP",
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
    generatetags: {
      description: "generatetags",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "dfareporting.placements.generatetags",
            "path": "userprofiles/{+profileId}/placements/generatetags",
            "httpMethod": "POST",
            "parameterOrder": ["profileId"],
            "parameters": {
              "campaignId": { "location": "query" },
              "placementIds": { "location": "query" },
              "profileId": { "location": "path", "required": true },
              "tagFormats": { "location": "query" },
              "tagProperties.dcDbmMacroIncluded": { "location": "query" },
              "tagProperties.gppMacrosIncluded": { "location": "query" },
              "tagProperties.tcfGdprMacrosIncluded": { "location": "query" },
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
