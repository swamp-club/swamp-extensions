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

// Auto-generated extension model for @swamp/aws/iot/command
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoT Command (AWS::IoT::Command).
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

const CommandParameterValueSchema = z.object({
  S: z.string().min(1).optional(),
  B: z.boolean().optional(),
  I: z.number().int().optional(),
  L: z.string().max(19).regex(new RegExp("^-?\\d+$")).optional(),
  D: z.number().optional(),
  BIN: z.string().min(1).optional(),
  UL: z.string().min(1).max(20).regex(new RegExp("^[0-9]*$")).optional(),
});

const CommandParameterValueNumberRangeSchema = z.object({
  Min: z.string().min(1),
  Max: z.string().min(1),
});

const CommandParameterValueComparisonOperandSchema = z.object({
  Number: z.string().optional(),
  Numbers: z.array(z.string()).optional(),
  String: z.string().optional(),
  Strings: z.array(z.string()).optional(),
  NumberRange: CommandParameterValueNumberRangeSchema.optional(),
});

const CommandParameterValueConditionSchema = z.object({
  ComparisonOperator: z.enum([
    "EQUALS",
    "NOT_EQUALS",
    "LESS_THAN",
    "LESS_THAN_EQUALS",
    "GREATER_THAN",
    "GREATER_THAN_EQUALS",
    "IN_SET",
    "NOT_IN_SET",
    "IN_RANGE",
    "NOT_IN_RANGE",
  ]),
  Operand: CommandParameterValueComparisonOperandSchema,
});

const CommandParameterSchema = z.object({
  Name: z.string().min(1).max(192).regex(new RegExp("^[.$a-zA-Z0-9_-]+$")),
  Value: CommandParameterValueSchema.optional(),
  DefaultValue: CommandParameterValueSchema.optional(),
  Description: z.string().max(2028).optional(),
  Type: z.enum([
    "STRING",
    "INTEGER",
    "DOUBLE",
    "LONG",
    "UNSIGNEDLONG",
    "BOOLEAN",
    "BINARY",
  ]).optional(),
  ValueConditions: z.array(CommandParameterValueConditionSchema).optional(),
});

const AwsJsonSubstitutionCommandPreprocessorConfigSchema = z.object({
  OutputFormat: z.enum(["JSON", "CBOR"]),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The tag's key."),
  Value: z.string().min(1).max(256).describe("The tag's value."),
});

const GlobalArgsSchema = z.object({
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
  CommandId: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique identifier for the command."),
  CreatedAt: z.string().describe(
    "The date and time when the command was created.",
  ).optional(),
  Deprecated: z.boolean().describe(
    "A flag indicating whether the command is deprecated.",
  ).optional(),
  Description: z.string().max(2028).describe("The description of the command.")
    .optional(),
  DisplayName: z.string().describe("The display name for the command.")
    .optional(),
  LastUpdatedAt: z.string().describe(
    "The date and time when the command was last updated.",
  ).optional(),
  MandatoryParameters: z.array(CommandParameterSchema).describe(
    "The list of mandatory parameters for the command.",
  ).optional(),
  Namespace: z.enum(["AWS-IoT", "AWS-IoT-FleetWise"]).describe(
    "The namespace to which the command belongs.",
  ).optional(),
  RoleArn: z.string().min(20).max(2028).describe(
    "The customer role associated with the command.",
  ).optional(),
  Payload: z.object({
    Content: z.string().optional(),
    ContentType: z.string().min(1).optional(),
  }).describe("The payload associated with the command.").optional(),
  PayloadTemplate: z.string().max(32768).describe(
    "The payload template associated with the command.",
  ).optional(),
  Preprocessor: z.object({
    AwsJsonSubstitution: AwsJsonSubstitutionCommandPreprocessorConfigSchema
      .optional(),
  }).describe("The command preprocessor configuration.").optional(),
  PendingDeletion: z.boolean().describe(
    "A flag indicating whether the command is pending deletion.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to be associated with the command.",
  ).optional(),
});

const StateSchema = z.object({
  CommandArn: z.string().optional(),
  CommandId: z.string(),
  CreatedAt: z.string().optional(),
  Deprecated: z.boolean().optional(),
  Description: z.string().optional(),
  DisplayName: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
  MandatoryParameters: z.array(CommandParameterSchema).optional(),
  Namespace: z.string().optional(),
  RoleArn: z.string().optional(),
  Payload: z.object({
    Content: z.string(),
    ContentType: z.string(),
  }).optional(),
  PayloadTemplate: z.string().optional(),
  Preprocessor: z.object({
    AwsJsonSubstitution: AwsJsonSubstitutionCommandPreprocessorConfigSchema,
  }).optional(),
  PendingDeletion: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CommandId: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique identifier for the command.").optional(),
  CreatedAt: z.string().describe(
    "The date and time when the command was created.",
  ).optional(),
  Deprecated: z.boolean().describe(
    "A flag indicating whether the command is deprecated.",
  ).optional(),
  Description: z.string().max(2028).describe("The description of the command.")
    .optional(),
  DisplayName: z.string().describe("The display name for the command.")
    .optional(),
  LastUpdatedAt: z.string().describe(
    "The date and time when the command was last updated.",
  ).optional(),
  MandatoryParameters: z.array(CommandParameterSchema).describe(
    "The list of mandatory parameters for the command.",
  ).optional(),
  Namespace: z.enum(["AWS-IoT", "AWS-IoT-FleetWise"]).describe(
    "The namespace to which the command belongs.",
  ).optional(),
  RoleArn: z.string().min(20).max(2028).describe(
    "The customer role associated with the command.",
  ).optional(),
  Payload: z.object({
    Content: z.string().optional(),
    ContentType: z.string().min(1).optional(),
  }).describe("The payload associated with the command.").optional(),
  PayloadTemplate: z.string().max(32768).describe(
    "The payload template associated with the command.",
  ).optional(),
  Preprocessor: z.object({
    AwsJsonSubstitution: AwsJsonSubstitutionCommandPreprocessorConfigSchema
      .optional(),
  }).describe("The command preprocessor configuration.").optional(),
  PendingDeletion: z.boolean().describe(
    "A flag indicating whether the command is pending deletion.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to be associated with the command.",
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

/** Swamp extension model for IoT Command. Registered at `@swamp/aws/iot/command`. */
export const model = {
  type: "@swamp/aws/iot/command",
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
      description: "IoT Command resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoT Command",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::IoT::Command",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.CommandId ?? g.CommandId)?.toString() ?? "current").replace(
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
      description: "Get a IoT Command",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT Command",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoT::Command",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.CommandId ?? context.globalArgs.CommandId)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a IoT Command",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.CommandId?.toString() ?? "current").replace(
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
        const identifier = existing.CommandId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoT::Command",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoT::Command",
          identifier,
          currentState,
          desiredState,
          ["CommandId", "PayloadTemplate", "Preprocessor"],
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
      description: "Delete a IoT Command",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoT Command",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoT::Command",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.CommandId?.toString() ?? args.identifier).replace(
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
      description: "Sync IoT Command state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.CommandId?.toString() ?? "current").replace(
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
        const identifier = existing.CommandId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoT::Command",
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
