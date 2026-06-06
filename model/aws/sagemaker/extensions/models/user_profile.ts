// Auto-generated extension model for @swamp/aws/sagemaker/user-profile
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker UserProfile (AWS::SageMaker::UserProfile).
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

const ResourceSpecSchema = z.object({
  InstanceType: z.enum([
    "system",
    "ml.t3.micro",
    "ml.t3.small",
    "ml.t3.medium",
    "ml.t3.large",
    "ml.t3.xlarge",
    "ml.t3.2xlarge",
    "ml.m5.large",
    "ml.m5.xlarge",
    "ml.m5.2xlarge",
    "ml.m5.4xlarge",
    "ml.m5.8xlarge",
    "ml.m5.12xlarge",
    "ml.m5.16xlarge",
    "ml.m5.24xlarge",
    "ml.m5d.large",
    "ml.m5d.xlarge",
    "ml.m5d.2xlarge",
    "ml.m5d.4xlarge",
    "ml.m5d.8xlarge",
    "ml.m5d.12xlarge",
    "ml.m5d.16xlarge",
    "ml.m5d.24xlarge",
    "ml.c5.large",
    "ml.c5.xlarge",
    "ml.c5.2xlarge",
    "ml.c5.4xlarge",
    "ml.c5.9xlarge",
    "ml.c5.12xlarge",
    "ml.c5.18xlarge",
    "ml.c5.24xlarge",
    "ml.p3.2xlarge",
    "ml.p3.8xlarge",
    "ml.p3.16xlarge",
    "ml.p3dn.24xlarge",
    "ml.g4dn.xlarge",
    "ml.g4dn.2xlarge",
    "ml.g4dn.4xlarge",
    "ml.g4dn.8xlarge",
    "ml.g4dn.12xlarge",
    "ml.g4dn.16xlarge",
    "ml.r5.large",
    "ml.r5.xlarge",
    "ml.r5.2xlarge",
    "ml.r5.4xlarge",
    "ml.r5.8xlarge",
    "ml.r5.12xlarge",
    "ml.r5.16xlarge",
    "ml.r5.24xlarge",
    "ml.g5.xlarge",
    "ml.g5.2xlarge",
    "ml.g5.4xlarge",
    "ml.g5.8xlarge",
    "ml.g5.12xlarge",
    "ml.g5.16xlarge",
    "ml.g5.24xlarge",
    "ml.g5.48xlarge",
    "ml.g6.xlarge",
    "ml.g6.2xlarge",
    "ml.g6.4xlarge",
    "ml.g6.8xlarge",
    "ml.g6.12xlarge",
    "ml.g6.16xlarge",
    "ml.g6.24xlarge",
    "ml.g6.48xlarge",
    "ml.g6e.xlarge",
    "ml.g6e.2xlarge",
    "ml.g6e.4xlarge",
    "ml.g6e.8xlarge",
    "ml.g6e.12xlarge",
    "ml.g6e.16xlarge",
    "ml.g6e.24xlarge",
    "ml.g6e.48xlarge",
    "ml.geospatial.interactive",
    "ml.p4d.24xlarge",
    "ml.p4de.24xlarge",
    "ml.trn1.2xlarge",
    "ml.trn1.32xlarge",
    "ml.trn1n.32xlarge",
    "ml.p5.48xlarge",
    "ml.p5e.48xlarge",
    "ml.p5en.48xlarge",
    "ml.m6i.large",
    "ml.m6i.xlarge",
    "ml.m6i.2xlarge",
    "ml.m6i.4xlarge",
    "ml.m6i.8xlarge",
    "ml.m6i.12xlarge",
    "ml.m6i.16xlarge",
    "ml.m6i.24xlarge",
    "ml.m6i.32xlarge",
    "ml.m7i.large",
    "ml.m7i.xlarge",
    "ml.m7i.2xlarge",
    "ml.m7i.4xlarge",
    "ml.m7i.8xlarge",
    "ml.m7i.12xlarge",
    "ml.m7i.16xlarge",
    "ml.m7i.24xlarge",
    "ml.m7i.48xlarge",
    "ml.c6i.large",
    "ml.c6i.xlarge",
    "ml.c6i.2xlarge",
    "ml.c6i.4xlarge",
    "ml.c6i.8xlarge",
    "ml.c6i.12xlarge",
    "ml.c6i.16xlarge",
    "ml.c6i.24xlarge",
    "ml.c6i.32xlarge",
    "ml.c7i.large",
    "ml.c7i.xlarge",
    "ml.c7i.2xlarge",
    "ml.c7i.4xlarge",
    "ml.c7i.8xlarge",
    "ml.c7i.12xlarge",
    "ml.c7i.16xlarge",
    "ml.c7i.24xlarge",
    "ml.c7i.48xlarge",
    "ml.r6i.large",
    "ml.r6i.xlarge",
    "ml.r6i.2xlarge",
    "ml.r6i.4xlarge",
    "ml.r6i.8xlarge",
    "ml.r6i.12xlarge",
    "ml.r6i.16xlarge",
    "ml.r6i.24xlarge",
    "ml.r6i.32xlarge",
    "ml.r7i.large",
    "ml.r7i.xlarge",
    "ml.r7i.2xlarge",
    "ml.r7i.4xlarge",
    "ml.r7i.8xlarge",
    "ml.r7i.12xlarge",
    "ml.r7i.16xlarge",
    "ml.r7i.24xlarge",
    "ml.r7i.48xlarge",
    "ml.m6id.large",
    "ml.m6id.xlarge",
    "ml.m6id.2xlarge",
    "ml.m6id.4xlarge",
    "ml.m6id.8xlarge",
    "ml.m6id.12xlarge",
    "ml.m6id.16xlarge",
    "ml.m6id.24xlarge",
    "ml.m6id.32xlarge",
    "ml.c6id.large",
    "ml.c6id.xlarge",
    "ml.c6id.2xlarge",
    "ml.c6id.4xlarge",
    "ml.c6id.8xlarge",
    "ml.c6id.12xlarge",
    "ml.c6id.16xlarge",
    "ml.c6id.24xlarge",
    "ml.c6id.32xlarge",
    "ml.r6id.large",
    "ml.r6id.xlarge",
    "ml.r6id.2xlarge",
    "ml.r6id.4xlarge",
    "ml.r6id.8xlarge",
    "ml.r6id.12xlarge",
    "ml.r6id.16xlarge",
    "ml.r6id.24xlarge",
    "ml.r6id.32xlarge",
  ]).describe("The instance type that the image version runs on.").optional(),
  SageMakerImageArn: z.string().max(256).regex(
    new RegExp(
      "^arn:aws(-[\\w]+)*:sagemaker:.+:[0-9]{12}:image/[a-z0-9]([-.]?[a-z0-9])*$",
    ),
  ).describe(
    "The ARN of the SageMaker image that the image version belongs to.",
  ).optional(),
  SageMakerImageVersionArn: z.string().max(256).regex(
    new RegExp(
      "^arn:aws(-[\\w]+)*:sagemaker:.+:[0-9]{12}:image-version/[a-z0-9]([-.]?[a-z0-9])*/[0-9]+$",
    ),
  ).describe("The ARN of the image version created on the instance.")
    .optional(),
  LifecycleConfigArn: z.string().max(256).regex(
    new RegExp(
      "^(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*|None)$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the Lifecycle Configuration to attach to the Resource.",
  ).optional(),
});

const JupyterServerAppSettingsSchema = z.object({
  DefaultResourceSpec: ResourceSpecSchema.optional(),
  LifecycleConfigArns: z.array(
    z.string().max(256).regex(
      new RegExp(
        "^(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*|None)$",
      ),
    ),
  ).describe(
    "A list of LifecycleConfigArns available for use with JupyterServer apps.",
  ).optional(),
});

const CustomImageSchema = z.object({
  AppImageConfigName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The Name of the AppImageConfig."),
  ImageName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9]([-.]?[a-zA-Z0-9]){0,62}$"),
  ).describe("The name of the CustomImage. Must be unique to your account."),
  ImageVersionNumber: z.number().int().min(0).describe(
    "The version number of the CustomImage.",
  ).optional(),
});

