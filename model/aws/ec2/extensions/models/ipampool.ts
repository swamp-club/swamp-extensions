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

// Auto-generated extension model for @swamp/aws/ec2/ipampool
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 IPAMPool (AWS::EC2::IPAMPool).
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

const ProvisionedCidrSchema = z.object({
  Cidr: z.string().describe("Represents a single IPv4 or IPv6 CIDR"),
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
  AddressFamily: z.string().describe(
    "The address family of the address space in this pool. Either IPv4 or IPv6.",
  ),
  AllocationMinNetmaskLength: z.number().int().describe(
    "The minimum allowed netmask length for allocations made from this pool.",
  ).optional(),
  AllocationDefaultNetmaskLength: z.number().int().describe(
    "The default netmask length for allocations made from this pool. This value is used when the netmask length of an allocation isn't specified.",
  ).optional(),
  AllocationMaxNetmaskLength: z.number().int().describe(
    "The maximum allowed netmask length for allocations made from this pool.",
  ).optional(),
  AllocationResourceTags: z.array(TagSchema).describe(
    "When specified, an allocation will not be allowed unless a resource has a matching set of tags.",
  ).optional(),
  AutoImport: z.boolean().describe(
    "Determines what to do if IPAM discovers resources that haven't been assigned an allocation. If set to true, an allocation will be made automatically.",
  ).optional(),
  AwsService: z.enum(["ec2", "global-services"]).describe(
    "Limits which service in Amazon Web Services that the pool can be used in.",
  ).optional(),
  Description: z.string().optional(),
  IpamScopeId: z.string().describe(
    "The Id of the scope this pool is a part of.",
  ),
  Locale: z.string().describe(
    'The region of this pool. If not set, this will default to "None" which will disable non-custom allocations. If the locale has been specified for the source pool, this value must match.',
  ).optional(),
  ProvisionedCidrs: z.array(ProvisionedCidrSchema).describe(
    "A list of cidrs representing the address space available for allocation in this pool.",
  ).optional(),
  PublicIpSource: z.enum(["byoip", "amazon"]).describe(
    "The IP address source for pools in the public scope. Only used for provisioning IP address CIDRs to pools in the public scope. Default is `byoip`.",
  ).optional(),
  PubliclyAdvertisable: z.boolean().describe(
    "Determines whether or not address space from this pool is publicly advertised. Must be set if and only if the pool is IPv6.",
  ).optional(),
  SourceIpamPoolId: z.string().describe(
    "The Id of this pool's source. If set, all space provisioned in this pool must be free space provisioned in the parent pool.",
  ).optional(),
  SourceResource: z.object({
    ResourceId: z.string(),
    ResourceType: z.string(),
    ResourceRegion: z.string(),
    ResourceOwner: z.string(),
  }).describe(
    "The resource associated with this pool's space. Depending on the ResourceType, setting a SourceResource changes which space can be provisioned in this pool and which types of resources can receive allocations",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  IpamPoolId: z.string(),
  AddressFamily: z.string().optional(),
  AllocationMinNetmaskLength: z.number().optional(),
  AllocationDefaultNetmaskLength: z.number().optional(),
  AllocationMaxNetmaskLength: z.number().optional(),
  AllocationResourceTags: z.array(TagSchema).optional(),
  Arn: z.string().optional(),
  AutoImport: z.boolean().optional(),
  AwsService: z.string().optional(),
  Description: z.string().optional(),
  IpamScopeId: z.string().optional(),
  IpamScopeArn: z.string().optional(),
  IpamScopeType: z.string().optional(),
  IpamArn: z.string().optional(),
  Locale: z.string().optional(),
  PoolDepth: z.number().optional(),
  ProvisionedCidrs: z.array(ProvisionedCidrSchema).optional(),
  PublicIpSource: z.string().optional(),
  PubliclyAdvertisable: z.boolean().optional(),
  SourceIpamPoolId: z.string().optional(),
  SourceResource: z.object({
    ResourceId: z.string(),
    ResourceType: z.string(),
    ResourceRegion: z.string(),
    ResourceOwner: z.string(),
  }).optional(),
  State: z.string().optional(),
  StateMessage: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AddressFamily: z.string().describe(
    "The address family of the address space in this pool. Either IPv4 or IPv6.",
  ).optional(),
  AllocationMinNetmaskLength: z.number().int().describe(
    "The minimum allowed netmask length for allocations made from this pool.",
  ).optional(),
  AllocationDefaultNetmaskLength: z.number().int().describe(
    "The default netmask length for allocations made from this pool. This value is used when the netmask length of an allocation isn't specified.",
  ).optional(),
  AllocationMaxNetmaskLength: z.number().int().describe(
    "The maximum allowed netmask length for allocations made from this pool.",
  ).optional(),
  AllocationResourceTags: z.array(TagSchema).describe(
    "When specified, an allocation will not be allowed unless a resource has a matching set of tags.",
  ).optional(),
  AutoImport: z.boolean().describe(
    "Determines what to do if IPAM discovers resources that haven't been assigned an allocation. If set to true, an allocation will be made automatically.",
  ).optional(),
  AwsService: z.enum(["ec2", "global-services"]).describe(
    "Limits which service in Amazon Web Services that the pool can be used in.",
  ).optional(),
  Description: z.string().optional(),
  IpamScopeId: z.string().describe(
    "The Id of the scope this pool is a part of.",
  ).optional(),
  Locale: z.string().describe(
    'The region of this pool. If not set, this will default to "None" which will disable non-custom allocations. If the locale has been specified for the source pool, this value must match.',
  ).optional(),
  ProvisionedCidrs: z.array(ProvisionedCidrSchema).describe(
    "A list of cidrs representing the address space available for allocation in this pool.",
  ).optional(),
  PublicIpSource: z.enum(["byoip", "amazon"]).describe(
    "The IP address source for pools in the public scope. Only used for provisioning IP address CIDRs to pools in the public scope. Default is `byoip`.",
  ).optional(),
  PubliclyAdvertisable: z.boolean().describe(
    "Determines whether or not address space from this pool is publicly advertised. Must be set if and only if the pool is IPv6.",
  ).optional(),
  SourceIpamPoolId: z.string().describe(
    "The Id of this pool's source. If set, all space provisioned in this pool must be free space provisioned in the parent pool.",
  ).optional(),
  SourceResource: z.object({
    ResourceId: z.string().optional(),
    ResourceType: z.string().optional(),
    ResourceRegion: z.string().optional(),
    ResourceOwner: z.string().optional(),
  }).describe(
    "The resource associated with this pool's space. Depending on the ResourceType, setting a SourceResource changes which space can be provisioned in this pool and which types of resources can receive allocations",
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

/** Swamp extension model for EC2 IPAMPool. Registered at `@swamp/aws/ec2/ipampool`. */
export const model = {
  type: "@swamp/aws/ec2/ipampool",
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
      description: "EC2 IPAMPool resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 IPAMPool",
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
          "AWS::EC2::IPAMPool",
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
      description: "Get a EC2 IPAMPool",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 IPAMPool",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::IPAMPool",
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
      description: "Update a EC2 IPAMPool",
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
        const identifier = existing.IpamPoolId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::IPAMPool",
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
          "AWS::EC2::IPAMPool",
          identifier,
          currentState,
          desiredState,
          [
            "IpamScopeId",
            "SourceIpamPoolId",
            "Locale",
            "AddressFamily",
            "PubliclyAdvertisable",
            "PublicIpSource",
            "AwsService",
            "SourceResource",
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
      description: "Delete a EC2 IPAMPool",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 IPAMPool",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::IPAMPool",
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
      description: "Sync EC2 IPAMPool state from AWS",
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
        const identifier = existing.IpamPoolId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::IPAMPool",
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
