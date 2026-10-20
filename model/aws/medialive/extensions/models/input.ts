// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/medialive/input
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaLive Input (AWS::MediaLive::Input).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const InputDestinationVpcSchema = z.object({
  AvailabilityZone: z.string().describe(
    "The availability zone of the Input destination.",
  ).optional(),
  NetworkInterfaceId: z.string().describe(
    "The network interface ID of the Input destination in the VPC.",
  ).optional(),
});

const InputDestinationRouteSchema = z.object({
  Cidr: z.string().describe("The CIDR of the route.").optional(),
  Gateway: z.string().describe("An optional gateway for the route.").optional(),
});

const InputDestinationSchema = z.object({
  Ip: z.string().describe(
    "The system-generated static IP address of endpoint. It remains fixed for the lifetime of the input.",
  ).optional(),
  Port: z.string().describe("The port number for the input.").optional(),
  Url: z.string().describe(
    "This represents the endpoint that the customer stream will be pushed to.",
  ).optional(),
  Vpc: InputDestinationVpcSchema.describe(
    "The properties for a VPC type input destination.",
  ).optional(),
  Network: z.string().describe("The ID of the attached network.").optional(),
  NetworkRoutes: z.array(InputDestinationRouteSchema).describe(
    "If the push input has an input location of ON-PREM it's a requirement to specify what the route of the input is going to be on the customer local network.",
  ).optional(),
  StreamName: z.string().describe("The stream name for the input destination.")
    .optional(),
  StaticIpAddress: z.string().describe(
    "The static IP address for the input destination.",
  ).optional(),
});

const InputDeviceSettingsSchema = z.object({
  Id: z.string().describe("The unique ID for the device.").optional(),
});

const MediaConnectFlowSchema = z.object({
  FlowArn: z.string().describe(
    "The unique ARN of the MediaConnect Flow being used as a source.",
  ).optional(),
});

const MulticastSourceSchema = z.object({
  SourceIp: z.string().describe(
    "This represents the ip address of the device sending the multicast stream.",
  ).optional(),
  Url: z.string().describe(
    "This represents the customer's source URL where multicast stream is pulled from.",
  ),
});

const RouterDestinationSettingsSchema = z.object({
  AvailabilityZoneName: z.string().describe(
    "The Availability Zone (AZ) name this destination is created in.",
  ),
  RouterOutputArn: z.string().describe(
    "The ARN of the MediaConnect Router output currently connected to this input.",
  ).optional(),
});

const InputSdpLocationSchema = z.object({
  MediaIndex: z.number().int().describe(
    "The index of the media stream in the SDP file for one SMPTE 2110 stream.",
  ).optional(),
  SdpUrl: z.string().describe(
    "The URL of the SDP file for one SMPTE 2110 stream.",
  ).optional(),
});

const Smpte2110ReceiverGroupSdpSettingsSchema = z.object({
  AncillarySdps: z.array(InputSdpLocationSchema).describe(
    "A list of InputSdpLocations. Each item in the list specifies the SDP file and index for one ancillary SMPTE 2110 stream. Each stream encapsulates one captions stream (out of any number you can include) or the single SCTE 35 stream that you can include.",
  ).optional(),
  AudioSdps: z.array(InputSdpLocationSchema).describe(
    "A list of InputSdpLocations. Each item in the list specifies the SDP file and index for one audio SMPTE 2110 stream.",
  ).optional(),
  VideoSdp: InputSdpLocationSchema.describe(
    "The InputSdpLocation that specifies the SDP file and index for the single video SMPTE 2110 stream for this 2110 input.",
  ).optional(),
});

const Smpte2110ReceiverGroupSchema = z.object({
  SdpSettings: Smpte2110ReceiverGroupSdpSettingsSchema.describe(
    "The single Smpte2110ReceiverGroupSdpSettings that identify the video, audio, and ancillary streams for this receiver group.",
  ).optional(),
});

const InputSourceSchema = z.object({
  PasswordParam: z.string().describe(
    "The key used to extract the password from EC2 Parameter store.",
  ).optional(),
  Url: z.string().describe(
    "This represents the customer's source URL where stream is pulled from.",
  ).optional(),
  Username: z.string().describe("The username for the input source.")
    .optional(),
});

