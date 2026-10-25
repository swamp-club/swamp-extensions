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

// Auto-generated extension model for @swamp/aws/arcregionswitch/plan
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ARCRegionSwitch Plan (AWS::ARCRegionSwitch::Plan).
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const AssociatedAlarmSchema = z.object({
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  ResourceIdentifier: z.string(),
  AlarmType: z.enum(["applicationHealth", "trigger"]),
});

const S3ReportOutputConfigurationSchema = z.object({
  BucketPath: z.string().min(3).max(512).regex(
    new RegExp("^(?:s3://)?[a-z0-9][a-z0-9-]{1,61}[a-z0-9](?:/[^/ ][^/]*)*/?$"),
  ).optional(),
  BucketOwner: z.string().regex(new RegExp("^\\d{12}$")).optional(),
});

const TriggerConditionSchema = z.object({
  AssociatedAlarmName: z.string(),
  Condition: z.enum(["red", "green"]),
});

const TriggerSchema = z.object({
  Description: z.string().optional(),
  TargetRegion: z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$")),
  Action: z.enum(["activate", "deactivate", "postRecovery"]),
  Conditions: z.array(TriggerConditionSchema),
  MinDelayMinutesBetweenExecutions: z.number(),
});

const LambdasSchema = z.object({
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  Arn: z.string().optional(),
  Payload: z.string().min(1).max(786432).optional(),
});

const LambdaUngracefulSchema = z.object({
  Behavior: z.enum(["skip"]).optional(),
});

const CustomActionLambdaConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  Lambdas: z.array(LambdasSchema),
  RetryIntervalMinutes: z.number(),
  RegionToRun: z.enum([
    "activatingRegion",
    "deactivatingRegion",
    "activeRegion",
    "inactiveRegion",
  ]),
  Ungraceful: LambdaUngracefulSchema.optional(),
});

const AsgSchema = z.object({
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  Arn: z.string().regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:autoscaling:[a-z0-9-]+:\\d{12}:autoScalingGroup:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}:autoScalingGroupName/[\\S\\s]{1,255}$",
    ),
  ).optional(),
});

const Ec2UngracefulSchema = z.object({
  MinimumSuccessPercentage: z.number().min(0).max(99),
});

const Ec2AsgCapacityIncreaseConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  Asgs: z.array(AsgSchema),
  Ungraceful: Ec2UngracefulSchema.optional(),
  TargetPercent: z.number().optional(),
  CapacityMonitoringApproach: z.enum([
    "sampledMaxInLast24Hours",
    "autoscalingMaxInLast24Hours",
  ]).optional(),
  WaitELBTargetGroupHealthy: z.enum(["enabled", "disabled"]).optional(),
});

const ExecutionApprovalConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  ApprovalRole: z.string(),
});

const ArcRoutingControlStateSchema = z.object({
  RoutingControlArn: z.string(),
  State: z.enum(["On", "Off"]),
});

const ArcRoutingControlConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  RegionAndRoutingControls: z.record(
    z.string(),
    z.array(ArcRoutingControlStateSchema),
  ),
});

const AuroraProvisionedScalingConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  GlobalClusterIdentifier: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z][0-9A-Za-z-:._]*$"),
  ),
  RegionDatabaseClusterArns: z.record(
    z.string(),
    z.string().regex(
      new RegExp(
        "^arn:aws[a-zA-Z-]*:rds:[a-z0-9-]+:\\d{12}:cluster:[A-Za-z][0-9A-Za-z-:._]*$",
      ),
    ),
  ),
  InstanceArns: z.record(
    z.string(),
    z.string().regex(
      new RegExp(
        "^arn:aws[a-zA-Z-]*:rds:[a-z0-9-]+:\\d{12}:db:[A-Za-z][0-9A-Za-z-]*$",
      ),
    ),
  ),
});

const AuroraServerlessScalingConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  GlobalClusterIdentifier: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z][0-9A-Za-z-:._]*$"),
  ),
  RegionDatabaseClusterArns: z.record(
    z.string(),
    z.string().regex(
      new RegExp(
        "^arn:aws[a-zA-Z-]*:rds:[a-z0-9-]+:\\d{12}:cluster:[A-Za-z][0-9A-Za-z-:._]*$",
      ),
    ),
  ),
  TargetPercent: z.number().optional(),
});

