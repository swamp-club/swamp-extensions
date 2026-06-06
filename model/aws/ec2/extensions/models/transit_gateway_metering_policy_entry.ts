// Auto-generated extension model for @swamp/aws/ec2/transit-gateway-metering-policy-entry
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 TransitGatewayMeteringPolicyEntry (AWS::EC2::TransitGatewayMeteringPolicyEntry).
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  DestinationTransitGatewayAttachmentId: z.string().describe(
    "The ID of the source attachment through which traffic leaves a transit gateway",
  ).optional(),
  SourcePortRange: z.string().describe(
    "The list of ports on source instances sending traffic to the transit gateway",
  ).optional(),
  PolicyRuleNumber: z.number().int().describe(
    "The rule number of the metering policy entry",
  ),
  DestinationTransitGatewayAttachmentType: z.enum([
    "vpc",
    "vpn",
    "direct-connect-gateway",
    "peering",
    "network-function",
    "vpn-concentrator",
    "client-vpn",
  ]).describe(
    "The type of the attachment through which traffic leaves a transit gateway",
  ).optional(),
  DestinationCidrBlock: z.string().describe(
    "The list of IP addresses of the instances receiving traffic from the transit gateway",
  ).optional(),
  TransitGatewayMeteringPolicyId: z.string().describe(
    "The ID of the transit gateway metering policy for which the entry is being created",
  ),
  DestinationPortRange: z.string().describe(
    "The list of ports on destination instances receiving traffic from the transit gateway",
  ).optional(),
  MeteredAccount: z.enum([
    "source-attachment-owner",
    "destination-attachment-owner",
    "transit-gateway-owner",
  ]).describe(
    "The resource owner information responsible for paying default billable charges for the traffic flow",
  ),
  SourceCidrBlock: z.string().describe(
    "The list of IP addresses of the instances sending traffic to the transit gateway for which the metering policy entry is applicable",
  ).optional(),
  Protocol: z.string().describe("The protocol of the traffic").optional(),
  SourceTransitGatewayAttachmentId: z.string().describe(
    "The ID of the source attachment through which traffic enters a transit gateway",
  ).optional(),
  SourceTransitGatewayAttachmentType: z.enum([
    "vpc",
    "vpn",
    "direct-connect-gateway",
    "peering",
    "network-function",
    "vpn-concentrator",
    "client-vpn",
  ]).describe(
    "The type of the attachment through which traffic enters a transit gateway",
  ).optional(),
});

const StateSchema = z.object({
  DestinationTransitGatewayAttachmentId: z.string().optional(),
  SourcePortRange: z.string().optional(),
  PolicyRuleNumber: z.number(),
  DestinationTransitGatewayAttachmentType: z.string().optional(),
  DestinationCidrBlock: z.string().optional(),
  TransitGatewayMeteringPolicyId: z.string(),
  DestinationPortRange: z.string().optional(),
  MeteredAccount: z.string().optional(),
  UpdateEffectiveAt: z.string().optional(),
  State: z.string().optional(),
  SourceCidrBlock: z.string().optional(),
  Protocol: z.string().optional(),
  SourceTransitGatewayAttachmentId: z.string().optional(),
  SourceTransitGatewayAttachmentType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DestinationTransitGatewayAttachmentId: z.string().describe(
    "The ID of the source attachment through which traffic leaves a transit gateway",
  ).optional(),
  SourcePortRange: z.string().describe(
    "The list of ports on source instances sending traffic to the transit gateway",
  ).optional(),
  PolicyRuleNumber: z.number().int().describe(
    "The rule number of the metering policy entry",
  ).optional(),
  DestinationTransitGatewayAttachmentType: z.enum([
    "vpc",
    "vpn",
    "direct-connect-gateway",
    "peering",
    "network-function",
    "vpn-concentrator",
    "client-vpn",
  ]).describe(
    "The type of the attachment through which traffic leaves a transit gateway",
  ).optional(),
  DestinationCidrBlock: z.string().describe(
    "The list of IP addresses of the instances receiving traffic from the transit gateway",
  ).optional(),
  TransitGatewayMeteringPolicyId: z.string().describe(
    "The ID of the transit gateway metering policy for which the entry is being created",
  ).optional(),
  DestinationPortRange: z.string().describe(
    "The list of ports on destination instances receiving traffic from the transit gateway",
  ).optional(),
  MeteredAccount: z.enum([
    "source-attachment-owner",
    "destination-attachment-owner",
    "transit-gateway-owner",
  ]).describe(
    "The resource owner information responsible for paying default billable charges for the traffic flow",
  ).optional(),
  SourceCidrBlock: z.string().describe(
    "The list of IP addresses of the instances sending traffic to the transit gateway for which the metering policy entry is applicable",
  ).optional(),
  Protocol: z.string().describe("The protocol of the traffic").optional(),
  SourceTransitGatewayAttachmentId: z.string().describe(
    "The ID of the source attachment through which traffic enters a transit gateway",
  ).optional(),
  SourceTransitGatewayAttachmentType: z.enum([
    "vpc",
    "vpn",
    "direct-connect-gateway",
    "peering",
    "network-function",
    "vpn-concentrator",
    "client-vpn",
  ]).describe(
    "The type of the attachment through which traffic enters a transit gateway",
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

/** Swamp extension model for EC2 TransitGatewayMeteringPolicyEntry. Registered at `@swamp/aws/ec2/transit-gateway-metering-policy-entry`. */
export const model = {
  type: "@swamp/aws/ec2/transit-gateway-metering-policy-entry",
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
      description: "EC2 TransitGatewayMeteringPolicyEntry resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 TransitGatewayMeteringPolicyEntry",
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
          "AWS::EC2::TransitGatewayMeteringPolicyEntry",
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
      description: "Get a EC2 TransitGatewayMeteringPolicyEntry",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayMeteringPolicyEntry",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::TransitGatewayMeteringPolicyEntry",
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
    delete: {
      description: "Delete a EC2 TransitGatewayMeteringPolicyEntry",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 TransitGatewayMeteringPolicyEntry",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::TransitGatewayMeteringPolicyEntry",
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
      description: "Sync EC2 TransitGatewayMeteringPolicyEntry state from AWS",
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
        const idParts = [
          existing.TransitGatewayMeteringPolicyId?.toString(),
          existing.PolicyRuleNumber?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::EC2::TransitGatewayMeteringPolicyEntry",
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
