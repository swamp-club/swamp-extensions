// Auto-generated extension model for @swamp/gcp/netapp/backupvaults
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud NetApp BackupVaults.
 *
 * A NetApp BackupVault.
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
  return `${parent}/backupVaults/${shortName}`;
}

const BASE_URL = "https://netapp.googleapis.com/";

const GET_CONFIG = {
  "id": "netapp.projects.locations.backupVaults.get",
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
  "id": "netapp.projects.locations.backupVaults.create",
  "path": "v1/{+parent}/backupVaults",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "backupVaultId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "netapp.projects.locations.backupVaults.patch",
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
  "id": "netapp.projects.locations.backupVaults.delete",
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
  "id": "netapp.projects.locations.backupVaults.list",
  "path": "v1/{+parent}/backupVaults",
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
  backupRegion: z.string().describe(
    "Optional. Region where the backups are stored. Format: `projects/{project_id}/locations/{location}`",
  ).optional(),
  backupRetentionPolicy: z.object({
    backupMinimumEnforcedRetentionDays: z.number().int().describe(
      "Required. Minimum retention duration in days for backups in the backup vault.",
    ).optional(),
    dailyBackupImmutable: z.boolean().describe(
      "Optional. Indicates if the daily backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true.",
    ).optional(),
    manualBackupImmutable: z.boolean().describe(
      "Optional. Indicates if the manual backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true.",
    ).optional(),
    monthlyBackupImmutable: z.boolean().describe(
      "Optional. Indicates if the monthly backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true.",
    ).optional(),
    weeklyBackupImmutable: z.boolean().describe(
      "Optional. Indicates if the weekly backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true.",
    ).optional(),
  }).describe("Retention policy for backups in the backup vault").optional(),
  backupVaultType: z.enum([
    "BACKUP_VAULT_TYPE_UNSPECIFIED",
    "IN_REGION",
    "CROSS_REGION",
  ]).describe(
    "Optional. Type of backup vault to be created. Default is IN_REGION.",
  ).optional(),
  description: z.string().describe("Description of the backup vault.")
    .optional(),
  kmsConfig: z.string().describe(
    "Optional. Specifies the Key Management System (KMS) configuration to be used for backup encryption. Format: `projects/{project}/locations/{location}/kmsConfigs/{kms_config}`",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user provided metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the backup vault. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}`.",
  ).optional(),
  backupVaultId: z.string().describe(
    "Required. The ID to use for the backupVault. The ID must be unique within the specified location. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  backupRegion: z.string().optional(),
  backupRetentionPolicy: z.object({
    backupMinimumEnforcedRetentionDays: z.number(),
    dailyBackupImmutable: z.boolean(),
    manualBackupImmutable: z.boolean(),
    monthlyBackupImmutable: z.boolean(),
    weeklyBackupImmutable: z.boolean(),
  }).optional(),
  backupVaultType: z.string().optional(),
  backupsCryptoKeyVersion: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  destinationBackupVault: z.string().optional(),
  encryptionState: z.string().optional(),
  kmsConfig: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  sourceBackupVault: z.string().optional(),
  sourceRegion: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  backupRegion: z.string().describe(
    "Optional. Region where the backups are stored. Format: `projects/{project_id}/locations/{location}`",
  ).optional(),
  backupRetentionPolicy: z.object({
    backupMinimumEnforcedRetentionDays: z.number().int().describe(
      "Required. Minimum retention duration in days for backups in the backup vault.",
    ).optional(),
    dailyBackupImmutable: z.boolean().describe(
      "Optional. Indicates if the daily backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true.",
    ).optional(),
    manualBackupImmutable: z.boolean().describe(
      "Optional. Indicates if the manual backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true.",
    ).optional(),
    monthlyBackupImmutable: z.boolean().describe(
      "Optional. Indicates if the monthly backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true.",
    ).optional(),
    weeklyBackupImmutable: z.boolean().describe(
      "Optional. Indicates if the weekly backups are immutable. At least one of daily_backup_immutable, weekly_backup_immutable, monthly_backup_immutable and manual_backup_immutable must be true.",
    ).optional(),
  }).describe("Retention policy for backups in the backup vault").optional(),
  backupVaultType: z.enum([
    "BACKUP_VAULT_TYPE_UNSPECIFIED",
    "IN_REGION",
    "CROSS_REGION",
  ]).describe(
    "Optional. Type of backup vault to be created. Default is IN_REGION.",
  ).optional(),
  description: z.string().describe("Description of the backup vault.")
    .optional(),
  kmsConfig: z.string().describe(
    "Optional. Specifies the Key Management System (KMS) configuration to be used for backup encryption. Format: `projects/{project}/locations/{location}/kmsConfigs/{kms_config}`",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Resource labels to represent user provided metadata.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the backup vault. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}`.",
  ).optional(),
  backupVaultId: z.string().describe(
    "Required. The ID to use for the backupVault. The ID must be unique within the specified location. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud NetApp BackupVaults. Registered at `@swamp/gcp/netapp/backupvaults`. */
export const model = {
  type: "@swamp/gcp/netapp/backupvaults",
  version: "2026.05.24.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A NetApp BackupVault.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a backupVaults",
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
        if (g["backupRegion"] !== undefined) {
          body["backupRegion"] = g["backupRegion"];
        }
        if (g["backupRetentionPolicy"] !== undefined) {
          body["backupRetentionPolicy"] = g["backupRetentionPolicy"];
        }
        if (g["backupVaultType"] !== undefined) {
          body["backupVaultType"] = g["backupVaultType"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["kmsConfig"] !== undefined) body["kmsConfig"] = g["kmsConfig"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["backupVaultId"] !== undefined) {
          body["backupVaultId"] = g["backupVaultId"];
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
              "failedValues": ["ERROR"],
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
      description: "Get a backupVaults",
      arguments: z.object({
        identifier: z.string().describe("The name of the backupVaults"),
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
      description: "Update backupVaults attributes",
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
        if (g["backupRegion"] !== undefined) {
          body["backupRegion"] = g["backupRegion"];
        }
        if (g["backupRetentionPolicy"] !== undefined) {
          body["backupRetentionPolicy"] = g["backupRetentionPolicy"];
        }
        if (g["backupVaultType"] !== undefined) {
          body["backupVaultType"] = g["backupVaultType"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["kmsConfig"] !== undefined) body["kmsConfig"] = g["kmsConfig"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
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
              "failedValues": ["ERROR"],
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
      description: "Delete the backupVaults",
      arguments: z.object({
        identifier: z.string().describe("The name of the backupVaults"),
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
      description: "Sync backupVaults state from GCP",
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
