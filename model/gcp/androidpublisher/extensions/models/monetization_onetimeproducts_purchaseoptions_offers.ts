// Auto-generated extension model for @swamp/gcp/androidpublisher/monetization-onetimeproducts-purchaseoptions-offers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Monetization.Onetimeproducts.PurchaseOptions.Offers.
 *
 * A single offer for a one-time product.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const LIST_CONFIG = {
  "id":
    "androidpublisher.monetization.onetimeproducts.purchaseOptions.offers.list",
  "path":
    "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "productId",
    "purchaseOptionId",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "productId": {
      "location": "path",
      "required": true,
    },
    "purchaseOptionId": {
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
  discountedOffer: z.object({
    endTime: z.string(),
    redemptionLimit: z.string(),
    startTime: z.string(),
  }).optional(),
  offerId: z.string().optional(),
  offerTags: z.array(z.object({
    tag: z.string(),
  })).optional(),
  packageName: z.string().optional(),
  preOrderOffer: z.object({
    endTime: z.string(),
    priceChangeBehavior: z.string(),
    releaseTime: z.string(),
    startTime: z.string(),
  }).optional(),
  productId: z.string().optional(),
  purchaseOptionId: z.string().optional(),
  regionalPricingAndAvailabilityConfigs: z.array(z.object({
    absoluteDiscount: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
    availability: z.string(),
    noOverride: z.object({}),
    regionCode: z.string(),
    relativeDiscount: z.number(),
  })).optional(),
  regionsVersion: z.object({
    version: z.string(),
  }).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Monetization.Onetimeproducts.PurchaseOptions.Offers. Registered at `@swamp/gcp/androidpublisher/monetization-onetimeproducts-purchaseoptions-offers`. */
export const model = {
  type:
    "@swamp/gcp/androidpublisher/monetization-onetimeproducts-purchaseoptions-offers",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A single offer for a one-time product.",
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
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["purchaseOptionId"] !== undefined) {
          params["purchaseOptionId"] = String(g["purchaseOptionId"]);
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
          if (g["purchaseOptionId"] !== undefined) {
            params["purchaseOptionId"] = String(g["purchaseOptionId"]);
          } else if (existing["purchaseOptionId"]) {
            params["purchaseOptionId"] = String(existing["purchaseOptionId"]);
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
    activate: {
      description: "activate",
      arguments: z.object({
        latencyTolerance: z.any().optional(),
        offerId: z.any().optional(),
        packageName: z.any().optional(),
        productId: z.any().optional(),
        purchaseOptionId: z.any().optional(),
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
        params["purchaseOptionId"] = existing["purchaseOptionId"]?.toString() ??
          g["purchaseOptionId"]?.toString() ?? "";
        params["offerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["latencyTolerance"] !== undefined) {
          body["latencyTolerance"] = args["latencyTolerance"];
        }
        if (args["offerId"] !== undefined) body["offerId"] = args["offerId"];
        if (args["packageName"] !== undefined) {
          body["packageName"] = args["packageName"];
        }
        if (args["productId"] !== undefined) {
          body["productId"] = args["productId"];
        }
        if (args["purchaseOptionId"] !== undefined) {
          body["purchaseOptionId"] = args["purchaseOptionId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.onetimeproducts.purchaseOptions.offers.activate",
            "path":
              "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers/{offerId}:activate",
            "httpMethod": "POST",
            "parameterOrder": [
              "packageName",
              "productId",
              "purchaseOptionId",
              "offerId",
            ],
            "parameters": {
              "offerId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
              "purchaseOptionId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        requests: z.any().optional(),
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
        params["purchaseOptionId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.onetimeproducts.purchaseOptions.offers.batchDelete",
            "path":
              "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers:batchDelete",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "productId", "purchaseOptionId"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
              "purchaseOptionId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_get: {
      description: "batch get",
      arguments: z.object({
        requests: z.any().optional(),
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
        params["purchaseOptionId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.onetimeproducts.purchaseOptions.offers.batchGet",
            "path":
              "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers:batchGet",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "productId", "purchaseOptionId"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
              "purchaseOptionId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_update: {
      description: "batch update",
      arguments: z.object({
        requests: z.any().optional(),
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
        params["purchaseOptionId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.onetimeproducts.purchaseOptions.offers.batchUpdate",
            "path":
              "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "productId", "purchaseOptionId"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
              "purchaseOptionId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_update_states: {
      description: "batch update states",
      arguments: z.object({
        requests: z.any().optional(),
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
        params["purchaseOptionId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.onetimeproducts.purchaseOptions.offers.batchUpdateStates",
            "path":
              "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers:batchUpdateStates",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "productId", "purchaseOptionId"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
              "purchaseOptionId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    cancel: {
      description: "cancel",
      arguments: z.object({
        latencyTolerance: z.any().optional(),
        offerId: z.any().optional(),
        packageName: z.any().optional(),
        productId: z.any().optional(),
        purchaseOptionId: z.any().optional(),
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
        params["purchaseOptionId"] = existing["purchaseOptionId"]?.toString() ??
          g["purchaseOptionId"]?.toString() ?? "";
        params["offerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["latencyTolerance"] !== undefined) {
          body["latencyTolerance"] = args["latencyTolerance"];
        }
        if (args["offerId"] !== undefined) body["offerId"] = args["offerId"];
        if (args["packageName"] !== undefined) {
          body["packageName"] = args["packageName"];
        }
        if (args["productId"] !== undefined) {
          body["productId"] = args["productId"];
        }
        if (args["purchaseOptionId"] !== undefined) {
          body["purchaseOptionId"] = args["purchaseOptionId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.onetimeproducts.purchaseOptions.offers.cancel",
            "path":
              "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers/{offerId}:cancel",
            "httpMethod": "POST",
            "parameterOrder": [
              "packageName",
              "productId",
              "purchaseOptionId",
              "offerId",
            ],
            "parameters": {
              "offerId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
              "purchaseOptionId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    deactivate: {
      description: "deactivate",
      arguments: z.object({
        latencyTolerance: z.any().optional(),
        offerId: z.any().optional(),
        packageName: z.any().optional(),
        productId: z.any().optional(),
        purchaseOptionId: z.any().optional(),
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
        params["purchaseOptionId"] = existing["purchaseOptionId"]?.toString() ??
          g["purchaseOptionId"]?.toString() ?? "";
        params["offerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["latencyTolerance"] !== undefined) {
          body["latencyTolerance"] = args["latencyTolerance"];
        }
        if (args["offerId"] !== undefined) body["offerId"] = args["offerId"];
        if (args["packageName"] !== undefined) {
          body["packageName"] = args["packageName"];
        }
        if (args["productId"] !== undefined) {
          body["productId"] = args["productId"];
        }
        if (args["purchaseOptionId"] !== undefined) {
          body["purchaseOptionId"] = args["purchaseOptionId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "androidpublisher.monetization.onetimeproducts.purchaseOptions.offers.deactivate",
            "path":
              "androidpublisher/v3/applications/{packageName}/oneTimeProducts/{productId}/purchaseOptions/{purchaseOptionId}/offers/{offerId}:deactivate",
            "httpMethod": "POST",
            "parameterOrder": [
              "packageName",
              "productId",
              "purchaseOptionId",
              "offerId",
            ],
            "parameters": {
              "offerId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
              "purchaseOptionId": { "location": "path", "required": true },
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
