// Auto-generated extension model for @swamp/aws/ses/email-identity
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SES EmailIdentity (AWS::SES::EmailIdentity).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
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
  EmailIdentity: z.string().describe("The email address or domain to verify."),
  ConfigurationSetAttributes: z.object({
    ConfigurationSetName: z.string().describe(
      "The configuration set to use by default when sending from this identity. Note that any configuration set defined in the email sending request takes precedence.",
    ).optional(),
  }).describe("Used to associate a configuration set with an email identity.")
    .optional(),
  DkimSigningAttributes: z.object({
    DomainSigningSelector: z.string().describe(
      "[Bring Your Own DKIM] A string that's used to identify a public key in the DNS configuration for a domain.",
    ).optional(),
    DomainSigningPrivateKey: z.string().describe(
      "[Bring Your Own DKIM] A private key that's used to generate a DKIM signature. The private key must use 1024 or 2048-bit RSA encryption, and must be encoded using base64 encoding.",
    ).optional(),
    NextSigningKeyLength: z.string().regex(
      new RegExp("RSA_1024_BIT|RSA_2048_BIT"),
    ).describe(
      "[Easy DKIM] The key length of the future DKIM key pair to be generated. This can be changed at most once per day.",
    ).optional(),
  }).describe(
    "If your request includes this object, Amazon SES configures the identity to use Bring Your Own DKIM (BYODKIM) for DKIM authentication purposes, or, configures the key length to be used for Easy DKIM.",
  ).optional(),
  DkimAttributes: z.object({
    SigningEnabled: z.boolean().describe(
      "Sets the DKIM signing configuration for the identity. When you set this value true, then the messages that are sent from the identity are signed using DKIM. If you set this value to false, your messages are sent without DKIM signing.",
    ).optional(),
  }).describe(
    "Used to enable or disable DKIM authentication for an email identity.",
  ).optional(),
  MailFromAttributes: z.object({
    MailFromDomain: z.string().describe(
      "The custom MAIL FROM domain that you want the verified identity to use",
    ).optional(),
    BehaviorOnMxFailure: z.string().regex(
      new RegExp("USE_DEFAULT_VALUE|REJECT_MESSAGE"),
    ).describe(
      "The action to take if the required MX record isn't found when you send an email. When you set this value to UseDefaultValue, the mail is sent using amazonses.com as the MAIL FROM domain. When you set this value to RejectMessage, the Amazon SES API v2 returns a MailFromDomainNotVerified error, and doesn't attempt to deliver the email.",
    ).optional(),
  }).describe(
    "Used to enable or disable the custom Mail-From domain configuration for an email identity.",
  ).optional(),
  FeedbackAttributes: z.object({
    EmailForwardingEnabled: z.boolean().describe(
      "If the value is true, you receive email notifications when bounce or complaint events occur",
    ).optional(),
  }).describe("Used to enable or disable feedback forwarding for an identity.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the email identity.",
  ).optional(),
});

