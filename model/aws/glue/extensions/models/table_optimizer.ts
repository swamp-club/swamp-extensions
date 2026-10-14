// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/glue/table-optimizer
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue TableOptimizer (AWS::Glue::TableOptimizer).
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

const IcebergRetentionConfigurationSchema = z.object({
  SnapshotRetentionPeriodInDays: z.number().int().optional(),
  NumberOfSnapshotsToRetain: z.number().int().optional(),
  CleanExpiredFiles: z.boolean().optional(),
});

const RetentionConfigurationSchema = z.object({
  IcebergConfiguration: IcebergRetentionConfigurationSchema.describe(
    "The configuration for an Iceberg snapshot retention optimizer.",
  ).optional(),
});

const VpcConfigurationSchema = z.object({
  GlueConnectionName: z.string().describe(
    "The name of the AWS Glue connection used for the VPC for the table optimizer.",
  ).optional(),
});

const IcebergConfigurationSchema = z.object({
  OrphanFileRetentionPeriodInDays: z.number().int().describe(
    "The specific number of days you want to keep the orphan files.",
  ).optional(),
  Location: z.string().describe(
    "Specifies a directory in which to look for orphan files (defaults to the table's location). You may choose a sub-directory rather than the top-level table location.",
  ).optional(),
});

const OrphanFileDeletionConfigurationSchema = z.object({
  IcebergConfiguration: IcebergConfigurationSchema.describe(
    "The IcebergConfiguration property helps optimize your Iceberg tables in AWS Glue by allowing you to specify format-specific settings that control how data is stored, compressed, and managed.",
  ).optional(),
});

const IcebergCompactionConfigurationSchema = z.object({
  Strategy: z.string().describe(
    "The compaction strategy to use. Valid values are binpack, sort, and z-order.",
  ).optional(),
  MinInputFiles: z.number().int().describe(
    "The minimum number of input files before compaction is triggered.",
  ).optional(),
  DeleteFileThreshold: z.number().int().describe(
    "The minimum number of deletes in a data file to make it eligible for compaction.",
  ).optional(),
});

const CompactionConfigurationSchema = z.object({
  IcebergConfiguration: IcebergCompactionConfigurationSchema.describe(
    "The configuration for an Iceberg compaction optimizer.",
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
    "The name of the database. For Hive compatibility, this is folded to lowercase when it is stored.",
  ),
  TableName: z.string().describe(
    "The table name. For Hive compatibility, this must be entirely lowercase.",
  ),
  Type: z.string().describe("The type of table optimizer."),
  TableOptimizerConfiguration: z.object({
    Enabled: z.boolean().describe("Whether the table optimization is enabled."),
    RetentionConfiguration: RetentionConfigurationSchema.describe(
      "The configuration for a snapshot retention optimizer for Apache Iceberg tables.",
    ).optional(),
    VpcConfiguration: VpcConfigurationSchema.describe(
      "An object that describes the VPC configuration for a table optimizer. This configuration is necessary to perform optimization on tables that are in a customer VPC.",
    ).optional(),
    RoleArn: z.string().describe(
      "A role passed by the caller which gives the service permission to update the resources associated with the optimizer on the caller's behalf.",
    ),
    OrphanFileDeletionConfiguration: OrphanFileDeletionConfigurationSchema
      .describe(
        "OrphanFileDeletionConfiguration is a property that can be included within the TableOptimizer resource. It controls the automatic deletion of orphaned files - files that are not tracked by the table metadata, and older than the configured age limit.",
      ).optional(),
    CompactionConfiguration: CompactionConfigurationSchema.describe(
      "The configuration for a compaction optimizer. This configuration defines how data files in your table will be compacted to improve query performance and reduce storage costs.",
    ).optional(),
  }).describe("Specifies configuration details of a table optimizer."),
  CatalogId: z.string().describe("The catalog ID of the table"),
});

const StateSchema = z.object({
  DatabaseName: z.string(),
  TableName: z.string(),
  Type: z.string(),
  TableOptimizerConfiguration: z.object({
    Enabled: z.boolean(),
    RetentionConfiguration: RetentionConfigurationSchema,
    VpcConfiguration: VpcConfigurationSchema,
    RoleArn: z.string(),
    OrphanFileDeletionConfiguration: OrphanFileDeletionConfigurationSchema,
    CompactionConfiguration: CompactionConfigurationSchema,
  }).optional(),
  CatalogId: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DatabaseName: z.string().describe(
    "The name of the database. For Hive compatibility, this is folded to lowercase when it is stored.",
  ).optional(),
  TableName: z.string().describe(
    "The table name. For Hive compatibility, this must be entirely lowercase.",
  ).optional(),
  Type: z.string().describe("The type of table optimizer.").optional(),
  TableOptimizerConfiguration: z.object({
    Enabled: z.boolean().describe("Whether the table optimization is enabled.")
      .optional(),
    RetentionConfiguration: RetentionConfigurationSchema.describe(
      "The configuration for a snapshot retention optimizer for Apache Iceberg tables.",
    ).optional(),
    VpcConfiguration: VpcConfigurationSchema.describe(
      "An object that describes the VPC configuration for a table optimizer. This configuration is necessary to perform optimization on tables that are in a customer VPC.",
    ).optional(),
    RoleArn: z.string().describe(
      "A role passed by the caller which gives the service permission to update the resources associated with the optimizer on the caller's behalf.",
    ).optional(),
    OrphanFileDeletionConfiguration: OrphanFileDeletionConfigurationSchema
      .describe(
        "OrphanFileDeletionConfiguration is a property that can be included within the TableOptimizer resource. It controls the automatic deletion of orphaned files - files that are not tracked by the table metadata, and older than the configured age limit.",
      ).optional(),
    CompactionConfiguration: CompactionConfigurationSchema.describe(
      "The configuration for a compaction optimizer. This configuration defines how data files in your table will be compacted to improve query performance and reduce storage costs.",
    ).optional(),
  }).describe("Specifies configuration details of a table optimizer.")
    .optional(),
  CatalogId: z.string().describe("The catalog ID of the table").optional(),
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

/** Swamp extension model for Glue TableOptimizer. Registered at `@swamp/aws/glue/table-optimizer`. */
export const model = {
  type: "@swamp/aws/glue/table-optimizer",
  version: "2026.10.14.1",
  upgrades: [
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Glue TableOptimizer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue TableOptimizer",
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
          "AWS::Glue::TableOptimizer",
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
      description: "Get a Glue TableOptimizer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue TableOptimizer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::TableOptimizer",
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
      description: "Update a Glue TableOptimizer",
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
          existing.TableName?.toString(),
          existing.DatabaseName?.toString(),
          existing.Type?.toString(),
          existing.CatalogId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Glue::TableOptimizer",
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
          "AWS::Glue::TableOptimizer",
          identifier,
          currentState,
          desiredState,
          ["TableName", "DatabaseName", "Type", "CatalogId"],
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
      description: "Delete a Glue TableOptimizer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue TableOptimizer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::TableOptimizer",
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
      description: "Sync Glue TableOptimizer state from AWS",
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
          existing.TableName?.toString(),
          existing.DatabaseName?.toString(),
          existing.Type?.toString(),
          existing.CatalogId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Glue::TableOptimizer",
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
      description: "List Glue TableOptimizer resources",
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
          "AWS::Glue::TableOptimizer",
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