const KernelGatewayAppSettingsSchema = z.object({
  CustomImages: z.array(CustomImageSchema).describe(
    "A list of custom SageMaker images that are configured to run as a KernelGateway app.",
  ).optional(),
  DefaultResourceSpec: ResourceSpecSchema.describe(
    "The default instance type and the Amazon Resource Name (ARN) of the default SageMaker image used by the KernelGateway app.",
  ).optional(),
  LifecycleConfigArns: z.array(
    z.string().max(256).regex(
      new RegExp(
        "^(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*|None)$",
      ),
    ),
  ).describe(
    "A list of LifecycleConfigArns available for use with KernelGateway apps.",
  ).optional(),
});

const RStudioServerProAppSettingsSchema = z.object({
  AccessStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "Indicates whether the current user has access to the RStudioServerPro app.",
  ).optional(),
  UserGroup: z.enum(["R_STUDIO_ADMIN", "R_STUDIO_USER"]).describe(
    "The level of permissions that the user has within the RStudioServerPro app. This value defaults to User. The Admin value allows the user access to the RStudio Administrative Dashboard.",
  ).optional(),
});

const CodeRepositorySchema = z.object({
  RepositoryUrl: z.string().max(256).regex(
    new RegExp("^https://([.\\-_a-zA-Z0-9]+/?){3,1016}$"),
  ).describe(
    "A CodeRepository (valid URL) to be used within Jupyter's Git extension.",
  ),
});

