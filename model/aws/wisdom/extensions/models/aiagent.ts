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

// Auto-generated extension model for @swamp/aws/wisdom/aiagent
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Wisdom AIAgent (AWS::Wisdom::AIAgent).
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

const TagConditionSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(1).max(256).optional(),
});

const KnowledgeBaseAssociationConfigurationDataSchema = z.object({
  ContentTagFilter: z.object({
    TagCondition: TagConditionSchema.optional(),
    AndConditions: z.array(TagConditionSchema).optional(),
    OrConditions: z.array(z.object({
      AndConditions: z.array(TagConditionSchema).optional(),
      TagCondition: TagConditionSchema.optional(),
    })).optional(),
  }).optional(),
  MaxResults: z.number().min(1).max(100).optional(),
  OverrideKnowledgeBaseSearchType: z.enum(["HYBRID", "SEMANTIC"]).optional(),
});

const AssociationConfigurationSchema = z.object({
  AssociationId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$",
    ),
  ).optional(),
  AssociationType: z.enum(["KNOWLEDGE_BASE"]).optional(),
  AssociationConfigurationData: z.object({
    KnowledgeBaseAssociationConfigurationData:
      KnowledgeBaseAssociationConfigurationDataSchema.optional(),
  }).optional(),
});

const ManualSearchAIAgentConfigurationSchema = z.object({
  AnswerGenerationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AnswerGenerationAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AssociationConfigurations: z.array(AssociationConfigurationSchema).optional(),
  Locale: z.string().min(1).optional(),
});

const AnswerRecommendationAIAgentConfigurationSchema = z.object({
  IntentLabelingGenerationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  QueryReformulationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AnswerGenerationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AnswerGenerationAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AssociationConfigurations: z.array(AssociationConfigurationSchema).optional(),
  Locale: z.string().min(1).optional(),
});

const SelfServiceAIAgentConfigurationSchema = z.object({
  SelfServicePreProcessingAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  SelfServiceAnswerGenerationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  SelfServiceAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AssociationConfigurations: z.array(AssociationConfigurationSchema).optional(),
});

const EmailResponseAIAgentConfigurationSchema = z.object({
  EmailResponseAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  EmailQueryReformulationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AssociationConfigurations: z.array(AssociationConfigurationSchema).optional(),
  Locale: z.string().min(1).optional(),
});

const EmailOverviewAIAgentConfigurationSchema = z.object({
  EmailOverviewAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  Locale: z.string().min(1).optional(),
});

const EmailGenerativeAnswerAIAgentConfigurationSchema = z.object({
  EmailGenerativeAnswerAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  EmailQueryReformulationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  AssociationConfigurations: z.array(AssociationConfigurationSchema).optional(),
  Locale: z.string().min(1).optional(),
});

const ToolInstructionSchema = z.object({
  Instruction: z.string().optional(),
  Examples: z.array(z.string()).optional(),
});

const ToolOverrideConstantInputValueSchema = z.object({
  Type: z.enum(["STRING", "NUMBER", "JSON_STRING"]),
  Value: z.string().min(1),
});

const ToolOverrideInputValueSchema = z.object({
  JsonPath: z.string().min(1),
  Value: z.object({
    Constant: ToolOverrideConstantInputValueSchema.optional(),
  }),
});

const ToolOutputConfigurationSchema = z.object({
  OutputVariableNameOverride: z.string().min(1).optional(),
  SessionDataNamespace: z.string().min(1).optional(),
});

const ToolOutputFilterSchema = z.object({
  JsonPath: z.string().min(1),
  OutputConfiguration: ToolOutputConfigurationSchema.optional(),
});

const UserInteractionConfigurationSchema = z.object({
  IsUserConfirmationRequired: z.boolean().optional(),
});

const ToolConfigurationSchema = z.object({
  ToolName: z.string().min(1),
  ToolType: z.enum(["MODEL_CONTEXT_PROTOCOL", "RETURN_TO_CONTROL", "CONSTANT"]),
  Title: z.string().min(1).optional(),
  ToolId: z.string().min(1).optional(),
  Description: z.string().min(1).optional(),
  Instruction: ToolInstructionSchema.optional(),
  OverrideInputValues: z.array(ToolOverrideInputValueSchema).optional(),
  OutputFilters: z.array(ToolOutputFilterSchema).optional(),
  InputSchema: z.record(z.string(), z.unknown()).optional(),
  OutputSchema: z.record(z.string(), z.unknown()).optional(),
  Annotations: z.record(z.string(), z.unknown()).optional(),
  UserInteractionConfiguration: UserInteractionConfigurationSchema.optional(),
});

const OrchestrationAIAgentConfigurationSchema = z.object({
  OrchestrationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ),
  OrchestrationAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  ConnectInstanceArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:[a-z-]+?:[a-z-]+?:[a-z0-9-]*?:([0-9]{12})?:[a-zA-Z0-9-:/]+$",
    ),
  ).optional(),
  Locale: z.string().min(1).optional(),
  ToolConfigurations: z.array(ToolConfigurationSchema).optional(),
});

const NoteTakingAIAgentConfigurationSchema = z.object({
  NoteTakingAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  NoteTakingAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  Locale: z.string().min(1).optional(),
});

