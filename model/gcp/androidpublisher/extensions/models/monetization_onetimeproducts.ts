// Auto-generated extension model for @swamp/gcp/androidpublisher/monetization-onetimeproducts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Monetization.Onetimeproducts.
 *
 * A single one-time product for an app.
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
  "id": "androidpublisher.monetization.onetimeproducts.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}",
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

const PATCH_CONFIG = {
  "id": "androidpublisher.monetization.onetimeproducts.patch",
  "path":
    "androidpublisher/v3/applications/{packageName}/onetimeproducts/{productId}",
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
  "id": "androidpublisher.monetization.onetimeproducts.delete",
  "path":
    "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "packageName",
    "productId",
  ],
  "parameters": {
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  listings: z.array(z.object({
    description: z.string().describe(
      "Required. The description of this product in the language of this listing. The maximum length is 200 characters.",
    ).optional(),
    languageCode: z.string().describe(
      'Required. The language of this listing, as defined by BCP-47, e.g., "en-US".',
    ).optional(),
    title: z.string().describe(
      "Required. The title of this product in the language of this listing. The maximum length is 55 characters.",
    ).optional(),
  })).describe(
    "Required. Set of localized title and description data. Must not have duplicate entries with the same language_code.",
  ).optional(),
  offerTags: z.array(z.object({
    tag: z.string().describe(
      "Must conform with RFC-1034. That is, this string can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 20 characters.",
    ).optional(),
  })).describe(
    "Optional. List of up to 20 custom tags specified for this one-time product, and returned to the app through the billing library. Purchase options and offers for this product will also receive these tags in the billing library.",
  ).optional(),
  packageName: z.string().describe(
    "Required. Immutable. Package name of the parent app.",
  ).optional(),
  productId: z.string().describe(
    "Required. Immutable. Unique product ID of the product. Unique within the parent app. Product IDs must start with a number or lowercase letter, and can contain numbers (0-9), lowercase letters (a-z), underscores (_), and periods (.).",
  ).optional(),
  purchaseOptions: z.array(z.object({
    buyOption: z.object({
      legacyCompatible: z.boolean().describe(
        'Optional. Whether this purchase option will be available in legacy PBL flows that do not support one-time products model. Up to one "buy" purchase option can be marked as backwards compatible.',
      ).optional(),
      multiQuantityEnabled: z.boolean().describe(
        "Optional. Whether this purchase option allows multi-quantity. Multi-quantity allows buyer to purchase more than one item in a single checkout.",
      ).optional(),
    }).describe("A purchase option that can be bought.").optional(),
    newRegionsConfig: z.object({
      availability: z.enum([
        "AVAILABILITY_UNSPECIFIED",
        "AVAILABLE",
        "NO_LONGER_AVAILABLE",
      ]).describe(
        "Required. The regional availability for the new regions config. When set to AVAILABLE, the pricing information will be used for any new regions Play may launch in the future.",
      ).optional(),
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
    }).describe(
      "Pricing information for any new regions Play may launch in the future.",
    ).optional(),
    offerTags: z.array(z.object({
      tag: z.string().describe(
        "Must conform with RFC-1034. That is, this string can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 20 characters.",
      ).optional(),
    })).describe(
      "Optional. List of up to 20 custom tags specified for this purchase option, and returned to the app through the billing library. Offers for this purchase option will also receive these tags in the billing library.",
    ).optional(),
    purchaseOptionId: z.string().describe(
      "Required. Immutable. The unique identifier of this purchase option. Must be unique within the one-time product. It must start with a number or lower-case letter, and can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-). The maximum length is 63 characters.",
    ).optional(),
    regionalPricingAndAvailabilityConfigs: z.array(z.object({
      availability: z.enum([
        "AVAILABILITY_UNSPECIFIED",
        "AVAILABLE",
        "NO_LONGER_AVAILABLE",
        "AVAILABLE_IF_RELEASED",
        "AVAILABLE_FOR_OFFERS_ONLY",
      ]).describe("The availability of the purchase option.").optional(),
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
        'Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g., "US".',
      ).optional(),
    })).describe(
      "Regional pricing and availability information for this purchase option.",
    ).optional(),
    rentOption: z.object({
      expirationPeriod: z.string().describe(
        "Optional. The amount of time the user has after starting consuming the entitlement before it is revoked. Specified in ISO 8601 format.",
      ).optional(),
      rentalPeriod: z.string().describe(
        "Required. The amount of time a user has the entitlement for. Starts at purchase flow completion. Specified in ISO 8601 format.",
      ).optional(),
    }).describe("A purchase option that can be rented.").optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "DRAFT",
      "ACTIVE",
      "INACTIVE",
      "INACTIVE_PUBLISHED",
    ]).describe(
      "Output only. The state of the purchase option, i.e., whether it's active. This field cannot be changed by updating the resource. Use the dedicated endpoints instead.",
    ).optional(),
    taxAndComplianceSettings: z.object({
      withdrawalRightType: z.enum([
        "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED",
        "WITHDRAWAL_RIGHT_DIGITAL_CONTENT",
        "WITHDRAWAL_RIGHT_SERVICE",
      ]).describe(
        "Optional. Digital content or service classification for products distributed to users in eligible regions. If unset, it defaults to `WITHDRAWAL_RIGHT_DIGITAL_CONTENT`. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/10463498) for more information.",
      ).optional(),
    }).describe(
      "Details about taxation, Google Play policy and legal compliance for one-time product purchase options.",
    ).optional(),
  })).describe(
    "Required. The set of purchase options for this one-time product.",
  ).optional(),
  regionsVersion: z.object({
    version: z.string().describe(
      "Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available.",
    ).optional(),
  }).describe(
    "The version of the available regions being used for the specified resource.",
  ).optional(),
  restrictedPaymentCountries: z.object({
    regionCodes: z.array(z.string()).describe(
      'Required. Region codes to impose payment restrictions on, as defined by ISO 3166-2, e.g. "US".',
    ).optional(),
  }).describe(
    "Countries where the purchase of this product is restricted to payment methods registered in the same country. If empty, no payment location restrictions are imposed.",
  ).optional(),
  taxAndComplianceSettings: z.object({
    isTokenizedDigitalAsset: z.boolean().describe(
      "Whether this one-time product is declared as a product representing a tokenized digital asset.",
    ).optional(),
    productTaxCategoryCode: z.string().describe(
      "Product tax category code to assign to the one-time product. Product tax category determines the transaction tax rates applied to the product. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/16408159) for more information.",
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
    regionalTaxConfigs: z.array(z.object({
      eligibleForStreamingServiceTaxRate: z.boolean().describe(
        "You must tell us if your app contains streaming products to correctly charge US state and local sales tax. Field only supported in the United States.",
      ).optional(),
      regionCode: z.string().describe(
        'Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US".',
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
    })).describe("Regional tax configuration.").optional(),
  }).describe(
    "Details about taxation, Google Play policy and legal compliance for one-time products.",
  ).optional(),
});

