// Auto-generated extension model for @swamp/aws/bedrockagentcore/harness
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore Harness (AWS::BedrockAgentCore::Harness).
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

const LifecycleConfigurationSchema = z.object({
  IdleRuntimeSessionTimeout: z.number().int().min(60).max(28800).optional(),
  MaxLifetime: z.number().int().min(60).max(28800).optional(),
});

const VpcConfigSchema = z.object({
  SecurityGroups: z.array(
    z.string().regex(new RegExp("^sg-[0-9a-zA-Z]{8,17}$")),
  ),
  Subnets: z.array(z.string().regex(new RegExp("^subnet-[0-9a-zA-Z]{8,17}$"))),
});

const NetworkConfigurationSchema = z.object({
  NetworkMode: z.enum(["PUBLIC", "VPC"]),
  NetworkModeConfig: VpcConfigSchema.optional(),
});

const SessionStorageConfigurationSchema = z.object({
  MountPath: z.string().min(6).max(200).regex(
    new RegExp("^/mnt/[a-zA-Z0-9._-]+/?$"),
  ),
});

const FilesystemConfigurationSchema = z.object({
  SessionStorage: SessionStorageConfigurationSchema,
});

const HarnessAgentCoreRuntimeEnvironmentSchema = z.object({
  LifecycleConfiguration: LifecycleConfigurationSchema.optional(),
  NetworkConfiguration: NetworkConfigurationSchema.optional(),
  FilesystemConfigurations: z.array(FilesystemConfigurationSchema).optional(),
});

const ContainerConfigurationSchema = z.object({
  ContainerUri: z.string().min(1).max(1024).regex(
    new RegExp(
      "^(([0-9]{12})\\.dkr\\.ecr\\.([a-z0-9-]+)\\.amazonaws\\.com(\\.cn)?|public\\.ecr\\.aws)/((?:[a-z0-9]+(?:[._-][a-z0-9]+)*/)*[a-z0-9]+(?:[._-][a-z0-9]+)*)(?::([^:@]{1,300}))?(?:@(.+))?$",
    ),
  ).describe("The ECR URI of the container."),
});

const ClaimMatchValueTypeSchema = z.object({
  MatchValueString: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z0-9_.-]+$"),
  ).optional(),
  MatchValueStringList: z.array(
    z.string().min(1).max(255).regex(new RegExp("^[A-Za-z0-9_.-]+$")),
  ).optional(),
});

const AuthorizingClaimMatchValueTypeSchema = z.object({
  ClaimMatchValue: ClaimMatchValueTypeSchema,
  ClaimMatchOperator: z.enum(["EQUALS", "CONTAINS", "CONTAINS_ANY"]),
});

const CustomClaimValidationTypeSchema = z.object({
  InboundTokenClaimName: z.string().min(1).max(255).regex(
    new RegExp("^[A-Za-z0-9_.-:]+$"),
  ),
  InboundTokenClaimValueType: z.enum(["STRING", "STRING_ARRAY"]),
  AuthorizingClaimMatchValue: AuthorizingClaimMatchValueTypeSchema,
});

const CustomJWTAuthorizerConfigurationSchema = z.object({
  DiscoveryUrl: z.string().regex(
    new RegExp("^.+/\\.well-known/openid-configuration$"),
  ),
  AllowedAudience: z.array(z.string()).optional(),
  AllowedClients: z.array(z.string()).optional(),
  AllowedScopes: z.array(
    z.string().min(1).max(255).regex(
      new RegExp("^[\\x21\\x23-\\x5B\\x5D-\\x7E]+$"),
    ),
  ).optional(),
  CustomClaims: z.array(CustomClaimValidationTypeSchema).optional(),
});

const HarnessBedrockModelConfigSchema = z.object({
  ModelId: z.string(),
  MaxTokens: z.number().int().min(1).optional(),
  Temperature: z.number().min(0).max(2).optional(),
  TopP: z.number().min(0).max(1).optional(),
});

const HarnessOpenAiModelConfigSchema = z.object({
  ModelId: z.string(),
  ApiKeyArn: z.string().regex(
    new RegExp(
      "^arn:aws:bedrock-agentcore:[a-z0-9-]+:[0-9]{12}:token-vault/[a-zA-Z0-9-.]+/apikeycredentialprovider/[a-zA-Z0-9-.]+$",
    ),
  ),
  MaxTokens: z.number().int().min(1).optional(),
  Temperature: z.number().min(0).max(2).optional(),
  TopP: z.number().min(0).max(1).optional(),
});

