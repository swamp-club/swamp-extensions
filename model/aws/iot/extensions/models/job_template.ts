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

// Auto-generated extension model for @swamp/aws/iot/job-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoT JobTemplate (AWS::IoT::JobTemplate).
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
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const RateIncreaseCriteriaSchema = z.object({
  NumberOfNotifiedThings: z.number().int().min(1).optional(),
  NumberOfSucceededThings: z.number().int().min(1).optional(),
});

const ExponentialRolloutRateSchema = z.object({
  BaseRatePerMinute: z.number().int().min(1).describe(
    "The minimum number of things that will be notified of a pending job, per minute at the start of job rollout. This parameter allows you to define the initial rate of rollout.",
  ),
  IncrementFactor: z.number().min(1).max(5).describe(
    "The exponential factor to increase the rate of rollout for a job.",
  ),
  RateIncreaseCriteria: RateIncreaseCriteriaSchema.describe(
    "The criteria to initiate the increase in rate of rollout for a job.",
  ),
});

const AbortCriteriaSchema = z.object({
  Action: z.enum(["CANCEL"]).describe(
    "The type of job action to take to initiate the job abort.",
  ),
  FailureType: z.enum(["FAILED", "REJECTED", "TIMED_OUT", "ALL"]).describe(
    "The type of job execution failures that can initiate a job abort.",
  ),
  MinNumberOfExecutedThings: z.number().int().min(1).describe(
    "The minimum number of things which must receive job execution notifications before the job can be aborted.",
  ),
  ThresholdPercentage: z.number().max(100).describe(
    "The minimum percentage of job execution failures that must occur to initiate the job abort.",
  ),
});

const RetryCriteriaSchema = z.object({
  NumberOfRetries: z.number().int().min(0).max(10).optional(),
  FailureType: z.enum(["FAILED", "TIMED_OUT", "ALL"]).optional(),
});

