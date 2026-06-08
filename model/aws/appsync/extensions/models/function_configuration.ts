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

// Auto-generated extension model for @swamp/aws/appsync/function-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppSync FunctionConfiguration (AWS::AppSync::FunctionConfiguration).
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

const LambdaConflictHandlerConfigSchema = z.object({
  LambdaConflictHandlerArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the Lambda function to use as the Conflict Handler.",
  ).optional(),
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
  ApiId: z.string().describe(
    "The AWS AppSync GraphQL API that you want to attach using this function.",
  ),
  Code: z.string().describe(
    "The resolver code that contains the request and response functions. When code is used, the runtime is required. The runtime value must be APPSYNC_JS.",
  ).optional(),
  CodeS3Location: z.string().describe(
    "The Amazon S3 endpoint (where the code is located??).",
  ).optional(),
  DataSourceName: z.string().describe(
    "The name of data source this function will attach.",
  ),
  Description: z.string().describe("The function description.").optional(),
  FunctionVersion: z.string().describe(
    "The version of the request mapping template. Currently, only the 2018-05-29 version of the template is supported.",
  ).optional(),
  MaxBatchSize: z.number().int().describe(
    "The maximum number of resolver request inputs that will be sent to a single AWS Lambda function in a BatchInvoke operation.",
  ).optional(),
  Name: z.string().describe("The name of the function."),
  RequestMappingTemplate: z.string().describe(
    "The Function request mapping template. Functions support only the 2018-05-29 version of the request mapping template.",
  ).optional(),
  RequestMappingTemplateS3Location: z.string().describe(
    "Describes a Sync configuration for a resolver. Contains information on which Conflict Detection, as well as Resolution strategy, should be performed when the resolver is invoked.",
  ).optional(),
  ResponseMappingTemplate: z.string().describe(
    "The Function response mapping template.",
  ).optional(),
  ResponseMappingTemplateS3Location: z.string().describe(
    "The location of a response mapping template in an Amazon S3 bucket. Use this if you want to provision with a template file in Amazon S3 rather than embedding it in your CloudFormation template.",
  ).optional(),
  Runtime: z.object({
    Name: z.string().describe(
      "The name of the runtime to use. Currently, the only allowed value is APPSYNC_JS.",
    ),
    RuntimeVersion: z.string().describe(
      "The version of the runtime to use. Currently, the only allowed version is 1.0.0.",
    ),
  }).describe(
    "Describes a runtime used by an AWS AppSync pipeline resolver or AWS AppSync function. Specifies the name and version of the runtime to use. Note that if a runtime is specified, code must also be specified.",
  ).optional(),
  SyncConfig: z.object({
    ConflictDetection: z.string().describe(
      "The Conflict Detection strategy to use.",
    ),
    ConflictHandler: z.string().describe(
      "The Conflict Resolution strategy to perform in the event of a conflict.",
    ).optional(),
    LambdaConflictHandlerConfig: LambdaConflictHandlerConfigSchema.describe(
      "The LambdaConflictHandlerConfig when configuring LAMBDA as the Conflict Handler.",
    ).optional(),
  }).describe(
    "Describes a Sync configuration for a resolver. Specifies which Conflict Detection strategy and Resolution strategy to use when the resolver is invoked.",
  ).optional(),
});

