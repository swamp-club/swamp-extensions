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

// Auto-generated extension model for @swamp/gcp/retail/catalogs-controls
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud AI Commerce Search Catalogs.Controls.
 *
 * Configures dynamic metadata that can be linked to a ServingConfig and affect search or recommendation results at serving time.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/controls/${shortName}`;
}

const BASE_URL = "https://retail.googleapis.com/";

const GET_CONFIG = {
  "id": "retail.projects.locations.catalogs.controls.get",
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
  "id": "retail.projects.locations.catalogs.controls.create",
  "path": "v2/{+parent}/controls",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "controlId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "retail.projects.locations.catalogs.controls.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
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
  "id": "retail.projects.locations.catalogs.controls.delete",
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
  "id": "retail.projects.locations.catalogs.controls.list",
  "path": "v2/{+parent}/controls",
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
  },
} as const;

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
  displayName: z.string().describe(
    "Required. The human readable control display name. Used in Retail UI. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is thrown.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/*/locations/global/catalogs/*/controls/*`",
  ).optional(),
  rule: z.object({
    boostAction: z.object({
      boost: z.number().describe(
        "Strength of the condition boost, which must be in [-1, 1]. Negative boost means demotion. Default is 0.0. Setting to 1.0 gives the item a big promotion. However, it does not necessarily mean that the boosted item will be the top result at all times, nor that other items will be excluded. Results could still be shown even when none of them matches the condition. And results that are significantly more relevant to the search query can still trump your heavily favored but irrelevant items. Setting to -1.0 gives the item a big demotion. However, results that are deeply relevant might still be shown. The item will have an upstream battle to get a fairly high ranking, but it is not blocked out completely. Setting to 0.0 means no boost applied. The boosting condition is ignored.",
      ).optional(),
      productsFilter: z.string().describe(
        'The filter can have a max size of 5000 characters. An expression which specifies which products to apply an action to. The syntax and supported fields are the same as a filter expression. See SearchRequest.filter for detail syntax and limitations. Examples: * To boost products with product ID "product_1" or "product_2", and color "Red" or "Blue": *(id: ANY("product_1", "product_2")) * *AND * *(colorFamilies: ANY("Red", "Blue")) *',
      ).optional(),
    }).describe("A boost action.").optional(),
    condition: z.object({
      activeTimeRange: z.array(z.object({
        endTime: z.string().describe("End of time range. Range is inclusive.")
          .optional(),
        startTime: z.string().describe(
          "Start of time range. Range is inclusive.",
        ).optional(),
      })).describe(
        "Range of time(s) specifying when Condition is active. Condition true if any time range matches.",
      ).optional(),
      pageCategories: z.array(z.string()).describe(
        "Used to support browse uses cases. A list (up to 10 entries) of categories or departments. The format should be the same as UserEvent.page_categories;",
      ).optional(),
      queryTerms: z.array(z.object({
        fullMatch: z.boolean().describe(
          "Whether this is supposed to be a full or partial match.",
        ).optional(),
        value: z.string().describe(
          'The value of the term to match on. Value cannot be empty. Value can have at most 3 terms if specified as a partial match. Each space separated string is considered as one term. For example, "a b c" is 3 terms and allowed, but " a b c d" is 4 terms and not allowed for a partial match.',
        ).optional(),
      })).describe(
        "A list (up to 10 entries) of terms to match the query on. If not specified, match all queries. If many query terms are specified, the condition is matched if any of the terms is a match (i.e. using the OR operator).",
      ).optional(),
    }).describe(
      "Required. The condition that triggers the rule. If the condition is empty, the rule will always apply.",
    ).optional(),
    doNotAssociateAction: z.object({
      doNotAssociateTerms: z.array(z.string()).describe(
        "Cannot contain duplicates or the query term. Can specify up to 100 terms.",
      ).optional(),
      queryTerms: z.array(z.string()).describe(
        "Terms from the search query. Will not consider do_not_associate_terms for search if in search query. Can specify up to 100 terms.",
      ).optional(),
      terms: z.array(z.string()).describe(
        "Will be [deprecated = true] post migration;",
      ).optional(),
    }).describe("Prevents term from being associated with other terms.")
      .optional(),
    filterAction: z.object({
      filter: z.string().describe(
        'A filter to apply on the matching condition results. Supported features: * filter must be set. * Filter syntax is identical to SearchRequest.filter. For more information, see [Filter](/retail/docs/filter-and-order#filter). * To filter products with product ID "product_1" or "product_2", and color "Red" or "Blue": *(id: ANY("product_1", "product_2")) * *AND * *(colorFamilies: ANY("Red", "Blue")) *',
      ).optional(),
    }).describe("Filters results.").optional(),
    forceReturnFacetAction: z.object({
      facetPositionAdjustments: z.array(z.object({
        attributeName: z.string().describe(
          "The attribute name to force return as a facet. Each attribute name should be a valid attribute name, be non-empty and contain at most 80 characters long.",
        ).optional(),
        position: z.number().int().describe(
          "This is the position in the request as explained above. It should be strictly positive be at most 100.",
        ).optional(),
      })).describe(
        "Each instance corresponds to a force return attribute for the given condition. There can't be more 15 instances here.",
      ).optional(),
    }).describe("Force returns an attribute as a facet in the request.")
      .optional(),
    ignoreAction: z.object({
      ignoreTerms: z.array(z.string()).describe(
        "Terms to ignore in the search query.",
      ).optional(),
    }).describe("Ignores specific terms from query during search.").optional(),
    onewaySynonymsAction: z.object({
      onewayTerms: z.array(z.string()).describe(
        "Will be [deprecated = true] post migration;",
      ).optional(),
      queryTerms: z.array(z.string()).describe(
        "Terms from the search query. Will treat synonyms as their synonyms. Not themselves synonyms of the synonyms. Can specify up to 100 terms.",
      ).optional(),
      synonyms: z.array(z.string()).describe(
        "Defines a set of synonyms. Cannot contain duplicates. Can specify up to 100 synonyms.",
      ).optional(),
    }).describe(
      "Treats specific term as a synonym with a group of terms. Group of terms will not be treated as synonyms with the specific term.",
    ).optional(),
    pinAction: z.object({
      pinMap: z.record(z.string(), z.string()).describe(
        "Required. A map of positions to product_ids. Partial matches per action are allowed, if a certain position in the map is already filled that `[position, product_id]` pair will be ignored but the rest may still be applied. This case will only occur if multiple pin actions are matched to a single request, as the map guarantees that pin positions are unique within the same action. Duplicate product_ids are not permitted within a single pin map. The max size of this map is 120, equivalent to the max [request page size](https://cloud.google.com/retail/docs/reference/rest/v2/projects.locations.catalogs.placements/search#request-body).",
      ).optional(),
    }).describe(
      "Pins one or more specified products to a specific position in the results.",
    ).optional(),
    redirectAction: z.object({
      redirectUri: z.string().describe(
        "URL must have length equal or less than 2000 characters.",
      ).optional(),
    }).describe("Redirects a shopper to a specific page.").optional(),
    removeFacetAction: z.object({
      attributeNames: z.array(z.string()).describe(
        "The attribute names (i.e. facet keys) to remove from the dynamic facets (if present in the request). There can't be more 3 attribute names. Each attribute name should be a valid attribute name, be non-empty and contain at most 80 characters.",
      ).optional(),
    }).describe("Remove an attribute as a facet in the request (if present).")
      .optional(),
    replacementAction: z.object({
      queryTerms: z.array(z.string()).describe(
        "Terms from the search query. Will be replaced by replacement term. Can specify up to 100 terms.",
      ).optional(),
      replacementTerm: z.string().describe(
        "Term that will be used for replacement.",
      ).optional(),
      term: z.string().describe("Will be [deprecated = true] post migration;")
        .optional(),
    }).describe("Replaces specific terms in the query.").optional(),
    twowaySynonymsAction: z.object({
      synonyms: z.array(z.string()).describe(
        "Defines a set of synonyms. Can specify up to 100 synonyms. Must specify at least 2 synonyms.",
      ).optional(),
    }).describe("Treats a set of terms as synonyms of one another.").optional(),
  }).describe(
    'A rule control - a condition-action pair. Enacts a set action when the condition is triggered. For example: Boost "gShoe" when query full matches "Running Shoes".',
  ).optional(),
  searchSolutionUseCase: z.array(
    z.enum([
      "SEARCH_SOLUTION_USE_CASE_UNSPECIFIED",
      "SEARCH_SOLUTION_USE_CASE_SEARCH",
      "SEARCH_SOLUTION_USE_CASE_BROWSE",
    ]),
  ).describe(
    "Specifies the use case for the control. Affects what condition fields can be set. Only settable by search controls. Will default to SEARCH_SOLUTION_USE_CASE_SEARCH if not specified. Currently only allow one search_solution_use_case per control.",
  ).optional(),
  solutionTypes: z.array(
    z.enum([
      "SOLUTION_TYPE_UNSPECIFIED",
      "SOLUTION_TYPE_RECOMMENDATION",
      "SOLUTION_TYPE_SEARCH",
    ]),
  ).describe(
    "Required. Immutable. The solution types that the control is used for. Currently we support setting only one type of solution at creation time. Only `SOLUTION_TYPE_SEARCH` value is supported at the moment. If no solution type is provided at creation time, will default to SOLUTION_TYPE_SEARCH.",
  ).optional(),
  controlId: z.string().describe(
    "Required. The ID to use for the Control, which will become the final component of the Control's resource name. This value should be 4-63 characters, and valid characters are /a-z-_/.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  associatedServingConfigIds: z.array(z.string()).optional(),
  displayName: z.string().optional(),
  name: z.string(),
  rule: z.object({
    boostAction: z.object({
      boost: z.number(),
      productsFilter: z.string(),
    }),
    condition: z.object({
      activeTimeRange: z.array(z.object({
        endTime: z.string(),
        startTime: z.string(),
      })),
      pageCategories: z.array(z.string()),
      queryTerms: z.array(z.object({
        fullMatch: z.boolean(),
        value: z.string(),
      })),
    }),
    doNotAssociateAction: z.object({
      doNotAssociateTerms: z.array(z.string()),
      queryTerms: z.array(z.string()),
      terms: z.array(z.string()),
    }),
    filterAction: z.object({
      filter: z.string(),
    }),
    forceReturnFacetAction: z.object({
      facetPositionAdjustments: z.array(z.object({
        attributeName: z.string(),
        position: z.number(),
      })),
    }),
    ignoreAction: z.object({
      ignoreTerms: z.array(z.string()),
    }),
    onewaySynonymsAction: z.object({
      onewayTerms: z.array(z.string()),
      queryTerms: z.array(z.string()),
      synonyms: z.array(z.string()),
    }),
    pinAction: z.object({
      pinMap: z.record(z.string(), z.unknown()),
    }),
    redirectAction: z.object({
      redirectUri: z.string(),
    }),
    removeFacetAction: z.object({
      attributeNames: z.array(z.string()),
    }),
    replacementAction: z.object({
      queryTerms: z.array(z.string()),
      replacementTerm: z.string(),
      term: z.string(),
    }),
    twowaySynonymsAction: z.object({
      synonyms: z.array(z.string()),
    }),
  }).optional(),
  searchSolutionUseCase: z.array(z.string()).optional(),
  solutionTypes: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  displayName: z.string().describe(
    "Required. The human readable control display name. Used in Retail UI. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is thrown.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/*/locations/global/catalogs/*/controls/*`",
  ).optional(),
  rule: z.object({
    boostAction: z.object({
      boost: z.number().describe(
        "Strength of the condition boost, which must be in [-1, 1]. Negative boost means demotion. Default is 0.0. Setting to 1.0 gives the item a big promotion. However, it does not necessarily mean that the boosted item will be the top result at all times, nor that other items will be excluded. Results could still be shown even when none of them matches the condition. And results that are significantly more relevant to the search query can still trump your heavily favored but irrelevant items. Setting to -1.0 gives the item a big demotion. However, results that are deeply relevant might still be shown. The item will have an upstream battle to get a fairly high ranking, but it is not blocked out completely. Setting to 0.0 means no boost applied. The boosting condition is ignored.",
      ).optional(),
      productsFilter: z.string().describe(
        'The filter can have a max size of 5000 characters. An expression which specifies which products to apply an action to. The syntax and supported fields are the same as a filter expression. See SearchRequest.filter for detail syntax and limitations. Examples: * To boost products with product ID "product_1" or "product_2", and color "Red" or "Blue": *(id: ANY("product_1", "product_2")) * *AND * *(colorFamilies: ANY("Red", "Blue")) *',
      ).optional(),
    }).describe("A boost action.").optional(),
    condition: z.object({
      activeTimeRange: z.array(z.object({
        endTime: z.string().describe("End of time range. Range is inclusive.")
          .optional(),
        startTime: z.string().describe(
          "Start of time range. Range is inclusive.",
        ).optional(),
      })).describe(
        "Range of time(s) specifying when Condition is active. Condition true if any time range matches.",
      ).optional(),
      pageCategories: z.array(z.string()).describe(
        "Used to support browse uses cases. A list (up to 10 entries) of categories or departments. The format should be the same as UserEvent.page_categories;",
      ).optional(),
      queryTerms: z.array(z.object({
        fullMatch: z.boolean().describe(
          "Whether this is supposed to be a full or partial match.",
        ).optional(),
        value: z.string().describe(
          'The value of the term to match on. Value cannot be empty. Value can have at most 3 terms if specified as a partial match. Each space separated string is considered as one term. For example, "a b c" is 3 terms and allowed, but " a b c d" is 4 terms and not allowed for a partial match.',
        ).optional(),
      })).describe(
        "A list (up to 10 entries) of terms to match the query on. If not specified, match all queries. If many query terms are specified, the condition is matched if any of the terms is a match (i.e. using the OR operator).",
      ).optional(),
    }).describe(
      "Required. The condition that triggers the rule. If the condition is empty, the rule will always apply.",
    ).optional(),
    doNotAssociateAction: z.object({
      doNotAssociateTerms: z.array(z.string()).describe(
        "Cannot contain duplicates or the query term. Can specify up to 100 terms.",
      ).optional(),
      queryTerms: z.array(z.string()).describe(
        "Terms from the search query. Will not consider do_not_associate_terms for search if in search query. Can specify up to 100 terms.",
      ).optional(),
      terms: z.array(z.string()).describe(
        "Will be [deprecated = true] post migration;",
      ).optional(),
    }).describe("Prevents term from being associated with other terms.")
      .optional(),
    filterAction: z.object({
      filter: z.string().describe(
        'A filter to apply on the matching condition results. Supported features: * filter must be set. * Filter syntax is identical to SearchRequest.filter. For more information, see [Filter](/retail/docs/filter-and-order#filter). * To filter products with product ID "product_1" or "product_2", and color "Red" or "Blue": *(id: ANY("product_1", "product_2")) * *AND * *(colorFamilies: ANY("Red", "Blue")) *',
      ).optional(),
    }).describe("Filters results.").optional(),
    forceReturnFacetAction: z.object({
      facetPositionAdjustments: z.array(z.object({
        attributeName: z.string().describe(
          "The attribute name to force return as a facet. Each attribute name should be a valid attribute name, be non-empty and contain at most 80 characters long.",
        ).optional(),
        position: z.number().int().describe(
          "This is the position in the request as explained above. It should be strictly positive be at most 100.",
        ).optional(),
      })).describe(
        "Each instance corresponds to a force return attribute for the given condition. There can't be more 15 instances here.",
      ).optional(),
    }).describe("Force returns an attribute as a facet in the request.")
      .optional(),
    ignoreAction: z.object({
      ignoreTerms: z.array(z.string()).describe(
        "Terms to ignore in the search query.",
      ).optional(),
    }).describe("Ignores specific terms from query during search.").optional(),
    onewaySynonymsAction: z.object({
      onewayTerms: z.array(z.string()).describe(
        "Will be [deprecated = true] post migration;",
      ).optional(),
      queryTerms: z.array(z.string()).describe(
        "Terms from the search query. Will treat synonyms as their synonyms. Not themselves synonyms of the synonyms. Can specify up to 100 terms.",
      ).optional(),
      synonyms: z.array(z.string()).describe(
        "Defines a set of synonyms. Cannot contain duplicates. Can specify up to 100 synonyms.",
      ).optional(),
    }).describe(
      "Treats specific term as a synonym with a group of terms. Group of terms will not be treated as synonyms with the specific term.",
    ).optional(),
    pinAction: z.object({
      pinMap: z.record(z.string(), z.string()).describe(
        "Required. A map of positions to product_ids. Partial matches per action are allowed, if a certain position in the map is already filled that `[position, product_id]` pair will be ignored but the rest may still be applied. This case will only occur if multiple pin actions are matched to a single request, as the map guarantees that pin positions are unique within the same action. Duplicate product_ids are not permitted within a single pin map. The max size of this map is 120, equivalent to the max [request page size](https://cloud.google.com/retail/docs/reference/rest/v2/projects.locations.catalogs.placements/search#request-body).",
      ).optional(),
    }).describe(
      "Pins one or more specified products to a specific position in the results.",
    ).optional(),
    redirectAction: z.object({
      redirectUri: z.string().describe(
        "URL must have length equal or less than 2000 characters.",
      ).optional(),
    }).describe("Redirects a shopper to a specific page.").optional(),
    removeFacetAction: z.object({
      attributeNames: z.array(z.string()).describe(
        "The attribute names (i.e. facet keys) to remove from the dynamic facets (if present in the request). There can't be more 3 attribute names. Each attribute name should be a valid attribute name, be non-empty and contain at most 80 characters.",
      ).optional(),
    }).describe("Remove an attribute as a facet in the request (if present).")
      .optional(),
    replacementAction: z.object({
      queryTerms: z.array(z.string()).describe(
        "Terms from the search query. Will be replaced by replacement term. Can specify up to 100 terms.",
      ).optional(),
      replacementTerm: z.string().describe(
        "Term that will be used for replacement.",
      ).optional(),
      term: z.string().describe("Will be [deprecated = true] post migration;")
        .optional(),
    }).describe("Replaces specific terms in the query.").optional(),
    twowaySynonymsAction: z.object({
      synonyms: z.array(z.string()).describe(
        "Defines a set of synonyms. Can specify up to 100 synonyms. Must specify at least 2 synonyms.",
      ).optional(),
    }).describe("Treats a set of terms as synonyms of one another.").optional(),
  }).describe(
    'A rule control - a condition-action pair. Enacts a set action when the condition is triggered. For example: Boost "gShoe" when query full matches "Running Shoes".',
  ).optional(),
  searchSolutionUseCase: z.array(
    z.enum([
      "SEARCH_SOLUTION_USE_CASE_UNSPECIFIED",
      "SEARCH_SOLUTION_USE_CASE_SEARCH",
      "SEARCH_SOLUTION_USE_CASE_BROWSE",
    ]),
  ).describe(
    "Specifies the use case for the control. Affects what condition fields can be set. Only settable by search controls. Will default to SEARCH_SOLUTION_USE_CASE_SEARCH if not specified. Currently only allow one search_solution_use_case per control.",
  ).optional(),
  solutionTypes: z.array(
    z.enum([
      "SOLUTION_TYPE_UNSPECIFIED",
      "SOLUTION_TYPE_RECOMMENDATION",
      "SOLUTION_TYPE_SEARCH",
    ]),
  ).describe(
    "Required. Immutable. The solution types that the control is used for. Currently we support setting only one type of solution at creation time. Only `SOLUTION_TYPE_SEARCH` value is supported at the moment. If no solution type is provided at creation time, will default to SOLUTION_TYPE_SEARCH.",
  ).optional(),
  controlId: z.string().describe(
    "Required. The ID to use for the Control, which will become the final component of the Control's resource name. This value should be 4-63 characters, and valid characters are /a-z-_/.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud AI Commerce Search Catalogs.Controls. Registered at `@swamp/gcp/retail/catalogs-controls`. */
export const model = {
  type: "@swamp/gcp/retail/catalogs-controls",
  version: "2026.10.23.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
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
      toVersion: "2026.07.18.2",
      description: "No schema changes",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
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
      toVersion: "2026.08.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Configures dynamic metadata that can be linked to a ServingConfig and affect ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a controls",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rule"] !== undefined) body["rule"] = g["rule"];
        if (g["searchSolutionUseCase"] !== undefined) {
          body["searchSolutionUseCase"] = g["searchSolutionUseCase"];
        }
        if (g["solutionTypes"] !== undefined) {
          body["solutionTypes"] = g["solutionTypes"];
        }
        if (g["controlId"] !== undefined) {
          params["controlId"] = String(g["controlId"]);
        }
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a controls",
      arguments: z.object({
        identifier: z.string().describe("The name of the controls"),
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
    update: {
      description: "Update controls attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific controls by name (e.g. one discovered by list)",
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
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["rule"] !== undefined) body["rule"] = g["rule"];
        if (g["searchSolutionUseCase"] !== undefined) {
          body["searchSolutionUseCase"] = g["searchSolutionUseCase"];
        }
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
          PATCH_CONFIG,
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
      description: "Delete the controls",
      arguments: z.object({
        identifier: z.string().describe("The name of the controls"),
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
      description: "Sync controls state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific controls by name (e.g. one discovered by list)",
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
      description: "List controls resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. A filter to apply on the list results. Supported features: * List all the products under the parent branch if filter is unset. * List controls that are used in a single ServingConfig: 'serving_config = \"boosted_home_page_cvr\"'",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of results to return. If unspecified, defaults to 50. Max allowed value is 1000.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "controls",
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
