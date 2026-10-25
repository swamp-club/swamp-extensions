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

// Auto-generated extension model for @swamp/aws/bedrock/flow-version
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Bedrock FlowVersion (AWS::Bedrock::FlowVersion).
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

const GuardrailConfigurationSchema = z.object({
  GuardrailIdentifier: z.string().max(2048).regex(
    new RegExp(
      "^(([a-z0-9]+)|(arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:guardrail/[a-z0-9]+))$",
    ),
  ).describe("Identifier for the guardrail, could be the id or the arn")
    .optional(),
  GuardrailVersion: z.string().regex(new RegExp("^(([0-9]{1,8})|(DRAFT))$"))
    .describe("Version of the guardrail").optional(),
});

const PromptModelInferenceConfigurationSchema = z.object({
  Temperature: z.number().min(0).max(1).describe(
    "Controls randomness, higher values increase diversity",
  ).optional(),
  TopP: z.number().min(0).max(1).describe(
    "Cumulative probability cutoff for token selection",
  ).optional(),
  MaxTokens: z.number().min(0).max(4096).describe("Maximum length of output")
    .optional(),
  StopSequences: z.array(z.string()).describe("List of stop sequences")
    .optional(),
});

const PerformanceConfigurationSchema = z.object({
  Latency: z.enum(["standard", "optimized"]).describe(
    "Performance Configuration Latency",
  ).optional(),
});

const KnowledgeBaseOrchestrationConfigurationSchema = z.object({
  PromptTemplate: z.object({
    TextPromptTemplate: z.string().min(1).max(100000).optional(),
  }).describe("Knowledge Base Prompt template").optional(),
  InferenceConfig: z.object({
    Text: PromptModelInferenceConfigurationSchema.describe(
      "Prompt model inference configuration",
    ).optional(),
  }).describe("Model inference configuration").optional(),
  AdditionalModelRequestFields: z.record(z.string(), z.unknown()).optional(),
  PerformanceConfig: PerformanceConfigurationSchema.optional(),
});

const VectorSearchBedrockRerankingModelConfigurationSchema = z.object({
  ModelArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}::foundation-model/(.*))?$",
    ),
  ).describe("Arn of a Bedrock Reranking model"),
  AdditionalModelRequestFields: z.record(z.string(), z.unknown()).optional(),
});

const FieldForRerankingSchema = z.object({
  FieldName: z.string().min(1).max(2000).describe("Field name for reranking"),
});

const MetadataConfigurationForRerankingSchema = z.object({
  SelectionMode: z.enum(["SELECTIVE", "ALL"]).describe(
    "Reranking Metadata Selection Mode",
  ),
  SelectiveModeConfiguration: z.object({
    FieldsToInclude: z.array(FieldForRerankingSchema).describe(
      "List of Fields For Reranking",
    ).optional(),
    FieldsToExclude: z.array(FieldForRerankingSchema).describe(
      "List of Fields For Reranking",
    ).optional(),
  }).describe("Reranking Metadata Selective Mode Configuration").optional(),
});

const VectorSearchBedrockRerankingConfigurationSchema = z.object({
  ModelConfiguration: VectorSearchBedrockRerankingModelConfigurationSchema,
  NumberOfRerankedResults: z.number().min(1).max(100).describe(
    "Number Of Results For Reranking",
  ).optional(),
  MetadataConfiguration: MetadataConfigurationForRerankingSchema.optional(),
});

const VectorSearchRerankingConfigurationSchema = z.object({
  Type: z.enum(["BEDROCK_RERANKING_MODEL"]).describe(
    "Enum of Rerank Configuration Types",
  ),
  BedrockRerankingConfiguration: VectorSearchBedrockRerankingConfigurationSchema
    .optional(),
});

const KnowledgeBaseFlowNodeConfigurationSchema = z.object({
  KnowledgeBaseId: z.string().max(10).regex(new RegExp("^[0-9a-zA-Z]+$"))
    .describe("Identifier of the KnowledgeBase"),
  ModelId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(arn:aws(-[^:]{1,12})?:(bedrock|sagemaker):[a-z0-9-]{1,20}:([0-9]{12})?:([a-z-]+/)?)?([a-zA-Z0-9.-]{1,63}){0,2}(([:][a-z0-9-]{1,63}){0,2})?(/[a-z0-9]{1,12})?$",
    ),
  ).describe(
    "ARN or Id of a Bedrock Foundational Model or Inference Profile, or the ARN of a imported model, or a provisioned throughput ARN for custom models.",
  ).optional(),
  GuardrailConfiguration: GuardrailConfigurationSchema.describe(
    "Configuration for a guardrail",
  ).optional(),
  NumberOfResults: z.number().min(1).max(100).describe(
    "Number Of Results to Retrieve",
  ).optional(),
  PromptTemplate: z.object({
    TextPromptTemplate: z.string().min(1).max(100000).optional(),
  }).describe("Knowledge Base Prompt template").optional(),
  InferenceConfiguration: z.object({
    Text: PromptModelInferenceConfigurationSchema.describe(
      "Prompt model inference configuration",
    ).optional(),
  }).describe("Model inference configuration").optional(),
  OrchestrationConfiguration: KnowledgeBaseOrchestrationConfigurationSchema
    .optional(),
  RerankingConfiguration: VectorSearchRerankingConfigurationSchema.optional(),
});

const FlowConditionSchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z]([_]?[0-9a-zA-Z]){1,50}$"))
    .describe("Name of a condition in a flow"),
  Expression: z.string().min(1).max(64).describe(
    "Expression for a condition in a flow",
  ).optional(),
});

const ConditionFlowNodeConfigurationSchema = z.object({
  Conditions: z.array(FlowConditionSchema).describe(
    "List of conditions in a condition node",
  ),
});

const LexFlowNodeConfigurationSchema = z.object({
  BotAliasArn: z.string().max(78).regex(
    new RegExp(
      "^arn:aws(|-us-gov):lex:[a-z]{2}(-gov)?-[a-z]+-\\d{1}:\\d{12}:bot-alias/[0-9a-zA-Z]+/[0-9a-zA-Z]+$",
    ),
  ).describe("ARN of a Lex bot alias"),
  LocaleId: z.string().min(1).max(10).describe("Lex bot locale id"),
});

const PromptFlowNodeResourceConfigurationSchema = z.object({
  PromptArn: z.string().regex(
    new RegExp(
      "^(arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:prompt/[0-9a-zA-Z]{10}(?::[0-9]{1,5})?)$",
    ),
  ).describe("ARN of a prompt resource possibly with a version"),
});

const PromptInputVariableSchema = z.object({
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$")).describe(
    "Name for an input variable",
  ).optional(),
});

const TextPromptTemplateConfigurationSchema = z.object({
  Text: z.string().min(1).max(200000).describe(
    "Prompt content for String prompt template",
  ),
  InputVariables: z.array(PromptInputVariableSchema).describe(
    "List of input variables",
  ).optional(),
});

const PromptFlowNodeInlineConfigurationSchema = z.object({
  TemplateType: z.enum(["TEXT"]).describe("Prompt template type"),
  TemplateConfiguration: z.object({
    Text: TextPromptTemplateConfigurationSchema.describe(
      "Configuration for text prompt template",
    ).optional(),
  }).describe("Prompt template configuration"),
  ModelId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(arn:aws(-[^:]{1,12})?:(bedrock|sagemaker):[a-z0-9-]{1,20}:([0-9]{12})?:([a-z-]+/)?)?([a-zA-Z0-9.-]{1,63}){0,2}(([:][a-z0-9-]{1,63}){0,2})?(/[a-z0-9]{1,12})?$",
    ),
  ).describe(
    "ARN or Id of a Bedrock Foundational Model or Inference Profile, or the ARN of a imported model, or a provisioned throughput ARN for custom models.",
  ),
  InferenceConfiguration: z.object({
    Text: PromptModelInferenceConfigurationSchema.describe(
      "Prompt model inference configuration",
    ).optional(),
  }).describe("Model inference configuration").optional(),
});

const PromptFlowNodeConfigurationSchema = z.object({
  SourceConfiguration: z.object({
    Resource: PromptFlowNodeResourceConfigurationSchema.describe(
      "Resource prompt configuration for prompt node",
    ).optional(),
    Inline: PromptFlowNodeInlineConfigurationSchema.describe(
      "Inline prompt configuration for prompt node",
    ).optional(),
  }).describe("Prompt source configuration for prompt node"),
  GuardrailConfiguration: GuardrailConfigurationSchema.describe(
    "Configuration for a guardrail",
  ).optional(),
});

const LambdaFunctionFlowNodeConfigurationSchema = z.object({
  LambdaArn: z.string().max(2048).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:lambda:[a-z]{2}(-gov)?-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
    ),
  ).describe("ARN of a Lambda."),
});

const AgentFlowNodeConfigurationSchema = z.object({
  AgentAliasArn: z.string().max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:agent-alias/[0-9a-zA-Z]{10}/[0-9a-zA-Z]{10}$",
    ),
  ).describe("Arn representation of the Agent Alias."),
});

const StorageFlowNodeS3ConfigurationSchema = z.object({
  BucketName: z.string().regex(
    new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ).describe(
    "bucket name of an s3 that will be used for storage flow node configuration",
  ),
});

