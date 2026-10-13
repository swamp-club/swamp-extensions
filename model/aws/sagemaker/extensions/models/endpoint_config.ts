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

// Auto-generated extension model for @swamp/aws/sagemaker/endpoint-config
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker EndpointConfig (AWS::SageMaker::EndpointConfig).
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

const ScaleInPolicySchema = z.object({
  Strategy: z.string().min(1).max(63).describe(
    "The strategy for scaling in instances. IDLE_RELEASE releases instances that have no hosted inference component copies. CONSOLIDATION consolidates inference component copies onto fewer instances to release more instances.",
  ),
  CooldownInMinutes: z.number().int().describe(
    "The cooldown period, in minutes, after the last endpoint operation before the endpoint evaluates consolidation scale-in opportunities. Valid values are 5 to 1440. The default is 20.",
  ).optional(),
  MaximumStepSize: z.number().int().describe(
    "The maximum number of instances that the endpoint can terminate at a time during a consolidation scale-in operation. Valid values are 1 to 100. The default is 1.",
  ).optional(),
});

const ManagedInstanceScalingSchema = z.object({
  Status: z.string().min(1).max(10).describe(
    "Indicates whether managed instance scaling is enabled.",
  ).optional(),
  MaxInstanceCount: z.number().int().describe(
    "The maximum number of instances that the endpoint can provision when it scales up to accommodate an increase in traffic.",
  ).optional(),
  ScaleInPolicy: ScaleInPolicySchema.describe(
    "Configures the scale-in behavior for managed instance scaling.",
  ).optional(),
  MinInstanceCount: z.number().int().describe(
    "The minimum number of instances that the endpoint must retain when it scales down to accommodate a decrease in traffic.",
  ).optional(),
});

const InstancePoolSchema = z.object({
  ModelNameOverride: z.string().describe(
    "The name of a SageMaker model to use for this instance pool instead of the model specified for the production variant. Use this to deploy a different model optimized for the instance type in this pool.",
  ).optional(),
  Priority: z.number().int().min(1).max(5).describe(
    "The priority for the instance pool. SageMaker attempts to provision instances in order of priority, starting with the lowest value. If instances for a higher-priority pool are unavailable, SageMaker attempts to provision from the next pool. Valid values: 1 to 5, where 1 is the highest priority.",
  ),
  InstanceType: z.string().describe(
    "The ML compute instance type for the instance pool.",
  ),
});

const PrefixAwareRoutingConfigSchema = z.object({
  ConcurrencyThreshold: z.number().int().describe(
    "The maximum number of in-flight requests on the target instance before the endpoint routes to another instance. Required when RoutingStrategy is PREFIX_AWARE. Valid values are 1 to 1024.",
  ).optional(),
  PrefixLength: z.number().int().describe(
    "The maximum length of the prefix used for routing decisions. Required when RoutingStrategy is PREFIX_AWARE. Valid values are 1024 to 65536.",
  ).optional(),
});

const RoutingConfigSchema = z.object({
  RoutingStrategy: z.string().min(1).max(63).describe(
    "Sets how the endpoint routes incoming traffic.",
  ).optional(),
  PrefixAwareRoutingConfig: PrefixAwareRoutingConfigSchema.describe(
    "The configuration for prefix-aware routing. Specify this property only when you set RoutingStrategy to PREFIX_AWARE.",
  ).optional(),
});

const CoreDumpConfigSchema = z.object({
  KmsKeyId: z.string().describe(
    "The AWS Key Management Service (AWS KMS) key that SageMaker uses to encrypt the core dump data at rest using Amazon S3 server-side encryption. If you use a KMS key ID or an alias of your KMS key, the SageMaker execution role must include permissions to call kms:Encrypt.",
  ).optional(),
  DestinationS3Uri: z.string().describe(
    "The Amazon S3 bucket to send the core dump to.",
  ),
});

const CapacityReservationConfigSchema = z.object({
  MlReservationArn: z.string().describe(
    "The Amazon Resource Name (ARN) that uniquely identifies the ML capacity reservation that SageMaker AI applies when it deploys the endpoint.",
  ).optional(),
  CapacityReservationPreference: z.string().regex(
    new RegExp("capacity-reservations-only"),
  ).describe("Options that you can choose for the capacity reservation.")
    .optional(),
});

