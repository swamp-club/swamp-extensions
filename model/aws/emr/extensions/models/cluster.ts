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

// Auto-generated extension model for @swamp/aws/emr/cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EMR Cluster (AWS::EMR::Cluster).
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

const ApplicationSchema = z.object({
  AdditionalInfo: z.record(z.string(), z.string()).describe(
    "This option is for advanced users only. This is meta information about third-party applications that third-party vendors use for testing purposes.",
  ).optional(),
  Args: z.array(z.string()).describe(
    "Arguments for Amazon EMR to pass to the application",
  ).optional(),
  Name: z.string().describe("The name of the application.").optional(),
  Version: z.string().describe("The version of the application.").optional(),
});

const ScriptBootstrapActionConfigSchema = z.object({
  Args: z.array(z.string()).describe(
    "A list of command line arguments to pass to the bootstrap action script.",
  ).optional(),
  Path: z.string().describe(
    "Location in Amazon S3 of the script to run during a bootstrap action.",
  ),
});

const BootstrapActionConfigSchema = z.object({
  Name: z.string().describe("The name of the bootstrap action."),
  ScriptBootstrapAction: ScriptBootstrapActionConfigSchema,
});

const EMRConfigurationSchema = z.object({
  Classification: z.string().describe(
    "The classification within a configuration.",
  ).optional(),
  ConfigurationProperties: z.record(z.string(), z.string()).optional(),
  Configurations: z.array(z.record(z.string(), z.unknown())).optional(),
});

const VolumeSpecificationSchema = z.object({
  Iops: z.number().int().describe(
    "The number of I/O operations per second (IOPS) that the volume supports.",
  ).optional(),
  SizeInGB: z.number().int().describe(
    "The volume size, in gibibytes (GiB). This can be a number from 1 - 1024. If the volume type is EBS-optimized, the minimum value is 10.",
  ),
  Throughput: z.number().int().describe(
    "The throughput, in mebibyte per second (MiB/s). This optional parameter can be a number from 125 - 1000 and is valid only for gp3 volumes.",
  ).optional(),
  VolumeType: z.string().describe(
    "The volume type. Volume types supported are gp3, gp2, io1, st1, sc1, and standard.",
  ),
});

const EbsBlockDeviceConfigSchema = z.object({
  VolumeSpecification: VolumeSpecificationSchema,
  VolumesPerInstance: z.number().int().describe(
    "Number of EBS volumes with a specific volume configuration that are associated with every instance in the instance group. Use of this property can confuse CloudFormation drift detection. The EbsBlockDeviceConfigs read from the system may return a list with one entry per volume,replacing any entry specified in the template with a VolumesPerInstance greater than one by that many entries containing only the VolumeSpecification.Thus to avoid false drift detection, it is recommended to supply repeated entries in EbsBlockDeviceConfigs for any VolumeSpecification which is intended to be repeated and not to use this property.",
  ).optional(),
});

const EbsConfigurationSchema = z.object({
  EbsBlockDeviceConfigs: z.array(EbsBlockDeviceConfigSchema).optional(),
  EbsOptimized: z.boolean().describe(
    "Indicates whether an Amazon EBS volume is EBS-optimized.",
  ).optional(),
});

const InstanceTypeConfigSchema = z.object({
  BidPrice: z.string().describe(
    "The bid price for each EC2 Spot Instance type as defined by InstanceType. Expressed in USD. If neither BidPrice nor BidPriceAsPercentageOfOnDemandPrice is provided, BidPriceAsPercentageOfOnDemandPrice defaults to 100%.",
  ).optional(),
  BidPriceAsPercentageOfOnDemandPrice: z.number().describe(
    "The bid price, as a percentage of On-Demand price, for each EC2 Spot Instance as defined by InstanceType. Expressed as a number (for example, 20 specifies 20%). If neither BidPrice nor BidPriceAsPercentageOfOnDemandPrice is provided, BidPriceAsPercentageOfOnDemandPrice defaults to 100%.",
  ).optional(),
  Configurations: z.array(EMRConfigurationSchema).describe(
    "A configuration classification that applies when provisioning cluster instances, which can include configurations for applications and software that run on the cluster.",
  ).optional(),
  CustomAmiId: z.string().describe(
    "The custom AMI ID to use for the instance type.",
  ).optional(),
  EbsConfiguration: EbsConfigurationSchema.describe(
    "The configuration of Amazon Elastic Block Store (Amazon EBS) attached to each instance as defined by InstanceType.",
  ).optional(),
  InstanceType: z.string().describe("An EC2 instance type, such as m3.xlarge."),
  Priority: z.number().describe(
    "The priority at which Amazon EMR launches the Amazon EC2 instances with this instance type. Priority starts at 0, which is the highest priority. Amazon EMR considers the highest priority first.",
  ).optional(),
  WeightedCapacity: z.number().int().describe(
    "The number of units that a provisioned instance of this type provides toward fulfilling the target capacities defined in InstanceFleetConfig. This value is 1 for a master instance fleet, and must be 1 or greater for core and task instance fleets. Defaults to 1 if not specified.",
  ).optional(),
});

const OnDemandCapacityReservationOptionsSchema = z.object({
  CapacityReservationPreference: z.string().describe(
    "Supported values: none, open",
  ).optional(),
  CapacityReservationResourceGroupArn: z.string().optional(),
  UsageStrategy: z.string().describe(
    "Supported values: use-capacity-reservations-first",
  ).optional(),
});

const OnDemandProvisioningSpecificationSchema = z.object({
  AllocationStrategy: z.string().describe(
    "Specifies the strategy to use in launching On-Demand instance fleets. Currently, the only option is lowest-price (the default), which launches the lowest price first.",
  ),
  CapacityReservationOptions: OnDemandCapacityReservationOptionsSchema
    .optional(),
});