const GlobalAuroraUngracefulSchema = z.object({
  Ungraceful: z.enum(["failover"]).optional(),
});

const GlobalAuroraConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  Behavior: z.enum(["switchoverOnly", "failover"]),
  Ungraceful: GlobalAuroraUngracefulSchema.optional(),
  GlobalClusterIdentifier: z.string(),
  DatabaseClusterArns: z.array(z.string()),
});

const ParallelExecutionBlockConfigurationSchema = z.object({
  Steps: z.array(z.record(z.string(), z.unknown())),
});

const RegionSwitchPlanConfigurationSchema = z.object({
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  Arn: z.string().regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:arc-region-switch::[0-9]{12}:plan/([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,30}[a-zA-Z0-9])?):([a-z0-9]{6})$",
    ),
  ),
});

const ServiceSchema = z.object({
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  ClusterArn: z.string().regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:ecs:[a-z0-9-]+:\\d{12}:cluster/[a-zA-Z0-9_-]{1,255}$",
    ),
  ).optional(),
  ServiceArn: z.string().regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:ecs:[a-z0-9-]+:\\d{12}:service/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]{1,255}$",
    ),
  ).optional(),
});

const EcsUngracefulSchema = z.object({
  MinimumSuccessPercentage: z.number().min(0).max(99),
});

const EcsCapacityIncreaseConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  Services: z.array(ServiceSchema),
  Ungraceful: EcsUngracefulSchema.optional(),
  TargetPercent: z.number().optional(),
  CapacityMonitoringApproach: z.enum([
    "sampledMaxInLast24Hours",
    "containerInsightsMaxInLast24Hours",
  ]).optional(),
  WaitELBTargetGroupHealthy: z.enum(["enabled", "disabled"]).optional(),
});

const KubernetesResourceTypeSchema = z.object({
  ApiVersion: z.string(),
  Kind: z.string(),
});

const KubernetesScalingResourceSchema = z.object({
  Namespace: z.string().regex(new RegExp("^[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$")),
  Name: z.string(),
  HpaName: z.string().optional(),
});

const EksClusterSchema = z.object({
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  ClusterArn: z.string().regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:eks:[a-z0-9-]+:\\d{12}:cluster/[a-zA-Z0-9][a-zA-Z0-9-_]{0,99}$",
    ),
  ),
});

const EksResourceScalingUngracefulSchema = z.object({
  MinimumSuccessPercentage: z.number().min(0).max(99),
});

const EksResourceScalingConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  KubernetesResourceType: KubernetesResourceTypeSchema,
  ScalingResources: z.array(
    z.record(z.string(), z.record(z.string(), KubernetesScalingResourceSchema)),
  ).optional(),
  EksClusters: z.array(EksClusterSchema).optional(),
  Ungraceful: EksResourceScalingUngracefulSchema.optional(),
  TargetPercent: z.number().min(1).optional(),
  CapacityMonitoringApproach: z.enum(["sampledMaxInLast24Hours"]).optional(),
});

const Route53ResourceRecordSetSchema = z.object({
  RecordSetIdentifier: z.string().min(1).max(1024).optional(),
  Region: z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$")).optional(),
});

const Route53HealthCheckConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  HostedZoneId: z.string().min(1).max(32),
  RecordName: z.string().min(1).max(1024),
  RecordSets: z.array(Route53ResourceRecordSetSchema).optional(),
});

const DocumentDbUngracefulSchema = z.object({
  Ungraceful: z.enum(["failover"]).optional(),
});

const DocumentDbConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  Behavior: z.enum(["switchoverOnly", "failover"]),
  Ungraceful: DocumentDbUngracefulSchema.optional(),
  GlobalClusterIdentifier: z.string().regex(
    new RegExp("^[A-Za-z][0-9A-Za-z-:._]*$"),
  ),
  DatabaseClusterArns: z.array(
    z.string().regex(
      new RegExp(
        "^arn:aws[a-zA-Z-]*:rds:[a-z0-9-]+:\\d{12}:cluster:[a-zA-Z0-9][a-zA-Z0-9-_]{0,99}$",
      ),
    ),
  ),
});

const RdsPromoteReadReplicaConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  DbInstanceArnMap: z.record(
    z.string(),
    z.string().regex(
      new RegExp(
        "^arn:aws[a-zA-Z-]*:rds:[a-z0-9-]+:\\d{12}:db:[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$",
      ),
    ),
  ),
});

const RdsCreateCrossRegionReplicaConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  DbInstanceArnMap: z.record(
    z.string(),
    z.string().regex(
      new RegExp(
        "^arn:aws[a-zA-Z-]*:rds:[a-z0-9-]+:\\d{12}:db:[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$",
      ),
    ),
  ),
});

const EventSourceMappingSchema = z.object({
  Arn: z.string().regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:lambda:[a-z0-9-]+:\\d{12}:event-source-mapping:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
    ),
  ),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
});

const LambdaEventSourceMappingUngracefulSchema = z.object({
  Behavior: z.enum(["skip"]).optional(),
});

const LambdaEventSourceMappingConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  Action: z.enum(["enable", "disable"]),
  RegionEventSourceMappings: z.record(z.string(), EventSourceMappingSchema),
  Ungraceful: LambdaEventSourceMappingUngracefulSchema.optional(),
});

const NeptuneUngracefulSchema = z.object({
  Ungraceful: z.enum(["failover"]).optional(),
});

const NeptuneGlobalDatabaseConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  Behavior: z.enum(["failover", "switchoverOnly"]),
  Ungraceful: NeptuneUngracefulSchema.optional(),
  GlobalClusterIdentifier: z.string().min(1).max(63).regex(
    new RegExp("^[A-Za-z][0-9A-Za-z-]*$"),
  ),
  RegionDatabaseClusterArns: z.record(
    z.string(),
    z.string().regex(
      new RegExp(
        "^arn:aws[a-zA-Z-]*:rds:[a-z0-9-]+:\\d{12}:cluster:[A-Za-z][0-9A-Za-z-]*$",
      ),
    ),
  ),
});

const RdsUngracefulSchema = z.object({
  Ungraceful: z.enum(["promoteReadReplica"]).optional(),
});

const RdsSwitchoverReadReplicaConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  DbInstanceArnMap: z.record(
    z.string(),
    z.string().regex(
      new RegExp(
        "^arn:aws[a-zA-Z-]*:rds:[a-z0-9-]+:\\d{12}:db:[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$",
      ),
    ),
  ),
  Ungraceful: RdsUngracefulSchema.optional(),
});

const SsmTargetSchema = z.object({
  Key: z.string().min(1).max(163).regex(
    new RegExp("^[\\p{L}\\p{Z}\\p{N}_.:/=\\-@]*$", "u"),
  ),
  Values: z.array(z.string().min(1).max(256)),
});

const SsmDocumentConfigSchema = z.object({
  CrossAccountRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  ExternalId: z.string().optional(),
  DocumentArn: z.string().min(20).max(256).regex(
    new RegExp(
      "^arn:[a-z0-9\\-]+:ssm:[a-z0-9\\-]+:([0-9]{12})?:document/[a-zA-Z0-9_.\\-]+$",
    ),
  ),
  Targets: z.array(SsmTargetSchema),
  Parameters: z.record(
    z.string(),
    z.array(z.string().min(1).max(65535).regex(new RegExp("^.{1,65535}$"))),
  ).optional(),
  DocumentVersion: z.string().min(1).max(8).regex(
    new RegExp("^([$]LATEST|[$]DEFAULT|[1-9][0-9]*)$"),
  ).optional(),
});

const SsmSendCommandUngracefulSchema = z.object({
  Behavior: z.enum(["skip"]).optional(),
});

const SsmSendCommandConfigurationSchema = z.object({
  TimeoutMinutes: z.number().min(1).optional(),
  RegionDocuments: z.record(z.string(), SsmDocumentConfigSchema),
  RetryIntervalMinutes: z.number(),
  Ungraceful: SsmSendCommandUngracefulSchema.optional(),
});

