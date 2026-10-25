// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/glue/connection
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Connection (AWS::Glue::Connection).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const BasicAuthenticationCredentialsSchema = z.object({
  Password: z.string().describe(
    "The password used in the authentication configuration.",
  ).optional(),
  Username: z.string().describe(
    "The username used in the authentication configuration.",
  ).optional(),
});

const AuthorizationCodePropertiesSchema = z.object({
  AuthorizationCode: z.string().describe(
    "The authorization code used in the authentication configuration.",
  ).optional(),
  RedirectUri: z.string().describe(
    "The redirect URI where the user gets redirected to by authorization server when issuing an authorization code.",
  ).optional(),
});

const OAuth2ClientApplicationSchema = z.object({
  AWSManagedClientApplicationReference: z.string().describe(
    "The reference to the SaaS-side client app that is AWS managed.",
  ).optional(),
  UserManagedClientApplicationClientId: z.string().describe(
    "The client application clientID if the ClientAppType is USER_MANAGED.",
  ).optional(),
});

const OAuth2CredentialsSchema = z.object({
  AccessToken: z.string().describe(
    "The access token used in the authentication configuration.",
  ).optional(),
  JwtToken: z.string().describe(
    "The JSON Web Token (JWT) used when the authentication type is OAuth2.",
  ).optional(),
  RefreshToken: z.string().describe(
    "The refresh token used when the authentication type is OAuth2.",
  ).optional(),
  UserManagedClientApplicationClientSecret: z.string().describe(
    "The client application client secret if the client application is user managed.",
  ).optional(),
});

const OAuth2PropertiesSchema = z.object({
  AuthorizationCodeProperties: AuthorizationCodePropertiesSchema.describe(
    "The set of properties required for the the OAuth2 AUTHORIZATION_CODE grant type workflow.",
  ).optional(),
  OAuth2ClientApplication: OAuth2ClientApplicationSchema.describe(
    "The OAuth2 client app used for the connection.",
  ).optional(),
  OAuth2Credentials: OAuth2CredentialsSchema.describe(
    "A structure containing the OAuth2 credentials used in the authentication configuration.",
  ).optional(),
  OAuth2GrantType: z.string().describe(
    "The grant type used in the authentication configuration.",
  ).optional(),
  TokenUrl: z.string().describe(
    "The URL used in the authentication configuration.",
  ).optional(),
  TokenUrlParametersMap: z.record(z.string(), z.unknown()).describe(
    "A map of key-value pairs used in the authentication configuration.",
  ).optional(),
});

const AuthenticationConfigurationSchema = z.object({
  AuthenticationType: z.string().describe(
    "A structure containing the authentication configuration in the CreateConnection request.",
  ),
  BasicAuthenticationCredentials: BasicAuthenticationCredentialsSchema.describe(
    "For supplying basic auth credentials when not providing a SecretArn value",
  ).optional(),
  CustomAuthenticationCredentials: z.record(z.string(), z.unknown()).describe(
    "A structure containing the authentication credentials in the CreateConnection request.",
  ).optional(),
  KmsKeyArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the KMS key used in the authentication configuration.",
  ).optional(),
  OAuth2Properties: OAuth2PropertiesSchema.describe(
    "A structure containing properties for OAuth2 in the CreateConnection request.",
  ).optional(),
  SecretArn: z.string().describe(
    "The secret manager ARN to store credentials in the CreateConnection request.",
  ).optional(),
});

const PhysicalConnectionRequirementsSchema = z.object({
  AvailabilityZone: z.string().describe(
    "The availability zone where the connection is located.",
  ).optional(),
  SecurityGroupIdList: z.array(z.string()).describe(
    "The security group ID list used by the connection.",
  ).optional(),
  SubnetId: z.string().describe("The subnet ID used by the connection.")
    .optional(),
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
  ConnectionInput: z.object({
    AthenaProperties: z.record(z.string(), z.unknown()).describe(
      "Connection properties specific to the Athena compute environment.",
    ).optional(),
    AuthenticationConfiguration: AuthenticationConfigurationSchema.describe(
      "The authentication configuration used to connect to the connection.",
    ).optional(),
    ConnectionProperties: z.record(z.string(), z.unknown()).describe(
      "A map of key-value pairs used as parameters for this connection.",
    ).optional(),
    ConnectionType: z.string().describe(
      "The type of the connection that needs to be created.",
    ),
    Description: z.string().describe("A description of the connection.")
      .optional(),
    MatchCriteria: z.array(z.string()).describe(
      "A list of criteria that can be used in selecting this connection.",
    ).optional(),
    Name: z.string().describe("The name of the connection.").optional(),
    PhysicalConnectionRequirements: PhysicalConnectionRequirementsSchema
      .describe("The physical connection requirements.").optional(),
    PythonProperties: z.record(z.string(), z.unknown()).describe(
      "Connection properties specific to the Python compute environment.",
    ).optional(),
    SparkProperties: z.record(z.string(), z.unknown()).describe(
      "Connection properties specific to the Spark compute environment.",
    ).optional(),
    ValidateCredentials: z.boolean().describe(
      "A flag to validate the credentials during create connection. Default is true.",
    ).optional(),
    ValidateForComputeEnvironments: z.array(z.string()).optional(),
  }).describe("The connection properties used for this connection."),
  CatalogId: z.string().describe(
    "The ID of the data catalog to create the catalog object in. Currently, this should be the AWS account ID.",
  ),
  Tags: z.record(z.string(), z.unknown()).describe(
    "The collection of tags. Each tag element is associated with a given resource.",
  ).optional(),
});

