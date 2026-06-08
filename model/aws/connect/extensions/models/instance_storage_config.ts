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

// Auto-generated extension model for @swamp/aws/connect/instance-storage-config
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Connect InstanceStorageConfig (AWS::Connect::InstanceStorageConfig).
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

const EncryptionConfigSchema = z.object({
  EncryptionType: z.enum(["KMS"]).describe(
    "Specifies default encryption using AWS KMS-Managed Keys",
  ),
  KeyId: z.string().min(1).max(128).describe("Specifies the encryption key id"),
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
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe(
    "Connect Instance ID with which the storage config will be associated",
  ),
  ResourceType: z.enum([
    "CHAT_TRANSCRIPTS",
    "CALL_RECORDINGS",
    "SCHEDULED_REPORTS",
    "MEDIA_STREAMS",
    "CONTACT_TRACE_RECORDS",
    "AGENT_EVENTS",
    "REAL_TIME_CONTACT_ANALYSIS_SEGMENTS",
    "ATTACHMENTS",
    "CONTACT_EVALUATIONS",
    "SCREEN_RECORDINGS",
    "REAL_TIME_CONTACT_ANALYSIS_CHAT_SEGMENTS",
    "REAL_TIME_CONTACT_ANALYSIS_VOICE_SEGMENTS",
    "EMAIL_MESSAGES",
  ]).describe(
    "Specifies the type of storage resource available for the instance",
  ),
  StorageType: z.enum([
    "S3",
    "KINESIS_VIDEO_STREAM",
    "KINESIS_STREAM",
    "KINESIS_FIREHOSE",
  ]).describe("Specifies the storage type to be associated with the instance"),
  S3Config: z.object({
    BucketName: z.string().min(1).max(128).describe("A name for the S3 Bucket"),
    BucketPrefix: z.string().min(1).max(128).describe(
      "Prefixes are used to infer logical hierarchy",
    ),
    EncryptionConfig: EncryptionConfigSchema.optional(),
  }).optional(),
  KinesisVideoStreamConfig: z.object({
    Prefix: z.string().min(1).max(128).describe(
      "Prefixes are used to infer logical hierarchy",
    ),
    RetentionPeriodHours: z.number().describe("Number of hours"),
    EncryptionConfig: EncryptionConfigSchema,
  }).optional(),
  KinesisStreamConfig: z.object({
    StreamArn: z.string().regex(
      new RegExp(
        "^arn:aws[-a-z0-9]*:kinesis:[-a-z0-9]*:[0-9]{12}:stream/[-a-zA-Z0-9_.]*$",
      ),
    ).describe("An ARN is a unique AWS resource identifier."),
  }).optional(),
  KinesisFirehoseConfig: z.object({
    FirehoseArn: z.string().regex(
      new RegExp(
        "^arn:aws[-a-z0-9]*:firehose:[-a-z0-9]*:[0-9]{12}:deliverystream/[-a-zA-Z0-9_.]*$",
      ),
    ).describe("An ARN is a unique AWS resource identifier."),
  }).optional(),
});

const StateSchema = z.object({
  InstanceArn: z.string(),
  ResourceType: z.string(),
  AssociationId: z.string(),
  StorageType: z.string().optional(),
  S3Config: z.object({
    BucketName: z.string(),
    BucketPrefix: z.string(),
    EncryptionConfig: EncryptionConfigSchema,
  }).optional(),
  KinesisVideoStreamConfig: z.object({
    Prefix: z.string(),
    RetentionPeriodHours: z.number(),
    EncryptionConfig: EncryptionConfigSchema,
  }).optional(),
  KinesisStreamConfig: z.object({
    StreamArn: z.string(),
  }).optional(),
  KinesisFirehoseConfig: z.object({
    FirehoseArn: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe(
    "Connect Instance ID with which the storage config will be associated",
  ).optional(),
  ResourceType: z.enum([
    "CHAT_TRANSCRIPTS",
    "CALL_RECORDINGS",
    "SCHEDULED_REPORTS",
    "MEDIA_STREAMS",
    "CONTACT_TRACE_RECORDS",
    "AGENT_EVENTS",
    "REAL_TIME_CONTACT_ANALYSIS_SEGMENTS",
    "ATTACHMENTS",
    "CONTACT_EVALUATIONS",
    "SCREEN_RECORDINGS",
    "REAL_TIME_CONTACT_ANALYSIS_CHAT_SEGMENTS",
    "REAL_TIME_CONTACT_ANALYSIS_VOICE_SEGMENTS",
    "EMAIL_MESSAGES",
  ]).describe(
    "Specifies the type of storage resource available for the instance",
  ).optional(),
  StorageType: z.enum([
    "S3",
    "KINESIS_VIDEO_STREAM",
    "KINESIS_STREAM",
    "KINESIS_FIREHOSE",
  ]).describe("Specifies the storage type to be associated with the instance")
    .optional(),
  S3Config: z.object({
    BucketName: z.string().min(1).max(128).describe("A name for the S3 Bucket")
      .optional(),
    BucketPrefix: z.string().min(1).max(128).describe(
      "Prefixes are used to infer logical hierarchy",
    ).optional(),
    EncryptionConfig: EncryptionConfigSchema.optional(),
  }).optional(),
  KinesisVideoStreamConfig: z.object({
    Prefix: z.string().min(1).max(128).describe(
      "Prefixes are used to infer logical hierarchy",
    ).optional(),
    RetentionPeriodHours: z.number().describe("Number of hours").optional(),
    EncryptionConfig: EncryptionConfigSchema.optional(),
  }).optional(),
  KinesisStreamConfig: z.object({
    StreamArn: z.string().regex(
      new RegExp(
        "^arn:aws[-a-z0-9]*:kinesis:[-a-z0-9]*:[0-9]{12}:stream/[-a-zA-Z0-9_.]*$",
      ),
    ).describe("An ARN is a unique AWS resource identifier.").optional(),
  }).optional(),
  KinesisFirehoseConfig: z.object({
    FirehoseArn: z.string().regex(
      new RegExp(
        "^arn:aws[-a-z0-9]*:firehose:[-a-z0-9]*:[0-9]{12}:deliverystream/[-a-zA-Z0-9_.]*$",
      ),
    ).describe("An ARN is a unique AWS resource identifier.").optional(),
  }).optional(),
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

/** Swamp extension model for Connect InstanceStorageConfig. Registered at `@swamp/aws/connect/instance-storage-config`. */
export const model = {
  type: "@swamp/aws/connect/instance-storage-config",
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
      toVersion: "2026.06.05.1",
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
      description: "Connect InstanceStorageConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect InstanceStorageConfig",
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
          "AWS::Connect::InstanceStorageConfig",
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
      description: "Get a Connect InstanceStorageConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect InstanceStorageConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Connect::InstanceStorageConfig",
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
      description: "Update a Connect InstanceStorageConfig",
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
        const idParts = [
          existing.InstanceArn?.toString(),
          existing.AssociationId?.toString(),
          existing.ResourceType?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Connect::InstanceStorageConfig",
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
          "AWS::Connect::InstanceStorageConfig",
          identifier,
          currentState,
          desiredState,
          ["InstanceArn", "ResourceType"],
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
      description: "Delete a Connect InstanceStorageConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect InstanceStorageConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Connect::InstanceStorageConfig",
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
      description: "Sync Connect InstanceStorageConfig state from AWS",
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
        const idParts = [
          existing.InstanceArn?.toString(),
          existing.AssociationId?.toString(),
          existing.ResourceType?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Connect::InstanceStorageConfig",
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
