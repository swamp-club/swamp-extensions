// Auto-generated extension model for @swamp/aws/sns/topic
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SNS Topic (AWS::SNS::Topic).
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

const SubscriptionSchema = z.object({
  Endpoint: z.string().describe(
    "The endpoint that receives notifications from the SNS topic. The endpoint value depends on the protocol that you specify. For more information, see the Endpoint parameter of the Subscribe action in the *API Reference*.",
  ),
  Protocol: z.string().describe(
    "The subscription's protocol. For more information, see the Protocol parameter of the Subscribe action in the *API Reference*.",
  ),
});

const TagSchema = z.object({
  Key: z.string().describe("The required key portion of the tag."),
  Value: z.string().describe("The optional value portion of the tag."),
});

const LoggingConfigSchema = z.object({
  Protocol: z.enum(["http/s", "sqs", "lambda", "firehose", "application"])
    .describe(
      "Indicates one of the supported protocols for the Amazon SNS topic. At least one of the other three LoggingConfig properties is recommend along with Protocol.",
    ),
  SuccessFeedbackRoleArn: z.string().describe(
    "The IAM role ARN to be used when logging successful message deliveries in Amazon CloudWatch.",
  ).optional(),
  SuccessFeedbackSampleRate: z.string().describe(
    "The percentage of successful message deliveries to be logged in Amazon CloudWatch. Valid percentage values range from 0 to 100.",
  ).optional(),
  FailureFeedbackRoleArn: z.string().describe(
    "The IAM role ARN to be used when logging failed message deliveries in Amazon CloudWatch.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  DisplayName: z.string().describe(
    "The display name to use for an SNS topic with SMS subscriptions. The display name must be maximum 100 characters long, including hyphens (-), underscores (_), spaces, and tabs.",
  ).optional(),
  KmsMasterKeyId: z.string().describe(
    "The ID of an AWS managed customer master key (CMK) for SNS or a custom CMK. For more information, see [Key terms](https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html#sse-key-terms). For more examples, see KeyId in the *API Reference*. This property applies only to [server-side-encryption](https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html).",
  ).optional(),
  DataProtectionPolicy: z.record(z.string(), z.unknown()).describe(
    "The body of the policy document you want to use for this topic. You can only add one policy per topic. The policy must be in JSON string format. Length Constraints: Maximum length of 30,720.",
  ).optional(),
  Subscription: z.array(SubscriptionSchema).describe(
    "The SNS subscriptions (endpoints) for this topic. If you specify the Subscription property in the AWS::SNS::Topic resource and it creates an associated subscription resource, the associated subscription is not deleted when the AWS::SNS::Topic resource is deleted.",
  ).optional(),
  FifoTopic: z.boolean().describe("Set to true to create a FIFO topic.")
    .optional(),
  ContentBasedDeduplication: z.boolean().describe(
    "Enables content-based deduplication for FIFO topics. By default, ContentBasedDeduplication is set to false. If you create a FIFO topic and this attribute is false, you must specify a value for the MessageDeduplicationId parameter for the [Publish](https://docs.aws.amazon.com/sns/latest/api/API_Publish.html) action. When you set ContentBasedDeduplication to true, SNS uses a SHA-256 hash to generate the MessageDeduplicationId using the body of the message (but not the attributes of the message). (Optional) To override the generated value, you can specify a value for the the MessageDeduplicationId parameter for the Publish action.",
  ).optional(),
  ArchivePolicy: z.record(z.string(), z.unknown()).describe(
    "The archive policy determines the number of days SNS retains messages. You can set a retention period from 1 to 365 days.",
  ).optional(),
  FifoThroughputScope: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "The list of tags to add to a new topic. To be able to tag a topic on creation, you must have the sns:CreateTopic and sns:TagResource permissions.",
  ).optional(),
  TopicName: z.string().describe(
    "The name of the topic you want to create. Topic names must include only uppercase and lowercase ASCII letters, numbers, underscores, and hyphens, and must be between 1 and 256 characters long. FIFO topic names must end with.fifo. If you don't specify a name, CFN generates a unique physical ID and uses that ID for the topic name. For more information, see [Name type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html). If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  SignatureVersion: z.string().describe(
    "The signature version corresponds to the hashing algorithm used while creating the signature of the notifications, subscription confirmations, or unsubscribe confirmation messages sent by Amazon SNS. By default, SignatureVersion is set to 1.",
  ).optional(),
  TracingConfig: z.string().describe(
    "Tracing mode of an SNS topic. By default TracingConfig is set to PassThrough, and the topic passes through the tracing header it receives from an SNS publisher to its subscriptions. If set to Active, SNS will vend X-Ray segment data to topic owner account if the sampled flag in the tracing header is true.",
  ).optional(),
  DeliveryStatusLogging: z.array(LoggingConfigSchema).describe(
    "The DeliveryStatusLogging configuration enables you to log the delivery status of messages sent from your Amazon SNS topic to subscribed endpoints with the following supported delivery protocols: HTTP Amazon Kinesis Data Firehose AWS Lambda Platform application endpoint Amazon Simple Queue Service Once configured, log entries are sent to Amazon CloudWatch Logs.",
  ).optional(),
});