const StateSchema = z.object({
  ConnectionInput: z.object({
    AthenaProperties: z.record(z.string(), z.unknown()),
    AuthenticationConfiguration: AuthenticationConfigurationSchema,
    ConnectionProperties: z.record(z.string(), z.unknown()),
    ConnectionType: z.string(),
    Description: z.string(),
    MatchCriteria: z.array(z.string()),
    Name: z.string(),
    PhysicalConnectionRequirements: PhysicalConnectionRequirementsSchema,
    PythonProperties: z.record(z.string(), z.unknown()),
    SparkProperties: z.record(z.string(), z.unknown()),
    ValidateCredentials: z.boolean(),
    ValidateForComputeEnvironments: z.array(z.string()),
  }).optional(),
  CatalogId: z.string(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ConnectionInput: z.object({
    AthenaProperties: z.record(z.string(), z.unknown()).describe(
      "Connection properties specific to the Athena compute environment.",
    ).optional(),
    AuthenticationConfiguration: AuthenticationConfigurationSchema.describe(
      "The authentication configuration used to connect to the connection.",
    ).optional(),
    ConnectionProperties: z.record(z.string(), z.unknown()).describe(
      "A map of key-value pairs used as parameters for this connection.",
    ).optional(),
    ConnectionType: z.string().describe(
      "The type of the connection that needs to be created.",
    ).optional(),
    Description: z.string().describe("A description of the connection.")
      .optional(),
    MatchCriteria: z.array(z.string()).describe(
      "A list of criteria that can be used in selecting this connection.",
    ).optional(),
    Name: z.string().describe("The name of the connection.").optional(),
    PhysicalConnectionRequirements: PhysicalConnectionRequirementsSchema
      .describe("The physical connection requirements.").optional(),
    PythonProperties: z.record(z.string(), z.unknown()).describe(
      "Connection properties specific to the Python compute environment.",
    ).optional(),
    SparkProperties: z.record(z.string(), z.unknown()).describe(
      "Connection properties specific to the Spark compute environment.",
    ).optional(),
    ValidateCredentials: z.boolean().describe(
      "A flag to validate the credentials during create connection. Default is true.",
    ).optional(),
    ValidateForComputeEnvironments: z.array(z.string()).optional(),
  }).describe("The connection properties used for this connection.").optional(),
  CatalogId: z.string().describe(
    "The ID of the data catalog to create the catalog object in. Currently, this should be the AWS account ID.",
  ).optional(),
  Tags: z.record(z.string(), z.unknown()).describe(
    "The collection of tags. Each tag element is associated with a given resource.",
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

/** Swamp extension model for Glue Connection. Registered at `@swamp/aws/glue/connection`. */
export const model = {
  type: "@swamp/aws/glue/connection",
  version: "2026.10.25.1",
  upgrades: [
    {
      toVersion: "2026.10.14.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Glue Connection resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Connection",
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
          "AWS::Glue::Connection",
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
      description: "Get a Glue Connection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Connection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Connection",
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
      description: "Update a Glue Connection",
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
          existing.CatalogId?.toString(),
          existing.Name?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Glue::Connection",
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
          "AWS::Glue::Connection",
          identifier,
          currentState,
          desiredState,
          ["CatalogId", "ConnectionInput/Name"],
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
      description: "Delete a Glue Connection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Connection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Connection",
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
      description: "Sync Glue Connection state from AWS",
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
          existing.CatalogId?.toString(),
          existing.Name?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Glue::Connection",
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
    list: {
      description: "List Glue Connection resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::Glue::Connection",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
