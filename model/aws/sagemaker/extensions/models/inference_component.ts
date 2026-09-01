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

// Auto-generated extension model for @swamp/aws/sagemaker/inference-component
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker InferenceComponent (AWS::SageMaker::InferenceComponent).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const DeployedImageSchema = z.object({
  SpecifiedImage: z.string().max(255).regex(new RegExp("[\\S]+")).describe(
    "The image to use for the container that will be materialized for the inference component",
  ).optional(),
  ResolvedImage: z.string().max(255).regex(new RegExp("[\\S]+")).describe(
    "The image to use for the container that will be materialized for the inference component",
  ).optional(),
  ResolutionTime: z.string().optional(),
});

const MetricsEndpointSchema = z.object({
  MetricsEndpointPath: z.string().max(256).regex(
    new RegExp("^/(?!.*\\.\\.)[a-zA-Z0-9/_.\\-]+$"),
  ).describe(
    "The path to the Prometheus formatted metrics endpoint exposed by the container",
  ),
  MetricPublishFrequencyInSeconds: z.number().int().min(10).max(300).describe(
    "The interval, in seconds, at which container metrics scraped from the endpoint are published to Amazon CloudWatch. Valid values per the SageMaker API Reference are 10, 30, 60, 120, 180, 240 and 300; the service validates the value.",
  ).optional(),
});

const ContainerMetricsConfigSchema = z.object({
  MetricsEndpoints: z.array(MetricsEndpointSchema),
});

const InferenceComponentContainerSpecificationSchema = z.object({
  DeployedImage: DeployedImageSchema.optional(),
  Image: z.string().max(255).regex(new RegExp("[\\S]+")).describe(
    "The image to use for the container that will be materialized for the inference component",
  ).optional(),
  ArtifactUrl: z.string().max(1024).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).optional(),
  Environment: z.record(
    z.string(),
    z.string().max(1024).regex(new RegExp("^[\\S\\s]*$")),
  ).describe("Environment variables to specify on the container").optional(),
  ContainerMetricsConfig: ContainerMetricsConfigSchema.describe(
    "The configuration for container metrics scraping",
  ).optional(),
});

const InferenceComponentStartupParametersSchema = z.object({
  ModelDataDownloadTimeoutInSeconds: z.number().int().min(60).max(3600)
    .optional(),
  ContainerStartupHealthCheckTimeoutInSeconds: z.number().int().min(60).max(
    3600,
  ).optional(),
});

const InferenceComponentComputeResourceRequirementsSchema = z.object({
  NumberOfCpuCoresRequired: z.number().min(0.25).optional(),
  NumberOfAcceleratorDevicesRequired: z.number().min(1).optional(),
  MinMemoryRequiredInMb: z.number().int().min(128).optional(),
  MaxMemoryRequiredInMb: z.number().int().min(128).optional(),
});

const InferenceComponentDataCacheConfigSchema = z.object({
  EnableCaching: z.boolean().describe(
    "Whether the endpoint caches the model artifacts and container image on each instance it provisions for the inference component",
  ),
});

const InferenceComponentAvailabilityZoneBalanceSchema = z.object({
  EnforcementMode: z.enum(["PERMISSIVE"]),
  MaxImbalance: z.number().int().min(0).max(100).describe(
    "The maximum allowed difference in the number of inference component copies between any two Availability Zones",
  ).optional(),
});

const InferenceComponentSchedulingConfigSchema = z.object({
  PlacementStrategy: z.enum(["SPREAD", "BINPACK"]),
  AvailabilityZoneBalance: InferenceComponentAvailabilityZoneBalanceSchema
    .describe(
      "Configuration for balancing inference component copies across Availability Zones",
    ),
});

const InferenceComponentContainerSpecificationForInstanceTypeSchema = z.object({
  Image: z.string().max(255).regex(new RegExp("[\\S]+")).describe(
    "The image to use for the container that will be materialized for the inference component",
  ).optional(),
  ArtifactUrl: z.string().max(1024).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).optional(),
  Environment: z.record(
    z.string(),
    z.string().max(1024).regex(new RegExp("^[\\S\\s]*$")),
  ).describe("Environment variables to specify on the container").optional(),
  ContainerMetricsConfig: ContainerMetricsConfigSchema.describe(
    "The configuration for container metrics scraping",
  ).optional(),
});