const MaintenanceWindowSchema = z.object({
  StartTime: z.string().min(1).max(256).optional(),
  DurationInMinutes: z.number().int().min(1).max(1430).optional(),
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
  JobArn: z.string().describe(
    "Optional for copying a JobTemplate from a pre-existing Job configuration.",
  ).optional(),
  JobTemplateId: z.string().min(1).max(64).regex(new RegExp("[a-zA-Z0-9_-]+")),
  Description: z.string().max(2028).regex(new RegExp("[^\\p{C}]+", "u"))
    .describe("A description of the Job Template."),
  Document: z.string().max(32768).describe(
    "The job document. Required if you don't specify a value for documentSource.",
  ).optional(),
  DocumentSource: z.string().min(1).max(1350).describe(
    "An S3 link to the job document to use in the template. Required if you don't specify a value for document.",
  ).optional(),
  TimeoutConfig: z.object({
    InProgressTimeoutInMinutes: z.number().int().min(1).max(10080).describe(
      "Specifies the amount of time, in minutes, this device has to finish execution of this job.",
    ),
  }).describe(
    "Specifies the amount of time each device has to finish its execution of the job.",
  ).optional(),
  JobExecutionsRolloutConfig: z.object({
    ExponentialRolloutRate: ExponentialRolloutRateSchema.describe(
      "The rate of increase for a job rollout. This parameter allows you to define an exponential rate for a job rollout.",
    ).optional(),
    MaximumPerMinute: z.number().int().min(1).describe(
      "The maximum number of things that will be notified of a pending job, per minute. This parameter allows you to create a staged rollout.",
    ).optional(),
  }).describe("Allows you to create a staged rollout of a job.").optional(),
  AbortConfig: z.object({
    CriteriaList: z.array(AbortCriteriaSchema),
  }).describe(
    "The criteria that determine when and how a job abort takes place.",
  ).optional(),
  PresignedUrlConfig: z.object({
    RoleArn: z.string().min(20).max(2048).describe(
      "The ARN of an IAM role that grants grants permission to download files from the S3 bucket where the job data/updates are stored. The role must also grant permission for IoT to download the files.",
    ),
    ExpiresInSec: z.number().int().min(60).max(3600).describe(
      "How number (in seconds) pre-signed URLs are valid.",
    ).optional(),
  }).describe("Configuration for pre-signed S3 URLs.").optional(),
  JobExecutionsRetryConfig: z.object({
    RetryCriteriaList: z.array(RetryCriteriaSchema).optional(),
  }).optional(),
  MaintenanceWindows: z.array(MaintenanceWindowSchema).optional(),
  DestinationPackageVersions: z.array(z.string().min(1).max(1600)).optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata that can be used to manage the JobTemplate.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  JobArn: z.string().optional(),
  JobTemplateId: z.string(),
  Description: z.string().optional(),
  Document: z.string().optional(),
  DocumentSource: z.string().optional(),
  TimeoutConfig: z.object({
    InProgressTimeoutInMinutes: z.number(),
  }).optional(),
  JobExecutionsRolloutConfig: z.object({
    ExponentialRolloutRate: ExponentialRolloutRateSchema,
    MaximumPerMinute: z.number(),
  }).optional(),
  AbortConfig: z.object({
    CriteriaList: z.array(AbortCriteriaSchema),
  }).optional(),
  PresignedUrlConfig: z.object({
    RoleArn: z.string(),
    ExpiresInSec: z.number(),
  }).optional(),
  JobExecutionsRetryConfig: z.object({
    RetryCriteriaList: z.array(RetryCriteriaSchema),
  }).optional(),
  MaintenanceWindows: z.array(MaintenanceWindowSchema).optional(),
  DestinationPackageVersions: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  JobArn: z.string().describe(
    "Optional for copying a JobTemplate from a pre-existing Job configuration.",
  ).optional(),
  JobTemplateId: z.string().min(1).max(64).regex(new RegExp("[a-zA-Z0-9_-]+"))
    .optional(),
  Description: z.string().max(2028).regex(new RegExp("[^\\p{C}]+", "u"))
    .describe("A description of the Job Template.").optional(),
  Document: z.string().max(32768).describe(
    "The job document. Required if you don't specify a value for documentSource.",
  ).optional(),
  DocumentSource: z.string().min(1).max(1350).describe(
    "An S3 link to the job document to use in the template. Required if you don't specify a value for document.",
  ).optional(),
  TimeoutConfig: z.object({
    InProgressTimeoutInMinutes: z.number().int().min(1).max(10080).describe(
      "Specifies the amount of time, in minutes, this device has to finish execution of this job.",
    ).optional(),
  }).describe(
    "Specifies the amount of time each device has to finish its execution of the job.",
  ).optional(),
  JobExecutionsRolloutConfig: z.object({
    ExponentialRolloutRate: ExponentialRolloutRateSchema.describe(
      "The rate of increase for a job rollout. This parameter allows you to define an exponential rate for a job rollout.",
    ).optional(),
    MaximumPerMinute: z.number().int().min(1).describe(
      "The maximum number of things that will be notified of a pending job, per minute. This parameter allows you to create a staged rollout.",
    ).optional(),
  }).describe("Allows you to create a staged rollout of a job.").optional(),
  AbortConfig: z.object({
    CriteriaList: z.array(AbortCriteriaSchema).optional(),
  }).describe(
    "The criteria that determine when and how a job abort takes place.",
  ).optional(),
  PresignedUrlConfig: z.object({
    RoleArn: z.string().min(20).max(2048).describe(
      "The ARN of an IAM role that grants grants permission to download files from the S3 bucket where the job data/updates are stored. The role must also grant permission for IoT to download the files.",
    ).optional(),
    ExpiresInSec: z.number().int().min(60).max(3600).describe(
      "How number (in seconds) pre-signed URLs are valid.",
    ).optional(),
  }).describe("Configuration for pre-signed S3 URLs.").optional(),
  JobExecutionsRetryConfig: z.object({
    RetryCriteriaList: z.array(RetryCriteriaSchema).optional(),
  }).optional(),
  MaintenanceWindows: z.array(MaintenanceWindowSchema).optional(),
  DestinationPackageVersions: z.array(z.string().min(1).max(1600)).optional(),
  Tags: z.array(TagSchema).describe(
    "Metadata that can be used to manage the JobTemplate.",
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

/** Swamp extension model for IoT JobTemplate. Registered at `@swamp/aws/iot/job-template`. */
export const model = {
  type: "@swamp/aws/iot/job-template",
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
      description: "IoT JobTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT JobTemplate",
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
          "AWS::IoT::JobTemplate",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.JobTemplateId ?? g.JobTemplateId)?.toString() ?? "current")
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
      description: "Get a IoT JobTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT JobTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoT::JobTemplate",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.JobTemplateId ?? context.globalArgs.JobTemplateId)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a IoT JobTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT JobTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoT::JobTemplate",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.JobTemplateId?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync IoT JobTemplate state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.JobTemplateId?.toString() ?? "current").replace(
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
        const identifier = existing.JobTemplateId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::JobTemplate",
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
