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

// Auto-generated extension model for @swamp/aws/cognito/user-pool
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Cognito UserPool (AWS::Cognito::UserPool).
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

const PasswordPolicySchema = z.object({
  MinimumLength: z.number().int().optional(),
  RequireLowercase: z.boolean().optional(),
  RequireNumbers: z.boolean().optional(),
  RequireSymbols: z.boolean().optional(),
  RequireUppercase: z.boolean().optional(),
  TemporaryPasswordValidityDays: z.number().int().optional(),
  PasswordHistorySize: z.number().int().optional(),
});

const SignInPolicySchema = z.object({
  AllowedFirstAuthFactors: z.array(z.string()).optional(),
});

const RecoveryOptionSchema = z.object({
  Name: z.string().optional(),
  Priority: z.number().int().optional(),
});

const InviteMessageTemplateSchema = z.object({
  EmailMessage: z.string().optional(),
  EmailSubject: z.string().optional(),
  SMSMessage: z.string().optional(),
});

const CustomEmailSenderSchema = z.object({
  LambdaVersion: z.string().optional(),
  LambdaArn: z.string().optional(),
});

const CustomSMSSenderSchema = z.object({
  LambdaVersion: z.string().optional(),
  LambdaArn: z.string().optional(),
});

const PreTokenGenerationConfigSchema = z.object({
  LambdaVersion: z.string().optional(),
  LambdaArn: z.string().optional(),
});

const InboundFederationSchema = z.object({
  LambdaVersion: z.string().optional(),
  LambdaArn: z.string().optional(),
});

const NumberAttributeConstraintsSchema = z.object({
  MaxValue: z.string().optional(),
  MinValue: z.string().optional(),
});

const StringAttributeConstraintsSchema = z.object({
  MaxLength: z.string().optional(),
  MinLength: z.string().optional(),
});

const SchemaAttributeSchema = z.object({
  AttributeDataType: z.string().optional(),
  DeveloperOnlyAttribute: z.boolean().optional(),
  Mutable: z.boolean().optional(),
  Name: z.string().optional(),
  NumberAttributeConstraints: NumberAttributeConstraintsSchema.optional(),
  StringAttributeConstraints: StringAttributeConstraintsSchema.optional(),
  Required: z.boolean().optional(),
});

const AdvancedSecurityAdditionalFlowsSchema = z.object({
  CustomAuthMode: z.string().optional(),
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
  UserPoolName: z.string().min(1).max(128).optional(),
  Policies: z.object({
    PasswordPolicy: PasswordPolicySchema.optional(),
    SignInPolicy: SignInPolicySchema.optional(),
  }).optional(),
  AccountRecoverySetting: z.object({
    RecoveryMechanisms: z.array(RecoveryOptionSchema).optional(),
  }).optional(),
  AdminCreateUserConfig: z.object({
    AllowAdminCreateUserOnly: z.boolean().optional(),
    InviteMessageTemplate: InviteMessageTemplateSchema.optional(),
    UnusedAccountValidityDays: z.number().int().optional(),
  }).optional(),
  AliasAttributes: z.array(z.string()).optional(),
  UsernameAttributes: z.array(z.string()).optional(),
  AutoVerifiedAttributes: z.array(z.string()).optional(),
  DeviceConfiguration: z.object({
    ChallengeRequiredOnNewDevice: z.boolean().optional(),
    DeviceOnlyRememberedOnUserPrompt: z.boolean().optional(),
  }).optional(),
  EmailConfiguration: z.object({
    ReplyToEmailAddress: z.string().optional(),
    SourceArn: z.string().optional(),
    From: z.string().optional(),
    ConfigurationSet: z.string().optional(),
    EmailSendingAccount: z.string().optional(),
  }).optional(),
  EmailVerificationMessage: z.string().min(6).max(20000).optional(),
  EmailVerificationSubject: z.string().min(1).max(140).optional(),
  DeletionProtection: z.string().optional(),
  LambdaConfig: z.object({
    CreateAuthChallenge: z.string().optional(),
    CustomMessage: z.string().optional(),
    DefineAuthChallenge: z.string().optional(),
    PostAuthentication: z.string().optional(),
    PostConfirmation: z.string().optional(),
    PreAuthentication: z.string().optional(),
    PreSignUp: z.string().optional(),
    VerifyAuthChallengeResponse: z.string().optional(),
    UserMigration: z.string().optional(),
    PreTokenGeneration: z.string().optional(),
    CustomEmailSender: CustomEmailSenderSchema.optional(),
    CustomSMSSender: CustomSMSSenderSchema.optional(),
    KMSKeyID: z.string().optional(),
    PreTokenGenerationConfig: PreTokenGenerationConfigSchema.optional(),
    InboundFederation: InboundFederationSchema.optional(),
  }).optional(),
  MfaConfiguration: z.string().optional(),
  EnabledMfas: z.array(z.string()).optional(),
  SmsAuthenticationMessage: z.string().min(6).max(140).optional(),
  EmailAuthenticationMessage: z.string().min(6).max(20000).optional(),
  EmailAuthenticationSubject: z.string().min(1).max(140).optional(),
  SmsConfiguration: z.object({
    ExternalId: z.string().optional(),
    SnsCallerArn: z.string().optional(),
    SnsRegion: z.string().optional(),
  }).optional(),
  SmsVerificationMessage: z.string().min(6).max(140).optional(),
  WebAuthnRelyingPartyID: z.string().min(1).max(63).optional(),
  WebAuthnUserVerification: z.string().min(1).max(9).optional(),
  WebAuthnFactorConfiguration: z.enum([
    "SINGLE_FACTOR",
    "MULTI_FACTOR_WITH_USER_VERIFICATION",
  ]).optional(),
  Schema: z.array(SchemaAttributeSchema).optional(),
  UsernameConfiguration: z.object({
    CaseSensitive: z.boolean().optional(),
  }).optional(),
  UserAttributeUpdateSettings: z.object({
    AttributesRequireVerificationBeforeUpdate: z.array(z.string()),
  }).optional(),
  UserPoolTags: z.record(z.string(), z.string()).optional(),
  VerificationMessageTemplate: z.object({
    DefaultEmailOption: z.string().optional(),
    EmailMessage: z.string().optional(),
    EmailMessageByLink: z.string().optional(),
    EmailSubject: z.string().optional(),
    EmailSubjectByLink: z.string().optional(),
    SmsMessage: z.string().optional(),
  }).optional(),
  UserPoolAddOns: z.object({
    AdvancedSecurityMode: z.string().optional(),
    AdvancedSecurityAdditionalFlows: AdvancedSecurityAdditionalFlowsSchema
      .optional(),
  }).optional(),
  UserPoolTier: z.enum(["LITE", "ESSENTIALS", "PLUS"]).optional(),
});

