// Auto-generated extension model for @swamp/gcp/gkeonprem/vmwareclusters-vmwarenodepools
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud GKE On-Prem VmwareClusters.VmwareNodePools.
 *
 * Resource VmwareNodePool represents a VMware node pool. ##
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
  return `${parent}/vmwareNodePools/${shortName}`;
}

const BASE_URL = "https://gkeonprem.googleapis.com/";

const GET_CONFIG = {
  "id": "gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.get",
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
  "id": "gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.create",
  "path": "v1/{+parent}/vmwareNodePools",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
    "vmwareNodePoolId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.delete",
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

const LIST_CONFIG = {
  "id": "gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.list",
  "path": "v1/{+parent}/vmwareNodePools",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the node pool. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  config: z.object({
    bootDiskSizeGb: z.string().describe(
      "VMware disk size to be used during creation.",
    ).optional(),
    cpus: z.string().describe(
      "The number of CPUs for each node in the node pool.",
    ).optional(),
    enableLoadBalancer: z.boolean().describe(
      "Allow node pool traffic to be load balanced. Only works for clusters with MetalLB load balancers.",
    ).optional(),
    image: z.string().describe(
      "The OS image name in vCenter, only valid when using Windows.",
    ).optional(),
    imageType: z.string().describe(
      "Required. The OS image to be used for each node in a node pool. Currently `cos`, `cos_cgv2`, `ubuntu`, `ubuntu_cgv2`, `ubuntu_containerd` and `windows` are supported.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The map of Kubernetes labels (key/value pairs) to be applied to each node. These will added in addition to any default label(s) that Kubernetes may apply to the node. In case of conflict in label keys, the applied set may differ depending on the Kubernetes version -- it's best to assume the behavior is undefined and conflicts should be avoided. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/",
    ).optional(),
    memoryMb: z.string().describe(
      "The megabytes of memory for each node in the node pool.",
    ).optional(),
    replicas: z.string().describe("The number of nodes in the node pool.")
      .optional(),
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
    vsphereConfig: z.object({
      datastore: z.string().describe(
        "The name of the vCenter datastore. Inherited from the user cluster.",
      ).optional(),
      hostGroups: z.array(z.string()).describe(
        "Vsphere host groups to apply to all VMs in the node pool",
      ).optional(),
      tags: z.array(z.object({
        category: z.string().describe("The Vsphere tag category.").optional(),
        tag: z.string().describe("The Vsphere tag name.").optional(),
      })).describe("Tags to apply to VMs.").optional(),
    }).describe(
      "VmwareVsphereConfig represents configuration for the VMware VCenter for node pool.",
    ).optional(),
  }).describe(
    "Parameters that describe the configuration of all nodes within a given node pool.",
  ).optional(),
  displayName: z.string().describe("The display name for the node pool.")
    .optional(),
  name: z.string().describe("Immutable. The resource name of this node pool.")
    .optional(),
  nodePoolAutoscaling: z.object({
    maxReplicas: z.number().int().describe(
      "Maximum number of replicas in the NodePool.",
    ).optional(),
    minReplicas: z.number().int().describe(
      "Minimum number of replicas in the NodePool.",
    ).optional(),
  }).describe(
    "NodePoolAutoscaling config for the NodePool to allow for the kubernetes to scale NodePool.",
  ).optional(),
  onPremVersion: z.string().describe(
    "Anthos version for the node pool. Defaults to the user cluster version.",
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
  vmwareNodePoolId: z.string().describe(
    "The ID to use for the node pool, which will become the final component of the node pool's resource name. This value must be up to 40 characters and follow RFC-1123 (https://tools.ietf.org/html/rfc1123) format. The value must not be permitted to be a UUID (or UUID-like: anything matching /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  config: z.object({
    bootDiskSizeGb: z.string(),
    cpus: z.string(),
    enableLoadBalancer: z.boolean(),
    image: z.string(),
    imageType: z.string(),
    labels: z.record(z.string(), z.unknown()),
    memoryMb: z.string(),
    replicas: z.string(),
    taints: z.array(z.object({
      effect: z.string(),
      key: z.string(),
      value: z.string(),
    })),
    vsphereConfig: z.object({
      datastore: z.string(),
      hostGroups: z.array(z.string()),
      tags: z.array(z.object({
        category: z.string(),
        tag: z.string(),
      })),
    }),
  }).optional(),
  createTime: z.string().optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  name: z.string(),
  nodePoolAutoscaling: z.object({
    maxReplicas: z.number(),
    minReplicas: z.number(),
  }).optional(),
  onPremVersion: z.string().optional(),
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
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations on the node pool. This field has the same restrictions as Kubernetes annotations. The total size of all keys and values combined is limited to 256k. Key can have 2 segments: prefix (optional) and name (required), separated by a slash (/). Prefix must be a DNS subdomain. Name must be 63 characters or less, begin and end with alphanumerics, with dashes (-), underscores (_), dots (.), and alphanumerics between.",
  ).optional(),
  config: z.object({
    bootDiskSizeGb: z.string().describe(
      "VMware disk size to be used during creation.",
    ).optional(),
    cpus: z.string().describe(
      "The number of CPUs for each node in the node pool.",
    ).optional(),
    enableLoadBalancer: z.boolean().describe(
      "Allow node pool traffic to be load balanced. Only works for clusters with MetalLB load balancers.",
    ).optional(),
    image: z.string().describe(
      "The OS image name in vCenter, only valid when using Windows.",
    ).optional(),
    imageType: z.string().describe(
      "Required. The OS image to be used for each node in a node pool. Currently `cos`, `cos_cgv2`, `ubuntu`, `ubuntu_cgv2`, `ubuntu_containerd` and `windows` are supported.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The map of Kubernetes labels (key/value pairs) to be applied to each node. These will added in addition to any default label(s) that Kubernetes may apply to the node. In case of conflict in label keys, the applied set may differ depending on the Kubernetes version -- it's best to assume the behavior is undefined and conflicts should be avoided. For more information, including usage and the valid values, see: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/",
    ).optional(),
    memoryMb: z.string().describe(
      "The megabytes of memory for each node in the node pool.",
    ).optional(),
    replicas: z.string().describe("The number of nodes in the node pool.")
      .optional(),
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
    vsphereConfig: z.object({
      datastore: z.string().describe(
        "The name of the vCenter datastore. Inherited from the user cluster.",
      ).optional(),
      hostGroups: z.array(z.string()).describe(
        "Vsphere host groups to apply to all VMs in the node pool",
      ).optional(),
      tags: z.array(z.object({
        category: z.string().describe("The Vsphere tag category.").optional(),
        tag: z.string().describe("The Vsphere tag name.").optional(),
      })).describe("Tags to apply to VMs.").optional(),
    }).describe(
      "VmwareVsphereConfig represents configuration for the VMware VCenter for node pool.",
    ).optional(),
  }).describe(
    "Parameters that describe the configuration of all nodes within a given node pool.",
  ).optional(),
  displayName: z.string().describe("The display name for the node pool.")
    .optional(),
  name: z.string().describe("Immutable. The resource name of this node pool.")
    .optional(),
  nodePoolAutoscaling: z.object({
    maxReplicas: z.number().int().describe(
      "Maximum number of replicas in the NodePool.",
    ).optional(),
    minReplicas: z.number().int().describe(
      "Minimum number of replicas in the NodePool.",
    ).optional(),
  }).describe(
    "NodePoolAutoscaling config for the NodePool to allow for the kubernetes to scale NodePool.",
  ).optional(),
  onPremVersion: z.string().describe(
    "Anthos version for the node pool. Defaults to the user cluster version.",
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
  vmwareNodePoolId: z.string().describe(
    "The ID to use for the node pool, which will become the final component of the node pool's resource name. This value must be up to 40 characters and follow RFC-1123 (https://tools.ietf.org/html/rfc1123) format. The value must not be permitted to be a UUID (or UUID-like: anything matching /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud GKE On-Prem VmwareClusters.VmwareNodePools. Registered at `@swamp/gcp/gkeonprem/vmwareclusters-vmwarenodepools`. */
export const model = {
  type: "@swamp/gcp/gkeonprem/vmwareclusters-vmwarenodepools",
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
      toVersion: "2026.05.18.1",
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
      description: "Resource VmwareNodePool represents a VMware node pool. ##",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a vmwareNodePools",
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
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nodePoolAutoscaling"] !== undefined) {
          body["nodePoolAutoscaling"] = g["nodePoolAutoscaling"];
        }
        if (g["onPremVersion"] !== undefined) {
          body["onPremVersion"] = g["onPremVersion"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["vmwareNodePoolId"] !== undefined) {
          body["vmwareNodePoolId"] = g["vmwareNodePoolId"];
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
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
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
      description: "Get a vmwareNodePools",
      arguments: z.object({
        identifier: z.string().describe("The name of the vmwareNodePools"),
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
      description: "Update vmwareNodePools attributes",
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
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["nodePoolAutoscaling"] !== undefined) {
          body["nodePoolAutoscaling"] = g["nodePoolAutoscaling"];
        }
        if (g["onPremVersion"] !== undefined) {
          body["onPremVersion"] = g["onPremVersion"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
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
      description: "Delete the vmwareNodePools",
      arguments: z.object({
        identifier: z.string().describe("The name of the vmwareNodePools"),
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
      description: "Sync vmwareNodePools state from GCP",
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
      description: "List vmwareNodePools resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of node pools to return. The service may return fewer than this value. If unspecified, at most 50 node pools will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
        ).optional(),
        view: z.string().describe(
          "View for VMware node pools. When `BASIC` is specified, only the node pool resource name is returned. The default/unset value `NODE_POOL_VIEW_UNSPECIFIED` is the same as `FULL', which returns the complete node pool configuration details.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "vmwareNodePools",
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
    enroll: {
      description: "enroll",
      arguments: z.object({
        vmwareNodePoolId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["vmwareNodePoolId"] !== undefined) {
          body["vmwareNodePoolId"] = args["vmwareNodePoolId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.enroll",
            "path": "v1/{+parent}/vmwareNodePools:enroll",
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
              "gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.getIamPolicy",
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
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
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
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.setIamPolicy",
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
              "gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.testIamPermissions",
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
              "gkeonprem.projects.locations.vmwareClusters.vmwareNodePools.unenroll",
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
