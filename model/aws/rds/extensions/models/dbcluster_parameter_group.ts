// Auto-generated extension model for @swamp/aws/rds/dbcluster-parameter-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RDS DBClusterParameterGroup (AWS::RDS::DBClusterParameterGroup).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A key is the required name of the tag. The string value can be from 1 to 128 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ),
  Value: z.string().min(0).max(256).describe(
    "A value is the optional value of the tag. The string value can be from 1 to 256 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  Description: z.string().describe(
    "The description for the DB cluster parameter group.",
  ),
  Family: z.string().describe(
    'The DB cluster parameter group family name. A DB cluster parameter group can be associated with one and only one DB cluster parameter group family, and can be applied only to a DB cluster running a database engine and engine version compatible with that DB cluster parameter group family. *Aurora MySQL* Example: aurora-mysql5.7, aurora-mysql8.0 *Aurora PostgreSQL* Example: aurora-postgresql14 *RDS for MySQL* Example: mysql8.0 *RDS for PostgreSQL* Example: postgres13 To list all of the available parameter group families for a DB engine, use the following command: aws rds describe-db-engine-versions --query "DBEngineVersions[].DBParameterGroupFamily" --engine  For example, to list all of the available parameter group families for the Aurora PostgreSQL DB engine, use the following command: aws rds describe-db-engine-versions --query "DBEngineVersions[].DBParameterGroupFamily" --engine aurora-postgresql The output contains duplicates. The following are the valid DB engine values: aurora-mysql aurora-postgresql mysql postgres',
  ),
  Parameters: z.record(z.string(), z.unknown()).describe(
    "Provides a list of parameters for the DB cluster parameter group.",
  ),
  DBClusterParameterGroupName: z.string().regex(
    new RegExp("^[a-zA-Z]{1}(?:-?[a-zA-Z0-9])*$"),
  ).describe(
    "The name of the DB cluster parameter group. Constraints: Must not match the name of an existing DB cluster parameter group. This value is stored as a lowercase string.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the DB cluster parameter group.",
  ).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  Family: z.string().optional(),
  Parameters: z.record(z.string(), z.unknown()).optional(),
  DBClusterParameterGroupName: z.string(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  Description: z.string().describe(
    "The description for the DB cluster parameter group.",
  ).optional(),
  Family: z.string().describe(
    'The DB cluster parameter group family name. A DB cluster parameter group can be associated with one and only one DB cluster parameter group family, and can be applied only to a DB cluster running a database engine and engine version compatible with that DB cluster parameter group family. *Aurora MySQL* Example: aurora-mysql5.7, aurora-mysql8.0 *Aurora PostgreSQL* Example: aurora-postgresql14 *RDS for MySQL* Example: mysql8.0 *RDS for PostgreSQL* Example: postgres13 To list all of the available parameter group families for a DB engine, use the following command: aws rds describe-db-engine-versions --query "DBEngineVersions[].DBParameterGroupFamily" --engine  For example, to list all of the available parameter group families for the Aurora PostgreSQL DB engine, use the following command: aws rds describe-db-engine-versions --query "DBEngineVersions[].DBParameterGroupFamily" --engine aurora-postgresql The output contains duplicates. The following are the valid DB engine values: aurora-mysql aurora-postgresql mysql postgres',
  ).optional(),
  Parameters: z.record(z.string(), z.unknown()).describe(
    "Provides a list of parameters for the DB cluster parameter group.",
  ).optional(),
  DBClusterParameterGroupName: z.string().regex(
    new RegExp("^[a-zA-Z]{1}(?:-?[a-zA-Z0-9])*$"),
  ).describe(
    "The name of the DB cluster parameter group. Constraints: Must not match the name of an existing DB cluster parameter group. This value is stored as a lowercase string.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the DB cluster parameter group.",
  ).optional(),
});

/** Swamp extension model for RDS DBClusterParameterGroup. Registered at `@swamp/aws/rds/dbcluster-parameter-group`. */
export const model = {
  type: "@swamp/aws/rds/dbcluster-parameter-group",
  version: "2026.05.27.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "RDS DBClusterParameterGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS DBClusterParameterGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::RDS::DBClusterParameterGroup",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.DBClusterParameterGroupName ?? g.DBClusterParameterGroupName)
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
      description: "Get a RDS DBClusterParameterGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBClusterParameterGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::RDS::DBClusterParameterGroup",
          args.identifier,
        ) as StateData;
        const instanceName = ((result.DBClusterParameterGroupName ??
          context.globalArgs.DBClusterParameterGroupName)?.toString() ??
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
      description: "Update a RDS DBClusterParameterGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName =
          (g.DBClusterParameterGroupName?.toString() ?? "current").replace(
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
        const identifier = existing.DBClusterParameterGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RDS::DBClusterParameterGroup",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RDS::DBClusterParameterGroup",
          identifier,
          currentState,
          desiredState,
          ["DBClusterParameterGroupName", "Description", "Family"],
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
      description: "Delete a RDS DBClusterParameterGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBClusterParameterGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::RDS::DBClusterParameterGroup",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.DBClusterParameterGroupName?.toString() ??
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
      description: "Sync RDS DBClusterParameterGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName =
          (g.DBClusterParameterGroupName?.toString() ?? "current").replace(
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
        const identifier = existing.DBClusterParameterGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RDS::DBClusterParameterGroup",
            identifier,
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
