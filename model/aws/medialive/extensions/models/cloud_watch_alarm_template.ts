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

// Auto-generated extension model for @swamp/aws/medialive/cloud-watch-alarm-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaLive CloudWatchAlarmTemplate (AWS::MediaLive::CloudWatchAlarmTemplate).
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
  ComparisonOperator: z.enum([
    "GreaterThanOrEqualToThreshold",
    "GreaterThanThreshold",
    "LessThanThreshold",
    "LessThanOrEqualToThreshold",
  ]).describe(
    "The comparison operator used to compare the specified statistic and the threshold.",
  ),
  DatapointsToAlarm: z.number().min(1).describe(
    "The number of datapoints within the evaluation period that must be breaching to trigger the alarm.",
  ).optional(),
  Description: z.string().min(0).max(1024).describe(
    "A resource's optional description.",
  ).optional(),
  EvaluationPeriods: z.number().min(1).describe(
    "The number of periods over which data is compared to the specified threshold.",
  ),
  GroupIdentifier: z.string().regex(new RegExp("^[^\\s]+$")).describe(
    "A cloudwatch alarm template group's identifier. Can be either be its id or current name.",
  ).optional(),
  MetricName: z.string().min(0).max(64).describe(
    "The name of the metric associated with the alarm. Must be compatible with targetResourceType.",
  ),
  Name: z.string().min(1).max(255).regex(new RegExp("^[^\\s]+$")).describe(
    "A resource's name. Names must be unique within the scope of a resource type in a specific region.",
  ),
  Period: z.number().min(10).max(86400).describe(
    "The period, in seconds, over which the specified statistic is applied.",
  ),
  Statistic: z.enum(["SampleCount", "Average", "Sum", "Minimum", "Maximum"])
    .describe("The statistic to apply to the alarm's metric data."),
  Tags: z.record(z.string(), z.string()).describe(
    "Represents the tags associated with a resource.",
  ).optional(),
  TargetResourceType: z.enum([
    "CLOUDFRONT_DISTRIBUTION",
    "MEDIALIVE_MULTIPLEX",
    "MEDIALIVE_CHANNEL",
    "MEDIALIVE_INPUT_DEVICE",
    "MEDIAPACKAGE_CHANNEL",
    "MEDIAPACKAGE_ORIGIN_ENDPOINT",
    "MEDIACONNECT_FLOW",
    "MEDIATAILOR_PLAYBACK_CONFIGURATION",
    "S3_BUCKET",
  ]).describe(
    "The resource type this template should dynamically generate cloudwatch metric alarms for.",
  ),
  Threshold: z.number().describe(
    "The threshold value to compare with the specified statistic.",
  ),
  TreatMissingData: z.enum(["notBreaching", "breaching", "ignore", "missing"])
    .describe(
      "Specifies how missing data points are treated when evaluating the alarm's condition.",
    ),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  ComparisonOperator: z.string().optional(),
  CreatedAt: z.string().optional(),
  DatapointsToAlarm: z.number().optional(),
  Description: z.string().optional(),
  EvaluationPeriods: z.number().optional(),
  GroupId: z.string().optional(),
  GroupIdentifier: z.string().optional(),
  Id: z.string().optional(),
  Identifier: z.string(),
  MetricName: z.string().optional(),
  ModifiedAt: z.string().optional(),
  Name: z.string().optional(),
  Period: z.number().optional(),
  Statistic: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TargetResourceType: z.string().optional(),
  Threshold: z.number().optional(),
  TreatMissingData: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ComparisonOperator: z.enum([
    "GreaterThanOrEqualToThreshold",
    "GreaterThanThreshold",
    "LessThanThreshold",
    "LessThanOrEqualToThreshold",
  ]).describe(
    "The comparison operator used to compare the specified statistic and the threshold.",
  ).optional(),
  DatapointsToAlarm: z.number().min(1).describe(
    "The number of datapoints within the evaluation period that must be breaching to trigger the alarm.",
  ).optional(),
  Description: z.string().min(0).max(1024).describe(
    "A resource's optional description.",
  ).optional(),
  EvaluationPeriods: z.number().min(1).describe(
    "The number of periods over which data is compared to the specified threshold.",
  ).optional(),
  GroupIdentifier: z.string().regex(new RegExp("^[^\\s]+$")).describe(
    "A cloudwatch alarm template group's identifier. Can be either be its id or current name.",
  ).optional(),
  MetricName: z.string().min(0).max(64).describe(
    "The name of the metric associated with the alarm. Must be compatible with targetResourceType.",
  ).optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[^\\s]+$")).describe(
    "A resource's name. Names must be unique within the scope of a resource type in a specific region.",
  ).optional(),
  Period: z.number().min(10).max(86400).describe(
    "The period, in seconds, over which the specified statistic is applied.",
  ).optional(),
  Statistic: z.enum(["SampleCount", "Average", "Sum", "Minimum", "Maximum"])
    .describe("The statistic to apply to the alarm's metric data.").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "Represents the tags associated with a resource.",
  ).optional(),
  TargetResourceType: z.enum([
    "CLOUDFRONT_DISTRIBUTION",
    "MEDIALIVE_MULTIPLEX",
    "MEDIALIVE_CHANNEL",
    "MEDIALIVE_INPUT_DEVICE",
    "MEDIAPACKAGE_CHANNEL",
    "MEDIAPACKAGE_ORIGIN_ENDPOINT",
    "MEDIACONNECT_FLOW",
    "MEDIATAILOR_PLAYBACK_CONFIGURATION",
    "S3_BUCKET",
  ]).describe(
    "The resource type this template should dynamically generate cloudwatch metric alarms for.",
  ).optional(),
  Threshold: z.number().describe(
    "The threshold value to compare with the specified statistic.",
  ).optional(),
  TreatMissingData: z.enum(["notBreaching", "breaching", "ignore", "missing"])
    .describe(
      "Specifies how missing data points are treated when evaluating the alarm's condition.",
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

/** Swamp extension model for MediaLive CloudWatchAlarmTemplate. Registered at `@swamp/aws/medialive/cloud-watch-alarm-template`. */
export const model = {
  type: "@swamp/aws/medialive/cloud-watch-alarm-template",
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
      description: "MediaLive CloudWatchAlarmTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaLive CloudWatchAlarmTemplate",
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
          "AWS::MediaLive::CloudWatchAlarmTemplate",
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
      description: "Get a MediaLive CloudWatchAlarmTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaLive CloudWatchAlarmTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaLive::CloudWatchAlarmTemplate",
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
      description: "Update a MediaLive CloudWatchAlarmTemplate",
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
        const identifier = existing.Identifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaLive::CloudWatchAlarmTemplate",
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
          "AWS::MediaLive::CloudWatchAlarmTemplate",
          identifier,
          currentState,
          desiredState,
          ["Tags"],
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
      description: "Delete a MediaLive CloudWatchAlarmTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaLive CloudWatchAlarmTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaLive::CloudWatchAlarmTemplate",
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
      description: "Sync MediaLive CloudWatchAlarmTemplate state from AWS",
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
        const identifier = existing.Identifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaLive::CloudWatchAlarmTemplate",
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
