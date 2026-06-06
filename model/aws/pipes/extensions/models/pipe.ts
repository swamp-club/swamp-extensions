// Auto-generated extension model for @swamp/aws/pipes/pipe
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for Pipes Pipe (AWS::Pipes::Pipe).
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

const PipeEnrichmentHttpParametersSchema = z.object({
  PathParameterValues: z.array(
    z.string().regex(
      new RegExp("^(?!\\s*$).+|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$"),
    ),
  ).optional(),
  HeaderParameters: z.record(
    z.string(),
    z.string().min(0).max(512).regex(
      new RegExp(
        "^[ \\t]*[\\x20-\\x7E]+([ \\t]+[\\x20-\\x7E]+)*[ \\t]*|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$",
      ),
    ),
  ).optional(),
  QueryStringParameters: z.record(
    z.string(),
    z.string().min(0).max(512).regex(
      new RegExp(
        "^[^\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F]+|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$",
      ),
    ),
  ).optional(),
});

const S3LogDestinationSchema = z.object({
  BucketName: z.string().optional(),
  Prefix: z.string().optional(),
  BucketOwner: z.string().optional(),
  OutputFormat: z.enum(["json", "plain", "w3c"]).optional(),
});

const FirehoseLogDestinationSchema = z.object({
  DeliveryStreamArn: z.string().min(1).max(1600).regex(
    new RegExp(
      "^(^arn:aws([a-z]|\\-)*:firehose:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):deliverystream/.+)$",
    ),
  ).optional(),
});

const CloudwatchLogsLogDestinationSchema = z.object({
  LogGroupArn: z.string().min(1).max(1600).regex(
    new RegExp(
      "^(^arn:aws([a-z]|\\-)*:logs:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):log-group:.+)$",
    ),
  ).optional(),
});

const FilterSchema = z.object({
  Pattern: z.string().min(0).max(4096).optional(),
});

const FilterCriteriaSchema = z.object({
  Filters: z.array(FilterSchema).optional(),
});

const PipeSourceKinesisStreamParametersSchema = z.object({
  BatchSize: z.number().int().min(1).max(10000).optional(),
  OnPartialBatchItemFailure: z.enum(["AUTOMATIC_BISECT"]).optional(),
  MaximumBatchingWindowInSeconds: z.number().int().min(0).max(300).optional(),
  MaximumRecordAgeInSeconds: z.number().int().min(-1).max(604800).optional(),
  MaximumRetryAttempts: z.number().int().min(-1).max(10000).optional(),
  ParallelizationFactor: z.number().int().min(1).max(10).optional(),
  StartingPosition: z.enum(["TRIM_HORIZON", "LATEST", "AT_TIMESTAMP"]),
  StartingPositionTimestamp: z.string().optional(),
});

const PipeSourceDynamoDBStreamParametersSchema = z.object({
  BatchSize: z.number().int().min(1).max(10000).optional(),
  OnPartialBatchItemFailure: z.enum(["AUTOMATIC_BISECT"]).optional(),
  MaximumBatchingWindowInSeconds: z.number().int().min(0).max(300).optional(),
  MaximumRecordAgeInSeconds: z.number().int().min(-1).max(604800).optional(),
  MaximumRetryAttempts: z.number().int().min(-1).max(10000).optional(),
  ParallelizationFactor: z.number().int().min(1).max(10).optional(),
  StartingPosition: z.enum(["TRIM_HORIZON", "LATEST"]),
});

const PipeSourceSqsQueueParametersSchema = z.object({
  BatchSize: z.number().int().min(1).max(10000).optional(),
  MaximumBatchingWindowInSeconds: z.number().int().min(0).max(300).optional(),
});

const PipeSourceActiveMQBrokerParametersSchema = z.object({
  Credentials: z.object({
    BasicAuth: z.string().min(1).max(1600).regex(
      new RegExp(
        "^(^arn:aws([a-z]|\\-)*:secretsmanager:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):secret:.+)$",
      ),
    ).describe(
      "Optional SecretManager ARN which stores the database credentials",
    ).optional(),
  }),
  QueueName: z.string().min(1).max(1000).regex(new RegExp("^[\\s\\S]*$")),
  BatchSize: z.number().int().min(1).max(10000).optional(),
  MaximumBatchingWindowInSeconds: z.number().int().min(0).max(300).optional(),
});