const StateSchema = z.object({
  EmailIdentity: z.string(),
  ConfigurationSetAttributes: z.object({
    ConfigurationSetName: z.string(),
  }).optional(),
  DkimSigningAttributes: z.object({
    DomainSigningSelector: z.string(),
    DomainSigningPrivateKey: z.string(),
    NextSigningKeyLength: z.string(),
  }).optional(),
  DkimAttributes: z.object({
    SigningEnabled: z.boolean(),
  }).optional(),
  MailFromAttributes: z.object({
    MailFromDomain: z.string(),
    BehaviorOnMxFailure: z.string(),
  }).optional(),
  FeedbackAttributes: z.object({
    EmailForwardingEnabled: z.boolean(),
  }).optional(),
  DkimDNSTokenName1: z.string().optional(),
  DkimDNSTokenName2: z.string().optional(),
  DkimDNSTokenName3: z.string().optional(),
  DkimDNSTokenValue1: z.string().optional(),
  DkimDNSTokenValue2: z.string().optional(),
  DkimDNSTokenValue3: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  EmailIdentity: z.string().describe("The email address or domain to verify.")
    .optional(),
  ConfigurationSetAttributes: z.object({
    ConfigurationSetName: z.string().describe(
      "The configuration set to use by default when sending from this identity. Note that any configuration set defined in the email sending request takes precedence.",
    ).optional(),
  }).describe("Used to associate a configuration set with an email identity.")
    .optional(),
  DkimSigningAttributes: z.object({
    DomainSigningSelector: z.string().describe(
      "[Bring Your Own DKIM] A string that's used to identify a public key in the DNS configuration for a domain.",
    ).optional(),
    DomainSigningPrivateKey: z.string().describe(
      "[Bring Your Own DKIM] A private key that's used to generate a DKIM signature. The private key must use 1024 or 2048-bit RSA encryption, and must be encoded using base64 encoding.",
    ).optional(),
    NextSigningKeyLength: z.string().regex(
      new RegExp("RSA_1024_BIT|RSA_2048_BIT"),
    ).describe(
      "[Easy DKIM] The key length of the future DKIM key pair to be generated. This can be changed at most once per day.",
    ).optional(),
  }).describe(
    "If your request includes this object, Amazon SES configures the identity to use Bring Your Own DKIM (BYODKIM) for DKIM authentication purposes, or, configures the key length to be used for Easy DKIM.",
  ).optional(),
  DkimAttributes: z.object({
    SigningEnabled: z.boolean().describe(
      "Sets the DKIM signing configuration for the identity. When you set this value true, then the messages that are sent from the identity are signed using DKIM. If you set this value to false, your messages are sent without DKIM signing.",
    ).optional(),
  }).describe(
    "Used to enable or disable DKIM authentication for an email identity.",
  ).optional(),
  MailFromAttributes: z.object({
    MailFromDomain: z.string().describe(
      "The custom MAIL FROM domain that you want the verified identity to use",
    ).optional(),
    BehaviorOnMxFailure: z.string().regex(
      new RegExp("USE_DEFAULT_VALUE|REJECT_MESSAGE"),
    ).describe(
      "The action to take if the required MX record isn't found when you send an email. When you set this value to UseDefaultValue, the mail is sent using amazonses.com as the MAIL FROM domain. When you set this value to RejectMessage, the Amazon SES API v2 returns a MailFromDomainNotVerified error, and doesn't attempt to deliver the email.",
    ).optional(),
  }).describe(
    "Used to enable or disable the custom Mail-From domain configuration for an email identity.",
  ).optional(),
  FeedbackAttributes: z.object({
    EmailForwardingEnabled: z.boolean().describe(
      "If the value is true, you receive email notifications when bounce or complaint events occur",
    ).optional(),
  }).describe("Used to enable or disable feedback forwarding for an identity.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the email identity.",
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

/** Swamp extension model for SES EmailIdentity. Registered at `@swamp/aws/ses/email-identity`. */
export const model = {
  type: "@swamp/aws/ses/email-identity",
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
      description: "SES EmailIdentity resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SES EmailIdentity",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::SES::EmailIdentity",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.EmailIdentity ?? g.EmailIdentity)?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SES EmailIdentity",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES EmailIdentity",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SES::EmailIdentity",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.EmailIdentity ?? context.globalArgs.EmailIdentity)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a SES EmailIdentity",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.EmailIdentity?.toString() ?? "current").replace(
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
        const identifier = existing.EmailIdentity?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SES::EmailIdentity",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SES::EmailIdentity",
          identifier,
          currentState,
          desiredState,
          ["EmailIdentity"],
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
      description: "Delete a SES EmailIdentity",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SES EmailIdentity",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SES::EmailIdentity",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.EmailIdentity?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync SES EmailIdentity state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.EmailIdentity?.toString() ?? "current").replace(
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
        const identifier = existing.EmailIdentity?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SES::EmailIdentity",
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
