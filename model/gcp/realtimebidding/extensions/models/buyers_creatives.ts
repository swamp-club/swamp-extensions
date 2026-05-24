// Auto-generated extension model for @swamp/gcp/realtimebidding/buyers-creatives
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Real-time Bidding Buyers.Creatives.
 *
 * A creative and its classification data.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/creatives/${shortName}`;
}

const BASE_URL = "https://realtimebidding.googleapis.com/";

const GET_CONFIG = {
  "id": "realtimebidding.buyers.creatives.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "realtimebidding.buyers.creatives.create",
  "path": "v1/{+parent}/creatives",
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
  "id": "realtimebidding.buyers.creatives.patch",
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
  "id": "realtimebidding.buyers.creatives.list",
  "path": "v1/{+parent}/creatives",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  adChoicesDestinationUrl: z.string().describe(
    "The link to AdChoices destination page. This is only supported for native ads.",
  ).optional(),
  advertiserName: z.string().describe(
    "The name of the company being advertised in the creative. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  agencyId: z.string().describe("The agency ID for this creative.").optional(),
  creativeId: z.string().describe(
    "Buyer-specific creative ID that references this creative in bid responses. This field is Ignored in update operations. Can be used to filter the response of the creatives.list method. The maximum length of the creative ID is 128 bytes.",
  ).optional(),
  creativeServingDecision: z.object({
    adTechnologyProviders: z.object({
      detectedGvlIds: z.array(z.string()).describe(
        "The detected IAB Global Vendor List (GVL) IDs for this creative. See the IAB Global Vendor List at https://vendor-list.consensu.org/v2/vendor-list.json for details about the vendors.",
      ).optional(),
      detectedProviderIds: z.array(z.string()).describe(
        "The detected [Google Ad Tech Providers (ATP)](https://support.google.com/admanager/answer/9012903) for this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/providers.csv for mapping of provider ID to provided name, a privacy policy URL, and a list of domains which can be attributed to the provider.",
      ).optional(),
      unidentifiedProviderDomains: z.array(z.string()).describe(
        "Domains of detected unidentified ad technology providers (if any). You must ensure that the creatives used in bids placed for inventory that will serve to EEA or UK users does not contain unidentified ad technology providers. Google reserves the right to filter non-compliant bids.",
      ).optional(),
    }).describe(
      "The list of detected Ad Technology Providers for this creative. Bids placed for inventory that will serve to EEA or UK users are expected to comply with GDPR requirements. You must ensure that the creatives used in such bids should contain only user consented ad technology providers as indicated in the bid request. Google reserves the right to filter non-compliant bids. User consented ad technology providers can be found in the [Google Protocol](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto) with the `BidRequest.adslot.consented_providers_settings` field, and can be found as an [OpenRTB extension](https://developers.google.com/authorized-buyers/rtb/downloads/openrtb-adx-proto) with the `BidRequest.user.ext.consented_providers_settings` and `BidRequest.user.ext.consent` fields. See https://support.google.com/authorizedbuyers/answer/9789378 for additional information about the Google TCF v2 integration.",
    ).optional(),
    chinaPolicyCompliance: z.object({
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_REVIEW",
        "DISAPPROVED",
        "APPROVED",
        "CERTIFICATE_REQUIRED",
      ]).describe(
        "Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method.",
      ).optional(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()).describe(
          "Pieces of evidence associated with this policy topic entry.",
        ).optional(),
        helpCenterUrl: z.string().describe(
          "URL of the help center article describing this policy topic.",
        ).optional(),
        missingCertificate: z.boolean().describe(
          "Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776",
        ).optional(),
        policyTopic: z.string().describe(
          'Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method',
        ).optional(),
      })).describe(
        "Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED.",
      ).optional(),
    }).describe(
      "Policy compliance of the creative for a transaction type or a region.",
    ).optional(),
    dealsPolicyCompliance: z.object({
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_REVIEW",
        "DISAPPROVED",
        "APPROVED",
        "CERTIFICATE_REQUIRED",
      ]).describe(
        "Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method.",
      ).optional(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()).describe(
          "Pieces of evidence associated with this policy topic entry.",
        ).optional(),
        helpCenterUrl: z.string().describe(
          "URL of the help center article describing this policy topic.",
        ).optional(),
        missingCertificate: z.boolean().describe(
          "Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776",
        ).optional(),
        policyTopic: z.string().describe(
          'Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method',
        ).optional(),
      })).describe(
        "Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED.",
      ).optional(),
    }).describe(
      "Policy compliance of the creative for a transaction type or a region.",
    ).optional(),
    detectedAdvertisers: z.array(z.object({
      advertiserId: z.string().describe(
        "See https://storage.googleapis.com/adx-rtb-dictionaries/advertisers.txt for the list of possible values. Can be used to filter the response of the creatives.list method.",
      ).optional(),
      advertiserName: z.string().describe(
        "Advertiser name. Can be used to filter the response of the creatives.list method.",
      ).optional(),
      brandId: z.string().describe(
        "Detected brand ID or zero if no brand has been detected. See https://storage.googleapis.com/adx-rtb-dictionaries/brands.txt for the list of possible values. Can be used to filter the response of the creatives.list method.",
      ).optional(),
      brandName: z.string().describe(
        "Brand name. Can be used to filter the response of the creatives.list method.",
      ).optional(),
    })).describe("Detected advertisers and brands.").optional(),
    detectedAttributes: z.array(
      z.enum([
        "ATTRIBUTE_UNSPECIFIED",
        "IMAGE_RICH_MEDIA",
        "ADOBE_FLASH_FLV",
        "IS_TAGGED",
        "IS_COOKIE_TARGETED",
        "IS_USER_INTEREST_TARGETED",
        "EXPANDING_DIRECTION_NONE",
        "EXPANDING_DIRECTION_UP",
        "EXPANDING_DIRECTION_DOWN",
        "EXPANDING_DIRECTION_LEFT",
        "EXPANDING_DIRECTION_RIGHT",
        "EXPANDING_DIRECTION_UP_LEFT",
        "EXPANDING_DIRECTION_UP_RIGHT",
        "EXPANDING_DIRECTION_DOWN_LEFT",
        "EXPANDING_DIRECTION_DOWN_RIGHT",
        "CREATIVE_TYPE_HTML",
        "CREATIVE_TYPE_VAST_VIDEO",
        "EXPANDING_DIRECTION_UP_OR_DOWN",
        "EXPANDING_DIRECTION_LEFT_OR_RIGHT",
        "EXPANDING_DIRECTION_ANY_DIAGONAL",
        "EXPANDING_ACTION_ROLLOVER_TO_EXPAND",
        "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH",
        "RICH_MEDIA_CAPABILITY_TYPE_MRAID",
        "RICH_MEDIA_CAPABILITY_TYPE_FLASH",
        "RICH_MEDIA_CAPABILITY_TYPE_HTML5",
        "SKIPPABLE_INSTREAM_VIDEO",
        "RICH_MEDIA_CAPABILITY_TYPE_SSL",
        "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL",
        "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL",
        "NON_SKIPPABLE_INSTREAM_VIDEO",
        "NATIVE_ELIGIBILITY_ELIGIBLE",
        "NON_VPAID",
        "NATIVE_ELIGIBILITY_NOT_ELIGIBLE",
        "ANY_INTERSTITIAL",
        "NON_INTERSTITIAL",
        "IN_BANNER_VIDEO",
        "RENDERING_SIZELESS_ADX",
        "OMSDK_1_0",
        "RENDERING_PLAYABLE",
      ]),
    ).describe(
      "Publisher-excludable attributes that were detected for this creative. Can be used to filter the response of the creatives.list method. If the `excluded_attribute` field of a [bid request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto) contains one of the attributes that were declared or detected for a given creative, and a bid is submitted with that creative, the bid will be filtered before the auction.",
    ).optional(),
    detectedCategories: z.array(z.string()).describe(
      "Output only. IDs of the detected categories. The taxonomy in which the categories are expressed is specified by the detected_categories_taxonomy field. Use this in conjunction with BidRequest.bcat to avoid bidding on impressions where a given ad category is blocked, or to troubleshoot filtered bids. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    detectedCategoriesTaxonomy: z.enum([
      "AD_CATEGORY_TAXONOMY_UNSPECIFIED",
      "GOOGLE_AD_CATEGORY_TAXONOMY",
      "IAB_CONTENT_1_0",
    ]).describe(
      "Output only. The taxonomy in which the detected_categories field is expressed.",
    ).optional(),
    detectedClickThroughUrls: z.array(z.string()).describe(
      "The set of detected destination URLs for the creative. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    detectedDomains: z.array(z.string()).describe(
      "The detected domains for this creative.",
    ).optional(),
    detectedLanguages: z.array(z.string()).describe(
      "The detected languages for this creative. The order is arbitrary. The codes are 2 or 5 characters and are documented at https://developers.google.com/adwords/api/docs/appendix/languagecodes. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    detectedProductCategories: z.array(z.number().int()).describe(
      "Detected product categories, if any. See the ad-product-categories.txt file in the technical documentation for a list of IDs. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    detectedSensitiveCategories: z.array(z.number().int()).describe(
      "Detected sensitive categories, if any. Can be used to filter the response of the creatives.list method. See the ad-sensitive-categories.txt file in the technical documentation for a list of IDs. You should use these IDs along with the excluded-sensitive-category field in the bid request to filter your bids.",
    ).optional(),
    detectedVendorIds: z.array(z.number().int()).describe(
      "IDs of the ad technology vendors that were detected to be used by this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for possible values. Can be used to filter the response of the creatives.list method. If the `allowed_vendor_type` field of a [bid request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto) does not contain one of the vendor type IDs that were declared or detected for a given creative, and a bid is submitted with that creative, the bid will be filtered before the auction.",
    ).optional(),
    lastStatusUpdate: z.string().describe(
      "The last time the creative status was updated. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    networkPolicyCompliance: z.object({
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_REVIEW",
        "DISAPPROVED",
        "APPROVED",
        "CERTIFICATE_REQUIRED",
      ]).describe(
        "Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method.",
      ).optional(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()).describe(
          "Pieces of evidence associated with this policy topic entry.",
        ).optional(),
        helpCenterUrl: z.string().describe(
          "URL of the help center article describing this policy topic.",
        ).optional(),
        missingCertificate: z.boolean().describe(
          "Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776",
        ).optional(),
        policyTopic: z.string().describe(
          'Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method',
        ).optional(),
      })).describe(
        "Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED.",
      ).optional(),
    }).describe(
      "Policy compliance of the creative for a transaction type or a region.",
    ).optional(),
    platformPolicyCompliance: z.object({
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_REVIEW",
        "DISAPPROVED",
        "APPROVED",
        "CERTIFICATE_REQUIRED",
      ]).describe(
        "Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method.",
      ).optional(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()).describe(
          "Pieces of evidence associated with this policy topic entry.",
        ).optional(),
        helpCenterUrl: z.string().describe(
          "URL of the help center article describing this policy topic.",
        ).optional(),
        missingCertificate: z.boolean().describe(
          "Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776",
        ).optional(),
        policyTopic: z.string().describe(
          'Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method',
        ).optional(),
      })).describe(
        "Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED.",
      ).optional(),
    }).describe(
      "Policy compliance of the creative for a transaction type or a region.",
    ).optional(),
    russiaPolicyCompliance: z.object({
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_REVIEW",
        "DISAPPROVED",
        "APPROVED",
        "CERTIFICATE_REQUIRED",
      ]).describe(
        "Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method.",
      ).optional(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()).describe(
          "Pieces of evidence associated with this policy topic entry.",
        ).optional(),
        helpCenterUrl: z.string().describe(
          "URL of the help center article describing this policy topic.",
        ).optional(),
        missingCertificate: z.boolean().describe(
          "Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776",
        ).optional(),
        policyTopic: z.string().describe(
          'Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method',
        ).optional(),
      })).describe(
        "Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED.",
      ).optional(),
    }).describe(
      "Policy compliance of the creative for a transaction type or a region.",
    ).optional(),
  }).describe("Top level status and detected attributes of a creative.")
    .optional(),
  declaredAttributes: z.array(
    z.enum([
      "ATTRIBUTE_UNSPECIFIED",
      "IMAGE_RICH_MEDIA",
      "ADOBE_FLASH_FLV",
      "IS_TAGGED",
      "IS_COOKIE_TARGETED",
      "IS_USER_INTEREST_TARGETED",
      "EXPANDING_DIRECTION_NONE",
      "EXPANDING_DIRECTION_UP",
      "EXPANDING_DIRECTION_DOWN",
      "EXPANDING_DIRECTION_LEFT",
      "EXPANDING_DIRECTION_RIGHT",
      "EXPANDING_DIRECTION_UP_LEFT",
      "EXPANDING_DIRECTION_UP_RIGHT",
      "EXPANDING_DIRECTION_DOWN_LEFT",
      "EXPANDING_DIRECTION_DOWN_RIGHT",
      "CREATIVE_TYPE_HTML",
      "CREATIVE_TYPE_VAST_VIDEO",
      "EXPANDING_DIRECTION_UP_OR_DOWN",
      "EXPANDING_DIRECTION_LEFT_OR_RIGHT",
      "EXPANDING_DIRECTION_ANY_DIAGONAL",
      "EXPANDING_ACTION_ROLLOVER_TO_EXPAND",
      "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH",
      "RICH_MEDIA_CAPABILITY_TYPE_MRAID",
      "RICH_MEDIA_CAPABILITY_TYPE_FLASH",
      "RICH_MEDIA_CAPABILITY_TYPE_HTML5",
      "SKIPPABLE_INSTREAM_VIDEO",
      "RICH_MEDIA_CAPABILITY_TYPE_SSL",
      "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL",
      "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL",
      "NON_SKIPPABLE_INSTREAM_VIDEO",
      "NATIVE_ELIGIBILITY_ELIGIBLE",
      "NON_VPAID",
      "NATIVE_ELIGIBILITY_NOT_ELIGIBLE",
      "ANY_INTERSTITIAL",
      "NON_INTERSTITIAL",
      "IN_BANNER_VIDEO",
      "RENDERING_SIZELESS_ADX",
      "OMSDK_1_0",
      "RENDERING_PLAYABLE",
    ]),
  ).describe(
    'All declared attributes for the ads that may be shown from this creative. Can be used to filter the response of the creatives.list method. If the `excluded_attribute` field of a [bid request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto") contains one of the attributes that were declared or detected for a given creative, and a bid is submitted with that creative, the bid will be filtered before the auction.',
  ).optional(),
  declaredClickThroughUrls: z.array(z.string()).describe(
    "The set of declared destination URLs for the creative. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  declaredVendorIds: z.array(z.number().int()).describe(
    "IDs for the declared ad technology vendors that may be used by this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for possible values. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  html: z.object({
    height: z.number().int().describe(
      "The height of the HTML snippet in pixels. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    snippet: z.string().describe(
      "The HTML snippet that displays the ad when inserted in the web page.",
    ).optional(),
    width: z.number().int().describe(
      "The width of the HTML snippet in pixels. Can be used to filter the response of the creatives.list method.",
    ).optional(),
  }).describe("HTML content for a creative.").optional(),
  impressionTrackingUrls: z.array(z.string()).describe(
    "The set of URLs to be called to record an impression.",
  ).optional(),
  native: z.object({
    advertiserName: z.string().describe(
      "The name of the advertiser or sponsor, to be displayed in the ad creative.",
    ).optional(),
    appIcon: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    body: z.string().describe("A long description of the ad.").optional(),
    callToAction: z.string().describe(
      "A label for the button that the user is supposed to click.",
    ).optional(),
    clickLinkUrl: z.string().describe(
      "The URL that the browser/SDK will load when the user clicks the ad.",
    ).optional(),
    clickTrackingUrl: z.string().describe("The URL to use for click tracking.")
      .optional(),
    headline: z.string().describe("A short title for the ad.").optional(),
    image: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    logo: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    priceDisplayText: z.string().describe(
      "The price of the promoted app including currency info.",
    ).optional(),
    starRating: z.number().describe(
      "The app rating in the app store. Must be in the range [0-5].",
    ).optional(),
    videoUrl: z.string().describe("The URL to fetch a native video ad.")
      .optional(),
    videoVastXml: z.string().describe(
      "The contents of a VAST document for a native video ad.",
    ).optional(),
  }).describe("Native content for a creative.").optional(),
  video: z.object({
    videoMetadata: z.object({
      duration: z.string().describe(
        "The duration of the ad. Can be used to filter the response of the creatives.list method.",
      ).optional(),
      isValidVast: z.boolean().describe(
        "Is this a valid VAST ad? Can be used to filter the response of the creatives.list method.",
      ).optional(),
      isVpaid: z.boolean().describe(
        "Is this a VPAID ad? Can be used to filter the response of the creatives.list method.",
      ).optional(),
      mediaFiles: z.array(z.object({
        bitrate: z.string().describe(
          "Bitrate of the video file, in Kbps. Can be used to filter the response of the creatives.list method.",
        ).optional(),
        mimeType: z.enum([
          "VIDEO_MIME_TYPE_UNSPECIFIED",
          "MIME_VIDEO_XFLV",
          "MIME_VIDEO_WEBM",
          "MIME_VIDEO_MP4",
          "MIME_VIDEO_OGG",
          "MIME_VIDEO_YT_HOSTED",
          "MIME_VIDEO_X_MS_WMV",
          "MIME_VIDEO_3GPP",
          "MIME_VIDEO_MOV",
          "MIME_APPLICATION_SWF",
          "MIME_APPLICATION_SURVEY",
          "MIME_APPLICATION_JAVASCRIPT",
          "MIME_APPLICATION_SILVERLIGHT",
          "MIME_APPLICATION_MPEGURL",
          "MIME_APPLICATION_MPEGDASH",
          "MIME_AUDIO_MP4A",
          "MIME_AUDIO_MP3",
          "MIME_AUDIO_OGG",
        ]).describe(
          "The MIME type of this media file. Can be used to filter the response of the creatives.list method.",
        ).optional(),
      })).describe(
        "The list of all media files declared in the VAST. If there are multiple VASTs in a wrapper chain, this includes the media files from the deepest one in the chain.",
      ).optional(),
      skipOffset: z.string().describe(
        "The minimum duration that the user has to watch before being able to skip this ad. If the field is not set, the ad is not skippable. If the field is set, the ad is skippable. Can be used to filter the response of the creatives.list method.",
      ).optional(),
      vastVersion: z.enum([
        "VAST_VERSION_UNSPECIFIED",
        "VAST_VERSION_1_0",
        "VAST_VERSION_2_0",
        "VAST_VERSION_3_0",
        "VAST_VERSION_4_0",
      ]).describe(
        "The maximum VAST version across all wrapped VAST documents. Can be used to filter the response of the creatives.list method.",
      ).optional(),
    }).describe("Video metadata for a creative.").optional(),
    videoUrl: z.string().describe(
      "The URL to fetch a video ad. The URL should return an XML response that conforms to the VAST 2.0, 3.0 or 4.x standard.",
    ).optional(),
    videoVastXml: z.string().describe(
      "The contents of a VAST document for a video ad. This document should conform to the VAST 2.0, 3.0, or 4.x standard.",
    ).optional(),
  }).describe("Video content for a creative.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  adChoicesDestinationUrl: z.string().optional(),
  advertiserName: z.string().optional(),
  agencyId: z.string().optional(),
  apiUpdateTime: z.string().optional(),
  creativeFormat: z.string().optional(),
  creativeId: z.string().optional(),
  creativeServingDecision: z.object({
    adTechnologyProviders: z.object({
      detectedGvlIds: z.array(z.string()),
      detectedProviderIds: z.array(z.string()),
      unidentifiedProviderDomains: z.array(z.string()),
    }),
    chinaPolicyCompliance: z.object({
      status: z.string(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()),
        helpCenterUrl: z.string(),
        missingCertificate: z.boolean(),
        policyTopic: z.string(),
      })),
    }),
    dealsPolicyCompliance: z.object({
      status: z.string(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()),
        helpCenterUrl: z.string(),
        missingCertificate: z.boolean(),
        policyTopic: z.string(),
      })),
    }),
    detectedAdvertisers: z.array(z.object({
      advertiserId: z.string(),
      advertiserName: z.string(),
      brandId: z.string(),
      brandName: z.string(),
    })),
    detectedAttributes: z.array(z.string()),
    detectedCategories: z.array(z.string()),
    detectedCategoriesTaxonomy: z.string(),
    detectedClickThroughUrls: z.array(z.string()),
    detectedDomains: z.array(z.string()),
    detectedLanguages: z.array(z.string()),
    detectedProductCategories: z.array(z.number()),
    detectedSensitiveCategories: z.array(z.number()),
    detectedVendorIds: z.array(z.number()),
    lastStatusUpdate: z.string(),
    networkPolicyCompliance: z.object({
      status: z.string(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()),
        helpCenterUrl: z.string(),
        missingCertificate: z.boolean(),
        policyTopic: z.string(),
      })),
    }),
    platformPolicyCompliance: z.object({
      status: z.string(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()),
        helpCenterUrl: z.string(),
        missingCertificate: z.boolean(),
        policyTopic: z.string(),
      })),
    }),
    russiaPolicyCompliance: z.object({
      status: z.string(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()),
        helpCenterUrl: z.string(),
        missingCertificate: z.boolean(),
        policyTopic: z.string(),
      })),
    }),
  }).optional(),
  dealIds: z.array(z.string()).optional(),
  declaredAttributes: z.array(z.string()).optional(),
  declaredClickThroughUrls: z.array(z.string()).optional(),
  declaredRestrictedCategories: z.array(z.string()).optional(),
  declaredVendorIds: z.array(z.number()).optional(),
  html: z.object({
    height: z.number(),
    snippet: z.string(),
    width: z.number(),
  }).optional(),
  impressionTrackingUrls: z.array(z.string()).optional(),
  name: z.string(),
  native: z.object({
    advertiserName: z.string(),
    appIcon: z.object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    }),
    body: z.string(),
    callToAction: z.string(),
    clickLinkUrl: z.string(),
    clickTrackingUrl: z.string(),
    headline: z.string(),
    image: z.object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    }),
    logo: z.object({
      height: z.number(),
      url: z.string(),
      width: z.number(),
    }),
    priceDisplayText: z.string(),
    starRating: z.number(),
    videoUrl: z.string(),
    videoVastXml: z.string(),
  }).optional(),
  renderUrl: z.string().optional(),
  restrictedCategories: z.array(z.string()).optional(),
  version: z.number().optional(),
  video: z.object({
    videoMetadata: z.object({
      duration: z.string(),
      isValidVast: z.boolean(),
      isVpaid: z.boolean(),
      mediaFiles: z.array(z.object({
        bitrate: z.string(),
        mimeType: z.string(),
      })),
      skipOffset: z.string(),
      vastVersion: z.string(),
    }),
    videoUrl: z.string(),
    videoVastXml: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  adChoicesDestinationUrl: z.string().describe(
    "The link to AdChoices destination page. This is only supported for native ads.",
  ).optional(),
  advertiserName: z.string().describe(
    "The name of the company being advertised in the creative. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  agencyId: z.string().describe("The agency ID for this creative.").optional(),
  creativeId: z.string().describe(
    "Buyer-specific creative ID that references this creative in bid responses. This field is Ignored in update operations. Can be used to filter the response of the creatives.list method. The maximum length of the creative ID is 128 bytes.",
  ).optional(),
  creativeServingDecision: z.object({
    adTechnologyProviders: z.object({
      detectedGvlIds: z.array(z.string()).describe(
        "The detected IAB Global Vendor List (GVL) IDs for this creative. See the IAB Global Vendor List at https://vendor-list.consensu.org/v2/vendor-list.json for details about the vendors.",
      ).optional(),
      detectedProviderIds: z.array(z.string()).describe(
        "The detected [Google Ad Tech Providers (ATP)](https://support.google.com/admanager/answer/9012903) for this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/providers.csv for mapping of provider ID to provided name, a privacy policy URL, and a list of domains which can be attributed to the provider.",
      ).optional(),
      unidentifiedProviderDomains: z.array(z.string()).describe(
        "Domains of detected unidentified ad technology providers (if any). You must ensure that the creatives used in bids placed for inventory that will serve to EEA or UK users does not contain unidentified ad technology providers. Google reserves the right to filter non-compliant bids.",
      ).optional(),
    }).describe(
      "The list of detected Ad Technology Providers for this creative. Bids placed for inventory that will serve to EEA or UK users are expected to comply with GDPR requirements. You must ensure that the creatives used in such bids should contain only user consented ad technology providers as indicated in the bid request. Google reserves the right to filter non-compliant bids. User consented ad technology providers can be found in the [Google Protocol](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto) with the `BidRequest.adslot.consented_providers_settings` field, and can be found as an [OpenRTB extension](https://developers.google.com/authorized-buyers/rtb/downloads/openrtb-adx-proto) with the `BidRequest.user.ext.consented_providers_settings` and `BidRequest.user.ext.consent` fields. See https://support.google.com/authorizedbuyers/answer/9789378 for additional information about the Google TCF v2 integration.",
    ).optional(),
    chinaPolicyCompliance: z.object({
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_REVIEW",
        "DISAPPROVED",
        "APPROVED",
        "CERTIFICATE_REQUIRED",
      ]).describe(
        "Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method.",
      ).optional(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()).describe(
          "Pieces of evidence associated with this policy topic entry.",
        ).optional(),
        helpCenterUrl: z.string().describe(
          "URL of the help center article describing this policy topic.",
        ).optional(),
        missingCertificate: z.boolean().describe(
          "Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776",
        ).optional(),
        policyTopic: z.string().describe(
          'Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method',
        ).optional(),
      })).describe(
        "Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED.",
      ).optional(),
    }).describe(
      "Policy compliance of the creative for a transaction type or a region.",
    ).optional(),
    dealsPolicyCompliance: z.object({
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_REVIEW",
        "DISAPPROVED",
        "APPROVED",
        "CERTIFICATE_REQUIRED",
      ]).describe(
        "Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method.",
      ).optional(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()).describe(
          "Pieces of evidence associated with this policy topic entry.",
        ).optional(),
        helpCenterUrl: z.string().describe(
          "URL of the help center article describing this policy topic.",
        ).optional(),
        missingCertificate: z.boolean().describe(
          "Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776",
        ).optional(),
        policyTopic: z.string().describe(
          'Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method',
        ).optional(),
      })).describe(
        "Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED.",
      ).optional(),
    }).describe(
      "Policy compliance of the creative for a transaction type or a region.",
    ).optional(),
    detectedAdvertisers: z.array(z.object({
      advertiserId: z.string().describe(
        "See https://storage.googleapis.com/adx-rtb-dictionaries/advertisers.txt for the list of possible values. Can be used to filter the response of the creatives.list method.",
      ).optional(),
      advertiserName: z.string().describe(
        "Advertiser name. Can be used to filter the response of the creatives.list method.",
      ).optional(),
      brandId: z.string().describe(
        "Detected brand ID or zero if no brand has been detected. See https://storage.googleapis.com/adx-rtb-dictionaries/brands.txt for the list of possible values. Can be used to filter the response of the creatives.list method.",
      ).optional(),
      brandName: z.string().describe(
        "Brand name. Can be used to filter the response of the creatives.list method.",
      ).optional(),
    })).describe("Detected advertisers and brands.").optional(),
    detectedAttributes: z.array(
      z.enum([
        "ATTRIBUTE_UNSPECIFIED",
        "IMAGE_RICH_MEDIA",
        "ADOBE_FLASH_FLV",
        "IS_TAGGED",
        "IS_COOKIE_TARGETED",
        "IS_USER_INTEREST_TARGETED",
        "EXPANDING_DIRECTION_NONE",
        "EXPANDING_DIRECTION_UP",
        "EXPANDING_DIRECTION_DOWN",
        "EXPANDING_DIRECTION_LEFT",
        "EXPANDING_DIRECTION_RIGHT",
        "EXPANDING_DIRECTION_UP_LEFT",
        "EXPANDING_DIRECTION_UP_RIGHT",
        "EXPANDING_DIRECTION_DOWN_LEFT",
        "EXPANDING_DIRECTION_DOWN_RIGHT",
        "CREATIVE_TYPE_HTML",
        "CREATIVE_TYPE_VAST_VIDEO",
        "EXPANDING_DIRECTION_UP_OR_DOWN",
        "EXPANDING_DIRECTION_LEFT_OR_RIGHT",
        "EXPANDING_DIRECTION_ANY_DIAGONAL",
        "EXPANDING_ACTION_ROLLOVER_TO_EXPAND",
        "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH",
        "RICH_MEDIA_CAPABILITY_TYPE_MRAID",
        "RICH_MEDIA_CAPABILITY_TYPE_FLASH",
        "RICH_MEDIA_CAPABILITY_TYPE_HTML5",
        "SKIPPABLE_INSTREAM_VIDEO",
        "RICH_MEDIA_CAPABILITY_TYPE_SSL",
        "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL",
        "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL",
        "NON_SKIPPABLE_INSTREAM_VIDEO",
        "NATIVE_ELIGIBILITY_ELIGIBLE",
        "NON_VPAID",
        "NATIVE_ELIGIBILITY_NOT_ELIGIBLE",
        "ANY_INTERSTITIAL",
        "NON_INTERSTITIAL",
        "IN_BANNER_VIDEO",
        "RENDERING_SIZELESS_ADX",
        "OMSDK_1_0",
        "RENDERING_PLAYABLE",
      ]),
    ).describe(
      "Publisher-excludable attributes that were detected for this creative. Can be used to filter the response of the creatives.list method. If the `excluded_attribute` field of a [bid request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto) contains one of the attributes that were declared or detected for a given creative, and a bid is submitted with that creative, the bid will be filtered before the auction.",
    ).optional(),
    detectedCategories: z.array(z.string()).describe(
      "Output only. IDs of the detected categories. The taxonomy in which the categories are expressed is specified by the detected_categories_taxonomy field. Use this in conjunction with BidRequest.bcat to avoid bidding on impressions where a given ad category is blocked, or to troubleshoot filtered bids. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    detectedCategoriesTaxonomy: z.enum([
      "AD_CATEGORY_TAXONOMY_UNSPECIFIED",
      "GOOGLE_AD_CATEGORY_TAXONOMY",
      "IAB_CONTENT_1_0",
    ]).describe(
      "Output only. The taxonomy in which the detected_categories field is expressed.",
    ).optional(),
    detectedClickThroughUrls: z.array(z.string()).describe(
      "The set of detected destination URLs for the creative. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    detectedDomains: z.array(z.string()).describe(
      "The detected domains for this creative.",
    ).optional(),
    detectedLanguages: z.array(z.string()).describe(
      "The detected languages for this creative. The order is arbitrary. The codes are 2 or 5 characters and are documented at https://developers.google.com/adwords/api/docs/appendix/languagecodes. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    detectedProductCategories: z.array(z.number().int()).describe(
      "Detected product categories, if any. See the ad-product-categories.txt file in the technical documentation for a list of IDs. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    detectedSensitiveCategories: z.array(z.number().int()).describe(
      "Detected sensitive categories, if any. Can be used to filter the response of the creatives.list method. See the ad-sensitive-categories.txt file in the technical documentation for a list of IDs. You should use these IDs along with the excluded-sensitive-category field in the bid request to filter your bids.",
    ).optional(),
    detectedVendorIds: z.array(z.number().int()).describe(
      "IDs of the ad technology vendors that were detected to be used by this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for possible values. Can be used to filter the response of the creatives.list method. If the `allowed_vendor_type` field of a [bid request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto) does not contain one of the vendor type IDs that were declared or detected for a given creative, and a bid is submitted with that creative, the bid will be filtered before the auction.",
    ).optional(),
    lastStatusUpdate: z.string().describe(
      "The last time the creative status was updated. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    networkPolicyCompliance: z.object({
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_REVIEW",
        "DISAPPROVED",
        "APPROVED",
        "CERTIFICATE_REQUIRED",
      ]).describe(
        "Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method.",
      ).optional(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()).describe(
          "Pieces of evidence associated with this policy topic entry.",
        ).optional(),
        helpCenterUrl: z.string().describe(
          "URL of the help center article describing this policy topic.",
        ).optional(),
        missingCertificate: z.boolean().describe(
          "Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776",
        ).optional(),
        policyTopic: z.string().describe(
          'Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method',
        ).optional(),
      })).describe(
        "Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED.",
      ).optional(),
    }).describe(
      "Policy compliance of the creative for a transaction type or a region.",
    ).optional(),
    platformPolicyCompliance: z.object({
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_REVIEW",
        "DISAPPROVED",
        "APPROVED",
        "CERTIFICATE_REQUIRED",
      ]).describe(
        "Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method.",
      ).optional(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()).describe(
          "Pieces of evidence associated with this policy topic entry.",
        ).optional(),
        helpCenterUrl: z.string().describe(
          "URL of the help center article describing this policy topic.",
        ).optional(),
        missingCertificate: z.boolean().describe(
          "Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776",
        ).optional(),
        policyTopic: z.string().describe(
          'Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method',
        ).optional(),
      })).describe(
        "Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED.",
      ).optional(),
    }).describe(
      "Policy compliance of the creative for a transaction type or a region.",
    ).optional(),
    russiaPolicyCompliance: z.object({
      status: z.enum([
        "STATUS_UNSPECIFIED",
        "PENDING_REVIEW",
        "DISAPPROVED",
        "APPROVED",
        "CERTIFICATE_REQUIRED",
      ]).describe(
        "Serving status for the given transaction type (for example, open auction, deals) or region (for example, China, Russia). Can be used to filter the response of the creatives.list method.",
      ).optional(),
      topics: z.array(z.object({
        evidences: z.array(z.unknown()).describe(
          "Pieces of evidence associated with this policy topic entry.",
        ).optional(),
        helpCenterUrl: z.string().describe(
          "URL of the help center article describing this policy topic.",
        ).optional(),
        missingCertificate: z.boolean().describe(
          "Whether or not the policy topic is missing a certificate. Some policy topics require a certificate to unblock serving in some regions. For more information about creative certification, refer to: https://support.google.com/authorizedbuyers/answer/7450776",
        ).optional(),
        policyTopic: z.string().describe(
          'Policy topic this entry refers to. For example, "ALCOHOL", "TRADEMARKS_IN_AD_TEXT", or "DESTINATION_NOT_WORKING". The set of possible policy topics is not fixed for a particular API version and may change at any time. Can be used to filter the response of the creatives.list method',
        ).optional(),
      })).describe(
        "Topics related to the policy compliance for this transaction type (for example, open auction, deals) or region (for example, China, Russia). Topics may be present only if status is DISAPPROVED.",
      ).optional(),
    }).describe(
      "Policy compliance of the creative for a transaction type or a region.",
    ).optional(),
  }).describe("Top level status and detected attributes of a creative.")
    .optional(),
  declaredAttributes: z.array(
    z.enum([
      "ATTRIBUTE_UNSPECIFIED",
      "IMAGE_RICH_MEDIA",
      "ADOBE_FLASH_FLV",
      "IS_TAGGED",
      "IS_COOKIE_TARGETED",
      "IS_USER_INTEREST_TARGETED",
      "EXPANDING_DIRECTION_NONE",
      "EXPANDING_DIRECTION_UP",
      "EXPANDING_DIRECTION_DOWN",
      "EXPANDING_DIRECTION_LEFT",
      "EXPANDING_DIRECTION_RIGHT",
      "EXPANDING_DIRECTION_UP_LEFT",
      "EXPANDING_DIRECTION_UP_RIGHT",
      "EXPANDING_DIRECTION_DOWN_LEFT",
      "EXPANDING_DIRECTION_DOWN_RIGHT",
      "CREATIVE_TYPE_HTML",
      "CREATIVE_TYPE_VAST_VIDEO",
      "EXPANDING_DIRECTION_UP_OR_DOWN",
      "EXPANDING_DIRECTION_LEFT_OR_RIGHT",
      "EXPANDING_DIRECTION_ANY_DIAGONAL",
      "EXPANDING_ACTION_ROLLOVER_TO_EXPAND",
      "INSTREAM_VAST_VIDEO_TYPE_VPAID_FLASH",
      "RICH_MEDIA_CAPABILITY_TYPE_MRAID",
      "RICH_MEDIA_CAPABILITY_TYPE_FLASH",
      "RICH_MEDIA_CAPABILITY_TYPE_HTML5",
      "SKIPPABLE_INSTREAM_VIDEO",
      "RICH_MEDIA_CAPABILITY_TYPE_SSL",
      "RICH_MEDIA_CAPABILITY_TYPE_NON_SSL",
      "RICH_MEDIA_CAPABILITY_TYPE_INTERSTITIAL",
      "NON_SKIPPABLE_INSTREAM_VIDEO",
      "NATIVE_ELIGIBILITY_ELIGIBLE",
      "NON_VPAID",
      "NATIVE_ELIGIBILITY_NOT_ELIGIBLE",
      "ANY_INTERSTITIAL",
      "NON_INTERSTITIAL",
      "IN_BANNER_VIDEO",
      "RENDERING_SIZELESS_ADX",
      "OMSDK_1_0",
      "RENDERING_PLAYABLE",
    ]),
  ).describe(
    'All declared attributes for the ads that may be shown from this creative. Can be used to filter the response of the creatives.list method. If the `excluded_attribute` field of a [bid request](https://developers.google.com/authorized-buyers/rtb/downloads/realtime-bidding-proto") contains one of the attributes that were declared or detected for a given creative, and a bid is submitted with that creative, the bid will be filtered before the auction.',
  ).optional(),
  declaredClickThroughUrls: z.array(z.string()).describe(
    "The set of declared destination URLs for the creative. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  declaredVendorIds: z.array(z.number().int()).describe(
    "IDs for the declared ad technology vendors that may be used by this creative. See https://storage.googleapis.com/adx-rtb-dictionaries/vendors.txt for possible values. Can be used to filter the response of the creatives.list method.",
  ).optional(),
  html: z.object({
    height: z.number().int().describe(
      "The height of the HTML snippet in pixels. Can be used to filter the response of the creatives.list method.",
    ).optional(),
    snippet: z.string().describe(
      "The HTML snippet that displays the ad when inserted in the web page.",
    ).optional(),
    width: z.number().int().describe(
      "The width of the HTML snippet in pixels. Can be used to filter the response of the creatives.list method.",
    ).optional(),
  }).describe("HTML content for a creative.").optional(),
  impressionTrackingUrls: z.array(z.string()).describe(
    "The set of URLs to be called to record an impression.",
  ).optional(),
  native: z.object({
    advertiserName: z.string().describe(
      "The name of the advertiser or sponsor, to be displayed in the ad creative.",
    ).optional(),
    appIcon: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    body: z.string().describe("A long description of the ad.").optional(),
    callToAction: z.string().describe(
      "A label for the button that the user is supposed to click.",
    ).optional(),
    clickLinkUrl: z.string().describe(
      "The URL that the browser/SDK will load when the user clicks the ad.",
    ).optional(),
    clickTrackingUrl: z.string().describe("The URL to use for click tracking.")
      .optional(),
    headline: z.string().describe("A short title for the ad.").optional(),
    image: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    logo: z.object({
      height: z.number().int().describe("Image height in pixels.").optional(),
      url: z.string().describe("The URL of the image.").optional(),
      width: z.number().int().describe("Image width in pixels.").optional(),
    }).describe(
      "An image resource. You may provide a larger image than was requested, so long as the aspect ratio is preserved.",
    ).optional(),
    priceDisplayText: z.string().describe(
      "The price of the promoted app including currency info.",
    ).optional(),
    starRating: z.number().describe(
      "The app rating in the app store. Must be in the range [0-5].",
    ).optional(),
    videoUrl: z.string().describe("The URL to fetch a native video ad.")
      .optional(),
    videoVastXml: z.string().describe(
      "The contents of a VAST document for a native video ad.",
    ).optional(),
  }).describe("Native content for a creative.").optional(),
  video: z.object({
    videoMetadata: z.object({
      duration: z.string().describe(
        "The duration of the ad. Can be used to filter the response of the creatives.list method.",
      ).optional(),
      isValidVast: z.boolean().describe(
        "Is this a valid VAST ad? Can be used to filter the response of the creatives.list method.",
      ).optional(),
      isVpaid: z.boolean().describe(
        "Is this a VPAID ad? Can be used to filter the response of the creatives.list method.",
      ).optional(),
      mediaFiles: z.array(z.object({
        bitrate: z.string().describe(
          "Bitrate of the video file, in Kbps. Can be used to filter the response of the creatives.list method.",
        ).optional(),
        mimeType: z.enum([
          "VIDEO_MIME_TYPE_UNSPECIFIED",
          "MIME_VIDEO_XFLV",
          "MIME_VIDEO_WEBM",
          "MIME_VIDEO_MP4",
          "MIME_VIDEO_OGG",
          "MIME_VIDEO_YT_HOSTED",
          "MIME_VIDEO_X_MS_WMV",
          "MIME_VIDEO_3GPP",
          "MIME_VIDEO_MOV",
          "MIME_APPLICATION_SWF",
          "MIME_APPLICATION_SURVEY",
          "MIME_APPLICATION_JAVASCRIPT",
          "MIME_APPLICATION_SILVERLIGHT",
          "MIME_APPLICATION_MPEGURL",
          "MIME_APPLICATION_MPEGDASH",
          "MIME_AUDIO_MP4A",
          "MIME_AUDIO_MP3",
          "MIME_AUDIO_OGG",
        ]).describe(
          "The MIME type of this media file. Can be used to filter the response of the creatives.list method.",
        ).optional(),
      })).describe(
        "The list of all media files declared in the VAST. If there are multiple VASTs in a wrapper chain, this includes the media files from the deepest one in the chain.",
      ).optional(),
      skipOffset: z.string().describe(
        "The minimum duration that the user has to watch before being able to skip this ad. If the field is not set, the ad is not skippable. If the field is set, the ad is skippable. Can be used to filter the response of the creatives.list method.",
      ).optional(),
      vastVersion: z.enum([
        "VAST_VERSION_UNSPECIFIED",
        "VAST_VERSION_1_0",
        "VAST_VERSION_2_0",
        "VAST_VERSION_3_0",
        "VAST_VERSION_4_0",
      ]).describe(
        "The maximum VAST version across all wrapped VAST documents. Can be used to filter the response of the creatives.list method.",
      ).optional(),
    }).describe("Video metadata for a creative.").optional(),
    videoUrl: z.string().describe(
      "The URL to fetch a video ad. The URL should return an XML response that conforms to the VAST 2.0, 3.0 or 4.x standard.",
    ).optional(),
    videoVastXml: z.string().describe(
      "The contents of a VAST document for a video ad. This document should conform to the VAST 2.0, 3.0, or 4.x standard.",
    ).optional(),
  }).describe("Video content for a creative.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Real-time Bidding Buyers.Creatives. Registered at `@swamp/gcp/realtimebidding/buyers-creatives`. */
export const model = {
  type: "@swamp/gcp/realtimebidding/buyers-creatives",
  version: "2026.05.24.1",
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
      toVersion: "2026.05.01.1",
      description: "Removed: renderUrl",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { renderUrl: _renderUrl, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.1",
      description: "Added: renderUrl",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
      description: "Removed: renderUrl",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { renderUrl: _renderUrl, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Added: renderUrl",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
      description: "Removed: renderUrl",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { renderUrl: _renderUrl, ...rest } = old;
        return rest;
      },
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A creative and its classification data.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["adChoicesDestinationUrl"] !== undefined) {
          body["adChoicesDestinationUrl"] = g["adChoicesDestinationUrl"];
        }
        if (g["advertiserName"] !== undefined) {
          body["advertiserName"] = g["advertiserName"];
        }
        if (g["agencyId"] !== undefined) body["agencyId"] = g["agencyId"];
        if (g["creativeId"] !== undefined) body["creativeId"] = g["creativeId"];
        if (g["creativeServingDecision"] !== undefined) {
          body["creativeServingDecision"] = g["creativeServingDecision"];
        }
        if (g["declaredAttributes"] !== undefined) {
          body["declaredAttributes"] = g["declaredAttributes"];
        }
        if (g["declaredClickThroughUrls"] !== undefined) {
          body["declaredClickThroughUrls"] = g["declaredClickThroughUrls"];
        }
        if (g["declaredVendorIds"] !== undefined) {
          body["declaredVendorIds"] = g["declaredVendorIds"];
        }
        if (g["html"] !== undefined) body["html"] = g["html"];
        if (g["impressionTrackingUrls"] !== undefined) {
          body["impressionTrackingUrls"] = g["impressionTrackingUrls"];
        }
        if (g["native"] !== undefined) body["native"] = g["native"];
        if (g["video"] !== undefined) body["video"] = g["video"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
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
      description: "Get a creatives",
      arguments: z.object({
        identifier: z.string().describe("The name of the creatives"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["adChoicesDestinationUrl"] !== undefined) {
          body["adChoicesDestinationUrl"] = g["adChoicesDestinationUrl"];
        }
        if (g["advertiserName"] !== undefined) {
          body["advertiserName"] = g["advertiserName"];
        }
        if (g["agencyId"] !== undefined) body["agencyId"] = g["agencyId"];
        if (g["creativeId"] !== undefined) body["creativeId"] = g["creativeId"];
        if (g["creativeServingDecision"] !== undefined) {
          body["creativeServingDecision"] = g["creativeServingDecision"];
        }
        if (g["declaredAttributes"] !== undefined) {
          body["declaredAttributes"] = g["declaredAttributes"];
        }
        if (g["declaredClickThroughUrls"] !== undefined) {
          body["declaredClickThroughUrls"] = g["declaredClickThroughUrls"];
        }
        if (g["declaredVendorIds"] !== undefined) {
          body["declaredVendorIds"] = g["declaredVendorIds"];
        }
        if (g["html"] !== undefined) body["html"] = g["html"];
        if (g["impressionTrackingUrls"] !== undefined) {
          body["impressionTrackingUrls"] = g["impressionTrackingUrls"];
        }
        if (g["native"] !== undefined) body["native"] = g["native"];
        if (g["video"] !== undefined) body["video"] = g["video"];
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            shortName,
          );
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
