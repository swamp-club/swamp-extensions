// Auto-generated extension model for @swamp/aws/bedrockagentcore/payment-credential-provider
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore PaymentCredentialProvider (AWS::BedrockAgentCore::PaymentCredentialProvider).
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

const SecretReferenceSchema = z.object({
  SecretId: z.string().min(1).max(2048).describe(
    "The ID or ARN of the secret in AWS Secrets Manager",
  ),
  JsonKey: z.string().min(1).max(128).describe(
    "The JSON key within the secret that contains the credential value",
  ),
});

const CoinbaseCdpConfigurationInputSchema = z.object({
  ApiKeyId: z.string().min(1).max(512).describe("The Coinbase CDP API key ID"),
  ApiKeySecret: z.string().min(1).max(2048).describe(
    "The Coinbase CDP API key secret",
  ).optional(),
  ApiKeySecretSource: z.enum(["MANAGED", "EXTERNAL"]).describe(
    "The source of the secret. Use MANAGED for service-managed secrets or EXTERNAL for customer-provided secrets.",
  ).optional(),
  ApiKeySecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
  WalletSecret: z.string().min(1).max(2048).describe(
    "The Coinbase CDP wallet secret",
  ).optional(),
  WalletSecretSource: z.enum(["MANAGED", "EXTERNAL"]).describe(
    "The source of the secret. Use MANAGED for service-managed secrets or EXTERNAL for customer-provided secrets.",
  ).optional(),
  WalletSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
});

const StripePrivyConfigurationInputSchema = z.object({
  AppId: z.string().min(1).max(512).describe("The app ID provided by Privy"),
  AppSecret: z.string().min(1).max(2048).describe(
    "The app secret provided by Privy",
  ).optional(),
  AppSecretSource: z.enum(["MANAGED", "EXTERNAL"]).describe(
    "The source of the secret. Use MANAGED for service-managed secrets or EXTERNAL for customer-provided secrets.",
  ).optional(),
  AppSecretConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
  AuthorizationPrivateKey: z.string().min(1).max(4096).describe(
    "The authorization private key for the Stripe Privy integration",
  ).optional(),
  AuthorizationPrivateKeySource: z.enum(["MANAGED", "EXTERNAL"]).describe(
    "The source of the secret. Use MANAGED for service-managed secrets or EXTERNAL for customer-provided secrets.",
  ).optional(),
  AuthorizationPrivateKeyConfig: SecretReferenceSchema.describe(
    "A reference to a customer-provided secret stored in AWS Secrets Manager",
  ).optional(),
  AuthorizationId: z.string().min(1).max(512).describe(
    "The authorization ID for the Stripe Privy integration",
  ),
});

const SecretInfoSchema = z.object({
  SecretArn: z.string().regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b|aws-iso-e|aws-iso-f|aws-eusc):secretsmanager:[A-Za-z0-9-]{1,64}:[0-9]{12}:secret:[a-zA-Z0-9-_/+=.@!]+$",
    ),
  ).describe("The ARN of the secret in AWS Secrets Manager"),
});

const CoinbaseCdpConfigurationOutputSchema = z.object({
  ApiKeyId: z.string().min(1).max(512).describe("The Coinbase CDP API key ID"),
  ApiKeySecretArn: SecretInfoSchema.describe(
    "Contains information about a secret in AWS Secrets Manager",
  ),
  ApiKeySecretJsonKey: z.string().min(1).max(128).describe(
    "The JSON key within the secret that contains the API key secret value",
  ).optional(),
  ApiKeySecretSource: z.enum(["MANAGED", "EXTERNAL"]).describe(
    "The source of the secret. Use MANAGED for service-managed secrets or EXTERNAL for customer-provided secrets.",
  ).optional(),
  WalletSecretArn: SecretInfoSchema.describe(
    "Contains information about a secret in AWS Secrets Manager",
  ).optional(),
  WalletSecretJsonKey: z.string().min(1).max(128).describe(
    "The JSON key within the secret that contains the wallet secret value",
  ).optional(),
  WalletSecretSource: z.enum(["MANAGED", "EXTERNAL"]).describe(
    "The source of the secret. Use MANAGED for service-managed secrets or EXTERNAL for customer-provided secrets.",
  ).optional(),
});

