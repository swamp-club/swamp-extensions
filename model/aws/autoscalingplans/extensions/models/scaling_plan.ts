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

// Auto-generated extension model for @swamp/aws/autoscalingplans/scaling-plan
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AutoScalingPlans ScalingPlan (AWS::AutoScalingPlans::ScalingPlan).
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

const TagFilterSchema = z.object({
  Values: z.array(z.string().min(1).max(256)).describe(
    "The tag values (0 to 20).",
  ).optional(),
  Key: z.string().min(1).max(128).describe("The tag key."),
});

const PredefinedScalingMetricSpecificationSchema = z.object({
  ResourceLabel: z.string().min(1).max(1023).describe(
    "Identifies the resource associated with the metric type. You can't specify a resource label unless the metric type is ALBRequestCountPerTarget and there is a target group for an Application Load Balancer attached to the Auto Scaling group, Spot Fleet request, or ECS service.",
  ).optional(),
  PredefinedScalingMetricType: z.string().describe(
    "The metric type. The ALBRequestCountPerTarget metric type applies only to Auto Scaling groups, Spot Fleet requests, and ECS services.",
  ),
});

const MetricDimensionSchema = z.object({
  Value: z.string().describe("The value of the dimension."),
  Name: z.string().describe("The name of the dimension."),
});

const CustomizedScalingMetricSpecificationSchema = z.object({
  MetricName: z.string().describe("The name of the metric."),
  Statistic: z.string().describe("The statistic of the metric."),
  Dimensions: z.array(MetricDimensionSchema).describe(
    "The dimensions of the metric.",
  ).optional(),
  Unit: z.string().describe("The unit of the metric.").optional(),
  Namespace: z.string().describe("The namespace of the metric."),
});

const TargetTrackingConfigurationSchema = z.object({
  ScaleOutCooldown: z.number().int().describe(
    "The amount of time, in seconds, after a scale-out activity completes before another scale-out activity can start. This value is not used if the scalable resource is an Auto Scaling group.",
  ).optional(),
  TargetValue: z.number().describe("The target value for the metric."),
  PredefinedScalingMetricSpecification:
    PredefinedScalingMetricSpecificationSchema.describe(
      "A predefined metric. You can specify either a predefined metric or a customized metric.",
    ).optional(),
  DisableScaleIn: z.boolean().describe(
    "Indicates whether scale in by the target tracking scaling policy is disabled. If the value is true, scale in is disabled and the target tracking scaling policy doesn't remove capacity from the scalable resource. Otherwise, scale in is enabled and the target tracking scaling policy can remove capacity from the scalable resource. The default value is false.",
  ).optional(),
  ScaleInCooldown: z.number().int().describe(
    "The amount of time, in seconds, after a scale-in activity completes before another scale in activity can start. This value is not used if the scalable resource is an Auto Scaling group.",
  ).optional(),
  EstimatedInstanceWarmup: z.number().int().describe(
    "The estimated time, in seconds, until a newly launched instance can contribute to the CloudWatch metrics. This value is used only if the resource is an Auto Scaling group.",
  ).optional(),
  CustomizedScalingMetricSpecification:
    CustomizedScalingMetricSpecificationSchema.describe(
      "A customized metric. You can specify either a predefined metric or a customized metric.",
    ).optional(),
});

const CustomizedLoadMetricSpecificationSchema = z.object({
  MetricName: z.string().describe("The name of the metric."),
  Statistic: z.string().describe("The statistic of the metric."),
  Dimensions: z.array(MetricDimensionSchema).describe(
    "The dimensions of the metric.",
  ).optional(),
  Unit: z.string().describe("The unit of the metric.").optional(),
  Namespace: z.string().describe("The namespace of the metric."),
});

const PredefinedLoadMetricSpecificationSchema = z.object({
  PredefinedLoadMetricType: z.string().describe("The metric type."),
  ResourceLabel: z.string().min(1).max(1023).describe(
    "Identifies the resource associated with the metric type. You can't specify a resource label unless the metric type is ALBTargetGroupRequestCount and there is a target group for an Application Load Balancer attached to the Auto Scaling group.",
  ).optional(),
});

