// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-productreviews
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.ProductReviews.
 *
 * A review for a product. For more information, see [Introduction to Product Review Feeds](https://developers.google.com/product-review-feeds)
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/productReviews/${shortName}`;
}

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.productReviews.get",
  "path": "reviews/v1beta/{+name}",
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
  "id": "merchantapi.accounts.productReviews.insert",
  "path": "reviews/v1beta/{+parent}/productReviews:insert",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "dataSource": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "merchantapi.accounts.productReviews.delete",
  "path": "reviews/v1beta/{+name}",
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

const GlobalArgsSchema = z.object({
  customAttributes: z.array(z.object({
    groupValues: z.array(z.string()).describe(
      "Subattributes within this attribute group. If `group_values` is not empty, `value` must be empty.",
    ).optional(),
    name: z.string().describe("The name of the attribute.").optional(),
    value: z.string().describe(
      "The value of the attribute. If `value` is not empty, `group_values` must be empty.",
    ).optional(),
  })).describe("Optional. A list of custom (merchant-provided) attributes.")
    .optional(),
  name: z.string().describe(
    'Identifier. The name of the product review. Format: `"{productreview.name=accounts/{account}/productReviews/{productReview}}"`',
  ).optional(),
  productReviewAttributes: z.object({
    aggregatorName: z.string().describe(
      "Optional. The name of the aggregator of the product reviews. A publisher may use a reviews aggregator to manage reviews and provide the feeds. This element indicates the use of an aggregator and contains information about the aggregator.",
    ).optional(),
    asins: z.array(z.string()).describe(
      "Optional. Contains ASINs (Amazon Standard Identification Numbers) associated with a product.",
    ).optional(),
    brands: z.array(z.string()).describe(
      "Optional. Contains brand names associated with a product.",
    ).optional(),
    collectionMethod: z.enum([
      "COLLECTION_METHOD_UNSPECIFIED",
      "UNSOLICITED",
      "POST_FULFILLMENT",
    ]).describe("Optional. The method used to collect the review.").optional(),
    cons: z.array(z.string()).describe(
      'Optional. Contains the disadvantages based on the opinion of the reviewer. Omit boilerplate text like "con:" unless it was written by the reviewer.',
    ).optional(),
    content: z.string().describe(
      "Optional. The content of the review. If empty, the content might still get populated from pros and cons.",
    ).optional(),
    gtins: z.array(z.string()).describe(
      "Optional. Contains GTINs (global trade item numbers) associated with a product. Sub-types of GTINs (e.g. UPC, EAN, ISBN, JAN) are supported.",
    ).optional(),
    isIncentivizedReview: z.boolean().describe(
      "Optional. Indicates whether the review is incentivized.",
    ).optional(),
    isSpam: z.boolean().describe(
      "Optional. Indicates whether the review is marked as spam in the publisher's system.",
    ).optional(),
    isVerifiedPurchase: z.boolean().describe(
      "Optional. Indicates whether the reviewer's purchase is verified.",
    ).optional(),
    maxRating: z.string().describe(
      "Optional. The maximum possible number for the rating. The value of the max rating must be greater than the value of the min attribute.",
    ).optional(),
    minRating: z.string().describe(
      "Optional. Contains the ratings associated with the review. The minimum possible number for the rating. This should be the worst possible rating and should not be a value for no rating.",
    ).optional(),
    mpns: z.array(z.string()).describe(
      "Optional. Contains MPNs (manufacturer part numbers) associated with a product.",
    ).optional(),
    productLinks: z.array(z.string()).describe(
      "Optional. The URI of the product. This URI can have the same value as the `review_link` element, if the review URI and the product URI are the same.",
    ).optional(),
    productNames: z.array(z.string()).describe(
      "Optional. Descriptive name of a product.",
    ).optional(),
    pros: z.array(z.string()).describe(
      'Optional. Contains the advantages based on the opinion of the reviewer. Omit boilerplate text like "pro:" unless it was written by the reviewer.',
    ).optional(),
    publisherFavicon: z.string().describe(
      "Optional. A link to the company favicon of the publisher. The image dimensions should be favicon size: 16x16 pixels. The image format should be GIF, JPG or PNG.",
    ).optional(),
    publisherName: z.string().describe(
      "Optional. The name of the publisher of the product reviews. The information about the publisher, which may be a retailer, manufacturer, reviews service company, or any entity that publishes product reviews.",
    ).optional(),
    rating: z.number().describe(
      "Optional. The reviewer's overall rating of the product.",
    ).optional(),
    reviewCountry: z.string().describe(
      "Optional. The country of the review defined by ISO 3166-1 Alpha-2 Country Code.",
    ).optional(),
    reviewLanguage: z.string().describe(
      "Optional. The language of the review defined by BCP-47 language code.",
    ).optional(),
    reviewLink: z.object({
      link: z.string().describe(
        "Optional. The URI of the review landing page. For example: `http://www.example.com/review_5.html`.",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "SINGLETON", "GROUP"]).describe(
        "Optional. Type of the review URI.",
      ).optional(),
    }).describe("The URI of the review landing page.").optional(),
    reviewTime: z.string().describe(
      "Required. The timestamp indicating when the review was written.",
    ).optional(),
    reviewerId: z.string().describe(
      "Optional. The author of the product review. A permanent, unique identifier for the author of the review in the publisher's system.",
    ).optional(),
    reviewerImageLinks: z.array(z.string()).describe(
      "Optional. A URI to an image of the reviewed product created by the review author. The URI does not have to end with an image file extension.",
    ).optional(),
    reviewerIsAnonymous: z.boolean().describe(
      "Optional. Set to true if the reviewer should remain anonymous.",
    ).optional(),
    reviewerUsername: z.string().describe(
      "Optional. The name of the reviewer of the product review.",
    ).optional(),
    skus: z.array(z.string()).describe(
      "Optional. Contains SKUs (stock keeping units) associated with a product. Often this matches the product Offer Id in the product feed.",
    ).optional(),
    subclientName: z.string().describe(
      "Optional. The name of the subclient of the product reviews. The subclient is an identifier of the product review source. It should be equivalent to the directory provided in the file data source path.",
    ).optional(),
    title: z.string().describe("Optional. The title of the review.").optional(),
    transactionId: z.string().describe(
      "Optional. A permanent, unique identifier for the transaction associated with the review in the publisher's system. This ID can be used to indicate that multiple reviews are associated with the same transaction.",
    ).optional(),
  }).describe("Attributes.").optional(),
  productReviewId: z.string().describe(
    "Required. The permanent, unique identifier for the product review in the publisher’s system.",
  ).optional(),
  productReviewStatus: z.object({
    createTime: z.string().describe(
      "Output only. Date on which the item has been created, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format.",
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
      ]).describe("Output only. The name of the reporting context.").optional(),
    })).describe(
      "Output only. The intended destinations for the product review.",
    ).optional(),
    itemLevelIssues: z.array(z.object({
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
      ]).describe("Output only. The reporting context the issue applies to.")
        .optional(),
      resolution: z.string().describe(
        "Output only. Whether the issue can be resolved by the merchant.",
      ).optional(),
      severity: z.enum(["SEVERITY_UNSPECIFIED", "NOT_IMPACTED", "DISAPPROVED"])
        .describe(
          "Output only. How this issue affects serving of the product review.",
        ).optional(),
    })).describe(
      "Output only. A list of all issues associated with the product review.",
    ).optional(),
    lastUpdateTime: z.string().describe(
      "Output only. Date on which the item has been last updated, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format.",
    ).optional(),
  }).describe("Product review status.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  customAttributes: z.array(z.object({
    groupValues: z.array(z.string()),
    name: z.string(),
    value: z.string(),
  })).optional(),
  dataSource: z.string().optional(),
  name: z.string(),
  productReviewAttributes: z.object({
    aggregatorName: z.string(),
    asins: z.array(z.string()),
    brands: z.array(z.string()),
    collectionMethod: z.string(),
    cons: z.array(z.string()),
    content: z.string(),
    gtins: z.array(z.string()),
    isIncentivizedReview: z.boolean(),
    isSpam: z.boolean(),
    isVerifiedPurchase: z.boolean(),
    maxRating: z.string(),
    minRating: z.string(),
    mpns: z.array(z.string()),
    productLinks: z.array(z.string()),
    productNames: z.array(z.string()),
    pros: z.array(z.string()),
    publisherFavicon: z.string(),
    publisherName: z.string(),
    rating: z.number(),
    reviewCountry: z.string(),
    reviewLanguage: z.string(),
    reviewLink: z.object({
      link: z.string(),
      type: z.string(),
    }),
    reviewTime: z.string(),
    reviewerId: z.string(),
    reviewerImageLinks: z.array(z.string()),
    reviewerIsAnonymous: z.boolean(),
    reviewerUsername: z.string(),
    skus: z.array(z.string()),
    subclientName: z.string(),
    title: z.string(),
    transactionId: z.string(),
  }).optional(),
  productReviewId: z.string().optional(),
  productReviewStatus: z.object({
    createTime: z.string(),
    destinationStatuses: z.array(z.object({
      reportingContext: z.string(),
    })),
    itemLevelIssues: z.array(z.object({
      attribute: z.string(),
      code: z.string(),
      description: z.string(),
      detail: z.string(),
      documentation: z.string(),
      reportingContext: z.string(),
      resolution: z.string(),
      severity: z.string(),
    })),
    lastUpdateTime: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  customAttributes: z.array(z.object({
    groupValues: z.array(z.string()).describe(
      "Subattributes within this attribute group. If `group_values` is not empty, `value` must be empty.",
    ).optional(),
    name: z.string().describe("The name of the attribute.").optional(),
    value: z.string().describe(
      "The value of the attribute. If `value` is not empty, `group_values` must be empty.",
    ).optional(),
  })).describe("Optional. A list of custom (merchant-provided) attributes.")
    .optional(),
  name: z.string().describe(
    'Identifier. The name of the product review. Format: `"{productreview.name=accounts/{account}/productReviews/{productReview}}"`',
  ).optional(),
  productReviewAttributes: z.object({
    aggregatorName: z.string().describe(
      "Optional. The name of the aggregator of the product reviews. A publisher may use a reviews aggregator to manage reviews and provide the feeds. This element indicates the use of an aggregator and contains information about the aggregator.",
    ).optional(),
    asins: z.array(z.string()).describe(
      "Optional. Contains ASINs (Amazon Standard Identification Numbers) associated with a product.",
    ).optional(),
    brands: z.array(z.string()).describe(
      "Optional. Contains brand names associated with a product.",
    ).optional(),
    collectionMethod: z.enum([
      "COLLECTION_METHOD_UNSPECIFIED",
      "UNSOLICITED",
      "POST_FULFILLMENT",
    ]).describe("Optional. The method used to collect the review.").optional(),
    cons: z.array(z.string()).describe(
      'Optional. Contains the disadvantages based on the opinion of the reviewer. Omit boilerplate text like "con:" unless it was written by the reviewer.',
    ).optional(),
    content: z.string().describe(
      "Optional. The content of the review. If empty, the content might still get populated from pros and cons.",
    ).optional(),
    gtins: z.array(z.string()).describe(
      "Optional. Contains GTINs (global trade item numbers) associated with a product. Sub-types of GTINs (e.g. UPC, EAN, ISBN, JAN) are supported.",
    ).optional(),
    isIncentivizedReview: z.boolean().describe(
      "Optional. Indicates whether the review is incentivized.",
    ).optional(),
    isSpam: z.boolean().describe(
      "Optional. Indicates whether the review is marked as spam in the publisher's system.",
    ).optional(),
    isVerifiedPurchase: z.boolean().describe(
      "Optional. Indicates whether the reviewer's purchase is verified.",
    ).optional(),
    maxRating: z.string().describe(
      "Optional. The maximum possible number for the rating. The value of the max rating must be greater than the value of the min attribute.",
    ).optional(),
    minRating: z.string().describe(
      "Optional. Contains the ratings associated with the review. The minimum possible number for the rating. This should be the worst possible rating and should not be a value for no rating.",
    ).optional(),
    mpns: z.array(z.string()).describe(
      "Optional. Contains MPNs (manufacturer part numbers) associated with a product.",
    ).optional(),
    productLinks: z.array(z.string()).describe(
      "Optional. The URI of the product. This URI can have the same value as the `review_link` element, if the review URI and the product URI are the same.",
    ).optional(),
    productNames: z.array(z.string()).describe(
      "Optional. Descriptive name of a product.",
    ).optional(),
    pros: z.array(z.string()).describe(
      'Optional. Contains the advantages based on the opinion of the reviewer. Omit boilerplate text like "pro:" unless it was written by the reviewer.',
    ).optional(),
    publisherFavicon: z.string().describe(
      "Optional. A link to the company favicon of the publisher. The image dimensions should be favicon size: 16x16 pixels. The image format should be GIF, JPG or PNG.",
    ).optional(),
    publisherName: z.string().describe(
      "Optional. The name of the publisher of the product reviews. The information about the publisher, which may be a retailer, manufacturer, reviews service company, or any entity that publishes product reviews.",
    ).optional(),
    rating: z.number().describe(
      "Optional. The reviewer's overall rating of the product.",
    ).optional(),
    reviewCountry: z.string().describe(
      "Optional. The country of the review defined by ISO 3166-1 Alpha-2 Country Code.",
    ).optional(),
    reviewLanguage: z.string().describe(
      "Optional. The language of the review defined by BCP-47 language code.",
    ).optional(),
    reviewLink: z.object({
      link: z.string().describe(
        "Optional. The URI of the review landing page. For example: `http://www.example.com/review_5.html`.",
      ).optional(),
      type: z.enum(["TYPE_UNSPECIFIED", "SINGLETON", "GROUP"]).describe(
        "Optional. Type of the review URI.",
      ).optional(),
    }).describe("The URI of the review landing page.").optional(),
    reviewTime: z.string().describe(
      "Required. The timestamp indicating when the review was written.",
    ).optional(),
    reviewerId: z.string().describe(
      "Optional. The author of the product review. A permanent, unique identifier for the author of the review in the publisher's system.",
    ).optional(),
    reviewerImageLinks: z.array(z.string()).describe(
      "Optional. A URI to an image of the reviewed product created by the review author. The URI does not have to end with an image file extension.",
    ).optional(),
    reviewerIsAnonymous: z.boolean().describe(
      "Optional. Set to true if the reviewer should remain anonymous.",
    ).optional(),
    reviewerUsername: z.string().describe(
      "Optional. The name of the reviewer of the product review.",
    ).optional(),
    skus: z.array(z.string()).describe(
      "Optional. Contains SKUs (stock keeping units) associated with a product. Often this matches the product Offer Id in the product feed.",
    ).optional(),
    subclientName: z.string().describe(
      "Optional. The name of the subclient of the product reviews. The subclient is an identifier of the product review source. It should be equivalent to the directory provided in the file data source path.",
    ).optional(),
    title: z.string().describe("Optional. The title of the review.").optional(),
    transactionId: z.string().describe(
      "Optional. A permanent, unique identifier for the transaction associated with the review in the publisher's system. This ID can be used to indicate that multiple reviews are associated with the same transaction.",
    ).optional(),
  }).describe("Attributes.").optional(),
  productReviewId: z.string().describe(
    "Required. The permanent, unique identifier for the product review in the publisher’s system.",
  ).optional(),
  productReviewStatus: z.object({
    createTime: z.string().describe(
      "Output only. Date on which the item has been created, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format.",
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
      ]).describe("Output only. The name of the reporting context.").optional(),
    })).describe(
      "Output only. The intended destinations for the product review.",
    ).optional(),
    itemLevelIssues: z.array(z.object({
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
      ]).describe("Output only. The reporting context the issue applies to.")
        .optional(),
      resolution: z.string().describe(
        "Output only. Whether the issue can be resolved by the merchant.",
      ).optional(),
      severity: z.enum(["SEVERITY_UNSPECIFIED", "NOT_IMPACTED", "DISAPPROVED"])
        .describe(
          "Output only. How this issue affects serving of the product review.",
        ).optional(),
    })).describe(
      "Output only. A list of all issues associated with the product review.",
    ).optional(),
    lastUpdateTime: z.string().describe(
      "Output only. Date on which the item has been last updated, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format.",
    ).optional(),
  }).describe("Product review status.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Merchant Accounts.ProductReviews. Registered at `@swamp/gcp/merchantapi/accounts-productreviews`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-productreviews",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A review for a product. For more information, see [Introduction to Product Re...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a productReviews",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["customAttributes"] !== undefined) {
          body["customAttributes"] = g["customAttributes"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["productReviewAttributes"] !== undefined) {
          body["productReviewAttributes"] = g["productReviewAttributes"];
        }
        if (g["productReviewId"] !== undefined) {
          body["productReviewId"] = g["productReviewId"];
        }
        if (g["productReviewStatus"] !== undefined) {
          body["productReviewStatus"] = g["productReviewStatus"];
        }
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
      description: "Get a productReviews",
      arguments: z.object({
        identifier: z.string().describe("The name of the productReviews"),
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
    delete: {
      description: "Delete the productReviews",
      arguments: z.object({
        identifier: z.string().describe("The name of the productReviews"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync productReviews state from GCP",
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
