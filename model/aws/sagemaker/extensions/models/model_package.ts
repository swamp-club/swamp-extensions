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

// Auto-generated extension model for @swamp/aws/sagemaker/model-package
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker ModelPackage (AWS::SageMaker::ModelPackage).
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

const ModelAccessConfigSchema = z.object({
  AcceptEula: z.boolean().describe(
    "Specifies agreement to the model end-user license agreement (EULA).",
  ),
});

const S3ModelDataSourceSchema = z.object({
  S3DataType: z.enum(["S3Prefix", "S3Object"]).describe(
    "Specifies the type of ML model data to deploy.",
  ),
  S3Uri: z.string().max(1024).regex(new RegExp("^(https|s3)://([^/]+)/?(.*)$"))
    .describe("Specifies the S3 path of ML model data to deploy."),
  CompressionType: z.enum(["None", "Gzip"]).describe(
    "Specifies how the ML model data is prepared.",
  ),
  ModelAccessConfig: ModelAccessConfigSchema.describe(
    "Specifies the access configuration file for the ML model.",
  ).optional(),
});

const ModelDataSourceSchema = z.object({
  S3DataSource: S3ModelDataSourceSchema.describe(
    "Specifies the S3 location of ML model data to deploy.",
  ).optional(),
});

const ModelPackageContainerDefinitionSchema = z.object({
  ContainerHostname: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The DNS host name for the Docker container.").optional(),
  Environment: z.record(z.string(), z.string().max(1024)).describe(
    "Sets the environment variables in the Docker container",
  ).optional(),
  ModelInput: z.object({
    DataInputConfig: z.string().min(1).max(1024).regex(new RegExp("[\\S\\s]+"))
      .describe("The input configuration object for the model."),
  }).optional(),
  Image: z.string().min(1).max(255).regex(new RegExp("[\\S]{1,255}")).describe(
    "The Amazon EC2 Container Registry (Amazon ECR) path where inference code is stored.",
  ),
  ImageDigest: z.string().max(72).regex(
    new RegExp("^[Ss][Hh][Aa]256:[0-9a-fA-F]{64}$"),
  ).describe(
    "An MD5 hash of the training algorithm that identifies the Docker image used for training.",
  ).optional(),
  ModelDataUrl: z.string().max(1024).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).describe("A structure with Model Input details.").optional(),
  ModelDataSource: ModelDataSourceSchema.describe(
    "Specifies the location of ML model data to deploy during endpoint creation.",
  ).optional(),
  Framework: z.string().describe(
    "The machine learning framework of the model package container image.",
  ).optional(),
  FrameworkVersion: z.string().min(3).max(10).regex(
    new RegExp("[0-9]\\.[A-Za-z0-9.]+"),
  ).describe("The framework version of the Model Package Container Image.")
    .optional(),
  NearestModelName: z.string().describe(
    "The name of a pre-trained machine learning benchmarked by Amazon SageMaker Inference Recommender model that matches your model.",
  ).optional(),
});

const AdditionalInferenceSpecificationDefinitionSchema = z.object({
  Containers: z.array(ModelPackageContainerDefinitionSchema).describe(
    "The Amazon ECR registry path of the Docker image that contains the inference code.",
  ),
  Description: z.string().max(1024).regex(new RegExp(".*")).describe(
    "A description of the additional Inference specification.",
  ).optional(),
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe(
    "A unique name to identify the additional inference specification. The name must be unique within the list of your additional inference specifications for a particular model package.",
  ),
  SupportedContentTypes: z.array(z.string().max(256).regex(new RegExp(".*")))
    .describe("The supported MIME types for the input data.").optional(),
  SupportedRealtimeInferenceInstanceTypes: z.array(z.string()).describe(
    "A list of the instance types that are used to generate inferences in real-time",
  ).optional(),
  SupportedResponseMIMETypes: z.array(
    z.string().max(1024).regex(new RegExp("^[-\\w]+\\/.+$")),
  ).describe("The supported MIME types for the output data.").optional(),
  SupportedTransformInstanceTypes: z.array(z.string()).describe(
    "A list of the instance types on which a transformation job can be run or on which an endpoint can be deployed.",
  ).optional(),
});