const StateSchema = z.object({
  listings: z.array(z.object({
    description: z.string(),
    languageCode: z.string(),
    title: z.string(),
  })).optional(),
  offerTags: z.array(z.object({
    tag: z.string(),
  })).optional(),
  packageName: z.string().optional(),
  productId: z.string().optional(),
  purchaseOptions: z.array(z.object({
    buyOption: z.object({
      legacyCompatible: z.boolean(),
      multiQuantityEnabled: z.boolean(),
    }),
    newRegionsConfig: z.object({
      availability: z.string(),
      eurPrice: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      usdPrice: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
    }),
    offerTags: z.array(z.object({
      tag: z.string(),
    })),
    purchaseOptionId: z.string(),
    regionalPricingAndAvailabilityConfigs: z.array(z.object({
      availability: z.string(),
      price: z.object({
        currencyCode: z.unknown(),
        nanos: z.unknown(),
        units: z.unknown(),
      }),
      regionCode: z.string(),
    })),
    rentOption: z.object({
      expirationPeriod: z.string(),
      rentalPeriod: z.string(),
    }),
    state: z.string(),
    taxAndComplianceSettings: z.object({
      withdrawalRightType: z.string(),
    }),
  })).optional(),
  regionsVersion: z.object({
    version: z.string(),
  }).optional(),
  restrictedPaymentCountries: z.object({
    regionCodes: z.array(z.string()),
  }).optional(),
  taxAndComplianceSettings: z.object({
    isTokenizedDigitalAsset: z.boolean(),
    productTaxCategoryCode: z.string(),
    regionalProductAgeRatingInfos: z.array(z.object({
      productAgeRatingTier: z.string(),
      regionCode: z.string(),
    })),
    regionalTaxConfigs: z.array(z.object({
      eligibleForStreamingServiceTaxRate: z.boolean(),
      regionCode: z.string(),
      streamingTaxType: z.string(),
      taxTier: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  listings: z.array(z.object({
    description: z.string().describe(
      "Required. The description of this product in the language of this listing. The maximum length is 200 characters.",
    ).optional(),
    languageCode: z.string().describe(
      'Required. The language of this listing, as defined by BCP-47, e.g., "en-US".',
    ).optional(),
    title: z.string().describe(
      "Required. The title of this product in the language of this listing. The maximum length is 55 characters.",
    ).optional(),
  })).describe(
    "Required. Set of localized title and description data. Must not have duplicate entries with the same language_code.",
  ).optional(),
  offerTags: z.array(z.object({
    tag: z.string().describe(
      "Must conform with RFC-1034. That is, this string can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 20 characters.",
    ).optional(),
  })).describe(
    "Optional. List of up to 20 custom tags specified for this one-time product, and returned to the app through the billing library. Purchase options and offers for this product will also receive these tags in the billing library.",
  ).optional(),
  packageName: z.string().describe(
    "Required. Immutable. Package name of the parent app.",
  ).optional(),
  productId: z.string().describe(
    "Required. Immutable. Unique product ID of the product. Unique within the parent app. Product IDs must start with a number or lowercase letter, and can contain numbers (0-9), lowercase letters (a-z), underscores (_), and periods (.).",
  ).optional(),
  purchaseOptions: z.array(z.object({
    buyOption: z.object({
      legacyCompatible: z.boolean().describe(
        'Optional. Whether this purchase option will be available in legacy PBL flows that do not support one-time products model. Up to one "buy" purchase option can be marked as backwards compatible.',
      ).optional(),
      multiQuantityEnabled: z.boolean().describe(
        "Optional. Whether this purchase option allows multi-quantity. Multi-quantity allows buyer to purchase more than one item in a single checkout.",
      ).optional(),
    }).describe("A purchase option that can be bought.").optional(),
    newRegionsConfig: z.object({
      availability: z.enum([
        "AVAILABILITY_UNSPECIFIED",
        "AVAILABLE",
        "NO_LONGER_AVAILABLE",
      ]).describe(
        "Required. The regional availability for the new regions config. When set to AVAILABLE, the pricing information will be used for any new regions Play may launch in the future.",
      ).optional(),
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
    }).describe(
      "Pricing information for any new regions Play may launch in the future.",
    ).optional(),
    offerTags: z.array(z.object({
      tag: z.string().describe(
        "Must conform with RFC-1034. That is, this string can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-), and be at most 20 characters.",
      ).optional(),
    })).describe(
      "Optional. List of up to 20 custom tags specified for this purchase option, and returned to the app through the billing library. Offers for this purchase option will also receive these tags in the billing library.",
    ).optional(),
    purchaseOptionId: z.string().describe(
      "Required. Immutable. The unique identifier of this purchase option. Must be unique within the one-time product. It must start with a number or lower-case letter, and can only contain lower-case letters (a-z), numbers (0-9), and hyphens (-). The maximum length is 63 characters.",
    ).optional(),
    regionalPricingAndAvailabilityConfigs: z.array(z.object({
      availability: z.enum([
        "AVAILABILITY_UNSPECIFIED",
        "AVAILABLE",
        "NO_LONGER_AVAILABLE",
        "AVAILABLE_IF_RELEASED",
        "AVAILABLE_FOR_OFFERS_ONLY",
      ]).describe("The availability of the purchase option.").optional(),
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
        'Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g., "US".',
      ).optional(),
    })).describe(
      "Regional pricing and availability information for this purchase option.",
    ).optional(),
    rentOption: z.object({
      expirationPeriod: z.string().describe(
        "Optional. The amount of time the user has after starting consuming the entitlement before it is revoked. Specified in ISO 8601 format.",
      ).optional(),
      rentalPeriod: z.string().describe(
        "Required. The amount of time a user has the entitlement for. Starts at purchase flow completion. Specified in ISO 8601 format.",
      ).optional(),
    }).describe("A purchase option that can be rented.").optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "DRAFT",
      "ACTIVE",
      "INACTIVE",
      "INACTIVE_PUBLISHED",
    ]).describe(
      "Output only. The state of the purchase option, i.e., whether it's active. This field cannot be changed by updating the resource. Use the dedicated endpoints instead.",
    ).optional(),
    taxAndComplianceSettings: z.object({
      withdrawalRightType: z.enum([
        "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED",
        "WITHDRAWAL_RIGHT_DIGITAL_CONTENT",
        "WITHDRAWAL_RIGHT_SERVICE",
      ]).describe(
        "Optional. Digital content or service classification for products distributed to users in eligible regions. If unset, it defaults to `WITHDRAWAL_RIGHT_DIGITAL_CONTENT`. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/10463498) for more information.",
      ).optional(),
    }).describe(
      "Details about taxation, Google Play policy and legal compliance for one-time product purchase options.",
    ).optional(),
  })).describe(
    "Required. The set of purchase options for this one-time product.",
  ).optional(),
  regionsVersion: z.object({
    version: z.string().describe(
      "Required. A string representing the version of available regions being used for the specified resource. Regional prices and latest supported version for the resource have to be specified according to the information published in [this article](https://support.google.com/googleplay/android-developer/answer/10532353). Each time the supported locations substantially change, the version will be incremented. Using this field will ensure that creating and updating the resource with an older region's version and set of regional prices and currencies will succeed even though a new version is available.",
    ).optional(),
  }).describe(
    "The version of the available regions being used for the specified resource.",
  ).optional(),
  restrictedPaymentCountries: z.object({
    regionCodes: z.array(z.string()).describe(
      'Required. Region codes to impose payment restrictions on, as defined by ISO 3166-2, e.g. "US".',
    ).optional(),
  }).describe(
    "Countries where the purchase of this product is restricted to payment methods registered in the same country. If empty, no payment location restrictions are imposed.",
  ).optional(),
  taxAndComplianceSettings: z.object({
    isTokenizedDigitalAsset: z.boolean().describe(
      "Whether this one-time product is declared as a product representing a tokenized digital asset.",
    ).optional(),
    productTaxCategoryCode: z.string().describe(
      "Product tax category code to assign to the one-time product. Product tax category determines the transaction tax rates applied to the product. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/16408159) for more information.",
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
    regionalTaxConfigs: z.array(z.object({
      eligibleForStreamingServiceTaxRate: z.boolean().describe(
        "You must tell us if your app contains streaming products to correctly charge US state and local sales tax. Field only supported in the United States.",
      ).optional(),
      regionCode: z.string().describe(
        'Required. Region code this configuration applies to, as defined by ISO 3166-2, e.g. "US".',
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
    })).describe("Regional tax configuration.").optional(),
  }).describe(
    "Details about taxation, Google Play policy and legal compliance for one-time products.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Monetization.Onetimeproducts. Registered at `@swamp/gcp/androidpublisher/monetization-onetimeproducts`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/monetization-onetimeproducts",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single one-time product for an app.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a onetimeproducts",
      arguments: z.object({
        identifier: z.string().describe("The name of the onetimeproducts"),
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
      description: "Update onetimeproducts attributes",
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
        if (g["listings"] !== undefined) body["listings"] = g["listings"];
        if (g["offerTags"] !== undefined) body["offerTags"] = g["offerTags"];
        if (g["purchaseOptions"] !== undefined) {
          body["purchaseOptions"] = g["purchaseOptions"];
        }
        if (g["regionsVersion"] !== undefined) {
          body["regionsVersion"] = g["regionsVersion"];
        }
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
      description: "Delete the onetimeproducts",
      arguments: z.object({
        identifier: z.string().describe("The name of the onetimeproducts"),
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
      description: "Sync onetimeproducts state from GCP",
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
    batch_delete: {
      description: "batch delete",
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
            "id": "androidpublisher.monetization.onetimeproducts.batchDelete",
            "path":
              "androidpublisher/v3/applications/{packageName}/oneTimeProducts:batchDelete",
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
            "id": "androidpublisher.monetization.onetimeproducts.batchGet",
            "path":
              "androidpublisher/v3/applications/{packageName}/oneTimeProducts:batchGet",
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
            "id": "androidpublisher.monetization.onetimeproducts.batchUpdate",
            "path":
              "androidpublisher/v3/applications/{packageName}/oneTimeProducts:batchUpdate",
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
