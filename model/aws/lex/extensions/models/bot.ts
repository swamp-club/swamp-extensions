// Auto-generated extension model for @swamp/aws/lex/bot
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lex Bot (AWS::Lex::Bot).
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

const TagSchema = z.object({
  Value: z.string().min(0).max(256),
  Key: z.string().min(1).max(128),
});

const LambdaCodeHookSchema = z.object({
  LambdaArn: z.string().min(20).max(2048),
  CodeHookInterfaceVersion: z.string().min(1).max(5),
});

const CodeHookSpecificationSchema = z.object({
  LambdaCodeHook: LambdaCodeHookSchema,
});

const BotAliasLocaleSettingsSchema = z.object({
  CodeHookSpecification: CodeHookSpecificationSchema.optional(),
  Enabled: z.boolean(),
});

const BotAliasLocaleSettingsItemSchema = z.object({
  LocaleId: z.string().min(1).max(128),
  BotAliasLocaleSetting: BotAliasLocaleSettingsSchema,
});

const CloudWatchLogGroupLogDestinationSchema = z.object({
  CloudWatchLogGroupArn: z.string().min(1).max(2048),
  LogPrefix: z.string().min(0).max(1024),
});

const TextLogDestinationSchema = z.object({
  CloudWatch: CloudWatchLogGroupLogDestinationSchema,
});

const TextLogSettingSchema = z.object({
  Destination: TextLogDestinationSchema,
  Enabled: z.boolean(),
});

const S3BucketLogDestinationSchema = z.object({
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w\\-]+:kms:[\\w\\-]+:[\\d]{12}:(?:key\\/[\\w\\-]+|alias\\/[a-zA-Z0-9:\\/_\\-]{1,256})$",
    ),
  ).optional(),
  LogPrefix: z.string().min(0).max(1024),
  S3BucketArn: z.string().min(1).max(2048).regex(
    new RegExp("^arn:[\\w\\-]+:s3:::[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ),
});

const AudioLogDestinationSchema = z.object({
  S3Bucket: S3BucketLogDestinationSchema,
});

const AudioLogSettingSchema = z.object({
  Destination: AudioLogDestinationSchema,
  Enabled: z.boolean(),
});