const ServerlessConfigSchema = z.object({
  MaxConcurrency: z.number().int().describe(
    "The maximum number of concurrent invocations your serverless endpoint can process.",
  ),
  MemorySizeInMB: z.number().int().describe(
    "The memory size of your serverless endpoint. Valid values are in 1 GB increments: 1024 MB, 2048 MB, 3072 MB, 4096 MB, 5120 MB, or 6144 MB.",
  ),
  ProvisionedConcurrency: z.number().int().describe(
    "The amount of provisioned concurrency to allocate for the serverless endpoint. Should be less than or equal to MaxConcurrency.",
  ).optional(),
});

const ProductionVariantSchema = z.object({
  ManagedInstanceScaling: ManagedInstanceScalingSchema.describe(
    "Settings that control the range in the number of instances that the endpoint provisions as it scales up or down to accommodate traffic.",
  ).optional(),
  InstancePools: z.array(InstancePoolSchema).describe(
    "A list of instance pools for the production variant. Each instance pool specifies an instance type and its priority for provisioning. Use instance pools to configure heterogeneous endpoints that deploy models across multiple instance types.",
  ).optional(),
  ModelName: z.string().min(1).max(63).describe(
    "The name of the model that you want to host. This is the name that you specified when creating the model.",
  ).optional(),
  VolumeSizeInGB: z.number().int().min(1).max(512).describe(
    "The size, in GB, of the ML storage volume attached to individual inference instance associated with the production variant. Currently only Amazon EBS gp2 storage volumes are supported.",
  ).optional(),
  EnableSSMAccess: z.boolean().describe(
    "You can use this parameter to turn on native AWS Systems Manager (SSM) access for a production variant behind an endpoint. By default, SSM access is disabled for all production variants behind an endpoint.",
  ).optional(),
  VariantName: z.string().min(1).max(63).describe(
    "The name of the production variant.",
  ),
  InitialInstanceCount: z.number().int().min(1).describe(
    "Number of instances to launch initially.",
  ).optional(),
  VariantInstanceProvisionTimeoutInSeconds: z.number().int().min(300).max(3600)
    .describe(
      "The timeout value, in seconds, for provisioning instances for the production variant. When SageMaker encounters an insufficient capacity error while provisioning instances, it retries with the next instance pool (if configured) or waits until the timeout expires. This timeout applies only to capacity provisioning and does not include the time for model download or container startup.",
    ).optional(),
  RoutingConfig: RoutingConfigSchema.describe(
    "Settings that control how the endpoint routes incoming traffic to the instances that the endpoint hosts.",
  ).optional(),
  CoreDumpConfig: CoreDumpConfigSchema.describe(
    "Specifies configuration for a core dump from the model container when the process crashes.",
  ).optional(),
  InitialVariantWeight: z.number().min(0).describe(
    "Determines initial traffic distribution among all of the models that you specify in the endpoint configuration.",
  ).optional(),
  ModelDataDownloadTimeoutInSeconds: z.number().int().min(60).max(3600)
    .describe(
      "The timeout value, in seconds, to download and extract the model that you want to host from Amazon S3 to the individual inference instance associated with this production variant.",
    ).optional(),
  CapacityReservationConfig: CapacityReservationConfigSchema.describe(
    "Settings for the capacity reservation for the compute instances that SageMaker AI reserves for an endpoint.",
  ).optional(),
  InferenceAmiVersion: z.string().describe(
    "Specifies an option from a collection of preconfigured Amazon Machine Image (AMI) images. Each image is configured by AWS with a set of software and driver versions. AWS optimizes these configurations for different machine learning workloads. By selecting an AMI version, you can ensure that your inference environment is compatible with specific software requirements, such as CUDA driver versions, Linux kernel versions, or AWS Neuron driver versions",
  ).optional(),
  ContainerStartupHealthCheckTimeoutInSeconds: z.number().int().min(60).max(
    3600,
  ).describe(
    "The timeout value, in seconds, for your inference container to pass health check by SageMaker Hosting.",
  ).optional(),
  ServerlessConfig: ServerlessConfigSchema.describe(
    "The serverless configuration for an endpoint. Specifies a serverless endpoint configuration instead of an instance-based endpoint configuration.",
  ).optional(),
  InstanceType: z.string().describe("The ML compute instance type.").optional(),
});

