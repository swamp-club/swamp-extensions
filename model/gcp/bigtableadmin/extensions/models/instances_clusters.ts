// Auto-generated extension model for @swamp/gcp/bigtableadmin/instances-clusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Bigtable Admin Instances.Clusters.
 *
 * A resizable group of nodes in a particular cloud location, capable of serving all Tables in the parent Instance.
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

const BASE_URL = "https://bigtableadmin.googleapis.com/";

const GET_CONFIG = {
  "id": "bigtableadmin.projects.instances.clusters.get",
  "path": "v2/{+name}",
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
  "id": "bigtableadmin.projects.instances.clusters.create",
  "path": "v2/{+parent}/clusters",
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
  },
} as const;

const UPDATE_CONFIG = {
  "id": "bigtableadmin.projects.instances.clusters.update",
  "path": "v2/{+name}",
  "httpMethod": "PUT",
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

const DELETE_CONFIG = {
  "id": "bigtableadmin.projects.instances.clusters.delete",
  "path": "v2/{+name}",
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

const GlobalArgsSchema = z.object({
  clusterConfig: z.object({
    clusterAutoscalingConfig: z.object({
      autoscalingLimits: z.object({
        maxServeNodes: z.number().int().describe(
          "Required. Maximum number of nodes to scale up to.",
        ).optional(),
        minServeNodes: z.number().int().describe(
          "Required. Minimum number of nodes to scale down to.",
        ).optional(),
      }).describe(
        "Limits for the number of nodes a Cluster can autoscale up/down to.",
      ).optional(),
      autoscalingTargets: z.object({
        cpuUtilizationPercent: z.number().int().describe(
          "The cpu utilization that the Autoscaler should be trying to achieve. This number is on a scale from 0 (no utilization) to 100 (total utilization), and is limited between 10 and 80, otherwise it will return INVALID_ARGUMENT error.",
        ).optional(),
        storageUtilizationGibPerNode: z.number().int().describe(
          "The storage utilization that the Autoscaler should be trying to achieve. This number is limited between 2560 (2.5TiB) and 5120 (5TiB) for a SSD cluster and between 8192 (8TiB) and 16384 (16TiB) for an HDD cluster, otherwise it will return INVALID_ARGUMENT error. If this value is set to 0, it will be treated as if it were set to the default value: 2560 for SSD, 8192 for HDD.",
        ).optional(),
      }).describe(
        "The Autoscaling targets for a Cluster. These determine the recommended nodes.",
      ).optional(),
    }).describe("Autoscaling config for a cluster.").optional(),
  }).describe("Configuration for a cluster.").optional(),
  defaultStorageType: z.enum(["STORAGE_TYPE_UNSPECIFIED", "SSD", "HDD"])
    .describe(
      "Immutable. The type of storage used by this cluster to serve its parent instance's tables, unless explicitly overridden.",
    ).optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "Describes the Cloud KMS encryption key that will be used to protect the destination Bigtable cluster. The requirements for this key are: 1) The Cloud Bigtable service account associated with the project that contains this cluster must be granted the `cloudkms.cryptoKeyEncrypterDecrypter` role on the CMEK key. 2) Only regional keys can be used and the region of the CMEK key must match the region of the cluster. Values are of the form `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}`",
    ).optional(),
  }).describe(
    "Cloud Key Management Service (Cloud KMS) settings for a CMEK-protected cluster.",
  ).optional(),
  location: z.string().describe(
    "Immutable. The location where this cluster's nodes and storage reside. For best performance, clients should be located as close as possible to this cluster. Currently only zones are supported, so values should be of the form `projects/{project}/locations/{zone}`.",
  ).optional(),
  name: z.string().describe(
    "The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`.",
  ).optional(),
  nodeScalingFactor: z.enum([
    "NODE_SCALING_FACTOR_UNSPECIFIED",
    "NODE_SCALING_FACTOR_1X",
    "NODE_SCALING_FACTOR_2X",
  ]).describe("Immutable. The node scaling factor of this cluster.").optional(),
  serveNodes: z.number().int().describe(
    "The number of nodes in the cluster. If no value is set, Cloud Bigtable automatically allocates nodes based on your data footprint and optimized for 50% storage utilization.",
  ).optional(),
  clusterId: z.string().describe(
    "Required. The ID to be used when referring to the new cluster within its instance, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`.",
  ).optional(),
});

