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

// Auto-generated extension model for @swamp/aws/sagemaker/processing-job
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker ProcessingJob (AWS::SageMaker::ProcessingJob).
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
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const VpcConfigSchema = z.object({
  SecurityGroupIds: z.array(
    z.string().min(0).max(32).regex(new RegExp("[-0-9a-zA-Z]+")),
  ).describe(
    "The VPC security group IDs, in the form 'sg-xxxxxxxx'. Specify the security groups for the VPC that is specified in the 'Subnets' field.",
  ),
  Subnets: z.array(z.string().min(0).max(32).regex(new RegExp("[-0-9a-zA-Z]+")))
    .describe(
      "The ID of the subnets in the VPC to which you want to connect your training job or model. For information about the availability of specific instance types, see https://docs.aws.amazon.com/sagemaker/latest/dg/regions-quotas.html",
    ),
});

const S3InputSchema = z.object({
  LocalPath: z.string().min(0).max(256).regex(new RegExp(".*")).describe(
    "The local path in your container where you want Amazon SageMaker to write input data to. `LocalPath` is an absolute path to the input data and must begin with `/opt/ml/processing/`. LocalPath is a required parameter when `AppManaged` is `False` (default).",
  ).optional(),
  S3CompressionType: z.enum(["None", "Gzip"]).describe(
    "Whether to GZIP-decompress the data in Amazon S3 as it is streamed into the processing container. `Gzip` can only be used when `Pipe` mode is specified as the `S3InputMode`. In `Pipe` mode, Amazon SageMaker streams input data from the source directly to your container without using the EBS volume.",
  ).optional(),
  S3DataDistributionType: z.enum(["FullyReplicated", "ShardedByS3Key"])
    .describe(
      "Whether to distribute the data from Amazon S3 to all processing instances with `FullyReplicated`, or whether the data from Amazon S3 is shared by Amazon S3 key, downloading one shard of data to each processing instance.",
    ).optional(),
  S3DataType: z.enum(["ManifestFile", "S3Prefix"]).describe(
    "Whether you use an S3Prefix or a ManifestFile for the data type. If you choose S3Prefix, S3Uri identifies a key name prefix. Amazon SageMaker uses all objects with the specified key name prefix for the processing job. If you choose ManifestFile, S3Uri identifies an object that is a manifest file containing a list of object keys that you want Amazon SageMaker to use for the processing job.",
  ),
  S3InputMode: z.enum(["File", "Pipe"]).describe(
    "Whether to use File or Pipe input mode. In File mode, Amazon SageMaker copies the data from the input source onto the local ML storage volume before starting your processing container. This is the most commonly used input mode. In Pipe mode, Amazon SageMaker streams input data from the source directly to your processing container into named pipes without using the ML storage volume.",
  ).optional(),
  S3Uri: z.string().min(0).max(1024).regex(
    new RegExp("(https|s3)://([^/]+)/?(.*)"),
  ).describe(
    "The URI of the Amazon S3 prefix Amazon SageMaker downloads data required to run a processing job.",
  ),
});

const AthenaDatasetDefinitionSchema = z.object({
  Catalog: z.string().max(256).describe(
    "The name of the data catalog used in Athena query execution.",
  ),
  Database: z.string().max(255).regex(new RegExp(".*")).describe(
    "The name of the database used in the Athena query execution.",
  ),
  OutputS3Uri: z.string().min(0).max(1024).regex(
    new RegExp("(https|s3)://([^/]+)/?(.*)"),
  ).describe(
    "The location in Amazon S3 where Athena query results are stored.",
  ),
  QueryString: z.string().max(4096).regex(new RegExp("[\\s\\S]+")).describe(
    "The SQL query statements, to be executed.",
  ),
  WorkGroup: z.string().max(128).regex(new RegExp("[a-zA-Z0-9._-]+")).describe(
    "The name of the workgroup in which the Athena query is being started.",
  ).optional(),
  OutputFormat: z.enum(["PARQUET", "AVRO", "ORC", "JSON", "TEXTFILE"]).describe(
    "The data storage format for Athena query results.",
  ),
  KmsKeyId: z.string().min(0).max(2048).regex(new RegExp("[a-zA-Z0-9:/_-]*"))
    .describe(
      "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt data generated from an Athena query execution.",
    ).optional(),
  OutputCompression: z.enum(["GZIP", "SNAPPY", "ZLIB"]).describe(
    "The compression used for Athena query results.",
  ).optional(),
});