const ConversationLogSettingsSchema = z.object({
  TextLogSettings: z.array(TextLogSettingSchema).optional(),
  AudioLogSettings: z.array(AudioLogSettingSchema).optional(),
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
  Description: z.string().max(2000).describe("A description of the resource")
    .optional(),
  ErrorLogSettings: z.object({
    Enabled: z.boolean(),
  }).optional(),
  RoleArn: z.string().min(32).max(2048).regex(
    new RegExp("^arn:aws[a-zA-Z-]*:iam::[0-9]{12}:role/.*$"),
  ),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$")),
  BotTags: z.array(TagSchema).optional(),
  TestBotAliasTags: z.array(TagSchema).optional(),
  AutoBuildBotLocales: z.boolean().optional(),
  BotLocales: z.array(z.string()).optional(),
  IdleSessionTTLInSeconds: z.number().int().min(60).max(86400),
  BotFileS3Location: z.object({
    S3ObjectVersion: z.string().min(1).max(1024).optional(),
    S3Bucket: z.string().min(3).max(63).regex(
      new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
    ),
    S3ObjectKey: z.string().min(1).max(1024).regex(
      new RegExp(
        "[\\.\\-\\!\\*\\_\\'\\(\\)a-zA-Z0-9][\\.\\-\\!\\*\\_\\'\\(\\)\\/a-zA-Z0-9]*$",
      ),
    ),
  }).optional(),
  Replication: z.object({
    ReplicaRegions: z.array(z.string().min(2).max(25)),
  }).optional(),
  TestBotAliasSettings: z.object({
    Description: z.string().max(2000).describe("A description of the resource")
      .optional(),
    BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema)
      .optional(),
    ConversationLogSettings: ConversationLogSettingsSchema.optional(),
    SentimentAnalysisSettings: z.object({
      DetectSentiment: z.boolean(),
    }).optional(),
  }).optional(),
  DataPrivacy: z.object({
    ChildDirected: z.boolean(),
  }),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  ErrorLogSettings: z.object({
    Enabled: z.boolean(),
  }).optional(),
  RoleArn: z.string().optional(),
  Name: z.string().optional(),
  BotTags: z.array(TagSchema).optional(),
  TestBotAliasTags: z.array(TagSchema).optional(),
  AutoBuildBotLocales: z.boolean().optional(),
  BotLocales: z.array(z.string()).optional(),
  IdleSessionTTLInSeconds: z.number().optional(),
  BotFileS3Location: z.object({
    S3ObjectVersion: z.string(),
    S3Bucket: z.string(),
    S3ObjectKey: z.string(),
  }).optional(),
  Replication: z.object({
    ReplicaRegions: z.array(z.string()),
  }).optional(),
  TestBotAliasSettings: z.object({
    Description: z.string(),
    BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema),
    ConversationLogSettings: ConversationLogSettingsSchema,
    SentimentAnalysisSettings: z.object({
      DetectSentiment: z.boolean(),
    }),
  }).optional(),
  Id: z.string(),
  Arn: z.string().optional(),
  DataPrivacy: z.object({
    ChildDirected: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().max(2000).describe("A description of the resource")
    .optional(),
  ErrorLogSettings: z.object({
    Enabled: z.boolean().optional(),
  }).optional(),
  RoleArn: z.string().min(32).max(2048).regex(
    new RegExp("^arn:aws[a-zA-Z-]*:iam::[0-9]{12}:role/.*$"),
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^([0-9a-zA-Z][_-]?)+$"))
    .optional(),
  BotTags: z.array(TagSchema).optional(),
  TestBotAliasTags: z.array(TagSchema).optional(),
  AutoBuildBotLocales: z.boolean().optional(),
  BotLocales: z.array(z.string()).optional(),
  IdleSessionTTLInSeconds: z.number().int().min(60).max(86400).optional(),
  BotFileS3Location: z.object({
    S3ObjectVersion: z.string().min(1).max(1024).optional(),
    S3Bucket: z.string().min(3).max(63).regex(
      new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
    ).optional(),
    S3ObjectKey: z.string().min(1).max(1024).regex(
      new RegExp(
        "[\\.\\-\\!\\*\\_\\'\\(\\)a-zA-Z0-9][\\.\\-\\!\\*\\_\\'\\(\\)\\/a-zA-Z0-9]*$",
      ),
    ).optional(),
  }).optional(),
  Replication: z.object({
    ReplicaRegions: z.array(z.string().min(2).max(25)).optional(),
  }).optional(),
  TestBotAliasSettings: z.object({
    Description: z.string().max(2000).describe("A description of the resource")
      .optional(),
    BotAliasLocaleSettings: z.array(BotAliasLocaleSettingsItemSchema)
      .optional(),
    ConversationLogSettings: ConversationLogSettingsSchema.optional(),
    SentimentAnalysisSettings: z.object({
      DetectSentiment: z.boolean().optional(),
    }).optional(),
  }).optional(),
  DataPrivacy: z.object({
    ChildDirected: z.boolean().optional(),
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

/** Swamp extension model for Lex Bot. Registered at `@swamp/aws/lex/bot`. */
export const model = {
  type: "@swamp/aws/lex/bot",
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
      toVersion: "2026.05.14.1",
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
      description: "Lex Bot resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lex Bot",
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
          "AWS::Lex::Bot",
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
      description: "Get a Lex Bot",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lex Bot",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lex::Bot",
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
      description: "Update a Lex Bot",
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
          "AWS::Lex::Bot",
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
          "AWS::Lex::Bot",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a Lex Bot",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lex Bot",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lex::Bot",
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
      description: "Sync Lex Bot state from AWS",
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
            "AWS::Lex::Bot",
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
