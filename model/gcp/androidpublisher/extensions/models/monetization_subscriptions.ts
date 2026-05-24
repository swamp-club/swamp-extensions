// Auto-generated extension model for @swamp/gcp/androidpublisher/monetization-subscriptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Monetization.Subscriptions.
 *
 * A single subscription for an app.
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

const BASE_URL = "https://androidpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "androidpublisher.monetization.subscriptions.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "productId",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "androidpublisher.monetization.subscriptions.create",
  "path": "androidpublisher/v3/applications/{packageName}/subscriptions",
  "httpMethod": "POST",
  "parameterOrder": [
    "packageName",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "query",
    },
    "regionsVersion.version": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "androidpublisher.monetization.subscriptions.patch",
  "path":
    "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "packageName",
    "productId",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "latencyTolerance": {
      "location": "query",
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
    "regionsVersion.version": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidpublisher.monetization.subscriptions.delete",
  "path":
    "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "packageName",
    "productId",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidpublisher.monetization.subscriptions.list",
  "path": "androidpublisher/v3/applications/{packageName}/subscriptions",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "showArchived": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  basePlans: z.array(z.object({
    autoRenewingBasePlanType: z.object({
      accountHoldDuration: z.string().describe(
        "Optional. Custom account hold period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and P60D. An empty field represents a recommended account hold, calculated as 60 days minus grace period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive.",
      ).optional(),
      billingPeriodDuration: z.string().describe(
        "Required. Immutable. Subscription period, specified in ISO 8601 format. For a list of acceptable billing periods, refer to the help center. The duration is immutable after the base plan is created.",
      ).optional(),
      gracePeriodDuration: z.string().describe(
        "Grace period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and the lesser of 30D and base plan billing period. If not specified, a default value will be used based on the billing period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive.",
      ).optional(),
      legacyCompatible: z.boolean().describe(
        "Whether the renewing base plan is backward compatible. The backward compatible base plan is returned by the Google Play Billing Library deprecated method querySkuDetailsAsync(). Only one renewing base plan can be marked as legacy compatible for a given subscription.",
      ).optional(),
      legacyCompatibleSubscriptionOfferId: z.string().describe(
        "Subscription offer id which is legacy compatible. The backward compatible subscription offer is returned by the Google Play Billing Library deprecated method querySkuDetailsAsync(). Only one subscription offer can be marked as legacy compatible for a given renewing base plan. To have no Subscription offer as legacy compatible set this field as empty string.",
      ).optional(),
      prorationMode: z.enum([
        "SUBSCRIPTION_PRORATION_MODE_UNSPECIFIED",
        "SUBSCRIPTION_PRORATION_MODE_CHARGE_ON_NEXT_BILLING_DATE",
        "SUBSCRIPTION_PRORATION_MODE_CHARGE_FULL_PRICE_IMMEDIATELY",
      ]).describe(
        "The proration mode for the base plan determines what happens when a user switches to this plan from another base plan. If unspecified, defaults to CHARGE_ON_NEXT_BILLING_DATE.",
      ).optional(),
      resubscribeState: z.enum([
        "RESUBSCRIBE_STATE_UNSPECIFIED",
        "RESUBSCRIBE_STATE_ACTIVE",
        "RESUBSCRIBE_STATE_INACTIVE",
      ]).describe(
        "Whether users should be able to resubscribe to this base plan in Google Play surfaces. Defaults to RESUBSCRIBE_STATE_ACTIVE if not specified.",
      ).optional(),
    }).describe(
      "Represents a base plan that automatically renews at the end of its subscription period.",
    ).optional(),
    basePlanId: z.string().describe(
      "Required. Immutable. The unique identifier of this base plan. Must be unique within the subscription, and conform with RFC-1034. That is, this ID can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 63 characters.",
    ).optional(),
    installmentsBasePlanType: z.object({
      accountHoldDuration: z.string().describe(
        "Optional. Custom account hold period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and P60D. An empty field represents a recommended account hold, calculated as 60 days minus grace period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive.",
      ).optional(),
      billingPeriodDuration: z.string().describe(
        "Required. Immutable. Subscription period, specified in ISO 8601 format. For a list of acceptable billing periods, refer to the help center. The duration is immutable after the base plan is created.",
      ).optional(),
      committedPaymentsCount: z.number().int().describe(
        "Required. Immutable. The number of payments the user is committed to. It is immutable after the base plan is created.",
      ).optional(),
      gracePeriodDuration: z.string().describe(
        "Grace period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and the lesser of 30D and base plan billing period. If not specified, a default value will be used based on the billing period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive.",
      ).optional(),
      prorationMode: z.enum([
        "SUBSCRIPTION_PRORATION_MODE_UNSPECIFIED",
        "SUBSCRIPTION_PRORATION_MODE_CHARGE_ON_NEXT_BILLING_DATE",
        "SUBSCRIPTION_PRORATION_MODE_CHARGE_FULL_PRICE_IMMEDIATELY",
      ]).describe(
        "The proration mode for the base plan determines what happens when a user switches to this plan from another base plan. If unspecified, defaults to CHARGE_ON_NEXT_BILLING_DATE.",
      ).optional(),
      renewalType: z.enum([
        "RENEWAL_TYPE_UNSPECIFIED",
        "RENEWAL_TYPE_RENEWS_WITHOUT_COMMITMENT",
        "RENEWAL_TYPE_RENEWS_WITH_COMMITMENT",
      ]).describe(
        "Required. Immutable. Installments base plan renewal type. Determines the behavior at the end of the initial commitment. The renewal type is immutable after the base plan is created.",
      ).optional(),
      resubscribeState: z.enum([
        "RESUBSCRIBE_STATE_UNSPECIFIED",
        "RESUBSCRIBE_STATE_ACTIVE",
        "RESUBSCRIBE_STATE_INACTIVE",
      ]).describe(
        "Whether users should be able to resubscribe to this base plan in Google Play surfaces. Defaults to RESUBSCRIBE_STATE_ACTIVE if not specified.",
      ).optional(),
    }).describe(
      "Represents an installments base plan where a user commits to a specified number of payments.",
    ).optional(),
    offerTags: z.array(z.object({
      tag: z.string().describe(
        "Must conform with RFC-1034. That is, this string can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 20 characters.",
      ).optional(),
    })).describe(
      "List of up to 20 custom tags specified for this base plan, and returned to the app through the billing library. Subscription offers for this base plan will also receive these offer tags in the billing library.",
    ).optional(),
    otherRegionsConfig: z.object({
      eurPrice: z.object({
        currencyCode: z.string().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.number().int().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.string().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("Represents an amount of money with its currency type.")
        .optional(),
      newSubscriberAvailability: z.boolean().describe(
        "Whether the base plan is available for new subscribers in any new locations Play may launch in. If not specified, this will default to false.",
      ).optional(),
      usdPrice: z.object({
        currencyCode: z.string().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.number().int().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.string().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("Represents an amount of money with its currency type.")
        .optional(),
    }).describe("Pricing information for any new locations Play may launch in.")
      .optional(),
    prepaidBasePlanType: z.object({
      billingPeriodDuration: z.string().describe(
        "Required. Immutable. Subscription period, specified in ISO 8601 format. For a list of acceptable billing periods, refer to the help center. The duration is immutable after the base plan is created.",
      ).optional(),
      timeExtension: z.enum([
        "TIME_EXTENSION_UNSPECIFIED",
        "TIME_EXTENSION_ACTIVE",
        "TIME_EXTENSION_INACTIVE",
      ]).describe(
        "Whether users should be able to extend this prepaid base plan in Google Play surfaces. Defaults to TIME_EXTENSION_ACTIVE if not specified.",
      ).optional(),
    }).describe(
      "Represents a base plan that does not automatically renew at the end of the base plan, and must be manually renewed by the user.",
    ).optional(),
    regionalConfigs: z.array(z.object({
      newSubscriberAvailability: z.boolean().describe(
        "Whether the base plan in the specified region is available for new subscribers. Existing subscribers will not have their subscription canceled if this value is set to false. If not specified, this will default to false.",
      ).optional(),
      price: z.object({
        currencyCode: z.unknown().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.unknown().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.unknown().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("Represents an amount of money with its currency type.")
        .optional(),
      regionCode: z.string().describe(
        'Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US".',
      ).optional(),
    })).describe("Region-specific information for this base plan.").optional(),
    state: z.enum(["STATE_UNSPECIFIED", "DRAFT", "ACTIVE", "INACTIVE"])
      .describe(
        "Output only. The state of the base plan, i.e. whether it's active. Draft and inactive base plans can be activated or deleted. Active base plans can be made inactive. Inactive base plans can be canceled. This field cannot be changed by updating the resource. Use the dedicated endpoints instead.",
      ).optional(),
  })).describe(
    "The set of base plans for this subscription. Represents the prices and duration of the subscription if no other offers apply.",
  ).optional(),
  listings: z.array(z.object({
    benefits: z.array(z.string()).describe(
      "A list of benefits shown to the user on platforms such as the Play Store and in restoration flows in the language of this listing. Plain text. Ordered list of at most four benefits.",
    ).optional(),
    description: z.string().describe(
      "The description of this subscription in the language of this listing. Maximum length - 200 characters. Plain text.",
    ).optional(),
    languageCode: z.string().describe(
      'Required. The language of this listing, as defined by BCP-47, e.g. "en-US".',
    ).optional(),
    title: z.string().describe(
      "Required. The title of this subscription in the language of this listing. Plain text.",
    ).optional(),
  })).describe(
    "Required. List of localized listings for this subscription. Must contain at least an entry for the default language of the parent app.",
  ).optional(),
  packageName: z.string().describe("Immutable. Package name of the parent app.")
    .optional(),
  productId: z.string().describe(
    "Immutable. Unique product ID of the product. Unique within the parent app. Product IDs must be composed of lower-case letters (a-z), numbers (0-9), underscores (_) and dots (.). It must start with a lower-case letter or number, and be between 1 and 40 (inclusive) characters in length.",
  ).optional(),
  restrictedPaymentCountries: z.object({
    regionCodes: z.array(z.string()).describe(
      'Required. Region codes to impose payment restrictions on, as defined by ISO 3166-2, e.g. "US".',
    ).optional(),
  }).describe(
    "Countries where the purchase of this product is restricted to payment methods registered in the same country. If empty, no payment location restrictions are imposed.",
  ).optional(),
  taxAndComplianceSettings: z.object({
    eeaWithdrawalRightType: z.enum([
      "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED",
      "WITHDRAWAL_RIGHT_DIGITAL_CONTENT",
      "WITHDRAWAL_RIGHT_SERVICE",
    ]).describe(
      "Digital content or service classification for products distributed to users in the European Economic Area (EEA). The withdrawal regime under EEA consumer laws depends on this classification. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/10463498) for more information.",
    ).optional(),
    isTokenizedDigitalAsset: z.boolean().describe(
      "Whether this subscription is declared as a product representing a tokenized digital asset.",
    ).optional(),
    productTaxCategoryCode: z.string().describe(
      "Product tax category code to assign to the subscription. Product tax category determines the transaction tax rates applied to the subscription. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/16408159) for more information.",
    ).optional(),
    regionalProductAgeRatingInfos: z.array(z.object({
      productAgeRatingTier: z.enum([
        "PRODUCT_AGE_RATING_TIER_UNKNOWN",
        "PRODUCT_AGE_RATING_TIER_EVERYONE",
        "PRODUCT_AGE_RATING_TIER_THIRTEEN_AND_ABOVE",
        "PRODUCT_AGE_RATING_TIER_SIXTEEN_AND_ABOVE",
        "PRODUCT_AGE_RATING_TIER_EIGHTEEN_AND_ABOVE",
      ]).describe("The age rating tier of a product for the given region.")
        .optional(),
      regionCode: z.string().describe(
        'Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US".',
      ).optional(),
    })).describe(
      "Regional age rating information. Currently this field is only supported for region code `US`.",
    ).optional(),
    taxRateInfoByRegionCode: z.record(
      z.string(),
      z.object({
        eligibleForStreamingServiceTaxRate: z.boolean().describe(
          "You must tell us if your app contains streaming products to correctly charge US state and local sales tax. Field only supported in the United States.",
        ).optional(),
        streamingTaxType: z.enum([
          "STREAMING_TAX_TYPE_UNSPECIFIED",
          "STREAMING_TAX_TYPE_TELCO_VIDEO_RENTAL",
          "STREAMING_TAX_TYPE_TELCO_VIDEO_SALES",
          "STREAMING_TAX_TYPE_TELCO_VIDEO_MULTI_CHANNEL",
          "STREAMING_TAX_TYPE_TELCO_AUDIO_RENTAL",
          "STREAMING_TAX_TYPE_TELCO_AUDIO_SALES",
          "STREAMING_TAX_TYPE_TELCO_AUDIO_MULTI_CHANNEL",
        ]).describe(
          "To collect communications or amusement taxes in the United States, choose the appropriate tax category. [Learn more](https://support.google.com/googleplay/android-developer/answer/10463498#streaming_tax).",
        ).optional(),
        taxTier: z.enum([
          "TAX_TIER_UNSPECIFIED",
          "TAX_TIER_BOOKS_1",
          "TAX_TIER_NEWS_1",
          "TAX_TIER_NEWS_2",
          "TAX_TIER_MUSIC_OR_AUDIO_1",
          "TAX_TIER_LIVE_OR_BROADCAST_1",
        ]).describe(
          "Tax tier to specify reduced tax rate. Developers who sell digital news, magazines, newspapers, books, or audiobooks in various regions may be eligible for reduced tax rates. [Learn more](https://support.google.com/googleplay/android-developer/answer/10463498).",
        ).optional(),
      }),
    ).describe(
      'A mapping from region code to tax rate details. The keys are region codes as defined by Unicode\'s "CLDR".',
    ).optional(),
  }).describe(
    "Details about taxation, Google Play policy, and legal compliance for subscription products.",
  ).optional(),
  regionsVersion_version: z.string().describe(
    "Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available.",
  ).optional(),
});

const StateSchema = z.object({
  archived: z.boolean().optional(),
  basePlans: z.array(z.object({
    autoRenewingBasePlanType: z.object({
      accountHoldDuration: z.string(),
      billingPeriodDuration: z.string(),
      gracePeriodDuration: z.string(),
      legacyCompatible: z.boolean(),
      legacyCompatibleSubscriptionOfferId: z.string(),
      prorationMode: z.string(),
      resubscribeState: z.string(),
    }),
    basePlanId: z.string(),
    installmentsBasePlanType: z.object({
      accountHoldDuration: z.string(),
      billingPeriodDuration: z.string(),
      committedPaymentsCount: z.number(),
      gracePeriodDuration: z.string(),
      prorationMode: z.string(),
      renewalType: z.string(),
      resubscribeState: z.string(),
    }),
    offerTags: z.array(z.object({
      tag: z.string(),
    })),
    otherRegionsConfig: z.object({
      eurPrice: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      newSubscriberAvailability: z.boolean(),
      usdPrice: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
    }),
    prepaidBasePlanType: z.object({
      billingPeriodDuration: z.string(),
      timeExtension: z.string(),
    }),
    regionalConfigs: z.array(z.object({
      newSubscriberAvailability: z.boolean(),
      price: z.object({
        currencyCode: z.unknown(),
        nanos: z.unknown(),
        units: z.unknown(),
      }),
      regionCode: z.string(),
    })),
    state: z.string(),
  })).optional(),
  listings: z.array(z.object({
    benefits: z.array(z.string()),
    description: z.string(),
    languageCode: z.string(),
    title: z.string(),
  })).optional(),
  packageName: z.string().optional(),
  productId: z.string().optional(),
  restrictedPaymentCountries: z.object({
    regionCodes: z.array(z.string()),
  }).optional(),
  taxAndComplianceSettings: z.object({
    eeaWithdrawalRightType: z.string(),
    isTokenizedDigitalAsset: z.boolean(),
    productTaxCategoryCode: z.string(),
    regionalProductAgeRatingInfos: z.array(z.object({
      productAgeRatingTier: z.string(),
      regionCode: z.string(),
    })),
    taxRateInfoByRegionCode: z.record(z.string(), z.unknown()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  basePlans: z.array(z.object({
    autoRenewingBasePlanType: z.object({
      accountHoldDuration: z.string().describe(
        "Optional. Custom account hold period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and P60D. An empty field represents a recommended account hold, calculated as 60 days minus grace period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive.",
      ).optional(),
      billingPeriodDuration: z.string().describe(
        "Required. Immutable. Subscription period, specified in ISO 8601 format. For a list of acceptable billing periods, refer to the help center. The duration is immutable after the base plan is created.",
      ).optional(),
      gracePeriodDuration: z.string().describe(
        "Grace period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and the lesser of 30D and base plan billing period. If not specified, a default value will be used based on the billing period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive.",
      ).optional(),
      legacyCompatible: z.boolean().describe(
        "Whether the renewing base plan is backward compatible. The backward compatible base plan is returned by the Google Play Billing Library deprecated method querySkuDetailsAsync(). Only one renewing base plan can be marked as legacy compatible for a given subscription.",
      ).optional(),
      legacyCompatibleSubscriptionOfferId: z.string().describe(
        "Subscription offer id which is legacy compatible. The backward compatible subscription offer is returned by the Google Play Billing Library deprecated method querySkuDetailsAsync(). Only one subscription offer can be marked as legacy compatible for a given renewing base plan. To have no Subscription offer as legacy compatible set this field as empty string.",
      ).optional(),
      prorationMode: z.enum([
        "SUBSCRIPTION_PRORATION_MODE_UNSPECIFIED",
        "SUBSCRIPTION_PRORATION_MODE_CHARGE_ON_NEXT_BILLING_DATE",
        "SUBSCRIPTION_PRORATION_MODE_CHARGE_FULL_PRICE_IMMEDIATELY",
      ]).describe(
        "The proration mode for the base plan determines what happens when a user switches to this plan from another base plan. If unspecified, defaults to CHARGE_ON_NEXT_BILLING_DATE.",
      ).optional(),
      resubscribeState: z.enum([
        "RESUBSCRIBE_STATE_UNSPECIFIED",
        "RESUBSCRIBE_STATE_ACTIVE",
        "RESUBSCRIBE_STATE_INACTIVE",
      ]).describe(
        "Whether users should be able to resubscribe to this base plan in Google Play surfaces. Defaults to RESUBSCRIBE_STATE_ACTIVE if not specified.",
      ).optional(),
    }).describe(
      "Represents a base plan that automatically renews at the end of its subscription period.",
    ).optional(),
    basePlanId: z.string().describe(
      "Required. Immutable. The unique identifier of this base plan. Must be unique within the subscription, and conform with RFC-1034. That is, this ID can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 63 characters.",
    ).optional(),
    installmentsBasePlanType: z.object({
      accountHoldDuration: z.string().describe(
        "Optional. Custom account hold period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and P60D. An empty field represents a recommended account hold, calculated as 60 days minus grace period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive.",
      ).optional(),
      billingPeriodDuration: z.string().describe(
        "Required. Immutable. Subscription period, specified in ISO 8601 format. For a list of acceptable billing periods, refer to the help center. The duration is immutable after the base plan is created.",
      ).optional(),
      committedPaymentsCount: z.number().int().describe(
        "Required. Immutable. The number of payments the user is committed to. It is immutable after the base plan is created.",
      ).optional(),
      gracePeriodDuration: z.string().describe(
        "Grace period of the subscription, specified in ISO 8601 format. Acceptable values must be in days and between P0D and the lesser of 30D and base plan billing period. If not specified, a default value will be used based on the billing period. The sum of gracePeriodDuration and accountHoldDuration must be between P30D and P60D days, inclusive.",
      ).optional(),
      prorationMode: z.enum([
        "SUBSCRIPTION_PRORATION_MODE_UNSPECIFIED",
        "SUBSCRIPTION_PRORATION_MODE_CHARGE_ON_NEXT_BILLING_DATE",
        "SUBSCRIPTION_PRORATION_MODE_CHARGE_FULL_PRICE_IMMEDIATELY",
      ]).describe(
        "The proration mode for the base plan determines what happens when a user switches to this plan from another base plan. If unspecified, defaults to CHARGE_ON_NEXT_BILLING_DATE.",
      ).optional(),
      renewalType: z.enum([
        "RENEWAL_TYPE_UNSPECIFIED",
        "RENEWAL_TYPE_RENEWS_WITHOUT_COMMITMENT",
        "RENEWAL_TYPE_RENEWS_WITH_COMMITMENT",
      ]).describe(
        "Required. Immutable. Installments base plan renewal type. Determines the behavior at the end of the initial commitment. The renewal type is immutable after the base plan is created.",
      ).optional(),
      resubscribeState: z.enum([
        "RESUBSCRIBE_STATE_UNSPECIFIED",
        "RESUBSCRIBE_STATE_ACTIVE",
        "RESUBSCRIBE_STATE_INACTIVE",
      ]).describe(
        "Whether users should be able to resubscribe to this base plan in Google Play surfaces. Defaults to RESUBSCRIBE_STATE_ACTIVE if not specified.",
      ).optional(),
    }).describe(
      "Represents an installments base plan where a user commits to a specified number of payments.",
    ).optional(),
    offerTags: z.array(z.object({
      tag: z.string().describe(
        "Must conform with RFC-1034. That is, this string can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 20 characters.",
      ).optional(),
    })).describe(
      "List of up to 20 custom tags specified for this base plan, and returned to the app through the billing library. Subscription offers for this base plan will also receive these offer tags in the billing library.",
    ).optional(),
    otherRegionsConfig: z.object({
      eurPrice: z.object({
        currencyCode: z.string().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.number().int().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.string().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("Represents an amount of money with its currency type.")
        .optional(),
      newSubscriberAvailability: z.boolean().describe(
        "Whether the base plan is available for new subscribers in any new locations Play may launch in. If not specified, this will default to false.",
      ).optional(),
      usdPrice: z.object({
        currencyCode: z.string().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.number().int().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.string().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("Represents an amount of money with its currency type.")
        .optional(),
    }).describe("Pricing information for any new locations Play may launch in.")
      .optional(),
    prepaidBasePlanType: z.object({
      billingPeriodDuration: z.string().describe(
        "Required. Immutable. Subscription period, specified in ISO 8601 format. For a list of acceptable billing periods, refer to the help center. The duration is immutable after the base plan is created.",
      ).optional(),
      timeExtension: z.enum([
        "TIME_EXTENSION_UNSPECIFIED",
        "TIME_EXTENSION_ACTIVE",
        "TIME_EXTENSION_INACTIVE",
      ]).describe(
        "Whether users should be able to extend this prepaid base plan in Google Play surfaces. Defaults to TIME_EXTENSION_ACTIVE if not specified.",
      ).optional(),
    }).describe(
      "Represents a base plan that does not automatically renew at the end of the base plan, and must be manually renewed by the user.",
    ).optional(),
    regionalConfigs: z.array(z.object({
      newSubscriberAvailability: z.boolean().describe(
        "Whether the base plan in the specified region is available for new subscribers. Existing subscribers will not have their subscription canceled if this value is set to false. If not specified, this will default to false.",
      ).optional(),
      price: z.object({
        currencyCode: z.unknown().describe(
          "The three-letter currency code defined in ISO 4217.",
        ).optional(),
        nanos: z.unknown().describe(
          "Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.",
        ).optional(),
        units: z.unknown().describe(
          'The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.',
        ).optional(),
      }).describe("Represents an amount of money with its currency type.")
        .optional(),
      regionCode: z.string().describe(
        'Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US".',
      ).optional(),
    })).describe("Region-specific information for this base plan.").optional(),
    state: z.enum(["STATE_UNSPECIFIED", "DRAFT", "ACTIVE", "INACTIVE"])
      .describe(
        "Output only. The state of the base plan, i.e. whether it's active. Draft and inactive base plans can be activated or deleted. Active base plans can be made inactive. Inactive base plans can be canceled. This field cannot be changed by updating the resource. Use the dedicated endpoints instead.",
      ).optional(),
  })).describe(
    "The set of base plans for this subscription. Represents the prices and duration of the subscription if no other offers apply.",
  ).optional(),
  listings: z.array(z.object({
    benefits: z.array(z.string()).describe(
      "A list of benefits shown to the user on platforms such as the Play Store and in restoration flows in the language of this listing. Plain text. Ordered list of at most four benefits.",
    ).optional(),
    description: z.string().describe(
      "The description of this subscription in the language of this listing. Maximum length - 200 characters. Plain text.",
    ).optional(),
    languageCode: z.string().describe(
      'Required. The language of this listing, as defined by BCP-47, e.g. "en-US".',
    ).optional(),
    title: z.string().describe(
      "Required. The title of this subscription in the language of this listing. Plain text.",
    ).optional(),
  })).describe(
    "Required. List of localized listings for this subscription. Must contain at least an entry for the default language of the parent app.",
  ).optional(),
  packageName: z.string().describe("Immutable. Package name of the parent app.")
    .optional(),
  productId: z.string().describe(
    "Immutable. Unique product ID of the product. Unique within the parent app. Product IDs must be composed of lower-case letters (a-z), numbers (0-9), underscores (_) and dots (.). It must start with a lower-case letter or number, and be between 1 and 40 (inclusive) characters in length.",
  ).optional(),
  restrictedPaymentCountries: z.object({
    regionCodes: z.array(z.string()).describe(
      'Required. Region codes to impose payment restrictions on, as defined by ISO 3166-2, e.g. "US".',
    ).optional(),
  }).describe(
    "Countries where the purchase of this product is restricted to payment methods registered in the same country. If empty, no payment location restrictions are imposed.",
  ).optional(),
  taxAndComplianceSettings: z.object({
    eeaWithdrawalRightType: z.enum([
      "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED",
      "WITHDRAWAL_RIGHT_DIGITAL_CONTENT",
      "WITHDRAWAL_RIGHT_SERVICE",
    ]).describe(
      "Digital content or service classification for products distributed to users in the European Economic Area (EEA). The withdrawal regime under EEA consumer laws depends on this classification. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/10463498) for more information.",
    ).optional(),
    isTokenizedDigitalAsset: z.boolean().describe(
      "Whether this subscription is declared as a product representing a tokenized digital asset.",
    ).optional(),
    productTaxCategoryCode: z.string().describe(
      "Product tax category code to assign to the subscription. Product tax category determines the transaction tax rates applied to the subscription. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/16408159) for more information.",
    ).optional(),
    regionalProductAgeRatingInfos: z.array(z.object({
      productAgeRatingTier: z.enum([
        "PRODUCT_AGE_RATING_TIER_UNKNOWN",
        "PRODUCT_AGE_RATING_TIER_EVERYONE",
        "PRODUCT_AGE_RATING_TIER_THIRTEEN_AND_ABOVE",
        "PRODUCT_AGE_RATING_TIER_SIXTEEN_AND_ABOVE",
        "PRODUCT_AGE_RATING_TIER_EIGHTEEN_AND_ABOVE",
      ]).describe("The age rating tier of a product for the given region.")
        .optional(),
      regionCode: z.string().describe(
        'Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US".',
      ).optional(),
    })).describe(
      "Regional age rating information. Currently this field is only supported for region code `US`.",
    ).optional(),
    taxRateInfoByRegionCode: z.record(
      z.string(),
      z.object({
        eligibleForStreamingServiceTaxRate: z.boolean().describe(
          "You must tell us if your app contains streaming products to correctly charge US state and local sales tax. Field only supported in the United States.",
        ).optional(),
        streamingTaxType: z.enum([
          "STREAMING_TAX_TYPE_UNSPECIFIED",
          "STREAMING_TAX_TYPE_TELCO_VIDEO_RENTAL",
          "STREAMING_TAX_TYPE_TELCO_VIDEO_SALES",
          "STREAMING_TAX_TYPE_TELCO_VIDEO_MULTI_CHANNEL",
          "STREAMING_TAX_TYPE_TELCO_AUDIO_RENTAL",
          "STREAMING_TAX_TYPE_TELCO_AUDIO_SALES",
          "STREAMING_TAX_TYPE_TELCO_AUDIO_MULTI_CHANNEL",
        ]).describe(
          "To collect communications or amusement taxes in the United States, choose the appropriate tax category. [Learn more](https://support.google.com/googleplay/android-developer/answer/10463498#streaming_tax).",
        ).optional(),
        taxTier: z.enum([
          "TAX_TIER_UNSPECIFIED",
          "TAX_TIER_BOOKS_1",
          "TAX_TIER_NEWS_1",
          "TAX_TIER_NEWS_2",
          "TAX_TIER_MUSIC_OR_AUDIO_1",
          "TAX_TIER_LIVE_OR_BROADCAST_1",
        ]).describe(
          "Tax tier to specify reduced tax rate. Developers who sell digital news, magazines, newspapers, books, or audiobooks in various regions may be eligible for reduced tax rates. [Learn more](https://support.google.com/googleplay/android-developer/answer/10463498).",
        ).optional(),
      }),
    ).describe(
      'A mapping from region code to tax rate details. The keys are region codes as defined by Unicode\'s "CLDR".',
    ).optional(),
  }).describe(
    "Details about taxation, Google Play policy, and legal compliance for subscription products.",
  ).optional(),
  regionsVersion_version: z.string().describe(
    "Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Monetization.Subscriptions. Registered at `@swamp/gcp/androidpublisher/monetization-subscriptions`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/monetization-subscriptions",
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
      toVersion: "2026.04.15.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single subscription for an app.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a subscriptions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        const body: Record<string, unknown> = {};
        if (g["basePlans"] !== undefined) body["basePlans"] = g["basePlans"];
        if (g["listings"] !== undefined) body["listings"] = g["listings"];
        if (g["productId"] !== undefined) body["productId"] = g["productId"];
        if (g["restrictedPaymentCountries"] !== undefined) {
          body["restrictedPaymentCountries"] = g["restrictedPaymentCountries"];
        }
        if (g["taxAndComplianceSettings"] !== undefined) {
          body["taxAndComplianceSettings"] = g["taxAndComplianceSettings"];
        }
        if (g["regionsVersion_version"] !== undefined) {
          body["regionsVersion_version"] = g["regionsVersion_version"];
        }
        if (g["name"] !== undefined) params["productId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "packageName": String(g["packageName"] ?? "") },
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
      description: "Get a subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        params["productId"] = args.identifier;
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
      description: "Update subscriptions attributes",
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
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        } else if (existing["packageName"]) {
          params["packageName"] = String(existing["packageName"]);
        }
        params["productId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["basePlans"] !== undefined) body["basePlans"] = g["basePlans"];
        if (g["listings"] !== undefined) body["listings"] = g["listings"];
        if (g["restrictedPaymentCountries"] !== undefined) {
          body["restrictedPaymentCountries"] = g["restrictedPaymentCountries"];
        }
        if (g["taxAndComplianceSettings"] !== undefined) {
          body["taxAndComplianceSettings"] = g["taxAndComplianceSettings"];
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
      description: "Delete the subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        params["productId"] = args.identifier;
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
      description: "Sync subscriptions state from GCP",
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
          if (g["packageName"] !== undefined) {
            params["packageName"] = String(g["packageName"]);
          } else if (existing["packageName"]) {
            params["packageName"] = String(existing["packageName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["productId"] = identifier;
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
    archive: {
      description: "archive",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.monetization.subscriptions.archive",
            "path":
              "androidpublisher/v3/applications/{packageName}/subscriptions/{productId}:archive",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "productId"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    batch_get: {
      description: "batch get",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.monetization.subscriptions.batchGet",
            "path":
              "androidpublisher/v3/applications/{packageName}/subscriptions:batchGet",
            "httpMethod": "GET",
            "parameterOrder": ["packageName"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "productIds": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    batch_update: {
      description: "batch update",
      arguments: z.object({
        requests: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.monetization.subscriptions.batchUpdate",
            "path":
              "androidpublisher/v3/applications/{packageName}/subscriptions:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["packageName"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
