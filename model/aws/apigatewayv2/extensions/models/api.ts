// Auto-generated extension model for @swamp/aws/apigatewayv2/api
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApiGatewayV2 Api (AWS::ApiGatewayV2::Api).
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
  RouteSelectionExpression: z.string().describe(
    "The route selection expression for the API. For HTTP APIs, the routeSelectionExpression must be ${request.method} ${request.path}. If not provided, this will be the default for HTTP APIs. This property is required for WebSocket APIs.",
  ).optional(),
  Body: z.record(z.string(), z.unknown()).describe(
    "The OpenAPI definition. Supported only for HTTP APIs. To import an HTTP API, you must specify a Body or BodyS3Location. If you specify a Body or BodyS3Location, don't specify CloudFormation resources such as AWS::ApiGatewayV2::Authorizer or AWS::ApiGatewayV2::Route. API Gateway doesn't support the combination of OpenAPI and CloudFormation resources.",
  ).optional(),
  BodyS3Location: z.object({
    Etag: z.string().describe("The Etag of the S3 object.").optional(),
    Bucket: z.string().describe(
      "The S3 bucket that contains the OpenAPI definition to import. Required if you specify a BodyS3Location for an API.",
    ).optional(),
    Version: z.string().describe("The version of the S3 object.").optional(),
    Key: z.string().describe(
      "The key of the S3 object. Required if you specify a BodyS3Location for an API.",
    ).optional(),
  }).describe(
    "The S3 location of an OpenAPI definition. Supported only for HTTP APIs. To import an HTTP API, you must specify a Body or BodyS3Location. If you specify a Body or BodyS3Location, don't specify CloudFormation resources such as AWS::ApiGatewayV2::Authorizer or AWS::ApiGatewayV2::Route. API Gateway doesn't support the combination of OpenAPI and CloudFormation resources.",
  ).optional(),
  BasePath: z.string().describe(
    "Specifies how to interpret the base path of the API during import. Valid values are ignore, prepend, and split. The default value is ignore. To learn more, see [Set the OpenAPI basePath Property](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api-basePath.html). Supported only for HTTP APIs.",
  ).optional(),
  CredentialsArn: z.string().describe(
    "This property is part of quick create. It specifies the credentials required for the integration, if any. For a Lambda integration, three options are available. To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To require that the caller's identity be passed through from the request, specify arn:aws:iam::*:user/*. To use resource-based permissions on supported AWS services, specify null. Currently, this property is not used for HTTP integrations. Supported only for HTTP APIs.",
  ).optional(),
  CorsConfiguration: z.object({
    AllowOrigins: z.array(z.string()).describe(
      "Represents a collection of allowed origins. Supported only for HTTP APIs.",
    ).optional(),
    AllowCredentials: z.boolean().describe(
      "Specifies whether credentials are included in the CORS request. Supported only for HTTP APIs.",
    ).optional(),
    ExposeHeaders: z.array(z.string()).describe(
      "Represents a collection of exposed headers. Supported only for HTTP APIs.",
    ).optional(),
    AllowHeaders: z.array(z.string()).describe(
      "Represents a collection of allowed headers. Supported only for HTTP APIs.",
    ).optional(),
    MaxAge: z.number().int().describe(
      "The number of seconds that the browser should cache preflight request results. Supported only for HTTP APIs.",
    ).optional(),
    AllowMethods: z.array(z.string()).describe(
      "Represents a collection of allowed HTTP methods. Supported only for HTTP APIs.",
    ).optional(),
  }).describe(
    "A CORS configuration. Supported only for HTTP APIs. See [Configuring CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) for more information.",
  ).optional(),
  RouteKey: z.string().describe(
    "This property is part of quick create. If you don't specify a routeKey, a default route of $default is created. The $default route acts as a catch-all for any request made to your API, for a particular stage. The $default route key can't be modified. You can add routes after creating the API, and you can update the route keys of additional routes. Supported only for HTTP APIs.",
  ).optional(),
  Target: z.string().describe(
    "This property is part of quick create. Quick create produces an API with an integration, a default catch-all route, and a default stage which is configured to automatically deploy changes. For HTTP integrations, specify a fully qualified URL. For Lambda integrations, specify a function ARN. The type of the integration will be HTTP_PROXY or AWS_PROXY, respectively. Supported only for HTTP APIs.",
  ).optional(),
  FailOnWarnings: z.boolean().describe(
    "Specifies whether to rollback the API creation when a warning is encountered. By default, API creation continues if a warning is encountered.",
  ).optional(),
  Description: z.string().describe("The description of the API.").optional(),
  DisableExecuteApiEndpoint: z.boolean().describe(
    "Specifies whether clients can invoke your API by using the default execute-api endpoint. By default, clients can invoke your API with the default https://{api_id}.execute-api.{region}.amazonaws.com endpoint. To require that clients use a custom domain name to invoke your API, disable the default endpoint.",
  ).optional(),
  DisableSchemaValidation: z.boolean().describe(
    "Avoid validating models when creating a deployment. Supported only for WebSocket APIs.",
  ).optional(),
  Name: z.string().describe(
    "The name of the API. Required unless you specify an OpenAPI definition for Body or S3BodyLocation.",
  ).optional(),
  Version: z.string().describe("A version identifier for the API.").optional(),
  ProtocolType: z.string().describe(
    "The API protocol. Valid values are WEBSOCKET or HTTP. Required unless you specify an OpenAPI definition for Body or S3BodyLocation.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The collection of tags. Each tag element is associated with a given resource.",
  ).optional(),
  ApiKeySelectionExpression: z.string().describe(
    "An API key selection expression. Supported only for WebSocket APIs. See [API Key Selection Expressions](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-selection-expressions.html#apigateway-websocket-api-apikey-selection-expressions).",
  ).optional(),
  IpAddressType: z.string().optional(),
});

