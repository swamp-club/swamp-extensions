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

// Auto-generated extension model for @swamp/aws/cloudwatch/log-alarm
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudWatch LogAlarm (AWS::CloudWatch::LogAlarm).
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

const ScheduleConfigurationSchema = z.object({
  ScheduleExpression: z.string().describe(
    "The expression that defines when the scheduled query runs, e.g. rate(1 minute).",
  ),
  StartTimeOffset: z.number().int().describe(
    "The number of seconds into the past to start the query window.",
  ).optional(),
  EndTimeOffset: z.number().int().describe(
    "The number of seconds into the past to end the query window.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A unique identifier for the tag. The combination of tag keys and values can help you organize and categorize your resources.",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the specified tag key.",
  ),
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
  AlarmName: z.string().min(1).max(255).describe("The name of the log alarm.")
    .optional(),
  AlarmDescription: z.string().describe("The description of the log alarm.")
    .optional(),
  ActionsEnabled: z.boolean().describe(
    "Indicates whether actions should be executed during any changes to the alarm state. The default is TRUE.",
  ).optional(),
  OKActions: z.array(z.string()).describe(
    "The actions to execute when this alarm transitions to the OK state from any other state.",
  ).optional(),
  AlarmActions: z.array(z.string()).describe(
    "The list of actions to execute when this alarm transitions into an ALARM state from any other state.",
  ).optional(),
  InsufficientDataActions: z.array(z.string()).describe(
    "The actions to execute when this alarm transitions to the INSUFFICIENT_DATA state from any other state.",
  ).optional(),
  Threshold: z.number().describe(
    "The value to compare against the results of the scheduled query evaluation.",
  ),
  ComparisonOperator: z.string().describe(
    "The arithmetic operation to use when comparing the specified threshold and the query results. Valid values are GreaterThanOrEqualToThreshold, GreaterThanThreshold, LessThanThreshold, and LessThanOrEqualToThreshold.",
  ),
  QueryResultsToEvaluate: z.number().int().describe(
    "The number of query results over which data is compared to the specified threshold.",
  ),
  QueryResultsToAlarm: z.number().int().describe(
    "The number of query results that must be breaching to trigger the alarm.",
  ),
  TreatMissingData: z.string().describe(
    "Sets how this alarm is to handle missing data points. Valid values are breaching, notBreaching, ignore, and missing.",
  ).optional(),
  ScheduledQueryConfiguration: z.object({
    QueryString: z.string().describe(
      "The query string to execute against the specified log groups.",
    ),
    AggregationExpression: z.string().describe(
      "The aggregation expression for the scheduled query, e.g. count(*) or avg(latency) by host.",
    ),
    LogGroupIdentifiers: z.array(z.string()).describe(
      "The log groups to query.",
    ),
    ScheduledQueryRoleARN: z.string().describe(
      "The ARN of the IAM role that grants permissions to execute the scheduled query.",
    ),
    ScheduleConfiguration: ScheduleConfigurationSchema.describe(
      "The schedule configuration.",
    ),
  }).describe("The scheduled query configuration for the log alarm."),
  ActionLogLineCount: z.number().int().min(0).max(50).describe(
    "The number of log lines to include in alarm notifications. Valid values are 0 to 50.",
  ).optional(),
  ActionLogLineRoleArn: z.string().describe(
    "The ARN of the IAM role that grants CloudWatch permissions to fetch log lines for alarm notifications. Required when ActionLogLineCount is greater than 0.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to associate with the log alarm.",
  ).optional(),
});

