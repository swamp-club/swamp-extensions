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

// Auto-generated extension model for @swamp/aws/ec2/subnet
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 Subnet (AWS::EC2::Subnet).
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
  Value: z.string().describe("The tag value."),
  Key: z.string().describe("The tag key."),
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
  AssignIpv6AddressOnCreation: z.boolean().describe(
    "Indicates whether a network interface created in this subnet receives an IPv6 address. The default value is false. If you specify AssignIpv6AddressOnCreation, you must also specify an IPv6 CIDR block.",
  ).optional(),
  VpcId: z.string().describe(
    "The ID of the VPC the subnet is in. If you update this property, you must also update the CidrBlock property.",
  ),
  MapPublicIpOnLaunch: z.boolean().describe(
    "Indicates whether instances launched in this subnet receive a public IPv4 address. The default value is false. AWS charges for all public IPv4 addresses, including public IPv4 addresses associated with running instances and Elastic IP addresses. For more information, see the *Public IPv4 Address* tab on the [VPC pricing page](https://docs.aws.amazon.com/vpc/pricing/).",
  ).optional(),
  EnableLniAtDeviceIndex: z.number().int().describe(
    "Indicates the device position for local network interfaces in this subnet. For example, 1 indicates local network interfaces in this subnet are the secondary network interface (eth1).",
  ).optional(),
  AvailabilityZone: z.string().describe(
    "The Availability Zone of the subnet. If you update this property, you must also update the CidrBlock property.",
  ).optional(),
  AvailabilityZoneId: z.string().describe("The AZ ID of the subnet.")
    .optional(),
  CidrBlock: z.string().describe(
    "The IPv4 CIDR block assigned to the subnet. If you update this property, we create a new subnet, and then delete the existing one.",
  ).optional(),
  Ipv6CidrBlock: z.string().describe(
    "The IPv6 CIDR block. If you specify AssignIpv6AddressOnCreation, you must also specify an IPv6 CIDR block.",
  ).optional(),
  OutpostArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Outpost.",
  ).optional(),
  Ipv6Native: z.boolean().describe(
    "Indicates whether this is an IPv6 only subnet. For more information, see [Subnet basics](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html#subnet-basics) in the *User Guide*.",
  ).optional(),
  EnableDns64: z.boolean().describe(
    "Indicates whether DNS queries made to the Amazon-provided DNS Resolver in this subnet should return synthetic IPv6 addresses for IPv4-only destinations. You must first configure a NAT gateway in a public subnet (separate from the subnet containing the IPv6-only workloads). For example, the subnet containing the NAT gateway should have a 0.0.0.0/0 route pointing to the internet gateway. For more information, see [Configure DNS64 and NAT64](https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-nat64-dns64.html#nat-gateway-nat64-dns64-walkthrough) in the *User Guide*.",
  ).optional(),
  PrivateDnsNameOptionsOnLaunch: z.object({
    HostnameType: z.string().optional(),
    EnableResourceNameDnsARecord: z.boolean().optional(),
    EnableResourceNameDnsAAAARecord: z.boolean().optional(),
  }).describe(
    "The hostname type for EC2 instances launched into this subnet and how DNS A and AAAA record queries to the instances should be handled. For more information, see [Amazon EC2 instance hostname types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-naming.html) in the *User Guide*. Available options: EnableResourceNameDnsAAAARecord (true | false) EnableResourceNameDnsARecord (true | false) HostnameType (ip-name | resource-name)",
  ).optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the subnet.")
    .optional(),
  Ipv4IpamPoolId: z.string().describe("An IPv4 IPAM pool ID for the subnet.")
    .optional(),
  Ipv4NetmaskLength: z.number().int().describe(
    "An IPv4 netmask length for the subnet.",
  ).optional(),
  Ipv6IpamPoolId: z.string().describe("An IPv6 IPAM pool ID for the subnet.")
    .optional(),
  Ipv6NetmaskLength: z.number().int().describe(
    "An IPv6 netmask length for the subnet.",
  ).optional(),
  BlockPublicAccessStates: z.object({
    InternetGatewayBlockMode: z.string().describe(
      "The mode of VPC BPA. Options here are off, block-bidirectional, block-ingress",
    ).optional(),
  }).optional(),
});

