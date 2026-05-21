// Auto-generated extension model for @swamp/gcp/androidenterprise/products
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play EMM Products.
 *
 * A Products resource represents an app in the Google Play store that is available to at least some users in the enterprise. (Some apps are restricted to a single enterprise, and no information about them is made available outside that enterprise.) The information provided for each product (localized name, icon, link to the full Google Play details page) is intended to allow a basic representation of the product within an EMM user interface.
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

const BASE_URL = "https://androidenterprise.googleapis.com/";

const GET_CONFIG = {
  "id": "androidenterprise.products.get",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
    "productId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "language": {
      "location": "query",
    },
    "productId": {
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
  appRestrictionsSchema: z.object({
    kind: z.string(),
    restrictions: z.array(z.object({
      defaultValue: z.object({
        type: z.string(),
        valueBool: z.boolean(),
        valueInteger: z.number(),
        valueMultiselect: z.array(z.unknown()),
        valueString: z.string(),
      }),
      description: z.string(),
      entry: z.array(z.string()),
      entryValue: z.array(z.string()),
      key: z.string(),
      nestedRestriction: z.array(z.string()),
      restrictionType: z.string(),
      title: z.string(),
    })),
  }).optional(),
  appTracks: z.array(z.object({
    trackAlias: z.string(),
    trackId: z.string(),
  })).optional(),
  appVersion: z.array(z.object({
    isProduction: z.boolean(),
    targetSdkVersion: z.number(),
    track: z.string(),
    trackId: z.array(z.string()),
    versionCode: z.number(),
    versionString: z.string(),
  })).optional(),
  authorName: z.string().optional(),
  availableCountries: z.array(z.string()).optional(),
  availableTracks: z.array(z.string()).optional(),
  category: z.string().optional(),
  contentRating: z.string().optional(),
  description: z.string().optional(),
  detailsUrl: z.string().optional(),
  distributionChannel: z.string().optional(),
  features: z.array(z.string()).optional(),
  fullDescription: z.string().optional(),
  iconUrl: z.string().optional(),
  lastUpdatedTimestampMillis: z.string().optional(),
  minAndroidSdkVersion: z.number().optional(),
  permissions: z.array(z.object({
    permissionId: z.string(),
    state: z.string(),
  })).optional(),
  productId: z.string().optional(),
  productPricing: z.string().optional(),
  recentChanges: z.string().optional(),
  requiresContainerApp: z.boolean().optional(),
  screenshotUrls: z.array(z.string()).optional(),
  signingCertificate: z.object({
    certificateHashSha1: z.string(),
    certificateHashSha256: z.string(),
  }).optional(),
  smallIconUrl: z.string().optional(),
  title: z.string().optional(),
  workDetailsUrl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play EMM Products. Registered at `@swamp/gcp/androidenterprise/products`. */
export const model = {
  type: "@swamp/gcp/androidenterprise/products",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Products resource represents an app in the Google Play store that is availa...",
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
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        params["productId"] = args.identifier;
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
          if (g["enterpriseId"] !== undefined) {
            params["enterpriseId"] = String(g["enterpriseId"]);
          } else if (existing["enterpriseId"]) {
            params["enterpriseId"] = String(existing["enterpriseId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["productId"] = identifier;
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
    approve: {
      description: "approve",
      arguments: z.object({
        approvalUrlInfo: z.any().optional(),
        approvedPermissions: z.any().optional(),
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
        params["enterpriseId"] = existing["enterpriseId"]?.toString() ??
          g["enterpriseId"]?.toString() ?? "";
        params["productId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["approvalUrlInfo"] !== undefined) {
          body["approvalUrlInfo"] = args["approvalUrlInfo"];
        }
        if (args["approvedPermissions"] !== undefined) {
          body["approvedPermissions"] = args["approvedPermissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.products.approve",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/approve",
            "httpMethod": "POST",
            "parameterOrder": ["enterpriseId", "productId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    generate_approval_url: {
      description: "generate approval url",
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
        params["enterpriseId"] = existing["enterpriseId"]?.toString() ??
          g["enterpriseId"]?.toString() ?? "";
        params["productId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.products.generateApprovalUrl",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/generateApprovalUrl",
            "httpMethod": "POST",
            "parameterOrder": ["enterpriseId", "productId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
              "languageCode": { "location": "query" },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_app_restrictions_schema: {
      description: "get app restrictions schema",
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
        params["enterpriseId"] = existing["enterpriseId"]?.toString() ??
          g["enterpriseId"]?.toString() ?? "";
        params["productId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.products.getAppRestrictionsSchema",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/appRestrictionsSchema",
            "httpMethod": "GET",
            "parameterOrder": ["enterpriseId", "productId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
              "language": { "location": "query" },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_permissions: {
      description: "get permissions",
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
        params["enterpriseId"] = existing["enterpriseId"]?.toString() ??
          g["enterpriseId"]?.toString() ?? "";
        params["productId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.products.getPermissions",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/permissions",
            "httpMethod": "GET",
            "parameterOrder": ["enterpriseId", "productId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    unapprove: {
      description: "unapprove",
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
        params["enterpriseId"] = existing["enterpriseId"]?.toString() ??
          g["enterpriseId"]?.toString() ?? "";
        params["productId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidenterprise.products.unapprove",
            "path":
              "androidenterprise/v1/enterprises/{enterpriseId}/products/{productId}/unapprove",
            "httpMethod": "POST",
            "parameterOrder": ["enterpriseId", "productId"],
            "parameters": {
              "enterpriseId": { "location": "path", "required": true },
              "productId": { "location": "path", "required": true },
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
