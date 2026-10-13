// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const LIST_CONFIG = {
  "id": "alloydb.projects.locations.clusters.list",
  "path": "v1/{+parent}/clusters",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
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
      "Optional. The encryption config can be specified to encrypt the backups with a customer-managed encryption key (CMEK). When this field is not specified, the backup will use the cluster's encryption config.",
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
      "Quantity-based Backup retention policy to retain recent backups.",
    ).optional(),
    timeBasedRetention: z.object({
      retentionPeriod: z.string().describe("The retention period.").optional(),
    }).describe("Time-based Backup retention policy.").optional(),
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
    }).describe("Weekly schedule for the Backup.").optional(),
  }).describe(
    "The automated backup policy for this cluster. If no policy is provided then the default policy will be used. If backups are supported for the cluster, the default policy takes one backup a day, has a backup window of 1 hour, and retains backups for 14 days. For more information on the defaults, consult the documentation for the message type.",
  ).optional(),
  continuousBackupConfig: z.object({
    enabled: z.boolean().describe("Whether ContinuousBackup is enabled.")
      .optional(),
    encryptionConfig: z.object({
      kmsKeyName: z.string().describe(
        "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
      ).optional(),
    }).describe(
      "The encryption config can be specified to encrypt the backups with a customer-managed encryption key (CMEK). When this field is not specified, the backup will use the cluster's encryption config.",
    ).optional(),
    recoveryWindowDays: z.number().int().describe(
      "The number of days that are eligible to restore from using PITR. To support the entire recovery window, backups and logs are retained for one day more than the recovery window. If not set, defaults to 14 days.",
    ).optional(),
  }).describe("Optional. Continuous backup configuration for this cluster.")
    .optional(),
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
  }).describe("Optional. Configuration for Dataplex integration.").optional(),
  displayName: z.string().describe(
    "User-settable and human-readable display name for the Cluster.",
  ).optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
    ).optional(),
  }).describe(
    "Optional. The encryption config can be specified to encrypt the data disks and other persistent data resources of a cluster with a customer-managed encryption key (CMEK). When this field is not specified, the cluster will then use default encryption scheme to protect the user data.",
  ).optional(),
  initialUser: z.object({
    password: z.string().describe("The initial password for the user.")
      .optional(),
    user: z.string().describe("The database username.").optional(),
  }).describe(
    "Input only. Initial user to setup during cluster creation. Required. If used in `RestoreCluster` this is ignored.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("Labels as key value pairs")
    .optional(),
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
        "Deny period end date. This can be: * A full date, with non-zero year, month and day values OR * A month and day value, with a zero year for recurring",
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
        "Deny period start date. This can be: * A full date, with non-zero year, month and day values OR * A month and day value, with a zero year for recurring",
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
        "Time in UTC when the deny period starts on start_date and ends on end_date. This can be: * Full time OR * All zeros for 00:00:00 UTC",
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
        "Preferred time to start the maintenance operation on the specified day. Maintenance will start within 1 hour of this time.",
      ).optional(),
    })).describe(
      "Preferred windows to perform maintenance. Currently limited to 1.",
    ).optional(),
  }).describe(
    "Optional. The maintenance update policy determines when to allow or deny updates.",
  ).optional(),
  maintenanceVersionSelectionPolicy: z.enum([
    "MAINTENANCE_VERSION_SELECTION_POLICY_UNSPECIFIED",
    "MAINTENANCE_VERSION_SELECTION_POLICY_LATEST",
    "MAINTENANCE_VERSION_SELECTION_POLICY_DEFAULT",
  ]).describe(
    "Input only. Policy to use to automatically select the maintenance version to which to update the cluster's instances.",
  ).optional(),
  networkConfig: z.object({
    allocatedIpRange: z.string().describe(
      'Optional. Name of the allocated IP range for the private IP AlloyDB cluster, for example: "google-managed-services-default". If set, the instance IPs for this cluster will be created in the allocated range. The range name must comply with RFC 1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. Field name is intended to be consistent with Cloud SQL.',
    ).optional(),
    network: z.string().describe(
      "Optional. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: `projects/{project_number}/global/networks/{network_id}`. This is required to create a cluster.",
    ).optional(),
  }).describe("Optional.").optional(),
  pscConfig: z.object({
    pscEnabled: z.boolean().describe(
      "Optional. Create an instance that allows connections from Private Service Connect endpoints to the instance.",
    ).optional(),
    serviceOwnedProjectNumber: z.string().describe(
      "Output only. The project number that needs to be allowlisted on the network attachment to enable outbound connectivity.",
    ).optional(),
  }).describe(
    "Optional. The configuration for Private Service Connect (PSC) for the cluster.",
  ).optional(),
  secondaryConfig: z.object({
    primaryClusterName: z.string().describe(
      "The name of the primary cluster name with the format: * projects/{project}/locations/{region}/clusters/{cluster_id}",
    ).optional(),
  }).describe("Cross Region replication config specific to SECONDARY cluster.")
    .optional(),
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
  }).describe("SSL configuration for this AlloyDB cluster.").optional(),
  subscriptionType: z.enum([
    "SUBSCRIPTION_TYPE_UNSPECIFIED",
    "STANDARD",
    "TRIAL",
  ]).describe("Optional. Subscription type of the cluster.").optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: ` "123/environment": "production", "123/costCenter": "marketing" `',
  ).optional(),
  clusterId: z.string().describe("Required. ID of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  allowMissing: z.string().describe(
    "Optional. If set to true, update succeeds even if cluster is not found. In that case, a new cluster is created and `update_mask` is ignored.",
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
      "Optional. The encryption config can be specified to encrypt the backups with a customer-managed encryption key (CMEK). When this field is not specified, the backup will use the cluster's encryption config.",
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
      "Quantity-based Backup retention policy to retain recent backups.",
    ).optional(),
    timeBasedRetention: z.object({
      retentionPeriod: z.string().describe("The retention period.").optional(),
    }).describe("Time-based Backup retention policy.").optional(),
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
    }).describe("Weekly schedule for the Backup.").optional(),
  }).describe(
    "The automated backup policy for this cluster. If no policy is provided then the default policy will be used. If backups are supported for the cluster, the default policy takes one backup a day, has a backup window of 1 hour, and retains backups for 14 days. For more information on the defaults, consult the documentation for the message type.",
  ).optional(),
  continuousBackupConfig: z.object({
    enabled: z.boolean().describe("Whether ContinuousBackup is enabled.")
      .optional(),
    encryptionConfig: z.object({
      kmsKeyName: z.string().describe(
        "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
      ).optional(),
    }).describe(
      "The encryption config can be specified to encrypt the backups with a customer-managed encryption key (CMEK). When this field is not specified, the backup will use the cluster's encryption config.",
    ).optional(),
    recoveryWindowDays: z.number().int().describe(
      "The number of days that are eligible to restore from using PITR. To support the entire recovery window, backups and logs are retained for one day more than the recovery window. If not set, defaults to 14 days.",
    ).optional(),
  }).describe("Optional. Continuous backup configuration for this cluster.")
    .optional(),
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
  }).describe("Optional. Configuration for Dataplex integration.").optional(),
  displayName: z.string().describe(
    "User-settable and human-readable display name for the Cluster.",
  ).optional(),
  encryptionConfig: z.object({
    kmsKeyName: z.string().describe(
      "The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/[PROJECT]/locations/[REGION]/keyRings/[RING]/cryptoKeys/[KEY_NAME]",
    ).optional(),
  }).describe(
    "Optional. The encryption config can be specified to encrypt the data disks and other persistent data resources of a cluster with a customer-managed encryption key (CMEK). When this field is not specified, the cluster will then use default encryption scheme to protect the user data.",
  ).optional(),
  initialUser: z.object({
    password: z.string().describe("The initial password for the user.")
      .optional(),
    user: z.string().describe("The database username.").optional(),
  }).describe(
    "Input only. Initial user to setup during cluster creation. Required. If used in `RestoreCluster` this is ignored.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("Labels as key value pairs")
    .optional(),
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
        "Deny period end date. This can be: * A full date, with non-zero year, month and day values OR * A month and day value, with a zero year for recurring",
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
        "Deny period start date. This can be: * A full date, with non-zero year, month and day values OR * A month and day value, with a zero year for recurring",
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
        "Time in UTC when the deny period starts on start_date and ends on end_date. This can be: * Full time OR * All zeros for 00:00:00 UTC",
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
        "Preferred time to start the maintenance operation on the specified day. Maintenance will start within 1 hour of this time.",
      ).optional(),
    })).describe(
      "Preferred windows to perform maintenance. Currently limited to 1.",
    ).optional(),
  }).describe(
    "Optional. The maintenance update policy determines when to allow or deny updates.",
  ).optional(),
  maintenanceVersionSelectionPolicy: z.enum([
    "MAINTENANCE_VERSION_SELECTION_POLICY_UNSPECIFIED",
    "MAINTENANCE_VERSION_SELECTION_POLICY_LATEST",
    "MAINTENANCE_VERSION_SELECTION_POLICY_DEFAULT",
  ]).describe(
    "Input only. Policy to use to automatically select the maintenance version to which to update the cluster's instances.",
  ).optional(),
  networkConfig: z.object({
    allocatedIpRange: z.string().describe(
      'Optional. Name of the allocated IP range for the private IP AlloyDB cluster, for example: "google-managed-services-default". If set, the instance IPs for this cluster will be created in the allocated range. The range name must comply with RFC 1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. Field name is intended to be consistent with Cloud SQL.',
    ).optional(),
    network: z.string().describe(
      "Optional. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: `projects/{project_number}/global/networks/{network_id}`. This is required to create a cluster.",
    ).optional(),
  }).describe("Optional.").optional(),
  pscConfig: z.object({
    pscEnabled: z.boolean().describe(
      "Optional. Create an instance that allows connections from Private Service Connect endpoints to the instance.",
    ).optional(),
    serviceOwnedProjectNumber: z.string().describe(
      "Output only. The project number that needs to be allowlisted on the network attachment to enable outbound connectivity.",
    ).optional(),
  }).describe(
    "Optional. The configuration for Private Service Connect (PSC) for the cluster.",
  ).optional(),
  secondaryConfig: z.object({
    primaryClusterName: z.string().describe(
      "The name of the primary cluster name with the format: * projects/{project}/locations/{region}/clusters/{cluster_id}",
    ).optional(),
  }).describe("Cross Region replication config specific to SECONDARY cluster.")
    .optional(),
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
  }).describe("SSL configuration for this AlloyDB cluster.").optional(),
  subscriptionType: z.enum([
    "SUBSCRIPTION_TYPE_UNSPECIFIED",
    "STANDARD",
    "TRIAL",
  ]).describe("Optional. Subscription type of the cluster.").optional(),
  tags: z.record(z.string(), z.string()).describe(
    'Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: ` "123/environment": "production", "123/costCenter": "marketing" `',
  ).optional(),
  clusterId: z.string().describe("Required. ID of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  allowMissing: z.string().describe(
    "Optional. If set to true, update succeeds even if cluster is not found. In that case, a new cluster is created and `update_mask` is ignored.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud AlloyDB Clusters. Registered at `@swamp/gcp/alloydb/clusters`. */
export const model = {
  type: "@swamp/gcp/alloydb/clusters",
  version: "2026.10.13.1",
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
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description:
        "Removed: backupSource, backupdrBackupSource, backupdrInfo, cloudsqlBackupRunSource, continuousBackupInfo, encryptionInfo, maintenanceSchedule, migrationSource, primaryConfig, trialMetadata",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          backupSource: _backupSource,
          backupdrBackupSource: _backupdrBackupSource,
          backupdrInfo: _backupdrInfo,
          cloudsqlBackupRunSource: _cloudsqlBackupRunSource,
          continuousBackupInfo: _continuousBackupInfo,
          encryptionInfo: _encryptionInfo,
          maintenanceSchedule: _maintenanceSchedule,
          migrationSource: _migrationSource,
          primaryConfig: _primaryConfig,
          trialMetadata: _trialMetadata,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "Added: allowMissing",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["continuousBackupConfig"] !== undefined) {
          body["continuousBackupConfig"] = g["continuousBackupConfig"];
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
        if (g["initialUser"] !== undefined) {
          body["initialUser"] = g["initialUser"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maintenanceUpdatePolicy"] !== undefined) {
          body["maintenanceUpdatePolicy"] = g["maintenanceUpdatePolicy"];
        }
        if (g["maintenanceVersionSelectionPolicy"] !== undefined) {
          body["maintenanceVersionSelectionPolicy"] =
            g["maintenanceVersionSelectionPolicy"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
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
        if (g["clusterId"] !== undefined) {
          params["clusterId"] = String(g["clusterId"]);
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
      description: "Get a clusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the clusters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
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
      description: "Update clusters attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific clusters by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["automatedBackupPolicy"] !== undefined) {
          body["automatedBackupPolicy"] = g["automatedBackupPolicy"];
        }
        if (g["continuousBackupConfig"] !== undefined) {
          body["continuousBackupConfig"] = g["continuousBackupConfig"];
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
        if (g["initialUser"] !== undefined) {
          body["initialUser"] = g["initialUser"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["maintenanceUpdatePolicy"] !== undefined) {
          body["maintenanceUpdatePolicy"] = g["maintenanceUpdatePolicy"];
        }
        if (g["maintenanceVersionSelectionPolicy"] !== undefined) {
          body["maintenanceVersionSelectionPolicy"] =
            g["maintenanceVersionSelectionPolicy"];
        }
        if (g["networkConfig"] !== undefined) {
          body["networkConfig"] = g["networkConfig"];
        }
        if (g["pscConfig"] !== undefined) body["pscConfig"] = g["pscConfig"];
        if (g["secondaryConfig"] !== undefined) {
          body["secondaryConfig"] = g["secondaryConfig"];
        }
        if (g["sslConfig"] !== undefined) body["sslConfig"] = g["sslConfig"];
        if (g["subscriptionType"] !== undefined) {
          body["subscriptionType"] = g["subscriptionType"];
        }
        if (g["allowMissing"] !== undefined) {
          params["allowMissing"] = String(g["allowMissing"]);
        } else if (existing["allowMissing"] !== undefined) {
          params["allowMissing"] = String(existing["allowMissing"]);
        }
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
      description: "Delete the clusters",
      arguments: z.object({
        identifier: z.string().describe("The name of the clusters"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync clusters state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific clusters by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List clusters resources",
      arguments: z.object({
        filter: z.string().describe("Optional. Filtering results").optional(),
        orderBy: z.string().describe(
          "Optional. Hint for how to order the results",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "clusters",
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
        clusterId: z.any().optional(),
        requestId: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["clusterId"] !== undefined) {
          params["clusterId"] = String(args["clusterId"]);
        }
        if (args["requestId"] !== undefined) {
          params["requestId"] = String(args["requestId"]);
        }
        if (args["validateOnly"] !== undefined) {
          params["validateOnly"] = String(args["validateOnly"]);
        }
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
          {
            "id": "alloydb.projects.locations.clusters.export",
            "path": "v1/{+name}:export",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
          baseUrl,
          {
            "id": "alloydb.projects.locations.clusters.import",
            "path": "v1/{+name}:import",
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
    promote: {
      description: "promote",
      arguments: z.object({
        etag: z.any().optional(),
        requestId: z.any().optional(),
        validateOnly: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "alloydb.projects.locations.clusters.promote",
            "path": "v1/{+name}:promote",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          baseUrl,
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
          undefined,
          undefined,
          undefined,
          credentials,
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "alloydb.projects.locations.clusters.switchover",
            "path": "v1/{+name}:switchover",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
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
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["validateOnly"] !== undefined) {
          body["validateOnly"] = args["validateOnly"];
        }
        if (args["version"] !== undefined) body["version"] = args["version"];
        const result = await createResource(
          baseUrl,
          {
            "id": "alloydb.projects.locations.clusters.upgrade",
            "path": "v1/{+name}:upgrade",
            "httpMethod": "PATCH",
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
  },
};
