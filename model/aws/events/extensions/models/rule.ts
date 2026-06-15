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

// Auto-generated extension model for @swamp/aws/events/rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Events Rule (AWS::Events::Rule).
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
import type { AwsCredentials } from "./_lib/aws.ts";

const HttpParametersSchema = z.object({
  PathParameterValues: z.array(z.string()).optional(),
  HeaderParameters: z.record(z.string(), z.string()).optional(),
  QueryStringParameters: z.record(z.string(), z.string()).optional(),
});

const DeadLetterConfigSchema = z.object({
  Arn: z.string().optional(),
});

const RunCommandTargetSchema = z.object({
  Values: z.array(z.string()),
  Key: z.string(),
});

const RunCommandParametersSchema = z.object({
  RunCommandTargets: z.array(RunCommandTargetSchema),
});

const InputTransformerSchema = z.object({
  InputPathsMap: z.record(z.string(), z.string()).optional(),
  InputTemplate: z.string(),
});

const KinesisParametersSchema = z.object({
  PartitionKeyPath: z.string(),
});

const RedshiftDataParametersSchema = z.object({
  StatementName: z.string().optional(),
  Sqls: z.array(z.string()).optional(),
  Database: z.string(),
  SecretManagerArn: z.string().optional(),
  DbUser: z.string().optional(),
  Sql: z.string().optional(),
  WithEvent: z.boolean().optional(),
});

const AppSyncParametersSchema = z.object({
  GraphQLOperation: z.string(),
});

const SqsParametersSchema = z.object({
  MessageGroupId: z.string(),
});

const PlacementConstraintSchema = z.object({
  Type: z.string().optional(),
  Expression: z.string().optional(),
});

const PlacementStrategySchema = z.object({
  Field: z.string().optional(),
  Type: z.string().optional(),
});

const CapacityProviderStrategyItemSchema = z.object({
  CapacityProvider: z.string(),
  Base: z.number().int().optional(),
  Weight: z.number().int().optional(),
});

const TagSchema = z.object({
  Value: z.string().optional(),
  Key: z.string().optional(),
});

const AwsVpcConfigurationSchema = z.object({
  SecurityGroups: z.array(z.string()).optional(),
  Subnets: z.array(z.string()),
  AssignPublicIp: z.string().optional(),
});

const NetworkConfigurationSchema = z.object({
  AwsVpcConfiguration: AwsVpcConfigurationSchema.optional(),
});

const EcsParametersSchema = z.object({
  PlatformVersion: z.string().optional(),
  Group: z.string().optional(),
  EnableECSManagedTags: z.boolean().optional(),
  EnableExecuteCommand: z.boolean().optional(),
  PlacementConstraints: z.array(PlacementConstraintSchema).optional(),
  PropagateTags: z.string().optional(),
  TaskCount: z.number().int().optional(),
  PlacementStrategies: z.array(PlacementStrategySchema).optional(),
  CapacityProviderStrategy: z.array(CapacityProviderStrategyItemSchema)
    .optional(),
  LaunchType: z.string().optional(),
  ReferenceId: z.string().optional(),
  TagList: z.array(TagSchema).optional(),
  NetworkConfiguration: NetworkConfigurationSchema.optional(),
  TaskDefinitionArn: z.string(),
});

const BatchArrayPropertiesSchema = z.object({
  Size: z.number().int().optional(),
});

const BatchRetryStrategySchema = z.object({
  Attempts: z.number().int().optional(),
});

const BatchParametersSchema = z.object({
  ArrayProperties: BatchArrayPropertiesSchema.optional(),
  JobName: z.string(),
  RetryStrategy: BatchRetryStrategySchema.optional(),
  JobDefinition: z.string(),
});

const SageMakerPipelineParameterSchema = z.object({
  Value: z.string(),
  Name: z.string(),
});

const SageMakerPipelineParametersSchema = z.object({
  PipelineParameterList: z.array(SageMakerPipelineParameterSchema).optional(),
});

const RetryPolicySchema = z.object({
  MaximumRetryAttempts: z.number().int().optional(),
  MaximumEventAgeInSeconds: z.number().int().optional(),
});