const ClarifyInferenceConfigSchema = z.object({
  ContentTemplate: z.string().min(1).max(64).describe(
    "A template string used to format a JSON record into an acceptable model container input.",
  ).optional(),
  LabelHeaders: z.array(z.string().min(1).max(64)).describe(
    "For multiclass classification problems, the label headers are the names of the classes. Otherwise, the label header is the name of the predicted label.",
  ).optional(),
  MaxPayloadInMB: z.number().int().min(1).max(25).describe(
    "The maximum payload size (MB) allowed of a request from the explainer to the model container. Defaults to 6 MB.",
  ).optional(),
  ProbabilityIndex: z.number().int().min(0).describe(
    "A zero-based index used to extract a probability value (score) or list from model container output in CSV format. If this value is not provided, the entire model container output will be treated as a probability value (score) or list.",
  ).optional(),
  LabelAttribute: z.string().min(1).max(64).describe(
    "A JMESPath expression used to locate the list of label headers in the model container output.",
  ).optional(),
  FeatureTypes: z.array(
    z.string().regex(new RegExp("numerical|categorical|text")),
  ).describe(
    "A list of data types of the features (optional). Applicable only to NLP explainability. If provided, FeatureTypes must have at least one 'text' string (for example, ['text']). If FeatureTypes is not provided, the explainer infers the feature types based on the baseline data.",
  ).optional(),
  FeatureHeaders: z.array(z.string().min(1).max(64)).describe(
    "The names of the features. If provided, these are included in the endpoint response payload to help readability of the InvokeEndpoint output.",
  ).optional(),
  LabelIndex: z.number().int().min(0).describe(
    "A zero-based index used to extract a label header or list of label headers from model container output in CSV format.",
  ).optional(),
  ProbabilityAttribute: z.string().min(1).max(64).describe(
    "A JMESPath expression used to extract the probability (or score) from the model container output if the model container is in JSON Lines format.",
  ).optional(),
  FeaturesAttribute: z.string().min(1).max(64).describe(
    "Provides the JMESPath expression to extract the features from a model container input in JSON Lines format.",
  ).optional(),
  MaxRecordCount: z.number().int().min(1).describe(
    "The maximum number of records in a request that the model container can process when querying the model container for the predictions of a synthetic dataset. A record is a unit of input data that inference can be made on, for example, a single line in CSV data.",
  ).optional(),
});

const ClarifyTextConfigSchema = z.object({
  Language: z.string().regex(
    new RegExp(
      "af|sq|ar|hy|eu|bn|bg|ca|zh|hr|cs|da|nl|en|et|fi|fr|de|el|gu|he|hi|hu|is|id|ga|it|kn|ky|lv|lt|lb|mk|ml|mr|ne|nb|fa|pl|pt|ro|ru|sa|sr|tn|si|sk|sl|es|sv|tl|ta|tt|te|tr|uk|ur|yo|lij|xx",
    ),
  ).describe(
    "Specifies the language of the text features in ISO 639-1 or ISO 639-3 code of a supported language.",
  ),
  Granularity: z.string().regex(new RegExp("token|sentence|paragraph"))
    .describe(
      "The unit of granularity for the analysis of text features. For example, if the unit is 'token', then each token (like a word in English) of the text is treated as a feature. SHAP values are computed for each unit/feature.",
    ),
});

