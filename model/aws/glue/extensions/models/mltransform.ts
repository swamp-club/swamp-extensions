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

// Auto-generated extension model for @swamp/aws/glue/mltransform
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue MLTransform (AWS::Glue::MLTransform).
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

const GlueTablesSchema = z.object({
  CatalogId: z.string().describe(
    "A unique identifier for the AWS Glue Data Catalog.",
  ).optional(),
  ConnectionName: z.string().describe(
    "The name of the connection to the AWS Glue Data Catalog.",
  ).optional(),
  DatabaseName: z.string().describe(
    "A database name in the AWS Glue Data Catalog.",
  ),
  TableName: z.string().describe("A table name in the AWS Glue Data Catalog."),
});

const FindMatchesParametersSchema = z.object({
  PrimaryKeyColumnName: z.string().describe(
    "The name of a column that uniquely identifies rows in the source table.",
  ),
  AccuracyCostTradeoff: z.number().describe(
    "The value for accuracy and cost tradeoff. A value of 0.5 means balance.",
  ).optional(),
  PrecisionRecallTradeoff: z.number().describe(
    "The value for precision and recall tradeoff. A value of 0.5 means no preference.",
  ).optional(),
  EnforceProvidedLabels: z.boolean().describe(
    "If true, forces the output to match the provided labels.",
  ).optional(),
});

const MLUserDataEncryptionSchema = z.object({
  MLUserDataEncryptionMode: z.string().describe(
    "The encryption mode applied to user data.",
  ),
  KmsKeyId: z.string().describe("The ID for the customer-provided KMS key.")
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().describe(
    "A user-defined name for the machine learning transform.",
  ).optional(),
  Description: z.string().describe(
    "A user-defined, long-form description text for the machine learning transform.",
  ).optional(),
  Role: z.string().describe(
    "The name or ARN of the IAM role with the required permissions.",
  ),
  GlueVersion: z.string().describe(
    "The version of AWS Glue this machine learning transform is compatible with.",
  ).optional(),
  MaxCapacity: z.number().describe(
    "The number of AWS Glue DPUs allocated to task runs for this transform.",
  ).optional(),
  MaxRetries: z.number().int().describe(
    "The maximum number of times to retry after an MLTaskRun fails.",
  ).optional(),
  Timeout: z.number().int().describe(
    "The timeout in minutes of the machine learning transform.",
  ).optional(),
  NumberOfWorkers: z.number().int().describe(
    "The number of workers of a defined workerType that are allocated when a task runs.",
  ).optional(),
  WorkerType: z.string().describe(
    "The type of predefined worker that is allocated when a task runs.",
  ).optional(),
  InputRecordTables: z.object({
    GlueTables: z.array(GlueTablesSchema).describe(
      "The database and table in the AWS Glue Data Catalog that is used for input or output data.",
    ).optional(),
  }).describe("A list of AWS Glue table definitions used by the transform."),
  TransformParameters: z.object({
    TransformType: z.string().describe(
      "The type of machine learning transform.",
    ),
    FindMatchesParameters: FindMatchesParametersSchema.describe(
      "The parameters to configure the find matches transform.",
    ).optional(),
  }).describe(
    "The algorithm-specific parameters that are associated with the machine learning transform.",
  ),
  TransformEncryption: z.object({
    MLUserDataEncryption: MLUserDataEncryptionSchema.describe(
      "The encryption-at-rest settings of the transform that apply to accessing user data.",
    ).optional(),
    TaskRunSecurityConfigurationName: z.string().describe(
      "The name of the security configuration.",
    ).optional(),
  }).describe("The encryption-at-rest settings of the transform.").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags to use with this machine learning transform.",
  ).optional(),
});

const StateSchema = z.object({
  TransformId: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Role: z.string().optional(),
  GlueVersion: z.string().optional(),
  MaxCapacity: z.number().optional(),
  MaxRetries: z.number().optional(),
  Timeout: z.number().optional(),
  NumberOfWorkers: z.number().optional(),
  WorkerType: z.string().optional(),
  InputRecordTables: z.object({
    GlueTables: z.array(GlueTablesSchema),
  }).optional(),
  TransformParameters: z.object({
    TransformType: z.string(),
    FindMatchesParameters: FindMatchesParametersSchema,
  }).optional(),
  TransformEncryption: z.object({
    MLUserDataEncryption: MLUserDataEncryptionSchema,
    TaskRunSecurityConfigurationName: z.string(),
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().describe(
    "A user-defined name for the machine learning transform.",
  ).optional(),
  Description: z.string().describe(
    "A user-defined, long-form description text for the machine learning transform.",
  ).optional(),
  Role: z.string().describe(
    "The name or ARN of the IAM role with the required permissions.",
  ).optional(),
  GlueVersion: z.string().describe(
    "The version of AWS Glue this machine learning transform is compatible with.",
  ).optional(),
  MaxCapacity: z.number().describe(
    "The number of AWS Glue DPUs allocated to task runs for this transform.",
  ).optional(),
  MaxRetries: z.number().int().describe(
    "The maximum number of times to retry after an MLTaskRun fails.",
  ).optional(),
  Timeout: z.number().int().describe(
    "The timeout in minutes of the machine learning transform.",
  ).optional(),
  NumberOfWorkers: z.number().int().describe(
    "The number of workers of a defined workerType that are allocated when a task runs.",
  ).optional(),
  WorkerType: z.string().describe(
    "The type of predefined worker that is allocated when a task runs.",
  ).optional(),
  InputRecordTables: z.object({
    GlueTables: z.array(GlueTablesSchema).describe(
      "The database and table in the AWS Glue Data Catalog that is used for input or output data.",
    ).optional(),
  }).describe("A list of AWS Glue table definitions used by the transform.")
    .optional(),
  TransformParameters: z.object({
    TransformType: z.string().describe(
      "The type of machine learning transform.",
    ).optional(),
    FindMatchesParameters: FindMatchesParametersSchema.describe(
      "The parameters to configure the find matches transform.",
    ).optional(),
  }).describe(
    "The algorithm-specific parameters that are associated with the machine learning transform.",
  ).optional(),
  TransformEncryption: z.object({
    MLUserDataEncryption: MLUserDataEncryptionSchema.describe(
      "The encryption-at-rest settings of the transform that apply to accessing user data.",
    ).optional(),
    TaskRunSecurityConfigurationName: z.string().describe(
      "The name of the security configuration.",
    ).optional(),
  }).describe("The encryption-at-rest settings of the transform.").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The tags to use with this machine learning transform.",
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

/** Swamp extension model for Glue MLTransform. Registered at `@swamp/aws/glue/mltransform`. */
export const model = {
  type: "@swamp/aws/glue/mltransform",
  version: "2026.10.14.1",
  upgrades: [
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
      description: "Glue MLTransform resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue MLTransform",
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
          "AWS::Glue::MLTransform",
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
      description: "Get a Glue MLTransform",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue MLTransform",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::MLTransform",
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
      description: "Update a Glue MLTransform",
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
        const identifier = existing.TransformId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Glue::MLTransform",
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
          "AWS::Glue::MLTransform",
          identifier,
          currentState,
          desiredState,
          ["InputRecordTables", "TransformEncryption", "PrimaryKeyColumnName"],
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
      description: "Delete a Glue MLTransform",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue MLTransform",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::MLTransform",
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
      description: "Sync Glue MLTransform state from AWS",
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
        const identifier = existing.TransformId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Glue::MLTransform",
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
      description: "List Glue MLTransform resources",
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
          "AWS::Glue::MLTransform",
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
            (item.properties?.TransformId?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