const TargetSchema = z.object({
  InputPath: z.string().optional(),
  HttpParameters: HttpParametersSchema.optional(),
  DeadLetterConfig: DeadLetterConfigSchema.optional(),
  RunCommandParameters: RunCommandParametersSchema.optional(),
  InputTransformer: InputTransformerSchema.optional(),
  KinesisParameters: KinesisParametersSchema.optional(),
  RoleArn: z.string().optional(),
  RedshiftDataParameters: RedshiftDataParametersSchema.optional(),
  AppSyncParameters: AppSyncParametersSchema.optional(),
  Input: z.string().optional(),
  SqsParameters: SqsParametersSchema.optional(),
  EcsParameters: EcsParametersSchema.optional(),
  BatchParameters: BatchParametersSchema.optional(),
  Id: z.string(),
  Arn: z.string(),
  SageMakerPipelineParameters: SageMakerPipelineParametersSchema.optional(),
  RetryPolicy: RetryPolicySchema.optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  EventBusName: z.string().describe(
    "The name or ARN of the event bus associated with the rule. If you omit this, the default event bus is used.",
  ).optional(),
  EventPattern: z.record(z.string(), z.unknown()).describe(
    "The event pattern of the rule. For more information, see Events and Event Patterns in the Amazon EventBridge User Guide.",
  ).optional(),
  ScheduleExpression: z.string().describe(
    'The scheduling expression. For example, "cron(0 20 * *? *)", "rate(5 minutes)". For more information, see Creating an Amazon EventBridge rule that runs on a schedule.',
  ).optional(),
  Description: z.string().describe("The description of the rule.").optional(),
  State: z.enum([
    "DISABLED",
    "ENABLED",
    "ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS",
  ]).describe("The state of the rule.").optional(),
  Targets: z.array(TargetSchema).describe(
    "Adds the specified targets to the specified rule, or updates the targets if they are already associated with the rule. Targets are the resources that are invoked when a rule is triggered.",
  ).optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the role that is used for target invocation.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the event rule.")
    .optional(),
  Name: z.string().describe("The name of the rule.").optional(),
});

const StateSchema = z.object({
  EventBusName: z.string().optional(),
  EventPattern: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  ScheduleExpression: z.string().optional(),
  Description: z.string().optional(),
  State: z.string().optional(),
  Targets: z.array(TargetSchema).optional(),
  Arn: z.string(),
  RoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  EventBusName: z.string().describe(
    "The name or ARN of the event bus associated with the rule. If you omit this, the default event bus is used.",
  ).optional(),
  EventPattern: z.record(z.string(), z.unknown()).describe(
    "The event pattern of the rule. For more information, see Events and Event Patterns in the Amazon EventBridge User Guide.",
  ).optional(),
  ScheduleExpression: z.string().describe(
    'The scheduling expression. For example, "cron(0 20 * *? *)", "rate(5 minutes)". For more information, see Creating an Amazon EventBridge rule that runs on a schedule.',
  ).optional(),
  Description: z.string().describe("The description of the rule.").optional(),
  State: z.enum([
    "DISABLED",
    "ENABLED",
    "ENABLED_WITH_ALL_CLOUDTRAIL_MANAGEMENT_EVENTS",
  ]).describe("The state of the rule.").optional(),
  Targets: z.array(TargetSchema).describe(
    "Adds the specified targets to the specified rule, or updates the targets if they are already associated with the rule. Targets are the resources that are invoked when a rule is triggered.",
  ).optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the role that is used for target invocation.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the event rule.")
    .optional(),
  Name: z.string().describe("The name of the rule.").optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for Events Rule. Registered at `@swamp/aws/events/rule`. */
export const model = {
  type: "@swamp/aws/events/rule",
  version: "2026.06.15.1",
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
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Events Rule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Events Rule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Events::Rule",
          desiredState,
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
      description: "Get a Events Rule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Events Rule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Events::Rule",
          args.identifier,
          credentials,
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
      description: "Update a Events Rule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Events::Rule",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Events::Rule",
          identifier,
          currentState,
          desiredState,
          ["Name"],
          credentials,
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
      description: "Delete a Events Rule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Events Rule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Events::Rule",
          args.identifier,
          credentials,
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
      description: "Sync Events Rule state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Events::Rule",
            identifier,
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