const PipeSourceRabbitMQBrokerParametersSchema = z.object({
  Credentials: z.object({
    BasicAuth: z.string().min(1).max(1600).regex(
      new RegExp(
        "^(^arn:aws([a-z]|\\-)*:secretsmanager:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):secret:.+)$",
      ),
    ).describe(
      "Optional SecretManager ARN which stores the database credentials",
    ).optional(),
  }),
  QueueName: z.string().min(1).max(1000).regex(new RegExp("^[\\s\\S]*$")),
  VirtualHost: z.string().min(1).max(200).regex(
    new RegExp("^[a-zA-Z0-9-\\/*:_+=.@-]*$"),
  ).optional(),
  BatchSize: z.number().int().min(1).max(10000).optional(),
  MaximumBatchingWindowInSeconds: z.number().int().min(0).max(300).optional(),
});

const PipeSourceManagedStreamingKafkaParametersSchema = z.object({
  TopicName: z.string().min(1).max(249).regex(
    new RegExp("^[^.]([a-zA-Z0-9\\-_.]+)$"),
  ),
  StartingPosition: z.enum(["TRIM_HORIZON", "LATEST"]).optional(),
  BatchSize: z.number().int().min(1).max(10000).optional(),
  MaximumBatchingWindowInSeconds: z.number().int().min(0).max(300).optional(),
  ConsumerGroupID: z.string().min(1).max(200).regex(
    new RegExp("^[a-zA-Z0-9-\\/*:_+=.@-]*$"),
  ).optional(),
  Credentials: z.object({
    SaslScram512Auth: z.string().min(1).max(1600).regex(
      new RegExp(
        "^(^arn:aws([a-z]|\\-)*:secretsmanager:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):secret:.+)$",
      ),
    ).describe(
      "Optional SecretManager ARN which stores the database credentials",
    ).optional(),
    ClientCertificateTlsAuth: z.string().min(1).max(1600).regex(
      new RegExp(
        "^(^arn:aws([a-z]|\\-)*:secretsmanager:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):secret:.+)$",
      ),
    ).describe(
      "Optional SecretManager ARN which stores the database credentials",
    ).optional(),
  }).optional(),
});

const SelfManagedKafkaAccessConfigurationVpcSchema = z.object({
  Subnets: z.array(
    z.string().min(1).max(1024).regex(new RegExp("^subnet-[0-9a-z]*$")),
  ).describe("List of SubnetId.").optional(),
  SecurityGroup: z.array(
    z.string().min(1).max(1024).regex(new RegExp("^sg-[0-9a-zA-Z]*$")),
  ).describe("List of SecurityGroupId.").optional(),
});

