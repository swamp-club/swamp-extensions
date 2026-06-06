// Auto-generated extension model for @swamp/aws/qbusiness/application
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for QBusiness Application (AWS::QBusiness::Application).
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
  AttachmentsConfiguration: z.object({
    AttachmentsControlMode: z.enum(["ENABLED", "DISABLED"]),
  }).optional(),
  AutoSubscriptionConfiguration: z.object({
    AutoSubscribe: z.enum(["ENABLED", "DISABLED"]),
    DefaultSubscriptionType: z.enum(["Q_LITE", "Q_BUSINESS"]).optional(),
  }).optional(),
  ClientIdsForOIDC: z.array(
    z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9_.:/()*?=-]*$")),
  ).optional(),
  Description: z.string().min(0).max(1000).regex(new RegExp("^[\\s\\S]*$"))
    .optional(),
  DisplayName: z.string().min(1).max(1000).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*$"),
  ),
  EncryptionConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(2048).optional(),
  }).optional(),
  IamIdentityProviderArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws:iam::\\d{12}:(oidc-provider|saml-provider)/[a-zA-Z0-9_\\.\\/@\\-]+$",
    ),
  ).optional(),
  IdentityCenterInstanceArn: z.string().min(10).max(1224).regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}$",
    ),
  ).optional(),
  IdentityType: z.enum([
    "AWS_IAM_IDP_SAML",
    "AWS_IAM_IDP_OIDC",
    "AWS_IAM_IDC",
    "AWS_QUICKSIGHT_IDP",
    "ANONYMOUS",
  ]).optional(),
  PersonalizationConfiguration: z.object({
    PersonalizationControlMode: z.enum(["ENABLED", "DISABLED"]),
  }).optional(),
  QAppsConfiguration: z.object({
    QAppsControlMode: z.enum(["ENABLED", "DISABLED"]),
  }).optional(),
  QuickSightConfiguration: z.object({
    ClientNamespace: z.string().min(1).max(64).regex(
      new RegExp("^[a-zA-Z0-9._-]*$"),
    ),
  }).optional(),
  RoleArn: z.string().min(0).max(1284).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  ApplicationArn: z.string().optional(),
  ApplicationId: z.string(),
  AttachmentsConfiguration: z.object({
    AttachmentsControlMode: z.string(),
  }).optional(),
  AutoSubscriptionConfiguration: z.object({
    AutoSubscribe: z.string(),
    DefaultSubscriptionType: z.string(),
  }).optional(),
  ClientIdsForOIDC: z.array(z.string()).optional(),
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  DisplayName: z.string().optional(),
  EncryptionConfiguration: z.object({
    KmsKeyId: z.string(),
  }).optional(),
  IamIdentityProviderArn: z.string().optional(),
  IdentityCenterApplicationArn: z.string().optional(),
  IdentityCenterInstanceArn: z.string().optional(),
  IdentityType: z.string().optional(),
  PersonalizationConfiguration: z.object({
    PersonalizationControlMode: z.string(),
  }).optional(),
  QAppsConfiguration: z.object({
    QAppsControlMode: z.string(),
  }).optional(),
  QuickSightConfiguration: z.object({
    ClientNamespace: z.string(),
  }).optional(),
  RoleArn: z.string().optional(),
  Status: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AttachmentsConfiguration: z.object({
    AttachmentsControlMode: z.enum(["ENABLED", "DISABLED"]).optional(),
  }).optional(),
  AutoSubscriptionConfiguration: z.object({
    AutoSubscribe: z.enum(["ENABLED", "DISABLED"]).optional(),
    DefaultSubscriptionType: z.enum(["Q_LITE", "Q_BUSINESS"]).optional(),
  }).optional(),
  ClientIdsForOIDC: z.array(
    z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9_.:/()*?=-]*$")),
  ).optional(),
  Description: z.string().min(0).max(1000).regex(new RegExp("^[\\s\\S]*$"))
    .optional(),
  DisplayName: z.string().min(1).max(1000).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*$"),
  ).optional(),
  EncryptionConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(2048).optional(),
  }).optional(),
  IamIdentityProviderArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws:iam::\\d{12}:(oidc-provider|saml-provider)/[a-zA-Z0-9_\\.\\/@\\-]+$",
    ),
  ).optional(),
  IdentityCenterInstanceArn: z.string().min(10).max(1224).regex(
    new RegExp(
      "^arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}$",
    ),
  ).optional(),
  IdentityType: z.enum([
    "AWS_IAM_IDP_SAML",
    "AWS_IAM_IDP_OIDC",
    "AWS_IAM_IDC",
    "AWS_QUICKSIGHT_IDP",
    "ANONYMOUS",
  ]).optional(),
  PersonalizationConfiguration: z.object({
    PersonalizationControlMode: z.enum(["ENABLED", "DISABLED"]).optional(),
  }).optional(),
  QAppsConfiguration: z.object({
    QAppsControlMode: z.enum(["ENABLED", "DISABLED"]).optional(),
  }).optional(),
  QuickSightConfiguration: z.object({
    ClientNamespace: z.string().min(1).max(64).regex(
      new RegExp("^[a-zA-Z0-9._-]*$"),
    ).optional(),
  }).optional(),
  RoleArn: z.string().min(0).max(1284).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for QBusiness Application. Registered at `@swamp/aws/qbusiness/application`. */
export const model = {
  type: "@swamp/aws/qbusiness/application",
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
      description: "QBusiness Application resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QBusiness Application",
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
          "AWS::QBusiness::Application",
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
      description: "Get a QBusiness Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QBusiness Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::QBusiness::Application",
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
      description: "Update a QBusiness Application",
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
        const identifier = existing.ApplicationId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::QBusiness::Application",
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
          "AWS::QBusiness::Application",
          identifier,
          currentState,
          desiredState,
          [
            "ClientIdsForOIDC",
            "EncryptionConfiguration",
            "IamIdentityProviderArn",
            "IdentityType",
            "QuickSightConfiguration",
          ],
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
      description: "Delete a QBusiness Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QBusiness Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::QBusiness::Application",
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
      description: "Sync QBusiness Application state from AWS",
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
        const identifier = existing.ApplicationId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::QBusiness::Application",
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
