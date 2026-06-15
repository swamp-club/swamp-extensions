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

// Auto-generated extension model for @swamp/aws/lakeformation/principal-permissions
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for LakeFormation PrincipalPermissions (AWS::LakeFormation::PrincipalPermissions).
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

const DatabaseResourceSchema = z.object({
  CatalogId: z.string().min(12).max(12).describe(
    "The identifier for the Data Catalog. By default, it is the account ID of the caller.",
  ),
  Name: z.string().min(1).max(255).describe(
    "The name of the database resource. Unique to the Data Catalog.",
  ),
});

const TableResourceSchema = z.object({
  CatalogId: z.string().min(12).max(12).describe(
    "The identifier for the Data Catalog. By default, it is the account ID of the caller.",
  ),
  DatabaseName: z.string().min(1).max(255).describe(
    "The name of the database for the table. Unique to a Data Catalog. A database is a set of associated table definitions organized into a logical group. You can Grant and Revoke database privileges to a principal.",
  ),
  Name: z.string().min(1).max(255).describe("The name of the table.")
    .optional(),
  TableWildcard: z.record(z.string(), z.unknown()).describe(
    "A wildcard object representing every table under a database. At least one of TableResource$Name or TableResource$TableWildcard is required.",
  ).optional(),
});

const ColumnWildcardSchema = z.object({
  ExcludedColumnNames: z.array(z.string().min(1).max(255)).describe(
    "Excludes column names. Any column with this name will be excluded.",
  ).optional(),
});

const TableWithColumnsResourceSchema = z.object({
  CatalogId: z.string().min(12).max(12).describe(
    "The identifier for the GLUDC where the location is registered with LFlong.",
  ),
  DatabaseName: z.string().min(1).max(255).describe(
    "The name of the database for the table with columns resource. Unique to the Data Catalog. A database is a set of associated table definitions organized into a logical group. You can Grant and Revoke database privileges to a principal.",
  ),
  Name: z.string().min(1).max(255).describe(
    "The name of the table resource. A table is a metadata definition that represents your data. You can Grant and Revoke table privileges to a principal.",
  ),
  ColumnNames: z.array(z.string().min(1).max(255)).describe(
    "The list of column names for the table. At least one of ColumnNames or ColumnWildcard is required.",
  ).optional(),
  ColumnWildcard: ColumnWildcardSchema.describe(
    "A wildcard specified by a ColumnWildcard object. At least one of ColumnNames or ColumnWildcard is required.",
  ).optional(),
});

const DataLocationResourceSchema = z.object({
  CatalogId: z.string().min(12).max(12).describe(
    "The identifier for the GLUDC where the location is registered with LFlong.",
  ),
  ResourceArn: z.string().describe(
    "The Amazon Resource Name (ARN) that uniquely identifies the data location resource.",
  ),
});

const DataCellsFilterResourceSchema = z.object({
  TableCatalogId: z.string().min(12).max(12).describe(
    "The ID of the catalog to which the table belongs.",
  ),
  DatabaseName: z.string().min(1).max(255).describe("A database in the GLUDC."),
  TableName: z.string().min(1).max(255).describe("The name of the table."),
  Name: z.string().min(1).max(255).describe(
    "The name given by the user to the data filter cell.",
  ),
});

const LFTagKeyResourceSchema = z.object({
  CatalogId: z.string().min(12).max(12).describe(
    "The identifier for the GLUDC where the location is registered with GLUDC.",
  ),
  TagKey: z.string().min(1).max(255).describe("The key-name for the LF-tag."),
  TagValues: z.array(z.string().min(0).max(256)).describe(
    "A list of possible values for the corresponding TagKey of an LF-tag key-value pair.",
  ),
});

const LFTagSchema = z.object({
  TagKey: z.string().min(1).max(128).describe("The key-name for the LF-tag.")
    .optional(),
  TagValues: z.array(z.string().min(0).max(256)).describe(
    "A list of possible values of the corresponding TagKey of an LF-tag key-value pair.",
  ).optional(),
});

