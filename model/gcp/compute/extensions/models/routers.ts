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

// Auto-generated extension model for @swamp/gcp/compute/routers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Routers.
 *
 * Represents a Cloud Router resource. For more information about Cloud Router, read theCloud Router overview.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.routers.get",
  "path": "projects/{project}/regions/{region}/routers/{router}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "router",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "router": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.routers.insert",
  "path": "projects/{project}/regions/{region}/routers",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.routers.update",
  "path": "projects/{project}/regions/{region}/routers/{router}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "region",
    "router",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "router": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.routers.delete",
  "path": "projects/{project}/regions/{region}/routers/{router}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "router",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "router": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.routers.list",
  "path": "projects/{project}/regions/{region}/routers",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
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
  bgp: z.object({
    advertiseMode: z.enum(["CUSTOM", "DEFAULT"]).describe(
      "User-specified flag to indicate which mode to use for advertisement. The options are DEFAULT or CUSTOM.",
    ).optional(),
    advertisedGroups: z.array(z.enum(["ALL_SUBNETS"])).describe(
      "User-specified list of prefix groups to advertise in custom mode. This field can only be populated if advertise_mode is CUSTOM and is advertised to all peers of the router. These groups will be advertised in addition to any specified prefixes. Leave this field blank to advertise no custom groups.",
    ).optional(),
    advertisedIpRanges: z.array(z.object({
      description: z.string().describe(
        "User-specified description for the IP range.",
      ).optional(),
      range: z.string().describe(
        "The IP range to advertise. The value must be a CIDR-formatted string.",
      ).optional(),
    })).describe(
      "User-specified list of individual IP ranges to advertise in custom mode. This field can only be populated if advertise_mode is CUSTOM and is advertised to all peers of the router. These IP ranges will be advertised in addition to any specified groups. Leave this field blank to advertise no custom IP ranges.",
    ).optional(),
    asn: z.number().int().describe(
      "Local BGP Autonomous System Number (ASN). Must be anRFC6996 private ASN, either 16-bit or 32-bit. The value will be fixed for this router resource. All VPN tunnels that link to this router will have the same local ASN.",
    ).optional(),
    identifierRange: z.string().describe(
      'Explicitly specifies a range of valid BGP Identifiers for this Router. It is provided as a link-local IPv4 range (from 169.254.0.0/16), of size at least /30, even if the BGP sessions are over IPv6. It must not overlap with any IPv4 BGP session ranges. Other vendors commonly call this "router ID".',
    ).optional(),
    keepaliveInterval: z.number().int().describe(
      "The interval in seconds between BGP keepalive messages that are sent to the peer. Hold time is three times the interval at which keepalive messages are sent, and the hold time is the maximum number of seconds allowed to elapse between successive keepalive messages that BGP receives from a peer. BGP will use the smaller of either the local hold time value or the peer's hold time value as the hold time for the BGP connection between the two peers. If set, this value must be between 20 and 60. The default is 20.",
    ).optional(),
  }).optional(),
  bgpPeers: z.array(z.object({
    advertiseMode: z.enum(["CUSTOM", "DEFAULT"]).describe(
      "User-specified flag to indicate which mode to use for advertisement.",
    ).optional(),
    advertisedGroups: z.array(z.enum(["ALL_SUBNETS"])).describe(
      'User-specified list of prefix groups to advertise in custom mode, which currently supports the following option: - ALL_SUBNETS: Advertises all of the router\'s own VPC subnets. This excludes any routes learned for subnets that use VPC Network Peering. Note that this field can only be populated if advertise_mode is CUSTOM and overrides the list defined for the router (in the "bgp" message). These groups are advertised in addition to any specified prefixes. Leave this field blank to advertise no custom groups.',
    ).optional(),
    advertisedIpRanges: z.array(z.object({
      description: z.string().describe(
        "User-specified description for the IP range.",
      ).optional(),
      range: z.string().describe(
        "The IP range to advertise. The value must be a CIDR-formatted string.",
      ).optional(),
    })).describe(
      'User-specified list of individual IP ranges to advertise in custom mode. This field can only be populated if advertise_mode is CUSTOM and overrides the list defined for the router (in the "bgp" message). These IP ranges are advertised in addition to any specified groups. Leave this field blank to advertise no custom IP ranges.',
    ).optional(),
    advertisedRoutePriority: z.number().int().describe(
      "The priority of routes advertised to this BGP peer. Where there is more than one matching route of maximum length, the routes with the lowest priority value win.",
    ).optional(),
    bfd: z.object({
      minReceiveInterval: z.number().int().describe(
        "The minimum interval, in milliseconds, between BFD control packets received from the peer router. The actual value is negotiated between the two routers and is equal to the greater of this value and the transmit interval of the other router. If set, this value must be between 1000 and 30000. The default is 1000.",
      ).optional(),
      minTransmitInterval: z.number().int().describe(
        "The minimum interval, in milliseconds, between BFD control packets transmitted to the peer router. The actual value is negotiated between the two routers and is equal to the greater of this value and the corresponding receive interval of the other router. If set, this value must be between 1000 and 30000. The default is 1000.",
      ).optional(),
      multiplier: z.number().int().describe(
        "The number of consecutive BFD packets that must be missed before BFD declares that a peer is unavailable. If set, the value must be a value between 5 and 16. The default is 5.",
      ).optional(),
      sessionInitializationMode: z.enum(["ACTIVE", "DISABLED", "PASSIVE"])
        .describe(
          "The BFD session initialization mode for this BGP peer. If set to ACTIVE, the Cloud Router will initiate the BFD session for this BGP peer. If set to PASSIVE, the Cloud Router will wait for the peer router to initiate the BFD session for this BGP peer. If set to DISABLED, BFD is disabled for this BGP peer. The default is DISABLED.",
        ).optional(),
    }).optional(),
    customLearnedIpRanges: z.array(z.object({
      range: z.string().describe(
        "The custom learned route IP address range. Must be a valid CIDR-formatted prefix. If an IP address is provided without a subnet mask, it is interpreted as, for IPv4, a `/32` singular IP address range, and, for IPv6, `/128`.",
      ).optional(),
    })).describe(
      "A list of user-defined custom learned route IP address ranges for a BGP session.",
    ).optional(),
    customLearnedRoutePriority: z.number().int().describe(
      "The user-defined custom learned route priority for a BGP session. This value is applied to all custom learned route ranges for the session. You can choose a value from `0` to `65335`. If you don't provide a value, Google Cloud assigns a priority of `100` to the ranges.",
    ).optional(),
    enable: z.enum(["FALSE", "TRUE"]).describe(
      "The status of the BGP peer connection. If set to FALSE, any active session with the peer is terminated and all associated routing information is removed. If set to TRUE, the peer connection can be established with routing information. The default is TRUE.",
    ).optional(),
    enableIpv4: z.boolean().describe(
      "Enable IPv4 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 4.",
    ).optional(),
    enableIpv6: z.boolean().describe(
      "Enable IPv6 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 6.",
    ).optional(),
    exportPolicies: z.array(z.string()).describe(
      "List of export policies applied to this peer, in the order they must be evaluated. The name must correspond to an existing policy that has ROUTE_POLICY_TYPE_EXPORT type.",
    ).optional(),
    importPolicies: z.array(z.string()).describe(
      "List of import policies applied to this peer, in the order they must be evaluated. The name must correspond to an existing policy that has ROUTE_POLICY_TYPE_IMPORT type.",
    ).optional(),
    interfaceName: z.string().describe(
      "Name of the interface the BGP peer is associated with.",
    ).optional(),
    ipAddress: z.string().describe(
      "IP address of the interface inside Google Cloud Platform.",
    ).optional(),
    ipv4NexthopAddress: z.string().describe(
      "IPv4 address of the interface inside Google Cloud Platform.",
    ).optional(),
    ipv6NexthopAddress: z.string().describe(
      "IPv6 address of the interface inside Google Cloud Platform.",
    ).optional(),
    managementType: z.enum(["MANAGED_BY_ATTACHMENT", "MANAGED_BY_USER"])
      .describe(
        "Output only. [Output Only] The resource that configures and manages this BGP peer. - MANAGED_BY_USER is the default value and can be managed by you or other users - MANAGED_BY_ATTACHMENT is a BGP peer that is configured and managed by Cloud Interconnect, specifically by an InterconnectAttachment of type PARTNER. Google automatically creates, updates, and deletes this type of BGP peer when the PARTNER InterconnectAttachment is created, updated, or deleted.",
      ).optional(),
    md5AuthenticationKeyName: z.string().describe(
      "Present if MD5 authentication is enabled for the peering. Must be the name of one of the entries in the Router.md5_authentication_keys. The field must comply with RFC1035.",
    ).optional(),
    name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
      .describe(
        "Name of this BGP peer. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
      ).optional(),
    peerAsn: z.number().int().describe(
      "Peer BGP Autonomous System Number (ASN). Each BGP interface may use a different value.",
    ).optional(),
    peerIpAddress: z.string().describe(
      "IP address of the BGP interface outside Google Cloud Platform.",
    ).optional(),
    peerIpv4NexthopAddress: z.string().describe(
      "IPv4 address of the BGP interface outside Google Cloud Platform.",
    ).optional(),
    peerIpv6NexthopAddress: z.string().describe(
      "IPv6 address of the BGP interface outside Google Cloud Platform.",
    ).optional(),
    routerApplianceInstance: z.string().describe(
      "URI of the VM instance that is used as third-party router appliances such as Next Gen Firewalls, Virtual Routers, or Router Appliances. The VM instance must be located in zones contained in the same region as this Cloud Router. The VM instance is the peer side of the BGP session.",
    ).optional(),
  })).describe(
    "BGP information that must be configured into the routing stack to establish BGP peering. This information must specify the peer ASN and either the interface name, IP address, or peer IP address. Please refer toRFC4273.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  encryptedInterconnectRouter: z.boolean().describe(
    "Indicates if a router is dedicated for use with encrypted VLAN attachments (interconnectAttachments).",
  ).optional(),
  interfaces: z.array(z.object({
    ipRange: z.string().describe(
      "IP address and range of the interface. - For Internet Protocol version 4 (IPv4), the IP range must be in theRFC3927 link-local IP address space. The value must be a CIDR-formatted string, for example, 169.254.0.1/30. Note: Do not truncate the IP address, as it represents the IP address of the interface. - For Internet Protocol version 6 (IPv6), the value must be a unique local address (ULA) range from fdff:1::/64 with a mask length of 126 or less. This value should be a CIDR-formatted string, for example, fdff:1::1/112. Within the router's VPC, this IPv6 prefix will be reserved exclusively for this connection and cannot be used for any other purpose.",
    ).optional(),
    ipVersion: z.enum(["IPV4", "IPV6"]).describe(
      "IP version of this interface.",
    ).optional(),
    linkedInterconnectAttachment: z.string().describe(
      "URI of the linked Interconnect attachment. It must be in the same region as the router. Each interface can have one linked resource, which can be a VPN tunnel, an Interconnect attachment, or a subnetwork.",
    ).optional(),
    linkedVpnTunnel: z.string().describe(
      "URI of the linked VPN tunnel, which must be in the same region as the router. Each interface can have one linked resource, which can be a VPN tunnel, an Interconnect attachment, or a subnetwork.",
    ).optional(),
    managementType: z.enum(["MANAGED_BY_ATTACHMENT", "MANAGED_BY_USER"])
      .describe(
        "Output only. [Output Only] The resource that configures and manages this interface. - MANAGED_BY_USER is the default value and can be managed directly by users. - MANAGED_BY_ATTACHMENT is an interface that is configured and managed by Cloud Interconnect, specifically, by an InterconnectAttachment of type PARTNER. Google automatically creates, updates, and deletes this type of interface when the PARTNER InterconnectAttachment is created, updated, or deleted.",
      ).optional(),
    name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
      .describe(
        "Name of this interface entry. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
      ).optional(),
    privateIpAddress: z.string().describe(
      "The regional private internal IP address that is used to establish BGP sessions to a VM instance acting as a third-party Router Appliance, such as a Next Gen Firewall, a Virtual Router, or an SD-WAN VM.",
    ).optional(),
    redundantInterface: z.string().regex(
      new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"),
    ).describe(
      "Name of the interface that will be redundant with the current interface you are creating. The redundantInterface must belong to the same Cloud Router as the interface here. To establish the BGP session to a Router Appliance VM, you must create two BGP peers. The two BGP peers must be attached to two separate interfaces that are redundant with each other. The redundant_interface must be 1-63 characters long, and comply withRFC1035. Specifically, the redundant_interface must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
    subnetwork: z.string().describe(
      "The URI of the subnetwork resource that this interface belongs to, which must be in the same region as the Cloud Router. When you establish a BGP session to a VM instance using this interface, the VM instance must belong to the same subnetwork as the subnetwork specified here.",
    ).optional(),
  })).describe(
    "Router interfaces. To create a BGP peer that uses a router interface, the interface must have one of the following fields specified: - linkedVpnTunnel - linkedInterconnectAttachment - subnetwork You can create a router interface without any of these fields specified. However, you cannot create a BGP peer that uses that interface.",
  ).optional(),
  md5AuthenticationKeys: z.array(z.object({
    key: z.string().describe(
      "[Input only] Value of the key. For patch and update calls, it can be skipped to copy the value from the previous configuration. This is allowed if the key with the same name existed before the operation. Maximum length is 80 characters. Can only contain printable ASCII characters.",
    ).optional(),
    name: z.string().describe(
      "Name used to identify the key. Must be unique within a router. Must be referenced by exactly one bgpPeer. Must comply withRFC1035.",
    ).optional(),
  })).describe("Keys used for MD5 authentication.").optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ),
  nats: z.array(z.object({
    autoNetworkTier: z.enum([
      "FIXED_STANDARD",
      "PREMIUM",
      "STANDARD",
      "STANDARD_OVERRIDES_FIXED_STANDARD",
    ]).describe(
      "The network tier to use when automatically reserving NAT IP addresses. Must be one of: PREMIUM, STANDARD. If not specified, then the current project-level default tier is used.",
    ).optional(),
    drainNatIps: z.array(z.string()).describe(
      "A list of URLs of the IP resources to be drained. These IPs must be valid static external IPs that have been assigned to the NAT. These IPs should be used for updating/patching a NAT only.",
    ).optional(),
    enableDynamicPortAllocation: z.boolean().describe(
      "Enable Dynamic Port Allocation. If not specified, it is disabled by default. If set to true, - Dynamic Port Allocation will be enabled on this NAT config. - enableEndpointIndependentMapping cannot be set to true. - If minPorts is set, minPortsPerVm must be set to a power of two greater than or equal to 32. If minPortsPerVm is not set, a minimum of 32 ports will be allocated to a VM from this NAT config.",
    ).optional(),
    enableEndpointIndependentMapping: z.boolean().optional(),
    endpointTypes: z.array(
      z.enum([
        "ENDPOINT_TYPE_MANAGED_PROXY_LB",
        "ENDPOINT_TYPE_SWG",
        "ENDPOINT_TYPE_VM",
      ]),
    ).describe(
      "List of NAT-ted endpoint types supported by the Nat Gateway. If the list is empty, then it will be equivalent to include ENDPOINT_TYPE_VM",
    ).optional(),
    icmpIdleTimeoutSec: z.number().int().describe(
      "Timeout (in seconds) for ICMP connections. Defaults to 30s if not set.",
    ).optional(),
    logConfig: z.object({
      enable: z.boolean().describe(
        "Indicates whether or not to export logs. This is false by default.",
      ).optional(),
      filter: z.enum(["ALL", "ERRORS_ONLY", "TRANSLATIONS_ONLY"]).describe(
        "Specify the desired filtering of logs on this NAT. If unspecified, logs are exported for all connections handled by this NAT. This option can take one of the following values: - ERRORS_ONLY: Export logs only for connection failures. - TRANSLATIONS_ONLY: Export logs only for successful connections. - ALL: Export logs for all connections, successful and unsuccessful.",
      ).optional(),
    }).describe("Configuration of logging on a NAT.").optional(),
    maxPortsPerVm: z.number().int().describe(
      "Maximum number of ports allocated to a VM from this NAT config when Dynamic Port Allocation is enabled. If Dynamic Port Allocation is not enabled, this field has no effect. If Dynamic Port Allocation is enabled, and this field is set, it must be set to a power of two greater than minPortsPerVm, or 64 if minPortsPerVm is not set. If Dynamic Port Allocation is enabled and this field is not set, a maximum of 65536 ports will be allocated to a VM from this NAT config.",
    ).optional(),
    minPortsPerVm: z.number().int().describe(
      "Minimum number of ports allocated to a VM from this NAT config. If not set, a default number of ports is allocated to a VM. This is rounded up to the nearest power of 2. For example, if the value of this field is 50, at least 64 ports are allocated to a VM.",
    ).optional(),
    name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
      .describe(
        "Unique name of this Nat service. The name must be 1-63 characters long and comply withRFC1035.",
      ).optional(),
    nat64Subnetworks: z.array(z.object({
      name: z.string().describe(
        "URL for the subnetwork resource that will use NAT64.",
      ).optional(),
    })).describe(
      "List of Subnetwork resources whose traffic should be translated by NAT64 Gateway. It is used only when LIST_OF_IPV6_SUBNETWORKS is selected for the SubnetworkIpRangeToNat64Option above.",
    ).optional(),
    natIpAllocateOption: z.enum(["AUTO_ONLY", "MANUAL_ONLY"]).describe(
      "Specify the NatIpAllocateOption, which can take one of the following values: - MANUAL_ONLY: Uses only Nat IP addresses provided by customers. When there are not enough specified Nat IPs, the Nat service fails for new VMs. - AUTO_ONLY: Nat IPs are allocated by Google Cloud Platform; customers can't specify any Nat IPs. When choosing AUTO_ONLY, then nat_ip should be empty.",
    ).optional(),
    natIps: z.array(z.string()).describe(
      "A list of URLs of the IP resources used for this Nat service. These IP addresses must be valid static external IP addresses assigned to the project.",
    ).optional(),
    rules: z.array(z.object({
      action: z.object({
        sourceNatActiveIps: z.unknown().describe(
          "A list of URLs of the IP resources used for this NAT rule. These IP addresses must be valid static external IP addresses assigned to the project. This field is used for public NAT.",
        ).optional(),
        sourceNatActiveRanges: z.unknown().describe(
          "A list of URLs of the subnetworks used as source ranges for this NAT Rule. These subnetworks must have purpose set to PRIVATE_NAT. This field is used for private NAT.",
        ).optional(),
        sourceNatDrainIps: z.unknown().describe(
          "A list of URLs of the IP resources to be drained. These IPs must be valid static external IPs that have been assigned to the NAT. These IPs should be used for updating/patching a NAT rule only. This field is used for public NAT.",
        ).optional(),
        sourceNatDrainRanges: z.unknown().describe(
          "A list of URLs of subnetworks representing source ranges to be drained. This is only supported on patch/update, and these subnetworks must have previously been used as active ranges in this NAT Rule. This field is used for private NAT.",
        ).optional(),
      }).optional(),
      description: z.string().describe("An optional description of this rule.")
        .optional(),
      match: z.string().describe(
        "CEL expression that specifies the match condition that egress traffic from a VM is evaluated against. If it evaluates to true, the corresponding `action` is enforced. The following examples are valid match expressions for public NAT: `inIpRange(destination.ip, '1.1.0.0/16') || inIpRange(destination.ip, '2.2.0.0/16')` `destination.ip == '1.1.0.1' || destination.ip == '8.8.8.8'` The following example is a valid match expression for private NAT: `nexthop.hub == '//networkconnectivity.googleapis.com/projects/my-project/locations/global/hubs/hub-1'`",
      ).optional(),
      ruleNumber: z.number().int().describe(
        "An integer uniquely identifying a rule in the list. The rule number must be a positive value between 0 and 65000, and must be unique among rules within a NAT.",
      ).optional(),
    })).describe("A list of rules associated with this NAT.").optional(),
    sourceSubnetworkIpRangesToNat: z.enum([
      "ALL_SUBNETWORKS_ALL_IP_RANGES",
      "ALL_SUBNETWORKS_ALL_PRIMARY_IP_RANGES",
      "LIST_OF_SUBNETWORKS",
    ]).describe(
      "Specify the Nat option, which can take one of the following values: - ALL_SUBNETWORKS_ALL_IP_RANGES: All of the IP ranges in every Subnetwork are allowed to Nat. - ALL_SUBNETWORKS_ALL_PRIMARY_IP_RANGES: All of the primary IP ranges in every Subnetwork are allowed to Nat. - LIST_OF_SUBNETWORKS: A list of Subnetworks are allowed to Nat (specified in the field subnetwork below) The default is SUBNETWORK_IP_RANGE_TO_NAT_OPTION_UNSPECIFIED. Note that if this field contains ALL_SUBNETWORKS_ALL_IP_RANGES then there should not be any other Router.Nat section in any Router for this network in this region.",
    ).optional(),
    sourceSubnetworkIpRangesToNat64: z.enum([
      "ALL_IPV6_SUBNETWORKS",
      "LIST_OF_IPV6_SUBNETWORKS",
    ]).describe(
      "Specify the Nat option for NAT64, which can take one of the following values: - ALL_IPV6_SUBNETWORKS: All of the IP ranges in every Subnetwork are allowed to Nat. - LIST_OF_IPV6_SUBNETWORKS: A list of Subnetworks are allowed to Nat (specified in the field nat64_subnetwork below) The default is NAT64_OPTION_UNSPECIFIED. Note that if this field contains NAT64_ALL_V6_SUBNETWORKS no other Router.Nat section in this region can also enable NAT64 for any Subnetworks in this network. Other Router.Nat sections can still be present to enable NAT44 only.",
    ).optional(),
    subnetworks: z.array(z.object({
      name: z.string().describe(
        "URL for the subnetwork resource that will use NAT.",
      ).optional(),
      secondaryIpRangeNames: z.array(z.unknown()).describe(
        'A list of the secondary ranges of the Subnetwork that are allowed to use NAT. This can be populated only if "LIST_OF_SECONDARY_IP_RANGES" is one of the values in source_ip_ranges_to_nat.',
      ).optional(),
      sourceIpRangesToNat: z.array(z.unknown()).describe(
        'Specify the options for NAT ranges in the Subnetwork. All options of a single value are valid except NAT_IP_RANGE_OPTION_UNSPECIFIED. The only valid option with multiple values is: ["PRIMARY_IP_RANGE", "LIST_OF_SECONDARY_IP_RANGES"] Default: [ALL_IP_RANGES]',
      ).optional(),
    })).describe(
      "A list of Subnetwork resources whose traffic should be translated by NAT Gateway. It is used only when LIST_OF_SUBNETWORKS is selected for the SubnetworkIpRangeToNatOption above.",
    ).optional(),
    tcpEstablishedIdleTimeoutSec: z.number().int().describe(
      "Timeout (in seconds) for TCP established connections. Defaults to 1200s if not set.",
    ).optional(),
    tcpTimeWaitTimeoutSec: z.number().int().describe(
      "Timeout (in seconds) for TCP connections that are in TIME_WAIT state. Defaults to 120s if not set.",
    ).optional(),
    tcpTransitoryIdleTimeoutSec: z.number().int().describe(
      "Timeout (in seconds) for TCP transitory connections. Defaults to 30s if not set.",
    ).optional(),
    type: z.enum(["PRIVATE", "PUBLIC"]).describe(
      "Indicates whether this NAT is used for public or private IP translation. If unspecified, it defaults to PUBLIC.",
    ).optional(),
    udpIdleTimeoutSec: z.number().int().describe(
      "Timeout (in seconds) for UDP connections. Defaults to 30s if not set.",
    ).optional(),
  })).describe("A list of NAT services created in this router.").optional(),
  nccGateway: z.string().describe(
    "URI of the ncc_gateway to which this router associated.",
  ).optional(),
  network: z.string().describe(
    "URI of the network to which this router belongs.",
  ),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid. * Inconsistent format is not supported. For instance: {"tagKeys/333": "tagValues/444", "123/env": "prod"} is invalid.',
    ).optional(),
  }).describe("Additional router parameters.").optional(),
  region: z.string().describe(
    "[Output Only] URI of the region where the router resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  bgp: z.object({
    advertiseMode: z.string(),
    advertisedGroups: z.array(z.string()),
    advertisedIpRanges: z.array(z.object({
      description: z.string(),
      range: z.string(),
    })),
    asn: z.number(),
    identifierRange: z.string(),
    keepaliveInterval: z.number(),
  }).optional(),
  bgpPeers: z.array(z.object({
    advertiseMode: z.string(),
    advertisedGroups: z.array(z.string()),
    advertisedIpRanges: z.array(z.object({
      description: z.string(),
      range: z.string(),
    })),
    advertisedRoutePriority: z.number(),
    bfd: z.object({
      minReceiveInterval: z.number(),
      minTransmitInterval: z.number(),
      multiplier: z.number(),
      sessionInitializationMode: z.string(),
    }),
    customLearnedIpRanges: z.array(z.object({
      range: z.string(),
    })),
    customLearnedRoutePriority: z.number(),
    enable: z.string(),
    enableIpv4: z.boolean(),
    enableIpv6: z.boolean(),
    exportPolicies: z.array(z.string()),
    importPolicies: z.array(z.string()),
    interfaceName: z.string(),
    ipAddress: z.string(),
    ipv4NexthopAddress: z.string(),
    ipv6NexthopAddress: z.string(),
    managementType: z.string(),
    md5AuthenticationKeyName: z.string(),
    name: z.string(),
    peerAsn: z.number(),
    peerIpAddress: z.string(),
    peerIpv4NexthopAddress: z.string(),
    peerIpv6NexthopAddress: z.string(),
    routerApplianceInstance: z.string(),
  })).optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  encryptedInterconnectRouter: z.boolean().optional(),
  id: z.string().optional(),
  interfaces: z.array(z.object({
    ipRange: z.string(),
    ipVersion: z.string(),
    linkedInterconnectAttachment: z.string(),
    linkedVpnTunnel: z.string(),
    managementType: z.string(),
    name: z.string(),
    privateIpAddress: z.string(),
    redundantInterface: z.string(),
    subnetwork: z.string(),
  })).optional(),
  kind: z.string().optional(),
  md5AuthenticationKeys: z.array(z.object({
    key: z.string(),
    name: z.string(),
  })).optional(),
  name: z.string(),
  nats: z.array(z.object({
    autoNetworkTier: z.string(),
    drainNatIps: z.array(z.string()),
    enableDynamicPortAllocation: z.boolean(),
    enableEndpointIndependentMapping: z.boolean(),
    endpointTypes: z.array(z.string()),
    icmpIdleTimeoutSec: z.number(),
    logConfig: z.object({
      enable: z.boolean(),
      filter: z.string(),
    }),
    maxPortsPerVm: z.number(),
    minPortsPerVm: z.number(),
    name: z.string(),
    nat64Subnetworks: z.array(z.object({
      name: z.string(),
    })),
    natIpAllocateOption: z.string(),
    natIps: z.array(z.string()),
    rules: z.array(z.object({
      action: z.object({
        sourceNatActiveIps: z.unknown(),
        sourceNatActiveRanges: z.unknown(),
        sourceNatDrainIps: z.unknown(),
        sourceNatDrainRanges: z.unknown(),
      }),
      description: z.string(),
      match: z.string(),
      ruleNumber: z.number(),
    })),
    sourceSubnetworkIpRangesToNat: z.string(),
    sourceSubnetworkIpRangesToNat64: z.string(),
    subnetworks: z.array(z.object({
      name: z.string(),
      secondaryIpRangeNames: z.array(z.unknown()),
      sourceIpRangesToNat: z.array(z.unknown()),
    })),
    tcpEstablishedIdleTimeoutSec: z.number(),
    tcpTimeWaitTimeoutSec: z.number(),
    tcpTransitoryIdleTimeoutSec: z.number(),
    type: z.string(),
    udpIdleTimeoutSec: z.number(),
  })).optional(),
  nccGateway: z.string().optional(),
  network: z.string().optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  bgp: z.object({
    advertiseMode: z.enum(["CUSTOM", "DEFAULT"]).describe(
      "User-specified flag to indicate which mode to use for advertisement. The options are DEFAULT or CUSTOM.",
    ).optional(),
    advertisedGroups: z.array(z.enum(["ALL_SUBNETS"])).describe(
      "User-specified list of prefix groups to advertise in custom mode. This field can only be populated if advertise_mode is CUSTOM and is advertised to all peers of the router. These groups will be advertised in addition to any specified prefixes. Leave this field blank to advertise no custom groups.",
    ).optional(),
    advertisedIpRanges: z.array(z.object({
      description: z.string().describe(
        "User-specified description for the IP range.",
      ).optional(),
      range: z.string().describe(
        "The IP range to advertise. The value must be a CIDR-formatted string.",
      ).optional(),
    })).describe(
      "User-specified list of individual IP ranges to advertise in custom mode. This field can only be populated if advertise_mode is CUSTOM and is advertised to all peers of the router. These IP ranges will be advertised in addition to any specified groups. Leave this field blank to advertise no custom IP ranges.",
    ).optional(),
    asn: z.number().int().describe(
      "Local BGP Autonomous System Number (ASN). Must be anRFC6996 private ASN, either 16-bit or 32-bit. The value will be fixed for this router resource. All VPN tunnels that link to this router will have the same local ASN.",
    ).optional(),
    identifierRange: z.string().describe(
      'Explicitly specifies a range of valid BGP Identifiers for this Router. It is provided as a link-local IPv4 range (from 169.254.0.0/16), of size at least /30, even if the BGP sessions are over IPv6. It must not overlap with any IPv4 BGP session ranges. Other vendors commonly call this "router ID".',
    ).optional(),
    keepaliveInterval: z.number().int().describe(
      "The interval in seconds between BGP keepalive messages that are sent to the peer. Hold time is three times the interval at which keepalive messages are sent, and the hold time is the maximum number of seconds allowed to elapse between successive keepalive messages that BGP receives from a peer. BGP will use the smaller of either the local hold time value or the peer's hold time value as the hold time for the BGP connection between the two peers. If set, this value must be between 20 and 60. The default is 20.",
    ).optional(),
  }).optional(),
  bgpPeers: z.array(z.object({
    advertiseMode: z.enum(["CUSTOM", "DEFAULT"]).describe(
      "User-specified flag to indicate which mode to use for advertisement.",
    ).optional(),
    advertisedGroups: z.array(z.enum(["ALL_SUBNETS"])).describe(
      'User-specified list of prefix groups to advertise in custom mode, which currently supports the following option: - ALL_SUBNETS: Advertises all of the router\'s own VPC subnets. This excludes any routes learned for subnets that use VPC Network Peering. Note that this field can only be populated if advertise_mode is CUSTOM and overrides the list defined for the router (in the "bgp" message). These groups are advertised in addition to any specified prefixes. Leave this field blank to advertise no custom groups.',
    ).optional(),
    advertisedIpRanges: z.array(z.object({
      description: z.string().describe(
        "User-specified description for the IP range.",
      ).optional(),
      range: z.string().describe(
        "The IP range to advertise. The value must be a CIDR-formatted string.",
      ).optional(),
    })).describe(
      'User-specified list of individual IP ranges to advertise in custom mode. This field can only be populated if advertise_mode is CUSTOM and overrides the list defined for the router (in the "bgp" message). These IP ranges are advertised in addition to any specified groups. Leave this field blank to advertise no custom IP ranges.',
    ).optional(),
    advertisedRoutePriority: z.number().int().describe(
      "The priority of routes advertised to this BGP peer. Where there is more than one matching route of maximum length, the routes with the lowest priority value win.",
    ).optional(),
    bfd: z.object({
      minReceiveInterval: z.number().int().describe(
        "The minimum interval, in milliseconds, between BFD control packets received from the peer router. The actual value is negotiated between the two routers and is equal to the greater of this value and the transmit interval of the other router. If set, this value must be between 1000 and 30000. The default is 1000.",
      ).optional(),
      minTransmitInterval: z.number().int().describe(
        "The minimum interval, in milliseconds, between BFD control packets transmitted to the peer router. The actual value is negotiated between the two routers and is equal to the greater of this value and the corresponding receive interval of the other router. If set, this value must be between 1000 and 30000. The default is 1000.",
      ).optional(),
      multiplier: z.number().int().describe(
        "The number of consecutive BFD packets that must be missed before BFD declares that a peer is unavailable. If set, the value must be a value between 5 and 16. The default is 5.",
      ).optional(),
      sessionInitializationMode: z.enum(["ACTIVE", "DISABLED", "PASSIVE"])
        .describe(
          "The BFD session initialization mode for this BGP peer. If set to ACTIVE, the Cloud Router will initiate the BFD session for this BGP peer. If set to PASSIVE, the Cloud Router will wait for the peer router to initiate the BFD session for this BGP peer. If set to DISABLED, BFD is disabled for this BGP peer. The default is DISABLED.",
        ).optional(),
    }).optional(),
    customLearnedIpRanges: z.array(z.object({
      range: z.string().describe(
        "The custom learned route IP address range. Must be a valid CIDR-formatted prefix. If an IP address is provided without a subnet mask, it is interpreted as, for IPv4, a `/32` singular IP address range, and, for IPv6, `/128`.",
      ).optional(),
    })).describe(
      "A list of user-defined custom learned route IP address ranges for a BGP session.",
    ).optional(),
    customLearnedRoutePriority: z.number().int().describe(
      "The user-defined custom learned route priority for a BGP session. This value is applied to all custom learned route ranges for the session. You can choose a value from `0` to `65335`. If you don't provide a value, Google Cloud assigns a priority of `100` to the ranges.",
    ).optional(),
    enable: z.enum(["FALSE", "TRUE"]).describe(
      "The status of the BGP peer connection. If set to FALSE, any active session with the peer is terminated and all associated routing information is removed. If set to TRUE, the peer connection can be established with routing information. The default is TRUE.",
    ).optional(),
    enableIpv4: z.boolean().describe(
      "Enable IPv4 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 4.",
    ).optional(),
    enableIpv6: z.boolean().describe(
      "Enable IPv6 traffic over BGP Peer. It is enabled by default if the peerIpAddress is version 6.",
    ).optional(),
    exportPolicies: z.array(z.string()).describe(
      "List of export policies applied to this peer, in the order they must be evaluated. The name must correspond to an existing policy that has ROUTE_POLICY_TYPE_EXPORT type.",
    ).optional(),
    importPolicies: z.array(z.string()).describe(
      "List of import policies applied to this peer, in the order they must be evaluated. The name must correspond to an existing policy that has ROUTE_POLICY_TYPE_IMPORT type.",
    ).optional(),
    interfaceName: z.string().describe(
      "Name of the interface the BGP peer is associated with.",
    ).optional(),
    ipAddress: z.string().describe(
      "IP address of the interface inside Google Cloud Platform.",
    ).optional(),
    ipv4NexthopAddress: z.string().describe(
      "IPv4 address of the interface inside Google Cloud Platform.",
    ).optional(),
    ipv6NexthopAddress: z.string().describe(
      "IPv6 address of the interface inside Google Cloud Platform.",
    ).optional(),
    managementType: z.enum(["MANAGED_BY_ATTACHMENT", "MANAGED_BY_USER"])
      .describe(
        "Output only. [Output Only] The resource that configures and manages this BGP peer. - MANAGED_BY_USER is the default value and can be managed by you or other users - MANAGED_BY_ATTACHMENT is a BGP peer that is configured and managed by Cloud Interconnect, specifically by an InterconnectAttachment of type PARTNER. Google automatically creates, updates, and deletes this type of BGP peer when the PARTNER InterconnectAttachment is created, updated, or deleted.",
      ).optional(),
    md5AuthenticationKeyName: z.string().describe(
      "Present if MD5 authentication is enabled for the peering. Must be the name of one of the entries in the Router.md5_authentication_keys. The field must comply with RFC1035.",
    ).optional(),
    name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
      .describe(
        "Name of this BGP peer. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
      ).optional(),
    peerAsn: z.number().int().describe(
      "Peer BGP Autonomous System Number (ASN). Each BGP interface may use a different value.",
    ).optional(),
    peerIpAddress: z.string().describe(
      "IP address of the BGP interface outside Google Cloud Platform.",
    ).optional(),
    peerIpv4NexthopAddress: z.string().describe(
      "IPv4 address of the BGP interface outside Google Cloud Platform.",
    ).optional(),
    peerIpv6NexthopAddress: z.string().describe(
      "IPv6 address of the BGP interface outside Google Cloud Platform.",
    ).optional(),
    routerApplianceInstance: z.string().describe(
      "URI of the VM instance that is used as third-party router appliances such as Next Gen Firewalls, Virtual Routers, or Router Appliances. The VM instance must be located in zones contained in the same region as this Cloud Router. The VM instance is the peer side of the BGP session.",
    ).optional(),
  })).describe(
    "BGP information that must be configured into the routing stack to establish BGP peering. This information must specify the peer ASN and either the interface name, IP address, or peer IP address. Please refer toRFC4273.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  encryptedInterconnectRouter: z.boolean().describe(
    "Indicates if a router is dedicated for use with encrypted VLAN attachments (interconnectAttachments).",
  ).optional(),
  interfaces: z.array(z.object({
    ipRange: z.string().describe(
      "IP address and range of the interface. - For Internet Protocol version 4 (IPv4), the IP range must be in theRFC3927 link-local IP address space. The value must be a CIDR-formatted string, for example, 169.254.0.1/30. Note: Do not truncate the IP address, as it represents the IP address of the interface. - For Internet Protocol version 6 (IPv6), the value must be a unique local address (ULA) range from fdff:1::/64 with a mask length of 126 or less. This value should be a CIDR-formatted string, for example, fdff:1::1/112. Within the router's VPC, this IPv6 prefix will be reserved exclusively for this connection and cannot be used for any other purpose.",
    ).optional(),
    ipVersion: z.enum(["IPV4", "IPV6"]).describe(
      "IP version of this interface.",
    ).optional(),
    linkedInterconnectAttachment: z.string().describe(
      "URI of the linked Interconnect attachment. It must be in the same region as the router. Each interface can have one linked resource, which can be a VPN tunnel, an Interconnect attachment, or a subnetwork.",
    ).optional(),
    linkedVpnTunnel: z.string().describe(
      "URI of the linked VPN tunnel, which must be in the same region as the router. Each interface can have one linked resource, which can be a VPN tunnel, an Interconnect attachment, or a subnetwork.",
    ).optional(),
    managementType: z.enum(["MANAGED_BY_ATTACHMENT", "MANAGED_BY_USER"])
      .describe(
        "Output only. [Output Only] The resource that configures and manages this interface. - MANAGED_BY_USER is the default value and can be managed directly by users. - MANAGED_BY_ATTACHMENT is an interface that is configured and managed by Cloud Interconnect, specifically, by an InterconnectAttachment of type PARTNER. Google automatically creates, updates, and deletes this type of interface when the PARTNER InterconnectAttachment is created, updated, or deleted.",
      ).optional(),
    name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
      .describe(
        "Name of this interface entry. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
      ).optional(),
    privateIpAddress: z.string().describe(
      "The regional private internal IP address that is used to establish BGP sessions to a VM instance acting as a third-party Router Appliance, such as a Next Gen Firewall, a Virtual Router, or an SD-WAN VM.",
    ).optional(),
    redundantInterface: z.string().regex(
      new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"),
    ).describe(
      "Name of the interface that will be redundant with the current interface you are creating. The redundantInterface must belong to the same Cloud Router as the interface here. To establish the BGP session to a Router Appliance VM, you must create two BGP peers. The two BGP peers must be attached to two separate interfaces that are redundant with each other. The redundant_interface must be 1-63 characters long, and comply withRFC1035. Specifically, the redundant_interface must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
    subnetwork: z.string().describe(
      "The URI of the subnetwork resource that this interface belongs to, which must be in the same region as the Cloud Router. When you establish a BGP session to a VM instance using this interface, the VM instance must belong to the same subnetwork as the subnetwork specified here.",
    ).optional(),
  })).describe(
    "Router interfaces. To create a BGP peer that uses a router interface, the interface must have one of the following fields specified: - linkedVpnTunnel - linkedInterconnectAttachment - subnetwork You can create a router interface without any of these fields specified. However, you cannot create a BGP peer that uses that interface.",
  ).optional(),
  md5AuthenticationKeys: z.array(z.object({
    key: z.string().describe(
      "[Input only] Value of the key. For patch and update calls, it can be skipped to copy the value from the previous configuration. This is allowed if the key with the same name existed before the operation. Maximum length is 80 characters. Can only contain printable ASCII characters.",
    ).optional(),
    name: z.string().describe(
      "Name used to identify the key. Must be unique within a router. Must be referenced by exactly one bgpPeer. Must comply withRFC1035.",
    ).optional(),
  })).describe("Keys used for MD5 authentication.").optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  nats: z.array(z.object({
    autoNetworkTier: z.enum([
      "FIXED_STANDARD",
      "PREMIUM",
      "STANDARD",
      "STANDARD_OVERRIDES_FIXED_STANDARD",
    ]).describe(
      "The network tier to use when automatically reserving NAT IP addresses. Must be one of: PREMIUM, STANDARD. If not specified, then the current project-level default tier is used.",
    ).optional(),
    drainNatIps: z.array(z.string()).describe(
      "A list of URLs of the IP resources to be drained. These IPs must be valid static external IPs that have been assigned to the NAT. These IPs should be used for updating/patching a NAT only.",
    ).optional(),
    enableDynamicPortAllocation: z.boolean().describe(
      "Enable Dynamic Port Allocation. If not specified, it is disabled by default. If set to true, - Dynamic Port Allocation will be enabled on this NAT config. - enableEndpointIndependentMapping cannot be set to true. - If minPorts is set, minPortsPerVm must be set to a power of two greater than or equal to 32. If minPortsPerVm is not set, a minimum of 32 ports will be allocated to a VM from this NAT config.",
    ).optional(),
    enableEndpointIndependentMapping: z.boolean().optional(),
    endpointTypes: z.array(
      z.enum([
        "ENDPOINT_TYPE_MANAGED_PROXY_LB",
        "ENDPOINT_TYPE_SWG",
        "ENDPOINT_TYPE_VM",
      ]),
    ).describe(
      "List of NAT-ted endpoint types supported by the Nat Gateway. If the list is empty, then it will be equivalent to include ENDPOINT_TYPE_VM",
    ).optional(),
    icmpIdleTimeoutSec: z.number().int().describe(
      "Timeout (in seconds) for ICMP connections. Defaults to 30s if not set.",
    ).optional(),
    logConfig: z.object({
      enable: z.boolean().describe(
        "Indicates whether or not to export logs. This is false by default.",
      ).optional(),
      filter: z.enum(["ALL", "ERRORS_ONLY", "TRANSLATIONS_ONLY"]).describe(
        "Specify the desired filtering of logs on this NAT. If unspecified, logs are exported for all connections handled by this NAT. This option can take one of the following values: - ERRORS_ONLY: Export logs only for connection failures. - TRANSLATIONS_ONLY: Export logs only for successful connections. - ALL: Export logs for all connections, successful and unsuccessful.",
      ).optional(),
    }).describe("Configuration of logging on a NAT.").optional(),
    maxPortsPerVm: z.number().int().describe(
      "Maximum number of ports allocated to a VM from this NAT config when Dynamic Port Allocation is enabled. If Dynamic Port Allocation is not enabled, this field has no effect. If Dynamic Port Allocation is enabled, and this field is set, it must be set to a power of two greater than minPortsPerVm, or 64 if minPortsPerVm is not set. If Dynamic Port Allocation is enabled and this field is not set, a maximum of 65536 ports will be allocated to a VM from this NAT config.",
    ).optional(),
    minPortsPerVm: z.number().int().describe(
      "Minimum number of ports allocated to a VM from this NAT config. If not set, a default number of ports is allocated to a VM. This is rounded up to the nearest power of 2. For example, if the value of this field is 50, at least 64 ports are allocated to a VM.",
    ).optional(),
    name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
      .describe(
        "Unique name of this Nat service. The name must be 1-63 characters long and comply withRFC1035.",
      ).optional(),
    nat64Subnetworks: z.array(z.object({
      name: z.string().describe(
        "URL for the subnetwork resource that will use NAT64.",
      ).optional(),
    })).describe(
      "List of Subnetwork resources whose traffic should be translated by NAT64 Gateway. It is used only when LIST_OF_IPV6_SUBNETWORKS is selected for the SubnetworkIpRangeToNat64Option above.",
    ).optional(),
    natIpAllocateOption: z.enum(["AUTO_ONLY", "MANUAL_ONLY"]).describe(
      "Specify the NatIpAllocateOption, which can take one of the following values: - MANUAL_ONLY: Uses only Nat IP addresses provided by customers. When there are not enough specified Nat IPs, the Nat service fails for new VMs. - AUTO_ONLY: Nat IPs are allocated by Google Cloud Platform; customers can't specify any Nat IPs. When choosing AUTO_ONLY, then nat_ip should be empty.",
    ).optional(),
    natIps: z.array(z.string()).describe(
      "A list of URLs of the IP resources used for this Nat service. These IP addresses must be valid static external IP addresses assigned to the project.",
    ).optional(),
    rules: z.array(z.object({
      action: z.object({
        sourceNatActiveIps: z.unknown().describe(
          "A list of URLs of the IP resources used for this NAT rule. These IP addresses must be valid static external IP addresses assigned to the project. This field is used for public NAT.",
        ).optional(),
        sourceNatActiveRanges: z.unknown().describe(
          "A list of URLs of the subnetworks used as source ranges for this NAT Rule. These subnetworks must have purpose set to PRIVATE_NAT. This field is used for private NAT.",
        ).optional(),
        sourceNatDrainIps: z.unknown().describe(
          "A list of URLs of the IP resources to be drained. These IPs must be valid static external IPs that have been assigned to the NAT. These IPs should be used for updating/patching a NAT rule only. This field is used for public NAT.",
        ).optional(),
        sourceNatDrainRanges: z.unknown().describe(
          "A list of URLs of subnetworks representing source ranges to be drained. This is only supported on patch/update, and these subnetworks must have previously been used as active ranges in this NAT Rule. This field is used for private NAT.",
        ).optional(),
      }).optional(),
      description: z.string().describe("An optional description of this rule.")
        .optional(),
      match: z.string().describe(
        "CEL expression that specifies the match condition that egress traffic from a VM is evaluated against. If it evaluates to true, the corresponding `action` is enforced. The following examples are valid match expressions for public NAT: `inIpRange(destination.ip, '1.1.0.0/16') || inIpRange(destination.ip, '2.2.0.0/16')` `destination.ip == '1.1.0.1' || destination.ip == '8.8.8.8'` The following example is a valid match expression for private NAT: `nexthop.hub == '//networkconnectivity.googleapis.com/projects/my-project/locations/global/hubs/hub-1'`",
      ).optional(),
      ruleNumber: z.number().int().describe(
        "An integer uniquely identifying a rule in the list. The rule number must be a positive value between 0 and 65000, and must be unique among rules within a NAT.",
      ).optional(),
    })).describe("A list of rules associated with this NAT.").optional(),
    sourceSubnetworkIpRangesToNat: z.enum([
      "ALL_SUBNETWORKS_ALL_IP_RANGES",
      "ALL_SUBNETWORKS_ALL_PRIMARY_IP_RANGES",
      "LIST_OF_SUBNETWORKS",
    ]).describe(
      "Specify the Nat option, which can take one of the following values: - ALL_SUBNETWORKS_ALL_IP_RANGES: All of the IP ranges in every Subnetwork are allowed to Nat. - ALL_SUBNETWORKS_ALL_PRIMARY_IP_RANGES: All of the primary IP ranges in every Subnetwork are allowed to Nat. - LIST_OF_SUBNETWORKS: A list of Subnetworks are allowed to Nat (specified in the field subnetwork below) The default is SUBNETWORK_IP_RANGE_TO_NAT_OPTION_UNSPECIFIED. Note that if this field contains ALL_SUBNETWORKS_ALL_IP_RANGES then there should not be any other Router.Nat section in any Router for this network in this region.",
    ).optional(),
    sourceSubnetworkIpRangesToNat64: z.enum([
      "ALL_IPV6_SUBNETWORKS",
      "LIST_OF_IPV6_SUBNETWORKS",
    ]).describe(
      "Specify the Nat option for NAT64, which can take one of the following values: - ALL_IPV6_SUBNETWORKS: All of the IP ranges in every Subnetwork are allowed to Nat. - LIST_OF_IPV6_SUBNETWORKS: A list of Subnetworks are allowed to Nat (specified in the field nat64_subnetwork below) The default is NAT64_OPTION_UNSPECIFIED. Note that if this field contains NAT64_ALL_V6_SUBNETWORKS no other Router.Nat section in this region can also enable NAT64 for any Subnetworks in this network. Other Router.Nat sections can still be present to enable NAT44 only.",
    ).optional(),
    subnetworks: z.array(z.object({
      name: z.string().describe(
        "URL for the subnetwork resource that will use NAT.",
      ).optional(),
      secondaryIpRangeNames: z.array(z.unknown()).describe(
        'A list of the secondary ranges of the Subnetwork that are allowed to use NAT. This can be populated only if "LIST_OF_SECONDARY_IP_RANGES" is one of the values in source_ip_ranges_to_nat.',
      ).optional(),
      sourceIpRangesToNat: z.array(z.unknown()).describe(
        'Specify the options for NAT ranges in the Subnetwork. All options of a single value are valid except NAT_IP_RANGE_OPTION_UNSPECIFIED. The only valid option with multiple values is: ["PRIMARY_IP_RANGE", "LIST_OF_SECONDARY_IP_RANGES"] Default: [ALL_IP_RANGES]',
      ).optional(),
    })).describe(
      "A list of Subnetwork resources whose traffic should be translated by NAT Gateway. It is used only when LIST_OF_SUBNETWORKS is selected for the SubnetworkIpRangeToNatOption above.",
    ).optional(),
    tcpEstablishedIdleTimeoutSec: z.number().int().describe(
      "Timeout (in seconds) for TCP established connections. Defaults to 1200s if not set.",
    ).optional(),
    tcpTimeWaitTimeoutSec: z.number().int().describe(
      "Timeout (in seconds) for TCP connections that are in TIME_WAIT state. Defaults to 120s if not set.",
    ).optional(),
    tcpTransitoryIdleTimeoutSec: z.number().int().describe(
      "Timeout (in seconds) for TCP transitory connections. Defaults to 30s if not set.",
    ).optional(),
    type: z.enum(["PRIVATE", "PUBLIC"]).describe(
      "Indicates whether this NAT is used for public or private IP translation. If unspecified, it defaults to PUBLIC.",
    ).optional(),
    udpIdleTimeoutSec: z.number().int().describe(
      "Timeout (in seconds) for UDP connections. Defaults to 30s if not set.",
    ).optional(),
  })).describe("A list of NAT services created in this router.").optional(),
  nccGateway: z.string().describe(
    "URI of the ncc_gateway to which this router associated.",
  ).optional(),
  network: z.string().describe(
    "URI of the network to which this router belongs.",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid. * Inconsistent format is not supported. For instance: {"tagKeys/333": "tagValues/444", "123/env": "prod"} is invalid.',
    ).optional(),
  }).describe("Additional router parameters.").optional(),
  region: z.string().describe(
    "[Output Only] URI of the region where the router resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Compute Engine Routers. Registered at `@swamp/gcp/compute/routers`. */
export const model = {
  type: "@swamp/gcp/compute/routers",
  version: "2026.06.08.1",
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
      toVersion: "2026.06.01.1",
      description: "Added: nccGateway",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Cloud Router resource. For more information about Cloud Router, ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a routers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["bgp"] !== undefined) body["bgp"] = g["bgp"];
        if (g["bgpPeers"] !== undefined) body["bgpPeers"] = g["bgpPeers"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptedInterconnectRouter"] !== undefined) {
          body["encryptedInterconnectRouter"] =
            g["encryptedInterconnectRouter"];
        }
        if (g["interfaces"] !== undefined) body["interfaces"] = g["interfaces"];
        if (g["md5AuthenticationKeys"] !== undefined) {
          body["md5AuthenticationKeys"] = g["md5AuthenticationKeys"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nats"] !== undefined) body["nats"] = g["nats"];
        if (g["nccGateway"] !== undefined) body["nccGateway"] = g["nccGateway"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["router"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "project": projectId,
              "region": String(g["region"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a routers",
      arguments: z.object({
        identifier: z.string().describe("The name of the routers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["router"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update routers attributes",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
        params["router"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["bgp"] !== undefined) body["bgp"] = g["bgp"];
        if (g["bgpPeers"] !== undefined) body["bgpPeers"] = g["bgpPeers"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["encryptedInterconnectRouter"] !== undefined) {
          body["encryptedInterconnectRouter"] =
            g["encryptedInterconnectRouter"];
        }
        if (g["interfaces"] !== undefined) body["interfaces"] = g["interfaces"];
        if (g["md5AuthenticationKeys"] !== undefined) {
          body["md5AuthenticationKeys"] = g["md5AuthenticationKeys"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["nats"] !== undefined) body["nats"] = g["nats"];
        if (g["nccGateway"] !== undefined) body["nccGateway"] = g["nccGateway"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["params"] !== undefined) body["params"] = g["params"];
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
          UPDATE_CONFIG,
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
    delete: {
      description: "Delete the routers",
      arguments: z.object({
        identifier: z.string().describe("The name of the routers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["router"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
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
      description: "Sync routers state from GCP",
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
          if (g["region"] !== undefined) params["region"] = String(g["region"]);
          else if (existing["region"]) {
            params["region"] = String(existing["region"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["router"] = identifier;
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
    list: {
      description: "List routers resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters resources listed in the response. Most",
        ).optional(),
        maxResults: z.number().describe(
          "The maximum number of results per page that should be returned.",
        ).optional(),
        orderBy: z.string().describe(
          "Sorts list results by a certain order. By default, results",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Opt-in for partial success behavior which provides partial results in case",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
    get_nat_ip_info: {
      description: "get nat ip info",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["router"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.routers.getNatIpInfo",
            "path":
              "projects/{project}/regions/{region}/routers/{router}/getNatIpInfo",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "router"],
            "parameters": {
              "natName": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "router": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_nat_mapping_info: {
      description: "get nat mapping info",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["router"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.routers.getNatMappingInfo",
            "path":
              "projects/{project}/regions/{region}/routers/{router}/getNatMappingInfo",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "router"],
            "parameters": {
              "filter": { "location": "query" },
              "maxResults": { "location": "query" },
              "natName": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "returnPartialSuccess": { "location": "query" },
              "router": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_route_policy: {
      description: "get route policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["router"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.routers.getRoutePolicy",
            "path":
              "projects/{project}/regions/{region}/routers/{router}/getRoutePolicy",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "router"],
            "parameters": {
              "policy": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "router": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    get_router_status: {
      description: "get router status",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["router"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.routers.getRouterStatus",
            "path":
              "projects/{project}/regions/{region}/routers/{router}/getRouterStatus",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "router"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "router": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    list_bgp_routes: {
      description: "list bgp routes",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["router"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.routers.listBgpRoutes",
            "path":
              "projects/{project}/regions/{region}/routers/{router}/listBgpRoutes",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "router"],
            "parameters": {
              "addressFamily": { "location": "query" },
              "destinationPrefix": { "location": "query" },
              "filter": { "location": "query" },
              "maxResults": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "peer": { "location": "query" },
              "policyApplied": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "returnPartialSuccess": { "location": "query" },
              "routeType": { "location": "query" },
              "router": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    list_route_policies: {
      description: "list route policies",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["router"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.routers.listRoutePolicies",
            "path":
              "projects/{project}/regions/{region}/routers/{router}/listRoutePolicies",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "router"],
            "parameters": {
              "filter": { "location": "query" },
              "maxResults": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "returnPartialSuccess": { "location": "query" },
              "router": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    patch_route_policy: {
      description: "patch route policy",
      arguments: z.object({
        description: z.any().optional(),
        fingerprint: z.any().optional(),
        name: z.any().optional(),
        terms: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["router"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["terms"] !== undefined) body["terms"] = args["terms"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.routers.patchRoutePolicy",
            "path":
              "projects/{project}/regions/{region}/routers/{router}/patchRoutePolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "router"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "router": { "location": "path", "required": true },
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
    preview: {
      description: "preview",
      arguments: z.object({
        bgp: z.any().optional(),
        bgpPeers: z.any().optional(),
        creationTimestamp: z.any().optional(),
        description: z.any().optional(),
        encryptedInterconnectRouter: z.any().optional(),
        id: z.any().optional(),
        interfaces: z.any().optional(),
        kind: z.any().optional(),
        md5AuthenticationKeys: z.any().optional(),
        name: z.any().optional(),
        nats: z.any().optional(),
        nccGateway: z.any().optional(),
        network: z.any().optional(),
        params: z.any().optional(),
        region: z.any().optional(),
        selfLink: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["router"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["bgp"] !== undefined) body["bgp"] = args["bgp"];
        if (args["bgpPeers"] !== undefined) body["bgpPeers"] = args["bgpPeers"];
        if (args["creationTimestamp"] !== undefined) {
          body["creationTimestamp"] = args["creationTimestamp"];
        }
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["encryptedInterconnectRouter"] !== undefined) {
          body["encryptedInterconnectRouter"] =
            args["encryptedInterconnectRouter"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["interfaces"] !== undefined) {
          body["interfaces"] = args["interfaces"];
        }
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["md5AuthenticationKeys"] !== undefined) {
          body["md5AuthenticationKeys"] = args["md5AuthenticationKeys"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["nats"] !== undefined) body["nats"] = args["nats"];
        if (args["nccGateway"] !== undefined) {
          body["nccGateway"] = args["nccGateway"];
        }
        if (args["network"] !== undefined) body["network"] = args["network"];
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["region"] !== undefined) body["region"] = args["region"];
        if (args["selfLink"] !== undefined) body["selfLink"] = args["selfLink"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.routers.preview",
            "path":
              "projects/{project}/regions/{region}/routers/{router}/preview",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "router"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "router": { "location": "path", "required": true },
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
    update_route_policy: {
      description: "update route policy",
      arguments: z.object({
        description: z.any().optional(),
        fingerprint: z.any().optional(),
        name: z.any().optional(),
        terms: z.any().optional(),
        type: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
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
        params["router"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["terms"] !== undefined) body["terms"] = args["terms"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.routers.updateRoutePolicy",
            "path":
              "projects/{project}/regions/{region}/routers/{router}/updateRoutePolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "router"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "router": { "location": "path", "required": true },
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
