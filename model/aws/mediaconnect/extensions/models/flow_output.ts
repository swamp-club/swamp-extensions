// Auto-generated extension model for @swamp/aws/mediaconnect/flow-output
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaConnect FlowOutput (AWS::MediaConnect::FlowOutput).
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

const InterfaceSchema = z.object({
  Name: z.string().describe(
    "The name of the VPC interface that you want to use for the media stream associated with the output.",
  ),
});

const DestinationConfigurationSchema = z.object({
  DestinationIp: z.string().describe(
    "The IP address where contents of the media stream will be sent.",
  ),
  DestinationPort: z.number().int().describe(
    "The port to use when the content of the media stream is distributed to the output.",
  ),
  Interface: InterfaceSchema.describe(
    "The VPC interface that is used for the media stream associated with the output.",
  ),
});

const EncodingParametersSchema = z.object({
  CompressionFactor: z.number().describe(
    "A value that is used to calculate compression for an output. The bitrate of the output is calculated as follows: Output bitrate = (1 / compressionFactor) * (source bitrate) This property only applies to outputs that use the ST 2110 JPEG XS protocol, with a flow source that uses the CDI protocol. Valid values are in the range of 3.0 to 10.0, inclusive.",
  ),
  EncoderProfile: z.enum(["main", "high"]).describe(
    "A setting on the encoder that drives compression settings. This property only applies to video media streams associated with outputs that use the ST 2110 JPEG XS protocol, with a flow source that uses the CDI protocol.",
  ).optional(),
});

const MediaStreamOutputConfigurationSchema = z.object({
  EncodingName: z.enum(["jxsv", "raw", "smpte291", "pcm"]).describe(
    "The format that will be used to encode the data. For ancillary data streams, set the encoding name to smpte291. For audio streams, set the encoding name to pcm. For video streams on sources or outputs that use the CDI protocol, set the encoding name to raw. For video streams on sources or outputs that use the ST 2110 JPEG XS protocol, set the encoding name to jxsv.",
  ),
  DestinationConfigurations: z.array(DestinationConfigurationSchema).describe(
    "The media streams that you want to associate with the output.",
  ).optional(),
  MediaStreamName: z.string().describe(
    "A name that helps you distinguish one media stream from another.",
  ),
  EncodingParameters: EncodingParametersSchema.describe(
    "A collection of parameters that determine how MediaConnect will convert the content. These fields only apply to outputs on flows that have a CDI source.",
  ).optional(),
});

