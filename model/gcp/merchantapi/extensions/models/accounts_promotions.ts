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

// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-promotions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.Promotions.
 *
 * Represents a promotion. See the following articles for more details. Required promotion input attributes to pass data validation checks are primarily defined below: * [Promotions data specification](https://support.google.com/merchants/answer/2906014) * [Local promotions data specification](https://support.google.com/merchants/answer/10146130) After inserting, updating a promotion input, it may take several minutes before the final promotion can be retrieved.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/promotions/${shortName}`;
}

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.promotions.get",
  "path": "promotions/v1/{+name}",
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
  "id": "merchantapi.accounts.promotions.insert",
  "path": "promotions/v1/{+parent}/promotions:insert",
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

const LIST_CONFIG = {
  "id": "merchantapi.accounts.promotions.list",
  "path": "promotions/v1/{+parent}/promotions",
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
  dataSource: z.string().describe(
    "Required. The data source of the [promotion](https://support.google.com/merchants/answer/6396268?sjid=5155774230887277618-NC) Format: `accounts/{account}/dataSources/{datasource}`.",
  ).optional(),
  promotion: z.object({
    attributes: z.object({
      audience: z.enum(["AUDIENCE_UNSPECIFIED", "NEW_CUSTOMERS", "LOCATION"])
        .describe(
          "Optional. This field defines the audience a promotion will be visible to.",
        ).optional(),
      brandExclusion: z.array(z.string()).describe(
        "Optional. Product filter by [brand exclusion](https://support.google.com/merchants/answer/13861679?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      brandInclusion: z.array(z.string()).describe(
        "Optional. Product filter by brand for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
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
        "MONEY_OFF_RANGE",
        "PERCENT_OFF_RANGE",
      ]).describe(
        "Required. The [coupon value type] (https://support.google.com/merchants/answer/13861986?ref_topic=13773355) attribute to signal the type of promotion that you are running. Depending on type of the selected coupon value [some attributes are required](https://support.google.com/merchants/answer/6393006?ref_topic=7322920).",
      ).optional(),
      customRedemptionRestriction: z.string().describe(
        "Optional. The custom redemption restriction for the promotion. If the `redemption_restriction` field is set to `CUSTOM`, this field must be set.",
      ).optional(),
      eventApplicability: z.enum([
        "EVENT_APPLICABILITY_UNSPECIFIED",
        "SITEWIDE",
        "SPECIFIC_CATEGORIES",
      ]).describe(
        "Optional. Event applicability for this promotion. When present, this field indicates you are creating a [sales event](https://support.google.com/merchants/answer/15523289) and not a product promotion. Exactly one of `product_applicability` or `event_applicability` must be set.",
      ).optional(),
      freeGiftDescription: z.string().describe(
        "Optional. [Free gift description](https://support.google.com/merchants/answer/13847245?ref_topic=13773355) for the promotion.",
      ).optional(),
      freeGiftItemId: z.string().describe(
        "Optional. [Free gift item ID](https://support.google.com/merchants/answer/13857152?ref_topic=13773355) for the promotion.",
      ).optional(),
      freeGiftValue: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      genericRedemptionCode: z.string().describe(
        "Optional. Generic redemption code for the promotion. To be used with the `offerType` field and must meet the [minimum requirements](https://support.google.com/merchants/answer/13837405?ref_topic=13773355).",
      ).optional(),
      getThisQuantityDiscounted: z.string().describe(
        "Optional. The number of items discounted in the promotion. The attribute is set when `couponValueType` is equal to `buy_m_get_n_money_off` or `buy_m_get_n_percent_off`.",
      ).optional(),
      googleProductCategories: z.array(z.string()).describe(
        "Optional. A list of Google product categories for this promotion. Set if `EventApplicability` is `SPECIFIC_CATEGORIES`. Up to 5 product categories can be specified. For more details on eligible values for product categories, checkout the `google_product_category` attribute in the [Promotion data specification](https://support.google.com/merchants/answer/2906014).",
      ).optional(),
      itemGroupIdExclusion: z.array(z.string()).describe(
        "Optional. Product filter by [item group ID](https://support.google.com/merchants/answer/13837298?ref_topic=13773355). The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355). exclusion for the promotion.",
      ).optional(),
      itemGroupIdInclusion: z.array(z.string()).describe(
        "Optional. Product filter by item group ID for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability [product_applicability] attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      itemIdExclusion: z.array(z.string()).describe(
        "Optional. Product filter by [item ID exclusion](https://support.google.com/merchants/answer/13863524?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      itemIdInclusion: z.array(z.string()).describe(
        "Optional. Product filter by [item ID](https://support.google.com/merchants/answer/13861565?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      limitQuantity: z.string().describe(
        "Optional. [Maximum purchase quantity](https://support.google.com/merchants/answer/13861564?ref_topic=13773355) for the promotion.",
      ).optional(),
      limitValue: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      longTitle: z.string().describe(
        "Required. [Long title](https://support.google.com/merchants/answer/13838102?ref_topic=13773355) for the promotion.",
      ).optional(),
      maxDiscountAmount: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      maxMoneyOffAmount: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      maxPercentOff: z.string().describe(
        "Optional. Maximum percent off for a promotion with `PERCENT_OFF_RANGE` coupon value type. At least one of `min_percent_off` or `max_percent_off` must be present when the coupon value type is `PERCENT_OFF_RANGE`. If neither is provided an `INVALID_PROMOTION_MISSING_BENEFIT_OR_RESTRICTION` error is returned.",
      ).optional(),
      minMoneyOffAmount: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      minPercentOff: z.string().describe(
        "Optional. Minimum percent off for a promotion with `PERCENT_OFF_RANGE` coupon value type. At least one of `min_percent_off` or `max_percent_off` must be present when the coupon value type is `PERCENT_OFF_RANGE`. If neither is provided an `INVALID_PROMOTION_MISSING_BENEFIT_OR_RESTRICTION` error is returned.",
      ).optional(),
      minimumPurchaseAmount: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      minimumPurchaseQuantity: z.string().optional(),
      moneyOffAmount: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      offerType: z.enum(["OFFER_TYPE_UNSPECIFIED", "NO_CODE", "GENERIC_CODE"])
        .describe(
          "Required. [Type](https://support.google.com/merchants/answer/13837405?ref_topic=13773355) of the promotion. Use this attribute to indicate whether or not customers need a coupon code to redeem your promotion.",
        ).optional(),
      percentOff: z.string().describe(
        "Optional. The [percentage discount](https://support.google.com/merchants/answer/13837404?sjid=17642868584668136159-NC) offered in the promotion.",
      ).optional(),
      productApplicability: z.enum([
        "PRODUCT_APPLICABILITY_UNSPECIFIED",
        "ALL_PRODUCTS",
        "SPECIFIC_PRODUCTS",
      ]).describe(
        "Optional. Applicability of the promotion to either all products or [only specific products](https://support.google.com/merchants/answer/6396257). Exactly one of `product_applicability` or `event_applicability` must be set.",
      ).optional(),
      productTypeExclusion: z.array(z.string()).describe(
        "Optional. Product filter by [product type exclusion](https://support.google.com/merchants/answer/13863746?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      productTypeInclusion: z.array(z.string()).describe(
        "Optional. Product filter by product type for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      promotionDestinations: z.array(
        z.enum([
          "DESTINATION_ENUM_UNSPECIFIED",
          "SHOPPING_ADS",
          "DISPLAY_ADS",
          "LOCAL_INVENTORY_ADS",
          "FREE_LISTINGS",
          "FREE_LOCAL_LISTINGS",
          "YOUTUBE_SHOPPING",
          "YOUTUBE_SHOPPING_CHECKOUT",
          "YOUTUBE_AFFILIATE",
          "FREE_VEHICLE_LISTINGS",
          "VEHICLE_ADS",
          "CLOUD_RETAIL",
          "LOCAL_CLOUD_RETAIL",
        ]),
      ).describe(
        "Required. The list of destinations (also known as [Marketing methods](https://support.google.com/merchants/answer/15130232)) where the promotion applies to. If you don't specify a destination by including a supported value in your data source, your promotion will display in Shopping ads and free listings by default. You may have previously submitted the following values as destinations for your products: Shopping Actions, Surfaces across Google, Local surfaces across Google. To represent these values use `FREE_LISTINGS`, `FREE_LOCAL_LISTINGS`, `LOCAL_INVENTORY_ADS`. For more details see [Promotion destination](https://support.google.com/merchants/answer/13837465)",
      ).optional(),
      promotionDisplayTimePeriod: z.object({
        endTime: z.string().describe(
          "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
        ).optional(),
        startTime: z.string().describe(
          "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
        ).optional(),
      }).describe(
        "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
      ).optional(),
      promotionEffectiveTimePeriod: z.object({
        endTime: z.string().describe(
          "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
        ).optional(),
        startTime: z.string().describe(
          "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
        ).optional(),
      }).describe(
        "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
      ).optional(),
      promotionUrl: z.string().describe(
        "Optional. URL to the page on the merchant's site where the promotion shows. Local Inventory ads promotions throw an error if no `promotion_url` is included. URL is used to confirm that the promotion is valid and can be redeemed.",
      ).optional(),
      redemptionRestriction: z.enum([
        "REDEMPTION_RESTRICTION_UNSPECIFIED",
        "SUBSCRIBE",
        "FIRST_ORDER",
        "SIGNUP_FOR_EMAIL",
        "SIGNUP_FOR_TEXT",
        "CUSTOM",
      ]).describe(
        "Optional. A restriction customers must meet before they can redeem the promotion.",
      ).optional(),
      regionIdInclusion: z.array(z.string()).describe(
        "Optional. A list of [regions](https://support.google.com/merchants/answer/15406457?#howregionswork) where the promotion is applicable. Must be set if `audience` is set to `LOCATION`.",
      ).optional(),
      storeApplicability: z.enum([
        "STORE_APPLICABILITY_UNSPECIFIED",
        "ALL_STORES",
        "SPECIFIC_STORES",
      ]).describe(
        "Optional. Whether the promotion applies to [all stores, or only specified stores](https://support.google.com/merchants/answer/13857563?sjid=17642868584668136159-NC). Local Inventory ads promotions throw an error if no store applicability is included. An `INVALID_ARGUMENT` error is thrown if `store_applicability` is set to `ALL_STORES` and `store_codes_inclusion` or `score_code_exclusion` is set to a value.",
      ).optional(),
      storeCodesExclusion: z.array(z.string()).describe(
        "Optional. [Store codes to exclude](https://support.google.com/merchants/answer/13859586?ref_topic=13773355) for the promotion. The store filter attributes only applies when the `store_applicability` attribute is set to [specific_stores](https://support.google.com/merchants/answer/13857563?ref_topic=13773355).",
      ).optional(),
      storeCodesInclusion: z.array(z.string()).describe(
        "Optional. [Store codes to include](https://support.google.com/merchants/answer/13857470?ref_topic=13773355) for the promotion. The store filter attributes only applies when the `store_applicability` attribute is set to [specific_stores](https://support.google.com/merchants/answer/13857563?ref_topic=13773355). Store code (the store ID from your Business Profile) of the physical store the product is sold in. See the [Local product inventory data specification](https://support.google.com/merchants/answer/3061342) for more information.",
      ).optional(),
    }).describe("Attributes.").optional(),
    contentLanguage: z.string().describe(
      "Required. The two-letter [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code for the promotion. Promotions is only for [selected languages](https://support.google.com/merchants/answer/4588281?ref_topic=6396150&sjid=18314938579342094533-NC#option3&zippy=).",
    ).optional(),
    customAttributes: z.array(z.object({
      groupValues: z.array(z.record(z.string(), z.unknown())).describe(
        "Subattributes within this attribute group. If `group_values` is not empty, `value` must be empty.",
      ).optional(),
      name: z.string().describe("The name of the attribute.").optional(),
      value: z.string().describe(
        "The value of the attribute. If `value` is not empty, `group_values` must be empty.",
      ).optional(),
    })).describe(
      'Optional. A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the data specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API.',
    ).optional(),
    dataSource: z.string().describe(
      "Output only. The primary data source of the promotion.",
    ).optional(),
    name: z.string().describe(
      "Identifier. The name of the promotion. Format: `accounts/{account}/promotions/{promotion}`",
    ).optional(),
    promotionId: z.string().describe(
      "Required. The user provided promotion ID to uniquely identify the promotion. Follow [minimum requirements](https://support.google.com/merchants/answer/7050148?ref_topic=7322920&sjid=871860036916537104-NC#minimum_requirements) to prevent promotion disapprovals.",
    ).optional(),
    promotionStatus: z.object({
      creationDate: z.string().describe(
        "Output only. Date on which the promotion has been created in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example `2020-01-02T09:00:00+01:00` or `2020-01-02T09:00:00Z`",
      ).optional(),
      destinationStatuses: z.array(z.object({
        reportingContext: z.enum([
          "REPORTING_CONTEXT_ENUM_UNSPECIFIED",
          "SHOPPING_ADS",
          "DISCOVERY_ADS",
          "DEMAND_GEN_ADS",
          "DEMAND_GEN_ADS_DISCOVER_SURFACE",
          "VIDEO_ADS",
          "DISPLAY_ADS",
          "LOCAL_INVENTORY_ADS",
          "VEHICLE_INVENTORY_ADS",
          "FREE_LISTINGS",
          "FREE_LISTINGS_UCP_CHECKOUT",
          "FREE_LOCAL_LISTINGS",
          "FREE_LOCAL_VEHICLE_LISTINGS",
          "YOUTUBE_AFFILIATE",
          "YOUTUBE_SHOPPING",
          "CLOUD_RETAIL",
          "LOCAL_CLOUD_RETAIL",
          "PRODUCT_REVIEWS",
          "MERCHANT_REVIEWS",
          "YOUTUBE_CHECKOUT",
        ]).describe("Output only. The name of the promotion destination.")
          .optional(),
        status: z.enum([
          "STATE_UNSPECIFIED",
          "IN_REVIEW",
          "REJECTED",
          "LIVE",
          "STOPPED",
          "EXPIRED",
          "PENDING",
        ]).describe("Output only. The status for the specified destination.")
          .optional(),
      })).describe("Output only. The intended destinations for the promotion.")
        .optional(),
      itemLevelIssues: z.array(z.object({
        applicableCountries: z.array(z.unknown()).describe(
          "Output only. List of country codes (ISO 3166-1 alpha-2) where issue applies to the offer.",
        ).optional(),
        attribute: z.string().describe(
          "Output only. The attribute's name, if the issue is caused by a single attribute.",
        ).optional(),
        code: z.string().describe("Output only. The error code of the issue.")
          .optional(),
        description: z.string().describe(
          "Output only. A short issue description in English.",
        ).optional(),
        detail: z.string().describe(
          "Output only. A detailed issue description in English.",
        ).optional(),
        documentation: z.string().describe(
          "Output only. The URL of a web page to help with resolving this issue.",
        ).optional(),
        reportingContext: z.enum([
          "REPORTING_CONTEXT_ENUM_UNSPECIFIED",
          "SHOPPING_ADS",
          "DISCOVERY_ADS",
          "DEMAND_GEN_ADS",
          "DEMAND_GEN_ADS_DISCOVER_SURFACE",
          "VIDEO_ADS",
          "DISPLAY_ADS",
          "LOCAL_INVENTORY_ADS",
          "VEHICLE_INVENTORY_ADS",
          "FREE_LISTINGS",
          "FREE_LISTINGS_UCP_CHECKOUT",
          "FREE_LOCAL_LISTINGS",
          "FREE_LOCAL_VEHICLE_LISTINGS",
          "YOUTUBE_AFFILIATE",
          "YOUTUBE_SHOPPING",
          "CLOUD_RETAIL",
          "LOCAL_CLOUD_RETAIL",
          "PRODUCT_REVIEWS",
          "MERCHANT_REVIEWS",
          "YOUTUBE_CHECKOUT",
        ]).describe("Output only. The destination the issue applies to.")
          .optional(),
        resolution: z.string().describe(
          "Output only. Whether the issue can be resolved by the merchant.",
        ).optional(),
        severity: z.enum([
          "SEVERITY_UNSPECIFIED",
          "NOT_IMPACTED",
          "DEMOTED",
          "DISAPPROVED",
        ]).describe(
          "Output only. How this issue affects serving of the promotion.",
        ).optional(),
      })).describe(
        "Output only. A list of issues associated with the promotion.",
      ).optional(),
      lastUpdateDate: z.string().describe(
        "Output only. Date on which the promotion status has been last updated in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example `2020-01-02T09:00:00+01:00` or `2020-01-02T09:00:00Z`",
      ).optional(),
    }).describe("The status of the promotion.").optional(),
    redemptionChannel: z.array(
      z.enum(["REDEMPTION_CHANNEL_UNSPECIFIED", "IN_STORE", "ONLINE"]),
    ).describe(
      "Required. [Redemption channel](https://support.google.com/merchants/answer/13837674?ref_topic=13773355&sjid=17642868584668136159-NC) for the promotion. At least one channel is required.",
    ).optional(),
    targetCountry: z.string().describe(
      "Required. The target country used as part of the unique identifier. Represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml). Promotions are only available in selected countries, [Free Listings and Shopping ads](https://support.google.com/merchants/answer/4588460) [Local Inventory ads](https://support.google.com/merchants/answer/10146326)",
    ).optional(),
    versionNumber: z.string().describe(
      "Optional. Represents the existing version (freshness) of the promotion, which can be used to preserve the right order when multiple updates are done at the same time. If set, the insertion is prevented when version number is lower than the current version number of the existing promotion. Re-insertion (for example, promotion refresh after 30 days) can be performed with the current `version_number`. If the operation is prevented, the aborted exception will be thrown.",
    ).optional(),
  }).describe(
    "Represents a promotion. See the following articles for more details. Required promotion input attributes to pass data validation checks are primarily defined below: * [Promotions data specification](https://support.google.com/merchants/answer/2906014) * [Local promotions data specification](https://support.google.com/merchants/answer/10146130) After inserting, updating a promotion input, it may take several minutes before the final promotion can be retrieved.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  attributes: z.object({
    audience: z.string(),
    brandExclusion: z.array(z.string()),
    brandInclusion: z.array(z.string()),
    couponValueType: z.string(),
    customRedemptionRestriction: z.string(),
    eventApplicability: z.string(),
    freeGiftDescription: z.string(),
    freeGiftItemId: z.string(),
    freeGiftValue: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    genericRedemptionCode: z.string(),
    getThisQuantityDiscounted: z.string(),
    googleProductCategories: z.array(z.string()),
    itemGroupIdExclusion: z.array(z.string()),
    itemGroupIdInclusion: z.array(z.string()),
    itemIdExclusion: z.array(z.string()),
    itemIdInclusion: z.array(z.string()),
    limitQuantity: z.string(),
    limitValue: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    longTitle: z.string(),
    maxDiscountAmount: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    maxMoneyOffAmount: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    maxPercentOff: z.string(),
    minMoneyOffAmount: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    minPercentOff: z.string(),
    minimumPurchaseAmount: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    minimumPurchaseQuantity: z.string(),
    moneyOffAmount: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    offerType: z.string(),
    percentOff: z.string(),
    productApplicability: z.string(),
    productTypeExclusion: z.array(z.string()),
    productTypeInclusion: z.array(z.string()),
    promotionDestinations: z.array(z.string()),
    promotionDisplayTimePeriod: z.object({
      endTime: z.string(),
      startTime: z.string(),
    }),
    promotionEffectiveTimePeriod: z.object({
      endTime: z.string(),
      startTime: z.string(),
    }),
    promotionUrl: z.string(),
    redemptionRestriction: z.string(),
    regionIdInclusion: z.array(z.string()),
    storeApplicability: z.string(),
    storeCodesExclusion: z.array(z.string()),
    storeCodesInclusion: z.array(z.string()),
  }).optional(),
  contentLanguage: z.string().optional(),
  customAttributes: z.array(z.object({
    groupValues: z.array(z.record(z.string(), z.unknown())),
    name: z.string(),
    value: z.string(),
  })).optional(),
  dataSource: z.string().optional(),
  name: z.string(),
  promotionId: z.string().optional(),
  promotionStatus: z.object({
    creationDate: z.string(),
    destinationStatuses: z.array(z.object({
      reportingContext: z.string(),
      status: z.string(),
    })),
    itemLevelIssues: z.array(z.object({
      applicableCountries: z.array(z.string()),
      attribute: z.string(),
      code: z.string(),
      description: z.string(),
      detail: z.string(),
      documentation: z.string(),
      reportingContext: z.string(),
      resolution: z.string(),
      severity: z.string(),
    })),
    lastUpdateDate: z.string(),
  }).optional(),
  redemptionChannel: z.array(z.string()).optional(),
  targetCountry: z.string().optional(),
  versionNumber: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  dataSource: z.string().describe(
    "Required. The data source of the [promotion](https://support.google.com/merchants/answer/6396268?sjid=5155774230887277618-NC) Format: `accounts/{account}/dataSources/{datasource}`.",
  ).optional(),
  promotion: z.object({
    attributes: z.object({
      audience: z.enum(["AUDIENCE_UNSPECIFIED", "NEW_CUSTOMERS", "LOCATION"])
        .describe(
          "Optional. This field defines the audience a promotion will be visible to.",
        ).optional(),
      brandExclusion: z.array(z.string()).describe(
        "Optional. Product filter by [brand exclusion](https://support.google.com/merchants/answer/13861679?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      brandInclusion: z.array(z.string()).describe(
        "Optional. Product filter by brand for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
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
        "MONEY_OFF_RANGE",
        "PERCENT_OFF_RANGE",
      ]).describe(
        "Required. The [coupon value type] (https://support.google.com/merchants/answer/13861986?ref_topic=13773355) attribute to signal the type of promotion that you are running. Depending on type of the selected coupon value [some attributes are required](https://support.google.com/merchants/answer/6393006?ref_topic=7322920).",
      ).optional(),
      customRedemptionRestriction: z.string().describe(
        "Optional. The custom redemption restriction for the promotion. If the `redemption_restriction` field is set to `CUSTOM`, this field must be set.",
      ).optional(),
      eventApplicability: z.enum([
        "EVENT_APPLICABILITY_UNSPECIFIED",
        "SITEWIDE",
        "SPECIFIC_CATEGORIES",
      ]).describe(
        "Optional. Event applicability for this promotion. When present, this field indicates you are creating a [sales event](https://support.google.com/merchants/answer/15523289) and not a product promotion. Exactly one of `product_applicability` or `event_applicability` must be set.",
      ).optional(),
      freeGiftDescription: z.string().describe(
        "Optional. [Free gift description](https://support.google.com/merchants/answer/13847245?ref_topic=13773355) for the promotion.",
      ).optional(),
      freeGiftItemId: z.string().describe(
        "Optional. [Free gift item ID](https://support.google.com/merchants/answer/13857152?ref_topic=13773355) for the promotion.",
      ).optional(),
      freeGiftValue: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      genericRedemptionCode: z.string().describe(
        "Optional. Generic redemption code for the promotion. To be used with the `offerType` field and must meet the [minimum requirements](https://support.google.com/merchants/answer/13837405?ref_topic=13773355).",
      ).optional(),
      getThisQuantityDiscounted: z.string().describe(
        "Optional. The number of items discounted in the promotion. The attribute is set when `couponValueType` is equal to `buy_m_get_n_money_off` or `buy_m_get_n_percent_off`.",
      ).optional(),
      googleProductCategories: z.array(z.string()).describe(
        "Optional. A list of Google product categories for this promotion. Set if `EventApplicability` is `SPECIFIC_CATEGORIES`. Up to 5 product categories can be specified. For more details on eligible values for product categories, checkout the `google_product_category` attribute in the [Promotion data specification](https://support.google.com/merchants/answer/2906014).",
      ).optional(),
      itemGroupIdExclusion: z.array(z.string()).describe(
        "Optional. Product filter by [item group ID](https://support.google.com/merchants/answer/13837298?ref_topic=13773355). The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355). exclusion for the promotion.",
      ).optional(),
      itemGroupIdInclusion: z.array(z.string()).describe(
        "Optional. Product filter by item group ID for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability [product_applicability] attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      itemIdExclusion: z.array(z.string()).describe(
        "Optional. Product filter by [item ID exclusion](https://support.google.com/merchants/answer/13863524?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      itemIdInclusion: z.array(z.string()).describe(
        "Optional. Product filter by [item ID](https://support.google.com/merchants/answer/13861565?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      limitQuantity: z.string().describe(
        "Optional. [Maximum purchase quantity](https://support.google.com/merchants/answer/13861564?ref_topic=13773355) for the promotion.",
      ).optional(),
      limitValue: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      longTitle: z.string().describe(
        "Required. [Long title](https://support.google.com/merchants/answer/13838102?ref_topic=13773355) for the promotion.",
      ).optional(),
      maxDiscountAmount: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      maxMoneyOffAmount: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      maxPercentOff: z.string().describe(
        "Optional. Maximum percent off for a promotion with `PERCENT_OFF_RANGE` coupon value type. At least one of `min_percent_off` or `max_percent_off` must be present when the coupon value type is `PERCENT_OFF_RANGE`. If neither is provided an `INVALID_PROMOTION_MISSING_BENEFIT_OR_RESTRICTION` error is returned.",
      ).optional(),
      minMoneyOffAmount: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      minPercentOff: z.string().describe(
        "Optional. Minimum percent off for a promotion with `PERCENT_OFF_RANGE` coupon value type. At least one of `min_percent_off` or `max_percent_off` must be present when the coupon value type is `PERCENT_OFF_RANGE`. If neither is provided an `INVALID_PROMOTION_MISSING_BENEFIT_OR_RESTRICTION` error is returned.",
      ).optional(),
      minimumPurchaseAmount: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      minimumPurchaseQuantity: z.string().optional(),
      moneyOffAmount: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The price represented as a number and currency.").optional(),
      offerType: z.enum(["OFFER_TYPE_UNSPECIFIED", "NO_CODE", "GENERIC_CODE"])
        .describe(
          "Required. [Type](https://support.google.com/merchants/answer/13837405?ref_topic=13773355) of the promotion. Use this attribute to indicate whether or not customers need a coupon code to redeem your promotion.",
        ).optional(),
      percentOff: z.string().describe(
        "Optional. The [percentage discount](https://support.google.com/merchants/answer/13837404?sjid=17642868584668136159-NC) offered in the promotion.",
      ).optional(),
      productApplicability: z.enum([
        "PRODUCT_APPLICABILITY_UNSPECIFIED",
        "ALL_PRODUCTS",
        "SPECIFIC_PRODUCTS",
      ]).describe(
        "Optional. Applicability of the promotion to either all products or [only specific products](https://support.google.com/merchants/answer/6396257). Exactly one of `product_applicability` or `event_applicability` must be set.",
      ).optional(),
      productTypeExclusion: z.array(z.string()).describe(
        "Optional. Product filter by [product type exclusion](https://support.google.com/merchants/answer/13863746?ref_topic=13773355) for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      productTypeInclusion: z.array(z.string()).describe(
        "Optional. Product filter by product type for the promotion. The product filter attributes only applies when the products eligible for promotion product applicability `product_applicability` attribute is set to [specific_products](https://support.google.com/merchants/answer/13837299?ref_topic=13773355).",
      ).optional(),
      promotionDestinations: z.array(
        z.enum([
          "DESTINATION_ENUM_UNSPECIFIED",
          "SHOPPING_ADS",
          "DISPLAY_ADS",
          "LOCAL_INVENTORY_ADS",
          "FREE_LISTINGS",
          "FREE_LOCAL_LISTINGS",
          "YOUTUBE_SHOPPING",
          "YOUTUBE_SHOPPING_CHECKOUT",
          "YOUTUBE_AFFILIATE",
          "FREE_VEHICLE_LISTINGS",
          "VEHICLE_ADS",
          "CLOUD_RETAIL",
          "LOCAL_CLOUD_RETAIL",
        ]),
      ).describe(
        "Required. The list of destinations (also known as [Marketing methods](https://support.google.com/merchants/answer/15130232)) where the promotion applies to. If you don't specify a destination by including a supported value in your data source, your promotion will display in Shopping ads and free listings by default. You may have previously submitted the following values as destinations for your products: Shopping Actions, Surfaces across Google, Local surfaces across Google. To represent these values use `FREE_LISTINGS`, `FREE_LOCAL_LISTINGS`, `LOCAL_INVENTORY_ADS`. For more details see [Promotion destination](https://support.google.com/merchants/answer/13837465)",
      ).optional(),
      promotionDisplayTimePeriod: z.object({
        endTime: z.string().describe(
          "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
        ).optional(),
        startTime: z.string().describe(
          "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
        ).optional(),
      }).describe(
        "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
      ).optional(),
      promotionEffectiveTimePeriod: z.object({
        endTime: z.string().describe(
          "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
        ).optional(),
        startTime: z.string().describe(
          "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
        ).optional(),
      }).describe(
        "Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.",
      ).optional(),
      promotionUrl: z.string().describe(
        "Optional. URL to the page on the merchant's site where the promotion shows. Local Inventory ads promotions throw an error if no `promotion_url` is included. URL is used to confirm that the promotion is valid and can be redeemed.",
      ).optional(),
      redemptionRestriction: z.enum([
        "REDEMPTION_RESTRICTION_UNSPECIFIED",
        "SUBSCRIBE",
        "FIRST_ORDER",
        "SIGNUP_FOR_EMAIL",
        "SIGNUP_FOR_TEXT",
        "CUSTOM",
      ]).describe(
        "Optional. A restriction customers must meet before they can redeem the promotion.",
      ).optional(),
      regionIdInclusion: z.array(z.string()).describe(
        "Optional. A list of [regions](https://support.google.com/merchants/answer/15406457?#howregionswork) where the promotion is applicable. Must be set if `audience` is set to `LOCATION`.",
      ).optional(),
      storeApplicability: z.enum([
        "STORE_APPLICABILITY_UNSPECIFIED",
        "ALL_STORES",
        "SPECIFIC_STORES",
      ]).describe(
        "Optional. Whether the promotion applies to [all stores, or only specified stores](https://support.google.com/merchants/answer/13857563?sjid=17642868584668136159-NC). Local Inventory ads promotions throw an error if no store applicability is included. An `INVALID_ARGUMENT` error is thrown if `store_applicability` is set to `ALL_STORES` and `store_codes_inclusion` or `score_code_exclusion` is set to a value.",
      ).optional(),
      storeCodesExclusion: z.array(z.string()).describe(
        "Optional. [Store codes to exclude](https://support.google.com/merchants/answer/13859586?ref_topic=13773355) for the promotion. The store filter attributes only applies when the `store_applicability` attribute is set to [specific_stores](https://support.google.com/merchants/answer/13857563?ref_topic=13773355).",
      ).optional(),
      storeCodesInclusion: z.array(z.string()).describe(
        "Optional. [Store codes to include](https://support.google.com/merchants/answer/13857470?ref_topic=13773355) for the promotion. The store filter attributes only applies when the `store_applicability` attribute is set to [specific_stores](https://support.google.com/merchants/answer/13857563?ref_topic=13773355). Store code (the store ID from your Business Profile) of the physical store the product is sold in. See the [Local product inventory data specification](https://support.google.com/merchants/answer/3061342) for more information.",
      ).optional(),
    }).describe("Attributes.").optional(),
    contentLanguage: z.string().describe(
      "Required. The two-letter [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code for the promotion. Promotions is only for [selected languages](https://support.google.com/merchants/answer/4588281?ref_topic=6396150&sjid=18314938579342094533-NC#option3&zippy=).",
    ).optional(),
    customAttributes: z.array(z.object({
      groupValues: z.array(z.record(z.string(), z.unknown())).describe(
        "Subattributes within this attribute group. If `group_values` is not empty, `value` must be empty.",
      ).optional(),
      name: z.string().describe("The name of the attribute.").optional(),
      value: z.string().describe(
        "The value of the attribute. If `value` is not empty, `group_values` must be empty.",
      ).optional(),
    })).describe(
      'Optional. A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the data specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API.',
    ).optional(),
    dataSource: z.string().describe(
      "Output only. The primary data source of the promotion.",
    ).optional(),
    name: z.string().describe(
      "Identifier. The name of the promotion. Format: `accounts/{account}/promotions/{promotion}`",
    ).optional(),
    promotionId: z.string().describe(
      "Required. The user provided promotion ID to uniquely identify the promotion. Follow [minimum requirements](https://support.google.com/merchants/answer/7050148?ref_topic=7322920&sjid=871860036916537104-NC#minimum_requirements) to prevent promotion disapprovals.",
    ).optional(),
    promotionStatus: z.object({
      creationDate: z.string().describe(
        "Output only. Date on which the promotion has been created in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example `2020-01-02T09:00:00+01:00` or `2020-01-02T09:00:00Z`",
      ).optional(),
      destinationStatuses: z.array(z.object({
        reportingContext: z.enum([
          "REPORTING_CONTEXT_ENUM_UNSPECIFIED",
          "SHOPPING_ADS",
          "DISCOVERY_ADS",
          "DEMAND_GEN_ADS",
          "DEMAND_GEN_ADS_DISCOVER_SURFACE",
          "VIDEO_ADS",
          "DISPLAY_ADS",
          "LOCAL_INVENTORY_ADS",
          "VEHICLE_INVENTORY_ADS",
          "FREE_LISTINGS",
          "FREE_LISTINGS_UCP_CHECKOUT",
          "FREE_LOCAL_LISTINGS",
          "FREE_LOCAL_VEHICLE_LISTINGS",
          "YOUTUBE_AFFILIATE",
          "YOUTUBE_SHOPPING",
          "CLOUD_RETAIL",
          "LOCAL_CLOUD_RETAIL",
          "PRODUCT_REVIEWS",
          "MERCHANT_REVIEWS",
          "YOUTUBE_CHECKOUT",
        ]).describe("Output only. The name of the promotion destination.")
          .optional(),
        status: z.enum([
          "STATE_UNSPECIFIED",
          "IN_REVIEW",
          "REJECTED",
          "LIVE",
          "STOPPED",
          "EXPIRED",
          "PENDING",
        ]).describe("Output only. The status for the specified destination.")
          .optional(),
      })).describe("Output only. The intended destinations for the promotion.")
        .optional(),
      itemLevelIssues: z.array(z.object({
        applicableCountries: z.array(z.unknown()).describe(
          "Output only. List of country codes (ISO 3166-1 alpha-2) where issue applies to the offer.",
        ).optional(),
        attribute: z.string().describe(
          "Output only. The attribute's name, if the issue is caused by a single attribute.",
        ).optional(),
        code: z.string().describe("Output only. The error code of the issue.")
          .optional(),
        description: z.string().describe(
          "Output only. A short issue description in English.",
        ).optional(),
        detail: z.string().describe(
          "Output only. A detailed issue description in English.",
        ).optional(),
        documentation: z.string().describe(
          "Output only. The URL of a web page to help with resolving this issue.",
        ).optional(),
        reportingContext: z.enum([
          "REPORTING_CONTEXT_ENUM_UNSPECIFIED",
          "SHOPPING_ADS",
          "DISCOVERY_ADS",
          "DEMAND_GEN_ADS",
          "DEMAND_GEN_ADS_DISCOVER_SURFACE",
          "VIDEO_ADS",
          "DISPLAY_ADS",
          "LOCAL_INVENTORY_ADS",
          "VEHICLE_INVENTORY_ADS",
          "FREE_LISTINGS",
          "FREE_LISTINGS_UCP_CHECKOUT",
          "FREE_LOCAL_LISTINGS",
          "FREE_LOCAL_VEHICLE_LISTINGS",
          "YOUTUBE_AFFILIATE",
          "YOUTUBE_SHOPPING",
          "CLOUD_RETAIL",
          "LOCAL_CLOUD_RETAIL",
          "PRODUCT_REVIEWS",
          "MERCHANT_REVIEWS",
          "YOUTUBE_CHECKOUT",
        ]).describe("Output only. The destination the issue applies to.")
          .optional(),
        resolution: z.string().describe(
          "Output only. Whether the issue can be resolved by the merchant.",
        ).optional(),
        severity: z.enum([
          "SEVERITY_UNSPECIFIED",
          "NOT_IMPACTED",
          "DEMOTED",
          "DISAPPROVED",
        ]).describe(
          "Output only. How this issue affects serving of the promotion.",
        ).optional(),
      })).describe(
        "Output only. A list of issues associated with the promotion.",
      ).optional(),
      lastUpdateDate: z.string().describe(
        "Output only. Date on which the promotion status has been last updated in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format: Date, time, and offset, for example `2020-01-02T09:00:00+01:00` or `2020-01-02T09:00:00Z`",
      ).optional(),
    }).describe("The status of the promotion.").optional(),
    redemptionChannel: z.array(
      z.enum(["REDEMPTION_CHANNEL_UNSPECIFIED", "IN_STORE", "ONLINE"]),
    ).describe(
      "Required. [Redemption channel](https://support.google.com/merchants/answer/13837674?ref_topic=13773355&sjid=17642868584668136159-NC) for the promotion. At least one channel is required.",
    ).optional(),
    targetCountry: z.string().describe(
      "Required. The target country used as part of the unique identifier. Represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml). Promotions are only available in selected countries, [Free Listings and Shopping ads](https://support.google.com/merchants/answer/4588460) [Local Inventory ads](https://support.google.com/merchants/answer/10146326)",
    ).optional(),
    versionNumber: z.string().describe(
      "Optional. Represents the existing version (freshness) of the promotion, which can be used to preserve the right order when multiple updates are done at the same time. If set, the insertion is prevented when version number is lower than the current version number of the existing promotion. Re-insertion (for example, promotion refresh after 30 days) can be performed with the current `version_number`. If the operation is prevented, the aborted exception will be thrown.",
    ).optional(),
  }).describe(
    "Represents a promotion. See the following articles for more details. Required promotion input attributes to pass data validation checks are primarily defined below: * [Promotions data specification](https://support.google.com/merchants/answer/2906014) * [Local promotions data specification](https://support.google.com/merchants/answer/10146130) After inserting, updating a promotion input, it may take several minutes before the final promotion can be retrieved.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Merchant Accounts.Promotions. Registered at `@swamp/gcp/merchantapi/accounts-promotions`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-promotions",
  version: "2026.06.08.1",
  upgrades: [
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
        "Represents a promotion. See the following articles for more details. Required...",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["dataSource"] !== undefined) body["dataSource"] = g["dataSource"];
        if (g["promotion"] !== undefined) body["promotion"] = g["promotion"];
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
        identifier: z.string().describe("The name of the promotions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
        pageSize: z.number().describe(
          "Optional. The maximum number of promotions to return. The service may return fewer than this value. The maximum value is 250; values above 250 will be coerced to 250. If unspecified, the maximum number of promotions will be returned.",
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
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
