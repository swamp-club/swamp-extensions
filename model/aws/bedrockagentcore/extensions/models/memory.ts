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

// Auto-generated extension model for @swamp/aws/bedrockagentcore/memory
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for BedrockAgentCore Memory (AWS::BedrockAgentCore::Memory).
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

const StringValidationSchema = z.object({
  AllowedValues: z.array(z.string()),
});

const StringListValidationSchema = z.object({
  AllowedValues: z.array(z.string()).optional(),
  MaxItems: z.number().int().min(1).max(5).optional(),
});

const NumberValidationSchema = z.object({
  MinValue: z.number().optional(),
  MaxValue: z.number().optional(),
});

const ValidationSchema = z.object({
  StringValidation: StringValidationSchema.optional(),
  StringListValidation: StringListValidationSchema.optional(),
  NumberValidation: NumberValidationSchema.optional(),
});

const LlmExtractionConfigSchema = z.object({
  LlmExtractionInstruction: z.string().min(1).max(1000).describe(
    "LLM extraction instruction",
  ).optional(),
  Definition: z.string().min(1).max(1000).describe(
    "Definition for the metadata schema entry",
  ),
  Validation: ValidationSchema.optional(),
});

const ExtractionConfigSchema = z.object({
  LlmExtractionConfig: LlmExtractionConfigSchema.optional(),
});

const MetadataSchemaEntrySchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("Key name for metadata fields"),
  Type: z.enum(["STRING", "STRINGLIST", "NUMBER"]).describe(
    "Supported data types for metadata values",
  ).optional(),
  ExtractionConfig: ExtractionConfigSchema.optional(),
});

const MemoryRecordSchemaSchema = z.object({
  MetadataSchema: z.array(MetadataSchemaEntrySchema).describe(
    "List of metadata schema entries",
  ).optional(),
});

const SemanticMemoryStrategySchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  NamespaceTemplates: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  MemoryRecordSchema: MemoryRecordSchemaSchema.optional(),
  StrategyId: z.string().min(12).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("Unique identifier for the memory strategy").optional(),
  Type: z.enum([
    "SEMANTIC",
    "SUMMARIZATION",
    "USER_PREFERENCE",
    "CUSTOM",
    "EPISODIC",
  ]).describe("Type of memory strategy").optional(),
  Status: z.enum(["CREATING", "ACTIVE", "DELETING", "FAILED"]).describe(
    "Status of the memory strategy",
  ).optional(),
  CreatedAt: z.string().describe("Creation timestamp of the memory strategy")
    .optional(),
  UpdatedAt: z.string().describe("Last update timestamp of the memory strategy")
    .optional(),
});

const SummaryMemoryStrategySchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  NamespaceTemplates: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  MemoryRecordSchema: MemoryRecordSchemaSchema.optional(),
  StrategyId: z.string().min(12).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("Unique identifier for the memory strategy").optional(),
  Type: z.enum([
    "SEMANTIC",
    "SUMMARIZATION",
    "USER_PREFERENCE",
    "CUSTOM",
    "EPISODIC",
  ]).describe("Type of memory strategy").optional(),
  Status: z.enum(["CREATING", "ACTIVE", "DELETING", "FAILED"]).describe(
    "Status of the memory strategy",
  ).optional(),
  CreatedAt: z.string().describe("Creation timestamp of the memory strategy")
    .optional(),
  UpdatedAt: z.string().describe("Last update timestamp of the memory strategy")
    .optional(),
});

const UserPreferenceMemoryStrategySchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  NamespaceTemplates: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  MemoryRecordSchema: MemoryRecordSchemaSchema.optional(),
  StrategyId: z.string().min(12).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("Unique identifier for the memory strategy").optional(),
  Type: z.enum([
    "SEMANTIC",
    "SUMMARIZATION",
    "USER_PREFERENCE",
    "CUSTOM",
    "EPISODIC",
  ]).describe("Type of memory strategy").optional(),
  Status: z.enum(["CREATING", "ACTIVE", "DELETING", "FAILED"]).describe(
    "Status of the memory strategy",
  ).optional(),
  CreatedAt: z.string().describe("Creation timestamp of the memory strategy")
    .optional(),
  UpdatedAt: z.string().describe("Last update timestamp of the memory strategy")
    .optional(),
});

const SemanticOverrideExtractionConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

const SemanticOverrideConsolidationConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

const SemanticOverrideSchema = z.object({
  Extraction: SemanticOverrideExtractionConfigurationInputSchema.optional(),
  Consolidation: SemanticOverrideConsolidationConfigurationInputSchema
    .optional(),
});

const SummaryOverrideConsolidationConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

const SummaryOverrideSchema = z.object({
  Consolidation: SummaryOverrideConsolidationConfigurationInputSchema
    .optional(),
});

const UserPreferenceOverrideExtractionConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

const UserPreferenceOverrideConsolidationConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

const UserPreferenceOverrideSchema = z.object({
  Extraction: UserPreferenceOverrideExtractionConfigurationInputSchema
    .optional(),
  Consolidation: UserPreferenceOverrideConsolidationConfigurationInputSchema
    .optional(),
});

const MessageBasedTriggerInputSchema = z.object({
  MessageCount: z.number().int().min(1).max(50).optional(),
});

const TokenBasedTriggerInputSchema = z.object({
  TokenCount: z.number().int().min(100).max(500000).optional(),
});

const TimeBasedTriggerInputSchema = z.object({
  IdleSessionTimeout: z.number().int().min(10).max(3000).optional(),
});

const TriggerConditionInputSchema = z.object({
  MessageBasedTrigger: MessageBasedTriggerInputSchema.optional(),
  TokenBasedTrigger: TokenBasedTriggerInputSchema.optional(),
  TimeBasedTrigger: TimeBasedTriggerInputSchema.optional(),
});

const InvocationConfigurationInputSchema = z.object({
  TopicArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format").optional(),
  PayloadDeliveryBucketName: z.string().regex(
    new RegExp("^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$"),
  ).optional(),
});

const SelfManagedConfigurationSchema = z.object({
  TriggerConditions: z.array(TriggerConditionInputSchema).optional(),
  InvocationConfiguration: InvocationConfigurationInputSchema.optional(),
  HistoricalContextWindowSize: z.number().int().min(0).max(50).optional(),
});

const EpisodicOverrideExtractionConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

const EpisodicOverrideConsolidationConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
});

const EpisodicOverrideReflectionConfigurationInputSchema = z.object({
  AppendToPrompt: z.string().min(1).max(30000).describe(
    "Text prompt for model instructions",
  ),
  ModelId: z.string(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  NamespaceTemplates: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  MemoryRecordSchema: MemoryRecordSchemaSchema.optional(),
});

const EpisodicOverrideSchema = z.object({
  Extraction: EpisodicOverrideExtractionConfigurationInputSchema.optional(),
  Consolidation: EpisodicOverrideConsolidationConfigurationInputSchema
    .optional(),
  Reflection: EpisodicOverrideReflectionConfigurationInputSchema.optional(),
});

const CustomConfigurationInputSchema = z.object({
  SemanticOverride: SemanticOverrideSchema.optional(),
  SummaryOverride: SummaryOverrideSchema.optional(),
  UserPreferenceOverride: UserPreferenceOverrideSchema.optional(),
  SelfManagedConfiguration: SelfManagedConfigurationSchema.optional(),
  EpisodicOverride: EpisodicOverrideSchema.optional(),
});

const CustomMemoryStrategySchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  NamespaceTemplates: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  Configuration: CustomConfigurationInputSchema.optional(),
  MemoryRecordSchema: MemoryRecordSchemaSchema.optional(),
  StrategyId: z.string().min(12).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("Unique identifier for the memory strategy").optional(),
  Type: z.enum([
    "SEMANTIC",
    "SUMMARIZATION",
    "USER_PREFERENCE",
    "CUSTOM",
    "EPISODIC",
  ]).describe("Type of memory strategy").optional(),
  Status: z.enum(["CREATING", "ACTIVE", "DELETING", "FAILED"]).describe(
    "Status of the memory strategy",
  ).optional(),
  CreatedAt: z.string().describe("Creation timestamp of the memory strategy")
    .optional(),
  UpdatedAt: z.string().describe("Last update timestamp of the memory strategy")
    .optional(),
});

const EpisodicReflectionConfigurationInputSchema = z.object({
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  NamespaceTemplates: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  MemoryRecordSchema: MemoryRecordSchemaSchema.optional(),
});

const EpisodicMemoryStrategySchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  Namespaces: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  NamespaceTemplates: z.array(
    z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9\\-_/]*(\\{(actorId|sessionId|memoryStrategyId)\\}[a-zA-Z0-9\\-_/]*)*$",
      ),
    ),
  ).describe("List of namespaces for memory strategy").optional(),
  ReflectionConfiguration: EpisodicReflectionConfigurationInputSchema
    .optional(),
  MemoryRecordSchema: MemoryRecordSchemaSchema.optional(),
  StrategyId: z.string().min(12).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9-_]{0,99}-[a-zA-Z0-9]{10}$"),
  ).describe("Unique identifier for the memory strategy").optional(),
  Type: z.enum([
    "SEMANTIC",
    "SUMMARIZATION",
    "USER_PREFERENCE",
    "CUSTOM",
    "EPISODIC",
  ]).describe("Type of memory strategy").optional(),
  Status: z.enum(["CREATING", "ACTIVE", "DELETING", "FAILED"]).describe(
    "Status of the memory strategy",
  ).optional(),
  CreatedAt: z.string().describe("Creation timestamp of the memory strategy")
    .optional(),
  UpdatedAt: z.string().describe("Last update timestamp of the memory strategy")
    .optional(),
});

