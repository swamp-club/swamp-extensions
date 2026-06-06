// Auto-generated extension model for @swamp/aws/glue/schema
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Schema (AWS::Glue::Schema).
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
  Key: z.string().min(1).max(128).describe("A key to identify the tag."),
  Value: z.string().min(0).max(256).describe(
    "Corresponding tag value for the key.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Registry: z.object({
    Name: z.string().min(1).max(255).describe(
      "Name of the registry in which the schema will be created.",
    ).optional(),
  }).describe("Identifier for the registry which the schema is part of.")
    .optional(),
  Name: z.string().min(1).max(255).describe("Name of the schema."),
  Description: z.string().min(0).max(1000).describe(
    "A description of the schema. If description is not provided, there will not be any default value for this.",
  ).optional(),
  DataFormat: z.enum(["AVRO", "JSON", "PROTOBUF"]).describe(
    "Data format name to use for the schema. Accepted values: 'AVRO', 'JSON', 'PROTOBUF'",
  ),
  Compatibility: z.enum([
    "NONE",
    "DISABLED",
    "BACKWARD",
    "BACKWARD_ALL",
    "FORWARD",
    "FORWARD_ALL",
    "FULL",
    "FULL_ALL",
  ]).describe("Compatibility setting for the schema."),
  SchemaDefinition: z.string().min(1).max(170000).describe(
    "Definition for the initial schema version in plain-text.",
  ).optional(),
  CheckpointVersion: z.object({
    IsLatest: z.boolean().describe(
      "Indicates if the latest version needs to be updated.",
    ).optional(),
    VersionNumber: z.number().int().min(1).max(100000).describe(
      "Indicates the version number in the schema to update.",
    ).optional(),
  }).describe(
    "Specify checkpoint version for update. This is only required to update the Compatibility.",
  ).optional(),
  Tags: z.array(TagSchema).describe("List of tags to tag the schema")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Registry: z.object({
    Name: z.string(),
    Arn: z.string(),
  }).optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  DataFormat: z.string().optional(),
  Compatibility: z.string().optional(),
  SchemaDefinition: z.string().optional(),
  CheckpointVersion: z.object({
    IsLatest: z.boolean(),
    VersionNumber: z.number(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  InitialSchemaVersionId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Registry: z.object({
    Name: z.string().min(1).max(255).describe(
      "Name of the registry in which the schema will be created.",
    ).optional(),
  }).describe("Identifier for the registry which the schema is part of.")
    .optional(),
  Name: z.string().min(1).max(255).describe("Name of the schema.").optional(),
  Description: z.string().min(0).max(1000).describe(
    "A description of the schema. If description is not provided, there will not be any default value for this.",
  ).optional(),
  DataFormat: z.enum(["AVRO", "JSON", "PROTOBUF"]).describe(
    "Data format name to use for the schema. Accepted values: 'AVRO', 'JSON', 'PROTOBUF'",
  ).optional(),
  Compatibility: z.enum([
    "NONE",
    "DISABLED",
    "BACKWARD",
    "BACKWARD_ALL",
    "FORWARD",
    "FORWARD_ALL",
    "FULL",
    "FULL_ALL",
  ]).describe("Compatibility setting for the schema.").optional(),
  SchemaDefinition: z.string().min(1).max(170000).describe(
    "Definition for the initial schema version in plain-text.",
  ).optional(),
  CheckpointVersion: z.object({
    IsLatest: z.boolean().describe(
      "Indicates if the latest version needs to be updated.",
    ).optional(),
    VersionNumber: z.number().int().min(1).max(100000).describe(
      "Indicates the version number in the schema to update.",
    ).optional(),
  }).describe(
    "Specify checkpoint version for update. This is only required to update the Compatibility.",
  ).optional(),
  Tags: z.array(TagSchema).describe("List of tags to tag the schema")
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

/** Swamp extension model for Glue Schema. Registered at `@swamp/aws/glue/schema`. */
export const model = {
  type: "@swamp/aws/glue/schema",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Glue Schema resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Schema",
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
          "AWS::Glue::Schema",
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
      description: "Get a Glue Schema",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Schema",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Schema",
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
      description: "Update a Glue Schema",
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
          "AWS::Glue::Schema",
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
          "AWS::Glue::Schema",
          identifier,
          currentState,
          desiredState,
          ["Registry", "Name", "DataFormat", "SchemaDefinition"],
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
      description: "Delete a Glue Schema",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Schema",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Schema",
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
      description: "Sync Glue Schema state from AWS",
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
            "AWS::Glue::Schema",
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
