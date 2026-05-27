// Auto-generated extension model for @swamp/aws/cloudformation/stack
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFormation Stack (AWS::CloudFormation::Stack).
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

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Capabilities: z.array(
    z.enum([
      "CAPABILITY_IAM",
      "CAPABILITY_NAMED_IAM",
      "CAPABILITY_AUTO_EXPAND",
    ]),
  ).optional(),
  RoleARN: z.string().optional(),
  Description: z.string().min(1).max(1024).optional(),
  DisableRollback: z.boolean().optional(),
  EnableTerminationProtection: z.boolean().optional(),
  NotificationARNs: z.array(z.string()).optional(),
  Parameters: z.record(z.string(), z.string()).optional(),
  StackName: z.string(),
  StackPolicyBody: z.record(z.string(), z.unknown()).optional(),
  StackPolicyURL: z.string().optional(),
  StackStatusReason: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TemplateBody: z.record(z.string(), z.unknown()).optional(),
  TemplateURL: z.string().min(1).max(1024).optional(),
  TimeoutInMinutes: z.number().int().min(1).optional(),
});

const StateSchema = z.object({
  Capabilities: z.array(z.string()).optional(),
  RoleARN: z.string().optional(),
  Outputs: z.array(z.object({
    Description: z.string(),
    ExportName: z.string(),
    OutputKey: z.string(),
    OutputValue: z.string(),
  })).optional(),
  Description: z.string().optional(),
  DisableRollback: z.boolean().optional(),
  EnableTerminationProtection: z.boolean().optional(),
  NotificationARNs: z.array(z.string()).optional(),
  Parameters: z.record(z.string(), z.unknown()).optional(),
  ParentId: z.string().optional(),
  RootId: z.string().optional(),
  ChangeSetId: z.string().optional(),
  StackName: z.string().optional(),
  StackId: z.string(),
  StackPolicyBody: z.record(z.string(), z.unknown()).optional(),
  StackPolicyURL: z.string().optional(),
  StackStatus: z.string().optional(),
  StackStatusReason: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TemplateBody: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  TemplateURL: z.string().optional(),
  TimeoutInMinutes: z.number().optional(),
  LastUpdateTime: z.string().optional(),
  CreationTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Capabilities: z.array(
    z.enum([
      "CAPABILITY_IAM",
      "CAPABILITY_NAMED_IAM",
      "CAPABILITY_AUTO_EXPAND",
    ]),
  ).optional(),
  RoleARN: z.string().optional(),
  Description: z.string().min(1).max(1024).optional(),
  DisableRollback: z.boolean().optional(),
  EnableTerminationProtection: z.boolean().optional(),
  NotificationARNs: z.array(z.string()).optional(),
  Parameters: z.record(z.string(), z.string()).optional(),
  StackName: z.string().optional(),
  StackPolicyBody: z.record(z.string(), z.unknown()).optional(),
  StackPolicyURL: z.string().optional(),
  StackStatusReason: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TemplateBody: z.record(z.string(), z.unknown()).optional(),
  TemplateURL: z.string().min(1).max(1024).optional(),
  TimeoutInMinutes: z.number().int().min(1).optional(),
});

/** Swamp extension model for CloudFormation Stack. Registered at `@swamp/aws/cloudformation/stack`. */
export const model = {
  type: "@swamp/aws/cloudformation/stack",
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
      toVersion: "2026.05.19.1",
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
      description: "CloudFormation Stack resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFormation Stack",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CloudFormation::Stack",
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
      description: "Get a CloudFormation Stack",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation Stack",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::CloudFormation::Stack",
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
      description: "Update a CloudFormation Stack",
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
        const identifier = existing.StackId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudFormation::Stack",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CloudFormation::Stack",
          identifier,
          currentState,
          desiredState,
          ["StackName"],
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
      description: "Delete a CloudFormation Stack",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation Stack",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::CloudFormation::Stack",
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
      description: "Sync CloudFormation Stack state from AWS",
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
        const identifier = existing.StackId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudFormation::Stack",
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