const StepSchema = z.object({
  Name: z.string(),
  Description: z.string().optional(),
  ExecutionBlockConfiguration: z.object({
    CustomActionLambdaConfig: CustomActionLambdaConfigurationSchema.optional(),
    Ec2AsgCapacityIncreaseConfig: Ec2AsgCapacityIncreaseConfigurationSchema
      .optional(),
    ExecutionApprovalConfig: ExecutionApprovalConfigurationSchema.optional(),
    ArcRoutingControlConfig: ArcRoutingControlConfigurationSchema.optional(),
    AuroraProvisionedScalingConfig: AuroraProvisionedScalingConfigurationSchema
      .optional(),
    AuroraServerlessScalingConfig: AuroraServerlessScalingConfigurationSchema
      .optional(),
    GlobalAuroraConfig: GlobalAuroraConfigurationSchema.optional(),
    ParallelConfig: ParallelExecutionBlockConfigurationSchema.optional(),
    RegionSwitchPlanConfig: RegionSwitchPlanConfigurationSchema.optional(),
    EcsCapacityIncreaseConfig: EcsCapacityIncreaseConfigurationSchema
      .optional(),
    EksResourceScalingConfig: EksResourceScalingConfigurationSchema.optional(),
    Route53HealthCheckConfig: Route53HealthCheckConfigurationSchema.optional(),
    DocumentDbConfig: DocumentDbConfigurationSchema.optional(),
    RdsPromoteReadReplicaConfig: RdsPromoteReadReplicaConfigurationSchema
      .optional(),
    RdsCreateCrossRegionReadReplicaConfig:
      RdsCreateCrossRegionReplicaConfigurationSchema.optional(),
    LambdaEventSourceMappingConfig: LambdaEventSourceMappingConfigurationSchema
      .optional(),
    NeptuneGlobalDatabaseConfig: NeptuneGlobalDatabaseConfigurationSchema
      .optional(),
    RdsSwitchoverReadReplicaConfig: RdsSwitchoverReadReplicaConfigurationSchema
      .optional(),
    SsmSendCommandConfig: SsmSendCommandConfigurationSchema.optional(),
  }),
  ExecutionBlockType: z.enum([
    "ARCRegionSwitchPlan",
    "ARCRoutingControl",
    "AuroraGlobalDatabase",
    "AuroraProvisionedScaling",
    "AuroraServerlessScaling",
    "CustomActionLambda",
    "DocumentDb",
    "EC2AutoScaling",
    "ECSServiceScaling",
    "EKSResourceScaling",
    "LambdaEventSourceMapping",
    "ManualApproval",
    "NeptuneGlobalDatabase",
    "Parallel",
    "RdsCreateCrossRegionReplica",
    "RdsPromoteReadReplica",
    "RdsSwitchoverReadReplica",
    "Route53HealthCheck",
    "SSMSendCommand",
  ]),
});