const MetricsSourceSchema = z.object({
  ContentDigest: z.string().max(72).regex(
    new RegExp("^[Ss][Hh][Aa]256:[0-9a-fA-F]{64}$"),
  ).describe("The digest of the metric source.").optional(),
  ContentType: z.string().max(256).regex(new RegExp(".*")).describe(
    "The type of content stored in the metric source.",
  ),
  S3Uri: z.string().max(1024).regex(new RegExp("^(https|s3)://([^/]+)/?(.*)$"))
    .describe("The Amazon S3 URI for the metric source."),
});

const FileSourceSchema = z.object({
  ContentDigest: z.string().max(72).regex(
    new RegExp("^[Ss][Hh][Aa]256:[0-9a-fA-F]{64}$"),
  ).describe("The digest of the file source.").optional(),
  ContentType: z.string().max(256).regex(new RegExp(".*")).describe(
    "The type of content stored in the file source.",
  ).optional(),
  S3Uri: z.string().max(1024).regex(new RegExp("^(https|s3)://([^/]+)/?(.*)$"))
    .describe("The Amazon S3 URI for the file source."),
});

const DriftCheckBiasSchema = z.object({
  PostTrainingConstraints: MetricsSourceSchema.describe(
    "Represents a Metric Source Object.",
  ).optional(),
  PreTrainingConstraints: MetricsSourceSchema.describe(
    "Represents a Metric Source Object.",
  ).optional(),
  ConfigFile: FileSourceSchema.describe("Represents a File Source Object.")
    .optional(),
});

const DriftCheckExplainabilitySchema = z.object({
  Constraints: MetricsSourceSchema.describe(
    "Represents a Metric Source Object.",
  ).optional(),
  ConfigFile: FileSourceSchema.describe("Represents a File Source Object.")
    .optional(),
});

const DriftCheckModelDataQualitySchema = z.object({
  Constraints: MetricsSourceSchema.describe(
    "Represents a Metric Source Object.",
  ).optional(),
  Statistics: MetricsSourceSchema.describe("Represents a Metric Source Object.")
    .optional(),
});

const DriftCheckModelQualitySchema = z.object({
  Constraints: MetricsSourceSchema.describe(
    "Represents a Metric Source Object.",
  ).optional(),
  Statistics: MetricsSourceSchema.describe("Represents a Metric Source Object.")
    .optional(),
});

const BiasSchema = z.object({
  Report: MetricsSourceSchema.describe("Represents a Metric Source Object.")
    .optional(),
  PreTrainingReport: MetricsSourceSchema.describe(
    "Represents a Metric Source Object.",
  ).optional(),
  PostTrainingReport: MetricsSourceSchema.describe(
    "Represents a Metric Source Object.",
  ).optional(),
});

const ExplainabilitySchema = z.object({
  Report: MetricsSourceSchema.describe("Represents a Metric Source Object.")
    .optional(),
});

const ModelDataQualitySchema = z.object({
  Constraints: MetricsSourceSchema.describe(
    "Represents a Metric Source Object.",
  ).optional(),
  Statistics: MetricsSourceSchema.describe("Represents a Metric Source Object.")
    .optional(),
});

const ModelQualitySchema = z.object({
  Constraints: MetricsSourceSchema.describe(
    "Represents a Metric Source Object.",
  ).optional(),
  Statistics: MetricsSourceSchema.describe("Represents a Metric Source Object.")
    .optional(),
});

