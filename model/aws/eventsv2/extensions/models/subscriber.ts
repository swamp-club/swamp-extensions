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

// Auto-generated extension model for @swamp/aws/eventsv2/subscriber
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for EventsV2 Subscriber (AWS::EventsV2::Subscriber).
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

const MessageAttributeValueSchema = z.object({
  DataType: z.string().describe(
    "The attribute data type. For Amazon SQS targets, specify String, Number, or Binary, optionally with a custom label suffix such as Number.float. For Amazon SNS targets, specify String, String.Array, Number, or Binary.",
  ),
  StringValue: z.string().describe(
    "The attribute value for the String and Number data types (and String.Array for Amazon SNS targets).",
  ).optional(),
  BinaryValue: z.string().describe(
    "The attribute value for the Binary data type, Base64-encoded.",
  ).optional(),
});

const EventBusV2SystemMetadataSchema = z.object({
  EventGroupId: z.string().describe(
    "The event group ID for FIFO ordering on the downstream event bus. Accepts a literal value or a JSONata expression.",
  ).optional(),
  DeduplicationId: z.string().describe(
    "The deduplication ID for FIFO deduplication on the downstream event bus. Accepts a literal value or a JSONata expression.",
  ).optional(),
});

const DeduplicationConfigurationSchema = z.object({
  DeduplicationType: z.enum(["CONTENT_BASED"]).describe(
    "How duplicate events are detected: CONTENT_BASED deduplicates by a hash of the event content. To deduplicate by a caller-supplied token instead, omit DeduplicationConfiguration and set SystemMetadata.DeduplicationId.",
  ),
});

const FilterSchema = z.object({
  Pattern: z.string().max(4096).describe(
    "The event pattern, as a JSON string.",
  ),
  Scope: z.enum(["DATA", "METADATA", "SYSTEM_METADATA"]).describe(
    "Which part of the event the pattern is evaluated against: DATA (the event payload), METADATA (event metadata), or SYSTEM_METADATA (service-generated metadata).",
  ),
});

