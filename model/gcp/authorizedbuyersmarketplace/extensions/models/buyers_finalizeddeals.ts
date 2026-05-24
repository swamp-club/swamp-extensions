// Auto-generated extension model for @swamp/gcp/authorizedbuyersmarketplace/buyers-finalizeddeals
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Authorized Buyers Marketplace Buyers.FinalizedDeals.
 *
 * A finalized deal is a snapshot of the deal when both buyer and seller accept the deal. The buyer or seller can update the deal after it's been finalized and renegotiate on the deal targeting, terms and other fields, while at the same time the finalized snapshot of the deal can still be retrieved using this API. The finalized deal contains a copy of the deal as it existed when most recently finalized, as well as fields related to deal serving such as pause/resume status, RTB metrics, and more.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/finalizedDeals/${shortName}`;
}

const BASE_URL = "https://authorizedbuyersmarketplace.googleapis.com/";

const GET_CONFIG = {
  "id": "authorizedbuyersmarketplace.buyers.finalizedDeals.get",
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
  deal: z.object({
    billedBuyer: z.string(),
    buyer: z.string(),
    buyerPermissionType: z.string(),
    client: z.string(),
    createTime: z.string(),
    creativeRequirements: z.object({
      creativeFormat: z.string(),
      creativePreApprovalPolicy: z.string(),
      creativeSafeFrameCompatibility: z.string(),
      maxAdDurationMs: z.string(),
      programmaticCreativeSource: z.string(),
      skippableAdType: z.string(),
    }),
    dealType: z.string(),
    deliveryControl: z.object({
      companionDeliveryType: z.string(),
      creativeRotationType: z.string(),
      deliveryRateType: z.string(),
      frequencyCap: z.array(z.object({
        maxImpressions: z.number(),
        timeUnitType: z.string(),
        timeUnitsCount: z.number(),
      })),
      roadblockingType: z.string(),
    }),
    description: z.string(),
    displayName: z.string(),
    eligibleSeatIds: z.array(z.string()),
    estimatedGrossSpend: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
    flightEndTime: z.string(),
    flightStartTime: z.string(),
    mediaPlanner: z.object({
      accountId: z.string(),
      ancestorNames: z.array(z.string()),
      displayName: z.string(),
      name: z.string(),
    }),
    name: z.string(),
    preferredDealTerms: z.object({
      fixedPrice: z.object({
        amount: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        type: z.string(),
      }),
    }),
    privateAuctionTerms: z.object({
      floorPrice: z.object({
        amount: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        type: z.string(),
      }),
      openAuctionAllowed: z.boolean(),
    }),
    programmaticGuaranteedTerms: z.object({
      fixedPrice: z.object({
        amount: z.object({
          currencyCode: z.string(),
          nanos: z.number(),
          units: z.string(),
        }),
        type: z.string(),
      }),
      guaranteedLooks: z.string(),
      impressionCap: z.string(),
      minimumDailyLooks: z.string(),
      percentShareOfVoice: z.string(),
      reservationType: z.string(),
    }),
    proposalRevision: z.string(),
    publisherProfile: z.string(),
    sellerTimeZone: z.object({
      id: z.string(),
      version: z.string(),
    }),
    targeting: z.object({
      daypartTargeting: z.object({
        dayParts: z.array(z.object({
          dayOfWeek: z.unknown(),
          endTime: z.unknown(),
          startTime: z.unknown(),
        })),
        timeZoneType: z.string(),
      }),
      excludedSensitiveCategoryIds: z.array(z.string()),
      geoTargeting: z.object({
        excludedCriteriaIds: z.array(z.string()),
        targetedCriteriaIds: z.array(z.string()),
      }),
      inventorySizeTargeting: z.object({
        excludedInventorySizes: z.array(z.object({
          height: z.unknown(),
          type: z.unknown(),
          width: z.unknown(),
        })),
        targetedInventorySizes: z.array(z.object({
          height: z.unknown(),
          type: z.unknown(),
          width: z.unknown(),
        })),
      }),
      inventoryTypeTargeting: z.object({
        inventoryTypes: z.array(z.string()),
      }),
      placementTargeting: z.object({
        mobileApplicationTargeting: z.object({
          firstPartyTargeting: z.object({
            excludedAppIds: z.unknown(),
            targetedAppIds: z.unknown(),
          }),
        }),
        uriTargeting: z.object({
          excludedUris: z.array(z.unknown()),
          targetedUris: z.array(z.unknown()),
        }),
      }),
      technologyTargeting: z.object({
        deviceCapabilityTargeting: z.object({
          excludedCriteriaIds: z.array(z.unknown()),
          targetedCriteriaIds: z.array(z.unknown()),
        }),
        deviceCategoryTargeting: z.object({
          excludedCriteriaIds: z.array(z.unknown()),
          targetedCriteriaIds: z.array(z.unknown()),
        }),
        operatingSystemTargeting: z.object({
          operatingSystemCriteria: z.object({
            excludedCriteriaIds: z.unknown(),
            targetedCriteriaIds: z.unknown(),
          }),
          operatingSystemVersionCriteria: z.object({
            excludedCriteriaIds: z.unknown(),
            targetedCriteriaIds: z.unknown(),
          }),
        }),
      }),
      userListTargeting: z.object({
        excludedCriteriaIds: z.array(z.string()),
        targetedCriteriaIds: z.array(z.string()),
      }),
      verticalTargeting: z.object({
        excludedCriteriaIds: z.array(z.string()),
        targetedCriteriaIds: z.array(z.string()),
      }),
      videoTargeting: z.object({
        excludedPositionTypes: z.array(z.string()),
        targetedPositionTypes: z.array(z.string()),
      }),
    }),
    updateTime: z.string(),
  }).optional(),
  dealPausingInfo: z.object({
    pauseReason: z.string(),
    pauseRole: z.string(),
    pausingConsented: z.boolean(),
  }).optional(),
  dealServingStatus: z.string().optional(),
  name: z.string(),
  readyToServe: z.boolean().optional(),
  rtbMetrics: z.object({
    adImpressions7Days: z.string(),
    bidRate7Days: z.number(),
    bidRequests7Days: z.string(),
    bids7Days: z.string(),
    filteredBidRate7Days: z.number(),
    mustBidRateCurrentMonth: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Authorized Buyers Marketplace Buyers.FinalizedDeals. Registered at `@swamp/gcp/authorizedbuyersmarketplace/buyers-finalizeddeals`. */
export const model = {
  type: "@swamp/gcp/authorizedbuyersmarketplace/buyers-finalizeddeals",
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
        "A finalized deal is a snapshot of the deal when both buyer and seller accept ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a finalizedDeals",
      arguments: z.object({
        identifier: z.string().describe("The name of the finalizedDeals"),
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
      description: "Sync finalizedDeals state from GCP",
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
    add_creative: {
      description: "add creative",
      arguments: z.object({
        creative: z.any().optional(),
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
        params["deal"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["creative"] !== undefined) body["creative"] = args["creative"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "authorizedbuyersmarketplace.buyers.finalizedDeals.addCreative",
            "path": "v1/{+deal}:addCreative",
            "httpMethod": "POST",
            "parameterOrder": ["deal"],
            "parameters": { "deal": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    pause: {
      description: "pause",
      arguments: z.object({
        reason: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["reason"] !== undefined) body["reason"] = args["reason"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "authorizedbuyersmarketplace.buyers.finalizedDeals.pause",
            "path": "v1/{+name}:pause",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    resume: {
      description: "resume",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "authorizedbuyersmarketplace.buyers.finalizedDeals.resume",
            "path": "v1/{+name}:resume",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_ready_to_serve: {
      description: "set ready to serve",
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
        params["deal"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "authorizedbuyersmarketplace.buyers.finalizedDeals.setReadyToServe",
            "path": "v1/{+deal}:setReadyToServe",
            "httpMethod": "POST",
            "parameterOrder": ["deal"],
            "parameters": { "deal": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
