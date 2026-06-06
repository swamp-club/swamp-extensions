// Auto-generated extension model for @swamp/aws/autoscaling/scaling-policy
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AutoScaling ScalingPolicy (AWS::AutoScaling::ScalingPolicy).
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

const MetricDimensionSchema = z.object({
  Value: z.string(),
  Name: z.string(),
});

const MetricSchema = z.object({
  MetricName: z.string(),
  Dimensions: z.array(MetricDimensionSchema).optional(),
  Namespace: z.string(),
});

const MetricStatSchema = z.object({
  Metric: MetricSchema,
  Stat: z.string(),
  Unit: z.string().optional(),
});

const MetricDataQuerySchema = z.object({
  Label: z.string().optional(),
  MetricStat: MetricStatSchema.optional(),
  Id: z.string(),
  ReturnData: z.boolean().optional(),
  Expression: z.string().optional(),
});

const PredictiveScalingCustomizedCapacityMetricSchema = z.object({
  MetricDataQueries: z.array(MetricDataQuerySchema),
});

const PredictiveScalingCustomizedLoadMetricSchema = z.object({
  MetricDataQueries: z.array(MetricDataQuerySchema),
});

const PredictiveScalingCustomizedScalingMetricSchema = z.object({
  MetricDataQueries: z.array(MetricDataQuerySchema),
});

const PredictiveScalingPredefinedLoadMetricSchema = z.object({
  ResourceLabel: z.string().optional(),
  PredefinedMetricType: z.string(),
});

const PredictiveScalingPredefinedScalingMetricSchema = z.object({
  ResourceLabel: z.string().optional(),
  PredefinedMetricType: z.string(),
});

const PredictiveScalingPredefinedMetricPairSchema = z.object({
  ResourceLabel: z.string().optional(),
  PredefinedMetricType: z.string(),
});

const PredictiveScalingMetricSpecificationSchema = z.object({
  CustomizedCapacityMetricSpecification:
    PredictiveScalingCustomizedCapacityMetricSchema.optional(),
  CustomizedLoadMetricSpecification: PredictiveScalingCustomizedLoadMetricSchema
    .optional(),
  CustomizedScalingMetricSpecification:
    PredictiveScalingCustomizedScalingMetricSchema.optional(),
  PredefinedLoadMetricSpecification: PredictiveScalingPredefinedLoadMetricSchema
    .optional(),
  TargetValue: z.number(),
  PredefinedScalingMetricSpecification:
    PredictiveScalingPredefinedScalingMetricSchema.optional(),
  PredefinedMetricPairSpecification: PredictiveScalingPredefinedMetricPairSchema
    .optional(),
});

const StepAdjustmentSchema = z.object({
  MetricIntervalUpperBound: z.number().optional(),
  MetricIntervalLowerBound: z.number().optional(),
  ScalingAdjustment: z.number().int(),
});

const TargetTrackingMetricStatSchema = z.object({
  Metric: MetricSchema,
  Stat: z.string(),
  Unit: z.string().optional(),
  Period: z.number().int().optional(),
});

const TargetTrackingMetricDataQuerySchema = z.object({
  Label: z.string().optional(),
  MetricStat: TargetTrackingMetricStatSchema.optional(),
  Id: z.string(),
  ReturnData: z.boolean().optional(),
  Expression: z.string().optional(),
  Period: z.number().int().optional(),
});

const CustomizedMetricSpecificationSchema = z.object({
  MetricName: z.string().optional(),
  Dimensions: z.array(MetricDimensionSchema).optional(),
  Metrics: z.array(TargetTrackingMetricDataQuerySchema).optional(),
  Statistic: z.string().optional(),
  Unit: z.string().optional(),
  Namespace: z.string().optional(),
  Period: z.number().int().optional(),
});

