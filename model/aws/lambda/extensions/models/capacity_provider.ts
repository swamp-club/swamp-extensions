// Auto-generated extension model for @swamp/aws/lambda/capacity-provider
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lambda CapacityProvider (AWS::Lambda::CapacityProvider).
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

const TargetTrackingScalingPolicySchema = z.object({
  PredefinedMetricType: z.enum(["LambdaCapacityProviderAverageCPUUtilization"])
    .describe("The predefined metric type to track for scaling decisions."),
  TargetValue: z.number().min(0).describe(
    "The target value for the metric that the scaling policy attempts to maintain through scaling actions.",
  ),
});

const TagSchema = z.object({
  Value: z.string().min(0).max(256).describe("The value for the tag.")
    .optional(),
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
});

const GlobalArgsSchema = z.object({
  CapacityProviderScalingConfig: z.object({
    ScalingPolicies: z.array(TargetTrackingScalingPolicySchema).describe(
      "A list of target tracking scaling policies for the capacity provider.",
    ).optional(),
    ScalingMode: z.enum(["Auto", "Manual"]).describe(
      "The scaling mode that determines how the capacity provider responds to changes in demand.",
    ).optional(),
    MaxVCpuCount: z.number().int().min(2).max(15000).describe(
      "The maximum number of vCPUs that the capacity provider can provision across all compute instances.",
    ).optional(),
  }).describe("The scaling configuration for the capacity provider.")
    .optional(),
  KmsKeyArn: z.string().min(0).max(10000).regex(
    new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
  ).describe(
    "The ARN of the KMS key used to encrypt the capacity provider's resources.",
  ).optional(),
  VpcConfig: z.object({
    SubnetIds: z.array(
      z.string().min(0).max(1024).regex(new RegExp("^subnet-[0-9a-z]*$")),
    ).describe(
      "A list of subnet IDs where the capacity provider launches compute instances.",
    ),
    SecurityGroupIds: z.array(
      z.string().min(0).max(1024).regex(new RegExp("^sg-[0-9a-zA-Z]*$")),
    ).describe(
      "A list of security group IDs that control network access for compute instances managed by the capacity provider.",
    ),
  }).describe("The VPC configuration for the capacity provider."),
  CapacityProviderName: z.string().min(1).max(140).regex(
    new RegExp(
      "^(arn:aws[a-zA-Z-]*:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:capacity-provider:[a-zA-Z0-9-_]+)|[a-zA-Z0-9-_]+$",
    ),
  ).optional(),
  InstanceRequirements: z.object({
    AllowedInstanceTypes: z.array(
      z.string().min(1).max(30).regex(new RegExp("^[a-zA-Z0-9\\.\\-]+$")),
    ).describe(
      "A list of EC2 instance types that the capacity provider is allowed to use. If not specified, all compatible instance types are allowed.",
    ).optional(),
    ExcludedInstanceTypes: z.array(
      z.string().min(1).max(30).regex(new RegExp("^[a-zA-Z0-9\\.\\-]+$")),
    ).describe(
      "A list of EC2 instance types that the capacity provider should not use, even if they meet other requirements.",
    ).optional(),
    Architectures: z.array(z.enum(["x86_64", "arm64"])).describe(
      "A list of supported CPU architectures for compute instances. Valid values include x86_64 and arm64.",
    ).optional(),
  }).describe(
    "The instance requirements for compute resources managed by the capacity provider.",
  ).optional(),
  PermissionsConfig: z.object({
    CapacityProviderOperatorRoleArn: z.string().min(0).max(10000).regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
      ),
    ).describe(
      "The ARN of the IAM role that the capacity provider uses to manage compute instances and other AWS resources.",
    ),
  }).describe("The permissions configuration for the capacity provider."),
  Tags: z.array(TagSchema).describe(
    "A key-value pair that provides metadata for the capacity provider.",
  ).optional(),
});

