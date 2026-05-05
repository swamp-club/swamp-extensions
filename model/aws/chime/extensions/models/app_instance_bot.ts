// Auto-generated extension model for @swamp/aws/chime/app-instance-bot
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for Chime AppInstanceBot (AWS::Chime::AppInstanceBot).
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

const InvokedBySchema = z.object({
  StandardMessages: z.enum(["AUTO", "ALL", "MENTIONS", "NONE"]).describe(
    "Sets standard messages as the bot trigger.",
  ),
  TargetedMessages: z.enum(["ALL", "NONE"]).describe(
    "Sets targeted messages as the bot trigger.",
  ),
});

const LexConfigurationSchema = z.object({
  RespondsTo: z.enum(["STANDARD_MESSAGES"]).describe(
    "Determines whether the Amazon Lex V2 bot responds to all standard messages. Control messages are not supported.",
  ).optional(),
  InvokedBy: InvokedBySchema.describe(
    "Specifies the type of message that triggers a bot.",
  ).optional(),
  LexBotAliasArn: z.string().min(15).max(2048).regex(
    new RegExp(
      "^arn:aws:lex:[a-z]{2}-[a-z]+-\\d{1}:\\d{12}:bot-alias/[A-Z0-9]{10}/[A-Z0-9]{10}$",
    ),
  ).describe("The ARN of the Amazon Lex V2 bot's alias."),
  LocaleId: z.string().describe(
    "Identifies the Amazon Lex V2 bot's language and locale.",
  ),
  WelcomeIntent: z.string().min(1).max(100).regex(new RegExp("^([A-Za-z]_?)+$"))
    .describe(
      "The name of the welcome intent configured in the Amazon Lex V2 bot.",
    ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key in a tag."),
  Value: z.string().min(1).max(256).describe("The value in a tag."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AppInstanceArn: z.string().min(5).max(1600).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("The ARN of the AppInstance."),
  Name: z.string().min(0).max(256).regex(
    new RegExp(
      "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]*$",
    ),
  ).describe("The name of the AppInstanceBot.").optional(),
  Metadata: z.string().min(0).max(1024).regex(new RegExp(".*")).describe(
    "The metadata of the AppInstanceBot.",
  ).optional(),
  Configuration: z.object({
    Lex: LexConfigurationSchema.describe(
      "The configuration for an Amazon Lex V2 bot.",
    ),
  }).describe("A structure that contains configuration data."),
  Tags: z.array(TagSchema).describe("The tags assigned to the AppInstanceBot.")
    .optional(),
});

const StateSchema = z.object({
  AppInstanceArn: z.string().optional(),
  AppInstanceBotArn: z.string(),
  Name: z.string().optional(),
  Metadata: z.string().optional(),
  Configuration: z.object({
    Lex: LexConfigurationSchema,
  }).optional(),
  CreatedTimestamp: z.number().optional(),
  LastUpdatedTimestamp: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AppInstanceArn: z.string().min(5).max(1600).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("The ARN of the AppInstance.").optional(),
  Name: z.string().min(0).max(256).regex(
    new RegExp(
      "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\\u10000-\\u10FFFF]*$",
    ),
  ).describe("The name of the AppInstanceBot.").optional(),
  Metadata: z.string().min(0).max(1024).regex(new RegExp(".*")).describe(
    "The metadata of the AppInstanceBot.",
  ).optional(),
  Configuration: z.object({
    Lex: LexConfigurationSchema.describe(
      "The configuration for an Amazon Lex V2 bot.",
    ).optional(),
  }).describe("A structure that contains configuration data.").optional(),
  Tags: z.array(TagSchema).describe("The tags assigned to the AppInstanceBot.")
    .optional(),
});

/** Swamp extension model for Chime AppInstanceBot. Registered at `@swamp/aws/chime/app-instance-bot`. */
export const model = {
  type: "@swamp/aws/chime/app-instance-bot",
  version: "2026.05.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Chime AppInstanceBot resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Chime AppInstanceBot",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Chime::AppInstanceBot",
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
      description: "Get a Chime AppInstanceBot",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Chime AppInstanceBot",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Chime::AppInstanceBot",
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
      description: "Update a Chime AppInstanceBot",
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
        const identifier = existing.AppInstanceBotArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Chime::AppInstanceBot",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Chime::AppInstanceBot",
          identifier,
          currentState,
          desiredState,
          ["AppInstanceArn"],
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
      description: "Delete a Chime AppInstanceBot",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Chime AppInstanceBot",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Chime::AppInstanceBot",
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
      description: "Sync Chime AppInstanceBot state from AWS",
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
        const identifier = existing.AppInstanceBotArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Chime::AppInstanceBot",
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