const RedshiftDatasetDefinitionSchema = z.object({
  Database: z.string().max(64).regex(new RegExp(".*")).describe(
    "The name of the Redshift database used in Redshift query execution.",
  ),
  DbUser: z.string().max(128).regex(new RegExp(".*")).describe(
    "The database user name used in Redshift query execution.",
  ),
  QueryString: z.string().max(4096).regex(new RegExp("[\\s\\S]+")).describe(
    "The SQL query statements to be executed.",
  ),
  ClusterId: z.string().max(63).regex(new RegExp(".*")).describe(
    "The Redshift cluster Identifier.",
  ),
  ClusterRoleArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+"),
  ).describe(
    "The IAM role attached to your Redshift cluster that Amazon SageMaker uses to generate datasets.",
  ),
  OutputS3Uri: z.string().min(0).max(1024).regex(
    new RegExp("(https|s3)://([^/]+)/?(.*)"),
  ).describe(
    "The location in Amazon S3 where the Redshift query results are stored.",
  ),
  OutputFormat: z.enum(["PARQUET", "CSV"]).describe(
    "The data storage format for Redshift query results.",
  ),
  KmsKeyId: z.string().min(0).max(2048).regex(new RegExp("[a-zA-Z0-9:/_-]*"))
    .describe(
      "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt data from a Redshift execution.",
    ).optional(),
  OutputCompression: z.enum(["None", "GZIP", "SNAPPY", "ZSTD", "BZIP2"])
    .describe("The compression used for Redshift query results.").optional(),
});

const DatasetDefinitionSchema = z.object({
  AthenaDatasetDefinition: AthenaDatasetDefinitionSchema.describe(
    "Configuration for Athena Dataset Definition input.",
  ).optional(),
  RedshiftDatasetDefinition: RedshiftDatasetDefinitionSchema.describe(
    "Configuration for Redshift Dataset Definition input.",
  ).optional(),
  DataDistributionType: z.enum(["FullyReplicated", "ShardedByS3Key"]).describe(
    "Whether the generated dataset is FullyReplicated or ShardedByS3Key (default).",
  ).optional(),
  InputMode: z.enum(["File", "Pipe"]).describe(
    "Whether to use File or Pipe input mode. In File (default) mode, Amazon SageMaker copies the data from the input source onto the local Amazon Elastic Block Store (Amazon EBS) volumes before starting your training algorithm. This is the most commonly used input mode. In Pipe mode, Amazon SageMaker streams input data from the source directly to your algorithm without using the EBS volume.",
  ).optional(),
  LocalPath: z.string().min(0).max(256).regex(new RegExp(".*")).describe(
    "The local path where you want Amazon SageMaker to download the Dataset Definition inputs to run a processing job. LocalPath is an absolute path to the input data. This is a required parameter when AppManaged is False (default).",
  ).optional(),
});

const ProcessingInputsObjectSchema = z.object({
  S3Input: S3InputSchema.describe(
    "Configuration for downloading input data from Amazon S3 into the processing container.",
  ).optional(),
  DatasetDefinition: DatasetDefinitionSchema.describe(
    "Configuration for Dataset Definition inputs. The Dataset Definition input must specify exactly one of either `AthenaDatasetDefinition` or `RedshiftDatasetDefinition` types.",
  ).optional(),
  InputName: z.string().describe("The name for the processing job input."),
  AppManaged: z.boolean().describe(
    "When True, input operations such as data download are managed natively by the processing job application. When False (default), input operations are managed by Amazon SageMaker.",
  ).optional(),
});

const S3OutputSchema = z.object({
  LocalPath: z.string().min(0).max(256).regex(new RegExp(".*")).describe(
    "The local path of a directory where you want Amazon SageMaker to upload its contents to Amazon S3. LocalPath is an absolute path to a directory containing output files. This directory will be created by the platform and exist when your container's entrypoint is invoked.",
  ).optional(),
  S3UploadMode: z.enum(["Continuous", "EndOfJob"]).describe(
    "Whether to upload the results of the processing job continuously or after the job completes.",
  ),
  S3Uri: z.string().min(0).max(1024).regex(
    new RegExp("(https|s3)://([^/]+)/?(.*)"),
  ).describe(
    "A URI that identifies the Amazon S3 bucket where you want Amazon SageMaker to save the results of a processing job.",
  ),
});

