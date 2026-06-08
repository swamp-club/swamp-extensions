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

// Auto-generated extension model for @swamp/aws/stepfunctions/state-machine
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for StepFunctions StateMachine (AWS::StepFunctions::StateMachine).
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

const CloudWatchLogsLogGroupSchema = z.object({
  LogGroupArn: z.string().min(1).max(256).optional(),
});

const LogDestinationSchema = z.object({
  CloudWatchLogsLogGroup: CloudWatchLogsLogGroupSchema.optional(),
});

const TagsEntrySchema = z.object({
  Key: z.string().min(1).max(128),
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
  DefinitionString: z.string().min(1).max(1048576).optional(),
  RoleArn: z.string().min(1).max(256),
  StateMachineName: z.string().min(1).max(80).optional(),
  StateMachineType: z.enum(["STANDARD", "EXPRESS"]).optional(),
  LoggingConfiguration: z.object({
    Level: z.enum(["ALL", "ERROR", "FATAL", "OFF"]).optional(),
    IncludeExecutionData: z.boolean().optional(),
    Destinations: z.array(LogDestinationSchema).optional(),
  }).optional(),
  TracingConfiguration: z.object({
    Enabled: z.boolean().optional(),
  }).optional(),
  EncryptionConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(2048).optional(),
    KmsDataKeyReusePeriodSeconds: z.number().int().min(60).max(900).optional(),
    Type: z.enum(["CUSTOMER_MANAGED_KMS_KEY", "AWS_OWNED_KEY"]),
  }).optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string(),
    Key: z.string(),
    Version: z.string().optional(),
  }).optional(),
  DefinitionSubstitutions: z.record(z.string(), z.string()).optional(),
  Definition: z.record(z.string(), z.unknown()).optional(),
  Tags: z.array(TagsEntrySchema).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  DefinitionString: z.string().optional(),
  RoleArn: z.string().optional(),
  StateMachineName: z.string().optional(),
  StateMachineType: z.string().optional(),
  StateMachineRevisionId: z.string().optional(),
  LoggingConfiguration: z.object({
    Level: z.string(),
    IncludeExecutionData: z.boolean(),
    Destinations: z.array(LogDestinationSchema),
  }).optional(),
  TracingConfiguration: z.object({
    Enabled: z.boolean(),
  }).optional(),
  EncryptionConfiguration: z.object({
    KmsKeyId: z.string(),
    KmsDataKeyReusePeriodSeconds: z.number(),
    Type: z.string(),
  }).optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string(),
    Key: z.string(),
    Version: z.string(),
  }).optional(),
  DefinitionSubstitutions: z.record(z.string(), z.unknown()).optional(),
  Definition: z.record(z.string(), z.unknown()).optional(),
  Tags: z.array(TagsEntrySchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DefinitionString: z.string().min(1).max(1048576).optional(),
  RoleArn: z.string().min(1).max(256).optional(),
  StateMachineName: z.string().min(1).max(80).optional(),
  StateMachineType: z.enum(["STANDARD", "EXPRESS"]).optional(),
  LoggingConfiguration: z.object({
    Level: z.enum(["ALL", "ERROR", "FATAL", "OFF"]).optional(),
    IncludeExecutionData: z.boolean().optional(),
    Destinations: z.array(LogDestinationSchema).optional(),
  }).optional(),
  TracingConfiguration: z.object({
    Enabled: z.boolean().optional(),
  }).optional(),
  EncryptionConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(2048).optional(),
    KmsDataKeyReusePeriodSeconds: z.number().int().min(60).max(900).optional(),
    Type: z.enum(["CUSTOMER_MANAGED_KMS_KEY", "AWS_OWNED_KEY"]).optional(),
  }).optional(),
  DefinitionS3Location: z.object({
    Bucket: z.string().optional(),
    Key: z.string().optional(),
    Version: z.string().optional(),
  }).optional(),
  DefinitionSubstitutions: z.record(z.string(), z.string()).optional(),
  Definition: z.record(z.string(), z.unknown()).optional(),
  Tags: z.array(TagsEntrySchema).optional(),
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

/** Swamp extension model for StepFunctions StateMachine. Registered at `@swamp/aws/stepfunctions/state-machine`. */
export const model = {
  type: "@swamp/aws/stepfunctions/state-machine",
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
      description: "StepFunctions StateMachine resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a StepFunctions StateMachine",
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
          "AWS::StepFunctions::StateMachine",
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
      description: "Get a StepFunctions StateMachine",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the StepFunctions StateMachine",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::StepFunctions::StateMachine",
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
      description: "Update a StepFunctions StateMachine",
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
          "AWS::StepFunctions::StateMachine",
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
          "AWS::StepFunctions::StateMachine",
          identifier,
          currentState,
          desiredState,
          ["StateMachineName", "StateMachineType"],
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
      description: "Delete a StepFunctions StateMachine",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the StepFunctions StateMachine",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::StepFunctions::StateMachine",
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
      description: "Sync StepFunctions StateMachine state from AWS",
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
            "AWS::StepFunctions::StateMachine",
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
