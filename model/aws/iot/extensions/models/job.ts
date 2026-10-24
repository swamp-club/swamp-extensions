// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/iot/job
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoT Job (AWS::IoT::Job).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const RateIncreaseCriteriaSchema = z.object({
  NumberOfNotifiedThings: z.number().int().min(1).describe(
    "The threshold for number of notified things that will initiate the increase in rate of rollout.",
  ).optional(),
  NumberOfSucceededThings: z.number().int().min(1).describe(
    "The threshold for number of succeeded things that will initiate the increase in rate of rollout.",
  ).optional(),
});

const ExponentialRolloutRateSchema = z.object({
  BaseRatePerMinute: z.number().int().min(1).max(1000).describe(
    "The minimum number of things that will be notified of a pending job, per minute at the start of job rollout.",
  ),
  IncrementFactor: z.number().min(1.1).max(5).describe(
    "The exponential factor to increase the rate of rollout for a job.",
  ),
  RateIncreaseCriteria: RateIncreaseCriteriaSchema.describe(
    "Allows you to define a criteria to initiate the increase in rate of rollout for a job.",
  ),
});

const AbortCriteriaSchema = z.object({
  FailureType: z.enum(["FAILED", "REJECTED", "TIMED_OUT", "ALL"]).describe(
    "The type of job execution failures that can initiate a job abort.",
  ),
  Action: z.enum(["CANCEL"]).describe(
    "The type of job action to take to initiate the job abort.",
  ),
  ThresholdPercentage: z.number().max(100).describe(
    "The minimum percentage of job execution failures that must occur to initiate the job abort.",
  ),
  MinNumberOfExecutedThings: z.number().int().min(1).describe(
    "The minimum number of things which must receive job execution notifications before the job can be aborted.",
  ),
});

const RetryCriteriaSchema = z.object({
  FailureType: z.enum(["FAILED", "TIMED_OUT", "ALL"]).describe(
    "The type of job execution failures that can initiate a job retry.",
  ),
  NumberOfRetries: z.number().int().min(0).max(10).describe(
    "The number of retries allowed for a failure type for the job.",
  ),
});

