// Auto-generated extension model for @swamp/aws/iot/account-audit-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoT AccountAuditConfiguration (AWS::IoT::AccountAuditConfiguration).
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

const AuditCheckConfigurationSchema = z.object({
  Enabled: z.boolean().describe("True if the check is enabled.").optional(),
});

const CertExpirationCheckCustomConfigurationSchema = z.object({
  CertExpirationThresholdInDays: z.string().min(1).max(64).describe(
    "The configValue for configuring audit checks.",
  ).optional(),
});

const DeviceCertExpirationAuditCheckConfigurationSchema = z.object({
  Enabled: z.boolean().describe("True if the check is enabled.").optional(),
  Configuration: CertExpirationCheckCustomConfigurationSchema.describe(
    "A structure containing the configName and corresponding configValue for configuring audit checks.",
  ).optional(),
});

const CertAgeCheckCustomConfigurationSchema = z.object({
  CertAgeThresholdInDays: z.string().min(1).max(64).describe(
    "The configValue for configuring audit checks.",
  ).optional(),
});

const DeviceCertAgeAuditCheckConfigurationSchema = z.object({
  Enabled: z.boolean().describe("True if the check is enabled.").optional(),
  Configuration: CertAgeCheckCustomConfigurationSchema.describe(
    "A structure containing the configName and corresponding configValue for configuring audit checks.",
  ).optional(),
});

const AuditNotificationTargetSchema = z.object({
  TargetArn: z.string().max(2048).describe(
    "The ARN of the target (SNS topic) to which audit notifications are sent.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "The ARN of the role that grants permission to send notifications to the target.",
  ).optional(),
  Enabled: z.boolean().describe(
    "True if notifications to the target are enabled.",
  ).optional(),
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
  AccountId: z.string().min(12).max(12).describe(
    "Your 12-digit account ID (used as the primary identifier for the CloudFormation resource).",
  ),
  AuditCheckConfigurations: z.object({
    AuthenticatedCognitoRoleOverlyPermissiveCheck: AuditCheckConfigurationSchema
      .describe("The configuration for a specific audit check.").optional(),
    CaCertificateExpiringCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    CaCertificateKeyQualityCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    ConflictingClientIdsCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    DeviceCertificateExpiringCheck:
      DeviceCertExpirationAuditCheckConfigurationSchema.describe(
        "A structure containing the configName and corresponding configValue for configuring DeviceCertExpirationCheck.",
      ).optional(),
    DeviceCertificateKeyQualityCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    DeviceCertificateSharedCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    IotPolicyOverlyPermissiveCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    IotRoleAliasAllowsAccessToUnusedServicesCheck: AuditCheckConfigurationSchema
      .describe("The configuration for a specific audit check.").optional(),
    IotRoleAliasOverlyPermissiveCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    LoggingDisabledCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    RevokedCaCertificateStillActiveCheck: AuditCheckConfigurationSchema
      .describe("The configuration for a specific audit check.").optional(),
    RevokedDeviceCertificateStillActiveCheck: AuditCheckConfigurationSchema
      .describe("The configuration for a specific audit check.").optional(),
    UnauthenticatedCognitoRoleOverlyPermissiveCheck:
      AuditCheckConfigurationSchema.describe(
        "The configuration for a specific audit check.",
      ).optional(),
    IntermediateCaRevokedForActiveDeviceCertificatesCheck:
      AuditCheckConfigurationSchema.describe(
        "The configuration for a specific audit check.",
      ).optional(),
    IoTPolicyPotentialMisConfigurationCheck: AuditCheckConfigurationSchema
      .describe("The configuration for a specific audit check.").optional(),
    DeviceCertificateAgeCheck: DeviceCertAgeAuditCheckConfigurationSchema
      .describe(
        "A structure containing the configName and corresponding configValue for configuring DeviceCertAgeCheck.",
      ).optional(),
  }).describe(
    "Specifies which audit checks are enabled and disabled for this account.",
  ),
  AuditNotificationTargetConfigurations: z.object({
    Sns: AuditNotificationTargetSchema.optional(),
  }).describe(
    "Information about the targets to which audit notifications are sent.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "The ARN of the role that grants permission to AWS IoT to access information about your devices, policies, certificates and other items as required when performing an audit.",
  ),
});