const PredefinedMetricSpecificationSchema = z.object({
  ResourceLabel: z.string().optional(),
  PredefinedMetricType: z.string(),
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
  MetricAggregationType: z.string().describe(
    "The aggregation type for the CloudWatch metrics. The valid values are Minimum, Maximum, and Average. If the aggregation type is null, the value is treated as Average. Valid only if the policy type is StepScaling.",
  ).optional(),
  PolicyType: z.string().describe(
    "One of the following policy types: TargetTrackingScaling, StepScaling, SimpleScaling (default), PredictiveScaling",
  ).optional(),
  PredictiveScalingConfiguration: z.object({
    MetricSpecifications: z.array(PredictiveScalingMetricSpecificationSchema),
    MaxCapacityBreachBehavior: z.string().optional(),
    MaxCapacityBuffer: z.number().int().optional(),
    SchedulingBufferTime: z.number().int().optional(),
    Mode: z.string().optional(),
  }).describe(
    "A predictive scaling policy. Includes support for predefined metrics only.",
  ).optional(),
  ScalingAdjustment: z.number().int().describe(
    "The amount by which to scale, based on the specified adjustment type. A positive value adds to the current capacity while a negative number removes from the current capacity. For exact capacity, you must specify a positive value. Required if the policy type is SimpleScaling. (Not used with any other policy type.)",
  ).optional(),
  Cooldown: z.string().describe(
    "The duration of the policy's cooldown period, in seconds. When a cooldown period is specified here, it overrides the default cooldown period defined for the Auto Scaling group.",
  ).optional(),
  StepAdjustments: z.array(StepAdjustmentSchema).describe(
    "A set of adjustments that enable you to scale based on the size of the alarm breach. Required if the policy type is StepScaling. (Not used with any other policy type.)",
  ).optional(),
  AutoScalingGroupName: z.string().describe(
    "The name of the Auto Scaling group.",
  ),
  MinAdjustmentMagnitude: z.number().int().describe(
    "The minimum value to scale by when the adjustment type is PercentChangeInCapacity. For example, suppose that you create a step scaling policy to scale out an Auto Scaling group by 25 percent and you specify a MinAdjustmentMagnitude of 2. If the group has 4 instances and the scaling policy is performed, 25 percent of 4 is 1. However, because you specified a MinAdjustmentMagnitude of 2, Amazon EC2 Auto Scaling scales out the group by 2 instances.",
  ).optional(),
  TargetTrackingConfiguration: z.object({
    CustomizedMetricSpecification: CustomizedMetricSpecificationSchema
      .optional(),
    TargetValue: z.number(),
    DisableScaleIn: z.boolean().optional(),
    PredefinedMetricSpecification: PredefinedMetricSpecificationSchema
      .optional(),
  }).describe(
    "A target tracking scaling policy. Includes support for predefined or customized metrics.",
  ).optional(),
  EstimatedInstanceWarmup: z.number().int().describe(
    "The estimated time, in seconds, until a newly launched instance can contribute to the CloudWatch metrics. If not provided, the default is to use the value from the default cooldown period for the Auto Scaling group. Valid only if the policy type is TargetTrackingScaling or StepScaling.",
  ).optional(),
  AdjustmentType: z.string().describe(
    "Specifies how the scaling adjustment is interpreted. The valid values are ChangeInCapacity, ExactCapacity, and PercentChangeInCapacity.",
  ).optional(),
});

