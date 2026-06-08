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

// Auto-generated extension model for @swamp/aws/neptune/dbinstance
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Neptune DBInstance (AWS::Neptune::DBInstance).
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
  Key: z.string().describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
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
  AllowMajorVersionUpgrade: z.boolean().describe(
    "Indicates that major version upgrades are allowed. Changing this parameter doesn't result in an outage and the change is asynchronously applied as soon as possible. This parameter must be set to true when specifying a value for the EngineVersion parameter that is a different major version than the DB instance's current version.",
  ).optional(),
  AutoMinorVersionUpgrade: z.boolean().describe(
    "Indicates that minor version patches are applied automatically. When updating this property, some interruptions may occur.",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Indicates that public accessibility is enabled. This should be enabled in combination with IAM Auth enabled on the DBCluster",
  ).optional(),
  AvailabilityZone: z.string().describe(
    "Specifies the name of the Availability Zone the DB instance is located in.",
  ).optional(),
  DBClusterIdentifier: z.string().describe(
    "If the DB instance is a member of a DB cluster, contains the name of the DB cluster that the DB instance is a member of.",
  ).optional(),
  DBInstanceClass: z.string().describe(
    "Contains the name of the compute and memory capacity class of the DB instance. If you update this property, some interruptions may occur.",
  ),
  DBInstanceIdentifier: z.string().describe(
    "Contains a user-supplied database identifier. This identifier is the unique key that identifies a DB instance.",
  ).optional(),
  DBParameterGroupName: z.string().describe(
    "The name of an existing DB parameter group or a reference to an AWS::Neptune::DBParameterGroup resource created in the template. If any of the data members of the referenced parameter group are changed during an update, the DB instance might need to be restarted, which causes some interruption. If the parameter group contains static parameters, whether they were changed or not, an update triggers a reboot.",
  ).optional(),
  DBSnapshotIdentifier: z.string().describe(
    "This parameter is not supported. `AWS::Neptune::DBInstance` does not support restoring from snapshots. `AWS::Neptune::DBCluster` does support restoring from snapshots.",
  ).optional(),
  DBSubnetGroupName: z.string().describe(
    "A DB subnet group to associate with the DB instance. If you update this value, the new subnet group must be a subnet group in a new virtual private cloud (VPC).",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "Specifies the weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC).",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this DB instance.",
  ).optional(),
});

const StateSchema = z.object({
  AllowMajorVersionUpgrade: z.boolean().optional(),
  AutoMinorVersionUpgrade: z.boolean().optional(),
  PubliclyAccessible: z.boolean().optional(),
  AvailabilityZone: z.string().optional(),
  DBClusterIdentifier: z.string().optional(),
  DBInstanceClass: z.string().optional(),
  DBInstanceIdentifier: z.string(),
  DBParameterGroupName: z.string().optional(),
  DBSnapshotIdentifier: z.string().optional(),
  DBSubnetGroupName: z.string().optional(),
  Endpoint: z.string().optional(),
  PreferredMaintenanceWindow: z.string().optional(),
  Port: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AllowMajorVersionUpgrade: z.boolean().describe(
    "Indicates that major version upgrades are allowed. Changing this parameter doesn't result in an outage and the change is asynchronously applied as soon as possible. This parameter must be set to true when specifying a value for the EngineVersion parameter that is a different major version than the DB instance's current version.",
  ).optional(),
  AutoMinorVersionUpgrade: z.boolean().describe(
    "Indicates that minor version patches are applied automatically. When updating this property, some interruptions may occur.",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Indicates that public accessibility is enabled. This should be enabled in combination with IAM Auth enabled on the DBCluster",
  ).optional(),
  AvailabilityZone: z.string().describe(
    "Specifies the name of the Availability Zone the DB instance is located in.",
  ).optional(),
  DBClusterIdentifier: z.string().describe(
    "If the DB instance is a member of a DB cluster, contains the name of the DB cluster that the DB instance is a member of.",
  ).optional(),
  DBInstanceClass: z.string().describe(
    "Contains the name of the compute and memory capacity class of the DB instance. If you update this property, some interruptions may occur.",
  ).optional(),
  DBInstanceIdentifier: z.string().describe(
    "Contains a user-supplied database identifier. This identifier is the unique key that identifies a DB instance.",
  ).optional(),
  DBParameterGroupName: z.string().describe(
    "The name of an existing DB parameter group or a reference to an AWS::Neptune::DBParameterGroup resource created in the template. If any of the data members of the referenced parameter group are changed during an update, the DB instance might need to be restarted, which causes some interruption. If the parameter group contains static parameters, whether they were changed or not, an update triggers a reboot.",
  ).optional(),
  DBSnapshotIdentifier: z.string().describe(
    "This parameter is not supported. `AWS::Neptune::DBInstance` does not support restoring from snapshots. `AWS::Neptune::DBCluster` does support restoring from snapshots.",
  ).optional(),
  DBSubnetGroupName: z.string().describe(
    "A DB subnet group to associate with the DB instance. If you update this value, the new subnet group must be a subnet group in a new virtual private cloud (VPC).",
  ).optional(),
  PreferredMaintenanceWindow: z.string().describe(
    "Specifies the weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC).",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this DB instance.",
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

/** Swamp extension model for Neptune DBInstance. Registered at `@swamp/aws/neptune/dbinstance`. */
export const model = {
  type: "@swamp/aws/neptune/dbinstance",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Neptune DBInstance resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Neptune DBInstance",
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
          "AWS::Neptune::DBInstance",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DBInstanceIdentifier ?? g.DBInstanceIdentifier)
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
      description: "Get a Neptune DBInstance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Neptune DBInstance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Neptune::DBInstance",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.DBInstanceIdentifier ??
          context.globalArgs.DBInstanceIdentifier)?.toString() ??
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
      description: "Update a Neptune DBInstance",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBInstanceIdentifier?.toString() ?? "current")
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
        const identifier = existing.DBInstanceIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Neptune::DBInstance",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Neptune::DBInstance",
          identifier,
          currentState,
          desiredState,
          [
            "AvailabilityZone",
            "DBClusterIdentifier",
            "DBInstanceIdentifier",
            "DBSnapshotIdentifier",
            "DBSubnetGroupName",
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
      description: "Delete a Neptune DBInstance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Neptune DBInstance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Neptune::DBInstance",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DBInstanceIdentifier?.toString() ??
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
      description: "Sync Neptune DBInstance state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DBInstanceIdentifier?.toString() ?? "current")
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
        const identifier = existing.DBInstanceIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Neptune::DBInstance",
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