const IdleSettingsSchema = z.object({
  LifecycleManagement: z.enum(["ENABLED", "DISABLED"]).describe(
    "A flag to enable/disable AppLifecycleManagement settings",
  ).optional(),
  IdleTimeoutInMinutes: z.number().int().min(60).max(525600).describe(
    "The idle timeout value set in minutes",
  ).optional(),
  MinIdleTimeoutInMinutes: z.number().int().min(60).max(525600).describe(
    "The minimum idle timeout value set in minutes",
  ).optional(),
  MaxIdleTimeoutInMinutes: z.number().int().min(60).max(525600).describe(
    "The maximum idle timeout value set in minutes",
  ).optional(),
});

const AppLifecycleManagementSchema = z.object({
  IdleSettings: IdleSettingsSchema.optional(),
});

const JupyterLabAppSettingsSchema = z.object({
  DefaultResourceSpec: ResourceSpecSchema.describe(
    "The default instance type and the Amazon Resource Name (ARN) of the default SageMaker image used by the JupyterLab app.",
  ).optional(),
  LifecycleConfigArns: z.array(
    z.string().max(256).regex(
      new RegExp(
        "^(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*|None)$",
      ),
    ),
  ).describe(
    "A list of LifecycleConfigArns available for use with JupyterLab apps.",
  ).optional(),
  CodeRepositories: z.array(CodeRepositorySchema).describe(
    "A list of CodeRepositories available for use with JupyterLab apps.",
  ).optional(),
  CustomImages: z.array(CustomImageSchema).describe(
    "A list of custom images available for use for JupyterLab apps",
  ).optional(),
  AppLifecycleManagement: AppLifecycleManagementSchema.optional(),
  BuiltInLifecycleConfigArn: z.string().max(256).regex(
    new RegExp(
      "^(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*|None)$",
    ),
  ).describe(
    "The lifecycle configuration that runs before the default lifecycle configuration.",
  ).optional(),
});

const DefaultEbsStorageSettingsSchema = z.object({
  DefaultEbsVolumeSizeInGb: z.number().int().min(5).max(16384).describe(
    "Default size of the Amazon EBS volume in Gb",
  ),
  MaximumEbsVolumeSizeInGb: z.number().int().min(5).max(16384).describe(
    "Maximum size of the Amazon EBS volume in Gb. Must be greater than or equal to the DefaultEbsVolumeSizeInGb.",
  ),
});

const DefaultSpaceStorageSettingsSchema = z.object({
  DefaultEbsStorageSettings: DefaultEbsStorageSettingsSchema.describe(
    "Properties related to the Amazon Elastic Block Store volume.",
  ).optional(),
});