const SourceAlgorithmSchema = z.object({
  AlgorithmName: z.string().min(1).max(170).regex(
    new RegExp(
      "(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:[a-z\\-]*\\/)?([a-zA-Z0-9]([a-zA-Z0-9-]){0,62})(?<!-)$",
    ),
  ).describe(
    "The name of an algorithm that was used to create the model package. The algorithm must be either an algorithm resource in your Amazon SageMaker account or an algorithm in AWS Marketplace that you are subscribed to.",
  ),
  ModelDataUrl: z.string().max(1024).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).describe(
    "The Amazon S3 path where the model artifacts, which result from model training, are stored. This path must point to a single gzip compressed tar archive (.tar.gz suffix).",
  ).optional(),
});

const S3DataSourceSchema = z.object({
  S3DataType: z.enum(["ManifestFile", "S3Prefix", "AugmentedManifestFile"])
    .describe("The S3 Data Source Type"),
  S3Uri: z.string().max(1024).regex(new RegExp("^(https|s3)://([^/]+)/?(.*)$"))
    .describe(
      "Depending on the value specified for the S3DataType, identifies either a key name prefix or a manifest.",
    ),
});

const DataSourceSchema = z.object({
  S3DataSource: S3DataSourceSchema.describe("Describes the S3 data source."),
});

const TransformInputSchema = z.object({
  CompressionType: z.enum(["None", "Gzip"]).describe(
    "If your transform data is compressed, specify the compression type. Amazon SageMaker automatically decompresses the data for the transform job accordingly. The default value is None.",
  ).optional(),
  ContentType: z.string().max(256).regex(new RegExp(".*")).describe(
    "The multipurpose internet mail extension (MIME) type of the data. Amazon SageMaker uses the MIME type with each http call to transfer data to the transform job.",
  ).optional(),
  DataSource: DataSourceSchema.describe(
    "Describes the input source of a transform job and the way the transform job consumes it.",
  ),
  SplitType: z.enum(["None", "TFRecord", "Line", "RecordIO"]).describe(
    "The method to use to split the transform job's data files into smaller batches.",
  ).optional(),
});

const TransformOutputSchema = z.object({
  Accept: z.string().max(256).regex(new RegExp(".*")).describe(
    "The MIME type used to specify the output data. Amazon SageMaker uses the MIME type with each http call to transfer data from the transform job.",
  ).optional(),
  KmsKeyId: z.string().max(2048).regex(new RegExp(".*")).describe(
    "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt the model artifacts at rest using Amazon S3 server-side encryption.",
  ).optional(),
  S3OutputPath: z.string().max(1024).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).describe(
    "The Amazon S3 path where you want Amazon SageMaker to store the results of the transform job.",
  ),
  AssembleWith: z.enum(["None", "Line"]).describe(
    "Defines how to assemble the results of the transform job as a single S3 object.",
  ).optional(),
});

const TransformResourcesSchema = z.object({
  InstanceCount: z.number().int().min(1).describe(
    "The number of ML compute instances to use in the transform job. For distributed transform jobs, specify a value greater than 1. The default value is 1.",
  ),
  InstanceType: z.string().describe(
    "The ML compute instance type for the transform job.",
  ),
  VolumeKmsKeyId: z.string().max(2048).regex(new RegExp(".*")).describe(
    "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt model data on the storage volume attached to the ML compute instance(s) that run the batch transform job.",
  ).optional(),
});

const TransformJobDefinitionSchema = z.object({
  Environment: z.record(z.string(), z.string().max(1024)).describe(
    "Sets the environment variables in the Docker container",
  ).optional(),
  BatchStrategy: z.enum(["MultiRecord", "SingleRecord"]).describe(
    "A string that determines the number of records included in a single mini-batch.",
  ).optional(),
  MaxConcurrentTransforms: z.number().int().min(0).describe(
    "The maximum number of parallel requests that can be sent to each instance in a transform job. The default value is 1.",
  ).optional(),
  MaxPayloadInMB: z.number().int().min(0).describe(
    "The maximum payload size allowed, in MB. A payload is the data portion of a record (without metadata).",
  ).optional(),
  TransformInput: TransformInputSchema.describe(
    "Describes the input source of a transform job and the way the transform job consumes it.",
  ),
  TransformOutput: TransformOutputSchema.describe(
    "Describes the results of a transform job.",
  ),
  TransformResources: TransformResourcesSchema.describe(
    "Describes the resources, including ML instance types and ML instance count, to use for transform job.",
  ),
});

