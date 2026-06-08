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

// Auto-generated extension model for @swamp/gcp/discoveryengine/datastores-controls
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine DataStores.Controls.
 *
 * Defines a conditioned behavior to employ during serving. Must be attached to a ServingConfig to be considered at serving time. Permitted actions dependent on `SolutionType`.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/controls/${shortName}`;
}

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id": "discoveryengine.projects.locations.dataStores.controls.get",
  "path": "v1/{+name}",
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
  "id": "discoveryengine.projects.locations.dataStores.controls.create",
  "path": "v1/{+parent}/controls",
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
  "id": "discoveryengine.projects.locations.dataStores.controls.patch",
  "path": "v1/{+name}",
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
  "id": "discoveryengine.projects.locations.dataStores.controls.delete",
  "path": "v1/{+name}",
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
  "id": "discoveryengine.projects.locations.dataStores.controls.list",
  "path": "v1/{+parent}/controls",
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
  boostAction: z.object({
    boost: z.number().describe(
      "Strength of the boost, which should be in [-1, 1]. Negative boost means demotion. Default is 0.0 (No-op).",
    ).optional(),
    dataStore: z.string().describe(
      "Required. Specifies which data store's documents can be boosted by this control. Full data store name e.g. projects/123/locations/global/collections/default_collection/dataStores/default_data_store",
    ).optional(),
    filter: z.string().describe(
      "Required. Specifies which products to apply the boost to. If no filter is provided all products will be boosted (No-op). Syntax documentation: https://cloud.google.com/retail/docs/filter-and-order Maximum length is 5000 characters. Otherwise an INVALID ARGUMENT error is thrown.",
    ).optional(),
    fixedBoost: z.number().describe(
      "Optional. Strength of the boost, which should be in [-1, 1]. Negative boost means demotion. Default is 0.0 (No-op).",
    ).optional(),
    interpolationBoostSpec: z.object({
      attributeType: z.enum([
        "ATTRIBUTE_TYPE_UNSPECIFIED",
        "NUMERICAL",
        "FRESHNESS",
      ]).describe(
        "Optional. The attribute type to be used to determine the boost amount. The attribute value can be derived from the field value of the specified field_name. In the case of numerical it is straightforward i.e. attribute_value = numerical_field_value. In the case of freshness however, attribute_value = (time.now() - datetime_field_value).",
      ).optional(),
      controlPoints: z.array(z.object({
        attributeValue: z.string().describe(
          "Optional. Can be one of: 1. The numerical field value. 2. The duration spec for freshness: The value must be formatted as an XSD `dayTimeDuration` value (a restricted subset of an ISO 8601 duration value). The pattern for this is: `nDnM]`.",
        ).optional(),
        boostAmount: z.number().describe(
          "Optional. The value between -1 to 1 by which to boost the score if the attribute_value evaluates to the value specified above.",
        ).optional(),
      })).describe(
        "Optional. The control points used to define the curve. The monotonic function (defined through the interpolation_type above) passes through the control points listed here.",
      ).optional(),
      fieldName: z.string().describe(
        "Optional. The name of the field whose value will be used to determine the boost amount.",
      ).optional(),
      interpolationType: z.enum(["INTERPOLATION_TYPE_UNSPECIFIED", "LINEAR"])
        .describe(
          "Optional. The interpolation type to be applied to connect the control points listed below.",
        ).optional(),
    }).describe(
      "Specification for custom ranking based on customer specified attribute value. It provides more controls for customized ranking than the simple (condition, boost) combination above.",
    ).optional(),
  }).describe("Adjusts order of products in returned list.").optional(),
  conditions: z.array(z.object({
    activeTimeRange: z.array(z.object({
      endTime: z.string().describe(
        "End of time range. Range is inclusive. Must be in the future.",
      ).optional(),
      startTime: z.string().describe("Start of time range. Range is inclusive.")
        .optional(),
    })).describe(
      "Range of time(s) specifying when condition is active. Maximum of 10 time ranges.",
    ).optional(),
    queryRegex: z.string().describe(
      "Optional. Query regex to match the whole search query. Cannot be set when Condition.query_terms is set. Only supported for Basic Site Search promotion serving controls.",
    ).optional(),
    queryTerms: z.array(z.object({
      fullMatch: z.boolean().describe(
        "Whether the search query needs to exactly match the query term.",
      ).optional(),
      value: z.string().describe(
        "The specific query value to match against Must be lowercase, must be UTF-8. Can have at most 3 space separated terms if full_match is true. Cannot be an empty string. Maximum length of 5000 characters.",
      ).optional(),
    })).describe(
      "Search only A list of terms to match the query on. Cannot be set when Condition.query_regex is set. Maximum of 10 query terms.",
    ).optional(),
  })).describe(
    "Determines when the associated action will trigger. Omit to always apply the action. Currently only a single condition may be specified. Otherwise an INVALID ARGUMENT error is thrown.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Human readable name. The identifier used in UI views. Must be UTF-8 encoded string. Length limit is 128 characters. Otherwise an INVALID ARGUMENT error is thrown.",
  ).optional(),
  filterAction: z.object({
    dataStore: z.string().describe(
      "Required. Specifies which data store's documents can be filtered by this control. Full data store name e.g. projects/123/locations/global/collections/default_collection/dataStores/default_data_store",
    ).optional(),
    filter: z.string().describe(
      "Required. A filter to apply on the matching condition results. Required Syntax documentation: https://cloud.google.com/retail/docs/filter-and-order Maximum length is 5000 characters. Otherwise an INVALID ARGUMENT error is thrown.",
    ).optional(),
  }).describe(
    "Specified which products may be included in results. Uses same filter as boost.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/*/locations/global/dataStore/*/controls/*`",
  ).optional(),
  promoteAction: z.object({
    dataStore: z.string().describe(
      "Required. Data store with which this promotion is attached to.",
    ).optional(),
    searchLinkPromotion: z.object({
      description: z.string().describe(
        "Optional. The Promotion description. Maximum length: 200 characters.",
      ).optional(),
      document: z.string().describe(
        "Optional. The Document the user wants to promote. For site search, leave unset and only populate uri. Can be set along with uri.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. The enabled promotion will be returned for any serving configs associated with the parent of the control this promotion is attached to. This flag is used for basic site search only.",
      ).optional(),
      imageUri: z.string().describe(
        "Optional. The promotion thumbnail image url.",
      ).optional(),
      title: z.string().describe(
        "Required. The title of the promotion. Maximum length: 160 characters.",
      ).optional(),
      uri: z.string().describe(
        "Optional. The URL for the page the user wants to promote. Must be set for site search. For other verticals, this is optional.",
      ).optional(),
    }).describe(
      "Promotion proto includes uri and other helping information to display the promotion.",
    ).optional(),
  }).describe(
    "Promote certain links based on some trigger queries. Example: Promote shoe store link when searching for `shoe` keyword. The link can be outside of associated data store.",
  ).optional(),
  redirectAction: z.object({
    redirectUri: z.string().describe(
      "Required. The URI to which the shopper will be redirected. Required. URI must have length equal or less than 2000 characters. Otherwise an INVALID ARGUMENT error is thrown.",
    ).optional(),
  }).describe("Redirects a shopper to the provided URI.").optional(),
  solutionType: z.enum([
    "SOLUTION_TYPE_UNSPECIFIED",
    "SOLUTION_TYPE_RECOMMENDATION",
    "SOLUTION_TYPE_SEARCH",
    "SOLUTION_TYPE_CHAT",
    "SOLUTION_TYPE_GENERATIVE_CHAT",
    "SOLUTION_TYPE_AI_MODE",
  ]).describe(
    "Required. Immutable. What solution the control belongs to. Must be compatible with vertical of resource. Otherwise an INVALID ARGUMENT error is thrown.",
  ).optional(),
  synonymsAction: z.object({
    synonyms: z.array(z.string()).describe(
      "Defines a set of synonyms. Can specify up to 100 synonyms. Must specify at least 2 synonyms. Otherwise an INVALID ARGUMENT error is thrown.",
    ).optional(),
  }).describe(
    'Creates a set of terms that will act as synonyms of one another. Example: "happy" will also be considered as "glad", "glad" will also be considered as "happy".',
  ).optional(),
  useCases: z.array(
    z.enum([
      "SEARCH_USE_CASE_UNSPECIFIED",
      "SEARCH_USE_CASE_SEARCH",
      "SEARCH_USE_CASE_BROWSE",
    ]),
  ).describe(
    "Specifies the use case for the control. Affects what condition fields can be set. Only applies to SOLUTION_TYPE_SEARCH. Currently only allow one use case per control. Must be set when solution_type is SolutionType.SOLUTION_TYPE_SEARCH.",
  ).optional(),
  controlId: z.string().describe(
    "Required. The ID to use for the Control, which will become the final component of the Control's resource name. This value must be within 1-63 characters. Valid characters are /a-z-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  associatedServingConfigIds: z.array(z.string()).optional(),
  boostAction: z.object({
    boost: z.number(),
    dataStore: z.string(),
    filter: z.string(),
    fixedBoost: z.number(),
    interpolationBoostSpec: z.object({
      attributeType: z.string(),
      controlPoints: z.array(z.object({
        attributeValue: z.string(),
        boostAmount: z.number(),
      })),
      fieldName: z.string(),
      interpolationType: z.string(),
    }),
  }).optional(),
  conditions: z.array(z.object({
    activeTimeRange: z.array(z.object({
      endTime: z.string(),
      startTime: z.string(),
    })),
    queryRegex: z.string(),
    queryTerms: z.array(z.object({
      fullMatch: z.boolean(),
      value: z.string(),
    })),
  })).optional(),
  displayName: z.string().optional(),
  filterAction: z.object({
    dataStore: z.string(),
    filter: z.string(),
  }).optional(),
  name: z.string(),
  promoteAction: z.object({
    dataStore: z.string(),
    searchLinkPromotion: z.object({
      description: z.string(),
      document: z.string(),
      enabled: z.boolean(),
      imageUri: z.string(),
      title: z.string(),
      uri: z.string(),
    }),
  }).optional(),
  redirectAction: z.object({
    redirectUri: z.string(),
  }).optional(),
  solutionType: z.string().optional(),
  synonymsAction: z.object({
    synonyms: z.array(z.string()),
  }).optional(),
  useCases: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  boostAction: z.object({
    boost: z.number().describe(
      "Strength of the boost, which should be in [-1, 1]. Negative boost means demotion. Default is 0.0 (No-op).",
    ).optional(),
    dataStore: z.string().describe(
      "Required. Specifies which data store's documents can be boosted by this control. Full data store name e.g. projects/123/locations/global/collections/default_collection/dataStores/default_data_store",
    ).optional(),
    filter: z.string().describe(
      "Required. Specifies which products to apply the boost to. If no filter is provided all products will be boosted (No-op). Syntax documentation: https://cloud.google.com/retail/docs/filter-and-order Maximum length is 5000 characters. Otherwise an INVALID ARGUMENT error is thrown.",
    ).optional(),
    fixedBoost: z.number().describe(
      "Optional. Strength of the boost, which should be in [-1, 1]. Negative boost means demotion. Default is 0.0 (No-op).",
    ).optional(),
    interpolationBoostSpec: z.object({
      attributeType: z.enum([
        "ATTRIBUTE_TYPE_UNSPECIFIED",
        "NUMERICAL",
        "FRESHNESS",
      ]).describe(
        "Optional. The attribute type to be used to determine the boost amount. The attribute value can be derived from the field value of the specified field_name. In the case of numerical it is straightforward i.e. attribute_value = numerical_field_value. In the case of freshness however, attribute_value = (time.now() - datetime_field_value).",
      ).optional(),
      controlPoints: z.array(z.object({
        attributeValue: z.string().describe(
          "Optional. Can be one of: 1. The numerical field value. 2. The duration spec for freshness: The value must be formatted as an XSD `dayTimeDuration` value (a restricted subset of an ISO 8601 duration value). The pattern for this is: `nDnM]`.",
        ).optional(),
        boostAmount: z.number().describe(
          "Optional. The value between -1 to 1 by which to boost the score if the attribute_value evaluates to the value specified above.",
        ).optional(),
      })).describe(
        "Optional. The control points used to define the curve. The monotonic function (defined through the interpolation_type above) passes through the control points listed here.",
      ).optional(),
      fieldName: z.string().describe(
        "Optional. The name of the field whose value will be used to determine the boost amount.",
      ).optional(),
      interpolationType: z.enum(["INTERPOLATION_TYPE_UNSPECIFIED", "LINEAR"])
        .describe(
          "Optional. The interpolation type to be applied to connect the control points listed below.",
        ).optional(),
    }).describe(
      "Specification for custom ranking based on customer specified attribute value. It provides more controls for customized ranking than the simple (condition, boost) combination above.",
    ).optional(),
  }).describe("Adjusts order of products in returned list.").optional(),
  conditions: z.array(z.object({
    activeTimeRange: z.array(z.object({
      endTime: z.string().describe(
        "End of time range. Range is inclusive. Must be in the future.",
      ).optional(),
      startTime: z.string().describe("Start of time range. Range is inclusive.")
        .optional(),
    })).describe(
      "Range of time(s) specifying when condition is active. Maximum of 10 time ranges.",
    ).optional(),
    queryRegex: z.string().describe(
      "Optional. Query regex to match the whole search query. Cannot be set when Condition.query_terms is set. Only supported for Basic Site Search promotion serving controls.",
    ).optional(),
    queryTerms: z.array(z.object({
      fullMatch: z.boolean().describe(
        "Whether the search query needs to exactly match the query term.",
      ).optional(),
      value: z.string().describe(
        "The specific query value to match against Must be lowercase, must be UTF-8. Can have at most 3 space separated terms if full_match is true. Cannot be an empty string. Maximum length of 5000 characters.",
      ).optional(),
    })).describe(
      "Search only A list of terms to match the query on. Cannot be set when Condition.query_regex is set. Maximum of 10 query terms.",
    ).optional(),
  })).describe(
    "Determines when the associated action will trigger. Omit to always apply the action. Currently only a single condition may be specified. Otherwise an INVALID ARGUMENT error is thrown.",
  ).optional(),
  displayName: z.string().describe(
    "Required. Human readable name. The identifier used in UI views. Must be UTF-8 encoded string. Length limit is 128 characters. Otherwise an INVALID ARGUMENT error is thrown.",
  ).optional(),
  filterAction: z.object({
    dataStore: z.string().describe(
      "Required. Specifies which data store's documents can be filtered by this control. Full data store name e.g. projects/123/locations/global/collections/default_collection/dataStores/default_data_store",
    ).optional(),
    filter: z.string().describe(
      "Required. A filter to apply on the matching condition results. Required Syntax documentation: https://cloud.google.com/retail/docs/filter-and-order Maximum length is 5000 characters. Otherwise an INVALID ARGUMENT error is thrown.",
    ).optional(),
  }).describe(
    "Specified which products may be included in results. Uses same filter as boost.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/*/locations/global/dataStore/*/controls/*`",
  ).optional(),
  promoteAction: z.object({
    dataStore: z.string().describe(
      "Required. Data store with which this promotion is attached to.",
    ).optional(),
    searchLinkPromotion: z.object({
      description: z.string().describe(
        "Optional. The Promotion description. Maximum length: 200 characters.",
      ).optional(),
      document: z.string().describe(
        "Optional. The Document the user wants to promote. For site search, leave unset and only populate uri. Can be set along with uri.",
      ).optional(),
      enabled: z.boolean().describe(
        "Optional. The enabled promotion will be returned for any serving configs associated with the parent of the control this promotion is attached to. This flag is used for basic site search only.",
      ).optional(),
      imageUri: z.string().describe(
        "Optional. The promotion thumbnail image url.",
      ).optional(),
      title: z.string().describe(
        "Required. The title of the promotion. Maximum length: 160 characters.",
      ).optional(),
      uri: z.string().describe(
        "Optional. The URL for the page the user wants to promote. Must be set for site search. For other verticals, this is optional.",
      ).optional(),
    }).describe(
      "Promotion proto includes uri and other helping information to display the promotion.",
    ).optional(),
  }).describe(
    "Promote certain links based on some trigger queries. Example: Promote shoe store link when searching for `shoe` keyword. The link can be outside of associated data store.",
  ).optional(),
  redirectAction: z.object({
    redirectUri: z.string().describe(
      "Required. The URI to which the shopper will be redirected. Required. URI must have length equal or less than 2000 characters. Otherwise an INVALID ARGUMENT error is thrown.",
    ).optional(),
  }).describe("Redirects a shopper to the provided URI.").optional(),
  solutionType: z.enum([
    "SOLUTION_TYPE_UNSPECIFIED",
    "SOLUTION_TYPE_RECOMMENDATION",
    "SOLUTION_TYPE_SEARCH",
    "SOLUTION_TYPE_CHAT",
    "SOLUTION_TYPE_GENERATIVE_CHAT",
    "SOLUTION_TYPE_AI_MODE",
  ]).describe(
    "Required. Immutable. What solution the control belongs to. Must be compatible with vertical of resource. Otherwise an INVALID ARGUMENT error is thrown.",
  ).optional(),
  synonymsAction: z.object({
    synonyms: z.array(z.string()).describe(
      "Defines a set of synonyms. Can specify up to 100 synonyms. Must specify at least 2 synonyms. Otherwise an INVALID ARGUMENT error is thrown.",
    ).optional(),
  }).describe(
    'Creates a set of terms that will act as synonyms of one another. Example: "happy" will also be considered as "glad", "glad" will also be considered as "happy".',
  ).optional(),
  useCases: z.array(
    z.enum([
      "SEARCH_USE_CASE_UNSPECIFIED",
      "SEARCH_USE_CASE_SEARCH",
      "SEARCH_USE_CASE_BROWSE",
    ]),
  ).describe(
    "Specifies the use case for the control. Affects what condition fields can be set. Only applies to SOLUTION_TYPE_SEARCH. Currently only allow one use case per control. Must be set when solution_type is SolutionType.SOLUTION_TYPE_SEARCH.",
  ).optional(),
  controlId: z.string().describe(
    "Required. The ID to use for the Control, which will become the final component of the Control's resource name. This value must be within 1-63 characters. Valid characters are /a-z-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Discovery Engine DataStores.Controls. Registered at `@swamp/gcp/discoveryengine/datastores-controls`. */
export const model = {
  type: "@swamp/gcp/discoveryengine/datastores-controls",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Defines a conditioned behavior to employ during serving. Must be attached to ...",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["boostAction"] !== undefined) {
          body["boostAction"] = g["boostAction"];
        }
        if (g["conditions"] !== undefined) body["conditions"] = g["conditions"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["filterAction"] !== undefined) {
          body["filterAction"] = g["filterAction"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["promoteAction"] !== undefined) {
          body["promoteAction"] = g["promoteAction"];
        }
        if (g["redirectAction"] !== undefined) {
          body["redirectAction"] = g["redirectAction"];
        }
        if (g["solutionType"] !== undefined) {
          body["solutionType"] = g["solutionType"];
        }
        if (g["synonymsAction"] !== undefined) {
          body["synonymsAction"] = g["synonymsAction"];
        }
        if (g["useCases"] !== undefined) body["useCases"] = g["useCases"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["boostAction"] !== undefined) {
          body["boostAction"] = g["boostAction"];
        }
        if (g["conditions"] !== undefined) body["conditions"] = g["conditions"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["filterAction"] !== undefined) {
          body["filterAction"] = g["filterAction"];
        }
        if (g["promoteAction"] !== undefined) {
          body["promoteAction"] = g["promoteAction"];
        }
        if (g["redirectAction"] !== undefined) {
          body["redirectAction"] = g["redirectAction"];
        }
        if (g["synonymsAction"] !== undefined) {
          body["synonymsAction"] = g["synonymsAction"];
        }
        if (g["useCases"] !== undefined) body["useCases"] = g["useCases"];
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync controls state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List controls resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. A filter to apply on the list results. Supported features: * List all the products under the parent branch if filter is unset. Currently this field is unsupported.",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
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
