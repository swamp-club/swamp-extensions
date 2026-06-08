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

// Auto-generated extension model for @swamp/aws/databrew/job
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataBrew Job (AWS::DataBrew::Job).
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

const CsvOutputOptionsSchema = z.object({
  Delimiter: z.string().min(1).max(1).optional(),
});

const OutputFormatOptionsSchema = z.object({
  Csv: CsvOutputOptionsSchema.describe("Output Csv options").optional(),
});

const S3LocationSchema = z.object({
  Bucket: z.string(),
  Key: z.string().optional(),
  BucketOwner: z.string().min(12).max(12).optional(),
});

const OutputSchema = z.object({
  CompressionFormat: z.enum([
    "GZIP",
    "LZ4",
    "SNAPPY",
    "BZIP2",
    "DEFLATE",
    "LZO",
    "BROTLI",
    "ZSTD",
    "ZLIB",
  ]).optional(),
  Format: z.enum([
    "CSV",
    "JSON",
    "PARQUET",
    "GLUEPARQUET",
    "AVRO",
    "ORC",
    "XML",
    "TABLEAUHYPER",
  ]).optional(),
  FormatOptions: OutputFormatOptionsSchema.describe(
    "Format options for job Output",
  ).optional(),
  PartitionColumns: z.array(z.string()).optional(),
  Location: S3LocationSchema.describe("S3 Output location"),
  Overwrite: z.boolean().optional(),
  MaxOutputFiles: z.number().int().min(1).max(999).optional(),
});

const S3TableOutputOptionsSchema = z.object({
  Location: S3LocationSchema.describe("S3 Output location"),
});

const DatabaseTableOutputOptionsSchema = z.object({
  TempDirectory: S3LocationSchema.describe("S3 Output location").optional(),
  TableName: z.string().min(1).max(255),
});

const DataCatalogOutputSchema = z.object({
  CatalogId: z.string().min(1).max(255).optional(),
  DatabaseName: z.string().min(1).max(255),
  TableName: z.string().min(1).max(255),
  S3Options: S3TableOutputOptionsSchema.optional(),
  DatabaseOptions: DatabaseTableOutputOptionsSchema.optional(),
  Overwrite: z.boolean().optional(),
});

