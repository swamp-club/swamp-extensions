// Auto-generated extension model for @swamp/aws/apigateway/rest-api
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApiGateway RestApi (AWS::ApiGateway::RestApi).
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
  Policy: z.record(z.string(), z.unknown()).describe(
    'A policy document that contains the permissions for the RestApi resource. To set the ARN for the policy, use the!Join intrinsic function with "" as delimiter and values of "execute-api:/" and "*".',
  ).optional(),
  BodyS3Location: z.object({
    Bucket: z.string().describe(
      "The name of the S3 bucket where the OpenAPI file is stored.",
    ).optional(),
    ETag: z.string().describe(
      "The Amazon S3 ETag (a file checksum) of the OpenAPI file. If you don't specify a value, API Gateway skips ETag validation of your OpenAPI file.",
    ).optional(),
    Version: z.string().describe(
      "For versioning-enabled buckets, a specific version of the OpenAPI file.",
    ).optional(),
    Key: z.string().describe(
      "The file name of the OpenAPI file (Amazon S3 object name).",
    ).optional(),
  }).describe(
    "The Amazon Simple Storage Service (Amazon S3) location that points to an OpenAPI file, which defines a set of RESTful APIs in JSON or YAML format.",
  ).optional(),
  Description: z.string().optional(),
  MinimumCompressionSize: z.number().int().optional(),
  Parameters: z.record(z.string(), z.unknown()).optional(),
  CloneFrom: z.string().optional(),
  Mode: z.string().describe(
    "This property applies only when you use OpenAPI to define your REST API. The Mode determines how API Gateway handles resource updates. Valid values are overwrite or merge. For overwrite, the new API definition replaces the existing one. The existing API identifier remains unchanged. For merge, the new API definition is merged with the existing API. If you don't specify this property, a default value is chosen. For REST APIs created before March 29, 2021, the default is overwrite. For REST APIs created after March 29, 2021, the new API definition takes precedence, but any container types such as endpoint configurations and binary media types are merged with the existing API. Use the default mode to define top-level RestApi properties in addition to using OpenAPI. Generally, it's preferred to use API Gateway's OpenAPI extensions to model these properties.",
  ).optional(),
  DisableExecuteApiEndpoint: z.boolean().optional(),
  FailOnWarnings: z.boolean().optional(),
  BinaryMediaTypes: z.array(z.string()).optional(),
  Name: z.string().describe(
    "The name of the RestApi. A name is required if the REST API is not based on an OpenAPI specification.",
  ).optional(),
  SecurityPolicy: z.string().optional(),
  ApiKeySourceType: z.string().optional(),
  EndpointConfiguration: z.object({
    IpAddressType: z.string().optional(),
    Types: z.array(z.string()).optional(),
    VpcEndpointIds: z.array(z.string()).optional(),
  }).describe(
    "A list of the endpoint types and IP address types of the API. Use this property when creating an API. When importing an existing API, specify the endpoint configuration types using the Parameters property.",
  ).optional(),
  Body: z.record(z.string(), z.unknown()).describe(
    "An OpenAPI specification that defines a set of RESTful APIs in JSON format. For YAML templates, you can also provide the specification in YAML format.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  EndpointAccessMode: z.string().optional(),
});

