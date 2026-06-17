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
import type { AwsCredentials } from "./_lib/aws.ts";

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

const S3FilesAccessPointConfigurationSchema = z.object({
  AccessPointArn: z.string().max(256).regex(
    new RegExp(
      "^arn:aws[-a-z]*:s3files:[0-9a-z-:]+:file-system/fs-[0-9a-f]{17,40}/access-point/fsap-[0-9a-f]{17,40}$",
    ),
  ),
  MountPath: z.string().min(6).max(200).regex(
    new RegExp("^/mnt/[a-zA-Z0-9._-]+/?$"),
  ),
});

const EfsAccessPointConfigurationSchema = z.object({
  AccessPointArn: z.string().max(128).regex(
    new RegExp(
      "^arn:aws[-a-z]*:elasticfilesystem:[0-9a-z-:]+:access-point/fsap-[0-9a-f]{8,40}$",
    ),
  ),
  MountPath: z.string().min(6).max(200).regex(
    new RegExp("^/mnt/[a-zA-Z0-9._-]+/?$"),
  ),
});

const FilesystemConfigurationSchema = z.object({
  SessionStorage: SessionStorageConfigurationSchema.optional(),
  S3FilesAccessPoint: S3FilesAccessPointConfigurationSchema.describe(
    "Configuration for an Amazon S3 Files access point to mount into the AgentCore Runtime.",
  ).optional(),
  EfsAccessPoint: EfsAccessPointConfigurationSchema.describe(
    "Configuration for an Amazon EFS access point to mount into the AgentCore Runtime.",
  ).optional(),
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

const SelfManagedLatticeResourceSchema = z.object({
  ResourceConfigurationIdentifier: z.string().min(20).max(2048).regex(
    new RegExp(
      "^((rcfg-[0-9a-z]{17})|(arn:[a-z0-9\\-]+:vpc-lattice:[a-zA-Z0-9\\-]+:\\d{12}:resourceconfiguration/rcfg-[0-9a-z]{17}))$",
    ),
  ),
});

const ManagedVpcResourceSchema = z.object({
  VpcIdentifier: z.string().regex(
    new RegExp("^vpc-(([0-9a-z]{8})|([0-9a-z]{17}))$"),
  ),
  SubnetIds: z.array(
    z.string().regex(new RegExp("^subnet-[0-9a-zA-Z]{8,17}$")),
  ),
  EndpointIpAddressType: z.enum(["IPV4", "IPV6"]),
  SecurityGroupIds: z.array(
    z.string().regex(new RegExp("^sg-(([0-9a-z]{8})|([0-9a-z]{17}))$")),
  ).optional(),
  Tags: z.record(
    z.string(),
    z.string().max(256).regex(new RegExp("^[a-zA-Z0-9\\s_.:/=+\\-@]*$")),
  ).optional(),
  RoutingDomain: z.string().min(3).max(255).optional(),
});

const PrivateEndpointSchema = z.object({
  SelfManagedLatticeResource: SelfManagedLatticeResourceSchema.describe(
    "Configuration for connecting to a private resource using a self-managed VPC Lattice resource configuration.",
  ).optional(),
  ManagedVpcResource: ManagedVpcResourceSchema.describe(
    "Configuration for a service-managed VPC endpoint.",
  ).optional(),
});

const PrivateEndpointOverrideSchema = z.object({
  Domain: z.string().min(1).max(253),
  PrivateEndpoint: PrivateEndpointSchema.describe(
    "Private endpoint configuration for connecting to the OpenID Connect discovery endpoint over a private network.",
  ),
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
  PrivateEndpoint: PrivateEndpointSchema.describe(
    "Private endpoint configuration for connecting to the OpenID Connect discovery endpoint over a private network.",
  ).optional(),
  PrivateEndpointOverrides: z.array(PrivateEndpointOverrideSchema).optional(),
});

const HarnessBedrockModelConfigSchema = z.object({
  ModelId: z.string(),
  MaxTokens: z.number().int().min(1).optional(),
  Temperature: z.number().min(0).max(2).optional(),
  TopP: z.number().min(0).max(1).optional(),
  ApiFormat: z.enum(["converse_stream", "responses", "chat_completions"])
    .optional(),
  AdditionalParams: z.record(z.string(), z.unknown()).describe(
    "Provider-specific parameters passed through to the model provider unchanged.",
  ).optional(),
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
  ApiFormat: z.enum(["chat_completions", "responses"]).optional(),
  AdditionalParams: z.record(z.string(), z.unknown()).describe(
    "Provider-specific parameters passed through to the model provider unchanged.",
  ).optional(),
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

const HarnessLiteLlmModelConfigSchema = z.object({
  ModelId: z.string(),
  ApiKeyArn: z.string().regex(
    new RegExp(
      "^arn:aws:bedrock-agentcore:[a-z0-9-]+:[0-9]{12}:token-vault/[a-zA-Z0-9-.]+/apikeycredentialprovider/[a-zA-Z0-9-.]+$",
    ),
  ).optional(),
  ApiBase: z.string().min(1).max(16383).optional(),
  MaxTokens: z.number().int().min(1).optional(),
  Temperature: z.number().min(0).max(2).optional(),
  TopP: z.number().min(0).max(1).optional(),
  AdditionalParams: z.record(z.string(), z.unknown()).describe(
    "Provider-specific parameters passed through to LiteLLM unchanged.",
  ).optional(),
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
  AwsIam: z.record(z.string(), z.unknown()).optional(),
  None: z.record(z.string(), z.unknown()).optional(),
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
  InputSchema: z.record(z.string(), z.unknown()).describe(
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

const HarnessSkillS3SourceSchema = z.object({
  Uri: z.string().min(5).regex(new RegExp("^s3://")).describe(
    "The S3 URI pointing to the skill directory (e.g., s3://bucket/skills/my-skill/).",
  ),
});

const HarnessSkillGitAuthSchema = z.object({
  CredentialArn: z.string().regex(
    new RegExp(
      "^arn:aws:bedrock-agentcore:[a-z0-9-]+:[0-9]{12}:token-vault/[a-zA-Z0-9-.]+/apikeycredentialprovider/[a-zA-Z0-9-.]+$",
    ),
  ).describe(
    "The ARN of the credential in AgentCore Identity containing the password or personal access token.",
  ),
  Username: z.string().describe(
    "Username for authentication. Defaults to 'oauth2' if not specified.",
  ).optional(),
});

const HarnessSkillGitSourceSchema = z.object({
  Url: z.string().min(8).regex(new RegExp("^https://")).describe(
    "The HTTPS URL of the git repository.",
  ),
  Path: z.string().describe(
    "Subdirectory within the repository containing the skill.",
  ).optional(),
  Auth: HarnessSkillGitAuthSchema.describe(
    "Authentication configuration for accessing a private git repository.",
  ).optional(),
});

const HarnessSkillSchema = z.object({
  Path: z.string().min(1).describe(
    "The filesystem path to the skill definition.",
  ).optional(),
  S3: HarnessSkillS3SourceSchema.describe("An S3 source containing the skill.")
    .optional(),
  Git: HarnessSkillGitSourceSchema.describe(
    "A git repository containing the skill, cloned over HTTPS.",
  ).optional(),
});

const HarnessAgentCoreMemoryRetrievalConfigSchema = z.object({
  TopK: z.number().int().describe(
    "Maximum number of memory records to retrieve. Typed as both integer and string because CloudFormation marshals scalars nested in dynamic-key (patternProperties) maps as strings, while direct API/CDK callers send a JSON integer; both forms must validate.",
  ).optional(),
  RelevanceScore: z.number().describe(
    "Minimum relevance score for retrieved memories. Typed as both number and string because CloudFormation marshals scalars nested in dynamic-key (patternProperties) maps as strings, while direct API/CDK callers send a JSON number; both forms must validate.",
  ).optional(),
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
    LiteLlmModelConfig: HarnessLiteLlmModelConfigSchema.optional(),
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
    LiteLlmModelConfig: HarnessLiteLlmModelConfigSchema,
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
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
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
    LiteLlmModelConfig: HarnessLiteLlmModelConfigSchema.optional(),
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

/** Swamp extension model for BedrockAgentCore Harness. Registered at `@swamp/aws/bedrockagentcore/harness`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/harness",
  version: "2026.06.17.1",
  upgrades: [
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
      toVersion: "2026.06.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
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
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::BedrockAgentCore::Harness",
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
      description: "Get a BedrockAgentCore Harness",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Harness",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BedrockAgentCore::Harness",
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
      description: "Update a BedrockAgentCore Harness",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::Harness",
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
          "AWS::BedrockAgentCore::Harness",
          identifier,
          currentState,
          desiredState,
          ["HarnessName"],
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
      description: "Delete a BedrockAgentCore Harness",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Harness",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::Harness",
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
      description: "Sync BedrockAgentCore Harness state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::Harness",
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