const SpotProvisioningSpecificationSchema = z.object({
  AllocationStrategy: z.string().describe(
    "Specifies the strategy to use in launching Spot Instance fleets. Currently, the only option is capacity-optimized (the default), which launches instances from Spot Instance pools with optimal capacity for the number of instances that are launching.",
  ).optional(),
  BlockDurationMinutes: z.number().int().describe(
    "The defined duration for Spot Instances (also known as Spot blocks) in minutes. When specified, the Spot Instance does not terminate before the defined duration expires, and defined duration pricing for Spot Instances applies. Valid values are 60, 120, 180, 240, 300, or 360. The duration period starts as soon as a Spot Instance receives its instance ID. At the end of the duration, Amazon EC2 marks the Spot Instance for termination and provides a Spot Instance termination notice, which gives the instance a two-minute warning before it terminates.",
  ).optional(),
  TimeoutAction: z.enum(["SWITCH_TO_ON_DEMAND", "TERMINATE_CLUSTER"]).describe(
    "The action to take when TargetSpotCapacity has not been fulfilled when the TimeoutDurationMinutes has expired; that is, when all Spot Instances could not be provisioned within the Spot provisioning timeout. Valid values are TERMINATE_CLUSTER and SWITCH_TO_ON_DEMAND. SWITCH_TO_ON_DEMAND specifies that if no Spot Instances are available, On-Demand Instances should be provisioned to fulfill any remaining Spot capacity.",
  ),
  TimeoutDurationMinutes: z.number().int().describe(
    "The spot provisioning timeout period in minutes. If Spot Instances are not provisioned within this time period, the TimeOutAction is taken. Minimum value is 5 and maximum value is 1440. The timeout applies only during initial provisioning, when the cluster is first created.",
  ),
});

const InstanceFleetProvisioningSpecificationsSchema = z.object({
  OnDemandSpecification: OnDemandProvisioningSpecificationSchema.optional(),
  SpotSpecification: SpotProvisioningSpecificationSchema.optional(),
});

const SpotResizingSpecificationSchema = z.object({
  TimeoutDurationMinutes: z.number().int().optional(),
  AllocationStrategy: z.string().optional(),
});

const OnDemandResizingSpecificationSchema = z.object({
  TimeoutDurationMinutes: z.number().int().optional(),
  AllocationStrategy: z.string().optional(),
  CapacityReservationOptions: OnDemandCapacityReservationOptionsSchema
    .optional(),
});

const InstanceFleetResizingSpecificationsSchema = z.object({
  SpotResizeSpecification: SpotResizingSpecificationSchema.optional(),
  OnDemandResizeSpecification: OnDemandResizingSpecificationSchema.optional(),
});

const InstanceFleetConfigSchema = z.object({
  InstanceTypeConfigs: z.array(InstanceTypeConfigSchema).optional(),
  LaunchSpecifications: InstanceFleetProvisioningSpecificationsSchema
    .optional(),
  ResizeSpecifications: InstanceFleetResizingSpecificationsSchema.optional(),
  Name: z.string().describe("The friendly name of the instance fleet.")
    .optional(),
  TargetOnDemandCapacity: z.number().int().describe(
    "The target capacity of On-Demand units for the instance fleet, which determines how many On-Demand Instances to provision",
  ).optional(),
  TargetSpotCapacity: z.number().int().describe(
    "The target capacity of Spot units for the instance fleet, which determines how many Spot Instances to provision.",
  ).optional(),
});

const ScalingConstraintsSchema = z.object({
  MaxCapacity: z.number().int().describe(
    "The upper boundary of EC2 instances in an instance group beyond which scaling activities are not allowed to grow. Scale-out activities will not add instances beyond this boundary.",
  ),
  MinCapacity: z.number().int().describe(
    "The lower boundary of EC2 instances in an instance group below which scaling activities are not allowed to shrink. Scale-in activities will not terminate instances below this boundary.",
  ),
});

const SimpleScalingPolicyConfigurationSchema = z.object({
  AdjustmentType: z.enum([
    "CHANGE_IN_CAPACITY",
    "EXACT_CAPACITY",
    "PERCENT_CHANGE_IN_CAPACITY",
  ]).describe(
    "The way in which EC2 instances are added (if ScalingAdjustment is a positive number) or terminated (if ScalingAdjustment is a negative number) each time the scaling activity is triggered. CHANGE_IN_CAPACITY is the default. CHANGE_IN_CAPACITY indicates that the EC2 instance count increments or decrements by ScalingAdjustment, which should be expressed as an integer. PERCENT_CHANGE_IN_CAPACITY indicates the instance count increments or decrements by the percentage specified by ScalingAdjustment, which should be expressed as an integer. For example, 20 indicates an increase in 20% increments of cluster capacity. EXACT_CAPACITY indicates the scaling activity results in an instance group with the number of EC2 instances specified by ScalingAdjustment, which should be expressed as a positive integer.",
  ).optional(),
  CoolDown: z.number().int().describe(
    "The amount of time, in seconds, after a scaling activity completes before any further trigger-related scaling activities can start. The default value is 0.",
  ).optional(),
  ScalingAdjustment: z.number().int().describe(
    "The amount by which to scale in or scale out, based on the specified AdjustmentType. A positive value adds to the instance group's EC2 instance count while a negative number removes instances. If AdjustmentType is set to EXACT_CAPACITY, the number should only be a positive integer. If AdjustmentType is set to PERCENT_CHANGE_IN_CAPACITY, the value should express the percentage as an integer. For example, -20 indicates a decrease in 20% increments of cluster capacity.",
  ),
});

const ScalingActionSchema = z.object({
  Market: z.enum(["ON_DEMAND", "SPOT"]).describe(
    "Not available for instance groups. Instance groups use the market type specified for the group.",
  ).optional(),
  SimpleScalingPolicyConfiguration: SimpleScalingPolicyConfigurationSchema
    .describe(
      "The type of adjustment the automatic scaling activity makes when triggered, and the periodicity of the adjustment.",
    ),
});

const MetricDimensionSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const CloudWatchAlarmDefinitionSchema = z.object({
  ComparisonOperator: z.enum([
    "GREATER_THAN_OR_EQUAL",
    "GREATER_THAN",
    "LESS_THAN",
    "LESS_THAN_OR_EQUAL",
  ]).describe(
    "Determines how the metric specified by MetricName is compared to the value specified by Threshold.",
  ),
  Dimensions: z.array(MetricDimensionSchema).optional(),
  EvaluationPeriods: z.number().int().describe(
    "The number of periods, in five-minute increments, during which the alarm condition must exist before the alarm triggers automatic scaling activity. The default value is 1.",
  ).optional(),
  MetricName: z.string().describe(
    "The name of the CloudWatch metric that is watched to determine an alarm condition.",
  ),
  Namespace: z.string().describe(
    "The namespace for the CloudWatch metric. The default is AWS/ElasticMapReduce.",
  ).optional(),
  Period: z.number().int().describe(
    "The period, in seconds, over which the statistic is applied. EMR CloudWatch metrics are emitted every five minutes (300 seconds), so if an EMR CloudWatch metric is specified, specify 300.",
  ),
  Statistic: z.enum(["SAMPLE_COUNT", "AVERAGE", "SUM", "MINIMUM", "MAXIMUM"])
    .describe(
      "The statistic to apply to the metric associated with the alarm. The default is AVERAGE.",
    ).optional(),
  Threshold: z.number().describe(
    "The value against which the specified statistic is compared.",
  ),
  Unit: z.enum([
    "NONE",
    "SECONDS",
    "MICRO_SECONDS",
    "MILLI_SECONDS",
    "BYTES",
    "KILO_BYTES",
    "MEGA_BYTES",
    "GIGA_BYTES",
    "TERA_BYTES",
    "BITS",
    "KILO_BITS",
    "MEGA_BITS",
    "GIGA_BITS",
    "TERA_BITS",
    "PERCENT",
    "COUNT",
    "BYTES_PER_SECOND",
    "KILO_BYTES_PER_SECOND",
    "MEGA_BYTES_PER_SECOND",
    "GIGA_BYTES_PER_SECOND",
    "TERA_BYTES_PER_SECOND",
    "BITS_PER_SECOND",
    "KILO_BITS_PER_SECOND",
    "MEGA_BITS_PER_SECOND",
    "GIGA_BITS_PER_SECOND",
    "TERA_BITS_PER_SECOND",
    "COUNT_PER_SECOND",
  ]).describe(
    "The unit of measure associated with the CloudWatch metric being watched. The value specified for Unit must correspond to the units specified in the CloudWatch metric.",
  ).optional(),
});

const ScalingTriggerSchema = z.object({
  CloudWatchAlarmDefinition: CloudWatchAlarmDefinitionSchema.describe(
    "The definition of a CloudWatch metric alarm. When the defined alarm conditions are met along with other trigger parameters, scaling activity begins.",
  ),
});

const ScalingRuleSchema = z.object({
  Action: ScalingActionSchema.describe(
    "The conditions that trigger an automatic scaling activity.",
  ),
  Description: z.string().describe(
    "A friendly, more verbose description of the automatic scaling rule.",
  ).optional(),
  Name: z.string().describe(
    "The name used to identify an automatic scaling rule. Rule names must be unique within a scaling policy.",
  ),
  Trigger: ScalingTriggerSchema.describe(
    "The CloudWatch alarm definition that determines when automatic scaling activity is triggered.",
  ),
});

const AutoScalingPolicySchema = z.object({
  Constraints: ScalingConstraintsSchema,
  Rules: z.array(ScalingRuleSchema),
});

const InstanceGroupConfigSchema = z.object({
  AutoScalingPolicy: AutoScalingPolicySchema.describe(
    "An automatic scaling policy for a core instance group or task instance group in an Amazon EMR cluster. The automatic scaling policy defines how an instance group dynamically adds and terminates EC2 instances in response to the value of a CloudWatch metric.",
  ).optional(),
  BidPrice: z.string().describe(
    "If specified, indicates that the instance group uses Spot Instances. This is the maximum price you are willing to pay for Spot Instances. Specify OnDemandPrice to set the amount equal to the On-Demand price, or specify an amount in USD.",
  ).optional(),
  Configurations: z.array(EMRConfigurationSchema).describe(
    "The list of configurations supplied for an EMR cluster instance group. You can specify a separate configuration for each instance group (master, core, and task).",
  ).optional(),
  CustomAmiId: z.string().describe(
    "The custom AMI ID to use for the provisioned instance group.",
  ).optional(),
  EbsConfiguration: EbsConfigurationSchema.describe(
    "EBS configurations that will be attached to each EC2 instance in the instance group.",
  ).optional(),
  InstanceCount: z.number().int().describe(
    "Target number of instances for the instance group.",
  ),
  InstanceType: z.string().describe(
    "The EC2 instance type for all instances in the instance group.",
  ),
  Market: z.enum(["ON_DEMAND", "SPOT"]).describe(
    "Market type of the EC2 instances used to create a cluster node.",
  ).optional(),
  Name: z.string().describe("Friendly name given to the instance group.")
    .optional(),
});

const PlacementTypeSchema = z.object({
  AvailabilityZone: z.string().describe(
    "The Amazon EC2 Availability Zone for the cluster. AvailabilityZone is used for uniform instance groups, while AvailabilityZones (plural) is used for instance fleets.",
  ),
});

const ComputeLimitsSchema = z.object({
  MaximumCapacityUnits: z.number().int().describe(
    "The upper boundary of EC2 units. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. Managed scaling activities are not allowed beyond this boundary. The limit only applies to the core and task nodes. The master node cannot be scaled after initial configuration.",
  ),
  MaximumCoreCapacityUnits: z.number().int().describe(
    "The upper boundary of EC2 units for core node type in a cluster. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. The core units are not allowed to scale beyond this boundary. The parameter is used to split capacity allocation between core and task nodes.",
  ).optional(),
  MaximumOnDemandCapacityUnits: z.number().int().describe(
    "The upper boundary of On-Demand EC2 units. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. The On-Demand units are not allowed to scale beyond this boundary. The parameter is used to split capacity allocation between On-Demand and Spot Instances.",
  ).optional(),
  MinimumCapacityUnits: z.number().int().describe(
    "The lower boundary of EC2 units. It is measured through vCPU cores or instances for instance groups and measured through units for instance fleets. Managed scaling activities are not allowed beyond this boundary. The limit only applies to the core and task nodes. The master node cannot be scaled after initial configuration.",
  ),
  UnitType: z.enum(["InstanceFleetUnits", "Instances", "VCPU"]).describe(
    "The unit type used for specifying a managed scaling policy.",
  ),
});

