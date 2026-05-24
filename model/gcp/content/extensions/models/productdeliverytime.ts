// Auto-generated extension model for @swamp/gcp/content/productdeliverytime
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Productdeliverytime.
 *
 * The estimated days to deliver a product after an order is placed. Only authorized shipping signals partners working with a merchant can use this resource. Merchants should use the [`products`](https://developers.google.com/shopping-content/reference/rest/v2.1/products#productshipping) resource instead.
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

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.productdeliverytime.get",
  "path": "{merchantId}/productdeliverytime/{productId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
    "productId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "content.productdeliverytime.create",
  "path": "{merchantId}/productdeliverytime",
  "httpMethod": "POST",
  "parameterOrder": [
    "merchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "content.productdeliverytime.delete",
  "path": "{merchantId}/productdeliverytime/{productId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "merchantId",
    "productId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  areaDeliveryTimes: z.array(z.object({
    deliveryArea: z.object({
      countryCode: z.string().describe(
        "Required. The country that the product can be delivered to. Submit a [unicode CLDR region](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) such as `US` or `CH`.",
      ).optional(),
      postalCodeRange: z.object({
        firstPostalCode: z.string().describe(
          'Required. A postal code or a pattern of the form prefix* denoting the inclusive lower bound of the range defining the area. Examples values: `"94108"`, `"9410*"`, `"9*"`.',
        ).optional(),
        lastPostalCode: z.string().describe(
          "A postal code or a pattern of the form prefix* denoting the inclusive upper bound of the range defining the area (for example [070* - 078*] results in the range [07000 - 07899]). It must have the same length as `firstPostalCode`: if `firstPostalCode` is a postal code then `lastPostalCode` must be a postal code too; if firstPostalCode is a pattern then `lastPostalCode` must be a pattern with the same prefix length. Ignored if not set, then the area is defined as being all the postal codes matching `firstPostalCode`.",
        ).optional(),
      }).describe(
        "A range of postal codes that defines the delivery area. Only set `firstPostalCode` when specifying a single postal code.",
      ).optional(),
      regionCode: z.string().describe(
        'A state, territory, or prefecture. This is supported for the United States, Australia, and Japan. Provide a subdivision code from the ISO 3166-2 code tables ([US](https://en.wikipedia.org/wiki/ISO_3166-2:US), [AU](https://en.wikipedia.org/wiki/ISO_3166-2:AU), or [JP](https://en.wikipedia.org/wiki/ISO_3166-2:JP)) without country prefix (for example, `"NY"`, `"NSW"`, `"03"`).',
      ).optional(),
    }).describe(
      "A delivery area for the product. Only one of `countryCode` or `postalCodeRange` must be set.",
    ).optional(),
    deliveryTime: z.object({
      maxHandlingTimeDays: z.number().int().describe(
        "Required. The maximum number of business days (inclusive) between when an order is placed and when the product ships. If a product ships in the same day, set this value to 0.",
      ).optional(),
      maxTransitTimeDays: z.number().int().describe(
        "Required. The maximum number of business days (inclusive) between when the product ships and when the product is delivered.",
      ).optional(),
      minHandlingTimeDays: z.number().int().describe(
        "Required. The minimum number of business days (inclusive) between when an order is placed and when the product ships. If a product ships in the same day, set this value to 0.",
      ).optional(),
      minTransitTimeDays: z.number().int().describe(
        "Required. The minimum number of business days (inclusive) between when the product ships and when the product is delivered.",
      ).optional(),
    }).describe("A delivery time for this product.").optional(),
  })).describe(
    "Required. A set of associations between `DeliveryArea` and `DeliveryTime` entries. The total number of `areaDeliveryTimes` can be at most 100.",
  ).optional(),
  productId: z.object({
    productId: z.string().describe(
      "The Content API ID of the product, in the form `channel:contentLanguage:targetCountry:offerId`.",
    ).optional(),
  }).describe("The Content API ID of the product.").optional(),
  merchantId: z.string().describe(
    "The Google merchant ID of the account that contains the product. This account cannot be a multi-client account.",
  ),
});

