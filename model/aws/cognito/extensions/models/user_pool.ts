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

// Auto-generated extension model for @swamp/aws/cognito/user-pool
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Cognito UserPool (AWS::Cognito::UserPool).
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

const PasswordPolicySchema = z.object({
  RequireNumbers: z.boolean().optional(),
  MinimumLength: z.number().int().optional(),
  TemporaryPasswordValidityDays: z.number().int().optional(),
  RequireUppercase: z.boolean().optional(),
  RequireLowercase: z.boolean().optional(),
  RequireSymbols: z.boolean().optional(),
  PasswordHistorySize: z.number().int().optional(),
});

const SignInPolicySchema = z.object({
  AllowedFirstAuthFactors: z.array(z.string()).optional(),
});

const StringAttributeConstraintsSchema = z.object({
  MinLength: z.string().optional(),
  MaxLength: z.string().optional(),
});

const NumberAttributeConstraintsSchema = z.object({
  MinValue: z.string().optional(),
  MaxValue: z.string().optional(),
});

const SchemaAttributeSchema = z.object({
  DeveloperOnlyAttribute: z.boolean().optional(),
  Mutable: z.boolean().optional(),
  AttributeDataType: z.string().optional(),
  StringAttributeConstraints: StringAttributeConstraintsSchema.optional(),
  Required: z.boolean().optional(),
  NumberAttributeConstraints: NumberAttributeConstraintsSchema.optional(),
  Name: z.string().optional(),
});

const InviteMessageTemplateSchema = z.object({
  EmailMessage: z.string().optional(),
  SMSMessage: z.string().optional(),
  EmailSubject: z.string().optional(),
});

const EumsSmsConfigurationSchema = z.object({
  InTemplateId: z.string().optional(),
  InEntityId: z.string().optional(),
  ExternalId: z.string().optional(),
  CallerArn: z.string(),
  ConfigurationSetName: z.string().optional(),
  Region: z.string().optional(),
  OriginationIdentity: z.string().optional(),
});

const RecoveryOptionSchema = z.object({
  Priority: z.number().int().optional(),
  Name: z.string().optional(),
});

const AdvancedSecurityAdditionalFlowsSchema = z.object({
  CustomAuthMode: z.string().optional(),
});

const InboundFederationSchema = z.object({
  LambdaArn: z.string().optional(),
  LambdaVersion: z.string().optional(),
});

const CustomSMSSenderSchema = z.object({
  LambdaArn: z.string().optional(),
  LambdaVersion: z.string().optional(),
});

const PreTokenGenerationConfigSchema = z.object({
  LambdaArn: z.string().optional(),
  LambdaVersion: z.string().optional(),
});

