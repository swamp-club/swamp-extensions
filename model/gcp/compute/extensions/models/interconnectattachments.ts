// Auto-generated extension model for @swamp/gcp/compute/interconnectattachments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine InterconnectAttachments.
 *
 * Represents an Interconnect Attachment (VLAN) resource. You can use Interconnect attachments (VLANS) to connect your Virtual Private Cloud networks to your on-premises networks through an Interconnect. For more information, read Creating VLAN Attachments.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.interconnectAttachments.get",
  "path":
    "projects/{project}/regions/{region}/interconnectAttachments/{interconnectAttachment}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "interconnectAttachment",
  ],
  "parameters": {
    "interconnectAttachment": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.interconnectAttachments.insert",
  "path": "projects/{project}/regions/{region}/interconnectAttachments",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.interconnectAttachments.patch",
  "path":
    "projects/{project}/regions/{region}/interconnectAttachments/{interconnectAttachment}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "interconnectAttachment",
  ],
  "parameters": {
    "interconnectAttachment": {
      "location": "path",
      "required": true,
    },
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

const DELETE_CONFIG = {
  "id": "compute.interconnectAttachments.delete",
  "path":
    "projects/{project}/regions/{region}/interconnectAttachments/{interconnectAttachment}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "interconnectAttachment",
  ],
  "parameters": {
    "interconnectAttachment": {
      "location": "path",
      "required": true,
    },
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

const GlobalArgsSchema = z.object({
  adminEnabled: z.boolean().describe(
    "Determines whether this Attachment will carry packets. Not present for PARTNER_PROVIDER.",
  ).optional(),
  candidateCloudRouterIpAddress: z.string().describe(
    "Single IPv4 address + prefix length to be configured on the cloud router interface for this interconnect attachment. - Both candidate_cloud_router_ip_address and candidate_customer_router_ip_address fields must be set or both must be unset. - Prefix length of both candidate_cloud_router_ip_address and candidate_customer_router_ip_address must be the same. - Max prefix length is 31.",
  ).optional(),
  candidateCloudRouterIpv6Address: z.string().describe(
    "Single IPv6 address + prefix length to be configured on the cloud router interface for this interconnect attachment. - Both candidate_cloud_router_ipv6_address and candidate_customer_router_ipv6_address fields must be set or both must be unset. - Prefix length of both candidate_cloud_router_ipv6_address and candidate_customer_router_ipv6_address must be the same. - Max prefix length is 126.",
  ).optional(),
  candidateCustomerRouterIpAddress: z.string().describe(
    "Single IPv4 address + prefix length to be configured on the customer router interface for this interconnect attachment.",
  ).optional(),
  candidateCustomerRouterIpv6Address: z.string().describe(
    "Single IPv6 address + prefix length to be configured on the customer router interface for this interconnect attachment.",
  ).optional(),
  candidateIpv6Subnets: z.array(z.string()).describe(
    "This field is not available.",
  ).optional(),
  candidateSubnets: z.array(z.string()).describe(
    "Input only. Up to 16 candidate prefixes that can be used to restrict the allocation of cloudRouterIpAddress and customerRouterIpAddress for this attachment. All prefixes must be within link-local address space (169.254.0.0/16) and must be /29 or shorter (/28, /27, etc). Google will attempt to select an unused /29 from the supplied candidate prefix(es). The request will fail if all possible /29s are in use on Google's edge. If not supplied, Google will randomly select an unused /29 from all of link-local space.",
  ).optional(),
  cloudRouterIpv6InterfaceId: z.string().describe(
    "This field is not available.",
  ).optional(),
  configurationConstraints: z.object({
    bgpMd5: z.enum(["MD5_OPTIONAL", "MD5_REQUIRED", "MD5_UNSUPPORTED"])
      .describe(
        "Output only. [Output Only] Whether the attachment's BGP session requires/allows/disallows BGP MD5 authentication. This can take one of the following values: MD5_OPTIONAL, MD5_REQUIRED, MD5_UNSUPPORTED. For example, a Cross-Cloud Interconnect connection to a remote cloud provider that requires BGP MD5 authentication has the interconnectRemoteLocation attachment_configuration_constraints.bgp_md5 field set to MD5_REQUIRED, and that property is propagated to the attachment. Similarly, if BGP MD5 is MD5_UNSUPPORTED, an error is returned if MD5 is requested.",
      ).optional(),
    bgpPeerAsnRanges: z.array(z.object({
      max: z.number().int().optional(),
      min: z.number().int().optional(),
    })).describe(
      "Output only. [Output Only] List of ASN ranges that the remote location is known to support. Formatted as an array of inclusive ranges {min: min-value, max: max-value}. For example, [{min: 123, max: 123}, {min: 64512, max: 65534}] allows the peer ASN to be 123 or anything in the range 64512-65534. This field is only advisory. Although the API accepts other ranges, these are the ranges that we recommend.",
    ).optional(),
  }).optional(),
  customerRouterIpv6InterfaceId: z.string().describe(
    "This field is not available.",
  ).optional(),
  description: z.string().describe("An optional description of this resource.")
    .optional(),
  edgeAvailabilityDomain: z.enum([
    "AVAILABILITY_DOMAIN_1",
    "AVAILABILITY_DOMAIN_2",
    "AVAILABILITY_DOMAIN_ANY",
  ]).describe(
    "Input only. Desired availability domain for the attachment. Only available for type PARTNER, at creation time, and can take one of the following values: - AVAILABILITY_DOMAIN_ANY - AVAILABILITY_DOMAIN_1 - AVAILABILITY_DOMAIN_2 For improved reliability, customers should configure a pair of attachments, one per availability domain. The selected availability domain will be provided to the Partner via the pairing key, so that the provisioned circuit will lie in the specified domain. If not specified, the value will default to AVAILABILITY_DOMAIN_ANY.",
  ).optional(),
  encryption: z.enum(["IPSEC", "NONE"]).describe(
    "Indicates the user-supplied encryption option of this VLAN attachment (interconnectAttachment). Can only be specified at attachment creation for PARTNER or DEDICATED attachments. Possible values are: - NONE - This is the default value, which means that the VLAN attachment carries unencrypted traffic. VMs are able to send traffic to, or receive traffic from, such a VLAN attachment. - IPSEC - The VLAN attachment carries only encrypted traffic that is encrypted by an IPsec device, such as an HA VPN gateway or third-party IPsec VPN. VMs cannot directly send traffic to, or receive traffic from, such a VLAN attachment. To use *HA VPN over Cloud Interconnect*, the VLAN attachment must be created with this option.",
  ).optional(),
  interconnect: z.string().describe(
    "URL of the underlying Interconnect object that this attachment's traffic will traverse through.",
  ).optional(),
  ipsecInternalAddresses: z.array(z.string()).describe(
    "A list of URLs of addresses that have been reserved for the VLAN attachment. Used only for the VLAN attachment that has the encryption option as IPSEC. The addresses must be regional internal IP address ranges. When creating an HA VPN gateway over the VLAN attachment, if the attachment is configured to use a regional internal IP address, then the VPN gateway's IP address is allocated from the IP address range specified here. For example, if the HA VPN gateway's interface 0 is paired to this VLAN attachment, then a regional internal IP address for the VPN gateway interface 0 will be allocated from the IP address specified for this VLAN attachment. If this field is not specified when creating the VLAN attachment, then later on when creating an HA VPN gateway on this VLAN attachment, the HA VPN gateway's IP address is allocated from the regional external IP address pool.",
  ).optional(),
  l2Forwarding: z.object({
    applianceMappings: z.record(
      z.string(),
      z.object({
        applianceIpAddress: z.string().describe(
          "Optional. A single IPv4 or IPv6 address used as the destination IP address for ingress packets that match on a VLAN tag, but do not match a more specific inner VLAN tag. Unset field (null-value) indicates both VLAN tags are required to be mapped. Otherwise, defaultApplianceIpAddress is used.",
        ).optional(),
        innerVlanToApplianceMappings: z.array(z.object({
          innerApplianceIpAddress: z.unknown().describe(
            "Required in this object. A single IPv4 or IPv6 address used as the destination IP address for ingress packets that match on both VLAN tags.",
          ).optional(),
          innerVlanTags: z.unknown().describe(
            'Required in this object. Used to match the inner VLAN tag on the packet. Each entry can be a single number or a range of numbers in the range of 1 to 4094, e.g., ["1", "4001-4094"] is valid. Non-empty and Non-overlapping VLAN tag ranges are enforced, and violating operations will be rejected. The inner VLAN tags must have an ethertype value of 0x8100.',
          ).optional(),
        })).describe(
          "Optional. Used to match against the inner VLAN when the packet contains two VLAN tags. A list of mapping rules from inner VLAN tags to IP addresses. If the inner VLAN is not explicitly mapped to an IP address range, the applianceIpAddress is used.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of this appliance mapping rule.",
        ).optional(),
      }),
    ).describe(
      'Optional. A map of VLAN tags to appliances and optional inner mapping rules. If VLANs are not explicitly mapped to any appliance, the defaultApplianceIpAddress is used. Each VLAN tag can be a single number or a range of numbers in the range of 1 to 4094, e.g., "1" or "4001-4094". Non-empty and non-overlapping VLAN tag ranges are enforced, and violating operations will be rejected. The VLAN tags in the Ethernet header must use an ethertype value of 0x88A8 or 0x8100.',
    ).optional(),
    defaultApplianceIpAddress: z.string().describe(
      "Optional. A single IPv4 or IPv6 address used as the default destination IP when there is no VLAN mapping result found. Unset field (null-value) indicates the unmatched packet should be dropped.",
    ).optional(),
    geneveHeader: z.object({
      vni: z.number().int().describe(
        "Optional. VNI is a 24-bit unique virtual network identifier, from 0 to 16,777,215.",
      ).optional(),
    }).describe("GeneveHeader related configurations.").optional(),
    network: z.string().describe(
      "Required. Resource URL of the network to which this attachment belongs.",
    ).optional(),
    tunnelEndpointIpAddress: z.string().describe(
      "Required. A single IPv4 or IPv6 address. This address will be used as the source IP address for packets sent to the appliances, and must be used as the destination IP address for packets that should be sent out through this attachment.",
    ).optional(),
  }).describe("L2 Interconnect Attachment related configuration.").optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this InterconnectAttachment, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an InterconnectAttachment.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty.",
  ).optional(),
  mtu: z.number().int().describe(
    "Maximum Transmission Unit (MTU), in bytes, of packets passing through this interconnect attachment. Valid values are 1440, 1460, 1500, and 8896. If not specified, the value will default to 1440.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid. * Inconsistent format is not supported. For instance: {"tagKeys/333": "tagValues/444", "123/env": "prod"} is invalid.',
    ).optional(),
  }).describe("Additional interconnect attachment parameters.").optional(),
  partnerMetadata: z.object({
    interconnectName: z.string().describe(
      'Plain text name of the Interconnect this attachment is connected to, as displayed in the Partner\'s portal. For instance "Chicago 1". This value may be validated to match approved Partner values.',
    ).optional(),
    partnerName: z.string().describe(
      "Plain text name of the Partner providing this attachment. This value may be validated to match approved Partner values.",
    ).optional(),
    portalUrl: z.string().describe(
      "URL of the Partner's portal for this Attachment. Partners may customise this to be a deep link to the specific resource on the Partner portal. This value may be validated to match approved Partner values.",
    ).optional(),
  }).describe(
    "Informational metadata about Partner attachments from Partners to display to customers. These fields are propagated from PARTNER_PROVIDER attachments to their corresponding PARTNER attachments.",
  ).optional(),
  privateInterconnectInfo: z.object({
    tag8021q: z.number().int().describe(
      "[Output Only] 802.1q encapsulation tag to be used for traffic between Google and the customer, going to and from this network and region.",
    ).optional(),
  }).describe(
    "Information for an interconnect attachment when this belongs to an interconnect of type DEDICATED.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the regional interconnect attachment resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  router: z.string().describe(
    "URL of the Cloud Router to be used for dynamic routing. This router must be in the same region as this InterconnectAttachment. The InterconnectAttachment will automatically connect the Interconnect to the network & region within which the Cloud Router is configured.",
  ).optional(),
  stackType: z.enum(["IPV4_IPV6", "IPV4_ONLY"]).describe(
    "The stack type for this interconnect attachment to identify whether the IPv6 feature is enabled or not. If not specified, IPV4_ONLY will be used. This field can be both set at interconnect attachments creation and update interconnect attachment operations.",
  ).optional(),
  subnetLength: z.number().int().describe(
    "Input only. Length of the IPv4 subnet mask. Allowed values: - 29 (default) - 30 The default value is 29, except for Cross-Cloud Interconnect connections that use an InterconnectRemoteLocation with a constraints.subnetLengthRange.min equal to 30. For example, connections that use an Azure remote location fall into this category. In these cases, the default value is 30, and requesting 29 returns an error. Where both 29 and 30 are allowed, 29 is preferred, because it gives Google Cloud Support more debugging visibility.",
  ).optional(),
  type: z.enum(["DEDICATED", "L2_DEDICATED", "PARTNER", "PARTNER_PROVIDER"])
    .describe(
      "The type of interconnect attachment this is, which can take one of the following values: - DEDICATED: an attachment to a Dedicated Interconnect. - PARTNER: an attachment to a Partner Interconnect, created by the customer. - PARTNER_PROVIDER: an attachment to a Partner Interconnect, created by the partner. - L2_DEDICATED: a L2 attachment to a Dedicated Interconnect.",
    ).optional(),
  vlanTag8021q: z.number().int().describe(
    "The IEEE 802.1Q VLAN tag for this attachment, in the range 2-4093. Only specified at creation time.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  adminEnabled: z.boolean().optional(),
  attachmentGroup: z.string().optional(),
  bandwidth: z.string().optional(),
  candidateCloudRouterIpAddress: z.string().optional(),
  candidateCloudRouterIpv6Address: z.string().optional(),
  candidateCustomerRouterIpAddress: z.string().optional(),
  candidateCustomerRouterIpv6Address: z.string().optional(),
  candidateIpv6Subnets: z.array(z.string()).optional(),
  candidateSubnets: z.array(z.string()).optional(),
  cloudRouterIpAddress: z.string().optional(),
  cloudRouterIpv6Address: z.string().optional(),
  cloudRouterIpv6InterfaceId: z.string().optional(),
  configurationConstraints: z.object({
    bgpMd5: z.string(),
    bgpPeerAsnRanges: z.array(z.object({
      max: z.number(),
      min: z.number(),
    })),
  }).optional(),
  creationTimestamp: z.string().optional(),
  customerRouterIpAddress: z.string().optional(),
  customerRouterIpv6Address: z.string().optional(),
  customerRouterIpv6InterfaceId: z.string().optional(),
  dataplaneVersion: z.number().optional(),
  description: z.string().optional(),
  edgeAvailabilityDomain: z.string().optional(),
  encryption: z.string().optional(),
  googleReferenceId: z.string().optional(),
  id: z.string().optional(),
  interconnect: z.string().optional(),
  ipsecInternalAddresses: z.array(z.string()).optional(),
  kind: z.string().optional(),
  l2Forwarding: z.object({
    applianceMappings: z.record(z.string(), z.unknown()),
    defaultApplianceIpAddress: z.string(),
    geneveHeader: z.object({
      vni: z.number(),
    }),
    network: z.string(),
    tunnelEndpointIpAddress: z.string(),
  }).optional(),
  labelFingerprint: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  mtu: z.number().optional(),
  name: z.string(),
  operationalStatus: z.string().optional(),
  pairingKey: z.string().optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  partnerAsn: z.string().optional(),
  partnerMetadata: z.object({
    interconnectName: z.string(),
    partnerName: z.string(),
    portalUrl: z.string(),
  }).optional(),
  privateInterconnectInfo: z.object({
    tag8021q: z.number(),
  }).optional(),
  region: z.string().optional(),
  remoteService: z.string().optional(),
  router: z.string().optional(),
  satisfiesPzs: z.boolean().optional(),
  selfLink: z.string().optional(),
  stackType: z.string().optional(),
  state: z.string().optional(),
  subnetLength: z.number().optional(),
  type: z.string().optional(),
  vlanTag8021q: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  adminEnabled: z.boolean().describe(
    "Determines whether this Attachment will carry packets. Not present for PARTNER_PROVIDER.",
  ).optional(),
  candidateCloudRouterIpAddress: z.string().describe(
    "Single IPv4 address + prefix length to be configured on the cloud router interface for this interconnect attachment. - Both candidate_cloud_router_ip_address and candidate_customer_router_ip_address fields must be set or both must be unset. - Prefix length of both candidate_cloud_router_ip_address and candidate_customer_router_ip_address must be the same. - Max prefix length is 31.",
  ).optional(),
  candidateCloudRouterIpv6Address: z.string().describe(
    "Single IPv6 address + prefix length to be configured on the cloud router interface for this interconnect attachment. - Both candidate_cloud_router_ipv6_address and candidate_customer_router_ipv6_address fields must be set or both must be unset. - Prefix length of both candidate_cloud_router_ipv6_address and candidate_customer_router_ipv6_address must be the same. - Max prefix length is 126.",
  ).optional(),
  candidateCustomerRouterIpAddress: z.string().describe(
    "Single IPv4 address + prefix length to be configured on the customer router interface for this interconnect attachment.",
  ).optional(),
  candidateCustomerRouterIpv6Address: z.string().describe(
    "Single IPv6 address + prefix length to be configured on the customer router interface for this interconnect attachment.",
  ).optional(),
  candidateIpv6Subnets: z.array(z.string()).describe(
    "This field is not available.",
  ).optional(),
  candidateSubnets: z.array(z.string()).describe(
    "Input only. Up to 16 candidate prefixes that can be used to restrict the allocation of cloudRouterIpAddress and customerRouterIpAddress for this attachment. All prefixes must be within link-local address space (169.254.0.0/16) and must be /29 or shorter (/28, /27, etc). Google will attempt to select an unused /29 from the supplied candidate prefix(es). The request will fail if all possible /29s are in use on Google's edge. If not supplied, Google will randomly select an unused /29 from all of link-local space.",
  ).optional(),
  cloudRouterIpv6InterfaceId: z.string().describe(
    "This field is not available.",
  ).optional(),
  configurationConstraints: z.object({
    bgpMd5: z.enum(["MD5_OPTIONAL", "MD5_REQUIRED", "MD5_UNSUPPORTED"])
      .describe(
        "Output only. [Output Only] Whether the attachment's BGP session requires/allows/disallows BGP MD5 authentication. This can take one of the following values: MD5_OPTIONAL, MD5_REQUIRED, MD5_UNSUPPORTED. For example, a Cross-Cloud Interconnect connection to a remote cloud provider that requires BGP MD5 authentication has the interconnectRemoteLocation attachment_configuration_constraints.bgp_md5 field set to MD5_REQUIRED, and that property is propagated to the attachment. Similarly, if BGP MD5 is MD5_UNSUPPORTED, an error is returned if MD5 is requested.",
      ).optional(),
    bgpPeerAsnRanges: z.array(z.object({
      max: z.number().int().optional(),
      min: z.number().int().optional(),
    })).describe(
      "Output only. [Output Only] List of ASN ranges that the remote location is known to support. Formatted as an array of inclusive ranges {min: min-value, max: max-value}. For example, [{min: 123, max: 123}, {min: 64512, max: 65534}] allows the peer ASN to be 123 or anything in the range 64512-65534. This field is only advisory. Although the API accepts other ranges, these are the ranges that we recommend.",
    ).optional(),
  }).optional(),
  customerRouterIpv6InterfaceId: z.string().describe(
    "This field is not available.",
  ).optional(),
  description: z.string().describe("An optional description of this resource.")
    .optional(),
  edgeAvailabilityDomain: z.enum([
    "AVAILABILITY_DOMAIN_1",
    "AVAILABILITY_DOMAIN_2",
    "AVAILABILITY_DOMAIN_ANY",
  ]).describe(
    "Input only. Desired availability domain for the attachment. Only available for type PARTNER, at creation time, and can take one of the following values: - AVAILABILITY_DOMAIN_ANY - AVAILABILITY_DOMAIN_1 - AVAILABILITY_DOMAIN_2 For improved reliability, customers should configure a pair of attachments, one per availability domain. The selected availability domain will be provided to the Partner via the pairing key, so that the provisioned circuit will lie in the specified domain. If not specified, the value will default to AVAILABILITY_DOMAIN_ANY.",
  ).optional(),
  encryption: z.enum(["IPSEC", "NONE"]).describe(
    "Indicates the user-supplied encryption option of this VLAN attachment (interconnectAttachment). Can only be specified at attachment creation for PARTNER or DEDICATED attachments. Possible values are: - NONE - This is the default value, which means that the VLAN attachment carries unencrypted traffic. VMs are able to send traffic to, or receive traffic from, such a VLAN attachment. - IPSEC - The VLAN attachment carries only encrypted traffic that is encrypted by an IPsec device, such as an HA VPN gateway or third-party IPsec VPN. VMs cannot directly send traffic to, or receive traffic from, such a VLAN attachment. To use *HA VPN over Cloud Interconnect*, the VLAN attachment must be created with this option.",
  ).optional(),
  interconnect: z.string().describe(
    "URL of the underlying Interconnect object that this attachment's traffic will traverse through.",
  ).optional(),
  ipsecInternalAddresses: z.array(z.string()).describe(
    "A list of URLs of addresses that have been reserved for the VLAN attachment. Used only for the VLAN attachment that has the encryption option as IPSEC. The addresses must be regional internal IP address ranges. When creating an HA VPN gateway over the VLAN attachment, if the attachment is configured to use a regional internal IP address, then the VPN gateway's IP address is allocated from the IP address range specified here. For example, if the HA VPN gateway's interface 0 is paired to this VLAN attachment, then a regional internal IP address for the VPN gateway interface 0 will be allocated from the IP address specified for this VLAN attachment. If this field is not specified when creating the VLAN attachment, then later on when creating an HA VPN gateway on this VLAN attachment, the HA VPN gateway's IP address is allocated from the regional external IP address pool.",
  ).optional(),
  l2Forwarding: z.object({
    applianceMappings: z.record(
      z.string(),
      z.object({
        applianceIpAddress: z.string().describe(
          "Optional. A single IPv4 or IPv6 address used as the destination IP address for ingress packets that match on a VLAN tag, but do not match a more specific inner VLAN tag. Unset field (null-value) indicates both VLAN tags are required to be mapped. Otherwise, defaultApplianceIpAddress is used.",
        ).optional(),
        innerVlanToApplianceMappings: z.array(z.object({
          innerApplianceIpAddress: z.unknown().describe(
            "Required in this object. A single IPv4 or IPv6 address used as the destination IP address for ingress packets that match on both VLAN tags.",
          ).optional(),
          innerVlanTags: z.unknown().describe(
            'Required in this object. Used to match the inner VLAN tag on the packet. Each entry can be a single number or a range of numbers in the range of 1 to 4094, e.g., ["1", "4001-4094"] is valid. Non-empty and Non-overlapping VLAN tag ranges are enforced, and violating operations will be rejected. The inner VLAN tags must have an ethertype value of 0x8100.',
          ).optional(),
        })).describe(
          "Optional. Used to match against the inner VLAN when the packet contains two VLAN tags. A list of mapping rules from inner VLAN tags to IP addresses. If the inner VLAN is not explicitly mapped to an IP address range, the applianceIpAddress is used.",
        ).optional(),
        name: z.string().describe(
          "Optional. The name of this appliance mapping rule.",
        ).optional(),
      }),
    ).describe(
      'Optional. A map of VLAN tags to appliances and optional inner mapping rules. If VLANs are not explicitly mapped to any appliance, the defaultApplianceIpAddress is used. Each VLAN tag can be a single number or a range of numbers in the range of 1 to 4094, e.g., "1" or "4001-4094". Non-empty and non-overlapping VLAN tag ranges are enforced, and violating operations will be rejected. The VLAN tags in the Ethernet header must use an ethertype value of 0x88A8 or 0x8100.',
    ).optional(),
    defaultApplianceIpAddress: z.string().describe(
      "Optional. A single IPv4 or IPv6 address used as the default destination IP when there is no VLAN mapping result found. Unset field (null-value) indicates the unmatched packet should be dropped.",
    ).optional(),
    geneveHeader: z.object({
      vni: z.number().int().describe(
        "Optional. VNI is a 24-bit unique virtual network identifier, from 0 to 16,777,215.",
      ).optional(),
    }).describe("GeneveHeader related configurations.").optional(),
    network: z.string().describe(
      "Required. Resource URL of the network to which this attachment belongs.",
    ).optional(),
    tunnelEndpointIpAddress: z.string().describe(
      "Required. A single IPv4 or IPv6 address. This address will be used as the source IP address for packets sent to the appliances, and must be used as the destination IP address for packets that should be sent out through this attachment.",
    ).optional(),
  }).describe("L2 Interconnect Attachment related configuration.").optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this InterconnectAttachment, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve an InterconnectAttachment.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty.",
  ).optional(),
  mtu: z.number().int().describe(
    "Maximum Transmission Unit (MTU), in bytes, of packets passing through this interconnect attachment. Valid values are 1440, 1460, 1500, and 8896. If not specified, the value will default to 1440.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid. * Inconsistent format is not supported. For instance: {"tagKeys/333": "tagValues/444", "123/env": "prod"} is invalid.',
    ).optional(),
  }).describe("Additional interconnect attachment parameters.").optional(),
  partnerMetadata: z.object({
    interconnectName: z.string().describe(
      'Plain text name of the Interconnect this attachment is connected to, as displayed in the Partner\'s portal. For instance "Chicago 1". This value may be validated to match approved Partner values.',
    ).optional(),
    partnerName: z.string().describe(
      "Plain text name of the Partner providing this attachment. This value may be validated to match approved Partner values.",
    ).optional(),
    portalUrl: z.string().describe(
      "URL of the Partner's portal for this Attachment. Partners may customise this to be a deep link to the specific resource on the Partner portal. This value may be validated to match approved Partner values.",
    ).optional(),
  }).describe(
    "Informational metadata about Partner attachments from Partners to display to customers. These fields are propagated from PARTNER_PROVIDER attachments to their corresponding PARTNER attachments.",
  ).optional(),
  privateInterconnectInfo: z.object({
    tag8021q: z.number().int().describe(
      "[Output Only] 802.1q encapsulation tag to be used for traffic between Google and the customer, going to and from this network and region.",
    ).optional(),
  }).describe(
    "Information for an interconnect attachment when this belongs to an interconnect of type DEDICATED.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the regional interconnect attachment resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  router: z.string().describe(
    "URL of the Cloud Router to be used for dynamic routing. This router must be in the same region as this InterconnectAttachment. The InterconnectAttachment will automatically connect the Interconnect to the network & region within which the Cloud Router is configured.",
  ).optional(),
  stackType: z.enum(["IPV4_IPV6", "IPV4_ONLY"]).describe(
    "The stack type for this interconnect attachment to identify whether the IPv6 feature is enabled or not. If not specified, IPV4_ONLY will be used. This field can be both set at interconnect attachments creation and update interconnect attachment operations.",
  ).optional(),
  subnetLength: z.number().int().describe(
    "Input only. Length of the IPv4 subnet mask. Allowed values: - 29 (default) - 30 The default value is 29, except for Cross-Cloud Interconnect connections that use an InterconnectRemoteLocation with a constraints.subnetLengthRange.min equal to 30. For example, connections that use an Azure remote location fall into this category. In these cases, the default value is 30, and requesting 29 returns an error. Where both 29 and 30 are allowed, 29 is preferred, because it gives Google Cloud Support more debugging visibility.",
  ).optional(),
  type: z.enum(["DEDICATED", "L2_DEDICATED", "PARTNER", "PARTNER_PROVIDER"])
    .describe(
      "The type of interconnect attachment this is, which can take one of the following values: - DEDICATED: an attachment to a Dedicated Interconnect. - PARTNER: an attachment to a Partner Interconnect, created by the customer. - PARTNER_PROVIDER: an attachment to a Partner Interconnect, created by the partner. - L2_DEDICATED: a L2 attachment to a Dedicated Interconnect.",
    ).optional(),
  vlanTag8021q: z.number().int().describe(
    "The IEEE 802.1Q VLAN tag for this attachment, in the range 2-4093. Only specified at creation time.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine InterconnectAttachments. Registered at `@swamp/gcp/compute/interconnectattachments`. */
export const model = {
  type: "@swamp/gcp/compute/interconnectattachments",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents an Interconnect Attachment (VLAN) resource. You can use Interconne...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a interconnectAttachments",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["adminEnabled"] !== undefined) {
          body["adminEnabled"] = g["adminEnabled"];
        }
        if (g["candidateCloudRouterIpAddress"] !== undefined) {
          body["candidateCloudRouterIpAddress"] =
            g["candidateCloudRouterIpAddress"];
        }
        if (g["candidateCloudRouterIpv6Address"] !== undefined) {
          body["candidateCloudRouterIpv6Address"] =
            g["candidateCloudRouterIpv6Address"];
        }
        if (g["candidateCustomerRouterIpAddress"] !== undefined) {
          body["candidateCustomerRouterIpAddress"] =
            g["candidateCustomerRouterIpAddress"];
        }
        if (g["candidateCustomerRouterIpv6Address"] !== undefined) {
          body["candidateCustomerRouterIpv6Address"] =
            g["candidateCustomerRouterIpv6Address"];
        }
        if (g["candidateIpv6Subnets"] !== undefined) {
          body["candidateIpv6Subnets"] = g["candidateIpv6Subnets"];
        }
        if (g["candidateSubnets"] !== undefined) {
          body["candidateSubnets"] = g["candidateSubnets"];
        }
        if (g["cloudRouterIpv6InterfaceId"] !== undefined) {
          body["cloudRouterIpv6InterfaceId"] = g["cloudRouterIpv6InterfaceId"];
        }
        if (g["configurationConstraints"] !== undefined) {
          body["configurationConstraints"] = g["configurationConstraints"];
        }
        if (g["customerRouterIpv6InterfaceId"] !== undefined) {
          body["customerRouterIpv6InterfaceId"] =
            g["customerRouterIpv6InterfaceId"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["edgeAvailabilityDomain"] !== undefined) {
          body["edgeAvailabilityDomain"] = g["edgeAvailabilityDomain"];
        }
        if (g["encryption"] !== undefined) body["encryption"] = g["encryption"];
        if (g["interconnect"] !== undefined) {
          body["interconnect"] = g["interconnect"];
        }
        if (g["ipsecInternalAddresses"] !== undefined) {
          body["ipsecInternalAddresses"] = g["ipsecInternalAddresses"];
        }
        if (g["l2Forwarding"] !== undefined) {
          body["l2Forwarding"] = g["l2Forwarding"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["mtu"] !== undefined) body["mtu"] = g["mtu"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["partnerMetadata"] !== undefined) {
          body["partnerMetadata"] = g["partnerMetadata"];
        }
        if (g["privateInterconnectInfo"] !== undefined) {
          body["privateInterconnectInfo"] = g["privateInterconnectInfo"];
        }
        if (g["router"] !== undefined) body["router"] = g["router"];
        if (g["stackType"] !== undefined) body["stackType"] = g["stackType"];
        if (g["subnetLength"] !== undefined) {
          body["subnetLength"] = g["subnetLength"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["vlanTag8021q"] !== undefined) {
          body["vlanTag8021q"] = g["vlanTag8021q"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["interconnectAttachment"] = String(g["name"]);
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
              "failedValues": [],
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
      description: "Get a interconnectAttachments",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the interconnectAttachments",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["interconnectAttachment"] = args.identifier;
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
      description: "Update interconnectAttachments attributes",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
        params["interconnectAttachment"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["adminEnabled"] !== undefined) {
          body["adminEnabled"] = g["adminEnabled"];
        }
        if (g["candidateCloudRouterIpAddress"] !== undefined) {
          body["candidateCloudRouterIpAddress"] =
            g["candidateCloudRouterIpAddress"];
        }
        if (g["candidateCloudRouterIpv6Address"] !== undefined) {
          body["candidateCloudRouterIpv6Address"] =
            g["candidateCloudRouterIpv6Address"];
        }
        if (g["candidateCustomerRouterIpAddress"] !== undefined) {
          body["candidateCustomerRouterIpAddress"] =
            g["candidateCustomerRouterIpAddress"];
        }
        if (g["candidateCustomerRouterIpv6Address"] !== undefined) {
          body["candidateCustomerRouterIpv6Address"] =
            g["candidateCustomerRouterIpv6Address"];
        }
        if (g["candidateIpv6Subnets"] !== undefined) {
          body["candidateIpv6Subnets"] = g["candidateIpv6Subnets"];
        }
        if (g["candidateSubnets"] !== undefined) {
          body["candidateSubnets"] = g["candidateSubnets"];
        }
        if (g["cloudRouterIpv6InterfaceId"] !== undefined) {
          body["cloudRouterIpv6InterfaceId"] = g["cloudRouterIpv6InterfaceId"];
        }
        if (g["configurationConstraints"] !== undefined) {
          body["configurationConstraints"] = g["configurationConstraints"];
        }
        if (g["customerRouterIpv6InterfaceId"] !== undefined) {
          body["customerRouterIpv6InterfaceId"] =
            g["customerRouterIpv6InterfaceId"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["edgeAvailabilityDomain"] !== undefined) {
          body["edgeAvailabilityDomain"] = g["edgeAvailabilityDomain"];
        }
        if (g["interconnect"] !== undefined) {
          body["interconnect"] = g["interconnect"];
        }
        if (g["ipsecInternalAddresses"] !== undefined) {
          body["ipsecInternalAddresses"] = g["ipsecInternalAddresses"];
        }
        if (g["l2Forwarding"] !== undefined) {
          body["l2Forwarding"] = g["l2Forwarding"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["mtu"] !== undefined) body["mtu"] = g["mtu"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["partnerMetadata"] !== undefined) {
          body["partnerMetadata"] = g["partnerMetadata"];
        }
        if (g["privateInterconnectInfo"] !== undefined) {
          body["privateInterconnectInfo"] = g["privateInterconnectInfo"];
        }
        if (g["router"] !== undefined) body["router"] = g["router"];
        if (g["subnetLength"] !== undefined) {
          body["subnetLength"] = g["subnetLength"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
              "failedValues": [],
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
      description: "Delete the interconnectAttachments",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the interconnectAttachments",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["interconnectAttachment"] = args.identifier;
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
      description: "Sync interconnectAttachments state from GCP",
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
          params["interconnectAttachment"] = identifier;
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
    set_labels: {
      description: "set labels",
      arguments: z.object({
        labelFingerprint: z.any().optional(),
        labels: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = args["labelFingerprint"];
        }
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.interconnectAttachments.setLabels",
            "path":
              "projects/{project}/regions/{region}/interconnectAttachments/{resource}/setLabels",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
