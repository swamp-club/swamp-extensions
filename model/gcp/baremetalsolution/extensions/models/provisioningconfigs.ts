// Auto-generated extension model for @swamp/gcp/baremetalsolution/provisioningconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Bare Metal Solution ProvisioningConfigs.
 *
 * A provisioning configuration.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/provisioningConfigs/${shortName}`;
}

const BASE_URL = "https://baremetalsolution.googleapis.com/";

const GET_CONFIG = {
  "id": "baremetalsolution.projects.locations.provisioningConfigs.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "baremetalsolution.projects.locations.provisioningConfigs.create",
  "path": "v2/{+parent}/provisioningConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "email": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "baremetalsolution.projects.locations.provisioningConfigs.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "email": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  customId: z.string().describe(
    "Optional. The user-defined identifier of the provisioning config.",
  ).optional(),
  handoverServiceAccount: z.string().describe(
    "A service account to enable customers to access instance credentials upon handover.",
  ).optional(),
  instances: z.array(z.object({
    accountNetworksEnabled: z.boolean().describe(
      "If true networks can be from different projects of the same vendor account.",
    ).optional(),
    clientNetwork: z.object({
      address: z.string().describe("IPv4 address to be assigned to the server.")
        .optional(),
      existingNetworkId: z.string().describe(
        "Name of the existing network to use.",
      ).optional(),
      networkId: z.string().describe(
        "Id of the network to use, within the same ProvisioningConfig request.",
      ).optional(),
    }).describe("A network.").optional(),
    hyperthreading: z.boolean().describe(
      "Whether the instance should be provisioned with Hyperthreading enabled.",
    ).optional(),
    id: z.string().describe(
      "A transient unique identifier to identify an instance within an ProvisioningConfig request.",
    ).optional(),
    instanceType: z.string().describe(
      "Instance type. [Available types](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations)",
    ).optional(),
    kmsKeyVersion: z.string().describe(
      "Name of the KMS crypto key version used to encrypt the initial passwords. The key has to have ASYMMETRIC_DECRYPT purpose.",
    ).optional(),
    logicalInterfaces: z.array(z.object({
      interfaceIndex: z.number().int().describe(
        "The index of the logical interface mapping to the index of the hardware bond or nic on the chosen network template. This field is deprecated.",
      ).optional(),
      logicalNetworkInterfaces: z.array(z.unknown()).describe(
        "List of logical network interfaces within a logical interface.",
      ).optional(),
      name: z.string().describe(
        "Interface name. This is of syntax or and forms part of the network template name.",
      ).optional(),
    })).describe(
      "List of logical interfaces for the instance. The number of logical interfaces will be the same as number of hardware bond/nic on the chosen network template. Filled if InstanceConfig.multivlan_config is true.",
    ).optional(),
    name: z.string().describe("The name of the instance config.").optional(),
    networkConfig: z.enum([
      "NETWORKCONFIG_UNSPECIFIED",
      "SINGLE_VLAN",
      "MULTI_VLAN",
    ]).describe("The type of network configuration on the instance.")
      .optional(),
    networkTemplate: z.string().describe(
      "Server network template name. Filled if InstanceConfig.multivlan_config is true.",
    ).optional(),
    osImage: z.string().describe(
      "OS image to initialize the instance. [Available images](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations)",
    ).optional(),
    privateNetwork: z.object({
      address: z.string().describe("IPv4 address to be assigned to the server.")
        .optional(),
      existingNetworkId: z.string().describe(
        "Name of the existing network to use.",
      ).optional(),
      networkId: z.string().describe(
        "Id of the network to use, within the same ProvisioningConfig request.",
      ).optional(),
    }).describe("A network.").optional(),
    sshKeyNames: z.array(z.string()).describe(
      "Optional. List of names of ssh keys used to provision the instance.",
    ).optional(),
    userNote: z.string().describe(
      "User note field, it can be used by customers to add additional information for the BMS Ops team.",
    ).optional(),
  })).describe("Instances to be created.").optional(),
  location: z.string().describe(
    "Optional. Location name of this ProvisioningConfig. It is optional only for Intake UI transition period.",
  ).optional(),
  networks: z.array(z.object({
    bandwidth: z.enum([
      "BANDWIDTH_UNSPECIFIED",
      "BW_1_GBPS",
      "BW_2_GBPS",
      "BW_5_GBPS",
      "BW_10_GBPS",
    ]).describe("Interconnect bandwidth. Set only when type is CLIENT.")
      .optional(),
    cidr: z.string().describe("CIDR range of the network.").optional(),
    gcpService: z.string().describe(
      "The GCP service of the network. Available gcp_service are in https://cloud.google.com/bare-metal/docs/bms-planning.",
    ).optional(),
    id: z.string().describe(
      "A transient unique identifier to identify a volume within an ProvisioningConfig request.",
    ).optional(),
    jumboFramesEnabled: z.boolean().describe(
      "The JumboFramesEnabled option for customer to set.",
    ).optional(),
    name: z.string().describe("Output only. The name of the network config.")
      .optional(),
    serviceCidr: z.enum([
      "SERVICE_CIDR_UNSPECIFIED",
      "DISABLED",
      "HIGH_26",
      "HIGH_27",
      "HIGH_28",
    ]).describe("Service CIDR, if any.").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "CLIENT", "PRIVATE"]).describe(
      "The type of this network, either Client or Private.",
    ).optional(),
    userNote: z.string().describe(
      "User note field, it can be used by customers to add additional information for the BMS Ops team.",
    ).optional(),
    vlanAttachments: z.array(z.object({
      id: z.string().describe("Identifier of the VLAN attachment.").optional(),
      pairingKey: z.string().describe("Attachment pairing key.").optional(),
    })).describe(
      "List of VLAN attachments. As of now there are always 2 attachments, but it is going to change in the future (multi vlan). Use only one of vlan_attachments or vrf",
    ).optional(),
    vlanSameProject: z.boolean().describe(
      "Whether the VLAN attachment pair is located in the same project.",
    ).optional(),
    vrf: z.string().describe(
      "Optional. The name of a pre-existing Vrf that the network should be attached to. Format is `vrfs/{vrf}`. If vrf is specified, vlan_attachments must be empty.",
    ).optional(),
  })).describe("Networks to be created.").optional(),
  pod: z.string().describe(
    "Optional. Pod name. Pod is an independent part of infrastructure. Instance can be connected to the assets (networks, volumes, nfsshares) allocated in the same pod only.",
  ).optional(),
  statusMessage: z.string().describe(
    "Optional status messages associated with the FAILED state.",
  ).optional(),
  ticketId: z.string().describe(
    "A generated ticket id to track provisioning request.",
  ).optional(),
  volumes: z.array(z.object({
    gcpService: z.string().describe(
      "The GCP service of the storage volume. Available gcp_service are in https://cloud.google.com/bare-metal/docs/bms-planning.",
    ).optional(),
    id: z.string().describe(
      "A transient unique identifier to identify a volume within an ProvisioningConfig request.",
    ).optional(),
    lunRanges: z.array(z.object({
      quantity: z.number().int().describe("Number of LUNs to create.")
        .optional(),
      sizeGb: z.number().int().describe(
        "The requested size of each LUN, in GB.",
      ).optional(),
    })).describe(
      "LUN ranges to be configured. Set only when protocol is PROTOCOL_FC.",
    ).optional(),
    machineIds: z.array(z.string()).describe(
      "Machine ids connected to this volume. Set only when protocol is PROTOCOL_FC.",
    ).optional(),
    name: z.string().describe("Output only. The name of the volume config.")
      .optional(),
    nfsExports: z.array(z.object({
      allowDev: z.boolean().describe(
        "Allow dev flag in NfsShare AllowedClientsRequest.",
      ).optional(),
      allowSuid: z.boolean().describe("Allow the setuid flag.").optional(),
      cidr: z.string().describe("A CIDR range.").optional(),
      machineId: z.string().describe(
        "Either a single machine, identified by an ID, or a comma-separated list of machine IDs.",
      ).optional(),
      networkId: z.string().describe("Network to use to publish the export.")
        .optional(),
      noRootSquash: z.boolean().describe(
        "Disable root squashing, which is a feature of NFS. Root squash is a special mapping of the remote superuser (root) identity when using identity authentication.",
      ).optional(),
      permissions: z.enum([
        "PERMISSIONS_UNSPECIFIED",
        "READ_ONLY",
        "READ_WRITE",
      ]).describe("Export permissions.").optional(),
    })).describe("NFS exports. Set only when protocol is PROTOCOL_NFS.")
      .optional(),
    performanceTier: z.enum([
      "VOLUME_PERFORMANCE_TIER_UNSPECIFIED",
      "VOLUME_PERFORMANCE_TIER_SHARED",
      "VOLUME_PERFORMANCE_TIER_ASSIGNED",
      "VOLUME_PERFORMANCE_TIER_HT",
      "VOLUME_PERFORMANCE_TIER_QOS2_PERFORMANCE",
    ]).describe("Performance tier of the Volume. Default is SHARED.")
      .optional(),
    protocol: z.enum(["PROTOCOL_UNSPECIFIED", "PROTOCOL_FC", "PROTOCOL_NFS"])
      .describe("Volume protocol.").optional(),
    sizeGb: z.number().int().describe(
      "The requested size of this volume, in GB.",
    ).optional(),
    snapshotsEnabled: z.boolean().describe(
      "Whether snapshots should be enabled.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "FLASH", "DISK"]).describe(
      "The type of this Volume.",
    ).optional(),
    userNote: z.string().describe(
      "User note field, it can be used by customers to add additional information for the BMS Ops team.",
    ).optional(),
  })).describe("Volumes to be created.").optional(),
  vpcScEnabled: z.boolean().describe(
    "If true, VPC SC is enabled for the cluster.",
  ).optional(),
});

const StateSchema = z.object({
  cloudConsoleUri: z.string().optional(),
  customId: z.string().optional(),
  email: z.string().optional(),
  handoverServiceAccount: z.string().optional(),
  instances: z.array(z.object({
    accountNetworksEnabled: z.boolean(),
    clientNetwork: z.object({
      address: z.string(),
      existingNetworkId: z.string(),
      networkId: z.string(),
    }),
    hyperthreading: z.boolean(),
    id: z.string(),
    instanceType: z.string(),
    kmsKeyVersion: z.string(),
    logicalInterfaces: z.array(z.object({
      interfaceIndex: z.number(),
      logicalNetworkInterfaces: z.array(z.unknown()),
      name: z.string(),
    })),
    name: z.string(),
    networkConfig: z.string(),
    networkTemplate: z.string(),
    osImage: z.string(),
    privateNetwork: z.object({
      address: z.string(),
      existingNetworkId: z.string(),
      networkId: z.string(),
    }),
    sshKeyNames: z.array(z.string()),
    userNote: z.string(),
  })).optional(),
  location: z.string().optional(),
  name: z.string(),
  networks: z.array(z.object({
    bandwidth: z.string(),
    cidr: z.string(),
    gcpService: z.string(),
    id: z.string(),
    jumboFramesEnabled: z.boolean(),
    name: z.string(),
    serviceCidr: z.string(),
    type: z.string(),
    userNote: z.string(),
    vlanAttachments: z.array(z.object({
      id: z.string(),
      pairingKey: z.string(),
    })),
    vlanSameProject: z.boolean(),
    vrf: z.string(),
  })).optional(),
  pod: z.string().optional(),
  state: z.string().optional(),
  statusMessage: z.string().optional(),
  ticketId: z.string().optional(),
  updateTime: z.string().optional(),
  volumes: z.array(z.object({
    gcpService: z.string(),
    id: z.string(),
    lunRanges: z.array(z.object({
      quantity: z.number(),
      sizeGb: z.number(),
    })),
    machineIds: z.array(z.string()),
    name: z.string(),
    nfsExports: z.array(z.object({
      allowDev: z.boolean(),
      allowSuid: z.boolean(),
      cidr: z.string(),
      machineId: z.string(),
      networkId: z.string(),
      noRootSquash: z.boolean(),
      permissions: z.string(),
    })),
    performanceTier: z.string(),
    protocol: z.string(),
    sizeGb: z.number(),
    snapshotsEnabled: z.boolean(),
    type: z.string(),
    userNote: z.string(),
  })).optional(),
  vpcScEnabled: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  customId: z.string().describe(
    "Optional. The user-defined identifier of the provisioning config.",
  ).optional(),
  handoverServiceAccount: z.string().describe(
    "A service account to enable customers to access instance credentials upon handover.",
  ).optional(),
  instances: z.array(z.object({
    accountNetworksEnabled: z.boolean().describe(
      "If true networks can be from different projects of the same vendor account.",
    ).optional(),
    clientNetwork: z.object({
      address: z.string().describe("IPv4 address to be assigned to the server.")
        .optional(),
      existingNetworkId: z.string().describe(
        "Name of the existing network to use.",
      ).optional(),
      networkId: z.string().describe(
        "Id of the network to use, within the same ProvisioningConfig request.",
      ).optional(),
    }).describe("A network.").optional(),
    hyperthreading: z.boolean().describe(
      "Whether the instance should be provisioned with Hyperthreading enabled.",
    ).optional(),
    id: z.string().describe(
      "A transient unique identifier to identify an instance within an ProvisioningConfig request.",
    ).optional(),
    instanceType: z.string().describe(
      "Instance type. [Available types](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations)",
    ).optional(),
    kmsKeyVersion: z.string().describe(
      "Name of the KMS crypto key version used to encrypt the initial passwords. The key has to have ASYMMETRIC_DECRYPT purpose.",
    ).optional(),
    logicalInterfaces: z.array(z.object({
      interfaceIndex: z.number().int().describe(
        "The index of the logical interface mapping to the index of the hardware bond or nic on the chosen network template. This field is deprecated.",
      ).optional(),
      logicalNetworkInterfaces: z.array(z.unknown()).describe(
        "List of logical network interfaces within a logical interface.",
      ).optional(),
      name: z.string().describe(
        "Interface name. This is of syntax or and forms part of the network template name.",
      ).optional(),
    })).describe(
      "List of logical interfaces for the instance. The number of logical interfaces will be the same as number of hardware bond/nic on the chosen network template. Filled if InstanceConfig.multivlan_config is true.",
    ).optional(),
    name: z.string().describe("The name of the instance config.").optional(),
    networkConfig: z.enum([
      "NETWORKCONFIG_UNSPECIFIED",
      "SINGLE_VLAN",
      "MULTI_VLAN",
    ]).describe("The type of network configuration on the instance.")
      .optional(),
    networkTemplate: z.string().describe(
      "Server network template name. Filled if InstanceConfig.multivlan_config is true.",
    ).optional(),
    osImage: z.string().describe(
      "OS image to initialize the instance. [Available images](https://cloud.google.com/bare-metal/docs/bms-planning#server_configurations)",
    ).optional(),
    privateNetwork: z.object({
      address: z.string().describe("IPv4 address to be assigned to the server.")
        .optional(),
      existingNetworkId: z.string().describe(
        "Name of the existing network to use.",
      ).optional(),
      networkId: z.string().describe(
        "Id of the network to use, within the same ProvisioningConfig request.",
      ).optional(),
    }).describe("A network.").optional(),
    sshKeyNames: z.array(z.string()).describe(
      "Optional. List of names of ssh keys used to provision the instance.",
    ).optional(),
    userNote: z.string().describe(
      "User note field, it can be used by customers to add additional information for the BMS Ops team.",
    ).optional(),
  })).describe("Instances to be created.").optional(),
  location: z.string().describe(
    "Optional. Location name of this ProvisioningConfig. It is optional only for Intake UI transition period.",
  ).optional(),
  networks: z.array(z.object({
    bandwidth: z.enum([
      "BANDWIDTH_UNSPECIFIED",
      "BW_1_GBPS",
      "BW_2_GBPS",
      "BW_5_GBPS",
      "BW_10_GBPS",
    ]).describe("Interconnect bandwidth. Set only when type is CLIENT.")
      .optional(),
    cidr: z.string().describe("CIDR range of the network.").optional(),
    gcpService: z.string().describe(
      "The GCP service of the network. Available gcp_service are in https://cloud.google.com/bare-metal/docs/bms-planning.",
    ).optional(),
    id: z.string().describe(
      "A transient unique identifier to identify a volume within an ProvisioningConfig request.",
    ).optional(),
    jumboFramesEnabled: z.boolean().describe(
      "The JumboFramesEnabled option for customer to set.",
    ).optional(),
    name: z.string().describe("Output only. The name of the network config.")
      .optional(),
    serviceCidr: z.enum([
      "SERVICE_CIDR_UNSPECIFIED",
      "DISABLED",
      "HIGH_26",
      "HIGH_27",
      "HIGH_28",
    ]).describe("Service CIDR, if any.").optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "CLIENT", "PRIVATE"]).describe(
      "The type of this network, either Client or Private.",
    ).optional(),
    userNote: z.string().describe(
      "User note field, it can be used by customers to add additional information for the BMS Ops team.",
    ).optional(),
    vlanAttachments: z.array(z.object({
      id: z.string().describe("Identifier of the VLAN attachment.").optional(),
      pairingKey: z.string().describe("Attachment pairing key.").optional(),
    })).describe(
      "List of VLAN attachments. As of now there are always 2 attachments, but it is going to change in the future (multi vlan). Use only one of vlan_attachments or vrf",
    ).optional(),
    vlanSameProject: z.boolean().describe(
      "Whether the VLAN attachment pair is located in the same project.",
    ).optional(),
    vrf: z.string().describe(
      "Optional. The name of a pre-existing Vrf that the network should be attached to. Format is `vrfs/{vrf}`. If vrf is specified, vlan_attachments must be empty.",
    ).optional(),
  })).describe("Networks to be created.").optional(),
  pod: z.string().describe(
    "Optional. Pod name. Pod is an independent part of infrastructure. Instance can be connected to the assets (networks, volumes, nfsshares) allocated in the same pod only.",
  ).optional(),
  statusMessage: z.string().describe(
    "Optional status messages associated with the FAILED state.",
  ).optional(),
  ticketId: z.string().describe(
    "A generated ticket id to track provisioning request.",
  ).optional(),
  volumes: z.array(z.object({
    gcpService: z.string().describe(
      "The GCP service of the storage volume. Available gcp_service are in https://cloud.google.com/bare-metal/docs/bms-planning.",
    ).optional(),
    id: z.string().describe(
      "A transient unique identifier to identify a volume within an ProvisioningConfig request.",
    ).optional(),
    lunRanges: z.array(z.object({
      quantity: z.number().int().describe("Number of LUNs to create.")
        .optional(),
      sizeGb: z.number().int().describe(
        "The requested size of each LUN, in GB.",
      ).optional(),
    })).describe(
      "LUN ranges to be configured. Set only when protocol is PROTOCOL_FC.",
    ).optional(),
    machineIds: z.array(z.string()).describe(
      "Machine ids connected to this volume. Set only when protocol is PROTOCOL_FC.",
    ).optional(),
    name: z.string().describe("Output only. The name of the volume config.")
      .optional(),
    nfsExports: z.array(z.object({
      allowDev: z.boolean().describe(
        "Allow dev flag in NfsShare AllowedClientsRequest.",
      ).optional(),
      allowSuid: z.boolean().describe("Allow the setuid flag.").optional(),
      cidr: z.string().describe("A CIDR range.").optional(),
      machineId: z.string().describe(
        "Either a single machine, identified by an ID, or a comma-separated list of machine IDs.",
      ).optional(),
      networkId: z.string().describe("Network to use to publish the export.")
        .optional(),
      noRootSquash: z.boolean().describe(
        "Disable root squashing, which is a feature of NFS. Root squash is a special mapping of the remote superuser (root) identity when using identity authentication.",
      ).optional(),
      permissions: z.enum([
        "PERMISSIONS_UNSPECIFIED",
        "READ_ONLY",
        "READ_WRITE",
      ]).describe("Export permissions.").optional(),
    })).describe("NFS exports. Set only when protocol is PROTOCOL_NFS.")
      .optional(),
    performanceTier: z.enum([
      "VOLUME_PERFORMANCE_TIER_UNSPECIFIED",
      "VOLUME_PERFORMANCE_TIER_SHARED",
      "VOLUME_PERFORMANCE_TIER_ASSIGNED",
      "VOLUME_PERFORMANCE_TIER_HT",
      "VOLUME_PERFORMANCE_TIER_QOS2_PERFORMANCE",
    ]).describe("Performance tier of the Volume. Default is SHARED.")
      .optional(),
    protocol: z.enum(["PROTOCOL_UNSPECIFIED", "PROTOCOL_FC", "PROTOCOL_NFS"])
      .describe("Volume protocol.").optional(),
    sizeGb: z.number().int().describe(
      "The requested size of this volume, in GB.",
    ).optional(),
    snapshotsEnabled: z.boolean().describe(
      "Whether snapshots should be enabled.",
    ).optional(),
    type: z.enum(["TYPE_UNSPECIFIED", "FLASH", "DISK"]).describe(
      "The type of this Volume.",
    ).optional(),
    userNote: z.string().describe(
      "User note field, it can be used by customers to add additional information for the BMS Ops team.",
    ).optional(),
  })).describe("Volumes to be created.").optional(),
  vpcScEnabled: z.boolean().describe(
    "If true, VPC SC is enabled for the cluster.",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Bare Metal Solution ProvisioningConfigs. Registered at `@swamp/gcp/baremetalsolution/provisioningconfigs`. */
export const model = {
  type: "@swamp/gcp/baremetalsolution/provisioningconfigs",
  version: "2026.06.07.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
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
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A provisioning configuration.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a provisioningConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["customId"] !== undefined) body["customId"] = g["customId"];
        if (g["handoverServiceAccount"] !== undefined) {
          body["handoverServiceAccount"] = g["handoverServiceAccount"];
        }
        if (g["instances"] !== undefined) body["instances"] = g["instances"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["networks"] !== undefined) body["networks"] = g["networks"];
        if (g["pod"] !== undefined) body["pod"] = g["pod"];
        if (g["statusMessage"] !== undefined) {
          body["statusMessage"] = g["statusMessage"];
        }
        if (g["ticketId"] !== undefined) body["ticketId"] = g["ticketId"];
        if (g["volumes"] !== undefined) body["volumes"] = g["volumes"];
        if (g["vpcScEnabled"] !== undefined) {
          body["vpcScEnabled"] = g["vpcScEnabled"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
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
      description: "Get a provisioningConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the provisioningConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update provisioningConfigs attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["customId"] !== undefined) body["customId"] = g["customId"];
        if (g["handoverServiceAccount"] !== undefined) {
          body["handoverServiceAccount"] = g["handoverServiceAccount"];
        }
        if (g["instances"] !== undefined) body["instances"] = g["instances"];
        if (g["location"] !== undefined) body["location"] = g["location"];
        if (g["networks"] !== undefined) body["networks"] = g["networks"];
        if (g["pod"] !== undefined) body["pod"] = g["pod"];
        if (g["statusMessage"] !== undefined) {
          body["statusMessage"] = g["statusMessage"];
        }
        if (g["ticketId"] !== undefined) body["ticketId"] = g["ticketId"];
        if (g["volumes"] !== undefined) body["volumes"] = g["volumes"];
        if (g["vpcScEnabled"] !== undefined) {
          body["vpcScEnabled"] = g["vpcScEnabled"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          credentials,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync provisioningConfigs state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    submit: {
      description: "submit",
      arguments: z.object({
        email: z.any().optional(),
        provisioningConfig: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["email"] !== undefined) body["email"] = args["email"];
        if (args["provisioningConfig"] !== undefined) {
          body["provisioningConfig"] = args["provisioningConfig"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "baremetalsolution.projects.locations.provisioningConfigs.submit",
            "path": "v2/{+parent}/provisioningConfigs:submit",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
