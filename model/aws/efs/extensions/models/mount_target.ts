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

// Auto-generated extension model for @swamp/aws/efs/mount-target
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EFS MountTarget (AWS::EFS::MountTarget).
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
  IpAddress: z.string().describe(
    "If the IpAddressType for the mount target is IPv4 ( IPV4_ONLY or DUAL_STACK), then specify the IPv4 address to use. If you do not specify an IpAddress, then Amazon EFS selects an unused IP address from the subnet specified for SubnetId.",
  ).optional(),
  Ipv6Address: z.string().describe(
    "If the IPAddressType for the mount target is IPv6 ( IPV6_ONLY or DUAL_STACK), then specify the IPv6 address to use. If you do not specify an Ipv6Address, then Amazon EFS selects an unused IP address from the subnet specified for SubnetId.",
  ).optional(),
  IpAddressType: z.enum(["IPV4_ONLY", "IPV6_ONLY", "DUAL_STACK"]).describe(
    "The IP address type for the mount target. The possible values are IPV4_ONLY (only IPv4 addresses), IPV6_ONLY (only IPv6 addresses), and DUAL_STACK (dual-stack, both IPv4 and IPv6 addresses). If you don’t specify an IpAddressType, then IPV4_ONLY is used. The IPAddressType must match the IP type of the subnet. Additionally, the IPAddressType parameter overrides the value set as the default IP address for the subnet in the VPC. For example, if the IPAddressType is IPV4_ONLY and AssignIpv6AddressOnCreation is true, then IPv4 is used for the mount target. For more information, see [Modify the IP addressing attributes of your subnet](https://docs.aws.amazon.com/vpc/latest/userguide/subnet-public-ip.html).",
  ).optional(),
  FileSystemId: z.string().describe(
    "The ID of the file system for which to create the mount target.",
  ),
  SecurityGroups: z.array(z.string()).describe(
    "VPC security group IDs, of the form sg-xxxxxxxx. These must be for the same VPC as the subnet specified. The maximum number of security groups depends on account quota. For more information, see [Amazon VPC Quotas](https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html) in the *Amazon VPC User Guide* (see the *Security Groups* table). If you don't specify a security group, then Amazon EFS uses the default security group for the subnet's VPC.",
  ),
  SubnetId: z.string().describe(
    "The ID of the subnet to add the mount target in. For One Zone file systems, use the subnet that is associated with the file system's Availability Zone. The subnet type must be the same type as the IpAddressType.",
  ),
});

const StateSchema = z.object({
  Id: z.string(),
  IpAddress: z.string().optional(),
  Ipv6Address: z.string().optional(),
  IpAddressType: z.string().optional(),
  FileSystemId: z.string().optional(),
  SecurityGroups: z.array(z.string()).optional(),
  SubnetId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  IpAddress: z.string().describe(
    "If the IpAddressType for the mount target is IPv4 ( IPV4_ONLY or DUAL_STACK), then specify the IPv4 address to use. If you do not specify an IpAddress, then Amazon EFS selects an unused IP address from the subnet specified for SubnetId.",
  ).optional(),
  Ipv6Address: z.string().describe(
    "If the IPAddressType for the mount target is IPv6 ( IPV6_ONLY or DUAL_STACK), then specify the IPv6 address to use. If you do not specify an Ipv6Address, then Amazon EFS selects an unused IP address from the subnet specified for SubnetId.",
  ).optional(),
  IpAddressType: z.enum(["IPV4_ONLY", "IPV6_ONLY", "DUAL_STACK"]).describe(
    "The IP address type for the mount target. The possible values are IPV4_ONLY (only IPv4 addresses), IPV6_ONLY (only IPv6 addresses), and DUAL_STACK (dual-stack, both IPv4 and IPv6 addresses). If you don’t specify an IpAddressType, then IPV4_ONLY is used. The IPAddressType must match the IP type of the subnet. Additionally, the IPAddressType parameter overrides the value set as the default IP address for the subnet in the VPC. For example, if the IPAddressType is IPV4_ONLY and AssignIpv6AddressOnCreation is true, then IPv4 is used for the mount target. For more information, see [Modify the IP addressing attributes of your subnet](https://docs.aws.amazon.com/vpc/latest/userguide/subnet-public-ip.html).",
  ).optional(),
  FileSystemId: z.string().describe(
    "The ID of the file system for which to create the mount target.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "VPC security group IDs, of the form sg-xxxxxxxx. These must be for the same VPC as the subnet specified. The maximum number of security groups depends on account quota. For more information, see [Amazon VPC Quotas](https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html) in the *Amazon VPC User Guide* (see the *Security Groups* table). If you don't specify a security group, then Amazon EFS uses the default security group for the subnet's VPC.",
  ).optional(),
  SubnetId: z.string().describe(
    "The ID of the subnet to add the mount target in. For One Zone file systems, use the subnet that is associated with the file system's Availability Zone. The subnet type must be the same type as the IpAddressType.",
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

/** Swamp extension model for EFS MountTarget. Registered at `@swamp/aws/efs/mount-target`. */
export const model = {
  type: "@swamp/aws/efs/mount-target",
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
      description: "EFS MountTarget resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EFS MountTarget",
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
          "AWS::EFS::MountTarget",
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
      description: "Get a EFS MountTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EFS MountTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EFS::MountTarget",
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
      description: "Update a EFS MountTarget",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EFS::MountTarget",
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
          "AWS::EFS::MountTarget",
          identifier,
          currentState,
          desiredState,
          [
            "IpAddress",
            "Ipv6Address",
            "IpAddressType",
            "SubnetId",
            "FileSystemId",
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
      description: "Delete a EFS MountTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EFS MountTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EFS::MountTarget",
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
      description: "Sync EFS MountTarget state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EFS::MountTarget",
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