const HarnessGeminiModelConfigSchema = z.object({
  ModelId: z.string(),
  ApiKeyArn: z.string().regex(
    new RegExp(
      "^arn:aws:bedrock-agentcore:[a-z0-9-]+:[0-9]{12}:token-vault/[a-zA-Z0-9-.]+/apikeycredentialprovider/[a-zA-Z0-9-.]+$",
    ),
  ),
  MaxTokens: z.number().int().min(1).optional(),
  Temperature: z.number().min(0).max(2).optional(),
  TopP: z.number().min(0).max(1).optional(),
  TopK: z.number().int().min(0).max(500).optional(),
});

const HarnessSystemContentBlockSchema = z.object({
  Text: z.string().min(1).describe(
    "The text content of the system prompt block.",
  ),
});

const HarnessRemoteMcpConfigSchema = z.object({
  Url: z.string().min(1).max(16383),
  Headers: z.record(z.string(), z.string().min(1).max(16383)).optional(),
});

const HarnessAgentCoreBrowserConfigSchema = z.object({
  BrowserArn: z.string().regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock-agentcore:[a-z0-9-]+:(aws|[0-9]{12}):browser(-custom)?/(aws\\.browser\\.v1|[a-zA-Z][a-zA-Z0-9_]{0,47}-[a-zA-Z0-9]{10})$",
    ),
  ).optional(),
});

const OAuthCredentialProviderSchema = z.object({
  ProviderArn: z.string().regex(
    new RegExp("^arn:([^:]*):([^:]*):([^:]*):([0-9]{12})?:(.+)$"),
  ),
  Scopes: z.array(z.string().min(1).max(64)),
  CustomParameters: z.record(z.string(), z.string().min(1).max(2048))
    .optional(),
  GrantType: z.enum(["CLIENT_CREDENTIALS", "AUTHORIZATION_CODE"]).optional(),
  DefaultReturnUrl: z.string().min(1).max(2048).regex(
    new RegExp("^\\w+:(\\/?\\/?)[^\\s]+$"),
  ).optional(),
});

const HarnessGatewayOutboundAuthSchema = z.object({
  AwsIam: z.string().optional(),
  None: z.string().optional(),
  Oauth: OAuthCredentialProviderSchema.optional(),
});

const HarnessAgentCoreGatewayConfigSchema = z.object({
  GatewayArn: z.string().regex(
    new RegExp(
      "^arn:aws(|-cn|-us-gov):bedrock-agentcore:[a-z0-9-]{1,20}:[0-9]{12}:gateway/([0-9a-z][-]?){1,48}-[a-z0-9]{10}$",
    ),
  ),
  OutboundAuth: HarnessGatewayOutboundAuthSchema.optional(),
});

const HarnessInlineFunctionConfigSchema = z.object({
  Description: z.string().min(1).max(4096),
  InputSchema: z.string().describe(
    "JSON Schema describing the tool's input parameters.",
  ),
});

const HarnessAgentCoreCodeInterpreterConfigSchema = z.object({
  CodeInterpreterArn: z.string().regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock-agentcore:[a-z0-9-]+:(aws|[0-9]{12}):code-interpreter(-custom)?/(aws\\.codeinterpreter\\.v1|[a-zA-Z][a-zA-Z0-9_]{0,47}-[a-zA-Z0-9]{10})$",
    ),
  ).optional(),
});

const HarnessToolConfigurationSchema = z.object({
  RemoteMcp: HarnessRemoteMcpConfigSchema.optional(),
  AgentCoreBrowser: HarnessAgentCoreBrowserConfigSchema.optional(),
  AgentCoreGateway: HarnessAgentCoreGatewayConfigSchema.optional(),
  InlineFunction: HarnessInlineFunctionConfigSchema.optional(),
  AgentCoreCodeInterpreter: HarnessAgentCoreCodeInterpreterConfigSchema
    .optional(),
});

const HarnessToolSchema = z.object({
  Type: z.enum([
    "remote_mcp",
    "agentcore_browser",
    "agentcore_gateway",
    "inline_function",
    "agentcore_code_interpreter",
  ]),
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .optional(),
  Config: HarnessToolConfigurationSchema.optional(),
});

const HarnessSkillSchema = z.object({
  Path: z.string().min(1).describe(
    "The filesystem path to the skill definition.",
  ),
});

const HarnessAgentCoreMemoryRetrievalConfigSchema = z.object({
  TopK: z.number().int().optional(),
  RelevanceScore: z.number().optional(),
  StrategyId: z.string().optional(),
});

