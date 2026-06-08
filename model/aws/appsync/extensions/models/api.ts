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

// Auto-generated extension model for @swamp/aws/appsync/api
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppSync Api (AWS::AppSync::Api).
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

const OpenIDConnectConfigSchema = z.object({
  ClientId: z.string().optional(),
  AuthTTL: z.number().optional(),
  Issuer: z.string(),
  IatTTL: z.number().optional(),
});

const CognitoConfigSchema = z.object({
  AppIdClientRegex: z.string().optional(),
  UserPoolId: z.string(),
  AwsRegion: z.string(),
});

const LambdaAuthorizerConfigSchema = z.object({
  AuthorizerResultTtlInSeconds: z.number().int().min(0).max(3600).optional(),
  AuthorizerUri: z.string(),
  IdentityValidationExpression: z.string().optional(),
});

const AuthProviderSchema = z.object({
  AuthType: z.enum([
    "AMAZON_COGNITO_USER_POOLS",
    "AWS_IAM",
    "API_KEY",
    "OPENID_CONNECT",
    "AWS_LAMBDA",
  ]).describe("Security configuration for your AppSync API."),
  OpenIDConnectConfig: OpenIDConnectConfigSchema.describe(
    "The OpenID Connect configuration.",
  ).optional(),
  CognitoConfig: CognitoConfigSchema.describe(
    "Optional authorization configuration for using Amazon Cognito user pools with your API endpoint.",
  ).optional(),
  LambdaAuthorizerConfig: LambdaAuthorizerConfigSchema.describe(
    "A LambdaAuthorizerConfig holds configuration on how to authorize AWS AppSync API access when using the AWS_LAMBDA authorizer mode. Be aware that an AWS AppSync API may have only one Lambda authorizer configured at a time.",
  ).optional(),
});

const AuthModeSchema = z.object({
  AuthType: z.enum([
    "AMAZON_COGNITO_USER_POOLS",
    "AWS_IAM",
    "API_KEY",
    "OPENID_CONNECT",
    "AWS_LAMBDA",
  ]).describe("Security configuration for your AppSync API.").optional(),
});

const EventLogConfigSchema = z.object({
  LogLevel: z.enum(["NONE", "ERROR", "ALL", "INFO", "DEBUG"]).describe(
    "Logging level for the AppSync API.",
  ),
  CloudWatchLogsRoleArn: z.string(),
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
  Name: z.string().min(1).max(50).regex(new RegExp("[A-Za-z0-9_\\-\\ ]+"))
    .describe("The name of the AppSync API."),
  OwnerContact: z.string().min(1).max(250).regex(
    new RegExp("[A-Za-z0-9_\\-\\ \\.]+"),
  ).describe("The owner contact information for an API resource.").optional(),
  EventConfig: z.object({
    AuthProviders: z.array(AuthProviderSchema).describe(
      "A list of auth providers for the AppSync API.",
    ),
    ConnectionAuthModes: z.array(AuthModeSchema).describe(
      "A list of auth modes for the AppSync API.",
    ),
    DefaultPublishAuthModes: z.array(AuthModeSchema).describe(
      "A list of auth modes for the AppSync API.",
    ),
    DefaultSubscribeAuthModes: z.array(AuthModeSchema).describe(
      "A list of auth modes for the AppSync API.",
    ),
    LogConfig: EventLogConfigSchema.describe(
      "The log config for the AppSync API.",
    ).optional(),
  }).describe("The configuration for an Event Api").optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this AppSync API.",
  ).optional(),
});

const StateSchema = z.object({
  ApiId: z.string().optional(),
  ApiArn: z.string(),
  Name: z.string().optional(),
  OwnerContact: z.string().optional(),
  Dns: z.object({
    Realtime: z.string(),
    Http: z.string(),
  }).optional(),
  EventConfig: z.object({
    AuthProviders: z.array(AuthProviderSchema),
    ConnectionAuthModes: z.array(AuthModeSchema),
    DefaultPublishAuthModes: z.array(AuthModeSchema),
    DefaultSubscribeAuthModes: z.array(AuthModeSchema),
    LogConfig: EventLogConfigSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(50).regex(new RegExp("[A-Za-z0-9_\\-\\ ]+"))
    .describe("The name of the AppSync API.").optional(),
  OwnerContact: z.string().min(1).max(250).regex(
    new RegExp("[A-Za-z0-9_\\-\\ \\.]+"),
  ).describe("The owner contact information for an API resource.").optional(),
  EventConfig: z.object({
    AuthProviders: z.array(AuthProviderSchema).describe(
      "A list of auth providers for the AppSync API.",
    ).optional(),
    ConnectionAuthModes: z.array(AuthModeSchema).describe(
      "A list of auth modes for the AppSync API.",
    ).optional(),
    DefaultPublishAuthModes: z.array(AuthModeSchema).describe(
      "A list of auth modes for the AppSync API.",
    ).optional(),
    DefaultSubscribeAuthModes: z.array(AuthModeSchema).describe(
      "A list of auth modes for the AppSync API.",
    ).optional(),
    LogConfig: EventLogConfigSchema.describe(
      "The log config for the AppSync API.",
    ).optional(),
  }).describe("The configuration for an Event Api").optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this AppSync API.",
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

/** Swamp extension model for AppSync Api. Registered at `@swamp/aws/appsync/api`. */
export const model = {
  type: "@swamp/aws/appsync/api",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AppSync Api resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppSync Api",
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
          "AWS::AppSync::Api",
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
      description: "Get a AppSync Api",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync Api",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppSync::Api",
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
      description: "Update a AppSync Api",
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
        const identifier = existing.ApiArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppSync::Api",
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
          "AWS::AppSync::Api",
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
      description: "Delete a AppSync Api",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync Api",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppSync::Api",
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
      description: "Sync AppSync Api state from AWS",
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
        const identifier = existing.ApiArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppSync::Api",
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
