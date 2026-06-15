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

// Auto-generated extension model for @swamp/aws/appsync/data-source
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AppSync DataSource (AWS::AppSync::DataSource).
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

const DeltaSyncConfigSchema = z.object({
  BaseTableTTL: z.string().describe(
    "The number of minutes that an Item is stored in the data source.",
  ),
  DeltaSyncTableTTL: z.string().describe(
    "The number of minutes that a Delta Sync log entry is stored in the Delta Sync table.",
  ),
  DeltaSyncTableName: z.string().describe("The Delta Sync table name."),
});

const AwsIamConfigSchema = z.object({
  SigningRegion: z.string().describe(
    "The signing Region for AWS Identity and Access Management authorization.",
  ).optional(),
  SigningServiceName: z.string().describe(
    "The signing service name for AWS Identity and Access Management authorization.",
  ).optional(),
});

const AuthorizationConfigSchema = z.object({
  AuthorizationType: z.string().describe(
    "The authorization type that the HTTP endpoint requires.",
  ),
  AwsIamConfig: AwsIamConfigSchema.describe(
    "The AWS Identity and Access Management settings.",
  ).optional(),
});

const RdsHttpEndpointConfigSchema = z.object({
  DatabaseName: z.string().describe("Logical database name.").optional(),
  AwsRegion: z.string().describe("AWS Region for RDS HTTP endpoint."),
  DbClusterIdentifier: z.string().describe(
    "Amazon RDS cluster Amazon Resource Name (ARN).",
  ),
  AwsSecretStoreArn: z.string().describe(
    "The ARN for database credentials stored in AWS Secrets Manager.",
  ),
  Schema: z.string().describe("Logical schema name.").optional(),
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
    "Unique AWS AppSync GraphQL API identifier where this data source will be created.",
  ),
  Description: z.string().describe("The description of the data source.")
    .optional(),
  DynamoDBConfig: z.object({
    TableName: z.string().describe("The table name."),
    DeltaSyncConfig: DeltaSyncConfigSchema.describe(
      "The DeltaSyncConfig for a versioned datasource.",
    ).optional(),
    UseCallerCredentials: z.boolean().describe(
      "Set to TRUE to use AWS Identity and Access Management with this data source.",
    ).optional(),
    AwsRegion: z.string().describe("The AWS Region."),
    Versioned: z.boolean().describe(
      "Set to TRUE to use Conflict Detection and Resolution with this data source.",
    ).optional(),
  }).describe(
    "AWS Region and TableName for an Amazon DynamoDB table in your account.",
  ).optional(),
  ElasticsearchConfig: z.object({
    AwsRegion: z.string().describe("The AWS Region."),
    Endpoint: z.string().describe("The endpoint."),
  }).describe(
    "AWS Region and Endpoints for an Amazon OpenSearch Service domain in your account. As of September 2021, Amazon Elasticsearch Service is Amazon OpenSearch Service. This property is deprecated. For new data sources, use OpenSearchServiceConfig to specify an OpenSearch Service data source.",
  ).optional(),
  EventBridgeConfig: z.object({
    EventBusArn: z.string().describe("ARN for the EventBridge bus."),
  }).describe("ARN for the EventBridge bus.").optional(),
  HttpConfig: z.object({
    Endpoint: z.string().describe("The endpoint."),
    AuthorizationConfig: AuthorizationConfigSchema.describe(
      "The authorization configuration.",
    ).optional(),
  }).describe("Endpoints for an HTTP data source.").optional(),
  LambdaConfig: z.object({
    LambdaFunctionArn: z.string().describe("The ARN for the Lambda function."),
  }).describe(
    "An ARN of a Lambda function in valid ARN format. This can be the ARN of a Lambda function that exists in the current account or in another account.",
  ).optional(),
  Name: z.string().describe(
    "Friendly name for you to identify your AppSync data source after creation.",
  ),
  OpenSearchServiceConfig: z.object({
    AwsRegion: z.string().describe("The AWS Region."),
    Endpoint: z.string().describe("The endpoint."),
  }).describe(
    "AWS Region and Endpoints for an Amazon OpenSearch Service domain in your account.",
  ).optional(),
  RelationalDatabaseConfig: z.object({
    RdsHttpEndpointConfig: RdsHttpEndpointConfigSchema.describe(
      "Information about the Amazon RDS resource.",
    ).optional(),
    RelationalDatabaseSourceType: z.string().describe(
      "The type of relational data source.",
    ),
  }).describe(
    "Relational Database configuration of the relational database data source.",
  ).optional(),
  ServiceRoleArn: z.string().describe(
    "The AWS Identity and Access Management service role ARN for the data source. The system assumes this role when accessing the data source.",
  ).optional(),
  Type: z.string().describe("The type of the data source."),
  MetricsConfig: z.enum(["DISABLED", "ENABLED"]).optional(),
});

