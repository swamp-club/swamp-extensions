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

// Auto-generated extension model for @swamp/aws/iot/security-profile
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoT SecurityProfile (AWS::IoT::SecurityProfile).
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

const MetricDimensionSchema = z.object({
  DimensionName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9:_-]+"))
    .describe("A unique identifier for the dimension."),
  Operator: z.enum(["IN", "NOT_IN"]).describe(
    "Defines how the dimensionValues of a dimension are interpreted.",
  ).optional(),
});

const MetricValueSchema = z.object({
  Count: z.string().describe(
    "If the ComparisonOperator calls for a numeric value, use this to specify that (integer) numeric value to be compared with the metric.",
  ).optional(),
  Cidrs: z.array(z.string()).describe(
    "If the ComparisonOperator calls for a set of CIDRs, use this to specify that set to be compared with the metric.",
  ).optional(),
  Ports: z.array(z.number().int().min(0).max(65535)).describe(
    "If the ComparisonOperator calls for a set of ports, use this to specify that set to be compared with the metric.",
  ).optional(),
  Number: z.number().describe("The numeral value of a metric.").optional(),
  Numbers: z.array(z.number()).describe("The numeral values of a metric.")
    .optional(),
  Strings: z.array(z.string()).describe("The string values of a metric.")
    .optional(),
});

const StatisticalThresholdSchema = z.object({
  Statistic: z.enum([
    "Average",
    "p0",
    "p0.1",
    "p0.01",
    "p1",
    "p10",
    "p50",
    "p90",
    "p99",
    "p99.9",
    "p99.99",
    "p100",
  ]).describe(
    "The percentile which resolves to a threshold value by which compliance with a behavior is determined",
  ).optional(),
});

const MachineLearningDetectionConfigSchema = z.object({
  ConfidenceLevel: z.enum(["LOW", "MEDIUM", "HIGH"]).describe(
    "The sensitivity of anomalous behavior evaluation. Can be Low, Medium, or High.",
  ).optional(),
});

const BehaviorCriteriaSchema = z.object({
  ComparisonOperator: z.enum([
    "less-than",
    "less-than-equals",
    "greater-than",
    "greater-than-equals",
    "in-cidr-set",
    "not-in-cidr-set",
    "in-port-set",
    "not-in-port-set",
    "in-set",
    "not-in-set",
  ]).describe(
    "The operator that relates the thing measured (metric) to the criteria (containing a value or statisticalThreshold).",
  ).optional(),
  Value: MetricValueSchema.describe("The value to be compared with the metric.")
    .optional(),
  DurationSeconds: z.number().int().describe(
    "Use this to specify the time duration over which the behavior is evaluated.",
  ).optional(),
  ConsecutiveDatapointsToAlarm: z.number().int().min(1).max(10).describe(
    "If a device is in violation of the behavior for the specified number of consecutive datapoints, an alarm occurs. If not specified, the default is 1.",
  ).optional(),
  ConsecutiveDatapointsToClear: z.number().int().min(1).max(10).describe(
    "If an alarm has occurred and the offending device is no longer in violation of the behavior for the specified number of consecutive datapoints, the alarm is cleared. If not specified, the default is 1.",
  ).optional(),
  StatisticalThreshold: StatisticalThresholdSchema.describe(
    "A statistical ranking (percentile) which indicates a threshold value by which a behavior is determined to be in compliance or in violation of the behavior.",
  ).optional(),
  MlDetectionConfig: MachineLearningDetectionConfigSchema.describe(
    "The configuration of an ML Detect Security Profile.",
  ).optional(),
});

const BehaviorSchema = z.object({
  Name: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9:_-]+"))
    .describe("The name for the behavior."),
  Metric: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9:_-]+"))
    .describe("What is measured by the behavior.").optional(),
  MetricDimension: MetricDimensionSchema.describe("The dimension of a metric.")
    .optional(),
  Criteria: BehaviorCriteriaSchema.describe(
    "The criteria by which the behavior is determined to be normal.",
  ).optional(),
  SuppressAlerts: z.boolean().describe(
    "Manage Detect alarm SNS notifications by setting behavior notification to on or suppressed. Detect will continue to performing device behavior evaluations. However, suppressed alarms wouldn't be forwarded for SNS notification.",
  ).optional(),
  ExportMetric: z.boolean().describe(
    "Flag to enable/disable metrics export for metric to be retained.",
  ).optional(),
});

const AlertTargetSchema = z.object({
  AlertTargetArn: z.string().max(2048).describe(
    "The ARN of the notification target to which alerts are sent.",
  ),
  RoleArn: z.string().min(20).max(2048).describe(
    "The ARN of the role that grants permission to send alerts to the notification target.",
  ),
});

