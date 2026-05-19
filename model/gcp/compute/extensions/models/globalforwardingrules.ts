// Auto-generated extension model for @swamp/gcp/compute/globalforwardingrules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine GlobalForwardingRules.
 *
 * Represents a Forwarding Rule resource. Forwarding rule resources in Google Cloud can be either regional or global in scope: * [Global](https://cloud.google.com/compute/docs/reference/rest/v1/globalForwardingRules) * [Regional](https://cloud.google.com/compute/docs/reference/rest/v1/forwardingRules) A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Forwarding rules can also reference target instances and Cloud VPN Classic gateways (targetVpnGateway). For more information, read Forwarding rule concepts and Using protocol forwarding.
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
  "id": "compute.globalForwardingRules.get",
  "path": "projects/{project}/global/forwardingRules/{forwardingRule}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "forwardingRule",
  ],
  "parameters": {
    "forwardingRule": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.globalForwardingRules.insert",
  "path": "projects/{project}/global/forwardingRules",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.globalForwardingRules.patch",
  "path": "projects/{project}/global/forwardingRules/{forwardingRule}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "forwardingRule",
  ],
  "parameters": {
    "forwardingRule": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.globalForwardingRules.delete",
  "path": "projects/{project}/global/forwardingRules/{forwardingRule}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "forwardingRule",
  ],
  "parameters": {
    "forwardingRule": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  IPAddress: z.string().describe(
    "IP address for which this forwarding rule accepts traffic. When a client sends traffic to this IP address, the forwarding rule directs the traffic to the referenced target or backendService. While creating a forwarding rule, specifying an IPAddress is required under the following circumstances: - When the target is set to targetGrpcProxy andvalidateForProxyless is set to true, theIPAddress should be set to 0.0.0.0. - When the target is a Private Service Connect Google APIs bundle, you must specify an IPAddress. Otherwise, you can optionally specify an IP address that references an existing static (reserved) IP address resource. When omitted, Google Cloud assigns an ephemeral IP address. Use one of the following formats to specify an IP address while creating a forwarding rule: * IP address number, as in `100.1.2.3` * IPv6 address range, as in `2600:1234::/96` * Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/project_id/regions/region/addresses/address-name * Partial URL or by name, as in: - projects/project_id/regions/region/addresses/address-name - regions/region/addresses/address-name - global/addresses/address-name - address-name The forwarding rule's target or backendService, and in most cases, also the loadBalancingScheme, determine the type of IP address that you can use. For detailed information, see [IP address specifications](https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts#ip_address_specifications). When reading an IPAddress, the API always returns the IP address number.",
  ).optional(),
  IPProtocol: z.enum(["AH", "ESP", "ICMP", "L3_DEFAULT", "SCTP", "TCP", "UDP"])
    .describe(
      "The IP protocol to which this rule applies. For protocol forwarding, valid options are TCP, UDP, ESP,AH, SCTP, ICMP andL3_DEFAULT. The valid IP protocols are different for different load balancing products as described in [Load balancing features](https://cloud.google.com/load-balancing/docs/features#protocols_from_the_load_balancer_to_the_backends).",
    ).optional(),
  allPorts: z.boolean().describe(
    "The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The allPorts field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, SCTP, or L3_DEFAULT. - It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal and external protocol forwarding. - Set this field to true to allow packets addressed to any port or packets lacking destination port information (for example, UDP fragments after the first fragment) to be forwarded to the backends configured with this forwarding rule. The L3_DEFAULT protocol requiresallPorts be set to true.",
  ).optional(),
  allowGlobalAccess: z.boolean().describe(
    "If set to true, clients can access the internal passthrough Network Load Balancers, the regional internal Application Load Balancer, and the regional internal proxy Network Load Balancer from all regions. If false, only allows access from the local region the load balancer is located at. Note that for INTERNAL_MANAGED forwarding rules, this field cannot be changed after the forwarding rule is created.",
  ).optional(),
  allowPscGlobalAccess: z.boolean().describe(
    "This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region.",
  ).optional(),
  backendService: z.string().describe(
    "Identifies the backend service to which the forwarding rule sends traffic. Required for internal and external passthrough Network Load Balancers; must be omitted for all other load balancer types.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  externalManagedBackendBucketMigrationState: z.enum([
    "PREPARE",
    "TEST_ALL_TRAFFIC",
    "TEST_BY_PERCENTAGE",
  ]).describe(
    "Specifies the canary migration state for the backend buckets attached to this forwarding rule. Possible values are PREPARE, TEST_BY_PERCENTAGE, and TEST_ALL_TRAFFIC. To begin the migration from EXTERNAL to EXTERNAL_MANAGED, the state must be changed to PREPARE. The state must be changed to TEST_ALL_TRAFFIC before the loadBalancingScheme can be changed to EXTERNAL_MANAGED. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate traffic to backend buckets attached to this forwarding rule by percentage using externalManagedBackendBucketMigrationTestingPercentage. Rolling back a migration requires the states to be set in reverse order. So changing the scheme from EXTERNAL_MANAGED to EXTERNAL requires the state to be set to TEST_ALL_TRAFFIC at the same time. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate some traffic back to EXTERNAL or PREPARE can be used to migrate all traffic back to EXTERNAL.",
  ).optional(),
  externalManagedBackendBucketMigrationTestingPercentage: z.number().describe(
    "Determines the fraction of requests to backend buckets that should be processed by the global external Application Load Balancer. The value of this field must be in the range [0, 100]. This value can only be set if the loadBalancingScheme in the BackendService is set to EXTERNAL (when using the classic Application Load Balancer) and the migration state is TEST_BY_PERCENTAGE.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ForwardingRule. Include the fingerprint in patch request to ensure that you do not overwrite changes that were applied from another concurrent request. To see the latest fingerprint, make a get() request to retrieve a ForwardingRule.",
  ).optional(),
  ipCollection: z.string().describe(
    "Resource reference of a PublicDelegatedPrefix. The PDP must be a sub-PDP in EXTERNAL_IPV6_FORWARDING_RULE_CREATION mode. Use one of the following formats to specify a sub-PDP when creating an IPv6 NetLB forwarding rule using BYOIP: Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/project_id/regions/region/publicDelegatedPrefixes/sub-pdp-name Partial URL, as in: - projects/project_id/regions/region/publicDelegatedPrefixes/sub-pdp-name - regions/region/publicDelegatedPrefixes/sub-pdp-name",
  ).optional(),
  ipVersion: z.enum(["IPV4", "IPV6", "UNSPECIFIED_VERSION"]).describe(
    "The IP Version that will be used by this forwarding rule. Valid options are IPV4 or IPV6.",
  ).optional(),
  isMirroringCollector: z.boolean().describe(
    "Indicates whether or not this load balancer can be used as a collector for packet mirroring. To prevent mirroring loops, instances behind this load balancer will not have their traffic mirrored even if aPacketMirroring rule applies to them. This can only be set to true for load balancers that have theirloadBalancingScheme set to INTERNAL.",
  ).optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this resource, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a ForwardingRule.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty.",
  ).optional(),
  loadBalancingScheme: z.enum([
    "EXTERNAL",
    "EXTERNAL_MANAGED",
    "INTERNAL",
    "INTERNAL_MANAGED",
    "INTERNAL_SELF_MANAGED",
    "INVALID",
  ]).describe(
    "Specifies the forwarding rule type. For more information about forwarding rules, refer to Forwarding rule concepts.",
  ).optional(),
  metadataFilters: z.array(z.object({
    filterLabels: z.array(z.object({
      name: z.string().describe(
        "Name of metadata label. The name can have a maximum length of 1024 characters and must be at least 1 character long.",
      ).optional(),
      value: z.string().describe(
        "The value of the label must match the specified value. value can have a maximum length of 1024 characters.",
      ).optional(),
    })).describe(
      "The list of label value pairs that must match labels in the provided metadata based on filterMatchCriteria This list must not be empty and can have at the most 64 entries.",
    ).optional(),
    filterMatchCriteria: z.enum(["MATCH_ALL", "MATCH_ANY", "NOT_SET"]).describe(
      "Specifies how individual filter label matches within the list of filterLabels and contributes toward the overall metadataFilter match. Supported values are: - MATCH_ANY: at least one of the filterLabels must have a matching label in the provided metadata. - MATCH_ALL: all filterLabels must have matching labels in the provided metadata.",
    ).optional(),
  })).describe(
    "Opaque filter criteria used by load balancer to restrict routing configuration to a limited set of xDS compliant clients. In their xDS requests to load balancer, xDS clients present node metadata. When there is a match, the relevant configuration is made available to those proxies. Otherwise, all the resources (e.g.TargetHttpProxy, UrlMap) referenced by the ForwardingRule are not visible to those proxies. For each metadataFilter in this list, if itsfilterMatchCriteria is set to MATCH_ANY, at least one of thefilterLabels must match the corresponding label provided in the metadata. If its filterMatchCriteria is set to MATCH_ALL, then all of its filterLabels must match with corresponding labels provided in the metadata. If multiplemetadataFilters are specified, all of them need to be satisfied in order to be considered a match. metadataFilters specified here will be applifed before those specified in the UrlMap that thisForwardingRule references. metadataFilters only applies to Loadbalancers that have their loadBalancingScheme set toINTERNAL_SELF_MANAGED.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. For Private Service Connect forwarding rules that forward traffic to Google APIs, the forwarding rule name must be a 1-20 characters string with lowercase letters and numbers and must start with a letter.",
    ).optional(),
  network: z.string().describe(
    "This field is not used for global external load balancing. For internal passthrough Network Load Balancers, this field identifies the network that the load balanced IP should belong to for this forwarding rule. If the subnetwork is specified, the network of the subnetwork will be used. If neither subnetwork nor this field is specified, the default network will be used. For Private Service Connect forwarding rules that forward traffic to Google APIs, a network must be provided.",
  ).optional(),
  networkTier: z.enum([
    "FIXED_STANDARD",
    "PREMIUM",
    "STANDARD",
    "STANDARD_OVERRIDES_FIXED_STANDARD",
  ]).describe(
    "This signifies the networking tier used for configuring this load balancer and can only take the following values:PREMIUM, STANDARD. For regional ForwardingRule, the valid values are PREMIUM andSTANDARD. For GlobalForwardingRule, the valid value isPREMIUM. If this field is not specified, it is assumed to be PREMIUM. If IPAddress is specified, this value must be equal to the networkTier of the Address.",
  ).optional(),
  noAutomateDnsZone: z.boolean().describe(
    "This is used in PSC consumer ForwardingRule to control whether it should try to auto-generate a DNS zone or not. Non-PSC forwarding rules do not use this field. Once set, this field is not mutable.",
  ).optional(),
  portRange: z.string().describe(
    "The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The portRange field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, or SCTP, and - It's applicable only to the following products: external passthrough Network Load Balancers, internal and external proxy Network Load Balancers, internal and external Application Load Balancers, external protocol forwarding, and Classic VPN. - Some products have restrictions on what ports can be used. See port specifications for details. For external forwarding rules, two or more forwarding rules cannot use the same [IPAddress, IPProtocol] pair, and cannot have overlappingportRanges. For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same [IPAddress, IPProtocol] pair, and cannot have overlapping portRanges. @pattern: \\\\d+(?:-\\\\d+)?",
  ).optional(),
  ports: z.array(z.string()).describe(
    "The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The ports field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, or SCTP, and - It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal protocol forwarding. - You can specify a list of up to five ports by number, separated by commas. The ports can be contiguous or discontiguous. For external forwarding rules, two or more forwarding rules cannot use the same [IPAddress, IPProtocol] pair if they share at least one port number. For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same [IPAddress, IPProtocol] pair if they share at least one port number. @pattern: \\\\d+(?:-\\\\d+)?",
  ).optional(),
  pscConnectionStatus: z.enum([
    "ACCEPTED",
    "CLOSED",
    "NEEDS_ATTENTION",
    "PENDING",
    "REJECTED",
    "STATUS_UNSPECIFIED",
  ]).optional(),
  serviceDirectoryRegistrations: z.array(z.object({
    namespace: z.string().describe(
      "Service Directory namespace to register the forwarding rule under.",
    ).optional(),
    service: z.string().describe(
      "Service Directory service to register the forwarding rule under.",
    ).optional(),
    serviceDirectoryRegion: z.string().describe(
      '[Optional] Service Directory region to register this global forwarding rule under. Default to "us-central1". Only used for PSC for Google APIs. All PSC for Google APIs forwarding rules on the same network should use the same Service Directory region.',
    ).optional(),
  })).describe(
    "Service Directory resources to register this forwarding rule with. Currently, only supports a single Service Directory resource.",
  ).optional(),
  serviceLabel: z.string().regex(
    new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"),
  ).describe(
    "An optional prefix to the service name for this forwarding rule. If specified, the prefix is the first label of the fully qualified service name. The label must be 1-63 characters long, and comply withRFC1035. Specifically, the label must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. This field is only used for internal load balancing.",
  ).optional(),
  sourceIpRanges: z.array(z.string()).describe(
    "If not empty, this forwarding rule will only forward the traffic when the source IP address matches one of the IP addresses or CIDR ranges set here. Note that a forwarding rule can only have up to 64 source IP ranges, and this field can only be used with a regional forwarding rule whose scheme isEXTERNAL. Each source_ip_range entry should be either an IP address (for example, 1.2.3.4) or a CIDR range (for example, 1.2.3.0/24).",
  ).optional(),
  subnetwork: z.string().describe(
    "This field identifies the subnetwork that the load balanced IP should belong to for this forwarding rule, used with internal load balancers and external passthrough Network Load Balancers with IPv6. If the network specified is in auto subnet mode, this field is optional. However, a subnetwork must be specified if the network is in custom subnet mode or when creating external forwarding rule with IPv6.",
  ).optional(),
  target: z.string().describe(
    'The URL of the target resource to receive the matched traffic. For regional forwarding rules, this target must be in the same region as the forwarding rule. For global forwarding rules, this target must be a global load balancing resource. The forwarded traffic must be of a type appropriate to the target object. - For load balancers, see the "Target" column in [Port specifications](https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts#ip_address_specifications). - For Private Service Connect forwarding rules that forward traffic to Google APIs, provide the name of a supported Google API bundle: - vpc-sc - APIs that support VPC Service Controls. - all-apis - All supported Google APIs. - For Private Service Connect forwarding rules that forward traffic to managed services, the target must be a service attachment. The target is not mutable once set as a service attachment.',
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  IPAddress: z.string().optional(),
  IPProtocol: z.string().optional(),
  allPorts: z.boolean().optional(),
  allowGlobalAccess: z.boolean().optional(),
  allowPscGlobalAccess: z.boolean().optional(),
  backendService: z.string().optional(),
  baseForwardingRule: z.string().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  externalManagedBackendBucketMigrationState: z.string().optional(),
  externalManagedBackendBucketMigrationTestingPercentage: z.number().optional(),
  fingerprint: z.string().optional(),
  id: z.string().optional(),
  ipCollection: z.string().optional(),
  ipVersion: z.string().optional(),
  isMirroringCollector: z.boolean().optional(),
  kind: z.string().optional(),
  labelFingerprint: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  loadBalancingScheme: z.string().optional(),
  metadataFilters: z.array(z.object({
    filterLabels: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
    filterMatchCriteria: z.string(),
  })).optional(),
  name: z.string(),
  network: z.string().optional(),
  networkTier: z.string().optional(),
  noAutomateDnsZone: z.boolean().optional(),
  portRange: z.string().optional(),
  ports: z.array(z.string()).optional(),
  pscConnectionId: z.string().optional(),
  pscConnectionStatus: z.string().optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  serviceDirectoryRegistrations: z.array(z.object({
    namespace: z.string(),
    service: z.string(),
    serviceDirectoryRegion: z.string(),
  })).optional(),
  serviceLabel: z.string().optional(),
  serviceName: z.string().optional(),
  sourceIpRanges: z.array(z.string()).optional(),
  subnetwork: z.string().optional(),
  target: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  IPAddress: z.string().describe(
    "IP address for which this forwarding rule accepts traffic. When a client sends traffic to this IP address, the forwarding rule directs the traffic to the referenced target or backendService. While creating a forwarding rule, specifying an IPAddress is required under the following circumstances: - When the target is set to targetGrpcProxy andvalidateForProxyless is set to true, theIPAddress should be set to 0.0.0.0. - When the target is a Private Service Connect Google APIs bundle, you must specify an IPAddress. Otherwise, you can optionally specify an IP address that references an existing static (reserved) IP address resource. When omitted, Google Cloud assigns an ephemeral IP address. Use one of the following formats to specify an IP address while creating a forwarding rule: * IP address number, as in `100.1.2.3` * IPv6 address range, as in `2600:1234::/96` * Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/project_id/regions/region/addresses/address-name * Partial URL or by name, as in: - projects/project_id/regions/region/addresses/address-name - regions/region/addresses/address-name - global/addresses/address-name - address-name The forwarding rule's target or backendService, and in most cases, also the loadBalancingScheme, determine the type of IP address that you can use. For detailed information, see [IP address specifications](https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts#ip_address_specifications). When reading an IPAddress, the API always returns the IP address number.",
  ).optional(),
  IPProtocol: z.enum(["AH", "ESP", "ICMP", "L3_DEFAULT", "SCTP", "TCP", "UDP"])
    .describe(
      "The IP protocol to which this rule applies. For protocol forwarding, valid options are TCP, UDP, ESP,AH, SCTP, ICMP andL3_DEFAULT. The valid IP protocols are different for different load balancing products as described in [Load balancing features](https://cloud.google.com/load-balancing/docs/features#protocols_from_the_load_balancer_to_the_backends).",
    ).optional(),
  allPorts: z.boolean().describe(
    "The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The allPorts field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, SCTP, or L3_DEFAULT. - It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal and external protocol forwarding. - Set this field to true to allow packets addressed to any port or packets lacking destination port information (for example, UDP fragments after the first fragment) to be forwarded to the backends configured with this forwarding rule. The L3_DEFAULT protocol requiresallPorts be set to true.",
  ).optional(),
  allowGlobalAccess: z.boolean().describe(
    "If set to true, clients can access the internal passthrough Network Load Balancers, the regional internal Application Load Balancer, and the regional internal proxy Network Load Balancer from all regions. If false, only allows access from the local region the load balancer is located at. Note that for INTERNAL_MANAGED forwarding rules, this field cannot be changed after the forwarding rule is created.",
  ).optional(),
  allowPscGlobalAccess: z.boolean().describe(
    "This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region.",
  ).optional(),
  backendService: z.string().describe(
    "Identifies the backend service to which the forwarding rule sends traffic. Required for internal and external passthrough Network Load Balancers; must be omitted for all other load balancer types.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  externalManagedBackendBucketMigrationState: z.enum([
    "PREPARE",
    "TEST_ALL_TRAFFIC",
    "TEST_BY_PERCENTAGE",
  ]).describe(
    "Specifies the canary migration state for the backend buckets attached to this forwarding rule. Possible values are PREPARE, TEST_BY_PERCENTAGE, and TEST_ALL_TRAFFIC. To begin the migration from EXTERNAL to EXTERNAL_MANAGED, the state must be changed to PREPARE. The state must be changed to TEST_ALL_TRAFFIC before the loadBalancingScheme can be changed to EXTERNAL_MANAGED. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate traffic to backend buckets attached to this forwarding rule by percentage using externalManagedBackendBucketMigrationTestingPercentage. Rolling back a migration requires the states to be set in reverse order. So changing the scheme from EXTERNAL_MANAGED to EXTERNAL requires the state to be set to TEST_ALL_TRAFFIC at the same time. Optionally, the TEST_BY_PERCENTAGE state can be used to migrate some traffic back to EXTERNAL or PREPARE can be used to migrate all traffic back to EXTERNAL.",
  ).optional(),
  externalManagedBackendBucketMigrationTestingPercentage: z.number().describe(
    "Determines the fraction of requests to backend buckets that should be processed by the global external Application Load Balancer. The value of this field must be in the range [0, 100]. This value can only be set if the loadBalancingScheme in the BackendService is set to EXTERNAL (when using the classic Application Load Balancer) and the migration state is TEST_BY_PERCENTAGE.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ForwardingRule. Include the fingerprint in patch request to ensure that you do not overwrite changes that were applied from another concurrent request. To see the latest fingerprint, make a get() request to retrieve a ForwardingRule.",
  ).optional(),
  ipCollection: z.string().describe(
    "Resource reference of a PublicDelegatedPrefix. The PDP must be a sub-PDP in EXTERNAL_IPV6_FORWARDING_RULE_CREATION mode. Use one of the following formats to specify a sub-PDP when creating an IPv6 NetLB forwarding rule using BYOIP: Full resource URL, as inhttps://www.googleapis.com/compute/v1/projects/project_id/regions/region/publicDelegatedPrefixes/sub-pdp-name Partial URL, as in: - projects/project_id/regions/region/publicDelegatedPrefixes/sub-pdp-name - regions/region/publicDelegatedPrefixes/sub-pdp-name",
  ).optional(),
  ipVersion: z.enum(["IPV4", "IPV6", "UNSPECIFIED_VERSION"]).describe(
    "The IP Version that will be used by this forwarding rule. Valid options are IPV4 or IPV6.",
  ).optional(),
  isMirroringCollector: z.boolean().describe(
    "Indicates whether or not this load balancer can be used as a collector for packet mirroring. To prevent mirroring loops, instances behind this load balancer will not have their traffic mirrored even if aPacketMirroring rule applies to them. This can only be set to true for load balancers that have theirloadBalancingScheme set to INTERNAL.",
  ).optional(),
  labelFingerprint: z.string().describe(
    "A fingerprint for the labels being applied to this resource, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a ForwardingRule.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels for this resource. These can only be added or modified by thesetLabels method. Each label key/value pair must comply withRFC1035. Label values may be empty.",
  ).optional(),
  loadBalancingScheme: z.enum([
    "EXTERNAL",
    "EXTERNAL_MANAGED",
    "INTERNAL",
    "INTERNAL_MANAGED",
    "INTERNAL_SELF_MANAGED",
    "INVALID",
  ]).describe(
    "Specifies the forwarding rule type. For more information about forwarding rules, refer to Forwarding rule concepts.",
  ).optional(),
  metadataFilters: z.array(z.object({
    filterLabels: z.array(z.object({
      name: z.string().describe(
        "Name of metadata label. The name can have a maximum length of 1024 characters and must be at least 1 character long.",
      ).optional(),
      value: z.string().describe(
        "The value of the label must match the specified value. value can have a maximum length of 1024 characters.",
      ).optional(),
    })).describe(
      "The list of label value pairs that must match labels in the provided metadata based on filterMatchCriteria This list must not be empty and can have at the most 64 entries.",
    ).optional(),
    filterMatchCriteria: z.enum(["MATCH_ALL", "MATCH_ANY", "NOT_SET"]).describe(
      "Specifies how individual filter label matches within the list of filterLabels and contributes toward the overall metadataFilter match. Supported values are: - MATCH_ANY: at least one of the filterLabels must have a matching label in the provided metadata. - MATCH_ALL: all filterLabels must have matching labels in the provided metadata.",
    ).optional(),
  })).describe(
    "Opaque filter criteria used by load balancer to restrict routing configuration to a limited set of xDS compliant clients. In their xDS requests to load balancer, xDS clients present node metadata. When there is a match, the relevant configuration is made available to those proxies. Otherwise, all the resources (e.g.TargetHttpProxy, UrlMap) referenced by the ForwardingRule are not visible to those proxies. For each metadataFilter in this list, if itsfilterMatchCriteria is set to MATCH_ANY, at least one of thefilterLabels must match the corresponding label provided in the metadata. If its filterMatchCriteria is set to MATCH_ALL, then all of its filterLabels must match with corresponding labels provided in the metadata. If multiplemetadataFilters are specified, all of them need to be satisfied in order to be considered a match. metadataFilters specified here will be applifed before those specified in the UrlMap that thisForwardingRule references. metadataFilters only applies to Loadbalancers that have their loadBalancingScheme set toINTERNAL_SELF_MANAGED.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. For Private Service Connect forwarding rules that forward traffic to Google APIs, the forwarding rule name must be a 1-20 characters string with lowercase letters and numbers and must start with a letter.",
    ).optional(),
  network: z.string().describe(
    "This field is not used for global external load balancing. For internal passthrough Network Load Balancers, this field identifies the network that the load balanced IP should belong to for this forwarding rule. If the subnetwork is specified, the network of the subnetwork will be used. If neither subnetwork nor this field is specified, the default network will be used. For Private Service Connect forwarding rules that forward traffic to Google APIs, a network must be provided.",
  ).optional(),
  networkTier: z.enum([
    "FIXED_STANDARD",
    "PREMIUM",
    "STANDARD",
    "STANDARD_OVERRIDES_FIXED_STANDARD",
  ]).describe(
    "This signifies the networking tier used for configuring this load balancer and can only take the following values:PREMIUM, STANDARD. For regional ForwardingRule, the valid values are PREMIUM andSTANDARD. For GlobalForwardingRule, the valid value isPREMIUM. If this field is not specified, it is assumed to be PREMIUM. If IPAddress is specified, this value must be equal to the networkTier of the Address.",
  ).optional(),
  noAutomateDnsZone: z.boolean().describe(
    "This is used in PSC consumer ForwardingRule to control whether it should try to auto-generate a DNS zone or not. Non-PSC forwarding rules do not use this field. Once set, this field is not mutable.",
  ).optional(),
  portRange: z.string().describe(
    "The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The portRange field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, or SCTP, and - It's applicable only to the following products: external passthrough Network Load Balancers, internal and external proxy Network Load Balancers, internal and external Application Load Balancers, external protocol forwarding, and Classic VPN. - Some products have restrictions on what ports can be used. See port specifications for details. For external forwarding rules, two or more forwarding rules cannot use the same [IPAddress, IPProtocol] pair, and cannot have overlappingportRanges. For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same [IPAddress, IPProtocol] pair, and cannot have overlapping portRanges. @pattern: \\\\d+(?:-\\\\d+)?",
  ).optional(),
  ports: z.array(z.string()).describe(
    "The ports, portRange, and allPorts fields are mutually exclusive. Only packets addressed to ports in the specified range will be forwarded to the backends configured with this forwarding rule. The ports field has the following limitations: - It requires that the forwarding rule IPProtocol be TCP, UDP, or SCTP, and - It's applicable only to the following products: internal passthrough Network Load Balancers, backend service-based external passthrough Network Load Balancers, and internal protocol forwarding. - You can specify a list of up to five ports by number, separated by commas. The ports can be contiguous or discontiguous. For external forwarding rules, two or more forwarding rules cannot use the same [IPAddress, IPProtocol] pair if they share at least one port number. For internal forwarding rules within the same VPC network, two or more forwarding rules cannot use the same [IPAddress, IPProtocol] pair if they share at least one port number. @pattern: \\\\d+(?:-\\\\d+)?",
  ).optional(),
  pscConnectionStatus: z.enum([
    "ACCEPTED",
    "CLOSED",
    "NEEDS_ATTENTION",
    "PENDING",
    "REJECTED",
    "STATUS_UNSPECIFIED",
  ]).optional(),
  serviceDirectoryRegistrations: z.array(z.object({
    namespace: z.string().describe(
      "Service Directory namespace to register the forwarding rule under.",
    ).optional(),
    service: z.string().describe(
      "Service Directory service to register the forwarding rule under.",
    ).optional(),
    serviceDirectoryRegion: z.string().describe(
      '[Optional] Service Directory region to register this global forwarding rule under. Default to "us-central1". Only used for PSC for Google APIs. All PSC for Google APIs forwarding rules on the same network should use the same Service Directory region.',
    ).optional(),
  })).describe(
    "Service Directory resources to register this forwarding rule with. Currently, only supports a single Service Directory resource.",
  ).optional(),
  serviceLabel: z.string().regex(
    new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"),
  ).describe(
    "An optional prefix to the service name for this forwarding rule. If specified, the prefix is the first label of the fully qualified service name. The label must be 1-63 characters long, and comply withRFC1035. Specifically, the label must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. This field is only used for internal load balancing.",
  ).optional(),
  sourceIpRanges: z.array(z.string()).describe(
    "If not empty, this forwarding rule will only forward the traffic when the source IP address matches one of the IP addresses or CIDR ranges set here. Note that a forwarding rule can only have up to 64 source IP ranges, and this field can only be used with a regional forwarding rule whose scheme isEXTERNAL. Each source_ip_range entry should be either an IP address (for example, 1.2.3.4) or a CIDR range (for example, 1.2.3.0/24).",
  ).optional(),
  subnetwork: z.string().describe(
    "This field identifies the subnetwork that the load balanced IP should belong to for this forwarding rule, used with internal load balancers and external passthrough Network Load Balancers with IPv6. If the network specified is in auto subnet mode, this field is optional. However, a subnetwork must be specified if the network is in custom subnet mode or when creating external forwarding rule with IPv6.",
  ).optional(),
  target: z.string().describe(
    'The URL of the target resource to receive the matched traffic. For regional forwarding rules, this target must be in the same region as the forwarding rule. For global forwarding rules, this target must be a global load balancing resource. The forwarded traffic must be of a type appropriate to the target object. - For load balancers, see the "Target" column in [Port specifications](https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts#ip_address_specifications). - For Private Service Connect forwarding rules that forward traffic to Google APIs, provide the name of a supported Google API bundle: - vpc-sc - APIs that support VPC Service Controls. - all-apis - All supported Google APIs. - For Private Service Connect forwarding rules that forward traffic to managed services, the target must be a service attachment. The target is not mutable once set as a service attachment.',
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine GlobalForwardingRules. Registered at `@swamp/gcp/compute/globalforwardingrules`. */
export const model = {
  type: "@swamp/gcp/compute/globalforwardingrules",
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
        "Represents a Forwarding Rule resource. Forwarding rule resources in Google Cl...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a globalForwardingRules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["IPAddress"] !== undefined) body["IPAddress"] = g["IPAddress"];
        if (g["IPProtocol"] !== undefined) body["IPProtocol"] = g["IPProtocol"];
        if (g["allPorts"] !== undefined) body["allPorts"] = g["allPorts"];
        if (g["allowGlobalAccess"] !== undefined) {
          body["allowGlobalAccess"] = g["allowGlobalAccess"];
        }
        if (g["allowPscGlobalAccess"] !== undefined) {
          body["allowPscGlobalAccess"] = g["allowPscGlobalAccess"];
        }
        if (g["backendService"] !== undefined) {
          body["backendService"] = g["backendService"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["externalManagedBackendBucketMigrationState"] !== undefined) {
          body["externalManagedBackendBucketMigrationState"] =
            g["externalManagedBackendBucketMigrationState"];
        }
        if (
          g["externalManagedBackendBucketMigrationTestingPercentage"] !==
            undefined
        ) {
          body["externalManagedBackendBucketMigrationTestingPercentage"] =
            g["externalManagedBackendBucketMigrationTestingPercentage"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["ipCollection"] !== undefined) {
          body["ipCollection"] = g["ipCollection"];
        }
        if (g["ipVersion"] !== undefined) body["ipVersion"] = g["ipVersion"];
        if (g["isMirroringCollector"] !== undefined) {
          body["isMirroringCollector"] = g["isMirroringCollector"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["loadBalancingScheme"] !== undefined) {
          body["loadBalancingScheme"] = g["loadBalancingScheme"];
        }
        if (g["metadataFilters"] !== undefined) {
          body["metadataFilters"] = g["metadataFilters"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["networkTier"] !== undefined) {
          body["networkTier"] = g["networkTier"];
        }
        if (g["noAutomateDnsZone"] !== undefined) {
          body["noAutomateDnsZone"] = g["noAutomateDnsZone"];
        }
        if (g["portRange"] !== undefined) body["portRange"] = g["portRange"];
        if (g["ports"] !== undefined) body["ports"] = g["ports"];
        if (g["pscConnectionStatus"] !== undefined) {
          body["pscConnectionStatus"] = g["pscConnectionStatus"];
        }
        if (g["serviceDirectoryRegistrations"] !== undefined) {
          body["serviceDirectoryRegistrations"] =
            g["serviceDirectoryRegistrations"];
        }
        if (g["serviceLabel"] !== undefined) {
          body["serviceLabel"] = g["serviceLabel"];
        }
        if (g["sourceIpRanges"] !== undefined) {
          body["sourceIpRanges"] = g["sourceIpRanges"];
        }
        if (g["subnetwork"] !== undefined) body["subnetwork"] = g["subnetwork"];
        if (g["target"] !== undefined) body["target"] = g["target"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["forwardingRule"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a globalForwardingRules",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the globalForwardingRules",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["forwardingRule"] = args.identifier;
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
      description: "Update globalForwardingRules attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["forwardingRule"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["IPAddress"] !== undefined) body["IPAddress"] = g["IPAddress"];
        if (g["IPProtocol"] !== undefined) body["IPProtocol"] = g["IPProtocol"];
        if (g["allPorts"] !== undefined) body["allPorts"] = g["allPorts"];
        if (g["allowPscGlobalAccess"] !== undefined) {
          body["allowPscGlobalAccess"] = g["allowPscGlobalAccess"];
        }
        if (g["backendService"] !== undefined) {
          body["backendService"] = g["backendService"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["externalManagedBackendBucketMigrationState"] !== undefined) {
          body["externalManagedBackendBucketMigrationState"] =
            g["externalManagedBackendBucketMigrationState"];
        }
        if (
          g["externalManagedBackendBucketMigrationTestingPercentage"] !==
            undefined
        ) {
          body["externalManagedBackendBucketMigrationTestingPercentage"] =
            g["externalManagedBackendBucketMigrationTestingPercentage"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["ipCollection"] !== undefined) {
          body["ipCollection"] = g["ipCollection"];
        }
        if (g["ipVersion"] !== undefined) body["ipVersion"] = g["ipVersion"];
        if (g["isMirroringCollector"] !== undefined) {
          body["isMirroringCollector"] = g["isMirroringCollector"];
        }
        if (g["labelFingerprint"] !== undefined) {
          body["labelFingerprint"] = g["labelFingerprint"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["loadBalancingScheme"] !== undefined) {
          body["loadBalancingScheme"] = g["loadBalancingScheme"];
        }
        if (g["metadataFilters"] !== undefined) {
          body["metadataFilters"] = g["metadataFilters"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["networkTier"] !== undefined) {
          body["networkTier"] = g["networkTier"];
        }
        if (g["noAutomateDnsZone"] !== undefined) {
          body["noAutomateDnsZone"] = g["noAutomateDnsZone"];
        }
        if (g["portRange"] !== undefined) body["portRange"] = g["portRange"];
        if (g["ports"] !== undefined) body["ports"] = g["ports"];
        if (g["pscConnectionStatus"] !== undefined) {
          body["pscConnectionStatus"] = g["pscConnectionStatus"];
        }
        if (g["serviceDirectoryRegistrations"] !== undefined) {
          body["serviceDirectoryRegistrations"] =
            g["serviceDirectoryRegistrations"];
        }
        if (g["serviceLabel"] !== undefined) {
          body["serviceLabel"] = g["serviceLabel"];
        }
        if (g["sourceIpRanges"] !== undefined) {
          body["sourceIpRanges"] = g["sourceIpRanges"];
        }
        if (g["subnetwork"] !== undefined) body["subnetwork"] = g["subnetwork"];
        if (g["target"] !== undefined) body["target"] = g["target"];
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
      description: "Delete the globalForwardingRules",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the globalForwardingRules",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["forwardingRule"] = args.identifier;
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
      description: "Sync globalForwardingRules state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["forwardingRule"] = identifier;
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
            "id": "compute.globalForwardingRules.setLabels",
            "path":
              "projects/{project}/global/forwardingRules/{resource}/setLabels",
            "httpMethod": "POST",
            "parameterOrder": ["project", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_target: {
      description: "set target",
      arguments: z.object({
        target: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["forwardingRule"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["target"] !== undefined) body["target"] = args["target"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.globalForwardingRules.setTarget",
            "path":
              "projects/{project}/global/forwardingRules/{forwardingRule}/setTarget",
            "httpMethod": "POST",
            "parameterOrder": ["project", "forwardingRule"],
            "parameters": {
              "forwardingRule": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
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