const StateSchema = z.object({
  AssignIpv6AddressOnCreation: z.boolean().optional(),
  VpcId: z.string().optional(),
  MapPublicIpOnLaunch: z.boolean().optional(),
  EnableLniAtDeviceIndex: z.number().optional(),
  NetworkAclAssociationId: z.string().optional(),
  AvailabilityZone: z.string().optional(),
  AvailabilityZoneId: z.string().optional(),
  CidrBlock: z.string().optional(),
  SubnetId: z.string(),
  Ipv6CidrBlocks: z.array(z.string()).optional(),
  Ipv6CidrBlock: z.string().optional(),
  OutpostArn: z.string().optional(),
  Ipv6Native: z.boolean().optional(),
  EnableDns64: z.boolean().optional(),
  PrivateDnsNameOptionsOnLaunch: z.object({
    HostnameType: z.string(),
    EnableResourceNameDnsARecord: z.boolean(),
    EnableResourceNameDnsAAAARecord: z.boolean(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Ipv4IpamPoolId: z.string().optional(),
  Ipv4NetmaskLength: z.number().optional(),
  Ipv6IpamPoolId: z.string().optional(),
  Ipv6NetmaskLength: z.number().optional(),
  BlockPublicAccessStates: z.object({
    InternetGatewayBlockMode: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AssignIpv6AddressOnCreation: z.boolean().describe(
    "Indicates whether a network interface created in this subnet receives an IPv6 address. The default value is false. If you specify AssignIpv6AddressOnCreation, you must also specify an IPv6 CIDR block.",
  ).optional(),
  VpcId: z.string().describe(
    "The ID of the VPC the subnet is in. If you update this property, you must also update the CidrBlock property.",
  ).optional(),
  MapPublicIpOnLaunch: z.boolean().describe(
    "Indicates whether instances launched in this subnet receive a public IPv4 address. The default value is false. AWS charges for all public IPv4 addresses, including public IPv4 addresses associated with running instances and Elastic IP addresses. For more information, see the *Public IPv4 Address* tab on the [VPC pricing page](https://docs.aws.amazon.com/vpc/pricing/).",
  ).optional(),
  EnableLniAtDeviceIndex: z.number().int().describe(
    "Indicates the device position for local network interfaces in this subnet. For example, 1 indicates local network interfaces in this subnet are the secondary network interface (eth1).",
  ).optional(),
  AvailabilityZone: z.string().describe(
    "The Availability Zone of the subnet. If you update this property, you must also update the CidrBlock property.",
  ).optional(),
  AvailabilityZoneId: z.string().describe("The AZ ID of the subnet.")
    .optional(),
  CidrBlock: z.string().describe(
    "The IPv4 CIDR block assigned to the subnet. If you update this property, we create a new subnet, and then delete the existing one.",
  ).optional(),
  Ipv6CidrBlock: z.string().describe(
    "The IPv6 CIDR block. If you specify AssignIpv6AddressOnCreation, you must also specify an IPv6 CIDR block.",
  ).optional(),
  OutpostArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Outpost.",
  ).optional(),
  Ipv6Native: z.boolean().describe(
    "Indicates whether this is an IPv6 only subnet. For more information, see [Subnet basics](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html#subnet-basics) in the *User Guide*.",
  ).optional(),
  EnableDns64: z.boolean().describe(
    "Indicates whether DNS queries made to the Amazon-provided DNS Resolver in this subnet should return synthetic IPv6 addresses for IPv4-only destinations. You must first configure a NAT gateway in a public subnet (separate from the subnet containing the IPv6-only workloads). For example, the subnet containing the NAT gateway should have a 0.0.0.0/0 route pointing to the internet gateway. For more information, see [Configure DNS64 and NAT64](https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-nat64-dns64.html#nat-gateway-nat64-dns64-walkthrough) in the *User Guide*.",
  ).optional(),
  PrivateDnsNameOptionsOnLaunch: z.object({
    HostnameType: z.string().optional(),
    EnableResourceNameDnsARecord: z.boolean().optional(),
    EnableResourceNameDnsAAAARecord: z.boolean().optional(),
  }).describe(
    "The hostname type for EC2 instances launched into this subnet and how DNS A and AAAA record queries to the instances should be handled. For more information, see [Amazon EC2 instance hostname types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-naming.html) in the *User Guide*. Available options: EnableResourceNameDnsAAAARecord (true | false) EnableResourceNameDnsARecord (true | false) HostnameType (ip-name | resource-name)",
  ).optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the subnet.")
    .optional(),
  Ipv4IpamPoolId: z.string().describe("An IPv4 IPAM pool ID for the subnet.")
    .optional(),
  Ipv4NetmaskLength: z.number().int().describe(
    "An IPv4 netmask length for the subnet.",
  ).optional(),
  Ipv6IpamPoolId: z.string().describe("An IPv6 IPAM pool ID for the subnet.")
    .optional(),
  Ipv6NetmaskLength: z.number().int().describe(
    "An IPv6 netmask length for the subnet.",
  ).optional(),
  BlockPublicAccessStates: z.object({
    InternetGatewayBlockMode: z.string().describe(
      "The mode of VPC BPA. Options here are off, block-bidirectional, block-ingress",
    ).optional(),
  }).optional(),
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

/** Swamp extension model for EC2 Subnet. Registered at `@swamp/aws/ec2/subnet`. */
export const model = {
  type: "@swamp/aws/ec2/subnet",
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
      description: "EC2 Subnet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 Subnet",
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
          "AWS::EC2::Subnet",
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
      description: "Get a EC2 Subnet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 Subnet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::Subnet",
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
      description: "Update a EC2 Subnet",
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
        const identifier = existing.SubnetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::Subnet",
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
          "AWS::EC2::Subnet",
          identifier,
          currentState,
          desiredState,
          [
            "VpcId",
            "AvailabilityZone",
            "AvailabilityZoneId",
            "CidrBlock",
            "OutpostArn",
            "Ipv6Native",
            "Ipv4IpamPoolId",
            "Ipv4NetmaskLength",
            "Ipv6IpamPoolId",
            "Ipv6NetmaskLength",
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
      description: "Delete a EC2 Subnet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 Subnet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::Subnet",
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
      description: "Sync EC2 Subnet state from AWS",
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
        const identifier = existing.SubnetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::Subnet",
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