const PipeSourceSelfManagedKafkaParametersSchema = z.object({
  TopicName: z.string().min(1).max(249).regex(
    new RegExp("^[^.]([a-zA-Z0-9\\-_.]+)$"),
  ),
  StartingPosition: z.enum(["TRIM_HORIZON", "LATEST"]).optional(),
  AdditionalBootstrapServers: z.array(
    z.string().min(1).max(300).regex(
      new RegExp(
        "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-]*[A-Za-z0-9]):[0-9]{1,5}$",
      ),
    ),
  ).optional(),
  BatchSize: z.number().int().min(1).max(10000).optional(),
  MaximumBatchingWindowInSeconds: z.number().int().min(0).max(300).optional(),
  ConsumerGroupID: z.string().min(1).max(200).regex(
    new RegExp("^[a-zA-Z0-9-\\/*:_+=.@-]*$"),
  ).optional(),
  Credentials: z.object({
    BasicAuth: z.string().min(1).max(1600).regex(
      new RegExp(
        "^(^arn:aws([a-z]|\\-)*:secretsmanager:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):secret:.+)$",
      ),
    ).describe(
      "Optional SecretManager ARN which stores the database credentials",
    ).optional(),
    SaslScram512Auth: z.string().min(1).max(1600).regex(
      new RegExp(
        "^(^arn:aws([a-z]|\\-)*:secretsmanager:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):secret:.+)$",
      ),
    ).describe(
      "Optional SecretManager ARN which stores the database credentials",
    ).optional(),
    SaslScram256Auth: z.string().min(1).max(1600).regex(
      new RegExp(
        "^(^arn:aws([a-z]|\\-)*:secretsmanager:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):secret:.+)$",
      ),
    ).describe(
      "Optional SecretManager ARN which stores the database credentials",
    ).optional(),
    ClientCertificateTlsAuth: z.string().min(1).max(1600).regex(
      new RegExp(
        "^(^arn:aws([a-z]|\\-)*:secretsmanager:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):secret:.+)$",
      ),
    ).describe(
      "Optional SecretManager ARN which stores the database credentials",
    ).optional(),
  }).optional(),
  ServerRootCaCertificate: z.string().min(1).max(1600).regex(
    new RegExp(
      "^(^arn:aws([a-z]|\\-)*:secretsmanager:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):secret:.+)$",
    ),
  ).describe("Optional SecretManager ARN which stores the database credentials")
    .optional(),
  Vpc: SelfManagedKafkaAccessConfigurationVpcSchema.optional(),
});

const PipeTargetLambdaFunctionParametersSchema = z.object({
  InvocationType: z.enum(["REQUEST_RESPONSE", "FIRE_AND_FORGET"]).optional(),
});

const PipeTargetStateMachineParametersSchema = z.object({
  InvocationType: z.enum(["REQUEST_RESPONSE", "FIRE_AND_FORGET"]).optional(),
});

const PipeTargetKinesisStreamParametersSchema = z.object({
  PartitionKey: z.string().min(0).max(256),
});

const AwsVpcConfigurationSchema = z.object({
  Subnets: z.array(
    z.string().min(1).max(1024).regex(
      new RegExp("^subnet-[0-9a-z]*|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$"),
    ),
  ),
  SecurityGroups: z.array(
    z.string().min(1).max(1024).regex(
      new RegExp("^sg-[0-9a-zA-Z]*|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$"),
    ),
  ).optional(),
  AssignPublicIp: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const NetworkConfigurationSchema = z.object({
  AwsvpcConfiguration: AwsVpcConfigurationSchema.optional(),
});

const CapacityProviderStrategyItemSchema = z.object({
  CapacityProvider: z.string().min(1).max(255),
  Weight: z.number().int().min(0).max(1000).optional(),
  Base: z.number().int().min(0).max(100000).optional(),
});

const PlacementConstraintSchema = z.object({
  Type: z.enum(["distinctInstance", "memberOf"]).optional(),
  Expression: z.string().min(0).max(2000).optional(),
});

const PlacementStrategySchema = z.object({
  Type: z.enum(["random", "spread", "binpack"]).optional(),
  Field: z.string().min(0).max(255).optional(),
});

const EcsEnvironmentVariableSchema = z.object({
  Name: z.string().optional(),
  Value: z.string().optional(),
});

const EcsEnvironmentFileSchema = z.object({
  Type: z.enum(["s3"]),
  Value: z.string(),
});

const EcsResourceRequirementSchema = z.object({
  Type: z.enum(["GPU", "InferenceAccelerator"]),
  Value: z.string(),
});

const EcsContainerOverrideSchema = z.object({
  Command: z.array(z.string()).optional(),
  Cpu: z.number().int().optional(),
  Environment: z.array(EcsEnvironmentVariableSchema).optional(),
  EnvironmentFiles: z.array(EcsEnvironmentFileSchema).optional(),
  Memory: z.number().int().optional(),
  MemoryReservation: z.number().int().optional(),
  Name: z.string().optional(),
  ResourceRequirements: z.array(EcsResourceRequirementSchema).optional(),
});

const EcsEphemeralStorageSchema = z.object({
  SizeInGiB: z.number().int().min(21).max(200),
});

const EcsInferenceAcceleratorOverrideSchema = z.object({
  DeviceName: z.string().optional(),
  DeviceType: z.string().optional(),
});

const EcsTaskOverrideSchema = z.object({
  ContainerOverrides: z.array(EcsContainerOverrideSchema).optional(),
  Cpu: z.string().optional(),
  EphemeralStorage: EcsEphemeralStorageSchema.optional(),
  ExecutionRoleArn: z.string().min(1).max(1600).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-]+):([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.+)|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$",
    ),
  ).optional(),
  InferenceAcceleratorOverrides: z.array(EcsInferenceAcceleratorOverrideSchema)
    .optional(),
  Memory: z.string().optional(),
  TaskRoleArn: z.string().min(1).max(1600).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-]+):([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.+)|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$",
    ),
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const PipeTargetEcsTaskParametersSchema = z.object({
  TaskDefinitionArn: z.string().min(1).max(1600).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-]+):([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.+)|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$",
    ),
  ),
  TaskCount: z.number().int().min(1).optional(),
  LaunchType: z.enum(["EC2", "FARGATE", "EXTERNAL"]).optional(),
  NetworkConfiguration: NetworkConfigurationSchema.optional(),
  PlatformVersion: z.string().optional(),
  Group: z.string().optional(),
  CapacityProviderStrategy: z.array(CapacityProviderStrategyItemSchema)
    .optional(),
  EnableECSManagedTags: z.boolean().optional(),
  EnableExecuteCommand: z.boolean().optional(),
  PlacementConstraints: z.array(PlacementConstraintSchema).optional(),
  PlacementStrategy: z.array(PlacementStrategySchema).optional(),
  PropagateTags: z.enum(["TASK_DEFINITION"]).optional(),
  ReferenceId: z.string().min(0).max(1024).optional(),
  Overrides: EcsTaskOverrideSchema.optional(),
  Tags: z.array(TagSchema).optional(),
});

