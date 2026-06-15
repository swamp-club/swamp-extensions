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

// Auto-generated extension model for @swamp/aws/ec2/flow-log
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 FlowLog (AWS::EC2::FlowLog).
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

const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const TagFieldSpecificationSchema = z.object({
  ResourceType: z.string(),
  TagKeys: z.array(z.string()),
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
  DeliverCrossAccountRole: z.string().describe(
    "The ARN of the IAM role that allows Amazon EC2 to publish flow logs across accounts.",
  ).optional(),
  DeliverLogsPermissionArn: z.string().describe(
    "The ARN for the IAM role that permits Amazon EC2 to publish flow logs to a CloudWatch Logs log group in your account. If you specify LogDestinationType as s3 or kinesis-data-firehose, do not specify DeliverLogsPermissionArn or LogGroupName.",
  ).optional(),
  LogDestination: z.string().describe(
    "Specifies the destination to which the flow log data is to be published. Flow log data can be published to a CloudWatch Logs log group, an Amazon S3 bucket, or a Kinesis Firehose stream. The value specified for this parameter depends on the value specified for LogDestinationType.",
  ).optional(),
  LogDestinationType: z.enum([
    "cloud-watch-logs",
    "s3",
    "kinesis-data-firehose",
  ]).describe(
    "Specifies the type of destination to which the flow log data is to be published. Flow log data can be published to CloudWatch Logs or Amazon S3.",
  ).optional(),
  LogFormat: z.string().describe(
    "The fields to include in the flow log record, in the order in which they should appear.",
  ).optional(),
  LogGroupName: z.string().describe(
    "The name of a new or existing CloudWatch Logs log group where Amazon EC2 publishes your flow logs. If you specify LogDestinationType as s3 or kinesis-data-firehose, do not specify DeliverLogsPermissionArn or LogGroupName.",
  ).optional(),
  MaxAggregationInterval: z.number().int().describe(
    "The maximum interval of time during which a flow of packets is captured and aggregated into a flow log record. You can specify 60 seconds (1 minute) or 600 seconds (10 minutes).",
  ).optional(),
  ResourceId: z.string().describe(
    "The ID of the subnet, network interface, or VPC for which you want to create a flow log.",
  ),
  ResourceType: z.enum([
    "NetworkInterface",
    "Subnet",
    "VPC",
    "TransitGateway",
    "TransitGatewayAttachment",
    "RegionalNatGateway",
  ]).describe(
    "The type of resource for which to create the flow log. For example, if you specified a VPC ID for the ResourceId property, specify VPC for this property.",
  ),
  Tags: z.array(TagSchema).describe("The tags to apply to the flow logs.")
    .optional(),
  TrafficType: z.enum(["ACCEPT", "ALL", "REJECT"]).describe(
    "The type of traffic to log. You can log traffic that the resource accepts or rejects, or all traffic.",
  ).optional(),
  DestinationOptions: z.object({
    FileFormat: z.enum(["plain-text", "parquet"]),
    HiveCompatiblePartitions: z.boolean(),
    PerHourPartition: z.boolean(),
  }).optional(),
  TagFieldSpecifications: z.array(TagFieldSpecificationSchema).describe(
    "The resource types and associated tags for EC2 resources associated with the EC2 Tags feature for log enrichment.",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  DeliverCrossAccountRole: z.string().optional(),
  DeliverLogsPermissionArn: z.string().optional(),
  LogDestination: z.string().optional(),
  LogDestinationType: z.string().optional(),
  LogFormat: z.string().optional(),
  LogGroupName: z.string().optional(),
  MaxAggregationInterval: z.number().optional(),
  ResourceId: z.string().optional(),
  ResourceType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TrafficType: z.string().optional(),
  DestinationOptions: z.object({
    FileFormat: z.string(),
    HiveCompatiblePartitions: z.boolean(),
    PerHourPartition: z.boolean(),
  }).optional(),
  TagFieldSpecifications: z.array(TagFieldSpecificationSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DeliverCrossAccountRole: z.string().describe(
    "The ARN of the IAM role that allows Amazon EC2 to publish flow logs across accounts.",
  ).optional(),
  DeliverLogsPermissionArn: z.string().describe(
    "The ARN for the IAM role that permits Amazon EC2 to publish flow logs to a CloudWatch Logs log group in your account. If you specify LogDestinationType as s3 or kinesis-data-firehose, do not specify DeliverLogsPermissionArn or LogGroupName.",
  ).optional(),
  LogDestination: z.string().describe(
    "Specifies the destination to which the flow log data is to be published. Flow log data can be published to a CloudWatch Logs log group, an Amazon S3 bucket, or a Kinesis Firehose stream. The value specified for this parameter depends on the value specified for LogDestinationType.",
  ).optional(),
  LogDestinationType: z.enum([
    "cloud-watch-logs",
    "s3",
    "kinesis-data-firehose",
  ]).describe(
    "Specifies the type of destination to which the flow log data is to be published. Flow log data can be published to CloudWatch Logs or Amazon S3.",
  ).optional(),
  LogFormat: z.string().describe(
    "The fields to include in the flow log record, in the order in which they should appear.",
  ).optional(),
  LogGroupName: z.string().describe(
    "The name of a new or existing CloudWatch Logs log group where Amazon EC2 publishes your flow logs. If you specify LogDestinationType as s3 or kinesis-data-firehose, do not specify DeliverLogsPermissionArn or LogGroupName.",
  ).optional(),
  MaxAggregationInterval: z.number().int().describe(
    "The maximum interval of time during which a flow of packets is captured and aggregated into a flow log record. You can specify 60 seconds (1 minute) or 600 seconds (10 minutes).",
  ).optional(),
  ResourceId: z.string().describe(
    "The ID of the subnet, network interface, or VPC for which you want to create a flow log.",
  ).optional(),
  ResourceType: z.enum([
    "NetworkInterface",
    "Subnet",
    "VPC",
    "TransitGateway",
    "TransitGatewayAttachment",
    "RegionalNatGateway",
  ]).describe(
    "The type of resource for which to create the flow log. For example, if you specified a VPC ID for the ResourceId property, specify VPC for this property.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags to apply to the flow logs.")
    .optional(),
  TrafficType: z.enum(["ACCEPT", "ALL", "REJECT"]).describe(
    "The type of traffic to log. You can log traffic that the resource accepts or rejects, or all traffic.",
  ).optional(),
  DestinationOptions: z.object({
    FileFormat: z.enum(["plain-text", "parquet"]).optional(),
    HiveCompatiblePartitions: z.boolean().optional(),
    PerHourPartition: z.boolean().optional(),
  }).optional(),
  TagFieldSpecifications: z.array(TagFieldSpecificationSchema).describe(
    "The resource types and associated tags for EC2 resources associated with the EC2 Tags feature for log enrichment.",
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

/** Swamp extension model for EC2 FlowLog. Registered at `@swamp/aws/ec2/flow-log`. */
export const model = {
  type: "@swamp/aws/ec2/flow-log",
  version: "2026.06.15.2",
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
      description: "Added: TagFieldSpecifications",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 FlowLog resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 FlowLog",
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
          "AWS::EC2::FlowLog",
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
      description: "Get a EC2 FlowLog",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 FlowLog",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::FlowLog",
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
      description: "Update a EC2 FlowLog",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::FlowLog",
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
          "AWS::EC2::FlowLog",
          identifier,
          currentState,
          desiredState,
          [
            "DeliverCrossAccountRole",
            "DeliverLogsPermissionArn",
            "LogGroupName",
            "LogDestination",
            "ResourceId",
            "TrafficType",
            "LogDestinationType",
            "ResourceType",
            "LogFormat",
            "MaxAggregationInterval",
            "DestinationOptions",
            "TagFieldSpecifications",
          ],
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
      description: "Delete a EC2 FlowLog",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 FlowLog",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::FlowLog",
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
      description: "Sync EC2 FlowLog state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::FlowLog",
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