const WorkflowSchema = z.object({
  Steps: z.array(StepSchema).optional(),
  WorkflowTargetAction: z.enum(["activate", "deactivate", "postRecovery"]),
  WorkflowTargetRegion: z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$"))
    .optional(),
  WorkflowDescription: z.string().optional(),
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
  AssociatedAlarms: z.record(z.string(), AssociatedAlarmSchema).optional(),
  Description: z.string().optional(),
  ExecutionRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ),
  Name: z.string().min(1).max(32).regex(
    new RegExp("^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,30}[a-zA-Z0-9])?$"),
  ),
  PrimaryRegion: z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$"))
    .optional(),
  RecoveryApproach: z.enum(["activeActive", "activePassive"]),
  RecoveryTimeObjectiveMinutes: z.number().min(1).max(10080).optional(),
  Regions: z.array(z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$"))),
  ReportConfiguration: z.object({
    ReportOutput: z.array(z.object({
      S3Configuration: S3ReportOutputConfigurationSchema.optional(),
    })).optional(),
  }).optional(),
  ServiceQuotaChecksEnabled: z.boolean().optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
  Triggers: z.array(TriggerSchema).optional(),
  Workflows: z.array(WorkflowSchema),
  Route53HealthChecks: z.object({
    HealthCheckIds: z.array(z.string()).optional(),
    RecordNames: z.array(z.string()).optional(),
    Regions: z.array(z.string()).optional(),
    HostedZoneIds: z.array(z.string()).optional(),
  }).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  AssociatedAlarms: z.record(z.string(), z.unknown()).optional(),
  Description: z.string().optional(),
  ExecutionRole: z.string().optional(),
  Name: z.string().optional(),
  Owner: z.string().optional(),
  PrimaryRegion: z.string().optional(),
  RecoveryApproach: z.string().optional(),
  RecoveryTimeObjectiveMinutes: z.number().optional(),
  Regions: z.array(z.string()).optional(),
  ReportConfiguration: z.object({
    ReportOutput: z.array(z.object({
      S3Configuration: S3ReportOutputConfigurationSchema,
    })),
  }).optional(),
  ServiceQuotaChecksEnabled: z.boolean().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Triggers: z.array(TriggerSchema).optional(),
  Version: z.string().optional(),
  Workflows: z.array(WorkflowSchema).optional(),
  HealthChecksForPlan: z.record(z.string(), z.unknown()).optional(),
  Route53HealthChecks: z.object({
    HealthCheckIds: z.array(z.string()),
    RecordNames: z.array(z.string()),
    Regions: z.array(z.string()),
    HostedZoneIds: z.array(z.string()),
  }).optional(),
  PlanHealthChecks: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AssociatedAlarms: z.record(z.string(), AssociatedAlarmSchema).optional(),
  Description: z.string().optional(),
  ExecutionRole: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z0-9-]*:iam::[0-9]{12}:role/.+$"),
  ).optional(),
  Name: z.string().min(1).max(32).regex(
    new RegExp("^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,30}[a-zA-Z0-9])?$"),
  ).optional(),
  PrimaryRegion: z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$"))
    .optional(),
  RecoveryApproach: z.enum(["activeActive", "activePassive"]).optional(),
  RecoveryTimeObjectiveMinutes: z.number().min(1).max(10080).optional(),
  Regions: z.array(z.string().regex(new RegExp("^[a-z]{2}-[a-z-]+-\\d+$")))
    .optional(),
  ReportConfiguration: z.object({
    ReportOutput: z.array(z.object({
      S3Configuration: S3ReportOutputConfigurationSchema.optional(),
    })).optional(),
  }).optional(),
  ServiceQuotaChecksEnabled: z.boolean().optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
  Triggers: z.array(TriggerSchema).optional(),
  Workflows: z.array(WorkflowSchema).optional(),
  Route53HealthChecks: z.object({
    HealthCheckIds: z.array(z.string()).optional(),
    RecordNames: z.array(z.string()).optional(),
    Regions: z.array(z.string()).optional(),
    HostedZoneIds: z.array(z.string()).optional(),
  }).optional(),
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

/** Swamp extension model for ARCRegionSwitch Plan. Registered at `@swamp/aws/arcregionswitch/plan`. */
export const model = {
  type: "@swamp/aws/arcregionswitch/plan",
  version: "2026.10.25.1",
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
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.30.1",
      description: "Added: ServiceQuotaChecksEnabled",
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
      toVersion: "2026.10.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ARCRegionSwitch Plan resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ARCRegionSwitch Plan",
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
          "AWS::ARCRegionSwitch::Plan",
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
      description: "Get a ARCRegionSwitch Plan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ARCRegionSwitch Plan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ARCRegionSwitch::Plan",
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
      description: "Update a ARCRegionSwitch Plan",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ARCRegionSwitch::Plan",
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
          "AWS::ARCRegionSwitch::Plan",
          identifier,
          currentState,
          desiredState,
          ["Name", "PrimaryRegion", "RecoveryApproach", "Regions"],
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
      description: "Delete a ARCRegionSwitch Plan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ARCRegionSwitch Plan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ARCRegionSwitch::Plan",
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
      description: "Sync ARCRegionSwitch Plan state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ARCRegionSwitch::Plan",
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
    list: {
      description: "List ARCRegionSwitch Plan resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::ARCRegionSwitch::Plan",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
