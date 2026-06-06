// Auto-generated extension model for @swamp/aws/networkfirewall/firewall
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for NetworkFirewall Firewall (AWS::NetworkFirewall::Firewall).
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

const SubnetMappingSchema = z.object({
  SubnetId: z.string().describe("A SubnetId."),
  IPAddressType: z.string().describe("A IPAddressType").optional(),
});

const AvailabilityZoneMappingSchema = z.object({
  AvailabilityZone: z.string().describe("A AvailabilityZone"),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(255),
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
  FirewallName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$")),
  FirewallPolicyArn: z.string().min(1).max(256).regex(new RegExp("^arn:aws.*$"))
    .describe("A resource ARN."),
  VpcId: z.string().min(1).max(128).regex(new RegExp("^vpc-[0-9a-f]+$"))
    .optional(),
  SubnetMappings: z.array(SubnetMappingSchema).optional(),
  AvailabilityZoneMappings: z.array(AvailabilityZoneMappingSchema).optional(),
  DeleteProtection: z.boolean().optional(),
  SubnetChangeProtection: z.boolean().optional(),
  AvailabilityZoneChangeProtection: z.boolean().optional(),
  FirewallPolicyChangeProtection: z.boolean().optional(),
  TransitGatewayId: z.string().max(128).regex(new RegExp("^tgw-[0-9a-z]+$"))
    .optional(),
  Description: z.string().max(512).regex(new RegExp("^.*$")).optional(),
  EnabledAnalysisTypes: z.array(z.enum(["TLS_SNI", "HTTP_HOST"])).describe(
    "The types of analysis to enable for the firewall. Can be TLS_SNI, HTTP_HOST, or both.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  FirewallName: z.string().optional(),
  FirewallArn: z.string(),
  FirewallId: z.string().optional(),
  FirewallPolicyArn: z.string().optional(),
  VpcId: z.string().optional(),
  SubnetMappings: z.array(SubnetMappingSchema).optional(),
  AvailabilityZoneMappings: z.array(AvailabilityZoneMappingSchema).optional(),
  DeleteProtection: z.boolean().optional(),
  SubnetChangeProtection: z.boolean().optional(),
  AvailabilityZoneChangeProtection: z.boolean().optional(),
  FirewallPolicyChangeProtection: z.boolean().optional(),
  TransitGatewayId: z.string().optional(),
  TransitGatewayAttachmentId: z.string().optional(),
  Description: z.string().optional(),
  EndpointIds: z.array(z.string()).optional(),
  EnabledAnalysisTypes: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FirewallName: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .optional(),
  FirewallPolicyArn: z.string().min(1).max(256).regex(new RegExp("^arn:aws.*$"))
    .describe("A resource ARN.").optional(),
  VpcId: z.string().min(1).max(128).regex(new RegExp("^vpc-[0-9a-f]+$"))
    .optional(),
  SubnetMappings: z.array(SubnetMappingSchema).optional(),
  AvailabilityZoneMappings: z.array(AvailabilityZoneMappingSchema).optional(),
  DeleteProtection: z.boolean().optional(),
  SubnetChangeProtection: z.boolean().optional(),
  AvailabilityZoneChangeProtection: z.boolean().optional(),
  FirewallPolicyChangeProtection: z.boolean().optional(),
  TransitGatewayId: z.string().max(128).regex(new RegExp("^tgw-[0-9a-z]+$"))
    .optional(),
  Description: z.string().max(512).regex(new RegExp("^.*$")).optional(),
  EnabledAnalysisTypes: z.array(z.enum(["TLS_SNI", "HTTP_HOST"])).describe(
    "The types of analysis to enable for the firewall. Can be TLS_SNI, HTTP_HOST, or both.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for NetworkFirewall Firewall. Registered at `@swamp/aws/networkfirewall/firewall`. */
export const model = {
  type: "@swamp/aws/networkfirewall/firewall",
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
      description: "NetworkFirewall Firewall resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a NetworkFirewall Firewall",
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
          "AWS::NetworkFirewall::Firewall",
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
      description: "Get a NetworkFirewall Firewall",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkFirewall Firewall",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::NetworkFirewall::Firewall",
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
      description: "Update a NetworkFirewall Firewall",
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
        const identifier = existing.FirewallArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::NetworkFirewall::Firewall",
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
          "AWS::NetworkFirewall::Firewall",
          identifier,
          currentState,
          desiredState,
          ["VpcId", "FirewallName"],
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
      description: "Delete a NetworkFirewall Firewall",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkFirewall Firewall",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::NetworkFirewall::Firewall",
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
      description: "Sync NetworkFirewall Firewall state from AWS",
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
        const identifier = existing.FirewallArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::NetworkFirewall::Firewall",
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
