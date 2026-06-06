// Auto-generated extension model for @swamp/aws/mediaconnect/router-output
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaConnect RouterOutput (AWS::MediaConnect::RouterOutput).
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

const RtpRouterOutputConfigurationSchema = z.object({
  DestinationAddress: z.string().describe(
    "The destination IP address for the RTP protocol in the router output configuration.",
  ),
  DestinationPort: z.number().int().min(1024).max(65531).describe(
    "The destination port number for the RTP protocol in the router output configuration.",
  ),
  ForwardErrorCorrection: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const RistRouterOutputConfigurationSchema = z.object({
  DestinationAddress: z.string().describe(
    "The destination IP address for the RIST protocol in the router output configuration.",
  ),
  DestinationPort: z.number().int().min(1024).max(65535).describe(
    "The destination port number for the RIST protocol in the router output configuration.",
  ),
});

const SecretsManagerEncryptionKeyConfigurationSchema = z.object({
  SecretArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):secretsmanager:[a-z0-9-]+:[0-9]{12}:secret:[a-zA-Z0-9/_+=.@-]+$",
    ),
  ).describe(
    "The ARN of the Secrets Manager secret used for transit encryption.",
  ),
  RoleArn: z.string().regex(
    new RegExp("^arn:(aws[a-zA-Z-]*):iam::[0-9]{12}:role/[a-zA-Z0-9_+=,.@-]+$"),
  ).describe(
    "The ARN of the IAM role assumed by MediaConnect to access the Secrets Manager secret.",
  ),
});

const SrtEncryptionConfigurationSchema = z.object({
  EncryptionKey: SecretsManagerEncryptionKeyConfigurationSchema.describe(
    "The configuration settings for transit encryption using Secrets Manager, including the secret ARN and role ARN.",
  ),
});

const SrtListenerRouterOutputConfigurationSchema = z.object({
  Port: z.number().int().min(3000).max(30000).describe(
    "The port number for the SRT protocol in listener mode.",
  ),
  MinimumLatencyMilliseconds: z.number().int().min(10).max(10000).describe(
    "The minimum latency in milliseconds for the SRT protocol in listener mode.",
  ),
  EncryptionConfiguration: SrtEncryptionConfigurationSchema.describe(
    "Contains the configuration settings for encrypting SRT streams, including the encryption key details and encryption parameters.",
  ).optional(),
});

const SrtCallerRouterOutputConfigurationSchema = z.object({
  DestinationAddress: z.string().describe(
    "The destination IP address for the SRT protocol in caller mode.",
  ),
  DestinationPort: z.number().int().min(1024).max(65535).describe(
    "The destination port number for the SRT protocol in caller mode.",
  ),
  MinimumLatencyMilliseconds: z.number().int().min(10).max(10000).describe(
    "The minimum latency in milliseconds for the SRT protocol in caller mode.",
  ),
  StreamId: z.string().describe(
    "The stream ID for the SRT protocol in caller mode.",
  ).optional(),
  EncryptionConfiguration: SrtEncryptionConfigurationSchema.describe(
    "Contains the configuration settings for encrypting SRT streams, including the encryption key details and encryption parameters.",
  ).optional(),
});

const StandardRouterOutputConfigurationSchema = z.object({
  NetworkInterfaceArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:routerNetworkInterface:[a-z0-9]{12}$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the network interface associated with the standard router output.",
  ),
  ProtocolConfiguration: z.object({
    Rtp: RtpRouterOutputConfigurationSchema.describe(
      "The configuration settings for a router output using the RTP (Real-Time Transport Protocol) protocol, including the destination address and port, and forward error correction state.",
    ).optional(),
    Rist: RistRouterOutputConfigurationSchema.describe(
      "The configuration settings for a router output using the RIST (Reliable Internet Stream Transport) protocol, including the destination address and port.",
    ).optional(),
    SrtListener: SrtListenerRouterOutputConfigurationSchema.describe(
      "The configuration settings for a router output using the SRT (Secure Reliable Transport) protocol in listener mode, including the port, minimum latency, and encryption key configuration.",
    ).optional(),
    SrtCaller: SrtCallerRouterOutputConfigurationSchema.describe(
      "The configuration settings for a router output using the SRT (Secure Reliable Transport) protocol in caller mode, including the destination address and port, minimum latency, stream ID, and encryption key configuration.",
    ).optional(),
  }).describe("The protocol configuration settings for a router output."),
  Protocol: z.enum(["RTP", "RIST", "SRT_CALLER", "SRT_LISTENER"]).optional(),
});

