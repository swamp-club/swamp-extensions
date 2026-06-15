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

// Auto-generated extension model for @swamp/aws/bedrock/prompt
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Bedrock Prompt (AWS::Bedrock::Prompt).
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

const TextS3LocationSchema = z.object({
  Bucket: z.string().min(3).max(63).regex(
    new RegExp("^[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]$"),
  ).describe("A bucket in S3"),
  Key: z.string().min(1).max(1024).describe("A object key in S3"),
  Version: z.string().min(1).max(1024).describe(
    "The version of the the S3 object to use",
  ).optional(),
});

const PromptInputVariableSchema = z.object({
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$")).describe(
    "Name for an input variable",
  ).optional(),
});

const CachePointBlockSchema = z.object({
  Type: z.enum(["default"]).describe("CachePoint types for CachePointBlock"),
});

const TextPromptTemplateConfigurationSchema = z.object({
  Text: z.string().min(1).max(200000).describe(
    "Prompt content for String prompt template",
  ).optional(),
  TextS3Location: TextS3LocationSchema.describe(
    "The identifier for the S3 resource.",
  ).optional(),
  InputVariables: z.array(PromptInputVariableSchema).describe(
    "List of input variables",
  ).optional(),
  CachePoint: CachePointBlockSchema.describe("CachePointBlock").optional(),
});

const MessageSchema = z.object({
  Role: z.enum(["user", "assistant"]).describe(
    "Conversation roles for the chat prompt",
  ),
  Content: z.array(z.object({
    Text: z.string().min(1).describe("Configuration for chat prompt template")
      .optional(),
    CachePoint: CachePointBlockSchema.describe("CachePointBlock").optional(),
  })).describe("List of Content Blocks"),
});

const ToolSpecificationSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$"))
    .describe("Tool name"),
  Description: z.string().min(1).optional(),
  InputSchema: z.object({
    Json: z.record(z.string(), z.unknown()).optional(),
  }).describe("Tool input schema"),
});

const SpecificToolChoiceSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z][a-zA-Z0-9_]*$"))
    .describe("Tool name"),
});

const ToolConfigurationSchema = z.object({
  Tools: z.array(z.object({
    ToolSpec: ToolSpecificationSchema.describe("Tool specification").optional(),
    CachePoint: CachePointBlockSchema.describe("CachePointBlock").optional(),
  })).describe("List of Tools"),
  ToolChoice: z.object({
    Auto: z.record(z.string(), z.unknown()).describe("Auto Tool choice")
      .optional(),
    Any: z.record(z.string(), z.unknown()).describe("Any Tool choice")
      .optional(),
    Tool: SpecificToolChoiceSchema.describe("Specific Tool choice").optional(),
  }).describe("Tool choice").optional(),
});

const ChatPromptTemplateConfigurationSchema = z.object({
  Messages: z.array(MessageSchema).describe(
    "List of messages for chat prompt template",
  ),
  System: z.array(z.object({
    Text: z.string().min(1).describe("Configuration for chat prompt template")
      .optional(),
    CachePoint: CachePointBlockSchema.describe("CachePointBlock").optional(),
  })).describe("Configuration for chat prompt template").optional(),
  ToolConfiguration: ToolConfigurationSchema.describe("Tool configuration")
    .optional(),
  InputVariables: z.array(PromptInputVariableSchema).describe(
    "List of input variables",
  ).optional(),
});

const PromptModelInferenceConfigurationSchema = z.object({
  Temperature: z.number().min(0).max(1).describe(
    "Controls randomness, higher values increase diversity",
  ).optional(),
  TopP: z.number().min(0).max(1).describe(
    "Cumulative probability cutoff for token selection",
  ).optional(),
  MaxTokens: z.number().min(0).max(512000).describe("Maximum length of output")
    .optional(),
  StopSequences: z.array(z.string()).describe("List of stop sequences")
    .optional(),
});

const PromptAgentResourceSchema = z.object({
  AgentIdentifier: z.string().max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:agent-alias/[0-9a-zA-Z]{10}/[0-9a-zA-Z]{10}$",
    ),
  ).describe("Arn representation of the Agent Alias."),
});

const PromptMetadataEntrySchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("The key of a metadata tag for a prompt variant."),
  Value: z.string().min(1).max(1024).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
  ).describe("The value of a metadata tag for a prompt variant."),
});

const PromptVariantSchema = z.object({
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$")).describe(
    "Name for a variant.",
  ),
  TemplateType: z.enum(["TEXT", "CHAT"]).describe("Prompt template type"),
  TemplateConfiguration: z.object({
    Text: TextPromptTemplateConfigurationSchema.describe(
      "Configuration for text prompt template",
    ).optional(),
    Chat: ChatPromptTemplateConfigurationSchema.describe(
      "Configuration for chat prompt template",
    ).optional(),
  }).describe("Prompt template configuration"),
  ModelId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(arn:aws(-[^:]{1,12})?:(bedrock|sagemaker):[a-z0-9-]{1,20}:([0-9]{12})?:([a-z-]+/)?)?([a-zA-Z0-9.-]{1,63}){0,2}(([:][a-z0-9-]{1,63}){0,2})?(/[a-z0-9]{1,12})?$",
    ),
  ).describe(
    "ARN or Id of a Bedrock Foundational Model or Inference Profile, or the ARN of a imported model, or a provisioned throughput ARN for custom models.",
  ).optional(),
  InferenceConfiguration: z.object({
    Text: PromptModelInferenceConfigurationSchema.describe(
      "Prompt model inference configuration",
    ).optional(),
  }).describe("Model inference configuration").optional(),
  GenAiResource: z.object({
    Agent: PromptAgentResourceSchema.describe(
      "Target Agent to invoke with Prompt",
    ).optional(),
  }).describe("Target resource to invoke with Prompt").optional(),
  AdditionalModelRequestFields: z.record(z.string(), z.unknown()).describe(
    "Contains model-specific configurations",
  ).optional(),
  Metadata: z.array(PromptMetadataEntrySchema).describe(
    "List of metadata to associate with the prompt variant.",
  ).optional(),
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
  DefaultVariant: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$"))
    .describe("Name for a variant.").optional(),
  Description: z.string().min(1).max(200).describe(
    "Name for a prompt resource.",
  ).optional(),
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$")).describe(
    "Name for a prompt resource.",
  ),
  Variants: z.array(PromptVariantSchema).describe("List of prompt variants")
    .optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
  CustomerEncryptionKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(|-cn|-us-gov):kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
    ),
  ).describe("A KMS key ARN").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  CreatedAt: z.string().optional(),
  DefaultVariant: z.string().optional(),
  Description: z.string().optional(),
  Id: z.string().optional(),
  Name: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Variants: z.array(PromptVariantSchema).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  CustomerEncryptionKeyArn: z.string().optional(),
  Version: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DefaultVariant: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$"))
    .describe("Name for a variant.").optional(),
  Description: z.string().min(1).max(200).describe(
    "Name for a prompt resource.",
  ).optional(),
  Name: z.string().regex(new RegExp("^([0-9a-zA-Z][_-]?){1,100}$")).describe(
    "Name for a prompt resource.",
  ).optional(),
  Variants: z.array(PromptVariantSchema).describe("List of prompt variants")
    .optional(),
  Tags: z.record(
    z.string(),
    z.string().min(0).max(256).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$")),
  ).describe("A map of tag keys and values").optional(),
  CustomerEncryptionKeyArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(|-cn|-us-gov):kms:[a-zA-Z0-9-]*:[0-9]{12}:key/[a-zA-Z0-9-]{36}$",
    ),
  ).describe("A KMS key ARN").optional(),
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

/** Swamp extension model for Bedrock Prompt. Registered at `@swamp/aws/bedrock/prompt`. */
export const model = {
  type: "@swamp/aws/bedrock/prompt",
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
      description: "Bedrock Prompt resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock Prompt",
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
          "AWS::Bedrock::Prompt",
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
      description: "Get a Bedrock Prompt",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock Prompt",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Bedrock::Prompt",
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
      description: "Update a Bedrock Prompt",
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
          "AWS::Bedrock::Prompt",
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
          "AWS::Bedrock::Prompt",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a Bedrock Prompt",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock Prompt",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Bedrock::Prompt",
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
      description: "Sync Bedrock Prompt state from AWS",
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
            "AWS::Bedrock::Prompt",
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
