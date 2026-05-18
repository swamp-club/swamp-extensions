// Auto-generated extension model for @swamp/gcp/networkconnectivity/spokes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Connectivity Spokes.
 *
 * A Network Connectivity Center spoke represents one or more network connectivity resources. When you create a spoke, you associate it with a hub. You must also identify a value for exactly one of the following fields: * linked_vpn_tunnels * linked_interconnect_attachments * linked_router_appliance_instances * linked_vpc_network
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/spokes/${shortName}`;
}

const BASE_URL = "https://networkconnectivity.googleapis.com/";

const GET_CONFIG = {
  "id": "networkconnectivity.projects.locations.spokes.get",
  "path": "v1/{+name}",
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
  "id": "networkconnectivity.projects.locations.spokes.create",
  "path": "v1/{+parent}/spokes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "spokeId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkconnectivity.projects.locations.spokes.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "networkconnectivity.projects.locations.spokes.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "Optional. An optional description of the spoke.",
  ).optional(),
  fieldPathsPendingUpdate: z.array(z.string()).describe(
    "Optional. The list of fields waiting for hub administrator's approval.",
  ).optional(),
  gateway: z.object({
    capacity: z.enum([
      "GATEWAY_CAPACITY_UNSPECIFIED",
      "CAPACITY_1_GBPS",
      "CAPACITY_10_GBPS",
    ]).describe("Optional. The aggregate processing capacity of this gateway.")
      .optional(),
    cloudRouters: z.array(z.string()).describe(
      "Output only. The list of Cloud Routers that are connected to this gateway. Should be in the form: https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/routers/{router}",
    ).optional(),
    ipRangeReservations: z.array(z.object({
      ipRange: z.string().describe(
        'Required. A block of IP addresses used to allocate supporting infrastructure for this gateway. This block must not overlap with subnets in any spokes or peer VPC networks that the gateway can communicate with. Example: "10.1.2.0/24"',
      ).optional(),
    })).describe(
      "Optional. A list of IP ranges that are reserved for this gateway's internal intfrastructure.",
    ).optional(),
    sacAttachment: z.string().describe(
      "Output only. The URI of the connected SACAttachment. Should be in the form: projects/{project}/locations/{location}/sacAttachments/{sac_attachment}",
    ).optional(),
  }).describe("A gateway that can apply specialized traffic processing.")
    .optional(),
  group: z.string().describe(
    "Optional. The name of the group that this spoke is associated with.",
  ).optional(),
  hub: z.string().describe(
    "Immutable. The name of the hub that this spoke is attached to.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements).",
  ).optional(),
  linkedInterconnectAttachments: z.object({
    excludeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes overlapped/encompassed by exclude export ranges are excluded during export to hub.",
    ).optional(),
    excludeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes overlapped/encompassed by exclude import ranges are excluded during import from hub.",
    ).optional(),
    includeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes fully encompassed by include export ranges are included during export to hub.",
    ).optional(),
    includeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes fully encompassed by include import ranges are included during import from hub.",
    ).optional(),
    siteToSiteDataTransfer: z.boolean().describe(
      "A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations).",
    ).optional(),
    uris: z.array(z.string()).describe(
      "The URIs of linked interconnect attachment resources",
    ).optional(),
    vpcNetwork: z.string().describe(
      "Output only. The VPC network where these VLAN attachments are located.",
    ).optional(),
  }).describe(
    "A collection of VLAN attachment resources. These resources should be redundant attachments that all advertise the same prefixes to Google Cloud. Alternatively, in active/passive configurations, all attachments should be capable of advertising the same prefixes.",
  ).optional(),
  linkedProducerVpcNetwork: z.object({
    excludeExportRanges: z.array(z.string()).describe(
      "Optional. IP ranges encompassing the subnets to be excluded from peering.",
    ).optional(),
    includeExportRanges: z.array(z.string()).describe(
      "Optional. IP ranges allowed to be included from peering.",
    ).optional(),
    network: z.string().describe(
      "Immutable. The URI of the Service Consumer VPC that the Producer VPC is peered with.",
    ).optional(),
    peering: z.string().describe(
      "Immutable. The name of the VPC peering between the Service Consumer VPC and the Producer VPC (defined in the Tenant project) which is added to the NCC hub. This peering must be in ACTIVE state.",
    ).optional(),
    producerNetwork: z.string().describe(
      "Output only. The URI of the Producer VPC.",
    ).optional(),
    proposedExcludeExportRanges: z.array(z.string()).describe(
      "Output only. The proposed exclude export IP ranges waiting for hub administrator's approval.",
    ).optional(),
    proposedIncludeExportRanges: z.array(z.string()).describe(
      "Output only. The proposed include export IP ranges waiting for hub administrator's approval.",
    ).optional(),
    serviceConsumerVpcSpoke: z.string().describe(
      "Output only. The Service Consumer Network spoke.",
    ).optional(),
  }).optional(),
  linkedRouterApplianceInstances: z.object({
    excludeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes overlapped/encompassed by exclude export ranges are excluded during export to hub.",
    ).optional(),
    excludeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes overlapped/encompassed by exclude import ranges are excluded during import from hub.",
    ).optional(),
    includeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes fully encompassed by include export ranges are included during export to hub.",
    ).optional(),
    includeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes fully encompassed by include import ranges are included during import from hub.",
    ).optional(),
    instances: z.array(z.object({
      ipAddress: z.string().describe(
        "The IP address on the VM to use for peering.",
      ).optional(),
      virtualMachine: z.string().describe("The URI of the VM.").optional(),
    })).describe("The list of router appliance instances.").optional(),
    siteToSiteDataTransfer: z.boolean().describe(
      "A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations).",
    ).optional(),
    vpcNetwork: z.string().describe(
      "Output only. The VPC network where these router appliance instances are located.",
    ).optional(),
  }).describe(
    "A collection of router appliance instances. If you configure multiple router appliance instances to receive data from the same set of sites outside of Google Cloud, we recommend that you associate those instances with the same spoke.",
  ).optional(),
  linkedVpcNetwork: z.object({
    excludeExportRanges: z.array(z.string()).describe(
      "Optional. IP ranges encompassing the subnets to be excluded from peering.",
    ).optional(),
    includeExportRanges: z.array(z.string()).describe(
      "Optional. IP ranges allowed to be included from peering.",
    ).optional(),
    producerVpcSpokes: z.array(z.string()).describe(
      "Output only. The list of Producer VPC spokes that this VPC spoke is a service consumer VPC spoke for. These producer VPCs are connected through VPC peering to this spoke's backing VPC network. Because they are directly connected through VPC peering, NCC export filters do not apply between the service consumer VPC spoke and any of its producer VPC spokes. This VPC spoke cannot be deleted as long as any of these producer VPC spokes are connected to the NCC Hub.",
    ).optional(),
    proposedExcludeExportRanges: z.array(z.string()).describe(
      "Output only. The proposed exclude export IP ranges waiting for hub administrator's approval.",
    ).optional(),
    proposedIncludeExportRanges: z.array(z.string()).describe(
      "Output only. The proposed include export IP ranges waiting for hub administrator's approval.",
    ).optional(),
    uri: z.string().describe("Required. The URI of the VPC network resource.")
      .optional(),
  }).describe("An existing VPC network.").optional(),
  linkedVpnTunnels: z.object({
    excludeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes overlapped/encompassed by exclude export ranges are excluded during export to hub.",
    ).optional(),
    excludeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes overlapped/encompassed by exclude import ranges are excluded during import from hub.",
    ).optional(),
    includeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes fully encompassed by include export ranges are included during export to hub.",
    ).optional(),
    includeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes fully encompassed by include import ranges are included during import from hub.",
    ).optional(),
    siteToSiteDataTransfer: z.boolean().describe(
      "A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations).",
    ).optional(),
    uris: z.array(z.string()).describe(
      "The URIs of linked VPN tunnel resources.",
    ).optional(),
    vpcNetwork: z.string().describe(
      "Output only. The VPC network where these VPN tunnels are located.",
    ).optional(),
  }).describe(
    "A collection of Cloud VPN tunnel resources. These resources should be redundant HA VPN tunnels that all advertise the same prefixes to Google Cloud. Alternatively, in a passive/active configuration, all tunnels should be capable of advertising the same prefixes.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The name of the spoke. Spoke names must be unique. They use the following form: `projects/{project_number}/locations/{region}/spokes/{spoke_id}`",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  spokeId: z.string().describe("Required. Unique id for the spoke to create.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  fieldPathsPendingUpdate: z.array(z.string()).optional(),
  gateway: z.object({
    capacity: z.string(),
    cloudRouters: z.array(z.string()),
    ipRangeReservations: z.array(z.object({
      ipRange: z.string(),
    })),
    sacAttachment: z.string(),
  }).optional(),
  group: z.string().optional(),
  hub: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  linkedInterconnectAttachments: z.object({
    excludeExportRanges: z.array(z.string()),
    excludeImportRanges: z.array(z.string()),
    includeExportRanges: z.array(z.string()),
    includeImportRanges: z.array(z.string()),
    siteToSiteDataTransfer: z.boolean(),
    uris: z.array(z.string()),
    vpcNetwork: z.string(),
  }).optional(),
  linkedProducerVpcNetwork: z.object({
    excludeExportRanges: z.array(z.string()),
    includeExportRanges: z.array(z.string()),
    network: z.string(),
    peering: z.string(),
    producerNetwork: z.string(),
    proposedExcludeExportRanges: z.array(z.string()),
    proposedIncludeExportRanges: z.array(z.string()),
    serviceConsumerVpcSpoke: z.string(),
  }).optional(),
  linkedRouterApplianceInstances: z.object({
    excludeExportRanges: z.array(z.string()),
    excludeImportRanges: z.array(z.string()),
    includeExportRanges: z.array(z.string()),
    includeImportRanges: z.array(z.string()),
    instances: z.array(z.object({
      ipAddress: z.string(),
      virtualMachine: z.string(),
    })),
    siteToSiteDataTransfer: z.boolean(),
    vpcNetwork: z.string(),
  }).optional(),
  linkedVpcNetwork: z.object({
    excludeExportRanges: z.array(z.string()),
    includeExportRanges: z.array(z.string()),
    producerVpcSpokes: z.array(z.string()),
    proposedExcludeExportRanges: z.array(z.string()),
    proposedIncludeExportRanges: z.array(z.string()),
    uri: z.string(),
  }).optional(),
  linkedVpnTunnels: z.object({
    excludeExportRanges: z.array(z.string()),
    excludeImportRanges: z.array(z.string()),
    includeExportRanges: z.array(z.string()),
    includeImportRanges: z.array(z.string()),
    siteToSiteDataTransfer: z.boolean(),
    uris: z.array(z.string()),
    vpcNetwork: z.string(),
  }).optional(),
  name: z.string(),
  reasons: z.array(z.object({
    code: z.string(),
    message: z.string(),
    userDetails: z.string(),
  })).optional(),
  spokeType: z.string().optional(),
  state: z.string().optional(),
  uniqueId: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "Optional. An optional description of the spoke.",
  ).optional(),
  fieldPathsPendingUpdate: z.array(z.string()).describe(
    "Optional. The list of fields waiting for hub administrator's approval.",
  ).optional(),
  gateway: z.object({
    capacity: z.enum([
      "GATEWAY_CAPACITY_UNSPECIFIED",
      "CAPACITY_1_GBPS",
      "CAPACITY_10_GBPS",
    ]).describe("Optional. The aggregate processing capacity of this gateway.")
      .optional(),
    cloudRouters: z.array(z.string()).describe(
      "Output only. The list of Cloud Routers that are connected to this gateway. Should be in the form: https://www.googleapis.com/compute/v1/projects/{project}/regions/{region}/routers/{router}",
    ).optional(),
    ipRangeReservations: z.array(z.object({
      ipRange: z.string().describe(
        'Required. A block of IP addresses used to allocate supporting infrastructure for this gateway. This block must not overlap with subnets in any spokes or peer VPC networks that the gateway can communicate with. Example: "10.1.2.0/24"',
      ).optional(),
    })).describe(
      "Optional. A list of IP ranges that are reserved for this gateway's internal intfrastructure.",
    ).optional(),
    sacAttachment: z.string().describe(
      "Output only. The URI of the connected SACAttachment. Should be in the form: projects/{project}/locations/{location}/sacAttachments/{sac_attachment}",
    ).optional(),
  }).describe("A gateway that can apply specialized traffic processing.")
    .optional(),
  group: z.string().describe(
    "Optional. The name of the group that this spoke is associated with.",
  ).optional(),
  hub: z.string().describe(
    "Immutable. The name of the hub that this spoke is attached to.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional labels in key-value pair format. For more information about labels, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements).",
  ).optional(),
  linkedInterconnectAttachments: z.object({
    excludeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes overlapped/encompassed by exclude export ranges are excluded during export to hub.",
    ).optional(),
    excludeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes overlapped/encompassed by exclude import ranges are excluded during import from hub.",
    ).optional(),
    includeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes fully encompassed by include export ranges are included during export to hub.",
    ).optional(),
    includeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes fully encompassed by include import ranges are included during import from hub.",
    ).optional(),
    siteToSiteDataTransfer: z.boolean().describe(
      "A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations).",
    ).optional(),
    uris: z.array(z.string()).describe(
      "The URIs of linked interconnect attachment resources",
    ).optional(),
    vpcNetwork: z.string().describe(
      "Output only. The VPC network where these VLAN attachments are located.",
    ).optional(),
  }).describe(
    "A collection of VLAN attachment resources. These resources should be redundant attachments that all advertise the same prefixes to Google Cloud. Alternatively, in active/passive configurations, all attachments should be capable of advertising the same prefixes.",
  ).optional(),
  linkedProducerVpcNetwork: z.object({
    excludeExportRanges: z.array(z.string()).describe(
      "Optional. IP ranges encompassing the subnets to be excluded from peering.",
    ).optional(),
    includeExportRanges: z.array(z.string()).describe(
      "Optional. IP ranges allowed to be included from peering.",
    ).optional(),
    network: z.string().describe(
      "Immutable. The URI of the Service Consumer VPC that the Producer VPC is peered with.",
    ).optional(),
    peering: z.string().describe(
      "Immutable. The name of the VPC peering between the Service Consumer VPC and the Producer VPC (defined in the Tenant project) which is added to the NCC hub. This peering must be in ACTIVE state.",
    ).optional(),
    producerNetwork: z.string().describe(
      "Output only. The URI of the Producer VPC.",
    ).optional(),
    proposedExcludeExportRanges: z.array(z.string()).describe(
      "Output only. The proposed exclude export IP ranges waiting for hub administrator's approval.",
    ).optional(),
    proposedIncludeExportRanges: z.array(z.string()).describe(
      "Output only. The proposed include export IP ranges waiting for hub administrator's approval.",
    ).optional(),
    serviceConsumerVpcSpoke: z.string().describe(
      "Output only. The Service Consumer Network spoke.",
    ).optional(),
  }).optional(),
  linkedRouterApplianceInstances: z.object({
    excludeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes overlapped/encompassed by exclude export ranges are excluded during export to hub.",
    ).optional(),
    excludeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes overlapped/encompassed by exclude import ranges are excluded during import from hub.",
    ).optional(),
    includeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes fully encompassed by include export ranges are included during export to hub.",
    ).optional(),
    includeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes fully encompassed by include import ranges are included during import from hub.",
    ).optional(),
    instances: z.array(z.object({
      ipAddress: z.string().describe(
        "The IP address on the VM to use for peering.",
      ).optional(),
      virtualMachine: z.string().describe("The URI of the VM.").optional(),
    })).describe("The list of router appliance instances.").optional(),
    siteToSiteDataTransfer: z.boolean().describe(
      "A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations).",
    ).optional(),
    vpcNetwork: z.string().describe(
      "Output only. The VPC network where these router appliance instances are located.",
    ).optional(),
  }).describe(
    "A collection of router appliance instances. If you configure multiple router appliance instances to receive data from the same set of sites outside of Google Cloud, we recommend that you associate those instances with the same spoke.",
  ).optional(),
  linkedVpcNetwork: z.object({
    excludeExportRanges: z.array(z.string()).describe(
      "Optional. IP ranges encompassing the subnets to be excluded from peering.",
    ).optional(),
    includeExportRanges: z.array(z.string()).describe(
      "Optional. IP ranges allowed to be included from peering.",
    ).optional(),
    producerVpcSpokes: z.array(z.string()).describe(
      "Output only. The list of Producer VPC spokes that this VPC spoke is a service consumer VPC spoke for. These producer VPCs are connected through VPC peering to this spoke's backing VPC network. Because they are directly connected through VPC peering, NCC export filters do not apply between the service consumer VPC spoke and any of its producer VPC spokes. This VPC spoke cannot be deleted as long as any of these producer VPC spokes are connected to the NCC Hub.",
    ).optional(),
    proposedExcludeExportRanges: z.array(z.string()).describe(
      "Output only. The proposed exclude export IP ranges waiting for hub administrator's approval.",
    ).optional(),
    proposedIncludeExportRanges: z.array(z.string()).describe(
      "Output only. The proposed include export IP ranges waiting for hub administrator's approval.",
    ).optional(),
    uri: z.string().describe("Required. The URI of the VPC network resource.")
      .optional(),
  }).describe("An existing VPC network.").optional(),
  linkedVpnTunnels: z.object({
    excludeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes overlapped/encompassed by exclude export ranges are excluded during export to hub.",
    ).optional(),
    excludeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes overlapped/encompassed by exclude import ranges are excluded during import from hub.",
    ).optional(),
    includeExportRanges: z.array(z.string()).describe(
      "Optional. Dynamic routes fully encompassed by include export ranges are included during export to hub.",
    ).optional(),
    includeImportRanges: z.array(z.string()).describe(
      "Optional. Hub routes fully encompassed by include import ranges are included during import from hub.",
    ).optional(),
    siteToSiteDataTransfer: z.boolean().describe(
      "A value that controls whether site-to-site data transfer is enabled for these resources. Data transfer is available only in [supported locations](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/locations).",
    ).optional(),
    uris: z.array(z.string()).describe(
      "The URIs of linked VPN tunnel resources.",
    ).optional(),
    vpcNetwork: z.string().describe(
      "Output only. The VPC network where these VPN tunnels are located.",
    ).optional(),
  }).describe(
    "A collection of Cloud VPN tunnel resources. These resources should be redundant HA VPN tunnels that all advertise the same prefixes to Google Cloud. Alternatively, in a passive/active configuration, all tunnels should be capable of advertising the same prefixes.",
  ).optional(),
  name: z.string().describe(
    "Immutable. The name of the spoke. Spoke names must be unique. They use the following form: `projects/{project_number}/locations/{region}/spokes/{spoke_id}`",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  spokeId: z.string().describe("Required. Unique id for the spoke to create.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Connectivity Spokes. Registered at `@swamp/gcp/networkconnectivity/spokes`. */
export const model = {
  type: "@swamp/gcp/networkconnectivity/spokes",
  version: "2026.05.18.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Added: gateway",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Network Connectivity Center spoke represents one or more network connectivi...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a spokes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fieldPathsPendingUpdate"] !== undefined) {
          body["fieldPathsPendingUpdate"] = g["fieldPathsPendingUpdate"];
        }
        if (g["gateway"] !== undefined) body["gateway"] = g["gateway"];
        if (g["group"] !== undefined) body["group"] = g["group"];
        if (g["hub"] !== undefined) body["hub"] = g["hub"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["linkedInterconnectAttachments"] !== undefined) {
          body["linkedInterconnectAttachments"] =
            g["linkedInterconnectAttachments"];
        }
        if (g["linkedProducerVpcNetwork"] !== undefined) {
          body["linkedProducerVpcNetwork"] = g["linkedProducerVpcNetwork"];
        }
        if (g["linkedRouterApplianceInstances"] !== undefined) {
          body["linkedRouterApplianceInstances"] =
            g["linkedRouterApplianceInstances"];
        }
        if (g["linkedVpcNetwork"] !== undefined) {
          body["linkedVpcNetwork"] = g["linkedVpcNetwork"];
        }
        if (g["linkedVpnTunnels"] !== undefined) {
          body["linkedVpnTunnels"] = g["linkedVpnTunnels"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["spokeId"] !== undefined) body["spokeId"] = g["spokeId"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a spokes",
      arguments: z.object({
        identifier: z.string().describe("The name of the spokes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update spokes attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fieldPathsPendingUpdate"] !== undefined) {
          body["fieldPathsPendingUpdate"] = g["fieldPathsPendingUpdate"];
        }
        if (g["gateway"] !== undefined) body["gateway"] = g["gateway"];
        if (g["group"] !== undefined) body["group"] = g["group"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["linkedInterconnectAttachments"] !== undefined) {
          body["linkedInterconnectAttachments"] =
            g["linkedInterconnectAttachments"];
        }
        if (g["linkedProducerVpcNetwork"] !== undefined) {
          body["linkedProducerVpcNetwork"] = g["linkedProducerVpcNetwork"];
        }
        if (g["linkedRouterApplianceInstances"] !== undefined) {
          body["linkedRouterApplianceInstances"] =
            g["linkedRouterApplianceInstances"];
        }
        if (g["linkedVpcNetwork"] !== undefined) {
          body["linkedVpcNetwork"] = g["linkedVpcNetwork"];
        }
        if (g["linkedVpnTunnels"] !== undefined) {
          body["linkedVpnTunnels"] = g["linkedVpnTunnels"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the spokes",
      arguments: z.object({
        identifier: z.string().describe("The name of the spokes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Sync spokes state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            String(g["parent"] ?? ""),
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
  },
};
