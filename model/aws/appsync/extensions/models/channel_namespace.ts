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

// Auto-generated extension model for @swamp/aws/appsync/channel-namespace
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppSync ChannelNamespace (AWS::AppSync::ChannelNamespace).
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

const AuthModeSchema = z.object({
  AuthType: z.enum([
    "AMAZON_COGNITO_USER_POOLS",
    "AWS_IAM",
    "API_KEY",
    "OPENID_CONNECT",
    "AWS_LAMBDA",
  ]).describe("Security configuration for your AppSync API.").optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[ a-zA-Z+-=._:/]+$"),
  ).describe(
    "A string used to identify this tag. You can specify a maximum of 128 characters for a tag key.",
  ),
  Value: z.string().min(0).max(256).regex(new RegExp("^[\\s\\w+-=\\.:/@]*$"))
    .describe(
      "A string containing the value for this tag. You can specify a maximum of 256 characters for a tag value.",
    ),
});

const LambdaConfigSchema = z.object({
  InvokeType: z.enum(["REQUEST_RESPONSE", "EVENT"]).describe(
    "Invocation type for direct lambda integrations.",
  ),
});

const IntegrationSchema = z.object({
  DataSourceName: z.string().min(1).max(512).regex(
    new RegExp("([_A-Za-z][_0-9A-Za-z]{0,511})?"),
  ).describe("Data source to invoke for this integration."),
  LambdaConfig: LambdaConfigSchema.optional(),
});

const HandlerConfigSchema = z.object({
  Behavior: z.enum(["CODE", "DIRECT"]).describe(
    "Integration behavior for a handler configuration.",
  ),
  Integration: IntegrationSchema,
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
  ApiId: z.string().describe(
    "AppSync Api Id that this Channel Namespace belongs to.",
  ),
  Name: z.string().min(1).max(50).regex(
    new RegExp("([A-Za-z0-9](?:[A-Za-z0-9\\-]{0,48}[A-Za-z0-9])?)"),
  ).describe("Namespace indentifier."),
  SubscribeAuthModes: z.array(AuthModeSchema).describe(
    "List of AuthModes supported for Subscribe operations.",
  ).optional(),
  PublishAuthModes: z.array(AuthModeSchema).describe(
    "List of AuthModes supported for Publish operations.",
  ).optional(),
  CodeHandlers: z.string().min(1).max(32768).describe(
    "String of APPSYNC_JS code to be used by the handlers.",
  ).optional(),
  CodeS3Location: z.string().describe(
    "The Amazon S3 endpoint where the code is located.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this AppSync API.",
  ).optional(),
  HandlerConfigs: z.object({
    OnPublish: HandlerConfigSchema.optional(),
    OnSubscribe: HandlerConfigSchema.optional(),
  }).optional(),
});

const StateSchema = z.object({
  ApiId: z.string().optional(),
  Name: z.string().optional(),
  SubscribeAuthModes: z.array(AuthModeSchema).optional(),
  PublishAuthModes: z.array(AuthModeSchema).optional(),
  CodeHandlers: z.string().optional(),
  CodeS3Location: z.string().optional(),
  ChannelNamespaceArn: z.string(),
  Tags: z.array(TagSchema).optional(),
  HandlerConfigs: z.object({
    OnPublish: HandlerConfigSchema,
    OnSubscribe: HandlerConfigSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ApiId: z.string().describe(
    "AppSync Api Id that this Channel Namespace belongs to.",
  ).optional(),
  Name: z.string().min(1).max(50).regex(
    new RegExp("([A-Za-z0-9](?:[A-Za-z0-9\\-]{0,48}[A-Za-z0-9])?)"),
  ).describe("Namespace indentifier.").optional(),
  SubscribeAuthModes: z.array(AuthModeSchema).describe(
    "List of AuthModes supported for Subscribe operations.",
  ).optional(),
  PublishAuthModes: z.array(AuthModeSchema).describe(
    "List of AuthModes supported for Publish operations.",
  ).optional(),
  CodeHandlers: z.string().min(1).max(32768).describe(
    "String of APPSYNC_JS code to be used by the handlers.",
  ).optional(),
  CodeS3Location: z.string().describe(
    "The Amazon S3 endpoint where the code is located.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this AppSync API.",
  ).optional(),
  HandlerConfigs: z.object({
    OnPublish: HandlerConfigSchema.optional(),
    OnSubscribe: HandlerConfigSchema.optional(),
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

/** Swamp extension model for AppSync ChannelNamespace. Registered at `@swamp/aws/appsync/channel-namespace`. */
export const model = {
  type: "@swamp/aws/appsync/channel-namespace",
  version: "2026.06.15.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AppSync ChannelNamespace resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppSync ChannelNamespace",
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
          "AWS::AppSync::ChannelNamespace",
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
      description: "Get a AppSync ChannelNamespace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync ChannelNamespace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppSync::ChannelNamespace",
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
      description: "Update a AppSync ChannelNamespace",
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
        const identifier = existing.ChannelNamespaceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppSync::ChannelNamespace",
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
          "AWS::AppSync::ChannelNamespace",
          identifier,
          currentState,
          desiredState,
          ["ApiId", "Name"],
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
      description: "Delete a AppSync ChannelNamespace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync ChannelNamespace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppSync::ChannelNamespace",
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
      description: "Sync AppSync ChannelNamespace state from AWS",
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
        const identifier = existing.ChannelNamespaceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppSync::ChannelNamespace",
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
