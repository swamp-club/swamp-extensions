// Auto-generated extension model for @swamp/gcp/androidpublisher/orders
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Orders.
 *
 * The Order resource encapsulates comprehensive information about a transaction made on Google Play. It includes a variety of attributes that provide details about the order itself, the products purchased, and the history of events related to the order. The Orders APIs provide real-time access to your order data within the Google Play ecosystem. You can retrieve detailed information and metadata for both one-time and recurring orders, including transaction details like charges, taxes, and refunds, as well as metadata such as pricing phases for subscriptions. The Orders APIs let you automate tasks related to order management, reducing the need for manual checks via the Play Developer Console. The following are some of the use cases for this API: + Real-time order data retrieval - Get order details and metadata immediately after a purchase using an order ID. + Order update synchronization - Periodically sync order updates to maintain an up-to-date record of order information. Note: + The Orders API calls count towards your Play Developer API quota, which defaults to 200K daily, and may be insufficient to sync extensive order histories. + A maximum of 1000 orders can be retrieved per call. Using larger page sizes is recommended to minimize quota usage. Check your quota in the Cloud Console and request more if required.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "androidpublisher.orders.get",
  "path": "androidpublisher/v3/applications/{packageName}/orders/{orderId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "orderId",
  ],
  "parameters": {
    "orderId": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  buyerAddress: z.object({
    buyerCountry: z.string(),
    buyerPostcode: z.string(),
    buyerState: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  developerRevenueInBuyerCurrency: z.object({
    currencyCode: z.string(),
    nanos: z.number(),
    units: z.string(),
  }).optional(),
  lastEventTime: z.string().optional(),
  lineItems: z.array(z.object({
    listingPrice: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
    oneTimePurchaseDetails: z.object({
      offerId: z.string(),
      preorderDetails: z.object({}),
      purchaseOptionId: z.string(),
      quantity: z.number(),
      rentalDetails: z.object({}),
    }),
    paidAppDetails: z.object({}),
    productId: z.string(),
    productTitle: z.string(),
    subscriptionDetails: z.object({
      basePlanId: z.string(),
      offerId: z.string(),
      offerPhase: z.string(),
      offerPhaseDetails: z.object({
        baseDetails: z.object({}),
        freeTrialDetails: z.object({}),
        introductoryPriceDetails: z.object({}),
        prorationPeriodDetails: z.object({
          originalOfferPhase: z.unknown(),
        }),
      }),
      servicePeriodEndTime: z.string(),
      servicePeriodStartTime: z.string(),
    }),
    tax: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
    total: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
  })).optional(),
  orderDetails: z.object({
    taxInclusive: z.boolean(),
  }).optional(),
  orderHistory: z.object({
    cancellationEvent: z.object({
      eventTime: z.string(),
    }),
    partialRefundEvents: z.array(z.object({
      createTime: z.string(),
      processTime: z.string(),
      refundDetails: z.object({
        tax: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
        total: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
      }),
      state: z.string(),
    })),
    processedEvent: z.object({
      eventTime: z.string(),
    }),
    refundEvent: z.object({
      eventTime: z.string(),
      refundDetails: z.object({
        tax: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        total: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
      }),
      refundReason: z.string(),
    }),
  }).optional(),
  orderId: z.string().optional(),
  pointsDetails: z.object({
    pointsCouponValue: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
    pointsDiscountRateMicros: z.string(),
    pointsOfferId: z.string(),
    pointsSpent: z.string(),
  }).optional(),
  purchaseToken: z.string().optional(),
  salesChannel: z.string().optional(),
  state: z.string().optional(),
  tax: z.object({
    currencyCode: z.string(),
    nanos: z.number(),
    units: z.string(),
  }).optional(),
  total: z.object({
    currencyCode: z.string(),
    nanos: z.number(),
    units: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Orders. Registered at `@swamp/gcp/androidpublisher/orders`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/orders",
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
        "The Order resource encapsulates comprehensive information about a transaction...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a orders",
      arguments: z.object({
        identifier: z.string().describe("The name of the orders"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        params["orderId"] = args.identifier;
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
      description: "Sync orders state from GCP",
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
          if (g["packageName"] !== undefined) {
            params["packageName"] = String(g["packageName"]);
          } else if (existing["packageName"]) {
            params["packageName"] = String(existing["packageName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["orderId"] = identifier;
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
    batchget: {
      description: "batchget",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["packageName"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.orders.batchget",
            "path":
              "androidpublisher/v3/applications/{packageName}/orders:batchGet",
            "httpMethod": "GET",
            "parameterOrder": ["packageName"],
            "parameters": {
              "orderIds": { "location": "query" },
              "packageName": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    refund: {
      description: "refund",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        params["packageName"] = existing["packageName"]?.toString() ??
          g["packageName"]?.toString() ?? "";
        params["orderId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.orders.refund",
            "path":
              "androidpublisher/v3/applications/{packageName}/orders/{orderId}:refund",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "orderId"],
            "parameters": {
              "orderId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
              "revoke": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
