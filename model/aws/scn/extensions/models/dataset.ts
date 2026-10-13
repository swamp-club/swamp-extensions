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

// Auto-generated extension model for @swamp/aws/scn/dataset
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SCN Dataset (AWS::SCN::Dataset).
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

const DataLakeDatasetSchemaFieldSchema = z.object({
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-z0-9_]+$")).describe(
    "The dataset field name.",
  ),
  Type: z.enum(["INT", "DOUBLE", "STRING", "TIMESTAMP", "LONG"]).describe(
    "The dataset field type.",
  ),
  IsRequired: z.boolean().describe("Indicate if the field is required or not."),
});

const DataLakeDatasetPrimaryKeyFieldSchema = z.object({
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-z0-9_]+$")).describe(
    "The name of the primary key field.",
  ),
});

const DataLakeDatasetPartitionFieldSchema = z.object({
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-z0-9_]+$")).describe(
    "The name of the partition field.",
  ),
  Transform: z.object({
    Type: z.enum(["YEAR", "MONTH", "DAY", "HOUR", "IDENTITY"]).describe(
      "The type of partitioning transformation.",
    ),
  }).describe("The transformation of the partition field."),
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
  Namespace: z.string().min(1).max(50).regex(new RegExp("^[a-z0-9_]+$"))
    .describe("The namespace of the dataset."),
  Name: z.string().min(1).max(75).regex(new RegExp("^[a-z0-9_]+$")).describe(
    "The name of the dataset.",
  ),
  Description: z.string().min(1).max(500).describe(
    "The description of the dataset.",
  ).optional(),
  Schema: z.object({
    Name: z.string().min(1).max(100).regex(new RegExp("^[A-Za-z0-9]+$"))
      .describe("The name of the dataset schema."),
    Fields: z.array(DataLakeDatasetSchemaFieldSchema).describe(
      "The list of field details of the dataset schema.",
    ),
    PrimaryKeys: z.array(DataLakeDatasetPrimaryKeyFieldSchema).describe(
      "The list of primary key fields for the dataset.",
    ).optional(),
  }).describe("The schema of the dataset.").optional(),
  PartitionSpec: z.object({
    Fields: z.array(DataLakeDatasetPartitionFieldSchema).describe(
      "The partition fields.",
    ),
  }).describe("The partition specification of the dataset.").optional(),
  Tags: z.array(TagSchema).describe("The tags for the dataset.").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  InstanceId: z.string().optional(),
  Namespace: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  Schema: z.object({
    Name: z.string(),
    Fields: z.array(DataLakeDatasetSchemaFieldSchema),
    PrimaryKeys: z.array(DataLakeDatasetPrimaryKeyFieldSchema),
  }).optional(),
  PartitionSpec: z.object({
    Fields: z.array(DataLakeDatasetPartitionFieldSchema),
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
  Namespace: z.string().min(1).max(50).regex(new RegExp("^[a-z0-9_]+$"))
    .describe("The namespace of the dataset.").optional(),
  Name: z.string().min(1).max(75).regex(new RegExp("^[a-z0-9_]+$")).describe(
    "The name of the dataset.",
  ).optional(),
  Description: z.string().min(1).max(500).describe(
    "The description of the dataset.",
  ).optional(),
  Schema: z.object({
    Name: z.string().min(1).max(100).regex(new RegExp("^[A-Za-z0-9]+$"))
      .describe("The name of the dataset schema.").optional(),
    Fields: z.array(DataLakeDatasetSchemaFieldSchema).describe(
      "The list of field details of the dataset schema.",
    ).optional(),
    PrimaryKeys: z.array(DataLakeDatasetPrimaryKeyFieldSchema).describe(
      "The list of primary key fields for the dataset.",
    ).optional(),
  }).describe("The schema of the dataset.").optional(),
  PartitionSpec: z.object({
    Fields: z.array(DataLakeDatasetPartitionFieldSchema).describe(
      "The partition fields.",
    ).optional(),
  }).describe("The partition specification of the dataset.").optional(),
  Tags: z.array(TagSchema).describe("The tags for the dataset.").optional(),
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

/** Swamp extension model for SCN Dataset. Registered at `@swamp/aws/scn/dataset`. */
export const model = {
  type: "@swamp/aws/scn/dataset",
  version: "2026.10.13.1",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SCN Dataset resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SCN Dataset",
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
          "AWS::SCN::Dataset",
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
      description: "Get a SCN Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SCN Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SCN::Dataset",
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
      description: "Update a SCN Dataset",
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
          "AWS::SCN::Dataset",
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
          "AWS::SCN::Dataset",
          identifier,
          currentState,
          desiredState,
          ["InstanceId", "Namespace", "Name", "Schema", "PartitionSpec"],
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
      description: "Delete a SCN Dataset",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SCN Dataset",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SCN::Dataset",
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
      description: "Sync SCN Dataset state from AWS",
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
            "AWS::SCN::Dataset",
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
      description: "List SCN Dataset resources",
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
        const { items, nextToken } = await listResources("AWS::SCN::Dataset", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
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
