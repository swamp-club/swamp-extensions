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

// Auto-generated extension model for @swamp/aws/amplify/app
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Amplify App (AWS::Amplify::App).
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

const BasicAuthConfigSchema = z.object({
  EnableBasicAuth: z.boolean().optional(),
  Username: z.string().min(1).max(255).optional(),
  Password: z.string().min(1).max(255).optional(),
});

const EnvironmentVariableSchema = z.object({
  Name: z.string().max(255).regex(new RegExp(".*", "s")),
  Value: z.string().max(5500).regex(new RegExp(".*", "s")),
});

const CustomRuleSchema = z.object({
  Condition: z.string().min(0).max(2048).regex(new RegExp(".*", "s"))
    .optional(),
  Status: z.string().min(3).max(7).regex(new RegExp(".{3,7}")).optional(),
  Target: z.string().min(1).max(2048).regex(new RegExp(".+", "s")),
  Source: z.string().min(1).max(2048).regex(new RegExp(".+", "s")),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(0).max(256),
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
  AccessToken: z.string().min(1).max(255).optional(),
  AutoBranchCreationConfig: z.object({
    AutoBranchCreationPatterns: z.array(z.string().min(1).max(2048)).optional(),
    BasicAuthConfig: BasicAuthConfigSchema.optional(),
    BuildSpec: z.string().min(1).max(25000).optional(),
    EnableAutoBranchCreation: z.boolean().optional(),
    EnableAutoBuild: z.boolean().optional(),
    EnablePerformanceMode: z.boolean().optional(),
    EnablePullRequestPreview: z.boolean().optional(),
    EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
    Framework: z.string().max(255).regex(new RegExp(".*", "s")).optional(),
    PullRequestEnvironmentName: z.string().max(20).regex(new RegExp(".*", "s"))
      .optional(),
    Stage: z.enum([
      "EXPERIMENTAL",
      "BETA",
      "PULL_REQUEST",
      "PRODUCTION",
      "DEVELOPMENT",
    ]).optional(),
  }).optional(),
  BasicAuthConfig: z.object({
    EnableBasicAuth: z.boolean().optional(),
    Username: z.string().min(1).max(255).optional(),
    Password: z.string().min(1).max(255).optional(),
  }).optional(),
  BuildSpec: z.string().min(1).max(25000).regex(new RegExp(".+", "s"))
    .optional(),
  CacheConfig: z.object({
    Type: z.enum(["AMPLIFY_MANAGED", "AMPLIFY_MANAGED_NO_COOKIES"]).optional(),
  }).optional(),
  ComputeRoleArn: z.string().min(0).max(1000).regex(new RegExp(".*", "s"))
    .optional(),
  CustomHeaders: z.string().min(0).max(25000).regex(new RegExp(".*", "s"))
    .optional(),
  CustomRules: z.array(CustomRuleSchema).optional(),
  Description: z.string().max(1000).regex(new RegExp(".*", "s")).optional(),
  EnableBranchAutoDeletion: z.boolean().optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
  IAMServiceRole: z.string().min(1).max(1000).regex(new RegExp(".*", "s"))
    .optional(),
  Name: z.string().min(1).max(255).regex(new RegExp(".+", "s")),
  OauthToken: z.string().max(1000).regex(new RegExp(".*", "s")).optional(),
  Platform: z.enum(["WEB", "WEB_DYNAMIC", "WEB_COMPUTE"]).optional(),
  Repository: z.string().regex(new RegExp(".*", "s")).optional(),
  Tags: z.array(TagSchema).optional(),
  JobConfig: z.object({
    BuildComputeType: z.enum(["STANDARD_8GB", "LARGE_16GB", "XLARGE_72GB"]),
  }).optional(),
});