const SrtCallerDecryptionSchema = z.object({
  Algorithm: z.enum(["AES128", "AES192", "AES256"]).describe(
    "The algorithm used to encrypt content.",
  ).optional(),
  PassphraseSecretArn: z.string().describe(
    "The ARN for the secret in Secrets Manager. Someone in your organization must create a secret and provide you with its ARN. The secret holds the passphrase that MediaLive uses to decrypt the source content.",
  ).optional(),
});

const SrtCallerSourceSchema = z.object({
  Decryption: SrtCallerDecryptionSchema.describe(
    "The decryption settings for the SRT caller source. Present only if the source has decryption enabled.",
  ).optional(),
  MinimumLatency: z.number().int().describe(
    "The preferred latency (in milliseconds) for implementing packet loss and recovery. Packet recovery is a key feature of SRT.",
  ).optional(),
  SrtListenerAddress: z.string().describe(
    "The IP address at the upstream system (the listener) that MediaLive (the caller) connects to.",
  ).optional(),
  SrtListenerPort: z.string().describe(
    "The port at the upstream system (the listener) that MediaLive (the caller) connects to.",
  ).optional(),
  StreamId: z.string().describe(
    "The stream ID, if the upstream system uses this identifier.",
  ).optional(),
});

const SrtListenerDecryptionSchema = z.object({
  Algorithm: z.enum(["AES128", "AES192", "AES256"]).describe(
    "The algorithm used to encrypt content.",
  ).optional(),
  PassphraseSecretArn: z.string().describe(
    "The ARN for the secret in Secrets Manager. Someone in your organization must create a secret and provide you with its ARN. The secret holds the passphrase that MediaLive uses to decrypt the source content.",
  ).optional(),
});

