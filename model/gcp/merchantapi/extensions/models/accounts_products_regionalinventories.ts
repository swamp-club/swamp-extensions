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

// Auto-generated extension model for @swamp/gcp/merchantapi/accounts-products-regionalinventories
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Merchant Accounts.Products.RegionalInventories.
 *
 * Regional inventory information for the product. Represents specific information like price and availability for a given product in a specific `region`. For a list of all accepted attribute values, see the [regional product inventory data specification](https://support.google.com/merchants/answer/9698880).
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://merchantapi.googleapis.com/";

const INSERT_CONFIG = {
  "id": "merchantapi.accounts.products.regionalInventories.insert",
  "path": "inventories/v1/{+parent}/regionalInventories:insert",
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

const DELETE_CONFIG = {
  "id": "merchantapi.accounts.products.regionalInventories.delete",
  "path": "inventories/v1/{+name}",
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
  "id": "merchantapi.accounts.products.regionalInventories.list",
  "path": "inventories/v1/{+parent}/regionalInventories",
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

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/content",
];

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  region: z.string().describe(
    "Required. Immutable. ID of the region for this `RegionalInventory` resource. See the [Regional availability and pricing](https://support.google.com/merchants/answer/9698880) for more details.",
  ).optional(),
  regionalInventoryAttributes: z.object({
    availability: z.enum([
      "REGIONAL_INVENTORY_AVAILABILITY_UNSPECIFIED",
      "IN_STOCK",
      "OUT_OF_STOCK",
    ]).describe(
      "Optional. [Availability](https://support.google.com/merchants/answer/14644124) of the product in this region.",
    ).optional(),
    loyaltyPrograms: z.array(z.object({
      cashbackForFutureUse: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The cashback that can be used for future purchases.")
        .optional(),
      loyaltyPoints: z.string().describe(
        "The amount of loyalty points earned on a purchase.",
      ).optional(),
      memberPriceEffectiveInterval: z.object({
        endTime: z.string().describe(
          "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
        ).optional(),
        startTime: z.string().describe(
          "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
        ).optional(),
      }).describe(
        "A date range during which the item is eligible for member price. If not specified, the member price is always applicable. The date range is represented by a pair of ISO 8601 dates separated by a space, comma, or slash.",
      ).optional(),
      price: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe(
        "The price for members of the given tier, that is, the instant discount price. Must be smaller or equal to the regular price.",
      ).optional(),
      programLabel: z.string().describe(
        "The label of the loyalty program. This is an internal label that uniquely identifies the relationship between a business entity and a loyalty program entity. The label must be provided if there are multiple loyalty programs available for the merchant, so that the system can associate the assets below (for example, price and points) with the correct business. The corresponding program must be linked to the Merchant Center account.",
      ).optional(),
      shippingLabel: z.string().describe(
        "The label of the shipping benefit. If the field has value, this offer has loyalty shipping benefit. If the field value isn't provided, the item is not eligible for loyalty shipping for the given loyalty tier.",
      ).optional(),
      tierLabel: z.string().describe(
        "The label of the tier within the loyalty program. Must match one of the labels within the program.",
      ).optional(),
    })).describe(
      "Optional. An optional list of loyalty programs containing applicable loyalty member prices for this product in this region. This field is used to show region-specific member prices on Product Listing Ads (PLA). To use this, the loyalty program must be configured in Google Merchant Center, and the merchant must be using the Regional Availability and Pricing (RAAP) feature. The benefits provided must match the merchant's website and be clear to members. This is only applicable for merchants in supported countries. See [Loyalty program](https://support.google.com/merchants/answer/12922446) for details on supported countries and loyalty program configuration. Also see [Regional availability and pricing](https://support.google.com/merchants/answer/14644124) and [How to set up regional member pricing](https://support.google.com/merchants/answer/16388178) for more information.",
    ).optional(),
    price: z.object({
      amountMicros: z.string().describe(
        "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
      ).optional(),
      currencyCode: z.string().describe(
        "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
      ).optional(),
    }).describe("Optional. Price of the product in this region.").optional(),
    salePrice: z.object({
      amountMicros: z.string().describe(
        "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
      ).optional(),
      currencyCode: z.string().describe(
        "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
      ).optional(),
    }).describe(
      "Optional. Sale price of the product in this region. Mandatory if `salePriceEffectiveDate` is defined.",
    ).optional(),
    salePriceEffectiveDate: z.object({
      endTime: z.string().describe(
        "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
      ).optional(),
      startTime: z.string().describe(
        "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
      ).optional(),
    }).describe("Optional. The `TimePeriod` of the sale price in this region.")
      .optional(),
  }).describe("Optional. A list of regional inventory attributes.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  account: z.string().optional(),
  base64EncodedName: z.string().optional(),
  name: z.string(),
  region: z.string().optional(),
  regionalInventoryAttributes: z.object({
    availability: z.string(),
    loyaltyPrograms: z.array(z.object({
      cashbackForFutureUse: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      loyaltyPoints: z.string(),
      memberPriceEffectiveInterval: z.object({
        endTime: z.string(),
        startTime: z.string(),
      }),
      price: z.object({
        amountMicros: z.string(),
        currencyCode: z.string(),
      }),
      programLabel: z.string(),
      shippingLabel: z.string(),
      tierLabel: z.string(),
    })),
    price: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    salePrice: z.object({
      amountMicros: z.string(),
      currencyCode: z.string(),
    }),
    salePriceEffectiveDate: z.object({
      endTime: z.string(),
      startTime: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  region: z.string().describe(
    "Required. Immutable. ID of the region for this `RegionalInventory` resource. See the [Regional availability and pricing](https://support.google.com/merchants/answer/9698880) for more details.",
  ).optional(),
  regionalInventoryAttributes: z.object({
    availability: z.enum([
      "REGIONAL_INVENTORY_AVAILABILITY_UNSPECIFIED",
      "IN_STOCK",
      "OUT_OF_STOCK",
    ]).describe(
      "Optional. [Availability](https://support.google.com/merchants/answer/14644124) of the product in this region.",
    ).optional(),
    loyaltyPrograms: z.array(z.object({
      cashbackForFutureUse: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe("The cashback that can be used for future purchases.")
        .optional(),
      loyaltyPoints: z.string().describe(
        "The amount of loyalty points earned on a purchase.",
      ).optional(),
      memberPriceEffectiveInterval: z.object({
        endTime: z.string().describe(
          "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
        ).optional(),
        startTime: z.string().describe(
          "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
        ).optional(),
      }).describe(
        "A date range during which the item is eligible for member price. If not specified, the member price is always applicable. The date range is represented by a pair of ISO 8601 dates separated by a space, comma, or slash.",
      ).optional(),
      price: z.object({
        amountMicros: z.string().describe(
          "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
        ).optional(),
        currencyCode: z.string().describe(
          "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
        ).optional(),
      }).describe(
        "The price for members of the given tier, that is, the instant discount price. Must be smaller or equal to the regular price.",
      ).optional(),
      programLabel: z.string().describe(
        "The label of the loyalty program. This is an internal label that uniquely identifies the relationship between a business entity and a loyalty program entity. The label must be provided if there are multiple loyalty programs available for the merchant, so that the system can associate the assets below (for example, price and points) with the correct business. The corresponding program must be linked to the Merchant Center account.",
      ).optional(),
      shippingLabel: z.string().describe(
        "The label of the shipping benefit. If the field has value, this offer has loyalty shipping benefit. If the field value isn't provided, the item is not eligible for loyalty shipping for the given loyalty tier.",
      ).optional(),
      tierLabel: z.string().describe(
        "The label of the tier within the loyalty program. Must match one of the labels within the program.",
      ).optional(),
    })).describe(
      "Optional. An optional list of loyalty programs containing applicable loyalty member prices for this product in this region. This field is used to show region-specific member prices on Product Listing Ads (PLA). To use this, the loyalty program must be configured in Google Merchant Center, and the merchant must be using the Regional Availability and Pricing (RAAP) feature. The benefits provided must match the merchant's website and be clear to members. This is only applicable for merchants in supported countries. See [Loyalty program](https://support.google.com/merchants/answer/12922446) for details on supported countries and loyalty program configuration. Also see [Regional availability and pricing](https://support.google.com/merchants/answer/14644124) and [How to set up regional member pricing](https://support.google.com/merchants/answer/16388178) for more information.",
    ).optional(),
    price: z.object({
      amountMicros: z.string().describe(
        "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
      ).optional(),
      currencyCode: z.string().describe(
        "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
      ).optional(),
    }).describe("Optional. Price of the product in this region.").optional(),
    salePrice: z.object({
      amountMicros: z.string().describe(
        "The price represented as a number in micros (1 million micros is an equivalent to one's currency standard unit, for example, 1 USD = 1000000 micros).",
      ).optional(),
      currencyCode: z.string().describe(
        "The currency of the price using three-letter acronyms according to [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217).",
      ).optional(),
    }).describe(
      "Optional. Sale price of the product in this region. Mandatory if `salePriceEffectiveDate` is defined.",
    ).optional(),
    salePriceEffectiveDate: z.object({
      endTime: z.string().describe(
        "Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end.",
      ).optional(),
      startTime: z.string().describe(
        "Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start.",
      ).optional(),
    }).describe("Optional. The `TimePeriod` of the sale price in this region.")
      .optional(),
  }).describe("Optional. A list of regional inventory attributes.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Merchant Accounts.Products.RegionalInventories. Registered at `@swamp/gcp/merchantapi/accounts-products-regionalinventories`. */
export const model = {
  type: "@swamp/gcp/merchantapi/accounts-products-regionalinventories",
  version: "2026.10.13.1",
  upgrades: [
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Regional inventory information for the product. Represents specific informati...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a regionalInventories",
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
        if (g["region"] !== undefined) body["region"] = g["region"];
        if (g["regionalInventoryAttributes"] !== undefined) {
          body["regionalInventoryAttributes"] =
            g["regionalInventoryAttributes"];
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
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
      description: "Get a regionalInventories",
      arguments: z.object({
        identifier: z.string().describe("The name of the regionalInventories"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          baseUrl,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
          credentials,
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
      description: "Delete the regionalInventories",
      arguments: z.object({
        identifier: z.string().describe("The name of the regionalInventories"),
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
      description: "Sync regionalInventories state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific regionalInventories by name (e.g. one discovered by list)",
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
            baseUrl,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List regionalInventories resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of `RegionalInventory` resources for the given product to return. The service returns fewer than this value if the number of inventories for the given product is less that than the `pageSize`. The default value is 25000. The maximum value is 100000; If a value higher than the maximum is specified, then the `pageSize` will default to the maximum.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "regionalInventories",
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