const StateSchema = z.object({
  CapacityProviderScalingConfig: z.object({
    ScalingPolicies: z.array(TargetTrackingScalingPolicySchema),
    ScalingMode: z.string(),
    MaxVCpuCount: z.number(),
  }).optional(),
  KmsKeyArn: z.string().optional(),
  VpcConfig: z.object({
    SubnetIds: z.array(z.string()),
    SecurityGroupIds: z.array(z.string()),
  }).optional(),
  State: z.string().optional(),
  CapacityProviderName: z.string(),
  InstanceRequirements: z.object({
    AllowedInstanceTypes: z.array(z.string()),
    ExcludedInstanceTypes: z.array(z.string()),
    Architectures: z.array(z.string()),
  }).optional(),
  Arn: z.string().optional(),
  PermissionsConfig: z.object({
    CapacityProviderOperatorRoleArn: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  CapacityProviderScalingConfig: z.object({
    ScalingPolicies: z.array(TargetTrackingScalingPolicySchema).describe(
      "A list of target tracking scaling policies for the capacity provider.",
    ).optional(),
    ScalingMode: z.enum(["Auto", "Manual"]).describe(
      "The scaling mode that determines how the capacity provider responds to changes in demand.",
    ).optional(),
    MaxVCpuCount: z.number().int().min(2).max(15000).describe(
      "The maximum number of vCPUs that the capacity provider can provision across all compute instances.",
    ).optional(),
  }).describe("The scaling configuration for the capacity provider.")
    .optional(),
  KmsKeyArn: z.string().min(0).max(10000).regex(
    new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
  ).describe(
    "The ARN of the KMS key used to encrypt the capacity provider's resources.",
  ).optional(),
  VpcConfig: z.object({
    SubnetIds: z.array(
      z.string().min(0).max(1024).regex(new RegExp("^subnet-[0-9a-z]*$")),
    ).describe(
      "A list of subnet IDs where the capacity provider launches compute instances.",
    ).optional(),
    SecurityGroupIds: z.array(
      z.string().min(0).max(1024).regex(new RegExp("^sg-[0-9a-zA-Z]*$")),
    ).describe(
      "A list of security group IDs that control network access for compute instances managed by the capacity provider.",
    ).optional(),
  }).describe("The VPC configuration for the capacity provider.").optional(),
  CapacityProviderName: z.string().min(1).max(140).regex(
    new RegExp(
      "^(arn:aws[a-zA-Z-]*:lambda:(eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:\\d{12}:capacity-provider:[a-zA-Z0-9-_]+)|[a-zA-Z0-9-_]+$",
    ),
  ).optional(),
  InstanceRequirements: z.object({
    AllowedInstanceTypes: z.array(
      z.string().min(1).max(30).regex(new RegExp("^[a-zA-Z0-9\\.\\-]+$")),
    ).describe(
      "A list of EC2 instance types that the capacity provider is allowed to use. If not specified, all compatible instance types are allowed.",
    ).optional(),
    ExcludedInstanceTypes: z.array(
      z.string().min(1).max(30).regex(new RegExp("^[a-zA-Z0-9\\.\\-]+$")),
    ).describe(
      "A list of EC2 instance types that the capacity provider should not use, even if they meet other requirements.",
    ).optional(),
    Architectures: z.array(z.enum(["x86_64", "arm64"])).describe(
      "A list of supported CPU architectures for compute instances. Valid values include x86_64 and arm64.",
    ).optional(),
  }).describe(
    "The instance requirements for compute resources managed by the capacity provider.",
  ).optional(),
  PermissionsConfig: z.object({
    CapacityProviderOperatorRoleArn: z.string().min(0).max(10000).regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
      ),
    ).describe(
      "The ARN of the IAM role that the capacity provider uses to manage compute instances and other AWS resources.",
    ).optional(),
  }).describe("The permissions configuration for the capacity provider.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A key-value pair that provides metadata for the capacity provider.",
  ).optional(),
});

/** Swamp extension model for Lambda CapacityProvider. Registered at `@swamp/aws/lambda/capacity-provider`. */
export const model = {
  type: "@swamp/aws/lambda/capacity-provider",
  version: "2026.05.29.1",
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
      toVersion: "2026.05.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lambda CapacityProvider resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lambda CapacityProvider",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lambda::CapacityProvider",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.CapacityProviderName ?? g.CapacityProviderName)
            ?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Lambda CapacityProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda CapacityProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Lambda::CapacityProvider",
          args.identifier,
        ) as StateData;
        const instanceName = ((result.CapacityProviderName ??
          context.globalArgs.CapacityProviderName)?.toString() ??
          args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
          .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Lambda CapacityProvider",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.CapacityProviderName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.CapacityProviderName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lambda::CapacityProvider",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lambda::CapacityProvider",
          identifier,
          currentState,
          desiredState,
          [
            "CapacityProviderName",
            "VpcConfig",
            "InstanceRequirements",
            "PermissionsConfig",
            "KmsKeyArn",
          ],
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
      description: "Delete a Lambda CapacityProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda CapacityProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Lambda::CapacityProvider",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.CapacityProviderName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync Lambda CapacityProvider state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.CapacityProviderName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.CapacityProviderName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lambda::CapacityProvider",
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