const CustomEmailSenderSchema = z.object({
  LambdaArn: z.string().optional(),
  LambdaVersion: z.string().optional(),
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
  UserPoolTags: z.record(z.string(), z.string()).optional(),
  Policies: z.object({
    PasswordPolicy: PasswordPolicySchema.optional(),
    SignInPolicy: SignInPolicySchema.optional(),
  }).optional(),
  KeyConfiguration: z.object({
    KeyType: z.enum(["AWS_OWNED_KEY", "CUSTOMER_MANAGED_KEY"]).optional(),
    KmsKeyArn: z.string().regex(
      new RegExp(
        "arn:[\\w+=/,.@-]+:[\\w+=/,.@-]+:([\\w+=/,.@-]*)?:[0-9]+:[\\w+=/,.@-]+(:[\\w+=/,.@-]+)?(:[\\w+=/,.@-]+)?",
      ),
    ).optional(),
  }).optional(),
  Schema: z.array(SchemaAttributeSchema).optional(),
  AdminCreateUserConfig: z.object({
    InviteMessageTemplate: InviteMessageTemplateSchema.optional(),
    UnusedAccountValidityDays: z.number().int().optional(),
    AllowAdminCreateUserOnly: z.boolean().optional(),
  }).optional(),
  UserPoolTier: z.enum(["LITE", "ESSENTIALS", "PLUS"]).optional(),
  UsernameConfiguration: z.object({
    CaseSensitive: z.boolean().optional(),
  }).optional(),
  UserPoolName: z.string().min(1).max(128).optional(),
  SmsVerificationMessage: z.string().min(6).max(140).optional(),
  UserAttributeUpdateSettings: z.object({
    AttributesRequireVerificationBeforeUpdate: z.array(z.string()),
  }).optional(),
  EmailConfiguration: z.object({
    ReplyToEmailAddress: z.string().optional(),
    ConfigurationSet: z.string().optional(),
    EmailSendingAccount: z.string().optional(),
    SourceArn: z.string().optional(),
    From: z.string().optional(),
  }).optional(),
  SmsConfiguration: z.object({
    SnsRegion: z.string().optional(),
    ExternalId: z.string().optional(),
    EumsSms: EumsSmsConfigurationSchema.optional(),
    SnsCallerArn: z.string().optional(),
  }).optional(),
  EmailVerificationSubject: z.string().min(1).max(140).optional(),
  WebAuthnRelyingPartyID: z.string().min(1).max(63).optional(),
  EmailAuthenticationSubject: z.string().min(1).max(140).optional(),
  AccountRecoverySetting: z.object({
    RecoveryMechanisms: z.array(RecoveryOptionSchema).optional(),
  }).optional(),
  VerificationMessageTemplate: z.object({
    EmailMessageByLink: z.string().optional(),
    EmailMessage: z.string().optional(),
    SmsMessage: z.string().optional(),
    EmailSubject: z.string().optional(),
    DefaultEmailOption: z.string().optional(),
    EmailSubjectByLink: z.string().optional(),
  }).optional(),
  IssuerConfiguration: z.object({
    Type: z.enum(["ORIGINAL", "UPDATED"]).optional(),
  }).optional(),
  MfaConfiguration: z.string().optional(),
  DeletionProtection: z.string().optional(),
  WebAuthnFactorConfiguration: z.enum([
    "SINGLE_FACTOR",
    "MULTI_FACTOR_WITH_USER_VERIFICATION",
  ]).optional(),
  SmsAuthenticationMessage: z.string().min(6).max(140).optional(),
  WebAuthnUserVerification: z.string().min(1).max(9).optional(),
  UserPoolAddOns: z.object({
    AdvancedSecurityAdditionalFlows: AdvancedSecurityAdditionalFlowsSchema
      .optional(),
    AdvancedSecurityMode: z.string().optional(),
  }).optional(),
  EmailAuthenticationMessage: z.string().min(6).max(20000).optional(),
  AliasAttributes: z.array(z.string()).optional(),
  EnabledMfas: z.array(z.string()).optional(),
  LambdaConfig: z.object({
    CreateAuthChallenge: z.string().optional(),
    PreSignUp: z.string().optional(),
    KMSKeyID: z.string().optional(),
    UserMigration: z.string().optional(),
    PostAuthentication: z.string().optional(),
    VerifyAuthChallengeResponse: z.string().optional(),
    PreAuthentication: z.string().optional(),
    DefineAuthChallenge: z.string().optional(),
    PreTokenGeneration: z.string().optional(),
    InboundFederation: InboundFederationSchema.optional(),
    CustomSMSSender: CustomSMSSenderSchema.optional(),
    PostConfirmation: z.string().optional(),
    CustomMessage: z.string().optional(),
    PreTokenGenerationConfig: PreTokenGenerationConfigSchema.optional(),
    CustomEmailSender: CustomEmailSenderSchema.optional(),
  }).optional(),
  UsernameAttributes: z.array(z.string()).optional(),
  AutoVerifiedAttributes: z.array(z.string()).optional(),
  DeviceConfiguration: z.object({
    DeviceOnlyRememberedOnUserPrompt: z.boolean().optional(),
    ChallengeRequiredOnNewDevice: z.boolean().optional(),
  }).optional(),
  EmailVerificationMessage: z.string().min(6).max(20000).optional(),
});

