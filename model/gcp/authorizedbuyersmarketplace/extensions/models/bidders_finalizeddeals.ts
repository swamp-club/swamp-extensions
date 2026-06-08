// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/authorizedbuyersmarketplace/bidders-finalizeddeals
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Authorized Buyers Marketplace Bidders.FinalizedDeals.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://authorizedbuyersmarketplace.googleapis.com/";

const LIST_CONFIG = {
  "id": "authorizedbuyersmarketplace.bidders.finalizedDeals.list",
  "path": "v1/{+parent}/finalizedDeals",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Authorized Buyers Marketplace Bidders.FinalizedDeals. Registered at `@swamp/gcp/authorizedbuyersmarketplace/bidders-finalizeddeals`. */
export const model = {
  type: "@swamp/gcp/authorizedbuyersmarketplace/bidders-finalizeddeals",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
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
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
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
    sync: {
      description: "Sync finalizedDeals state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            BASE_URL,
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
      description: "List finalizedDeals resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional query string using the [Cloud API list filtering syntax](https://developers.google.com/authorized-buyers/apis/guides/list-filters) Supported columns for filtering are: * deal.displayName * deal.dealType * deal.createTime * deal.updateTime * deal.flightStartTime * deal.flightEndTime * deal.eligibleSeatIds * dealServingStatus * readyToServe",
        ).optional(),
        orderBy: z.string().describe(
          "An optional query string to sort finalized deals using the [Cloud API sorting syntax](https://cloud.google.com/apis/design/design_patterns#sorting_order). If no sort order is specified, results will be returned in an arbitrary order. Supported columns for sorting are: * deal.displayName * deal.createTime * deal.updateTime * deal.flightStartTime * deal.flightEndTime * rtbMetrics.bidRequests7Days * rtbMetrics.bids7Days * rtbMetrics.adImpressions7Days * rtbMetrics.bidRate7Days * rtbMetrics.filteredBidRate7Days * rtbMetrics.mustBidRateCurrentMonth",
        ).optional(),
        pageSize: z.number().describe(
          "Requested page size. The server may return fewer results than requested. If requested more than 500, the server will return 500 results per page. If unspecified, the server will pick a default page size of 100.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "finalizedDeals",
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
    set_ready_to_serve: {
      description: "set ready to serve",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
              "authorizedbuyersmarketplace.bidders.finalizedDeals.setReadyToServe",
            "path": "v1/{+deal}:setReadyToServe",
            "httpMethod": "POST",
            "parameterOrder": ["deal"],
            "parameters": { "deal": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
