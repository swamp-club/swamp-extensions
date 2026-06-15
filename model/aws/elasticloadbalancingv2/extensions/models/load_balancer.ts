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

// Auto-generated extension model for @swamp/aws/elasticloadbalancingv2/load-balancer
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ElasticLoadBalancingV2 LoadBalancer (AWS::ElasticLoadBalancingV2::LoadBalancer).
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
import type { AwsCredentials } from "./_lib/aws.ts";

const LoadBalancerAttributeSchema = z.object({
  Value: z.string().describe("The value of the attribute.").optional(),
  Key: z.string().describe(
    "The name of the attribute. The following attributes are supported by all load balancers: deletion_protection.enabled - Indicates whether deletion protection is enabled. The value is true or false. The default is false. load_balancing.cross_zone.enabled - Indicates whether cross-zone load balancing is enabled. The possible values are true and false. The default for Network Load Balancers and Gateway Load Balancers is false. The default for Application Load Balancers is true, and can't be changed. The following attributes are supported by both Application Load Balancers and Network Load Balancers: access_logs.s3.enabled - Indicates whether access logs are enabled. The value is true or false. The default is false. access_logs.s3.bucket - The name of the S3 bucket for the access logs. This attribute is required if access logs are enabled. The bucket must exist in the same region as the load balancer and have a bucket policy that grants Elastic Load Balancing permissions to write to the bucket. access_logs.s3.prefix - The prefix for the location in the S3 bucket for the access logs. ipv6.deny_all_igw_traffic - Blocks internet gateway (IGW) access to the load balancer. It is set to false for internet-facing load balancers and true for internal load balancers, preventing unintended access to your internal load balancer through an internet gateway. zonal_shift.config.enabled - Indicates whether zonal shift is enabled. The possible values are true and false. The default is false. The following attributes are supported by only Application Load Balancers: idle_timeout.timeout_seconds - The idle timeout value, in seconds. The valid range is 1-4000 seconds. The default is 60 seconds. client_keep_alive.seconds - The client keep alive value, in seconds. The valid range is 60-604800 seconds. The default is 3600 seconds. connection_logs.s3.enabled - Indicates whether connection logs are enabled. The value is true or false. The default is false. connection_logs.s3.bucket - The name of the S3 bucket for the connection logs. This attribute is required if connection logs are enabled. The bucket must exist in the same region as the load balancer and have a bucket policy that grants Elastic Load Balancing permissions to write to the bucket. connection_logs.s3.prefix - The prefix for the location in the S3 bucket for the connection logs. health_check_logs.s3.enabled - Indicates whether health check logs are enabled. The value is true or false. The default is false. health_check_logs.s3.bucket - The name of the S3 bucket for the health check logs. This attribute is required if health check logs are enabled. The bucket must exist in the same region as the load balancer and have a bucket policy that grants Elastic Load Balancing permissions to write to the bucket. health_check_logs.s3.prefix - The prefix for the location in the S3 bucket for the health check logs. routing.http.desync_mitigation_mode - Determines how the load balancer handles requests that might pose a security risk to your application. The possible values are monitor, defensive, and strictest. The default is defensive. routing.http.drop_invalid_header_fields.enabled - Indicates whether HTTP headers with invalid header fields are removed by the load balancer ( true) or routed to targets ( false). The default is false. routing.http.preserve_host_header.enabled - Indicates whether the Application Load Balancer should preserve the Host header in the HTTP request and send it to the target without any change. The possible values are true and false. The default is false. routing.http.x_amzn_tls_version_and_cipher_suite.enabled - Indicates whether the two headers ( x-amzn-tls-version and x-amzn-tls-cipher-suite), which contain information about the negotiated TLS version and cipher suite, are added to the client request before sending it to the target. The x-amzn-tls-version header has information about the TLS protocol version negotiated with the client, and the x-amzn-tls-cipher-suite header has information about the cipher suite negotiated with the client. Both headers are in OpenSSL format. The possible values for the attribute are true and false. The default is false. routing.http.xff_client_port.enabled - Indicates whether the X-Forwarded-For header should preserve the source port that the client used to connect to the load balancer. The possible values are true and false. The default is false. routing.http.xff_header_processing.mode - Enables you to modify, preserve, or remove the X-Forwarded-For header in the HTTP request before the Application Load Balancer sends the request to the target. The possible values are append, preserve, and remove. The default is append. If the value is append, the Application Load Balancer adds the client IP address (of the last hop) to the X-Forwarded-For header in the HTTP request before it sends it to targets. If the value is preserve the Application Load Balancer preserves the X-Forwarded-For header in the HTTP request, and sends it to targets without any change. If the value is remove, the Application Load Balancer removes the X-Forwarded-For header in the HTTP request before it sends it to targets. routing.http2.enabled - Indicates whether clients can connect to the load balancer using HTTP/2. If true, clients can connect using HTTP/2 or HTTP/1.1. However, all client requests are subject to the stricter HTTP/2 header validation rules. For example, message header names must contain only alphanumeric characters and hyphens. If false, clients must connect using HTTP/1.1. The default is true. waf.fail_open.enabled - Indicates whether to allow a WAF-enabled load balancer to route requests to targets if it is unable to forward the request to AWS WAF. The possible values are true and false. The default is false. The following attributes are supported by only Network Load Balancers: dns_record.client_routing_policy - Indicates how traffic is distributed among the load balancer Availability Zones. The possible values are availability_zone_affinity with 100 percent zonal affinity, partial_availability_zone_affinity with 85 percent zonal affinity, and any_availability_zone with 0 percent zonal affinity. secondary_ips.auto_assigned.per_subnet - The number of secondary IP addresses to configure for your load balancer nodes. Use to address port allocation errors if you can't add targets. The valid range is 0 to 7. The default is 0. After you set this value, you can't decrease it.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().describe("The value of the tag.").optional(),
  Key: z.string().describe("The key of the tag."),
});

const SubnetMappingSchema = z.object({
  SubnetId: z.string().describe("The ID of the subnet."),
  AllocationId: z.string().describe(
    "[Network Load Balancers] The allocation ID of the Elastic IP address for an internet-facing load balancer.",
  ).optional(),
  PrivateIPv4Address: z.string().describe(
    "[Network Load Balancers] The private IPv4 address for an internal load balancer.",
  ).optional(),
  IPv6Address: z.string().describe("[Network Load Balancers] The IPv6 address.")
    .optional(),
  SourceNatIpv6Prefix: z.string().describe(
    "[Network Load Balancers with UDP listeners] The IPv6 prefix to use for source NAT. Specify an IPv6 prefix (/80 netmask) from the subnet CIDR block or auto_assigned to use an IPv6 prefix selected at random from the subnet CIDR block.",
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
  IpAddressType: z.string().describe(
    "The IP address type. Internal load balancers must use ipv4. [Application Load Balancers] The possible values are ipv4 (IPv4 addresses), dualstack (IPv4 and IPv6 addresses), and dualstack-without-public-ipv4 (public IPv6 addresses and private IPv4 and IPv6 addresses). Application Load Balancer authentication supports IPv4 addresses only when connecting to an Identity Provider (IdP) or Amazon Cognito endpoint. Without a public IPv4 address the load balancer can't complete the authentication process, resulting in HTTP 500 errors. [Network Load Balancers and Gateway Load Balancers] The possible values are ipv4 (IPv4 addresses) and dualstack (IPv4 and IPv6 addresses).",
  ).optional(),
  EnablePrefixForIpv6SourceNat: z.string().describe(
    "[Network Load Balancers with UDP listeners] Indicates whether to use an IPv6 prefix from each subnet for source NAT. The IP address type must be dualstack. The default value is off.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "[Application Load Balancers and Network Load Balancers] The IDs of the security groups for the load balancer.",
  ).optional(),
  LoadBalancerAttributes: z.array(LoadBalancerAttributeSchema).describe(
    "The load balancer attributes. Attributes that you do not modify retain their current values.",
  ).optional(),
  MinimumLoadBalancerCapacity: z.object({
    CapacityUnits: z.number().int().describe("The number of capacity units."),
  }).describe("The minimum capacity for a load balancer.").optional(),
  EnableCapacityReservationProvisionStabilize: z.boolean().describe(
    "Indicates whether to enable stabilization when creating or updating an LCU reservation. This ensures that the final stack status reflects the status of the LCU reservation. The default is false.",
  ).optional(),
  Scheme: z.string().describe(
    "The nodes of an Internet-facing load balancer have public IP addresses. The DNS name of an Internet-facing load balancer is publicly resolvable to the public IP addresses of the nodes. Therefore, Internet-facing load balancers can route requests from clients over the internet. The nodes of an internal load balancer have only private IP addresses. The DNS name of an internal load balancer is publicly resolvable to the private IP addresses of the nodes. Therefore, internal load balancers can route requests only from clients with access to the VPC for the load balancer. The default is an Internet-facing load balancer. You can't specify a scheme for a Gateway Load Balancer.",
  ).optional(),
  Name: z.string().describe(
    'The name of the load balancer. This name must be unique per region per account, can have a maximum of 32 characters, must contain only alphanumeric characters or hyphens, must not begin or end with a hyphen, and must not begin with "internal-". If you don\'t specify a name, AWS CloudFormation generates a unique physical ID for the load balancer. If you specify a name, you cannot perform updates that require replacement of this resource, but you can perform other updates. To replace the resource, specify a new name.',
  ).optional(),
  Subnets: z.array(z.string()).describe(
    "The IDs of the subnets. You can specify only one subnet per Availability Zone. You must specify either subnets or subnet mappings, but not both. To specify an Elastic IP address, specify subnet mappings instead of subnets. [Application Load Balancers] You must specify subnets from at least two Availability Zones. [Application Load Balancers on Outposts] You must specify one Outpost subnet. [Application Load Balancers on Local Zones] You can specify subnets from one or more Local Zones. [Network Load Balancers and Gateway Load Balancers] You can specify subnets from one or more Availability Zones.",
  ).optional(),
  Type: z.string().describe(
    "The type of load balancer. The default is application.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags to assign to the load balancer.")
    .optional(),
  SubnetMappings: z.array(SubnetMappingSchema).describe(
    "The IDs of the subnets. You can specify only one subnet per Availability Zone. You must specify either subnets or subnet mappings, but not both. [Application Load Balancers] You must specify subnets from at least two Availability Zones. You can't specify Elastic IP addresses for your subnets. [Application Load Balancers on Outposts] You must specify one Outpost subnet. [Application Load Balancers on Local Zones] You can specify subnets from one or more Local Zones. [Network Load Balancers] You can specify subnets from one or more Availability Zones. You can specify one Elastic IP address per subnet if you need static IP addresses for your internet-facing load balancer. For internal load balancers, you can specify one private IP address per subnet from the IPv4 range of the subnet. For internet-facing load balancer, you can specify one IPv6 address per subnet. [Gateway Load Balancers] You can specify subnets from one or more Availability Zones. You can't specify Elastic IP addresses for your subnets.",
  ).optional(),
  EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic: z.string().describe(
    "Indicates whether to evaluate inbound security group rules for traffic sent to a Network Load Balancer through privatelink. The default is on. You can't configure this property on a Network Load Balancer unless you associated a security group with the load balancer when you created it.",
  ).optional(),
  Ipv4IpamPoolId: z.string().describe("The ID of the IPv4 IPAM pool.")
    .optional(),
});

const StateSchema = z.object({
  IpAddressType: z.string().optional(),
  EnablePrefixForIpv6SourceNat: z.string().optional(),
  SecurityGroups: z.array(z.string()).optional(),
  LoadBalancerAttributes: z.array(LoadBalancerAttributeSchema).optional(),
  MinimumLoadBalancerCapacity: z.object({
    CapacityUnits: z.number(),
  }).optional(),
  EnableCapacityReservationProvisionStabilize: z.boolean().optional(),
  Scheme: z.string().optional(),
  DNSName: z.string().optional(),
  Name: z.string().optional(),
  LoadBalancerName: z.string().optional(),
  LoadBalancerFullName: z.string().optional(),
  Subnets: z.array(z.string()).optional(),
  Type: z.string().optional(),
  CanonicalHostedZoneID: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  LoadBalancerArn: z.string(),
  SubnetMappings: z.array(SubnetMappingSchema).optional(),
  EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic: z.string().optional(),
  Ipv4IpamPoolId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  IpAddressType: z.string().describe(
    "The IP address type. Internal load balancers must use ipv4. [Application Load Balancers] The possible values are ipv4 (IPv4 addresses), dualstack (IPv4 and IPv6 addresses), and dualstack-without-public-ipv4 (public IPv6 addresses and private IPv4 and IPv6 addresses). Application Load Balancer authentication supports IPv4 addresses only when connecting to an Identity Provider (IdP) or Amazon Cognito endpoint. Without a public IPv4 address the load balancer can't complete the authentication process, resulting in HTTP 500 errors. [Network Load Balancers and Gateway Load Balancers] The possible values are ipv4 (IPv4 addresses) and dualstack (IPv4 and IPv6 addresses).",
  ).optional(),
  EnablePrefixForIpv6SourceNat: z.string().describe(
    "[Network Load Balancers with UDP listeners] Indicates whether to use an IPv6 prefix from each subnet for source NAT. The IP address type must be dualstack. The default value is off.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "[Application Load Balancers and Network Load Balancers] The IDs of the security groups for the load balancer.",
  ).optional(),
  LoadBalancerAttributes: z.array(LoadBalancerAttributeSchema).describe(
    "The load balancer attributes. Attributes that you do not modify retain their current values.",
  ).optional(),
  MinimumLoadBalancerCapacity: z.object({
    CapacityUnits: z.number().int().describe("The number of capacity units.")
      .optional(),
  }).describe("The minimum capacity for a load balancer.").optional(),
  EnableCapacityReservationProvisionStabilize: z.boolean().describe(
    "Indicates whether to enable stabilization when creating or updating an LCU reservation. This ensures that the final stack status reflects the status of the LCU reservation. The default is false.",
  ).optional(),
  Scheme: z.string().describe(
    "The nodes of an Internet-facing load balancer have public IP addresses. The DNS name of an Internet-facing load balancer is publicly resolvable to the public IP addresses of the nodes. Therefore, Internet-facing load balancers can route requests from clients over the internet. The nodes of an internal load balancer have only private IP addresses. The DNS name of an internal load balancer is publicly resolvable to the private IP addresses of the nodes. Therefore, internal load balancers can route requests only from clients with access to the VPC for the load balancer. The default is an Internet-facing load balancer. You can't specify a scheme for a Gateway Load Balancer.",
  ).optional(),
  Name: z.string().describe(
    'The name of the load balancer. This name must be unique per region per account, can have a maximum of 32 characters, must contain only alphanumeric characters or hyphens, must not begin or end with a hyphen, and must not begin with "internal-". If you don\'t specify a name, AWS CloudFormation generates a unique physical ID for the load balancer. If you specify a name, you cannot perform updates that require replacement of this resource, but you can perform other updates. To replace the resource, specify a new name.',
  ).optional(),
  Subnets: z.array(z.string()).describe(
    "The IDs of the subnets. You can specify only one subnet per Availability Zone. You must specify either subnets or subnet mappings, but not both. To specify an Elastic IP address, specify subnet mappings instead of subnets. [Application Load Balancers] You must specify subnets from at least two Availability Zones. [Application Load Balancers on Outposts] You must specify one Outpost subnet. [Application Load Balancers on Local Zones] You can specify subnets from one or more Local Zones. [Network Load Balancers and Gateway Load Balancers] You can specify subnets from one or more Availability Zones.",
  ).optional(),
  Type: z.string().describe(
    "The type of load balancer. The default is application.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags to assign to the load balancer.")
    .optional(),
  SubnetMappings: z.array(SubnetMappingSchema).describe(
    "The IDs of the subnets. You can specify only one subnet per Availability Zone. You must specify either subnets or subnet mappings, but not both. [Application Load Balancers] You must specify subnets from at least two Availability Zones. You can't specify Elastic IP addresses for your subnets. [Application Load Balancers on Outposts] You must specify one Outpost subnet. [Application Load Balancers on Local Zones] You can specify subnets from one or more Local Zones. [Network Load Balancers] You can specify subnets from one or more Availability Zones. You can specify one Elastic IP address per subnet if you need static IP addresses for your internet-facing load balancer. For internal load balancers, you can specify one private IP address per subnet from the IPv4 range of the subnet. For internet-facing load balancer, you can specify one IPv6 address per subnet. [Gateway Load Balancers] You can specify subnets from one or more Availability Zones. You can't specify Elastic IP addresses for your subnets.",
  ).optional(),
  EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic: z.string().describe(
    "Indicates whether to evaluate inbound security group rules for traffic sent to a Network Load Balancer through privatelink. The default is on. You can't configure this property on a Network Load Balancer unless you associated a security group with the load balancer when you created it.",
  ).optional(),
  Ipv4IpamPoolId: z.string().describe("The ID of the IPv4 IPAM pool.")
    .optional(),
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

/** Swamp extension model for ElasticLoadBalancingV2 LoadBalancer. Registered at `@swamp/aws/elasticloadbalancingv2/load-balancer`. */
export const model = {
  type: "@swamp/aws/elasticloadbalancingv2/load-balancer",
  version: "2026.06.15.1",
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
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ElasticLoadBalancingV2 LoadBalancer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElasticLoadBalancingV2 LoadBalancer",
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
          "AWS::ElasticLoadBalancingV2::LoadBalancer",
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
      description: "Get a ElasticLoadBalancingV2 LoadBalancer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancingV2 LoadBalancer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ElasticLoadBalancingV2::LoadBalancer",
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
      description: "Update a ElasticLoadBalancingV2 LoadBalancer",
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
        const identifier = existing.LoadBalancerArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElasticLoadBalancingV2::LoadBalancer",
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
          "AWS::ElasticLoadBalancingV2::LoadBalancer",
          identifier,
          currentState,
          desiredState,
          ["Name", "Type", "Scheme"],
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
      description: "Delete a ElasticLoadBalancingV2 LoadBalancer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancingV2 LoadBalancer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ElasticLoadBalancingV2::LoadBalancer",
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
      description: "Sync ElasticLoadBalancingV2 LoadBalancer state from AWS",
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
        const identifier = existing.LoadBalancerArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElasticLoadBalancingV2::LoadBalancer",
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
  },
};
