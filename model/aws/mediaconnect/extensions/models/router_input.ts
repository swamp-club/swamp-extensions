// Auto-generated extension model for @swamp/aws/mediaconnect/router-input
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaConnect RouterInput (AWS::MediaConnect::RouterInput).
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

const RtpRouterInputConfigurationSchema = z.object({
  Port: z.number().int().min(3000).max(30000).describe(
    "The port number used for the RTP protocol in the router input configuration.",
  ),
  ForwardErrorCorrection: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const RistRouterInputConfigurationSchema = z.object({
  Port: z.number().int().min(3000).max(30000).describe(
    "The port number used for the RIST protocol in the router input configuration.",
  ),
  RecoveryLatencyMilliseconds: z.number().int().min(10).max(10000).describe(
    "The recovery latency in milliseconds for the RIST protocol in the router input configuration.",
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

const SrtDecryptionConfigurationSchema = z.object({
  EncryptionKey: SecretsManagerEncryptionKeyConfigurationSchema.describe(
    "The configuration settings for transit encryption using Secrets Manager, including the secret ARN and role ARN.",
  ),
});

const SrtListenerRouterInputConfigurationSchema = z.object({
  Port: z.number().int().min(3000).max(30000).describe(
    "The port number for the SRT protocol in listener mode.",
  ),
  MinimumLatencyMilliseconds: z.number().int().min(10).max(10000).describe(
    "The minimum latency in milliseconds for the SRT protocol in listener mode.",
  ),
  DecryptionConfiguration: SrtDecryptionConfigurationSchema.describe(
    "Contains the configuration settings for decrypting SRT streams, including the encryption key details and decryption parameters.",
  ).optional(),
});

const SrtCallerRouterInputConfigurationSchema = z.object({
  SourceAddress: z.string().describe(
    "The source IP address for the SRT protocol in caller mode.",
  ),
  SourcePort: z.number().int().min(1024).max(65535).describe(
    "The source port number for the SRT protocol in caller mode.",
  ),
  MinimumLatencyMilliseconds: z.number().int().min(10).max(10000).describe(
    "The minimum latency in milliseconds for the SRT protocol in caller mode.",
  ),
  StreamId: z.string().describe(
    "The stream ID for the SRT protocol in caller mode.",
  ).optional(),
  DecryptionConfiguration: SrtDecryptionConfigurationSchema.describe(
    "Contains the configuration settings for decrypting SRT streams, including the encryption key details and decryption parameters.",
  ).optional(),
});

const StandardRouterInputConfigurationSchema = z.object({
  NetworkInterfaceArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:routerNetworkInterface:[a-z0-9]{12}$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the network interface associated with the standard router input.",
  ),
  ProtocolConfiguration: z.object({
    Rtp: RtpRouterInputConfigurationSchema.describe(
      "The configuration settings for a Router Input using the RTP (Real-Time Transport Protocol) protocol, including the port and forward error correction state.",
    ).optional(),
    Rist: RistRouterInputConfigurationSchema.describe(
      "The configuration settings for a router input using the RIST (Reliable Internet Stream Transport) protocol, including the port and recovery latency.",
    ).optional(),
    SrtListener: SrtListenerRouterInputConfigurationSchema.describe(
      "The configuration settings for a router input using the SRT (Secure Reliable Transport) protocol in listener mode, including the port, minimum latency, and decryption key configuration.",
    ).optional(),
    SrtCaller: SrtCallerRouterInputConfigurationSchema.describe(
      "The configuration settings for a router input using the SRT (Secure Reliable Transport) protocol in caller mode, including the source address and port, minimum latency, stream ID, and decryption key configuration.",
    ).optional(),
  }).describe("The protocol configuration settings for a router input."),
  Protocol: z.enum(["RTP", "RIST", "SRT_CALLER", "SRT_LISTENER"]).optional(),
});

const FailoverRouterInputConfigurationSchema = z.object({
  NetworkInterfaceArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:routerNetworkInterface:[a-z0-9]{12}$",
    ),
  ).describe(
    "The ARN of the network interface to use for this failover router input.",
  ),
  ProtocolConfigurations: z.array(z.object({
    Rtp: RtpRouterInputConfigurationSchema.describe(
      "The configuration settings for a Router Input using the RTP (Real-Time Transport Protocol) protocol, including the port and forward error correction state.",
    ).optional(),
    Rist: RistRouterInputConfigurationSchema.describe(
      "The configuration settings for a router input using the RIST (Reliable Internet Stream Transport) protocol, including the port and recovery latency.",
    ).optional(),
    SrtListener: SrtListenerRouterInputConfigurationSchema.describe(
      "The configuration settings for a router input using the SRT (Secure Reliable Transport) protocol in listener mode, including the port, minimum latency, and decryption key configuration.",
    ).optional(),
    SrtCaller: SrtCallerRouterInputConfigurationSchema.describe(
      "The configuration settings for a router input using the SRT (Secure Reliable Transport) protocol in caller mode, including the source address and port, minimum latency, stream ID, and decryption key configuration.",
    ).optional(),
  })).describe(
    "A list of exactly two protocol configurations for the failover input sources. Both must use the same protocol type.",
  ),
  SourcePriorityMode: z.enum(["NO_PRIORITY", "PRIMARY_SECONDARY"]),
  PrimarySourceIndex: z.number().int().min(0).max(1).describe(
    "The index (0 or 1) that specifies which source in the protocol configurations list is currently active. Used to control which of the two failover sources is currently selected. This field is ignored when sourcePriorityMode is set to NO_PRIORITY",
  ).optional(),
});

const MergeRouterInputConfigurationSchema = z.object({
  NetworkInterfaceArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:routerNetworkInterface:[a-z0-9]{12}$",
    ),
  ).describe(
    "The ARN of the network interface to use for this merge router input.",
  ),
  ProtocolConfigurations: z.array(z.object({
    Rtp: RtpRouterInputConfigurationSchema.describe(
      "The configuration settings for a Router Input using the RTP (Real-Time Transport Protocol) protocol, including the port and forward error correction state.",
    ).optional(),
    Rist: RistRouterInputConfigurationSchema.describe(
      "The configuration settings for a router input using the RIST (Reliable Internet Stream Transport) protocol, including the port and recovery latency.",
    ).optional(),
  })).describe(
    "A list of exactly two protocol configurations for the merge input sources. Both must use the same protocol type.",
  ),
  MergeRecoveryWindowMilliseconds: z.number().int().describe(
    "The time window in milliseconds for merging the two input sources.",
  ),
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

const MediaConnectFlowRouterInputConfigurationSchema = z.object({
  FlowArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:flow:[a-zA-Z0-9-]+:[a-zA-Z0-9_-]+$",
    ),
  ).describe("The ARN of the flow to connect to.").optional(),
  FlowOutputArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:output:[a-zA-Z0-9-]+:[a-zA-Z0-9_-]+$",
    ),
  ).describe("The ARN of the flow output to connect to this router input.")
    .optional(),
  SourceTransitDecryption: FlowTransitEncryptionSchema.describe(
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

const MediaLiveChannelRouterInputConfigurationSchema = z.object({
  MediaLiveChannelArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):medialive:[a-z0-9-]+:[0-9]{12}:channel:[a-zA-Z0-9]+$",
    ),
  ).describe(
    "The ARN of the MediaLive channel to connect to this router input.",
  ).optional(),
  MediaLivePipelineId: z.enum(["PIPELINE_0", "PIPELINE_1"]).optional(),
  MediaLiveChannelOutputName: z.string().describe(
    "The name of the MediaLive channel output to connect to this router input.",
  ).optional(),
  SourceTransitDecryption: MediaLiveTransitEncryptionSchema.describe(
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
  AvailabilityZone: z.string().describe(
    "The Availability Zone where you want to create the router input. This must be a valid Availability Zone for the region specified by regionName, or the current region if no regionName is provided.",
  ).optional(),
  Configuration: z.object({
    Standard: StandardRouterInputConfigurationSchema.describe(
      "The configuration settings for a standard router input, including the protocol, protocol-specific configuration, network interface, and availability zone.",
    ).optional(),
    Failover: FailoverRouterInputConfigurationSchema.describe(
      "Configuration settings for a failover router input that allows switching between two input sources.",
    ).optional(),
    Merge: MergeRouterInputConfigurationSchema.describe(
      "Configuration settings for a merge router input that combines two input sources.",
    ).optional(),
    MediaConnectFlow: MediaConnectFlowRouterInputConfigurationSchema.describe(
      "Configuration settings for connecting a router input to a flow output.",
    ).optional(),
    MediaLiveChannel: MediaLiveChannelRouterInputConfigurationSchema.describe(
      "Configuration settings for connecting a router input to a MediaLive channel output.",
    ).optional(),
  }).describe("The configuration settings for a router input."),
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
    "The maximum bitrate for the router input.",
  ),
  Name: z.string().min(1).max(128).describe("The name of the router input."),
  RegionName: z.string().describe(
    "The Amazon Web Services Region for the router input. Defaults to the current region if not specified.",
  ).optional(),
  RoutingScope: z.enum(["REGIONAL", "GLOBAL"]),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to tag and organize this router input.",
  ).optional(),
  Tier: z.enum(["INPUT_100", "INPUT_50", "INPUT_20"]),
  TransitEncryption: z.object({
    EncryptionKeyType: z.enum(["SECRETS_MANAGER", "AUTOMATIC"]).optional(),
    EncryptionKeyConfiguration: z.object({
      SecretsManager: SecretsManagerEncryptionKeyConfigurationSchema.describe(
        "The configuration settings for transit encryption using Secrets Manager, including the secret ARN and role ARN.",
      ).optional(),
      Automatic: z.record(z.string(), z.unknown()).describe(
        "Configuration settings for automatic encryption key management, where MediaConnect handles key creation and rotation.",
      ).optional(),
    }).describe(
      "Defines the configuration settings for transit encryption keys.",
    ),
  }).describe("The transit encryption settings for a router input.").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  AvailabilityZone: z.string().optional(),
  Configuration: z.object({
    Standard: StandardRouterInputConfigurationSchema,
    Failover: FailoverRouterInputConfigurationSchema,
    Merge: MergeRouterInputConfigurationSchema,
    MediaConnectFlow: MediaConnectFlowRouterInputConfigurationSchema,
    MediaLiveChannel: MediaLiveChannelRouterInputConfigurationSchema,
  }).optional(),
  CreatedAt: z.string().optional(),
  Id: z.string().optional(),
  InputType: z.string().optional(),
  IpAddress: z.string().optional(),
  MaintenanceConfiguration: z.object({
    PreferredDayTime: PreferredDayTimeMaintenanceConfigurationSchema,
    Default: z.record(z.string(), z.unknown()),
  }).optional(),
  MaintenanceType: z.string().optional(),
  MaximumBitrate: z.number().optional(),
  Name: z.string().optional(),
  RegionName: z.string().optional(),
  RoutedOutputs: z.number().optional(),
  RoutingScope: z.string().optional(),
  State: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Tier: z.string().optional(),
  TransitEncryption: z.object({
    EncryptionKeyType: z.string(),
    EncryptionKeyConfiguration: z.object({
      SecretsManager: SecretsManagerEncryptionKeyConfigurationSchema,
      Automatic: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AvailabilityZone: z.string().describe(
    "The Availability Zone where you want to create the router input. This must be a valid Availability Zone for the region specified by regionName, or the current region if no regionName is provided.",
  ).optional(),
  Configuration: z.object({
    Standard: StandardRouterInputConfigurationSchema.describe(
      "The configuration settings for a standard router input, including the protocol, protocol-specific configuration, network interface, and availability zone.",
    ).optional(),
    Failover: FailoverRouterInputConfigurationSchema.describe(
      "Configuration settings for a failover router input that allows switching between two input sources.",
    ).optional(),
    Merge: MergeRouterInputConfigurationSchema.describe(
      "Configuration settings for a merge router input that combines two input sources.",
    ).optional(),
    MediaConnectFlow: MediaConnectFlowRouterInputConfigurationSchema.describe(
      "Configuration settings for connecting a router input to a flow output.",
    ).optional(),
    MediaLiveChannel: MediaLiveChannelRouterInputConfigurationSchema.describe(
      "Configuration settings for connecting a router input to a MediaLive channel output.",
    ).optional(),
  }).describe("The configuration settings for a router input.").optional(),
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
    "The maximum bitrate for the router input.",
  ).optional(),
  Name: z.string().min(1).max(128).describe("The name of the router input.")
    .optional(),
  RegionName: z.string().describe(
    "The Amazon Web Services Region for the router input. Defaults to the current region if not specified.",
  ).optional(),
  RoutingScope: z.enum(["REGIONAL", "GLOBAL"]).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to tag and organize this router input.",
  ).optional(),
  Tier: z.enum(["INPUT_100", "INPUT_50", "INPUT_20"]).optional(),
  TransitEncryption: z.object({
    EncryptionKeyType: z.enum(["SECRETS_MANAGER", "AUTOMATIC"]).optional(),
    EncryptionKeyConfiguration: z.object({
      SecretsManager: SecretsManagerEncryptionKeyConfigurationSchema.describe(
        "The configuration settings for transit encryption using Secrets Manager, including the secret ARN and role ARN.",
      ).optional(),
      Automatic: z.record(z.string(), z.unknown()).describe(
        "Configuration settings for automatic encryption key management, where MediaConnect handles key creation and rotation.",
      ).optional(),
    }).describe(
      "Defines the configuration settings for transit encryption keys.",
    ).optional(),
  }).describe("The transit encryption settings for a router input.").optional(),
});

/** Swamp extension model for MediaConnect RouterInput. Registered at `@swamp/aws/mediaconnect/router-input`. */
export const model = {
  type: "@swamp/aws/mediaconnect/router-input",
  version: "2026.05.27.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MediaConnect RouterInput resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaConnect RouterInput",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MediaConnect::RouterInput",
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
      description: "Get a MediaConnect RouterInput",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect RouterInput",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::MediaConnect::RouterInput",
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
      description: "Update a MediaConnect RouterInput",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaConnect::RouterInput",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MediaConnect::RouterInput",
          identifier,
          currentState,
          desiredState,
          [
            "NetworkInterfaceArn",
            "NetworkInterfaceArn",
            "NetworkInterfaceArn",
            "AvailabilityZone",
            "RegionName",
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
      description: "Delete a MediaConnect RouterInput",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect RouterInput",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::MediaConnect::RouterInput",
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
      description: "Sync MediaConnect RouterInput state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaConnect::RouterInput",
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
