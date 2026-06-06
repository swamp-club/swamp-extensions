// Auto-generated extension model for @swamp/aws/apigatewayv2/authorizer
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApiGatewayV2 Authorizer (AWS::ApiGatewayV2::Authorizer).
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
  IdentityValidationExpression: z.string().describe(
    "This parameter is not used.",
  ).optional(),
  AuthorizerUri: z.string().describe(
    "The authorizer's Uniform Resource Identifier (URI). For REQUEST authorizers, this must be a well-formed Lambda function URI, for example, arn:aws:apigateway:us-west-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-2:{account_id}:function:{lambda_function_name}/invocations. In general, the URI has this form: arn:aws:apigateway:{region}:lambda:path/{service_api}, where *{region}* is the same as the region hosting the Lambda function, path indicates that the remaining substring in the URI should be treated as the path to the resource, including the initial /. For Lambda functions, this is usually of the form /2015-03-31/functions/[FunctionARN]/invocations.",
  ).optional(),
  AuthorizerCredentialsArn: z.string().describe(
    "Specifies the required credentials as an IAM role for API Gateway to invoke the authorizer. To specify an IAM role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To use resource-based permissions on the Lambda function, specify null. Supported only for REQUEST authorizers.",
  ).optional(),
  AuthorizerType: z.string().describe(
    "The authorizer type. Specify REQUEST for a Lambda function using incoming request parameters. Specify JWT to use JSON Web Tokens (supported only for HTTP APIs).",
  ),
  IdentitySource: z.array(z.string()).describe(
    "The identity source for which authorization is requested. For a REQUEST authorizer, this is optional. The value is a set of one or more mapping expressions of the specified request parameters. The identity source can be headers, query string parameters, stage variables, and context parameters. For example, if an Auth header and a Name query string parameter are defined as identity sources, this value is route.request.header.Auth, route.request.querystring.Name for WebSocket APIs. For HTTP APIs, use selection expressions prefixed with $, for example, $request.header.Auth, $request.querystring.Name. These parameters are used to perform runtime validation for Lambda-based authorizers by verifying all of the identity-related request parameters are present in the request, not null, and non-empty. Only when this is true does the authorizer invoke the authorizer Lambda function. Otherwise, it returns a 401 Unauthorized response without calling the Lambda function. For HTTP APIs, identity sources are also used as the cache key when caching is enabled. To learn more, see [Working with Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html). For JWT, a single entry that specifies where to extract the JSON Web Token (JWT) from inbound requests. Currently only header-based and query parameter-based selections are supported, for example $request.header.Authorization.",
  ).optional(),
  JwtConfiguration: z.object({
    Issuer: z.string().describe(
      "The base domain of the identity provider that issues JSON Web Tokens. For example, an Amazon Cognito user pool has the following format: https://cognito-idp.{region}.amazonaws.com/{userPoolId}. Required for the JWT authorizer type. Supported only for HTTP APIs.",
    ).optional(),
    Audience: z.array(z.string()).describe(
      "A list of the intended recipients of the JWT. A valid JWT must provide an aud that matches at least one entry in this list. See [RFC 7519](https://docs.aws.amazon.com/https://tools.ietf.org/html/rfc7519#section-4.1.3). Required for the JWT authorizer type. Supported only for HTTP APIs.",
    ).optional(),
  }).describe(
    "The JWTConfiguration property specifies the configuration of a JWT authorizer. Required for the JWT authorizer type. Supported only for HTTP APIs.",
  ).optional(),
  AuthorizerResultTtlInSeconds: z.number().int().describe(
    "The time to live (TTL) for cached authorizer results, in seconds. If it equals 0, authorization caching is disabled. If it is greater than 0, API Gateway caches authorizer responses. The maximum value is 3600, or 1 hour. Supported only for HTTP API Lambda authorizers.",
  ).optional(),
  AuthorizerPayloadFormatVersion: z.string().describe(
    "Specifies the format of the payload sent to an HTTP API Lambda authorizer. Required for HTTP API Lambda authorizers. Supported values are 1.0 and 2.0. To learn more, see [Working with Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html).",
  ).optional(),
  EnableSimpleResponses: z.boolean().describe(
    "Specifies whether a Lambda authorizer returns a response in a simple format. By default, a Lambda authorizer must return an IAM policy. If enabled, the Lambda authorizer can return a boolean value instead of an IAM policy. Supported only for HTTP APIs. To learn more, see [Working with Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html).",
  ).optional(),
  ApiId: z.string().describe("The API identifier."),
  Name: z.string().describe("The name of the authorizer."),
});