const SecretsManagerEncryptionKeyConfigurationSchema = z.object({
  SecretArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):secretsmanager:[a-z0-9-]+:[0-9]{12}:secret:[a-zA-Z0-9/_+=.@-]+$",
    ),
  ).describe(
    "The ARN of the AWS Secrets Manager secret used for transit encryption to the router input.",
  ),
  RoleArn: z.string().regex(
    new RegExp("^arn:(aws[a-zA-Z-]*):iam::[0-9]{12}:role/[a-zA-Z0-9_+=,.@-]+$"),
  ).describe(
    "The ARN of the IAM role used for transit encryption to the router input using AWS Secrets Manager.",
  ),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  FlowArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:flow:[a-zA-Z0-9-]+:[a-zA-Z0-9_-]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN), a unique identifier for any AWS resource, of the flow.",
  ),
  CidrAllowList: z.array(z.string()).describe(
    "The range of IP addresses that should be allowed to initiate output requests to this flow. These IP addresses should be in the form of a Classless Inter-Domain Routing (CIDR) block; for example, 10.0.0.0/16.",
  ).optional(),
  Encryption: z.object({
    Algorithm: z.enum(["aes128", "aes192", "aes256"]).describe(
      "The type of algorithm that is used for the encryption (such as aes128, aes192, or aes256).",
    ).optional(),
    KeyType: z.enum(["static-key", "srt-password"]).describe(
      "The type of key that is used for the encryption. If no keyType is provided, the service will use the default setting (static-key).",
    ).optional(),
    RoleArn: z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*):iam::[0-9]{12}:role/[a-zA-Z0-9_+=,.@-]+$",
      ),
    ).describe(
      "The ARN of the role that you created during setup (when you set up AWS Elemental MediaConnect as a trusted entity).",
    ),
    SecretArn: z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*):secretsmanager:[a-z0-9-]+:[0-9]{12}:secret:[a-zA-Z0-9/_+=.@-]+$",
      ),
    ).describe(
      "The ARN of the secret that you created in AWS Secrets Manager to store the encryption key. This parameter is required for static key encryption and is not valid for SPEKE encryption.",
    ),
  }).describe(
    "The type of key used for the encryption. If no keyType is provided, the service will use the default setting (static-key).",
  ).optional(),
  Description: z.string().describe("A description of the output.").optional(),
  Destination: z.string().describe(
    "The address where you want to send the output.",
  ).optional(),
  MaxLatency: z.number().int().describe(
    "The maximum latency in milliseconds. This parameter applies only to RIST-based and Zixi-based streams.",
  ).optional(),
  MinLatency: z.number().int().describe("The minimum latency in milliseconds.")
    .optional(),
  Name: z.string().describe(
    "The name of the output. This value must be unique within the current flow.",
  ).optional(),
  Port: z.number().int().describe(
    "The port to use when content is distributed to this output.",
  ).optional(),
  Protocol: z.enum([
    "zixi-push",
    "rtp-fec",
    "rtp",
    "zixi-pull",
    "rist",
    "srt-listener",
    "srt-caller",
    "st2110-jpegxs",
    "cdi",
    "ndi-speed-hq",
  ]).describe("The protocol that is used by the source or output.").optional(),
  RemoteId: z.string().describe("The remote ID for the Zixi-pull stream.")
    .optional(),
  SmoothingLatency: z.number().int().describe(
    "The smoothing latency in milliseconds for RIST, RTP, and RTP-FEC streams.",
  ).optional(),
  StreamId: z.string().describe(
    "The stream ID that you want to use for this transport. This parameter applies only to Zixi-based streams.",
  ).optional(),
  VpcInterfaceAttachment: z.object({
    VpcInterfaceName: z.string().describe(
      "The name of the VPC interface to use for this output.",
    ).optional(),
  }).describe(
    "The name of the VPC interface attachment to use for this output.",
  ).optional(),
  MediaStreamOutputConfigurations: z.array(MediaStreamOutputConfigurationSchema)
    .describe(
      "The definition for each media stream that is associated with the output.",
    ).optional(),
  OutputStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "An indication of whether the output should transmit data or not.",
  ).optional(),
  NdiProgramName: z.string().describe(
    "A suffix for the names of the NDI sources that the flow creates. If a custom name isn't specified, MediaConnect uses the output name.",
  ).optional(),
  NdiSpeedHqQuality: z.number().int().describe(
    "A quality setting for the NDI Speed HQ encoder.",
  ).optional(),
  RouterIntegrationState: z.enum(["ENABLED", "DISABLED"]).optional(),
  RouterIntegrationTransitEncryption: z.object({
    EncryptionKeyType: z.enum(["SECRETS_MANAGER", "AUTOMATIC"]).optional(),
    EncryptionKeyConfiguration: z.object({
      SecretsManager: SecretsManagerEncryptionKeyConfigurationSchema.describe(
        "The configuration settings for transit encryption of a flow output using AWS Secrets Manager, including the secret ARN and role ARN.",
      ).optional(),
      Automatic: z.record(z.string(), z.unknown()).describe(
        "Configuration settings for automatic encryption key management, where MediaConnect handles key creation and rotation.",
      ).optional(),
    }).describe("Configuration settings for flow transit encryption keys."),
  }).describe(
    "The configuration that defines how content is encrypted during transit between the MediaConnect router and a MediaConnect flow.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to tag and organize this flow output.",
  ).optional(),
});

