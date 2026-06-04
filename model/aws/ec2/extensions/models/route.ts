// Auto-generated extension model for @swamp/aws/ec2/route
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 Route (AWS::EC2::Route).
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  CarrierGatewayId: z.string().describe(
    "The ID of the carrier gateway. You can only use this option when the VPC contains a subnet which is associated with a Wavelength Zone.",
  ).optional(),
  CoreNetworkArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the core network.",
  ).optional(),
  DestinationCidrBlock: z.string().describe(
    "The IPv4 CIDR address block used for the destination match. Routing decisions are based on the most specific match. We modify the specified CIDR block to its canonical form; for example, if you specify 100.68.0.18/18, we modify it to 100.68.0.0/18.",
  ).optional(),
  DestinationIpv6CidrBlock: z.string().describe(
    "The IPv6 CIDR block used for the destination match. Routing decisions are based on the most specific match.",
  ).optional(),
  DestinationPrefixListId: z.string().describe(
    "The ID of a prefix list used for the destination match.",
  ).optional(),
  EgressOnlyInternetGatewayId: z.string().describe(
    "[IPv6 traffic only] The ID of an egress-only internet gateway.",
  ).optional(),
  GatewayId: z.string().describe(
    "The ID of an internet gateway or virtual private gateway attached to your VPC.",
  ).optional(),
  InstanceId: z.string().describe(
    "The ID of a NAT instance in your VPC. The operation fails if you specify an instance ID unless exactly one network interface is attached.",
  ).optional(),
  LocalGatewayId: z.string().describe("The ID of the local gateway.")
    .optional(),
  NatGatewayId: z.string().describe(
    "[IPv4 traffic only] The ID of a NAT gateway.",
  ).optional(),
  NetworkInterfaceId: z.string().describe("The ID of a network interface.")
    .optional(),
  RouteTableId: z.string().describe("The ID of the route table for the route."),
  TransitGatewayId: z.string().describe("The ID of a transit gateway.")
    .optional(),
  VpcEndpointId: z.string().describe(
    "The ID of a VPC endpoint. Supported for Gateway Load Balancer endpoints only.",
  ).optional(),
  VpcPeeringConnectionId: z.string().describe(
    "The ID of a VPC peering connection.",
  ).optional(),
  OdbNetworkArn: z.string().optional(),
});

const StateSchema = z.object({
  CarrierGatewayId: z.string().optional(),
  CidrBlock: z.string(),
  CoreNetworkArn: z.string().optional(),
  DestinationCidrBlock: z.string().optional(),
  DestinationIpv6CidrBlock: z.string().optional(),
  DestinationPrefixListId: z.string().optional(),
  EgressOnlyInternetGatewayId: z.string().optional(),
  GatewayId: z.string().optional(),
  InstanceId: z.string().optional(),
  LocalGatewayId: z.string().optional(),
  NatGatewayId: z.string().optional(),
  NetworkInterfaceId: z.string().optional(),
  RouteTableId: z.string(),
  TransitGatewayId: z.string().optional(),
  VpcEndpointId: z.string().optional(),
  VpcPeeringConnectionId: z.string().optional(),
  OdbNetworkArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  CarrierGatewayId: z.string().describe(
    "The ID of the carrier gateway. You can only use this option when the VPC contains a subnet which is associated with a Wavelength Zone.",
  ).optional(),
  CoreNetworkArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the core network.",
  ).optional(),
  DestinationCidrBlock: z.string().describe(
    "The IPv4 CIDR address block used for the destination match. Routing decisions are based on the most specific match. We modify the specified CIDR block to its canonical form; for example, if you specify 100.68.0.18/18, we modify it to 100.68.0.0/18.",
  ).optional(),
  DestinationIpv6CidrBlock: z.string().describe(
    "The IPv6 CIDR block used for the destination match. Routing decisions are based on the most specific match.",
  ).optional(),
  DestinationPrefixListId: z.string().describe(
    "The ID of a prefix list used for the destination match.",
  ).optional(),
  EgressOnlyInternetGatewayId: z.string().describe(
    "[IPv6 traffic only] The ID of an egress-only internet gateway.",
  ).optional(),
  GatewayId: z.string().describe(
    "The ID of an internet gateway or virtual private gateway attached to your VPC.",
  ).optional(),
  InstanceId: z.string().describe(
    "The ID of a NAT instance in your VPC. The operation fails if you specify an instance ID unless exactly one network interface is attached.",
  ).optional(),
  LocalGatewayId: z.string().describe("The ID of the local gateway.")
    .optional(),
  NatGatewayId: z.string().describe(
    "[IPv4 traffic only] The ID of a NAT gateway.",
  ).optional(),
  NetworkInterfaceId: z.string().describe("The ID of a network interface.")
    .optional(),
  RouteTableId: z.string().describe("The ID of the route table for the route.")
    .optional(),
  TransitGatewayId: z.string().describe("The ID of a transit gateway.")
    .optional(),
  VpcEndpointId: z.string().describe(
    "The ID of a VPC endpoint. Supported for Gateway Load Balancer endpoints only.",
  ).optional(),
  VpcPeeringConnectionId: z.string().describe(
    "The ID of a VPC peering connection.",
  ).optional(),
  OdbNetworkArn: z.string().optional(),
});

/** Swamp extension model for EC2 Route. Registered at `@swamp/aws/ec2/route`. */
export const model = {
  type: "@swamp/aws/ec2/route",
  version: "2026.06.04.1",
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
      toVersion: "2026.06.04.1",
      description: "Added: OdbNetworkArn",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 Route resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 Route",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::Route",
          desiredState,
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
      description: "Get a EC2 Route",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 Route",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::Route",
          args.identifier,
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
      description: "Update a EC2 Route",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const idParts = [
          existing.RouteTableId?.toString(),
          existing.CidrBlock?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::EC2::Route",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::Route",
          identifier,
          currentState,
          desiredState,
          [
            "RouteTableId",
            "DestinationCidrBlock",
            "DestinationIpv6CidrBlock",
            "DestinationPrefixListId",
          ],
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
      description: "Delete a EC2 Route",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 Route",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::Route",
          args.identifier,
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
      description: "Sync EC2 Route state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const idParts = [
          existing.RouteTableId?.toString(),
          existing.CidrBlock?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::EC2::Route",
            identifier,
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
