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

// Auto-generated extension model for @swamp/aws/elasticloadbalancing/load-balancer
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ElasticLoadBalancing LoadBalancer (AWS::ElasticLoadBalancing::LoadBalancer).
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

const AppCookieStickinessPolicySchema = z.object({
  CookieName: z.string().describe(
    "The name of the application cookie used for stickiness.",
  ),
  PolicyName: z.string().describe(
    "The mnemonic name for the policy being created. The name must be unique within a set of policies for this load balancer.",
  ),
});

const LBCookieStickinessPolicySchema = z.object({
  CookieExpirationPeriod: z.string().describe(
    "The time period, in seconds, after which the cookie should be considered stale. If this parameter is not specified, the stickiness session lasts for the duration of the browser session.",
  ).optional(),
  PolicyName: z.string().describe(
    "The name of the policy. This name must be unique within the set of policies for this load balancer.",
  ).optional(),
});

const ListenersSchema = z.object({
  PolicyNames: z.array(z.string()).describe(
    "The names of the policies to associate with the listener.",
  ).optional(),
  InstancePort: z.string().describe(
    "The port on which the instance is listening.",
  ),
  LoadBalancerPort: z.string().describe(
    "The port on which the load balancer is listening. On EC2-VPC, you can specify any port from the range 1-65535. On EC2-Classic, you can specify any port from the following list: 25, 80, 443, 465, 587, 1024-65535.",
  ),
  Protocol: z.string().describe(
    "The load balancer transport protocol to use for routing: HTTP, HTTPS, TCP, or SSL.",
  ),
  SSLCertificateId: z.string().describe(
    "The Amazon Resource Name (ARN) of the server certificate.",
  ).optional(),
  InstanceProtocol: z.string().describe(
    "The protocol to use for routing traffic to instances: HTTP, HTTPS, TCP, or SSL. If the front-end protocol is TCP or SSL, the back-end protocol must be TCP or SSL. If the front-end protocol is HTTP or HTTPS, the back-end protocol must be HTTP or HTTPS. If there is another listener with the same `InstancePort` whose `InstanceProtocol` is secure, (HTTPS or SSL), the listener's `InstanceProtocol` must also be secure. If there is another listener with the same `InstancePort` whose `InstanceProtocol` is HTTP or TCP, the listener's `InstanceProtocol` must be HTTP or TCP.",
  ).optional(),
});

const PolicyItemSchema = z.object({
  Name: z.string().optional(),
  Value: z.string().optional(),
});

const PoliciesSchema = z.object({
  Attributes: z.array(PolicyItemSchema).describe("The policy attributes."),
  PolicyType: z.string().describe("The name of the policy type."),
  LoadBalancerPorts: z.array(z.string()).describe(
    "The load balancer ports for the policy. Required only for some policy types.",
  ).optional(),
  PolicyName: z.string().describe("The name of the policy."),
  InstancePorts: z.array(z.string()).describe(
    "The instance ports for the policy. Required only for some policy types.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().describe(
    "The value for the tag. You can specify a value that's 1 to 256 characters in length.",
  ),
  Key: z.string().describe(
    "The key name of the tag. You can specify a value that's 1 to 128 Unicode characters in length and can't be prefixed with `aws:`. You can use any of the following characters: the set of Unicode letters, digits, whitespace, `_`, `.`, `/`, `=`, `+`, and `-`.",
  ),
});

