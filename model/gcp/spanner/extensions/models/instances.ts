// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/spanner/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Spanner Instances.
 *
 * An isolated set of Cloud Spanner resources on which databases can be hosted.
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
  type ExplicitGcpCredentials,
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

const BASE_URL = "https://spanner.googleapis.com/";

const GET_CONFIG = {
  "id": "spanner.projects.instances.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "fieldMask": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "spanner.projects.instances.create",
  "path": "v1/{+parent}/instances",
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
  "id": "spanner.projects.instances.patch",
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
  "id": "spanner.projects.instances.delete",
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
  },
} as const;

const LIST_CONFIG = {
  "id": "spanner.projects.instances.list",
  "path": "v1/{+parent}/instances",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "instanceDeadline": {
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  instance: z.object({
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
      "Required. The name of the instance's configuration. Values are of the form `projects//instanceConfigs/`. See also InstanceConfig and ListInstanceConfigs.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time at which the instance was created.",
    ).optional(),
    defaultBackupScheduleType: z.enum([
      "DEFAULT_BACKUP_SCHEDULE_TYPE_UNSPECIFIED",
      "NONE",
      "AUTOMATIC",
    ]).describe(
      "Optional. Controls the default backup schedule behavior for new databases within the instance. By default, a backup schedule is created automatically when a new database is created in a new instance. Note that the `AUTOMATIC` value isn't permitted for free instances, as backups and backup schedules aren't supported for free instances. In the `GetInstance` or `ListInstances` response, if the value of `default_backup_schedule_type` isn't set, or set to `NONE`, Spanner doesn't create a default backup schedule for new databases in the instance.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The descriptive name for this instance as it appears in UIs. Must be unique per project and between 4 and 30 characters in length.",
    ).optional(),
    edition: z.enum([
      "EDITION_UNSPECIFIED",
      "STANDARD",
      "ENTERPRISE",
      "ENTERPRISE_PLUS",
    ]).describe("Optional. The `Edition` of the current instance.").optional(),
    endpointUris: z.array(z.string()).describe(
      "Deprecated. This field is not populated.",
    ).optional(),
    freeInstanceMetadata: z.object({
      expireBehavior: z.enum([
        "EXPIRE_BEHAVIOR_UNSPECIFIED",
        "FREE_TO_PROVISIONED",
        "REMOVE_AFTER_GRACE_PERIOD",
      ]).describe(
        "Specifies the expiration behavior of a free instance. The default of ExpireBehavior is `REMOVE_AFTER_GRACE_PERIOD`. This can be modified during or after creation, and before expiration.",
      ).optional(),
      expireTime: z.string().describe(
        "Output only. Timestamp after which the instance will either be upgraded or scheduled for deletion after a grace period. ExpireBehavior is used to choose between upgrading or scheduling the free instance for deletion. This timestamp is set during the creation of a free instance.",
      ).optional(),
      upgradeTime: z.string().describe(
        "Output only. If present, the timestamp at which the free instance was upgraded to a provisioned instance.",
      ).optional(),
    }).describe(
      "Free instance specific metadata that is kept even after an instance has been upgraded for tracking purposes.",
    ).optional(),
    instanceType: z.enum([
      "INSTANCE_TYPE_UNSPECIFIED",
      "PROVISIONED",
      "FREE_INSTANCE",
    ]).describe("The `InstanceType` of the current instance.").optional(),
    labels: z.record(z.string(), z.string()).describe(
      'Cloud Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer\'s organizational needs and deployment strategies. Cloud Labels can be used to filter collections of resources. They can be used to control how resource metrics are aggregated. And they can be used as arguments to policy management rules (e.g. route, firewall, load balancing, etc.). * Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `a-z{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression `[a-z0-9_-]{0,63}`. * No more than 64 labels can be associated with a given resource. See https://goo.gl/xmQnxf for more information on and examples of labels. If you plan to use labels in your own code, please note that additional characters may be allowed in the future. And so you are advised to use an internal label representation, such as JSON, which doesn\'t rely upon specific characters being disallowed. For example, representing labels as the string: name + "_" + value would prove problematic if we were to allow "_" in a future release.',
    ).optional(),
    name: z.string().describe(
      "Required. A unique identifier for the instance, which cannot be changed after the instance is created. Values are of the form `projects//instances/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length.",
    ).optional(),
    nodeCount: z.number().int().describe(
      "The number of nodes allocated to this instance. At most, one of either `node_count` or `processing_units` should be present in the message. Users can set the `node_count` field to specify the target number of nodes allocated to the instance. If autoscaling is enabled, `node_count` is treated as an `OUTPUT_ONLY` field and reflects the current number of nodes allocated to the instance. This might be zero in API responses for instances that are not yet in the `READY` state. If the instance has varying node count across replicas (achieved by setting `asymmetric_autoscaling_options` in the autoscaling configuration), the `node_count` set here is the maximum node count across all replicas. For more information, see [Compute capacity, nodes, and processing units](https://cloud.google.com/spanner/docs/compute-capacity).",
    ).optional(),
    processingUnits: z.number().int().describe(
      "The number of processing units allocated to this instance. At most, one of either `processing_units` or `node_count` should be present in the message. Users can set the `processing_units` field to specify the target number of processing units allocated to the instance. If autoscaling is enabled, `processing_units` is treated as an `OUTPUT_ONLY` field and reflects the current number of processing units allocated to the instance. This might be zero in API responses for instances that are not yet in the `READY` state. If the instance has varying processing units per replica (achieved by setting `asymmetric_autoscaling_options` in the autoscaling configuration), the `processing_units` set here is the maximum processing units across all replicas. For more information, see [Compute capacity, nodes and processing units](https://cloud.google.com/spanner/docs/compute-capacity).",
    ).optional(),
    replicaComputeCapacity: z.array(z.object({
      nodeCount: z.number().int().describe(
        "The number of nodes allocated to each replica. This may be zero in API responses for instances that are not yet in state `READY`.",
      ).optional(),
      processingUnits: z.number().int().describe(
        "The number of processing units allocated to each replica. This may be zero in API responses for instances that are not yet in state `READY`.",
      ).optional(),
      replicaSelection: z.object({
        location: z.string().describe(
          'Required. Name of the location of the replicas (for example, "us-central1").',
        ).optional(),
      }).describe(
        "ReplicaSelection identifies replicas with common properties.",
      ).optional(),
    })).describe(
      "Output only. Lists the compute capacity per ReplicaSelection. A replica selection identifies a set of replicas with common properties. Replicas identified by a ReplicaSelection are scaled with the same compute capacity.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "CREATING", "READY"]).describe(
      "Output only. The current instance state. For CreateInstance, the state must be either omitted or set to `CREATING`. For UpdateInstance, the state must be either omitted or set to `READY`.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time at which the instance was most recently updated.",
    ).optional(),
  }).describe(
    "An isolated set of Cloud Spanner resources on which databases can be hosted.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. The ID of the instance to create. Valid identifiers are of the form `a-z*[a-z0-9]` and must be between 2 and 64 characters in length.",
  ).optional(),
  fieldMask: z.string().describe(
    "Required. A mask specifying which fields in Instance should be updated. The field mask must always be specified; this prevents any future fields in Instance from being erased accidentally by clients that do not know about them.",
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
  defaultBackupScheduleType: z.string().optional(),
  displayName: z.string().optional(),
  edition: z.string().optional(),
  endpointUris: z.array(z.string()).optional(),
  freeInstanceMetadata: z.object({
    expireBehavior: z.string(),
    expireTime: z.string(),
    upgradeTime: z.string(),
  }).optional(),
  instanceType: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  nodeCount: z.number().optional(),
  processingUnits: z.number().optional(),
  replicaComputeCapacity: z.array(z.object({
    nodeCount: z.number(),
    processingUnits: z.number(),
    replicaSelection: z.object({
      location: z.string(),
    }),
  })).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  instance: z.object({
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
      "Required. The name of the instance's configuration. Values are of the form `projects//instanceConfigs/`. See also InstanceConfig and ListInstanceConfigs.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The time at which the instance was created.",
    ).optional(),
    defaultBackupScheduleType: z.enum([
      "DEFAULT_BACKUP_SCHEDULE_TYPE_UNSPECIFIED",
      "NONE",
      "AUTOMATIC",
    ]).describe(
      "Optional. Controls the default backup schedule behavior for new databases within the instance. By default, a backup schedule is created automatically when a new database is created in a new instance. Note that the `AUTOMATIC` value isn't permitted for free instances, as backups and backup schedules aren't supported for free instances. In the `GetInstance` or `ListInstances` response, if the value of `default_backup_schedule_type` isn't set, or set to `NONE`, Spanner doesn't create a default backup schedule for new databases in the instance.",
    ).optional(),
    displayName: z.string().describe(
      "Required. The descriptive name for this instance as it appears in UIs. Must be unique per project and between 4 and 30 characters in length.",
    ).optional(),
    edition: z.enum([
      "EDITION_UNSPECIFIED",
      "STANDARD",
      "ENTERPRISE",
      "ENTERPRISE_PLUS",
    ]).describe("Optional. The `Edition` of the current instance.").optional(),
    endpointUris: z.array(z.string()).describe(
      "Deprecated. This field is not populated.",
    ).optional(),
    freeInstanceMetadata: z.object({
      expireBehavior: z.enum([
        "EXPIRE_BEHAVIOR_UNSPECIFIED",
        "FREE_TO_PROVISIONED",
        "REMOVE_AFTER_GRACE_PERIOD",
      ]).describe(
        "Specifies the expiration behavior of a free instance. The default of ExpireBehavior is `REMOVE_AFTER_GRACE_PERIOD`. This can be modified during or after creation, and before expiration.",
      ).optional(),
      expireTime: z.string().describe(
        "Output only. Timestamp after which the instance will either be upgraded or scheduled for deletion after a grace period. ExpireBehavior is used to choose between upgrading or scheduling the free instance for deletion. This timestamp is set during the creation of a free instance.",
      ).optional(),
      upgradeTime: z.string().describe(
        "Output only. If present, the timestamp at which the free instance was upgraded to a provisioned instance.",
      ).optional(),
    }).describe(
      "Free instance specific metadata that is kept even after an instance has been upgraded for tracking purposes.",
    ).optional(),
    instanceType: z.enum([
      "INSTANCE_TYPE_UNSPECIFIED",
      "PROVISIONED",
      "FREE_INSTANCE",
    ]).describe("The `InstanceType` of the current instance.").optional(),
    labels: z.record(z.string(), z.string()).describe(
      'Cloud Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer\'s organizational needs and deployment strategies. Cloud Labels can be used to filter collections of resources. They can be used to control how resource metrics are aggregated. And they can be used as arguments to policy management rules (e.g. route, firewall, load balancing, etc.). * Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `a-z{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression `[a-z0-9_-]{0,63}`. * No more than 64 labels can be associated with a given resource. See https://goo.gl/xmQnxf for more information on and examples of labels. If you plan to use labels in your own code, please note that additional characters may be allowed in the future. And so you are advised to use an internal label representation, such as JSON, which doesn\'t rely upon specific characters being disallowed. For example, representing labels as the string: name + "_" + value would prove problematic if we were to allow "_" in a future release.',
    ).optional(),
    name: z.string().describe(
      "Required. A unique identifier for the instance, which cannot be changed after the instance is created. Values are of the form `projects//instances/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length.",
    ).optional(),
    nodeCount: z.number().int().describe(
      "The number of nodes allocated to this instance. At most, one of either `node_count` or `processing_units` should be present in the message. Users can set the `node_count` field to specify the target number of nodes allocated to the instance. If autoscaling is enabled, `node_count` is treated as an `OUTPUT_ONLY` field and reflects the current number of nodes allocated to the instance. This might be zero in API responses for instances that are not yet in the `READY` state. If the instance has varying node count across replicas (achieved by setting `asymmetric_autoscaling_options` in the autoscaling configuration), the `node_count` set here is the maximum node count across all replicas. For more information, see [Compute capacity, nodes, and processing units](https://cloud.google.com/spanner/docs/compute-capacity).",
    ).optional(),
    processingUnits: z.number().int().describe(
      "The number of processing units allocated to this instance. At most, one of either `processing_units` or `node_count` should be present in the message. Users can set the `processing_units` field to specify the target number of processing units allocated to the instance. If autoscaling is enabled, `processing_units` is treated as an `OUTPUT_ONLY` field and reflects the current number of processing units allocated to the instance. This might be zero in API responses for instances that are not yet in the `READY` state. If the instance has varying processing units per replica (achieved by setting `asymmetric_autoscaling_options` in the autoscaling configuration), the `processing_units` set here is the maximum processing units across all replicas. For more information, see [Compute capacity, nodes and processing units](https://cloud.google.com/spanner/docs/compute-capacity).",
    ).optional(),
    replicaComputeCapacity: z.array(z.object({
      nodeCount: z.number().int().describe(
        "The number of nodes allocated to each replica. This may be zero in API responses for instances that are not yet in state `READY`.",
      ).optional(),
      processingUnits: z.number().int().describe(
        "The number of processing units allocated to each replica. This may be zero in API responses for instances that are not yet in state `READY`.",
      ).optional(),
      replicaSelection: z.object({
        location: z.string().describe(
          'Required. Name of the location of the replicas (for example, "us-central1").',
        ).optional(),
      }).describe(
        "ReplicaSelection identifies replicas with common properties.",
      ).optional(),
    })).describe(
      "Output only. Lists the compute capacity per ReplicaSelection. A replica selection identifies a set of replicas with common properties. Replicas identified by a ReplicaSelection are scaled with the same compute capacity.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "CREATING", "READY"]).describe(
      "Output only. The current instance state. For CreateInstance, the state must be either omitted or set to `CREATING`. For UpdateInstance, the state must be either omitted or set to `READY`.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time at which the instance was most recently updated.",
    ).optional(),
  }).describe(
    "An isolated set of Cloud Spanner resources on which databases can be hosted.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. The ID of the instance to create. Valid identifiers are of the form `a-z*[a-z0-9]` and must be between 2 and 64 characters in length.",
  ).optional(),
  fieldMask: z.string().describe(
    "Required. A mask specifying which fields in Instance should be updated. The field mask must always be specified; this prevents any future fields in Instance from being erased accidentally by clients that do not know about them.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Spanner Instances. Registered at `@swamp/gcp/spanner/instances`. */
export const model = {
  type: "@swamp/gcp/spanner/instances",
  version: "2026.06.08.1",
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
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An isolated set of Cloud Spanner resources on which databases can be hosted.",
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["instance"] !== undefined) body["instance"] = g["instance"];
        if (g["instanceId"] !== undefined) body["instanceId"] = g["instanceId"];
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
          credentials,
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
      description: "Get a instances",
      arguments: z.object({
        identifier: z.string().describe("The name of the instances"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update instances attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["instance"] !== undefined) body["instance"] = g["instance"];
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
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
        filter: z.string().describe(
          'An expression for filtering the results of the request. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `display_name` * `labels.key` where key is the name of a label Some examples of using filters are: * `name:*` --> The instance has a name. * `name:Howl` --> The instance\'s name contains the string "howl". * `name:HOWL` --> Equivalent to above. * `NAME:howl` --> Equivalent to above. * `labels.env:*` --> The instance has the label "env". * `labels.env:dev` --> The instance has the label "env" and the value of the label contains the string "dev". * `name:howl labels.env:dev` --> The instance\'s name contains "howl" and it has the label "env" with its value containing "dev".',
        ).optional(),
        instanceDeadline: z.string().describe(
          "Deadline used while retrieving metadata for instances. Instances whose metadata cannot be retrieved within this deadline will be added to unreachable in ListInstancesResponse.",
        ).optional(),
        pageSize: z.number().describe(
          "Number of instances to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["instanceDeadline"] !== undefined) {
          params["instanceDeadline"] = String(args["instanceDeadline"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "instances",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "spanner.projects.instances.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    move: {
      description: "move",
      arguments: z.object({
        targetConfig: z.any().optional(),
        targetDatabaseMoveConfigs: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["targetConfig"] !== undefined) {
          body["targetConfig"] = args["targetConfig"];
        }
        if (args["targetDatabaseMoveConfigs"] !== undefined) {
          body["targetDatabaseMoveConfigs"] = args["targetDatabaseMoveConfigs"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.move",
            "path": "v1/{+name}:move",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "spanner.projects.instances.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "spanner.projects.instances.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
