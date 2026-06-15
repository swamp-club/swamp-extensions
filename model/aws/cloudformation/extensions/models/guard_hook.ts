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

// Auto-generated extension model for @swamp/aws/cloudformation/guard-hook
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudFormation GuardHook (AWS::CloudFormation::GuardHook).
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
  RuleLocation: z.object({
    Uri: z.string().describe("S3 uri of Guard files."),
    VersionId: z.string().describe("S3 object version").optional(),
  }).describe("S3 Source Location for the Guard files."),
  LogBucket: z.string().describe(
    "S3 Bucket where the guard validate report will be uploaded to",
  ).optional(),
  HookStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "Attribute to specify which stacks this hook applies to or should get invoked for",
  ),
  TargetOperations: z.array(
    z.enum(["RESOURCE", "STACK", "CHANGE_SET", "CLOUD_CONTROL"]),
  ).describe(
    "Which operations should this Hook run against? Resource changes, stacks or change sets.",
  ),
  FailureMode: z.enum(["FAIL", "WARN"]).describe(
    "Attribute to specify CloudFormation behavior on hook failure.",
  ),
  TargetFilters: z.record(z.string(), z.unknown()).describe(
    "Attribute to specify which targets should invoke the hook",
  ).optional(),
  StackFilters: z.object({
    FilteringCriteria: z.enum(["ALL", "ANY"]).describe(
      "Attribute to specify the filtering behavior. ANY will make the Hook pass if one filter matches. ALL will make the Hook pass if all filters match",
    ),
    StackNames: z.object({
      Include: z.array(
        z.string().max(128).regex(new RegExp("^[a-zA-Z*?][-a-zA-Z0-9*?]*$")),
      ).describe("List of stack names that the hook is going to target")
        .optional(),
      Exclude: z.array(
        z.string().max(128).regex(new RegExp("^[a-zA-Z*?][-a-zA-Z0-9*?]*$")),
      ).describe(
        "List of stack names that the hook is going to be excluded from",
      ).optional(),
    }).describe("List of stack names as filters").optional(),
    StackRoles: z.object({
      Include: z.array(z.string().max(256)).describe(
        "List of stack roles that the hook is going to target",
      ).optional(),
      Exclude: z.array(z.string().max(256)).describe(
        "List of stack roles that the hook is going to be excluded from",
      ).optional(),
    }).describe("List of stack roles that are performing the stack operations.")
      .optional(),
  }).describe("Filters to allow hooks to target specific stack attributes")
    .optional(),
  Alias: z.string().regex(
    new RegExp(
      "^(?!aws)[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
      "i",
    ),
  ).describe("The typename alias for the hook."),
  ExecutionRole: z.string().max(256).regex(
    new RegExp("arn:.+:iam::[0-9]{12}:role/.+"),
  ).describe(
    "The execution role ARN assumed by hooks to read Guard rules from S3 and write Guard outputs to S3.",
  ),
});

const StateSchema = z.object({
  RuleLocation: z.object({
    Uri: z.string(),
    VersionId: z.string(),
  }).optional(),
  LogBucket: z.string().optional(),
  HookStatus: z.string().optional(),
  TargetOperations: z.array(z.string()).optional(),
  FailureMode: z.string().optional(),
  TargetFilters: z.record(z.string(), z.unknown()).optional(),
  StackFilters: z.object({
    FilteringCriteria: z.string(),
    StackNames: z.object({
      Include: z.array(z.string()),
      Exclude: z.array(z.string()),
    }),
    StackRoles: z.object({
      Include: z.array(z.string()),
      Exclude: z.array(z.string()),
    }),
  }).optional(),
  Alias: z.string().optional(),
  HookArn: z.string(),
  ExecutionRole: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  RuleLocation: z.object({
    Uri: z.string().describe("S3 uri of Guard files.").optional(),
    VersionId: z.string().describe("S3 object version").optional(),
  }).describe("S3 Source Location for the Guard files.").optional(),
  LogBucket: z.string().describe(
    "S3 Bucket where the guard validate report will be uploaded to",
  ).optional(),
  HookStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "Attribute to specify which stacks this hook applies to or should get invoked for",
  ).optional(),
  TargetOperations: z.array(
    z.enum(["RESOURCE", "STACK", "CHANGE_SET", "CLOUD_CONTROL"]),
  ).describe(
    "Which operations should this Hook run against? Resource changes, stacks or change sets.",
  ).optional(),
  FailureMode: z.enum(["FAIL", "WARN"]).describe(
    "Attribute to specify CloudFormation behavior on hook failure.",
  ).optional(),
  TargetFilters: z.record(z.string(), z.unknown()).describe(
    "Attribute to specify which targets should invoke the hook",
  ).optional(),
  StackFilters: z.object({
    FilteringCriteria: z.enum(["ALL", "ANY"]).describe(
      "Attribute to specify the filtering behavior. ANY will make the Hook pass if one filter matches. ALL will make the Hook pass if all filters match",
    ).optional(),
    StackNames: z.object({
      Include: z.array(
        z.string().max(128).regex(new RegExp("^[a-zA-Z*?][-a-zA-Z0-9*?]*$")),
      ).describe("List of stack names that the hook is going to target")
        .optional(),
      Exclude: z.array(
        z.string().max(128).regex(new RegExp("^[a-zA-Z*?][-a-zA-Z0-9*?]*$")),
      ).describe(
        "List of stack names that the hook is going to be excluded from",
      ).optional(),
    }).describe("List of stack names as filters").optional(),
    StackRoles: z.object({
      Include: z.array(z.string().max(256)).describe(
        "List of stack roles that the hook is going to target",
      ).optional(),
      Exclude: z.array(z.string().max(256)).describe(
        "List of stack roles that the hook is going to be excluded from",
      ).optional(),
    }).describe("List of stack roles that are performing the stack operations.")
      .optional(),
  }).describe("Filters to allow hooks to target specific stack attributes")
    .optional(),
  Alias: z.string().regex(
    new RegExp(
      "^(?!aws)[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}::[A-Za-z0-9]{2,64}$",
      "i",
    ),
  ).describe("The typename alias for the hook.").optional(),
  ExecutionRole: z.string().max(256).regex(
    new RegExp("arn:.+:iam::[0-9]{12}:role/.+"),
  ).describe(
    "The execution role ARN assumed by hooks to read Guard rules from S3 and write Guard outputs to S3.",
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

/** Swamp extension model for CloudFormation GuardHook. Registered at `@swamp/aws/cloudformation/guard-hook`. */
export const model = {
  type: "@swamp/aws/cloudformation/guard-hook",
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
      description: "CloudFormation GuardHook resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudFormation GuardHook",
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
          "AWS::CloudFormation::GuardHook",
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
      description: "Get a CloudFormation GuardHook",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation GuardHook",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudFormation::GuardHook",
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
      description: "Update a CloudFormation GuardHook",
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
        const identifier = existing.HookArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudFormation::GuardHook",
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
          "AWS::CloudFormation::GuardHook",
          identifier,
          currentState,
          desiredState,
          ["ExecutionRole", "Alias"],
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
      description: "Delete a CloudFormation GuardHook",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudFormation GuardHook",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudFormation::GuardHook",
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
      description: "Sync CloudFormation GuardHook state from AWS",
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
        const identifier = existing.HookArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudFormation::GuardHook",
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
