// Auto-generated extension model for @swamp/aws/bedrockagentcore/gateway-target
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore GatewayTarget (AWS::BedrockAgentCore::GatewayTarget).
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

const OAuthCredentialProviderSchema = z.object({
  ProviderArn: z.string().regex(
    new RegExp("^arn:([^:]*):([^:]*):([^:]*):([0-9]{12})?:(.+)$"),
  ),
  Scopes: z.array(z.string().min(1).max(128)),
  CustomParameters: z.record(z.string(), z.string().min(1).max(2048))
    .optional(),
  GrantType: z.enum([
    "AUTHORIZATION_CODE",
    "CLIENT_CREDENTIALS",
    "TOKEN_EXCHANGE",
  ]).optional(),
  DefaultReturnUrl: z.string().min(1).max(2048).regex(
    new RegExp("\\w+:(\\/?\\/?)[^\\s]+"),
  ).describe("Return URL for OAuth callback.").optional(),
});

const ApiKeyCredentialProviderSchema = z.object({
  ProviderArn: z.string().regex(
    new RegExp("^arn:([^:]*):([^:]*):([^:]*):([0-9]{12})?:(.+)$"),
  ),
  CredentialParameterName: z.string().min(1).max(64).optional(),
  CredentialPrefix: z.string().min(1).max(64).optional(),
  CredentialLocation: z.enum(["HEADER", "QUERY_PARAMETER"]).optional(),
});

const IamCredentialProviderSchema = z.object({
  Service: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9._-]+$")),
  Region: z.string().min(1).max(32).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .optional(),
});

const CredentialProviderConfigurationSchema = z.object({
  CredentialProviderType: z.enum([
    "GATEWAY_IAM_ROLE",
    "OAUTH",
    "API_KEY",
    "CALLER_IAM_CREDENTIALS",
    "JWT_PASSTHROUGH",
  ]),
  CredentialProvider: z.object({
    OauthCredentialProvider: OAuthCredentialProviderSchema.optional(),
    ApiKeyCredentialProvider: ApiKeyCredentialProviderSchema.optional(),
    IamCredentialProvider: IamCredentialProviderSchema.optional(),
  }).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  CredentialProviderConfigurations: z.array(
    CredentialProviderConfigurationSchema,
  ).optional(),
  Description: z.string().min(1).max(200).optional(),
  GatewayIdentifier: z.string().regex(
    new RegExp("^([0-9a-z][-]?){1,100}-[0-9a-z]{10}$"),
  ).optional(),
  MetadataConfiguration: z.object({
    AllowedRequestHeaders: z.array(z.string()).optional(),
    AllowedQueryParameters: z.array(z.string()).optional(),
    AllowedResponseHeaders: z.array(z.string()).optional(),
  }).optional(),
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][-]?){1,100}$")),
});

const StateSchema = z.object({
  AuthorizationData: z.object({
    Oauth2: z.object({
      AuthorizationUrl: z.string(),
      UserId: z.string(),
    }),
  }).optional(),
  CreatedAt: z.string().optional(),
  CredentialProviderConfigurations: z.array(
    CredentialProviderConfigurationSchema,
  ).optional(),
  Description: z.string().optional(),
  GatewayArn: z.string().optional(),
  GatewayIdentifier: z.string(),
  LastSynchronizedAt: z.string().optional(),
  MetadataConfiguration: z.object({
    AllowedRequestHeaders: z.array(z.string()),
    AllowedQueryParameters: z.array(z.string()),
    AllowedResponseHeaders: z.array(z.string()),
  }).optional(),
  Name: z.string().optional(),
  Status: z.string().optional(),
  StatusReasons: z.array(z.string()).optional(),
  TargetId: z.string(),
  UpdatedAt: z.string().optional(),
  ProtocolType: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  CredentialProviderConfigurations: z.array(
    CredentialProviderConfigurationSchema,
  ).optional(),
  Description: z.string().min(1).max(200).optional(),
  GatewayIdentifier: z.string().regex(
    new RegExp("^([0-9a-z][-]?){1,100}-[0-9a-z]{10}$"),
  ).optional(),
  MetadataConfiguration: z.object({
    AllowedRequestHeaders: z.array(z.string()).optional(),
    AllowedQueryParameters: z.array(z.string()).optional(),
    AllowedResponseHeaders: z.array(z.string()).optional(),
  }).optional(),
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][-]?){1,100}$")).optional(),
});

/** Swamp extension model for BedrockAgentCore GatewayTarget. Registered at `@swamp/aws/bedrockagentcore/gateway-target`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/gateway-target",
  version: "2026.06.03.1",
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
      toVersion: "2026.04.11.1",
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
      toVersion: "2026.06.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore GatewayTarget resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore GatewayTarget",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::GatewayTarget",
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
      description: "Get a BedrockAgentCore GatewayTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore GatewayTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BedrockAgentCore::GatewayTarget",
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
      description: "Update a BedrockAgentCore GatewayTarget",
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
        const idParts = [
          existing.GatewayIdentifier?.toString(),
          existing.TargetId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::BedrockAgentCore::GatewayTarget",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BedrockAgentCore::GatewayTarget",
          identifier,
          currentState,
          desiredState,
          ["GatewayIdentifier"],
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
      description: "Delete a BedrockAgentCore GatewayTarget",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore GatewayTarget",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::GatewayTarget",
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
      description: "Sync BedrockAgentCore GatewayTarget state from AWS",
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
        const idParts = [
          existing.GatewayIdentifier?.toString(),
          existing.TargetId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::GatewayTarget",
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