const GlobalArgsSchema = z.object({
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
  AccessLoggingPolicy: z.object({
    Enabled: z.boolean().describe(
      "Specifies whether access logs are enabled for the load balancer.",
    ),
    S3BucketName: z.string().describe(
      "The name of the Amazon S3 bucket where the access logs are stored.",
    ),
    EmitInterval: z.number().int().describe(
      "The interval for publishing the access logs. You can specify an interval of either 5 minutes or 60 minutes. Default: 60 minutes",
    ).optional(),
    S3BucketPrefix: z.string().describe(
      "The logical hierarchy you created for your Amazon S3 bucket, for example `my-bucket-prefix/prod`. If the prefix is not provided, the log is placed at the root level of the bucket.",
    ).optional(),
  }).describe(
    "Information about where and how access logs are stored for the load balancer.",
  ).optional(),
  AppCookieStickinessPolicy: z.array(AppCookieStickinessPolicySchema).describe(
    "Information about a policy for application-controlled session stickiness.",
  ).optional(),
  AvailabilityZones: z.array(z.string()).describe(
    "The Availability Zones for a load balancer in a default VPC. For a load balancer in a nondefault VPC, specify Subnets instead.",
  ).optional(),
  ConnectionDrainingPolicy: z.object({
    Enabled: z.boolean().describe(
      "Specifies whether connection draining is enabled for the load balancer.",
    ),
    Timeout: z.number().int().describe(
      "The maximum time, in seconds, to keep the existing connections open before deregistering the instances.",
    ).optional(),
  }).describe(
    "If enabled, the load balancer allows existing requests to complete before the load balancer shifts traffic away from a deregistered or unhealthy instance.",
  ).optional(),
  ConnectionSettings: z.object({
    IdleTimeout: z.number().int().describe(
      "The time, in seconds, that the connection is allowed to be idle (no data has been sent over the connection) before it is closed by the load balancer.",
    ),
  }).describe(
    "If enabled, the load balancer allows the connections to remain idle (no data is sent over the connection) for the specified duration.",
  ).optional(),
  CrossZone: z.boolean().describe(
    "If enabled, the load balancer routes the request traffic evenly across all instances regardless of the Availability Zones.",
  ).optional(),
  HealthCheck: z.object({
    Target: z.string().describe("The instance being checked."),
    UnhealthyThreshold: z.string().describe(
      "The number of consecutive health check failures required before moving the instance to the `Unhealthy` state.",
    ),
    Timeout: z.string().describe(
      "The amount of time, in seconds, during which no response means a failed health check. This value must be less than the `Interval` value.",
    ),
    HealthyThreshold: z.string().describe(
      "The number of consecutive health checks successes required before moving the instance to the `Healthy` state.",
    ),
    Interval: z.string().describe(
      "The approximate interval, in seconds, between health checks of an individual instance.",
    ),
  }).describe(
    "The health check settings to use when evaluating the health of your EC2 instances.",
  ).optional(),
  Instances: z.array(z.string()).describe(
    "The IDs of the instances for the load balancer.",
  ).optional(),
  LBCookieStickinessPolicy: z.array(LBCookieStickinessPolicySchema).describe(
    "Information about a policy for duration-based session stickiness.",
  ).optional(),
  Listeners: z.array(ListenersSchema).describe(
    "The Listeners for the load balancer. You can specify at most one listener per port.",
  ),
  LoadBalancerName: z.string().describe(
    "The name of the load balancer. This name must be unique within your set of load balancers for the region.",
  ).optional(),
  Policies: z.array(PoliciesSchema).describe(
    "The policies defined for your Classic Load Balancer. Specify only back-end server policies.",
  ).optional(),
  Scheme: z.string().describe(
    "The type of load balancer. Valid only for load balancers in a VPC.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "The security groups for the load balancer. Valid only for load balancers in a VPC.",
  ).optional(),
  Subnets: z.array(z.string()).describe(
    "The IDs of the subnets for the load balancer. You can specify at most one subnet per Availability Zone.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags associated with a load balancer.")
    .optional(),
});