const InferenceComponentSpecificationForInstanceTypeSchema = z.object({
  InstanceType: z.string().max(64).regex(new RegExp("^ml\\..*")).describe(
    "An ML compute instance type",
  ),
  ModelName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name of the model to use with the inference component")
    .optional(),
  Container: InferenceComponentContainerSpecificationForInstanceTypeSchema
    .describe(
      "Container specification for one Specifications entry. Distinct from InferenceComponentContainerSpecification: DescribeInferenceComponent returns no per-entry DeployedImage (VERIFIED in us-west-2), so DeployedImage is intentionally omitted here and this definition can never be aggregated into a plural READ response. The singular InferenceComponentContainerSpecification keeps DeployedImage - the service DOES return it there.",
    ).optional(),
  StartupParameters: InferenceComponentStartupParametersSchema.optional(),
  ComputeResourceRequirements:
    InferenceComponentComputeResourceRequirementsSchema.optional(),
  DataCacheConfig: InferenceComponentDataCacheConfigSchema.describe(
    "Settings that affect how the inference component caches data",
  ).optional(),
  CurrentDataCacheConfig: InferenceComponentDataCacheConfigSchema.describe(
    "The data caching configuration actually in effect for this instance type, including a value the service chose rather than the template: SageMaker enables caching automatically on instance types with more than 232 GiB of local NVMe storage, whether or not DataCacheConfig was set. Returned by Describe and not settable; set DataCacheConfig instead.",
  ).optional(),
  SchedulingConfig: InferenceComponentSchedulingConfigSchema.describe(
    "The scheduling configuration that determines how inference component copies are placed across available instances",
  ).optional(),
});

const InferenceComponentCapacitySizeSchema = z.object({
  Type: z.enum(["COPY_COUNT", "CAPACITY_PERCENT"]),
  Value: z.number().int().describe(
    "The number of copies for the inference component",
  ),
});

const InferenceComponentRollingUpdatePolicySchema = z.object({
  MaximumBatchSize: InferenceComponentCapacitySizeSchema.describe(
    "Capacity size configuration for the inference component",
  ).optional(),
  WaitIntervalInSeconds: z.number().int().min(0).max(3600).optional(),
  RollbackMaximumBatchSize: InferenceComponentCapacitySizeSchema.describe(
    "Capacity size configuration for the inference component",
  ).optional(),
  MaximumExecutionTimeoutInSeconds: z.number().int().min(600).max(28800)
    .optional(),
});

const AlarmSchema = z.object({
  AlarmName: z.string().min(1).max(255).regex(new RegExp("^(?!\\s*$).+")),
});

const AutoRollbackConfigurationSchema = z.object({
  Alarms: z.array(AlarmSchema),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  InferenceComponentName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name of the inference component").optional(),
  EndpointArn: z.string().min(1).max(256).describe(
    "The Amazon Resource Name (ARN) of the endpoint the inference component is associated with",
  ).optional(),
  EndpointName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe(
    "The name of the endpoint the inference component is associated with",
  ),
  VariantName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe(
    "The name of the endpoint variant the inference component is associated with",
  ).optional(),
  Specification: z.object({
    ModelName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe("The name of the model to use with the inference component")
      .optional(),
    BaseInferenceComponentName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe("The name of the base inference component").optional(),
    Container: InferenceComponentContainerSpecificationSchema.optional(),
    StartupParameters: InferenceComponentStartupParametersSchema.optional(),
    ComputeResourceRequirements:
      InferenceComponentComputeResourceRequirementsSchema.optional(),
    DataCacheConfig: InferenceComponentDataCacheConfigSchema.describe(
      "Settings that affect how the inference component caches data",
    ).optional(),
    CurrentDataCacheConfig: InferenceComponentDataCacheConfigSchema.describe(
      "The data caching configuration actually in effect, including a value the service chose rather than the template: SageMaker enables caching automatically on instance types with more than 232 GiB of local NVMe storage, whether or not DataCacheConfig was set. Returned by Describe and not settable; set DataCacheConfig instead.",
    ).optional(),
    SchedulingConfig: InferenceComponentSchedulingConfigSchema.describe(
      "The scheduling configuration that determines how inference component copies are placed across available instances",
    ).optional(),
  }).describe(
    "The specification for the inference component, for an endpoint with a single instance type. Specify exactly one of Specification or Specifications. InstanceType is not accepted here; use Specifications for per instance type configuration.",
  ).optional(),
  Specifications: z.array(InferenceComponentSpecificationForInstanceTypeSchema)
    .describe(
      "A list of specification objects for the inference component, one per instance type. The service requires at least two entries; use the singular Specification for a single instance type.",
    ).optional(),
  RuntimeConfig: z.object({
    CopyCount: z.number().int().min(0).describe(
      "The number of copies for the inference component",
    ).optional(),
  }).describe("The runtime config for the inference component").optional(),
  DeploymentConfig: z.object({
    RollingUpdatePolicy: InferenceComponentRollingUpdatePolicySchema.describe(
      "The rolling update policy for the inference component",
    ).optional(),
    AutoRollbackConfiguration: AutoRollbackConfigurationSchema.optional(),
  }).describe("The deployment config for the inference component").optional(),
  Tags: z.array(TagSchema).describe("An array of tags to apply to the resource")
    .optional(),
});

