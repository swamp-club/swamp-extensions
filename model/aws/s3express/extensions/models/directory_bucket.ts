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

// Auto-generated extension model for @swamp/aws/s3express/directory-bucket
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for S3Express DirectoryBucket (AWS::S3Express::DirectoryBucket).
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

const ServerSideEncryptionByDefaultSchema = z.object({
  KMSMasterKeyID: z.string().describe(
    "AWS Key Management Service (KMS) customer managed key ID to use for the default encryption. This parameter is allowed only if SSEAlgorithm is set to aws:kms. You can specify this parameter with the key ID or the Amazon Resource Name (ARN) of the KMS key",
  ).optional(),
  SSEAlgorithm: z.enum(["aws:kms", "AES256"]),
});

const ServerSideEncryptionRuleSchema = z.object({
  BucketKeyEnabled: z.boolean().describe(
    "Specifies whether Amazon S3 should use an S3 Bucket Key with server-side encryption using KMS (SSE-KMS) for new objects in the bucket. Existing objects are not affected. Amazon S3 Express One Zone uses an S3 Bucket Key with SSE-KMS and S3 Bucket Key cannot be disabled. It's only allowed to set the BucketKeyEnabled element to true.",
  ).optional(),
  ServerSideEncryptionByDefault: ServerSideEncryptionByDefaultSchema.describe(
    "Specifies the default server-side encryption to apply to new objects in the bucket. If a PUT Object request doesn't specify any server-side encryption, this default encryption will be applied.",
  ).optional(),
});

const AbortIncompleteMultipartUploadSchema = z.object({
  DaysAfterInitiation: z.number().int().min(0).describe(
    "Specifies the number of days after which Amazon S3 aborts an incomplete multipart upload.",
  ),
});

const RuleSchema = z.object({
  AbortIncompleteMultipartUpload: AbortIncompleteMultipartUploadSchema.describe(
    "Specifies the days since the initiation of an incomplete multipart upload that Amazon S3 will wait before permanently removing all parts of the upload.",
  ).optional(),
  ExpirationInDays: z.number().int().optional(),
  Id: z.string().max(255).optional(),
  Prefix: z.string().optional(),
  Status: z.enum(["Enabled", "Disabled"]),
  ObjectSizeGreaterThan: z.string().max(20).regex(new RegExp("[0-9]+"))
    .optional(),
  ObjectSizeLessThan: z.string().max(20).regex(new RegExp("[0-9]+")).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:.*)([\\p{L}\\p{Z}\\p{N}_.:=+\\/\\-@%]*)$", "u"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:=+\\/\\-@%]*)$", "u"),
  ),
});

const MetricsConfigurationSchema = z.object({
  Id: z.string().describe("The ID used to identify the metrics configuration."),
  Prefix: z.string().describe(
    "The prefix used when evaluating a metrics filter.",
  ).optional(),
  AccessPointArn: z.string().describe(
    "The access point ARN used when evaluating a metrics filter.",
  ).optional(),
});

const DestinationSchema = z.object({
  BucketArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the destination Amazon S3 bucket to which data is exported.",
  ),
  BucketAccountId: z.string().describe(
    "The account ID that owns the destination S3 bucket.",
  ).optional(),
  Format: z.enum(["CSV", "ORC", "Parquet"]).describe(
    "Specifies the file format used when exporting data to Amazon S3.",
  ),
  Prefix: z.string().describe(
    "The prefix to use when exporting data. The prefix is prepended to all results.",
  ).optional(),
});

