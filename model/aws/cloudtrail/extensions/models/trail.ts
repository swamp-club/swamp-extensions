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

// Auto-generated extension model for @swamp/aws/cloudtrail/trail
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudTrail Trail (AWS::CloudTrail::Trail).
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

const DataResourceSchema = z.object({
  Type: z.string().describe(
    "The resource type in which you want to log data events. You can specify AWS::S3::Object or AWS::Lambda::Function resources.",
  ),
  Values: z.array(z.string()).describe(
    "An array of Amazon Resource Name (ARN) strings or partial ARN strings for the specified objects.",
  ).optional(),
});

const EventSelectorSchema = z.object({
  IncludeManagementEvents: z.boolean().describe(
    "Specify if you want your event selector to include management events for your trail.",
  ).optional(),
  ReadWriteType: z.enum(["All", "ReadOnly", "WriteOnly"]).describe(
    "Specify if you want your trail to log read-only events, write-only events, or all. For example, the EC2 GetConsoleOutput is a read-only API operation and RunInstances is a write-only API operation.",
  ).optional(),
  ExcludeManagementEventSources: z.array(z.string()).describe(
    'An optional list of service event sources from which you do not want management events to be logged on your trail. In this release, the list can be empty (disables the filter), or it can filter out AWS Key Management Service events by containing "kms.amazonaws.com". By default, ExcludeManagementEventSources is empty, and AWS KMS events are included in events that are logged to your trail.',
  ).optional(),
  DataResources: z.array(DataResourceSchema).optional(),
});

const AggregationConfigurationSchema = z.object({
  EventCategory: z.enum(["Data"]).describe(
    "The category of events to be aggregated.",
  ),
  Templates: z.array(
    z.enum(["API_ACTIVITY", "RESOURCE_ACCESS", "USER_ACTIONS"]),
  ).describe("Contains all templates in an aggregation configuration."),
});

const AdvancedFieldSelectorSchema = z.object({
  Field: z.string().min(1).max(1000).regex(new RegExp("([\\w|\\d|\\.|_]+)"))
    .describe(
      "A field in an event record on which to filter events to be logged. Supported fields include readOnly, eventCategory, eventSource (for management events), eventName, resources.type, and resources.ARN.",
    ),
  Equals: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that includes events that match the exact value of the event record field specified as the value of Field. This is the only valid operator that you can use with the readOnly, eventCategory, and resources.type fields.",
    ).optional(),
  NotStartsWith: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that excludes events that match the first few characters of the event record field specified as the value of Field.",
    ).optional(),
  NotEndsWith: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that excludes events that match the last few characters of the event record field specified as the value of Field.",
    ).optional(),
  StartsWith: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that includes events that match the first few characters of the event record field specified as the value of Field.",
    ).optional(),
  EndsWith: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that includes events that match the last few characters of the event record field specified as the value of Field.",
    ).optional(),
  NotEquals: z.array(z.string().min(1).max(2048).regex(new RegExp("(.+)")))
    .describe(
      "An operator that excludes events that match the exact value of the event record field specified as the value of Field.",
    ).optional(),
});

const AdvancedEventSelectorSchema = z.object({
  FieldSelectors: z.array(AdvancedFieldSelectorSchema).describe(
    "Contains all selector statements in an advanced event selector.",
  ),
  Name: z.string().min(1).max(1000).describe(
    'An optional, descriptive name for an advanced event selector, such as "Log data events for only two S3 buckets".',
  ).optional(),
});

