// Auto-generated extension model for @swamp/gcp/adexchangebuyer2/accounts-products
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Products.
 *
 * A product is a segment of inventory that a seller wants to sell. It is associated with certain terms and targeting information which helps the buyer know more about the inventory.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://adexchangebuyer.googleapis.com/";

const GET_CONFIG = {
  "id": "adexchangebuyer2.accounts.products.get",
  "path": "v2beta1/accounts/{accountId}/products/{productId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "productId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "adexchangebuyer2.accounts.products.list",
  "path": "v2beta1/accounts/{accountId}/products",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "filter": {
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  availableEndTime: z.string().optional(),
  availableStartTime: z.string().optional(),
  createTime: z.string().optional(),
  creatorContacts: z.array(z.object({
    email: z.string(),
    name: z.string(),
  })).optional(),
  displayName: z.string().optional(),
  hasCreatorSignedOff: z.boolean().optional(),
  productId: z.string().optional(),
  productRevision: z.string().optional(),
  publisherProfileId: z.string().optional(),
  seller: z.object({
    accountId: z.string(),
    subAccountId: z.string(),
  }).optional(),
  syndicationProduct: z.string().optional(),
  targetingCriterion: z.array(z.object({
    exclusions: z.array(z.object({
      creativeSizeValue: z.object({
        allowedFormats: z.unknown(),
        companionSizes: z.unknown(),
        creativeSizeType: z.unknown(),
        nativeTemplate: z.unknown(),
        size: z.unknown(),
        skippableAdType: z.unknown(),
      }),
      dayPartTargetingValue: z.object({
        dayParts: z.unknown(),
        timeZoneType: z.unknown(),
      }),
      longValue: z.string(),
      stringValue: z.string(),
    })),
    inclusions: z.array(z.object({
      creativeSizeValue: z.object({
        allowedFormats: z.unknown(),
        companionSizes: z.unknown(),
        creativeSizeType: z.unknown(),
        nativeTemplate: z.unknown(),
        size: z.unknown(),
        skippableAdType: z.unknown(),
      }),
      dayPartTargetingValue: z.object({
        dayParts: z.unknown(),
        timeZoneType: z.unknown(),
      }),
      longValue: z.string(),
      stringValue: z.string(),
    })),
    key: z.string(),
  })).optional(),
  terms: z.object({
    brandingType: z.string(),
    description: z.string(),
    estimatedGrossSpend: z.object({
      amount: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      pricingType: z.string(),
    }),
    estimatedImpressionsPerDay: z.string(),
    guaranteedFixedPriceTerms: z.object({
      fixedPrices: z.array(z.object({
        advertiserIds: z.array(z.unknown()),
        buyer: z.object({
          accountId: z.unknown(),
        }),
        price: z.object({
          amount: z.unknown(),
          pricingType: z.unknown(),
        }),
      })),
      guaranteedImpressions: z.string(),
      guaranteedLooks: z.string(),
      impressionCap: z.string(),
      minimumDailyLooks: z.string(),
      percentShareOfVoice: z.string(),
      reservationType: z.string(),
    }),
    nonGuaranteedAuctionTerms: z.object({
      autoOptimizePrivateAuction: z.boolean(),
      reservePricesPerBuyer: z.array(z.object({
        advertiserIds: z.array(z.unknown()),
        buyer: z.object({
          accountId: z.unknown(),
        }),
        price: z.object({
          amount: z.unknown(),
          pricingType: z.unknown(),
        }),
      })),
    }),
    nonGuaranteedFixedPriceTerms: z.object({
      fixedPrices: z.array(z.object({
        advertiserIds: z.array(z.unknown()),
        buyer: z.object({
          accountId: z.unknown(),
        }),
        price: z.object({
          amount: z.unknown(),
          pricingType: z.unknown(),
        }),
      })),
    }),
    sellerTimeZone: z.string(),
  }).optional(),
  updateTime: z.string().optional(),
  webPropertyCode: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.Products. Registered at `@swamp/gcp/adexchangebuyer2/accounts-products`. */
export const model = {
  type: "@swamp/gcp/adexchangebuyer2/accounts-products",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A product is a segment of inventory that a seller wants to sell. It is associ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a products",
      arguments: z.object({
        identifier: z.string().describe("The name of the products"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
    sync: {
      description: "Sync products state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
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
    list: {
      description: "List products resources",
      arguments: z.object({
        filter: z.string().describe(
          "An optional PQL query used to query for products. See https://developers.google.com/ad-manager/docs/pqlreference for documentation about PQL and examples. Nested repeated fields, such as product.targetingCriterion.inclusions, cannot be filtered.",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. The server may return fewer results than requested. If unspecified, the server will pick an appropriate default.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
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
          "products",
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
  },
};
