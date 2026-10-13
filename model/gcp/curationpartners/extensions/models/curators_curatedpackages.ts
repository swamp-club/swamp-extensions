// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/curationpartners/curators-curatedpackages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Curation Partners Curators.CuratedPackages.
 *
 * Represents a curated package of inventory created and managed by a Curator.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/curatedPackages/${shortName}`;
}

const BASE_URL = "https://curationpartners.googleapis.com/";

const GET_CONFIG = {
  "id": "curationpartners.curators.curatedPackages.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "curationpartners.curators.curatedPackages.create",
  "path": "v1/{+parent}/curatedPackages",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "curationpartners.curators.curatedPackages.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "curationpartners.curators.curatedPackages.list",
  "path": "v1/{+parent}/curatedPackages",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/curation-partners",
];

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  accessSettings: z.object({
    allowlistedMediaPlanners: z.array(z.string()).describe(
      "Required. Immutable. The list of media planners that are explicitly granted access to the curated package. Eligible media planners can be found in the mediaPlanners.list method. Only a single media planner may be allowlisted at this time. Format: `mediaPlanners/{mediaPlannerAccountId}`",
    ).optional(),
  }).describe(
    "Required. Settings for controlling access to the curated package. Access to this curated package is limited to the allowlisted media planners and the creator. Buyers and bidders can not be allowlisted for or have direct access to this resource.",
  ).optional(),
  curationFeeVisibility: z.enum([
    "CURATION_FEE_VISIBILITY_UNSPECIFIED",
    "DISCLOSED",
    "NON_DISCLOSED",
  ]).describe(
    "Optional. Immutable. The visibility of the combined curation package fee and data segment fees (the total curation fee).",
  ).optional(),
  description: z.string().describe(
    "Optional. A description of the curated package, provided by the curator.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name assigned to the curated package by the curator. Can be used to filter the response of the curatedPackages.list method.",
  ).optional(),
  feeCpm: z.object({
    currencyCode: z.string().describe(
      "The three-letter currency code defined in ISO 4217.",
    ).optional(),
    nanos: z.number().int().describe(
      "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
    ).optional(),
    units: z.string().describe(
      'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
    ).optional(),
  }).describe(
    "Optional. The CPM fee charged by the curator to buyers using this curated package. Can be used to filter the response of the curatedPackages.list method.",
  ).optional(),
  floorPriceCpm: z.object({
    currencyCode: z.string().describe(
      "The three-letter currency code defined in ISO 4217.",
    ).optional(),
    nanos: z.number().int().describe(
      "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
    ).optional(),
    units: z.string().describe(
      'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
    ).optional(),
  }).describe(
    "Optional. The minimum CPM a buyer has to bid to participate in auctions for inventory in this curated package. Can be used to filter the response of the curatedPackages.list method.",
  ).optional(),
  millipercentOfMediaFee: z.string().describe(
    "Optional. The fee will be charged as a percentage of the impression cost, represented in millipercent. For example, 1% is represented as 1000.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique resource name for the curated package. Format: `curators/{accountId}/curatedPackages/{curatedPackageId}`",
  ).optional(),
  targeting: z.object({
    geoTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be excluded.",
      ).optional(),
      targetedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be included.",
      ).optional(),
    }).describe(
      "Optional. The geo criteria IDs to be included or excluded as defined in https://storage.googleapis.com/adx-rtb-dictionaries/geo-table.csv. If unset, inventory will be targeted regardless of geo.",
    ).optional(),
    includedAcceleratedMobilePageType: z.enum([
      "ACCELERATED_MOBILE_PAGE_TYPE_UNSPECIFIED",
      "ACCELERATED_MOBILE_PAGE_TYPE_NON_AMP",
      "ACCELERATED_MOBILE_PAGE_TYPE_AMP",
      "ACCELERATED_MOBILE_PAGE_TYPE_AMP_STORY",
    ]).describe(
      "Optional. The targeted accelerated mobile page type. If unset, inventory will be targeted regardless of AMP status.",
    ).optional(),
    includedAdSizes: z.array(z.object({
      height: z.string().describe(
        "The height of the ad slot in pixels. This field will be present only when size type is `PIXEL`.",
      ).optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "PIXEL",
        "INTERSTITIAL",
        "NATIVE",
        "FLUID",
      ]).describe("The type of the ad slot size.").optional(),
      width: z.string().describe(
        "The width of the ad slot in pixels. This field will be present only when size type is `PIXEL`.",
      ).optional(),
    })).describe(
      "Optional. The list of ad sizes to target. If unset, inventory will be targeted regardless of ad size. Curated packages supports `PIXEL` and `INTERSTITIAL` ad sizes.",
    ).optional(),
    includedAuthorizedSellerStatuses: z.array(
      z.enum([
        "AUTHORIZED_SELLER_STATUS_UNSPECIFIED",
        "AUTHORIZED_SELLER_STATUS_DIRECT",
        "AUTHORIZED_SELLER_STATUS_RESELLER",
      ]),
    ).describe(
      "Optional. The included list of targeted authorized seller statuses. If empty, inventory will be targeted regardless of seller status.",
    ).optional(),
    includedCreativeFormat: z.enum([
      "CREATIVE_FORMAT_UNSPECIFIED",
      "CREATIVE_FORMAT_DISPLAY",
      "CREATIVE_FORMAT_VIDEO",
      "CREATIVE_FORMAT_AUDIO",
    ]).describe(
      "Optional. The creative format to target. If unset, all creative markup types are targeted.",
    ).optional(),
    includedDataSegments: z.array(z.string()).describe(
      "Optional. The active data segments to be targeted. If unset, inventory will be targeted regardless of data segments. Format: `curators/{account_id}/dataSegments/{data_segment_id}`",
    ).optional(),
    includedDeviceTypes: z.array(
      z.enum([
        "DEVICE_TYPE_UNSPECIFIED",
        "DEVICE_TYPE_PERSONAL_COMPUTER",
        "DEVICE_TYPE_CONNECTED_TV",
        "DEVICE_TYPE_PHONE",
        "DEVICE_TYPE_TABLET",
      ]),
    ).describe(
      "Optional. The list of included device types to target. If empty, all device types are targeted.",
    ).optional(),
    includedEnvironment: z.enum([
      "ENVIRONMENT_UNSPECIFIED",
      "ENVIRONMENT_SITE",
      "ENVIRONMENT_APP",
    ]).describe(
      "Optional. The environment to target. If unspecified, all environments are targeted.",
    ).optional(),
    includedNativeInventoryTypes: z.array(
      z.enum([
        "NATIVE_INVENTORY_TYPE_UNSPECIFIED",
        "NATIVE_INVENTORY_TYPE_NATIVE_ONLY",
        "NATIVE_INVENTORY_TYPE_NATIVE_OR_BANNER",
      ]),
    ).describe(
      "Optional. The targeted native inventory types. If empty, inventory will be targeted regardless of native inventory type.",
    ).optional(),
    includedOpenMeasurementTypes: z.array(
      z.enum([
        "OPEN_MEASUREMENT_TYPE_UNSPECIFIED",
        "OPEN_MEASUREMENT_TYPE_OMID_V1",
      ]),
    ).describe(
      "Optional. The list of targeted open measurement types. If empty, inventory will be targeted regardless of Open Measurement support.",
    ).optional(),
    includedRestrictedCategories: z.array(
      z.enum([
        "RESTRICTED_CATEGORY_UNSPECIFIED",
        "RESTRICTED_CATEGORY_ALCOHOL",
        "RESTRICTED_CATEGORY_GAMBLING",
      ]),
    ).describe(
      "Optional. The list of targeted restricted categories. If empty, inventory will be targeted regardless of restricted categories.",
    ).optional(),
    includedRewardedType: z.enum([
      "REWARDED_TYPE_UNSPECIFIED",
      "REWARDED_TYPE_NON_REWARDED",
      "REWARDED_TYPE_REWARDED",
    ]).describe(
      "Optional. The targeted rewarded type. If unset, inventory will be targeted regardless of rewarded type.",
    ).optional(),
    languageTargeting: z.object({
      selectionType: z.enum([
        "SELECTION_TYPE_UNSPECIFIED",
        "SELECTION_TYPE_INCLUDE",
        "SELECTION_TYPE_EXCLUDE",
      ]).describe("Required. How the items in this list should be targeted.")
        .optional(),
      values: z.array(z.string()).describe("Required. The values specified.")
        .optional(),
    }).describe(
      "Optional. The languages to target. If unset, inventory will be targeted regardless of language. See https://developers.google.com/google-ads/api/data/codes-formats#languages for the list of supported language codes.",
    ).optional(),
    minimumPredictedClickThroughRatePercentageMillis: z.string().describe(
      "Optional. The targeted minimum predicted click through rate, ranging in values [10, 10000] (0.01% - 10%). A value of 50 means that the configuration will only match adslots for which we predict at least 0.05% click through rate. An unset value indicates inventory will be targeted regardless of predicted click through rate.",
    ).optional(),
    minimumPredictedViewabilityPercentage: z.string().describe(
      "Optional. The targeted minimum predicted viewability percentage. This value must be a multiple of 10 between 10 and 90 (inclusive). For example, 10 is valid, but 0, 15, and 100 are not. A value of 10 means that the configuration will only match adslots for which we predict at least 10% viewability. An unset value indicates inventory will be targeted regardless of predicted viewability.",
    ).optional(),
    placementTargeting: z.object({
      includedMobileAppCategoryTargeting: z.array(z.string()).describe(
        "Optional. The list of targeted mobile app categories.",
      ).optional(),
      mobileAppTargeting: z.object({
        selectionType: z.enum([
          "SELECTION_TYPE_UNSPECIFIED",
          "SELECTION_TYPE_INCLUDE",
          "SELECTION_TYPE_EXCLUDE",
        ]).describe("Required. How the items in this list should be targeted.")
          .optional(),
        values: z.array(z.string()).describe("Required. The values specified.")
          .optional(),
      }).describe(
        "Optional. The list of targeted or excluded mobile application IDs that publishers own. Currently, only Android and Apple apps are supported. Android App ID, for example, com.google.android.apps.maps, can be found in Google Play Store URL. iOS App ID (which is a number) can be found at the end of iTunes store URL. First party mobile applications is either included or excluded.",
      ).optional(),
      uriTargeting: z.object({
        selectionType: z.enum([
          "SELECTION_TYPE_UNSPECIFIED",
          "SELECTION_TYPE_INCLUDE",
          "SELECTION_TYPE_EXCLUDE",
        ]).describe("Required. How the items in this list should be targeted.")
          .optional(),
        values: z.array(z.string()).describe("Required. The values specified.")
          .optional(),
      }).describe(
        "Optional. The list of targeted or excluded URLs. The domains should have the http/https stripped (for example, google.com), and can contain a max of 5 paths per url.",
      ).optional(),
    }).describe(
      "Optional. Placement targeting information, for example, URL, mobile applications.",
    ).optional(),
    publisherProvidedSignalsTargeting: z.object({
      audienceTargeting: z.object({
        excludedTaxonomyIds: z.array(z.string()).describe(
          "Optional. The list of excluded content taxonomy IDs.",
        ).optional(),
        targetedTaxonomyIds: z.array(z.string()).describe(
          "Optional. The list of targeted content taxonomy IDs.",
        ).optional(),
      }).describe(
        "Optional. The list of targeted or excluded audience IDs. Based off of IAB Audience Taxonomy version 1.1 (https://github.com/InteractiveAdvertisingBureau/Taxonomies/blob/main/Audience%20Taxonomies/Audience%20Taxonomy%201.1.tsv)",
      ).optional(),
      contentTargeting: z.object({
        excludedTaxonomyIds: z.array(z.string()).describe(
          "Optional. The list of excluded content taxonomy IDs.",
        ).optional(),
        targetedTaxonomyIds: z.array(z.string()).describe(
          "Optional. The list of targeted content taxonomy IDs.",
        ).optional(),
      }).describe(
        "Optional. The list of targeted or excluded content IDs. Based off of IAB Content Taxonomy version 2.2 (https://github.com/InteractiveAdvertisingBureau/Taxonomies/blob/main/Content%20Taxonomies/Content%20Taxonomy%202.2.tsv)",
      ).optional(),
      videoAndAudioSignalsTargeting: z.object({
        selectionType: z.enum([
          "SELECTION_TYPE_UNSPECIFIED",
          "SELECTION_TYPE_INCLUDE",
          "SELECTION_TYPE_EXCLUDE",
        ]).describe("Required. How the items in this list should be targeted.")
          .optional(),
        values: z.array(z.string()).describe("Required. The values specified.")
          .optional(),
      }).describe(
        "Optional. The list of targeted and excluded video and audio signals IDs. These are additional signals supported by publisher provided signals.",
      ).optional(),
    }).describe(
      "Optional. The publisher provided signals to target. If unset, inventory will be targeted regardless of publisher provided signals.",
    ).optional(),
    publisherTargeting: z.object({
      selectionType: z.enum([
        "SELECTION_TYPE_UNSPECIFIED",
        "SELECTION_TYPE_INCLUDE",
        "SELECTION_TYPE_EXCLUDE",
      ]).describe("Required. How the items in this list should be targeted.")
        .optional(),
      values: z.array(z.string()).describe("Required. The values specified.")
        .optional(),
    }).describe(
      "Optional. The targeted publishers. If unset, inventory will be targeted regardless of publisher. Publishers are identified by their publisher ID from ads.txt / app-ads.txt. See https://iabtechlab.com/ads-txt/ and https://iabtechlab.com/app-ads-txt/ for more details.",
    ).optional(),
    verticalTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be excluded.",
      ).optional(),
      targetedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be included.",
      ).optional(),
    }).describe(
      "Optional. The verticals included or excluded as defined in https://developers.google.com/authorized-buyers/rtb/downloads/publisher-verticals. If unset, inventory will be targeted regardless of vertical.",
    ).optional(),
    videoTargeting: z.object({
      includedContentDeliveryMethod: z.enum([
        "CONTENT_DELIVERY_METHOD_UNSPECIFIED",
        "CONTENT_DELIVERY_METHOD_STREAMING",
        "CONTENT_DELIVERY_METHOD_PROGRESSIVE",
      ]).describe(
        "Optional. The targeted video delivery method. If unset, inventory will be targeted regardless of video delivery method.",
      ).optional(),
      includedMaximumAdDurationTargeting: z.enum([
        "MAXIMUM_VIDEO_AD_DURATION_UNSPECIFIED",
        "MAXIMUM_VIDEO_AD_DURATION_FIFTEEN_SECONDS",
        "MAXIMUM_VIDEO_AD_DURATION_TWENTY_SECONDS",
        "MAXIMUM_VIDEO_AD_DURATION_THIRTY_SECONDS",
        "MAXIMUM_VIDEO_AD_DURATION_SIXTY_SECONDS",
        "MAXIMUM_VIDEO_AD_DURATION_NINETY_SECONDS",
        "MAXIMUM_VIDEO_AD_DURATION_ONE_HUNDRED_TWENTY_SECONDS",
      ]).describe(
        "Optional. The targeted maximum video ad duration. If unset, inventory will be targeted regardless of maximum video ad duration.",
      ).optional(),
      includedMimeTypes: z.array(
        z.enum([
          "VIDEO_MIME_TYPE_UNSPECIFIED",
          "VIDEO_MIME_TYPE_THREEGPP",
          "VIDEO_MIME_TYPE_APPLICATION_MPEGURL",
          "VIDEO_MIME_TYPE_MP4",
          "VIDEO_MIME_TYPE_APPLICATION_MPEGDASH",
          "VIDEO_MIME_TYPE_APPLICATION_JAVASCRIPT",
          "VIDEO_MIME_TYPE_WEBM",
        ]),
      ).describe(
        "Optional. The list of targeted video mime types using the IANA published MIME type strings (https://www.iana.org/assignments/media-types/media-types.xhtml). If empty, inventory will be targeted regardless of video mime type.",
      ).optional(),
      includedPlaybackMethods: z.array(
        z.enum([
          "PLAYBACK_METHOD_UNSPECIFIED",
          "PLAYBACK_METHOD_AUTO_PLAY_SOUND_ON",
          "PLAYBACK_METHOD_AUTO_PLAY_SOUND_OFF",
          "PLAYBACK_METHOD_CLICK_TO_PLAY",
        ]),
      ).describe(
        "Optional. The list of targeted video playback methods. If empty, inventory will be targeted regardless of video playback method.",
      ).optional(),
      includedPlayerSizeTargeting: z.object({
        minimumHeight: z.string().describe(
          "Required. The minimum height of the video player in pixels.",
        ).optional(),
        minimumWidth: z.string().describe(
          "Required. The minimum width of the video player in pixels.",
        ).optional(),
      }).describe(
        "Optional. The targeted video player size. If unset, inventory will be targeted regardless of video player size.",
      ).optional(),
      includedPositionTypes: z.array(
        z.enum([
          "POSITION_TYPE_UNSPECIFIED",
          "POSITION_TYPE_MIDROLL",
          "POSITION_TYPE_POSTROLL",
          "POSITION_TYPE_PREROLL",
        ]),
      ).describe(
        "Optional. The targeted video ad position types. If empty, inventory will be targeted regardless of video ad position type.",
      ).optional(),
      minimumPredictedCompletionRatePercentage: z.string().describe(
        "Optional. The targeted minimum predicted completion rate percentage. This value must be a multiple of 10 between 10 and 90 (inclusive). For example, 10 is valid, but 0, 15, and 100 are not. A value of 10 means that the configuration will only match adslots for which we predict at least 10% completion rate. An unset value indicates inventory will be targeted regardless of predicted completion rate.",
      ).optional(),
      plcmtTargeting: z.object({
        selectionType: z.enum([
          "SELECTION_TYPE_UNSPECIFIED",
          "SELECTION_TYPE_INCLUDE",
          "SELECTION_TYPE_EXCLUDE",
        ]).describe(
          "Required. The selection type for the list of video plcmts.",
        ).optional(),
        videoPlcmtTypes: z.array(
          z.enum([
            "VIDEO_PLCMT_TYPE_UNSPECIFIED",
            "INSTREAM",
            "ACCOMPANYING_CONTENT",
            "INTERSTITIAL",
            "NO_CONTENT",
          ]),
        ).describe(
          "Required. The list of targeted video plcmts types. If empty, inventory will be targeted regardless of video plcmt type.",
        ).optional(),
      }).describe(
        "Optional. The targeted video plcmt types. If unset, inventory will be targeted regardless of video plcmt type.",
      ).optional(),
    }).describe("Optional. Video specific targeting criteria.").optional(),
  }).describe("Optional. Targeting criteria for the curated package.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accessSettings: z.object({
    allowlistedMediaPlanners: z.array(z.string()),
  }).optional(),
  createTime: z.string().optional(),
  curationFeeVisibility: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  feeCpm: z.object({
    currencyCode: z.string(),
    nanos: z.number(),
    units: z.string(),
  }).optional(),
  floorPriceCpm: z.object({
    currencyCode: z.string(),
    nanos: z.number(),
    units: z.string(),
  }).optional(),
  millipercentOfMediaFee: z.string().optional(),
  name: z.string(),
  state: z.string().optional(),
  targeting: z.object({
    geoTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()),
      targetedCriteriaIds: z.array(z.string()),
    }),
    includedAcceleratedMobilePageType: z.string(),
    includedAdSizes: z.array(z.object({
      height: z.string(),
      type: z.string(),
      width: z.string(),
    })),
    includedAuthorizedSellerStatuses: z.array(z.string()),
    includedCreativeFormat: z.string(),
    includedDataSegments: z.array(z.string()),
    includedDeviceTypes: z.array(z.string()),
    includedEnvironment: z.string(),
    includedNativeInventoryTypes: z.array(z.string()),
    includedOpenMeasurementTypes: z.array(z.string()),
    includedRestrictedCategories: z.array(z.string()),
    includedRewardedType: z.string(),
    languageTargeting: z.object({
      selectionType: z.string(),
      values: z.array(z.string()),
    }),
    minimumPredictedClickThroughRatePercentageMillis: z.string(),
    minimumPredictedViewabilityPercentage: z.string(),
    placementTargeting: z.object({
      includedMobileAppCategoryTargeting: z.array(z.string()),
      mobileAppTargeting: z.object({
        selectionType: z.string(),
        values: z.array(z.string()),
      }),
      uriTargeting: z.object({
        selectionType: z.string(),
        values: z.array(z.string()),
      }),
    }),
    publisherProvidedSignalsTargeting: z.object({
      audienceTargeting: z.object({
        excludedTaxonomyIds: z.array(z.string()),
        targetedTaxonomyIds: z.array(z.string()),
      }),
      contentTargeting: z.object({
        excludedTaxonomyIds: z.array(z.string()),
        targetedTaxonomyIds: z.array(z.string()),
      }),
      videoAndAudioSignalsTargeting: z.object({
        selectionType: z.string(),
        values: z.array(z.string()),
      }),
    }),
    publisherTargeting: z.object({
      selectionType: z.string(),
      values: z.array(z.string()),
    }),
    verticalTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()),
      targetedCriteriaIds: z.array(z.string()),
    }),
    videoTargeting: z.object({
      includedContentDeliveryMethod: z.string(),
      includedMaximumAdDurationTargeting: z.string(),
      includedMimeTypes: z.array(z.string()),
      includedPlaybackMethods: z.array(z.string()),
      includedPlayerSizeTargeting: z.object({
        minimumHeight: z.string(),
        minimumWidth: z.string(),
      }),
      includedPositionTypes: z.array(z.string()),
      minimumPredictedCompletionRatePercentage: z.string(),
      plcmtTargeting: z.object({
        selectionType: z.string(),
        videoPlcmtTypes: z.array(z.string()),
      }),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  accessSettings: z.object({
    allowlistedMediaPlanners: z.array(z.string()).describe(
      "Required. Immutable. The list of media planners that are explicitly granted access to the curated package. Eligible media planners can be found in the mediaPlanners.list method. Only a single media planner may be allowlisted at this time. Format: `mediaPlanners/{mediaPlannerAccountId}`",
    ).optional(),
  }).describe(
    "Required. Settings for controlling access to the curated package. Access to this curated package is limited to the allowlisted media planners and the creator. Buyers and bidders can not be allowlisted for or have direct access to this resource.",
  ).optional(),
  curationFeeVisibility: z.enum([
    "CURATION_FEE_VISIBILITY_UNSPECIFIED",
    "DISCLOSED",
    "NON_DISCLOSED",
  ]).describe(
    "Optional. Immutable. The visibility of the combined curation package fee and data segment fees (the total curation fee).",
  ).optional(),
  description: z.string().describe(
    "Optional. A description of the curated package, provided by the curator.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name assigned to the curated package by the curator. Can be used to filter the response of the curatedPackages.list method.",
  ).optional(),
  feeCpm: z.object({
    currencyCode: z.string().describe(
      "The three-letter currency code defined in ISO 4217.",
    ).optional(),
    nanos: z.number().int().describe(
      "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
    ).optional(),
    units: z.string().describe(
      'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
    ).optional(),
  }).describe(
    "Optional. The CPM fee charged by the curator to buyers using this curated package. Can be used to filter the response of the curatedPackages.list method.",
  ).optional(),
  floorPriceCpm: z.object({
    currencyCode: z.string().describe(
      "The three-letter currency code defined in ISO 4217.",
    ).optional(),
    nanos: z.number().int().describe(
      "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
    ).optional(),
    units: z.string().describe(
      'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
    ).optional(),
  }).describe(
    "Optional. The minimum CPM a buyer has to bid to participate in auctions for inventory in this curated package. Can be used to filter the response of the curatedPackages.list method.",
  ).optional(),
  millipercentOfMediaFee: z.string().describe(
    "Optional. The fee will be charged as a percentage of the impression cost, represented in millipercent. For example, 1% is represented as 1000.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The unique resource name for the curated package. Format: `curators/{accountId}/curatedPackages/{curatedPackageId}`",
  ).optional(),
  targeting: z.object({
    geoTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be excluded.",
      ).optional(),
      targetedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be included.",
      ).optional(),
    }).describe(
      "Optional. The geo criteria IDs to be included or excluded as defined in https://storage.googleapis.com/adx-rtb-dictionaries/geo-table.csv. If unset, inventory will be targeted regardless of geo.",
    ).optional(),
    includedAcceleratedMobilePageType: z.enum([
      "ACCELERATED_MOBILE_PAGE_TYPE_UNSPECIFIED",
      "ACCELERATED_MOBILE_PAGE_TYPE_NON_AMP",
      "ACCELERATED_MOBILE_PAGE_TYPE_AMP",
      "ACCELERATED_MOBILE_PAGE_TYPE_AMP_STORY",
    ]).describe(
      "Optional. The targeted accelerated mobile page type. If unset, inventory will be targeted regardless of AMP status.",
    ).optional(),
    includedAdSizes: z.array(z.object({
      height: z.string().describe(
        "The height of the ad slot in pixels. This field will be present only when size type is `PIXEL`.",
      ).optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "PIXEL",
        "INTERSTITIAL",
        "NATIVE",
        "FLUID",
      ]).describe("The type of the ad slot size.").optional(),
      width: z.string().describe(
        "The width of the ad slot in pixels. This field will be present only when size type is `PIXEL`.",
      ).optional(),
    })).describe(
      "Optional. The list of ad sizes to target. If unset, inventory will be targeted regardless of ad size. Curated packages supports `PIXEL` and `INTERSTITIAL` ad sizes.",
    ).optional(),
    includedAuthorizedSellerStatuses: z.array(
      z.enum([
        "AUTHORIZED_SELLER_STATUS_UNSPECIFIED",
        "AUTHORIZED_SELLER_STATUS_DIRECT",
        "AUTHORIZED_SELLER_STATUS_RESELLER",
      ]),
    ).describe(
      "Optional. The included list of targeted authorized seller statuses. If empty, inventory will be targeted regardless of seller status.",
    ).optional(),
    includedCreativeFormat: z.enum([
      "CREATIVE_FORMAT_UNSPECIFIED",
      "CREATIVE_FORMAT_DISPLAY",
      "CREATIVE_FORMAT_VIDEO",
      "CREATIVE_FORMAT_AUDIO",
    ]).describe(
      "Optional. The creative format to target. If unset, all creative markup types are targeted.",
    ).optional(),
    includedDataSegments: z.array(z.string()).describe(
      "Optional. The active data segments to be targeted. If unset, inventory will be targeted regardless of data segments. Format: `curators/{account_id}/dataSegments/{data_segment_id}`",
    ).optional(),
    includedDeviceTypes: z.array(
      z.enum([
        "DEVICE_TYPE_UNSPECIFIED",
        "DEVICE_TYPE_PERSONAL_COMPUTER",
        "DEVICE_TYPE_CONNECTED_TV",
        "DEVICE_TYPE_PHONE",
        "DEVICE_TYPE_TABLET",
      ]),
    ).describe(
      "Optional. The list of included device types to target. If empty, all device types are targeted.",
    ).optional(),
    includedEnvironment: z.enum([
      "ENVIRONMENT_UNSPECIFIED",
      "ENVIRONMENT_SITE",
      "ENVIRONMENT_APP",
    ]).describe(
      "Optional. The environment to target. If unspecified, all environments are targeted.",
    ).optional(),
    includedNativeInventoryTypes: z.array(
      z.enum([
        "NATIVE_INVENTORY_TYPE_UNSPECIFIED",
        "NATIVE_INVENTORY_TYPE_NATIVE_ONLY",
        "NATIVE_INVENTORY_TYPE_NATIVE_OR_BANNER",
      ]),
    ).describe(
      "Optional. The targeted native inventory types. If empty, inventory will be targeted regardless of native inventory type.",
    ).optional(),
    includedOpenMeasurementTypes: z.array(
      z.enum([
        "OPEN_MEASUREMENT_TYPE_UNSPECIFIED",
        "OPEN_MEASUREMENT_TYPE_OMID_V1",
      ]),
    ).describe(
      "Optional. The list of targeted open measurement types. If empty, inventory will be targeted regardless of Open Measurement support.",
    ).optional(),
    includedRestrictedCategories: z.array(
      z.enum([
        "RESTRICTED_CATEGORY_UNSPECIFIED",
        "RESTRICTED_CATEGORY_ALCOHOL",
        "RESTRICTED_CATEGORY_GAMBLING",
      ]),
    ).describe(
      "Optional. The list of targeted restricted categories. If empty, inventory will be targeted regardless of restricted categories.",
    ).optional(),
    includedRewardedType: z.enum([
      "REWARDED_TYPE_UNSPECIFIED",
      "REWARDED_TYPE_NON_REWARDED",
      "REWARDED_TYPE_REWARDED",
    ]).describe(
      "Optional. The targeted rewarded type. If unset, inventory will be targeted regardless of rewarded type.",
    ).optional(),
    languageTargeting: z.object({
      selectionType: z.enum([
        "SELECTION_TYPE_UNSPECIFIED",
        "SELECTION_TYPE_INCLUDE",
        "SELECTION_TYPE_EXCLUDE",
      ]).describe("Required. How the items in this list should be targeted.")
        .optional(),
      values: z.array(z.string()).describe("Required. The values specified.")
        .optional(),
    }).describe(
      "Optional. The languages to target. If unset, inventory will be targeted regardless of language. See https://developers.google.com/google-ads/api/data/codes-formats#languages for the list of supported language codes.",
    ).optional(),
    minimumPredictedClickThroughRatePercentageMillis: z.string().describe(
      "Optional. The targeted minimum predicted click through rate, ranging in values [10, 10000] (0.01% - 10%). A value of 50 means that the configuration will only match adslots for which we predict at least 0.05% click through rate. An unset value indicates inventory will be targeted regardless of predicted click through rate.",
    ).optional(),
    minimumPredictedViewabilityPercentage: z.string().describe(
      "Optional. The targeted minimum predicted viewability percentage. This value must be a multiple of 10 between 10 and 90 (inclusive). For example, 10 is valid, but 0, 15, and 100 are not. A value of 10 means that the configuration will only match adslots for which we predict at least 10% viewability. An unset value indicates inventory will be targeted regardless of predicted viewability.",
    ).optional(),
    placementTargeting: z.object({
      includedMobileAppCategoryTargeting: z.array(z.string()).describe(
        "Optional. The list of targeted mobile app categories.",
      ).optional(),
      mobileAppTargeting: z.object({
        selectionType: z.enum([
          "SELECTION_TYPE_UNSPECIFIED",
          "SELECTION_TYPE_INCLUDE",
          "SELECTION_TYPE_EXCLUDE",
        ]).describe("Required. How the items in this list should be targeted.")
          .optional(),
        values: z.array(z.string()).describe("Required. The values specified.")
          .optional(),
      }).describe(
        "Optional. The list of targeted or excluded mobile application IDs that publishers own. Currently, only Android and Apple apps are supported. Android App ID, for example, com.google.android.apps.maps, can be found in Google Play Store URL. iOS App ID (which is a number) can be found at the end of iTunes store URL. First party mobile applications is either included or excluded.",
      ).optional(),
      uriTargeting: z.object({
        selectionType: z.enum([
          "SELECTION_TYPE_UNSPECIFIED",
          "SELECTION_TYPE_INCLUDE",
          "SELECTION_TYPE_EXCLUDE",
        ]).describe("Required. How the items in this list should be targeted.")
          .optional(),
        values: z.array(z.string()).describe("Required. The values specified.")
          .optional(),
      }).describe(
        "Optional. The list of targeted or excluded URLs. The domains should have the http/https stripped (for example, google.com), and can contain a max of 5 paths per url.",
      ).optional(),
    }).describe(
      "Optional. Placement targeting information, for example, URL, mobile applications.",
    ).optional(),
    publisherProvidedSignalsTargeting: z.object({
      audienceTargeting: z.object({
        excludedTaxonomyIds: z.array(z.string()).describe(
          "Optional. The list of excluded content taxonomy IDs.",
        ).optional(),
        targetedTaxonomyIds: z.array(z.string()).describe(
          "Optional. The list of targeted content taxonomy IDs.",
        ).optional(),
      }).describe(
        "Optional. The list of targeted or excluded audience IDs. Based off of IAB Audience Taxonomy version 1.1 (https://github.com/InteractiveAdvertisingBureau/Taxonomies/blob/main/Audience%20Taxonomies/Audience%20Taxonomy%201.1.tsv)",
      ).optional(),
      contentTargeting: z.object({
        excludedTaxonomyIds: z.array(z.string()).describe(
          "Optional. The list of excluded content taxonomy IDs.",
        ).optional(),
        targetedTaxonomyIds: z.array(z.string()).describe(
          "Optional. The list of targeted content taxonomy IDs.",
        ).optional(),
      }).describe(
        "Optional. The list of targeted or excluded content IDs. Based off of IAB Content Taxonomy version 2.2 (https://github.com/InteractiveAdvertisingBureau/Taxonomies/blob/main/Content%20Taxonomies/Content%20Taxonomy%202.2.tsv)",
      ).optional(),
      videoAndAudioSignalsTargeting: z.object({
        selectionType: z.enum([
          "SELECTION_TYPE_UNSPECIFIED",
          "SELECTION_TYPE_INCLUDE",
          "SELECTION_TYPE_EXCLUDE",
        ]).describe("Required. How the items in this list should be targeted.")
          .optional(),
        values: z.array(z.string()).describe("Required. The values specified.")
          .optional(),
      }).describe(
        "Optional. The list of targeted and excluded video and audio signals IDs. These are additional signals supported by publisher provided signals.",
      ).optional(),
    }).describe(
      "Optional. The publisher provided signals to target. If unset, inventory will be targeted regardless of publisher provided signals.",
    ).optional(),
    publisherTargeting: z.object({
      selectionType: z.enum([
        "SELECTION_TYPE_UNSPECIFIED",
        "SELECTION_TYPE_INCLUDE",
        "SELECTION_TYPE_EXCLUDE",
      ]).describe("Required. How the items in this list should be targeted.")
        .optional(),
      values: z.array(z.string()).describe("Required. The values specified.")
        .optional(),
    }).describe(
      "Optional. The targeted publishers. If unset, inventory will be targeted regardless of publisher. Publishers are identified by their publisher ID from ads.txt / app-ads.txt. See https://iabtechlab.com/ads-txt/ and https://iabtechlab.com/app-ads-txt/ for more details.",
    ).optional(),
    verticalTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be excluded.",
      ).optional(),
      targetedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be included.",
      ).optional(),
    }).describe(
      "Optional. The verticals included or excluded as defined in https://developers.google.com/authorized-buyers/rtb/downloads/publisher-verticals. If unset, inventory will be targeted regardless of vertical.",
    ).optional(),
    videoTargeting: z.object({
      includedContentDeliveryMethod: z.enum([
        "CONTENT_DELIVERY_METHOD_UNSPECIFIED",
        "CONTENT_DELIVERY_METHOD_STREAMING",
        "CONTENT_DELIVERY_METHOD_PROGRESSIVE",
      ]).describe(
        "Optional. The targeted video delivery method. If unset, inventory will be targeted regardless of video delivery method.",
      ).optional(),
      includedMaximumAdDurationTargeting: z.enum([
        "MAXIMUM_VIDEO_AD_DURATION_UNSPECIFIED",
        "MAXIMUM_VIDEO_AD_DURATION_FIFTEEN_SECONDS",
        "MAXIMUM_VIDEO_AD_DURATION_TWENTY_SECONDS",
        "MAXIMUM_VIDEO_AD_DURATION_THIRTY_SECONDS",
        "MAXIMUM_VIDEO_AD_DURATION_SIXTY_SECONDS",
        "MAXIMUM_VIDEO_AD_DURATION_NINETY_SECONDS",
        "MAXIMUM_VIDEO_AD_DURATION_ONE_HUNDRED_TWENTY_SECONDS",
      ]).describe(
        "Optional. The targeted maximum video ad duration. If unset, inventory will be targeted regardless of maximum video ad duration.",
      ).optional(),
      includedMimeTypes: z.array(
        z.enum([
          "VIDEO_MIME_TYPE_UNSPECIFIED",
          "VIDEO_MIME_TYPE_THREEGPP",
          "VIDEO_MIME_TYPE_APPLICATION_MPEGURL",
          "VIDEO_MIME_TYPE_MP4",
          "VIDEO_MIME_TYPE_APPLICATION_MPEGDASH",
          "VIDEO_MIME_TYPE_APPLICATION_JAVASCRIPT",
          "VIDEO_MIME_TYPE_WEBM",
        ]),
      ).describe(
        "Optional. The list of targeted video mime types using the IANA published MIME type strings (https://www.iana.org/assignments/media-types/media-types.xhtml). If empty, inventory will be targeted regardless of video mime type.",
      ).optional(),
      includedPlaybackMethods: z.array(
        z.enum([
          "PLAYBACK_METHOD_UNSPECIFIED",
          "PLAYBACK_METHOD_AUTO_PLAY_SOUND_ON",
          "PLAYBACK_METHOD_AUTO_PLAY_SOUND_OFF",
          "PLAYBACK_METHOD_CLICK_TO_PLAY",
        ]),
      ).describe(
        "Optional. The list of targeted video playback methods. If empty, inventory will be targeted regardless of video playback method.",
      ).optional(),
      includedPlayerSizeTargeting: z.object({
        minimumHeight: z.string().describe(
          "Required. The minimum height of the video player in pixels.",
        ).optional(),
        minimumWidth: z.string().describe(
          "Required. The minimum width of the video player in pixels.",
        ).optional(),
      }).describe(
        "Optional. The targeted video player size. If unset, inventory will be targeted regardless of video player size.",
      ).optional(),
      includedPositionTypes: z.array(
        z.enum([
          "POSITION_TYPE_UNSPECIFIED",
          "POSITION_TYPE_MIDROLL",
          "POSITION_TYPE_POSTROLL",
          "POSITION_TYPE_PREROLL",
        ]),
      ).describe(
        "Optional. The targeted video ad position types. If empty, inventory will be targeted regardless of video ad position type.",
      ).optional(),
      minimumPredictedCompletionRatePercentage: z.string().describe(
        "Optional. The targeted minimum predicted completion rate percentage. This value must be a multiple of 10 between 10 and 90 (inclusive). For example, 10 is valid, but 0, 15, and 100 are not. A value of 10 means that the configuration will only match adslots for which we predict at least 10% completion rate. An unset value indicates inventory will be targeted regardless of predicted completion rate.",
      ).optional(),
      plcmtTargeting: z.object({
        selectionType: z.enum([
          "SELECTION_TYPE_UNSPECIFIED",
          "SELECTION_TYPE_INCLUDE",
          "SELECTION_TYPE_EXCLUDE",
        ]).describe(
          "Required. The selection type for the list of video plcmts.",
        ).optional(),
        videoPlcmtTypes: z.array(
          z.enum([
            "VIDEO_PLCMT_TYPE_UNSPECIFIED",
            "INSTREAM",
            "ACCOMPANYING_CONTENT",
            "INTERSTITIAL",
            "NO_CONTENT",
          ]),
        ).describe(
          "Required. The list of targeted video plcmts types. If empty, inventory will be targeted regardless of video plcmt type.",
        ).optional(),
      }).describe(
        "Optional. The targeted video plcmt types. If unset, inventory will be targeted regardless of video plcmt type.",
      ).optional(),
    }).describe("Optional. Video specific targeting criteria.").optional(),
  }).describe("Optional. Targeting criteria for the curated package.")
    .optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Curation Partners Curators.CuratedPackages. Registered at `@swamp/gcp/curationpartners/curators-curatedpackages`. */
export const model = {
  type: "@swamp/gcp/curationpartners/curators-curatedpackages",
  version: "2026.10.13.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a curated package of inventory created and managed by a Curator.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a curatedPackages",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accessSettings"] !== undefined) {
          body["accessSettings"] = g["accessSettings"];
        }
        if (g["curationFeeVisibility"] !== undefined) {
          body["curationFeeVisibility"] = g["curationFeeVisibility"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["feeCpm"] !== undefined) body["feeCpm"] = g["feeCpm"];
        if (g["floorPriceCpm"] !== undefined) {
          body["floorPriceCpm"] = g["floorPriceCpm"];
        }
        if (g["millipercentOfMediaFee"] !== undefined) {
          body["millipercentOfMediaFee"] = g["millipercentOfMediaFee"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["targeting"] !== undefined) body["targeting"] = g["targeting"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a curatedPackages",
      arguments: z.object({
        identifier: z.string().describe("The name of the curatedPackages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update curatedPackages attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific curatedPackages by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["accessSettings"] !== undefined) {
          body["accessSettings"] = g["accessSettings"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["feeCpm"] !== undefined) body["feeCpm"] = g["feeCpm"];
        if (g["floorPriceCpm"] !== undefined) {
          body["floorPriceCpm"] = g["floorPriceCpm"];
        }
        if (g["millipercentOfMediaFee"] !== undefined) {
          body["millipercentOfMediaFee"] = g["millipercentOfMediaFee"];
        }
        if (g["targeting"] !== undefined) body["targeting"] = g["targeting"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
    sync: {
      description: "Sync curatedPackages state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific curatedPackages by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List curatedPackages resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Optional query string using the [Cloud API list filtering syntax](/authorized-buyers/apis/guides/list-filters). Supported columns for filtering are: * displayName * createTime * updateTime * state * feeCpm.currencyCode * feeCpm.units * feeCpm.nanos * floorPriceCpm.currencyCode * floorPriceCpm.units * floorPriceCpm.nanos",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. The server may return fewer results than requested. Max allowed page size is 500. If unspecified, the server will default to 500.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "curatedPackages",
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
    activate: {
      description: "activate",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "curationpartners.curators.curatedPackages.activate",
            "path": "v1/{+name}:activate",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    deactivate: {
      description: "deactivate",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "curationpartners.curators.curatedPackages.deactivate",
            "path": "v1/{+name}:deactivate",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
