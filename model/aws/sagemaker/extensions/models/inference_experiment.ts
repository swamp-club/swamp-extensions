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

// Auto-generated extension model for @swamp/aws/sagemaker/inference-experiment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker InferenceExperiment (AWS::SageMaker::InferenceExperiment).
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

const CaptureContentTypeHeaderSchema = z.object({
  CsvContentTypes: z.array(
    z.string().min(1).max(256).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*/[a-zA-Z0-9](-*[a-zA-Z0-9.])*"),
    ),
  ).describe(
    "The list of all content type headers that SageMaker will treat as CSV and capture accordingly.",
  ).optional(),
  JsonContentTypes: z.array(
    z.string().min(1).max(256).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*/[a-zA-Z0-9](-*[a-zA-Z0-9.])*"),
    ),
  ).describe(
    "The list of all content type headers that SageMaker will treat as JSON and capture accordingly.",
  ).optional(),
});

const RealTimeInferenceConfigSchema = z.object({
  InstanceType: z.string().describe(
    "The instance type the model is deployed to.",
  ),
  InstanceCount: z.number().int().describe(
    "The number of instances of the type specified by InstanceType.",
  ),
});

const ModelInfrastructureConfigSchema = z.object({
  InfrastructureType: z.enum(["RealTimeInference"]).describe(
    "The type of the inference experiment that you want to run.",
  ),
  RealTimeInferenceConfig: RealTimeInferenceConfigSchema.describe(
    "The infrastructure configuration for deploying the model to a real-time inference endpoint.",
  ),
});

const ModelVariantConfigSchema = z.object({
  ModelName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
  ).describe("The name of the Amazon SageMaker Model entity."),
  VariantName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9]([\\-a-zA-Z0-9]*[a-zA-Z0-9])?"),
  ).describe("The name of the variant."),
  InfrastructureConfig: ModelInfrastructureConfigSchema.describe(
    "The configuration for the infrastructure that the model will be deployed to.",
  ),
});

