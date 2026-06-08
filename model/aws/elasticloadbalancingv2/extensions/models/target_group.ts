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

// Auto-generated extension model for @swamp/aws/elasticloadbalancingv2/target-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ElasticLoadBalancingV2 TargetGroup (AWS::ElasticLoadBalancingV2::TargetGroup).
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

const TargetDescriptionSchema = z.object({
  AvailabilityZone: z.string().describe(
    "An Availability Zone or all. This determines whether the target receives traffic from the load balancer nodes in the specified Availability Zone or from all enabled Availability Zones for the load balancer.",
  ).optional(),
  Id: z.string().describe(
    "The ID of the target. If the target type of the target group is instance, specify an instance ID. If the target type is ip, specify an IP address. If the target type is lambda, specify the ARN of the Lambda function. If the target type is alb, specify the ARN of the Application Load Balancer target.",
  ),
  Port: z.number().int().describe(
    "The port on which the target is listening. If the target group protocol is GENEVE, the supported port is 6081. If the target type is alb, the targeted Application Load Balancer must have at least one listener whose port matches the target group port. Not used if the target is a Lambda function.",
  ).optional(),
  QuicServerId: z.string().describe(
    "The Server ID used by targets when using QUIC or TCP_QUIC protocols.",
  ).optional(),
});

const TargetGroupAttributeSchema = z.object({
  Value: z.string().describe("The name of the attribute.").optional(),
  Key: z.string().describe("The value of the attribute.").optional(),
});

const TagSchema = z.object({
  Value: z.string().describe("The key name of the tag."),
  Key: z.string().describe("The value for the tag."),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  IpAddressType: z.string().describe(
    "The type of IP address used for this target group. The possible values are ipv4 and ipv6.",
  ).optional(),
  HealthCheckIntervalSeconds: z.number().int().describe(
    "The approximate amount of time, in seconds, between health checks of an individual target.",
  ).optional(),
  Matcher: z.object({
    GrpcCode: z.string().describe(
      "You can specify values between 0 and 99. You can specify multiple values, or a range of values. The default value is 12.",
    ).optional(),
    HttpCode: z.string().describe(
      "For Application Load Balancers, you can specify values between 200 and 499, and the default value is 200. You can specify multiple values or a range of values.",
    ).optional(),
  }).describe(
    "[HTTP/HTTPS health checks] The HTTP or gRPC codes to use when checking for a successful response from a target.",
  ).optional(),
  HealthCheckPath: z.string().describe(
    "[HTTP/HTTPS health checks] The destination for health checks on the targets. [HTTP1 or HTTP2 protocol version] The ping path. The default is /. [GRPC protocol version] The path of a custom health check method with the format /package.service/method. The default is /AWS.ALB/healthcheck.",
  ).optional(),
  Port: z.number().int().describe(
    "The port on which the targets receive traffic. This port is used unless you specify a port override when registering the target. If the target is a Lambda function, this parameter does not apply. If the protocol is GENEVE, the supported port is 6081.",
  ).optional(),
  Targets: z.array(TargetDescriptionSchema).describe("The targets.").optional(),
  HealthCheckEnabled: z.boolean().describe(
    "Indicates whether health checks are enabled. If the target type is lambda, health checks are disabled by default but can be enabled. If the target type is instance, ip, or alb, health checks are always enabled and cannot be disabled.",
  ).optional(),
  ProtocolVersion: z.string().describe(
    "[HTTP/HTTPS protocol] The protocol version. The possible values are GRPC, HTTP1, and HTTP2.",
  ).optional(),
  UnhealthyThresholdCount: z.number().int().describe(
    "The number of consecutive health check failures required before considering a target unhealthy.",
  ).optional(),
  HealthCheckTimeoutSeconds: z.number().int().describe(
    "The amount of time, in seconds, during which no response from a target means a failed health check.",
  ).optional(),
  Name: z.string().describe("The name of the target group.").optional(),
  VpcId: z.string().describe(
    "The identifier of the virtual private cloud (VPC). If the target is a Lambda function, this parameter does not apply.",
  ).optional(),
  HealthyThresholdCount: z.number().int().describe(
    "The number of consecutive health checks successes required before considering an unhealthy target healthy.",
  ).optional(),
  HealthCheckProtocol: z.string().describe(
    "The protocol the load balancer uses when performing health checks on targets.",
  ).optional(),
  TargetGroupAttributes: z.array(TargetGroupAttributeSchema).describe(
    "The attributes.",
  ).optional(),
  TargetType: z.string().describe(
    "The type of target that you must specify when registering targets with this target group. You can't specify targets for a target group using more than one target type.",
  ).optional(),
  HealthCheckPort: z.string().describe(
    "The port the load balancer uses when performing health checks on targets.",
  ).optional(),
  Protocol: z.string().describe(
    "The protocol to use for routing traffic to the targets.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags.").optional(),
  TargetControlPort: z.number().int().describe(
    "The port that the target control agent uses to communicate the available capacity of targets to the load balancer.",
  ).optional(),
});

