// Auto-generated extension model for @swamp/aws/ec2/vpnconnection
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 VPNConnection (AWS::EC2::VPNConnection).
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

const Phase2EncryptionAlgorithmsRequestListValueSchema = z.object({
  Value: z.enum(["AES128", "AES256", "AES128-GCM-16", "AES256-GCM-16"])
    .describe("The encryption algorithm.").optional(),
});

const Phase2DHGroupNumbersRequestListValueSchema = z.object({
  Value: z.union([
    z.literal(2),
    z.literal(5),
    z.literal(14),
    z.literal(15),
    z.literal(16),
    z.literal(17),
    z.literal(18),
    z.literal(19),
    z.literal(20),
    z.literal(21),
    z.literal(22),
    z.literal(23),
    z.literal(24),
  ]).describe("The Diffie-Hellmann group number.").optional(),
});

const IKEVersionsRequestListValueSchema = z.object({
  Value: z.enum(["ikev1", "ikev2"]).describe("The IKE version.").optional(),
});

const CloudwatchLogOptionsSpecificationSchema = z.object({
  BgpLogEnabled: z.boolean().describe(
    "Specifies whether to enable BGP logging for the VPN connection. Default value is False. Valid values: True | False",
  ).optional(),
  LogEnabled: z.boolean().describe(
    "Enable or disable VPN tunnel logging feature. Default value is False. Valid values: True | False",
  ).optional(),
  LogOutputFormat: z.enum(["json", "text"]).describe(
    "Set log format. Default format is json. Valid values: json | text",
  ).optional(),
  BgpLogGroupArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the CloudWatch log group where BGP logs will be sent.",
  ).optional(),
  LogGroupArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the CloudWatch log group to send logs to.",
  ).optional(),
  BgpLogOutputFormat: z.enum(["json", "text"]).describe(
    "The desired output format for BGP logs to be sent to CloudWatch. Default format is json. Valid values: json | text",
  ).optional(),
});

const VpnTunnelLogOptionsSpecificationSchema = z.object({
  CloudwatchLogOptions: CloudwatchLogOptionsSpecificationSchema.describe(
    "Options for sending VPN tunnel logs to CloudWatch.",
  ).optional(),
});

const Phase1DHGroupNumbersRequestListValueSchema = z.object({
  Value: z.union([
    z.literal(2),
    z.literal(14),
    z.literal(15),
    z.literal(16),
    z.literal(17),
    z.literal(18),
    z.literal(19),
    z.literal(20),
    z.literal(21),
    z.literal(22),
    z.literal(23),
    z.literal(24),
  ]).describe("The Diffie-Hellmann group number.").optional(),
});

const Phase2IntegrityAlgorithmsRequestListValueSchema = z.object({
  Value: z.enum(["SHA1", "SHA2-256", "SHA2-384", "SHA2-512"]).describe(
    "The integrity algorithm.",
  ).optional(),
});

const Phase1IntegrityAlgorithmsRequestListValueSchema = z.object({
  Value: z.enum(["SHA1", "SHA2-256", "SHA2-384", "SHA2-512"]).describe(
    "The value for the integrity algorithm.",
  ).optional(),
});

const Phase1EncryptionAlgorithmsRequestListValueSchema = z.object({
  Value: z.enum(["AES128", "AES256", "AES128-GCM-16", "AES256-GCM-16"])
    .describe("The value for the encryption algorithm.").optional(),
});

