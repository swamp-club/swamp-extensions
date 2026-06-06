// Auto-generated extension model for @swamp/aws/codedeploy/deployment-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CodeDeploy DeploymentGroup (AWS::CodeDeploy::DeploymentGroup).
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

const TagFilterSchema = z.object({
  Value: z.string().describe("The on-premises instance tag filter value.")
    .optional(),
  Type: z.string().describe("The on-premises instance tag filter type")
    .optional(),
  Key: z.string().describe("The on-premises instance tag filter key.")
    .optional(),
});

const OnPremisesTagSetListObjectSchema = z.object({
  OnPremisesTagGroup: z.array(TagFilterSchema).describe(
    "Information about groups of on-premises instance tags.",
  ).optional(),
});

const GreenFleetProvisioningOptionSchema = z.object({
  Action: z.string().describe(
    "The method used to add instances to a replacement environment.",
  ).optional(),
});

const DeploymentReadyOptionSchema = z.object({
  WaitTimeInMinutes: z.number().int().describe(
    "The number of minutes to wait before the status of a blue/green deployment is changed to Stopped if rerouting is not started manually. Applies only to the STOP_DEPLOYMENT option for actionOnTimeout.",
  ).optional(),
  ActionOnTimeout: z.string().describe(
    "Information about when to reroute traffic from an original environment to a replacement environment in a blue/green deployment. CONTINUE_DEPLOYMENT: Register new instances with the load balancer immediately after the new application revision is installed on the instances in the replacement environment. STOP_DEPLOYMENT: Do not register new instances with a load balancer unless traffic rerouting is started using ContinueDeployment. If traffic rerouting is not started before the end of the specified wait period, the deployment status is changed to Stopped.",
  ).optional(),
});

const BlueInstanceTerminationOptionSchema = z.object({
  TerminationWaitTimeInMinutes: z.number().int().describe(
    "For an Amazon EC2 deployment, the number of minutes to wait after a successful blue/green deployment before terminating instances from the original environment. For an Amazon ECS deployment, the number of minutes before deleting the original (blue) task set. During an Amazon ECS deployment, CodeDeploy shifts traffic from the original (blue) task set to a replacement (green) task set. The maximum setting is 2880 minutes (2 days).",
  ).optional(),
  Action: z.string().describe(
    "The action to take on instances in the original environment after a successful blue/green deployment.",
  ).optional(),
});

const EC2TagFilterSchema = z.object({
  Value: z.string().describe("The tag filter value.").optional(),
  Type: z.string().describe("The tag filter type.").optional(),
  Key: z.string().describe("The tag filter key.").optional(),
});

const EC2TagSetListObjectSchema = z.object({
  Ec2TagGroup: z.array(EC2TagFilterSchema).describe(
    "A list that contains other lists of Amazon EC2 instance tag groups. For an instance to be included in the deployment group, it must be identified by all of the tag groups in the list.",
  ).optional(),
});

const TriggerConfigSchema = z.object({
  TriggerTargetArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the Amazon Simple Notification Service topic through which notifications about deployment or instance events are sent.",
  ).optional(),
  TriggerName: z.string().describe("The name of the notification trigger.")
    .optional(),
  TriggerEvents: z.array(z.string()).describe(
    "The event type or types that trigger notifications.",
  ).optional(),
});

const S3LocationSchema = z.object({
  BundleType: z.string().describe("The file type of the application revision.")
    .optional(),
  Bucket: z.string().describe(
    "The name of the Amazon S3 bucket where the application revision is stored.",
  ),
  ETag: z.string().describe(
    "The ETag of the Amazon S3 object that represents the bundled artifacts for the application revision. If the ETag is not specified as an input parameter, ETag validation of the object is skipped.",
  ).optional(),
  Version: z.string().describe(
    "A specific version of the Amazon S3 object that represents the bundled artifacts for the application revision. If the version is not specified, the system uses the most recent version by default.",
  ).optional(),
  Key: z.string().describe(
    "The name of the Amazon S3 object that represents the bundled artifacts for the application revision.",
  ),
});

