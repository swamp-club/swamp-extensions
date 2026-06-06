// Auto-generated extension model for @swamp/aws/applicationautoscaling/scaling-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApplicationAutoScaling ScalingPolicy (AWS::ApplicationAutoScaling::ScalingPolicy).
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

const TargetTrackingMetricDimensionSchema = z.object({
  Value: z.string().describe("The value of the dimension.").optional(),
  Name: z.string().describe("The name of the dimension.").optional(),
});

const TargetTrackingMetricSchema = z.object({
  MetricName: z.string().describe("The name of the metric.").optional(),
  Dimensions: z.array(TargetTrackingMetricDimensionSchema).describe(
    "The dimensions for the metric. For the list of available dimensions, see the AWS documentation available from the table in [services that publish CloudWatch metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) in the *Amazon CloudWatch User Guide*. Conditional: If you published your metric with dimensions, you must specify the same dimensions in your scaling policy.",
  ).optional(),
  Namespace: z.string().describe(
    "The namespace of the metric. For more information, see the table in [services that publish CloudWatch metrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html) in the *Amazon CloudWatch User Guide*.",
  ).optional(),
});

const TargetTrackingMetricStatSchema = z.object({
  Stat: z.string().describe(
    "The statistic to return. It can include any CloudWatch statistic or extended statistic. For a list of valid values, see the table in [Statistics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Statistic) in the *Amazon CloudWatch User Guide*. The most commonly used metric for scaling is Average.",
  ).optional(),
  Metric: TargetTrackingMetricSchema.describe(
    "The CloudWatch metric to return, including the metric name, namespace, and dimensions. To get the exact metric name, namespace, and dimensions, inspect the [Metric](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Metric.html) object that is returned by a call to [ListMetrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_ListMetrics.html).",
  ).optional(),
  Unit: z.string().describe(
    "The unit to use for the returned data points. For a complete list of the units that CloudWatch supports, see the [MetricDatum](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_MetricDatum.html) data type in the *Amazon CloudWatch API Reference*.",
  ).optional(),
});

const TargetTrackingMetricDataQuerySchema = z.object({
  ReturnData: z.boolean().describe(
    "Indicates whether to return the timestamps and raw data values of this metric. If you use any math expressions, specify true for this value for only the final math expression that the metric specification is based on. You must specify false for ReturnData for all the other metrics and expressions used in the metric specification. If you are only retrieving metrics and not performing any math expressions, do not specify anything for ReturnData. This sets it to its default ( true).",
  ).optional(),
  Expression: z.string().describe(
    "The math expression to perform on the returned data, if this object is performing a math expression. This expression can use the Id of the other metrics to refer to those metrics, and can also use the Id of other expressions to use the result of those expressions. Conditional: Within each TargetTrackingMetricDataQuery object, you must specify either Expression or MetricStat, but not both.",
  ).optional(),
  Label: z.string().describe(
    "A human-readable label for this metric or expression. This is especially useful if this is a math expression, so that you know what the value represents.",
  ).optional(),
  MetricStat: TargetTrackingMetricStatSchema.describe(
    "Information about the metric data to return. Conditional: Within each MetricDataQuery object, you must specify either Expression or MetricStat, but not both.",
  ).optional(),
  Id: z.string().describe(
    "A short name that identifies the object's results in the response. This name must be unique among all MetricDataQuery objects specified for a single scaling policy. If you are performing math expressions on this set of data, this name represents that data and can serve as a variable in the mathematical expression. The valid characters are letters, numbers, and underscores. The first character must be a lowercase letter.",
  ).optional(),
});

const MetricDimensionSchema = z.object({
  Value: z.string().describe("The value of the dimension."),
  Name: z.string().describe("The name of the dimension."),
});

const CustomizedMetricSpecificationSchema = z.object({
  MetricName: z.string().describe(
    "The name of the metric. To get the exact metric name, namespace, and dimensions, inspect the [Metric](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Metric.html) object that's returned by a call to [ListMetrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_ListMetrics.html).",
  ).optional(),
  Metrics: z.array(TargetTrackingMetricDataQuerySchema).describe(
    "The metrics to include in the target tracking scaling policy, as a metric data query. This can include both raw metric and metric math expressions.",
  ).optional(),
  Statistic: z.string().describe("The statistic of the metric.").optional(),
  Dimensions: z.array(MetricDimensionSchema).describe(
    "The dimensions of the metric. Conditional: If you published your metric with dimensions, you must specify the same dimensions in your scaling policy.",
  ).optional(),
  Unit: z.string().describe(
    "The unit of the metric. For a complete list of the units that CloudWatch supports, see the [MetricDatum](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_MetricDatum.html) data type in the *Amazon CloudWatch API Reference*.",
  ).optional(),
  Namespace: z.string().describe("The namespace of the metric.").optional(),
});

