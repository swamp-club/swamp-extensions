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

// Auto-generated extension model for @swamp/aws/apigateway/deployment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApiGateway Deployment (AWS::ApiGateway::Deployment).
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

const CanarySettingSchema = z.object({
  StageVariableOverrides: z.record(z.string(), z.string()).optional(),
  PercentTraffic: z.number().optional(),
  UseStageCache: z.boolean().optional(),
});

const MethodSettingSchema = z.object({
  CacheTtlInSeconds: z.number().int().optional(),
  LoggingLevel: z.string().optional(),
  ResourcePath: z.string().describe(
    "The resource path for this method. Forward slashes ( /) are encoded as ~1 and the initial slash must include a forward slash. For example, the path value /resource/subresource must be encoded as /~1resource~1subresource. To specify the root path, use only a slash ( /).",
  ).optional(),
  CacheDataEncrypted: z.boolean().optional(),
  DataTraceEnabled: z.boolean().optional(),
  ThrottlingBurstLimit: z.number().int().optional(),
  CachingEnabled: z.boolean().optional(),
  MetricsEnabled: z.boolean().optional(),
  HttpMethod: z.string().describe("The HTTP method.").optional(),
  ThrottlingRateLimit: z.number().optional(),
});

const AccessLogSettingSchema = z.object({
  Format: z.string().optional(),
  DestinationArn: z.string().optional(),
});

