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

// Auto-generated extension model for @swamp/aws/scheduler/schedule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Scheduler Schedule (AWS::Scheduler::Schedule).
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

const RetryPolicySchema = z.object({
  MaximumEventAgeInSeconds: z.number().min(60).max(86400).describe(
    "The maximum amount of time, in seconds, to continue to make retry attempts.",
  ).optional(),
  MaximumRetryAttempts: z.number().min(0).max(185).describe(
    "The maximum number of retry attempts to make before the request fails. Retry attempts with exponential backoff continue until either the maximum number of attempts is made or until the duration of the MaximumEventAgeInSeconds is reached.",
  ).optional(),
});

const AwsVpcConfigurationSchema = z.object({
  Subnets: z.array(z.string().min(1).max(1000)).describe(
    "Specifies the subnets associated with the task. These subnets must all be in the same VPC. You can specify as many as 16 subnets.",
  ),
  SecurityGroups: z.array(z.string().min(1).max(1000)).describe(
    "Specifies the security groups associated with the task. These security groups must all be in the same VPC. You can specify as many as five security groups. If you do not specify a security group, the default security group for the VPC is used.",
  ).optional(),
  AssignPublicIp: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies whether the task's elastic network interface receives a public IP address. You can specify ENABLED only when LaunchType in EcsParameters is set to FARGATE.",
  ).optional(),
});

const NetworkConfigurationSchema = z.object({
  AwsvpcConfiguration: AwsVpcConfigurationSchema.describe(
    "This structure specifies the VPC subnets and security groups for the task, and whether a public IP address is to be used. This structure is relevant only for ECS tasks that use the awsvpc network mode.",
  ).optional(),
});

const CapacityProviderStrategyItemSchema = z.object({
  CapacityProvider: z.string().min(1).max(255).describe(
    "The short name of the capacity provider.",
  ),
  Weight: z.number().min(0).max(1000).describe(
    "The weight value designates the relative percentage of the total number of tasks launched that should use the specified capacity provider. The weight value is taken into consideration after the base value, if defined, is satisfied.",
  ).optional(),
  Base: z.number().min(0).max(100000).describe(
    "The base value designates how many tasks, at a minimum, to run on the specified capacity provider. Only one capacity provider in a capacity provider strategy can have a base defined. If no value is specified, the default value of 0 is used.",
  ).optional(),
});

const PlacementConstraintSchema = z.object({
  Type: z.enum(["distinctInstance", "memberOf"]).describe(
    "The type of constraint. Use distinctInstance to ensure that each task in a particular group is running on a different container instance. Use memberOf to restrict the selection to a group of valid candidates.",
  ).optional(),
  Expression: z.string().max(2000).describe(
    "A cluster query language expression to apply to the constraint. You cannot specify an expression if the constraint type is distinctInstance. To learn more, see Cluster Query Language in the Amazon Elastic Container Service Developer Guide.",
  ).optional(),
});

const PlacementStrategySchema = z.object({
  Type: z.enum(["random", "spread", "binpack"]).describe(
    "The type of placement strategy. The random placement strategy randomly places tasks on available candidates. The spread placement strategy spreads placement across available candidates evenly based on the field parameter. The binpack strategy places tasks on available candidates that have the least available amount of the resource that is specified with the field parameter. For example, if you binpack on memory, a task is placed on the instance with the least amount of remaining memory (but still enough to run the task).",
  ).optional(),
  Field: z.string().max(255).describe(
    "The field to apply the placement strategy against. For the spread placement strategy, valid values are instanceId (or host, which has the same effect), or any platform or custom attribute that is applied to a container instance, such as attribute:ecs.availability-zone. For the binpack placement strategy, valid values are cpu and memory. For the random placement strategy, this field is not used.",
  ).optional(),
});

