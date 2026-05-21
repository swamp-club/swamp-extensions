// Auto-generated extension model for @swamp/gcp/recommendationengine/catalogs-catalogitems
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Recommendations AI (Beta) Catalogs.CatalogItems.
 *
 * CatalogItem captures all metadata information of items to be recommended.
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
  return `${parent}/catalogItems/${shortName}`;
}

const BASE_URL = "https://recommendationengine.googleapis.com/";

const GET_CONFIG = {
  "id": "recommendationengine.projects.locations.catalogs.catalogItems.get",
  "path": "v1beta1/{+name}",
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
  "id": "recommendationengine.projects.locations.catalogs.catalogItems.create",
  "path": "v1beta1/{+parent}/catalogItems",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "recommendationengine.projects.locations.catalogs.catalogItems.patch",
  "path": "v1beta1/{+name}",
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
  "id": "recommendationengine.projects.locations.catalogs.catalogItems.delete",
  "path": "v1beta1/{+name}",
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
  "id": "recommendationengine.projects.locations.catalogs.catalogItems.list",
  "path": "v1beta1/{+parent}/catalogItems",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  categoryHierarchies: z.array(z.object({
    categories: z.array(z.string()).describe(
      "Required. Catalog item categories. Each category should be a UTF-8 encoded string with a length limit of 2 KiB. Note that the order in the list denotes the specificity (from least to most specific).",
    ).optional(),
  })).describe(
    'Required. Catalog item categories. This field is repeated for supporting one catalog item belonging to several parallel category hierarchies. For example, if a shoes product belongs to both ["Shoes & Accessories" -> "Shoes"] and ["Sports & Fitness" -> "Athletic Clothing" -> "Shoes"], it could be represented as: "categoryHierarchies": [ { "categories": ["Shoes & Accessories", "Shoes"]}, { "categories": ["Sports & Fitness", "Athletic Clothing", "Shoes"] } ]',
  ).optional(),
  description: z.string().describe(
    "Optional. Catalog item description. UTF-8 encoded string with a length limit of 5 KiB.",
  ).optional(),
  id: z.string().describe(
    "Required. Catalog item identifier. UTF-8 encoded string with a length limit of 128 bytes. This id must be unique among all catalog items within the same catalog. It should also be used when logging user events in order for the user events to be joined with the Catalog.",
  ).optional(),
  itemAttributes: z.object({
    categoricalFeatures: z.record(
      z.string(),
      z.object({
        value: z.array(z.string()).describe(
          "String feature value with a length limit of 128 bytes.",
        ).optional(),
      }),
    ).describe(
      'Categorical features that can take on one of a limited number of possible values. Some examples would be the brand/maker of a product, or country of a customer. Feature names and values must be UTF-8 encoded strings. For example: `{ "colors": {"value": ["yellow", "green"]}, "sizes": {"value":["S", "M"]}`',
    ).optional(),
    numericalFeatures: z.record(
      z.string(),
      z.object({
        value: z.array(z.number()).describe("Float feature value.").optional(),
      }),
    ).describe(
      'Numerical features. Some examples would be the height/weight of a product, or age of a customer. Feature names must be UTF-8 encoded strings. For example: `{ "lengths_cm": {"value":[2.3, 15.4]}, "heights_cm": {"value":[8.1, 6.4]} }`',
    ).optional(),
  }).describe(
    "FeatureMap represents extra features that customers want to include in the recommendation model for catalogs/user events as categorical/numerical features.",
  ).optional(),
  itemGroupId: z.string().describe(
    "Optional. Variant group identifier for prediction results. UTF-8 encoded string with a length limit of 128 bytes. This field must be enabled before it can be used. [Learn more](/recommendations-ai/docs/catalog#item-group-id).",
  ).optional(),
  languageCode: z.string().describe(
    "Optional. Deprecated. The model automatically detects the text language. Your catalog can include text in different languages, but duplicating catalog items to provide text in multiple languages can result in degraded model performance.",
  ).optional(),
  productMetadata: z.object({
    availableQuantity: z.string().describe(
      "Optional. The available quantity of the item.",
    ).optional(),
    canonicalProductUri: z.string().describe(
      "Optional. Canonical URL directly linking to the item detail page with a length limit of 5 KiB..",
    ).optional(),
    costs: z.record(z.string(), z.number()).describe(
      "Optional. A map to pass the costs associated with the product. For example: {\"manufacturing\": 45.5} The profit of selling this item is computed like so: * If 'exactPrice' is provided, profit = displayPrice - sum(costs) * If 'priceRange' is provided, profit = minPrice - sum(costs)",
    ).optional(),
    currencyCode: z.string().describe(
      "Optional. Only required if the price is set. Currency code for price/costs. Use three-character ISO-4217 code.",
    ).optional(),
    exactPrice: z.object({
      displayPrice: z.number().describe(
        "Optional. Display price of the product.",
      ).optional(),
      originalPrice: z.number().describe(
        "Optional. Price of the product without any discount. If zero, by default set to be the 'displayPrice'.",
      ).optional(),
    }).describe("Exact product price.").optional(),
    images: z.array(z.object({
      height: z.number().int().describe(
        "Optional. Height of the image in number of pixels.",
      ).optional(),
      uri: z.string().describe(
        "Required. URL of the image with a length limit of 5 KiB.",
      ).optional(),
      width: z.number().int().describe(
        "Optional. Width of the image in number of pixels.",
      ).optional(),
    })).describe("Optional. Product images for the catalog item.").optional(),
    priceRange: z.object({
      max: z.number().describe("Required. The maximum product price.")
        .optional(),
      min: z.number().describe("Required. The minimum product price.")
        .optional(),
    }).describe(
      "Product price range when there are a range of prices for different variations of the same product.",
    ).optional(),
    stockState: z.enum([
      "STOCK_STATE_UNSPECIFIED",
      "IN_STOCK",
      "OUT_OF_STOCK",
      "PREORDER",
      "BACKORDER",
    ]).describe(
      "Optional. Online stock state of the catalog item. Default is `IN_STOCK`.",
    ).optional(),
  }).describe(
    "ProductCatalogItem captures item metadata specific to retail products.",
  ).optional(),
  tags: z.array(z.string()).describe(
    "Optional. Filtering tags associated with the catalog item. Each tag should be a UTF-8 encoded string with a length limit of 1 KiB. This tag can be used for filtering recommendation results by passing the tag as part of the predict request filter.",
  ).optional(),
  title: z.string().describe(
    "Required. Catalog item title. UTF-8 encoded string with a length limit of 1 KiB.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  categoryHierarchies: z.array(z.object({
    categories: z.array(z.string()),
  })).optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  itemAttributes: z.object({
    categoricalFeatures: z.record(z.string(), z.unknown()),
    numericalFeatures: z.record(z.string(), z.unknown()),
  }).optional(),
  itemGroupId: z.string().optional(),
  languageCode: z.string().optional(),
  productMetadata: z.object({
    availableQuantity: z.string(),
    canonicalProductUri: z.string(),
    costs: z.record(z.string(), z.unknown()),
    currencyCode: z.string(),
    exactPrice: z.object({
      displayPrice: z.number(),
      originalPrice: z.number(),
    }),
    images: z.array(z.object({
      height: z.number(),
      uri: z.string(),
      width: z.number(),
    })),
    priceRange: z.object({
      max: z.number(),
      min: z.number(),
    }),
    stockState: z.string(),
  }).optional(),
  tags: z.array(z.string()).optional(),
  title: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  categoryHierarchies: z.array(z.object({
    categories: z.array(z.string()).describe(
      "Required. Catalog item categories. Each category should be a UTF-8 encoded string with a length limit of 2 KiB. Note that the order in the list denotes the specificity (from least to most specific).",
    ).optional(),
  })).describe(
    'Required. Catalog item categories. This field is repeated for supporting one catalog item belonging to several parallel category hierarchies. For example, if a shoes product belongs to both ["Shoes & Accessories" -> "Shoes"] and ["Sports & Fitness" -> "Athletic Clothing" -> "Shoes"], it could be represented as: "categoryHierarchies": [ { "categories": ["Shoes & Accessories", "Shoes"]}, { "categories": ["Sports & Fitness", "Athletic Clothing", "Shoes"] } ]',
  ).optional(),
  description: z.string().describe(
    "Optional. Catalog item description. UTF-8 encoded string with a length limit of 5 KiB.",
  ).optional(),
  id: z.string().describe(
    "Required. Catalog item identifier. UTF-8 encoded string with a length limit of 128 bytes. This id must be unique among all catalog items within the same catalog. It should also be used when logging user events in order for the user events to be joined with the Catalog.",
  ).optional(),
  itemAttributes: z.object({
    categoricalFeatures: z.record(
      z.string(),
      z.object({
        value: z.array(z.string()).describe(
          "String feature value with a length limit of 128 bytes.",
        ).optional(),
      }),
    ).describe(
      'Categorical features that can take on one of a limited number of possible values. Some examples would be the brand/maker of a product, or country of a customer. Feature names and values must be UTF-8 encoded strings. For example: `{ "colors": {"value": ["yellow", "green"]}, "sizes": {"value":["S", "M"]}`',
    ).optional(),
    numericalFeatures: z.record(
      z.string(),
      z.object({
        value: z.array(z.number()).describe("Float feature value.").optional(),
      }),
    ).describe(
      'Numerical features. Some examples would be the height/weight of a product, or age of a customer. Feature names must be UTF-8 encoded strings. For example: `{ "lengths_cm": {"value":[2.3, 15.4]}, "heights_cm": {"value":[8.1, 6.4]} }`',
    ).optional(),
  }).describe(
    "FeatureMap represents extra features that customers want to include in the recommendation model for catalogs/user events as categorical/numerical features.",
  ).optional(),
  itemGroupId: z.string().describe(
    "Optional. Variant group identifier for prediction results. UTF-8 encoded string with a length limit of 128 bytes. This field must be enabled before it can be used. [Learn more](/recommendations-ai/docs/catalog#item-group-id).",
  ).optional(),
  languageCode: z.string().describe(
    "Optional. Deprecated. The model automatically detects the text language. Your catalog can include text in different languages, but duplicating catalog items to provide text in multiple languages can result in degraded model performance.",
  ).optional(),
  productMetadata: z.object({
    availableQuantity: z.string().describe(
      "Optional. The available quantity of the item.",
    ).optional(),
    canonicalProductUri: z.string().describe(
      "Optional. Canonical URL directly linking to the item detail page with a length limit of 5 KiB..",
    ).optional(),
    costs: z.record(z.string(), z.number()).describe(
      "Optional. A map to pass the costs associated with the product. For example: {\"manufacturing\": 45.5} The profit of selling this item is computed like so: * If 'exactPrice' is provided, profit = displayPrice - sum(costs) * If 'priceRange' is provided, profit = minPrice - sum(costs)",
    ).optional(),
    currencyCode: z.string().describe(
      "Optional. Only required if the price is set. Currency code for price/costs. Use three-character ISO-4217 code.",
    ).optional(),
    exactPrice: z.object({
      displayPrice: z.number().describe(
        "Optional. Display price of the product.",
      ).optional(),
      originalPrice: z.number().describe(
        "Optional. Price of the product without any discount. If zero, by default set to be the 'displayPrice'.",
      ).optional(),
    }).describe("Exact product price.").optional(),
    images: z.array(z.object({
      height: z.number().int().describe(
        "Optional. Height of the image in number of pixels.",
      ).optional(),
      uri: z.string().describe(
        "Required. URL of the image with a length limit of 5 KiB.",
      ).optional(),
      width: z.number().int().describe(
        "Optional. Width of the image in number of pixels.",
      ).optional(),
    })).describe("Optional. Product images for the catalog item.").optional(),
    priceRange: z.object({
      max: z.number().describe("Required. The maximum product price.")
        .optional(),
      min: z.number().describe("Required. The minimum product price.")
        .optional(),
    }).describe(
      "Product price range when there are a range of prices for different variations of the same product.",
    ).optional(),
    stockState: z.enum([
      "STOCK_STATE_UNSPECIFIED",
      "IN_STOCK",
      "OUT_OF_STOCK",
      "PREORDER",
      "BACKORDER",
    ]).describe(
      "Optional. Online stock state of the catalog item. Default is `IN_STOCK`.",
    ).optional(),
  }).describe(
    "ProductCatalogItem captures item metadata specific to retail products.",
  ).optional(),
  tags: z.array(z.string()).describe(
    "Optional. Filtering tags associated with the catalog item. Each tag should be a UTF-8 encoded string with a length limit of 1 KiB. This tag can be used for filtering recommendation results by passing the tag as part of the predict request filter.",
  ).optional(),
  title: z.string().describe(
    "Required. Catalog item title. UTF-8 encoded string with a length limit of 1 KiB.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Recommendations AI (Beta) Catalogs.CatalogItems. Registered at `@swamp/gcp/recommendationengine/catalogs-catalogitems`. */
export const model = {
  type: "@swamp/gcp/recommendationengine/catalogs-catalogitems",
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
      description:
        "Removed: type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.03.2",
      description:
        "Removed: type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.03.3",
      description:
        "Removed: type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.04.23.1",
      description:
        "Removed: type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.18.1",
      description:
        "Removed: type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.19.1",
      description:
        "Removed: type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.19.2",
      description:
        "Removed: type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.21.1",
      description:
        "Removed: type, version, upgrades, globalArguments, inputsSchema, resources, methods",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          type: _type,
          version: _version,
          upgrades: _upgrades,
          globalArguments: _globalArguments,
          inputsSchema: _inputsSchema,
          resources: _resources,
          methods: _methods,
          ...rest
        } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "CatalogItem captures all metadata information of items to be recommended.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a catalogItems",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["categoryHierarchies"] !== undefined) {
          body["categoryHierarchies"] = g["categoryHierarchies"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["itemAttributes"] !== undefined) {
          body["itemAttributes"] = g["itemAttributes"];
        }
        if (g["itemGroupId"] !== undefined) {
          body["itemGroupId"] = g["itemGroupId"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["productMetadata"] !== undefined) {
          body["productMetadata"] = g["productMetadata"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["title"] !== undefined) body["title"] = g["title"];
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
      description: "Get a catalogItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the catalogItems"),
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
      description: "Update catalogItems attributes",
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
        if (g["categoryHierarchies"] !== undefined) {
          body["categoryHierarchies"] = g["categoryHierarchies"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["itemAttributes"] !== undefined) {
          body["itemAttributes"] = g["itemAttributes"];
        }
        if (g["itemGroupId"] !== undefined) {
          body["itemGroupId"] = g["itemGroupId"];
        }
        if (g["languageCode"] !== undefined) {
          body["languageCode"] = g["languageCode"];
        }
        if (g["productMetadata"] !== undefined) {
          body["productMetadata"] = g["productMetadata"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["title"] !== undefined) body["title"] = g["title"];
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
      description: "Delete the catalogItems",
      arguments: z.object({
        identifier: z.string().describe("The name of the catalogItems"),
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
      description: "Sync catalogItems state from GCP",
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
    import: {
      description: "import",
      arguments: z.object({
        errorsConfig: z.any().optional(),
        inputConfig: z.any().optional(),
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
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "recommendationengine.projects.locations.catalogs.catalogItems.import",
            "path": "v1beta1/{+parent}/catalogItems:import",
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
  },
};