const PredefinedMetricSpecificationSchema = z.object({
  PredefinedMetricType: z.string().describe(
    "The metric type. The ALBRequestCountPerTarget metric type applies only to Spot fleet requests and ECS services.",
  ),
  ResourceLabel: z.string().describe(
    "Identifies the resource associated with the metric type. You can't specify a resource label unless the metric type is ALBRequestCountPerTarget and there is a target group attached to the Spot Fleet or ECS service. You create the resource label by appending the final portion of the load balancer ARN and the final portion of the target group ARN into a single value, separated by a forward slash (/). The format of the resource label is: app/my-alb/778d41231b141a0f/targetgroup/my-alb-target-group/943f017f100becff. Where: app// is the final portion of the load balancer ARN targetgroup// is the final portion of the target group ARN. To find the ARN for an Application Load Balancer, use the [DescribeLoadBalancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeLoadBalancers.html) API operation. To find the ARN for the target group, use the [DescribeTargetGroups](https://docs.aws.amazon.com/elasticloadbalancing/latest/APIReference/API_DescribeTargetGroups.html) API operation.",
  ).optional(),
});

const StepAdjustmentSchema = z.object({
  MetricIntervalUpperBound: z.number().describe(
    "The upper bound for the difference between the alarm threshold and the CloudWatch metric. If the metric value is above the breach threshold, the upper bound is exclusive (the metric must be less than the threshold plus the upper bound). Otherwise, it is inclusive (the metric must be less than or equal to the threshold plus the upper bound). A null value indicates positive infinity. You must specify at least one upper or lower bound.",
  ).optional(),
  MetricIntervalLowerBound: z.number().describe(
    "The lower bound for the difference between the alarm threshold and the CloudWatch metric. If the metric value is above the breach threshold, the lower bound is inclusive (the metric must be greater than or equal to the threshold plus the lower bound). Otherwise, it is exclusive (the metric must be greater than the threshold plus the lower bound). A null value indicates negative infinity. You must specify at least one upper or lower bound.",
  ).optional(),
  ScalingAdjustment: z.number().int().describe(
    "The amount by which to scale. The adjustment is based on the value that you specified in the AdjustmentType property (either an absolute number or a percentage). A positive value adds to the current capacity and a negative number subtracts from the current capacity.",
  ),
});

const PredictiveScalingMetricDimensionSchema = z.object({
  Value: z.string().describe("The value of the dimension.").optional(),
  Name: z.string().describe("The name of the dimension.").optional(),
});

const PredictiveScalingMetricSchema = z.object({
  MetricName: z.string().describe("The name of the metric.").optional(),
  Dimensions: z.array(PredictiveScalingMetricDimensionSchema).describe(
    "Describes the dimensions of the metric.",
  ).optional(),
  Namespace: z.string().describe("The namespace of the metric.").optional(),
});

const PredictiveScalingMetricStatSchema = z.object({
  Stat: z.string().describe(
    "The statistic to return. It can include any CloudWatch statistic or extended statistic. For a list of valid values, see the table in [Statistics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Statistic) in the *Amazon CloudWatch User Guide*. The most commonly used metrics for predictive scaling are Average and Sum.",
  ).optional(),
  Metric: PredictiveScalingMetricSchema.describe(
    "The CloudWatch metric to return, including the metric name, namespace, and dimensions. To get the exact metric name, namespace, and dimensions, inspect the [Metric](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Metric.html) object that is returned by a call to [ListMetrics](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_ListMetrics.html).",
  ).optional(),
  Unit: z.string().describe(
    "The unit to use for the returned data points. For a complete list of the units that CloudWatch supports, see the [MetricDatum](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_MetricDatum.html) data type in the *Amazon CloudWatch API Reference*.",
  ).optional(),
});

const PredictiveScalingMetricDataQuerySchema = z.object({
  ReturnData: z.boolean().describe(
    "Indicates whether to return the timestamps and raw data values of this metric. If you use any math expressions, specify true for this value for only the final math expression that the metric specification is based on. You must specify false for ReturnData for all the other metrics and expressions used in the metric specification. If you are only retrieving metrics and not performing any math expressions, do not specify anything for ReturnData. This sets it to its default ( true).",
  ).optional(),
  Expression: z.string().describe(
    "The math expression to perform on the returned data, if this object is performing a math expression. This expression can use the Id of the other metrics to refer to those metrics, and can also use the Id of other expressions to use the result of those expressions. Conditional: Within each MetricDataQuery object, you must specify either Expression or MetricStat, but not both.",
  ).optional(),
  Label: z.string().describe(
    "A human-readable label for this metric or expression. This is especially useful if this is a math expression, so that you know what the value represents.",
  ).optional(),
  MetricStat: PredictiveScalingMetricStatSchema.describe(
    "Information about the metric data to return. Conditional: Within each MetricDataQuery object, you must specify either Expression or MetricStat, but not both.",
  ).optional(),
  Id: z.string().describe(
    "A short name that identifies the object's results in the response. This name must be unique among all MetricDataQuery objects specified for a single scaling policy. If you are performing math expressions on this set of data, this name represents that data and can serve as a variable in the mathematical expression. The valid characters are letters, numbers, and underscores. The first character must be a lowercase letter.",
  ).optional(),
});