const StateSchema = z.object({
  AccessToken: z.string().optional(),
  AppId: z.string().optional(),
  AppName: z.string().optional(),
  Arn: z.string(),
  AutoBranchCreationConfig: z.object({
    AutoBranchCreationPatterns: z.array(z.string()),
    BasicAuthConfig: BasicAuthConfigSchema,
    BuildSpec: z.string(),
    EnableAutoBranchCreation: z.boolean(),
    EnableAutoBuild: z.boolean(),
    EnablePerformanceMode: z.boolean(),
    EnablePullRequestPreview: z.boolean(),
    EnvironmentVariables: z.array(EnvironmentVariableSchema),
    Framework: z.string(),
    PullRequestEnvironmentName: z.string(),
    Stage: z.string(),
  }).optional(),
  BasicAuthConfig: BasicAuthConfigSchema.optional(),
  BuildSpec: z.string().optional(),
  CacheConfig: z.object({
    Type: z.string(),
  }).optional(),
  ComputeRoleArn: z.string().optional(),
  CustomHeaders: z.string().optional(),
  CustomRules: z.array(CustomRuleSchema).optional(),
  DefaultDomain: z.string().optional(),
  Description: z.string().optional(),
  EnableBranchAutoDeletion: z.boolean().optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
  IAMServiceRole: z.string().optional(),
  Name: z.string().optional(),
  OauthToken: z.string().optional(),
  Platform: z.string().optional(),
  Repository: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  JobConfig: z.object({
    BuildComputeType: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AccessToken: z.string().min(1).max(255).optional(),
  AutoBranchCreationConfig: z.object({
    AutoBranchCreationPatterns: z.array(z.string().min(1).max(2048)).optional(),
    BasicAuthConfig: BasicAuthConfigSchema.optional(),
    BuildSpec: z.string().min(1).max(25000).optional(),
    EnableAutoBranchCreation: z.boolean().optional(),
    EnableAutoBuild: z.boolean().optional(),
    EnablePerformanceMode: z.boolean().optional(),
    EnablePullRequestPreview: z.boolean().optional(),
    EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
    Framework: z.string().max(255).regex(new RegExp(".*", "s")).optional(),
    PullRequestEnvironmentName: z.string().max(20).regex(new RegExp(".*", "s"))
      .optional(),
    Stage: z.enum([
      "EXPERIMENTAL",
      "BETA",
      "PULL_REQUEST",
      "PRODUCTION",
      "DEVELOPMENT",
    ]).optional(),
  }).optional(),
  BasicAuthConfig: z.object({
    EnableBasicAuth: z.boolean().optional(),
    Username: z.string().min(1).max(255).optional(),
    Password: z.string().min(1).max(255).optional(),
  }).optional(),
  BuildSpec: z.string().min(1).max(25000).regex(new RegExp(".+", "s"))
    .optional(),
  CacheConfig: z.object({
    Type: z.enum(["AMPLIFY_MANAGED", "AMPLIFY_MANAGED_NO_COOKIES"]).optional(),
  }).optional(),
  ComputeRoleArn: z.string().min(0).max(1000).regex(new RegExp(".*", "s"))
    .optional(),
  CustomHeaders: z.string().min(0).max(25000).regex(new RegExp(".*", "s"))
    .optional(),
  CustomRules: z.array(CustomRuleSchema).optional(),
  Description: z.string().max(1000).regex(new RegExp(".*", "s")).optional(),
  EnableBranchAutoDeletion: z.boolean().optional(),
  EnvironmentVariables: z.array(EnvironmentVariableSchema).optional(),
  IAMServiceRole: z.string().min(1).max(1000).regex(new RegExp(".*", "s"))
    .optional(),
  Name: z.string().min(1).max(255).regex(new RegExp(".+", "s")).optional(),
  OauthToken: z.string().max(1000).regex(new RegExp(".*", "s")).optional(),
  Platform: z.enum(["WEB", "WEB_DYNAMIC", "WEB_COMPUTE"]).optional(),
  Repository: z.string().regex(new RegExp(".*", "s")).optional(),
  Tags: z.array(TagSchema).optional(),
  JobConfig: z.object({
    BuildComputeType: z.enum(["STANDARD_8GB", "LARGE_16GB", "XLARGE_72GB"])
      .optional(),
  }).optional(),
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

/** Swamp extension model for Amplify App. Registered at `@swamp/aws/amplify/app`. */
export const model = {
  type: "@swamp/aws/amplify/app",
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
      description: "Amplify App resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Amplify App",
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
          "AWS::Amplify::App",
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
      description: "Get a Amplify App",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Amplify App",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Amplify::App",
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
      description: "Update a Amplify App",
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
          "AWS::Amplify::App",
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
          "AWS::Amplify::App",
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
      description: "Delete a Amplify App",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Amplify App",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Amplify::App",
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
      description: "Sync Amplify App state from AWS",
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
            "AWS::Amplify::App",
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