const FlowTransitEncryptionSchema = z.object({
  EncryptionKeyType: z.enum(["SECRETS_MANAGER", "AUTOMATIC"]).optional(),
  EncryptionKeyConfiguration: z.object({
    SecretsManager: SecretsManagerEncryptionKeyConfigurationSchema.describe(
      "The configuration settings for transit encryption using Secrets Manager, including the secret ARN and role ARN.",
    ).optional(),
    Automatic: z.record(z.string(), z.unknown()).describe(
      "Configuration settings for automatic encryption key management, where MediaConnect handles key creation and rotation.",
    ).optional(),
  }).describe("Configuration settings for flow transit encryption keys."),
});

const MediaConnectFlowRouterOutputConfigurationSchema = z.object({
  FlowArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:flow:[a-zA-Z0-9-]+:[a-zA-Z0-9_-]+$",
    ),
  ).describe("The ARN of the flow to connect to this router output.")
    .optional(),
  FlowSourceArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:source:[a-zA-Z0-9-]+:[a-zA-Z0-9_-]+$",
    ),
  ).describe("The ARN of the flow source to connect to this router output.")
    .optional(),
  DestinationTransitEncryption: FlowTransitEncryptionSchema.describe(
    "The configuration that defines how content is encrypted during transit between the MediaConnect router and a MediaConnect flow.",
  ),
});

const MediaLiveTransitEncryptionSchema = z.object({
  EncryptionKeyType: z.enum(["SECRETS_MANAGER", "AUTOMATIC"]).optional(),
  EncryptionKeyConfiguration: z.object({
    SecretsManager: SecretsManagerEncryptionKeyConfigurationSchema.describe(
      "The configuration settings for transit encryption using Secrets Manager, including the secret ARN and role ARN.",
    ).optional(),
    Automatic: z.record(z.string(), z.unknown()).describe(
      "Configuration settings for automatic encryption key management, where MediaConnect handles key creation and rotation.",
    ).optional(),
  }).describe(
    "Configuration settings for the MediaLive transit encryption key.",
  ),
});

const MediaLiveInputRouterOutputConfigurationSchema = z.object({
  MediaLiveInputArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):medialive:[a-z0-9-]+:[0-9]{12}:input:[a-zA-Z0-9]+$",
    ),
  ).describe("The ARN of the MediaLive input to connect to this router output.")
    .optional(),
  MediaLivePipelineId: z.enum(["PIPELINE_0", "PIPELINE_1"]).optional(),
  DestinationTransitEncryption: MediaLiveTransitEncryptionSchema.describe(
    "The encryption configuration that defines how content is encrypted during transit between MediaConnect Router and MediaLive. This configuration determines whether encryption keys are automatically managed by the service or manually managed through Secrets Manager.",
  ),
});

const PreferredDayTimeMaintenanceConfigurationSchema = z.object({
  Day: z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]),
  Time: z.string().describe("The preferred time for maintenance operations."),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
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
  AvailabilityZone: z.string().describe(
    "The Availability Zone where you want to create the router output. This must be a valid Availability Zone for the region specified by regionName, or the current region if no regionName is provided.",
  ).optional(),
  Configuration: z.object({
    Standard: StandardRouterOutputConfigurationSchema.describe(
      "The configuration settings for a standard router output, including the protocol, protocol-specific configuration, network interface, and availability zone.",
    ).optional(),
    MediaConnectFlow: MediaConnectFlowRouterOutputConfigurationSchema.describe(
      "Configuration settings for connecting a router output to a MediaConnect flow source.",
    ).optional(),
    MediaLiveInput: MediaLiveInputRouterOutputConfigurationSchema.describe(
      "Configuration settings for connecting a router output to a MediaLive input.",
    ).optional(),
  }).describe("The configuration settings for a router output."),
  MaintenanceConfiguration: z.object({
    PreferredDayTime: PreferredDayTimeMaintenanceConfigurationSchema.describe(
      "Configuration for preferred day and time maintenance settings.",
    ).optional(),
    Default: z.record(z.string(), z.unknown()).describe(
      "Configuration settings for default maintenance scheduling.",
    ).optional(),
  }).describe(
    "The configuration settings for maintenance operations, including preferred maintenance windows and schedules.",
  ).optional(),
  MaximumBitrate: z.number().int().describe(
    "The maximum bitrate for the router output.",
  ),
  Name: z.string().min(1).max(128).describe("The name of the router output."),
  RegionName: z.string().describe(
    "The Amazon Web Services Region for the router output. Defaults to the current region if not specified.",
  ).optional(),
  RoutingScope: z.enum(["REGIONAL", "GLOBAL"]),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to tag this router output.",
  ).optional(),
  Tier: z.enum(["OUTPUT_100", "OUTPUT_50", "OUTPUT_20"]),
});