const PredictiveScalingCustomizedLoadMetricSchema = z.object({
  MetricDataQueries: z.array(PredictiveScalingMetricDataQuerySchema),
});

const PredictiveScalingPredefinedLoadMetricSchema = z.object({
  PredefinedMetricType: z.string().describe("The metric type."),
  ResourceLabel: z.string().describe(
    "A label that uniquely identifies a target group.",
  ).optional(),
});

const PredictiveScalingPredefinedScalingMetricSchema = z.object({
  PredefinedMetricType: z.string().describe("The metric type."),
  ResourceLabel: z.string().describe(
    "A label that uniquely identifies a specific target group from which to determine the average request count.",
  ).optional(),
});

const PredictiveScalingCustomizedCapacityMetricSchema = z.object({
  MetricDataQueries: z.array(PredictiveScalingMetricDataQuerySchema).describe(
    "One or more metric data queries to provide data points for a metric specification.",
  ),
});

const PredictiveScalingCustomizedScalingMetricSchema = z.object({
  MetricDataQueries: z.array(PredictiveScalingMetricDataQuerySchema).describe(
    "One or more metric data queries to provide data points for a metric specification.",
  ),
});

const PredictiveScalingPredefinedMetricPairSchema = z.object({
  PredefinedMetricType: z.string().describe(
    "Indicates which metrics to use. There are two different types of metrics for each metric type: one is a load metric and one is a scaling metric.",
  ),
  ResourceLabel: z.string().describe(
    "A label that uniquely identifies a specific target group from which to determine the total and average request count.",
  ).optional(),
});

