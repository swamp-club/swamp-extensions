// Auto-generated extension model for @swamp/gcp/content/promotions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Promotions.
 *
 * Represents a promotion. See the following articles for more details. * [Promotions feed specification](https://support.google.com/merchants/answer/2906014) * [Local promotions feed specification](https://support.google.com/merchants/answer/10146130) * [Promotions on Buy on Google product data specification](https://support.google.com/merchants/answer/9173673)
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.promotions.get",
  "path": "{merchantId}/promotions/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "content.promotions.create",
  "path": "{merchantId}/promotions",
  "httpMethod": "POST",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "content.promotions.list",
  "path": "{merchantId}/promotions",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "countryCode": {
      "location": "query",
    },
    "languageCode": {
      "location": "query",
    },
    "merchantId": {
      "location": "path",
      "required": true,
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  brand: z.array(z.string()).describe(
    "Product filter by brand for the promotion.",
  ).optional(),
  brandExclusion: z.array(z.string()).describe(
    "Product filter by brand exclusion for the promotion.",
  ).optional(),
  contentLanguage: z.string().describe(
    "Required. The content language used as part of the unique identifier. `en` content language is available for all target countries. `fr` content language is available for `CA` and `FR` target countries. `de` content language is available for `DE` target country. `nl` content language is available for `NL` target country. `it` content language is available for `IT` target country. `pt` content language is available for `BR` target country. `ja` content language is available for `JP` target country. `ko` content language is available for `KR` target country.",
  ).optional(),
  couponValueType: z.enum([
    "COUPON_VALUE_TYPE_UNSPECIFIED",
    "MONEY_OFF",
    "PERCENT_OFF",
    "BUY_M_GET_N_MONEY_OFF",
    "BUY_M_GET_N_PERCENT_OFF",
    "BUY_M_GET_MONEY_OFF",
    "BUY_M_GET_PERCENT_OFF",
    "FREE_GIFT",
    "FREE_GIFT_WITH_VALUE",
    "FREE_GIFT_WITH_ITEM_ID",
    "FREE_SHIPPING_STANDARD",
    "FREE_SHIPPING_OVERNIGHT",
    "FREE_SHIPPING_TWO_DAY",
  ]).describe("Required. Coupon value type for the promotion.").optional(),
  customRedemptionRestriction: z.string().describe(
    "The custom redemption restriction for the promotion. If the `redemption_restriction` field is set to `CUSTOM`, this field must be set.",
  ).optional(),
  freeGiftDescription: z.string().describe(
    "Free gift description for the promotion.",
  ).optional(),
  freeGiftItemId: z.string().describe("Free gift item ID for the promotion.")
    .optional(),
  freeGiftValue: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  genericRedemptionCode: z.string().describe(
    "Generic redemption code for the promotion. To be used with the `offerType` field.",
  ).optional(),
  getThisQuantityDiscounted: z.number().int().describe(
    "The number of items discounted in the promotion.",
  ).optional(),
  itemGroupId: z.array(z.string()).describe(
    "Product filter by item group ID for the promotion.",
  ).optional(),
  itemGroupIdExclusion: z.array(z.string()).describe(
    "Product filter by item group ID exclusion for the promotion.",
  ).optional(),
  itemId: z.array(z.string()).describe(
    "Product filter by item ID for the promotion.",
  ).optional(),
  itemIdExclusion: z.array(z.string()).describe(
    "Product filter by item ID exclusion for the promotion.",
  ).optional(),
  limitQuantity: z.number().int().describe(
    "Maximum purchase quantity for the promotion.",
  ).optional(),
  limitValue: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  longTitle: z.string().describe("Required. Long title for the promotion.")
    .optional(),
  maxDiscountAmount: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  minimumPurchaseAmount: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  minimumPurchaseQuantity: z.number().int().describe(
    "Minimum purchase quantity for the promotion.",
  ).optional(),
  moneyBudget: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  moneyOffAmount: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  offerType: z.enum(["OFFER_TYPE_UNSPECIFIED", "NO_CODE", "GENERIC_CODE"])
    .describe("Required. Type of the promotion.").optional(),
  orderLimit: z.number().int().describe("Order limit for the promotion.")
    .optional(),
  percentOff: z.number().int().describe(
    "The percentage discount offered in the promotion.",
  ).optional(),
  productApplicability: z.enum([
    "PRODUCT_APPLICABILITY_UNSPECIFIED",
    "ALL_PRODUCTS",
    "SPECIFIC_PRODUCTS",
  ]).describe(
    "Required. Applicability of the promotion to either all products or only specific products.",
  ).optional(),
  productType: z.array(z.string()).describe(
    "Product filter by product type for the promotion.",
  ).optional(),
  productTypeExclusion: z.array(z.string()).describe(
    "Product filter by product type exclusion for the promotion.",
  ).optional(),
  promotionDestinationIds: z.array(z.string()).describe(
    "Destination ID for the promotion.",
  ).optional(),
  promotionDisplayTimePeriod: z.object({
    endTime: z.string().describe("The ending timestamp.").optional(),
    startTime: z.string().describe("The starting timestamp.").optional(),
  }).describe("A message that represents a time period.").optional(),
  promotionEffectiveTimePeriod: z.object({
    endTime: z.string().describe("The ending timestamp.").optional(),
    startTime: z.string().describe("The starting timestamp.").optional(),
  }).describe("A message that represents a time period.").optional(),
  promotionId: z.string().describe(
    "Required. The user provided promotion ID to uniquely identify the promotion.",
  ).optional(),
  promotionStatus: z.object({
    creationDate: z.string().describe(
      'Date on which the promotion has been created in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z"',
    ).optional(),
    destinationStatuses: z.array(z.object({
      destination: z.string().describe("The name of the destination.")
        .optional(),
      status: z.enum([
        "STATE_UNSPECIFIED",
        "IN_REVIEW",
        "REJECTED",
        "LIVE",
        "STOPPED",
        "EXPIRED",
        "PENDING",
      ]).describe("The status for the specified destination.").optional(),
    })).describe("The intended destinations for the promotion.").optional(),
    lastUpdateDate: z.string().describe(
      'Date on which the promotion status has been last updated in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z"',
    ).optional(),
    promotionIssue: z.array(z.object({
      code: z.string().describe("Code of the issue.").optional(),
      detail: z.string().describe("Explanation of the issue.").optional(),
    })).describe("A list of issues associated with the promotion.").optional(),
  }).describe("The status of the promotion.").optional(),
  promotionUrl: z.string().describe(
    "URL to the page on the merchant's site where the promotion shows. Local Inventory ads promotions throw an error if no promo url is included. URL is used to confirm that the promotion is valid and can be redeemed.",
  ).optional(),
  redemptionChannel: z.array(
    z.enum(["REDEMPTION_CHANNEL_UNSPECIFIED", "IN_STORE", "ONLINE"]),
  ).describe(
    "Required. Redemption channel for the promotion. At least one channel is required.",
  ).optional(),
  redemptionRestriction: z.enum([
    "REDEMPTION_RESTRICTION_UNSPECIFIED",
    "SUBSCRIBE_AND_SAVE",
    "FIRST_ORDER",
    "SIGN_UP_FOR_EMAIL",
    "SIGN_UP_FOR_TEXT",
    "FORMS_OF_PAYMENT",
    "CUSTOM",
  ]).describe("The redemption restriction for the promotion.").optional(),
  shippingServiceNames: z.array(z.string()).describe(
    "Shipping service names for the promotion.",
  ).optional(),
  storeApplicability: z.enum([
    "STORE_APPLICABILITY_UNSPECIFIED",
    "ALL_STORES",
    "SPECIFIC_STORES",
  ]).describe(
    "Whether the promotion applies to all stores, or only specified stores. Local Inventory ads promotions throw an error if no store applicability is included. An INVALID_ARGUMENT error is thrown if store_applicability is set to ALL_STORES and store_code or score_code_exclusion is set to a value.",
  ).optional(),
  storeCode: z.array(z.string()).describe(
    "Store codes to include for the promotion.",
  ).optional(),
  storeCodeExclusion: z.array(z.string()).describe(
    "Store codes to exclude for the promotion.",
  ).optional(),
  targetCountry: z.string().describe(
    "Required. The target country used as part of the unique identifier. Can be `AU`, `CA`, `DE`, `FR`, `GB`, `IN`, `US`, `BR`, `ES`, `NL`, `JP`, `IT` or `KR`.",
  ).optional(),
  merchantId: z.string().describe(
    "Required. The ID of the account that contains the collection.",
  ),
});

