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

// Auto-generated extension model for @swamp/aws/lex/bot-alias
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lex BotAlias (AWS::Lex::BotAlias).
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

const LambdaCodeHookSchema = z.object({
  CodeHookInterfaceVersion: z.string().min(1).max(5).describe(
    "The version of the request-response that you want Amazon Lex to use to invoke your Lambda function.",
  ),
  LambdaArn: z.string().min(20).max(2048).describe(
    "The Amazon Resource Name (ARN) of the Lambda function.",
  ),
});

const CodeHookSpecificationSchema = z.object({
  LambdaCodeHook: LambdaCodeHookSchema.describe(
    "Contains information about code hooks that Amazon Lex calls during a conversation.",
  ),
});

const BotAliasLocaleSettingsSchema = z.object({
  CodeHookSpecification: CodeHookSpecificationSchema.describe(
    "Contains information about code hooks that Amazon Lex calls during a conversation.",
  ).optional(),
  Enabled: z.boolean().describe("Whether the Lambda code hook is enabled"),
});

const BotAliasLocaleSettingsItemSchema = z.object({
  LocaleId: z.string().min(1).max(128).describe(
    "A string used to identify the locale",
  ),
  BotAliasLocaleSetting: BotAliasLocaleSettingsSchema.describe(
    "You can use this parameter to specify a specific Lambda function to run different functions in different locales.",
  ),
});

const S3BucketLogDestinationSchema = z.object({
  S3BucketArn: z.string().min(1).max(2048).regex(
    new RegExp("^arn:[\\w\\-]+:s3:::[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ).describe(
    "The Amazon Resource Name (ARN) of an Amazon S3 bucket where audio log files are stored.",
  ),
  LogPrefix: z.string().min(0).max(1024).describe(
    "The Amazon S3 key of the deployment package.",
  ),
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w\\-]+:kms:[\\w\\-]+:[\\d]{12}:(?:key\\/[\\w\\-]+|alias\\/[a-zA-Z0-9:\\/_\\-]{1,256})$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of an AWS Key Management Service (KMS) key for encrypting audio log files stored in an S3 bucket.",
  ).optional(),
});

const AudioLogDestinationSchema = z.object({
  S3Bucket: S3BucketLogDestinationSchema.describe(
    "Specifies an Amazon S3 bucket for logging audio conversations",
  ),
});

const AudioLogSettingSchema = z.object({
  Destination: AudioLogDestinationSchema.describe(
    "The location of audio log files collected when conversation logging is enabled for a bot.",
  ),
  Enabled: z.boolean(),
});

const CloudWatchLogGroupLogDestinationSchema = z.object({
  CloudWatchLogGroupArn: z.string().min(1).max(2048).describe(
    "A string used to identify the groupArn for the Cloudwatch Log Group",
  ),
  LogPrefix: z.string().min(0).max(1024).describe(
    "A string containing the value for the Log Prefix",
  ),
});

const TextLogDestinationSchema = z.object({
  CloudWatch: CloudWatchLogGroupLogDestinationSchema,
});

const TextLogSettingSchema = z.object({
  Destination: TextLogDestinationSchema.describe(
    "Defines the Amazon CloudWatch Logs destination log group for conversation text logs.",
  ),
  Enabled: z.boolean(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A string used to identify this tag",
  ),
  Value: z.string().min(0).max(256).describe(
    "A string containing the value for the tag",
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
  BotId: z.string().min(10).max(10).regex(new RegExp("^[0-9a-zA-Z]+$"))
    .describe("Unique ID of resource"),
  BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema).describe(
    "A list of bot alias locale settings to add to the bot alias.",
  ).optional(),
  BotAliasName: z.string().min(1).max(100).regex(
    new RegExp("^([0-9a-zA-Z][_-]?)+$"),
  ).describe("A unique identifier for a resource."),
  BotVersion: z.string().min(1).max(5).regex(new RegExp("^(DRAFT|[0-9]+)$"))
    .describe("The version of a bot.").optional(),
  ConversationLogSettings: z.object({
    AudioLogSettings: z.array(AudioLogSettingSchema).describe(
      "List of audio log settings",
    ).optional(),
    TextLogSettings: z.array(TextLogSettingSchema).describe(
      "List of text log settings",
    ).optional(),
  }).describe(
    "Contains information about code hooks that Amazon Lex calls during a conversation.",
  ).optional(),
  Description: z.string().max(200).describe(
    "A description of the bot alias. Use the description to help identify the bot alias in lists.",
  ).optional(),
  SentimentAnalysisSettings: z.object({
    DetectSentiment: z.boolean().describe(
      "Enable to call Amazon Comprehend for Sentiment natively within Lex",
    ),
  }).describe(
    "Determines whether Amazon Lex will use Amazon Comprehend to detect the sentiment of user utterances.",
  ).optional(),
  BotAliasTags: z.array(TagSchema).describe(
    "A list of tags to add to the bot alias.",
  ).optional(),
});

