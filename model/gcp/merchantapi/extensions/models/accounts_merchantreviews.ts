// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-merchantreviews
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.MerchantReviews.
 *
 * A review for a merchant. For more information, see [Introduction to Merchant Review Feeds](https://developers.google.com/merchant-review-feeds)
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
  return `${parent}/merchantReviews/${shortName}`;
}

const BASE_URL = "https://merchantapi.googleapis.com/";

const GET_CONFIG = {
  "id": "merchantapi.accounts.merchantReviews.get",
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
  "id": "merchantapi.accounts.merchantReviews.insert",
  "path": "reviews/v1beta/{+parent}/merchantReviews:insert",
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
  "id": "merchantapi.accounts.merchantReviews.delete",
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
  })).describe(
    'Optional. A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the data specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API, such as experimental attributes. Maximum allowed number of characters for each custom attribute is 10240 (represents sum of characters for name and value). Maximum 2500 custom attributes can be set per product, with total size of 102.4kB. Underscores in custom attribute names are replaced by spaces upon insertion.',
  ).optional(),
  merchantReviewAttributes: z.object({
    collectionMethod: z.enum([
      "COLLECTION_METHOD_UNSPECIFIED",
      "MERCHANT_UNSOLICITED",
      "POINT_OF_SALE",
      "AFTER_FULFILLMENT",
    ]).describe("Optional. The method used to collect the review.").optional(),
    content: z.string().describe(
      "Required. This should be any freeform text provided by the user and should not be truncated. If multiple responses to different questions are provided, all responses should be included, with the minimal context for the responses to make sense. Context should not be provided if questions were left unanswered.",
    ).optional(),
    isAnonymous: z.boolean().describe(
      "Optional. Set to true if the reviewer should remain anonymous.",
    ).optional(),
    maxRating: z.string().describe(
      "Optional. The maximum possible number for the rating. The value of the max rating must be greater than the value of the min rating.",
    ).optional(),
    merchantDisplayName: z.string().describe(
      "Optional. Human-readable display name for the merchant.",
    ).optional(),
    merchantId: z.string().describe(
      "Required. Must be unique and stable across all requests. In other words, if a request today and another 90 days ago refer to the same merchant, they must have the same id.",
    ).optional(),
    merchantLink: z.string().describe(
      "Optional. URL to the merchant's main website. Do not use a redirect URL for this value. In other words, the value should point directly to the merchant's site.",
    ).optional(),
    merchantRatingLink: z.string().describe(
      "Optional. URL to the landing page that hosts the reviews for this merchant. Do not use a redirect URL.",
    ).optional(),
    minRating: z.string().describe(
      "Optional. The minimum possible number for the rating. This should be the worst possible rating and should not be a value for no rating.",
    ).optional(),
    rating: z.number().describe(
      "Optional. The reviewer's overall rating of the merchant.",
    ).optional(),
    reviewCountry: z.string().describe(
      "Optional. The country where the reviewer made the order defined by ISO 3166-1 Alpha-2 Country Code.",
    ).optional(),
    reviewLanguage: z.string().describe(
      "Optional. The language of the review defined by BCP-47 language code.",
    ).optional(),
    reviewTime: z.string().describe(
      "Required. The timestamp indicating when the review was written.",
    ).optional(),
    reviewerId: z.string().describe(
      "Optional. A permanent, unique identifier for the author of the review in the publisher's system.",
    ).optional(),
    reviewerUsername: z.string().describe(
      "Optional. Display name of the review author.",
    ).optional(),
    title: z.string().describe("Optional. The title of the review.").optional(),
  }).describe("Attributes.").optional(),
  merchantReviewId: z.string().describe(
    "Required. The user provided merchant review ID to uniquely identify the merchant review.",
  ).optional(),
  merchantReviewStatus: z.object({
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
      "Output only. The intended destinations for the merchant review.",
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
          "Output only. How this issue affects serving of the merchant review.",
        ).optional(),
    })).describe(
      "Output only. A list of all issues associated with the merchant review.",
    ).optional(),
    lastUpdateTime: z.string().describe(
      "Output only. Date on which the item has been last updated, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format.",
    ).optional(),
  }).describe(
    "The status of a merchant review, data validation issues, that is, information about a merchant review computed asynchronously.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The name of the merchant review. Format: `"{merchantreview.name=accounts/{account}/merchantReviews/{merchantReview}}"`',
  ).optional(),
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
  merchantReviewAttributes: z.object({
    collectionMethod: z.string(),
    content: z.string(),
    isAnonymous: z.boolean(),
    maxRating: z.string(),
    merchantDisplayName: z.string(),
    merchantId: z.string(),
    merchantLink: z.string(),
    merchantRatingLink: z.string(),
    minRating: z.string(),
    rating: z.number(),
    reviewCountry: z.string(),
    reviewLanguage: z.string(),
    reviewTime: z.string(),
    reviewerId: z.string(),
    reviewerUsername: z.string(),
    title: z.string(),
  }).optional(),
  merchantReviewId: z.string().optional(),
  merchantReviewStatus: z.object({
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
  name: z.string(),
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
  })).describe(
    'Optional. A list of custom (merchant-provided) attributes. It can also be used for submitting any attribute of the data specification in its generic form (for example, `{ "name": "size type", "value": "regular" }`). This is useful for submitting attributes not explicitly exposed by the API, such as experimental attributes. Maximum allowed number of characters for each custom attribute is 10240 (represents sum of characters for name and value). Maximum 2500 custom attributes can be set per product, with total size of 102.4kB. Underscores in custom attribute names are replaced by spaces upon insertion.',
  ).optional(),
  merchantReviewAttributes: z.object({
    collectionMethod: z.enum([
      "COLLECTION_METHOD_UNSPECIFIED",
      "MERCHANT_UNSOLICITED",
      "POINT_OF_SALE",
      "AFTER_FULFILLMENT",
    ]).describe("Optional. The method used to collect the review.").optional(),
    content: z.string().describe(
      "Required. This should be any freeform text provided by the user and should not be truncated. If multiple responses to different questions are provided, all responses should be included, with the minimal context for the responses to make sense. Context should not be provided if questions were left unanswered.",
    ).optional(),
    isAnonymous: z.boolean().describe(
      "Optional. Set to true if the reviewer should remain anonymous.",
    ).optional(),
    maxRating: z.string().describe(
      "Optional. The maximum possible number for the rating. The value of the max rating must be greater than the value of the min rating.",
    ).optional(),
    merchantDisplayName: z.string().describe(
      "Optional. Human-readable display name for the merchant.",
    ).optional(),
    merchantId: z.string().describe(
      "Required. Must be unique and stable across all requests. In other words, if a request today and another 90 days ago refer to the same merchant, they must have the same id.",
    ).optional(),
    merchantLink: z.string().describe(
      "Optional. URL to the merchant's main website. Do not use a redirect URL for this value. In other words, the value should point directly to the merchant's site.",
    ).optional(),
    merchantRatingLink: z.string().describe(
      "Optional. URL to the landing page that hosts the reviews for this merchant. Do not use a redirect URL.",
    ).optional(),
    minRating: z.string().describe(
      "Optional. The minimum possible number for the rating. This should be the worst possible rating and should not be a value for no rating.",
    ).optional(),
    rating: z.number().describe(
      "Optional. The reviewer's overall rating of the merchant.",
    ).optional(),
    reviewCountry: z.string().describe(
      "Optional. The country where the reviewer made the order defined by ISO 3166-1 Alpha-2 Country Code.",
    ).optional(),
    reviewLanguage: z.string().describe(
      "Optional. The language of the review defined by BCP-47 language code.",
    ).optional(),
    reviewTime: z.string().describe(
      "Required. The timestamp indicating when the review was written.",
    ).optional(),
    reviewerId: z.string().describe(
      "Optional. A permanent, unique identifier for the author of the review in the publisher's system.",
    ).optional(),
    reviewerUsername: z.string().describe(
      "Optional. Display name of the review author.",
    ).optional(),
    title: z.string().describe("Optional. The title of the review.").optional(),
  }).describe("Attributes.").optional(),
  merchantReviewId: z.string().describe(
    "Required. The user provided merchant review ID to uniquely identify the merchant review.",
  ).optional(),
  merchantReviewStatus: z.object({
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
      "Output only. The intended destinations for the merchant review.",
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
          "Output only. How this issue affects serving of the merchant review.",
        ).optional(),
    })).describe(
      "Output only. A list of all issues associated with the merchant review.",
    ).optional(),
    lastUpdateTime: z.string().describe(
      "Output only. Date on which the item has been last updated, in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format.",
    ).optional(),
  }).describe(
    "The status of a merchant review, data validation issues, that is, information about a merchant review computed asynchronously.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The name of the merchant review. Format: `"{merchantreview.name=accounts/{account}/merchantReviews/{merchantReview}}"`',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Merchant Accounts.MerchantReviews. Registered at `@swamp/gcp/merchantapi/accounts-merchantreviews`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-merchantreviews",
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
        "A review for a merchant. For more information, see [Introduction to Merchant ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a merchantReviews",
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
        if (g["merchantReviewAttributes"] !== undefined) {
          body["merchantReviewAttributes"] = g["merchantReviewAttributes"];
        }
        if (g["merchantReviewId"] !== undefined) {
          body["merchantReviewId"] = g["merchantReviewId"];
        }
        if (g["merchantReviewStatus"] !== undefined) {
          body["merchantReviewStatus"] = g["merchantReviewStatus"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
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
      description: "Get a merchantReviews",
      arguments: z.object({
        identifier: z.string().describe("The name of the merchantReviews"),
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
      description: "Delete the merchantReviews",
      arguments: z.object({
        identifier: z.string().describe("The name of the merchantReviews"),
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
      description: "Sync merchantReviews state from GCP",
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
