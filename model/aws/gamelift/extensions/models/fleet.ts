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

// Auto-generated extension model for @swamp/aws/gamelift/fleet
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for GameLift Fleet (AWS::GameLift::Fleet).
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
  Location: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z0-9\\-]+"))
    .optional(),
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
  Status: z.enum([
    "ACTIVE",
    "UPDATE_REQUESTED",
    "UPDATING",
    "DELETE_REQUESTED",
    "DELETING",
    "DELETED",
    "ERROR",
  ]).describe(
    "Current status of the scaling policy. The scaling policy can be in force only when in an ACTIVE status. Scaling policies can be suspended for individual fleets. If the policy is suspended for a fleet, the policy status does not change.",
  ).optional(),
  TargetConfiguration: TargetConfigurationSchema.describe(
    "An object that contains settings for a target-based scaling policy.",
  ).optional(),
  Threshold: z.number().describe(
    "Metric value used to trigger a scaling event.",
  ).optional(),
  UpdateStatus: z.enum(["PENDING_UPDATE"]).describe(
    "The current status of the fleet's scaling policies in a requested fleet location. The status PENDING_UPDATE indicates that an update was requested for the fleet but has not yet been completed for the location.",
  ).optional(),
});

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
    "Defaults to MinSize if not defined. The number of EC2 instances you want to maintain in the specified fleet location. This value must fall between the minimum and maximum size limits.",
  ).optional(),
  MinSize: z.number().int().min(0).describe(
    'The minimum value allowed for the fleet\'s instance count for a location. When creating a new fleet, GameLift automatically sets this value to "0". After the fleet is active, you can change this value.',
  ).optional(),
  MaxSize: z.number().int().min(0).describe(
    'The maximum value that is allowed for the fleet\'s instance count for a location. When creating a new fleet, GameLift automatically sets this value to "1". Once the fleet is active, you can change this value.',
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
  PlayerGatewayStatus: z.enum(["DISABLED", "ENABLED"]).describe(
    "The player gateway status for the location.",
  ).optional(),
});

