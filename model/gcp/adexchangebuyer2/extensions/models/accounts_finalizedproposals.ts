// Auto-generated extension model for @swamp/gcp/adexchangebuyer2/accounts-finalizedproposals
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.FinalizedProposals.
 *
 * Represents a proposal in the Marketplace. A proposal is the unit of negotiation between a seller and a buyer and contains deals which are served. Note: You can't update, create, or otherwise modify Private Auction deals through the API. Fields are updatable unless noted otherwise.
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
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://adexchangebuyer.googleapis.com/";

const LIST_CONFIG = {
  "id": "adexchangebuyer2.accounts.finalizedProposals.list",
  "path": "v2beta1/accounts/{accountId}/finalizedProposals",
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
    "filterSyntax": {
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
  billedBuyer: z.object({
    accountId: z.string(),
  }).optional(),
  buyer: z.object({
    accountId: z.string(),
  }).optional(),
  buyerContacts: z.array(z.object({
    email: z.string(),
    name: z.string(),
  })).optional(),
  buyerPrivateData: z.object({
    referenceId: z.string(),
  }).optional(),
  deals: z.array(z.object({
    availableEndTime: z.string(),
    availableStartTime: z.string(),
    buyerPrivateData: z.object({
      referenceId: z.string(),
    }),
    createProductId: z.string(),
    createProductRevision: z.string(),
    createTime: z.string(),
    creativePreApprovalPolicy: z.string(),
    creativeRestrictions: z.object({
      creativeFormat: z.string(),
      creativeSpecifications: z.array(z.object({
        creativeCompanionSizes: z.unknown(),
        creativeSize: z.unknown(),
      })),
      skippableAdType: z.string(),
    }),
    creativeSafeFrameCompatibility: z.string(),
    dealId: z.string(),
    dealServingMetadata: z.object({
      dealPauseStatus: z.object({
        buyerPauseReason: z.string(),
        firstPausedBy: z.string(),
        hasBuyerPaused: z.boolean(),
        hasSellerPaused: z.boolean(),
        sellerPauseReason: z.string(),
      }),
    }),
    dealTerms: z.object({
      brandingType: z.string(),
      description: z.string(),
      estimatedGrossSpend: z.object({
        amount: z.object({
          currencyCode: z.unknown(),
          nanos: z.unknown(),
          units: z.unknown(),
        }),
        pricingType: z.string(),
      }),
      estimatedImpressionsPerDay: z.string(),
      guaranteedFixedPriceTerms: z.object({
        fixedPrices: z.array(z.unknown()),
        guaranteedImpressions: z.string(),
        guaranteedLooks: z.string(),
        impressionCap: z.string(),
        minimumDailyLooks: z.string(),
        percentShareOfVoice: z.string(),
        reservationType: z.string(),
      }),
      nonGuaranteedAuctionTerms: z.object({
        autoOptimizePrivateAuction: z.boolean(),
        reservePricesPerBuyer: z.array(z.unknown()),
      }),
      nonGuaranteedFixedPriceTerms: z.object({
        fixedPrices: z.array(z.unknown()),
      }),
      sellerTimeZone: z.string(),
    }),
    deliveryControl: z.object({
      creativeBlockingLevel: z.string(),
      deliveryRateType: z.string(),
      frequencyCaps: z.array(z.object({
        maxImpressions: z.unknown(),
        numTimeUnits: z.unknown(),
        timeUnitType: z.unknown(),
      })),
    }),
    description: z.string(),
    displayName: z.string(),
    externalDealId: z.string(),
    isSetupComplete: z.boolean(),
    programmaticCreativeSource: z.string(),
    proposalId: z.string(),
    sellerContacts: z.array(z.object({
      email: z.string(),
      name: z.string(),
    })),
    syndicationProduct: z.string(),
    targeting: z.object({
      geoTargeting: z.object({
        excludedCriteriaIds: z.array(z.unknown()),
        targetedCriteriaIds: z.array(z.unknown()),
      }),
      inventorySizeTargeting: z.object({
        excludedInventorySizes: z.array(z.unknown()),
        targetedInventorySizes: z.array(z.unknown()),
      }),
      placementTargeting: z.object({
        mobileApplicationTargeting: z.object({
          firstPartyTargeting: z.unknown(),
        }),
        urlTargeting: z.object({
          excludedUrls: z.unknown(),
          targetedUrls: z.unknown(),
        }),
      }),
      technologyTargeting: z.object({
        deviceCapabilityTargeting: z.object({
          excludedCriteriaIds: z.unknown(),
          targetedCriteriaIds: z.unknown(),
        }),
        deviceCategoryTargeting: z.object({
          excludedCriteriaIds: z.unknown(),
          targetedCriteriaIds: z.unknown(),
        }),
        operatingSystemTargeting: z.object({
          operatingSystemCriteria: z.unknown(),
          operatingSystemVersionCriteria: z.unknown(),
        }),
      }),
      videoTargeting: z.object({
        excludedPositionTypes: z.array(z.unknown()),
        targetedPositionTypes: z.array(z.unknown()),
      }),
    }),
    targetingCriterion: z.array(z.object({
      exclusions: z.array(z.unknown()),
      inclusions: z.array(z.unknown()),
      key: z.string(),
    })),
    updateTime: z.string(),
    webPropertyCode: z.string(),
  })).optional(),
  displayName: z.string().optional(),
  isRenegotiating: z.boolean().optional(),
  isSetupComplete: z.boolean().optional(),
  lastUpdaterOrCommentorRole: z.string().optional(),
  notes: z.array(z.object({
    createTime: z.string(),
    creatorRole: z.string(),
    note: z.string(),
    noteId: z.string(),
    proposalRevision: z.string(),
  })).optional(),
  originatorRole: z.string().optional(),
  privateAuctionId: z.string().optional(),
  proposalId: z.string().optional(),
  proposalRevision: z.string().optional(),
  proposalState: z.string().optional(),
  seller: z.object({
    accountId: z.string(),
    subAccountId: z.string(),
  }).optional(),
  sellerContacts: z.array(z.object({
    email: z.string(),
    name: z.string(),
  })).optional(),
  termsAndConditions: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Ad Exchange Buyer Accounts.FinalizedProposals. Registered at `@swamp/gcp/adexchangebuyer2/accounts-finalizedproposals`. */
export const model = {
  type: "@swamp/gcp/adexchangebuyer2/accounts-finalizedproposals",
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
        "Represents a proposal in the Marketplace. A proposal is the unit of negotiati...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a finalizedProposals",
      arguments: z.object({
        identifier: z.string().describe("The name of the finalizedProposals"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
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
      description: "Sync finalizedProposals state from GCP",
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
      description: "List finalizedProposals resources",
      arguments: z.object({
        filter: z.string().describe(
          "An optional PQL filter query used to query for proposals. Nested repeated fields, such as proposal.deals.targetingCriterion, cannot be filtered.",
        ).optional(),
        filterSyntax: z.string().describe(
          "Syntax the filter is written in. Current implementation defaults to PQL but in the future it will be LIST_FILTER.",
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
        if (args["filterSyntax"] !== undefined) {
          params["filterSyntax"] = String(args["filterSyntax"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "proposals",
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
    pause: {
      description: "pause",
      arguments: z.object({
        externalDealIds: z.any().optional(),
        reason: z.any().optional(),
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
        params["accountId"] = existing["accountId"]?.toString() ??
          g["accountId"]?.toString() ?? "";
        params["proposalId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["externalDealIds"] !== undefined) {
          body["externalDealIds"] = args["externalDealIds"];
        }
        if (args["reason"] !== undefined) body["reason"] = args["reason"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "adexchangebuyer2.accounts.finalizedProposals.pause",
            "path":
              "v2beta1/accounts/{accountId}/finalizedProposals/{proposalId}:pause",
            "httpMethod": "POST",
            "parameterOrder": ["accountId", "proposalId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "proposalId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    resume: {
      description: "resume",
      arguments: z.object({
        externalDealIds: z.any().optional(),
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
        params["accountId"] = existing["accountId"]?.toString() ??
          g["accountId"]?.toString() ?? "";
        params["proposalId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["externalDealIds"] !== undefined) {
          body["externalDealIds"] = args["externalDealIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "adexchangebuyer2.accounts.finalizedProposals.resume",
            "path":
              "v2beta1/accounts/{accountId}/finalizedProposals/{proposalId}:resume",
            "httpMethod": "POST",
            "parameterOrder": ["accountId", "proposalId"],
            "parameters": {
              "accountId": { "location": "path", "required": true },
              "proposalId": { "location": "path", "required": true },
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
