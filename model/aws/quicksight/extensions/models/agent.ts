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

// Auto-generated extension model for @swamp/aws/quicksight/agent
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for QuickSight Agent (AWS::QuickSight::Agent).
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

const CustomPromptProfileSchema = z.object({
  ModelProfileId: z.string().max(36).describe(
    "The identifier of the model profile.",
  ),
  SubscriptionId: z.string().max(32).describe("The subscription identifier."),
  QbsAwsAccountId: z.string().max(15).regex(new RegExp("^QBS[0-9]{12}$"))
    .describe("The QBS AWS account identifier."),
});

const CustomPromptInputParametersSchema = z.object({
  ResponseLength: z.string().min(5).max(350000).describe(
    "The desired response length for the agent.",
  ).optional(),
  OutputStyle: z.string().min(5).max(350000).describe(
    "The output style for the agent responses.",
  ).optional(),
  Identity: z.string().min(5).max(350000).describe(
    "The identity or persona of the agent.",
  ).optional(),
  Tone: z.string().min(5).max(350000).describe(
    "The tone used in agent responses.",
  ).optional(),
  CustomInstructions: z.string().min(5).max(350000).describe(
    "Custom instructions for the agent behavior.",
  ).optional(),
});

const AgentTagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .describe(
      "The ID of the Amazon Web Services account where the agent is being created.",
    ),
  AgentId: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z-_.+]+$"))
    .describe("The unique identifier for the agent."),
  Name: z.string().min(1).max(50).describe("The display name of the agent."),
  Description: z.string().min(0).max(1000).describe(
    "A description of the agent.",
  ).optional(),
  IconId: z.string().min(1).max(200).describe(
    "The icon identifier for the agent.",
  ).optional(),
  StarterPrompts: z.array(z.string()).describe(
    "A list of up to 3 starter prompts displayed to users.",
  ).optional(),
  WelcomeMessage: z.string().max(300).describe(
    "The welcome message displayed when a user opens the agent.",
  ).optional(),
  AgentLifecycle: z.enum(["PREVIEW", "PUBLISHED"]).describe(
    "The lifecycle stage of the agent. PREVIEW or PUBLISHED.",
  ).optional(),
  CustomPromptInput: z.object({
    ExistingPrompt: CustomPromptProfileSchema.describe(
      "Reference to an existing custom prompt profile.",
    ).optional(),
    NewPrompt: CustomPromptInputParametersSchema.describe(
      "Parameters for creating a new custom prompt configuration.",
    ).optional(),
  }).describe(
    "Custom prompt configuration. Specify either ExistingPrompt or NewPrompt.",
  ).optional(),
  Spaces: z.array(z.string()).describe(
    "A list of Space ARNs (max 10) attached to the agent.",
  ).optional(),
  ActionConnectors: z.array(z.string()).describe(
    "A list of ActionConnector ARNs (max 10) attached to the agent.",
  ).optional(),
  Tags: z.array(AgentTagSchema).describe(
    "A list of key-value pairs to associate with the agent resource.",
  ).optional(),
  CustomPromptInterface: z.object({
    ModelProfileId: z.string().min(36).max(36).regex(
      new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{35}$"),
    ).describe("The identifier of the model profile.").optional(),
    SubscriptionId: z.string().min(32).max(32).regex(new RegExp("^[a-z0-9]+$"))
      .describe("The subscription identifier.").optional(),
    QbsAwsAccountId: z.string().min(15).max(15).regex(
      new RegExp("^QBS[0-9]{12}$"),
    ).describe("The QBS AWS account identifier.").optional(),
    ResponseLength: z.string().min(5).max(350000).describe(
      "The desired response length for the agent.",
    ).optional(),
    OutputStyle: z.string().min(5).max(350000).describe(
      "The output style for the agent responses.",
    ).optional(),
    Identity: z.string().min(5).max(350000).describe(
      "The identity or persona of the agent.",
    ).optional(),
    Tone: z.string().min(5).max(350000).describe(
      "The tone used in agent responses.",
    ).optional(),
    CustomInstructions: z.string().min(5).max(350000).describe(
      "Custom instructions for the agent behavior.",
    ).optional(),
    PromptSummary: z.string().describe("A summary of the resolved prompt.")
      .optional(),
  }).describe(
    "Read-only view of the resolved custom prompt interface for the agent.",
  ).optional(),
});