const CodeEditorAppSettingsSchema = z.object({
  DefaultResourceSpec: ResourceSpecSchema.describe(
    "The default instance type and the Amazon Resource Name (ARN) of the default SageMaker image used by the CodeEditor app.",
  ).optional(),
  LifecycleConfigArns: z.array(
    z.string().max(256).regex(
      new RegExp(
        "^(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*|None)$",
      ),
    ),
  ).describe(
    "A list of LifecycleConfigArns available for use with CodeEditor apps.",
  ).optional(),
  CustomImages: z.array(CustomImageSchema).describe(
    "A list of custom images for use for CodeEditor apps.",
  ).optional(),
  AppLifecycleManagement: AppLifecycleManagementSchema.optional(),
  BuiltInLifecycleConfigArn: z.string().max(256).regex(
    new RegExp(
      "^(arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:studio-lifecycle-config/.*|None)$",
    ),
  ).describe(
    "The lifecycle configuration that runs before the default lifecycle configuration.",
  ).optional(),
});

const HiddenSageMakerImageSchema = z.object({
  SageMakerImageName: z.enum(["sagemaker_distribution"]).describe(
    "The SageMaker image name that you are hiding from the Studio user interface.",
  ).optional(),
  VersionAliases: z.array(
    z.string().min(1).max(128).regex(
      new RegExp("^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)$"),
    ),
  ).optional(),
});

