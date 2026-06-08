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

// Auto-generated extension model for @swamp/aws/s3tables/table
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for S3Tables Table (AWS::S3Tables::Table).
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

const SchemaFieldSchema = z.object({
  Type: z.string().describe("The field type"),
  Required: z.boolean().describe(
    "A Boolean value that specifies whether values are required for each row in this field",
  ).optional(),
  Id: z.number().int().describe("The unique identifier for the field")
    .optional(),
  Name: z.string().describe("The name of the field"),
});

const IcebergSchemaSchema = z.object({
  SchemaFieldList: z.array(SchemaFieldSchema).describe(
    "Contains details about the schema for an Iceberg table",
  ),
});

const IcebergSortFieldSchema = z.object({
  SourceId: z.number().int().describe("The source column ID to sort on"),
  NullOrder: z.enum(["nulls-first", "nulls-last"]).describe(
    "Null value ordering (nulls-first or nulls-last)",
  ),
  Transform: z.string().describe("The sort transform function"),
  Direction: z.enum(["asc", "desc"]).describe("Sort direction (asc or desc)"),
});

const IcebergSortOrderSchema = z.object({
  Fields: z.array(IcebergSortFieldSchema).describe("List of sort fields"),
  OrderId: z.number().int().describe(
    "The sort order ID (defaults to 1 if not specified, 0 is reserved for unsorted)",
  ).optional(),
});

const SchemaV2FieldSchema = z.object({
  Required: z.boolean().describe(
    "A Boolean value that specifies whether values are required for each row in this field",
  ),
  Doc: z.string().describe("Optional documentation for the field").optional(),
  Id: z.number().int().describe("The unique identifier for the field"),
  Name: z.string().describe("The name of the field"),
});

const IcebergSchemaV2Schema = z.object({
  SchemaV2FieldList: z.array(SchemaV2FieldSchema).describe(
    "The schema fields for the table",
  ),
  SchemaV2FieldType: z.enum(["struct"]).describe(
    "The type of the top-level schema, which is always 'struct'",
  ),
  SchemaId: z.number().int().describe(
    "An optional unique identifier for the schema",
  ).optional(),
  IdentifierFieldIds: z.array(z.number().int()).describe(
    "A list of field IDs that are used as the identifier fields for the table. Identifier fields uniquely identify a row in the table.",
  ).optional(),
});

const IcebergPartitionFieldSchema = z.object({
  SourceId: z.number().int().describe("The source column ID to partition on"),
  FieldId: z.number().int().describe(
    "The partition field ID (auto-assigned starting from 1000 if not specified)",
  ).optional(),
  Transform: z.string().describe(
    "The partition transform function (identity, bucket[N], truncate[N], year, month, day, hour)",
  ),
  Name: z.string().describe("The name of the partition field"),
});