const GitHubLocationSchema = z.object({
  Repository: z.string().describe(
    "The GitHub account and repository pair that stores the application revision to be deployed.",
  ),
  CommitId: z.string().describe(
    "The SHA1 commit ID of the GitHub commit that represents the bundled artifacts for the application revision.",
  ),
});

const RevisionLocationSchema = z.object({
  S3Location: S3LocationSchema.describe(
    "Information about the location of application artifacts stored in Amazon S3.",
  ).optional(),
  GitHubLocation: GitHubLocationSchema.describe(
    "Specifies the location of an application revision that is stored in GitHub.",
  ).optional(),
  RevisionType: z.string().describe("The type of application revision.")
    .optional(),
});

const AlarmSchema = z.object({
  Name: z.string().describe(
    "The name of the alarm. Maximum length is 255 characters. Each alarm name can be used only once in a list of alarms.",
  ).optional(),
});

const ECSServiceSchema = z.object({
  ServiceName: z.string().describe(
    "The name of the target Amazon ECS service.",
  ),
  ClusterName: z.string().describe(
    "The name of the cluster that the Amazon ECS service is associated with.",
  ),
});

const TargetGroupInfoSchema = z.object({
  Name: z.string().describe(
    "For blue/green deployments, the name of the target group that instances in the original environment are deregistered from, and instances in the replacement environment registered with. For in-place deployments, the name of the target group that instances are deregistered from, so they are not serving traffic during a deployment, and then re-registered with after the deployment completes. No duplicates allowed.",
  ).optional(),
});

const ELBInfoSchema = z.object({
  Name: z.string().describe(
    "For blue/green deployments, the name of the load balancer that is used to route traffic from original instances to replacement instances in a blue/green deployment. For in-place deployments, the name of the load balancer that instances are deregistered from so they are not serving traffic during a deployment, and then re-registered with after the deployment is complete.",
  ).optional(),
});

const TrafficRouteSchema = z.object({
  ListenerArns: z.array(z.string()).describe(
    "The Amazon Resource Name (ARN) of one listener. The listener identifies the route between a target group and a load balancer. This is an array of strings with a maximum size of one.",
  ).optional(),
});

