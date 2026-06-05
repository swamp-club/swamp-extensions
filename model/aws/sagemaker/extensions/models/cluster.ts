// Auto-generated extension model for @swamp/aws/sagemaker/cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker Cluster (AWS::SageMaker::Cluster).
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

const ClusterSlurmConfigSchema = z.object({
  PartitionNames: z.array(
    z.string().min(0).max(1024).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ),
  ).describe(
    "The Slurm partitions that this instance group belongs to. Maximum of 1 partition.",
  ).optional(),
  NodeType: z.enum(["Controller", "Login", "Compute"]).describe(
    "The type of Slurm node for this instance group.",
  ),
});

const ClusterCapacityRequirementsSchema = z.object({
  Spot: z.record(z.string(), z.unknown()).describe("Options for Spot capacity")
    .optional(),
  OnDemand: z.record(z.string(), z.unknown()).describe(
    "Options for OnDemand capacity",
  ).optional(),
});

const ClusterKubernetesTaintSchema = z.object({
  Value: z.string().describe("The value of the taint.").optional(),
  Effect: z.enum(["NoSchedule", "PreferNoSchedule", "NoExecute"]).describe(
    "The effect of the taint.",
  ),
  Key: z.string().describe("The key of the taint."),
});

const ClusterKubernetesConfigSchema = z.object({
  Labels: z.record(z.string(), z.string()).describe(
    "A map of Kubernetes labels to apply to cluster nodes.",
  ).optional(),
  Taints: z.array(ClusterKubernetesTaintSchema).describe(
    "A list of Kubernetes taints to apply to cluster nodes. Maximum of 50 taints.",
  ).optional(),
});

const ClusterNetworkInterfaceSchema = z.object({
  InterfaceType: z.enum(["efa", "efa-only"]).describe(
    "The type of network interface.",
  ),
});

const ClusterLifeCycleConfigSchema = z.object({
  OnInitComplete: z.string().min(1).max(128).regex(new RegExp("^[\\S\\s]+$"))
    .describe(
      "The file name of the extension script under SourceS3Uri. This script runs after HyperPod configures the default software on the instance. Mutually exclusive with OnCreate.",
    ).optional(),
  SourceS3Uri: z.string().max(1024).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).describe(
    "An Amazon S3 bucket path where your lifecycle scripts are stored.",
  ).optional(),
  OnCreate: z.string().min(1).max(128).regex(new RegExp("^[\\S\\s]+$"))
    .describe(
      "The file name of the entrypoint script of lifecycle scripts under SourceS3Uri. This entrypoint script runs during cluster creation. Mutually exclusive with OnInitComplete.",
    ).optional(),
});

const VpcConfigSchema = z.object({
  Subnets: z.array(z.string().max(32).regex(new RegExp("[-0-9a-zA-Z]+")))
    .describe(
      "The ID of the subnets in the VPC to which you want to connect your training job or model.",
    ),
  SecurityGroupIds: z.array(
    z.string().max(32).regex(new RegExp("[-0-9a-zA-Z]+")),
  ).describe(
    "The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the Subnets field.",
  ),
});

const AlarmDetailsSchema = z.object({
  AlarmName: z.string().min(1).max(256).regex(new RegExp("(?!\\s*$).+"))
    .describe("The name of the alarm."),
});

const CapacitySizeConfigSchema = z.object({
  Type: z.string().regex(new RegExp("INSTANCE_COUNT|CAPACITY_PERCENTAGE"))
    .describe(
      "Specifies whether SageMaker should process the update by amount or percentage of instances.",
    ),
  Value: z.number().int().min(1).describe(
    "Specifies the amount or percentage of instances SageMaker updates at a time.",
  ),
});

const RollingUpdatePolicySchema = z.object({
  MaximumBatchSize: CapacitySizeConfigSchema.describe(
    "The configuration of the size measurements of the AMI update. Using this configuration, you can specify whether SageMaker should update your instance group by an amount or percentage of instances.",
  ),
  RollbackMaximumBatchSize: CapacitySizeConfigSchema.describe(
    "The configuration of the size measurements of the AMI update. Using this configuration, you can specify whether SageMaker should update your instance group by an amount or percentage of instances.",
  ).optional(),
});

