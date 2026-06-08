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

// Auto-generated extension model for @swamp/aws/wisdom/knowledge-base
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Wisdom KnowledgeBase (AWS::Wisdom::KnowledgeBase).
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

const AppIntegrationsConfigurationSchema = z.object({
  ObjectFields: z.array(z.string().min(1).max(4096)).optional(),
  AppIntegrationArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:[a-z-]+?:[a-z-]+?:[a-z0-9-]*?:([0-9]{12})?:[a-zA-Z0-9-:/]+$",
    ),
  ),
});

const SeedUrlSchema = z.object({
  Url: z.string().regex(new RegExp("^https?://[A-Za-z0-9][^\\s]*$")).optional(),
});

const WebCrawlerConfigurationSchema = z.object({
  UrlConfiguration: z.object({
    SeedUrls: z.array(SeedUrlSchema).optional(),
  }),
  CrawlerLimits: z.object({
    RateLimit: z.number().min(1).max(3000).optional(),
  }).optional(),
  InclusionFilters: z.array(z.string().min(1).max(1000)).optional(),
  ExclusionFilters: z.array(z.string().min(1).max(1000)).optional(),
  Scope: z.enum(["HOST_ONLY", "SUBDOMAINS"]).optional(),
});

const FixedSizeChunkingConfigurationSchema = z.object({
  MaxTokens: z.number().min(1),
  OverlapPercentage: z.number().min(1).max(99),
});

const HierarchicalChunkingLevelConfigurationSchema = z.object({
  MaxTokens: z.number().min(1).max(8192),
});

const HierarchicalChunkingConfigurationSchema = z.object({
  LevelConfigurations: z.array(HierarchicalChunkingLevelConfigurationSchema),
  OverlapTokens: z.number().min(1),
});

const SemanticChunkingConfigurationSchema = z.object({
  MaxTokens: z.number().min(1),
  BufferSize: z.number().min(0).max(1),
  BreakpointPercentileThreshold: z.number().min(50).max(99),
});