const ValidationProfileSchema = z.object({
  TransformJobDefinition: TransformJobDefinitionSchema.describe(
    "Defines the input needed to run a transform job using the inference specification specified in the algorithm.",
  ),
  ProfileName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe("The name of the profile for the model package."),
});

const ModelPackageStatusItemSchema = z.object({
  FailureReason: z.string().describe(
    "If the overall status is Failed, the reason for the failure.",
  ).optional(),
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe(
    "The name of the model package for which the overall status is being reported.",
  ),
  Status: z.enum(["NotStarted", "Failed", "InProgress", "Completed"]).describe(
    "The current status.",
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
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  AdditionalInferenceSpecifications: z.array(
    AdditionalInferenceSpecificationDefinitionSchema,
  ).describe("An array of additional Inference Specification objects.")
    .optional(),
  CertifyForMarketplace: z.boolean().describe(
    "Whether to certify the model package for listing on AWS Marketplace.",
  ).optional(),
  ClientToken: z.string().min(1).max(36).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe(
      "A unique token that guarantees that the call to this API is idempotent.",
    ).optional(),
  CustomerMetadataProperties: z.record(z.string(), z.string().min(1).max(128))
    .describe(
      "The metadata properties associated with the model package versions.",
    ).optional(),
  Domain: z.string().describe(
    "The machine learning domain of the model package you specified.",
  ).optional(),
  DriftCheckBaselines: z.object({
    Bias: DriftCheckBiasSchema.describe(
      "Represents the drift check bias baselines that can be used when the model monitor is set using the model package.",
    ).optional(),
    Explainability: DriftCheckExplainabilitySchema.describe(
      "Contains explainability metrics for a model.",
    ).optional(),
    ModelDataQuality: DriftCheckModelDataQualitySchema.describe(
      "Represents the drift check data quality baselines that can be used when the model monitor is set using the model package.",
    ).optional(),
    ModelQuality: DriftCheckModelQualitySchema.describe(
      "Represents the drift check model quality baselines that can be used when the model monitor is set using the model package.",
    ).optional(),
  }).describe(
    "Represents the drift check baselines that can be used when the model monitor is set using the model package.",
  ).optional(),
  InferenceSpecification: z.object({
    Containers: z.array(ModelPackageContainerDefinitionSchema).describe(
      "The Amazon ECR registry path of the Docker image that contains the inference code.",
    ),
    SupportedContentTypes: z.array(z.string().max(256).regex(new RegExp(".*")))
      .describe("The supported MIME types for the input data."),
    SupportedRealtimeInferenceInstanceTypes: z.array(z.string()).describe(
      "A list of the instance types that are used to generate inferences in real-time",
    ).optional(),
    SupportedResponseMIMETypes: z.array(
      z.string().max(1024).regex(new RegExp("^[-\\w]+\\/.+$")),
    ).describe("The supported MIME types for the output data."),
    SupportedTransformInstanceTypes: z.array(z.string()).describe(
      "A list of the instance types on which a transformation job can be run or on which an endpoint can be deployed.",
    ).optional(),
  }).describe(
    "Details about inference jobs that can be run with models based on this model package.",
  ).optional(),
  MetadataProperties: z.object({
    CommitId: z.string().max(1024).regex(new RegExp(".*")).describe(
      "The commit ID.",
    ).optional(),
    GeneratedBy: z.string().max(1024).regex(new RegExp(".*")).describe(
      "The entity this entity was generated by.",
    ).optional(),
    ProjectId: z.string().max(1024).regex(new RegExp(".*")).describe(
      "The project ID metadata.",
    ).optional(),
    Repository: z.string().max(1024).regex(new RegExp(".*")).describe(
      "The repository metadata.",
    ).optional(),
  }).describe(
    "Metadata properties of the tracking entity, trial, or trial component.",
  ).optional(),
  ModelApprovalStatus: z.enum(["Approved", "Rejected", "PendingManualApproval"])
    .describe("The approval status of the model package.").optional(),
  ModelMetrics: z.object({
    Bias: BiasSchema.describe("Contains bias metrics for a model.").optional(),
    Explainability: ExplainabilitySchema.describe(
      "Contains explainability metrics for a model.",
    ).optional(),
    ModelDataQuality: ModelDataQualitySchema.describe(
      "Metrics that measure the quality of the input data for a model.",
    ).optional(),
    ModelQuality: ModelQualitySchema.describe(
      "Metrics that measure the quality of a model.",
    ).optional(),
  }).describe("A structure that contains model metrics reports.").optional(),
  ModelPackageDescription: z.string().max(1024).regex(
    new RegExp("[\\p{L}\\p{M}\\p{Z}\\p{S}\\p{N}\\p{P}]*", "u"),
  ).describe("The description of the model package.").optional(),
  ModelPackageGroupName: z.string().min(1).max(170).regex(
    new RegExp(
      "(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:[a-z\\-]*\\/)?([a-zA-Z0-9]([a-zA-Z0-9-]){0,62})(?<!-)$",
    ),
  ).describe("The name of the model package group.").optional(),
  ModelPackageName: z.string().describe("The name or arn of the model package.")
    .optional(),
  SamplePayloadUrl: z.string().max(1024).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).describe(
    "The Amazon Simple Storage Service (Amazon S3) path where the sample payload are stored pointing to single gzip compressed tar archive.",
  ).optional(),
  SkipModelValidation: z.enum(["None", "All"]).describe(
    "Indicates if you want to skip model validation.",
  ).optional(),
  SourceAlgorithmSpecification: z.object({
    SourceAlgorithms: z.array(SourceAlgorithmSchema).describe(
      "A list of algorithms that were used to create a model package.",
    ),
  }).describe(
    "Details about the algorithm that was used to create the model package.",
  ).optional(),
  Task: z.string().describe(
    "The machine learning task your model package accomplishes.",
  ).optional(),
  ValidationSpecification: z.object({
    ValidationProfiles: z.array(ValidationProfileSchema),
    ValidationRole: z.string().min(20).max(2048).regex(
      new RegExp(
        "^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
      ),
    ).describe(
      "The IAM roles to be used for the validation of the model package.",
    ),
  }).describe(
    "Specifies configurations for one or more transform jobs that Amazon SageMaker runs to test the model package.",
  ).optional(),
  ApprovalDescription: z.string().max(1024).regex(new RegExp(".*")).describe(
    "A description provided for the model approval.",
  ).optional(),
  ModelPackageVersion: z.number().int().min(1).describe(
    "The version of the model package.",
  ).optional(),
  AdditionalInferenceSpecificationsToAdd: z.array(
    AdditionalInferenceSpecificationDefinitionSchema,
  ).describe("An array of additional Inference Specification objects.")
    .optional(),
  ModelPackageStatusDetails: z.object({
    ValidationStatuses: z.array(ModelPackageStatusItemSchema).optional(),
  }).describe("Details about the current status of the model package.")
    .optional(),
  SourceUri: z.string().min(0).max(1024).regex(
    new RegExp("[\\p{L}\\p{M}\\p{Z}\\p{N}\\p{P}]{0,1024}", "u"),
  ).describe("The URI of the source for the model package.").optional(),
  ModelCard: z.object({
    ModelCardContent: z.string().min(0).max(100000).regex(new RegExp(".*"))
      .describe("The content of the model card."),
    ModelCardStatus: z.enum(["Draft", "PendingReview", "Approved", "Archived"])
      .describe(
        "The approval status of the model card within your organization.",
      ),
  }).describe("The model card associated with the model package.").optional(),
  SecurityConfig: z.object({
    KmsKeyId: z.string().max(2048).regex(new RegExp("^[a-zA-Z0-9:/_-]*$"))
      .describe(
        "The AWS KMS Key ID (KMSKeyId) used for encryption of model package information.",
      ),
  }).describe(
    "An optional AWS Key Management Service key to encrypt, decrypt, and re-encrypt model package information for regulated workloads with highly sensitive data.",
  ).optional(),
});

