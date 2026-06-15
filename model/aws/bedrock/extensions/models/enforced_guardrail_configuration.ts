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

// Auto-generated extension model for @swamp/aws/bedrock/enforced-guardrail-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Bedrock EnforcedGuardrailConfiguration (AWS::Bedrock::EnforcedGuardrailConfiguration).
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
  GuardrailIdentifier: z.string().min(0).max(2048).regex(
    new RegExp(
      "^(([a-z0-9]+)|(arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:guardrail/[a-z0-9]+))$",
    ),
  ).describe("Identifier for the guardrail, could be the ID or the ARN"),
  GuardrailVersion: z.string().regex(new RegExp("^[1-9][0-9]{0,7}$")).describe(
    "Numerical guardrail version (not DRAFT)",
  ),
  SelectiveContentGuarding: z.object({
    System: z.enum(["SELECTIVE", "COMPREHENSIVE"]).describe(
      "Selective guarding mode for system prompts",
    ).optional(),
    Messages: z.enum(["SELECTIVE", "COMPREHENSIVE"]).describe(
      "Selective guarding mode for user messages",
    ).optional(),
  }).describe("Selective content guarding controls for enforced guardrails")
    .optional(),
  ModelEnforcement: z.object({
    IncludedModels: z.array(
      z.string().regex(
        new RegExp(
          "^(ALL|([a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63})([:][a-z0-9-]{1,63}){0,2}(/[a-z0-9]{12}){0,1})$",
        ),
      ),
    ).describe("Models to enforce the guardrail on"),
    ExcludedModels: z.array(
      z.string().regex(
        new RegExp(
          "^([a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63})([:][a-z0-9-]{1,63}){0,2}(/[a-z0-9]{12}){0,1}$",
        ),
      ),
    ).describe(
      "Models to exclude from enforcement. If a model is in both lists, it is excluded",
    ),
  }).describe(
    "Model-specific information for the enforced guardrail configuration. If not present, the configuration is enforced on all models",
  ).optional(),
});

const StateSchema = z.object({
  ConfigId: z.string(),
  GuardrailIdentifier: z.string().optional(),
  GuardrailVersion: z.string().optional(),
  SelectiveContentGuarding: z.object({
    System: z.string(),
    Messages: z.string(),
  }).optional(),
  ModelEnforcement: z.object({
    IncludedModels: z.array(z.string()),
    ExcludedModels: z.array(z.string()),
  }).optional(),
  GuardrailArn: z.string().optional(),
  GuardrailId: z.string().optional(),
  CreatedAt: z.string().optional(),
  CreatedBy: z.string().optional(),
  UpdatedAt: z.string().optional(),
  UpdatedBy: z.string().optional(),
  Owner: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  GuardrailIdentifier: z.string().min(0).max(2048).regex(
    new RegExp(
      "^(([a-z0-9]+)|(arn:aws(-[^:]+)?:bedrock:[a-z0-9-]{1,20}:[0-9]{12}:guardrail/[a-z0-9]+))$",
    ),
  ).describe("Identifier for the guardrail, could be the ID or the ARN")
    .optional(),
  GuardrailVersion: z.string().regex(new RegExp("^[1-9][0-9]{0,7}$")).describe(
    "Numerical guardrail version (not DRAFT)",
  ).optional(),
  SelectiveContentGuarding: z.object({
    System: z.enum(["SELECTIVE", "COMPREHENSIVE"]).describe(
      "Selective guarding mode for system prompts",
    ).optional(),
    Messages: z.enum(["SELECTIVE", "COMPREHENSIVE"]).describe(
      "Selective guarding mode for user messages",
    ).optional(),
  }).describe("Selective content guarding controls for enforced guardrails")
    .optional(),
  ModelEnforcement: z.object({
    IncludedModels: z.array(
      z.string().regex(
        new RegExp(
          "^(ALL|([a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63})([:][a-z0-9-]{1,63}){0,2}(/[a-z0-9]{12}){0,1})$",
        ),
      ),
    ).describe("Models to enforce the guardrail on").optional(),
    ExcludedModels: z.array(
      z.string().regex(
        new RegExp(
          "^([a-z0-9-]{1,63}[.]{1}[a-z0-9-]{1,63})([:][a-z0-9-]{1,63}){0,2}(/[a-z0-9]{12}){0,1}$",
        ),
      ),
    ).describe(
      "Models to exclude from enforcement. If a model is in both lists, it is excluded",
    ).optional(),
  }).describe(
    "Model-specific information for the enforced guardrail configuration. If not present, the configuration is enforced on all models",
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

/** Swamp extension model for Bedrock EnforcedGuardrailConfiguration. Registered at `@swamp/aws/bedrock/enforced-guardrail-configuration`. */
export const model = {
  type: "@swamp/aws/bedrock/enforced-guardrail-configuration",
  version: "2026.06.15.1",
  upgrades: [
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Bedrock EnforcedGuardrailConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Bedrock EnforcedGuardrailConfiguration",
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
          "AWS::Bedrock::EnforcedGuardrailConfiguration",
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
      description: "Get a Bedrock EnforcedGuardrailConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock EnforcedGuardrailConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Bedrock::EnforcedGuardrailConfiguration",
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
      description: "Update a Bedrock EnforcedGuardrailConfiguration",
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
        const identifier = existing.ConfigId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Bedrock::EnforcedGuardrailConfiguration",
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
          "AWS::Bedrock::EnforcedGuardrailConfiguration",
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
      description: "Delete a Bedrock EnforcedGuardrailConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Bedrock EnforcedGuardrailConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Bedrock::EnforcedGuardrailConfiguration",
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
      description: "Sync Bedrock EnforcedGuardrailConfiguration state from AWS",
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
        const identifier = existing.ConfigId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Bedrock::EnforcedGuardrailConfiguration",
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