const InsightSelectorSchema = z.object({
  InsightType: z.string().describe("The type of insight to log on a trail.")
    .optional(),
  EventCategories: z.array(z.enum(["Management", "Data"])).describe(
    "The categories of events for which to log insights. By default, insights are logged for management events only.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Key: z.string().describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  IncludeGlobalServiceEvents: z.boolean().describe(
    "Specifies whether the trail is publishing events from global services such as IAM to the log files.",
  ).optional(),
  EventSelectors: z.array(EventSelectorSchema).describe(
    "Use event selectors to further specify the management and data event settings for your trail. By default, trails created without specific event selectors will be configured to log all read and write management events, and no data events. When an event occurs in your account, CloudTrail evaluates the event selector for all trails. For each trail, if the event matches any event selector, the trail processes and logs the event. If the event doesn't match any event selector, the trail doesn't log the event. You can configure up to five event selectors for a trail.",
  ).optional(),
  KMSKeyId: z.string().describe(
    "Specifies the KMS key ID to use to encrypt the logs delivered by CloudTrail. The value can be an alias name prefixed by 'alias/', a fully specified ARN to an alias, a fully specified ARN to a key, or a globally unique identifier.",
  ).optional(),
  AggregationConfigurations: z.array(AggregationConfigurationSchema).describe(
    "Specifies the aggregation configuration to aggregate CloudTrail Events. A maximum of 1 aggregation configuration is allowed.",
  ).optional(),
  CloudWatchLogsRoleArn: z.string().describe(
    "Specifies the role for the CloudWatch Logs endpoint to assume to write to a user's log group.",
  ).optional(),
  S3KeyPrefix: z.string().max(200).describe(
    "Specifies the Amazon S3 key prefix that comes after the name of the bucket you have designated for log file delivery. For more information, see Finding Your CloudTrail Log Files. The maximum length is 200 characters.",
  ).optional(),
  AdvancedEventSelectors: z.array(AdvancedEventSelectorSchema).describe(
    "The advanced event selectors that were used to select events for the data store.",
  ).optional(),
  TrailName: z.string().min(3).max(128).regex(
    new RegExp("(^[a-zA-Z0-9]$)|(^[a-zA-Z0-9]([a-zA-Z0-9\\._-])*[a-zA-Z0-9]$)"),
  ).optional(),
  IsOrganizationTrail: z.boolean().describe(
    "Specifies whether the trail is created for all accounts in an organization in AWS Organizations, or only for the current AWS account. The default is false, and cannot be true unless the call is made on behalf of an AWS account that is the master account for an organization in AWS Organizations.",
  ).optional(),
  InsightSelectors: z.array(InsightSelectorSchema).describe(
    "Lets you enable Insights event logging by specifying the Insights selectors that you want to enable on an existing trail.",
  ).optional(),
  CloudWatchLogsLogGroupArn: z.string().describe(
    "Specifies a log group name using an Amazon Resource Name (ARN), a unique identifier that represents the log group to which CloudTrail logs will be delivered. Not required unless you specify CloudWatchLogsRoleArn.",
  ).optional(),
  SnsTopicName: z.string().max(256).describe(
    "Specifies the name of the Amazon SNS topic defined for notification of log file delivery. The maximum length is 256 characters.",
  ).optional(),
  IsMultiRegionTrail: z.boolean().describe(
    "Specifies whether the trail applies only to the current region or to all regions. The default is false. If the trail exists only in the current region and this value is set to true, shadow trails (replications of the trail) will be created in the other regions. If the trail exists in all regions and this value is set to false, the trail will remain in the region where it was created, and its shadow trails in other regions will be deleted. As a best practice, consider using trails that log events in all regions.",
  ).optional(),
  S3BucketName: z.string().describe(
    "Specifies the name of the Amazon S3 bucket designated for publishing log files. See Amazon S3 Bucket Naming Requirements.",
  ),
  EnableLogFileValidation: z.boolean().describe(
    "Specifies whether log file validation is enabled. The default is false.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  IsLogging: z.boolean().describe(
    "Whether the CloudTrail is currently logging AWS API calls.",
  ),
});

