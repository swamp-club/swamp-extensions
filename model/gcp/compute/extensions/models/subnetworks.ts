// Auto-generated extension model for @swamp/gcp/compute/subnetworks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Subnetworks.
 *
 * Represents a Subnetwork resource. A subnetwork (also known as a subnet) is a logical partition of a Virtual Private Cloud network with one primary IP range and zero or more secondary IP ranges. For more information, read Virtual Private Cloud (VPC) Network.
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
  "id": "compute.subnetworks.get",
  "path": "projects/{project}/regions/{region}/subnetworks/{subnetwork}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "subnetwork",
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
    "subnetwork": {
      "location": "path",
      "required": true,
    },
    "views": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.subnetworks.insert",
  "path": "projects/{project}/regions/{region}/subnetworks",
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

const PATCH_CONFIG = {
  "id": "compute.subnetworks.patch",
  "path": "projects/{project}/regions/{region}/subnetworks/{subnetwork}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "subnetwork",
  ],
  "parameters": {
    "drainTimeoutSeconds": {
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
    "requestId": {
      "location": "query",
    },
    "subnetwork": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.subnetworks.delete",
  "path": "projects/{project}/regions/{region}/subnetworks/{subnetwork}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "subnetwork",
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
    "subnetwork": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  allowSubnetCidrRoutesOverlap: z.boolean().describe(
    "Whether this subnetwork's ranges can conflict with existing custom routes. Setting this to true allows this subnetwork's primary and secondary ranges to overlap with (and contain) custom routes that have already been configured on the corresponding network. For example if a static route has range 10.1.0.0/16, a subnet range 10.0.0.0/8 could only be created if allow_conflicting_routes=true. Overlapping is only allowed on subnetwork operations; routes whose ranges conflict with this subnetwork's ranges won't be allowed unless route.allow_conflicting_subnetworks is set to true. Typically packets destined to IPs within the subnetwork (which may contain private/sensitive data) are prevented from leaving the virtual network. Setting this field to true will disable this feature. The default value is false and applies to all existing subnetworks and automatically created subnetworks.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource. This field can be set only at resource creation time.",
  ).optional(),
  enableFlowLogs: z.boolean().describe(
    "Whether to enable flow logging for this subnetwork. If this field is not explicitly set, it will not appear in get listings. If not set the default behavior is determined by the org policy, if there is no org policy specified, then it will default to disabled. This field isn't supported if the subnet purpose field is set toREGIONAL_MANAGED_PROXY. It is recommended to uselogConfig.enable field instead.",
  ).optional(),
  externalIpv6Prefix: z.string().describe(
    "The external IPv6 address range that is owned by this subnetwork.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a Subnetwork. An up-to-date fingerprint must be provided in order to update the Subnetwork, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a Subnetwork.",
  ).optional(),
  internalIpv6Prefix: z.string().describe(
    "The internal IPv6 address range that is owned by this subnetwork.",
  ).optional(),
  ipCidrRange: z.string().describe(
    "The range of internal addresses that are owned by this subnetwork. Provide this property when you create the subnetwork. For example,10.0.0.0/8 or 100.64.0.0/10. Ranges must be unique and non-overlapping within a network. Only IPv4 is supported. This field is set at resource creation time. The range can be any range listed in theValid ranges list. The range can be expanded after creation usingexpandIpCidrRange.",
  ).optional(),
  ipCollection: z.string().describe(
    "Reference to the source of IP, like a PublicDelegatedPrefix (PDP) for BYOIP. The PDP must be a sub-PDP in EXTERNAL_IPV6_SUBNETWORK_CREATION or INTERNAL_IPV6_SUBNETWORK_CREATION mode. Use one of the following formats to specify a sub-PDP when creating a dual stack or IPv6-only subnetwork with external access using BYOIP: - Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name - Partial URL, as in - projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name - regions/region/publicDelegatedPrefixes/sub-pdp-name",
  ).optional(),
  ipv6AccessType: z.enum(["EXTERNAL", "INTERNAL"]).describe(
    "The access type of IPv6 address this subnet holds. It's immutable and can only be specified during creation or the first time the subnet is updated into IPV4_IPV6 dual stack.",
  ).optional(),
  logConfig: z.object({
    aggregationInterval: z.enum([
      "INTERVAL_10_MIN",
      "INTERVAL_15_MIN",
      "INTERVAL_1_MIN",
      "INTERVAL_30_SEC",
      "INTERVAL_5_MIN",
      "INTERVAL_5_SEC",
    ]).describe(
      "Can only be specified if VPC flow logging for this subnetwork is enabled. Toggles the aggregation interval for collecting flow logs. Increasing the interval time will reduce the amount of generated flow logs for long lasting connections. Default is an interval of 5 seconds per connection.",
    ).optional(),
    enable: z.boolean().describe(
      "Whether to enable flow logging for this subnetwork. If this field is not explicitly set, it will not appear in get listings. If not set the default behavior is determined by the org policy, if there is no org policy specified, then it will default to disabled. Flow logging isn't supported if the subnet purpose field is set to REGIONAL_MANAGED_PROXY.",
    ).optional(),
    filterExpr: z.string().describe(
      "Can only be specified if VPC flow logs for this subnetwork is enabled. The filter expression is used to define which VPC flow logs should be exported to Cloud Logging.",
    ).optional(),
    flowSampling: z.number().describe(
      "Can only be specified if VPC flow logging for this subnetwork is enabled. The value of the field must be in [0, 1]. Set the sampling rate of VPC flow logs within the subnetwork where 1.0 means all collected logs are reported and 0.0 means no logs are reported. Default is 0.5 unless otherwise specified by the org policy, which means half of all collected logs are reported.",
    ).optional(),
    metadata: z.enum([
      "CUSTOM_METADATA",
      "EXCLUDE_ALL_METADATA",
      "INCLUDE_ALL_METADATA",
    ]).describe(
      "Can only be specified if VPC flow logs for this subnetwork is enabled. Configures whether all, none or a subset of metadata fields should be added to the reported VPC flow logs. Default isEXCLUDE_ALL_METADATA.",
    ).optional(),
    metadataFields: z.array(z.string()).describe(
      'Can only be specified if VPC flow logs for this subnetwork is enabled and "metadata" was set to CUSTOM_METADATA.',
    ).optional(),
  }).describe("The available logging options for this subnetwork.").optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the resource, provided by the client when initially creating the resource. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  network: z.string().describe(
    "The URL of the network to which this subnetwork belongs, provided by the client when initially creating the subnetwork. This field can be set only at resource creation time.",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid.',
    ).optional(),
  }).describe("Additional subnetwork parameters.").optional(),
  privateIpGoogleAccess: z.boolean().describe(
    "Whether the VMs in this subnet can access Google services without assigned external IP addresses. This field can be both set at resource creation time and updated using setPrivateIpGoogleAccess.",
  ).optional(),
  privateIpv6GoogleAccess: z.enum([
    "DISABLE_GOOGLE_ACCESS",
    "ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE",
    "ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE",
  ]).describe(
    "This field is for internal use. This field can be both set at resource creation time and updated usingpatch.",
  ).optional(),
  purpose: z.enum([
    "GLOBAL_MANAGED_PROXY",
    "INTERNAL_HTTPS_LOAD_BALANCER",
    "PEER_MIGRATION",
    "PRIVATE",
    "PRIVATE_NAT",
    "PRIVATE_RFC_1918",
    "PRIVATE_SERVICE_CONNECT",
    "REGIONAL_MANAGED_PROXY",
  ]).optional(),
  region: z.string().describe(
    "URL of the region where the Subnetwork resides. This field can be set only at resource creation time.",
  ).optional(),
  reservedInternalRange: z.string().describe(
    "The URL of the reserved internal range.",
  ).optional(),
  resolveSubnetMask: z.enum(["ARP_ALL_RANGES", "ARP_PRIMARY_RANGE"]).describe(
    "Configures subnet mask resolution for this subnetwork.",
  ).optional(),
  role: z.enum(["ACTIVE", "BACKUP"]).describe(
    "The role of subnetwork. Currently, this field is only used when purpose is set to GLOBAL_MANAGED_PROXY orREGIONAL_MANAGED_PROXY. The value can be set toACTIVE or BACKUP. An ACTIVE subnetwork is one that is currently being used for Envoy-based load balancers in a region. A BACKUP subnetwork is one that is ready to be promoted to ACTIVE or is currently draining. This field can be updated with a patch request.",
  ).optional(),
  secondaryIpRanges: z.array(z.object({
    ipCidrRange: z.string().describe(
      "The range of IP addresses belonging to this subnetwork secondary range. Provide this property when you create the subnetwork. Ranges must be unique and non-overlapping with all primary and secondary IP ranges within a network. Both IPv4 and IPv6 ranges are supported. For IPv4, the range can be any range listed in theValid ranges list. For IPv6: The range must have a /64 prefix length. The range must be omitted, for auto-allocation from Google-defined ULA IPv6 range. For BYOGUA internal IPv6 secondary range, the range may be specified along with the `ipCollection` field. If an `ipCollection` is specified, the requested ip_cidr_range must lie within the range of the PDP referenced by the `ipCollection` field for allocation. If `ipCollection` field is specified, but ip_cidr_range is not, the range is auto-allocated from the PDP referenced by the `ipCollection` field.",
    ).optional(),
    rangeName: z.string().describe(
      "The name associated with this subnetwork secondary range, used when adding an alias IP/IPv6 range to a VM instance. The name must be 1-63 characters long, and comply withRFC1035. The name must be unique within the subnetwork.",
    ).optional(),
    reservedInternalRange: z.string().describe(
      "The URL of the reserved internal range. Only IPv4 is supported.",
    ).optional(),
  })).describe(
    "An array of configurations for secondary IP ranges for VM instances contained in this subnetwork. The primary IP of such VM must belong to the primary ipCidrRange of the subnetwork. The alias IPs may belong to either primary or secondary ranges. This field can be updated with apatch request. Supports both IPv4 and IPv6 ranges.",
  ).optional(),
  stackType: z.enum(["IPV4_IPV6", "IPV4_ONLY", "IPV6_ONLY"]).describe(
    "The stack type for the subnet. If set to IPV4_ONLY, new VMs in the subnet are assigned IPv4 addresses only. If set toIPV4_IPV6, new VMs in the subnet can be assigned both IPv4 and IPv6 addresses. If not specified, IPV4_ONLY is used. This field can be both set at resource creation time and updated usingpatch.",
  ).optional(),
  utilizationDetails: z.object({
    externalIpv6InstanceUtilization: z.object({
      totalAllocatedIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
      totalFreeIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
    }).describe("The IPV6 utilization of a single IP range.").optional(),
    externalIpv6LbUtilization: z.object({
      totalAllocatedIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
      totalFreeIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
    }).describe("The IPV6 utilization of a single IP range.").optional(),
    internalIpv6Utilization: z.object({
      totalAllocatedIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
      totalFreeIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
    }).describe("The IPV6 utilization of a single IP range.").optional(),
    ipv4Utilizations: z.array(z.object({
      rangeName: z.string().describe(
        "Will be set for secondary range. Empty for primary IPv4 range.",
      ).optional(),
      totalAllocatedIp: z.string().optional(),
      totalFreeIp: z.string().optional(),
    })).describe(
      "Utilizations of all IPV4 IP ranges. For primary ranges, the range name will be empty.",
    ).optional(),
  }).describe(
    "The current IP utilization of all subnetwork ranges. Contains the total number of allocated and free IPs in each range.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  allowSubnetCidrRoutesOverlap: z.boolean().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  enableFlowLogs: z.boolean().optional(),
  externalIpv6Prefix: z.string().optional(),
  fingerprint: z.string().optional(),
  gatewayAddress: z.string().optional(),
  id: z.string().optional(),
  internalIpv6Prefix: z.string().optional(),
  ipCidrRange: z.string().optional(),
  ipCollection: z.string().optional(),
  ipv6AccessType: z.string().optional(),
  ipv6CidrRange: z.string().optional(),
  ipv6GceEndpoint: z.string().optional(),
  kind: z.string().optional(),
  logConfig: z.object({
    aggregationInterval: z.string(),
    enable: z.boolean(),
    filterExpr: z.string(),
    flowSampling: z.number(),
    metadata: z.string(),
    metadataFields: z.array(z.string()),
  }).optional(),
  name: z.string(),
  network: z.string().optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  privateIpGoogleAccess: z.boolean().optional(),
  privateIpv6GoogleAccess: z.string().optional(),
  purpose: z.string().optional(),
  region: z.string().optional(),
  reservedInternalRange: z.string().optional(),
  resolveSubnetMask: z.string().optional(),
  role: z.string().optional(),
  secondaryIpRanges: z.array(z.object({
    ipCidrRange: z.string(),
    rangeName: z.string(),
    reservedInternalRange: z.string(),
  })).optional(),
  selfLink: z.string().optional(),
  stackType: z.string().optional(),
  state: z.string().optional(),
  systemReservedExternalIpv6Ranges: z.array(z.string()).optional(),
  systemReservedInternalIpv6Ranges: z.array(z.string()).optional(),
  utilizationDetails: z.object({
    externalIpv6InstanceUtilization: z.object({
      totalAllocatedIp: z.object({
        high: z.string(),
        low: z.string(),
      }),
      totalFreeIp: z.object({
        high: z.string(),
        low: z.string(),
      }),
    }),
    externalIpv6LbUtilization: z.object({
      totalAllocatedIp: z.object({
        high: z.string(),
        low: z.string(),
      }),
      totalFreeIp: z.object({
        high: z.string(),
        low: z.string(),
      }),
    }),
    internalIpv6Utilization: z.object({
      totalAllocatedIp: z.object({
        high: z.string(),
        low: z.string(),
      }),
      totalFreeIp: z.object({
        high: z.string(),
        low: z.string(),
      }),
    }),
    ipv4Utilizations: z.array(z.object({
      rangeName: z.string(),
      totalAllocatedIp: z.string(),
      totalFreeIp: z.string(),
    })),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  allowSubnetCidrRoutesOverlap: z.boolean().describe(
    "Whether this subnetwork's ranges can conflict with existing custom routes. Setting this to true allows this subnetwork's primary and secondary ranges to overlap with (and contain) custom routes that have already been configured on the corresponding network. For example if a static route has range 10.1.0.0/16, a subnet range 10.0.0.0/8 could only be created if allow_conflicting_routes=true. Overlapping is only allowed on subnetwork operations; routes whose ranges conflict with this subnetwork's ranges won't be allowed unless route.allow_conflicting_subnetworks is set to true. Typically packets destined to IPs within the subnetwork (which may contain private/sensitive data) are prevented from leaving the virtual network. Setting this field to true will disable this feature. The default value is false and applies to all existing subnetworks and automatically created subnetworks.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource. This field can be set only at resource creation time.",
  ).optional(),
  enableFlowLogs: z.boolean().describe(
    "Whether to enable flow logging for this subnetwork. If this field is not explicitly set, it will not appear in get listings. If not set the default behavior is determined by the org policy, if there is no org policy specified, then it will default to disabled. This field isn't supported if the subnet purpose field is set toREGIONAL_MANAGED_PROXY. It is recommended to uselogConfig.enable field instead.",
  ).optional(),
  externalIpv6Prefix: z.string().describe(
    "The external IPv6 address range that is owned by this subnetwork.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a Subnetwork. An up-to-date fingerprint must be provided in order to update the Subnetwork, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a Subnetwork.",
  ).optional(),
  internalIpv6Prefix: z.string().describe(
    "The internal IPv6 address range that is owned by this subnetwork.",
  ).optional(),
  ipCidrRange: z.string().describe(
    "The range of internal addresses that are owned by this subnetwork. Provide this property when you create the subnetwork. For example,10.0.0.0/8 or 100.64.0.0/10. Ranges must be unique and non-overlapping within a network. Only IPv4 is supported. This field is set at resource creation time. The range can be any range listed in theValid ranges list. The range can be expanded after creation usingexpandIpCidrRange.",
  ).optional(),
  ipCollection: z.string().describe(
    "Reference to the source of IP, like a PublicDelegatedPrefix (PDP) for BYOIP. The PDP must be a sub-PDP in EXTERNAL_IPV6_SUBNETWORK_CREATION or INTERNAL_IPV6_SUBNETWORK_CREATION mode. Use one of the following formats to specify a sub-PDP when creating a dual stack or IPv6-only subnetwork with external access using BYOIP: - Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name - Partial URL, as in - projects/projectId/regions/region/publicDelegatedPrefixes/sub-pdp-name - regions/region/publicDelegatedPrefixes/sub-pdp-name",
  ).optional(),
  ipv6AccessType: z.enum(["EXTERNAL", "INTERNAL"]).describe(
    "The access type of IPv6 address this subnet holds. It's immutable and can only be specified during creation or the first time the subnet is updated into IPV4_IPV6 dual stack.",
  ).optional(),
  logConfig: z.object({
    aggregationInterval: z.enum([
      "INTERVAL_10_MIN",
      "INTERVAL_15_MIN",
      "INTERVAL_1_MIN",
      "INTERVAL_30_SEC",
      "INTERVAL_5_MIN",
      "INTERVAL_5_SEC",
    ]).describe(
      "Can only be specified if VPC flow logging for this subnetwork is enabled. Toggles the aggregation interval for collecting flow logs. Increasing the interval time will reduce the amount of generated flow logs for long lasting connections. Default is an interval of 5 seconds per connection.",
    ).optional(),
    enable: z.boolean().describe(
      "Whether to enable flow logging for this subnetwork. If this field is not explicitly set, it will not appear in get listings. If not set the default behavior is determined by the org policy, if there is no org policy specified, then it will default to disabled. Flow logging isn't supported if the subnet purpose field is set to REGIONAL_MANAGED_PROXY.",
    ).optional(),
    filterExpr: z.string().describe(
      "Can only be specified if VPC flow logs for this subnetwork is enabled. The filter expression is used to define which VPC flow logs should be exported to Cloud Logging.",
    ).optional(),
    flowSampling: z.number().describe(
      "Can only be specified if VPC flow logging for this subnetwork is enabled. The value of the field must be in [0, 1]. Set the sampling rate of VPC flow logs within the subnetwork where 1.0 means all collected logs are reported and 0.0 means no logs are reported. Default is 0.5 unless otherwise specified by the org policy, which means half of all collected logs are reported.",
    ).optional(),
    metadata: z.enum([
      "CUSTOM_METADATA",
      "EXCLUDE_ALL_METADATA",
      "INCLUDE_ALL_METADATA",
    ]).describe(
      "Can only be specified if VPC flow logs for this subnetwork is enabled. Configures whether all, none or a subset of metadata fields should be added to the reported VPC flow logs. Default isEXCLUDE_ALL_METADATA.",
    ).optional(),
    metadataFields: z.array(z.string()).describe(
      'Can only be specified if VPC flow logs for this subnetwork is enabled and "metadata" was set to CUSTOM_METADATA.',
    ).optional(),
  }).describe("The available logging options for this subnetwork.").optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "The name of the resource, provided by the client when initially creating the resource. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  network: z.string().describe(
    "The URL of the network to which this subnetwork belongs, provided by the client when initially creating the subnetwork. This field can be set only at resource creation time.",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      'Tag keys/values directly bound to this resource. Tag keys and values have the same definition as resource manager tags. The field is allowed for INSERT only. The keys/values to set on the resource should be specified in either ID {: } or Namespaced format {: }. For example the following are valid inputs: * {"tagKeys/333": "tagValues/444", "tagKeys/123": "tagValues/456"} * {"123/environment": "production", "345/abc": "xyz"} Note: * Invalid combinations of ID & namespaced format is not supported. For instance: {"123/environment": "tagValues/444"} is invalid.',
    ).optional(),
  }).describe("Additional subnetwork parameters.").optional(),
  privateIpGoogleAccess: z.boolean().describe(
    "Whether the VMs in this subnet can access Google services without assigned external IP addresses. This field can be both set at resource creation time and updated using setPrivateIpGoogleAccess.",
  ).optional(),
  privateIpv6GoogleAccess: z.enum([
    "DISABLE_GOOGLE_ACCESS",
    "ENABLE_BIDIRECTIONAL_ACCESS_TO_GOOGLE",
    "ENABLE_OUTBOUND_VM_ACCESS_TO_GOOGLE",
  ]).describe(
    "This field is for internal use. This field can be both set at resource creation time and updated usingpatch.",
  ).optional(),
  purpose: z.enum([
    "GLOBAL_MANAGED_PROXY",
    "INTERNAL_HTTPS_LOAD_BALANCER",
    "PEER_MIGRATION",
    "PRIVATE",
    "PRIVATE_NAT",
    "PRIVATE_RFC_1918",
    "PRIVATE_SERVICE_CONNECT",
    "REGIONAL_MANAGED_PROXY",
  ]).optional(),
  region: z.string().describe(
    "URL of the region where the Subnetwork resides. This field can be set only at resource creation time.",
  ).optional(),
  reservedInternalRange: z.string().describe(
    "The URL of the reserved internal range.",
  ).optional(),
  resolveSubnetMask: z.enum(["ARP_ALL_RANGES", "ARP_PRIMARY_RANGE"]).describe(
    "Configures subnet mask resolution for this subnetwork.",
  ).optional(),
  role: z.enum(["ACTIVE", "BACKUP"]).describe(
    "The role of subnetwork. Currently, this field is only used when purpose is set to GLOBAL_MANAGED_PROXY orREGIONAL_MANAGED_PROXY. The value can be set toACTIVE or BACKUP. An ACTIVE subnetwork is one that is currently being used for Envoy-based load balancers in a region. A BACKUP subnetwork is one that is ready to be promoted to ACTIVE or is currently draining. This field can be updated with a patch request.",
  ).optional(),
  secondaryIpRanges: z.array(z.object({
    ipCidrRange: z.string().describe(
      "The range of IP addresses belonging to this subnetwork secondary range. Provide this property when you create the subnetwork. Ranges must be unique and non-overlapping with all primary and secondary IP ranges within a network. Both IPv4 and IPv6 ranges are supported. For IPv4, the range can be any range listed in theValid ranges list. For IPv6: The range must have a /64 prefix length. The range must be omitted, for auto-allocation from Google-defined ULA IPv6 range. For BYOGUA internal IPv6 secondary range, the range may be specified along with the `ipCollection` field. If an `ipCollection` is specified, the requested ip_cidr_range must lie within the range of the PDP referenced by the `ipCollection` field for allocation. If `ipCollection` field is specified, but ip_cidr_range is not, the range is auto-allocated from the PDP referenced by the `ipCollection` field.",
    ).optional(),
    rangeName: z.string().describe(
      "The name associated with this subnetwork secondary range, used when adding an alias IP/IPv6 range to a VM instance. The name must be 1-63 characters long, and comply withRFC1035. The name must be unique within the subnetwork.",
    ).optional(),
    reservedInternalRange: z.string().describe(
      "The URL of the reserved internal range. Only IPv4 is supported.",
    ).optional(),
  })).describe(
    "An array of configurations for secondary IP ranges for VM instances contained in this subnetwork. The primary IP of such VM must belong to the primary ipCidrRange of the subnetwork. The alias IPs may belong to either primary or secondary ranges. This field can be updated with apatch request. Supports both IPv4 and IPv6 ranges.",
  ).optional(),
  stackType: z.enum(["IPV4_IPV6", "IPV4_ONLY", "IPV6_ONLY"]).describe(
    "The stack type for the subnet. If set to IPV4_ONLY, new VMs in the subnet are assigned IPv4 addresses only. If set toIPV4_IPV6, new VMs in the subnet can be assigned both IPv4 and IPv6 addresses. If not specified, IPV4_ONLY is used. This field can be both set at resource creation time and updated usingpatch.",
  ).optional(),
  utilizationDetails: z.object({
    externalIpv6InstanceUtilization: z.object({
      totalAllocatedIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
      totalFreeIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
    }).describe("The IPV6 utilization of a single IP range.").optional(),
    externalIpv6LbUtilization: z.object({
      totalAllocatedIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
      totalFreeIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
    }).describe("The IPV6 utilization of a single IP range.").optional(),
    internalIpv6Utilization: z.object({
      totalAllocatedIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
      totalFreeIp: z.object({
        high: z.string().optional(),
        low: z.string().optional(),
      }).optional(),
    }).describe("The IPV6 utilization of a single IP range.").optional(),
    ipv4Utilizations: z.array(z.object({
      rangeName: z.string().describe(
        "Will be set for secondary range. Empty for primary IPv4 range.",
      ).optional(),
      totalAllocatedIp: z.string().optional(),
      totalFreeIp: z.string().optional(),
    })).describe(
      "Utilizations of all IPV4 IP ranges. For primary ranges, the range name will be empty.",
    ).optional(),
  }).describe(
    "The current IP utilization of all subnetwork ranges. Contains the total number of allocated and free IPs in each range.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine Subnetworks. Registered at `@swamp/gcp/compute/subnetworks`. */
export const model = {
  type: "@swamp/gcp/compute/subnetworks",
  version: "2026.05.19.2",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Subnetwork resource. A subnetwork (also known as a subnet) is a ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a subnetworks",
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
        if (g["allowSubnetCidrRoutesOverlap"] !== undefined) {
          body["allowSubnetCidrRoutesOverlap"] =
            g["allowSubnetCidrRoutesOverlap"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableFlowLogs"] !== undefined) {
          body["enableFlowLogs"] = g["enableFlowLogs"];
        }
        if (g["externalIpv6Prefix"] !== undefined) {
          body["externalIpv6Prefix"] = g["externalIpv6Prefix"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["internalIpv6Prefix"] !== undefined) {
          body["internalIpv6Prefix"] = g["internalIpv6Prefix"];
        }
        if (g["ipCidrRange"] !== undefined) {
          body["ipCidrRange"] = g["ipCidrRange"];
        }
        if (g["ipCollection"] !== undefined) {
          body["ipCollection"] = g["ipCollection"];
        }
        if (g["ipv6AccessType"] !== undefined) {
          body["ipv6AccessType"] = g["ipv6AccessType"];
        }
        if (g["logConfig"] !== undefined) body["logConfig"] = g["logConfig"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["privateIpGoogleAccess"] !== undefined) {
          body["privateIpGoogleAccess"] = g["privateIpGoogleAccess"];
        }
        if (g["privateIpv6GoogleAccess"] !== undefined) {
          body["privateIpv6GoogleAccess"] = g["privateIpv6GoogleAccess"];
        }
        if (g["purpose"] !== undefined) body["purpose"] = g["purpose"];
        if (g["reservedInternalRange"] !== undefined) {
          body["reservedInternalRange"] = g["reservedInternalRange"];
        }
        if (g["resolveSubnetMask"] !== undefined) {
          body["resolveSubnetMask"] = g["resolveSubnetMask"];
        }
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["secondaryIpRanges"] !== undefined) {
          body["secondaryIpRanges"] = g["secondaryIpRanges"];
        }
        if (g["stackType"] !== undefined) body["stackType"] = g["stackType"];
        if (g["utilizationDetails"] !== undefined) {
          body["utilizationDetails"] = g["utilizationDetails"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["subnetwork"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["READY"],
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
      description: "Get a subnetworks",
      arguments: z.object({
        identifier: z.string().describe("The name of the subnetworks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["subnetwork"] = args.identifier;
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
      description: "Update subnetworks attributes",
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
        params["subnetwork"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["allowSubnetCidrRoutesOverlap"] !== undefined) {
          body["allowSubnetCidrRoutesOverlap"] =
            g["allowSubnetCidrRoutesOverlap"];
        }
        if (g["enableFlowLogs"] !== undefined) {
          body["enableFlowLogs"] = g["enableFlowLogs"];
        }
        if (g["externalIpv6Prefix"] !== undefined) {
          body["externalIpv6Prefix"] = g["externalIpv6Prefix"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["internalIpv6Prefix"] !== undefined) {
          body["internalIpv6Prefix"] = g["internalIpv6Prefix"];
        }
        if (g["ipCollection"] !== undefined) {
          body["ipCollection"] = g["ipCollection"];
        }
        if (g["logConfig"] !== undefined) body["logConfig"] = g["logConfig"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["privateIpGoogleAccess"] !== undefined) {
          body["privateIpGoogleAccess"] = g["privateIpGoogleAccess"];
        }
        if (g["privateIpv6GoogleAccess"] !== undefined) {
          body["privateIpv6GoogleAccess"] = g["privateIpv6GoogleAccess"];
        }
        if (g["purpose"] !== undefined) body["purpose"] = g["purpose"];
        if (g["reservedInternalRange"] !== undefined) {
          body["reservedInternalRange"] = g["reservedInternalRange"];
        }
        if (g["resolveSubnetMask"] !== undefined) {
          body["resolveSubnetMask"] = g["resolveSubnetMask"];
        }
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["secondaryIpRanges"] !== undefined) {
          body["secondaryIpRanges"] = g["secondaryIpRanges"];
        }
        if (g["stackType"] !== undefined) body["stackType"] = g["stackType"];
        if (g["utilizationDetails"] !== undefined) {
          body["utilizationDetails"] = g["utilizationDetails"];
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
              "readyValues": ["READY"],
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
      description: "Delete the subnetworks",
      arguments: z.object({
        identifier: z.string().describe("The name of the subnetworks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["subnetwork"] = args.identifier;
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
      description: "Sync subnetworks state from GCP",
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
          params["subnetwork"] = identifier;
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
    expand_ip_cidr_range: {
      description: "expand ip cidr range",
      arguments: z.object({
        ipCidrRange: z.any().optional(),
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
        params["subnetwork"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["ipCidrRange"] !== undefined) {
          body["ipCidrRange"] = args["ipCidrRange"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.subnetworks.expandIpCidrRange",
            "path":
              "projects/{project}/regions/{region}/subnetworks/{subnetwork}/expandIpCidrRange",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "subnetwork"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "subnetwork": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_usable: {
      description: "list usable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.subnetworks.listUsable",
            "path": "projects/{project}/aggregated/subnetworks/listUsable",
            "httpMethod": "GET",
            "parameterOrder": ["project"],
            "parameters": {
              "filter": { "location": "query" },
              "maxResults": { "location": "query" },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "project": { "location": "path", "required": true },
              "returnPartialSuccess": { "location": "query" },
              "serviceProject": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_private_ip_google_access: {
      description: "set private ip google access",
      arguments: z.object({
        privateIpGoogleAccess: z.any().optional(),
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
        params["subnetwork"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["privateIpGoogleAccess"] !== undefined) {
          body["privateIpGoogleAccess"] = args["privateIpGoogleAccess"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.subnetworks.setPrivateIpGoogleAccess",
            "path":
              "projects/{project}/regions/{region}/subnetworks/{subnetwork}/setPrivateIpGoogleAccess",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "subnetwork"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "subnetwork": { "location": "path", "required": true },
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