const ClarifyShapBaselineConfigSchema = z.object({
  ShapBaseline: z.string().min(1).max(4096).regex(new RegExp("[\\s\\S]+"))
    .describe(
      "The inline SHAP baseline data in string format. ShapBaseline can have one or multiple records to be used as the baseline dataset. The format of the SHAP baseline file should be the same format as the training dataset.",
    ).optional(),
  ShapBaselineUri: z.string().max(1024).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).describe(
    "The uniform resource identifier (URI) of the S3 bucket where the SHAP baseline file is stored. The format of the SHAP baseline file should be the same format as the format of the training dataset.",
  ).optional(),
  MimeType: z.string().max(255).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*\\/[a-zA-Z0-9](-*[a-zA-Z0-9+.])*"),
  ).describe(
    "The MIME type of the baseline data. Choose from 'text/csv' or 'application/jsonlines'. Defaults to 'text/csv'.",
  ).optional(),
});

const ClarifyShapConfigSchema = z.object({
  TextConfig: ClarifyTextConfigSchema.describe(
    "A parameter that indicates if text features are treated as text and explanations are provided for individual units of text. Required for natural language processing (NLP) explainability only.",
  ).optional(),
  UseLogit: z.boolean().describe(
    "A Boolean toggle to indicate if you want to use the logit function (true) or log-odds units (false) for model predictions. Defaults to false.",
  ).optional(),
  Seed: z.number().int().describe(
    "The starting value used to initialize the random number generator in the explainer. Provide a value for this parameter to obtain a deterministic SHAP result.",
  ).optional(),
  ShapBaselineConfig: ClarifyShapBaselineConfigSchema.describe(
    "The configuration for the SHAP baseline of the Kernal SHAP algorithm.",
  ),
  NumberOfSamples: z.number().int().min(1).describe(
    "The number of samples to be used for analysis by the Kernal SHAP algorithm.",
  ).optional(),
});

const ClarifyExplainerConfigSchema = z.object({
  InferenceConfig: ClarifyInferenceConfigSchema.describe(
    "The inference configuration parameter for the model container.",
  ).optional(),
  EnableExplanations: z.string().min(1).max(64).describe(
    "A JMESPath boolean expression used to filter which records to explain. Explanations are activated by default.",
  ).optional(),
  ShapConfig: ClarifyShapConfigSchema.describe(
    "The configuration for SHAP analysis.",
  ),
});

const CaptureOptionSchema = z.object({
  CaptureMode: z.string().describe(
    "Specifies whether the endpoint captures input data or output data.",
  ),
});

const CaptureContentTypeHeaderSchema = z.object({
  JsonContentTypes: z.array(z.string()).describe(
    "A list of the JSON content types of the data that the endpoint captures. For the endpoint to capture the data, you must also specify the content type when you invoke the endpoint.",
  ).optional(),
  CsvContentTypes: z.array(z.string()).describe(
    "A list of the CSV content types of the data that the endpoint captures. For the endpoint to capture the data, you must also specify the content type when you invoke the endpoint.",
  ).optional(),
});

const AsyncInferenceNotificationConfigSchema = z.object({
  IncludeInferenceResponseIn: z.array(z.string()).describe(
    "The Amazon SNS topics where you want the inference response to be included.",
  ).optional(),
  SuccessTopic: z.string().describe(
    "Amazon SNS topic to post a notification to when an inference completes successfully. If no topic is provided, no notification is sent on success.",
  ).optional(),
  ErrorTopic: z.string().describe(
    "Amazon SNS topic to post a notification to when an inference fails. If no topic is provided, no notification is sent on failure.",
  ).optional(),
});

const AsyncInferenceOutputConfigSchema = z.object({
  KmsKeyId: z.string().describe(
    "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt the asynchronous inference output in Amazon S3.",
  ).optional(),
  NotificationConfig: AsyncInferenceNotificationConfigSchema.describe(
    "Specifies the configuration for notifications of inference results for asynchronous inference.",
  ).optional(),
  S3OutputPath: z.string().describe(
    "The Amazon S3 location to upload inference responses to.",
  ).optional(),
  S3FailurePath: z.string().describe(
    "The Amazon S3 location to upload failure inference responses to.",
  ).optional(),
});