const SrtListenerSettingsSchema = z.object({
  Decryption: SrtListenerDecryptionSchema.describe(
    "The decryption settings for the SRT listener source. Present only if the source has decryption enabled.",
  ).optional(),
  MinimumLatency: z.number().int().describe(
    "The preferred latency (in milliseconds) for implementing packet loss and recovery. Packet recovery is a key feature of SRT.",
  ).optional(),
  StreamId: z.string().describe(
    "The stream ID, if the upstream system uses this identifier.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Destinations: z.array(InputDestinationSchema).describe(
    "A list of the destinations of the input (PUSH-type).",
  ).optional(),
  InputDevices: z.array(InputDeviceSettingsSchema).describe(
    "Settings for the input devices.",
  ).optional(),
  InputNetworkLocation: z.enum(["AWS", "ON_PREMISES"]).describe(
    "The location of this input. AWS, for an input existing in the AWS Cloud, On-Prem for an input in a customer network.",
  ).optional(),
  InputSecurityGroups: z.array(z.string()).describe(
    "A list of security groups referenced by IDs to attach to the input.",
  ).optional(),
  MediaConnectFlows: z.array(MediaConnectFlowSchema).describe(
    "A list of MediaConnect Flows for this input.",
  ).optional(),
  MulticastSettings: z.object({
    Sources: z.array(MulticastSourceSchema).describe(
      "Placeholder documentation for __listOfMulticastSource",
    ).optional(),
  }).describe("Multicast Input settings.").optional(),
  Name: z.string().describe("The user-assigned name (This is a mutable value).")
    .optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the role this input assumes during and after creation.",
  ).optional(),
  RouterSettings: z.object({
    SecretArn: z.string().describe(
      "The ARN of the Secrets Manager secret used to encrypt this input. Required when EncryptionType is SECRETS_MANAGER.",
    ).optional(),
    EncryptionType: z.enum(["AUTOMATIC", "SECRETS_MANAGER"]).describe(
      "Encryption configuration for the MediaConnect Router association. AUTOMATIC uses a service-managed secret; SECRETS_MANAGER requires SecretArn.",
    ).optional(),
    Destinations: z.array(RouterDestinationSettingsSchema).describe(
      "MediaConnect Router destinations associated with this input.",
    ).optional(),
  }).describe(
    "Information about the MediaConnect Router association for this input.",
  ).optional(),
  SdiSources: z.array(z.string()).describe("SDI Sources for this Input.")
    .optional(),
  Smpte2110ReceiverGroupSettings: z.object({
    Smpte2110ReceiverGroups: z.array(Smpte2110ReceiverGroupSchema).describe(
      "Placeholder documentation for __listOfSmpte2110ReceiverGroup",
    ).optional(),
  }).describe(
    "Include this parameter if the input is a SMPTE 2110 input, to identify the stream sources for this input.",
  ).optional(),
  Sources: z.array(InputSourceSchema).describe(
    "A list of the sources of the input (PULL-type).",
  ).optional(),
  SrtSettings: z.object({
    SrtCallerSources: z.array(SrtCallerSourceSchema).describe(
      "Placeholder documentation for __listOfSrtCallerSource",
    ).optional(),
    SrtListenerSettings: SrtListenerSettingsSchema.describe(
      "Settings for an SRT listener input. Configured only when the input uses the SRT_LISTENER input type.",
    ).optional(),
  }).describe("The settings associated with an SRT input.").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A collection of key-value pairs.",
  ).optional(),
  Type: z.enum([
    "UDP_PUSH",
    "RTP_PUSH",
    "RTMP_PUSH",
    "RTMP_PULL",
    "URL_PULL",
    "MP4_FILE",
    "MEDIACONNECT",
    "INPUT_DEVICE",
    "AWS_CDI",
    "TS_FILE",
    "SRT_CALLER",
    "MULTICAST",
    "SMPTE_2110_RECEIVER_GROUP",
    "SDI",
    "MEDIACONNECT_ROUTER",
    "SRT_LISTENER",
  ]).describe(
    "The different types of inputs that AWS Elemental MediaLive supports.",
  ).optional(),
  Vpc: z.object({
    SecurityGroupIds: z.array(z.string()).describe(
      "A list of up to 5 EC2 VPC security group IDs to attach to the Input VPC network interfaces. Requires subnetIds. If none are specified then the VPC default security group will be used.",
    ).optional(),
    SubnetIds: z.array(z.string()).describe(
      "A list of 2 VPC subnet IDs from the same VPC. Subnet IDs must be mapped to two unique availability zones (AZ).",
    ).optional(),
  }).describe(
    "Settings for a private VPC Input. When this property is specified, the input destination addresses will be created in a VPC rather than with public Internet addresses. This property requires setting the roleArn property on Input creation. Not compatible with the inputSecurityGroups property.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  AttachedChannels: z.array(z.string()).optional(),
  Destinations: z.array(InputDestinationSchema).optional(),
  DestinationUrls: z.array(z.string()).optional(),
  Id: z.string(),
  InputClass: z.string().optional(),
  InputDevices: z.array(InputDeviceSettingsSchema).optional(),
  InputNetworkLocation: z.string().optional(),
  InputPartnerIds: z.array(z.string()).optional(),
  InputSecurityGroups: z.array(z.string()).optional(),
  InputSourceType: z.string().optional(),
  MediaConnectFlows: z.array(MediaConnectFlowSchema).optional(),
  MulticastSettings: z.object({
    Sources: z.array(MulticastSourceSchema),
  }).optional(),
  Name: z.string().optional(),
  RoleArn: z.string().optional(),
  RouterSettings: z.object({
    SecretArn: z.string(),
    EncryptionType: z.string(),
    Destinations: z.array(RouterDestinationSettingsSchema),
  }).optional(),
  SdiSources: z.array(z.string()).optional(),
  SecurityGroups: z.array(z.string()).optional(),
  Smpte2110ReceiverGroupSettings: z.object({
    Smpte2110ReceiverGroups: z.array(Smpte2110ReceiverGroupSchema),
  }).optional(),
  Sources: z.array(InputSourceSchema).optional(),
  SourceUrls: z.array(z.string()).optional(),
  SrtSettings: z.object({
    SrtCallerSources: z.array(SrtCallerSourceSchema),
    SrtListenerSettings: SrtListenerSettingsSchema,
  }).optional(),
  State: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Type: z.string().optional(),
  Vpc: z.object({
    SecurityGroupIds: z.array(z.string()),
    SubnetIds: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Destinations: z.array(InputDestinationSchema).describe(
    "A list of the destinations of the input (PUSH-type).",
  ).optional(),
  InputDevices: z.array(InputDeviceSettingsSchema).describe(
    "Settings for the input devices.",
  ).optional(),
  InputNetworkLocation: z.enum(["AWS", "ON_PREMISES"]).describe(
    "The location of this input. AWS, for an input existing in the AWS Cloud, On-Prem for an input in a customer network.",
  ).optional(),
  InputSecurityGroups: z.array(z.string()).describe(
    "A list of security groups referenced by IDs to attach to the input.",
  ).optional(),
  MediaConnectFlows: z.array(MediaConnectFlowSchema).describe(
    "A list of MediaConnect Flows for this input.",
  ).optional(),
  MulticastSettings: z.object({
    Sources: z.array(MulticastSourceSchema).describe(
      "Placeholder documentation for __listOfMulticastSource",
    ).optional(),
  }).describe("Multicast Input settings.").optional(),
  Name: z.string().describe("The user-assigned name (This is a mutable value).")
    .optional(),
  RoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the role this input assumes during and after creation.",
  ).optional(),
  RouterSettings: z.object({
    SecretArn: z.string().describe(
      "The ARN of the Secrets Manager secret used to encrypt this input. Required when EncryptionType is SECRETS_MANAGER.",
    ).optional(),
    EncryptionType: z.enum(["AUTOMATIC", "SECRETS_MANAGER"]).describe(
      "Encryption configuration for the MediaConnect Router association. AUTOMATIC uses a service-managed secret; SECRETS_MANAGER requires SecretArn.",
    ).optional(),
    Destinations: z.array(RouterDestinationSettingsSchema).describe(
      "MediaConnect Router destinations associated with this input.",
    ).optional(),
  }).describe(
    "Information about the MediaConnect Router association for this input.",
  ).optional(),
  SdiSources: z.array(z.string()).describe("SDI Sources for this Input.")
    .optional(),
  Smpte2110ReceiverGroupSettings: z.object({
    Smpte2110ReceiverGroups: z.array(Smpte2110ReceiverGroupSchema).describe(
      "Placeholder documentation for __listOfSmpte2110ReceiverGroup",
    ).optional(),
  }).describe(
    "Include this parameter if the input is a SMPTE 2110 input, to identify the stream sources for this input.",
  ).optional(),
  Sources: z.array(InputSourceSchema).describe(
    "A list of the sources of the input (PULL-type).",
  ).optional(),
  SrtSettings: z.object({
    SrtCallerSources: z.array(SrtCallerSourceSchema).describe(
      "Placeholder documentation for __listOfSrtCallerSource",
    ).optional(),
    SrtListenerSettings: SrtListenerSettingsSchema.describe(
      "Settings for an SRT listener input. Configured only when the input uses the SRT_LISTENER input type.",
    ).optional(),
  }).describe("The settings associated with an SRT input.").optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A collection of key-value pairs.",
  ).optional(),
  Type: z.enum([
    "UDP_PUSH",
    "RTP_PUSH",
    "RTMP_PUSH",
    "RTMP_PULL",
    "URL_PULL",
    "MP4_FILE",
    "MEDIACONNECT",
    "INPUT_DEVICE",
    "AWS_CDI",
    "TS_FILE",
    "SRT_CALLER",
    "MULTICAST",
    "SMPTE_2110_RECEIVER_GROUP",
    "SDI",
    "MEDIACONNECT_ROUTER",
    "SRT_LISTENER",
  ]).describe(
    "The different types of inputs that AWS Elemental MediaLive supports.",
  ).optional(),
  Vpc: z.object({
    SecurityGroupIds: z.array(z.string()).describe(
      "A list of up to 5 EC2 VPC security group IDs to attach to the Input VPC network interfaces. Requires subnetIds. If none are specified then the VPC default security group will be used.",
    ).optional(),
    SubnetIds: z.array(z.string()).describe(
      "A list of 2 VPC subnet IDs from the same VPC. Subnet IDs must be mapped to two unique availability zones (AZ).",
    ).optional(),
  }).describe(
    "Settings for a private VPC Input. When this property is specified, the input destination addresses will be created in a VPC rather than with public Internet addresses. This property requires setting the roleArn property on Input creation. Not compatible with the inputSecurityGroups property.",
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

/** Swamp extension model for MediaLive Input. Registered at `@swamp/aws/medialive/input`. */
export const model = {
  type: "@swamp/aws/medialive/input",
  version: "2026.10.20.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MediaLive Input resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaLive Input",
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
          "AWS::MediaLive::Input",
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
      description: "Get a MediaLive Input",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaLive Input",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaLive::Input",
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
      description: "Update a MediaLive Input",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaLive::Input",
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
          "AWS::MediaLive::Input",
          identifier,
          currentState,
          desiredState,
          ["InputNetworkLocation", "Type", "Vpc", "RouterSettings"],
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
      description: "Delete a MediaLive Input",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaLive Input",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaLive::Input",
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
      description: "Sync MediaLive Input state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaLive::Input",
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
    list: {
      description: "List MediaLive Input resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::MediaLive::Input",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Id?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