const StateSchema = z.object({
  UserPoolName: z.string().optional(),
  Policies: z.object({
    PasswordPolicy: PasswordPolicySchema,
    SignInPolicy: SignInPolicySchema,
  }).optional(),
  AccountRecoverySetting: z.object({
    RecoveryMechanisms: z.array(RecoveryOptionSchema),
  }).optional(),
  AdminCreateUserConfig: z.object({
    AllowAdminCreateUserOnly: z.boolean(),
    InviteMessageTemplate: InviteMessageTemplateSchema,
    UnusedAccountValidityDays: z.number(),
  }).optional(),
  AliasAttributes: z.array(z.string()).optional(),
  UsernameAttributes: z.array(z.string()).optional(),
  AutoVerifiedAttributes: z.array(z.string()).optional(),
  DeviceConfiguration: z.object({
    ChallengeRequiredOnNewDevice: z.boolean(),
    DeviceOnlyRememberedOnUserPrompt: z.boolean(),
  }).optional(),
  EmailConfiguration: z.object({
    ReplyToEmailAddress: z.string(),
    SourceArn: z.string(),
    From: z.string(),
    ConfigurationSet: z.string(),
    EmailSendingAccount: z.string(),
  }).optional(),
  EmailVerificationMessage: z.string().optional(),
  EmailVerificationSubject: z.string().optional(),
  DeletionProtection: z.string().optional(),
  LambdaConfig: z.object({
    CreateAuthChallenge: z.string(),
    CustomMessage: z.string(),
    DefineAuthChallenge: z.string(),
    PostAuthentication: z.string(),
    PostConfirmation: z.string(),
    PreAuthentication: z.string(),
    PreSignUp: z.string(),
    VerifyAuthChallengeResponse: z.string(),
    UserMigration: z.string(),
    PreTokenGeneration: z.string(),
    CustomEmailSender: CustomEmailSenderSchema,
    CustomSMSSender: CustomSMSSenderSchema,
    KMSKeyID: z.string(),
    PreTokenGenerationConfig: PreTokenGenerationConfigSchema,
    InboundFederation: InboundFederationSchema,
  }).optional(),
  MfaConfiguration: z.string().optional(),
  EnabledMfas: z.array(z.string()).optional(),
  SmsAuthenticationMessage: z.string().optional(),
  EmailAuthenticationMessage: z.string().optional(),
  EmailAuthenticationSubject: z.string().optional(),
  SmsConfiguration: z.object({
    ExternalId: z.string(),
    SnsCallerArn: z.string(),
    SnsRegion: z.string(),
  }).optional(),
  SmsVerificationMessage: z.string().optional(),
  WebAuthnRelyingPartyID: z.string().optional(),
  WebAuthnUserVerification: z.string().optional(),
  WebAuthnFactorConfiguration: z.string().optional(),
  Schema: z.array(SchemaAttributeSchema).optional(),
  UsernameConfiguration: z.object({
    CaseSensitive: z.boolean(),
  }).optional(),
  UserAttributeUpdateSettings: z.object({
    AttributesRequireVerificationBeforeUpdate: z.array(z.string()),
  }).optional(),
  UserPoolTags: z.record(z.string(), z.unknown()).optional(),
  VerificationMessageTemplate: z.object({
    DefaultEmailOption: z.string(),
    EmailMessage: z.string(),
    EmailMessageByLink: z.string(),
    EmailSubject: z.string(),
    EmailSubjectByLink: z.string(),
    SmsMessage: z.string(),
  }).optional(),
  UserPoolAddOns: z.object({
    AdvancedSecurityMode: z.string(),
    AdvancedSecurityAdditionalFlows: AdvancedSecurityAdditionalFlowsSchema,
  }).optional(),
  ProviderName: z.string().optional(),
  ProviderURL: z.string().optional(),
  Arn: z.string().optional(),
  UserPoolId: z.string(),
  UserPoolTier: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  UserPoolName: z.string().min(1).max(128).optional(),
  Policies: z.object({
    PasswordPolicy: PasswordPolicySchema.optional(),
    SignInPolicy: SignInPolicySchema.optional(),
  }).optional(),
  AccountRecoverySetting: z.object({
    RecoveryMechanisms: z.array(RecoveryOptionSchema).optional(),
  }).optional(),
  AdminCreateUserConfig: z.object({
    AllowAdminCreateUserOnly: z.boolean().optional(),
    InviteMessageTemplate: InviteMessageTemplateSchema.optional(),
    UnusedAccountValidityDays: z.number().int().optional(),
  }).optional(),
  AliasAttributes: z.array(z.string()).optional(),
  UsernameAttributes: z.array(z.string()).optional(),
  AutoVerifiedAttributes: z.array(z.string()).optional(),
  DeviceConfiguration: z.object({
    ChallengeRequiredOnNewDevice: z.boolean().optional(),
    DeviceOnlyRememberedOnUserPrompt: z.boolean().optional(),
  }).optional(),
  EmailConfiguration: z.object({
    ReplyToEmailAddress: z.string().optional(),
    SourceArn: z.string().optional(),
    From: z.string().optional(),
    ConfigurationSet: z.string().optional(),
    EmailSendingAccount: z.string().optional(),
  }).optional(),
  EmailVerificationMessage: z.string().min(6).max(20000).optional(),
  EmailVerificationSubject: z.string().min(1).max(140).optional(),
  DeletionProtection: z.string().optional(),
  LambdaConfig: z.object({
    CreateAuthChallenge: z.string().optional(),
    CustomMessage: z.string().optional(),
    DefineAuthChallenge: z.string().optional(),
    PostAuthentication: z.string().optional(),
    PostConfirmation: z.string().optional(),
    PreAuthentication: z.string().optional(),
    PreSignUp: z.string().optional(),
    VerifyAuthChallengeResponse: z.string().optional(),
    UserMigration: z.string().optional(),
    PreTokenGeneration: z.string().optional(),
    CustomEmailSender: CustomEmailSenderSchema.optional(),
    CustomSMSSender: CustomSMSSenderSchema.optional(),
    KMSKeyID: z.string().optional(),
    PreTokenGenerationConfig: PreTokenGenerationConfigSchema.optional(),
    InboundFederation: InboundFederationSchema.optional(),
  }).optional(),
  MfaConfiguration: z.string().optional(),
  EnabledMfas: z.array(z.string()).optional(),
  SmsAuthenticationMessage: z.string().min(6).max(140).optional(),
  EmailAuthenticationMessage: z.string().min(6).max(20000).optional(),
  EmailAuthenticationSubject: z.string().min(1).max(140).optional(),
  SmsConfiguration: z.object({
    ExternalId: z.string().optional(),
    SnsCallerArn: z.string().optional(),
    SnsRegion: z.string().optional(),
  }).optional(),
  SmsVerificationMessage: z.string().min(6).max(140).optional(),
  WebAuthnRelyingPartyID: z.string().min(1).max(63).optional(),
  WebAuthnUserVerification: z.string().min(1).max(9).optional(),
  WebAuthnFactorConfiguration: z.enum([
    "SINGLE_FACTOR",
    "MULTI_FACTOR_WITH_USER_VERIFICATION",
  ]).optional(),
  Schema: z.array(SchemaAttributeSchema).optional(),
  UsernameConfiguration: z.object({
    CaseSensitive: z.boolean().optional(),
  }).optional(),
  UserAttributeUpdateSettings: z.object({
    AttributesRequireVerificationBeforeUpdate: z.array(z.string()).optional(),
  }).optional(),
  UserPoolTags: z.record(z.string(), z.string()).optional(),
  VerificationMessageTemplate: z.object({
    DefaultEmailOption: z.string().optional(),
    EmailMessage: z.string().optional(),
    EmailMessageByLink: z.string().optional(),
    EmailSubject: z.string().optional(),
    EmailSubjectByLink: z.string().optional(),
    SmsMessage: z.string().optional(),
  }).optional(),
  UserPoolAddOns: z.object({
    AdvancedSecurityMode: z.string().optional(),
    AdvancedSecurityAdditionalFlows: AdvancedSecurityAdditionalFlowsSchema
      .optional(),
  }).optional(),
  UserPoolTier: z.enum(["LITE", "ESSENTIALS", "PLUS"]).optional(),
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
  version: "2026.06.08.1",
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
  },
};