const DeploymentConfigSchema = z.object({
  AutoRollbackConfiguration: z.array(AlarmDetailsSchema).describe(
    "An array that contains the alarms that SageMaker monitors to know whether to roll back the AMI update.",
  ).optional(),
  RollingUpdatePolicy: RollingUpdatePolicySchema.describe(
    "The policy that SageMaker uses when updating the AMI versions of the cluster.",
  ).optional(),
  WaitIntervalInSeconds: z.number().int().min(0).max(3600).describe(
    "The duration in seconds that SageMaker waits before updating more instances in the cluster.",
  ).optional(),
});

const ScheduledUpdateConfigSchema = z.object({
  ScheduleExpression: z.string().min(1).max(256).regex(
    new RegExp(
      "cron\\((?:[0-5][0-9]|[0-9]|) (?:[01][0-9]|2[0-3]|[0-9]) (?:[1-9]|0[1-9]|[12][0-9]|3[01]|\\?) (?:[1-9]|0[1-9]|1[0-2]|\\*|\\*/(?:[1-9]|1[0-2])|) (?:MON|TUE|WED|THU|FRI|SAT|SUN|[1-7]|\\?|L|(?:[1-7]#[1-5])|(?:[1-7]L)) (?:20[2-9][0-9]|\\*|)\\)",
    ),
  ).describe(
    "A cron expression that specifies the schedule that SageMaker follows when updating the AMI.",
  ),
  DeploymentConfig: DeploymentConfigSchema.describe(
    "The configuration to use when updating the AMI versions.",
  ).optional(),
});

const InstanceRequirementsSchema = z.object({
  InstanceTypes: z.array(z.string()).describe(
    "A list of instance types that can be used for this instance group.",
  ),
});