const StateSchema = z.object({
  AccessLoggingPolicy: z.object({
    Enabled: z.boolean(),
    S3BucketName: z.string(),
    EmitInterval: z.number(),
    S3BucketPrefix: z.string(),
  }).optional(),
  AppCookieStickinessPolicy: z.array(AppCookieStickinessPolicySchema)
    .optional(),
  AvailabilityZones: z.array(z.string()).optional(),
  ConnectionDrainingPolicy: z.object({
    Enabled: z.boolean(),
    Timeout: z.number(),
  }).optional(),
  ConnectionSettings: z.object({
    IdleTimeout: z.number(),
  }).optional(),
  CrossZone: z.boolean().optional(),
  HealthCheck: z.object({
    Target: z.string(),
    UnhealthyThreshold: z.string(),
    Timeout: z.string(),
    HealthyThreshold: z.string(),
    Interval: z.string(),
  }).optional(),
  Instances: z.array(z.string()).optional(),
  LBCookieStickinessPolicy: z.array(LBCookieStickinessPolicySchema).optional(),
  Listeners: z.array(ListenersSchema).optional(),
  LoadBalancerName: z.string(),
  Policies: z.array(PoliciesSchema).optional(),
  Scheme: z.string().optional(),
  SecurityGroups: z.array(z.string()).optional(),
  Subnets: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
  CanonicalHostedZoneName: z.string().optional(),
  CanonicalHostedZoneNameID: z.string().optional(),
  DNSName: z.string().optional(),
  SourceSecurityGroup: z.object({
    GroupName: z.string(),
    OwnerAlias: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AccessLoggingPolicy: z.object({
    Enabled: z.boolean().describe(
      "Specifies whether access logs are enabled for the load balancer.",
    ).optional(),
    S3BucketName: z.string().describe(
      "The name of the Amazon S3 bucket where the access logs are stored.",
    ).optional(),
    EmitInterval: z.number().int().describe(
      "The interval for publishing the access logs. You can specify an interval of either 5 minutes or 60 minutes. Default: 60 minutes",
    ).optional(),
    S3BucketPrefix: z.string().describe(
      "The logical hierarchy you created for your Amazon S3 bucket, for example `my-bucket-prefix/prod`. If the prefix is not provided, the log is placed at the root level of the bucket.",
    ).optional(),
  }).describe(
    "Information about where and how access logs are stored for the load balancer.",
  ).optional(),
  AppCookieStickinessPolicy: z.array(AppCookieStickinessPolicySchema).describe(
    "Information about a policy for application-controlled session stickiness.",
  ).optional(),
  AvailabilityZones: z.array(z.string()).describe(
    "The Availability Zones for a load balancer in a default VPC. For a load balancer in a nondefault VPC, specify Subnets instead.",
  ).optional(),
  ConnectionDrainingPolicy: z.object({
    Enabled: z.boolean().describe(
      "Specifies whether connection draining is enabled for the load balancer.",
    ).optional(),
    Timeout: z.number().int().describe(
      "The maximum time, in seconds, to keep the existing connections open before deregistering the instances.",
    ).optional(),
  }).describe(
    "If enabled, the load balancer allows existing requests to complete before the load balancer shifts traffic away from a deregistered or unhealthy instance.",
  ).optional(),
  ConnectionSettings: z.object({
    IdleTimeout: z.number().int().describe(
      "The time, in seconds, that the connection is allowed to be idle (no data has been sent over the connection) before it is closed by the load balancer.",
    ).optional(),
  }).describe(
    "If enabled, the load balancer allows the connections to remain idle (no data is sent over the connection) for the specified duration.",
  ).optional(),
  CrossZone: z.boolean().describe(
    "If enabled, the load balancer routes the request traffic evenly across all instances regardless of the Availability Zones.",
  ).optional(),
  HealthCheck: z.object({
    Target: z.string().describe("The instance being checked.").optional(),
    UnhealthyThreshold: z.string().describe(
      "The number of consecutive health check failures required before moving the instance to the `Unhealthy` state.",
    ).optional(),
    Timeout: z.string().describe(
      "The amount of time, in seconds, during which no response means a failed health check. This value must be less than the `Interval` value.",
    ).optional(),
    HealthyThreshold: z.string().describe(
      "The number of consecutive health checks successes required before moving the instance to the `Healthy` state.",
    ).optional(),
    Interval: z.string().describe(
      "The approximate interval, in seconds, between health checks of an individual instance.",
    ).optional(),
  }).describe(
    "The health check settings to use when evaluating the health of your EC2 instances.",
  ).optional(),
  Instances: z.array(z.string()).describe(
    "The IDs of the instances for the load balancer.",
  ).optional(),
  LBCookieStickinessPolicy: z.array(LBCookieStickinessPolicySchema).describe(
    "Information about a policy for duration-based session stickiness.",
  ).optional(),
  Listeners: z.array(ListenersSchema).describe(
    "The Listeners for the load balancer. You can specify at most one listener per port.",
  ).optional(),
  LoadBalancerName: z.string().describe(
    "The name of the load balancer. This name must be unique within your set of load balancers for the region.",
  ).optional(),
  Policies: z.array(PoliciesSchema).describe(
    "The policies defined for your Classic Load Balancer. Specify only back-end server policies.",
  ).optional(),
  Scheme: z.string().describe(
    "The type of load balancer. Valid only for load balancers in a VPC.",
  ).optional(),
  SecurityGroups: z.array(z.string()).describe(
    "The security groups for the load balancer. Valid only for load balancers in a VPC.",
  ).optional(),
  Subnets: z.array(z.string()).describe(
    "The IDs of the subnets for the load balancer. You can specify at most one subnet per Availability Zone.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags associated with a load balancer.")
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

/** Swamp extension model for ElasticLoadBalancing LoadBalancer. Registered at `@swamp/aws/elasticloadbalancing/load-balancer`. */
export const model = {
  type: "@swamp/aws/elasticloadbalancing/load-balancer",
  version: "2026.06.17.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ElasticLoadBalancing LoadBalancer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElasticLoadBalancing LoadBalancer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ElasticLoadBalancing::LoadBalancer",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.LoadBalancerName ?? g.LoadBalancerName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ElasticLoadBalancing LoadBalancer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancing LoadBalancer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ElasticLoadBalancing::LoadBalancer",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.LoadBalancerName ?? context.globalArgs.LoadBalancerName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a ElasticLoadBalancing LoadBalancer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.LoadBalancerName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.LoadBalancerName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElasticLoadBalancing::LoadBalancer",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ElasticLoadBalancing::LoadBalancer",
          identifier,
          currentState,
          desiredState,
          ["LoadBalancerName", "Scheme"],
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
      description: "Delete a ElasticLoadBalancing LoadBalancer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancing LoadBalancer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ElasticLoadBalancing::LoadBalancer",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.LoadBalancerName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync ElasticLoadBalancing LoadBalancer state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.LoadBalancerName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.LoadBalancerName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElasticLoadBalancing::LoadBalancer",
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
