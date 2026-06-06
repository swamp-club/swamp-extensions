// Auto-generated extension model for @swamp/aws/chatbot/microsoft-teams-channel-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Chatbot MicrosoftTeamsChannelConfiguration (AWS::Chatbot::MicrosoftTeamsChannelConfiguration).
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
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
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
  TeamId: z.string().min(36).max(36).regex(
    new RegExp("^[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$"),
  ).describe("The id of the Microsoft Teams team"),
  TeamsChannelId: z.string().min(1).max(256).regex(
    new RegExp(
      "^([a-zA-Z0-9-_=+/.,])*%3[aA]([a-zA-Z0-9-_=+/.,])*%40([a-zA-Z0-9-_=+/.,])*$",
    ),
  ).describe("The id of the Microsoft Teams channel"),
  TeamsChannelName: z.string().min(1).max(256).regex(new RegExp("^(.*)$"))
    .describe("The name of the Microsoft Teams channel").optional(),
  TeamsTenantId: z.string().min(36).max(36).regex(
    new RegExp("^[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$"),
  ).describe("The id of the Microsoft Teams tenant"),
  ConfigurationName: z.string().min(1).max(128).regex(
    new RegExp("^[A-Za-z0-9-_]+$"),
  ).describe("The name of the configuration"),
  IamRoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:[A-Za-z0-9][A-Za-z0-9_/.-]{0,62}:[A-Za-z0-9_/.-]{0,63}:[A-Za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.-]{0,1023}$",
    ),
  ).describe(
    "The ARN of the IAM role that defines the permissions for AWS Chatbot",
  ),
  SnsTopicArns: z.array(
    z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*)?:[A-Za-z0-9][A-Za-z0-9_/.-]{0,62}:[A-Za-z0-9_/.-]{0,63}:[A-Za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.-]{0,1023}$",
      ),
    ),
  ).describe(
    "ARNs of SNS topics which delivers notifications to AWS Chatbot, for example CloudWatch alarm notifications.",
  ).optional(),
  LoggingLevel: z.string().regex(new RegExp("^(ERROR|INFO|NONE)$")).describe(
    "Specifies the logging level for this configuration:ERROR,INFO or NONE. This property affects the log entries pushed to Amazon CloudWatch logs",
  ).optional(),
  GuardrailPolicies: z.array(
    z.string().regex(
      new RegExp(
        "^(^$|arn:aws:iam:[A-Za-z0-9_\\/.-]{0,63}:[A-Za-z0-9_\\/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_\\/+=,@.-]{0,1023})$",
      ),
    ),
  ).describe(
    "The list of IAM policy ARNs that are applied as channel guardrails. The AWS managed 'AdministratorAccess' policy is applied as a default if this is not set.",
  ).optional(),
  UserRoleRequired: z.boolean().describe(
    "Enables use of a user role requirement in your chat configuration",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags to add to the configuration")
    .optional(),
  CustomizationResourceArns: z.array(
    z.string().regex(
      new RegExp(
        "^arn:aws:chatbot:[A-Za-z0-9_/.-]{0,63}:[A-Za-z0-9_/.-]{0,63}:custom-action/[a-zA-Z0-9_-]{1,64}$",
      ),
    ),
  ).describe(
    "ARNs of Custom Actions to associate with notifications in the provided chat channel.",
  ).optional(),
});