const StateSchema = z.object({
  clusterConfig: z.object({
    clusterAutoscalingConfig: z.object({
      autoscalingLimits: z.object({
        maxServeNodes: z.number(),
        minServeNodes: z.number(),
      }),
      autoscalingTargets: z.object({
        cpuUtilizationPercent: z.number(),
        storageUtilizationGibPerNode: z.number(),
      }),
    }),
  }).optional(),
  defaultStorageType: z.string().optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  location: z.string().optional(),
  name: z.string(),
  nodeScalingFactor: z.string().optional(),
  serveNodes: z.number().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  clusterConfig: z.object({
    clusterAutoscalingConfig: z.object({
      autoscalingLimits: z.object({
        maxServeNodes: z.number().int().describe(
          "Required. Maximum number of nodes to scale up to.",
        ).optional(),
        minServeNodes: z.number().int().describe(
          "Required. Minimum number of nodes to scale down to.",
        ).optional(),
      }).describe(
        "Limits for the number of nodes a Cluster can autoscale up/down to.",
      ).optional(),
      autoscalingTargets: z.object({
        cpuUtilizationPercent: z.number().int().describe(
          "The cpu utilization that the Autoscaler should be trying to achieve. This number is on a scale from 0 (no utilization) to 100 (total utilization), and is limited between 10 and 80, otherwise it will return INVALID_ARGUMENT error.",
        ).optional(),
        storageUtilizationGibPerNode: z.number().int().describe(
          "The storage utilization that the Autoscaler should be trying to achieve. This number is limited between 2560 (2.5TiB) and 5120 (5TiB) for a SSD cluster and between 8192 (8TiB) and 16384 (16TiB) for an HDD cluster, otherwise it will return INVALID_ARGUMENT error. If this value is set to 0, it will be treated as if it were set to the default value: 2560 for SSD, 8192 for HDD.",
        ).optional(),
      }).describe(
        "The Autoscaling targets for a Cluster. These determine the recommended nodes.",
      ).optional(),
    }).describe("Autoscaling config for a cluster.").optional(),
  }).describe("Configuration for a cluster.").optional(),
  defaultStorageType: z.enum(["STORAGE_TYPE_UNSPECIFIED", "SSD", "HDD"])
    .describe(
      "Immutable. The type of storage used by this cluster to serve its parent instance's tables, unless explicitly overridden.",
    ).optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "Describes the Cloud KMS encryption key that will be used to protect the destination Bigtable cluster. The requirements for this key are: 1) The Cloud Bigtable service account associated with the project that contains this cluster must be granted the `cloudkms.cryptoKeyEncrypterDecrypter` role on the CMEK key. 2) Only regional keys can be used and the region of the CMEK key must match the region of the cluster. Values are of the form `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}`",
    ).optional(),
  }).describe(
    "Cloud Key Management Service (Cloud KMS) settings for a CMEK-protected cluster.",
  ).optional(),
  location: z.string().describe(
    "Immutable. The location where this cluster's nodes and storage reside. For best performance, clients should be located as close as possible to this cluster. Currently only zones are supported, so values should be of the form `projects/{project}/locations/{zone}`.",
  ).optional(),
  name: z.string().describe(
    "The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`.",
  ).optional(),
  nodeScalingFactor: z.enum([
    "NODE_SCALING_FACTOR_UNSPECIFIED",
    "NODE_SCALING_FACTOR_1X",
    "NODE_SCALING_FACTOR_2X",
  ]).describe("Immutable. The node scaling factor of this cluster.").optional(),
  serveNodes: z.number().int().describe(
    "The number of nodes in the cluster. If no value is set, Cloud Bigtable automatically allocates nodes based on your data footprint and optimized for 50% storage utilization.",
  ).optional(),
  clusterId: z.string().describe(
    "Required. The ID to be used when referring to the new cluster within its instance, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Bigtable Admin Instances.Clusters. Registered at `@swamp/gcp/bigtableadmin/instances-clusters`. */
export const model = {
  type: "@swamp/gcp/bigtableadmin/instances-clusters",
  version: "2026.05.18.1",
  upgrades: [
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
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.06.1",
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
      description:
        "A resizable group of nodes in a particular cloud location, capable of serving...",
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
        if (g["clusterConfig"] !== undefined) {
          body["clusterConfig"] = g["clusterConfig"];
        }
        if (g["defaultStorageType"] !== undefined) {
          body["defaultStorageType"] = g["defaultStorageType"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nodeScalingFactor"] !== undefined) {
          body["nodeScalingFactor"] = g["nodeScalingFactor"];
        }
        if (g["serveNodes"] !== undefined) body["serveNodes"] = g["serveNodes"];
        if (g["clusterId"] !== undefined) body["clusterId"] = g["clusterId"];
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
              "readyValues": ["READY"],
              "failedValues": [],
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
        if (g["clusterConfig"] !== undefined) {
          body["clusterConfig"] = g["clusterConfig"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["serveNodes"] !== undefined) body["serveNodes"] = g["serveNodes"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
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
    partial_update_cluster: {
      description: "partial update cluster",
      arguments: z.object({
        clusterConfig: z.any().optional(),
        defaultStorageType: z.any().optional(),
        encryptionConfig: z.any().optional(),
        location: z.any().optional(),
        name: z.any().optional(),
        nodeScalingFactor: z.any().optional(),
        serveNodes: z.any().optional(),
        state: z.any().optional(),
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
        if (args["clusterConfig"] !== undefined) {
          body["clusterConfig"] = args["clusterConfig"];
        }
        if (args["defaultStorageType"] !== undefined) {
          body["defaultStorageType"] = args["defaultStorageType"];
        }
        if (args["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = args["encryptionConfig"];
        }
        if (args["location"] !== undefined) body["location"] = args["location"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["nodeScalingFactor"] !== undefined) {
          body["nodeScalingFactor"] = args["nodeScalingFactor"];
        }
        if (args["serveNodes"] !== undefined) {
          body["serveNodes"] = args["serveNodes"];
        }
        if (args["state"] !== undefined) body["state"] = args["state"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "bigtableadmin.projects.instances.clusters.partialUpdateCluster",
            "path": "v2/{+name}",
            "httpMethod": "PATCH",
            "parameterOrder": ["name"],
            "parameters": {
              "name": { "location": "path", "required": true },
              "updateMask": { "location": "query" },
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
