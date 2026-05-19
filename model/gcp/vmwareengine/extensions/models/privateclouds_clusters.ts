// Auto-generated extension model for @swamp/gcp/vmwareengine/privateclouds-clusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud VMware Engine PrivateClouds.Clusters.
 *
 * A cluster in a private cloud.
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
  return `${parent}/clusters/${shortName}`;
}

const BASE_URL = "https://vmwareengine.googleapis.com/";

const GET_CONFIG = {
  "id": "vmwareengine.projects.locations.privateClouds.clusters.get",
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
  "id": "vmwareengine.projects.locations.privateClouds.clusters.create",
  "path": "v1/{+parent}/clusters",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "clusterId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "vmwareengine.projects.locations.privateClouds.clusters.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "vmwareengine.projects.locations.privateClouds.clusters.delete",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  autoscalingSettings: z.object({
    autoscalingPolicies: z.record(
      z.string(),
      z.object({
        consumedMemoryThresholds: z.object({
          scaleIn: z.number().int().describe(
            "Required. The utilization triggering the scale-in operation in percent.",
          ).optional(),
          scaleOut: z.number().int().describe(
            "Required. The utilization triggering the scale-out operation in percent.",
          ).optional(),
        }).describe(
          "Thresholds define the utilization of resources triggering scale-out and scale-in operations.",
        ).optional(),
        cpuThresholds: z.object({
          scaleIn: z.number().int().describe(
            "Required. The utilization triggering the scale-in operation in percent.",
          ).optional(),
          scaleOut: z.number().int().describe(
            "Required. The utilization triggering the scale-out operation in percent.",
          ).optional(),
        }).describe(
          "Thresholds define the utilization of resources triggering scale-out and scale-in operations.",
        ).optional(),
        grantedMemoryThresholds: z.object({
          scaleIn: z.number().int().describe(
            "Required. The utilization triggering the scale-in operation in percent.",
          ).optional(),
          scaleOut: z.number().int().describe(
            "Required. The utilization triggering the scale-out operation in percent.",
          ).optional(),
        }).describe(
          "Thresholds define the utilization of resources triggering scale-out and scale-in operations.",
        ).optional(),
        nodeTypeId: z.string().describe(
          "Required. The canonical identifier of the node type to add or remove. Corresponds to the `NodeType`.",
        ).optional(),
        scaleOutSize: z.number().int().describe(
          "Required. Number of nodes to add to a cluster during a scale-out operation. Must be divisible by 2 for stretched clusters. During a scale-in operation only one node (or 2 for stretched clusters) are removed in a single iteration.",
        ).optional(),
        storageThresholds: z.object({
          scaleIn: z.number().int().describe(
            "Required. The utilization triggering the scale-in operation in percent.",
          ).optional(),
          scaleOut: z.number().int().describe(
            "Required. The utilization triggering the scale-out operation in percent.",
          ).optional(),
        }).describe(
          "Thresholds define the utilization of resources triggering scale-out and scale-in operations.",
        ).optional(),
      }),
    ).describe(
      "Required. The map with autoscaling policies applied to the cluster. The key is the identifier of the policy. It must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) Currently there map must contain only one element that describes the autoscaling policy for compute nodes.",
    ).optional(),
    coolDownPeriod: z.string().describe(
      "Optional. The minimum duration between consecutive autoscale operations. It starts once addition or removal of nodes is fully completed. Defaults to 30 minutes if not specified. Cool down period must be in whole minutes (for example, 30, 31, 50, 180 minutes).",
    ).optional(),
    maxClusterNodeCount: z.number().int().describe(
      "Optional. Maximum number of nodes of any type in a cluster. If not specified the default limits apply.",
    ).optional(),
    minClusterNodeCount: z.number().int().describe(
      "Optional. Minimum number of nodes of any type in a cluster. If not specified the default limits apply.",
    ).optional(),
  }).describe(
    "Autoscaling settings define the rules used by VMware Engine to automatically scale-out and scale-in the clusters in a private cloud.",
  ).optional(),
  nodeTypeConfigs: z.record(
    z.string(),
    z.object({
      customCoreCount: z.number().int().describe(
        "Optional. Customized number of cores available to each node of the type. This number must always be one of `nodeType.availableCustomCoreCounts`. If zero is provided max value from `nodeType.availableCustomCoreCounts` will be used.",
      ).optional(),
      nodeCount: z.number().int().describe(
        "Required. The number of nodes of this type in the cluster",
      ).optional(),
    }),
  ).describe(
    "Required. The map of cluster node types in this cluster, where the key is canonical identifier of the node type (corresponds to the `NodeType`).",
  ).optional(),
  stretchedClusterConfig: z.object({
    preferredLocation: z.string().describe(
      "Required. Zone that will remain operational when connection between the two zones is lost. Specify the resource name of a zone that belongs to the region of the private cloud. For example: `projects/{project}/locations/europe-west3-a` where `{project}` can either be a project number or a project ID.",
    ).optional(),
    secondaryLocation: z.string().describe(
      "Required. Additional zone for a higher level of availability and load balancing. Specify the resource name of a zone that belongs to the region of the private cloud. For example: `projects/{project}/locations/europe-west3-b` where `{project}` can either be a project number or a project ID.",
    ).optional(),
  }).describe("Configuration of a stretched cluster.").optional(),
  clusterId: z.string().describe(
    "Required. The user-provided identifier of the new `Cluster`. This identifier must be unique among clusters within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5)",
  ).optional(),
  requestId: z.string().describe(
    "Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  autoscalingSettings: z.object({
    autoscalingPolicies: z.record(z.string(), z.unknown()),
    coolDownPeriod: z.string(),
    maxClusterNodeCount: z.number(),
    minClusterNodeCount: z.number(),
  }).optional(),
  createTime: z.string().optional(),
  datastoreMountConfig: z.array(z.object({
    accessMode: z.string(),
    datastore: z.string(),
    datastoreNetwork: z.object({
      connectionCount: z.number(),
      mtu: z.number(),
      networkPeering: z.string(),
      subnet: z.string(),
    }),
    fileShare: z.string(),
    nfsVersion: z.string(),
    servers: z.array(z.string()),
  })).optional(),
  management: z.boolean().optional(),
  name: z.string(),
  nodeTypeConfigs: z.record(z.string(), z.unknown()).optional(),
  state: z.string().optional(),
  stretchedClusterConfig: z.object({
    preferredLocation: z.string(),
    secondaryLocation: z.string(),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  autoscalingSettings: z.object({
    autoscalingPolicies: z.record(
      z.string(),
      z.object({
        consumedMemoryThresholds: z.object({
          scaleIn: z.number().int().describe(
            "Required. The utilization triggering the scale-in operation in percent.",
          ).optional(),
          scaleOut: z.number().int().describe(
            "Required. The utilization triggering the scale-out operation in percent.",
          ).optional(),
        }).describe(
          "Thresholds define the utilization of resources triggering scale-out and scale-in operations.",
        ).optional(),
        cpuThresholds: z.object({
          scaleIn: z.number().int().describe(
            "Required. The utilization triggering the scale-in operation in percent.",
          ).optional(),
          scaleOut: z.number().int().describe(
            "Required. The utilization triggering the scale-out operation in percent.",
          ).optional(),
        }).describe(
          "Thresholds define the utilization of resources triggering scale-out and scale-in operations.",
        ).optional(),
        grantedMemoryThresholds: z.object({
          scaleIn: z.number().int().describe(
            "Required. The utilization triggering the scale-in operation in percent.",
          ).optional(),
          scaleOut: z.number().int().describe(
            "Required. The utilization triggering the scale-out operation in percent.",
          ).optional(),
        }).describe(
          "Thresholds define the utilization of resources triggering scale-out and scale-in operations.",
        ).optional(),
        nodeTypeId: z.string().describe(
          "Required. The canonical identifier of the node type to add or remove. Corresponds to the `NodeType`.",
        ).optional(),
        scaleOutSize: z.number().int().describe(
          "Required. Number of nodes to add to a cluster during a scale-out operation. Must be divisible by 2 for stretched clusters. During a scale-in operation only one node (or 2 for stretched clusters) are removed in a single iteration.",
        ).optional(),
        storageThresholds: z.object({
          scaleIn: z.number().int().describe(
            "Required. The utilization triggering the scale-in operation in percent.",
          ).optional(),
          scaleOut: z.number().int().describe(
            "Required. The utilization triggering the scale-out operation in percent.",
          ).optional(),
        }).describe(
          "Thresholds define the utilization of resources triggering scale-out and scale-in operations.",
        ).optional(),
      }),
    ).describe(
      "Required. The map with autoscaling policies applied to the cluster. The key is the identifier of the policy. It must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5) Currently there map must contain only one element that describes the autoscaling policy for compute nodes.",
    ).optional(),
    coolDownPeriod: z.string().describe(
      "Optional. The minimum duration between consecutive autoscale operations. It starts once addition or removal of nodes is fully completed. Defaults to 30 minutes if not specified. Cool down period must be in whole minutes (for example, 30, 31, 50, 180 minutes).",
    ).optional(),
    maxClusterNodeCount: z.number().int().describe(
      "Optional. Maximum number of nodes of any type in a cluster. If not specified the default limits apply.",
    ).optional(),
    minClusterNodeCount: z.number().int().describe(
      "Optional. Minimum number of nodes of any type in a cluster. If not specified the default limits apply.",
    ).optional(),
  }).describe(
    "Autoscaling settings define the rules used by VMware Engine to automatically scale-out and scale-in the clusters in a private cloud.",
  ).optional(),
  nodeTypeConfigs: z.record(
    z.string(),
    z.object({
      customCoreCount: z.number().int().describe(
        "Optional. Customized number of cores available to each node of the type. This number must always be one of `nodeType.availableCustomCoreCounts`. If zero is provided max value from `nodeType.availableCustomCoreCounts` will be used.",
      ).optional(),
      nodeCount: z.number().int().describe(
        "Required. The number of nodes of this type in the cluster",
      ).optional(),
    }),
  ).describe(
    "Required. The map of cluster node types in this cluster, where the key is canonical identifier of the node type (corresponds to the `NodeType`).",
  ).optional(),
  stretchedClusterConfig: z.object({
    preferredLocation: z.string().describe(
      "Required. Zone that will remain operational when connection between the two zones is lost. Specify the resource name of a zone that belongs to the region of the private cloud. For example: `projects/{project}/locations/europe-west3-a` where `{project}` can either be a project number or a project ID.",
    ).optional(),
    secondaryLocation: z.string().describe(
      "Required. Additional zone for a higher level of availability and load balancing. Specify the resource name of a zone that belongs to the region of the private cloud. For example: `projects/{project}/locations/europe-west3-b` where `{project}` can either be a project number or a project ID.",
    ).optional(),
  }).describe("Configuration of a stretched cluster.").optional(),
  clusterId: z.string().describe(
    "Required. The user-provided identifier of the new `Cluster`. This identifier must be unique among clusters within the parent and becomes the final token in the name URI. The identifier must meet the following requirements: * Only contains 1-63 alphanumeric characters and hyphens * Begins with an alphabetical character * Ends with a non-hyphen character * Not formatted as a UUID * Complies with [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034) (section 3.5)",
  ).optional(),
  requestId: z.string().describe(
    "Optional. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud VMware Engine PrivateClouds.Clusters. Registered at `@swamp/gcp/vmwareengine/privateclouds-clusters`. */
export const model = {
  type: "@swamp/gcp/vmwareengine/privateclouds-clusters",
  version: "2026.05.19.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A cluster in a private cloud.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a clusters",
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
        if (g["autoscalingSettings"] !== undefined) {
          body["autoscalingSettings"] = g["autoscalingSettings"];
        }
        if (g["nodeTypeConfigs"] !== undefined) {
          body["nodeTypeConfigs"] = g["nodeTypeConfigs"];
        }
        if (g["stretchedClusterConfig"] !== undefined) {
          body["stretchedClusterConfig"] = g["stretchedClusterConfig"];
        }
        if (g["clusterId"] !== undefined) body["clusterId"] = g["clusterId"];
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
              "failedValues": [],
            }
            : undefined,
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
      description: "Get a clusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the clusters"),
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
      description: "Update clusters attributes",
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
        if (g["autoscalingSettings"] !== undefined) {
          body["autoscalingSettings"] = g["autoscalingSettings"];
        }
        if (g["nodeTypeConfigs"] !== undefined) {
          body["nodeTypeConfigs"] = g["nodeTypeConfigs"];
        }
        if (g["stretchedClusterConfig"] !== undefined) {
          body["stretchedClusterConfig"] = g["stretchedClusterConfig"];
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
              "failedValues": [],
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
      description: "Delete the clusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the clusters"),
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
      description: "Sync clusters state from GCP",
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
    mount_datastore: {
      description: "mount datastore",
      arguments: z.object({
        datastoreMountConfig: z.any().optional(),
        ignoreColocation: z.any().optional(),
        requestId: z.any().optional(),
        validateOnly: z.any().optional(),
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
        if (args["datastoreMountConfig"] !== undefined) {
          body["datastoreMountConfig"] = args["datastoreMountConfig"];
        }
        if (args["ignoreColocation"] !== undefined) {
          body["ignoreColocation"] = args["ignoreColocation"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmwareengine.projects.locations.privateClouds.clusters.mountDatastore",
            "path": "v1/{+name}:mountDatastore",
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
    unmount_datastore: {
      description: "unmount datastore",
      arguments: z.object({
        datastore: z.any().optional(),
        requestId: z.any().optional(),
        validateOnly: z.any().optional(),
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
        if (args["datastore"] !== undefined) {
          body["datastore"] = args["datastore"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "vmwareengine.projects.locations.privateClouds.clusters.unmountDatastore",
            "path": "v1/{+name}:unmountDatastore",
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
  },
};
