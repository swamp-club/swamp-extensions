// Auto-generated extension model for @swamp/gcp/androidpublisher/inappproducts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Inappproducts.
 *
 * An in-app product. The resource for InappproductsService.
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
  "id": "androidpublisher.inappproducts.get",
  "path": "androidpublisher/v3/applications/{packageName}/inappproducts/{sku}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "sku",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "sku": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "androidpublisher.inappproducts.insert",
  "path": "androidpublisher/v3/applications/{packageName}/inappproducts",
  "httpMethod": "POST",
  "parameterOrder": [
    "packageName",
  ],
  "parameters": {
    "autoConvertMissingPrices": {
      "location": "query",
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "androidpublisher.inappproducts.update",
  "path": "androidpublisher/v3/applications/{packageName}/inappproducts/{sku}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "packageName",
    "sku",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "autoConvertMissingPrices": {
      "location": "query",
    },
    "latencyTolerance": {
      "location": "query",
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "sku": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidpublisher.inappproducts.delete",
  "path": "androidpublisher/v3/applications/{packageName}/inappproducts/{sku}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "packageName",
    "sku",
  ],
  "parameters": {
    "latencyTolerance": {
      "location": "query",
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "sku": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidpublisher.inappproducts.list",
  "path": "androidpublisher/v3/applications/{packageName}/inappproducts",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
  ],
  "parameters": {
    "maxResults": {
      "location": "query",
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "startIndex": {
      "location": "query",
    },
    "token": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  defaultLanguage: z.string().describe(
    'Default language of the localized data, as defined by BCP-47. e.g. "en-US".',
  ).optional(),
  defaultPrice: z.object({
    currency: z.string().describe(
      "3 letter Currency code, as defined by ISO 4217. See java/com/google/common/money/CurrencyCode.java",
    ).optional(),
    priceMicros: z.string().describe(
      "Price in 1/million of the currency base unit, represented as a string.",
    ).optional(),
  }).describe("Definition of a price, i.e. currency and units.").optional(),
  gracePeriod: z.string().describe(
    "Grace period of the subscription, specified in ISO 8601 format. Allows developers to give their subscribers a grace period when the payment for the new recurrence period is declined. Acceptable values are P0D (zero days), P3D (three days), P7D (seven days), P14D (14 days), and P30D (30 days).",
  ).optional(),
  listings: z.record(
    z.string(),
    z.object({
      benefits: z.array(z.string()).describe(
        "Localized entitlement benefits for a subscription.",
      ).optional(),
      description: z.string().describe("Description for the store listing.")
        .optional(),
      title: z.string().describe("Title for the store listing.").optional(),
    }),
  ).describe(
    'List of localized title and description data. Map key is the language of the localized data, as defined by BCP-47, e.g. "en-US".',
  ).optional(),
  managedProductTaxesAndComplianceSettings: z.object({
    eeaWithdrawalRightType: z.enum([
      "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED",
      "WITHDRAWAL_RIGHT_DIGITAL_CONTENT",
      "WITHDRAWAL_RIGHT_SERVICE",
    ]).describe(
      "Digital content or service classification for products distributed to users in the European Economic Area (EEA). The withdrawal regime under EEA consumer laws depends on this classification. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/10463498) for more information.",
    ).optional(),
    isTokenizedDigitalAsset: z.boolean().describe(
      "Whether this in-app product is declared as a product representing a tokenized digital asset.",
    ).optional(),
    productTaxCategoryCode: z.string().describe(
      "Product tax category code to assign to the in-app product. Product tax category determines the transaction tax rates applied to the product. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/16408159) for more information.",
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
    "Details about taxation and legal compliance for managed products.",
  ).optional(),
  packageName: z.string().describe("Package name of the parent app.")
    .optional(),
  prices: z.record(
    z.string(),
    z.object({
      currency: z.string().describe(
        "3 letter Currency code, as defined by ISO 4217. See java/com/google/common/money/CurrencyCode.java",
      ).optional(),
      priceMicros: z.string().describe(
        "Price in 1/million of the currency base unit, represented as a string.",
      ).optional(),
    }),
  ).describe(
    "Prices per buyer region. None of these can be zero, as in-app products are never free. Map key is region code, as defined by ISO 3166-2.",
  ).optional(),
  purchaseType: z.enum([
    "purchaseTypeUnspecified",
    "managedUser",
    "subscription",
  ]).describe("The type of the product, e.g. a recurring subscription.")
    .optional(),
  sku: z.string().describe(
    "Stock-keeping-unit (SKU) of the product, unique within an app.",
  ).optional(),
  status: z.enum(["statusUnspecified", "active", "inactive"]).describe(
    "The status of the product, e.g. whether it's active.",
  ).optional(),
  subscriptionPeriod: z.string().describe(
    "Subscription period, specified in ISO 8601 format. Acceptable values are P1W (one week), P1M (one month), P3M (three months), P6M (six months), and P1Y (one year).",
  ).optional(),
  subscriptionTaxesAndComplianceSettings: z.object({
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
  trialPeriod: z.string().describe(
    "Trial period, specified in ISO 8601 format. Acceptable values are anything between P7D (seven days) and P999D (999 days).",
  ).optional(),
  autoConvertMissingPrices: z.string().describe(
    "If true the prices for all regions targeted by the parent app that don't have a price specified for this in-app product will be auto converted to the target currency based on the default price. Defaults to false.",
  ).optional(),
});

const StateSchema = z.object({
  defaultLanguage: z.string().optional(),
  defaultPrice: z.object({
    currency: z.string(),
    priceMicros: z.string(),
  }).optional(),
  gracePeriod: z.string().optional(),
  listings: z.record(z.string(), z.unknown()).optional(),
  managedProductTaxesAndComplianceSettings: z.object({
    eeaWithdrawalRightType: z.string(),
    isTokenizedDigitalAsset: z.boolean(),
    productTaxCategoryCode: z.string(),
    regionalProductAgeRatingInfos: z.array(z.object({
      productAgeRatingTier: z.string(),
      regionCode: z.string(),
    })),
    taxRateInfoByRegionCode: z.record(z.string(), z.unknown()),
  }).optional(),
  packageName: z.string().optional(),
  prices: z.record(z.string(), z.unknown()).optional(),
  purchaseType: z.string().optional(),
  sku: z.string().optional(),
  status: z.string().optional(),
  subscriptionPeriod: z.string().optional(),
  subscriptionTaxesAndComplianceSettings: z.object({
    eeaWithdrawalRightType: z.string(),
    isTokenizedDigitalAsset: z.boolean(),
    productTaxCategoryCode: z.string(),
    regionalProductAgeRatingInfos: z.array(z.object({
      productAgeRatingTier: z.string(),
      regionCode: z.string(),
    })),
    taxRateInfoByRegionCode: z.record(z.string(), z.unknown()),
  }).optional(),
  trialPeriod: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  defaultLanguage: z.string().describe(
    'Default language of the localized data, as defined by BCP-47. e.g. "en-US".',
  ).optional(),
  defaultPrice: z.object({
    currency: z.string().describe(
      "3 letter Currency code, as defined by ISO 4217. See java/com/google/common/money/CurrencyCode.java",
    ).optional(),
    priceMicros: z.string().describe(
      "Price in 1/million of the currency base unit, represented as a string.",
    ).optional(),
  }).describe("Definition of a price, i.e. currency and units.").optional(),
  gracePeriod: z.string().describe(
    "Grace period of the subscription, specified in ISO 8601 format. Allows developers to give their subscribers a grace period when the payment for the new recurrence period is declined. Acceptable values are P0D (zero days), P3D (three days), P7D (seven days), P14D (14 days), and P30D (30 days).",
  ).optional(),
  listings: z.record(
    z.string(),
    z.object({
      benefits: z.array(z.string()).describe(
        "Localized entitlement benefits for a subscription.",
      ).optional(),
      description: z.string().describe("Description for the store listing.")
        .optional(),
      title: z.string().describe("Title for the store listing.").optional(),
    }),
  ).describe(
    'List of localized title and description data. Map key is the language of the localized data, as defined by BCP-47, e.g. "en-US".',
  ).optional(),
  managedProductTaxesAndComplianceSettings: z.object({
    eeaWithdrawalRightType: z.enum([
      "WITHDRAWAL_RIGHT_TYPE_UNSPECIFIED",
      "WITHDRAWAL_RIGHT_DIGITAL_CONTENT",
      "WITHDRAWAL_RIGHT_SERVICE",
    ]).describe(
      "Digital content or service classification for products distributed to users in the European Economic Area (EEA). The withdrawal regime under EEA consumer laws depends on this classification. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/10463498) for more information.",
    ).optional(),
    isTokenizedDigitalAsset: z.boolean().describe(
      "Whether this in-app product is declared as a product representing a tokenized digital asset.",
    ).optional(),
    productTaxCategoryCode: z.string().describe(
      "Product tax category code to assign to the in-app product. Product tax category determines the transaction tax rates applied to the product. Refer to the [Help Center article](https://support.google.com/googleplay/android-developer/answer/16408159) for more information.",
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
    "Details about taxation and legal compliance for managed products.",
  ).optional(),
  packageName: z.string().describe("Package name of the parent app.")
    .optional(),
  prices: z.record(
    z.string(),
    z.object({
      currency: z.string().describe(
        "3 letter Currency code, as defined by ISO 4217. See java/com/google/common/money/CurrencyCode.java",
      ).optional(),
      priceMicros: z.string().describe(
        "Price in 1/million of the currency base unit, represented as a string.",
      ).optional(),
    }),
  ).describe(
    "Prices per buyer region. None of these can be zero, as in-app products are never free. Map key is region code, as defined by ISO 3166-2.",
  ).optional(),
  purchaseType: z.enum([
    "purchaseTypeUnspecified",
    "managedUser",
    "subscription",
  ]).describe("The type of the product, e.g. a recurring subscription.")
    .optional(),
  sku: z.string().describe(
    "Stock-keeping-unit (SKU) of the product, unique within an app.",
  ).optional(),
  status: z.enum(["statusUnspecified", "active", "inactive"]).describe(
    "The status of the product, e.g. whether it's active.",
  ).optional(),
  subscriptionPeriod: z.string().describe(
    "Subscription period, specified in ISO 8601 format. Acceptable values are P1W (one week), P1M (one month), P3M (three months), P6M (six months), and P1Y (one year).",
  ).optional(),
  subscriptionTaxesAndComplianceSettings: z.object({
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
  trialPeriod: z.string().describe(
    "Trial period, specified in ISO 8601 format. Acceptable values are anything between P7D (seven days) and P999D (999 days).",
  ).optional(),
  autoConvertMissingPrices: z.string().describe(
    "If true the prices for all regions targeted by the parent app that don't have a price specified for this in-app product will be auto converted to the target currency based on the default price. Defaults to false.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Inappproducts. Registered at `@swamp/gcp/androidpublisher/inappproducts`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/inappproducts",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An in-app product. The resource for InappproductsService.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a inappproducts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        const body: Record<string, unknown> = {};
        if (g["defaultLanguage"] !== undefined) {
          body["defaultLanguage"] = g["defaultLanguage"];
        }
        if (g["defaultPrice"] !== undefined) {
          body["defaultPrice"] = g["defaultPrice"];
        }
        if (g["gracePeriod"] !== undefined) {
          body["gracePeriod"] = g["gracePeriod"];
        }
        if (g["listings"] !== undefined) body["listings"] = g["listings"];
        if (g["managedProductTaxesAndComplianceSettings"] !== undefined) {
          body["managedProductTaxesAndComplianceSettings"] =
            g["managedProductTaxesAndComplianceSettings"];
        }
        if (g["prices"] !== undefined) body["prices"] = g["prices"];
        if (g["purchaseType"] !== undefined) {
          body["purchaseType"] = g["purchaseType"];
        }
        if (g["sku"] !== undefined) body["sku"] = g["sku"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subscriptionPeriod"] !== undefined) {
          body["subscriptionPeriod"] = g["subscriptionPeriod"];
        }
        if (g["subscriptionTaxesAndComplianceSettings"] !== undefined) {
          body["subscriptionTaxesAndComplianceSettings"] =
            g["subscriptionTaxesAndComplianceSettings"];
        }
        if (g["trialPeriod"] !== undefined) {
          body["trialPeriod"] = g["trialPeriod"];
        }
        if (g["autoConvertMissingPrices"] !== undefined) {
          body["autoConvertMissingPrices"] = g["autoConvertMissingPrices"];
        }
        if (g["name"] !== undefined) params["sku"] = String(g["name"]);
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
      description: "Get a inappproducts",
      arguments: z.object({
        identifier: z.string().describe("The name of the inappproducts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        params["sku"] = args.identifier;
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
      description: "Update inappproducts attributes",
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
        params["sku"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["defaultLanguage"] !== undefined) {
          body["defaultLanguage"] = g["defaultLanguage"];
        }
        if (g["defaultPrice"] !== undefined) {
          body["defaultPrice"] = g["defaultPrice"];
        }
        if (g["gracePeriod"] !== undefined) {
          body["gracePeriod"] = g["gracePeriod"];
        }
        if (g["listings"] !== undefined) body["listings"] = g["listings"];
        if (g["managedProductTaxesAndComplianceSettings"] !== undefined) {
          body["managedProductTaxesAndComplianceSettings"] =
            g["managedProductTaxesAndComplianceSettings"];
        }
        if (g["prices"] !== undefined) body["prices"] = g["prices"];
        if (g["purchaseType"] !== undefined) {
          body["purchaseType"] = g["purchaseType"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subscriptionPeriod"] !== undefined) {
          body["subscriptionPeriod"] = g["subscriptionPeriod"];
        }
        if (g["subscriptionTaxesAndComplianceSettings"] !== undefined) {
          body["subscriptionTaxesAndComplianceSettings"] =
            g["subscriptionTaxesAndComplianceSettings"];
        }
        if (g["trialPeriod"] !== undefined) {
          body["trialPeriod"] = g["trialPeriod"];
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
    delete: {
      description: "Delete the inappproducts",
      arguments: z.object({
        identifier: z.string().describe("The name of the inappproducts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        params["sku"] = args.identifier;
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
      description: "Sync inappproducts state from GCP",
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
          params["sku"] = identifier;
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
            "id": "androidpublisher.inappproducts.batchDelete",
            "path":
              "androidpublisher/v3/applications/{packageName}/inappproducts:batchDelete",
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
            "id": "androidpublisher.inappproducts.batchGet",
            "path":
              "androidpublisher/v3/applications/{packageName}/inappproducts:batchGet",
            "httpMethod": "GET",
            "parameterOrder": ["packageName"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "sku": { "location": "query" },
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
            "id": "androidpublisher.inappproducts.batchUpdate",
            "path":
              "androidpublisher/v3/applications/{packageName}/inappproducts:batchUpdate",
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
