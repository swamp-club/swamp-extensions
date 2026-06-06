// Auto-generated extension model for @swamp/aws/workspacesweb/portal
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for WorkSpacesWeb Portal (AWS::WorkSpacesWeb::Portal).
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
  Key: z.string().min(1).max(128).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", "u"),
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
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072).regex(new RegExp("^[\\s\\S]*$")),
  ).optional(),
  AuthenticationType: z.enum(["Standard", "IAM_Identity_Center"]).optional(),
  BrowserSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  CustomerManagedKey: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).optional(),
  DataProtectionSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  DisplayName: z.string().min(1).max(64).regex(new RegExp("^.+$")).optional(),
  InstanceType: z.enum([
    "standard.regular",
    "standard.large",
    "standard.xlarge",
  ]).optional(),
  IpAccessSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  MaxConcurrentSessions: z.number().min(1).max(5000).optional(),
  NetworkSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  PortalCustomDomain: z.string().min(0).max(128).regex(
    new RegExp(
      "^[a-zA-Z0-9]?((?!-)([A-Za-z0-9-]*[A-Za-z0-9])\\.)+[a-zA-Z0-9]+$",
    ),
  ).optional(),
  SessionLoggerArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  TrustStoreArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  UserAccessLoggingSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  UserSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
});

const StateSchema = z.object({
  AdditionalEncryptionContext: z.record(z.string(), z.unknown()).optional(),
  AuthenticationType: z.string().optional(),
  BrowserSettingsArn: z.string().optional(),
  BrowserType: z.string().optional(),
  CreationDate: z.string().optional(),
  CustomerManagedKey: z.string().optional(),
  DataProtectionSettingsArn: z.string().optional(),
  DisplayName: z.string().optional(),
  InstanceType: z.string().optional(),
  IpAccessSettingsArn: z.string().optional(),
  MaxConcurrentSessions: z.number().optional(),
  NetworkSettingsArn: z.string().optional(),
  PortalArn: z.string(),
  PortalEndpoint: z.string().optional(),
  PortalCustomDomain: z.string().optional(),
  PortalStatus: z.string().optional(),
  RendererType: z.string().optional(),
  ServiceProviderSamlMetadata: z.string().optional(),
  SessionLoggerArn: z.string().optional(),
  StatusReason: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TrustStoreArn: z.string().optional(),
  UserAccessLoggingSettingsArn: z.string().optional(),
  UserSettingsArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AdditionalEncryptionContext: z.record(
    z.string(),
    z.string().min(0).max(131072).regex(new RegExp("^[\\s\\S]*$")),
  ).optional(),
  AuthenticationType: z.enum(["Standard", "IAM_Identity_Center"]).optional(),
  BrowserSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  CustomerManagedKey: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:kms:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:key\\/[a-zA-Z0-9-]+$",
    ),
  ).optional(),
  DataProtectionSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  DisplayName: z.string().min(1).max(64).regex(new RegExp("^.+$")).optional(),
  InstanceType: z.enum([
    "standard.regular",
    "standard.large",
    "standard.xlarge",
  ]).optional(),
  IpAccessSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  MaxConcurrentSessions: z.number().min(1).max(5000).optional(),
  NetworkSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  PortalCustomDomain: z.string().min(0).max(128).regex(
    new RegExp(
      "^[a-zA-Z0-9]?((?!-)([A-Za-z0-9-]*[A-Za-z0-9])\\.)+[a-zA-Z0-9]+$",
    ),
  ).optional(),
  SessionLoggerArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  Tags: z.array(TagSchema).optional(),
  TrustStoreArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  UserAccessLoggingSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
  ).optional(),
  UserSettingsArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:[\\w+=\\/,.@-]+:[a-zA-Z0-9\\-]+:[a-zA-Z0-9\\-]*:[a-zA-Z0-9]{1,12}:[a-zA-Z]+(\\/[a-fA-F0-9\\-]{36})+$",
    ),
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

/** Swamp extension model for WorkSpacesWeb Portal. Registered at `@swamp/aws/workspacesweb/portal`. */
export const model = {
  type: "@swamp/aws/workspacesweb/portal",
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
      description: "WorkSpacesWeb Portal resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a WorkSpacesWeb Portal",
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
          "AWS::WorkSpacesWeb::Portal",
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
      description: "Get a WorkSpacesWeb Portal",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesWeb Portal",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::WorkSpacesWeb::Portal",
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
      description: "Update a WorkSpacesWeb Portal",
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
        const identifier = existing.PortalArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::WorkSpacesWeb::Portal",
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
          "AWS::WorkSpacesWeb::Portal",
          identifier,
          currentState,
          desiredState,
          ["AdditionalEncryptionContext", "CustomerManagedKey"],
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
      description: "Delete a WorkSpacesWeb Portal",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the WorkSpacesWeb Portal",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::WorkSpacesWeb::Portal",
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
      description: "Sync WorkSpacesWeb Portal state from AWS",
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
        const identifier = existing.PortalArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::WorkSpacesWeb::Portal",
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