const StudioWebPortalSettingsSchema = z.object({
  HiddenMlTools: z.array(
    z.enum([
      "DataWrangler",
      "FeatureStore",
      "EmrClusters",
      "AutoMl",
      "Experiments",
      "Training",
      "ModelEvaluation",
      "Pipelines",
      "Models",
      "JumpStart",
      "InferenceRecommender",
      "Endpoints",
      "Projects",
      "InferenceOptimization",
      "HyperPodClusters",
      "Comet",
      "DeepchecksLLMEvaluation",
      "Fiddler",
      "LakeraGuard",
      "PerformanceEvaluation",
    ]),
  ).describe(
    "The machine learning tools that are hidden from the Studio left navigation pane.",
  ).optional(),
  HiddenAppTypes: z.array(
    z.enum([
      "JupyterServer",
      "TensorBoard",
      "RStudioServerPro",
      "JupyterLab",
      "CodeEditor",
      "DetailedProfiler",
      "Canvas",
    ]),
  ).describe(
    "Applications supported in Studio that are hidden from the Studio left navigation pane.",
  ).optional(),
  HiddenInstanceTypes: z.array(
    z.enum([
      "system",
      "ml.t3.micro",
      "ml.t3.small",
      "ml.t3.medium",
      "ml.t3.large",
      "ml.t3.xlarge",
      "ml.t3.2xlarge",
      "ml.m5.large",
      "ml.m5.xlarge",
      "ml.m5.2xlarge",
      "ml.m5.4xlarge",
      "ml.m5.8xlarge",
      "ml.m5.12xlarge",
      "ml.m5.16xlarge",
      "ml.m5.24xlarge",
      "ml.m5d.large",
      "ml.m5d.xlarge",
      "ml.m5d.2xlarge",
      "ml.m5d.4xlarge",
      "ml.m5d.8xlarge",
      "ml.m5d.12xlarge",
      "ml.m5d.16xlarge",
      "ml.m5d.24xlarge",
      "ml.c5.large",
      "ml.c5.xlarge",
      "ml.c5.2xlarge",
      "ml.c5.4xlarge",
      "ml.c5.9xlarge",
      "ml.c5.12xlarge",
      "ml.c5.18xlarge",
      "ml.c5.24xlarge",
      "ml.p3.2xlarge",
      "ml.p3.8xlarge",
      "ml.p3.16xlarge",
      "ml.p3dn.24xlarge",
      "ml.g4dn.xlarge",
      "ml.g4dn.2xlarge",
      "ml.g4dn.4xlarge",
      "ml.g4dn.8xlarge",
      "ml.g4dn.12xlarge",
      "ml.g4dn.16xlarge",
      "ml.r5.large",
      "ml.r5.xlarge",
      "ml.r5.2xlarge",
      "ml.r5.4xlarge",
      "ml.r5.8xlarge",
      "ml.r5.12xlarge",
      "ml.r5.16xlarge",
      "ml.r5.24xlarge",
      "ml.g5.xlarge",
      "ml.g5.2xlarge",
      "ml.g5.4xlarge",
      "ml.g5.8xlarge",
      "ml.g5.12xlarge",
      "ml.g5.16xlarge",
      "ml.g5.24xlarge",
      "ml.g5.48xlarge",
      "ml.g6.xlarge",
      "ml.g6.2xlarge",
      "ml.g6.4xlarge",
      "ml.g6.8xlarge",
      "ml.g6.12xlarge",
      "ml.g6.16xlarge",
      "ml.g6.24xlarge",
      "ml.g6.48xlarge",
      "ml.g6e.xlarge",
      "ml.g6e.2xlarge",
      "ml.g6e.4xlarge",
      "ml.g6e.8xlarge",
      "ml.g6e.12xlarge",
      "ml.g6e.16xlarge",
      "ml.g6e.24xlarge",
      "ml.g6e.48xlarge",
      "ml.geospatial.interactive",
      "ml.p4d.24xlarge",
      "ml.p4de.24xlarge",
      "ml.trn1.2xlarge",
      "ml.trn1.32xlarge",
      "ml.trn1n.32xlarge",
      "ml.p5.48xlarge",
      "ml.p5e.48xlarge",
      "ml.p5en.48xlarge",
      "ml.m6i.large",
      "ml.m6i.xlarge",
      "ml.m6i.2xlarge",
      "ml.m6i.4xlarge",
      "ml.m6i.8xlarge",
      "ml.m6i.12xlarge",
      "ml.m6i.16xlarge",
      "ml.m6i.24xlarge",
      "ml.m6i.32xlarge",
      "ml.m7i.large",
      "ml.m7i.xlarge",
      "ml.m7i.2xlarge",
      "ml.m7i.4xlarge",
      "ml.m7i.8xlarge",
      "ml.m7i.12xlarge",
      "ml.m7i.16xlarge",
      "ml.m7i.24xlarge",
      "ml.m7i.48xlarge",
      "ml.c6i.large",
      "ml.c6i.xlarge",
      "ml.c6i.2xlarge",
      "ml.c6i.4xlarge",
      "ml.c6i.8xlarge",
      "ml.c6i.12xlarge",
      "ml.c6i.16xlarge",
      "ml.c6i.24xlarge",
      "ml.c6i.32xlarge",
      "ml.c7i.large",
      "ml.c7i.xlarge",
      "ml.c7i.2xlarge",
      "ml.c7i.4xlarge",
      "ml.c7i.8xlarge",
      "ml.c7i.12xlarge",
      "ml.c7i.16xlarge",
      "ml.c7i.24xlarge",
      "ml.c7i.48xlarge",
      "ml.r6i.large",
      "ml.r6i.xlarge",
      "ml.r6i.2xlarge",
      "ml.r6i.4xlarge",
      "ml.r6i.8xlarge",
      "ml.r6i.12xlarge",
      "ml.r6i.16xlarge",
      "ml.r6i.24xlarge",
      "ml.r6i.32xlarge",
      "ml.r7i.large",
      "ml.r7i.xlarge",
      "ml.r7i.2xlarge",
      "ml.r7i.4xlarge",
      "ml.r7i.8xlarge",
      "ml.r7i.12xlarge",
      "ml.r7i.16xlarge",
      "ml.r7i.24xlarge",
      "ml.r7i.48xlarge",
      "ml.m6id.large",
      "ml.m6id.xlarge",
      "ml.m6id.2xlarge",
      "ml.m6id.4xlarge",
      "ml.m6id.8xlarge",
      "ml.m6id.12xlarge",
      "ml.m6id.16xlarge",
      "ml.m6id.24xlarge",
      "ml.m6id.32xlarge",
      "ml.c6id.large",
      "ml.c6id.xlarge",
      "ml.c6id.2xlarge",
      "ml.c6id.4xlarge",
      "ml.c6id.8xlarge",
      "ml.c6id.12xlarge",
      "ml.c6id.16xlarge",
      "ml.c6id.24xlarge",
      "ml.c6id.32xlarge",
      "ml.r6id.large",
      "ml.r6id.xlarge",
      "ml.r6id.2xlarge",
      "ml.r6id.4xlarge",
      "ml.r6id.8xlarge",
      "ml.r6id.12xlarge",
      "ml.r6id.16xlarge",
      "ml.r6id.24xlarge",
      "ml.r6id.32xlarge",
    ]),
  ).describe(
    "The instance types you are hiding from the Studio user interface.",
  ).optional(),
  HiddenSageMakerImageVersionAliases: z.array(HiddenSageMakerImageSchema)
    .describe(
      "The version aliases you are hiding from the Studio user interface.",
    ).optional(),
});

