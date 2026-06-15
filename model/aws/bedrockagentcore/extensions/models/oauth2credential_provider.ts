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

// Auto-generated extension model for @swamp/aws/bedrockagentcore/oauth2credential-provider
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore OAuth2CredentialProvider (AWS::BedrockAgentCore::OAuth2CredentialProvider).
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

const Oauth2AuthorizationServerMetadataSchema = z.object({
  Issuer: z.string().describe(
    "The issuer URL for the OAuth2 authorization server",
  ),
  AuthorizationEndpoint: z.string().describe("The authorization endpoint URL"),
  TokenEndpoint: z.string().describe("The token endpoint URL"),
  ResponseTypes: z.array(z.string()).describe("The supported response types")
    .optional(),
});

const Oauth2DiscoverySchema = z.object({
  DiscoveryUrl: z.string().regex(
    new RegExp("^.+/\\.well-known/openid-configuration$"),
  ).describe("The discovery URL for the OAuth2 provider").optional(),
  AuthorizationServerMetadata: Oauth2AuthorizationServerMetadataSchema.describe(
    "Authorization server metadata for the OAuth2 provider",
  ).optional(),
});

const SecretReferenceSchema = z.object({
  SecretId: z.string().min(1).max(2048).describe(
    "The ID or ARN of the secret in AWS Secrets Manager",
  ),
  JsonKey: z.string().min(1).max(128).describe(
    "The JSON key within the secret that contains the credential value",
  ),
});

const TokenExchangeGrantTypeConfigSchema = z.object({
  ActorTokenContent: z.enum(["NONE", "M2M", "AWS_IAM_ID_TOKEN_JWT"]).describe(
    "The actor token content type",
  ),
  ActorTokenScopes: z.array(z.string()).describe(
    "The actor token scopes. Only valid when ActorTokenContent is M2M.",
  ).optional(),
});

const OnBehalfOfTokenExchangeConfigSchema = z.object({
  GrantType: z.enum(["TOKEN_EXCHANGE", "JWT_AUTHORIZATION_GRANT"]).describe(
    "The grant type for on-behalf-of token exchange",
  ),
  TokenExchangeGrantTypeConfig: TokenExchangeGrantTypeConfigSchema.describe(
    "Configuration for RFC 8693 Token Exchange",
  ).optional(),
});

const CustomOauth2ProviderConfigInputSchema = z.object({
  OauthDiscovery: Oauth2DiscoverySchema.describe(
    "Discovery information for an OAuth2 provider",
  ),
  ClientId: z.string().min(1).max(256).describe(
    "The client ID for the custom OAuth2 provider",
  ).optional(),
  ClientSecret: z.string().min(1).max(2048).describe(
    "The client secret for the custom OAuth2 provider",
  ).optional(),
  ClientSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
  OnBehalfOfTokenExchangeConfig: OnBehalfOfTokenExchangeConfigSchema.describe(
    "Configuration for on-behalf-of token exchange",
  ).optional(),
  ClientAuthenticationMethod: z.enum([
    "CLIENT_SECRET_BASIC",
    "CLIENT_SECRET_POST",
    "AWS_IAM_ID_TOKEN_JWT",
  ]).describe(
    "The client authentication method to use when authenticating with the token endpoint",
  ).optional(),
});

const GoogleOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048).optional(),
  ClientSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
});

const GithubOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048).optional(),
  ClientSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
});

const SlackOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048).optional(),
  ClientSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
});

const SalesforceOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048).optional(),
  ClientSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
});

const MicrosoftOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048).optional(),
  ClientSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
  TenantId: z.string().min(1).max(2048).describe(
    "The Microsoft Entra ID tenant ID",
  ).optional(),
});

const AtlassianOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048).optional(),
  ClientSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
});

const LinkedinOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048).optional(),
  ClientSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
});

const IncludedOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048).optional(),
  ClientSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
  Issuer: z.string().describe(
    "Token issuer of your isolated OAuth2 application tenant",
  ).optional(),
  AuthorizationEndpoint: z.string().describe(
    "OAuth2 authorization endpoint for your isolated OAuth2 application tenant",
  ).optional(),
  TokenEndpoint: z.string().describe(
    "OAuth2 token endpoint for your isolated OAuth2 application tenant",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\-_]+$"))
    .describe("The name of the OAuth2 credential provider"),
  CredentialProviderVendor: z.enum([
    "GoogleOauth2",
    "GithubOauth2",
    "SlackOauth2",
    "SalesforceOauth2",
    "MicrosoftOauth2",
    "CustomOauth2",
    "AtlassianOauth2",
    "LinkedinOauth2",
    "XOauth2",
    "OktaOauth2",
    "OneLoginOauth2",
    "PingOneOauth2",
    "FacebookOauth2",
    "YandexOauth2",
    "RedditOauth2",
    "ZoomOauth2",
    "TwitchOauth2",
    "SpotifyOauth2",
    "DropboxOauth2",
    "NotionOauth2",
    "HubspotOauth2",
    "CyberArkOauth2",
    "FusionAuthOauth2",
    "Auth0Oauth2",
    "CognitoOauth2",
  ]).describe("The vendor of the OAuth2 credential provider"),
  Oauth2ProviderConfigInput: z.object({
    CustomOauth2ProviderConfig: CustomOauth2ProviderConfigInputSchema.describe(
      "Input configuration for a custom OAuth2 provider",
    ).optional(),
    GoogleOauth2ProviderConfig: GoogleOauth2ProviderConfigInputSchema.describe(
      "Input configuration for a Google OAuth2 provider",
    ).optional(),
    GithubOauth2ProviderConfig: GithubOauth2ProviderConfigInputSchema.describe(
      "Input configuration for a GitHub OAuth2 provider",
    ).optional(),
    SlackOauth2ProviderConfig: SlackOauth2ProviderConfigInputSchema.describe(
      "Input configuration for a Slack OAuth2 provider",
    ).optional(),
    SalesforceOauth2ProviderConfig: SalesforceOauth2ProviderConfigInputSchema
      .describe("Input configuration for a Salesforce OAuth2 provider")
      .optional(),
    MicrosoftOauth2ProviderConfig: MicrosoftOauth2ProviderConfigInputSchema
      .describe("Input configuration for a Microsoft OAuth2 provider")
      .optional(),
    AtlassianOauth2ProviderConfig: AtlassianOauth2ProviderConfigInputSchema
      .describe("Input configuration for an Atlassian OAuth2 provider")
      .optional(),
    LinkedinOauth2ProviderConfig: LinkedinOauth2ProviderConfigInputSchema
      .describe("Input configuration for a LinkedIn OAuth2 provider")
      .optional(),
    IncludedOauth2ProviderConfig: IncludedOauth2ProviderConfigInputSchema
      .describe(
        "Input configuration for a supported non-custom OAuth2 provider",
      ).optional(),
  }).describe("The configuration settings for the OAuth2 provider").optional(),
  ClientSecretArn: z.object({
    SecretArn: z.string().regex(
      new RegExp(
        "^arn:(aws|aws-us-gov):secretsmanager:[A-Za-z0-9-]{1,64}:[0-9]{12}:secret:[a-zA-Z0-9-_/+=.@!]+$",
      ),
    ).describe("The ARN of the secret in AWS Secrets Manager"),
  }).describe("The ARN of the client secret in AWS Secrets Manager").optional(),
  Oauth2ProviderConfigOutput: z.object({
    OauthDiscovery: Oauth2DiscoverySchema.describe(
      "Discovery information for an OAuth2 provider",
    ).optional(),
    ClientId: z.string().min(1).max(256).optional(),
    OnBehalfOfTokenExchangeConfig: OnBehalfOfTokenExchangeConfigSchema.describe(
      "Configuration for on-behalf-of token exchange",
    ).optional(),
    ClientAuthenticationMethod: z.enum([
      "CLIENT_SECRET_BASIC",
      "CLIENT_SECRET_POST",
      "AWS_IAM_ID_TOKEN_JWT",
    ]).describe(
      "The client authentication method used when authenticating with the token endpoint",
    ).optional(),
  }).describe("The output configuration for the OAuth2 provider").optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the OAuth2 credential provider",
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  CredentialProviderVendor: z.string().optional(),
  Oauth2ProviderConfigInput: z.object({
    CustomOauth2ProviderConfig: CustomOauth2ProviderConfigInputSchema,
    GoogleOauth2ProviderConfig: GoogleOauth2ProviderConfigInputSchema,
    GithubOauth2ProviderConfig: GithubOauth2ProviderConfigInputSchema,
    SlackOauth2ProviderConfig: SlackOauth2ProviderConfigInputSchema,
    SalesforceOauth2ProviderConfig: SalesforceOauth2ProviderConfigInputSchema,
    MicrosoftOauth2ProviderConfig: MicrosoftOauth2ProviderConfigInputSchema,
    AtlassianOauth2ProviderConfig: AtlassianOauth2ProviderConfigInputSchema,
    LinkedinOauth2ProviderConfig: LinkedinOauth2ProviderConfigInputSchema,
    IncludedOauth2ProviderConfig: IncludedOauth2ProviderConfigInputSchema,
  }).optional(),
  CredentialProviderArn: z.string(),
  ClientSecretArn: z.object({
    SecretArn: z.string(),
  }).optional(),
  ClientSecretJsonKey: z.string().optional(),
  ClientSecretSource: z.string().optional(),
  CallbackUrl: z.string().optional(),
  Oauth2ProviderConfigOutput: z.object({
    OauthDiscovery: Oauth2DiscoverySchema,
    ClientId: z.string(),
    OnBehalfOfTokenExchangeConfig: OnBehalfOfTokenExchangeConfigSchema,
    ClientAuthenticationMethod: z.string(),
  }).optional(),
  CreatedTime: z.string().optional(),
  LastUpdatedTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\-_]+$"))
    .describe("The name of the OAuth2 credential provider").optional(),
  CredentialProviderVendor: z.enum([
    "GoogleOauth2",
    "GithubOauth2",
    "SlackOauth2",
    "SalesforceOauth2",
    "MicrosoftOauth2",
    "CustomOauth2",
    "AtlassianOauth2",
    "LinkedinOauth2",
    "XOauth2",
    "OktaOauth2",
    "OneLoginOauth2",
    "PingOneOauth2",
    "FacebookOauth2",
    "YandexOauth2",
    "RedditOauth2",
    "ZoomOauth2",
    "TwitchOauth2",
    "SpotifyOauth2",
    "DropboxOauth2",
    "NotionOauth2",
    "HubspotOauth2",
    "CyberArkOauth2",
    "FusionAuthOauth2",
    "Auth0Oauth2",
    "CognitoOauth2",
  ]).describe("The vendor of the OAuth2 credential provider").optional(),
  Oauth2ProviderConfigInput: z.object({
    CustomOauth2ProviderConfig: CustomOauth2ProviderConfigInputSchema.describe(
      "Input configuration for a custom OAuth2 provider",
    ).optional(),
    GoogleOauth2ProviderConfig: GoogleOauth2ProviderConfigInputSchema.describe(
      "Input configuration for a Google OAuth2 provider",
    ).optional(),
    GithubOauth2ProviderConfig: GithubOauth2ProviderConfigInputSchema.describe(
      "Input configuration for a GitHub OAuth2 provider",
    ).optional(),
    SlackOauth2ProviderConfig: SlackOauth2ProviderConfigInputSchema.describe(
      "Input configuration for a Slack OAuth2 provider",
    ).optional(),
    SalesforceOauth2ProviderConfig: SalesforceOauth2ProviderConfigInputSchema
      .describe("Input configuration for a Salesforce OAuth2 provider")
      .optional(),
    MicrosoftOauth2ProviderConfig: MicrosoftOauth2ProviderConfigInputSchema
      .describe("Input configuration for a Microsoft OAuth2 provider")
      .optional(),
    AtlassianOauth2ProviderConfig: AtlassianOauth2ProviderConfigInputSchema
      .describe("Input configuration for an Atlassian OAuth2 provider")
      .optional(),
    LinkedinOauth2ProviderConfig: LinkedinOauth2ProviderConfigInputSchema
      .describe("Input configuration for a LinkedIn OAuth2 provider")
      .optional(),
    IncludedOauth2ProviderConfig: IncludedOauth2ProviderConfigInputSchema
      .describe(
        "Input configuration for a supported non-custom OAuth2 provider",
      ).optional(),
  }).describe("The configuration settings for the OAuth2 provider").optional(),
  ClientSecretArn: z.object({
    SecretArn: z.string().regex(
      new RegExp(
        "^arn:(aws|aws-us-gov):secretsmanager:[A-Za-z0-9-]{1,64}:[0-9]{12}:secret:[a-zA-Z0-9-_/+=.@!]+$",
      ),
    ).describe("The ARN of the secret in AWS Secrets Manager").optional(),
  }).describe("The ARN of the client secret in AWS Secrets Manager").optional(),
  Oauth2ProviderConfigOutput: z.object({
    OauthDiscovery: Oauth2DiscoverySchema.describe(
      "Discovery information for an OAuth2 provider",
    ).optional(),
    ClientId: z.string().min(1).max(256).optional(),
    OnBehalfOfTokenExchangeConfig: OnBehalfOfTokenExchangeConfigSchema.describe(
      "Configuration for on-behalf-of token exchange",
    ).optional(),
    ClientAuthenticationMethod: z.enum([
      "CLIENT_SECRET_BASIC",
      "CLIENT_SECRET_POST",
      "AWS_IAM_ID_TOKEN_JWT",
    ]).describe(
      "The client authentication method used when authenticating with the token endpoint",
    ).optional(),
  }).describe("The output configuration for the OAuth2 provider").optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the OAuth2 credential provider",
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

