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

// Auto-generated extension model for @swamp/aws/ec2/ipamprefix-list-resolver
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 IPAMPrefixListResolver (AWS::EC2::IPAMPrefixListResolver).
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

const IpamPrefixListResolverRuleConditionSchema = z.object({
  Operation: z.enum(["equals", "not-equals", "subnet-of"]).describe(
    "Equals, Not equals, or Subnet Of. The subnet-of operation only applies to cidr conditions.",
  ).optional(),
  IpamPoolId: z.string().describe(
    "Condition for the IPAM Pool CIDR rule type. If not chosen, the resolver applies to all IPAM Pool CIDRs in the scope.",
  ).optional(),
  ResourceId: z.string().describe(
    "Condition for the IPAM Resource CIDR rule type. The unique ID of a resource (like vpc-1234567890abcdef0).",
  ).optional(),
  ResourceOwner: z.string().describe(
    "Condition for the IPAM Resource CIDR rule type. Resource owner (like 111122223333).",
  ).optional(),
  ResourceRegion: z.string().describe(
    "Condition for the IPAM Resource CIDR rule type. Resource region (like us-east-1).",
  ).optional(),
  Cidr: z.string().describe(
    "Condition for the IPAM Resource CIDR rule type. CIDR (like 10.24.34.0/23).",
  ).optional(),
  ResourceTag: TagSchema.describe(
    "Condition for the IPAM Resource CIDR rule type. Resource Tag (like dev-vpc-1).",
  ).optional(),
});

const IpamPrefixListResolverRuleSchema = z.object({
  RuleType: z.enum(["static-cidr", "ipam-resource-cidr", "ipam-pool-cidr"])
    .describe(
      "There are three rule types: (1) Static CIDR: A fixed list of CIDRs that don't change (like a manual list replicated across Regions). (2) IPAM pool CIDR: CIDRs from specific IPAM pools (like all CIDRs from your IPAM production pool). (3) IPAM resource CIDR: CIDRs for AWS resources like VPCs, subnets, and EIPs within a specific IPAM scope.",
    ),
  StaticCidr: z.string().describe("A fixed CIDR that doesn't change")
    .optional(),
  IpamScopeId: z.string().describe(
    "This rule will only match resources that are in this IPAM Scope.",
  ).optional(),
  ResourceType: z.enum(["vpc", "subnet", "eip", "public-ipv4-pool"]).describe(
    "The resourceType property only applies to ipam-resource-cidr rules; this property specifies what type of resources this rule will apply to, such as VPCs or Subnets.",
  ).optional(),
  Conditions: z.array(IpamPrefixListResolverRuleConditionSchema).describe(
    "Two of the rule types allow you to add conditions to the rules. (1) For IPAM Pool CIDR rules, you can specify an ipamPoolId; if not specified, the rule will apply to all IPAM Pool CIDRs in the scope. (2) For IPAM Resource CIDR rules, you can specify resourceId, resourceOwner, resourceRegion, cidr, or resourceTag.",
  ).optional(),
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
  IpamId: z.string().describe(
    "The Id of the IPAM this Prefix List Resolver is a part of.",
  ).optional(),
  AddressFamily: z.string().describe(
    "The address family of the address space in this Prefix List Resolver. Either IPv4 or IPv6.",
  ),
  Description: z.string().optional(),
  Rules: z.array(IpamPrefixListResolverRuleSchema).describe(
    "Rules define the business logic for selecting CIDRs from IPAM.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  IpamId: z.string().optional(),
  IpamArn: z.string().optional(),
  IpamPrefixListResolverId: z.string(),
  IpamPrefixListResolverArn: z.string().optional(),
  AddressFamily: z.string().optional(),
  Description: z.string().optional(),
  Rules: z.array(IpamPrefixListResolverRuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  IpamId: z.string().describe(
    "The Id of the IPAM this Prefix List Resolver is a part of.",
  ).optional(),
  AddressFamily: z.string().describe(
    "The address family of the address space in this Prefix List Resolver. Either IPv4 or IPv6.",
  ).optional(),
  Description: z.string().optional(),
  Rules: z.array(IpamPrefixListResolverRuleSchema).describe(
    "Rules define the business logic for selecting CIDRs from IPAM.",
  ).optional(),
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

/** Swamp extension model for EC2 IPAMPrefixListResolver. Registered at `@swamp/aws/ec2/ipamprefix-list-resolver`. */
export const model = {
  type: "@swamp/aws/ec2/ipamprefix-list-resolver",
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
      description: "EC2 IPAMPrefixListResolver resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 IPAMPrefixListResolver",
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
          "AWS::EC2::IPAMPrefixListResolver",
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
      description: "Get a EC2 IPAMPrefixListResolver",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 IPAMPrefixListResolver",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::IPAMPrefixListResolver",
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
      description: "Update a EC2 IPAMPrefixListResolver",
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
        const identifier = existing.IpamPrefixListResolverId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::IPAMPrefixListResolver",
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
          "AWS::EC2::IPAMPrefixListResolver",
          identifier,
          currentState,
          desiredState,
          ["IpamId", "AddressFamily"],
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
      description: "Delete a EC2 IPAMPrefixListResolver",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 IPAMPrefixListResolver",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::IPAMPrefixListResolver",
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
      description: "Sync EC2 IPAMPrefixListResolver state from AWS",
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
        const identifier = existing.IpamPrefixListResolverId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::IPAMPrefixListResolver",
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
