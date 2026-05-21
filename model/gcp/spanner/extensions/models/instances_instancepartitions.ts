// Auto-generated extension model for @swamp/gcp/spanner/instances-instancepartitions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Spanner Instances.InstancePartitions.
 *
 * An isolated set of Cloud Spanner resources that databases can define placements on.
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
  return `${parent}/instancePartitions/${shortName}`;
}

const BASE_URL = "https://spanner.googleapis.com/";

const GET_CONFIG = {
  "id": "spanner.projects.instances.instancePartitions.get",
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
  "id": "spanner.projects.instances.instancePartitions.create",
  "path": "v1/{+parent}/instancePartitions",
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

const PATCH_CONFIG = {
  "id": "spanner.projects.instances.instancePartitions.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "spanner.projects.instances.instancePartitions.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "spanner.projects.instances.instancePartitions.list",
  "path": "v1/{+parent}/instancePartitions",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "instancePartitionDeadline": {
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  instancePartition: z.object({
    autoscalingConfig: z.object({
      asymmetricAutoscalingOptions: z.array(z.object({
        overrides: z.object({
          autoscalingLimits: z.unknown().describe(
            "The autoscaling limits for the instance. Users can define the minimum and maximum compute capacity allocated to the instance, and the autoscaler will only scale within that range. Users can either use nodes or processing units to specify the limits, but should use the same unit to set both the min_limit and max_limit.",
          ).optional(),
          autoscalingTargetHighPriorityCpuUtilizationPercent: z.unknown()
            .describe(
              "Optional. If specified, overrides the autoscaling target high_priority_cpu_utilization_percent in the top-level autoscaling configuration for the selected replicas.",
            ).optional(),
          autoscalingTargetTotalCpuUtilizationPercent: z.unknown().describe(
            "Optional. If specified, overrides the autoscaling target `total_cpu_utilization_percent` in the top-level autoscaling configuration for the selected replicas.",
          ).optional(),
          disableHighPriorityCpuAutoscaling: z.unknown().describe(
            "Optional. If true, disables high priority CPU autoscaling for the selected replicas and ignores high_priority_cpu_utilization_percent in the top-level autoscaling configuration. When setting this field to true, setting autoscaling_target_high_priority_cpu_utilization_percent field to a non-zero value for the same replica is not supported. If false, the autoscaling_target_high_priority_cpu_utilization_percent field in the replica will be used if set to a non-zero value. Otherwise, the high_priority_cpu_utilization_percent field in the top-level autoscaling configuration will be used. Setting both disable_high_priority_cpu_autoscaling and disable_total_cpu_autoscaling to true for the same replica is not supported.",
          ).optional(),
          disableTotalCpuAutoscaling: z.unknown().describe(
            "Optional. If true, disables total CPU autoscaling for the selected replicas and ignores total_cpu_utilization_percent in the top-level autoscaling configuration. When setting this field to true, setting autoscaling_target_total_cpu_utilization_percent field to a non-zero value for the same replica is not supported. If false, the autoscaling_target_total_cpu_utilization_percent field in the replica will be used if set to a non-zero value. Otherwise, the total_cpu_utilization_percent field in the top-level autoscaling configuration will be used. Setting both disable_high_priority_cpu_autoscaling and disable_total_cpu_autoscaling to true for the same replica is not supported.",
          ).optional(),
        }).describe(
          "Overrides the top-level autoscaling configuration for the replicas identified by `replica_selection`. All fields in this message are optional. Any unspecified fields will use the corresponding values from the top-level autoscaling configuration.",
        ).optional(),
        replicaSelection: z.object({
          location: z.unknown().describe(
            'Required. Name of the location of the replicas (for example, "us-central1").',
          ).optional(),
        }).describe(
          "ReplicaSelection identifies replicas with common properties.",
        ).optional(),
      })).describe(
        "Optional. Optional asymmetric autoscaling options. Replicas matching the replica selection criteria will be autoscaled independently from other replicas. The autoscaler will scale the replicas based on the utilization of replicas identified by the replica selection. Replica selections should not overlap with each other. Other replicas (those do not match any replica selection) will be autoscaled together and will have the same compute capacity allocated to them.",
      ).optional(),
      autoscalingLimits: z.object({
        maxNodes: z.number().int().describe(
          "Maximum number of nodes allocated to the instance. If set, this number should be greater than or equal to min_nodes.",
        ).optional(),
        maxProcessingUnits: z.number().int().describe(
          "Maximum number of processing units allocated to the instance. If set, this number should be multiples of 1000 and be greater than or equal to min_processing_units.",
        ).optional(),
        minNodes: z.number().int().describe(
          "Minimum number of nodes allocated to the instance. If set, this number should be greater than or equal to 1.",
        ).optional(),
        minProcessingUnits: z.number().int().describe(
          "Minimum number of processing units allocated to the instance. If set, this number should be multiples of 1000.",
        ).optional(),
      }).describe(
        "The autoscaling limits for the instance. Users can define the minimum and maximum compute capacity allocated to the instance, and the autoscaler will only scale within that range. Users can either use nodes or processing units to specify the limits, but should use the same unit to set both the min_limit and max_limit.",
      ).optional(),
      autoscalingTargets: z.object({
        highPriorityCpuUtilizationPercent: z.number().int().describe(
          "Optional. The target high priority cpu utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is [10, 90] inclusive. If not specified or set to 0, the autoscaler skips scaling based on high priority CPU utilization.",
        ).optional(),
        storageUtilizationPercent: z.number().int().describe(
          "Required. The target storage utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is [10, 99] inclusive.",
        ).optional(),
        totalCpuUtilizationPercent: z.number().int().describe(
          "Optional. The target total CPU utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is [10, 90] inclusive. If not specified or set to 0, the autoscaler skips scaling based on total CPU utilization. If both `high_priority_cpu_utilization_percent` and `total_cpu_utilization_percent` are specified, the autoscaler provisions the larger of the two required compute capacities to satisfy both targets.",
        ).optional(),
      }).describe("The autoscaling targets for an instance.").optional(),
    }).describe("Autoscaling configuration for an instance.").optional(),
    config: z.string().describe(
      "Required. The name of the instance partition's configuration. Values are of the form `projects//instanceConfigs/`. See also InstanceConfig and ListInstanceConfigs.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time at which the instance partition was created.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The descriptive name for this instance partition as it appears in UIs. Must be unique per project and between 4 and 30 characters in length.",
    ).optional(),
    etag: z.string().describe(
      "Used for optimistic concurrency control as a way to help prevent simultaneous updates of a instance partition from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform instance partition updates in order to avoid race conditions: An etag is returned in the response which contains instance partitions, and systems are expected to put that etag in the request to update instance partitions to ensure that their change will be applied to the same version of the instance partition. If no etag is provided in the call to update instance partition, then the existing instance partition is overwritten blindly.",
    ).optional(),
    name: z.string().describe(
      "Required. A unique identifier for the instance partition. Values are of the form `projects//instances//instancePartitions/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length. An instance partition's name cannot be changed after the instance partition is created.",
    ).optional(),
    nodeCount: z.number().int().describe(
      "The number of nodes allocated to this instance partition. Users can set the `node_count` field to specify the target number of nodes allocated to the instance partition. This may be zero in API responses for instance partitions that are not yet in state `READY`.",
    ).optional(),
    processingUnits: z.number().int().describe(
      "The number of processing units allocated to this instance partition. Users can set the `processing_units` field to specify the target number of processing units allocated to the instance partition. This might be zero in API responses for instance partitions that are not yet in the `READY` state.",
    ).optional(),
    referencingBackups: z.array(z.string()).describe(
      "Output only. Deprecated: This field is not populated. Output only. The names of the backups that reference this instance partition. Referencing backups should share the parent instance. The existence of any referencing backup prevents the instance partition from being deleted.",
    ).optional(),
    referencingDatabases: z.array(z.string()).describe(
      "Output only. The names of the databases that reference this instance partition. Referencing databases should share the parent instance. The existence of any referencing database prevents the instance partition from being deleted.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "CREATING", "READY"]).describe(
      "Output only. The current instance partition state.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time at which the instance partition was most recently updated.",
    ).optional(),
  }).describe(
    "An isolated set of Cloud Spanner resources that databases can define placements on.",
  ).optional(),
  instancePartitionId: z.string().describe(
    "Required. The ID of the instance partition to create. Valid identifiers are of the form `a-z*[a-z0-9]` and must be between 2 and 64 characters in length.",
  ).optional(),
  fieldMask: z.string().describe(
    "Required. A mask specifying which fields in InstancePartition should be updated. The field mask must always be specified; this prevents any future fields in InstancePartition from being erased accidentally by clients that do not know about them.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  autoscalingConfig: z.object({
    asymmetricAutoscalingOptions: z.array(z.object({
      overrides: z.object({
        autoscalingLimits: z.object({
          maxNodes: z.unknown(),
          maxProcessingUnits: z.unknown(),
          minNodes: z.unknown(),
          minProcessingUnits: z.unknown(),
        }),
        autoscalingTargetHighPriorityCpuUtilizationPercent: z.number(),
        autoscalingTargetTotalCpuUtilizationPercent: z.number(),
        disableHighPriorityCpuAutoscaling: z.boolean(),
        disableTotalCpuAutoscaling: z.boolean(),
      }),
      replicaSelection: z.object({
        location: z.string(),
      }),
    })),
    autoscalingLimits: z.object({
      maxNodes: z.number(),
      maxProcessingUnits: z.number(),
      minNodes: z.number(),
      minProcessingUnits: z.number(),
    }),
    autoscalingTargets: z.object({
      highPriorityCpuUtilizationPercent: z.number(),
      storageUtilizationPercent: z.number(),
      totalCpuUtilizationPercent: z.number(),
    }),
  }).optional(),
  config: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  name: z.string(),
  nodeCount: z.number().optional(),
  processingUnits: z.number().optional(),
  referencingBackups: z.array(z.string()).optional(),
  referencingDatabases: z.array(z.string()).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  instancePartition: z.object({
    autoscalingConfig: z.object({
      asymmetricAutoscalingOptions: z.array(z.object({
        overrides: z.object({
          autoscalingLimits: z.unknown().describe(
            "The autoscaling limits for the instance. Users can define the minimum and maximum compute capacity allocated to the instance, and the autoscaler will only scale within that range. Users can either use nodes or processing units to specify the limits, but should use the same unit to set both the min_limit and max_limit.",
          ).optional(),
          autoscalingTargetHighPriorityCpuUtilizationPercent: z.unknown()
            .describe(
              "Optional. If specified, overrides the autoscaling target high_priority_cpu_utilization_percent in the top-level autoscaling configuration for the selected replicas.",
            ).optional(),
          autoscalingTargetTotalCpuUtilizationPercent: z.unknown().describe(
            "Optional. If specified, overrides the autoscaling target `total_cpu_utilization_percent` in the top-level autoscaling configuration for the selected replicas.",
          ).optional(),
          disableHighPriorityCpuAutoscaling: z.unknown().describe(
            "Optional. If true, disables high priority CPU autoscaling for the selected replicas and ignores high_priority_cpu_utilization_percent in the top-level autoscaling configuration. When setting this field to true, setting autoscaling_target_high_priority_cpu_utilization_percent field to a non-zero value for the same replica is not supported. If false, the autoscaling_target_high_priority_cpu_utilization_percent field in the replica will be used if set to a non-zero value. Otherwise, the high_priority_cpu_utilization_percent field in the top-level autoscaling configuration will be used. Setting both disable_high_priority_cpu_autoscaling and disable_total_cpu_autoscaling to true for the same replica is not supported.",
          ).optional(),
          disableTotalCpuAutoscaling: z.unknown().describe(
            "Optional. If true, disables total CPU autoscaling for the selected replicas and ignores total_cpu_utilization_percent in the top-level autoscaling configuration. When setting this field to true, setting autoscaling_target_total_cpu_utilization_percent field to a non-zero value for the same replica is not supported. If false, the autoscaling_target_total_cpu_utilization_percent field in the replica will be used if set to a non-zero value. Otherwise, the total_cpu_utilization_percent field in the top-level autoscaling configuration will be used. Setting both disable_high_priority_cpu_autoscaling and disable_total_cpu_autoscaling to true for the same replica is not supported.",
          ).optional(),
        }).describe(
          "Overrides the top-level autoscaling configuration for the replicas identified by `replica_selection`. All fields in this message are optional. Any unspecified fields will use the corresponding values from the top-level autoscaling configuration.",
        ).optional(),
        replicaSelection: z.object({
          location: z.unknown().describe(
            'Required. Name of the location of the replicas (for example, "us-central1").',
          ).optional(),
        }).describe(
          "ReplicaSelection identifies replicas with common properties.",
        ).optional(),
      })).describe(
        "Optional. Optional asymmetric autoscaling options. Replicas matching the replica selection criteria will be autoscaled independently from other replicas. The autoscaler will scale the replicas based on the utilization of replicas identified by the replica selection. Replica selections should not overlap with each other. Other replicas (those do not match any replica selection) will be autoscaled together and will have the same compute capacity allocated to them.",
      ).optional(),
      autoscalingLimits: z.object({
        maxNodes: z.number().int().describe(
          "Maximum number of nodes allocated to the instance. If set, this number should be greater than or equal to min_nodes.",
        ).optional(),
        maxProcessingUnits: z.number().int().describe(
          "Maximum number of processing units allocated to the instance. If set, this number should be multiples of 1000 and be greater than or equal to min_processing_units.",
        ).optional(),
        minNodes: z.number().int().describe(
          "Minimum number of nodes allocated to the instance. If set, this number should be greater than or equal to 1.",
        ).optional(),
        minProcessingUnits: z.number().int().describe(
          "Minimum number of processing units allocated to the instance. If set, this number should be multiples of 1000.",
        ).optional(),
      }).describe(
        "The autoscaling limits for the instance. Users can define the minimum and maximum compute capacity allocated to the instance, and the autoscaler will only scale within that range. Users can either use nodes or processing units to specify the limits, but should use the same unit to set both the min_limit and max_limit.",
      ).optional(),
      autoscalingTargets: z.object({
        highPriorityCpuUtilizationPercent: z.number().int().describe(
          "Optional. The target high priority cpu utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is [10, 90] inclusive. If not specified or set to 0, the autoscaler skips scaling based on high priority CPU utilization.",
        ).optional(),
        storageUtilizationPercent: z.number().int().describe(
          "Required. The target storage utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is [10, 99] inclusive.",
        ).optional(),
        totalCpuUtilizationPercent: z.number().int().describe(
          "Optional. The target total CPU utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is [10, 90] inclusive. If not specified or set to 0, the autoscaler skips scaling based on total CPU utilization. If both `high_priority_cpu_utilization_percent` and `total_cpu_utilization_percent` are specified, the autoscaler provisions the larger of the two required compute capacities to satisfy both targets.",
        ).optional(),
      }).describe("The autoscaling targets for an instance.").optional(),
    }).describe("Autoscaling configuration for an instance.").optional(),
    config: z.string().describe(
      "Required. The name of the instance partition's configuration. Values are of the form `projects//instanceConfigs/`. See also InstanceConfig and ListInstanceConfigs.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time at which the instance partition was created.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The descriptive name for this instance partition as it appears in UIs. Must be unique per project and between 4 and 30 characters in length.",
    ).optional(),
    etag: z.string().describe(
      "Used for optimistic concurrency control as a way to help prevent simultaneous updates of a instance partition from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform instance partition updates in order to avoid race conditions: An etag is returned in the response which contains instance partitions, and systems are expected to put that etag in the request to update instance partitions to ensure that their change will be applied to the same version of the instance partition. If no etag is provided in the call to update instance partition, then the existing instance partition is overwritten blindly.",
    ).optional(),
    name: z.string().describe(
      "Required. A unique identifier for the instance partition. Values are of the form `projects//instances//instancePartitions/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length. An instance partition's name cannot be changed after the instance partition is created.",
    ).optional(),
    nodeCount: z.number().int().describe(
      "The number of nodes allocated to this instance partition. Users can set the `node_count` field to specify the target number of nodes allocated to the instance partition. This may be zero in API responses for instance partitions that are not yet in state `READY`.",
    ).optional(),
    processingUnits: z.number().int().describe(
      "The number of processing units allocated to this instance partition. Users can set the `processing_units` field to specify the target number of processing units allocated to the instance partition. This might be zero in API responses for instance partitions that are not yet in the `READY` state.",
    ).optional(),
    referencingBackups: z.array(z.string()).describe(
      "Output only. Deprecated: This field is not populated. Output only. The names of the backups that reference this instance partition. Referencing backups should share the parent instance. The existence of any referencing backup prevents the instance partition from being deleted.",
    ).optional(),
    referencingDatabases: z.array(z.string()).describe(
      "Output only. The names of the databases that reference this instance partition. Referencing databases should share the parent instance. The existence of any referencing database prevents the instance partition from being deleted.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "CREATING", "READY"]).describe(
      "Output only. The current instance partition state.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time at which the instance partition was most recently updated.",
    ).optional(),
  }).describe(
    "An isolated set of Cloud Spanner resources that databases can define placements on.",
  ).optional(),
  instancePartitionId: z.string().describe(
    "Required. The ID of the instance partition to create. Valid identifiers are of the form `a-z*[a-z0-9]` and must be between 2 and 64 characters in length.",
  ).optional(),
  fieldMask: z.string().describe(
    "Required. A mask specifying which fields in InstancePartition should be updated. The field mask must always be specified; this prevents any future fields in InstancePartition from being erased accidentally by clients that do not know about them.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Spanner Instances.InstancePartitions. Registered at `@swamp/gcp/spanner/instances-instancepartitions`. */
export const model = {
  type: "@swamp/gcp/spanner/instances-instancepartitions",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An isolated set of Cloud Spanner resources that databases can define placemen...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a instancePartitions",
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
        if (g["instancePartition"] !== undefined) {
          body["instancePartition"] = g["instancePartition"];
        }
        if (g["instancePartitionId"] !== undefined) {
          body["instancePartitionId"] = g["instancePartitionId"];
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
              "readyValues": ["READY"],
              "failedValues": [],
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
      description: "Get a instancePartitions",
      arguments: z.object({
        identifier: z.string().describe("The name of the instancePartitions"),
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
      description: "Update instancePartitions attributes",
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
        if (g["instancePartition"] !== undefined) {
          body["instancePartition"] = g["instancePartition"];
        }
        if (g["fieldMask"] !== undefined) body["fieldMask"] = g["fieldMask"];
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
      description: "Delete the instancePartitions",
      arguments: z.object({
        identifier: z.string().describe("The name of the instancePartitions"),
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
      description: "Sync instancePartitions state from GCP",
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
  },
};
