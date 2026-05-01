// Auto-generated extension model for @swamp/aws/bedrockagentcore/runtime
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore Runtime (AWS::BedrockAgentCore::Runtime).
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

const ContainerConfigurationSchema = z.object({
  ContainerUri: z.string().min(1).max(1024).regex(
    new RegExp(
      "^\\d{12}\\.dkr\\.ecr\\.([a-z0-9-]+)\\.amazonaws\\.com/((?:[a-z0-9]+(?:[._-][a-z0-9]+)*/)*[a-z0-9]+(?:[._-][a-z0-9]+)*)([:@]\\S+)$",
    ),
  ).describe("The ECR URI of the container"),
});

const S3LocationSchema = z.object({
  Bucket: z.string().regex(new RegExp("^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$"))
    .describe("S3 bucket name"),
  Prefix: z.string().min(1).max(1024).describe("S3 object key prefix"),
  VersionId: z.string().min(3).max(1024).describe("S3 object version ID")
    .optional(),
});

const CodeSchema = z.object({
  S3: S3LocationSchema.describe("S3 Location Configuration").optional(),
});

const CodeConfigurationSchema = z.object({
  Code: CodeSchema.describe("Object represents source code from zip file"),
  Runtime: z.enum([
    "PYTHON_3_10",
    "PYTHON_3_11",
    "PYTHON_3_12",
    "PYTHON_3_13",
    "PYTHON_3_14",
    "NODE_22",
  ]).describe("Managed runtime types"),
  EntryPoint: z.array(z.string()).describe("List of entry points"),
});

const VpcConfigSchema = z.object({
  SecurityGroups: z.array(
    z.string().regex(new RegExp("^sg-[0-9a-zA-Z]{8,17}$")),
  ).describe("Security groups for VPC"),
  Subnets: z.array(z.string().regex(new RegExp("^subnet-[0-9a-zA-Z]{8,17}$")))
    .describe("Subnets for VPC"),
});

const ClaimMatchValueTypeSchema = z.object({
  MatchValueString: z.string().regex(new RegExp("[A-Za-z0-9_.-]+")).describe(
    "The string value to match for",
  ).optional(),
  MatchValueStringList: z.array(z.string().regex(new RegExp("[A-Za-z0-9_.-]+")))
    .describe("The list of strings to check for a match").optional(),
});

const AuthorizingClaimMatchValueTypeSchema = z.object({
  ClaimMatchOperator: z.enum(["EQUALS", "CONTAINS", "CONTAINS_ANY"]).describe(
    "The relationship between the claim field value and the value or values being matched",
  ),
  ClaimMatchValue: ClaimMatchValueTypeSchema.describe(
    "The value or values in the custom claim to match for",
  ),
});

const CustomClaimValidationTypeSchema = z.object({
  AuthorizingClaimMatchValue: AuthorizingClaimMatchValueTypeSchema.describe(
    "The value or values in the custom claim to match and relationship of match",
  ),
  InboundTokenClaimName: z.string().regex(new RegExp("[A-Za-z0-9_.-:]+"))
    .describe("The name of the custom claim to validate"),
  InboundTokenClaimValueType: z.enum(["STRING", "STRING_ARRAY"]).describe(
    "Token claim data type",
  ),
});

const CustomJWTAuthorizerConfigurationSchema = z.object({
  DiscoveryUrl: z.string().regex(
    new RegExp("^.+/\\.well-known/openid-configuration$"),
  ).describe("OpenID Connect discovery URL"),
  AllowedAudience: z.array(z.string()).describe("List of allowed audiences")
    .optional(),
  AllowedClients: z.array(z.string()).describe("List of allowed clients")
    .optional(),
  AllowedScopes: z.array(
    z.string().regex(new RegExp("[\\x21\\x23-\\x5B\\x5D-\\x7E]+")),
  ).describe("List of allowed scopes").optional(),
  CustomClaims: z.array(CustomClaimValidationTypeSchema).describe(
    "List of required custom claims",
  ).optional(),
});

const SessionStorageConfigurationSchema = z.object({
  MountPath: z.string().min(6).max(200).regex(
    new RegExp("^/mnt/[a-zA-Z0-9._-]+/?$"),
  ).describe("Mount path for session storage"),
});

