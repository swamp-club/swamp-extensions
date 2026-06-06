// Auto-generated extension model for @swamp/aws/sagemaker/model-explainability-job-definition
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker ModelExplainabilityJobDefinition (AWS::SageMaker::ModelExplainabilityJobDefinition).
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

const ConstraintsResourceSchema = z.object({
  S3Uri: z.string().max(1024).regex(new RegExp("^(https|s3)://([^/]+)/?(.*)$"))
    .describe(
      "The Amazon S3 URI for baseline constraint file in Amazon S3 that the current monitoring job should validated against.",
    ).optional(),
});

const EndpointInputSchema = z.object({
  EndpointName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
  ).describe("The name of the endpoint used to run the monitoring job."),
  LocalPath: z.string().max(256).regex(new RegExp(".*")).describe(
    "Path to the filesystem where the endpoint data is available to the container.",
  ),
  S3DataDistributionType: z.enum(["FullyReplicated", "ShardedByS3Key"])
    .describe(
      "Whether input data distributed in Amazon S3 is fully replicated or sharded by an S3 key. Defauts to FullyReplicated",
    ).optional(),
  S3InputMode: z.enum(["Pipe", "File"]).describe(
    "Whether the Pipe or File is used as the input mode for transfering data for the monitoring job. Pipe mode is recommended for large datasets. File mode is useful for small files that fit in memory. Defaults to File.",
  ).optional(),
  FeaturesAttribute: z.string().max(256).describe(
    "JSONpath to locate features in JSONlines dataset",
  ).optional(),
  InferenceAttribute: z.string().max(256).describe(
    "Index or JSONpath to locate predicted label(s)",
  ).optional(),
  ProbabilityAttribute: z.string().max(256).describe(
    "Index or JSONpath to locate probabilities",
  ).optional(),
});

const CsvSchema = z.object({
  Header: z.boolean().describe(
    "A boolean flag indicating if given CSV has header",
  ).optional(),
});

const JsonSchema = z.object({
  Line: z.boolean().describe(
    "A boolean flag indicating if it is JSON line format",
  ).optional(),
});

const DatasetFormatSchema = z.object({
  Csv: CsvSchema.describe("The CSV format").optional(),
  Json: JsonSchema.describe("The Json format").optional(),
  Parquet: z.boolean().describe(
    "A flag indicating if the dataset format is Parquet",
  ).optional(),
});

const BatchTransformInputSchema = z.object({
  DataCapturedDestinationS3Uri: z.string().max(512).regex(
    new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
  ).describe(
    "A URI that identifies the Amazon S3 storage location where Batch Transform Job captures data.",
  ),
  DatasetFormat: DatasetFormatSchema.describe(
    "The dataset format of the data to monitor",
  ),
  LocalPath: z.string().max(256).regex(new RegExp(".*")).describe(
    "Path to the filesystem where the endpoint data is available to the container.",
  ),
  S3DataDistributionType: z.enum(["FullyReplicated", "ShardedByS3Key"])
    .describe(
      "Whether input data distributed in Amazon S3 is fully replicated or sharded by an S3 key. Defauts to FullyReplicated",
    ).optional(),
  S3InputMode: z.enum(["Pipe", "File"]).describe(
    "Whether the Pipe or File is used as the input mode for transfering data for the monitoring job. Pipe mode is recommended for large datasets. File mode is useful for small files that fit in memory. Defaults to File.",
  ).optional(),
  FeaturesAttribute: z.string().max(256).describe(
    "JSONpath to locate features in JSONlines dataset",
  ).optional(),
  InferenceAttribute: z.string().max(256).describe(
    "Index or JSONpath to locate predicted label(s)",
  ).optional(),
  ProbabilityAttribute: z.string().max(256).describe(
    "Index or JSONpath to locate probabilities",
  ).optional(),
});

const S3OutputSchema = z.object({
  LocalPath: z.string().max(256).regex(new RegExp(".*")).describe(
    "The local path to the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job. LocalPath is an absolute path for the output data.",
  ),
  S3UploadMode: z.enum(["Continuous", "EndOfJob"]).describe(
    "Whether to upload the results of the monitoring job continuously or after the job completes.",
  ).optional(),
  S3Uri: z.string().max(512).regex(new RegExp("^(https|s3)://([^/]+)/?(.*)$"))
    .describe(
      "A URI that identifies the Amazon S3 storage location where Amazon SageMaker saves the results of a monitoring job.",
    ),
});

const MonitoringOutputSchema = z.object({
  S3Output: S3OutputSchema.describe(
    "Information about where and how to store the results of a monitoring job.",
  ),
});