const StateSchema = z.object({
  brand: z.array(z.string()).optional(),
  brandExclusion: z.array(z.string()).optional(),
  contentLanguage: z.string().optional(),
  couponValueType: z.string().optional(),
  customRedemptionRestriction: z.string().optional(),
  freeGiftDescription: z.string().optional(),
  freeGiftItemId: z.string().optional(),
  freeGiftValue: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  genericRedemptionCode: z.string().optional(),
  getThisQuantityDiscounted: z.number().optional(),
  id: z.string(),
  itemGroupId: z.array(z.string()).optional(),
  itemGroupIdExclusion: z.array(z.string()).optional(),
  itemId: z.array(z.string()).optional(),
  itemIdExclusion: z.array(z.string()).optional(),
  limitQuantity: z.number().optional(),
  limitValue: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  longTitle: z.string().optional(),
  maxDiscountAmount: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  minimumPurchaseAmount: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  minimumPurchaseQuantity: z.number().optional(),
  moneyBudget: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  moneyOffAmount: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  offerType: z.string().optional(),
  orderLimit: z.number().optional(),
  percentOff: z.number().optional(),
  productApplicability: z.string().optional(),
  productType: z.array(z.string()).optional(),
  productTypeExclusion: z.array(z.string()).optional(),
  promotionDestinationIds: z.array(z.string()).optional(),
  promotionDisplayDates: z.string().optional(),
  promotionDisplayTimePeriod: z.object({
    endTime: z.string(),
    startTime: z.string(),
  }).optional(),
  promotionEffectiveDates: z.string().optional(),
  promotionEffectiveTimePeriod: z.object({
    endTime: z.string(),
    startTime: z.string(),
  }).optional(),
  promotionId: z.string().optional(),
  promotionStatus: z.object({
    creationDate: z.string(),
    destinationStatuses: z.array(z.object({
      destination: z.string(),
      status: z.string(),
    })),
    lastUpdateDate: z.string(),
    promotionIssue: z.array(z.object({
      code: z.string(),
      detail: z.string(),
    })),
  }).optional(),
  promotionUrl: z.string().optional(),
  redemptionChannel: z.array(z.string()).optional(),
  redemptionRestriction: z.string().optional(),
  shippingServiceNames: z.array(z.string()).optional(),
  storeApplicability: z.string().optional(),
  storeCode: z.array(z.string()).optional(),
  storeCodeExclusion: z.array(z.string()).optional(),
  targetCountry: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  brand: z.array(z.string()).describe(
    "Product filter by brand for the promotion.",
  ).optional(),
  brandExclusion: z.array(z.string()).describe(
    "Product filter by brand exclusion for the promotion.",
  ).optional(),
  contentLanguage: z.string().describe(
    "Required. The content language used as part of the unique identifier. `en` content language is available for all target countries. `fr` content language is available for `CA` and `FR` target countries. `de` content language is available for `DE` target country. `nl` content language is available for `NL` target country. `it` content language is available for `IT` target country. `pt` content language is available for `BR` target country. `ja` content language is available for `JP` target country. `ko` content language is available for `KR` target country.",
  ).optional(),
  couponValueType: z.enum([
    "COUPON_VALUE_TYPE_UNSPECIFIED",
    "MONEY_OFF",
    "PERCENT_OFF",
    "BUY_M_GET_N_MONEY_OFF",
    "BUY_M_GET_N_PERCENT_OFF",
    "BUY_M_GET_MONEY_OFF",
    "BUY_M_GET_PERCENT_OFF",
    "FREE_GIFT",
    "FREE_GIFT_WITH_VALUE",
    "FREE_GIFT_WITH_ITEM_ID",
    "FREE_SHIPPING_STANDARD",
    "FREE_SHIPPING_OVERNIGHT",
    "FREE_SHIPPING_TWO_DAY",
  ]).describe("Required. Coupon value type for the promotion.").optional(),
  customRedemptionRestriction: z.string().describe(
    "The custom redemption restriction for the promotion. If the `redemption_restriction` field is set to `CUSTOM`, this field must be set.",
  ).optional(),
  freeGiftDescription: z.string().describe(
    "Free gift description for the promotion.",
  ).optional(),
  freeGiftItemId: z.string().describe("Free gift item ID for the promotion.")
    .optional(),
  freeGiftValue: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  genericRedemptionCode: z.string().describe(
    "Generic redemption code for the promotion. To be used with the `offerType` field.",
  ).optional(),
  getThisQuantityDiscounted: z.number().int().describe(
    "The number of items discounted in the promotion.",
  ).optional(),
  itemGroupId: z.array(z.string()).describe(
    "Product filter by item group ID for the promotion.",
  ).optional(),
  itemGroupIdExclusion: z.array(z.string()).describe(
    "Product filter by item group ID exclusion for the promotion.",
  ).optional(),
  itemId: z.array(z.string()).describe(
    "Product filter by item ID for the promotion.",
  ).optional(),
  itemIdExclusion: z.array(z.string()).describe(
    "Product filter by item ID exclusion for the promotion.",
  ).optional(),
  limitQuantity: z.number().int().describe(
    "Maximum purchase quantity for the promotion.",
  ).optional(),
  limitValue: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  longTitle: z.string().describe("Required. Long title for the promotion.")
    .optional(),
  maxDiscountAmount: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  minimumPurchaseAmount: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  minimumPurchaseQuantity: z.number().int().describe(
    "Minimum purchase quantity for the promotion.",
  ).optional(),
  moneyBudget: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  moneyOffAmount: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).describe("The price represented as a number and currency.").optional(),
  offerType: z.enum(["OFFER_TYPE_UNSPECIFIED", "NO_CODE", "GENERIC_CODE"])
    .describe("Required. Type of the promotion.").optional(),
  orderLimit: z.number().int().describe("Order limit for the promotion.")
    .optional(),
  percentOff: z.number().int().describe(
    "The percentage discount offered in the promotion.",
  ).optional(),
  productApplicability: z.enum([
    "PRODUCT_APPLICABILITY_UNSPECIFIED",
    "ALL_PRODUCTS",
    "SPECIFIC_PRODUCTS",
  ]).describe(
    "Required. Applicability of the promotion to either all products or only specific products.",
  ).optional(),
  productType: z.array(z.string()).describe(
    "Product filter by product type for the promotion.",
  ).optional(),
  productTypeExclusion: z.array(z.string()).describe(
    "Product filter by product type exclusion for the promotion.",
  ).optional(),
  promotionDestinationIds: z.array(z.string()).describe(
    "Destination ID for the promotion.",
  ).optional(),
  promotionDisplayTimePeriod: z.object({
    endTime: z.string().describe("The ending timestamp.").optional(),
    startTime: z.string().describe("The starting timestamp.").optional(),
  }).describe("A message that represents a time period.").optional(),
  promotionEffectiveTimePeriod: z.object({
    endTime: z.string().describe("The ending timestamp.").optional(),
    startTime: z.string().describe("The starting timestamp.").optional(),
  }).describe("A message that represents a time period.").optional(),
  promotionId: z.string().describe(
    "Required. The user provided promotion ID to uniquely identify the promotion.",
  ).optional(),
  promotionStatus: z.object({
    creationDate: z.string().describe(
      'Date on which the promotion has been created in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z"',
    ).optional(),
    destinationStatuses: z.array(z.object({
      destination: z.string().describe("The name of the destination.")
        .optional(),
      status: z.enum([
        "STATE_UNSPECIFIED",
        "IN_REVIEW",
        "REJECTED",
        "LIVE",
        "STOPPED",
        "EXPIRED",
        "PENDING",
      ]).describe("The status for the specified destination.").optional(),
    })).describe("The intended destinations for the promotion.").optional(),
    lastUpdateDate: z.string().describe(
      'Date on which the promotion status has been last updated in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example "2020-01-02T09:00:00+01:00" or "2020-01-02T09:00:00Z"',
    ).optional(),
    promotionIssue: z.array(z.object({
      code: z.string().describe("Code of the issue.").optional(),
      detail: z.string().describe("Explanation of the issue.").optional(),
    })).describe("A list of issues associated with the promotion.").optional(),
  }).describe("The status of the promotion.").optional(),
  promotionUrl: z.string().describe(
    "URL to the page on the merchant's site where the promotion shows. Local Inventory ads promotions throw an error if no promo url is included. URL is used to confirm that the promotion is valid and can be redeemed.",
  ).optional(),
  redemptionChannel: z.array(
    z.enum(["REDEMPTION_CHANNEL_UNSPECIFIED", "IN_STORE", "ONLINE"]),
  ).describe(
    "Required. Redemption channel for the promotion. At least one channel is required.",
  ).optional(),
  redemptionRestriction: z.enum([
    "REDEMPTION_RESTRICTION_UNSPECIFIED",
    "SUBSCRIBE_AND_SAVE",
    "FIRST_ORDER",
    "SIGN_UP_FOR_EMAIL",
    "SIGN_UP_FOR_TEXT",
    "FORMS_OF_PAYMENT",
    "CUSTOM",
  ]).describe("The redemption restriction for the promotion.").optional(),
  shippingServiceNames: z.array(z.string()).describe(
    "Shipping service names for the promotion.",
  ).optional(),
  storeApplicability: z.enum([
    "STORE_APPLICABILITY_UNSPECIFIED",
    "ALL_STORES",
    "SPECIFIC_STORES",
  ]).describe(
    "Whether the promotion applies to all stores, or only specified stores. Local Inventory ads promotions throw an error if no store applicability is included. An INVALID_ARGUMENT error is thrown if store_applicability is set to ALL_STORES and store_code or score_code_exclusion is set to a value.",
  ).optional(),
  storeCode: z.array(z.string()).describe(
    "Store codes to include for the promotion.",
  ).optional(),
  storeCodeExclusion: z.array(z.string()).describe(
    "Store codes to exclude for the promotion.",
  ).optional(),
  targetCountry: z.string().describe(
    "Required. The target country used as part of the unique identifier. Can be `AU`, `CA`, `DE`, `FR`, `GB`, `IN`, `US`, `BR`, `ES`, `NL`, `JP`, `IT` or `KR`.",
  ).optional(),
  merchantId: z.string().describe(
    "Required. The ID of the account that contains the collection.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Content for Shopping Promotions. Registered at `@swamp/gcp/content/promotions`. */
export const model = {
  type: "@swamp/gcp/content/promotions",
  version: "2026.06.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a promotion. See the following articles for more details. * [Promo...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a promotions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["brand"] !== undefined) body["brand"] = g["brand"];
        if (g["brandExclusion"] !== undefined) {
          body["brandExclusion"] = g["brandExclusion"];
        }
        if (g["contentLanguage"] !== undefined) {
          body["contentLanguage"] = g["contentLanguage"];
        }
        if (g["couponValueType"] !== undefined) {
          body["couponValueType"] = g["couponValueType"];
        }
        if (g["customRedemptionRestriction"] !== undefined) {
          body["customRedemptionRestriction"] =
            g["customRedemptionRestriction"];
        }
        if (g["freeGiftDescription"] !== undefined) {
          body["freeGiftDescription"] = g["freeGiftDescription"];
        }
        if (g["freeGiftItemId"] !== undefined) {
          body["freeGiftItemId"] = g["freeGiftItemId"];
        }
        if (g["freeGiftValue"] !== undefined) {
          body["freeGiftValue"] = g["freeGiftValue"];
        }
        if (g["genericRedemptionCode"] !== undefined) {
          body["genericRedemptionCode"] = g["genericRedemptionCode"];
        }
        if (g["getThisQuantityDiscounted"] !== undefined) {
          body["getThisQuantityDiscounted"] = g["getThisQuantityDiscounted"];
        }
        if (g["itemGroupId"] !== undefined) {
          body["itemGroupId"] = g["itemGroupId"];
        }
        if (g["itemGroupIdExclusion"] !== undefined) {
          body["itemGroupIdExclusion"] = g["itemGroupIdExclusion"];
        }
        if (g["itemId"] !== undefined) body["itemId"] = g["itemId"];
        if (g["itemIdExclusion"] !== undefined) {
          body["itemIdExclusion"] = g["itemIdExclusion"];
        }
        if (g["limitQuantity"] !== undefined) {
          body["limitQuantity"] = g["limitQuantity"];
        }
        if (g["limitValue"] !== undefined) body["limitValue"] = g["limitValue"];
        if (g["longTitle"] !== undefined) body["longTitle"] = g["longTitle"];
        if (g["maxDiscountAmount"] !== undefined) {
          body["maxDiscountAmount"] = g["maxDiscountAmount"];
        }
        if (g["minimumPurchaseAmount"] !== undefined) {
          body["minimumPurchaseAmount"] = g["minimumPurchaseAmount"];
        }
        if (g["minimumPurchaseQuantity"] !== undefined) {
          body["minimumPurchaseQuantity"] = g["minimumPurchaseQuantity"];
        }
        if (g["moneyBudget"] !== undefined) {
          body["moneyBudget"] = g["moneyBudget"];
        }
        if (g["moneyOffAmount"] !== undefined) {
          body["moneyOffAmount"] = g["moneyOffAmount"];
        }
        if (g["offerType"] !== undefined) body["offerType"] = g["offerType"];
        if (g["orderLimit"] !== undefined) body["orderLimit"] = g["orderLimit"];
        if (g["percentOff"] !== undefined) body["percentOff"] = g["percentOff"];
        if (g["productApplicability"] !== undefined) {
          body["productApplicability"] = g["productApplicability"];
        }
        if (g["productType"] !== undefined) {
          body["productType"] = g["productType"];
        }
        if (g["productTypeExclusion"] !== undefined) {
          body["productTypeExclusion"] = g["productTypeExclusion"];
        }
        if (g["promotionDestinationIds"] !== undefined) {
          body["promotionDestinationIds"] = g["promotionDestinationIds"];
        }
        if (g["promotionDisplayTimePeriod"] !== undefined) {
          body["promotionDisplayTimePeriod"] = g["promotionDisplayTimePeriod"];
        }
        if (g["promotionEffectiveTimePeriod"] !== undefined) {
          body["promotionEffectiveTimePeriod"] =
            g["promotionEffectiveTimePeriod"];
        }
        if (g["promotionId"] !== undefined) {
          body["promotionId"] = g["promotionId"];
        }
        if (g["promotionStatus"] !== undefined) {
          body["promotionStatus"] = g["promotionStatus"];
        }
        if (g["promotionUrl"] !== undefined) {
          body["promotionUrl"] = g["promotionUrl"];
        }
        if (g["redemptionChannel"] !== undefined) {
          body["redemptionChannel"] = g["redemptionChannel"];
        }
        if (g["redemptionRestriction"] !== undefined) {
          body["redemptionRestriction"] = g["redemptionRestriction"];
        }
        if (g["shippingServiceNames"] !== undefined) {
          body["shippingServiceNames"] = g["shippingServiceNames"];
        }
        if (g["storeApplicability"] !== undefined) {
          body["storeApplicability"] = g["storeApplicability"];
        }
        if (g["storeCode"] !== undefined) body["storeCode"] = g["storeCode"];
        if (g["storeCodeExclusion"] !== undefined) {
          body["storeCodeExclusion"] = g["storeCodeExclusion"];
        }
        if (g["targetCountry"] !== undefined) {
          body["targetCountry"] = g["targetCountry"];
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
            listParams: { "merchantId": String(g["merchantId"] ?? "") },
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
      description: "Get a promotions",
      arguments: z.object({
        identifier: z.string().describe("The id of the promotions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["id"] = args.identifier;
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
    sync: {
      description: "Sync promotions state from GCP",
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
          if (g["merchantId"] !== undefined) {
            params["merchantId"] = String(g["merchantId"]);
          } else if (existing["merchantId"]) {
            params["merchantId"] = String(existing["merchantId"]);
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
      description: "List promotions resources",
      arguments: z.object({
        countryCode: z.string().describe(
          '[CLDR country code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) (for example, "US"), used as a filter on promotions target country.',
        ).optional(),
        languageCode: z.string().describe(
          "The two-letter ISO 639-1 language code associated with the promotions, used as a filter.",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of promotions to return. The service may return fewer than this value. If unspecified, at most 50 labels will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
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
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        if (args["countryCode"] !== undefined) {
          params["countryCode"] = String(args["countryCode"]);
        }
        if (args["languageCode"] !== undefined) {
          params["languageCode"] = String(args["languageCode"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "promotions",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
