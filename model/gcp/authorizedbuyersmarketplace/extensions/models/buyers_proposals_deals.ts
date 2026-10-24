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

// Auto-generated extension model for @swamp/gcp/authorizedbuyersmarketplace/buyers-proposals-deals
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Authorized Buyers Marketplace Buyers.Proposals.Deals.
 *
 * A deal represents a segment of inventory for displaying ads that contains the terms and targeting information that is used for serving as well as the deal stats and status. Note: A proposal may contain multiple deals.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  return `${parent}/deals/${shortName}`;
}

const BASE_URL = "https://authorizedbuyersmarketplace.googleapis.com/";

const GET_CONFIG = {
  "id": "authorizedbuyersmarketplace.buyers.proposals.deals.get",
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

const PATCH_CONFIG = {
  "id": "authorizedbuyersmarketplace.buyers.proposals.deals.patch",
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
  "id": "authorizedbuyersmarketplace.buyers.proposals.deals.list",
  "path": "v1/{+parent}/deals",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  "https://www.googleapis.com/auth/authorized-buyers-marketplace",
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
  billedBuyer: z.string().describe(
    "Output only. When the client field is populated, this field refers to the buyer who creates and manages the client buyer and gets billed on behalf of the client buyer; when the buyer field is populated, this field is the same value as buyer; when the deal belongs to a media planner account, this field will be empty. Format: `buyers/{buyerAccountId}`",
  ).optional(),
  buyer: z.string().describe(
    "Output only. Refers to a buyer in Real-time Bidding API's Buyer resource. Format: `buyers/{buyerAccountId}`",
  ).optional(),
  buyerPermissionType: z.enum([
    "BUYER_PERMISSION_TYPE_UNSPECIFIED",
    "NEGOTIATOR_ONLY",
    "BIDDER",
  ]).describe("Output only. The buyer permission type of the deal.").optional(),
  client: z.string().describe(
    "Output only. Refers to a Client. Format: `buyers/{buyerAccountId}/clients/{clientAccountid}`",
  ).optional(),
  createTime: z.string().describe("Output only. The time of the deal creation.")
    .optional(),
  creativeRequirements: z.object({
    creativeFormat: z.enum([
      "CREATIVE_FORMAT_UNSPECIFIED",
      "DISPLAY",
      "VIDEO",
      "AUDIO",
    ]).describe(
      "Output only. The format of the creative, only applicable for programmatic guaranteed and preferred deals.",
    ).optional(),
    creativePreApprovalPolicy: z.enum([
      "CREATIVE_PRE_APPROVAL_POLICY_UNSPECIFIED",
      "SELLER_PRE_APPROVAL_REQUIRED",
      "SELLER_PRE_APPROVAL_NOT_REQUIRED",
    ]).describe("Output only. Specifies the creative pre-approval policy.")
      .optional(),
    creativeSafeFrameCompatibility: z.enum([
      "CREATIVE_SAFE_FRAME_COMPATIBILITY_UNSPECIFIED",
      "COMPATIBLE",
      "INCOMPATIBLE",
    ]).describe(
      "Output only. Specifies whether the creative is safeFrame compatible.",
    ).optional(),
    maxAdDurationMs: z.string().describe(
      "Output only. The max duration of the video creative in milliseconds. only applicable for deals with video creatives.",
    ).optional(),
    programmaticCreativeSource: z.enum([
      "PROGRAMMATIC_CREATIVE_SOURCE_UNSPECIFIED",
      "ADVERTISER",
      "PUBLISHER",
    ]).describe(
      "Output only. Specifies the creative source for programmatic deals. PUBLISHER means creative is provided by seller and ADVERTISER means creative is provided by the buyer.",
    ).optional(),
    skippableAdType: z.enum([
      "SKIPPABLE_AD_TYPE_UNSPECIFIED",
      "SKIPPABLE",
      "INSTREAM_SELECT",
      "NOT_SKIPPABLE",
      "ANY",
    ]).describe(
      "Output only. Skippable video ads allow viewers to skip ads after 5 seconds. Only applicable for deals with video creatives.",
    ).optional(),
  }).describe("Output only. Metadata about the creatives of this deal.")
    .optional(),
  dealType: z.enum([
    "DEAL_TYPE_UNSPECIFIED",
    "PREFERRED_DEAL",
    "PRIVATE_AUCTION",
    "PROGRAMMATIC_GUARANTEED",
  ]).describe("Output only. Type of deal.").optional(),
  deliveryControl: z.object({
    companionDeliveryType: z.enum([
      "COMPANION_DELIVERY_TYPE_UNSPECIFIED",
      "DELIVERY_OPTIONAL",
      "DELIVERY_AT_LEAST_ONE",
      "DELIVERY_ALL",
    ]).describe(
      "Output only. Specifies roadblocking in a main companion lineitem.",
    ).optional(),
    creativeRotationType: z.enum([
      "CREATIVE_ROTATION_TYPE_UNSPECIFIED",
      "ROTATION_EVEN",
      "ROTATION_OPTIMIZED",
      "ROTATION_MANUAL",
      "ROTATION_SEQUENTIAL",
    ]).describe(
      "Output only. Specifies strategy to use for selecting a creative when multiple creatives of the same size are available.",
    ).optional(),
    deliveryRateType: z.enum([
      "DELIVERY_RATE_TYPE_UNSPECIFIED",
      "EVENLY",
      "FRONT_LOADED",
      "AS_FAST_AS_POSSIBLE",
    ]).describe(
      "Output only. Specifies how the impression delivery will be paced.",
    ).optional(),
    frequencyCap: z.array(z.object({
      maxImpressions: z.number().int().describe(
        "The maximum number of impressions that can be served to a user within the specified time period.",
      ).optional(),
      timeUnitType: z.enum([
        "TIME_UNIT_TYPE_UNSPECIFIED",
        "MINUTE",
        "HOUR",
        "DAY",
        "WEEK",
        "MONTH",
        "LIFETIME",
        "POD",
        "STREAM",
      ]).describe(
        "The time unit. Along with num_time_units defines the amount of time over which impressions per user are counted and capped.",
      ).optional(),
      timeUnitsCount: z.number().int().describe(
        "The amount of time, in the units specified by time_unit_type. Defines the amount of time over which impressions per user are counted and capped.",
      ).optional(),
    })).describe(
      "Output only. Specifies any frequency caps. Cannot be filtered within ListDealsRequest.",
    ).optional(),
    roadblockingType: z.enum([
      "ROADBLOCKING_TYPE_UNSPECIFIED",
      "ONLY_ONE",
      "ONE_OR_MORE",
      "AS_MANY_AS_POSSIBLE",
      "ALL_ROADBLOCK",
      "CREATIVE_SET",
    ]).describe(
      "Output only. Specifies the roadblocking type in display creatives.",
    ).optional(),
  }).describe("Output only. Specifies the pacing set by the publisher.")
    .optional(),
  description: z.string().describe(
    "Output only. Free text description for the deal terms.",
  ).optional(),
  displayName: z.string().describe(
    "Output only. The name of the deal. Maximum length of 255 unicode characters is allowed. Control characters are not allowed. Buyers cannot update this field. Note: Not to be confused with name, which is a unique identifier of the deal.",
  ).optional(),
  eligibleSeatIds: z.array(z.string()).describe(
    "Output only. If set, this field contains the list of DSP specific seat ids set by media planners that are eligible to transact on this deal. The seat ID is in the calling DSP's namespace.",
  ).optional(),
  estimatedGrossSpend: z.object({
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
    "Specified by buyers in request for proposal (RFP) to notify publisher the total estimated spend for the proposal. Publishers will receive this information and send back proposed deals accordingly.",
  ).optional(),
  flightEndTime: z.string().describe(
    "Proposed flight end time of the deal. This will generally be stored in a granularity of a second. A value is not necessary for Private Auction deals.",
  ).optional(),
  flightStartTime: z.string().describe(
    "Proposed flight start time of the deal. This will generally be stored in the granularity of one second since deal serving starts at seconds boundary. Any time specified with more granularity (for example, in milliseconds) will be truncated towards the start of time in seconds.",
  ).optional(),
  mediaPlanner: z.object({
    accountId: z.string().describe(
      "Output only. Account ID of the media planner.",
    ).optional(),
    ancestorNames: z.array(z.string()).describe(
      "Output only. The ancestor names of the media planner. Format: `mediaPlanners/{mediaPlannerAccountId}` Can be used to filter the response of the mediaPlanners.list method.",
    ).optional(),
    displayName: z.string().describe(
      "Output only. The display name of the media planner. Can be used to filter the response of the mediaPlanners.list method.",
    ).optional(),
    name: z.string().describe(
      "Identifier. The unique resource name of the media planner. Format: `mediaPlanners/{mediaPlannerAccountId}` Can be used to filter the response of the mediaPlanners.list method.",
    ).optional(),
  }).describe(
    "Output only. Refers to a buyer in Real-time Bidding API's Buyer resource. This field represents a media planner (For example, agency or big advertiser).",
  ).optional(),
  name: z.string().describe(
    "Immutable. The unique identifier of the deal. Auto-generated by the server when a deal is created. Format: buyers/{accountId}/proposals/{proposalId}/deals/{dealId}",
  ).optional(),
  preferredDealTerms: z.object({
    fixedPrice: z.object({
      amount: z.object({
        currencyCode: z.string().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.number().int().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.string().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("The actual price with currency specified.").optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "CPM", "CPD"]).describe(
        "The pricing type for the deal.",
      ).optional(),
    }).describe("Fixed price for the deal.").optional(),
  }).describe("The terms for preferred deals.").optional(),
  privateAuctionTerms: z.object({
    floorPrice: z.object({
      amount: z.object({
        currencyCode: z.string().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.number().int().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.string().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("The actual price with currency specified.").optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "CPM", "CPD"]).describe(
        "The pricing type for the deal.",
      ).optional(),
    }).describe(
      "The minimum price buyer has to bid to compete in the private auction.",
    ).optional(),
    openAuctionAllowed: z.boolean().describe(
      "Output only. True if open auction buyers are allowed to compete with invited buyers in this private auction.",
    ).optional(),
  }).describe("The terms for private auction deals.").optional(),
  programmaticGuaranteedTerms: z.object({
    fixedPrice: z.object({
      amount: z.object({
        currencyCode: z.string().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.number().int().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.string().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("The actual price with currency specified.").optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "CPM", "CPD"]).describe(
        "The pricing type for the deal.",
      ).optional(),
    }).describe("Fixed price for the deal.").optional(),
    guaranteedLooks: z.string().describe(
      "Count of guaranteed looks. For CPD deals, buyer changes to guaranteed_looks will be ignored.",
    ).optional(),
    impressionCap: z.string().describe(
      "The lifetime impression cap for CPM Sponsorship deals. Deal will stop serving when cap is reached.",
    ).optional(),
    minimumDailyLooks: z.string().describe(
      "Daily minimum looks for CPD deal types. For CPD deals, buyer should negotiate on this field instead of guaranteed_looks.",
    ).optional(),
    percentShareOfVoice: z.string().describe(
      "For sponsorship deals, this is the percentage of the seller's eligible impressions that the deal will serve until the cap is reached. Valid value is within range 0~100.",
    ).optional(),
    reservationType: z.enum([
      "RESERVATION_TYPE_UNSPECIFIED",
      "STANDARD",
      "SPONSORSHIP",
    ]).describe(
      "The reservation type for a Programmatic Guaranteed deal. This indicates whether the number of impressions is fixed, or a percent of available impressions. If not specified, the default reservation type is STANDARD.",
    ).optional(),
  }).describe("The terms for programmatic guaranteed deals.").optional(),
  proposalRevision: z.string().describe(
    "Output only. The revision number for the proposal and is the same value as proposal.proposal_revision. Each update to deal causes the proposal revision number to auto-increment. The buyer keeps track of the last revision number they know of and pass it in when making an update. If the head revision number on the server has since incremented, then an ABORTED error is returned during the update operation to let the buyer know that a subsequent update was made.",
  ).optional(),
  publisherProfile: z.string().describe(
    "Immutable. Reference to the seller on the deal. Format: `buyers/{buyerAccountId}/publisherProfiles/{publisherProfileId}`",
  ).optional(),
  sellerTimeZone: z.object({
    id: z.string().describe(
      'IANA Time Zone Database time zone. For example "America/New_York".',
    ).optional(),
    version: z.string().describe(
      'Optional. IANA Time Zone Database version number. For example "2019a".',
    ).optional(),
  }).describe(
    "Output only. Time zone of the seller used to mark the boundaries of a day for daypart targeting and CPD billing.",
  ).optional(),
  targeting: z.object({
    daypartTargeting: z.object({
      dayParts: z.array(z.object({
        dayOfWeek: z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]).describe("Day of week for the period.").optional(),
        endTime: z.object({
          hours: z.unknown().describe(
            'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.unknown().describe(
            "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
          ).optional(),
          nanos: z.unknown().describe(
            "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
          ).optional(),
          seconds: z.unknown().describe(
            "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
        }).describe(
          "Hours in 24 hour time between 0 and 24, inclusive. Note: 24 is logically equivalent to 0, but is supported since in some cases there may need to be differentiation made between midnight on one day and midnight on the next day. Accepted values for minutes are [0, 15, 30, 45]. 0 is the only acceptable minute value for hour 24. Seconds and nanos are ignored.",
        ).optional(),
        startTime: z.object({
          hours: z.unknown().describe(
            'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.unknown().describe(
            "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
          ).optional(),
          nanos: z.unknown().describe(
            "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
          ).optional(),
          seconds: z.unknown().describe(
            "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
        }).describe(
          "Hours in 24 hour time between 0 and 24, inclusive. Note: 24 is logically equivalent to 0, but is supported since in some cases there may need to be differentiation made between midnight on one day and midnight on the next day. Accepted values for minutes are [0, 15, 30, 45]. 0 is the only acceptable minute value for hour 24. Seconds and nanos are ignored.",
        ).optional(),
      })).describe("The targeted weekdays and times").optional(),
      timeZoneType: z.enum(["TIME_ZONE_TYPE_UNSPECIFIED", "SELLER", "USER"])
        .describe("The time zone type of the day parts").optional(),
    }).describe("Daypart targeting information.").optional(),
    excludedSensitiveCategoryIds: z.array(z.string()).describe(
      "Output only. The sensitive content category label IDs excluded. Refer to this file https://storage.googleapis.com/adx-rtb-dictionaries/content-labels.txt for category IDs.",
    ).optional(),
    geoTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be excluded.",
      ).optional(),
      targetedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be included.",
      ).optional(),
    }).describe("Output only. Geo criteria IDs to be included/excluded.")
      .optional(),
    inventorySizeTargeting: z.object({
      excludedInventorySizes: z.array(z.object({
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
      })).describe("A list of inventory sizes to be excluded.").optional(),
      targetedInventorySizes: z.array(z.object({
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
      })).describe("A list of inventory sizes to be included.").optional(),
    }).describe("Output only. Inventory sizes to be included/excluded.")
      .optional(),
    inventoryTypeTargeting: z.object({
      inventoryTypes: z.array(
        z.enum([
          "INVENTORY_TYPE_UNSPECIFIED",
          "BROWSER",
          "MOBILE_APP",
          "VIDEO_PLAYER",
        ]),
      ).describe("The list of targeted inventory types for the bid request.")
        .optional(),
    }).describe("Output only. Inventory type targeting information.")
      .optional(),
    placementTargeting: z.object({
      mobileApplicationTargeting: z.object({
        firstPartyTargeting: z.object({
          excludedAppIds: z.array(z.unknown()).describe(
            "A list of application IDs to be excluded.",
          ).optional(),
          targetedAppIds: z.array(z.unknown()).describe(
            "A list of application IDs to be included.",
          ).optional(),
        }).describe(
          "Publisher owned apps to be targeted or excluded by the publisher to display the ads in.",
        ).optional(),
      }).describe(
        "Mobile application targeting information in a deal. This doesn't apply to Auction Packages.",
      ).optional(),
      uriTargeting: z.object({
        excludedUris: z.array(z.string()).describe(
          "A list of URLs to be excluded.",
        ).optional(),
        targetedUris: z.array(z.string()).describe(
          "A list of URLs to be included.",
        ).optional(),
      }).describe("URLs to be included/excluded.").optional(),
    }).describe(
      "Output only. Placement targeting information, for example, URL, mobile applications.",
    ).optional(),
    technologyTargeting: z.object({
      deviceCapabilityTargeting: z.object({
        excludedCriteriaIds: z.array(z.string()).describe(
          "A list of numeric IDs to be excluded.",
        ).optional(),
        targetedCriteriaIds: z.array(z.string()).describe(
          "A list of numeric IDs to be included.",
        ).optional(),
      }).describe("IDs of device capabilities to be included/excluded.")
        .optional(),
      deviceCategoryTargeting: z.object({
        excludedCriteriaIds: z.array(z.string()).describe(
          "A list of numeric IDs to be excluded.",
        ).optional(),
        targetedCriteriaIds: z.array(z.string()).describe(
          "A list of numeric IDs to be included.",
        ).optional(),
      }).describe("IDs of device categories to be included/excluded.")
        .optional(),
      operatingSystemTargeting: z.object({
        operatingSystemCriteria: z.object({
          excludedCriteriaIds: z.array(z.unknown()).describe(
            "A list of numeric IDs to be excluded.",
          ).optional(),
          targetedCriteriaIds: z.array(z.unknown()).describe(
            "A list of numeric IDs to be included.",
          ).optional(),
        }).describe("IDs of operating systems to be included/excluded.")
          .optional(),
        operatingSystemVersionCriteria: z.object({
          excludedCriteriaIds: z.array(z.unknown()).describe(
            "A list of numeric IDs to be excluded.",
          ).optional(),
          targetedCriteriaIds: z.array(z.unknown()).describe(
            "A list of numeric IDs to be included.",
          ).optional(),
        }).describe("IDs of operating system versions to be included/excluded.")
          .optional(),
      }).describe("Operating system related targeting information.").optional(),
    }).describe(
      "Output only. Technology targeting information, for example, operating system, device category.",
    ).optional(),
    userListTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be excluded.",
      ).optional(),
      targetedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be included.",
      ).optional(),
    }).describe(
      "Buyer user list targeting information. User lists can be uploaded using https://developers.google.com/authorized-buyers/rtb/bulk-uploader.",
    ).optional(),
    verticalTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be excluded.",
      ).optional(),
      targetedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be included.",
      ).optional(),
    }).describe(
      "Output only. The verticals included or excluded as defined in https://developers.google.com/authorized-buyers/rtb/downloads/publisher-verticals",
    ).optional(),
    videoTargeting: z.object({
      excludedPositionTypes: z.array(
        z.enum(["POSITION_TYPE_UNSPECIFIED", "PREROLL", "MIDROLL", "POSTROLL"]),
      ).describe(
        "A list of video positions to be excluded. When this field is populated, the targeted_position_types field must be empty.",
      ).optional(),
      targetedPositionTypes: z.array(
        z.enum(["POSITION_TYPE_UNSPECIFIED", "PREROLL", "MIDROLL", "POSTROLL"]),
      ).describe(
        "A list of video positions to be included. When this field is populated, the excluded_position_types field must be empty.",
      ).optional(),
    }).describe("Output only. Video targeting information.").optional(),
  }).describe(
    "Specifies the subset of inventory targeted by the deal. Can be updated by the buyer before the deal is finalized.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time when the deal was last updated.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  billedBuyer: z.string().optional(),
  buyer: z.string().optional(),
  buyerPermissionType: z.string().optional(),
  client: z.string().optional(),
  createTime: z.string().optional(),
  creativeRequirements: z.object({
    creativeFormat: z.string(),
    creativePreApprovalPolicy: z.string(),
    creativeSafeFrameCompatibility: z.string(),
    maxAdDurationMs: z.string(),
    programmaticCreativeSource: z.string(),
    skippableAdType: z.string(),
  }).optional(),
  dealType: z.string().optional(),
  deliveryControl: z.object({
    companionDeliveryType: z.string(),
    creativeRotationType: z.string(),
    deliveryRateType: z.string(),
    frequencyCap: z.array(z.object({
      maxImpressions: z.number(),
      timeUnitType: z.string(),
      timeUnitsCount: z.number(),
    })),
    roadblockingType: z.string(),
  }).optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  eligibleSeatIds: z.array(z.string()).optional(),
  estimatedGrossSpend: z.object({
    currencyCode: z.string(),
    nanos: z.number(),
    units: z.string(),
  }).optional(),
  flightEndTime: z.string().optional(),
  flightStartTime: z.string().optional(),
  mediaPlanner: z.object({
    accountId: z.string(),
    ancestorNames: z.array(z.string()),
    displayName: z.string(),
    name: z.string(),
  }).optional(),
  name: z.string(),
  preferredDealTerms: z.object({
    fixedPrice: z.object({
      amount: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      type: z.string(),
    }),
  }).optional(),
  privateAuctionTerms: z.object({
    floorPrice: z.object({
      amount: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      type: z.string(),
    }),
    openAuctionAllowed: z.boolean(),
  }).optional(),
  programmaticGuaranteedTerms: z.object({
    fixedPrice: z.object({
      amount: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      type: z.string(),
    }),
    guaranteedLooks: z.string(),
    impressionCap: z.string(),
    minimumDailyLooks: z.string(),
    percentShareOfVoice: z.string(),
    reservationType: z.string(),
  }).optional(),
  proposalRevision: z.string().optional(),
  publisherProfile: z.string().optional(),
  sellerTimeZone: z.object({
    id: z.string(),
    version: z.string(),
  }).optional(),
  targeting: z.object({
    daypartTargeting: z.object({
      dayParts: z.array(z.object({
        dayOfWeek: z.string(),
        endTime: z.object({
          hours: z.unknown(),
          minutes: z.unknown(),
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        startTime: z.object({
          hours: z.unknown(),
          minutes: z.unknown(),
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
      })),
      timeZoneType: z.string(),
    }),
    excludedSensitiveCategoryIds: z.array(z.string()),
    geoTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()),
      targetedCriteriaIds: z.array(z.string()),
    }),
    inventorySizeTargeting: z.object({
      excludedInventorySizes: z.array(z.object({
        height: z.string(),
        type: z.string(),
        width: z.string(),
      })),
      targetedInventorySizes: z.array(z.object({
        height: z.string(),
        type: z.string(),
        width: z.string(),
      })),
    }),
    inventoryTypeTargeting: z.object({
      inventoryTypes: z.array(z.string()),
    }),
    placementTargeting: z.object({
      mobileApplicationTargeting: z.object({
        firstPartyTargeting: z.object({
          excludedAppIds: z.array(z.unknown()),
          targetedAppIds: z.array(z.unknown()),
        }),
      }),
      uriTargeting: z.object({
        excludedUris: z.array(z.string()),
        targetedUris: z.array(z.string()),
      }),
    }),
    technologyTargeting: z.object({
      deviceCapabilityTargeting: z.object({
        excludedCriteriaIds: z.array(z.string()),
        targetedCriteriaIds: z.array(z.string()),
      }),
      deviceCategoryTargeting: z.object({
        excludedCriteriaIds: z.array(z.string()),
        targetedCriteriaIds: z.array(z.string()),
      }),
      operatingSystemTargeting: z.object({
        operatingSystemCriteria: z.object({
          excludedCriteriaIds: z.array(z.unknown()),
          targetedCriteriaIds: z.array(z.unknown()),
        }),
        operatingSystemVersionCriteria: z.object({
          excludedCriteriaIds: z.array(z.unknown()),
          targetedCriteriaIds: z.array(z.unknown()),
        }),
      }),
    }),
    userListTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()),
      targetedCriteriaIds: z.array(z.string()),
    }),
    verticalTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()),
      targetedCriteriaIds: z.array(z.string()),
    }),
    videoTargeting: z.object({
      excludedPositionTypes: z.array(z.string()),
      targetedPositionTypes: z.array(z.string()),
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
  billedBuyer: z.string().describe(
    "Output only. When the client field is populated, this field refers to the buyer who creates and manages the client buyer and gets billed on behalf of the client buyer; when the buyer field is populated, this field is the same value as buyer; when the deal belongs to a media planner account, this field will be empty. Format: `buyers/{buyerAccountId}`",
  ).optional(),
  buyer: z.string().describe(
    "Output only. Refers to a buyer in Real-time Bidding API's Buyer resource. Format: `buyers/{buyerAccountId}`",
  ).optional(),
  buyerPermissionType: z.enum([
    "BUYER_PERMISSION_TYPE_UNSPECIFIED",
    "NEGOTIATOR_ONLY",
    "BIDDER",
  ]).describe("Output only. The buyer permission type of the deal.").optional(),
  client: z.string().describe(
    "Output only. Refers to a Client. Format: `buyers/{buyerAccountId}/clients/{clientAccountid}`",
  ).optional(),
  createTime: z.string().describe("Output only. The time of the deal creation.")
    .optional(),
  creativeRequirements: z.object({
    creativeFormat: z.enum([
      "CREATIVE_FORMAT_UNSPECIFIED",
      "DISPLAY",
      "VIDEO",
      "AUDIO",
    ]).describe(
      "Output only. The format of the creative, only applicable for programmatic guaranteed and preferred deals.",
    ).optional(),
    creativePreApprovalPolicy: z.enum([
      "CREATIVE_PRE_APPROVAL_POLICY_UNSPECIFIED",
      "SELLER_PRE_APPROVAL_REQUIRED",
      "SELLER_PRE_APPROVAL_NOT_REQUIRED",
    ]).describe("Output only. Specifies the creative pre-approval policy.")
      .optional(),
    creativeSafeFrameCompatibility: z.enum([
      "CREATIVE_SAFE_FRAME_COMPATIBILITY_UNSPECIFIED",
      "COMPATIBLE",
      "INCOMPATIBLE",
    ]).describe(
      "Output only. Specifies whether the creative is safeFrame compatible.",
    ).optional(),
    maxAdDurationMs: z.string().describe(
      "Output only. The max duration of the video creative in milliseconds. only applicable for deals with video creatives.",
    ).optional(),
    programmaticCreativeSource: z.enum([
      "PROGRAMMATIC_CREATIVE_SOURCE_UNSPECIFIED",
      "ADVERTISER",
      "PUBLISHER",
    ]).describe(
      "Output only. Specifies the creative source for programmatic deals. PUBLISHER means creative is provided by seller and ADVERTISER means creative is provided by the buyer.",
    ).optional(),
    skippableAdType: z.enum([
      "SKIPPABLE_AD_TYPE_UNSPECIFIED",
      "SKIPPABLE",
      "INSTREAM_SELECT",
      "NOT_SKIPPABLE",
      "ANY",
    ]).describe(
      "Output only. Skippable video ads allow viewers to skip ads after 5 seconds. Only applicable for deals with video creatives.",
    ).optional(),
  }).describe("Output only. Metadata about the creatives of this deal.")
    .optional(),
  dealType: z.enum([
    "DEAL_TYPE_UNSPECIFIED",
    "PREFERRED_DEAL",
    "PRIVATE_AUCTION",
    "PROGRAMMATIC_GUARANTEED",
  ]).describe("Output only. Type of deal.").optional(),
  deliveryControl: z.object({
    companionDeliveryType: z.enum([
      "COMPANION_DELIVERY_TYPE_UNSPECIFIED",
      "DELIVERY_OPTIONAL",
      "DELIVERY_AT_LEAST_ONE",
      "DELIVERY_ALL",
    ]).describe(
      "Output only. Specifies roadblocking in a main companion lineitem.",
    ).optional(),
    creativeRotationType: z.enum([
      "CREATIVE_ROTATION_TYPE_UNSPECIFIED",
      "ROTATION_EVEN",
      "ROTATION_OPTIMIZED",
      "ROTATION_MANUAL",
      "ROTATION_SEQUENTIAL",
    ]).describe(
      "Output only. Specifies strategy to use for selecting a creative when multiple creatives of the same size are available.",
    ).optional(),
    deliveryRateType: z.enum([
      "DELIVERY_RATE_TYPE_UNSPECIFIED",
      "EVENLY",
      "FRONT_LOADED",
      "AS_FAST_AS_POSSIBLE",
    ]).describe(
      "Output only. Specifies how the impression delivery will be paced.",
    ).optional(),
    frequencyCap: z.array(z.object({
      maxImpressions: z.number().int().describe(
        "The maximum number of impressions that can be served to a user within the specified time period.",
      ).optional(),
      timeUnitType: z.enum([
        "TIME_UNIT_TYPE_UNSPECIFIED",
        "MINUTE",
        "HOUR",
        "DAY",
        "WEEK",
        "MONTH",
        "LIFETIME",
        "POD",
        "STREAM",
      ]).describe(
        "The time unit. Along with num_time_units defines the amount of time over which impressions per user are counted and capped.",
      ).optional(),
      timeUnitsCount: z.number().int().describe(
        "The amount of time, in the units specified by time_unit_type. Defines the amount of time over which impressions per user are counted and capped.",
      ).optional(),
    })).describe(
      "Output only. Specifies any frequency caps. Cannot be filtered within ListDealsRequest.",
    ).optional(),
    roadblockingType: z.enum([
      "ROADBLOCKING_TYPE_UNSPECIFIED",
      "ONLY_ONE",
      "ONE_OR_MORE",
      "AS_MANY_AS_POSSIBLE",
      "ALL_ROADBLOCK",
      "CREATIVE_SET",
    ]).describe(
      "Output only. Specifies the roadblocking type in display creatives.",
    ).optional(),
  }).describe("Output only. Specifies the pacing set by the publisher.")
    .optional(),
  description: z.string().describe(
    "Output only. Free text description for the deal terms.",
  ).optional(),
  displayName: z.string().describe(
    "Output only. The name of the deal. Maximum length of 255 unicode characters is allowed. Control characters are not allowed. Buyers cannot update this field. Note: Not to be confused with name, which is a unique identifier of the deal.",
  ).optional(),
  eligibleSeatIds: z.array(z.string()).describe(
    "Output only. If set, this field contains the list of DSP specific seat ids set by media planners that are eligible to transact on this deal. The seat ID is in the calling DSP's namespace.",
  ).optional(),
  estimatedGrossSpend: z.object({
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
    "Specified by buyers in request for proposal (RFP) to notify publisher the total estimated spend for the proposal. Publishers will receive this information and send back proposed deals accordingly.",
  ).optional(),
  flightEndTime: z.string().describe(
    "Proposed flight end time of the deal. This will generally be stored in a granularity of a second. A value is not necessary for Private Auction deals.",
  ).optional(),
  flightStartTime: z.string().describe(
    "Proposed flight start time of the deal. This will generally be stored in the granularity of one second since deal serving starts at seconds boundary. Any time specified with more granularity (for example, in milliseconds) will be truncated towards the start of time in seconds.",
  ).optional(),
  mediaPlanner: z.object({
    accountId: z.string().describe(
      "Output only. Account ID of the media planner.",
    ).optional(),
    ancestorNames: z.array(z.string()).describe(
      "Output only. The ancestor names of the media planner. Format: `mediaPlanners/{mediaPlannerAccountId}` Can be used to filter the response of the mediaPlanners.list method.",
    ).optional(),
    displayName: z.string().describe(
      "Output only. The display name of the media planner. Can be used to filter the response of the mediaPlanners.list method.",
    ).optional(),
    name: z.string().describe(
      "Identifier. The unique resource name of the media planner. Format: `mediaPlanners/{mediaPlannerAccountId}` Can be used to filter the response of the mediaPlanners.list method.",
    ).optional(),
  }).describe(
    "Output only. Refers to a buyer in Real-time Bidding API's Buyer resource. This field represents a media planner (For example, agency or big advertiser).",
  ).optional(),
  name: z.string().describe(
    "Immutable. The unique identifier of the deal. Auto-generated by the server when a deal is created. Format: buyers/{accountId}/proposals/{proposalId}/deals/{dealId}",
  ).optional(),
  preferredDealTerms: z.object({
    fixedPrice: z.object({
      amount: z.object({
        currencyCode: z.string().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.number().int().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.string().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("The actual price with currency specified.").optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "CPM", "CPD"]).describe(
        "The pricing type for the deal.",
      ).optional(),
    }).describe("Fixed price for the deal.").optional(),
  }).describe("The terms for preferred deals.").optional(),
  privateAuctionTerms: z.object({
    floorPrice: z.object({
      amount: z.object({
        currencyCode: z.string().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.number().int().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.string().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("The actual price with currency specified.").optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "CPM", "CPD"]).describe(
        "The pricing type for the deal.",
      ).optional(),
    }).describe(
      "The minimum price buyer has to bid to compete in the private auction.",
    ).optional(),
    openAuctionAllowed: z.boolean().describe(
      "Output only. True if open auction buyers are allowed to compete with invited buyers in this private auction.",
    ).optional(),
  }).describe("The terms for private auction deals.").optional(),
  programmaticGuaranteedTerms: z.object({
    fixedPrice: z.object({
      amount: z.object({
        currencyCode: z.string().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.number().int().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.string().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("The actual price with currency specified.").optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "CPM", "CPD"]).describe(
        "The pricing type for the deal.",
      ).optional(),
    }).describe("Fixed price for the deal.").optional(),
    guaranteedLooks: z.string().describe(
      "Count of guaranteed looks. For CPD deals, buyer changes to guaranteed_looks will be ignored.",
    ).optional(),
    impressionCap: z.string().describe(
      "The lifetime impression cap for CPM Sponsorship deals. Deal will stop serving when cap is reached.",
    ).optional(),
    minimumDailyLooks: z.string().describe(
      "Daily minimum looks for CPD deal types. For CPD deals, buyer should negotiate on this field instead of guaranteed_looks.",
    ).optional(),
    percentShareOfVoice: z.string().describe(
      "For sponsorship deals, this is the percentage of the seller's eligible impressions that the deal will serve until the cap is reached. Valid value is within range 0~100.",
    ).optional(),
    reservationType: z.enum([
      "RESERVATION_TYPE_UNSPECIFIED",
      "STANDARD",
      "SPONSORSHIP",
    ]).describe(
      "The reservation type for a Programmatic Guaranteed deal. This indicates whether the number of impressions is fixed, or a percent of available impressions. If not specified, the default reservation type is STANDARD.",
    ).optional(),
  }).describe("The terms for programmatic guaranteed deals.").optional(),
  proposalRevision: z.string().describe(
    "Output only. The revision number for the proposal and is the same value as proposal.proposal_revision. Each update to deal causes the proposal revision number to auto-increment. The buyer keeps track of the last revision number they know of and pass it in when making an update. If the head revision number on the server has since incremented, then an ABORTED error is returned during the update operation to let the buyer know that a subsequent update was made.",
  ).optional(),
  publisherProfile: z.string().describe(
    "Immutable. Reference to the seller on the deal. Format: `buyers/{buyerAccountId}/publisherProfiles/{publisherProfileId}`",
  ).optional(),
  sellerTimeZone: z.object({
    id: z.string().describe(
      'IANA Time Zone Database time zone. For example "America/New_York".',
    ).optional(),
    version: z.string().describe(
      'Optional. IANA Time Zone Database version number. For example "2019a".',
    ).optional(),
  }).describe(
    "Output only. Time zone of the seller used to mark the boundaries of a day for daypart targeting and CPD billing.",
  ).optional(),
  targeting: z.object({
    daypartTargeting: z.object({
      dayParts: z.array(z.object({
        dayOfWeek: z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]).describe("Day of week for the period.").optional(),
        endTime: z.object({
          hours: z.unknown().describe(
            'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.unknown().describe(
            "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
          ).optional(),
          nanos: z.unknown().describe(
            "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
          ).optional(),
          seconds: z.unknown().describe(
            "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
        }).describe(
          "Hours in 24 hour time between 0 and 24, inclusive. Note: 24 is logically equivalent to 0, but is supported since in some cases there may need to be differentiation made between midnight on one day and midnight on the next day. Accepted values for minutes are [0, 15, 30, 45]. 0 is the only acceptable minute value for hour 24. Seconds and nanos are ignored.",
        ).optional(),
        startTime: z.object({
          hours: z.unknown().describe(
            'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.unknown().describe(
            "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
          ).optional(),
          nanos: z.unknown().describe(
            "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
          ).optional(),
          seconds: z.unknown().describe(
            "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
        }).describe(
          "Hours in 24 hour time between 0 and 24, inclusive. Note: 24 is logically equivalent to 0, but is supported since in some cases there may need to be differentiation made between midnight on one day and midnight on the next day. Accepted values for minutes are [0, 15, 30, 45]. 0 is the only acceptable minute value for hour 24. Seconds and nanos are ignored.",
        ).optional(),
      })).describe("The targeted weekdays and times").optional(),
      timeZoneType: z.enum(["TIME_ZONE_TYPE_UNSPECIFIED", "SELLER", "USER"])
        .describe("The time zone type of the day parts").optional(),
    }).describe("Daypart targeting information.").optional(),
    excludedSensitiveCategoryIds: z.array(z.string()).describe(
      "Output only. The sensitive content category label IDs excluded. Refer to this file https://storage.googleapis.com/adx-rtb-dictionaries/content-labels.txt for category IDs.",
    ).optional(),
    geoTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be excluded.",
      ).optional(),
      targetedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be included.",
      ).optional(),
    }).describe("Output only. Geo criteria IDs to be included/excluded.")
      .optional(),
    inventorySizeTargeting: z.object({
      excludedInventorySizes: z.array(z.object({
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
      })).describe("A list of inventory sizes to be excluded.").optional(),
      targetedInventorySizes: z.array(z.object({
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
      })).describe("A list of inventory sizes to be included.").optional(),
    }).describe("Output only. Inventory sizes to be included/excluded.")
      .optional(),
    inventoryTypeTargeting: z.object({
      inventoryTypes: z.array(
        z.enum([
          "INVENTORY_TYPE_UNSPECIFIED",
          "BROWSER",
          "MOBILE_APP",
          "VIDEO_PLAYER",
        ]),
      ).describe("The list of targeted inventory types for the bid request.")
        .optional(),
    }).describe("Output only. Inventory type targeting information.")
      .optional(),
    placementTargeting: z.object({
      mobileApplicationTargeting: z.object({
        firstPartyTargeting: z.object({
          excludedAppIds: z.array(z.unknown()).describe(
            "A list of application IDs to be excluded.",
          ).optional(),
          targetedAppIds: z.array(z.unknown()).describe(
            "A list of application IDs to be included.",
          ).optional(),
        }).describe(
          "Publisher owned apps to be targeted or excluded by the publisher to display the ads in.",
        ).optional(),
      }).describe(
        "Mobile application targeting information in a deal. This doesn't apply to Auction Packages.",
      ).optional(),
      uriTargeting: z.object({
        excludedUris: z.array(z.string()).describe(
          "A list of URLs to be excluded.",
        ).optional(),
        targetedUris: z.array(z.string()).describe(
          "A list of URLs to be included.",
        ).optional(),
      }).describe("URLs to be included/excluded.").optional(),
    }).describe(
      "Output only. Placement targeting information, for example, URL, mobile applications.",
    ).optional(),
    technologyTargeting: z.object({
      deviceCapabilityTargeting: z.object({
        excludedCriteriaIds: z.array(z.string()).describe(
          "A list of numeric IDs to be excluded.",
        ).optional(),
        targetedCriteriaIds: z.array(z.string()).describe(
          "A list of numeric IDs to be included.",
        ).optional(),
      }).describe("IDs of device capabilities to be included/excluded.")
        .optional(),
      deviceCategoryTargeting: z.object({
        excludedCriteriaIds: z.array(z.string()).describe(
          "A list of numeric IDs to be excluded.",
        ).optional(),
        targetedCriteriaIds: z.array(z.string()).describe(
          "A list of numeric IDs to be included.",
        ).optional(),
      }).describe("IDs of device categories to be included/excluded.")
        .optional(),
      operatingSystemTargeting: z.object({
        operatingSystemCriteria: z.object({
          excludedCriteriaIds: z.array(z.unknown()).describe(
            "A list of numeric IDs to be excluded.",
          ).optional(),
          targetedCriteriaIds: z.array(z.unknown()).describe(
            "A list of numeric IDs to be included.",
          ).optional(),
        }).describe("IDs of operating systems to be included/excluded.")
          .optional(),
        operatingSystemVersionCriteria: z.object({
          excludedCriteriaIds: z.array(z.unknown()).describe(
            "A list of numeric IDs to be excluded.",
          ).optional(),
          targetedCriteriaIds: z.array(z.unknown()).describe(
            "A list of numeric IDs to be included.",
          ).optional(),
        }).describe("IDs of operating system versions to be included/excluded.")
          .optional(),
      }).describe("Operating system related targeting information.").optional(),
    }).describe(
      "Output only. Technology targeting information, for example, operating system, device category.",
    ).optional(),
    userListTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be excluded.",
      ).optional(),
      targetedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be included.",
      ).optional(),
    }).describe(
      "Buyer user list targeting information. User lists can be uploaded using https://developers.google.com/authorized-buyers/rtb/bulk-uploader.",
    ).optional(),
    verticalTargeting: z.object({
      excludedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be excluded.",
      ).optional(),
      targetedCriteriaIds: z.array(z.string()).describe(
        "A list of numeric IDs to be included.",
      ).optional(),
    }).describe(
      "Output only. The verticals included or excluded as defined in https://developers.google.com/authorized-buyers/rtb/downloads/publisher-verticals",
    ).optional(),
    videoTargeting: z.object({
      excludedPositionTypes: z.array(
        z.enum(["POSITION_TYPE_UNSPECIFIED", "PREROLL", "MIDROLL", "POSTROLL"]),
      ).describe(
        "A list of video positions to be excluded. When this field is populated, the targeted_position_types field must be empty.",
      ).optional(),
      targetedPositionTypes: z.array(
        z.enum(["POSITION_TYPE_UNSPECIFIED", "PREROLL", "MIDROLL", "POSTROLL"]),
      ).describe(
        "A list of video positions to be included. When this field is populated, the excluded_position_types field must be empty.",
      ).optional(),
    }).describe("Output only. Video targeting information.").optional(),
  }).describe(
    "Specifies the subset of inventory targeted by the deal. Can be updated by the buyer before the deal is finalized.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time when the deal was last updated.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Authorized Buyers Marketplace Buyers.Proposals.Deals. Registered at `@swamp/gcp/authorizedbuyersmarketplace/buyers-proposals-deals`. */
export const model = {
  type: "@swamp/gcp/authorizedbuyersmarketplace/buyers-proposals-deals",
  version: "2026.10.23.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A deal represents a segment of inventory for displaying ads that contains the...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a deals",
      arguments: z.object({
        identifier: z.string().describe("The name of the deals"),
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
      description: "Update deals attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific deals by name (e.g. one discovered by list)",
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
        if (g["billedBuyer"] !== undefined) {
          body["billedBuyer"] = g["billedBuyer"];
        }
        if (g["buyer"] !== undefined) body["buyer"] = g["buyer"];
        if (g["buyerPermissionType"] !== undefined) {
          body["buyerPermissionType"] = g["buyerPermissionType"];
        }
        if (g["client"] !== undefined) body["client"] = g["client"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["creativeRequirements"] !== undefined) {
          body["creativeRequirements"] = g["creativeRequirements"];
        }
        if (g["dealType"] !== undefined) body["dealType"] = g["dealType"];
        if (g["deliveryControl"] !== undefined) {
          body["deliveryControl"] = g["deliveryControl"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["eligibleSeatIds"] !== undefined) {
          body["eligibleSeatIds"] = g["eligibleSeatIds"];
        }
        if (g["estimatedGrossSpend"] !== undefined) {
          body["estimatedGrossSpend"] = g["estimatedGrossSpend"];
        }
        if (g["flightEndTime"] !== undefined) {
          body["flightEndTime"] = g["flightEndTime"];
        }
        if (g["flightStartTime"] !== undefined) {
          body["flightStartTime"] = g["flightStartTime"];
        }
        if (g["mediaPlanner"] !== undefined) {
          body["mediaPlanner"] = g["mediaPlanner"];
        }
        if (g["preferredDealTerms"] !== undefined) {
          body["preferredDealTerms"] = g["preferredDealTerms"];
        }
        if (g["privateAuctionTerms"] !== undefined) {
          body["privateAuctionTerms"] = g["privateAuctionTerms"];
        }
        if (g["programmaticGuaranteedTerms"] !== undefined) {
          body["programmaticGuaranteedTerms"] =
            g["programmaticGuaranteedTerms"];
        }
        if (g["proposalRevision"] !== undefined) {
          body["proposalRevision"] = g["proposalRevision"];
        }
        if (g["publisherProfile"] !== undefined) {
          body["publisherProfile"] = g["publisherProfile"];
        }
        if (g["sellerTimeZone"] !== undefined) {
          body["sellerTimeZone"] = g["sellerTimeZone"];
        }
        if (g["targeting"] !== undefined) body["targeting"] = g["targeting"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
    sync: {
      description: "Sync deals state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific deals by name (e.g. one discovered by list)",
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
      description: "List deals resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Requested page size. The server may return fewer results than requested. If requested more than 500, the server will return 500 results per page. If unspecified, the server will pick a default page size of 100.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "deals",
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
    batch_update: {
      description: "batch update",
      arguments: z.object({
        requests: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          baseUrl,
          {
            "id":
              "authorizedbuyersmarketplace.buyers.proposals.deals.batchUpdate",
            "path": "v1/{+parent}/deals:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
