// Auto-generated extension model for @swamp/gcp/displayvideo/advertisers-adgroupads
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Display & Video 360 Advertisers.AdGroupAds.
 *
 * A single ad associated with an ad group.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://displayvideo.googleapis.com/";

const GET_CONFIG = {
  "id": "displayvideo.advertisers.adGroupAds.get",
  "path": "v4/advertisers/{+advertiserId}/adGroupAds/{+adGroupAdId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "advertiserId",
    "adGroupAdId",
  ],
  "parameters": {
    "adGroupAdId": {
      "location": "path",
      "required": true,
    },
    "advertiserId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "displayvideo.advertisers.adGroupAds.create",
  "path": "v4/advertisers/{+advertiserId}/adGroupAds",
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
  "id": "displayvideo.advertisers.adGroupAds.patch",
  "path": "v4/advertisers/{+advertiserId}/adGroupAds/{+adGroupAdId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "advertiserId",
    "adGroupAdId",
  ],
  "parameters": {
    "adGroupAdId": {
      "location": "path",
      "required": true,
    },
    "advertiserId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "displayvideo.advertisers.adGroupAds.delete",
  "path": "v4/advertisers/{+advertiserId}/adGroupAds/{+adGroupAdId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "advertiserId",
    "adGroupAdId",
  ],
  "parameters": {
    "adGroupAdId": {
      "location": "path",
      "required": true,
    },
    "advertiserId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "displayvideo.advertisers.adGroupAds.list",
  "path": "v4/advertisers/{+advertiserId}/adGroupAds",
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
  adGroupId: z.string().describe(
    "Required. Immutable. The unique ID of the ad group that the ad belongs to.",
  ).optional(),
  adPolicy: z.object({
    adPolicyApprovalStatus: z.enum([
      "AD_POLICY_APPROVAL_STATUS_UNKNOWN",
      "DISAPPROVED",
      "APPROVED_LIMITED",
      "APPROVED",
      "AREA_OF_INTEREST_ONLY",
    ]).describe(
      "The policy approval status of an ad, indicating the approval decision.",
    ).optional(),
    adPolicyReviewStatus: z.enum([
      "AD_POLICY_REVIEW_STATUS_UNKNOWN",
      "REVIEW_IN_PROGRESS",
      "REVIEWED",
      "UNDER_APPEAL",
      "ELIGIBLE_MAY_SERVE",
    ]).describe(
      "The policy review status of an ad, indicating where in the review process the ad is currently.",
    ).optional(),
    adPolicyTopicEntry: z.array(z.object({
      appealInfo: z.object({
        appealFormLink: z.string().describe(
          "Only available when appeal_type is `APPEAL_FORM`.",
        ).optional(),
        appealType: z.enum([
          "AD_POLICY_APPEAL_TYPE_UNKNOWN",
          "SELF_SERVICE_APPEAL",
          "APPEAL_FORM",
        ]).describe(
          "Whether the decision can be appealed through a self-service appeal or an appeal form.",
        ).optional(),
      }).describe("Information on how to appeal a policy decision.").optional(),
      helpCenterLink: z.string().describe(
        "Ad policy help center link for the policy topic.",
      ).optional(),
      policyDecisionType: z.enum([
        "AD_POLICY_DECISION_TYPE_UNKNOWN",
        "PURSUANT_TO_NOTICE",
        "GOOGLE_INVESTIGATION",
      ]).describe("The source of the policy decision.").optional(),
      policyEnforcementMeans: z.enum([
        "AD_POLICY_ENFORCEMENT_MEANS_UNKNOWN",
        "AUTOMATED",
        "HUMAN_REVIEW",
      ]).describe("The policy enforcement means used in the policy review.")
        .optional(),
      policyLabel: z.string().describe(
        'Localized label text for policy. Examples include "Trademarks in text", "Contains Alcohol", etc.',
      ).optional(),
      policyTopic: z.string().describe(
        'The policy topic. Examples include "TRADEMARKS", "ALCOHOL", etc.',
      ).optional(),
      policyTopicConstraints: z.array(z.object({
        certificateDomainMismatchCountryList: z.unknown().describe(
          "A list of countries where the ad cannot serve due to policy constraints.",
        ).optional(),
        certificateMissingCountryList: z.unknown().describe(
          "A list of countries where the ad cannot serve due to policy constraints.",
        ).optional(),
        countryConstraint: z.unknown().describe(
          "A list of countries where the ad cannot serve due to policy constraints.",
        ).optional(),
        globalCertificateDomainMismatch: z.unknown().describe(
          "Certificate is required to serve in any country and the existing certificate does not cover the ad's domain.",
        ).optional(),
        globalCertificateMissing: z.unknown().describe(
          "Certificate is required to serve in any country.",
        ).optional(),
        requestCertificateFormLink: z.unknown().describe(
          "Link to the form to request a certificate for the constraint.",
        ).optional(),
        resellerConstraint: z.unknown().describe(
          "Policy topic was constrained due to disapproval of the website for reseller purposes.",
        ).optional(),
      })).describe("The serving constraints relevant to the policy decision.")
        .optional(),
      policyTopicDescription: z.string().describe(
        "A short summary description of the policy topic.",
      ).optional(),
      policyTopicEvidences: z.array(z.object({
        counterfeit: z.unknown().describe(
          "Details on the counterfeit enforcement that caused a policy violation.",
        ).optional(),
        destinationMismatch: z.unknown().describe(
          "Details on a mismatch between destination URL types.",
        ).optional(),
        destinationNotWorking: z.unknown().describe(
          "Details for on HTTP or DNS errors related to the ad destination.",
        ).optional(),
        destinationTextList: z.unknown().describe(
          "A list of destination text that violated the policy.",
        ).optional(),
        httpCode: z.unknown().describe(
          "HTTP code returned when the final URL was crawled.",
        ).optional(),
        languageCode: z.unknown().describe(
          'The language the ad was detected to be written in. This field uses IETF language tags, such as "en-US".',
        ).optional(),
        legalRemoval: z.unknown().describe(
          "Legal related regulation enforcement, either from DMCA or local legal regulation.",
        ).optional(),
        regionalRequirements: z.unknown().describe(
          "Trust & Safety (T&S) proactive enforcement for policies meant to address regional requirements. This is considered a Google-owned investigation instead of a regulation notice since it's proactive T&S enforcement.",
        ).optional(),
        textList: z.unknown().describe(
          "A list of fragments of text that violated the policy.",
        ).optional(),
        trademark: z.unknown().describe(
          "Trademark terms that caused a policy violation.",
        ).optional(),
        websiteList: z.unknown().describe(
          "A list of websites that violated the policy.",
        ).optional(),
      })).describe("The evidence used in the policy decision.").optional(),
      policyTopicType: z.enum([
        "AD_POLICY_TOPIC_ENTRY_TYPE_UNKNOWN",
        "PROHIBITED",
        "FULLY_LIMITED",
        "LIMITED",
        "DESCRIPTIVE",
        "BROADENING",
        "AREA_OF_INTEREST_ONLY",
      ]).describe(
        "How ad serving will be affected due to the relation to the ad policy topic.",
      ).optional(),
    })).describe(
      "The entries for each policy topic identified as relating to the ad. Each entry includes the topic, restriction level, and guidance on how to fix policy issues.",
    ).optional(),
  }).describe("A single ad policy associated with an ad group ad.").optional(),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the ad belongs to.",
  ).optional(),
  audioAd: z.object({
    displayUrl: z.string().describe(
      "The webpage address that appears with the ad.",
    ).optional(),
    finalUrl: z.string().describe(
      "The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    trackingUrl: z.string().describe(
      "The URL address loaded in the background for tracking purposes.",
    ).optional(),
    video: z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    }).describe("Details of a YouTube video.").optional(),
  }).describe("Details for an audio ad.").optional(),
  bumperAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string().describe(
        "The text on the call-to-action button.",
      ).optional(),
      actionHeadline: z.string().describe(
        "The headline of the call-to-action banner.",
      ).optional(),
      companionBanner: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.number().int().describe("The height in pixels.")
            .optional(),
          widthPixels: z.number().int().describe("The width in pixels.")
            .optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
      displayUrl: z.string().describe(
        "The webpage address that appears with the ad.",
      ).optional(),
      finalUrl: z.string().describe(
        "The URL address of the webpage that people reach after they click the ad.",
      ).optional(),
      trackingUrl: z.string().describe(
        "The URL address loaded in the background for tracking purposes.",
      ).optional(),
      video: z.object({
        id: z.string().describe(
          "Output only. The YouTube video ID which can be searched on YouTube webpage.",
        ).optional(),
        unavailableReason: z.enum([
          "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
          "VIDEO_UNAVAILABLE_REASON_PRIVATE",
          "VIDEO_UNAVAILABLE_REASON_DELETED",
        ]).describe("The reason why the video data is not available.")
          .optional(),
        videoAssetId: z.string().describe(
          "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
        ).optional(),
      }).describe("Details of a YouTube video.").optional(),
    }).describe(
      "Common attributes for in-stream, non-skippable and bumper ads.",
    ).optional(),
  }).describe("Details for a bumper ad.").optional(),
  dcmTrackingInfo: z.object({
    creativeId: z.string().describe("Required. The DCM creative id.")
      .optional(),
    placementId: z.string().describe("Required. The DCM placement id.")
      .optional(),
    trackingAdId: z.string().describe("Required. The DCM tracking ad id.")
      .optional(),
  }).describe("Details on the DCM tracking.").optional(),
  demandGenCarouselAd: z.object({
    businessName: z.string().describe(
      "Required. The business name shown on the ad.",
    ).optional(),
    cards: z.array(z.object({
      callToAction: z.string().describe(
        "Required. The text on the call-to-action button shown on the card. Must use 10 characters or less.",
      ).optional(),
      finalMobileUrl: z.string().describe(
        "Optional. The URL address of the webpage that people reach after they click the card on a mobile device.",
      ).optional(),
      finalUrl: z.string().describe(
        "Required. The URL address of the webpage that people reach after they click the card.",
      ).optional(),
      headline: z.string().describe("Required. The headline of the card.")
        .optional(),
      marketingImage: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.unknown().describe("The height in pixels.")
            .optional(),
          widthPixels: z.unknown().describe("The width in pixels.").optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
      portraitMarketingImage: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.unknown().describe("The height in pixels.")
            .optional(),
          widthPixels: z.unknown().describe("The width in pixels.").optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
      squareMarketingImage: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.unknown().describe("The height in pixels.")
            .optional(),
          widthPixels: z.unknown().describe("The width in pixels.").optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
    })).describe("Required. The list of cards shown on the ad.").optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "Optional. The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
    description: z.string().describe("Required. The description of the ad.")
      .optional(),
    finalUrl: z.string().describe(
      "Required. The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    finalUrlSuffix: z.string().describe(
      "Optional. The suffix to append to landing page URLs.",
    ).optional(),
    headline: z.string().describe("Required. The headline of the ad.")
      .optional(),
    logo: z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    }).describe("Meta data of an image asset.").optional(),
    trackingUrl: z.string().describe(
      "Output only. The URL address loaded in the background for tracking purposes.",
    ).optional(),
    userSpecifiedTrackingUrl: z.string().describe(
      "Optional. The tracking URL specified by the user manually.",
    ).optional(),
  }).describe("Details for a Demand Gen carousel ad.").optional(),
  demandGenImageAd: z.object({
    businessName: z.string().describe(
      "Required. The business name shown on the ad.",
    ).optional(),
    callToAction: z.string().describe(
      "Required. The call-to-action button shown on the ad.",
    ).optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "Optional. The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
    descriptions: z.array(z.string()).describe(
      "Required. The list of descriptions shown on the ad.",
    ).optional(),
    finalMobileUrl: z.string().describe(
      "Optional. The URL address of the webpage that people reach after they click the ad on a mobile device.",
    ).optional(),
    finalUrl: z.string().describe(
      "Required. The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    finalUrlSuffix: z.string().describe(
      "Optional. The suffix to append to landing page URLs.",
    ).optional(),
    headlines: z.array(z.string()).describe(
      "Required. The list of headlines shown on the ad.",
    ).optional(),
    logoImages: z.array(z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    })).describe("The list of logo images shown on the ad.").optional(),
    marketingImages: z.array(z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    })).describe("The list of marketing images shown on the ad.").optional(),
    portraitMarketingImages: z.array(z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    })).describe("The list of portrait marketing images shown on the ad.")
      .optional(),
    squareMarketingImages: z.array(z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    })).describe("The list of square marketing images shown on the ad.")
      .optional(),
    trackingUrl: z.string().describe(
      "Output only. The URL address loaded in the background for tracking purposes.",
    ).optional(),
    userSpecifiedTrackingUrl: z.string().describe(
      "Optional. The tracking URL specified by the user manually.",
    ).optional(),
  }).describe("Details for a Demand Gen image ad.").optional(),
  demandGenProductAd: z.object({
    businessName: z.string().describe(
      "Required. The business name shown on the ad.",
    ).optional(),
    callToAction: z.enum([
      "CALL_TO_ACTION_UNSPECIFIED",
      "AUTOMATED",
      "LEARN_MORE",
      "GET_QUOTE",
      "APPLY_NOW",
      "SIGN_UP",
      "CONTACT_US",
      "SUBSCRIBE",
      "DOWNLOAD",
      "BOOK_NOW",
      "SHOP_NOW",
      "BUY_NOW",
      "DONATE_NOW",
      "ORDER_NOW",
      "PLAY_NOW",
      "SEE_MORE",
      "START_NOW",
      "VISIT_SITE",
      "WATCH_NOW",
    ]).describe(
      "Required. The call-to-action button shown on the ad. The supported values are: * `AUTOMATED` * `APPLY_NOW` * `BOOK_NOW` * `CONTACT_US` * `DOWNLOAD` * `GET_QUOTE` * `LEARN_MORE` * `SHOP_NOW` * `SIGN_UP` * `SUBSCRIBE`",
    ).optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "Optional. The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
    description: z.string().describe("Required. The description of the ad.")
      .optional(),
    displayUrlBreadcrumb1: z.string().describe(
      "Optional. The first piece after the domain in the display URL.",
    ).optional(),
    displayUrlBreadcrumb2: z.string().describe(
      "Optional. The second piece after the domain in the display URL.",
    ).optional(),
    finalUrl: z.string().describe(
      "Required. The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    finalUrlSuffix: z.string().describe(
      "Optional. The suffix to append to landing page URLs.",
    ).optional(),
    headline: z.string().describe("Required. The headline of the ad.")
      .optional(),
    logo: z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    }).describe("Meta data of an image asset.").optional(),
    trackingUrl: z.string().describe(
      "Output only. The URL address loaded in the background for tracking purposes.",
    ).optional(),
    userSpecifiedTrackingUrl: z.string().describe(
      "Optional. The tracking URL specified by the user manually.",
    ).optional(),
  }).describe("Details for a Demand Gen product ad.").optional(),
  demandGenVideoAd: z.object({
    businessName: z.string().describe(
      "Required. The business name shown on the ad.",
    ).optional(),
    callToAction: z.enum([
      "CALL_TO_ACTION_UNSPECIFIED",
      "AUTOMATED",
      "LEARN_MORE",
      "GET_QUOTE",
      "APPLY_NOW",
      "SIGN_UP",
      "CONTACT_US",
      "SUBSCRIBE",
      "DOWNLOAD",
      "BOOK_NOW",
      "SHOP_NOW",
      "BUY_NOW",
      "DONATE_NOW",
      "ORDER_NOW",
      "PLAY_NOW",
      "SEE_MORE",
      "START_NOW",
      "VISIT_SITE",
      "WATCH_NOW",
    ]).describe(
      "Required. The call-to-action button shown on the ad. The supported values are: * `AUTOMATED` * `LEARN_MORE` * `GET_QUOTE` * `APPLY_NOW` * `SIGN_UP` * `CONTACT_US` * `SUBSCRIBE` * `DOWNLOAD` * `BOOK_NOW` * `SHOP_NOW` * `BUY_NOW` * `DONATE_NOW` * `ORDER_NOW` * `PLAY_NOW` * `SEE_MORE` * `START_NOW` * `VISIT_SITE` * `WATCH_NOW`",
    ).optional(),
    companionBanner: z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    }).describe("Meta data of an image asset.").optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "Optional. The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
    descriptions: z.array(z.string()).describe(
      "Required. The list of descriptions shown on the ad.",
    ).optional(),
    displayUrlBreadcrumb1: z.string().describe(
      "Optional. The first piece after the domain in the display URL.",
    ).optional(),
    displayUrlBreadcrumb2: z.string().describe(
      "Optional. The second piece after the domain in the display URL.",
    ).optional(),
    finalMobileUrl: z.string().describe(
      "Optional. The URL address of the webpage that people reach after they click the ad on a mobile device.",
    ).optional(),
    finalUrl: z.string().describe(
      "Required. The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    finalUrlSuffix: z.string().describe(
      "Optional. The suffix to append to landing page URLs.",
    ).optional(),
    headlines: z.array(z.string()).describe(
      "Required. The list of headlines shown on the ad.",
    ).optional(),
    logo: z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    }).describe("Meta data of an image asset.").optional(),
    longHeadlines: z.array(z.string()).describe(
      "Required. The list of long headlines shown on the ad.",
    ).optional(),
    trackingUrl: z.string().describe(
      "Output only. The URL address loaded in the background for tracking purposes.",
    ).optional(),
    userSpecifiedTrackingUrl: z.string().describe(
      "Optional. The tracking URL specified by the user manually.",
    ).optional(),
    videos: z.array(z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    })).describe("Required. The list of YouTube video assets used by this ad.")
      .optional(),
  }).describe("Details for a Demand Gen video ad.").optional(),
  displayName: z.string().describe(
    "Required. The display name of the ad. Must be UTF-8 encoded with a maximum size of 255 bytes.",
  ).optional(),
  displayVideoSourceAd: z.object({
    creativeId: z.string().describe("The ID of the source creative.")
      .optional(),
  }).describe("The ad sourced from a DV360 creative.").optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe("Required. The entity status of the ad.").optional(),
  inStreamAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string().describe(
        "The text on the call-to-action button.",
      ).optional(),
      actionHeadline: z.string().describe(
        "The headline of the call-to-action banner.",
      ).optional(),
      companionBanner: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.number().int().describe("The height in pixels.")
            .optional(),
          widthPixels: z.number().int().describe("The width in pixels.")
            .optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
      displayUrl: z.string().describe(
        "The webpage address that appears with the ad.",
      ).optional(),
      finalUrl: z.string().describe(
        "The URL address of the webpage that people reach after they click the ad.",
      ).optional(),
      trackingUrl: z.string().describe(
        "The URL address loaded in the background for tracking purposes.",
      ).optional(),
      video: z.object({
        id: z.string().describe(
          "Output only. The YouTube video ID which can be searched on YouTube webpage.",
        ).optional(),
        unavailableReason: z.enum([
          "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
          "VIDEO_UNAVAILABLE_REASON_PRIVATE",
          "VIDEO_UNAVAILABLE_REASON_DELETED",
        ]).describe("The reason why the video data is not available.")
          .optional(),
        videoAssetId: z.string().describe(
          "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
        ).optional(),
      }).describe("Details of a YouTube video.").optional(),
    }).describe(
      "Common attributes for in-stream, non-skippable and bumper ads.",
    ).optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
  }).describe("Details for an in-stream ad.").optional(),
  mastheadAd: z.object({
    autoplayVideoDuration: z.string().describe(
      "The duration of time the video will autoplay.",
    ).optional(),
    autoplayVideoStartMillisecond: z.string().describe(
      "The amount of time in milliseconds after which the video will start to play.",
    ).optional(),
    callToActionButtonLabel: z.string().describe(
      "The text on the call-to-action button.",
    ).optional(),
    callToActionFinalUrl: z.string().describe(
      "The destination URL for the call-to-action button.",
    ).optional(),
    callToActionTrackingUrl: z.string().describe(
      "The tracking URL for the call-to-action button.",
    ).optional(),
    companionYoutubeVideos: z.array(z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    })).describe(
      "The videos that appear next to the Masthead Ad on desktop. Can be no more than two.",
    ).optional(),
    description: z.string().describe("The description of the ad.").optional(),
    headline: z.string().describe("The headline of the ad.").optional(),
    showChannelArt: z.boolean().describe(
      "Whether to show a background or banner that appears at the top of a YouTube page.",
    ).optional(),
    video: z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    }).describe("Details of a YouTube video.").optional(),
    videoAspectRatio: z.enum([
      "VIDEO_ASPECT_RATIO_UNSPECIFIED",
      "VIDEO_ASPECT_RATIO_WIDESCREEN",
      "VIDEO_ASPECT_RATIO_FIXED_16_9",
    ]).describe(
      "The aspect ratio of the autoplaying YouTube video on the Masthead.",
    ).optional(),
  }).describe("Details for a Masthead Ad.").optional(),
  nonSkippableAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string().describe(
        "The text on the call-to-action button.",
      ).optional(),
      actionHeadline: z.string().describe(
        "The headline of the call-to-action banner.",
      ).optional(),
      companionBanner: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.number().int().describe("The height in pixels.")
            .optional(),
          widthPixels: z.number().int().describe("The width in pixels.")
            .optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
      displayUrl: z.string().describe(
        "The webpage address that appears with the ad.",
      ).optional(),
      finalUrl: z.string().describe(
        "The URL address of the webpage that people reach after they click the ad.",
      ).optional(),
      trackingUrl: z.string().describe(
        "The URL address loaded in the background for tracking purposes.",
      ).optional(),
      video: z.object({
        id: z.string().describe(
          "Output only. The YouTube video ID which can be searched on YouTube webpage.",
        ).optional(),
        unavailableReason: z.enum([
          "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
          "VIDEO_UNAVAILABLE_REASON_PRIVATE",
          "VIDEO_UNAVAILABLE_REASON_DELETED",
        ]).describe("The reason why the video data is not available.")
          .optional(),
        videoAssetId: z.string().describe(
          "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
        ).optional(),
      }).describe("Details of a YouTube video.").optional(),
    }).describe(
      "Common attributes for in-stream, non-skippable and bumper ads.",
    ).optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
  }).describe("Details for a non-skippable ad.").optional(),
  videoDiscoverAd: z.object({
    description1: z.string().describe("First text line for the ad.").optional(),
    description2: z.string().describe("Second text line for the ad.")
      .optional(),
    headline: z.string().describe("The headline of ad.").optional(),
    thumbnail: z.enum([
      "THUMBNAIL_UNSPECIFIED",
      "THUMBNAIL_DEFAULT",
      "THUMBNAIL_1",
      "THUMBNAIL_2",
      "THUMBNAIL_3",
    ]).describe("Thumbnail image used in the ad.").optional(),
    video: z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    }).describe("Details of a YouTube video.").optional(),
  }).describe("Details for a video discovery ad.").optional(),
  videoPerformanceAd: z.object({
    actionButtonLabels: z.array(z.string()).describe(
      "The list of text assets shown on the call-to-action button.",
    ).optional(),
    companionBanners: z.array(z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    })).describe("The list of companion banners used by this ad.").optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
    descriptions: z.array(z.string()).describe(
      "The list of descriptions shown on the call-to-action banner.",
    ).optional(),
    displayUrlBreadcrumb1: z.string().describe(
      "The first piece after the domain in the display URL.",
    ).optional(),
    displayUrlBreadcrumb2: z.string().describe(
      "The second piece after the domain in the display URL.",
    ).optional(),
    domain: z.string().describe("The domain of the display URL.").optional(),
    finalUrl: z.string().describe(
      "The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    headlines: z.array(z.string()).describe(
      "The list of headlines shown on the call-to-action banner.",
    ).optional(),
    longHeadlines: z.array(z.string()).describe(
      "The list of long headlines shown on the call-to-action banner.",
    ).optional(),
    trackingUrl: z.string().describe(
      "The URL address loaded in the background for tracking purposes.",
    ).optional(),
    videos: z.array(z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    })).describe("The list of YouTube video assets used by this ad.")
      .optional(),
  }).describe("Details for a video performance ad.").optional(),
});