const StateSchema = z.object({
  BotAliasId: z.string(),
  BotId: z.string(),
  Arn: z.string().optional(),
  BotAliasStatus: z.string().optional(),
  BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema).optional(),
  BotAliasName: z.string().optional(),
  BotVersion: z.string().optional(),
  ConversationLogSettings: z.object({
    AudioLogSettings: z.array(AudioLogSettingSchema),
    TextLogSettings: z.array(TextLogSettingSchema),
  }).optional(),
  Description: z.string().optional(),
  SentimentAnalysisSettings: z.object({
    DetectSentiment: z.boolean(),
  }).optional(),
  BotAliasTags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  BotId: z.string().min(10).max(10).regex(new RegExp("^[0-9a-zA-Z]+$"))
    .describe("Unique ID of resource").optional(),
  BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema).describe(
    "A list of bot alias locale settings to add to the bot alias.",
  ).optional(),
  BotAliasName: z.string().min(1).max(100).regex(
    new RegExp("^([0-9a-zA-Z][_-]?)+$"),
  ).describe("A unique identifier for a resource.").optional(),
  BotVersion: z.string().min(1).max(5).regex(new RegExp("^(DRAFT|[0-9]+)$"))
    .describe("The version of a bot.").optional(),
  ConversationLogSettings: z.object({
    AudioLogSettings: z.array(AudioLogSettingSchema).describe(
      "List of audio log settings",
    ).optional(),
    TextLogSettings: z.array(TextLogSettingSchema).describe(
      "List of text log settings",
    ).optional(),
  }).describe(
    "Contains information about code hooks that Amazon Lex calls during a conversation.",
  ).optional(),
  Description: z.string().max(200).describe(
    "A description of the bot alias. Use the description to help identify the bot alias in lists.",
  ).optional(),
  SentimentAnalysisSettings: z.object({
    DetectSentiment: z.boolean().describe(
      "Enable to call Amazon Comprehend for Sentiment natively within Lex",
    ).optional(),
  }).describe(
    "Determines whether Amazon Lex will use Amazon Comprehend to detect the sentiment of user utterances.",
  ).optional(),
  BotAliasTags: z.array(TagSchema).describe(
    "A list of tags to add to the bot alias.",
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

/** Swamp extension model for Lex BotAlias. Registered at `@swamp/aws/lex/bot-alias`. */
export const model = {
  type: "@swamp/aws/lex/bot-alias",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lex BotAlias resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lex BotAlias",
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
          "AWS::Lex::BotAlias",
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
      description: "Get a Lex BotAlias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lex BotAlias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lex::BotAlias",
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
      description: "Update a Lex BotAlias",
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
        const idParts = [
          existing.BotAliasId?.toString(),
          existing.BotId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Lex::BotAlias",
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
          "AWS::Lex::BotAlias",
          identifier,
          currentState,
          desiredState,
          ["BotId"],
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
      description: "Delete a Lex BotAlias",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lex BotAlias",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lex::BotAlias",
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
      description: "Sync Lex BotAlias state from AWS",
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
        const idParts = [
          existing.BotAliasId?.toString(),
          existing.BotId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Lex::BotAlias",
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
