// Auto-generated extension model for @swamp/aws/sqs/queue
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SQS Queue (AWS::SQS::Queue).
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

const TagSchema = z.object({
  Key: z.string().describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ContentBasedDeduplication: z.boolean().describe(
    "For first-in-first-out (FIFO) queues, specifies whether to enable content-based deduplication. During the deduplication interval, SQS treats messages that are sent with identical content as duplicates and delivers only one copy of the message. For more information, see the ContentBasedDeduplication attribute for the CreateQueue action in the *API Reference*.",
  ).optional(),
  DeduplicationScope: z.string().describe(
    "For high throughput for FIFO queues, specifies whether message deduplication occurs at the message group or queue level. Valid values are messageGroup and queue. To enable high throughput for a FIFO queue, set this attribute to messageGroup *and* set the FifoThroughputLimit attribute to perMessageGroupId. If you set these attributes to anything other than these values, normal throughput is in effect and deduplication occurs as specified. For more information, see [High throughput for FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/high-throughput-fifo.html) and [Quotas related to messages](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html) in the *Developer Guide*.",
  ).optional(),
  DelaySeconds: z.number().int().describe(
    "The time in seconds for which the delivery of all messages in the queue is delayed. You can specify an integer value of 0 to 900 (15 minutes). The default value is 0.",
  ).optional(),
  FifoQueue: z.boolean().describe(
    "If set to true, creates a FIFO queue. If you don't specify this property, SQS creates a standard queue. For more information, see [FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html) in the *Developer Guide*.",
  ).optional(),
  FifoThroughputLimit: z.string().describe(
    "For high throughput for FIFO queues, specifies whether the FIFO queue throughput quota applies to the entire queue or per message group. Valid values are perQueue and perMessageGroupId. To enable high throughput for a FIFO queue, set this attribute to perMessageGroupId *and* set the DeduplicationScope attribute to messageGroup. If you set these attributes to anything other than these values, normal throughput is in effect and deduplication occurs as specified. For more information, see [High throughput for FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/high-throughput-fifo.html) and [Quotas related to messages](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html) in the *Developer Guide*.",
  ).optional(),
  KmsDataKeyReusePeriodSeconds: z.number().int().describe(
    "The length of time in seconds for which SQS can reuse a data key to encrypt or decrypt messages before calling KMS again. The value must be an integer between 60 (1 minute) and 86,400 (24 hours). The default is 300 (5 minutes). A shorter time period provides better security, but results in more calls to KMS, which might incur charges after Free Tier. For more information, see [Encryption at rest](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html#sqs-how-does-the-data-key-reuse-period-work) in the *Developer Guide*.",
  ).optional(),
  KmsMasterKeyId: z.string().describe(
    "The ID of an AWS Key Management Service (KMS) for SQS, or a custom KMS. To use the AWS managed KMS for SQS, specify a (default) alias ARN, alias name (e.g. alias/aws/sqs), key ARN, or key ID. For more information, see the following: [Encryption at rest](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html) in the *Developer Guide* [CreateQueue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html) in the *API Reference* [Request Parameters](https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html#API_DescribeKey_RequestParameters) in the *Key Management Service API Reference* The Key Management Service (KMS) section of the [Best Practices](https://docs.aws.amazon.com/https://d0.awsstatic.com/whitepapers/aws-kms-best-practices.pdf) whitepaper",
  ).optional(),
  SqsManagedSseEnabled: z.boolean().describe(
    "Enables server-side queue encryption using SQS owned encryption keys. Only one server-side encryption option is supported per queue (for example, [SSE-KMS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sse-existing-queue.html) or [SSE-SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sqs-sse-queue.html)). When SqsManagedSseEnabled is not defined, SSE-SQS encryption is enabled by default.",
  ).optional(),
  MaximumMessageSize: z.number().int().describe(
    "The limit of how many bytes that a message can contain before SQS rejects it. You can specify an integer value from 1,024 bytes (1 KiB) to 262,144 bytes (256 KiB). The default value is 262,144 (256 KiB).",
  ).optional(),
  MessageRetentionPeriod: z.number().int().describe(
    "The number of seconds that SQS retains a message. You can specify an integer value from 60 seconds (1 minute) to 1,209,600 seconds (14 days). The default value is 345,600 seconds (4 days).",
  ).optional(),
  QueueName: z.string().describe(
    "A name for the queue. To create a FIFO queue, the name of your FIFO queue must end with the.fifo suffix. For more information, see [FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html) in the *Developer Guide*. If you don't specify a name, CFN generates a unique physical ID and uses that ID for the queue name. For more information, see [Name type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html) in the *User Guide*. If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  ReceiveMessageWaitTimeSeconds: z.number().int().describe(
    "Specifies the duration, in seconds, that the ReceiveMessage action call waits until a message is in the queue in order to include it in the response, rather than returning an empty response if a message isn't yet available. You can specify an integer from 1 to 20. Short polling is used as the default or when you specify 0 for this property. For more information, see [Consuming messages using long polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html#sqs-long-polling) in the *Developer Guide*.",
  ).optional(),
  RedriveAllowPolicy: z.string().describe(
    "The string that includes the parameters for the permissions for the dead-letter queue redrive permission and which source queues can specify dead-letter queues as a JSON object. The parameters are as follows: redrivePermission: The permission type that defines which source queues can specify the current queue as the dead-letter queue. Valid values are: allowAll: (Default) Any source queues in this AWS account in the same Region can specify this queue as the dead-letter queue. denyAll: No source queues can specify this queue as the dead-letter queue. byQueue: Only queues specified by the sourceQueueArns parameter can specify this queue as the dead-letter queue. sourceQueueArns: The Amazon Resource Names (ARN)s of the source queues that can specify this queue as the dead-letter queue and redrive messages. You can specify this parameter only when the redrivePermission parameter is set to byQueue. You can specify up to 10 source queue ARNs. To allow more than 10 source queues to specify dead-letter queues, set the redrivePermission parameter to allowAll.",
  ).optional(),
  RedrivePolicy: z.string().describe(
    'The string that includes the parameters for the dead-letter queue functionality of the source queue as a JSON object. The parameters are as follows: deadLetterTargetArn: The Amazon Resource Name (ARN) of the dead-letter queue to which SQS moves messages after the value of maxReceiveCount is exceeded. maxReceiveCount: The number of times a message is delivered to the source queue before being moved to the dead-letter queue. When the ReceiveCount for a message exceeds the maxReceiveCount for a queue, SQS moves the message to the dead-letter-queue. The dead-letter queue of a FIFO queue must also be a FIFO queue. Similarly, the dead-letter queue of a standard queue must also be a standard queue. *JSON* { "deadLetterTargetArn": String, "maxReceiveCount": Integer } *YAML* deadLetterTargetArn: String maxReceiveCount: Integer',
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that you attach to this queue. For more information, see [Resource tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) in the *User Guide*.",
  ).optional(),
  VisibilityTimeout: z.number().int().describe(
    "The length of time during which a message will be unavailable after a message is delivered from the queue. This blocks other components from receiving the same message and gives the initial component time to process and delete the message from the queue. Values must be from 0 to 43,200 seconds (12 hours). If you don't specify a value, AWS CloudFormation uses the default value of 30 seconds. For more information about SQS queue visibility timeouts, see [Visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html) in the *Developer Guide*.",
  ).optional(),
});