const ServerProcessSchema = z.object({
  ConcurrentExecutions: z.number().int().min(1).describe(
    "The number of server processes that use this configuration to run concurrently on an instance.",
  ),
  LaunchPath: z.string().min(1).max(1024).regex(
    new RegExp("^([Cc]:\\\\game\\S+|/local/game/\\S+)"),
  ).describe(
    'The location of the server executable in a custom game build or the name of the Realtime script file that contains the Init() function. Game builds and Realtime scripts are installed on instances at the root: Windows (for custom game builds only): C:\\game. Example: "C:\\game\\MyGame\\server.exe" Linux: /local/game. Examples: "/local/game/MyGame/server.exe" or "/local/game/MyRealtimeScript.js"',
  ),
  Parameters: z.string().min(1).max(1024).describe(
    "An optional list of parameters to pass to the server executable or Realtime script on launch.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ScalingPolicies: z.array(ScalingPolicySchema).describe(
    "A list of rules that control how a fleet is scaled.",
  ).optional(),
  ApplyCapacity: z.enum([
    "ON_UPDATE",
    "ON_CREATE_AND_UPDATE",
    "ON_CREATE_AND_UPDATE_WITH_AUTOSCALING",
  ]).describe(
    "Determines when and how to apply fleet or location capacities. Allowed options are ON_UPDATE (default), ON_CREATE_AND_UPDATE and ON_CREATE_AND_UPDATE_WITH_AUTOSCALING. If you choose ON_CREATE_AND_UPDATE_WITH_AUTOSCALING, MinSize and MaxSize will still be applied on creation and on updates, but DesiredEC2Instances will only be applied once on fleet creation and will be ignored during updates to prevent conflicts with auto-scaling. During updates with ON_CREATE_AND_UPDATE_WITH_AUTOSCALING chosen, if current desired instance is lower than the new MinSize, it will be increased to the new MinSize; if current desired instance is larger than the new MaxSize, it will be decreased to the new MaxSize.",
  ).optional(),
  CertificateConfiguration: z.object({
    CertificateType: z.enum(["DISABLED", "GENERATED"]),
  }).describe(
    "Indicates whether to generate a TLS/SSL certificate for the new fleet. TLS certificates are used for encrypting traffic between game clients and game servers running on GameLift. If this parameter is not set, certificate generation is disabled. This fleet setting cannot be changed once the fleet is created.",
  ).optional(),
  ComputeType: z.enum(["EC2", "ANYWHERE"]).describe(
    "ComputeType to differentiate EC2 hardware managed by GameLift and Anywhere hardware managed by the customer.",
  ).optional(),
  Description: z.string().min(1).max(1024).describe(
    "A human-readable description of a fleet.",
  ).optional(),
  DesiredEC2Instances: z.number().int().min(0).describe(
    '[DEPRECATED] The number of EC2 instances that you want this fleet to host. When creating a new fleet, GameLift automatically sets this value to "1" and initiates a single instance. Once the fleet is active, update this value to trigger GameLift to add or remove instances from the fleet.',
  ).optional(),
  EC2InboundPermissions: z.array(IpPermissionSchema).describe(
    "A range of IP addresses and port settings that allow inbound traffic to connect to server processes on an Amazon GameLift server.",
  ).optional(),
  EC2InstanceType: z.string().regex(new RegExp("^.*..*$")).describe(
    "The name of an EC2 instance type that is supported in Amazon GameLift. A fleet instance type determines the computing resources of each instance in the fleet, including CPU, memory, storage, and networking capacity. Amazon GameLift supports the following EC2 instance types. See Amazon EC2 Instance Types for detailed descriptions.",
  ).optional(),
  FleetType: z.enum(["ON_DEMAND", "SPOT"]).describe(
    "Indicates whether to use On-Demand instances or Spot instances for this fleet. If empty, the default is ON_DEMAND. Both categories of instances use identical hardware and configurations based on the instance type selected for this fleet.",
  ).optional(),
  InstanceRoleARN: z.string().min(1).regex(
    new RegExp("^arn:aws(-.*)?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$"),
  ).describe(
    "A unique identifier for an AWS IAM role that manages access to your AWS services. With an instance role ARN set, any application that runs on an instance in this fleet can assume the role, including install scripts, server processes, and daemons (background processes). Create a role or look up a role's ARN from the IAM dashboard in the AWS Management Console.",
  ).optional(),
  InstanceRoleCredentialsProvider: z.enum(["SHARED_CREDENTIAL_FILE"]).describe(
    "Credentials provider implementation that loads credentials from the Amazon EC2 Instance Metadata Service.",
  ).optional(),
  Locations: z.array(LocationConfigurationSchema).optional(),
  LogPaths: z.array(z.string()).describe(
    "This parameter is no longer used. When hosting a custom game build, specify where Amazon GameLift should store log files using the Amazon GameLift server API call ProcessReady()",
  ).optional(),
  MaxSize: z.number().int().min(0).describe(
    '[DEPRECATED] The maximum value that is allowed for the fleet\'s instance count. When creating a new fleet, GameLift automatically sets this value to "1". Once the fleet is active, you can change this value.',
  ).optional(),
  MetricGroups: z.array(z.string()).describe(
    "The name of an Amazon CloudWatch metric group. A metric group aggregates the metrics for all fleets in the group. Specify a string containing the metric group name. You can use an existing name or use a new name to create a new metric group. Currently, this parameter can have only one string.",
  ).optional(),
  MinSize: z.number().int().min(0).describe(
    '[DEPRECATED] The minimum value allowed for the fleet\'s instance count. When creating a new fleet, GameLift automatically sets this value to "0". After the fleet is active, you can change this value.',
  ).optional(),
  Name: z.string().min(1).max(1024).describe(
    "A descriptive label that is associated with a fleet. Fleet names do not need to be unique.",
  ),
  NewGameSessionProtectionPolicy: z.enum(["FullProtection", "NoProtection"])
    .describe(
      "A game session protection policy to apply to all game sessions hosted on instances in this fleet. When protected, active game sessions cannot be terminated during a scale-down event. If this parameter is not set, instances in this fleet default to no protection. You can change a fleet's protection policy to affect future game sessions on the fleet. You can also set protection for individual game sessions.",
    ).optional(),
  PeerVpcAwsAccountId: z.string().min(1).max(1024).regex(
    new RegExp("^[0-9]{12}$"),
  ).describe(
    "A unique identifier for the AWS account with the VPC that you want to peer your Amazon GameLift fleet with. You can find your account ID in the AWS Management Console under account settings.",
  ).optional(),
  PeerVpcId: z.string().min(1).max(1024).regex(new RegExp("^vpc-\\S+"))
    .describe(
      "A unique identifier for a VPC with resources to be accessed by your Amazon GameLift fleet. The VPC must be in the same Region as your fleet. To look up a VPC ID, use the VPC Dashboard in the AWS Management Console.",
    ).optional(),
  PlayerGatewayConfiguration: z.object({
    GameServerIpProtocolSupported: z.enum(["IPv4", "DUAL_STACK"]).describe(
      "The IP protocol supported by the game server.",
    ).optional(),
  }).describe("Configuration for player gateway.").optional(),
  ResourceCreationLimitPolicy: z.object({
    NewGameSessionsPerCreator: z.number().int().min(0).describe(
      "The maximum number of game sessions that an individual can create during the policy period.",
    ).optional(),
    PolicyPeriodInMinutes: z.number().int().min(0).describe(
      "The time span used in evaluating the resource creation limit policy.",
    ).optional(),
  }).describe(
    "A policy that limits the number of game sessions an individual player can create over a span of time for this fleet.",
  ).optional(),
  BuildId: z.string().regex(new RegExp("^build-\\S+|^arn:.*:build/build-\\S+"))
    .describe(
      "A unique identifier for a build to be deployed on the new fleet. If you are deploying the fleet with a custom game build, you must specify this property. The build must have been successfully uploaded to Amazon GameLift and be in a READY status. This fleet setting cannot be changed once the fleet is created.",
    ).optional(),
  ScriptId: z.string().regex(
    new RegExp("^script-\\S+|^arn:.*:script/script-\\S+"),
  ).describe(
    "A unique identifier for a Realtime script to be deployed on a new Realtime Servers fleet. The script must have been successfully uploaded to Amazon GameLift. This fleet setting cannot be changed once the fleet is created. Note: It is not currently possible to use the!Ref command to reference a script created with a CloudFormation template for the fleet property ScriptId. Instead, use Fn::GetAtt Script.Arn or Fn::GetAtt Script.Id to retrieve either of these properties as input for ScriptId. Alternatively, enter a ScriptId string manually.",
  ).optional(),
  RuntimeConfiguration: z.object({
    GameSessionActivationTimeoutSeconds: z.number().int().min(1).max(600)
      .describe(
        "The maximum amount of time (in seconds) that a game session can remain in status ACTIVATING. If the game session is not active before the timeout, activation is terminated and the game session status is changed to TERMINATED.",
      ).optional(),
    MaxConcurrentGameSessionActivations: z.number().int().min(1).max(2147483647)
      .describe(
        "The maximum number of game sessions with status ACTIVATING to allow on an instance simultaneously. This setting limits the amount of instance resources that can be used for new game activations at any one time.",
      ).optional(),
    ServerProcesses: z.array(ServerProcessSchema).describe(
      "A collection of server process configurations that describe which server processes to run on each instance in a fleet.",
    ).optional(),
  }).describe(
    "Instructions for launching server processes on each instance in the fleet. Server processes run either a custom game build executable or a Realtime script. The runtime configuration defines the server executables or launch script file, launch parameters, and the number of processes to run concurrently on each instance. When creating a fleet, the runtime configuration must have at least one server process configuration; otherwise the request fails with an invalid request exception. This parameter is required unless the parameters ServerLaunchPath and ServerLaunchParameters are defined. Runtime configuration has replaced these parameters, but fleets that use them will continue to work.",
  ).optional(),
  ServerLaunchParameters: z.string().min(1).max(1024).describe(
    "This parameter is no longer used but is retained for backward compatibility. Instead, specify server launch parameters in the RuntimeConfiguration parameter. A request must specify either a runtime configuration or values for both ServerLaunchParameters and ServerLaunchPath.",
  ).optional(),
  ServerLaunchPath: z.string().min(1).max(1024).describe(
    "This parameter is no longer used. Instead, specify a server launch path using the RuntimeConfiguration parameter. Requests that specify a server launch path and launch parameters instead of a runtime configuration will continue to work.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  PlayerGatewayMode: z.enum(["DISABLED", "ENABLED", "REQUIRED"]).describe(
    "The player gateway mode for the fleet.",
  ).optional(),
});