const CustomPosixUserConfigSchema = z.object({
  Uid: z.number().int().min(10000).max(4000000),
  Gid: z.number().int().min(1001).max(4000000),
});

const EFSFileSystemConfigSchema = z.object({
  FileSystemPath: z.string().min(1).max(256).regex(new RegExp("^\\/\\S*$"))
    .optional(),
  FileSystemId: z.string().min(11).max(21).regex(
    new RegExp("^(fs-[0-9a-f]{8,})$"),
  ),
});

const FSxLustreFileSystemConfigSchema = z.object({
  FileSystemPath: z.string().min(1).max(256).regex(new RegExp("^\\/\\S*$"))
    .optional(),
  FileSystemId: z.string().min(11).max(21).regex(
    new RegExp("^(fs-[0-9a-f]{8,})$"),
  ),
});

const S3FileSystemConfigSchema = z.object({
  MountPath: z.string().min(0).max(1024).optional(),
  S3Uri: z.string().min(0).max(1024).regex(new RegExp("(s3)://([^/]+)/?(.*)"))
    .optional(),
});

const CustomFileSystemConfigSchema = z.object({
  EFSFileSystemConfig: EFSFileSystemConfigSchema.optional(),
  FSxLustreFileSystemConfig: FSxLustreFileSystemConfigSchema.optional(),
  S3FileSystemConfig: S3FileSystemConfigSchema.optional(),
});

