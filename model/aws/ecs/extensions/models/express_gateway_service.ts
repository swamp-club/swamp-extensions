// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/ecs/express-gateway-service
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ECS ExpressGatewayService (AWS::ECS::ExpressGatewayService).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const ExpressGatewayRepositoryCredentialsSchema = z.object({
  CredentialsParameter: z.string(),
});

const SecretSchema = z.object({
  ValueFrom: z.string(),
  Name: z.string(),
});

const ExpressGatewayServiceAwsLogsConfigurationSchema = z.object({
  LogStreamPrefix: z.string(),
  LogGroup: z.string(),
});

const KeyValuePairSchema = z.object({
  Value: z.string(),
  Name: z.string(),
});

const TagSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const ExpressGatewayRepositoryCredentialsStateSchema = z.object({
  CredentialsParameter: z.string(),
}).partial();

const SecretStateSchema = z.object({
  ValueFrom: z.string(),
  Name: z.string(),
}).partial();

const ExpressGatewayServiceAwsLogsConfigurationStateSchema = z.object({
  LogStreamPrefix: z.string(),
  LogGroup: z.string(),
}).partial();

const KeyValuePairStateSchema = z.object({
  Value: z.string(),
  Name: z.string(),
}).partial();

const IngressPathArnsStateSchema = z.object({
  ListenerArn: z.string(),
  LoadBalancerArn: z.string(),
  TargetGroupArns: z.array(z.string()),
  ListenerRuleArn: z.string(),
  LoadBalancerSecurityGroups: z.array(z.string()),
  CertificateArn: z.string(),
}).partial();

const AutoScalingArnsStateSchema = z.object({
  ScalableTarget: z.string(),
  ApplicationAutoScalingPolicies: z.array(z.string()),
}).partial();

const ExpressGatewayContainerStateSchema = z.object({
  RepositoryCredentials: ExpressGatewayRepositoryCredentialsStateSchema,
  Secrets: z.array(SecretStateSchema),
  Command: z.array(z.string()),
  AwsLogsConfiguration: ExpressGatewayServiceAwsLogsConfigurationStateSchema,
  ContainerPort: z.number(),
  Environment: z.array(KeyValuePairStateSchema),
  Image: z.string(),
}).partial();

const ExpressGatewayScalingTargetStateSchema = z.object({
  MinTaskCount: z.number(),
  MaxTaskCount: z.number(),
  AutoScalingMetric: z.string(),
  AutoScalingTargetValue: z.number(),
}).partial();

const IngressPathSummaryStateSchema = z.object({
  Endpoint: z.string(),
  AccessType: z.string(),
}).partial();

const ExpressGatewayServiceNetworkConfigurationStateSchema = z.object({
  SecurityGroups: z.array(z.string()),
  Subnets: z.array(z.string()),
}).partial();

const ExpressGatewayServiceConfigurationStateSchema = z.object({
  ServiceRevisionArn: z.string(),
  TaskRoleArn: z.string(),
  PrimaryContainer: ExpressGatewayContainerStateSchema,
  Memory: z.string(),
  HealthCheckPath: z.string(),
  CreatedAt: z.string(),
  Cpu: z.string(),
  ExecutionRoleArn: z.string(),
  ScalingTarget: ExpressGatewayScalingTargetStateSchema,
  IngressPaths: z.array(IngressPathSummaryStateSchema),
  NetworkConfiguration: ExpressGatewayServiceNetworkConfigurationStateSchema,
  TaskDefinitionArn: z.string(),
}).partial();

const TagStateSchema = z.object({
  Value: z.string(),
  Key: z.string(),
}).partial();

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
  Status: z.object({
    StatusCode: z.enum(["ACTIVE", "DRAINING", "INACTIVE"]).optional(),
  }).optional(),
  TaskRoleArn: z.string().optional(),
  PrimaryContainer: z.object({
    RepositoryCredentials: ExpressGatewayRepositoryCredentialsSchema.optional(),
    Secrets: z.array(SecretSchema).optional(),
    Command: z.array(z.string()).optional(),
    AwsLogsConfiguration: ExpressGatewayServiceAwsLogsConfigurationSchema
      .optional(),
    ContainerPort: z.number().int().optional(),
    Environment: z.array(KeyValuePairSchema).optional(),
    Image: z.string(),
  }).optional(),
  Memory: z.string().optional(),
  HealthCheckPath: z.string().optional(),
  Cluster: z.string().optional(),
  Cpu: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  InfrastructureRoleArn: z.string().optional(),
  ScalingTarget: z.object({
    MinTaskCount: z.number().int().optional(),
    MaxTaskCount: z.number().int().optional(),
    AutoScalingMetric: z.enum([
      "AVERAGE_CPU",
      "AVERAGE_MEMORY",
      "REQUEST_COUNT_PER_TARGET",
    ]).optional(),
    AutoScalingTargetValue: z.number().int().optional(),
  }).optional(),
  ServiceName: z.string().optional(),
  NetworkConfiguration: z.object({
    SecurityGroups: z.array(z.string()).optional(),
    Subnets: z.array(z.string()).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  TaskDefinitionArn: z.string().optional(),
});