const StateSchema = z.object({
  AwsAccountId: z.string(),
  AgentId: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  IconId: z.string().optional(),
  StarterPrompts: z.array(z.string()).optional(),
  WelcomeMessage: z.string().optional(),
  AgentLifecycle: z.string().optional(),
  CustomPromptInput: z.object({
    ExistingPrompt: CustomPromptProfileSchema,
    NewPrompt: CustomPromptInputParametersSchema,
  }).optional(),
  Spaces: z.array(z.string()).optional(),
  ActionConnectors: z.array(z.string()).optional(),
  Tags: z.array(AgentTagSchema).optional(),
  Arn: z.string().optional(),
  AgentStatus: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  Creator: z.string().optional(),
  CustomPromptInterface: z.object({
    ModelProfileId: z.string(),
    SubscriptionId: z.string(),
    QbsAwsAccountId: z.string(),
    ResponseLength: z.string(),
    OutputStyle: z.string(),
    Identity: z.string(),
    Tone: z.string(),
    CustomInstructions: z.string(),
    PromptSummary: z.string(),
  }).optional(),
  ErrorMessage: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .describe(
      "The ID of the Amazon Web Services account where the agent is being created.",
    ).optional(),
  AgentId: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z-_.+]+$"))
    .describe("The unique identifier for the agent.").optional(),
  Name: z.string().min(1).max(50).describe("The display name of the agent.")
    .optional(),
  Description: z.string().min(0).max(1000).describe(
    "A description of the agent.",
  ).optional(),
  IconId: z.string().min(1).max(200).describe(
    "The icon identifier for the agent.",
  ).optional(),
  StarterPrompts: z.array(z.string()).describe(
    "A list of up to 3 starter prompts displayed to users.",
  ).optional(),
  WelcomeMessage: z.string().max(300).describe(
    "The welcome message displayed when a user opens the agent.",
  ).optional(),
  AgentLifecycle: z.enum(["PREVIEW", "PUBLISHED"]).describe(
    "The lifecycle stage of the agent. PREVIEW or PUBLISHED.",
  ).optional(),
  CustomPromptInput: z.object({
    ExistingPrompt: CustomPromptProfileSchema.describe(
      "Reference to an existing custom prompt profile.",
    ).optional(),
    NewPrompt: CustomPromptInputParametersSchema.describe(
      "Parameters for creating a new custom prompt configuration.",
    ).optional(),
  }).describe(
    "Custom prompt configuration. Specify either ExistingPrompt or NewPrompt.",
  ).optional(),
  Spaces: z.array(z.string()).describe(
    "A list of Space ARNs (max 10) attached to the agent.",
  ).optional(),
  ActionConnectors: z.array(z.string()).describe(
    "A list of ActionConnector ARNs (max 10) attached to the agent.",
  ).optional(),
  Tags: z.array(AgentTagSchema).describe(
    "A list of key-value pairs to associate with the agent resource.",
  ).optional(),
  CustomPromptInterface: z.object({
    ModelProfileId: z.string().min(36).max(36).regex(
      new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{35}$"),
    ).describe("The identifier of the model profile.").optional(),
    SubscriptionId: z.string().min(32).max(32).regex(new RegExp("^[a-z0-9]+$"))
      .describe("The subscription identifier.").optional(),
    QbsAwsAccountId: z.string().min(15).max(15).regex(
      new RegExp("^QBS[0-9]{12}$"),
    ).describe("The QBS AWS account identifier.").optional(),
    ResponseLength: z.string().min(5).max(350000).describe(
      "The desired response length for the agent.",
    ).optional(),
    OutputStyle: z.string().min(5).max(350000).describe(
      "The output style for the agent responses.",
    ).optional(),
    Identity: z.string().min(5).max(350000).describe(
      "The identity or persona of the agent.",
    ).optional(),
    Tone: z.string().min(5).max(350000).describe(
      "The tone used in agent responses.",
    ).optional(),
    CustomInstructions: z.string().min(5).max(350000).describe(
      "Custom instructions for the agent behavior.",
    ).optional(),
    PromptSummary: z.string().describe("A summary of the resolved prompt.")
      .optional(),
  }).describe(
    "Read-only view of the resolved custom prompt interface for the agent.",
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

/** Swamp extension model for QuickSight Agent. Registered at `@swamp/aws/quicksight/agent`. */
export const model = {
  type: "@swamp/aws/quicksight/agent",
  version: "2026.10.23.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "QuickSight Agent resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QuickSight Agent",
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
          "AWS::QuickSight::Agent",
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
      description: "Get a QuickSight Agent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight Agent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::QuickSight::Agent",
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
      description: "Update a QuickSight Agent",
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
          existing.AwsAccountId?.toString(),
          existing.AgentId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QuickSight::Agent",
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
          "AWS::QuickSight::Agent",
          identifier,
          currentState,
          desiredState,
          ["AwsAccountId", "AgentId", "AgentLifecycle"],
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
      description: "Delete a QuickSight Agent",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight Agent",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::QuickSight::Agent",
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
      description: "Sync QuickSight Agent state from AWS",
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
          existing.AwsAccountId?.toString(),
          existing.AgentId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QuickSight::Agent",
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
      description: "List QuickSight Agent resources",
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
          "AWS::QuickSight::Agent",
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