const StateSchema = z.object({
  InferenceComponentArn: z.string(),
  InferenceComponentName: z.string().optional(),
  EndpointArn: z.string().optional(),
  EndpointName: z.string().optional(),
  VariantName: z.string().optional(),
  FailureReason: z.string().optional(),
  Specification: z.object({
    ModelName: z.string(),
    BaseInferenceComponentName: z.string(),
    Container: InferenceComponentContainerSpecificationSchema,
    StartupParameters: InferenceComponentStartupParametersSchema,
    ComputeResourceRequirements:
      InferenceComponentComputeResourceRequirementsSchema,
    DataCacheConfig: InferenceComponentDataCacheConfigSchema,
    CurrentDataCacheConfig: InferenceComponentDataCacheConfigSchema,
    SchedulingConfig: InferenceComponentSchedulingConfigSchema,
  }).optional(),
  Specifications: z.array(InferenceComponentSpecificationForInstanceTypeSchema)
    .optional(),
  RuntimeConfig: z.object({
    CopyCount: z.number(),
    DesiredCopyCount: z.number(),
    CurrentCopyCount: z.number(),
    PlacementStatus: z.array(z.object({
      InstanceType: z.string(),
      CurrentCopyCount: z.number(),
    })),
  }).optional(),
  DeploymentConfig: z.object({
    RollingUpdatePolicy: InferenceComponentRollingUpdatePolicySchema,
    AutoRollbackConfiguration: AutoRollbackConfigurationSchema,
  }).optional(),
  InferenceComponentStatus: z.string().optional(),
  CreationTime: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  InferenceComponentName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name of the inference component").optional(),
  EndpointArn: z.string().min(1).max(256).describe(
    "The Amazon Resource Name (ARN) of the endpoint the inference component is associated with",
  ).optional(),
  EndpointName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe(
    "The name of the endpoint the inference component is associated with",
  ).optional(),
  VariantName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe(
    "The name of the endpoint variant the inference component is associated with",
  ).optional(),
  Specification: z.object({
    ModelName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe("The name of the model to use with the inference component")
      .optional(),
    BaseInferenceComponentName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe("The name of the base inference component").optional(),
    Container: InferenceComponentContainerSpecificationSchema.optional(),
    StartupParameters: InferenceComponentStartupParametersSchema.optional(),
    ComputeResourceRequirements:
      InferenceComponentComputeResourceRequirementsSchema.optional(),
    DataCacheConfig: InferenceComponentDataCacheConfigSchema.describe(
      "Settings that affect how the inference component caches data",
    ).optional(),
    CurrentDataCacheConfig: InferenceComponentDataCacheConfigSchema.describe(
      "The data caching configuration actually in effect, including a value the service chose rather than the template: SageMaker enables caching automatically on instance types with more than 232 GiB of local NVMe storage, whether or not DataCacheConfig was set. Returned by Describe and not settable; set DataCacheConfig instead.",
    ).optional(),
    SchedulingConfig: InferenceComponentSchedulingConfigSchema.describe(
      "The scheduling configuration that determines how inference component copies are placed across available instances",
    ).optional(),
  }).describe(
    "The specification for the inference component, for an endpoint with a single instance type. Specify exactly one of Specification or Specifications. InstanceType is not accepted here; use Specifications for per instance type configuration.",
  ).optional(),
  Specifications: z.array(InferenceComponentSpecificationForInstanceTypeSchema)
    .describe(
      "A list of specification objects for the inference component, one per instance type. The service requires at least two entries; use the singular Specification for a single instance type.",
    ).optional(),
  RuntimeConfig: z.object({
    CopyCount: z.number().int().min(0).describe(
      "The number of copies for the inference component",
    ).optional(),
  }).describe("The runtime config for the inference component").optional(),
  DeploymentConfig: z.object({
    RollingUpdatePolicy: InferenceComponentRollingUpdatePolicySchema.describe(
      "The rolling update policy for the inference component",
    ).optional(),
    AutoRollbackConfiguration: AutoRollbackConfigurationSchema.optional(),
  }).describe("The deployment config for the inference component").optional(),
  Tags: z.array(TagSchema).describe("An array of tags to apply to the resource")
    .optional(),
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

/** Swamp extension model for SageMaker InferenceComponent. Registered at `@swamp/aws/sagemaker/inference-component`. */
export const model = {
  type: "@swamp/aws/sagemaker/inference-component",
  version: "2026.09.01.1",
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
      toVersion: "2026.09.01.1",
      description: "Added: Specifications",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker InferenceComponent resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker InferenceComponent",
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
          "AWS::SageMaker::InferenceComponent",
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
      description: "Get a SageMaker InferenceComponent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker InferenceComponent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::InferenceComponent",
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
      description: "Update a SageMaker InferenceComponent",
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
        const identifier = existing.InferenceComponentArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::InferenceComponent",
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
          "AWS::SageMaker::InferenceComponent",
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
      description: "Delete a SageMaker InferenceComponent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker InferenceComponent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::InferenceComponent",
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
      description: "Sync SageMaker InferenceComponent state from AWS",
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
        const identifier = existing.InferenceComponentArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::InferenceComponent",
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
      description: "List SageMaker InferenceComponent resources",
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
          "AWS::SageMaker::InferenceComponent",
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
            (item.properties?.InferenceComponentArn?.toString() ??
              item.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
              .replace(/\0/g, "");
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
