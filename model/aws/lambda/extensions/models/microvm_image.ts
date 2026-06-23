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

// Auto-generated extension model for @swamp/aws/lambda/microvm-image
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lambda MicrovmImage (AWS::Lambda::MicrovmImage).
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

const CloudWatchLoggingSchema = z.object({
  LogGroup: z.string().min(1).max(512).regex(
    new RegExp("^[a-zA-Z0-9_\\-/.#]+$"),
  ).optional(),
  LogStream: z.string().min(1).max(512).regex(new RegExp("^[^:*]*$"))
    .optional(),
});

const CpuConfigurationSchema = z.object({
  Architecture: z.enum(["ARM_64"]),
});

const ResourcesSchema = z.object({
  MinimumMemoryInMiB: z.number().int(),
});

const MicrovmHooksSchema = z.object({
  Run: z.enum(["DISABLED", "ENABLED"]).optional(),
  RunTimeoutInSeconds: z.number().int().min(1).max(60).optional(),
  Resume: z.enum(["DISABLED", "ENABLED"]).optional(),
  ResumeTimeoutInSeconds: z.number().int().min(1).max(60).optional(),
  Suspend: z.enum(["DISABLED", "ENABLED"]).optional(),
  SuspendTimeoutInSeconds: z.number().int().min(1).max(60).optional(),
  Terminate: z.enum(["DISABLED", "ENABLED"]).optional(),
  TerminateTimeoutInSeconds: z.number().int().min(1).max(60).optional(),
});

const MicrovmImageHooksSchema = z.object({
  Ready: z.enum(["DISABLED", "ENABLED"]).optional(),
  ReadyTimeoutInSeconds: z.number().int().min(1).max(3600).optional(),
  Validate: z.enum(["DISABLED", "ENABLED"]).optional(),
  ValidateTimeoutInSeconds: z.number().int().min(1).max(3600).optional(),
});

const EnvironmentVariableSchema = z.object({
  Key: z.string().min(1).max(256).regex(new RegExp("^[^\\s]+$")),
  Value: z.string().min(0).max(4096),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag.")
    .optional(),
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
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9-_]+$"))
    .describe("Unique name for the MicroVM image within the account."),
  BaseImageArn: z.string().min(1).max(2048).regex(new RegExp("^[^\\s]+$"))
    .describe("ARN of the base MicroVM image."),
  BaseImageVersion: z.string().min(1).max(2048).regex(new RegExp("^[^\\s]+$"))
    .describe("Specific version of the base MicroVM image to use."),
  BuildRoleArn: z.string().regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).describe("ARN of the IAM build role."),
  Description: z.string().describe(
    "Human-readable description of the MicroVM image and its purpose.",
  ),
  CodeArtifact: z.object({
    Uri: z.string().min(1).max(2048).regex(new RegExp("^[^\\s]+$")),
  }).describe("Code artifact for the active MicroVM image."),
  Logging: z.object({
    Disabled: z.boolean().optional(),
    CloudWatch: CloudWatchLoggingSchema.optional(),
  }).describe("Configuration for MicroVM image logging."),
  EgressNetworkConnectors: z.array(z.string()),
  CpuConfigurations: z.array(CpuConfigurationSchema),
  Resources: z.array(ResourcesSchema),
  AdditionalOsCapabilities: z.array(z.enum(["ALL"])),
  Hooks: z.object({
    Port: z.number().int().min(1).max(65535).optional(),
    MicrovmHooks: MicrovmHooksSchema.optional(),
    MicrovmImageHooks: MicrovmImageHooksSchema.optional(),
  }),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).describe(
    "Environment variables to set in the container during the snapshot build.",
  ),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs to associate with the MicroVM image for organization and management.",
  ).optional(),
});

const StateSchema = z.object({
  ImageArn: z.string(),
  Name: z.string().optional(),
  State: z.string().optional(),
  BaseImageArn: z.string().optional(),
  BaseImageVersion: z.string().optional(),
  BuildRoleArn: z.string().optional(),
  Description: z.string().optional(),
  CodeArtifact: z.object({
    Uri: z.string(),
  }).optional(),
  Logging: z.object({
    Disabled: z.boolean(),
    CloudWatch: CloudWatchLoggingSchema,
  }).optional(),
  EgressNetworkConnectors: z.array(z.string()).optional(),
  CpuConfigurations: z.array(CpuConfigurationSchema).optional(),
  Resources: z.array(ResourcesSchema).optional(),
  AdditionalOsCapabilities: z.array(z.string()).optional(),
  Hooks: z.object({
    Port: z.number(),
    MicrovmHooks: MicrovmHooksSchema,
    MicrovmImageHooks: MicrovmImageHooksSchema,
  }).optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  LatestActiveImageVersion: z.string().optional(),
  LatestFailedImageVersion: z.string().optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9-_]+$"))
    .describe("Unique name for the MicroVM image within the account.")
    .optional(),
  BaseImageArn: z.string().min(1).max(2048).regex(new RegExp("^[^\\s]+$"))
    .describe("ARN of the base MicroVM image.").optional(),
  BaseImageVersion: z.string().min(1).max(2048).regex(new RegExp("^[^\\s]+$"))
    .describe("Specific version of the base MicroVM image to use.").optional(),
  BuildRoleArn: z.string().regex(
    new RegExp(
      "^arn:aws[a-zA-Z-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$",
    ),
  ).describe("ARN of the IAM build role.").optional(),
  Description: z.string().describe(
    "Human-readable description of the MicroVM image and its purpose.",
  ).optional(),
  CodeArtifact: z.object({
    Uri: z.string().min(1).max(2048).regex(new RegExp("^[^\\s]+$")).optional(),
  }).describe("Code artifact for the active MicroVM image.").optional(),
  Logging: z.object({
    Disabled: z.boolean().optional(),
    CloudWatch: CloudWatchLoggingSchema.optional(),
  }).describe("Configuration for MicroVM image logging.").optional(),
  EgressNetworkConnectors: z.array(z.string()).optional(),
  CpuConfigurations: z.array(CpuConfigurationSchema).optional(),
  Resources: z.array(ResourcesSchema).optional(),
  AdditionalOsCapabilities: z.array(z.enum(["ALL"])).optional(),
  Hooks: z.object({
    Port: z.number().int().min(1).max(65535).optional(),
    MicrovmHooks: MicrovmHooksSchema.optional(),
    MicrovmImageHooks: MicrovmImageHooksSchema.optional(),
  }).optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).describe(
    "Environment variables to set in the container during the snapshot build.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs to associate with the MicroVM image for organization and management.",
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

/** Swamp extension model for Lambda MicrovmImage. Registered at `@swamp/aws/lambda/microvm-image`. */
export const model = {
  type: "@swamp/aws/lambda/microvm-image",
  version: "2026.06.23.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Lambda MicrovmImage resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lambda MicrovmImage",
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
          "AWS::Lambda::MicrovmImage",
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
      description: "Get a Lambda MicrovmImage",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda MicrovmImage",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lambda::MicrovmImage",
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
      description: "Update a Lambda MicrovmImage",
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
        const identifier = existing.ImageArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lambda::MicrovmImage",
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
          "AWS::Lambda::MicrovmImage",
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
      description: "Delete a Lambda MicrovmImage",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lambda MicrovmImage",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lambda::MicrovmImage",
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
      description: "Sync Lambda MicrovmImage state from AWS",
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
        const identifier = existing.ImageArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lambda::MicrovmImage",
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