const StateSchema = z.object({
  AlarmName: z.string(),
  AlarmDescription: z.string().optional(),
  ActionsEnabled: z.boolean().optional(),
  OKActions: z.array(z.string()).optional(),
  AlarmActions: z.array(z.string()).optional(),
  InsufficientDataActions: z.array(z.string()).optional(),
  Threshold: z.number().optional(),
  ComparisonOperator: z.string().optional(),
  QueryResultsToEvaluate: z.number().optional(),
  QueryResultsToAlarm: z.number().optional(),
  TreatMissingData: z.string().optional(),
  ScheduledQueryConfiguration: z.object({
    QueryString: z.string(),
    AggregationExpression: z.string(),
    LogGroupIdentifiers: z.array(z.string()),
    ScheduledQueryRoleARN: z.string(),
    ScheduleConfiguration: ScheduleConfigurationSchema,
  }).optional(),
  ActionLogLineCount: z.number().optional(),
  ActionLogLineRoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Arn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AlarmName: z.string().min(1).max(255).describe("The name of the log alarm.")
    .optional(),
  AlarmDescription: z.string().describe("The description of the log alarm.")
    .optional(),
  ActionsEnabled: z.boolean().describe(
    "Indicates whether actions should be executed during any changes to the alarm state. The default is TRUE.",
  ).optional(),
  OKActions: z.array(z.string()).describe(
    "The actions to execute when this alarm transitions to the OK state from any other state.",
  ).optional(),
  AlarmActions: z.array(z.string()).describe(
    "The list of actions to execute when this alarm transitions into an ALARM state from any other state.",
  ).optional(),
  InsufficientDataActions: z.array(z.string()).describe(
    "The actions to execute when this alarm transitions to the INSUFFICIENT_DATA state from any other state.",
  ).optional(),
  Threshold: z.number().describe(
    "The value to compare against the results of the scheduled query evaluation.",
  ).optional(),
  ComparisonOperator: z.string().describe(
    "The arithmetic operation to use when comparing the specified threshold and the query results. Valid values are GreaterThanOrEqualToThreshold, GreaterThanThreshold, LessThanThreshold, and LessThanOrEqualToThreshold.",
  ).optional(),
  QueryResultsToEvaluate: z.number().int().describe(
    "The number of query results over which data is compared to the specified threshold.",
  ).optional(),
  QueryResultsToAlarm: z.number().int().describe(
    "The number of query results that must be breaching to trigger the alarm.",
  ).optional(),
  TreatMissingData: z.string().describe(
    "Sets how this alarm is to handle missing data points. Valid values are breaching, notBreaching, ignore, and missing.",
  ).optional(),
  ScheduledQueryConfiguration: z.object({
    QueryString: z.string().describe(
      "The query string to execute against the specified log groups.",
    ).optional(),
    AggregationExpression: z.string().describe(
      "The aggregation expression for the scheduled query, e.g. count(*) or avg(latency) by host.",
    ).optional(),
    LogGroupIdentifiers: z.array(z.string()).describe(
      "The log groups to query.",
    ).optional(),
    ScheduledQueryRoleARN: z.string().describe(
      "The ARN of the IAM role that grants permissions to execute the scheduled query.",
    ).optional(),
    ScheduleConfiguration: ScheduleConfigurationSchema.describe(
      "The schedule configuration.",
    ).optional(),
  }).describe("The scheduled query configuration for the log alarm.")
    .optional(),
  ActionLogLineCount: z.number().int().min(0).max(50).describe(
    "The number of log lines to include in alarm notifications. Valid values are 0 to 50.",
  ).optional(),
  ActionLogLineRoleArn: z.string().describe(
    "The ARN of the IAM role that grants CloudWatch permissions to fetch log lines for alarm notifications. Required when ActionLogLineCount is greater than 0.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to associate with the log alarm.",
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

/** Swamp extension model for CloudWatch LogAlarm. Registered at `@swamp/aws/cloudwatch/log-alarm`. */
export const model = {
  type: "@swamp/aws/cloudwatch/log-alarm",
  version: "2026.06.16.1",
  upgrades: [
    {
      toVersion: "2026.06.16.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudWatch LogAlarm resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudWatch LogAlarm",
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
          "AWS::CloudWatch::LogAlarm",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.AlarmName ?? g.AlarmName)?.toString() ?? "current").replace(
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
      description: "Get a CloudWatch LogAlarm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch LogAlarm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudWatch::LogAlarm",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.AlarmName ?? context.globalArgs.AlarmName)?.toString() ??
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
      description: "Update a CloudWatch LogAlarm",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.AlarmName?.toString() ?? "current").replace(
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
        const identifier = existing.AlarmName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudWatch::LogAlarm",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CloudWatch::LogAlarm",
          identifier,
          currentState,
          desiredState,
          ["AlarmName"],
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
      description: "Delete a CloudWatch LogAlarm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch LogAlarm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudWatch::LogAlarm",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.AlarmName?.toString() ?? args.identifier).replace(
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
      description: "Sync CloudWatch LogAlarm state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.AlarmName?.toString() ?? "current").replace(
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
        const identifier = existing.AlarmName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudWatch::LogAlarm",
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