const StateSchema = z.object({
  FunctionId: z.string().optional(),
  FunctionArn: z.string(),
  ApiId: z.string().optional(),
  Code: z.string().optional(),
  CodeS3Location: z.string().optional(),
  DataSourceName: z.string().optional(),
  Description: z.string().optional(),
  FunctionVersion: z.string().optional(),
  MaxBatchSize: z.number().optional(),
  Name: z.string().optional(),
  RequestMappingTemplate: z.string().optional(),
  RequestMappingTemplateS3Location: z.string().optional(),
  ResponseMappingTemplate: z.string().optional(),
  ResponseMappingTemplateS3Location: z.string().optional(),
  Runtime: z.object({
    Name: z.string(),
    RuntimeVersion: z.string(),
  }).optional(),
  SyncConfig: z.object({
    ConflictDetection: z.string(),
    ConflictHandler: z.string(),
    LambdaConflictHandlerConfig: LambdaConflictHandlerConfigSchema,
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
    "The AWS AppSync GraphQL API that you want to attach using this function.",
  ).optional(),
  Code: z.string().describe(
    "The resolver code that contains the request and response functions. When code is used, the runtime is required. The runtime value must be APPSYNC_JS.",
  ).optional(),
  CodeS3Location: z.string().describe(
    "The Amazon S3 endpoint (where the code is located??).",
  ).optional(),
  DataSourceName: z.string().describe(
    "The name of data source this function will attach.",
  ).optional(),
  Description: z.string().describe("The function description.").optional(),
  FunctionVersion: z.string().describe(
    "The version of the request mapping template. Currently, only the 2018-05-29 version of the template is supported.",
  ).optional(),
  MaxBatchSize: z.number().int().describe(
    "The maximum number of resolver request inputs that will be sent to a single AWS Lambda function in a BatchInvoke operation.",
  ).optional(),
  Name: z.string().describe("The name of the function.").optional(),
  RequestMappingTemplate: z.string().describe(
    "The Function request mapping template. Functions support only the 2018-05-29 version of the request mapping template.",
  ).optional(),
  RequestMappingTemplateS3Location: z.string().describe(
    "Describes a Sync configuration for a resolver. Contains information on which Conflict Detection, as well as Resolution strategy, should be performed when the resolver is invoked.",
  ).optional(),
  ResponseMappingTemplate: z.string().describe(
    "The Function response mapping template.",
  ).optional(),
  ResponseMappingTemplateS3Location: z.string().describe(
    "The location of a response mapping template in an Amazon S3 bucket. Use this if you want to provision with a template file in Amazon S3 rather than embedding it in your CloudFormation template.",
  ).optional(),
  Runtime: z.object({
    Name: z.string().describe(
      "The name of the runtime to use. Currently, the only allowed value is APPSYNC_JS.",
    ).optional(),
    RuntimeVersion: z.string().describe(
      "The version of the runtime to use. Currently, the only allowed version is 1.0.0.",
    ).optional(),
  }).describe(
    "Describes a runtime used by an AWS AppSync pipeline resolver or AWS AppSync function. Specifies the name and version of the runtime to use. Note that if a runtime is specified, code must also be specified.",
  ).optional(),
  SyncConfig: z.object({
    ConflictDetection: z.string().describe(
      "The Conflict Detection strategy to use.",
    ).optional(),
    ConflictHandler: z.string().describe(
      "The Conflict Resolution strategy to perform in the event of a conflict.",
    ).optional(),
    LambdaConflictHandlerConfig: LambdaConflictHandlerConfigSchema.describe(
      "The LambdaConflictHandlerConfig when configuring LAMBDA as the Conflict Handler.",
    ).optional(),
  }).describe(
    "Describes a Sync configuration for a resolver. Specifies which Conflict Detection strategy and Resolution strategy to use when the resolver is invoked.",
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

/** Swamp extension model for AppSync FunctionConfiguration. Registered at `@swamp/aws/appsync/function-configuration`. */
export const model = {
  type: "@swamp/aws/appsync/function-configuration",
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
      description: "AppSync FunctionConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppSync FunctionConfiguration",
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
          "AWS::AppSync::FunctionConfiguration",
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
      description: "Get a AppSync FunctionConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync FunctionConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppSync::FunctionConfiguration",
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
      description: "Update a AppSync FunctionConfiguration",
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
        const identifier = existing.FunctionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppSync::FunctionConfiguration",
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
          "AWS::AppSync::FunctionConfiguration",
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
      description: "Delete a AppSync FunctionConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync FunctionConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppSync::FunctionConfiguration",
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
      description: "Sync AppSync FunctionConfiguration state from AWS",
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
        const identifier = existing.FunctionArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppSync::FunctionConfiguration",
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