const StateSchema = z.object({
  ApiId: z.string().optional(),
  Description: z.string().optional(),
  DynamoDBConfig: z.object({
    TableName: z.string(),
    DeltaSyncConfig: DeltaSyncConfigSchema,
    UseCallerCredentials: z.boolean(),
    AwsRegion: z.string(),
    Versioned: z.boolean(),
  }).optional(),
  ElasticsearchConfig: z.object({
    AwsRegion: z.string(),
    Endpoint: z.string(),
  }).optional(),
  EventBridgeConfig: z.object({
    EventBusArn: z.string(),
  }).optional(),
  HttpConfig: z.object({
    Endpoint: z.string(),
    AuthorizationConfig: AuthorizationConfigSchema,
  }).optional(),
  LambdaConfig: z.object({
    LambdaFunctionArn: z.string(),
  }).optional(),
  Name: z.string().optional(),
  OpenSearchServiceConfig: z.object({
    AwsRegion: z.string(),
    Endpoint: z.string(),
  }).optional(),
  RelationalDatabaseConfig: z.object({
    RdsHttpEndpointConfig: RdsHttpEndpointConfigSchema,
    RelationalDatabaseSourceType: z.string(),
  }).optional(),
  ServiceRoleArn: z.string().optional(),
  Type: z.string().optional(),
  DataSourceArn: z.string(),
  MetricsConfig: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ApiId: z.string().describe(
    "Unique AWS AppSync GraphQL API identifier where this data source will be created.",
  ).optional(),
  Description: z.string().describe("The description of the data source.")
    .optional(),
  DynamoDBConfig: z.object({
    TableName: z.string().describe("The table name.").optional(),
    DeltaSyncConfig: DeltaSyncConfigSchema.describe(
      "The DeltaSyncConfig for a versioned datasource.",
    ).optional(),
    UseCallerCredentials: z.boolean().describe(
      "Set to TRUE to use AWS Identity and Access Management with this data source.",
    ).optional(),
    AwsRegion: z.string().describe("The AWS Region.").optional(),
    Versioned: z.boolean().describe(
      "Set to TRUE to use Conflict Detection and Resolution with this data source.",
    ).optional(),
  }).describe(
    "AWS Region and TableName for an Amazon DynamoDB table in your account.",
  ).optional(),
  ElasticsearchConfig: z.object({
    AwsRegion: z.string().describe("The AWS Region.").optional(),
    Endpoint: z.string().describe("The endpoint.").optional(),
  }).describe(
    "AWS Region and Endpoints for an Amazon OpenSearch Service domain in your account. As of September 2021, Amazon Elasticsearch Service is Amazon OpenSearch Service. This property is deprecated. For new data sources, use OpenSearchServiceConfig to specify an OpenSearch Service data source.",
  ).optional(),
  EventBridgeConfig: z.object({
    EventBusArn: z.string().describe("ARN for the EventBridge bus.").optional(),
  }).describe("ARN for the EventBridge bus.").optional(),
  HttpConfig: z.object({
    Endpoint: z.string().describe("The endpoint.").optional(),
    AuthorizationConfig: AuthorizationConfigSchema.describe(
      "The authorization configuration.",
    ).optional(),
  }).describe("Endpoints for an HTTP data source.").optional(),
  LambdaConfig: z.object({
    LambdaFunctionArn: z.string().describe("The ARN for the Lambda function.")
      .optional(),
  }).describe(
    "An ARN of a Lambda function in valid ARN format. This can be the ARN of a Lambda function that exists in the current account or in another account.",
  ).optional(),
  Name: z.string().describe(
    "Friendly name for you to identify your AppSync data source after creation.",
  ).optional(),
  OpenSearchServiceConfig: z.object({
    AwsRegion: z.string().describe("The AWS Region.").optional(),
    Endpoint: z.string().describe("The endpoint.").optional(),
  }).describe(
    "AWS Region and Endpoints for an Amazon OpenSearch Service domain in your account.",
  ).optional(),
  RelationalDatabaseConfig: z.object({
    RdsHttpEndpointConfig: RdsHttpEndpointConfigSchema.describe(
      "Information about the Amazon RDS resource.",
    ).optional(),
    RelationalDatabaseSourceType: z.string().describe(
      "The type of relational data source.",
    ).optional(),
  }).describe(
    "Relational Database configuration of the relational database data source.",
  ).optional(),
  ServiceRoleArn: z.string().describe(
    "The AWS Identity and Access Management service role ARN for the data source. The system assumes this role when accessing the data source.",
  ).optional(),
  Type: z.string().describe("The type of the data source.").optional(),
  MetricsConfig: z.enum(["DISABLED", "ENABLED"]).optional(),
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

/** Swamp extension model for AppSync DataSource. Registered at `@swamp/aws/appsync/data-source`. */
export const model = {
  type: "@swamp/aws/appsync/data-source",
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
      description: "AppSync DataSource resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AppSync DataSource",
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
          "AWS::AppSync::DataSource",
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
      description: "Get a AppSync DataSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync DataSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AppSync::DataSource",
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
      description: "Update a AppSync DataSource",
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
        const identifier = existing.DataSourceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AppSync::DataSource",
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
          "AWS::AppSync::DataSource",
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
      description: "Delete a AppSync DataSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AppSync DataSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AppSync::DataSource",
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
      description: "Sync AppSync DataSource state from AWS",
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
        const identifier = existing.DataSourceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AppSync::DataSource",
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