const VpnTunnelOptionsSpecificationSchema = z.object({
  Phase2EncryptionAlgorithms: z.array(
    Phase2EncryptionAlgorithmsRequestListValueSchema,
  ).describe(
    "One or more encryption algorithms that are permitted for the VPN tunnel for phase 2 IKE negotiations. Valid values: AES128 | AES256 | AES128-GCM-16 | AES256-GCM-16",
  ).optional(),
  Phase2DHGroupNumbers: z.array(Phase2DHGroupNumbersRequestListValueSchema)
    .describe(
      "One or more Diffie-Hellman group numbers that are permitted for the VPN tunnel for phase 2 IKE negotiations. Valid values: 2 | 5 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24",
    ).optional(),
  TunnelInsideIpv6Cidr: z.string().describe(
    "The range of inside IPv6 addresses for the tunnel. Any specified CIDR blocks must be unique across all VPN connections that use the same transit gateway. Constraints: A size /126 CIDR block from the local fd00::/8 range.",
  ).optional(),
  StartupAction: z.enum(["add", "start"]).describe(
    "The action to take when the establishing the tunnel for the VPN connection. By default, your customer gateway device must initiate the IKE negotiation and bring up the tunnel. Specify start for AWS to initiate the IKE negotiation. Valid Values: add | start Default: add",
  ).optional(),
  TunnelInsideCidr: z.string().describe(
    "The range of inside IP addresses for the tunnel. Any specified CIDR blocks must be unique across all VPN connections that use the same virtual private gateway. Constraints: A size /30 CIDR block from the 169.254.0.0/16 range. The following CIDR blocks are reserved and cannot be used: 169.254.0.0/30 169.254.1.0/30 169.254.2.0/30 169.254.3.0/30 169.254.4.0/30 169.254.5.0/30 169.254.169.252/30",
  ).optional(),
  IKEVersions: z.array(IKEVersionsRequestListValueSchema).describe(
    "The IKE versions that are permitted for the VPN tunnel. Valid values: ikev1 | ikev2",
  ).optional(),
  LogOptions: VpnTunnelLogOptionsSpecificationSchema.describe(
    "Options for logging VPN tunnel activity.",
  ).optional(),
  Phase1DHGroupNumbers: z.array(Phase1DHGroupNumbersRequestListValueSchema)
    .describe(
      "One or more Diffie-Hellman group numbers that are permitted for the VPN tunnel for phase 1 IKE negotiations. Valid values: 2 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24",
    ).optional(),
  ReplayWindowSize: z.number().int().min(64).max(2048).describe(
    "The number of packets in an IKE replay window. Constraints: A value between 64 and 2048. Default: 1024",
  ).optional(),
  EnableTunnelLifecycleControl: z.boolean().describe(
    "Turn on or off tunnel endpoint lifecycle control feature.",
  ).optional(),
  RekeyMarginTimeSeconds: z.number().int().min(60).describe(
    "The margin time, in seconds, before the phase 2 lifetime expires, during which the AWS side of the VPN connection performs an IKE rekey. The exact time of the rekey is randomly selected based on the value for RekeyFuzzPercentage. Constraints: A value between 60 and half of Phase2LifetimeSeconds. Default: 270",
  ).optional(),
  DPDTimeoutAction: z.enum(["clear", "none", "restart"]).describe(
    "The action to take after DPD timeout occurs. Specify restart to restart the IKE initiation. Specify clear to end the IKE session. Valid Values: clear | none | restart Default: clear",
  ).optional(),
  Phase2LifetimeSeconds: z.number().int().min(900).max(3600).describe(
    "The lifetime for phase 2 of the IKE negotiation, in seconds. Constraints: A value between 900 and 3,600. The value must be less than the value for Phase1LifetimeSeconds. Default: 3600",
  ).optional(),
  Phase2IntegrityAlgorithms: z.array(
    Phase2IntegrityAlgorithmsRequestListValueSchema,
  ).describe(
    "One or more integrity algorithms that are permitted for the VPN tunnel for phase 2 IKE negotiations. Valid values: SHA1 | SHA2-256 | SHA2-384 | SHA2-512",
  ).optional(),
  Phase1IntegrityAlgorithms: z.array(
    Phase1IntegrityAlgorithmsRequestListValueSchema,
  ).describe(
    "One or more integrity algorithms that are permitted for the VPN tunnel for phase 1 IKE negotiations. Valid values: SHA1 | SHA2-256 | SHA2-384 | SHA2-512",
  ).optional(),
  PreSharedKey: z.string().describe(
    "The pre-shared key (PSK) to establish initial authentication between the virtual private gateway and customer gateway. Constraints: Allowed characters are alphanumeric characters, periods (.), and underscores (_). Must be between 8 and 64 characters in length and cannot start with zero (0).",
  ).optional(),
  Phase1LifetimeSeconds: z.number().int().min(900).max(28800).describe(
    "The lifetime for phase 1 of the IKE negotiation, in seconds. Constraints: A value between 900 and 28,800. Default: 28800",
  ).optional(),
  RekeyFuzzPercentage: z.number().int().min(0).max(100).describe(
    "The percentage of the rekey window (determined by RekeyMarginTimeSeconds) during which the rekey time is randomly selected. Constraints: A value between 0 and 100. Default: 100",
  ).optional(),
  Phase1EncryptionAlgorithms: z.array(
    Phase1EncryptionAlgorithmsRequestListValueSchema,
  ).describe(
    "One or more encryption algorithms that are permitted for the VPN tunnel for phase 1 IKE negotiations. Valid values: AES128 | AES256 | AES128-GCM-16 | AES256-GCM-16",
  ).optional(),
  DPDTimeoutSeconds: z.number().int().min(30).describe(
    "The number of seconds after which a DPD timeout occurs. Constraints: A value greater than or equal to 30. Default: 30",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().describe("The tag value."),
  Key: z.string().describe("The tag key."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  RemoteIpv6NetworkCidr: z.string().describe(
    "The IPv6 CIDR on the AWS side of the VPN connection. Default:::/0",
  ).optional(),
  RemoteIpv4NetworkCidr: z.string().describe(
    "The IPv4 CIDR on the AWS side of the VPN connection. Default: 0.0.0.0/0",
  ).optional(),
  VpnTunnelOptionsSpecifications: z.array(VpnTunnelOptionsSpecificationSchema)
    .describe("The tunnel options for the VPN connection.").optional(),
  CustomerGatewayId: z.string().describe(
    "The ID of the customer gateway at your end of the VPN connection.",
  ),
  OutsideIpAddressType: z.string().describe(
    "The type of IP address assigned to the outside interface of the customer gateway device. Valid values: PrivateIpv4 | PublicIpv4 | Ipv6 Default: PublicIpv4",
  ).optional(),
  StaticRoutesOnly: z.boolean().describe(
    "Indicates whether the VPN connection uses static routes only. Static routes must be used for devices that don't support BGP. If you are creating a VPN connection for a device that does not support Border Gateway Protocol (BGP), you must specify true.",
  ).optional(),
  EnableAcceleration: z.boolean().describe(
    "Indicate whether to enable acceleration for the VPN connection. Default: false",
  ).optional(),
  TransitGatewayId: z.string().describe(
    "The ID of the transit gateway associated with the VPN connection. You must specify either TransitGatewayId or VpnGatewayId, but not both.",
  ).optional(),
  Type: z.string().describe("The type of VPN connection."),
  TunnelBandwidth: z.enum(["standard", "large"]).describe(
    "The desired bandwidth specification for the VPN tunnel, used when creating or modifying VPN connection options to set the tunnel's throughput capacity. standard supports up to 1.25 Gbps per tunnel, while large supports up to 5 Gbps per tunnel. The default value is standard. Existing VPN connections without a bandwidth setting will automatically default to standard.",
  ).optional(),
  LocalIpv4NetworkCidr: z.string().describe(
    "The IPv4 CIDR on the customer gateway (on-premises) side of the VPN connection. Default: 0.0.0.0/0",
  ).optional(),
  VpnGatewayId: z.string().describe(
    "The ID of the virtual private gateway at the AWS side of the VPN connection. You must specify either TransitGatewayId or VpnGatewayId, but not both.",
  ).optional(),
  VpnConcentratorId: z.string().describe(
    "The ID of the VPN concentrator to associate with the VPN connection.",
  ).optional(),
  PreSharedKeyStorage: z.enum(["Standard", "SecretsManager"]).describe(
    "Describes the storage location for an instance store-backed AMI.",
  ).optional(),
  TransportTransitGatewayAttachmentId: z.string().describe(
    "The transit gateway attachment ID to use for the VPN tunnel. Required if OutsideIpAddressType is set to PrivateIpv4.",
  ).optional(),
  LocalIpv6NetworkCidr: z.string().describe(
    "The IPv6 CIDR on the customer gateway (on-premises) side of the VPN connection. Default:::/0",
  ).optional(),
  TunnelInsideIpVersion: z.string().describe(
    "Indicate whether the VPN tunnels process IPv4 or IPv6 traffic. Default: ipv4",
  ).optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the VPN connection.")
    .optional(),
});

const StateSchema = z.object({
  RemoteIpv6NetworkCidr: z.string().optional(),
  RemoteIpv4NetworkCidr: z.string().optional(),
  VpnTunnelOptionsSpecifications: z.array(VpnTunnelOptionsSpecificationSchema)
    .optional(),
  CustomerGatewayId: z.string().optional(),
  OutsideIpAddressType: z.string().optional(),
  StaticRoutesOnly: z.boolean().optional(),
  EnableAcceleration: z.boolean().optional(),
  TransitGatewayId: z.string().optional(),
  Type: z.string().optional(),
  TunnelBandwidth: z.string().optional(),
  LocalIpv4NetworkCidr: z.string().optional(),
  VpnGatewayId: z.string().optional(),
  VpnConcentratorId: z.string().optional(),
  PreSharedKeyStorage: z.string().optional(),
  TransportTransitGatewayAttachmentId: z.string().optional(),
  LocalIpv6NetworkCidr: z.string().optional(),
  VpnConnectionId: z.string(),
  TunnelInsideIpVersion: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  RemoteIpv6NetworkCidr: z.string().describe(
    "The IPv6 CIDR on the AWS side of the VPN connection. Default:::/0",
  ).optional(),
  RemoteIpv4NetworkCidr: z.string().describe(
    "The IPv4 CIDR on the AWS side of the VPN connection. Default: 0.0.0.0/0",
  ).optional(),
  VpnTunnelOptionsSpecifications: z.array(VpnTunnelOptionsSpecificationSchema)
    .describe("The tunnel options for the VPN connection.").optional(),
  CustomerGatewayId: z.string().describe(
    "The ID of the customer gateway at your end of the VPN connection.",
  ).optional(),
  OutsideIpAddressType: z.string().describe(
    "The type of IP address assigned to the outside interface of the customer gateway device. Valid values: PrivateIpv4 | PublicIpv4 | Ipv6 Default: PublicIpv4",
  ).optional(),
  StaticRoutesOnly: z.boolean().describe(
    "Indicates whether the VPN connection uses static routes only. Static routes must be used for devices that don't support BGP. If you are creating a VPN connection for a device that does not support Border Gateway Protocol (BGP), you must specify true.",
  ).optional(),
  EnableAcceleration: z.boolean().describe(
    "Indicate whether to enable acceleration for the VPN connection. Default: false",
  ).optional(),
  TransitGatewayId: z.string().describe(
    "The ID of the transit gateway associated with the VPN connection. You must specify either TransitGatewayId or VpnGatewayId, but not both.",
  ).optional(),
  Type: z.string().describe("The type of VPN connection.").optional(),
  TunnelBandwidth: z.enum(["standard", "large"]).describe(
    "The desired bandwidth specification for the VPN tunnel, used when creating or modifying VPN connection options to set the tunnel's throughput capacity. standard supports up to 1.25 Gbps per tunnel, while large supports up to 5 Gbps per tunnel. The default value is standard. Existing VPN connections without a bandwidth setting will automatically default to standard.",
  ).optional(),
  LocalIpv4NetworkCidr: z.string().describe(
    "The IPv4 CIDR on the customer gateway (on-premises) side of the VPN connection. Default: 0.0.0.0/0",
  ).optional(),
  VpnGatewayId: z.string().describe(
    "The ID of the virtual private gateway at the AWS side of the VPN connection. You must specify either TransitGatewayId or VpnGatewayId, but not both.",
  ).optional(),
  VpnConcentratorId: z.string().describe(
    "The ID of the VPN concentrator to associate with the VPN connection.",
  ).optional(),
  PreSharedKeyStorage: z.enum(["Standard", "SecretsManager"]).describe(
    "Describes the storage location for an instance store-backed AMI.",
  ).optional(),
  TransportTransitGatewayAttachmentId: z.string().describe(
    "The transit gateway attachment ID to use for the VPN tunnel. Required if OutsideIpAddressType is set to PrivateIpv4.",
  ).optional(),
  LocalIpv6NetworkCidr: z.string().describe(
    "The IPv6 CIDR on the customer gateway (on-premises) side of the VPN connection. Default:::/0",
  ).optional(),
  TunnelInsideIpVersion: z.string().describe(
    "Indicate whether the VPN tunnels process IPv4 or IPv6 traffic. Default: ipv4",
  ).optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the VPN connection.")
    .optional(),
});

/** Swamp extension model for EC2 VPNConnection. Registered at `@swamp/aws/ec2/vpnconnection`. */
export const model = {
  type: "@swamp/aws/ec2/vpnconnection",
  version: "2026.05.02.1",
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
      toVersion: "2026.05.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 VPNConnection resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 VPNConnection",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EC2::VPNConnection",
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
      description: "Get a EC2 VPNConnection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 VPNConnection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EC2::VPNConnection",
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
      description: "Update a EC2 VPNConnection",
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
        const identifier = existing.VpnConnectionId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::VPNConnection",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EC2::VPNConnection",
          identifier,
          currentState,
          desiredState,
          [
            "Type",
            "VpnConcentratorId",
            "EnableAcceleration",
            "LocalIpv4NetworkCidr",
            "LocalIpv6NetworkCidr",
            "OutsideIpAddressType",
            "RemoteIpv4NetworkCidr",
            "RemoteIpv6NetworkCidr",
            "StaticRoutesOnly",
            "TransportTransitGatewayAttachmentId",
            "TunnelInsideIpVersion",
            "PreSharedKeyStorage",
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
      description: "Delete a EC2 VPNConnection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 VPNConnection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EC2::VPNConnection",
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
      description: "Sync EC2 VPNConnection state from AWS",
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
        const identifier = existing.VpnConnectionId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::VPNConnection",
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