const PredictiveScalingMetricSpecificationSchema = z.object({
  CustomizedLoadMetricSpecification: PredictiveScalingCustomizedLoadMetricSchema
    .describe("The customized load metric specification.").optional(),
  PredefinedLoadMetricSpecification: PredictiveScalingPredefinedLoadMetricSchema
    .describe("The predefined load metric specification.").optional(),
  TargetValue: z.number().describe("Specifies the target utilization."),
  PredefinedScalingMetricSpecification:
    PredictiveScalingPredefinedScalingMetricSchema.describe(
      "The predefined scaling metric specification.",
    ).optional(),
  CustomizedCapacityMetricSpecification:
    PredictiveScalingCustomizedCapacityMetricSchema.describe(
      "The customized capacity metric specification.",
    ).optional(),
  CustomizedScalingMetricSpecification:
    PredictiveScalingCustomizedScalingMetricSchema.describe(
      "The customized scaling metric specification.",
    ).optional(),
  PredefinedMetricPairSpecification: PredictiveScalingPredefinedMetricPairSchema
    .describe(
      "The predefined metric pair specification that determines the appropriate scaling metric and load metric to use.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  PolicyType: z.string().describe(
    "The scaling policy type. The following policy types are supported: TargetTrackingScaling —Not supported for Amazon EMR StepScaling —Not supported for DynamoDB, Amazon Comprehend, Lambda, Amazon Keyspaces, Amazon MSK, Amazon ElastiCache, or Neptune. PredictiveScaling —Only supported for Amazon ECS",
  ),
  ResourceId: z.string().describe(
    "The identifier of the resource associated with the scaling policy. This string consists of the resource type and unique identifier. ECS service - The resource type is service and the unique identifier is the cluster name and service name. Example: service/my-cluster/my-service. Spot Fleet - The resource type is spot-fleet-request and the unique identifier is the Spot Fleet request ID. Example: spot-fleet-request/sfr-73fbd2ce-aa30-494c-8788-1cee4EXAMPLE. EMR cluster - The resource type is instancegroup and the unique identifier is the cluster ID and instance group ID. Example: instancegroup/j-2EEZNYKUA1NTV/ig-1791Y4E1L8YI0. AppStream 2.0 fleet - The resource type is fleet and the unique identifier is the fleet name. Example: fleet/sample-fleet. DynamoDB table - The resource type is table and the unique identifier is the table name. Example: table/my-table. DynamoDB global secondary index - The resource type is index and the unique identifier is the index name. Example: table/my-table/index/my-table-index. Aurora DB cluster - The resource type is cluster and the unique identifier is the cluster name. Example: cluster:my-db-cluster. SageMaker endpoint variant - The resource type is variant and the unique identifier is the resource ID. Example: endpoint/my-end-point/variant/KMeansClustering. Custom resources are not supported with a resource type. This parameter must specify the OutputValue from the CloudFormation template stack used to access the resources. The unique identifier is defined by the service provider. More information is available in our [GitHub repository](https://docs.aws.amazon.com/https://github.com/aws/aws-auto-scaling-custom-resource). Amazon Comprehend document classification endpoint - The resource type and unique identifier are specified using the endpoint ARN. Example: arn:aws:comprehend:us-west-2:123456789012:document-classifier-endpoint/EXAMPLE. Amazon Comprehend entity recognizer endpoint - The resource type and unique identifier are specified using the endpoint ARN. Example: arn:aws:comprehend:us-west-2:123456789012:entity-recognizer-endpoint/EXAMPLE. Lambda provisioned concurrency - The resource type is function and the unique identifier is the function name with a function version or alias name suffix that is not $LATEST. Example: function:my-function:prod or function:my-function:1. Amazon Keyspaces table - The resource type is table and the unique identifier is the table name. Example: keyspace/mykeyspace/table/mytable. Amazon MSK cluster - The resource type and unique identifier are specified using the cluster ARN. Example: arn:aws:kafka:us-east-1:123456789012:cluster/demo-cluster-1/6357e0b2-0e6a-4b86-a0b4-70df934c2e31-5. Amazon ElastiCache replication group - The resource type is replication-group and the unique identifier is the replication group name. Example: replication-group/mycluster. Amazon ElastiCache cache cluster - The resource type is cache-cluster and the unique identifier is the cache cluster name. Example: cache-cluster/mycluster. Neptune cluster - The resource type is cluster and the unique identifier is the cluster name. Example: cluster:mycluster. SageMaker serverless endpoint - The resource type is variant and the unique identifier is the resource ID. Example: endpoint/my-end-point/variant/KMeansClustering. SageMaker inference component - The resource type is inference-component and the unique identifier is the resource ID. Example: inference-component/my-inference-component. Pool of WorkSpaces - The resource type is workspacespool and the unique identifier is the pool ID. Example: workspacespool/wspool-123456.",
  ).optional(),
  ScalingTargetId: z.string().describe(
    "The CloudFormation-generated ID of an Application Auto Scaling scalable target. For more information about the ID, see the Return Value section of the AWS::ApplicationAutoScaling::ScalableTarget resource. You must specify either the ScalingTargetId property, or the ResourceId, ScalableDimension, and ServiceNamespace properties, but not both.",
  ).optional(),
  PolicyName: z.string().describe(
    "The name of the scaling policy. Updates to the name of a target tracking scaling policy are not supported, unless you also update the metric used for scaling. To change only a target tracking scaling policy's name, first delete the policy by removing the existing AWS::ApplicationAutoScaling::ScalingPolicy resource from the template and updating the stack. Then, recreate the resource with the same settings and a different name.",
  ),
  ServiceNamespace: z.string().describe(
    "The namespace of the AWS service that provides the resource, or a custom-resource.",
  ).optional(),
  ScalableDimension: z.string().describe(
    "The scalable dimension. This string consists of the service namespace, resource type, and scaling property. ecs:service:DesiredCount - The task count of an ECS service. elasticmapreduce:instancegroup:InstanceCount - The instance count of an EMR Instance Group. ec2:spot-fleet-request:TargetCapacity - The target capacity of a Spot Fleet. appstream:fleet:DesiredCapacity - The capacity of an AppStream 2.0 fleet. dynamodb:table:ReadCapacityUnits - The provisioned read capacity for a DynamoDB table. dynamodb:table:WriteCapacityUnits - The provisioned write capacity for a DynamoDB table. dynamodb:index:ReadCapacityUnits - The provisioned read capacity for a DynamoDB global secondary index. dynamodb:index:WriteCapacityUnits - The provisioned write capacity for a DynamoDB global secondary index. rds:cluster:ReadReplicaCount - The count of Aurora Replicas in an Aurora DB cluster. Available for Aurora MySQL-compatible edition and Aurora PostgreSQL-compatible edition. sagemaker:variant:DesiredInstanceCount - The number of EC2 instances for a SageMaker model endpoint variant. custom-resource:ResourceType:Property - The scalable dimension for a custom resource provided by your own application or service. comprehend:document-classifier-endpoint:DesiredInferenceUnits - The number of inference units for an Amazon Comprehend document classification endpoint. comprehend:entity-recognizer-endpoint:DesiredInferenceUnits - The number of inference units for an Amazon Comprehend entity recognizer endpoint. lambda:function:ProvisionedConcurrency - The provisioned concurrency for a Lambda function. cassandra:table:ReadCapacityUnits - The provisioned read capacity for an Amazon Keyspaces table. cassandra:table:WriteCapacityUnits - The provisioned write capacity for an Amazon Keyspaces table. kafka:broker-storage:VolumeSize - The provisioned volume size (in GiB) for brokers in an Amazon MSK cluster. elasticache:cache-cluster:Nodes - The number of nodes for an Amazon ElastiCache cache cluster. elasticache:replication-group:NodeGroups - The number of node groups for an Amazon ElastiCache replication group. elasticache:replication-group:Replicas - The number of replicas per node group for an Amazon ElastiCache replication group. neptune:cluster:ReadReplicaCount - The count of read replicas in an Amazon Neptune DB cluster. sagemaker:variant:DesiredProvisionedConcurrency - The provisioned concurrency for a SageMaker serverless endpoint. sagemaker:inference-component:DesiredCopyCount - The number of copies across an endpoint for a SageMaker inference component. workspaces:workspacespool:DesiredUserSessions - The number of user sessions for the WorkSpaces in the pool.",
  ).optional(),
  TargetTrackingScalingPolicyConfiguration: z.object({
    ScaleOutCooldown: z.number().int().describe(
      "The amount of time, in seconds, to wait for a previous scale-out activity to take effect. For more information and for default values, see [Define cooldown periods](https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown) in the *Application Auto Scaling User Guide*.",
    ).optional(),
    TargetValue: z.number().describe(
      "The target value for the metric. Although this property accepts numbers of type Double, it won't accept values that are either too small or too large. Values must be in the range of -2^360 to 2^360. The value must be a valid number based on the choice of metric. For example, if the metric is CPU utilization, then the target value is a percent value that represents how much of the CPU can be used before scaling out.",
    ),
    CustomizedMetricSpecification: CustomizedMetricSpecificationSchema.describe(
      "A customized metric. You can specify either a predefined metric or a customized metric.",
    ).optional(),
    DisableScaleIn: z.boolean().describe(
      "Indicates whether scale in by the target tracking scaling policy is disabled. If the value is true, scale in is disabled and the target tracking scaling policy won't remove capacity from the scalable target. Otherwise, scale in is enabled and the target tracking scaling policy can remove capacity from the scalable target. The default value is false.",
    ).optional(),
    ScaleInCooldown: z.number().int().describe(
      "The amount of time, in seconds, after a scale-in activity completes before another scale-in activity can start. For more information and for default values, see [Define cooldown periods](https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown) in the *Application Auto Scaling User Guide*.",
    ).optional(),
    PredefinedMetricSpecification: PredefinedMetricSpecificationSchema.describe(
      "A predefined metric. You can specify either a predefined metric or a customized metric.",
    ).optional(),
  }).describe("A target tracking scaling policy.").optional(),
  StepScalingPolicyConfiguration: z.object({
    MetricAggregationType: z.string().describe(
      "The aggregation type for the CloudWatch metrics. Valid values are Minimum, Maximum, and Average. If the aggregation type is null, the value is treated as Average.",
    ).optional(),
    Cooldown: z.number().int().describe(
      "The amount of time, in seconds, to wait for a previous scaling activity to take effect. If not specified, the default value is 300. For more information, see [Cooldown period](https://docs.aws.amazon.com/autoscaling/application/userguide/step-scaling-policy-overview.html#step-scaling-cooldown) in the *Application Auto Scaling User Guide*.",
    ).optional(),
    StepAdjustments: z.array(StepAdjustmentSchema).describe(
      "A set of adjustments that enable you to scale based on the size of the alarm breach. At least one step adjustment is required if you are adding a new step scaling policy configuration.",
    ).optional(),
    MinAdjustmentMagnitude: z.number().int().describe(
      "The minimum value to scale by when the adjustment type is PercentChangeInCapacity. For example, suppose that you create a step scaling policy to scale out an Amazon ECS service by 25 percent and you specify a MinAdjustmentMagnitude of 2. If the service has 4 tasks and the scaling policy is performed, 25 percent of 4 is 1. However, because you specified a MinAdjustmentMagnitude of 2, Application Auto Scaling scales out the service by 2 tasks.",
    ).optional(),
    AdjustmentType: z.string().describe(
      "Specifies whether the ScalingAdjustment value in the StepAdjustment property is an absolute number or a percentage of the current capacity.",
    ).optional(),
  }).describe("A step scaling policy.").optional(),
  PredictiveScalingPolicyConfiguration: z.object({
    MaxCapacityBreachBehavior: z.string().describe(
      "Defines the behavior that should be applied if the forecast capacity approaches or exceeds the maximum capacity. Defaults to HonorMaxCapacity if not specified.",
    ).optional(),
    MaxCapacityBuffer: z.number().int().describe(
      "The size of the capacity buffer to use when the forecast capacity is close to or exceeds the maximum capacity. The value is specified as a percentage relative to the forecast capacity. For example, if the buffer is 10, this means a 10 percent buffer, such that if the forecast capacity is 50, and the maximum capacity is 40, then the effective maximum capacity is 55. Required if the MaxCapacityBreachBehavior property is set to IncreaseMaxCapacity, and cannot be used otherwise.",
    ).optional(),
    Mode: z.string().describe(
      "The predictive scaling mode. Defaults to ForecastOnly if not specified.",
    ).optional(),
    MetricSpecifications: z.array(PredictiveScalingMetricSpecificationSchema)
      .describe(
        "This structure includes the metrics and target utilization to use for predictive scaling. This is an array, but we currently only support a single metric specification. That is, you can specify a target value and a single metric pair, or a target value and one scaling metric and one load metric.",
      ),
    SchedulingBufferTime: z.number().int().describe(
      "The amount of time, in seconds, that the start time can be advanced. The value must be less than the forecast interval duration of 3600 seconds (60 minutes). Defaults to 300 seconds if not specified.",
    ).optional(),
  }).describe("The predictive scaling policy configuration.").optional(),
});