const StateSchema = z.object({
  AccountId: z.string(),
  AuditCheckConfigurations: z.object({
    AuthenticatedCognitoRoleOverlyPermissiveCheck:
      AuditCheckConfigurationSchema,
    CaCertificateExpiringCheck: AuditCheckConfigurationSchema,
    CaCertificateKeyQualityCheck: AuditCheckConfigurationSchema,
    ConflictingClientIdsCheck: AuditCheckConfigurationSchema,
    DeviceCertificateExpiringCheck:
      DeviceCertExpirationAuditCheckConfigurationSchema,
    DeviceCertificateKeyQualityCheck: AuditCheckConfigurationSchema,
    DeviceCertificateSharedCheck: AuditCheckConfigurationSchema,
    IotPolicyOverlyPermissiveCheck: AuditCheckConfigurationSchema,
    IotRoleAliasAllowsAccessToUnusedServicesCheck:
      AuditCheckConfigurationSchema,
    IotRoleAliasOverlyPermissiveCheck: AuditCheckConfigurationSchema,
    LoggingDisabledCheck: AuditCheckConfigurationSchema,
    RevokedCaCertificateStillActiveCheck: AuditCheckConfigurationSchema,
    RevokedDeviceCertificateStillActiveCheck: AuditCheckConfigurationSchema,
    UnauthenticatedCognitoRoleOverlyPermissiveCheck:
      AuditCheckConfigurationSchema,
    IntermediateCaRevokedForActiveDeviceCertificatesCheck:
      AuditCheckConfigurationSchema,
    IoTPolicyPotentialMisConfigurationCheck: AuditCheckConfigurationSchema,
    DeviceCertificateAgeCheck: DeviceCertAgeAuditCheckConfigurationSchema,
  }).optional(),
  AuditNotificationTargetConfigurations: z.object({
    Sns: AuditNotificationTargetSchema,
  }).optional(),
  RoleArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AccountId: z.string().min(12).max(12).describe(
    "Your 12-digit account ID (used as the primary identifier for the CloudFormation resource).",
  ).optional(),
  AuditCheckConfigurations: z.object({
    AuthenticatedCognitoRoleOverlyPermissiveCheck: AuditCheckConfigurationSchema
      .describe("The configuration for a specific audit check.").optional(),
    CaCertificateExpiringCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    CaCertificateKeyQualityCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    ConflictingClientIdsCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    DeviceCertificateExpiringCheck:
      DeviceCertExpirationAuditCheckConfigurationSchema.describe(
        "A structure containing the configName and corresponding configValue for configuring DeviceCertExpirationCheck.",
      ).optional(),
    DeviceCertificateKeyQualityCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    DeviceCertificateSharedCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    IotPolicyOverlyPermissiveCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    IotRoleAliasAllowsAccessToUnusedServicesCheck: AuditCheckConfigurationSchema
      .describe("The configuration for a specific audit check.").optional(),
    IotRoleAliasOverlyPermissiveCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    LoggingDisabledCheck: AuditCheckConfigurationSchema.describe(
      "The configuration for a specific audit check.",
    ).optional(),
    RevokedCaCertificateStillActiveCheck: AuditCheckConfigurationSchema
      .describe("The configuration for a specific audit check.").optional(),
    RevokedDeviceCertificateStillActiveCheck: AuditCheckConfigurationSchema
      .describe("The configuration for a specific audit check.").optional(),
    UnauthenticatedCognitoRoleOverlyPermissiveCheck:
      AuditCheckConfigurationSchema.describe(
        "The configuration for a specific audit check.",
      ).optional(),
    IntermediateCaRevokedForActiveDeviceCertificatesCheck:
      AuditCheckConfigurationSchema.describe(
        "The configuration for a specific audit check.",
      ).optional(),
    IoTPolicyPotentialMisConfigurationCheck: AuditCheckConfigurationSchema
      .describe("The configuration for a specific audit check.").optional(),
    DeviceCertificateAgeCheck: DeviceCertAgeAuditCheckConfigurationSchema
      .describe(
        "A structure containing the configName and corresponding configValue for configuring DeviceCertAgeCheck.",
      ).optional(),
  }).describe(
    "Specifies which audit checks are enabled and disabled for this account.",
  ).optional(),
  AuditNotificationTargetConfigurations: z.object({
    Sns: AuditNotificationTargetSchema.optional(),
  }).describe(
    "Information about the targets to which audit notifications are sent.",
  ).optional(),
  RoleArn: z.string().min(20).max(2048).describe(
    "The ARN of the role that grants permission to AWS IoT to access information about your devices, policies, certificates and other items as required when performing an audit.",
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

/** Swamp extension model for IoT AccountAuditConfiguration. Registered at `@swamp/aws/iot/account-audit-configuration`. */
export const model = {
  type: "@swamp/aws/iot/account-audit-configuration",
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
      description: "IoT AccountAuditConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT AccountAuditConfiguration",
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
          "AWS::IoT::AccountAuditConfiguration",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.AccountId ?? g.AccountId)?.toString() ?? "current").replace(
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
      description: "Get a IoT AccountAuditConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT AccountAuditConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoT::AccountAuditConfiguration",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.AccountId ?? context.globalArgs.AccountId)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a IoT AccountAuditConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.AccountId?.toString() ?? "current").replace(
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
        const identifier = existing.AccountId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::AccountAuditConfiguration",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::AccountAuditConfiguration",
          identifier,
          currentState,
          desiredState,
          ["AccountId"],
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
      description: "Delete a IoT AccountAuditConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT AccountAuditConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoT::AccountAuditConfiguration",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.AccountId?.toString() ?? args.identifier).replace(
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
      description: "Sync IoT AccountAuditConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.AccountId?.toString() ?? "current").replace(
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
        const identifier = existing.AccountId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::AccountAuditConfiguration",
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
