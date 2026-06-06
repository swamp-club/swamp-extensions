// Auto-generated extension model for @swamp/aws/applicationautoscaling/scalable-target
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApplicationAutoScaling ScalableTarget (AWS::ApplicationAutoScaling::ScalableTarget).
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

const ScalableTargetActionSchema = z.object({
  MinCapacity: z.number().int().describe("The minimum capacity.").optional(),
  MaxCapacity: z.number().int().describe("The maximum capacity.").optional(),
});

const ScheduledActionSchema = z.object({
  Timezone: z.string().describe(
    "The time zone used when referring to the date and time of a scheduled action, when the scheduled action uses an at or cron expression.",
  ).optional(),
  ScheduledActionName: z.string().describe(
    "The name of the scheduled action. This name must be unique among all other scheduled actions on the specified scalable target.",
  ),
  EndTime: z.string().describe(
    "The date and time that the action is scheduled to end, in UTC.",
  ).optional(),
  Schedule: z.string().describe(
    'The schedule for this action. The following formats are supported: At expressions - " at(yyyy-mm-ddThh:mm:ss) " Rate expressions - " rate(valueunit) " Cron expressions - " cron(fields) " At expressions are useful for one-time schedules. Cron expressions are useful for scheduled actions that run periodically at a specified date and time, and rate expressions are useful for scheduled actions that run at a regular interval. At and cron expressions use Universal Coordinated Time (UTC) by default. The cron format consists of six fields separated by white spaces: [Minutes] [Hours] [Day_of_Month] [Month] [Day_of_Week] [Year]. For rate expressions, *value* is a positive integer and *unit* is minute | minutes | hour | hours | day | days.',
  ),
  StartTime: z.string().describe(
    "The date and time that the action is scheduled to begin, in UTC.",
  ).optional(),
  ScalableTargetAction: ScalableTargetActionSchema.describe(
    "The new minimum and maximum capacity. You can set both values or just one. At the scheduled time, if the current capacity is below the minimum capacity, Application Auto Scaling scales out to the minimum capacity. If the current capacity is above the maximum capacity, Application Auto Scaling scales in to the maximum capacity.",
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
  ScheduledActions: z.array(ScheduledActionSchema).describe(
    "The scheduled actions for the scalable target. Duplicates aren't allowed.",
  ).optional(),
  ResourceId: z.string().describe(
    "The identifier of the resource associated with the scalable target. This string consists of the resource type and unique identifier. ECS service - The resource type is service and the unique identifier is the cluster name and service name. Example: service/my-cluster/my-service. Spot Fleet - The resource type is spot-fleet-request and the unique identifier is the Spot Fleet request ID. Example: spot-fleet-request/sfr-73fbd2ce-aa30-494c-8788-1cee4EXAMPLE. EMR cluster - The resource type is instancegroup and the unique identifier is the cluster ID and instance group ID. Example: instancegroup/j-2EEZNYKUA1NTV/ig-1791Y4E1L8YI0. AppStream 2.0 fleet - The resource type is fleet and the unique identifier is the fleet name. Example: fleet/sample-fleet. DynamoDB table - The resource type is table and the unique identifier is the table name. Example: table/my-table. DynamoDB global secondary index - The resource type is index and the unique identifier is the index name. Example: table/my-table/index/my-table-index. Aurora DB cluster - The resource type is cluster and the unique identifier is the cluster name. Example: cluster:my-db-cluster. SageMaker endpoint variant - The resource type is variant and the unique identifier is the resource ID. Example: endpoint/my-end-point/variant/KMeansClustering. Custom resources are not supported with a resource type. This parameter must specify the OutputValue from the CloudFormation template stack used to access the resources. The unique identifier is defined by the service provider. More information is available in our [GitHub repository](https://docs.aws.amazon.com/https://github.com/aws/aws-auto-scaling-custom-resource). Amazon Comprehend document classification endpoint - The resource type and unique identifier are specified using the endpoint ARN. Example: arn:aws:comprehend:us-west-2:123456789012:document-classifier-endpoint/EXAMPLE. Amazon Comprehend entity recognizer endpoint - The resource type and unique identifier are specified using the endpoint ARN. Example: arn:aws:comprehend:us-west-2:123456789012:entity-recognizer-endpoint/EXAMPLE. Lambda provisioned concurrency - The resource type is function and the unique identifier is the function name with a function version or alias name suffix that is not $LATEST. Example: function:my-function:prod or function:my-function:1. Amazon Keyspaces table - The resource type is table and the unique identifier is the table name. Example: keyspace/mykeyspace/table/mytable. Amazon MSK cluster - The resource type and unique identifier are specified using the cluster ARN. Example: arn:aws:kafka:us-east-1:123456789012:cluster/demo-cluster-1/6357e0b2-0e6a-4b86-a0b4-70df934c2e31-5. Amazon ElastiCache replication group - The resource type is replication-group and the unique identifier is the replication group name. Example: replication-group/mycluster. Amazon ElastiCache cache cluster - The resource type is cache-cluster and the unique identifier is the cache cluster name. Example: cache-cluster/mycluster. Neptune cluster - The resource type is cluster and the unique identifier is the cluster name. Example: cluster:mycluster. SageMaker serverless endpoint - The resource type is variant and the unique identifier is the resource ID. Example: endpoint/my-end-point/variant/KMeansClustering. SageMaker inference component - The resource type is inference-component and the unique identifier is the resource ID. Example: inference-component/my-inference-component. Pool of WorkSpaces - The resource type is workspacespool and the unique identifier is the pool ID. Example: workspacespool/wspool-123456.",
  ),
  ServiceNamespace: z.string().describe(
    "The namespace of the AWS service that provides the resource, or a custom-resource.",
  ),
  ScalableDimension: z.string().describe(
    "The scalable dimension associated with the scalable target. This string consists of the service namespace, resource type, and scaling property. ecs:service:DesiredCount - The task count of an ECS service. elasticmapreduce:instancegroup:InstanceCount - The instance count of an EMR Instance Group. ec2:spot-fleet-request:TargetCapacity - The target capacity of a Spot Fleet. appstream:fleet:DesiredCapacity - The capacity of an AppStream 2.0 fleet. dynamodb:table:ReadCapacityUnits - The provisioned read capacity for a DynamoDB table. dynamodb:table:WriteCapacityUnits - The provisioned write capacity for a DynamoDB table. dynamodb:index:ReadCapacityUnits - The provisioned read capacity for a DynamoDB global secondary index. dynamodb:index:WriteCapacityUnits - The provisioned write capacity for a DynamoDB global secondary index. rds:cluster:ReadReplicaCount - The count of Aurora Replicas in an Aurora DB cluster. Available for Aurora MySQL-compatible edition and Aurora PostgreSQL-compatible edition. sagemaker:variant:DesiredInstanceCount - The number of EC2 instances for a SageMaker model endpoint variant. custom-resource:ResourceType:Property - The scalable dimension for a custom resource provided by your own application or service. comprehend:document-classifier-endpoint:DesiredInferenceUnits - The number of inference units for an Amazon Comprehend document classification endpoint. comprehend:entity-recognizer-endpoint:DesiredInferenceUnits - The number of inference units for an Amazon Comprehend entity recognizer endpoint. lambda:function:ProvisionedConcurrency - The provisioned concurrency for a Lambda function. cassandra:table:ReadCapacityUnits - The provisioned read capacity for an Amazon Keyspaces table. cassandra:table:WriteCapacityUnits - The provisioned write capacity for an Amazon Keyspaces table. kafka:broker-storage:VolumeSize - The provisioned volume size (in GiB) for brokers in an Amazon MSK cluster. elasticache:cache-cluster:Nodes - The number of nodes for an Amazon ElastiCache cache cluster. elasticache:replication-group:NodeGroups - The number of node groups for an Amazon ElastiCache replication group. elasticache:replication-group:Replicas - The number of replicas per node group for an Amazon ElastiCache replication group. neptune:cluster:ReadReplicaCount - The count of read replicas in an Amazon Neptune DB cluster. sagemaker:variant:DesiredProvisionedConcurrency - The provisioned concurrency for a SageMaker serverless endpoint. sagemaker:inference-component:DesiredCopyCount - The number of copies across an endpoint for a SageMaker inference component. workspaces:workspacespool:DesiredUserSessions - The number of user sessions for the WorkSpaces in the pool.",
  ),
  SuspendedState: z.object({
    DynamicScalingOutSuspended: z.boolean().describe(
      "Whether scale out by a target tracking scaling policy or a step scaling policy is suspended. Set the value to true if you don't want Application Auto Scaling to add capacity when a scaling policy is triggered. The default is false.",
    ).optional(),
    ScheduledScalingSuspended: z.boolean().describe(
      "Whether scheduled scaling is suspended. Set the value to true if you don't want Application Auto Scaling to add or remove capacity by initiating scheduled actions. The default is false.",
    ).optional(),
    DynamicScalingInSuspended: z.boolean().describe(
      "Whether scale in by a target tracking scaling policy or a step scaling policy is suspended. Set the value to true if you don't want Application Auto Scaling to remove capacity when a scaling policy is triggered. The default is false.",
    ).optional(),
  }).describe(
    "An embedded object that contains attributes and attribute values that are used to suspend and resume automatic scaling. Setting the value of an attribute to true suspends the specified scaling activities. Setting it to false (default) resumes the specified scaling activities. *Suspension Outcomes* For DynamicScalingInSuspended, while a suspension is in effect, all scale-in activities that are triggered by a scaling policy are suspended. For DynamicScalingOutSuspended, while a suspension is in effect, all scale-out activities that are triggered by a scaling policy are suspended. For ScheduledScalingSuspended, while a suspension is in effect, all scaling activities that involve scheduled actions are suspended.",
  ).optional(),
  MinCapacity: z.number().int().describe(
    "The minimum value that you plan to scale in to. When a scaling policy is in effect, Application Auto Scaling can scale in (contract) as needed to the minimum capacity limit in response to changing demand.",
  ),
  RoleARN: z.string().describe(
    "Specify the Amazon Resource Name (ARN) of an Identity and Access Management (IAM) role that allows Application Auto Scaling to modify the scalable target on your behalf. This can be either an IAM service role that Application Auto Scaling can assume to make calls to other AWS resources on your behalf, or a service-linked role for the specified service. For more information, see [How Application Auto Scaling works with IAM](https://docs.aws.amazon.com/autoscaling/application/userguide/security_iam_service-with-iam.html) in the *Application Auto Scaling User Guide*. To automatically create a service-linked role (recommended), specify the full ARN of the service-linked role in your stack template. To find the exact ARN of the service-linked role for your AWS or custom resource, see the [Service-linked roles](https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-service-linked-roles.html) topic in the *Application Auto Scaling User Guide*. Look for the ARN in the table at the bottom of the page.",
  ).optional(),
  MaxCapacity: z.number().int().describe(
    "The maximum value that you plan to scale out to. When a scaling policy is in effect, Application Auto Scaling can scale out (expand) as needed to the maximum capacity limit in response to changing demand.",
  ),
});

const StateSchema = z.object({
  ScheduledActions: z.array(ScheduledActionSchema).optional(),
  ResourceId: z.string(),
  ServiceNamespace: z.string(),
  ScalableDimension: z.string(),
  SuspendedState: z.object({
    DynamicScalingOutSuspended: z.boolean(),
    ScheduledScalingSuspended: z.boolean(),
    DynamicScalingInSuspended: z.boolean(),
  }).optional(),
  Id: z.string().optional(),
  MinCapacity: z.number().optional(),
  RoleARN: z.string().optional(),
  MaxCapacity: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ScheduledActions: z.array(ScheduledActionSchema).describe(
    "The scheduled actions for the scalable target. Duplicates aren't allowed.",
  ).optional(),
  ResourceId: z.string().describe(
    "The identifier of the resource associated with the scalable target. This string consists of the resource type and unique identifier. ECS service - The resource type is service and the unique identifier is the cluster name and service name. Example: service/my-cluster/my-service. Spot Fleet - The resource type is spot-fleet-request and the unique identifier is the Spot Fleet request ID. Example: spot-fleet-request/sfr-73fbd2ce-aa30-494c-8788-1cee4EXAMPLE. EMR cluster - The resource type is instancegroup and the unique identifier is the cluster ID and instance group ID. Example: instancegroup/j-2EEZNYKUA1NTV/ig-1791Y4E1L8YI0. AppStream 2.0 fleet - The resource type is fleet and the unique identifier is the fleet name. Example: fleet/sample-fleet. DynamoDB table - The resource type is table and the unique identifier is the table name. Example: table/my-table. DynamoDB global secondary index - The resource type is index and the unique identifier is the index name. Example: table/my-table/index/my-table-index. Aurora DB cluster - The resource type is cluster and the unique identifier is the cluster name. Example: cluster:my-db-cluster. SageMaker endpoint variant - The resource type is variant and the unique identifier is the resource ID. Example: endpoint/my-end-point/variant/KMeansClustering. Custom resources are not supported with a resource type. This parameter must specify the OutputValue from the CloudFormation template stack used to access the resources. The unique identifier is defined by the service provider. More information is available in our [GitHub repository](https://docs.aws.amazon.com/https://github.com/aws/aws-auto-scaling-custom-resource). Amazon Comprehend document classification endpoint - The resource type and unique identifier are specified using the endpoint ARN. Example: arn:aws:comprehend:us-west-2:123456789012:document-classifier-endpoint/EXAMPLE. Amazon Comprehend entity recognizer endpoint - The resource type and unique identifier are specified using the endpoint ARN. Example: arn:aws:comprehend:us-west-2:123456789012:entity-recognizer-endpoint/EXAMPLE. Lambda provisioned concurrency - The resource type is function and the unique identifier is the function name with a function version or alias name suffix that is not $LATEST. Example: function:my-function:prod or function:my-function:1. Amazon Keyspaces table - The resource type is table and the unique identifier is the table name. Example: keyspace/mykeyspace/table/mytable. Amazon MSK cluster - The resource type and unique identifier are specified using the cluster ARN. Example: arn:aws:kafka:us-east-1:123456789012:cluster/demo-cluster-1/6357e0b2-0e6a-4b86-a0b4-70df934c2e31-5. Amazon ElastiCache replication group - The resource type is replication-group and the unique identifier is the replication group name. Example: replication-group/mycluster. Amazon ElastiCache cache cluster - The resource type is cache-cluster and the unique identifier is the cache cluster name. Example: cache-cluster/mycluster. Neptune cluster - The resource type is cluster and the unique identifier is the cluster name. Example: cluster:mycluster. SageMaker serverless endpoint - The resource type is variant and the unique identifier is the resource ID. Example: endpoint/my-end-point/variant/KMeansClustering. SageMaker inference component - The resource type is inference-component and the unique identifier is the resource ID. Example: inference-component/my-inference-component. Pool of WorkSpaces - The resource type is workspacespool and the unique identifier is the pool ID. Example: workspacespool/wspool-123456.",
  ).optional(),
  ServiceNamespace: z.string().describe(
    "The namespace of the AWS service that provides the resource, or a custom-resource.",
  ).optional(),
  ScalableDimension: z.string().describe(
    "The scalable dimension associated with the scalable target. This string consists of the service namespace, resource type, and scaling property. ecs:service:DesiredCount - The task count of an ECS service. elasticmapreduce:instancegroup:InstanceCount - The instance count of an EMR Instance Group. ec2:spot-fleet-request:TargetCapacity - The target capacity of a Spot Fleet. appstream:fleet:DesiredCapacity - The capacity of an AppStream 2.0 fleet. dynamodb:table:ReadCapacityUnits - The provisioned read capacity for a DynamoDB table. dynamodb:table:WriteCapacityUnits - The provisioned write capacity for a DynamoDB table. dynamodb:index:ReadCapacityUnits - The provisioned read capacity for a DynamoDB global secondary index. dynamodb:index:WriteCapacityUnits - The provisioned write capacity for a DynamoDB global secondary index. rds:cluster:ReadReplicaCount - The count of Aurora Replicas in an Aurora DB cluster. Available for Aurora MySQL-compatible edition and Aurora PostgreSQL-compatible edition. sagemaker:variant:DesiredInstanceCount - The number of EC2 instances for a SageMaker model endpoint variant. custom-resource:ResourceType:Property - The scalable dimension for a custom resource provided by your own application or service. comprehend:document-classifier-endpoint:DesiredInferenceUnits - The number of inference units for an Amazon Comprehend document classification endpoint. comprehend:entity-recognizer-endpoint:DesiredInferenceUnits - The number of inference units for an Amazon Comprehend entity recognizer endpoint. lambda:function:ProvisionedConcurrency - The provisioned concurrency for a Lambda function. cassandra:table:ReadCapacityUnits - The provisioned read capacity for an Amazon Keyspaces table. cassandra:table:WriteCapacityUnits - The provisioned write capacity for an Amazon Keyspaces table. kafka:broker-storage:VolumeSize - The provisioned volume size (in GiB) for brokers in an Amazon MSK cluster. elasticache:cache-cluster:Nodes - The number of nodes for an Amazon ElastiCache cache cluster. elasticache:replication-group:NodeGroups - The number of node groups for an Amazon ElastiCache replication group. elasticache:replication-group:Replicas - The number of replicas per node group for an Amazon ElastiCache replication group. neptune:cluster:ReadReplicaCount - The count of read replicas in an Amazon Neptune DB cluster. sagemaker:variant:DesiredProvisionedConcurrency - The provisioned concurrency for a SageMaker serverless endpoint. sagemaker:inference-component:DesiredCopyCount - The number of copies across an endpoint for a SageMaker inference component. workspaces:workspacespool:DesiredUserSessions - The number of user sessions for the WorkSpaces in the pool.",
  ).optional(),
  SuspendedState: z.object({
    DynamicScalingOutSuspended: z.boolean().describe(
      "Whether scale out by a target tracking scaling policy or a step scaling policy is suspended. Set the value to true if you don't want Application Auto Scaling to add capacity when a scaling policy is triggered. The default is false.",
    ).optional(),
    ScheduledScalingSuspended: z.boolean().describe(
      "Whether scheduled scaling is suspended. Set the value to true if you don't want Application Auto Scaling to add or remove capacity by initiating scheduled actions. The default is false.",
    ).optional(),
    DynamicScalingInSuspended: z.boolean().describe(
      "Whether scale in by a target tracking scaling policy or a step scaling policy is suspended. Set the value to true if you don't want Application Auto Scaling to remove capacity when a scaling policy is triggered. The default is false.",
    ).optional(),
  }).describe(
    "An embedded object that contains attributes and attribute values that are used to suspend and resume automatic scaling. Setting the value of an attribute to true suspends the specified scaling activities. Setting it to false (default) resumes the specified scaling activities. *Suspension Outcomes* For DynamicScalingInSuspended, while a suspension is in effect, all scale-in activities that are triggered by a scaling policy are suspended. For DynamicScalingOutSuspended, while a suspension is in effect, all scale-out activities that are triggered by a scaling policy are suspended. For ScheduledScalingSuspended, while a suspension is in effect, all scaling activities that involve scheduled actions are suspended.",
  ).optional(),
  MinCapacity: z.number().int().describe(
    "The minimum value that you plan to scale in to. When a scaling policy is in effect, Application Auto Scaling can scale in (contract) as needed to the minimum capacity limit in response to changing demand.",
  ).optional(),
  RoleARN: z.string().describe(
    "Specify the Amazon Resource Name (ARN) of an Identity and Access Management (IAM) role that allows Application Auto Scaling to modify the scalable target on your behalf. This can be either an IAM service role that Application Auto Scaling can assume to make calls to other AWS resources on your behalf, or a service-linked role for the specified service. For more information, see [How Application Auto Scaling works with IAM](https://docs.aws.amazon.com/autoscaling/application/userguide/security_iam_service-with-iam.html) in the *Application Auto Scaling User Guide*. To automatically create a service-linked role (recommended), specify the full ARN of the service-linked role in your stack template. To find the exact ARN of the service-linked role for your AWS or custom resource, see the [Service-linked roles](https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-service-linked-roles.html) topic in the *Application Auto Scaling User Guide*. Look for the ARN in the table at the bottom of the page.",
  ).optional(),
  MaxCapacity: z.number().int().describe(
    "The maximum value that you plan to scale out to. When a scaling policy is in effect, Application Auto Scaling can scale out (expand) as needed to the maximum capacity limit in response to changing demand.",
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

/** Swamp extension model for ApplicationAutoScaling ScalableTarget. Registered at `@swamp/aws/applicationautoscaling/scalable-target`. */
export const model = {
  type: "@swamp/aws/applicationautoscaling/scalable-target",
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
      description: "ApplicationAutoScaling ScalableTarget resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApplicationAutoScaling ScalableTarget",
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
          "AWS::ApplicationAutoScaling::ScalableTarget",
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
      description: "Get a ApplicationAutoScaling ScalableTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApplicationAutoScaling ScalableTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ApplicationAutoScaling::ScalableTarget",
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
      description: "Update a ApplicationAutoScaling ScalableTarget",
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
          existing.ResourceId?.toString(),
          existing.ScalableDimension?.toString(),
          existing.ServiceNamespace?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::ApplicationAutoScaling::ScalableTarget",
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
          "AWS::ApplicationAutoScaling::ScalableTarget",
          identifier,
          currentState,
          desiredState,
          ["ResourceId", "ScalableDimension", "ServiceNamespace"],
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
      description: "Delete a ApplicationAutoScaling ScalableTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApplicationAutoScaling ScalableTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ApplicationAutoScaling::ScalableTarget",
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
      description: "Sync ApplicationAutoScaling ScalableTarget state from AWS",
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
          existing.ResourceId?.toString(),
          existing.ScalableDimension?.toString(),
          existing.ServiceNamespace?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ApplicationAutoScaling::ScalableTarget",
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
