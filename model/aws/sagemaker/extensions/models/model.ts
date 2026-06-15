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

// Auto-generated extension model for @swamp/aws/sagemaker/model
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker Model (AWS::SageMaker::Model).
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

const RepositoryAuthConfigSchema = z.object({
  RepositoryCredentialsProviderArn: z.string().describe(
    "The Amazon Resource Name (ARN) of an AWS Lambda function that provides credentials to authenticate to the private Docker registry where your model image is hosted. For information about how to create an AWS Lambda function, see [Create a Lambda function with the console](https://docs.aws.amazon.com/lambda/latest/dg/getting-started-create-function.html) in the AWS Lambda Developer Guide",
  ),
});

const ImageConfigSchema = z.object({
  RepositoryAccessMode: z.enum(["Platform", "Vpc"]).describe(
    "Set this to one of the following values: Platform - The model image is hosted in Amazon ECR. Vpc - The model image is hosted in a private Docker registry in your VPC.",
  ),
  RepositoryAuthConfig: RepositoryAuthConfigSchema.describe(
    "Specifies an authentication configuration for the private docker registry where your model image is hosted. Specify a value for this property only if you specified `Vpc` as the value for the `RepositoryAccessMode` field of the `ImageConfig` object that you passed to a call to `CreateModel` and the private Docker registry where the model image is hosted requires authentication.",
  ).optional(),
});

const HubAccessConfigSchema = z.object({
  HubContentArn: z.string().describe(
    "The ARN of the hub content for which deployment access is allowed.",
  ),
});

const ModelAccessConfigSchema = z.object({
  AcceptEula: z.boolean().describe(
    "Specifies agreement to the model end-user license agreement (EULA). The `AcceptEula` value must be explicitly defined as `True` in order to accept the EULA that this model requires. You are responsible for reviewing and complying with any applicable license terms and making sure they are acceptable for your use case before downloading or using a model.",
  ),
});

const S3DataSourceSchema = z.object({
  CompressionType: z.enum(["None", "Gzip"]).describe(
    "Specifies how the ML model data is prepared.",
  ),
  HubAccessConfig: HubAccessConfigSchema.describe(
    "Configuration information specifying which hub contents have accessible deployment options.",
  ).optional(),
  ModelAccessConfig: ModelAccessConfigSchema.describe(
    "The access configuration file to control access to the ML model. You can explicitly accept the model end-user license agreement (EULA) within the `ModelAccessConfig`.",
  ).optional(),
  S3DataType: z.enum(["S3Prefix", "S3Object"]).describe(
    "Specifies the type of ML model data to deploy.",
  ),
  S3Uri: z.string().describe(
    "Specifies the S3 path of ML model data to deploy.",
  ),
});

const ModelDataSourceSchema = z.object({
  S3DataSource: S3DataSourceSchema.describe(
    "Specifies the S3 location of ML model data to deploy.",
  ),
});

const MultiModelConfigSchema = z.object({
  ModelCacheSetting: z.enum(["Enabled", "Disabled"]).describe(
    "Whether to cache models for a multi-model endpoint. By default, multi-model endpoints cache models so that a model does not have to be loaded into memory each time it is invoked. Some use cases do not benefit from model caching. For example, if an endpoint hosts a large number of models that are each invoked infrequently, the endpoint might perform better if you disable model caching. To disable model caching, set the value of this parameter to `Disabled`.",
  ).optional(),
});

