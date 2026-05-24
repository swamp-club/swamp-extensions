// Auto-generated extension model for @swamp/gcp/androidpublisher/purchases-subscriptionsv2
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Purchases.Subscriptionsv2.
 *
 * Indicates the status of a user's subscription purchase.
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
  "id": "androidpublisher.purchases.subscriptionsv2.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/purchases/subscriptionsv2/tokens/{token}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "token",
  ],
  "parameters": {
    "packageName": {
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
  acknowledgementState: z.string().optional(),
  canceledStateContext: z.object({
    developerInitiatedCancellation: z.object({}),
    replacementCancellation: z.object({}),
    systemInitiatedCancellation: z.object({}),
    userInitiatedCancellation: z.object({
      cancelSurveyResult: z.object({
        reason: z.string(),
        reasonUserInput: z.string(),
      }),
      cancelTime: z.string(),
    }),
  }).optional(),
  etag: z.string().optional(),
  externalAccountIdentifiers: z.object({
    externalAccountId: z.string(),
    obfuscatedExternalAccountId: z.string(),
    obfuscatedExternalProfileId: z.string(),
  }).optional(),
  inGracePeriodStateContext: z.object({
    renewalDeclined: z.object({
      pendingOrderId: z.string(),
    }),
  }).optional(),
  kind: z.string().optional(),
  latestOrderId: z.string().optional(),
  lineItems: z.array(z.object({
    autoRenewingPlan: z.object({
      autoRenewEnabled: z.boolean(),
      installmentDetails: z.object({
        initialCommittedPaymentsCount: z.number(),
        pendingCancellation: z.object({}),
        remainingCommittedPaymentsCount: z.number(),
        subsequentCommittedPaymentsCount: z.number(),
      }),
      priceChangeDetails: z.object({
        expectedNewPriceChargeTime: z.string(),
        newPrice: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
        priceChangeMode: z.string(),
        priceChangeState: z.string(),
      }),
      priceStepUpConsentDetails: z.object({
        consentDeadlineTime: z.string(),
        newPrice: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
        state: z.string(),
      }),
      recurringPrice: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
    }),
    deferredItemRemoval: z.object({}),
    deferredItemReplacement: z.object({
      productId: z.string(),
    }),
    expiryTime: z.string(),
    itemReplacement: z.object({
      basePlanId: z.string(),
      offerId: z.string(),
      productId: z.string(),
      replacementMode: z.string(),
    }),
    latestSuccessfulOrderId: z.string(),
    offerDetails: z.object({
      basePlanId: z.string(),
      offerId: z.string(),
      offerTags: z.array(z.string()),
    }),
    offerPhase: z.object({
      basePrice: z.object({}),
      freeTrial: z.object({}),
      introductoryPrice: z.object({}),
      prorationPeriod: z.object({
        originalOfferPhaseType: z.string(),
      }),
    }),
    prepaidPlan: z.object({
      allowExtendAfterTime: z.string(),
    }),
    productId: z.string(),
    signupPromotion: z.object({
      oneTimeCode: z.object({}),
      vanityCode: z.object({
        promotionCode: z.string(),
      }),
    }),
  })).optional(),
  linkedPurchaseToken: z.string().optional(),
  onHoldStateContext: z.object({
    renewalDeclined: z.object({
      pendingOrderId: z.string(),
    }),
  }).optional(),
  outOfAppPurchaseContext: z.object({
    expiredExternalAccountIdentifiers: z.object({
      externalAccountId: z.string(),
      obfuscatedExternalAccountId: z.string(),
      obfuscatedExternalProfileId: z.string(),
    }),
    expiredPurchaseToken: z.string(),
  }).optional(),
  pausedStateContext: z.object({
    autoResumeTime: z.string(),
  }).optional(),
  regionCode: z.string().optional(),
  startTime: z.string().optional(),
  subscribeWithGoogleInfo: z.object({
    emailAddress: z.string(),
    familyName: z.string(),
    givenName: z.string(),
    profileId: z.string(),
    profileName: z.string(),
  }).optional(),
  subscriptionState: z.string().optional(),
  testPurchase: z.object({}).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Purchases.Subscriptionsv2. Registered at `@swamp/gcp/androidpublisher/purchases-subscriptionsv2`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/purchases-subscriptionsv2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Indicates the status of a user's subscription purchase.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a subscriptionsv2",
      arguments: z.object({
        identifier: z.string().describe("The name of the subscriptionsv2"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
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
      description: "Sync subscriptionsv2 state from GCP",
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
    cancel: {
      description: "cancel",
      arguments: z.object({
        cancellationContext: z.any().optional(),
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
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["cancellationContext"] !== undefined) {
          body["cancellationContext"] = args["cancellationContext"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.purchases.subscriptionsv2.cancel",
            "path":
              "androidpublisher/v3/applications/{packageName}/purchases/subscriptionsv2/tokens/{token}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "token"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "token": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    defer: {
      description: "defer",
      arguments: z.object({
        deferralContext: z.any().optional(),
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
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["deferralContext"] !== undefined) {
          body["deferralContext"] = args["deferralContext"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.purchases.subscriptionsv2.defer",
            "path":
              "androidpublisher/v3/applications/{packageName}/purchases/subscriptionsv2/tokens/{token}:defer",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "token"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "token": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    revoke: {
      description: "revoke",
      arguments: z.object({
        revocationContext: z.any().optional(),
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
        params["token"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["revocationContext"] !== undefined) {
          body["revocationContext"] = args["revocationContext"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.purchases.subscriptionsv2.revoke",
            "path":
              "androidpublisher/v3/applications/{packageName}/purchases/subscriptionsv2/tokens/{token}:revoke",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "token"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "token": { "location": "path", "required": true },
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
