// Auto-generated extension model for @swamp/gcp/spanner/instances-databases-backupschedules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Spanner Instances.Databases.BackupSchedules.
 *
 * BackupSchedule expresses the automated backup creation specification for a Spanner database.
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
  return `${parent}/backupSchedules/${shortName}`;
}

const BASE_URL = "https://spanner.googleapis.com/";

const GET_CONFIG = {
  "id": "spanner.projects.instances.databases.backupSchedules.get",
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
  "id": "spanner.projects.instances.databases.backupSchedules.create",
  "path": "v1/{+parent}/backupSchedules",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "backupScheduleId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "spanner.projects.instances.databases.backupSchedules.patch",
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
  "id": "spanner.projects.instances.databases.backupSchedules.delete",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  encryptionConfig: z.object({
    encryptionType: z.enum([
      "ENCRYPTION_TYPE_UNSPECIFIED",
      "USE_DATABASE_ENCRYPTION",
      "GOOGLE_DEFAULT_ENCRYPTION",
      "CUSTOMER_MANAGED_ENCRYPTION",
    ]).describe("Required. The encryption type of the backup.").optional(),
    kmsKeyName: z.string().describe(
      "Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Set this field only when encryption_type is `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{kms_key_name}`.",
    ).optional(),
    kmsKeyNames: z.array(z.string()).describe(
      "Optional. Specifies the KMS configuration for the one or more keys used to protect the backup. Values are of the form `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{kms_key_name}`. The keys referenced by `kms_key_names` must fully cover all regions of the backup's instance configuration. Some examples: * For regional (single-region) instance configurations, specify a regional location KMS key. * For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. * For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations.",
    ).optional(),
  }).describe("Encryption configuration for the backup to create.").optional(),
  fullBackupSpec: z.object({}).describe(
    "The specification for full backups. A full backup stores the entire contents of the database at a given version time.",
  ).optional(),
  incrementalBackupSpec: z.object({}).describe(
    "The specification for incremental backup chains. An incremental backup stores the delta of changes between a previous backup and the database contents at a given version time. An incremental backup chain consists of a full backup and zero or more successive incremental backups. The first backup created for an incremental backup chain is always a full backup.",
  ).optional(),
  retentionDuration: z.string().describe(
    "Optional. The retention duration of a backup that must be at least 6 hours and at most 366 days. The backup is eligible to be automatically deleted once the retention period has elapsed.",
  ).optional(),
  spec: z.object({
    cronSpec: z.object({
      creationWindow: z.string().describe(
        "Output only. Scheduled backups contain an externally consistent copy of the database at the version time specified in `schedule_spec.cron_spec`. However, Spanner might not initiate the creation of the scheduled backups at that version time. Spanner initiates the creation of scheduled backups within the time window bounded by the version_time specified in `schedule_spec.cron_spec` and version_time + `creation_window`.",
      ).optional(),
      text: z.string().describe(
        "Required. Textual representation of the crontab. User can customize the backup frequency and the backup version time using the cron expression. The version time must be in UTC timezone. The backup will contain an externally consistent copy of the database at the version time. Full backups must be scheduled a minimum of 12 hours apart and incremental backups must be scheduled a minimum of 4 hours apart. Examples of valid cron specifications: * `0 2/12 * * *`: every 12 hours at (2, 14) hours past midnight in UTC. * `0 2,14 * * *`: every 12 hours at (2, 14) hours past midnight in UTC. * `0 */4 * * *`: (incremental backups only) every 4 hours at (0, 4, 8, 12, 16, 20) hours past midnight in UTC. * `0 2 * * *`: once a day at 2 past midnight in UTC. * `0 2 * * 0`: once a week every Sunday at 2 past midnight in UTC. * `0 2 8 * *`: once a month on 8th day at 2 past midnight in UTC.",
      ).optional(),
      timeZone: z.string().describe(
        "Output only. The time zone of the times in `CrontabSpec.text`. Currently, only UTC is supported.",
      ).optional(),
    }).describe(
      "CrontabSpec can be used to specify the version time and frequency at which the backup is created.",
    ).optional(),
  }).describe("Defines specifications of the backup schedule.").optional(),
  backupScheduleId: z.string().describe(
    "Required. The Id to use for the backup schedule. The `backup_schedule_id` appended to `parent` forms the full backup schedule name of the form `projects//instances//databases//backupSchedules/`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  encryptionConfig: z.object({
    encryptionType: z.string(),
    kmsKeyName: z.string(),
    kmsKeyNames: z.array(z.string()),
  }).optional(),
  fullBackupSpec: z.object({}).optional(),
  incrementalBackupSpec: z.object({}).optional(),
  name: z.string(),
  retentionDuration: z.string().optional(),
  spec: z.object({
    cronSpec: z.object({
      creationWindow: z.string(),
      text: z.string(),
      timeZone: z.string(),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  encryptionConfig: z.object({
    encryptionType: z.enum([
      "ENCRYPTION_TYPE_UNSPECIFIED",
      "USE_DATABASE_ENCRYPTION",
      "GOOGLE_DEFAULT_ENCRYPTION",
      "CUSTOMER_MANAGED_ENCRYPTION",
    ]).describe("Required. The encryption type of the backup.").optional(),
    kmsKeyName: z.string().describe(
      "Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Set this field only when encryption_type is `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{kms_key_name}`.",
    ).optional(),
    kmsKeyNames: z.array(z.string()).describe(
      "Optional. Specifies the KMS configuration for the one or more keys used to protect the backup. Values are of the form `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{kms_key_name}`. The keys referenced by `kms_key_names` must fully cover all regions of the backup's instance configuration. Some examples: * For regional (single-region) instance configurations, specify a regional location KMS key. * For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. * For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations.",
    ).optional(),
  }).describe("Encryption configuration for the backup to create.").optional(),
  fullBackupSpec: z.object({}).describe(
    "The specification for full backups. A full backup stores the entire contents of the database at a given version time.",
  ).optional(),
  incrementalBackupSpec: z.object({}).describe(
    "The specification for incremental backup chains. An incremental backup stores the delta of changes between a previous backup and the database contents at a given version time. An incremental backup chain consists of a full backup and zero or more successive incremental backups. The first backup created for an incremental backup chain is always a full backup.",
  ).optional(),
  retentionDuration: z.string().describe(
    "Optional. The retention duration of a backup that must be at least 6 hours and at most 366 days. The backup is eligible to be automatically deleted once the retention period has elapsed.",
  ).optional(),
  spec: z.object({
    cronSpec: z.object({
      creationWindow: z.string().describe(
        "Output only. Scheduled backups contain an externally consistent copy of the database at the version time specified in `schedule_spec.cron_spec`. However, Spanner might not initiate the creation of the scheduled backups at that version time. Spanner initiates the creation of scheduled backups within the time window bounded by the version_time specified in `schedule_spec.cron_spec` and version_time + `creation_window`.",
      ).optional(),
      text: z.string().describe(
        "Required. Textual representation of the crontab. User can customize the backup frequency and the backup version time using the cron expression. The version time must be in UTC timezone. The backup will contain an externally consistent copy of the database at the version time. Full backups must be scheduled a minimum of 12 hours apart and incremental backups must be scheduled a minimum of 4 hours apart. Examples of valid cron specifications: * `0 2/12 * * *`: every 12 hours at (2, 14) hours past midnight in UTC. * `0 2,14 * * *`: every 12 hours at (2, 14) hours past midnight in UTC. * `0 */4 * * *`: (incremental backups only) every 4 hours at (0, 4, 8, 12, 16, 20) hours past midnight in UTC. * `0 2 * * *`: once a day at 2 past midnight in UTC. * `0 2 * * 0`: once a week every Sunday at 2 past midnight in UTC. * `0 2 8 * *`: once a month on 8th day at 2 past midnight in UTC.",
      ).optional(),
      timeZone: z.string().describe(
        "Output only. The time zone of the times in `CrontabSpec.text`. Currently, only UTC is supported.",
      ).optional(),
    }).describe(
      "CrontabSpec can be used to specify the version time and frequency at which the backup is created.",
    ).optional(),
  }).describe("Defines specifications of the backup schedule.").optional(),
  backupScheduleId: z.string().describe(
    "Required. The Id to use for the backup schedule. The `backup_schedule_id` appended to `parent` forms the full backup schedule name of the form `projects//instances//databases//backupSchedules/`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Spanner Instances.Databases.BackupSchedules. Registered at `@swamp/gcp/spanner/instances-databases-backupschedules`. */
export const model = {
  type: "@swamp/gcp/spanner/instances-databases-backupschedules",
  version: "2026.05.12.1",
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
        "BackupSchedule expresses the automated backup creation specification for a Sp...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a backupSchedules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["fullBackupSpec"] !== undefined) {
          body["fullBackupSpec"] = g["fullBackupSpec"];
        }
        if (g["incrementalBackupSpec"] !== undefined) {
          body["incrementalBackupSpec"] = g["incrementalBackupSpec"];
        }
        if (g["retentionDuration"] !== undefined) {
          body["retentionDuration"] = g["retentionDuration"];
        }
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
        if (g["backupScheduleId"] !== undefined) {
          body["backupScheduleId"] = g["backupScheduleId"];
        }
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
      description: "Get a backupSchedules",
      arguments: z.object({
        identifier: z.string().describe("The name of the backupSchedules"),
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
      description: "Update backupSchedules attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["encryptionConfig"] !== undefined) {
          body["encryptionConfig"] = g["encryptionConfig"];
        }
        if (g["fullBackupSpec"] !== undefined) {
          body["fullBackupSpec"] = g["fullBackupSpec"];
        }
        if (g["incrementalBackupSpec"] !== undefined) {
          body["incrementalBackupSpec"] = g["incrementalBackupSpec"];
        }
        if (g["retentionDuration"] !== undefined) {
          body["retentionDuration"] = g["retentionDuration"];
        }
        if (g["spec"] !== undefined) body["spec"] = g["spec"];
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
      description: "Delete the backupSchedules",
      arguments: z.object({
        identifier: z.string().describe("The name of the backupSchedules"),
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
      description: "Sync backupSchedules state from GCP",
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
