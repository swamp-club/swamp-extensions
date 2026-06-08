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

// Auto-generated extension model for @swamp/aws/codepipeline/webhook
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CodePipeline Webhook (AWS::CodePipeline::Webhook).
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

const WebhookFilterRuleSchema = z.object({
  JsonPath: z.string().min(1).max(150).describe(
    "A JsonPath expression that is applied to the body/payload of the webhook. The value selected by the JsonPath expression must match the value specified in the MatchEquals field. Otherwise, the request is ignored.",
  ),
  MatchEquals: z.string().min(1).max(150).describe(
    "The value selected by the JsonPath expression must match what is supplied in the MatchEquals field. Otherwise, the request is ignored.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  AuthenticationConfiguration: z.object({
    AllowedIPRange: z.string().min(1).max(100).describe(
      "The property used to configure acceptance of webhooks in an IP address range. For IP, only the AllowedIPRange property must be set. This property must be set to a valid CIDR range.",
    ).optional(),
    SecretToken: z.string().min(1).max(100).describe(
      "The property used to configure GitHub authentication. For GITHUB_HMAC, only the SecretToken property must be set.",
    ).optional(),
  }).describe(
    "Properties that configure the authentication applied to incoming webhook trigger requests",
  ),
  Filters: z.array(WebhookFilterRuleSchema).describe(
    "A list of rules applied to the body/payload sent in the POST request to a webhook URL",
  ),
  Authentication: z.enum(["GITHUB_HMAC", "IP", "UNAUTHENTICATED"]).describe(
    "Supported options are GITHUB_HMAC, IP, and UNAUTHENTICATED.",
  ),
  TargetPipeline: z.string().min(1).max(100).regex(
    new RegExp("[A-Za-z0-9.@\\-_]+"),
  ).describe("The name of the pipeline you want to connect to the webhook."),
  TargetAction: z.string().min(1).max(100).regex(
    new RegExp("[A-Za-z0-9.@\\-_]+"),
  ).describe(
    "The name of the action in a pipeline you want to connect to the webhook.",
  ),
  Name: z.string().min(1).max(100).regex(new RegExp("[A-Za-z0-9.@\\-_]+"))
    .describe("The name of the webhook").optional(),
  TargetPipelineVersion: z.number().int().describe(
    "The version number of the pipeline to be connected to the trigger request.",
  ).optional(),
  RegisterWithThirdParty: z.boolean().describe(
    "Configures a connection between the webhook that was created and the external tool with events to be detected.",
  ).optional(),
});

const StateSchema = z.object({
  AuthenticationConfiguration: z.object({
    AllowedIPRange: z.string(),
    SecretToken: z.string(),
  }).optional(),
  Filters: z.array(WebhookFilterRuleSchema).optional(),
  Authentication: z.string().optional(),
  TargetPipeline: z.string().optional(),
  TargetAction: z.string().optional(),
  Id: z.string(),
  Url: z.string().optional(),
  Name: z.string().optional(),
  TargetPipelineVersion: z.number().optional(),
  RegisterWithThirdParty: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AuthenticationConfiguration: z.object({
    AllowedIPRange: z.string().min(1).max(100).describe(
      "The property used to configure acceptance of webhooks in an IP address range. For IP, only the AllowedIPRange property must be set. This property must be set to a valid CIDR range.",
    ).optional(),
    SecretToken: z.string().min(1).max(100).describe(
      "The property used to configure GitHub authentication. For GITHUB_HMAC, only the SecretToken property must be set.",
    ).optional(),
  }).describe(
    "Properties that configure the authentication applied to incoming webhook trigger requests",
  ).optional(),
  Filters: z.array(WebhookFilterRuleSchema).describe(
    "A list of rules applied to the body/payload sent in the POST request to a webhook URL",
  ).optional(),
  Authentication: z.enum(["GITHUB_HMAC", "IP", "UNAUTHENTICATED"]).describe(
    "Supported options are GITHUB_HMAC, IP, and UNAUTHENTICATED.",
  ).optional(),
  TargetPipeline: z.string().min(1).max(100).regex(
    new RegExp("[A-Za-z0-9.@\\-_]+"),
  ).describe("The name of the pipeline you want to connect to the webhook.")
    .optional(),
  TargetAction: z.string().min(1).max(100).regex(
    new RegExp("[A-Za-z0-9.@\\-_]+"),
  ).describe(
    "The name of the action in a pipeline you want to connect to the webhook.",
  ).optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("[A-Za-z0-9.@\\-_]+"))
    .describe("The name of the webhook").optional(),
  TargetPipelineVersion: z.number().int().describe(
    "The version number of the pipeline to be connected to the trigger request.",
  ).optional(),
  RegisterWithThirdParty: z.boolean().describe(
    "Configures a connection between the webhook that was created and the external tool with events to be detected.",
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

/** Swamp extension model for CodePipeline Webhook. Registered at `@swamp/aws/codepipeline/webhook`. */
export const model = {
  type: "@swamp/aws/codepipeline/webhook",
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
      description: "CodePipeline Webhook resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CodePipeline Webhook",
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
          "AWS::CodePipeline::Webhook",
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
      description: "Get a CodePipeline Webhook",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodePipeline Webhook",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CodePipeline::Webhook",
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
      description: "Update a CodePipeline Webhook",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CodePipeline::Webhook",
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
          "AWS::CodePipeline::Webhook",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a CodePipeline Webhook",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodePipeline Webhook",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CodePipeline::Webhook",
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
      description: "Sync CodePipeline Webhook state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CodePipeline::Webhook",
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