const StateSchema = z.object({
  ScalingPolicies: z.array(ScalingPolicySchema).optional(),
  ApplyCapacity: z.string().optional(),
  CertificateConfiguration: z.object({
    CertificateType: z.string(),
  }).optional(),
  ComputeType: z.string().optional(),
  Description: z.string().optional(),
  DesiredEC2Instances: z.number().optional(),
  EC2InboundPermissions: z.array(IpPermissionSchema).optional(),
  EC2InstanceType: z.string().optional(),
  FleetType: z.string().optional(),
  InstanceRoleARN: z.string().optional(),
  InstanceRoleCredentialsProvider: z.string().optional(),
  Locations: z.array(LocationConfigurationSchema).optional(),
  LogPaths: z.array(z.string()).optional(),
  MaxSize: z.number().optional(),
  MetricGroups: z.array(z.string()).optional(),
  MinSize: z.number().optional(),
  Name: z.string().optional(),
  NewGameSessionProtectionPolicy: z.string().optional(),
  PeerVpcAwsAccountId: z.string().optional(),
  PeerVpcId: z.string().optional(),
  PlayerGatewayConfiguration: z.object({
    GameServerIpProtocolSupported: z.string(),
  }).optional(),
  ResourceCreationLimitPolicy: z.object({
    NewGameSessionsPerCreator: z.number(),
    PolicyPeriodInMinutes: z.number(),
  }).optional(),
  FleetId: z.string(),
  BuildId: z.string().optional(),
  ScriptId: z.string().optional(),
  RuntimeConfiguration: z.object({
    GameSessionActivationTimeoutSeconds: z.number(),
    MaxConcurrentGameSessionActivations: z.number(),
    ServerProcesses: z.array(ServerProcessSchema),
  }).optional(),
  ServerLaunchParameters: z.string().optional(),
  ServerLaunchPath: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  FleetArn: z.string().optional(),
  PlayerGatewayMode: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ScalingPolicies: z.array(ScalingPolicySchema).describe(
    "A list of rules that control how a fleet is scaled.",
  ).optional(),
  ApplyCapacity: z.enum([
    "ON_UPDATE",
    "ON_CREATE_AND_UPDATE",
    "ON_CREATE_AND_UPDATE_WITH_AUTOSCALING",
  ]).describe(
    "Determines when and how to apply fleet or location capacities. Allowed options are ON_UPDATE (default), ON_CREATE_AND_UPDATE and ON_CREATE_AND_UPDATE_WITH_AUTOSCALING. If you choose ON_CREATE_AND_UPDATE_WITH_AUTOSCALING, MinSize and MaxSize will still be applied on creation and on updates, but DesiredEC2Instances will only be applied once on fleet creation and will be ignored during updates to prevent conflicts with auto-scaling. During updates with ON_CREATE_AND_UPDATE_WITH_AUTOSCALING chosen, if current desired instance is lower than the new MinSize, it will be increased to the new MinSize; if current desired instance is larger than the new MaxSize, it will be decreased to the new MaxSize.",
  ).optional(),
  CertificateConfiguration: z.object({
    CertificateType: z.enum(["DISABLED", "GENERATED"]).optional(),
  }).describe(
    "Indicates whether to generate a TLS/SSL certificate for the new fleet. TLS certificates are used for encrypting traffic between game clients and game servers running on GameLift. If this parameter is not set, certificate generation is disabled. This fleet setting cannot be changed once the fleet is created.",
  ).optional(),
  ComputeType: z.enum(["EC2", "ANYWHERE"]).describe(
    "ComputeType to differentiate EC2 hardware managed by GameLift and Anywhere hardware managed by the customer.",
  ).optional(),
  Description: z.string().min(1).max(1024).describe(
    "A human-readable description of a fleet.",
  ).optional(),
  DesiredEC2Instances: z.number().int().min(0).describe(
    '[DEPRECATED] The number of EC2 instances that you want this fleet to host. When creating a new fleet, GameLift automatically sets this value to "1" and initiates a single instance. Once the fleet is active, update this value to trigger GameLift to add or remove instances from the fleet.',
  ).optional(),
  EC2InboundPermissions: z.array(IpPermissionSchema).describe(
    "A range of IP addresses and port settings that allow inbound traffic to connect to server processes on an Amazon GameLift server.",
  ).optional(),
  EC2InstanceType: z.string().regex(new RegExp("^.*..*$")).describe(
    "The name of an EC2 instance type that is supported in Amazon GameLift. A fleet instance type determines the computing resources of each instance in the fleet, including CPU, memory, storage, and networking capacity. Amazon GameLift supports the following EC2 instance types. See Amazon EC2 Instance Types for detailed descriptions.",
  ).optional(),
  FleetType: z.enum(["ON_DEMAND", "SPOT"]).describe(
    "Indicates whether to use On-Demand instances or Spot instances for this fleet. If empty, the default is ON_DEMAND. Both categories of instances use identical hardware and configurations based on the instance type selected for this fleet.",
  ).optional(),
  InstanceRoleARN: z.string().min(1).regex(
    new RegExp("^arn:aws(-.*)?:[a-z-]+:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$"),
  ).describe(
    "A unique identifier for an AWS IAM role that manages access to your AWS services. With an instance role ARN set, any application that runs on an instance in this fleet can assume the role, including install scripts, server processes, and daemons (background processes). Create a role or look up a role's ARN from the IAM dashboard in the AWS Management Console.",
  ).optional(),
  InstanceRoleCredentialsProvider: z.enum(["SHARED_CREDENTIAL_FILE"]).describe(
    "Credentials provider implementation that loads credentials from the Amazon EC2 Instance Metadata Service.",
  ).optional(),
  Locations: z.array(LocationConfigurationSchema).optional(),
  LogPaths: z.array(z.string()).describe(
    "This parameter is no longer used. When hosting a custom game build, specify where Amazon GameLift should store log files using the Amazon GameLift server API call ProcessReady()",
  ).optional(),
  MaxSize: z.number().int().min(0).describe(
    '[DEPRECATED] The maximum value that is allowed for the fleet\'s instance count. When creating a new fleet, GameLift automatically sets this value to "1". Once the fleet is active, you can change this value.',
  ).optional(),
  MetricGroups: z.array(z.string()).describe(
    "The name of an Amazon CloudWatch metric group. A metric group aggregates the metrics for all fleets in the group. Specify a string containing the metric group name. You can use an existing name or use a new name to create a new metric group. Currently, this parameter can have only one string.",
  ).optional(),
  MinSize: z.number().int().min(0).describe(
    '[DEPRECATED] The minimum value allowed for the fleet\'s instance count. When creating a new fleet, GameLift automatically sets this value to "0". After the fleet is active, you can change this value.',
  ).optional(),
  Name: z.string().min(1).max(1024).describe(
    "A descriptive label that is associated with a fleet. Fleet names do not need to be unique.",
  ).optional(),
  NewGameSessionProtectionPolicy: z.enum(["FullProtection", "NoProtection"])
    .describe(
      "A game session protection policy to apply to all game sessions hosted on instances in this fleet. When protected, active game sessions cannot be terminated during a scale-down event. If this parameter is not set, instances in this fleet default to no protection. You can change a fleet's protection policy to affect future game sessions on the fleet. You can also set protection for individual game sessions.",
    ).optional(),
  PeerVpcAwsAccountId: z.string().min(1).max(1024).regex(
    new RegExp("^[0-9]{12}$"),
  ).describe(
    "A unique identifier for the AWS account with the VPC that you want to peer your Amazon GameLift fleet with. You can find your account ID in the AWS Management Console under account settings.",
  ).optional(),
  PeerVpcId: z.string().min(1).max(1024).regex(new RegExp("^vpc-\\S+"))
    .describe(
      "A unique identifier for a VPC with resources to be accessed by your Amazon GameLift fleet. The VPC must be in the same Region as your fleet. To look up a VPC ID, use the VPC Dashboard in the AWS Management Console.",
    ).optional(),
  PlayerGatewayConfiguration: z.object({
    GameServerIpProtocolSupported: z.enum(["IPv4", "DUAL_STACK"]).describe(
      "The IP protocol supported by the game server.",
    ).optional(),
  }).describe("Configuration for player gateway.").optional(),
  ResourceCreationLimitPolicy: z.object({
    NewGameSessionsPerCreator: z.number().int().min(0).describe(
      "The maximum number of game sessions that an individual can create during the policy period.",
    ).optional(),
    PolicyPeriodInMinutes: z.number().int().min(0).describe(
      "The time span used in evaluating the resource creation limit policy.",
    ).optional(),
  }).describe(
    "A policy that limits the number of game sessions an individual player can create over a span of time for this fleet.",
  ).optional(),
  BuildId: z.string().regex(new RegExp("^build-\\S+|^arn:.*:build/build-\\S+"))
    .describe(
      "A unique identifier for a build to be deployed on the new fleet. If you are deploying the fleet with a custom game build, you must specify this property. The build must have been successfully uploaded to Amazon GameLift and be in a READY status. This fleet setting cannot be changed once the fleet is created.",
    ).optional(),
  ScriptId: z.string().regex(
    new RegExp("^script-\\S+|^arn:.*:script/script-\\S+"),
  ).describe(
    "A unique identifier for a Realtime script to be deployed on a new Realtime Servers fleet. The script must have been successfully uploaded to Amazon GameLift. This fleet setting cannot be changed once the fleet is created. Note: It is not currently possible to use the!Ref command to reference a script created with a CloudFormation template for the fleet property ScriptId. Instead, use Fn::GetAtt Script.Arn or Fn::GetAtt Script.Id to retrieve either of these properties as input for ScriptId. Alternatively, enter a ScriptId string manually.",
  ).optional(),
  RuntimeConfiguration: z.object({
    GameSessionActivationTimeoutSeconds: z.number().int().min(1).max(600)
      .describe(
        "The maximum amount of time (in seconds) that a game session can remain in status ACTIVATING. If the game session is not active before the timeout, activation is terminated and the game session status is changed to TERMINATED.",
      ).optional(),
    MaxConcurrentGameSessionActivations: z.number().int().min(1).max(2147483647)
      .describe(
        "The maximum number of game sessions with status ACTIVATING to allow on an instance simultaneously. This setting limits the amount of instance resources that can be used for new game activations at any one time.",
      ).optional(),
    ServerProcesses: z.array(ServerProcessSchema).describe(
      "A collection of server process configurations that describe which server processes to run on each instance in a fleet.",
    ).optional(),
  }).describe(
    "Instructions for launching server processes on each instance in the fleet. Server processes run either a custom game build executable or a Realtime script. The runtime configuration defines the server executables or launch script file, launch parameters, and the number of processes to run concurrently on each instance. When creating a fleet, the runtime configuration must have at least one server process configuration; otherwise the request fails with an invalid request exception. This parameter is required unless the parameters ServerLaunchPath and ServerLaunchParameters are defined. Runtime configuration has replaced these parameters, but fleets that use them will continue to work.",
  ).optional(),
  ServerLaunchParameters: z.string().min(1).max(1024).describe(
    "This parameter is no longer used but is retained for backward compatibility. Instead, specify server launch parameters in the RuntimeConfiguration parameter. A request must specify either a runtime configuration or values for both ServerLaunchParameters and ServerLaunchPath.",
  ).optional(),
  ServerLaunchPath: z.string().min(1).max(1024).describe(
    "This parameter is no longer used. Instead, specify a server launch path using the RuntimeConfiguration parameter. Requests that specify a server launch path and launch parameters instead of a runtime configuration will continue to work.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  PlayerGatewayMode: z.enum(["DISABLED", "ENABLED", "REQUIRED"]).describe(
    "The player gateway mode for the fleet.",
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

/** Swamp extension model for GameLift Fleet. Registered at `@swamp/aws/gamelift/fleet`. */
export const model = {
  type: "@swamp/aws/gamelift/fleet",
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
      description: "GameLift Fleet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GameLift Fleet",
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
          "AWS::GameLift::Fleet",
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
      description: "Get a GameLift Fleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GameLift Fleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::GameLift::Fleet",
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
      description: "Update a GameLift Fleet",
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
          "AWS::GameLift::Fleet",
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
          "AWS::GameLift::Fleet",
          identifier,
          currentState,
          desiredState,
          [
            "BuildId",
            "CertificateConfiguration",
            "EC2InstanceType",
            "FleetType",
            "InstanceRoleARN",
            "InstanceRoleCredentialsProvider",
            "LogPaths",
            "PeerVpcAwsAccountId",
            "PeerVpcId",
            "ScriptId",
            "ServerLaunchParameters",
            "ServerLaunchPath",
            "ComputeType",
            "PlayerGatewayMode",
            "PlayerGatewayConfiguration",
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
      description: "Delete a GameLift Fleet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GameLift Fleet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::GameLift::Fleet",
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
      description: "Sync GameLift Fleet state from AWS",
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
            "AWS::GameLift::Fleet",
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
