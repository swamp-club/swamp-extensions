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

// Auto-generated extension model for @swamp/aws/lookoutequipment/inference-scheduler
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for LookoutEquipment InferenceScheduler (AWS::LookoutEquipment::InferenceScheduler).
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

const InputNameConfigurationSchema = z.object({
  ComponentTimestampDelimiter: z.string().min(0).max(1).regex(
    new RegExp("^(\\-|\\_|\\s)?$"),
  ).describe(
    "Indicates the delimiter character used between items in the data.",
  ).optional(),
  TimestampFormat: z.string().regex(
    new RegExp("^EPOCH|yyyy-MM-dd-HH-mm-ss|yyyyMMddHHmmss$"),
  ).describe(
    "The format of the timestamp, whether Epoch time, or standard, with or without hyphens (-).",
  ).optional(),
});

const S3InputConfigurationSchema = z.object({
  Bucket: z.string().min(3).max(63).regex(
    new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ),
  Prefix: z.string().min(0).max(1024).optional(),
});

const S3OutputConfigurationSchema = z.object({
  Bucket: z.string().min(3).max(63).regex(
    new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ),
  Prefix: z.string().min(0).max(1024).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe("The key for the specified tag."),
  Value: z.string().min(0).max(256).regex(new RegExp("[\\s\\w+-=\\.:/@]*"))
    .describe("The value for the specified tag."),
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
  DataDelayOffsetInMinutes: z.number().int().min(0).max(60).describe(
    "A period of time (in minutes) by which inference on the data is delayed after the data starts.",
  ).optional(),
  DataInputConfiguration: z.object({
    InputTimeZoneOffset: z.string().regex(
      new RegExp("^(\\+|\\-)[0-9]{2}\\:[0-9]{2}$"),
    ).describe(
      "Indicates the difference between your time zone and Greenwich Mean Time (GMT).",
    ).optional(),
    InferenceInputNameConfiguration: InputNameConfigurationSchema.describe(
      "Specifies configuration information for the input data for the inference, including timestamp format and delimiter.",
    ).optional(),
    S3InputConfiguration: S3InputConfigurationSchema.describe(
      "Specifies configuration information for the input data for the inference, including input data S3 location.",
    ),
  }).describe(
    "Specifies configuration information for the input data for the inference scheduler, including delimiter, format, and dataset location.",
  ),
  DataOutputConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(2048).regex(
      new RegExp("^[A-Za-z0-9][A-Za-z0-9:_/+=,@.-]{0,2048}$"),
    ).describe(
      "The ID number for the AWS KMS key used to encrypt the inference output.",
    ).optional(),
    S3OutputConfiguration: S3OutputConfigurationSchema.describe(
      "Specifies configuration information for the output results from the inference, including output S3 location.",
    ),
  }).describe(
    "Specifies configuration information for the output results for the inference scheduler, including the S3 location for the output.",
  ),
  DataUploadFrequency: z.enum(["PT5M", "PT10M", "PT15M", "PT30M", "PT1H"])
    .describe(
      "How often data is uploaded to the source S3 bucket for the input data.",
    ),
  InferenceSchedulerName: z.string().min(1).max(200).regex(
    new RegExp("^[0-9a-zA-Z_-]{1,200}$"),
  ).describe("The name of the inference scheduler being created.").optional(),
  ModelName: z.string().min(1).max(200).regex(
    new RegExp("^[0-9a-zA-Z_-]{1,200}$"),
  ).describe(
    "The name of the previously trained ML model being used to create the inference scheduler.",
  ),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws(-[^:]+)?:iam::[0-9]{12}:role/.+"),
  ).describe(
    "The Amazon Resource Name (ARN) of a role with permission to access the data source being used for the inference.",
  ),
  ServerSideKmsKeyId: z.string().min(1).max(2048).regex(
    new RegExp("^[A-Za-z0-9][A-Za-z0-9:_/+=,@.-]{0,2048}$"),
  ).describe(
    "Provides the identifier of the AWS KMS customer master key (CMK) used to encrypt inference scheduler data by Amazon Lookout for Equipment.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Any tags associated with the inference scheduler.",
  ).optional(),
});

