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

// Auto-generated extension model for @swamp/aws/cleanrooms/configured-table
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CleanRooms ConfiguredTable (AWS::CleanRooms::ConfiguredTable).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

const AnalysisRuleListSchema = z.object({
  JoinColumns: z.array(
    z.string().min(1).max(127).regex(
      new RegExp("^[a-z0-9_](([a-z0-9_ ]+-)*([a-z0-9_ ]+))?$"),
    ),
  ),
  AllowedJoinOperators: z.array(z.enum(["OR", "AND"])).optional(),
  ListColumns: z.array(
    z.string().min(1).max(127).regex(
      new RegExp("^[a-z0-9_](([a-z0-9_ ]+-)*([a-z0-9_ ]+))?$"),
    ),
  ),
  AdditionalAnalyses: z.enum(["ALLOWED", "REQUIRED", "NOT_ALLOWED"]).optional(),
});

const AggregateColumnSchema = z.object({
  ColumnNames: z.array(
    z.string().min(1).max(127).regex(
      new RegExp("^[a-z0-9_](([a-z0-9_ ]+-)*([a-z0-9_ ]+))?$"),
    ),
  ),
  Function: z.enum(["SUM", "SUM_DISTINCT", "COUNT", "COUNT_DISTINCT", "AVG"]),
});

const AggregationConstraintSchema = z.object({
  ColumnName: z.string().min(1).max(127).regex(
    new RegExp("^[a-z0-9_](([a-z0-9_ ]+-)*([a-z0-9_ ]+))?$"),
  ),
  Minimum: z.number().min(2).max(100000),
  Type: z.enum(["COUNT_DISTINCT"]),
});

const AnalysisRuleAggregationSchema = z.object({
  AggregateColumns: z.array(AggregateColumnSchema),
  JoinColumns: z.array(
    z.string().min(1).max(127).regex(
      new RegExp("^[a-z0-9_](([a-z0-9_ ]+-)*([a-z0-9_ ]+))?$"),
    ),
  ),
  AllowedJoinOperators: z.array(z.enum(["OR", "AND"])).optional(),
  JoinRequired: z.enum(["QUERY_RUNNER"]).optional(),
  DimensionColumns: z.array(
    z.string().min(1).max(127).regex(
      new RegExp("^[a-z0-9_](([a-z0-9_ ]+-)*([a-z0-9_ ]+))?$"),
    ),
  ),
  ScalarFunctions: z.array(
    z.enum([
      "TRUNC",
      "ABS",
      "CEILING",
      "FLOOR",
      "LN",
      "LOG",
      "ROUND",
      "SQRT",
      "CAST",
      "LOWER",
      "RTRIM",
      "UPPER",
      "COALESCE",
      "CONVERT",
      "CURRENT_DATE",
      "DATEADD",
      "EXTRACT",
      "GETDATE",
      "SUBSTRING",
      "TO_CHAR",
      "TO_DATE",
      "TO_NUMBER",
      "TO_TIMESTAMP",
      "TRIM",
    ]),
  ),
  OutputConstraints: z.array(AggregationConstraintSchema),
  AdditionalAnalyses: z.enum(["ALLOWED", "REQUIRED", "NOT_ALLOWED"]).optional(),
});

const DifferentialPrivacyColumnSchema = z.object({
  Name: z.string(),
});

const DifferentialPrivacySchema = z.object({
  Columns: z.array(DifferentialPrivacyColumnSchema),
});

const AnalysisRuleCustomSchema = z.object({
  AllowedAnalyses: z.array(
    z.string().min(0).max(200).regex(
      new RegExp(
        "(ANY_QUERY|ANY_JOB|arn:[\\w]{3}:cleanrooms:[\\w]{2}-[\\w]{4,9}-[\\d]:[\\d]{12}:membership/[\\d\\w-]+/analysistemplate/[\\d\\w-]+)",
      ),
    ),
  ),
  AllowedAnalysisProviders: z.array(
    z.string().min(12).max(12).regex(new RegExp("\\d+")),
  ).optional(),
  DifferentialPrivacy: DifferentialPrivacySchema.optional(),
  DisallowedOutputColumns: z.array(
    z.string().min(1).max(127).regex(
      new RegExp("^[a-z0-9_](([a-z0-9_ ]+-)*([a-z0-9_ ]+))?$"),
    ),
  ).optional(),
  AdditionalAnalyses: z.enum(["ALLOWED", "REQUIRED", "NOT_ALLOWED"]).optional(),
});

const V1Schema = z.object({
  V1: z.object({
    List: AnalysisRuleListSchema.optional(),
    Aggregation: AnalysisRuleAggregationSchema.optional(),
    Custom: AnalysisRuleCustomSchema.optional(),
  }),
});

const AnalysisRuleSchema = z.object({
  Type: z.enum(["AGGREGATION", "LIST", "CUSTOM"]),
  Policy: V1Schema,
});

const GlueTableReferenceSchema = z.object({
  TableName: z.string().max(128).regex(
    new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
  ),
  DatabaseName: z.string().max(128).regex(
    new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
  ),
  Region: z.enum([
    "us-west-1",
    "us-west-2",
    "us-east-1",
    "us-east-2",
    "af-south-1",
    "ap-east-1",
    "ap-south-2",
    "ap-southeast-1",
    "ap-southeast-2",
    "ap-southeast-5",
    "ap-southeast-4",
    "ap-southeast-7",
    "ap-south-1",
    "ap-northeast-3",
    "ap-northeast-1",
    "ap-northeast-2",
    "ca-central-1",
    "ca-west-1",
    "eu-south-1",
    "eu-west-3",
    "eu-south-2",
    "eu-central-2",
    "eu-central-1",
    "eu-north-1",
    "eu-west-1",
    "eu-west-2",
    "me-south-1",
    "me-central-1",
    "il-central-1",
    "sa-east-1",
    "mx-central-1",
    "ap-east-2",
  ]).optional(),
});

