// Auto-generated extension model for @swamp/gcp/networkconnectivity/global-hubs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Connectivity Global.Hubs.
 *
 * A Network Connectivity Center hub is a global management resource to which you attach spokes. A single hub can contain spokes from multiple regions. However, if any of a hub's spokes use the site-to-site data transfer feature, the resources associated with those spokes must all be in the same VPC network. Spokes that do not use site-to-site data transfer can be associated with any VPC network in your project.
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
  return `${parent}/hubs/${shortName}`;
}

const BASE_URL = "https://networkconnectivity.googleapis.com/";

const GET_CONFIG = {
  "id": "networkconnectivity.projects.locations.global.hubs.get",
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

const INSERT_CONFIG = {
  "id": "networkconnectivity.projects.locations.global.hubs.create",
  "path": "v1/{+parent}/hubs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "hubId": {
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
  "id": "networkconnectivity.projects.locations.global.hubs.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "networkconnectivity.projects.locations.global.hubs.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "networkconnectivity.projects.locations.global.hubs.list",
  "path": "v1/{+parent}/hubs",
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
  description: z.string().describe(
    "Optional. An optional description of the hub.",
  ).optional(),
  exportPsc: z.boolean().describe(
    "Optional. Whether Private Service Connect connection propagation is enabled for the hub. If true, Private Service Connect endpoints in VPC spokes attached to the hub are made accessible to other VPC spokes attached to the hub. The default value is false.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements).",
  ).optional(),
  name: z.string().describe(
    "Immutable. The name of the hub. Hub names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}`",
  ).optional(),
  policyMode: z.enum(["POLICY_MODE_UNSPECIFIED", "PRESET"]).describe(
    "Optional. The policy mode of this hub. This field can be either PRESET or CUSTOM. If unspecified, the policy_mode defaults to PRESET.",
  ).optional(),
  presetTopology: z.enum([
    "PRESET_TOPOLOGY_UNSPECIFIED",
    "MESH",
    "STAR",
    "HYBRID_INSPECTION",
  ]).describe(
    "Optional. The topology implemented in this hub. Currently, this field is only used when policy_mode = PRESET. The available preset topologies are MESH and STAR. If preset_topology is unspecified and policy_mode = PRESET, the preset_topology defaults to MESH. When policy_mode = CUSTOM, the preset_topology is set to PRESET_TOPOLOGY_UNSPECIFIED.",
  ).optional(),
  spokeSummary: z.object({
    spokeStateCounts: z.array(z.object({
      count: z.string().describe(
        "Output only. The total number of spokes that are in this state and associated with a given hub.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "CREATING",
        "ACTIVE",
        "DELETING",
        "ACCEPTING",
        "REJECTING",
        "UPDATING",
        "INACTIVE",
        "OBSOLETE",
        "FAILED",
      ]).describe("Output only. The state of the spokes.").optional(),
    })).describe(
      "Output only. Counts the number of spokes that are in each state and associated with a given hub.",
    ).optional(),
    spokeStateReasonCounts: z.array(z.object({
      count: z.string().describe(
        "Output only. The total number of spokes that are inactive for a particular reason and associated with a given hub.",
      ).optional(),
      stateReasonCode: z.enum([
        "CODE_UNSPECIFIED",
        "PENDING_REVIEW",
        "REJECTED",
        "PAUSED",
        "FAILED",
        "UPDATE_PENDING_REVIEW",
        "UPDATE_REJECTED",
        "UPDATE_FAILED",
      ]).describe("Output only. The reason that a spoke is inactive.")
        .optional(),
    })).describe(
      "Output only. Counts the number of spokes that are inactive for each possible reason and associated with a given hub.",
    ).optional(),
    spokeTypeCounts: z.array(z.object({
      count: z.string().describe(
        "Output only. The total number of spokes of this type that are associated with the hub.",
      ).optional(),
      spokeType: z.enum([
        "SPOKE_TYPE_UNSPECIFIED",
        "VPN_TUNNEL",
        "INTERCONNECT_ATTACHMENT",
        "ROUTER_APPLIANCE",
        "VPC_NETWORK",
        "GATEWAY",
        "PRODUCER_VPC_NETWORK",
      ]).describe("Output only. The type of the spokes.").optional(),
    })).describe(
      "Output only. Counts the number of spokes of each type that are associated with a specific hub.",
    ).optional(),
  }).describe(
    "Summarizes information about the spokes associated with a hub. The summary includes a count of spokes according to type and according to state. If any spokes are inactive, the summary also lists the reasons they are inactive, including a count for each reason.",
  ).optional(),
  hubId: z.string().describe("Required. A unique identifier for the hub.")
    .optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  exportPsc: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  policyMode: z.string().optional(),
  presetTopology: z.string().optional(),
  routeTables: z.array(z.string()).optional(),
  routingVpcs: z.array(z.object({
    requiredForNewSiteToSiteDataTransferSpokes: z.boolean(),
    uri: z.string(),
  })).optional(),
  spokeSummary: z.object({
    spokeStateCounts: z.array(z.object({
      count: z.string(),
      state: z.string(),
    })),
    spokeStateReasonCounts: z.array(z.object({
      count: z.string(),
      stateReasonCode: z.string(),
    })),
    spokeTypeCounts: z.array(z.object({
      count: z.string(),
      spokeType: z.string(),
    })),
  }).optional(),
  state: z.string().optional(),
  uniqueId: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "Optional. An optional description of the hub.",
  ).optional(),
  exportPsc: z.boolean().describe(
    "Optional. Whether Private Service Connect connection propagation is enabled for the hub. If true, Private Service Connect endpoints in VPC spokes attached to the hub are made accessible to other VPC spokes attached to the hub. The default value is false.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements).",
  ).optional(),
  name: z.string().describe(
    "Immutable. The name of the hub. Hub names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}`",
  ).optional(),
  policyMode: z.enum(["POLICY_MODE_UNSPECIFIED", "PRESET"]).describe(
    "Optional. The policy mode of this hub. This field can be either PRESET or CUSTOM. If unspecified, the policy_mode defaults to PRESET.",
  ).optional(),
  presetTopology: z.enum([
    "PRESET_TOPOLOGY_UNSPECIFIED",
    "MESH",
    "STAR",
    "HYBRID_INSPECTION",
  ]).describe(
    "Optional. The topology implemented in this hub. Currently, this field is only used when policy_mode = PRESET. The available preset topologies are MESH and STAR. If preset_topology is unspecified and policy_mode = PRESET, the preset_topology defaults to MESH. When policy_mode = CUSTOM, the preset_topology is set to PRESET_TOPOLOGY_UNSPECIFIED.",
  ).optional(),
  spokeSummary: z.object({
    spokeStateCounts: z.array(z.object({
      count: z.string().describe(
        "Output only. The total number of spokes that are in this state and associated with a given hub.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "CREATING",
        "ACTIVE",
        "DELETING",
        "ACCEPTING",
        "REJECTING",
        "UPDATING",
        "INACTIVE",
        "OBSOLETE",
        "FAILED",
      ]).describe("Output only. The state of the spokes.").optional(),
    })).describe(
      "Output only. Counts the number of spokes that are in each state and associated with a given hub.",
    ).optional(),
    spokeStateReasonCounts: z.array(z.object({
      count: z.string().describe(
        "Output only. The total number of spokes that are inactive for a particular reason and associated with a given hub.",
      ).optional(),
      stateReasonCode: z.enum([
        "CODE_UNSPECIFIED",
        "PENDING_REVIEW",
        "REJECTED",
        "PAUSED",
        "FAILED",
        "UPDATE_PENDING_REVIEW",
        "UPDATE_REJECTED",
        "UPDATE_FAILED",
      ]).describe("Output only. The reason that a spoke is inactive.")
        .optional(),
    })).describe(
      "Output only. Counts the number of spokes that are inactive for each possible reason and associated with a given hub.",
    ).optional(),
    spokeTypeCounts: z.array(z.object({
      count: z.string().describe(
        "Output only. The total number of spokes of this type that are associated with the hub.",
      ).optional(),
      spokeType: z.enum([
        "SPOKE_TYPE_UNSPECIFIED",
        "VPN_TUNNEL",
        "INTERCONNECT_ATTACHMENT",
        "ROUTER_APPLIANCE",
        "VPC_NETWORK",
        "GATEWAY",
        "PRODUCER_VPC_NETWORK",
      ]).describe("Output only. The type of the spokes.").optional(),
    })).describe(
      "Output only. Counts the number of spokes of each type that are associated with a specific hub.",
    ).optional(),
  }).describe(
    "Summarizes information about the spokes associated with a hub. The summary includes a count of spokes according to type and according to state. If any spokes are inactive, the summary also lists the reasons they are inactive, including a count for each reason.",
  ).optional(),
  hubId: z.string().describe("Required. A unique identifier for the hub.")
    .optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Connectivity Global.Hubs. Registered at `@swamp/gcp/networkconnectivity/global-hubs`. */