const KeyValueSchema = z.object({
  Key: z.string().optional(),
  Value: z.string().optional(),
});

const HadoopJarStepConfigSchema = z.object({
  Args: z.array(z.string()).optional(),
  Jar: z.string().describe("A path to a JAR file run during the step."),
  MainClass: z.string().describe(
    "The name of the main class in the specified Java file. If not specified, the JAR file should specify a Main-Class in its manifest file.",
  ).optional(),
  StepProperties: z.array(KeyValueSchema).describe(
    "A list of Java properties that are set when the step runs. You can use these properties to pass key-value pairs to your main function.",
  ).optional(),
});

const StepConfigSchema = z.object({
  ActionOnFailure: z.enum([
    "CANCEL_AND_WAIT",
    "CONTINUE",
    "TERMINATE_CLUSTER",
    "TERMINATE_JOB_FLOW",
  ]).describe(
    "The action to take when the step fails. Use one of the following values: TERMINATE_CLUSTER - Shuts down the cluster. CANCEL_AND_WAIT - Cancels any pending steps and returns the cluster to the WAITING state. CONTINUE - Continues to the next step in the queue. TERMINATE_JOB_FLOW - Shuts down the cluster. TERMINATE_JOB_FLOW is provided for backward compatibility. We recommend using TERMINATE_CLUSTER instead. If a cluster's StepConcurrencyLevel is greater than 1, do not use AddJobFlowSteps to submit a step with this parameter set to CANCEL_AND_WAIT or TERMINATE_CLUSTER. The step is not submitted and the action fails with a message that the ActionOnFailure setting is not valid. If you change a cluster's StepConcurrencyLevel to be greater than 1 while a step is running, the ActionOnFailure parameter may not behave as you expect. In this case, for a step that fails with this parameter set to CANCEL_AND_WAIT, pending steps and the running step are not canceled; for a step that fails with this parameter set to TERMINATE_CLUSTER, the cluster does not terminate.",
  ).optional(),
  HadoopJarStep: HadoopJarStepConfigSchema.describe(
    "The JAR file used for the step.",
  ),
  Name: z.string().describe("The name of the step."),
});

const PlacementGroupConfigSchema = z.object({
  InstanceRole: z.enum(["MASTER", "CORE", "TASK"]).describe(
    "Role of the instance in the cluster.",
  ),
  PlacementStrategy: z.enum(["SPREAD", "PARTITION", "CLUSTER", "NONE"])
    .describe(
      "Amazon EC2 Placement Group strategy associated with instance role.",
    ).optional(),
});

const TagSchema = z.object({
  Key: z.string().describe(
    "A user-defined key, which is the minimum required information for a valid tag. For more information.",
  ),
  Value: z.string().describe(
    "A user-defined value, which is optional in a tag. For more information",
  ),
});