const StateSchema = z.object({
  QueueUrl: z.string(),
  Arn: z.string().optional(),
  ContentBasedDeduplication: z.boolean().optional(),
  DeduplicationScope: z.string().optional(),
  DelaySeconds: z.number().optional(),
  FifoQueue: z.boolean().optional(),
  FifoThroughputLimit: z.string().optional(),
  KmsDataKeyReusePeriodSeconds: z.number().optional(),
  KmsMasterKeyId: z.string().optional(),
  SqsManagedSseEnabled: z.boolean().optional(),
  MaximumMessageSize: z.number().optional(),
  MessageRetentionPeriod: z.number().optional(),
  QueueName: z.string().optional(),
  ReceiveMessageWaitTimeSeconds: z.number().optional(),
  RedriveAllowPolicy: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  RedrivePolicy: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  Tags: z.array(TagSchema).optional(),
  VisibilityTimeout: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ContentBasedDeduplication: z.boolean().describe(
    "For first-in-first-out (FIFO) queues, specifies whether to enable content-based deduplication. During the deduplication interval, SQS treats messages that are sent with identical content as duplicates and delivers only one copy of the message. For more information, see the ContentBasedDeduplication attribute for the CreateQueue action in the *API Reference*.",
  ).optional(),
  DeduplicationScope: z.string().describe(
    "For high throughput for FIFO queues, specifies whether message deduplication occurs at the message group or queue level. Valid values are messageGroup and queue. To enable high throughput for a FIFO queue, set this attribute to messageGroup *and* set the FifoThroughputLimit attribute to perMessageGroupId. If you set these attributes to anything other than these values, normal throughput is in effect and deduplication occurs as specified. For more information, see [High throughput for FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/high-throughput-fifo.html) and [Quotas related to messages](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html) in the *Developer Guide*.",
  ).optional(),
  DelaySeconds: z.number().int().describe(
    "The time in seconds for which the delivery of all messages in the queue is delayed. You can specify an integer value of 0 to 900 (15 minutes). The default value is 0.",
  ).optional(),
  FifoQueue: z.boolean().describe(
    "If set to true, creates a FIFO queue. If you don't specify this property, SQS creates a standard queue. For more information, see [FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html) in the *Developer Guide*.",
  ).optional(),
  FifoThroughputLimit: z.string().describe(
    "For high throughput for FIFO queues, specifies whether the FIFO queue throughput quota applies to the entire queue or per message group. Valid values are perQueue and perMessageGroupId. To enable high throughput for a FIFO queue, set this attribute to perMessageGroupId *and* set the DeduplicationScope attribute to messageGroup. If you set these attributes to anything other than these values, normal throughput is in effect and deduplication occurs as specified. For more information, see [High throughput for FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/high-throughput-fifo.html) and [Quotas related to messages](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html) in the *Developer Guide*.",
  ).optional(),
  KmsDataKeyReusePeriodSeconds: z.number().int().describe(
    "The length of time in seconds for which SQS can reuse a data key to encrypt or decrypt messages before calling KMS again. The value must be an integer between 60 (1 minute) and 86,400 (24 hours). The default is 300 (5 minutes). A shorter time period provides better security, but results in more calls to KMS, which might incur charges after Free Tier. For more information, see [Encryption at rest](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html#sqs-how-does-the-data-key-reuse-period-work) in the *Developer Guide*.",
  ).optional(),
  KmsMasterKeyId: z.string().describe(
    "The ID of an AWS Key Management Service (KMS) for SQS, or a custom KMS. To use the AWS managed KMS for SQS, specify a (default) alias ARN, alias name (e.g. alias/aws/sqs), key ARN, or key ID. For more information, see the following: [Encryption at rest](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html) in the *Developer Guide* [CreateQueue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_CreateQueue.html) in the *API Reference* [Request Parameters](https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html#API_DescribeKey_RequestParameters) in the *Key Management Service API Reference* The Key Management Service (KMS) section of the [Best Practices](https://docs.aws.amazon.com/https://d0.awsstatic.com/whitepapers/aws-kms-best-practices.pdf) whitepaper",
  ).optional(),
  SqsManagedSseEnabled: z.boolean().describe(
    "Enables server-side queue encryption using SQS owned encryption keys. Only one server-side encryption option is supported per queue (for example, [SSE-KMS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sse-existing-queue.html) or [SSE-SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-configure-sqs-sse-queue.html)). When SqsManagedSseEnabled is not defined, SSE-SQS encryption is enabled by default.",
  ).optional(),
  MaximumMessageSize: z.number().int().describe(
    "The limit of how many bytes that a message can contain before SQS rejects it. You can specify an integer value from 1,024 bytes (1 KiB) to 262,144 bytes (256 KiB). The default value is 262,144 (256 KiB).",
  ).optional(),
  MessageRetentionPeriod: z.number().int().describe(
    "The number of seconds that SQS retains a message. You can specify an integer value from 60 seconds (1 minute) to 1,209,600 seconds (14 days). The default value is 345,600 seconds (4 days).",
  ).optional(),
  QueueName: z.string().describe(
    "A name for the queue. To create a FIFO queue, the name of your FIFO queue must end with the.fifo suffix. For more information, see [FIFO queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html) in the *Developer Guide*. If you don't specify a name, CFN generates a unique physical ID and uses that ID for the queue name. For more information, see [Name type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html) in the *User Guide*. If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  ReceiveMessageWaitTimeSeconds: z.number().int().describe(
    "Specifies the duration, in seconds, that the ReceiveMessage action call waits until a message is in the queue in order to include it in the response, rather than returning an empty response if a message isn't yet available. You can specify an integer from 1 to 20. Short polling is used as the default or when you specify 0 for this property. For more information, see [Consuming messages using long polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html#sqs-long-polling) in the *Developer Guide*.",
  ).optional(),
  RedriveAllowPolicy: z.string().describe(
    "The string that includes the parameters for the permissions for the dead-letter queue redrive permission and which source queues can specify dead-letter queues as a JSON object. The parameters are as follows: redrivePermission: The permission type that defines which source queues can specify the current queue as the dead-letter queue. Valid values are: allowAll: (Default) Any source queues in this AWS account in the same Region can specify this queue as the dead-letter queue. denyAll: No source queues can specify this queue as the dead-letter queue. byQueue: Only queues specified by the sourceQueueArns parameter can specify this queue as the dead-letter queue. sourceQueueArns: The Amazon Resource Names (ARN)s of the source queues that can specify this queue as the dead-letter queue and redrive messages. You can specify this parameter only when the redrivePermission parameter is set to byQueue. You can specify up to 10 source queue ARNs. To allow more than 10 source queues to specify dead-letter queues, set the redrivePermission parameter to allowAll.",
  ).optional(),
  RedrivePolicy: z.string().describe(
    'The string that includes the parameters for the dead-letter queue functionality of the source queue as a JSON object. The parameters are as follows: deadLetterTargetArn: The Amazon Resource Name (ARN) of the dead-letter queue to which SQS moves messages after the value of maxReceiveCount is exceeded. maxReceiveCount: The number of times a message is delivered to the source queue before being moved to the dead-letter queue. When the ReceiveCount for a message exceeds the maxReceiveCount for a queue, SQS moves the message to the dead-letter-queue. The dead-letter queue of a FIFO queue must also be a FIFO queue. Similarly, the dead-letter queue of a standard queue must also be a standard queue. *JSON* { "deadLetterTargetArn": String, "maxReceiveCount": Integer } *YAML* deadLetterTargetArn: String maxReceiveCount: Integer',
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that you attach to this queue. For more information, see [Resource tag](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) in the *User Guide*.",
  ).optional(),
  VisibilityTimeout: z.number().int().describe(
    "The length of time during which a message will be unavailable after a message is delivered from the queue. This blocks other components from receiving the same message and gives the initial component time to process and delete the message from the queue. Values must be from 0 to 43,200 seconds (12 hours). If you don't specify a value, AWS CloudFormation uses the default value of 30 seconds. For more information about SQS queue visibility timeouts, see [Visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html) in the *Developer Guide*.",
  ).optional(),
});

/** Swamp extension model for SQS Queue. Registered at `@swamp/aws/sqs/queue`. */
export const model = {
  type: "@swamp/aws/sqs/queue",
  version: "2026.05.19.1",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SQS Queue resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SQS Queue",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SQS::Queue",
          desiredState,
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
      description: "Get a SQS Queue",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SQS Queue",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SQS::Queue",
          args.identifier,
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
      description: "Update a SQS Queue",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.QueueUrl?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SQS::Queue",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SQS::Queue",
          identifier,
          currentState,
          desiredState,
          ["FifoQueue", "QueueName"],
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
      description: "Delete a SQS Queue",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SQS Queue",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SQS::Queue",
          args.identifier,
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
      description: "Sync SQS Queue state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.QueueUrl?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SQS::Queue",
            identifier,
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
