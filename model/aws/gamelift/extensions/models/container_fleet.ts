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

// Auto-generated extension model for @swamp/aws/gamelift/container-fleet
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for GameLift ContainerFleet (AWS::GameLift::ContainerFleet).
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

const IpPermissionSchema = z.object({
  FromPort: z.number().int().min(1).max(60000).describe(
    "A starting value for a range of allowed port numbers.",
  ),
  IpRange: z.string().regex(
    new RegExp(
      "(^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(/([0-9]|[1-2][0-9]|3[0-2]))$)",
    ),
  ).describe(
    'A range of allowed IP addresses. This value must be expressed in CIDR notation. Example: "000.000.000.000/[subnet mask]" or optionally the shortened version "0.0.0.0/[subnet mask]".',
  ),
  Protocol: z.enum(["TCP", "UDP"]).describe(
    "The network communication protocol used by the fleet.",
  ),
  ToPort: z.number().int().min(1).max(60000).describe(
    "An ending value for a range of allowed port numbers. Port numbers are end-inclusive. This value must be higher than FromPort.",
  ),
});

const ManagedCapacityConfigurationSchema = z.object({
  ZeroCapacityStrategy: z.enum(["SCALE_TO_AND_FROM_ZERO", "MANUAL"]).describe(
    "The strategy Amazon GameLift Servers will use to automatically scale your capacity to and from zero in response to game session activity. Game session activity refers to any active running sessions or game session requests. When set to SCALE_TO_AND_FROM_ZERO, MinSize must not be specified and will be managed automatically. When set to MANUAL, MinSize is required.",
  ),
  ScaleInAfterInactivityMinutes: z.number().int().min(5).max(1440).describe(
    "Length of time, in minutes, that Amazon GameLift Servers will wait before scaling in your MinSize and DesiredInstances to 0 after a period with no game session activity.",
  ).optional(),
});

const LocationCapacitySchema = z.object({
  DesiredEC2Instances: z.number().int().min(0).describe(
    "Defaults to MinSize if not defined. The number of EC2 instances you want to maintain in the specified fleet location. This value must fall between the minimum and maximum size limits. If any auto-scaling policy is defined for the container fleet, the desired instance will only be applied once during fleet creation and will be ignored in updates to avoid conflicts with auto-scaling. During updates with any auto-scaling policy defined, if current desired instance is lower than the new MinSize, it will be increased to the new MinSize; if current desired instance is larger than the new MaxSize, it will be decreased to the new MaxSize.",
  ).optional(),
  MinSize: z.number().int().min(0).describe(
    "The minimum value allowed for the fleet's instance count for a location.",
  ).optional(),
  MaxSize: z.number().int().min(0).describe(
    "The maximum value that is allowed for the fleet's instance count for a location.",
  ),
  ManagedCapacityConfiguration: ManagedCapacityConfigurationSchema.describe(
    "Configuration options for Amazon GameLift Servers-managed capacity behavior.",
  ).optional(),
});

const LocationConfigurationSchema = z.object({
  Location: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z0-9\\-]+")),
  LocationCapacity: LocationCapacitySchema.describe(
    "Current resource capacity settings in a specified fleet or location. The location value might refer to a fleet's remote location or its home Region.",
  ).optional(),
  StoppedActions: z.array(z.enum(["AUTO_SCALING"])).describe(
    "A list of fleet actions that have been suspended in the fleet location.",
  ).optional(),
  PlayerGatewayStatus: z.enum(["DISABLED", "ENABLED"]).describe(
    "The player gateway status for the location.",
  ).optional(),
});

const TargetConfigurationSchema = z.object({
  TargetValue: z.number().describe(
    "Desired value to use with a target-based scaling policy. The value must be relevant for whatever metric the scaling policy is using. For example, in a policy using the metric PercentAvailableGameSessions, the target value should be the preferred size of the fleet's buffer (the percent of capacity that should be idle and ready for new game sessions).",
  ),
});

