// Auto-generated extension model for @swamp/aws/events/event-bus
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Events EventBus (AWS::Events::EventBus).
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
  Key: z.string(),
  Value: z.string(),
});

const GlobalArgsSchema = z.object({
  EventSourceName: z.string().describe(
    "If you are creating a partner event bus, this specifies the partner event source that the new event bus will be matched with.",
  ).optional(),
  Name: z.string().describe("The name of the event bus."),
  Tags: z.array(TagSchema).describe("Any tags assigned to the event bus.")
    .optional(),
  Description: z.string().describe("The description of the event bus.")
    .optional(),
  KmsKeyIdentifier: z.string().describe(
    "Kms Key Identifier used to encrypt events at rest in the event bus.",
  ).optional(),
  Policy: z.string().describe(
    "A JSON string that describes the permission policy statement for the event bus.",
  ).optional(),
  LogConfig: z.object({
    IncludeDetail: z.enum(["FULL", "NONE"]).describe(
      "Configures whether or not to include event detail, input transformer details, target properties, and target input in the applicable log messages.",
    ).optional(),
    Level: z.enum(["INFO", "ERROR", "TRACE", "OFF"]).describe(
      "Configures the log level of the EventBus and determines which log messages are sent to Ingestion Hub for delivery.",
    ).optional(),
  }).describe("The logging configuration settings for vended logs.").optional(),
});

const StateSchema = z.object({
  EventSourceName: z.string().optional(),
  Name: z.string(),
  Tags: z.array(TagSchema).optional(),
  Description: z.string().optional(),
  KmsKeyIdentifier: z.string().optional(),
  Policy: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  Arn: z.string().optional(),
  DeadLetterConfig: z.object({
    Arn: z.string(),
  }).optional(),
  LogConfig: z.object({
    IncludeDetail: z.string(),
    Level: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  EventSourceName: z.string().describe(
    "If you are creating a partner event bus, this specifies the partner event source that the new event bus will be matched with.",
  ).optional(),
  Name: z.string().describe("The name of the event bus.").optional(),
  Tags: z.array(TagSchema).describe("Any tags assigned to the event bus.")
    .optional(),
  Description: z.string().describe("The description of the event bus.")
    .optional(),
  KmsKeyIdentifier: z.string().describe(
    "Kms Key Identifier used to encrypt events at rest in the event bus.",
  ).optional(),
  Policy: z.string().describe(
    "A JSON string that describes the permission policy statement for the event bus.",
  ).optional(),
  LogConfig: z.object({
    IncludeDetail: z.enum(["FULL", "NONE"]).describe(
      "Configures whether or not to include event detail, input transformer details, target properties, and target input in the applicable log messages.",
    ).optional(),
    Level: z.enum(["INFO", "ERROR", "TRACE", "OFF"]).describe(
      "Configures the log level of the EventBus and determines which log messages are sent to Ingestion Hub for delivery.",
    ).optional(),
  }).describe("The logging configuration settings for vended logs.").optional(),
});

/** Swamp extension model for Events EventBus. Registered at `@swamp/aws/events/event-bus`. */
export const model = {
  type: "@swamp/aws/events/event-bus",
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
      description: "Events EventBus resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Events EventBus",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Events::EventBus",
          desiredState,
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
      description: "Get a Events EventBus",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Events EventBus",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Events::EventBus",
          args.identifier,
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
      description: "Update a Events EventBus",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
          "AWS::Events::EventBus",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Events::EventBus",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a Events EventBus",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Events EventBus",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Events::EventBus",
          args.identifier,
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
      description: "Sync Events EventBus state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
            "AWS::Events::EventBus",
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
