// Auto-generated extension model for @swamp/gcp/bigtableadmin/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Bigtable Admin Instances.
 *
 * A collection of Bigtable Tables and the resources that serve them. All tables in an instance are served from all Clusters in the instance.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://bigtableadmin.googleapis.com/";

const GET_CONFIG = {
  "id": "bigtableadmin.projects.instances.get",
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
  "id": "bigtableadmin.projects.instances.create",
  "path": "v2/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "bigtableadmin.projects.instances.update",
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
  "id": "bigtableadmin.projects.instances.delete",
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

const LIST_CONFIG = {
  "id": "bigtableadmin.projects.instances.list",
  "path": "v2/{+parent}/instances",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  clusters: z.record(
    z.string(),
    z.object({
      clusterConfig: z.object({
        clusterAutoscalingConfig: z.object({
          autoscalingLimits: z.object({
            maxServeNodes: z.unknown().describe(
              "Required. Maximum number of nodes to scale up to.",
            ).optional(),
            minServeNodes: z.unknown().describe(
              "Required. Minimum number of nodes to scale down to.",
            ).optional(),
          }).describe(
            "Limits for the number of nodes a Cluster can autoscale up/down to.",
          ).optional(),
          autoscalingTargets: z.object({
            cpuUtilizationPercent: z.unknown().describe(
              "The cpu utilization that the Autoscaler should be trying to achieve. This number is on a scale from 0 (no utilization) to 100 (total utilization), and is limited between 10 and 80, otherwise it will return INVALID_ARGUMENT error.",
            ).optional(),
            storageUtilizationGibPerNode: z.unknown().describe(
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
      ]).describe("Immutable. The node scaling factor of this cluster.")
        .optional(),
      serveNodes: z.number().int().describe(
        "The number of nodes in the cluster. If no value is set, Cloud Bigtable automatically allocates nodes based on your data footprint and optimized for 50% storage utilization.",
      ).optional(),
      state: z.enum([
        "STATE_NOT_KNOWN",
        "READY",
        "CREATING",
        "RESIZING",
        "DISABLED",
      ]).describe("Output only. The current state of the cluster.").optional(),
    }),
  ).describe(
    "Required. The clusters to be created within the instance, mapped by desired cluster ID, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`. Fields marked `OutputOnly` must be left blank.",
  ).optional(),
  instance: z.object({
    createTime: z.string().describe(
      "Output only. A commit timestamp representing when this Instance was created. For instances created before this field was added (August 2021), this value is `seconds: 0, nanos: 1`.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The descriptive name for this instance as it appears in UIs. Can be changed at any time, but should be kept globally unique to avoid confusion.",
    ).optional(),
    edition: z.enum(["EDITION_UNSPECIFIED", "ENTERPRISE", "ENTERPRISE_PLUS"])
      .describe(
        "Optional. The edition of the instance. See Edition for details.",
      ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. They can be used to filter resources and aggregate metrics. * Label keys must be between 1 and 63 characters long and must conform to the regular expression: `\\p{Ll}\\p{Lo}{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression: `[\\p{Ll}\\p{Lo}\\p{N}_-]{0,63}`. * No more than 64 labels can be associated with a given resource. * Keys and values must both be under 128 bytes.",
    ).optional(),
    name: z.string().describe(
      "The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`.",
    ).optional(),
    satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    state: z.enum(["STATE_NOT_KNOWN", "READY", "CREATING"]).describe(
      "Output only. The current state of the instance.",
    ).optional(),
    tags: z.record(z.string(), z.string()).describe(
      'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: - "123/environment": "production", - "123/costCenter": "marketing" Tags and Labels (above) are both used to bind metadata to resources, with different use-cases. See https://cloud.google.com/resource-manager/docs/tags/tags-overview for an in-depth overview on the difference between tags and labels.',
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "PRODUCTION", "DEVELOPMENT"]).describe(
      "The type of the instance. Defaults to `PRODUCTION`.",
    ).optional(),
  }).describe(
    "A collection of Bigtable Tables and the resources that serve them. All tables in an instance are served from all Clusters in the instance.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. The ID to be used when referring to the new instance within its project, e.g., just `myinstance` rather than `projects/myproject/instances/myinstance`.",
  ).optional(),
  parent: z.string().describe(
    "Required. The unique name of the project in which to create the new instance. Values are of the form `projects/{project}`.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. A commit timestamp representing when this Instance was created. For instances created before this field was added (August 2021), this value is `seconds: 0, nanos: 1`.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The descriptive name for this instance as it appears in UIs. Can be changed at any time, but should be kept globally unique to avoid confusion.",
  ).optional(),
  edition: z.enum(["EDITION_UNSPECIFIED", "ENTERPRISE", "ENTERPRISE_PLUS"])
    .describe("Optional. The edition of the instance. See Edition for details.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. They can be used to filter resources and aggregate metrics. * Label keys must be between 1 and 63 characters long and must conform to the regular expression: `\\p{Ll}\\p{Lo}{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression: `[\\p{Ll}\\p{Lo}\\p{N}_-]{0,63}`. * No more than 64 labels can be associated with a given resource. * Keys and values must both be under 128 bytes.",
  ).optional(),
  name: z.string().describe(
    "The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`.",
  ).optional(),
  satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
    .optional(),
  satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
    .optional(),
  state: z.enum(["STATE_NOT_KNOWN", "READY", "CREATING"]).describe(
    "Output only. The current state of the instance.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: - "123/environment": "production", - "123/costCenter": "marketing" Tags and Labels (above) are both used to bind metadata to resources, with different use-cases. See https://cloud.google.com/resource-manager/docs/tags/tags-overview for an in-depth overview on the difference between tags and labels.',
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "PRODUCTION", "DEVELOPMENT"]).describe(
    "The type of the instance. Defaults to `PRODUCTION`.",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  edition: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  state: z.string().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  clusters: z.record(
    z.string(),
    z.object({
      clusterConfig: z.object({
        clusterAutoscalingConfig: z.object({
          autoscalingLimits: z.object({
            maxServeNodes: z.unknown().describe(
              "Required. Maximum number of nodes to scale up to.",
            ).optional(),
            minServeNodes: z.unknown().describe(
              "Required. Minimum number of nodes to scale down to.",
            ).optional(),
          }).describe(
            "Limits for the number of nodes a Cluster can autoscale up/down to.",
          ).optional(),
          autoscalingTargets: z.object({
            cpuUtilizationPercent: z.unknown().describe(
              "The cpu utilization that the Autoscaler should be trying to achieve. This number is on a scale from 0 (no utilization) to 100 (total utilization), and is limited between 10 and 80, otherwise it will return INVALID_ARGUMENT error.",
            ).optional(),
            storageUtilizationGibPerNode: z.unknown().describe(
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
      ]).describe("Immutable. The node scaling factor of this cluster.")
        .optional(),
      serveNodes: z.number().int().describe(
        "The number of nodes in the cluster. If no value is set, Cloud Bigtable automatically allocates nodes based on your data footprint and optimized for 50% storage utilization.",
      ).optional(),
      state: z.enum([
        "STATE_NOT_KNOWN",
        "READY",
        "CREATING",
        "RESIZING",
        "DISABLED",
      ]).describe("Output only. The current state of the cluster.").optional(),
    }),
  ).describe(
    "Required. The clusters to be created within the instance, mapped by desired cluster ID, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`. Fields marked `OutputOnly` must be left blank.",
  ).optional(),
  instance: z.object({
    createTime: z.string().describe(
      "Output only. A commit timestamp representing when this Instance was created. For instances created before this field was added (August 2021), this value is `seconds: 0, nanos: 1`.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The descriptive name for this instance as it appears in UIs. Can be changed at any time, but should be kept globally unique to avoid confusion.",
    ).optional(),
    edition: z.enum(["EDITION_UNSPECIFIED", "ENTERPRISE", "ENTERPRISE_PLUS"])
      .describe(
        "Optional. The edition of the instance. See Edition for details.",
      ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. They can be used to filter resources and aggregate metrics. * Label keys must be between 1 and 63 characters long and must conform to the regular expression: `\\p{Ll}\\p{Lo}{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression: `[\\p{Ll}\\p{Lo}\\p{N}_-]{0,63}`. * No more than 64 labels can be associated with a given resource. * Keys and values must both be under 128 bytes.",
    ).optional(),
    name: z.string().describe(
      "The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`.",
    ).optional(),
    satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
      .optional(),
    state: z.enum(["STATE_NOT_KNOWN", "READY", "CREATING"]).describe(
      "Output only. The current state of the instance.",
    ).optional(),
    tags: z.record(z.string(), z.string()).describe(
      'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: - "123/environment": "production", - "123/costCenter": "marketing" Tags and Labels (above) are both used to bind metadata to resources, with different use-cases. See https://cloud.google.com/resource-manager/docs/tags/tags-overview for an in-depth overview on the difference between tags and labels.',
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "PRODUCTION", "DEVELOPMENT"]).describe(
      "The type of the instance. Defaults to `PRODUCTION`.",
    ).optional(),
  }).describe(
    "A collection of Bigtable Tables and the resources that serve them. All tables in an instance are served from all Clusters in the instance.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. The ID to be used when referring to the new instance within its project, e.g., just `myinstance` rather than `projects/myproject/instances/myinstance`.",
  ).optional(),
  parent: z.string().describe(
    "Required. The unique name of the project in which to create the new instance. Values are of the form `projects/{project}`.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. A commit timestamp representing when this Instance was created. For instances created before this field was added (August 2021), this value is `seconds: 0, nanos: 1`.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The descriptive name for this instance as it appears in UIs. Can be changed at any time, but should be kept globally unique to avoid confusion.",
  ).optional(),
  edition: z.enum(["EDITION_UNSPECIFIED", "ENTERPRISE", "ENTERPRISE_PLUS"])
    .describe("Optional. The edition of the instance. See Edition for details.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. They can be used to filter resources and aggregate metrics. * Label keys must be between 1 and 63 characters long and must conform to the regular expression: `\\p{Ll}\\p{Lo}{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression: `[\\p{Ll}\\p{Lo}\\p{N}_-]{0,63}`. * No more than 64 labels can be associated with a given resource. * Keys and values must both be under 128 bytes.",
  ).optional(),
  name: z.string().describe(
    "The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`.",
  ).optional(),
  satisfiesPzi: z.boolean().describe("Output only. Reserved for future use.")
    .optional(),
  satisfiesPzs: z.boolean().describe("Output only. Reserved for future use.")
    .optional(),
  state: z.enum(["STATE_NOT_KNOWN", "READY", "CREATING"]).describe(
    "Output only. The current state of the instance.",
  ).optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: - "123/environment": "production", - "123/costCenter": "marketing" Tags and Labels (above) are both used to bind metadata to resources, with different use-cases. See https://cloud.google.com/resource-manager/docs/tags/tags-overview for an in-depth overview on the difference between tags and labels.',
  ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "PRODUCTION", "DEVELOPMENT"]).describe(
    "The type of the instance. Defaults to `PRODUCTION`.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Bigtable Admin Instances. Registered at `@swamp/gcp/bigtableadmin/instances`. */
export const model = {
  type: "@swamp/gcp/bigtableadmin/instances",
  version: "2026.05.25.2",
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
    {
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A collection of Bigtable Tables and the resources that serve them. All tables...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instances",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["clusters"] !== undefined) body["clusters"] = g["clusters"];
        if (g["instance"] !== undefined) body["instance"] = g["instance"];
        if (g["instanceId"] !== undefined) body["instanceId"] = g["instanceId"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
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
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Update instances attributes",
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["edition"] !== undefined) body["edition"] = g["edition"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["satisfiesPzi"] !== undefined) {
          body["satisfiesPzi"] = g["satisfiesPzi"];
        }
        if (g["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = g["satisfiesPzs"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
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
      description: "Sync instances state from GCP",
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
      description: "List instances resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "instances",
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options: z.any().optional(),
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
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigtableadmin.projects.instances.getIamPolicy",
            "path": "v2/{+resource}:getIamPolicy",
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
    partial_update_instance: {
      description: "partial update instance",
      arguments: z.object({
        createTime: z.any().optional(),
        displayName: z.any().optional(),
        edition: z.any().optional(),
        labels: z.any().optional(),
        name: z.any().optional(),
        satisfiesPzi: z.any().optional(),
        satisfiesPzs: z.any().optional(),
        state: z.any().optional(),
        tags: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["edition"] !== undefined) body["edition"] = args["edition"];
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["satisfiesPzi"] !== undefined) {
          body["satisfiesPzi"] = args["satisfiesPzi"];
        }
        if (args["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = args["satisfiesPzs"];
        }
        if (args["state"] !== undefined) body["state"] = args["state"];
        if (args["tags"] !== undefined) body["tags"] = args["tags"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "bigtableadmin.projects.instances.partialUpdateInstance",
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
            "id": "bigtableadmin.projects.instances.setIamPolicy",
            "path": "v2/{+resource}:setIamPolicy",
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
            "id": "bigtableadmin.projects.instances.testIamPermissions",
            "path": "v2/{+resource}:testIamPermissions",
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
