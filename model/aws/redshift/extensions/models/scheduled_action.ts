// Auto-generated extension model for @swamp/aws/redshift/scheduled-action
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Redshift ScheduledAction (AWS::Redshift::ScheduledAction).
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
  ScheduledActionDescription: z.string().describe(
    "The description of the scheduled action.",
  ).optional(),
  ScheduledActionName: z.string().describe(
    "The name of the scheduled action. The name must be unique within an account.",
  ),
  EndTime: z.string().describe(
    "The end time in UTC of the scheduled action. After this time, the scheduled action does not trigger.",
  ).optional(),
  Schedule: z.string().describe("The schedule in `at()` or `cron()` format.")
    .optional(),
  IamRole: z.string().describe(
    "The IAM role to assume to run the target action.",
  ).optional(),
  StartTime: z.string().describe(
    "The start time in UTC of the scheduled action. Before this time, the scheduled action does not trigger.",
  ).optional(),
  Enable: z.boolean().describe(
    "If true, the schedule is enabled. If false, the scheduled action does not trigger.",
  ).optional(),
  TargetAction: z.record(z.string(), z.unknown()).describe(
    "A JSON format string of the Amazon Redshift API operation with input parameters.",
  ).optional(),
});

const StateSchema = z.object({
  ScheduledActionDescription: z.string().optional(),
  ScheduledActionName: z.string(),
  EndTime: z.string().optional(),
  State: z.string().optional(),
  Schedule: z.string().optional(),
  IamRole: z.string().optional(),
  StartTime: z.string().optional(),
  Enable: z.boolean().optional(),
  TargetAction: z.record(z.string(), z.unknown()).optional(),
  NextInvocations: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  ScheduledActionDescription: z.string().describe(
    "The description of the scheduled action.",
  ).optional(),
  ScheduledActionName: z.string().describe(
    "The name of the scheduled action. The name must be unique within an account.",
  ).optional(),
  EndTime: z.string().describe(
    "The end time in UTC of the scheduled action. After this time, the scheduled action does not trigger.",
  ).optional(),
  Schedule: z.string().describe("The schedule in `at()` or `cron()` format.")
    .optional(),
  IamRole: z.string().describe(
    "The IAM role to assume to run the target action.",
  ).optional(),
  StartTime: z.string().describe(
    "The start time in UTC of the scheduled action. Before this time, the scheduled action does not trigger.",
  ).optional(),
  Enable: z.boolean().describe(
    "If true, the schedule is enabled. If false, the scheduled action does not trigger.",
  ).optional(),
  TargetAction: z.record(z.string(), z.unknown()).describe(
    "A JSON format string of the Amazon Redshift API operation with input parameters.",
  ).optional(),
});

/** Swamp extension model for Redshift ScheduledAction. Registered at `@swamp/aws/redshift/scheduled-action`. */
export const model = {
  type: "@swamp/aws/redshift/scheduled-action",
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
      description: "Redshift ScheduledAction resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Redshift ScheduledAction",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Redshift::ScheduledAction",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.ScheduledActionName ?? g.ScheduledActionName)?.toString() ??
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
      description: "Get a Redshift ScheduledAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift ScheduledAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Redshift::ScheduledAction",
          args.identifier,
        ) as StateData;
        const instanceName = ((result.ScheduledActionName ??
          context.globalArgs.ScheduledActionName)?.toString() ??
          args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
          .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Redshift ScheduledAction",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ScheduledActionName?.toString() ?? "current")
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
        const identifier = existing.ScheduledActionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Redshift::ScheduledAction",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Redshift::ScheduledAction",
          identifier,
          currentState,
          desiredState,
          ["ScheduledActionName"],
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
      description: "Delete a Redshift ScheduledAction",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Redshift ScheduledAction",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Redshift::ScheduledAction",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.ScheduledActionName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync Redshift ScheduledAction state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.ScheduledActionName?.toString() ?? "current")
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
        const identifier = existing.ScheduledActionName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Redshift::ScheduledAction",
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
