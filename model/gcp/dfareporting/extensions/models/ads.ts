// Auto-generated extension model for @swamp/gcp/dfareporting/ads
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 Ads.
 *
 * Contains properties of a Campaign Manager ad.
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
  "id": "dfareporting.ads.get",
  "path": "userprofiles/{+profileId}/ads/{+id}",
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
  "id": "dfareporting.ads.insert",
  "path": "userprofiles/{+profileId}/ads",
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
  "id": "dfareporting.ads.update",
  "path": "userprofiles/{+profileId}/ads",
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
  "id": "dfareporting.ads.list",
  "path": "userprofiles/{+profileId}/ads",
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
    "audienceSegmentIds": {
      "location": "query",
    },
    "campaignIds": {
      "location": "query",
    },
    "compatibility": {
      "location": "query",
    },
    "creativeIds": {
      "location": "query",
    },
    "creativeOptimizationConfigurationIds": {
      "location": "query",
    },
    "dynamicClickTracker": {
      "location": "query",
    },
    "ids": {
      "location": "query",
    },
    "landingPageIds": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "overriddenEventTagId": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "placementIds": {
      "location": "query",
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "remarketingListIds": {
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
    "sslCompliant": {
      "location": "query",
    },
    "sslRequired": {
      "location": "query",
    },
    "type": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this ad. This is a read-only field that can be left blank.",
  ).optional(),
  active: z.boolean().describe(
    "Whether this ad is active. When true, archived must be false.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this ad. This is a required field on insertion.",
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
  archived: z.boolean().describe(
    "Whether this ad is archived. When true, active must be false.",
  ).optional(),
  audienceSegmentId: z.string().describe(
    "Audience segment ID that is being targeted for this ad. Applicable when type is AD_SERVING_STANDARD_AD.",
  ).optional(),
  campaignId: z.string().describe(
    "Campaign ID of this ad. This is a required field on insertion.",
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
  clickThroughUrl: z.object({
    computedClickThroughUrl: z.string().describe(
      "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If defaultLandingPage is enabled then the campaign's default landing page URL is assigned to this field. - If defaultLandingPage is not enabled and a landingPageId is specified then that landing page's URL is assigned to this field. - If neither of the above cases apply, then the customClickThroughUrl is assigned to this field.",
    ).optional(),
    customClickThroughUrl: z.string().describe(
      "Custom click-through URL. Applicable if the defaultLandingPage field is set to false and the landingPageId field is left unset.",
    ).optional(),
    defaultLandingPage: z.boolean().describe(
      "Whether the campaign default landing page is used.",
    ).optional(),
    landingPageId: z.string().describe(
      "ID of the landing page for the click-through URL. Applicable if the defaultLandingPage field is set to false.",
    ).optional(),
  }).describe("Click-through URL").optional(),
  clickThroughUrlSuffixProperties: z.object({
    clickThroughUrlSuffix: z.string().describe(
      "Click-through URL suffix to apply to all ads in this entity's scope. Must be less than 128 characters long.",
    ).optional(),
    overrideInheritedSuffix: z.boolean().describe(
      "Whether this entity should override the inherited click-through URL suffix with its own defined value.",
    ).optional(),
  }).describe("Click Through URL Suffix settings.").optional(),
  comments: z.string().describe("Comments for this ad.").optional(),
  compatibility: z.enum([
    "DISPLAY",
    "DISPLAY_INTERSTITIAL",
    "APP",
    "APP_INTERSTITIAL",
    "IN_STREAM_VIDEO",
    "IN_STREAM_AUDIO",
  ]).describe(
    "Compatibility of this ad. Applicable when type is AD_SERVING_DEFAULT_AD. DISPLAY and DISPLAY_INTERSTITIAL refer to either rendering on desktop or on mobile devices or in mobile apps for regular or interstitial ads, respectively. APP and APP_INTERSTITIAL are only used for existing default ads. New mobile placements must be assigned DISPLAY or DISPLAY_INTERSTITIAL and default ads created for those placements will be limited to those compatibility types. IN_STREAM_VIDEO refers to rendering in-stream video ads developed with the VAST standard.",
  ).optional(),
  contextualKeywordTargeting: z.object({
    keywords: z.array(z.object({
      keyword: z.string().describe("The keyword that can be targeted by ads.")
        .optional(),
    })).describe("Contextual keywords that this ad targets").optional(),
  }).describe("Contextual Keyword Targeting.").optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  creativeGroupAssignments: z.array(z.object({
    creativeGroupId: z.string().describe(
      "ID of the creative group to be assigned.",
    ).optional(),
    creativeGroupNumber: z.enum(["CREATIVE_GROUP_ONE", "CREATIVE_GROUP_TWO"])
      .describe("Creative group number of the creative group assignment.")
      .optional(),
  })).describe(
    "Creative group assignments for this ad. Applicable when type is AD_SERVING_CLICK_TRACKER. Only one assignment per creative group number is allowed for a maximum of two assignments.",
  ).optional(),
  creativeRotation: z.object({
    creativeAssignments: z.array(z.object({
      active: z.boolean().describe(
        "Whether this creative assignment is active. When true, the creative will be included in the ad's rotation.",
      ).optional(),
      applyEventTags: z.boolean().describe(
        "Whether applicable event tags should fire when this creative assignment is rendered. If this value is unset when the ad is inserted or updated, it will default to true for all creative types EXCEPT for INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and INSTREAM_VIDEO.",
      ).optional(),
      clickThroughUrl: z.object({
        computedClickThroughUrl: z.string().describe(
          "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If defaultLandingPage is enabled then the campaign's default landing page URL is assigned to this field. - If defaultLandingPage is not enabled and a landingPageId is specified then that landing page's URL is assigned to this field. - If neither of the above cases apply, then the customClickThroughUrl is assigned to this field.",
        ).optional(),
        customClickThroughUrl: z.string().describe(
          "Custom click-through URL. Applicable if the defaultLandingPage field is set to false and the landingPageId field is left unset.",
        ).optional(),
        defaultLandingPage: z.boolean().describe(
          "Whether the campaign default landing page is used.",
        ).optional(),
        landingPageId: z.string().describe(
          "ID of the landing page for the click-through URL. Applicable if the defaultLandingPage field is set to false.",
        ).optional(),
      }).describe("Click-through URL").optional(),
      companionCreativeOverrides: z.array(z.object({
        clickThroughUrl: z.unknown().describe("Click-through URL").optional(),
        creativeId: z.unknown().describe(
          "ID of the creative for this companion click-through override.",
        ).optional(),
      })).describe(
        "Companion creative overrides for this creative assignment. Applicable to video ads.",
      ).optional(),
      creativeGroupAssignments: z.array(z.object({
        creativeGroupId: z.unknown().describe(
          "ID of the creative group to be assigned.",
        ).optional(),
        creativeGroupNumber: z.unknown().describe(
          "Creative group number of the creative group assignment.",
        ).optional(),
      })).describe(
        "Creative group assignments for this creative assignment. Only one assignment per creative group number is allowed for a maximum of two assignments.",
      ).optional(),
      creativeId: z.string().describe(
        "ID of the creative to be assigned. This is a required field.",
      ).optional(),
      creativeIdDimensionValue: z.object({
        dimensionName: z.string().describe("The name of the dimension.")
          .optional(),
        etag: z.string().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with the value if available.",
        ).optional(),
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
      endTime: z.string().optional(),
      richMediaExitOverrides: z.array(z.object({
        clickThroughUrl: z.unknown().describe("Click-through URL").optional(),
        enabled: z.unknown().describe(
          "Whether to use the clickThroughUrl. If false, the creative-level exit will be used.",
        ).optional(),
        exitId: z.unknown().describe(
          "ID for the override to refer to a specific exit in the creative.",
        ).optional(),
      })).describe(
        "Rich media exit overrides for this creative assignment. Applicable when the creative type is any of the following: - DISPLAY - RICH_MEDIA_INPAGE - RICH_MEDIA_INPAGE_FLOATING - RICH_MEDIA_IM_EXPAND - RICH_MEDIA_EXPANDING - RICH_MEDIA_INTERSTITIAL_FLOAT - RICH_MEDIA_MOBILE_IN_APP - RICH_MEDIA_MULTI_FLOATING - RICH_MEDIA_PEEL_DOWN - VPAID_LINEAR - VPAID_NON_LINEAR",
      ).optional(),
      sequence: z.number().int().describe(
        "Sequence number of the creative assignment, applicable when the rotation type is CREATIVE_ROTATION_TYPE_SEQUENTIAL. Acceptable values are 1 to 65535, inclusive.",
      ).optional(),
      sslCompliant: z.boolean().describe(
        "Whether the creative to be assigned is SSL-compliant. This is a read-only field that is auto-generated when the ad is inserted or updated.",
      ).optional(),
      startTime: z.string().optional(),
      weight: z.number().int().describe(
        "Weight of the creative assignment, applicable when the rotation type is CREATIVE_ROTATION_TYPE_RANDOM. Value must be greater than or equal to 1.",
      ).optional(),
    })).describe("Creative assignments in this creative rotation.").optional(),
    creativeOptimizationConfigurationId: z.string().describe(
      "Creative optimization configuration that is used by this ad. It should refer to one of the existing optimization configurations in the ad's campaign. If it is unset or set to 0, then the campaign's default optimization configuration will be used for this ad.",
    ).optional(),
    type: z.enum([
      "CREATIVE_ROTATION_TYPE_SEQUENTIAL",
      "CREATIVE_ROTATION_TYPE_RANDOM",
    ]).describe(
      "Type of creative rotation. Can be used to specify whether to use sequential or random rotation.",
    ).optional(),
    weightCalculationStrategy: z.enum([
      "WEIGHT_STRATEGY_EQUAL",
      "WEIGHT_STRATEGY_CUSTOM",
      "WEIGHT_STRATEGY_HIGHEST_CTR",
      "WEIGHT_STRATEGY_OPTIMIZED",
    ]).describe(
      "Strategy for calculating weights. Used with CREATIVE_ROTATION_TYPE_RANDOM.",
    ).optional(),
  }).describe("Creative Rotation.").optional(),
  dayPartTargeting: z.object({
    daysOfWeek: z.array(
      z.enum([
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ]),
    ).describe(
      'Days of the week when the ad will serve. Acceptable values are: - "SUNDAY" - "MONDAY" - "TUESDAY" - "WEDNESDAY" - "THURSDAY" - "FRIDAY" - "SATURDAY"',
    ).optional(),
    hoursOfDay: z.array(z.number().int()).describe(
      "Hours of the day when the ad will serve, where 0 is midnight to 1 AM and 23 is 11 PM to midnight. Can be specified with days of week, in which case the ad would serve during these hours on the specified days. For example if Monday, Wednesday, Friday are the days of week specified and 9-10am, 3-5pm (hours 9, 15, and 16) is specified, the ad would serve Monday, Wednesdays, and Fridays at 9-10am and 3-5pm. Acceptable values are 0 to 23, inclusive.",
    ).optional(),
    userLocalTime: z.boolean().describe(
      "Whether or not to use the user's local time. If false, the America/New York time zone applies.",
    ).optional(),
  }).describe("Day Part Targeting.").optional(),
  defaultClickThroughEventTagProperties: z.object({
    defaultClickThroughEventTagId: z.string().describe(
      "ID of the click-through event tag to apply to all ads in this entity's scope.",
    ).optional(),
    overrideInheritedEventTag: z.boolean().describe(
      "Whether this entity should override the inherited default click-through event tag with its own defined value.",
    ).optional(),
  }).describe(
    "Properties of inheriting and overriding the default click-through event tag. A campaign may override the event tag defined at the advertiser level, and an ad may also override the campaign's setting further.",
  ).optional(),
  deliverySchedule: z.object({
    frequencyCap: z.object({
      duration: z.string().describe(
        "Duration of time, in seconds, for this frequency cap. The maximum duration is 90 days. Acceptable values are 1 to 7776000, inclusive.",
      ).optional(),
      impressions: z.string().describe(
        "Number of times an individual user can be served the ad within the specified duration. Acceptable values are 1 to 15, inclusive.",
      ).optional(),
    }).describe("Frequency Cap.").optional(),
    hardCutoff: z.boolean().describe(
      "Whether or not hard cutoff is enabled. If true, the ad will not serve after the end date and time. Otherwise the ad will continue to be served until it has reached its delivery goals.",
    ).optional(),
    impressionRatio: z.string().describe(
      "Impression ratio for this ad. This ratio determines how often each ad is served relative to the others. For example, if ad A has an impression ratio of 1 and ad B has an impression ratio of 3, then Campaign Manager will serve ad B three times as often as ad A. Acceptable values are 1 to 10, inclusive.",
    ).optional(),
    priority: z.enum([
      "AD_PRIORITY_01",
      "AD_PRIORITY_02",
      "AD_PRIORITY_03",
      "AD_PRIORITY_04",
      "AD_PRIORITY_05",
      "AD_PRIORITY_06",
      "AD_PRIORITY_07",
      "AD_PRIORITY_08",
      "AD_PRIORITY_09",
      "AD_PRIORITY_10",
      "AD_PRIORITY_11",
      "AD_PRIORITY_12",
      "AD_PRIORITY_13",
      "AD_PRIORITY_14",
      "AD_PRIORITY_15",
      "AD_PRIORITY_16",
    ]).describe(
      "Serving priority of an ad, with respect to other ads. The lower the priority number, the greater the priority with which it is served.",
    ).optional(),
  }).describe("Delivery Schedule.").optional(),
  dynamicClickTracker: z.boolean().describe(
    "Whether this ad is a dynamic click tracker. Applicable when type is AD_SERVING_CLICK_TRACKER. This is a required field on insert, and is read-only after insert.",
  ).optional(),
  endTime: z.string().optional(),
  eventTagOverrides: z.array(z.object({
    enabled: z.boolean().describe("Whether this override is enabled.")
      .optional(),
    id: z.string().describe(
      "ID of this event tag override. This is a read-only, auto-generated field.",
    ).optional(),
  })).describe("Event tag overrides for this ad.").optional(),
  geoTargeting: z.object({
    cities: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this city belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this city belongs.",
      ).optional(),
      dartId: z.string().describe(
        "DART ID of this city. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#city".',
      ).optional(),
      metroCode: z.string().describe(
        "Metro region code of the metro region (DMA) to which this city belongs.",
      ).optional(),
      metroDmaId: z.string().describe(
        "ID of the metro region (DMA) to which this city belongs.",
      ).optional(),
      name: z.string().describe("Name of this city.").optional(),
      regionCode: z.string().describe(
        "Region code of the region to which this city belongs.",
      ).optional(),
      regionDartId: z.string().describe(
        "DART ID of the region to which this city belongs.",
      ).optional(),
    })).describe(
      "Cities to be targeted. For each city only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a city, do not target or exclude the country of the city, and do not target the metro or region of the city.",
    ).optional(),
    countries: z.array(z.object({
      countryCode: z.string().describe("Country code.").optional(),
      dartId: z.string().describe(
        "DART ID of this country. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#country".',
      ).optional(),
      name: z.string().describe("Name of this country.").optional(),
      sslEnabled: z.boolean().describe(
        "Whether ad serving supports secure servers in this country.",
      ).optional(),
      tvDataProviders: z.array(
        z.enum([
          "INVALID_TV_DATA_PROVIDER",
          "INTAGE_JP",
          "IBOPE_AR",
          "IBOPE_BR",
          "IBOPE_CL",
          "IBOPE_CO",
          "TNS_VN",
          "COMSCORE_NATIONAL_US",
          "COMSCORE_CA",
          "SAMBA_AU",
        ]),
      ).describe(
        "Output only. The TV data providers supported in this country.",
      ).optional(),
    })).describe(
      "Countries to be targeted or excluded from targeting, depending on the setting of the excludeCountries field. For each country only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting or excluding a country, do not target regions, cities, metros, or postal codes in the same country.",
    ).optional(),
    excludeCountries: z.boolean().describe(
      "Whether or not to exclude the countries in the countries field from targeting. If false, the countries field refers to countries which will be targeted by the ad.",
    ).optional(),
    metros: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this metro region belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this metro region belongs.",
      ).optional(),
      dartId: z.string().describe("DART ID of this metro region.").optional(),
      dmaId: z.string().describe(
        "DMA ID of this metro region. This is the ID used for targeting and generating reports, and is equivalent to metro_code.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#metro".',
      ).optional(),
      metroCode: z.string().describe(
        "Metro code of this metro region. This is equivalent to dma_id.",
      ).optional(),
      name: z.string().describe("Name of this metro region.").optional(),
    })).describe(
      "Metros to be targeted. For each metro only dmaId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a metro, do not target or exclude the country of the metro.",
    ).optional(),
    postalCodes: z.array(z.object({
      code: z.string().describe(
        "Postal code. This is equivalent to the id field.",
      ).optional(),
      countryCode: z.string().describe(
        "Country code of the country to which this postal code belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this postal code belongs.",
      ).optional(),
      id: z.string().describe("ID of this postal code.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#postalCode".',
      ).optional(),
    })).describe(
      "Postal codes to be targeted. For each postal code only id is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a postal code, do not target or exclude the country of the postal code.",
    ).optional(),
    regions: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this region belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this region belongs.",
      ).optional(),
      dartId: z.string().describe("DART ID of this region.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#region".',
      ).optional(),
      name: z.string().describe("Name of this region.").optional(),
      regionCode: z.string().describe("Region code.").optional(),
    })).describe(
      "Regions to be targeted. For each region only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a region, do not target or exclude the country of the region.",
    ).optional(),
  }).describe("Geographical Targeting.").optional(),
  id: z.string().describe(
    "ID of this ad. This is a read-only, auto-generated field.",
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
  keyValueTargetingExpression: z.object({
    expression: z.string().describe(
      "Keyword expression being targeted by the ad.",
    ).optional(),
  }).describe("Key Value Targeting Expression.").optional(),
  languageTargeting: z.object({
    languages: z.array(z.object({
      id: z.string().describe(
        "Language ID of this language. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#language".',
      ).optional(),
      languageCode: z.string().describe(
        'Format of language code is an ISO 639 two-letter language code optionally followed by an underscore followed by an ISO 3166 code. Examples are "en" for English or "zh_CN" for Simplified Chinese.',
      ).optional(),
      name: z.string().describe("Name of this language.").optional(),
    })).describe(
      "Languages that this ad targets. For each language only languageId is required. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
  }).describe("Language Targeting.").optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  name: z.string().describe(
    "Name of this ad. This is a required field and must be less than 256 characters long.",
  ).optional(),
  placementAssignments: z.array(z.object({
    active: z.boolean().describe(
      "Whether this placement assignment is active. When true, the placement will be included in the ad's rotation.",
    ).optional(),
    placementId: z.string().describe(
      "ID of the placement to be assigned. This is a required field.",
    ).optional(),
    placementIdDimensionValue: z.object({
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
    sslRequired: z.boolean().describe(
      "Whether the placement to be assigned requires SSL. This is a read-only field that is auto-generated when the ad is inserted or updated.",
    ).optional(),
  })).describe("Placement assignments for this ad.").optional(),
  remarketingListExpression: z.object({
    expression: z.string().describe(
      "Expression describing which lists are being targeted by the ad.",
    ).optional(),
  }).describe("Remarketing List Targeting Expression.").optional(),
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
    "Whether this ad is ssl compliant. This is a read-only field that is auto-generated when the ad is inserted or updated.",
  ).optional(),
  sslRequired: z.boolean().describe(
    "Whether this ad requires ssl. This is a read-only field that is auto-generated when the ad is inserted or updated.",
  ).optional(),
  startTime: z.string().optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this ad. This is a read-only field that can be left blank.",
  ).optional(),
  targetingTemplateId: z.string().describe(
    "Targeting template ID, used to apply preconfigured targeting information to this ad. This cannot be set while any of dayPartTargeting, geoTargeting, keyValueTargetingExpression, languageTargeting, remarketingListExpression, or technologyTargeting are set. Applicable when type is AD_SERVING_STANDARD_AD.",
  ).optional(),
  technologyTargeting: z.object({
    browsers: z.array(z.object({
      browserVersionId: z.string().describe(
        "ID referring to this grouping of browser and version numbers. This is the ID used for targeting.",
      ).optional(),
      dartId: z.string().describe(
        "DART ID of this browser. This is the ID used when generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#browser".',
      ).optional(),
      majorVersion: z.string().describe(
        "Major version number (leftmost number) of this browser. For example, for Chrome 5.0.376.86 beta, this field should be set to 5. An asterisk (*) may be used to target any version number, and a question mark (?) may be used to target cases where the version number cannot be identified. For example, Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox?.? targets cases where the ad server knows the browser is Firefox but can't tell which version it is.",
      ).optional(),
      minorVersion: z.string().describe(
        "Minor version number (number after first dot on left) of this browser. For example, for Chrome 5.0.375.86 beta, this field should be set to 0. An asterisk (*) may be used to target any version number, and a question mark (?) may be used to target cases where the version number cannot be identified. For example, Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox?.? targets cases where the ad server knows the browser is Firefox but can't tell which version it is.",
      ).optional(),
      name: z.string().describe("Name of this browser.").optional(),
    })).describe(
      "Browsers that this ad targets. For each browser either set browserVersionId or dartId along with the version numbers. If both are specified, only browserVersionId will be used. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
    connectionTypes: z.array(z.object({
      id: z.string().describe("ID of this connection type.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#connectionType".',
      ).optional(),
      name: z.string().describe("Name of this connection type.").optional(),
    })).describe(
      "Connection types that this ad targets. For each connection type only id is required. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
    mobileCarriers: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this mobile carrier belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this mobile carrier belongs.",
      ).optional(),
      id: z.string().describe("ID of this mobile carrier.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileCarrier".',
      ).optional(),
      name: z.string().describe("Name of this mobile carrier.").optional(),
    })).describe(
      "Mobile carriers that this ad targets. For each mobile carrier only id is required, and the other fields are populated automatically when the ad is inserted or updated. If targeting a mobile carrier, do not set targeting for any zip codes.",
    ).optional(),
    operatingSystemVersions: z.array(z.object({
      id: z.string().describe("ID of this operating system version.")
        .optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystemVersion".',
      ).optional(),
      majorVersion: z.string().describe(
        "Major version (leftmost number) of this operating system version.",
      ).optional(),
      minorVersion: z.string().describe(
        "Minor version (number after the first dot) of this operating system version.",
      ).optional(),
      name: z.string().describe("Name of this operating system version.")
        .optional(),
      operatingSystem: z.object({
        dartId: z.string().describe(
          "DART ID of this operating system. This is the ID used for targeting.",
        ).optional(),
        desktop: z.boolean().describe(
          "Whether this operating system is for desktop.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystem".',
        ).optional(),
        mobile: z.boolean().describe(
          "Whether this operating system is for mobile.",
        ).optional(),
        name: z.string().describe("Name of this operating system.").optional(),
      }).describe(
        "Contains information about an operating system that can be targeted by ads.",
      ).optional(),
    })).describe(
      "Operating system versions that this ad targets. To target all versions, use operatingSystems. For each operating system version, only id is required. The other fields are populated automatically when the ad is inserted or updated. If targeting an operating system version, do not set targeting for the corresponding operating system in operatingSystems.",
    ).optional(),
    operatingSystems: z.array(z.object({
      dartId: z.string().describe(
        "DART ID of this operating system. This is the ID used for targeting.",
      ).optional(),
      desktop: z.boolean().describe(
        "Whether this operating system is for desktop.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystem".',
      ).optional(),
      mobile: z.boolean().describe(
        "Whether this operating system is for mobile.",
      ).optional(),
      name: z.string().describe("Name of this operating system.").optional(),
    })).describe(
      "Operating systems that this ad targets. To target specific versions, use operatingSystemVersions. For each operating system only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting an operating system, do not set targeting for operating system versions for the same operating system.",
    ).optional(),
    platformTypes: z.array(z.object({
      id: z.string().describe("ID of this platform type.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#platformType".',
      ).optional(),
      name: z.string().describe("Name of this platform type.").optional(),
    })).describe(
      "Platform types that this ad targets. For example, desktop, mobile, or tablet. For each platform type, only id is required, and the other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
  }).describe("Technology Targeting.").optional(),
  type: z.enum([
    "AD_SERVING_STANDARD_AD",
    "AD_SERVING_DEFAULT_AD",
    "AD_SERVING_CLICK_TRACKER",
    "AD_SERVING_TRACKING",
    "AD_SERVING_BRAND_SAFE_AD",
  ]).describe(
    "Type of ad. This is a required field on insertion. Note that default ads ( AD_SERVING_DEFAULT_AD) cannot be created directly (see Creative resource).",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  active: z.boolean().optional(),
  advertiserId: z.string().optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  archived: z.boolean().optional(),
  audienceSegmentId: z.string().optional(),
  campaignId: z.string().optional(),
  campaignIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  clickThroughUrl: z.object({
    computedClickThroughUrl: z.string(),
    customClickThroughUrl: z.string(),
    defaultLandingPage: z.boolean(),
    landingPageId: z.string(),
  }).optional(),
  clickThroughUrlSuffixProperties: z.object({
    clickThroughUrlSuffix: z.string(),
    overrideInheritedSuffix: z.boolean(),
  }).optional(),
  comments: z.string().optional(),
  compatibility: z.string().optional(),
  contextualKeywordTargeting: z.object({
    keywords: z.array(z.object({
      keyword: z.string(),
    })),
  }).optional(),
  createInfo: z.object({
    time: z.string(),
  }).optional(),
  creativeGroupAssignments: z.array(z.object({
    creativeGroupId: z.string(),
    creativeGroupNumber: z.string(),
  })).optional(),
  creativeRotation: z.object({
    creativeAssignments: z.array(z.object({
      active: z.boolean(),
      applyEventTags: z.boolean(),
      clickThroughUrl: z.object({
        computedClickThroughUrl: z.string(),
        customClickThroughUrl: z.string(),
        defaultLandingPage: z.boolean(),
        landingPageId: z.string(),
      }),
      companionCreativeOverrides: z.array(z.object({
        clickThroughUrl: z.unknown(),
        creativeId: z.unknown(),
      })),
      creativeGroupAssignments: z.array(z.object({
        creativeGroupId: z.unknown(),
        creativeGroupNumber: z.unknown(),
      })),
      creativeId: z.string(),
      creativeIdDimensionValue: z.object({
        dimensionName: z.string(),
        etag: z.string(),
        id: z.string(),
        kind: z.string(),
        matchType: z.string(),
        value: z.string(),
      }),
      endTime: z.string(),
      richMediaExitOverrides: z.array(z.object({
        clickThroughUrl: z.unknown(),
        enabled: z.unknown(),
        exitId: z.unknown(),
      })),
      sequence: z.number(),
      sslCompliant: z.boolean(),
      startTime: z.string(),
      weight: z.number(),
    })),
    creativeOptimizationConfigurationId: z.string(),
    type: z.string(),
    weightCalculationStrategy: z.string(),
  }).optional(),
  dayPartTargeting: z.object({
    daysOfWeek: z.array(z.string()),
    hoursOfDay: z.array(z.number()),
    userLocalTime: z.boolean(),
  }).optional(),
  defaultClickThroughEventTagProperties: z.object({
    defaultClickThroughEventTagId: z.string(),
    overrideInheritedEventTag: z.boolean(),
  }).optional(),
  deliverySchedule: z.object({
    frequencyCap: z.object({
      duration: z.string(),
      impressions: z.string(),
    }),
    hardCutoff: z.boolean(),
    impressionRatio: z.string(),
    priority: z.string(),
  }).optional(),
  dynamicClickTracker: z.boolean().optional(),
  endTime: z.string().optional(),
  eventTagOverrides: z.array(z.object({
    enabled: z.boolean(),
    id: z.string(),
  })).optional(),
  geoTargeting: z.object({
    cities: z.array(z.object({
      countryCode: z.string(),
      countryDartId: z.string(),
      dartId: z.string(),
      kind: z.string(),
      metroCode: z.string(),
      metroDmaId: z.string(),
      name: z.string(),
      regionCode: z.string(),
      regionDartId: z.string(),
    })),
    countries: z.array(z.object({
      countryCode: z.string(),
      dartId: z.string(),
      kind: z.string(),
      name: z.string(),
      sslEnabled: z.boolean(),
      tvDataProviders: z.array(z.string()),
    })),
    excludeCountries: z.boolean(),
    metros: z.array(z.object({
      countryCode: z.string(),
      countryDartId: z.string(),
      dartId: z.string(),
      dmaId: z.string(),
      kind: z.string(),
      metroCode: z.string(),
      name: z.string(),
    })),
    postalCodes: z.array(z.object({
      code: z.string(),
      countryCode: z.string(),
      countryDartId: z.string(),
      id: z.string(),
      kind: z.string(),
    })),
    regions: z.array(z.object({
      countryCode: z.string(),
      countryDartId: z.string(),
      dartId: z.string(),
      kind: z.string(),
      name: z.string(),
      regionCode: z.string(),
    })),
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
  keyValueTargetingExpression: z.object({
    expression: z.string(),
  }).optional(),
  kind: z.string().optional(),
  languageTargeting: z.object({
    languages: z.array(z.object({
      id: z.string(),
      kind: z.string(),
      languageCode: z.string(),
      name: z.string(),
    })),
  }).optional(),
  lastModifiedInfo: z.object({
    time: z.string(),
  }).optional(),
  name: z.string().optional(),
  placementAssignments: z.array(z.object({
    active: z.boolean(),
    placementId: z.string(),
    placementIdDimensionValue: z.object({
      dimensionName: z.string(),
      etag: z.string(),
      id: z.string(),
      kind: z.string(),
      matchType: z.string(),
      value: z.string(),
    }),
    sslRequired: z.boolean(),
  })).optional(),
  remarketingListExpression: z.object({
    expression: z.string(),
  }).optional(),
  size: z.object({
    height: z.number(),
    iab: z.boolean(),
    id: z.string(),
    kind: z.string(),
    width: z.number(),
  }).optional(),
  sslCompliant: z.boolean().optional(),
  sslRequired: z.boolean().optional(),
  startTime: z.string().optional(),
  subaccountId: z.string().optional(),
  targetingTemplateId: z.string().optional(),
  technologyTargeting: z.object({
    browsers: z.array(z.object({
      browserVersionId: z.string(),
      dartId: z.string(),
      kind: z.string(),
      majorVersion: z.string(),
      minorVersion: z.string(),
      name: z.string(),
    })),
    connectionTypes: z.array(z.object({
      id: z.string(),
      kind: z.string(),
      name: z.string(),
    })),
    mobileCarriers: z.array(z.object({
      countryCode: z.string(),
      countryDartId: z.string(),
      id: z.string(),
      kind: z.string(),
      name: z.string(),
    })),
    operatingSystemVersions: z.array(z.object({
      id: z.string(),
      kind: z.string(),
      majorVersion: z.string(),
      minorVersion: z.string(),
      name: z.string(),
      operatingSystem: z.object({
        dartId: z.string(),
        desktop: z.boolean(),
        kind: z.string(),
        mobile: z.boolean(),
        name: z.string(),
      }),
    })),
    operatingSystems: z.array(z.object({
      dartId: z.string(),
      desktop: z.boolean(),
      kind: z.string(),
      mobile: z.boolean(),
      name: z.string(),
    })),
    platformTypes: z.array(z.object({
      id: z.string(),
      kind: z.string(),
      name: z.string(),
    })),
  }).optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this ad. This is a read-only field that can be left blank.",
  ).optional(),
  active: z.boolean().describe(
    "Whether this ad is active. When true, archived must be false.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this ad. This is a required field on insertion.",
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
  archived: z.boolean().describe(
    "Whether this ad is archived. When true, active must be false.",
  ).optional(),
  audienceSegmentId: z.string().describe(
    "Audience segment ID that is being targeted for this ad. Applicable when type is AD_SERVING_STANDARD_AD.",
  ).optional(),
  campaignId: z.string().describe(
    "Campaign ID of this ad. This is a required field on insertion.",
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
  clickThroughUrl: z.object({
    computedClickThroughUrl: z.string().describe(
      "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If defaultLandingPage is enabled then the campaign's default landing page URL is assigned to this field. - If defaultLandingPage is not enabled and a landingPageId is specified then that landing page's URL is assigned to this field. - If neither of the above cases apply, then the customClickThroughUrl is assigned to this field.",
    ).optional(),
    customClickThroughUrl: z.string().describe(
      "Custom click-through URL. Applicable if the defaultLandingPage field is set to false and the landingPageId field is left unset.",
    ).optional(),
    defaultLandingPage: z.boolean().describe(
      "Whether the campaign default landing page is used.",
    ).optional(),
    landingPageId: z.string().describe(
      "ID of the landing page for the click-through URL. Applicable if the defaultLandingPage field is set to false.",
    ).optional(),
  }).describe("Click-through URL").optional(),
  clickThroughUrlSuffixProperties: z.object({
    clickThroughUrlSuffix: z.string().describe(
      "Click-through URL suffix to apply to all ads in this entity's scope. Must be less than 128 characters long.",
    ).optional(),
    overrideInheritedSuffix: z.boolean().describe(
      "Whether this entity should override the inherited click-through URL suffix with its own defined value.",
    ).optional(),
  }).describe("Click Through URL Suffix settings.").optional(),
  comments: z.string().describe("Comments for this ad.").optional(),
  compatibility: z.enum([
    "DISPLAY",
    "DISPLAY_INTERSTITIAL",
    "APP",
    "APP_INTERSTITIAL",
    "IN_STREAM_VIDEO",
    "IN_STREAM_AUDIO",
  ]).describe(
    "Compatibility of this ad. Applicable when type is AD_SERVING_DEFAULT_AD. DISPLAY and DISPLAY_INTERSTITIAL refer to either rendering on desktop or on mobile devices or in mobile apps for regular or interstitial ads, respectively. APP and APP_INTERSTITIAL are only used for existing default ads. New mobile placements must be assigned DISPLAY or DISPLAY_INTERSTITIAL and default ads created for those placements will be limited to those compatibility types. IN_STREAM_VIDEO refers to rendering in-stream video ads developed with the VAST standard.",
  ).optional(),
  contextualKeywordTargeting: z.object({
    keywords: z.array(z.object({
      keyword: z.string().describe("The keyword that can be targeted by ads.")
        .optional(),
    })).describe("Contextual keywords that this ad targets").optional(),
  }).describe("Contextual Keyword Targeting.").optional(),
  createInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  creativeGroupAssignments: z.array(z.object({
    creativeGroupId: z.string().describe(
      "ID of the creative group to be assigned.",
    ).optional(),
    creativeGroupNumber: z.enum(["CREATIVE_GROUP_ONE", "CREATIVE_GROUP_TWO"])
      .describe("Creative group number of the creative group assignment.")
      .optional(),
  })).describe(
    "Creative group assignments for this ad. Applicable when type is AD_SERVING_CLICK_TRACKER. Only one assignment per creative group number is allowed for a maximum of two assignments.",
  ).optional(),
  creativeRotation: z.object({
    creativeAssignments: z.array(z.object({
      active: z.boolean().describe(
        "Whether this creative assignment is active. When true, the creative will be included in the ad's rotation.",
      ).optional(),
      applyEventTags: z.boolean().describe(
        "Whether applicable event tags should fire when this creative assignment is rendered. If this value is unset when the ad is inserted or updated, it will default to true for all creative types EXCEPT for INTERNAL_REDIRECT, INTERSTITIAL_INTERNAL_REDIRECT, and INSTREAM_VIDEO.",
      ).optional(),
      clickThroughUrl: z.object({
        computedClickThroughUrl: z.string().describe(
          "Read-only convenience field representing the actual URL that will be used for this click-through. The URL is computed as follows: - If defaultLandingPage is enabled then the campaign's default landing page URL is assigned to this field. - If defaultLandingPage is not enabled and a landingPageId is specified then that landing page's URL is assigned to this field. - If neither of the above cases apply, then the customClickThroughUrl is assigned to this field.",
        ).optional(),
        customClickThroughUrl: z.string().describe(
          "Custom click-through URL. Applicable if the defaultLandingPage field is set to false and the landingPageId field is left unset.",
        ).optional(),
        defaultLandingPage: z.boolean().describe(
          "Whether the campaign default landing page is used.",
        ).optional(),
        landingPageId: z.string().describe(
          "ID of the landing page for the click-through URL. Applicable if the defaultLandingPage field is set to false.",
        ).optional(),
      }).describe("Click-through URL").optional(),
      companionCreativeOverrides: z.array(z.object({
        clickThroughUrl: z.unknown().describe("Click-through URL").optional(),
        creativeId: z.unknown().describe(
          "ID of the creative for this companion click-through override.",
        ).optional(),
      })).describe(
        "Companion creative overrides for this creative assignment. Applicable to video ads.",
      ).optional(),
      creativeGroupAssignments: z.array(z.object({
        creativeGroupId: z.unknown().describe(
          "ID of the creative group to be assigned.",
        ).optional(),
        creativeGroupNumber: z.unknown().describe(
          "Creative group number of the creative group assignment.",
        ).optional(),
      })).describe(
        "Creative group assignments for this creative assignment. Only one assignment per creative group number is allowed for a maximum of two assignments.",
      ).optional(),
      creativeId: z.string().describe(
        "ID of the creative to be assigned. This is a required field.",
      ).optional(),
      creativeIdDimensionValue: z.object({
        dimensionName: z.string().describe("The name of the dimension.")
          .optional(),
        etag: z.string().describe(
          "The eTag of this response for caching purposes.",
        ).optional(),
        id: z.string().describe(
          "The ID associated with the value if available.",
        ).optional(),
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
      endTime: z.string().optional(),
      richMediaExitOverrides: z.array(z.object({
        clickThroughUrl: z.unknown().describe("Click-through URL").optional(),
        enabled: z.unknown().describe(
          "Whether to use the clickThroughUrl. If false, the creative-level exit will be used.",
        ).optional(),
        exitId: z.unknown().describe(
          "ID for the override to refer to a specific exit in the creative.",
        ).optional(),
      })).describe(
        "Rich media exit overrides for this creative assignment. Applicable when the creative type is any of the following: - DISPLAY - RICH_MEDIA_INPAGE - RICH_MEDIA_INPAGE_FLOATING - RICH_MEDIA_IM_EXPAND - RICH_MEDIA_EXPANDING - RICH_MEDIA_INTERSTITIAL_FLOAT - RICH_MEDIA_MOBILE_IN_APP - RICH_MEDIA_MULTI_FLOATING - RICH_MEDIA_PEEL_DOWN - VPAID_LINEAR - VPAID_NON_LINEAR",
      ).optional(),
      sequence: z.number().int().describe(
        "Sequence number of the creative assignment, applicable when the rotation type is CREATIVE_ROTATION_TYPE_SEQUENTIAL. Acceptable values are 1 to 65535, inclusive.",
      ).optional(),
      sslCompliant: z.boolean().describe(
        "Whether the creative to be assigned is SSL-compliant. This is a read-only field that is auto-generated when the ad is inserted or updated.",
      ).optional(),
      startTime: z.string().optional(),
      weight: z.number().int().describe(
        "Weight of the creative assignment, applicable when the rotation type is CREATIVE_ROTATION_TYPE_RANDOM. Value must be greater than or equal to 1.",
      ).optional(),
    })).describe("Creative assignments in this creative rotation.").optional(),
    creativeOptimizationConfigurationId: z.string().describe(
      "Creative optimization configuration that is used by this ad. It should refer to one of the existing optimization configurations in the ad's campaign. If it is unset or set to 0, then the campaign's default optimization configuration will be used for this ad.",
    ).optional(),
    type: z.enum([
      "CREATIVE_ROTATION_TYPE_SEQUENTIAL",
      "CREATIVE_ROTATION_TYPE_RANDOM",
    ]).describe(
      "Type of creative rotation. Can be used to specify whether to use sequential or random rotation.",
    ).optional(),
    weightCalculationStrategy: z.enum([
      "WEIGHT_STRATEGY_EQUAL",
      "WEIGHT_STRATEGY_CUSTOM",
      "WEIGHT_STRATEGY_HIGHEST_CTR",
      "WEIGHT_STRATEGY_OPTIMIZED",
    ]).describe(
      "Strategy for calculating weights. Used with CREATIVE_ROTATION_TYPE_RANDOM.",
    ).optional(),
  }).describe("Creative Rotation.").optional(),
  dayPartTargeting: z.object({
    daysOfWeek: z.array(
      z.enum([
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
      ]),
    ).describe(
      'Days of the week when the ad will serve. Acceptable values are: - "SUNDAY" - "MONDAY" - "TUESDAY" - "WEDNESDAY" - "THURSDAY" - "FRIDAY" - "SATURDAY"',
    ).optional(),
    hoursOfDay: z.array(z.number().int()).describe(
      "Hours of the day when the ad will serve, where 0 is midnight to 1 AM and 23 is 11 PM to midnight. Can be specified with days of week, in which case the ad would serve during these hours on the specified days. For example if Monday, Wednesday, Friday are the days of week specified and 9-10am, 3-5pm (hours 9, 15, and 16) is specified, the ad would serve Monday, Wednesdays, and Fridays at 9-10am and 3-5pm. Acceptable values are 0 to 23, inclusive.",
    ).optional(),
    userLocalTime: z.boolean().describe(
      "Whether or not to use the user's local time. If false, the America/New York time zone applies.",
    ).optional(),
  }).describe("Day Part Targeting.").optional(),
  defaultClickThroughEventTagProperties: z.object({
    defaultClickThroughEventTagId: z.string().describe(
      "ID of the click-through event tag to apply to all ads in this entity's scope.",
    ).optional(),
    overrideInheritedEventTag: z.boolean().describe(
      "Whether this entity should override the inherited default click-through event tag with its own defined value.",
    ).optional(),
  }).describe(
    "Properties of inheriting and overriding the default click-through event tag. A campaign may override the event tag defined at the advertiser level, and an ad may also override the campaign's setting further.",
  ).optional(),
  deliverySchedule: z.object({
    frequencyCap: z.object({
      duration: z.string().describe(
        "Duration of time, in seconds, for this frequency cap. The maximum duration is 90 days. Acceptable values are 1 to 7776000, inclusive.",
      ).optional(),
      impressions: z.string().describe(
        "Number of times an individual user can be served the ad within the specified duration. Acceptable values are 1 to 15, inclusive.",
      ).optional(),
    }).describe("Frequency Cap.").optional(),
    hardCutoff: z.boolean().describe(
      "Whether or not hard cutoff is enabled. If true, the ad will not serve after the end date and time. Otherwise the ad will continue to be served until it has reached its delivery goals.",
    ).optional(),
    impressionRatio: z.string().describe(
      "Impression ratio for this ad. This ratio determines how often each ad is served relative to the others. For example, if ad A has an impression ratio of 1 and ad B has an impression ratio of 3, then Campaign Manager will serve ad B three times as often as ad A. Acceptable values are 1 to 10, inclusive.",
    ).optional(),
    priority: z.enum([
      "AD_PRIORITY_01",
      "AD_PRIORITY_02",
      "AD_PRIORITY_03",
      "AD_PRIORITY_04",
      "AD_PRIORITY_05",
      "AD_PRIORITY_06",
      "AD_PRIORITY_07",
      "AD_PRIORITY_08",
      "AD_PRIORITY_09",
      "AD_PRIORITY_10",
      "AD_PRIORITY_11",
      "AD_PRIORITY_12",
      "AD_PRIORITY_13",
      "AD_PRIORITY_14",
      "AD_PRIORITY_15",
      "AD_PRIORITY_16",
    ]).describe(
      "Serving priority of an ad, with respect to other ads. The lower the priority number, the greater the priority with which it is served.",
    ).optional(),
  }).describe("Delivery Schedule.").optional(),
  dynamicClickTracker: z.boolean().describe(
    "Whether this ad is a dynamic click tracker. Applicable when type is AD_SERVING_CLICK_TRACKER. This is a required field on insert, and is read-only after insert.",
  ).optional(),
  endTime: z.string().optional(),
  eventTagOverrides: z.array(z.object({
    enabled: z.boolean().describe("Whether this override is enabled.")
      .optional(),
    id: z.string().describe(
      "ID of this event tag override. This is a read-only, auto-generated field.",
    ).optional(),
  })).describe("Event tag overrides for this ad.").optional(),
  geoTargeting: z.object({
    cities: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this city belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this city belongs.",
      ).optional(),
      dartId: z.string().describe(
        "DART ID of this city. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#city".',
      ).optional(),
      metroCode: z.string().describe(
        "Metro region code of the metro region (DMA) to which this city belongs.",
      ).optional(),
      metroDmaId: z.string().describe(
        "ID of the metro region (DMA) to which this city belongs.",
      ).optional(),
      name: z.string().describe("Name of this city.").optional(),
      regionCode: z.string().describe(
        "Region code of the region to which this city belongs.",
      ).optional(),
      regionDartId: z.string().describe(
        "DART ID of the region to which this city belongs.",
      ).optional(),
    })).describe(
      "Cities to be targeted. For each city only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a city, do not target or exclude the country of the city, and do not target the metro or region of the city.",
    ).optional(),
    countries: z.array(z.object({
      countryCode: z.string().describe("Country code.").optional(),
      dartId: z.string().describe(
        "DART ID of this country. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#country".',
      ).optional(),
      name: z.string().describe("Name of this country.").optional(),
      sslEnabled: z.boolean().describe(
        "Whether ad serving supports secure servers in this country.",
      ).optional(),
      tvDataProviders: z.array(
        z.enum([
          "INVALID_TV_DATA_PROVIDER",
          "INTAGE_JP",
          "IBOPE_AR",
          "IBOPE_BR",
          "IBOPE_CL",
          "IBOPE_CO",
          "TNS_VN",
          "COMSCORE_NATIONAL_US",
          "COMSCORE_CA",
          "SAMBA_AU",
        ]),
      ).describe(
        "Output only. The TV data providers supported in this country.",
      ).optional(),
    })).describe(
      "Countries to be targeted or excluded from targeting, depending on the setting of the excludeCountries field. For each country only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting or excluding a country, do not target regions, cities, metros, or postal codes in the same country.",
    ).optional(),
    excludeCountries: z.boolean().describe(
      "Whether or not to exclude the countries in the countries field from targeting. If false, the countries field refers to countries which will be targeted by the ad.",
    ).optional(),
    metros: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this metro region belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this metro region belongs.",
      ).optional(),
      dartId: z.string().describe("DART ID of this metro region.").optional(),
      dmaId: z.string().describe(
        "DMA ID of this metro region. This is the ID used for targeting and generating reports, and is equivalent to metro_code.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#metro".',
      ).optional(),
      metroCode: z.string().describe(
        "Metro code of this metro region. This is equivalent to dma_id.",
      ).optional(),
      name: z.string().describe("Name of this metro region.").optional(),
    })).describe(
      "Metros to be targeted. For each metro only dmaId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a metro, do not target or exclude the country of the metro.",
    ).optional(),
    postalCodes: z.array(z.object({
      code: z.string().describe(
        "Postal code. This is equivalent to the id field.",
      ).optional(),
      countryCode: z.string().describe(
        "Country code of the country to which this postal code belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this postal code belongs.",
      ).optional(),
      id: z.string().describe("ID of this postal code.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#postalCode".',
      ).optional(),
    })).describe(
      "Postal codes to be targeted. For each postal code only id is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a postal code, do not target or exclude the country of the postal code.",
    ).optional(),
    regions: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this region belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this region belongs.",
      ).optional(),
      dartId: z.string().describe("DART ID of this region.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#region".',
      ).optional(),
      name: z.string().describe("Name of this region.").optional(),
      regionCode: z.string().describe("Region code.").optional(),
    })).describe(
      "Regions to be targeted. For each region only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting a region, do not target or exclude the country of the region.",
    ).optional(),
  }).describe("Geographical Targeting.").optional(),
  id: z.string().describe(
    "ID of this ad. This is a read-only, auto-generated field.",
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
  keyValueTargetingExpression: z.object({
    expression: z.string().describe(
      "Keyword expression being targeted by the ad.",
    ).optional(),
  }).describe("Key Value Targeting Expression.").optional(),
  languageTargeting: z.object({
    languages: z.array(z.object({
      id: z.string().describe(
        "Language ID of this language. This is the ID used for targeting and generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#language".',
      ).optional(),
      languageCode: z.string().describe(
        'Format of language code is an ISO 639 two-letter language code optionally followed by an underscore followed by an ISO 3166 code. Examples are "en" for English or "zh_CN" for Simplified Chinese.',
      ).optional(),
      name: z.string().describe("Name of this language.").optional(),
    })).describe(
      "Languages that this ad targets. For each language only languageId is required. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
  }).describe("Language Targeting.").optional(),
  lastModifiedInfo: z.object({
    time: z.string().describe(
      "Timestamp of the last change in milliseconds since epoch.",
    ).optional(),
  }).describe("Modification timestamp.").optional(),
  name: z.string().describe(
    "Name of this ad. This is a required field and must be less than 256 characters long.",
  ).optional(),
  placementAssignments: z.array(z.object({
    active: z.boolean().describe(
      "Whether this placement assignment is active. When true, the placement will be included in the ad's rotation.",
    ).optional(),
    placementId: z.string().describe(
      "ID of the placement to be assigned. This is a required field.",
    ).optional(),
    placementIdDimensionValue: z.object({
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
    sslRequired: z.boolean().describe(
      "Whether the placement to be assigned requires SSL. This is a read-only field that is auto-generated when the ad is inserted or updated.",
    ).optional(),
  })).describe("Placement assignments for this ad.").optional(),
  remarketingListExpression: z.object({
    expression: z.string().describe(
      "Expression describing which lists are being targeted by the ad.",
    ).optional(),
  }).describe("Remarketing List Targeting Expression.").optional(),
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
    "Whether this ad is ssl compliant. This is a read-only field that is auto-generated when the ad is inserted or updated.",
  ).optional(),
  sslRequired: z.boolean().describe(
    "Whether this ad requires ssl. This is a read-only field that is auto-generated when the ad is inserted or updated.",
  ).optional(),
  startTime: z.string().optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this ad. This is a read-only field that can be left blank.",
  ).optional(),
  targetingTemplateId: z.string().describe(
    "Targeting template ID, used to apply preconfigured targeting information to this ad. This cannot be set while any of dayPartTargeting, geoTargeting, keyValueTargetingExpression, languageTargeting, remarketingListExpression, or technologyTargeting are set. Applicable when type is AD_SERVING_STANDARD_AD.",
  ).optional(),
  technologyTargeting: z.object({
    browsers: z.array(z.object({
      browserVersionId: z.string().describe(
        "ID referring to this grouping of browser and version numbers. This is the ID used for targeting.",
      ).optional(),
      dartId: z.string().describe(
        "DART ID of this browser. This is the ID used when generating reports.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#browser".',
      ).optional(),
      majorVersion: z.string().describe(
        "Major version number (leftmost number) of this browser. For example, for Chrome 5.0.376.86 beta, this field should be set to 5. An asterisk (*) may be used to target any version number, and a question mark (?) may be used to target cases where the version number cannot be identified. For example, Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox?.? targets cases where the ad server knows the browser is Firefox but can't tell which version it is.",
      ).optional(),
      minorVersion: z.string().describe(
        "Minor version number (number after first dot on left) of this browser. For example, for Chrome 5.0.375.86 beta, this field should be set to 0. An asterisk (*) may be used to target any version number, and a question mark (?) may be used to target cases where the version number cannot be identified. For example, Chrome *.* targets any version of Chrome: 1.2, 2.5, 3.5, and so on. Chrome 3.* targets Chrome 3.1, 3.5, but not 4.0. Firefox?.? targets cases where the ad server knows the browser is Firefox but can't tell which version it is.",
      ).optional(),
      name: z.string().describe("Name of this browser.").optional(),
    })).describe(
      "Browsers that this ad targets. For each browser either set browserVersionId or dartId along with the version numbers. If both are specified, only browserVersionId will be used. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
    connectionTypes: z.array(z.object({
      id: z.string().describe("ID of this connection type.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#connectionType".',
      ).optional(),
      name: z.string().describe("Name of this connection type.").optional(),
    })).describe(
      "Connection types that this ad targets. For each connection type only id is required. The other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
    mobileCarriers: z.array(z.object({
      countryCode: z.string().describe(
        "Country code of the country to which this mobile carrier belongs.",
      ).optional(),
      countryDartId: z.string().describe(
        "DART ID of the country to which this mobile carrier belongs.",
      ).optional(),
      id: z.string().describe("ID of this mobile carrier.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileCarrier".',
      ).optional(),
      name: z.string().describe("Name of this mobile carrier.").optional(),
    })).describe(
      "Mobile carriers that this ad targets. For each mobile carrier only id is required, and the other fields are populated automatically when the ad is inserted or updated. If targeting a mobile carrier, do not set targeting for any zip codes.",
    ).optional(),
    operatingSystemVersions: z.array(z.object({
      id: z.string().describe("ID of this operating system version.")
        .optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystemVersion".',
      ).optional(),
      majorVersion: z.string().describe(
        "Major version (leftmost number) of this operating system version.",
      ).optional(),
      minorVersion: z.string().describe(
        "Minor version (number after the first dot) of this operating system version.",
      ).optional(),
      name: z.string().describe("Name of this operating system version.")
        .optional(),
      operatingSystem: z.object({
        dartId: z.string().describe(
          "DART ID of this operating system. This is the ID used for targeting.",
        ).optional(),
        desktop: z.boolean().describe(
          "Whether this operating system is for desktop.",
        ).optional(),
        kind: z.string().describe(
          'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystem".',
        ).optional(),
        mobile: z.boolean().describe(
          "Whether this operating system is for mobile.",
        ).optional(),
        name: z.string().describe("Name of this operating system.").optional(),
      }).describe(
        "Contains information about an operating system that can be targeted by ads.",
      ).optional(),
    })).describe(
      "Operating system versions that this ad targets. To target all versions, use operatingSystems. For each operating system version, only id is required. The other fields are populated automatically when the ad is inserted or updated. If targeting an operating system version, do not set targeting for the corresponding operating system in operatingSystems.",
    ).optional(),
    operatingSystems: z.array(z.object({
      dartId: z.string().describe(
        "DART ID of this operating system. This is the ID used for targeting.",
      ).optional(),
      desktop: z.boolean().describe(
        "Whether this operating system is for desktop.",
      ).optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#operatingSystem".',
      ).optional(),
      mobile: z.boolean().describe(
        "Whether this operating system is for mobile.",
      ).optional(),
      name: z.string().describe("Name of this operating system.").optional(),
    })).describe(
      "Operating systems that this ad targets. To target specific versions, use operatingSystemVersions. For each operating system only dartId is required. The other fields are populated automatically when the ad is inserted or updated. If targeting an operating system, do not set targeting for operating system versions for the same operating system.",
    ).optional(),
    platformTypes: z.array(z.object({
      id: z.string().describe("ID of this platform type.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#platformType".',
      ).optional(),
      name: z.string().describe("Name of this platform type.").optional(),
    })).describe(
      "Platform types that this ad targets. For example, desktop, mobile, or tablet. For each platform type, only id is required, and the other fields are populated automatically when the ad is inserted or updated.",
    ).optional(),
  }).describe("Technology Targeting.").optional(),
  type: z.enum([
    "AD_SERVING_STANDARD_AD",
    "AD_SERVING_DEFAULT_AD",
    "AD_SERVING_CLICK_TRACKER",
    "AD_SERVING_TRACKING",
    "AD_SERVING_BRAND_SAFE_AD",
  ]).describe(
    "Type of ad. This is a required field on insertion. Note that default ads ( AD_SERVING_DEFAULT_AD) cannot be created directly (see Creative resource).",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 Ads. Registered at `@swamp/gcp/dfareporting/ads`. */
export const model = {
  type: "@swamp/gcp/dfareporting/ads",
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
      description: "Contains properties of a Campaign Manager ad.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ads",
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
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["archived"] !== undefined) body["archived"] = g["archived"];
        if (g["audienceSegmentId"] !== undefined) {
          body["audienceSegmentId"] = g["audienceSegmentId"];
        }
        if (g["campaignId"] !== undefined) body["campaignId"] = g["campaignId"];
        if (g["campaignIdDimensionValue"] !== undefined) {
          body["campaignIdDimensionValue"] = g["campaignIdDimensionValue"];
        }
        if (g["clickThroughUrl"] !== undefined) {
          body["clickThroughUrl"] = g["clickThroughUrl"];
        }
        if (g["clickThroughUrlSuffixProperties"] !== undefined) {
          body["clickThroughUrlSuffixProperties"] =
            g["clickThroughUrlSuffixProperties"];
        }
        if (g["comments"] !== undefined) body["comments"] = g["comments"];
        if (g["compatibility"] !== undefined) {
          body["compatibility"] = g["compatibility"];
        }
        if (g["contextualKeywordTargeting"] !== undefined) {
          body["contextualKeywordTargeting"] = g["contextualKeywordTargeting"];
        }
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["creativeGroupAssignments"] !== undefined) {
          body["creativeGroupAssignments"] = g["creativeGroupAssignments"];
        }
        if (g["creativeRotation"] !== undefined) {
          body["creativeRotation"] = g["creativeRotation"];
        }
        if (g["dayPartTargeting"] !== undefined) {
          body["dayPartTargeting"] = g["dayPartTargeting"];
        }
        if (g["defaultClickThroughEventTagProperties"] !== undefined) {
          body["defaultClickThroughEventTagProperties"] =
            g["defaultClickThroughEventTagProperties"];
        }
        if (g["deliverySchedule"] !== undefined) {
          body["deliverySchedule"] = g["deliverySchedule"];
        }
        if (g["dynamicClickTracker"] !== undefined) {
          body["dynamicClickTracker"] = g["dynamicClickTracker"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["eventTagOverrides"] !== undefined) {
          body["eventTagOverrides"] = g["eventTagOverrides"];
        }
        if (g["geoTargeting"] !== undefined) {
          body["geoTargeting"] = g["geoTargeting"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["keyValueTargetingExpression"] !== undefined) {
          body["keyValueTargetingExpression"] =
            g["keyValueTargetingExpression"];
        }
        if (g["languageTargeting"] !== undefined) {
          body["languageTargeting"] = g["languageTargeting"];
        }
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["placementAssignments"] !== undefined) {
          body["placementAssignments"] = g["placementAssignments"];
        }
        if (g["remarketingListExpression"] !== undefined) {
          body["remarketingListExpression"] = g["remarketingListExpression"];
        }
        if (g["size"] !== undefined) body["size"] = g["size"];
        if (g["sslCompliant"] !== undefined) {
          body["sslCompliant"] = g["sslCompliant"];
        }
        if (g["sslRequired"] !== undefined) {
          body["sslRequired"] = g["sslRequired"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["targetingTemplateId"] !== undefined) {
          body["targetingTemplateId"] = g["targetingTemplateId"];
        }
        if (g["technologyTargeting"] !== undefined) {
          body["technologyTargeting"] = g["technologyTargeting"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Get a ads",
      arguments: z.object({
        identifier: z.string().describe("The id of the ads"),
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
      description: "Update ads attributes",
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
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["archived"] !== undefined) body["archived"] = g["archived"];
        if (g["audienceSegmentId"] !== undefined) {
          body["audienceSegmentId"] = g["audienceSegmentId"];
        }
        if (g["campaignId"] !== undefined) body["campaignId"] = g["campaignId"];
        if (g["campaignIdDimensionValue"] !== undefined) {
          body["campaignIdDimensionValue"] = g["campaignIdDimensionValue"];
        }
        if (g["clickThroughUrl"] !== undefined) {
          body["clickThroughUrl"] = g["clickThroughUrl"];
        }
        if (g["clickThroughUrlSuffixProperties"] !== undefined) {
          body["clickThroughUrlSuffixProperties"] =
            g["clickThroughUrlSuffixProperties"];
        }
        if (g["comments"] !== undefined) body["comments"] = g["comments"];
        if (g["compatibility"] !== undefined) {
          body["compatibility"] = g["compatibility"];
        }
        if (g["contextualKeywordTargeting"] !== undefined) {
          body["contextualKeywordTargeting"] = g["contextualKeywordTargeting"];
        }
        if (g["createInfo"] !== undefined) body["createInfo"] = g["createInfo"];
        if (g["creativeGroupAssignments"] !== undefined) {
          body["creativeGroupAssignments"] = g["creativeGroupAssignments"];
        }
        if (g["creativeRotation"] !== undefined) {
          body["creativeRotation"] = g["creativeRotation"];
        }
        if (g["dayPartTargeting"] !== undefined) {
          body["dayPartTargeting"] = g["dayPartTargeting"];
        }
        if (g["defaultClickThroughEventTagProperties"] !== undefined) {
          body["defaultClickThroughEventTagProperties"] =
            g["defaultClickThroughEventTagProperties"];
        }
        if (g["deliverySchedule"] !== undefined) {
          body["deliverySchedule"] = g["deliverySchedule"];
        }
        if (g["dynamicClickTracker"] !== undefined) {
          body["dynamicClickTracker"] = g["dynamicClickTracker"];
        }
        if (g["endTime"] !== undefined) body["endTime"] = g["endTime"];
        if (g["eventTagOverrides"] !== undefined) {
          body["eventTagOverrides"] = g["eventTagOverrides"];
        }
        if (g["geoTargeting"] !== undefined) {
          body["geoTargeting"] = g["geoTargeting"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["keyValueTargetingExpression"] !== undefined) {
          body["keyValueTargetingExpression"] =
            g["keyValueTargetingExpression"];
        }
        if (g["languageTargeting"] !== undefined) {
          body["languageTargeting"] = g["languageTargeting"];
        }
        if (g["lastModifiedInfo"] !== undefined) {
          body["lastModifiedInfo"] = g["lastModifiedInfo"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["placementAssignments"] !== undefined) {
          body["placementAssignments"] = g["placementAssignments"];
        }
        if (g["remarketingListExpression"] !== undefined) {
          body["remarketingListExpression"] = g["remarketingListExpression"];
        }
        if (g["size"] !== undefined) body["size"] = g["size"];
        if (g["sslCompliant"] !== undefined) {
          body["sslCompliant"] = g["sslCompliant"];
        }
        if (g["sslRequired"] !== undefined) {
          body["sslRequired"] = g["sslRequired"];
        }
        if (g["startTime"] !== undefined) body["startTime"] = g["startTime"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["targetingTemplateId"] !== undefined) {
          body["targetingTemplateId"] = g["targetingTemplateId"];
        }
        if (g["technologyTargeting"] !== undefined) {
          body["technologyTargeting"] = g["technologyTargeting"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Sync ads state from GCP",
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