const StateSchema = z.object({
  Arn: z.string(),
  AvailabilityZone: z.string().optional(),
  Configuration: z.object({
    Standard: StandardRouterOutputConfigurationSchema,
    MediaConnectFlow: MediaConnectFlowRouterOutputConfigurationSchema,
    MediaLiveInput: MediaLiveInputRouterOutputConfigurationSchema,
  }).optional(),
  CreatedAt: z.string().optional(),
  Id: z.string().optional(),
  IpAddress: z.string().optional(),
  MaintenanceConfiguration: z.object({
    PreferredDayTime: PreferredDayTimeMaintenanceConfigurationSchema,
    Default: z.record(z.string(), z.unknown()),
  }).optional(),
  MaintenanceType: z.string().optional(),
  MaximumBitrate: z.number().optional(),
  Name: z.string().optional(),
  OutputType: z.string().optional(),
  RegionName: z.string().optional(),
  RoutedState: z.string().optional(),
  RoutingScope: z.string().optional(),
  State: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Tier: z.string().optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AvailabilityZone: z.string().describe(
    "The Availability Zone where you want to create the router output. This must be a valid Availability Zone for the region specified by regionName, or the current region if no regionName is provided.",
  ).optional(),
  Configuration: z.object({
    Standard: StandardRouterOutputConfigurationSchema.describe(
      "The configuration settings for a standard router output, including the protocol, protocol-specific configuration, network interface, and availability zone.",
    ).optional(),
    MediaConnectFlow: MediaConnectFlowRouterOutputConfigurationSchema.describe(
      "Configuration settings for connecting a router output to a MediaConnect flow source.",
    ).optional(),
    MediaLiveInput: MediaLiveInputRouterOutputConfigurationSchema.describe(
      "Configuration settings for connecting a router output to a MediaLive input.",
    ).optional(),
  }).describe("The configuration settings for a router output.").optional(),
  MaintenanceConfiguration: z.object({
    PreferredDayTime: PreferredDayTimeMaintenanceConfigurationSchema.describe(
      "Configuration for preferred day and time maintenance settings.",
    ).optional(),
    Default: z.record(z.string(), z.unknown()).describe(
      "Configuration settings for default maintenance scheduling.",
    ).optional(),
  }).describe(
    "The configuration settings for maintenance operations, including preferred maintenance windows and schedules.",
  ).optional(),
  MaximumBitrate: z.number().int().describe(
    "The maximum bitrate for the router output.",
  ).optional(),
  Name: z.string().min(1).max(128).describe("The name of the router output.")
    .optional(),
  RegionName: z.string().describe(
    "The Amazon Web Services Region for the router output. Defaults to the current region if not specified.",
  ).optional(),
  RoutingScope: z.enum(["REGIONAL", "GLOBAL"]).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to tag this router output.",
  ).optional(),
  Tier: z.enum(["OUTPUT_100", "OUTPUT_50", "OUTPUT_20"]).optional(),
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

/** Swamp extension model for MediaConnect RouterOutput. Registered at `@swamp/aws/mediaconnect/router-output`. */
export const model = {
  type: "@swamp/aws/mediaconnect/router-output",
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
      toVersion: "2026.04.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
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
      description: "MediaConnect RouterOutput resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaConnect RouterOutput",
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
          "AWS::MediaConnect::RouterOutput",
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
      description: "Get a MediaConnect RouterOutput",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect RouterOutput",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaConnect::RouterOutput",
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
      description: "Update a MediaConnect RouterOutput",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaConnect::RouterOutput",
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
          "AWS::MediaConnect::RouterOutput",
          identifier,
          currentState,
          desiredState,
          ["NetworkInterfaceArn", "AvailabilityZone", "RegionName"],
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
      description: "Delete a MediaConnect RouterOutput",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect RouterOutput",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaConnect::RouterOutput",
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
      description: "Sync MediaConnect RouterOutput state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaConnect::RouterOutput",
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