const CaseSummarizationAIAgentConfigurationSchema = z.object({
  CaseSummarizationAIPromptId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  CaseSummarizationAIGuardrailId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(:[A-Z0-9_$]+){0,1}$",
    ),
  ).optional(),
  Locale: z.string().min(1).optional(),
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
  AssistantId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$|^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}){0,2}$",
    ),
  ),
  Configuration: z.object({
    ManualSearchAIAgentConfiguration: ManualSearchAIAgentConfigurationSchema
      .optional(),
    AnswerRecommendationAIAgentConfiguration:
      AnswerRecommendationAIAgentConfigurationSchema.optional(),
    SelfServiceAIAgentConfiguration: SelfServiceAIAgentConfigurationSchema
      .optional(),
    EmailResponseAIAgentConfiguration: EmailResponseAIAgentConfigurationSchema
      .optional(),
    EmailOverviewAIAgentConfiguration: EmailOverviewAIAgentConfigurationSchema
      .optional(),
    EmailGenerativeAnswerAIAgentConfiguration:
      EmailGenerativeAnswerAIAgentConfigurationSchema.optional(),
    OrchestrationAIAgentConfiguration: OrchestrationAIAgentConfigurationSchema
      .optional(),
    NoteTakingAIAgentConfiguration: NoteTakingAIAgentConfigurationSchema
      .optional(),
    CaseSummarizationAIAgentConfiguration:
      CaseSummarizationAIAgentConfigurationSchema.optional(),
  }),
  Description: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9\\s_.,-]+"),
  ).optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9\\s_.,-]+"))
    .optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
  Type: z.enum([
    "MANUAL_SEARCH",
    "ANSWER_RECOMMENDATION",
    "SELF_SERVICE",
    "EMAIL_RESPONSE",
    "EMAIL_OVERVIEW",
    "EMAIL_GENERATIVE_ANSWER",
    "ORCHESTRATION",
    "NOTE_TAKING",
    "CASE_SUMMARIZATION",
  ]),
});

const StateSchema = z.object({
  AIAgentId: z.string(),
  AIAgentArn: z.string().optional(),
  AssistantId: z.string(),
  AssistantArn: z.string().optional(),
  Configuration: z.object({
    ManualSearchAIAgentConfiguration: ManualSearchAIAgentConfigurationSchema,
    AnswerRecommendationAIAgentConfiguration:
      AnswerRecommendationAIAgentConfigurationSchema,
    SelfServiceAIAgentConfiguration: SelfServiceAIAgentConfigurationSchema,
    EmailResponseAIAgentConfiguration: EmailResponseAIAgentConfigurationSchema,
    EmailOverviewAIAgentConfiguration: EmailOverviewAIAgentConfigurationSchema,
    EmailGenerativeAnswerAIAgentConfiguration:
      EmailGenerativeAnswerAIAgentConfigurationSchema,
    OrchestrationAIAgentConfiguration: OrchestrationAIAgentConfigurationSchema,
    NoteTakingAIAgentConfiguration: NoteTakingAIAgentConfigurationSchema,
    CaseSummarizationAIAgentConfiguration:
      CaseSummarizationAIAgentConfigurationSchema,
  }).optional(),
  Description: z.string().optional(),
  Name: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Type: z.string().optional(),
  ModifiedTimeSeconds: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AssistantId: z.string().regex(
    new RegExp(
      "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$|^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}){0,2}$",
    ),
  ).optional(),
  Configuration: z.object({
    ManualSearchAIAgentConfiguration: ManualSearchAIAgentConfigurationSchema
      .optional(),
    AnswerRecommendationAIAgentConfiguration:
      AnswerRecommendationAIAgentConfigurationSchema.optional(),
    SelfServiceAIAgentConfiguration: SelfServiceAIAgentConfigurationSchema
      .optional(),
    EmailResponseAIAgentConfiguration: EmailResponseAIAgentConfigurationSchema
      .optional(),
    EmailOverviewAIAgentConfiguration: EmailOverviewAIAgentConfigurationSchema
      .optional(),
    EmailGenerativeAnswerAIAgentConfiguration:
      EmailGenerativeAnswerAIAgentConfigurationSchema.optional(),
    OrchestrationAIAgentConfiguration: OrchestrationAIAgentConfigurationSchema
      .optional(),
    NoteTakingAIAgentConfiguration: NoteTakingAIAgentConfigurationSchema
      .optional(),
    CaseSummarizationAIAgentConfiguration:
      CaseSummarizationAIAgentConfigurationSchema.optional(),
  }).optional(),
  Description: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9\\s_.,-]+"),
  ).optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9\\s_.,-]+"))
    .optional(),
  Tags: z.record(z.string(), z.string().min(1).max(256)).optional(),
  Type: z.enum([
    "MANUAL_SEARCH",
    "ANSWER_RECOMMENDATION",
    "SELF_SERVICE",
    "EMAIL_RESPONSE",
    "EMAIL_OVERVIEW",
    "EMAIL_GENERATIVE_ANSWER",
    "ORCHESTRATION",
    "NOTE_TAKING",
    "CASE_SUMMARIZATION",
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

/** Swamp extension model for Wisdom AIAgent. Registered at `@swamp/aws/wisdom/aiagent`. */
export const model = {
  type: "@swamp/aws/wisdom/aiagent",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Wisdom AIAgent resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Wisdom AIAgent",
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
          "AWS::Wisdom::AIAgent",
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
      description: "Get a Wisdom AIAgent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom AIAgent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Wisdom::AIAgent",
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
      description: "Update a Wisdom AIAgent",
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
          existing.AIAgentId?.toString(),
          existing.AssistantId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Wisdom::AIAgent",
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
          "AWS::Wisdom::AIAgent",
          identifier,
          currentState,
          desiredState,
          ["AssistantId", "Name", "Tags", "Type"],
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
      description: "Delete a Wisdom AIAgent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom AIAgent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Wisdom::AIAgent",
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
      description: "Sync Wisdom AIAgent state from AWS",
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
          existing.AIAgentId?.toString(),
          existing.AssistantId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Wisdom::AIAgent",
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
