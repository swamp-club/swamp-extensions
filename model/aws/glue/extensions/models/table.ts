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

// Auto-generated extension model for @swamp/aws/glue/table
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Table (AWS::Glue::Table).
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
    "Indicates that the column is sorted in ascending order (==1), or in descending order (==0).",
  ),
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
    "A list of names of columns that contain skewed values.",
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
    "Must be specified if the table contains any dimension columns.",
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

const TableIdentifierSchema = z.object({
  DatabaseName: z.string().describe(
    "The name of the catalog database that contains the target table.",
  ).optional(),
  Region: z.string().describe("The Region of the table.").optional(),
  CatalogId: z.string().describe(
    "The ID of the Data Catalog in which the table resides.",
  ).optional(),
  Name: z.string().describe("The name of the target table.").optional(),
});

const ViewRepresentationSchema = z.object({
  Dialect: z.string().describe("The dialect of the view representation.")
    .optional(),
  DialectVersion: z.string().describe("The version of the dialect.").optional(),
  ViewOriginalText: z.string().describe("The original text of the view.")
    .optional(),
  ViewExpandedText: z.string().describe("The expanded text of the view.")
    .optional(),
  ValidationConnection: z.string().describe(
    "The connection used for validation.",
  ).optional(),
});

const ViewDefinitionSchema = z.object({
  IsProtected: z.boolean().describe("Indicates whether the view is protected.")
    .optional(),
  Definer: z.string().describe("The definer of the view.").optional(),
  SubObjects: z.array(z.string()).describe("The sub-objects of the view.")
    .optional(),
  Representations: z.array(ViewRepresentationSchema).describe(
    "The representations of the view.",
  ).optional(),
});

const IcebergStructFieldSchema = z.object({
  Id: z.number().int().describe("The field ID."),
  Name: z.string().describe("The field name."),
  Type: z.string().describe("The field type."),
  Required: z.boolean().describe("Whether the field is required."),
  Doc: z.string().describe("Documentation for the field.").optional(),
});

const IcebergSchemaSchema = z.object({
  SchemaId: z.number().int().describe("The schema ID.").optional(),
  IdentifierFieldIds: z.array(z.number().int()).describe(
    "The identifier field IDs.",
  ).optional(),
  Type: z.string().describe("The type of the schema.").optional(),
  Fields: z.array(IcebergStructFieldSchema).describe(
    "The fields in the schema.",
  ),
});

const IcebergPartitionFieldSchema = z.object({
  SourceId: z.number().int().describe("The source field ID."),
  Transform: z.string().describe("The transform to apply."),
  Name: z.string().describe("The partition field name."),
  FieldId: z.number().int().describe("The partition field ID.").optional(),
});

const IcebergPartitionSpecSchema = z.object({
  Fields: z.array(IcebergPartitionFieldSchema).describe(
    "The partition fields.",
  ),
  SpecId: z.number().int().describe("The spec ID.").optional(),
});

const IcebergSortFieldSchema = z.object({
  SourceId: z.number().int().describe("The source field ID."),
  Transform: z.string().describe("The transform to apply."),
  Direction: z.string().describe("The sort direction."),
  NullOrder: z.string().describe("The null ordering."),
});

const IcebergSortOrderSchema = z.object({
  OrderId: z.number().int().describe("The order ID."),
  Fields: z.array(IcebergSortFieldSchema).describe("The sort fields."),
});

const IcebergTableInputSchema = z.object({
  Location: z.string().describe("The location of the Iceberg table."),
  Schema: IcebergSchemaSchema.describe("The schema for the Iceberg table."),
  PartitionSpec: IcebergPartitionSpecSchema.describe(
    "The partition spec for the Iceberg table.",
  ).optional(),
  WriteOrder: IcebergSortOrderSchema.describe(
    "The write order for the Iceberg table.",
  ).optional(),
  Properties: z.record(z.string(), z.string()).describe(
    "The properties for the Iceberg table.",
  ).optional(),
});

const IcebergInputSchema = z.object({
  MetadataOperation: z.string().describe(
    "A required metadata operation. Can only be set to CREATE.",
  ).optional(),
  Version: z.string().describe(
    "The table version of the Iceberg table. Defaults to 2.",
  ).optional(),
  IcebergTableInput: IcebergTableInputSchema.describe(
    "Specifies the Iceberg table configuration.",
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
    "The name of the database where the table metadata resides. For Hive compatibility, this must be all lowercase.",
  ),
  TableInput: z.object({
    Owner: z.string().describe(
      "The table owner. Included for Apache Hive compatibility. Not used in the normal course of AWS Glue operations.",
    ).optional(),
    ViewOriginalText: z.string().describe(
      "Included for Apache Hive compatibility. Not used in the normal course of AWS Glue operations.",
    ).optional(),
    Description: z.string().describe("A description of the table.").optional(),
    TableType: z.string().describe(
      "The type of this table. AWS Glue will create tables with the EXTERNAL_TABLE type. Other services, such as Athena, may create tables with additional table types.",
    ).optional(),
    Parameters: z.record(z.string(), z.unknown()).describe(
      "These key-value pairs define properties associated with the table.",
    ).optional(),
    ViewExpandedText: z.string().describe(
      "Included for Apache Hive compatibility. Not used in the normal course of AWS Glue operations.",
    ).optional(),
    StorageDescriptor: StorageDescriptorSchema.describe(
      "A storage descriptor containing information about the physical storage of this table.",
    ).optional(),
    TargetTable: TableIdentifierSchema.describe(
      "A TableIdentifier structure that describes a target table for resource linking.",
    ).optional(),
    PartitionKeys: z.array(ColumnSchema).describe(
      "A list of columns by which the table is partitioned. Only primitive types are supported as partition keys.",
    ).optional(),
    Retention: z.number().int().describe("The retention time for this table.")
      .optional(),
    Name: z.string().describe(
      "The table name. For Hive compatibility, this is folded to lowercase when it is stored.",
    ).optional(),
    ViewDefinition: ViewDefinitionSchema.describe(
      "The view definition for the table.",
    ).optional(),
  }).describe("A structure used to define a table.").optional(),
  OpenTableFormatInput: z.object({
    IcebergInput: IcebergInputSchema.describe(
      "Specifies an IcebergInput structure that defines an Apache Iceberg metadata table.",
    ).optional(),
  }).describe(
    "Specifies an OpenTableFormatInput structure when creating an open format table.",
  ).optional(),
  CatalogId: z.string().describe(
    "The ID of the Data Catalog in which to create the Table.",
  ),
  Name: z.string().describe(
    "The table name. For Hive compatibility, this is folded to lowercase when it is stored.",
  ).optional(),
});