const ScalingPolicySchema = z.object({
  ComparisonOperator: z.enum([
    "GreaterThanOrEqualToThreshold",
    "GreaterThanThreshold",
    "LessThanThreshold",
    "LessThanOrEqualToThreshold",
  ]).describe(
    "Comparison operator to use when measuring a metric against the threshold value.",
  ).optional(),
  EvaluationPeriods: z.number().int().min(1).describe(
    "Length of time (in minutes) the metric must be at or beyond the threshold before a scaling event is triggered.",
  ).optional(),
  MetricName: z.enum([
    "ActivatingGameSessions",
    "ActiveGameSessions",
    "ActiveInstances",
    "AvailableGameSessions",
    "AvailablePlayerSessions",
    "CurrentPlayerSessions",
    "IdleInstances",
    "PercentAvailableGameSessions",
    "PercentIdleInstances",
    "QueueDepth",
    "WaitTime",
    "ConcurrentActivatableGameSessions",
  ]).describe(
    "Name of the Amazon GameLift-defined metric that is used to trigger a scaling adjustment.",
  ),
  Name: z.string().min(1).max(1024).describe(
    "A descriptive label that is associated with a fleet's scaling policy. Policy names do not need to be unique.",
  ),
  PolicyType: z.enum(["RuleBased", "TargetBased"]).describe(
    "The type of scaling policy to create. For a target-based policy, set the parameter MetricName to 'PercentAvailableGameSessions' and specify a TargetConfiguration. For a rule-based policy set the following parameters: MetricName, ComparisonOperator, Threshold, EvaluationPeriods, ScalingAdjustmentType, and ScalingAdjustment.",
  ).optional(),
  ScalingAdjustment: z.number().int().describe(
    "Amount of adjustment to make, based on the scaling adjustment type.",
  ).optional(),
  ScalingAdjustmentType: z.enum([
    "ChangeInCapacity",
    "ExactCapacity",
    "PercentChangeInCapacity",
  ]).describe("The type of adjustment to make to a fleet's instance count.")
    .optional(),
  TargetConfiguration: TargetConfigurationSchema.describe(
    "An object that contains settings for a target-based scaling policy.",
  ).optional(),
  Threshold: z.number().describe(
    "Metric value used to trigger a scaling event.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length.",
  ),
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
  FleetRoleArn: z.string().min(1).max(256).regex(
    new RegExp("^arn:aws(-.*)?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$"),
  ).describe(
    "A unique identifier for an AWS IAM role that manages access to your AWS services. Create a role or look up a role's ARN from the IAM dashboard in the AWS Management Console.",
  ),
  Description: z.string().min(1).max(1024).describe(
    "A human-readable description of a fleet.",
  ).optional(),
  GameServerContainerGroupDefinitionName: z.string().min(1).max(512).regex(
    new RegExp(
      "^[a-zA-Z0-9\\-]+$|^arn:.*:containergroupdefinition\\/[a-zA-Z0-9\\-]+(:[0-9]+)?$",
    ),
  ).describe(
    "The name of the container group definition that will be created per game server. You must specify GAME_SERVER container group. You have the option to also specify one PER_INSTANCE container group.",
  ).optional(),
  PerInstanceContainerGroupDefinitionName: z.string().min(1).max(512).regex(
    new RegExp(
      "^[a-zA-Z0-9\\-]+$|^arn:.*:containergroupdefinition\\/[a-zA-Z0-9\\-]+(:[0-9]+)?$",
    ),
  ).describe(
    "The name of the container group definition that will be created per instance. This field is optional if you specify GameServerContainerGroupDefinitionName.",
  ).optional(),
  InstanceConnectionPortRange: z.object({
    FromPort: z.number().int().min(1).max(60000).describe(
      "A starting value for a range of allowed port numbers.",
    ),
    ToPort: z.number().int().min(1).max(60000).describe(
      "An ending value for a range of allowed port numbers. Port numbers are end-inclusive. This value must be higher than FromPort.",
    ),
  }).describe(
    "Defines the range of ports on the instance that allow inbound traffic to connect with containers in a fleet.",
  ).optional(),
  InstanceInboundPermissions: z.array(IpPermissionSchema).describe(
    "A range of IP addresses and port settings that allow inbound traffic to connect to server processes on an Amazon GameLift server.",
  ).optional(),
  GameServerContainerGroupsPerInstance: z.number().int().min(1).max(5000)
    .describe(
      "The number of desired game server container groups per instance, a number between 1-5000.",
    ).optional(),
  DeploymentDetails: z.object({
    LatestDeploymentId: z.string().max(1024).regex(
      new RegExp("^[a-zA-Z0-9\\-]+$|^$"),
    ).describe(
      "The ID of the last deployment on the container fleet. This field will be empty if the container fleet does not have a ContainerGroupDefinition attached.",
    ).optional(),
  }).describe(
    "Provides information about the last deployment ID and its status.",
  ).optional(),
  DeploymentConfiguration: z.object({
    ProtectionStrategy: z.enum(["WITH_PROTECTION", "IGNORE_PROTECTION"])
      .describe(
        "The protection strategy for deployment on the container fleet; defaults to WITH_PROTECTION.",
      ).optional(),
    MinimumHealthyPercentage: z.number().int().min(30).max(75).describe(
      "The minimum percentage of healthy required; defaults to 75.",
    ).optional(),
    ImpairmentStrategy: z.enum(["MAINTAIN", "ROLLBACK"]).describe(
      "The strategy to apply in case of impairment; defaults to MAINTAIN.",
    ).optional(),
  }).describe(
    "Provides details about how to drain old tasks and replace them with new updated tasks.",
  ).optional(),
  InstanceType: z.string().min(1).max(1024).describe(
    "The name of an EC2 instance type that is supported in Amazon GameLift. A fleet instance type determines the computing resources of each instance in the fleet, including CPU, memory, storage, and networking capacity. Amazon GameLift supports the following EC2 instance types. See Amazon EC2 Instance Types for detailed descriptions.",
  ).optional(),
  BillingType: z.enum(["ON_DEMAND", "SPOT"]).describe(
    "Indicates whether to use On-Demand instances or Spot instances for this fleet. If empty, the default is ON_DEMAND. Both categories of instances use identical hardware and configurations based on the instance type selected for this fleet.",
  ).optional(),
  Locations: z.array(LocationConfigurationSchema).optional(),
  ScalingPolicies: z.array(ScalingPolicySchema).describe(
    "A list of rules that control how a fleet is scaled.",
  ).optional(),
  MetricGroups: z.array(z.string()).describe(
    "The name of an Amazon CloudWatch metric group. A metric group aggregates the metrics for all fleets in the group. Specify a string containing the metric group name. You can use an existing name or use a new name to create a new metric group. Currently, this parameter can have only one string.",
  ).optional(),
  NewGameSessionProtectionPolicy: z.enum(["FullProtection", "NoProtection"])
    .describe(
      "A game session protection policy to apply to all game sessions hosted on instances in this fleet. When protected, active game sessions cannot be terminated during a scale-down event. If this parameter is not set, instances in this fleet default to no protection. You can change a fleet's protection policy to affect future game sessions on the fleet. You can also set protection for individual game sessions.",
    ).optional(),
  GameSessionCreationLimitPolicy: z.object({
    NewGameSessionsPerCreator: z.number().int().min(0).describe(
      "The maximum number of game sessions that an individual can create during the policy period.",
    ).optional(),
    PolicyPeriodInMinutes: z.number().int().min(0).describe(
      "The time span used in evaluating the resource creation limit policy.",
    ).optional(),
  }).describe(
    "A policy that limits the number of game sessions an individual player can create over a span of time for this fleet.",
  ).optional(),
  LogConfiguration: z.object({
    LogDestination: z.enum(["NONE", "CLOUDWATCH", "S3"]).describe(
      "Configures the service that provides logs.",
    ).optional(),
    LogGroupArn: z.string().min(1).max(512).regex(
      new RegExp("[a-zA-Z0-9:/\\-\\*]+"),
    ).describe(
      "If log destination is CLOUDWATCH, logs are sent to the specified log group in Amazon CloudWatch.",
    ).optional(),
    S3BucketName: z.string().min(1).max(1024).describe(
      "The name of the S3 bucket to pull logs from if S3 is the LogDestination",
    ).optional(),
  }).describe("A policy the location and provider of logs from the fleet.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  PlayerGatewayMode: z.enum(["DISABLED", "ENABLED", "REQUIRED"]).describe(
    "The player gateway mode for the container fleet.",
  ).optional(),
});