const StateSchema = z.object({
  MetricAggregationType: z.string().optional(),
  PolicyName: z.string().optional(),
  PolicyType: z.string().optional(),
  PredictiveScalingConfiguration: z.object({
    MetricSpecifications: z.array(PredictiveScalingMetricSpecificationSchema),
    MaxCapacityBreachBehavior: z.string(),
    MaxCapacityBuffer: z.number(),
    SchedulingBufferTime: z.number(),
    Mode: z.string(),
  }).optional(),
  ScalingAdjustment: z.number().optional(),
  Cooldown: z.string().optional(),
  StepAdjustments: z.array(StepAdjustmentSchema).optional(),
  AutoScalingGroupName: z.string().optional(),
  MinAdjustmentMagnitude: z.number().optional(),
  TargetTrackingConfiguration: z.object({
    CustomizedMetricSpecification: CustomizedMetricSpecificationSchema,
    TargetValue: z.number(),
    DisableScaleIn: z.boolean(),
    PredefinedMetricSpecification: PredefinedMetricSpecificationSchema,
  }).optional(),
  EstimatedInstanceWarmup: z.number().optional(),
  AdjustmentType: z.string().optional(),
  Arn: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  MetricAggregationType: z.string().describe(
    "The aggregation type for the CloudWatch metrics. The valid values are Minimum, Maximum, and Average. If the aggregation type is null, the value is treated as Average. Valid only if the policy type is StepScaling.",
  ).optional(),
  PolicyType: z.string().describe(
    "One of the following policy types: TargetTrackingScaling, StepScaling, SimpleScaling (default), PredictiveScaling",
  ).optional(),
  PredictiveScalingConfiguration: z.object({
    MetricSpecifications: z.array(PredictiveScalingMetricSpecificationSchema)
      .optional(),
    MaxCapacityBreachBehavior: z.string().optional(),
    MaxCapacityBuffer: z.number().int().optional(),
    SchedulingBufferTime: z.number().int().optional(),
    Mode: z.string().optional(),
  }).describe(
    "A predictive scaling policy. Includes support for predefined metrics only.",
  ).optional(),
  ScalingAdjustment: z.number().int().describe(
    "The amount by which to scale, based on the specified adjustment type. A positive value adds to the current capacity while a negative number removes from the current capacity. For exact capacity, you must specify a positive value. Required if the policy type is SimpleScaling. (Not used with any other policy type.)",
  ).optional(),
  Cooldown: z.string().describe(
    "The duration of the policy's cooldown period, in seconds. When a cooldown period is specified here, it overrides the default cooldown period defined for the Auto Scaling group.",
  ).optional(),
  StepAdjustments: z.array(StepAdjustmentSchema).describe(
    "A set of adjustments that enable you to scale based on the size of the alarm breach. Required if the policy type is StepScaling. (Not used with any other policy type.)",
  ).optional(),
  AutoScalingGroupName: z.string().describe(
    "The name of the Auto Scaling group.",
  ).optional(),
  MinAdjustmentMagnitude: z.number().int().describe(
    "The minimum value to scale by when the adjustment type is PercentChangeInCapacity. For example, suppose that you create a step scaling policy to scale out an Auto Scaling group by 25 percent and you specify a MinAdjustmentMagnitude of 2. If the group has 4 instances and the scaling policy is performed, 25 percent of 4 is 1. However, because you specified a MinAdjustmentMagnitude of 2, Amazon EC2 Auto Scaling scales out the group by 2 instances.",
  ).optional(),
  TargetTrackingConfiguration: z.object({
    CustomizedMetricSpecification: CustomizedMetricSpecificationSchema
      .optional(),
    TargetValue: z.number().optional(),
    DisableScaleIn: z.boolean().optional(),
    PredefinedMetricSpecification: PredefinedMetricSpecificationSchema
      .optional(),
  }).describe(
    "A target tracking scaling policy. Includes support for predefined or customized metrics.",
  ).optional(),
  EstimatedInstanceWarmup: z.number().int().describe(
    "The estimated time, in seconds, until a newly launched instance can contribute to the CloudWatch metrics. If not provided, the default is to use the value from the default cooldown period for the Auto Scaling group. Valid only if the policy type is TargetTrackingScaling or StepScaling.",
  ).optional(),
  AdjustmentType: z.string().describe(
    "Specifies how the scaling adjustment is interpreted. The valid values are ChangeInCapacity, ExactCapacity, and PercentChangeInCapacity.",
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

/** Swamp extension model for AutoScaling ScalingPolicy. Registered at `@swamp/aws/autoscaling/scaling-policy`. */
export const model = {
  type: "@swamp/aws/autoscaling/scaling-policy",
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
      description: "AutoScaling ScalingPolicy resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AutoScaling ScalingPolicy",
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
          "AWS::AutoScaling::ScalingPolicy",
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
      description: "Get a AutoScaling ScalingPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AutoScaling ScalingPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AutoScaling::ScalingPolicy",
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
      description: "Update a AutoScaling ScalingPolicy",
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
          "AWS::AutoScaling::ScalingPolicy",
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
          "AWS::AutoScaling::ScalingPolicy",
          identifier,
          currentState,
          desiredState,
          ["AutoScalingGroupName"],
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
      description: "Delete a AutoScaling ScalingPolicy",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AutoScaling ScalingPolicy",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AutoScaling::ScalingPolicy",
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
      description: "Sync AutoScaling ScalingPolicy state from AWS",
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
            "AWS::AutoScaling::ScalingPolicy",
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
