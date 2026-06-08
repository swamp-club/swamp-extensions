// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/displayvideo/partners-targetingtypes-assignedtargetingoptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Partners.TargetingTypes.AssignedTargetingOptions.
 *
 * A single assigned targeting option, which defines the state of a targeting option for an entity with targeting settings.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.partners.targetingTypes.assignedTargetingOptions.get",
  "path":
    "v4/partners/{+partnerId}/targetingTypes/{+targetingType}/assignedTargetingOptions/{+assignedTargetingOptionId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "partnerId",
    "targetingType",
    "assignedTargetingOptionId",
  ],
  "parameters": {
    "assignedTargetingOptionId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "path",
      "required": true,
    },
    "targetingType": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.partners.targetingTypes.assignedTargetingOptions.create",
  "path":
    "v4/partners/{+partnerId}/targetingTypes/{+targetingType}/assignedTargetingOptions",
  "httpMethod": "POST",
  "parameterOrder": [
    "partnerId",
    "targetingType",
  ],
  "parameters": {
    "partnerId": {
      "location": "path",
      "required": true,
    },
    "targetingType": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.partners.targetingTypes.assignedTargetingOptions.delete",
  "path":
    "v4/partners/{+partnerId}/targetingTypes/{+targetingType}/assignedTargetingOptions/{+assignedTargetingOptionId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "partnerId",
    "targetingType",
    "assignedTargetingOptionId",
  ],
  "parameters": {
    "assignedTargetingOptionId": {
      "location": "path",
      "required": true,
    },
    "partnerId": {
      "location": "path",
      "required": true,
    },
    "targetingType": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.partners.targetingTypes.assignedTargetingOptions.list",
  "path":
    "v4/partners/{+partnerId}/targetingTypes/{+targetingType}/assignedTargetingOptions",
  "httpMethod": "GET",
  "parameterOrder": [
    "partnerId",
    "targetingType",
  ],
  "parameters": {
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
    "partnerId": {
      "location": "path",
      "required": true,
    },
    "targetingType": {
      "location": "path",
      "required": true,
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
  ageRangeDetails: z.object({
    ageRange: z.enum([
      "AGE_RANGE_UNSPECIFIED",
      "AGE_RANGE_18_24",
      "AGE_RANGE_25_34",
      "AGE_RANGE_35_44",
      "AGE_RANGE_45_54",
      "AGE_RANGE_55_64",
      "AGE_RANGE_65_PLUS",
      "AGE_RANGE_UNKNOWN",
      "AGE_RANGE_18_20",
      "AGE_RANGE_21_24",
      "AGE_RANGE_25_29",
      "AGE_RANGE_30_34",
      "AGE_RANGE_35_39",
      "AGE_RANGE_40_44",
      "AGE_RANGE_45_49",
      "AGE_RANGE_50_54",
      "AGE_RANGE_55_59",
      "AGE_RANGE_60_64",
    ]).describe(
      "Required. The age range of an audience. We only support targeting a continuous age range of an audience. Thus, the age range represented in this field can be 1) targeted solely, or, 2) part of a larger continuous age range. The reach of a continuous age range targeting can be expanded by also targeting an audience of an unknown age.",
    ).optional(),
  }).describe(
    "Represents a targetable age range. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_AGE_RANGE`.",
  ).optional(),
  appCategoryDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the app category.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_APP_CATEGORY`.",
    ).optional(),
  }).describe(
    "Details for assigned app category targeting option. This will be populated in the app_category_details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_APP_CATEGORY`.",
  ).optional(),
  appDetails: z.object({
    appId: z.string().describe(
      "Required. The ID of the app. Android's Play store app uses bundle ID, for example `com.google.android.gm`. Apple's App store app ID uses 9 digit string, for example `422689480`.",
    ).optional(),
    appPlatform: z.enum([
      "APP_PLATFORM_UNSPECIFIED",
      "APP_PLATFORM_IOS",
      "APP_PLATFORM_ANDROID",
      "APP_PLATFORM_ROKU",
      "APP_PLATFORM_AMAZON_FIRETV",
      "APP_PLATFORM_PLAYSTATION",
      "APP_PLATFORM_APPLE_TV",
      "APP_PLATFORM_XBOX",
      "APP_PLATFORM_SAMSUNG_TV",
      "APP_PLATFORM_ANDROID_TV",
      "APP_PLATFORM_GENERIC_CTV",
      "APP_PLATFORM_LG_TV",
      "APP_PLATFORM_VIZIO_TV",
      "APP_PLATFORM_VIDAA",
    ]).describe(
      "Indicates the platform of the targeted app. If this field is not specified, the app platform will be assumed to be mobile (i.e., Android or iOS), and we will derive the appropriate mobile platform from the app ID.",
    ).optional(),
    displayName: z.string().describe(
      "Output only. The display name of the app.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
  }).describe(
    "Details for assigned app targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_APP`.",
  ).optional(),
  audienceGroupDetails: z.object({
    excludedFirstPartyAndPartnerAudienceGroup: z.object({
      settings: z.array(z.object({
        firstPartyAndPartnerAudienceId: z.string().describe(
          "Required. First party and partner audience id of the first party and partner audience targeting setting. This id is first_party_and_partner_audience_id.",
        ).optional(),
        recency: z.enum([
          "RECENCY_NO_LIMIT",
          "RECENCY_1_MINUTE",
          "RECENCY_5_MINUTES",
          "RECENCY_10_MINUTES",
          "RECENCY_15_MINUTES",
          "RECENCY_30_MINUTES",
          "RECENCY_1_HOUR",
          "RECENCY_2_HOURS",
          "RECENCY_3_HOURS",
          "RECENCY_6_HOURS",
          "RECENCY_12_HOURS",
          "RECENCY_1_DAY",
          "RECENCY_2_DAYS",
          "RECENCY_3_DAYS",
          "RECENCY_5_DAYS",
          "RECENCY_7_DAYS",
          "RECENCY_10_DAYS",
          "RECENCY_14_DAYS",
          "RECENCY_15_DAYS",
          "RECENCY_21_DAYS",
          "RECENCY_28_DAYS",
          "RECENCY_30_DAYS",
          "RECENCY_40_DAYS",
          "RECENCY_45_DAYS",
          "RECENCY_60_DAYS",
          "RECENCY_90_DAYS",
          "RECENCY_120_DAYS",
          "RECENCY_180_DAYS",
          "RECENCY_270_DAYS",
          "RECENCY_365_DAYS",
        ]).describe(
          "Required. The recency of the first party and partner audience targeting setting. Only applicable to first party audiences, otherwise will be ignored. For more info, refer to https://support.google.com/displayvideo/answer/2949947#recency When unspecified, no recency limit will be used.",
        ).optional(),
      })).describe(
        "Required. All first party and partner audience targeting settings in first party and partner audience group. Repeated settings with the same id are not allowed.",
      ).optional(),
    }).describe(
      "Details of first party and partner audience group. All first party and partner audience targeting settings are logically ‘OR’ of each other.",
    ).optional(),
    excludedGoogleAudienceGroup: z.object({
      settings: z.array(z.object({
        googleAudienceId: z.string().describe(
          "Required. Google audience id of the Google audience targeting setting. This id is google_audience_id.",
        ).optional(),
      })).describe(
        "Required. All Google audience targeting settings in Google audience group. Repeated settings with the same id will be ignored.",
      ).optional(),
    }).describe(
      "Details of Google audience group. All Google audience targeting settings are logically ‘OR’ of each other.",
    ).optional(),
    includedCombinedAudienceGroup: z.object({
      settings: z.array(z.object({
        combinedAudienceId: z.string().describe(
          "Required. Combined audience id of combined audience targeting setting. This id is combined_audience_id.",
        ).optional(),
      })).describe(
        "Required. All combined audience targeting settings in combined audience group. Repeated settings with the same id will be ignored. The number of combined audience settings should be no more than five, error will be thrown otherwise.",
      ).optional(),
    }).describe(
      "Details of combined audience group. All combined audience targeting settings are logically ‘OR’ of each other.",
    ).optional(),
    includedCustomListGroup: z.object({
      settings: z.array(z.object({
        customListId: z.string().describe(
          "Required. Custom id of custom list targeting setting. This id is custom_list_id.",
        ).optional(),
      })).describe(
        "Required. All custom list targeting settings in custom list group. Repeated settings with the same id will be ignored.",
      ).optional(),
    }).describe(
      "Details of custom list group. All custom list targeting settings are logically ‘OR’ of each other.",
    ).optional(),
    includedFirstPartyAndPartnerAudienceGroups: z.array(z.object({
      settings: z.array(z.object({
        firstPartyAndPartnerAudienceId: z.unknown().describe(
          "Required. First party and partner audience id of the first party and partner audience targeting setting. This id is first_party_and_partner_audience_id.",
        ).optional(),
        recency: z.unknown().describe(
          "Required. The recency of the first party and partner audience targeting setting. Only applicable to first party audiences, otherwise will be ignored. For more info, refer to https://support.google.com/displayvideo/answer/2949947#recency When unspecified, no recency limit will be used.",
        ).optional(),
      })).describe(
        "Required. All first party and partner audience targeting settings in first party and partner audience group. Repeated settings with the same id are not allowed.",
      ).optional(),
    })).describe(
      "Optional. The first party and partner audience ids and recencies of included first party and partner audience groups. Each first party and partner audience group contains first party and partner audience ids only. The relation between each first party and partner audience group is INTERSECTION, and the result is UNION'ed with other audience groups. Repeated groups with the same settings will be ignored.",
    ).optional(),
    includedGoogleAudienceGroup: z.object({
      settings: z.array(z.object({
        googleAudienceId: z.string().describe(
          "Required. Google audience id of the Google audience targeting setting. This id is google_audience_id.",
        ).optional(),
      })).describe(
        "Required. All Google audience targeting settings in Google audience group. Repeated settings with the same id will be ignored.",
      ).optional(),
    }).describe(
      "Details of Google audience group. All Google audience targeting settings are logically ‘OR’ of each other.",
    ).optional(),
  }).describe(
    "Assigned audience group targeting option details. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_AUDIENCE_GROUP`. The relation between each group is UNION, except for excluded_first_and_third_party_audience_group and excluded_google_audience_group, of which COMPLEMENT is used as an INTERSECTION with other groups.",
  ).optional(),
  audioContentTypeDetails: z.object({
    audioContentType: z.enum([
      "AUDIO_CONTENT_TYPE_UNSPECIFIED",
      "AUDIO_CONTENT_TYPE_UNKNOWN",
      "AUDIO_CONTENT_TYPE_MUSIC",
      "AUDIO_CONTENT_TYPE_BROADCAST",
      "AUDIO_CONTENT_TYPE_PODCAST",
      "AUDIO_CONTENT_TYPE_CATCH_UP_RADIO",
      "AUDIO_CONTENT_TYPE_WEB_RADIO",
      "AUDIO_CONTENT_TYPE_VIDEO_GAME",
      "AUDIO_CONTENT_TYPE_TEXT_TO_SPEECH",
    ]).describe("Required. The audio content type.").optional(),
  }).describe(
    "Details for audio content type assigned targeting option. This will be populated in the audio_content_type_details field when targeting_type is `TARGETING_TYPE_AUDIO_CONTENT_TYPE`. Explicitly targeting all options is not supported. Remove all audio content type targeting options to achieve this effect.",
  ).optional(),
  authorizedSellerStatusDetails: z.object({
    authorizedSellerStatus: z.enum([
      "AUTHORIZED_SELLER_STATUS_UNSPECIFIED",
      "AUTHORIZED_SELLER_STATUS_AUTHORIZED_DIRECT_SELLERS_ONLY",
      "AUTHORIZED_SELLER_STATUS_AUTHORIZED_AND_NON_PARTICIPATING_PUBLISHERS",
    ]).describe("Output only. The authorized seller status to target.")
      .optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`.",
    ).optional(),
  }).describe(
    'Represents an assigned authorized seller status. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`. If a resource does not have an `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` assigned targeting option, it is using the "Authorized Direct Sellers and Resellers" option.',
  ).optional(),
  browserDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the browser.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted. All assigned browser targeting options on the same resource must have the same value for this field.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_BROWSER`.",
    ).optional(),
  }).describe(
    "Details for assigned browser targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_BROWSER`.",
  ).optional(),
  businessChainDetails: z.object({
    displayName: z.string().describe(
      'Output only. The display name of a business chain, e.g. "KFC", "Chase Bank".',
    ).optional(),
    proximityRadiusAmount: z.number().describe(
      "Required. The radius of the area around the business chain that will be targeted. The units of the radius are specified by proximity_radius_unit. Must be 1 to 800 if unit is `DISTANCE_UNIT_KILOMETERS` and 1 to 500 if unit is `DISTANCE_UNIT_MILES`. The minimum increment for both cases is 0.1. Inputs will be rounded to the nearest acceptable value if it is too granular, e.g. 15.57 will become 15.6.",
    ).optional(),
    proximityRadiusUnit: z.enum([
      "DISTANCE_UNIT_UNSPECIFIED",
      "DISTANCE_UNIT_MILES",
      "DISTANCE_UNIT_KILOMETERS",
    ]).describe(
      "Required. The unit of distance by which the targeting radius is measured.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_BUSINESS_CHAIN`. Accepted business chain targeting option IDs can be retrieved using SearchTargetingOptions.",
    ).optional(),
  }).describe(
    "Details for assigned Business chain targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_BUSINESS_CHAIN`.",
  ).optional(),
  carrierAndIspDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the carrier or ISP.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted. All assigned carrier and ISP targeting options on the same resource must have the same value for this field.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_CARRIER_AND_ISP`.",
    ).optional(),
  }).describe(
    "Details for assigned carrier and ISP targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_CARRIER_AND_ISP`.",
  ).optional(),
  categoryDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the category.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CATEGORY`.",
    ).optional(),
  }).describe(
    "Assigned category targeting option details. This will be populated in the category_details field when targeting_type is `TARGETING_TYPE_CATEGORY`.",
  ).optional(),
  channelDetails: z.object({
    channelId: z.string().describe(
      "Required. ID of the channel. Should refer to the channel ID field on a [Partner-owned channel](partners.channels#Channel.FIELDS.channel_id) or [advertiser-owned channel](advertisers.channels#Channel.FIELDS.channel_id) resource.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted. For advertiser level assigned targeting option, this field must be true.",
    ).optional(),
  }).describe(
    "Details for assigned channel targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_CHANNEL`.",
  ).optional(),
  contentDurationDetails: z.object({
    contentDuration: z.enum([
      "CONTENT_DURATION_UNSPECIFIED",
      "CONTENT_DURATION_UNKNOWN",
      "CONTENT_DURATION_0_TO_1_MIN",
      "CONTENT_DURATION_1_TO_5_MIN",
      "CONTENT_DURATION_5_TO_15_MIN",
      "CONTENT_DURATION_15_TO_30_MIN",
      "CONTENT_DURATION_30_TO_60_MIN",
      "CONTENT_DURATION_OVER_60_MIN",
    ]).describe("Output only. The content duration.").optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_DURATION`.",
    ).optional(),
  }).describe(
    "Details for content duration assigned targeting option. This will be populated in the content_duration_details field when targeting_type is `TARGETING_TYPE_CONTENT_DURATION`. Explicitly targeting all options is not supported. Remove all content duration targeting options to achieve this effect.",
  ).optional(),
  contentGenreDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the content genre.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_GENRE`.",
    ).optional(),
  }).describe(
    "Details for content genre assigned targeting option. This will be populated in the content_genre_details field when targeting_type is `TARGETING_TYPE_CONTENT_GENRE`. Explicitly targeting all options is not supported. Remove all content genre targeting options to achieve this effect.",
  ).optional(),
  contentInstreamPositionDetails: z.object({
    adType: z.enum([
      "AD_TYPE_UNSPECIFIED",
      "AD_TYPE_DISPLAY",
      "AD_TYPE_VIDEO",
      "AD_TYPE_AUDIO",
    ]).describe(
      "Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`. * `AD_TYPE_AUDIO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_AUDIO_DEFAULT`.",
    ).optional(),
    contentInstreamPosition: z.enum([
      "CONTENT_INSTREAM_POSITION_UNSPECIFIED",
      "CONTENT_INSTREAM_POSITION_PRE_ROLL",
      "CONTENT_INSTREAM_POSITION_MID_ROLL",
      "CONTENT_INSTREAM_POSITION_POST_ROLL",
      "CONTENT_INSTREAM_POSITION_UNKNOWN",
    ]).describe(
      "Required. The content instream position for video or audio ads.",
    ).optional(),
  }).describe(
    "Assigned content instream position targeting option details. This will be populated in the content_instream_position_details field when targeting_type is `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`.",
  ).optional(),
  contentOutstreamPositionDetails: z.object({
    adType: z.enum([
      "AD_TYPE_UNSPECIFIED",
      "AD_TYPE_DISPLAY",
      "AD_TYPE_VIDEO",
      "AD_TYPE_AUDIO",
    ]).describe(
      "Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_DISPLAY`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_DISPLAY_DEFAULT`. * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`.",
    ).optional(),
    contentOutstreamPosition: z.enum([
      "CONTENT_OUTSTREAM_POSITION_UNSPECIFIED",
      "CONTENT_OUTSTREAM_POSITION_UNKNOWN",
      "CONTENT_OUTSTREAM_POSITION_IN_ARTICLE",
      "CONTENT_OUTSTREAM_POSITION_IN_BANNER",
      "CONTENT_OUTSTREAM_POSITION_IN_FEED",
      "CONTENT_OUTSTREAM_POSITION_INTERSTITIAL",
    ]).describe("Required. The content outstream position.").optional(),
  }).describe(
    "Assigned content outstream position targeting option details. This will be populated in the content_outstream_position_details field when targeting_type is `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`.",
  ).optional(),
  contentStreamTypeDetails: z.object({
    contentStreamType: z.enum([
      "CONTENT_STREAM_TYPE_UNSPECIFIED",
      "CONTENT_LIVE_STREAM",
      "CONTENT_ON_DEMAND",
    ]).describe("Output only. The content stream type.").optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_STREAM_TYPE`.",
    ).optional(),
  }).describe(
    "Details for content stream type assigned targeting option. This will be populated in the content_stream_type_details field when targeting_type is `TARGETING_TYPE_CONTENT_STREAM_TYPE`. Explicitly targeting all options is not supported. Remove all content stream type targeting options to achieve this effect.",
  ).optional(),
  contentThemeExclusionDetails: z.object({
    contentTheme: z.enum([
      "CONTENT_THEME_UNSPECIFIED",
      "CONTENT_THEME_FIGHTING_VIDEO_GAMES",
      "CONTENT_THEME_MATURE_GAMES",
      "CONTENT_THEME_NOT_YET_DETERMINED_HEALTH_SOURCES",
      "CONTENT_THEME_NOT_YET_DETERMINED_NEWS_SOURCES",
      "CONTENT_THEME_POLITICS",
      "CONTENT_THEME_RECENT_NEWS",
      "CONTENT_THEME_RELIGION",
      "CONTENT_THEME_UNPLEASANT_HEALTH_CONTENT",
      "CONTENT_THEME_UNPLEASANT_NEWS",
    ]).describe("Output only. An enum for the DV360 content theme classifier.")
      .optional(),
    excludedContentTheme: z.enum([
      "CONTENT_THEME_UNSPECIFIED",
      "CONTENT_THEME_FIGHTING_VIDEO_GAMES",
      "CONTENT_THEME_MATURE_GAMES",
      "CONTENT_THEME_NOT_YET_DETERMINED_HEALTH_SOURCES",
      "CONTENT_THEME_NOT_YET_DETERMINED_NEWS_SOURCES",
      "CONTENT_THEME_POLITICS",
      "CONTENT_THEME_RECENT_NEWS",
      "CONTENT_THEME_RELIGION",
      "CONTENT_THEME_UNPLEASANT_HEALTH_CONTENT",
      "CONTENT_THEME_UNPLEASANT_NEWS",
    ]).describe(
      "Required. An enum for the DV360 content theme classified to be EXCLUDED.",
    ).optional(),
    excludedTargetingOptionId: z.string().describe(
      "Required. ID of the content theme to be EXCLUDED.",
    ).optional(),
  }).describe(
    "Targeting details for content theme. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_CONTENT_THEME_EXCLUSION`.",
  ).optional(),
  dayAndTimeDetails: z.object({
    dayOfWeek: z.enum([
      "DAY_OF_WEEK_UNSPECIFIED",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]).describe(
      "Required. The day of the week for this day and time targeting setting.",
    ).optional(),
    endHour: z.number().int().describe(
      "Required. The end hour for day and time targeting. Must be between 1 (1 hour after start of day) and 24 (end of day).",
    ).optional(),
    startHour: z.number().int().describe(
      "Required. The start hour for day and time targeting. Must be between 0 (start of day) and 23 (1 hour before end of day).",
    ).optional(),
    timeZoneResolution: z.enum([
      "TIME_ZONE_RESOLUTION_UNSPECIFIED",
      "TIME_ZONE_RESOLUTION_END_USER",
      "TIME_ZONE_RESOLUTION_ADVERTISER",
    ]).describe(
      "Required. The mechanism used to determine which timezone to use for this day and time targeting setting. For Demand Gen line items, this field is always `TIME_ZONE_RESOLUTION_ADVERTISER`.",
    ).optional(),
  }).describe(
    "Representation of a segment of time defined on a specific day of the week and with a start and end time. The time represented by `start_hour` must be before the time represented by `end_hour`.",
  ).optional(),
  deviceMakeModelDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the device make and model.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`.",
    ).optional(),
  }).describe(
    "Assigned device make and model targeting option details. This will be populated in the device_make_model_details field when targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`.",
  ).optional(),
  deviceTypeDetails: z.object({
    deviceType: z.enum([
      "DEVICE_TYPE_UNSPECIFIED",
      "DEVICE_TYPE_COMPUTER",
      "DEVICE_TYPE_CONNECTED_TV",
      "DEVICE_TYPE_SMART_PHONE",
      "DEVICE_TYPE_TABLET",
      "DEVICE_TYPE_CONNECTED_DEVICE",
    ]).describe("Required. The display name of the device type.").optional(),
    youtubeAndPartnersBidMultiplier: z.number().describe(
      "Output only. Bid multiplier allows you to show your ads more or less frequently based on the device type. It will apply a multiplier on the original bid price. When this field is 0, it indicates this field is not applicable instead of multiplying 0 on the original bid price. For example, if the bid price without multiplier is $10.0 and the multiplier is 1.5 for Tablet, the resulting bid price for Tablet will be $15.0. Only applicable to YouTube and Partners line items.",
    ).optional(),
  }).describe(
    "Targeting details for device type. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_DEVICE_TYPE`.",
  ).optional(),
  digitalContentLabelExclusionDetails: z.object({
    excludedContentRatingTier: z.enum([
      "CONTENT_RATING_TIER_UNSPECIFIED",
      "CONTENT_RATING_TIER_UNRATED",
      "CONTENT_RATING_TIER_GENERAL",
      "CONTENT_RATING_TIER_PARENTAL_GUIDANCE",
      "CONTENT_RATING_TIER_TEENS",
      "CONTENT_RATING_TIER_MATURE",
      "CONTENT_RATING_TIER_FAMILIES",
    ]).describe(
      "Required. The display name of the digital content label rating tier to be EXCLUDED.",
    ).optional(),
  }).describe(
    "Targeting details for digital content label. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`.",
  ).optional(),
  environmentDetails: z.object({
    environment: z.enum([
      "ENVIRONMENT_UNSPECIFIED",
      "ENVIRONMENT_WEB_OPTIMIZED",
      "ENVIRONMENT_WEB_NOT_OPTIMIZED",
      "ENVIRONMENT_APP",
    ]).describe("Required. The serving environment.").optional(),
  }).describe(
    "Assigned environment targeting option details. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_ENVIRONMENT`.",
  ).optional(),
  exchangeDetails: z.object({
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
    ]).describe("Required. The enum value for the exchange.").optional(),
  }).describe(
    "Details for assigned exchange targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_EXCHANGE`.",
  ).optional(),
  genderDetails: z.object({
    gender: z.enum([
      "GENDER_UNSPECIFIED",
      "GENDER_MALE",
      "GENDER_FEMALE",
      "GENDER_UNKNOWN",
    ]).describe("Required. The gender of the audience.").optional(),
  }).describe(
    "Details for assigned gender targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_GENDER`.",
  ).optional(),
  geoRegionDetails: z.object({
    displayName: z.string().describe(
      'Output only. The display name of the geographic region (e.g., "Ontario, Canada").',
    ).optional(),
    geoRegionType: z.enum([
      "GEO_REGION_TYPE_UNKNOWN",
      "GEO_REGION_TYPE_OTHER",
      "GEO_REGION_TYPE_COUNTRY",
      "GEO_REGION_TYPE_REGION",
      "GEO_REGION_TYPE_TERRITORY",
      "GEO_REGION_TYPE_PROVINCE",
      "GEO_REGION_TYPE_STATE",
      "GEO_REGION_TYPE_PREFECTURE",
      "GEO_REGION_TYPE_GOVERNORATE",
      "GEO_REGION_TYPE_CANTON",
      "GEO_REGION_TYPE_UNION_TERRITORY",
      "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY",
      "GEO_REGION_TYPE_DMA_REGION",
      "GEO_REGION_TYPE_METRO",
      "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT",
      "GEO_REGION_TYPE_COUNTY",
      "GEO_REGION_TYPE_MUNICIPALITY",
      "GEO_REGION_TYPE_CITY",
      "GEO_REGION_TYPE_POSTAL_CODE",
      "GEO_REGION_TYPE_DEPARTMENT",
      "GEO_REGION_TYPE_AIRPORT",
      "GEO_REGION_TYPE_TV_REGION",
      "GEO_REGION_TYPE_OKRUG",
      "GEO_REGION_TYPE_BOROUGH",
      "GEO_REGION_TYPE_CITY_REGION",
      "GEO_REGION_TYPE_ARRONDISSEMENT",
      "GEO_REGION_TYPE_NEIGHBORHOOD",
      "GEO_REGION_TYPE_UNIVERSITY",
      "GEO_REGION_TYPE_DISTRICT",
      "GEO_REGION_TYPE_NATIONAL_PARK",
      "GEO_REGION_TYPE_BARRIO",
      "GEO_REGION_TYPE_SUB_WARD",
      "GEO_REGION_TYPE_MUNICIPALITY_DISTRICT",
      "GEO_REGION_TYPE_SUB_DISTRICT",
      "GEO_REGION_TYPE_QUARTER",
      "GEO_REGION_TYPE_DIVISION",
      "GEO_REGION_TYPE_COMMUNE",
      "GEO_REGION_TYPE_COLLOQUIAL_AREA",
      "GEO_REGION_TYPE_POST_TOWN",
      "GEO_REGION_TYPE_WARD",
    ]).describe("Output only. The type of geographic region targeting.")
      .optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_GEO_REGION`.",
    ).optional(),
  }).describe(
    "Details for assigned geographic region targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_GEO_REGION`.",
  ).optional(),
  householdIncomeDetails: z.object({
    householdIncome: z.enum([
      "HOUSEHOLD_INCOME_UNSPECIFIED",
      "HOUSEHOLD_INCOME_UNKNOWN",
      "HOUSEHOLD_INCOME_LOWER_50_PERCENT",
      "HOUSEHOLD_INCOME_TOP_41_TO_50_PERCENT",
      "HOUSEHOLD_INCOME_TOP_31_TO_40_PERCENT",
      "HOUSEHOLD_INCOME_TOP_21_TO_30_PERCENT",
      "HOUSEHOLD_INCOME_TOP_11_TO_20_PERCENT",
      "HOUSEHOLD_INCOME_TOP_10_PERCENT",
    ]).describe("Required. The household income of the audience.").optional(),
  }).describe(
    "Details for assigned household income targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_HOUSEHOLD_INCOME`.",
  ).optional(),
  inventorySourceDetails: z.object({
    inventorySourceId: z.string().describe(
      "Required. ID of the inventory source. Should refer to the inventory_source_id field of an InventorySource resource.",
    ).optional(),
  }).describe(
    "Targeting details for inventory source. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE`.",
  ).optional(),
  inventorySourceGroupDetails: z.object({
    inventorySourceGroupId: z.string().describe(
      "Required. ID of the inventory source group. Should refer to the inventory_source_group_id field of an InventorySourceGroup resource.",
    ).optional(),
  }).describe(
    "Targeting details for inventory source group. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE_GROUP`.",
  ).optional(),
  keywordDetails: z.object({
    exemptedPolicyNames: z.array(z.string()).describe(
      "Optional. The policy names to exempt the keyword from. When attempting to target a keyword that violates a policy, the error returned will include the name of the relevant policy. Use that name in this field to exempt the targeted keyword from the policy. This field is only applicable for positively-targeted keywords assigned to Demand Gen resources. Retrieval and management of Demand Gen resources is currently in beta. This field is only available to allowlisted users.",
    ).optional(),
    keyword: z.string().describe(
      "Required. The keyword, for example `car insurance`. Positive keyword cannot be offensive word. Must be UTF-8 encoded with a maximum size of 255 bytes. Maximum number of characters is 80. Maximum number of words is 10.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
  }).describe(
    "Details for assigned keyword targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_KEYWORD`.",
  ).optional(),
  languageDetails: z.object({
    displayName: z.string().describe(
      'Output only. The display name of the language (e.g., "French").',
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted. All assigned language targeting options on the same resource must have the same value for this field.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_LANGUAGE`.",
    ).optional(),
  }).describe(
    "Details for assigned language targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_LANGUAGE`.",
  ).optional(),
  nativeContentPositionDetails: z.object({
    contentPosition: z.enum([
      "NATIVE_CONTENT_POSITION_UNSPECIFIED",
      "NATIVE_CONTENT_POSITION_UNKNOWN",
      "NATIVE_CONTENT_POSITION_IN_ARTICLE",
      "NATIVE_CONTENT_POSITION_IN_FEED",
      "NATIVE_CONTENT_POSITION_PERIPHERAL",
      "NATIVE_CONTENT_POSITION_RECOMMENDATION",
    ]).describe("Required. The content position.").optional(),
  }).describe(
    "Details for native content position assigned targeting option. This will be populated in the native_content_position_details field when targeting_type is `TARGETING_TYPE_NATIVE_CONTENT_POSITION`. Explicitly targeting all options is not supported. Remove all native content position targeting options to achieve this effect.",
  ).optional(),
  negativeKeywordListDetails: z.object({
    negativeKeywordListId: z.string().describe(
      "Required. ID of the negative keyword list. Should refer to the negative_keyword_list_id field of a NegativeKeywordList resource.",
    ).optional(),
  }).describe(
    "Targeting details for negative keyword list. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST`.",
  ).optional(),
  omidDetails: z.object({
    omid: z.enum(["OMID_UNSPECIFIED", "OMID_FOR_MOBILE_DISPLAY_ADS"]).describe(
      "Required. The type of Open Measurement enabled inventory.",
    ).optional(),
  }).describe(
    "Represents a targetable Open Measurement enabled inventory type. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_OMID`.",
  ).optional(),
  onScreenPositionDetails: z.object({
    adType: z.enum([
      "AD_TYPE_UNSPECIFIED",
      "AD_TYPE_DISPLAY",
      "AD_TYPE_VIDEO",
      "AD_TYPE_AUDIO",
    ]).describe(
      "Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_DISPLAY`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_DISPLAY_DEFAULT`. * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`.",
    ).optional(),
    onScreenPosition: z.enum([
      "ON_SCREEN_POSITION_UNSPECIFIED",
      "ON_SCREEN_POSITION_UNKNOWN",
      "ON_SCREEN_POSITION_ABOVE_THE_FOLD",
      "ON_SCREEN_POSITION_BELOW_THE_FOLD",
    ]).describe("Output only. The on screen position.").optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`.",
    ).optional(),
  }).describe(
    "On screen position targeting option details. This will be populated in the on_screen_position_details field when targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`.",
  ).optional(),
  operatingSystemDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the operating system.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting option ID populated in targeting_option_id field when targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`.",
    ).optional(),
  }).describe(
    "Assigned operating system targeting option details. This will be populated in the operating_system_details field when targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`.",
  ).optional(),
  parentalStatusDetails: z.object({
    parentalStatus: z.enum([
      "PARENTAL_STATUS_UNSPECIFIED",
      "PARENTAL_STATUS_PARENT",
      "PARENTAL_STATUS_NOT_A_PARENT",
      "PARENTAL_STATUS_UNKNOWN",
    ]).describe("Required. The parental status of the audience.").optional(),
  }).describe(
    "Details for assigned parental status targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_PARENTAL_STATUS`.",
  ).optional(),
  poiDetails: z.object({
    displayName: z.string().describe(
      'Output only. The display name of a POI, e.g. "Times Square", "Space Needle", followed by its full address if available.',
    ).optional(),
    latitude: z.number().describe(
      "Output only. Latitude of the POI rounding to 6th decimal place.",
    ).optional(),
    longitude: z.number().describe(
      "Output only. Longitude of the POI rounding to 6th decimal place.",
    ).optional(),
    proximityRadiusAmount: z.number().describe(
      "Required. The radius of the area around the POI that will be targeted. The units of the radius are specified by proximity_radius_unit. Must be 1 to 800 if unit is `DISTANCE_UNIT_KILOMETERS` and 1 to 500 if unit is `DISTANCE_UNIT_MILES`.",
    ).optional(),
    proximityRadiusUnit: z.enum([
      "DISTANCE_UNIT_UNSPECIFIED",
      "DISTANCE_UNIT_MILES",
      "DISTANCE_UNIT_KILOMETERS",
    ]).describe(
      "Required. The unit of distance by which the targeting radius is measured.",
    ).optional(),
    targetingOptionId: z.string().describe(
      'Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_POI`. Accepted POI targeting option IDs can be retrieved using `targetingTypes.targetingOptions.search`. If targeting a specific latitude/longitude coordinate removed from an address or POI name, you can generate the necessary targeting option ID by rounding the desired coordinate values to the 6th decimal place, removing the decimals, and concatenating the string values separated by a semicolon. For example, you can target the latitude/longitude pair of 40.7414691, -74.003387 using the targeting option ID "40741469;-74003387". **Upon** **creation, this field value will be updated to append a semicolon and** **alphanumerical hash value if only latitude/longitude coordinates are** **provided.**',
    ).optional(),
  }).describe(
    "Details for assigned POI targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_POI`.",
  ).optional(),
  proximityLocationListDetails: z.object({
    proximityLocationListId: z.string().describe(
      "Required. ID of the proximity location list. Should refer to the location_list_id field of a LocationList resource whose type is `TARGETING_LOCATION_TYPE_PROXIMITY`.",
    ).optional(),
    proximityRadius: z.number().describe(
      "Required. Radius expressed in the distance units set in proximity_radius_unit. This represents the size of the area around a chosen location that will be targeted. Radius should be between 1 and 500 miles or 800 kilometers.",
    ).optional(),
    proximityRadiusUnit: z.enum([
      "PROXIMITY_RADIUS_UNIT_UNSPECIFIED",
      "PROXIMITY_RADIUS_UNIT_MILES",
      "PROXIMITY_RADIUS_UNIT_KILOMETERS",
    ]).describe("Required. Radius distance units.").optional(),
  }).describe(
    "Targeting details for proximity location list. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_PROXIMITY_LOCATION_LIST`.",
  ).optional(),
  regionalLocationListDetails: z.object({
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    regionalLocationListId: z.string().describe(
      "Required. ID of the regional location list. Should refer to the location_list_id field of a LocationList resource whose type is `TARGETING_LOCATION_TYPE_REGIONAL`.",
    ).optional(),
  }).describe(
    "Targeting details for regional location list. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_REGIONAL_LOCATION_LIST`.",
  ).optional(),
  sensitiveCategoryExclusionDetails: z.object({
    excludedSensitiveCategory: z.enum([
      "SENSITIVE_CATEGORY_UNSPECIFIED",
      "SENSITIVE_CATEGORY_ADULT",
      "SENSITIVE_CATEGORY_DEROGATORY",
      "SENSITIVE_CATEGORY_DOWNLOADS_SHARING",
      "SENSITIVE_CATEGORY_WEAPONS",
      "SENSITIVE_CATEGORY_GAMBLING",
      "SENSITIVE_CATEGORY_VIOLENCE",
      "SENSITIVE_CATEGORY_SUGGESTIVE",
      "SENSITIVE_CATEGORY_PROFANITY",
      "SENSITIVE_CATEGORY_ALCOHOL",
      "SENSITIVE_CATEGORY_DRUGS",
      "SENSITIVE_CATEGORY_TOBACCO",
      "SENSITIVE_CATEGORY_POLITICS",
      "SENSITIVE_CATEGORY_RELIGION",
      "SENSITIVE_CATEGORY_TRAGEDY",
      "SENSITIVE_CATEGORY_TRANSPORTATION_ACCIDENTS",
      "SENSITIVE_CATEGORY_SENSITIVE_SOCIAL_ISSUES",
      "SENSITIVE_CATEGORY_SHOCKING",
      "SENSITIVE_CATEGORY_EMBEDDED_VIDEO",
      "SENSITIVE_CATEGORY_LIVE_STREAMING_VIDEO",
    ]).describe(
      "Required. An enum for the DV360 Sensitive category content classified to be EXCLUDED.",
    ).optional(),
  }).describe(
    "Targeting details for sensitive category. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`.",
  ).optional(),
  sessionPositionDetails: z.object({
    sessionPosition: z.enum([
      "SESSION_POSITION_UNSPECIFIED",
      "SESSION_POSITION_FIRST_IMPRESSION",
    ]).describe("The position where the ad will show in a session.").optional(),
  }).describe(
    "Details for session position assigned targeting option. This will be populated in the session_position_details field when targeting_type is `TARGETING_TYPE_SESSION_POSITION`.",
  ).optional(),
  subExchangeDetails: z.object({
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_SUB_EXCHANGE`.",
    ).optional(),
  }).describe(
    "Details for assigned sub-exchange targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_SUB_EXCHANGE`.",
  ).optional(),
  targetingType: z.enum([
    "TARGETING_TYPE_UNSPECIFIED",
    "TARGETING_TYPE_CHANNEL",
    "TARGETING_TYPE_APP_CATEGORY",
    "TARGETING_TYPE_APP",
    "TARGETING_TYPE_URL",
    "TARGETING_TYPE_DAY_AND_TIME",
    "TARGETING_TYPE_AGE_RANGE",
    "TARGETING_TYPE_REGIONAL_LOCATION_LIST",
    "TARGETING_TYPE_PROXIMITY_LOCATION_LIST",
    "TARGETING_TYPE_GENDER",
    "TARGETING_TYPE_VIDEO_PLAYER_SIZE",
    "TARGETING_TYPE_USER_REWARDED_CONTENT",
    "TARGETING_TYPE_PARENTAL_STATUS",
    "TARGETING_TYPE_CONTENT_INSTREAM_POSITION",
    "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION",
    "TARGETING_TYPE_DEVICE_TYPE",
    "TARGETING_TYPE_AUDIENCE_GROUP",
    "TARGETING_TYPE_BROWSER",
    "TARGETING_TYPE_HOUSEHOLD_INCOME",
    "TARGETING_TYPE_ON_SCREEN_POSITION",
    "TARGETING_TYPE_THIRD_PARTY_VERIFIER",
    "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION",
    "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION",
    "TARGETING_TYPE_ENVIRONMENT",
    "TARGETING_TYPE_CARRIER_AND_ISP",
    "TARGETING_TYPE_OPERATING_SYSTEM",
    "TARGETING_TYPE_DEVICE_MAKE_MODEL",
    "TARGETING_TYPE_KEYWORD",
    "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST",
    "TARGETING_TYPE_VIEWABILITY",
    "TARGETING_TYPE_CATEGORY",
    "TARGETING_TYPE_INVENTORY_SOURCE",
    "TARGETING_TYPE_LANGUAGE",
    "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS",
    "TARGETING_TYPE_GEO_REGION",
    "TARGETING_TYPE_INVENTORY_SOURCE_GROUP",
    "TARGETING_TYPE_EXCHANGE",
    "TARGETING_TYPE_SUB_EXCHANGE",
    "TARGETING_TYPE_POI",
    "TARGETING_TYPE_BUSINESS_CHAIN",
    "TARGETING_TYPE_CONTENT_DURATION",
    "TARGETING_TYPE_CONTENT_STREAM_TYPE",
    "TARGETING_TYPE_NATIVE_CONTENT_POSITION",
    "TARGETING_TYPE_OMID",
    "TARGETING_TYPE_AUDIO_CONTENT_TYPE",
    "TARGETING_TYPE_CONTENT_GENRE",
    "TARGETING_TYPE_YOUTUBE_VIDEO",
    "TARGETING_TYPE_YOUTUBE_CHANNEL",
    "TARGETING_TYPE_SESSION_POSITION",
    "TARGETING_TYPE_CONTENT_THEME_EXCLUSION",
  ]).describe(
    "Output only. Identifies the type of this assigned targeting option.",
  ).optional(),
  thirdPartyVerifierDetails: z.object({
    adloox: z.object({
      adultExplicitSexualContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Adult and Explicit Sexual Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      armsAmmunitionContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Arms and Ammunition Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      crimeHarmfulActsIndividualsSocietyHumanRightsViolationsContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Crime and Harmful Acts Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      deathInjuryMilitaryConflictContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Death, Injury, or Military Conflict Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      debatedSensitiveSocialIssueContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Debated Sensitive Social Issue Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      displayIabViewability: z.enum([
        "DISPLAY_IAB_VIEWABILITY_UNSPECIFIED",
        "DISPLAY_IAB_VIEWABILITY_10",
        "DISPLAY_IAB_VIEWABILITY_20",
        "DISPLAY_IAB_VIEWABILITY_35",
        "DISPLAY_IAB_VIEWABILITY_50",
        "DISPLAY_IAB_VIEWABILITY_75",
      ]).describe("Optional. IAB viewability threshold for display ads.")
        .optional(),
      excludedAdlooxCategories: z.array(
        z.enum([
          "ADLOOX_UNSPECIFIED",
          "ADULT_CONTENT_HARD",
          "ADULT_CONTENT_SOFT",
          "ILLEGAL_CONTENT",
          "BORDERLINE_CONTENT",
          "DISCRIMINATORY_CONTENT",
          "VIOLENT_CONTENT_WEAPONS",
          "LOW_VIEWABILITY_DOMAINS",
          "FRAUD",
        ]),
      ).describe("Scope3 categories to exclude.").optional(),
      excludedFraudIvtMfaCategories: z.array(
        z.enum(["FRAUD_IVT_MFA_CATEGORY_UNSPECIFIED", "FRAUD_IVT_MFA"]),
      ).describe("Optional. Scope3's fraud IVT MFA categories to exclude.")
        .optional(),
      hateSpeechActsAggressionContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Hate Speech and Acts of Aggression Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      illegalDrugsTobaccoEcigarettesVapingAlcoholContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Illegal Drugs/Alcohol Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      misinformationContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Misinformation Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      obscenityProfanityContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Obscenity and Profanity Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      onlinePiracyContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Online Piracy Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      spamHarmfulContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Spam or Harmful Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      terrorismContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Terrorism Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      videoIabViewability: z.enum([
        "VIDEO_IAB_VIEWABILITY_UNSPECIFIED",
        "VIDEO_IAB_VIEWABILITY_10",
        "VIDEO_IAB_VIEWABILITY_20",
        "VIDEO_IAB_VIEWABILITY_35",
        "VIDEO_IAB_VIEWABILITY_50",
        "VIDEO_IAB_VIEWABILITY_75",
      ]).describe("Optional. IAB viewability threshold for video ads.")
        .optional(),
    }).describe(
      "Details of Scope3 (previously known as Adloox) brand safety settings.",
    ).optional(),
    doubleVerify: z.object({
      appStarRating: z.object({
        avoidInsufficientStarRating: z.boolean().describe(
          "Avoid bidding on apps with insufficient star ratings.",
        ).optional(),
        avoidedStarRating: z.enum([
          "APP_STAR_RATE_UNSPECIFIED",
          "APP_STAR_RATE_1_POINT_5_LESS",
          "APP_STAR_RATE_2_LESS",
          "APP_STAR_RATE_2_POINT_5_LESS",
          "APP_STAR_RATE_3_LESS",
          "APP_STAR_RATE_3_POINT_5_LESS",
          "APP_STAR_RATE_4_LESS",
          "APP_STAR_RATE_4_POINT_5_LESS",
        ]).describe("Avoid bidding on apps with the star ratings.").optional(),
      }).describe("Details of DoubleVerify star ratings settings.").optional(),
      avoidedAgeRatings: z.array(
        z.enum([
          "AGE_RATING_UNSPECIFIED",
          "APP_AGE_RATE_UNKNOWN",
          "APP_AGE_RATE_4_PLUS",
          "APP_AGE_RATE_9_PLUS",
          "APP_AGE_RATE_12_PLUS",
          "APP_AGE_RATE_17_PLUS",
          "APP_AGE_RATE_18_PLUS",
        ]),
      ).describe("Avoid bidding on apps with the age rating.").optional(),
      brandSafetyCategories: z.object({
        avoidUnknownBrandSafetyCategory: z.boolean().describe(
          "Unknown or unrateable.",
        ).optional(),
        avoidedHighSeverityCategories: z.array(
          z.enum([
            "HIGHER_SEVERITY_UNSPECIFIED",
            "ADULT_CONTENT_PORNOGRAPHY",
            "COPYRIGHT_INFRINGEMENT",
            "SUBSTANCE_ABUSE",
            "GRAPHIC_VIOLENCE_WEAPONS",
            "HATE_PROFANITY",
            "CRIMINAL_SKILLS",
            "NUISANCE_INCENTIVIZED_MALWARE_CLUTTER",
          ]),
        ).describe("Brand safety high severity avoidance categories.")
          .optional(),
        avoidedMediumSeverityCategories: z.array(
          z.enum([
            "MEDIUM_SEVERITY_UNSPECIFIED",
            "AD_SERVERS",
            "ADULT_CONTENT_SWIMSUIT",
            "ALTERNATIVE_LIFESTYLES",
            "CELEBRITY_GOSSIP",
            "GAMBLING",
            "OCCULT",
            "SEX_EDUCATION",
            "DISASTER_AVIATION",
            "DISASTER_MAN_MADE",
            "DISASTER_NATURAL",
            "DISASTER_TERRORIST_EVENTS",
            "DISASTER_VEHICLE",
            "ALCOHOL",
            "SMOKING",
            "NEGATIVE_NEWS_FINANCIAL",
            "NON_ENGLISH",
            "PARKING_PAGE",
            "UNMODERATED_UGC",
            "INFLAMMATORY_POLITICS_AND_NEWS",
            "NEGATIVE_NEWS_PHARMACEUTICAL",
          ]),
        ).describe("Brand safety medium severity avoidance categories.")
          .optional(),
      }).describe("Settings for brand safety controls.").optional(),
      customSegmentId: z.string().describe(
        'The custom segment ID provided by DoubleVerify. The ID must start with "51" and consist of eight digits. Custom segment ID cannot be specified along with any of the following fields: * brand_safety_categories * avoided_age_ratings * app_star_rating * fraud_invalid_traffic',
      ).optional(),
      displayViewability: z.object({
        iab: z.enum([
          "IAB_VIEWED_RATE_UNSPECIFIED",
          "IAB_VIEWED_RATE_80_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_75_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_70_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_65_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_60_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_55_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_50_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_40_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_30_PERCENT_HIGHER",
        ]).describe(
          "Target web and app inventory to maximize IAB viewable rate.",
        ).optional(),
        viewableDuring: z.enum([
          "AVERAGE_VIEW_DURATION_UNSPECIFIED",
          "AVERAGE_VIEW_DURATION_5_SEC",
          "AVERAGE_VIEW_DURATION_10_SEC",
          "AVERAGE_VIEW_DURATION_15_SEC",
        ]).describe(
          "Target web and app inventory to maximize 100% viewable duration.",
        ).optional(),
      }).describe("Details of DoubleVerify display viewability settings.")
        .optional(),
      fraudInvalidTraffic: z.object({
        avoidInsufficientOption: z.boolean().describe(
          "Insufficient Historical Fraud & IVT Stats.",
        ).optional(),
        avoidedFraudOption: z.enum([
          "FRAUD_UNSPECIFIED",
          "AD_IMPRESSION_FRAUD_100",
          "AD_IMPRESSION_FRAUD_50",
          "AD_IMPRESSION_FRAUD_25",
          "AD_IMPRESSION_FRAUD_10",
          "AD_IMPRESSION_FRAUD_8",
          "AD_IMPRESSION_FRAUD_6",
          "AD_IMPRESSION_FRAUD_4",
          "AD_IMPRESSION_FRAUD_2",
        ]).describe("Avoid Sites and Apps with historical Fraud & IVT.")
          .optional(),
      }).describe("DoubleVerify Fraud & Invalid Traffic settings.").optional(),
      videoViewability: z.object({
        playerImpressionRate: z.enum([
          "PLAYER_SIZE_400X300_UNSPECIFIED",
          "PLAYER_SIZE_400X300_95",
          "PLAYER_SIZE_400X300_70",
          "PLAYER_SIZE_400X300_25",
          "PLAYER_SIZE_400X300_5",
        ]).describe(
          "Target inventory to maximize impressions with 400x300 or greater player size.",
        ).optional(),
        videoIab: z.enum([
          "VIDEO_IAB_UNSPECIFIED",
          "IAB_VIEWABILITY_80_PERCENT_HIGHER",
          "IAB_VIEWABILITY_75_PERCENT_HIGHER",
          "IAB_VIEWABILITY_70_PERCENT_HIGHER",
          "IAB_VIEWABILITY_65_PERCENT_HIHGER",
          "IAB_VIEWABILITY_60_PERCENT_HIGHER",
          "IAB_VIEWABILITY_55_PERCENT_HIHGER",
          "IAB_VIEWABILITY_50_PERCENT_HIGHER",
          "IAB_VIEWABILITY_40_PERCENT_HIHGER",
          "IAB_VIEWABILITY_30_PERCENT_HIHGER",
        ]).describe("Target web inventory to maximize IAB viewable rate.")
          .optional(),
        videoViewableRate: z.enum([
          "VIDEO_VIEWABLE_RATE_UNSPECIFIED",
          "VIEWED_PERFORMANCE_40_PERCENT_HIGHER",
          "VIEWED_PERFORMANCE_35_PERCENT_HIGHER",
          "VIEWED_PERFORMANCE_30_PERCENT_HIGHER",
          "VIEWED_PERFORMANCE_25_PERCENT_HIGHER",
          "VIEWED_PERFORMANCE_20_PERCENT_HIGHER",
          "VIEWED_PERFORMANCE_10_PERCENT_HIGHER",
        ]).describe("Target web inventory to maximize fully viewable rate.")
          .optional(),
      }).describe("Details of DoubleVerify video viewability settings.")
        .optional(),
    }).describe("Details of DoubleVerify settings.").optional(),
    integralAdScience: z.object({
      customSegmentId: z.array(z.string()).describe(
        "The custom segment ID provided by Integral Ad Science. The ID must be between `1000001` and `1999999` or `3000001` and `3999999`, inclusive.",
      ).optional(),
      displayViewability: z.enum([
        "PERFORMANCE_VIEWABILITY_UNSPECIFIED",
        "PERFORMANCE_VIEWABILITY_40",
        "PERFORMANCE_VIEWABILITY_50",
        "PERFORMANCE_VIEWABILITY_60",
        "PERFORMANCE_VIEWABILITY_70",
      ]).describe(
        "Display Viewability section (applicable to display line items only).",
      ).optional(),
      excludeUnrateable: z.boolean().describe("Brand Safety - **Unrateable**.")
        .optional(),
      excludedAdFraudRisk: z.enum([
        "SUSPICIOUS_ACTIVITY_UNSPECIFIED",
        "SUSPICIOUS_ACTIVITY_HR",
        "SUSPICIOUS_ACTIVITY_HMR",
        "SUSPICIOUS_ACTIVITY_FD",
      ]).describe("Ad Fraud settings.").optional(),
      excludedAdultRisk: z.enum(["ADULT_UNSPECIFIED", "ADULT_HR", "ADULT_HMR"])
        .describe("Brand Safety - **Adult content**.").optional(),
      excludedAlcoholRisk: z.enum([
        "ALCOHOL_UNSPECIFIED",
        "ALCOHOL_HR",
        "ALCOHOL_HMR",
      ]).describe("Brand Safety - **Alcohol**.").optional(),
      excludedDrugsRisk: z.enum(["DRUGS_UNSPECIFIED", "DRUGS_HR", "DRUGS_HMR"])
        .describe("Brand Safety - **Drugs**.").optional(),
      excludedGamblingRisk: z.enum([
        "GAMBLING_UNSPECIFIED",
        "GAMBLING_HR",
        "GAMBLING_HMR",
      ]).describe("Brand Safety - **Gambling**.").optional(),
      excludedHateSpeechRisk: z.enum([
        "HATE_SPEECH_UNSPECIFIED",
        "HATE_SPEECH_HR",
        "HATE_SPEECH_HMR",
      ]).describe("Brand Safety - **Hate speech**.").optional(),
      excludedIllegalDownloadsRisk: z.enum([
        "ILLEGAL_DOWNLOADS_UNSPECIFIED",
        "ILLEGAL_DOWNLOADS_HR",
        "ILLEGAL_DOWNLOADS_HMR",
      ]).describe("Brand Safety - **Illegal downloads**.").optional(),
      excludedOffensiveLanguageRisk: z.enum([
        "OFFENSIVE_LANGUAGE_UNSPECIFIED",
        "OFFENSIVE_LANGUAGE_HR",
        "OFFENSIVE_LANGUAGE_HMR",
      ]).describe("Brand Safety - **Offensive language**.").optional(),
      excludedViolenceRisk: z.enum([
        "VIOLENCE_UNSPECIFIED",
        "VIOLENCE_HR",
        "VIOLENCE_HMR",
      ]).describe("Brand Safety - **Violence**.").optional(),
      qualitySyncCustomSegmentId: z.array(z.string()).describe(
        "Optional. The quality sync custom segment ID provided by Integral Ad Science. The ID must be between `3000000` and `4999999`, inclusive.",
      ).optional(),
      traqScoreOption: z.enum([
        "TRAQ_UNSPECIFIED",
        "TRAQ_250",
        "TRAQ_500",
        "TRAQ_600",
        "TRAQ_700",
        "TRAQ_750",
        "TRAQ_875",
        "TRAQ_1000",
      ]).describe(
        "True advertising quality (applicable to Display line items only).",
      ).optional(),
      videoViewability: z.enum([
        "VIDEO_VIEWABILITY_UNSPECIFIED",
        "VIDEO_VIEWABILITY_40",
        "VIDEO_VIEWABILITY_50",
        "VIDEO_VIEWABILITY_60",
        "VIDEO_VIEWABILITY_70",
      ]).describe(
        "Video Viewability Section (applicable to video line items only).",
      ).optional(),
    }).describe("Details of Integral Ad Science settings.").optional(),
  }).describe(
    "Assigned third party verifier targeting option details. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_THIRD_PARTY_VERIFIER`.",
  ).optional(),
  urlDetails: z.object({
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    url: z.string().describe(
      "Required. The URL, for example `example.com`. DV360 supports two levels of subdirectory targeting, for example `www.example.com/one-subdirectory-level/second-level`, and five levels of subdomain targeting, for example `five.four.three.two.one.example.com`.",
    ).optional(),
  }).describe(
    "Details for assigned URL targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_URL`.",
  ).optional(),
  userRewardedContentDetails: z.object({
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`.",
    ).optional(),
    userRewardedContent: z.enum([
      "USER_REWARDED_CONTENT_UNSPECIFIED",
      "USER_REWARDED_CONTENT_USER_REWARDED",
      "USER_REWARDED_CONTENT_NOT_USER_REWARDED",
    ]).describe("Output only. User rewarded content status for video ads.")
      .optional(),
  }).describe(
    "User rewarded content targeting option details. This will be populated in the user_rewarded_content_details field when targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`.",
  ).optional(),
  videoPlayerSizeDetails: z.object({
    videoPlayerSize: z.enum([
      "VIDEO_PLAYER_SIZE_UNSPECIFIED",
      "VIDEO_PLAYER_SIZE_SMALL",
      "VIDEO_PLAYER_SIZE_LARGE",
      "VIDEO_PLAYER_SIZE_HD",
      "VIDEO_PLAYER_SIZE_UNKNOWN",
    ]).describe("Required. The video player size.").optional(),
  }).describe(
    "Video player size targeting option details. This will be populated in the video_player_size_details field when targeting_type is `TARGETING_TYPE_VIDEO_PLAYER_SIZE`. Explicitly targeting all options is not supported. Remove all video player size targeting options to achieve this effect.",
  ).optional(),
  viewabilityDetails: z.object({
    viewability: z.enum([
      "VIEWABILITY_UNSPECIFIED",
      "VIEWABILITY_10_PERCENT_OR_MORE",
      "VIEWABILITY_20_PERCENT_OR_MORE",
      "VIEWABILITY_30_PERCENT_OR_MORE",
      "VIEWABILITY_40_PERCENT_OR_MORE",
      "VIEWABILITY_50_PERCENT_OR_MORE",
      "VIEWABILITY_60_PERCENT_OR_MORE",
      "VIEWABILITY_70_PERCENT_OR_MORE",
      "VIEWABILITY_80_PERCENT_OR_MORE",
      "VIEWABILITY_90_PERCENT_OR_MORE",
    ]).describe("Required. The predicted viewability percentage.").optional(),
  }).describe(
    "Assigned viewability targeting option details. This will be populated in the viewability_details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_VIEWABILITY`.",
  ).optional(),
  youtubeChannelDetails: z.object({
    channelId: z.string().describe(
      "The YouTube uploader channel id or the channel code of a YouTube channel.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
  }).describe(
    "Details for YouTube channel assigned targeting option. This will be populated in the youtube_channel_details field when targeting_type is `TARGETING_TYPE_YOUTUBE_CHANNEL`.",
  ).optional(),
  youtubeVideoDetails: z.object({
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    videoId: z.string().describe(
      "YouTube video id as it appears on the YouTube watch page.",
    ).optional(),
  }).describe(
    "Details for YouTube video assigned targeting option. This will be populated in the youtube_video_details field when targeting_type is `TARGETING_TYPE_YOUTUBE_VIDEO`.",
  ).optional(),
  partnerId: z.string().describe("Required. The ID of the partner."),
});

const StateSchema = z.object({
  ageRangeDetails: z.object({
    ageRange: z.string(),
  }).optional(),
  appCategoryDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  appDetails: z.object({
    appId: z.string(),
    appPlatform: z.string(),
    displayName: z.string(),
    negative: z.boolean(),
  }).optional(),
  assignedTargetingOptionId: z.string().optional(),
  assignedTargetingOptionIdAlias: z.string().optional(),
  audienceGroupDetails: z.object({
    excludedFirstPartyAndPartnerAudienceGroup: z.object({
      settings: z.array(z.object({
        firstPartyAndPartnerAudienceId: z.string(),
        recency: z.string(),
      })),
    }),
    excludedGoogleAudienceGroup: z.object({
      settings: z.array(z.object({
        googleAudienceId: z.string(),
      })),
    }),
    includedCombinedAudienceGroup: z.object({
      settings: z.array(z.object({
        combinedAudienceId: z.string(),
      })),
    }),
    includedCustomListGroup: z.object({
      settings: z.array(z.object({
        customListId: z.string(),
      })),
    }),
    includedFirstPartyAndPartnerAudienceGroups: z.array(z.object({
      settings: z.array(z.object({
        firstPartyAndPartnerAudienceId: z.unknown(),
        recency: z.unknown(),
      })),
    })),
    includedGoogleAudienceGroup: z.object({
      settings: z.array(z.object({
        googleAudienceId: z.string(),
      })),
    }),
  }).optional(),
  audioContentTypeDetails: z.object({
    audioContentType: z.string(),
  }).optional(),
  authorizedSellerStatusDetails: z.object({
    authorizedSellerStatus: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  browserDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  businessChainDetails: z.object({
    displayName: z.string(),
    proximityRadiusAmount: z.number(),
    proximityRadiusUnit: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  carrierAndIspDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  categoryDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  channelDetails: z.object({
    channelId: z.string(),
    negative: z.boolean(),
  }).optional(),
  contentDurationDetails: z.object({
    contentDuration: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  contentGenreDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  contentInstreamPositionDetails: z.object({
    adType: z.string(),
    contentInstreamPosition: z.string(),
  }).optional(),
  contentOutstreamPositionDetails: z.object({
    adType: z.string(),
    contentOutstreamPosition: z.string(),
  }).optional(),
  contentStreamTypeDetails: z.object({
    contentStreamType: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  contentThemeExclusionDetails: z.object({
    contentTheme: z.string(),
    excludedContentTheme: z.string(),
    excludedTargetingOptionId: z.string(),
  }).optional(),
  dayAndTimeDetails: z.object({
    dayOfWeek: z.string(),
    endHour: z.number(),
    startHour: z.number(),
    timeZoneResolution: z.string(),
  }).optional(),
  deviceMakeModelDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  deviceTypeDetails: z.object({
    deviceType: z.string(),
    youtubeAndPartnersBidMultiplier: z.number(),
  }).optional(),
  digitalContentLabelExclusionDetails: z.object({
    excludedContentRatingTier: z.string(),
  }).optional(),
  environmentDetails: z.object({
    environment: z.string(),
  }).optional(),
  exchangeDetails: z.object({
    exchange: z.string(),
  }).optional(),
  genderDetails: z.object({
    gender: z.string(),
  }).optional(),
  geoRegionDetails: z.object({
    displayName: z.string(),
    geoRegionType: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  householdIncomeDetails: z.object({
    householdIncome: z.string(),
  }).optional(),
  inheritance: z.string().optional(),
  inventorySourceDetails: z.object({
    inventorySourceId: z.string(),
  }).optional(),
  inventorySourceGroupDetails: z.object({
    inventorySourceGroupId: z.string(),
  }).optional(),
  keywordDetails: z.object({
    exemptedPolicyNames: z.array(z.string()),
    keyword: z.string(),
    negative: z.boolean(),
  }).optional(),
  languageDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  name: z.string(),
  nativeContentPositionDetails: z.object({
    contentPosition: z.string(),
  }).optional(),
  negativeKeywordListDetails: z.object({
    negativeKeywordListId: z.string(),
  }).optional(),
  omidDetails: z.object({
    omid: z.string(),
  }).optional(),
  onScreenPositionDetails: z.object({
    adType: z.string(),
    onScreenPosition: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  operatingSystemDetails: z.object({
    displayName: z.string(),
    negative: z.boolean(),
    targetingOptionId: z.string(),
  }).optional(),
  parentalStatusDetails: z.object({
    parentalStatus: z.string(),
  }).optional(),
  poiDetails: z.object({
    displayName: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    proximityRadiusAmount: z.number(),
    proximityRadiusUnit: z.string(),
    targetingOptionId: z.string(),
  }).optional(),
  proximityLocationListDetails: z.object({
    proximityLocationListId: z.string(),
    proximityRadius: z.number(),
    proximityRadiusUnit: z.string(),
  }).optional(),
  regionalLocationListDetails: z.object({
    negative: z.boolean(),
    regionalLocationListId: z.string(),
  }).optional(),
  sensitiveCategoryExclusionDetails: z.object({
    excludedSensitiveCategory: z.string(),
  }).optional(),
  sessionPositionDetails: z.object({
    sessionPosition: z.string(),
  }).optional(),
  subExchangeDetails: z.object({
    targetingOptionId: z.string(),
  }).optional(),
  targetingType: z.string().optional(),
  thirdPartyVerifierDetails: z.object({
    adloox: z.object({
      adultExplicitSexualContent: z.string(),
      armsAmmunitionContent: z.string(),
      crimeHarmfulActsIndividualsSocietyHumanRightsViolationsContent: z
        .string(),
      deathInjuryMilitaryConflictContent: z.string(),
      debatedSensitiveSocialIssueContent: z.string(),
      displayIabViewability: z.string(),
      excludedAdlooxCategories: z.array(z.string()),
      excludedFraudIvtMfaCategories: z.array(z.string()),
      hateSpeechActsAggressionContent: z.string(),
      illegalDrugsTobaccoEcigarettesVapingAlcoholContent: z.string(),
      misinformationContent: z.string(),
      obscenityProfanityContent: z.string(),
      onlinePiracyContent: z.string(),
      spamHarmfulContent: z.string(),
      terrorismContent: z.string(),
      videoIabViewability: z.string(),
    }),
    doubleVerify: z.object({
      appStarRating: z.object({
        avoidInsufficientStarRating: z.boolean(),
        avoidedStarRating: z.string(),
      }),
      avoidedAgeRatings: z.array(z.string()),
      brandSafetyCategories: z.object({
        avoidUnknownBrandSafetyCategory: z.boolean(),
        avoidedHighSeverityCategories: z.array(z.string()),
        avoidedMediumSeverityCategories: z.array(z.string()),
      }),
      customSegmentId: z.string(),
      displayViewability: z.object({
        iab: z.string(),
        viewableDuring: z.string(),
      }),
      fraudInvalidTraffic: z.object({
        avoidInsufficientOption: z.boolean(),
        avoidedFraudOption: z.string(),
      }),
      videoViewability: z.object({
        playerImpressionRate: z.string(),
        videoIab: z.string(),
        videoViewableRate: z.string(),
      }),
    }),
    integralAdScience: z.object({
      customSegmentId: z.array(z.string()),
      displayViewability: z.string(),
      excludeUnrateable: z.boolean(),
      excludedAdFraudRisk: z.string(),
      excludedAdultRisk: z.string(),
      excludedAlcoholRisk: z.string(),
      excludedDrugsRisk: z.string(),
      excludedGamblingRisk: z.string(),
      excludedHateSpeechRisk: z.string(),
      excludedIllegalDownloadsRisk: z.string(),
      excludedOffensiveLanguageRisk: z.string(),
      excludedViolenceRisk: z.string(),
      qualitySyncCustomSegmentId: z.array(z.string()),
      traqScoreOption: z.string(),
      videoViewability: z.string(),
    }),
  }).optional(),
  urlDetails: z.object({
    negative: z.boolean(),
    url: z.string(),
  }).optional(),
  userRewardedContentDetails: z.object({
    targetingOptionId: z.string(),
    userRewardedContent: z.string(),
  }).optional(),
  videoPlayerSizeDetails: z.object({
    videoPlayerSize: z.string(),
  }).optional(),
  viewabilityDetails: z.object({
    viewability: z.string(),
  }).optional(),
  youtubeChannelDetails: z.object({
    channelId: z.string(),
    negative: z.boolean(),
  }).optional(),
  youtubeVideoDetails: z.object({
    negative: z.boolean(),
    videoId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  ageRangeDetails: z.object({
    ageRange: z.enum([
      "AGE_RANGE_UNSPECIFIED",
      "AGE_RANGE_18_24",
      "AGE_RANGE_25_34",
      "AGE_RANGE_35_44",
      "AGE_RANGE_45_54",
      "AGE_RANGE_55_64",
      "AGE_RANGE_65_PLUS",
      "AGE_RANGE_UNKNOWN",
      "AGE_RANGE_18_20",
      "AGE_RANGE_21_24",
      "AGE_RANGE_25_29",
      "AGE_RANGE_30_34",
      "AGE_RANGE_35_39",
      "AGE_RANGE_40_44",
      "AGE_RANGE_45_49",
      "AGE_RANGE_50_54",
      "AGE_RANGE_55_59",
      "AGE_RANGE_60_64",
    ]).describe(
      "Required. The age range of an audience. We only support targeting a continuous age range of an audience. Thus, the age range represented in this field can be 1) targeted solely, or, 2) part of a larger continuous age range. The reach of a continuous age range targeting can be expanded by also targeting an audience of an unknown age.",
    ).optional(),
  }).describe(
    "Represents a targetable age range. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_AGE_RANGE`.",
  ).optional(),
  appCategoryDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the app category.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_APP_CATEGORY`.",
    ).optional(),
  }).describe(
    "Details for assigned app category targeting option. This will be populated in the app_category_details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_APP_CATEGORY`.",
  ).optional(),
  appDetails: z.object({
    appId: z.string().describe(
      "Required. The ID of the app. Android's Play store app uses bundle ID, for example `com.google.android.gm`. Apple's App store app ID uses 9 digit string, for example `422689480`.",
    ).optional(),
    appPlatform: z.enum([
      "APP_PLATFORM_UNSPECIFIED",
      "APP_PLATFORM_IOS",
      "APP_PLATFORM_ANDROID",
      "APP_PLATFORM_ROKU",
      "APP_PLATFORM_AMAZON_FIRETV",
      "APP_PLATFORM_PLAYSTATION",
      "APP_PLATFORM_APPLE_TV",
      "APP_PLATFORM_XBOX",
      "APP_PLATFORM_SAMSUNG_TV",
      "APP_PLATFORM_ANDROID_TV",
      "APP_PLATFORM_GENERIC_CTV",
      "APP_PLATFORM_LG_TV",
      "APP_PLATFORM_VIZIO_TV",
      "APP_PLATFORM_VIDAA",
    ]).describe(
      "Indicates the platform of the targeted app. If this field is not specified, the app platform will be assumed to be mobile (i.e., Android or iOS), and we will derive the appropriate mobile platform from the app ID.",
    ).optional(),
    displayName: z.string().describe(
      "Output only. The display name of the app.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
  }).describe(
    "Details for assigned app targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_APP`.",
  ).optional(),
  audienceGroupDetails: z.object({
    excludedFirstPartyAndPartnerAudienceGroup: z.object({
      settings: z.array(z.object({
        firstPartyAndPartnerAudienceId: z.string().describe(
          "Required. First party and partner audience id of the first party and partner audience targeting setting. This id is first_party_and_partner_audience_id.",
        ).optional(),
        recency: z.enum([
          "RECENCY_NO_LIMIT",
          "RECENCY_1_MINUTE",
          "RECENCY_5_MINUTES",
          "RECENCY_10_MINUTES",
          "RECENCY_15_MINUTES",
          "RECENCY_30_MINUTES",
          "RECENCY_1_HOUR",
          "RECENCY_2_HOURS",
          "RECENCY_3_HOURS",
          "RECENCY_6_HOURS",
          "RECENCY_12_HOURS",
          "RECENCY_1_DAY",
          "RECENCY_2_DAYS",
          "RECENCY_3_DAYS",
          "RECENCY_5_DAYS",
          "RECENCY_7_DAYS",
          "RECENCY_10_DAYS",
          "RECENCY_14_DAYS",
          "RECENCY_15_DAYS",
          "RECENCY_21_DAYS",
          "RECENCY_28_DAYS",
          "RECENCY_30_DAYS",
          "RECENCY_40_DAYS",
          "RECENCY_45_DAYS",
          "RECENCY_60_DAYS",
          "RECENCY_90_DAYS",
          "RECENCY_120_DAYS",
          "RECENCY_180_DAYS",
          "RECENCY_270_DAYS",
          "RECENCY_365_DAYS",
        ]).describe(
          "Required. The recency of the first party and partner audience targeting setting. Only applicable to first party audiences, otherwise will be ignored. For more info, refer to https://support.google.com/displayvideo/answer/2949947#recency When unspecified, no recency limit will be used.",
        ).optional(),
      })).describe(
        "Required. All first party and partner audience targeting settings in first party and partner audience group. Repeated settings with the same id are not allowed.",
      ).optional(),
    }).describe(
      "Details of first party and partner audience group. All first party and partner audience targeting settings are logically ‘OR’ of each other.",
    ).optional(),
    excludedGoogleAudienceGroup: z.object({
      settings: z.array(z.object({
        googleAudienceId: z.string().describe(
          "Required. Google audience id of the Google audience targeting setting. This id is google_audience_id.",
        ).optional(),
      })).describe(
        "Required. All Google audience targeting settings in Google audience group. Repeated settings with the same id will be ignored.",
      ).optional(),
    }).describe(
      "Details of Google audience group. All Google audience targeting settings are logically ‘OR’ of each other.",
    ).optional(),
    includedCombinedAudienceGroup: z.object({
      settings: z.array(z.object({
        combinedAudienceId: z.string().describe(
          "Required. Combined audience id of combined audience targeting setting. This id is combined_audience_id.",
        ).optional(),
      })).describe(
        "Required. All combined audience targeting settings in combined audience group. Repeated settings with the same id will be ignored. The number of combined audience settings should be no more than five, error will be thrown otherwise.",
      ).optional(),
    }).describe(
      "Details of combined audience group. All combined audience targeting settings are logically ‘OR’ of each other.",
    ).optional(),
    includedCustomListGroup: z.object({
      settings: z.array(z.object({
        customListId: z.string().describe(
          "Required. Custom id of custom list targeting setting. This id is custom_list_id.",
        ).optional(),
      })).describe(
        "Required. All custom list targeting settings in custom list group. Repeated settings with the same id will be ignored.",
      ).optional(),
    }).describe(
      "Details of custom list group. All custom list targeting settings are logically ‘OR’ of each other.",
    ).optional(),
    includedFirstPartyAndPartnerAudienceGroups: z.array(z.object({
      settings: z.array(z.object({
        firstPartyAndPartnerAudienceId: z.unknown().describe(
          "Required. First party and partner audience id of the first party and partner audience targeting setting. This id is first_party_and_partner_audience_id.",
        ).optional(),
        recency: z.unknown().describe(
          "Required. The recency of the first party and partner audience targeting setting. Only applicable to first party audiences, otherwise will be ignored. For more info, refer to https://support.google.com/displayvideo/answer/2949947#recency When unspecified, no recency limit will be used.",
        ).optional(),
      })).describe(
        "Required. All first party and partner audience targeting settings in first party and partner audience group. Repeated settings with the same id are not allowed.",
      ).optional(),
    })).describe(
      "Optional. The first party and partner audience ids and recencies of included first party and partner audience groups. Each first party and partner audience group contains first party and partner audience ids only. The relation between each first party and partner audience group is INTERSECTION, and the result is UNION'ed with other audience groups. Repeated groups with the same settings will be ignored.",
    ).optional(),
    includedGoogleAudienceGroup: z.object({
      settings: z.array(z.object({
        googleAudienceId: z.string().describe(
          "Required. Google audience id of the Google audience targeting setting. This id is google_audience_id.",
        ).optional(),
      })).describe(
        "Required. All Google audience targeting settings in Google audience group. Repeated settings with the same id will be ignored.",
      ).optional(),
    }).describe(
      "Details of Google audience group. All Google audience targeting settings are logically ‘OR’ of each other.",
    ).optional(),
  }).describe(
    "Assigned audience group targeting option details. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_AUDIENCE_GROUP`. The relation between each group is UNION, except for excluded_first_and_third_party_audience_group and excluded_google_audience_group, of which COMPLEMENT is used as an INTERSECTION with other groups.",
  ).optional(),
  audioContentTypeDetails: z.object({
    audioContentType: z.enum([
      "AUDIO_CONTENT_TYPE_UNSPECIFIED",
      "AUDIO_CONTENT_TYPE_UNKNOWN",
      "AUDIO_CONTENT_TYPE_MUSIC",
      "AUDIO_CONTENT_TYPE_BROADCAST",
      "AUDIO_CONTENT_TYPE_PODCAST",
      "AUDIO_CONTENT_TYPE_CATCH_UP_RADIO",
      "AUDIO_CONTENT_TYPE_WEB_RADIO",
      "AUDIO_CONTENT_TYPE_VIDEO_GAME",
      "AUDIO_CONTENT_TYPE_TEXT_TO_SPEECH",
    ]).describe("Required. The audio content type.").optional(),
  }).describe(
    "Details for audio content type assigned targeting option. This will be populated in the audio_content_type_details field when targeting_type is `TARGETING_TYPE_AUDIO_CONTENT_TYPE`. Explicitly targeting all options is not supported. Remove all audio content type targeting options to achieve this effect.",
  ).optional(),
  authorizedSellerStatusDetails: z.object({
    authorizedSellerStatus: z.enum([
      "AUTHORIZED_SELLER_STATUS_UNSPECIFIED",
      "AUTHORIZED_SELLER_STATUS_AUTHORIZED_DIRECT_SELLERS_ONLY",
      "AUTHORIZED_SELLER_STATUS_AUTHORIZED_AND_NON_PARTICIPATING_PUBLISHERS",
    ]).describe("Output only. The authorized seller status to target.")
      .optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`.",
    ).optional(),
  }).describe(
    'Represents an assigned authorized seller status. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS`. If a resource does not have an `TARGETING_TYPE_AUTHORIZED_SELLER_STATUS` assigned targeting option, it is using the "Authorized Direct Sellers and Resellers" option.',
  ).optional(),
  browserDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the browser.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted. All assigned browser targeting options on the same resource must have the same value for this field.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_BROWSER`.",
    ).optional(),
  }).describe(
    "Details for assigned browser targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_BROWSER`.",
  ).optional(),
  businessChainDetails: z.object({
    displayName: z.string().describe(
      'Output only. The display name of a business chain, e.g. "KFC", "Chase Bank".',
    ).optional(),
    proximityRadiusAmount: z.number().describe(
      "Required. The radius of the area around the business chain that will be targeted. The units of the radius are specified by proximity_radius_unit. Must be 1 to 800 if unit is `DISTANCE_UNIT_KILOMETERS` and 1 to 500 if unit is `DISTANCE_UNIT_MILES`. The minimum increment for both cases is 0.1. Inputs will be rounded to the nearest acceptable value if it is too granular, e.g. 15.57 will become 15.6.",
    ).optional(),
    proximityRadiusUnit: z.enum([
      "DISTANCE_UNIT_UNSPECIFIED",
      "DISTANCE_UNIT_MILES",
      "DISTANCE_UNIT_KILOMETERS",
    ]).describe(
      "Required. The unit of distance by which the targeting radius is measured.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_BUSINESS_CHAIN`. Accepted business chain targeting option IDs can be retrieved using SearchTargetingOptions.",
    ).optional(),
  }).describe(
    "Details for assigned Business chain targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_BUSINESS_CHAIN`.",
  ).optional(),
  carrierAndIspDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the carrier or ISP.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted. All assigned carrier and ISP targeting options on the same resource must have the same value for this field.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_CARRIER_AND_ISP`.",
    ).optional(),
  }).describe(
    "Details for assigned carrier and ISP targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_CARRIER_AND_ISP`.",
  ).optional(),
  categoryDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the category.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CATEGORY`.",
    ).optional(),
  }).describe(
    "Assigned category targeting option details. This will be populated in the category_details field when targeting_type is `TARGETING_TYPE_CATEGORY`.",
  ).optional(),
  channelDetails: z.object({
    channelId: z.string().describe(
      "Required. ID of the channel. Should refer to the channel ID field on a [Partner-owned channel](partners.channels#Channel.FIELDS.channel_id) or [advertiser-owned channel](advertisers.channels#Channel.FIELDS.channel_id) resource.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted. For advertiser level assigned targeting option, this field must be true.",
    ).optional(),
  }).describe(
    "Details for assigned channel targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_CHANNEL`.",
  ).optional(),
  contentDurationDetails: z.object({
    contentDuration: z.enum([
      "CONTENT_DURATION_UNSPECIFIED",
      "CONTENT_DURATION_UNKNOWN",
      "CONTENT_DURATION_0_TO_1_MIN",
      "CONTENT_DURATION_1_TO_5_MIN",
      "CONTENT_DURATION_5_TO_15_MIN",
      "CONTENT_DURATION_15_TO_30_MIN",
      "CONTENT_DURATION_30_TO_60_MIN",
      "CONTENT_DURATION_OVER_60_MIN",
    ]).describe("Output only. The content duration.").optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_DURATION`.",
    ).optional(),
  }).describe(
    "Details for content duration assigned targeting option. This will be populated in the content_duration_details field when targeting_type is `TARGETING_TYPE_CONTENT_DURATION`. Explicitly targeting all options is not supported. Remove all content duration targeting options to achieve this effect.",
  ).optional(),
  contentGenreDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the content genre.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_GENRE`.",
    ).optional(),
  }).describe(
    "Details for content genre assigned targeting option. This will be populated in the content_genre_details field when targeting_type is `TARGETING_TYPE_CONTENT_GENRE`. Explicitly targeting all options is not supported. Remove all content genre targeting options to achieve this effect.",
  ).optional(),
  contentInstreamPositionDetails: z.object({
    adType: z.enum([
      "AD_TYPE_UNSPECIFIED",
      "AD_TYPE_DISPLAY",
      "AD_TYPE_VIDEO",
      "AD_TYPE_AUDIO",
    ]).describe(
      "Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`. * `AD_TYPE_AUDIO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_AUDIO_DEFAULT`.",
    ).optional(),
    contentInstreamPosition: z.enum([
      "CONTENT_INSTREAM_POSITION_UNSPECIFIED",
      "CONTENT_INSTREAM_POSITION_PRE_ROLL",
      "CONTENT_INSTREAM_POSITION_MID_ROLL",
      "CONTENT_INSTREAM_POSITION_POST_ROLL",
      "CONTENT_INSTREAM_POSITION_UNKNOWN",
    ]).describe(
      "Required. The content instream position for video or audio ads.",
    ).optional(),
  }).describe(
    "Assigned content instream position targeting option details. This will be populated in the content_instream_position_details field when targeting_type is `TARGETING_TYPE_CONTENT_INSTREAM_POSITION`.",
  ).optional(),
  contentOutstreamPositionDetails: z.object({
    adType: z.enum([
      "AD_TYPE_UNSPECIFIED",
      "AD_TYPE_DISPLAY",
      "AD_TYPE_VIDEO",
      "AD_TYPE_AUDIO",
    ]).describe(
      "Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_DISPLAY`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_DISPLAY_DEFAULT`. * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`.",
    ).optional(),
    contentOutstreamPosition: z.enum([
      "CONTENT_OUTSTREAM_POSITION_UNSPECIFIED",
      "CONTENT_OUTSTREAM_POSITION_UNKNOWN",
      "CONTENT_OUTSTREAM_POSITION_IN_ARTICLE",
      "CONTENT_OUTSTREAM_POSITION_IN_BANNER",
      "CONTENT_OUTSTREAM_POSITION_IN_FEED",
      "CONTENT_OUTSTREAM_POSITION_INTERSTITIAL",
    ]).describe("Required. The content outstream position.").optional(),
  }).describe(
    "Assigned content outstream position targeting option details. This will be populated in the content_outstream_position_details field when targeting_type is `TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION`.",
  ).optional(),
  contentStreamTypeDetails: z.object({
    contentStreamType: z.enum([
      "CONTENT_STREAM_TYPE_UNSPECIFIED",
      "CONTENT_LIVE_STREAM",
      "CONTENT_ON_DEMAND",
    ]).describe("Output only. The content stream type.").optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_CONTENT_STREAM_TYPE`.",
    ).optional(),
  }).describe(
    "Details for content stream type assigned targeting option. This will be populated in the content_stream_type_details field when targeting_type is `TARGETING_TYPE_CONTENT_STREAM_TYPE`. Explicitly targeting all options is not supported. Remove all content stream type targeting options to achieve this effect.",
  ).optional(),
  contentThemeExclusionDetails: z.object({
    contentTheme: z.enum([
      "CONTENT_THEME_UNSPECIFIED",
      "CONTENT_THEME_FIGHTING_VIDEO_GAMES",
      "CONTENT_THEME_MATURE_GAMES",
      "CONTENT_THEME_NOT_YET_DETERMINED_HEALTH_SOURCES",
      "CONTENT_THEME_NOT_YET_DETERMINED_NEWS_SOURCES",
      "CONTENT_THEME_POLITICS",
      "CONTENT_THEME_RECENT_NEWS",
      "CONTENT_THEME_RELIGION",
      "CONTENT_THEME_UNPLEASANT_HEALTH_CONTENT",
      "CONTENT_THEME_UNPLEASANT_NEWS",
    ]).describe("Output only. An enum for the DV360 content theme classifier.")
      .optional(),
    excludedContentTheme: z.enum([
      "CONTENT_THEME_UNSPECIFIED",
      "CONTENT_THEME_FIGHTING_VIDEO_GAMES",
      "CONTENT_THEME_MATURE_GAMES",
      "CONTENT_THEME_NOT_YET_DETERMINED_HEALTH_SOURCES",
      "CONTENT_THEME_NOT_YET_DETERMINED_NEWS_SOURCES",
      "CONTENT_THEME_POLITICS",
      "CONTENT_THEME_RECENT_NEWS",
      "CONTENT_THEME_RELIGION",
      "CONTENT_THEME_UNPLEASANT_HEALTH_CONTENT",
      "CONTENT_THEME_UNPLEASANT_NEWS",
    ]).describe(
      "Required. An enum for the DV360 content theme classified to be EXCLUDED.",
    ).optional(),
    excludedTargetingOptionId: z.string().describe(
      "Required. ID of the content theme to be EXCLUDED.",
    ).optional(),
  }).describe(
    "Targeting details for content theme. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_CONTENT_THEME_EXCLUSION`.",
  ).optional(),
  dayAndTimeDetails: z.object({
    dayOfWeek: z.enum([
      "DAY_OF_WEEK_UNSPECIFIED",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]).describe(
      "Required. The day of the week for this day and time targeting setting.",
    ).optional(),
    endHour: z.number().int().describe(
      "Required. The end hour for day and time targeting. Must be between 1 (1 hour after start of day) and 24 (end of day).",
    ).optional(),
    startHour: z.number().int().describe(
      "Required. The start hour for day and time targeting. Must be between 0 (start of day) and 23 (1 hour before end of day).",
    ).optional(),
    timeZoneResolution: z.enum([
      "TIME_ZONE_RESOLUTION_UNSPECIFIED",
      "TIME_ZONE_RESOLUTION_END_USER",
      "TIME_ZONE_RESOLUTION_ADVERTISER",
    ]).describe(
      "Required. The mechanism used to determine which timezone to use for this day and time targeting setting. For Demand Gen line items, this field is always `TIME_ZONE_RESOLUTION_ADVERTISER`.",
    ).optional(),
  }).describe(
    "Representation of a segment of time defined on a specific day of the week and with a start and end time. The time represented by `start_hour` must be before the time represented by `end_hour`.",
  ).optional(),
  deviceMakeModelDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the device make and model.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`.",
    ).optional(),
  }).describe(
    "Assigned device make and model targeting option details. This will be populated in the device_make_model_details field when targeting_type is `TARGETING_TYPE_DEVICE_MAKE_MODEL`.",
  ).optional(),
  deviceTypeDetails: z.object({
    deviceType: z.enum([
      "DEVICE_TYPE_UNSPECIFIED",
      "DEVICE_TYPE_COMPUTER",
      "DEVICE_TYPE_CONNECTED_TV",
      "DEVICE_TYPE_SMART_PHONE",
      "DEVICE_TYPE_TABLET",
      "DEVICE_TYPE_CONNECTED_DEVICE",
    ]).describe("Required. The display name of the device type.").optional(),
    youtubeAndPartnersBidMultiplier: z.number().describe(
      "Output only. Bid multiplier allows you to show your ads more or less frequently based on the device type. It will apply a multiplier on the original bid price. When this field is 0, it indicates this field is not applicable instead of multiplying 0 on the original bid price. For example, if the bid price without multiplier is $10.0 and the multiplier is 1.5 for Tablet, the resulting bid price for Tablet will be $15.0. Only applicable to YouTube and Partners line items.",
    ).optional(),
  }).describe(
    "Targeting details for device type. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_DEVICE_TYPE`.",
  ).optional(),
  digitalContentLabelExclusionDetails: z.object({
    excludedContentRatingTier: z.enum([
      "CONTENT_RATING_TIER_UNSPECIFIED",
      "CONTENT_RATING_TIER_UNRATED",
      "CONTENT_RATING_TIER_GENERAL",
      "CONTENT_RATING_TIER_PARENTAL_GUIDANCE",
      "CONTENT_RATING_TIER_TEENS",
      "CONTENT_RATING_TIER_MATURE",
      "CONTENT_RATING_TIER_FAMILIES",
    ]).describe(
      "Required. The display name of the digital content label rating tier to be EXCLUDED.",
    ).optional(),
  }).describe(
    "Targeting details for digital content label. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION`.",
  ).optional(),
  environmentDetails: z.object({
    environment: z.enum([
      "ENVIRONMENT_UNSPECIFIED",
      "ENVIRONMENT_WEB_OPTIMIZED",
      "ENVIRONMENT_WEB_NOT_OPTIMIZED",
      "ENVIRONMENT_APP",
    ]).describe("Required. The serving environment.").optional(),
  }).describe(
    "Assigned environment targeting option details. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_ENVIRONMENT`.",
  ).optional(),
  exchangeDetails: z.object({
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
    ]).describe("Required. The enum value for the exchange.").optional(),
  }).describe(
    "Details for assigned exchange targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_EXCHANGE`.",
  ).optional(),
  genderDetails: z.object({
    gender: z.enum([
      "GENDER_UNSPECIFIED",
      "GENDER_MALE",
      "GENDER_FEMALE",
      "GENDER_UNKNOWN",
    ]).describe("Required. The gender of the audience.").optional(),
  }).describe(
    "Details for assigned gender targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_GENDER`.",
  ).optional(),
  geoRegionDetails: z.object({
    displayName: z.string().describe(
      'Output only. The display name of the geographic region (e.g., "Ontario, Canada").',
    ).optional(),
    geoRegionType: z.enum([
      "GEO_REGION_TYPE_UNKNOWN",
      "GEO_REGION_TYPE_OTHER",
      "GEO_REGION_TYPE_COUNTRY",
      "GEO_REGION_TYPE_REGION",
      "GEO_REGION_TYPE_TERRITORY",
      "GEO_REGION_TYPE_PROVINCE",
      "GEO_REGION_TYPE_STATE",
      "GEO_REGION_TYPE_PREFECTURE",
      "GEO_REGION_TYPE_GOVERNORATE",
      "GEO_REGION_TYPE_CANTON",
      "GEO_REGION_TYPE_UNION_TERRITORY",
      "GEO_REGION_TYPE_AUTONOMOUS_COMMUNITY",
      "GEO_REGION_TYPE_DMA_REGION",
      "GEO_REGION_TYPE_METRO",
      "GEO_REGION_TYPE_CONGRESSIONAL_DISTRICT",
      "GEO_REGION_TYPE_COUNTY",
      "GEO_REGION_TYPE_MUNICIPALITY",
      "GEO_REGION_TYPE_CITY",
      "GEO_REGION_TYPE_POSTAL_CODE",
      "GEO_REGION_TYPE_DEPARTMENT",
      "GEO_REGION_TYPE_AIRPORT",
      "GEO_REGION_TYPE_TV_REGION",
      "GEO_REGION_TYPE_OKRUG",
      "GEO_REGION_TYPE_BOROUGH",
      "GEO_REGION_TYPE_CITY_REGION",
      "GEO_REGION_TYPE_ARRONDISSEMENT",
      "GEO_REGION_TYPE_NEIGHBORHOOD",
      "GEO_REGION_TYPE_UNIVERSITY",
      "GEO_REGION_TYPE_DISTRICT",
      "GEO_REGION_TYPE_NATIONAL_PARK",
      "GEO_REGION_TYPE_BARRIO",
      "GEO_REGION_TYPE_SUB_WARD",
      "GEO_REGION_TYPE_MUNICIPALITY_DISTRICT",
      "GEO_REGION_TYPE_SUB_DISTRICT",
      "GEO_REGION_TYPE_QUARTER",
      "GEO_REGION_TYPE_DIVISION",
      "GEO_REGION_TYPE_COMMUNE",
      "GEO_REGION_TYPE_COLLOQUIAL_AREA",
      "GEO_REGION_TYPE_POST_TOWN",
      "GEO_REGION_TYPE_WARD",
    ]).describe("Output only. The type of geographic region targeting.")
      .optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_GEO_REGION`.",
    ).optional(),
  }).describe(
    "Details for assigned geographic region targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_GEO_REGION`.",
  ).optional(),
  householdIncomeDetails: z.object({
    householdIncome: z.enum([
      "HOUSEHOLD_INCOME_UNSPECIFIED",
      "HOUSEHOLD_INCOME_UNKNOWN",
      "HOUSEHOLD_INCOME_LOWER_50_PERCENT",
      "HOUSEHOLD_INCOME_TOP_41_TO_50_PERCENT",
      "HOUSEHOLD_INCOME_TOP_31_TO_40_PERCENT",
      "HOUSEHOLD_INCOME_TOP_21_TO_30_PERCENT",
      "HOUSEHOLD_INCOME_TOP_11_TO_20_PERCENT",
      "HOUSEHOLD_INCOME_TOP_10_PERCENT",
    ]).describe("Required. The household income of the audience.").optional(),
  }).describe(
    "Details for assigned household income targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_HOUSEHOLD_INCOME`.",
  ).optional(),
  inventorySourceDetails: z.object({
    inventorySourceId: z.string().describe(
      "Required. ID of the inventory source. Should refer to the inventory_source_id field of an InventorySource resource.",
    ).optional(),
  }).describe(
    "Targeting details for inventory source. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE`.",
  ).optional(),
  inventorySourceGroupDetails: z.object({
    inventorySourceGroupId: z.string().describe(
      "Required. ID of the inventory source group. Should refer to the inventory_source_group_id field of an InventorySourceGroup resource.",
    ).optional(),
  }).describe(
    "Targeting details for inventory source group. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_INVENTORY_SOURCE_GROUP`.",
  ).optional(),
  keywordDetails: z.object({
    exemptedPolicyNames: z.array(z.string()).describe(
      "Optional. The policy names to exempt the keyword from. When attempting to target a keyword that violates a policy, the error returned will include the name of the relevant policy. Use that name in this field to exempt the targeted keyword from the policy. This field is only applicable for positively-targeted keywords assigned to Demand Gen resources. Retrieval and management of Demand Gen resources is currently in beta. This field is only available to allowlisted users.",
    ).optional(),
    keyword: z.string().describe(
      "Required. The keyword, for example `car insurance`. Positive keyword cannot be offensive word. Must be UTF-8 encoded with a maximum size of 255 bytes. Maximum number of characters is 80. Maximum number of words is 10.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
  }).describe(
    "Details for assigned keyword targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_KEYWORD`.",
  ).optional(),
  languageDetails: z.object({
    displayName: z.string().describe(
      'Output only. The display name of the language (e.g., "French").',
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted. All assigned language targeting options on the same resource must have the same value for this field.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_LANGUAGE`.",
    ).optional(),
  }).describe(
    "Details for assigned language targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_LANGUAGE`.",
  ).optional(),
  nativeContentPositionDetails: z.object({
    contentPosition: z.enum([
      "NATIVE_CONTENT_POSITION_UNSPECIFIED",
      "NATIVE_CONTENT_POSITION_UNKNOWN",
      "NATIVE_CONTENT_POSITION_IN_ARTICLE",
      "NATIVE_CONTENT_POSITION_IN_FEED",
      "NATIVE_CONTENT_POSITION_PERIPHERAL",
      "NATIVE_CONTENT_POSITION_RECOMMENDATION",
    ]).describe("Required. The content position.").optional(),
  }).describe(
    "Details for native content position assigned targeting option. This will be populated in the native_content_position_details field when targeting_type is `TARGETING_TYPE_NATIVE_CONTENT_POSITION`. Explicitly targeting all options is not supported. Remove all native content position targeting options to achieve this effect.",
  ).optional(),
  negativeKeywordListDetails: z.object({
    negativeKeywordListId: z.string().describe(
      "Required. ID of the negative keyword list. Should refer to the negative_keyword_list_id field of a NegativeKeywordList resource.",
    ).optional(),
  }).describe(
    "Targeting details for negative keyword list. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_NEGATIVE_KEYWORD_LIST`.",
  ).optional(),
  omidDetails: z.object({
    omid: z.enum(["OMID_UNSPECIFIED", "OMID_FOR_MOBILE_DISPLAY_ADS"]).describe(
      "Required. The type of Open Measurement enabled inventory.",
    ).optional(),
  }).describe(
    "Represents a targetable Open Measurement enabled inventory type. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_OMID`.",
  ).optional(),
  onScreenPositionDetails: z.object({
    adType: z.enum([
      "AD_TYPE_UNSPECIFIED",
      "AD_TYPE_DISPLAY",
      "AD_TYPE_VIDEO",
      "AD_TYPE_AUDIO",
    ]).describe(
      "Output only. The ad type to target. Only applicable to insertion order targeting and new line items supporting the specified ad type will inherit this targeting option by default. Possible values are: * `AD_TYPE_DISPLAY`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_DISPLAY_DEFAULT`. * `AD_TYPE_VIDEO`, the setting will be inherited by new line item when line_item_type is `LINE_ITEM_TYPE_VIDEO_DEFAULT`.",
    ).optional(),
    onScreenPosition: z.enum([
      "ON_SCREEN_POSITION_UNSPECIFIED",
      "ON_SCREEN_POSITION_UNKNOWN",
      "ON_SCREEN_POSITION_ABOVE_THE_FOLD",
      "ON_SCREEN_POSITION_BELOW_THE_FOLD",
    ]).describe("Output only. The on screen position.").optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`.",
    ).optional(),
  }).describe(
    "On screen position targeting option details. This will be populated in the on_screen_position_details field when targeting_type is `TARGETING_TYPE_ON_SCREEN_POSITION`.",
  ).optional(),
  operatingSystemDetails: z.object({
    displayName: z.string().describe(
      "Output only. The display name of the operating system.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    targetingOptionId: z.string().describe(
      "Required. The targeting option ID populated in targeting_option_id field when targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`.",
    ).optional(),
  }).describe(
    "Assigned operating system targeting option details. This will be populated in the operating_system_details field when targeting_type is `TARGETING_TYPE_OPERATING_SYSTEM`.",
  ).optional(),
  parentalStatusDetails: z.object({
    parentalStatus: z.enum([
      "PARENTAL_STATUS_UNSPECIFIED",
      "PARENTAL_STATUS_PARENT",
      "PARENTAL_STATUS_NOT_A_PARENT",
      "PARENTAL_STATUS_UNKNOWN",
    ]).describe("Required. The parental status of the audience.").optional(),
  }).describe(
    "Details for assigned parental status targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_PARENTAL_STATUS`.",
  ).optional(),
  poiDetails: z.object({
    displayName: z.string().describe(
      'Output only. The display name of a POI, e.g. "Times Square", "Space Needle", followed by its full address if available.',
    ).optional(),
    latitude: z.number().describe(
      "Output only. Latitude of the POI rounding to 6th decimal place.",
    ).optional(),
    longitude: z.number().describe(
      "Output only. Longitude of the POI rounding to 6th decimal place.",
    ).optional(),
    proximityRadiusAmount: z.number().describe(
      "Required. The radius of the area around the POI that will be targeted. The units of the radius are specified by proximity_radius_unit. Must be 1 to 800 if unit is `DISTANCE_UNIT_KILOMETERS` and 1 to 500 if unit is `DISTANCE_UNIT_MILES`.",
    ).optional(),
    proximityRadiusUnit: z.enum([
      "DISTANCE_UNIT_UNSPECIFIED",
      "DISTANCE_UNIT_MILES",
      "DISTANCE_UNIT_KILOMETERS",
    ]).describe(
      "Required. The unit of distance by which the targeting radius is measured.",
    ).optional(),
    targetingOptionId: z.string().describe(
      'Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_POI`. Accepted POI targeting option IDs can be retrieved using `targetingTypes.targetingOptions.search`. If targeting a specific latitude/longitude coordinate removed from an address or POI name, you can generate the necessary targeting option ID by rounding the desired coordinate values to the 6th decimal place, removing the decimals, and concatenating the string values separated by a semicolon. For example, you can target the latitude/longitude pair of 40.7414691, -74.003387 using the targeting option ID "40741469;-74003387". **Upon** **creation, this field value will be updated to append a semicolon and** **alphanumerical hash value if only latitude/longitude coordinates are** **provided.**',
    ).optional(),
  }).describe(
    "Details for assigned POI targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_POI`.",
  ).optional(),
  proximityLocationListDetails: z.object({
    proximityLocationListId: z.string().describe(
      "Required. ID of the proximity location list. Should refer to the location_list_id field of a LocationList resource whose type is `TARGETING_LOCATION_TYPE_PROXIMITY`.",
    ).optional(),
    proximityRadius: z.number().describe(
      "Required. Radius expressed in the distance units set in proximity_radius_unit. This represents the size of the area around a chosen location that will be targeted. Radius should be between 1 and 500 miles or 800 kilometers.",
    ).optional(),
    proximityRadiusUnit: z.enum([
      "PROXIMITY_RADIUS_UNIT_UNSPECIFIED",
      "PROXIMITY_RADIUS_UNIT_MILES",
      "PROXIMITY_RADIUS_UNIT_KILOMETERS",
    ]).describe("Required. Radius distance units.").optional(),
  }).describe(
    "Targeting details for proximity location list. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_PROXIMITY_LOCATION_LIST`.",
  ).optional(),
  regionalLocationListDetails: z.object({
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    regionalLocationListId: z.string().describe(
      "Required. ID of the regional location list. Should refer to the location_list_id field of a LocationList resource whose type is `TARGETING_LOCATION_TYPE_REGIONAL`.",
    ).optional(),
  }).describe(
    "Targeting details for regional location list. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_REGIONAL_LOCATION_LIST`.",
  ).optional(),
  sensitiveCategoryExclusionDetails: z.object({
    excludedSensitiveCategory: z.enum([
      "SENSITIVE_CATEGORY_UNSPECIFIED",
      "SENSITIVE_CATEGORY_ADULT",
      "SENSITIVE_CATEGORY_DEROGATORY",
      "SENSITIVE_CATEGORY_DOWNLOADS_SHARING",
      "SENSITIVE_CATEGORY_WEAPONS",
      "SENSITIVE_CATEGORY_GAMBLING",
      "SENSITIVE_CATEGORY_VIOLENCE",
      "SENSITIVE_CATEGORY_SUGGESTIVE",
      "SENSITIVE_CATEGORY_PROFANITY",
      "SENSITIVE_CATEGORY_ALCOHOL",
      "SENSITIVE_CATEGORY_DRUGS",
      "SENSITIVE_CATEGORY_TOBACCO",
      "SENSITIVE_CATEGORY_POLITICS",
      "SENSITIVE_CATEGORY_RELIGION",
      "SENSITIVE_CATEGORY_TRAGEDY",
      "SENSITIVE_CATEGORY_TRANSPORTATION_ACCIDENTS",
      "SENSITIVE_CATEGORY_SENSITIVE_SOCIAL_ISSUES",
      "SENSITIVE_CATEGORY_SHOCKING",
      "SENSITIVE_CATEGORY_EMBEDDED_VIDEO",
      "SENSITIVE_CATEGORY_LIVE_STREAMING_VIDEO",
    ]).describe(
      "Required. An enum for the DV360 Sensitive category content classified to be EXCLUDED.",
    ).optional(),
  }).describe(
    "Targeting details for sensitive category. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION`.",
  ).optional(),
  sessionPositionDetails: z.object({
    sessionPosition: z.enum([
      "SESSION_POSITION_UNSPECIFIED",
      "SESSION_POSITION_FIRST_IMPRESSION",
    ]).describe("The position where the ad will show in a session.").optional(),
  }).describe(
    "Details for session position assigned targeting option. This will be populated in the session_position_details field when targeting_type is `TARGETING_TYPE_SESSION_POSITION`.",
  ).optional(),
  subExchangeDetails: z.object({
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id of a TargetingOption of type `TARGETING_TYPE_SUB_EXCHANGE`.",
    ).optional(),
  }).describe(
    "Details for assigned sub-exchange targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_SUB_EXCHANGE`.",
  ).optional(),
  targetingType: z.enum([
    "TARGETING_TYPE_UNSPECIFIED",
    "TARGETING_TYPE_CHANNEL",
    "TARGETING_TYPE_APP_CATEGORY",
    "TARGETING_TYPE_APP",
    "TARGETING_TYPE_URL",
    "TARGETING_TYPE_DAY_AND_TIME",
    "TARGETING_TYPE_AGE_RANGE",
    "TARGETING_TYPE_REGIONAL_LOCATION_LIST",
    "TARGETING_TYPE_PROXIMITY_LOCATION_LIST",
    "TARGETING_TYPE_GENDER",
    "TARGETING_TYPE_VIDEO_PLAYER_SIZE",
    "TARGETING_TYPE_USER_REWARDED_CONTENT",
    "TARGETING_TYPE_PARENTAL_STATUS",
    "TARGETING_TYPE_CONTENT_INSTREAM_POSITION",
    "TARGETING_TYPE_CONTENT_OUTSTREAM_POSITION",
    "TARGETING_TYPE_DEVICE_TYPE",
    "TARGETING_TYPE_AUDIENCE_GROUP",
    "TARGETING_TYPE_BROWSER",
    "TARGETING_TYPE_HOUSEHOLD_INCOME",
    "TARGETING_TYPE_ON_SCREEN_POSITION",
    "TARGETING_TYPE_THIRD_PARTY_VERIFIER",
    "TARGETING_TYPE_DIGITAL_CONTENT_LABEL_EXCLUSION",
    "TARGETING_TYPE_SENSITIVE_CATEGORY_EXCLUSION",
    "TARGETING_TYPE_ENVIRONMENT",
    "TARGETING_TYPE_CARRIER_AND_ISP",
    "TARGETING_TYPE_OPERATING_SYSTEM",
    "TARGETING_TYPE_DEVICE_MAKE_MODEL",
    "TARGETING_TYPE_KEYWORD",
    "TARGETING_TYPE_NEGATIVE_KEYWORD_LIST",
    "TARGETING_TYPE_VIEWABILITY",
    "TARGETING_TYPE_CATEGORY",
    "TARGETING_TYPE_INVENTORY_SOURCE",
    "TARGETING_TYPE_LANGUAGE",
    "TARGETING_TYPE_AUTHORIZED_SELLER_STATUS",
    "TARGETING_TYPE_GEO_REGION",
    "TARGETING_TYPE_INVENTORY_SOURCE_GROUP",
    "TARGETING_TYPE_EXCHANGE",
    "TARGETING_TYPE_SUB_EXCHANGE",
    "TARGETING_TYPE_POI",
    "TARGETING_TYPE_BUSINESS_CHAIN",
    "TARGETING_TYPE_CONTENT_DURATION",
    "TARGETING_TYPE_CONTENT_STREAM_TYPE",
    "TARGETING_TYPE_NATIVE_CONTENT_POSITION",
    "TARGETING_TYPE_OMID",
    "TARGETING_TYPE_AUDIO_CONTENT_TYPE",
    "TARGETING_TYPE_CONTENT_GENRE",
    "TARGETING_TYPE_YOUTUBE_VIDEO",
    "TARGETING_TYPE_YOUTUBE_CHANNEL",
    "TARGETING_TYPE_SESSION_POSITION",
    "TARGETING_TYPE_CONTENT_THEME_EXCLUSION",
  ]).describe(
    "Output only. Identifies the type of this assigned targeting option.",
  ).optional(),
  thirdPartyVerifierDetails: z.object({
    adloox: z.object({
      adultExplicitSexualContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Adult and Explicit Sexual Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      armsAmmunitionContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Arms and Ammunition Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      crimeHarmfulActsIndividualsSocietyHumanRightsViolationsContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Crime and Harmful Acts Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      deathInjuryMilitaryConflictContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Death, Injury, or Military Conflict Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      debatedSensitiveSocialIssueContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Debated Sensitive Social Issue Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      displayIabViewability: z.enum([
        "DISPLAY_IAB_VIEWABILITY_UNSPECIFIED",
        "DISPLAY_IAB_VIEWABILITY_10",
        "DISPLAY_IAB_VIEWABILITY_20",
        "DISPLAY_IAB_VIEWABILITY_35",
        "DISPLAY_IAB_VIEWABILITY_50",
        "DISPLAY_IAB_VIEWABILITY_75",
      ]).describe("Optional. IAB viewability threshold for display ads.")
        .optional(),
      excludedAdlooxCategories: z.array(
        z.enum([
          "ADLOOX_UNSPECIFIED",
          "ADULT_CONTENT_HARD",
          "ADULT_CONTENT_SOFT",
          "ILLEGAL_CONTENT",
          "BORDERLINE_CONTENT",
          "DISCRIMINATORY_CONTENT",
          "VIOLENT_CONTENT_WEAPONS",
          "LOW_VIEWABILITY_DOMAINS",
          "FRAUD",
        ]),
      ).describe("Scope3 categories to exclude.").optional(),
      excludedFraudIvtMfaCategories: z.array(
        z.enum(["FRAUD_IVT_MFA_CATEGORY_UNSPECIFIED", "FRAUD_IVT_MFA"]),
      ).describe("Optional. Scope3's fraud IVT MFA categories to exclude.")
        .optional(),
      hateSpeechActsAggressionContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Hate Speech and Acts of Aggression Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      illegalDrugsTobaccoEcigarettesVapingAlcoholContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Illegal Drugs/Alcohol Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      misinformationContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Misinformation Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      obscenityProfanityContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Obscenity and Profanity Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      onlinePiracyContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Online Piracy Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      spamHarmfulContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Spam or Harmful Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      terrorismContent: z.enum([
        "GARM_RISK_EXCLUSION_UNSPECIFIED",
        "GARM_RISK_EXCLUSION_FLOOR",
        "GARM_RISK_EXCLUSION_HIGH",
        "GARM_RISK_EXCLUSION_MEDIUM",
        "GARM_RISK_EXCLUSION_LOW",
      ]).describe(
        "Optional. Terrorism Content [GARM](https://wfanet.org/leadership/garm/about-garm) risk ranges to exclude.",
      ).optional(),
      videoIabViewability: z.enum([
        "VIDEO_IAB_VIEWABILITY_UNSPECIFIED",
        "VIDEO_IAB_VIEWABILITY_10",
        "VIDEO_IAB_VIEWABILITY_20",
        "VIDEO_IAB_VIEWABILITY_35",
        "VIDEO_IAB_VIEWABILITY_50",
        "VIDEO_IAB_VIEWABILITY_75",
      ]).describe("Optional. IAB viewability threshold for video ads.")
        .optional(),
    }).describe(
      "Details of Scope3 (previously known as Adloox) brand safety settings.",
    ).optional(),
    doubleVerify: z.object({
      appStarRating: z.object({
        avoidInsufficientStarRating: z.boolean().describe(
          "Avoid bidding on apps with insufficient star ratings.",
        ).optional(),
        avoidedStarRating: z.enum([
          "APP_STAR_RATE_UNSPECIFIED",
          "APP_STAR_RATE_1_POINT_5_LESS",
          "APP_STAR_RATE_2_LESS",
          "APP_STAR_RATE_2_POINT_5_LESS",
          "APP_STAR_RATE_3_LESS",
          "APP_STAR_RATE_3_POINT_5_LESS",
          "APP_STAR_RATE_4_LESS",
          "APP_STAR_RATE_4_POINT_5_LESS",
        ]).describe("Avoid bidding on apps with the star ratings.").optional(),
      }).describe("Details of DoubleVerify star ratings settings.").optional(),
      avoidedAgeRatings: z.array(
        z.enum([
          "AGE_RATING_UNSPECIFIED",
          "APP_AGE_RATE_UNKNOWN",
          "APP_AGE_RATE_4_PLUS",
          "APP_AGE_RATE_9_PLUS",
          "APP_AGE_RATE_12_PLUS",
          "APP_AGE_RATE_17_PLUS",
          "APP_AGE_RATE_18_PLUS",
        ]),
      ).describe("Avoid bidding on apps with the age rating.").optional(),
      brandSafetyCategories: z.object({
        avoidUnknownBrandSafetyCategory: z.boolean().describe(
          "Unknown or unrateable.",
        ).optional(),
        avoidedHighSeverityCategories: z.array(
          z.enum([
            "HIGHER_SEVERITY_UNSPECIFIED",
            "ADULT_CONTENT_PORNOGRAPHY",
            "COPYRIGHT_INFRINGEMENT",
            "SUBSTANCE_ABUSE",
            "GRAPHIC_VIOLENCE_WEAPONS",
            "HATE_PROFANITY",
            "CRIMINAL_SKILLS",
            "NUISANCE_INCENTIVIZED_MALWARE_CLUTTER",
          ]),
        ).describe("Brand safety high severity avoidance categories.")
          .optional(),
        avoidedMediumSeverityCategories: z.array(
          z.enum([
            "MEDIUM_SEVERITY_UNSPECIFIED",
            "AD_SERVERS",
            "ADULT_CONTENT_SWIMSUIT",
            "ALTERNATIVE_LIFESTYLES",
            "CELEBRITY_GOSSIP",
            "GAMBLING",
            "OCCULT",
            "SEX_EDUCATION",
            "DISASTER_AVIATION",
            "DISASTER_MAN_MADE",
            "DISASTER_NATURAL",
            "DISASTER_TERRORIST_EVENTS",
            "DISASTER_VEHICLE",
            "ALCOHOL",
            "SMOKING",
            "NEGATIVE_NEWS_FINANCIAL",
            "NON_ENGLISH",
            "PARKING_PAGE",
            "UNMODERATED_UGC",
            "INFLAMMATORY_POLITICS_AND_NEWS",
            "NEGATIVE_NEWS_PHARMACEUTICAL",
          ]),
        ).describe("Brand safety medium severity avoidance categories.")
          .optional(),
      }).describe("Settings for brand safety controls.").optional(),
      customSegmentId: z.string().describe(
        'The custom segment ID provided by DoubleVerify. The ID must start with "51" and consist of eight digits. Custom segment ID cannot be specified along with any of the following fields: * brand_safety_categories * avoided_age_ratings * app_star_rating * fraud_invalid_traffic',
      ).optional(),
      displayViewability: z.object({
        iab: z.enum([
          "IAB_VIEWED_RATE_UNSPECIFIED",
          "IAB_VIEWED_RATE_80_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_75_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_70_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_65_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_60_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_55_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_50_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_40_PERCENT_HIGHER",
          "IAB_VIEWED_RATE_30_PERCENT_HIGHER",
        ]).describe(
          "Target web and app inventory to maximize IAB viewable rate.",
        ).optional(),
        viewableDuring: z.enum([
          "AVERAGE_VIEW_DURATION_UNSPECIFIED",
          "AVERAGE_VIEW_DURATION_5_SEC",
          "AVERAGE_VIEW_DURATION_10_SEC",
          "AVERAGE_VIEW_DURATION_15_SEC",
        ]).describe(
          "Target web and app inventory to maximize 100% viewable duration.",
        ).optional(),
      }).describe("Details of DoubleVerify display viewability settings.")
        .optional(),
      fraudInvalidTraffic: z.object({
        avoidInsufficientOption: z.boolean().describe(
          "Insufficient Historical Fraud & IVT Stats.",
        ).optional(),
        avoidedFraudOption: z.enum([
          "FRAUD_UNSPECIFIED",
          "AD_IMPRESSION_FRAUD_100",
          "AD_IMPRESSION_FRAUD_50",
          "AD_IMPRESSION_FRAUD_25",
          "AD_IMPRESSION_FRAUD_10",
          "AD_IMPRESSION_FRAUD_8",
          "AD_IMPRESSION_FRAUD_6",
          "AD_IMPRESSION_FRAUD_4",
          "AD_IMPRESSION_FRAUD_2",
        ]).describe("Avoid Sites and Apps with historical Fraud & IVT.")
          .optional(),
      }).describe("DoubleVerify Fraud & Invalid Traffic settings.").optional(),
      videoViewability: z.object({
        playerImpressionRate: z.enum([
          "PLAYER_SIZE_400X300_UNSPECIFIED",
          "PLAYER_SIZE_400X300_95",
          "PLAYER_SIZE_400X300_70",
          "PLAYER_SIZE_400X300_25",
          "PLAYER_SIZE_400X300_5",
        ]).describe(
          "Target inventory to maximize impressions with 400x300 or greater player size.",
        ).optional(),
        videoIab: z.enum([
          "VIDEO_IAB_UNSPECIFIED",
          "IAB_VIEWABILITY_80_PERCENT_HIGHER",
          "IAB_VIEWABILITY_75_PERCENT_HIGHER",
          "IAB_VIEWABILITY_70_PERCENT_HIGHER",
          "IAB_VIEWABILITY_65_PERCENT_HIHGER",
          "IAB_VIEWABILITY_60_PERCENT_HIGHER",
          "IAB_VIEWABILITY_55_PERCENT_HIHGER",
          "IAB_VIEWABILITY_50_PERCENT_HIGHER",
          "IAB_VIEWABILITY_40_PERCENT_HIHGER",
          "IAB_VIEWABILITY_30_PERCENT_HIHGER",
        ]).describe("Target web inventory to maximize IAB viewable rate.")
          .optional(),
        videoViewableRate: z.enum([
          "VIDEO_VIEWABLE_RATE_UNSPECIFIED",
          "VIEWED_PERFORMANCE_40_PERCENT_HIGHER",
          "VIEWED_PERFORMANCE_35_PERCENT_HIGHER",
          "VIEWED_PERFORMANCE_30_PERCENT_HIGHER",
          "VIEWED_PERFORMANCE_25_PERCENT_HIGHER",
          "VIEWED_PERFORMANCE_20_PERCENT_HIGHER",
          "VIEWED_PERFORMANCE_10_PERCENT_HIGHER",
        ]).describe("Target web inventory to maximize fully viewable rate.")
          .optional(),
      }).describe("Details of DoubleVerify video viewability settings.")
        .optional(),
    }).describe("Details of DoubleVerify settings.").optional(),
    integralAdScience: z.object({
      customSegmentId: z.array(z.string()).describe(
        "The custom segment ID provided by Integral Ad Science. The ID must be between `1000001` and `1999999` or `3000001` and `3999999`, inclusive.",
      ).optional(),
      displayViewability: z.enum([
        "PERFORMANCE_VIEWABILITY_UNSPECIFIED",
        "PERFORMANCE_VIEWABILITY_40",
        "PERFORMANCE_VIEWABILITY_50",
        "PERFORMANCE_VIEWABILITY_60",
        "PERFORMANCE_VIEWABILITY_70",
      ]).describe(
        "Display Viewability section (applicable to display line items only).",
      ).optional(),
      excludeUnrateable: z.boolean().describe("Brand Safety - **Unrateable**.")
        .optional(),
      excludedAdFraudRisk: z.enum([
        "SUSPICIOUS_ACTIVITY_UNSPECIFIED",
        "SUSPICIOUS_ACTIVITY_HR",
        "SUSPICIOUS_ACTIVITY_HMR",
        "SUSPICIOUS_ACTIVITY_FD",
      ]).describe("Ad Fraud settings.").optional(),
      excludedAdultRisk: z.enum(["ADULT_UNSPECIFIED", "ADULT_HR", "ADULT_HMR"])
        .describe("Brand Safety - **Adult content**.").optional(),
      excludedAlcoholRisk: z.enum([
        "ALCOHOL_UNSPECIFIED",
        "ALCOHOL_HR",
        "ALCOHOL_HMR",
      ]).describe("Brand Safety - **Alcohol**.").optional(),
      excludedDrugsRisk: z.enum(["DRUGS_UNSPECIFIED", "DRUGS_HR", "DRUGS_HMR"])
        .describe("Brand Safety - **Drugs**.").optional(),
      excludedGamblingRisk: z.enum([
        "GAMBLING_UNSPECIFIED",
        "GAMBLING_HR",
        "GAMBLING_HMR",
      ]).describe("Brand Safety - **Gambling**.").optional(),
      excludedHateSpeechRisk: z.enum([
        "HATE_SPEECH_UNSPECIFIED",
        "HATE_SPEECH_HR",
        "HATE_SPEECH_HMR",
      ]).describe("Brand Safety - **Hate speech**.").optional(),
      excludedIllegalDownloadsRisk: z.enum([
        "ILLEGAL_DOWNLOADS_UNSPECIFIED",
        "ILLEGAL_DOWNLOADS_HR",
        "ILLEGAL_DOWNLOADS_HMR",
      ]).describe("Brand Safety - **Illegal downloads**.").optional(),
      excludedOffensiveLanguageRisk: z.enum([
        "OFFENSIVE_LANGUAGE_UNSPECIFIED",
        "OFFENSIVE_LANGUAGE_HR",
        "OFFENSIVE_LANGUAGE_HMR",
      ]).describe("Brand Safety - **Offensive language**.").optional(),
      excludedViolenceRisk: z.enum([
        "VIOLENCE_UNSPECIFIED",
        "VIOLENCE_HR",
        "VIOLENCE_HMR",
      ]).describe("Brand Safety - **Violence**.").optional(),
      qualitySyncCustomSegmentId: z.array(z.string()).describe(
        "Optional. The quality sync custom segment ID provided by Integral Ad Science. The ID must be between `3000000` and `4999999`, inclusive.",
      ).optional(),
      traqScoreOption: z.enum([
        "TRAQ_UNSPECIFIED",
        "TRAQ_250",
        "TRAQ_500",
        "TRAQ_600",
        "TRAQ_700",
        "TRAQ_750",
        "TRAQ_875",
        "TRAQ_1000",
      ]).describe(
        "True advertising quality (applicable to Display line items only).",
      ).optional(),
      videoViewability: z.enum([
        "VIDEO_VIEWABILITY_UNSPECIFIED",
        "VIDEO_VIEWABILITY_40",
        "VIDEO_VIEWABILITY_50",
        "VIDEO_VIEWABILITY_60",
        "VIDEO_VIEWABILITY_70",
      ]).describe(
        "Video Viewability Section (applicable to video line items only).",
      ).optional(),
    }).describe("Details of Integral Ad Science settings.").optional(),
  }).describe(
    "Assigned third party verifier targeting option details. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_THIRD_PARTY_VERIFIER`.",
  ).optional(),
  urlDetails: z.object({
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    url: z.string().describe(
      "Required. The URL, for example `example.com`. DV360 supports two levels of subdirectory targeting, for example `www.example.com/one-subdirectory-level/second-level`, and five levels of subdomain targeting, for example `five.four.three.two.one.example.com`.",
    ).optional(),
  }).describe(
    "Details for assigned URL targeting option. This will be populated in the details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_URL`.",
  ).optional(),
  userRewardedContentDetails: z.object({
    targetingOptionId: z.string().describe(
      "Required. The targeting_option_id field when targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`.",
    ).optional(),
    userRewardedContent: z.enum([
      "USER_REWARDED_CONTENT_UNSPECIFIED",
      "USER_REWARDED_CONTENT_USER_REWARDED",
      "USER_REWARDED_CONTENT_NOT_USER_REWARDED",
    ]).describe("Output only. User rewarded content status for video ads.")
      .optional(),
  }).describe(
    "User rewarded content targeting option details. This will be populated in the user_rewarded_content_details field when targeting_type is `TARGETING_TYPE_USER_REWARDED_CONTENT`.",
  ).optional(),
  videoPlayerSizeDetails: z.object({
    videoPlayerSize: z.enum([
      "VIDEO_PLAYER_SIZE_UNSPECIFIED",
      "VIDEO_PLAYER_SIZE_SMALL",
      "VIDEO_PLAYER_SIZE_LARGE",
      "VIDEO_PLAYER_SIZE_HD",
      "VIDEO_PLAYER_SIZE_UNKNOWN",
    ]).describe("Required. The video player size.").optional(),
  }).describe(
    "Video player size targeting option details. This will be populated in the video_player_size_details field when targeting_type is `TARGETING_TYPE_VIDEO_PLAYER_SIZE`. Explicitly targeting all options is not supported. Remove all video player size targeting options to achieve this effect.",
  ).optional(),
  viewabilityDetails: z.object({
    viewability: z.enum([
      "VIEWABILITY_UNSPECIFIED",
      "VIEWABILITY_10_PERCENT_OR_MORE",
      "VIEWABILITY_20_PERCENT_OR_MORE",
      "VIEWABILITY_30_PERCENT_OR_MORE",
      "VIEWABILITY_40_PERCENT_OR_MORE",
      "VIEWABILITY_50_PERCENT_OR_MORE",
      "VIEWABILITY_60_PERCENT_OR_MORE",
      "VIEWABILITY_70_PERCENT_OR_MORE",
      "VIEWABILITY_80_PERCENT_OR_MORE",
      "VIEWABILITY_90_PERCENT_OR_MORE",
    ]).describe("Required. The predicted viewability percentage.").optional(),
  }).describe(
    "Assigned viewability targeting option details. This will be populated in the viewability_details field of an AssignedTargetingOption when targeting_type is `TARGETING_TYPE_VIEWABILITY`.",
  ).optional(),
  youtubeChannelDetails: z.object({
    channelId: z.string().describe(
      "The YouTube uploader channel id or the channel code of a YouTube channel.",
    ).optional(),
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
  }).describe(
    "Details for YouTube channel assigned targeting option. This will be populated in the youtube_channel_details field when targeting_type is `TARGETING_TYPE_YOUTUBE_CHANNEL`.",
  ).optional(),
  youtubeVideoDetails: z.object({
    negative: z.boolean().describe(
      "Indicates if this option is being negatively targeted.",
    ).optional(),
    videoId: z.string().describe(
      "YouTube video id as it appears on the YouTube watch page.",
    ).optional(),
  }).describe(
    "Details for YouTube video assigned targeting option. This will be populated in the youtube_video_details field when targeting_type is `TARGETING_TYPE_YOUTUBE_VIDEO`.",
  ).optional(),
  partnerId: z.string().describe("Required. The ID of the partner.").optional(),
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

/** Swamp extension model for Google Cloud Display & Video 360 Partners.TargetingTypes.AssignedTargetingOptions. Registered at `@swamp/gcp/displayvideo/partners-targetingtypes-assignedtargetingoptions`. */
export const model = {
  type:
    "@swamp/gcp/displayvideo/partners-targetingtypes-assignedtargetingoptions",
  version: "2026.06.08.1",
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
      toVersion: "2026.04.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
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
    {
      toVersion: "2026.06.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A single assigned targeting option, which defines the state of a targeting op...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a assignedTargetingOptions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["partnerId"] !== undefined) {
          params["partnerId"] = String(g["partnerId"]);
        }
        if (g["targetingType"] !== undefined) {
          params["targetingType"] = String(g["targetingType"]);
        }
        const body: Record<string, unknown> = {};
        if (g["ageRangeDetails"] !== undefined) {
          body["ageRangeDetails"] = g["ageRangeDetails"];
        }
        if (g["appCategoryDetails"] !== undefined) {
          body["appCategoryDetails"] = g["appCategoryDetails"];
        }
        if (g["appDetails"] !== undefined) body["appDetails"] = g["appDetails"];
        if (g["audienceGroupDetails"] !== undefined) {
          body["audienceGroupDetails"] = g["audienceGroupDetails"];
        }
        if (g["audioContentTypeDetails"] !== undefined) {
          body["audioContentTypeDetails"] = g["audioContentTypeDetails"];
        }
        if (g["authorizedSellerStatusDetails"] !== undefined) {
          body["authorizedSellerStatusDetails"] =
            g["authorizedSellerStatusDetails"];
        }
        if (g["browserDetails"] !== undefined) {
          body["browserDetails"] = g["browserDetails"];
        }
        if (g["businessChainDetails"] !== undefined) {
          body["businessChainDetails"] = g["businessChainDetails"];
        }
        if (g["carrierAndIspDetails"] !== undefined) {
          body["carrierAndIspDetails"] = g["carrierAndIspDetails"];
        }
        if (g["categoryDetails"] !== undefined) {
          body["categoryDetails"] = g["categoryDetails"];
        }
        if (g["channelDetails"] !== undefined) {
          body["channelDetails"] = g["channelDetails"];
        }
        if (g["contentDurationDetails"] !== undefined) {
          body["contentDurationDetails"] = g["contentDurationDetails"];
        }
        if (g["contentGenreDetails"] !== undefined) {
          body["contentGenreDetails"] = g["contentGenreDetails"];
        }
        if (g["contentInstreamPositionDetails"] !== undefined) {
          body["contentInstreamPositionDetails"] =
            g["contentInstreamPositionDetails"];
        }
        if (g["contentOutstreamPositionDetails"] !== undefined) {
          body["contentOutstreamPositionDetails"] =
            g["contentOutstreamPositionDetails"];
        }
        if (g["contentStreamTypeDetails"] !== undefined) {
          body["contentStreamTypeDetails"] = g["contentStreamTypeDetails"];
        }
        if (g["contentThemeExclusionDetails"] !== undefined) {
          body["contentThemeExclusionDetails"] =
            g["contentThemeExclusionDetails"];
        }
        if (g["dayAndTimeDetails"] !== undefined) {
          body["dayAndTimeDetails"] = g["dayAndTimeDetails"];
        }
        if (g["deviceMakeModelDetails"] !== undefined) {
          body["deviceMakeModelDetails"] = g["deviceMakeModelDetails"];
        }
        if (g["deviceTypeDetails"] !== undefined) {
          body["deviceTypeDetails"] = g["deviceTypeDetails"];
        }
        if (g["digitalContentLabelExclusionDetails"] !== undefined) {
          body["digitalContentLabelExclusionDetails"] =
            g["digitalContentLabelExclusionDetails"];
        }
        if (g["environmentDetails"] !== undefined) {
          body["environmentDetails"] = g["environmentDetails"];
        }
        if (g["exchangeDetails"] !== undefined) {
          body["exchangeDetails"] = g["exchangeDetails"];
        }
        if (g["genderDetails"] !== undefined) {
          body["genderDetails"] = g["genderDetails"];
        }
        if (g["geoRegionDetails"] !== undefined) {
          body["geoRegionDetails"] = g["geoRegionDetails"];
        }
        if (g["householdIncomeDetails"] !== undefined) {
          body["householdIncomeDetails"] = g["householdIncomeDetails"];
        }
        if (g["inventorySourceDetails"] !== undefined) {
          body["inventorySourceDetails"] = g["inventorySourceDetails"];
        }
        if (g["inventorySourceGroupDetails"] !== undefined) {
          body["inventorySourceGroupDetails"] =
            g["inventorySourceGroupDetails"];
        }
        if (g["keywordDetails"] !== undefined) {
          body["keywordDetails"] = g["keywordDetails"];
        }
        if (g["languageDetails"] !== undefined) {
          body["languageDetails"] = g["languageDetails"];
        }
        if (g["nativeContentPositionDetails"] !== undefined) {
          body["nativeContentPositionDetails"] =
            g["nativeContentPositionDetails"];
        }
        if (g["negativeKeywordListDetails"] !== undefined) {
          body["negativeKeywordListDetails"] = g["negativeKeywordListDetails"];
        }
        if (g["omidDetails"] !== undefined) {
          body["omidDetails"] = g["omidDetails"];
        }
        if (g["onScreenPositionDetails"] !== undefined) {
          body["onScreenPositionDetails"] = g["onScreenPositionDetails"];
        }
        if (g["operatingSystemDetails"] !== undefined) {
          body["operatingSystemDetails"] = g["operatingSystemDetails"];
        }
        if (g["parentalStatusDetails"] !== undefined) {
          body["parentalStatusDetails"] = g["parentalStatusDetails"];
        }
        if (g["poiDetails"] !== undefined) body["poiDetails"] = g["poiDetails"];
        if (g["proximityLocationListDetails"] !== undefined) {
          body["proximityLocationListDetails"] =
            g["proximityLocationListDetails"];
        }
        if (g["regionalLocationListDetails"] !== undefined) {
          body["regionalLocationListDetails"] =
            g["regionalLocationListDetails"];
        }
        if (g["sensitiveCategoryExclusionDetails"] !== undefined) {
          body["sensitiveCategoryExclusionDetails"] =
            g["sensitiveCategoryExclusionDetails"];
        }
        if (g["sessionPositionDetails"] !== undefined) {
          body["sessionPositionDetails"] = g["sessionPositionDetails"];
        }
        if (g["subExchangeDetails"] !== undefined) {
          body["subExchangeDetails"] = g["subExchangeDetails"];
        }
        if (g["thirdPartyVerifierDetails"] !== undefined) {
          body["thirdPartyVerifierDetails"] = g["thirdPartyVerifierDetails"];
        }
        if (g["urlDetails"] !== undefined) body["urlDetails"] = g["urlDetails"];
        if (g["userRewardedContentDetails"] !== undefined) {
          body["userRewardedContentDetails"] = g["userRewardedContentDetails"];
        }
        if (g["videoPlayerSizeDetails"] !== undefined) {
          body["videoPlayerSizeDetails"] = g["videoPlayerSizeDetails"];
        }
        if (g["viewabilityDetails"] !== undefined) {
          body["viewabilityDetails"] = g["viewabilityDetails"];
        }
        if (g["youtubeChannelDetails"] !== undefined) {
          body["youtubeChannelDetails"] = g["youtubeChannelDetails"];
        }
        if (g["youtubeVideoDetails"] !== undefined) {
          body["youtubeVideoDetails"] = g["youtubeVideoDetails"];
        }
        if (g["name"] !== undefined) {
          params["assignedTargetingOptionId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "partnerId": String(g["partnerId"] ?? ""),
              "targetingType": String(g["targetingType"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a assignedTargetingOptions",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the assignedTargetingOptions",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["partnerId"] !== undefined) {
          params["partnerId"] = String(g["partnerId"]);
        }
        if (g["targetingType"] !== undefined) {
          params["targetingType"] = String(g["targetingType"]);
        }
        params["assignedTargetingOptionId"] = args.identifier;
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
    delete: {
      description: "Delete the assignedTargetingOptions",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the assignedTargetingOptions",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["partnerId"] !== undefined) {
          params["partnerId"] = String(g["partnerId"]);
        }
        if (g["targetingType"] !== undefined) {
          params["targetingType"] = String(g["targetingType"]);
        }
        params["assignedTargetingOptionId"] = args.identifier;
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
      description: "Sync assignedTargetingOptions state from GCP",
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
          if (g["partnerId"] !== undefined) {
            params["partnerId"] = String(g["partnerId"]);
          } else if (existing["partnerId"]) {
            params["partnerId"] = String(existing["partnerId"]);
          }
          if (g["targetingType"] !== undefined) {
            params["targetingType"] = String(g["targetingType"]);
          } else if (existing["targetingType"]) {
            params["targetingType"] = String(existing["targetingType"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["assignedTargetingOptionId"] = identifier;
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
      description: "List assignedTargetingOptions resources",
      arguments: z.object({
        filter: z.string().describe(
          'Allows filtering by assigned targeting option fields. Supported syntax: * Filter expressions are made up of one or more restrictions. * Restrictions can be combined by the logical operator `OR`. * A restriction has the form of `{field} {operator} {value}`. * All fields must use the `EQUALS (=)` operator. Supported fields: * `assignedTargetingOptionId` Examples: * `AssignedTargetingOption` resource with ID 123456: `assignedTargetingOptionId="123456"` The length of this field should be no more than 500 characters. Reference our [filter `LIST` requests](/display-video/api/guides/how-tos/filters) guide for more information.',
        ).optional(),
        orderBy: z.string().describe(
          'Field by which to sort the list. Acceptable values are: * `assignedTargetingOptionId` (default) The default sorting order is ascending. To specify descending order for a field, a suffix "desc" should be added to the field name. Example: `assignedTargetingOptionId desc`.',
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
        if (g["partnerId"] !== undefined) {
          params["partnerId"] = String(g["partnerId"]);
        }
        if (g["targetingType"] !== undefined) {
          params["targetingType"] = String(g["targetingType"]);
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
          "assignedTargetingOptions",
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