const StateSchema = z.object({
  FlowArn: z.string().optional(),
  OutputArn: z.string(),
  CidrAllowList: z.array(z.string()).optional(),
  Encryption: z.object({
    Algorithm: z.string(),
    KeyType: z.string(),
    RoleArn: z.string(),
    SecretArn: z.string(),
  }).optional(),
  Description: z.string().optional(),
  Destination: z.string().optional(),
  MaxLatency: z.number().optional(),
  MinLatency: z.number().optional(),
  Name: z.string().optional(),
  Port: z.number().optional(),
  Protocol: z.string().optional(),
  RemoteId: z.string().optional(),
  SmoothingLatency: z.number().optional(),
  StreamId: z.string().optional(),
  VpcInterfaceAttachment: z.object({
    VpcInterfaceName: z.string(),
  }).optional(),
  MediaStreamOutputConfigurations: z.array(MediaStreamOutputConfigurationSchema)
    .optional(),
  OutputStatus: z.string().optional(),
  NdiProgramName: z.string().optional(),
  NdiSpeedHqQuality: z.number().optional(),
  RouterIntegrationState: z.string().optional(),
  RouterIntegrationTransitEncryption: z.object({
    EncryptionKeyType: z.string(),
    EncryptionKeyConfiguration: z.object({
      SecretsManager: SecretsManagerEncryptionKeyConfigurationSchema,
      Automatic: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  FlowArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:flow:[a-zA-Z0-9-]+:[a-zA-Z0-9_-]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN), a unique identifier for any AWS resource, of the flow.",
  ).optional(),
  CidrAllowList: z.array(z.string()).describe(
    "The range of IP addresses that should be allowed to initiate output requests to this flow. These IP addresses should be in the form of a Classless Inter-Domain Routing (CIDR) block; for example, 10.0.0.0/16.",
  ).optional(),
  Encryption: z.object({
    Algorithm: z.enum(["aes128", "aes192", "aes256"]).describe(
      "The type of algorithm that is used for the encryption (such as aes128, aes192, or aes256).",
    ).optional(),
    KeyType: z.enum(["static-key", "srt-password"]).describe(
      "The type of key that is used for the encryption. If no keyType is provided, the service will use the default setting (static-key).",
    ).optional(),
    RoleArn: z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*):iam::[0-9]{12}:role/[a-zA-Z0-9_+=,.@-]+$",
      ),
    ).describe(
      "The ARN of the role that you created during setup (when you set up AWS Elemental MediaConnect as a trusted entity).",
    ).optional(),
    SecretArn: z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*):secretsmanager:[a-z0-9-]+:[0-9]{12}:secret:[a-zA-Z0-9/_+=.@-]+$",
      ),
    ).describe(
      "The ARN of the secret that you created in AWS Secrets Manager to store the encryption key. This parameter is required for static key encryption and is not valid for SPEKE encryption.",
    ).optional(),
  }).describe(
    "The type of key used for the encryption. If no keyType is provided, the service will use the default setting (static-key).",
  ).optional(),
  Description: z.string().describe("A description of the output.").optional(),
  Destination: z.string().describe(
    "The address where you want to send the output.",
  ).optional(),
  MaxLatency: z.number().int().describe(
    "The maximum latency in milliseconds. This parameter applies only to RIST-based and Zixi-based streams.",
  ).optional(),
  MinLatency: z.number().int().describe("The minimum latency in milliseconds.")
    .optional(),
  Name: z.string().describe(
    "The name of the output. This value must be unique within the current flow.",
  ).optional(),
  Port: z.number().int().describe(
    "The port to use when content is distributed to this output.",
  ).optional(),
  Protocol: z.enum([
    "zixi-push",
    "rtp-fec",
    "rtp",
    "zixi-pull",
    "rist",
    "srt-listener",
    "srt-caller",
    "st2110-jpegxs",
    "cdi",
    "ndi-speed-hq",
  ]).describe("The protocol that is used by the source or output.").optional(),
  RemoteId: z.string().describe("The remote ID for the Zixi-pull stream.")
    .optional(),
  SmoothingLatency: z.number().int().describe(
    "The smoothing latency in milliseconds for RIST, RTP, and RTP-FEC streams.",
  ).optional(),
  StreamId: z.string().describe(
    "The stream ID that you want to use for this transport. This parameter applies only to Zixi-based streams.",
  ).optional(),
  VpcInterfaceAttachment: z.object({
    VpcInterfaceName: z.string().describe(
      "The name of the VPC interface to use for this output.",
    ).optional(),
  }).describe(
    "The name of the VPC interface attachment to use for this output.",
  ).optional(),
  MediaStreamOutputConfigurations: z.array(MediaStreamOutputConfigurationSchema)
    .describe(
      "The definition for each media stream that is associated with the output.",
    ).optional(),
  OutputStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "An indication of whether the output should transmit data or not.",
  ).optional(),
  NdiProgramName: z.string().describe(
    "A suffix for the names of the NDI sources that the flow creates. If a custom name isn't specified, MediaConnect uses the output name.",
  ).optional(),
  NdiSpeedHqQuality: z.number().int().describe(
    "A quality setting for the NDI Speed HQ encoder.",
  ).optional(),
  RouterIntegrationState: z.enum(["ENABLED", "DISABLED"]).optional(),
  RouterIntegrationTransitEncryption: z.object({
    EncryptionKeyType: z.enum(["SECRETS_MANAGER", "AUTOMATIC"]).optional(),
    EncryptionKeyConfiguration: z.object({
      SecretsManager: SecretsManagerEncryptionKeyConfigurationSchema.describe(
        "The configuration settings for transit encryption of a flow output using AWS Secrets Manager, including the secret ARN and role ARN.",
      ).optional(),
      Automatic: z.record(z.string(), z.unknown()).describe(
        "Configuration settings for automatic encryption key management, where MediaConnect handles key creation and rotation.",
      ).optional(),
    }).describe("Configuration settings for flow transit encryption keys.")
      .optional(),
  }).describe(
    "The configuration that defines how content is encrypted during transit between the MediaConnect router and a MediaConnect flow.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to tag and organize this flow output.",
  ).optional(),
});

/** Swamp extension model for MediaConnect FlowOutput. Registered at `@swamp/aws/mediaconnect/flow-output`. */
export const model = {
  type: "@swamp/aws/mediaconnect/flow-output",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MediaConnect FlowOutput resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaConnect FlowOutput",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MediaConnect::FlowOutput",
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
      description: "Get a MediaConnect FlowOutput",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect FlowOutput",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::MediaConnect::FlowOutput",
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
      description: "Update a MediaConnect FlowOutput",
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
        const identifier = existing.OutputArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaConnect::FlowOutput",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MediaConnect::FlowOutput",
          identifier,
          currentState,
          desiredState,
          ["Name", "FlowArn"],
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
      description: "Delete a MediaConnect FlowOutput",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect FlowOutput",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::MediaConnect::FlowOutput",
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
      description: "Sync MediaConnect FlowOutput state from AWS",
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
        const identifier = existing.OutputArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaConnect::FlowOutput",
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