const StorageFlowNodeConfigurationSchema = z.object({
  ServiceConfiguration: z.object({
    S3: StorageFlowNodeS3ConfigurationSchema.describe(
      "s3 storage configuration for storage node",
    ).optional(),
  }).describe("storage service configuration for storage node"),
});

const RetrievalFlowNodeS3ConfigurationSchema = z.object({
  BucketName: z.string().regex(
    new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ).describe(
    "bucket name of an s3 that will be used for Retrieval flow node configuration",
  ),
});

const RetrievalFlowNodeConfigurationSchema = z.object({
  ServiceConfiguration: z.object({
    S3: RetrievalFlowNodeS3ConfigurationSchema.describe(
      "s3 Retrieval configuration for Retrieval node",
    ).optional(),
  }).describe("Retrieval service configuration for Retrieval node"),
});

const InlineCodeFlowNodeConfigurationSchema = z.object({
  Code: z.string().max(5000000).describe(
    "The inline code entered by customers. max size is 5MB.",
  ),
  Language: z.enum(["Python_3"]).describe(
    "Enum encodes the supported language type",
  ),
});

const LoopFlowNodeConfigurationSchema = z.object({
  Definition: z.record(z.string(), z.unknown()).describe("Flow definition"),
});

const LoopControllerFlowNodeConfigurationSchema = z.object({
  ContinueCondition: FlowConditionSchema.describe(
    "Condition branch for a condition node",
  ),
  MaxIterations: z.number().min(1).max(1000).describe(
    "Maximum number of iterations the loop can perform",
  ).optional(),
});

const FlowNodeInputSchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z]([_]?[0-9a-zA-Z]){1,50}$"))
    .describe("Name of a node input in a flow"),
  Type: z.enum(["String", "Number", "Boolean", "Object", "Array"]).describe(
    "Type of input/output for a node in a flow",
  ),
  Expression: z.string().min(1).max(64).describe(
    "Expression for a node input in a flow",
  ),
});

const FlowNodeOutputSchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z]([_]?[0-9a-zA-Z]){1,50}$"))
    .describe("Name of a node output in a flow"),
  Type: z.enum(["String", "Number", "Boolean", "Object", "Array"]).describe(
    "Type of input/output for a node in a flow",
  ),
});

const FlowNodeSchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z]([_]?[0-9a-zA-Z]){1,50}$"))
    .describe("Name of a node in a flow"),
  Type: z.enum([
    "Input",
    "Output",
    "KnowledgeBase",
    "Condition",
    "Lex",
    "Prompt",
    "LambdaFunction",
    "Agent",
    "Iterator",
    "Collector",
    "Storage",
    "Retrieval",
    "InlineCode",
    "Loop",
    "LoopInput",
    "LoopController",
  ]).describe("Flow node types"),
  Configuration: z.object({
    Input: z.record(z.string(), z.unknown()).describe(
      "Input flow node configuration",
    ).optional(),
    Output: z.record(z.string(), z.unknown()).describe(
      "Output flow node configuration",
    ).optional(),
    KnowledgeBase: KnowledgeBaseFlowNodeConfigurationSchema.describe(
      "Knowledge base flow node configuration",
    ).optional(),
    Condition: ConditionFlowNodeConfigurationSchema.describe(
      "Condition flow node configuration",
    ).optional(),
    Lex: LexFlowNodeConfigurationSchema.describe("Lex flow node configuration")
      .optional(),
    Prompt: PromptFlowNodeConfigurationSchema.describe(
      "Prompt flow node configuration",
    ).optional(),
    LambdaFunction: LambdaFunctionFlowNodeConfigurationSchema.describe(
      "Lambda function flow node configuration",
    ).optional(),
    Agent: AgentFlowNodeConfigurationSchema.describe(
      "Agent flow node configuration",
    ).optional(),
    Storage: StorageFlowNodeConfigurationSchema.describe(
      "Storage flow node configuration",
    ).optional(),
    Retrieval: RetrievalFlowNodeConfigurationSchema.describe(
      "Retrieval flow node configuration",
    ).optional(),
    Iterator: z.record(z.string(), z.unknown()).describe(
      "Iterator flow node configuration",
    ).optional(),
    Collector: z.record(z.string(), z.unknown()).describe(
      "Collector flow node configuration",
    ).optional(),
    InlineCode: InlineCodeFlowNodeConfigurationSchema.describe(
      "Inline code config strucuture, contains code configs",
    ).optional(),
    Loop: LoopFlowNodeConfigurationSchema.describe(
      "Loop node config, contains loop's internal definition",
    ).optional(),
    LoopInput: z.record(z.string(), z.unknown()).describe(
      "Configuration for the LoopInput node",
    ).optional(),
    LoopController: LoopControllerFlowNodeConfigurationSchema.describe(
      "Configuration for the LoopController node, which manages loop execution",
    ).optional(),
  }).describe("Node configuration in a flow").optional(),
  Inputs: z.array(FlowNodeInputSchema).describe("List of node inputs in a flow")
    .optional(),
  Outputs: z.array(FlowNodeOutputSchema).describe(
    "List of node outputs in a flow",
  ).optional(),
});