const AsyncInferenceClientConfigSchema = z.object({
  MaxConcurrentInvocationsPerInstance: z.number().int().min(1).describe(
    "The maximum number of concurrent requests sent by the SageMaker client to the model container. If no value is provided, SageMaker will choose an optimal value for you.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().describe("The tag value."),
  Key: z.string().describe(
    "The tag key. Tag keys must be unique per resource.",
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
  ProductionVariants: z.array(ProductionVariantSchema).describe(
    "A list of ProductionVariant objects, one for each model that you want to host at this endpoint.",
  ),
  KmsKeyId: z.string().describe(
    "The Amazon Resource Name (ARN) of an AWS Key Management Service key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance that hosts the endpoint.",
  ).optional(),
  VpcConfig: z.object({
    Subnets: z.array(z.string()).describe(
      "The ID of the subnets in the VPC to which you want to connect your training job or model.",
    ),
    SecurityGroupIds: z.array(z.string()).describe(
      "The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the Subnets field.",
    ),
  }).describe(
    "Specifies an Amazon Virtual Private Cloud (VPC) that your SageMaker jobs, hosted models, and compute resources have access to. You can control access to and from your resources by configuring a VPC.",
  ).optional(),
  EndpointConfigName: z.string().min(1).max(63).describe(
    "The name of the endpoint configuration.",
  ).optional(),
  ExplainerConfig: z.object({
    ClarifyExplainerConfig: ClarifyExplainerConfigSchema.describe(
      "A member of ExplainerConfig that contains configuration parameters for the SageMaker Clarify explainer.",
    ).optional(),
  }).describe("A parameter to activate explainers.").optional(),
  MetricsConfig: z.object({
    EnableEnhancedMetrics: z.boolean().describe(
      "Specifies whether to enable enhanced metrics for the endpoint. Enhanced metrics provide utilization and invocation data at instance and container granularity.",
    ).optional(),
    EnableDetailedObservability: z.boolean().describe(
      "Specifies whether to enable detailed observability for the endpoint. When set to true, the endpoint publishes container-level inference metrics, per-GPU metrics, per-instance host metrics, and inference component placement metrics.",
    ).optional(),
    MetricPublishFrequencyInSeconds: z.union([
      z.literal(10),
      z.literal(30),
      z.literal(60),
      z.literal(120),
      z.literal(180),
      z.literal(240),
      z.literal(300),
    ]).describe(
      "The interval, in seconds, at which the endpoint publishes metrics to Amazon CloudWatch. Valid values are 10, 30, 60, 120, 180, 240, and 300. The default is 60.",
    ).optional(),
  }).describe(
    "Specifies the metrics that the endpoint publishes to Amazon CloudWatch, the frequency of publication, and whether to enable enhanced or detailed observability metrics.",
  ).optional(),
  ShadowProductionVariants: z.array(ProductionVariantSchema).describe(
    "Array of ProductionVariant objects. There is one for each model that you want to host at this endpoint in shadow mode with production traffic replicated from the model specified on ProductionVariants. If you use this field, you can only specify one variant for ProductionVariants and one variant for ShadowProductionVariants.",
  ).optional(),
  DataCaptureConfig: z.object({
    CaptureOptions: z.array(CaptureOptionSchema).describe(
      "Specifies whether the endpoint captures input data to your model, output data from your model, or both.",
    ),
    KmsKeyId: z.string().describe(
      "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt the captured data at rest using Amazon S3 server-side encryption.",
    ).optional(),
    DestinationS3Uri: z.string().describe(
      "The S3 bucket where model monitor stores captured data.",
    ),
    InitialSamplingPercentage: z.number().int().min(0).max(100).describe(
      "The percentage of data to capture.",
    ),
    CaptureContentTypeHeader: CaptureContentTypeHeaderSchema.describe(
      "A list of the JSON and CSV content type that the endpoint captures.",
    ).optional(),
    EnableCapture: z.boolean().describe("Set to True to enable data capture.")
      .optional(),
  }).describe(
    "Specifies how to capture endpoint data for model monitor. The data capture configuration applies to all production variants hosted at the endpoint.",
  ).optional(),
  ExecutionRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker AI can assume to perform actions on your behalf.",
  ).optional(),
  EnableNetworkIsolation: z.boolean().describe(
    "Sets whether all model containers deployed to the endpoint are isolated. If they are, no inbound or outbound network calls can be made to or from the model containers.",
  ).optional(),
  AsyncInferenceConfig: z.object({
    OutputConfig: AsyncInferenceOutputConfigSchema.describe(
      "Specifies the configuration for asynchronous inference invocation outputs.",
    ),
    ClientConfig: AsyncInferenceClientConfigSchema.describe(
      "Configures the behavior of the client used by SageMaker to interact with the model container during asynchronous inference.",
    ).optional(),
  }).describe(
    "Specifies configuration for how an endpoint performs asynchronous inference.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  ProductionVariants: z.array(ProductionVariantSchema).optional(),
  KmsKeyId: z.string().optional(),
  VpcConfig: z.object({
    Subnets: z.array(z.string()),
    SecurityGroupIds: z.array(z.string()),
  }).optional(),
  EndpointConfigName: z.string().optional(),
  ExplainerConfig: z.object({
    ClarifyExplainerConfig: ClarifyExplainerConfigSchema,
  }).optional(),
  EndpointConfigArn: z.string(),
  MetricsConfig: z.object({
    EnableEnhancedMetrics: z.boolean(),
    EnableDetailedObservability: z.boolean(),
    MetricPublishFrequencyInSeconds: z.number(),
  }).optional(),
  ShadowProductionVariants: z.array(ProductionVariantSchema).optional(),
  DataCaptureConfig: z.object({
    CaptureOptions: z.array(CaptureOptionSchema),
    KmsKeyId: z.string(),
    DestinationS3Uri: z.string(),
    InitialSamplingPercentage: z.number(),
    CaptureContentTypeHeader: CaptureContentTypeHeaderSchema,
    EnableCapture: z.boolean(),
  }).optional(),
  ExecutionRoleArn: z.string().optional(),
  EnableNetworkIsolation: z.boolean().optional(),
  AsyncInferenceConfig: z.object({
    OutputConfig: AsyncInferenceOutputConfigSchema,
    ClientConfig: AsyncInferenceClientConfigSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ProductionVariants: z.array(ProductionVariantSchema).describe(
    "A list of ProductionVariant objects, one for each model that you want to host at this endpoint.",
  ).optional(),
  KmsKeyId: z.string().describe(
    "The Amazon Resource Name (ARN) of an AWS Key Management Service key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance that hosts the endpoint.",
  ).optional(),
  VpcConfig: z.object({
    Subnets: z.array(z.string()).describe(
      "The ID of the subnets in the VPC to which you want to connect your training job or model.",
    ).optional(),
    SecurityGroupIds: z.array(z.string()).describe(
      "The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the Subnets field.",
    ).optional(),
  }).describe(
    "Specifies an Amazon Virtual Private Cloud (VPC) that your SageMaker jobs, hosted models, and compute resources have access to. You can control access to and from your resources by configuring a VPC.",
  ).optional(),
  EndpointConfigName: z.string().min(1).max(63).describe(
    "The name of the endpoint configuration.",
  ).optional(),
  ExplainerConfig: z.object({
    ClarifyExplainerConfig: ClarifyExplainerConfigSchema.describe(
      "A member of ExplainerConfig that contains configuration parameters for the SageMaker Clarify explainer.",
    ).optional(),
  }).describe("A parameter to activate explainers.").optional(),
  MetricsConfig: z.object({
    EnableEnhancedMetrics: z.boolean().describe(
      "Specifies whether to enable enhanced metrics for the endpoint. Enhanced metrics provide utilization and invocation data at instance and container granularity.",
    ).optional(),
    EnableDetailedObservability: z.boolean().describe(
      "Specifies whether to enable detailed observability for the endpoint. When set to true, the endpoint publishes container-level inference metrics, per-GPU metrics, per-instance host metrics, and inference component placement metrics.",
    ).optional(),
    MetricPublishFrequencyInSeconds: z.union([
      z.literal(10),
      z.literal(30),
      z.literal(60),
      z.literal(120),
      z.literal(180),
      z.literal(240),
      z.literal(300),
    ]).describe(
      "The interval, in seconds, at which the endpoint publishes metrics to Amazon CloudWatch. Valid values are 10, 30, 60, 120, 180, 240, and 300. The default is 60.",
    ).optional(),
  }).describe(
    "Specifies the metrics that the endpoint publishes to Amazon CloudWatch, the frequency of publication, and whether to enable enhanced or detailed observability metrics.",
  ).optional(),
  ShadowProductionVariants: z.array(ProductionVariantSchema).describe(
    "Array of ProductionVariant objects. There is one for each model that you want to host at this endpoint in shadow mode with production traffic replicated from the model specified on ProductionVariants. If you use this field, you can only specify one variant for ProductionVariants and one variant for ShadowProductionVariants.",
  ).optional(),
  DataCaptureConfig: z.object({
    CaptureOptions: z.array(CaptureOptionSchema).describe(
      "Specifies whether the endpoint captures input data to your model, output data from your model, or both.",
    ).optional(),
    KmsKeyId: z.string().describe(
      "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt the captured data at rest using Amazon S3 server-side encryption.",
    ).optional(),
    DestinationS3Uri: z.string().describe(
      "The S3 bucket where model monitor stores captured data.",
    ).optional(),
    InitialSamplingPercentage: z.number().int().min(0).max(100).describe(
      "The percentage of data to capture.",
    ).optional(),
    CaptureContentTypeHeader: CaptureContentTypeHeaderSchema.describe(
      "A list of the JSON and CSV content type that the endpoint captures.",
    ).optional(),
    EnableCapture: z.boolean().describe("Set to True to enable data capture.")
      .optional(),
  }).describe(
    "Specifies how to capture endpoint data for model monitor. The data capture configuration applies to all production variants hosted at the endpoint.",
  ).optional(),
  ExecutionRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker AI can assume to perform actions on your behalf.",
  ).optional(),
  EnableNetworkIsolation: z.boolean().describe(
    "Sets whether all model containers deployed to the endpoint are isolated. If they are, no inbound or outbound network calls can be made to or from the model containers.",
  ).optional(),
  AsyncInferenceConfig: z.object({
    OutputConfig: AsyncInferenceOutputConfigSchema.describe(
      "Specifies the configuration for asynchronous inference invocation outputs.",
    ).optional(),
    ClientConfig: AsyncInferenceClientConfigSchema.describe(
      "Configures the behavior of the client used by SageMaker to interact with the model container during asynchronous inference.",
    ).optional(),
  }).describe(
    "Specifies configuration for how an endpoint performs asynchronous inference.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to apply to this resource.",
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

/** Swamp extension model for SageMaker EndpointConfig. Registered at `@swamp/aws/sagemaker/endpoint-config`. */
export const model = {
  type: "@swamp/aws/sagemaker/endpoint-config",
  version: "2026.10.13.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker EndpointConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker EndpointConfig",
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
          "AWS::SageMaker::EndpointConfig",
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
      description: "Get a SageMaker EndpointConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker EndpointConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::EndpointConfig",
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
      description: "Update a SageMaker EndpointConfig",
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
        const identifier = existing.EndpointConfigArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::EndpointConfig",
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
          "AWS::SageMaker::EndpointConfig",
          identifier,
          currentState,
          desiredState,
          [
            "KmsKeyId",
            "AsyncInferenceConfig",
            "ExecutionRoleArn",
            "ShadowProductionVariants",
            "EnableNetworkIsolation",
            "ProductionVariants",
            "DataCaptureConfig",
            "ExplainerConfig",
            "MetricsConfig",
            "EndpointConfigName",
            "VpcConfig",
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
      description: "Delete a SageMaker EndpointConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker EndpointConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::EndpointConfig",
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
      description: "Sync SageMaker EndpointConfig state from AWS",
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
        const identifier = existing.EndpointConfigArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::EndpointConfig",
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
      description: "List SageMaker EndpointConfig resources",
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
          "AWS::SageMaker::EndpointConfig",
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
            (item.properties?.EndpointConfigArn?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
