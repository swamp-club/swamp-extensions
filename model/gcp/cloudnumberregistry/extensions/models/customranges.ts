// Auto-generated extension model for @swamp/gcp/cloudnumberregistry/customranges
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Number Registry CustomRanges.
 *
 * Message describing CustomRange object
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/customRanges/${shortName}`;
}

const BASE_URL = "https://cloudnumberregistry.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudnumberregistry.projects.locations.customRanges.get",
  "path": "v1alpha/{+name}",
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

const INSERT_CONFIG = {
  "id": "cloudnumberregistry.projects.locations.customRanges.create",
  "path": "v1alpha/{+parent}/customRanges",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "customRangeId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "cloudnumberregistry.projects.locations.customRanges.patch",
  "path": "v1alpha/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "cloudnumberregistry.projects.locations.customRanges.delete",
  "path": "v1alpha/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "force": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  attributes: z.array(z.object({
    key: z.string().describe("Required. Key of attribute").optional(),
    value: z.string().describe("Required. Value of attribute").optional(),
  })).describe("Optional. The attributes of the CustomRange.").optional(),
  description: z.string().describe("Optional. Description of the CustomRange.")
    .optional(),
  ipv4CidrRange: z.string().describe(
    "Optional. The IPv4 CIDR range of the CustomRange.",
  ).optional(),
  ipv6CidrRange: z.string().describe(
    "Optional. The IPv6 CIDR range of the CustomRange.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  name: z.string().describe("Required. Identifier. name of resource")
    .optional(),
  parentRange: z.string().describe(
    "Optional. The parent range of the CustomRange. Do not allow setting parent range if realm is specified. Format must follow this pattern: projects/{project}/locations/{location}/customRanges/{custom_range}",
  ).optional(),
  realm: z.string().describe(
    "Optional. The realm of the CustomRange. The realm must be in the same project as the custom range. Do not allow setting realm if parent range is specified, since the realm should be inherited from the parent range. Format must follow this pattern: projects/{project}/locations/{location}/realms/{realm}",
  ).optional(),
  customRangeId: z.string().describe("Required. Id of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  attributes: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
  description: z.string().optional(),
  ipv4CidrRange: z.string().optional(),
  ipv6CidrRange: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  parentRange: z.string().optional(),
  realm: z.string().optional(),
  registryBook: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  attributes: z.array(z.object({
    key: z.string().describe("Required. Key of attribute").optional(),
    value: z.string().describe("Required. Value of attribute").optional(),
  })).describe("Optional. The attributes of the CustomRange.").optional(),
  description: z.string().describe("Optional. Description of the CustomRange.")
    .optional(),
  ipv4CidrRange: z.string().describe(
    "Optional. The IPv4 CIDR range of the CustomRange.",
  ).optional(),
  ipv6CidrRange: z.string().describe(
    "Optional. The IPv6 CIDR range of the CustomRange.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs",
  ).optional(),
  name: z.string().describe("Required. Identifier. name of resource")
    .optional(),
  parentRange: z.string().describe(
    "Optional. The parent range of the CustomRange. Do not allow setting parent range if realm is specified. Format must follow this pattern: projects/{project}/locations/{location}/customRanges/{custom_range}",
  ).optional(),
  realm: z.string().describe(
    "Optional. The realm of the CustomRange. The realm must be in the same project as the custom range. Do not allow setting realm if parent range is specified, since the realm should be inherited from the parent range. Format must follow this pattern: projects/{project}/locations/{location}/realms/{realm}",
  ).optional(),
  customRangeId: z.string().describe("Required. Id of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Number Registry CustomRanges. Registered at `@swamp/gcp/cloudnumberregistry/customranges`. */
export const model = {
  type: "@swamp/gcp/cloudnumberregistry/customranges",
  version: "2026.05.20.1",
  upgrades: [
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Message describing CustomRange object",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customRanges",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["ipv4CidrRange"] !== undefined) {
          body["ipv4CidrRange"] = g["ipv4CidrRange"];
        }
        if (g["ipv6CidrRange"] !== undefined) {
          body["ipv6CidrRange"] = g["ipv6CidrRange"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentRange"] !== undefined) {
          body["parentRange"] = g["parentRange"];
        }
        if (g["realm"] !== undefined) body["realm"] = g["realm"];
        if (g["customRangeId"] !== undefined) {
          body["customRangeId"] = g["customRangeId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a customRanges",
      arguments: z.object({
        identifier: z.string().describe("The name of the customRanges"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Update customRanges attributes",
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["attributes"] !== undefined) body["attributes"] = g["attributes"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["ipv4CidrRange"] !== undefined) {
          body["ipv4CidrRange"] = g["ipv4CidrRange"];
        }
        if (g["ipv6CidrRange"] !== undefined) {
          body["ipv6CidrRange"] = g["ipv6CidrRange"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["parentRange"] !== undefined) {
          body["parentRange"] = g["parentRange"];
        }
        if (g["realm"] !== undefined) body["realm"] = g["realm"];
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
      description: "Delete the customRanges",
      arguments: z.object({
        identifier: z.string().describe("The name of the customRanges"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync customRanges state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    find_free_ip_ranges: {
      description: "find free ip ranges",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudnumberregistry.projects.locations.customRanges.findFreeIpRanges",
            "path": "v1alpha/{+name}:findFreeIpRanges",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "cidrPrefixLength": { "location": "query" },
              "name": { "location": "path", "required": true },
              "rangeCount": { "location": "query" },
              "requestId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    show_utilization: {
      description: "show utilization",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "cloudnumberregistry.projects.locations.customRanges.showUtilization",
            "path": "v1alpha/{+name}:showUtilization",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