const MaintenanceWindowSchema = z.object({
  StartTime: z.string().min(1).max(256).describe(
    "Displays the start time of the next maintenance window.",
  ),
  DurationInMinutes: z.number().int().min(1).max(1430).describe(
    "Displays the duration of the next maintenance window.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The tag's key."),
  Value: z.string().min(0).max(256).describe("The tag's value."),
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
  JobId: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "A job identifier which must be unique for your AWS account. We recommend using a UUID. Alpha-numeric characters, '-' and '_' are valid for use here.",
    ),
  Targets: z.array(z.string().min(0).max(2048)).describe(
    "A list of things and thing groups to which the job should be sent.",
  ),
  DocumentSource: z.string().min(1).max(1350).describe(
    "An S3 link, or S3 object URL, to the job document. The link is an Amazon S3 object URL and is required if you don't specify a value for document.",
  ).optional(),
  Document: z.string().min(0).max(32768).describe(
    "The job document. Required if you don't specify a value for documentSource.",
  ).optional(),
  Description: z.string().min(1).max(2028).regex(
    new RegExp("^[^\\p{C}]+$", "u"),
  ).describe("A short text description of the job.").optional(),
  PresignedUrlConfig: z.object({
    RoleArn: z.string().min(20).max(2048).describe(
      "The ARN of an IAM role that grants permission to download files from the S3 bucket where the job data/updates are stored.",
    ).optional(),
    ExpiresInSec: z.number().int().min(60).max(3600).describe(
      "How long (in seconds) pre-signed URLs are valid. Valid values are 60 - 3600, the default value is 3600 seconds.",
    ).optional(),
  }).describe("Configuration for pre-signed S3 URLs.").optional(),
  TargetSelection: z.enum(["CONTINUOUS", "SNAPSHOT"]).describe(
    "Specifies whether the job will continue to run (CONTINUOUS), or will be complete after all those things specified as targets have completed the job (SNAPSHOT).",
  ).optional(),
  JobExecutionsRolloutConfig: z.object({
    MaximumPerMinute: z.number().int().min(1).describe(
      "The maximum number of things that will be notified of a pending job, per minute. This parameter allows you to create a staged rollout.",
    ).optional(),
    ExponentialRate: ExponentialRolloutRateSchema.describe(
      "Allows you to create an exponential rate of rollout for a job.",
    ).optional(),
  }).describe("Allows you to create a staged rollout of a job.").optional(),
  AbortConfig: z.object({
    CriteriaList: z.array(AbortCriteriaSchema).describe(
      "The list of criteria that determine when and how to abort the job.",
    ),
  }).describe(
    "The criteria that determine when and how a job abort takes place.",
  ).optional(),
  TimeoutConfig: z.object({
    InProgressTimeoutInMinutes: z.number().int().describe(
      "Specifies the amount of time, in minutes, this device has to finish execution of this job. The timeout interval can be anywhere between 1 minute and 7 days (1 to 10080 minutes).",
    ).optional(),
  }).describe(
    "Specifies the amount of time each device has to finish its execution of the job.",
  ).optional(),
  JobTemplateArn: z.string().min(1).max(1600).regex(new RegExp("^arn:[!-~]+$"))
    .describe("The ARN of the job template used to create the job.").optional(),
  JobExecutionsRetryConfig: z.object({
    CriteriaList: z.array(RetryCriteriaSchema).describe(
      "The list of criteria that determines how many retries are allowed for each failure type for a job.",
    ),
  }).describe(
    "The configuration that determines how many retries are allowed for each failure type for a job.",
  ).optional(),
  DocumentParameters: z.record(z.string(), z.string().min(1).max(30720))
    .describe(
      "Parameters of an Amazon Web Services managed template that you can specify to create the job document.",
    ).optional(),
  SchedulingConfig: z.object({
    StartTime: z.string().min(1).max(64).describe(
      "The time a job will begin rollout of the job document to all devices in the target group for a job.",
    ).optional(),
    EndTime: z.string().min(1).max(64).describe(
      "The time a job will stop rollout of the job document to all devices in the target group for a job.",
    ).optional(),
    EndBehavior: z.enum(["STOP_ROLLOUT", "CANCEL", "FORCE_CANCEL"]).describe(
      "Specifies the end behavior for all job executions after a job reaches the selected endTime.",
    ).optional(),
    MaintenanceWindows: z.array(MaintenanceWindowSchema).describe(
      "An optional configuration within the SchedulingConfig to setup a recurring maintenance window.",
    ).optional(),
  }).describe(
    "Specifies the date and time that a job will begin the rollout of the job document to all devices in the target group.",
  ).optional(),
  DestinationPackageVersions: z.array(
    z.string().min(1).max(1600).regex(new RegExp("^arn:[!-~]+$")),
  ).describe(
    "The package version Amazon Resource Names (ARNs) that are installed on the device when the job successfully completes.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata which can be used to manage the job.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  JobId: z.string().optional(),
  Targets: z.array(z.string()).optional(),
  DocumentSource: z.string().optional(),
  Document: z.string().optional(),
  Description: z.string().optional(),
  PresignedUrlConfig: z.object({
    RoleArn: z.string(),
    ExpiresInSec: z.number(),
  }).optional(),
  TargetSelection: z.string().optional(),
  JobExecutionsRolloutConfig: z.object({
    MaximumPerMinute: z.number(),
    ExponentialRate: ExponentialRolloutRateSchema,
  }).optional(),
  AbortConfig: z.object({
    CriteriaList: z.array(AbortCriteriaSchema),
  }).optional(),
  TimeoutConfig: z.object({
    InProgressTimeoutInMinutes: z.number(),
  }).optional(),
  JobTemplateArn: z.string().optional(),
  JobExecutionsRetryConfig: z.object({
    CriteriaList: z.array(RetryCriteriaSchema),
  }).optional(),
  DocumentParameters: z.record(z.string(), z.unknown()).optional(),
  SchedulingConfig: z.object({
    StartTime: z.string(),
    EndTime: z.string(),
    EndBehavior: z.string(),
    MaintenanceWindows: z.array(MaintenanceWindowSchema),
  }).optional(),
  DestinationPackageVersions: z.array(z.string()).optional(),
  CreatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  JobId: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "A job identifier which must be unique for your AWS account. We recommend using a UUID. Alpha-numeric characters, '-' and '_' are valid for use here.",
    ).optional(),
  Targets: z.array(z.string().min(0).max(2048)).describe(
    "A list of things and thing groups to which the job should be sent.",
  ).optional(),
  DocumentSource: z.string().min(1).max(1350).describe(
    "An S3 link, or S3 object URL, to the job document. The link is an Amazon S3 object URL and is required if you don't specify a value for document.",
  ).optional(),
  Document: z.string().min(0).max(32768).describe(
    "The job document. Required if you don't specify a value for documentSource.",
  ).optional(),
  Description: z.string().min(1).max(2028).regex(
    new RegExp("^[^\\p{C}]+$", "u"),
  ).describe("A short text description of the job.").optional(),
  PresignedUrlConfig: z.object({
    RoleArn: z.string().min(20).max(2048).describe(
      "The ARN of an IAM role that grants permission to download files from the S3 bucket where the job data/updates are stored.",
    ).optional(),
    ExpiresInSec: z.number().int().min(60).max(3600).describe(
      "How long (in seconds) pre-signed URLs are valid. Valid values are 60 - 3600, the default value is 3600 seconds.",
    ).optional(),
  }).describe("Configuration for pre-signed S3 URLs.").optional(),
  TargetSelection: z.enum(["CONTINUOUS", "SNAPSHOT"]).describe(
    "Specifies whether the job will continue to run (CONTINUOUS), or will be complete after all those things specified as targets have completed the job (SNAPSHOT).",
  ).optional(),
  JobExecutionsRolloutConfig: z.object({
    MaximumPerMinute: z.number().int().min(1).describe(
      "The maximum number of things that will be notified of a pending job, per minute. This parameter allows you to create a staged rollout.",
    ).optional(),
    ExponentialRate: ExponentialRolloutRateSchema.describe(
      "Allows you to create an exponential rate of rollout for a job.",
    ).optional(),
  }).describe("Allows you to create a staged rollout of a job.").optional(),
  AbortConfig: z.object({
    CriteriaList: z.array(AbortCriteriaSchema).describe(
      "The list of criteria that determine when and how to abort the job.",
    ).optional(),
  }).describe(
    "The criteria that determine when and how a job abort takes place.",
  ).optional(),
  TimeoutConfig: z.object({
    InProgressTimeoutInMinutes: z.number().int().describe(
      "Specifies the amount of time, in minutes, this device has to finish execution of this job. The timeout interval can be anywhere between 1 minute and 7 days (1 to 10080 minutes).",
    ).optional(),
  }).describe(
    "Specifies the amount of time each device has to finish its execution of the job.",
  ).optional(),
  JobTemplateArn: z.string().min(1).max(1600).regex(new RegExp("^arn:[!-~]+$"))
    .describe("The ARN of the job template used to create the job.").optional(),
  JobExecutionsRetryConfig: z.object({
    CriteriaList: z.array(RetryCriteriaSchema).describe(
      "The list of criteria that determines how many retries are allowed for each failure type for a job.",
    ).optional(),
  }).describe(
    "The configuration that determines how many retries are allowed for each failure type for a job.",
  ).optional(),
  DocumentParameters: z.record(z.string(), z.string().min(1).max(30720))
    .describe(
      "Parameters of an Amazon Web Services managed template that you can specify to create the job document.",
    ).optional(),
  SchedulingConfig: z.object({
    StartTime: z.string().min(1).max(64).describe(
      "The time a job will begin rollout of the job document to all devices in the target group for a job.",
    ).optional(),
    EndTime: z.string().min(1).max(64).describe(
      "The time a job will stop rollout of the job document to all devices in the target group for a job.",
    ).optional(),
    EndBehavior: z.enum(["STOP_ROLLOUT", "CANCEL", "FORCE_CANCEL"]).describe(
      "Specifies the end behavior for all job executions after a job reaches the selected endTime.",
    ).optional(),
    MaintenanceWindows: z.array(MaintenanceWindowSchema).describe(
      "An optional configuration within the SchedulingConfig to setup a recurring maintenance window.",
    ).optional(),
  }).describe(
    "Specifies the date and time that a job will begin the rollout of the job document to all devices in the target group.",
  ).optional(),
  DestinationPackageVersions: z.array(
    z.string().min(1).max(1600).regex(new RegExp("^arn:[!-~]+$")),
  ).describe(
    "The package version Amazon Resource Names (ARNs) that are installed on the device when the job successfully completes.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata which can be used to manage the job.",
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

/** Swamp extension model for IoT Job. Registered at `@swamp/aws/iot/job`. */
export const model = {
  type: "@swamp/aws/iot/job",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "IoT Job resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT Job",
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
          "AWS::IoT::Job",
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
      description: "Get a IoT Job",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT Job",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoT::Job",
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
      description: "Update a IoT Job",
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
          "AWS::IoT::Job",
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
          "AWS::IoT::Job",
          identifier,
          currentState,
          desiredState,
          [
            "JobId",
            "Targets",
            "Document",
            "DocumentSource",
            "TargetSelection",
            "JobTemplateArn",
            "DocumentParameters",
            "SchedulingConfig",
            "DestinationPackageVersions",
            "JobExecutionsRetryConfig",
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
      description: "Delete a IoT Job",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT Job",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoT::Job",
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
      description: "Sync IoT Job state from AWS",
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
            "AWS::IoT::Job",
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
    list: {
      description: "List IoT Job resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources("AWS::IoT::Job", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