const SharingSettingsSchema = z.object({
  NotebookOutputOption: z.enum(["Allowed", "Disabled"]).describe(
    "Whether to include the notebook cell output when sharing the notebook. The default is Disabled.",
  ).optional(),
  S3KmsKeyId: z.string().max(2048).regex(new RegExp(".*")).describe(
    "When NotebookOutputOption is Allowed, the AWS Key Management Service (KMS) encryption key ID used to encrypt the notebook cell output in the Amazon S3 bucket.",
  ).optional(),
  S3OutputPath: z.string().max(1024).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).describe(
    "When NotebookOutputOption is Allowed, the Amazon S3 bucket used to store the shared notebook snapshots.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().min(1).max(128),
  Key: z.string().min(1).max(128),
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
  DomainId: z.string().min(1).max(63).describe(
    "The ID of the associated Domain.",
  ),
  SingleSignOnUserIdentifier: z.string().regex(new RegExp("UserName")).describe(
    "A specifier for the type of value specified in SingleSignOnUserValue. Currently, the only supported value is \"UserName\". If the Domain's AuthMode is SSO, this field is required. If the Domain's AuthMode is not SSO, this field cannot be specified.",
  ).optional(),
  SingleSignOnUserValue: z.string().min(1).max(256).describe(
    "The username of the associated AWS Single Sign-On User for this UserProfile. If the Domain's AuthMode is SSO, this field is required, and must match a valid username of a user in your directory. If the Domain's AuthMode is not SSO, this field cannot be specified.",
  ).optional(),
  UserProfileName: z.string().min(1).max(63).describe(
    "A name for the UserProfile.",
  ),
  UserSettings: z.object({
    ExecutionRole: z.string().min(20).max(2048).regex(
      new RegExp(
        "^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
      ),
    ).describe("The user profile Amazon Resource Name (ARN).").optional(),
    AutoMountHomeEFS: z.enum(["Enabled", "Disabled", "DefaultAsDomain"])
      .describe(
        "Indicates whether auto-mounting of an EFS volume is supported for the user profile.",
      ).optional(),
    JupyterServerAppSettings: JupyterServerAppSettingsSchema.describe(
      "The Jupyter server's app settings.",
    ).optional(),
    KernelGatewayAppSettings: KernelGatewayAppSettingsSchema.describe(
      "The kernel gateway app settings.",
    ).optional(),
    RStudioServerProAppSettings: RStudioServerProAppSettingsSchema.describe(
      "A collection of settings that configure user interaction with the RStudioServerPro app.",
    ).optional(),
    JupyterLabAppSettings: JupyterLabAppSettingsSchema.describe(
      "The JupyterLab app settings.",
    ).optional(),
    SpaceStorageSettings: DefaultSpaceStorageSettingsSchema.describe(
      "Default storage settings for a space.",
    ).optional(),
    CodeEditorAppSettings: CodeEditorAppSettingsSchema.describe(
      "The CodeEditor app settings.",
    ).optional(),
    StudioWebPortalSettings: StudioWebPortalSettingsSchema.describe(
      "Studio settings. If these settings are applied on a user level, they take priority over the settings applied on a domain level.",
    ).optional(),
    DefaultLandingUri: z.string().max(1023).describe(
      "Defines which Amazon SageMaker application users are directed to by default.",
    ).optional(),
    StudioWebPortal: z.enum(["ENABLED", "DISABLED"]).describe(
      "Indicates whether the Studio experience is available to users. If not, users cannot access Studio.",
    ).optional(),
    CustomPosixUserConfig: CustomPosixUserConfigSchema.optional(),
    CustomFileSystemConfigs: z.array(CustomFileSystemConfigSchema).optional(),
    SecurityGroups: z.array(
      z.string().max(32).regex(new RegExp("[-0-9a-zA-Z]+")),
    ).describe(
      "The security groups for the Amazon Virtual Private Cloud (VPC) that Studio uses for communication.",
    ).optional(),
    SharingSettings: SharingSettingsSchema.describe("The sharing settings.")
      .optional(),
  }).describe("A collection of settings.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to apply to the user profile.",
  ).optional(),
});

