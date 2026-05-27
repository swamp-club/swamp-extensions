// Auto-generated extension model for @swamp/aws/securitylake/subscriber-notification
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SecurityLake SubscriberNotification (AWS::SecurityLake::SubscriberNotification).
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

const HttpsNotificationConfigurationSchema = z.object({
  AuthorizationApiKeyName: z.string().describe(
    "The key name for the notification subscription.",
  ).optional(),
  AuthorizationApiKeyValue: z.string().describe(
    "The key value for the notification subscription.",
  ).optional(),
  Endpoint: z.string().regex(new RegExp("^https?://.+$")).describe(
    "The subscription endpoint in Security Lake.",
  ),
  HttpMethod: z.enum(["POST", "PUT"]).describe(
    "The HTTPS method used for the notification subscription.",
  ).optional(),
  TargetRoleArn: z.string().regex(new RegExp("^arn:.*$")).describe(
    "The Amazon Resource Name (ARN) of the EventBridge API destinations IAM role that you created.",
  ),
});

const GlobalArgsSchema = z.object({
  NotificationConfiguration: z.object({
    HttpsNotificationConfiguration: HttpsNotificationConfigurationSchema
      .describe("The configuration for HTTPS subscriber notification.")
      .optional(),
    SqsNotificationConfiguration: z.record(z.string(), z.unknown()).describe(
      "The configurations for SQS subscriber notification. The members of this structure are context-dependent.",
    ).optional(),
  }),
  SubscriberArn: z.string().regex(new RegExp("^arn:.*$")).describe(
    "The ARN for the subscriber",
  ),
});

const StateSchema = z.object({
  NotificationConfiguration: z.object({
    HttpsNotificationConfiguration: HttpsNotificationConfigurationSchema,
    SqsNotificationConfiguration: z.record(z.string(), z.unknown()),
  }).optional(),
  SubscriberArn: z.string(),
  SubscriberEndpoint: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  NotificationConfiguration: z.object({
    HttpsNotificationConfiguration: HttpsNotificationConfigurationSchema
      .describe("The configuration for HTTPS subscriber notification.")
      .optional(),
    SqsNotificationConfiguration: z.record(z.string(), z.unknown()).describe(
      "The configurations for SQS subscriber notification. The members of this structure are context-dependent.",
    ).optional(),
  }).optional(),
  SubscriberArn: z.string().regex(new RegExp("^arn:.*$")).describe(
    "The ARN for the subscriber",
  ).optional(),
});

/** Swamp extension model for SecurityLake SubscriberNotification. Registered at `@swamp/aws/securitylake/subscriber-notification`. */
export const model = {
  type: "@swamp/aws/securitylake/subscriber-notification",
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
      description: "SecurityLake SubscriberNotification resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SecurityLake SubscriberNotification",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SecurityLake::SubscriberNotification",
          desiredState,
        ) as StateData;
        const instanceName =
          ((result.SubscriberArn ?? g.SubscriberArn)?.toString() ?? "current")
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
      description: "Get a SecurityLake SubscriberNotification",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityLake SubscriberNotification",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::SecurityLake::SubscriberNotification",
          args.identifier,
        ) as StateData;
        const instanceName =
          ((result.SubscriberArn ?? context.globalArgs.SubscriberArn)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a SecurityLake SubscriberNotification",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.SubscriberArn?.toString() ?? "current").replace(
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
          "AWS::SecurityLake::SubscriberNotification",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SecurityLake::SubscriberNotification",
          identifier,
          currentState,
          desiredState,
          ["SubscriberArn"],
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
      description: "Delete a SecurityLake SubscriberNotification",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SecurityLake SubscriberNotification",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::SecurityLake::SubscriberNotification",
          args.identifier,
        );
        const instanceName =
          (context.globalArgs.SubscriberArn?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync SecurityLake SubscriberNotification state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.SubscriberArn?.toString() ?? "current").replace(
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
            "AWS::SecurityLake::SubscriberNotification",
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
