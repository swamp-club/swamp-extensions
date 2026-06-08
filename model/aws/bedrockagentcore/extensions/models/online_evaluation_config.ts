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

// Auto-generated extension model for @swamp/aws/bedrockagentcore/online-evaluation-config
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore OnlineEvaluationConfig (AWS::BedrockAgentCore::OnlineEvaluationConfig).
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

const CloudWatchLogsInputConfigSchema = z.object({
  LogGroupNames: z.array(
    z.string().min(1).max(512).regex(new RegExp("^[.\\-_/#A-Za-z0-9]+$")),
  ).describe(
    "The list of CloudWatch log group names to monitor for agent traces.",
  ),
  ServiceNames: z.array(
    z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9._-]+$")),
  ).describe(
    "The list of service names to filter traces within the specified log groups.",
  ),
});

const EvaluatorReferenceSchema = z.object({
  EvaluatorId: z.string().regex(
    new RegExp(
      "^(Builtin\\.[a-zA-Z0-9_-]+|[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10})$",
    ),
  ).describe("The unique identifier of the evaluator."),
});

const SamplingConfigSchema = z.object({
  SamplingPercentage: z.number().min(0.01).max(100).describe(
    "The percentage of agent traces to sample for evaluation.",
  ),
});

const FilterValueSchema = z.object({
  StringValue: z.string().min(1).max(1024).describe(
    "The string value for text-based filtering.",
  ).optional(),
  DoubleValue: z.number().describe("The numeric value for numerical filtering.")
    .optional(),
  BooleanValue: z.boolean().describe(
    "The boolean value for true/false filtering conditions.",
  ).optional(),
});

const FilterSchema = z.object({
  Key: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9._-]+$"))
    .describe(
      "The key or field name to filter on within the agent trace data.",
    ),
  Operator: z.enum([
    "Equals",
    "NotEquals",
    "GreaterThan",
    "LessThan",
    "GreaterThanOrEqual",
    "LessThanOrEqual",
    "Contains",
    "NotContains",
  ]).describe("The comparison operator to use for filtering."),
  Value: FilterValueSchema.describe("The value used in filter comparisons."),
});

const SessionConfigSchema = z.object({
  SessionTimeoutMinutes: z.number().int().min(1).max(1440).describe(
    "The number of minutes of inactivity after which an agent session is considered complete.",
  ),
});

const CloudWatchOutputConfigSchema = z.object({
  LogGroupName: z.string().describe(
    "The CloudWatch log group name for evaluation results.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(0).max(256),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  OnlineEvaluationConfigName: z.string().regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"),
  ).describe(
    "The name of the online evaluation configuration. Must be unique within your account.",
  ),
  Description: z.string().min(1).max(200).describe(
    "The description of the online evaluation configuration.",
  ).optional(),
  DataSourceConfig: z.object({
    CloudWatchLogs: CloudWatchLogsInputConfigSchema.describe(
      "The configuration for reading agent traces from CloudWatch logs.",
    ),
  }).describe(
    "The data source configuration that specifies CloudWatch log groups and service names to monitor.",
  ),
  EvaluationExecutionRoleArn: z.string().min(1).max(2048).regex(
    new RegExp("^arn:aws(-[^:]+)?:iam::([0-9]{12})?:role/.+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role that grants permissions for evaluation.",
  ),
  Evaluators: z.array(EvaluatorReferenceSchema).describe(
    "The list of evaluators to apply during online evaluation.",
  ),
  Rule: z.object({
    SamplingConfig: SamplingConfigSchema.describe(
      "The configuration that controls what percentage of agent traces are sampled for evaluation.",
    ),
    Filters: z.array(FilterSchema).describe(
      "The list of filters that determine which agent traces should be included in the evaluation.",
    ).optional(),
    SessionConfig: SessionConfigSchema.describe(
      "The configuration that defines how agent sessions are detected.",
    ).optional(),
  }).describe(
    "The evaluation rule that defines sampling configuration, filters, and session detection settings.",
  ),
  ExecutionStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "The execution status indicating whether the online evaluation is currently running.",
  ).optional(),
  OutputConfig: z.object({
    CloudWatchConfig: CloudWatchOutputConfigSchema.describe(
      "The CloudWatch configuration for writing evaluation results.",
    ).optional(),
  }).describe(
    "The configuration that specifies where evaluation results should be written.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to assign to the online evaluation configuration.",
  ).optional(),
});