const StateSchema = z.object({
  PolicyType: z.string().optional(),
  ResourceId: z.string().optional(),
  ScalingTargetId: z.string().optional(),
  PolicyName: z.string().optional(),
  ServiceNamespace: z.string().optional(),
  ScalableDimension: z.string(),
  TargetTrackingScalingPolicyConfiguration: z.object({
    ScaleOutCooldown: z.number(),
    TargetValue: z.number(),
    CustomizedMetricSpecification: CustomizedMetricSpecificationSchema,
    DisableScaleIn: z.boolean(),
    ScaleInCooldown: z.number(),
    PredefinedMetricSpecification: PredefinedMetricSpecificationSchema,
  }).optional(),
  Arn: z.string(),
  StepScalingPolicyConfiguration: z.object({
    MetricAggregationType: z.string(),
    Cooldown: z.number(),
    StepAdjustments: z.array(StepAdjustmentSchema),
    MinAdjustmentMagnitude: z.number(),
    AdjustmentType: z.string(),
  }).optional(),
  PredictiveScalingPolicyConfiguration: z.object({
    MaxCapacityBreachBehavior: z.string(),
    MaxCapacityBuffer: z.number(),
    Mode: z.string(),
    MetricSpecifications: z.array(PredictiveScalingMetricSpecificationSchema),
    SchedulingBufferTime: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  PolicyType: z.string().describe(
    "The scaling policy type. The following policy types are supported: TargetTrackingScaling —Not supported for Amazon EMR StepScaling —Not supported for DynamoDB, Amazon Comprehend, Lambda, Amazon Keyspaces, Amazon MSK, Amazon ElastiCache, or Neptune. PredictiveScaling —Only supported for Amazon ECS",
  ).optional(),
  ResourceId: z.string().describe(
    "The identifier of the resource associated with the scaling policy. This string consists of the resource type and unique identifier. ECS service - The resource type is service and the unique identifier is the cluster name and service name. Example: service/my-cluster/my-service. Spot Fleet - The resource type is spot-fleet-request and the unique identifier is the Spot Fleet request ID. Example: spot-fleet-request/sfr-73fbd2ce-aa30-494c-8788-1cee4EXAMPLE. EMR cluster - The resource type is instancegroup and the unique identifier is the cluster ID and instance group ID. Example: instancegroup/j-2EEZNYKUA1NTV/ig-1791Y4E1L8YI0. AppStream 2.0 fleet - The resource type is fleet and the unique identifier is the fleet name. Example: fleet/sample-fleet. DynamoDB table - The resource type is table and the unique identifier is the table name. Example: table/my-table. DynamoDB global secondary index - The resource type is index and the unique identifier is the index name. Example: table/my-table/index/my-table-index. Aurora DB cluster - The resource type is cluster and the unique identifier is the cluster name. Example: cluster:my-db-cluster. SageMaker endpoint variant - The resource type is variant and the unique identifier is the resource ID. Example: endpoint/my-end-point/variant/KMeansClustering. Custom resources are not supported with a resource type. This parameter must specify the OutputValue from the CloudFormation template stack used to access the resources. The unique identifier is defined by the service provider. More information is available in our [GitHub repository](https://docs.aws.amazon.com/https://github.com/aws/aws-auto-scaling-custom-resource). Amazon Comprehend document classification endpoint - The resource type and unique identifier are specified using the endpoint ARN. Example: arn:aws:comprehend:us-west-2:123456789012:document-classifier-endpoint/EXAMPLE. Amazon Comprehend entity recognizer endpoint - The resource type and unique identifier are specified using the endpoint ARN. Example: arn:aws:comprehend:us-west-2:123456789012:entity-recognizer-endpoint/EXAMPLE. Lambda provisioned concurrency - The resource type is function and the unique identifier is the function name with a function version or alias name suffix that is not $LATEST. Example: function:my-function:prod or function:my-function:1. Amazon Keyspaces table - The resource type is table and the unique identifier is the table name. Example: keyspace/mykeyspace/table/mytable. Amazon MSK cluster - The resource type and unique identifier are specified using the cluster ARN. Example: arn:aws:kafka:us-east-1:123456789012:cluster/demo-cluster-1/6357e0b2-0e6a-4b86-a0b4-70df934c2e31-5. Amazon ElastiCache replication group - The resource type is replication-group and the unique identifier is the replication group name. Example: replication-group/mycluster. Amazon ElastiCache cache cluster - The resource type is cache-cluster and the unique identifier is the cache cluster name. Example: cache-cluster/mycluster. Neptune cluster - The resource type is cluster and the unique identifier is the cluster name. Example: cluster:mycluster. SageMaker serverless endpoint - The resource type is variant and the unique identifier is the resource ID. Example: endpoint/my-end-point/variant/KMeansClustering. SageMaker inference component - The resource type is inference-component and the unique identifier is the resource ID. Example: inference-component/my-inference-component. Pool of WorkSpaces - The resource type is workspacespool and the unique identifier is the pool ID. Example: workspacespool/wspool-123456.",
  ).optional(),
  ScalingTargetId: z.string().describe(
    "The CloudFormation-generated ID of an Application Auto Scaling scalable target. For more information about the ID, see the Return Value section of the AWS::ApplicationAutoScaling::ScalableTarget resource. You must specify either the ScalingTargetId property, or the ResourceId, ScalableDimension, and ServiceNamespace properties, but not both.",
  ).optional(),
  PolicyName: z.string().describe(
    "The name of the scaling policy. Updates to the name of a target tracking scaling policy are not supported, unless you also update the metric used for scaling. To change only a target tracking scaling policy's name, first delete the policy by removing the existing AWS::ApplicationAutoScaling::ScalingPolicy resource from the template and updating the stack. Then, recreate the resource with the same settings and a different name.",
  ).optional(),
  ServiceNamespace: z.string().describe(
    "The namespace of the AWS service that provides the resource, or a custom-resource.",
  ).optional(),
  ScalableDimension: z.string().describe(
    "The scalable dimension. This string consists of the service namespace, resource type, and scaling property. ecs:service:DesiredCount - The task count of an ECS service. elasticmapreduce:instancegroup:InstanceCount - The instance count of an EMR Instance Group. ec2:spot-fleet-request:TargetCapacity - The target capacity of a Spot Fleet. appstream:fleet:DesiredCapacity - The capacity of an AppStream 2.0 fleet. dynamodb:table:ReadCapacityUnits - The provisioned read capacity for a DynamoDB table. dynamodb:table:WriteCapacityUnits - The provisioned write capacity for a DynamoDB table. dynamodb:index:ReadCapacityUnits - The provisioned read capacity for a DynamoDB global secondary index. dynamodb:index:WriteCapacityUnits - The provisioned write capacity for a DynamoDB global secondary index. rds:cluster:ReadReplicaCount - The count of Aurora Replicas in an Aurora DB cluster. Available for Aurora MySQL-compatible edition and Aurora PostgreSQL-compatible edition. sagemaker:variant:DesiredInstanceCount - The number of EC2 instances for a SageMaker model endpoint variant. custom-resource:ResourceType:Property - The scalable dimension for a custom resource provided by your own application or service. comprehend:document-classifier-endpoint:DesiredInferenceUnits - The number of inference units for an Amazon Comprehend document classification endpoint. comprehend:entity-recognizer-endpoint:DesiredInferenceUnits - The number of inference units for an Amazon Comprehend entity recognizer endpoint. lambda:function:ProvisionedConcurrency - The provisioned concurrency for a Lambda function. cassandra:table:ReadCapacityUnits - The provisioned read capacity for an Amazon Keyspaces table. cassandra:table:WriteCapacityUnits - The provisioned write capacity for an Amazon Keyspaces table. kafka:broker-storage:VolumeSize - The provisioned volume size (in GiB) for brokers in an Amazon MSK cluster. elasticache:cache-cluster:Nodes - The number of nodes for an Amazon ElastiCache cache cluster. elasticache:replication-group:NodeGroups - The number of node groups for an Amazon ElastiCache replication group. elasticache:replication-group:Replicas - The number of replicas per node group for an Amazon ElastiCache replication group. neptune:cluster:ReadReplicaCount - The count of read replicas in an Amazon Neptune DB cluster. sagemaker:variant:DesiredProvisionedConcurrency - The provisioned concurrency for a SageMaker serverless endpoint. sagemaker:inference-component:DesiredCopyCount - The number of copies across an endpoint for a SageMaker inference component. workspaces:workspacespool:DesiredUserSessions - The number of user sessions for the WorkSpaces in the pool.",
  ).optional(),
  TargetTrackingScalingPolicyConfiguration: z.object({
    ScaleOutCooldown: z.number().int().describe(
      "The amount of time, in seconds, to wait for a previous scale-out activity to take effect. For more information and for default values, see [Define cooldown periods](https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown) in the *Application Auto Scaling User Guide*.",
    ).optional(),
    TargetValue: z.number().describe(
      "The target value for the metric. Although this property accepts numbers of type Double, it won't accept values that are either too small or too large. Values must be in the range of -2^360 to 2^360. The value must be a valid number based on the choice of metric. For example, if the metric is CPU utilization, then the target value is a percent value that represents how much of the CPU can be used before scaling out.",
    ).optional(),
    CustomizedMetricSpecification: CustomizedMetricSpecificationSchema.describe(
      "A customized metric. You can specify either a predefined metric or a customized metric.",
    ).optional(),
    DisableScaleIn: z.boolean().describe(
      "Indicates whether scale in by the target tracking scaling policy is disabled. If the value is true, scale in is disabled and the target tracking scaling policy won't remove capacity from the scalable target. Otherwise, scale in is enabled and the target tracking scaling policy can remove capacity from the scalable target. The default value is false.",
    ).optional(),
    ScaleInCooldown: z.number().int().describe(
      "The amount of time, in seconds, after a scale-in activity completes before another scale-in activity can start. For more information and for default values, see [Define cooldown periods](https://docs.aws.amazon.com/autoscaling/application/userguide/target-tracking-scaling-policy-overview.html#target-tracking-cooldown) in the *Application Auto Scaling User Guide*.",
    ).optional(),
    PredefinedMetricSpecification: PredefinedMetricSpecificationSchema.describe(
      "A predefined metric. You can specify either a predefined metric or a customized metric.",
    ).optional(),
  }).describe("A target tracking scaling policy.").optional(),
  StepScalingPolicyConfiguration: z.object({
    MetricAggregationType: z.string().describe(
      "The aggregation type for the CloudWatch metrics. Valid values are Minimum, Maximum, and Average. If the aggregation type is null, the value is treated as Average.",
    ).optional(),
    Cooldown: z.number().int().describe(
      "The amount of time, in seconds, to wait for a previous scaling activity to take effect. If not specified, the default value is 300. For more information, see [Cooldown period](https://docs.aws.amazon.com/autoscaling/application/userguide/step-scaling-policy-overview.html#step-scaling-cooldown) in the *Application Auto Scaling User Guide*.",
    ).optional(),
    StepAdjustments: z.array(StepAdjustmentSchema).describe(
      "A set of adjustments that enable you to scale based on the size of the alarm breach. At least one step adjustment is required if you are adding a new step scaling policy configuration.",
    ).optional(),
    MinAdjustmentMagnitude: z.number().int().describe(
      "The minimum value to scale by when the adjustment type is PercentChangeInCapacity. For example, suppose that you create a step scaling policy to scale out an Amazon ECS service by 25 percent and you specify a MinAdjustmentMagnitude of 2. If the service has 4 tasks and the scaling policy is performed, 25 percent of 4 is 1. However, because you specified a MinAdjustmentMagnitude of 2, Application Auto Scaling scales out the service by 2 tasks.",
    ).optional(),
    AdjustmentType: z.string().describe(
      "Specifies whether the ScalingAdjustment value in the StepAdjustment property is an absolute number or a percentage of the current capacity.",
    ).optional(),
  }).describe("A step scaling policy.").optional(),
  PredictiveScalingPolicyConfiguration: z.object({
    MaxCapacityBreachBehavior: z.string().describe(
      "Defines the behavior that should be applied if the forecast capacity approaches or exceeds the maximum capacity. Defaults to HonorMaxCapacity if not specified.",
    ).optional(),
    MaxCapacityBuffer: z.number().int().describe(
      "The size of the capacity buffer to use when the forecast capacity is close to or exceeds the maximum capacity. The value is specified as a percentage relative to the forecast capacity. For example, if the buffer is 10, this means a 10 percent buffer, such that if the forecast capacity is 50, and the maximum capacity is 40, then the effective maximum capacity is 55. Required if the MaxCapacityBreachBehavior property is set to IncreaseMaxCapacity, and cannot be used otherwise.",
    ).optional(),
    Mode: z.string().describe(
      "The predictive scaling mode. Defaults to ForecastOnly if not specified.",
    ).optional(),
    MetricSpecifications: z.array(PredictiveScalingMetricSpecificationSchema)
      .describe(
        "This structure includes the metrics and target utilization to use for predictive scaling. This is an array, but we currently only support a single metric specification. That is, you can specify a target value and a single metric pair, or a target value and one scaling metric and one load metric.",
      ).optional(),
    SchedulingBufferTime: z.number().int().describe(
      "The amount of time, in seconds, that the start time can be advanced. The value must be less than the forecast interval duration of 3600 seconds (60 minutes). Defaults to 300 seconds if not specified.",
    ).optional(),
  }).describe("The predictive scaling policy configuration.").optional(),
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

/** Swamp extension model for ApplicationAutoScaling ScalingPolicy. Registered at `@swamp/aws/applicationautoscaling/scaling-policy`. */
export const model = {
  type: "@swamp/aws/applicationautoscaling/scaling-policy",
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
      description: "ApplicationAutoScaling ScalingPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApplicationAutoScaling ScalingPolicy",
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
          "AWS::ApplicationAutoScaling::ScalingPolicy",
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
      description: "Get a ApplicationAutoScaling ScalingPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApplicationAutoScaling ScalingPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ApplicationAutoScaling::ScalingPolicy",
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
      description: "Update a ApplicationAutoScaling ScalingPolicy",
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
          existing.Arn?.toString(),
          existing.ScalableDimension?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::ApplicationAutoScaling::ScalingPolicy",
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
          "AWS::ApplicationAutoScaling::ScalingPolicy",
          identifier,
          currentState,
          desiredState,
          [
            "PolicyName",
            "ServiceNamespace",
            "ResourceId",
            "ScalableDimension",
            "ScalingTargetId",
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
      description: "Delete a ApplicationAutoScaling ScalingPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApplicationAutoScaling ScalingPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ApplicationAutoScaling::ScalingPolicy",
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
      description: "Sync ApplicationAutoScaling ScalingPolicy state from AWS",
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
          existing.Arn?.toString(),
          existing.ScalableDimension?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ApplicationAutoScaling::ScalingPolicy",
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
