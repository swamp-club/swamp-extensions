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

// Auto-generated extension model for @swamp/aws/sagemaker/app-image-config
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker AppImageConfig (AWS::SageMaker::AppImageConfig).
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

const FileSystemConfigSchema = z.object({
  DefaultGid: z.number().int().min(0).max(65535).describe(
    "The default POSIX group ID (GID). If not specified, defaults to 100.",
  ).optional(),
  DefaultUid: z.number().int().min(0).max(65535).describe(
    "The default POSIX user ID (UID). If not specified, defaults to 1000.",
  ).optional(),
  MountPath: z.string().min(1).max(1024).regex(new RegExp("^/.*")).describe(
    "The path within the image to mount the user's EFS home directory. The directory should be empty. If not specified, defaults to /home/sagemaker-user.",
  ).optional(),
});

const KernelSpecSchema = z.object({
  DisplayName: z.string().min(1).max(1024).describe(
    "The display name of the kernel.",
  ).optional(),
  Name: z.string().min(1).max(1024).describe("The name of the kernel."),
});

const CustomImageContainerEnvironmentVariableSchema = z.object({
  Value: z.string().min(1).max(256).regex(new RegExp("^(?!\\s*$).+")),
  Key: z.string().min(1).max(256).regex(new RegExp("^(?!\\s*$).+")),
});

const ContainerConfigSchema = z.object({
  ContainerArguments: z.array(
    z.string().min(1).max(64).regex(new RegExp("^(?!\\s*$).+")),
  ).describe("A list of arguments to apply to the container.").optional(),
  ContainerEntrypoint: z.array(
    z.string().min(1).max(256).regex(new RegExp("^(?!\\s*$).+")),
  ).describe("The custom entry point to use on container.").optional(),
  ContainerEnvironmentVariables: z.array(
    CustomImageContainerEnvironmentVariableSchema,
  ).describe("A list of variables to apply to the custom container.")
    .optional(),
});

const TagSchema = z.object({
  Value: z.string().min(1).max(128),
  Key: z.string().min(1).max(128),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  AppImageConfigName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The Name of the AppImageConfig."),
  KernelGatewayImageConfig: z.object({
    FileSystemConfig: FileSystemConfigSchema.describe(
      "The Amazon Elastic File System (EFS) storage configuration for a SageMaker image.",
    ).optional(),
    KernelSpecs: z.array(KernelSpecSchema).describe(
      "The specification of the Jupyter kernels in the image.",
    ),
  }).describe("The KernelGatewayImageConfig.").optional(),
  JupyterLabAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema.describe(
      "The container configuration for a SageMaker image.",
    ).optional(),
  }).describe("The JupyterLabAppImageConfig.").optional(),
  CodeEditorAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema.describe(
      "The container configuration for a SageMaker image.",
    ).optional(),
  }).describe("The CodeEditorAppImageConfig.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to apply to the AppImageConfig.",
  ).optional(),
});

const StateSchema = z.object({
  AppImageConfigArn: z.string().optional(),
  AppImageConfigName: z.string(),
  KernelGatewayImageConfig: z.object({
    FileSystemConfig: FileSystemConfigSchema,
    KernelSpecs: z.array(KernelSpecSchema),
  }).optional(),
  JupyterLabAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema,
  }).optional(),
  CodeEditorAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AppImageConfigName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}"),
  ).describe("The Name of the AppImageConfig.").optional(),
  KernelGatewayImageConfig: z.object({
    FileSystemConfig: FileSystemConfigSchema.describe(
      "The Amazon Elastic File System (EFS) storage configuration for a SageMaker image.",
    ).optional(),
    KernelSpecs: z.array(KernelSpecSchema).describe(
      "The specification of the Jupyter kernels in the image.",
    ).optional(),
  }).describe("The KernelGatewayImageConfig.").optional(),
  JupyterLabAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema.describe(
      "The container configuration for a SageMaker image.",
    ).optional(),
  }).describe("The JupyterLabAppImageConfig.").optional(),
  CodeEditorAppImageConfig: z.object({
    ContainerConfig: ContainerConfigSchema.describe(
      "The container configuration for a SageMaker image.",
    ).optional(),
  }).describe("The CodeEditorAppImageConfig.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to apply to the AppImageConfig.",
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

/** Swamp extension model for SageMaker AppImageConfig. Registered at `@swamp/aws/sagemaker/app-image-config`. */
export const model = {
  type: "@swamp/aws/sagemaker/app-image-config",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      description: "SageMaker AppImageConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker AppImageConfig",
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
          "AWS::SageMaker::AppImageConfig",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.AppImageConfigName ?? g.AppImageConfigName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SageMaker AppImageConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker AppImageConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::AppImageConfig",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.AppImageConfigName ?? context.globalArgs.AppImageConfigName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a SageMaker AppImageConfig",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.AppImageConfigName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AppImageConfigName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::AppImageConfig",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SageMaker::AppImageConfig",
          identifier,
          currentState,
          desiredState,
          ["AppImageConfigName"],
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
      description: "Delete a SageMaker AppImageConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker AppImageConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::AppImageConfig",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.AppImageConfigName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync SageMaker AppImageConfig state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.AppImageConfigName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.AppImageConfigName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::AppImageConfig",
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