const MetricToRetainSchema = z.object({
  Metric: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9:_-]+"))
    .describe("What is measured by the behavior."),
  MetricDimension: MetricDimensionSchema.describe("The dimension of a metric.")
    .optional(),
  ExportMetric: z.boolean().describe(
    "Flag to enable/disable metrics export for metric to be retained.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The tag's key."),
  Value: z.string().min(1).max(256).describe("The tag's value."),
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
  SecurityProfileName: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z0-9:_-]+"),
  ).describe("A unique identifier for the security profile.").optional(),
  SecurityProfileDescription: z.string().max(1000).describe(
    "A description of the security profile.",
  ).optional(),
  Behaviors: z.array(BehaviorSchema).describe(
    "Specifies the behaviors that, when violated by a device (thing), cause an alert.",
  ).optional(),
  AlertTargets: z.record(z.string(), AlertTargetSchema).describe(
    "Specifies the destinations to which alerts are sent.",
  ).optional(),
  AdditionalMetricsToRetainV2: z.array(MetricToRetainSchema).describe(
    "A list of metrics whose data is retained (stored). By default, data is retained for any metric used in the profile's behaviors, but it is also retained for any metric specified here.",
  ).optional(),
  MetricsExportConfig: z.object({
    MqttTopic: z.string().min(1).max(512).describe(
      "The topic for metrics export.",
    ),
    RoleArn: z.string().min(20).max(2048).describe(
      "The ARN of the role that grants permission to publish to mqtt topic.",
    ),
  }).describe("A structure containing the mqtt topic for metrics export.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata that can be used to manage the security profile.",
  ).optional(),
  TargetArns: z.array(z.string().max(2048)).describe(
    "A set of target ARNs that the security profile is attached to.",
  ).optional(),
});

const StateSchema = z.object({
  SecurityProfileName: z.string(),
  SecurityProfileDescription: z.string().optional(),
  Behaviors: z.array(BehaviorSchema).optional(),
  AlertTargets: z.record(z.string(), z.unknown()).optional(),
  AdditionalMetricsToRetainV2: z.array(MetricToRetainSchema).optional(),
  MetricsExportConfig: z.object({
    MqttTopic: z.string(),
    RoleArn: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  TargetArns: z.array(z.string()).optional(),
  SecurityProfileArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  SecurityProfileName: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z0-9:_-]+"),
  ).describe("A unique identifier for the security profile.").optional(),
  SecurityProfileDescription: z.string().max(1000).describe(
    "A description of the security profile.",
  ).optional(),
  Behaviors: z.array(BehaviorSchema).describe(
    "Specifies the behaviors that, when violated by a device (thing), cause an alert.",
  ).optional(),
  AlertTargets: z.record(z.string(), AlertTargetSchema).describe(
    "Specifies the destinations to which alerts are sent.",
  ).optional(),
  AdditionalMetricsToRetainV2: z.array(MetricToRetainSchema).describe(
    "A list of metrics whose data is retained (stored). By default, data is retained for any metric used in the profile's behaviors, but it is also retained for any metric specified here.",
  ).optional(),
  MetricsExportConfig: z.object({
    MqttTopic: z.string().min(1).max(512).describe(
      "The topic for metrics export.",
    ).optional(),
    RoleArn: z.string().min(20).max(2048).describe(
      "The ARN of the role that grants permission to publish to mqtt topic.",
    ).optional(),
  }).describe("A structure containing the mqtt topic for metrics export.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata that can be used to manage the security profile.",
  ).optional(),
  TargetArns: z.array(z.string().max(2048)).describe(
    "A set of target ARNs that the security profile is attached to.",
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

/** Swamp extension model for IoT SecurityProfile. Registered at `@swamp/aws/iot/security-profile`. */
export const model = {
  type: "@swamp/aws/iot/security-profile",
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
      description: "IoT SecurityProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT SecurityProfile",
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
          "AWS::IoT::SecurityProfile",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.SecurityProfileName ?? g.SecurityProfileName)?.toString() ??
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
      description: "Get a IoT SecurityProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT SecurityProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoT::SecurityProfile",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.SecurityProfileName ??
          context.globalArgs.SecurityProfileName)?.toString() ??
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
      description: "Update a IoT SecurityProfile",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.SecurityProfileName?.toString() ?? "current")
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
        const identifier = existing.SecurityProfileName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::SecurityProfile",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::SecurityProfile",
          identifier,
          currentState,
          desiredState,
          ["SecurityProfileName"],
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
      description: "Delete a IoT SecurityProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT SecurityProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoT::SecurityProfile",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.SecurityProfileName?.toString() ??
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
      description: "Sync IoT SecurityProfile state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.SecurityProfileName?.toString() ?? "current")
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
        const identifier = existing.SecurityProfileName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::SecurityProfile",
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