const BedrockFoundationModelConfigurationSchema = z.object({
  ModelArn: z.string().min(1).max(2048).regex(
    new RegExp(
      "^arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}::foundation-model\\/anthropic.claude-3-haiku-20240307-v1:0$",
    ),
  ),
  ParsingPrompt: z.object({
    ParsingPromptText: z.string().min(1).max(10000),
  }).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(1).max(256),
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
  Description: z.string().min(1).max(255).optional(),
  KnowledgeBaseType: z.enum([
    "EXTERNAL",
    "CUSTOM",
    "MESSAGE_TEMPLATES",
    "MANAGED",
    "QUICK_RESPONSES",
  ]),
  Name: z.string().min(1).max(255),
  RenderingConfiguration: z.object({
    TemplateUri: z.string().min(1).max(4096).optional(),
  }).optional(),
  ServerSideEncryptionConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(4096).optional(),
  }).optional(),
  SourceConfiguration: z.object({
    AppIntegrations: AppIntegrationsConfigurationSchema.optional(),
    ManagedSourceConfiguration: z.object({
      WebCrawlerConfiguration: WebCrawlerConfigurationSchema.optional(),
    }).optional(),
  }).optional(),
  VectorIngestionConfiguration: z.object({
    ChunkingConfiguration: z.object({
      ChunkingStrategy: z.enum([
        "FIXED_SIZE",
        "NONE",
        "HIERARCHICAL",
        "SEMANTIC",
      ]),
      FixedSizeChunkingConfiguration: FixedSizeChunkingConfigurationSchema
        .optional(),
      HierarchicalChunkingConfiguration: HierarchicalChunkingConfigurationSchema
        .optional(),
      SemanticChunkingConfiguration: SemanticChunkingConfigurationSchema
        .optional(),
    }).optional(),
    ParsingConfiguration: z.object({
      ParsingStrategy: z.enum(["BEDROCK_FOUNDATION_MODEL"]),
      BedrockFoundationModelConfiguration:
        BedrockFoundationModelConfigurationSchema.optional(),
    }).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  KnowledgeBaseArn: z.string().optional(),
  KnowledgeBaseId: z.string(),
  KnowledgeBaseType: z.string().optional(),
  Name: z.string().optional(),
  RenderingConfiguration: z.object({
    TemplateUri: z.string(),
  }).optional(),
  ServerSideEncryptionConfiguration: z.object({
    KmsKeyId: z.string(),
  }).optional(),
  SourceConfiguration: z.object({
    AppIntegrations: AppIntegrationsConfigurationSchema,
    ManagedSourceConfiguration: z.object({
      WebCrawlerConfiguration: WebCrawlerConfigurationSchema,
    }),
  }).optional(),
  VectorIngestionConfiguration: z.object({
    ChunkingConfiguration: z.object({
      ChunkingStrategy: z.string(),
      FixedSizeChunkingConfiguration: FixedSizeChunkingConfigurationSchema,
      HierarchicalChunkingConfiguration:
        HierarchicalChunkingConfigurationSchema,
      SemanticChunkingConfiguration: SemanticChunkingConfigurationSchema,
    }),
    ParsingConfiguration: z.object({
      ParsingStrategy: z.string(),
      BedrockFoundationModelConfiguration:
        BedrockFoundationModelConfigurationSchema,
    }),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(1).max(255).optional(),
  KnowledgeBaseType: z.enum([
    "EXTERNAL",
    "CUSTOM",
    "MESSAGE_TEMPLATES",
    "MANAGED",
    "QUICK_RESPONSES",
  ]).optional(),
  Name: z.string().min(1).max(255).optional(),
  RenderingConfiguration: z.object({
    TemplateUri: z.string().min(1).max(4096).optional(),
  }).optional(),
  ServerSideEncryptionConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(4096).optional(),
  }).optional(),
  SourceConfiguration: z.object({
    AppIntegrations: AppIntegrationsConfigurationSchema.optional(),
    ManagedSourceConfiguration: z.object({
      WebCrawlerConfiguration: WebCrawlerConfigurationSchema.optional(),
    }).optional(),
  }).optional(),
  VectorIngestionConfiguration: z.object({
    ChunkingConfiguration: z.object({
      ChunkingStrategy: z.enum([
        "FIXED_SIZE",
        "NONE",
        "HIERARCHICAL",
        "SEMANTIC",
      ]).optional(),
      FixedSizeChunkingConfiguration: FixedSizeChunkingConfigurationSchema
        .optional(),
      HierarchicalChunkingConfiguration: HierarchicalChunkingConfigurationSchema
        .optional(),
      SemanticChunkingConfiguration: SemanticChunkingConfigurationSchema
        .optional(),
    }).optional(),
    ParsingConfiguration: z.object({
      ParsingStrategy: z.enum(["BEDROCK_FOUNDATION_MODEL"]).optional(),
      BedrockFoundationModelConfiguration:
        BedrockFoundationModelConfigurationSchema.optional(),
    }).optional(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for Wisdom KnowledgeBase. Registered at `@swamp/aws/wisdom/knowledge-base`. */
export const model = {
  type: "@swamp/aws/wisdom/knowledge-base",
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
      description: "Wisdom KnowledgeBase resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Wisdom KnowledgeBase",
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
          "AWS::Wisdom::KnowledgeBase",
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
      description: "Get a Wisdom KnowledgeBase",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom KnowledgeBase",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Wisdom::KnowledgeBase",
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
      description: "Update a Wisdom KnowledgeBase",
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
        const identifier = existing.KnowledgeBaseId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Wisdom::KnowledgeBase",
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
          "AWS::Wisdom::KnowledgeBase",
          identifier,
          currentState,
          desiredState,
          [
            "Description",
            "KnowledgeBaseType",
            "Name",
            "ServerSideEncryptionConfiguration",
            "SourceConfiguration",
            "Tags",
          ],
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
      description: "Delete a Wisdom KnowledgeBase",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom KnowledgeBase",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Wisdom::KnowledgeBase",
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
      description: "Sync Wisdom KnowledgeBase state from AWS",
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
        const identifier = existing.KnowledgeBaseId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Wisdom::KnowledgeBase",
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