const TagSchema = z.object({
  Value: z.string().describe("The value for the specified tag key."),
  Key: z.string().describe(
    "A string you can use to assign a value. The combination of tag keys and values can help you organize and categorize your resources.",
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
  Description: z.string().optional(),
  StageDescription: z.object({
    CacheTtlInSeconds: z.number().int().describe(
      "The time-to-live (TTL) period, in seconds, that specifies how long API Gateway caches responses.",
    ).optional(),
    Description: z.string().describe(
      "A description of the purpose of the stage.",
    ).optional(),
    LoggingLevel: z.string().describe(
      "The logging level for this method. For valid values, see the loggingLevel property of the [MethodSetting](https://docs.aws.amazon.com/apigateway/latest/api/API_MethodSetting.html) resource in the *Amazon API Gateway API Reference*.",
    ).optional(),
    CanarySetting: CanarySettingSchema.describe(
      "Specifies settings for the canary deployment in this stage.",
    ).optional(),
    ThrottlingRateLimit: z.number().describe(
      "The target request steady-state rate limit. For more information, see [Manage API Request Throttling](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html) in the *API Gateway Developer Guide*.",
    ).optional(),
    ClientCertificateId: z.string().describe(
      "The identifier of the client certificate that API Gateway uses to call your integration endpoints in the stage.",
    ).optional(),
    Variables: z.record(z.string(), z.string()).describe(
      "A map that defines the stage variables. Variable names must consist of alphanumeric characters, and the values must match the following regular expression: [A-Za-z0-9-._~:/?#&=,]+.",
    ).optional(),
    DocumentationVersion: z.string().describe(
      "The version identifier of the API documentation snapshot.",
    ).optional(),
    CacheDataEncrypted: z.boolean().describe(
      "Indicates whether the cached responses are encrypted.",
    ).optional(),
    DataTraceEnabled: z.boolean().describe(
      "Indicates whether data trace logging is enabled for methods in the stage. API Gateway pushes these logs to Amazon CloudWatch Logs.",
    ).optional(),
    ThrottlingBurstLimit: z.number().int().describe(
      "The target request burst rate limit. This allows more requests through for a period of time than the target rate limit. For more information, see [Manage API Request Throttling](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html) in the *API Gateway Developer Guide*.",
    ).optional(),
    CachingEnabled: z.boolean().describe(
      "Indicates whether responses are cached and returned for requests. You must enable a cache cluster on the stage to cache responses. For more information, see [Enable API Gateway Caching in a Stage to Enhance API Performance](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html) in the *API Gateway Developer Guide*.",
    ).optional(),
    TracingEnabled: z.boolean().describe(
      "Specifies whether active tracing with X-ray is enabled for this stage. For more information, see [Trace API Gateway API Execution with X-Ray](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-xray.html) in the *API Gateway Developer Guide*.",
    ).optional(),
    MethodSettings: z.array(MethodSettingSchema).describe(
      "Configures settings for all of the stage's methods.",
    ).optional(),
    AccessLogSetting: AccessLogSettingSchema.describe(
      "Specifies settings for logging access in this stage.",
    ).optional(),
    CacheClusterSize: z.string().describe(
      "The size of the stage's cache cluster. For more information, see [cacheClusterSize](https://docs.aws.amazon.com/apigateway/latest/api/API_CreateStage.html#apigw-CreateStage-request-cacheClusterSize) in the *API Gateway API Reference*.",
    ).optional(),
    MetricsEnabled: z.boolean().describe(
      "Indicates whether Amazon CloudWatch metrics are enabled for methods in the stage.",
    ).optional(),
    Tags: z.array(TagSchema).describe(
      "An array of arbitrary tags (key-value pairs) to associate with the stage.",
    ).optional(),
    CacheClusterEnabled: z.boolean().optional(),
  }).describe(
    "The description of the Stage resource for the Deployment resource to create. To specify a stage description, you must also provide a stage name.",
  ).optional(),
  StageName: z.string().optional(),
  RestApiId: z.string(),
  DeploymentCanarySettings: z.object({
    StageVariableOverrides: z.record(z.string(), z.string()).optional(),
    PercentTraffic: z.number().optional(),
    UseStageCache: z.boolean().optional(),
  }).optional(),
});

const StateSchema = z.object({
  DeploymentId: z.string(),
  Description: z.string().optional(),
  StageDescription: z.object({
    CacheTtlInSeconds: z.number(),
    Description: z.string(),
    LoggingLevel: z.string(),
    CanarySetting: CanarySettingSchema,
    ThrottlingRateLimit: z.number(),
    ClientCertificateId: z.string(),
    Variables: z.record(z.string(), z.unknown()),
    DocumentationVersion: z.string(),
    CacheDataEncrypted: z.boolean(),
    DataTraceEnabled: z.boolean(),
    ThrottlingBurstLimit: z.number(),
    CachingEnabled: z.boolean(),
    TracingEnabled: z.boolean(),
    MethodSettings: z.array(MethodSettingSchema),
    AccessLogSetting: AccessLogSettingSchema,
    CacheClusterSize: z.string(),
    MetricsEnabled: z.boolean(),
    Tags: z.array(TagSchema),
    CacheClusterEnabled: z.boolean(),
  }).optional(),
  StageName: z.string().optional(),
  RestApiId: z.string(),
  DeploymentCanarySettings: z.object({
    StageVariableOverrides: z.record(z.string(), z.unknown()),
    PercentTraffic: z.number(),
    UseStageCache: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().optional(),
  StageDescription: z.object({
    CacheTtlInSeconds: z.number().int().describe(
      "The time-to-live (TTL) period, in seconds, that specifies how long API Gateway caches responses.",
    ).optional(),
    Description: z.string().describe(
      "A description of the purpose of the stage.",
    ).optional(),
    LoggingLevel: z.string().describe(
      "The logging level for this method. For valid values, see the loggingLevel property of the [MethodSetting](https://docs.aws.amazon.com/apigateway/latest/api/API_MethodSetting.html) resource in the *Amazon API Gateway API Reference*.",
    ).optional(),
    CanarySetting: CanarySettingSchema.describe(
      "Specifies settings for the canary deployment in this stage.",
    ).optional(),
    ThrottlingRateLimit: z.number().describe(
      "The target request steady-state rate limit. For more information, see [Manage API Request Throttling](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html) in the *API Gateway Developer Guide*.",
    ).optional(),
    ClientCertificateId: z.string().describe(
      "The identifier of the client certificate that API Gateway uses to call your integration endpoints in the stage.",
    ).optional(),
    Variables: z.record(z.string(), z.string()).describe(
      "A map that defines the stage variables. Variable names must consist of alphanumeric characters, and the values must match the following regular expression: [A-Za-z0-9-._~:/?#&=,]+.",
    ).optional(),
    DocumentationVersion: z.string().describe(
      "The version identifier of the API documentation snapshot.",
    ).optional(),
    CacheDataEncrypted: z.boolean().describe(
      "Indicates whether the cached responses are encrypted.",
    ).optional(),
    DataTraceEnabled: z.boolean().describe(
      "Indicates whether data trace logging is enabled for methods in the stage. API Gateway pushes these logs to Amazon CloudWatch Logs.",
    ).optional(),
    ThrottlingBurstLimit: z.number().int().describe(
      "The target request burst rate limit. This allows more requests through for a period of time than the target rate limit. For more information, see [Manage API Request Throttling](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html) in the *API Gateway Developer Guide*.",
    ).optional(),
    CachingEnabled: z.boolean().describe(
      "Indicates whether responses are cached and returned for requests. You must enable a cache cluster on the stage to cache responses. For more information, see [Enable API Gateway Caching in a Stage to Enhance API Performance](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-caching.html) in the *API Gateway Developer Guide*.",
    ).optional(),
    TracingEnabled: z.boolean().describe(
      "Specifies whether active tracing with X-ray is enabled for this stage. For more information, see [Trace API Gateway API Execution with X-Ray](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-xray.html) in the *API Gateway Developer Guide*.",
    ).optional(),
    MethodSettings: z.array(MethodSettingSchema).describe(
      "Configures settings for all of the stage's methods.",
    ).optional(),
    AccessLogSetting: AccessLogSettingSchema.describe(
      "Specifies settings for logging access in this stage.",
    ).optional(),
    CacheClusterSize: z.string().describe(
      "The size of the stage's cache cluster. For more information, see [cacheClusterSize](https://docs.aws.amazon.com/apigateway/latest/api/API_CreateStage.html#apigw-CreateStage-request-cacheClusterSize) in the *API Gateway API Reference*.",
    ).optional(),
    MetricsEnabled: z.boolean().describe(
      "Indicates whether Amazon CloudWatch metrics are enabled for methods in the stage.",
    ).optional(),
    Tags: z.array(TagSchema).describe(
      "An array of arbitrary tags (key-value pairs) to associate with the stage.",
    ).optional(),
    CacheClusterEnabled: z.boolean().optional(),
  }).describe(
    "The description of the Stage resource for the Deployment resource to create. To specify a stage description, you must also provide a stage name.",
  ).optional(),
  StageName: z.string().optional(),
  RestApiId: z.string().optional(),
  DeploymentCanarySettings: z.object({
    StageVariableOverrides: z.record(z.string(), z.string()).optional(),
    PercentTraffic: z.number().optional(),
    UseStageCache: z.boolean().optional(),
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

/** Swamp extension model for ApiGateway Deployment. Registered at `@swamp/aws/apigateway/deployment`. */
export const model = {
  type: "@swamp/aws/apigateway/deployment",
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
      description: "ApiGateway Deployment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApiGateway Deployment",
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
          "AWS::ApiGateway::Deployment",
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
      description: "Get a ApiGateway Deployment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway Deployment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ApiGateway::Deployment",
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
      description: "Update a ApiGateway Deployment",
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
          existing.DeploymentId?.toString(),
          existing.RestApiId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::ApiGateway::Deployment",
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
          "AWS::ApiGateway::Deployment",
          identifier,
          currentState,
          desiredState,
          ["DeploymentCanarySettings", "RestApiId"],
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
      description: "Delete a ApiGateway Deployment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway Deployment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ApiGateway::Deployment",
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
      description: "Sync ApiGateway Deployment state from AWS",
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
          existing.DeploymentId?.toString(),
          existing.RestApiId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ApiGateway::Deployment",
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
