// Auto-generated extension model for @swamp/gcp/content/products
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Products.
 *
 * Required product attributes are primarily defined by the product data specification. See the Product Data Specification Help Center article for information. Product data. After inserting, updating, or deleting a product, it may take several minutes before changes take effect. The following reference documentation lists the field names in the **camelCase** casing style while the Products Data Specification lists the names in the **snake_case** casing style.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.products.get",
  "path": "{merchantId}/products/{productId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
    "productId",
  ],
  "parameters": {
    "merchantId": {
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
  "id": "content.products.insert",
  "path": "{merchantId}/products",
  "httpMethod": "POST",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "feedId": {
      "location": "query",
    },
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "content.products.update",
  "path": "{merchantId}/products/{productId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "merchantId",
    "productId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "content.products.delete",
  "path": "{merchantId}/products/{productId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "merchantId",
    "productId",
  ],
  "parameters": {
    "feedId": {
      "location": "query",
    },
    "merchantId": {
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
  "id": "content.products.list",
  "path": "{merchantId}/products",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "maxResults": {
      "location": "query",
    },
    "merchantId": {
      "location": "path",
      "required": true,
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
  additionalImageLinks: z.array(z.string()).describe(
    "Additional URLs of images of the item.",
  ).optional(),
  additionalSizeType: z.string().describe(
    "Additional cut of the item. Used together with size_type to represent combined size types for apparel items.",
  ).optional(),
  adsGrouping: z.string().describe(
    "Used to group items in an arbitrary way. Only for CPA%, discouraged otherwise.",
  ).optional(),
  adsLabels: z.array(z.string()).describe(
    "Similar to ads_grouping, but only works on CPC.",
  ).optional(),
  adsRedirect: z.string().describe(
    "Allows advertisers to override the item URL when the product is shown within the context of Product Ads.",
  ).optional(),
  adult: z.boolean().describe(
    "Should be set to true if the item is targeted towards adults.",
  ).optional(),
  ageGroup: z.string().describe("Target age group of the item.").optional(),
  autoPricingMinPrice: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).optional(),
  availability: z.string().describe("Availability status of the item.")
    .optional(),
  availabilityDate: z.string().describe(
    "The day a pre-ordered product becomes available for delivery, in ISO 8601 format.",
  ).optional(),
  brand: z.string().describe("Brand of the item.").optional(),
  canonicalLink: z.string().describe(
    "URL for the canonical version of your item's landing page.",
  ).optional(),
  certifications: z.array(z.object({
    certificationAuthority: z.string().describe(
      'The certification authority, for example "European_Commission". Maximum length is 2000 characters.',
    ).optional(),
    certificationCode: z.string().describe(
      'The certification code, for eaxample "123456". Maximum length is 2000 characters.',
    ).optional(),
    certificationName: z.string().describe(
      'The name of the certification, for example "EPREL". Maximum length is 2000 characters.',
    ).optional(),
    certificationValue: z.string().describe(
      'The certification value (also known as class, level or grade), for example "A+", "C", "gold". Maximum length is 2000 characters.',
    ).optional(),
  })).describe(
    "Product [certification](https://support.google.com/merchants/answer/13528839), introduced for EU energy efficiency labeling compliance using the [EU EPREL](https://eprel.ec.europa.eu/screen/home) database.",
  ).optional(),
  channel: z.string().describe(
    'Required. The item\'s channel (online or local). Acceptable values are: - "`local`" - "`online`"',
  ).optional(),
  cloudExportAdditionalProperties: z.array(z.object({
    boolValue: z.boolean().describe(
      'Boolean value of the given property. For example for a TV product, "True" or "False" if the screen is UHD.',
    ).optional(),
    floatValue: z.array(z.number()).describe(
      "Float values of the given property. For example for a TV product 1.2345. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order.",
    ).optional(),
    intValue: z.array(z.string()).describe(
      "Integer values of the given property. For example, 1080 for a screen resolution of a TV product. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order.",
    ).optional(),
    maxValue: z.number().describe(
      "Maximum float value of the given property. For example for a TV product 100.00.",
    ).optional(),
    minValue: z.number().describe(
      "Minimum float value of the given property. For example for a TV product 1.00.",
    ).optional(),
    propertyName: z.string().describe(
      'Name of the given property. For example, "Screen-Resolution" for a TV product. Maximum string size is 256 characters.',
    ).optional(),
    textValue: z.array(z.string()).describe(
      'Text value of the given property. For example, "8K(UHD)" could be a text value for a TV product. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order. Maximum string size is 256 characters.',
    ).optional(),
    unitCode: z.string().describe(
      'Unit of the given property. For example, "Pixels" for a TV product. Maximum string size is 256 bytes.',
    ).optional(),
  })).describe("Extra fields to export to the Cloud Retail program.")
    .optional(),
  color: z.string().describe("Color of the item.").optional(),
  condition: z.string().describe("Condition or state of the item.").optional(),
  contentLanguage: z.string().describe(
    "Required. The two-letter ISO 639-1 language code for the item.",
  ).optional(),
  costOfGoodsSold: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).optional(),
  customAttributes: z.array(z.object({
    groupValues: z.array(z.record(z.string(), z.unknown())).describe(
      "Subattributes within this attribute group. Exactly one of value or groupValues must be provided.",
    ).optional(),
    name: z.string().describe(
      "The name of the attribute. Underscores will be replaced by spaces upon insertion.",
    ).optional(),
    value: z.string().describe("The value of the attribute.").optional(),
  })).describe(
    'A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the feed specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API, such as additional attributes used for Buy on Google (formerly known as Shopping Actions).',
  ).optional(),
  customLabel0: z.string().describe(
    "Custom label 0 for custom grouping of items in a Shopping campaign.",
  ).optional(),
  customLabel1: z.string().describe(
    "Custom label 1 for custom grouping of items in a Shopping campaign.",
  ).optional(),
  customLabel2: z.string().describe(
    "Custom label 2 for custom grouping of items in a Shopping campaign.",
  ).optional(),
  customLabel3: z.string().describe(
    "Custom label 3 for custom grouping of items in a Shopping campaign.",
  ).optional(),
  customLabel4: z.string().describe(
    "Custom label 4 for custom grouping of items in a Shopping campaign.",
  ).optional(),
  description: z.string().describe("Description of the item.").optional(),
  disclosureDate: z.string().describe(
    "The date time when an offer becomes visible in search results across Google’s YouTube surfaces, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. See [Disclosure date](https://support.google.com/merchants/answer/13034208) for more information.",
  ).optional(),
  displayAdsId: z.string().describe(
    "An identifier for an item for dynamic remarketing campaigns.",
  ).optional(),
  displayAdsLink: z.string().describe(
    "URL directly to your item's landing page for dynamic remarketing campaigns.",
  ).optional(),
  displayAdsSimilarIds: z.array(z.string()).describe(
    "Advertiser-specified recommendations.",
  ).optional(),
  displayAdsTitle: z.string().describe(
    "Title of an item for dynamic remarketing campaigns.",
  ).optional(),
  displayAdsValue: z.number().describe(
    "Offer margin for dynamic remarketing campaigns.",
  ).optional(),
  energyEfficiencyClass: z.string().describe(
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  ).optional(),
  excludedDestinations: z.array(z.string()).describe(
    "The list of [destinations to exclude](//support.google.com/merchants/answer/6324486) for this target (corresponds to cleared check boxes in Merchant Center). Products that are excluded from all destinations for more than 7 days are automatically deleted.",
  ).optional(),
  expirationDate: z.string().describe(
    "Date on which the item should expire, as specified upon insertion, in ISO 8601 format. The actual expiration date in Google Shopping is exposed in `productstatuses` as `googleExpirationDate` and might be earlier if `expirationDate` is too far in the future.",
  ).optional(),
  externalSellerId: z.string().describe(
    "Required for multi-seller accounts. Use this attribute if you're a marketplace uploading products for various sellers to your multi-seller account.",
  ).optional(),
  feedLabel: z.string().describe(
    "Feed label for the item. Either `targetCountry` or `feedLabel` is required. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
  ).optional(),
  freeShippingThreshold: z.array(z.object({
    country: z.string().describe(
      "Required. The [CLDR territory code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) of the country to which an item will ship.",
    ).optional(),
    priceThreshold: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
  })).describe(
    "Optional. Conditions to be met for a product to have free shipping.",
  ).optional(),
  gender: z.string().describe("Target gender of the item.").optional(),
  googleProductCategory: z.string().describe(
    "Google's category of the item (see [Google product taxonomy](https://support.google.com/merchants/answer/1705911)). When querying products, this field will contain the user provided value. There is currently no way to get back the auto assigned google product categories through the API.",
  ).optional(),
  gtin: z.string().describe("Global Trade Item Number (GTIN) of the item.")
    .optional(),
  id: z.string().describe(
    "The REST ID of the product. Content API methods that operate on products take this as their `productId` parameter. The REST ID for a product has one of the 2 forms channel:contentLanguage: targetCountry: offerId or channel:contentLanguage:feedLabel: offerId.",
  ).optional(),
  identifierExists: z.boolean().describe(
    "False when the item does not have unique product identifiers appropriate to its category, such as GTIN, MPN, and brand. Required according to the Unique Product Identifier Rules for all target countries except for Canada.",
  ).optional(),
  imageLink: z.string().describe("URL of an image of the item.").optional(),
  includedDestinations: z.array(z.string()).describe(
    "The list of [destinations to include](//support.google.com/merchants/answer/7501026) for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in `excludedDestinations`.",
  ).optional(),
  installment: z.object({
    amount: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    creditType: z.string().describe(
      'Optional. Type of installment payments. Supported values are: - "`finance`" - "`lease`"',
    ).optional(),
    downpayment: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    months: z.string().describe(
      "The number of installments the buyer has to pay.",
    ).optional(),
  }).describe(
    "Details of a monthly installment payment offering. [Learn more](https://support.google.com/merchants/answer/6324474) about installments.",
  ).optional(),
  isBundle: z.boolean().describe(
    "Whether the item is a merchant-defined bundle. A bundle is a custom grouping of different products sold by a merchant for a single price.",
  ).optional(),
  itemGroupId: z.string().describe(
    "Shared identifier for all variants of the same product.",
  ).optional(),
  lifestyleImageLinks: z.array(z.string()).describe(
    "Additional URLs of lifestyle images of the item. Used to explicitly identify images that showcase your item in a real-world context. See the Help Center article for more information.",
  ).optional(),
  link: z.string().describe(
    "URL directly linking to your item's page on your website.",
  ).optional(),
  linkTemplate: z.string().describe(
    "URL template for merchant hosted local storefront.",
  ).optional(),
  loyaltyProgram: z.object({
    cashbackForFutureUse: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    loyaltyPoints: z.string().describe(
      "Optional. The amount of loyalty points earned on a purchase.",
    ).optional(),
    memberPriceEffectiveDate: z.string().describe(
      "Optional. A date range during which the item is eligible for member price. If not specified, the member price is always applicable. The date range is represented by a pair of ISO 8601 dates separated by a space, comma, or slash.",
    ).optional(),
    price: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    programLabel: z.string().describe(
      "Required. The label of the loyalty program. This is an internal label that uniquely identifies the relationship between a merchant entity and a loyalty program entity. It must be provided so that system can associate the assets below (for example, price and points) with a merchant. The corresponding program must be linked to the merchant account.",
    ).optional(),
    shippingLabel: z.string().describe(
      "Optional. The shipping label for the loyalty program. You can use this label to indicate whether this offer has the loyalty shipping benefit. If not specified, the item is not eligible for loyalty shipping for the given loyalty tier.",
    ).optional(),
    tierLabel: z.string().describe(
      "Required. The label of the tier within the loyalty program. Must match one of the labels within the program.",
    ).optional(),
  }).describe(
    "Allows the setting up of loyalty program benefits (for example price or points). https://support.google.com/merchants/answer/12922446",
  ).optional(),
  loyaltyPrograms: z.array(z.object({
    cashbackForFutureUse: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    loyaltyPoints: z.string().describe(
      "Optional. The amount of loyalty points earned on a purchase.",
    ).optional(),
    memberPriceEffectiveDate: z.string().describe(
      "Optional. A date range during which the item is eligible for member price. If not specified, the member price is always applicable. The date range is represented by a pair of ISO 8601 dates separated by a space, comma, or slash.",
    ).optional(),
    price: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    programLabel: z.string().describe(
      "Required. The label of the loyalty program. This is an internal label that uniquely identifies the relationship between a merchant entity and a loyalty program entity. It must be provided so that system can associate the assets below (for example, price and points) with a merchant. The corresponding program must be linked to the merchant account.",
    ).optional(),
    shippingLabel: z.string().describe(
      "Optional. The shipping label for the loyalty program. You can use this label to indicate whether this offer has the loyalty shipping benefit. If not specified, the item is not eligible for loyalty shipping for the given loyalty tier.",
    ).optional(),
    tierLabel: z.string().describe(
      "Required. The label of the tier within the loyalty program. Must match one of the labels within the program.",
    ).optional(),
  })).describe(
    "Optional. A list of loyalty program information that is used to surface loyalty benefits (for example, better pricing, points, etc) to the user of this item.",
  ).optional(),
  material: z.string().describe("The material of which the item is made.")
    .optional(),
  maxEnergyEfficiencyClass: z.string().describe(
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  ).optional(),
  maxHandlingTime: z.string().describe(
    "Maximal product handling time (in business days).",
  ).optional(),
  maximumRetailPrice: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).optional(),
  minEnergyEfficiencyClass: z.string().describe(
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  ).optional(),
  minHandlingTime: z.string().describe(
    "Minimal product handling time (in business days).",
  ).optional(),
  mobileLink: z.string().describe(
    "URL for the mobile-optimized version of your item's landing page.",
  ).optional(),
  mobileLinkTemplate: z.string().describe(
    "URL template for merchant hosted local storefront optimized for mobile devices.",
  ).optional(),
  mpn: z.string().describe("Manufacturer Part Number (MPN) of the item.")
    .optional(),
  multipack: z.string().describe(
    "The number of identical products in a merchant-defined multipack.",
  ).optional(),
  offerId: z.string().describe(
    "Required. A unique identifier for the item. Leading and trailing whitespaces are stripped and multiple whitespaces are replaced by a single whitespace upon submission. Only valid unicode characters are accepted. See the products feed specification for details. *Note:* Content API methods that operate on products take the REST ID of the product, *not* this identifier.",
  ).optional(),
  pattern: z.string().describe("The item's pattern (for example, polka dots).")
    .optional(),
  pause: z.string().describe(
    'Publication of this item should be temporarily paused. Acceptable values are: - "`ads`"',
  ).optional(),
  pickupMethod: z.string().describe(
    'The pick up option for the item. Acceptable values are: - "`buy`" - "`reserve`" - "`ship to store`" - "`not supported`"',
  ).optional(),
  pickupSla: z.string().describe(
    'Item store pickup timeline. Acceptable values are: - "`same day`" - "`next day`" - "`2-day`" - "`3-day`" - "`4-day`" - "`5-day`" - "`6-day`" - "`7-day`" - "`multi-week`"',
  ).optional(),
  price: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).optional(),
  productDetails: z.array(z.object({
    attributeName: z.string().describe("The name of the product detail.")
      .optional(),
    attributeValue: z.string().describe("The value of the product detail.")
      .optional(),
    sectionName: z.string().describe(
      "The section header used to group a set of product details.",
    ).optional(),
  })).describe("Technical specification or additional product details.")
    .optional(),
  productHeight: z.object({
    unit: z.string().describe(
      'Required. The length units. Acceptable values are: - "`in`" - "`cm`"',
    ).optional(),
    value: z.number().describe(
      "Required. The length value represented as a number. The value can have a maximum precision of four decimal places.",
    ).optional(),
  }).optional(),
  productHighlights: z.array(z.string()).describe(
    "Bullet points describing the most relevant highlights of a product.",
  ).optional(),
  productLength: z.object({
    unit: z.string().describe(
      'Required. The length units. Acceptable values are: - "`in`" - "`cm`"',
    ).optional(),
    value: z.number().describe(
      "Required. The length value represented as a number. The value can have a maximum precision of four decimal places.",
    ).optional(),
  }).optional(),
  productTypes: z.array(z.string()).describe(
    "Categories of the item (formatted as in product data specification).",
  ).optional(),
  productWeight: z.object({
    unit: z.string().describe(
      'Required. The weight unit. Acceptable values are: - "`g`" - "`kg`" - "`oz`" - "`lb`"',
    ).optional(),
    value: z.number().describe(
      "Required. The weight represented as a number. The weight can have a maximum precision of four decimal places.",
    ).optional(),
  }).optional(),
  productWidth: z.object({
    unit: z.string().describe(
      'Required. The length units. Acceptable values are: - "`in`" - "`cm`"',
    ).optional(),
    value: z.number().describe(
      "Required. The length value represented as a number. The value can have a maximum precision of four decimal places.",
    ).optional(),
  }).optional(),
  promotionIds: z.array(z.string()).describe("The unique ID of a promotion.")
    .optional(),
  salePrice: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).optional(),
  salePriceEffectiveDate: z.string().describe(
    "Date range during which the item is on sale (see product data specification).",
  ).optional(),
  sellOnGoogleQuantity: z.string().describe(
    "The quantity of the product that is available for selling on Google. Supported only for online products.",
  ).optional(),
  shipping: z.array(z.object({
    country: z.string().describe(
      "The CLDR territory code of the country to which an item will ship.",
    ).optional(),
    locationGroupName: z.string().describe(
      "The location where the shipping is applicable, represented by a location group name.",
    ).optional(),
    locationId: z.string().describe(
      "The numeric ID of a location that the shipping rate applies to as defined in the Google Ads API.",
    ).optional(),
    maxHandlingTime: z.string().describe(
      "Maximum handling time (inclusive) between when the order is received and shipped in business days. 0 means that the order is shipped on the same day as it's received if it happens before the cut-off time. Both maxHandlingTime and maxTransitTime are required if providing shipping speeds.",
    ).optional(),
    maxTransitTime: z.string().describe(
      "Maximum transit time (inclusive) between when the order has shipped and when it's delivered in business days. 0 means that the order is delivered on the same day as it ships. Both maxHandlingTime and maxTransitTime are required if providing shipping speeds.",
    ).optional(),
    minHandlingTime: z.string().describe(
      "Minimum handling time (inclusive) between when the order is received and shipped in business days. 0 means that the order is shipped on the same day as it's received if it happens before the cut-off time. minHandlingTime can only be present together with maxHandlingTime; but it's not required if maxHandlingTime is present.",
    ).optional(),
    minTransitTime: z.string().describe(
      "Minimum transit time (inclusive) between when the order has shipped and when it's delivered in business days. 0 means that the order is delivered on the same day as it ships. minTransitTime can only be present together with maxTransitTime; but it's not required if maxTransitTime is present.",
    ).optional(),
    postalCode: z.string().describe(
      "The postal code range that the shipping rate applies to, represented by a postal code, a postal code prefix followed by a * wildcard, a range between two postal codes or two postal code prefixes of equal length.",
    ).optional(),
    price: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    region: z.string().describe(
      "The geographic region to which a shipping rate applies.",
    ).optional(),
    service: z.string().describe(
      "A free-form description of the service class or delivery speed.",
    ).optional(),
  })).describe("Shipping rules.").optional(),
  shippingHeight: z.object({
    unit: z.string().describe("The unit of value.").optional(),
    value: z.number().describe(
      "The dimension of the product used to calculate the shipping cost of the item.",
    ).optional(),
  }).optional(),
  shippingLabel: z.string().describe(
    "The shipping label of the product, used to group product in account-level shipping rules.",
  ).optional(),
  shippingLength: z.object({
    unit: z.string().describe("The unit of value.").optional(),
    value: z.number().describe(
      "The dimension of the product used to calculate the shipping cost of the item.",
    ).optional(),
  }).optional(),
  shippingWeight: z.object({
    unit: z.string().describe("The unit of value.").optional(),
    value: z.number().describe(
      "The weight of the product used to calculate the shipping cost of the item.",
    ).optional(),
  }).optional(),
  shippingWidth: z.object({
    unit: z.string().describe("The unit of value.").optional(),
    value: z.number().describe(
      "The dimension of the product used to calculate the shipping cost of the item.",
    ).optional(),
  }).optional(),
  shoppingAdsExcludedCountries: z.array(z.string()).describe(
    "List of country codes (ISO 3166-1 alpha-2) to exclude the offer from Shopping Ads destination. Countries from this list are removed from countries configured in MC feed settings.",
  ).optional(),
  sizeSystem: z.string().describe(
    "System in which the size is specified. Recommended for apparel items.",
  ).optional(),
  sizeType: z.string().describe(
    "The cut of the item. Recommended for apparel items.",
  ).optional(),
  sizes: z.array(z.string()).describe(
    "Size of the item. Only one value is allowed. For variants with different sizes, insert a separate product for each size with the same `itemGroupId` value (see size definition).",
  ).optional(),
  structuredDescription: z.object({
    content: z.string().describe(
      "Required. The description text. Maximum length is 5000 characters.",
    ).optional(),
    digitalSourceType: z.string().describe(
      'Optional. The digital source type. Acceptable values are: - "`trained_algorithmic_media`" - "`default`"',
    ).optional(),
  }).describe(
    "Structured description, for algorithmically (AI)-generated descriptions. See [description](https://support.google.com/merchants/answer/6324468#When_to_use) for more information.",
  ).optional(),
  structuredTitle: z.object({
    content: z.string().describe(
      "Required. The title text. Maximum length is 150 characters.",
    ).optional(),
    digitalSourceType: z.string().describe(
      'Optional. The digital source type. Acceptable values are: - "`trained_algorithmic_media`" - "`default`"',
    ).optional(),
  }).describe(
    "Structured title, for algorithmically (AI)-generated titles. See [title](https://support.google.com/merchants/answer/6324415#Whentouse) for more information.",
  ).optional(),
  subscriptionCost: z.object({
    amount: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    period: z.string().describe(
      'The type of subscription period. - "`month`" - "`year`"',
    ).optional(),
    periodLength: z.string().describe(
      "The number of subscription periods the buyer has to pay.",
    ).optional(),
  }).optional(),
  sustainabilityIncentives: z.array(z.object({
    amount: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    percentage: z.number().describe(
      "Optional. The percentage of the sale price that the incentive is applied to.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "EV_TAX_CREDIT", "EV_PRICE_DISCOUNT"])
      .describe("Required. Sustainability incentive program.").optional(),
  })).describe("Optional. The list of sustainability incentive programs.")
    .optional(),
  targetCountry: z.string().describe(
    "Required. The CLDR territory code for the item's country of sale.",
  ).optional(),
  taxCategory: z.string().describe(
    "The tax category of the product, used to configure detailed tax nexus in account-level tax settings.",
  ).optional(),
  taxes: z.array(z.object({
    country: z.string().describe(
      "The country within which the item is taxed, specified as a CLDR territory code.",
    ).optional(),
    locationId: z.string().describe(
      "The numeric ID of a location that the tax rate applies to as defined in the Google Ads API.",
    ).optional(),
    postalCode: z.string().describe(
      "The postal code range that the tax rate applies to, represented by a ZIP code, a ZIP code prefix using * wildcard, a range between two ZIP codes or two ZIP code prefixes of equal length. Examples: 94114, 94*, 94002-95460, 94*-95*.",
    ).optional(),
    rate: z.number().describe(
      "The percentage of tax rate that applies to the item price.",
    ).optional(),
    region: z.string().describe(
      "The geographic region to which the tax rate applies.",
    ).optional(),
    taxShip: z.boolean().describe(
      "Should be set to true if tax is charged on shipping.",
    ).optional(),
  })).describe("Tax information.").optional(),
  title: z.string().describe("Title of the item.").optional(),
  transitTimeLabel: z.string().describe(
    "The transit time label of the product, used to group product in account-level transit time tables.",
  ).optional(),
  unitPricingBaseMeasure: z.object({
    unit: z.string().describe("The unit of the denominator.").optional(),
    value: z.string().describe("The denominator of the unit price.").optional(),
  }).optional(),
  unitPricingMeasure: z.object({
    unit: z.string().describe("The unit of the measure.").optional(),
    value: z.number().describe("The measure of an item.").optional(),
  }).optional(),
  virtualModelLink: z.string().describe(
    "URL of the 3D model of the item to provide more visuals.",
  ).optional(),
  merchantId: z.string().describe(
    "The ID of the account that contains the product. This account cannot be a multi-client account.",
  ),
  feedId: z.string().describe(
    "The Content API Supplemental Feed ID. If present then product insertion applies to the data in a supplemental feed.",
  ).optional(),
});