const StateSchema = z.object({
  areaDeliveryTimes: z.array(z.object({
    deliveryArea: z.object({
      countryCode: z.string(),
      postalCodeRange: z.object({
        firstPostalCode: z.string(),
        lastPostalCode: z.string(),
      }),
      regionCode: z.string(),
    }),
    deliveryTime: z.object({
      maxHandlingTimeDays: z.number(),
      maxTransitTimeDays: z.number(),
      minHandlingTimeDays: z.number(),
      minTransitTimeDays: z.number(),
    }),
  })).optional(),
  productId: z.object({
    productId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  areaDeliveryTimes: z.array(z.object({
    deliveryArea: z.object({
      countryCode: z.string().describe(
        "Required. The country that the product can be delivered to. Submit a [unicode CLDR region](http://www.unicode.org/repos/cldr/tags/latest/common/main/en.xml) such as `US` or `CH`.",
      ).optional(),
      postalCodeRange: z.object({
        firstPostalCode: z.string().describe(
          'Required. A postal code or a pattern of the form prefix* denoting the inclusive lower bound of the range defining the area. Examples values: `"94108"`, `"9410*"`, `"9*"`.',
        ).optional(),
        lastPostalCode: z.string().describe(
          "A postal code or a pattern of the form prefix* denoting the inclusive upper bound of the range defining the area (for example [070* - 078*] results in the range [07000 - 07899]). It must have the same length as `firstPostalCode`: if `firstPostalCode` is a postal code then `lastPostalCode` must be a postal code too; if firstPostalCode is a pattern then `lastPostalCode` must be a pattern with the same prefix length. Ignored if not set, then the area is defined as being all the postal codes matching `firstPostalCode`.",
        ).optional(),
      }).describe(
        "A range of postal codes that defines the delivery area. Only set `firstPostalCode` when specifying a single postal code.",
      ).optional(),
      regionCode: z.string().describe(
        'A state, territory, or prefecture. This is supported for the United States, Australia, and Japan. Provide a subdivision code from the ISO 3166-2 code tables ([US](https://en.wikipedia.org/wiki/ISO_3166-2:US), [AU](https://en.wikipedia.org/wiki/ISO_3166-2:AU), or [JP](https://en.wikipedia.org/wiki/ISO_3166-2:JP)) without country prefix (for example, `"NY"`, `"NSW"`, `"03"`).',
      ).optional(),
    }).describe(
      "A delivery area for the product. Only one of `countryCode` or `postalCodeRange` must be set.",
    ).optional(),
    deliveryTime: z.object({
      maxHandlingTimeDays: z.number().int().describe(
        "Required. The maximum number of business days (inclusive) between when an order is placed and when the product ships. If a product ships in the same day, set this value to 0.",
      ).optional(),
      maxTransitTimeDays: z.number().int().describe(
        "Required. The maximum number of business days (inclusive) between when the product ships and when the product is delivered.",
      ).optional(),
      minHandlingTimeDays: z.number().int().describe(
        "Required. The minimum number of business days (inclusive) between when an order is placed and when the product ships. If a product ships in the same day, set this value to 0.",
      ).optional(),
      minTransitTimeDays: z.number().int().describe(
        "Required. The minimum number of business days (inclusive) between when the product ships and when the product is delivered.",
      ).optional(),
    }).describe("A delivery time for this product.").optional(),
  })).describe(
    "Required. A set of associations between `DeliveryArea` and `DeliveryTime` entries. The total number of `areaDeliveryTimes` can be at most 100.",
  ).optional(),
  productId: z.object({
    productId: z.string().describe(
      "The Content API ID of the product, in the form `channel:contentLanguage:targetCountry:offerId`.",
    ).optional(),
  }).describe("The Content API ID of the product.").optional(),
  merchantId: z.string().describe(
    "The Google merchant ID of the account that contains the product. This account cannot be a multi-client account.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Productdeliverytime. Registered at `@swamp/gcp/content/productdeliverytime`. */
export const model = {
  type: "@swamp/gcp/content/productdeliverytime",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The estimated days to deliver a product after an order is placed. Only author...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a productdeliverytime",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["areaDeliveryTimes"] !== undefined) {
          body["areaDeliveryTimes"] = g["areaDeliveryTimes"];
        }
        if (g["productId"] !== undefined) body["productId"] = g["productId"];
        if (g["name"] !== undefined) params["productId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a productdeliverytime",
      arguments: z.object({
        identifier: z.string().describe("The name of the productdeliverytime"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["productId"] = args.identifier;
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
    delete: {
      description: "Delete the productdeliverytime",
      arguments: z.object({
        identifier: z.string().describe("The name of the productdeliverytime"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        params["productId"] = args.identifier;
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
      description: "Sync productdeliverytime state from GCP",
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
          if (g["merchantId"] !== undefined) {
            params["merchantId"] = String(g["merchantId"]);
          } else if (existing["merchantId"]) {
            params["merchantId"] = String(existing["merchantId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["productId"] = identifier;
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