const FeatureStoreOutputSchema = z.object({
  FeatureGroupName: z.string().max(64).regex(
    new RegExp("[a-zA-Z0-9]([_-]*[a-zA-Z0-9]){0,63}"),
  ).describe(
    "The name of the Amazon SageMaker FeatureGroup to use as the destination for processing job output. Note that your processing script is responsible for putting records into your Feature Store.",
  ),
});

const ProcessingOutputsObjectSchema = z.object({
  OutputName: z.string().describe("The name for the processing job output."),
  AppManaged: z.boolean().describe(
    "When True, output operations such as data upload are managed natively by the processing job application. When False (default), output operations are managed by Amazon SageMaker.",
  ).optional(),
  S3Output: S3OutputSchema.describe(
    "Configuration for uploading output data to Amazon S3 from the processing container.",
  ).optional(),
  FeatureStoreOutput: FeatureStoreOutputSchema.describe(
    "Configuration for processing job outputs in Amazon SageMaker Feature Store.",
  ).optional(),
});

const ClusterConfigSchema = z.object({
  InstanceCount: z.number().int().min(1).max(100).describe(
    "The number of ML compute instances to use in the processing job. For distributed processing jobs, specify a value greater than 1. The default value is 1.",
  ),
  InstanceType: z.enum([
    "ml.t3.medium",
    "ml.t3.large",
    "ml.t3.xlarge",
    "ml.t3.2xlarge",
    "ml.m4.xlarge",
    "ml.m4.2xlarge",
    "ml.m4.4xlarge",
    "ml.m4.10xlarge",
    "ml.m4.16xlarge",
    "ml.c4.xlarge",
    "ml.c4.2xlarge",
    "ml.c4.4xlarge",
    "ml.c4.8xlarge",
    "ml.c5.xlarge",
    "ml.c5.2xlarge",
    "ml.c5.4xlarge",
    "ml.c5.9xlarge",
    "ml.c5.18xlarge",
    "ml.m5.large",
    "ml.m5.xlarge",
    "ml.m5.2xlarge",
    "ml.m5.4xlarge",
    "ml.m5.12xlarge",
    "ml.m5.24xlarge",
    "ml.r5.large",
    "ml.r5.xlarge",
    "ml.r5.2xlarge",
    "ml.r5.4xlarge",
    "ml.r5.8xlarge",
    "ml.r5.12xlarge",
    "ml.r5.16xlarge",
    "ml.r5.24xlarge",
    "ml.g4dn.xlarge",
    "ml.g4dn.2xlarge",
    "ml.g4dn.4xlarge",
    "ml.g4dn.8xlarge",
    "ml.g4dn.12xlarge",
    "ml.g4dn.16xlarge",
    "ml.g5.xlarge",
    "ml.g5.2xlarge",
    "ml.g5.4xlarge",
    "ml.g5.8xlarge",
    "ml.g5.16xlarge",
    "ml.g5.12xlarge",
    "ml.g5.24xlarge",
    "ml.g5.48xlarge",
    "ml.r5d.large",
    "ml.r5d.xlarge",
    "ml.r5d.2xlarge",
    "ml.r5d.4xlarge",
    "ml.r5d.8xlarge",
    "ml.r5d.12xlarge",
    "ml.r5d.16xlarge",
    "ml.r5d.24xlarge",
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
    "ml.m6i.large",
    "ml.m6i.xlarge",
    "ml.m6i.2xlarge",
    "ml.m6i.4xlarge",
    "ml.m6i.8xlarge",
    "ml.m6i.12xlarge",
    "ml.m6i.16xlarge",
    "ml.m6i.24xlarge",
    "ml.m6i.32xlarge",
    "ml.c6i.xlarge",
    "ml.c6i.2xlarge",
    "ml.c6i.4xlarge",
    "ml.c6i.8xlarge",
    "ml.c6i.12xlarge",
    "ml.c6i.16xlarge",
    "ml.c6i.24xlarge",
    "ml.c6i.32xlarge",
    "ml.m7i.large",
    "ml.m7i.xlarge",
    "ml.m7i.2xlarge",
    "ml.m7i.4xlarge",
    "ml.m7i.8xlarge",
    "ml.m7i.12xlarge",
    "ml.m7i.16xlarge",
    "ml.m7i.24xlarge",
    "ml.m7i.48xlarge",
    "ml.c7i.large",
    "ml.c7i.xlarge",
    "ml.c7i.2xlarge",
    "ml.c7i.4xlarge",
    "ml.c7i.8xlarge",
    "ml.c7i.12xlarge",
    "ml.c7i.16xlarge",
    "ml.c7i.24xlarge",
    "ml.c7i.48xlarge",
    "ml.r7i.large",
    "ml.r7i.xlarge",
    "ml.r7i.2xlarge",
    "ml.r7i.4xlarge",
    "ml.r7i.8xlarge",
    "ml.r7i.12xlarge",
    "ml.r7i.16xlarge",
    "ml.r7i.24xlarge",
    "ml.r7i.48xlarge",
  ]).describe("The ML compute instance type for the processing job."),
  VolumeSizeInGB: z.number().int().min(1).max(16384).describe(
    "The size of the ML storage volume in gigabytes that you want to provision. You must specify sufficient ML storage for your scenario.",
  ),
  VolumeKmsKeyId: z.string().min(0).max(2048).regex(
    new RegExp("[a-zA-Z0-9:/_-]*"),
  ).describe(
    "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance(s) that run the processing job.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().max(256).regex(
    new RegExp("([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)", "u"),
  ).describe("The tag value."),
  Key: z.string().max(128).regex(
    new RegExp("([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)", "u"),
  ).describe("The tag key. Tag keys must be unique per resource."),
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
  AppSpecification: z.object({
    ContainerArguments: z.array(
      z.string().min(0).max(256).regex(new RegExp(".*")),
    ).describe("The arguments for a container used to run a processing job.")
      .optional(),
    ContainerEntrypoint: z.array(
      z.string().min(0).max(256).regex(new RegExp(".*")),
    ).describe("The entrypoint for a container used to run a processing job.")
      .optional(),
    ImageUri: z.string().min(0).max(256).regex(new RegExp(".*")).describe(
      "The container image to be run by the processing job.",
    ),
  }).describe(
    "Configures the processing job to run a specified Docker container image.",
  ),
  Environment: z.record(
    z.string(),
    z.string().max(256).regex(new RegExp("[\\S\\s]*")),
  ).describe("Sets the environment variables in the Docker container")
    .optional(),
  ExperimentConfig: z.object({
    ExperimentName: z.string().max(120).regex(
      new RegExp("[a-zA-Z0-9](-*[a-zA-Z0-9]){0,119}"),
    ).describe(
      "The name of an existing experiment to associate with the trial component.",
    ).optional(),
    TrialName: z.string().max(120).regex(
      new RegExp("[a-zA-Z0-9](-*[a-zA-Z0-9]){0,119}"),
    ).describe(
      "The name of an existing trial to associate the trial component with. If not specified, a new trial is created.",
    ).optional(),
    TrialComponentDisplayName: z.string().max(120).regex(
      new RegExp("[a-zA-Z0-9](-*[a-zA-Z0-9]){0,119}"),
    ).describe(
      "The display name for the trial component. If this key isn't specified, the display name is the trial component name.",
    ).optional(),
    RunName: z.string().max(120).regex(
      new RegExp("[a-zA-Z0-9](-*[a-zA-Z0-9]){0,119}"),
    ).describe(
      "The name of the experiment run to associate with the trial component.",
    ).optional(),
  }).describe(
    "Associates a SageMaker job as a trial component with an experiment and trial.",
  ).optional(),
  NetworkConfig: z.object({
    EnableInterContainerTrafficEncryption: z.boolean().describe(
      "Whether to encrypt all communications between distributed processing jobs. Choose True to encrypt communications. Encryption provides greater security for distributed processing jobs, but the processing might take longer.",
    ).optional(),
    EnableNetworkIsolation: z.boolean().describe(
      "Whether to allow inbound and outbound network calls to and from the containers used for the processing job.",
    ).optional(),
    VpcConfig: VpcConfigSchema.describe(
      "Specifies an Amazon Virtual Private Cloud (VPC) that your SageMaker jobs, hosted models, and compute resources have access to. You can control access to and from your resources by configuring a VPC. For more information, see https://docs.aws.amazon.com/sagemaker/latest/dg/infrastructure-give-access.html",
    ).optional(),
  }).describe(
    "Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.",
  ).optional(),
  ProcessingInputs: z.array(ProcessingInputsObjectSchema).describe(
    "An array of inputs configuring the data to download into the processing container.",
  ).optional(),
  ProcessingJobName: z.string().min(1).max(63).regex(
    new RegExp("[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe(
    "The name of the processing job. The name must be unique within an AWS Region in the AWS account.",
  ).optional(),
  ProcessingOutputConfig: z.object({
    KmsKeyId: z.string().max(2048).regex(new RegExp("[a-zA-Z0-9:/_-]*"))
      .describe(
        "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt the processing job output. KmsKeyId can be an ID of a KMS key, ARN of a KMS key, or alias of a KMS key. The KmsKeyId is applied to all outputs.",
      ).optional(),
    Outputs: z.array(ProcessingOutputsObjectSchema).describe(
      "An array of outputs configuring the data to upload from the processing container.",
    ),
  }).describe(
    "Configuration for uploading output from the processing container.",
  ).optional(),
  ProcessingResources: z.object({
    ClusterConfig: ClusterConfigSchema.describe(
      "Configuration for the cluster used to run a processing job.",
    ),
  }).describe(
    "Identifies the resources, ML compute instances, and ML storage volumes to deploy for a processing job. In distributed training, you specify more than one instance.",
  ),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+"),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.",
  ),
  StoppingCondition: z.object({
    MaxRuntimeInSeconds: z.number().int().min(1).max(777600).describe(
      "Specifies the maximum runtime in seconds.",
    ),
  }).describe(
    "Configures conditions under which the processing job should be stopped, such as how long the processing job has been running. After the condition is met, the processing job is stopped.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "(Optional) An array of key-value pairs. For more information, see Using Cost Allocation Tags(https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-whatURL) in the AWS Billing and Cost Management User Guide.",
  ).optional(),
});

