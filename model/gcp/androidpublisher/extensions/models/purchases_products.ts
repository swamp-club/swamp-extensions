// Auto-generated extension model for @swamp/gcp/androidpublisher/purchases-products
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Purchases.Products.
 *
 * A ProductPurchase resource indicates the status of a user's inapp product purchase.
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
  "id": "androidpublisher.purchases.products.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/purchases/products/{productId}/tokens/{token}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "productId",
    "token",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "productId": {
      "location": "path",
      "required": true,
    },
    "token": {
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
  acknowledgementState: z.number().optional(),
  consumptionState: z.number().optional(),
  developerPayload: z.string().optional(),
  kind: z.string().optional(),
  obfuscatedExternalAccountId: z.string().optional(),
  obfuscatedExternalProfileId: z.string().optional(),
  orderId: z.string().optional(),
  productId: z.string().optional(),
  purchaseState: z.number().optional(),
  purchaseTimeMillis: z.string().optional(),
  purchaseToken: z.string().optional(),
  purchaseType: z.number().optional(),
  quantity: z.number().optional(),
  refundableQuantity: z.number().optional(),
  regionCode: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Purchases.Products. Registered at `@swamp/gcp/androidpublisher/purchases-products`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/purchases-products",
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
        "A ProductPurchase resource indicates the status of a user's inapp product pur...",
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
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        params["token"] = args.identifier;
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
          if (g["packageName"] !== undefined) {
            params["packageName"] = String(g["packageName"]);
          } else if (existing["packageName"]) {
            params["packageName"] = String(existing["packageName"]);
          }
          if (g["productId"] !== undefined) {
            params["productId"] = String(g["productId"]);
          } else if (existing["productId"]) {
            params["productId"] = String(existing["productId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["token"] = identifier;
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
    acknowledge: {
      description: "acknowledge",
      arguments: z.object({
        developerPayload: z.any().optional(),
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
        params["packageName"] = existing["packageName"]?.toString() ??
          g["packageName"]?.toString() ?? "";
        params["productId"] = existing["productId"]?.toString() ??
          g["productId"]?.toString() ?? "";
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["developerPayload"] !== undefined) {
          body["developerPayload"] = args["developerPayload"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.purchases.products.acknowledge",
            "path":
              "androidpublisher/v3/applications/{packageName}/purchases/products/{productId}/tokens/{token}:acknowledge",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "productId", "token"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
              "token": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    consume: {
      description: "consume",
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
        params["productId"] = existing["productId"]?.toString() ??
          g["productId"]?.toString() ?? "";
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.purchases.products.consume",
            "path":
              "androidpublisher/v3/applications/{packageName}/purchases/products/{productId}/tokens/{token}:consume",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "productId", "token"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
              "token": { "location": "path", "required": true },
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