const StateSchema = z.object({
  IncludeGlobalServiceEvents: z.boolean().optional(),
  EventSelectors: z.array(EventSelectorSchema).optional(),
  KMSKeyId: z.string().optional(),
  AggregationConfigurations: z.array(AggregationConfigurationSchema).optional(),
  CloudWatchLogsRoleArn: z.string().optional(),
  S3KeyPrefix: z.string().optional(),
  AdvancedEventSelectors: z.array(AdvancedEventSelectorSchema).optional(),
  TrailName: z.string(),
  IsOrganizationTrail: z.boolean().optional(),
  InsightSelectors: z.array(InsightSelectorSchema).optional(),
  CloudWatchLogsLogGroupArn: z.string().optional(),
  SnsTopicName: z.string().optional(),
  IsMultiRegionTrail: z.boolean().optional(),
  S3BucketName: z.string().optional(),
  SnsTopicArn: z.string().optional(),
  EnableLogFileValidation: z.boolean().optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  IsLogging: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  IncludeGlobalServiceEvents: z.boolean().describe(
    "Specifies whether the trail is publishing events from global services such as IAM to the log files.",
  ).optional(),
  EventSelectors: z.array(EventSelectorSchema).describe(
    "Use event selectors to further specify the management and data event settings for your trail. By default, trails created without specific event selectors will be configured to log all read and write management events, and no data events. When an event occurs in your account, CloudTrail evaluates the event selector for all trails. For each trail, if the event matches any event selector, the trail processes and logs the event. If the event doesn't match any event selector, the trail doesn't log the event. You can configure up to five event selectors for a trail.",
  ).optional(),
  KMSKeyId: z.string().describe(
    "Specifies the KMS key ID to use to encrypt the logs delivered by CloudTrail. The value can be an alias name prefixed by 'alias/', a fully specified ARN to an alias, a fully specified ARN to a key, or a globally unique identifier.",
  ).optional(),
  AggregationConfigurations: z.array(AggregationConfigurationSchema).describe(
    "Specifies the aggregation configuration to aggregate CloudTrail Events. A maximum of 1 aggregation configuration is allowed.",
  ).optional(),
  CloudWatchLogsRoleArn: z.string().describe(
    "Specifies the role for the CloudWatch Logs endpoint to assume to write to a user's log group.",
  ).optional(),
  S3KeyPrefix: z.string().max(200).describe(
    "Specifies the Amazon S3 key prefix that comes after the name of the bucket you have designated for log file delivery. For more information, see Finding Your CloudTrail Log Files. The maximum length is 200 characters.",
  ).optional(),
  AdvancedEventSelectors: z.array(AdvancedEventSelectorSchema).describe(
    "The advanced event selectors that were used to select events for the data store.",
  ).optional(),
  TrailName: z.string().min(3).max(128).regex(
    new RegExp("(^[a-zA-Z0-9]$)|(^[a-zA-Z0-9]([a-zA-Z0-9\\._-])*[a-zA-Z0-9]$)"),
  ).optional(),
  IsOrganizationTrail: z.boolean().describe(
    "Specifies whether the trail is created for all accounts in an organization in AWS Organizations, or only for the current AWS account. The default is false, and cannot be true unless the call is made on behalf of an AWS account that is the master account for an organization in AWS Organizations.",
  ).optional(),
  InsightSelectors: z.array(InsightSelectorSchema).describe(
    "Lets you enable Insights event logging by specifying the Insights selectors that you want to enable on an existing trail.",
  ).optional(),
  CloudWatchLogsLogGroupArn: z.string().describe(
    "Specifies a log group name using an Amazon Resource Name (ARN), a unique identifier that represents the log group to which CloudTrail logs will be delivered. Not required unless you specify CloudWatchLogsRoleArn.",
  ).optional(),
  SnsTopicName: z.string().max(256).describe(
    "Specifies the name of the Amazon SNS topic defined for notification of log file delivery. The maximum length is 256 characters.",
  ).optional(),
  IsMultiRegionTrail: z.boolean().describe(
    "Specifies whether the trail applies only to the current region or to all regions. The default is false. If the trail exists only in the current region and this value is set to true, shadow trails (replications of the trail) will be created in the other regions. If the trail exists in all regions and this value is set to false, the trail will remain in the region where it was created, and its shadow trails in other regions will be deleted. As a best practice, consider using trails that log events in all regions.",
  ).optional(),
  S3BucketName: z.string().describe(
    "Specifies the name of the Amazon S3 bucket designated for publishing log files. See Amazon S3 Bucket Naming Requirements.",
  ).optional(),
  EnableLogFileValidation: z.boolean().describe(
    "Specifies whether log file validation is enabled. The default is false.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  IsLogging: z.boolean().describe(
    "Whether the CloudTrail is currently logging AWS API calls.",
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

/** Swamp extension model for CloudTrail Trail. Registered at `@swamp/aws/cloudtrail/trail`. */
export const model = {
  type: "@swamp/aws/cloudtrail/trail",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CloudTrail Trail resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudTrail Trail",
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
          "AWS::CloudTrail::Trail",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.TrailName ?? g.TrailName)?.toString() ?? "current").replace(
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
      description: "Get a CloudTrail Trail",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudTrail Trail",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudTrail::Trail",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.TrailName ?? context.globalArgs.TrailName)?.toString() ??
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
      description: "Update a CloudTrail Trail",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.TrailName?.toString() ?? "current").replace(
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
        const identifier = existing.TrailName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudTrail::Trail",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CloudTrail::Trail",
          identifier,
          currentState,
          desiredState,
          ["TrailName"],
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
      description: "Delete a CloudTrail Trail",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudTrail Trail",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudTrail::Trail",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.TrailName?.toString() ?? args.identifier).replace(
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
      description: "Sync CloudTrail Trail state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.TrailName?.toString() ?? "current").replace(
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
        const identifier = existing.TrailName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudTrail::Trail",
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
