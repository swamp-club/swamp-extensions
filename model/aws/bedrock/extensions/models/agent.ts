// Auto-generated extension model for @swamp/aws/bedrock/agent
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Bedrock Agent (AWS::Bedrock::Agent).
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

const S3IdentifierSchema = z.object({
  S3BucketName: z.string().min(3).max(63).regex(
    new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ).describe("A bucket in S3.").optional(),
  S3ObjectKey: z.string().min(1).max(1024).regex(
    new RegExp(
      "^[\\.\\-\\!\\*\\_\\'\\(\\)a-zA-Z0-9][\\.\\-\\!\\*\\_\\'\\(\\)\\/a-zA-Z0-9]*$",
    ),
  ).describe("A object key in S3.").optional(),
});

const ParameterDetailSchema = z.object({
  Description: z.string().min(1).max(500).describe(
    "Description of function parameter.",
  ).optional(),
  Type: z.enum(["string", "number", "integer", "boolean", "array"]).describe(
    "Parameter Type",
  ),
  Required: z.boolean().describe(
    "Information about if a parameter is required for function call. Default to false.",
  ).optional(),
});

const FunctionSchema = z.object({
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$")).describe(
    "Name for a resource.",
  ),
  Description: z.string().min(1).max(1200).describe("Description of function")
    .optional(),
  Parameters: z.record(z.string(), ParameterDetailSchema).describe(
    "A map of parameter name and detail",
  ).optional(),
  RequireConfirmation: z.enum(["ENABLED", "DISABLED"]).describe(
    "ENUM to check if action requires user confirmation",
  ).optional(),
});

const FunctionsSchema = z.object({
  Functions: z.array(FunctionSchema).describe("List of Function definitions"),
});

const AgentActionGroupSchema = z.object({
  ActionGroupName: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$"))
    .describe("Name of the action group"),
  Description: z.string().min(1).max(200).describe(
    "Description of action group",
  ).optional(),
  ParentActionGroupSignature: z.enum([
    "AMAZON.UserInput",
    "AMAZON.CodeInterpreter",
  ]).describe("Action Group Signature for a BuiltIn Action").optional(),
  ActionGroupExecutor: z.object({
    Lambda: z.string().max(2048).regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*)?:lambda:[a-z0-9-]{1,20}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
      ),
    ).describe("ARN of a Lambda.").optional(),
    CustomControl: z.enum(["RETURN_CONTROL"]).describe(
      "Custom control of action execution",
    ).optional(),
  }).describe("Type of Executors for an Action Group").optional(),
  ApiSchema: z.object({
    S3: S3IdentifierSchema.describe("The identifier for the S3 resource.")
      .optional(),
    Payload: z.string().describe("String OpenAPI Payload").optional(),
  }).describe("Contains information about the API Schema for the Action Group")
    .optional(),
  ActionGroupState: z.enum(["ENABLED", "DISABLED"]).describe(
    "State of the action group",
  ).optional(),
  FunctionSchema: FunctionsSchema.describe("Schema of Functions").optional(),
  SkipResourceInUseCheckOnDelete: z.boolean().describe(
    "Specifies whether to allow deleting action group while it is in use.",
  ).optional(),
});

const LambdaSchema = z.object({
  Lambda: z.string().max(2048).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*)?:lambda:[a-z0-9-]{1,20}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
    ),
  ).describe("ARN of a Lambda."),
});

const SessionSummaryConfigurationSchema = z.object({
  MaxRecentSessions: z.number().describe(
    "Maximum number of Sessions to Summarize",
  ).optional(),
});

const AgentKnowledgeBaseSchema = z.object({
  KnowledgeBaseId: z.string().regex(new RegExp("^[0-9a-zA-Z]{10}$")).describe(
    "Identifier for a resource.",
  ),
  Description: z.string().min(1).max(200).describe(
    "Description of the Resource.",
  ),
  KnowledgeBaseState: z.enum(["ENABLED", "DISABLED"]).describe(
    "State of the knowledge base; whether it is enabled or disabled",
  ).optional(),
});

const AgentCollaboratorSchema = z.object({
  AgentDescriptor: z.object({
    AliasArn: z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:agent-alias/[0-9a-zA-Z]{10}/[0-9a-zA-Z]{10}$",
      ),
    ).describe("Alias ARN for agent descriptor").optional(),
  }).describe("Agent descriptor for agent collaborator"),
  CollaborationInstruction: z.string().describe(
    "Agent collaborator instruction",
  ),
  CollaboratorName: z.string().describe("Agent collaborator name"),
  RelayConversationHistory: z.enum(["TO_COLLABORATOR", "DISABLED"]).describe(
    "Relay conversation history state",
  ).optional(),
});

