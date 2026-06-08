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

// Auto-generated extension model for @swamp/aws/rds/option-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RDS OptionGroup (AWS::RDS::OptionGroup).
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

const OptionSettingSchema = z.object({
  Name: z.string().describe(
    "The name of the option that has settings that you can set.",
  ).optional(),
  Value: z.string().describe("The current value of the option setting.")
    .optional(),
});

const OptionConfigurationSchema = z.object({
  DBSecurityGroupMemberships: z.array(z.string()).describe(
    "A list of DB security groups used for this option.",
  ).optional(),
  OptionName: z.string().describe(
    "The configuration of options to include in a group.",
  ),
  OptionSettings: z.array(OptionSettingSchema).describe(
    "The option settings to include in an option group.",
  ).optional(),
  OptionVersion: z.string().describe("The version for the option.").optional(),
  Port: z.number().int().describe("The optional port for the option.")
    .optional(),
  VpcSecurityGroupMemberships: z.array(z.string()).describe(
    "A list of VPC security group names used for this option.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A key is the required name of the tag. The string value can be from 1 to 128 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ),
  Value: z.string().min(0).max(256).describe(
    "A value is the optional value of the tag. The string value can be from 1 to 256 Unicode characters in length and can't be prefixed with aws: or rds:. The string can only contain only the set of Unicode letters, digits, white-space, '_', '.', ':', '/', '=', '+', '-', '@' (Java regex: \"^([\\\\p{L}\\\\p{Z}\\\\p{N}_.:/=+\\\\-@]*)$\").",
  ).optional(),
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
  OptionGroupName: z.string().describe(
    "The name of the option group to be created. Constraints: Must be 1 to 255 letters, numbers, or hyphens First character must be a letter Can't end with a hyphen or contain two consecutive hyphens Example: myoptiongroup If you don't specify a value for OptionGroupName property, a name is automatically created for the option group. This value is stored as a lowercase string.",
  ).optional(),
  OptionGroupDescription: z.string().describe(
    "The description of the option group.",
  ),
  EngineName: z.string().describe(
    "Specifies the name of the engine that this option group should be associated with. Valid Values: mariadb mysql oracle-ee oracle-ee-cdb oracle-se2 oracle-se2-cdb postgres sqlserver-ee sqlserver-se sqlserver-ex sqlserver-web",
  ),
  MajorEngineVersion: z.string().describe(
    "Specifies the major version of the engine that this option group should be associated with.",
  ),
  OptionConfigurations: z.array(OptionConfigurationSchema).describe(
    "A list of all available options for an option group.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the option group.")
    .optional(),
});

const StateSchema = z.object({
  OptionGroupName: z.string(),
  OptionGroupDescription: z.string().optional(),
  EngineName: z.string().optional(),
  MajorEngineVersion: z.string().optional(),
  OptionConfigurations: z.array(OptionConfigurationSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  OptionGroupName: z.string().describe(
    "The name of the option group to be created. Constraints: Must be 1 to 255 letters, numbers, or hyphens First character must be a letter Can't end with a hyphen or contain two consecutive hyphens Example: myoptiongroup If you don't specify a value for OptionGroupName property, a name is automatically created for the option group. This value is stored as a lowercase string.",
  ).optional(),
  OptionGroupDescription: z.string().describe(
    "The description of the option group.",
  ).optional(),
  EngineName: z.string().describe(
    "Specifies the name of the engine that this option group should be associated with. Valid Values: mariadb mysql oracle-ee oracle-ee-cdb oracle-se2 oracle-se2-cdb postgres sqlserver-ee sqlserver-se sqlserver-ex sqlserver-web",
  ).optional(),
  MajorEngineVersion: z.string().describe(
    "Specifies the major version of the engine that this option group should be associated with.",
  ).optional(),
  OptionConfigurations: z.array(OptionConfigurationSchema).describe(
    "A list of all available options for an option group.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the option group.")
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

/** Swamp extension model for RDS OptionGroup. Registered at `@swamp/aws/rds/option-group`. */
export const model = {
  type: "@swamp/aws/rds/option-group",
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
      description: "RDS OptionGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RDS OptionGroup",
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
          "AWS::RDS::OptionGroup",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.OptionGroupName ?? g.OptionGroupName)?.toString() ??
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
      description: "Get a RDS OptionGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS OptionGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::RDS::OptionGroup",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.OptionGroupName ?? context.globalArgs.OptionGroupName)
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
      description: "Update a RDS OptionGroup",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.OptionGroupName?.toString() ?? "current")
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
        const identifier = existing.OptionGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RDS::OptionGroup",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RDS::OptionGroup",
          identifier,
          currentState,
          desiredState,
          [
            "EngineName",
            "MajorEngineVersion",
            "OptionGroupDescription",
            "OptionGroupName",
          ],
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
      description: "Delete a RDS OptionGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RDS OptionGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RDS::OptionGroup",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.OptionGroupName?.toString() ?? args.identifier)
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
      description: "Sync RDS OptionGroup state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.OptionGroupName?.toString() ?? "current")
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
        const identifier = existing.OptionGroupName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RDS::OptionGroup",
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