const EcsParametersSchema = z.object({
  TaskDefinitionArn: z.string().min(1).max(1600).describe(
    "The ARN of the task definition to use if the event target is an Amazon ECS task.",
  ),
  TaskCount: z.number().min(1).max(10).describe(
    "The number of tasks to create based on TaskDefinition. The default is 1.",
  ).optional(),
  LaunchType: z.enum(["EC2", "FARGATE", "EXTERNAL"]).describe(
    "Specifies the launch type on which your task is running. The launch type that you specify here must match one of the launch type (compatibilities) of the target task. The FARGATE value is supported only in the Regions where AWS Fargate with Amazon ECS is supported. For more information, see AWS Fargate on Amazon ECS in the Amazon Elastic Container Service Developer Guide.",
  ).optional(),
  NetworkConfiguration: NetworkConfigurationSchema.describe(
    "This structure specifies the network configuration for an ECS task.",
  ).optional(),
  PlatformVersion: z.string().min(1).max(64).describe(
    "Specifies the platform version for the task. Specify only the numeric portion of the platform version, such as 1.1.0.",
  ).optional(),
  Group: z.string().min(1).max(255).describe(
    "Specifies an ECS task group for the task. The maximum length is 255 characters.",
  ).optional(),
  CapacityProviderStrategy: z.array(CapacityProviderStrategyItemSchema)
    .describe("The capacity provider strategy to use for the task.").optional(),
  EnableECSManagedTags: z.boolean().describe(
    "Specifies whether to enable Amazon ECS managed tags for the task. For more information, see Tagging Your Amazon ECS Resources in the Amazon Elastic Container Service Developer Guide.",
  ).optional(),
  EnableExecuteCommand: z.boolean().describe(
    "Whether or not to enable the execute command functionality for the containers in this task. If true, this enables execute command functionality on all containers in the task.",
  ).optional(),
  PlacementConstraints: z.array(PlacementConstraintSchema).describe(
    "An array of placement constraint objects to use for the task. You can specify up to 10 constraints per task (including constraints in the task definition and those specified at runtime).",
  ).optional(),
  PlacementStrategy: z.array(PlacementStrategySchema).describe(
    "The placement strategy objects to use for the task. You can specify a maximum of five strategy rules per task.",
  ).optional(),
  PropagateTags: z.enum(["TASK_DEFINITION"]).describe(
    "Specifies whether to propagate the tags from the task definition to the task. If no value is specified, the tags are not propagated. Tags can only be propagated to the task during task creation. To add tags to a task after task creation, use the TagResource API action.",
  ).optional(),
  ReferenceId: z.string().max(1024).describe(
    "The reference ID to use for the task.",
  ).optional(),
  Tags: z.array(z.record(z.string(), z.string().min(1).max(256))).describe(
    "The metadata that you apply to the task to help you categorize and organize them. Each tag consists of a key and an optional value, both of which you define. To learn more, see RunTask in the Amazon ECS API Reference.",
  ).optional(),
});

const EventBridgeParametersSchema = z.object({
  DetailType: z.string().min(1).max(128).describe(
    "Free-form string, with a maximum of 128 characters, used to decide what fields to expect in the event detail.",
  ),
  Source: z.string().min(1).max(256).regex(
    new RegExp(
      "^(?=[/\\.\\-_A-Za-z0-9]+)((?!aws\\.).*)|(\\$(\\.[\\w_-]+(\\[(\\d+|\\*)\\])*)*)$",
    ),
  ).describe("The source of the event."),
});

const KinesisParametersSchema = z.object({
  PartitionKey: z.string().min(1).max(256).describe(
    "The custom parameter used as the Kinesis partition key. For more information, see Amazon Kinesis Streams Key Concepts in the Amazon Kinesis Streams Developer Guide.",
  ),
});

const SageMakerPipelineParameterSchema = z.object({
  Name: z.string().min(1).max(256).regex(new RegExp("^[A-Za-z0-9\\-_]*$"))
    .describe(
      "Name of parameter to start execution of a SageMaker Model Building Pipeline.",
    ),
  Value: z.string().min(1).max(1024).describe(
    "Value of parameter to start execution of a SageMaker Model Building Pipeline.",
  ),
});

const SageMakerPipelineParametersSchema = z.object({
  PipelineParameterList: z.array(SageMakerPipelineParameterSchema).describe(
    "List of Parameter names and values for SageMaker Model Building Pipeline execution.",
  ).optional(),
});

