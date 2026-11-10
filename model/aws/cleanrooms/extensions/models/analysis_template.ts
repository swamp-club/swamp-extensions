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

// Auto-generated extension model for @swamp/aws/cleanrooms/analysis-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CleanRooms AnalysisTemplate (AWS::CleanRooms::AnalysisTemplate).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
});

const AnalysisParameterSchema = z.object({
  DefaultValue: z.string().min(0).max(1000).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("[0-9a-zA-Z_]+")),
  Type: z.enum([
    "SMALLINT",
    "INTEGER",
    "BIGINT",
    "DECIMAL",
    "REAL",
    "DOUBLE_PRECISION",
    "BOOLEAN",
    "CHAR",
    "VARCHAR",
    "DATE",
    "TIMESTAMP",
    "TIMESTAMPTZ",
    "TIME",
    "TIMETZ",
    "VARBYTE",
    "BINARY",
    "BYTE",
    "CHARACTER",
    "DOUBLE",
    "FLOAT",
    "INT",
    "LONG",
    "NUMERIC",
    "SHORT",
    "STRING",
    "TIMESTAMP_LTZ",
    "TIMESTAMP_NTZ",
    "TINYINT",
  ]),
});

const S3LocationSchema = z.object({
  Bucket: z.string().min(3).max(63),
  Key: z.string(),
});

const AnalysisTemplateArtifactSchema = z.object({
  Location: S3LocationSchema,
});

const AnalysisTemplateArtifactsSchema = z.object({
  EntryPoint: AnalysisTemplateArtifactSchema,
  AdditionalArtifacts: z.array(AnalysisTemplateArtifactSchema).optional(),
  RoleArn: z.string().min(32).max(512),
});

const HashSchema = z.object({
  Sha256: z.string().optional(),
});

const AnalysisTemplateArtifactMetadataSchema = z.object({
  EntryPointHash: HashSchema,
  AdditionalArtifactHashes: z.array(HashSchema).optional(),
});

const SyntheticDataColumnPropertiesSchema = z.object({
  ColumnName: z.string().max(128).regex(
    new RegExp("^[a-z0-9_](([a-z0-9_]+-)*([a-z0-9_]+))?$"),
  ),
  ColumnType: z.enum(["CATEGORICAL", "NUMERICAL"]),
  IsPredictiveValue: z.boolean(),
});

const ColumnClassificationDetailsSchema = z.object({
  ColumnMapping: z.array(SyntheticDataColumnPropertiesSchema),
});

const MLSyntheticDataParametersSchema = z.object({
  Epsilon: z.number().min(0.0001).max(10),
  MaxMembershipInferenceAttackScore: z.number().min(0.5).max(1),
  ColumnClassification: ColumnClassificationDetailsSchema,
});

const TagStateSchema = z.object({
  Key: z.string(),
  Value: z.string(),
}).partial();

const AnalysisParameterStateSchema = z.object({
  DefaultValue: z.string(),
  Name: z.string(),
  Type: z.string(),
}).partial();

const S3LocationStateSchema = z.object({
  Bucket: z.string(),
  Key: z.string(),
}).partial();

const AnalysisTemplateArtifactStateSchema = z.object({
  Location: S3LocationStateSchema,
}).partial();

const AnalysisTemplateArtifactsStateSchema = z.object({
  EntryPoint: AnalysisTemplateArtifactStateSchema,
  AdditionalArtifacts: z.array(AnalysisTemplateArtifactStateSchema),
  RoleArn: z.string(),
}).partial();

const HashStateSchema = z.object({
  Sha256: z.string(),
}).partial();

const AnalysisTemplateArtifactMetadataStateSchema = z.object({
  EntryPointHash: HashStateSchema,
  AdditionalArtifactHashes: z.array(HashStateSchema),
}).partial();

const SyntheticDataColumnPropertiesStateSchema = z.object({
  ColumnName: z.string(),
  ColumnType: z.string(),
  IsPredictiveValue: z.boolean(),
}).partial();

const ColumnClassificationDetailsStateSchema = z.object({
  ColumnMapping: z.array(SyntheticDataColumnPropertiesStateSchema),
}).partial();

