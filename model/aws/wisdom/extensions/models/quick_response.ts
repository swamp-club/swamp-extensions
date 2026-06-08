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

// Auto-generated extension model for @swamp/aws/wisdom/quick-response
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Wisdom QuickResponse (AWS::Wisdom::QuickResponse).
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

const QuickResponseContentProviderSchema = z.object({
  Content: z.string().min(1).max(1024).describe(
    "The content of the quick response.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ContentType: z.string().regex(
    new RegExp("^(application/x\\.quickresponse;format=(plain|markdown))$"),
  ).describe(
    "The media type of the quick response content. - Use application/x.quickresponse;format=plain for quick response written in plain text. - Use application/x.quickresponse;format=markdown for quick response written in richtext.",
  ).optional(),
  KnowledgeBaseArn: z.string().regex(
    new RegExp(
      "^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}){0,2}$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the knowledge base."),
  Name: z.string().min(1).max(100).describe("The name of the quick response."),
  Channels: z.array(z.enum(["Chat", "Email"])).describe(
    "The Amazon Connect contact channels this quick response applies to.",
  ).optional(),
  Content: z.object({
    Content: z.string().min(1).max(1024).describe(
      "The content of the quick response.",
    ).optional(),
  }).describe("The container of quick response content."),
  Contents: z.object({
    Markdown: QuickResponseContentProviderSchema.describe(
      "The container of quick response content.",
    ).optional(),
    PlainText: QuickResponseContentProviderSchema.describe(
      "The container of quick response content.",
    ).optional(),
  }).describe(
    "The content of the quick response stored in different media types.",
  ).optional(),
  Description: z.string().min(1).max(255).describe(
    "The description of the quick response.",
  ).optional(),
  GroupingConfiguration: z.object({
    Criteria: z.string().min(1).max(100).describe(
      "The criteria used for grouping Amazon Q in Connect users.",
    ),
    Values: z.array(z.string().min(1).max(2048)).describe(
      "The list of values that define different groups of Amazon Q in Connect users.",
    ),
  }).describe(
    "The configuration information of the user groups that the quick response is accessible to.",
  ).optional(),
  IsActive: z.boolean().describe("Whether the quick response is active.")
    .optional(),
  Language: z.string().min(2).max(5).describe(
    "The language code value for the language in which the quick response is written. The supported language codes include de_DE, en_US, es_ES, fr_FR, id_ID, it_IT, ja_JP, ko_KR, pt_BR, zh_CN, zh_TW",
  ).optional(),
  ShortcutKey: z.string().min(1).max(100).describe(
    "The shortcut key of the quick response. The value should be unique across the knowledge base.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  ContentType: z.string().optional(),
  KnowledgeBaseArn: z.string().optional(),
  Name: z.string().optional(),
  QuickResponseArn: z.string(),
  QuickResponseId: z.string().optional(),
  Channels: z.array(z.string()).optional(),
  Content: QuickResponseContentProviderSchema.optional(),
  Contents: z.object({
    Markdown: QuickResponseContentProviderSchema,
    PlainText: QuickResponseContentProviderSchema,
  }).optional(),
  Description: z.string().optional(),
  GroupingConfiguration: z.object({
    Criteria: z.string(),
    Values: z.array(z.string()),
  }).optional(),
  IsActive: z.boolean().optional(),
  Language: z.string().optional(),
  ShortcutKey: z.string().optional(),
  Status: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ContentType: z.string().regex(
    new RegExp("^(application/x\\.quickresponse;format=(plain|markdown))$"),
  ).describe(
    "The media type of the quick response content. - Use application/x.quickresponse;format=plain for quick response written in plain text. - Use application/x.quickresponse;format=markdown for quick response written in richtext.",
  ).optional(),
  KnowledgeBaseArn: z.string().regex(
    new RegExp(
      "^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}){0,2}$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the knowledge base.")
    .optional(),
  Name: z.string().min(1).max(100).describe("The name of the quick response.")
    .optional(),
  Channels: z.array(z.enum(["Chat", "Email"])).describe(
    "The Amazon Connect contact channels this quick response applies to.",
  ).optional(),
  Content: z.object({
    Content: z.string().min(1).max(1024).describe(
      "The content of the quick response.",
    ).optional(),
  }).describe("The container of quick response content.").optional(),
  Contents: z.object({
    Markdown: QuickResponseContentProviderSchema.describe(
      "The container of quick response content.",
    ).optional(),
    PlainText: QuickResponseContentProviderSchema.describe(
      "The container of quick response content.",
    ).optional(),
  }).describe(
    "The content of the quick response stored in different media types.",
  ).optional(),
  Description: z.string().min(1).max(255).describe(
    "The description of the quick response.",
  ).optional(),
  GroupingConfiguration: z.object({
    Criteria: z.string().min(1).max(100).describe(
      "The criteria used for grouping Amazon Q in Connect users.",
    ).optional(),
    Values: z.array(z.string().min(1).max(2048)).describe(
      "The list of values that define different groups of Amazon Q in Connect users.",
    ).optional(),
  }).describe(
    "The configuration information of the user groups that the quick response is accessible to.",
  ).optional(),
  IsActive: z.boolean().describe("Whether the quick response is active.")
    .optional(),
  Language: z.string().min(2).max(5).describe(
    "The language code value for the language in which the quick response is written. The supported language codes include de_DE, en_US, es_ES, fr_FR, id_ID, it_IT, ja_JP, ko_KR, pt_BR, zh_CN, zh_TW",
  ).optional(),
  ShortcutKey: z.string().min(1).max(100).describe(
    "The shortcut key of the quick response. The value should be unique across the knowledge base.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for Wisdom QuickResponse. Registered at `@swamp/aws/wisdom/quick-response`. */
export const model = {
  type: "@swamp/aws/wisdom/quick-response",
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
      description: "Wisdom QuickResponse resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Wisdom QuickResponse",
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
          "AWS::Wisdom::QuickResponse",
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
      description: "Get a Wisdom QuickResponse",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom QuickResponse",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Wisdom::QuickResponse",
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
      description: "Update a Wisdom QuickResponse",
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
        const identifier = existing.QuickResponseArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Wisdom::QuickResponse",
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
          "AWS::Wisdom::QuickResponse",
          identifier,
          currentState,
          desiredState,
          ["KnowledgeBaseArn"],
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
      description: "Delete a Wisdom QuickResponse",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom QuickResponse",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Wisdom::QuickResponse",
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
      description: "Sync Wisdom QuickResponse state from AWS",
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
        const identifier = existing.QuickResponseArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Wisdom::QuickResponse",
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
