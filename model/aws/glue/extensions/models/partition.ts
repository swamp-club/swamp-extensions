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

// Auto-generated extension model for @swamp/aws/glue/partition
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Partition (AWS::Glue::Partition).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const ColumnSchema = z.object({
  Comment: z.string().describe("A free-form text comment.").optional(),
  Type: z.string().describe("The data type of the Column.").optional(),
  Name: z.string().describe("The name of the Column."),
});

const SerdeInfoSchema = z.object({
  Parameters: z.record(z.string(), z.unknown()).describe(
    "These key-value pairs define initialization parameters for the SerDe.",
  ).optional(),
  SerializationLibrary: z.string().describe(
    "Usually the class that implements the SerDe. An example is org.apache.hadoop.hive.serde2.columnar.ColumnarSerDe.",
  ).optional(),
  Name: z.string().describe("Name of the SerDe.").optional(),
});

const OrderSchema = z.object({
  Column: z.string().describe("The name of the column."),
  SortOrder: z.number().int().describe(
    "Indicates that the column is sorted in ascending order (== 1), or in descending order (==0).",
  ).optional(),
});

const SchemaIdSchema = z.object({
  RegistryName: z.string().describe(
    "The name of the schema registry that contains the schema.",
  ).optional(),
  SchemaName: z.string().describe(
    "The name of the schema. One of SchemaArn or SchemaName has to be provided.",
  ).optional(),
  SchemaArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the schema. One of SchemaArn or SchemaName has to be provided.",
  ).optional(),
});

const SchemaReferenceSchema = z.object({
  SchemaId: SchemaIdSchema.describe(
    "A structure that contains schema identity fields. Either this or the SchemaVersionId has to be provided.",
  ).optional(),
  SchemaVersionId: z.string().describe(
    "The unique ID assigned to a version of the schema. Either this or the SchemaId has to be provided.",
  ).optional(),
  SchemaVersionNumber: z.number().int().describe(
    "The version number of the schema.",
  ).optional(),
});

const SkewedInfoSchema = z.object({
  SkewedColumnValues: z.array(z.string()).describe(
    "A list of names of columns that contain skewed values.",
  ).optional(),
  SkewedColumnValueLocationMaps: z.record(z.string(), z.unknown()).describe(
    "A mapping of skewed values to the columns that contain them.",
  ).optional(),
  SkewedColumnNames: z.array(z.string()).describe(
    "A list of values that appear so frequently as to be considered skewed.",
  ).optional(),
});

const StorageDescriptorSchema = z.object({
  StoredAsSubDirectories: z.boolean().describe(
    "True if the table data is stored in subdirectories, or False if not.",
  ).optional(),
  Parameters: z.record(z.string(), z.unknown()).describe(
    "The user-supplied properties in key-value form.",
  ).optional(),
  BucketColumns: z.array(z.string()).describe(
    "A list of reducer grouping columns, clustering columns, and bucketing columns in the table.",
  ).optional(),
  NumberOfBuckets: z.number().int().describe(
    "The number of buckets. You must specify this property if the partition contains any dimension columns.",
  ).optional(),
  OutputFormat: z.string().describe(
    "The output format: SequenceFileOutputFormat (binary), or IgnoreKeyTextOutputFormat, or a custom format.",
  ).optional(),
  Columns: z.array(ColumnSchema).describe("A list of the Columns in the table.")
    .optional(),
  SerdeInfo: SerdeInfoSchema.describe(
    "The serialization/deserialization (SerDe) information.",
  ).optional(),
  SortColumns: z.array(OrderSchema).describe(
    "A list specifying the sort order of each bucket in the table.",
  ).optional(),
  Compressed: z.boolean().describe(
    "True if the data in the table is compressed, or False if not.",
  ).optional(),
  SchemaReference: SchemaReferenceSchema.describe(
    "An object that references a schema stored in the AWS Glue Schema Registry.",
  ).optional(),
  SkewedInfo: SkewedInfoSchema.describe(
    "The information about values that appear frequently in a column (skewed values).",
  ).optional(),
  InputFormat: z.string().describe(
    "The input format: SequenceFileInputFormat (binary), or TextInputFormat, or a custom format.",
  ).optional(),
  Location: z.string().describe(
    "The physical location of the table. By default, this takes the form of the warehouse location, followed by the database location in the warehouse, followed by the table name.",
  ).optional(),
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
  DatabaseName: z.string().describe(
    "The AWS account ID of the catalog in which the partion is to be created.",
  ),
  TableName: z.string().describe(
    "The name of the metadata table in which the partition is to be created.",
  ),
  CatalogId: z.string().describe(
    "The name of the catalog database in which to create the partition.",
  ),
  PartitionInput: z.object({
    StorageDescriptor: StorageDescriptorSchema.describe(
      "Provides information about the physical location where the partition is stored.",
    ).optional(),
    Values: z.array(z.string()).describe(
      "The values of the partition. Although this parameter is not required by the SDK, you must specify this parameter for a valid input. The values for the keys for the new partition must be passed as an array of String objects that must be ordered in the same order as the partition keys appearing in the Amazon S3 prefix. Otherwise AWS Glue will add the values to the wrong keys.",
    ),
    Parameters: z.record(z.string(), z.unknown()).describe(
      "Key-value pairs defining partition parameters.",
    ).optional(),
  }).describe("The structure used to create and update a partition."),
});