const SqsParametersSchema = z.object({
  MessageGroupId: z.string().min(1).max(128).describe(
    "The FIFO message group ID to use as the target.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
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
  Description: z.string().min(0).max(512).describe(
    "The description of the schedule.",
  ).optional(),
  EndDate: z.string().describe(
    "The date, in UTC, before which the schedule can invoke its target. Depending on the schedule's recurrence expression, invocations might stop on, or before, the EndDate you specify.",
  ).optional(),
  FlexibleTimeWindow: z.object({
    Mode: z.enum(["OFF", "FLEXIBLE"]).describe(
      "Determines whether the schedule is executed within a flexible time window.",
    ),
    MaximumWindowInMinutes: z.number().min(1).max(1440).describe(
      "The maximum time window during which a schedule can be invoked.",
    ).optional(),
  }).describe(
    "Flexible time window allows configuration of a window within which a schedule can be invoked",
  ),
  GroupName: z.string().min(1).max(64).regex(new RegExp("^[0-9a-zA-Z-_.]+$"))
    .describe(
      "The name of the schedule group to associate with this schedule. If you omit this, the default schedule group is used.",
    ).optional(),
  KmsKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws[a-z-]*:kms:[a-z0-9\\-]+:\\d{12}:(key|alias)\\/[0-9a-zA-Z-_]*$",
    ),
  ).describe(
    "The ARN for a KMS Key that will be used to encrypt customer data.",
  ).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[0-9a-zA-Z-_.]+$"))
    .optional(),
  ScheduleExpression: z.string().min(1).max(256).describe(
    "The scheduling expression.",
  ),
  ScheduleExpressionTimezone: z.string().min(1).max(50).describe(
    "The timezone in which the scheduling expression is evaluated.",
  ).optional(),
  StartDate: z.string().describe(
    "The date, in UTC, after which the schedule can begin invoking its target. Depending on the schedule's recurrence expression, invocations might occur on, or after, the StartDate you specify.",
  ).optional(),
  State: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies whether the schedule is enabled or disabled.",
  ).optional(),
  Target: z.object({
    RoleArn: z.string().min(1).max(1600).regex(
      new RegExp("^arn:aws[a-z-]*:iam::\\d{12}:role\\/[\\w+=,.@\\/-]+$"),
    ).describe(
      "The Amazon Resource Name (ARN) of the IAM role to be used for this target when the schedule is triggered.",
    ),
    RetryPolicy: RetryPolicySchema.describe(
      "A RetryPolicy object that includes information about the retry policy settings.",
    ).optional(),
    Input: z.string().min(1).describe(
      "The text, or well-formed JSON, passed to the target. If you are configuring a templated Lambda, AWS Step Functions, or Amazon EventBridge target, the input must be a well-formed JSON. For all other target types, a JSON is not required. If you do not specify anything for this field, EventBridge Scheduler delivers a default notification to the target.",
    ).optional(),
    EcsParameters: EcsParametersSchema.describe(
      "The custom parameters to be used when the target is an Amazon ECS task.",
    ).optional(),
    EventBridgeParameters: EventBridgeParametersSchema.describe(
      "EventBridge PutEvent predefined target type.",
    ).optional(),
    KinesisParameters: KinesisParametersSchema.describe(
      "The custom parameter you can use to control the shard to which EventBridge Scheduler sends the event.",
    ).optional(),
    SageMakerPipelineParameters: SageMakerPipelineParametersSchema.describe(
      "These are custom parameters to use when the target is a SageMaker Model Building Pipeline that starts based on AWS EventBridge Scheduler schedules.",
    ).optional(),
    SqsParameters: SqsParametersSchema.describe(
      "Contains the message group ID to use when the target is a FIFO queue. If you specify an SQS FIFO queue as a target, the queue must have content-based deduplication enabled.",
    ).optional(),
  }).describe("The schedule target."),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Description: z.string().optional(),
  EndDate: z.string().optional(),
  FlexibleTimeWindow: z.object({
    Mode: z.string(),
    MaximumWindowInMinutes: z.number(),
  }).optional(),
  GroupName: z.string().optional(),
  KmsKeyArn: z.string().optional(),
  Name: z.string(),
  ScheduleExpression: z.string().optional(),
  ScheduleExpressionTimezone: z.string().optional(),
  StartDate: z.string().optional(),
  State: z.string().optional(),
  Target: z.object({
    Arn: z.string(),
    RoleArn: z.string(),
    DeadLetterConfig: z.object({
      Arn: z.string(),
    }),
    RetryPolicy: RetryPolicySchema,
    Input: z.string(),
    EcsParameters: EcsParametersSchema,
    EventBridgeParameters: EventBridgeParametersSchema,
    KinesisParameters: KinesisParametersSchema,
    SageMakerPipelineParameters: SageMakerPipelineParametersSchema,
    SqsParameters: SqsParametersSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(0).max(512).describe(
    "The description of the schedule.",
  ).optional(),
  EndDate: z.string().describe(
    "The date, in UTC, before which the schedule can invoke its target. Depending on the schedule's recurrence expression, invocations might stop on, or before, the EndDate you specify.",
  ).optional(),
  FlexibleTimeWindow: z.object({
    Mode: z.enum(["OFF", "FLEXIBLE"]).describe(
      "Determines whether the schedule is executed within a flexible time window.",
    ).optional(),
    MaximumWindowInMinutes: z.number().min(1).max(1440).describe(
      "The maximum time window during which a schedule can be invoked.",
    ).optional(),
  }).describe(
    "Flexible time window allows configuration of a window within which a schedule can be invoked",
  ).optional(),
  GroupName: z.string().min(1).max(64).regex(new RegExp("^[0-9a-zA-Z-_.]+$"))
    .describe(
      "The name of the schedule group to associate with this schedule. If you omit this, the default schedule group is used.",
    ).optional(),
  KmsKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws[a-z-]*:kms:[a-z0-9\\-]+:\\d{12}:(key|alias)\\/[0-9a-zA-Z-_]*$",
    ),
  ).describe(
    "The ARN for a KMS Key that will be used to encrypt customer data.",
  ).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[0-9a-zA-Z-_.]+$"))
    .optional(),
  ScheduleExpression: z.string().min(1).max(256).describe(
    "The scheduling expression.",
  ).optional(),
  ScheduleExpressionTimezone: z.string().min(1).max(50).describe(
    "The timezone in which the scheduling expression is evaluated.",
  ).optional(),
  StartDate: z.string().describe(
    "The date, in UTC, after which the schedule can begin invoking its target. Depending on the schedule's recurrence expression, invocations might occur on, or after, the StartDate you specify.",
  ).optional(),
  State: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies whether the schedule is enabled or disabled.",
  ).optional(),
  Target: z.object({
    RoleArn: z.string().min(1).max(1600).regex(
      new RegExp("^arn:aws[a-z-]*:iam::\\d{12}:role\\/[\\w+=,.@\\/-]+$"),
    ).describe(
      "The Amazon Resource Name (ARN) of the IAM role to be used for this target when the schedule is triggered.",
    ).optional(),
    RetryPolicy: RetryPolicySchema.describe(
      "A RetryPolicy object that includes information about the retry policy settings.",
    ).optional(),
    Input: z.string().min(1).describe(
      "The text, or well-formed JSON, passed to the target. If you are configuring a templated Lambda, AWS Step Functions, or Amazon EventBridge target, the input must be a well-formed JSON. For all other target types, a JSON is not required. If you do not specify anything for this field, EventBridge Scheduler delivers a default notification to the target.",
    ).optional(),
    EcsParameters: EcsParametersSchema.describe(
      "The custom parameters to be used when the target is an Amazon ECS task.",
    ).optional(),
    EventBridgeParameters: EventBridgeParametersSchema.describe(
      "EventBridge PutEvent predefined target type.",
    ).optional(),
    KinesisParameters: KinesisParametersSchema.describe(
      "The custom parameter you can use to control the shard to which EventBridge Scheduler sends the event.",
    ).optional(),
    SageMakerPipelineParameters: SageMakerPipelineParametersSchema.describe(
      "These are custom parameters to use when the target is a SageMaker Model Building Pipeline that starts based on AWS EventBridge Scheduler schedules.",
    ).optional(),
    SqsParameters: SqsParametersSchema.describe(
      "Contains the message group ID to use when the target is a FIFO queue. If you specify an SQS FIFO queue as a target, the queue must have content-based deduplication enabled.",
    ).optional(),
  }).describe("The schedule target.").optional(),
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

/** Swamp extension model for Scheduler Schedule. Registered at `@swamp/aws/scheduler/schedule`. */
export const model = {
  type: "@swamp/aws/scheduler/schedule",
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
      description: "Scheduler Schedule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Scheduler Schedule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Scheduler::Schedule",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a Scheduler Schedule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Scheduler Schedule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Scheduler::Schedule",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a Scheduler Schedule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Scheduler::Schedule",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Scheduler::Schedule",
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
      description: "Delete a Scheduler Schedule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Scheduler Schedule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Scheduler::Schedule",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync Scheduler Schedule state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Scheduler::Schedule",
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