const StateSchema = z.object({
  IdentityValidationExpression: z.string().optional(),
  AuthorizerUri: z.string().optional(),
  AuthorizerCredentialsArn: z.string().optional(),
  AuthorizerType: z.string().optional(),
  IdentitySource: z.array(z.string()).optional(),
  JwtConfiguration: z.object({
    Issuer: z.string(),
    Audience: z.array(z.string()),
  }).optional(),
  AuthorizerResultTtlInSeconds: z.number().optional(),
  AuthorizerPayloadFormatVersion: z.string().optional(),
  EnableSimpleResponses: z.boolean().optional(),
  ApiId: z.string(),
  AuthorizerId: z.string(),
  Name: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  IdentityValidationExpression: z.string().describe(
    "This parameter is not used.",
  ).optional(),
  AuthorizerUri: z.string().describe(
    "The authorizer's Uniform Resource Identifier (URI). For REQUEST authorizers, this must be a well-formed Lambda function URI, for example, arn:aws:apigateway:us-west-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-2:{account_id}:function:{lambda_function_name}/invocations. In general, the URI has this form: arn:aws:apigateway:{region}:lambda:path/{service_api}, where *{region}* is the same as the region hosting the Lambda function, path indicates that the remaining substring in the URI should be treated as the path to the resource, including the initial /. For Lambda functions, this is usually of the form /2015-03-31/functions/[FunctionARN]/invocations.",
  ).optional(),
  AuthorizerCredentialsArn: z.string().describe(
    "Specifies the required credentials as an IAM role for API Gateway to invoke the authorizer. To specify an IAM role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To use resource-based permissions on the Lambda function, specify null. Supported only for REQUEST authorizers.",
  ).optional(),
  AuthorizerType: z.string().describe(
    "The authorizer type. Specify REQUEST for a Lambda function using incoming request parameters. Specify JWT to use JSON Web Tokens (supported only for HTTP APIs).",
  ).optional(),
  IdentitySource: z.array(z.string()).describe(
    "The identity source for which authorization is requested. For a REQUEST authorizer, this is optional. The value is a set of one or more mapping expressions of the specified request parameters. The identity source can be headers, query string parameters, stage variables, and context parameters. For example, if an Auth header and a Name query string parameter are defined as identity sources, this value is route.request.header.Auth, route.request.querystring.Name for WebSocket APIs. For HTTP APIs, use selection expressions prefixed with $, for example, $request.header.Auth, $request.querystring.Name. These parameters are used to perform runtime validation for Lambda-based authorizers by verifying all of the identity-related request parameters are present in the request, not null, and non-empty. Only when this is true does the authorizer invoke the authorizer Lambda function. Otherwise, it returns a 401 Unauthorized response without calling the Lambda function. For HTTP APIs, identity sources are also used as the cache key when caching is enabled. To learn more, see [Working with Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html). For JWT, a single entry that specifies where to extract the JSON Web Token (JWT) from inbound requests. Currently only header-based and query parameter-based selections are supported, for example $request.header.Authorization.",
  ).optional(),
  JwtConfiguration: z.object({
    Issuer: z.string().describe(
      "The base domain of the identity provider that issues JSON Web Tokens. For example, an Amazon Cognito user pool has the following format: https://cognito-idp.{region}.amazonaws.com/{userPoolId}. Required for the JWT authorizer type. Supported only for HTTP APIs.",
    ).optional(),
    Audience: z.array(z.string()).describe(
      "A list of the intended recipients of the JWT. A valid JWT must provide an aud that matches at least one entry in this list. See [RFC 7519](https://docs.aws.amazon.com/https://tools.ietf.org/html/rfc7519#section-4.1.3). Required for the JWT authorizer type. Supported only for HTTP APIs.",
    ).optional(),
  }).describe(
    "The JWTConfiguration property specifies the configuration of a JWT authorizer. Required for the JWT authorizer type. Supported only for HTTP APIs.",
  ).optional(),
  AuthorizerResultTtlInSeconds: z.number().int().describe(
    "The time to live (TTL) for cached authorizer results, in seconds. If it equals 0, authorization caching is disabled. If it is greater than 0, API Gateway caches authorizer responses. The maximum value is 3600, or 1 hour. Supported only for HTTP API Lambda authorizers.",
  ).optional(),
  AuthorizerPayloadFormatVersion: z.string().describe(
    "Specifies the format of the payload sent to an HTTP API Lambda authorizer. Required for HTTP API Lambda authorizers. Supported values are 1.0 and 2.0. To learn more, see [Working with Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html).",
  ).optional(),
  EnableSimpleResponses: z.boolean().describe(
    "Specifies whether a Lambda authorizer returns a response in a simple format. By default, a Lambda authorizer must return an IAM policy. If enabled, the Lambda authorizer can return a boolean value instead of an IAM policy. Supported only for HTTP APIs. To learn more, see [Working with Lambda authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html).",
  ).optional(),
  ApiId: z.string().describe("The API identifier.").optional(),
  Name: z.string().describe("The name of the authorizer.").optional(),
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

/** Swamp extension model for ApiGatewayV2 Authorizer. Registered at `@swamp/aws/apigatewayv2/authorizer`. */
export const model = {
  type: "@swamp/aws/apigatewayv2/authorizer",
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
      description: "ApiGatewayV2 Authorizer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApiGatewayV2 Authorizer",
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
          "AWS::ApiGatewayV2::Authorizer",
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
      description: "Get a ApiGatewayV2 Authorizer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGatewayV2 Authorizer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ApiGatewayV2::Authorizer",
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
      description: "Update a ApiGatewayV2 Authorizer",
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
          existing.AuthorizerId?.toString(),
          existing.ApiId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::ApiGatewayV2::Authorizer",
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
          "AWS::ApiGatewayV2::Authorizer",
          identifier,
          currentState,
          desiredState,
          ["ApiId"],
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
      description: "Delete a ApiGatewayV2 Authorizer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGatewayV2 Authorizer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ApiGatewayV2::Authorizer",
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
      description: "Sync ApiGatewayV2 Authorizer state from AWS",
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
          existing.AuthorizerId?.toString(),
          existing.ApiId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::ApiGatewayV2::Authorizer",
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