const ScalingInstructionSchema = z.object({
  DisableDynamicScaling: z.boolean().describe(
    "Controls whether dynamic scaling is disabled. When dynamic scaling is enabled, AWS Auto Scaling creates target tracking scaling policies based on the specified target tracking configurations. The default is enabled (false).",
  ).optional(),
  ServiceNamespace: z.string().describe("The namespace of the AWS service."),
  PredictiveScalingMaxCapacityBehavior: z.string().describe(
    "Defines the behavior that should be applied if the forecast capacity approaches or exceeds the maximum capacity specified for the resource. The default value is SetForecastCapacityToMaxCapacity.",
  ).optional(),
  ScalableDimension: z.string().describe(
    "The scalable dimension associated with the resource.",
  ),
  ScalingPolicyUpdateBehavior: z.string().describe(
    "Controls whether a resource's externally created scaling policies are deleted and new target tracking scaling policies created. The default value is KeepExternalPolicies. Valid only when configuring dynamic scaling.",
  ).optional(),
  MinCapacity: z.number().int().describe(
    "The minimum capacity of the resource.",
  ),
  TargetTrackingConfigurations: z.array(TargetTrackingConfigurationSchema)
    .describe(
      "The target tracking configurations (up to 10). Each of these structures must specify a unique scaling metric and a target value for the metric.",
    ),
  PredictiveScalingMaxCapacityBuffer: z.number().int().describe(
    "The size of the capacity buffer to use when the forecast capacity is close to or exceeds the maximum capacity. The value is specified as a percentage relative to the forecast capacity. For example, if the buffer is 10, this means a 10 percent buffer. The range is 1-100. Required if PredictiveScalingMaxCapacityBehavior is set to SetMaxCapacityAboveForecastCapacity, and cannot be used otherwise.",
  ).optional(),
  CustomizedLoadMetricSpecification: CustomizedLoadMetricSpecificationSchema
    .describe(
      "The customized load metric to use for predictive scaling. This property or a PredefinedLoadMetricSpecification is required when configuring predictive scaling, and cannot be used otherwise.",
    ).optional(),
  PredefinedLoadMetricSpecification: PredefinedLoadMetricSpecificationSchema
    .describe(
      "The predefined load metric to use for predictive scaling. This property or a CustomizedLoadMetricSpecification is required when configuring predictive scaling, and cannot be used otherwise.",
    ).optional(),
  ResourceId: z.string().min(1).max(1600).describe(
    "The ID of the resource. This string consists of the resource type and unique identifier.",
  ),
  ScheduledActionBufferTime: z.number().int().min(0).describe(
    "The amount of time, in seconds, to buffer the run time of scheduled scaling actions when scaling out. The value must be less than the forecast interval duration of 3600 seconds (60 minutes). The default is 300 seconds. Valid only when configuring predictive scaling.",
  ).optional(),
  MaxCapacity: z.number().int().describe(
    "The maximum capacity of the resource. The exception to this upper limit is if you specify a non-default setting for PredictiveScalingMaxCapacityBehavior.",
  ),
  PredictiveScalingMode: z.string().describe(
    "The predictive scaling mode. The default value is ForecastAndScale. Otherwise, AWS Auto Scaling forecasts capacity but does not apply any scheduled scaling actions based on the capacity forecast.",
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
  ApplicationSource: z.object({
    CloudFormationStackARN: z.string().describe(
      "The Amazon Resource Name (ARN) of a CloudFormation stack. The stack must contain at least one scalable resource.",
    ).optional(),
    TagFilters: z.array(TagFilterSchema).describe(
      "A set of tag filters (keys and values). Each tag filter specified must contain a key with values as optional. Each scaling plan can include up to 50 keys, and each key can include up to 20 values.",
    ).optional(),
  }).describe(
    "A CloudFormation stack or a set of tags. You can create one scaling plan per application source. The ApplicationSource property must be present to ensure interoperability with the AWS Auto Scaling console.",
  ),
  ScalingInstructions: z.array(ScalingInstructionSchema).describe(
    "The scaling instructions.",
  ),
});

const StateSchema = z.object({
  ScalingPlanArn: z.string().optional(),
  ScalingPlanName: z.string(),
  ScalingPlanVersion: z.string(),
  ApplicationSource: z.object({
    CloudFormationStackARN: z.string(),
    TagFilters: z.array(TagFilterSchema),
  }).optional(),
  ScalingInstructions: z.array(ScalingInstructionSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ApplicationSource: z.object({
    CloudFormationStackARN: z.string().describe(
      "The Amazon Resource Name (ARN) of a CloudFormation stack. The stack must contain at least one scalable resource.",
    ).optional(),
    TagFilters: z.array(TagFilterSchema).describe(
      "A set of tag filters (keys and values). Each tag filter specified must contain a key with values as optional. Each scaling plan can include up to 50 keys, and each key can include up to 20 values.",
    ).optional(),
  }).describe(
    "A CloudFormation stack or a set of tags. You can create one scaling plan per application source. The ApplicationSource property must be present to ensure interoperability with the AWS Auto Scaling console.",
  ).optional(),
  ScalingInstructions: z.array(ScalingInstructionSchema).describe(
    "The scaling instructions.",
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

/** Swamp extension model for AutoScalingPlans ScalingPlan. Registered at `@swamp/aws/autoscalingplans/scaling-plan`. */
export const model = {
  type: "@swamp/aws/autoscalingplans/scaling-plan",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AutoScalingPlans ScalingPlan resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AutoScalingPlans ScalingPlan",
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
          "AWS::AutoScalingPlans::ScalingPlan",
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
      description: "Get a AutoScalingPlans ScalingPlan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AutoScalingPlans ScalingPlan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AutoScalingPlans::ScalingPlan",
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
      description: "Update a AutoScalingPlans ScalingPlan",
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
          existing.ScalingPlanVersion?.toString(),
          existing.ScalingPlanName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::AutoScalingPlans::ScalingPlan",
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
          "AWS::AutoScalingPlans::ScalingPlan",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a AutoScalingPlans ScalingPlan",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AutoScalingPlans ScalingPlan",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AutoScalingPlans::ScalingPlan",
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
      description: "Sync AutoScalingPlans ScalingPlan state from AWS",
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
          existing.ScalingPlanVersion?.toString(),
          existing.ScalingPlanName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::AutoScalingPlans::ScalingPlan",
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
      description: "List AutoScalingPlans ScalingPlan resources",
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
          "AWS::AutoScalingPlans::ScalingPlan",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