/** Swamp extension model for BedrockAgentCore OAuth2CredentialProvider. Registered at `@swamp/aws/bedrockagentcore/oauth2credential-provider`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/oauth2credential-provider",
  version: "2026.06.15.1",
  upgrades: [
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
      toVersion: "2026.05.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.05.1",
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
      description: "BedrockAgentCore OAuth2CredentialProvider resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore OAuth2CredentialProvider",
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
          "AWS::BedrockAgentCore::OAuth2CredentialProvider",
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
      description: "Get a BedrockAgentCore OAuth2CredentialProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore OAuth2CredentialProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BedrockAgentCore::OAuth2CredentialProvider",
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
      description: "Update a BedrockAgentCore OAuth2CredentialProvider",
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
        const identifier = existing.CredentialProviderArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::OAuth2CredentialProvider",
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
          "AWS::BedrockAgentCore::OAuth2CredentialProvider",
          identifier,
          currentState,
          desiredState,
          ["Name", "CredentialProviderVendor"],
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
      description: "Delete a BedrockAgentCore OAuth2CredentialProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore OAuth2CredentialProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::OAuth2CredentialProvider",
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
      description:
        "Sync BedrockAgentCore OAuth2CredentialProvider state from AWS",
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
        const identifier = existing.CredentialProviderArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::OAuth2CredentialProvider",
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