const StateSchema = z.object({
  additionalImageLinks: z.array(z.string()).optional(),
  additionalSizeType: z.string().optional(),
  adsGrouping: z.string().optional(),
  adsLabels: z.array(z.string()).optional(),
  adsRedirect: z.string().optional(),
  adult: z.boolean().optional(),
  ageGroup: z.string().optional(),
  autoPricingMinPrice: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  availability: z.string().optional(),
  availabilityDate: z.string().optional(),
  brand: z.string().optional(),
  canonicalLink: z.string().optional(),
  certifications: z.array(z.object({
    certificationAuthority: z.string(),
    certificationCode: z.string(),
    certificationName: z.string(),
    certificationValue: z.string(),
  })).optional(),
  channel: z.string().optional(),
  cloudExportAdditionalProperties: z.array(z.object({
    boolValue: z.boolean(),
    floatValue: z.array(z.number()),
    intValue: z.array(z.string()),
    maxValue: z.number(),
    minValue: z.number(),
    propertyName: z.string(),
    textValue: z.array(z.string()),
    unitCode: z.string(),
  })).optional(),
  color: z.string().optional(),
  condition: z.string().optional(),
  contentLanguage: z.string().optional(),
  costOfGoodsSold: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  customAttributes: z.array(z.object({
    groupValues: z.array(z.record(z.string(), z.unknown())),
    name: z.string(),
    value: z.string(),
  })).optional(),
  customLabel0: z.string().optional(),
  customLabel1: z.string().optional(),
  customLabel2: z.string().optional(),
  customLabel3: z.string().optional(),
  customLabel4: z.string().optional(),
  description: z.string().optional(),
  disclosureDate: z.string().optional(),
  displayAdsId: z.string().optional(),
  displayAdsLink: z.string().optional(),
  displayAdsSimilarIds: z.array(z.string()).optional(),
  displayAdsTitle: z.string().optional(),
  displayAdsValue: z.number().optional(),
  energyEfficiencyClass: z.string().optional(),
  excludedDestinations: z.array(z.string()).optional(),
  expirationDate: z.string().optional(),
  externalSellerId: z.string().optional(),
  feedLabel: z.string().optional(),
  freeShippingThreshold: z.array(z.object({
    country: z.string(),
    priceThreshold: z.object({
      currency: z.string(),
      value: z.string(),
    }),
  })).optional(),
  gender: z.string().optional(),
  googleProductCategory: z.string().optional(),
  gtin: z.string().optional(),
  id: z.string().optional(),
  identifierExists: z.boolean().optional(),
  imageLink: z.string().optional(),
  includedDestinations: z.array(z.string()).optional(),
  installment: z.object({
    amount: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    creditType: z.string(),
    downpayment: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    months: z.string(),
  }).optional(),
  isBundle: z.boolean().optional(),
  itemGroupId: z.string().optional(),
  kind: z.string().optional(),
  lifestyleImageLinks: z.array(z.string()).optional(),
  link: z.string().optional(),
  linkTemplate: z.string().optional(),
  loyaltyProgram: z.object({
    cashbackForFutureUse: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    loyaltyPoints: z.string(),
    memberPriceEffectiveDate: z.string(),
    price: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    programLabel: z.string(),
    shippingLabel: z.string(),
    tierLabel: z.string(),
  }).optional(),
  loyaltyPrograms: z.array(z.object({
    cashbackForFutureUse: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    loyaltyPoints: z.string(),
    memberPriceEffectiveDate: z.string(),
    price: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    programLabel: z.string(),
    shippingLabel: z.string(),
    tierLabel: z.string(),
  })).optional(),
  material: z.string().optional(),
  maxEnergyEfficiencyClass: z.string().optional(),
  maxHandlingTime: z.string().optional(),
  maximumRetailPrice: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  minEnergyEfficiencyClass: z.string().optional(),
  minHandlingTime: z.string().optional(),
  mobileLink: z.string().optional(),
  mobileLinkTemplate: z.string().optional(),
  mpn: z.string().optional(),
  multipack: z.string().optional(),
  offerId: z.string().optional(),
  pattern: z.string().optional(),
  pause: z.string().optional(),
  pickupMethod: z.string().optional(),
  pickupSla: z.string().optional(),
  price: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  productDetails: z.array(z.object({
    attributeName: z.string(),
    attributeValue: z.string(),
    sectionName: z.string(),
  })).optional(),
  productHeight: z.object({
    unit: z.string(),
    value: z.number(),
  }).optional(),
  productHighlights: z.array(z.string()).optional(),
  productLength: z.object({
    unit: z.string(),
    value: z.number(),
  }).optional(),
  productTypes: z.array(z.string()).optional(),
  productWeight: z.object({
    unit: z.string(),
    value: z.number(),
  }).optional(),
  productWidth: z.object({
    unit: z.string(),
    value: z.number(),
  }).optional(),
  promotionIds: z.array(z.string()).optional(),
  salePrice: z.object({
    currency: z.string(),
    value: z.string(),
  }).optional(),
  salePriceEffectiveDate: z.string().optional(),
  sellOnGoogleQuantity: z.string().optional(),
  shipping: z.array(z.object({
    country: z.string(),
    locationGroupName: z.string(),
    locationId: z.string(),
    maxHandlingTime: z.string(),
    maxTransitTime: z.string(),
    minHandlingTime: z.string(),
    minTransitTime: z.string(),
    postalCode: z.string(),
    price: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    region: z.string(),
    service: z.string(),
  })).optional(),
  shippingHeight: z.object({
    unit: z.string(),
    value: z.number(),
  }).optional(),
  shippingLabel: z.string().optional(),
  shippingLength: z.object({
    unit: z.string(),
    value: z.number(),
  }).optional(),
  shippingWeight: z.object({
    unit: z.string(),
    value: z.number(),
  }).optional(),
  shippingWidth: z.object({
    unit: z.string(),
    value: z.number(),
  }).optional(),
  shoppingAdsExcludedCountries: z.array(z.string()).optional(),
  sizeSystem: z.string().optional(),
  sizeType: z.string().optional(),
  sizes: z.array(z.string()).optional(),
  source: z.string().optional(),
  structuredDescription: z.object({
    content: z.string(),
    digitalSourceType: z.string(),
  }).optional(),
  structuredTitle: z.object({
    content: z.string(),
    digitalSourceType: z.string(),
  }).optional(),
  subscriptionCost: z.object({
    amount: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    period: z.string(),
    periodLength: z.string(),
  }).optional(),
  sustainabilityIncentives: z.array(z.object({
    amount: z.object({
      currency: z.string(),
      value: z.string(),
    }),
    percentage: z.number(),
    type: z.string(),
  })).optional(),
  targetCountry: z.string().optional(),
  taxCategory: z.string().optional(),
  taxes: z.array(z.object({
    country: z.string(),
    locationId: z.string(),
    postalCode: z.string(),
    rate: z.number(),
    region: z.string(),
    taxShip: z.boolean(),
  })).optional(),
  title: z.string().optional(),
  transitTimeLabel: z.string().optional(),
  unitPricingBaseMeasure: z.object({
    unit: z.string(),
    value: z.string(),
  }).optional(),
  unitPricingMeasure: z.object({
    unit: z.string(),
    value: z.number(),
  }).optional(),
  virtualModelLink: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  additionalImageLinks: z.array(z.string()).describe(
    "Additional URLs of images of the item.",
  ).optional(),
  additionalSizeType: z.string().describe(
    "Additional cut of the item. Used together with size_type to represent combined size types for apparel items.",
  ).optional(),
  adsGrouping: z.string().describe(
    "Used to group items in an arbitrary way. Only for CPA%, discouraged otherwise.",
  ).optional(),
  adsLabels: z.array(z.string()).describe(
    "Similar to ads_grouping, but only works on CPC.",
  ).optional(),
  adsRedirect: z.string().describe(
    "Allows advertisers to override the item URL when the product is shown within the context of Product Ads.",
  ).optional(),
  adult: z.boolean().describe(
    "Should be set to true if the item is targeted towards adults.",
  ).optional(),
  ageGroup: z.string().describe("Target age group of the item.").optional(),
  autoPricingMinPrice: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).optional(),
  availability: z.string().describe("Availability status of the item.")
    .optional(),
  availabilityDate: z.string().describe(
    "The day a pre-ordered product becomes available for delivery, in ISO 8601 format.",
  ).optional(),
  brand: z.string().describe("Brand of the item.").optional(),
  canonicalLink: z.string().describe(
    "URL for the canonical version of your item's landing page.",
  ).optional(),
  certifications: z.array(z.object({
    certificationAuthority: z.string().describe(
      'The certification authority, for example "European_Commission". Maximum length is 2000 characters.',
    ).optional(),
    certificationCode: z.string().describe(
      'The certification code, for eaxample "123456". Maximum length is 2000 characters.',
    ).optional(),
    certificationName: z.string().describe(
      'The name of the certification, for example "EPREL". Maximum length is 2000 characters.',
    ).optional(),
    certificationValue: z.string().describe(
      'The certification value (also known as class, level or grade), for example "A+", "C", "gold". Maximum length is 2000 characters.',
    ).optional(),
  })).describe(
    "Product [certification](https://support.google.com/merchants/answer/13528839), introduced for EU energy efficiency labeling compliance using the [EU EPREL](https://eprel.ec.europa.eu/screen/home) database.",
  ).optional(),
  channel: z.string().describe(
    'Required. The item\'s channel (online or local). Acceptable values are: - "`local`" - "`online`"',
  ).optional(),
  cloudExportAdditionalProperties: z.array(z.object({
    boolValue: z.boolean().describe(
      'Boolean value of the given property. For example for a TV product, "True" or "False" if the screen is UHD.',
    ).optional(),
    floatValue: z.array(z.number()).describe(
      "Float values of the given property. For example for a TV product 1.2345. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order.",
    ).optional(),
    intValue: z.array(z.string()).describe(
      "Integer values of the given property. For example, 1080 for a screen resolution of a TV product. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order.",
    ).optional(),
    maxValue: z.number().describe(
      "Maximum float value of the given property. For example for a TV product 100.00.",
    ).optional(),
    minValue: z.number().describe(
      "Minimum float value of the given property. For example for a TV product 1.00.",
    ).optional(),
    propertyName: z.string().describe(
      'Name of the given property. For example, "Screen-Resolution" for a TV product. Maximum string size is 256 characters.',
    ).optional(),
    textValue: z.array(z.string()).describe(
      'Text value of the given property. For example, "8K(UHD)" could be a text value for a TV product. Maximum number of specified values for this field is 400. Values are stored in an arbitrary but consistent order. Maximum string size is 256 characters.',
    ).optional(),
    unitCode: z.string().describe(
      'Unit of the given property. For example, "Pixels" for a TV product. Maximum string size is 256 bytes.',
    ).optional(),
  })).describe("Extra fields to export to the Cloud Retail program.")
    .optional(),
  color: z.string().describe("Color of the item.").optional(),
  condition: z.string().describe("Condition or state of the item.").optional(),
  contentLanguage: z.string().describe(
    "Required. The two-letter ISO 639-1 language code for the item.",
  ).optional(),
  costOfGoodsSold: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).optional(),
  customAttributes: z.array(z.object({
    groupValues: z.array(z.record(z.string(), z.unknown())).describe(
      "Subattributes within this attribute group. Exactly one of value or groupValues must be provided.",
    ).optional(),
    name: z.string().describe(
      "The name of the attribute. Underscores will be replaced by spaces upon insertion.",
    ).optional(),
    value: z.string().describe("The value of the attribute.").optional(),
  })).describe(
    'A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the feed specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API, such as additional attributes used for Buy on Google (formerly known as Shopping Actions).',
  ).optional(),
  customLabel0: z.string().describe(
    "Custom label 0 for custom grouping of items in a Shopping campaign.",
  ).optional(),
  customLabel1: z.string().describe(
    "Custom label 1 for custom grouping of items in a Shopping campaign.",
  ).optional(),
  customLabel2: z.string().describe(
    "Custom label 2 for custom grouping of items in a Shopping campaign.",
  ).optional(),
  customLabel3: z.string().describe(
    "Custom label 3 for custom grouping of items in a Shopping campaign.",
  ).optional(),
  customLabel4: z.string().describe(
    "Custom label 4 for custom grouping of items in a Shopping campaign.",
  ).optional(),
  description: z.string().describe("Description of the item.").optional(),
  disclosureDate: z.string().describe(
    "The date time when an offer becomes visible in search results across Google’s YouTube surfaces, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format. See [Disclosure date](https://support.google.com/merchants/answer/13034208) for more information.",
  ).optional(),
  displayAdsId: z.string().describe(
    "An identifier for an item for dynamic remarketing campaigns.",
  ).optional(),
  displayAdsLink: z.string().describe(
    "URL directly to your item's landing page for dynamic remarketing campaigns.",
  ).optional(),
  displayAdsSimilarIds: z.array(z.string()).describe(
    "Advertiser-specified recommendations.",
  ).optional(),
  displayAdsTitle: z.string().describe(
    "Title of an item for dynamic remarketing campaigns.",
  ).optional(),
  displayAdsValue: z.number().describe(
    "Offer margin for dynamic remarketing campaigns.",
  ).optional(),
  energyEfficiencyClass: z.string().describe(
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  ).optional(),
  excludedDestinations: z.array(z.string()).describe(
    "The list of [destinations to exclude](//support.google.com/merchants/answer/6324486) for this target (corresponds to cleared check boxes in Merchant Center). Products that are excluded from all destinations for more than 7 days are automatically deleted.",
  ).optional(),
  expirationDate: z.string().describe(
    "Date on which the item should expire, as specified upon insertion, in ISO 8601 format. The actual expiration date in Google Shopping is exposed in `productstatuses` as `googleExpirationDate` and might be earlier if `expirationDate` is too far in the future.",
  ).optional(),
  externalSellerId: z.string().describe(
    "Required for multi-seller accounts. Use this attribute if you're a marketplace uploading products for various sellers to your multi-seller account.",
  ).optional(),
  feedLabel: z.string().describe(
    "Feed label for the item. Either `targetCountry` or `feedLabel` is required. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-).",
  ).optional(),
  freeShippingThreshold: z.array(z.object({
    country: z.string().describe(
      "Required. The [CLDR territory code](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) of the country to which an item will ship.",
    ).optional(),
    priceThreshold: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
  })).describe(
    "Optional. Conditions to be met for a product to have free shipping.",
  ).optional(),
  gender: z.string().describe("Target gender of the item.").optional(),
  googleProductCategory: z.string().describe(
    "Google's category of the item (see [Google product taxonomy](https://support.google.com/merchants/answer/1705911)). When querying products, this field will contain the user provided value. There is currently no way to get back the auto assigned google product categories through the API.",
  ).optional(),
  gtin: z.string().describe("Global Trade Item Number (GTIN) of the item.")
    .optional(),
  id: z.string().describe(
    "The REST ID of the product. Content API methods that operate on products take this as their `productId` parameter. The REST ID for a product has one of the 2 forms channel:contentLanguage: targetCountry: offerId or channel:contentLanguage:feedLabel: offerId.",
  ).optional(),
  identifierExists: z.boolean().describe(
    "False when the item does not have unique product identifiers appropriate to its category, such as GTIN, MPN, and brand. Required according to the Unique Product Identifier Rules for all target countries except for Canada.",
  ).optional(),
  imageLink: z.string().describe("URL of an image of the item.").optional(),
  includedDestinations: z.array(z.string()).describe(
    "The list of [destinations to include](//support.google.com/merchants/answer/7501026) for this target (corresponds to checked check boxes in Merchant Center). Default destinations are always included unless provided in `excludedDestinations`.",
  ).optional(),
  installment: z.object({
    amount: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    creditType: z.string().describe(
      'Optional. Type of installment payments. Supported values are: - "`finance`" - "`lease`"',
    ).optional(),
    downpayment: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    months: z.string().describe(
      "The number of installments the buyer has to pay.",
    ).optional(),
  }).describe(
    "Details of a monthly installment payment offering. [Learn more](https://support.google.com/merchants/answer/6324474) about installments.",
  ).optional(),
  isBundle: z.boolean().describe(
    "Whether the item is a merchant-defined bundle. A bundle is a custom grouping of different products sold by a merchant for a single price.",
  ).optional(),
  itemGroupId: z.string().describe(
    "Shared identifier for all variants of the same product.",
  ).optional(),
  lifestyleImageLinks: z.array(z.string()).describe(
    "Additional URLs of lifestyle images of the item. Used to explicitly identify images that showcase your item in a real-world context. See the Help Center article for more information.",
  ).optional(),
  link: z.string().describe(
    "URL directly linking to your item's page on your website.",
  ).optional(),
  linkTemplate: z.string().describe(
    "URL template for merchant hosted local storefront.",
  ).optional(),
  loyaltyProgram: z.object({
    cashbackForFutureUse: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    loyaltyPoints: z.string().describe(
      "Optional. The amount of loyalty points earned on a purchase.",
    ).optional(),
    memberPriceEffectiveDate: z.string().describe(
      "Optional. A date range during which the item is eligible for member price. If not specified, the member price is always applicable. The date range is represented by a pair of ISO 8601 dates separated by a space, comma, or slash.",
    ).optional(),
    price: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    programLabel: z.string().describe(
      "Required. The label of the loyalty program. This is an internal label that uniquely identifies the relationship between a merchant entity and a loyalty program entity. It must be provided so that system can associate the assets below (for example, price and points) with a merchant. The corresponding program must be linked to the merchant account.",
    ).optional(),
    shippingLabel: z.string().describe(
      "Optional. The shipping label for the loyalty program. You can use this label to indicate whether this offer has the loyalty shipping benefit. If not specified, the item is not eligible for loyalty shipping for the given loyalty tier.",
    ).optional(),
    tierLabel: z.string().describe(
      "Required. The label of the tier within the loyalty program. Must match one of the labels within the program.",
    ).optional(),
  }).describe(
    "Allows the setting up of loyalty program benefits (for example price or points). https://support.google.com/merchants/answer/12922446",
  ).optional(),
  loyaltyPrograms: z.array(z.object({
    cashbackForFutureUse: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    loyaltyPoints: z.string().describe(
      "Optional. The amount of loyalty points earned on a purchase.",
    ).optional(),
    memberPriceEffectiveDate: z.string().describe(
      "Optional. A date range during which the item is eligible for member price. If not specified, the member price is always applicable. The date range is represented by a pair of ISO 8601 dates separated by a space, comma, or slash.",
    ).optional(),
    price: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    programLabel: z.string().describe(
      "Required. The label of the loyalty program. This is an internal label that uniquely identifies the relationship between a merchant entity and a loyalty program entity. It must be provided so that system can associate the assets below (for example, price and points) with a merchant. The corresponding program must be linked to the merchant account.",
    ).optional(),
    shippingLabel: z.string().describe(
      "Optional. The shipping label for the loyalty program. You can use this label to indicate whether this offer has the loyalty shipping benefit. If not specified, the item is not eligible for loyalty shipping for the given loyalty tier.",
    ).optional(),
    tierLabel: z.string().describe(
      "Required. The label of the tier within the loyalty program. Must match one of the labels within the program.",
    ).optional(),
  })).describe(
    "Optional. A list of loyalty program information that is used to surface loyalty benefits (for example, better pricing, points, etc) to the user of this item.",
  ).optional(),
  material: z.string().describe("The material of which the item is made.")
    .optional(),
  maxEnergyEfficiencyClass: z.string().describe(
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  ).optional(),
  maxHandlingTime: z.string().describe(
    "Maximal product handling time (in business days).",
  ).optional(),
  maximumRetailPrice: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).optional(),
  minEnergyEfficiencyClass: z.string().describe(
    "The energy efficiency class as defined in EU directive 2010/30/EU.",
  ).optional(),
  minHandlingTime: z.string().describe(
    "Minimal product handling time (in business days).",
  ).optional(),
  mobileLink: z.string().describe(
    "URL for the mobile-optimized version of your item's landing page.",
  ).optional(),
  mobileLinkTemplate: z.string().describe(
    "URL template for merchant hosted local storefront optimized for mobile devices.",
  ).optional(),
  mpn: z.string().describe("Manufacturer Part Number (MPN) of the item.")
    .optional(),
  multipack: z.string().describe(
    "The number of identical products in a merchant-defined multipack.",
  ).optional(),
  offerId: z.string().describe(
    "Required. A unique identifier for the item. Leading and trailing whitespaces are stripped and multiple whitespaces are replaced by a single whitespace upon submission. Only valid unicode characters are accepted. See the products feed specification for details. *Note:* Content API methods that operate on products take the REST ID of the product, *not* this identifier.",
  ).optional(),
  pattern: z.string().describe("The item's pattern (for example, polka dots).")
    .optional(),
  pause: z.string().describe(
    'Publication of this item should be temporarily paused. Acceptable values are: - "`ads`"',
  ).optional(),
  pickupMethod: z.string().describe(
    'The pick up option for the item. Acceptable values are: - "`buy`" - "`reserve`" - "`ship to store`" - "`not supported`"',
  ).optional(),
  pickupSla: z.string().describe(
    'Item store pickup timeline. Acceptable values are: - "`same day`" - "`next day`" - "`2-day`" - "`3-day`" - "`4-day`" - "`5-day`" - "`6-day`" - "`7-day`" - "`multi-week`"',
  ).optional(),
  price: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).optional(),
  productDetails: z.array(z.object({
    attributeName: z.string().describe("The name of the product detail.")
      .optional(),
    attributeValue: z.string().describe("The value of the product detail.")
      .optional(),
    sectionName: z.string().describe(
      "The section header used to group a set of product details.",
    ).optional(),
  })).describe("Technical specification or additional product details.")
    .optional(),
  productHeight: z.object({
    unit: z.string().describe(
      'Required. The length units. Acceptable values are: - "`in`" - "`cm`"',
    ).optional(),
    value: z.number().describe(
      "Required. The length value represented as a number. The value can have a maximum precision of four decimal places.",
    ).optional(),
  }).optional(),
  productHighlights: z.array(z.string()).describe(
    "Bullet points describing the most relevant highlights of a product.",
  ).optional(),
  productLength: z.object({
    unit: z.string().describe(
      'Required. The length units. Acceptable values are: - "`in`" - "`cm`"',
    ).optional(),
    value: z.number().describe(
      "Required. The length value represented as a number. The value can have a maximum precision of four decimal places.",
    ).optional(),
  }).optional(),
  productTypes: z.array(z.string()).describe(
    "Categories of the item (formatted as in product data specification).",
  ).optional(),
  productWeight: z.object({
    unit: z.string().describe(
      'Required. The weight unit. Acceptable values are: - "`g`" - "`kg`" - "`oz`" - "`lb`"',
    ).optional(),
    value: z.number().describe(
      "Required. The weight represented as a number. The weight can have a maximum precision of four decimal places.",
    ).optional(),
  }).optional(),
  productWidth: z.object({
    unit: z.string().describe(
      'Required. The length units. Acceptable values are: - "`in`" - "`cm`"',
    ).optional(),
    value: z.number().describe(
      "Required. The length value represented as a number. The value can have a maximum precision of four decimal places.",
    ).optional(),
  }).optional(),
  promotionIds: z.array(z.string()).describe("The unique ID of a promotion.")
    .optional(),
  salePrice: z.object({
    currency: z.string().describe("The currency of the price.").optional(),
    value: z.string().describe("The price represented as a number.").optional(),
  }).optional(),
  salePriceEffectiveDate: z.string().describe(
    "Date range during which the item is on sale (see product data specification).",
  ).optional(),
  sellOnGoogleQuantity: z.string().describe(
    "The quantity of the product that is available for selling on Google. Supported only for online products.",
  ).optional(),
  shipping: z.array(z.object({
    country: z.string().describe(
      "The CLDR territory code of the country to which an item will ship.",
    ).optional(),
    locationGroupName: z.string().describe(
      "The location where the shipping is applicable, represented by a location group name.",
    ).optional(),
    locationId: z.string().describe(
      "The numeric ID of a location that the shipping rate applies to as defined in the Google Ads API.",
    ).optional(),
    maxHandlingTime: z.string().describe(
      "Maximum handling time (inclusive) between when the order is received and shipped in business days. 0 means that the order is shipped on the same day as it's received if it happens before the cut-off time. Both maxHandlingTime and maxTransitTime are required if providing shipping speeds.",
    ).optional(),
    maxTransitTime: z.string().describe(
      "Maximum transit time (inclusive) between when the order has shipped and when it's delivered in business days. 0 means that the order is delivered on the same day as it ships. Both maxHandlingTime and maxTransitTime are required if providing shipping speeds.",
    ).optional(),
    minHandlingTime: z.string().describe(
      "Minimum handling time (inclusive) between when the order is received and shipped in business days. 0 means that the order is shipped on the same day as it's received if it happens before the cut-off time. minHandlingTime can only be present together with maxHandlingTime; but it's not required if maxHandlingTime is present.",
    ).optional(),
    minTransitTime: z.string().describe(
      "Minimum transit time (inclusive) between when the order has shipped and when it's delivered in business days. 0 means that the order is delivered on the same day as it ships. minTransitTime can only be present together with maxTransitTime; but it's not required if maxTransitTime is present.",
    ).optional(),
    postalCode: z.string().describe(
      "The postal code range that the shipping rate applies to, represented by a postal code, a postal code prefix followed by a * wildcard, a range between two postal codes or two postal code prefixes of equal length.",
    ).optional(),
    price: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    region: z.string().describe(
      "The geographic region to which a shipping rate applies.",
    ).optional(),
    service: z.string().describe(
      "A free-form description of the service class or delivery speed.",
    ).optional(),
  })).describe("Shipping rules.").optional(),
  shippingHeight: z.object({
    unit: z.string().describe("The unit of value.").optional(),
    value: z.number().describe(
      "The dimension of the product used to calculate the shipping cost of the item.",
    ).optional(),
  }).optional(),
  shippingLabel: z.string().describe(
    "The shipping label of the product, used to group product in account-level shipping rules.",
  ).optional(),
  shippingLength: z.object({
    unit: z.string().describe("The unit of value.").optional(),
    value: z.number().describe(
      "The dimension of the product used to calculate the shipping cost of the item.",
    ).optional(),
  }).optional(),
  shippingWeight: z.object({
    unit: z.string().describe("The unit of value.").optional(),
    value: z.number().describe(
      "The weight of the product used to calculate the shipping cost of the item.",
    ).optional(),
  }).optional(),
  shippingWidth: z.object({
    unit: z.string().describe("The unit of value.").optional(),
    value: z.number().describe(
      "The dimension of the product used to calculate the shipping cost of the item.",
    ).optional(),
  }).optional(),
  shoppingAdsExcludedCountries: z.array(z.string()).describe(
    "List of country codes (ISO 3166-1 alpha-2) to exclude the offer from Shopping Ads destination. Countries from this list are removed from countries configured in MC feed settings.",
  ).optional(),
  sizeSystem: z.string().describe(
    "System in which the size is specified. Recommended for apparel items.",
  ).optional(),
  sizeType: z.string().describe(
    "The cut of the item. Recommended for apparel items.",
  ).optional(),
  sizes: z.array(z.string()).describe(
    "Size of the item. Only one value is allowed. For variants with different sizes, insert a separate product for each size with the same `itemGroupId` value (see size definition).",
  ).optional(),
  structuredDescription: z.object({
    content: z.string().describe(
      "Required. The description text. Maximum length is 5000 characters.",
    ).optional(),
    digitalSourceType: z.string().describe(
      'Optional. The digital source type. Acceptable values are: - "`trained_algorithmic_media`" - "`default`"',
    ).optional(),
  }).describe(
    "Structured description, for algorithmically (AI)-generated descriptions. See [description](https://support.google.com/merchants/answer/6324468#When_to_use) for more information.",
  ).optional(),
  structuredTitle: z.object({
    content: z.string().describe(
      "Required. The title text. Maximum length is 150 characters.",
    ).optional(),
    digitalSourceType: z.string().describe(
      'Optional. The digital source type. Acceptable values are: - "`trained_algorithmic_media`" - "`default`"',
    ).optional(),
  }).describe(
    "Structured title, for algorithmically (AI)-generated titles. See [title](https://support.google.com/merchants/answer/6324415#Whentouse) for more information.",
  ).optional(),
  subscriptionCost: z.object({
    amount: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    period: z.string().describe(
      'The type of subscription period. - "`month`" - "`year`"',
    ).optional(),
    periodLength: z.string().describe(
      "The number of subscription periods the buyer has to pay.",
    ).optional(),
  }).optional(),
  sustainabilityIncentives: z.array(z.object({
    amount: z.object({
      currency: z.string().describe("The currency of the price.").optional(),
      value: z.string().describe("The price represented as a number.")
        .optional(),
    }).optional(),
    percentage: z.number().describe(
      "Optional. The percentage of the sale price that the incentive is applied to.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "EV_TAX_CREDIT", "EV_PRICE_DISCOUNT"])
      .describe("Required. Sustainability incentive program.").optional(),
  })).describe("Optional. The list of sustainability incentive programs.")
    .optional(),
  targetCountry: z.string().describe(
    "Required. The CLDR territory code for the item's country of sale.",
  ).optional(),
  taxCategory: z.string().describe(
    "The tax category of the product, used to configure detailed tax nexus in account-level tax settings.",
  ).optional(),
  taxes: z.array(z.object({
    country: z.string().describe(
      "The country within which the item is taxed, specified as a CLDR territory code.",
    ).optional(),
    locationId: z.string().describe(
      "The numeric ID of a location that the tax rate applies to as defined in the Google Ads API.",
    ).optional(),
    postalCode: z.string().describe(
      "The postal code range that the tax rate applies to, represented by a ZIP code, a ZIP code prefix using * wildcard, a range between two ZIP codes or two ZIP code prefixes of equal length. Examples: 94114, 94*, 94002-95460, 94*-95*.",
    ).optional(),
    rate: z.number().describe(
      "The percentage of tax rate that applies to the item price.",
    ).optional(),
    region: z.string().describe(
      "The geographic region to which the tax rate applies.",
    ).optional(),
    taxShip: z.boolean().describe(
      "Should be set to true if tax is charged on shipping.",
    ).optional(),
  })).describe("Tax information.").optional(),
  title: z.string().describe("Title of the item.").optional(),
  transitTimeLabel: z.string().describe(
    "The transit time label of the product, used to group product in account-level transit time tables.",
  ).optional(),
  unitPricingBaseMeasure: z.object({
    unit: z.string().describe("The unit of the denominator.").optional(),
    value: z.string().describe("The denominator of the unit price.").optional(),
  }).optional(),
  unitPricingMeasure: z.object({
    unit: z.string().describe("The unit of the measure.").optional(),
    value: z.number().describe("The measure of an item.").optional(),
  }).optional(),
  virtualModelLink: z.string().describe(
    "URL of the 3D model of the item to provide more visuals.",
  ).optional(),
  merchantId: z.string().describe(
    "The ID of the account that contains the product. This account cannot be a multi-client account.",
  ).optional(),
  feedId: z.string().describe(
    "The Content API Supplemental Feed ID. If present then product insertion applies to the data in a supplemental feed.",
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

/** Swamp extension model for Google Cloud Content for Shopping Products. Registered at `@swamp/gcp/content/products`. */
export const model = {
  type: "@swamp/gcp/content/products",
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
      toVersion: "2026.05.27.1",
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
        "Required product attributes are primarily defined by the product data specifi...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a products",
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
        if (g["additionalImageLinks"] !== undefined) {
          body["additionalImageLinks"] = g["additionalImageLinks"];
        }
        if (g["additionalSizeType"] !== undefined) {
          body["additionalSizeType"] = g["additionalSizeType"];
        }
        if (g["adsGrouping"] !== undefined) {
          body["adsGrouping"] = g["adsGrouping"];
        }
        if (g["adsLabels"] !== undefined) body["adsLabels"] = g["adsLabels"];
        if (g["adsRedirect"] !== undefined) {
          body["adsRedirect"] = g["adsRedirect"];
        }
        if (g["adult"] !== undefined) body["adult"] = g["adult"];
        if (g["ageGroup"] !== undefined) body["ageGroup"] = g["ageGroup"];
        if (g["autoPricingMinPrice"] !== undefined) {
          body["autoPricingMinPrice"] = g["autoPricingMinPrice"];
        }
        if (g["availability"] !== undefined) {
          body["availability"] = g["availability"];
        }
        if (g["availabilityDate"] !== undefined) {
          body["availabilityDate"] = g["availabilityDate"];
        }
        if (g["brand"] !== undefined) body["brand"] = g["brand"];
        if (g["canonicalLink"] !== undefined) {
          body["canonicalLink"] = g["canonicalLink"];
        }
        if (g["certifications"] !== undefined) {
          body["certifications"] = g["certifications"];
        }
        if (g["channel"] !== undefined) body["channel"] = g["channel"];
        if (g["cloudExportAdditionalProperties"] !== undefined) {
          body["cloudExportAdditionalProperties"] =
            g["cloudExportAdditionalProperties"];
        }
        if (g["color"] !== undefined) body["color"] = g["color"];
        if (g["condition"] !== undefined) body["condition"] = g["condition"];
        if (g["contentLanguage"] !== undefined) {
          body["contentLanguage"] = g["contentLanguage"];
        }
        if (g["costOfGoodsSold"] !== undefined) {
          body["costOfGoodsSold"] = g["costOfGoodsSold"];
        }
        if (g["customAttributes"] !== undefined) {
          body["customAttributes"] = g["customAttributes"];
        }
        if (g["customLabel0"] !== undefined) {
          body["customLabel0"] = g["customLabel0"];
        }
        if (g["customLabel1"] !== undefined) {
          body["customLabel1"] = g["customLabel1"];
        }
        if (g["customLabel2"] !== undefined) {
          body["customLabel2"] = g["customLabel2"];
        }
        if (g["customLabel3"] !== undefined) {
          body["customLabel3"] = g["customLabel3"];
        }
        if (g["customLabel4"] !== undefined) {
          body["customLabel4"] = g["customLabel4"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disclosureDate"] !== undefined) {
          body["disclosureDate"] = g["disclosureDate"];
        }
        if (g["displayAdsId"] !== undefined) {
          body["displayAdsId"] = g["displayAdsId"];
        }
        if (g["displayAdsLink"] !== undefined) {
          body["displayAdsLink"] = g["displayAdsLink"];
        }
        if (g["displayAdsSimilarIds"] !== undefined) {
          body["displayAdsSimilarIds"] = g["displayAdsSimilarIds"];
        }
        if (g["displayAdsTitle"] !== undefined) {
          body["displayAdsTitle"] = g["displayAdsTitle"];
        }
        if (g["displayAdsValue"] !== undefined) {
          body["displayAdsValue"] = g["displayAdsValue"];
        }
        if (g["energyEfficiencyClass"] !== undefined) {
          body["energyEfficiencyClass"] = g["energyEfficiencyClass"];
        }
        if (g["excludedDestinations"] !== undefined) {
          body["excludedDestinations"] = g["excludedDestinations"];
        }
        if (g["expirationDate"] !== undefined) {
          body["expirationDate"] = g["expirationDate"];
        }
        if (g["externalSellerId"] !== undefined) {
          body["externalSellerId"] = g["externalSellerId"];
        }
        if (g["feedLabel"] !== undefined) body["feedLabel"] = g["feedLabel"];
        if (g["freeShippingThreshold"] !== undefined) {
          body["freeShippingThreshold"] = g["freeShippingThreshold"];
        }
        if (g["gender"] !== undefined) body["gender"] = g["gender"];
        if (g["googleProductCategory"] !== undefined) {
          body["googleProductCategory"] = g["googleProductCategory"];
        }
        if (g["gtin"] !== undefined) body["gtin"] = g["gtin"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["identifierExists"] !== undefined) {
          body["identifierExists"] = g["identifierExists"];
        }
        if (g["imageLink"] !== undefined) body["imageLink"] = g["imageLink"];
        if (g["includedDestinations"] !== undefined) {
          body["includedDestinations"] = g["includedDestinations"];
        }
        if (g["installment"] !== undefined) {
          body["installment"] = g["installment"];
        }
        if (g["isBundle"] !== undefined) body["isBundle"] = g["isBundle"];
        if (g["itemGroupId"] !== undefined) {
          body["itemGroupId"] = g["itemGroupId"];
        }
        if (g["lifestyleImageLinks"] !== undefined) {
          body["lifestyleImageLinks"] = g["lifestyleImageLinks"];
        }
        if (g["link"] !== undefined) body["link"] = g["link"];
        if (g["linkTemplate"] !== undefined) {
          body["linkTemplate"] = g["linkTemplate"];
        }
        if (g["loyaltyProgram"] !== undefined) {
          body["loyaltyProgram"] = g["loyaltyProgram"];
        }
        if (g["loyaltyPrograms"] !== undefined) {
          body["loyaltyPrograms"] = g["loyaltyPrograms"];
        }
        if (g["material"] !== undefined) body["material"] = g["material"];
        if (g["maxEnergyEfficiencyClass"] !== undefined) {
          body["maxEnergyEfficiencyClass"] = g["maxEnergyEfficiencyClass"];
        }
        if (g["maxHandlingTime"] !== undefined) {
          body["maxHandlingTime"] = g["maxHandlingTime"];
        }
        if (g["maximumRetailPrice"] !== undefined) {
          body["maximumRetailPrice"] = g["maximumRetailPrice"];
        }
        if (g["minEnergyEfficiencyClass"] !== undefined) {
          body["minEnergyEfficiencyClass"] = g["minEnergyEfficiencyClass"];
        }
        if (g["minHandlingTime"] !== undefined) {
          body["minHandlingTime"] = g["minHandlingTime"];
        }
        if (g["mobileLink"] !== undefined) body["mobileLink"] = g["mobileLink"];
        if (g["mobileLinkTemplate"] !== undefined) {
          body["mobileLinkTemplate"] = g["mobileLinkTemplate"];
        }
        if (g["mpn"] !== undefined) body["mpn"] = g["mpn"];
        if (g["multipack"] !== undefined) body["multipack"] = g["multipack"];
        if (g["offerId"] !== undefined) body["offerId"] = g["offerId"];
        if (g["pattern"] !== undefined) body["pattern"] = g["pattern"];
        if (g["pause"] !== undefined) body["pause"] = g["pause"];
        if (g["pickupMethod"] !== undefined) {
          body["pickupMethod"] = g["pickupMethod"];
        }
        if (g["pickupSla"] !== undefined) body["pickupSla"] = g["pickupSla"];
        if (g["price"] !== undefined) body["price"] = g["price"];
        if (g["productDetails"] !== undefined) {
          body["productDetails"] = g["productDetails"];
        }
        if (g["productHeight"] !== undefined) {
          body["productHeight"] = g["productHeight"];
        }
        if (g["productHighlights"] !== undefined) {
          body["productHighlights"] = g["productHighlights"];
        }
        if (g["productLength"] !== undefined) {
          body["productLength"] = g["productLength"];
        }
        if (g["productTypes"] !== undefined) {
          body["productTypes"] = g["productTypes"];
        }
        if (g["productWeight"] !== undefined) {
          body["productWeight"] = g["productWeight"];
        }
        if (g["productWidth"] !== undefined) {
          body["productWidth"] = g["productWidth"];
        }
        if (g["promotionIds"] !== undefined) {
          body["promotionIds"] = g["promotionIds"];
        }
        if (g["salePrice"] !== undefined) body["salePrice"] = g["salePrice"];
        if (g["salePriceEffectiveDate"] !== undefined) {
          body["salePriceEffectiveDate"] = g["salePriceEffectiveDate"];
        }
        if (g["sellOnGoogleQuantity"] !== undefined) {
          body["sellOnGoogleQuantity"] = g["sellOnGoogleQuantity"];
        }
        if (g["shipping"] !== undefined) body["shipping"] = g["shipping"];
        if (g["shippingHeight"] !== undefined) {
          body["shippingHeight"] = g["shippingHeight"];
        }
        if (g["shippingLabel"] !== undefined) {
          body["shippingLabel"] = g["shippingLabel"];
        }
        if (g["shippingLength"] !== undefined) {
          body["shippingLength"] = g["shippingLength"];
        }
        if (g["shippingWeight"] !== undefined) {
          body["shippingWeight"] = g["shippingWeight"];
        }
        if (g["shippingWidth"] !== undefined) {
          body["shippingWidth"] = g["shippingWidth"];
        }
        if (g["shoppingAdsExcludedCountries"] !== undefined) {
          body["shoppingAdsExcludedCountries"] =
            g["shoppingAdsExcludedCountries"];
        }
        if (g["sizeSystem"] !== undefined) body["sizeSystem"] = g["sizeSystem"];
        if (g["sizeType"] !== undefined) body["sizeType"] = g["sizeType"];
        if (g["sizes"] !== undefined) body["sizes"] = g["sizes"];
        if (g["structuredDescription"] !== undefined) {
          body["structuredDescription"] = g["structuredDescription"];
        }
        if (g["structuredTitle"] !== undefined) {
          body["structuredTitle"] = g["structuredTitle"];
        }
        if (g["subscriptionCost"] !== undefined) {
          body["subscriptionCost"] = g["subscriptionCost"];
        }
        if (g["sustainabilityIncentives"] !== undefined) {
          body["sustainabilityIncentives"] = g["sustainabilityIncentives"];
        }
        if (g["targetCountry"] !== undefined) {
          body["targetCountry"] = g["targetCountry"];
        }
        if (g["taxCategory"] !== undefined) {
          body["taxCategory"] = g["taxCategory"];
        }
        if (g["taxes"] !== undefined) body["taxes"] = g["taxes"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["transitTimeLabel"] !== undefined) {
          body["transitTimeLabel"] = g["transitTimeLabel"];
        }
        if (g["unitPricingBaseMeasure"] !== undefined) {
          body["unitPricingBaseMeasure"] = g["unitPricingBaseMeasure"];
        }
        if (g["unitPricingMeasure"] !== undefined) {
          body["unitPricingMeasure"] = g["unitPricingMeasure"];
        }
        if (g["virtualModelLink"] !== undefined) {
          body["virtualModelLink"] = g["virtualModelLink"];
        }
        if (g["feedId"] !== undefined) body["feedId"] = g["feedId"];
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
      description: "Get a products",
      arguments: z.object({
        identifier: z.string().describe("The name of the products"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["productId"] = args.identifier;
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
    update: {
      description: "Update products attributes",
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
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        } else if (existing["merchantId"]) {
          params["merchantId"] = String(existing["merchantId"]);
        }
        params["productId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["additionalImageLinks"] !== undefined) {
          body["additionalImageLinks"] = g["additionalImageLinks"];
        }
        if (g["additionalSizeType"] !== undefined) {
          body["additionalSizeType"] = g["additionalSizeType"];
        }
        if (g["adsGrouping"] !== undefined) {
          body["adsGrouping"] = g["adsGrouping"];
        }
        if (g["adsLabels"] !== undefined) body["adsLabels"] = g["adsLabels"];
        if (g["adsRedirect"] !== undefined) {
          body["adsRedirect"] = g["adsRedirect"];
        }
        if (g["adult"] !== undefined) body["adult"] = g["adult"];
        if (g["ageGroup"] !== undefined) body["ageGroup"] = g["ageGroup"];
        if (g["autoPricingMinPrice"] !== undefined) {
          body["autoPricingMinPrice"] = g["autoPricingMinPrice"];
        }
        if (g["availability"] !== undefined) {
          body["availability"] = g["availability"];
        }
        if (g["availabilityDate"] !== undefined) {
          body["availabilityDate"] = g["availabilityDate"];
        }
        if (g["brand"] !== undefined) body["brand"] = g["brand"];
        if (g["canonicalLink"] !== undefined) {
          body["canonicalLink"] = g["canonicalLink"];
        }
        if (g["certifications"] !== undefined) {
          body["certifications"] = g["certifications"];
        }
        if (g["channel"] !== undefined) body["channel"] = g["channel"];
        if (g["cloudExportAdditionalProperties"] !== undefined) {
          body["cloudExportAdditionalProperties"] =
            g["cloudExportAdditionalProperties"];
        }
        if (g["color"] !== undefined) body["color"] = g["color"];
        if (g["condition"] !== undefined) body["condition"] = g["condition"];
        if (g["contentLanguage"] !== undefined) {
          body["contentLanguage"] = g["contentLanguage"];
        }
        if (g["costOfGoodsSold"] !== undefined) {
          body["costOfGoodsSold"] = g["costOfGoodsSold"];
        }
        if (g["customAttributes"] !== undefined) {
          body["customAttributes"] = g["customAttributes"];
        }
        if (g["customLabel0"] !== undefined) {
          body["customLabel0"] = g["customLabel0"];
        }
        if (g["customLabel1"] !== undefined) {
          body["customLabel1"] = g["customLabel1"];
        }
        if (g["customLabel2"] !== undefined) {
          body["customLabel2"] = g["customLabel2"];
        }
        if (g["customLabel3"] !== undefined) {
          body["customLabel3"] = g["customLabel3"];
        }
        if (g["customLabel4"] !== undefined) {
          body["customLabel4"] = g["customLabel4"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["disclosureDate"] !== undefined) {
          body["disclosureDate"] = g["disclosureDate"];
        }
        if (g["displayAdsId"] !== undefined) {
          body["displayAdsId"] = g["displayAdsId"];
        }
        if (g["displayAdsLink"] !== undefined) {
          body["displayAdsLink"] = g["displayAdsLink"];
        }
        if (g["displayAdsSimilarIds"] !== undefined) {
          body["displayAdsSimilarIds"] = g["displayAdsSimilarIds"];
        }
        if (g["displayAdsTitle"] !== undefined) {
          body["displayAdsTitle"] = g["displayAdsTitle"];
        }
        if (g["displayAdsValue"] !== undefined) {
          body["displayAdsValue"] = g["displayAdsValue"];
        }
        if (g["energyEfficiencyClass"] !== undefined) {
          body["energyEfficiencyClass"] = g["energyEfficiencyClass"];
        }
        if (g["excludedDestinations"] !== undefined) {
          body["excludedDestinations"] = g["excludedDestinations"];
        }
        if (g["expirationDate"] !== undefined) {
          body["expirationDate"] = g["expirationDate"];
        }
        if (g["externalSellerId"] !== undefined) {
          body["externalSellerId"] = g["externalSellerId"];
        }
        if (g["feedLabel"] !== undefined) body["feedLabel"] = g["feedLabel"];
        if (g["freeShippingThreshold"] !== undefined) {
          body["freeShippingThreshold"] = g["freeShippingThreshold"];
        }
        if (g["gender"] !== undefined) body["gender"] = g["gender"];
        if (g["googleProductCategory"] !== undefined) {
          body["googleProductCategory"] = g["googleProductCategory"];
        }
        if (g["gtin"] !== undefined) body["gtin"] = g["gtin"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["identifierExists"] !== undefined) {
          body["identifierExists"] = g["identifierExists"];
        }
        if (g["imageLink"] !== undefined) body["imageLink"] = g["imageLink"];
        if (g["includedDestinations"] !== undefined) {
          body["includedDestinations"] = g["includedDestinations"];
        }
        if (g["installment"] !== undefined) {
          body["installment"] = g["installment"];
        }
        if (g["isBundle"] !== undefined) body["isBundle"] = g["isBundle"];
        if (g["itemGroupId"] !== undefined) {
          body["itemGroupId"] = g["itemGroupId"];
        }
        if (g["lifestyleImageLinks"] !== undefined) {
          body["lifestyleImageLinks"] = g["lifestyleImageLinks"];
        }
        if (g["link"] !== undefined) body["link"] = g["link"];
        if (g["linkTemplate"] !== undefined) {
          body["linkTemplate"] = g["linkTemplate"];
        }
        if (g["loyaltyProgram"] !== undefined) {
          body["loyaltyProgram"] = g["loyaltyProgram"];
        }
        if (g["loyaltyPrograms"] !== undefined) {
          body["loyaltyPrograms"] = g["loyaltyPrograms"];
        }
        if (g["material"] !== undefined) body["material"] = g["material"];
        if (g["maxEnergyEfficiencyClass"] !== undefined) {
          body["maxEnergyEfficiencyClass"] = g["maxEnergyEfficiencyClass"];
        }
        if (g["maxHandlingTime"] !== undefined) {
          body["maxHandlingTime"] = g["maxHandlingTime"];
        }
        if (g["maximumRetailPrice"] !== undefined) {
          body["maximumRetailPrice"] = g["maximumRetailPrice"];
        }
        if (g["minEnergyEfficiencyClass"] !== undefined) {
          body["minEnergyEfficiencyClass"] = g["minEnergyEfficiencyClass"];
        }
        if (g["minHandlingTime"] !== undefined) {
          body["minHandlingTime"] = g["minHandlingTime"];
        }
        if (g["mobileLink"] !== undefined) body["mobileLink"] = g["mobileLink"];
        if (g["mobileLinkTemplate"] !== undefined) {
          body["mobileLinkTemplate"] = g["mobileLinkTemplate"];
        }
        if (g["mpn"] !== undefined) body["mpn"] = g["mpn"];
        if (g["multipack"] !== undefined) body["multipack"] = g["multipack"];
        if (g["offerId"] !== undefined) body["offerId"] = g["offerId"];
        if (g["pattern"] !== undefined) body["pattern"] = g["pattern"];
        if (g["pause"] !== undefined) body["pause"] = g["pause"];
        if (g["pickupMethod"] !== undefined) {
          body["pickupMethod"] = g["pickupMethod"];
        }
        if (g["pickupSla"] !== undefined) body["pickupSla"] = g["pickupSla"];
        if (g["price"] !== undefined) body["price"] = g["price"];
        if (g["productDetails"] !== undefined) {
          body["productDetails"] = g["productDetails"];
        }
        if (g["productHeight"] !== undefined) {
          body["productHeight"] = g["productHeight"];
        }
        if (g["productHighlights"] !== undefined) {
          body["productHighlights"] = g["productHighlights"];
        }
        if (g["productLength"] !== undefined) {
          body["productLength"] = g["productLength"];
        }
        if (g["productTypes"] !== undefined) {
          body["productTypes"] = g["productTypes"];
        }
        if (g["productWeight"] !== undefined) {
          body["productWeight"] = g["productWeight"];
        }
        if (g["productWidth"] !== undefined) {
          body["productWidth"] = g["productWidth"];
        }
        if (g["promotionIds"] !== undefined) {
          body["promotionIds"] = g["promotionIds"];
        }
        if (g["salePrice"] !== undefined) body["salePrice"] = g["salePrice"];
        if (g["salePriceEffectiveDate"] !== undefined) {
          body["salePriceEffectiveDate"] = g["salePriceEffectiveDate"];
        }
        if (g["sellOnGoogleQuantity"] !== undefined) {
          body["sellOnGoogleQuantity"] = g["sellOnGoogleQuantity"];
        }
        if (g["shipping"] !== undefined) body["shipping"] = g["shipping"];
        if (g["shippingHeight"] !== undefined) {
          body["shippingHeight"] = g["shippingHeight"];
        }
        if (g["shippingLabel"] !== undefined) {
          body["shippingLabel"] = g["shippingLabel"];
        }
        if (g["shippingLength"] !== undefined) {
          body["shippingLength"] = g["shippingLength"];
        }
        if (g["shippingWeight"] !== undefined) {
          body["shippingWeight"] = g["shippingWeight"];
        }
        if (g["shippingWidth"] !== undefined) {
          body["shippingWidth"] = g["shippingWidth"];
        }
        if (g["shoppingAdsExcludedCountries"] !== undefined) {
          body["shoppingAdsExcludedCountries"] =
            g["shoppingAdsExcludedCountries"];
        }
        if (g["sizeSystem"] !== undefined) body["sizeSystem"] = g["sizeSystem"];
        if (g["sizeType"] !== undefined) body["sizeType"] = g["sizeType"];
        if (g["sizes"] !== undefined) body["sizes"] = g["sizes"];
        if (g["structuredDescription"] !== undefined) {
          body["structuredDescription"] = g["structuredDescription"];
        }
        if (g["structuredTitle"] !== undefined) {
          body["structuredTitle"] = g["structuredTitle"];
        }
        if (g["subscriptionCost"] !== undefined) {
          body["subscriptionCost"] = g["subscriptionCost"];
        }
        if (g["sustainabilityIncentives"] !== undefined) {
          body["sustainabilityIncentives"] = g["sustainabilityIncentives"];
        }
        if (g["targetCountry"] !== undefined) {
          body["targetCountry"] = g["targetCountry"];
        }
        if (g["taxCategory"] !== undefined) {
          body["taxCategory"] = g["taxCategory"];
        }
        if (g["taxes"] !== undefined) body["taxes"] = g["taxes"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["transitTimeLabel"] !== undefined) {
          body["transitTimeLabel"] = g["transitTimeLabel"];
        }
        if (g["unitPricingBaseMeasure"] !== undefined) {
          body["unitPricingBaseMeasure"] = g["unitPricingBaseMeasure"];
        }
        if (g["unitPricingMeasure"] !== undefined) {
          body["unitPricingMeasure"] = g["unitPricingMeasure"];
        }
        if (g["virtualModelLink"] !== undefined) {
          body["virtualModelLink"] = g["virtualModelLink"];
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
    delete: {
      description: "Delete the products",
      arguments: z.object({
        identifier: z.string().describe("The name of the products"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["productId"] = args.identifier;
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
      description: "Sync products state from GCP",
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
      description: "List products resources",
      arguments: z.object({
        maxResults: z.number().describe(
          "The maximum number of products to return in the response, used for paging. The default value is 25. The maximum value is 250.",
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
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "resources",
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
    custombatch: {
      description: "custombatch",
      arguments: z.object({
        entries: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["entries"] !== undefined) body["entries"] = args["entries"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.products.custombatch",
            "path": "products/batch",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
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