const MemoryStrategySchema = z.object({
  SemanticMemoryStrategy: SemanticMemoryStrategySchema.optional(),
  SummaryMemoryStrategy: SummaryMemoryStrategySchema.optional(),
  UserPreferenceMemoryStrategy: UserPreferenceMemoryStrategySchema.optional(),
  CustomMemoryStrategy: CustomMemoryStrategySchema.optional(),
  EpisodicMemoryStrategy: EpisodicMemoryStrategySchema.optional(),
});

const IndexedKeySchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("Key name for metadata fields"),
  Type: z.enum(["STRING", "STRINGLIST", "NUMBER"]).describe(
    "Supported data types for metadata values",
  ),
});

const ContentConfigurationSchema = z.object({
  Type: z.enum(["MEMORY_RECORDS"]).describe("The type of content to deliver"),
  Level: z.enum(["METADATA_ONLY", "FULL_CONTENT"]).describe(
    "The level of content detail to deliver",
  ).optional(),
});

const KinesisResourceSchema = z.object({
  DataStreamArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format"),
  ContentConfigurations: z.array(ContentConfigurationSchema),
});

const StreamDeliveryResourceSchema = z.object({
  Kinesis: KinesisResourceSchema.optional(),
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
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  EncryptionKeyArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format").optional(),
  MemoryExecutionRoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format").optional(),
  EventExpiryDuration: z.number().int().min(3).max(365).describe(
    "Duration in days until memory events expire",
  ),
  MemoryStrategies: z.array(MemoryStrategySchema).describe(
    "List of memory strategies attached to this memory",
  ).optional(),
  IndexedKeys: z.array(IndexedKeySchema).describe(
    "List of indexed keys for the memory",
  ).optional(),
  StreamDeliveryResources: z.object({
    Resources: z.array(StreamDeliveryResourceSchema),
  }).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  Description: z.string().optional(),
  EncryptionKeyArn: z.string().optional(),
  MemoryExecutionRoleArn: z.string().optional(),
  EventExpiryDuration: z.number().optional(),
  MemoryArn: z.string(),
  MemoryId: z.string().optional(),
  Status: z.string().optional(),
  FailureReason: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  MemoryStrategies: z.array(MemoryStrategySchema).optional(),
  IndexedKeys: z.array(IndexedKeySchema).optional(),
  StreamDeliveryResources: z.object({
    Resources: z.array(StreamDeliveryResourceSchema),
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]{0,47}$")).describe(
    "Name of the Memory resource",
  ).optional(),
  Description: z.string().describe("Description of the Memory resource")
    .optional(),
  EncryptionKeyArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format").optional(),
  MemoryExecutionRoleArn: z.string().regex(
    new RegExp(
      "^arn:(aws(?:-cn|-us-gov|-iso(?:-[bef])?)?):[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("ARN format").optional(),
  EventExpiryDuration: z.number().int().min(3).max(365).describe(
    "Duration in days until memory events expire",
  ).optional(),
  MemoryStrategies: z.array(MemoryStrategySchema).describe(
    "List of memory strategies attached to this memory",
  ).optional(),
  IndexedKeys: z.array(IndexedKeySchema).describe(
    "List of indexed keys for the memory",
  ).optional(),
  StreamDeliveryResources: z.object({
    Resources: z.array(StreamDeliveryResourceSchema).optional(),
  }).optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
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

/** Swamp extension model for BedrockAgentCore Memory. Registered at `@swamp/aws/bedrockagentcore/memory`. */
export const model = {
  type: "@swamp/aws/bedrockagentcore/memory",
  version: "2026.06.15.1",
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
      description: "Added: IndexedKeys",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "BedrockAgentCore Memory resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a BedrockAgentCore Memory",
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
          "AWS::BedrockAgentCore::Memory",
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
      description: "Get a BedrockAgentCore Memory",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Memory",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::BedrockAgentCore::Memory",
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
      description: "Update a BedrockAgentCore Memory",
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
        const identifier = existing.MemoryArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::BedrockAgentCore::Memory",
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
          "AWS::BedrockAgentCore::Memory",
          identifier,
          currentState,
          desiredState,
          ["Name", "EncryptionKeyArn"],
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
      description: "Delete a BedrockAgentCore Memory",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the BedrockAgentCore Memory",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::BedrockAgentCore::Memory",
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
      description: "Sync BedrockAgentCore Memory state from AWS",
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
        const identifier = existing.MemoryArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::BedrockAgentCore::Memory",
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
