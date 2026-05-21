// Auto-generated extension model for @swamp/gcp/retail/catalogs-branches-products
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Vertex AI Search for commerce Catalogs.Branches.Products.
 *
 * Product captures all metadata information of items to be recommended or searched.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/products/${shortName}`;
}

const BASE_URL = "https://retail.googleapis.com/";

const GET_CONFIG = {
  "id": "retail.projects.locations.catalogs.branches.products.get",
  "path": "v2/{+name}",
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
  "id": "retail.projects.locations.catalogs.branches.products.create",
  "path": "v2/{+parent}/products",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "retail.projects.locations.catalogs.branches.products.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "retail.projects.locations.catalogs.branches.products.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "retail.projects.locations.catalogs.branches.products.list",
  "path": "v2/{+parent}/products",
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
    "readMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  attributes: z.record(
    z.string(),
    z.object({
      indexable: z.boolean().describe(
        "This field is normally ignored unless AttributesConfig.attribute_config_level of the Catalog is set to the deprecated 'PRODUCT_LEVEL_ATTRIBUTE_CONFIG' mode. For information about product-level attribute configuration, see [Configuration modes](https://cloud.google.com/retail/docs/attribute-config#config-modes). If true, custom attribute values are indexed, so that they can be filtered, faceted or boosted in SearchService.Search. This field is ignored in a UserEvent. See SearchRequest.filter, SearchRequest.facet_specs and SearchRequest.boost_spec for more details.",
      ).optional(),
      numbers: z.array(z.number()).describe(
        'The numerical values of this custom attribute. For example, `[2.3, 15.4]` when the key is "lengths_cm". Exactly one of text or numbers should be set. Otherwise, an INVALID_ARGUMENT error is returned.',
      ).optional(),
      searchable: z.boolean().describe(
        "This field is normally ignored unless AttributesConfig.attribute_config_level of the Catalog is set to the deprecated 'PRODUCT_LEVEL_ATTRIBUTE_CONFIG' mode. For information about product-level attribute configuration, see [Configuration modes](https://cloud.google.com/retail/docs/attribute-config#config-modes). If true, custom attribute values are searchable by text queries in SearchService.Search. This field is ignored in a UserEvent. Only set if type text is set. Otherwise, a INVALID_ARGUMENT error is returned.",
      ).optional(),
      text: z.array(z.string()).describe(
        'The textual values of this custom attribute. For example, `["yellow", "green"]` when the key is "color". Empty string is not allowed. Otherwise, an INVALID_ARGUMENT error is returned. Exactly one of text or numbers should be set. Otherwise, an INVALID_ARGUMENT error is returned.',
      ).optional(),
    }),
  ).describe(
    'Highly encouraged. Extra product attributes to be included. For example, for products, this could include the store name, vendor, style, color, etc. These are very strong signals for recommendation model, thus we highly recommend providing the attributes here. Features that can take on one of a limited number of possible values. Two types of features can be set are: Textual features. some examples would be the brand/maker of a product, or country of a customer. Numerical features. Some examples would be the height/weight of a product, or age of a customer. For example: `{ "vendor": {"text": ["vendor123", "vendor456"]}, "lengths_cm": {"numbers":[2.3, 15.4]}, "heights_cm": {"numbers":[8.1, 6.4]} }`. This field needs to pass all below criteria, otherwise an INVALID_ARGUMENT error is returned: * Max entries count: 200. * The key must be a UTF-8 encoded string with a length limit of 128 characters. * For indexable attribute, the key must match the pattern: `a-zA-Z0-9*`. For example, `key0LikeThis` or `KEY_1_LIKE_THIS`. * For text attributes, at most 400 values are allowed. Empty values are not allowed. Each value must be a non-empty UTF-8 encoded string with a length limit of 256 characters. * For number attributes, at most 400 values are allowed.',
  ).optional(),
  audience: z.object({
    ageGroups: z.array(z.string()).describe(
      'The age groups of the audience. Strongly encouraged to use the standard values: "newborn" (up to 3 months old), "infant" (3–12 months old), "toddler" (1–5 years old), "kids" (5–13 years old), "adult" (typically teens or older). At most 5 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [age_group](https://support.google.com/merchants/answer/6324463). Schema.org property [Product.audience.suggestedMinAge](https://schema.org/suggestedMinAge) and [Product.audience.suggestedMaxAge](https://schema.org/suggestedMaxAge).',
    ).optional(),
    genders: z.array(z.string()).describe(
      'The genders of the audience. Strongly encouraged to use the standard values: "male", "female", "unisex". At most 5 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [gender](https://support.google.com/merchants/answer/6324479). Schema.org property [Product.audience.suggestedGender](https://schema.org/suggestedGender).',
    ).optional(),
  }).describe("An intended audience of the Product for whom it's sold.")
    .optional(),
  availability: z.enum([
    "AVAILABILITY_UNSPECIFIED",
    "IN_STOCK",
    "OUT_OF_STOCK",
    "PREORDER",
    "BACKORDER",
  ]).describe(
    'The online availability of the Product. Default to Availability.IN_STOCK. For primary products with variants set the availability of the primary as Availability.OUT_OF_STOCK and set the true availability at the variant level. This way the primary product will be considered "in stock" as long as it has at least one variant in stock. For primary products with no variants set the true availability at the primary level. Corresponding properties: Google Merchant Center property [availability](https://support.google.com/merchants/answer/6324448). Schema.org property [Offer.availability](https://schema.org/availability).',
  ).optional(),
  availableQuantity: z.number().int().describe(
    "The available quantity of the item.",
  ).optional(),
  availableTime: z.string().describe(
    "The timestamp when this Product becomes available for SearchService.Search. Note that this is only applicable to Type.PRIMARY and Type.COLLECTION, and ignored for Type.VARIANT.",
  ).optional(),
  brands: z.array(z.string()).describe(
    "The brands of the product. A maximum of 30 brands are allowed unless overridden through the Google Cloud console. Each brand must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [brand](https://support.google.com/merchants/answer/6324351). Schema.org property [Product.brand](https://schema.org/brand).",
  ).optional(),
  categories: z.array(z.string()).describe(
    'Optional. Product categories. This field is repeated for supporting one product belonging to several parallel categories. Strongly recommended using the full path for better search / recommendation quality. To represent the full path of category, use the \'>\' sign, with one space on each side, to separate different hierarchies. If \'>\' is part of the category name, replace it with other character(s). For example, if a shoes product belongs to both ["Shoes & Accessories" -> "Shoes"] and ["Sports & Fitness" -> "Athletic Clothing" -> "Shoes"], it could be represented as: "categories": [ "Shoes & Accessories > Shoes", "Sports & Fitness > Athletic Clothing > Shoes" ] Must be set for Type.PRIMARY Product otherwise an INVALID_ARGUMENT error is returned. At most 250 values are allowed per Product unless overridden through the Google Cloud console. Empty values are not allowed. Each value must be a UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property google_product_category. Schema.org property [Product.category] (https://schema.org/category). [mc_google_product_category]: https://support.google.com/merchants/answer/6324436',
  ).optional(),
  collectionMemberIds: z.array(z.string()).describe(
    "The id of the collection members when type is Type.COLLECTION. Non-existent product ids are allowed. The type of the members must be either Type.PRIMARY or Type.VARIANT otherwise an INVALID_ARGUMENT error is thrown. Should not set it for other types. A maximum of 1000 values are allowed. Otherwise, an INVALID_ARGUMENT error is return.",
  ).optional(),
  colorInfo: z.object({
    colorFamilies: z.array(z.string()).describe(
      'The standard color families. Strongly recommended to use the following standard color groups: "Red", "Pink", "Orange", "Yellow", "Purple", "Green", "Cyan", "Blue", "Brown", "White", "Gray", "Black" and "Mixed". Normally it is expected to have only 1 color family. May consider using single "Mixed" instead of multiple values. A maximum of 5 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [color](https://support.google.com/merchants/answer/6324487). Schema.org property [Product.color](https://schema.org/color). The colorFamilies field as a system attribute is not a required field but strongly recommended to be specified. Google Search models treat this field as more important than a custom product attribute when specified.',
    ).optional(),
    colors: z.array(z.string()).describe(
      'The color display names, which may be different from standard color family names, such as the color aliases used in the website frontend. Normally it is expected to have only 1 color. May consider using single "Mixed" instead of multiple values. A maximum of 75 colors are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [color](https://support.google.com/merchants/answer/6324487). Schema.org property [Product.color](https://schema.org/color).',
    ).optional(),
  }).describe("The color information of a Product.").optional(),
  conditions: z.array(z.string()).describe(
    'The condition of the product. Strongly encouraged to use the standard values: "new", "refurbished", "used". A maximum of 1 value is allowed per Product. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [condition](https://support.google.com/merchants/answer/6324469). Schema.org property [Offer.itemCondition](https://schema.org/itemCondition).',
  ).optional(),
  description: z.string().describe(
    "Product description. This field must be a UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [description](https://support.google.com/merchants/answer/6324468). Schema.org property [Product.description](https://schema.org/description).",
  ).optional(),
  expireTime: z.string().describe(
    "Note that this field is applied in the following ways: * If the Product is already expired when it is uploaded, this product is not indexed for search. * If the Product is not expired when it is uploaded, only the Type.PRIMARY's and Type.COLLECTION's expireTime is respected, and Type.VARIANT's expireTime is not used. In general, we suggest the users to delete the stale products explicitly, instead of using this field to determine staleness. expire_time must be later than available_time and publish_time, otherwise an INVALID_ARGUMENT error is thrown. Corresponding properties: Google Merchant Center property [expiration_date](https://support.google.com/merchants/answer/6324499).",
  ).optional(),
  fulfillmentInfo: z.array(z.object({
    placeIds: z.array(z.string()).describe(
      'The IDs for this type, such as the store IDs for FulfillmentInfo.type.pickup-in-store or the region IDs for FulfillmentInfo.type.same-day-delivery. A maximum of 3000 values are allowed. Each value must be a string with a length limit of 30 characters, matching the pattern `[a-zA-Z0-9_-]+`, such as "store1" or "REGION-2". Otherwise, an INVALID_ARGUMENT error is returned.',
    ).optional(),
    type: z.string().describe(
      'The fulfillment type, including commonly used types (such as pickup in store and same day delivery), and custom types. Customers have to map custom types to their display names before rendering UI. Supported values: * "pickup-in-store" * "ship-to-store" * "same-day-delivery" * "next-day-delivery" * "custom-type-1" * "custom-type-2" * "custom-type-3" * "custom-type-4" * "custom-type-5" If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned.',
    ).optional(),
  })).describe(
    "Fulfillment information, such as the store IDs for in-store pickup or region IDs for different shipping methods. All the elements must have distinct FulfillmentInfo.type. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  gtin: z.string().describe(
    "The Global Trade Item Number (GTIN) of the product. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. This field must be a Unigram. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [gtin](https://support.google.com/merchants/answer/6324461). Schema.org property [Product.isbn](https://schema.org/isbn), [Product.gtin8](https://schema.org/gtin8), [Product.gtin12](https://schema.org/gtin12), [Product.gtin13](https://schema.org/gtin13), or [Product.gtin14](https://schema.org/gtin14). If the value is not a valid GTIN, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  id: z.string().describe(
    'Immutable. Product identifier, which is the final component of name. For example, this field is "id_1", if name is `projects/*/locations/global/catalogs/default_catalog/branches/default_branch/products/id_1`. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [id](https://support.google.com/merchants/answer/6324405). Schema.org property [Product.sku](https://schema.org/sku).',
  ).optional(),
  images: z.array(z.object({
    height: z.number().int().describe(
      "Height of the image in number of pixels. This field must be nonnegative. Otherwise, an INVALID_ARGUMENT error is returned.",
    ).optional(),
    uri: z.string().describe(
      "Required. URI of the image. This field must be a valid UTF-8 encoded URI with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [image_link](https://support.google.com/merchants/answer/6324350). Schema.org property [Product.image](https://schema.org/image).",
    ).optional(),
    width: z.number().int().describe(
      "Width of the image in number of pixels. This field must be nonnegative. Otherwise, an INVALID_ARGUMENT error is returned.",
    ).optional(),
  })).describe(
    "Product images for the product. We highly recommend putting the main image first. A maximum of 300 images are allowed. Corresponding properties: Google Merchant Center property [image_link](https://support.google.com/merchants/answer/6324350). Schema.org property [Product.image](https://schema.org/image).",
  ).optional(),
  languageCode: z.string().describe(
    'Language of the title/description and other string attributes. Use language tags defined by [BCP 47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). For product prediction, this field is ignored and the model automatically detects the text language. The Product can include text in different languages, but duplicating Products to provide text in multiple languages can result in degraded model performance. For product search this field is in use. It defaults to "en-US" if unset.',
  ).optional(),
  materials: z.array(z.string()).describe(
    'The material of the product. For example, "leather", "wooden". A maximum of 20 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 200 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [material](https://support.google.com/merchants/answer/6324410). Schema.org property [Product.material](https://schema.org/material).',
  ).optional(),
  name: z.string().describe(
    "Immutable. Full resource name of the product, such as `projects/*/locations/global/catalogs/default_catalog/branches/default_branch/products/product_id`.",
  ).optional(),
  patterns: z.array(z.string()).describe(
    'The pattern or graphic print of the product. For example, "striped", "polka dot", "paisley". A maximum of 20 values are allowed per Product. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [pattern](https://support.google.com/merchants/answer/6324483). Schema.org property [Product.pattern](https://schema.org/pattern).',
  ).optional(),
  priceInfo: z.object({
    cost: z.number().describe(
      "The costs associated with the sale of a particular product. Used for gross profit reporting. * Profit = price - cost Google Merchant Center property [cost_of_goods_sold](https://support.google.com/merchants/answer/9017895).",
    ).optional(),
    currencyCode: z.string().describe(
      "The 3-letter currency code defined in [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html). If this field is an unrecognizable currency code, an INVALID_ARGUMENT error is returned. The Product.Type.VARIANT Products with the same Product.primary_product_id must share the same currency_code. Otherwise, a FAILED_PRECONDITION error is returned.",
    ).optional(),
    originalPrice: z.number().describe(
      "Price of the product without any discount. If zero, by default set to be the price. If set, original_price should be greater than or equal to price, otherwise an INVALID_ARGUMENT error is thrown.",
    ).optional(),
    price: z.number().describe(
      "Price of the product. Google Merchant Center property [price](https://support.google.com/merchants/answer/6324371). Schema.org property [Offer.price](https://schema.org/price).",
    ).optional(),
    priceEffectiveTime: z.string().describe(
      "The timestamp when the price starts to be effective. This can be set as a future timestamp, and the price is only used for search after price_effective_time. If so, the original_price must be set and original_price is used before price_effective_time. Do not set if price is always effective because it will cause additional latency during search.",
    ).optional(),
    priceExpireTime: z.string().describe(
      "The timestamp when the price stops to be effective. The price is used for search before price_expire_time. If this field is set, the original_price must be set and original_price is used after price_expire_time. Do not set if price is always effective because it will cause additional latency during search.",
    ).optional(),
    priceRange: z.object({
      originalPrice: z.object({
        exclusiveMaximum: z.number().describe("Exclusive upper bound.")
          .optional(),
        exclusiveMinimum: z.number().describe("Exclusive lower bound.")
          .optional(),
        maximum: z.number().describe("Inclusive upper bound.").optional(),
        minimum: z.number().describe("Inclusive lower bound.").optional(),
      }).describe("A floating point interval.").optional(),
      price: z.object({
        exclusiveMaximum: z.number().describe("Exclusive upper bound.")
          .optional(),
        exclusiveMinimum: z.number().describe("Exclusive lower bound.")
          .optional(),
        maximum: z.number().describe("Inclusive upper bound.").optional(),
        minimum: z.number().describe("Inclusive lower bound.").optional(),
      }).describe("A floating point interval.").optional(),
    }).describe(
      "The price range of all variant Product having the same Product.primary_product_id.",
    ).optional(),
  }).describe("The price information of a Product.").optional(),
  primaryProductId: z.string().describe(
    "Variant group identifier. Must be an id, with the same parent branch with this product. Otherwise, an error is thrown. For Type.PRIMARY Products, this field can only be empty or set to the same value as id. For VARIANT Products, this field cannot be empty. A maximum of 2,000 products are allowed to share the same Type.PRIMARY Product. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [item_group_id](https://support.google.com/merchants/answer/6324507). Schema.org property [Product.inProductGroupWithID](https://schema.org/inProductGroupWithID).",
  ).optional(),
  promotions: z.array(z.object({
    promotionId: z.string().describe(
      'Promotion identifier, which is the final component of name. For example, this field is "free_gift", if name is `projects/*/locations/global/catalogs/default_catalog/promotions/free_gift`. The value must be a UTF-8 encoded string with a length limit of 128 characters, and match the pattern: `a-zA-Z*`. For example, id0LikeThis or ID_1_LIKE_THIS. Otherwise, an INVALID_ARGUMENT error is returned. Corresponds to Google Merchant Center property [promotion_id](https://support.google.com/merchants/answer/7050148).',
    ).optional(),
  })).describe(
    "The promotions applied to the product. A maximum of 10 values are allowed per Product. Only Promotion.promotion_id will be used, other fields will be ignored if set.",
  ).optional(),
  publishTime: z.string().describe(
    "The timestamp when the product is published by the retailer for the first time, which indicates the freshness of the products. Note that this field is different from available_time, given it purely describes product freshness regardless of when it is available on search and recommendation.",
  ).optional(),
  rating: z.object({
    averageRating: z.number().describe(
      "The average rating of the Product. The rating is scaled at 1-5. Otherwise, an INVALID_ARGUMENT error is returned.",
    ).optional(),
    ratingCount: z.number().int().describe(
      "The total number of ratings. This value is independent of the value of rating_histogram. This value must be nonnegative. Otherwise, an INVALID_ARGUMENT error is returned.",
    ).optional(),
    ratingHistogram: z.array(z.number().int()).describe(
      "List of rating counts per rating value (index = rating - 1). The list is empty if there is no rating. If the list is non-empty, its size is always 5. Otherwise, an INVALID_ARGUMENT error is returned. For example, [41, 14, 13, 47, 303]. It means that the Product got 41 ratings with 1 star, 14 ratings with 2 star, and so on.",
    ).optional(),
  }).describe("The rating of a Product.").optional(),
  sizes: z.array(z.string()).describe(
    'The size of the product. To represent different size systems or size types, consider using this format: [[[size_system:]size_type:]size_value]. For example, in "US:MENS:M", "US" represents size system; "MENS" represents size type; "M" represents size value. In "GIRLS:27", size system is empty; "GIRLS" represents size type; "27" represents size value. In "32 inches", both size system and size type are empty, while size value is "32 inches". A maximum of 20 values are allowed per Product. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [size](https://support.google.com/merchants/answer/6324492), [size_type](https://support.google.com/merchants/answer/6324497), and [size_system](https://support.google.com/merchants/answer/6324502). Schema.org property [Product.size](https://schema.org/size).',
  ).optional(),
  tags: z.array(z.string()).describe(
    "Custom tags associated with the product. At most 250 values are allowed per Product. This value must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. This tag can be used for filtering recommendation results by passing the tag as part of the PredictRequest.filter. Corresponding properties: Google Merchant Center property [custom_label_0–4](https://support.google.com/merchants/answer/6324473).",
  ).optional(),
  title: z.string().describe(
    "Required. Product title. This field must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [title](https://support.google.com/merchants/answer/6324415). Schema.org property [Product.name](https://schema.org/name).",
  ).optional(),
  ttl: z.string().describe(
    "Input only. The TTL (time to live) of the product. Note that this is only applicable to Type.PRIMARY and Type.COLLECTION, and ignored for Type.VARIANT. In general, we suggest the users to delete the stale products explicitly, instead of using this field to determine staleness. If it is set, it must be a non-negative value, and expire_time is set as current timestamp plus ttl. The derived expire_time is returned in the output and ttl is left blank when retrieving the Product. If it is set, the product is not available for SearchService.Search after current timestamp plus ttl. However, the product can still be retrieved by ProductService.GetProduct and ProductService.ListProducts.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "PRIMARY", "VARIANT", "COLLECTION"])
    .describe(
      "Immutable. The type of the product. Default to Catalog.product_level_config.ingestion_product_type if unset.",
    ).optional(),
  uri: z.string().describe(
    "Canonical URL directly linking to the product detail page. It is strongly recommended to provide a valid uri for the product, otherwise the service performance could be significantly degraded. This field must be a UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [link](https://support.google.com/merchants/answer/6324416). Schema.org property [Offer.url](https://schema.org/url).",
  ).optional(),
  productId: z.string().describe(
    "Required. The ID to use for the Product, which will become the final component of the Product.name. If the caller does not have permission to create the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. This field must be unique among all Products with the same parent. Otherwise, an ALREADY_EXISTS error is returned. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  attributes: z.record(z.string(), z.unknown()).optional(),
  audience: z.object({
    ageGroups: z.array(z.string()),
    genders: z.array(z.string()),
  }).optional(),
  availability: z.string().optional(),
  availableQuantity: z.number().optional(),
  availableTime: z.string().optional(),
  brands: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  collectionMemberIds: z.array(z.string()).optional(),
  colorInfo: z.object({
    colorFamilies: z.array(z.string()),
    colors: z.array(z.string()),
  }).optional(),
  conditions: z.array(z.string()).optional(),
  description: z.string().optional(),
  expireTime: z.string().optional(),
  fulfillmentInfo: z.array(z.object({
    placeIds: z.array(z.string()),
    type: z.string(),
  })).optional(),
  gtin: z.string().optional(),
  id: z.string().optional(),
  images: z.array(z.object({
    height: z.number(),
    uri: z.string(),
    width: z.number(),
  })).optional(),
  languageCode: z.string().optional(),
  localInventories: z.array(z.object({
    attributes: z.record(z.string(), z.unknown()),
    fulfillmentTypes: z.array(z.string()),
    placeId: z.string(),
    priceInfo: z.object({
      cost: z.number(),
      currencyCode: z.string(),
      originalPrice: z.number(),
      price: z.number(),
      priceEffectiveTime: z.string(),
      priceExpireTime: z.string(),
      priceRange: z.object({
        originalPrice: z.object({
          exclusiveMaximum: z.unknown(),
          exclusiveMinimum: z.unknown(),
          maximum: z.unknown(),
          minimum: z.unknown(),
        }),
        price: z.object({
          exclusiveMaximum: z.unknown(),
          exclusiveMinimum: z.unknown(),
          maximum: z.unknown(),
          minimum: z.unknown(),
        }),
      }),
    }),
  })).optional(),
  materials: z.array(z.string()).optional(),
  name: z.string(),
  patterns: z.array(z.string()).optional(),
  priceInfo: z.object({
    cost: z.number(),
    currencyCode: z.string(),
    originalPrice: z.number(),
    price: z.number(),
    priceEffectiveTime: z.string(),
    priceExpireTime: z.string(),
    priceRange: z.object({
      originalPrice: z.object({
        exclusiveMaximum: z.number(),
        exclusiveMinimum: z.number(),
        maximum: z.number(),
        minimum: z.number(),
      }),
      price: z.object({
        exclusiveMaximum: z.number(),
        exclusiveMinimum: z.number(),
        maximum: z.number(),
        minimum: z.number(),
      }),
    }),
  }).optional(),
  primaryProductId: z.string().optional(),
  promotions: z.array(z.object({
    promotionId: z.string(),
  })).optional(),
  publishTime: z.string().optional(),
  rating: z.object({
    averageRating: z.number(),
    ratingCount: z.number(),
    ratingHistogram: z.array(z.number()),
  }).optional(),
  retrievableFields: z.string().optional(),
  sizes: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  title: z.string().optional(),
  ttl: z.string().optional(),
  type: z.string().optional(),
  uri: z.string().optional(),
  variants: z.array(z.object({
    attributes: z.record(z.string(), z.unknown()),
    audience: z.object({
      ageGroups: z.array(z.string()),
      genders: z.array(z.string()),
    }),
    availability: z.string(),
    availableQuantity: z.number(),
    availableTime: z.string(),
    brands: z.array(z.string()),
    categories: z.array(z.string()),
    collectionMemberIds: z.array(z.string()),
    colorInfo: z.object({
      colorFamilies: z.array(z.string()),
      colors: z.array(z.string()),
    }),
    conditions: z.array(z.string()),
    description: z.string(),
    expireTime: z.string(),
    fulfillmentInfo: z.array(z.object({
      placeIds: z.array(z.unknown()),
      type: z.string(),
    })),
    gtin: z.string(),
    id: z.string(),
    images: z.array(z.object({
      height: z.number(),
      uri: z.string(),
      width: z.number(),
    })),
    languageCode: z.string(),
    localInventories: z.array(z.object({
      attributes: z.record(z.string(), z.unknown()),
      fulfillmentTypes: z.array(z.unknown()),
      placeId: z.string(),
      priceInfo: z.object({
        cost: z.unknown(),
        currencyCode: z.unknown(),
        originalPrice: z.unknown(),
        price: z.unknown(),
        priceEffectiveTime: z.unknown(),
        priceExpireTime: z.unknown(),
        priceRange: z.unknown(),
      }),
    })),
    materials: z.array(z.string()),
    name: z.string(),
    patterns: z.array(z.string()),
    priceInfo: z.object({
      cost: z.number(),
      currencyCode: z.string(),
      originalPrice: z.number(),
      price: z.number(),
      priceEffectiveTime: z.string(),
      priceExpireTime: z.string(),
      priceRange: z.object({
        originalPrice: z.object({
          exclusiveMaximum: z.unknown(),
          exclusiveMinimum: z.unknown(),
          maximum: z.unknown(),
          minimum: z.unknown(),
        }),
        price: z.object({
          exclusiveMaximum: z.unknown(),
          exclusiveMinimum: z.unknown(),
          maximum: z.unknown(),
          minimum: z.unknown(),
        }),
      }),
    }),
    primaryProductId: z.string(),
    promotions: z.array(z.object({
      promotionId: z.string(),
    })),
    publishTime: z.string(),
    rating: z.object({
      averageRating: z.number(),
      ratingCount: z.number(),
      ratingHistogram: z.array(z.number()),
    }),
    retrievableFields: z.string(),
    sizes: z.array(z.string()),
    tags: z.array(z.string()),
    title: z.string(),
    ttl: z.string(),
    type: z.string(),
    uri: z.string(),
    variants: z.array(z.string()),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  attributes: z.record(
    z.string(),
    z.object({
      indexable: z.boolean().describe(
        "This field is normally ignored unless AttributesConfig.attribute_config_level of the Catalog is set to the deprecated 'PRODUCT_LEVEL_ATTRIBUTE_CONFIG' mode. For information about product-level attribute configuration, see [Configuration modes](https://cloud.google.com/retail/docs/attribute-config#config-modes). If true, custom attribute values are indexed, so that they can be filtered, faceted or boosted in SearchService.Search. This field is ignored in a UserEvent. See SearchRequest.filter, SearchRequest.facet_specs and SearchRequest.boost_spec for more details.",
      ).optional(),
      numbers: z.array(z.number()).describe(
        'The numerical values of this custom attribute. For example, `[2.3, 15.4]` when the key is "lengths_cm". Exactly one of text or numbers should be set. Otherwise, an INVALID_ARGUMENT error is returned.',
      ).optional(),
      searchable: z.boolean().describe(
        "This field is normally ignored unless AttributesConfig.attribute_config_level of the Catalog is set to the deprecated 'PRODUCT_LEVEL_ATTRIBUTE_CONFIG' mode. For information about product-level attribute configuration, see [Configuration modes](https://cloud.google.com/retail/docs/attribute-config#config-modes). If true, custom attribute values are searchable by text queries in SearchService.Search. This field is ignored in a UserEvent. Only set if type text is set. Otherwise, a INVALID_ARGUMENT error is returned.",
      ).optional(),
      text: z.array(z.string()).describe(
        'The textual values of this custom attribute. For example, `["yellow", "green"]` when the key is "color". Empty string is not allowed. Otherwise, an INVALID_ARGUMENT error is returned. Exactly one of text or numbers should be set. Otherwise, an INVALID_ARGUMENT error is returned.',
      ).optional(),
    }),
  ).describe(
    'Highly encouraged. Extra product attributes to be included. For example, for products, this could include the store name, vendor, style, color, etc. These are very strong signals for recommendation model, thus we highly recommend providing the attributes here. Features that can take on one of a limited number of possible values. Two types of features can be set are: Textual features. some examples would be the brand/maker of a product, or country of a customer. Numerical features. Some examples would be the height/weight of a product, or age of a customer. For example: `{ "vendor": {"text": ["vendor123", "vendor456"]}, "lengths_cm": {"numbers":[2.3, 15.4]}, "heights_cm": {"numbers":[8.1, 6.4]} }`. This field needs to pass all below criteria, otherwise an INVALID_ARGUMENT error is returned: * Max entries count: 200. * The key must be a UTF-8 encoded string with a length limit of 128 characters. * For indexable attribute, the key must match the pattern: `a-zA-Z0-9*`. For example, `key0LikeThis` or `KEY_1_LIKE_THIS`. * For text attributes, at most 400 values are allowed. Empty values are not allowed. Each value must be a non-empty UTF-8 encoded string with a length limit of 256 characters. * For number attributes, at most 400 values are allowed.',
  ).optional(),
  audience: z.object({
    ageGroups: z.array(z.string()).describe(
      'The age groups of the audience. Strongly encouraged to use the standard values: "newborn" (up to 3 months old), "infant" (3–12 months old), "toddler" (1–5 years old), "kids" (5–13 years old), "adult" (typically teens or older). At most 5 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [age_group](https://support.google.com/merchants/answer/6324463). Schema.org property [Product.audience.suggestedMinAge](https://schema.org/suggestedMinAge) and [Product.audience.suggestedMaxAge](https://schema.org/suggestedMaxAge).',
    ).optional(),
    genders: z.array(z.string()).describe(
      'The genders of the audience. Strongly encouraged to use the standard values: "male", "female", "unisex". At most 5 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [gender](https://support.google.com/merchants/answer/6324479). Schema.org property [Product.audience.suggestedGender](https://schema.org/suggestedGender).',
    ).optional(),
  }).describe("An intended audience of the Product for whom it's sold.")
    .optional(),
  availability: z.enum([
    "AVAILABILITY_UNSPECIFIED",
    "IN_STOCK",
    "OUT_OF_STOCK",
    "PREORDER",
    "BACKORDER",
  ]).describe(
    'The online availability of the Product. Default to Availability.IN_STOCK. For primary products with variants set the availability of the primary as Availability.OUT_OF_STOCK and set the true availability at the variant level. This way the primary product will be considered "in stock" as long as it has at least one variant in stock. For primary products with no variants set the true availability at the primary level. Corresponding properties: Google Merchant Center property [availability](https://support.google.com/merchants/answer/6324448). Schema.org property [Offer.availability](https://schema.org/availability).',
  ).optional(),
  availableQuantity: z.number().int().describe(
    "The available quantity of the item.",
  ).optional(),
  availableTime: z.string().describe(
    "The timestamp when this Product becomes available for SearchService.Search. Note that this is only applicable to Type.PRIMARY and Type.COLLECTION, and ignored for Type.VARIANT.",
  ).optional(),
  brands: z.array(z.string()).describe(
    "The brands of the product. A maximum of 30 brands are allowed unless overridden through the Google Cloud console. Each brand must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [brand](https://support.google.com/merchants/answer/6324351). Schema.org property [Product.brand](https://schema.org/brand).",
  ).optional(),
  categories: z.array(z.string()).describe(
    'Optional. Product categories. This field is repeated for supporting one product belonging to several parallel categories. Strongly recommended using the full path for better search / recommendation quality. To represent the full path of category, use the \'>\' sign, with one space on each side, to separate different hierarchies. If \'>\' is part of the category name, replace it with other character(s). For example, if a shoes product belongs to both ["Shoes & Accessories" -> "Shoes"] and ["Sports & Fitness" -> "Athletic Clothing" -> "Shoes"], it could be represented as: "categories": [ "Shoes & Accessories > Shoes", "Sports & Fitness > Athletic Clothing > Shoes" ] Must be set for Type.PRIMARY Product otherwise an INVALID_ARGUMENT error is returned. At most 250 values are allowed per Product unless overridden through the Google Cloud console. Empty values are not allowed. Each value must be a UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property google_product_category. Schema.org property [Product.category] (https://schema.org/category). [mc_google_product_category]: https://support.google.com/merchants/answer/6324436',
  ).optional(),
  collectionMemberIds: z.array(z.string()).describe(
    "The id of the collection members when type is Type.COLLECTION. Non-existent product ids are allowed. The type of the members must be either Type.PRIMARY or Type.VARIANT otherwise an INVALID_ARGUMENT error is thrown. Should not set it for other types. A maximum of 1000 values are allowed. Otherwise, an INVALID_ARGUMENT error is return.",
  ).optional(),
  colorInfo: z.object({
    colorFamilies: z.array(z.string()).describe(
      'The standard color families. Strongly recommended to use the following standard color groups: "Red", "Pink", "Orange", "Yellow", "Purple", "Green", "Cyan", "Blue", "Brown", "White", "Gray", "Black" and "Mixed". Normally it is expected to have only 1 color family. May consider using single "Mixed" instead of multiple values. A maximum of 5 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [color](https://support.google.com/merchants/answer/6324487). Schema.org property [Product.color](https://schema.org/color). The colorFamilies field as a system attribute is not a required field but strongly recommended to be specified. Google Search models treat this field as more important than a custom product attribute when specified.',
    ).optional(),
    colors: z.array(z.string()).describe(
      'The color display names, which may be different from standard color family names, such as the color aliases used in the website frontend. Normally it is expected to have only 1 color. May consider using single "Mixed" instead of multiple values. A maximum of 75 colors are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [color](https://support.google.com/merchants/answer/6324487). Schema.org property [Product.color](https://schema.org/color).',
    ).optional(),
  }).describe("The color information of a Product.").optional(),
  conditions: z.array(z.string()).describe(
    'The condition of the product. Strongly encouraged to use the standard values: "new", "refurbished", "used". A maximum of 1 value is allowed per Product. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [condition](https://support.google.com/merchants/answer/6324469). Schema.org property [Offer.itemCondition](https://schema.org/itemCondition).',
  ).optional(),
  description: z.string().describe(
    "Product description. This field must be a UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [description](https://support.google.com/merchants/answer/6324468). Schema.org property [Product.description](https://schema.org/description).",
  ).optional(),
  expireTime: z.string().describe(
    "Note that this field is applied in the following ways: * If the Product is already expired when it is uploaded, this product is not indexed for search. * If the Product is not expired when it is uploaded, only the Type.PRIMARY's and Type.COLLECTION's expireTime is respected, and Type.VARIANT's expireTime is not used. In general, we suggest the users to delete the stale products explicitly, instead of using this field to determine staleness. expire_time must be later than available_time and publish_time, otherwise an INVALID_ARGUMENT error is thrown. Corresponding properties: Google Merchant Center property [expiration_date](https://support.google.com/merchants/answer/6324499).",
  ).optional(),
  fulfillmentInfo: z.array(z.object({
    placeIds: z.array(z.string()).describe(
      'The IDs for this type, such as the store IDs for FulfillmentInfo.type.pickup-in-store or the region IDs for FulfillmentInfo.type.same-day-delivery. A maximum of 3000 values are allowed. Each value must be a string with a length limit of 30 characters, matching the pattern `[a-zA-Z0-9_-]+`, such as "store1" or "REGION-2". Otherwise, an INVALID_ARGUMENT error is returned.',
    ).optional(),
    type: z.string().describe(
      'The fulfillment type, including commonly used types (such as pickup in store and same day delivery), and custom types. Customers have to map custom types to their display names before rendering UI. Supported values: * "pickup-in-store" * "ship-to-store" * "same-day-delivery" * "next-day-delivery" * "custom-type-1" * "custom-type-2" * "custom-type-3" * "custom-type-4" * "custom-type-5" If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned.',
    ).optional(),
  })).describe(
    "Fulfillment information, such as the store IDs for in-store pickup or region IDs for different shipping methods. All the elements must have distinct FulfillmentInfo.type. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  gtin: z.string().describe(
    "The Global Trade Item Number (GTIN) of the product. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. This field must be a Unigram. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [gtin](https://support.google.com/merchants/answer/6324461). Schema.org property [Product.isbn](https://schema.org/isbn), [Product.gtin8](https://schema.org/gtin8), [Product.gtin12](https://schema.org/gtin12), [Product.gtin13](https://schema.org/gtin13), or [Product.gtin14](https://schema.org/gtin14). If the value is not a valid GTIN, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  id: z.string().describe(
    'Immutable. Product identifier, which is the final component of name. For example, this field is "id_1", if name is `projects/*/locations/global/catalogs/default_catalog/branches/default_branch/products/id_1`. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [id](https://support.google.com/merchants/answer/6324405). Schema.org property [Product.sku](https://schema.org/sku).',
  ).optional(),
  images: z.array(z.object({
    height: z.number().int().describe(
      "Height of the image in number of pixels. This field must be nonnegative. Otherwise, an INVALID_ARGUMENT error is returned.",
    ).optional(),
    uri: z.string().describe(
      "Required. URI of the image. This field must be a valid UTF-8 encoded URI with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [image_link](https://support.google.com/merchants/answer/6324350). Schema.org property [Product.image](https://schema.org/image).",
    ).optional(),
    width: z.number().int().describe(
      "Width of the image in number of pixels. This field must be nonnegative. Otherwise, an INVALID_ARGUMENT error is returned.",
    ).optional(),
  })).describe(
    "Product images for the product. We highly recommend putting the main image first. A maximum of 300 images are allowed. Corresponding properties: Google Merchant Center property [image_link](https://support.google.com/merchants/answer/6324350). Schema.org property [Product.image](https://schema.org/image).",
  ).optional(),
  languageCode: z.string().describe(
    'Language of the title/description and other string attributes. Use language tags defined by [BCP 47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). For product prediction, this field is ignored and the model automatically detects the text language. The Product can include text in different languages, but duplicating Products to provide text in multiple languages can result in degraded model performance. For product search this field is in use. It defaults to "en-US" if unset.',
  ).optional(),
  materials: z.array(z.string()).describe(
    'The material of the product. For example, "leather", "wooden". A maximum of 20 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 200 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [material](https://support.google.com/merchants/answer/6324410). Schema.org property [Product.material](https://schema.org/material).',
  ).optional(),
  name: z.string().describe(
    "Immutable. Full resource name of the product, such as `projects/*/locations/global/catalogs/default_catalog/branches/default_branch/products/product_id`.",
  ).optional(),
  patterns: z.array(z.string()).describe(
    'The pattern or graphic print of the product. For example, "striped", "polka dot", "paisley". A maximum of 20 values are allowed per Product. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [pattern](https://support.google.com/merchants/answer/6324483). Schema.org property [Product.pattern](https://schema.org/pattern).',
  ).optional(),
  priceInfo: z.object({
    cost: z.number().describe(
      "The costs associated with the sale of a particular product. Used for gross profit reporting. * Profit = price - cost Google Merchant Center property [cost_of_goods_sold](https://support.google.com/merchants/answer/9017895).",
    ).optional(),
    currencyCode: z.string().describe(
      "The 3-letter currency code defined in [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html). If this field is an unrecognizable currency code, an INVALID_ARGUMENT error is returned. The Product.Type.VARIANT Products with the same Product.primary_product_id must share the same currency_code. Otherwise, a FAILED_PRECONDITION error is returned.",
    ).optional(),
    originalPrice: z.number().describe(
      "Price of the product without any discount. If zero, by default set to be the price. If set, original_price should be greater than or equal to price, otherwise an INVALID_ARGUMENT error is thrown.",
    ).optional(),
    price: z.number().describe(
      "Price of the product. Google Merchant Center property [price](https://support.google.com/merchants/answer/6324371). Schema.org property [Offer.price](https://schema.org/price).",
    ).optional(),
    priceEffectiveTime: z.string().describe(
      "The timestamp when the price starts to be effective. This can be set as a future timestamp, and the price is only used for search after price_effective_time. If so, the original_price must be set and original_price is used before price_effective_time. Do not set if price is always effective because it will cause additional latency during search.",
    ).optional(),
    priceExpireTime: z.string().describe(
      "The timestamp when the price stops to be effective. The price is used for search before price_expire_time. If this field is set, the original_price must be set and original_price is used after price_expire_time. Do not set if price is always effective because it will cause additional latency during search.",
    ).optional(),
    priceRange: z.object({
      originalPrice: z.object({
        exclusiveMaximum: z.number().describe("Exclusive upper bound.")
          .optional(),
        exclusiveMinimum: z.number().describe("Exclusive lower bound.")
          .optional(),
        maximum: z.number().describe("Inclusive upper bound.").optional(),
        minimum: z.number().describe("Inclusive lower bound.").optional(),
      }).describe("A floating point interval.").optional(),
      price: z.object({
        exclusiveMaximum: z.number().describe("Exclusive upper bound.")
          .optional(),
        exclusiveMinimum: z.number().describe("Exclusive lower bound.")
          .optional(),
        maximum: z.number().describe("Inclusive upper bound.").optional(),
        minimum: z.number().describe("Inclusive lower bound.").optional(),
      }).describe("A floating point interval.").optional(),
    }).describe(
      "The price range of all variant Product having the same Product.primary_product_id.",
    ).optional(),
  }).describe("The price information of a Product.").optional(),
  primaryProductId: z.string().describe(
    "Variant group identifier. Must be an id, with the same parent branch with this product. Otherwise, an error is thrown. For Type.PRIMARY Products, this field can only be empty or set to the same value as id. For VARIANT Products, this field cannot be empty. A maximum of 2,000 products are allowed to share the same Type.PRIMARY Product. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [item_group_id](https://support.google.com/merchants/answer/6324507). Schema.org property [Product.inProductGroupWithID](https://schema.org/inProductGroupWithID).",
  ).optional(),
  promotions: z.array(z.object({
    promotionId: z.string().describe(
      'Promotion identifier, which is the final component of name. For example, this field is "free_gift", if name is `projects/*/locations/global/catalogs/default_catalog/promotions/free_gift`. The value must be a UTF-8 encoded string with a length limit of 128 characters, and match the pattern: `a-zA-Z*`. For example, id0LikeThis or ID_1_LIKE_THIS. Otherwise, an INVALID_ARGUMENT error is returned. Corresponds to Google Merchant Center property [promotion_id](https://support.google.com/merchants/answer/7050148).',
    ).optional(),
  })).describe(
    "The promotions applied to the product. A maximum of 10 values are allowed per Product. Only Promotion.promotion_id will be used, other fields will be ignored if set.",
  ).optional(),
  publishTime: z.string().describe(
    "The timestamp when the product is published by the retailer for the first time, which indicates the freshness of the products. Note that this field is different from available_time, given it purely describes product freshness regardless of when it is available on search and recommendation.",
  ).optional(),
  rating: z.object({
    averageRating: z.number().describe(
      "The average rating of the Product. The rating is scaled at 1-5. Otherwise, an INVALID_ARGUMENT error is returned.",
    ).optional(),
    ratingCount: z.number().int().describe(
      "The total number of ratings. This value is independent of the value of rating_histogram. This value must be nonnegative. Otherwise, an INVALID_ARGUMENT error is returned.",
    ).optional(),
    ratingHistogram: z.array(z.number().int()).describe(
      "List of rating counts per rating value (index = rating - 1). The list is empty if there is no rating. If the list is non-empty, its size is always 5. Otherwise, an INVALID_ARGUMENT error is returned. For example, [41, 14, 13, 47, 303]. It means that the Product got 41 ratings with 1 star, 14 ratings with 2 star, and so on.",
    ).optional(),
  }).describe("The rating of a Product.").optional(),
  sizes: z.array(z.string()).describe(
    'The size of the product. To represent different size systems or size types, consider using this format: [[[size_system:]size_type:]size_value]. For example, in "US:MENS:M", "US" represents size system; "MENS" represents size type; "M" represents size value. In "GIRLS:27", size system is empty; "GIRLS" represents size type; "27" represents size value. In "32 inches", both size system and size type are empty, while size value is "32 inches". A maximum of 20 values are allowed per Product. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [size](https://support.google.com/merchants/answer/6324492), [size_type](https://support.google.com/merchants/answer/6324497), and [size_system](https://support.google.com/merchants/answer/6324502). Schema.org property [Product.size](https://schema.org/size).',
  ).optional(),
  tags: z.array(z.string()).describe(
    "Custom tags associated with the product. At most 250 values are allowed per Product. This value must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. This tag can be used for filtering recommendation results by passing the tag as part of the PredictRequest.filter. Corresponding properties: Google Merchant Center property [custom_label_0–4](https://support.google.com/merchants/answer/6324473).",
  ).optional(),
  title: z.string().describe(
    "Required. Product title. This field must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [title](https://support.google.com/merchants/answer/6324415). Schema.org property [Product.name](https://schema.org/name).",
  ).optional(),
  ttl: z.string().describe(
    "Input only. The TTL (time to live) of the product. Note that this is only applicable to Type.PRIMARY and Type.COLLECTION, and ignored for Type.VARIANT. In general, we suggest the users to delete the stale products explicitly, instead of using this field to determine staleness. If it is set, it must be a non-negative value, and expire_time is set as current timestamp plus ttl. The derived expire_time is returned in the output and ttl is left blank when retrieving the Product. If it is set, the product is not available for SearchService.Search after current timestamp plus ttl. However, the product can still be retrieved by ProductService.GetProduct and ProductService.ListProducts.",
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "PRIMARY", "VARIANT", "COLLECTION"])
    .describe(
      "Immutable. The type of the product. Default to Catalog.product_level_config.ingestion_product_type if unset.",
    ).optional(),
  uri: z.string().describe(
    "Canonical URL directly linking to the product detail page. It is strongly recommended to provide a valid uri for the product, otherwise the service performance could be significantly degraded. This field must be a UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [link](https://support.google.com/merchants/answer/6324416). Schema.org property [Offer.url](https://schema.org/url).",
  ).optional(),
  productId: z.string().describe(
    "Required. The ID to use for the Product, which will become the final component of the Product.name. If the caller does not have permission to create the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. This field must be unique among all Products with the same parent. Otherwise, an ALREADY_EXISTS error is returned. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Vertex AI Search for commerce Catalogs.Branches.Products. Registered at `@swamp/gcp/retail/catalogs-branches-products`. */
export const model = {
  type: "@swamp/gcp/retail/catalogs-branches-products",
  version: "2026.05.21.1",
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
      toVersion: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Product captures all metadata information of items to be recommended or searc...",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["audience"] !== undefined) body["audience"] = g["audience"];
        if (g["availability"] !== undefined) {
          body["availability"] = g["availability"];
        }
        if (g["availableQuantity"] !== undefined) {
          body["availableQuantity"] = g["availableQuantity"];
        }
        if (g["availableTime"] !== undefined) {
          body["availableTime"] = g["availableTime"];
        }
        if (g["brands"] !== undefined) body["brands"] = g["brands"];
        if (g["categories"] !== undefined) body["categories"] = g["categories"];
        if (g["collectionMemberIds"] !== undefined) {
          body["collectionMemberIds"] = g["collectionMemberIds"];
        }
        if (g["colorInfo"] !== undefined) body["colorInfo"] = g["colorInfo"];
        if (g["conditions"] !== undefined) body["conditions"] = g["conditions"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["fulfillmentInfo"] !== undefined) {
          body["fulfillmentInfo"] = g["fulfillmentInfo"];
        }
        if (g["gtin"] !== undefined) body["gtin"] = g["gtin"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["images"] !== undefined) body["images"] = g["images"];
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["materials"] !== undefined) body["materials"] = g["materials"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["patterns"] !== undefined) body["patterns"] = g["patterns"];
        if (g["priceInfo"] !== undefined) body["priceInfo"] = g["priceInfo"];
        if (g["primaryProductId"] !== undefined) {
          body["primaryProductId"] = g["primaryProductId"];
        }
        if (g["promotions"] !== undefined) body["promotions"] = g["promotions"];
        if (g["publishTime"] !== undefined) {
          body["publishTime"] = g["publishTime"];
        }
        if (g["rating"] !== undefined) body["rating"] = g["rating"];
        if (g["sizes"] !== undefined) body["sizes"] = g["sizes"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["uri"] !== undefined) body["uri"] = g["uri"];
        if (g["productId"] !== undefined) body["productId"] = g["productId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a products",
      arguments: z.object({
        identifier: z.string().describe("The name of the products"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["audience"] !== undefined) body["audience"] = g["audience"];
        if (g["availability"] !== undefined) {
          body["availability"] = g["availability"];
        }
        if (g["availableQuantity"] !== undefined) {
          body["availableQuantity"] = g["availableQuantity"];
        }
        if (g["availableTime"] !== undefined) {
          body["availableTime"] = g["availableTime"];
        }
        if (g["brands"] !== undefined) body["brands"] = g["brands"];
        if (g["categories"] !== undefined) body["categories"] = g["categories"];
        if (g["collectionMemberIds"] !== undefined) {
          body["collectionMemberIds"] = g["collectionMemberIds"];
        }
        if (g["colorInfo"] !== undefined) body["colorInfo"] = g["colorInfo"];
        if (g["conditions"] !== undefined) body["conditions"] = g["conditions"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["fulfillmentInfo"] !== undefined) {
          body["fulfillmentInfo"] = g["fulfillmentInfo"];
        }
        if (g["gtin"] !== undefined) body["gtin"] = g["gtin"];
        if (g["images"] !== undefined) body["images"] = g["images"];
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["materials"] !== undefined) body["materials"] = g["materials"];
        if (g["patterns"] !== undefined) body["patterns"] = g["patterns"];
        if (g["priceInfo"] !== undefined) body["priceInfo"] = g["priceInfo"];
        if (g["primaryProductId"] !== undefined) {
          body["primaryProductId"] = g["primaryProductId"];
        }
        if (g["promotions"] !== undefined) body["promotions"] = g["promotions"];
        if (g["publishTime"] !== undefined) {
          body["publishTime"] = g["publishTime"];
        }
        if (g["rating"] !== undefined) body["rating"] = g["rating"];
        if (g["sizes"] !== undefined) body["sizes"] = g["sizes"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["uri"] !== undefined) body["uri"] = g["uri"];
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
      description: "Delete the products",
      arguments: z.object({
        identifier: z.string().describe("The name of the products"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync products state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    add_fulfillment_places: {
      description: "add fulfillment places",
      arguments: z.object({
        addTime: z.any().optional(),
        allowMissing: z.any().optional(),
        placeIds: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["product"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["addTime"] !== undefined) body["addTime"] = args["addTime"];
        if (args["allowMissing"] !== undefined) {
          body["allowMissing"] = args["allowMissing"];
        }
        if (args["placeIds"] !== undefined) body["placeIds"] = args["placeIds"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "retail.projects.locations.catalogs.branches.products.addFulfillmentPlaces",
            "path": "v2/{+product}:addFulfillmentPlaces",
            "httpMethod": "POST",
            "parameterOrder": ["product"],
            "parameters": {
              "product": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    add_local_inventories: {
      description: "add local inventories",
      arguments: z.object({
        addMask: z.any().optional(),
        addTime: z.any().optional(),
        allowMissing: z.any().optional(),
        localInventories: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["product"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["addMask"] !== undefined) body["addMask"] = args["addMask"];
        if (args["addTime"] !== undefined) body["addTime"] = args["addTime"];
        if (args["allowMissing"] !== undefined) {
          body["allowMissing"] = args["allowMissing"];
        }
        if (args["localInventories"] !== undefined) {
          body["localInventories"] = args["localInventories"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "retail.projects.locations.catalogs.branches.products.addLocalInventories",
            "path": "v2/{+product}:addLocalInventories",
            "httpMethod": "POST",
            "parameterOrder": ["product"],
            "parameters": {
              "product": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    import: {
      description: "import",
      arguments: z.object({
        errorsConfig: z.any().optional(),
        inputConfig: z.any().optional(),
        notificationPubsubTopic: z.any().optional(),
        reconciliationMode: z.any().optional(),
        requestId: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["errorsConfig"] !== undefined) {
          body["errorsConfig"] = args["errorsConfig"];
        }
        if (args["inputConfig"] !== undefined) {
          body["inputConfig"] = args["inputConfig"];
        }
        if (args["notificationPubsubTopic"] !== undefined) {
          body["notificationPubsubTopic"] = args["notificationPubsubTopic"];
        }
        if (args["reconciliationMode"] !== undefined) {
          body["reconciliationMode"] = args["reconciliationMode"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.branches.products.import",
            "path": "v2/{+parent}/products:import",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    purge: {
      description: "purge",
      arguments: z.object({
        filter: z.any().optional(),
        force: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["force"] !== undefined) body["force"] = args["force"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.branches.products.purge",
            "path": "v2/{+parent}/products:purge",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_inventory: {
      description: "set inventory",
      arguments: z.object({
        allowMissing: z.any().optional(),
        inventory: z.any().optional(),
        setMask: z.any().optional(),
        setTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["allowMissing"] !== undefined) {
          body["allowMissing"] = args["allowMissing"];
        }
        if (args["inventory"] !== undefined) {
          body["inventory"] = args["inventory"];
        }
        if (args["setMask"] !== undefined) body["setMask"] = args["setMask"];
        if (args["setTime"] !== undefined) body["setTime"] = args["setTime"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "retail.projects.locations.catalogs.branches.products.setInventory",
            "path": "v2/{+name}:setInventory",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