const IcebergPartitionSpecSchema = z.object({
  Fields: z.array(IcebergPartitionFieldSchema).describe(
    "List of partition fields",
  ),
  SpecId: z.number().int().describe(
    "The partition spec ID (defaults to 0 if not specified)",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().max(256).describe(
    "Tag value must be between 0 to 256 characters in length. Tag value can only contain alphanumeric characters, spaces, _,., /, =, +, -, and @.",
  ),
  Key: z.string().min(1).max(128).describe(
    "Tag key must be between 1 to 128 characters in length. Tag key cannot start with 'aws:' and can only contain alphanumeric characters, spaces, _,., /, =, +, -, and @.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  WithoutMetadata: z.enum(["Yes"]).describe(
    "Indicates that you don't want to specify a schema for the table. This property is mutually exclusive to 'IcebergMetadata', and its only possible value is 'Yes'.",
  ).optional(),
  StorageClassConfiguration: z.object({
    StorageClass: z.enum(["STANDARD", "INTELLIGENT_TIERING"]).describe(
      "The storage class for the table",
    ).optional(),
  }).describe("Specifies storage class settings for the table").optional(),
  Compaction: z.object({
    Status: z.enum(["enabled", "disabled"]).describe(
      "Indicates whether the Compaction maintenance action is enabled.",
    ).optional(),
    TargetFileSizeMB: z.number().int().min(64).describe(
      "The target file size for the table in MB.",
    ).optional(),
  }).describe(
    "Settings governing the Compaction maintenance action. Contains details about the compaction settings for an Iceberg table.",
  ).optional(),
  Namespace: z.string().describe("The namespace that the table belongs to."),
  TableName: z.string().describe("The name for the table."),
  TableBucketARN: z.string().describe(
    "The Amazon Resource Name (ARN) of the specified table bucket.",
  ),
  OpenTableFormat: z.enum(["ICEBERG"]).describe("Format of the table."),
  IcebergMetadata: z.object({
    IcebergSchema: IcebergSchemaSchema.describe(
      "Schema definition for flat tables with primitive types only. Mutually exclusive with IcebergSchemaV2.",
    ).optional(),
    IcebergSortOrder: IcebergSortOrderSchema.describe(
      "Sort order specification for an Iceberg table",
    ).optional(),
    IcebergSchemaV2: IcebergSchemaV2Schema.describe(
      "Schema definition that supports Apache Iceberg nested types (struct, list, map) and primitive types. Mutually exclusive with IcebergSchema.",
    ).optional(),
    IcebergPartitionSpec: IcebergPartitionSpecSchema.describe(
      "Partition specification for an Iceberg table",
    ).optional(),
    TableProperties: z.record(z.string(), z.string()).describe(
      "Iceberg table properties (e.g., format-version, write.parquet.compression-codec)",
    ).optional(),
  }).describe(
    "Contains details about the metadata for an Iceberg table. Specify either IcebergSchema (for simple flat schemas with primitive types only) or IcebergSchemaV2 (for schemas with nested types like struct, list, map), but not both.",
  ).optional(),
  SnapshotManagement: z.object({
    Status: z.enum(["enabled", "disabled"]).describe(
      "Indicates whether the SnapshotManagement maintenance action is enabled.",
    ).optional(),
    MinSnapshotsToKeep: z.number().int().min(1).describe(
      "The minimum number of snapshots to keep.",
    ).optional(),
    MaxSnapshotAgeHours: z.number().int().min(1).describe(
      "The maximum age of a snapshot before it can be expired.",
    ).optional(),
  }).describe(
    "Contains details about the snapshot management settings for an Iceberg table. A snapshot is expired when it exceeds MinSnapshotsToKeep and MaxSnapshotAgeHours.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "User tags (key-value pairs) to associate with the table.",
  ).optional(),
});

const StateSchema = z.object({
  WithoutMetadata: z.string().optional(),
  StorageClassConfiguration: z.object({
    StorageClass: z.string(),
  }).optional(),
  Compaction: z.object({
    Status: z.string(),
    TargetFileSizeMB: z.number(),
  }).optional(),
  Namespace: z.string().optional(),
  TableName: z.string().optional(),
  TableBucketARN: z.string().optional(),
  VersionToken: z.string().optional(),
  TableARN: z.string(),
  OpenTableFormat: z.string().optional(),
  IcebergMetadata: z.object({
    IcebergSchema: IcebergSchemaSchema,
    IcebergSortOrder: IcebergSortOrderSchema,
    IcebergSchemaV2: IcebergSchemaV2Schema,
    IcebergPartitionSpec: IcebergPartitionSpecSchema,
    TableProperties: z.record(z.string(), z.unknown()),
  }).optional(),
  WarehouseLocation: z.string().optional(),
  SnapshotManagement: z.object({
    Status: z.string(),
    MinSnapshotsToKeep: z.number(),
    MaxSnapshotAgeHours: z.number(),
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
  WithoutMetadata: z.enum(["Yes"]).describe(
    "Indicates that you don't want to specify a schema for the table. This property is mutually exclusive to 'IcebergMetadata', and its only possible value is 'Yes'.",
  ).optional(),
  StorageClassConfiguration: z.object({
    StorageClass: z.enum(["STANDARD", "INTELLIGENT_TIERING"]).describe(
      "The storage class for the table",
    ).optional(),
  }).describe("Specifies storage class settings for the table").optional(),
  Compaction: z.object({
    Status: z.enum(["enabled", "disabled"]).describe(
      "Indicates whether the Compaction maintenance action is enabled.",
    ).optional(),
    TargetFileSizeMB: z.number().int().min(64).describe(
      "The target file size for the table in MB.",
    ).optional(),
  }).describe(
    "Settings governing the Compaction maintenance action. Contains details about the compaction settings for an Iceberg table.",
  ).optional(),
  Namespace: z.string().describe("The namespace that the table belongs to.")
    .optional(),
  TableName: z.string().describe("The name for the table.").optional(),
  TableBucketARN: z.string().describe(
    "The Amazon Resource Name (ARN) of the specified table bucket.",
  ).optional(),
  OpenTableFormat: z.enum(["ICEBERG"]).describe("Format of the table.")
    .optional(),
  IcebergMetadata: z.object({
    IcebergSchema: IcebergSchemaSchema.describe(
      "Schema definition for flat tables with primitive types only. Mutually exclusive with IcebergSchemaV2.",
    ).optional(),
    IcebergSortOrder: IcebergSortOrderSchema.describe(
      "Sort order specification for an Iceberg table",
    ).optional(),
    IcebergSchemaV2: IcebergSchemaV2Schema.describe(
      "Schema definition that supports Apache Iceberg nested types (struct, list, map) and primitive types. Mutually exclusive with IcebergSchema.",
    ).optional(),
    IcebergPartitionSpec: IcebergPartitionSpecSchema.describe(
      "Partition specification for an Iceberg table",
    ).optional(),
    TableProperties: z.record(z.string(), z.string()).describe(
      "Iceberg table properties (e.g., format-version, write.parquet.compression-codec)",
    ).optional(),
  }).describe(
    "Contains details about the metadata for an Iceberg table. Specify either IcebergSchema (for simple flat schemas with primitive types only) or IcebergSchemaV2 (for schemas with nested types like struct, list, map), but not both.",
  ).optional(),
  SnapshotManagement: z.object({
    Status: z.enum(["enabled", "disabled"]).describe(
      "Indicates whether the SnapshotManagement maintenance action is enabled.",
    ).optional(),
    MinSnapshotsToKeep: z.number().int().min(1).describe(
      "The minimum number of snapshots to keep.",
    ).optional(),
    MaxSnapshotAgeHours: z.number().int().min(1).describe(
      "The maximum age of a snapshot before it can be expired.",
    ).optional(),
  }).describe(
    "Contains details about the snapshot management settings for an Iceberg table. A snapshot is expired when it exceeds MinSnapshotsToKeep and MaxSnapshotAgeHours.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "User tags (key-value pairs) to associate with the table.",
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

/** Swamp extension model for S3Tables Table. Registered at `@swamp/aws/s3tables/table`. */
export const model = {
  type: "@swamp/aws/s3tables/table",
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
      description: "S3Tables Table resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3Tables Table",
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
          "AWS::S3Tables::Table",
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
      description: "Get a S3Tables Table",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Tables Table",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::S3Tables::Table",
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
      description: "Update a S3Tables Table",
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
        const identifier = existing.TableARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::S3Tables::Table",
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
          "AWS::S3Tables::Table",
          identifier,
          currentState,
          desiredState,
          [
            "TableBucketARN",
            "OpenTableFormat",
            "IcebergMetadata",
            "WithoutMetadata",
            "StorageClassConfiguration",
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
      description: "Delete a S3Tables Table",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Tables Table",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::S3Tables::Table",
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
      description: "Sync S3Tables Table state from AWS",
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
        const identifier = existing.TableARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::S3Tables::Table",
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
