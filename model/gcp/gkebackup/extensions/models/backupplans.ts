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

// Auto-generated extension model for @swamp/gcp/gkebackup/backupplans
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Backup for GKE BackupPlans.
 *
 * Defines the configuration and scheduling for a "line" of Backups.
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
  return `${parent}/backupPlans/${shortName}`;
}

const BASE_URL = "https://gkebackup.googleapis.com/";

const GET_CONFIG = {
  "id": "gkebackup.projects.locations.backupPlans.get",
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
  "id": "gkebackup.projects.locations.backupPlans.create",
  "path": "v1/{+parent}/backupPlans",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "backupPlanId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "gkebackup.projects.locations.backupPlans.patch",
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
  "id": "gkebackup.projects.locations.backupPlans.delete",
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
  "id": "gkebackup.projects.locations.backupPlans.list",
  "path": "v1/{+parent}/backupPlans",
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
  backupConfig: z.object({
    allNamespaces: z.boolean().describe(
      "If True, include all namespaced resources",
    ).optional(),
    encryptionKey: z.object({
      gcpKmsEncryptionKey: z.string().describe(
        "Optional. Google Cloud KMS encryption key. Format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`",
      ).optional(),
    }).describe(
      "Defined a customer managed encryption key that will be used to encrypt Backup artifacts.",
    ).optional(),
    includeSecrets: z.boolean().describe(
      "Optional. This flag specifies whether Kubernetes Secret resources should be included when they fall into the scope of Backups. Default: False",
    ).optional(),
    includeVolumeData: z.boolean().describe(
      "Optional. This flag specifies whether volume data should be backed up when PVCs are included in the scope of a Backup. Default: False",
    ).optional(),
    permissiveMode: z.boolean().describe(
      "Optional. If false, Backups will fail when Backup for GKE detects Kubernetes configuration that is non-standard or requires additional setup to restore. Default: False",
    ).optional(),
    selectedApplications: z.object({
      namespacedNames: z.array(z.object({
        name: z.string().describe(
          "Optional. The name of the Kubernetes resource.",
        ).optional(),
        namespace: z.string().describe(
          "Optional. The Namespace of the Kubernetes resource.",
        ).optional(),
      })).describe("Optional. A list of namespaced Kubernetes resources.")
        .optional(),
    }).describe("A list of namespaced Kubernetes resources.").optional(),
    selectedNamespaceLabels: z.object({
      resourceLabels: z.array(z.object({
        key: z.string().describe("Optional. The key/name of the label.")
          .optional(),
        value: z.string().describe("Optional. The value of the label.")
          .optional(),
      })).describe("Optional. A list of Kubernetes label-value pairs.")
        .optional(),
    }).describe("A list of Kubernetes labels.").optional(),
    selectedNamespaces: z.object({
      namespaces: z.array(z.string()).describe(
        "Optional. A list of Kubernetes Namespaces.",
      ).optional(),
    }).describe("A list of Kubernetes Namespaces.").optional(),
  }).describe(
    "BackupConfig defines the configuration of Backups created via this BackupPlan.",
  ).optional(),
  backupSchedule: z.object({
    cronSchedule: z.string().describe(
      "Optional. A standard [cron](https://wikipedia.com/wiki/cron) string that defines a repeating schedule for creating Backups via this BackupPlan. This is mutually exclusive with the rpo_config field since at most one schedule can be defined for a BackupPlan. If this is defined, then backup_retain_days must also be defined. Default (empty): no automatic backup creation will occur.",
    ).optional(),
    nextScheduledBackupTime: z.string().describe(
      "Output only. Start time of next scheduled backup under this BackupPlan by either cron_schedule or rpo config.",
    ).optional(),
    paused: z.boolean().describe(
      "Optional. This flag denotes whether automatic Backup creation is paused for this BackupPlan. Default: False",
    ).optional(),
    rpoConfig: z.object({
      exclusionWindows: z.array(z.object({
        daily: z.boolean().describe(
          'The exclusion window occurs every day if set to "True". Specifying this field to "False" is an error.',
        ).optional(),
        daysOfWeek: z.object({
          daysOfWeek: z.unknown().describe("Optional. A list of days of week.")
            .optional(),
        }).describe("Holds repeated DaysOfWeek values as a container.")
          .optional(),
        duration: z.string().describe(
          "Required. Specifies duration of the window. Duration must be >= 5 minutes and = target RPO - daily window: duration < 24 hours - weekly window: - days of week includes all seven days of a week: duration < 24 hours - all other weekly window: duration < 168 hours (i.e., 24 * 7 hours)",
        ).optional(),
        singleOccurrenceDate: z.object({
          day: z.unknown().describe(
            "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
          ).optional(),
          month: z.unknown().describe(
            "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
          ).optional(),
          year: z.unknown().describe(
            "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
          ).optional(),
        }).describe(
          "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
        ).optional(),
        startTime: z.object({
          hours: z.unknown().describe(
            'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.unknown().describe(
            "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
          ).optional(),
          nanos: z.unknown().describe(
            "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
          ).optional(),
          seconds: z.unknown().describe(
            "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
        }).describe(
          "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
        ).optional(),
      })).describe(
        "Optional. User specified time windows during which backup can NOT happen for this BackupPlan - backups should start and finish outside of any given exclusion window. Note: backup jobs will be scheduled to start and finish outside the duration of the window as much as possible, but running jobs will not get canceled when it runs into the window. All the time and date values in exclusion_windows entry in the API are in UTC. We only allow <=1 recurrence (daily or weekly) exclusion window for a BackupPlan while no restriction on number of single occurrence windows.",
      ).optional(),
      targetRpoMinutes: z.number().int().describe(
        "Required. Defines the target RPO for the BackupPlan in minutes, which means the target maximum data loss in time that is acceptable for this BackupPlan. This must be at least 60, i.e., 1 hour, and at most 86400, i.e., 60 days.",
      ).optional(),
    }).describe(
      "Defines RPO scheduling configuration for automatically creating Backups via this BackupPlan.",
    ).optional(),
  }).describe(
    "Defines scheduling parameters for automatically creating Backups via this BackupPlan.",
  ).optional(),
  cluster: z.string().describe(
    "Required. Immutable. The source cluster from which Backups will be created via this BackupPlan. Valid formats: - `projects/*/locations/*/clusters/*` - `projects/*/zones/*/clusters/*`",
  ).optional(),
  deactivated: z.boolean().describe(
    "Optional. This flag indicates whether this BackupPlan has been deactivated. Setting this field to True locks the BackupPlan such that no further updates will be allowed (except deletes), including the deactivated field itself. It also prevents any new Backups from being created via this BackupPlan (including scheduled Backups). Default: False",
  ).optional(),
  description: z.string().describe(
    "Optional. User specified descriptive string for this BackupPlan.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. A set of custom labels supplied by user.",
  ).optional(),
  retentionPolicy: z.object({
    backupDeleteLockDays: z.number().int().describe(
      "Optional. Minimum age for Backups created via this BackupPlan (in days). This field MUST be an integer value between 0-90 (inclusive). A Backup created under this BackupPlan will NOT be deletable until it reaches Backup's (create_time + backup_delete_lock_days). Updating this field of a BackupPlan does NOT affect existing Backups under it. Backups created AFTER a successful update will inherit the new value. Default: 0 (no delete blocking)",
    ).optional(),
    backupRetainDays: z.number().int().describe(
      "Optional. The default maximum age of a Backup created via this BackupPlan. This field MUST be an integer value >= 0 and = backup_delete_lock_days. If cron_schedule is defined, then this must be <= 360 * the creation interval. If rpo_config is defined, then this must be <= 360 * target_rpo_minutes / (1440minutes/day). Default: 0 (no automatic deletion)",
    ).optional(),
    locked: z.boolean().describe(
      "Optional. This flag denotes whether the retention policy of this BackupPlan is locked. If set to True, no further update is allowed on this policy, including the `locked` field itself. Default: False",
    ).optional(),
  }).describe(
    "RetentionPolicy defines a Backup retention policy for a BackupPlan.",
  ).optional(),
  backupPlanId: z.string().describe(
    "Required. The client-provided short name for the BackupPlan resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of BackupPlans in this location",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  backupChannel: z.string().optional(),
  backupConfig: z.object({
    allNamespaces: z.boolean(),
    encryptionKey: z.object({
      gcpKmsEncryptionKey: z.string(),
    }),
    includeSecrets: z.boolean(),
    includeVolumeData: z.boolean(),
    permissiveMode: z.boolean(),
    selectedApplications: z.object({
      namespacedNames: z.array(z.object({
        name: z.string(),
        namespace: z.string(),
      })),
    }),
    selectedNamespaceLabels: z.object({
      resourceLabels: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
    }),
    selectedNamespaces: z.object({
      namespaces: z.array(z.string()),
    }),
  }).optional(),
  backupSchedule: z.object({
    cronSchedule: z.string(),
    nextScheduledBackupTime: z.string(),
    paused: z.boolean(),
    rpoConfig: z.object({
      exclusionWindows: z.array(z.object({
        daily: z.boolean(),
        daysOfWeek: z.object({
          daysOfWeek: z.unknown(),
        }),
        duration: z.string(),
        singleOccurrenceDate: z.object({
          day: z.unknown(),
          month: z.unknown(),
          year: z.unknown(),
        }),
        startTime: z.object({
          hours: z.unknown(),
          minutes: z.unknown(),
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
      })),
      targetRpoMinutes: z.number(),
    }),
  }).optional(),
  cluster: z.string().optional(),
  createTime: z.string().optional(),
  deactivated: z.boolean().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  lastSuccessfulBackupTime: z.string().optional(),
  name: z.string(),
  protectedNamespaceCount: z.number().optional(),
  protectedPodCount: z.number().optional(),
  retentionPolicy: z.object({
    backupDeleteLockDays: z.number(),
    backupRetainDays: z.number(),
    locked: z.boolean(),
  }).optional(),
  rpoRiskLevel: z.number().optional(),
  rpoRiskReason: z.string().optional(),
  state: z.string().optional(),
  stateReason: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  backupConfig: z.object({
    allNamespaces: z.boolean().describe(
      "If True, include all namespaced resources",
    ).optional(),
    encryptionKey: z.object({
      gcpKmsEncryptionKey: z.string().describe(
        "Optional. Google Cloud KMS encryption key. Format: `projects/*/locations/*/keyRings/*/cryptoKeys/*`",
      ).optional(),
    }).describe(
      "Defined a customer managed encryption key that will be used to encrypt Backup artifacts.",
    ).optional(),
    includeSecrets: z.boolean().describe(
      "Optional. This flag specifies whether Kubernetes Secret resources should be included when they fall into the scope of Backups. Default: False",
    ).optional(),
    includeVolumeData: z.boolean().describe(
      "Optional. This flag specifies whether volume data should be backed up when PVCs are included in the scope of a Backup. Default: False",
    ).optional(),
    permissiveMode: z.boolean().describe(
      "Optional. If false, Backups will fail when Backup for GKE detects Kubernetes configuration that is non-standard or requires additional setup to restore. Default: False",
    ).optional(),
    selectedApplications: z.object({
      namespacedNames: z.array(z.object({
        name: z.string().describe(
          "Optional. The name of the Kubernetes resource.",
        ).optional(),
        namespace: z.string().describe(
          "Optional. The Namespace of the Kubernetes resource.",
        ).optional(),
      })).describe("Optional. A list of namespaced Kubernetes resources.")
        .optional(),
    }).describe("A list of namespaced Kubernetes resources.").optional(),
    selectedNamespaceLabels: z.object({
      resourceLabels: z.array(z.object({
        key: z.string().describe("Optional. The key/name of the label.")
          .optional(),
        value: z.string().describe("Optional. The value of the label.")
          .optional(),
      })).describe("Optional. A list of Kubernetes label-value pairs.")
        .optional(),
    }).describe("A list of Kubernetes labels.").optional(),
    selectedNamespaces: z.object({
      namespaces: z.array(z.string()).describe(
        "Optional. A list of Kubernetes Namespaces.",
      ).optional(),
    }).describe("A list of Kubernetes Namespaces.").optional(),
  }).describe(
    "BackupConfig defines the configuration of Backups created via this BackupPlan.",
  ).optional(),
  backupSchedule: z.object({
    cronSchedule: z.string().describe(
      "Optional. A standard [cron](https://wikipedia.com/wiki/cron) string that defines a repeating schedule for creating Backups via this BackupPlan. This is mutually exclusive with the rpo_config field since at most one schedule can be defined for a BackupPlan. If this is defined, then backup_retain_days must also be defined. Default (empty): no automatic backup creation will occur.",
    ).optional(),
    nextScheduledBackupTime: z.string().describe(
      "Output only. Start time of next scheduled backup under this BackupPlan by either cron_schedule or rpo config.",
    ).optional(),
    paused: z.boolean().describe(
      "Optional. This flag denotes whether automatic Backup creation is paused for this BackupPlan. Default: False",
    ).optional(),
    rpoConfig: z.object({
      exclusionWindows: z.array(z.object({
        daily: z.boolean().describe(
          'The exclusion window occurs every day if set to "True". Specifying this field to "False" is an error.',
        ).optional(),
        daysOfWeek: z.object({
          daysOfWeek: z.unknown().describe("Optional. A list of days of week.")
            .optional(),
        }).describe("Holds repeated DaysOfWeek values as a container.")
          .optional(),
        duration: z.string().describe(
          "Required. Specifies duration of the window. Duration must be >= 5 minutes and = target RPO - daily window: duration < 24 hours - weekly window: - days of week includes all seven days of a week: duration < 24 hours - all other weekly window: duration < 168 hours (i.e., 24 * 7 hours)",
        ).optional(),
        singleOccurrenceDate: z.object({
          day: z.unknown().describe(
            "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
          ).optional(),
          month: z.unknown().describe(
            "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
          ).optional(),
          year: z.unknown().describe(
            "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
          ).optional(),
        }).describe(
          "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
        ).optional(),
        startTime: z.object({
          hours: z.unknown().describe(
            'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
          ).optional(),
          minutes: z.unknown().describe(
            "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
          ).optional(),
          nanos: z.unknown().describe(
            "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
          ).optional(),
          seconds: z.unknown().describe(
            "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
          ).optional(),
        }).describe(
          "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
        ).optional(),
      })).describe(
        "Optional. User specified time windows during which backup can NOT happen for this BackupPlan - backups should start and finish outside of any given exclusion window. Note: backup jobs will be scheduled to start and finish outside the duration of the window as much as possible, but running jobs will not get canceled when it runs into the window. All the time and date values in exclusion_windows entry in the API are in UTC. We only allow <=1 recurrence (daily or weekly) exclusion window for a BackupPlan while no restriction on number of single occurrence windows.",
      ).optional(),
      targetRpoMinutes: z.number().int().describe(
        "Required. Defines the target RPO for the BackupPlan in minutes, which means the target maximum data loss in time that is acceptable for this BackupPlan. This must be at least 60, i.e., 1 hour, and at most 86400, i.e., 60 days.",
      ).optional(),
    }).describe(
      "Defines RPO scheduling configuration for automatically creating Backups via this BackupPlan.",
    ).optional(),
  }).describe(
    "Defines scheduling parameters for automatically creating Backups via this BackupPlan.",
  ).optional(),
  cluster: z.string().describe(
    "Required. Immutable. The source cluster from which Backups will be created via this BackupPlan. Valid formats: - `projects/*/locations/*/clusters/*` - `projects/*/zones/*/clusters/*`",
  ).optional(),
  deactivated: z.boolean().describe(
    "Optional. This flag indicates whether this BackupPlan has been deactivated. Setting this field to True locks the BackupPlan such that no further updates will be allowed (except deletes), including the deactivated field itself. It also prevents any new Backups from being created via this BackupPlan (including scheduled Backups). Default: False",
  ).optional(),
  description: z.string().describe(
    "Optional. User specified descriptive string for this BackupPlan.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. A set of custom labels supplied by user.",
  ).optional(),
  retentionPolicy: z.object({
    backupDeleteLockDays: z.number().int().describe(
      "Optional. Minimum age for Backups created via this BackupPlan (in days). This field MUST be an integer value between 0-90 (inclusive). A Backup created under this BackupPlan will NOT be deletable until it reaches Backup's (create_time + backup_delete_lock_days). Updating this field of a BackupPlan does NOT affect existing Backups under it. Backups created AFTER a successful update will inherit the new value. Default: 0 (no delete blocking)",
    ).optional(),
    backupRetainDays: z.number().int().describe(
      "Optional. The default maximum age of a Backup created via this BackupPlan. This field MUST be an integer value >= 0 and = backup_delete_lock_days. If cron_schedule is defined, then this must be <= 360 * the creation interval. If rpo_config is defined, then this must be <= 360 * target_rpo_minutes / (1440minutes/day). Default: 0 (no automatic deletion)",
    ).optional(),
    locked: z.boolean().describe(
      "Optional. This flag denotes whether the retention policy of this BackupPlan is locked. If set to True, no further update is allowed on this policy, including the `locked` field itself. Default: False",
    ).optional(),
  }).describe(
    "RetentionPolicy defines a Backup retention policy for a BackupPlan.",
  ).optional(),
  backupPlanId: z.string().describe(
    "Required. The client-provided short name for the BackupPlan resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of BackupPlans in this location",
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

/** Swamp extension model for Google Cloud Backup for GKE BackupPlans. Registered at `@swamp/gcp/gkebackup/backupplans`. */
export const model = {
  type: "@swamp/gcp/gkebackup/backupplans",
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
        'Defines the configuration and scheduling for a "line" of Backups.',
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a backupPlans",
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
        if (g["backupConfig"] !== undefined) {
          body["backupConfig"] = g["backupConfig"];
        }
        if (g["backupSchedule"] !== undefined) {
          body["backupSchedule"] = g["backupSchedule"];
        }
        if (g["cluster"] !== undefined) body["cluster"] = g["cluster"];
        if (g["deactivated"] !== undefined) {
          body["deactivated"] = g["deactivated"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["retentionPolicy"] !== undefined) {
          body["retentionPolicy"] = g["retentionPolicy"];
        }
        if (g["backupPlanId"] !== undefined) {
          body["backupPlanId"] = g["backupPlanId"];
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
              "failedValues": ["FAILED"],
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
      description: "Get a backupPlans",
      arguments: z.object({
        identifier: z.string().describe("The name of the backupPlans"),
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
      description: "Update backupPlans attributes",
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
        if (g["backupConfig"] !== undefined) {
          body["backupConfig"] = g["backupConfig"];
        }
        if (g["backupSchedule"] !== undefined) {
          body["backupSchedule"] = g["backupSchedule"];
        }
        if (g["deactivated"] !== undefined) {
          body["deactivated"] = g["deactivated"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["retentionPolicy"] !== undefined) {
          body["retentionPolicy"] = g["retentionPolicy"];
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
              "failedValues": ["FAILED"],
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
      description: "Delete the backupPlans",
      arguments: z.object({
        identifier: z.string().describe("The name of the backupPlans"),
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
      description: "Sync backupPlans state from GCP",
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
      description: "List backupPlans resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Field match expression used to filter the results.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Field by which to sort the results.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried.",
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
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "backupPlans",
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
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          BASE_URL,
          {
            "id": "gkebackup.projects.locations.backupPlans.getIamPolicy",
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_tags: {
      description: "get tags",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
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
        const result = await createResource(
          BASE_URL,
          {
            "id": "gkebackup.projects.locations.backupPlans.getTags",
            "path": "v1/{+name}:getTags",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
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
        updateMask: z.any().optional(),
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
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "gkebackup.projects.locations.backupPlans.setIamPolicy",
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
    set_tags: {
      description: "set tags",
      arguments: z.object({
        etag: z.any().optional(),
        name: z.any().optional(),
        requestId: z.any().optional(),
        tags: z.any().optional(),
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
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        if (args["tags"] !== undefined) body["tags"] = args["tags"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "gkebackup.projects.locations.backupPlans.setTags",
            "path": "v1/{+name}:setTags",
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
            "id": "gkebackup.projects.locations.backupPlans.testIamPermissions",
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
