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

// Auto-generated extension model for @swamp/aws/s3tables/table-bucket
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for S3Tables TableBucket (AWS::S3Tables::TableBucket).
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

const ReplicationDestinationSchema = z.object({
  DestinationTableBucketARN: z.string().describe(
    "The ARN of the destination table bucket",
  ),
});

const ReplicationRuleSchema = z.object({
  Destinations: z.array(ReplicationDestinationSchema).describe(
    "List of replication destinations",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "Tag key must be between 1 to 128 characters in length. Tag key cannot start with 'aws:' and can only contain alphanumeric characters, spaces, _,., /, =, +, -, and @.",
  ),
  Value: z.string().max(256).describe(
    "Tag value must be between 0 to 256 characters in length. Tag value can only contain alphanumeric characters, spaces, _,., /, =, +, -, and @.",
  ),
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
  TableBucketName: z.string().min(3).max(63).describe(
    "A name for the table bucket.",
  ),
  UnreferencedFileRemoval: z.object({
    Status: z.enum(["Enabled", "Disabled"]).describe(
      "Indicates whether the Unreferenced File Removal maintenance action is enabled.",
    ).optional(),
    UnreferencedDays: z.number().int().min(1).describe(
      "For any object not referenced by your table and older than the UnreferencedDays property, S3 creates a delete marker and marks the object version as noncurrent.",
    ).optional(),
    NoncurrentDays: z.number().int().min(1).describe(
      "S3 permanently deletes noncurrent objects after the number of days specified by the NoncurrentDays property.",
    ).optional(),
  }).describe(
    "Settings governing the Unreferenced File Removal maintenance action. Unreferenced file removal identifies and deletes all objects that are not referenced by any table snapshots.",
  ).optional(),
  EncryptionConfiguration: z.object({
    SSEAlgorithm: z.enum(["AES256", "aws:kms"]).describe(
      "Server-side encryption algorithm",
    ).optional(),
    KMSKeyArn: z.string().describe("ARN of the KMS key to use for encryption")
      .optional(),
  }).describe("Specifies encryption settings for the table bucket").optional(),
  MetricsConfiguration: z.object({
    Status: z.enum(["Enabled", "Disabled"]).describe(
      "Indicates whether Metrics are enabled.",
    ).optional(),
  }).describe(
    "Settings governing the Metric configuration for the table bucket.",
  ).optional(),
  StorageClassConfiguration: z.object({
    StorageClass: z.enum(["STANDARD", "INTELLIGENT_TIERING"]).describe(
      "The storage class for the table bucket",
    ).optional(),
  }).describe("Specifies storage class settings for the table bucket")
    .optional(),
  ReplicationConfiguration: z.object({
    Role: z.string().describe("The ARN of the IAM role to use for replication"),
    Rules: z.array(ReplicationRuleSchema).describe("List of replication rules"),
  }).describe("Specifies replication configuration for the table bucket")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "User tags (key-value pairs) to associate with the table bucket.",
  ).optional(),
});

const StateSchema = z.object({
  TableBucketARN: z.string(),
  TableBucketName: z.string().optional(),
  UnreferencedFileRemoval: z.object({
    Status: z.string(),
    UnreferencedDays: z.number(),
    NoncurrentDays: z.number(),
  }).optional(),
  EncryptionConfiguration: z.object({
    SSEAlgorithm: z.string(),
    KMSKeyArn: z.string(),
  }).optional(),
  MetricsConfiguration: z.object({
    Status: z.string(),
  }).optional(),
  StorageClassConfiguration: z.object({
    StorageClass: z.string(),
  }).optional(),
  ReplicationConfiguration: z.object({
    Role: z.string(),
    Rules: z.array(ReplicationRuleSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  TableBucketName: z.string().min(3).max(63).describe(
    "A name for the table bucket.",
  ).optional(),
  UnreferencedFileRemoval: z.object({
    Status: z.enum(["Enabled", "Disabled"]).describe(
      "Indicates whether the Unreferenced File Removal maintenance action is enabled.",
    ).optional(),
    UnreferencedDays: z.number().int().min(1).describe(
      "For any object not referenced by your table and older than the UnreferencedDays property, S3 creates a delete marker and marks the object version as noncurrent.",
    ).optional(),
    NoncurrentDays: z.number().int().min(1).describe(
      "S3 permanently deletes noncurrent objects after the number of days specified by the NoncurrentDays property.",
    ).optional(),
  }).describe(
    "Settings governing the Unreferenced File Removal maintenance action. Unreferenced file removal identifies and deletes all objects that are not referenced by any table snapshots.",
  ).optional(),
  EncryptionConfiguration: z.object({
    SSEAlgorithm: z.enum(["AES256", "aws:kms"]).describe(
      "Server-side encryption algorithm",
    ).optional(),
    KMSKeyArn: z.string().describe("ARN of the KMS key to use for encryption")
      .optional(),
  }).describe("Specifies encryption settings for the table bucket").optional(),
  MetricsConfiguration: z.object({
    Status: z.enum(["Enabled", "Disabled"]).describe(
      "Indicates whether Metrics are enabled.",
    ).optional(),
  }).describe(
    "Settings governing the Metric configuration for the table bucket.",
  ).optional(),
  StorageClassConfiguration: z.object({
    StorageClass: z.enum(["STANDARD", "INTELLIGENT_TIERING"]).describe(
      "The storage class for the table bucket",
    ).optional(),
  }).describe("Specifies storage class settings for the table bucket")
    .optional(),
  ReplicationConfiguration: z.object({
    Role: z.string().describe("The ARN of the IAM role to use for replication")
      .optional(),
    Rules: z.array(ReplicationRuleSchema).describe("List of replication rules")
      .optional(),
  }).describe("Specifies replication configuration for the table bucket")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "User tags (key-value pairs) to associate with the table bucket.",
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

/** Swamp extension model for S3Tables TableBucket. Registered at `@swamp/aws/s3tables/table-bucket`. */
export const model = {
  type: "@swamp/aws/s3tables/table-bucket",
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
      toVersion: "2026.04.07.1",
      description: "Added: ReplicationConfiguration",
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
      description: "S3Tables TableBucket resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3Tables TableBucket",
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
          "AWS::S3Tables::TableBucket",
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
      description: "Get a S3Tables TableBucket",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Tables TableBucket",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::S3Tables::TableBucket",
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
      description: "Update a S3Tables TableBucket",
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
        const identifier = existing.TableBucketARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::S3Tables::TableBucket",
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
          "AWS::S3Tables::TableBucket",
          identifier,
          currentState,
          desiredState,
          ["TableBucketName"],
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
      description: "Delete a S3Tables TableBucket",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Tables TableBucket",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::S3Tables::TableBucket",
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
      description: "Sync S3Tables TableBucket state from AWS",
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
        const identifier = existing.TableBucketARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::S3Tables::TableBucket",
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
