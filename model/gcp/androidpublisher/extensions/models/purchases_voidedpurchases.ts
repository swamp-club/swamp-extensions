// Auto-generated extension model for @swamp/gcp/androidpublisher/purchases-voidedpurchases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Purchases.Voidedpurchases.
 *
 * A VoidedPurchase resource indicates a purchase that was either canceled/refunded/charged-back.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const LIST_CONFIG = {
  "id": "androidpublisher.purchases.voidedpurchases.list",
  "path":
    "androidpublisher/v3/applications/{packageName}/purchases/voidedpurchases",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
  ],
  "parameters": {
    "endTime": {
      "location": "query",
    },
    "includeQuantityBasedPartialRefund": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "startIndex": {
      "location": "query",
    },
    "startTime": {
      "location": "query",
    },
    "token": {
      "location": "query",
    },
    "type": {
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
  kind: z.string().optional(),
  orderId: z.string().optional(),
  purchaseTimeMillis: z.string().optional(),
  purchaseToken: z.string().optional(),
  voidedQuantity: z.number().optional(),
  voidedReason: z.number().optional(),
  voidedSource: z.number().optional(),
  voidedTimeMillis: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Purchases.Voidedpurchases. Registered at `@swamp/gcp/androidpublisher/purchases-voidedpurchases`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/purchases-voidedpurchases",
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
        "A VoidedPurchase resource indicates a purchase that was either canceled/refun...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a voidedpurchases",
      arguments: z.object({
        identifier: z.string().describe("The name of the voidedpurchases"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
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
      description: "Sync voidedpurchases state from GCP",
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
    list: {
      description: "List voidedpurchases resources",
      arguments: z.object({
        endTime: z.string().describe(
          "The time, in milliseconds since the Epoch, of the newest voided purchase that you want to see in the response. The value of this parameter cannot be greater than the current time and is ignored if a pagination token is set. Default value is current time. Note: This filter is applied on the time at which the record is seen as voided by our systems and not the actual voided time returned in the response.",
        ).optional(),
        includeQuantityBasedPartialRefund: z.boolean().describe(
          "Optional. Whether to include voided purchases of quantity-based partial refunds, which are applicable only to multi-quantity purchases. If true, additional voided purchases may be returned with voidedQuantity that indicates the refund quantity of a quantity-based partial refund. The default value is false.",
        ).optional(),
        maxResults: z.number().describe(
          "Defines how many results the list operation should return. The default number depends on the resource collection.",
        ).optional(),
        startIndex: z.number().describe(
          "Defines the index of the first element to return. This can only be used if indexed paging is enabled.",
        ).optional(),
        startTime: z.string().describe(
          "The time, in milliseconds since the Epoch, of the oldest voided purchase that you want to see in the response. The value of this parameter cannot be older than 30 days and is ignored if a pagination token is set. Default value is current time minus 30 days. Note: This filter is applied on the time at which the record is seen as voided by our systems and not the actual voided time returned in the response.",
        ).optional(),
        token: z.string().describe(
          "Defines the token of the page to return, usually taken from TokenPagination. This can only be used if token paging is enabled.",
        ).optional(),
        type: z.number().describe(
          "The type of voided purchases that you want to see in the response. Possible values are: 0. Only voided in-app product purchases will be returned in the response. This is the default value. 1. Both voided in-app purchases and voided subscription purchases will be returned in the response. Note: Before requesting to receive voided subscription purchases, you must switch to use orderId in the response which uniquely identifies one-time purchases and subscriptions. Otherwise, you will receive multiple subscription orders with the same PurchaseToken, because subscription renewal orders share the same PurchaseToken.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (args["endTime"] !== undefined) {
          params["endTime"] = String(args["endTime"]);
        }
        if (args["includeQuantityBasedPartialRefund"] !== undefined) {
          params["includeQuantityBasedPartialRefund"] = String(
            args["includeQuantityBasedPartialRefund"],
          );
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["startIndex"] !== undefined) {
          params["startIndex"] = String(args["startIndex"]);
        }
        if (args["startTime"] !== undefined) {
          params["startTime"] = String(args["startTime"]);
        }
        if (args["token"] !== undefined) {
          params["token"] = String(args["token"]);
        }
        if (args["type"] !== undefined) params["type"] = String(args["type"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "voidedPurchases",
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
