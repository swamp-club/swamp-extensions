// Auto-generated extension model for @swamp/aws/sagemaker/model-card
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker ModelCard (AWS::SageMaker::ModelCard).
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

const ModelOverviewSchema = z.object({
  ModelDescription: z.string().max(1024).describe("description of model.")
    .optional(),
  ModelOwner: z.string().max(1024).describe("Owner of model.").optional(),
  ModelCreator: z.string().max(1024).describe("Creator of model.").optional(),
  ProblemType: z.string().max(1024).describe(
    "Problem being solved with the model.",
  ).optional(),
  AlgorithmType: z.string().max(1024).describe(
    "Algorithm used to solve the problem.",
  ).optional(),
  ModelId: z.string().max(1024).describe(
    "SageMaker Model Arn or Non SageMaker Model id.",
  ).optional(),
  ModelArtifact: z.array(z.string().max(1024)).describe(
    "Location of the model artifact.",
  ).optional(),
  ModelName: z.string().max(1024).describe("Name of the model.").optional(),
  ModelVersion: z.number().min(1).describe("Version of the model.").optional(),
  InferenceEnvironment: z.object({
    ContainerImage: z.array(z.string().max(1024)).describe(
      "SageMaker inference image uri.",
    ).optional(),
  }).describe("Overview about the inference.").optional(),
});

const SourceAlgorithmSchema = z.object({
  AlgorithmName: z.string().max(170).describe(
    "The name of an algorithm that was used to create the model package. The algorithm must be either an algorithm resource in your SageMaker account or an algorithm in AWS Marketplace that you are subscribed to.",
  ),
  ModelDataUrl: z.string().max(1024).describe(
    "The Amazon S3 path where the model artifacts, which result from model training, are stored.",
  ).optional(),
});

const ContainerSchema = z.object({
  ModelDataUrl: z.string().max(1024).describe(
    "The Amazon S3 path where the model artifacts, which result from model training, are stored.",
  ).optional(),
  Image: z.string().max(255).describe(
    "Inference environment path. The Amazon EC2 Container Registry (Amazon ECR) path where inference code is stored.",
  ),
  NearestModelName: z.string().describe(
    "The name of a pre-trained machine learning benchmarked by Amazon SageMaker Inference Recommender model that matches your model.",
  ).optional(),
});

const InferenceSpecificationSchema = z.object({
  Containers: z.array(ContainerSchema).describe(
    "Contains inference related information which were used to create model package.",
  ),
});

const ModelPackageDetailsSchema = z.object({
  ModelPackageDescription: z.string().max(1024).describe(
    "A brief summary of the model package",
  ).optional(),
  ModelPackageArn: z.string().min(1).max(2048).describe(
    "The Amazon Resource Name (ARN) of the model package",
  ).optional(),
  ModelPackageStatus: z.enum([
    "Pending",
    "InProgress",
    "Completed",
    "Failed",
    "Deleting",
  ]).describe("Current status of model package").optional(),
  ModelApprovalStatus: z.enum(["Approved", "Rejected", "PendingManualApproval"])
    .describe("Current approval status of model package").optional(),
  ApprovalDescription: z.string().max(1024).describe(
    "A description provided for the model approval",
  ).optional(),
  ModelPackageGroupName: z.string().min(1).max(63).describe(
    "If the model is a versioned model, the name of the model group that the versioned model belongs to.",
  ).optional(),
  ModelPackageName: z.string().min(1).max(63).describe(
    "Name of the model package",
  ).optional(),
  ModelPackageVersion: z.number().min(1).describe(
    "Version of the model package",
  ).optional(),
  Domain: z.string().describe(
    "The machine learning domain of the model package you specified. Common machine learning domains include computer vision and natural language processing.",
  ).optional(),
  Task: z.string().describe(
    "The machine learning task you specified that your model package accomplishes. Common machine learning tasks include object detection and image classification.",
  ).optional(),
  SourceAlgorithms: z.array(SourceAlgorithmSchema).describe(
    "A list of algorithms that were used to create a model package.",
  ).optional(),
  InferenceSpecification: InferenceSpecificationSchema.describe(
    "Details about inference jobs that can be run with models based on this model package.",
  ).optional(),
});

const IntendedUsesSchema = z.object({
  PurposeOfModel: z.string().max(2048).describe("Why the model was developed?")
    .optional(),
  IntendedUses: z.string().max(2048).describe("intended use cases.").optional(),
  FactorsAffectingModelEfficiency: z.string().max(2048).optional(),
  RiskRating: z.enum(["High", "Medium", "Low", "Unknown"]).describe(
    "Risk rating of model.",
  ).optional(),
  ExplanationsForRiskRating: z.string().max(2048).optional(),
});

