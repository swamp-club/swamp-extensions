// Auto-generated extension model for @swamp/aws/qbusiness/plugin
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for QBusiness Plugin (AWS::QBusiness::Plugin).
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

const BasicAuthConfigurationSchema = z.object({
  SecretArn: z.string().min(0).max(1284).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ),
  RoleArn: z.string().min(0).max(1284).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ),
});

const OAuth2ClientCredentialConfigurationSchema = z.object({
  SecretArn: z.string().min(0).max(1284).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ),
  RoleArn: z.string().min(0).max(1284).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ),
  AuthorizationUrl: z.string().min(1).max(2048).regex(
    new RegExp("^(https?|ftp|file)://([^\\s]*)$"),
  ).optional(),
  TokenUrl: z.string().min(1).max(2048).regex(
    new RegExp("^(https?|ftp|file)://([^\\s]*)$"),
  ).optional(),
});

const S3Schema = z.object({
  Bucket: z.string().min(1).max(63).regex(
    new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ),
  Key: z.string().min(1).max(1024),
});

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
  ApplicationId: z.string().min(36).max(36).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{35}$"),
  ).optional(),
  AuthConfiguration: z.object({
    BasicAuthConfiguration: BasicAuthConfigurationSchema.optional(),
    OAuth2ClientCredentialConfiguration:
      OAuth2ClientCredentialConfigurationSchema.optional(),
    NoAuthConfiguration: z.record(z.string(), z.unknown()).optional(),
  }),
  CustomPluginConfiguration: z.object({
    Description: z.string().min(1).max(200),
    ApiSchemaType: z.enum(["OPEN_API_V3"]),
    ApiSchema: z.object({
      Payload: z.string().optional(),
      S3: S3Schema.optional(),
    }),
  }).optional(),
  DisplayName: z.string().min(1).max(100).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*$"),
  ),
  ServerUrl: z.string().min(1).max(2048).regex(
    new RegExp("^(https?|ftp|file)://([^\\s]*)$"),
  ).optional(),
  State: z.enum(["ENABLED", "DISABLED"]).optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.enum([
    "SERVICE_NOW",
    "SALESFORCE",
    "JIRA",
    "ZENDESK",
    "CUSTOM",
    "QUICKSIGHT",
    "SERVICENOW_NOW_PLATFORM",
    "JIRA_CLOUD",
    "SALESFORCE_CRM",
    "ZENDESK_SUITE",
    "ATLASSIAN_CONFLUENCE",
    "GOOGLE_CALENDAR",
    "MICROSOFT_TEAMS",
    "MICROSOFT_EXCHANGE",
    "PAGERDUTY_ADVANCE",
    "SMARTSHEET",
    "ASANA",
  ]),
});

const StateSchema = z.object({
  ApplicationId: z.string(),
  AuthConfiguration: z.object({
    BasicAuthConfiguration: BasicAuthConfigurationSchema,
    OAuth2ClientCredentialConfiguration:
      OAuth2ClientCredentialConfigurationSchema,
    NoAuthConfiguration: z.record(z.string(), z.unknown()),
  }).optional(),
  BuildStatus: z.string().optional(),
  CreatedAt: z.string().optional(),
  CustomPluginConfiguration: z.object({
    Description: z.string(),
    ApiSchemaType: z.string(),
    ApiSchema: z.object({
      Payload: z.string(),
      S3: S3Schema,
    }),
  }).optional(),
  DisplayName: z.string().optional(),
  PluginArn: z.string().optional(),
  PluginId: z.string(),
  ServerUrl: z.string().optional(),
  State: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.string().optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ApplicationId: z.string().min(36).max(36).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{35}$"),
  ).optional(),
  AuthConfiguration: z.object({
    BasicAuthConfiguration: BasicAuthConfigurationSchema.optional(),
    OAuth2ClientCredentialConfiguration:
      OAuth2ClientCredentialConfigurationSchema.optional(),
    NoAuthConfiguration: z.record(z.string(), z.unknown()).optional(),
  }).optional(),
  CustomPluginConfiguration: z.object({
    Description: z.string().min(1).max(200).optional(),
    ApiSchemaType: z.enum(["OPEN_API_V3"]).optional(),
    ApiSchema: z.object({
      Payload: z.string().optional(),
      S3: S3Schema.optional(),
    }).optional(),
  }).optional(),
  DisplayName: z.string().min(1).max(100).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*$"),
  ).optional(),
  ServerUrl: z.string().min(1).max(2048).regex(
    new RegExp("^(https?|ftp|file)://([^\\s]*)$"),
  ).optional(),
  State: z.enum(["ENABLED", "DISABLED"]).optional(),
  Tags: z.array(TagSchema).optional(),
  Type: z.enum([
    "SERVICE_NOW",
    "SALESFORCE",
    "JIRA",
    "ZENDESK",
    "CUSTOM",
    "QUICKSIGHT",
    "SERVICENOW_NOW_PLATFORM",
    "JIRA_CLOUD",
    "SALESFORCE_CRM",
    "ZENDESK_SUITE",
    "ATLASSIAN_CONFLUENCE",
    "GOOGLE_CALENDAR",
    "MICROSOFT_TEAMS",
    "MICROSOFT_EXCHANGE",
    "PAGERDUTY_ADVANCE",
    "SMARTSHEET",
    "ASANA",
  ]).optional(),
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

/** Swamp extension model for QBusiness Plugin. Registered at `@swamp/aws/qbusiness/plugin`. */
export const model = {
  type: "@swamp/aws/qbusiness/plugin",
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
      toVersion: "2026.05.27.1",
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
      description: "QBusiness Plugin resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QBusiness Plugin",
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
          "AWS::QBusiness::Plugin",
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
      description: "Get a QBusiness Plugin",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QBusiness Plugin",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::QBusiness::Plugin",
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
      description: "Update a QBusiness Plugin",
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
          existing.ApplicationId?.toString(),
          existing.PluginId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QBusiness::Plugin",
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
          "AWS::QBusiness::Plugin",
          identifier,
          currentState,
          desiredState,
          ["ApplicationId", "Type"],
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
      description: "Delete a QBusiness Plugin",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QBusiness Plugin",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::QBusiness::Plugin",
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
      description: "Sync QBusiness Plugin state from AWS",
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
          existing.ApplicationId?.toString(),
          existing.PluginId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QBusiness::Plugin",
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
