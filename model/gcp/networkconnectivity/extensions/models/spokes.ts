// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const LIST_CONFIG = {
  "id": "networkconnectivity.projects.locations.spokes.list",
  "path": "v1/{+parent}/spokes",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
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
  }).describe(
    "Optional. This is a gateway that can apply specialized processing to traffic going through it.",
  ).optional(),
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
  }).describe("Optional. VLAN attachments that are associated with the spoke.")
    .optional(),
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
  }).describe(
    "Optional. The linked producer VPC that is associated with the spoke.",
  ).optional(),
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
    "Optional. Router appliance instances that are associated with the spoke.",
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
  }).describe("Optional. VPC network that is associated with the spoke.")
    .optional(),
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
  }).describe("Optional. VPN tunnels that are associated with the spoke.")
    .optional(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
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
  }).describe(
    "Optional. This is a gateway that can apply specialized processing to traffic going through it.",
  ).optional(),
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
  }).describe("Optional. VLAN attachments that are associated with the spoke.")
    .optional(),
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
  }).describe(
    "Optional. The linked producer VPC that is associated with the spoke.",
  ).optional(),
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
    "Optional. Router appliance instances that are associated with the spoke.",
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
  }).describe("Optional. VPC network that is associated with the spoke.")
    .optional(),
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
  }).describe("Optional. VPN tunnels that are associated with the spoke.")
    .optional(),
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

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Network Connectivity Spokes. Registered at `@swamp/gcp/networkconnectivity/spokes`. */
export const model = {
  type: "@swamp/gcp/networkconnectivity/spokes",
  version: "2026.10.03.1",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
      description: "Added: gateway",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.20.1",
      description: "Added: gateway",
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
      toVersion: "2026.05.26.1",
      description: "Added: gateway",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.2",
      description: "Added: gateway",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.4",
      description: "Added: gateway",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.2",
      description:
        "Removed: capacity, cloudRouters, ipRangeReservations, ipRange, sacAttachment, excludeExportRanges, excludeImportRanges, includeExportRanges, includeImportRanges, siteToSiteDataTransfer, uris, vpcNetwork, excludeExportRanges, includeExportRanges, network, peering, producerNetwork, proposedExcludeExportRanges, proposedIncludeExportRanges, serviceConsumerVpcSpoke, excludeExportRanges, excludeImportRanges, includeExportRanges, includeImportRanges, instances, ipAddress, virtualMachine, siteToSiteDataTransfer, vpcNetwork, excludeExportRanges, includeExportRanges, producerVpcSpokes, proposedExcludeExportRanges, proposedIncludeExportRanges, uri, excludeExportRanges, excludeImportRanges, includeExportRanges, includeImportRanges, siteToSiteDataTransfer, uris, vpcNetwork",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          capacity: _capacity,
          cloudRouters: _cloudRouters,
          ipRangeReservations: _ipRangeReservations,
          ipRange: _ipRange,
          sacAttachment: _sacAttachment,
          excludeExportRanges: _excludeExportRanges,
          excludeImportRanges: _excludeImportRanges,
          includeExportRanges: _includeExportRanges,
          includeImportRanges: _includeImportRanges,
          siteToSiteDataTransfer: _siteToSiteDataTransfer,
          uris: _uris,
          vpcNetwork: _vpcNetwork,
          network: _network,
          peering: _peering,
          producerNetwork: _producerNetwork,
          proposedExcludeExportRanges: _proposedExcludeExportRanges,
          proposedIncludeExportRanges: _proposedIncludeExportRanges,
          serviceConsumerVpcSpoke: _serviceConsumerVpcSpoke,
          instances: _instances,
          ipAddress: _ipAddress,
          virtualMachine: _virtualMachine,
          producerVpcSpokes: _producerVpcSpokes,
          uri: _uri,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.10.02.1",
      description: "Removed: fieldPathsPendingUpdate",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { fieldPathsPendingUpdate: _fieldPathsPendingUpdate, ...rest } =
          old;
        return rest;
      },
    },
    {
      toVersion: "2026.10.03.1",
      description: "Added: fieldPathsPendingUpdate",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
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
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["spokeId"] !== undefined) {
          params["spokeId"] = String(g["spokeId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
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
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
        identifier: z.string().describe(
          "Target a specific spokes by name (e.g. one discovered by list)",
        ).optional(),
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string; waitForReady?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
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
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
    delete: {
      description: "Delete the spokes",
      arguments: z.object({
        identifier: z.string().describe("The name of the spokes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
          DELETE_CONFIG,
          params,
          credentials,
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific spokes by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
    list: {
      description: "List spokes resources",
      arguments: z.object({
        filter: z.string().describe(
          "An expression that filters the list of results.",
        ).optional(),
        orderBy: z.string().describe("Sort the results by a certain order.")
          .optional(),
        pageSize: z.number().describe(
          "The maximum number of results to return per page.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "spokes",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options_requestedPolicyVersion: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["options_requestedPolicyVersion"] !== undefined) {
          params["options.requestedPolicyVersion"] = String(
            args["options_requestedPolicyVersion"],
          );
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "networkconnectivity.projects.locations.spokes.getIamPolicy",
            "path": "v1/{+resource}:getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["resource"],
            "parameters": {
              "options.requestedPolicyVersion": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "networkconnectivity.projects.locations.spokes.setIamPolicy",
            "path": "v1/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "networkconnectivity.projects.locations.spokes.testIamPermissions",
            "path": "v1/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
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
