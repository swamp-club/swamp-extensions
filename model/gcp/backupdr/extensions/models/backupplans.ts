// Auto-generated extension model for @swamp/gcp/backupdr/backupplans
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Backup and DR Service BackupPlans.
 *
 * A `BackupPlan` specifies some common fields, such as `description` as well as one or more `BackupRule` messages. Each `BackupRule` has a retention policy and defines a schedule by which the system is to perform backup workloads.
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
  return `${parent}/backupPlans/${shortName}`;
}

const BASE_URL = "https://backupdr.googleapis.com/";

const GET_CONFIG = {
  "id": "backupdr.projects.locations.backupPlans.get",
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
  "id": "backupdr.projects.locations.backupPlans.create",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "backupdr.projects.locations.backupPlans.patch",
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
  "id": "backupdr.projects.locations.backupPlans.delete",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  backupRules: z.array(z.object({
    backupRetentionDays: z.number().int().describe(
      "Required. Configures the duration for which backup data will be kept. It is defined in “days”. The value should be greater than or equal to minimum enforced retention of the backup vault. Minimum value is 1 and maximum value is 36159 for custom retention on-demand backup. Minimum and maximum values are workload specific for all other rules. Note: Longer retention can lead to higher storage costs post introductory trial. We recommend starting with a short duration of 3 days or less.",
    ).optional(),
    ruleId: z.string().describe(
      "Required. Immutable. The unique id of this `BackupRule`. The `rule_id` is unique per `BackupPlan`.The `rule_id` must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, /a-z{,62}/.",
    ).optional(),
    standardSchedule: z.object({
      backupWindow: z.object({
        endHourOfDay: z.number().int().describe(
          "Required. The hour of day (1-24) when the window end for example if value of end hour of day is 10 that mean backup window end time is 10:00. End hour of day should be greater than start hour of day. 0 <= start_hour_of_day < end_hour_of_day <= 24 End hour of day is not include in backup window that mean if end_hour_of_day= 10 jobs should start before 10:00.",
        ).optional(),
        startHourOfDay: z.number().int().describe(
          "Required. The hour of day (0-23) when the window starts for example if value of start hour of day is 6 that mean backup window start at 6:00.",
        ).optional(),
      }).describe(
        "`BackupWindow` defines a window of the day during which backup jobs will run.",
      ).optional(),
      daysOfMonth: z.array(z.number().int()).describe(
        "Optional. Specifies days of months like 1, 5, or 14 on which jobs will run. Values for `days_of_month` are only applicable for `recurrence_type`, `MONTHLY` and `YEARLY`. A validation error will occur if other values are supplied.",
      ).optional(),
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
        "Optional. Specifies days of week like, MONDAY or TUESDAY, on which jobs will run. This is required for `recurrence_type`, `WEEKLY` and is not applicable otherwise. A validation error will occur if a value is supplied and `recurrence_type` is not `WEEKLY`.",
      ).optional(),
      hourlyFrequency: z.number().int().describe(
        "Optional. Specifies frequency for hourly backups. A hourly frequency of 1 means jobs will run every 1 hour from start time till end time defined. This is required for `recurrence_type`, `HOURLY` and is not applicable otherwise. A validation error will occur if a value is supplied and `recurrence_type` is not `HOURLY`. The supported values for each resource type are as follows: * `compute.googleapis.com/Instance`: 4-23 * `compute.googleapis.com/Disk`: 1-23 * `sqladmin.googleapis.com/Instance`: 6-23 * `alloydb.googleapis.com/Cluster`: 1-23 * `file.googleapis.com/Instance`: 1-23 Refer to link https://cloud.google.com/backup-disaster-recovery/docs/concepts/cloud_best_practices for more details.",
      ).optional(),
      months: z.array(
        z.enum([
          "MONTH_UNSPECIFIED",
          "JANUARY",
          "FEBRUARY",
          "MARCH",
          "APRIL",
          "MAY",
          "JUNE",
          "JULY",
          "AUGUST",
          "SEPTEMBER",
          "OCTOBER",
          "NOVEMBER",
          "DECEMBER",
        ]),
      ).describe(
        "Optional. Specifies the months of year, like `FEBRUARY` and/or `MAY`, on which jobs will run. This field is only applicable when `recurrence_type` is `YEARLY`. A validation error will occur if other values are supplied.",
      ).optional(),
      recurrenceType: z.enum([
        "RECURRENCE_TYPE_UNSPECIFIED",
        "HOURLY",
        "DAILY",
        "WEEKLY",
        "MONTHLY",
        "YEARLY",
      ]).describe("Required. Specifies the `RecurrenceType` for the schedule.")
        .optional(),
      timeZone: z.string().describe(
        "Required. The time zone to be used when interpreting the schedule. The value of this field must be a time zone name from the IANA tz database. See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for the list of valid timezone names. For example, Europe/Paris.",
      ).optional(),
      weekDayOfMonth: z.object({
        dayOfWeek: z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]).describe("Required. Specifies the day of the week.").optional(),
        weekOfMonth: z.enum([
          "WEEK_OF_MONTH_UNSPECIFIED",
          "FIRST",
          "SECOND",
          "THIRD",
          "FOURTH",
          "LAST",
        ]).describe("Required. Specifies the week of the month.").optional(),
      }).describe(
        "`WeekDayOfMonth` defines the week day of the month on which the backups will run. The message combines a `WeekOfMonth` and `DayOfWeek` to produce values like `FIRST`/`MONDAY` or `LAST`/`FRIDAY`.",
      ).optional(),
    }).describe(
      "`StandardSchedule` defines a schedule that run within the confines of a defined window of days. We can define recurrence type for schedule as HOURLY, DAILY, WEEKLY, MONTHLY or YEARLY.",
    ).optional(),
  })).describe("Optional. The backup rules for this `BackupPlan`.").optional(),
  backupVault: z.string().describe(
    "Required. Resource name of backup vault which will be used as storage location for backups. Format: projects/{project}/locations/{location}/backupVaults/{backupvault}",
  ).optional(),
  computeInstanceBackupPlanProperties: z.object({
    guestFlush: z.boolean().describe(
      "Optional. Indicates whether to perform a guest flush operation before taking a compute backup. When set to false, the system will create crash-consistent backups. Default value is false.",
    ).optional(),
  }).describe("--- ComputeInstanceBackupPlanProperties Message ---").optional(),
  description: z.string().describe(
    'Optional. The description of the `BackupPlan` resource. The description allows for additional details about `BackupPlan` and its use cases to be provided. An example description is the following: "This is a backup plan that performs a daily backup at 6pm and retains data for 3 months". The description must be at most 2048 characters.',
  ).optional(),
  diskBackupPlanProperties: z.object({
    guestFlush: z.boolean().describe(
      "Optional. Indicates whether to perform a guest flush operation before taking a disk backup. When set to false, the system will create crash-consistent backups. Default value is false.",
    ).optional(),
  }).describe("--- DiskBackupPlanProperties Message ---").optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. This collection of key/value pairs allows for custom labels to be supplied by the user. Example, {"tag": "Weekly"}.',
  ).optional(),
  logRetentionDays: z.string().describe(
    "Optional. Applicable only for Cloud SQL resource_type. Configures how long logs will be stored. It is defined in “days”. This value should be greater than or equal to minimum enforced log retention duration of the backup vault.",
  ).optional(),
  maxCustomOnDemandRetentionDays: z.number().int().describe(
    "Optional. Optional field to configure the maximum number of days for which a backup can be retained. This field is only applicable for on-demand backups taken with custom retention value.",
  ).optional(),
  resourceType: z.string().describe(
    'Required. The resource type to which the `BackupPlan` will be applied. Examples include, "compute.googleapis.com/Instance", "sqladmin.googleapis.com/Instance", "alloydb.googleapis.com/Cluster", "compute.googleapis.com/Disk".',
  ).optional(),
  backupPlanId: z.string().describe(
    "Required. The name of the `BackupPlan` to create. The name must be unique for the specified project and location.The name must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, /a-z{,62}/.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  backupRules: z.array(z.object({
    backupRetentionDays: z.number(),
    ruleId: z.string(),
    standardSchedule: z.object({
      backupWindow: z.object({
        endHourOfDay: z.number(),
        startHourOfDay: z.number(),
      }),
      daysOfMonth: z.array(z.number()),
      daysOfWeek: z.array(z.string()),
      hourlyFrequency: z.number(),
      months: z.array(z.string()),
      recurrenceType: z.string(),
      timeZone: z.string(),
      weekDayOfMonth: z.object({
        dayOfWeek: z.string(),
        weekOfMonth: z.string(),
      }),
    }),
  })).optional(),
  backupVault: z.string().optional(),
  backupVaultServiceAccount: z.string().optional(),
  computeInstanceBackupPlanProperties: z.object({
    guestFlush: z.boolean(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  diskBackupPlanProperties: z.object({
    guestFlush: z.boolean(),
  }).optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  logRetentionDays: z.string().optional(),
  maxCustomOnDemandRetentionDays: z.number().optional(),
  name: z.string(),
  resourceType: z.string().optional(),
  revisionId: z.string().optional(),
  revisionName: z.string().optional(),
  state: z.string().optional(),
  supportedResourceTypes: z.array(z.string()).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  backupRules: z.array(z.object({
    backupRetentionDays: z.number().int().describe(
      "Required. Configures the duration for which backup data will be kept. It is defined in “days”. The value should be greater than or equal to minimum enforced retention of the backup vault. Minimum value is 1 and maximum value is 36159 for custom retention on-demand backup. Minimum and maximum values are workload specific for all other rules. Note: Longer retention can lead to higher storage costs post introductory trial. We recommend starting with a short duration of 3 days or less.",
    ).optional(),
    ruleId: z.string().describe(
      "Required. Immutable. The unique id of this `BackupRule`. The `rule_id` is unique per `BackupPlan`.The `rule_id` must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, /a-z{,62}/.",
    ).optional(),
    standardSchedule: z.object({
      backupWindow: z.object({
        endHourOfDay: z.number().int().describe(
          "Required. The hour of day (1-24) when the window end for example if value of end hour of day is 10 that mean backup window end time is 10:00. End hour of day should be greater than start hour of day. 0 <= start_hour_of_day < end_hour_of_day <= 24 End hour of day is not include in backup window that mean if end_hour_of_day= 10 jobs should start before 10:00.",
        ).optional(),
        startHourOfDay: z.number().int().describe(
          "Required. The hour of day (0-23) when the window starts for example if value of start hour of day is 6 that mean backup window start at 6:00.",
        ).optional(),
      }).describe(
        "`BackupWindow` defines a window of the day during which backup jobs will run.",
      ).optional(),
      daysOfMonth: z.array(z.number().int()).describe(
        "Optional. Specifies days of months like 1, 5, or 14 on which jobs will run. Values for `days_of_month` are only applicable for `recurrence_type`, `MONTHLY` and `YEARLY`. A validation error will occur if other values are supplied.",
      ).optional(),
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
        "Optional. Specifies days of week like, MONDAY or TUESDAY, on which jobs will run. This is required for `recurrence_type`, `WEEKLY` and is not applicable otherwise. A validation error will occur if a value is supplied and `recurrence_type` is not `WEEKLY`.",
      ).optional(),
      hourlyFrequency: z.number().int().describe(
        "Optional. Specifies frequency for hourly backups. A hourly frequency of 1 means jobs will run every 1 hour from start time till end time defined. This is required for `recurrence_type`, `HOURLY` and is not applicable otherwise. A validation error will occur if a value is supplied and `recurrence_type` is not `HOURLY`. The supported values for each resource type are as follows: * `compute.googleapis.com/Instance`: 4-23 * `compute.googleapis.com/Disk`: 1-23 * `sqladmin.googleapis.com/Instance`: 6-23 * `alloydb.googleapis.com/Cluster`: 1-23 * `file.googleapis.com/Instance`: 1-23 Refer to link https://cloud.google.com/backup-disaster-recovery/docs/concepts/cloud_best_practices for more details.",
      ).optional(),
      months: z.array(
        z.enum([
          "MONTH_UNSPECIFIED",
          "JANUARY",
          "FEBRUARY",
          "MARCH",
          "APRIL",
          "MAY",
          "JUNE",
          "JULY",
          "AUGUST",
          "SEPTEMBER",
          "OCTOBER",
          "NOVEMBER",
          "DECEMBER",
        ]),
      ).describe(
        "Optional. Specifies the months of year, like `FEBRUARY` and/or `MAY`, on which jobs will run. This field is only applicable when `recurrence_type` is `YEARLY`. A validation error will occur if other values are supplied.",
      ).optional(),
      recurrenceType: z.enum([
        "RECURRENCE_TYPE_UNSPECIFIED",
        "HOURLY",
        "DAILY",
        "WEEKLY",
        "MONTHLY",
        "YEARLY",
      ]).describe("Required. Specifies the `RecurrenceType` for the schedule.")
        .optional(),
      timeZone: z.string().describe(
        "Required. The time zone to be used when interpreting the schedule. The value of this field must be a time zone name from the IANA tz database. See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for the list of valid timezone names. For example, Europe/Paris.",
      ).optional(),
      weekDayOfMonth: z.object({
        dayOfWeek: z.enum([
          "DAY_OF_WEEK_UNSPECIFIED",
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ]).describe("Required. Specifies the day of the week.").optional(),
        weekOfMonth: z.enum([
          "WEEK_OF_MONTH_UNSPECIFIED",
          "FIRST",
          "SECOND",
          "THIRD",
          "FOURTH",
          "LAST",
        ]).describe("Required. Specifies the week of the month.").optional(),
      }).describe(
        "`WeekDayOfMonth` defines the week day of the month on which the backups will run. The message combines a `WeekOfMonth` and `DayOfWeek` to produce values like `FIRST`/`MONDAY` or `LAST`/`FRIDAY`.",
      ).optional(),
    }).describe(
      "`StandardSchedule` defines a schedule that run within the confines of a defined window of days. We can define recurrence type for schedule as HOURLY, DAILY, WEEKLY, MONTHLY or YEARLY.",
    ).optional(),
  })).describe("Optional. The backup rules for this `BackupPlan`.").optional(),
  backupVault: z.string().describe(
    "Required. Resource name of backup vault which will be used as storage location for backups. Format: projects/{project}/locations/{location}/backupVaults/{backupvault}",
  ).optional(),
  computeInstanceBackupPlanProperties: z.object({
    guestFlush: z.boolean().describe(
      "Optional. Indicates whether to perform a guest flush operation before taking a compute backup. When set to false, the system will create crash-consistent backups. Default value is false.",
    ).optional(),
  }).describe("--- ComputeInstanceBackupPlanProperties Message ---").optional(),
  description: z.string().describe(
    'Optional. The description of the `BackupPlan` resource. The description allows for additional details about `BackupPlan` and its use cases to be provided. An example description is the following: "This is a backup plan that performs a daily backup at 6pm and retains data for 3 months". The description must be at most 2048 characters.',
  ).optional(),
  diskBackupPlanProperties: z.object({
    guestFlush: z.boolean().describe(
      "Optional. Indicates whether to perform a guest flush operation before taking a disk backup. When set to false, the system will create crash-consistent backups. Default value is false.",
    ).optional(),
  }).describe("--- DiskBackupPlanProperties Message ---").optional(),
  labels: z.record(z.string(), z.string()).describe(
    'Optional. This collection of key/value pairs allows for custom labels to be supplied by the user. Example, {"tag": "Weekly"}.',
  ).optional(),
  logRetentionDays: z.string().describe(
    "Optional. Applicable only for Cloud SQL resource_type. Configures how long logs will be stored. It is defined in “days”. This value should be greater than or equal to minimum enforced log retention duration of the backup vault.",
  ).optional(),
  maxCustomOnDemandRetentionDays: z.number().int().describe(
    "Optional. Optional field to configure the maximum number of days for which a backup can be retained. This field is only applicable for on-demand backups taken with custom retention value.",
  ).optional(),
  resourceType: z.string().describe(
    'Required. The resource type to which the `BackupPlan` will be applied. Examples include, "compute.googleapis.com/Instance", "sqladmin.googleapis.com/Instance", "alloydb.googleapis.com/Cluster", "compute.googleapis.com/Disk".',
  ).optional(),
  backupPlanId: z.string().describe(
    "Required. The name of the `BackupPlan` to create. The name must be unique for the specified project and location.The name must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, /a-z{,62}/.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Backup and DR Service BackupPlans. Registered at `@swamp/gcp/backupdr/backupplans`. */
export const model = {
  type: "@swamp/gcp/backupdr/backupplans",
  version: "2026.05.12.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "Added: computeInstanceBackupPlanProperties",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
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
      toVersion: "2026.05.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A `BackupPlan` specifies some common fields, such as `description` as well as...",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["backupRules"] !== undefined) {
          body["backupRules"] = g["backupRules"];
        }
        if (g["backupVault"] !== undefined) {
          body["backupVault"] = g["backupVault"];
        }
        if (g["computeInstanceBackupPlanProperties"] !== undefined) {
          body["computeInstanceBackupPlanProperties"] =
            g["computeInstanceBackupPlanProperties"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskBackupPlanProperties"] !== undefined) {
          body["diskBackupPlanProperties"] = g["diskBackupPlanProperties"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["logRetentionDays"] !== undefined) {
          body["logRetentionDays"] = g["logRetentionDays"];
        }
        if (g["maxCustomOnDemandRetentionDays"] !== undefined) {
          body["maxCustomOnDemandRetentionDays"] =
            g["maxCustomOnDemandRetentionDays"];
        }
        if (g["resourceType"] !== undefined) {
          body["resourceType"] = g["resourceType"];
        }
        if (g["backupPlanId"] !== undefined) {
          body["backupPlanId"] = g["backupPlanId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
              "readyValues": ["ACTIVE"],
              "failedValues": [],
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
      description: "Get a backupPlans",
      arguments: z.object({
        identifier: z.string().describe("The name of the backupPlans"),
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
        if (g["backupRules"] !== undefined) {
          body["backupRules"] = g["backupRules"];
        }
        if (g["backupVault"] !== undefined) {
          body["backupVault"] = g["backupVault"];
        }
        if (g["computeInstanceBackupPlanProperties"] !== undefined) {
          body["computeInstanceBackupPlanProperties"] =
            g["computeInstanceBackupPlanProperties"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["diskBackupPlanProperties"] !== undefined) {
          body["diskBackupPlanProperties"] = g["diskBackupPlanProperties"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["logRetentionDays"] !== undefined) {
          body["logRetentionDays"] = g["logRetentionDays"];
        }
        if (g["maxCustomOnDemandRetentionDays"] !== undefined) {
          body["maxCustomOnDemandRetentionDays"] =
            g["maxCustomOnDemandRetentionDays"];
        }
        if (g["resourceType"] !== undefined) {
          body["resourceType"] = g["resourceType"];
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
      description: "Delete the backupPlans",
      arguments: z.object({
        identifier: z.string().describe("The name of the backupPlans"),
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
      description: "Sync backupPlans state from GCP",
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
  },
};