const MLSyntheticDataParametersStateSchema = z.object({
  Epsilon: z.number(),
  MaxMembershipInferenceAttackScore: z.number(),
  ColumnClassification: ColumnClassificationDetailsStateSchema,
}).partial();

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
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms analysis template.",
  ).optional(),
  AnalysisParameters: z.array(AnalysisParameterSchema).describe(
    "The member who can query can provide this placeholder for a literal data value in an analysis template",
  ).optional(),
  Description: z.string().max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t\\r\\n]*$",
    ),
  ).optional(),
  MembershipIdentifier: z.string().min(36).max(36).regex(
    new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
  ).optional(),
  Name: z.string().max(128).regex(
    new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
  ).optional(),
  Schema: z.object({
    ReferencedTables: z.array(
      z.string().max(128).regex(
        new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
      ),
    ),
  }).optional(),
  Source: z.object({
    Text: z.string().min(0).max(90000).optional(),
    Artifacts: AnalysisTemplateArtifactsSchema.optional(),
  }).optional(),
  SourceMetadata: z.object({
    Artifacts: AnalysisTemplateArtifactMetadataSchema.optional(),
  }).optional(),
  Format: z.enum(["SQL", "PYSPARK_1_0", "PYSPARK_2_0"]).optional(),
  ErrorMessageConfiguration: z.object({
    Type: z.enum(["DETAILED"]),
  }).optional(),
  SyntheticDataParameters: z.object({
    MlSyntheticDataParameters: MLSyntheticDataParametersSchema.optional(),
  }).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  CollaborationArn: z.string().optional(),
  CollaborationIdentifier: z.string().optional(),
  Tags: z.array(TagStateSchema).optional(),
  AnalysisParameters: z.array(AnalysisParameterStateSchema).optional(),
  AnalysisTemplateIdentifier: z.string(),
  Description: z.string().optional(),
  MembershipArn: z.string().optional(),
  MembershipIdentifier: z.string(),
  Name: z.string().optional(),
  Schema: z.object({
    ReferencedTables: z.array(z.string()),
  }).partial().optional(),
  Source: z.object({
    Text: z.string(),
    Artifacts: AnalysisTemplateArtifactsStateSchema,
  }).partial().optional(),
  SourceMetadata: z.object({
    Artifacts: AnalysisTemplateArtifactMetadataStateSchema,
  }).partial().optional(),
  Format: z.string().optional(),
  ErrorMessageConfiguration: z.object({
    Type: z.string(),
  }).partial().optional(),
  SyntheticDataParameters: z.object({
    MlSyntheticDataParameters: MLSyntheticDataParametersStateSchema,
  }).partial().optional(),
}).passthrough();

type StateData = Record<string, unknown>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this cleanrooms analysis template.",
  ).optional(),
  AnalysisParameters: z.array(AnalysisParameterSchema).describe(
    "The member who can query can provide this placeholder for a literal data value in an analysis template",
  ).optional(),
  Description: z.string().max(255).regex(
    new RegExp(
      "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDBFF-\\uDC00\\uDFFF\\t\\r\\n]*$",
    ),
  ).optional(),
  MembershipIdentifier: z.string().min(36).max(36).regex(
    new RegExp("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"),
  ).optional(),
  Name: z.string().max(128).regex(
    new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
  ).optional(),
  Schema: z.object({
    ReferencedTables: z.array(
      z.string().max(128).regex(
        new RegExp("^[a-zA-Z0-9_](([a-zA-Z0-9_ ]+-)*([a-zA-Z0-9_ ]+))?$"),
      ),
    ).optional(),
  }).optional(),
  Source: z.object({
    Text: z.string().min(0).max(90000).optional(),
    Artifacts: AnalysisTemplateArtifactsSchema.optional(),
  }).optional(),
  SourceMetadata: z.object({
    Artifacts: AnalysisTemplateArtifactMetadataSchema.optional(),
  }).optional(),
  Format: z.enum(["SQL", "PYSPARK_1_0", "PYSPARK_2_0"]).optional(),
  ErrorMessageConfiguration: z.object({
    Type: z.enum(["DETAILED"]).optional(),
  }).optional(),
  SyntheticDataParameters: z.object({
    MlSyntheticDataParameters: MLSyntheticDataParametersSchema.optional(),
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

/** Swamp extension model for CleanRooms AnalysisTemplate. Registered at `@swamp/aws/cleanrooms/analysis-template`. */
export const model = {
  type: "@swamp/aws/cleanrooms/analysis-template",
  version: "2026.11.10.1",
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
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.10.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CleanRooms AnalysisTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CleanRooms AnalysisTemplate",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["Format", "MembershipIdentifier", "Name", "Source"]
          .filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CleanRooms::AnalysisTemplate",
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
      description: "Get a CleanRooms AnalysisTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms AnalysisTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CleanRooms::AnalysisTemplate",
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
      description: "Update a CleanRooms AnalysisTemplate",
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
          existing.AnalysisTemplateIdentifier?.toString(),
          existing.MembershipIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CleanRooms::AnalysisTemplate",
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
          "AWS::CleanRooms::AnalysisTemplate",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "MembershipIdentifier",
            "Source",
            "Format",
            "AnalysisParameters",
            "Schema",
            "ErrorMessageConfiguration",
            "SyntheticDataParameters",
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
      description: "Delete a CleanRooms AnalysisTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CleanRooms AnalysisTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CleanRooms::AnalysisTemplate",
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
      description: "Sync CleanRooms AnalysisTemplate state from AWS",
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
          existing.AnalysisTemplateIdentifier?.toString(),
          existing.MembershipIdentifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CleanRooms::AnalysisTemplate",
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
      description: "List CleanRooms AnalysisTemplate resources",
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
          "AWS::CleanRooms::AnalysisTemplate",
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
