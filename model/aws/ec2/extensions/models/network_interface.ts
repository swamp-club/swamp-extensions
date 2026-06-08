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

// Auto-generated extension model for @swamp/aws/ec2/network-interface
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 NetworkInterface (AWS::EC2::NetworkInterface).
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

const PrivateIpAddressSpecificationSchema = z.object({
  PrivateIpAddress: z.string(),
  Primary: z.boolean(),
});

const Ipv4PrefixSpecificationSchema = z.object({
  Ipv4Prefix: z.string(),
});

const InstanceIpv6AddressSchema = z.object({
  Ipv6Address: z.string(),
});

const Ipv6PrefixSpecificationSchema = z.object({
  Ipv6Prefix: z.string(),
});

const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
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
  Description: z.string().describe("A description for the network interface.")
    .optional(),
  PrivateIpAddress: z.string().describe(
    "Assigns a single private IP address to the network interface, which is used as the primary private IP address. If you want to specify multiple private IP address, use the PrivateIpAddresses property.",
  ).optional(),
  PrivateIpAddresses: z.array(PrivateIpAddressSpecificationSchema).describe(
    "Assigns a list of private IP addresses to the network interface. You can specify a primary private IP address by setting the value of the Primary property to true in the PrivateIpAddressSpecification property. If you want EC2 to automatically assign private IP addresses, use the SecondaryPrivateIpAddressCount property and do not specify this property.",
  ).optional(),
  SecondaryPrivateIpAddressCount: z.number().int().describe(
    "The number of secondary private IPv4 addresses to assign to a network interface. When you specify a number of secondary IPv4 addresses, Amazon EC2 selects these IP addresses within the subnet's IPv4 CIDR range. You can't specify this option and specify more than one private IP address using privateIpAddresses",
  ).optional(),
  Ipv4Prefixes: z.array(Ipv4PrefixSpecificationSchema).describe(
    "Assigns a list of IPv4 prefixes to the network interface. If you want EC2 to automatically assign IPv4 prefixes, use the Ipv4PrefixCount property and do not specify this property. Presently, only /28 prefixes are supported. You can't specify IPv4 prefixes if you've specified one of the following: a count of IPv4 prefixes, specific private IPv4 addresses, or a count of private IPv4 addresses.",
  ).optional(),
  Ipv4PrefixCount: z.number().int().describe(
    "The number of IPv4 prefixes to assign to a network interface. When you specify a number of IPv4 prefixes, Amazon EC2 selects these prefixes from your existing subnet CIDR reservations, if available, or from free spaces in the subnet. By default, these will be /28 prefixes. You can't specify a count of IPv4 prefixes if you've specified one of the following: specific IPv4 prefixes, specific private IPv4 addresses, or a count of private IPv4 addresses.",
  ).optional(),
  GroupSet: z.array(z.string()).describe(
    "A list of security group IDs associated with this network interface.",
  ).optional(),
  Ipv6Addresses: z.array(InstanceIpv6AddressSchema).describe(
    "One or more specific IPv6 addresses from the IPv6 CIDR block range of your subnet to associate with the network interface. If you're specifying a number of IPv6 addresses, use the Ipv6AddressCount property and don't specify this property.",
  ).optional(),
  Ipv6Prefixes: z.array(Ipv6PrefixSpecificationSchema).describe(
    "Assigns a list of IPv6 prefixes to the network interface. If you want EC2 to automatically assign IPv6 prefixes, use the Ipv6PrefixCount property and do not specify this property. Presently, only /80 prefixes are supported. You can't specify IPv6 prefixes if you've specified one of the following: a count of IPv6 prefixes, specific IPv6 addresses, or a count of IPv6 addresses.",
  ).optional(),
  Ipv6PrefixCount: z.number().int().describe(
    "The number of IPv6 prefixes to assign to a network interface. When you specify a number of IPv6 prefixes, Amazon EC2 selects these prefixes from your existing subnet CIDR reservations, if available, or from free spaces in the subnet. By default, these will be /80 prefixes. You can't specify a count of IPv6 prefixes if you've specified one of the following: specific IPv6 prefixes, specific IPv6 addresses, or a count of IPv6 addresses.",
  ).optional(),
  SubnetId: z.string().describe(
    "The ID of the subnet to associate with the network interface.",
  ),
  SourceDestCheck: z.boolean().describe(
    "Indicates whether traffic to or from the instance is validated.",
  ).optional(),
  InterfaceType: z.string().describe("Indicates the type of network interface.")
    .optional(),
  Ipv6AddressCount: z.number().int().describe(
    "The number of IPv6 addresses to assign to a network interface. Amazon EC2 automatically selects the IPv6 addresses from the subnet range. To specify specific IPv6 addresses, use the Ipv6Addresses property and don't specify this property.",
  ).optional(),
  EnablePrimaryIpv6: z.boolean().describe(
    "If you have instances or ENIs that rely on the IPv6 address not changing, to avoid disrupting traffic to instances or ENIs, you can enable a primary IPv6 address. Enable this option to automatically assign an IPv6 associated with the ENI attached to your instance to be the primary IPv6 address. When you enable an IPv6 address to be a primary IPv6, you cannot disable it. Traffic will be routed to the primary IPv6 address until the instance is terminated or the ENI is detached. If you have multiple IPv6 addresses associated with an ENI and you enable a primary IPv6 address, the first IPv6 address associated with the ENI becomes the primary IPv6 address.",
  ).optional(),
  ConnectionTrackingSpecification: z.object({
    TcpEstablishedTimeout: z.number().int().optional(),
    UdpStreamTimeout: z.number().int().optional(),
    UdpTimeout: z.number().int().optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this network interface.",
  ).optional(),
  PublicIpDnsHostnameTypeSpecification: z.enum([
    "public-dual-stack-dns-name",
    "public-ipv4-dns-name",
    "public-ipv6-dns-name",
  ]).describe("Public IP DNS hostname type").optional(),
  PublicIpDnsNameOptions: z.object({
    DnsHostnameType: z.string().optional(),
    PublicIpv4DnsName: z.string().optional(),
    PublicIpv6DnsName: z.string().optional(),
    PublicDualStackDnsName: z.string().optional(),
  }).describe(
    "Describes the public hostname type options, including public hostname type, IPv4-enabled public hostname, IPv6-enabled public hostname, and dual-stack public hostname.",
  ).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  PrivateIpAddress: z.string().optional(),
  PrivateIpAddresses: z.array(PrivateIpAddressSpecificationSchema).optional(),
  SecondaryPrivateIpAddressCount: z.number().optional(),
  PrimaryPrivateIpAddress: z.string().optional(),
  Ipv4Prefixes: z.array(Ipv4PrefixSpecificationSchema).optional(),
  Ipv4PrefixCount: z.number().optional(),
  GroupSet: z.array(z.string()).optional(),
  Ipv6Addresses: z.array(InstanceIpv6AddressSchema).optional(),
  Ipv6Prefixes: z.array(Ipv6PrefixSpecificationSchema).optional(),
  Ipv6PrefixCount: z.number().optional(),
  SubnetId: z.string().optional(),
  SourceDestCheck: z.boolean().optional(),
  InterfaceType: z.string().optional(),
  SecondaryPrivateIpAddresses: z.array(z.string()).optional(),
  Ipv6AddressCount: z.number().optional(),
  EnablePrimaryIpv6: z.boolean().optional(),
  PrimaryIpv6Address: z.string().optional(),
  ConnectionTrackingSpecification: z.object({
    TcpEstablishedTimeout: z.number(),
    UdpStreamTimeout: z.number(),
    UdpTimeout: z.number(),
  }).optional(),
  Id: z.string(),
  Tags: z.array(TagSchema).optional(),
  VpcId: z.string().optional(),
  PublicIpDnsHostnameTypeSpecification: z.string().optional(),
  PublicIpDnsNameOptions: z.object({
    DnsHostnameType: z.string(),
    PublicIpv4DnsName: z.string(),
    PublicIpv6DnsName: z.string(),
    PublicDualStackDnsName: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().describe("A description for the network interface.")
    .optional(),
  PrivateIpAddress: z.string().describe(
    "Assigns a single private IP address to the network interface, which is used as the primary private IP address. If you want to specify multiple private IP address, use the PrivateIpAddresses property.",
  ).optional(),
  PrivateIpAddresses: z.array(PrivateIpAddressSpecificationSchema).describe(
    "Assigns a list of private IP addresses to the network interface. You can specify a primary private IP address by setting the value of the Primary property to true in the PrivateIpAddressSpecification property. If you want EC2 to automatically assign private IP addresses, use the SecondaryPrivateIpAddressCount property and do not specify this property.",
  ).optional(),
  SecondaryPrivateIpAddressCount: z.number().int().describe(
    "The number of secondary private IPv4 addresses to assign to a network interface. When you specify a number of secondary IPv4 addresses, Amazon EC2 selects these IP addresses within the subnet's IPv4 CIDR range. You can't specify this option and specify more than one private IP address using privateIpAddresses",
  ).optional(),
  Ipv4Prefixes: z.array(Ipv4PrefixSpecificationSchema).describe(
    "Assigns a list of IPv4 prefixes to the network interface. If you want EC2 to automatically assign IPv4 prefixes, use the Ipv4PrefixCount property and do not specify this property. Presently, only /28 prefixes are supported. You can't specify IPv4 prefixes if you've specified one of the following: a count of IPv4 prefixes, specific private IPv4 addresses, or a count of private IPv4 addresses.",
  ).optional(),
  Ipv4PrefixCount: z.number().int().describe(
    "The number of IPv4 prefixes to assign to a network interface. When you specify a number of IPv4 prefixes, Amazon EC2 selects these prefixes from your existing subnet CIDR reservations, if available, or from free spaces in the subnet. By default, these will be /28 prefixes. You can't specify a count of IPv4 prefixes if you've specified one of the following: specific IPv4 prefixes, specific private IPv4 addresses, or a count of private IPv4 addresses.",
  ).optional(),
  GroupSet: z.array(z.string()).describe(
    "A list of security group IDs associated with this network interface.",
  ).optional(),
  Ipv6Addresses: z.array(InstanceIpv6AddressSchema).describe(
    "One or more specific IPv6 addresses from the IPv6 CIDR block range of your subnet to associate with the network interface. If you're specifying a number of IPv6 addresses, use the Ipv6AddressCount property and don't specify this property.",
  ).optional(),
  Ipv6Prefixes: z.array(Ipv6PrefixSpecificationSchema).describe(
    "Assigns a list of IPv6 prefixes to the network interface. If you want EC2 to automatically assign IPv6 prefixes, use the Ipv6PrefixCount property and do not specify this property. Presently, only /80 prefixes are supported. You can't specify IPv6 prefixes if you've specified one of the following: a count of IPv6 prefixes, specific IPv6 addresses, or a count of IPv6 addresses.",
  ).optional(),
  Ipv6PrefixCount: z.number().int().describe(
    "The number of IPv6 prefixes to assign to a network interface. When you specify a number of IPv6 prefixes, Amazon EC2 selects these prefixes from your existing subnet CIDR reservations, if available, or from free spaces in the subnet. By default, these will be /80 prefixes. You can't specify a count of IPv6 prefixes if you've specified one of the following: specific IPv6 prefixes, specific IPv6 addresses, or a count of IPv6 addresses.",
  ).optional(),
  SubnetId: z.string().describe(
    "The ID of the subnet to associate with the network interface.",
  ).optional(),
  SourceDestCheck: z.boolean().describe(
    "Indicates whether traffic to or from the instance is validated.",
  ).optional(),
  InterfaceType: z.string().describe("Indicates the type of network interface.")
    .optional(),
  Ipv6AddressCount: z.number().int().describe(
    "The number of IPv6 addresses to assign to a network interface. Amazon EC2 automatically selects the IPv6 addresses from the subnet range. To specify specific IPv6 addresses, use the Ipv6Addresses property and don't specify this property.",
  ).optional(),
  EnablePrimaryIpv6: z.boolean().describe(
    "If you have instances or ENIs that rely on the IPv6 address not changing, to avoid disrupting traffic to instances or ENIs, you can enable a primary IPv6 address. Enable this option to automatically assign an IPv6 associated with the ENI attached to your instance to be the primary IPv6 address. When you enable an IPv6 address to be a primary IPv6, you cannot disable it. Traffic will be routed to the primary IPv6 address until the instance is terminated or the ENI is detached. If you have multiple IPv6 addresses associated with an ENI and you enable a primary IPv6 address, the first IPv6 address associated with the ENI becomes the primary IPv6 address.",
  ).optional(),
  ConnectionTrackingSpecification: z.object({
    TcpEstablishedTimeout: z.number().int().optional(),
    UdpStreamTimeout: z.number().int().optional(),
    UdpTimeout: z.number().int().optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this network interface.",
  ).optional(),
  PublicIpDnsHostnameTypeSpecification: z.enum([
    "public-dual-stack-dns-name",
    "public-ipv4-dns-name",
    "public-ipv6-dns-name",
  ]).describe("Public IP DNS hostname type").optional(),
  PublicIpDnsNameOptions: z.object({
    DnsHostnameType: z.string().optional(),
    PublicIpv4DnsName: z.string().optional(),
    PublicIpv6DnsName: z.string().optional(),
    PublicDualStackDnsName: z.string().optional(),
  }).describe(
    "Describes the public hostname type options, including public hostname type, IPv4-enabled public hostname, IPv6-enabled public hostname, and dual-stack public hostname.",
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

/** Swamp extension model for EC2 NetworkInterface. Registered at `@swamp/aws/ec2/network-interface`. */
export const model = {
  type: "@swamp/aws/ec2/network-interface",
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
      description: "EC2 NetworkInterface resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 NetworkInterface",
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
          "AWS::EC2::NetworkInterface",
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
      description: "Get a EC2 NetworkInterface",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 NetworkInterface",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::NetworkInterface",
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
      description: "Update a EC2 NetworkInterface",
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
          "AWS::EC2::NetworkInterface",
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
          "AWS::EC2::NetworkInterface",
          identifier,
          currentState,
          desiredState,
          ["PrivateIpAddress", "InterfaceType", "SubnetId"],
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
      description: "Delete a EC2 NetworkInterface",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 NetworkInterface",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::NetworkInterface",
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
      description: "Sync EC2 NetworkInterface state from AWS",
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
            "AWS::EC2::NetworkInterface",
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
