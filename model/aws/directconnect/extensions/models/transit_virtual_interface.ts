// Auto-generated extension model for @swamp/aws/directconnect/transit-virtual-interface
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DirectConnect TransitVirtualInterface (AWS::DirectConnect::TransitVirtualInterface).
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

const BgpPeerSchema = z.object({
  BgpPeerId: z.string().regex(new RegExp("^dxpeer-[a-z0-9]{8}$")).optional(),
  AuthKey: z.string().regex(
    new RegExp(
      "^[A-Za-z0-9\\\\!\"#$%&'()*+,\\-./:;<=>?@\\[\\]\\^_`{|}~]{6,80}$",
    ),
  ).describe(
    "The authentication key for BGP configuration. This string has a minimum length of 6 characters and and a maximum length of 80 characters.",
  ).optional(),
  AddressFamily: z.string().regex(new RegExp("^(ipv4)|(ipv6)$")).describe(
    "The address family for the BGP peer.",
  ),
  AmazonAddress: z.string().regex(new RegExp("^[0-9a-fA-F:.]+/[0-9]+$"))
    .describe("The IP address assigned to the Amazon interface.").optional(),
  Asn: z.string().regex(new RegExp("^[1-9][0-9]*$")).describe(
    "The autonomous system (AS) number for Border Gateway Protocol (BGP) configuration.",
  ),
  CustomerAddress: z.string().regex(new RegExp("^[0-9a-fA-F:.]+/[0-9]+$"))
    .describe("The IP address assigned to the customer interface.").optional(),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  BgpPeers: z.array(BgpPeerSchema).describe(
    "The BGP peers configured on this virtual interface..",
  ),
  ConnectionId: z.string().regex(
    new RegExp(
      "^((arn:aws[a-z-]*:directconnect:[a-z0-9-]+:[0-9]{12}:(dxcon/dxcon|dxlag/dxlag))|dx(con|lag))-[a-z0-9A-Z]{8,21}$",
    ),
  ).describe("The ID or ARN of the connection or LAG."),
  DirectConnectGatewayId: z.string().regex(
    new RegExp(
      "^(arn:aws[a-z-]*:directconnect::[0-9]{12}:dx-gateway/)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("The ID or ARN of the Direct Connect gateway."),
  EnableSiteLink: z.boolean().describe(
    "Indicates whether to enable or disable SiteLink.",
  ).optional(),
  VirtualInterfaceName: z.string().regex(new RegExp("^[\\w \\-_,\\/]{1,100}$"))
    .describe(
      "The name of the virtual interface assigned by the customer network. The name has a maximum of 100 characters. The following are valid characters: a-z, 0-9 and a hyphen (-).",
    ),
  Vlan: z.number().int().min(0).max(4095).describe("The ID of the VLAN."),
  AllocateTransitVirtualInterfaceRoleArn: z.string().regex(
    new RegExp("^arn:aws[a-z-]*:iam::[0-9]{12}:role/.+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the role to allocate the TransitVifAllocation. Needs directconnect:AllocateTransitVirtualInterface permissions and tag permissions if applicable.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags associated with the private virtual interface.",
  ).optional(),
  Mtu: z.number().int().describe(
    "The maximum transmission unit (MTU), in bytes. The supported values are 1500 and 9001. The default value is 1500.",
  ).optional(),
});

const StateSchema = z.object({
  BgpPeers: z.array(BgpPeerSchema).optional(),
  ConnectionId: z.string().optional(),
  DirectConnectGatewayId: z.string().optional(),
  EnableSiteLink: z.boolean().optional(),
  VirtualInterfaceId: z.string().optional(),
  VirtualInterfaceName: z.string().optional(),
  VirtualInterfaceArn: z.string(),
  Vlan: z.number().optional(),
  AllocateTransitVirtualInterfaceRoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Mtu: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  BgpPeers: z.array(BgpPeerSchema).describe(
    "The BGP peers configured on this virtual interface..",
  ).optional(),
  ConnectionId: z.string().regex(
    new RegExp(
      "^((arn:aws[a-z-]*:directconnect:[a-z0-9-]+:[0-9]{12}:(dxcon/dxcon|dxlag/dxlag))|dx(con|lag))-[a-z0-9A-Z]{8,21}$",
    ),
  ).describe("The ID or ARN of the connection or LAG.").optional(),
  DirectConnectGatewayId: z.string().regex(
    new RegExp(
      "^(arn:aws[a-z-]*:directconnect::[0-9]{12}:dx-gateway/)?[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    ),
  ).describe("The ID or ARN of the Direct Connect gateway.").optional(),
  EnableSiteLink: z.boolean().describe(
    "Indicates whether to enable or disable SiteLink.",
  ).optional(),
  VirtualInterfaceName: z.string().regex(new RegExp("^[\\w \\-_,\\/]{1,100}$"))
    .describe(
      "The name of the virtual interface assigned by the customer network. The name has a maximum of 100 characters. The following are valid characters: a-z, 0-9 and a hyphen (-).",
    ).optional(),
  Vlan: z.number().int().min(0).max(4095).describe("The ID of the VLAN.")
    .optional(),
  AllocateTransitVirtualInterfaceRoleArn: z.string().regex(
    new RegExp("^arn:aws[a-z-]*:iam::[0-9]{12}:role/.+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of the role to allocate the TransitVifAllocation. Needs directconnect:AllocateTransitVirtualInterface permissions and tag permissions if applicable.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags associated with the private virtual interface.",
  ).optional(),
  Mtu: z.number().int().describe(
    "The maximum transmission unit (MTU), in bytes. The supported values are 1500 and 9001. The default value is 1500.",
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

/** Swamp extension model for DirectConnect TransitVirtualInterface. Registered at `@swamp/aws/directconnect/transit-virtual-interface`. */
export const model = {
  type: "@swamp/aws/directconnect/transit-virtual-interface",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DirectConnect TransitVirtualInterface resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DirectConnect TransitVirtualInterface",
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
          "AWS::DirectConnect::TransitVirtualInterface",
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
      description: "Get a DirectConnect TransitVirtualInterface",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DirectConnect TransitVirtualInterface",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DirectConnect::TransitVirtualInterface",
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
      description: "Update a DirectConnect TransitVirtualInterface",
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
        const identifier = existing.VirtualInterfaceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DirectConnect::TransitVirtualInterface",
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
          "AWS::DirectConnect::TransitVirtualInterface",
          identifier,
          currentState,
          desiredState,
          [
            "AllocateTransitVirtualInterfaceRoleArn",
            "DirectConnectGatewayId",
            "Vlan",
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
      description: "Delete a DirectConnect TransitVirtualInterface",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DirectConnect TransitVirtualInterface",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DirectConnect::TransitVirtualInterface",
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
      description: "Sync DirectConnect TransitVirtualInterface state from AWS",
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
        const identifier = existing.VirtualInterfaceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DirectConnect::TransitVirtualInterface",
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