const HarnessAgentCoreMemoryConfigurationSchema = z.object({
  ActorId: z.string().optional(),
  MessagesCount: z.number().int().optional(),
  RetrievalConfig: z.record(
    z.string(),
    HarnessAgentCoreMemoryRetrievalConfigSchema,
  ).optional(),
});

const HarnessSlidingWindowConfigurationSchema = z.object({
  MessagesCount: z.number().int().optional(),
});

const HarnessSummarizationConfigurationSchema = z.object({
  SummaryRatio: z.number().optional(),
  PreserveRecentMessages: z.number().int().optional(),
  SummarizationSystemPrompt: z.string().optional(),
});

const HarnessTruncationStrategyConfigurationSchema = z.object({
  SlidingWindow: HarnessSlidingWindowConfigurationSchema.optional(),
  Summarization: HarnessSummarizationConfigurationSchema.optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9\\s_.:/=+\\-@]*$"),
  ),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s_.:/=+\\-@]*$"),
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  HarnessName: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,39}$"))
    .describe("The name of the harness."),
  ExecutionRoleArn: z.string().min(1).max(2048).regex(
    new RegExp("^arn:aws(-[^:]+)?:iam::[0-9]{12}:role/.+$"),
  ).describe("The ARN of the IAM role that the harness assumes when running."),
  Environment: z.object({
    AgentCoreRuntimeEnvironment: HarnessAgentCoreRuntimeEnvironmentSchema
      .optional(),
  }).describe(
    "The compute environment configuration for the harness, including underlying runtime information.",
  ).optional(),
  EnvironmentArtifact: z.object({
    ContainerConfiguration: ContainerConfigurationSchema.optional(),
  }).describe(
    "The environment artifact for the harness, such as a custom container image.",
  ).optional(),
  EnvironmentVariables: z.record(z.string(), z.string().min(0).max(5000))
    .describe(
      "Environment variables to set in the harness runtime environment.",
    ).optional(),
  AuthorizerConfiguration: z.object({
    CustomJWTAuthorizer: CustomJWTAuthorizerConfigurationSchema.optional(),
  }).describe(
    "The inbound authorization configuration for authenticating incoming requests.",
  ).optional(),
  Model: z.object({
    BedrockModelConfig: HarnessBedrockModelConfigSchema.optional(),
    OpenAiModelConfig: HarnessOpenAiModelConfigSchema.optional(),
    GeminiModelConfig: HarnessGeminiModelConfigSchema.optional(),
  }).describe("The model configuration for the harness."),
  SystemPrompt: z.array(HarnessSystemContentBlockSchema).describe(
    "The system prompt that defines the agent's behavior.",
  ).optional(),
  Tools: z.array(HarnessToolSchema).describe(
    "The tools available to the agent.",
  ).optional(),
  Skills: z.array(HarnessSkillSchema).describe(
    "The skills available to the agent.",
  ).optional(),
  AllowedTools: z.array(
    z.string().min(1).max(64).regex(new RegExp("^(\\*|@?[^/]+(/[^/]+)?)$")),
  ).describe("The tools that the agent is allowed to use.").optional(),
  Memory: z.object({
    AgentCoreMemoryConfiguration: HarnessAgentCoreMemoryConfigurationSchema
      .optional(),
  }).describe(
    "The AgentCore Memory configuration for persisting conversation context.",
  ).optional(),
  Truncation: z.object({
    Strategy: z.enum(["sliding_window", "summarization", "none"]),
    Config: HarnessTruncationStrategyConfigurationSchema.optional(),
  }).describe("The truncation configuration for managing conversation context.")
    .optional(),
  MaxIterations: z.number().int().describe(
    "The maximum number of iterations the agent loop can execute per invocation.",
  ).optional(),
  MaxTokens: z.number().int().describe(
    "The maximum number of tokens the agent can generate per iteration.",
  ).optional(),
  TimeoutSeconds: z.number().int().describe(
    "The maximum duration in seconds for the agent loop execution per invocation.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to apply to the harness resource.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  HarnessId: z.string().optional(),
  HarnessName: z.string().optional(),
  Status: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  Environment: z.object({
    AgentCoreRuntimeEnvironment: HarnessAgentCoreRuntimeEnvironmentSchema,
  }).optional(),
  EnvironmentArtifact: z.object({
    ContainerConfiguration: ContainerConfigurationSchema,
  }).optional(),
  EnvironmentVariables: z.record(z.string(), z.unknown()).optional(),
  AuthorizerConfiguration: z.object({
    CustomJWTAuthorizer: CustomJWTAuthorizerConfigurationSchema,
  }).optional(),
  Model: z.object({
    BedrockModelConfig: HarnessBedrockModelConfigSchema,
    OpenAiModelConfig: HarnessOpenAiModelConfigSchema,
    GeminiModelConfig: HarnessGeminiModelConfigSchema,
  }).optional(),
  SystemPrompt: z.array(HarnessSystemContentBlockSchema).optional(),
  Tools: z.array(HarnessToolSchema).optional(),
  Skills: z.array(HarnessSkillSchema).optional(),
  AllowedTools: z.array(z.string()).optional(),
  Memory: z.object({
    AgentCoreMemoryConfiguration: HarnessAgentCoreMemoryConfigurationSchema,
  }).optional(),
  Truncation: z.object({
    Strategy: z.string(),
    Config: HarnessTruncationStrategyConfigurationSchema,
  }).optional(),
  MaxIterations: z.number().optional(),
  MaxTokens: z.number().optional(),
  TimeoutSeconds: z.number().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  HarnessName: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,39}$"))
    .describe("The name of the harness.").optional(),
  ExecutionRoleArn: z.string().min(1).max(2048).regex(
    new RegExp("^arn:aws(-[^:]+)?:iam::[0-9]{12}:role/.+$"),
  ).describe("The ARN of the IAM role that the harness assumes when running.")
    .optional(),
  Environment: z.object({
    AgentCoreRuntimeEnvironment: HarnessAgentCoreRuntimeEnvironmentSchema
      .optional(),
  }).describe(
    "The compute environment configuration for the harness, including underlying runtime information.",
  ).optional(),
  EnvironmentArtifact: z.object({
    ContainerConfiguration: ContainerConfigurationSchema.optional(),
  }).describe(
    "The environment artifact for the harness, such as a custom container image.",
  ).optional(),
  EnvironmentVariables: z.record(z.string(), z.string().min(0).max(5000))
    .describe(
      "Environment variables to set in the harness runtime environment.",
    ).optional(),
  AuthorizerConfiguration: z.object({
    CustomJWTAuthorizer: CustomJWTAuthorizerConfigurationSchema.optional(),
  }).describe(
    "The inbound authorization configuration for authenticating incoming requests.",
  ).optional(),
  Model: z.object({
    BedrockModelConfig: HarnessBedrockModelConfigSchema.optional(),
    OpenAiModelConfig: HarnessOpenAiModelConfigSchema.optional(),
    GeminiModelConfig: HarnessGeminiModelConfigSchema.optional(),
  }).describe("The model configuration for the harness.").optional(),
  SystemPrompt: z.array(HarnessSystemContentBlockSchema).describe(
    "The system prompt that defines the agent's behavior.",
  ).optional(),
  Tools: z.array(HarnessToolSchema).describe(
    "The tools available to the agent.",
  ).optional(),
  Skills: z.array(HarnessSkillSchema).describe(
    "The skills available to the agent.",
  ).optional(),
  AllowedTools: z.array(
    z.string().min(1).max(64).regex(new RegExp("^(\\*|@?[^/]+(/[^/]+)?)$")),
  ).describe("The tools that the agent is allowed to use.").optional(),
  Memory: z.object({
    AgentCoreMemoryConfiguration: HarnessAgentCoreMemoryConfigurationSchema
      .optional(),
  }).describe(
    "The AgentCore Memory configuration for persisting conversation context.",
  ).optional(),
  Truncation: z.object({
    Strategy: z.enum(["sliding_window", "summarization", "none"]).optional(),
    Config: HarnessTruncationStrategyConfigurationSchema.optional(),
  }).describe("The truncation configuration for managing conversation context.")
    .optional(),
  MaxIterations: z.number().int().describe(
    "The maximum number of iterations the agent loop can execute per invocation.",
  ).optional(),
  MaxTokens: z.number().int().describe(
    "The maximum number of tokens the agent can generate per iteration.",
  ).optional(),
  TimeoutSeconds: z.number().int().describe(
    "The maximum duration in seconds for the agent loop execution per invocation.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to apply to the harness resource.")
    .optional(),
});

/** Swamp extension model for BedrockAgentCore Harness. Registered at `@swamp/aws/bedrockagentcore/harness`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/harness",
  version: "2026.05.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore Harness resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore Harness",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::Harness",
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
      description: "Get a BedrockAgentCore Harness",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Harness",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::BedrockAgentCore::Harness",
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
      description: "Update a BedrockAgentCore Harness",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::Harness",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::BedrockAgentCore::Harness",
          identifier,
          currentState,
          desiredState,
          ["HarnessName", "NetworkConfiguration"],
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
      description: "Delete a BedrockAgentCore Harness",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Harness",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::Harness",
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
      description: "Sync BedrockAgentCore Harness state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::Harness",
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