const StateSchema = z.object({
  Tags: z.array(TagSchema).optional(),
  AdditionalInferenceSpecifications: z.array(
    AdditionalInferenceSpecificationDefinitionSchema,
  ).optional(),
  CertifyForMarketplace: z.boolean().optional(),
  ClientToken: z.string().optional(),
  CustomerMetadataProperties: z.record(z.string(), z.unknown()).optional(),
  Domain: z.string().optional(),
  DriftCheckBaselines: z.object({
    Bias: DriftCheckBiasSchema,
    Explainability: DriftCheckExplainabilitySchema,
    ModelDataQuality: DriftCheckModelDataQualitySchema,
    ModelQuality: DriftCheckModelQualitySchema,
  }).optional(),
  InferenceSpecification: z.object({
    Containers: z.array(ModelPackageContainerDefinitionSchema),
    SupportedContentTypes: z.array(z.string()),
    SupportedRealtimeInferenceInstanceTypes: z.array(z.string()),
    SupportedResponseMIMETypes: z.array(z.string()),
    SupportedTransformInstanceTypes: z.array(z.string()),
  }).optional(),
  MetadataProperties: z.object({
    CommitId: z.string(),
    GeneratedBy: z.string(),
    ProjectId: z.string(),
    Repository: z.string(),
  }).optional(),
  ModelApprovalStatus: z.string().optional(),
  ModelMetrics: z.object({
    Bias: BiasSchema,
    Explainability: ExplainabilitySchema,
    ModelDataQuality: ModelDataQualitySchema,
    ModelQuality: ModelQualitySchema,
  }).optional(),
  ModelPackageDescription: z.string().optional(),
  ModelPackageGroupName: z.string().optional(),
  ModelPackageName: z.string().optional(),
  SamplePayloadUrl: z.string().optional(),
  SkipModelValidation: z.string().optional(),
  SourceAlgorithmSpecification: z.object({
    SourceAlgorithms: z.array(SourceAlgorithmSchema),
  }).optional(),
  Task: z.string().optional(),
  ValidationSpecification: z.object({
    ValidationProfiles: z.array(ValidationProfileSchema),
    ValidationRole: z.string(),
  }).optional(),
  ModelPackageArn: z.string(),
  ApprovalDescription: z.string().optional(),
  CreationTime: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  ModelPackageStatus: z.string().optional(),
  ModelPackageVersion: z.number().optional(),
  AdditionalInferenceSpecificationsToAdd: z.array(
    AdditionalInferenceSpecificationDefinitionSchema,
  ).optional(),
  ModelPackageStatusDetails: z.object({
    ValidationStatuses: z.array(ModelPackageStatusItemSchema),
  }).optional(),
  SourceUri: z.string().optional(),
  ModelCard: z.object({
    ModelCardContent: z.string(),
    ModelCardStatus: z.string(),
  }).optional(),
  SecurityConfig: z.object({
    KmsKeyId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  AdditionalInferenceSpecifications: z.array(
    AdditionalInferenceSpecificationDefinitionSchema,
  ).describe("An array of additional Inference Specification objects.")
    .optional(),
  CertifyForMarketplace: z.boolean().describe(
    "Whether to certify the model package for listing on AWS Marketplace.",
  ).optional(),
  ClientToken: z.string().min(1).max(36).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe(
      "A unique token that guarantees that the call to this API is idempotent.",
    ).optional(),
  CustomerMetadataProperties: z.record(z.string(), z.string().min(1).max(128))
    .describe(
      "The metadata properties associated with the model package versions.",
    ).optional(),
  Domain: z.string().describe(
    "The machine learning domain of the model package you specified.",
  ).optional(),
  DriftCheckBaselines: z.object({
    Bias: DriftCheckBiasSchema.describe(
      "Represents the drift check bias baselines that can be used when the model monitor is set using the model package.",
    ).optional(),
    Explainability: DriftCheckExplainabilitySchema.describe(
      "Contains explainability metrics for a model.",
    ).optional(),
    ModelDataQuality: DriftCheckModelDataQualitySchema.describe(
      "Represents the drift check data quality baselines that can be used when the model monitor is set using the model package.",
    ).optional(),
    ModelQuality: DriftCheckModelQualitySchema.describe(
      "Represents the drift check model quality baselines that can be used when the model monitor is set using the model package.",
    ).optional(),
  }).describe(
    "Represents the drift check baselines that can be used when the model monitor is set using the model package.",
  ).optional(),
  InferenceSpecification: z.object({
    Containers: z.array(ModelPackageContainerDefinitionSchema).describe(
      "The Amazon ECR registry path of the Docker image that contains the inference code.",
    ).optional(),
    SupportedContentTypes: z.array(z.string().max(256).regex(new RegExp(".*")))
      .describe("The supported MIME types for the input data.").optional(),
    SupportedRealtimeInferenceInstanceTypes: z.array(z.string()).describe(
      "A list of the instance types that are used to generate inferences in real-time",
    ).optional(),
    SupportedResponseMIMETypes: z.array(
      z.string().max(1024).regex(new RegExp("^[-\\w]+\\/.+$")),
    ).describe("The supported MIME types for the output data.").optional(),
    SupportedTransformInstanceTypes: z.array(z.string()).describe(
      "A list of the instance types on which a transformation job can be run or on which an endpoint can be deployed.",
    ).optional(),
  }).describe(
    "Details about inference jobs that can be run with models based on this model package.",
  ).optional(),
  MetadataProperties: z.object({
    CommitId: z.string().max(1024).regex(new RegExp(".*")).describe(
      "The commit ID.",
    ).optional(),
    GeneratedBy: z.string().max(1024).regex(new RegExp(".*")).describe(
      "The entity this entity was generated by.",
    ).optional(),
    ProjectId: z.string().max(1024).regex(new RegExp(".*")).describe(
      "The project ID metadata.",
    ).optional(),
    Repository: z.string().max(1024).regex(new RegExp(".*")).describe(
      "The repository metadata.",
    ).optional(),
  }).describe(
    "Metadata properties of the tracking entity, trial, or trial component.",
  ).optional(),
  ModelApprovalStatus: z.enum(["Approved", "Rejected", "PendingManualApproval"])
    .describe("The approval status of the model package.").optional(),
  ModelMetrics: z.object({
    Bias: BiasSchema.describe("Contains bias metrics for a model.").optional(),
    Explainability: ExplainabilitySchema.describe(
      "Contains explainability metrics for a model.",
    ).optional(),
    ModelDataQuality: ModelDataQualitySchema.describe(
      "Metrics that measure the quality of the input data for a model.",
    ).optional(),
    ModelQuality: ModelQualitySchema.describe(
      "Metrics that measure the quality of a model.",
    ).optional(),
  }).describe("A structure that contains model metrics reports.").optional(),
  ModelPackageDescription: z.string().max(1024).regex(
    new RegExp("[\\p{L}\\p{M}\\p{Z}\\p{S}\\p{N}\\p{P}]*", "u"),
  ).describe("The description of the model package.").optional(),
  ModelPackageGroupName: z.string().min(1).max(170).regex(
    new RegExp(
      "(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:[a-z\\-]*\\/)?([a-zA-Z0-9]([a-zA-Z0-9-]){0,62})(?<!-)$",
    ),
  ).describe("The name of the model package group.").optional(),
  ModelPackageName: z.string().describe("The name or arn of the model package.")
    .optional(),
  SamplePayloadUrl: z.string().max(1024).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).describe(
    "The Amazon Simple Storage Service (Amazon S3) path where the sample payload are stored pointing to single gzip compressed tar archive.",
  ).optional(),
  SkipModelValidation: z.enum(["None", "All"]).describe(
    "Indicates if you want to skip model validation.",
  ).optional(),
  SourceAlgorithmSpecification: z.object({
    SourceAlgorithms: z.array(SourceAlgorithmSchema).describe(
      "A list of algorithms that were used to create a model package.",
    ).optional(),
  }).describe(
    "Details about the algorithm that was used to create the model package.",
  ).optional(),
  Task: z.string().describe(
    "The machine learning task your model package accomplishes.",
  ).optional(),
  ValidationSpecification: z.object({
    ValidationProfiles: z.array(ValidationProfileSchema).optional(),
    ValidationRole: z.string().min(20).max(2048).regex(
      new RegExp(
        "^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
      ),
    ).describe(
      "The IAM roles to be used for the validation of the model package.",
    ).optional(),
  }).describe(
    "Specifies configurations for one or more transform jobs that Amazon SageMaker runs to test the model package.",
  ).optional(),
  ApprovalDescription: z.string().max(1024).regex(new RegExp(".*")).describe(
    "A description provided for the model approval.",
  ).optional(),
  ModelPackageVersion: z.number().int().min(1).describe(
    "The version of the model package.",
  ).optional(),
  AdditionalInferenceSpecificationsToAdd: z.array(
    AdditionalInferenceSpecificationDefinitionSchema,
  ).describe("An array of additional Inference Specification objects.")
    .optional(),
  ModelPackageStatusDetails: z.object({
    ValidationStatuses: z.array(ModelPackageStatusItemSchema).optional(),
  }).describe("Details about the current status of the model package.")
    .optional(),
  SourceUri: z.string().min(0).max(1024).regex(
    new RegExp("[\\p{L}\\p{M}\\p{Z}\\p{N}\\p{P}]{0,1024}", "u"),
  ).describe("The URI of the source for the model package.").optional(),
  ModelCard: z.object({
    ModelCardContent: z.string().min(0).max(100000).regex(new RegExp(".*"))
      .describe("The content of the model card.").optional(),
    ModelCardStatus: z.enum(["Draft", "PendingReview", "Approved", "Archived"])
      .describe(
        "The approval status of the model card within your organization.",
      ).optional(),
  }).describe("The model card associated with the model package.").optional(),
  SecurityConfig: z.object({
    KmsKeyId: z.string().max(2048).regex(new RegExp("^[a-zA-Z0-9:/_-]*$"))
      .describe(
        "The AWS KMS Key ID (KMSKeyId) used for encryption of model package information.",
      ).optional(),
  }).describe(
    "An optional AWS Key Management Service key to encrypt, decrypt, and re-encrypt model package information for regulated workloads with highly sensitive data.",
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

/** Swamp extension model for SageMaker ModelPackage. Registered at `@swamp/aws/sagemaker/model-package`. */
export const model = {
  type: "@swamp/aws/sagemaker/model-package",
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
      description: "SageMaker ModelPackage resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker ModelPackage",
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
          "AWS::SageMaker::ModelPackage",
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
      description: "Get a SageMaker ModelPackage",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker ModelPackage",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::ModelPackage",
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
      description: "Update a SageMaker ModelPackage",
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
        const identifier = existing.ModelPackageArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::ModelPackage",
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
          "AWS::SageMaker::ModelPackage",
          identifier,
          currentState,
          desiredState,
          [
            "ModelPackageGroupName",
            "ModelPackageDescription",
            "InferenceSpecification",
            "ValidationSpecification",
            "SourceAlgorithmSpecification",
            "MetadataProperties",
            "ModelMetrics",
            "ClientToken",
            "DriftCheckBaselines",
            "Domain",
            "Task",
            "SamplePayloadUrl",
            "SecurityConfig",
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
      description: "Delete a SageMaker ModelPackage",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker ModelPackage",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::ModelPackage",
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
      description: "Sync SageMaker ModelPackage state from AWS",
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
        const identifier = existing.ModelPackageArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::ModelPackage",
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
