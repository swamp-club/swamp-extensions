// Auto-generated extension model for @swamp/gcp/redis/instances
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Cloud Memorystore for Redis Instances.
 *
 * A Memorystore for Redis instance.
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
  return `${parent}/instances/${shortName}`;
}

const BASE_URL = "https://redis.googleapis.com/";

const GET_CONFIG = {
  "id": "redis.projects.locations.instances.get",
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
  "id": "redis.projects.locations.instances.create",
  "path": "v1/{+parent}/instances",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "instanceId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "redis.projects.locations.instances.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "redis.projects.locations.instances.delete",
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

const GlobalArgsSchema = z.object({
  alternativeLocationId: z.string().describe(
    "Optional. If specified, at least one node will be provisioned in this zone in addition to the zone specified in location_id. Only applicable to standard tier. If provided, it must be a different zone from the one provided in [location_id]. Additional nodes beyond the first 2 will be placed in zones selected by the service.",
  ).optional(),
  authEnabled: z.boolean().describe(
    'Optional. Indicates whether OSS Redis AUTH is enabled for the instance. If set to "true" AUTH is enabled on the instance. Default value is "false" meaning AUTH is disabled.',
  ).optional(),
  authorizedNetwork: z.string().describe(
    "Optional. The full name of the Google Compute Engine [network](https://cloud.google.com/vpc/docs/vpc) to which the instance is connected. If left unspecified, the `default` network will be used.",
  ).optional(),
  availableMaintenanceVersions: z.array(z.string()).describe(
    "Optional. The available maintenance versions that an instance could update to.",
  ).optional(),
  connectMode: z.enum([
    "CONNECT_MODE_UNSPECIFIED",
    "DIRECT_PEERING",
    "PRIVATE_SERVICE_ACCESS",
  ]).describe(
    "Optional. The network connect mode of the Redis instance. If not provided, the connect mode defaults to DIRECT_PEERING.",
  ).optional(),
  customerManagedKey: z.string().describe(
    "Optional. The KMS key reference that the customer provides when trying to create the instance.",
  ).optional(),
  displayName: z.string().describe(
    "An arbitrary and optional user-provided name for the instance.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user provided metadata",
  ).optional(),
  locationId: z.string().describe(
    "Optional. The zone where the instance will be provisioned. If not provided, the service will choose a zone from the specified region for the instance. For standard tier, additional nodes will be added across multiple zones for protection against zonal failures. If specified, at least one node will be provisioned in this zone.",
  ).optional(),
  maintenancePolicy: z.object({
    createTime: z.string().describe(
      "Output only. The time when the policy was created.",
    ).optional(),
    description: z.string().describe(
      "Optional. Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the policy was last updated.",
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
      ]).describe("Required. The day of week that maintenance updates occur.")
        .optional(),
      duration: z.string().describe(
        "Output only. Duration of the maintenance window. The current window is fixed at 1 hour.",
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
      "Optional. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_window is expected to be one.",
    ).optional(),
  }).describe("Maintenance policy for an instance.").optional(),
  maintenanceSchedule: z.object({
    canReschedule: z.boolean().describe(
      "If the scheduled maintenance can be rescheduled, default is true.",
    ).optional(),
    endTime: z.string().describe(
      "Output only. The end time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
    scheduleDeadlineTime: z.string().describe(
      "Output only. The deadline that the maintenance schedule start time can not go beyond, including reschedule.",
    ).optional(),
    startTime: z.string().describe(
      "Output only. The start time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
  }).describe(
    "Upcoming maintenance schedule. If no maintenance is scheduled, fields are not populated.",
  ).optional(),
  maintenanceVersion: z.string().describe(
    'Optional. The self service update maintenance version. The version is date based such as "20210712_00_00".',
  ).optional(),
  memorySizeGb: z.number().int().describe("Required. Redis memory size in GiB.")
    .optional(),
  name: z.string().describe(
    "Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Redis instances are managed and addressed at regional level so location_id here refers to a GCP region; however, users may choose which specific zone (or collection of zones for cross-zone instances) an instance should be provisioned in. Refer to location_id and alternative_location_id fields for more details.",
  ).optional(),
  persistenceConfig: z.object({
    persistenceMode: z.enum(["PERSISTENCE_MODE_UNSPECIFIED", "DISABLED", "RDB"])
      .describe(
        "Optional. Controls whether Persistence features are enabled. If not provided, the existing value will be used.",
      ).optional(),
    rdbNextSnapshotTime: z.string().describe(
      "Output only. The next time that a snapshot attempt is scheduled to occur.",
    ).optional(),
    rdbSnapshotPeriod: z.enum([
      "SNAPSHOT_PERIOD_UNSPECIFIED",
      "ONE_HOUR",
      "SIX_HOURS",
      "TWELVE_HOURS",
      "TWENTY_FOUR_HOURS",
    ]).describe(
      "Optional. Period between RDB snapshots. Snapshots will be attempted every period starting from the provided snapshot start time. For example, a start time of 01/01/2033 06:45 and SIX_HOURS snapshot period will do nothing until 01/01/2033, and then trigger snapshots every day at 06:45, 12:45, 18:45, and 00:45 the next day, and so on. If not provided, TWENTY_FOUR_HOURS will be used as default.",
    ).optional(),
    rdbSnapshotStartTime: z.string().describe(
      "Optional. Date and time that the first snapshot was/will be attempted, and to which future snapshots will be aligned. If not provided, the current time will be used.",
    ).optional(),
  }).describe("Configuration of the persistence functionality.").optional(),
  readReplicasMode: z.enum([
    "READ_REPLICAS_MODE_UNSPECIFIED",
    "READ_REPLICAS_DISABLED",
    "READ_REPLICAS_ENABLED",
  ]).describe(
    "Optional. Read replicas mode for the instance. Defaults to READ_REPLICAS_DISABLED.",
  ).optional(),
  redisConfigs: z.record(z.string(), z.string()).describe(
    "Optional. Redis configuration parameters, according to [Redis configuration](https://redis.io/docs/latest/operate/oss_and_stack/management/config/). Currently, the only supported parameters are: Redis version 3.2 and newer: * maxmemory-policy * notify-keyspace-events Redis version 4.0 and newer: * activedefrag * lfu-decay-time * lfu-log-factor * maxmemory-gb Redis version 5.0 and newer: * stream-node-max-bytes * stream-node-max-entries",
  ).optional(),
  redisVersion: z.string().describe(
    "Optional. The version of Redis software. If not provided, the default version will be used. Currently, the supported values are: * `REDIS_3_2` for Redis 3.2 compatibility * `REDIS_4_0` for Redis 4.0 compatibility * `REDIS_5_0` for Redis 5.0 compatibility * `REDIS_6_X` for Redis 6.x compatibility * `REDIS_7_0` for Redis 7.0 compatibility (default) * `REDIS_7_2` for Redis 7.2 compatibility",
  ).optional(),
  replicaCount: z.number().int().describe(
    "Optional. The number of replica nodes. The valid range for the Standard Tier with read replicas enabled is [1-5] and defaults to 2. If read replicas are not enabled for a Standard Tier instance, the only valid value is 1 and the default is 1. The valid value for basic tier is 0 and the default is also 0.",
  ).optional(),
  reservedIpRange: z.string().describe(
    "Optional. For DIRECT_PEERING mode, the CIDR range of internal addresses that are reserved for this instance. Range must be unique and non-overlapping with existing subnets in an authorized network. For PRIVATE_SERVICE_ACCESS mode, the name of one allocated IP address ranges associated with this private service access connection. If not provided, the service will choose an unused /29 block, for example, 10.0.0.0/29 or 192.168.0.0/29. For READ_REPLICAS_ENABLED the default block size is /28.",
  ).optional(),
  secondaryIpRange: z.string().describe(
    'Optional. Additional IP range for node placement. Required when enabling read replicas on an existing instance. For DIRECT_PEERING mode value must be a CIDR range of size /28, or "auto". For PRIVATE_SERVICE_ACCESS mode value must be the name of an allocated address range associated with the private service access connection, or "auto".',
  ).optional(),
  suspensionReasons: z.array(
    z.enum(["SUSPENSION_REASON_UNSPECIFIED", "CUSTOMER_MANAGED_KEY_ISSUE"]),
  ).describe('Optional. reasons that causes instance in "SUSPENDED" state.')
    .optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  tier: z.enum(["TIER_UNSPECIFIED", "BASIC", "STANDARD_HA"]).describe(
    "Required. The service tier of the instance.",
  ).optional(),
  transitEncryptionMode: z.enum([
    "TRANSIT_ENCRYPTION_MODE_UNSPECIFIED",
    "SERVER_AUTHENTICATION",
    "DISABLED",
  ]).describe(
    "Optional. The TLS mode of the Redis instance. If not provided, TLS is disabled for the instance.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. The logical name of the Redis instance in the customer project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the customer project / location",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  alternativeLocationId: z.string().optional(),
  authEnabled: z.boolean().optional(),
  authorizedNetwork: z.string().optional(),
  availableMaintenanceVersions: z.array(z.string()).optional(),
  connectMode: z.string().optional(),
  createTime: z.string().optional(),
  currentLocationId: z.string().optional(),
  customerManagedKey: z.string().optional(),
  displayName: z.string().optional(),
  host: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  locationId: z.string().optional(),
  maintenancePolicy: z.object({
    createTime: z.string(),
    description: z.string(),
    updateTime: z.string(),
    weeklyMaintenanceWindow: z.array(z.object({
      day: z.string(),
      duration: z.string(),
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    })),
  }).optional(),
  maintenanceSchedule: z.object({
    canReschedule: z.boolean(),
    endTime: z.string(),
    scheduleDeadlineTime: z.string(),
    startTime: z.string(),
  }).optional(),
  maintenanceVersion: z.string().optional(),
  memorySizeGb: z.number().optional(),
  name: z.string(),
  nodes: z.array(z.object({
    id: z.string(),
    zone: z.string(),
  })).optional(),
  persistenceConfig: z.object({
    persistenceMode: z.string(),
    rdbNextSnapshotTime: z.string(),
    rdbSnapshotPeriod: z.string(),
    rdbSnapshotStartTime: z.string(),
  }).optional(),
  persistenceIamIdentity: z.string().optional(),
  port: z.number().optional(),
  readEndpoint: z.string().optional(),
  readEndpointPort: z.number().optional(),
  readReplicasMode: z.string().optional(),
  redisConfigs: z.record(z.string(), z.unknown()).optional(),
  redisVersion: z.string().optional(),
  replicaCount: z.number().optional(),
  reservedIpRange: z.string().optional(),
  satisfiesPzi: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  secondaryIpRange: z.string().optional(),
  serverCaCerts: z.array(z.object({
    cert: z.string(),
    createTime: z.string(),
    expireTime: z.string(),
    serialNumber: z.string(),
    sha1Fingerprint: z.string(),
  })).optional(),
  state: z.string().optional(),
  statusMessage: z.string().optional(),
  suspensionReasons: z.array(z.string()).optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  tier: z.string().optional(),
  transitEncryptionMode: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  alternativeLocationId: z.string().describe(
    "Optional. If specified, at least one node will be provisioned in this zone in addition to the zone specified in location_id. Only applicable to standard tier. If provided, it must be a different zone from the one provided in [location_id]. Additional nodes beyond the first 2 will be placed in zones selected by the service.",
  ).optional(),
  authEnabled: z.boolean().describe(
    'Optional. Indicates whether OSS Redis AUTH is enabled for the instance. If set to "true" AUTH is enabled on the instance. Default value is "false" meaning AUTH is disabled.',
  ).optional(),
  authorizedNetwork: z.string().describe(
    "Optional. The full name of the Google Compute Engine [network](https://cloud.google.com/vpc/docs/vpc) to which the instance is connected. If left unspecified, the `default` network will be used.",
  ).optional(),
  availableMaintenanceVersions: z.array(z.string()).describe(
    "Optional. The available maintenance versions that an instance could update to.",
  ).optional(),
  connectMode: z.enum([
    "CONNECT_MODE_UNSPECIFIED",
    "DIRECT_PEERING",
    "PRIVATE_SERVICE_ACCESS",
  ]).describe(
    "Optional. The network connect mode of the Redis instance. If not provided, the connect mode defaults to DIRECT_PEERING.",
  ).optional(),
  customerManagedKey: z.string().describe(
    "Optional. The KMS key reference that the customer provides when trying to create the instance.",
  ).optional(),
  displayName: z.string().describe(
    "An arbitrary and optional user-provided name for the instance.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user provided metadata",
  ).optional(),
  locationId: z.string().describe(
    "Optional. The zone where the instance will be provisioned. If not provided, the service will choose a zone from the specified region for the instance. For standard tier, additional nodes will be added across multiple zones for protection against zonal failures. If specified, at least one node will be provisioned in this zone.",
  ).optional(),
  maintenancePolicy: z.object({
    createTime: z.string().describe(
      "Output only. The time when the policy was created.",
    ).optional(),
    description: z.string().describe(
      "Optional. Description of what this policy is for. Create/Update methods return INVALID_ARGUMENT if the length is greater than 512.",
    ).optional(),
    updateTime: z.string().describe(
      "Output only. The time when the policy was last updated.",
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
      ]).describe("Required. The day of week that maintenance updates occur.")
        .optional(),
      duration: z.string().describe(
        "Output only. Duration of the maintenance window. The current window is fixed at 1 hour.",
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
      "Optional. Maintenance window that is applied to resources covered by this policy. Minimum 1. For the current version, the maximum number of weekly_window is expected to be one.",
    ).optional(),
  }).describe("Maintenance policy for an instance.").optional(),
  maintenanceSchedule: z.object({
    canReschedule: z.boolean().describe(
      "If the scheduled maintenance can be rescheduled, default is true.",
    ).optional(),
    endTime: z.string().describe(
      "Output only. The end time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
    scheduleDeadlineTime: z.string().describe(
      "Output only. The deadline that the maintenance schedule start time can not go beyond, including reschedule.",
    ).optional(),
    startTime: z.string().describe(
      "Output only. The start time of any upcoming scheduled maintenance for this instance.",
    ).optional(),
  }).describe(
    "Upcoming maintenance schedule. If no maintenance is scheduled, fields are not populated.",
  ).optional(),
  maintenanceVersion: z.string().describe(
    'Optional. The self service update maintenance version. The version is date based such as "20210712_00_00".',
  ).optional(),
  memorySizeGb: z.number().int().describe("Required. Redis memory size in GiB.")
    .optional(),
  name: z.string().describe(
    "Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Redis instances are managed and addressed at regional level so location_id here refers to a GCP region; however, users may choose which specific zone (or collection of zones for cross-zone instances) an instance should be provisioned in. Refer to location_id and alternative_location_id fields for more details.",
  ).optional(),
  persistenceConfig: z.object({
    persistenceMode: z.enum(["PERSISTENCE_MODE_UNSPECIFIED", "DISABLED", "RDB"])
      .describe(
        "Optional. Controls whether Persistence features are enabled. If not provided, the existing value will be used.",
      ).optional(),
    rdbNextSnapshotTime: z.string().describe(
      "Output only. The next time that a snapshot attempt is scheduled to occur.",
    ).optional(),
    rdbSnapshotPeriod: z.enum([
      "SNAPSHOT_PERIOD_UNSPECIFIED",
      "ONE_HOUR",
      "SIX_HOURS",
      "TWELVE_HOURS",
      "TWENTY_FOUR_HOURS",
    ]).describe(
      "Optional. Period between RDB snapshots. Snapshots will be attempted every period starting from the provided snapshot start time. For example, a start time of 01/01/2033 06:45 and SIX_HOURS snapshot period will do nothing until 01/01/2033, and then trigger snapshots every day at 06:45, 12:45, 18:45, and 00:45 the next day, and so on. If not provided, TWENTY_FOUR_HOURS will be used as default.",
    ).optional(),
    rdbSnapshotStartTime: z.string().describe(
      "Optional. Date and time that the first snapshot was/will be attempted, and to which future snapshots will be aligned. If not provided, the current time will be used.",
    ).optional(),
  }).describe("Configuration of the persistence functionality.").optional(),
  readReplicasMode: z.enum([
    "READ_REPLICAS_MODE_UNSPECIFIED",
    "READ_REPLICAS_DISABLED",
    "READ_REPLICAS_ENABLED",
  ]).describe(
    "Optional. Read replicas mode for the instance. Defaults to READ_REPLICAS_DISABLED.",
  ).optional(),
  redisConfigs: z.record(z.string(), z.string()).describe(
    "Optional. Redis configuration parameters, according to [Redis configuration](https://redis.io/docs/latest/operate/oss_and_stack/management/config/). Currently, the only supported parameters are: Redis version 3.2 and newer: * maxmemory-policy * notify-keyspace-events Redis version 4.0 and newer: * activedefrag * lfu-decay-time * lfu-log-factor * maxmemory-gb Redis version 5.0 and newer: * stream-node-max-bytes * stream-node-max-entries",
  ).optional(),
  redisVersion: z.string().describe(
    "Optional. The version of Redis software. If not provided, the default version will be used. Currently, the supported values are: * `REDIS_3_2` for Redis 3.2 compatibility * `REDIS_4_0` for Redis 4.0 compatibility * `REDIS_5_0` for Redis 5.0 compatibility * `REDIS_6_X` for Redis 6.x compatibility * `REDIS_7_0` for Redis 7.0 compatibility (default) * `REDIS_7_2` for Redis 7.2 compatibility",
  ).optional(),
  replicaCount: z.number().int().describe(
    "Optional. The number of replica nodes. The valid range for the Standard Tier with read replicas enabled is [1-5] and defaults to 2. If read replicas are not enabled for a Standard Tier instance, the only valid value is 1 and the default is 1. The valid value for basic tier is 0 and the default is also 0.",
  ).optional(),
  reservedIpRange: z.string().describe(
    "Optional. For DIRECT_PEERING mode, the CIDR range of internal addresses that are reserved for this instance. Range must be unique and non-overlapping with existing subnets in an authorized network. For PRIVATE_SERVICE_ACCESS mode, the name of one allocated IP address ranges associated with this private service access connection. If not provided, the service will choose an unused /29 block, for example, 10.0.0.0/29 or 192.168.0.0/29. For READ_REPLICAS_ENABLED the default block size is /28.",
  ).optional(),
  secondaryIpRange: z.string().describe(
    'Optional. Additional IP range for node placement. Required when enabling read replicas on an existing instance. For DIRECT_PEERING mode value must be a CIDR range of size /28, or "auto". For PRIVATE_SERVICE_ACCESS mode value must be the name of an allocated address range associated with the private service access connection, or "auto".',
  ).optional(),
  suspensionReasons: z.array(
    z.enum(["SUSPENSION_REASON_UNSPECIFIED", "CUSTOMER_MANAGED_KEY_ISSUE"]),
  ).describe('Optional. reasons that causes instance in "SUSPENDED" state.')
    .optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing"',
  ).optional(),
  tier: z.enum(["TIER_UNSPECIFIED", "BASIC", "STANDARD_HA"]).describe(
    "Required. The service tier of the instance.",
  ).optional(),
  transitEncryptionMode: z.enum([
    "TRANSIT_ENCRYPTION_MODE_UNSPECIFIED",
    "SERVER_AUTHENTICATION",
    "DISABLED",
  ]).describe(
    "Optional. The TLS mode of the Redis instance. If not provided, TLS is disabled for the instance.",
  ).optional(),
  instanceId: z.string().describe(
    "Required. The logical name of the Redis instance in the customer project with the following restrictions: * Must contain only lowercase letters, numbers, and hyphens. * Must start with a letter. * Must be between 1-40 characters. * Must end with a number or a letter. * Must be unique within the customer project / location",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Cloud Memorystore for Redis Instances. Registered at `@swamp/gcp/redis/instances`. */
export const model = {
  type: "@swamp/gcp/redis/instances",
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
      description: "A Memorystore for Redis instance.",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["alternativeLocationId"] !== undefined) {
          body["alternativeLocationId"] = g["alternativeLocationId"];
        }
        if (g["authEnabled"] !== undefined) {
          body["authEnabled"] = g["authEnabled"];
        }
        if (g["authorizedNetwork"] !== undefined) {
          body["authorizedNetwork"] = g["authorizedNetwork"];
        }
        if (g["availableMaintenanceVersions"] !== undefined) {
          body["availableMaintenanceVersions"] =
            g["availableMaintenanceVersions"];
        }
        if (g["connectMode"] !== undefined) {
          body["connectMode"] = g["connectMode"];
        }
        if (g["customerManagedKey"] !== undefined) {
          body["customerManagedKey"] = g["customerManagedKey"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["maintenancePolicy"] !== undefined) {
          body["maintenancePolicy"] = g["maintenancePolicy"];
        }
        if (g["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = g["maintenanceSchedule"];
        }
        if (g["maintenanceVersion"] !== undefined) {
          body["maintenanceVersion"] = g["maintenanceVersion"];
        }
        if (g["memorySizeGb"] !== undefined) {
          body["memorySizeGb"] = g["memorySizeGb"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["persistenceConfig"] !== undefined) {
          body["persistenceConfig"] = g["persistenceConfig"];
        }
        if (g["readReplicasMode"] !== undefined) {
          body["readReplicasMode"] = g["readReplicasMode"];
        }
        if (g["redisConfigs"] !== undefined) {
          body["redisConfigs"] = g["redisConfigs"];
        }
        if (g["redisVersion"] !== undefined) {
          body["redisVersion"] = g["redisVersion"];
        }
        if (g["replicaCount"] !== undefined) {
          body["replicaCount"] = g["replicaCount"];
        }
        if (g["reservedIpRange"] !== undefined) {
          body["reservedIpRange"] = g["reservedIpRange"];
        }
        if (g["secondaryIpRange"] !== undefined) {
          body["secondaryIpRange"] = g["secondaryIpRange"];
        }
        if (g["suspensionReasons"] !== undefined) {
          body["suspensionReasons"] = g["suspensionReasons"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["tier"] !== undefined) body["tier"] = g["tier"];
        if (g["transitEncryptionMode"] !== undefined) {
          body["transitEncryptionMode"] = g["transitEncryptionMode"];
        }
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
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["alternativeLocationId"] !== undefined) {
          body["alternativeLocationId"] = g["alternativeLocationId"];
        }
        if (g["authEnabled"] !== undefined) {
          body["authEnabled"] = g["authEnabled"];
        }
        if (g["authorizedNetwork"] !== undefined) {
          body["authorizedNetwork"] = g["authorizedNetwork"];
        }
        if (g["availableMaintenanceVersions"] !== undefined) {
          body["availableMaintenanceVersions"] =
            g["availableMaintenanceVersions"];
        }
        if (g["connectMode"] !== undefined) {
          body["connectMode"] = g["connectMode"];
        }
        if (g["customerManagedKey"] !== undefined) {
          body["customerManagedKey"] = g["customerManagedKey"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["locationId"] !== undefined) body["locationId"] = g["locationId"];
        if (g["maintenancePolicy"] !== undefined) {
          body["maintenancePolicy"] = g["maintenancePolicy"];
        }
        if (g["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = g["maintenanceSchedule"];
        }
        if (g["maintenanceVersion"] !== undefined) {
          body["maintenanceVersion"] = g["maintenanceVersion"];
        }
        if (g["memorySizeGb"] !== undefined) {
          body["memorySizeGb"] = g["memorySizeGb"];
        }
        if (g["persistenceConfig"] !== undefined) {
          body["persistenceConfig"] = g["persistenceConfig"];
        }
        if (g["readReplicasMode"] !== undefined) {
          body["readReplicasMode"] = g["readReplicasMode"];
        }
        if (g["redisConfigs"] !== undefined) {
          body["redisConfigs"] = g["redisConfigs"];
        }
        if (g["redisVersion"] !== undefined) {
          body["redisVersion"] = g["redisVersion"];
        }
        if (g["replicaCount"] !== undefined) {
          body["replicaCount"] = g["replicaCount"];
        }
        if (g["reservedIpRange"] !== undefined) {
          body["reservedIpRange"] = g["reservedIpRange"];
        }
        if (g["secondaryIpRange"] !== undefined) {
          body["secondaryIpRange"] = g["secondaryIpRange"];
        }
        if (g["suspensionReasons"] !== undefined) {
          body["suspensionReasons"] = g["suspensionReasons"];
        }
        if (g["tier"] !== undefined) body["tier"] = g["tier"];
        if (g["transitEncryptionMode"] !== undefined) {
          body["transitEncryptionMode"] = g["transitEncryptionMode"];
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
    export: {
      description: "export",
      arguments: z.object({
        outputConfig: z.any().optional(),
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
        if (args["outputConfig"] !== undefined) {
          body["outputConfig"] = args["outputConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "redis.projects.locations.instances.export",
            "path": "v1/{+name}:export",
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
    failover: {
      description: "failover",
      arguments: z.object({
        dataProtectionMode: z.any().optional(),
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
        if (args["dataProtectionMode"] !== undefined) {
          body["dataProtectionMode"] = args["dataProtectionMode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "redis.projects.locations.instances.failover",
            "path": "v1/{+name}:failover",
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
    get_auth_string: {
      description: "get auth string",
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
            "id": "redis.projects.locations.instances.getAuthString",
            "path": "v1/{+name}/authString",
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
    import: {
      description: "import",
      arguments: z.object({
        inputConfig: z.any().optional(),
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
        if (args["inputConfig"] !== undefined) {
          body["inputConfig"] = args["inputConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "redis.projects.locations.instances.import",
            "path": "v1/{+name}:import",
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
    reschedule_maintenance: {
      description: "reschedule maintenance",
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
            "id": "redis.projects.locations.instances.rescheduleMaintenance",
            "path": "v1/{+name}:rescheduleMaintenance",
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
    upgrade: {
      description: "upgrade",
      arguments: z.object({
        redisVersion: z.any().optional(),
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
        if (args["redisVersion"] !== undefined) {
          body["redisVersion"] = args["redisVersion"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "redis.projects.locations.instances.upgrade",
            "path": "v1/{+name}:upgrade",
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
