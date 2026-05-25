// Auto-generated extension model for @swamp/gcp/retail/catalogs-servingconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Vertex AI Search for commerce Catalogs.ServingConfigs.
 *
 * Configures metadata that is used to generate serving time results (e.g. search results or recommendation predictions).
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/servingConfigs/${shortName}`;
}

const BASE_URL = "https://retail.googleapis.com/";

const GET_CONFIG = {
  "id": "retail.projects.locations.catalogs.servingConfigs.get",
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
  "id": "retail.projects.locations.catalogs.servingConfigs.create",
  "path": "v2/{+parent}/servingConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "servingConfigId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "retail.projects.locations.catalogs.servingConfigs.patch",
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
  "id": "retail.projects.locations.catalogs.servingConfigs.delete",
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
  "id": "retail.projects.locations.catalogs.servingConfigs.list",
  "path": "v2/{+parent}/servingConfigs",
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
  boostControlIds: z.array(z.string()).describe(
    "Condition boost specifications. If a product matches multiple conditions in the specifications, boost scores from these specifications are all applied and combined in a non-linear way. Maximum number of specifications is 100. Notice that if both ServingConfig.boost_control_ids and SearchRequest.boost_spec are set, the boost conditions from both places are evaluated. If a search request matches multiple boost conditions, the final boost score is equal to the sum of the boost scores from all matched boost conditions. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The human readable serving config display name. Used in Retail UI. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  diversityLevel: z.string().describe(
    "How much diversity to use in recommendation model results e.g. `medium-diversity` or `high-diversity`. Currently supported values: * `no-diversity` * `low-diversity` * `medium-diversity` * `high-diversity` * `auto-diversity` If not specified, we choose default based on recommendation model type. Default value: `no-diversity`. Can only be set if solution_types is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  diversityType: z.enum([
    "DIVERSITY_TYPE_UNSPECIFIED",
    "RULE_BASED_DIVERSITY",
    "DATA_DRIVEN_DIVERSITY",
  ]).describe(
    "What kind of diversity to use - data driven or rule based. If unset, the server behavior defaults to RULE_BASED_DIVERSITY.",
  ).optional(),
  doNotAssociateControlIds: z.array(z.string()).describe(
    "Condition do not associate specifications. If multiple do not associate conditions match, all matching do not associate controls in the list will execute. - Order does not matter. - Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  dynamicFacetSpec: z.object({
    mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "ENABLED"]).describe(
      "Mode of the DynamicFacet feature. Defaults to Mode.DISABLED if it's unset.",
    ).optional(),
  }).describe("The specifications of dynamically generated facets.").optional(),
  enableCategoryFilterLevel: z.string().describe(
    "Whether to add additional category filters on the `similar-items` model. If not specified, we enable it by default. Allowed values are: * `no-category-match`: No additional filtering of original results from the model and the customer's filters. * `relaxed-category-match`: Only keep results with categories that match at least one item categories in the PredictRequests's context item. * If customer also sends filters in the PredictRequest, then the results will satisfy both conditions (user given and category match). Can only be set if solution_types is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  facetControlIds: z.array(z.string()).describe(
    "Facet specifications for faceted search. If empty, no facets are returned. The ids refer to the ids of Control resources with only the Facet control set. These controls are assumed to be in the same Catalog as the ServingConfig. A maximum of 100 values are allowed. Otherwise, an INVALID_ARGUMENT error is returned. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  filterControlIds: z.array(z.string()).describe(
    "Condition filter specifications. If a product matches multiple conditions in the specifications, filters from these specifications are all applied and combined via the AND operator. Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  ignoreControlIds: z.array(z.string()).describe(
    "Condition ignore specifications. If multiple ignore conditions match, all matching ignore controls in the list will execute. - Order does not matter. - Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  ignoreRecsDenylist: z.boolean().describe(
    "When the flag is enabled, the products in the denylist will not be filtered out in the recommendation filtering results.",
  ).optional(),
  modelId: z.string().describe(
    "The id of the model in the same Catalog to use at serving time. Currently only RecommendationModels are supported: https://cloud.google.com/retail/recommendations-ai/docs/create-models Can be changed but only to a compatible model (e.g. others-you-may-like CTR to others-you-may-like CVR). Required when solution_types is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/*/locations/global/catalogs/*/servingConfig/*`",
  ).optional(),
  onewaySynonymsControlIds: z.array(z.string()).describe(
    "Condition oneway synonyms specifications. If multiple oneway synonyms conditions match, all matching oneway synonyms controls in the list will execute. Order of controls in the list will not matter. Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  personalizationSpec: z.object({
    mode: z.enum(["MODE_UNSPECIFIED", "AUTO", "DISABLED"]).describe(
      "Defaults to Mode.AUTO.",
    ).optional(),
  }).describe("The specification for personalization.").optional(),
  priceRerankingLevel: z.string().describe(
    "How much price ranking we want in serving results. Price reranking causes product items with a similar recommendation probability to be ordered by price, with the highest-priced items first. This setting could result in a decrease in click-through and conversion rates. Allowed values are: * `no-price-reranking` * `low-price-reranking` * `medium-price-reranking` * `high-price-reranking` If not specified, we choose default based on model type. Default value: `no-price-reranking`. Can only be set if solution_types is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  redirectControlIds: z.array(z.string()).describe(
    "Condition redirect specifications. Only the first triggered redirect action is applied, even if multiple apply. Maximum number of specifications is 1000. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  replacementControlIds: z.array(z.string()).describe(
    "Condition replacement specifications. - Applied according to the order in the list. - A previously replaced term can not be re-replaced. - Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  solutionTypes: z.array(
    z.enum([
      "SOLUTION_TYPE_UNSPECIFIED",
      "SOLUTION_TYPE_RECOMMENDATION",
      "SOLUTION_TYPE_SEARCH",
    ]),
  ).describe(
    "Required. Immutable. Specifies the solution types that a serving config can be associated with. Currently we support setting only one type of solution.",
  ).optional(),
  twowaySynonymsControlIds: z.array(z.string()).describe(
    "Condition synonyms specifications. If multiple syonyms conditions match, all matching synonyms control in the list will execute. Order of controls in the list will not matter. Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  servingConfigId: z.string().describe(
    "Required. The ID to use for the ServingConfig, which will become the final component of the ServingConfig's resource name. This value should be 4-63 characters, and valid characters are /a-z-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  boostControlIds: z.array(z.string()).optional(),
  displayName: z.string().optional(),
  diversityLevel: z.string().optional(),
  diversityType: z.string().optional(),
  doNotAssociateControlIds: z.array(z.string()).optional(),
  dynamicFacetSpec: z.object({
    mode: z.string(),
  }).optional(),
  enableCategoryFilterLevel: z.string().optional(),
  facetControlIds: z.array(z.string()).optional(),
  filterControlIds: z.array(z.string()).optional(),
  ignoreControlIds: z.array(z.string()).optional(),
  ignoreRecsDenylist: z.boolean().optional(),
  modelId: z.string().optional(),
  name: z.string(),
  onewaySynonymsControlIds: z.array(z.string()).optional(),
  personalizationSpec: z.object({
    mode: z.string(),
  }).optional(),
  priceRerankingLevel: z.string().optional(),
  redirectControlIds: z.array(z.string()).optional(),
  replacementControlIds: z.array(z.string()).optional(),
  solutionTypes: z.array(z.string()).optional(),
  twowaySynonymsControlIds: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  boostControlIds: z.array(z.string()).describe(
    "Condition boost specifications. If a product matches multiple conditions in the specifications, boost scores from these specifications are all applied and combined in a non-linear way. Maximum number of specifications is 100. Notice that if both ServingConfig.boost_control_ids and SearchRequest.boost_spec are set, the boost conditions from both places are evaluated. If a search request matches multiple boost conditions, the final boost score is equal to the sum of the boost scores from all matched boost conditions. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The human readable serving config display name. Used in Retail UI. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned.",
  ).optional(),
  diversityLevel: z.string().describe(
    "How much diversity to use in recommendation model results e.g. `medium-diversity` or `high-diversity`. Currently supported values: * `no-diversity` * `low-diversity` * `medium-diversity` * `high-diversity` * `auto-diversity` If not specified, we choose default based on recommendation model type. Default value: `no-diversity`. Can only be set if solution_types is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  diversityType: z.enum([
    "DIVERSITY_TYPE_UNSPECIFIED",
    "RULE_BASED_DIVERSITY",
    "DATA_DRIVEN_DIVERSITY",
  ]).describe(
    "What kind of diversity to use - data driven or rule based. If unset, the server behavior defaults to RULE_BASED_DIVERSITY.",
  ).optional(),
  doNotAssociateControlIds: z.array(z.string()).describe(
    "Condition do not associate specifications. If multiple do not associate conditions match, all matching do not associate controls in the list will execute. - Order does not matter. - Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  dynamicFacetSpec: z.object({
    mode: z.enum(["MODE_UNSPECIFIED", "DISABLED", "ENABLED"]).describe(
      "Mode of the DynamicFacet feature. Defaults to Mode.DISABLED if it's unset.",
    ).optional(),
  }).describe("The specifications of dynamically generated facets.").optional(),
  enableCategoryFilterLevel: z.string().describe(
    "Whether to add additional category filters on the `similar-items` model. If not specified, we enable it by default. Allowed values are: * `no-category-match`: No additional filtering of original results from the model and the customer's filters. * `relaxed-category-match`: Only keep results with categories that match at least one item categories in the PredictRequests's context item. * If customer also sends filters in the PredictRequest, then the results will satisfy both conditions (user given and category match). Can only be set if solution_types is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  facetControlIds: z.array(z.string()).describe(
    "Facet specifications for faceted search. If empty, no facets are returned. The ids refer to the ids of Control resources with only the Facet control set. These controls are assumed to be in the same Catalog as the ServingConfig. A maximum of 100 values are allowed. Otherwise, an INVALID_ARGUMENT error is returned. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  filterControlIds: z.array(z.string()).describe(
    "Condition filter specifications. If a product matches multiple conditions in the specifications, filters from these specifications are all applied and combined via the AND operator. Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  ignoreControlIds: z.array(z.string()).describe(
    "Condition ignore specifications. If multiple ignore conditions match, all matching ignore controls in the list will execute. - Order does not matter. - Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  ignoreRecsDenylist: z.boolean().describe(
    "When the flag is enabled, the products in the denylist will not be filtered out in the recommendation filtering results.",
  ).optional(),
  modelId: z.string().describe(
    "The id of the model in the same Catalog to use at serving time. Currently only RecommendationModels are supported: https://cloud.google.com/retail/recommendations-ai/docs/create-models Can be changed but only to a compatible model (e.g. others-you-may-like CTR to others-you-may-like CVR). Required when solution_types is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Fully qualified name `projects/*/locations/global/catalogs/*/servingConfig/*`",
  ).optional(),
  onewaySynonymsControlIds: z.array(z.string()).describe(
    "Condition oneway synonyms specifications. If multiple oneway synonyms conditions match, all matching oneway synonyms controls in the list will execute. Order of controls in the list will not matter. Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  personalizationSpec: z.object({
    mode: z.enum(["MODE_UNSPECIFIED", "AUTO", "DISABLED"]).describe(
      "Defaults to Mode.AUTO.",
    ).optional(),
  }).describe("The specification for personalization.").optional(),
  priceRerankingLevel: z.string().describe(
    "How much price ranking we want in serving results. Price reranking causes product items with a similar recommendation probability to be ordered by price, with the highest-priced items first. This setting could result in a decrease in click-through and conversion rates. Allowed values are: * `no-price-reranking` * `low-price-reranking` * `medium-price-reranking` * `high-price-reranking` If not specified, we choose default based on model type. Default value: `no-price-reranking`. Can only be set if solution_types is SOLUTION_TYPE_RECOMMENDATION.",
  ).optional(),
  redirectControlIds: z.array(z.string()).describe(
    "Condition redirect specifications. Only the first triggered redirect action is applied, even if multiple apply. Maximum number of specifications is 1000. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  replacementControlIds: z.array(z.string()).describe(
    "Condition replacement specifications. - Applied according to the order in the list. - A previously replaced term can not be re-replaced. - Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  solutionTypes: z.array(
    z.enum([
      "SOLUTION_TYPE_UNSPECIFIED",
      "SOLUTION_TYPE_RECOMMENDATION",
      "SOLUTION_TYPE_SEARCH",
    ]),
  ).describe(
    "Required. Immutable. Specifies the solution types that a serving config can be associated with. Currently we support setting only one type of solution.",
  ).optional(),
  twowaySynonymsControlIds: z.array(z.string()).describe(
    "Condition synonyms specifications. If multiple syonyms conditions match, all matching synonyms control in the list will execute. Order of controls in the list will not matter. Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH.",
  ).optional(),
  servingConfigId: z.string().describe(
    "Required. The ID to use for the ServingConfig, which will become the final component of the ServingConfig's resource name. This value should be 4-63 characters, and valid characters are /a-z-_/.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Vertex AI Search for commerce Catalogs.ServingConfigs. Registered at `@swamp/gcp/retail/catalogs-servingconfigs`. */
export const model = {
  type: "@swamp/gcp/retail/catalogs-servingconfigs",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Configures metadata that is used to generate serving time results (e.g. searc...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a servingConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["boostControlIds"] !== undefined) {
          body["boostControlIds"] = g["boostControlIds"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["diversityLevel"] !== undefined) {
          body["diversityLevel"] = g["diversityLevel"];
        }
        if (g["diversityType"] !== undefined) {
          body["diversityType"] = g["diversityType"];
        }
        if (g["doNotAssociateControlIds"] !== undefined) {
          body["doNotAssociateControlIds"] = g["doNotAssociateControlIds"];
        }
        if (g["dynamicFacetSpec"] !== undefined) {
          body["dynamicFacetSpec"] = g["dynamicFacetSpec"];
        }
        if (g["enableCategoryFilterLevel"] !== undefined) {
          body["enableCategoryFilterLevel"] = g["enableCategoryFilterLevel"];
        }
        if (g["facetControlIds"] !== undefined) {
          body["facetControlIds"] = g["facetControlIds"];
        }
        if (g["filterControlIds"] !== undefined) {
          body["filterControlIds"] = g["filterControlIds"];
        }
        if (g["ignoreControlIds"] !== undefined) {
          body["ignoreControlIds"] = g["ignoreControlIds"];
        }
        if (g["ignoreRecsDenylist"] !== undefined) {
          body["ignoreRecsDenylist"] = g["ignoreRecsDenylist"];
        }
        if (g["modelId"] !== undefined) body["modelId"] = g["modelId"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["onewaySynonymsControlIds"] !== undefined) {
          body["onewaySynonymsControlIds"] = g["onewaySynonymsControlIds"];
        }
        if (g["personalizationSpec"] !== undefined) {
          body["personalizationSpec"] = g["personalizationSpec"];
        }
        if (g["priceRerankingLevel"] !== undefined) {
          body["priceRerankingLevel"] = g["priceRerankingLevel"];
        }
        if (g["redirectControlIds"] !== undefined) {
          body["redirectControlIds"] = g["redirectControlIds"];
        }
        if (g["replacementControlIds"] !== undefined) {
          body["replacementControlIds"] = g["replacementControlIds"];
        }
        if (g["solutionTypes"] !== undefined) {
          body["solutionTypes"] = g["solutionTypes"];
        }
        if (g["twowaySynonymsControlIds"] !== undefined) {
          body["twowaySynonymsControlIds"] = g["twowaySynonymsControlIds"];
        }
        if (g["servingConfigId"] !== undefined) {
          body["servingConfigId"] = g["servingConfigId"];
        }
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
      description: "Get a servingConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the servingConfigs"),
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
      description: "Update servingConfigs attributes",
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
        if (g["boostControlIds"] !== undefined) {
          body["boostControlIds"] = g["boostControlIds"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["diversityLevel"] !== undefined) {
          body["diversityLevel"] = g["diversityLevel"];
        }
        if (g["diversityType"] !== undefined) {
          body["diversityType"] = g["diversityType"];
        }
        if (g["doNotAssociateControlIds"] !== undefined) {
          body["doNotAssociateControlIds"] = g["doNotAssociateControlIds"];
        }
        if (g["dynamicFacetSpec"] !== undefined) {
          body["dynamicFacetSpec"] = g["dynamicFacetSpec"];
        }
        if (g["enableCategoryFilterLevel"] !== undefined) {
          body["enableCategoryFilterLevel"] = g["enableCategoryFilterLevel"];
        }
        if (g["facetControlIds"] !== undefined) {
          body["facetControlIds"] = g["facetControlIds"];
        }
        if (g["filterControlIds"] !== undefined) {
          body["filterControlIds"] = g["filterControlIds"];
        }
        if (g["ignoreControlIds"] !== undefined) {
          body["ignoreControlIds"] = g["ignoreControlIds"];
        }
        if (g["ignoreRecsDenylist"] !== undefined) {
          body["ignoreRecsDenylist"] = g["ignoreRecsDenylist"];
        }
        if (g["modelId"] !== undefined) body["modelId"] = g["modelId"];
        if (g["onewaySynonymsControlIds"] !== undefined) {
          body["onewaySynonymsControlIds"] = g["onewaySynonymsControlIds"];
        }
        if (g["personalizationSpec"] !== undefined) {
          body["personalizationSpec"] = g["personalizationSpec"];
        }
        if (g["priceRerankingLevel"] !== undefined) {
          body["priceRerankingLevel"] = g["priceRerankingLevel"];
        }
        if (g["redirectControlIds"] !== undefined) {
          body["redirectControlIds"] = g["redirectControlIds"];
        }
        if (g["replacementControlIds"] !== undefined) {
          body["replacementControlIds"] = g["replacementControlIds"];
        }
        if (g["twowaySynonymsControlIds"] !== undefined) {
          body["twowaySynonymsControlIds"] = g["twowaySynonymsControlIds"];
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
      description: "Delete the servingConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the servingConfigs"),
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
      description: "Sync servingConfigs state from GCP",
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
    list: {
      description: "List servingConfigs resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Optional. Maximum number of results to return. If unspecified, defaults to 100. If a value greater than 100 is provided, at most 100 results are returned.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "servingConfigs",
          (args.maxPages as number | undefined) ?? 10,
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
    add_control: {
      description: "add control",
      arguments: z.object({
        controlId: z.any().optional(),
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
        params["servingConfig"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["controlId"] !== undefined) {
          body["controlId"] = args["controlId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "retail.projects.locations.catalogs.servingConfigs.addControl",
            "path": "v2/{+servingConfig}:addControl",
            "httpMethod": "POST",
            "parameterOrder": ["servingConfig"],
            "parameters": {
              "servingConfig": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    conversational_search: {
      description: "conversational search",
      arguments: z.object({
        branch: z.any().optional(),
        conversationId: z.any().optional(),
        conversationalFilteringSpec: z.any().optional(),
        pageCategories: z.any().optional(),
        query: z.any().optional(),
        safetySettings: z.any().optional(),
        searchParams: z.any().optional(),
        userInfo: z.any().optional(),
        userLabels: z.any().optional(),
        visitorId: z.any().optional(),
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
        params["placement"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["branch"] !== undefined) body["branch"] = args["branch"];
        if (args["conversationId"] !== undefined) {
          body["conversationId"] = args["conversationId"];
        }
        if (args["conversationalFilteringSpec"] !== undefined) {
          body["conversationalFilteringSpec"] =
            args["conversationalFilteringSpec"];
        }
        if (args["pageCategories"] !== undefined) {
          body["pageCategories"] = args["pageCategories"];
        }
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["safetySettings"] !== undefined) {
          body["safetySettings"] = args["safetySettings"];
        }
        if (args["searchParams"] !== undefined) {
          body["searchParams"] = args["searchParams"];
        }
        if (args["userInfo"] !== undefined) body["userInfo"] = args["userInfo"];
        if (args["userLabels"] !== undefined) {
          body["userLabels"] = args["userLabels"];
        }
        if (args["visitorId"] !== undefined) {
          body["visitorId"] = args["visitorId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "retail.projects.locations.catalogs.servingConfigs.conversationalSearch",
            "path": "v2/{+placement}:conversationalSearch",
            "httpMethod": "POST",
            "parameterOrder": ["placement"],
            "parameters": {
              "placement": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    predict: {
      description: "predict",
      arguments: z.object({
        filter: z.any().optional(),
        labels: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        params: z.any().optional(),
        userEvent: z.any().optional(),
        validateOnly: z.any().optional(),
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
        params["placement"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["userEvent"] !== undefined) {
          body["userEvent"] = args["userEvent"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.servingConfigs.predict",
            "path": "v2/{+placement}:predict",
            "httpMethod": "POST",
            "parameterOrder": ["placement"],
            "parameters": {
              "placement": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    search: {
      description: "search",
      arguments: z.object({
        boostSpec: z.any().optional(),
        branch: z.any().optional(),
        canonicalFilter: z.any().optional(),
        conversationalSearchSpec: z.any().optional(),
        dynamicFacetSpec: z.any().optional(),
        entity: z.any().optional(),
        facetSpecs: z.any().optional(),
        filter: z.any().optional(),
        labels: z.any().optional(),
        languageCode: z.any().optional(),
        offset: z.any().optional(),
        orderBy: z.any().optional(),
        pageCategories: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
        personalizationSpec: z.any().optional(),
        placeId: z.any().optional(),
        query: z.any().optional(),
        queryExpansionSpec: z.any().optional(),
        regionCode: z.any().optional(),
        searchMode: z.any().optional(),
        spellCorrectionSpec: z.any().optional(),
        tileNavigationSpec: z.any().optional(),
        userAttributes: z.any().optional(),
        userInfo: z.any().optional(),
        variantRollupKeys: z.any().optional(),
        visitorId: z.any().optional(),
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
        params["placement"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["boostSpec"] !== undefined) {
          body["boostSpec"] = args["boostSpec"];
        }
        if (args["branch"] !== undefined) body["branch"] = args["branch"];
        if (args["canonicalFilter"] !== undefined) {
          body["canonicalFilter"] = args["canonicalFilter"];
        }
        if (args["conversationalSearchSpec"] !== undefined) {
          body["conversationalSearchSpec"] = args["conversationalSearchSpec"];
        }
        if (args["dynamicFacetSpec"] !== undefined) {
          body["dynamicFacetSpec"] = args["dynamicFacetSpec"];
        }
        if (args["entity"] !== undefined) body["entity"] = args["entity"];
        if (args["facetSpecs"] !== undefined) {
          body["facetSpecs"] = args["facetSpecs"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["languageCode"] !== undefined) {
          body["languageCode"] = args["languageCode"];
        }
        if (args["offset"] !== undefined) body["offset"] = args["offset"];
        if (args["orderBy"] !== undefined) body["orderBy"] = args["orderBy"];
        if (args["pageCategories"] !== undefined) {
          body["pageCategories"] = args["pageCategories"];
        }
        if (args["pageSize"] !== undefined) body["pageSize"] = args["pageSize"];
        if (args["pageToken"] !== undefined) {
          body["pageToken"] = args["pageToken"];
        }
        if (args["personalizationSpec"] !== undefined) {
          body["personalizationSpec"] = args["personalizationSpec"];
        }
        if (args["placeId"] !== undefined) body["placeId"] = args["placeId"];
        if (args["query"] !== undefined) body["query"] = args["query"];
        if (args["queryExpansionSpec"] !== undefined) {
          body["queryExpansionSpec"] = args["queryExpansionSpec"];
        }
        if (args["regionCode"] !== undefined) {
          body["regionCode"] = args["regionCode"];
        }
        if (args["searchMode"] !== undefined) {
          body["searchMode"] = args["searchMode"];
        }
        if (args["spellCorrectionSpec"] !== undefined) {
          body["spellCorrectionSpec"] = args["spellCorrectionSpec"];
        }
        if (args["tileNavigationSpec"] !== undefined) {
          body["tileNavigationSpec"] = args["tileNavigationSpec"];
        }
        if (args["userAttributes"] !== undefined) {
          body["userAttributes"] = args["userAttributes"];
        }
        if (args["userInfo"] !== undefined) body["userInfo"] = args["userInfo"];
        if (args["variantRollupKeys"] !== undefined) {
          body["variantRollupKeys"] = args["variantRollupKeys"];
        }
        if (args["visitorId"] !== undefined) {
          body["visitorId"] = args["visitorId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "retail.projects.locations.catalogs.servingConfigs.search",
            "path": "v2/{+placement}:search",
            "httpMethod": "POST",
            "parameterOrder": ["placement"],
            "parameters": {
              "placement": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
