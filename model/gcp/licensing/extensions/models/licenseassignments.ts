// Auto-generated extension model for @swamp/gcp/licensing/licenseassignments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Enterprise License Manager LicenseAssignments.
 *
 * Representation of a license assignment.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://licensing.googleapis.com/";

const GET_CONFIG = {
  "id": "licensing.licenseAssignments.get",
  "path": "apps/licensing/v1/product/{productId}/sku/{skuId}/user/{userId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "productId",
    "skuId",
    "userId",
  ],
  "parameters": {
    "productId": {
      "location": "path",
      "required": true,
    },
    "skuId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "licensing.licenseAssignments.insert",
  "path": "apps/licensing/v1/product/{productId}/sku/{skuId}/user",
  "httpMethod": "POST",
  "parameterOrder": [
    "productId",
    "skuId",
  ],
  "parameters": {
    "productId": {
      "location": "path",
      "required": true,
    },
    "skuId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "licensing.licenseAssignments.update",
  "path": "apps/licensing/v1/product/{productId}/sku/{skuId}/user/{userId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "productId",
    "skuId",
    "userId",
  ],
  "parameters": {
    "productId": {
      "location": "path",
      "required": true,
    },
    "skuId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "licensing.licenseAssignments.delete",
  "path": "apps/licensing/v1/product/{productId}/sku/{skuId}/user/{userId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "productId",
    "skuId",
    "userId",
  ],
  "parameters": {
    "productId": {
      "location": "path",
      "required": true,
    },
    "skuId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  userId: z.string().describe(
    "The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes.",
  ),
  etags: z.string().describe("ETag of the resource.").optional(),
  kind: z.string().describe(
    "Identifies the resource as a LicenseAssignment, which is `licensing#licenseAssignment`.",
  ).optional(),
  productId: z.string().describe(
    "A product's unique identifier. For more information about products in this version of the API, see Product and SKU IDs.",
  ).optional(),
  productName: z.string().describe("Display Name of the product.").optional(),
  selfLink: z.string().describe("Link to this page.").optional(),
  skuId: z.string().describe(
    "A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs.",
  ).optional(),
  skuName: z.string().describe("Display Name of the sku of the product.")
    .optional(),
});

const StateSchema = z.object({
  etags: z.string().optional(),
  kind: z.string().optional(),
  productId: z.string().optional(),
  productName: z.string().optional(),
  selfLink: z.string().optional(),
  skuId: z.string().optional(),
  skuName: z.string().optional(),
  userId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  userId: z.string().describe(
    "The user's current primary email address. If the user's email address changes, use the new email address in your API requests. Since a `userId` is subject to change, do not use a `userId` value as a key for persistent data. This key could break if the current user's email address changes. If the `userId` is suspended, the license status changes.",
  ).optional(),
  etags: z.string().describe("ETag of the resource.").optional(),
  kind: z.string().describe(
    "Identifies the resource as a LicenseAssignment, which is `licensing#licenseAssignment`.",
  ).optional(),
  productId: z.string().describe(
    "A product's unique identifier. For more information about products in this version of the API, see Product and SKU IDs.",
  ).optional(),
  productName: z.string().describe("Display Name of the product.").optional(),
  selfLink: z.string().describe("Link to this page.").optional(),
  skuId: z.string().describe(
    "A product SKU's unique identifier. For more information about available SKUs in this version of the API, see Products and SKUs.",
  ).optional(),
  skuName: z.string().describe("Display Name of the sku of the product.")
    .optional(),
});

/** Swamp extension model for Google Cloud Enterprise License Manager LicenseAssignments. Registered at `@swamp/gcp/licensing/licenseassignments`. */
export const model = {
  type: "@swamp/gcp/licensing/licenseassignments",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Representation of a license assignment.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a licenseAssignments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["skuId"] !== undefined) params["skuId"] = String(g["skuId"]);
        const body: Record<string, unknown> = {};
        if (g["userId"] !== undefined) body["userId"] = g["userId"];
        if (g["name"] !== undefined) params["userId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a licenseAssignments",
      arguments: z.object({
        identifier: z.string().describe("The name of the licenseAssignments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["skuId"] !== undefined) params["skuId"] = String(g["skuId"]);
        params["userId"] = args.identifier;
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
    update: {
      description: "Update licenseAssignments attributes",
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
        const params: Record<string, string> = { project: projectId };
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        } else if (existing["productId"]) {
          params["productId"] = String(existing["productId"]);
        }
        if (g["skuId"] !== undefined) params["skuId"] = String(g["skuId"]);
        else if (existing["skuId"]) params["skuId"] = String(existing["skuId"]);
        params["userId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["etags"] !== undefined) body["etags"] = g["etags"];
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["productName"] !== undefined) {
          body["productName"] = g["productName"];
        }
        if (g["selfLink"] !== undefined) body["selfLink"] = g["selfLink"];
        if (g["skuName"] !== undefined) body["skuName"] = g["skuName"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the licenseAssignments",
      arguments: z.object({
        identifier: z.string().describe("The name of the licenseAssignments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["skuId"] !== undefined) params["skuId"] = String(g["skuId"]);
        params["userId"] = args.identifier;
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
      description: "Sync licenseAssignments state from GCP",
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
          if (g["productId"] !== undefined) {
            params["productId"] = String(g["productId"]);
          } else if (existing["productId"]) {
            params["productId"] = String(existing["productId"]);
          }
          if (g["skuId"] !== undefined) params["skuId"] = String(g["skuId"]);
          else if (existing["skuId"]) {
            params["skuId"] = String(existing["skuId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["userId"] = identifier;
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
    list_for_product: {
      description: "list for product",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
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
        params["customerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "licensing.licenseAssignments.listForProduct",
            "path": "apps/licensing/v1/product/{productId}/users",
            "httpMethod": "GET",
            "parameterOrder": ["productId", "customerId"],
            "parameters": {
              "customerId": { "location": "query", "required": true },
              "maxResults": { "location": "query" },
              "pageToken": { "location": "query" },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    list_for_product_and_sku: {
      description: "list for product and sku",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["productId"] !== undefined) {
          params["productId"] = String(g["productId"]);
        }
        if (g["skuId"] !== undefined) params["skuId"] = String(g["skuId"]);
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
        params["customerId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "licensing.licenseAssignments.listForProductAndSku",
            "path": "apps/licensing/v1/product/{productId}/sku/{skuId}/users",
            "httpMethod": "GET",
            "parameterOrder": ["productId", "skuId", "customerId"],
            "parameters": {
              "customerId": { "location": "query", "required": true },
              "maxResults": { "location": "query" },
              "pageToken": { "location": "query" },
              "productId": { "location": "path", "required": true },
              "skuId": { "location": "path", "required": true },
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
