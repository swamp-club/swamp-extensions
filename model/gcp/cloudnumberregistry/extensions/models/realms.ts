// Auto-generated extension model for @swamp/gcp/cloudnumberregistry/realms
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Number Registry Realms.
 *
 * A Realm represents a distinct network domain or security zone. It groups Ranges that share the same traffic and management characteristics. All the ranges in a Realm are routable to each other, meaning that they cannot overlap.
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
  return `${parent}/realms/${shortName}`;
}

const BASE_URL = "https://cloudnumberregistry.googleapis.com/";

const GET_CONFIG = {
  "id": "cloudnumberregistry.projects.locations.realms.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "cloudnumberregistry.projects.locations.realms.create",
  "path": "v1alpha/{+parent}/realms",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "realmId": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "cloudnumberregistry.projects.locations.realms.patch",
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
  "id": "cloudnumberregistry.projects.locations.realms.delete",
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

const LIST_CONFIG = {
  "id": "cloudnumberregistry.projects.locations.realms.list",
  "path": "v1alpha/{+parent}/realms",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  aggregatedData: z.object({
    customRangesCount: z.number().int().describe(
      "Output only. Number of CustomRanges in the Realm.",
    ).optional(),
    discoveredRangesCount: z.number().int().describe(
      "Output only. Number of DiscoveredRanges in the Realm.",
    ).optional(),
  }).describe("Aggregated data for the Realm.").optional(),
  discoveryMetadata: z.object({
    createTime: z.string().describe(
      "Output only. The time when the resource was created.",
    ).optional(),
    eventTime: z.string().describe(
      "Output only. The time when the event happened.",
    ).optional(),
    resource: z.string().describe(
      'Output only. The resource name of the discovered resource, should be API-agnostic. Example: "projects/{project_number}/networks/{network_id}".',
    ).optional(),
    resourceUri: z.string().describe(
      "Output only. The resource uri of the discovered resource.",
    ).optional(),
    sourceId: z.string().describe(
      "Output only. The canonical google.aip.dev/122 name of the source resource.",
    ).optional(),
    sourceSubId: z.string().describe(
      'Output only. A single source resource can be the source of multiple CNR resources. This sub_id is used to distinguish between the different CNR resources derived from the same upstream resource. For example, a single subnetwork can be the source of multiple Ranges, one for each protocol. In this case, the sub_id could be "private-ipv4" or "private-ipv6".',
    ).optional(),
    state: z.enum([
      "RESOURCE_STATE_UNSPECIFIED",
      "INVALID",
      "EXISTS",
      "DOES_NOT_EXIST",
      "ERROR",
    ]).describe("Output only. The state of the resource.").optional(),
    updateTime: z.string().describe(
      "Output only. The time when the resource was last modified.",
    ).optional(),
  }).describe(
    "Metadata about a discovered resource, tracking event times, state, and source information.",
  ).optional(),
  ipVersion: z.enum(["IP_VERSION_UNSPECIFIED", "IPV4", "IPV6"]).describe(
    "Optional. IP version of the Realm.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  managementType: z.enum(["MANAGEMENT_TYPE_UNSPECIFIED", "CNR", "USER"])
    .describe("Required. Management type of the Realm.").optional(),
  name: z.string().describe(
    "Required. Identifier. The resource name of the Realm.",
  ).optional(),
  registryBook: z.string().describe(
    "Required. Name of the RegistryBook that claims the Realm.",
  ).optional(),
  trafficType: z.enum([
    "TRAFFIC_TYPE_UNSPECIFIED",
    "UNSET",
    "INTERNET",
    "PRIVATE",
    "LINKLOCAL",
  ]).describe("Required. Traffic type of the Realm.").optional(),
  realmId: z.string().describe(
    "Required. The ID to use for the Realm, which will become the final segment of the resource name.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  aggregatedData: z.object({
    customRangesCount: z.number(),
    discoveredRangesCount: z.number(),
  }).optional(),
  createTime: z.string().optional(),
  discoveryMetadata: z.object({
    createTime: z.string(),
    eventTime: z.string(),
    resource: z.string(),
    resourceUri: z.string(),
    sourceId: z.string(),
    sourceSubId: z.string(),
    state: z.string(),
    updateTime: z.string(),
  }).optional(),
  ipVersion: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  managementType: z.string().optional(),
  name: z.string(),
  registryBook: z.string().optional(),
  trafficType: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  aggregatedData: z.object({
    customRangesCount: z.number().int().describe(
      "Output only. Number of CustomRanges in the Realm.",
    ).optional(),
    discoveredRangesCount: z.number().int().describe(
      "Output only. Number of DiscoveredRanges in the Realm.",
    ).optional(),
  }).describe("Aggregated data for the Realm.").optional(),
  discoveryMetadata: z.object({
    createTime: z.string().describe(
      "Output only. The time when the resource was created.",
    ).optional(),
    eventTime: z.string().describe(
      "Output only. The time when the event happened.",
    ).optional(),
    resource: z.string().describe(
      'Output only. The resource name of the discovered resource, should be API-agnostic. Example: "projects/{project_number}/networks/{network_id}".',
    ).optional(),
    resourceUri: z.string().describe(
      "Output only. The resource uri of the discovered resource.",
    ).optional(),
    sourceId: z.string().describe(
      "Output only. The canonical google.aip.dev/122 name of the source resource.",
    ).optional(),
    sourceSubId: z.string().describe(
      'Output only. A single source resource can be the source of multiple CNR resources. This sub_id is used to distinguish between the different CNR resources derived from the same upstream resource. For example, a single subnetwork can be the source of multiple Ranges, one for each protocol. In this case, the sub_id could be "private-ipv4" or "private-ipv6".',
    ).optional(),
    state: z.enum([
      "RESOURCE_STATE_UNSPECIFIED",
      "INVALID",
      "EXISTS",
      "DOES_NOT_EXIST",
      "ERROR",
    ]).describe("Output only. The state of the resource.").optional(),
    updateTime: z.string().describe(
      "Output only. The time when the resource was last modified.",
    ).optional(),
  }).describe(
    "Metadata about a discovered resource, tracking event times, state, and source information.",
  ).optional(),
  ipVersion: z.enum(["IP_VERSION_UNSPECIFIED", "IPV4", "IPV6"]).describe(
    "Optional. IP version of the Realm.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  managementType: z.enum(["MANAGEMENT_TYPE_UNSPECIFIED", "CNR", "USER"])
    .describe("Required. Management type of the Realm.").optional(),
  name: z.string().describe(
    "Required. Identifier. The resource name of the Realm.",
  ).optional(),
  registryBook: z.string().describe(
    "Required. Name of the RegistryBook that claims the Realm.",
  ).optional(),
  trafficType: z.enum([
    "TRAFFIC_TYPE_UNSPECIFIED",
    "UNSET",
    "INTERNET",
    "PRIVATE",
    "LINKLOCAL",
  ]).describe("Required. Traffic type of the Realm.").optional(),
  realmId: z.string().describe(
    "Required. The ID to use for the Realm, which will become the final segment of the resource name.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Number Registry Realms. Registered at `@swamp/gcp/cloudnumberregistry/realms`. */
export const model = {
  type: "@swamp/gcp/cloudnumberregistry/realms",
  version: "2026.06.03.1",
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
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Realm represents a distinct network domain or security zone. It groups Rang...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a realms",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["aggregatedData"] !== undefined) {
          body["aggregatedData"] = g["aggregatedData"];
        }
        if (g["discoveryMetadata"] !== undefined) {
          body["discoveryMetadata"] = g["discoveryMetadata"];
        }
        if (g["ipVersion"] !== undefined) body["ipVersion"] = g["ipVersion"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["managementType"] !== undefined) {
          body["managementType"] = g["managementType"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["registryBook"] !== undefined) {
          body["registryBook"] = g["registryBook"];
        }
        if (g["trafficType"] !== undefined) {
          body["trafficType"] = g["trafficType"];
        }
        if (g["realmId"] !== undefined) body["realmId"] = g["realmId"];
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
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a realms",
      arguments: z.object({
        identifier: z.string().describe("The name of the realms"),
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
      description: "Update realms attributes",
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
        if (g["aggregatedData"] !== undefined) {
          body["aggregatedData"] = g["aggregatedData"];
        }
        if (g["discoveryMetadata"] !== undefined) {
          body["discoveryMetadata"] = g["discoveryMetadata"];
        }
        if (g["ipVersion"] !== undefined) body["ipVersion"] = g["ipVersion"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["managementType"] !== undefined) {
          body["managementType"] = g["managementType"];
        }
        if (g["registryBook"] !== undefined) {
          body["registryBook"] = g["registryBook"];
        }
        if (g["trafficType"] !== undefined) {
          body["trafficType"] = g["trafficType"];
        }
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
      description: "Delete the realms",
      arguments: z.object({
        identifier: z.string().describe("The name of the realms"),
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
      description: "Sync realms state from GCP",
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
    list: {
      description: "List realms resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter expression to filter the results.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Hint for how to order the results.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
        ).optional(),
        view: z.string().describe(
          "Optional. The view of the Realm to retrieve.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "realms",
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