export const model = {
  type: "@swamp/gcp/networkconnectivity/global-hubs",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
        "A Network Connectivity Center hub is a global management resource to which yo...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a hubs",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["exportPsc"] !== undefined) body["exportPsc"] = g["exportPsc"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["policyMode"] !== undefined) body["policyMode"] = g["policyMode"];
        if (g["presetTopology"] !== undefined) {
          body["presetTopology"] = g["presetTopology"];
        }
        if (g["spokeSummary"] !== undefined) {
          body["spokeSummary"] = g["spokeSummary"];
        }
        if (g["hubId"] !== undefined) body["hubId"] = g["hubId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Get a hubs",
      arguments: z.object({
        identifier: z.string().describe("The name of the hubs"),
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
      description: "Update hubs attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["exportPsc"] !== undefined) body["exportPsc"] = g["exportPsc"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["policyMode"] !== undefined) body["policyMode"] = g["policyMode"];
        if (g["presetTopology"] !== undefined) {
          body["presetTopology"] = g["presetTopology"];
        }
        if (g["spokeSummary"] !== undefined) {
          body["spokeSummary"] = g["spokeSummary"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Delete the hubs",
      arguments: z.object({
        identifier: z.string().describe("The name of the hubs"),
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
      description: "Sync hubs state from GCP",
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
    accept_spoke: {
      description: "accept spoke",
      arguments: z.object({
        requestId: z.any().optional(),
        spokeUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["spokeUri"] !== undefined) body["spokeUri"] = args["spokeUri"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networkconnectivity.projects.locations.global.hubs.acceptSpoke",
            "path": "v1/{+name}:acceptSpoke",
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
    accept_spoke_update: {
      description: "accept spoke update",
      arguments: z.object({
        requestId: z.any().optional(),
        spokeEtag: z.any().optional(),
        spokeUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["spokeEtag"] !== undefined) {
          body["spokeEtag"] = args["spokeEtag"];
        }
        if (args["spokeUri"] !== undefined) body["spokeUri"] = args["spokeUri"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networkconnectivity.projects.locations.global.hubs.acceptSpokeUpdate",
            "path": "v1/{+name}:acceptSpokeUpdate",
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
    get_iam_policy: {
      description: "get iam policy",
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networkconnectivity.projects.locations.global.hubs.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    list_spokes: {
      description: "list spokes",
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
              "networkconnectivity.projects.locations.global.hubs.listSpokes",
            "path": "v1/{+name}:listSpokes",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "filter": { "location": "query" },
              "name": { "location": "path", "required": true },
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "spokeLocations": { "location": "query" },
              "view": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    query_status: {
      description: "query status",
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
              "networkconnectivity.projects.locations.global.hubs.queryStatus",
            "path": "v1/{+name}:queryStatus",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "filter": { "location": "query" },
              "groupBy": { "location": "query" },
              "name": { "location": "path", "required": true },
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    reject_spoke: {
      description: "reject spoke",
      arguments: z.object({
        details: z.any().optional(),
        requestId: z.any().optional(),
        spokeUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["details"] !== undefined) body["details"] = args["details"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["spokeUri"] !== undefined) body["spokeUri"] = args["spokeUri"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networkconnectivity.projects.locations.global.hubs.rejectSpoke",
            "path": "v1/{+name}:rejectSpoke",
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
    reject_spoke_update: {
      description: "reject spoke update",
      arguments: z.object({
        details: z.any().optional(),
        requestId: z.any().optional(),
        spokeEtag: z.any().optional(),
        spokeUri: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["details"] !== undefined) body["details"] = args["details"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["spokeEtag"] !== undefined) {
          body["spokeEtag"] = args["spokeEtag"];
        }
        if (args["spokeUri"] !== undefined) body["spokeUri"] = args["spokeUri"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networkconnectivity.projects.locations.global.hubs.rejectSpokeUpdate",
            "path": "v1/{+name}:rejectSpokeUpdate",
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networkconnectivity.projects.locations.global.hubs.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "networkconnectivity.projects.locations.global.hubs.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