const CloudWatchLogConfigurationSchema = z.object({
  Enabled: z.boolean().describe("Specifies if CloudWatch logging is enabled."),
  LogGroupName: z.string().describe(
    "The name of the CloudWatch log group where logs are published.",
  ).optional(),
  LogStreamNamePrefix: z.string().describe("The prefix of the log stream name.")
    .optional(),
  EncryptionKeyArn: z.string().describe(
    "The ARN of the encryption key used to encrypt the logs.",
  ).optional(),
  LogTypes: z.record(z.string(), z.array(z.string())).describe(
    "A map of log types to file names for publishing logs to the standard output or standard error streams for CloudWatch. Valid log types include STEP_LOGS, SPARK_DRIVER, and SPARK_EXECUTOR. Valid file names for each type include STDOUT and STDERR.",
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
  AdditionalInfo: z.record(z.string(), z.unknown()).describe(
    "A JSON string for selecting additional features.",
  ).optional(),
  Applications: z.array(ApplicationSchema).describe(
    "The applications installed on this cluster.",
  ).optional(),
  AutoScalingRole: z.string().describe(
    "An IAM role for automatic scaling policies. The default role is EMR_AutoScaling_DefaultRole. The IAM role provides permissions that the automatic scaling feature requires to launch and terminate EC2 instances in an instance group.",
  ).optional(),
  AutoTerminationPolicy: z.object({
    IdleTimeout: z.number().int().describe(
      "Specifies the amount of idle time in seconds after which the cluster automatically terminates. You can specify a minimum of 60 seconds and a maximum of 604800 seconds (seven days)",
    ).optional(),
  }).describe(
    "An auto-termination policy for an Amazon EMR cluster. An auto-termination policy defines the amount of idle time in seconds after which a cluster automatically terminates.",
  ).optional(),
  BootstrapActions: z.array(BootstrapActionConfigSchema).describe(
    "A list of bootstrap actions to run before Hadoop starts on the cluster nodes.",
  ).optional(),
  Configurations: z.array(EMRConfigurationSchema).describe(
    "Applies only to Amazon EMR releases 4.x and later. The list of Configurations supplied to the EMR cluster.",
  ).optional(),
  CustomAmiId: z.string().describe(
    "Available only in Amazon EMR version 5.7.0 and later. The ID of a custom Amazon EBS-backed Linux AMI if the cluster uses a custom AMI.",
  ).optional(),
  EbsRootVolumeSize: z.number().int().describe(
    "The size, in GiB, of the Amazon EBS root device volume of the Linux AMI that is used for each EC2 instance. Available in Amazon EMR version 4.x and later.",
  ).optional(),
  Instances: z.object({
    AdditionalMasterSecurityGroups: z.array(z.string()).describe(
      "A list of additional Amazon EC2 security group IDs for the master node.",
    ).optional(),
    AdditionalSlaveSecurityGroups: z.array(z.string()).describe(
      "A list of additional Amazon EC2 security group IDs for the core and task nodes.",
    ).optional(),
    Ec2KeyName: z.string().describe(
      "The name of the EC2 key pair that can be used to connect to the master node using SSH as the user called 'hadoop'.",
    ).optional(),
    Ec2SubnetId: z.string().describe(
      "Applies to clusters that use the uniform instance group configuration. To launch the cluster in Amazon Virtual Private Cloud (Amazon VPC), set this parameter to the identifier of the Amazon VPC subnet where you want the cluster to launch. If you do not specify this value and your account supports EC2-Classic, the cluster launches in EC2-Classic.",
    ).optional(),
    Ec2SubnetIds: z.array(z.string()).describe(
      "Applies to clusters that use the instance fleet configuration. When multiple EC2 subnet IDs are specified, Amazon EMR evaluates them and launches instances in the optimal subnet.",
    ).optional(),
    EmrManagedMasterSecurityGroup: z.string().describe(
      "The identifier of the Amazon EC2 security group for the master node. If you specify EmrManagedMasterSecurityGroup, you must also specify EmrManagedSlaveSecurityGroup.",
    ).optional(),
    EmrManagedSlaveSecurityGroup: z.string().describe(
      "The identifier of the Amazon EC2 security group for the core and task nodes. If you specify EmrManagedSlaveSecurityGroup, you must also specify EmrManagedMasterSecurityGroup.",
    ).optional(),
    HadoopVersion: z.string().describe(
      'Applies only to Amazon EMR release versions earlier than 4.0. The Hadoop version for the cluster. Valid inputs are "0.18" (no longer maintained), "0.20" (no longer maintained), "0.20.205" (no longer maintained), "1.0.3", "2.2.0", or "2.4.0". If you do not set this value, the default of 0.18 is used, unless the AmiVersion parameter is set in the RunJobFlow call, in which case the default version of Hadoop for that AMI version is used.',
    ).optional(),
    KeepJobFlowAliveWhenNoSteps: z.boolean().describe(
      "Specifies whether the cluster should remain available after completing all steps. Defaults to true. For more information about configuring cluster termination, see Control Cluster Termination in the EMR Management Guide.",
    ).optional(),
    CoreInstanceFleet: InstanceFleetConfigSchema.optional(),
    MasterInstanceFleet: InstanceFleetConfigSchema.optional(),
    TaskInstanceFleets: z.array(InstanceFleetConfigSchema).optional(),
    CoreInstanceGroup: InstanceGroupConfigSchema.describe(
      "Configuration for the instance groups in a cluster.",
    ).optional(),
    MasterInstanceGroup: InstanceGroupConfigSchema.describe(
      "Configuration for the instance groups in a cluster.",
    ).optional(),
    TaskInstanceGroups: z.array(InstanceGroupConfigSchema).describe(
      "Configuration for the instance groups in a cluster.",
    ).optional(),
    Placement: PlacementTypeSchema.describe(
      "The Availability Zone in which the cluster runs.",
    ).optional(),
    ServiceAccessSecurityGroup: z.string().describe(
      "The identifier of the Amazon EC2 security group for the Amazon EMR service to access clusters in VPC private subnets.",
    ).optional(),
    TerminationProtected: z.boolean().describe(
      "Specifies whether to lock the cluster to prevent the Amazon EC2 instances from being terminated by API call, user intervention, or in the event of a job-flow error.",
    ).optional(),
    UnhealthyNodeReplacement: z.boolean().describe(
      "Indicates whether Amazon EMR should gracefully replace core nodes that have degraded within the cluster.",
    ).optional(),
  }).describe("A specification of the number and type of Amazon EC2 instances.")
    .optional(),
  JobFlowRole: z.string().describe(
    "Also called instance profile and EC2 role. An IAM role for an EMR cluster. The EC2 instances of the cluster assume this role. The default role is EMR_EC2_DefaultRole. In order to use the default role, you must have already created it using the CLI or console",
  ).optional(),
  KerberosAttributes: z.object({
    ADDomainJoinPassword: z.string().describe(
      "The Active Directory password for ADDomainJoinUser.",
    ).optional(),
    ADDomainJoinUser: z.string().describe(
      "Required only when establishing a cross-realm trust with an Active Directory domain. A user with sufficient privileges to join resources to the domain.",
    ).optional(),
    CrossRealmTrustPrincipalPassword: z.string().describe(
      "Required only when establishing a cross-realm trust with a KDC in a different realm. The cross-realm principal password, which must be identical across realms.",
    ).optional(),
    KdcAdminPassword: z.string().describe(
      "The password used within the cluster for the kadmin service on the cluster-dedicated KDC, which maintains Kerberos principals, password policies, and keytabs for the cluster.",
    ),
    Realm: z.string().describe(
      "The name of the Kerberos realm to which all nodes in a cluster belong. For example, EC2.INTERNAL.",
    ),
  }).describe(
    "Attributes for Kerberos configuration when Kerberos authentication is enabled using a security configuration. For more information see Use Kerberos Authentication in the Amazon EMR Management Guide.",
  ).optional(),
  LogEncryptionKmsKeyId: z.string().describe(
    "The AWS KMS key used for encrypting log files. If a value is not provided, the logs remain encrypted by AES-256. This attribute is only available with Amazon EMR version 5.30.0 and later, excluding Amazon EMR 6.0.0.",
  ).optional(),
  LogUri: z.string().describe(
    "The location in Amazon S3 to write the log files of the job flow. If a value is not provided, logs are not created.",
  ).optional(),
  ManagedScalingPolicy: z.object({
    UtilizationPerformanceIndex: z.number().int().optional(),
    ScalingStrategy: z.string().optional(),
    ComputeLimits: ComputeLimitsSchema.optional(),
  }).describe("The specified managed scaling policy for an Amazon EMR cluster.")
    .optional(),
  Name: z.string().describe("The name of the job flow.").optional(),
  ReleaseLabel: z.string().describe(
    "The Amazon EMR release label, which determines the version of open-source application packages installed on the cluster. Release labels are in the form emr-x.x.x, where x.x.x is an Amazon EMR release version such as emr-5.14.0.",
  ).optional(),
  OSReleaseLabel: z.string().describe(
    "Specifies a particular Amazon Linux release for all nodes in a cluster launch RunJobFlow request. If a release is not specified, Amazon EMR uses the latest validated Amazon Linux release for cluster launch.",
  ).optional(),
  ScaleDownBehavior: z.enum([
    "TERMINATE_AT_INSTANCE_HOUR",
    "TERMINATE_AT_TASK_COMPLETION",
  ]).describe(
    "The way that individual Amazon EC2 instances terminate when an automatic scale-in activity occurs or an instance group is resized.",
  ).optional(),
  SecurityConfiguration: z.string().describe(
    "The name of the security configuration applied to the cluster.",
  ).optional(),
  ServiceRole: z.string().describe(
    "The IAM role that Amazon EMR assumes in order to access AWS resources on your behalf.",
  ).optional(),
  StepConcurrencyLevel: z.number().int().describe(
    "Specifies the number of steps that can be executed concurrently.",
  ).optional(),
  Steps: z.array(StepConfigSchema).optional(),
  VisibleToAllUsers: z.boolean().describe(
    "Indicates whether the cluster is visible to IAM principals in the AWS account associated with the cluster. When true, IAM principals in the AWS account can perform EMR cluster actions on the cluster that their IAM policies allow. When false, only the IAM principal that created the cluster and the AWS account root user can perform EMR actions, regardless of IAM permissions policies attached to other IAM principals.",
  ).optional(),
  EbsRootVolumeIops: z.number().int().describe(
    "The IOPS, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 6.15.0 and later.",
  ).optional(),
  EbsRootVolumeThroughput: z.number().int().describe(
    "The throughput, in MiB/s, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 6.15.0 and later.",
  ).optional(),
  PlacementGroupConfigs: z.array(PlacementGroupConfigSchema).describe(
    "The configuration specifies the placement strategy that can be applied to instance roles during cluster creation.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  MonitoringConfiguration: z.object({
    CloudWatchLogConfiguration: CloudWatchLogConfigurationSchema.describe(
      "Holds CloudWatch log configuration settings and metadata that specify settings like log files to monitor and where to send them.",
    ).optional(),
  }).describe("Specifies the configuration for cluster logging.").optional(),
  SessionEnabled: z.boolean().describe(
    "Indicates whether Spark Connect sessions are enabled on the cluster. When set to true, you can start Spark Connect sessions using the StartSession operation. This property cannot be changed after the cluster is created.",
  ).optional(),
});

