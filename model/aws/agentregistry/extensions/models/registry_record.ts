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

// Auto-generated extension model for @swamp/aws/agentregistry/registry-record
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AgentRegistry RegistryRecord (AWS::AgentRegistry::RegistryRecord).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const McpToolsDescriptorSchema = z.object({
  Data: z.string().min(1).max(102400).describe("Descriptor payload data.")
    .optional(),
  DataSchemaVersion: z.string().min(1).max(255).describe(
    "Version of the tools descriptor schema.",
  ).optional(),
});

const McpServerAdditionalDataSchema = z.object({
  Tools: McpToolsDescriptorSchema.describe("The MCP tools descriptor.")
    .optional(),
});

const RegistryRecordOAuthCredentialProviderSchema = z.object({
  ProviderArn: z.string().min(1).max(2048).regex(
    new RegExp("^arn:aws(-[^:]+)?:bedrock-agentcore:[a-z0-9-]+:[0-9]{12}:.*$"),
  ).describe("The ARN of the OAuth credential provider."),
  GrantType: z.enum(["CLIENT_CREDENTIALS"]).optional(),
  Scopes: z.array(z.string()).describe("OAuth scopes to request.").optional(),
  CustomParameters: z.record(z.string(), z.string()).describe(
    "Additional custom parameters for the OAuth flow.",
  ).optional(),
});

const RegistryRecordIamCredentialProviderSchema = z.object({
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws(-[^:]+)?:iam::[0-9]{12}:role/.+$"),
  ).describe("The ARN of the IAM role.").optional(),
  Service: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The SigV4 signing service name.").optional(),
  Region: z.string().min(1).max(64).regex(new RegExp("^[a-z0-9-]+$")).describe(
    "The SigV4 signing region.",
  ).optional(),
});

const RegistryRecordCredentialProviderUnionSchema = z.object({
  OauthCredentialProvider: RegistryRecordOAuthCredentialProviderSchema.describe(
    "OAuth credential provider configuration.",
  ).optional(),
  IamCredentialProvider: RegistryRecordIamCredentialProviderSchema.describe(
    "IAM credential provider configuration.",
  ).optional(),
});

const RegistryRecordCredentialProviderConfigurationSchema = z.object({
  CredentialProviderType: z.enum(["OAUTH", "IAM"]),
  CredentialProvider: RegistryRecordCredentialProviderUnionSchema.describe(
    "The credential provider details. Specify exactly one member.",
  ),
});

const DescriptorSourceFromUrlSchema = z.object({
  Url: z.string().min(1).max(2048).regex(new RegExp("^https://.*$")).describe(
    "URL source for descriptor content.",
  ),
  CredentialProviderConfigurations: z.array(
    RegistryRecordCredentialProviderConfigurationSchema,
  ).describe(
    "The credential providers used to authenticate when fetching descriptor content from the source URL.",
  ).optional(),
});

const DescriptorSourceSchema = z.object({
  FromUrl: DescriptorSourceFromUrlSchema.describe(
    "URL-based descriptor source configuration, with credential provider configurations for authenticated URL retrieval.",
  ).optional(),
});

const McpServerDescriptorSchema = z.object({
  Data: z.string().min(1).max(102400).describe("Descriptor payload data.")
    .optional(),
  DataSchemaVersion: z.string().min(1).max(255).describe(
    "Version of the descriptor type schema.",
  ).optional(),
  AdditionalData: McpServerAdditionalDataSchema.describe(
    "Additional data associated with an MCP server descriptor.",
  ).optional(),
  Source: DescriptorSourceSchema.describe(
    "The source configuration that defines where descriptor content is retrieved from.",
  ).optional(),
});

const A2aAgentCardDescriptorSchema = z.object({
  Data: z.string().min(1).max(102400).describe("Descriptor payload data.")
    .optional(),
  DataSchemaVersion: z.string().min(1).max(255).describe(
    "Version of the descriptor type schema.",
  ).optional(),
  Source: DescriptorSourceSchema.describe(
    "The source configuration that defines where descriptor content is retrieved from.",
  ).optional(),
});

const SkillMdSourceFromUrlSchema = z.object({
  Url: z.string().min(1).max(2048).regex(new RegExp("^https://.*$")).describe(
    "URL source for the SkillMd document.",
  ),
});

const SkillMdSourceSchema = z.object({
  FromUrl: SkillMdSourceFromUrlSchema.describe(
    "URL-based source for SkillMd content (sync is skipped; content is provided inline via Data).",
  ).optional(),
});

