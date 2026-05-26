// Auto-generated extension model for @swamp/gcp/androidpublisher/purchases-subscriptions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Purchases.Subscriptions.
 *
 * Deprecated: Use SubscriptionPurchaseV2 instead. A SubscriptionPurchase resource indicates the status of a user's subscription purchase.
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
  "id": "androidpublisher.purchases.subscriptions.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "subscriptionId",
    "token",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "subscriptionId": {
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
  autoRenewing: z.boolean().optional(),
  autoResumeTimeMillis: z.string().optional(),
  cancelReason: z.number().optional(),
  cancelSurveyResult: z.object({
    cancelSurveyReason: z.number(),
    userInputCancelReason: z.string(),
  }).optional(),
  countryCode: z.string().optional(),
  developerPayload: z.string().optional(),
  emailAddress: z.string().optional(),
  expiryTimeMillis: z.string().optional(),
  externalAccountId: z.string().optional(),
  familyName: z.string().optional(),
  givenName: z.string().optional(),
  introductoryPriceInfo: z.object({
    introductoryPriceAmountMicros: z.string(),
    introductoryPriceCurrencyCode: z.string(),
    introductoryPriceCycles: z.number(),
    introductoryPricePeriod: z.string(),
  }).optional(),
  kind: z.string().optional(),
  linkedPurchaseToken: z.string().optional(),
  obfuscatedExternalAccountId: z.string().optional(),
  obfuscatedExternalProfileId: z.string().optional(),
  orderId: z.string().optional(),
  paymentState: z.number().optional(),
  priceAmountMicros: z.string().optional(),
  priceChange: z.object({
    newPrice: z.object({
      currency: z.string(),
      priceMicros: z.string(),
    }),
    state: z.number(),
  }).optional(),
  priceCurrencyCode: z.string().optional(),
  profileId: z.string().optional(),
  profileName: z.string().optional(),
  promotionCode: z.string().optional(),
  promotionType: z.number().optional(),
  purchaseType: z.number().optional(),
  startTimeMillis: z.string().optional(),
  userCancellationTimeMillis: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Purchases.Subscriptions. Registered at `@swamp/gcp/androidpublisher/purchases-subscriptions`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/purchases-subscriptions",
  version: "2026.05.26.1",
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
      toVersion: "2026.05.18.1",
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
      toVersion: "2026.05.20.1",
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
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Deprecated: Use SubscriptionPurchaseV2 instead. A SubscriptionPurchase resour...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a subscriptions",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["subscriptionId"] !== undefined) {
          params["subscriptionId"] = String(g["subscriptionId"]);
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
      description: "Sync subscriptions state from GCP",
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
          if (g["subscriptionId"] !== undefined) {
            params["subscriptionId"] = String(g["subscriptionId"]);
          } else if (existing["subscriptionId"]) {
            params["subscriptionId"] = String(existing["subscriptionId"]);
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
        externalAccountIds: z.any().optional(),
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
        params["subscriptionId"] = existing["subscriptionId"]?.toString() ??
          g["subscriptionId"]?.toString() ?? "";
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["developerPayload"] !== undefined) {
          body["developerPayload"] = args["developerPayload"];
        }
        if (args["externalAccountIds"] !== undefined) {
          body["externalAccountIds"] = args["externalAccountIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.purchases.subscriptions.acknowledge",
            "path":
              "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:acknowledge",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "subscriptionId", "token"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "subscriptionId": { "location": "path", "required": true },
              "token": { "location": "path", "required": true },
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
        params["subscriptionId"] = existing["subscriptionId"]?.toString() ??
          g["subscriptionId"]?.toString() ?? "";
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.purchases.subscriptions.cancel",
            "path":
              "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "subscriptionId", "token"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "subscriptionId": { "location": "path", "required": true },
              "token": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    defer: {
      description: "defer",
      arguments: z.object({
        deferralInfo: z.any().optional(),
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
        params["subscriptionId"] = existing["subscriptionId"]?.toString() ??
          g["subscriptionId"]?.toString() ?? "";
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deferralInfo"] !== undefined) {
          body["deferralInfo"] = args["deferralInfo"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.purchases.subscriptions.defer",
            "path":
              "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:defer",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "subscriptionId", "token"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "subscriptionId": { "location": "path", "required": true },
              "token": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
        params["subscriptionId"] = existing["subscriptionId"]?.toString() ??
          g["subscriptionId"]?.toString() ?? "";
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.purchases.subscriptions.refund",
            "path":
              "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:refund",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "subscriptionId", "token"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "subscriptionId": { "location": "path", "required": true },
              "token": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    revoke: {
      description: "revoke",
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
        params["subscriptionId"] = existing["subscriptionId"]?.toString() ??
          g["subscriptionId"]?.toString() ?? "";
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.purchases.subscriptions.revoke",
            "path":
              "androidpublisher/v3/applications/{packageName}/purchases/subscriptions/{subscriptionId}/tokens/{token}:revoke",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "subscriptionId", "token"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "subscriptionId": { "location": "path", "required": true },
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