const ClusterConfigSchema = z.object({
  InstanceCount: z.number().int().min(1).max(100).describe(
    "The number of ML compute instances to use in the model monitoring job. For distributed processing jobs, specify a value greater than 1. The default value is 1.",
  ),
  InstanceType: z.string().describe(
    "The ML compute instance type for the processing job.",
  ),
  VolumeKmsKeyId: z.string().describe(
    "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt data on the storage volume attached to the ML compute instance(s) that run the model monitoring job.",
  ).optional(),
  VolumeSizeInGB: z.number().int().min(1).max(16384).describe(
    "The size of the ML storage volume, in gigabytes, that you want to provision. You must specify sufficient ML storage for your scenario.",
  ),
});

const VpcConfigSchema = z.object({
  SecurityGroupIds: z.array(
    z.string().max(32).regex(new RegExp("[-0-9a-zA-Z]+")),
  ).describe(
    "The VPC security group IDs, in the form sg-xxxxxxxx. Specify the security groups for the VPC that is specified in the Subnets field.",
  ),
  Subnets: z.array(z.string().max(32).regex(new RegExp("[-0-9a-zA-Z]+")))
    .describe(
      "The ID of the subnets in the VPC to which you want to connect to your monitoring jobs.",
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
  JobDefinitionName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name of the job definition.").optional(),
  ModelExplainabilityBaselineConfig: z.object({
    BaseliningJobName: z.string().min(1).max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe("The name of a processing job").optional(),
    ConstraintsResource: ConstraintsResourceSchema.describe(
      "The baseline constraints resource for a monitoring job.",
    ).optional(),
  }).describe(
    "Baseline configuration used to validate that the data conforms to the specified constraints and statistics.",
  ).optional(),
  ModelExplainabilityAppSpecification: z.object({
    ImageUri: z.string().max(255).regex(new RegExp(".*")).describe(
      "The container image to be run by the monitoring job.",
    ),
    ConfigUri: z.string().max(1024).regex(
      new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
    ).describe("The S3 URI to an analysis configuration file"),
    Environment: z.record(z.string(), z.string().min(1).max(256)).describe(
      "Sets the environment variables in the Docker container",
    ).optional(),
  }).describe("Container image configuration object for the monitoring job."),
  ModelExplainabilityJobInput: z.object({
    EndpointInput: EndpointInputSchema.describe(
      "The endpoint for a monitoring job.",
    ).optional(),
    BatchTransformInput: BatchTransformInputSchema.describe(
      "The batch transform input for a monitoring job.",
    ).optional(),
  }).describe("The inputs for a monitoring job."),
  ModelExplainabilityJobOutputConfig: z.object({
    KmsKeyId: z.string().max(2048).regex(new RegExp(".*")).describe(
      "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt the model artifacts at rest using Amazon S3 server-side encryption.",
    ).optional(),
    MonitoringOutputs: z.array(MonitoringOutputSchema).describe(
      "Monitoring outputs for monitoring jobs. This is where the output of the periodic monitoring jobs is uploaded.",
    ),
  }).describe("The output configuration for monitoring jobs."),
  JobResources: z.object({
    ClusterConfig: ClusterConfigSchema.describe(
      "Configuration for the cluster used to run model monitoring jobs.",
    ),
  }).describe("Identifies the resources to deploy for a monitoring job."),
  NetworkConfig: z.object({
    EnableInterContainerTrafficEncryption: z.boolean().describe(
      "Whether to encrypt all communications between distributed processing jobs. Choose True to encrypt communications. Encryption provides greater security for distributed processing jobs, but the processing might take longer.",
    ).optional(),
    EnableNetworkIsolation: z.boolean().describe(
      "Whether to allow inbound and outbound network calls to and from the containers used for the processing job.",
    ).optional(),
    VpcConfig: VpcConfigSchema.describe(
      "Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC.",
    ).optional(),
  }).describe(
    "Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.",
  ).optional(),
  EndpointName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
  ).describe("The name of the endpoint used to run the monitoring job.")
    .optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.",
  ),
  StoppingCondition: z.object({
    MaxRuntimeInSeconds: z.number().int().min(1).max(86400).describe(
      "The maximum runtime allowed in seconds.",
    ),
  }).describe(
    "Specifies a time limit for how long the monitoring job is allowed to run.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  JobDefinitionArn: z.string(),
  JobDefinitionName: z.string().optional(),
  ModelExplainabilityBaselineConfig: z.object({
    BaseliningJobName: z.string(),
    ConstraintsResource: ConstraintsResourceSchema,
  }).optional(),
  ModelExplainabilityAppSpecification: z.object({
    ImageUri: z.string(),
    ConfigUri: z.string(),
    Environment: z.record(z.string(), z.unknown()),
  }).optional(),
  ModelExplainabilityJobInput: z.object({
    EndpointInput: EndpointInputSchema,
    BatchTransformInput: BatchTransformInputSchema,
  }).optional(),
  ModelExplainabilityJobOutputConfig: z.object({
    KmsKeyId: z.string(),
    MonitoringOutputs: z.array(MonitoringOutputSchema),
  }).optional(),
  JobResources: z.object({
    ClusterConfig: ClusterConfigSchema,
  }).optional(),
  NetworkConfig: z.object({
    EnableInterContainerTrafficEncryption: z.boolean(),
    EnableNetworkIsolation: z.boolean(),
    VpcConfig: VpcConfigSchema,
  }).optional(),
  EndpointName: z.string().optional(),
  RoleArn: z.string().optional(),
  StoppingCondition: z.object({
    MaxRuntimeInSeconds: z.number(),
  }).optional(),
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
  JobDefinitionName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ).describe("The name of the job definition.").optional(),
  ModelExplainabilityBaselineConfig: z.object({
    BaseliningJobName: z.string().min(1).max(63).regex(
      new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
    ).describe("The name of a processing job").optional(),
    ConstraintsResource: ConstraintsResourceSchema.describe(
      "The baseline constraints resource for a monitoring job.",
    ).optional(),
  }).describe(
    "Baseline configuration used to validate that the data conforms to the specified constraints and statistics.",
  ).optional(),
  ModelExplainabilityAppSpecification: z.object({
    ImageUri: z.string().max(255).regex(new RegExp(".*")).describe(
      "The container image to be run by the monitoring job.",
    ).optional(),
    ConfigUri: z.string().max(1024).regex(
      new RegExp("^(https|s3)://([^/]+)/?(.*)$"),
    ).describe("The S3 URI to an analysis configuration file").optional(),
    Environment: z.record(z.string(), z.string().min(1).max(256)).describe(
      "Sets the environment variables in the Docker container",
    ).optional(),
  }).describe("Container image configuration object for the monitoring job.")
    .optional(),
  ModelExplainabilityJobInput: z.object({
    EndpointInput: EndpointInputSchema.describe(
      "The endpoint for a monitoring job.",
    ).optional(),
    BatchTransformInput: BatchTransformInputSchema.describe(
      "The batch transform input for a monitoring job.",
    ).optional(),
  }).describe("The inputs for a monitoring job.").optional(),
  ModelExplainabilityJobOutputConfig: z.object({
    KmsKeyId: z.string().max(2048).regex(new RegExp(".*")).describe(
      "The AWS Key Management Service (AWS KMS) key that Amazon SageMaker uses to encrypt the model artifacts at rest using Amazon S3 server-side encryption.",
    ).optional(),
    MonitoringOutputs: z.array(MonitoringOutputSchema).describe(
      "Monitoring outputs for monitoring jobs. This is where the output of the periodic monitoring jobs is uploaded.",
    ).optional(),
  }).describe("The output configuration for monitoring jobs.").optional(),
  JobResources: z.object({
    ClusterConfig: ClusterConfigSchema.describe(
      "Configuration for the cluster used to run model monitoring jobs.",
    ).optional(),
  }).describe("Identifies the resources to deploy for a monitoring job.")
    .optional(),
  NetworkConfig: z.object({
    EnableInterContainerTrafficEncryption: z.boolean().describe(
      "Whether to encrypt all communications between distributed processing jobs. Choose True to encrypt communications. Encryption provides greater security for distributed processing jobs, but the processing might take longer.",
    ).optional(),
    EnableNetworkIsolation: z.boolean().describe(
      "Whether to allow inbound and outbound network calls to and from the containers used for the processing job.",
    ).optional(),
    VpcConfig: VpcConfigSchema.describe(
      "Specifies a VPC that your training jobs and hosted models have access to. Control access to and from your training and model containers by configuring the VPC.",
    ).optional(),
  }).describe(
    "Networking options for a job, such as network traffic encryption between containers, whether to allow inbound and outbound network calls to and from containers, and the VPC subnets and security groups to use for VPC-enabled jobs.",
  ).optional(),
  EndpointName: z.string().max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*"),
  ).describe("The name of the endpoint used to run the monitoring job.")
    .optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role that Amazon SageMaker can assume to perform tasks on your behalf.",
  ).optional(),
  StoppingCondition: z.object({
    MaxRuntimeInSeconds: z.number().int().min(1).max(86400).describe(
      "The maximum runtime allowed in seconds.",
    ).optional(),
  }).describe(
    "Specifies a time limit for how long the monitoring job is allowed to run.",
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

/** Swamp extension model for SageMaker ModelExplainabilityJobDefinition. Registered at `@swamp/aws/sagemaker/model-explainability-job-definition`. */
export const model = {
  type: "@swamp/aws/sagemaker/model-explainability-job-definition",
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
      description: "SageMaker ModelExplainabilityJobDefinition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker ModelExplainabilityJobDefinition",
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
          "AWS::SageMaker::ModelExplainabilityJobDefinition",
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
      description: "Get a SageMaker ModelExplainabilityJobDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker ModelExplainabilityJobDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::ModelExplainabilityJobDefinition",
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
      description: "Delete a SageMaker ModelExplainabilityJobDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker ModelExplainabilityJobDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::ModelExplainabilityJobDefinition",
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
      description:
        "Sync SageMaker ModelExplainabilityJobDefinition state from AWS",
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
        const identifier = existing.JobDefinitionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::ModelExplainabilityJobDefinition",
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