const AgentSkillsMdDescriptorSchema = z.object({
  Source: SkillMdSourceSchema.describe(
    "Source configuration for a SkillMd document. Unlike MCP/A2A sources, SkillMd does not support credential providers.",
  ).optional(),
  Data: z.string().min(1).max(102400).describe("Descriptor payload data.")
    .optional(),
  DataSchemaVersion: z.string().min(1).max(255).describe(
    "Version of the descriptor type schema.",
  ).optional(),
});

const AgentSkillsAdditionalDataSchema = z.object({
  SkillMd: AgentSkillsMdDescriptorSchema.describe(
    "Markdown-format descriptor containing an agent skills document.",
  ).optional(),
});

const AgentSkillsDefinitionDescriptorSchema = z.object({
  Data: z.string().min(1).max(102400).describe("Descriptor payload data.")
    .optional(),
  DataSchemaVersion: z.string().min(1).max(255).describe(
    "Version of the descriptor type schema.",
  ).optional(),
  AdditionalData: AgentSkillsAdditionalDataSchema.describe(
    "Additional data associated with an agent skills definition descriptor.",
  ).optional(),
});

const CustomDescriptorSchema = z.object({
  Data: z.string().min(1).max(102400).describe("Descriptor payload data.")
    .optional(),
});

const SourceOnlyDescriptorSourceFromUrlSchema = z.object({
  Url: z.string().min(1).max(2048).regex(new RegExp("^https://.*$")).describe(
    "URL source for descriptor content.",
  ),
});

const SourceOnlyDescriptorSourceSchema = z.object({
  FromUrl: SourceOnlyDescriptorSourceFromUrlSchema.describe(
    "URL-based source configuration for a source-only descriptor.",
  ).optional(),
});

const HttpDescriptorSchema = z.object({
  Source: SourceOnlyDescriptorSourceSchema.describe(
    "Source configuration for a source-only descriptor. Unlike mcpServer/a2aAgentCard sources, source-only descriptors do not support credential providers.",
  ).optional(),
});

const AgUiDescriptorSchema = z.object({
  Source: SourceOnlyDescriptorSourceSchema.describe(
    "Source configuration for a source-only descriptor. Unlike mcpServer/a2aAgentCard sources, source-only descriptors do not support credential providers.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"))
    .describe("The key of the tag."),
  Value: z.string().min(0).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s._:/=+@-]*$"),
  ).describe("The value of the tag."),
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
  RegistryId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(arn:aws(-[^:]+)?:agent-registry:[a-z0-9-]+:[0-9]{12}:registry/)?[a-zA-Z0-9]{12,16}$",
    ),
  ).describe(
    "The identifier of the registry in which to create the record. You can specify either the registry ID or the registry Amazon Resource Name (ARN). Use the ARN form to reference a registry shared from another account via AWS Resource Access Manager (RAM).",
  ).optional(),
  Name: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_\\-\\.\\/]*$"),
  ).describe("The name of the registry record."),
  DisplayName: z.string().min(1).max(255).describe(
    "The human-readable display name of the registry record.",
  ).optional(),
  Description: z.string().min(1).max(4096).describe(
    "The description of the registry record.",
  ).optional(),
  RecordType: z.enum(["MCP", "AGENT", "SKILL", "CUSTOM", "GATEWAY"]).describe(
    "The type of the registry record.",
  ),
  Descriptors: z.object({
    McpServer: McpServerDescriptorSchema.describe(
      "The MCP server descriptor, populated when the record type is MCP.",
    ).optional(),
    A2aAgentCard: A2aAgentCardDescriptorSchema.describe(
      "The A2A agent card descriptor, populated when the record type is AGENT.",
    ).optional(),
    AgentSkillsDefinition: AgentSkillsDefinitionDescriptorSchema.describe(
      "The agent skills definition descriptor, populated when the record type is SKILL.",
    ).optional(),
    Custom: CustomDescriptorSchema.describe(
      "The custom descriptor, populated when the record type is CUSTOM.",
    ).optional(),
    Http: HttpDescriptorSchema.describe(
      "The HTTP descriptor, populated for records detected from an HTTP protocol source. This descriptor is source-only: its content is synchronized from the configured source URL rather than supplied inline.",
    ).optional(),
    Agui: AgUiDescriptorSchema.describe(
      "The AG-UI (Agent-User Interaction) descriptor, populated for records detected from an AG-UI protocol source. This descriptor is source-only: its content is synchronized from the configured source URL rather than supplied inline.",
    ).optional(),
  }).describe(
    "The typed set of descriptors for a registry record. Exactly one descriptor field is populated based on the record type.",
  ),
  RecordVersion: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9.-]+$"),
  ).describe("The version of the registry record.").optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the registry record.")
    .optional(),
});