const StateSchema = z.object({
  UserProfileArn: z.string().optional(),
  DomainId: z.string(),
  SingleSignOnUserIdentifier: z.string().optional(),
  SingleSignOnUserValue: z.string().optional(),
  UserProfileName: z.string(),
  UserSettings: z.object({
    ExecutionRole: z.string(),
    AutoMountHomeEFS: z.string(),
    JupyterServerAppSettings: JupyterServerAppSettingsSchema,
    KernelGatewayAppSettings: KernelGatewayAppSettingsSchema,
    RStudioServerProAppSettings: RStudioServerProAppSettingsSchema,
    JupyterLabAppSettings: JupyterLabAppSettingsSchema,
    SpaceStorageSettings: DefaultSpaceStorageSettingsSchema,
    CodeEditorAppSettings: CodeEditorAppSettingsSchema,
    StudioWebPortalSettings: StudioWebPortalSettingsSchema,
    DefaultLandingUri: z.string(),
    StudioWebPortal: z.string(),
    CustomPosixUserConfig: CustomPosixUserConfigSchema,
    CustomFileSystemConfigs: z.array(CustomFileSystemConfigSchema),
    SecurityGroups: z.array(z.string()),
    SharingSettings: SharingSettingsSchema,
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
  DomainId: z.string().min(1).max(63).describe(
    "The ID of the associated Domain.",
  ).optional(),
  SingleSignOnUserIdentifier: z.string().regex(new RegExp("UserName")).describe(
    "A specifier for the type of value specified in SingleSignOnUserValue. Currently, the only supported value is \"UserName\". If the Domain's AuthMode is SSO, this field is required. If the Domain's AuthMode is not SSO, this field cannot be specified.",
  ).optional(),
  SingleSignOnUserValue: z.string().min(1).max(256).describe(
    "The username of the associated AWS Single Sign-On User for this UserProfile. If the Domain's AuthMode is SSO, this field is required, and must match a valid username of a user in your directory. If the Domain's AuthMode is not SSO, this field cannot be specified.",
  ).optional(),
  UserProfileName: z.string().min(1).max(63).describe(
    "A name for the UserProfile.",
  ).optional(),
  UserSettings: z.object({
    ExecutionRole: z.string().min(20).max(2048).regex(
      new RegExp(
        "^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
      ),
    ).describe("The user profile Amazon Resource Name (ARN).").optional(),
    AutoMountHomeEFS: z.enum(["Enabled", "Disabled", "DefaultAsDomain"])
      .describe(
        "Indicates whether auto-mounting of an EFS volume is supported for the user profile.",
      ).optional(),
    JupyterServerAppSettings: JupyterServerAppSettingsSchema.describe(
      "The Jupyter server's app settings.",
    ).optional(),
    KernelGatewayAppSettings: KernelGatewayAppSettingsSchema.describe(
      "The kernel gateway app settings.",
    ).optional(),
    RStudioServerProAppSettings: RStudioServerProAppSettingsSchema.describe(
      "A collection of settings that configure user interaction with the RStudioServerPro app.",
    ).optional(),
    JupyterLabAppSettings: JupyterLabAppSettingsSchema.describe(
      "The JupyterLab app settings.",
    ).optional(),
    SpaceStorageSettings: DefaultSpaceStorageSettingsSchema.describe(
      "Default storage settings for a space.",
    ).optional(),
    CodeEditorAppSettings: CodeEditorAppSettingsSchema.describe(
      "The CodeEditor app settings.",
    ).optional(),
    StudioWebPortalSettings: StudioWebPortalSettingsSchema.describe(
      "Studio settings. If these settings are applied on a user level, they take priority over the settings applied on a domain level.",
    ).optional(),
    DefaultLandingUri: z.string().max(1023).describe(
      "Defines which Amazon SageMaker application users are directed to by default.",
    ).optional(),
    StudioWebPortal: z.enum(["ENABLED", "DISABLED"]).describe(
      "Indicates whether the Studio experience is available to users. If not, users cannot access Studio.",
    ).optional(),
    CustomPosixUserConfig: CustomPosixUserConfigSchema.optional(),
    CustomFileSystemConfigs: z.array(CustomFileSystemConfigSchema).optional(),
    SecurityGroups: z.array(
      z.string().max(32).regex(new RegExp("[-0-9a-zA-Z]+")),
    ).describe(
      "The security groups for the Amazon Virtual Private Cloud (VPC) that Studio uses for communication.",
    ).optional(),
    SharingSettings: SharingSettingsSchema.describe("The sharing settings.")
      .optional(),
  }).describe("A collection of settings.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to apply to the user profile.",
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

/** Swamp extension model for SageMaker UserProfile. Registered at `@swamp/aws/sagemaker/user-profile`. */
export const model = {
  type: "@swamp/aws/sagemaker/user-profile",
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
      description: "SageMaker UserProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker UserProfile",
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
          "AWS::SageMaker::UserProfile",
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
      description: "Get a SageMaker UserProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker UserProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::UserProfile",
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
      description: "Update a SageMaker UserProfile",
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
          existing.UserProfileName?.toString(),
          existing.DomainId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::SageMaker::UserProfile",
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
          "AWS::SageMaker::UserProfile",
          identifier,
          currentState,
          desiredState,
          [
            "DomainId",
            "UserProfileName",
            "SingleSignOnUserIdentifier",
            "SingleSignOnUserValue",
            "AccessStatus",
            "UserGroup",
            "Tags",
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
      description: "Delete a SageMaker UserProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker UserProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::UserProfile",
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
      description: "Sync SageMaker UserProfile state from AWS",
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
          existing.UserProfileName?.toString(),
          existing.DomainId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::SageMaker::UserProfile",
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
