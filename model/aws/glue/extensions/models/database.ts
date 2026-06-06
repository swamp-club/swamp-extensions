// Auto-generated extension model for @swamp/aws/glue/database
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Database (AWS::Glue::Database).
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

const DataLakePrincipalSchema = z.object({
  DataLakePrincipalIdentifier: z.string().describe(
    "An identifier for the AWS Lake Formation principal.",
  ).optional(),
});

const PrincipalPrivilegesSchema = z.object({
  Permissions: z.array(z.string()).describe(
    "The permissions that are granted to the principal.",
  ).optional(),
  Principal: DataLakePrincipalSchema.describe(
    "The principal who is granted permissions.",
  ).optional(),
});

const DatabaseIdentifierSchema = z.object({
  DatabaseName: z.string().describe("The name of the catalog database.")
    .optional(),
  Region: z.string().describe("Region of the target database.").optional(),
  CatalogId: z.string().describe(
    "The ID of the Data Catalog in which the database resides.",
  ).optional(),
});

const FederatedDatabaseSchema = z.object({
  ConnectionName: z.string().describe(
    "The name of the connection to the external metastore.",
  ).optional(),
  Identifier: z.string().describe(
    "A unique identifier for the federated database.",
  ).optional(),
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
  CatalogId: z.string().describe(
    "The AWS account ID for the account in which to create the catalog object.",
  ),
  DatabaseInput: z.object({
    LocationUri: z.string().describe(
      "The location of the database (for example, an HDFS path).",
    ).optional(),
    CreateTableDefaultPermissions: z.array(PrincipalPrivilegesSchema).describe(
      "Creates a set of default permissions on the table for principals. Used by AWS Lake Formation. Not used in the normal course of AWS Glue operations.",
    ).optional(),
    Description: z.string().describe("A description of the database.")
      .optional(),
    Parameters: z.record(z.string(), z.unknown()).describe(
      "These key-value pairs define parameters and properties of the database.",
    ).optional(),
    TargetDatabase: DatabaseIdentifierSchema.describe(
      "A DatabaseIdentifier structure that describes a target database for resource linking.",
    ).optional(),
    FederatedDatabase: FederatedDatabaseSchema.describe(
      "A FederatedDatabase structure that references an entity outside the AWS Glue Data Catalog.",
    ).optional(),
    Name: z.string().describe(
      "The name of the database. For hive compatibility, this is folded to lowercase when it is stored.",
    ).optional(),
  }).describe("The metadata for the database."),
  DatabaseName: z.string().describe(
    "The name of the database. For hive compatibility, this is folded to lowercase when it is store.",
  ).optional(),
});

const StateSchema = z.object({
  CatalogId: z.string().optional(),
  DatabaseInput: z.object({
    LocationUri: z.string(),
    CreateTableDefaultPermissions: z.array(PrincipalPrivilegesSchema),
    Description: z.string(),
    Parameters: z.record(z.string(), z.unknown()),
    TargetDatabase: DatabaseIdentifierSchema,
    FederatedDatabase: FederatedDatabaseSchema,
    Name: z.string(),
  }).optional(),
  DatabaseName: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CatalogId: z.string().describe(
    "The AWS account ID for the account in which to create the catalog object.",
  ).optional(),
  DatabaseInput: z.object({
    LocationUri: z.string().describe(
      "The location of the database (for example, an HDFS path).",
    ).optional(),
    CreateTableDefaultPermissions: z.array(PrincipalPrivilegesSchema).describe(
      "Creates a set of default permissions on the table for principals. Used by AWS Lake Formation. Not used in the normal course of AWS Glue operations.",
    ).optional(),
    Description: z.string().describe("A description of the database.")
      .optional(),
    Parameters: z.record(z.string(), z.unknown()).describe(
      "These key-value pairs define parameters and properties of the database.",
    ).optional(),
    TargetDatabase: DatabaseIdentifierSchema.describe(
      "A DatabaseIdentifier structure that describes a target database for resource linking.",
    ).optional(),
    FederatedDatabase: FederatedDatabaseSchema.describe(
      "A FederatedDatabase structure that references an entity outside the AWS Glue Data Catalog.",
    ).optional(),
    Name: z.string().describe(
      "The name of the database. For hive compatibility, this is folded to lowercase when it is stored.",
    ).optional(),
  }).describe("The metadata for the database.").optional(),
  DatabaseName: z.string().describe(
    "The name of the database. For hive compatibility, this is folded to lowercase when it is store.",
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

/** Swamp extension model for Glue Database. Registered at `@swamp/aws/glue/database`. */
export const model = {
  type: "@swamp/aws/glue/database",
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
      toVersion: "2026.05.27.1",
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
      description: "Glue Database resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Database",
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
          "AWS::Glue::Database",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DatabaseName ?? g.DatabaseName)?.toString() ?? "current")
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
      description: "Get a Glue Database",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Database",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Database",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DatabaseName ?? context.globalArgs.DatabaseName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Glue Database",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DatabaseName?.toString() ?? "current").replace(
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
        const identifier = existing.DatabaseName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Glue::Database",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Glue::Database",
          identifier,
          currentState,
          desiredState,
          ["DatabaseName"],
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
      description: "Delete a Glue Database",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Database",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Database",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DatabaseName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Glue Database state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DatabaseName?.toString() ?? "current").replace(
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
        const identifier = existing.DatabaseName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Glue::Database",
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