const TargetGroupPairInfoSchema = z.object({
  ProdTrafficRoute: TrafficRouteSchema.describe(
    "The path used by a load balancer to route production traffic when an Amazon ECS deployment is complete.",
  ).optional(),
  TestTrafficRoute: TrafficRouteSchema.describe(
    "An optional path used by a load balancer to route test traffic after an Amazon ECS deployment. Validation can occur while test traffic is served during a deployment.",
  ).optional(),
  TargetGroups: z.array(TargetGroupInfoSchema).describe(
    "One pair of target groups. One is associated with the original task set. The second is associated with the task set that serves traffic after the deployment is complete.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().describe("The tag's value."),
  Key: z.string().describe("The tag's key."),
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
  OnPremisesTagSet: z.object({
    OnPremisesTagSetList: z.array(OnPremisesTagSetListObjectSchema).describe(
      "A list that contains other lists of on-premises instance tag groups. For an instance to be included in the deployment group, it must be identified by all of the tag groups in the list.",
    ).optional(),
  }).describe(
    "Information about groups of tags applied to on-premises instances. The deployment group includes only on-premises instances identified by all the tag groups. You can specify OnPremisesInstanceTagFilters or OnPremisesInstanceTagSet, but not both.",
  ).optional(),
  ApplicationName: z.string().describe(
    "The name of an existing CodeDeploy application to associate this deployment group with.",
  ),
  DeploymentStyle: z.object({
    DeploymentOption: z.string().describe(
      "Indicates whether to route deployment traffic behind a load balancer.",
    ).optional(),
    DeploymentType: z.string().describe(
      "Indicates whether to run an in-place or blue/green deployment.",
    ).optional(),
  }).describe(
    "Attributes that determine the type of deployment to run and whether to route deployment traffic behind a load balancer. If you specify this property with a blue/green deployment type, don't specify the AutoScalingGroups, LoadBalancerInfo, or Deployment properties.",
  ).optional(),
  ServiceRoleArn: z.string().describe(
    "A service role Amazon Resource Name (ARN) that grants CodeDeploy permission to make calls to AWS services on your behalf. For more information, see 'Create a Service Role for AWS CodeDeploy' in the AWS CodeDeploy User Guide.",
  ),
  BlueGreenDeploymentConfiguration: z.object({
    GreenFleetProvisioningOption: GreenFleetProvisioningOptionSchema.describe(
      "Information about how instances are provisioned for a replacement environment in a blue/green deployment.",
    ).optional(),
    DeploymentReadyOption: DeploymentReadyOptionSchema.describe(
      "Information about the action to take when newly provisioned instances are ready to receive traffic in a blue/green deployment.",
    ).optional(),
    TerminateBlueInstancesOnDeploymentSuccess:
      BlueInstanceTerminationOptionSchema.describe(
        "Information about whether to terminate instances in the original fleet during a blue/green deployment.",
      ).optional(),
  }).describe(
    "Information about blue/green deployment options for a deployment group.",
  ).optional(),
  AutoScalingGroups: z.array(z.string()).describe(
    "A list of associated Auto Scaling groups that CodeDeploy automatically deploys revisions to when new instances are created. Duplicates are not allowed.",
  ).optional(),
  Ec2TagSet: z.object({
    Ec2TagSetList: z.array(EC2TagSetListObjectSchema).describe(
      "The Amazon EC2 tags that are already applied to Amazon EC2 instances that you want to include in the deployment group. CodeDeploy includes all Amazon EC2 instances identified by any of the tags you specify in this deployment group.",
    ).optional(),
  }).describe(
    "Information about groups of tags applied to Amazon EC2 instances. Use when the deployment group includes only Amazon EC2 instances identified by all the tag groups. Cannot be used in the same call as ec2TagFilter.",
  ).optional(),
  OutdatedInstancesStrategy: z.string().describe(
    "Indicates what happens when new Amazon EC2 instances are launched mid-deployment and do not receive the deployed application revision. If this option is set to UPDATE or is unspecified, CodeDeploy initiates one or more 'auto-update outdated instances' deployments to apply the deployed application revision to the new Amazon EC2 instances. If this option is set to IGNORE, CodeDeploy does not initiate a deployment to update the new Amazon EC2 instances. This may result in instances having different revisions.",
  ).optional(),
  TriggerConfigurations: z.array(TriggerConfigSchema).describe(
    "Information about triggers associated with the deployment group. Duplicates are not allowed.",
  ).optional(),
  Deployment: z.object({
    Description: z.string().describe("A description of the deployment.")
      .optional(),
    Revision: RevisionLocationSchema.describe(
      "Information about the location of stored application artifacts and the service from which to retrieve them.",
    ),
    IgnoreApplicationStopFailures: z.boolean().describe(
      "If true, then if an ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic deployment lifecycle event to an instance fails, then the deployment continues to the next deployment lifecycle event. If false or not specified, then if a lifecycle event fails during a deployment to an instance, that deployment fails. If deployment to that instance is part of an overall deployment and the number of healthy hosts is not less than the minimum number of healthy hosts, then a deployment to the next instance is attempted.",
    ).optional(),
  }).describe(
    "The application revision to deploy to this deployment group. If you specify this property, your target application revision is deployed as soon as the provisioning process is complete. If you specify this property, don't specify the AutoRollbackConfiguration property.",
  ).optional(),
  DeploymentConfigName: z.string().describe(
    "A deployment configuration name or a predefined configuration name. With predefined configurations, you can deploy application revisions to one instance at a time (CodeDeployDefault.OneAtATime), half of the instances at a time (CodeDeployDefault.HalfAtATime), or all the instances at once (CodeDeployDefault.AllAtOnce).",
  ).optional(),
  AlarmConfiguration: z.object({
    Alarms: z.array(AlarmSchema).describe(
      "A list of alarms configured for the deployment or deployment group. A maximum of 10 alarms can be added.",
    ).optional(),
    IgnorePollAlarmFailure: z.boolean().describe(
      "Indicates whether a deployment should continue if information about the current state of alarms cannot be retrieved from Amazon CloudWatch. The default value is false.",
    ).optional(),
    Enabled: z.boolean().describe(
      "Indicates whether the alarm configuration is enabled.",
    ).optional(),
  }).describe(
    "Information about the Amazon CloudWatch alarms that are associated with the deployment group.",
  ).optional(),
  Ec2TagFilters: z.array(EC2TagFilterSchema).describe(
    "The Amazon EC2 tags that are already applied to Amazon EC2 instances that you want to include in the deployment group. CodeDeploy includes all Amazon EC2 instances identified by any of the tags you specify in this deployment group. Duplicates are not allowed. You can specify EC2TagFilters or Ec2TagSet, but not both.",
  ).optional(),
  TerminationHookEnabled: z.boolean().describe(
    "Indicates whether the deployment group was configured to have CodeDeploy install a termination hook into an Auto Scaling group.",
  ).optional(),
  ECSServices: z.array(ECSServiceSchema).describe(
    "The target Amazon ECS services in the deployment group. This applies only to deployment groups that use the Amazon ECS compute platform. A target Amazon ECS service is specified as an Amazon ECS cluster and service name pair using the format :.",
  ).optional(),
  AutoRollbackConfiguration: z.object({
    Events: z.array(z.string()).describe(
      "The event type or types that trigger a rollback.",
    ).optional(),
    Enabled: z.boolean().describe(
      "Indicates whether a defined automatic rollback configuration is currently enabled.",
    ).optional(),
  }).describe(
    "Information about the automatic rollback configuration that is associated with the deployment group. If you specify this property, don't specify the Deployment property.",
  ).optional(),
  LoadBalancerInfo: z.object({
    TargetGroupInfoList: z.array(TargetGroupInfoSchema).describe(
      "An array that contains information about the target groups to use for load balancing in a deployment. If you're using Application Load Balancers and Network Load Balancers, specify their associated target groups in this array.",
    ).optional(),
    ElbInfoList: z.array(ELBInfoSchema).describe(
      "An array that contains information about the load balancers to use for load balancing in a deployment. If you're using Classic Load Balancers, specify those load balancers in this array.",
    ).optional(),
    TargetGroupPairInfoList: z.array(TargetGroupPairInfoSchema).describe(
      "The target group pair information. This is an array of TargeGroupPairInfo objects with a maximum size of one.",
    ).optional(),
  }).describe("Information about the load balancer to use in a deployment.")
    .optional(),
  DeploymentGroupName: z.string().describe(
    "A name for the deployment group. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the deployment group name.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The metadata that you apply to CodeDeploy deployment groups to help you organize and categorize them. Each tag consists of a key and an optional value, both of which you define.",
  ).optional(),
  OnPremisesInstanceTagFilters: z.array(TagFilterSchema).describe(
    "The on-premises instance tags already applied to on-premises instances that you want to include in the deployment group. CodeDeploy includes all on-premises instances identified by any of the tags you specify in this deployment group. Duplicates are not allowed. You can specify OnPremisesInstanceTagFilters or OnPremisesInstanceTagSet, but not both.",
  ).optional(),
});

const StateSchema = z.object({
  OnPremisesTagSet: z.object({
    OnPremisesTagSetList: z.array(OnPremisesTagSetListObjectSchema),
  }).optional(),
  ApplicationName: z.string(),
  DeploymentStyle: z.object({
    DeploymentOption: z.string(),
    DeploymentType: z.string(),
  }).optional(),
  ServiceRoleArn: z.string().optional(),
  BlueGreenDeploymentConfiguration: z.object({
    GreenFleetProvisioningOption: GreenFleetProvisioningOptionSchema,
    DeploymentReadyOption: DeploymentReadyOptionSchema,
    TerminateBlueInstancesOnDeploymentSuccess:
      BlueInstanceTerminationOptionSchema,
  }).optional(),
  AutoScalingGroups: z.array(z.string()).optional(),
  Ec2TagSet: z.object({
    Ec2TagSetList: z.array(EC2TagSetListObjectSchema),
  }).optional(),
  OutdatedInstancesStrategy: z.string().optional(),
  TriggerConfigurations: z.array(TriggerConfigSchema).optional(),
  Deployment: z.object({
    Description: z.string(),
    Revision: RevisionLocationSchema,
    IgnoreApplicationStopFailures: z.boolean(),
  }).optional(),
  DeploymentConfigName: z.string().optional(),
  AlarmConfiguration: z.object({
    Alarms: z.array(AlarmSchema),
    IgnorePollAlarmFailure: z.boolean(),
    Enabled: z.boolean(),
  }).optional(),
  Ec2TagFilters: z.array(EC2TagFilterSchema).optional(),
  TerminationHookEnabled: z.boolean().optional(),
  ECSServices: z.array(ECSServiceSchema).optional(),
  AutoRollbackConfiguration: z.object({
    Events: z.array(z.string()),
    Enabled: z.boolean(),
  }).optional(),
  LoadBalancerInfo: z.object({
    TargetGroupInfoList: z.array(TargetGroupInfoSchema),
    ElbInfoList: z.array(ELBInfoSchema),
    TargetGroupPairInfoList: z.array(TargetGroupPairInfoSchema),
  }).optional(),
  DeploymentGroupName: z.string(),
  Tags: z.array(TagSchema).optional(),
  OnPremisesInstanceTagFilters: z.array(TagFilterSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  OnPremisesTagSet: z.object({
    OnPremisesTagSetList: z.array(OnPremisesTagSetListObjectSchema).describe(
      "A list that contains other lists of on-premises instance tag groups. For an instance to be included in the deployment group, it must be identified by all of the tag groups in the list.",
    ).optional(),
  }).describe(
    "Information about groups of tags applied to on-premises instances. The deployment group includes only on-premises instances identified by all the tag groups. You can specify OnPremisesInstanceTagFilters or OnPremisesInstanceTagSet, but not both.",
  ).optional(),
  ApplicationName: z.string().describe(
    "The name of an existing CodeDeploy application to associate this deployment group with.",
  ).optional(),
  DeploymentStyle: z.object({
    DeploymentOption: z.string().describe(
      "Indicates whether to route deployment traffic behind a load balancer.",
    ).optional(),
    DeploymentType: z.string().describe(
      "Indicates whether to run an in-place or blue/green deployment.",
    ).optional(),
  }).describe(
    "Attributes that determine the type of deployment to run and whether to route deployment traffic behind a load balancer. If you specify this property with a blue/green deployment type, don't specify the AutoScalingGroups, LoadBalancerInfo, or Deployment properties.",
  ).optional(),
  ServiceRoleArn: z.string().describe(
    "A service role Amazon Resource Name (ARN) that grants CodeDeploy permission to make calls to AWS services on your behalf. For more information, see 'Create a Service Role for AWS CodeDeploy' in the AWS CodeDeploy User Guide.",
  ).optional(),
  BlueGreenDeploymentConfiguration: z.object({
    GreenFleetProvisioningOption: GreenFleetProvisioningOptionSchema.describe(
      "Information about how instances are provisioned for a replacement environment in a blue/green deployment.",
    ).optional(),
    DeploymentReadyOption: DeploymentReadyOptionSchema.describe(
      "Information about the action to take when newly provisioned instances are ready to receive traffic in a blue/green deployment.",
    ).optional(),
    TerminateBlueInstancesOnDeploymentSuccess:
      BlueInstanceTerminationOptionSchema.describe(
        "Information about whether to terminate instances in the original fleet during a blue/green deployment.",
      ).optional(),
  }).describe(
    "Information about blue/green deployment options for a deployment group.",
  ).optional(),
  AutoScalingGroups: z.array(z.string()).describe(
    "A list of associated Auto Scaling groups that CodeDeploy automatically deploys revisions to when new instances are created. Duplicates are not allowed.",
  ).optional(),
  Ec2TagSet: z.object({
    Ec2TagSetList: z.array(EC2TagSetListObjectSchema).describe(
      "The Amazon EC2 tags that are already applied to Amazon EC2 instances that you want to include in the deployment group. CodeDeploy includes all Amazon EC2 instances identified by any of the tags you specify in this deployment group.",
    ).optional(),
  }).describe(
    "Information about groups of tags applied to Amazon EC2 instances. Use when the deployment group includes only Amazon EC2 instances identified by all the tag groups. Cannot be used in the same call as ec2TagFilter.",
  ).optional(),
  OutdatedInstancesStrategy: z.string().describe(
    "Indicates what happens when new Amazon EC2 instances are launched mid-deployment and do not receive the deployed application revision. If this option is set to UPDATE or is unspecified, CodeDeploy initiates one or more 'auto-update outdated instances' deployments to apply the deployed application revision to the new Amazon EC2 instances. If this option is set to IGNORE, CodeDeploy does not initiate a deployment to update the new Amazon EC2 instances. This may result in instances having different revisions.",
  ).optional(),
  TriggerConfigurations: z.array(TriggerConfigSchema).describe(
    "Information about triggers associated with the deployment group. Duplicates are not allowed.",
  ).optional(),
  Deployment: z.object({
    Description: z.string().describe("A description of the deployment.")
      .optional(),
    Revision: RevisionLocationSchema.describe(
      "Information about the location of stored application artifacts and the service from which to retrieve them.",
    ).optional(),
    IgnoreApplicationStopFailures: z.boolean().describe(
      "If true, then if an ApplicationStop, BeforeBlockTraffic, or AfterBlockTraffic deployment lifecycle event to an instance fails, then the deployment continues to the next deployment lifecycle event. If false or not specified, then if a lifecycle event fails during a deployment to an instance, that deployment fails. If deployment to that instance is part of an overall deployment and the number of healthy hosts is not less than the minimum number of healthy hosts, then a deployment to the next instance is attempted.",
    ).optional(),
  }).describe(
    "The application revision to deploy to this deployment group. If you specify this property, your target application revision is deployed as soon as the provisioning process is complete. If you specify this property, don't specify the AutoRollbackConfiguration property.",
  ).optional(),
  DeploymentConfigName: z.string().describe(
    "A deployment configuration name or a predefined configuration name. With predefined configurations, you can deploy application revisions to one instance at a time (CodeDeployDefault.OneAtATime), half of the instances at a time (CodeDeployDefault.HalfAtATime), or all the instances at once (CodeDeployDefault.AllAtOnce).",
  ).optional(),
  AlarmConfiguration: z.object({
    Alarms: z.array(AlarmSchema).describe(
      "A list of alarms configured for the deployment or deployment group. A maximum of 10 alarms can be added.",
    ).optional(),
    IgnorePollAlarmFailure: z.boolean().describe(
      "Indicates whether a deployment should continue if information about the current state of alarms cannot be retrieved from Amazon CloudWatch. The default value is false.",
    ).optional(),
    Enabled: z.boolean().describe(
      "Indicates whether the alarm configuration is enabled.",
    ).optional(),
  }).describe(
    "Information about the Amazon CloudWatch alarms that are associated with the deployment group.",
  ).optional(),
  Ec2TagFilters: z.array(EC2TagFilterSchema).describe(
    "The Amazon EC2 tags that are already applied to Amazon EC2 instances that you want to include in the deployment group. CodeDeploy includes all Amazon EC2 instances identified by any of the tags you specify in this deployment group. Duplicates are not allowed. You can specify EC2TagFilters or Ec2TagSet, but not both.",
  ).optional(),
  TerminationHookEnabled: z.boolean().describe(
    "Indicates whether the deployment group was configured to have CodeDeploy install a termination hook into an Auto Scaling group.",
  ).optional(),
  ECSServices: z.array(ECSServiceSchema).describe(
    "The target Amazon ECS services in the deployment group. This applies only to deployment groups that use the Amazon ECS compute platform. A target Amazon ECS service is specified as an Amazon ECS cluster and service name pair using the format :.",
  ).optional(),
  AutoRollbackConfiguration: z.object({
    Events: z.array(z.string()).describe(
      "The event type or types that trigger a rollback.",
    ).optional(),
    Enabled: z.boolean().describe(
      "Indicates whether a defined automatic rollback configuration is currently enabled.",
    ).optional(),
  }).describe(
    "Information about the automatic rollback configuration that is associated with the deployment group. If you specify this property, don't specify the Deployment property.",
  ).optional(),
  LoadBalancerInfo: z.object({
    TargetGroupInfoList: z.array(TargetGroupInfoSchema).describe(
      "An array that contains information about the target groups to use for load balancing in a deployment. If you're using Application Load Balancers and Network Load Balancers, specify their associated target groups in this array.",
    ).optional(),
    ElbInfoList: z.array(ELBInfoSchema).describe(
      "An array that contains information about the load balancers to use for load balancing in a deployment. If you're using Classic Load Balancers, specify those load balancers in this array.",
    ).optional(),
    TargetGroupPairInfoList: z.array(TargetGroupPairInfoSchema).describe(
      "The target group pair information. This is an array of TargeGroupPairInfo objects with a maximum size of one.",
    ).optional(),
  }).describe("Information about the load balancer to use in a deployment.")
    .optional(),
  DeploymentGroupName: z.string().describe(
    "A name for the deployment group. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the deployment group name.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The metadata that you apply to CodeDeploy deployment groups to help you organize and categorize them. Each tag consists of a key and an optional value, both of which you define.",
  ).optional(),
  OnPremisesInstanceTagFilters: z.array(TagFilterSchema).describe(
    "The on-premises instance tags already applied to on-premises instances that you want to include in the deployment group. CodeDeploy includes all on-premises instances identified by any of the tags you specify in this deployment group. Duplicates are not allowed. You can specify OnPremisesInstanceTagFilters or OnPremisesInstanceTagSet, but not both.",
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

/** Swamp extension model for CodeDeploy DeploymentGroup. Registered at `@swamp/aws/codedeploy/deployment-group`. */
export const model = {
  type: "@swamp/aws/codedeploy/deployment-group",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CodeDeploy DeploymentGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CodeDeploy DeploymentGroup",
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
          "AWS::CodeDeploy::DeploymentGroup",
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
      description: "Get a CodeDeploy DeploymentGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeDeploy DeploymentGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CodeDeploy::DeploymentGroup",
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
      description: "Update a CodeDeploy DeploymentGroup",
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
        const idParts = [
          existing.ApplicationName?.toString(),
          existing.DeploymentGroupName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CodeDeploy::DeploymentGroup",
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
          "AWS::CodeDeploy::DeploymentGroup",
          identifier,
          currentState,
          desiredState,
          ["DeploymentGroupName", "ApplicationName"],
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
      description: "Delete a CodeDeploy DeploymentGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeDeploy DeploymentGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CodeDeploy::DeploymentGroup",
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
      description: "Sync CodeDeploy DeploymentGroup state from AWS",
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
        const idParts = [
          existing.ApplicationName?.toString(),
          existing.DeploymentGroupName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CodeDeploy::DeploymentGroup",
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