const ShadowModelVariantConfigSchema = z.object({
  ShadowModelVariantName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9]([\\-a-zA-Z0-9]*[a-zA-Z0-9])?"),
  ).describe("The name of the shadow variant."),
  SamplingPercentage: z.number().int().max(100).describe(
    "The percentage of inference requests that Amazon SageMaker replicates from the production variant to the shadow variant.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
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
  Name: z.string().min(1).max(120).describe(
    "The name for the inference experiment.",
  ),
  Type: z.enum(["ShadowMode"]).describe(
    "The type of the inference experiment that you want to run.",
  ),
  Description: z.string().min(1).max(1024).regex(new RegExp(".*")).describe(
    "The description of the inference experiment.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to access model artifacts and container images, and manage Amazon SageMaker Inference endpoints for model deployment.",
  ),
  EndpointName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
  ).describe("The name of the endpoint used to run the inference experiment."),
  EndpointMetadata: z.object({
    EndpointName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
    ).describe(
      "The name of the endpoint used to run the inference experiment.",
    ),
    EndpointConfigName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
    ).describe("The name of the endpoint configuration.").optional(),
    EndpointStatus: z.enum([
      "Creating",
      "Updating",
      "SystemUpdating",
      "RollingBack",
      "InService",
      "OutOfService",
      "Deleting",
      "Failed",
    ]).describe(
      "The status of the endpoint. For possible values of the status of an endpoint.",
    ).optional(),
  }).describe(
    "The metadata of the endpoint on which the inference experiment ran.",
  ).optional(),
  Schedule: z.object({
    StartTime: z.string().describe(
      "The timestamp at which the inference experiment started or will start.",
    ).optional(),
    EndTime: z.string().describe(
      "The timestamp at which the inference experiment ended or will end.",
    ).optional(),
  }).describe(
    "The duration for which you want the inference experiment to run.",
  ).optional(),
  KmsKey: z.string().max(2048).regex(new RegExp(".*")).describe(
    "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance that hosts the endpoint.",
  ).optional(),
  DataStorageConfig: z.object({
    Destination: z.string().max(512).regex(
      new RegExp("^(https|s3)://([^/])/?(.*)$"),
    ).describe(
      "The Amazon S3 bucket where the inference request and response data is stored.",
    ),
    KmsKey: z.string().max(2048).regex(new RegExp(".*")).describe(
      "The AWS Key Management Service key that Amazon SageMaker uses to encrypt captured data at rest using Amazon S3 server-side encryption.",
    ).optional(),
    ContentType: CaptureContentTypeHeaderSchema.describe(
      "Configuration specifying how to treat different headers. If no headers are specified SageMaker will by default base64 encode when capturing the data.",
    ).optional(),
  }).describe(
    "The Amazon S3 location and configuration for storing inference request and response data.",
  ).optional(),
  ModelVariants: z.array(ModelVariantConfigSchema).describe(
    "An array of ModelVariantConfig objects. Each ModelVariantConfig object in the array describes the infrastructure configuration for the corresponding variant.",
  ),
  ShadowModeConfig: z.object({
    SourceModelVariantName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9]([\\-a-zA-Z0-9]*[a-zA-Z0-9])?"),
    ).describe(
      "The name of the production variant, which takes all the inference requests.",
    ),
    ShadowModelVariants: z.array(ShadowModelVariantConfigSchema).describe(
      "List of shadow variant configurations.",
    ),
  }).describe(
    "The configuration of ShadowMode inference experiment type. Use this field to specify a production variant which takes all the inference requests, and a shadow variant to which Amazon SageMaker replicates a percentage of the inference requests. For the shadow variant also specify the percentage of requests that Amazon SageMaker replicates.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  StatusReason: z.string().min(1).max(1024).regex(new RegExp(".*")).describe(
    "The error message or client-specified reason from the StopInferenceExperiment API, that explains the status of the inference experiment.",
  ).optional(),
  DesiredState: z.enum(["Running", "Completed", "Cancelled"]).describe(
    "The desired state of the experiment after starting or stopping operation.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Name: z.string(),
  Type: z.string().optional(),
  Description: z.string().optional(),
  RoleArn: z.string().optional(),
  EndpointName: z.string().optional(),
  EndpointMetadata: z.object({
    EndpointName: z.string(),
    EndpointConfigName: z.string(),
    EndpointStatus: z.string(),
  }).optional(),
  Schedule: z.object({
    StartTime: z.string(),
    EndTime: z.string(),
  }).optional(),
  KmsKey: z.string().optional(),
  DataStorageConfig: z.object({
    Destination: z.string(),
    KmsKey: z.string(),
    ContentType: CaptureContentTypeHeaderSchema,
  }).optional(),
  ModelVariants: z.array(ModelVariantConfigSchema).optional(),
  ShadowModeConfig: z.object({
    SourceModelVariantName: z.string(),
    ShadowModelVariants: z.array(ShadowModelVariantConfigSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  CreationTime: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  Status: z.string().optional(),
  StatusReason: z.string().optional(),
  DesiredState: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(120).describe(
    "The name for the inference experiment.",
  ).optional(),
  Type: z.enum(["ShadowMode"]).describe(
    "The type of the inference experiment that you want to run.",
  ).optional(),
  Description: z.string().min(1).max(1024).regex(new RegExp(".*")).describe(
    "The description of the inference experiment.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to access model artifacts and container images, and manage Amazon SageMaker Inference endpoints for model deployment.",
  ).optional(),
  EndpointName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
  ).describe("The name of the endpoint used to run the inference experiment.")
    .optional(),
  EndpointMetadata: z.object({
    EndpointName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
    ).describe("The name of the endpoint used to run the inference experiment.")
      .optional(),
    EndpointConfigName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
    ).describe("The name of the endpoint configuration.").optional(),
    EndpointStatus: z.enum([
      "Creating",
      "Updating",
      "SystemUpdating",
      "RollingBack",
      "InService",
      "OutOfService",
      "Deleting",
      "Failed",
    ]).describe(
      "The status of the endpoint. For possible values of the status of an endpoint.",
    ).optional(),
  }).describe(
    "The metadata of the endpoint on which the inference experiment ran.",
  ).optional(),
  Schedule: z.object({
    StartTime: z.string().describe(
      "The timestamp at which the inference experiment started or will start.",
    ).optional(),
    EndTime: z.string().describe(
      "The timestamp at which the inference experiment ended or will end.",
    ).optional(),
  }).describe(
    "The duration for which you want the inference experiment to run.",
  ).optional(),
  KmsKey: z.string().max(2048).regex(new RegExp(".*")).describe(
    "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance that hosts the endpoint.",
  ).optional(),
  DataStorageConfig: z.object({
    Destination: z.string().max(512).regex(
      new RegExp("^(https|s3)://([^/])/?(.*)$"),
    ).describe(
      "The Amazon S3 bucket where the inference request and response data is stored.",
    ).optional(),
    KmsKey: z.string().max(2048).regex(new RegExp(".*")).describe(
      "The AWS Key Management Service key that Amazon SageMaker uses to encrypt captured data at rest using Amazon S3 server-side encryption.",
    ).optional(),
    ContentType: CaptureContentTypeHeaderSchema.describe(
      "Configuration specifying how to treat different headers. If no headers are specified SageMaker will by default base64 encode when capturing the data.",
    ).optional(),
  }).describe(
    "The Amazon S3 location and configuration for storing inference request and response data.",
  ).optional(),
  ModelVariants: z.array(ModelVariantConfigSchema).describe(
    "An array of ModelVariantConfig objects. Each ModelVariantConfig object in the array describes the infrastructure configuration for the corresponding variant.",
  ).optional(),
  ShadowModeConfig: z.object({
    SourceModelVariantName: z.string().max(63).regex(
      new RegExp("^[a-zA-Z0-9]([\\-a-zA-Z0-9]*[a-zA-Z0-9])?"),
    ).describe(
      "The name of the production variant, which takes all the inference requests.",
    ).optional(),
    ShadowModelVariants: z.array(ShadowModelVariantConfigSchema).describe(
      "List of shadow variant configurations.",
    ).optional(),
  }).describe(
    "The configuration of ShadowMode inference experiment type. Use this field to specify a production variant which takes all the inference requests, and a shadow variant to which Amazon SageMaker replicates a percentage of the inference requests. For the shadow variant also specify the percentage of requests that Amazon SageMaker replicates.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  StatusReason: z.string().min(1).max(1024).regex(new RegExp(".*")).describe(
    "The error message or client-specified reason from the StopInferenceExperiment API, that explains the status of the inference experiment.",
  ).optional(),
  DesiredState: z.enum(["Running", "Completed", "Cancelled"]).describe(
    "The desired state of the experiment after starting or stopping operation.",
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

/** Swamp extension model for SageMaker InferenceExperiment. Registered at `@swamp/aws/sagemaker/inference-experiment`. */
export const model = {
  type: "@swamp/aws/sagemaker/inference-experiment",
  version: "2026.06.15.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker InferenceExperiment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker InferenceExperiment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SageMaker::InferenceExperiment",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SageMaker InferenceExperiment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker InferenceExperiment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::InferenceExperiment",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a SageMaker InferenceExperiment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::InferenceExperiment",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SageMaker::InferenceExperiment",
          identifier,
          currentState,
          desiredState,
          ["Name", "Type", "RoleArn", "EndpointName", "KmsKey"],
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
      description: "Delete a SageMaker InferenceExperiment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker InferenceExperiment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::InferenceExperiment",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync SageMaker InferenceExperiment state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::InferenceExperiment",
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
