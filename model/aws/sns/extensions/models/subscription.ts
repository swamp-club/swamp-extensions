// Auto-generated extension model for @swamp/aws/sns/subscription
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SNS Subscription (AWS::SNS::Subscription).
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ReplayPolicy: z.string().describe(
    "Specifies whether Amazon SNS resends the notification to the subscription when a message's attribute changes.",
  ).optional(),
  RawMessageDelivery: z.boolean().describe(
    "When set to true, enables raw message delivery. Raw messages don't contain any JSON formatting and can be sent to Amazon SQS and HTTP/S endpoints.",
  ).optional(),
  Endpoint: z.string().describe(
    "The subscription's endpoint. The endpoint value depends on the protocol that you specify.",
  ).optional(),
  FilterPolicy: z.string().describe(
    "The filter policy JSON assigned to the subscription. Enables the subscriber to filter out unwanted messages.",
  ).optional(),
  TopicArn: z.string().describe("The ARN of the topic to subscribe to."),
  RedrivePolicy: z.string().describe(
    "When specified, sends undeliverable messages to the specified Amazon SQS dead-letter queue. Messages that can't be delivered due to client errors are held in the dead-letter queue for further analysis or reprocessing.",
  ).optional(),
  DeliveryPolicy: z.string().describe(
    "The delivery policy JSON assigned to the subscription. Enables the subscriber to define the message delivery retry strategy in the case of an HTTP/S endpoint subscribed to the topic.",
  ).optional(),
  Region: z.string().describe(
    "For cross-region subscriptions, the region in which the topic resides.If no region is specified, AWS CloudFormation uses the region of the caller as the default.",
  ).optional(),
  SubscriptionRoleArn: z.string().describe(
    "This property applies only to Amazon Data Firehose delivery stream subscriptions.",
  ).optional(),
  FilterPolicyScope: z.string().describe(
    "This attribute lets you choose the filtering scope by using one of the following string value types: MessageAttributes (default) and MessageBody.",
  ).optional(),
  Protocol: z.string().describe("The subscription's protocol."),
});

const StateSchema = z.object({
  Arn: z.string(),
  ReplayPolicy: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  RawMessageDelivery: z.boolean().optional(),
  Endpoint: z.string().optional(),
  FilterPolicy: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  TopicArn: z.string().optional(),
  RedrivePolicy: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  DeliveryPolicy: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  Region: z.string().optional(),
  SubscriptionRoleArn: z.string().optional(),
  FilterPolicyScope: z.string().optional(),
  Protocol: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ReplayPolicy: z.string().describe(
    "Specifies whether Amazon SNS resends the notification to the subscription when a message's attribute changes.",
  ).optional(),
  RawMessageDelivery: z.boolean().describe(
    "When set to true, enables raw message delivery. Raw messages don't contain any JSON formatting and can be sent to Amazon SQS and HTTP/S endpoints.",
  ).optional(),
  Endpoint: z.string().describe(
    "The subscription's endpoint. The endpoint value depends on the protocol that you specify.",
  ).optional(),
  FilterPolicy: z.string().describe(
    "The filter policy JSON assigned to the subscription. Enables the subscriber to filter out unwanted messages.",
  ).optional(),
  TopicArn: z.string().describe("The ARN of the topic to subscribe to.")
    .optional(),
  RedrivePolicy: z.string().describe(
    "When specified, sends undeliverable messages to the specified Amazon SQS dead-letter queue. Messages that can't be delivered due to client errors are held in the dead-letter queue for further analysis or reprocessing.",
  ).optional(),
  DeliveryPolicy: z.string().describe(
    "The delivery policy JSON assigned to the subscription. Enables the subscriber to define the message delivery retry strategy in the case of an HTTP/S endpoint subscribed to the topic.",
  ).optional(),
  Region: z.string().describe(
    "For cross-region subscriptions, the region in which the topic resides.If no region is specified, AWS CloudFormation uses the region of the caller as the default.",
  ).optional(),
  SubscriptionRoleArn: z.string().describe(
    "This property applies only to Amazon Data Firehose delivery stream subscriptions.",
  ).optional(),
  FilterPolicyScope: z.string().describe(
    "This attribute lets you choose the filtering scope by using one of the following string value types: MessageAttributes (default) and MessageBody.",
  ).optional(),
  Protocol: z.string().describe("The subscription's protocol.").optional(),
});

/** Swamp extension model for SNS Subscription. Registered at `@swamp/aws/sns/subscription`. */
export const model = {
  type: "@swamp/aws/sns/subscription",
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
      description: "SNS Subscription resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SNS Subscription",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SNS::Subscription",
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
      description: "Get a SNS Subscription",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SNS Subscription",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SNS::Subscription",
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
      description: "Update a SNS Subscription",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SNS::Subscription",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SNS::Subscription",
          identifier,
          currentState,
          desiredState,
          ["Endpoint", "Protocol", "TopicArn"],
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
      description: "Delete a SNS Subscription",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SNS Subscription",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SNS::Subscription",
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
      description: "Sync SNS Subscription state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SNS::Subscription",
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