const StateSchema = z.object({
  TeamId: z.string().optional(),
  TeamsChannelId: z.string().optional(),
  TeamsChannelName: z.string().optional(),
  TeamsTenantId: z.string().optional(),
  ConfigurationName: z.string().optional(),
  IamRoleArn: z.string().optional(),
  SnsTopicArns: z.array(z.string()).optional(),
  LoggingLevel: z.string().optional(),
  Arn: z.string(),
  GuardrailPolicies: z.array(z.string()).optional(),
  UserRoleRequired: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  CustomizationResourceArns: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  TeamId: z.string().min(36).max(36).regex(
    new RegExp("^[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$"),
  ).describe("The id of the Microsoft Teams team").optional(),
  TeamsChannelId: z.string().min(1).max(256).regex(
    new RegExp(
      "^([a-zA-Z0-9-_=+/.,])*%3[aA]([a-zA-Z0-9-_=+/.,])*%40([a-zA-Z0-9-_=+/.,])*$",
    ),
  ).describe("The id of the Microsoft Teams channel").optional(),
  TeamsChannelName: z.string().min(1).max(256).regex(new RegExp("^(.*)$"))
    .describe("The name of the Microsoft Teams channel").optional(),
  TeamsTenantId: z.string().min(36).max(36).regex(
    new RegExp("^[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$"),
  ).describe("The id of the Microsoft Teams tenant").optional(),
  ConfigurationName: z.string().min(1).max(128).regex(
    new RegExp("^[A-Za-z0-9-_]+$"),
  ).describe("The name of the configuration").optional(),
  IamRoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:[A-Za-z0-9][A-Za-z0-9_/.-]{0,62}:[A-Za-z0-9_/.-]{0,63}:[A-Za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.-]{0,1023}$",
    ),
  ).describe(
    "The ARN of the IAM role that defines the permissions for AWS Chatbot",
  ).optional(),
  SnsTopicArns: z.array(
    z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*)?:[A-Za-z0-9][A-Za-z0-9_/.-]{0,62}:[A-Za-z0-9_/.-]{0,63}:[A-Za-z0-9_/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_/+=,@.-]{0,1023}$",
      ),
    ),
  ).describe(
    "ARNs of SNS topics which delivers notifications to AWS Chatbot, for example CloudWatch alarm notifications.",
  ).optional(),
  LoggingLevel: z.string().regex(new RegExp("^(ERROR|INFO|NONE)$")).describe(
    "Specifies the logging level for this configuration:ERROR,INFO or NONE. This property affects the log entries pushed to Amazon CloudWatch logs",
  ).optional(),
  GuardrailPolicies: z.array(
    z.string().regex(
      new RegExp(
        "^(^$|arn:aws:iam:[A-Za-z0-9_\\/.-]{0,63}:[A-Za-z0-9_\\/.-]{0,63}:[A-Za-z0-9][A-Za-z0-9:_\\/+=,@.-]{0,1023})$",
      ),
    ),
  ).describe(
    "The list of IAM policy ARNs that are applied as channel guardrails. The AWS managed 'AdministratorAccess' policy is applied as a default if this is not set.",
  ).optional(),
  UserRoleRequired: z.boolean().describe(
    "Enables use of a user role requirement in your chat configuration",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags to add to the configuration")
    .optional(),
  CustomizationResourceArns: z.array(
    z.string().regex(
      new RegExp(
        "^arn:aws:chatbot:[A-Za-z0-9_/.-]{0,63}:[A-Za-z0-9_/.-]{0,63}:custom-action/[a-zA-Z0-9_-]{1,64}$",
      ),
    ),
  ).describe(
    "ARNs of Custom Actions to associate with notifications in the provided chat channel.",
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

/** Swamp extension model for Chatbot MicrosoftTeamsChannelConfiguration. Registered at `@swamp/aws/chatbot/microsoft-teams-channel-configuration`. */
export const model = {
  type: "@swamp/aws/chatbot/microsoft-teams-channel-configuration",
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
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Chatbot MicrosoftTeamsChannelConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Chatbot MicrosoftTeamsChannelConfiguration",
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
          "AWS::Chatbot::MicrosoftTeamsChannelConfiguration",
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
      description: "Get a Chatbot MicrosoftTeamsChannelConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Chatbot MicrosoftTeamsChannelConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Chatbot::MicrosoftTeamsChannelConfiguration",
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
      description: "Update a Chatbot MicrosoftTeamsChannelConfiguration",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Chatbot::MicrosoftTeamsChannelConfiguration",
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
          "AWS::Chatbot::MicrosoftTeamsChannelConfiguration",
          identifier,
          currentState,
          desiredState,
          ["TeamId", "TeamsTenantId", "ConfigurationName"],
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
      description: "Delete a Chatbot MicrosoftTeamsChannelConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Chatbot MicrosoftTeamsChannelConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Chatbot::MicrosoftTeamsChannelConfiguration",
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
      description:
        "Sync Chatbot MicrosoftTeamsChannelConfiguration state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Chatbot::MicrosoftTeamsChannelConfiguration",
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
