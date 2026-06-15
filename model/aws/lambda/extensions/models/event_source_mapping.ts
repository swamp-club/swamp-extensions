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

// Auto-generated extension model for @swamp/aws/lambda/event-source-mapping
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lambda EventSourceMapping (AWS::Lambda::EventSourceMapping).
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

const OnFailureSchema = z.object({
  Destination: z.string().min(12).max(1024).regex(
    new RegExp(
      "^$|kafka://([^.]([a-zA-Z0-9\\-_.]{0,248}))|arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the destination resource. To retain records of unsuccessful [asynchronous invocations](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html#invocation-async-destinations), you can configure an Amazon SNS topic, Amazon SQS queue, Amazon S3 bucket, Lambda function, or Amazon EventBridge event bus as the destination. Amazon SNS destinations have a message size limit of 256 KB. If the combined size of the function request and response payload exceeds the limit, Lambda will drop the payload when sending OnFailure event to the destination. For details on this behavior, refer to [Retaining records of asynchronous invocations](https://docs.aws.amazon.com/lambda/latest/dg/invocation-async-retain-records.html). To retain records of failed invocations from [Kinesis](https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html), [DynamoDB](https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html), [self-managed Kafka](https://docs.aws.amazon.com/lambda/latest/dg/with-kafka.html#services-smaa-onfailure-destination) or [Amazon MSK](https://docs.aws.amazon.com/lambda/latest/dg/with-msk.html#services-msk-onfailure-destination), you can configure an Amazon SNS topic, Amazon SQS queue, or Amazon S3 bucket as the destination.",
  ).optional(),
});

const FilterSchema = z.object({
  Pattern: z.string().min(0).max(4096).regex(new RegExp(".*")).describe(
    "A filter pattern. For more information on the syntax of a filter pattern, see [Filter rule syntax](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventfiltering.html#filtering-syntax).",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key for this tag."),
  Value: z.string().min(0).max(256).describe("The value for this tag.")
    .optional(),
});

const SourceAccessConfigurationSchema = z.object({
  Type: z.enum([
    "BASIC_AUTH",
    "VPC_SUBNET",
    "VPC_SECURITY_GROUP",
    "SASL_SCRAM_512_AUTH",
    "SASL_SCRAM_256_AUTH",
    "VIRTUAL_HOST",
    "CLIENT_CERTIFICATE_TLS_AUTH",
    "SERVER_ROOT_CA_CERTIFICATE",
  ]).describe(
    'The type of authentication protocol, VPC components, or virtual host for your event source. For example: "Type":"SASL_SCRAM_512_AUTH". BASIC_AUTH – (Amazon MQ) The ASMlong secret that stores your broker credentials. BASIC_AUTH – (Self-managed Apache Kafka) The Secrets Manager ARN of your secret key used for SASL/PLAIN authentication of your Apache Kafka brokers. VPC_SUBNET – (Self-managed Apache Kafka) The subnets associated with your VPC. Lambda connects to these subnets to fetch data from your self-managed Apache Kafka cluster. VPC_SECURITY_GROUP – (Self-managed Apache Kafka) The VPC security group used to manage access to your self-managed Apache Kafka brokers. SASL_SCRAM_256_AUTH – (Self-managed Apache Kafka) The Secrets Manager ARN of your secret key used for SASL SCRAM-256 authentication of your self-managed Apache Kafka brokers. SASL_SCRAM_512_AUTH – (Amazon MSK, Self-managed Apache Kafka) The Secrets Manager ARN of your secret key used for SASL SCRAM-512 authentication of your self-managed Apache Kafka brokers. VIRTUAL_HOST –- (RabbitMQ) The name of the virtual host in your RabbitMQ broker. Lambda uses this RabbitMQ host as the event source. This property cannot be specified in an UpdateEventSourceMapping API call. CLIENT_CERTIFICATE_TLS_AUTH – (Amazon MSK, self-managed Apache Kafka) The Secrets Manager ARN of your secret key containing the certificate chain (X.509 PEM), private key (PKCS#8 PEM), and private key password (optional) used for mutual TLS authentication of your MSK/Apache Kafka brokers. SERVER_ROOT_CA_CERTIFICATE – (Self-managed Apache Kafka) The Secrets Manager ARN of your secret key containing the root CA certificate (X.509 PEM) used for TLS encryption of your Apache Kafka brokers.',
  ).optional(),
  URI: z.string().min(1).max(200).regex(new RegExp("[a-zA-Z0-9-\\/*:_+=.@-]*"))
    .describe(
      'The value for your chosen configuration in Type. For example: "URI": "arn:aws:secretsmanager:us-east-1:01234567890:secret:MyBrokerSecretName".',
    ).optional(),
});

const EndpointsSchema = z.object({
  KafkaBootstrapServers: z.array(
    z.string().min(1).max(300).regex(
      new RegExp(
        "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\\-]*[A-Za-z0-9]):[0-9]{1,5}",
      ),
    ),
  ).describe(
    'The list of bootstrap servers for your Kafka brokers in the following format: "KafkaBootstrapServers": ["abc.xyz.com:xxxx","abc2.xyz.com:xxxx"].',
  ).optional(),
});

const SchemaRegistryAccessConfigSchema = z.object({
  Type: z.enum([
    "BASIC_AUTH",
    "CLIENT_CERTIFICATE_TLS_AUTH",
    "SERVER_ROOT_CA_CERTIFICATE",
  ]).describe(
    "The type of authentication Lambda uses to access your schema registry.",
  ).optional(),
  URI: z.string().min(1).max(10000).regex(
    new RegExp(
      "arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)",
    ),
  ).describe(
    "The URI of the secret (Secrets Manager secret ARN) to authenticate with your schema registry.",
  ).optional(),
});

const SchemaValidationConfigSchema = z.object({
  Attribute: z.enum(["KEY", "VALUE"]).describe(
    "The attributes you want your schema registry to validate and filter for. If you selected JSON as the EventRecordFormat, Lambda also deserializes the selected message attributes.",
  ).optional(),
});

const SchemaRegistryConfigSchema = z.object({
  SchemaRegistryURI: z.string().min(1).max(10000).regex(
    new RegExp("[a-zA-Z0-9-/*:_+=.@-]*"),
  ).describe(
    "The URI for your schema registry. The correct URI format depends on the type of schema registry you're using. For GLU schema registries, use the ARN of the registry. For Confluent schema registries, use the URL of the registry.",
  ).optional(),
  EventRecordFormat: z.enum(["JSON", "SOURCE"]).describe(
    "The record format that Lambda delivers to your function after schema validation. Choose JSON to have Lambda deliver the record to your function as a standard JSON object. Choose SOURCE to have Lambda deliver the record to your function in its original source format. Lambda removes all schema metadata, such as the schema ID, before sending the record to your function.",
  ).optional(),
  AccessConfigs: z.array(SchemaRegistryAccessConfigSchema).describe(
    "An array of access configuration objects that tell Lambda how to authenticate with your schema registry.",
  ).optional(),
  SchemaValidationConfigs: z.array(SchemaValidationConfigSchema).describe(
    "An array of schema validation configuration objects, which tell Lambda the message attributes you want to validate and filter using your schema registry.",
  ).optional(),
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
  BatchSize: z.number().int().min(1).max(10000).describe(
    "The maximum number of records in each batch that Lambda pulls from your stream or queue and sends to your function. Lambda passes all of the records in the batch to the function in a single call, up to the payload limit for synchronous invocation (6 MB). *Amazon Kinesis* – Default 100. Max 10,000. *Amazon DynamoDB Streams* – Default 100. Max 10,000. *Amazon Simple Queue Service* – Default 10. For standard queues the max is 10,000. For FIFO queues the max is 10. *Amazon Managed Streaming for Apache Kafka* – Default 100. Max 10,000. *Self-managed Apache Kafka* – Default 100. Max 10,000. *Amazon MQ (ActiveMQ and RabbitMQ)* – Default 100. Max 10,000. *DocumentDB* – Default 100. Max 10,000.",
  ).optional(),
  BisectBatchOnFunctionError: z.boolean().describe(
    "(Kinesis and DynamoDB Streams only) If the function returns an error, split the batch in two and retry. The default value is false. When using BisectBatchOnFunctionError, check the BatchSize parameter in the OnFailure destination message's metadata. The BatchSize could be greater than 1 since LAM consolidates failed messages metadata when writing to the OnFailure destination.",
  ).optional(),
  DestinationConfig: z.object({
    OnFailure: OnFailureSchema.describe(
      "The destination configuration for failed invocations.",
    ).optional(),
  }).describe(
    "(Kinesis, DynamoDB Streams, Amazon MSK, and self-managed Apache Kafka event sources only) A configuration object that specifies the destination of an event after Lambda processes it.",
  ).optional(),
  Enabled: z.boolean().describe(
    "When true, the event source mapping is active. When false, Lambda pauses polling and invocation. Default: True",
  ).optional(),
  EventSourceArn: z.string().min(12).max(1024).regex(
    new RegExp(
      "arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the event source. *Amazon Kinesis* – The ARN of the data stream or a stream consumer. *Amazon DynamoDB Streams* – The ARN of the stream. *Amazon Simple Queue Service* – The ARN of the queue. *Amazon Managed Streaming for Apache Kafka* – The ARN of the cluster or the ARN of the VPC connection (for [cross-account event source mappings](https://docs.aws.amazon.com/lambda/latest/dg/with-msk.html#msk-multi-vpc)). *Amazon MQ* – The ARN of the broker. *Amazon DocumentDB* – The ARN of the DocumentDB change stream.",
  ).optional(),
  FilterCriteria: z.object({
    Filters: z.array(FilterSchema).describe("A list of filters.").optional(),
  }).describe(
    "An object that defines the filter criteria that determine whether Lambda should process an event. For more information, see [Lambda event filtering](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventfiltering.html).",
  ).optional(),
  KmsKeyArn: z.string().min(12).max(2048).regex(
    new RegExp("(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()"),
  ).describe(
    "The ARN of the KMSlong (KMS) customer managed key that Lambda uses to encrypt your function's [filter criteria](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventfiltering.html#filtering-basics).",
  ).optional(),
  FunctionName: z.string().min(1).max(140).regex(
    new RegExp(
      "(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?",
    ),
  ).describe(
    "The name or ARN of the Lambda function. **Name formats** *Function name* – MyFunction. *Function ARN* – arn:aws:lambda:us-west-2:123456789012:function:MyFunction. *Version or Alias ARN* – arn:aws:lambda:us-west-2:123456789012:function:MyFunction:PROD. *Partial ARN* – 123456789012:function:MyFunction. The length constraint applies only to the full ARN. If you specify only the function name, it's limited to 64 characters in length.",
  ),
  MaximumBatchingWindowInSeconds: z.number().int().min(0).max(300).describe(
    "The maximum amount of time, in seconds, that Lambda spends gathering records before invoking the function. *Default (,, event sources)*: 0 *Default (, Kafka,, event sources)*: 500 ms *Related setting:* For SQS event sources, when you set BatchSize to a value greater than 10, you must set MaximumBatchingWindowInSeconds to at least 1.",
  ).optional(),
  MaximumRecordAgeInSeconds: z.number().int().min(-1).max(604800).describe(
    "(Kinesis and DynamoDB Streams only) Discard records older than the specified age. The default value is -1, which sets the maximum age to infinite. When the value is set to infinite, Lambda never discards old records. The minimum valid value for maximum record age is 60s. Although values less than 60 and greater than -1 fall within the parameter's absolute range, they are not allowed",
  ).optional(),
  MaximumRetryAttempts: z.number().int().min(-1).max(10000).describe(
    "(Kinesis and DynamoDB Streams only) Discard records after the specified number of retries. The default value is -1, which sets the maximum number of retries to infinite. When MaximumRetryAttempts is infinite, Lambda retries failed records until the record expires in the event source.",
  ).optional(),
  ParallelizationFactor: z.number().int().min(1).max(10).describe(
    "(Kinesis and DynamoDB Streams only) The number of batches to process concurrently from each shard. The default value is 1.",
  ).optional(),
  StartingPosition: z.string().min(6).max(12).regex(
    new RegExp("(LATEST|TRIM_HORIZON|AT_TIMESTAMP)+"),
  ).describe(
    "The position in a stream from which to start reading. Required for Amazon Kinesis and Amazon DynamoDB. *LATEST* - Read only new records. *TRIM_HORIZON* - Process all available records. *AT_TIMESTAMP* - Specify a time from which to start reading records.",
  ).optional(),
  StartingPositionTimestamp: z.number().describe(
    "With StartingPosition set to AT_TIMESTAMP, the time from which to start reading, in Unix time seconds. StartingPositionTimestamp cannot be in the future.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to add to the event source mapping. You must have the lambda:TagResource, lambda:UntagResource, and lambda:ListTags permissions for your [principal](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html) to manage the CFN stack. If you don't have these permissions, there might be unexpected behavior with stack-level tags propagating to the resource during resource creation and update.",
  ).optional(),
  Topics: z.array(
    z.string().min(1).max(249).regex(new RegExp("^[^.]([a-zA-Z0-9\\-_.]+)")),
  ).describe("The name of the Kafka topic.").optional(),
  Queues: z.array(z.string().min(1).max(1000).regex(new RegExp("[\\s\\S]*")))
    .describe(
      "(Amazon MQ) The name of the Amazon MQ broker destination queue to consume.",
    ).optional(),
  SourceAccessConfigurations: z.array(SourceAccessConfigurationSchema).describe(
    "An array of the authentication protocol, VPC components, or virtual host to secure and define your event source.",
  ).optional(),
  TumblingWindowInSeconds: z.number().int().min(0).max(900).describe(
    "(Kinesis and DynamoDB Streams only) The duration in seconds of a processing window for DynamoDB and Kinesis Streams event sources. A value of 0 seconds indicates no tumbling window.",
  ).optional(),
  FunctionResponseTypes: z.array(z.enum(["ReportBatchItemFailures"])).describe(
    "(Kinesis, DynamoDB Streams, and SQS) A list of current response type enums applied to the event source mapping. Valid Values: ReportBatchItemFailures",
  ).optional(),
  SelfManagedEventSource: z.object({
    Endpoints: EndpointsSchema.describe(
      'The list of bootstrap servers for your Kafka brokers in the following format: "KafkaBootstrapServers": ["abc.xyz.com:xxxx","abc2.xyz.com:xxxx"].',
    ).optional(),
  }).describe("The self-managed Apache Kafka cluster for your event source.")
    .optional(),
  AmazonManagedKafkaEventSourceConfig: z.object({
    ConsumerGroupId: z.string().min(1).max(200).regex(
      new RegExp("[a-zA-Z0-9-\\/*:_+=.@-]*"),
    ).describe(
      "The identifier for the Kafka consumer group to join. The consumer group ID must be unique among all your Kafka event sources. After creating a Kafka event source mapping with the consumer group ID specified, you cannot update this value. For more information, see [Customizable consumer group ID](https://docs.aws.amazon.com/lambda/latest/dg/with-msk.html#services-msk-consumer-group-id).",
    ).optional(),
    SchemaRegistryConfig: SchemaRegistryConfigSchema.describe(
      "Specific configuration settings for a Kafka schema registry.",
    ).optional(),
  }).describe(
    "Specific configuration settings for an Amazon Managed Streaming for Apache Kafka (Amazon MSK) event source.",
  ).optional(),
  SelfManagedKafkaEventSourceConfig: z.object({
    ConsumerGroupId: z.string().min(1).max(200).regex(
      new RegExp("[a-zA-Z0-9-\\/*:_+=.@-]*"),
    ).describe(
      "The identifier for the Kafka consumer group to join. The consumer group ID must be unique among all your Kafka event sources. After creating a Kafka event source mapping with the consumer group ID specified, you cannot update this value. For more information, see [Customizable consumer group ID](https://docs.aws.amazon.com/lambda/latest/dg/with-kafka-process.html#services-smaa-topic-add).",
    ).optional(),
    SchemaRegistryConfig: SchemaRegistryConfigSchema.describe(
      "Specific configuration settings for a Kafka schema registry.",
    ).optional(),
  }).describe(
    "Specific configuration settings for a self-managed Apache Kafka event source.",
  ).optional(),
  ScalingConfig: z.object({
    MaximumConcurrency: z.number().int().min(2).max(1000).describe(
      "Limits the number of concurrent instances that the SQS event source can invoke.",
    ).optional(),
  }).describe(
    "This property is for Amazon SQS event sources only. You cannot use ProvisionedPollerConfig while using ScalingConfig. These options are mutually exclusive. To remove the scaling configuration, pass an empty value.",
  ).optional(),
  DocumentDBEventSourceConfig: z.object({
    DatabaseName: z.string().min(1).max(63).describe(
      "The name of the database to consume within the DocumentDB cluster.",
    ).optional(),
    CollectionName: z.string().min(1).max(57).describe(
      "The name of the collection to consume within the database. If you do not specify a collection, Lambda consumes all collections.",
    ).optional(),
    FullDocument: z.enum(["UpdateLookup", "Default"]).describe(
      "Determines what DocumentDB sends to your event stream during document update operations. If set to UpdateLookup, DocumentDB sends a delta describing the changes, along with a copy of the entire document. Otherwise, DocumentDB sends only a partial document that contains the changes.",
    ).optional(),
  }).describe("Specific configuration settings for a DocumentDB event source.")
    .optional(),
  ProvisionedPollerConfig: z.object({
    MinimumPollers: z.number().int().min(1).max(200).describe(
      "The minimum number of event pollers this event source can scale down to. For Amazon SQS events source mappings, default is 2, and minimum 2 required. For Amazon MSK and self-managed Apache Kafka event source mappings, default is 1.",
    ).optional(),
    MaximumPollers: z.number().int().min(1).max(2000).describe(
      "The maximum number of event pollers this event source can scale up to. For Amazon SQS events source mappings, default is 200, and minimum value allowed is 2. For Amazon MSK and self-managed Apache Kafka event source mappings, default is 200, and minimum value allowed is 1.",
    ).optional(),
    PollerGroupName: z.string().min(0).max(128).optional(),
  }).describe(
    "(Amazon SQS, Amazon MSK, and self-managed Apache Kafka only) The provisioned mode configuration for the event source. For more information, see [provisioned mode](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html#invocation-eventsourcemapping-provisioned-mode).",
  ).optional(),
  MetricsConfig: z.object({
    Metrics: z.array(z.enum(["EventCount", "ErrorCount", "KafkaMetrics"]))
      .describe(
        "The metrics you want your event source mapping to produce. Include EventCount to receive event source mapping metrics related to the number of events processed by your event source mapping. For more information about these metrics, see [Event source mapping metrics](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-types.html#event-source-mapping-metrics).",
      ).optional(),
  }).describe(
    "The metrics configuration for your event source. For more information, see [Event source mapping metrics](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-types.html#event-source-mapping-metrics).",
  ).optional(),
  LoggingConfig: z.object({
    SystemLogLevel: z.enum(["DEBUG", "INFO", "WARN"]).describe(
      "Set this property to filter the system logs for your function that Lambda sends to CloudWatch. Lambda only sends system logs at the selected level of detail and lower, where DEBUG is the highest level and WARN is the lowest.",
    ).optional(),
  }).describe("The function's Amazon CloudWatch Logs configuration settings.")
    .optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  BatchSize: z.number().optional(),
  BisectBatchOnFunctionError: z.boolean().optional(),
  DestinationConfig: z.object({
    OnFailure: OnFailureSchema,
  }).optional(),
  Enabled: z.boolean().optional(),
  EventSourceArn: z.string().optional(),
  EventSourceMappingArn: z.string().optional(),
  FilterCriteria: z.object({
    Filters: z.array(FilterSchema),
  }).optional(),
  KmsKeyArn: z.string().optional(),
  FunctionName: z.string().optional(),
  MaximumBatchingWindowInSeconds: z.number().optional(),
  MaximumRecordAgeInSeconds: z.number().optional(),
  MaximumRetryAttempts: z.number().optional(),
  ParallelizationFactor: z.number().optional(),
  StartingPosition: z.string().optional(),
  StartingPositionTimestamp: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
  Topics: z.array(z.string()).optional(),
  Queues: z.array(z.string()).optional(),
  SourceAccessConfigurations: z.array(SourceAccessConfigurationSchema)
    .optional(),
  TumblingWindowInSeconds: z.number().optional(),
  FunctionResponseTypes: z.array(z.string()).optional(),
  SelfManagedEventSource: z.object({
    Endpoints: EndpointsSchema,
  }).optional(),
  AmazonManagedKafkaEventSourceConfig: z.object({
    ConsumerGroupId: z.string(),
    SchemaRegistryConfig: SchemaRegistryConfigSchema,
  }).optional(),
  SelfManagedKafkaEventSourceConfig: z.object({
    ConsumerGroupId: z.string(),
    SchemaRegistryConfig: SchemaRegistryConfigSchema,
  }).optional(),
  ScalingConfig: z.object({
    MaximumConcurrency: z.number(),
  }).optional(),
  DocumentDBEventSourceConfig: z.object({
    DatabaseName: z.string(),
    CollectionName: z.string(),
    FullDocument: z.string(),
  }).optional(),
  ProvisionedPollerConfig: z.object({
    MinimumPollers: z.number(),
    MaximumPollers: z.number(),
    PollerGroupName: z.string(),
  }).optional(),
  MetricsConfig: z.object({
    Metrics: z.array(z.string()),
  }).optional(),
  LoggingConfig: z.object({
    SystemLogLevel: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  BatchSize: z.number().int().min(1).max(10000).describe(
    "The maximum number of records in each batch that Lambda pulls from your stream or queue and sends to your function. Lambda passes all of the records in the batch to the function in a single call, up to the payload limit for synchronous invocation (6 MB). *Amazon Kinesis* – Default 100. Max 10,000. *Amazon DynamoDB Streams* – Default 100. Max 10,000. *Amazon Simple Queue Service* – Default 10. For standard queues the max is 10,000. For FIFO queues the max is 10. *Amazon Managed Streaming for Apache Kafka* – Default 100. Max 10,000. *Self-managed Apache Kafka* – Default 100. Max 10,000. *Amazon MQ (ActiveMQ and RabbitMQ)* – Default 100. Max 10,000. *DocumentDB* – Default 100. Max 10,000.",
  ).optional(),
  BisectBatchOnFunctionError: z.boolean().describe(
    "(Kinesis and DynamoDB Streams only) If the function returns an error, split the batch in two and retry. The default value is false. When using BisectBatchOnFunctionError, check the BatchSize parameter in the OnFailure destination message's metadata. The BatchSize could be greater than 1 since LAM consolidates failed messages metadata when writing to the OnFailure destination.",
  ).optional(),
  DestinationConfig: z.object({
    OnFailure: OnFailureSchema.describe(
      "The destination configuration for failed invocations.",
    ).optional(),
  }).describe(
    "(Kinesis, DynamoDB Streams, Amazon MSK, and self-managed Apache Kafka event sources only) A configuration object that specifies the destination of an event after Lambda processes it.",
  ).optional(),
  Enabled: z.boolean().describe(
    "When true, the event source mapping is active. When false, Lambda pauses polling and invocation. Default: True",
  ).optional(),
  EventSourceArn: z.string().min(12).max(1024).regex(
    new RegExp(
      "arn:(aws[a-zA-Z0-9-]*):([a-zA-Z0-9\\-])+:((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1})?:(\\d{12})?:(.*)",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the event source. *Amazon Kinesis* – The ARN of the data stream or a stream consumer. *Amazon DynamoDB Streams* – The ARN of the stream. *Amazon Simple Queue Service* – The ARN of the queue. *Amazon Managed Streaming for Apache Kafka* – The ARN of the cluster or the ARN of the VPC connection (for [cross-account event source mappings](https://docs.aws.amazon.com/lambda/latest/dg/with-msk.html#msk-multi-vpc)). *Amazon MQ* – The ARN of the broker. *Amazon DocumentDB* – The ARN of the DocumentDB change stream.",
  ).optional(),
  FilterCriteria: z.object({
    Filters: z.array(FilterSchema).describe("A list of filters.").optional(),
  }).describe(
    "An object that defines the filter criteria that determine whether Lambda should process an event. For more information, see [Lambda event filtering](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventfiltering.html).",
  ).optional(),
  KmsKeyArn: z.string().min(12).max(2048).regex(
    new RegExp("(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()"),
  ).describe(
    "The ARN of the KMSlong (KMS) customer managed key that Lambda uses to encrypt your function's [filter criteria](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventfiltering.html#filtering-basics).",
  ).optional(),
  FunctionName: z.string().min(1).max(140).regex(
    new RegExp(
      "(arn:(aws[a-zA-Z-]*)?:lambda:)?((eusc-)?[a-z]{2}((-gov)|(-iso([a-z]?)))?-[a-z]+-\\d{1}:)?(\\d{12}:)?(function:)?([a-zA-Z0-9-_]+)(:(\\$LATEST(\\.PUBLISHED)?|[a-zA-Z0-9-_]+))?",
    ),
  ).describe(
    "The name or ARN of the Lambda function. **Name formats** *Function name* – MyFunction. *Function ARN* – arn:aws:lambda:us-west-2:123456789012:function:MyFunction. *Version or Alias ARN* – arn:aws:lambda:us-west-2:123456789012:function:MyFunction:PROD. *Partial ARN* – 123456789012:function:MyFunction. The length constraint applies only to the full ARN. If you specify only the function name, it's limited to 64 characters in length.",
  ).optional(),
  MaximumBatchingWindowInSeconds: z.number().int().min(0).max(300).describe(
    "The maximum amount of time, in seconds, that Lambda spends gathering records before invoking the function. *Default (,, event sources)*: 0 *Default (, Kafka,, event sources)*: 500 ms *Related setting:* For SQS event sources, when you set BatchSize to a value greater than 10, you must set MaximumBatchingWindowInSeconds to at least 1.",
  ).optional(),
  MaximumRecordAgeInSeconds: z.number().int().min(-1).max(604800).describe(
    "(Kinesis and DynamoDB Streams only) Discard records older than the specified age. The default value is -1, which sets the maximum age to infinite. When the value is set to infinite, Lambda never discards old records. The minimum valid value for maximum record age is 60s. Although values less than 60 and greater than -1 fall within the parameter's absolute range, they are not allowed",
  ).optional(),
  MaximumRetryAttempts: z.number().int().min(-1).max(10000).describe(
    "(Kinesis and DynamoDB Streams only) Discard records after the specified number of retries. The default value is -1, which sets the maximum number of retries to infinite. When MaximumRetryAttempts is infinite, Lambda retries failed records until the record expires in the event source.",
  ).optional(),
  ParallelizationFactor: z.number().int().min(1).max(10).describe(
    "(Kinesis and DynamoDB Streams only) The number of batches to process concurrently from each shard. The default value is 1.",
  ).optional(),
  StartingPosition: z.string().min(6).max(12).regex(
    new RegExp("(LATEST|TRIM_HORIZON|AT_TIMESTAMP)+"),
  ).describe(
    "The position in a stream from which to start reading. Required for Amazon Kinesis and Amazon DynamoDB. *LATEST* - Read only new records. *TRIM_HORIZON* - Process all available records. *AT_TIMESTAMP* - Specify a time from which to start reading records.",
  ).optional(),
  StartingPositionTimestamp: z.number().describe(
    "With StartingPosition set to AT_TIMESTAMP, the time from which to start reading, in Unix time seconds. StartingPositionTimestamp cannot be in the future.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to add to the event source mapping. You must have the lambda:TagResource, lambda:UntagResource, and lambda:ListTags permissions for your [principal](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_terms-and-concepts.html) to manage the CFN stack. If you don't have these permissions, there might be unexpected behavior with stack-level tags propagating to the resource during resource creation and update.",
  ).optional(),
  Topics: z.array(
    z.string().min(1).max(249).regex(new RegExp("^[^.]([a-zA-Z0-9\\-_.]+)")),
  ).describe("The name of the Kafka topic.").optional(),
  Queues: z.array(z.string().min(1).max(1000).regex(new RegExp("[\\s\\S]*")))
    .describe(
      "(Amazon MQ) The name of the Amazon MQ broker destination queue to consume.",
    ).optional(),
  SourceAccessConfigurations: z.array(SourceAccessConfigurationSchema).describe(
    "An array of the authentication protocol, VPC components, or virtual host to secure and define your event source.",
  ).optional(),
  TumblingWindowInSeconds: z.number().int().min(0).max(900).describe(
    "(Kinesis and DynamoDB Streams only) The duration in seconds of a processing window for DynamoDB and Kinesis Streams event sources. A value of 0 seconds indicates no tumbling window.",
  ).optional(),
  FunctionResponseTypes: z.array(z.enum(["ReportBatchItemFailures"])).describe(
    "(Kinesis, DynamoDB Streams, and SQS) A list of current response type enums applied to the event source mapping. Valid Values: ReportBatchItemFailures",
  ).optional(),
  SelfManagedEventSource: z.object({
    Endpoints: EndpointsSchema.describe(
      'The list of bootstrap servers for your Kafka brokers in the following format: "KafkaBootstrapServers": ["abc.xyz.com:xxxx","abc2.xyz.com:xxxx"].',
    ).optional(),
  }).describe("The self-managed Apache Kafka cluster for your event source.")
    .optional(),
  AmazonManagedKafkaEventSourceConfig: z.object({
    ConsumerGroupId: z.string().min(1).max(200).regex(
      new RegExp("[a-zA-Z0-9-\\/*:_+=.@-]*"),
    ).describe(
      "The identifier for the Kafka consumer group to join. The consumer group ID must be unique among all your Kafka event sources. After creating a Kafka event source mapping with the consumer group ID specified, you cannot update this value. For more information, see [Customizable consumer group ID](https://docs.aws.amazon.com/lambda/latest/dg/with-msk.html#services-msk-consumer-group-id).",
    ).optional(),
    SchemaRegistryConfig: SchemaRegistryConfigSchema.describe(
      "Specific configuration settings for a Kafka schema registry.",
    ).optional(),
  }).describe(
    "Specific configuration settings for an Amazon Managed Streaming for Apache Kafka (Amazon MSK) event source.",
  ).optional(),
  SelfManagedKafkaEventSourceConfig: z.object({
    ConsumerGroupId: z.string().min(1).max(200).regex(
      new RegExp("[a-zA-Z0-9-\\/*:_+=.@-]*"),
    ).describe(
      "The identifier for the Kafka consumer group to join. The consumer group ID must be unique among all your Kafka event sources. After creating a Kafka event source mapping with the consumer group ID specified, you cannot update this value. For more information, see [Customizable consumer group ID](https://docs.aws.amazon.com/lambda/latest/dg/with-kafka-process.html#services-smaa-topic-add).",
    ).optional(),
    SchemaRegistryConfig: SchemaRegistryConfigSchema.describe(
      "Specific configuration settings for a Kafka schema registry.",
    ).optional(),
  }).describe(
    "Specific configuration settings for a self-managed Apache Kafka event source.",
  ).optional(),
  ScalingConfig: z.object({
    MaximumConcurrency: z.number().int().min(2).max(1000).describe(
      "Limits the number of concurrent instances that the SQS event source can invoke.",
    ).optional(),
  }).describe(
    "This property is for Amazon SQS event sources only. You cannot use ProvisionedPollerConfig while using ScalingConfig. These options are mutually exclusive. To remove the scaling configuration, pass an empty value.",
  ).optional(),
  DocumentDBEventSourceConfig: z.object({
    DatabaseName: z.string().min(1).max(63).describe(
      "The name of the database to consume within the DocumentDB cluster.",
    ).optional(),
    CollectionName: z.string().min(1).max(57).describe(
      "The name of the collection to consume within the database. If you do not specify a collection, Lambda consumes all collections.",
    ).optional(),
    FullDocument: z.enum(["UpdateLookup", "Default"]).describe(
      "Determines what DocumentDB sends to your event stream during document update operations. If set to UpdateLookup, DocumentDB sends a delta describing the changes, along with a copy of the entire document. Otherwise, DocumentDB sends only a partial document that contains the changes.",
    ).optional(),
  }).describe("Specific configuration settings for a DocumentDB event source.")
    .optional(),
  ProvisionedPollerConfig: z.object({
    MinimumPollers: z.number().int().min(1).max(200).describe(
      "The minimum number of event pollers this event source can scale down to. For Amazon SQS events source mappings, default is 2, and minimum 2 required. For Amazon MSK and self-managed Apache Kafka event source mappings, default is 1.",
    ).optional(),
    MaximumPollers: z.number().int().min(1).max(2000).describe(
      "The maximum number of event pollers this event source can scale up to. For Amazon SQS events source mappings, default is 200, and minimum value allowed is 2. For Amazon MSK and self-managed Apache Kafka event source mappings, default is 200, and minimum value allowed is 1.",
    ).optional(),
    PollerGroupName: z.string().min(0).max(128).optional(),
  }).describe(
    "(Amazon SQS, Amazon MSK, and self-managed Apache Kafka only) The provisioned mode configuration for the event source. For more information, see [provisioned mode](https://docs.aws.amazon.com/lambda/latest/dg/invocation-eventsourcemapping.html#invocation-eventsourcemapping-provisioned-mode).",
  ).optional(),
  MetricsConfig: z.object({
    Metrics: z.array(z.enum(["EventCount", "ErrorCount", "KafkaMetrics"]))
      .describe(
        "The metrics you want your event source mapping to produce. Include EventCount to receive event source mapping metrics related to the number of events processed by your event source mapping. For more information about these metrics, see [Event source mapping metrics](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-types.html#event-source-mapping-metrics).",
      ).optional(),
  }).describe(
    "The metrics configuration for your event source. For more information, see [Event source mapping metrics](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-types.html#event-source-mapping-metrics).",
  ).optional(),
  LoggingConfig: z.object({
    SystemLogLevel: z.enum(["DEBUG", "INFO", "WARN"]).describe(
      "Set this property to filter the system logs for your function that Lambda sends to CloudWatch. Lambda only sends system logs at the selected level of detail and lower, where DEBUG is the highest level and WARN is the lowest.",
    ).optional(),
  }).describe("The function's Amazon CloudWatch Logs configuration settings.")
    .optional(),
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

/** Swamp extension model for Lambda EventSourceMapping. Registered at `@swamp/aws/lambda/event-source-mapping`. */
export const model = {
  type: "@swamp/aws/lambda/event-source-mapping",
  version: "2026.06.15.1",
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
      description: "Lambda EventSourceMapping resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lambda EventSourceMapping",
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
          "AWS::Lambda::EventSourceMapping",
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
      description: "Get a Lambda EventSourceMapping",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda EventSourceMapping",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lambda::EventSourceMapping",
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
      description: "Update a Lambda EventSourceMapping",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lambda::EventSourceMapping",
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
          "AWS::Lambda::EventSourceMapping",
          identifier,
          currentState,
          desiredState,
          [
            "EventSourceArn",
            "StartingPosition",
            "StartingPositionTimestamp",
            "SelfManagedEventSource",
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
      description: "Delete a Lambda EventSourceMapping",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda EventSourceMapping",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lambda::EventSourceMapping",
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
      description: "Sync Lambda EventSourceMapping state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lambda::EventSourceMapping",
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