const StateSchema = z.object({
  MasterPublicDNS: z.string().optional(),
  AdditionalInfo: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  Applications: z.array(ApplicationSchema).optional(),
  AutoScalingRole: z.string().optional(),
  AutoTerminationPolicy: z.object({
    IdleTimeout: z.number(),
  }).optional(),
  BootstrapActions: z.array(BootstrapActionConfigSchema).optional(),
  Configurations: z.array(EMRConfigurationSchema).optional(),
  CustomAmiId: z.string().optional(),
  EbsRootVolumeSize: z.number().optional(),
  Id: z.string(),
  Instances: z.object({
    AdditionalMasterSecurityGroups: z.array(z.string()),
    AdditionalSlaveSecurityGroups: z.array(z.string()),
    Ec2KeyName: z.string(),
    Ec2SubnetId: z.string(),
    Ec2SubnetIds: z.array(z.string()),
    EmrManagedMasterSecurityGroup: z.string(),
    EmrManagedSlaveSecurityGroup: z.string(),
    HadoopVersion: z.string(),
    KeepJobFlowAliveWhenNoSteps: z.boolean(),
    CoreInstanceFleet: InstanceFleetConfigSchema,
    MasterInstanceFleet: InstanceFleetConfigSchema,
    TaskInstanceFleets: z.array(InstanceFleetConfigSchema),
    CoreInstanceGroup: InstanceGroupConfigSchema,
    MasterInstanceGroup: InstanceGroupConfigSchema,
    TaskInstanceGroups: z.array(InstanceGroupConfigSchema),
    Placement: PlacementTypeSchema,
    ServiceAccessSecurityGroup: z.string(),
    TerminationProtected: z.boolean(),
    UnhealthyNodeReplacement: z.boolean(),
  }).optional(),
  JobFlowRole: z.string().optional(),
  KerberosAttributes: z.object({
    ADDomainJoinPassword: z.string(),
    ADDomainJoinUser: z.string(),
    CrossRealmTrustPrincipalPassword: z.string(),
    KdcAdminPassword: z.string(),
    Realm: z.string(),
  }).optional(),
  LogEncryptionKmsKeyId: z.string().optional(),
  LogUri: z.string().optional(),
  ManagedScalingPolicy: z.object({
    UtilizationPerformanceIndex: z.number(),
    ScalingStrategy: z.string(),
    ComputeLimits: ComputeLimitsSchema,
  }).optional(),
  Name: z.string().optional(),
  ReleaseLabel: z.string().optional(),
  OSReleaseLabel: z.string().optional(),
  ScaleDownBehavior: z.string().optional(),
  SecurityConfiguration: z.string().optional(),
  ServiceRole: z.string().optional(),
  StepConcurrencyLevel: z.number().optional(),
  Steps: z.array(StepConfigSchema).optional(),
  VisibleToAllUsers: z.boolean().optional(),
  EbsRootVolumeIops: z.number().optional(),
  EbsRootVolumeThroughput: z.number().optional(),
  PlacementGroupConfigs: z.array(PlacementGroupConfigSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  MonitoringConfiguration: z.object({
    CloudWatchLogConfiguration: CloudWatchLogConfigurationSchema,
  }).optional(),
  SessionEnabled: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AdditionalInfo: z.record(z.string(), z.unknown()).describe(
    "A JSON string for selecting additional features.",
  ).optional(),
  Applications: z.array(ApplicationSchema).describe(
    "The applications installed on this cluster.",
  ).optional(),
  AutoScalingRole: z.string().describe(
    "An IAM role for automatic scaling policies. The default role is EMR_AutoScaling_DefaultRole. The IAM role provides permissions that the automatic scaling feature requires to launch and terminate EC2 instances in an instance group.",
  ).optional(),
  AutoTerminationPolicy: z.object({
    IdleTimeout: z.number().int().describe(
      "Specifies the amount of idle time in seconds after which the cluster automatically terminates. You can specify a minimum of 60 seconds and a maximum of 604800 seconds (seven days)",
    ).optional(),
  }).describe(
    "An auto-termination policy for an Amazon EMR cluster. An auto-termination policy defines the amount of idle time in seconds after which a cluster automatically terminates.",
  ).optional(),
  BootstrapActions: z.array(BootstrapActionConfigSchema).describe(
    "A list of bootstrap actions to run before Hadoop starts on the cluster nodes.",
  ).optional(),
  Configurations: z.array(EMRConfigurationSchema).describe(
    "Applies only to Amazon EMR releases 4.x and later. The list of Configurations supplied to the EMR cluster.",
  ).optional(),
  CustomAmiId: z.string().describe(
    "Available only in Amazon EMR version 5.7.0 and later. The ID of a custom Amazon EBS-backed Linux AMI if the cluster uses a custom AMI.",
  ).optional(),
  EbsRootVolumeSize: z.number().int().describe(
    "The size, in GiB, of the Amazon EBS root device volume of the Linux AMI that is used for each EC2 instance. Available in Amazon EMR version 4.x and later.",
  ).optional(),
  Instances: z.object({
    AdditionalMasterSecurityGroups: z.array(z.string()).describe(
      "A list of additional Amazon EC2 security group IDs for the master node.",
    ).optional(),
    AdditionalSlaveSecurityGroups: z.array(z.string()).describe(
      "A list of additional Amazon EC2 security group IDs for the core and task nodes.",
    ).optional(),
    Ec2KeyName: z.string().describe(
      "The name of the EC2 key pair that can be used to connect to the master node using SSH as the user called 'hadoop'.",
    ).optional(),
    Ec2SubnetId: z.string().describe(
      "Applies to clusters that use the uniform instance group configuration. To launch the cluster in Amazon Virtual Private Cloud (Amazon VPC), set this parameter to the identifier of the Amazon VPC subnet where you want the cluster to launch. If you do not specify this value and your account supports EC2-Classic, the cluster launches in EC2-Classic.",
    ).optional(),
    Ec2SubnetIds: z.array(z.string()).describe(
      "Applies to clusters that use the instance fleet configuration. When multiple EC2 subnet IDs are specified, Amazon EMR evaluates them and launches instances in the optimal subnet.",
    ).optional(),
    EmrManagedMasterSecurityGroup: z.string().describe(
      "The identifier of the Amazon EC2 security group for the master node. If you specify EmrManagedMasterSecurityGroup, you must also specify EmrManagedSlaveSecurityGroup.",
    ).optional(),
    EmrManagedSlaveSecurityGroup: z.string().describe(
      "The identifier of the Amazon EC2 security group for the core and task nodes. If you specify EmrManagedSlaveSecurityGroup, you must also specify EmrManagedMasterSecurityGroup.",
    ).optional(),
    HadoopVersion: z.string().describe(
      'Applies only to Amazon EMR release versions earlier than 4.0. The Hadoop version for the cluster. Valid inputs are "0.18" (no longer maintained), "0.20" (no longer maintained), "0.20.205" (no longer maintained), "1.0.3", "2.2.0", or "2.4.0". If you do not set this value, the default of 0.18 is used, unless the AmiVersion parameter is set in the RunJobFlow call, in which case the default version of Hadoop for that AMI version is used.',
    ).optional(),
    KeepJobFlowAliveWhenNoSteps: z.boolean().describe(
      "Specifies whether the cluster should remain available after completing all steps. Defaults to true. For more information about configuring cluster termination, see Control Cluster Termination in the EMR Management Guide.",
    ).optional(),
    CoreInstanceFleet: InstanceFleetConfigSchema.optional(),
    MasterInstanceFleet: InstanceFleetConfigSchema.optional(),
    TaskInstanceFleets: z.array(InstanceFleetConfigSchema).optional(),
    CoreInstanceGroup: InstanceGroupConfigSchema.describe(
      "Configuration for the instance groups in a cluster.",
    ).optional(),
    MasterInstanceGroup: InstanceGroupConfigSchema.describe(
      "Configuration for the instance groups in a cluster.",
    ).optional(),
    TaskInstanceGroups: z.array(InstanceGroupConfigSchema).describe(
      "Configuration for the instance groups in a cluster.",
    ).optional(),
    Placement: PlacementTypeSchema.describe(
      "The Availability Zone in which the cluster runs.",
    ).optional(),
    ServiceAccessSecurityGroup: z.string().describe(
      "The identifier of the Amazon EC2 security group for the Amazon EMR service to access clusters in VPC private subnets.",
    ).optional(),
    TerminationProtected: z.boolean().describe(
      "Specifies whether to lock the cluster to prevent the Amazon EC2 instances from being terminated by API call, user intervention, or in the event of a job-flow error.",
    ).optional(),
    UnhealthyNodeReplacement: z.boolean().describe(
      "Indicates whether Amazon EMR should gracefully replace core nodes that have degraded within the cluster.",
    ).optional(),
  }).describe("A specification of the number and type of Amazon EC2 instances.")
    .optional(),
  JobFlowRole: z.string().describe(
    "Also called instance profile and EC2 role. An IAM role for an EMR cluster. The EC2 instances of the cluster assume this role. The default role is EMR_EC2_DefaultRole. In order to use the default role, you must have already created it using the CLI or console",
  ).optional(),
  KerberosAttributes: z.object({
    ADDomainJoinPassword: z.string().describe(
      "The Active Directory password for ADDomainJoinUser.",
    ).optional(),
    ADDomainJoinUser: z.string().describe(
      "Required only when establishing a cross-realm trust with an Active Directory domain. A user with sufficient privileges to join resources to the domain.",
    ).optional(),
    CrossRealmTrustPrincipalPassword: z.string().describe(
      "Required only when establishing a cross-realm trust with a KDC in a different realm. The cross-realm principal password, which must be identical across realms.",
    ).optional(),
    KdcAdminPassword: z.string().describe(
      "The password used within the cluster for the kadmin service on the cluster-dedicated KDC, which maintains Kerberos principals, password policies, and keytabs for the cluster.",
    ).optional(),
    Realm: z.string().describe(
      "The name of the Kerberos realm to which all nodes in a cluster belong. For example, EC2.INTERNAL.",
    ).optional(),
  }).describe(
    "Attributes for Kerberos configuration when Kerberos authentication is enabled using a security configuration. For more information see Use Kerberos Authentication in the Amazon EMR Management Guide.",
  ).optional(),
  LogEncryptionKmsKeyId: z.string().describe(
    "The AWS KMS key used for encrypting log files. If a value is not provided, the logs remain encrypted by AES-256. This attribute is only available with Amazon EMR version 5.30.0 and later, excluding Amazon EMR 6.0.0.",
  ).optional(),
  LogUri: z.string().describe(
    "The location in Amazon S3 to write the log files of the job flow. If a value is not provided, logs are not created.",
  ).optional(),
  ManagedScalingPolicy: z.object({
    UtilizationPerformanceIndex: z.number().int().optional(),
    ScalingStrategy: z.string().optional(),
    ComputeLimits: ComputeLimitsSchema.optional(),
  }).describe("The specified managed scaling policy for an Amazon EMR cluster.")
    .optional(),
  Name: z.string().describe("The name of the job flow.").optional(),
  ReleaseLabel: z.string().describe(
    "The Amazon EMR release label, which determines the version of open-source application packages installed on the cluster. Release labels are in the form emr-x.x.x, where x.x.x is an Amazon EMR release version such as emr-5.14.0.",
  ).optional(),
  OSReleaseLabel: z.string().describe(
    "Specifies a particular Amazon Linux release for all nodes in a cluster launch RunJobFlow request. If a release is not specified, Amazon EMR uses the latest validated Amazon Linux release for cluster launch.",
  ).optional(),
  ScaleDownBehavior: z.enum([
    "TERMINATE_AT_INSTANCE_HOUR",
    "TERMINATE_AT_TASK_COMPLETION",
  ]).describe(
    "The way that individual Amazon EC2 instances terminate when an automatic scale-in activity occurs or an instance group is resized.",
  ).optional(),
  SecurityConfiguration: z.string().describe(
    "The name of the security configuration applied to the cluster.",
  ).optional(),
  ServiceRole: z.string().describe(
    "The IAM role that Amazon EMR assumes in order to access AWS resources on your behalf.",
  ).optional(),
  StepConcurrencyLevel: z.number().int().describe(
    "Specifies the number of steps that can be executed concurrently.",
  ).optional(),
  Steps: z.array(StepConfigSchema).optional(),
  VisibleToAllUsers: z.boolean().describe(
    "Indicates whether the cluster is visible to IAM principals in the AWS account associated with the cluster. When true, IAM principals in the AWS account can perform EMR cluster actions on the cluster that their IAM policies allow. When false, only the IAM principal that created the cluster and the AWS account root user can perform EMR actions, regardless of IAM permissions policies attached to other IAM principals.",
  ).optional(),
  EbsRootVolumeIops: z.number().int().describe(
    "The IOPS, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 6.15.0 and later.",
  ).optional(),
  EbsRootVolumeThroughput: z.number().int().describe(
    "The throughput, in MiB/s, of the Amazon EBS root device volume of the Linux AMI that is used for each Amazon EC2 instance. Available in Amazon EMR releases 6.15.0 and later.",
  ).optional(),
  PlacementGroupConfigs: z.array(PlacementGroupConfigSchema).describe(
    "The configuration specifies the placement strategy that can be applied to instance roles during cluster creation.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  MonitoringConfiguration: z.object({
    CloudWatchLogConfiguration: CloudWatchLogConfigurationSchema.describe(
      "Holds CloudWatch log configuration settings and metadata that specify settings like log files to monitor and where to send them.",
    ).optional(),
  }).describe("Specifies the configuration for cluster logging.").optional(),
  SessionEnabled: z.boolean().describe(
    "Indicates whether Spark Connect sessions are enabled on the cluster. When set to true, you can start Spark Connect sessions using the StartSession operation. This property cannot be changed after the cluster is created.",
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

/** Swamp extension model for EMR Cluster. Registered at `@swamp/aws/emr/cluster`. */
export const model = {
  type: "@swamp/aws/emr/cluster",
  version: "2026.11.08.1",
  upgrades: [
    {
      toVersion: "2026.11.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EMR Cluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EMR Cluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["Instances", "JobFlowRole", "Name", "ServiceRole"]
          .filter((k) => g[k] === undefined);
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
          "AWS::EMR::Cluster",
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
      description: "Get a EMR Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EMR::Cluster",
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
      description: "Update a EMR Cluster",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EMR::Cluster",
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
          "AWS::EMR::Cluster",
          identifier,
          currentState,
          desiredState,
          [
            "Steps",
            "EbsRootVolumeSize",
            "SecurityConfiguration",
            "ScaleDownBehavior",
            "ReleaseLabel",
            "KerberosAttributes",
            "ServiceRole",
            "LogEncryptionKmsKeyId",
            "Name",
            "JobFlowRole",
            "LogUri",
            "AdditionalInfo",
            "Applications",
            "AutoScalingRole",
            "BootstrapActions",
            "Configurations",
            "CustomAmiId",
            "OSReleaseLabel",
            "EbsRootVolumeIops",
            "EbsRootVolumeThroughput",
            "PlacementGroupConfigs",
            "MonitoringConfiguration",
            "SessionEnabled",
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
      description: "Delete a EMR Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EMR::Cluster",
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
      description: "Sync EMR Cluster state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EMR::Cluster",
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
      description: "List EMR Cluster resources",
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
        const { items, nextToken } = await listResources("AWS::EMR::Cluster", {
          resourceModel: args.resourceModel,
          maxPages: args.maxPages,
          credentials,
        });
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Id?.toString() ?? item.identifier).replace(
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
