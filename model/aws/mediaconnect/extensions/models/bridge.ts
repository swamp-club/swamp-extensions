// Auto-generated extension model for @swamp/aws/mediaconnect/bridge
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaConnect Bridge (AWS::MediaConnect::Bridge).
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

const SourcePrioritySchema = z.object({
  PrimarySource: z.string().describe(
    "The name of the source you choose as the primary source for this flow.",
  ).optional(),
});

const BridgeNetworkOutputSchema = z.object({
  Name: z.string().describe("The network output name."),
  Protocol: z.enum(["rtp-fec", "rtp", "udp"]).describe(
    "The network output protocol.",
  ),
  IpAddress: z.string().describe("The network output IP Address."),
  Port: z.number().int().describe("The network output port."),
  NetworkName: z.string().describe(
    "The network output's gateway network name.",
  ),
  Ttl: z.number().int().describe("The network output TTL."),
});

const BridgeOutputSchema = z.object({
  NetworkOutput: BridgeNetworkOutputSchema.describe(
    "The output of the bridge. A network output is delivered to your premises.",
  ).optional(),
});

const VpcInterfaceAttachmentSchema = z.object({
  VpcInterfaceName: z.string().describe(
    "The name of the VPC interface to use for this resource.",
  ).optional(),
});

const BridgeFlowSourceSchema = z.object({
  Name: z.string().describe("The name of the flow source."),
  FlowArn: z.string().describe(
    "The ARN of the cloud flow used as a source of this bridge.",
  ),
  FlowVpcInterfaceAttachment: VpcInterfaceAttachmentSchema.describe(
    "The name of the VPC interface attachment to use for this source.",
  ).optional(),
});

const MulticastSourceSettingsSchema = z.object({
  MulticastSourceIp: z.string().describe(
    "The IP address of the source for source-specific multicast (SSM).",
  ).optional(),
});

const BridgeNetworkSourceSchema = z.object({
  Name: z.string().describe("The name of the network source."),
  Protocol: z.enum(["rtp-fec", "rtp", "udp"]).describe(
    "The network source protocol.",
  ),
  MulticastIp: z.string().describe("The network source multicast IP."),
  MulticastSourceSettings: MulticastSourceSettingsSchema.describe(
    "The settings related to the multicast source.",
  ).optional(),
  Port: z.number().int().describe("The network source port."),
  NetworkName: z.string().describe(
    "The network source's gateway network name.",
  ),
});

const BridgeSourceSchema = z.object({
  FlowSource: BridgeFlowSourceSchema.describe(
    "The source of the bridge. A flow source originates in MediaConnect as an existing cloud flow.",
  ).optional(),
  NetworkSource: BridgeNetworkSourceSchema.describe(
    "The source of the bridge. A network source originates at your premises.",
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
  Name: z.string().describe("The name of the bridge."),
  PlacementArn: z.string().describe(
    "The placement Amazon Resource Number (ARN) of the bridge.",
  ),
  SourceFailoverConfig: z.object({
    State: z.enum(["ENABLED", "DISABLED"]).optional(),
    FailoverMode: z.enum(["FAILOVER"]).describe(
      "The type of failover you choose for this flow. FAILOVER allows switching between different streams.",
    ),
    SourcePriority: SourcePrioritySchema.describe(
      "The priority you want to assign to a source. You can have a primary stream and a backup stream or two equally prioritized streams.",
    ).optional(),
  }).describe("The settings for source failover.").optional(),
  Outputs: z.array(BridgeOutputSchema).describe("The outputs on this bridge.")
    .optional(),
  Sources: z.array(BridgeSourceSchema).describe("The sources on this bridge."),
  IngressGatewayBridge: z.object({
    MaxBitrate: z.number().int().describe(
      "The maximum expected bitrate of the ingress bridge.",
    ),
    MaxOutputs: z.number().int().describe(
      "The maximum number of outputs on the ingress bridge.",
    ),
  }).optional(),
  EgressGatewayBridge: z.object({
    MaxBitrate: z.number().int().describe(
      "The maximum expected bitrate of the egress bridge.",
    ),
  }).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  BridgeArn: z.string(),
  PlacementArn: z.string().optional(),
  BridgeState: z.string().optional(),
  SourceFailoverConfig: z.object({
    State: z.string(),
    FailoverMode: z.string(),
    SourcePriority: SourcePrioritySchema,
  }).optional(),
  Outputs: z.array(BridgeOutputSchema).optional(),
  Sources: z.array(BridgeSourceSchema).optional(),
  IngressGatewayBridge: z.object({
    MaxBitrate: z.number(),
    MaxOutputs: z.number(),
  }).optional(),
  EgressGatewayBridge: z.object({
    MaxBitrate: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().describe("The name of the bridge.").optional(),
  PlacementArn: z.string().describe(
    "The placement Amazon Resource Number (ARN) of the bridge.",
  ).optional(),
  SourceFailoverConfig: z.object({
    State: z.enum(["ENABLED", "DISABLED"]).optional(),
    FailoverMode: z.enum(["FAILOVER"]).describe(
      "The type of failover you choose for this flow. FAILOVER allows switching between different streams.",
    ).optional(),
    SourcePriority: SourcePrioritySchema.describe(
      "The priority you want to assign to a source. You can have a primary stream and a backup stream or two equally prioritized streams.",
    ).optional(),
  }).describe("The settings for source failover.").optional(),
  Outputs: z.array(BridgeOutputSchema).describe("The outputs on this bridge.")
    .optional(),
  Sources: z.array(BridgeSourceSchema).describe("The sources on this bridge.")
    .optional(),
  IngressGatewayBridge: z.object({
    MaxBitrate: z.number().int().describe(
      "The maximum expected bitrate of the ingress bridge.",
    ).optional(),
    MaxOutputs: z.number().int().describe(
      "The maximum number of outputs on the ingress bridge.",
    ).optional(),
  }).optional(),
  EgressGatewayBridge: z.object({
    MaxBitrate: z.number().int().describe(
      "The maximum expected bitrate of the egress bridge.",
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

/** Swamp extension model for MediaConnect Bridge. Registered at `@swamp/aws/mediaconnect/bridge`. */
export const model = {
  type: "@swamp/aws/mediaconnect/bridge",
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
      description: "MediaConnect Bridge resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaConnect Bridge",
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
          "AWS::MediaConnect::Bridge",
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
      description: "Get a MediaConnect Bridge",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect Bridge",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaConnect::Bridge",
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
      description: "Update a MediaConnect Bridge",
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
        const identifier = existing.BridgeArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaConnect::Bridge",
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
          "AWS::MediaConnect::Bridge",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a MediaConnect Bridge",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect Bridge",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaConnect::Bridge",
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
      description: "Sync MediaConnect Bridge state from AWS",
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
        const identifier = existing.BridgeArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaConnect::Bridge",
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
