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

// Auto-generated extension model for @swamp/aws/sagemaker/algorithm
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker Algorithm (AWS::SageMaker::Algorithm).
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

const IntegerParameterRangeSpecificationSchema = z.object({
  MinValue: z.string().max(256),
  MaxValue: z.string().max(256),
});

const ContinuousParameterRangeSpecificationSchema = z.object({
  MinValue: z.string().max(256),
  MaxValue: z.string().max(256),
});

const CategoricalParameterRangeSpecificationSchema = z.object({
  Values: z.array(z.string().max(256)),
});

const ParameterRangeSchema = z.object({
  IntegerParameterRangeSpecification: IntegerParameterRangeSpecificationSchema
    .optional(),
  ContinuousParameterRangeSpecification:
    ContinuousParameterRangeSpecificationSchema.optional(),
  CategoricalParameterRangeSpecification:
    CategoricalParameterRangeSpecificationSchema.optional(),
});

const HyperParameterSpecificationSchema = z.object({
  Name: z.string().max(256),
  Description: z.string().max(1024).optional(),
  Type: z.enum(["Integer", "Continuous", "Categorical", "FreeText"]),
  Range: ParameterRangeSchema.optional(),
  IsTunable: z.boolean().optional(),
  IsRequired: z.boolean().optional(),
  DefaultValue: z.string().max(2500).optional(),
});

const MetricDefinitionSchema = z.object({
  Name: z.string().min(1).max(255).regex(new RegExp("^.+$")),
  Regex: z.string().min(1).max(500).regex(new RegExp("^.+$")),
});

const ChannelSpecificationSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z0-9\\.\\-_]+$")),
  Description: z.string().max(1024).optional(),
  IsRequired: z.boolean().optional(),
  SupportedContentTypes: z.array(z.string().max(256)),
  SupportedCompressionTypes: z.array(z.enum(["None", "Gzip"])).optional(),
  SupportedInputModes: z.array(z.enum(["Pipe", "File", "FastFile"])),
});

const HyperParameterTuningJobObjectiveSchema = z.object({
  Type: z.enum(["Maximize", "Minimize"]),
  MetricName: z.string().min(1).max(255).regex(new RegExp("^.+$")),
});

const ModelInputSchema = z.object({
  DataInputConfig: z.string(),
});