const StateSchema = z.object({
  Status: z.object({
    StatusCode: z.string(),
  }).partial().optional(),
  TaskRoleArn: z.string().optional(),
  PrimaryContainer: z.object({
    RepositoryCredentials: ExpressGatewayRepositoryCredentialsStateSchema,
    Secrets: z.array(SecretStateSchema),
    Command: z.array(z.string()),
    AwsLogsConfiguration: ExpressGatewayServiceAwsLogsConfigurationStateSchema,
    ContainerPort: z.number(),
    Environment: z.array(KeyValuePairStateSchema),
    Image: z.string(),
  }).partial().optional(),
  Memory: z.string().optional(),
  HealthCheckPath: z.string().optional(),
  CreatedAt: z.string().optional(),
  Cluster: z.string().optional(),
  Cpu: z.string().optional(),
  ServiceArn: z.string(),
  ECSManagedResourceArns: z.object({
    LogGroups: z.array(z.string()),
    ServiceSecurityGroups: z.array(z.string()),
    MetricAlarms: z.array(z.string()),
    IngressPath: IngressPathArnsStateSchema,
    AutoScaling: AutoScalingArnsStateSchema,
  }).partial().optional(),
  UpdatedAt: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  InfrastructureRoleArn: z.string().optional(),
  ScalingTarget: z.object({
    MinTaskCount: z.number(),
    MaxTaskCount: z.number(),
    AutoScalingMetric: z.string(),
    AutoScalingTargetValue: z.number(),
  }).partial().optional(),
  ActiveConfigurations: z.array(ExpressGatewayServiceConfigurationStateSchema)
    .optional(),
  Endpoint: z.string().optional(),
  ServiceName: z.string().optional(),
  NetworkConfiguration: z.object({
    SecurityGroups: z.array(z.string()),
    Subnets: z.array(z.string()),
  }).partial().optional(),
  Tags: z.array(TagStateSchema).optional(),
  TaskDefinitionArn: z.string().optional(),
}).passthrough();

type StateData = Record<string, unknown>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Status: z.object({
    StatusCode: z.enum(["ACTIVE", "DRAINING", "INACTIVE"]).optional(),
  }).optional(),
  TaskRoleArn: z.string().optional(),
  PrimaryContainer: z.object({
    RepositoryCredentials: ExpressGatewayRepositoryCredentialsSchema.optional(),
    Secrets: z.array(SecretSchema).optional(),
    Command: z.array(z.string()).optional(),
    AwsLogsConfiguration: ExpressGatewayServiceAwsLogsConfigurationSchema
      .optional(),
    ContainerPort: z.number().int().optional(),
    Environment: z.array(KeyValuePairSchema).optional(),
    Image: z.string().optional(),
  }).optional(),
  Memory: z.string().optional(),
  HealthCheckPath: z.string().optional(),
  Cluster: z.string().optional(),
  Cpu: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  InfrastructureRoleArn: z.string().optional(),
  ScalingTarget: z.object({
    MinTaskCount: z.number().int().optional(),
    MaxTaskCount: z.number().int().optional(),
    AutoScalingMetric: z.enum([
      "AVERAGE_CPU",
      "AVERAGE_MEMORY",
      "REQUEST_COUNT_PER_TARGET",
    ]).optional(),
    AutoScalingTargetValue: z.number().int().optional(),
  }).optional(),
  ServiceName: z.string().optional(),
  NetworkConfiguration: z.object({
    SecurityGroups: z.array(z.string()).optional(),
    Subnets: z.array(z.string()).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  TaskDefinitionArn: z.string().optional(),
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

/** Swamp extension model for ECS ExpressGatewayService. Registered at `@swamp/aws/ecs/express-gateway-service`. */
export const model = {
  type: "@swamp/aws/ecs/express-gateway-service",
  version: "2026.11.08.2",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
    {
      toVersion: "2026.07.02.1",
      description: "Added: TaskDefinitionArn",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.16.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ECS ExpressGatewayService resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ECS ExpressGatewayService",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["InfrastructureRoleArn"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ECS::ExpressGatewayService",
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
      description: "Get a ECS ExpressGatewayService",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECS ExpressGatewayService",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ECS::ExpressGatewayService",
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
      description: "Update a ECS ExpressGatewayService",
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
        const identifier = existing.ServiceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ECS::ExpressGatewayService",
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
          "AWS::ECS::ExpressGatewayService",
          identifier,
          currentState,
          desiredState,
          ["ServiceName", "Cluster", "InfrastructureRoleArn", "Tags"],
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
      description: "Delete a ECS ExpressGatewayService",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ECS ExpressGatewayService",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ECS::ExpressGatewayService",
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
      description: "Sync ECS ExpressGatewayService state from AWS",
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
        const identifier = existing.ServiceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ECS::ExpressGatewayService",
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
