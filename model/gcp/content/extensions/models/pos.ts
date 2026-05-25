// Auto-generated extension model for @swamp/gcp/content/pos
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Content for Shopping Pos.
 *
 * Store resource.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://shoppingcontent.googleapis.com/content/v2.1/";

const GET_CONFIG = {
  "id": "content.pos.get",
  "path": "{merchantId}/pos/{targetMerchantId}/store/{storeCode}",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
    "targetMerchantId",
    "storeCode",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "storeCode": {
      "location": "path",
      "required": true,
    },
    "targetMerchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "content.pos.insert",
  "path": "{merchantId}/pos/{targetMerchantId}/store",
  "httpMethod": "POST",
  "parameterOrder": [
    "merchantId",
    "targetMerchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "targetMerchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "content.pos.delete",
  "path": "{merchantId}/pos/{targetMerchantId}/store/{storeCode}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "merchantId",
    "targetMerchantId",
    "storeCode",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "storeCode": {
      "location": "path",
      "required": true,
    },
    "targetMerchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "content.pos.list",
  "path": "{merchantId}/pos/{targetMerchantId}/store",
  "httpMethod": "GET",
  "parameterOrder": [
    "merchantId",
    "targetMerchantId",
  ],
  "parameters": {
    "merchantId": {
      "location": "path",
      "required": true,
    },
    "targetMerchantId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  gcidCategory: z.array(z.string()).describe("The business type of the store.")
    .optional(),
  phoneNumber: z.string().describe("The store phone number.").optional(),
  placeId: z.string().describe("The Google Place Id of the store location.")
    .optional(),
  storeAddress: z.string().describe(
    "Required. The street address of the store.",
  ).optional(),
  storeCode: z.string().describe(
    "Required. A store identifier that is unique for the given merchant.",
  ).optional(),
  storeName: z.string().describe("The merchant or store name.").optional(),
  websiteUrl: z.string().describe("The website url for the store or merchant.")
    .optional(),
  merchantId: z.string().describe(
    "The ID of the POS or inventory data provider.",
  ),
  targetMerchantId: z.string().describe("The ID of the target merchant."),
});

const StateSchema = z.object({
  gcidCategory: z.array(z.string()).optional(),
  kind: z.string().optional(),
  matchingStatus: z.string().optional(),
  matchingStatusHint: z.string().optional(),
  phoneNumber: z.string().optional(),
  placeId: z.string().optional(),
  storeAddress: z.string().optional(),
  storeCode: z.string().optional(),
  storeName: z.string().optional(),
  websiteUrl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  gcidCategory: z.array(z.string()).describe("The business type of the store.")
    .optional(),
  phoneNumber: z.string().describe("The store phone number.").optional(),
  placeId: z.string().describe("The Google Place Id of the store location.")
    .optional(),
  storeAddress: z.string().describe(
    "Required. The street address of the store.",
  ).optional(),
  storeCode: z.string().describe(
    "Required. A store identifier that is unique for the given merchant.",
  ).optional(),
  storeName: z.string().describe("The merchant or store name.").optional(),
  websiteUrl: z.string().describe("The website url for the store or merchant.")
    .optional(),
  merchantId: z.string().describe(
    "The ID of the POS or inventory data provider.",
  ).optional(),
  targetMerchantId: z.string().describe("The ID of the target merchant.")
    .optional(),
});

/** Swamp extension model for Google Cloud Content for Shopping Pos. Registered at `@swamp/gcp/content/pos`. */
export const model = {
  type: "@swamp/gcp/content/pos",
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
      description: "Store resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a pos",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        if (g["targetMerchantId"] !== undefined) {
          params["targetMerchantId"] = String(g["targetMerchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["gcidCategory"] !== undefined) {
          body["gcidCategory"] = g["gcidCategory"];
        }
        if (g["phoneNumber"] !== undefined) {
          body["phoneNumber"] = g["phoneNumber"];
        }
        if (g["placeId"] !== undefined) body["placeId"] = g["placeId"];
        if (g["storeAddress"] !== undefined) {
          body["storeAddress"] = g["storeAddress"];
        }
        if (g["storeCode"] !== undefined) body["storeCode"] = g["storeCode"];
        if (g["storeName"] !== undefined) body["storeName"] = g["storeName"];
        if (g["websiteUrl"] !== undefined) body["websiteUrl"] = g["websiteUrl"];
        if (g["name"] !== undefined) params["storeCode"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "merchantId": String(g["merchantId"] ?? ""),
              "targetMerchantId": String(g["targetMerchantId"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a pos",
      arguments: z.object({
        identifier: z.string().describe("The name of the pos"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        if (g["targetMerchantId"] !== undefined) {
          params["targetMerchantId"] = String(g["targetMerchantId"]);
        }
        params["storeCode"] = args.identifier;
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
    delete: {
      description: "Delete the pos",
      arguments: z.object({
        identifier: z.string().describe("The name of the pos"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        if (g["targetMerchantId"] !== undefined) {
          params["targetMerchantId"] = String(g["targetMerchantId"]);
        }
        params["storeCode"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync pos state from GCP",
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
          if (g["merchantId"] !== undefined) {
            params["merchantId"] = String(g["merchantId"]);
          } else if (existing["merchantId"]) {
            params["merchantId"] = String(existing["merchantId"]);
          }
          if (g["targetMerchantId"] !== undefined) {
            params["targetMerchantId"] = String(g["targetMerchantId"]);
          } else if (existing["targetMerchantId"]) {
            params["targetMerchantId"] = String(existing["targetMerchantId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["storeCode"] = identifier;
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
    custombatch: {
      description: "custombatch",
      arguments: z.object({
        entries: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["entries"] !== undefined) body["entries"] = args["entries"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.pos.custombatch",
            "path": "pos/batch",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
    inventory: {
      description: "inventory",
      arguments: z.object({
        contentLanguage: z.any().optional(),
        gtin: z.any().optional(),
        itemId: z.any().optional(),
        pickupMethod: z.any().optional(),
        pickupSla: z.any().optional(),
        price: z.any().optional(),
        quantity: z.any().optional(),
        storeCode: z.any().optional(),
        targetCountry: z.any().optional(),
        timestamp: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        if (g["targetMerchantId"] !== undefined) {
          params["targetMerchantId"] = String(g["targetMerchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["contentLanguage"] !== undefined) {
          body["contentLanguage"] = args["contentLanguage"];
        }
        if (args["gtin"] !== undefined) body["gtin"] = args["gtin"];
        if (args["itemId"] !== undefined) body["itemId"] = args["itemId"];
        if (args["pickupMethod"] !== undefined) {
          body["pickupMethod"] = args["pickupMethod"];
        }
        if (args["pickupSla"] !== undefined) {
          body["pickupSla"] = args["pickupSla"];
        }
        if (args["price"] !== undefined) body["price"] = args["price"];
        if (args["quantity"] !== undefined) body["quantity"] = args["quantity"];
        if (args["storeCode"] !== undefined) {
          body["storeCode"] = args["storeCode"];
        }
        if (args["targetCountry"] !== undefined) {
          body["targetCountry"] = args["targetCountry"];
        }
        if (args["timestamp"] !== undefined) {
          body["timestamp"] = args["timestamp"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.pos.inventory",
            "path": "{merchantId}/pos/{targetMerchantId}/inventory",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "targetMerchantId"],
            "parameters": {
              "merchantId": { "location": "path", "required": true },
              "targetMerchantId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    sale: {
      description: "sale",
      arguments: z.object({
        contentLanguage: z.any().optional(),
        gtin: z.any().optional(),
        itemId: z.any().optional(),
        price: z.any().optional(),
        quantity: z.any().optional(),
        saleId: z.any().optional(),
        storeCode: z.any().optional(),
        targetCountry: z.any().optional(),
        timestamp: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["merchantId"] !== undefined) {
          params["merchantId"] = String(g["merchantId"]);
        }
        if (g["targetMerchantId"] !== undefined) {
          params["targetMerchantId"] = String(g["targetMerchantId"]);
        }
        const body: Record<string, unknown> = {};
        if (args["contentLanguage"] !== undefined) {
          body["contentLanguage"] = args["contentLanguage"];
        }
        if (args["gtin"] !== undefined) body["gtin"] = args["gtin"];
        if (args["itemId"] !== undefined) body["itemId"] = args["itemId"];
        if (args["price"] !== undefined) body["price"] = args["price"];
        if (args["quantity"] !== undefined) body["quantity"] = args["quantity"];
        if (args["saleId"] !== undefined) body["saleId"] = args["saleId"];
        if (args["storeCode"] !== undefined) {
          body["storeCode"] = args["storeCode"];
        }
        if (args["targetCountry"] !== undefined) {
          body["targetCountry"] = args["targetCountry"];
        }
        if (args["timestamp"] !== undefined) {
          body["timestamp"] = args["timestamp"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "content.pos.sale",
            "path": "{merchantId}/pos/{targetMerchantId}/sale",
            "httpMethod": "POST",
            "parameterOrder": ["merchantId", "targetMerchantId"],
            "parameters": {
              "merchantId": { "location": "path", "required": true },
              "targetMerchantId": { "location": "path", "required": true },
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