const BusinessDetailsSchema = z.object({
  BusinessProblem: z.string().max(2048).describe(
    "What business problem does the model solve?",
  ).optional(),
  BusinessStakeholders: z.string().max(2048).describe("Business stakeholders.")
    .optional(),
  LineOfBusiness: z.string().max(2048).describe("Line of business.").optional(),
});

const ObjectiveFunctionSchema = z.object({
  Function: z.object({
    Function: z.enum(["Maximize", "Minimize"]).optional(),
    Facet: z.string().max(63).optional(),
    Condition: z.string().max(63).optional(),
  }).describe("objective function that training job is optimized for.")
    .optional(),
  Notes: z.string().max(1024).optional(),
});

const TrainingMetricSchema = z.object({
  Name: z.string().regex(new RegExp(".{1,255}")),
  Notes: z.string().max(1024).optional(),
  Value: z.number(),
});

const TrainingHyperParameterSchema = z.object({
  Name: z.string().regex(new RegExp(".{1,255}")),
  Value: z.string().regex(new RegExp(".{1,255}")),
});

const TrainingDetailsSchema = z.object({
  ObjectiveFunction: ObjectiveFunctionSchema.describe(
    "the objective function the model will optimize for.",
  ).optional(),
  TrainingObservations: z.string().max(1024).optional(),
  TrainingJobDetails: z.object({
    TrainingArn: z.string().max(1024).describe("SageMaker Training job arn.")
      .optional(),
    TrainingDatasets: z.array(z.string().max(1024)).describe(
      "Location of the model datasets.",
    ).optional(),
    TrainingEnvironment: z.object({
      ContainerImage: z.array(z.string().max(1024)).describe(
        "SageMaker training image uri.",
      ).optional(),
    }).optional(),
    TrainingMetrics: z.array(TrainingMetricSchema).optional(),
    UserProvidedTrainingMetrics: z.array(TrainingMetricSchema).optional(),
    HyperParameters: z.array(TrainingHyperParameterSchema).optional(),
    UserProvidedHyperParameters: z.array(TrainingHyperParameterSchema)
      .optional(),
  }).optional(),
});

const MetricGroupSchema = z.object({
  Name: z.string().regex(new RegExp(".{1,63}")),
  MetricData: z.array(z.object({
    SimpleMetric: z.unknown().optional(),
    LinearGraphMetric: z.unknown().optional(),
    BarChartMetric: z.unknown().optional(),
    MatrixMetric: z.unknown().optional(),
  })),
});

const EvaluationDetailSchema = z.object({
  Name: z.string().regex(new RegExp(".{1,63}")),
  EvaluationObservation: z.string().max(2096).optional(),
  EvaluationJobArn: z.string().max(256).optional(),
  Datasets: z.array(z.string().max(1024)).optional(),
  Metadata: z.record(z.string(), z.string().max(1024)).describe(
    "additional attributes associated with the evaluation results.",
  ).optional(),
  MetricGroups: z.array(MetricGroupSchema).optional(),
});

const AdditionalInformationSchema = z.object({
  EthicalConsiderations: z.string().max(2048).describe(
    "Any ethical considerations that the author wants to provide.",
  ).optional(),
  CaveatsAndRecommendations: z.string().max(2048).describe(
    "Caveats and recommendations for people who might use this model in their applications.",
  ).optional(),
  CustomDetails: z.record(z.string(), z.string().max(1024)).describe(
    "customer details.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The tag key. Tag keys must be unique per resource.",
  ),
  Value: z.string().max(256).describe("The tag value."),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ModelCardName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe("The unique name of the model card."),
  SecurityConfig: z.object({
    KmsKeyId: z.string().max(2048).regex(new RegExp(".*")).describe(
      "A Key Management Service key ID to use for encrypting a model card.",
    ).optional(),
  }).describe(
    "An optional Key Management Service key to encrypt, decrypt, and re-encrypt model card content for regulated workloads with highly sensitive data.",
  ).optional(),
  ModelCardStatus: z.enum(["Draft", "PendingReview", "Approved", "Archived"])
    .describe(
      "The approval status of the model card within your organization. Different organizations might have different criteria for model card review and approval.",
    ),
  Content: z.object({
    ModelOverview: ModelOverviewSchema.describe("Overview about the model.")
      .optional(),
    ModelPackageDetails: ModelPackageDetailsSchema.describe(
      "Metadata information related to model package version",
    ).optional(),
    IntendedUses: IntendedUsesSchema.describe("Intended usage of model.")
      .optional(),
    BusinessDetails: BusinessDetailsSchema.describe("Business details.")
      .optional(),
    TrainingDetails: TrainingDetailsSchema.describe(
      "Overview about the training.",
    ).optional(),
    EvaluationDetails: z.array(EvaluationDetailSchema).optional(),
    AdditionalInformation: AdditionalInformationSchema.optional(),
  }).describe("The content of the model card."),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs used to manage metadata for model cards.",
  ).optional(),
});

