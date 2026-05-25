// Auto-generated extension model for @swamp/gcp/securitycenter/resourcevalueconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Security Command Center ResourceValueConfigs.
 *
 * A resource value configuration (RVC) is a mapping configuration of user's resources to resource values. Used in Attack path simulations.
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
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/resourceValueConfigs/${shortName}`;
}

const BASE_URL = "https://securitycenter.googleapis.com/";

const GET_CONFIG = {
  "id": "securitycenter.organizations.resourceValueConfigs.get",
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

const PATCH_CONFIG = {
  "id": "securitycenter.organizations.resourceValueConfigs.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "securitycenter.organizations.resourceValueConfigs.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "securitycenter.organizations.resourceValueConfigs.list",
  "path": "v1/{+parent}/resourceValueConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  cloudProvider: z.enum([
    "CLOUD_PROVIDER_UNSPECIFIED",
    "GOOGLE_CLOUD_PLATFORM",
    "AMAZON_WEB_SERVICES",
    "MICROSOFT_AZURE",
  ]).describe("Cloud provider this configuration applies to").optional(),
  createTime: z.string().describe(
    "Output only. Timestamp this resource value configuration was created.",
  ).optional(),
  description: z.string().describe(
    "Description of the resource value configuration.",
  ).optional(),
  name: z.string().describe("Name for the resource value configuration")
    .optional(),
  resourceLabelsSelector: z.record(z.string(), z.string()).describe(
    'List of resource labels to search for, evaluated with `AND`. For example, `"resource_labels_selector": {"key": "value", "env": "prod"}` will match resources with labels "key": "value" `AND` "env": "prod" https://cloud.google.com/resource-manager/docs/creating-managing-labels',
  ).optional(),
  resourceType: z.string().describe(
    'Apply resource_value only to resources that match resource_type. resource_type will be checked with `AND` of other resources. For example, "storage.googleapis.com/Bucket" with resource_value "HIGH" will apply "HIGH" value only to "storage.googleapis.com/Bucket" resources.',
  ).optional(),
  resourceValue: z.enum([
    "RESOURCE_VALUE_UNSPECIFIED",
    "HIGH",
    "MEDIUM",
    "LOW",
    "NONE",
  ]).describe("Required. Resource value level this expression represents")
    .optional(),
  scope: z.string().describe(
    'Project or folder to scope this configuration to. For example, "project/456" would apply this configuration only to resources in "project/456" scope will be checked with `AND` of other resources.',
  ).optional(),
  sensitiveDataProtectionMapping: z.object({
    highSensitivityMapping: z.enum([
      "RESOURCE_VALUE_UNSPECIFIED",
      "HIGH",
      "MEDIUM",
      "LOW",
      "NONE",
    ]).describe(
      "Resource value mapping for high-sensitivity Sensitive Data Protection findings",
    ).optional(),
    mediumSensitivityMapping: z.enum([
      "RESOURCE_VALUE_UNSPECIFIED",
      "HIGH",
      "MEDIUM",
      "LOW",
      "NONE",
    ]).describe(
      "Resource value mapping for medium-sensitivity Sensitive Data Protection findings",
    ).optional(),
  }).describe(
    "Resource value mapping for Sensitive Data Protection findings. If any of these mappings have a resource value that is not unspecified, the resource_value field will be ignored when reading this configuration.",
  ).optional(),
  tagValues: z.array(z.string()).describe(
    'Required. Tag values combined with `AND` to check against. For Google Cloud resources, they are tag value IDs in the form of "tagValues/123". Example: `[ "tagValues/123", "tagValues/456", "tagValues/789" ]` https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing',
  ).optional(),
  updateTime: z.string().describe(
    "Output only. Timestamp this resource value configuration was last updated.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  cloudProvider: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  name: z.string(),
  resourceLabelsSelector: z.record(z.string(), z.unknown()).optional(),
  resourceType: z.string().optional(),
  resourceValue: z.string().optional(),
  scope: z.string().optional(),
  sensitiveDataProtectionMapping: z.object({
    highSensitivityMapping: z.string(),
    mediumSensitivityMapping: z.string(),
  }).optional(),
  tagValues: z.array(z.string()).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  cloudProvider: z.enum([
    "CLOUD_PROVIDER_UNSPECIFIED",
    "GOOGLE_CLOUD_PLATFORM",
    "AMAZON_WEB_SERVICES",
    "MICROSOFT_AZURE",
  ]).describe("Cloud provider this configuration applies to").optional(),
  createTime: z.string().describe(
    "Output only. Timestamp this resource value configuration was created.",
  ).optional(),
  description: z.string().describe(
    "Description of the resource value configuration.",
  ).optional(),
  name: z.string().describe("Name for the resource value configuration")
    .optional(),
  resourceLabelsSelector: z.record(z.string(), z.string()).describe(
    'List of resource labels to search for, evaluated with `AND`. For example, `"resource_labels_selector": {"key": "value", "env": "prod"}` will match resources with labels "key": "value" `AND` "env": "prod" https://cloud.google.com/resource-manager/docs/creating-managing-labels',
  ).optional(),
  resourceType: z.string().describe(
    'Apply resource_value only to resources that match resource_type. resource_type will be checked with `AND` of other resources. For example, "storage.googleapis.com/Bucket" with resource_value "HIGH" will apply "HIGH" value only to "storage.googleapis.com/Bucket" resources.',
  ).optional(),
  resourceValue: z.enum([
    "RESOURCE_VALUE_UNSPECIFIED",
    "HIGH",
    "MEDIUM",
    "LOW",
    "NONE",
  ]).describe("Required. Resource value level this expression represents")
    .optional(),
  scope: z.string().describe(
    'Project or folder to scope this configuration to. For example, "project/456" would apply this configuration only to resources in "project/456" scope will be checked with `AND` of other resources.',
  ).optional(),
  sensitiveDataProtectionMapping: z.object({
    highSensitivityMapping: z.enum([
      "RESOURCE_VALUE_UNSPECIFIED",
      "HIGH",
      "MEDIUM",
      "LOW",
      "NONE",
    ]).describe(
      "Resource value mapping for high-sensitivity Sensitive Data Protection findings",
    ).optional(),
    mediumSensitivityMapping: z.enum([
      "RESOURCE_VALUE_UNSPECIFIED",
      "HIGH",
      "MEDIUM",
      "LOW",
      "NONE",
    ]).describe(
      "Resource value mapping for medium-sensitivity Sensitive Data Protection findings",
    ).optional(),
  }).describe(
    "Resource value mapping for Sensitive Data Protection findings. If any of these mappings have a resource value that is not unspecified, the resource_value field will be ignored when reading this configuration.",
  ).optional(),
  tagValues: z.array(z.string()).describe(
    'Required. Tag values combined with `AND` to check against. For Google Cloud resources, they are tag value IDs in the form of "tagValues/123". Example: `[ "tagValues/123", "tagValues/456", "tagValues/789" ]` https://cloud.google.com/resource-manager/docs/tags/tags-creating-and-managing',
  ).optional(),
  updateTime: z.string().describe(
    "Output only. Timestamp this resource value configuration was last updated.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Security Command Center ResourceValueConfigs. Registered at `@swamp/gcp/securitycenter/resourcevalueconfigs`. */
export const model = {
  type: "@swamp/gcp/securitycenter/resourcevalueconfigs",
  version: "2026.05.25.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      description:
        "A resource value configuration (RVC) is a mapping configuration of user's res...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a resourceValueConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the resourceValueConfigs"),
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
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update resourceValueConfigs attributes",
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
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["cloudProvider"] !== undefined) {
          body["cloudProvider"] = g["cloudProvider"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["resourceLabelsSelector"] !== undefined) {
          body["resourceLabelsSelector"] = g["resourceLabelsSelector"];
        }
        if (g["resourceType"] !== undefined) {
          body["resourceType"] = g["resourceType"];
        }
        if (g["resourceValue"] !== undefined) {
          body["resourceValue"] = g["resourceValue"];
        }
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["sensitiveDataProtectionMapping"] !== undefined) {
          body["sensitiveDataProtectionMapping"] =
            g["sensitiveDataProtectionMapping"];
        }
        if (g["tagValues"] !== undefined) body["tagValues"] = g["tagValues"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
          PATCH_CONFIG,
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
      description: "Delete the resourceValueConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the resourceValueConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Sync resourceValueConfigs state from GCP",
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
    list: {
      description: "List resourceValueConfigs resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The number of results to return. The service may return fewer than this value. If unspecified, at most 10 configs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "resourceValueConfigs",
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
    batch_create: {
      description: "batch create",
      arguments: z.object({
        requests: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "securitycenter.organizations.resourceValueConfigs.batchCreate",
            "path": "v1/{+parent}/resourceValueConfigs:batchCreate",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