const ContainerDefinitionSchema = z.object({
  ContainerHostname: z.string().describe(
    "This parameter is ignored for models that contain only a PrimaryContainer. When a ContainerDefinition is part of an inference pipeline, the value of the parameter uniquely identifies the container for the purposes of logging and metrics. For information, see [Use Logs and Metrics to Monitor an Inference Pipeline](https://docs.aws.amazon.com/sagemaker/latest/dg/inference-pipeline-logs-metrics.html). If you don't specify a value for this parameter for a ContainerDefinition that is part of an inference pipeline, a unique name is automatically assigned based on the position of the ContainerDefinition in the pipeline. If you specify a value for the ContainerHostName for any ContainerDefinition that is part of an inference pipeline, you must specify a value for the ContainerHostName parameter of every ContainerDefinition in that pipeline.",
  ).optional(),
  Environment: z.record(z.string(), z.unknown()).describe(
    "The environment variables to set in the Docker container. Don't include any sensitive data in your environment variables. The maximum length of each key and value in the Environment map is 1024 bytes. The maximum length of all keys and values in the map, combined, is 32 KB. If you pass multiple containers to a CreateModel request, then the maximum length of all of their maps, combined, is also 32 KB.",
  ).optional(),
  Image: z.string().describe(
    "The path where inference code is stored. This can be either in Amazon EC2 Container Registry or in a Docker registry that is accessible from the same VPC that you configure for your endpoint. If you are using your own custom algorithm instead of an algorithm provided by SageMaker, the inference code must meet SageMaker requirements. SageMaker supports both registry/repository[:tag] and registry/repository[@digest] image path formats. For more information, see [Using Your Own Algorithms with Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/your-algorithms.html).",
  ).optional(),
  ImageConfig: ImageConfigSchema.describe(
    "Specifies whether the model container is in Amazon ECR or a private Docker registry accessible from your Amazon Virtual Private Cloud (VPC).",
  ).optional(),
  InferenceSpecificationName: z.string().describe(
    "The inference specification name in the model package version.",
  ).optional(),
  Mode: z.enum(["SingleModel", "MultiModel"]).describe(
    "Whether the container hosts a single model or multiple models.",
  ).optional(),
  ModelDataSource: ModelDataSourceSchema.describe(
    "Specifies the location of ML model data to deploy. If specified, you must specify one and only one of the available data sources.",
  ).optional(),
  ModelDataUrl: z.string().describe(
    "The S3 path where the model artifacts, which result from model training, are stored. This path must point to a single gzip compressed tar archive (.tar.gz suffix). The S3 path is required for SageMaker built-in algorithms, but not if you use your own algorithms. For more information on built-in algorithms, see [Common Parameters](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-algo-docker-registry-paths.html). If you provide a value for this parameter, SageMaker uses AWS Security Token Service to download model artifacts from the S3 path you provide. AWS STS is activated in your AWS account by default. If you previously deactivated AWS STS for a region, you need to reactivate AWS STS for that region. For more information, see [Activating and Deactivating AWS STS in an AWS Region](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_enable-regions.html) in the AWS Identity and Access Management User Guide",
  ).optional(),
  ModelPackageName: z.string().describe(
    "The name or Amazon Resource Name (ARN) of the model package to use to create the model.",
  ).optional(),
  MultiModelConfig: MultiModelConfigSchema.describe(
    "Specifies additional configuration for multi-model endpoints.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().describe(
    "The tag key. Tag keys must be unique per resource.",
  ),
  Key: z.string().describe("The tag value."),
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
  Containers: z.array(ContainerDefinitionSchema).describe(
    "Specifies the containers in the inference pipeline.",
  ).optional(),
  EnableNetworkIsolation: z.boolean().describe(
    "Isolates the model container. No inbound or outbound network calls can be made to or from the model container.",
  ).optional(),
  ExecutionRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role that you specified for the model.",
  ).optional(),
  InferenceExecutionConfig: z.object({
    Mode: z.enum(["Serial", "Direct"]).describe(
      "How containers in a multi-container are run.",
    ),
  }).describe(
    "Specifies details about how containers in a multi-container endpoint are run.",
  ).optional(),
  ModelName: z.string().describe("The name of the new model.").optional(),
  PrimaryContainer: z.object({
    ContainerHostname: z.string().describe(
      "This parameter is ignored for models that contain only a PrimaryContainer. When a ContainerDefinition is part of an inference pipeline, the value of the parameter uniquely identifies the container for the purposes of logging and metrics. For information, see [Use Logs and Metrics to Monitor an Inference Pipeline](https://docs.aws.amazon.com/sagemaker/latest/dg/inference-pipeline-logs-metrics.html). If you don't specify a value for this parameter for a ContainerDefinition that is part of an inference pipeline, a unique name is automatically assigned based on the position of the ContainerDefinition in the pipeline. If you specify a value for the ContainerHostName for any ContainerDefinition that is part of an inference pipeline, you must specify a value for the ContainerHostName parameter of every ContainerDefinition in that pipeline.",
    ).optional(),
    Environment: z.record(z.string(), z.unknown()).describe(
      "The environment variables to set in the Docker container. Don't include any sensitive data in your environment variables. The maximum length of each key and value in the Environment map is 1024 bytes. The maximum length of all keys and values in the map, combined, is 32 KB. If you pass multiple containers to a CreateModel request, then the maximum length of all of their maps, combined, is also 32 KB.",
    ).optional(),
    Image: z.string().describe(
      "The path where inference code is stored. This can be either in Amazon EC2 Container Registry or in a Docker registry that is accessible from the same VPC that you configure for your endpoint. If you are using your own custom algorithm instead of an algorithm provided by SageMaker, the inference code must meet SageMaker requirements. SageMaker supports both registry/repository[:tag] and registry/repository[@digest] image path formats. For more information, see [Using Your Own Algorithms with Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/your-algorithms.html).",
    ).optional(),
    ImageConfig: ImageConfigSchema.describe(
      "Specifies whether the model container is in Amazon ECR or a private Docker registry accessible from your Amazon Virtual Private Cloud (VPC).",
    ).optional(),
    InferenceSpecificationName: z.string().describe(
      "The inference specification name in the model package version.",
    ).optional(),
    Mode: z.enum(["SingleModel", "MultiModel"]).describe(
      "Whether the container hosts a single model or multiple models.",
    ).optional(),
    ModelDataSource: ModelDataSourceSchema.describe(
      "Specifies the location of ML model data to deploy. If specified, you must specify one and only one of the available data sources.",
    ).optional(),
    ModelDataUrl: z.string().describe(
      "The S3 path where the model artifacts, which result from model training, are stored. This path must point to a single gzip compressed tar archive (.tar.gz suffix). The S3 path is required for SageMaker built-in algorithms, but not if you use your own algorithms. For more information on built-in algorithms, see [Common Parameters](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-algo-docker-registry-paths.html). If you provide a value for this parameter, SageMaker uses AWS Security Token Service to download model artifacts from the S3 path you provide. AWS STS is activated in your AWS account by default. If you previously deactivated AWS STS for a region, you need to reactivate AWS STS for that region. For more information, see [Activating and Deactivating AWS STS in an AWS Region](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_enable-regions.html) in the AWS Identity and Access Management User Guide",
    ).optional(),
    ModelPackageName: z.string().describe(
      "The name or Amazon Resource Name (ARN) of the model package to use to create the model.",
    ).optional(),
    MultiModelConfig: MultiModelConfigSchema.describe(
      "Specifies additional configuration for multi-model endpoints.",
    ).optional(),
  }).describe("Describes the container, as part of model definition.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs. You can use tags to categorize your AWS resources in different ways, for example, by purpose, owner, or environment. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html).",
  ).optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()).describe(
      "The VPC security group IDs, in the form `sg-xxxxxxxx`. Specify the security groups for the VPC that is specified in the `Subnets` field.",
    ),
    Subnets: z.array(z.string()).describe(
      "The ID of the subnets in the VPC to which you want to connect your training job or model. For information about the availability of specific instance types, see [Supported Instance Types and Availability Zones](https://docs.aws.amazon.com/sagemaker/latest/dg/instance-types-az.html).",
    ),
  }).describe(
    "Specifies an Amazon Virtual Private Cloud (VPC) that your SageMaker jobs, hosted models, and compute resources have access to. You can control access to and from your resources by configuring a VPC. For more information, see [Give SageMaker Access to Resources in your Amazon VPC](https://docs.aws.amazon.com/sagemaker/latest/dg/infrastructure-give-access.html).",
  ).optional(),
});

