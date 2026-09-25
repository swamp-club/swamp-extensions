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

// Auto-generated extension model for @swamp/aws/scn/data-integration-flow
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SCN DataIntegrationFlow (AWS::SCN::DataIntegrationFlow).
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

const S3OptionsSchema = z.object({
  FileType: z.enum(["CSV", "PARQUET", "JSON"]).describe("The file type.")
    .optional(),
});

const S3SourceConfigurationSchema = z.object({
  BucketName: z.string().min(3).max(63).regex(
    new RegExp("^[a-z0-9][a-z0-9.-]*[a-z0-9]$"),
  ).describe("The S3 bucket name."),
  Prefix: z.string().min(0).max(700).regex(new RegExp("^[/A-Za-z0-9._-]+$"))
    .describe("The S3 prefix."),
  Options: S3OptionsSchema.describe("The Amazon S3 options.").optional(),
});

const FieldPriorityDedupeFieldSchema = z.object({
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-z0-9_]+$")).describe(
    "The name of the deduplication field.",
  ),
  SortOrder: z.enum(["ASC", "DESC"]).describe("The sort order."),
});

const FieldPriorityDedupeStrategyConfigurationSchema = z.object({
  Fields: z.array(FieldPriorityDedupeFieldSchema).describe(
    "The list of field names and their sort order for deduplication.",
  ),
});

const DedupeStrategySchema = z.object({
  Type: z.enum(["FIELD_PRIORITY"]).describe("The deduplication strategy type."),
  FieldPriority: FieldPriorityDedupeStrategyConfigurationSchema.describe(
    "The field priority deduplication strategy configuration.",
  ).optional(),
});

const DatasetOptionsSchema = z.object({
  LoadType: z.enum(["INCREMENTAL", "REPLACE"]).describe("The load type.")
    .optional(),
  DedupeRecords: z.boolean().describe(
    "The option to perform deduplication on data records sharing same primary key values.",
  ).optional(),
  DedupeStrategy: DedupeStrategySchema.describe("The deduplication strategy.")
    .optional(),
});

const DatasetSourceConfigurationSchema = z.object({
  DatasetIdentifier: z.string().min(1).max(1011).regex(
    new RegExp("^[-_/A-Za-z0-9:]+$"),
  ).describe("The ARN of the dataset."),
  Options: DatasetOptionsSchema.describe("The dataset options.").optional(),
});

const DataIntegrationFlowSourceSchema = z.object({
  SourceType: z.enum(["S3", "DATASET"]).describe("The source type."),
  SourceName: z.string().min(1).max(256).regex(new RegExp("^[A-Za-z0-9_]+$"))
    .describe(
      "The source name that can be used as table alias in SQL transformation query.",
    ),
  S3Source: S3SourceConfigurationSchema.describe(
    "The S3 source configuration parameters.",
  ).optional(),
  DatasetSource: DatasetSourceConfigurationSchema.describe(
    "The dataset source configuration parameters.",
  ).optional(),
});

const SqlTransformationConfigurationSchema = z.object({
  Query: z.string().min(1).max(65535).describe(
    "The transformation SQL query body based on SparkSQL.",
  ),
});

const DatasetTargetConfigurationSchema = z.object({
  DatasetIdentifier: z.string().min(1).max(1011).regex(
    new RegExp("^[-_/A-Za-z0-9:]+$"),
  ).describe("The dataset ARN."),
  Options: DatasetOptionsSchema.describe("The dataset options.").optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
  InstanceId: z.string().min(36).max(36).regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).describe("The Amazon Web Services Supply Chain instance identifier."),
  Name: z.string().min(1).max(256).regex(new RegExp("^[A-Za-z0-9-]+$"))
    .describe("The name of the DataIntegrationFlow."),
  Sources: z.array(DataIntegrationFlowSourceSchema).describe(
    "The source configurations for the DataIntegrationFlow.",
  ),
  Transformation: z.object({
    TransformationType: z.enum(["SQL", "NONE"]).describe(
      "The transformation type.",
    ),
    SqlTransformation: SqlTransformationConfigurationSchema.describe(
      "The SQL transformation configuration parameters.",
    ).optional(),
  }).describe("The DataIntegrationFlow transformation parameters."),
  Target: z.object({
    TargetType: z.enum(["DATASET"]).describe("The target type."),
    DatasetTarget: DatasetTargetConfigurationSchema.describe(
      "The dataset target configuration parameters.",
    ).optional(),
  }).describe("The DataIntegrationFlow target parameters."),
  Tags: z.array(TagSchema).describe("The tags for the DataIntegrationFlow.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  InstanceId: z.string().optional(),
  Name: z.string().optional(),
  Sources: z.array(DataIntegrationFlowSourceSchema).optional(),
  Transformation: z.object({
    TransformationType: z.string(),
    SqlTransformation: SqlTransformationConfigurationSchema,
  }).optional(),
  Target: z.object({
    TargetType: z.string(),
    DatasetTarget: DatasetTargetConfigurationSchema,
  }).optional(),
  CreatedTime: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  InstanceId: z.string().min(36).max(36).regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).describe("The Amazon Web Services Supply Chain instance identifier.")
    .optional(),
  Name: z.string().min(1).max(256).regex(new RegExp("^[A-Za-z0-9-]+$"))
    .describe("The name of the DataIntegrationFlow.").optional(),
  Sources: z.array(DataIntegrationFlowSourceSchema).describe(
    "The source configurations for the DataIntegrationFlow.",
  ).optional(),
  Transformation: z.object({
    TransformationType: z.enum(["SQL", "NONE"]).describe(
      "The transformation type.",
    ).optional(),
    SqlTransformation: SqlTransformationConfigurationSchema.describe(
      "The SQL transformation configuration parameters.",
    ).optional(),
  }).describe("The DataIntegrationFlow transformation parameters.").optional(),
  Target: z.object({
    TargetType: z.enum(["DATASET"]).describe("The target type.").optional(),
    DatasetTarget: DatasetTargetConfigurationSchema.describe(
      "The dataset target configuration parameters.",
    ).optional(),
  }).describe("The DataIntegrationFlow target parameters.").optional(),
  Tags: z.array(TagSchema).describe("The tags for the DataIntegrationFlow.")
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

/** Swamp extension model for SCN DataIntegrationFlow. Registered at `@swamp/aws/scn/data-integration-flow`. */
export const model = {
  type: "@swamp/aws/scn/data-integration-flow",
  version: "2026.09.25.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SCN DataIntegrationFlow resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SCN DataIntegrationFlow",
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
          "AWS::SCN::DataIntegrationFlow",
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
      description: "Get a SCN DataIntegrationFlow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SCN DataIntegrationFlow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SCN::DataIntegrationFlow",
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
      description: "Update a SCN DataIntegrationFlow",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SCN::DataIntegrationFlow",
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
          "AWS::SCN::DataIntegrationFlow",
          identifier,
          currentState,
          desiredState,
          ["InstanceId", "Name"],
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
      description: "Delete a SCN DataIntegrationFlow",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SCN DataIntegrationFlow",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SCN::DataIntegrationFlow",
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
      description: "Sync SCN DataIntegrationFlow state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SCN::DataIntegrationFlow",
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
      description: "List SCN DataIntegrationFlow resources",
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
          "AWS::SCN::DataIntegrationFlow",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
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