const StateSchema = z.object({
  DataDelayOffsetInMinutes: z.number().optional(),
  DataInputConfiguration: z.object({
    InputTimeZoneOffset: z.string(),
    InferenceInputNameConfiguration: InputNameConfigurationSchema,
    S3InputConfiguration: S3InputConfigurationSchema,
  }).optional(),
  DataOutputConfiguration: z.object({
    KmsKeyId: z.string(),
    S3OutputConfiguration: S3OutputConfigurationSchema,
  }).optional(),
  DataUploadFrequency: z.string().optional(),
  InferenceSchedulerName: z.string(),
  ModelName: z.string().optional(),
  RoleArn: z.string().optional(),
  ServerSideKmsKeyId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  InferenceSchedulerArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DataDelayOffsetInMinutes: z.number().int().min(0).max(60).describe(
    "A period of time (in minutes) by which inference on the data is delayed after the data starts.",
  ).optional(),
  DataInputConfiguration: z.object({
    InputTimeZoneOffset: z.string().regex(
      new RegExp("^(\\+|\\-)[0-9]{2}\\:[0-9]{2}$"),
    ).describe(
      "Indicates the difference between your time zone and Greenwich Mean Time (GMT).",
    ).optional(),
    InferenceInputNameConfiguration: InputNameConfigurationSchema.describe(
      "Specifies configuration information for the input data for the inference, including timestamp format and delimiter.",
    ).optional(),
    S3InputConfiguration: S3InputConfigurationSchema.describe(
      "Specifies configuration information for the input data for the inference, including input data S3 location.",
    ).optional(),
  }).describe(
    "Specifies configuration information for the input data for the inference scheduler, including delimiter, format, and dataset location.",
  ).optional(),
  DataOutputConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(2048).regex(
      new RegExp("^[A-Za-z0-9][A-Za-z0-9:_/+=,@.-]{0,2048}$"),
    ).describe(
      "The ID number for the AWS KMS key used to encrypt the inference output.",
    ).optional(),
    S3OutputConfiguration: S3OutputConfigurationSchema.describe(
      "Specifies configuration information for the output results from the inference, including output S3 location.",
    ).optional(),
  }).describe(
    "Specifies configuration information for the output results for the inference scheduler, including the S3 location for the output.",
  ).optional(),
  DataUploadFrequency: z.enum(["PT5M", "PT10M", "PT15M", "PT30M", "PT1H"])
    .describe(
      "How often data is uploaded to the source S3 bucket for the input data.",
    ).optional(),
  InferenceSchedulerName: z.string().min(1).max(200).regex(
    new RegExp("^[0-9a-zA-Z_-]{1,200}$"),
  ).describe("The name of the inference scheduler being created.").optional(),
  ModelName: z.string().min(1).max(200).regex(
    new RegExp("^[0-9a-zA-Z_-]{1,200}$"),
  ).describe(
    "The name of the previously trained ML model being used to create the inference scheduler.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws(-[^:]+)?:iam::[0-9]{12}:role/.+"),
  ).describe(
    "The Amazon Resource Name (ARN) of a role with permission to access the data source being used for the inference.",
  ).optional(),
  ServerSideKmsKeyId: z.string().min(1).max(2048).regex(
    new RegExp("^[A-Za-z0-9][A-Za-z0-9:_/+=,@.-]{0,2048}$"),
  ).describe(
    "Provides the identifier of the AWS KMS customer master key (CMK) used to encrypt inference scheduler data by Amazon Lookout for Equipment.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Any tags associated with the inference scheduler.",
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

/** Swamp extension model for LookoutEquipment InferenceScheduler. Registered at `@swamp/aws/lookoutequipment/inference-scheduler`. */
export const model = {
  type: "@swamp/aws/lookoutequipment/inference-scheduler",
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
      description: "LookoutEquipment InferenceScheduler resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a LookoutEquipment InferenceScheduler",
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
          "AWS::LookoutEquipment::InferenceScheduler",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.InferenceSchedulerName ?? g.InferenceSchedulerName)
            ?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
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
    get: {
      description: "Get a LookoutEquipment InferenceScheduler",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LookoutEquipment InferenceScheduler",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::LookoutEquipment::InferenceScheduler",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.InferenceSchedulerName ??
          context.globalArgs.InferenceSchedulerName)?.toString() ??
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
      description: "Update a LookoutEquipment InferenceScheduler",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.InferenceSchedulerName?.toString() ?? "current")
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
        const identifier = existing.InferenceSchedulerName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::LookoutEquipment::InferenceScheduler",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::LookoutEquipment::InferenceScheduler",
          identifier,
          currentState,
          desiredState,
          ["InferenceSchedulerName", "ModelName", "ServerSideKmsKeyId"],
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
      description: "Delete a LookoutEquipment InferenceScheduler",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LookoutEquipment InferenceScheduler",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::LookoutEquipment::InferenceScheduler",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.InferenceSchedulerName?.toString() ??
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
      description: "Sync LookoutEquipment InferenceScheduler state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.InferenceSchedulerName?.toString() ?? "current")
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
        const identifier = existing.InferenceSchedulerName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::LookoutEquipment::InferenceScheduler",
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