const StateSchema = z.object({
  adGroupAdId: z.string().optional(),
  adGroupId: z.string().optional(),
  adPolicy: z.object({
    adPolicyApprovalStatus: z.string(),
    adPolicyReviewStatus: z.string(),
    adPolicyTopicEntry: z.array(z.object({
      appealInfo: z.object({
        appealFormLink: z.string(),
        appealType: z.string(),
      }),
      helpCenterLink: z.string(),
      policyDecisionType: z.string(),
      policyEnforcementMeans: z.string(),
      policyLabel: z.string(),
      policyTopic: z.string(),
      policyTopicConstraints: z.array(z.object({
        certificateDomainMismatchCountryList: z.unknown(),
        certificateMissingCountryList: z.unknown(),
        countryConstraint: z.unknown(),
        globalCertificateDomainMismatch: z.unknown(),
        globalCertificateMissing: z.unknown(),
        requestCertificateFormLink: z.unknown(),
        resellerConstraint: z.unknown(),
      })),
      policyTopicDescription: z.string(),
      policyTopicEvidences: z.array(z.object({
        counterfeit: z.unknown(),
        destinationMismatch: z.unknown(),
        destinationNotWorking: z.unknown(),
        destinationTextList: z.unknown(),
        httpCode: z.unknown(),
        languageCode: z.unknown(),
        legalRemoval: z.unknown(),
        regionalRequirements: z.unknown(),
        textList: z.unknown(),
        trademark: z.unknown(),
        websiteList: z.unknown(),
      })),
      policyTopicType: z.string(),
    })),
  }).optional(),
  adUrls: z.array(z.object({
    type: z.string(),
    url: z.string(),
  })).optional(),
  advertiserId: z.string().optional(),
  audioAd: z.object({
    displayUrl: z.string(),
    finalUrl: z.string(),
    trackingUrl: z.string(),
    video: z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    }),
  }).optional(),
  bumperAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string(),
      actionHeadline: z.string(),
      companionBanner: z.object({
        assetId: z.string(),
        fileSize: z.string(),
        fullSize: z.object({
          heightPixels: z.number(),
          widthPixels: z.number(),
        }),
        mimeType: z.string(),
      }),
      displayUrl: z.string(),
      finalUrl: z.string(),
      trackingUrl: z.string(),
      video: z.object({
        id: z.string(),
        unavailableReason: z.string(),
        videoAssetId: z.string(),
      }),
    }),
  }).optional(),
  dcmTrackingInfo: z.object({
    creativeId: z.string(),
    placementId: z.string(),
    trackingAdId: z.string(),
  }).optional(),
  demandGenCarouselAd: z.object({
    businessName: z.string(),
    cards: z.array(z.object({
      callToAction: z.string(),
      finalMobileUrl: z.string(),
      finalUrl: z.string(),
      headline: z.string(),
      marketingImage: z.object({
        assetId: z.string(),
        fileSize: z.string(),
        fullSize: z.object({
          heightPixels: z.unknown(),
          widthPixels: z.unknown(),
        }),
        mimeType: z.string(),
      }),
      portraitMarketingImage: z.object({
        assetId: z.string(),
        fileSize: z.string(),
        fullSize: z.object({
          heightPixels: z.unknown(),
          widthPixels: z.unknown(),
        }),
        mimeType: z.string(),
      }),
      squareMarketingImage: z.object({
        assetId: z.string(),
        fileSize: z.string(),
        fullSize: z.object({
          heightPixels: z.unknown(),
          widthPixels: z.unknown(),
        }),
        mimeType: z.string(),
      }),
    })),
    customParameters: z.record(z.string(), z.unknown()),
    description: z.string(),
    finalUrl: z.string(),
    finalUrlSuffix: z.string(),
    headline: z.string(),
    logo: z.object({
      assetId: z.string(),
      fileSize: z.string(),
      fullSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
      mimeType: z.string(),
    }),
    trackingUrl: z.string(),
    userSpecifiedTrackingUrl: z.string(),
  }).optional(),
  demandGenImageAd: z.object({
    businessName: z.string(),
    callToAction: z.string(),
    customParameters: z.record(z.string(), z.unknown()),
    descriptions: z.array(z.string()),
    finalMobileUrl: z.string(),
    finalUrl: z.string(),
    finalUrlSuffix: z.string(),
    headlines: z.array(z.string()),
    logoImages: z.array(z.object({
      assetId: z.string(),
      fileSize: z.string(),
      fullSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
      mimeType: z.string(),
    })),
    marketingImages: z.array(z.object({
      assetId: z.string(),
      fileSize: z.string(),
      fullSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
      mimeType: z.string(),
    })),
    portraitMarketingImages: z.array(z.object({
      assetId: z.string(),
      fileSize: z.string(),
      fullSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
      mimeType: z.string(),
    })),
    squareMarketingImages: z.array(z.object({
      assetId: z.string(),
      fileSize: z.string(),
      fullSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
      mimeType: z.string(),
    })),
    trackingUrl: z.string(),
    userSpecifiedTrackingUrl: z.string(),
  }).optional(),
  demandGenProductAd: z.object({
    businessName: z.string(),
    callToAction: z.string(),
    customParameters: z.record(z.string(), z.unknown()),
    description: z.string(),
    displayUrlBreadcrumb1: z.string(),
    displayUrlBreadcrumb2: z.string(),
    finalUrl: z.string(),
    finalUrlSuffix: z.string(),
    headline: z.string(),
    logo: z.object({
      assetId: z.string(),
      fileSize: z.string(),
      fullSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
      mimeType: z.string(),
    }),
    trackingUrl: z.string(),
    userSpecifiedTrackingUrl: z.string(),
  }).optional(),
  demandGenVideoAd: z.object({
    businessName: z.string(),
    callToAction: z.string(),
    companionBanner: z.object({
      assetId: z.string(),
      fileSize: z.string(),
      fullSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
      mimeType: z.string(),
    }),
    customParameters: z.record(z.string(), z.unknown()),
    descriptions: z.array(z.string()),
    displayUrlBreadcrumb1: z.string(),
    displayUrlBreadcrumb2: z.string(),
    finalMobileUrl: z.string(),
    finalUrl: z.string(),
    finalUrlSuffix: z.string(),
    headlines: z.array(z.string()),
    logo: z.object({
      assetId: z.string(),
      fileSize: z.string(),
      fullSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
      mimeType: z.string(),
    }),
    longHeadlines: z.array(z.string()),
    trackingUrl: z.string(),
    userSpecifiedTrackingUrl: z.string(),
    videos: z.array(z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    })),
  }).optional(),
  displayName: z.string().optional(),
  displayVideoSourceAd: z.object({
    creativeId: z.string(),
  }).optional(),
  entityStatus: z.string().optional(),
  inStreamAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string(),
      actionHeadline: z.string(),
      companionBanner: z.object({
        assetId: z.string(),
        fileSize: z.string(),
        fullSize: z.object({
          heightPixels: z.number(),
          widthPixels: z.number(),
        }),
        mimeType: z.string(),
      }),
      displayUrl: z.string(),
      finalUrl: z.string(),
      trackingUrl: z.string(),
      video: z.object({
        id: z.string(),
        unavailableReason: z.string(),
        videoAssetId: z.string(),
      }),
    }),
    customParameters: z.record(z.string(), z.unknown()),
  }).optional(),
  mastheadAd: z.object({
    autoplayVideoDuration: z.string(),
    autoplayVideoStartMillisecond: z.string(),
    callToActionButtonLabel: z.string(),
    callToActionFinalUrl: z.string(),
    callToActionTrackingUrl: z.string(),
    companionYoutubeVideos: z.array(z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    })),
    description: z.string(),
    headline: z.string(),
    showChannelArt: z.boolean(),
    video: z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    }),
    videoAspectRatio: z.string(),
  }).optional(),
  name: z.string(),
  nonSkippableAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string(),
      actionHeadline: z.string(),
      companionBanner: z.object({
        assetId: z.string(),
        fileSize: z.string(),
        fullSize: z.object({
          heightPixels: z.number(),
          widthPixels: z.number(),
        }),
        mimeType: z.string(),
      }),
      displayUrl: z.string(),
      finalUrl: z.string(),
      trackingUrl: z.string(),
      video: z.object({
        id: z.string(),
        unavailableReason: z.string(),
        videoAssetId: z.string(),
      }),
    }),
    customParameters: z.record(z.string(), z.unknown()),
  }).optional(),
  videoDiscoverAd: z.object({
    description1: z.string(),
    description2: z.string(),
    headline: z.string(),
    thumbnail: z.string(),
    video: z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    }),
  }).optional(),
  videoPerformanceAd: z.object({
    actionButtonLabels: z.array(z.string()),
    companionBanners: z.array(z.object({
      assetId: z.string(),
      fileSize: z.string(),
      fullSize: z.object({
        heightPixels: z.number(),
        widthPixels: z.number(),
      }),
      mimeType: z.string(),
    })),
    customParameters: z.record(z.string(), z.unknown()),
    descriptions: z.array(z.string()),
    displayUrlBreadcrumb1: z.string(),
    displayUrlBreadcrumb2: z.string(),
    domain: z.string(),
    finalUrl: z.string(),
    headlines: z.array(z.string()),
    longHeadlines: z.array(z.string()),
    trackingUrl: z.string(),
    videos: z.array(z.object({
      id: z.string(),
      unavailableReason: z.string(),
      videoAssetId: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  adGroupId: z.string().describe(
    "Required. Immutable. The unique ID of the ad group that the ad belongs to.",
  ).optional(),
  adPolicy: z.object({
    adPolicyApprovalStatus: z.enum([
      "AD_POLICY_APPROVAL_STATUS_UNKNOWN",
      "DISAPPROVED",
      "APPROVED_LIMITED",
      "APPROVED",
      "AREA_OF_INTEREST_ONLY",
    ]).describe(
      "The policy approval status of an ad, indicating the approval decision.",
    ).optional(),
    adPolicyReviewStatus: z.enum([
      "AD_POLICY_REVIEW_STATUS_UNKNOWN",
      "REVIEW_IN_PROGRESS",
      "REVIEWED",
      "UNDER_APPEAL",
      "ELIGIBLE_MAY_SERVE",
    ]).describe(
      "The policy review status of an ad, indicating where in the review process the ad is currently.",
    ).optional(),
    adPolicyTopicEntry: z.array(z.object({
      appealInfo: z.object({
        appealFormLink: z.string().describe(
          "Only available when appeal_type is `APPEAL_FORM`.",
        ).optional(),
        appealType: z.enum([
          "AD_POLICY_APPEAL_TYPE_UNKNOWN",
          "SELF_SERVICE_APPEAL",
          "APPEAL_FORM",
        ]).describe(
          "Whether the decision can be appealed through a self-service appeal or an appeal form.",
        ).optional(),
      }).describe("Information on how to appeal a policy decision.").optional(),
      helpCenterLink: z.string().describe(
        "Ad policy help center link for the policy topic.",
      ).optional(),
      policyDecisionType: z.enum([
        "AD_POLICY_DECISION_TYPE_UNKNOWN",
        "PURSUANT_TO_NOTICE",
        "GOOGLE_INVESTIGATION",
      ]).describe("The source of the policy decision.").optional(),
      policyEnforcementMeans: z.enum([
        "AD_POLICY_ENFORCEMENT_MEANS_UNKNOWN",
        "AUTOMATED",
        "HUMAN_REVIEW",
      ]).describe("The policy enforcement means used in the policy review.")
        .optional(),
      policyLabel: z.string().describe(
        'Localized label text for policy. Examples include "Trademarks in text", "Contains Alcohol", etc.',
      ).optional(),
      policyTopic: z.string().describe(
        'The policy topic. Examples include "TRADEMARKS", "ALCOHOL", etc.',
      ).optional(),
      policyTopicConstraints: z.array(z.object({
        certificateDomainMismatchCountryList: z.unknown().describe(
          "A list of countries where the ad cannot serve due to policy constraints.",
        ).optional(),
        certificateMissingCountryList: z.unknown().describe(
          "A list of countries where the ad cannot serve due to policy constraints.",
        ).optional(),
        countryConstraint: z.unknown().describe(
          "A list of countries where the ad cannot serve due to policy constraints.",
        ).optional(),
        globalCertificateDomainMismatch: z.unknown().describe(
          "Certificate is required to serve in any country and the existing certificate does not cover the ad's domain.",
        ).optional(),
        globalCertificateMissing: z.unknown().describe(
          "Certificate is required to serve in any country.",
        ).optional(),
        requestCertificateFormLink: z.unknown().describe(
          "Link to the form to request a certificate for the constraint.",
        ).optional(),
        resellerConstraint: z.unknown().describe(
          "Policy topic was constrained due to disapproval of the website for reseller purposes.",
        ).optional(),
      })).describe("The serving constraints relevant to the policy decision.")
        .optional(),
      policyTopicDescription: z.string().describe(
        "A short summary description of the policy topic.",
      ).optional(),
      policyTopicEvidences: z.array(z.object({
        counterfeit: z.unknown().describe(
          "Details on the counterfeit enforcement that caused a policy violation.",
        ).optional(),
        destinationMismatch: z.unknown().describe(
          "Details on a mismatch between destination URL types.",
        ).optional(),
        destinationNotWorking: z.unknown().describe(
          "Details for on HTTP or DNS errors related to the ad destination.",
        ).optional(),
        destinationTextList: z.unknown().describe(
          "A list of destination text that violated the policy.",
        ).optional(),
        httpCode: z.unknown().describe(
          "HTTP code returned when the final URL was crawled.",
        ).optional(),
        languageCode: z.unknown().describe(
          'The language the ad was detected to be written in. This field uses IETF language tags, such as "en-US".',
        ).optional(),
        legalRemoval: z.unknown().describe(
          "Legal related regulation enforcement, either from DMCA or local legal regulation.",
        ).optional(),
        regionalRequirements: z.unknown().describe(
          "Trust & Safety (T&S) proactive enforcement for policies meant to address regional requirements. This is considered a Google-owned investigation instead of a regulation notice since it's proactive T&S enforcement.",
        ).optional(),
        textList: z.unknown().describe(
          "A list of fragments of text that violated the policy.",
        ).optional(),
        trademark: z.unknown().describe(
          "Trademark terms that caused a policy violation.",
        ).optional(),
        websiteList: z.unknown().describe(
          "A list of websites that violated the policy.",
        ).optional(),
      })).describe("The evidence used in the policy decision.").optional(),
      policyTopicType: z.enum([
        "AD_POLICY_TOPIC_ENTRY_TYPE_UNKNOWN",
        "PROHIBITED",
        "FULLY_LIMITED",
        "LIMITED",
        "DESCRIPTIVE",
        "BROADENING",
        "AREA_OF_INTEREST_ONLY",
      ]).describe(
        "How ad serving will be affected due to the relation to the ad policy topic.",
      ).optional(),
    })).describe(
      "The entries for each policy topic identified as relating to the ad. Each entry includes the topic, restriction level, and guidance on how to fix policy issues.",
    ).optional(),
  }).describe("A single ad policy associated with an ad group ad.").optional(),
  advertiserId: z.string().describe(
    "Output only. The unique ID of the advertiser the ad belongs to.",
  ).optional(),
  audioAd: z.object({
    displayUrl: z.string().describe(
      "The webpage address that appears with the ad.",
    ).optional(),
    finalUrl: z.string().describe(
      "The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    trackingUrl: z.string().describe(
      "The URL address loaded in the background for tracking purposes.",
    ).optional(),
    video: z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    }).describe("Details of a YouTube video.").optional(),
  }).describe("Details for an audio ad.").optional(),
  bumperAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string().describe(
        "The text on the call-to-action button.",
      ).optional(),
      actionHeadline: z.string().describe(
        "The headline of the call-to-action banner.",
      ).optional(),
      companionBanner: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.number().int().describe("The height in pixels.")
            .optional(),
          widthPixels: z.number().int().describe("The width in pixels.")
            .optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
      displayUrl: z.string().describe(
        "The webpage address that appears with the ad.",
      ).optional(),
      finalUrl: z.string().describe(
        "The URL address of the webpage that people reach after they click the ad.",
      ).optional(),
      trackingUrl: z.string().describe(
        "The URL address loaded in the background for tracking purposes.",
      ).optional(),
      video: z.object({
        id: z.string().describe(
          "Output only. The YouTube video ID which can be searched on YouTube webpage.",
        ).optional(),
        unavailableReason: z.enum([
          "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
          "VIDEO_UNAVAILABLE_REASON_PRIVATE",
          "VIDEO_UNAVAILABLE_REASON_DELETED",
        ]).describe("The reason why the video data is not available.")
          .optional(),
        videoAssetId: z.string().describe(
          "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
        ).optional(),
      }).describe("Details of a YouTube video.").optional(),
    }).describe(
      "Common attributes for in-stream, non-skippable and bumper ads.",
    ).optional(),
  }).describe("Details for a bumper ad.").optional(),
  dcmTrackingInfo: z.object({
    creativeId: z.string().describe("Required. The DCM creative id.")
      .optional(),
    placementId: z.string().describe("Required. The DCM placement id.")
      .optional(),
    trackingAdId: z.string().describe("Required. The DCM tracking ad id.")
      .optional(),
  }).describe("Details on the DCM tracking.").optional(),
  demandGenCarouselAd: z.object({
    businessName: z.string().describe(
      "Required. The business name shown on the ad.",
    ).optional(),
    cards: z.array(z.object({
      callToAction: z.string().describe(
        "Required. The text on the call-to-action button shown on the card. Must use 10 characters or less.",
      ).optional(),
      finalMobileUrl: z.string().describe(
        "Optional. The URL address of the webpage that people reach after they click the card on a mobile device.",
      ).optional(),
      finalUrl: z.string().describe(
        "Required. The URL address of the webpage that people reach after they click the card.",
      ).optional(),
      headline: z.string().describe("Required. The headline of the card.")
        .optional(),
      marketingImage: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.unknown().describe("The height in pixels.")
            .optional(),
          widthPixels: z.unknown().describe("The width in pixels.").optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
      portraitMarketingImage: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.unknown().describe("The height in pixels.")
            .optional(),
          widthPixels: z.unknown().describe("The width in pixels.").optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
      squareMarketingImage: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.unknown().describe("The height in pixels.")
            .optional(),
          widthPixels: z.unknown().describe("The width in pixels.").optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
    })).describe("Required. The list of cards shown on the ad.").optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "Optional. The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
    description: z.string().describe("Required. The description of the ad.")
      .optional(),
    finalUrl: z.string().describe(
      "Required. The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    finalUrlSuffix: z.string().describe(
      "Optional. The suffix to append to landing page URLs.",
    ).optional(),
    headline: z.string().describe("Required. The headline of the ad.")
      .optional(),
    logo: z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    }).describe("Meta data of an image asset.").optional(),
    trackingUrl: z.string().describe(
      "Output only. The URL address loaded in the background for tracking purposes.",
    ).optional(),
    userSpecifiedTrackingUrl: z.string().describe(
      "Optional. The tracking URL specified by the user manually.",
    ).optional(),
  }).describe("Details for a Demand Gen carousel ad.").optional(),
  demandGenImageAd: z.object({
    businessName: z.string().describe(
      "Required. The business name shown on the ad.",
    ).optional(),
    callToAction: z.string().describe(
      "Required. The call-to-action button shown on the ad.",
    ).optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "Optional. The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
    descriptions: z.array(z.string()).describe(
      "Required. The list of descriptions shown on the ad.",
    ).optional(),
    finalMobileUrl: z.string().describe(
      "Optional. The URL address of the webpage that people reach after they click the ad on a mobile device.",
    ).optional(),
    finalUrl: z.string().describe(
      "Required. The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    finalUrlSuffix: z.string().describe(
      "Optional. The suffix to append to landing page URLs.",
    ).optional(),
    headlines: z.array(z.string()).describe(
      "Required. The list of headlines shown on the ad.",
    ).optional(),
    logoImages: z.array(z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    })).describe("The list of logo images shown on the ad.").optional(),
    marketingImages: z.array(z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    })).describe("The list of marketing images shown on the ad.").optional(),
    portraitMarketingImages: z.array(z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    })).describe("The list of portrait marketing images shown on the ad.")
      .optional(),
    squareMarketingImages: z.array(z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    })).describe("The list of square marketing images shown on the ad.")
      .optional(),
    trackingUrl: z.string().describe(
      "Output only. The URL address loaded in the background for tracking purposes.",
    ).optional(),
    userSpecifiedTrackingUrl: z.string().describe(
      "Optional. The tracking URL specified by the user manually.",
    ).optional(),
  }).describe("Details for a Demand Gen image ad.").optional(),
  demandGenProductAd: z.object({
    businessName: z.string().describe(
      "Required. The business name shown on the ad.",
    ).optional(),
    callToAction: z.enum([
      "CALL_TO_ACTION_UNSPECIFIED",
      "AUTOMATED",
      "LEARN_MORE",
      "GET_QUOTE",
      "APPLY_NOW",
      "SIGN_UP",
      "CONTACT_US",
      "SUBSCRIBE",
      "DOWNLOAD",
      "BOOK_NOW",
      "SHOP_NOW",
      "BUY_NOW",
      "DONATE_NOW",
      "ORDER_NOW",
      "PLAY_NOW",
      "SEE_MORE",
      "START_NOW",
      "VISIT_SITE",
      "WATCH_NOW",
    ]).describe(
      "Required. The call-to-action button shown on the ad. The supported values are: * `AUTOMATED` * `APPLY_NOW` * `BOOK_NOW` * `CONTACT_US` * `DOWNLOAD` * `GET_QUOTE` * `LEARN_MORE` * `SHOP_NOW` * `SIGN_UP` * `SUBSCRIBE`",
    ).optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "Optional. The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
    description: z.string().describe("Required. The description of the ad.")
      .optional(),
    displayUrlBreadcrumb1: z.string().describe(
      "Optional. The first piece after the domain in the display URL.",
    ).optional(),
    displayUrlBreadcrumb2: z.string().describe(
      "Optional. The second piece after the domain in the display URL.",
    ).optional(),
    finalUrl: z.string().describe(
      "Required. The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    finalUrlSuffix: z.string().describe(
      "Optional. The suffix to append to landing page URLs.",
    ).optional(),
    headline: z.string().describe("Required. The headline of the ad.")
      .optional(),
    logo: z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    }).describe("Meta data of an image asset.").optional(),
    trackingUrl: z.string().describe(
      "Output only. The URL address loaded in the background for tracking purposes.",
    ).optional(),
    userSpecifiedTrackingUrl: z.string().describe(
      "Optional. The tracking URL specified by the user manually.",
    ).optional(),
  }).describe("Details for a Demand Gen product ad.").optional(),
  demandGenVideoAd: z.object({
    businessName: z.string().describe(
      "Required. The business name shown on the ad.",
    ).optional(),
    callToAction: z.enum([
      "CALL_TO_ACTION_UNSPECIFIED",
      "AUTOMATED",
      "LEARN_MORE",
      "GET_QUOTE",
      "APPLY_NOW",
      "SIGN_UP",
      "CONTACT_US",
      "SUBSCRIBE",
      "DOWNLOAD",
      "BOOK_NOW",
      "SHOP_NOW",
      "BUY_NOW",
      "DONATE_NOW",
      "ORDER_NOW",
      "PLAY_NOW",
      "SEE_MORE",
      "START_NOW",
      "VISIT_SITE",
      "WATCH_NOW",
    ]).describe(
      "Required. The call-to-action button shown on the ad. The supported values are: * `AUTOMATED` * `LEARN_MORE` * `GET_QUOTE` * `APPLY_NOW` * `SIGN_UP` * `CONTACT_US` * `SUBSCRIBE` * `DOWNLOAD` * `BOOK_NOW` * `SHOP_NOW` * `BUY_NOW` * `DONATE_NOW` * `ORDER_NOW` * `PLAY_NOW` * `SEE_MORE` * `START_NOW` * `VISIT_SITE` * `WATCH_NOW`",
    ).optional(),
    companionBanner: z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    }).describe("Meta data of an image asset.").optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "Optional. The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
    descriptions: z.array(z.string()).describe(
      "Required. The list of descriptions shown on the ad.",
    ).optional(),
    displayUrlBreadcrumb1: z.string().describe(
      "Optional. The first piece after the domain in the display URL.",
    ).optional(),
    displayUrlBreadcrumb2: z.string().describe(
      "Optional. The second piece after the domain in the display URL.",
    ).optional(),
    finalMobileUrl: z.string().describe(
      "Optional. The URL address of the webpage that people reach after they click the ad on a mobile device.",
    ).optional(),
    finalUrl: z.string().describe(
      "Required. The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    finalUrlSuffix: z.string().describe(
      "Optional. The suffix to append to landing page URLs.",
    ).optional(),
    headlines: z.array(z.string()).describe(
      "Required. The list of headlines shown on the ad.",
    ).optional(),
    logo: z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    }).describe("Meta data of an image asset.").optional(),
    longHeadlines: z.array(z.string()).describe(
      "Required. The list of long headlines shown on the ad.",
    ).optional(),
    trackingUrl: z.string().describe(
      "Output only. The URL address loaded in the background for tracking purposes.",
    ).optional(),
    userSpecifiedTrackingUrl: z.string().describe(
      "Optional. The tracking URL specified by the user manually.",
    ).optional(),
    videos: z.array(z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    })).describe("Required. The list of YouTube video assets used by this ad.")
      .optional(),
  }).describe("Details for a Demand Gen video ad.").optional(),
  displayName: z.string().describe(
    "Required. The display name of the ad. Must be UTF-8 encoded with a maximum size of 255 bytes.",
  ).optional(),
  displayVideoSourceAd: z.object({
    creativeId: z.string().describe("The ID of the source creative.")
      .optional(),
  }).describe("The ad sourced from a DV360 creative.").optional(),
  entityStatus: z.enum([
    "ENTITY_STATUS_UNSPECIFIED",
    "ENTITY_STATUS_ACTIVE",
    "ENTITY_STATUS_ARCHIVED",
    "ENTITY_STATUS_DRAFT",
    "ENTITY_STATUS_PAUSED",
    "ENTITY_STATUS_SCHEDULED_FOR_DELETION",
  ]).describe("Required. The entity status of the ad.").optional(),
  inStreamAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string().describe(
        "The text on the call-to-action button.",
      ).optional(),
      actionHeadline: z.string().describe(
        "The headline of the call-to-action banner.",
      ).optional(),
      companionBanner: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.number().int().describe("The height in pixels.")
            .optional(),
          widthPixels: z.number().int().describe("The width in pixels.")
            .optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
      displayUrl: z.string().describe(
        "The webpage address that appears with the ad.",
      ).optional(),
      finalUrl: z.string().describe(
        "The URL address of the webpage that people reach after they click the ad.",
      ).optional(),
      trackingUrl: z.string().describe(
        "The URL address loaded in the background for tracking purposes.",
      ).optional(),
      video: z.object({
        id: z.string().describe(
          "Output only. The YouTube video ID which can be searched on YouTube webpage.",
        ).optional(),
        unavailableReason: z.enum([
          "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
          "VIDEO_UNAVAILABLE_REASON_PRIVATE",
          "VIDEO_UNAVAILABLE_REASON_DELETED",
        ]).describe("The reason why the video data is not available.")
          .optional(),
        videoAssetId: z.string().describe(
          "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
        ).optional(),
      }).describe("Details of a YouTube video.").optional(),
    }).describe(
      "Common attributes for in-stream, non-skippable and bumper ads.",
    ).optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
  }).describe("Details for an in-stream ad.").optional(),
  mastheadAd: z.object({
    autoplayVideoDuration: z.string().describe(
      "The duration of time the video will autoplay.",
    ).optional(),
    autoplayVideoStartMillisecond: z.string().describe(
      "The amount of time in milliseconds after which the video will start to play.",
    ).optional(),
    callToActionButtonLabel: z.string().describe(
      "The text on the call-to-action button.",
    ).optional(),
    callToActionFinalUrl: z.string().describe(
      "The destination URL for the call-to-action button.",
    ).optional(),
    callToActionTrackingUrl: z.string().describe(
      "The tracking URL for the call-to-action button.",
    ).optional(),
    companionYoutubeVideos: z.array(z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    })).describe(
      "The videos that appear next to the Masthead Ad on desktop. Can be no more than two.",
    ).optional(),
    description: z.string().describe("The description of the ad.").optional(),
    headline: z.string().describe("The headline of the ad.").optional(),
    showChannelArt: z.boolean().describe(
      "Whether to show a background or banner that appears at the top of a YouTube page.",
    ).optional(),
    video: z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    }).describe("Details of a YouTube video.").optional(),
    videoAspectRatio: z.enum([
      "VIDEO_ASPECT_RATIO_UNSPECIFIED",
      "VIDEO_ASPECT_RATIO_WIDESCREEN",
      "VIDEO_ASPECT_RATIO_FIXED_16_9",
    ]).describe(
      "The aspect ratio of the autoplaying YouTube video on the Masthead.",
    ).optional(),
  }).describe("Details for a Masthead Ad.").optional(),
  nonSkippableAd: z.object({
    commonInStreamAttribute: z.object({
      actionButtonLabel: z.string().describe(
        "The text on the call-to-action button.",
      ).optional(),
      actionHeadline: z.string().describe(
        "The headline of the call-to-action banner.",
      ).optional(),
      companionBanner: z.object({
        assetId: z.string().describe("Required. The unique ID of the asset.")
          .optional(),
        fileSize: z.string().describe(
          "Output only. File size of the image asset in bytes.",
        ).optional(),
        fullSize: z.object({
          heightPixels: z.number().int().describe("The height in pixels.")
            .optional(),
          widthPixels: z.number().int().describe("The width in pixels.")
            .optional(),
        }).describe("Dimensions.").optional(),
        mimeType: z.string().describe(
          "Output only. MIME type of the image asset.",
        ).optional(),
      }).describe("Meta data of an image asset.").optional(),
      displayUrl: z.string().describe(
        "The webpage address that appears with the ad.",
      ).optional(),
      finalUrl: z.string().describe(
        "The URL address of the webpage that people reach after they click the ad.",
      ).optional(),
      trackingUrl: z.string().describe(
        "The URL address loaded in the background for tracking purposes.",
      ).optional(),
      video: z.object({
        id: z.string().describe(
          "Output only. The YouTube video ID which can be searched on YouTube webpage.",
        ).optional(),
        unavailableReason: z.enum([
          "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
          "VIDEO_UNAVAILABLE_REASON_PRIVATE",
          "VIDEO_UNAVAILABLE_REASON_DELETED",
        ]).describe("The reason why the video data is not available.")
          .optional(),
        videoAssetId: z.string().describe(
          "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
        ).optional(),
      }).describe("Details of a YouTube video.").optional(),
    }).describe(
      "Common attributes for in-stream, non-skippable and bumper ads.",
    ).optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
  }).describe("Details for a non-skippable ad.").optional(),
  videoDiscoverAd: z.object({
    description1: z.string().describe("First text line for the ad.").optional(),
    description2: z.string().describe("Second text line for the ad.")
      .optional(),
    headline: z.string().describe("The headline of ad.").optional(),
    thumbnail: z.enum([
      "THUMBNAIL_UNSPECIFIED",
      "THUMBNAIL_DEFAULT",
      "THUMBNAIL_1",
      "THUMBNAIL_2",
      "THUMBNAIL_3",
    ]).describe("Thumbnail image used in the ad.").optional(),
    video: z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    }).describe("Details of a YouTube video.").optional(),
  }).describe("Details for a video discovery ad.").optional(),
  videoPerformanceAd: z.object({
    actionButtonLabels: z.array(z.string()).describe(
      "The list of text assets shown on the call-to-action button.",
    ).optional(),
    companionBanners: z.array(z.object({
      assetId: z.string().describe("Required. The unique ID of the asset.")
        .optional(),
      fileSize: z.string().describe(
        "Output only. File size of the image asset in bytes.",
      ).optional(),
      fullSize: z.object({
        heightPixels: z.number().int().describe("The height in pixels.")
          .optional(),
        widthPixels: z.number().int().describe("The width in pixels.")
          .optional(),
      }).describe("Dimensions.").optional(),
      mimeType: z.string().describe(
        "Output only. MIME type of the image asset.",
      ).optional(),
    })).describe("The list of companion banners used by this ad.").optional(),
    customParameters: z.record(z.string(), z.string()).describe(
      "The custom parameters and accompanying values to add to the tracking URL.",
    ).optional(),
    descriptions: z.array(z.string()).describe(
      "The list of descriptions shown on the call-to-action banner.",
    ).optional(),
    displayUrlBreadcrumb1: z.string().describe(
      "The first piece after the domain in the display URL.",
    ).optional(),
    displayUrlBreadcrumb2: z.string().describe(
      "The second piece after the domain in the display URL.",
    ).optional(),
    domain: z.string().describe("The domain of the display URL.").optional(),
    finalUrl: z.string().describe(
      "The URL address of the webpage that people reach after they click the ad.",
    ).optional(),
    headlines: z.array(z.string()).describe(
      "The list of headlines shown on the call-to-action banner.",
    ).optional(),
    longHeadlines: z.array(z.string()).describe(
      "The list of long headlines shown on the call-to-action banner.",
    ).optional(),
    trackingUrl: z.string().describe(
      "The URL address loaded in the background for tracking purposes.",
    ).optional(),
    videos: z.array(z.object({
      id: z.string().describe(
        "Output only. The YouTube video ID which can be searched on YouTube webpage.",
      ).optional(),
      unavailableReason: z.enum([
        "VIDEO_UNAVAILABLE_REASON_UNSPECIFIED",
        "VIDEO_UNAVAILABLE_REASON_PRIVATE",
        "VIDEO_UNAVAILABLE_REASON_DELETED",
      ]).describe("The reason why the video data is not available.").optional(),
      videoAssetId: z.string().describe(
        "Required. The YouTube video asset id. This is the adAssetId of an AdAsset resource.",
      ).optional(),
    })).describe("The list of YouTube video assets used by this ad.")
      .optional(),
  }).describe("Details for a video performance ad.").optional(),
});

