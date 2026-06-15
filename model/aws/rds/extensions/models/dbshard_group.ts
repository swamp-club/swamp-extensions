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

// Auto-generated extension model for @swamp/aws/rds/dbshard-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RDS DBShardGroup (AWS::RDS::DBShardGroup).
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
  Key: z.string().min(1).max(128).describe(
    "A key is the required name of the tag. The string value can be from 1 to 128 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ),
  Value: z.string().min(0).max(256).describe(
    "A value is the optional value of the tag. The string value can be from 1 to 256 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  DBShardGroupIdentifier: z.string().min(1).max(63).describe(
    "The name of the DB shard group.",
  ).optional(),
  DBClusterIdentifier: z.string().min(1).max(63).describe(
    "The name of the primary DB cluster for the DB shard group.",
  ),
  ComputeRedundancy: z.number().int().min(0).describe(
    "Specifies whether to create standby standby DB data access shard for the DB shard group. Valid values are the following: 0 - Creates a DB shard group without a standby DB data access shard. This is the default value. 1 - Creates a DB shard group with a standby DB data access shard in a different Availability Zone (AZ). 2 - Creates a DB shard group with two standby DB data access shard in two different AZs.",
  ).optional(),
  MaxACU: z.number().describe(
    "The maximum capacity of the DB shard group in Aurora capacity units (ACUs).",
  ),
  MinACU: z.number().describe(
    "The minimum capacity of the DB shard group in Aurora capacity units (ACUs).",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Specifies whether the DB shard group is publicly accessible. When the DB shard group is publicly accessible, its Domain Name System (DNS) endpoint resolves to the private IP address from within the DB shard group's virtual private cloud (VPC). It resolves to the public IP address from outside of the DB shard group's VPC. Access to the DB shard group is ultimately controlled by the security group it uses. That public access is not permitted if the security group assigned to the DB shard group doesn't permit it. When the DB shard group isn't publicly accessible, it is an internal DB shard group with a DNS name that resolves to a private IP address. Default: The default behavior varies depending on whether DBSubnetGroupName is specified. If DBSubnetGroupName isn't specified, and PubliclyAccessible isn't specified, the following applies: If the default VPC in the target Region doesn’t have an internet gateway attached to it, the DB shard group is private. If the default VPC in the target Region has an internet gateway attached to it, the DB shard group is public. If DBSubnetGroupName is specified, and PubliclyAccessible isn't specified, the following applies: If the subnets are part of a VPC that doesn’t have an internet gateway attached to it, the DB shard group is private. If the subnets are part of a VPC that has an internet gateway attached to it, the DB shard group is public.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An optional set of key-value pairs to associate arbitrary data of your choosing with the DB shard group.",
  ).optional(),
});

const StateSchema = z.object({
  DBShardGroupResourceId: z.string().optional(),
  DBShardGroupIdentifier: z.string(),
  DBClusterIdentifier: z.string().optional(),
  ComputeRedundancy: z.number().optional(),
  MaxACU: z.number().optional(),
  MinACU: z.number().optional(),
  PubliclyAccessible: z.boolean().optional(),
  Endpoint: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DBShardGroupIdentifier: z.string().min(1).max(63).describe(
    "The name of the DB shard group.",
  ).optional(),
  DBClusterIdentifier: z.string().min(1).max(63).describe(
    "The name of the primary DB cluster for the DB shard group.",
  ).optional(),
  ComputeRedundancy: z.number().int().min(0).describe(
    "Specifies whether to create standby standby DB data access shard for the DB shard group. Valid values are the following: 0 - Creates a DB shard group without a standby DB data access shard. This is the default value. 1 - Creates a DB shard group with a standby DB data access shard in a different Availability Zone (AZ). 2 - Creates a DB shard group with two standby DB data access shard in two different AZs.",
  ).optional(),
  MaxACU: z.number().describe(
    "The maximum capacity of the DB shard group in Aurora capacity units (ACUs).",
  ).optional(),
  MinACU: z.number().describe(
    "The minimum capacity of the DB shard group in Aurora capacity units (ACUs).",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Specifies whether the DB shard group is publicly accessible. When the DB shard group is publicly accessible, its Domain Name System (DNS) endpoint resolves to the private IP address from within the DB shard group's virtual private cloud (VPC). It resolves to the public IP address from outside of the DB shard group's VPC. Access to the DB shard group is ultimately controlled by the security group it uses. That public access is not permitted if the security group assigned to the DB shard group doesn't permit it. When the DB shard group isn't publicly accessible, it is an internal DB shard group with a DNS name that resolves to a private IP address. Default: The default behavior varies depending on whether DBSubnetGroupName is specified. If DBSubnetGroupName isn't specified, and PubliclyAccessible isn't specified, the following applies: If the default VPC in the target Region doesn’t have an internet gateway attached to it, the DB shard group is private. If the default VPC in the target Region has an internet gateway attached to it, the DB shard group is public. If DBSubnetGroupName is specified, and PubliclyAccessible isn't specified, the following applies: If the subnets are part of a VPC that doesn’t have an internet gateway attached to it, the DB shard group is private. If the subnets are part of a VPC that has an internet gateway attached to it, the DB shard group is public.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An optional set of key-value pairs to associate arbitrary data of your choosing with the DB shard group.",
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

/** Swamp extension model for RDS DBShardGroup. Registered at `@swamp/aws/rds/dbshard-group`. */
export const model = {
  type: "@swamp/aws/rds/dbshard-group",
  version: "2026.06.15.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "RDS DBShardGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS DBShardGroup",
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
          "AWS::RDS::DBShardGroup",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DBShardGroupIdentifier ?? g.DBShardGroupIdentifier)
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
      description: "Get a RDS DBShardGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBShardGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::RDS::DBShardGroup",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.DBShardGroupIdentifier ??
          context.globalArgs.DBShardGroupIdentifier)?.toString() ??
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
      description: "Update a RDS DBShardGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBShardGroupIdentifier?.toString() ?? "current")
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
        const identifier = existing.DBShardGroupIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RDS::DBShardGroup",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RDS::DBShardGroup",
          identifier,
          currentState,
          desiredState,
          [
            "DBClusterIdentifier",
            "DBShardGroupIdentifier",
            "PubliclyAccessible",
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
      description: "Delete a RDS DBShardGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS DBShardGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RDS::DBShardGroup",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DBShardGroupIdentifier?.toString() ??
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
      description: "Sync RDS DBShardGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBShardGroupIdentifier?.toString() ?? "current")
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
        const identifier = existing.DBShardGroupIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RDS::DBShardGroup",
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
