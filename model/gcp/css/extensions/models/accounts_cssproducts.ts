// Auto-generated extension model for @swamp/gcp/css/accounts-cssproducts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud CSS Accounts.CssProducts.
 *
 * The processed CSS Product.
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
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/cssProducts/${shortName}`;
}

const BASE_URL = "https://css.googleapis.com/";

const GET_CONFIG = {
  "id": "css.accounts.cssProducts.get",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  attributes: z.object({
    additionalImageLinks: z.array(z.string()),
    adult: z.boolean(),
    ageGroup: z.string(),
    brand: z.string(),
    certifications: z.array(z.object({
      authority: z.string(),
      code: z.string(),
      name: z.string(),
    })),
    color: z.string(),
    cppAdsRedirect: z.string(),
    cppLink: z.string(),
    cppMobileLink: z.string(),
    customLabel0: z.string(),
    customLabel1: z.string(),
    customLabel2: z.string(),
    customLabel3: z.string(),
    customLabel4: z.string(),
    description: z.string(),
    excludedDestinations: z.array(z.string()),
    expirationDate: z.string(),
    gender: z.string(),
    googleProductCategory: z.string(),
    gtin: z.string(),
    headlineOfferCondition: z.string(),
    headlineOfferInstallment: z.object({
      amount: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      downpayment: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      months: z.string(),
    }),
    headlineOfferLink: z.string(),
    headlineOfferMobileLink: z.string(),
    headlineOfferPrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    headlineOfferShippingPrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    headlineOfferSubscriptionCost: z.object({
      amount: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      period: z.string(),
      periodLength: z.string(),
    }),
    highPrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    imageLink: z.string(),
    includedDestinations: z.array(z.string()),
    isBundle: z.boolean(),
    itemGroupId: z.string(),
    lowPrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    material: z.string(),
    maxRating: z.string(),
    minRating: z.string(),
    mpn: z.string(),
    multipack: z.string(),
    numberOfOffers: z.string(),
    pattern: z.string(),
    pause: z.string(),
    productDetails: z.array(z.object({
      attributeName: z.string(),
      attributeValue: z.string(),
      sectionName: z.string(),
    })),
    productHeight: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    productHighlights: z.array(z.string()),
    productLength: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    productTypes: z.array(z.string()),
    productWeight: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    productWidth: z.object({
      unit: z.string(),
      value: z.number(),
    }),
    rating: z.number(),
    reviewCount: z.string(),
    size: z.string(),
    sizeSystem: z.string(),
    sizeTypes: z.array(z.string()),
    title: z.string(),
  }).optional(),
  contentLanguage: z.string().optional(),
  cssProductStatus: z.object({
    creationDate: z.string(),
    destinationStatuses: z.array(z.object({
      approvedCountries: z.array(z.string()),
      destination: z.string(),
      disapprovedCountries: z.array(z.string()),
      pendingCountries: z.array(z.string()),
    })),
    googleExpirationDate: z.string(),
    itemLevelIssues: z.array(z.object({
      applicableCountries: z.array(z.string()),
      attribute: z.string(),
      code: z.string(),
      description: z.string(),
      destination: z.string(),
      detail: z.string(),
      documentation: z.string(),
      resolution: z.string(),
      servability: z.string(),
    })),
    lastUpdateDate: z.string(),
  }).optional(),
  customAttributes: z.array(z.object({
    groupValues: z.array(z.string()),
    name: z.string(),
    value: z.string(),
  })).optional(),
  feedLabel: z.string().optional(),
  name: z.string(),
  rawProvidedId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud CSS Accounts.CssProducts. Registered at `@swamp/gcp/css/accounts-cssproducts`. */
export const model = {
  type: "@swamp/gcp/css/accounts-cssproducts",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The processed CSS Product.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a cssProducts",
      arguments: z.object({
        identifier: z.string().describe("The name of the cssProducts"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
    sync: {
      description: "Sync cssProducts state from GCP",
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
            String(g["parent"] ?? ""),
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