const DatabaseOutputSchema = z.object({
  GlueConnectionName: z.string().describe("Glue connection name"),
  DatabaseOutputMode: z.enum(["NEW_TABLE"]).describe("Database table name")
    .optional(),
  DatabaseOptions: DatabaseTableOutputOptionsSchema,
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const StatisticOverrideSchema = z.object({
  Statistic: z.string().min(1).max(128).regex(new RegExp("^[A-Z\\_]+$")),
  Parameters: z.record(z.string(), z.string()),
});

const StatisticsConfigurationSchema = z.object({
  IncludedStatistics: z.array(
    z.string().min(1).max(128).regex(new RegExp("^[A-Z\\_]+$")),
  ).optional(),
  Overrides: z.array(StatisticOverrideSchema).optional(),
});

const ColumnSelectorSchema = z.object({
  Regex: z.string().min(1).max(255).optional(),
  Name: z.string().min(1).max(255).optional(),
});

const ColumnStatisticsConfigurationSchema = z.object({
  Selectors: z.array(ColumnSelectorSchema).optional(),
  Statistics: StatisticsConfigurationSchema,
});

const AllowedStatisticsSchema = z.object({
  Statistics: z.array(
    z.string().min(1).max(128).regex(new RegExp("^[A-Z\\_]+$")),
  ),
});

const EntityDetectorConfigurationSchema = z.object({
  EntityTypes: z.array(
    z.string().min(1).max(128).regex(new RegExp("^[A-Z_][A-Z\\\\d_]*$")),
  ),
  AllowedStatistics: AllowedStatisticsSchema.optional(),
});

const ValidationConfigurationSchema = z.object({
  RulesetArn: z.string().min(20).max(2048).describe("Arn of the Ruleset"),
  ValidationMode: z.enum(["CHECK_ALL"]).optional(),
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
  DatasetName: z.string().min(1).max(255).describe("Dataset name").optional(),
  EncryptionKeyArn: z.string().min(20).max(2048).describe("Encryption Key Arn")
    .optional(),
  EncryptionMode: z.enum(["SSE-KMS", "SSE-S3"]).describe("Encryption mode")
    .optional(),
  Name: z.string().min(1).max(255).describe("Job name"),
  Type: z.enum(["PROFILE", "RECIPE"]).describe("Job type"),
  LogSubscription: z.enum(["ENABLE", "DISABLE"]).describe("Log subscription")
    .optional(),
  MaxCapacity: z.number().int().describe("Max capacity").optional(),
  MaxRetries: z.number().int().describe("Max retries").optional(),
  Outputs: z.array(OutputSchema).optional(),
  DataCatalogOutputs: z.array(DataCatalogOutputSchema).optional(),
  DatabaseOutputs: z.array(DatabaseOutputSchema).optional(),
  OutputLocation: z.object({
    Bucket: z.string(),
    Key: z.string().optional(),
    BucketOwner: z.string().min(12).max(12).optional(),
  }).describe("Output location").optional(),
  ProjectName: z.string().min(1).max(255).describe("Project name").optional(),
  Recipe: z.object({
    Name: z.string().describe("Recipe name"),
    Version: z.string().describe("Recipe version").optional(),
  }).optional(),
  RoleArn: z.string().describe("Role arn"),
  Tags: z.array(TagSchema).optional(),
  Timeout: z.number().int().describe("Timeout").optional(),
  JobSample: z.object({
    Mode: z.enum(["FULL_DATASET", "CUSTOM_ROWS"]).describe(
      "Sample configuration mode for profile jobs.",
    ).optional(),
    Size: z.number().int().describe(
      "Sample configuration size for profile jobs.",
    ).optional(),
  }).describe("Job Sample").optional(),
  ProfileConfiguration: z.object({
    DatasetStatisticsConfiguration: StatisticsConfigurationSchema.optional(),
    ProfileColumns: z.array(ColumnSelectorSchema).optional(),
    ColumnStatisticsConfigurations: z.array(ColumnStatisticsConfigurationSchema)
      .optional(),
    EntityDetectorConfiguration: EntityDetectorConfigurationSchema.optional(),
  }).describe("Profile Job configuration").optional(),
  ValidationConfigurations: z.array(ValidationConfigurationSchema).describe(
    "Data quality rules configuration",
  ).optional(),
});

const StateSchema = z.object({
  DatasetName: z.string().optional(),
  EncryptionKeyArn: z.string().optional(),
  EncryptionMode: z.string().optional(),
  Name: z.string(),
  Type: z.string().optional(),
  LogSubscription: z.string().optional(),
  MaxCapacity: z.number().optional(),
  MaxRetries: z.number().optional(),
  Outputs: z.array(OutputSchema).optional(),
  DataCatalogOutputs: z.array(DataCatalogOutputSchema).optional(),
  DatabaseOutputs: z.array(DatabaseOutputSchema).optional(),
  OutputLocation: z.object({
    Bucket: z.string(),
    Key: z.string(),
    BucketOwner: z.string(),
  }).optional(),
  ProjectName: z.string().optional(),
  Recipe: z.object({
    Name: z.string(),
    Version: z.string(),
  }).optional(),
  RoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Timeout: z.number().optional(),
  JobSample: z.object({
    Mode: z.string(),
    Size: z.number(),
  }).optional(),
  ProfileConfiguration: z.object({
    DatasetStatisticsConfiguration: StatisticsConfigurationSchema,
    ProfileColumns: z.array(ColumnSelectorSchema),
    ColumnStatisticsConfigurations: z.array(
      ColumnStatisticsConfigurationSchema,
    ),
    EntityDetectorConfiguration: EntityDetectorConfigurationSchema,
  }).optional(),
  ValidationConfigurations: z.array(ValidationConfigurationSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DatasetName: z.string().min(1).max(255).describe("Dataset name").optional(),
  EncryptionKeyArn: z.string().min(20).max(2048).describe("Encryption Key Arn")
    .optional(),
  EncryptionMode: z.enum(["SSE-KMS", "SSE-S3"]).describe("Encryption mode")
    .optional(),
  Name: z.string().min(1).max(255).describe("Job name").optional(),
  Type: z.enum(["PROFILE", "RECIPE"]).describe("Job type").optional(),
  LogSubscription: z.enum(["ENABLE", "DISABLE"]).describe("Log subscription")
    .optional(),
  MaxCapacity: z.number().int().describe("Max capacity").optional(),
  MaxRetries: z.number().int().describe("Max retries").optional(),
  Outputs: z.array(OutputSchema).optional(),
  DataCatalogOutputs: z.array(DataCatalogOutputSchema).optional(),
  DatabaseOutputs: z.array(DatabaseOutputSchema).optional(),
  OutputLocation: z.object({
    Bucket: z.string().optional(),
    Key: z.string().optional(),
    BucketOwner: z.string().min(12).max(12).optional(),
  }).describe("Output location").optional(),
  ProjectName: z.string().min(1).max(255).describe("Project name").optional(),
  Recipe: z.object({
    Name: z.string().describe("Recipe name").optional(),
    Version: z.string().describe("Recipe version").optional(),
  }).optional(),
  RoleArn: z.string().describe("Role arn").optional(),
  Tags: z.array(TagSchema).optional(),
  Timeout: z.number().int().describe("Timeout").optional(),
  JobSample: z.object({
    Mode: z.enum(["FULL_DATASET", "CUSTOM_ROWS"]).describe(
      "Sample configuration mode for profile jobs.",
    ).optional(),
    Size: z.number().int().describe(
      "Sample configuration size for profile jobs.",
    ).optional(),
  }).describe("Job Sample").optional(),
  ProfileConfiguration: z.object({
    DatasetStatisticsConfiguration: StatisticsConfigurationSchema.optional(),
    ProfileColumns: z.array(ColumnSelectorSchema).optional(),
    ColumnStatisticsConfigurations: z.array(ColumnStatisticsConfigurationSchema)
      .optional(),
    EntityDetectorConfiguration: EntityDetectorConfigurationSchema.optional(),
  }).describe("Profile Job configuration").optional(),
  ValidationConfigurations: z.array(ValidationConfigurationSchema).describe(
    "Data quality rules configuration",
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

/** Swamp extension model for DataBrew Job. Registered at `@swamp/aws/databrew/job`. */
export const model = {
  type: "@swamp/aws/databrew/job",
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
      description: "DataBrew Job resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataBrew Job",
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
          "AWS::DataBrew::Job",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a DataBrew Job",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataBrew Job",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DataBrew::Job",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a DataBrew Job",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DataBrew::Job",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::DataBrew::Job",
          identifier,
          currentState,
          desiredState,
          ["Name", "Type"],
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
      description: "Delete a DataBrew Job",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataBrew Job",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DataBrew::Job",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync DataBrew Job state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DataBrew::Job",
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