const FlowDataConnectionConfigurationSchema = z.object({
  SourceOutput: z.string().regex(
    new RegExp("^[a-zA-Z]([_]?[0-9a-zA-Z]){1,50}$"),
  ).describe("Name of a node output in a flow"),
  TargetInput: z.string().regex(new RegExp("^[a-zA-Z]([_]?[0-9a-zA-Z]){1,50}$"))
    .describe("Name of a node input in a flow"),
});

const FlowConditionalConnectionConfigurationSchema = z.object({
  Condition: z.string().regex(new RegExp("^[a-zA-Z]([_]?[0-9a-zA-Z]){1,50}$"))
    .describe("Name of a condition in a flow"),
});

const FlowConnectionSchema = z.object({
  Type: z.enum(["Data", "Conditional"]).describe("Connection type"),
  Name: z.string().regex(new RegExp("^[a-zA-Z]([_]?[0-9a-zA-Z]){1,100}$"))
    .describe("Name of a connection in a flow"),
  Source: z.string().regex(new RegExp("^[a-zA-Z]([_]?[0-9a-zA-Z]){1,50}$"))
    .describe("Name of a node in a flow"),
  Target: z.string().regex(new RegExp("^[a-zA-Z]([_]?[0-9a-zA-Z]){1,50}$"))
    .describe("Name of a node in a flow"),
  Configuration: z.object({
    Data: FlowDataConnectionConfigurationSchema.describe(
      "Data connection configuration",
    ).optional(),
    Conditional: FlowConditionalConnectionConfigurationSchema.describe(
      "Conditional connection configuration",
    ).optional(),
  }).describe("Connection configuration").optional(),
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
  FlowArn: z.string().regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:flow/[0-9a-zA-Z]{10}$",
    ),
  ).describe("Arn representation of the Flow"),
  Definition: z.object({
    Nodes: z.array(FlowNodeSchema).describe("List of nodes in a flow")
      .optional(),
    Connections: z.array(FlowConnectionSchema).describe("List of connections")
      .optional(),
  }).describe("Flow definition").optional(),
  Description: z.string().min(1).max(200).describe(
    "Description of the flow version",
  ).optional(),
});

const StateSchema = z.object({
  FlowArn: z.string(),
  CreatedAt: z.string().optional(),
  Definition: z.object({
    Nodes: z.array(FlowNodeSchema),
    Connections: z.array(FlowConnectionSchema),
  }).optional(),
  Description: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  FlowId: z.string().optional(),
  Name: z.string().optional(),
  Status: z.string().optional(),
  Version: z.string(),
  CustomerEncryptionKeyArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FlowArn: z.string().regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:flow/[0-9a-zA-Z]{10}$",
    ),
  ).describe("Arn representation of the Flow").optional(),
  Definition: z.object({
    Nodes: z.array(FlowNodeSchema).describe("List of nodes in a flow")
      .optional(),
    Connections: z.array(FlowConnectionSchema).describe("List of connections")
      .optional(),
  }).describe("Flow definition").optional(),
  Description: z.string().min(1).max(200).describe(
    "Description of the flow version",
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

/** Swamp extension model for Bedrock FlowVersion. Registered at `@swamp/aws/bedrock/flow-version`. */
export const model = {
  type: "@swamp/aws/bedrock/flow-version",
  version: "2026.10.25.1",
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
      toVersion: "2026.10.25.1",
      description: "Added: Definition",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Bedrock FlowVersion resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock FlowVersion",
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
          "AWS::Bedrock::FlowVersion",
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
      description: "Get a Bedrock FlowVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock FlowVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Bedrock::FlowVersion",
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
      description: "Update a Bedrock FlowVersion",
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
          existing.FlowArn?.toString(),
          existing.Version?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Bedrock::FlowVersion",
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
          "AWS::Bedrock::FlowVersion",
          identifier,
          currentState,
          desiredState,
          ["Description", "FlowArn"],
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
      description: "Delete a Bedrock FlowVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock FlowVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Bedrock::FlowVersion",
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
      description: "Sync Bedrock FlowVersion state from AWS",
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
          existing.FlowArn?.toString(),
          existing.Version?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Bedrock::FlowVersion",
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
      description: "List Bedrock FlowVersion resources",
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
          "AWS::Bedrock::FlowVersion",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