const SnowflakeTableSchemaV1Schema = z.object({
  ColumnName: z.string().max(128),
  ColumnType: z.string().max(255),
});

const SnowflakeTableReferenceSchema = z.object({
  SecretArn: z.string().max(256),
  AccountIdentifier: z.string().min(3).max(256),
  DatabaseName: z.string().min(1).max(256),
  TableName: z.string().min(1).max(256),
  SchemaName: z.string().min(1).max(256),
  TableSchema: z.object({
    V1: z.array(SnowflakeTableSchemaV1Schema).optional(),
  }),
});

const AthenaTableReferenceSchema = z.object({
  WorkGroup: z.string().min(1).max(128),
  OutputLocation: z.string().min(8).max(1024).optional(),
  DatabaseName: z.string().max(128),
  TableName: z.string().max(128),
  Region: z.enum([
    "us-west-1",
    "us-west-2",
    "us-east-1",
    "us-east-2",
    "af-south-1",
    "ap-east-1",
    "ap-south-2",
    "ap-southeast-1",
    "ap-southeast-2",
    "ap-southeast-5",
    "ap-southeast-4",
    "ap-southeast-7",
    "ap-south-1",
    "ap-northeast-3",
    "ap-northeast-1",
    "ap-northeast-2",
    "ca-central-1",
    "ca-west-1",
    "eu-south-1",
    "eu-west-3",
    "eu-south-2",
    "eu-central-2",
    "eu-central-1",
    "eu-north-1",
    "eu-west-1",
    "eu-west-2",
    "me-south-1",
    "me-central-1",
    "il-central-1",
    "sa-east-1",
    "mx-central-1",
    "ap-east-2",
  ]).optional(),
  CatalogName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .optional(),
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
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms collaboration.",
  ).optional(),
  AllowedColumns: z.array(
    z.string().max(128).regex(
      new RegExp("^[a-z0-9_](([a-z0-9_ ]+-)*([a-z0-9_ ]+))?$"),
    ),
  ),
  AnalysisMethod: z.enum(["DIRECT_QUERY", "DIRECT_JOB", "MULTIPLE"]),
  SelectedAnalysisMethods: z.array(z.enum(["DIRECT_QUERY", "DIRECT_JOB"]))
    .optional(),
  Description: z.string().max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t\\r\\n]*$",
    ),
  ).optional(),
  Name: z.string().min(1).max(100).regex(
    new RegExp(
      "^(?!\\s*$)[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t]*$",
    ),
  ),
  AnalysisRules: z.array(AnalysisRuleSchema).optional(),
  TableReference: z.object({
    Glue: GlueTableReferenceSchema.optional(),
    Snowflake: SnowflakeTableReferenceSchema.optional(),
    Athena: AthenaTableReferenceSchema.optional(),
  }),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  AllowedColumns: z.array(z.string()).optional(),
  AnalysisMethod: z.string().optional(),
  SelectedAnalysisMethods: z.array(z.string()).optional(),
  ConfiguredTableIdentifier: z.string(),
  Description: z.string().optional(),
  Name: z.string().optional(),
  AnalysisRules: z.array(AnalysisRuleSchema).optional(),
  TableReference: z.object({
    Glue: GlueTableReferenceSchema,
    Snowflake: SnowflakeTableReferenceSchema,
    Athena: AthenaTableReferenceSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms collaboration.",
  ).optional(),
  AllowedColumns: z.array(
    z.string().max(128).regex(
      new RegExp("^[a-z0-9_](([a-z0-9_ ]+-)*([a-z0-9_ ]+))?$"),
    ),
  ).optional(),
  AnalysisMethod: z.enum(["DIRECT_QUERY", "DIRECT_JOB", "MULTIPLE"]).optional(),
  SelectedAnalysisMethods: z.array(z.enum(["DIRECT_QUERY", "DIRECT_JOB"]))
    .optional(),
  Description: z.string().max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t\\r\\n]*$",
    ),
  ).optional(),
  Name: z.string().min(1).max(100).regex(
    new RegExp(
      "^(?!\\s*$)[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t]*$",
    ),
  ).optional(),
  AnalysisRules: z.array(AnalysisRuleSchema).optional(),
  TableReference: z.object({
    Glue: GlueTableReferenceSchema.optional(),
    Snowflake: SnowflakeTableReferenceSchema.optional(),
    Athena: AthenaTableReferenceSchema.optional(),
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

/** Swamp extension model for CleanRooms ConfiguredTable. Registered at `@swamp/aws/cleanrooms/configured-table`. */
export const model = {
  type: "@swamp/aws/cleanrooms/configured-table",
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
      description: "CleanRooms ConfiguredTable resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CleanRooms ConfiguredTable",
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
          "AWS::CleanRooms::ConfiguredTable",
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
      description: "Get a CleanRooms ConfiguredTable",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms ConfiguredTable",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CleanRooms::ConfiguredTable",
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
      description: "Update a CleanRooms ConfiguredTable",
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
        const identifier = existing.ConfiguredTableIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CleanRooms::ConfiguredTable",
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
          "AWS::CleanRooms::ConfiguredTable",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a CleanRooms ConfiguredTable",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms ConfiguredTable",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CleanRooms::ConfiguredTable",
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
      description: "Sync CleanRooms ConfiguredTable state from AWS",
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
        const identifier = existing.ConfiguredTableIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CleanRooms::ConfiguredTable",
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