const StateSchema = z.object({
  DisplayName: z.string().optional(),
  KmsMasterKeyId: z.string().optional(),
  DataProtectionPolicy: z.record(z.string(), z.unknown()).optional(),
  Subscription: z.array(SubscriptionSchema).optional(),
  FifoTopic: z.boolean().optional(),
  ContentBasedDeduplication: z.boolean().optional(),
  ArchivePolicy: z.record(z.string(), z.unknown()).optional(),
  FifoThroughputScope: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TopicName: z.string().optional(),
  TopicArn: z.string(),
  SignatureVersion: z.string().optional(),
  TracingConfig: z.string().optional(),
  DeliveryStatusLogging: z.array(LoggingConfigSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  DisplayName: z.string().describe(
    "The display name to use for an SNS topic with SMS subscriptions. The display name must be maximum 100 characters long, including hyphens (-), underscores (_), spaces, and tabs.",
  ).optional(),
  KmsMasterKeyId: z.string().describe(
    "The ID of an AWS managed customer master key (CMK) for SNS or a custom CMK. For more information, see [Key terms](https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html#sse-key-terms). For more examples, see KeyId in the *API Reference*. This property applies only to [server-side-encryption](https://docs.aws.amazon.com/sns/latest/dg/sns-server-side-encryption.html).",
  ).optional(),
  DataProtectionPolicy: z.record(z.string(), z.unknown()).describe(
    "The body of the policy document you want to use for this topic. You can only add one policy per topic. The policy must be in JSON string format. Length Constraints: Maximum length of 30,720.",
  ).optional(),
  Subscription: z.array(SubscriptionSchema).describe(
    "The SNS subscriptions (endpoints) for this topic. If you specify the Subscription property in the AWS::SNS::Topic resource and it creates an associated subscription resource, the associated subscription is not deleted when the AWS::SNS::Topic resource is deleted.",
  ).optional(),
  FifoTopic: z.boolean().describe("Set to true to create a FIFO topic.")
    .optional(),
  ContentBasedDeduplication: z.boolean().describe(
    "Enables content-based deduplication for FIFO topics. By default, ContentBasedDeduplication is set to false. If you create a FIFO topic and this attribute is false, you must specify a value for the MessageDeduplicationId parameter for the [Publish](https://docs.aws.amazon.com/sns/latest/api/API_Publish.html) action. When you set ContentBasedDeduplication to true, SNS uses a SHA-256 hash to generate the MessageDeduplicationId using the body of the message (but not the attributes of the message). (Optional) To override the generated value, you can specify a value for the the MessageDeduplicationId parameter for the Publish action.",
  ).optional(),
  ArchivePolicy: z.record(z.string(), z.unknown()).describe(
    "The archive policy determines the number of days SNS retains messages. You can set a retention period from 1 to 365 days.",
  ).optional(),
  FifoThroughputScope: z.string().optional(),
  Tags: z.array(TagSchema).describe(
    "The list of tags to add to a new topic. To be able to tag a topic on creation, you must have the sns:CreateTopic and sns:TagResource permissions.",
  ).optional(),
  TopicName: z.string().describe(
    "The name of the topic you want to create. Topic names must include only uppercase and lowercase ASCII letters, numbers, underscores, and hyphens, and must be between 1 and 256 characters long. FIFO topic names must end with.fifo. If you don't specify a name, CFN generates a unique physical ID and uses that ID for the topic name. For more information, see [Name type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html). If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.",
  ).optional(),
  SignatureVersion: z.string().describe(
    "The signature version corresponds to the hashing algorithm used while creating the signature of the notifications, subscription confirmations, or unsubscribe confirmation messages sent by Amazon SNS. By default, SignatureVersion is set to 1.",
  ).optional(),
  TracingConfig: z.string().describe(
    "Tracing mode of an SNS topic. By default TracingConfig is set to PassThrough, and the topic passes through the tracing header it receives from an SNS publisher to its subscriptions. If set to Active, SNS will vend X-Ray segment data to topic owner account if the sampled flag in the tracing header is true.",
  ).optional(),
  DeliveryStatusLogging: z.array(LoggingConfigSchema).describe(
    "The DeliveryStatusLogging configuration enables you to log the delivery status of messages sent from your Amazon SNS topic to subscribed endpoints with the following supported delivery protocols: HTTP Amazon Kinesis Data Firehose AWS Lambda Platform application endpoint Amazon Simple Queue Service Once configured, log entries are sent to Amazon CloudWatch Logs.",
  ).optional(),
});

/** Swamp extension model for SNS Topic. Registered at `@swamp/aws/sns/topic`. */
export const model = {
  type: "@swamp/aws/sns/topic",
  version: "2026.05.27.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SNS Topic resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SNS Topic",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SNS::Topic",
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
      description: "Get a SNS Topic",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SNS Topic",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SNS::Topic",
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
      description: "Update a SNS Topic",
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
        const identifier = existing.TopicArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SNS::Topic",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SNS::Topic",
          identifier,
          currentState,
          desiredState,
          ["TopicName", "FifoTopic"],
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
      description: "Delete a SNS Topic",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SNS Topic",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SNS::Topic",
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
      description: "Sync SNS Topic state from AWS",
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
        const identifier = existing.TopicArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SNS::Topic",
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
