// Auto-generated extension model for @swamp/gcp/dfareporting/inventoryitems
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 InventoryItems.
 *
 * Represents a buy from the Planning inventory store.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v4/";

const GET_CONFIG = {
  "id": "dfareporting.inventoryItems.get",
  "path": "userprofiles/{+profileId}/projects/{projectId}/inventoryItems/{+id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
    "projectId",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dfareporting.inventoryItems.list",
  "path": "userprofiles/{+profileId}/projects/{projectId}/inventoryItems",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
    "projectId",
  ],
  "parameters": {
    "ids": {
      "location": "query",
    },
    "inPlan": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderId": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "siteId": {
      "location": "query",
    },
    "sortField": {
      "location": "query",
    },
    "sortOrder": {
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  adSlots: z.array(z.object({
    comment: z.string(),
    compatibility: z.string(),
    height: z.string(),
    linkedPlacementId: z.string(),
    name: z.string(),
    paymentSourceType: z.string(),
    primary: z.boolean(),
    width: z.string(),
  })).optional(),
  advertiserId: z.string().optional(),
  contentCategoryId: z.string().optional(),
  estimatedClickThroughRate: z.string().optional(),
  estimatedConversionRate: z.string().optional(),
  id: z.string(),
  inPlan: z.boolean().optional(),
  kind: z.string().optional(),
  lastModifiedInfo: z.object({
    time: z.string(),
  }).optional(),
  name: z.string().optional(),
  negotiationChannelId: z.string().optional(),
  orderId: z.string().optional(),
  placementStrategyId: z.string().optional(),
  pricing: z.object({
    capCostType: z.string(),
    endDate: z.string(),
    flights: z.array(z.object({
      endDate: z.string(),
      rateOrCost: z.string(),
      startDate: z.string(),
      units: z.string(),
    })),
    groupType: z.string(),
    pricingType: z.string(),
    startDate: z.string(),
  }).optional(),
  projectId: z.string().optional(),
  rfpId: z.string().optional(),
  siteId: z.string().optional(),
  subaccountId: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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

/** Swamp extension model for Google Cloud Campaign Manager 360 InventoryItems. Registered at `@swamp/gcp/dfareporting/inventoryitems`. */
export const model = {
  type: "@swamp/gcp/dfareporting/inventoryitems",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a buy from the Planning inventory store.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a inventoryItems",
      arguments: z.object({
        identifier: z.string().describe("The id of the inventoryItems"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Sync inventoryItems state from GCP",
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
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
      description: "List inventoryItems resources",
      arguments: z.object({
        ids: z.string().describe("Select only inventory items with these IDs.")
          .optional(),
        inPlan: z.boolean().describe(
          "Select only inventory items that are in plan.",
        ).optional(),
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        orderId: z.string().describe(
          "Select only inventory items that belong to specified orders.",
        ).optional(),
        siteId: z.string().describe(
          "Select only inventory items that are associated with these sites.",
        ).optional(),
        sortField: z.string().describe("Field by which to sort the list.")
          .optional(),
        sortOrder: z.string().describe("Order of sorted results.").optional(),
        type: z.string().describe("Select only inventory items with this type.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (args["ids"] !== undefined) params["ids"] = String(args["ids"]);
        if (args["inPlan"] !== undefined) {
          params["inPlan"] = String(args["inPlan"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderId"] !== undefined) {
          params["orderId"] = String(args["orderId"]);
        }
        if (args["siteId"] !== undefined) {
          params["siteId"] = String(args["siteId"]);
        }
        if (args["sortField"] !== undefined) {
          params["sortField"] = String(args["sortField"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        if (args["type"] !== undefined) params["type"] = String(args["type"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "inventoryItems",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
