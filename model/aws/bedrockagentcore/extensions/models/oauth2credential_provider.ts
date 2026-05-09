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
  OnBehalfOfTokenExchangeConfig: OnBehalfOfTokenExchangeConfigSchema.describe(
    "Configuration for on-behalf-of token exchange",
  ).optional(),
});

const GoogleOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048),
});

const GithubOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048),
});

const SlackOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048),
});

const SalesforceOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048),
});

const MicrosoftOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048),
  TenantId: z.string().min(1).max(2048).describe(
    "The Microsoft Entra ID tenant ID",
  ).optional(),
});

const AtlassianOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048),
});

const LinkedinOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048),
});

const IncludedOauth2ProviderConfigInputSchema = z.object({
  ClientId: z.string().min(1).max(256),
  ClientSecret: z.string().min(1).max(2048),
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
  CallbackUrl: z.string().optional(),
  Oauth2ProviderConfigOutput: z.object({
    OauthDiscovery: Oauth2DiscoverySchema,
    ClientId: z.string(),
    OnBehalfOfTokenExchangeConfig: OnBehalfOfTokenExchangeConfigSchema,
  }).optional(),
  CreatedTime: z.string().optional(),
  LastUpdatedTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
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
  }).describe("The output configuration for the OAuth2 provider").optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the OAuth2 credential provider",
  ).optional(),
});

/** Swamp extension model for BedrockAgentCore OAuth2CredentialProvider. Registered at `@swamp/aws/bedrockagentcore/oauth2credential-provider`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/oauth2credential-provider",
  version: "2026.05.09.1",
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
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::OAuth2CredentialProvider",
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
      description: "Get a BedrockAgentCore OAuth2CredentialProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore OAuth2CredentialProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BedrockAgentCore::OAuth2CredentialProvider",
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
      description: "Update a BedrockAgentCore OAuth2CredentialProvider",
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
        const identifier = existing.CredentialProviderArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::OAuth2CredentialProvider",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BedrockAgentCore::OAuth2CredentialProvider",
          identifier,
          currentState,
          desiredState,
          ["Name", "CredentialProviderVendor"],
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
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::OAuth2CredentialProvider",
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
      description:
        "Sync BedrockAgentCore OAuth2CredentialProvider state from AWS",
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
        const identifier = existing.CredentialProviderArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::OAuth2CredentialProvider",
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