const StateSchema = z.object({
  RegistryId: z.string().optional(),
  RecordId: z.string().optional(),
  RecordArn: z.string(),
  RegistryArn: z.string().optional(),
  Name: z.string().optional(),
  DisplayName: z.string().optional(),
  Description: z.string().optional(),
  RecordType: z.string().optional(),
  Descriptors: z.object({
    McpServer: McpServerDescriptorSchema,
    A2aAgentCard: A2aAgentCardDescriptorSchema,
    AgentSkillsDefinition: AgentSkillsDefinitionDescriptorSchema,
    Custom: CustomDescriptorSchema,
    Http: HttpDescriptorSchema,
    Agui: AgUiDescriptorSchema,
  }).optional(),
  RecordVersion: z.string().optional(),
  Status: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  CreatedBy: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  RegistryId: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(arn:aws(-[^:]+)?:agent-registry:[a-z0-9-]+:[0-9]{12}:registry/)?[a-zA-Z0-9]{12,16}$",
    ),
  ).describe(
    "The identifier of the registry in which to create the record. You can specify either the registry ID or the registry Amazon Resource Name (ARN). Use the ARN form to reference a registry shared from another account via AWS Resource Access Manager (RAM).",
  ).optional(),
  Name: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_\\-\\.\\/]*$"),
  ).describe("The name of the registry record.").optional(),
  DisplayName: z.string().min(1).max(255).describe(
    "The human-readable display name of the registry record.",
  ).optional(),
  Description: z.string().min(1).max(4096).describe(
    "The description of the registry record.",
  ).optional(),
  RecordType: z.enum(["MCP", "AGENT", "SKILL", "CUSTOM", "GATEWAY"]).describe(
    "The type of the registry record.",
  ).optional(),
  Descriptors: z.object({
    McpServer: McpServerDescriptorSchema.describe(
      "The MCP server descriptor, populated when the record type is MCP.",
    ).optional(),
    A2aAgentCard: A2aAgentCardDescriptorSchema.describe(
      "The A2A agent card descriptor, populated when the record type is AGENT.",
    ).optional(),
    AgentSkillsDefinition: AgentSkillsDefinitionDescriptorSchema.describe(
      "The agent skills definition descriptor, populated when the record type is SKILL.",
    ).optional(),
    Custom: CustomDescriptorSchema.describe(
      "The custom descriptor, populated when the record type is CUSTOM.",
    ).optional(),
    Http: HttpDescriptorSchema.describe(
      "The HTTP descriptor, populated for records detected from an HTTP protocol source. This descriptor is source-only: its content is synchronized from the configured source URL rather than supplied inline.",
    ).optional(),
    Agui: AgUiDescriptorSchema.describe(
      "The AG-UI (Agent-User Interaction) descriptor, populated for records detected from an AG-UI protocol source. This descriptor is source-only: its content is synchronized from the configured source URL rather than supplied inline.",
    ).optional(),
  }).describe(
    "The typed set of descriptors for a registry record. Exactly one descriptor field is populated based on the record type.",
  ).optional(),
  RecordVersion: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9.-]+$"),
  ).describe("The version of the registry record.").optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the registry record.")
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

/** Swamp extension model for AgentRegistry RegistryRecord. Registered at `@swamp/aws/agentregistry/registry-record`. */
export const model = {
  type: "@swamp/aws/agentregistry/registry-record",
  version: "2026.09.05.1",
  upgrades: [
    {
      toVersion: "2026.08.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "AgentRegistry RegistryRecord resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AgentRegistry RegistryRecord",
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
          "AWS::AgentRegistry::RegistryRecord",
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
      description: "Get a AgentRegistry RegistryRecord",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AgentRegistry RegistryRecord",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AgentRegistry::RegistryRecord",
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
      description: "Update a AgentRegistry RegistryRecord",
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
        const identifier = existing.RecordArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AgentRegistry::RegistryRecord",
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
          "AWS::AgentRegistry::RegistryRecord",
          identifier,
          currentState,
          desiredState,
          ["RegistryId", "RecordType"],
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
      description: "Delete a AgentRegistry RegistryRecord",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AgentRegistry RegistryRecord",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AgentRegistry::RegistryRecord",
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
      description: "Sync AgentRegistry RegistryRecord state from AWS",
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
        const identifier = existing.RecordArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AgentRegistry::RegistryRecord",
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
      description: "List AgentRegistry RegistryRecord resources",
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
          "AWS::AgentRegistry::RegistryRecord",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.RecordArn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
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