const InventoryConfigurationSchema = z.object({
  Destination: DestinationSchema.describe(
    "Specifies information about where to publish inventory reports for an Amazon S3 Express bucket.",
  ),
  Enabled: z.boolean().describe(
    "Specifies whether the inventory is enabled or disabled.",
  ),
  Id: z.string().describe(
    "The ID used to identify the inventory configuration.",
  ),
  IncludedObjectVersions: z.enum(["All", "Current"]).describe(
    "Object versions to include in the inventory list.",
  ),
  OptionalFields: z.array(
    z.enum([
      "Size",
      "LastModifiedDate",
      "StorageClass",
      "ETag",
      "IsMultipartUploaded",
      "EncryptionStatus",
      "BucketKeyStatus",
      "ChecksumAlgorithm",
      "LifecycleExpirationDate",
    ]),
  ).describe(
    "Contains the optional fields that are included in the inventory results.",
  ).optional(),
  Prefix: z.string().describe(
    "The prefix that is prepended to all inventory results.",
  ).optional(),
  ScheduleFrequency: z.enum(["Daily", "Weekly"]).describe(
    "Specifies the schedule for generating inventory results.",
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
  BucketName: z.string().max(63).regex(
    new RegExp("^[a-z0-9][a-z0-9//.//-]*[a-z0-9]$"),
  ).describe(
    "Specifies a name for the bucket. The bucket name must contain only lowercase letters, numbers, and hyphens (-). A directory bucket name must be unique in the chosen Availability Zone or Local Zone. The bucket name must also follow the format 'bucket_base_name--zone_id--x-s3'. The zone_id can be the ID of an Availability Zone or a Local Zone. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the bucket name.",
  ).optional(),
  LocationName: z.string().describe(
    "Specifies the Zone ID of the Availability Zone or Local Zone where the directory bucket will be created. An example Availability Zone ID value is 'use1-az5'.",
  ),
  DataRedundancy: z.enum(["SingleAvailabilityZone", "SingleLocalZone"])
    .describe(
      "Specifies the number of Availability Zone or Local Zone that's used for redundancy for the bucket.",
    ),
  BucketEncryption: z.object({
    ServerSideEncryptionConfiguration: z.array(ServerSideEncryptionRuleSchema)
      .describe("Specifies the default server-side-encryption configuration."),
  }).describe(
    "Specifies default encryption for a bucket using server-side encryption with Amazon S3 managed keys (SSE-S3) or AWS KMS keys (SSE-KMS).",
  ).optional(),
  LifecycleConfiguration: z.object({
    Rules: z.array(RuleSchema).describe(
      "A lifecycle rule for individual objects in an Amazon S3 Express bucket.",
    ),
  }).describe(
    "Lifecycle rules that define how Amazon S3 Express manages objects during their lifetime.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  MetricsConfigurations: z.array(MetricsConfigurationSchema).describe(
    "Specifies the metrics configurations for the Amazon S3 Express bucket.",
  ).optional(),
  InventoryConfigurations: z.array(InventoryConfigurationSchema).describe(
    "The inventory configuration for an Amazon S3 Express bucket.",
  ).optional(),
});

const StateSchema = z.object({
  BucketName: z.string(),
  LocationName: z.string().optional(),
  AvailabilityZoneName: z.string().optional(),
  DataRedundancy: z.string().optional(),
  Arn: z.string().optional(),
  BucketEncryption: z.object({
    ServerSideEncryptionConfiguration: z.array(ServerSideEncryptionRuleSchema),
  }).optional(),
  LifecycleConfiguration: z.object({
    Rules: z.array(RuleSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  MetricsConfigurations: z.array(MetricsConfigurationSchema).optional(),
  InventoryConfigurations: z.array(InventoryConfigurationSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  BucketName: z.string().max(63).regex(
    new RegExp("^[a-z0-9][a-z0-9//.//-]*[a-z0-9]$"),
  ).describe(
    "Specifies a name for the bucket. The bucket name must contain only lowercase letters, numbers, and hyphens (-). A directory bucket name must be unique in the chosen Availability Zone or Local Zone. The bucket name must also follow the format 'bucket_base_name--zone_id--x-s3'. The zone_id can be the ID of an Availability Zone or a Local Zone. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the bucket name.",
  ).optional(),
  LocationName: z.string().describe(
    "Specifies the Zone ID of the Availability Zone or Local Zone where the directory bucket will be created. An example Availability Zone ID value is 'use1-az5'.",
  ).optional(),
  DataRedundancy: z.enum(["SingleAvailabilityZone", "SingleLocalZone"])
    .describe(
      "Specifies the number of Availability Zone or Local Zone that's used for redundancy for the bucket.",
    ).optional(),
  BucketEncryption: z.object({
    ServerSideEncryptionConfiguration: z.array(ServerSideEncryptionRuleSchema)
      .describe("Specifies the default server-side-encryption configuration.")
      .optional(),
  }).describe(
    "Specifies default encryption for a bucket using server-side encryption with Amazon S3 managed keys (SSE-S3) or AWS KMS keys (SSE-KMS).",
  ).optional(),
  LifecycleConfiguration: z.object({
    Rules: z.array(RuleSchema).describe(
      "A lifecycle rule for individual objects in an Amazon S3 Express bucket.",
    ).optional(),
  }).describe(
    "Lifecycle rules that define how Amazon S3 Express manages objects during their lifetime.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  MetricsConfigurations: z.array(MetricsConfigurationSchema).describe(
    "Specifies the metrics configurations for the Amazon S3 Express bucket.",
  ).optional(),
  InventoryConfigurations: z.array(InventoryConfigurationSchema).describe(
    "The inventory configuration for an Amazon S3 Express bucket.",
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

/** Swamp extension model for S3Express DirectoryBucket. Registered at `@swamp/aws/s3express/directory-bucket`. */
export const model = {
  type: "@swamp/aws/s3express/directory-bucket",
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
      toVersion: "2026.04.07.1",
      description: "Added: MetricsConfigurations",
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
      toVersion: "2026.04.24.1",
      description: "Added: InventoryConfigurations",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.15.1",
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
      description: "S3Express DirectoryBucket resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3Express DirectoryBucket",
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
          "AWS::S3Express::DirectoryBucket",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.BucketName ?? g.BucketName)?.toString() ?? "current")
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
      description: "Get a S3Express DirectoryBucket",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Express DirectoryBucket",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::S3Express::DirectoryBucket",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.BucketName ?? context.globalArgs.BucketName)?.toString() ??
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
      description: "Update a S3Express DirectoryBucket",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.BucketName?.toString() ?? "current").replace(
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
        const identifier = existing.BucketName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::S3Express::DirectoryBucket",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::S3Express::DirectoryBucket",
          identifier,
          currentState,
          desiredState,
          ["BucketName", "LocationName", "DataRedundancy"],
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
      description: "Delete a S3Express DirectoryBucket",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Express DirectoryBucket",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::S3Express::DirectoryBucket",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.BucketName?.toString() ?? args.identifier)
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
      description: "Sync S3Express DirectoryBucket state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.BucketName?.toString() ?? "current").replace(
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
        const identifier = existing.BucketName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::S3Express::DirectoryBucket",
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
