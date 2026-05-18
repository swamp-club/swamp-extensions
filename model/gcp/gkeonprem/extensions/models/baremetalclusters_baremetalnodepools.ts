// Auto-generated extension model for @swamp/gcp/gkeonprem/baremetalclusters-baremetalnodepools
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE On-Prem BareMetalClusters.BareMetalNodePools.
 *
 * Resource that represents a bare metal node pool.
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
  return `${parent}/bareMetalNodePools/${shortName}`;
}

const BASE_URL = "https://gkeonprem.googleapis.com/";

const GET_CONFIG = {
  "id": "gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id":
    "gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.create",
  "path": "v1/{+parent}/bareMetalNodePools",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "bareMetalNodePoolId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
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
  "id":
    "gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "etag": {
      "location": "query",
    },
    "ignoreErrors": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the bare metal node pool. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  displayName: z.string().describe(
    "The display name for the bare metal node pool.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The bare metal node pool resource name.",
  ).optional(),
  nodePoolConfig: z.object({
    kubeletConfig: z.object({
      registryBurst: z.number().int().describe(
        "The maximum size of bursty pulls, temporarily allows pulls to burst to this number, while still not exceeding registry_pull_qps. The value must not be a negative number. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 10.",
      ).optional(),
      registryPullQps: z.number().int().describe(
        "The limit of registry pulls per second. Setting this value to 0 means no limit. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 5.",
      ).optional(),
      serializeImagePullsDisabled: z.boolean().describe(
        "Prevents the Kubelet from pulling multiple images at a time. We recommend *not* changing the default value on nodes that run docker daemon with version < 1.9 or an Another Union File System (Aufs) storage backend. Issue https://github.com/kubernetes/kubernetes/issues/10959 has more details.",
      ).optional(),
    }).describe(
      "KubeletConfig defines the modifiable kubelet configurations for bare metal machines. Note: this list includes fields supported in GKE (see https://cloud.google.com/kubernetes-engine/docs/how-to/node-system-config#kubelet-options).",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      'The labels assigned to nodes of this node pool. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
    ).optional(),
    nodeConfigs: z.array(z.object({
      labels: z.record(z.string(), z.string()).describe(
        'The labels assigned to this node. An object containing a list of key/value pairs. The labels here, unioned with the labels set on BareMetalNodePoolConfig are the set of labels that will be applied to the node. If there are any conflicts, the BareMetalNodeConfig labels take precedence. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
      ).optional(),
      nodeIp: z.string().describe(
        "The default IPv4 address for SSH access and Kubernetes node. Example: 192.168.0.1",
      ).optional(),
    })).describe(
      "Required. The list of machine addresses in the bare metal node pool.",
    ).optional(),
    operatingSystem: z.enum(["OPERATING_SYSTEM_UNSPECIFIED", "LINUX"]).describe(
      "Specifies the nodes operating system (default: LINUX).",
    ).optional(),
    taints: z.array(z.object({
      effect: z.enum([
        "EFFECT_UNSPECIFIED",
        "NO_SCHEDULE",
        "PREFER_NO_SCHEDULE",
        "NO_EXECUTE",
      ]).describe("The taint effect.").optional(),
      key: z.string().describe("Key associated with the effect.").optional(),
      value: z.string().describe("Value associated with the effect.")
        .optional(),
    })).describe("The initial taints assigned to nodes of this node pool.")
      .optional(),
  }).describe(
    "BareMetalNodePoolConfig describes the configuration of all nodes within a given bare metal node pool.",
  ).optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string().describe(
        "Last time the condition transit from one status to another.",
      ).optional(),
      message: z.string().describe(
        "Human-readable message indicating details about last transition.",
      ).optional(),
      reason: z.string().describe(
        "Machine-readable message indicating details about last transition.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "STATE_TRUE",
        "STATE_FALSE",
        "STATE_UNKNOWN",
      ]).describe("state of the condition.").optional(),
      type: z.string().describe(
        "Type of the condition. (e.g., ClusterRunning, NodePoolRunning or ServerSidePreflightReady)",
      ).optional(),
    })).describe(
      "ResourceCondition provide a standard mechanism for higher-level status reporting from controller.",
    ).optional(),
    errorMessage: z.string().describe(
      "Human-friendly representation of the error message from controller. The error message can be temporary as the controller controller creates a cluster or node pool. If the error message persists for a longer period of time, it can be used to surface error message to indicate real problems requiring user intervention.",
    ).optional(),
    version: z.string().describe("Reflect current version of the resource.")
      .optional(),
    versions: z.object({
      versions: z.array(z.object({
        count: z.string().describe(
          "Number of machines under the above version.",
        ).optional(),
        version: z.string().describe("Resource version.").optional(),
      })).describe(
        "Shows the mapping of a given version to the number of machines under this version.",
      ).optional(),
    }).describe(
      "Versions describes the mapping of a given version to the number of machines under this version.",
    ).optional(),
  }).describe(
    "ResourceStatus describes why a cluster or node pool has a certain status. (e.g., ERROR or DEGRADED).",
  ).optional(),
  upgradePolicy: z.object({
    parallelUpgradeConfig: z.object({
      concurrentNodes: z.number().int().describe(
        "The maximum number of nodes that can be upgraded at once.",
      ).optional(),
      minimumAvailableNodes: z.number().int().describe(
        "The minimum number of nodes that should be healthy and available during an upgrade. If set to the default value of 0, it is possible that none of the nodes will be available during an upgrade.",
      ).optional(),
    }).describe(
      "BareMetalParallelUpgradeConfig defines the parallel upgrade settings for worker node pools.",
    ).optional(),
  }).describe(
    "BareMetalNodePoolUpgradePolicy defines the node pool upgrade policy.",
  ).optional(),
  bareMetalNodePoolId: z.string().describe(
    "The ID to use for the node pool, which will become the final component of the node pool's resource name. This value must be up to 63 characters, and valid characters are /a-z-/. The value must not be permitted to be a UUID (or UUID-like: anything matching /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  name: z.string(),
  nodePoolConfig: z.object({
    kubeletConfig: z.object({
      registryBurst: z.number(),
      registryPullQps: z.number(),
      serializeImagePullsDisabled: z.boolean(),
    }),
    labels: z.record(z.string(), z.unknown()),
    nodeConfigs: z.array(z.object({
      labels: z.record(z.string(), z.unknown()),
      nodeIp: z.string(),
    })),
    operatingSystem: z.string(),
    taints: z.array(z.object({
      effect: z.string(),
      key: z.string(),
      value: z.string(),
    })),
  }).optional(),
  reconciling: z.boolean().optional(),
  state: z.string().optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string(),
      message: z.string(),
      reason: z.string(),
      state: z.string(),
      type: z.string(),
    })),
    errorMessage: z.string(),
    version: z.string(),
    versions: z.object({
      versions: z.array(z.object({
        count: z.string(),
        version: z.string(),
      })),
    }),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
  upgradePolicy: z.object({
    parallelUpgradeConfig: z.object({
      concurrentNodes: z.number(),
      minimumAvailableNodes: z.number(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the bare metal node pool. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  displayName: z.string().describe(
    "The display name for the bare metal node pool.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The bare metal node pool resource name.",
  ).optional(),
  nodePoolConfig: z.object({
    kubeletConfig: z.object({
      registryBurst: z.number().int().describe(
        "The maximum size of bursty pulls, temporarily allows pulls to burst to this number, while still not exceeding registry_pull_qps. The value must not be a negative number. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 10.",
      ).optional(),
      registryPullQps: z.number().int().describe(
        "The limit of registry pulls per second. Setting this value to 0 means no limit. Updating this field may impact scalability by changing the amount of traffic produced by image pulls. Defaults to 5.",
      ).optional(),
      serializeImagePullsDisabled: z.boolean().describe(
        "Prevents the Kubelet from pulling multiple images at a time. We recommend *not* changing the default value on nodes that run docker daemon with version < 1.9 or an Another Union File System (Aufs) storage backend. Issue https://github.com/kubernetes/kubernetes/issues/10959 has more details.",
      ).optional(),
    }).describe(
      "KubeletConfig defines the modifiable kubelet configurations for bare metal machines. Note: this list includes fields supported in GKE (see https://cloud.google.com/kubernetes-engine/docs/how-to/node-system-config#kubelet-options).",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      'The labels assigned to nodes of this node pool. An object containing a list of key/value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
    ).optional(),
    nodeConfigs: z.array(z.object({
      labels: z.record(z.string(), z.string()).describe(
        'The labels assigned to this node. An object containing a list of key/value pairs. The labels here, unioned with the labels set on BareMetalNodePoolConfig are the set of labels that will be applied to the node. If there are any conflicts, the BareMetalNodeConfig labels take precedence. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }.',
      ).optional(),
      nodeIp: z.string().describe(
        "The default IPv4 address for SSH access and Kubernetes node. Example: 192.168.0.1",
      ).optional(),
    })).describe(
      "Required. The list of machine addresses in the bare metal node pool.",
    ).optional(),
    operatingSystem: z.enum(["OPERATING_SYSTEM_UNSPECIFIED", "LINUX"]).describe(
      "Specifies the nodes operating system (default: LINUX).",
    ).optional(),
    taints: z.array(z.object({
      effect: z.enum([
        "EFFECT_UNSPECIFIED",
        "NO_SCHEDULE",
        "PREFER_NO_SCHEDULE",
        "NO_EXECUTE",
      ]).describe("The taint effect.").optional(),
      key: z.string().describe("Key associated with the effect.").optional(),
      value: z.string().describe("Value associated with the effect.")
        .optional(),
    })).describe("The initial taints assigned to nodes of this node pool.")
      .optional(),
  }).describe(
    "BareMetalNodePoolConfig describes the configuration of all nodes within a given bare metal node pool.",
  ).optional(),
  status: z.object({
    conditions: z.array(z.object({
      lastTransitionTime: z.string().describe(
        "Last time the condition transit from one status to another.",
      ).optional(),
      message: z.string().describe(
        "Human-readable message indicating details about last transition.",
      ).optional(),
      reason: z.string().describe(
        "Machine-readable message indicating details about last transition.",
      ).optional(),
      state: z.enum([
        "STATE_UNSPECIFIED",
        "STATE_TRUE",
        "STATE_FALSE",
        "STATE_UNKNOWN",
      ]).describe("state of the condition.").optional(),
      type: z.string().describe(
        "Type of the condition. (e.g., ClusterRunning, NodePoolRunning or ServerSidePreflightReady)",
      ).optional(),
    })).describe(
      "ResourceCondition provide a standard mechanism for higher-level status reporting from controller.",
    ).optional(),
    errorMessage: z.string().describe(
      "Human-friendly representation of the error message from controller. The error message can be temporary as the controller controller creates a cluster or node pool. If the error message persists for a longer period of time, it can be used to surface error message to indicate real problems requiring user intervention.",
    ).optional(),
    version: z.string().describe("Reflect current version of the resource.")
      .optional(),
    versions: z.object({
      versions: z.array(z.object({
        count: z.string().describe(
          "Number of machines under the above version.",
        ).optional(),
        version: z.string().describe("Resource version.").optional(),
      })).describe(
        "Shows the mapping of a given version to the number of machines under this version.",
      ).optional(),
    }).describe(
      "Versions describes the mapping of a given version to the number of machines under this version.",
    ).optional(),
  }).describe(
    "ResourceStatus describes why a cluster or node pool has a certain status. (e.g., ERROR or DEGRADED).",
  ).optional(),
  upgradePolicy: z.object({
    parallelUpgradeConfig: z.object({
      concurrentNodes: z.number().int().describe(
        "The maximum number of nodes that can be upgraded at once.",
      ).optional(),
      minimumAvailableNodes: z.number().int().describe(
        "The minimum number of nodes that should be healthy and available during an upgrade. If set to the default value of 0, it is possible that none of the nodes will be available during an upgrade.",
      ).optional(),
    }).describe(
      "BareMetalParallelUpgradeConfig defines the parallel upgrade settings for worker node pools.",
    ).optional(),
  }).describe(
    "BareMetalNodePoolUpgradePolicy defines the node pool upgrade policy.",
  ).optional(),
  bareMetalNodePoolId: z.string().describe(
    "The ID to use for the node pool, which will become the final component of the node pool's resource name. This value must be up to 63 characters, and valid characters are /a-z-/. The value must not be permitted to be a UUID (or UUID-like: anything matching /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud GKE On-Prem BareMetalClusters.BareMetalNodePools. Registered at `@swamp/gcp/gkeonprem/baremetalclusters-baremetalnodepools`. */
export const model = {
  type: "@swamp/gcp/gkeonprem/baremetalclusters-baremetalnodepools",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Resource that represents a bare metal node pool.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a bareMetalNodePools",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nodePoolConfig"] !== undefined) {
          body["nodePoolConfig"] = g["nodePoolConfig"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["upgradePolicy"] !== undefined) {
          body["upgradePolicy"] = g["upgradePolicy"];
        }
        if (g["bareMetalNodePoolId"] !== undefined) {
          body["bareMetalNodePoolId"] = g["bareMetalNodePoolId"];
        }
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
              "readyValues": ["RUNNING", "RECONCILING"],
              "failedValues": ["ERROR", "DEGRADED"],
            }
            : undefined,
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
      description: "Get a bareMetalNodePools",
      arguments: z.object({
        identifier: z.string().describe("The name of the bareMetalNodePools"),
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
      description: "Update bareMetalNodePools attributes",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["nodePoolConfig"] !== undefined) {
          body["nodePoolConfig"] = g["nodePoolConfig"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["upgradePolicy"] !== undefined) {
          body["upgradePolicy"] = g["upgradePolicy"];
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
              "readyValues": ["RUNNING", "RECONCILING"],
              "failedValues": ["ERROR", "DEGRADED"],
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
      description: "Delete the bareMetalNodePools",
      arguments: z.object({
        identifier: z.string().describe("The name of the bareMetalNodePools"),
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
      description: "Sync bareMetalNodePools state from GCP",
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
    enroll: {
      description: "enroll",
      arguments: z.object({
        bareMetalNodePoolId: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["bareMetalNodePoolId"] !== undefined) {
          body["bareMetalNodePoolId"] = args["bareMetalNodePoolId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.enroll",
            "path": "v1/{+parent}/bareMetalNodePools:enroll",
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
    unenroll: {
      description: "unenroll",
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
              "gkeonprem.projects.locations.bareMetalClusters.bareMetalNodePools.unenroll",
            "path": "v1/{+name}:unenroll",
            "httpMethod": "DELETE",
            "parameterOrder": ["name"],
            "parameters": {
              "allowMissing": { "location": "query" },
              "etag": { "location": "query" },
              "name": { "location": "path", "required": true },
              "validateOnly": { "location": "query" },
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
