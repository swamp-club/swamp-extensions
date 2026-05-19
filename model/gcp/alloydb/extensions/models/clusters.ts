// Auto-generated extension model for @swamp/gcp/alloydb/clusters
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud AlloyDB Clusters.
 *
 * A cluster is a collection of regional AlloyDB resources. It can include a primary instance and one or more read pool instances. All cluster resources share a storage layer, which scales as needed.
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

const BASE_URL = "https://alloydb.googleapis.com/";

const GET_CONFIG = {
  "id": "alloydb.projects.locations.clusters.get",
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
  "id": "alloydb.projects.locations.clusters.create",
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
  "id": "alloydb.projects.locations.clusters.patch",
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
  "id": "alloydb.projects.locations.clusters.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "name": {
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128",
  ).optional(),
  automatedBackupPolicy: z.object({
    backupWindow: z.string().describe(
      "The length of the time window during which a backup can be taken. If a backup does not succeed within this time window, it will be canceled and considered failed. The backup window must be at least 5 minutes long. There is no upper bound on the window. If not set, it defaults to 1 hour.",
    ).optional(),
    enabled: z.boolean().describe(
      "Whether automated automated backups are enabled. If not set, defaults to true.",
    ).optional(),
    encryptionConfig: z.object({
      kmsKeyName: z.string().describe(
        "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
      ).optional(),
    }).describe(
      "EncryptionConfig describes the encryption config of a cluster or a backup that is encrypted with a CMEK (customer-managed encryption key).",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Labels to apply to backups created using this configuration.",
    ).optional(),
    location: z.string().describe(
      "The location where the backup will be stored. Currently, the only supported option is to store the backup in the same region as the cluster. If empty, defaults to the region of the cluster.",
    ).optional(),
    quantityBasedRetention: z.object({
      count: z.number().int().describe("The number of backups to retain.")
        .optional(),
    }).describe(
      "A quantity based policy specifies that a certain number of the most recent successful backups should be retained.",
    ).optional(),
    timeBasedRetention: z.object({
      retentionPeriod: z.string().describe("The retention period.").optional(),
    }).describe(
      "A time based retention policy specifies that all backups within a certain time period should be retained.",
    ).optional(),
    weeklySchedule: z.object({
      daysOfWeek: z.array(
        z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]),
      ).describe(
        "The days of the week to perform a backup. If this field is left empty, the default of every day of the week is used.",
      ).optional(),
      startTimes: z.array(z.object({
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
      })).describe(
        "The times during the day to start a backup. The start times are assumed to be in UTC and to be an exact hour (e.g., 04:00:00). If no start times are provided, a single fixed start time is chosen arbitrarily.",
      ).optional(),
    }).describe(
      'A weekly schedule starts a backup at prescribed start times within a day, for the specified days of the week. The weekly schedule message is flexible and can be used to create many types of schedules. For example, to have a daily backup that starts at 22:00, configure the `start_times` field to have one element "22:00" and the `days_of_week` field to have all seven days of the week.',
    ).optional(),
  }).describe(
    "Message describing the user-specified automated backup policy. All fields in the automated backup policy are optional. Defaults for each field are provided if they are not set.",
  ).optional(),
  backupSource: z.object({
    backupName: z.string().describe(
      "Required. The name of the backup resource with the format: * projects/{project}/locations/{region}/backups/{backup_id}",
    ).optional(),
    backupUid: z.string().describe(
      "Output only. The system-generated UID of the backup which was used to create this resource. The UID is generated when the backup is created, and it is retained until the backup is deleted.",
    ).optional(),
  }).describe("Message describing a BackupSource.").optional(),
  backupdrBackupSource: z.object({
    backup: z.string().describe(
      "Required. The name of the backup resource with the format: * projects/{project}/locations/{location}/backupVaults/{backupvault_id}/dataSources/{datasource_id}/backups/{backup_id}",
    ).optional(),
  }).describe("Message describing a BackupDrBackupSource.").optional(),
  backupdrInfo: z.object({
    currentWindow: z.object({
      automatedBackupPreviouslyEnabled: z.boolean().describe(
        "Whether automated backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      backupPlanAssociation: z.string().describe(
        "The BackupPlanAssociation resource that was used to enable BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviousRecoveryWindowDays: z.number().int().describe(
        "The retention set for the continuous backup that was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviouslyEnabled: z.boolean().describe(
        "Whether continuous backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviouslyEnabledTime: z.string().describe(
        "The time when continuous backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      dataSource: z.string().describe(
        "The DataSource resource that represents the cluster in BackupDR.",
      ).optional(),
      disabledTime: z.string().describe(
        "Time when the BackupDR protection for this cluster was disabled. This field will be empty if this BackupDR window is the `current_window`.",
      ).optional(),
      enabledTime: z.string().describe(
        "Time when the BackupDR protection for this cluster was enabled.",
      ).optional(),
      logRetentionPeriod: z.string().describe(
        "The retention period for logs generated by BackupDR for this cluster.",
      ).optional(),
    }).describe(
      "Information about a single window when BackupDR was enabled for this cluster.",
    ).optional(),
    previousWindows: z.array(z.object({
      automatedBackupPreviouslyEnabled: z.boolean().describe(
        "Whether automated backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      backupPlanAssociation: z.string().describe(
        "The BackupPlanAssociation resource that was used to enable BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviousRecoveryWindowDays: z.number().int().describe(
        "The retention set for the continuous backup that was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviouslyEnabled: z.boolean().describe(
        "Whether continuous backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviouslyEnabledTime: z.string().describe(
        "The time when continuous backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      dataSource: z.string().describe(
        "The DataSource resource that represents the cluster in BackupDR.",
      ).optional(),
      disabledTime: z.string().describe(
        "Time when the BackupDR protection for this cluster was disabled. This field will be empty if this BackupDR window is the `current_window`.",
      ).optional(),
      enabledTime: z.string().describe(
        "Time when the BackupDR protection for this cluster was enabled.",
      ).optional(),
      logRetentionPeriod: z.string().describe(
        "The retention period for logs generated by BackupDR for this cluster.",
      ).optional(),
    })).describe(
      "Windows during which BackupDR was enabled for this cluster, along with associated configuration for that window. These are used to determine points-in-time for which restores can be performed. The windows are ordered with the most recent window last. Windows are mutally exclusive. Windows which closed more than 1 year ago will be removed from this list.",
    ).optional(),
  }).describe("Information about BackupDR protection for this cluster.")
    .optional(),
  cloudsqlBackupRunSource: z.object({
    backupRunId: z.string().describe("Required. The CloudSQL backup run ID.")
      .optional(),
    instanceId: z.string().describe("Required. The CloudSQL instance ID.")
      .optional(),
    project: z.string().describe(
      "The project ID of the source CloudSQL instance. This should be the same as the AlloyDB cluster's project.",
    ).optional(),
  }).describe("The source CloudSQL backup resource.").optional(),
  continuousBackupConfig: z.object({
    enabled: z.boolean().describe("Whether ContinuousBackup is enabled.")
      .optional(),
    encryptionConfig: z.object({
      kmsKeyName: z.string().describe(
        "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
      ).optional(),
    }).describe(
      "EncryptionConfig describes the encryption config of a cluster or a backup that is encrypted with a CMEK (customer-managed encryption key).",
    ).optional(),
    recoveryWindowDays: z.number().int().describe(
      "The number of days that are eligible to restore from using PITR. To support the entire recovery window, backups and logs are retained for one day more than the recovery window. If not set, defaults to 14 days.",
    ).optional(),
  }).describe(
    "ContinuousBackupConfig describes the continuous backups recovery configurations of a cluster.",
  ).optional(),
  continuousBackupInfo: z.object({
    earliestRestorableTime: z.string().describe(
      'Output only. The earliest restorable time that can be restored to. If continuous backups and recovery was recently enabled, the earliest restorable time is the creation time of the earliest eligible backup within this cluster\'s continuous backup recovery window. After a cluster has had continuous backups enabled for the duration of its recovery window, the earliest restorable time becomes "now minus the recovery window". For example, assuming a point in time recovery is attempted at 04/16/2025 3:23:00PM with a 14d recovery window, the earliest restorable time would be 04/02/2025 3:23:00PM. This field is only visible if the CLUSTER_VIEW_CONTINUOUS_BACKUP cluster view is provided.',
    ).optional(),
    enabledTime: z.string().describe(
      "Output only. When ContinuousBackup was most recently enabled. Set to null if ContinuousBackup is not enabled.",
    ).optional(),
    encryptionInfo: z.object({
      encryptionType: z.enum([
        "TYPE_UNSPECIFIED",
        "GOOGLE_DEFAULT_ENCRYPTION",
        "CUSTOMER_MANAGED_ENCRYPTION",
      ]).describe("Output only. Type of encryption.").optional(),
      kmsKeyVersions: z.array(z.string()).describe(
        "Output only. Cloud KMS key versions that are being used to protect the database or the backup.",
      ).optional(),
    }).describe(
      "EncryptionInfo describes the encryption information of a cluster or a backup.",
    ).optional(),
    schedule: z.array(
      z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]),
    ).describe(
      "Output only. Days of the week on which a continuous backup is taken.",
    ).optional(),
  }).describe(
    "ContinuousBackupInfo describes the continuous backup properties of a cluster.",
  ).optional(),
  databaseVersion: z.enum([
    "DATABASE_VERSION_UNSPECIFIED",
    "POSTGRES_13",
    "POSTGRES_14",
    "POSTGRES_15",
    "POSTGRES_16",
    "POSTGRES_17",
    "POSTGRES_18",
  ]).describe(
    "Optional. The database engine major version. This is an optional field and it is populated at the Cluster creation time. If a database version is not supplied at cluster creation time, then a default database version will be used.",
  ).optional(),
  dataplexConfig: z.object({
    enabled: z.boolean().describe(
      'Dataplex is enabled by default for resources such as clusters and instances. This flag controls the integration of AlloyDB PG resources (like databases, schemas, and tables) with Dataplex."',
    ).optional(),
  }).describe("Configuration for Dataplex integration.").optional(),
  displayName: z.string().describe(
    "User-settable and human-readable display name for the Cluster.",
  ).optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
    ).optional(),
  }).describe(
    "EncryptionConfig describes the encryption config of a cluster or a backup that is encrypted with a CMEK (customer-managed encryption key).",
  ).optional(),
  encryptionInfo: z.object({
    encryptionType: z.enum([
      "TYPE_UNSPECIFIED",
      "GOOGLE_DEFAULT_ENCRYPTION",
      "CUSTOMER_MANAGED_ENCRYPTION",
    ]).describe("Output only. Type of encryption.").optional(),
    kmsKeyVersions: z.array(z.string()).describe(
      "Output only. Cloud KMS key versions that are being used to protect the database or the backup.",
    ).optional(),
  }).describe(
    "EncryptionInfo describes the encryption information of a cluster or a backup.",
  ).optional(),
  initialUser: z.object({
    password: z.string().describe("The initial password for the user.")
      .optional(),
    user: z.string().describe("The database username.").optional(),
  }).describe(
    "The username/password for a database user. Used for specifying initial users at cluster creation time.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("Labels as key value pairs")
    .optional(),
  maintenanceSchedule: z.object({
    startTime: z.string().describe(
      "Output only. The scheduled start time for the maintenance.",
    ).optional(),
  }).describe(
    "MaintenanceSchedule stores the maintenance schedule generated from the MaintenanceUpdatePolicy, once a maintenance rollout is triggered, if MaintenanceWindow is set, and if there is no conflicting DenyPeriod. The schedule is cleared once the update takes place. This field cannot be manually changed; modify the MaintenanceUpdatePolicy instead.",
  ).optional(),
  maintenanceUpdatePolicy: z.object({
    denyMaintenancePeriods: z.array(z.object({
      endDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      startDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      time: z.object({
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
    })).describe("Periods to deny maintenance. Currently limited to 1.")
      .optional(),
    maintenanceWindows: z.array(z.object({
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
        "Preferred day of the week for maintenance, e.g. MONDAY, TUESDAY, etc.",
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
      "Preferred windows to perform maintenance. Currently limited to 1.",
    ).optional(),
  }).describe("MaintenanceUpdatePolicy defines the policy for system updates.")
    .optional(),
  maintenanceVersionSelectionPolicy: z.enum([
    "MAINTENANCE_VERSION_SELECTION_POLICY_UNSPECIFIED",
    "MAINTENANCE_VERSION_SELECTION_POLICY_LATEST",
    "MAINTENANCE_VERSION_SELECTION_POLICY_DEFAULT",
  ]).describe(
    "Input only. Policy to use to automatically select the maintenance version to which to update the cluster's instances.",
  ).optional(),
  migrationSource: z.object({
    hostPort: z.string().describe(
      "Output only. The host and port of the on-premises instance in host:port format",
    ).optional(),
    referenceId: z.string().describe(
      "Output only. Place holder for the external source identifier(e.g DMS job name) that created the cluster.",
    ).optional(),
    sourceType: z.enum(["MIGRATION_SOURCE_TYPE_UNSPECIFIED", "DMS"]).describe(
      "Output only. Type of migration source.",
    ).optional(),
  }).describe(
    "Subset of the source instance configuration that is available when reading the cluster resource.",
  ).optional(),
  networkConfig: z.object({
    allocatedIpRange: z.string().describe(
      'Optional. Name of the allocated IP range for the private IP AlloyDB cluster, for example: "google-managed-services-default". If set, the instance IPs for this cluster will be created in the allocated range. The range name must comply with RFC 1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. Field name is intended to be consistent with Cloud SQL.',
    ).optional(),
    network: z.string().describe(
      "Optional. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: `projects/{project_number}/global/networks/{network_id}`. This is required to create a cluster.",
    ).optional(),
  }).describe("Metadata related to network configuration.").optional(),
  primaryConfig: z.object({
    secondaryClusterNames: z.array(z.string()).describe(
      "Output only. Names of the clusters that are replicating from this cluster.",
    ).optional(),
  }).describe(
    "Configuration for the primary cluster. It has the list of clusters that are replicating from this cluster. This should be set if and only if the cluster is of type PRIMARY.",
  ).optional(),
  pscConfig: z.object({
    pscEnabled: z.boolean().describe(
      "Optional. Create an instance that allows connections from Private Service Connect endpoints to the instance.",
    ).optional(),
    serviceOwnedProjectNumber: z.string().describe(
      "Output only. The project number that needs to be allowlisted on the network attachment to enable outbound connectivity.",
    ).optional(),
  }).describe(
    "PscConfig contains PSC related configuration at a cluster level.",
  ).optional(),
  secondaryConfig: z.object({
    primaryClusterName: z.string().describe(
      "The name of the primary cluster name with the format: * projects/{project}/locations/{region}/clusters/{cluster_id}",
    ).optional(),
  }).describe(
    "Configuration information for the secondary cluster. This should be set if and only if the cluster is of type SECONDARY.",
  ).optional(),
  sslConfig: z.object({
    caSource: z.enum(["CA_SOURCE_UNSPECIFIED", "CA_SOURCE_MANAGED"]).describe(
      "Optional. Certificate Authority (CA) source. Only CA_SOURCE_MANAGED is supported currently, and is the default value.",
    ).optional(),
    sslMode: z.enum([
      "SSL_MODE_UNSPECIFIED",
      "SSL_MODE_ALLOW",
      "SSL_MODE_REQUIRE",
      "SSL_MODE_VERIFY_CA",
      "ALLOW_UNENCRYPTED_AND_ENCRYPTED",
      "ENCRYPTED_ONLY",
    ]).describe(
      "Optional. SSL mode. Specifies client-server SSL/TLS connection behavior.",
    ).optional(),
  }).describe("SSL configuration.").optional(),
  subscriptionType: z.enum([
    "SUBSCRIPTION_TYPE_UNSPECIFIED",
    "STANDARD",
    "TRIAL",
  ]).describe("Optional. Subscription type of the cluster.").optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: ` "123/environment": "production", "123/costCenter": "marketing" `',
  ).optional(),
  trialMetadata: z.object({
    endTime: z.string().describe("End time of the trial cluster.").optional(),
    graceEndTime: z.string().describe("grace end time of the cluster.")
      .optional(),
    startTime: z.string().describe("start time of the trial cluster.")
      .optional(),
    upgradeTime: z.string().describe(
      "Upgrade time of trial cluster to Standard cluster.",
    ).optional(),
  }).describe(
    "Contains information and all metadata related to TRIAL clusters.",
  ).optional(),
  clusterId: z.string().describe("Required. ID of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  automatedBackupPolicy: z.object({
    backupWindow: z.string(),
    enabled: z.boolean(),
    encryptionConfig: z.object({
      kmsKeyName: z.string(),
    }),
    labels: z.record(z.string(), z.unknown()),
    location: z.string(),
    quantityBasedRetention: z.object({
      count: z.number(),
    }),
    timeBasedRetention: z.object({
      retentionPeriod: z.string(),
    }),
    weeklySchedule: z.object({
      daysOfWeek: z.array(z.string()),
      startTimes: z.array(z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      })),
    }),
  }).optional(),
  backupSource: z.object({
    backupName: z.string(),
    backupUid: z.string(),
  }).optional(),
  backupdrBackupSource: z.object({
    backup: z.string(),
  }).optional(),
  backupdrInfo: z.object({
    currentWindow: z.object({
      automatedBackupPreviouslyEnabled: z.boolean(),
      backupPlanAssociation: z.string(),
      continuousBackupPreviousRecoveryWindowDays: z.number(),
      continuousBackupPreviouslyEnabled: z.boolean(),
      continuousBackupPreviouslyEnabledTime: z.string(),
      dataSource: z.string(),
      disabledTime: z.string(),
      enabledTime: z.string(),
      logRetentionPeriod: z.string(),
    }),
    previousWindows: z.array(z.object({
      automatedBackupPreviouslyEnabled: z.boolean(),
      backupPlanAssociation: z.string(),
      continuousBackupPreviousRecoveryWindowDays: z.number(),
      continuousBackupPreviouslyEnabled: z.boolean(),
      continuousBackupPreviouslyEnabledTime: z.string(),
      dataSource: z.string(),
      disabledTime: z.string(),
      enabledTime: z.string(),
      logRetentionPeriod: z.string(),
    })),
  }).optional(),
  cloudsqlBackupRunSource: z.object({
    backupRunId: z.string(),
    instanceId: z.string(),
    project: z.string(),
  }).optional(),
  clusterType: z.string().optional(),
  continuousBackupConfig: z.object({
    enabled: z.boolean(),
    encryptionConfig: z.object({
      kmsKeyName: z.string(),
    }),
    recoveryWindowDays: z.number(),
  }).optional(),
  continuousBackupInfo: z.object({
    earliestRestorableTime: z.string(),
    enabledTime: z.string(),
    encryptionInfo: z.object({
      encryptionType: z.string(),
      kmsKeyVersions: z.array(z.string()),
    }),
    schedule: z.array(z.string()),
  }).optional(),
  createTime: z.string().optional(),
  databaseVersion: z.string().optional(),
  dataplexConfig: z.object({
    enabled: z.boolean(),
  }).optional(),
  deleteTime: z.string().optional(),
  displayName: z.string().optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string(),
  }).optional(),
  encryptionInfo: z.object({
    encryptionType: z.string(),
    kmsKeyVersions: z.array(z.string()),
  }).optional(),
  etag: z.string().optional(),
  initialUser: z.object({
    password: z.string(),
    user: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  maintenanceSchedule: z.object({
    startTime: z.string(),
  }).optional(),
  maintenanceUpdatePolicy: z.object({
    denyMaintenancePeriods: z.array(z.object({
      endDate: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      startDate: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      time: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    })),
    maintenanceWindows: z.array(z.object({
      day: z.string(),
      startTime: z.object({
        hours: z.number(),
        minutes: z.number(),
        nanos: z.number(),
        seconds: z.number(),
      }),
    })),
  }).optional(),
  maintenanceVersionSelectionPolicy: z.string().optional(),
  migrationSource: z.object({
    hostPort: z.string(),
    referenceId: z.string(),
    sourceType: z.string(),
  }).optional(),
  name: z.string(),
  network: z.string().optional(),
  networkConfig: z.object({
    allocatedIpRange: z.string(),
    network: z.string(),
  }).optional(),
  primaryConfig: z.object({
    secondaryClusterNames: z.array(z.string()),
  }).optional(),
  pscConfig: z.object({
    pscEnabled: z.boolean(),
    serviceOwnedProjectNumber: z.string(),
  }).optional(),
  reconciling: z.boolean().optional(),
  satisfiesPzs: z.boolean().optional(),
  secondaryConfig: z.object({
    primaryClusterName: z.string(),
  }).optional(),
  sslConfig: z.object({
    caSource: z.string(),
    sslMode: z.string(),
  }).optional(),
  state: z.string().optional(),
  subscriptionType: z.string().optional(),
  tags: z.record(z.string(), z.unknown()).optional(),
  trialMetadata: z.object({
    endTime: z.string(),
    graceEndTime: z.string(),
    startTime: z.string(),
    upgradeTime: z.string(),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128",
  ).optional(),
  automatedBackupPolicy: z.object({
    backupWindow: z.string().describe(
      "The length of the time window during which a backup can be taken. If a backup does not succeed within this time window, it will be canceled and considered failed. The backup window must be at least 5 minutes long. There is no upper bound on the window. If not set, it defaults to 1 hour.",
    ).optional(),
    enabled: z.boolean().describe(
      "Whether automated automated backups are enabled. If not set, defaults to true.",
    ).optional(),
    encryptionConfig: z.object({
      kmsKeyName: z.string().describe(
        "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
      ).optional(),
    }).describe(
      "EncryptionConfig describes the encryption config of a cluster or a backup that is encrypted with a CMEK (customer-managed encryption key).",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "Labels to apply to backups created using this configuration.",
    ).optional(),
    location: z.string().describe(
      "The location where the backup will be stored. Currently, the only supported option is to store the backup in the same region as the cluster. If empty, defaults to the region of the cluster.",
    ).optional(),
    quantityBasedRetention: z.object({
      count: z.number().int().describe("The number of backups to retain.")
        .optional(),
    }).describe(
      "A quantity based policy specifies that a certain number of the most recent successful backups should be retained.",
    ).optional(),
    timeBasedRetention: z.object({
      retentionPeriod: z.string().describe("The retention period.").optional(),
    }).describe(
      "A time based retention policy specifies that all backups within a certain time period should be retained.",
    ).optional(),
    weeklySchedule: z.object({
      daysOfWeek: z.array(
        z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]),
      ).describe(
        "The days of the week to perform a backup. If this field is left empty, the default of every day of the week is used.",
      ).optional(),
      startTimes: z.array(z.object({
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
      })).describe(
        "The times during the day to start a backup. The start times are assumed to be in UTC and to be an exact hour (e.g., 04:00:00). If no start times are provided, a single fixed start time is chosen arbitrarily.",
      ).optional(),
    }).describe(
      'A weekly schedule starts a backup at prescribed start times within a day, for the specified days of the week. The weekly schedule message is flexible and can be used to create many types of schedules. For example, to have a daily backup that starts at 22:00, configure the `start_times` field to have one element "22:00" and the `days_of_week` field to have all seven days of the week.',
    ).optional(),
  }).describe(
    "Message describing the user-specified automated backup policy. All fields in the automated backup policy are optional. Defaults for each field are provided if they are not set.",
  ).optional(),
  backupSource: z.object({
    backupName: z.string().describe(
      "Required. The name of the backup resource with the format: * projects/{project}/locations/{region}/backups/{backup_id}",
    ).optional(),
    backupUid: z.string().describe(
      "Output only. The system-generated UID of the backup which was used to create this resource. The UID is generated when the backup is created, and it is retained until the backup is deleted.",
    ).optional(),
  }).describe("Message describing a BackupSource.").optional(),
  backupdrBackupSource: z.object({
    backup: z.string().describe(
      "Required. The name of the backup resource with the format: * projects/{project}/locations/{location}/backupVaults/{backupvault_id}/dataSources/{datasource_id}/backups/{backup_id}",
    ).optional(),
  }).describe("Message describing a BackupDrBackupSource.").optional(),
  backupdrInfo: z.object({
    currentWindow: z.object({
      automatedBackupPreviouslyEnabled: z.boolean().describe(
        "Whether automated backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      backupPlanAssociation: z.string().describe(
        "The BackupPlanAssociation resource that was used to enable BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviousRecoveryWindowDays: z.number().int().describe(
        "The retention set for the continuous backup that was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviouslyEnabled: z.boolean().describe(
        "Whether continuous backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviouslyEnabledTime: z.string().describe(
        "The time when continuous backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      dataSource: z.string().describe(
        "The DataSource resource that represents the cluster in BackupDR.",
      ).optional(),
      disabledTime: z.string().describe(
        "Time when the BackupDR protection for this cluster was disabled. This field will be empty if this BackupDR window is the `current_window`.",
      ).optional(),
      enabledTime: z.string().describe(
        "Time when the BackupDR protection for this cluster was enabled.",
      ).optional(),
      logRetentionPeriod: z.string().describe(
        "The retention period for logs generated by BackupDR for this cluster.",
      ).optional(),
    }).describe(
      "Information about a single window when BackupDR was enabled for this cluster.",
    ).optional(),
    previousWindows: z.array(z.object({
      automatedBackupPreviouslyEnabled: z.boolean().describe(
        "Whether automated backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      backupPlanAssociation: z.string().describe(
        "The BackupPlanAssociation resource that was used to enable BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviousRecoveryWindowDays: z.number().int().describe(
        "The retention set for the continuous backup that was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviouslyEnabled: z.boolean().describe(
        "Whether continuous backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      continuousBackupPreviouslyEnabledTime: z.string().describe(
        "The time when continuous backup was previously enabled prior to enabling BackupDR protection for this cluster.",
      ).optional(),
      dataSource: z.string().describe(
        "The DataSource resource that represents the cluster in BackupDR.",
      ).optional(),
      disabledTime: z.string().describe(
        "Time when the BackupDR protection for this cluster was disabled. This field will be empty if this BackupDR window is the `current_window`.",
      ).optional(),
      enabledTime: z.string().describe(
        "Time when the BackupDR protection for this cluster was enabled.",
      ).optional(),
      logRetentionPeriod: z.string().describe(
        "The retention period for logs generated by BackupDR for this cluster.",
      ).optional(),
    })).describe(
      "Windows during which BackupDR was enabled for this cluster, along with associated configuration for that window. These are used to determine points-in-time for which restores can be performed. The windows are ordered with the most recent window last. Windows are mutally exclusive. Windows which closed more than 1 year ago will be removed from this list.",
    ).optional(),
  }).describe("Information about BackupDR protection for this cluster.")
    .optional(),
  cloudsqlBackupRunSource: z.object({
    backupRunId: z.string().describe("Required. The CloudSQL backup run ID.")
      .optional(),
    instanceId: z.string().describe("Required. The CloudSQL instance ID.")
      .optional(),
    project: z.string().describe(
      "The project ID of the source CloudSQL instance. This should be the same as the AlloyDB cluster's project.",
    ).optional(),
  }).describe("The source CloudSQL backup resource.").optional(),
  continuousBackupConfig: z.object({
    enabled: z.boolean().describe("Whether ContinuousBackup is enabled.")
      .optional(),
    encryptionConfig: z.object({
      kmsKeyName: z.string().describe(
        "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
      ).optional(),
    }).describe(
      "EncryptionConfig describes the encryption config of a cluster or a backup that is encrypted with a CMEK (customer-managed encryption key).",
    ).optional(),
    recoveryWindowDays: z.number().int().describe(
      "The number of days that are eligible to restore from using PITR. To support the entire recovery window, backups and logs are retained for one day more than the recovery window. If not set, defaults to 14 days.",
    ).optional(),
  }).describe(
    "ContinuousBackupConfig describes the continuous backups recovery configurations of a cluster.",
  ).optional(),
  continuousBackupInfo: z.object({
    earliestRestorableTime: z.string().describe(
      'Output only. The earliest restorable time that can be restored to. If continuous backups and recovery was recently enabled, the earliest restorable time is the creation time of the earliest eligible backup within this cluster\'s continuous backup recovery window. After a cluster has had continuous backups enabled for the duration of its recovery window, the earliest restorable time becomes "now minus the recovery window". For example, assuming a point in time recovery is attempted at 04/16/2025 3:23:00PM with a 14d recovery window, the earliest restorable time would be 04/02/2025 3:23:00PM. This field is only visible if the CLUSTER_VIEW_CONTINUOUS_BACKUP cluster view is provided.',
    ).optional(),
    enabledTime: z.string().describe(
      "Output only. When ContinuousBackup was most recently enabled. Set to null if ContinuousBackup is not enabled.",
    ).optional(),
    encryptionInfo: z.object({
      encryptionType: z.enum([
        "TYPE_UNSPECIFIED",
        "GOOGLE_DEFAULT_ENCRYPTION",
        "CUSTOMER_MANAGED_ENCRYPTION",
      ]).describe("Output only. Type of encryption.").optional(),
      kmsKeyVersions: z.array(z.string()).describe(
        "Output only. Cloud KMS key versions that are being used to protect the database or the backup.",
      ).optional(),
    }).describe(
      "EncryptionInfo describes the encryption information of a cluster or a backup.",
    ).optional(),
    schedule: z.array(
      z.enum([
        "DAY_OF_WEEK_UNSPECIFIED",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]),
    ).describe(
      "Output only. Days of the week on which a continuous backup is taken.",
    ).optional(),
  }).describe(
    "ContinuousBackupInfo describes the continuous backup properties of a cluster.",
  ).optional(),
  databaseVersion: z.enum([
    "DATABASE_VERSION_UNSPECIFIED",
    "POSTGRES_13",
    "POSTGRES_14",
    "POSTGRES_15",
    "POSTGRES_16",
    "POSTGRES_17",
    "POSTGRES_18",
  ]).describe(
    "Optional. The database engine major version. This is an optional field and it is populated at the Cluster creation time. If a database version is not supplied at cluster creation time, then a default database version will be used.",
  ).optional(),
  dataplexConfig: z.object({
    enabled: z.boolean().describe(
      'Dataplex is enabled by default for resources such as clusters and instances. This flag controls the integration of AlloyDB PG resources (like databases, schemas, and tables) with Dataplex."',
    ).optional(),
  }).describe("Configuration for Dataplex integration.").optional(),
  displayName: z.string().describe(
    "User-settable and human-readable display name for the Cluster.",
  ).optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
    ).optional(),
  }).describe(
    "EncryptionConfig describes the encryption config of a cluster or a backup that is encrypted with a CMEK (customer-managed encryption key).",
  ).optional(),
  encryptionInfo: z.object({
    encryptionType: z.enum([
      "TYPE_UNSPECIFIED",
      "GOOGLE_DEFAULT_ENCRYPTION",
      "CUSTOMER_MANAGED_ENCRYPTION",
    ]).describe("Output only. Type of encryption.").optional(),
    kmsKeyVersions: z.array(z.string()).describe(
      "Output only. Cloud KMS key versions that are being used to protect the database or the backup.",
    ).optional(),
  }).describe(
    "EncryptionInfo describes the encryption information of a cluster or a backup.",
  ).optional(),
  initialUser: z.object({
    password: z.string().describe("The initial password for the user.")
      .optional(),
    user: z.string().describe("The database username.").optional(),
  }).describe(
    "The username/password for a database user. Used for specifying initial users at cluster creation time.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("Labels as key value pairs")
    .optional(),
  maintenanceSchedule: z.object({
    startTime: z.string().describe(
      "Output only. The scheduled start time for the maintenance.",
    ).optional(),
  }).describe(
    "MaintenanceSchedule stores the maintenance schedule generated from the MaintenanceUpdatePolicy, once a maintenance rollout is triggered, if MaintenanceWindow is set, and if there is no conflicting DenyPeriod. The schedule is cleared once the update takes place. This field cannot be manually changed; modify the MaintenanceUpdatePolicy instead.",
  ).optional(),
  maintenanceUpdatePolicy: z.object({
    denyMaintenancePeriods: z.array(z.object({
      endDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      startDate: z.object({
        day: z.number().int().describe(
          "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
        ).optional(),
        month: z.number().int().describe(
          "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
        ).optional(),
        year: z.number().int().describe(
          "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
        ).optional(),
      }).describe(
        "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
      ).optional(),
      time: z.object({
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
    })).describe("Periods to deny maintenance. Currently limited to 1.")
      .optional(),
    maintenanceWindows: z.array(z.object({
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
        "Preferred day of the week for maintenance, e.g. MONDAY, TUESDAY, etc.",
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
      "Preferred windows to perform maintenance. Currently limited to 1.",
    ).optional(),
  }).describe("MaintenanceUpdatePolicy defines the policy for system updates.")
    .optional(),
  maintenanceVersionSelectionPolicy: z.enum([
    "MAINTENANCE_VERSION_SELECTION_POLICY_UNSPECIFIED",
    "MAINTENANCE_VERSION_SELECTION_POLICY_LATEST",
    "MAINTENANCE_VERSION_SELECTION_POLICY_DEFAULT",
  ]).describe(
    "Input only. Policy to use to automatically select the maintenance version to which to update the cluster's instances.",
  ).optional(),
  migrationSource: z.object({
    hostPort: z.string().describe(
      "Output only. The host and port of the on-premises instance in host:port format",
    ).optional(),
    referenceId: z.string().describe(
      "Output only. Place holder for the external source identifier(e.g DMS job name) that created the cluster.",
    ).optional(),
    sourceType: z.enum(["MIGRATION_SOURCE_TYPE_UNSPECIFIED", "DMS"]).describe(
      "Output only. Type of migration source.",
    ).optional(),
  }).describe(
    "Subset of the source instance configuration that is available when reading the cluster resource.",
  ).optional(),
  networkConfig: z.object({
    allocatedIpRange: z.string().describe(
      'Optional. Name of the allocated IP range for the private IP AlloyDB cluster, for example: "google-managed-services-default". If set, the instance IPs for this cluster will be created in the allocated range. The range name must comply with RFC 1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. Field name is intended to be consistent with Cloud SQL.',
    ).optional(),
    network: z.string().describe(
      "Optional. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: `projects/{project_number}/global/networks/{network_id}`. This is required to create a cluster.",
    ).optional(),
  }).describe("Metadata related to network configuration.").optional(),
  primaryConfig: z.object({
    secondaryClusterNames: z.array(z.string()).describe(
      "Output only. Names of the clusters that are replicating from this cluster.",
    ).optional(),
  }).describe(
    "Configuration for the primary cluster. It has the list of clusters that are replicating from this cluster. This should be set if and only if the cluster is of type PRIMARY.",
  ).optional(),
  pscConfig: z.object({
    pscEnabled: z.boolean().describe(
      "Optional. Create an instance that allows connections from Private Service Connect endpoints to the instance.",
    ).optional(),
    serviceOwnedProjectNumber: z.string().describe(
      "Output only. The project number that needs to be allowlisted on the network attachment to enable outbound connectivity.",
    ).optional(),
  }).describe(
    "PscConfig contains PSC related configuration at a cluster level.",
  ).optional(),
  secondaryConfig: z.object({
    primaryClusterName: z.string().describe(
      "The name of the primary cluster name with the format: * projects/{project}/locations/{region}/clusters/{cluster_id}",
    ).optional(),
  }).describe(
    "Configuration information for the secondary cluster. This should be set if and only if the cluster is of type SECONDARY.",
  ).optional(),
  sslConfig: z.object({
    caSource: z.enum(["CA_SOURCE_UNSPECIFIED", "CA_SOURCE_MANAGED"]).describe(
      "Optional. Certificate Authority (CA) source. Only CA_SOURCE_MANAGED is supported currently, and is the default value.",
    ).optional(),
    sslMode: z.enum([
      "SSL_MODE_UNSPECIFIED",
      "SSL_MODE_ALLOW",
      "SSL_MODE_REQUIRE",
      "SSL_MODE_VERIFY_CA",
      "ALLOW_UNENCRYPTED_AND_ENCRYPTED",
      "ENCRYPTED_ONLY",
    ]).describe(
      "Optional. SSL mode. Specifies client-server SSL/TLS connection behavior.",
    ).optional(),
  }).describe("SSL configuration.").optional(),
  subscriptionType: z.enum([
    "SUBSCRIPTION_TYPE_UNSPECIFIED",
    "STANDARD",
    "TRIAL",
  ]).describe("Optional. Subscription type of the cluster.").optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: ` "123/environment": "production", "123/costCenter": "marketing" `',
  ).optional(),
  trialMetadata: z.object({
    endTime: z.string().describe("End time of the trial cluster.").optional(),
    graceEndTime: z.string().describe("grace end time of the cluster.")
      .optional(),
    startTime: z.string().describe("start time of the trial cluster.")
      .optional(),
    upgradeTime: z.string().describe(
      "Upgrade time of trial cluster to Standard cluster.",
    ).optional(),
  }).describe(
    "Contains information and all metadata related to TRIAL clusters.",
  ).optional(),
  clusterId: z.string().describe("Required. ID of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud AlloyDB Clusters. Registered at `@swamp/gcp/alloydb/clusters`. */
export const model = {
  type: "@swamp/gcp/alloydb/clusters",
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
      description:
        "A cluster is a collection of regional AlloyDB resources. It can include a pri...",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["automatedBackupPolicy"] !== undefined) {
          body["automatedBackupPolicy"] = g["automatedBackupPolicy"];
        }
        if (g["backupSource"] !== undefined) {
          body["backupSource"] = g["backupSource"];
        }
        if (g["backupdrBackupSource"] !== undefined) {
          body["backupdrBackupSource"] = g["backupdrBackupSource"];
        }
        if (g["backupdrInfo"] !== undefined) {
          body["backupdrInfo"] = g["backupdrInfo"];
        }
        if (g["cloudsqlBackupRunSource"] !== undefined) {
          body["cloudsqlBackupRunSource"] = g["cloudsqlBackupRunSource"];
        }
        if (g["continuousBackupConfig"] !== undefined) {
          body["continuousBackupConfig"] = g["continuousBackupConfig"];
        }
        if (g["continuousBackupInfo"] !== undefined) {
          body["continuousBackupInfo"] = g["continuousBackupInfo"];
        }
        if (g["databaseVersion"] !== undefined) {
          body["databaseVersion"] = g["databaseVersion"];
        }
        if (g["dataplexConfig"] !== undefined) {
          body["dataplexConfig"] = g["dataplexConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["encryptionInfo"] !== undefined) {
          body["encryptionInfo"] = g["encryptionInfo"];
        }
        if (g["initialUser"] !== undefined) {
          body["initialUser"] = g["initialUser"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = g["maintenanceSchedule"];
        }
        if (g["maintenanceUpdatePolicy"] !== undefined) {
          body["maintenanceUpdatePolicy"] = g["maintenanceUpdatePolicy"];
        }
        if (g["maintenanceVersionSelectionPolicy"] !== undefined) {
          body["maintenanceVersionSelectionPolicy"] =
            g["maintenanceVersionSelectionPolicy"];
        }
        if (g["migrationSource"] !== undefined) {
          body["migrationSource"] = g["migrationSource"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["primaryConfig"] !== undefined) {
          body["primaryConfig"] = g["primaryConfig"];
        }
        if (g["pscConfig"] !== undefined) body["pscConfig"] = g["pscConfig"];
        if (g["secondaryConfig"] !== undefined) {
          body["secondaryConfig"] = g["secondaryConfig"];
        }
        if (g["sslConfig"] !== undefined) body["sslConfig"] = g["sslConfig"];
        if (g["subscriptionType"] !== undefined) {
          body["subscriptionType"] = g["subscriptionType"];
        }
        if (g["tags"] !== undefined) body["tags"] = g["tags"];
        if (g["trialMetadata"] !== undefined) {
          body["trialMetadata"] = g["trialMetadata"];
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
              "readyValues": ["READY"],
              "failedValues": ["STOPPED", "FAILED"],
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["automatedBackupPolicy"] !== undefined) {
          body["automatedBackupPolicy"] = g["automatedBackupPolicy"];
        }
        if (g["backupSource"] !== undefined) {
          body["backupSource"] = g["backupSource"];
        }
        if (g["backupdrBackupSource"] !== undefined) {
          body["backupdrBackupSource"] = g["backupdrBackupSource"];
        }
        if (g["backupdrInfo"] !== undefined) {
          body["backupdrInfo"] = g["backupdrInfo"];
        }
        if (g["cloudsqlBackupRunSource"] !== undefined) {
          body["cloudsqlBackupRunSource"] = g["cloudsqlBackupRunSource"];
        }
        if (g["continuousBackupConfig"] !== undefined) {
          body["continuousBackupConfig"] = g["continuousBackupConfig"];
        }
        if (g["continuousBackupInfo"] !== undefined) {
          body["continuousBackupInfo"] = g["continuousBackupInfo"];
        }
        if (g["databaseVersion"] !== undefined) {
          body["databaseVersion"] = g["databaseVersion"];
        }
        if (g["dataplexConfig"] !== undefined) {
          body["dataplexConfig"] = g["dataplexConfig"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["encryptionInfo"] !== undefined) {
          body["encryptionInfo"] = g["encryptionInfo"];
        }
        if (g["initialUser"] !== undefined) {
          body["initialUser"] = g["initialUser"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = g["maintenanceSchedule"];
        }
        if (g["maintenanceUpdatePolicy"] !== undefined) {
          body["maintenanceUpdatePolicy"] = g["maintenanceUpdatePolicy"];
        }
        if (g["maintenanceVersionSelectionPolicy"] !== undefined) {
          body["maintenanceVersionSelectionPolicy"] =
            g["maintenanceVersionSelectionPolicy"];
        }
        if (g["migrationSource"] !== undefined) {
          body["migrationSource"] = g["migrationSource"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["primaryConfig"] !== undefined) {
          body["primaryConfig"] = g["primaryConfig"];
        }
        if (g["pscConfig"] !== undefined) body["pscConfig"] = g["pscConfig"];
        if (g["secondaryConfig"] !== undefined) {
          body["secondaryConfig"] = g["secondaryConfig"];
        }
        if (g["sslConfig"] !== undefined) body["sslConfig"] = g["sslConfig"];
        if (g["subscriptionType"] !== undefined) {
          body["subscriptionType"] = g["subscriptionType"];
        }
        if (g["trialMetadata"] !== undefined) {
          body["trialMetadata"] = g["trialMetadata"];
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
              "failedValues": ["STOPPED", "FAILED"],
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
    createsecondary: {
      description: "createsecondary",
      arguments: z.object({
        annotations: z.any().optional(),
        automatedBackupPolicy: z.any().optional(),
        backupSource: z.any().optional(),
        backupdrBackupSource: z.any().optional(),
        backupdrInfo: z.any().optional(),
        cloudsqlBackupRunSource: z.any().optional(),
        clusterType: z.any().optional(),
        continuousBackupConfig: z.any().optional(),
        continuousBackupInfo: z.any().optional(),
        createTime: z.any().optional(),
        databaseVersion: z.any().optional(),
        dataplexConfig: z.any().optional(),
        deleteTime: z.any().optional(),
        displayName: z.any().optional(),
        encryptionConfig: z.any().optional(),
        encryptionInfo: z.any().optional(),
        etag: z.any().optional(),
        initialUser: z.any().optional(),
        labels: z.any().optional(),
        maintenanceSchedule: z.any().optional(),
        maintenanceUpdatePolicy: z.any().optional(),
        maintenanceVersionSelectionPolicy: z.any().optional(),
        migrationSource: z.any().optional(),
        name: z.any().optional(),
        network: z.any().optional(),
        networkConfig: z.any().optional(),
        primaryConfig: z.any().optional(),
        pscConfig: z.any().optional(),
        reconciling: z.any().optional(),
        satisfiesPzs: z.any().optional(),
        secondaryConfig: z.any().optional(),
        sslConfig: z.any().optional(),
        state: z.any().optional(),
        subscriptionType: z.any().optional(),
        tags: z.any().optional(),
        trialMetadata: z.any().optional(),
        uid: z.any().optional(),
        updateTime: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["annotations"] !== undefined) {
          body["annotations"] = args["annotations"];
        }
        if (args["automatedBackupPolicy"] !== undefined) {
          body["automatedBackupPolicy"] = args["automatedBackupPolicy"];
        }
        if (args["backupSource"] !== undefined) {
          body["backupSource"] = args["backupSource"];
        }
        if (args["backupdrBackupSource"] !== undefined) {
          body["backupdrBackupSource"] = args["backupdrBackupSource"];
        }
        if (args["backupdrInfo"] !== undefined) {
          body["backupdrInfo"] = args["backupdrInfo"];
        }
        if (args["cloudsqlBackupRunSource"] !== undefined) {
          body["cloudsqlBackupRunSource"] = args["cloudsqlBackupRunSource"];
        }
        if (args["clusterType"] !== undefined) {
          body["clusterType"] = args["clusterType"];
        }
        if (args["continuousBackupConfig"] !== undefined) {
          body["continuousBackupConfig"] = args["continuousBackupConfig"];
        }
        if (args["continuousBackupInfo"] !== undefined) {
          body["continuousBackupInfo"] = args["continuousBackupInfo"];
        }
        if (args["createTime"] !== undefined) {
          body["createTime"] = args["createTime"];
        }
        if (args["databaseVersion"] !== undefined) {
          body["databaseVersion"] = args["databaseVersion"];
        }
        if (args["dataplexConfig"] !== undefined) {
          body["dataplexConfig"] = args["dataplexConfig"];
        }
        if (args["deleteTime"] !== undefined) {
          body["deleteTime"] = args["deleteTime"];
        }
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = args["encryptionConfig"];
        }
        if (args["encryptionInfo"] !== undefined) {
          body["encryptionInfo"] = args["encryptionInfo"];
        }
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["initialUser"] !== undefined) {
          body["initialUser"] = args["initialUser"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["maintenanceSchedule"] !== undefined) {
          body["maintenanceSchedule"] = args["maintenanceSchedule"];
        }
        if (args["maintenanceUpdatePolicy"] !== undefined) {
          body["maintenanceUpdatePolicy"] = args["maintenanceUpdatePolicy"];
        }
        if (args["maintenanceVersionSelectionPolicy"] !== undefined) {
          body["maintenanceVersionSelectionPolicy"] =
            args["maintenanceVersionSelectionPolicy"];
        }
        if (args["migrationSource"] !== undefined) {
          body["migrationSource"] = args["migrationSource"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["network"] !== undefined) body["network"] = args["network"];
        if (args["networkConfig"] !== undefined) {
          body["networkConfig"] = args["networkConfig"];
        }
        if (args["primaryConfig"] !== undefined) {
          body["primaryConfig"] = args["primaryConfig"];
        }
        if (args["pscConfig"] !== undefined) {
          body["pscConfig"] = args["pscConfig"];
        }
        if (args["reconciling"] !== undefined) {
          body["reconciling"] = args["reconciling"];
        }
        if (args["satisfiesPzs"] !== undefined) {
          body["satisfiesPzs"] = args["satisfiesPzs"];
        }
        if (args["secondaryConfig"] !== undefined) {
          body["secondaryConfig"] = args["secondaryConfig"];
        }
        if (args["sslConfig"] !== undefined) {
          body["sslConfig"] = args["sslConfig"];
        }
        if (args["state"] !== undefined) body["state"] = args["state"];
        if (args["subscriptionType"] !== undefined) {
          body["subscriptionType"] = args["subscriptionType"];
        }
        if (args["tags"] !== undefined) body["tags"] = args["tags"];
        if (args["trialMetadata"] !== undefined) {
          body["trialMetadata"] = args["trialMetadata"];
        }
        if (args["uid"] !== undefined) body["uid"] = args["uid"];
        if (args["updateTime"] !== undefined) {
          body["updateTime"] = args["updateTime"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alloydb.projects.locations.clusters.createsecondary",
            "path": "v1/{+parent}/clusters:createsecondary",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "clusterId": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "validateOnly": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    export: {
      description: "export",
      arguments: z.object({
        csvExportOptions: z.any().optional(),
        database: z.any().optional(),
        gcsDestination: z.any().optional(),
        sqlExportOptions: z.any().optional(),
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
        if (args["csvExportOptions"] !== undefined) {
          body["csvExportOptions"] = args["csvExportOptions"];
        }
        if (args["database"] !== undefined) body["database"] = args["database"];
        if (args["gcsDestination"] !== undefined) {
          body["gcsDestination"] = args["gcsDestination"];
        }
        if (args["sqlExportOptions"] !== undefined) {
          body["sqlExportOptions"] = args["sqlExportOptions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alloydb.projects.locations.clusters.export",
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
    import: {
      description: "import",
      arguments: z.object({
        csvImportOptions: z.any().optional(),
        database: z.any().optional(),
        gcsUri: z.any().optional(),
        sqlImportOptions: z.any().optional(),
        user: z.any().optional(),
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
        if (args["csvImportOptions"] !== undefined) {
          body["csvImportOptions"] = args["csvImportOptions"];
        }
        if (args["database"] !== undefined) body["database"] = args["database"];
        if (args["gcsUri"] !== undefined) body["gcsUri"] = args["gcsUri"];
        if (args["sqlImportOptions"] !== undefined) {
          body["sqlImportOptions"] = args["sqlImportOptions"];
        }
        if (args["user"] !== undefined) body["user"] = args["user"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "alloydb.projects.locations.clusters.import",
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
    promote: {
      description: "promote",
      arguments: z.object({
        etag: z.any().optional(),
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
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alloydb.projects.locations.clusters.promote",
            "path": "v1/{+name}:promote",
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
    restore: {
      description: "restore",
      arguments: z.object({
        backupSource: z.any().optional(),
        backupdrBackupSource: z.any().optional(),
        backupdrPitrSource: z.any().optional(),
        cluster: z.any().optional(),
        clusterId: z.any().optional(),
        continuousBackupSource: z.any().optional(),
        requestId: z.any().optional(),
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
        if (args["backupSource"] !== undefined) {
          body["backupSource"] = args["backupSource"];
        }
        if (args["backupdrBackupSource"] !== undefined) {
          body["backupdrBackupSource"] = args["backupdrBackupSource"];
        }
        if (args["backupdrPitrSource"] !== undefined) {
          body["backupdrPitrSource"] = args["backupdrPitrSource"];
        }
        if (args["cluster"] !== undefined) body["cluster"] = args["cluster"];
        if (args["clusterId"] !== undefined) {
          body["clusterId"] = args["clusterId"];
        }
        if (args["continuousBackupSource"] !== undefined) {
          body["continuousBackupSource"] = args["continuousBackupSource"];
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
            "id": "alloydb.projects.locations.clusters.restore",
            "path": "v1/{+parent}/clusters:restore",
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
    restore_from_cloud_sql: {
      description: "restore from cloud sql",
      arguments: z.object({
        cloudsqlBackupRunSource: z.any().optional(),
        cluster: z.any().optional(),
        clusterId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["cloudsqlBackupRunSource"] !== undefined) {
          body["cloudsqlBackupRunSource"] = args["cloudsqlBackupRunSource"];
        }
        if (args["cluster"] !== undefined) body["cluster"] = args["cluster"];
        if (args["clusterId"] !== undefined) {
          body["clusterId"] = args["clusterId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alloydb.projects.locations.clusters.restoreFromCloudSQL",
            "path": "v1/{+parent}/clusters:restoreFromCloudSQL",
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
    switchover: {
      description: "switchover",
      arguments: z.object({
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
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "alloydb.projects.locations.clusters.switchover",
            "path": "v1/{+name}:switchover",
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
        etag: z.any().optional(),
        requestId: z.any().optional(),
        validateOnly: z.any().optional(),
        version: z.any().optional(),
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
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        if (args["version"] !== undefined) body["version"] = args["version"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "alloydb.projects.locations.clusters.upgrade",
            "path": "v1/{+name}:upgrade",
            "httpMethod": "PATCH",
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