const InferenceConfigurationSchema = z.object({
  Temperature: z.number().min(0).max(1).describe(
    "Controls randomness, higher values increase diversity",
  ).optional(),
  TopP: z.number().min(0).max(1).describe(
    "Cumulative probability cutoff for token selection",
  ).optional(),
  TopK: z.number().min(0).max(500).describe(
    "Sample from the k most likely next tokens",
  ).optional(),
  MaximumLength: z.number().min(0).max(131072).describe(
    "Maximum length of output",
  ).optional(),
  StopSequences: z.array(z.string()).describe("List of stop sequences")
    .optional(),
});

const PromptConfigurationSchema = z.object({
  PromptType: z.enum([
    "PRE_PROCESSING",
    "ORCHESTRATION",
    "POST_PROCESSING",
    "ROUTING_CLASSIFIER",
    "MEMORY_SUMMARIZATION",
    "KNOWLEDGE_BASE_RESPONSE_GENERATION",
  ]).describe("Prompt Type.").optional(),
  PromptCreationMode: z.enum(["DEFAULT", "OVERRIDDEN"]).describe(
    "Creation Mode for Prompt Configuration.",
  ).optional(),
  PromptState: z.enum(["ENABLED", "DISABLED"]).describe("Prompt State.")
    .optional(),
  BasePromptTemplate: z.string().min(1).max(100000).describe(
    "Base Prompt Template.",
  ).optional(),
  InferenceConfiguration: InferenceConfigurationSchema.describe(
    "Configuration for inference in prompt configuration",
  ).optional(),
  ParserMode: z.enum(["DEFAULT", "OVERRIDDEN"]).describe(
    "Creation Mode for Prompt Configuration.",
  ).optional(),
  FoundationModel: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:(([0-9]{12}:custom-model/[a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63}(([:][a-z0-9-]{1,63}){0,2})?/[a-z0-9]{12})|(:foundation-model/([a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63}([.]?[a-z0-9-]{1,63})([:][a-z0-9-]{1,63}){0,2}))|([0-9]{12}:(inference-profile|application-inference-profile)/[a-zA-Z0-9-:.]+))|(([a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63}([.]?[a-z0-9-]{1,63})([:][a-z0-9-]{1,63}){0,2}))|(([0-9a-zA-Z][_-]?)+)$",
    ),
  ).describe("ARN or name of a Bedrock model.").optional(),
  AdditionalModelRequestFields: z.record(z.string(), z.unknown()).describe(
    "Additional Model Request Fields for Prompt Configuration",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ActionGroups: z.array(AgentActionGroupSchema).describe("List of ActionGroups")
    .optional(),
  AgentName: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$"))
    .describe("Name for a resource."),
  AgentResourceRoleArn: z.string().max(2048).describe("ARN of a IAM role.")
    .optional(),
  AutoPrepare: z.boolean().describe(
    "Specifies whether to automatically prepare after creating or updating the agent.",
  ).optional(),
  CustomOrchestration: z.object({
    Executor: LambdaSchema.describe(
      "Types of executors for custom orchestration strategy",
    ).optional(),
  }).describe("Structure for custom orchestration").optional(),
  CustomerEncryptionKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
    ),
  ).describe("A KMS key ARN").optional(),
  SkipResourceInUseCheckOnDelete: z.boolean().describe(
    "Specifies whether to allow deleting agent while it is in use.",
  ).optional(),
  Description: z.string().min(1).max(200).describe(
    "Description of the Resource.",
  ).optional(),
  FoundationModel: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:(([0-9]{12}:custom-model/[a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63}(([:][a-z0-9-]{1,63}){0,2})?/[a-z0-9]{12})|(:foundation-model/([a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63}([.]?[a-z0-9-]{1,63})([:][a-z0-9-]{1,63}){0,2}))|([0-9]{12}:(inference-profile|application-inference-profile)/[a-zA-Z0-9-:.]+))|(([a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63}([.]?[a-z0-9-]{1,63})([:][a-z0-9-]{1,63}){0,2}))|(([0-9a-zA-Z][_-]?)+)$",
    ),
  ).describe("ARN or name of a Bedrock model.").optional(),
  GuardrailConfiguration: z.object({
    GuardrailIdentifier: z.string().max(2048).regex(
      new RegExp(
        "^(([a-z0-9]+)|(arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:guardrail/[a-z0-9]+))$",
      ),
    ).describe("Identifier for the guardrail, could be the id or the arn")
      .optional(),
    GuardrailVersion: z.string().regex(new RegExp("^(([0-9]{1,8})|(DRAFT))$"))
      .describe("Version of the guardrail").optional(),
  }).describe("Configuration for a guardrail.").optional(),
  MemoryConfiguration: z.object({
    EnabledMemoryTypes: z.array(z.enum(["SESSION_SUMMARY"])).describe(
      "Types of session storage persisted in memory",
    ).optional(),
    StorageDays: z.number().describe(
      "Maximum number of days to store session details",
    ).optional(),
    SessionSummaryConfiguration: SessionSummaryConfigurationSchema.describe(
      "Configuration for Session Summarization",
    ).optional(),
  }).describe("Configuration for memory storage").optional(),
  IdleSessionTTLInSeconds: z.number().min(60).max(5400).describe(
    "Max Session Time.",
  ).optional(),
  AgentCollaboration: z.enum(["DISABLED", "SUPERVISOR", "SUPERVISOR_ROUTER"])
    .describe("Agent collaboration state").optional(),
  Instruction: z.string().min(40).describe("Instruction for the agent.")
    .optional(),
  KnowledgeBases: z.array(AgentKnowledgeBaseSchema).describe(
    "List of Agent Knowledge Bases",
  ).optional(),
  AgentCollaborators: z.array(AgentCollaboratorSchema).describe(
    "List of Agent Collaborators",
  ).optional(),
  OrchestrationType: z.enum(["DEFAULT", "CUSTOM_ORCHESTRATION"]).describe(
    "Types of orchestration strategy for agents",
  ).optional(),
  PromptOverrideConfiguration: z.object({
    PromptConfigurations: z.array(PromptConfigurationSchema).describe(
      "List of BasePromptConfiguration",
    ),
    OverrideLambda: z.string().max(2048).regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*)?:lambda:[a-z0-9-]{1,20}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
      ),
    ).describe("ARN of a Lambda.").optional(),
  }).describe("Configuration for prompt override.").optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
  TestAliasTags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

