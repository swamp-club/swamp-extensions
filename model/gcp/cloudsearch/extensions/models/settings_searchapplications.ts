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

// Auto-generated extension model for @swamp/gcp/cloudsearch/settings-searchapplications
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Search Settings.Searchapplications.
 *
 * SearchApplication
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

const BASE_URL = "https://cloudsearch.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudsearch.settings.searchapplications.get",
  "path": "v1/settings/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "debugOptions.enableDebugging": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "cloudsearch.settings.searchapplications.create",
  "path": "v1/settings/searchapplications",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "cloudsearch.settings.searchapplications.update",
  "path": "v1/settings/{+name}",
  "httpMethod": "PUT",
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
  "id": "cloudsearch.settings.searchapplications.delete",
  "path": "v1/settings/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "debugOptions.enableDebugging": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "cloudsearch.settings.searchapplications.list",
  "path": "v1/settings/searchapplications",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "debugOptions.enableDebugging": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/cloud_search",
  "https://www.googleapis.com/auth/cloud_search.debug",
  "https://www.googleapis.com/auth/cloud_search.indexing",
  "https://www.googleapis.com/auth/cloud_search.query",
  "https://www.googleapis.com/auth/cloud_search.settings",
  "https://www.googleapis.com/auth/cloud_search.settings.indexing",
  "https://www.googleapis.com/auth/cloud_search.settings.query",
  "https://www.googleapis.com/auth/cloud_search.stats",
  "https://www.googleapis.com/auth/cloud_search.stats.indexing",
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
  dataSourceRestrictions: z.array(z.object({
    filterOptions: z.array(z.object({
      filter: z.object({
        compositeFilter: z.unknown().optional(),
        valueFilter: z.unknown().optional(),
      }).describe(
        "Generic filter to restrict the search, such as `lang:en`, `site:xyz`.",
      ).optional(),
      objectType: z.string().describe(
        "If object_type is set, only objects of that type are returned. This should correspond to the name of the object that was registered within the definition of schema. The maximum length is 256 characters.",
      ).optional(),
    })).describe(
      'Filter options restricting the results. If multiple filters are present, they are grouped by object type before joining. Filters with the same object type are joined conjunctively, then the resulting expressions are joined disjunctively. The maximum number of elements is 20. NOTE: Suggest API supports only few filters at the moment: "objecttype", "type" and "mimetype". For now, schema specific filters cannot be used to filter suggestions.',
    ).optional(),
    source: z.object({
      name: z.string().describe(
        "Source name for content indexed by the Indexing API.",
      ).optional(),
      predefinedSource: z.enum([
        "NONE",
        "QUERY_HISTORY",
        "PERSON",
        "GOOGLE_DRIVE",
        "GOOGLE_GMAIL",
        "GOOGLE_SITES",
        "GOOGLE_GROUPS",
        "GOOGLE_CALENDAR",
        "GOOGLE_KEEP",
      ]).describe("Predefined content source for Google Apps.").optional(),
    }).describe("The source of restriction.").optional(),
  })).describe(
    "Retrictions applied to the configurations. The maximum number of elements is 10.",
  ).optional(),
  defaultFacetOptions: z.array(z.object({
    integerFacetingOptions: z.object({
      integerBuckets: z.array(z.string()).describe(
        "Buckets for given integer values should be in strictly ascending order. For example, if values supplied are (1,5,10,100), the following facet buckets will be formed {=100}.",
      ).optional(),
    }).describe(
      "If set, describes integer faceting options for the given integer property. The corresponding integer property in the schema should be marked isFacetable. The number of buckets returned would be minimum of this and num_facet_buckets.",
    ).optional(),
    numFacetBuckets: z.number().int().describe(
      "Maximum number of facet buckets that should be returned for this facet. Defaults to 10. Maximum value is 100.",
    ).optional(),
    objectType: z.string().describe(
      "If object_type is set, only those objects of that type will be used to compute facets. If empty, then all objects will be used to compute facets.",
    ).optional(),
    operatorName: z.string().describe(
      "The name of the operator chosen for faceting. @see cloudsearch.SchemaPropertyOptions",
    ).optional(),
    sourceName: z.string().describe(
      "Source name to facet on. Format: datasources/{source_id} If empty, all data sources will be used.",
    ).optional(),
  })).describe(
    "The default fields for returning facet results. The sources specified here also have been included in data_source_restrictions above.",
  ).optional(),
  defaultSortOptions: z.object({
    operatorName: z.string().describe(
      "The name of the operator corresponding to the field to sort on. The corresponding property must be marked as sortable.",
    ).optional(),
    sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
      "Ascending is the default sort order",
    ).optional(),
  }).describe("The default options for sorting the search results").optional(),
  displayName: z.string().describe(
    "Display name of the Search Application. The maximum length is 300 characters.",
  ).optional(),
  enableAuditLog: z.boolean().describe(
    "Indicates whether audit logging is on/off for requests made for the search application in query APIs.",
  ).optional(),
  name: z.string().describe(
    "The name of the Search Application. Format: searchapplications/{application_id}.",
  ).optional(),
  queryInterpretationConfig: z.object({
    forceDisableSupplementalResults: z.boolean().describe(
      "Set this flag to disable supplemental results retrieval, setting a flag here will not retrieve supplemental results for queries associated with a given search application. If this flag is set to True, it will take precedence over the option set at Query level. For the default value of False, query level flag will set the correct interpretation for supplemental results.",
    ).optional(),
    forceVerbatimMode: z.boolean().describe(
      "Enable this flag to turn off all internal optimizations like natural language (NL) interpretation of queries, supplemental results retrieval, and usage of synonyms including custom ones. If this flag is set to True, it will take precedence over the option set at Query level. For the default value of False, query level flag will set the correct interpretation for verbatim mode.",
    ).optional(),
  }).describe("The default options for query interpretation").optional(),
  returnResultThumbnailUrls: z.boolean().describe(
    "With each result we should return the URI for its thumbnail (when applicable)",
  ).optional(),
  scoringConfig: z.object({
    disableFreshness: z.boolean().describe(
      "Whether to use freshness as a ranking signal. By default, freshness is used as a ranking signal. Note that this setting is not available in the Admin UI.",
    ).optional(),
    disablePersonalization: z.boolean().describe(
      "Whether to personalize the results. By default, personal signals will be used to boost results.",
    ).optional(),
  }).describe("Configuration for ranking results.").optional(),
  sourceConfig: z.array(z.object({
    crowdingConfig: z.object({
      numResults: z.number().int().describe(
        "Maximum number of results allowed from a datasource in a result page as long as results from other sources are not exhausted. Value specified must not be negative. A default value is used if this value is equal to 0. To disable crowding, set the value greater than 100.",
      ).optional(),
      numSuggestions: z.number().int().describe(
        "Maximum number of suggestions allowed from a source. No limits will be set on results if this value is less than or equal to 0.",
      ).optional(),
    }).describe("The crowding configuration for the source.").optional(),
    scoringConfig: z.object({
      sourceImportance: z.enum(["DEFAULT", "LOW", "HIGH"]).describe(
        "Importance of the source.",
      ).optional(),
    }).describe("The scoring configuration for the source.").optional(),
    source: z.object({
      name: z.string().describe(
        "Source name for content indexed by the Indexing API.",
      ).optional(),
      predefinedSource: z.enum([
        "NONE",
        "QUERY_HISTORY",
        "PERSON",
        "GOOGLE_DRIVE",
        "GOOGLE_GMAIL",
        "GOOGLE_SITES",
        "GOOGLE_GROUPS",
        "GOOGLE_CALENDAR",
        "GOOGLE_KEEP",
      ]).describe("Predefined content source for Google Apps.").optional(),
    }).describe("The source for which this configuration is to be used.")
      .optional(),
  })).describe(
    "Configuration for a sources specified in data_source_restrictions.",
  ).optional(),
});