const StateSchema = z.object({
  FleetId: z.string(),
  FleetRoleArn: z.string().optional(),
  Description: z.string().optional(),
  GameServerContainerGroupDefinitionName: z.string().optional(),
  GameServerContainerGroupDefinitionArn: z.string().optional(),
  PerInstanceContainerGroupDefinitionName: z.string().optional(),
  PerInstanceContainerGroupDefinitionArn: z.string().optional(),
  InstanceConnectionPortRange: z.object({
    FromPort: z.number(),
    ToPort: z.number(),
  }).optional(),
  InstanceInboundPermissions: z.array(IpPermissionSchema).optional(),
  GameServerContainerGroupsPerInstance: z.number().optional(),
  MaximumGameServerContainerGroupsPerInstance: z.number().optional(),
  CreationTime: z.string().optional(),
  Status: z.string().optional(),
  DeploymentDetails: z.object({
    LatestDeploymentId: z.string(),
  }).optional(),
  DeploymentConfiguration: z.object({
    ProtectionStrategy: z.string(),
    MinimumHealthyPercentage: z.number(),
    ImpairmentStrategy: z.string(),
  }).optional(),
  InstanceType: z.string().optional(),
  BillingType: z.string().optional(),
  Locations: z.array(LocationConfigurationSchema).optional(),
  ScalingPolicies: z.array(ScalingPolicySchema).optional(),
  MetricGroups: z.array(z.string()).optional(),
  NewGameSessionProtectionPolicy: z.string().optional(),
  GameSessionCreationLimitPolicy: z.object({
    NewGameSessionsPerCreator: z.number(),
    PolicyPeriodInMinutes: z.number(),
  }).optional(),
  LogConfiguration: z.object({
    LogDestination: z.string(),
    LogGroupArn: z.string(),
    S3BucketName: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  PlayerGatewayMode: z.string().optional(),
  FleetArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FleetRoleArn: z.string().min(1).max(256).regex(
    new RegExp("^arn:aws(-.*)?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$"),
  ).describe(
    "A unique identifier for an AWS IAM role that manages access to your AWS services. Create a role or look up a role's ARN from the IAM dashboard in the AWS Management Console.",
  ).optional(),
  Description: z.string().min(1).max(1024).describe(
    "A human-readable description of a fleet.",
  ).optional(),
  GameServerContainerGroupDefinitionName: z.string().min(1).max(512).regex(
    new RegExp(
      "^[a-zA-Z0-9\\-]+$|^arn:.*:containergroupdefinition\\/[a-zA-Z0-9\\-]+(:[0-9]+)?$",
    ),
  ).describe(
    "The name of the container group definition that will be created per game server. You must specify GAME_SERVER container group. You have the option to also specify one PER_INSTANCE container group.",
  ).optional(),
  PerInstanceContainerGroupDefinitionName: z.string().min(1).max(512).regex(
    new RegExp(
      "^[a-zA-Z0-9\\-]+$|^arn:.*:containergroupdefinition\\/[a-zA-Z0-9\\-]+(:[0-9]+)?$",
    ),
  ).describe(
    "The name of the container group definition that will be created per instance. This field is optional if you specify GameServerContainerGroupDefinitionName.",
  ).optional(),
  InstanceConnectionPortRange: z.object({
    FromPort: z.number().int().min(1).max(60000).describe(
      "A starting value for a range of allowed port numbers.",
    ).optional(),
    ToPort: z.number().int().min(1).max(60000).describe(
      "An ending value for a range of allowed port numbers. Port numbers are end-inclusive. This value must be higher than FromPort.",
    ).optional(),
  }).describe(
    "Defines the range of ports on the instance that allow inbound traffic to connect with containers in a fleet.",
  ).optional(),
  InstanceInboundPermissions: z.array(IpPermissionSchema).describe(
    "A range of IP addresses and port settings that allow inbound traffic to connect to server processes on an Amazon GameLift server.",
  ).optional(),
  GameServerContainerGroupsPerInstance: z.number().int().min(1).max(5000)
    .describe(
      "The number of desired game server container groups per instance, a number between 1-5000.",
    ).optional(),
  DeploymentDetails: z.object({
    LatestDeploymentId: z.string().max(1024).regex(
      new RegExp("^[a-zA-Z0-9\\-]+$|^$"),
    ).describe(
      "The ID of the last deployment on the container fleet. This field will be empty if the container fleet does not have a ContainerGroupDefinition attached.",
    ).optional(),
  }).describe(
    "Provides information about the last deployment ID and its status.",
  ).optional(),
  DeploymentConfiguration: z.object({
    ProtectionStrategy: z.enum(["WITH_PROTECTION", "IGNORE_PROTECTION"])
      .describe(
        "The protection strategy for deployment on the container fleet; defaults to WITH_PROTECTION.",
      ).optional(),
    MinimumHealthyPercentage: z.number().int().min(30).max(75).describe(
      "The minimum percentage of healthy required; defaults to 75.",
    ).optional(),
    ImpairmentStrategy: z.enum(["MAINTAIN", "ROLLBACK"]).describe(
      "The strategy to apply in case of impairment; defaults to MAINTAIN.",
    ).optional(),
  }).describe(
    "Provides details about how to drain old tasks and replace them with new updated tasks.",
  ).optional(),
  InstanceType: z.string().min(1).max(1024).describe(
    "The name of an EC2 instance type that is supported in Amazon GameLift. A fleet instance type determines the computing resources of each instance in the fleet, including CPU, memory, storage, and networking capacity. Amazon GameLift supports the following EC2 instance types. See Amazon EC2 Instance Types for detailed descriptions.",
  ).optional(),
  BillingType: z.enum(["ON_DEMAND", "SPOT"]).describe(
    "Indicates whether to use On-Demand instances or Spot instances for this fleet. If empty, the default is ON_DEMAND. Both categories of instances use identical hardware and configurations based on the instance type selected for this fleet.",
  ).optional(),
  Locations: z.array(LocationConfigurationSchema).optional(),
  ScalingPolicies: z.array(ScalingPolicySchema).describe(
    "A list of rules that control how a fleet is scaled.",
  ).optional(),
  MetricGroups: z.array(z.string()).describe(
    "The name of an Amazon CloudWatch metric group. A metric group aggregates the metrics for all fleets in the group. Specify a string containing the metric group name. You can use an existing name or use a new name to create a new metric group. Currently, this parameter can have only one string.",
  ).optional(),
  NewGameSessionProtectionPolicy: z.enum(["FullProtection", "NoProtection"])
    .describe(
      "A game session protection policy to apply to all game sessions hosted on instances in this fleet. When protected, active game sessions cannot be terminated during a scale-down event. If this parameter is not set, instances in this fleet default to no protection. You can change a fleet's protection policy to affect future game sessions on the fleet. You can also set protection for individual game sessions.",
    ).optional(),
  GameSessionCreationLimitPolicy: z.object({
    NewGameSessionsPerCreator: z.number().int().min(0).describe(
      "The maximum number of game sessions that an individual can create during the policy period.",
    ).optional(),
    PolicyPeriodInMinutes: z.number().int().min(0).describe(
      "The time span used in evaluating the resource creation limit policy.",
    ).optional(),
  }).describe(
    "A policy that limits the number of game sessions an individual player can create over a span of time for this fleet.",
  ).optional(),
  LogConfiguration: z.object({
    LogDestination: z.enum(["NONE", "CLOUDWATCH", "S3"]).describe(
      "Configures the service that provides logs.",
    ).optional(),
    LogGroupArn: z.string().min(1).max(512).regex(
      new RegExp("[a-zA-Z0-9:/\\-\\*]+"),
    ).describe(
      "If log destination is CLOUDWATCH, logs are sent to the specified log group in Amazon CloudWatch.",
    ).optional(),
    S3BucketName: z.string().min(1).max(1024).describe(
      "The name of the S3 bucket to pull logs from if S3 is the LogDestination",
    ).optional(),
  }).describe("A policy the location and provider of logs from the fleet.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  PlayerGatewayMode: z.enum(["DISABLED", "ENABLED", "REQUIRED"]).describe(
    "The player gateway mode for the container fleet.",
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

/** Swamp extension model for GameLift ContainerFleet. Registered at `@swamp/aws/gamelift/container-fleet`. */
export const model = {
  type: "@swamp/aws/gamelift/container-fleet",
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
      description: "GameLift ContainerFleet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GameLift ContainerFleet",
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
          "AWS::GameLift::ContainerFleet",
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
      description: "Get a GameLift ContainerFleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GameLift ContainerFleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::GameLift::ContainerFleet",
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
      description: "Update a GameLift ContainerFleet",
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
        const identifier = existing.FleetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::GameLift::ContainerFleet",
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
          "AWS::GameLift::ContainerFleet",
          identifier,
          currentState,
          desiredState,
          ["InstanceType", "BillingType", "PlayerGatewayMode"],
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
      description: "Delete a GameLift ContainerFleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GameLift ContainerFleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::GameLift::ContainerFleet",
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
      description: "Sync GameLift ContainerFleet state from AWS",
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
        const identifier = existing.FleetId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::GameLift::ContainerFleet",
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