/** Swamp extension model for Google Cloud Display & Video 360 Advertisers.AdGroupAds. Registered at `@swamp/gcp/displayvideo/advertisers-adgroupads`. */
export const model = {
  type: "@swamp/gcp/displayvideo/advertisers-adgroupads",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
      description: "Added: dcmTrackingInfo",
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
      toVersion: "2026.05.18.1",
      description: "Removed: dcmTrackingInfo",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dcmTrackingInfo: _dcmTrackingInfo, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: dcmTrackingInfo",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "Removed: dcmTrackingInfo",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { dcmTrackingInfo: _dcmTrackingInfo, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: dcmTrackingInfo",
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
      description: "A single ad associated with an ad group.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a adGroupAds",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["adGroupId"] !== undefined) body["adGroupId"] = g["adGroupId"];
        if (g["adPolicy"] !== undefined) body["adPolicy"] = g["adPolicy"];
        if (g["audioAd"] !== undefined) body["audioAd"] = g["audioAd"];
        if (g["bumperAd"] !== undefined) body["bumperAd"] = g["bumperAd"];
        if (g["dcmTrackingInfo"] !== undefined) {
          body["dcmTrackingInfo"] = g["dcmTrackingInfo"];
        }
        if (g["demandGenCarouselAd"] !== undefined) {
          body["demandGenCarouselAd"] = g["demandGenCarouselAd"];
        }
        if (g["demandGenImageAd"] !== undefined) {
          body["demandGenImageAd"] = g["demandGenImageAd"];
        }
        if (g["demandGenProductAd"] !== undefined) {
          body["demandGenProductAd"] = g["demandGenProductAd"];
        }
        if (g["demandGenVideoAd"] !== undefined) {
          body["demandGenVideoAd"] = g["demandGenVideoAd"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["displayVideoSourceAd"] !== undefined) {
          body["displayVideoSourceAd"] = g["displayVideoSourceAd"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["inStreamAd"] !== undefined) body["inStreamAd"] = g["inStreamAd"];
        if (g["mastheadAd"] !== undefined) body["mastheadAd"] = g["mastheadAd"];
        if (g["nonSkippableAd"] !== undefined) {
          body["nonSkippableAd"] = g["nonSkippableAd"];
        }
        if (g["videoDiscoverAd"] !== undefined) {
          body["videoDiscoverAd"] = g["videoDiscoverAd"];
        }
        if (g["videoPerformanceAd"] !== undefined) {
          body["videoPerformanceAd"] = g["videoPerformanceAd"];
        }
        if (g["name"] !== undefined) params["adGroupAdId"] = String(g["name"]);
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
      description: "Get a adGroupAds",
      arguments: z.object({
        identifier: z.string().describe("The name of the adGroupAds"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["adGroupAdId"] = args.identifier;
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
      description: "Update adGroupAds attributes",
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
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        } else if (existing["advertiserId"]) {
          params["advertiserId"] = String(existing["advertiserId"]);
        }
        params["adGroupAdId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["adPolicy"] !== undefined) body["adPolicy"] = g["adPolicy"];
        if (g["audioAd"] !== undefined) body["audioAd"] = g["audioAd"];
        if (g["bumperAd"] !== undefined) body["bumperAd"] = g["bumperAd"];
        if (g["dcmTrackingInfo"] !== undefined) {
          body["dcmTrackingInfo"] = g["dcmTrackingInfo"];
        }
        if (g["demandGenCarouselAd"] !== undefined) {
          body["demandGenCarouselAd"] = g["demandGenCarouselAd"];
        }
        if (g["demandGenImageAd"] !== undefined) {
          body["demandGenImageAd"] = g["demandGenImageAd"];
        }
        if (g["demandGenProductAd"] !== undefined) {
          body["demandGenProductAd"] = g["demandGenProductAd"];
        }
        if (g["demandGenVideoAd"] !== undefined) {
          body["demandGenVideoAd"] = g["demandGenVideoAd"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["displayVideoSourceAd"] !== undefined) {
          body["displayVideoSourceAd"] = g["displayVideoSourceAd"];
        }
        if (g["entityStatus"] !== undefined) {
          body["entityStatus"] = g["entityStatus"];
        }
        if (g["inStreamAd"] !== undefined) body["inStreamAd"] = g["inStreamAd"];
        if (g["mastheadAd"] !== undefined) body["mastheadAd"] = g["mastheadAd"];
        if (g["nonSkippableAd"] !== undefined) {
          body["nonSkippableAd"] = g["nonSkippableAd"];
        }
        if (g["videoDiscoverAd"] !== undefined) {
          body["videoDiscoverAd"] = g["videoDiscoverAd"];
        }
        if (g["videoPerformanceAd"] !== undefined) {
          body["videoPerformanceAd"] = g["videoPerformanceAd"];
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
    delete: {
      description: "Delete the adGroupAds",
      arguments: z.object({
        identifier: z.string().describe("The name of the adGroupAds"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["advertiserId"] !== undefined) {
          params["advertiserId"] = String(g["advertiserId"]);
        }
        params["adGroupAdId"] = args.identifier;
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
      description: "Sync adGroupAds state from GCP",
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
          params["adGroupAdId"] = identifier;
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