const JsonataConfigurationSchema = z.object({
  Expression: z.string().min(1).max(8192).regex(
    new RegExp("^\\{%[\\s\\S]+?%\\}(?![\\s\\S])"),
  ).describe(
    "The JSONata expression that transforms the event, enclosed in {% %} delimiters.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^\\S([\\s\\S]*\\S)?(?![\\s\\S])"),
  ).describe(
    "The tag key. For each resource, each tag key must be unique and each key can have only one value; keys are case sensitive. A key cannot begin or end with a whitespace character; whitespace inside the key is allowed.",
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^(\\S([\\s\\S]*\\S)?)?(?![\\s\\S])"),
  ).describe(
    "The tag value. May be empty. A value cannot begin or end with a whitespace character; whitespace inside the value is allowed.",
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
  Name: z.string().min(1).max(256).regex(
    new RegExp("^[A-Za-z0-9][\\.\\-_A-Za-z0-9]*$"),
  ).describe(
    "The name of the subscriber. The first character must be alphanumeric; the remaining characters may also include '.', '-', and '_'.",
  ),
  EventBusArn: z.string().min(1).max(1011).regex(
    new RegExp(
      "^arn:aws(-[a-z0-9]+)*:events:[a-z][a-z0-9]*(-[a-z0-9]+)*:([0-9]{12}):event-busv2\\/[A-Za-z0-9][\\.\\-_A-Za-z0-9]{0,255}\\/[a-z0-9]{25}$",
    ),
  ).describe("The ARN of the event bus this subscriber belongs to."),
  InvokeConfiguration: z.object({
    TargetArn: z.string().min(1).max(1600).regex(new RegExp("^arn:")).describe(
      "The Amazon Resource Name (ARN) of the target that the subscriber invokes. For universal service integration targets, use the form arn:{partition}:events:::aws-sdk:{service}:{apiAction}.",
    ),
    RoleArn: z.string().min(1).max(1600).regex(
      new RegExp("^arn:aws(-[a-z0-9]+)*:iam::\\d{12}:role\\/[\\w+=,.@/-]+$"),
    ).describe(
      "The ARN of the IAM role the service assumes to invoke the target. The role must belong to the same account as the subscriber.",
    ),
    LambdaParameters: z.object({
      InvocationType: z.string().describe(
        "How the function is invoked: EVENT (asynchronous) or REQUEST_RESPONSE (synchronous).",
      ).optional(),
      Qualifier: z.string().describe(
        "The version or alias of the Lambda function to invoke. Accepts a literal value or a JSONata expression.",
      ).optional(),
      DurableExecutionName: z.string().describe(
        "A unique name for a durable function execution. Accepts a literal value or a JSONata expression.",
      ).optional(),
      TenantId: z.string().describe(
        "The tenant identifier for multi-tenant Lambda functions. Accepts a literal value or a JSONata expression.",
      ).optional(),
      InvocationTimeoutSeconds: z.string().describe(
        "The timeout in seconds for each invocation of the target, written as a string. Accepts a literal value or a JSONata expression.",
      ).optional(),
    }).describe("Parameters for invoking an AWS Lambda function target.")
      .optional(),
    SqsParameters: z.object({
      MessageGroupId: z.string().describe(
        "The message group ID to use when the target is a FIFO queue. Accepts a literal value or a JSONata expression.",
      ).optional(),
      MessageDeduplicationId: z.string().describe(
        "The message deduplication ID to use when the target is a FIFO queue. Accepts a literal value or a JSONata expression.",
      ).optional(),
      DelaySeconds: z.string().describe(
        "The delay in seconds for the message, written as a string. Accepts a literal value or a JSONata expression.",
      ).optional(),
      MessageAttributes: z.record(z.string(), MessageAttributeValueSchema)
        .describe("Custom message attributes to attach to each message.")
        .optional(),
      MessageSystemAttributes: z.record(z.string(), MessageAttributeValueSchema)
        .describe(
          "Message system attributes to attach to each message, such as AWSTraceHeader.",
        ).optional(),
    }).describe("Parameters for sending events to an Amazon SQS queue target.")
      .optional(),
    SnsParameters: z.object({
      MessageGroupId: z.string().describe(
        "The message group ID to use when the target is a FIFO topic. Accepts a literal value or a JSONata expression.",
      ).optional(),
      MessageDeduplicationId: z.string().describe(
        "The message deduplication ID to use when the target is a FIFO topic. Accepts a literal value or a JSONata expression.",
      ).optional(),
      Subject: z.string().describe(
        "The subject line to use for email-protocol subscriptions. Accepts a literal value or a JSONata expression.",
      ).optional(),
      MessageStructure: z.string().describe(
        "Set to json to send a different message per delivery protocol. Accepts a literal value or a JSONata expression.",
      ).optional(),
      MessageAttributes: z.record(z.string(), MessageAttributeValueSchema)
        .describe(
          "Custom message attributes to attach to each message; Amazon SNS subscription filter policies can match on them.",
        ).optional(),
    }).describe(
      "Parameters for publishing events to an Amazon SNS topic target.",
    ).optional(),
    KinesisParameters: z.object({
      PartitionKey: z.string().describe(
        "The partition key that determines which shard each record is written to. Accepts a literal value or a JSONata expression.",
      ).optional(),
      ExplicitHashKey: z.string().describe(
        "An explicit hash key that overrides the partition key's shard assignment. Accepts a literal value or a JSONata expression.",
      ).optional(),
    }).describe(
      "Parameters for writing events to an Amazon Kinesis Data Streams target.",
    ).optional(),
    StepFunctionsParameters: z.object({
      InvocationType: z.string().describe(
        "How the execution is started: EVENT (StartExecution, asynchronous) or REQUEST_RESPONSE (StartSyncExecution, synchronous).",
      ).optional(),
      Name: z.string().describe(
        "A name for the execution. Must be unique for the account, Region, and state machine. Accepts a literal value or a JSONata expression.",
      ).optional(),
      TraceHeader: z.string().describe(
        "The AWS X-Ray trace header for distributed tracing. Accepts a literal value or a JSONata expression.",
      ).optional(),
      InvocationTimeoutSeconds: z.string().describe(
        "The timeout in seconds for each invocation of the target, written as a string. Accepts a literal value or a JSONata expression.",
      ).optional(),
    }).describe(
      "Parameters for starting an AWS Step Functions state machine execution target.",
    ).optional(),
    HttpParameters: z.object({
      PathParameterValues: z.array(
        z.string().regex(new RegExp("^(?!\\s*$).+$")),
      ).describe(
        "Values for the path parameters (wildcards) in the target URL, in order.",
      ).optional(),
      HeaderParameters: z.record(
        z.string(),
        z.string().max(2048).regex(
          new RegExp(
            "^([ \\t]*[\\x20-\\x7E]+([ \\t]+[\\x20-\\x7E]+)*[ \\t]*|\\{%[\\s\\S]+?%\\})$",
          ),
        ),
      ).describe("HTTP headers to add to the request.").optional(),
      QueryStringParameters: z.record(
        z.string(),
        z.string().max(512).regex(
          new RegExp(
            "^[^\\u0000-\\u0009\\u000B\\u000C\\u000E-\\u001F\\u007F]+$",
          ),
        ),
      ).describe("Query string parameters to add to the request.").optional(),
      InvocationTimeoutSeconds: z.string().describe(
        "The timeout in seconds for each invocation of the target, written as a string. Accepts a literal value or a JSONata expression.",
      ).optional(),
    }).describe(
      "Parameters for invoking an HTTP endpoint target, such as an Amazon API Gateway endpoint or an EventBridge API destination.",
    ).optional(),
    UniversalTargetParameters: z.object({
      Input: z.string().min(1).max(262144).describe(
        "JSON string or JSONata expression that produces the API request. Supports {%... %} JSONata expressions for dynamic values from the event.",
      ),
      InvocationTimeoutSeconds: z.string().describe(
        "Timeout in seconds for each invocation of the target (1-30, default 30). Must be a literal integer written as a string; JSONata expressions are not supported for this field.",
      ).optional(),
    }).describe(
      "Parameters for invoking an AWS service API as a universal service integration target, used when TargetArn has the form arn:{partition}:events:::aws-sdk:{service}:{apiAction}.",
    ).optional(),
    EventBusV2Parameters: z.object({
      Metadata: z.record(z.string(), z.string()).describe(
        "Metadata forwarded with each event, as key-value string pairs.",
      ).optional(),
      SystemMetadata: EventBusV2SystemMetadataSchema.describe(
        "System metadata attached to each forwarded event, controlling FIFO ordering and deduplication on the downstream event bus.",
      ).optional(),
      DeduplicationConfiguration: DeduplicationConfigurationSchema.describe(
        "Deduplication settings applied to the forwarded events on the downstream event bus.",
      ).optional(),
    }).describe(
      "Parameters for forwarding events to another EventBridge event bus, used when TargetArn is an event bus ARN of the form arn:{partition}:events:{region}:{account}:event-busv2/{name}/{id}.",
    ).optional(),
  }).describe(
    "Configuration for how the subscriber invokes its target, including the target ARN, the IAM role used to invoke it, and, optionally, the target-specific parameters object that matches the target type.",
  ),
  FilterConfiguration: z.object({
    Filters: z.array(FilterSchema).describe(
      "The list of filters, 1-50 entries. An event must match every filter to be delivered.",
    ),
    Language: z.enum(["EVENT_BRIDGE_PATTERN"]).describe(
      "The filter language. The default is EVENT_BRIDGE_PATTERN.",
    ).optional(),
  }).describe(
    "Configuration for filtering which events are delivered to the target. An event must match every filter to be delivered.",
  ).optional(),
  Type: z.enum(["FIFO", "UNORDERED"]).describe(
    "The delivery ordering mode of the subscriber. FIFO delivers events in order within an event group; UNORDERED delivers without an ordering guarantee.",
  ).optional(),
  StartingPosition: z.enum(["LATEST", "POINT_IN_TIME"]).describe(
    "Where the subscriber starts reading events: LATEST starts from the newest events; POINT_IN_TIME starts from the point specified in PointInTimeConfiguration.",
  ).optional(),
  PointInTimeConfiguration: z.object({
    PointType: z.enum(["HORIZON", "TIMESTAMP"]).describe(
      "Where to start: HORIZON starts from the earliest available event; TIMESTAMP starts from the StartingPoint timestamp.",
    ),
    StartingPoint: z.number().int().describe(
      "The time to start delivering events from, in seconds since the Unix epoch. Required when PointType is TIMESTAMP.",
    ).optional(),
    EndPoint: z.number().int().describe(
      "An optional time to stop delivering events at, in seconds since the Unix epoch.",
    ).optional(),
  }).describe(
    "The point in time to start delivering events from. Used when StartingPosition is POINT_IN_TIME.",
  ).optional(),
  BatchConfiguration: z.object({
    MaxBatchSize: z.number().int().min(1).max(500).describe(
      "The maximum number of events in a single batch delivered to the target. The maximum depends on the target: 500 for Kinesis Data Streams and Amazon Data Firehose, 100 for Lambda, Step Functions, and AWS::EventsV2::EventBus targets, 10 for Amazon SQS, Amazon SNS, and AWS::Events::EventBus targets, and 1 for API Gateway, API destinations, and universal service integration targets. The service rejects a value above the target's maximum. Fewer events may be delivered when the batch window elapses. When omitted, the default is 10 for Lambda and Step Functions targets and the target's maximum for other targets. The resolved value applied by the service is returned on read.",
    ).optional(),
    MaxBatchWindowInSeconds: z.number().int().min(0).max(300).describe(
      "The maximum time in seconds to wait for a batch to fill before delivering it, 0-300. The default is 0 (no wait). The resolved value applied by the service is returned on read.",
    ).optional(),
  }).describe(
    "Configuration for batching events into a single delivery to the target.",
  ).optional(),
  Transformer: z.object({
    Type: z.enum(["RAW", "WITH_METADATA", "JSONATA"]).describe(
      "The transform type: RAW delivers the event payload only; WITH_METADATA delivers the event with its metadata envelope; JSONATA delivers the output of the JSONata expression in JsonataConfiguration.",
    ).optional(),
    JsonataConfiguration: JsonataConfigurationSchema.describe(
      "The JSONata expression configuration. Required when Type is JSONATA.",
    ).optional(),
  }).describe(
    "Configuration for transforming events before delivery to the target.",
  ).optional(),
  RetryPolicy: z.object({
    MaxRetryAttempts: z.number().int().min(0).max(185).describe(
      "The maximum number of retry attempts, 0-185. When the attempts are exhausted, retries stop; if OnFailureConfiguration is set, the event is delivered to that destination, otherwise it is dropped. The default is 5.",
    ).optional(),
    MaxEventAgeInSeconds: z.number().int().min(60).max(86400).describe(
      "The maximum age of an event in seconds, 60-86400 (24 hours). When an event reaches this age, retries stop; if OnFailureConfiguration is set, the event is delivered to that destination, otherwise it is dropped. The default is 300.",
    ).optional(),
    RetryStrategy: z.enum(["ALL"]).describe(
      "Which errors are retried. ALL retries all errors. The default is ALL.",
    ).optional(),
  }).describe("The retry policy for failed deliveries to the target.")
    .optional(),
  OnFailureConfiguration: z.object({
    Arn: z.string().min(1).max(1600).regex(
      new RegExp(
        "^arn:aws(-[a-z0-9]+)*:sqs:[a-z][a-z0-9]*(-[a-z0-9]+)*:[0-9]{12}:([A-Za-z0-9_-]{1,80}|[A-Za-z0-9_-]{1,75}\\.fifo)$",
      ),
    ).describe(
      "The ARN of the destination that receives events that could not be delivered. An Amazon SQS queue is the supported destination.",
    ).optional(),
  }).describe(
    "The destination for events that could not be delivered to the target.",
  ).optional(),
  LogConfiguration: z.object({
    Level: z.enum(["OFF", "ERROR", "INFO"]).describe(
      "The minimum log level: OFF (no logging), ERROR, or INFO. Records below this level are not emitted. The default is OFF.",
    ).optional(),
    IncludePayload: z.enum(["FULL", "ON_ERROR_ONLY"]).describe(
      "Whether the event payload is included in emitted log records: FULL includes it in every emitted record, and ON_ERROR_ONLY includes it only in error records. The default is ON_ERROR_ONLY.",
    ).optional(),
  }).describe("Delivery logging configuration for the subscriber.").optional(),
  Description: z.string().max(512).regex(
    new RegExp("^[^\\u0000-\\u001F\\u007F-\\u009F\\u2028\\u2029]*(?![\\s\\S])"),
  ).describe(
    "A description of the subscriber. Control characters and Unicode line separators are not allowed.",
  ).optional(),
  State: z.enum(["RUNNING", "STOPPED"]).describe(
    "The run state of the subscriber. Events are delivered only while the state is RUNNING. Setting the state to STOPPED pauses delivery. When an update sets a stopped subscriber back to RUNNING, ResumePosition controls where delivery resumes.",
  ).optional(),
  ResumePosition: z.enum(["LAST_PROCESSED", "LATEST"]).describe(
    "Resume-time control, never returned by the service. Applied only when an update transitions State from STOPPED to RUNNING: LAST_PROCESSED (default) resumes from the last processed event, LATEST skips to the newest. Ignored on create and on any update that does not perform that transition.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags assigned to the subscriber.")
    .optional(),
});