const StateSchema = z.object({
  DatabaseName: z.string(),
  TableName: z.string(),
  CatalogId: z.string(),
  PartitionInput: z.object({
    StorageDescriptor: StorageDescriptorSchema,
    Values: z.array(z.string()),
    Parameters: z.record(z.string(), z.unknown()),
  }).optional(),
  IdentifierPartitionInputValues: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DatabaseName: z.string().describe(
    "The AWS account ID of the catalog in which the partion is to be created.",
  ).optional(),
  TableName: z.string().describe(
    "The name of the metadata table in which the partition is to be created.",
  ).optional(),
  CatalogId: z.string().describe(
    "The name of the catalog database in which to create the partition.",
  ).optional(),
  PartitionInput: z.object({
    StorageDescriptor: StorageDescriptorSchema.describe(
      "Provides information about the physical location where the partition is stored.",
    ).optional(),
    Values: z.array(z.string()).describe(
      "The values of the partition. Although this parameter is not required by the SDK, you must specify this parameter for a valid input. The values for the keys for the new partition must be passed as an array of String objects that must be ordered in the same order as the partition keys appearing in the Amazon S3 prefix. Otherwise AWS Glue will add the values to the wrong keys.",
    ).optional(),
    Parameters: z.record(z.string(), z.unknown()).describe(
      "Key-value pairs defining partition parameters.",
    ).optional(),
  }).describe("The structure used to create and update a partition.")
    .optional(),
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

/** Swamp extension model for Glue Partition. Registered at `@swamp/aws/glue/partition`. */
export const model = {
  type: "@swamp/aws/glue/partition",
  version: "2026.09.23.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Glue Partition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Partition",
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
          "AWS::Glue::Partition",
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
      description: "Get a Glue Partition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Partition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Partition",
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
      description: "Update a Glue Partition",
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
          existing.CatalogId?.toString(),
          existing.DatabaseName?.toString(),
          existing.TableName?.toString(),
          existing.IdentifierPartitionInputValues?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Glue::Partition",
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
          "AWS::Glue::Partition",
          identifier,
          currentState,
          desiredState,
          ["TableName", "DatabaseName", "CatalogId", "Values"],
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
      description: "Delete a Glue Partition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Partition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Partition",
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
      description: "Sync Glue Partition state from AWS",
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
          existing.CatalogId?.toString(),
          existing.DatabaseName?.toString(),
          existing.TableName?.toString(),
          existing.IdentifierPartitionInputValues?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Glue::Partition",
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
      description: "List Glue Partition resources",
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
        const { items, nextToken } = await listResources(
          "AWS::Glue::Partition",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