const StateSchema = z.object({
  OnlineEvaluationConfigId: z.string().optional(),
  OnlineEvaluationConfigArn: z.string(),
  OnlineEvaluationConfigName: z.string().optional(),
  Description: z.string().optional(),
  DataSourceConfig: z.object({
    CloudWatchLogs: CloudWatchLogsInputConfigSchema,
  }).optional(),
  EvaluationExecutionRoleArn: z.string().optional(),
  Evaluators: z.array(EvaluatorReferenceSchema).optional(),
  Rule: z.object({
    SamplingConfig: SamplingConfigSchema,
    Filters: z.array(FilterSchema),
    SessionConfig: SessionConfigSchema,
  }).optional(),
  Status: z.string().optional(),
  ExecutionStatus: z.string().optional(),
  OutputConfig: z.object({
    CloudWatchConfig: CloudWatchOutputConfigSchema,
  }).optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  OnlineEvaluationConfigName: z.string().regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$"),
  ).describe(
    "The name of the online evaluation configuration. Must be unique within your account.",
  ).optional(),
  Description: z.string().min(1).max(200).describe(
    "The description of the online evaluation configuration.",
  ).optional(),
  DataSourceConfig: z.object({
    CloudWatchLogs: CloudWatchLogsInputConfigSchema.describe(
      "The configuration for reading agent traces from CloudWatch logs.",
    ).optional(),
  }).describe(
    "The data source configuration that specifies CloudWatch log groups and service names to monitor.",
  ).optional(),
  EvaluationExecutionRoleArn: z.string().min(1).max(2048).regex(
    new RegExp("^arn:aws(-[^:]+)?:iam::([0-9]{12})?:role/.+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM role that grants permissions for evaluation.",
  ).optional(),
  Evaluators: z.array(EvaluatorReferenceSchema).describe(
    "The list of evaluators to apply during online evaluation.",
  ).optional(),
  Rule: z.object({
    SamplingConfig: SamplingConfigSchema.describe(
      "The configuration that controls what percentage of agent traces are sampled for evaluation.",
    ).optional(),
    Filters: z.array(FilterSchema).describe(
      "The list of filters that determine which agent traces should be included in the evaluation.",
    ).optional(),
    SessionConfig: SessionConfigSchema.describe(
      "The configuration that defines how agent sessions are detected.",
    ).optional(),
  }).describe(
    "The evaluation rule that defines sampling configuration, filters, and session detection settings.",
  ).optional(),
  ExecutionStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "The execution status indicating whether the online evaluation is currently running.",
  ).optional(),
  OutputConfig: z.object({
    CloudWatchConfig: CloudWatchOutputConfigSchema.describe(
      "The CloudWatch configuration for writing evaluation results.",
    ).optional(),
  }).describe(
    "The configuration that specifies where evaluation results should be written.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to assign to the online evaluation configuration.",
  ).optional(),
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

/** Swamp extension model for BedrockAgentCore OnlineEvaluationConfig. Registered at `@swamp/aws/bedrockagentcore/online-evaluation-config`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/online-evaluation-config",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
      description: "Added: ExecutionStatus",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore OnlineEvaluationConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore OnlineEvaluationConfig",
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
          "AWS::BedrockAgentCore::OnlineEvaluationConfig",
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
      description: "Get a BedrockAgentCore OnlineEvaluationConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore OnlineEvaluationConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BedrockAgentCore::OnlineEvaluationConfig",
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
      description: "Update a BedrockAgentCore OnlineEvaluationConfig",
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
        const identifier = existing.OnlineEvaluationConfigArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::OnlineEvaluationConfig",
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
          "AWS::BedrockAgentCore::OnlineEvaluationConfig",
          identifier,
          currentState,
          desiredState,
          ["OnlineEvaluationConfigName"],
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
      description: "Delete a BedrockAgentCore OnlineEvaluationConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore OnlineEvaluationConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::OnlineEvaluationConfig",
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
      description:
        "Sync BedrockAgentCore OnlineEvaluationConfig state from AWS",
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
        const identifier = existing.OnlineEvaluationConfigArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::OnlineEvaluationConfig",
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