const ClusterInstanceGroupSchema = z.object({
  SlurmConfig: ClusterSlurmConfigSchema.describe(
    "Slurm configuration for the instance group.",
  ).optional(),
  CapacityRequirements: ClusterCapacityRequirementsSchema.describe(
    "Specifies the capacity requirements configuration for an instance group",
  ).optional(),
  InstanceGroupName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name of the instance group of a SageMaker HyperPod cluster."),
  InstanceStorageConfigs: z.array(z.record(z.string(), z.unknown())).describe(
    "The instance storage configuration for the instance group.",
  ).optional(),
  KubernetesConfig: ClusterKubernetesConfigSchema.describe(
    "Kubernetes configuration for cluster nodes including labels and taints.",
  ).optional(),
  NetworkInterface: ClusterNetworkInterfaceSchema.describe(
    "Specifies the network interface configuration for the instance group.",
  ).optional(),
  LifeCycleConfig: ClusterLifeCycleConfigSchema.describe(
    "The lifecycle configuration for a SageMaker HyperPod cluster. When omitted, the instance group uses Bootstrap mode. When provided with SourceS3Uri and OnCreate, uses Customer Managed mode. When provided with SourceS3Uri and OnInitComplete, uses Extended mode.",
  ).optional(),
  TrainingPlanArn: z.string().min(50).max(2048).regex(
    new RegExp(
      "^arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:training-plan/.*$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the training plan to use for this cluster instance group. For more information about how to reserve GPU capacity for your SageMaker HyperPod clusters using Amazon SageMaker Training Plan, see CreateTrainingPlan.",
  ).optional(),
  ThreadsPerCore: z.number().int().min(1).max(2).describe(
    "The number you specified to TreadsPerCore in CreateCluster for enabling or disabling multithreading. For instance types that support multithreading, you can specify 1 for disabling multithreading and 2 for enabling multithreading.",
  ).optional(),
  OverrideVpcConfig: VpcConfigSchema.describe(
    "Specifies an Amazon Virtual Private Cloud (VPC) that your SageMaker jobs, hosted models, and compute resources have access to. You can control access to and from your resources by configuring a VPC.",
  ).optional(),
  InstanceCount: z.number().int().min(0).describe(
    "The number of instances you specified to add to the instance group of a SageMaker HyperPod cluster.",
  ),
  OnStartDeepHealthChecks: z.array(
    z.enum(["InstanceStress", "InstanceConnectivity"]),
  ).describe(
    "Nodes will undergo advanced stress test to detect and replace faulty instances, based on the type of deep health check(s) passed in.",
  ).optional(),
  ImageId: z.string().min(7).max(21).regex(
    new RegExp("^ami-[0-9a-fA-F]{8,17}|default$"),
  ).describe(
    "AMI Id to be used for launching EC2 instances - HyperPodPublicAmiId or CustomAmiId",
  ).optional(),
  CurrentCount: z.number().int().min(0).describe(
    "The number of instances that are currently in the instance group of a SageMaker HyperPod cluster.",
  ).optional(),
  ScheduledUpdateConfig: ScheduledUpdateConfigSchema.describe(
    "The configuration object of the schedule that SageMaker follows when updating the AMI.",
  ).optional(),
  InstanceRequirements: InstanceRequirementsSchema.describe(
    "The instance requirements for the instance group. Specifies a list of instance types that can be used.",
  ).optional(),
  InstanceType: z.string().describe(
    "The instance type of the instance group of a SageMaker HyperPod cluster.",
  ).optional(),
  ExecutionRole: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe("The execution role for the instance group to assume."),
  MinInstanceCount: z.number().int().min(0).describe(
    "The minimum number of instances required for the instance group to be InService. MinInstanceCount must be less than or equal to InstanceCount.",
  ).optional(),
});

const FSxLustreConfigSchema = z.object({
  SizeInGiB: z.number().int().min(1200).max(100800).describe(
    "The storage capacity of the FSx for Lustre file system, specified in gibibytes (GiB).",
  ),
  PerUnitStorageThroughput: z.number().int().min(125).max(1000).describe(
    "The throughput capacity of the FSx for Lustre file system, measured in MB/s per TiB of storage.",
  ),
});

const EnvironmentConfigSchema = z.object({
  FSxLustreConfig: FSxLustreConfigSchema.describe(
    "Configuration settings for an Amazon FSx for Lustre file system to be used with the cluster.",
  ).optional(),
});

const ClusterRestrictedInstanceGroupSchema = z.object({
  OverrideVpcConfig: VpcConfigSchema.describe(
    "Specifies an Amazon Virtual Private Cloud (VPC) that your SageMaker jobs, hosted models, and compute resources have access to. You can control access to and from your resources by configuring a VPC.",
  ).optional(),
  InstanceCount: z.number().int().min(0).describe(
    "The number of instances you specified to add to the restricted instance group of a SageMaker HyperPod cluster.",
  ),
  OnStartDeepHealthChecks: z.array(
    z.enum(["InstanceStress", "InstanceConnectivity"]),
  ).describe(
    "Nodes will undergo advanced stress test to detect and replace faulty instances, based on the type of deep health check(s) passed in.",
  ).optional(),
  EnvironmentConfig: EnvironmentConfigSchema.describe(
    "The configuration for the restricted instance groups (RIG) environment.",
  ),
  InstanceGroupName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name of the instance group of a SageMaker HyperPod cluster."),
  InstanceStorageConfigs: z.array(z.record(z.string(), z.unknown())).describe(
    "The instance storage configuration for the instance group.",
  ).optional(),
  CurrentCount: z.number().int().min(0).describe(
    "The number of instances that are currently in the restricted instance group of a SageMaker HyperPod cluster.",
  ).optional(),
  TrainingPlanArn: z.string().min(50).max(2048).regex(
    new RegExp(
      "^arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:training-plan/.*$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the training plan to use for this cluster restricted instance group. For more information about how to reserve GPU capacity for your SageMaker HyperPod clusters using Amazon SageMaker Training Plan, see CreateTrainingPlan.",
  ).optional(),
  InstanceType: z.string().describe(
    "The instance type of the instance group of a SageMaker HyperPod cluster.",
  ),
  ThreadsPerCore: z.number().int().min(1).max(2).describe(
    "The number you specified to TreadsPerCore in CreateCluster for enabling or disabling multithreading. For instance types that support multithreading, you can specify 1 for disabling multithreading and 2 for enabling multithreading.",
  ).optional(),
  ExecutionRole: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe("The execution role for the instance group to assume."),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  VpcConfig: z.object({
    Subnets: z.array(z.string().max(32).regex(new RegExp("[-0-9a-zA-Z]+")))
      .describe(
        "The ID of the subnets in the VPC to which you want to connect your training job or model.",
      ),
    SecurityGroupIds: z.array(
      z.string().max(32).regex(new RegExp("[-0-9a-zA-Z]+")),
    ).describe(
      "The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the Subnets field.",
    ),
  }).describe(
    "Specifies an Amazon Virtual Private Cloud (VPC) that your SageMaker jobs, hosted models, and compute resources have access to. You can control access to and from your resources by configuring a VPC.",
  ).optional(),
  NodeRecovery: z.enum(["Automatic", "None"]).describe(
    "If node auto-recovery is set to true, faulty nodes will be replaced or rebooted when a failure is detected. If set to false, nodes will be labelled when a fault is detected.",
  ).optional(),
  InstanceGroups: z.array(ClusterInstanceGroupSchema).describe(
    "The instance groups of the SageMaker HyperPod cluster.",
  ).optional(),
  RestrictedInstanceGroups: z.array(ClusterRestrictedInstanceGroupSchema)
    .describe(
      "The restricted instance groups of the SageMaker HyperPod cluster.",
    ).optional(),
  Orchestrator: z.record(z.string(), z.unknown()).describe(
    "Specifies parameter(s) specific to the orchestrator, e.g. specify the EKS cluster or Slurm configuration.",
  ).optional(),
  ClusterRole: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe("The cluster role for the autoscaler to assume.").optional(),
  NodeProvisioningMode: z.enum(["Continuous"]).describe(
    "Determines the scaling strategy for the SageMaker HyperPod cluster. When set to 'Continuous', enables continuous scaling which dynamically manages node provisioning. If the parameter is omitted, uses the standard scaling approach in previous release.",
  ).optional(),
  ClusterName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe("The name of the HyperPod Cluster.").optional(),
  AutoScaling: z.object({
    Mode: z.enum(["Enable", "Disable"]).describe(
      "The auto-scaling mode for the cluster",
    ),
    AutoScalerType: z.enum(["Karpenter"]).describe(
      "The type of auto-scaler to use",
    ).optional(),
  }).describe("Configuration for cluster auto-scaling").optional(),
  Tags: z.array(TagSchema).describe(
    "Custom tags for managing the SageMaker HyperPod cluster as an AWS resource. You can add tags to your cluster in the same way you add them in other AWS services that support tagging.",
  ).optional(),
  TieredStorageConfig: z.object({
    Mode: z.enum(["Enable", "Disable"]).describe("The mode of tiered storage."),
    InstanceMemoryAllocationPercentage: z.number().int().describe(
      "The percentage of instance memory to allocate for tiered storage.",
    ).optional(),
  }).describe(
    "Configuration for tiered storage in the SageMaker HyperPod cluster.",
  ).optional(),
});

const StateSchema = z.object({
  ClusterArn: z.string(),
  VpcConfig: VpcConfigSchema.optional(),
  NodeRecovery: z.string().optional(),
  InstanceGroups: z.array(ClusterInstanceGroupSchema).optional(),
  RestrictedInstanceGroups: z.array(ClusterRestrictedInstanceGroupSchema)
    .optional(),
  Orchestrator: z.record(z.string(), z.unknown()).optional(),
  ClusterRole: z.string().optional(),
  NodeProvisioningMode: z.string().optional(),
  CreationTime: z.string().optional(),
  ClusterName: z.string().optional(),
  FailureMessage: z.string().optional(),
  AutoScaling: z.object({
    Mode: z.string(),
    AutoScalerType: z.string(),
  }).optional(),
  ClusterStatus: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TieredStorageConfig: z.object({
    Mode: z.string(),
    InstanceMemoryAllocationPercentage: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  VpcConfig: z.object({
    Subnets: z.array(z.string().max(32).regex(new RegExp("[-0-9a-zA-Z]+")))
      .describe(
        "The ID of the subnets in the VPC to which you want to connect your training job or model.",
      ).optional(),
    SecurityGroupIds: z.array(
      z.string().max(32).regex(new RegExp("[-0-9a-zA-Z]+")),
    ).describe(
      "The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the Subnets field.",
    ).optional(),
  }).describe(
    "Specifies an Amazon Virtual Private Cloud (VPC) that your SageMaker jobs, hosted models, and compute resources have access to. You can control access to and from your resources by configuring a VPC.",
  ).optional(),
  NodeRecovery: z.enum(["Automatic", "None"]).describe(
    "If node auto-recovery is set to true, faulty nodes will be replaced or rebooted when a failure is detected. If set to false, nodes will be labelled when a fault is detected.",
  ).optional(),
  InstanceGroups: z.array(ClusterInstanceGroupSchema).describe(
    "The instance groups of the SageMaker HyperPod cluster.",
  ).optional(),
  RestrictedInstanceGroups: z.array(ClusterRestrictedInstanceGroupSchema)
    .describe(
      "The restricted instance groups of the SageMaker HyperPod cluster.",
    ).optional(),
  Orchestrator: z.record(z.string(), z.unknown()).describe(
    "Specifies parameter(s) specific to the orchestrator, e.g. specify the EKS cluster or Slurm configuration.",
  ).optional(),
  ClusterRole: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe("The cluster role for the autoscaler to assume.").optional(),
  NodeProvisioningMode: z.enum(["Continuous"]).describe(
    "Determines the scaling strategy for the SageMaker HyperPod cluster. When set to 'Continuous', enables continuous scaling which dynamically manages node provisioning. If the parameter is omitted, uses the standard scaling approach in previous release.",
  ).optional(),
  ClusterName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe("The name of the HyperPod Cluster.").optional(),
  AutoScaling: z.object({
    Mode: z.enum(["Enable", "Disable"]).describe(
      "The auto-scaling mode for the cluster",
    ).optional(),
    AutoScalerType: z.enum(["Karpenter"]).describe(
      "The type of auto-scaler to use",
    ).optional(),
  }).describe("Configuration for cluster auto-scaling").optional(),
  Tags: z.array(TagSchema).describe(
    "Custom tags for managing the SageMaker HyperPod cluster as an AWS resource. You can add tags to your cluster in the same way you add them in other AWS services that support tagging.",
  ).optional(),
  TieredStorageConfig: z.object({
    Mode: z.enum(["Enable", "Disable"]).describe("The mode of tiered storage.")
      .optional(),
    InstanceMemoryAllocationPercentage: z.number().int().describe(
      "The percentage of instance memory to allocate for tiered storage.",
    ).optional(),
  }).describe(
    "Configuration for tiered storage in the SageMaker HyperPod cluster.",
  ).optional(),
});

/** Swamp extension model for SageMaker Cluster. Registered at `@swamp/aws/sagemaker/cluster`. */
export const model = {
  type: "@swamp/aws/sagemaker/cluster",
  version: "2026.06.05.1",
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
      toVersion: "2026.04.19.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker Cluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker Cluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SageMaker::Cluster",
          desiredState,
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
      description: "Get a SageMaker Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SageMaker::Cluster",
          args.identifier,
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
      description: "Update a SageMaker Cluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.ClusterArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::Cluster",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SageMaker::Cluster",
          identifier,
          currentState,
          desiredState,
          ["ClusterName", "VpcConfig", "Eks"],
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
      description: "Delete a SageMaker Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SageMaker::Cluster",
          args.identifier,
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
      description: "Sync SageMaker Cluster state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.ClusterArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::Cluster",
            identifier,
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
