// Auto-generated extension model for @swamp/gcp/cloudchannel/accounts-offers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Channel Accounts.Offers.
 *
 * Represents an offer made to resellers for purchase. An offer is associated with a Sku, has a plan for payment, a price, and defines the constraints for buying.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://cloudchannel.googleapis.com/";

const LIST_CONFIG = {
  "id": "cloudchannel.accounts.offers.list",
  "path": "v1/{+parent}/offers",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "languageCode": {
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
    "showFutureOffers": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  constraints: z.object({
    customerConstraints: z.object({
      allowedCustomerTypes: z.array(z.string()),
      allowedRegions: z.array(z.string()),
      promotionalOrderTypes: z.array(z.string()),
    }),
  }).optional(),
  dealCode: z.string().optional(),
  endTime: z.string().optional(),
  marketingInfo: z.object({
    defaultLogo: z.object({
      content: z.string(),
      title: z.string(),
      type: z.string(),
    }),
    description: z.string(),
    displayName: z.string(),
  }).optional(),
  name: z.string(),
  parameterDefinitions: z.array(z.object({
    allowedValues: z.array(z.object({
      boolValue: z.boolean(),
      doubleValue: z.number(),
      int64Value: z.string(),
      protoValue: z.record(z.string(), z.unknown()),
      stringValue: z.string(),
    })),
    maxValue: z.object({
      boolValue: z.boolean(),
      doubleValue: z.number(),
      int64Value: z.string(),
      protoValue: z.record(z.string(), z.unknown()),
      stringValue: z.string(),
    }),
    minValue: z.object({
      boolValue: z.boolean(),
      doubleValue: z.number(),
      int64Value: z.string(),
      protoValue: z.record(z.string(), z.unknown()),
      stringValue: z.string(),
    }),
    name: z.string(),
    optional: z.boolean(),
    parameterType: z.string(),
  })).optional(),
  plan: z.object({
    billingAccount: z.string(),
    paymentCycle: z.object({
      duration: z.number(),
      periodType: z.string(),
    }),
    paymentPlan: z.string(),
    paymentType: z.string(),
    trialPeriod: z.object({
      duration: z.number(),
      periodType: z.string(),
    }),
  }).optional(),
  priceByResources: z.array(z.object({
    price: z.object({
      basePrice: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      discount: z.number(),
      discountComponents: z.array(z.object({
        discountAbsolute: z.unknown(),
        discountPercentage: z.unknown(),
        discountType: z.unknown(),
      })),
      effectivePrice: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      externalPriceUri: z.string(),
      pricePeriod: z.object({
        duration: z.number(),
        periodType: z.string(),
      }),
    }),
    pricePhases: z.array(z.object({
      firstPeriod: z.number(),
      lastPeriod: z.number(),
      periodType: z.string(),
      price: z.object({
        basePrice: z.unknown(),
        discount: z.unknown(),
        discountComponents: z.unknown(),
        effectivePrice: z.unknown(),
        externalPriceUri: z.unknown(),
        pricePeriod: z.unknown(),
      }),
      priceTiers: z.array(z.unknown()),
    })),
    resourceType: z.string(),
  })).optional(),
  sku: z.object({
    marketingInfo: z.object({
      defaultLogo: z.object({
        content: z.string(),
        title: z.string(),
        type: z.string(),
      }),
      description: z.string(),
      displayName: z.string(),
    }),
    name: z.string(),
    product: z.object({
      marketingInfo: z.object({
        defaultLogo: z.object({
          content: z.string(),
          title: z.string(),
          type: z.string(),
        }),
        description: z.string(),
        displayName: z.string(),
      }),
      name: z.string(),
    }),
  }).optional(),
  startTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Channel Accounts.Offers. Registered at `@swamp/gcp/cloudchannel/accounts-offers`. */
export const model = {
  type: "@swamp/gcp/cloudchannel/accounts-offers",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents an offer made to resellers for purchase. An offer is associated wi...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a offers",
      arguments: z.object({
        identifier: z.string().describe("The name of the offers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync offers state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