const FilesystemConfigurationSchema = z.object({
  SessionStorage: SessionStorageConfigurationSchema.describe(
    "Configuration for session storage",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  AgentRuntimeName: z.string().regex(new RegExp("[a-zA-Z][a-zA-Z0-9_]{0,47}"))
    .describe("Name for a resource"),
  Description: z.string().min(1).max(1200).describe(
    "Description of the resource",
  ).optional(),
  AgentRuntimeArtifact: z.object({
    ContainerConfiguration: ContainerConfigurationSchema.optional(),
    CodeConfiguration: CodeConfigurationSchema.describe(
      "Representation of a code configuration",
    ).optional(),
  }).describe("The artifact of the agent"),
  RoleArn: z.string().regex(
    new RegExp("arn:aws(-[^:]+)?:iam::([0-9]{12})?:role/.+"),
  ).describe("Amazon Resource Name (ARN) of an IAM role"),
  NetworkConfiguration: z.object({
    NetworkMode: z.enum(["PUBLIC", "VPC"]).describe(
      "Network mode configuration type",
    ),
    NetworkModeConfig: VpcConfigSchema.describe(
      "Network mode configuration for VPC",
    ).optional(),
  }).describe("Network access configuration for the Agent"),
  ProtocolConfiguration: z.enum(["MCP", "HTTP", "A2A", "AGUI"]).describe(
    "Protocol configuration for the agent runtime",
  ).optional(),
  EnvironmentVariables: z.record(z.string(), z.string().max(2048)).describe(
    "Environment variables for the agent runtime",
  ).optional(),
  AuthorizerConfiguration: z.object({
    CustomJWTAuthorizer: CustomJWTAuthorizerConfigurationSchema.describe(
      "Configuration for custom JWT authorizer",
    ).optional(),
  }).describe("Authorizer configuration for the agent runtime").optional(),
  LifecycleConfiguration: z.object({
    IdleRuntimeSessionTimeout: z.number().int().min(60).max(28800).describe(
      "Timeout in seconds for idle runtime sessions",
    ).optional(),
    MaxLifetime: z.number().int().min(60).max(28800).describe(
      "Maximum lifetime in seconds for runtime sessions",
    ).optional(),
  }).describe("Lifecycle configuration for managing runtime sessions")
    .optional(),
  RequestHeaderConfiguration: z.object({
    RequestHeaderAllowlist: z.array(
      z.string().min(1).max(256).regex(
        new RegExp(
          "^(Authorization|X-Amzn-Bedrock-AgentCore-Runtime-Custom-[a-zA-Z0-9_-]+)$",
        ),
      ),
    ).describe("List of allowed HTTP headers for agent runtime requests")
      .optional(),
  }).describe("Configuration for HTTP request headers").optional(),
  FilesystemConfigurations: z.array(FilesystemConfigurationSchema).describe(
    "Filesystem configurations for the agent runtime",
  ).optional(),
  WorkloadIdentityDetails: z.object({
    WorkloadIdentityArn: z.string().min(1).max(1024).describe(
      "ARN of the workload identity",
    ),
  }).describe("Workload identity details for the agent").optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

const StateSchema = z.object({
  AgentRuntimeArn: z.string().optional(),
  AgentRuntimeId: z.string(),
  AgentRuntimeName: z.string().optional(),
  Description: z.string().optional(),
  AgentRuntimeArtifact: z.object({
    ContainerConfiguration: ContainerConfigurationSchema,
    CodeConfiguration: CodeConfigurationSchema,
  }).optional(),
  RoleArn: z.string().optional(),
  NetworkConfiguration: z.object({
    NetworkMode: z.string(),
    NetworkModeConfig: VpcConfigSchema,
  }).optional(),
  ProtocolConfiguration: z.string().optional(),
  EnvironmentVariables: z.record(z.string(), z.unknown()).optional(),
  AuthorizerConfiguration: z.object({
    CustomJWTAuthorizer: CustomJWTAuthorizerConfigurationSchema,
  }).optional(),
  LifecycleConfiguration: z.object({
    IdleRuntimeSessionTimeout: z.number(),
    MaxLifetime: z.number(),
  }).optional(),
  RequestHeaderConfiguration: z.object({
    RequestHeaderAllowlist: z.array(z.string()),
  }).optional(),
  FilesystemConfigurations: z.array(FilesystemConfigurationSchema).optional(),
  AgentRuntimeVersion: z.string().optional(),
  WorkloadIdentityDetails: z.object({
    WorkloadIdentityArn: z.string(),
  }).optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
  Status: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  FailureReason: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  AgentRuntimeName: z.string().regex(new RegExp("[a-zA-Z][a-zA-Z0-9_]{0,47}"))
    .describe("Name for a resource").optional(),
  Description: z.string().min(1).max(1200).describe(
    "Description of the resource",
  ).optional(),
  AgentRuntimeArtifact: z.object({
    ContainerConfiguration: ContainerConfigurationSchema.optional(),
    CodeConfiguration: CodeConfigurationSchema.describe(
      "Representation of a code configuration",
    ).optional(),
  }).describe("The artifact of the agent").optional(),
  RoleArn: z.string().regex(
    new RegExp("arn:aws(-[^:]+)?:iam::([0-9]{12})?:role/.+"),
  ).describe("Amazon Resource Name (ARN) of an IAM role").optional(),
  NetworkConfiguration: z.object({
    NetworkMode: z.enum(["PUBLIC", "VPC"]).describe(
      "Network mode configuration type",
    ).optional(),
    NetworkModeConfig: VpcConfigSchema.describe(
      "Network mode configuration for VPC",
    ).optional(),
  }).describe("Network access configuration for the Agent").optional(),
  ProtocolConfiguration: z.enum(["MCP", "HTTP", "A2A", "AGUI"]).describe(
    "Protocol configuration for the agent runtime",
  ).optional(),
  EnvironmentVariables: z.record(z.string(), z.string().max(2048)).describe(
    "Environment variables for the agent runtime",
  ).optional(),
  AuthorizerConfiguration: z.object({
    CustomJWTAuthorizer: CustomJWTAuthorizerConfigurationSchema.describe(
      "Configuration for custom JWT authorizer",
    ).optional(),
  }).describe("Authorizer configuration for the agent runtime").optional(),
  LifecycleConfiguration: z.object({
    IdleRuntimeSessionTimeout: z.number().int().min(60).max(28800).describe(
      "Timeout in seconds for idle runtime sessions",
    ).optional(),
    MaxLifetime: z.number().int().min(60).max(28800).describe(
      "Maximum lifetime in seconds for runtime sessions",
    ).optional(),
  }).describe("Lifecycle configuration for managing runtime sessions")
    .optional(),
  RequestHeaderConfiguration: z.object({
    RequestHeaderAllowlist: z.array(
      z.string().min(1).max(256).regex(
        new RegExp(
          "^(Authorization|X-Amzn-Bedrock-AgentCore-Runtime-Custom-[a-zA-Z0-9_-]+)$",
        ),
      ),
    ).describe("List of allowed HTTP headers for agent runtime requests")
      .optional(),
  }).describe("Configuration for HTTP request headers").optional(),
  FilesystemConfigurations: z.array(FilesystemConfigurationSchema).describe(
    "Filesystem configurations for the agent runtime",
  ).optional(),
  WorkloadIdentityDetails: z.object({
    WorkloadIdentityArn: z.string().min(1).max(1024).describe(
      "ARN of the workload identity",
    ).optional(),
  }).describe("Workload identity details for the agent").optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

/** Swamp extension model for BedrockAgentCore Runtime. Registered at `@swamp/aws/bedrockagentcore/runtime`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/runtime",
  version: "2026.05.01.1",
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
      description: "Added: FilesystemConfigurations",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
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
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore Runtime resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore Runtime",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::Runtime",
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
      description: "Get a BedrockAgentCore Runtime",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Runtime",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BedrockAgentCore::Runtime",
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
      description: "Update a BedrockAgentCore Runtime",
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
        const identifier = existing.AgentRuntimeId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::Runtime",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BedrockAgentCore::Runtime",
          identifier,
          currentState,
          desiredState,
          ["AgentRuntimeName"],
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
      description: "Delete a BedrockAgentCore Runtime",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Runtime",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::Runtime",
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
      description: "Sync BedrockAgentCore Runtime state from AWS",
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
        const identifier = existing.AgentRuntimeId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::Runtime",
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
