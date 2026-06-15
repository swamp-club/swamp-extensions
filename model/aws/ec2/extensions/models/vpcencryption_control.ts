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

// Auto-generated extension model for @swamp/aws/ec2/vpcencryption-control
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 VPCEncryptionControl (AWS::EC2::VPCEncryptionControl).
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
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to assign to the VPC encryption control.",
  ).optional(),
  VpcId: z.string().describe(
    "The VPC on which this VPC encryption control is applied.",
  ).optional(),
  Mode: z.enum(["monitor", "enforce"]).describe(
    "The VPC encryption control mode, either monitor or enforce.",
  ).optional(),
  InternetGatewayExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable IGW exclusion",
  ).optional(),
  EgressOnlyInternetGatewayExclusionInput: z.enum(["enable", "disable"])
    .describe("Used to enable or disable EIGW exclusion").optional(),
  NatGatewayExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable Nat gateway exclusion",
  ).optional(),
  VirtualPrivateGatewayExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable VGW exclusion",
  ).optional(),
  VpcPeeringExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable VPC peering exclusion",
  ).optional(),
  VpcLatticeExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable Vpc Lattice exclusion",
  ).optional(),
  ElasticFileSystemExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable EFS exclusion",
  ).optional(),
  LambdaExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable Lambda exclusion",
  ).optional(),
});

const StateSchema = z.object({
  VpcEncryptionControlId: z.string(),
  Tags: z.array(TagSchema).optional(),
  VpcId: z.string().optional(),
  Mode: z.string().optional(),
  State: z.string().optional(),
  StateMessage: z.string().optional(),
  InternetGatewayExclusionInput: z.string().optional(),
  EgressOnlyInternetGatewayExclusionInput: z.string().optional(),
  NatGatewayExclusionInput: z.string().optional(),
  VirtualPrivateGatewayExclusionInput: z.string().optional(),
  VpcPeeringExclusionInput: z.string().optional(),
  VpcLatticeExclusionInput: z.string().optional(),
  ElasticFileSystemExclusionInput: z.string().optional(),
  LambdaExclusionInput: z.string().optional(),
  ResourceExclusions: z.object({
    InternetGateway: z.object({
      State: z.string(),
      StateMessage: z.string(),
    }),
    EgressOnlyInternetGateway: z.object({
      State: z.string(),
      StateMessage: z.string(),
    }),
    NatGateway: z.object({
      State: z.string(),
      StateMessage: z.string(),
    }),
    VirtualPrivateGateway: z.object({
      State: z.string(),
      StateMessage: z.string(),
    }),
    VpcPeering: z.object({
      State: z.string(),
      StateMessage: z.string(),
    }),
    VpcLattice: z.object({
      State: z.string(),
      StateMessage: z.string(),
    }),
    ElasticFileSystem: z.object({
      State: z.string(),
      StateMessage: z.string(),
    }),
    Lambda: z.object({
      State: z.string(),
      StateMessage: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to assign to the VPC encryption control.",
  ).optional(),
  VpcId: z.string().describe(
    "The VPC on which this VPC encryption control is applied.",
  ).optional(),
  Mode: z.enum(["monitor", "enforce"]).describe(
    "The VPC encryption control mode, either monitor or enforce.",
  ).optional(),
  InternetGatewayExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable IGW exclusion",
  ).optional(),
  EgressOnlyInternetGatewayExclusionInput: z.enum(["enable", "disable"])
    .describe("Used to enable or disable EIGW exclusion").optional(),
  NatGatewayExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable Nat gateway exclusion",
  ).optional(),
  VirtualPrivateGatewayExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable VGW exclusion",
  ).optional(),
  VpcPeeringExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable VPC peering exclusion",
  ).optional(),
  VpcLatticeExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable Vpc Lattice exclusion",
  ).optional(),
  ElasticFileSystemExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable EFS exclusion",
  ).optional(),
  LambdaExclusionInput: z.enum(["enable", "disable"]).describe(
    "Used to enable or disable Lambda exclusion",
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

/** Swamp extension model for EC2 VPCEncryptionControl. Registered at `@swamp/aws/ec2/vpcencryption-control`. */
export const model = {
  type: "@swamp/aws/ec2/vpcencryption-control",
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
      description: "EC2 VPCEncryptionControl resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 VPCEncryptionControl",
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
          "AWS::EC2::VPCEncryptionControl",
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
      description: "Get a EC2 VPCEncryptionControl",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 VPCEncryptionControl",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::VPCEncryptionControl",
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
      description: "Update a EC2 VPCEncryptionControl",
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
        const identifier = existing.VpcEncryptionControlId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::VPCEncryptionControl",
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
          "AWS::EC2::VPCEncryptionControl",
          identifier,
          currentState,
          desiredState,
          ["VpcId"],
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
      description: "Delete a EC2 VPCEncryptionControl",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 VPCEncryptionControl",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::VPCEncryptionControl",
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
      description: "Sync EC2 VPCEncryptionControl state from AWS",
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
        const identifier = existing.VpcEncryptionControlId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::VPCEncryptionControl",
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
