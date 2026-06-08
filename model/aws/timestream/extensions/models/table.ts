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

// Auto-generated extension model for @swamp/aws/timestream/table
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Timestream Table (AWS::Timestream::Table).
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

const PartitionKeySchema = z.object({
  Type: z.enum(["DIMENSION", "MEASURE"]).describe(
    "The type of the partition key. Options are DIMENSION (dimension key) and MEASURE (measure key).",
  ),
  Name: z.string().min(1).max(2048).describe(
    "The name of the attribute used for a dimension key.",
  ).optional(),
  EnforcementInRecord: z.enum(["REQUIRED", "OPTIONAL"]).describe(
    "The level of enforcement for the specification of a dimension key in ingested records. Options are REQUIRED (dimension key must be specified) and OPTIONAL (dimension key does not have to be specified).",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).optional(),
  Value: z.string().min(0).max(256).optional(),
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
  DatabaseName: z.string().regex(new RegExp("^[a-zA-Z0-9_.-]{3,256}$"))
    .describe(
      "The name for the database which the table to be created belongs to.",
    ),
  TableName: z.string().regex(new RegExp("^[a-zA-Z0-9_.-]{3,256}$")).describe(
    "The name for the table. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the table name.",
  ).optional(),
  RetentionProperties: z.object({
    MemoryStoreRetentionPeriodInHours: z.string().describe(
      "The duration for which data must be stored in the memory store.",
    ).optional(),
    MagneticStoreRetentionPeriodInDays: z.string().describe(
      "The duration for which data must be stored in the magnetic store.",
    ).optional(),
  }).describe(
    "The retention duration of the memory store and the magnetic store.",
  ).optional(),
  Schema: z.object({
    CompositePartitionKey: z.array(PartitionKeySchema).describe(
      "A list of partition keys defining the attributes used to partition the table data. The order of the list determines the partition hierarchy. The name and type of each partition key as well as the partition key order cannot be changed after the table is created. However, the enforcement level of each partition key can be changed.",
    ).optional(),
  }).describe("A Schema specifies the expected data model of the table.")
    .optional(),
  MagneticStoreWriteProperties: z.object({
    EnableMagneticStoreWrites: z.boolean().describe(
      "Boolean flag indicating whether magnetic store writes are enabled.",
    ),
    MagneticStoreRejectedDataLocation: z.object({
      S3Configuration: z.object({
        BucketName: z.string().describe(
          "The bucket name used to store the data.",
        ),
        ObjectKeyPrefix: z.string().describe(
          "String used to prefix all data in the bucket.",
        ).optional(),
        EncryptionOption: z.string().describe("Either SSE_KMS or SSE_S3."),
        KmsKeyId: z.string().describe(
          "Must be provided if SSE_KMS is specified as the encryption option",
        ).optional(),
      }).describe(
        "S3 configuration for location to store rejections from magnetic store writes",
      ).optional(),
    }).describe(
      "Location to store information about records that were asynchronously rejected during magnetic store writes.",
    ).optional(),
  }).describe(
    "The properties that determine whether magnetic store writes are enabled.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Name: z.string().optional(),
  DatabaseName: z.string(),
  TableName: z.string(),
  RetentionProperties: z.object({
    MemoryStoreRetentionPeriodInHours: z.string(),
    MagneticStoreRetentionPeriodInDays: z.string(),
  }).optional(),
  Schema: z.object({
    CompositePartitionKey: z.array(PartitionKeySchema),
  }).optional(),
  MagneticStoreWriteProperties: z.object({
    EnableMagneticStoreWrites: z.boolean(),
    MagneticStoreRejectedDataLocation: z.object({
      S3Configuration: z.object({
        BucketName: z.string(),
        ObjectKeyPrefix: z.string(),
        EncryptionOption: z.string(),
        KmsKeyId: z.string(),
      }),
    }),
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
  DatabaseName: z.string().regex(new RegExp("^[a-zA-Z0-9_.-]{3,256}$"))
    .describe(
      "The name for the database which the table to be created belongs to.",
    ).optional(),
  TableName: z.string().regex(new RegExp("^[a-zA-Z0-9_.-]{3,256}$")).describe(
    "The name for the table. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the table name.",
  ).optional(),
  RetentionProperties: z.object({
    MemoryStoreRetentionPeriodInHours: z.string().describe(
      "The duration for which data must be stored in the memory store.",
    ).optional(),
    MagneticStoreRetentionPeriodInDays: z.string().describe(
      "The duration for which data must be stored in the magnetic store.",
    ).optional(),
  }).describe(
    "The retention duration of the memory store and the magnetic store.",
  ).optional(),
  Schema: z.object({
    CompositePartitionKey: z.array(PartitionKeySchema).describe(
      "A list of partition keys defining the attributes used to partition the table data. The order of the list determines the partition hierarchy. The name and type of each partition key as well as the partition key order cannot be changed after the table is created. However, the enforcement level of each partition key can be changed.",
    ).optional(),
  }).describe("A Schema specifies the expected data model of the table.")
    .optional(),
  MagneticStoreWriteProperties: z.object({
    EnableMagneticStoreWrites: z.boolean().describe(
      "Boolean flag indicating whether magnetic store writes are enabled.",
    ).optional(),
    MagneticStoreRejectedDataLocation: z.object({
      S3Configuration: z.object({
        BucketName: z.string().describe(
          "The bucket name used to store the data.",
        ).optional(),
        ObjectKeyPrefix: z.string().describe(
          "String used to prefix all data in the bucket.",
        ).optional(),
        EncryptionOption: z.string().describe("Either SSE_KMS or SSE_S3.")
          .optional(),
        KmsKeyId: z.string().describe(
          "Must be provided if SSE_KMS is specified as the encryption option",
        ).optional(),
      }).describe(
        "S3 configuration for location to store rejections from magnetic store writes",
      ).optional(),
    }).describe(
      "Location to store information about records that were asynchronously rejected during magnetic store writes.",
    ).optional(),
  }).describe(
    "The properties that determine whether magnetic store writes are enabled.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for Timestream Table. Registered at `@swamp/aws/timestream/table`. */
export const model = {
  type: "@swamp/aws/timestream/table",
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
      description: "Timestream Table resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Timestream Table",
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
          "AWS::Timestream::Table",
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
      description: "Get a Timestream Table",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Timestream Table",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Timestream::Table",
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
      description: "Update a Timestream Table",
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
          existing.DatabaseName?.toString(),
          existing.TableName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Timestream::Table",
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
          "AWS::Timestream::Table",
          identifier,
          currentState,
          desiredState,
          ["DatabaseName", "TableName"],
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
      description: "Delete a Timestream Table",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Timestream Table",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Timestream::Table",
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
      description: "Sync Timestream Table state from AWS",
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
          existing.DatabaseName?.toString(),
          existing.TableName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Timestream::Table",
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
