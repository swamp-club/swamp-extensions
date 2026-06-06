// Auto-generated extension model for @swamp/aws/lightsail/database
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lightsail Database (AWS::Lightsail::Database).
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

const RelationalDatabaseParameterSchema = z.object({
  AllowedValues: z.string().describe(
    "Specifies the valid range of values for the parameter.",
  ).optional(),
  ApplyMethod: z.string().describe(
    "Indicates when parameter updates are applied. Can be immediate or pending-reboot.",
  ).optional(),
  ApplyType: z.string().describe(
    "Specifies the engine-specific parameter type.",
  ).optional(),
  DataType: z.string().describe(
    "Specifies the valid data type for the parameter.",
  ).optional(),
  Description: z.string().describe("Provides a description of the parameter.")
    .optional(),
  IsModifiable: z.boolean().describe(
    "A Boolean value indicating whether the parameter can be modified.",
  ).optional(),
  ParameterName: z.string().describe("Specifies the name of the parameter.")
    .optional(),
  ParameterValue: z.string().describe("Specifies the value of the parameter.")
    .optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  RelationalDatabaseName: z.string().min(2).max(255).regex(
    new RegExp("\\w[\\w\\-]*\\w"),
  ).describe("The name to use for your new Lightsail database resource."),
  AvailabilityZone: z.string().min(1).max(255).describe(
    "The Availability Zone in which to create your new database. Use the us-east-2a case-sensitive format.",
  ).optional(),
  RelationalDatabaseBlueprintId: z.string().min(1).max(255).describe(
    "The blueprint ID for your new database. A blueprint describes the major engine version of a database.",
  ),
  RelationalDatabaseBundleId: z.string().min(1).max(255).describe(
    "The bundle ID for your new database. A bundle describes the performance specifications for your database.",
  ),
  MasterDatabaseName: z.string().min(1).max(255).describe(
    "The name of the database to create when the Lightsail database resource is created. For MySQL, if this parameter isn't specified, no database is created in the database resource. For PostgreSQL, if this parameter isn't specified, a database named postgres is created in the database resource.",
  ),
  MasterUsername: z.string().min(1).max(63).describe(
    "The name for the master user.",
  ),
  MasterUserPassword: z.string().min(1).max(63).describe(
    'The password for the master user. The password can include any printable ASCII character except "/", """, or "@". It cannot contain spaces.',
  ).optional(),
  PreferredBackupWindow: z.string().describe(
    "The daily time range during which automated backups are created for your new database if automated backups are enabled.",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "The weekly time range during which system maintenance can occur on your new database.",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Specifies the accessibility options for your new database. A value of true specifies a database that is available to resources outside of your Lightsail account. A value of false specifies a database that is available only to your Lightsail resources in the same region as your database.",
  ).optional(),
  CaCertificateIdentifier: z.string().describe(
    "Indicates the certificate that needs to be associated with the database.",
  ).optional(),
  BackupRetention: z.boolean().describe(
    "When true, enables automated backup retention for your database. Updates are applied during the next maintenance window because this can result in an outage.",
  ).optional(),
  RotateMasterUserPassword: z.boolean().describe(
    "When true, the master user password is changed to a new strong password generated by Lightsail. Use the get relational database master user password operation to get the new password.",
  ).optional(),
  RelationalDatabaseParameters: z.array(RelationalDatabaseParameterSchema)
    .describe("Update one or more parameters of the relational database.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  RelationalDatabaseName: z.string(),
  DatabaseArn: z.string().optional(),
  AvailabilityZone: z.string().optional(),
  RelationalDatabaseBlueprintId: z.string().optional(),
  RelationalDatabaseBundleId: z.string().optional(),
  MasterDatabaseName: z.string().optional(),
  MasterUsername: z.string().optional(),
  MasterUserPassword: z.string().optional(),
  PreferredBackupWindow: z.string().optional(),
  PreferredMaintenanceWindow: z.string().optional(),
  PubliclyAccessible: z.boolean().optional(),
  CaCertificateIdentifier: z.string().optional(),
  BackupRetention: z.boolean().optional(),
  RotateMasterUserPassword: z.boolean().optional(),
  RelationalDatabaseParameters: z.array(RelationalDatabaseParameterSchema)
    .optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  RelationalDatabaseName: z.string().min(2).max(255).regex(
    new RegExp("\\w[\\w\\-]*\\w"),
  ).describe("The name to use for your new Lightsail database resource.")
    .optional(),
  AvailabilityZone: z.string().min(1).max(255).describe(
    "The Availability Zone in which to create your new database. Use the us-east-2a case-sensitive format.",
  ).optional(),
  RelationalDatabaseBlueprintId: z.string().min(1).max(255).describe(
    "The blueprint ID for your new database. A blueprint describes the major engine version of a database.",
  ).optional(),
  RelationalDatabaseBundleId: z.string().min(1).max(255).describe(
    "The bundle ID for your new database. A bundle describes the performance specifications for your database.",
  ).optional(),
  MasterDatabaseName: z.string().min(1).max(255).describe(
    "The name of the database to create when the Lightsail database resource is created. For MySQL, if this parameter isn't specified, no database is created in the database resource. For PostgreSQL, if this parameter isn't specified, a database named postgres is created in the database resource.",
  ).optional(),
  MasterUsername: z.string().min(1).max(63).describe(
    "The name for the master user.",
  ).optional(),
  MasterUserPassword: z.string().min(1).max(63).describe(
    'The password for the master user. The password can include any printable ASCII character except "/", """, or "@". It cannot contain spaces.',
  ).optional(),
  PreferredBackupWindow: z.string().describe(
    "The daily time range during which automated backups are created for your new database if automated backups are enabled.",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "The weekly time range during which system maintenance can occur on your new database.",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Specifies the accessibility options for your new database. A value of true specifies a database that is available to resources outside of your Lightsail account. A value of false specifies a database that is available only to your Lightsail resources in the same region as your database.",
  ).optional(),
  CaCertificateIdentifier: z.string().describe(
    "Indicates the certificate that needs to be associated with the database.",
  ).optional(),
  BackupRetention: z.boolean().describe(
    "When true, enables automated backup retention for your database. Updates are applied during the next maintenance window because this can result in an outage.",
  ).optional(),
  RotateMasterUserPassword: z.boolean().describe(
    "When true, the master user password is changed to a new strong password generated by Lightsail. Use the get relational database master user password operation to get the new password.",
  ).optional(),
  RelationalDatabaseParameters: z.array(RelationalDatabaseParameterSchema)
    .describe("Update one or more parameters of the relational database.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for Lightsail Database. Registered at `@swamp/aws/lightsail/database`. */
export const model = {
  type: "@swamp/aws/lightsail/database",
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
      description: "Lightsail Database resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lightsail Database",
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
          "AWS::Lightsail::Database",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.RelationalDatabaseName ?? g.RelationalDatabaseName)
            ?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
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
    get: {
      description: "Get a Lightsail Database",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail Database",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lightsail::Database",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.RelationalDatabaseName ??
          context.globalArgs.RelationalDatabaseName)?.toString() ??
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
      description: "Update a Lightsail Database",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.RelationalDatabaseName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.RelationalDatabaseName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lightsail::Database",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lightsail::Database",
          identifier,
          currentState,
          desiredState,
          [
            "RelationalDatabaseName",
            "AvailabilityZone",
            "RelationalDatabaseBlueprintId",
            "RelationalDatabaseBundleId",
            "MasterDatabaseName",
            "MasterUsername",
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
      description: "Delete a Lightsail Database",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail Database",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lightsail::Database",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.RelationalDatabaseName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync Lightsail Database state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.RelationalDatabaseName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.RelationalDatabaseName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lightsail::Database",
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