const StateSchema = z.object({
  ModelCardArn: z.string().optional(),
  ModelCardVersion: z.number().optional(),
  ModelCardName: z.string(),
  SecurityConfig: z.object({
    KmsKeyId: z.string(),
  }).optional(),
  ModelCardStatus: z.string().optional(),
  Content: z.object({
    ModelOverview: ModelOverviewSchema,
    ModelPackageDetails: ModelPackageDetailsSchema,
    IntendedUses: IntendedUsesSchema,
    BusinessDetails: BusinessDetailsSchema,
    TrainingDetails: TrainingDetailsSchema,
    EvaluationDetails: z.array(EvaluationDetailSchema),
    AdditionalInformation: AdditionalInformationSchema,
  }).optional(),
  CreationTime: z.string().optional(),
  CreatedBy: z.object({
    UserProfileArn: z.string(),
    UserProfileName: z.string(),
    DomainId: z.string(),
  }).optional(),
  LastModifiedTime: z.string().optional(),
  LastModifiedBy: z.object({
    UserProfileArn: z.string(),
    UserProfileName: z.string(),
    DomainId: z.string(),
  }).optional(),
  ModelCardProcessingStatus: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ModelCardName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe("The unique name of the model card.").optional(),
  SecurityConfig: z.object({
    KmsKeyId: z.string().max(2048).regex(new RegExp(".*")).describe(
      "A Key Management Service key ID to use for encrypting a model card.",
    ).optional(),
  }).describe(
    "An optional Key Management Service key to encrypt, decrypt, and re-encrypt model card content for regulated workloads with highly sensitive data.",
  ).optional(),
  ModelCardStatus: z.enum(["Draft", "PendingReview", "Approved", "Archived"])
    .describe(
      "The approval status of the model card within your organization. Different organizations might have different criteria for model card review and approval.",
    ).optional(),
  Content: z.object({
    ModelOverview: ModelOverviewSchema.describe("Overview about the model.")
      .optional(),
    ModelPackageDetails: ModelPackageDetailsSchema.describe(
      "Metadata information related to model package version",
    ).optional(),
    IntendedUses: IntendedUsesSchema.describe("Intended usage of model.")
      .optional(),
    BusinessDetails: BusinessDetailsSchema.describe("Business details.")
      .optional(),
    TrainingDetails: TrainingDetailsSchema.describe(
      "Overview about the training.",
    ).optional(),
    EvaluationDetails: z.array(EvaluationDetailSchema).optional(),
    AdditionalInformation: AdditionalInformationSchema.optional(),
  }).describe("The content of the model card.").optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs used to manage metadata for model cards.",
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

/** Swamp extension model for SageMaker ModelCard. Registered at `@swamp/aws/sagemaker/model-card`. */
export const model = {
  type: "@swamp/aws/sagemaker/model-card",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker ModelCard resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker ModelCard",
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
          "AWS::SageMaker::ModelCard",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ModelCardName ?? g.ModelCardName)?.toString() ?? "current")
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
      description: "Get a SageMaker ModelCard",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker ModelCard",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::ModelCard",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.ModelCardName ?? context.globalArgs.ModelCardName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
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
    update: {
      description: "Update a SageMaker ModelCard",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ModelCardName?.toString() ?? "current").replace(
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
        const identifier = existing.ModelCardName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::ModelCard",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SageMaker::ModelCard",
          identifier,
          currentState,
          desiredState,
          ["ModelCardName", "SecurityConfig"],
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
      description: "Delete a SageMaker ModelCard",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker ModelCard",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::ModelCard",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.ModelCardName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync SageMaker ModelCard state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.ModelCardName?.toString() ?? "current").replace(
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
        const identifier = existing.ModelCardName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::ModelCard",
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
