// Auto-generated extension model for @swamp/aws/athena/data-catalog
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Athena DataCatalog (AWS::Athena::DataCatalog).
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
  Value: z.string().min(0).max(256),
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
  Name: z.string().min(1).max(256).describe(
    "The name of the data catalog to create. The catalog name must be unique for the AWS account and can use a maximum of 128 alphanumeric, underscore, at sign, or hyphen characters.",
  ),
  Description: z.string().min(1).max(1024).describe(
    "A description of the data catalog to be created.",
  ).optional(),
  Parameters: z.record(z.string(), z.string().max(51200)).describe(
    "Specifies the Lambda function or functions to use for creating the data catalog. This is a mapping whose values depend on the catalog type.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of comma separated tags to add to the data catalog that is created.",
  ).optional(),
  Type: z.enum(["LAMBDA", "GLUE", "HIVE", "FEDERATED"]).describe(
    "The type of data catalog to create: LAMBDA for a federated catalog, GLUE for AWS Glue Catalog, or HIVE for an external hive metastore. FEDERATED is a federated catalog for which Athena creates the connection and the Lambda function for you based on the parameters that you pass.",
  ),
  Status: z.enum([
    "CREATE_IN_PROGRESS",
    "CREATE_COMPLETE",
    "CREATE_FAILED",
    "CREATE_FAILED_CLEANUP_IN_PROGRESS",
    "CREATE_FAILED_CLEANUP_COMPLETE",
    "CREATE_FAILED_CLEANUP_FAILED",
    "DELETE_IN_PROGRESS",
    "DELETE_COMPLETE",
    "DELETE_FAILED",
  ]).describe(
    "The status of the creation or deletion of the data catalog. LAMBDA, GLUE, and HIVE data catalog types are created synchronously. Their status is either CREATE_COMPLETE or CREATE_FAILED. The FEDERATED data catalog type is created asynchronously.",
  ).optional(),
  ConnectionType: z.string().describe(
    "The type of connection for a FEDERATED data catalog",
  ).optional(),
  Error: z.string().describe(
    "Text of the error that occurred during data catalog creation or deletion.",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Description: z.string().optional(),
  Parameters: z.record(z.string(), z.unknown()).optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.string().optional(),
  Status: z.string().optional(),
  ConnectionType: z.string().optional(),
  Error: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(256).describe(
    "The name of the data catalog to create. The catalog name must be unique for the AWS account and can use a maximum of 128 alphanumeric, underscore, at sign, or hyphen characters.",
  ).optional(),
  Description: z.string().min(1).max(1024).describe(
    "A description of the data catalog to be created.",
  ).optional(),
  Parameters: z.record(z.string(), z.string().max(51200)).describe(
    "Specifies the Lambda function or functions to use for creating the data catalog. This is a mapping whose values depend on the catalog type.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of comma separated tags to add to the data catalog that is created.",
  ).optional(),
  Type: z.enum(["LAMBDA", "GLUE", "HIVE", "FEDERATED"]).describe(
    "The type of data catalog to create: LAMBDA for a federated catalog, GLUE for AWS Glue Catalog, or HIVE for an external hive metastore. FEDERATED is a federated catalog for which Athena creates the connection and the Lambda function for you based on the parameters that you pass.",
  ).optional(),
  Status: z.enum([
    "CREATE_IN_PROGRESS",
    "CREATE_COMPLETE",
    "CREATE_FAILED",
    "CREATE_FAILED_CLEANUP_IN_PROGRESS",
    "CREATE_FAILED_CLEANUP_COMPLETE",
    "CREATE_FAILED_CLEANUP_FAILED",
    "DELETE_IN_PROGRESS",
    "DELETE_COMPLETE",
    "DELETE_FAILED",
  ]).describe(
    "The status of the creation or deletion of the data catalog. LAMBDA, GLUE, and HIVE data catalog types are created synchronously. Their status is either CREATE_COMPLETE or CREATE_FAILED. The FEDERATED data catalog type is created asynchronously.",
  ).optional(),
  ConnectionType: z.string().describe(
    "The type of connection for a FEDERATED data catalog",
  ).optional(),
  Error: z.string().describe(
    "Text of the error that occurred during data catalog creation or deletion.",
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

/** Swamp extension model for Athena DataCatalog. Registered at `@swamp/aws/athena/data-catalog`. */
export const model = {
  type: "@swamp/aws/athena/data-catalog",
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
      description: "Athena DataCatalog resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Athena DataCatalog",
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
          "AWS::Athena::DataCatalog",
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
      description: "Get a Athena DataCatalog",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Athena DataCatalog",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Athena::DataCatalog",
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
      description: "Update a Athena DataCatalog",
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
          "AWS::Athena::DataCatalog",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Athena::DataCatalog",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a Athena DataCatalog",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Athena DataCatalog",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Athena::DataCatalog",
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
      description: "Sync Athena DataCatalog state from AWS",
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
            "AWS::Athena::DataCatalog",
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