const StateSchema = z.object({
  IpAddressType: z.string().optional(),
  HealthCheckIntervalSeconds: z.number().optional(),
  LoadBalancerArns: z.array(z.string()).optional(),
  Matcher: z.object({
    GrpcCode: z.string(),
    HttpCode: z.string(),
  }).optional(),
  HealthCheckPath: z.string().optional(),
  Port: z.number().optional(),
  Targets: z.array(TargetDescriptionSchema).optional(),
  HealthCheckEnabled: z.boolean().optional(),
  ProtocolVersion: z.string().optional(),
  UnhealthyThresholdCount: z.number().optional(),
  HealthCheckTimeoutSeconds: z.number().optional(),
  Name: z.string().optional(),
  VpcId: z.string().optional(),
  TargetGroupFullName: z.string().optional(),
  HealthyThresholdCount: z.number().optional(),
  HealthCheckProtocol: z.string().optional(),
  TargetGroupAttributes: z.array(TargetGroupAttributeSchema).optional(),
  TargetType: z.string().optional(),
  HealthCheckPort: z.string().optional(),
  TargetGroupArn: z.string(),
  Protocol: z.string().optional(),
  TargetGroupName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TargetControlPort: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  IpAddressType: z.string().describe(
    "The type of IP address used for this target group. The possible values are ipv4 and ipv6.",
  ).optional(),
  HealthCheckIntervalSeconds: z.number().int().describe(
    "The approximate amount of time, in seconds, between health checks of an individual target.",
  ).optional(),
  Matcher: z.object({
    GrpcCode: z.string().describe(
      "You can specify values between 0 and 99. You can specify multiple values, or a range of values. The default value is 12.",
    ).optional(),
    HttpCode: z.string().describe(
      "For Application Load Balancers, you can specify values between 200 and 499, and the default value is 200. You can specify multiple values or a range of values.",
    ).optional(),
  }).describe(
    "[HTTP/HTTPS health checks] The HTTP or gRPC codes to use when checking for a successful response from a target.",
  ).optional(),
  HealthCheckPath: z.string().describe(
    "[HTTP/HTTPS health checks] The destination for health checks on the targets. [HTTP1 or HTTP2 protocol version] The ping path. The default is /. [GRPC protocol version] The path of a custom health check method with the format /package.service/method. The default is /AWS.ALB/healthcheck.",
  ).optional(),
  Port: z.number().int().describe(
    "The port on which the targets receive traffic. This port is used unless you specify a port override when registering the target. If the target is a Lambda function, this parameter does not apply. If the protocol is GENEVE, the supported port is 6081.",
  ).optional(),
  Targets: z.array(TargetDescriptionSchema).describe("The targets.").optional(),
  HealthCheckEnabled: z.boolean().describe(
    "Indicates whether health checks are enabled. If the target type is lambda, health checks are disabled by default but can be enabled. If the target type is instance, ip, or alb, health checks are always enabled and cannot be disabled.",
  ).optional(),
  ProtocolVersion: z.string().describe(
    "[HTTP/HTTPS protocol] The protocol version. The possible values are GRPC, HTTP1, and HTTP2.",
  ).optional(),
  UnhealthyThresholdCount: z.number().int().describe(
    "The number of consecutive health check failures required before considering a target unhealthy.",
  ).optional(),
  HealthCheckTimeoutSeconds: z.number().int().describe(
    "The amount of time, in seconds, during which no response from a target means a failed health check.",
  ).optional(),
  Name: z.string().describe("The name of the target group.").optional(),
  VpcId: z.string().describe(
    "The identifier of the virtual private cloud (VPC). If the target is a Lambda function, this parameter does not apply.",
  ).optional(),
  HealthyThresholdCount: z.number().int().describe(
    "The number of consecutive health checks successes required before considering an unhealthy target healthy.",
  ).optional(),
  HealthCheckProtocol: z.string().describe(
    "The protocol the load balancer uses when performing health checks on targets.",
  ).optional(),
  TargetGroupAttributes: z.array(TargetGroupAttributeSchema).describe(
    "The attributes.",
  ).optional(),
  TargetType: z.string().describe(
    "The type of target that you must specify when registering targets with this target group. You can't specify targets for a target group using more than one target type.",
  ).optional(),
  HealthCheckPort: z.string().describe(
    "The port the load balancer uses when performing health checks on targets.",
  ).optional(),
  Protocol: z.string().describe(
    "The protocol to use for routing traffic to the targets.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags.").optional(),
  TargetControlPort: z.number().int().describe(
    "The port that the target control agent uses to communicate the available capacity of targets to the load balancer.",
  ).optional(),
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

/** Swamp extension model for ElasticLoadBalancingV2 TargetGroup. Registered at `@swamp/aws/elasticloadbalancingv2/target-group`. */
export const model = {
  type: "@swamp/aws/elasticloadbalancingv2/target-group",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ElasticLoadBalancingV2 TargetGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ElasticLoadBalancingV2 TargetGroup",
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
          "AWS::ElasticLoadBalancingV2::TargetGroup",
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
      description: "Get a ElasticLoadBalancingV2 TargetGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancingV2 TargetGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ElasticLoadBalancingV2::TargetGroup",
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
      description: "Update a ElasticLoadBalancingV2 TargetGroup",
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
        const identifier = existing.TargetGroupArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ElasticLoadBalancingV2::TargetGroup",
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
          "AWS::ElasticLoadBalancingV2::TargetGroup",
          identifier,
          currentState,
          desiredState,
          [
            "TargetType",
            "ProtocolVersion",
            "Port",
            "Name",
            "VpcId",
            "Protocol",
            "IpAddressType",
          ],
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
      description: "Delete a ElasticLoadBalancingV2 TargetGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ElasticLoadBalancingV2 TargetGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ElasticLoadBalancingV2::TargetGroup",
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
      description: "Sync ElasticLoadBalancingV2 TargetGroup state from AWS",
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
        const identifier = existing.TargetGroupArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ElasticLoadBalancingV2::TargetGroup",
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
