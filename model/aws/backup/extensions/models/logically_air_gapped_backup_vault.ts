// Auto-generated extension model for @swamp/aws/backup/logically-air-gapped-backup-vault
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Backup LogicallyAirGappedBackupVault (AWS::Backup::LogicallyAirGappedBackupVault).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";

const GlobalArgsSchema = z.object({
  AccessPolicy: z.string().optional(),
  BackupVaultName: z.string().regex(new RegExp("^[a-zA-Z0-9\\-\\_]{2,50}$")),
  MinRetentionDays: z.number().int(),
  MaxRetentionDays: z.number().int(),
  BackupVaultTags: z.record(z.string(), z.string()).optional(),
  Notifications: z.object({
    BackupVaultEvents: z.array(z.string()),
    SNSTopicArn: z.string(),
  }).optional(),
  EncryptionKeyArn: z.string().optional(),
  MpaApprovalTeamArn: z.string().optional(),
});

const StateSchema = z.object({
  AccessPolicy: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  BackupVaultName: z.string(),
  MinRetentionDays: z.number().optional(),
  MaxRetentionDays: z.number().optional(),
  BackupVaultTags: z.record(z.string(), z.unknown()).optional(),
  Notifications: z.object({
    BackupVaultEvents: z.array(z.string()),
    SNSTopicArn: z.string(),
  }).optional(),
  EncryptionKeyArn: z.string().optional(),
  BackupVaultArn: z.string().optional(),
  VaultState: z.string().optional(),
  VaultType: z.string().optional(),
  MpaApprovalTeamArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  AccessPolicy: z.string().optional(),
  BackupVaultName: z.string().regex(new RegExp("^[a-zA-Z0-9\\-\\_]{2,50}$"))
    .optional(),
  MinRetentionDays: z.number().int().optional(),
  MaxRetentionDays: z.number().int().optional(),
  BackupVaultTags: z.record(z.string(), z.string()).optional(),
  Notifications: z.object({
    BackupVaultEvents: z.array(z.string()).optional(),
    SNSTopicArn: z.string().optional(),
  }).optional(),
  EncryptionKeyArn: z.string().optional(),
  MpaApprovalTeamArn: z.string().optional(),
});

/** Swamp extension model for Backup LogicallyAirGappedBackupVault. Registered at `@swamp/aws/backup/logically-air-gapped-backup-vault`. */
export const model = {
  type: "@swamp/aws/backup/logically-air-gapped-backup-vault",
  version: "2026.05.19.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
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
      description: "Backup LogicallyAirGappedBackupVault resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Backup LogicallyAirGappedBackupVault",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Backup::LogicallyAirGappedBackupVault",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.BackupVaultName ?? g.BackupVaultName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Backup LogicallyAirGappedBackupVault",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Backup LogicallyAirGappedBackupVault",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Backup::LogicallyAirGappedBackupVault",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.BackupVaultName ?? context.globalArgs.BackupVaultName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Backup LogicallyAirGappedBackupVault",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.BackupVaultName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.BackupVaultName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Backup::LogicallyAirGappedBackupVault",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Backup::LogicallyAirGappedBackupVault",
          identifier,
          currentState,
          desiredState,
          [
            "BackupVaultName",
            "MinRetentionDays",
            "MaxRetentionDays",
            "EncryptionKeyArn",
          ],
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a Backup LogicallyAirGappedBackupVault",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Backup LogicallyAirGappedBackupVault",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Backup::LogicallyAirGappedBackupVault",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.BackupVaultName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Backup LogicallyAirGappedBackupVault state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.BackupVaultName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.BackupVaultName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Backup::LogicallyAirGappedBackupVault",
            identifier,
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
              identifier,
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