const StateSchema = z.object({
  ActionGroups: z.array(AgentActionGroupSchema).optional(),
  AgentArn: z.string().optional(),
  AgentId: z.string(),
  AgentName: z.string().optional(),
  AgentResourceRoleArn: z.string().optional(),
  AgentStatus: z.string().optional(),
  AgentVersion: z.string().optional(),
  AutoPrepare: z.boolean().optional(),
  CreatedAt: z.string().optional(),
  CustomOrchestration: z.object({
    Executor: LambdaSchema,
  }).optional(),
  CustomerEncryptionKeyArn: z.string().optional(),
  SkipResourceInUseCheckOnDelete: z.boolean().optional(),
  Description: z.string().optional(),
  FailureReasons: z.array(z.string()).optional(),
  FoundationModel: z.string().optional(),
  GuardrailConfiguration: z.object({
    GuardrailIdentifier: z.string(),
    GuardrailVersion: z.string(),
  }).optional(),
  MemoryConfiguration: z.object({
    EnabledMemoryTypes: z.array(z.string()),
    StorageDays: z.number(),
    SessionSummaryConfiguration: SessionSummaryConfigurationSchema,
  }).optional(),
  IdleSessionTTLInSeconds: z.number().optional(),
  AgentCollaboration: z.string().optional(),
  Instruction: z.string().optional(),
  KnowledgeBases: z.array(AgentKnowledgeBaseSchema).optional(),
  AgentCollaborators: z.array(AgentCollaboratorSchema).optional(),
  OrchestrationType: z.string().optional(),
  PreparedAt: z.string().optional(),
  PromptOverrideConfiguration: z.object({
    PromptConfigurations: z.array(PromptConfigurationSchema),
    OverrideLambda: z.string(),
  }).optional(),
  RecommendedActions: z.array(z.string()).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  TestAliasTags: z.record(z.string(), z.unknown()).optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ActionGroups: z.array(AgentActionGroupSchema).describe("List of ActionGroups")
    .optional(),
  AgentName: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$"))
    .describe("Name for a resource.").optional(),
  AgentResourceRoleArn: z.string().max(2048).describe("ARN of a IAM role.")
    .optional(),
  AutoPrepare: z.boolean().describe(
    "Specifies whether to automatically prepare after creating or updating the agent.",
  ).optional(),
  CustomOrchestration: z.object({
    Executor: LambdaSchema.describe(
      "Types of executors for custom orchestration strategy",
    ).optional(),
  }).describe("Structure for custom orchestration").optional(),
  CustomerEncryptionKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
    ),
  ).describe("A KMS key ARN").optional(),
  SkipResourceInUseCheckOnDelete: z.boolean().describe(
    "Specifies whether to allow deleting agent while it is in use.",
  ).optional(),
  Description: z.string().min(1).max(200).describe(
    "Description of the Resource.",
  ).optional(),
  FoundationModel: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:(([0-9]{12}:custom-model/[a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63}(([:][a-z0-9-]{1,63}){0,2})?/[a-z0-9]{12})|(:foundation-model/([a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63}([.]?[a-z0-9-]{1,63})([:][a-z0-9-]{1,63}){0,2}))|([0-9]{12}:(inference-profile|application-inference-profile)/[a-zA-Z0-9-:.]+))|(([a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63}([.]?[a-z0-9-]{1,63})([:][a-z0-9-]{1,63}){0,2}))|(([0-9a-zA-Z][_-]?)+)$",
    ),
  ).describe("ARN or name of a Bedrock model.").optional(),
  GuardrailConfiguration: z.object({
    GuardrailIdentifier: z.string().max(2048).regex(
      new RegExp(
        "^(([a-z0-9]+)|(arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:guardrail/[a-z0-9]+))$",
      ),
    ).describe("Identifier for the guardrail, could be the id or the arn")
      .optional(),
    GuardrailVersion: z.string().regex(new RegExp("^(([0-9]{1,8})|(DRAFT))$"))
      .describe("Version of the guardrail").optional(),
  }).describe("Configuration for a guardrail.").optional(),
  MemoryConfiguration: z.object({
    EnabledMemoryTypes: z.array(z.enum(["SESSION_SUMMARY"])).describe(
      "Types of session storage persisted in memory",
    ).optional(),
    StorageDays: z.number().describe(
      "Maximum number of days to store session details",
    ).optional(),
    SessionSummaryConfiguration: SessionSummaryConfigurationSchema.describe(
      "Configuration for Session Summarization",
    ).optional(),
  }).describe("Configuration for memory storage").optional(),
  IdleSessionTTLInSeconds: z.number().min(60).max(5400).describe(
    "Max Session Time.",
  ).optional(),
  AgentCollaboration: z.enum(["DISABLED", "SUPERVISOR", "SUPERVISOR_ROUTER"])
    .describe("Agent collaboration state").optional(),
  Instruction: z.string().min(40).describe("Instruction for the agent.")
    .optional(),
  KnowledgeBases: z.array(AgentKnowledgeBaseSchema).describe(
    "List of Agent Knowledge Bases",
  ).optional(),
  AgentCollaborators: z.array(AgentCollaboratorSchema).describe(
    "List of Agent Collaborators",
  ).optional(),
  OrchestrationType: z.enum(["DEFAULT", "CUSTOM_ORCHESTRATION"]).describe(
    "Types of orchestration strategy for agents",
  ).optional(),
  PromptOverrideConfiguration: z.object({
    PromptConfigurations: z.array(PromptConfigurationSchema).describe(
      "List of BasePromptConfiguration",
    ).optional(),
    OverrideLambda: z.string().max(2048).regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*)?:lambda:[a-z0-9-]{1,20}:\\d{12}:function:[a-zA-Z0-9-_\\.]+(:(\\$LATEST|[a-zA-Z0-9-_]+))?$",
      ),
    ).describe("ARN of a Lambda.").optional(),
  }).describe("Configuration for prompt override.").optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
  TestAliasTags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

/** Swamp extension model for Bedrock Agent. Registered at `@swamp/aws/bedrock/agent`. */
export const model = {
  type: "@swamp/aws/bedrock/agent",
  version: "2026.05.27.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Bedrock Agent resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock Agent",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Bedrock::Agent",
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
      description: "Get a Bedrock Agent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock Agent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Bedrock::Agent",
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
      description: "Update a Bedrock Agent",
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
        const identifier = existing.AgentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Bedrock::Agent",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Bedrock::Agent",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a Bedrock Agent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock Agent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Bedrock::Agent",
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
      description: "Sync Bedrock Agent state from AWS",
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
        const identifier = existing.AgentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Bedrock::Agent",
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