const StateSchema = z.object({
  AppSpecification: z.object({
    ContainerArguments: z.array(z.string()),
    ContainerEntrypoint: z.array(z.string()),
    ImageUri: z.string(),
  }).optional(),
  Environment: z.record(z.string(), z.unknown()).optional(),
  ExperimentConfig: z.object({
    ExperimentName: z.string(),
    TrialName: z.string(),
    TrialComponentDisplayName: z.string(),
    RunName: z.string(),
  }).optional(),
  NetworkConfig: z.object({
    EnableInterContainerTrafficEncryption: z.boolean(),
    EnableNetworkIsolation: z.boolean(),
    VpcConfig: VpcConfigSchema,
  }).optional(),
  ProcessingInputs: z.array(ProcessingInputsObjectSchema).optional(),
  ProcessingJobName: z.string().optional(),
  ProcessingOutputConfig: z.object({
    KmsKeyId: z.string(),
    Outputs: z.array(ProcessingOutputsObjectSchema),
  }).optional(),
  ProcessingResources: z.object({
    ClusterConfig: ClusterConfigSchema,
  }).optional(),
  RoleArn: z.string().optional(),
  StoppingCondition: z.object({
    MaxRuntimeInSeconds: z.number(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  ProcessingJobArn: z.string(),
  AutoMLJobArn: z.string().optional(),
  ExitMessage: z.string().optional(),
  FailureReason: z.string().optional(),
  MonitoringScheduleArn: z.string().optional(),
  TrainingJobArn: z.string().optional(),
  ProcessingJobStatus: z.string().optional(),
  CreationTime: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  ProcessingStartTime: z.string().optional(),
  ProcessingEndTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AppSpecification: z.object({
    ContainerArguments: z.array(
      z.string().min(0).max(256).regex(new RegExp(".*")),
    ).describe("The arguments for a container used to run a processing job.")
      .optional(),
    ContainerEntrypoint: z.array(
      z.string().min(0).max(256).regex(new RegExp(".*")),
    ).describe("The entrypoint for a container used to run a processing job.")
      .optional(),
    ImageUri: z.string().min(0).max(256).regex(new RegExp(".*")).describe(
      "The container image to be run by the processing job.",
    ).optional(),
  }).describe(
    "Configures the processing job to run a specified Docker container image.",
  ).optional(),
  Environment: z.record(
    z.string(),
    z.string().max(256).regex(new RegExp("[\\S\\s]*")),
  ).describe("Sets the environment variables in the Docker container")
    .optional(),
  ExperimentConfig: z.object({
    ExperimentName: z.string().max(120).regex(
      new RegExp("[a-zA-Z0-9](-*[a-zA-Z0-9]){0,119}"),
    ).describe(
      "The name of an existing experiment to associate with the trial component.",
    ).optional(),
    TrialName: z.string().max(120).regex(
      new RegExp("[a-zA-Z0-9](-*[a-zA-Z0-9]){0,119}"),
    ).describe(
      "The name of an existing trial to associate the trial component with. If not specified, a new trial is created.",
    ).optional(),
    TrialComponentDisplayName: z.string().max(120).regex(
      new RegExp("[a-zA-Z0-9](-*[a-zA-Z0-9]){0,119}"),
    ).describe(
      "The display name for the trial component. If this key isn't specified, the display name is the trial component name.",
    ).optional(),
    RunName: z.string().max(120).regex(
      new RegExp("[a-zA-Z0-9](-*[a-zA-Z0-9]){0,119}"),
    ).describe(
      "The name of the experiment run to associate with the trial component.",
    ).optional(),
  }).describe(
    "Associates a SageMaker job as a trial component with an experiment and trial.",
  ).optional(),
  NetworkConfig: z.object({
    EnableInterContainerTrafficEncryption: z.boolean().describe(
      "Whether to encrypt all communications between distributed processing jobs. Choose True to encrypt communications. Encryption provides greater security for distributed processing jobs, but the processing might take longer.",
    ).optional(),
    EnableNetworkIsolation: z.boolean().describe(
      "Whether to allow inbound and outbound network calls to and from the containers used for the processing job.",
    ).optional(),
    VpcConfig: VpcConfigSchema.describe(
      "Specifies an Amazon Virtual Private Cloud (VPC) that your SageMaker jobs, hosted models, and compute resources have access to. You can control access to and from your resources by configuring a VPC. For more information, see https://docs.aws.amazon.com/sagemaker/latest/dg/infrastructure-give-access.html",
    ).optional(),
  }).describe(
    "Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.",
  ).optional(),
  ProcessingInputs: z.array(ProcessingInputsObjectSchema).describe(
    "An array of inputs configuring the data to download into the processing container.",
  ).optional(),
  ProcessingJobName: z.string().min(1).max(63).regex(
    new RegExp("[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe(
    "The name of the processing job. The name must be unique within an AWS Region in the AWS account.",
  ).optional(),
  ProcessingOutputConfig: z.object({
    KmsKeyId: z.string().max(2048).regex(new RegExp("[a-zA-Z0-9:/_-]*"))
      .describe(
        "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt the processing job output. KmsKeyId can be an ID of a KMS key, ARN of a KMS key, or alias of a KMS key. The KmsKeyId is applied to all outputs.",
      ).optional(),
    Outputs: z.array(ProcessingOutputsObjectSchema).describe(
      "An array of outputs configuring the data to upload from the processing container.",
    ).optional(),
  }).describe(
    "Configuration for uploading output from the processing container.",
  ).optional(),
  ProcessingResources: z.object({
    ClusterConfig: ClusterConfigSchema.describe(
      "Configuration for the cluster used to run a processing job.",
    ).optional(),
  }).describe(
    "Identifies the resources, ML compute instances, and ML storage volumes to deploy for a processing job. In distributed training, you specify more than one instance.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+"),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.",
  ).optional(),
  StoppingCondition: z.object({
    MaxRuntimeInSeconds: z.number().int().min(1).max(777600).describe(
      "Specifies the maximum runtime in seconds.",
    ).optional(),
  }).describe(
    "Configures conditions under which the processing job should be stopped, such as how long the processing job has been running. After the condition is met, the processing job is stopped.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "(Optional) An array of key-value pairs. For more information, see Using Cost Allocation Tags(https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html#allocation-whatURL) in the AWS Billing and Cost Management User Guide.",
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

/** Swamp extension model for SageMaker ProcessingJob. Registered at `@swamp/aws/sagemaker/processing-job`. */
export const model = {
  type: "@swamp/aws/sagemaker/processing-job",
  version: "2026.06.08.1",
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
      toVersion: "2026.05.09.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker ProcessingJob resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker ProcessingJob",
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
          "AWS::SageMaker::ProcessingJob",
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
      description: "Get a SageMaker ProcessingJob",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker ProcessingJob",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::ProcessingJob",
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
    delete: {
      description: "Delete a SageMaker ProcessingJob",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker ProcessingJob",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::ProcessingJob",
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
      description: "Sync SageMaker ProcessingJob state from AWS",
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
        const identifier = existing.ProcessingJobArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::ProcessingJob",
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