const BatchArrayPropertiesSchema = z.object({
  Size: z.number().int().min(2).max(10000).optional(),
});

const BatchRetryStrategySchema = z.object({
  Attempts: z.number().int().min(1).max(10).optional(),
});

const BatchEnvironmentVariableSchema = z.object({
  Name: z.string().optional(),
  Value: z.string().optional(),
});

const BatchResourceRequirementSchema = z.object({
  Type: z.enum(["GPU", "MEMORY", "VCPU"]),
  Value: z.string(),
});

const BatchContainerOverridesSchema = z.object({
  Command: z.array(z.string()).optional(),
  Environment: z.array(BatchEnvironmentVariableSchema).optional(),
  InstanceType: z.string().optional(),
  ResourceRequirements: z.array(BatchResourceRequirementSchema).optional(),
});

const BatchJobDependencySchema = z.object({
  JobId: z.string().optional(),
  Type: z.enum(["N_TO_N", "SEQUENTIAL"]).optional(),
});

const PipeTargetBatchJobParametersSchema = z.object({
  JobDefinition: z.string(),
  JobName: z.string(),
  ArrayProperties: BatchArrayPropertiesSchema.optional(),
  RetryStrategy: BatchRetryStrategySchema.optional(),
  ContainerOverrides: BatchContainerOverridesSchema.optional(),
  DependsOn: z.array(BatchJobDependencySchema).optional(),
  Parameters: z.record(z.string(), z.string()).optional(),
});

const PipeTargetSqsQueueParametersSchema = z.object({
  MessageGroupId: z.string().min(0).max(100).optional(),
  MessageDeduplicationId: z.string().min(0).max(100).optional(),
});