const StateSchema = z.object({
  dataSourceRestrictions: z.array(z.object({
    filterOptions: z.array(z.object({
      filter: z.object({
        compositeFilter: z.unknown(),
        valueFilter: z.unknown(),
      }),
      objectType: z.string(),
    })),
    source: z.object({
      name: z.string(),
      predefinedSource: z.string(),
    }),
  })).optional(),
  defaultFacetOptions: z.array(z.object({
    integerFacetingOptions: z.object({
      integerBuckets: z.array(z.string()),
    }),
    numFacetBuckets: z.number(),
    objectType: z.string(),
    operatorName: z.string(),
    sourceName: z.string(),
  })).optional(),
  defaultSortOptions: z.object({
    operatorName: z.string(),
    sortOrder: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  enableAuditLog: z.boolean().optional(),
  name: z.string(),
  operationIds: z.array(z.string()).optional(),
  queryInterpretationConfig: z.object({
    forceDisableSupplementalResults: z.boolean(),
    forceVerbatimMode: z.boolean(),
  }).optional(),
  returnResultThumbnailUrls: z.boolean().optional(),
  scoringConfig: z.object({
    disableFreshness: z.boolean(),
    disablePersonalization: z.boolean(),
  }).optional(),
  sourceConfig: z.array(z.object({
    crowdingConfig: z.object({
      numResults: z.number(),
      numSuggestions: z.number(),
    }),
    scoringConfig: z.object({
      sourceImportance: z.string(),
    }),
    source: z.object({
      name: z.string(),
      predefinedSource: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  dataSourceRestrictions: z.array(z.object({
    filterOptions: z.array(z.object({
      filter: z.object({
        compositeFilter: z.unknown().optional(),
        valueFilter: z.unknown().optional(),
      }).describe(
        "Generic filter to restrict the search, such as `lang:en`, `site:xyz`.",
      ).optional(),
      objectType: z.string().describe(
        "If object_type is set, only objects of that type are returned. This should correspond to the name of the object that was registered within the definition of schema. The maximum length is 256 characters.",
      ).optional(),
    })).describe(
      'Filter options restricting the results. If multiple filters are present, they are grouped by object type before joining. Filters with the same object type are joined conjunctively, then the resulting expressions are joined disjunctively. The maximum number of elements is 20. NOTE: Suggest API supports only few filters at the moment: "objecttype", "type" and "mimetype". For now, schema specific filters cannot be used to filter suggestions.',
    ).optional(),
    source: z.object({
      name: z.string().describe(
        "Source name for content indexed by the Indexing API.",
      ).optional(),
      predefinedSource: z.enum([
        "NONE",
        "QUERY_HISTORY",
        "PERSON",
        "GOOGLE_DRIVE",
        "GOOGLE_GMAIL",
        "GOOGLE_SITES",
        "GOOGLE_GROUPS",
        "GOOGLE_CALENDAR",
        "GOOGLE_KEEP",
      ]).describe("Predefined content source for Google Apps.").optional(),
    }).describe("The source of restriction.").optional(),
  })).describe(
    "Retrictions applied to the configurations. The maximum number of elements is 10.",
  ).optional(),
  defaultFacetOptions: z.array(z.object({
    integerFacetingOptions: z.object({
      integerBuckets: z.array(z.string()).describe(
        "Buckets for given integer values should be in strictly ascending order. For example, if values supplied are (1,5,10,100), the following facet buckets will be formed {=100}.",
      ).optional(),
    }).describe(
      "If set, describes integer faceting options for the given integer property. The corresponding integer property in the schema should be marked isFacetable. The number of buckets returned would be minimum of this and num_facet_buckets.",
    ).optional(),
    numFacetBuckets: z.number().int().describe(
      "Maximum number of facet buckets that should be returned for this facet. Defaults to 10. Maximum value is 100.",
    ).optional(),
    objectType: z.string().describe(
      "If object_type is set, only those objects of that type will be used to compute facets. If empty, then all objects will be used to compute facets.",
    ).optional(),
    operatorName: z.string().describe(
      "The name of the operator chosen for faceting. @see cloudsearch.SchemaPropertyOptions",
    ).optional(),
    sourceName: z.string().describe(
      "Source name to facet on. Format: datasources/{source_id} If empty, all data sources will be used.",
    ).optional(),
  })).describe(
    "The default fields for returning facet results. The sources specified here also have been included in data_source_restrictions above.",
  ).optional(),
  defaultSortOptions: z.object({
    operatorName: z.string().describe(
      "The name of the operator corresponding to the field to sort on. The corresponding property must be marked as sortable.",
    ).optional(),
    sortOrder: z.enum(["ASCENDING", "DESCENDING"]).describe(
      "Ascending is the default sort order",
    ).optional(),
  }).describe("The default options for sorting the search results").optional(),
  displayName: z.string().describe(
    "Display name of the Search Application. The maximum length is 300 characters.",
  ).optional(),
  enableAuditLog: z.boolean().describe(
    "Indicates whether audit logging is on/off for requests made for the search application in query APIs.",
  ).optional(),
  name: z.string().describe(
    "The name of the Search Application. Format: searchapplications/{application_id}.",
  ).optional(),
  queryInterpretationConfig: z.object({
    forceDisableSupplementalResults: z.boolean().describe(
      "Set this flag to disable supplemental results retrieval, setting a flag here will not retrieve supplemental results for queries associated with a given search application. If this flag is set to True, it will take precedence over the option set at Query level. For the default value of False, query level flag will set the correct interpretation for supplemental results.",
    ).optional(),
    forceVerbatimMode: z.boolean().describe(
      "Enable this flag to turn off all internal optimizations like natural language (NL) interpretation of queries, supplemental results retrieval, and usage of synonyms including custom ones. If this flag is set to True, it will take precedence over the option set at Query level. For the default value of False, query level flag will set the correct interpretation for verbatim mode.",
    ).optional(),
  }).describe("The default options for query interpretation").optional(),
  returnResultThumbnailUrls: z.boolean().describe(
    "With each result we should return the URI for its thumbnail (when applicable)",
  ).optional(),
  scoringConfig: z.object({
    disableFreshness: z.boolean().describe(
      "Whether to use freshness as a ranking signal. By default, freshness is used as a ranking signal. Note that this setting is not available in the Admin UI.",
    ).optional(),
    disablePersonalization: z.boolean().describe(
      "Whether to personalize the results. By default, personal signals will be used to boost results.",
    ).optional(),
  }).describe("Configuration for ranking results.").optional(),
  sourceConfig: z.array(z.object({
    crowdingConfig: z.object({
      numResults: z.number().int().describe(
        "Maximum number of results allowed from a datasource in a result page as long as results from other sources are not exhausted. Value specified must not be negative. A default value is used if this value is equal to 0. To disable crowding, set the value greater than 100.",
      ).optional(),
      numSuggestions: z.number().int().describe(
        "Maximum number of suggestions allowed from a source. No limits will be set on results if this value is less than or equal to 0.",
      ).optional(),
    }).describe("The crowding configuration for the source.").optional(),
    scoringConfig: z.object({
      sourceImportance: z.enum(["DEFAULT", "LOW", "HIGH"]).describe(
        "Importance of the source.",
      ).optional(),
    }).describe("The scoring configuration for the source.").optional(),
    source: z.object({
      name: z.string().describe(
        "Source name for content indexed by the Indexing API.",
      ).optional(),
      predefinedSource: z.enum([
        "NONE",
        "QUERY_HISTORY",
        "PERSON",
        "GOOGLE_DRIVE",
        "GOOGLE_GMAIL",
        "GOOGLE_SITES",
        "GOOGLE_GROUPS",
        "GOOGLE_CALENDAR",
        "GOOGLE_KEEP",
      ]).describe("Predefined content source for Google Apps.").optional(),
    }).describe("The source for which this configuration is to be used.")
      .optional(),
  })).describe(
    "Configuration for a sources specified in data_source_restrictions.",
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

/** Swamp extension model for Google Cloud Search Settings.Searchapplications. Registered at `@swamp/gcp/cloudsearch/settings-searchapplications`. */
export const model = {
  type: "@swamp/gcp/cloudsearch/settings-searchapplications",
  version: "2026.10.06.1",
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
      toVersion: "2026.05.25.2",
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
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SearchApplication",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a searchapplications",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["dataSourceRestrictions"] !== undefined) {
          body["dataSourceRestrictions"] = g["dataSourceRestrictions"];
        }
        if (g["defaultFacetOptions"] !== undefined) {
          body["defaultFacetOptions"] = g["defaultFacetOptions"];
        }
        if (g["defaultSortOptions"] !== undefined) {
          body["defaultSortOptions"] = g["defaultSortOptions"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableAuditLog"] !== undefined) {
          body["enableAuditLog"] = g["enableAuditLog"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["queryInterpretationConfig"] !== undefined) {
          body["queryInterpretationConfig"] = g["queryInterpretationConfig"];
        }
        if (g["returnResultThumbnailUrls"] !== undefined) {
          body["returnResultThumbnailUrls"] = g["returnResultThumbnailUrls"];
        }
        if (g["scoringConfig"] !== undefined) {
          body["scoringConfig"] = g["scoringConfig"];
        }
        if (g["sourceConfig"] !== undefined) {
          body["sourceConfig"] = g["sourceConfig"];
        }
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
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
      description: "Get a searchapplications",
      arguments: z.object({
        identifier: z.string().describe("The name of the searchapplications"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Update searchapplications attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific searchapplications by name (e.g. one discovered by list)",
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
        const resourceId = existing["name"]?.toString() ??
          g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["name"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["dataSourceRestrictions"] !== undefined) {
          body["dataSourceRestrictions"] = g["dataSourceRestrictions"];
        }
        if (g["defaultFacetOptions"] !== undefined) {
          body["defaultFacetOptions"] = g["defaultFacetOptions"];
        }
        if (g["defaultSortOptions"] !== undefined) {
          body["defaultSortOptions"] = g["defaultSortOptions"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["enableAuditLog"] !== undefined) {
          body["enableAuditLog"] = g["enableAuditLog"];
        }
        if (g["queryInterpretationConfig"] !== undefined) {
          body["queryInterpretationConfig"] = g["queryInterpretationConfig"];
        }
        if (g["returnResultThumbnailUrls"] !== undefined) {
          body["returnResultThumbnailUrls"] = g["returnResultThumbnailUrls"];
        }
        if (g["scoringConfig"] !== undefined) {
          body["scoringConfig"] = g["scoringConfig"];
        }
        if (g["sourceConfig"] !== undefined) {
          body["sourceConfig"] = g["sourceConfig"];
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
      description: "Delete the searchapplications",
      arguments: z.object({
        identifier: z.string().describe("The name of the searchapplications"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
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
      description: "Sync searchapplications state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific searchapplications by name (e.g. one discovered by list)",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
      description: "List searchapplications resources",
      arguments: z.object({
        debugOptions_enableDebugging: z.boolean().describe(
          "If you are asked by Google to help with debugging, set this field. Otherwise, ignore this field.",
        ).optional(),
        pageSize: z.number().describe("The maximum number of items to return.")
          .optional(),
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
        if (args["debugOptions_enableDebugging"] !== undefined) {
          params["debugOptions.enableDebugging"] = String(
            args["debugOptions_enableDebugging"],
          );
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "searchApplications",
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
    reset: {
      description: "reset",
      arguments: z.object({
        debugOptions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["debugOptions"] !== undefined) {
          body["debugOptions"] = args["debugOptions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "cloudsearch.settings.searchapplications.reset",
            "path": "v1/settings/{+name}:reset",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