const StateSchema = z.object({
  UserPoolTags: z.record(z.string(), z.unknown()).optional(),
  Policies: z.object({
    PasswordPolicy: PasswordPolicySchema,
    SignInPolicy: SignInPolicySchema,
  }).optional(),
  KeyConfiguration: z.object({
    KeyType: z.string(),
    KmsKeyArn: z.string(),
  }).optional(),
  Schema: z.array(SchemaAttributeSchema).optional(),
  AdminCreateUserConfig: z.object({
    InviteMessageTemplate: InviteMessageTemplateSchema,
    UnusedAccountValidityDays: z.number(),
    AllowAdminCreateUserOnly: z.boolean(),
  }).optional(),
  UserPoolTier: z.string().optional(),
  UsernameConfiguration: z.object({
    CaseSensitive: z.boolean(),
  }).optional(),
  UserPoolName: z.string().optional(),
  SmsVerificationMessage: z.string().optional(),
  UserAttributeUpdateSettings: z.object({
    AttributesRequireVerificationBeforeUpdate: z.array(z.string()),
  }).optional(),
  EmailConfiguration: z.object({
    ReplyToEmailAddress: z.string(),
    ConfigurationSet: z.string(),
    EmailSendingAccount: z.string(),
    SourceArn: z.string(),
    From: z.string(),
  }).optional(),
  SmsConfiguration: z.object({
    SnsRegion: z.string(),
    ExternalId: z.string(),
    EumsSms: EumsSmsConfigurationSchema,
    SnsCallerArn: z.string(),
  }).optional(),
  EmailVerificationSubject: z.string().optional(),
  WebAuthnRelyingPartyID: z.string().optional(),
  EmailAuthenticationSubject: z.string().optional(),
  AccountRecoverySetting: z.object({
    RecoveryMechanisms: z.array(RecoveryOptionSchema),
  }).optional(),
  VerificationMessageTemplate: z.object({
    EmailMessageByLink: z.string(),
    EmailMessage: z.string(),
    SmsMessage: z.string(),
    EmailSubject: z.string(),
    DefaultEmailOption: z.string(),
    EmailSubjectByLink: z.string(),
  }).optional(),
  IssuerConfiguration: z.object({
    Type: z.string(),
  }).optional(),
  ProviderURL: z.string().optional(),
  MfaConfiguration: z.string().optional(),
  DeletionProtection: z.string().optional(),
  WebAuthnFactorConfiguration: z.string().optional(),
  SmsAuthenticationMessage: z.string().optional(),
  WebAuthnUserVerification: z.string().optional(),
  UserPoolAddOns: z.object({
    AdvancedSecurityAdditionalFlows: AdvancedSecurityAdditionalFlowsSchema,
    AdvancedSecurityMode: z.string(),
  }).optional(),
  ProviderName: z.string().optional(),
  UserPoolId: z.string(),
  EmailAuthenticationMessage: z.string().optional(),
  AliasAttributes: z.array(z.string()).optional(),
  EnabledMfas: z.array(z.string()).optional(),
  LambdaConfig: z.object({
    CreateAuthChallenge: z.string(),
    PreSignUp: z.string(),
    KMSKeyID: z.string(),
    UserMigration: z.string(),
    PostAuthentication: z.string(),
    VerifyAuthChallengeResponse: z.string(),
    PreAuthentication: z.string(),
    DefineAuthChallenge: z.string(),
    PreTokenGeneration: z.string(),
    InboundFederation: InboundFederationSchema,
    CustomSMSSender: CustomSMSSenderSchema,
    PostConfirmation: z.string(),
    CustomMessage: z.string(),
    PreTokenGenerationConfig: PreTokenGenerationConfigSchema,
    CustomEmailSender: CustomEmailSenderSchema,
  }).optional(),
  Arn: z.string().optional(),
  UsernameAttributes: z.array(z.string()).optional(),
  AutoVerifiedAttributes: z.array(z.string()).optional(),
  DeviceConfiguration: z.object({
    DeviceOnlyRememberedOnUserPrompt: z.boolean(),
    ChallengeRequiredOnNewDevice: z.boolean(),
  }).optional(),
  EmailVerificationMessage: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  UserPoolTags: z.record(z.string(), z.string()).optional(),
  Policies: z.object({
    PasswordPolicy: PasswordPolicySchema.optional(),
    SignInPolicy: SignInPolicySchema.optional(),
  }).optional(),
  KeyConfiguration: z.object({
    KeyType: z.enum(["AWS_OWNED_KEY", "CUSTOMER_MANAGED_KEY"]).optional(),
    KmsKeyArn: z.string().regex(
      new RegExp(
        "arn:[\\w+=/,.@-]+:[\\w+=/,.@-]+:([\\w+=/,.@-]*)?:[0-9]+:[\\w+=/,.@-]+(:[\\w+=/,.@-]+)?(:[\\w+=/,.@-]+)?",
      ),
    ).optional(),
  }).optional(),
  Schema: z.array(SchemaAttributeSchema).optional(),
  AdminCreateUserConfig: z.object({
    InviteMessageTemplate: InviteMessageTemplateSchema.optional(),
    UnusedAccountValidityDays: z.number().int().optional(),
    AllowAdminCreateUserOnly: z.boolean().optional(),
  }).optional(),
  UserPoolTier: z.enum(["LITE", "ESSENTIALS", "PLUS"]).optional(),
  UsernameConfiguration: z.object({
    CaseSensitive: z.boolean().optional(),
  }).optional(),
  UserPoolName: z.string().min(1).max(128).optional(),
  SmsVerificationMessage: z.string().min(6).max(140).optional(),
  UserAttributeUpdateSettings: z.object({
    AttributesRequireVerificationBeforeUpdate: z.array(z.string()).optional(),
  }).optional(),
  EmailConfiguration: z.object({
    ReplyToEmailAddress: z.string().optional(),
    ConfigurationSet: z.string().optional(),
    EmailSendingAccount: z.string().optional(),
    SourceArn: z.string().optional(),
    From: z.string().optional(),
  }).optional(),
  SmsConfiguration: z.object({
    SnsRegion: z.string().optional(),
    ExternalId: z.string().optional(),
    EumsSms: EumsSmsConfigurationSchema.optional(),
    SnsCallerArn: z.string().optional(),
  }).optional(),
  EmailVerificationSubject: z.string().min(1).max(140).optional(),
  WebAuthnRelyingPartyID: z.string().min(1).max(63).optional(),
  EmailAuthenticationSubject: z.string().min(1).max(140).optional(),
  AccountRecoverySetting: z.object({
    RecoveryMechanisms: z.array(RecoveryOptionSchema).optional(),
  }).optional(),
  VerificationMessageTemplate: z.object({
    EmailMessageByLink: z.string().optional(),
    EmailMessage: z.string().optional(),
    SmsMessage: z.string().optional(),
    EmailSubject: z.string().optional(),
    DefaultEmailOption: z.string().optional(),
    EmailSubjectByLink: z.string().optional(),
  }).optional(),
  IssuerConfiguration: z.object({
    Type: z.enum(["ORIGINAL", "UPDATED"]).optional(),
  }).optional(),
  MfaConfiguration: z.string().optional(),
  DeletionProtection: z.string().optional(),
  WebAuthnFactorConfiguration: z.enum([
    "SINGLE_FACTOR",
    "MULTI_FACTOR_WITH_USER_VERIFICATION",
  ]).optional(),
  SmsAuthenticationMessage: z.string().min(6).max(140).optional(),
  WebAuthnUserVerification: z.string().min(1).max(9).optional(),
  UserPoolAddOns: z.object({
    AdvancedSecurityAdditionalFlows: AdvancedSecurityAdditionalFlowsSchema
      .optional(),
    AdvancedSecurityMode: z.string().optional(),
  }).optional(),
  EmailAuthenticationMessage: z.string().min(6).max(20000).optional(),
  AliasAttributes: z.array(z.string()).optional(),
  EnabledMfas: z.array(z.string()).optional(),
  LambdaConfig: z.object({
    CreateAuthChallenge: z.string().optional(),
    PreSignUp: z.string().optional(),
    KMSKeyID: z.string().optional(),
    UserMigration: z.string().optional(),
    PostAuthentication: z.string().optional(),
    VerifyAuthChallengeResponse: z.string().optional(),
    PreAuthentication: z.string().optional(),
    DefineAuthChallenge: z.string().optional(),
    PreTokenGeneration: z.string().optional(),
    InboundFederation: InboundFederationSchema.optional(),
    CustomSMSSender: CustomSMSSenderSchema.optional(),
    PostConfirmation: z.string().optional(),
    CustomMessage: z.string().optional(),
    PreTokenGenerationConfig: PreTokenGenerationConfigSchema.optional(),
    CustomEmailSender: CustomEmailSenderSchema.optional(),
  }).optional(),
  UsernameAttributes: z.array(z.string()).optional(),
  AutoVerifiedAttributes: z.array(z.string()).optional(),
  DeviceConfiguration: z.object({
    DeviceOnlyRememberedOnUserPrompt: z.boolean().optional(),
    ChallengeRequiredOnNewDevice: z.boolean().optional(),
  }).optional(),
  EmailVerificationMessage: z.string().min(6).max(20000).optional(),
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

/** Swamp extension model for Cognito UserPool. Registered at `@swamp/aws/cognito/user-pool`. */
export const model = {
  type: "@swamp/aws/cognito/user-pool",
  version: "2026.10.29.1",
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
      toVersion: "2026.05.01.1",
      description: "Added: WebAuthnFactorConfiguration",
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
    {
      toVersion: "2026.07.02.1",
      description: "Added: KeyConfiguration, IssuerConfiguration",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Cognito UserPool resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Cognito UserPool",
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
          "AWS::Cognito::UserPool",
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
      description: "Get a Cognito UserPool",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cognito UserPool",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Cognito::UserPool",
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
      description: "Update a Cognito UserPool",
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
        const identifier = existing.UserPoolId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Cognito::UserPool",
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
          "AWS::Cognito::UserPool",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a Cognito UserPool",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Cognito UserPool",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Cognito::UserPool",
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
      description: "Sync Cognito UserPool state from AWS",
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
        const identifier = existing.UserPoolId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Cognito::UserPool",
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
      description: "List Cognito UserPool resources",
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
          "AWS::Cognito::UserPool",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.UserPoolId?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
