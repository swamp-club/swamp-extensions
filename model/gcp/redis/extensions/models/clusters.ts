// Auto-generated extension model for @swamp/gcp/redis/clusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Cloud Memorystore for Redis Clusters.
 *
 * A cluster instance.
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

const BASE_URL = "https://redis.googleapis.com/";

const GET_CONFIG = {
  "id": "redis.projects.locations.clusters.get",
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
  "id": "redis.projects.locations.clusters.create",
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
  },
} as const;

const PATCH_CONFIG = {
  "id": "redis.projects.locations.clusters.patch",
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
  "id": "redis.projects.locations.clusters.delete",
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
  aclPolicy: z.string().describe(
    "Optional. The ACL policy to be applied to the cluster.",
  ).optional(),
  asyncClusterEndpointsDeletionEnabled: z.boolean().describe(
    "Optional. If true, cluster endpoints that are created and registered by customers can be deleted asynchronously. That is, such a cluster endpoint can be de-registered before the forwarding rules in the cluster endpoint are deleted.",
  ).optional(),
  authorizationMode: z.enum([
    "AUTH_MODE_UNSPECIFIED",
    "AUTH_MODE_IAM_AUTH",
    "AUTH_MODE_DISABLED",
    "AUTH_MODE_TOKEN_AUTH",
  ]).describe(
    "Optional. The authorization mode of the Redis cluster. If not provided, auth feature is disabled for the cluster.",
  ).optional(),
  automatedBackupConfig: z.object({
    automatedBackupMode: z.enum([
      "AUTOMATED_BACKUP_MODE_UNSPECIFIED",
      "DISABLED",
      "ENABLED",
    ]).describe(
      "Optional. The automated backup mode. If the mode is disabled, the other fields will be ignored.",
    ).optional(),
    fixedFrequencySchedule: z.object({
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    }).describe(
      "This schedule allows the backup to be triggered at a fixed frequency (currently only daily is supported).",
    ).optional(),
    retention: z.string().describe(
      "Optional. How long to keep automated backups before the backups are deleted. The value should be between 1 day and 365 days. If not specified, the default value is 35 days.",
    ).optional(),
  }).describe("The automated backup config for a cluster.").optional(),
  clusterEndpoints: z.array(z.object({
    connections: z.array(z.object({
      pscAutoConnection: z.object({
        address: z.unknown().describe(
          "Output only. The IP allocated on the consumer network for the PSC forwarding rule.",
        ).optional(),
        connectionType: z.unknown().describe(
          "Output only. Type of the PSC connection.",
        ).optional(),
        forwardingRule: z.unknown().describe(
          "Output only. The URI of the consumer side forwarding rule. Example: projects/{projectNumOrId}/regions/us-east1/forwardingRules/{resourceId}.",
        ).optional(),
        network: z.unknown().describe(
          "Required. The consumer network where the IP address resides, in the form of projects/{project_id}/global/networks/{network_id}.",
        ).optional(),
        projectId: z.unknown().describe(
          "Required. The consumer project_id where the forwarding rule is created from.",
        ).optional(),
        pscConnectionId: z.unknown().describe(
          "Output only. The PSC connection id of the forwarding rule connected to the service attachment.",
        ).optional(),
        pscConnectionStatus: z.unknown().describe(
          "Output only. The status of the PSC connection. Please note that this value is updated periodically. Please use Private Service Connect APIs for the latest status.",
        ).optional(),
        serviceAttachment: z.unknown().describe(
          "Output only. The service attachment which is the target of the PSC connection, in the form of projects/{project-id}/regions/{region}/serviceAttachments/{service-attachment-id}.",
        ).optional(),
      }).describe(
        "Details of consumer resources in a PSC connection that is created through Service Connectivity Automation.",
      ).optional(),
      pscConnection: z.object({
        address: z.unknown().describe(
          "Required. The IP allocated on the consumer network for the PSC forwarding rule.",
        ).optional(),
        connectionType: z.unknown().describe(
          "Output only. Type of the PSC connection.",
        ).optional(),
        forwardingRule: z.unknown().describe(
          "Required. The URI of the consumer side forwarding rule. Example: projects/{projectNumOrId}/regions/us-east1/forwardingRules/{resourceId}.",
        ).optional(),
        network: z.unknown().describe(
          "Required. The consumer network where the IP address resides, in the form of projects/{project_id}/global/networks/{network_id}.",
        ).optional(),
        port: z.unknown().describe(
          "Output only. port will only be set for Primary/Reader or Discovery endpoint.",
        ).optional(),
        projectId: z.unknown().describe(
          "Optional. Project ID of the consumer project where the forwarding rule is created in.",
        ).optional(),
        pscConnectionId: z.unknown().describe(
          "Required. The PSC connection id of the forwarding rule connected to the service attachment.",
        ).optional(),
        pscConnectionStatus: z.unknown().describe(
          "Output only. The status of the PSC connection. Please note that this value is updated periodically. To get the latest status of a PSC connection, follow https://cloud.google.com/vpc/docs/configure-private-service-connect-services#endpoint-details.",
        ).optional(),
        serviceAttachment: z.unknown().describe(
          "Required. The service attachment which is the target of the PSC connection, in the form of projects/{project-id}/regions/{region}/serviceAttachments/{service-attachment-id}.",
        ).optional(),
      }).describe("Details of consumer resources in a PSC connection.")
        .optional(),
    })).describe(
      "Required. A group of PSC connections. They are created in the same VPC network, one for each service attachment in the cluster.",
    ).optional(),
  })).describe("Optional. A list of cluster endpoints.").optional(),
  crossClusterReplicationConfig: z.object({
    clusterRole: z.enum([
      "CLUSTER_ROLE_UNSPECIFIED",
      "NONE",
      "PRIMARY",
      "SECONDARY",
    ]).describe(
      "Output only. The role of the cluster in cross cluster replication.",
    ).optional(),
    membership: z.object({
      primaryCluster: z.object({
        cluster: z.string().describe(
          "Output only. The full resource path of the remote cluster in the format: projects//locations//clusters/",
        ).optional(),
        uid: z.string().describe(
          "Output only. The unique identifier of the remote cluster.",
        ).optional(),
      }).describe(
        "Details of the remote cluster associated with this cluster in a cross cluster replication setup.",
      ).optional(),
      secondaryClusters: z.array(z.object({
        cluster: z.string().describe(
          "Output only. The full resource path of the remote cluster in the format: projects//locations//clusters/",
        ).optional(),
        uid: z.string().describe(
          "Output only. The unique identifier of the remote cluster.",
        ).optional(),
      })).describe(
        "Output only. The list of secondary clusters replicating from the primary cluster.",
      ).optional(),
    }).describe(
      "An output only view of all the member clusters participating in the cross cluster replication.",
    ).optional(),
    primaryCluster: z.object({
      cluster: z.string().describe(
        "Output only. The full resource path of the remote cluster in the format: projects//locations//clusters/",
      ).optional(),
      uid: z.string().describe(
        "Output only. The unique identifier of the remote cluster.",
      ).optional(),
    }).describe(
      "Details of the remote cluster associated with this cluster in a cross cluster replication setup.",
    ).optional(),
    secondaryClusters: z.array(z.object({
      cluster: z.string().describe(
        "Output only. The full resource path of the remote cluster in the format: projects//locations//clusters/",
      ).optional(),
      uid: z.string().describe(
        "Output only. The unique identifier of the remote cluster.",
      ).optional(),
    })).describe(
      "List of secondary clusters that are replicating from this primary cluster. This field is only set for a primary cluster.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last time cross cluster replication config was updated.",
    ).optional(),
  }).describe("Cross cluster replication config.").optional(),
  deletionProtectionEnabled: z.boolean().describe(
    "Optional. The delete operation will fail when the value is set to true.",
  ).optional(),
  encryptionInfo: z.object({
    encryptionType: z.enum([
      "TYPE_UNSPECIFIED",
      "GOOGLE_DEFAULT_ENCRYPTION",
      "CUSTOMER_MANAGED_ENCRYPTION",
    ]).describe("Output only. Type of encryption.").optional(),
    kmsKeyPrimaryState: z.enum([
      "KMS_KEY_STATE_UNSPECIFIED",
      "ENABLED",
      "PERMISSION_DENIED",
      "DISABLED",
      "DESTROYED",
      "DESTROY_SCHEDULED",
      "EKM_KEY_UNREACHABLE_DETECTED",
      "BILLING_DISABLED",
      "UNKNOWN_FAILURE",
    ]).describe(
      "Output only. The state of the primary version of the KMS key perceived by the system. This field is not populated in backups.",
    ).optional(),
    kmsKeyVersions: z.array(z.string()).describe(
      "Output only. KMS key versions that are being used to protect the data at-rest.",
    ).optional(),
    lastUpdateTime: z.string().describe(
      "Output only. The most recent time when the encryption info was updated.",
    ).optional(),
  }).describe(
    "EncryptionInfo describes the encryption information of a cluster or a backup.",
  ).optional(),
  gcsSource: z.object({
    uris: z.array(z.string()).describe(
      "Optional. URIs of the Cloud Storage objects to import. Example: gs://bucket1/object1, gs://bucket2/folder2/object2",
    ).optional(),
  }).describe(
    "Backups stored in Cloud Storage buckets. The Cloud Storage buckets need to be the same region as the clusters.",
  ).optional(),
  kmsKey: z.string().describe(
    "Optional. The KMS key used to encrypt the at-rest data of the cluster.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels to represent user-provided metadata.",
  ).optional(),
  maintenancePolicy: z.object({
    createTime: z.string().describe(
      "Output only. The time when the policy was created i.e. Maintenance Window or Deny Period was assigned.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the policy was updated i.e. Maintenance Window or Deny Period was updated.",
    ).optional(),
    weeklyMaintenanceWindow: z.array(z.object({
      day: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe(
        "Optional. Allows to define schedule that runs specified day of the week.",
      ).optional(),
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    })).describe(
      "Optional. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_maintenance_window is expected to be one.",
    ).optional(),
  }).describe("Maintenance policy per cluster.").optional(),
  maintenanceSchedule: z.object({
    endTime: z.string().describe(
      "Output only. The end time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
    startTime: z.string().describe(
      "Output only. The start time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
  }).describe("Upcoming maintenance schedule.").optional(),
  maintenanceVersion: z.string().describe(
    "Optional. This field can be used to trigger self service update to indicate the desired maintenance version. The input to this field can be determined by the available_maintenance_versions field.",
  ).optional(),
  managedBackupSource: z.object({
    backup: z.string().describe(
      "Optional. Example: //redis.googleapis.com/projects/{project}/locations/{location}/backupCollections/{collection}/backups/{backup} A shorter version (without the prefix) of the backup name is also supported, like projects/{project}/locations/{location}/backupCollections/{collection}/backups/{backup_id} In this case, it assumes the backup is under redis.googleapis.com.",
    ).optional(),
  }).describe("Backups that generated and managed by memorystore.").optional(),
  name: z.string().describe(
    "Required. Identifier. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}`",
  ).optional(),
  nodeType: z.enum([
    "NODE_TYPE_UNSPECIFIED",
    "REDIS_SHARED_CORE_NANO",
    "REDIS_HIGHMEM_MEDIUM",
    "REDIS_HIGHMEM_XLARGE",
    "REDIS_STANDARD_SMALL",
    "REDIS_HIGHCPU_MEDIUM",
    "REDIS_STANDARD_LARGE",
    "REDIS_HIGHMEM_2XLARGE",
  ]).describe(
    "Optional. The type of a redis node in the cluster. NodeType determines the underlying machine-type of a redis node.",
  ).optional(),
  persistenceConfig: z.object({
    aofConfig: z.object({
      appendFsync: z.enum([
        "APPEND_FSYNC_UNSPECIFIED",
        "NO",
        "EVERYSEC",
        "ALWAYS",
      ]).describe("Optional. fsync configuration.").optional(),
    }).describe("Configuration of the AOF based persistence.").optional(),
    mode: z.enum(["PERSISTENCE_MODE_UNSPECIFIED", "DISABLED", "RDB", "AOF"])
      .describe("Optional. The mode of persistence.").optional(),
    rdbConfig: z.object({
      rdbSnapshotPeriod: z.enum([
        "SNAPSHOT_PERIOD_UNSPECIFIED",
        "ONE_HOUR",
        "SIX_HOURS",
        "TWELVE_HOURS",
        "TWENTY_FOUR_HOURS",
      ]).describe("Optional. Period between RDB snapshots.").optional(),
      rdbSnapshotStartTime: z.string().describe(
        "Optional. The time that the first snapshot was/will be attempted, and to which future snapshots will be aligned. If not provided, the current time will be used.",
      ).optional(),
    }).describe("Configuration of the RDB based persistence.").optional(),
  }).describe("Configuration of the persistence functionality.").optional(),
  pscConfigs: z.array(z.object({
    network: z.string().describe(
      "Required. The network where the IP address of the discovery endpoint will be reserved, in the form of projects/{network_project}/global/networks/{network_id}.",
    ).optional(),
  })).describe(
    "Optional. Each PscConfig configures the consumer network where IPs will be designated to the cluster for client access through Private Service Connect Automation. Currently, only one PscConfig is supported.",
  ).optional(),
  redisConfigs: z.record(z.string(), z.string()).describe(
    "Optional. Key/Value pairs of customer overrides for mutable Redis Configs",
  ).optional(),
  replicaCount: z.number().int().describe(
    "Optional. The number of replica nodes per shard.",
  ).optional(),
  rotateServerCertificate: z.boolean().describe(
    "Optional. Input only. Rotate the server certificates.",
  ).optional(),
  serverCaMode: z.enum([
    "SERVER_CA_MODE_UNSPECIFIED",
    "SERVER_CA_MODE_GOOGLE_MANAGED_PER_INSTANCE_CA",
    "SERVER_CA_MODE_GOOGLE_MANAGED_SHARED_CA",
    "SERVER_CA_MODE_CUSTOMER_MANAGED_CAS_CA",
  ]).describe("Optional. Server CA mode for the cluster.").optional(),
  serverCaPool: z.string().describe(
    'Optional. Customer-managed CA pool for the cluster. Only applicable for BYOCA i.e. if server_ca_mode is SERVER_CA_MODE_CUSTOMER_MANAGED_CAS_CA. Format: "projects/{project}/locations/{region}/caPools/{ca_pool}".',
  ).optional(),
  shardCount: z.number().int().describe(
    "Optional. Number of shards for the Redis cluster.",
  ).optional(),
  simulateMaintenanceEvent: z.boolean().describe(
    "Optional. Input only. Simulate a maintenance event.",
  ).optional(),
  stateInfo: z.object({
    updateInfo: z.object({
      targetNodeType: z.enum([
        "NODE_TYPE_UNSPECIFIED",
        "REDIS_SHARED_CORE_NANO",
        "REDIS_HIGHMEM_MEDIUM",
        "REDIS_HIGHMEM_XLARGE",
        "REDIS_STANDARD_SMALL",
        "REDIS_HIGHCPU_MEDIUM",
        "REDIS_STANDARD_LARGE",
        "REDIS_HIGHMEM_2XLARGE",
      ]).describe("Target node type for redis cluster.").optional(),
      targetReplicaCount: z.number().int().describe(
        "Target number of replica nodes per shard.",
      ).optional(),
      targetShardCount: z.number().int().describe(
        "Target number of shards for redis cluster",
      ).optional(),
    }).describe("Represents information about an updating cluster.").optional(),
  }).describe(
    "Represents additional information about the state of the cluster.",
  ).optional(),
  transitEncryptionMode: z.enum([
    "TRANSIT_ENCRYPTION_MODE_UNSPECIFIED",
    "TRANSIT_ENCRYPTION_MODE_DISABLED",
    "TRANSIT_ENCRYPTION_MODE_SERVER_AUTHENTICATION",
  ]).describe(
    "Optional. The in-transit encryption for the Redis cluster. If not provided, encryption is disabled for the cluster.",
  ).optional(),
  zoneDistributionConfig: z.object({
    mode: z.enum([
      "ZONE_DISTRIBUTION_MODE_UNSPECIFIED",
      "MULTI_ZONE",
      "SINGLE_ZONE",
    ]).describe(
      "Optional. The mode of zone distribution. Defaults to MULTI_ZONE, when not specified.",
    ).optional(),
    zone: z.string().describe(
      "Optional. When SINGLE ZONE distribution is selected, zone field would be used to allocate all resources in that zone. This is not applicable to MULTI_ZONE, and would be ignored for MULTI_ZONE clusters.",
    ).optional(),
  }).describe("Zone distribution config for allocation of cluster resources.")
    .optional(),
  clusterId: z.string().describe(
    "Required. The logical name of the Redis cluster in the customer project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the customer project / location",
  ).optional(),
  requestId: z.string().describe("Optional. Idempotent request UUID.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  aclPolicy: z.string().optional(),
  aclPolicyInSync: z.boolean().optional(),
  allowFewerZonesDeployment: z.boolean().optional(),
  asyncClusterEndpointsDeletionEnabled: z.boolean().optional(),
  authorizationMode: z.string().optional(),
  automatedBackupConfig: z.object({
    automatedBackupMode: z.string(),
    fixedFrequencySchedule: z.object({
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    }),
    retention: z.string(),
  }).optional(),
  availableMaintenanceVersions: z.array(z.string()).optional(),
  backupCollection: z.string().optional(),
  clusterEndpoints: z.array(z.object({
    connections: z.array(z.object({
      pscAutoConnection: z.object({
        address: z.unknown(),
        connectionType: z.unknown(),
        forwardingRule: z.unknown(),
        network: z.unknown(),
        projectId: z.unknown(),
        pscConnectionId: z.unknown(),
        pscConnectionStatus: z.unknown(),
        serviceAttachment: z.unknown(),
      }),
      pscConnection: z.object({
        address: z.unknown(),
        connectionType: z.unknown(),
        forwardingRule: z.unknown(),
        network: z.unknown(),
        port: z.unknown(),
        projectId: z.unknown(),
        pscConnectionId: z.unknown(),
        pscConnectionStatus: z.unknown(),
        serviceAttachment: z.unknown(),
      }),
    })),
  })).optional(),
  createTime: z.string().optional(),
  crossClusterReplicationConfig: z.object({
    clusterRole: z.string(),
    membership: z.object({
      primaryCluster: z.object({
        cluster: z.string(),
        uid: z.string(),
      }),
      secondaryClusters: z.array(z.object({
        cluster: z.string(),
        uid: z.string(),
      })),
    }),
    primaryCluster: z.object({
      cluster: z.string(),
      uid: z.string(),
    }),
    secondaryClusters: z.array(z.object({
      cluster: z.string(),
      uid: z.string(),
    })),
    updateTime: z.string(),
  }).optional(),
  deletionProtectionEnabled: z.boolean().optional(),
  discoveryEndpoints: z.array(z.object({
    address: z.string(),
    port: z.number(),
    pscConfig: z.object({
      network: z.string(),
    }),
  })).optional(),
  effectiveMaintenanceVersion: z.string().optional(),
  encryptionInfo: z.object({
    encryptionType: z.string(),
    kmsKeyPrimaryState: z.string(),
    kmsKeyVersions: z.array(z.string()),
    lastUpdateTime: z.string(),
  }).optional(),
  gcsSource: z.object({
    uris: z.array(z.string()),
  }).optional(),
  kmsKey: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  maintenancePolicy: z.object({
    createTime: z.string(),
    updateTime: z.string(),
    weeklyMaintenanceWindow: z.array(z.object({
      day: z.string(),
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    })),
  }).optional(),
  maintenanceSchedule: z.object({
    endTime: z.string(),
    startTime: z.string(),
  }).optional(),
  maintenanceVersion: z.string().optional(),
  managedBackupSource: z.object({
    backup: z.string(),
  }).optional(),
  name: z.string(),
  nodeType: z.string().optional(),
  ondemandMaintenance: z.boolean().optional(),
  persistenceConfig: z.object({
    aofConfig: z.object({
      appendFsync: z.string(),
    }),
    mode: z.string(),
    rdbConfig: z.object({
      rdbSnapshotPeriod: z.string(),
      rdbSnapshotStartTime: z.string(),
    }),
  }).optional(),
  preciseSizeGb: z.number().optional(),
  pscConfigs: z.array(z.object({
    network: z.string(),
  })).optional(),
  pscConnections: z.array(z.object({
    address: z.string(),
    connectionType: z.string(),
    forwardingRule: z.string(),
    network: z.string(),
    port: z.number(),
    projectId: z.string(),
    pscConnectionId: z.string(),
    pscConnectionStatus: z.string(),
    serviceAttachment: z.string(),
  })).optional(),
  pscServiceAttachments: z.array(z.object({
    connectionType: z.string(),
    serviceAttachment: z.string(),
  })).optional(),
  redisConfigs: z.record(z.string(), z.unknown()).optional(),
  replicaCount: z.number().optional(),
  rotateServerCertificate: z.boolean().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  serverCaMode: z.string().optional(),
  serverCaPool: z.string().optional(),
  shardCount: z.number().optional(),
  simulateMaintenanceEvent: z.boolean().optional(),
  sizeGb: z.number().optional(),
  state: z.string().optional(),
  stateInfo: z.object({
    updateInfo: z.object({
      targetNodeType: z.string(),
      targetReplicaCount: z.number(),
      targetShardCount: z.number(),
    }),
  }).optional(),
  transitEncryptionMode: z.string().optional(),
  uid: z.string().optional(),
  zoneDistributionConfig: z.object({
    mode: z.string(),
    zone: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  aclPolicy: z.string().describe(
    "Optional. The ACL policy to be applied to the cluster.",
  ).optional(),
  asyncClusterEndpointsDeletionEnabled: z.boolean().describe(
    "Optional. If true, cluster endpoints that are created and registered by customers can be deleted asynchronously. That is, such a cluster endpoint can be de-registered before the forwarding rules in the cluster endpoint are deleted.",
  ).optional(),
  authorizationMode: z.enum([
    "AUTH_MODE_UNSPECIFIED",
    "AUTH_MODE_IAM_AUTH",
    "AUTH_MODE_DISABLED",
    "AUTH_MODE_TOKEN_AUTH",
  ]).describe(
    "Optional. The authorization mode of the Redis cluster. If not provided, auth feature is disabled for the cluster.",
  ).optional(),
  automatedBackupConfig: z.object({
    automatedBackupMode: z.enum([
      "AUTOMATED_BACKUP_MODE_UNSPECIFIED",
      "DISABLED",
      "ENABLED",
    ]).describe(
      "Optional. The automated backup mode. If the mode is disabled, the other fields will be ignored.",
    ).optional(),
    fixedFrequencySchedule: z.object({
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    }).describe(
      "This schedule allows the backup to be triggered at a fixed frequency (currently only daily is supported).",
    ).optional(),
    retention: z.string().describe(
      "Optional. How long to keep automated backups before the backups are deleted. The value should be between 1 day and 365 days. If not specified, the default value is 35 days.",
    ).optional(),
  }).describe("The automated backup config for a cluster.").optional(),
  clusterEndpoints: z.array(z.object({
    connections: z.array(z.object({
      pscAutoConnection: z.object({
        address: z.unknown().describe(
          "Output only. The IP allocated on the consumer network for the PSC forwarding rule.",
        ).optional(),
        connectionType: z.unknown().describe(
          "Output only. Type of the PSC connection.",
        ).optional(),
        forwardingRule: z.unknown().describe(
          "Output only. The URI of the consumer side forwarding rule. Example: projects/{projectNumOrId}/regions/us-east1/forwardingRules/{resourceId}.",
        ).optional(),
        network: z.unknown().describe(
          "Required. The consumer network where the IP address resides, in the form of projects/{project_id}/global/networks/{network_id}.",
        ).optional(),
        projectId: z.unknown().describe(
          "Required. The consumer project_id where the forwarding rule is created from.",
        ).optional(),
        pscConnectionId: z.unknown().describe(
          "Output only. The PSC connection id of the forwarding rule connected to the service attachment.",
        ).optional(),
        pscConnectionStatus: z.unknown().describe(
          "Output only. The status of the PSC connection. Please note that this value is updated periodically. Please use Private Service Connect APIs for the latest status.",
        ).optional(),
        serviceAttachment: z.unknown().describe(
          "Output only. The service attachment which is the target of the PSC connection, in the form of projects/{project-id}/regions/{region}/serviceAttachments/{service-attachment-id}.",
        ).optional(),
      }).describe(
        "Details of consumer resources in a PSC connection that is created through Service Connectivity Automation.",
      ).optional(),
      pscConnection: z.object({
        address: z.unknown().describe(
          "Required. The IP allocated on the consumer network for the PSC forwarding rule.",
        ).optional(),
        connectionType: z.unknown().describe(
          "Output only. Type of the PSC connection.",
        ).optional(),
        forwardingRule: z.unknown().describe(
          "Required. The URI of the consumer side forwarding rule. Example: projects/{projectNumOrId}/regions/us-east1/forwardingRules/{resourceId}.",
        ).optional(),
        network: z.unknown().describe(
          "Required. The consumer network where the IP address resides, in the form of projects/{project_id}/global/networks/{network_id}.",
        ).optional(),
        port: z.unknown().describe(
          "Output only. port will only be set for Primary/Reader or Discovery endpoint.",
        ).optional(),
        projectId: z.unknown().describe(
          "Optional. Project ID of the consumer project where the forwarding rule is created in.",
        ).optional(),
        pscConnectionId: z.unknown().describe(
          "Required. The PSC connection id of the forwarding rule connected to the service attachment.",
        ).optional(),
        pscConnectionStatus: z.unknown().describe(
          "Output only. The status of the PSC connection. Please note that this value is updated periodically. To get the latest status of a PSC connection, follow https://cloud.google.com/vpc/docs/configure-private-service-connect-services#endpoint-details.",
        ).optional(),
        serviceAttachment: z.unknown().describe(
          "Required. The service attachment which is the target of the PSC connection, in the form of projects/{project-id}/regions/{region}/serviceAttachments/{service-attachment-id}.",
        ).optional(),
      }).describe("Details of consumer resources in a PSC connection.")
        .optional(),
    })).describe(
      "Required. A group of PSC connections. They are created in the same VPC network, one for each service attachment in the cluster.",
    ).optional(),
  })).describe("Optional. A list of cluster endpoints.").optional(),
  crossClusterReplicationConfig: z.object({
    clusterRole: z.enum([
      "CLUSTER_ROLE_UNSPECIFIED",
      "NONE",
      "PRIMARY",
      "SECONDARY",
    ]).describe(
      "Output only. The role of the cluster in cross cluster replication.",
    ).optional(),
    membership: z.object({
      primaryCluster: z.object({
        cluster: z.string().describe(
          "Output only. The full resource path of the remote cluster in the format: projects//locations//clusters/",
        ).optional(),
        uid: z.string().describe(
          "Output only. The unique identifier of the remote cluster.",
        ).optional(),
      }).describe(
        "Details of the remote cluster associated with this cluster in a cross cluster replication setup.",
      ).optional(),
      secondaryClusters: z.array(z.object({
        cluster: z.string().describe(
          "Output only. The full resource path of the remote cluster in the format: projects//locations//clusters/",
        ).optional(),
        uid: z.string().describe(
          "Output only. The unique identifier of the remote cluster.",
        ).optional(),
      })).describe(
        "Output only. The list of secondary clusters replicating from the primary cluster.",
      ).optional(),
    }).describe(
      "An output only view of all the member clusters participating in the cross cluster replication.",
    ).optional(),
    primaryCluster: z.object({
      cluster: z.string().describe(
        "Output only. The full resource path of the remote cluster in the format: projects//locations//clusters/",
      ).optional(),
      uid: z.string().describe(
        "Output only. The unique identifier of the remote cluster.",
      ).optional(),
    }).describe(
      "Details of the remote cluster associated with this cluster in a cross cluster replication setup.",
    ).optional(),
    secondaryClusters: z.array(z.object({
      cluster: z.string().describe(
        "Output only. The full resource path of the remote cluster in the format: projects//locations//clusters/",
      ).optional(),
      uid: z.string().describe(
        "Output only. The unique identifier of the remote cluster.",
      ).optional(),
    })).describe(
      "List of secondary clusters that are replicating from this primary cluster. This field is only set for a primary cluster.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The last time cross cluster replication config was updated.",
    ).optional(),
  }).describe("Cross cluster replication config.").optional(),
  deletionProtectionEnabled: z.boolean().describe(
    "Optional. The delete operation will fail when the value is set to true.",
  ).optional(),
  encryptionInfo: z.object({
    encryptionType: z.enum([
      "TYPE_UNSPECIFIED",
      "GOOGLE_DEFAULT_ENCRYPTION",
      "CUSTOMER_MANAGED_ENCRYPTION",
    ]).describe("Output only. Type of encryption.").optional(),
    kmsKeyPrimaryState: z.enum([
      "KMS_KEY_STATE_UNSPECIFIED",
      "ENABLED",
      "PERMISSION_DENIED",
      "DISABLED",
      "DESTROYED",
      "DESTROY_SCHEDULED",
      "EKM_KEY_UNREACHABLE_DETECTED",
      "BILLING_DISABLED",
      "UNKNOWN_FAILURE",
    ]).describe(
      "Output only. The state of the primary version of the KMS key perceived by the system. This field is not populated in backups.",
    ).optional(),
    kmsKeyVersions: z.array(z.string()).describe(
      "Output only. KMS key versions that are being used to protect the data at-rest.",
    ).optional(),
    lastUpdateTime: z.string().describe(
      "Output only. The most recent time when the encryption info was updated.",
    ).optional(),
  }).describe(
    "EncryptionInfo describes the encryption information of a cluster or a backup.",
  ).optional(),
  gcsSource: z.object({
    uris: z.array(z.string()).describe(
      "Optional. URIs of the Cloud Storage objects to import. Example: gs://bucket1/object1, gs://bucket2/folder2/object2",
    ).optional(),
  }).describe(
    "Backups stored in Cloud Storage buckets. The Cloud Storage buckets need to be the same region as the clusters.",
  ).optional(),
  kmsKey: z.string().describe(
    "Optional. The KMS key used to encrypt the at-rest data of the cluster.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels to represent user-provided metadata.",
  ).optional(),
  maintenancePolicy: z.object({
    createTime: z.string().describe(
      "Output only. The time when the policy was created i.e. Maintenance Window or Deny Period was assigned.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the policy was updated i.e. Maintenance Window or Deny Period was updated.",
    ).optional(),
    weeklyMaintenanceWindow: z.array(z.object({
      day: z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]).describe(
        "Optional. Allows to define schedule that runs specified day of the week.",
      ).optional(),
      startTime: z.object({
        hours: z.number().int().describe(
          'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
        ).optional(),
        minutes: z.number().int().describe(
          "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
        ).optional(),
        nanos: z.number().int().describe(
          "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
        ).optional(),
        seconds: z.number().int().describe(
          "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
        ).optional(),
      }).describe(
        "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
      ).optional(),
    })).describe(
      "Optional. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_maintenance_window is expected to be one.",
    ).optional(),
  }).describe("Maintenance policy per cluster.").optional(),
  maintenanceSchedule: z.object({
    endTime: z.string().describe(
      "Output only. The end time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
    startTime: z.string().describe(
      "Output only. The start time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
  }).describe("Upcoming maintenance schedule.").optional(),
  maintenanceVersion: z.string().describe(
    "Optional. This field can be used to trigger self service update to indicate the desired maintenance version. The input to this field can be determined by the available_maintenance_versions field.",
  ).optional(),
  managedBackupSource: z.object({
    backup: z.string().describe(
      "Optional. Example: //redis.googleapis.com/projects/{project}/locations/{location}/backupCollections/{collection}/backups/{backup} A shorter version (without the prefix) of the backup name is also supported, like projects/{project}/locations/{location}/backupCollections/{collection}/backups/{backup_id} In this case, it assumes the backup is under redis.googleapis.com.",
    ).optional(),
  }).describe("Backups that generated and managed by memorystore.").optional(),
  name: z.string().describe(
    "Required. Identifier. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}`",
  ).optional(),
  nodeType: z.enum([
    "NODE_TYPE_UNSPECIFIED",
    "REDIS_SHARED_CORE_NANO",
    "REDIS_HIGHMEM_MEDIUM",
    "REDIS_HIGHMEM_XLARGE",
    "REDIS_STANDARD_SMALL",
    "REDIS_HIGHCPU_MEDIUM",
    "REDIS_STANDARD_LARGE",
    "REDIS_HIGHMEM_2XLARGE",
  ]).describe(
    "Optional. The type of a redis node in the cluster. NodeType determines the underlying machine-type of a redis node.",
  ).optional(),
  persistenceConfig: z.object({
    aofConfig: z.object({
      appendFsync: z.enum([
        "APPEND_FSYNC_UNSPECIFIED",
        "NO",
        "EVERYSEC",
        "ALWAYS",
      ]).describe("Optional. fsync configuration.").optional(),
    }).describe("Configuration of the AOF based persistence.").optional(),
    mode: z.enum(["PERSISTENCE_MODE_UNSPECIFIED", "DISABLED", "RDB", "AOF"])
      .describe("Optional. The mode of persistence.").optional(),
    rdbConfig: z.object({
      rdbSnapshotPeriod: z.enum([
        "SNAPSHOT_PERIOD_UNSPECIFIED",
        "ONE_HOUR",
        "SIX_HOURS",
        "TWELVE_HOURS",
        "TWENTY_FOUR_HOURS",
      ]).describe("Optional. Period between RDB snapshots.").optional(),
      rdbSnapshotStartTime: z.string().describe(
        "Optional. The time that the first snapshot was/will be attempted, and to which future snapshots will be aligned. If not provided, the current time will be used.",
      ).optional(),
    }).describe("Configuration of the RDB based persistence.").optional(),
  }).describe("Configuration of the persistence functionality.").optional(),
  pscConfigs: z.array(z.object({
    network: z.string().describe(
      "Required. The network where the IP address of the discovery endpoint will be reserved, in the form of projects/{network_project}/global/networks/{network_id}.",
    ).optional(),
  })).describe(
    "Optional. Each PscConfig configures the consumer network where IPs will be designated to the cluster for client access through Private Service Connect Automation. Currently, only one PscConfig is supported.",
  ).optional(),
  redisConfigs: z.record(z.string(), z.string()).describe(
    "Optional. Key/Value pairs of customer overrides for mutable Redis Configs",
  ).optional(),
  replicaCount: z.number().int().describe(
    "Optional. The number of replica nodes per shard.",
  ).optional(),
  rotateServerCertificate: z.boolean().describe(
    "Optional. Input only. Rotate the server certificates.",
  ).optional(),
  serverCaMode: z.enum([
    "SERVER_CA_MODE_UNSPECIFIED",
    "SERVER_CA_MODE_GOOGLE_MANAGED_PER_INSTANCE_CA",
    "SERVER_CA_MODE_GOOGLE_MANAGED_SHARED_CA",
    "SERVER_CA_MODE_CUSTOMER_MANAGED_CAS_CA",
  ]).describe("Optional. Server CA mode for the cluster.").optional(),
  serverCaPool: z.string().describe(
    'Optional. Customer-managed CA pool for the cluster. Only applicable for BYOCA i.e. if server_ca_mode is SERVER_CA_MODE_CUSTOMER_MANAGED_CAS_CA. Format: "projects/{project}/locations/{region}/caPools/{ca_pool}".',
  ).optional(),
  shardCount: z.number().int().describe(
    "Optional. Number of shards for the Redis cluster.",
  ).optional(),
  simulateMaintenanceEvent: z.boolean().describe(
    "Optional. Input only. Simulate a maintenance event.",
  ).optional(),
  stateInfo: z.object({
    updateInfo: z.object({
      targetNodeType: z.enum([
        "NODE_TYPE_UNSPECIFIED",
        "REDIS_SHARED_CORE_NANO",
        "REDIS_HIGHMEM_MEDIUM",
        "REDIS_HIGHMEM_XLARGE",
        "REDIS_STANDARD_SMALL",
        "REDIS_HIGHCPU_MEDIUM",
        "REDIS_STANDARD_LARGE",
        "REDIS_HIGHMEM_2XLARGE",
      ]).describe("Target node type for redis cluster.").optional(),
      targetReplicaCount: z.number().int().describe(
        "Target number of replica nodes per shard.",
      ).optional(),
      targetShardCount: z.number().int().describe(
        "Target number of shards for redis cluster",
      ).optional(),
    }).describe("Represents information about an updating cluster.").optional(),
  }).describe(
    "Represents additional information about the state of the cluster.",
  ).optional(),
  transitEncryptionMode: z.enum([
    "TRANSIT_ENCRYPTION_MODE_UNSPECIFIED",
    "TRANSIT_ENCRYPTION_MODE_DISABLED",
    "TRANSIT_ENCRYPTION_MODE_SERVER_AUTHENTICATION",
  ]).describe(
    "Optional. The in-transit encryption for the Redis cluster. If not provided, encryption is disabled for the cluster.",
  ).optional(),
  zoneDistributionConfig: z.object({
    mode: z.enum([
      "ZONE_DISTRIBUTION_MODE_UNSPECIFIED",
      "MULTI_ZONE",
      "SINGLE_ZONE",
    ]).describe(
      "Optional. The mode of zone distribution. Defaults to MULTI_ZONE, when not specified.",
    ).optional(),
    zone: z.string().describe(
      "Optional. When SINGLE ZONE distribution is selected, zone field would be used to allocate all resources in that zone. This is not applicable to MULTI_ZONE, and would be ignored for MULTI_ZONE clusters.",
    ).optional(),
  }).describe("Zone distribution config for allocation of cluster resources.")
    .optional(),
  clusterId: z.string().describe(
    "Required. The logical name of the Redis cluster in the customer project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the customer project / location",
  ).optional(),
  requestId: z.string().describe("Optional. Idempotent request UUID.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Cloud Memorystore for Redis Clusters. Registered at `@swamp/gcp/redis/clusters`. */
export const model = {
  type: "@swamp/gcp/redis/clusters",
  version: "2026.05.19.1",
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
      toVersion: "2026.04.11.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A cluster instance.",
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
        if (g["aclPolicy"] !== undefined) body["aclPolicy"] = g["aclPolicy"];
        if (g["asyncClusterEndpointsDeletionEnabled"] !== undefined) {
          body["asyncClusterEndpointsDeletionEnabled"] =
            g["asyncClusterEndpointsDeletionEnabled"];
        }
        if (g["authorizationMode"] !== undefined) {
          body["authorizationMode"] = g["authorizationMode"];
        }
        if (g["automatedBackupConfig"] !== undefined) {
          body["automatedBackupConfig"] = g["automatedBackupConfig"];
        }
        if (g["clusterEndpoints"] !== undefined) {
          body["clusterEndpoints"] = g["clusterEndpoints"];
        }
        if (g["crossClusterReplicationConfig"] !== undefined) {
          body["crossClusterReplicationConfig"] =
            g["crossClusterReplicationConfig"];
        }
        if (g["deletionProtectionEnabled"] !== undefined) {
          body["deletionProtectionEnabled"] = g["deletionProtectionEnabled"];
        }
        if (g["encryptionInfo"] !== undefined) {
          body["encryptionInfo"] = g["encryptionInfo"];
        }
        if (g["gcsSource"] !== undefined) body["gcsSource"] = g["gcsSource"];
        if (g["kmsKey"] !== undefined) body["kmsKey"] = g["kmsKey"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maintenancePolicy"] !== undefined) {
          body["maintenancePolicy"] = g["maintenancePolicy"];
        }
        if (g["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = g["maintenanceSchedule"];
        }
        if (g["maintenanceVersion"] !== undefined) {
          body["maintenanceVersion"] = g["maintenanceVersion"];
        }
        if (g["managedBackupSource"] !== undefined) {
          body["managedBackupSource"] = g["managedBackupSource"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nodeType"] !== undefined) body["nodeType"] = g["nodeType"];
        if (g["persistenceConfig"] !== undefined) {
          body["persistenceConfig"] = g["persistenceConfig"];
        }
        if (g["pscConfigs"] !== undefined) body["pscConfigs"] = g["pscConfigs"];
        if (g["redisConfigs"] !== undefined) {
          body["redisConfigs"] = g["redisConfigs"];
        }
        if (g["replicaCount"] !== undefined) {
          body["replicaCount"] = g["replicaCount"];
        }
        if (g["rotateServerCertificate"] !== undefined) {
          body["rotateServerCertificate"] = g["rotateServerCertificate"];
        }
        if (g["serverCaMode"] !== undefined) {
          body["serverCaMode"] = g["serverCaMode"];
        }
        if (g["serverCaPool"] !== undefined) {
          body["serverCaPool"] = g["serverCaPool"];
        }
        if (g["shardCount"] !== undefined) body["shardCount"] = g["shardCount"];
        if (g["simulateMaintenanceEvent"] !== undefined) {
          body["simulateMaintenanceEvent"] = g["simulateMaintenanceEvent"];
        }
        if (g["stateInfo"] !== undefined) body["stateInfo"] = g["stateInfo"];
        if (g["transitEncryptionMode"] !== undefined) {
          body["transitEncryptionMode"] = g["transitEncryptionMode"];
        }
        if (g["zoneDistributionConfig"] !== undefined) {
          body["zoneDistributionConfig"] = g["zoneDistributionConfig"];
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
        if (g["aclPolicy"] !== undefined) body["aclPolicy"] = g["aclPolicy"];
        if (g["asyncClusterEndpointsDeletionEnabled"] !== undefined) {
          body["asyncClusterEndpointsDeletionEnabled"] =
            g["asyncClusterEndpointsDeletionEnabled"];
        }
        if (g["authorizationMode"] !== undefined) {
          body["authorizationMode"] = g["authorizationMode"];
        }
        if (g["automatedBackupConfig"] !== undefined) {
          body["automatedBackupConfig"] = g["automatedBackupConfig"];
        }
        if (g["clusterEndpoints"] !== undefined) {
          body["clusterEndpoints"] = g["clusterEndpoints"];
        }
        if (g["crossClusterReplicationConfig"] !== undefined) {
          body["crossClusterReplicationConfig"] =
            g["crossClusterReplicationConfig"];
        }
        if (g["deletionProtectionEnabled"] !== undefined) {
          body["deletionProtectionEnabled"] = g["deletionProtectionEnabled"];
        }
        if (g["encryptionInfo"] !== undefined) {
          body["encryptionInfo"] = g["encryptionInfo"];
        }
        if (g["gcsSource"] !== undefined) body["gcsSource"] = g["gcsSource"];
        if (g["kmsKey"] !== undefined) body["kmsKey"] = g["kmsKey"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maintenancePolicy"] !== undefined) {
          body["maintenancePolicy"] = g["maintenancePolicy"];
        }
        if (g["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = g["maintenanceSchedule"];
        }
        if (g["maintenanceVersion"] !== undefined) {
          body["maintenanceVersion"] = g["maintenanceVersion"];
        }
        if (g["managedBackupSource"] !== undefined) {
          body["managedBackupSource"] = g["managedBackupSource"];
        }
        if (g["nodeType"] !== undefined) body["nodeType"] = g["nodeType"];
        if (g["persistenceConfig"] !== undefined) {
          body["persistenceConfig"] = g["persistenceConfig"];
        }
        if (g["pscConfigs"] !== undefined) body["pscConfigs"] = g["pscConfigs"];
        if (g["redisConfigs"] !== undefined) {
          body["redisConfigs"] = g["redisConfigs"];
        }
        if (g["replicaCount"] !== undefined) {
          body["replicaCount"] = g["replicaCount"];
        }
        if (g["rotateServerCertificate"] !== undefined) {
          body["rotateServerCertificate"] = g["rotateServerCertificate"];
        }
        if (g["serverCaMode"] !== undefined) {
          body["serverCaMode"] = g["serverCaMode"];
        }
        if (g["serverCaPool"] !== undefined) {
          body["serverCaPool"] = g["serverCaPool"];
        }
        if (g["shardCount"] !== undefined) body["shardCount"] = g["shardCount"];
        if (g["simulateMaintenanceEvent"] !== undefined) {
          body["simulateMaintenanceEvent"] = g["simulateMaintenanceEvent"];
        }
        if (g["stateInfo"] !== undefined) body["stateInfo"] = g["stateInfo"];
        if (g["transitEncryptionMode"] !== undefined) {
          body["transitEncryptionMode"] = g["transitEncryptionMode"];
        }
        if (g["zoneDistributionConfig"] !== undefined) {
          body["zoneDistributionConfig"] = g["zoneDistributionConfig"];
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
    add_token_auth_user: {
      description: "add token auth user",
      arguments: z.object({
        tokenAuthUser: z.any().optional(),
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
        params["cluster"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["tokenAuthUser"] !== undefined) {
          body["tokenAuthUser"] = args["tokenAuthUser"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "redis.projects.locations.clusters.addTokenAuthUser",
            "path": "v1/{+cluster}:addTokenAuthUser",
            "httpMethod": "POST",
            "parameterOrder": ["cluster"],
            "parameters": {
              "cluster": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    backup: {
      description: "backup",
      arguments: z.object({
        backupId: z.any().optional(),
        ttl: z.any().optional(),
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
        if (args["backupId"] !== undefined) body["backupId"] = args["backupId"];
        if (args["ttl"] !== undefined) body["ttl"] = args["ttl"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "redis.projects.locations.clusters.backup",
            "path": "v1/{+name}:backup",
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
    get_certificate_authority: {
      description: "get certificate authority",
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
            "id": "redis.projects.locations.clusters.getCertificateAuthority",
            "path": "v1/{+name}",
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
    reschedule_cluster_maintenance: {
      description: "reschedule cluster maintenance",
      arguments: z.object({
        rescheduleType: z.any().optional(),
        scheduleTime: z.any().optional(),
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
        if (args["rescheduleType"] !== undefined) {
          body["rescheduleType"] = args["rescheduleType"];
        }
        if (args["scheduleTime"] !== undefined) {
          body["scheduleTime"] = args["scheduleTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "redis.projects.locations.clusters.rescheduleClusterMaintenance",
            "path": "v1/{+name}:rescheduleClusterMaintenance",
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