const StateSchema = z.object({
  SubscriberArn: z.string(),
  Name: z.string().optional(),
  EventBusArn: z.string().optional(),
  BusName: z.string().optional(),
  InvokeConfiguration: z.object({
    TargetArn: z.string(),
    RoleArn: z.string(),
    LambdaParameters: z.object({
      InvocationType: z.string(),
      Qualifier: z.string(),
      DurableExecutionName: z.string(),
      TenantId: z.string(),
      InvocationTimeoutSeconds: z.string(),
    }),
    SqsParameters: z.object({
      MessageGroupId: z.string(),
      MessageDeduplicationId: z.string(),
      DelaySeconds: z.string(),
      MessageAttributes: z.record(z.string(), z.unknown()),
      MessageSystemAttributes: z.record(z.string(), z.unknown()),
    }),
    SnsParameters: z.object({
      MessageGroupId: z.string(),
      MessageDeduplicationId: z.string(),
      Subject: z.string(),
      MessageStructure: z.string(),
      MessageAttributes: z.record(z.string(), z.unknown()),
    }),
    KinesisParameters: z.object({
      PartitionKey: z.string(),
      ExplicitHashKey: z.string(),
    }),
    StepFunctionsParameters: z.object({
      InvocationType: z.string(),
      Name: z.string(),
      TraceHeader: z.string(),
      InvocationTimeoutSeconds: z.string(),
    }),
    HttpParameters: z.object({
      PathParameterValues: z.array(z.string()),
      HeaderParameters: z.record(z.string(), z.unknown()),
      QueryStringParameters: z.record(z.string(), z.unknown()),
      InvocationTimeoutSeconds: z.string(),
    }),
    UniversalTargetParameters: z.object({
      Input: z.string(),
      InvocationTimeoutSeconds: z.string(),
    }),
    EventBusV2Parameters: z.object({
      Metadata: z.record(z.string(), z.unknown()),
      SystemMetadata: EventBusV2SystemMetadataSchema,
      DeduplicationConfiguration: DeduplicationConfigurationSchema,
    }),
  }).optional(),
  FilterConfiguration: z.object({
    Filters: z.array(FilterSchema),
    Language: z.string(),
  }).optional(),
  Type: z.string().optional(),
  StartingPosition: z.string().optional(),
  PointInTimeConfiguration: z.object({
    PointType: z.string(),
    StartingPoint: z.number(),
    EndPoint: z.number(),
  }).optional(),
  BatchConfiguration: z.object({
    MaxBatchSize: z.number(),
    MaxBatchWindowInSeconds: z.number(),
  }).optional(),
  Transformer: z.object({
    Type: z.string(),
    JsonataConfiguration: JsonataConfigurationSchema,
  }).optional(),
  RetryPolicy: z.object({
    MaxRetryAttempts: z.number(),
    MaxEventAgeInSeconds: z.number(),
    RetryStrategy: z.string(),
  }).optional(),
  OnFailureConfiguration: z.object({
    Arn: z.string(),
  }).optional(),
  LogConfiguration: z.object({
    Level: z.string(),
    IncludePayload: z.string(),
  }).optional(),
  Description: z.string().optional(),
  State: z.string().optional(),
  ResumePosition: z.string().optional(),
  CreationTime: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(256).regex(
    new RegExp("^[A-Za-z0-9][\\.\\-_A-Za-z0-9]*$"),
  ).describe(
    "The name of the subscriber. The first character must be alphanumeric; the remaining characters may also include '.', '-', and '_'.",
  ).optional(),
  EventBusArn: z.string().min(1).max(1011).regex(
    new RegExp(
      "^arn:aws(-[a-z0-9]+)*:events:[a-z][a-z0-9]*(-[a-z0-9]+)*:([0-9]{12}):event-busv2\\/[A-Za-z0-9][\\.\\-_A-Za-z0-9]{0,255}\\/[a-z0-9]{25}$",
    ),
  ).describe("The ARN of the event bus this subscriber belongs to.").optional(),
  InvokeConfiguration: z.object({
    TargetArn: z.string().min(1).max(1600).regex(new RegExp("^arn:")).describe(
      "The Amazon Resource Name (ARN) of the target that the subscriber invokes. For universal service integration targets, use the form arn:{partition}:events:::aws-sdk:{service}:{apiAction}.",
    ).optional(),
    RoleArn: z.string().min(1).max(1600).regex(
      new RegExp("^arn:aws(-[a-z0-9]+)*:iam::\\d{12}:role\\/[\\w+=,.@/-]+$"),
    ).describe(
      "The ARN of the IAM role the service assumes to invoke the target. The role must belong to the same account as the subscriber.",
    ).optional(),
    LambdaParameters: z.object({
      InvocationType: z.string().describe(
        "How the function is invoked: EVENT (asynchronous) or REQUEST_RESPONSE (synchronous).",
      ).optional(),
      Qualifier: z.string().describe(
        "The version or alias of the Lambda function to invoke. Accepts a literal value or a JSONata expression.",
      ).optional(),
      DurableExecutionName: z.string().describe(
        "A unique name for a durable function execution. Accepts a literal value or a JSONata expression.",
      ).optional(),
      TenantId: z.string().describe(
        "The tenant identifier for multi-tenant Lambda functions. Accepts a literal value or a JSONata expression.",
      ).optional(),
      InvocationTimeoutSeconds: z.string().describe(
        "The timeout in seconds for each invocation of the target, written as a string. Accepts a literal value or a JSONata expression.",
      ).optional(),
    }).describe("Parameters for invoking an AWS Lambda function target.")
      .optional(),
    SqsParameters: z.object({
      MessageGroupId: z.string().describe(
        "The message group ID to use when the target is a FIFO queue. Accepts a literal value or a JSONata expression.",
      ).optional(),
      MessageDeduplicationId: z.string().describe(
        "The message deduplication ID to use when the target is a FIFO queue. Accepts a literal value or a JSONata expression.",
      ).optional(),
      DelaySeconds: z.string().describe(
        "The delay in seconds for the message, written as a string. Accepts a literal value or a JSONata expression.",
      ).optional(),
      MessageAttributes: z.record(z.string(), MessageAttributeValueSchema)
        .describe("Custom message attributes to attach to each message.")
        .optional(),
      MessageSystemAttributes: z.record(z.string(), MessageAttributeValueSchema)
        .describe(
          "Message system attributes to attach to each message, such as AWSTraceHeader.",
        ).optional(),
    }).describe("Parameters for sending events to an Amazon SQS queue target.")
      .optional(),
    SnsParameters: z.object({
      MessageGroupId: z.string().describe(
        "The message group ID to use when the target is a FIFO topic. Accepts a literal value or a JSONata expression.",
      ).optional(),
      MessageDeduplicationId: z.string().describe(
        "The message deduplication ID to use when the target is a FIFO topic. Accepts a literal value or a JSONata expression.",
      ).optional(),
      Subject: z.string().describe(
        "The subject line to use for email-protocol subscriptions. Accepts a literal value or a JSONata expression.",
      ).optional(),
      MessageStructure: z.string().describe(
        "Set to json to send a different message per delivery protocol. Accepts a literal value or a JSONata expression.",
      ).optional(),
      MessageAttributes: z.record(z.string(), MessageAttributeValueSchema)
        .describe(
          "Custom message attributes to attach to each message; Amazon SNS subscription filter policies can match on them.",
        ).optional(),
    }).describe(
      "Parameters for publishing events to an Amazon SNS topic target.",
    ).optional(),
    KinesisParameters: z.object({
      PartitionKey: z.string().describe(
        "The partition key that determines which shard each record is written to. Accepts a literal value or a JSONata expression.",
      ).optional(),
      ExplicitHashKey: z.string().describe(
        "An explicit hash key that overrides the partition key's shard assignment. Accepts a literal value or a JSONata expression.",
      ).optional(),
    }).describe(
      "Parameters for writing events to an Amazon Kinesis Data Streams target.",
    ).optional(),
    StepFunctionsParameters: z.object({
      InvocationType: z.string().describe(
        "How the execution is started: EVENT (StartExecution, asynchronous) or REQUEST_RESPONSE (StartSyncExecution, synchronous).",
      ).optional(),
      Name: z.string().describe(
        "A name for the execution. Must be unique for the account, Region, and state machine. Accepts a literal value or a JSONata expression.",
      ).optional(),
      TraceHeader: z.string().describe(
        "The AWS X-Ray trace header for distributed tracing. Accepts a literal value or a JSONata expression.",
      ).optional(),
      InvocationTimeoutSeconds: z.string().describe(
        "The timeout in seconds for each invocation of the target, written as a string. Accepts a literal value or a JSONata expression.",
      ).optional(),
    }).describe(
      "Parameters for starting an AWS Step Functions state machine execution target.",
    ).optional(),
    HttpParameters: z.object({
      PathParameterValues: z.array(
        z.string().regex(new RegExp("^(?!\\s*$).+$")),
      ).describe(
        "Values for the path parameters (wildcards) in the target URL, in order.",
      ).optional(),
      HeaderParameters: z.record(
        z.string(),
        z.string().max(2048).regex(
          new RegExp(
            "^([ \\t]*[\\x20-\\x7E]+([ \\t]+[\\x20-\\x7E]+)*[ \\t]*|\\{%[\\s\\S]+?%\\})$",
          ),
        ),
      ).describe("HTTP headers to add to the request.").optional(),
      QueryStringParameters: z.record(
        z.string(),
        z.string().max(512).regex(
          new RegExp(
            "^[^\\u0000-\\u0009\\u000B\\u000C\\u000E-\\u001F\\u007F]+$",
          ),
        ),
      ).describe("Query string parameters to add to the request.").optional(),
      InvocationTimeoutSeconds: z.string().describe(
        "The timeout in seconds for each invocation of the target, written as a string. Accepts a literal value or a JSONata expression.",
      ).optional(),
    }).describe(
      "Parameters for invoking an HTTP endpoint target, such as an Amazon API Gateway endpoint or an EventBridge API destination.",
    ).optional(),
    UniversalTargetParameters: z.object({
      Input: z.string().min(1).max(262144).describe(
        "JSON string or JSONata expression that produces the API request. Supports {%... %} JSONata expressions for dynamic values from the event.",
      ).optional(),
      InvocationTimeoutSeconds: z.string().describe(
        "Timeout in seconds for each invocation of the target (1-30, default 30). Must be a literal integer written as a string; JSONata expressions are not supported for this field.",
      ).optional(),
    }).describe(
      "Parameters for invoking an AWS service API as a universal service integration target, used when TargetArn has the form arn:{partition}:events:::aws-sdk:{service}:{apiAction}.",
    ).optional(),
    EventBusV2Parameters: z.object({
      Metadata: z.record(z.string(), z.string()).describe(
        "Metadata forwarded with each event, as key-value string pairs.",
      ).optional(),
      SystemMetadata: EventBusV2SystemMetadataSchema.describe(
        "System metadata attached to each forwarded event, controlling FIFO ordering and deduplication on the downstream event bus.",
      ).optional(),
      DeduplicationConfiguration: DeduplicationConfigurationSchema.describe(
        "Deduplication settings applied to the forwarded events on the downstream event bus.",
      ).optional(),
    }).describe(
      "Parameters for forwarding events to another EventBridge event bus, used when TargetArn is an event bus ARN of the form arn:{partition}:events:{region}:{account}:event-busv2/{name}/{id}.",
    ).optional(),
  }).describe(
    "Configuration for how the subscriber invokes its target, including the target ARN, the IAM role used to invoke it, and, optionally, the target-specific parameters object that matches the target type.",
  ).optional(),
  FilterConfiguration: z.object({
    Filters: z.array(FilterSchema).describe(
      "The list of filters, 1-50 entries. An event must match every filter to be delivered.",
    ).optional(),
    Language: z.enum(["EVENT_BRIDGE_PATTERN"]).describe(
      "The filter language. The default is EVENT_BRIDGE_PATTERN.",
    ).optional(),
  }).describe(
    "Configuration for filtering which events are delivered to the target. An event must match every filter to be delivered.",
  ).optional(),
  Type: z.enum(["FIFO", "UNORDERED"]).describe(
    "The delivery ordering mode of the subscriber. FIFO delivers events in order within an event group; UNORDERED delivers without an ordering guarantee.",
  ).optional(),
  StartingPosition: z.enum(["LATEST", "POINT_IN_TIME"]).describe(
    "Where the subscriber starts reading events: LATEST starts from the newest events; POINT_IN_TIME starts from the point specified in PointInTimeConfiguration.",
  ).optional(),
  PointInTimeConfiguration: z.object({
    PointType: z.enum(["HORIZON", "TIMESTAMP"]).describe(
      "Where to start: HORIZON starts from the earliest available event; TIMESTAMP starts from the StartingPoint timestamp.",
    ).optional(),
    StartingPoint: z.number().int().describe(
      "The time to start delivering events from, in seconds since the Unix epoch. Required when PointType is TIMESTAMP.",
    ).optional(),
    EndPoint: z.number().int().describe(
      "An optional time to stop delivering events at, in seconds since the Unix epoch.",
    ).optional(),
  }).describe(
    "The point in time to start delivering events from. Used when StartingPosition is POINT_IN_TIME.",
  ).optional(),
  BatchConfiguration: z.object({
    MaxBatchSize: z.number().int().min(1).max(500).describe(
      "The maximum number of events in a single batch delivered to the target. The maximum depends on the target: 500 for Kinesis Data Streams and Amazon Data Firehose, 100 for Lambda, Step Functions, and AWS::EventsV2::EventBus targets, 10 for Amazon SQS, Amazon SNS, and AWS::Events::EventBus targets, and 1 for API Gateway, API destinations, and universal service integration targets. The service rejects a value above the target's maximum. Fewer events may be delivered when the batch window elapses. When omitted, the default is 10 for Lambda and Step Functions targets and the target's maximum for other targets. The resolved value applied by the service is returned on read.",
    ).optional(),
    MaxBatchWindowInSeconds: z.number().int().min(0).max(300).describe(
      "The maximum time in seconds to wait for a batch to fill before delivering it, 0-300. The default is 0 (no wait). The resolved value applied by the service is returned on read.",
    ).optional(),
  }).describe(
    "Configuration for batching events into a single delivery to the target.",
  ).optional(),
  Transformer: z.object({
    Type: z.enum(["RAW", "WITH_METADATA", "JSONATA"]).describe(
      "The transform type: RAW delivers the event payload only; WITH_METADATA delivers the event with its metadata envelope; JSONATA delivers the output of the JSONata expression in JsonataConfiguration.",
    ).optional(),
    JsonataConfiguration: JsonataConfigurationSchema.describe(
      "The JSONata expression configuration. Required when Type is JSONATA.",
    ).optional(),
  }).describe(
    "Configuration for transforming events before delivery to the target.",
  ).optional(),
  RetryPolicy: z.object({
    MaxRetryAttempts: z.number().int().min(0).max(185).describe(
      "The maximum number of retry attempts, 0-185. When the attempts are exhausted, retries stop; if OnFailureConfiguration is set, the event is delivered to that destination, otherwise it is dropped. The default is 5.",
    ).optional(),
    MaxEventAgeInSeconds: z.number().int().min(60).max(86400).describe(
      "The maximum age of an event in seconds, 60-86400 (24 hours). When an event reaches this age, retries stop; if OnFailureConfiguration is set, the event is delivered to that destination, otherwise it is dropped. The default is 300.",
    ).optional(),
    RetryStrategy: z.enum(["ALL"]).describe(
      "Which errors are retried. ALL retries all errors. The default is ALL.",
    ).optional(),
  }).describe("The retry policy for failed deliveries to the target.")
    .optional(),
  OnFailureConfiguration: z.object({
    Arn: z.string().min(1).max(1600).regex(
      new RegExp(
        "^arn:aws(-[a-z0-9]+)*:sqs:[a-z][a-z0-9]*(-[a-z0-9]+)*:[0-9]{12}:([A-Za-z0-9_-]{1,80}|[A-Za-z0-9_-]{1,75}\\.fifo)$",
      ),
    ).describe(
      "The ARN of the destination that receives events that could not be delivered. An Amazon SQS queue is the supported destination.",
    ).optional(),
  }).describe(
    "The destination for events that could not be delivered to the target.",
  ).optional(),
  LogConfiguration: z.object({
    Level: z.enum(["OFF", "ERROR", "INFO"]).describe(
      "The minimum log level: OFF (no logging), ERROR, or INFO. Records below this level are not emitted. The default is OFF.",
    ).optional(),
    IncludePayload: z.enum(["FULL", "ON_ERROR_ONLY"]).describe(
      "Whether the event payload is included in emitted log records: FULL includes it in every emitted record, and ON_ERROR_ONLY includes it only in error records. The default is ON_ERROR_ONLY.",
    ).optional(),
  }).describe("Delivery logging configuration for the subscriber.").optional(),
  Description: z.string().max(512).regex(
    new RegExp("^[^\\u0000-\\u001F\\u007F-\\u009F\\u2028\\u2029]*(?![\\s\\S])"),
  ).describe(
    "A description of the subscriber. Control characters and Unicode line separators are not allowed.",
  ).optional(),
  State: z.enum(["RUNNING", "STOPPED"]).describe(
    "The run state of the subscriber. Events are delivered only while the state is RUNNING. Setting the state to STOPPED pauses delivery. When an update sets a stopped subscriber back to RUNNING, ResumePosition controls where delivery resumes.",
  ).optional(),
  ResumePosition: z.enum(["LAST_PROCESSED", "LATEST"]).describe(
    "Resume-time control, never returned by the service. Applied only when an update transitions State from STOPPED to RUNNING: LAST_PROCESSED (default) resumes from the last processed event, LATEST skips to the newest. Ignored on create and on any update that does not perform that transition.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags assigned to the subscriber.")
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

/** Swamp extension model for EventsV2 Subscriber. Registered at `@swamp/aws/eventsv2/subscriber`. */
export const model = {
  type: "@swamp/aws/eventsv2/subscriber",
  version: "2026.09.25.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EventsV2 Subscriber resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EventsV2 Subscriber",
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
          "AWS::EventsV2::Subscriber",
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
      description: "Get a EventsV2 Subscriber",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EventsV2 Subscriber",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EventsV2::Subscriber",
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
      description: "Update a EventsV2 Subscriber",
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
        const identifier = existing.SubscriberArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EventsV2::Subscriber",
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
          "AWS::EventsV2::Subscriber",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "EventBusArn",
            "TargetArn",
            "Type",
            "StartingPosition",
            "PointInTimeConfiguration",
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
      description: "Delete a EventsV2 Subscriber",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EventsV2 Subscriber",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EventsV2::Subscriber",
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
      description: "Sync EventsV2 Subscriber state from AWS",
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
        const identifier = existing.SubscriberArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EventsV2::Subscriber",
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
      description: "List EventsV2 Subscriber resources",
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
          "AWS::EventsV2::Subscriber",
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
            (item.properties?.SubscriberArn?.toString() ?? item.identifier)
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