const PipeTargetHttpParametersSchema = z.object({
  PathParameterValues: z.array(
    z.string().regex(
      new RegExp("^(?!\\s*$).+|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$"),
    ),
  ).optional(),
  HeaderParameters: z.record(
    z.string(),
    z.string().min(0).max(512).regex(
      new RegExp(
        "^[ \\t]*[\\x20-\\x7E]+([ \\t]+[\\x20-\\x7E]+)*[ \\t]*|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$",
      ),
    ),
  ).optional(),
  QueryStringParameters: z.record(
    z.string(),
    z.string().min(0).max(512).regex(
      new RegExp(
        "^[^\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F]+|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$",
      ),
    ),
  ).optional(),
});

const PipeTargetRedshiftDataParametersSchema = z.object({
  SecretManagerArn: z.string().min(1).max(1600).regex(
    new RegExp(
      "^(^arn:aws([a-z]|\\-)*:secretsmanager:([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}):(\\d{12}):secret:.+)|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$",
    ),
  ).describe("Optional SecretManager ARN which stores the database credentials")
    .optional(),
  Database: z.string().min(1).max(64).describe("Redshift Database"),
  DbUser: z.string().min(1).max(128).describe("Database user name").optional(),
  StatementName: z.string().min(1).max(500).describe(
    "A name for Redshift DataAPI statement which can be used as filter of ListStatement.",
  ).optional(),
  WithEvent: z.boolean().optional(),
  Sqls: z.array(z.string().min(1).max(100000)).describe("A list of SQLs."),
});

const SageMakerPipelineParameterSchema = z.object({
  Name: z.string().min(1).max(256).regex(
    new RegExp(
      "^[a-zA-Z0-9](-*[a-zA-Z0-9])*|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$",
    ),
  ),
  Value: z.string().min(0).max(1024),
});

const PipeTargetSageMakerPipelineParametersSchema = z.object({
  PipelineParameterList: z.array(SageMakerPipelineParameterSchema).optional(),
});

const PipeTargetEventBridgeEventBusParametersSchema = z.object({
  EndpointId: z.string().min(1).max(50).regex(
    new RegExp("^[A-Za-z0-9\\-]+[\\.][A-Za-z0-9\\-]+$"),
  ).optional(),
  DetailType: z.string().min(1).max(128).optional(),
  Source: z.string().min(1).max(256).regex(
    new RegExp(
      "(?=[/\\.\\-_A-Za-z0-9]+)((?!aws\\.).*)|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)",
    ),
  ).optional(),
  Resources: z.array(
    z.string().min(1).max(1600).regex(
      new RegExp(
        "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-]+):([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.+)|(\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*)$",
      ),
    ),
  ).optional(),
  Time: z.string().min(1).max(256).regex(
    new RegExp("^\\$(\\.[\\w/_-]+(\\[(\\d+|\\*)\\])*)*$"),
  ).optional(),
});

const PipeTargetCloudWatchLogsParametersSchema = z.object({
  LogStreamName: z.string().min(1).max(256).optional(),
  Timestamp: z.string().min(1).max(256).regex(
    new RegExp("^\\$(\\.[\\w_-]+(\\[(\\d+|\\*)\\])*)*$"),
  ).optional(),
});

const DimensionMappingSchema = z.object({
  DimensionValue: z.string().min(1).max(2048),
  DimensionValueType: z.enum(["VARCHAR"]),
  DimensionName: z.string().min(1).max(256),
});

const SingleMeasureMappingSchema = z.object({
  MeasureValue: z.string().min(1).max(2048),
  MeasureValueType: z.enum([
    "DOUBLE",
    "BIGINT",
    "VARCHAR",
    "BOOLEAN",
    "TIMESTAMP",
  ]),
  MeasureName: z.string().min(1).max(1024),
});

const MultiMeasureAttributeMappingSchema = z.object({
  MeasureValue: z.string().min(1).max(2048),
  MeasureValueType: z.enum([
    "DOUBLE",
    "BIGINT",
    "VARCHAR",
    "BOOLEAN",
    "TIMESTAMP",
  ]),
  MultiMeasureAttributeName: z.string().min(1).max(256),
});

const MultiMeasureMappingSchema = z.object({
  MultiMeasureName: z.string().min(1).max(256),
  MultiMeasureAttributeMappings: z.array(MultiMeasureAttributeMappingSchema),
});