const ModelPackageContainerDefinitionSchema = z.object({
  ContainerHostname: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).optional(),
  Image: z.string().max(255),
  ImageDigest: z.string().max(72).regex(
    new RegExp("^[Ss][Hh][Aa]256:[0-9a-fA-F]{64}$"),
  ).optional(),
  Environment: z.record(z.string(), z.string()).optional(),
  ModelInput: ModelInputSchema.optional(),
  Framework: z.string().optional(),
  FrameworkVersion: z.string().min(3).max(10).regex(
    new RegExp("^[0-9]\\.[A-Za-z0-9.-]+$"),
  ).optional(),
  NearestModelName: z.string().optional(),
  IsCheckpoint: z.boolean().optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
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
  AlgorithmName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe("The name of the algorithm."),
  AlgorithmDescription: z.string().max(1024).describe(
    "A description of the algorithm.",
  ).optional(),
  TrainingSpecification: z.object({
    TrainingImage: z.string().max(255),
    TrainingImageDigest: z.string().max(72).regex(
      new RegExp("^[Ss][Hh][Aa]256:[0-9a-fA-F]{64}$"),
    ).optional(),
    SupportedHyperParameters: z.array(HyperParameterSpecificationSchema)
      .optional(),
    SupportedTrainingInstanceTypes: z.array(z.string()),
    SupportsDistributedTraining: z.boolean().optional(),
    MetricDefinitions: z.array(MetricDefinitionSchema).optional(),
    TrainingChannels: z.array(ChannelSpecificationSchema),
    SupportedTuningJobObjectiveMetrics: z.array(
      HyperParameterTuningJobObjectiveSchema,
    ).optional(),
  }),
  InferenceSpecification: z.object({
    Containers: z.array(ModelPackageContainerDefinitionSchema),
    SupportedTransformInstanceTypes: z.array(z.string()).optional(),
    SupportedRealtimeInferenceInstanceTypes: z.array(z.string()).optional(),
    SupportedContentTypes: z.array(z.string().max(256)).optional(),
    SupportedResponseMIMETypes: z.array(
      z.string().max(1024).regex(new RegExp("^[-\\w]+\\/.+$")),
    ).optional(),
  }).optional(),
  CertifyForMarketplace: z.boolean().describe(
    "Whether to certify the algorithm so that it can be listed in AWS Marketplace.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  AlgorithmName: z.string().optional(),
  AlgorithmArn: z.string(),
  AlgorithmDescription: z.string().optional(),
  TrainingSpecification: z.object({
    TrainingImage: z.string(),
    TrainingImageDigest: z.string(),
    SupportedHyperParameters: z.array(HyperParameterSpecificationSchema),
    SupportedTrainingInstanceTypes: z.array(z.string()),
    SupportsDistributedTraining: z.boolean(),
    MetricDefinitions: z.array(MetricDefinitionSchema),
    TrainingChannels: z.array(ChannelSpecificationSchema),
    SupportedTuningJobObjectiveMetrics: z.array(
      HyperParameterTuningJobObjectiveSchema,
    ),
  }).optional(),
  InferenceSpecification: z.object({
    Containers: z.array(ModelPackageContainerDefinitionSchema),
    SupportedTransformInstanceTypes: z.array(z.string()),
    SupportedRealtimeInferenceInstanceTypes: z.array(z.string()),
    SupportedContentTypes: z.array(z.string()),
    SupportedResponseMIMETypes: z.array(z.string()),
  }).optional(),
  CertifyForMarketplace: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  CreationTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AlgorithmName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe("The name of the algorithm.").optional(),
  AlgorithmDescription: z.string().max(1024).describe(
    "A description of the algorithm.",
  ).optional(),
  TrainingSpecification: z.object({
    TrainingImage: z.string().max(255).optional(),
    TrainingImageDigest: z.string().max(72).regex(
      new RegExp("^[Ss][Hh][Aa]256:[0-9a-fA-F]{64}$"),
    ).optional(),
    SupportedHyperParameters: z.array(HyperParameterSpecificationSchema)
      .optional(),
    SupportedTrainingInstanceTypes: z.array(z.string()).optional(),
    SupportsDistributedTraining: z.boolean().optional(),
    MetricDefinitions: z.array(MetricDefinitionSchema).optional(),
    TrainingChannels: z.array(ChannelSpecificationSchema).optional(),
    SupportedTuningJobObjectiveMetrics: z.array(
      HyperParameterTuningJobObjectiveSchema,
    ).optional(),
  }).optional(),
  InferenceSpecification: z.object({
    Containers: z.array(ModelPackageContainerDefinitionSchema).optional(),
    SupportedTransformInstanceTypes: z.array(z.string()).optional(),
    SupportedRealtimeInferenceInstanceTypes: z.array(z.string()).optional(),
    SupportedContentTypes: z.array(z.string().max(256)).optional(),
    SupportedResponseMIMETypes: z.array(
      z.string().max(1024).regex(new RegExp("^[-\\w]+\\/.+$")),
    ).optional(),
  }).optional(),
  CertifyForMarketplace: z.boolean().describe(
    "Whether to certify the algorithm so that it can be listed in AWS Marketplace.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for SageMaker Algorithm. Registered at `@swamp/aws/sagemaker/algorithm`. */
export const model = {
  type: "@swamp/aws/sagemaker/algorithm",
  version: "2026.06.25.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker Algorithm resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker Algorithm",
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
          "AWS::SageMaker::Algorithm",
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
      description: "Get a SageMaker Algorithm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Algorithm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::Algorithm",
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
      description: "Update a SageMaker Algorithm",
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
        const identifier = existing.AlgorithmArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::Algorithm",
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
          "AWS::SageMaker::Algorithm",
          identifier,
          currentState,
          desiredState,
          [
            "AlgorithmName",
            "AlgorithmDescription",
            "TrainingSpecification",
            "InferenceSpecification",
            "CertifyForMarketplace",
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
      description: "Delete a SageMaker Algorithm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Algorithm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::Algorithm",
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
      description: "Sync SageMaker Algorithm state from AWS",
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
        const identifier = existing.AlgorithmArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::Algorithm",
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
