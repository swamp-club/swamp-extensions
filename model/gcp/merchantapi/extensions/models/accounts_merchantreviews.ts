// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const LIST_CONFIG = {
  "id": "merchantapi.accounts.merchantReviews.list",
  "path": "reviews/v1beta/{+parent}/merchantReviews",
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

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/content",
];

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
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
  }).describe("Optional. A list of merchant review attributes.").optional(),
  merchantReviewId: z.string().describe(
    "Required. The user provided merchant review ID to uniquely identify the merchant review.",
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
    groupValues: z.array(z.record(z.string(), z.unknown())),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  customAttributes: z.array(z.object({
    groupValues: z.array(z.record(z.string(), z.unknown())).describe(
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
  }).describe("Optional. A list of merchant review attributes.").optional(),
  merchantReviewId: z.string().describe(
    "Required. The user provided merchant review ID to uniquely identify the merchant review.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The name of the merchant review. Format: `"{merchantreview.name=accounts/{account}/merchantReviews/{merchantReview}}"`',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Merchant Accounts.MerchantReviews. Registered at `@swamp/gcp/merchantapi/accounts-merchantreviews`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-merchantreviews",
  version: "2026.10.13.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: merchantReviewStatus",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { merchantReviewStatus: _merchantReviewStatus, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync merchantReviews state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific merchantReviews by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List merchantReviews resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. The maximum number of merchant reviews to return. The service can return fewer than this value. The maximum value is 1000; values above 1000 are coerced to 1000. If unspecified, the maximum number of reviews is returned.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "merchantReviews",
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