const StripePrivyConfigurationOutputSchema = z.object({
  AppId: z.string().min(1).max(512).describe("The app ID provided by Privy"),
  AppSecretArn: SecretInfoSchema.describe(
    "Contains information about a secret in AWS Secrets Manager",
  ),
  AppSecretJsonKey: z.string().min(1).max(128).describe(
    "The JSON key within the secret that contains the app secret value",
  ).optional(),
  AppSecretSource: z.enum(["MANAGED", "EXTERNAL"]).describe(
    "The source of the secret. Use MANAGED for service-managed secrets or EXTERNAL for customer-provided secrets.",
  ).optional(),
  AuthorizationPrivateKeyArn: SecretInfoSchema.describe(
    "Contains information about a secret in AWS Secrets Manager",
  ),
  AuthorizationPrivateKeyJsonKey: z.string().min(1).max(128).describe(
    "The JSON key within the secret that contains the authorization private key value",
  ).optional(),
  AuthorizationPrivateKeySource: z.enum(["MANAGED", "EXTERNAL"]).describe(
    "The source of the secret. Use MANAGED for service-managed secrets or EXTERNAL for customer-provided secrets.",
  ).optional(),
  AuthorizationId: z.string().min(1).max(512).describe(
    "The authorization ID for the Stripe Privy integration",
  ),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\-_]+$"))
    .describe("Unique name for the payment credential provider"),
  CredentialProviderVendor: z.enum(["CoinbaseCDP", "StripePrivy"]).describe(
    "Supported vendor types for payment providers",
  ),
  ProviderConfigurationInput: z.object({
    CoinbaseCdpConfiguration: CoinbaseCdpConfigurationInputSchema.describe(
      "Coinbase CDP configuration with API credentials",
    ).optional(),
    StripePrivyConfiguration: StripePrivyConfigurationInputSchema.describe(
      "Stripe Privy configuration with credentials",
    ).optional(),
  }).describe(
    "Provider configuration input containing secrets for creation/update",
  ).optional(),
  ProviderConfigurationOutput: z.object({
    CoinbaseCdpConfiguration: CoinbaseCdpConfigurationOutputSchema.describe(
      "Coinbase CDP configuration output with secret ARNs",
    ).optional(),
    StripePrivyConfiguration: StripePrivyConfigurationOutputSchema.describe(
      "Stripe Privy configuration output with secret ARNs",
    ).optional(),
  }).describe(
    "Provider configuration output containing secret ARNs (no raw secrets)",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags for the payment credential provider")
    .optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  CredentialProviderVendor: z.string().optional(),
  ProviderConfigurationInput: z.object({
    CoinbaseCdpConfiguration: CoinbaseCdpConfigurationInputSchema,
    StripePrivyConfiguration: StripePrivyConfigurationInputSchema,
  }).optional(),
  CredentialProviderArn: z.string(),
  ProviderConfigurationOutput: z.object({
    CoinbaseCdpConfiguration: CoinbaseCdpConfigurationOutputSchema,
    StripePrivyConfiguration: StripePrivyConfigurationOutputSchema,
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
    .describe("Unique name for the payment credential provider").optional(),
  CredentialProviderVendor: z.enum(["CoinbaseCDP", "StripePrivy"]).describe(
    "Supported vendor types for payment providers",
  ).optional(),
  ProviderConfigurationInput: z.object({
    CoinbaseCdpConfiguration: CoinbaseCdpConfigurationInputSchema.describe(
      "Coinbase CDP configuration with API credentials",
    ).optional(),
    StripePrivyConfiguration: StripePrivyConfigurationInputSchema.describe(
      "Stripe Privy configuration with credentials",
    ).optional(),
  }).describe(
    "Provider configuration input containing secrets for creation/update",
  ).optional(),
  ProviderConfigurationOutput: z.object({
    CoinbaseCdpConfiguration: CoinbaseCdpConfigurationOutputSchema.describe(
      "Coinbase CDP configuration output with secret ARNs",
    ).optional(),
    StripePrivyConfiguration: StripePrivyConfigurationOutputSchema.describe(
      "Stripe Privy configuration output with secret ARNs",
    ).optional(),
  }).describe(
    "Provider configuration output containing secret ARNs (no raw secrets)",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags for the payment credential provider")
    .optional(),
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

/** Swamp extension model for BedrockAgentCore PaymentCredentialProvider. Registered at `@swamp/aws/bedrockagentcore/payment-credential-provider`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/payment-credential-provider",
  version: "2026.06.06.1",
  upgrades: [
    {
      toVersion: "2026.06.03.1",
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
      description: "BedrockAgentCore PaymentCredentialProvider resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore PaymentCredentialProvider",
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
          "AWS::BedrockAgentCore::PaymentCredentialProvider",
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
      description: "Get a BedrockAgentCore PaymentCredentialProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore PaymentCredentialProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BedrockAgentCore::PaymentCredentialProvider",
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
      description: "Update a BedrockAgentCore PaymentCredentialProvider",
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
          "AWS::BedrockAgentCore::PaymentCredentialProvider",
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
          "AWS::BedrockAgentCore::PaymentCredentialProvider",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a BedrockAgentCore PaymentCredentialProvider",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore PaymentCredentialProvider",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::PaymentCredentialProvider",
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
        "Sync BedrockAgentCore PaymentCredentialProvider state from AWS",
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
            "AWS::BedrockAgentCore::PaymentCredentialProvider",
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