const PipeTargetTimestreamParametersSchema = z.object({
  TimeValue: z.string().min(1).max(256),
  EpochTimeUnit: z.enum([
    "MILLISECONDS",
    "SECONDS",
    "MICROSECONDS",
    "NANOSECONDS",
  ]).optional(),
  TimeFieldType: z.enum(["EPOCH", "TIMESTAMP_FORMAT"]).optional(),
  TimestampFormat: z.string().min(1).max(256).optional(),
  VersionValue: z.string().min(1).max(256),
  DimensionMappings: z.array(DimensionMappingSchema),
  SingleMeasureMappings: z.array(SingleMeasureMappingSchema).optional(),
  MultiMeasureMappings: z.array(MultiMeasureMappingSchema).optional(),
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
  Description: z.string().min(0).max(512).regex(new RegExp("^.*$")).optional(),
  DesiredState: z.enum(["RUNNING", "STOPPED"]).optional(),
  Enrichment: z.string().min(0).max(1600).regex(
    new RegExp(
      "^$|arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-]+):([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.+)$",
    ),
  ).optional(),
  EnrichmentParameters: z.object({
    InputTemplate: z.string().min(0).max(8192).optional(),
    HttpParameters: PipeEnrichmentHttpParametersSchema.optional(),
  }).optional(),
  KmsKeyIdentifier: z.string().min(0).max(2048).optional(),
  LogConfiguration: z.object({
    S3LogDestination: S3LogDestinationSchema.optional(),
    FirehoseLogDestination: FirehoseLogDestinationSchema.optional(),
    CloudwatchLogsLogDestination: CloudwatchLogsLogDestinationSchema.optional(),
    Level: z.enum(["OFF", "ERROR", "INFO", "TRACE"]).optional(),
    IncludeExecutionData: z.array(z.enum(["ALL"])).optional(),
  }).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\.\\-_A-Za-z0-9]+$"))
    .optional(),
  RoleArn: z.string().min(1).max(1600).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role/?[a-zA-Z0-9+=,.@\\-_/]+$",
    ),
  ),
  Source: z.string().min(1).max(1600).regex(
    new RegExp(
      "^smk://(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-]*[A-Za-z0-9]):[0-9]{1,5}|arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-]+):([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.+)$",
    ),
  ),
  SourceParameters: z.object({
    FilterCriteria: FilterCriteriaSchema.optional(),
    KinesisStreamParameters: PipeSourceKinesisStreamParametersSchema.optional(),
    DynamoDBStreamParameters: PipeSourceDynamoDBStreamParametersSchema
      .optional(),
    SqsQueueParameters: PipeSourceSqsQueueParametersSchema.optional(),
    ActiveMQBrokerParameters: PipeSourceActiveMQBrokerParametersSchema
      .optional(),
    RabbitMQBrokerParameters: PipeSourceRabbitMQBrokerParametersSchema
      .optional(),
    ManagedStreamingKafkaParameters:
      PipeSourceManagedStreamingKafkaParametersSchema.optional(),
    SelfManagedKafkaParameters: PipeSourceSelfManagedKafkaParametersSchema
      .optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
  Target: z.string().min(1).max(1600).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-]+):([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.+)$",
    ),
  ),
  TargetParameters: z.object({
    InputTemplate: z.string().min(0).max(8192).optional(),
    LambdaFunctionParameters: PipeTargetLambdaFunctionParametersSchema
      .optional(),
    StepFunctionStateMachineParameters: PipeTargetStateMachineParametersSchema
      .optional(),
    KinesisStreamParameters: PipeTargetKinesisStreamParametersSchema.optional(),
    EcsTaskParameters: PipeTargetEcsTaskParametersSchema.optional(),
    BatchJobParameters: PipeTargetBatchJobParametersSchema.optional(),
    SqsQueueParameters: PipeTargetSqsQueueParametersSchema.optional(),
    HttpParameters: PipeTargetHttpParametersSchema.optional(),
    RedshiftDataParameters: PipeTargetRedshiftDataParametersSchema.optional(),
    SageMakerPipelineParameters: PipeTargetSageMakerPipelineParametersSchema
      .optional(),
    EventBridgeEventBusParameters: PipeTargetEventBridgeEventBusParametersSchema
      .optional(),
    CloudWatchLogsParameters: PipeTargetCloudWatchLogsParametersSchema
      .optional(),
    TimestreamParameters: PipeTargetTimestreamParametersSchema.optional(),
  }).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  CreationTime: z.string().optional(),
  CurrentState: z.string().optional(),
  Description: z.string().optional(),
  DesiredState: z.string().optional(),
  Enrichment: z.string().optional(),
  EnrichmentParameters: z.object({
    InputTemplate: z.string(),
    HttpParameters: PipeEnrichmentHttpParametersSchema,
  }).optional(),
  KmsKeyIdentifier: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  LogConfiguration: z.object({
    S3LogDestination: S3LogDestinationSchema,
    FirehoseLogDestination: FirehoseLogDestinationSchema,
    CloudwatchLogsLogDestination: CloudwatchLogsLogDestinationSchema,
    Level: z.string(),
    IncludeExecutionData: z.array(z.string()),
  }).optional(),
  Name: z.string(),
  RoleArn: z.string().optional(),
  Source: z.string().optional(),
  SourceParameters: z.object({
    FilterCriteria: FilterCriteriaSchema,
    KinesisStreamParameters: PipeSourceKinesisStreamParametersSchema,
    DynamoDBStreamParameters: PipeSourceDynamoDBStreamParametersSchema,
    SqsQueueParameters: PipeSourceSqsQueueParametersSchema,
    ActiveMQBrokerParameters: PipeSourceActiveMQBrokerParametersSchema,
    RabbitMQBrokerParameters: PipeSourceRabbitMQBrokerParametersSchema,
    ManagedStreamingKafkaParameters:
      PipeSourceManagedStreamingKafkaParametersSchema,
    SelfManagedKafkaParameters: PipeSourceSelfManagedKafkaParametersSchema,
  }).optional(),
  StateReason: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Target: z.string().optional(),
  TargetParameters: z.object({
    InputTemplate: z.string(),
    LambdaFunctionParameters: PipeTargetLambdaFunctionParametersSchema,
    StepFunctionStateMachineParameters: PipeTargetStateMachineParametersSchema,
    KinesisStreamParameters: PipeTargetKinesisStreamParametersSchema,
    EcsTaskParameters: PipeTargetEcsTaskParametersSchema,
    BatchJobParameters: PipeTargetBatchJobParametersSchema,
    SqsQueueParameters: PipeTargetSqsQueueParametersSchema,
    HttpParameters: PipeTargetHttpParametersSchema,
    RedshiftDataParameters: PipeTargetRedshiftDataParametersSchema,
    SageMakerPipelineParameters: PipeTargetSageMakerPipelineParametersSchema,
    EventBridgeEventBusParameters:
      PipeTargetEventBridgeEventBusParametersSchema,
    CloudWatchLogsParameters: PipeTargetCloudWatchLogsParametersSchema,
    TimestreamParameters: PipeTargetTimestreamParametersSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(0).max(512).regex(new RegExp("^.*$")).optional(),
  DesiredState: z.enum(["RUNNING", "STOPPED"]).optional(),
  Enrichment: z.string().min(0).max(1600).regex(
    new RegExp(
      "^$|arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-]+):([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.+)$",
    ),
  ).optional(),
  EnrichmentParameters: z.object({
    InputTemplate: z.string().min(0).max(8192).optional(),
    HttpParameters: PipeEnrichmentHttpParametersSchema.optional(),
  }).optional(),
  KmsKeyIdentifier: z.string().min(0).max(2048).optional(),
  LogConfiguration: z.object({
    S3LogDestination: S3LogDestinationSchema.optional(),
    FirehoseLogDestination: FirehoseLogDestinationSchema.optional(),
    CloudwatchLogsLogDestination: CloudwatchLogsLogDestinationSchema.optional(),
    Level: z.enum(["OFF", "ERROR", "INFO", "TRACE"]).optional(),
    IncludeExecutionData: z.array(z.enum(["ALL"])).optional(),
  }).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\.\\-_A-Za-z0-9]+$"))
    .optional(),
  RoleArn: z.string().min(1).max(1600).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:iam::\\d{12}:role/?[a-zA-Z0-9+=,.@\\-_/]+$",
    ),
  ).optional(),
  Source: z.string().min(1).max(1600).regex(
    new RegExp(
      "^smk://(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-]*[A-Za-z0-9]):[0-9]{1,5}|arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-]+):([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.+)$",
    ),
  ).optional(),
  SourceParameters: z.object({
    FilterCriteria: FilterCriteriaSchema.optional(),
    KinesisStreamParameters: PipeSourceKinesisStreamParametersSchema.optional(),
    DynamoDBStreamParameters: PipeSourceDynamoDBStreamParametersSchema
      .optional(),
    SqsQueueParameters: PipeSourceSqsQueueParametersSchema.optional(),
    ActiveMQBrokerParameters: PipeSourceActiveMQBrokerParametersSchema
      .optional(),
    RabbitMQBrokerParameters: PipeSourceRabbitMQBrokerParametersSchema
      .optional(),
    ManagedStreamingKafkaParameters:
      PipeSourceManagedStreamingKafkaParametersSchema.optional(),
    SelfManagedKafkaParameters: PipeSourceSelfManagedKafkaParametersSchema
      .optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).optional(),
  Target: z.string().min(1).max(1600).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-]+):([a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.+)$",
    ),
  ).optional(),
  TargetParameters: z.object({
    InputTemplate: z.string().min(0).max(8192).optional(),
    LambdaFunctionParameters: PipeTargetLambdaFunctionParametersSchema
      .optional(),
    StepFunctionStateMachineParameters: PipeTargetStateMachineParametersSchema
      .optional(),
    KinesisStreamParameters: PipeTargetKinesisStreamParametersSchema.optional(),
    EcsTaskParameters: PipeTargetEcsTaskParametersSchema.optional(),
    BatchJobParameters: PipeTargetBatchJobParametersSchema.optional(),
    SqsQueueParameters: PipeTargetSqsQueueParametersSchema.optional(),
    HttpParameters: PipeTargetHttpParametersSchema.optional(),
    RedshiftDataParameters: PipeTargetRedshiftDataParametersSchema.optional(),
    SageMakerPipelineParameters: PipeTargetSageMakerPipelineParametersSchema
      .optional(),
    EventBridgeEventBusParameters: PipeTargetEventBridgeEventBusParametersSchema
      .optional(),
    CloudWatchLogsParameters: PipeTargetCloudWatchLogsParametersSchema
      .optional(),
    TimestreamParameters: PipeTargetTimestreamParametersSchema.optional(),
  }).optional(),
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

/** Swamp extension model for Pipes Pipe. Registered at `@swamp/aws/pipes/pipe`. */
export const model = {
  type: "@swamp/aws/pipes/pipe",
  version: "2026.06.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      description: "Pipes Pipe resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Pipes Pipe",
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
          "AWS::Pipes::Pipe",
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
      description: "Get a Pipes Pipe",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Pipes Pipe",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Pipes::Pipe",
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
      description: "Update a Pipes Pipe",
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
          "AWS::Pipes::Pipe",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Pipes::Pipe",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "Source",
            "StartingPosition",
            "StartingPosition",
            "StartingPositionTimestamp",
            "QueueName",
            "QueueName",
            "VirtualHost",
            "TopicName",
            "StartingPosition",
            "ConsumerGroupID",
            "TopicName",
            "StartingPosition",
            "AdditionalBootstrapServers",
            "ConsumerGroupID",
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
      description: "Delete a Pipes Pipe",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Pipes Pipe",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Pipes::Pipe",
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
      description: "Sync Pipes Pipe state from AWS",
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
            "AWS::Pipes::Pipe",
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