const LFTagPolicyResourceSchema = z.object({
  CatalogId: z.string().min(12).max(12).describe(
    "The identifier for the GLUDC. The GLUDC is the persistent metadata store. It contains database definitions, table definitions, and other control information to manage your LFlong environment.",
  ),
  ResourceType: z.enum(["DATABASE", "TABLE"]).describe(
    "The resource type for which the LF-tag policy applies.",
  ),
  Expression: z.array(LFTagSchema).describe(
    "A list of LF-tag conditions that apply to the resource's LF-tag policy.",
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
  Catalog: z.string().min(12).max(12).describe(
    "The identifier for the GLUDC. By default, the account ID. The GLUDC is the persistent metadata store. It contains database definitions, table definitions, and other control information to manage your Lake Formation environment.",
  ).optional(),
  Principal: z.object({
    DataLakePrincipalIdentifier: z.string().min(1).max(255).describe(
      "An identifier for the LFlong principal.",
    ).optional(),
  }).describe("The principal to be granted a permission."),
  Resource: z.object({
    Catalog: z.record(z.string(), z.unknown()).describe(
      "The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information to manage your LFlong environment.",
    ).optional(),
    Database: DatabaseResourceSchema.describe(
      "The database for the resource. Unique to the Data Catalog. A database is a set of associated table definitions organized into a logical group. You can Grant and Revoke database permissions to a principal.",
    ).optional(),
    Table: TableResourceSchema.describe(
      "The table for the resource. A table is a metadata definition that represents your data. You can Grant and Revoke table privileges to a principal.",
    ).optional(),
    TableWithColumns: TableWithColumnsResourceSchema.describe(
      "The table with columns for the resource. A principal with permissions to this resource can select metadata from the columns of a table in the Data Catalog and the underlying data in Amazon S3.",
    ).optional(),
    DataLocation: DataLocationResourceSchema.describe(
      "The location of an Amazon S3 path where permissions are granted or revoked.",
    ).optional(),
    DataCellsFilter: DataCellsFilterResourceSchema.describe(
      "A data cell filter.",
    ).optional(),
    LFTag: LFTagKeyResourceSchema.describe(
      "The LF-tag key and values attached to a resource.",
    ).optional(),
    LFTagPolicy: LFTagPolicyResourceSchema.describe(
      "A list of LF-tag conditions that define a resource's LF-tag policy.",
    ).optional(),
  }).describe("The resource to be granted or revoked permissions."),
  Permissions: z.array(
    z.enum([
      "ALL",
      "SELECT",
      "ALTER",
      "DROP",
      "DELETE",
      "INSERT",
      "DESCRIBE",
      "CREATE_DATABASE",
      "CREATE_TABLE",
      "DATA_LOCATION_ACCESS",
      "CREATE_LF_TAG",
      "ASSOCIATE",
      "GRANT_WITH_LF_TAG_EXPRESSION",
    ]),
  ).describe("The permissions granted or revoked."),
  PermissionsWithGrantOption: z.array(
    z.enum([
      "ALL",
      "SELECT",
      "ALTER",
      "DROP",
      "DELETE",
      "INSERT",
      "DESCRIBE",
      "CREATE_DATABASE",
      "CREATE_TABLE",
      "DATA_LOCATION_ACCESS",
      "CREATE_LF_TAG",
      "ASSOCIATE",
      "GRANT_WITH_LF_TAG_EXPRESSION",
    ]),
  ).describe(
    "Indicates the ability to grant permissions (as a subset of permissions granted).",
  ),
});

const StateSchema = z.object({
  Catalog: z.string().optional(),
  Principal: z.object({
    DataLakePrincipalIdentifier: z.string(),
  }).optional(),
  Resource: z.object({
    Catalog: z.record(z.string(), z.unknown()),
    Database: DatabaseResourceSchema,
    Table: TableResourceSchema,
    TableWithColumns: TableWithColumnsResourceSchema,
    DataLocation: DataLocationResourceSchema,
    DataCellsFilter: DataCellsFilterResourceSchema,
    LFTag: LFTagKeyResourceSchema,
    LFTagPolicy: LFTagPolicyResourceSchema,
  }).optional(),
  Permissions: z.array(z.string()).optional(),
  PermissionsWithGrantOption: z.array(z.string()).optional(),
  PrincipalIdentifier: z.string(),
  ResourceIdentifier: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Catalog: z.string().min(12).max(12).describe(
    "The identifier for the GLUDC. By default, the account ID. The GLUDC is the persistent metadata store. It contains database definitions, table definitions, and other control information to manage your Lake Formation environment.",
  ).optional(),
  Principal: z.object({
    DataLakePrincipalIdentifier: z.string().min(1).max(255).describe(
      "An identifier for the LFlong principal.",
    ).optional(),
  }).describe("The principal to be granted a permission.").optional(),
  Resource: z.object({
    Catalog: z.record(z.string(), z.unknown()).describe(
      "The identifier for the Data Catalog. By default, the account ID. The Data Catalog is the persistent metadata store. It contains database definitions, table definitions, and other control information to manage your LFlong environment.",
    ).optional(),
    Database: DatabaseResourceSchema.describe(
      "The database for the resource. Unique to the Data Catalog. A database is a set of associated table definitions organized into a logical group. You can Grant and Revoke database permissions to a principal.",
    ).optional(),
    Table: TableResourceSchema.describe(
      "The table for the resource. A table is a metadata definition that represents your data. You can Grant and Revoke table privileges to a principal.",
    ).optional(),
    TableWithColumns: TableWithColumnsResourceSchema.describe(
      "The table with columns for the resource. A principal with permissions to this resource can select metadata from the columns of a table in the Data Catalog and the underlying data in Amazon S3.",
    ).optional(),
    DataLocation: DataLocationResourceSchema.describe(
      "The location of an Amazon S3 path where permissions are granted or revoked.",
    ).optional(),
    DataCellsFilter: DataCellsFilterResourceSchema.describe(
      "A data cell filter.",
    ).optional(),
    LFTag: LFTagKeyResourceSchema.describe(
      "The LF-tag key and values attached to a resource.",
    ).optional(),
    LFTagPolicy: LFTagPolicyResourceSchema.describe(
      "A list of LF-tag conditions that define a resource's LF-tag policy.",
    ).optional(),
  }).describe("The resource to be granted or revoked permissions.").optional(),
  Permissions: z.array(
    z.enum([
      "ALL",
      "SELECT",
      "ALTER",
      "DROP",
      "DELETE",
      "INSERT",
      "DESCRIBE",
      "CREATE_DATABASE",
      "CREATE_TABLE",
      "DATA_LOCATION_ACCESS",
      "CREATE_LF_TAG",
      "ASSOCIATE",
      "GRANT_WITH_LF_TAG_EXPRESSION",
    ]),
  ).describe("The permissions granted or revoked.").optional(),
  PermissionsWithGrantOption: z.array(
    z.enum([
      "ALL",
      "SELECT",
      "ALTER",
      "DROP",
      "DELETE",
      "INSERT",
      "DESCRIBE",
      "CREATE_DATABASE",
      "CREATE_TABLE",
      "DATA_LOCATION_ACCESS",
      "CREATE_LF_TAG",
      "ASSOCIATE",
      "GRANT_WITH_LF_TAG_EXPRESSION",
    ]),
  ).describe(
    "Indicates the ability to grant permissions (as a subset of permissions granted).",
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

/** Swamp extension model for LakeFormation PrincipalPermissions. Registered at `@swamp/aws/lakeformation/principal-permissions`. */
export const model = {
  type: "@swamp/aws/lakeformation/principal-permissions",
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
      toVersion: "2026.05.27.1",
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
      description: "LakeFormation PrincipalPermissions resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a LakeFormation PrincipalPermissions",
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
          "AWS::LakeFormation::PrincipalPermissions",
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
      description: "Get a LakeFormation PrincipalPermissions",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LakeFormation PrincipalPermissions",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::LakeFormation::PrincipalPermissions",
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
    delete: {
      description: "Delete a LakeFormation PrincipalPermissions",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LakeFormation PrincipalPermissions",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::LakeFormation::PrincipalPermissions",
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
      description: "Sync LakeFormation PrincipalPermissions state from AWS",
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
          existing.PrincipalIdentifier?.toString(),
          existing.ResourceIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::LakeFormation::PrincipalPermissions",
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
