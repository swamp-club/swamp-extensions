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

// Auto-generated extension model for @swamp/aws/ec2/customer-gateway
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 CustomerGateway (AWS::EC2::CustomerGateway).
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
  Type: z.string().describe(
    "The type of VPN connection that this customer gateway supports ( ipsec.1).",
  ),
  IpAddress: z.string().describe(
    "The IP address for the customer gateway device's outside interface. The address must be static. If OutsideIpAddressType in your VPN connection options is set to PrivateIpv4, you can use an RFC6598 or RFC1918 private IPv4 address. If OutsideIpAddressType is set to Ipv6, you can use an IPv6 address.",
  ),
  BgpAsnExtended: z.number().min(2147483648).max(4294967294).describe(
    "For customer gateway devices that support BGP, specify the device's ASN. You must specify either BgpAsn or BgpAsnExtended when creating the customer gateway. If the ASN is larger than 2,147,483,647, you must use BgpAsnExtended. Valid values: 2,147,483,648 to 4,294,967,295",
  ).optional(),
  BgpAsn: z.number().int().describe(
    "For customer gateway devices that support BGP, specify the device's ASN. You must specify either BgpAsn or BgpAsnExtended when creating the customer gateway. If the ASN is larger than 2,147,483,647, you must use BgpAsnExtended. Default: 65000 Valid values: 1 to 2,147,483,647",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "One or more tags for the customer gateway.",
  ).optional(),
  CertificateArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:acm:[a-z]{2}((-gov)|(-iso([a-z]{1})?))?-[a-z]+-\\d{1}:\\d{12}:certificate\\/[a-zA-Z0-9-_]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) for the customer gateway certificate.",
  ).optional(),
  DeviceName: z.string().describe("The name of customer gateway device.")
    .optional(),
});

const StateSchema = z.object({
  Type: z.string().optional(),
  CustomerGatewayId: z.string(),
  IpAddress: z.string().optional(),
  BgpAsnExtended: z.number().optional(),
  BgpAsn: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
  CertificateArn: z.string().optional(),
  DeviceName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Type: z.string().describe(
    "The type of VPN connection that this customer gateway supports ( ipsec.1).",
  ).optional(),
  IpAddress: z.string().describe(
    "The IP address for the customer gateway device's outside interface. The address must be static. If OutsideIpAddressType in your VPN connection options is set to PrivateIpv4, you can use an RFC6598 or RFC1918 private IPv4 address. If OutsideIpAddressType is set to Ipv6, you can use an IPv6 address.",
  ).optional(),
  BgpAsnExtended: z.number().min(2147483648).max(4294967294).describe(
    "For customer gateway devices that support BGP, specify the device's ASN. You must specify either BgpAsn or BgpAsnExtended when creating the customer gateway. If the ASN is larger than 2,147,483,647, you must use BgpAsnExtended. Valid values: 2,147,483,648 to 4,294,967,295",
  ).optional(),
  BgpAsn: z.number().int().describe(
    "For customer gateway devices that support BGP, specify the device's ASN. You must specify either BgpAsn or BgpAsnExtended when creating the customer gateway. If the ASN is larger than 2,147,483,647, you must use BgpAsnExtended. Default: 65000 Valid values: 1 to 2,147,483,647",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "One or more tags for the customer gateway.",
  ).optional(),
  CertificateArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:acm:[a-z]{2}((-gov)|(-iso([a-z]{1})?))?-[a-z]+-\\d{1}:\\d{12}:certificate\\/[a-zA-Z0-9-_]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) for the customer gateway certificate.",
  ).optional(),
  DeviceName: z.string().describe("The name of customer gateway device.")
    .optional(),
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

/** Swamp extension model for EC2 CustomerGateway. Registered at `@swamp/aws/ec2/customer-gateway`. */
export const model = {
  type: "@swamp/aws/ec2/customer-gateway",
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
      description: "EC2 CustomerGateway resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 CustomerGateway",
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
          "AWS::EC2::CustomerGateway",
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
      description: "Get a EC2 CustomerGateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 CustomerGateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::CustomerGateway",
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
      description: "Update a EC2 CustomerGateway",
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
        const identifier = existing.CustomerGatewayId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::CustomerGateway",
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
          "AWS::EC2::CustomerGateway",
          identifier,
          currentState,
          desiredState,
          [
            "CertificateArn",
            "BgpAsn",
            "BgpAsnExtended",
            "Type",
            "IpAddress",
            "DeviceName",
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
      description: "Delete a EC2 CustomerGateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 CustomerGateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::CustomerGateway",
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
      description: "Sync EC2 CustomerGateway state from AWS",
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
        const identifier = existing.CustomerGatewayId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::CustomerGateway",
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
