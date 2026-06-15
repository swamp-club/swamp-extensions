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

// Auto-generated extension model for @swamp/aws/sagemaker/partner-app
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker PartnerApp (AWS::SageMaker::PartnerApp).
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

const TagSchema = z.object({
  Value: z.string().min(1).max(128),
  Key: z.string().min(1).max(128),
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
  Name: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9]+")).describe(
    "A name for the PartnerApp.",
  ),
  Type: z.enum([
    "lakera-guard",
    "comet",
    "deepchecks-llm-evaluation",
    "fiddler",
  ]).describe("The type of PartnerApp."),
  ExecutionRoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe("The execution role for the user."),
  KmsKeyId: z.string().max(2048).regex(new RegExp(".*")).describe(
    "The AWS KMS customer managed key used to encrypt the data associated with the PartnerApp.",
  ).optional(),
  Tier: z.string().min(1).max(64).describe("The tier of the PartnerApp."),
  EnableIamSessionBasedIdentity: z.boolean().describe(
    "Enables IAM Session based Identity for PartnerApp.",
  ).optional(),
  EnableAutoMinorVersionUpgrade: z.boolean().describe(
    "Enables automatic minor version upgrades for the PartnerApp.",
  ).optional(),
  AppVersion: z.string().min(1).max(64).describe(
    "The version of the PartnerApp.",
  ).optional(),
  ApplicationConfig: z.object({
    AdminUsers: z.array(z.string().min(1).max(256)).describe(
      "A list of users with administrator privileges for the PartnerApp.",
    ).optional(),
    Arguments: z.record(
      z.string(),
      z.string().max(1024).regex(new RegExp("^.{0,1024}$")),
    ).describe("A list of arguments to pass to the PartnerApp.").optional(),
  }).describe(
    "A collection of settings that specify the maintenance schedule for the PartnerApp.",
  ).optional(),
  AuthType: z.enum(["IAM"]).describe("The Auth type of PartnerApp."),
  MaintenanceConfig: z.object({
    MaintenanceWindowStart: z.string().max(9).regex(
      new RegExp("(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):([0-5]\\d)"),
    ).describe("The maintenance window start day and time for the PartnerApp."),
  }).describe(
    "A collection of settings that specify the maintenance schedule for the PartnerApp.",
  ).optional(),
  ClientToken: z.string().min(1).max(36).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe("The client token for the PartnerApp.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to apply to the PartnerApp.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Type: z.string().optional(),
  ExecutionRoleArn: z.string().optional(),
  KmsKeyId: z.string().optional(),
  Tier: z.string().optional(),
  EnableIamSessionBasedIdentity: z.boolean().optional(),
  EnableAutoMinorVersionUpgrade: z.boolean().optional(),
  AppVersion: z.string().optional(),
  ApplicationConfig: z.object({
    AdminUsers: z.array(z.string()),
    Arguments: z.record(z.string(), z.unknown()),
  }).optional(),
  AuthType: z.string().optional(),
  BaseUrl: z.string().optional(),
  CurrentVersionEolDate: z.string().optional(),
  MaintenanceConfig: z.object({
    MaintenanceWindowStart: z.string(),
  }).optional(),
  ClientToken: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9]+")).describe(
    "A name for the PartnerApp.",
  ).optional(),
  Type: z.enum([
    "lakera-guard",
    "comet",
    "deepchecks-llm-evaluation",
    "fiddler",
  ]).describe("The type of PartnerApp.").optional(),
  ExecutionRoleArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[a-z\\-]*:iam::\\d{12}:role/?[a-zA-Z_0-9+=,.@\\-_/]+$"),
  ).describe("The execution role for the user.").optional(),
  KmsKeyId: z.string().max(2048).regex(new RegExp(".*")).describe(
    "The AWS KMS customer managed key used to encrypt the data associated with the PartnerApp.",
  ).optional(),
  Tier: z.string().min(1).max(64).describe("The tier of the PartnerApp.")
    .optional(),
  EnableIamSessionBasedIdentity: z.boolean().describe(
    "Enables IAM Session based Identity for PartnerApp.",
  ).optional(),
  EnableAutoMinorVersionUpgrade: z.boolean().describe(
    "Enables automatic minor version upgrades for the PartnerApp.",
  ).optional(),
  AppVersion: z.string().min(1).max(64).describe(
    "The version of the PartnerApp.",
  ).optional(),
  ApplicationConfig: z.object({
    AdminUsers: z.array(z.string().min(1).max(256)).describe(
      "A list of users with administrator privileges for the PartnerApp.",
    ).optional(),
    Arguments: z.record(
      z.string(),
      z.string().max(1024).regex(new RegExp("^.{0,1024}$")),
    ).describe("A list of arguments to pass to the PartnerApp.").optional(),
  }).describe(
    "A collection of settings that specify the maintenance schedule for the PartnerApp.",
  ).optional(),
  AuthType: z.enum(["IAM"]).describe("The Auth type of PartnerApp.").optional(),
  MaintenanceConfig: z.object({
    MaintenanceWindowStart: z.string().max(9).regex(
      new RegExp("(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):([0-5]\\d)"),
    ).describe("The maintenance window start day and time for the PartnerApp.")
      .optional(),
  }).describe(
    "A collection of settings that specify the maintenance schedule for the PartnerApp.",
  ).optional(),
  ClientToken: z.string().min(1).max(36).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe("The client token for the PartnerApp.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of tags to apply to the PartnerApp.",
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

/** Swamp extension model for SageMaker PartnerApp. Registered at `@swamp/aws/sagemaker/partner-app`. */
export const model = {
  type: "@swamp/aws/sagemaker/partner-app",
  version: "2026.06.15.1",
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
      description: "SageMaker PartnerApp resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker PartnerApp",
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
          "AWS::SageMaker::PartnerApp",
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
      description: "Get a SageMaker PartnerApp",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker PartnerApp",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::PartnerApp",
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
      description: "Update a SageMaker PartnerApp",
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
          "AWS::SageMaker::PartnerApp",
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
          "AWS::SageMaker::PartnerApp",
          identifier,
          currentState,
          desiredState,
          ["Name", "Type", "ExecutionRoleArn", "AuthType", "KmsKeyId"],
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
      description: "Delete a SageMaker PartnerApp",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker PartnerApp",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::PartnerApp",
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
      description: "Sync SageMaker PartnerApp state from AWS",
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
            "AWS::SageMaker::PartnerApp",
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
