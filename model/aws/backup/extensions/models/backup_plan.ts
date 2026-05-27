// Auto-generated extension model for @swamp/aws/backup/backup-plan
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Backup BackupPlan (AWS::Backup::BackupPlan).
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

const AdvancedBackupSettingResourceTypeSchema = z.object({
  BackupOptions: z.record(z.string(), z.unknown()),
  ResourceType: z.string(),
});

const IndexActionsResourceTypeSchema = z.object({
  ResourceTypes: z.array(z.string()).optional(),
});

const ScanActionResourceTypeSchema = z.object({
  MalwareScanner: z.enum(["GUARDDUTY"]).optional(),
  ScanMode: z.enum(["FULL_SCAN", "INCREMENTAL_SCAN"]).optional(),
});

const LifecycleResourceTypeSchema = z.object({
  MoveToColdStorageAfterDays: z.number().optional(),
  DeleteAfterDays: z.number().optional(),
  OptInToArchiveForSupportedResources: z.boolean().optional(),
});

const CopyActionResourceTypeSchema = z.object({
  Lifecycle: LifecycleResourceTypeSchema.optional(),
  DestinationBackupVaultArn: z.string(),
});

const BackupRuleResourceTypeSchema = z.object({
  RuleName: z.string(),
  TargetBackupVault: z.string(),
  TargetLogicallyAirGappedBackupVaultArn: z.string().optional(),
  StartWindowMinutes: z.number().optional(),
  CompletionWindowMinutes: z.number().optional(),
  ScheduleExpression: z.string().optional(),
  ScheduleExpressionTimezone: z.string().optional(),
  IndexActions: z.array(IndexActionsResourceTypeSchema).optional(),
  ScanActions: z.array(ScanActionResourceTypeSchema).optional(),
  RecoveryPointTags: z.record(z.string(), z.string()).optional(),
  CopyActions: z.array(CopyActionResourceTypeSchema).optional(),
  Lifecycle: LifecycleResourceTypeSchema.optional(),
  EnableContinuousBackup: z.boolean().optional(),
});

const ScanSettingResourceTypeSchema = z.object({
  MalwareScanner: z.enum(["GUARDDUTY"]).optional(),
  ResourceTypes: z.array(z.string()).optional(),
  ScannerRoleArn: z.string().optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  BackupPlan: z.object({
    BackupPlanName: z.string(),
    AdvancedBackupSettings: z.array(AdvancedBackupSettingResourceTypeSchema)
      .optional(),
    BackupPlanRule: z.array(BackupRuleResourceTypeSchema),
    ScanSettings: z.array(ScanSettingResourceTypeSchema).optional(),
  }),
  BackupPlanTags: z.record(z.string(), z.string()).optional(),
});

const StateSchema = z.object({
  BackupPlan: z.object({
    BackupPlanName: z.string(),
    AdvancedBackupSettings: z.array(AdvancedBackupSettingResourceTypeSchema),
    BackupPlanRule: z.array(BackupRuleResourceTypeSchema),
    ScanSettings: z.array(ScanSettingResourceTypeSchema),
  }).optional(),
  BackupPlanTags: z.record(z.string(), z.unknown()).optional(),
  BackupPlanArn: z.string().optional(),
  BackupPlanId: z.string(),
  VersionId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  BackupPlan: z.object({
    BackupPlanName: z.string().optional(),
    AdvancedBackupSettings: z.array(AdvancedBackupSettingResourceTypeSchema)
      .optional(),
    BackupPlanRule: z.array(BackupRuleResourceTypeSchema).optional(),
    ScanSettings: z.array(ScanSettingResourceTypeSchema).optional(),
  }).optional(),
  BackupPlanTags: z.record(z.string(), z.string()).optional(),
});

/** Swamp extension model for Backup BackupPlan. Registered at `@swamp/aws/backup/backup-plan`. */
export const model = {
  type: "@swamp/aws/backup/backup-plan",
  version: "2026.05.27.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Backup BackupPlan resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Backup BackupPlan",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Backup::BackupPlan",
          desiredState,
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
      description: "Get a Backup BackupPlan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Backup BackupPlan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Backup::BackupPlan",
          args.identifier,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a Backup BackupPlan",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.BackupPlanId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Backup::BackupPlan",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Backup::BackupPlan",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a Backup BackupPlan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Backup BackupPlan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Backup::BackupPlan",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync Backup BackupPlan state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.BackupPlanId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Backup::BackupPlan",
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