const StateSchema = z.object({
  RouteSelectionExpression: z.string().optional(),
  Body: z.record(z.string(), z.unknown()).optional(),
  BodyS3Location: z.object({
    Etag: z.string(),
    Bucket: z.string(),
    Version: z.string(),
    Key: z.string(),
  }).optional(),
  BasePath: z.string().optional(),
  CredentialsArn: z.string().optional(),
  CorsConfiguration: z.object({
    AllowOrigins: z.array(z.string()),
    AllowCredentials: z.boolean(),
    ExposeHeaders: z.array(z.string()),
    AllowHeaders: z.array(z.string()),
    MaxAge: z.number(),
    AllowMethods: z.array(z.string()),
  }).optional(),
  RouteKey: z.string().optional(),
  Target: z.string().optional(),
  FailOnWarnings: z.boolean().optional(),
  ApiEndpoint: z.string().optional(),
  Description: z.string().optional(),
  DisableExecuteApiEndpoint: z.boolean().optional(),
  DisableSchemaValidation: z.boolean().optional(),
  Name: z.string().optional(),
  Version: z.string().optional(),
  ProtocolType: z.string().optional(),
  ApiId: z.string(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  ApiKeySelectionExpression: z.string().optional(),
  IpAddressType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  RouteSelectionExpression: z.string().describe(
    "The route selection expression for the API. For HTTP APIs, the routeSelectionExpression must be ${request.method} ${request.path}. If not provided, this will be the default for HTTP APIs. This property is required for WebSocket APIs.",
  ).optional(),
  Body: z.record(z.string(), z.unknown()).describe(
    "The OpenAPI definition. Supported only for HTTP APIs. To import an HTTP API, you must specify a Body or BodyS3Location. If you specify a Body or BodyS3Location, don't specify CloudFormation resources such as AWS::ApiGatewayV2::Authorizer or AWS::ApiGatewayV2::Route. API Gateway doesn't support the combination of OpenAPI and CloudFormation resources.",
  ).optional(),
  BodyS3Location: z.object({
    Etag: z.string().describe("The Etag of the S3 object.").optional(),
    Bucket: z.string().describe(
      "The S3 bucket that contains the OpenAPI definition to import. Required if you specify a BodyS3Location for an API.",
    ).optional(),
    Version: z.string().describe("The version of the S3 object.").optional(),
    Key: z.string().describe(
      "The key of the S3 object. Required if you specify a BodyS3Location for an API.",
    ).optional(),
  }).describe(
    "The S3 location of an OpenAPI definition. Supported only for HTTP APIs. To import an HTTP API, you must specify a Body or BodyS3Location. If you specify a Body or BodyS3Location, don't specify CloudFormation resources such as AWS::ApiGatewayV2::Authorizer or AWS::ApiGatewayV2::Route. API Gateway doesn't support the combination of OpenAPI and CloudFormation resources.",
  ).optional(),
  BasePath: z.string().describe(
    "Specifies how to interpret the base path of the API during import. Valid values are ignore, prepend, and split. The default value is ignore. To learn more, see [Set the OpenAPI basePath Property](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-import-api-basePath.html). Supported only for HTTP APIs.",
  ).optional(),
  CredentialsArn: z.string().describe(
    "This property is part of quick create. It specifies the credentials required for the integration, if any. For a Lambda integration, three options are available. To specify an IAM Role for API Gateway to assume, use the role's Amazon Resource Name (ARN). To require that the caller's identity be passed through from the request, specify arn:aws:iam::*:user/*. To use resource-based permissions on supported AWS services, specify null. Currently, this property is not used for HTTP integrations. Supported only for HTTP APIs.",
  ).optional(),
  CorsConfiguration: z.object({
    AllowOrigins: z.array(z.string()).describe(
      "Represents a collection of allowed origins. Supported only for HTTP APIs.",
    ).optional(),
    AllowCredentials: z.boolean().describe(
      "Specifies whether credentials are included in the CORS request. Supported only for HTTP APIs.",
    ).optional(),
    ExposeHeaders: z.array(z.string()).describe(
      "Represents a collection of exposed headers. Supported only for HTTP APIs.",
    ).optional(),
    AllowHeaders: z.array(z.string()).describe(
      "Represents a collection of allowed headers. Supported only for HTTP APIs.",
    ).optional(),
    MaxAge: z.number().int().describe(
      "The number of seconds that the browser should cache preflight request results. Supported only for HTTP APIs.",
    ).optional(),
    AllowMethods: z.array(z.string()).describe(
      "Represents a collection of allowed HTTP methods. Supported only for HTTP APIs.",
    ).optional(),
  }).describe(
    "A CORS configuration. Supported only for HTTP APIs. See [Configuring CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) for more information.",
  ).optional(),
  RouteKey: z.string().describe(
    "This property is part of quick create. If you don't specify a routeKey, a default route of $default is created. The $default route acts as a catch-all for any request made to your API, for a particular stage. The $default route key can't be modified. You can add routes after creating the API, and you can update the route keys of additional routes. Supported only for HTTP APIs.",
  ).optional(),
  Target: z.string().describe(
    "This property is part of quick create. Quick create produces an API with an integration, a default catch-all route, and a default stage which is configured to automatically deploy changes. For HTTP integrations, specify a fully qualified URL. For Lambda integrations, specify a function ARN. The type of the integration will be HTTP_PROXY or AWS_PROXY, respectively. Supported only for HTTP APIs.",
  ).optional(),
  FailOnWarnings: z.boolean().describe(
    "Specifies whether to rollback the API creation when a warning is encountered. By default, API creation continues if a warning is encountered.",
  ).optional(),
  Description: z.string().describe("The description of the API.").optional(),
  DisableExecuteApiEndpoint: z.boolean().describe(
    "Specifies whether clients can invoke your API by using the default execute-api endpoint. By default, clients can invoke your API with the default https://{api_id}.execute-api.{region}.amazonaws.com endpoint. To require that clients use a custom domain name to invoke your API, disable the default endpoint.",
  ).optional(),
  DisableSchemaValidation: z.boolean().describe(
    "Avoid validating models when creating a deployment. Supported only for WebSocket APIs.",
  ).optional(),
  Name: z.string().describe(
    "The name of the API. Required unless you specify an OpenAPI definition for Body or S3BodyLocation.",
  ).optional(),
  Version: z.string().describe("A version identifier for the API.").optional(),
  ProtocolType: z.string().describe(
    "The API protocol. Valid values are WEBSOCKET or HTTP. Required unless you specify an OpenAPI definition for Body or S3BodyLocation.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The collection of tags. Each tag element is associated with a given resource.",
  ).optional(),
  ApiKeySelectionExpression: z.string().describe(
    "An API key selection expression. Supported only for WebSocket APIs. See [API Key Selection Expressions](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api-selection-expressions.html#apigateway-websocket-api-apikey-selection-expressions).",
  ).optional(),
  IpAddressType: z.string().optional(),
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

/** Swamp extension model for ApiGatewayV2 Api. Registered at `@swamp/aws/apigatewayv2/api`. */
export const model = {
  type: "@swamp/aws/apigatewayv2/api",
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
      toVersion: "2026.05.27.1",
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
      description: "ApiGatewayV2 Api resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApiGatewayV2 Api",
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
          "AWS::ApiGatewayV2::Api",
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
      description: "Get a ApiGatewayV2 Api",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGatewayV2 Api",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ApiGatewayV2::Api",
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
      description: "Update a ApiGatewayV2 Api",
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
        const identifier = existing.ApiId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ApiGatewayV2::Api",
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
          "AWS::ApiGatewayV2::Api",
          identifier,
          currentState,
          desiredState,
          ["ProtocolType"],
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
      description: "Delete a ApiGatewayV2 Api",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGatewayV2 Api",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ApiGatewayV2::Api",
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
      description: "Sync ApiGatewayV2 Api state from AWS",
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
        const identifier = existing.ApiId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ApiGatewayV2::Api",
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
