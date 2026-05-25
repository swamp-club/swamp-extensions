// Auto-generated extension model for @swamp/gcp/appengine/apps-services
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Engine Admin Apps.Services.
 *
 * A Service resource is a logical component of an application that can share state and communicate in a secure fashion with other services. For example, an application that handles customer requests might include separate services to handle tasks such as backend data analysis or API requests from mobile devices. Each service has a collection of versions that define a specific set of code used to implement the functionality of that service.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://appengine.googleapis.com/";

const GET_CONFIG = {
  "id": "appengine.apps.services.get",
  "path": "v1/apps/{appsId}/services/{servicesId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "appsId",
    "servicesId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "servicesId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "appengine.apps.services.patch",
  "path": "v1/apps/{appsId}/services/{servicesId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "appsId",
    "servicesId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "migrateTraffic": {
      "location": "query",
    },
    "servicesId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "appengine.apps.services.delete",
  "path": "v1/apps/{appsId}/services/{servicesId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "appsId",
    "servicesId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "servicesId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "appengine.apps.services.list",
  "path": "v1/apps/{appsId}/services",
  "httpMethod": "GET",
  "parameterOrder": [
    "appsId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
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
  generatedCustomerMetadata: z.record(z.string(), z.string()).describe(
    "Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetServiceRequest",
  ).optional(),
  id: z.string().describe(
    "Output only. Relative name of the service within the application. Example: default.@OutputOnly",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'A set of labels to apply to this service. Labels are key/value pairs that describe the service and all resources that belong to it (e.g., versions). The labels can be used to search and group resources, and are propagated to the usage and billing reports, enabling fine-grain analysis of costs. An example of using labels is to tag resources belonging to different environments (e.g., "env=prod", "env=qa"). Label keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, dashes, and international characters. Label keys must start with a lowercase letter or an international character. Each service can have at most 32 labels.',
  ).optional(),
  name: z.string().describe(
    "Output only. Full path to the Service resource in the API. Example: apps/myapp/services/default.@OutputOnly",
  ).optional(),
  networkSettings: z.object({
    ingressTrafficAllowed: z.enum([
      "INGRESS_TRAFFIC_ALLOWED_UNSPECIFIED",
      "INGRESS_TRAFFIC_ALLOWED_ALL",
      "INGRESS_TRAFFIC_ALLOWED_INTERNAL_ONLY",
      "INGRESS_TRAFFIC_ALLOWED_INTERNAL_AND_LB",
    ]).describe("The ingress settings for version or service.").optional(),
  }).describe(
    "A NetworkSettings resource is a container for ingress settings for a version or service.",
  ).optional(),
  split: z.object({
    allocations: z.record(z.string(), z.number()).describe(
      "Mapping from version IDs within the service to fractional (0.000, 1] allocations of traffic for that version. Each version can be specified only once, but some versions in the service may not have any traffic allocation. Services that have traffic allocated cannot be deleted until either the service is deleted or their traffic allocation is removed. Allocations must sum to 1. Up to two decimal place precision is supported for IP-based splits and up to three decimal places is supported for cookie-based splits.",
    ).optional(),
    shardBy: z.enum(["UNSPECIFIED", "COOKIE", "IP", "RANDOM"]).describe(
      "Mechanism used to determine which version a request is sent to. The traffic selection algorithm will be stable for either type until allocations are changed.",
    ).optional(),
  }).describe(
    "Traffic routing configuration for versions within a single service. Traffic splits define how traffic directed to the service is assigned to versions.",
  ).optional(),
});

const StateSchema = z.object({
  generatedCustomerMetadata: z.record(z.string(), z.unknown()).optional(),
  id: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  networkSettings: z.object({
    ingressTrafficAllowed: z.string(),
  }).optional(),
  split: z.object({
    allocations: z.record(z.string(), z.unknown()),
    shardBy: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  generatedCustomerMetadata: z.record(z.string(), z.string()).describe(
    "Additional Google Generated Customer Metadata, this field won't be provided by default and can be requested by setting the IncludeExtraData field in GetServiceRequest",
  ).optional(),
  id: z.string().describe(
    "Output only. Relative name of the service within the application. Example: default.@OutputOnly",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    'A set of labels to apply to this service. Labels are key/value pairs that describe the service and all resources that belong to it (e.g., versions). The labels can be used to search and group resources, and are propagated to the usage and billing reports, enabling fine-grain analysis of costs. An example of using labels is to tag resources belonging to different environments (e.g., "env=prod", "env=qa"). Label keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, dashes, and international characters. Label keys must start with a lowercase letter or an international character. Each service can have at most 32 labels.',
  ).optional(),
  name: z.string().describe(
    "Output only. Full path to the Service resource in the API. Example: apps/myapp/services/default.@OutputOnly",
  ).optional(),
  networkSettings: z.object({
    ingressTrafficAllowed: z.enum([
      "INGRESS_TRAFFIC_ALLOWED_UNSPECIFIED",
      "INGRESS_TRAFFIC_ALLOWED_ALL",
      "INGRESS_TRAFFIC_ALLOWED_INTERNAL_ONLY",
      "INGRESS_TRAFFIC_ALLOWED_INTERNAL_AND_LB",
    ]).describe("The ingress settings for version or service.").optional(),
  }).describe(
    "A NetworkSettings resource is a container for ingress settings for a version or service.",
  ).optional(),
  split: z.object({
    allocations: z.record(z.string(), z.number()).describe(
      "Mapping from version IDs within the service to fractional (0.000, 1] allocations of traffic for that version. Each version can be specified only once, but some versions in the service may not have any traffic allocation. Services that have traffic allocated cannot be deleted until either the service is deleted or their traffic allocation is removed. Allocations must sum to 1. Up to two decimal place precision is supported for IP-based splits and up to three decimal places is supported for cookie-based splits.",
    ).optional(),
    shardBy: z.enum(["UNSPECIFIED", "COOKIE", "IP", "RANDOM"]).describe(
      "Mechanism used to determine which version a request is sent to. The traffic selection algorithm will be stable for either type until allocations are changed.",
    ).optional(),
  }).describe(
    "Traffic routing configuration for versions within a single service. Traffic splits define how traffic directed to the service is assigned to versions.",
  ).optional(),
});

/** Swamp extension model for Google Cloud App Engine Admin Apps.Services. Registered at `@swamp/gcp/appengine/apps-services`. */
export const model = {
  type: "@swamp/gcp/appengine/apps-services",
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
      description:
        "A Service resource is a logical component of an application that can share st...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        params["servicesId"] = args.identifier;
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
      description: "Update services attributes",
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
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        else if (existing["appsId"]) {
          params["appsId"] = String(existing["appsId"]);
        }
        params["servicesId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["generatedCustomerMetadata"] !== undefined) {
          body["generatedCustomerMetadata"] = g["generatedCustomerMetadata"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["networkSettings"] !== undefined) {
          body["networkSettings"] = g["networkSettings"];
        }
        if (g["split"] !== undefined) body["split"] = g["split"];
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
      description: "Delete the services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        params["servicesId"] = args.identifier;
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
      description: "Sync services state from GCP",
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
          if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
          else if (existing["appsId"]) {
            params["appsId"] = String(existing["appsId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["servicesId"] = identifier;
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
      description: "List services resources",
      arguments: z.object({
        pageSize: z.number().describe("Maximum results to return per page.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "services",
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
  },
};
