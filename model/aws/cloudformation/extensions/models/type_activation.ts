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

// Auto-generated extension model for @swamp/aws/cloudformation/type-activation
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFormation TypeActivation (AWS::CloudFormation::TypeActivation).
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ExecutionRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM execution role to use to register the type. If your resource type calls AWS APIs in any of its handlers, you must create an IAM execution role that includes the necessary permissions to call those AWS APIs, and provision that execution role in your account. CloudFormation then assumes that execution role to provide your resource type with the appropriate credentials.",
  ).optional(),
  PublisherId: z.string().min(1).max(40).regex(new RegExp("[0-9a-zA-Z-]{1,40}"))
    .describe(
      "The reserved publisher id for this type, or the publisher id assigned by CloudFormation for publishing in this region.",
    ).optional(),
  LoggingConfig: z.object({
    LogGroupName: z.string().min(1).max(512).regex(
      new RegExp("^[\\.\\-_/#A-Za-z0-9]+$"),
    ).describe(
      "The Amazon CloudWatch log group to which CloudFormation sends error logging information when invoking the type's handlers.",
    ).optional(),
    LogRoleArn: z.string().min(1).max(256).describe(
      "The ARN of the role that CloudFormation should assume when sending log entries to CloudWatch logs.",
    ).optional(),
  }).describe("Specifies logging configuration information for a type.")
    .optional(),
  PublicTypeArn: z.string().max(1024).regex(
    new RegExp(
      "arn:aws[A-Za-z0-9-]{0,64}:cloudformation:[A-Za-z0-9-]{1,64}:([0-9]{12})?:type/.+",
    ),
  ).describe(
    "The Amazon Resource Number (ARN) assigned to the public extension upon publication",
  ).optional(),
  AutoUpdate: z.boolean().describe(
    "Whether to automatically update the extension in this account and region when a new minor version is published by the extension publisher. Major versions released by the publisher must be manually updated.",
  ).optional(),
  TypeNameAlias: z.string().min(10).max(204).regex(
    new RegExp(
      "[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}(::MODULE){0,1}",
    ),
  ).describe(
    "An alias to assign to the public extension in this account and region. If you specify an alias for the extension, you must then use the alias to refer to the extension in your templates.",
  ).optional(),
  VersionBump: z.enum(["MAJOR", "MINOR"]).describe(
    "Manually updates a previously-enabled type to a new major or minor version, if available. You can also use this parameter to update the value of AutoUpdateEnabled",
  ).optional(),
  MajorVersion: z.string().min(1).max(100000).describe(
    "The Major Version of the type you want to enable",
  ).optional(),
  TypeName: z.string().regex(
    new RegExp(
      "[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}(::MODULE){0,1}",
    ),
  ).describe(
    "The name of the type being registered. We recommend that type names adhere to the following pattern: company_or_organization::service::type.",
  ).optional(),
  Type: z.enum(["RESOURCE", "MODULE", "HOOK"]).describe("The kind of extension")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ExecutionRoleArn: z.string().optional(),
  PublisherId: z.string().optional(),
  LoggingConfig: z.object({
    LogGroupName: z.string(),
    LogRoleArn: z.string(),
  }).optional(),
  PublicTypeArn: z.string().optional(),
  AutoUpdate: z.boolean().optional(),
  TypeNameAlias: z.string().optional(),
  VersionBump: z.string().optional(),
  MajorVersion: z.string().optional(),
  TypeName: z.string().optional(),
  Type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ExecutionRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM execution role to use to register the type. If your resource type calls AWS APIs in any of its handlers, you must create an IAM execution role that includes the necessary permissions to call those AWS APIs, and provision that execution role in your account. CloudFormation then assumes that execution role to provide your resource type with the appropriate credentials.",
  ).optional(),
  PublisherId: z.string().min(1).max(40).regex(new RegExp("[0-9a-zA-Z-]{1,40}"))
    .describe(
      "The reserved publisher id for this type, or the publisher id assigned by CloudFormation for publishing in this region.",
    ).optional(),
  LoggingConfig: z.object({
    LogGroupName: z.string().min(1).max(512).regex(
      new RegExp("^[\\.\\-_/#A-Za-z0-9]+$"),
    ).describe(
      "The Amazon CloudWatch log group to which CloudFormation sends error logging information when invoking the type's handlers.",
    ).optional(),
    LogRoleArn: z.string().min(1).max(256).describe(
      "The ARN of the role that CloudFormation should assume when sending log entries to CloudWatch logs.",
    ).optional(),
  }).describe("Specifies logging configuration information for a type.")
    .optional(),
  PublicTypeArn: z.string().max(1024).regex(
    new RegExp(
      "arn:aws[A-Za-z0-9-]{0,64}:cloudformation:[A-Za-z0-9-]{1,64}:([0-9]{12})?:type/.+",
    ),
  ).describe(
    "The Amazon Resource Number (ARN) assigned to the public extension upon publication",
  ).optional(),
  AutoUpdate: z.boolean().describe(
    "Whether to automatically update the extension in this account and region when a new minor version is published by the extension publisher. Major versions released by the publisher must be manually updated.",
  ).optional(),
  TypeNameAlias: z.string().min(10).max(204).regex(
    new RegExp(
      "[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}(::MODULE){0,1}",
    ),
  ).describe(
    "An alias to assign to the public extension in this account and region. If you specify an alias for the extension, you must then use the alias to refer to the extension in your templates.",
  ).optional(),
  VersionBump: z.enum(["MAJOR", "MINOR"]).describe(
    "Manually updates a previously-enabled type to a new major or minor version, if available. You can also use this parameter to update the value of AutoUpdateEnabled",
  ).optional(),
  MajorVersion: z.string().min(1).max(100000).describe(
    "The Major Version of the type you want to enable",
  ).optional(),
  TypeName: z.string().regex(
    new RegExp(
      "[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}(::MODULE){0,1}",
    ),
  ).describe(
    "The name of the type being registered. We recommend that type names adhere to the following pattern: company_or_organization::service::type.",
  ).optional(),
  Type: z.enum(["RESOURCE", "MODULE", "HOOK"]).describe("The kind of extension")
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

/** Swamp extension model for CloudFormation TypeActivation. Registered at `@swamp/aws/cloudformation/type-activation`. */
export const model = {
  type: "@swamp/aws/cloudformation/type-activation",
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
      description: "CloudFormation TypeActivation resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFormation TypeActivation",
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
          "AWS::CloudFormation::TypeActivation",
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
      description: "Get a CloudFormation TypeActivation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation TypeActivation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudFormation::TypeActivation",
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
      description: "Update a CloudFormation TypeActivation",
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
          "AWS::CloudFormation::TypeActivation",
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
          "AWS::CloudFormation::TypeActivation",
          identifier,
          currentState,
          desiredState,
          ["LoggingConfig"],
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
      description: "Delete a CloudFormation TypeActivation",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation TypeActivation",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudFormation::TypeActivation",
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
      description: "Sync CloudFormation TypeActivation state from AWS",
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
            "AWS::CloudFormation::TypeActivation",
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
