// Auto-generated extension model for @swamp/aws/apigateway/method
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApiGateway Method (AWS::ApiGateway::Method).
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

const IntegrationResponseSchema = z.object({
  ResponseTemplates: z.record(z.string(), z.string()).optional(),
  SelectionPattern: z.string().optional(),
  ContentHandling: z.enum(["CONVERT_TO_BINARY", "CONVERT_TO_TEXT"]).optional(),
  ResponseParameters: z.record(z.string(), z.string()).optional(),
  StatusCode: z.string(),
});

const MethodResponseSchema = z.object({
  ResponseParameters: z.record(z.string(), z.boolean()).optional(),
  StatusCode: z.string(),
  ResponseModels: z.record(z.string(), z.string()).optional(),
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
  Integration: z.object({
    CacheNamespace: z.string().optional(),
    ConnectionType: z.enum(["INTERNET", "VPC_LINK"]).optional(),
    IntegrationResponses: z.array(IntegrationResponseSchema).optional(),
    IntegrationHttpMethod: z.string().optional(),
    ResponseTransferMode: z.enum(["BUFFERED", "STREAM"]).optional(),
    Uri: z.string().optional(),
    PassthroughBehavior: z.enum(["WHEN_NO_MATCH", "WHEN_NO_TEMPLATES", "NEVER"])
      .optional(),
    RequestParameters: z.record(z.string(), z.string()).optional(),
    ConnectionId: z.string().optional(),
    Type: z.enum(["AWS", "AWS_PROXY", "HTTP", "HTTP_PROXY", "MOCK"]),
    CacheKeyParameters: z.array(z.string()).optional(),
    IntegrationTarget: z.string().optional(),
    ContentHandling: z.enum(["CONVERT_TO_BINARY", "CONVERT_TO_TEXT"])
      .optional(),
    RequestTemplates: z.record(z.string(), z.string()).optional(),
    TimeoutInMillis: z.number().int().min(50).optional(),
    Credentials: z.string().optional(),
  }).optional(),
  OperationName: z.string().optional(),
  RequestModels: z.record(z.string(), z.string()).optional(),
  RestApiId: z.string(),
  AuthorizationScopes: z.array(z.string()).optional(),
  RequestValidatorId: z.string().optional(),
  RequestParameters: z.record(z.string(), z.boolean()).optional(),
  MethodResponses: z.array(MethodResponseSchema).optional(),
  AuthorizerId: z.string().optional(),
  ResourceId: z.string(),
  ApiKeyRequired: z.boolean().optional(),
  AuthorizationType: z.string().describe(
    "The method's authorization type. This parameter is required. For valid values, see [Method](https://docs.aws.amazon.com/apigateway/latest/api/API_Method.html) in the *API Gateway API Reference*. If you specify the AuthorizerId property, specify CUSTOM or COGNITO_USER_POOLS for this property.",
  ).optional(),
  HttpMethod: z.string(),
});

const StateSchema = z.object({
  Integration: z.object({
    CacheNamespace: z.string(),
    ConnectionType: z.string(),
    IntegrationResponses: z.array(IntegrationResponseSchema),
    IntegrationHttpMethod: z.string(),
    ResponseTransferMode: z.string(),
    Uri: z.string(),
    PassthroughBehavior: z.string(),
    RequestParameters: z.record(z.string(), z.unknown()),
    ConnectionId: z.string(),
    Type: z.string(),
    CacheKeyParameters: z.array(z.string()),
    IntegrationTarget: z.string(),
    ContentHandling: z.string(),
    RequestTemplates: z.record(z.string(), z.unknown()),
    TimeoutInMillis: z.number(),
    Credentials: z.string(),
  }).optional(),
  OperationName: z.string().optional(),
  RequestModels: z.record(z.string(), z.unknown()).optional(),
  RestApiId: z.string(),
  AuthorizationScopes: z.array(z.string()).optional(),
  RequestValidatorId: z.string().optional(),
  RequestParameters: z.record(z.string(), z.unknown()).optional(),
  MethodResponses: z.array(MethodResponseSchema).optional(),
  AuthorizerId: z.string().optional(),
  ResourceId: z.string(),
  ApiKeyRequired: z.boolean().optional(),
  AuthorizationType: z.string().optional(),
  HttpMethod: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Integration: z.object({
    CacheNamespace: z.string().optional(),
    ConnectionType: z.enum(["INTERNET", "VPC_LINK"]).optional(),
    IntegrationResponses: z.array(IntegrationResponseSchema).optional(),
    IntegrationHttpMethod: z.string().optional(),
    ResponseTransferMode: z.enum(["BUFFERED", "STREAM"]).optional(),
    Uri: z.string().optional(),
    PassthroughBehavior: z.enum(["WHEN_NO_MATCH", "WHEN_NO_TEMPLATES", "NEVER"])
      .optional(),
    RequestParameters: z.record(z.string(), z.string()).optional(),
    ConnectionId: z.string().optional(),
    Type: z.enum(["AWS", "AWS_PROXY", "HTTP", "HTTP_PROXY", "MOCK"]).optional(),
    CacheKeyParameters: z.array(z.string()).optional(),
    IntegrationTarget: z.string().optional(),
    ContentHandling: z.enum(["CONVERT_TO_BINARY", "CONVERT_TO_TEXT"])
      .optional(),
    RequestTemplates: z.record(z.string(), z.string()).optional(),
    TimeoutInMillis: z.number().int().min(50).optional(),
    Credentials: z.string().optional(),
  }).optional(),
  OperationName: z.string().optional(),
  RequestModels: z.record(z.string(), z.string()).optional(),
  RestApiId: z.string().optional(),
  AuthorizationScopes: z.array(z.string()).optional(),
  RequestValidatorId: z.string().optional(),
  RequestParameters: z.record(z.string(), z.boolean()).optional(),
  MethodResponses: z.array(MethodResponseSchema).optional(),
  AuthorizerId: z.string().optional(),
  ResourceId: z.string().optional(),
  ApiKeyRequired: z.boolean().optional(),
  AuthorizationType: z.string().describe(
    "The method's authorization type. This parameter is required. For valid values, see [Method](https://docs.aws.amazon.com/apigateway/latest/api/API_Method.html) in the *API Gateway API Reference*. If you specify the AuthorizerId property, specify CUSTOM or COGNITO_USER_POOLS for this property.",
  ).optional(),
  HttpMethod: z.string().optional(),
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

/** Swamp extension model for ApiGateway Method. Registered at `@swamp/aws/apigateway/method`. */
export const model = {
  type: "@swamp/aws/apigateway/method",
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
      description: "ApiGateway Method resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApiGateway Method",
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
          "AWS::ApiGateway::Method",
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
      description: "Get a ApiGateway Method",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway Method",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ApiGateway::Method",
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
      description: "Update a ApiGateway Method",
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
          existing.RestApiId?.toString(),
          existing.ResourceId?.toString(),
          existing.HttpMethod?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::ApiGateway::Method",
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
          "AWS::ApiGateway::Method",
          identifier,
          currentState,
          desiredState,
          ["RestApiId", "ResourceId", "HttpMethod"],
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
      description: "Delete a ApiGateway Method",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway Method",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ApiGateway::Method",
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
      description: "Sync ApiGateway Method state from AWS",
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
          existing.RestApiId?.toString(),
          existing.ResourceId?.toString(),
          existing.HttpMethod?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ApiGateway::Method",
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
