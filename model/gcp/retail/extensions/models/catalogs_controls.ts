// Auto-generated extension model for @swamp/gcp/retail/catalogs-controls
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Vertex AI Search for commerce Catalogs.Controls.
 *
 * Configures dynamic metadata that can be linked to a ServingConfig and affect search or recommendation results at serving time.
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

const GlobalArgsSchema = z.object({
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
    }).describe(
      "A boost action to apply to results matching condition specified above.",
    ).optional(),
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
      "Metadata that is used to define a condition that triggers an action. A valid condition must specify at least one of 'query_terms' or 'products_filter'. If multiple fields are specified, the condition is met if all the fields are satisfied e.g. if a set of query terms and product_filter are set, then only items matching the product_filter for requests with a query matching the query terms wil get boosted.",
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
    }).describe(
      'Prevents `query_term` from being associated with specified terms during search. Example: Don\'t associate "gShoe" and "cheap".',
    ).optional(),
    filterAction: z.object({
      filter: z.string().describe(
        'A filter to apply on the matching condition results. Supported features: * filter must be set. * Filter syntax is identical to SearchRequest.filter. For more information, see [Filter](/retail/docs/filter-and-order#filter). * To filter products with product ID "product_1" or "product_2", and color "Red" or "Blue": *(id: ANY("product_1", "product_2")) * *AND * *(colorFamilies: ANY("Red", "Blue")) *',
      ).optional(),
    }).describe(
      "* Rule Condition: - No Condition.query_terms provided is a global match. - 1 or more Condition.query_terms provided are combined with OR operator. * Action Input: The request query and filter that are applied to the retrieved products, in addition to any filters already provided with the SearchRequest. The AND operator is used to combine the query's existing filters with the filter rule(s). NOTE: May result in 0 results when filters conflict. * Action Result: Filters the returned objects to be ONLY those that passed the filter.",
    ).optional(),
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
    }).describe(
      'Force returns an attribute/facet in the request around a certain position or above. * Rule Condition: Must specify non-empty Condition.query_terms (for search only) or Condition.page_categories (for browse only), but can\'t specify both. * Action Inputs: attribute name, position * Action Result: Will force return a facet key around a certain position or above if the condition is satisfied. Example: Suppose the query is "shoes", the Condition.query_terms is "shoes", the ForceReturnFacetAction.FacetPositionAdjustment.attribute_name is "size" and the ForceReturnFacetAction.FacetPositionAdjustment.position is 8. Two cases: a) The facet key "size" is not already in the top 8 slots, then the facet "size" will appear at a position close to 8. b) The facet key "size" in among the top 8 positions in the request, then it will stay at its current rank.',
    ).optional(),
    ignoreAction: z.object({
      ignoreTerms: z.array(z.string()).describe(
        "Terms to ignore in the search query.",
      ).optional(),
    }).describe(
      'Prevents a term in the query from being used in search. Example: Don\'t search for "shoddy".',
    ).optional(),
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
      'Maps a set of terms to a set of synonyms. Set of synonyms will be treated as synonyms of each query term only. `query_terms` will not be treated as synonyms of each other. Example: "sneakers" will use a synonym of "shoes". "shoes" will not use a synonym of "sneakers".',
    ).optional(),
    pinAction: z.object({
      pinMap: z.record(z.string(), z.string()).describe(
        "Required. A map of positions to product_ids. Partial matches per action are allowed, if a certain position in the map is already filled that `[position, product_id]` pair will be ignored but the rest may still be applied. This case will only occur if multiple pin actions are matched to a single request, as the map guarantees that pin positions are unique within the same action. Duplicate product_ids are not permitted within a single pin map. The max size of this map is 120, equivalent to the max [request page size](https://cloud.google.com/retail/docs/reference/rest/v2/projects.locations.catalogs.placements/search#request-body).",
      ).optional(),
    }).describe(
      'Pins one or more specified products to a specific position in the results. * Rule Condition: Must specify non-empty Condition.query_terms (for search only) or Condition.page_categories (for browse only), but can\'t specify both. * Action Input: mapping of `[pin_position, product_id]` pairs (pin position uses 1-based indexing). * Action Result: Will pin products with matching ids to the position specified in the final result order. Example: Suppose the query is `shoes`, the Condition.query_terms is `shoes` and the pin_map has `{1, "pid1"}`, then product with `pid1` will be pinned to the top position in the final results. If multiple PinActions are matched to a single request the actions will be processed from most to least recently updated. Pins to positions larger than the max allowed page size of 120 are not allowed.',
    ).optional(),
    redirectAction: z.object({
      redirectUri: z.string().describe(
        "URL must have length equal or less than 2000 characters.",
      ).optional(),
    }).describe(
      "Redirects a shopper to a specific page. * Rule Condition: Must specify Condition.query_terms. * Action Input: Request Query * Action Result: Redirects shopper to provided uri.",
    ).optional(),
    removeFacetAction: z.object({
      attributeNames: z.array(z.string()).describe(
        "The attribute names (i.e. facet keys) to remove from the dynamic facets (if present in the request). There can't be more 3 attribute names. Each attribute name should be a valid attribute name, be non-empty and contain at most 80 characters.",
      ).optional(),
    }).describe(
      'Removes an attribute/facet in the request if is present. * Rule Condition: Must specify non-empty Condition.query_terms (for search only) or Condition.page_categories (for browse only), but can\'t specify both. * Action Input: attribute name * Action Result: Will remove the attribute (as a facet) from the request if it is present. Example: Suppose the query is "shoes", the Condition.query_terms is "shoes" and the attribute name "size", then facet key "size" will be removed from the request (if it is present).',
    ).optional(),
    replacementAction: z.object({
      queryTerms: z.array(z.string()).describe(
        "Terms from the search query. Will be replaced by replacement term. Can specify up to 100 terms.",
      ).optional(),
      replacementTerm: z.string().describe(
        "Term that will be used for replacement.",
      ).optional(),
      term: z.string().describe("Will be [deprecated = true] post migration;")
        .optional(),
    }).describe(
      'Replaces a term in the query. Multiple replacement candidates can be specified. All `query_terms` will be replaced with the replacement term. Example: Replace "gShoe" with "google shoe".',
    ).optional(),
    twowaySynonymsAction: z.object({
      synonyms: z.array(z.string()).describe(
        "Defines a set of synonyms. Can specify up to 100 synonyms. Must specify at least 2 synonyms.",
      ).optional(),
    }).describe(
      'Creates a set of terms that will be treated as synonyms of each other. Example: synonyms of "sneakers" and "shoes": * "sneakers" will use a synonym of "shoes". * "shoes" will use a synonym of "sneakers".',
    ).optional(),
  }).describe(
    "A rule is a condition-action pair * A condition defines when a rule is to be triggered. * An action specifies what occurs on that trigger. Currently rules only work for controls with SOLUTION_TYPE_SEARCH.",
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
    }).describe(
      "A boost action to apply to results matching condition specified above.",
    ).optional(),
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
      "Metadata that is used to define a condition that triggers an action. A valid condition must specify at least one of 'query_terms' or 'products_filter'. If multiple fields are specified, the condition is met if all the fields are satisfied e.g. if a set of query terms and product_filter are set, then only items matching the product_filter for requests with a query matching the query terms wil get boosted.",
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
    }).describe(
      'Prevents `query_term` from being associated with specified terms during search. Example: Don\'t associate "gShoe" and "cheap".',
    ).optional(),
    filterAction: z.object({
      filter: z.string().describe(
        'A filter to apply on the matching condition results. Supported features: * filter must be set. * Filter syntax is identical to SearchRequest.filter. For more information, see [Filter](/retail/docs/filter-and-order#filter). * To filter products with product ID "product_1" or "product_2", and color "Red" or "Blue": *(id: ANY("product_1", "product_2")) * *AND * *(colorFamilies: ANY("Red", "Blue")) *',
      ).optional(),
    }).describe(
      "* Rule Condition: - No Condition.query_terms provided is a global match. - 1 or more Condition.query_terms provided are combined with OR operator. * Action Input: The request query and filter that are applied to the retrieved products, in addition to any filters already provided with the SearchRequest. The AND operator is used to combine the query's existing filters with the filter rule(s). NOTE: May result in 0 results when filters conflict. * Action Result: Filters the returned objects to be ONLY those that passed the filter.",
    ).optional(),
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
    }).describe(
      'Force returns an attribute/facet in the request around a certain position or above. * Rule Condition: Must specify non-empty Condition.query_terms (for search only) or Condition.page_categories (for browse only), but can\'t specify both. * Action Inputs: attribute name, position * Action Result: Will force return a facet key around a certain position or above if the condition is satisfied. Example: Suppose the query is "shoes", the Condition.query_terms is "shoes", the ForceReturnFacetAction.FacetPositionAdjustment.attribute_name is "size" and the ForceReturnFacetAction.FacetPositionAdjustment.position is 8. Two cases: a) The facet key "size" is not already in the top 8 slots, then the facet "size" will appear at a position close to 8. b) The facet key "size" in among the top 8 positions in the request, then it will stay at its current rank.',
    ).optional(),
    ignoreAction: z.object({
      ignoreTerms: z.array(z.string()).describe(
        "Terms to ignore in the search query.",
      ).optional(),
    }).describe(
      'Prevents a term in the query from being used in search. Example: Don\'t search for "shoddy".',
    ).optional(),
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
      'Maps a set of terms to a set of synonyms. Set of synonyms will be treated as synonyms of each query term only. `query_terms` will not be treated as synonyms of each other. Example: "sneakers" will use a synonym of "shoes". "shoes" will not use a synonym of "sneakers".',
    ).optional(),
    pinAction: z.object({
      pinMap: z.record(z.string(), z.string()).describe(
        "Required. A map of positions to product_ids. Partial matches per action are allowed, if a certain position in the map is already filled that `[position, product_id]` pair will be ignored but the rest may still be applied. This case will only occur if multiple pin actions are matched to a single request, as the map guarantees that pin positions are unique within the same action. Duplicate product_ids are not permitted within a single pin map. The max size of this map is 120, equivalent to the max [request page size](https://cloud.google.com/retail/docs/reference/rest/v2/projects.locations.catalogs.placements/search#request-body).",
      ).optional(),
    }).describe(
      'Pins one or more specified products to a specific position in the results. * Rule Condition: Must specify non-empty Condition.query_terms (for search only) or Condition.page_categories (for browse only), but can\'t specify both. * Action Input: mapping of `[pin_position, product_id]` pairs (pin position uses 1-based indexing). * Action Result: Will pin products with matching ids to the position specified in the final result order. Example: Suppose the query is `shoes`, the Condition.query_terms is `shoes` and the pin_map has `{1, "pid1"}`, then product with `pid1` will be pinned to the top position in the final results. If multiple PinActions are matched to a single request the actions will be processed from most to least recently updated. Pins to positions larger than the max allowed page size of 120 are not allowed.',
    ).optional(),
    redirectAction: z.object({
      redirectUri: z.string().describe(
        "URL must have length equal or less than 2000 characters.",
      ).optional(),
    }).describe(
      "Redirects a shopper to a specific page. * Rule Condition: Must specify Condition.query_terms. * Action Input: Request Query * Action Result: Redirects shopper to provided uri.",
    ).optional(),
    removeFacetAction: z.object({
      attributeNames: z.array(z.string()).describe(
        "The attribute names (i.e. facet keys) to remove from the dynamic facets (if present in the request). There can't be more 3 attribute names. Each attribute name should be a valid attribute name, be non-empty and contain at most 80 characters.",
      ).optional(),
    }).describe(
      'Removes an attribute/facet in the request if is present. * Rule Condition: Must specify non-empty Condition.query_terms (for search only) or Condition.page_categories (for browse only), but can\'t specify both. * Action Input: attribute name * Action Result: Will remove the attribute (as a facet) from the request if it is present. Example: Suppose the query is "shoes", the Condition.query_terms is "shoes" and the attribute name "size", then facet key "size" will be removed from the request (if it is present).',
    ).optional(),
    replacementAction: z.object({
      queryTerms: z.array(z.string()).describe(
        "Terms from the search query. Will be replaced by replacement term. Can specify up to 100 terms.",
      ).optional(),
      replacementTerm: z.string().describe(
        "Term that will be used for replacement.",
      ).optional(),
      term: z.string().describe("Will be [deprecated = true] post migration;")
        .optional(),
    }).describe(
      'Replaces a term in the query. Multiple replacement candidates can be specified. All `query_terms` will be replaced with the replacement term. Example: Replace "gShoe" with "google shoe".',
    ).optional(),
    twowaySynonymsAction: z.object({
      synonyms: z.array(z.string()).describe(
        "Defines a set of synonyms. Can specify up to 100 synonyms. Must specify at least 2 synonyms.",
      ).optional(),
    }).describe(
      'Creates a set of terms that will be treated as synonyms of each other. Example: synonyms of "sneakers" and "shoes": * "sneakers" will use a synonym of "shoes". * "shoes" will use a synonym of "sneakers".',
    ).optional(),
  }).describe(
    "A rule is a condition-action pair * A condition defines when a rule is to be triggered. * An action specifies what occurs on that trigger. Currently rules only work for controls with SOLUTION_TYPE_SEARCH.",
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
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Vertex AI Search for commerce Catalogs.Controls. Registered at `@swamp/gcp/retail/catalogs-controls`. */
export const model = {
  type: "@swamp/gcp/retail/catalogs-controls",
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
      toVersion: "2026.05.18.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        if (g["controlId"] !== undefined) body["controlId"] = g["controlId"];
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
      description: "Get a controls",
      arguments: z.object({
        identifier: z.string().describe("The name of the controls"),
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
      description: "Update controls attributes",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["rule"] !== undefined) body["rule"] = g["rule"];
        if (g["searchSolutionUseCase"] !== undefined) {
          body["searchSolutionUseCase"] = g["searchSolutionUseCase"];
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
      description: "Delete the controls",
      arguments: z.object({
        identifier: z.string().describe("The name of the controls"),
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
      description: "Sync controls state from GCP",
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
  },
};