const StateSchema = z.object({
  Containers: z.array(ContainerDefinitionSchema).optional(),
  EnableNetworkIsolation: z.boolean().optional(),
  ExecutionRoleArn: z.string().optional(),
  InferenceExecutionConfig: z.object({
    Mode: z.string(),
  }).optional(),
  ModelArn: z.string(),
  ModelName: z.string().optional(),
  PrimaryContainer: ContainerDefinitionSchema.optional(),
  Tags: z.array(TagSchema).optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()),
    Subnets: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Containers: z.array(ContainerDefinitionSchema).describe(
    "Specifies the containers in the inference pipeline.",
  ).optional(),
  EnableNetworkIsolation: z.boolean().describe(
    "Isolates the model container. No inbound or outbound network calls can be made to or from the model container.",
  ).optional(),
  ExecutionRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role that you specified for the model.",
  ).optional(),
  InferenceExecutionConfig: z.object({
    Mode: z.enum(["Serial", "Direct"]).describe(
      "How containers in a multi-container are run.",
    ).optional(),
  }).describe(
    "Specifies details about how containers in a multi-container endpoint are run.",
  ).optional(),
  ModelName: z.string().describe("The name of the new model.").optional(),
  PrimaryContainer: z.object({
    ContainerHostname: z.string().describe(
      "This parameter is ignored for models that contain only a PrimaryContainer. When a ContainerDefinition is part of an inference pipeline, the value of the parameter uniquely identifies the container for the purposes of logging and metrics. For information, see [Use Logs and Metrics to Monitor an Inference Pipeline](https://docs.aws.amazon.com/sagemaker/latest/dg/inference-pipeline-logs-metrics.html). If you don't specify a value for this parameter for a ContainerDefinition that is part of an inference pipeline, a unique name is automatically assigned based on the position of the ContainerDefinition in the pipeline. If you specify a value for the ContainerHostName for any ContainerDefinition that is part of an inference pipeline, you must specify a value for the ContainerHostName parameter of every ContainerDefinition in that pipeline.",
    ).optional(),
    Environment: z.record(z.string(), z.unknown()).describe(
      "The environment variables to set in the Docker container. Don't include any sensitive data in your environment variables. The maximum length of each key and value in the Environment map is 1024 bytes. The maximum length of all keys and values in the map, combined, is 32 KB. If you pass multiple containers to a CreateModel request, then the maximum length of all of their maps, combined, is also 32 KB.",
    ).optional(),
    Image: z.string().describe(
      "The path where inference code is stored. This can be either in Amazon EC2 Container Registry or in a Docker registry that is accessible from the same VPC that you configure for your endpoint. If you are using your own custom algorithm instead of an algorithm provided by SageMaker, the inference code must meet SageMaker requirements. SageMaker supports both registry/repository[:tag] and registry/repository[@digest] image path formats. For more information, see [Using Your Own Algorithms with Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/your-algorithms.html).",
    ).optional(),
    ImageConfig: ImageConfigSchema.describe(
      "Specifies whether the model container is in Amazon ECR or a private Docker registry accessible from your Amazon Virtual Private Cloud (VPC).",
    ).optional(),
    InferenceSpecificationName: z.string().describe(
      "The inference specification name in the model package version.",
    ).optional(),
    Mode: z.enum(["SingleModel", "MultiModel"]).describe(
      "Whether the container hosts a single model or multiple models.",
    ).optional(),
    ModelDataSource: ModelDataSourceSchema.describe(
      "Specifies the location of ML model data to deploy. If specified, you must specify one and only one of the available data sources.",
    ).optional(),
    ModelDataUrl: z.string().describe(
      "The S3 path where the model artifacts, which result from model training, are stored. This path must point to a single gzip compressed tar archive (.tar.gz suffix). The S3 path is required for SageMaker built-in algorithms, but not if you use your own algorithms. For more information on built-in algorithms, see [Common Parameters](https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-algo-docker-registry-paths.html). If you provide a value for this parameter, SageMaker uses AWS Security Token Service to download model artifacts from the S3 path you provide. AWS STS is activated in your AWS account by default. If you previously deactivated AWS STS for a region, you need to reactivate AWS STS for that region. For more information, see [Activating and Deactivating AWS STS in an AWS Region](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_enable-regions.html) in the AWS Identity and Access Management User Guide",
    ).optional(),
    ModelPackageName: z.string().describe(
      "The name or Amazon Resource Name (ARN) of the model package to use to create the model.",
    ).optional(),
    MultiModelConfig: MultiModelConfigSchema.describe(
      "Specifies additional configuration for multi-model endpoints.",
    ).optional(),
  }).describe("Describes the container, as part of model definition.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs. You can use tags to categorize your AWS resources in different ways, for example, by purpose, owner, or environment. For more information, see [Tagging AWS Resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html).",
  ).optional(),
  VpcConfig: z.object({
    SecurityGroupIds: z.array(z.string()).describe(
      "The VPC security group IDs, in the form `sg-xxxxxxxx`. Specify the security groups for the VPC that is specified in the `Subnets` field.",
    ).optional(),
    Subnets: z.array(z.string()).describe(
      "The ID of the subnets in the VPC to which you want to connect your training job or model. For information about the availability of specific instance types, see [Supported Instance Types and Availability Zones](https://docs.aws.amazon.com/sagemaker/latest/dg/instance-types-az.html).",
    ).optional(),
  }).describe(
    "Specifies an Amazon Virtual Private Cloud (VPC) that your SageMaker jobs, hosted models, and compute resources have access to. You can control access to and from your resources by configuring a VPC. For more information, see [Give SageMaker Access to Resources in your Amazon VPC](https://docs.aws.amazon.com/sagemaker/latest/dg/infrastructure-give-access.html).",
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

/** Swamp extension model for SageMaker Model. Registered at `@swamp/aws/sagemaker/model`. */
export const model = {
  type: "@swamp/aws/sagemaker/model",
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
      toVersion: "2026.05.27.1",
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
      description: "SageMaker Model resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker Model",
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
          "AWS::SageMaker::Model",
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
      description: "Get a SageMaker Model",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Model",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::Model",
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
      description: "Update a SageMaker Model",
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
        const identifier = existing.ModelArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::Model",
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
          "AWS::SageMaker::Model",
          identifier,
          currentState,
          desiredState,
          [
            "ExecutionRoleArn",
            "EnableNetworkIsolation",
            "InferenceExecutionConfig",
            "PrimaryContainer",
            "ModelName",
            "VpcConfig",
            "Containers",
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
      description: "Delete a SageMaker Model",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Model",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::Model",
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
      description: "Sync SageMaker Model state from AWS",
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
        const identifier = existing.ModelArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::Model",
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