const StateSchema = z.object({
  DatabaseName: z.string(),
  TableInput: z.object({
    Owner: z.string(),
    ViewOriginalText: z.string(),
    Description: z.string(),
    TableType: z.string(),
    Parameters: z.record(z.string(), z.unknown()),
    ViewExpandedText: z.string(),
    StorageDescriptor: StorageDescriptorSchema,
    TargetTable: TableIdentifierSchema,
    PartitionKeys: z.array(ColumnSchema),
    Retention: z.number(),
    Name: z.string(),
    ViewDefinition: ViewDefinitionSchema,
  }).optional(),
  OpenTableFormatInput: z.object({
    IcebergInput: IcebergInputSchema,
  }).optional(),
  CatalogId: z.string(),
  Name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DatabaseName: z.string().describe(
    "The name of the database where the table metadata resides. For Hive compatibility, this must be all lowercase.",
  ).optional(),
  TableInput: z.object({
    Owner: z.string().describe(
      "The table owner. Included for Apache Hive compatibility. Not used in the normal course of AWS Glue operations.",
    ).optional(),
    ViewOriginalText: z.string().describe(
      "Included for Apache Hive compatibility. Not used in the normal course of AWS Glue operations.",
    ).optional(),
    Description: z.string().describe("A description of the table.").optional(),
    TableType: z.string().describe(
      "The type of this table. AWS Glue will create tables with the EXTERNAL_TABLE type. Other services, such as Athena, may create tables with additional table types.",
    ).optional(),
    Parameters: z.record(z.string(), z.unknown()).describe(
      "These key-value pairs define properties associated with the table.",
    ).optional(),
    ViewExpandedText: z.string().describe(
      "Included for Apache Hive compatibility. Not used in the normal course of AWS Glue operations.",
    ).optional(),
    StorageDescriptor: StorageDescriptorSchema.describe(
      "A storage descriptor containing information about the physical storage of this table.",
    ).optional(),
    TargetTable: TableIdentifierSchema.describe(
      "A TableIdentifier structure that describes a target table for resource linking.",
    ).optional(),
    PartitionKeys: z.array(ColumnSchema).describe(
      "A list of columns by which the table is partitioned. Only primitive types are supported as partition keys.",
    ).optional(),
    Retention: z.number().int().describe("The retention time for this table.")
      .optional(),
    Name: z.string().describe(
      "The table name. For Hive compatibility, this is folded to lowercase when it is stored.",
    ).optional(),
    ViewDefinition: ViewDefinitionSchema.describe(
      "The view definition for the table.",
    ).optional(),
  }).describe("A structure used to define a table.").optional(),
  OpenTableFormatInput: z.object({
    IcebergInput: IcebergInputSchema.describe(
      "Specifies an IcebergInput structure that defines an Apache Iceberg metadata table.",
    ).optional(),
  }).describe(
    "Specifies an OpenTableFormatInput structure when creating an open format table.",
  ).optional(),
  CatalogId: z.string().describe(
    "The ID of the Data Catalog in which to create the Table.",
  ).optional(),
  Name: z.string().describe(
    "The table name. For Hive compatibility, this is folded to lowercase when it is stored.",
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

/** Swamp extension model for Glue Table. Registered at `@swamp/aws/glue/table`. */
export const model = {
  type: "@swamp/aws/glue/table",
  version: "2026.10.08.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Glue Table resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Table",
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
          "AWS::Glue::Table",
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
      description: "Get a Glue Table",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Table",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Table",
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
      description: "Update a Glue Table",
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
          existing.Name?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Glue::Table",
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
          "AWS::Glue::Table",
          identifier,
          currentState,
          desiredState,
          ["DatabaseName", "CatalogId", "Name", "Name"],
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
      description: "Delete a Glue Table",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Table",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Table",
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
      description: "Sync Glue Table state from AWS",
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
          existing.Name?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Glue::Table",
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
      description: "List Glue Table resources",
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
        const { items, nextToken } = await listResources("AWS::Glue::Table", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
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