const StateSchema = z.object({
  Policy: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  BodyS3Location: z.object({
    Bucket: z.string(),
    ETag: z.string(),
    Version: z.string(),
    Key: z.string(),
  }).optional(),
  Description: z.string().optional(),
  MinimumCompressionSize: z.number().optional(),
  Parameters: z.union([z.string(), z.record(z.string(), z.unknown())])
    .optional(),
  CloneFrom: z.string().optional(),
  Mode: z.string().optional(),
  RestApiId: z.string(),
  DisableExecuteApiEndpoint: z.boolean().optional(),
  FailOnWarnings: z.boolean().optional(),
  BinaryMediaTypes: z.array(z.string()).optional(),
  Name: z.string().optional(),
  RootResourceId: z.string().optional(),
  SecurityPolicy: z.string().optional(),
  ApiKeySourceType: z.string().optional(),
  EndpointConfiguration: z.object({
    IpAddressType: z.string(),
    Types: z.array(z.string()),
    VpcEndpointIds: z.array(z.string()),
  }).optional(),
  Body: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
  Tags: z.array(TagSchema).optional(),
  EndpointAccessMode: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Policy: z.record(z.string(), z.unknown()).describe(
    'A policy document that contains the permissions for the RestApi resource. To set the ARN for the policy, use the!Join intrinsic function with "" as delimiter and values of "execute-api:/" and "*".',
  ).optional(),
  BodyS3Location: z.object({
    Bucket: z.string().describe(
      "The name of the S3 bucket where the OpenAPI file is stored.",
    ).optional(),
    ETag: z.string().describe(
      "The Amazon S3 ETag (a file checksum) of the OpenAPI file. If you don't specify a value, API Gateway skips ETag validation of your OpenAPI file.",
    ).optional(),
    Version: z.string().describe(
      "For versioning-enabled buckets, a specific version of the OpenAPI file.",
    ).optional(),
    Key: z.string().describe(
      "The file name of the OpenAPI file (Amazon S3 object name).",
    ).optional(),
  }).describe(
    "The Amazon Simple Storage Service (Amazon S3) location that points to an OpenAPI file, which defines a set of RESTful APIs in JSON or YAML format.",
  ).optional(),
  Description: z.string().optional(),
  MinimumCompressionSize: z.number().int().optional(),
  Parameters: z.record(z.string(), z.unknown()).optional(),
  CloneFrom: z.string().optional(),
  Mode: z.string().describe(
    "This property applies only when you use OpenAPI to define your REST API. The Mode determines how API Gateway handles resource updates. Valid values are overwrite or merge. For overwrite, the new API definition replaces the existing one. The existing API identifier remains unchanged. For merge, the new API definition is merged with the existing API. If you don't specify this property, a default value is chosen. For REST APIs created before March 29, 2021, the default is overwrite. For REST APIs created after March 29, 2021, the new API definition takes precedence, but any container types such as endpoint configurations and binary media types are merged with the existing API. Use the default mode to define top-level RestApi properties in addition to using OpenAPI. Generally, it's preferred to use API Gateway's OpenAPI extensions to model these properties.",
  ).optional(),
  DisableExecuteApiEndpoint: z.boolean().optional(),
  FailOnWarnings: z.boolean().optional(),
  BinaryMediaTypes: z.array(z.string()).optional(),
  Name: z.string().describe(
    "The name of the RestApi. A name is required if the REST API is not based on an OpenAPI specification.",
  ).optional(),
  SecurityPolicy: z.string().optional(),
  ApiKeySourceType: z.string().optional(),
  EndpointConfiguration: z.object({
    IpAddressType: z.string().optional(),
    Types: z.array(z.string()).optional(),
    VpcEndpointIds: z.array(z.string()).optional(),
  }).describe(
    "A list of the endpoint types and IP address types of the API. Use this property when creating an API. When importing an existing API, specify the endpoint configuration types using the Parameters property.",
  ).optional(),
  Body: z.record(z.string(), z.unknown()).describe(
    "An OpenAPI specification that defines a set of RESTful APIs in JSON format. For YAML templates, you can also provide the specification in YAML format.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  EndpointAccessMode: z.string().optional(),
});

/** Swamp extension model for ApiGateway RestApi. Registered at `@swamp/aws/apigateway/rest-api`. */
export const model = {
  type: "@swamp/aws/apigateway/rest-api",
  version: "2026.05.27.1",
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
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "ApiGateway RestApi resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApiGateway RestApi",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::ApiGateway::RestApi",
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
      description: "Get a ApiGateway RestApi",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway RestApi",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::ApiGateway::RestApi",
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
      description: "Update a ApiGateway RestApi",
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
        const identifier = existing.RestApiId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ApiGateway::RestApi",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::ApiGateway::RestApi",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a ApiGateway RestApi",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApiGateway RestApi",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::ApiGateway::RestApi",
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
      description: "Sync ApiGateway RestApi state from AWS",
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
        const identifier = existing.RestApiId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ApiGateway::RestApi",
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
