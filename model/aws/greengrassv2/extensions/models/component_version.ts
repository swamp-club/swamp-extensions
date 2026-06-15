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

// Auto-generated extension model for @swamp/aws/greengrassv2/component-version
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for GreengrassV2 ComponentVersion (AWS::GreengrassV2::ComponentVersion).
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

const ComponentPlatformSchema = z.object({
  Name: z.string().optional(),
  Attributes: z.record(z.string(), z.string()).optional(),
});

const ComponentDependencyRequirementSchema = z.object({
  VersionRequirement: z.string().optional(),
  DependencyType: z.enum(["SOFT", "HARD"]).optional(),
});

const LambdaEventSourceSchema = z.object({
  Topic: z.string().optional(),
  Type: z.enum(["PUB_SUB", "IOT_CORE"]).optional(),
});

const LambdaVolumeMountSchema = z.object({
  SourcePath: z.string().optional(),
  DestinationPath: z.string().optional(),
  Permission: z.enum(["ro", "rw"]).optional(),
  AddGroupOwner: z.boolean().optional(),
});

const LambdaDeviceMountSchema = z.object({
  Path: z.string().optional(),
  Permission: z.enum(["ro", "rw"]).optional(),
  AddGroupOwner: z.boolean().optional(),
});

const LambdaContainerParamsSchema = z.object({
  MemorySizeInKB: z.number().int().optional(),
  MountROSysfs: z.boolean().optional(),
  Volumes: z.array(LambdaVolumeMountSchema).optional(),
  Devices: z.array(LambdaDeviceMountSchema).optional(),
});

const LambdaLinuxProcessParamsSchema = z.object({
  IsolationMode: z.enum(["GreengrassContainer", "NoContainer"]).optional(),
  ContainerParams: LambdaContainerParamsSchema.optional(),
});

const LambdaExecutionParametersSchema = z.object({
  EventSources: z.array(LambdaEventSourceSchema).optional(),
  MaxQueueSize: z.number().int().optional(),
  MaxInstancesCount: z.number().int().optional(),
  MaxIdleTimeInSeconds: z.number().int().optional(),
  TimeoutInSeconds: z.number().int().optional(),
  StatusTimeoutInSeconds: z.number().int().optional(),
  Pinned: z.boolean().optional(),
  InputPayloadEncodingType: z.enum(["json", "binary"]).optional(),
  ExecArgs: z.array(z.string()).optional(),
  EnvironmentVariables: z.record(z.string(), z.string()).optional(),
  LinuxProcessParams: LambdaLinuxProcessParamsSchema.optional(),
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
  InlineRecipe: z.string().optional(),
  LambdaFunction: z.object({
    LambdaArn: z.string().regex(
      new RegExp("^arn:[^:]*:lambda:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$"),
    ).optional(),
    ComponentPlatforms: z.array(ComponentPlatformSchema).optional(),
    ComponentDependencies: z.record(
      z.string(),
      ComponentDependencyRequirementSchema,
    ).optional(),
    ComponentLambdaParameters: LambdaExecutionParametersSchema.optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().max(256)).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ComponentName: z.string().optional(),
  ComponentVersion: z.string().optional(),
  InlineRecipe: z.string().optional(),
  LambdaFunction: z.object({
    LambdaArn: z.string(),
    ComponentName: z.string(),
    ComponentVersion: z.string(),
    ComponentPlatforms: z.array(ComponentPlatformSchema),
    ComponentDependencies: z.record(z.string(), z.unknown()),
    ComponentLambdaParameters: LambdaExecutionParametersSchema,
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
  InlineRecipe: z.string().optional(),
  LambdaFunction: z.object({
    LambdaArn: z.string().regex(
      new RegExp("^arn:[^:]*:lambda:(([a-z]+-)+[0-9])?:([0-9]{12})?:[^.]+$"),
    ).optional(),
    ComponentPlatforms: z.array(ComponentPlatformSchema).optional(),
    ComponentDependencies: z.record(
      z.string(),
      ComponentDependencyRequirementSchema,
    ).optional(),
    ComponentLambdaParameters: LambdaExecutionParametersSchema.optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string().max(256)).optional(),
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

/** Swamp extension model for GreengrassV2 ComponentVersion. Registered at `@swamp/aws/greengrassv2/component-version`. */
export const model = {
  type: "@swamp/aws/greengrassv2/component-version",
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
      description: "GreengrassV2 ComponentVersion resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GreengrassV2 ComponentVersion",
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
          "AWS::GreengrassV2::ComponentVersion",
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
      description: "Get a GreengrassV2 ComponentVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GreengrassV2 ComponentVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::GreengrassV2::ComponentVersion",
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
      description: "Update a GreengrassV2 ComponentVersion",
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
          "AWS::GreengrassV2::ComponentVersion",
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
          "AWS::GreengrassV2::ComponentVersion",
          identifier,
          currentState,
          desiredState,
          ["LambdaFunction", "InlineRecipe"],
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
      description: "Delete a GreengrassV2 ComponentVersion",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GreengrassV2 ComponentVersion",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::GreengrassV2::ComponentVersion",
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
      description: "Sync GreengrassV2 ComponentVersion state from AWS",
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
            "AWS::GreengrassV2::ComponentVersion",
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
