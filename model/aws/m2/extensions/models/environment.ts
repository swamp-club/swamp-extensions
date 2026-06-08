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

// Auto-generated extension model for @swamp/aws/m2/environment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for M2 Environment (AWS::M2::Environment).
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
  Description: z.string().min(0).max(500).describe(
    "The description of the environment.",
  ).optional(),
  EngineType: z.enum(["microfocus", "bluage"]).describe(
    "The target platform for the environment.",
  ),
  EngineVersion: z.string().regex(new RegExp("^\\S{1,10}$")).describe(
    "The version of the runtime engine for the environment.",
  ).optional(),
  HighAvailabilityConfig: z.object({
    DesiredCapacity: z.number().int().min(1).max(100),
  }).describe("Defines the details of a high availability configuration.")
    .optional(),
  InstanceType: z.string().regex(new RegExp("^\\S{1,20}$")).describe(
    "The type of instance underlying the environment.",
  ),
  KmsKeyId: z.string().max(2048).describe(
    "The ID or the Amazon Resource Name (ARN) of the customer managed KMS Key used for encrypting environment-related resources.",
  ).optional(),
  Name: z.string().regex(new RegExp("^[A-Za-z0-9][A-Za-z0-9_\\-]{1,59}$"))
    .describe("The name of the environment."),
  NetworkType: z.enum(["ipv4", "dual"]).optional(),
  PreferredMaintenanceWindow: z.string().regex(new RegExp("^\\S{1,50}$"))
    .describe(
      "Configures a desired maintenance window for the environment. If you do not provide a value, a random system-generated value will be assigned.",
    ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Specifies whether the environment is publicly accessible.",
  ).optional(),
  SecurityGroupIds: z.array(z.string().regex(new RegExp("^\\S{1,50}$")))
    .describe(
      "The list of security groups for the VPC associated with this environment.",
    ).optional(),
  StorageConfigurations: z.array(z.record(z.string(), z.unknown())).describe(
    "The storage configurations defined for the runtime environment.",
  ).optional(),
  SubnetIds: z.array(z.string().regex(new RegExp("^\\S{1,50}$"))).describe(
    "The unique identifiers of the subnets assigned to this runtime environment.",
  ).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "Tags associated to this environment.",
  ).optional(),
});

const StateSchema = z.object({
  Description: z.string().optional(),
  EngineType: z.string().optional(),
  EngineVersion: z.string().optional(),
  EnvironmentArn: z.string(),
  EnvironmentId: z.string().optional(),
  HighAvailabilityConfig: z.object({
    DesiredCapacity: z.number(),
  }).optional(),
  InstanceType: z.string().optional(),
  KmsKeyId: z.string().optional(),
  Name: z.string().optional(),
  NetworkType: z.string().optional(),
  PreferredMaintenanceWindow: z.string().optional(),
  PubliclyAccessible: z.boolean().optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  StorageConfigurations: z.array(z.record(z.string(), z.unknown())).optional(),
  SubnetIds: z.array(z.string()).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().min(0).max(500).describe(
    "The description of the environment.",
  ).optional(),
  EngineType: z.enum(["microfocus", "bluage"]).describe(
    "The target platform for the environment.",
  ).optional(),
  EngineVersion: z.string().regex(new RegExp("^\\S{1,10}$")).describe(
    "The version of the runtime engine for the environment.",
  ).optional(),
  HighAvailabilityConfig: z.object({
    DesiredCapacity: z.number().int().min(1).max(100).optional(),
  }).describe("Defines the details of a high availability configuration.")
    .optional(),
  InstanceType: z.string().regex(new RegExp("^\\S{1,20}$")).describe(
    "The type of instance underlying the environment.",
  ).optional(),
  KmsKeyId: z.string().max(2048).describe(
    "The ID or the Amazon Resource Name (ARN) of the customer managed KMS Key used for encrypting environment-related resources.",
  ).optional(),
  Name: z.string().regex(new RegExp("^[A-Za-z0-9][A-Za-z0-9_\\-]{1,59}$"))
    .describe("The name of the environment.").optional(),
  NetworkType: z.enum(["ipv4", "dual"]).optional(),
  PreferredMaintenanceWindow: z.string().regex(new RegExp("^\\S{1,50}$"))
    .describe(
      "Configures a desired maintenance window for the environment. If you do not provide a value, a random system-generated value will be assigned.",
    ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Specifies whether the environment is publicly accessible.",
  ).optional(),
  SecurityGroupIds: z.array(z.string().regex(new RegExp("^\\S{1,50}$")))
    .describe(
      "The list of security groups for the VPC associated with this environment.",
    ).optional(),
  StorageConfigurations: z.array(z.record(z.string(), z.unknown())).describe(
    "The storage configurations defined for the runtime environment.",
  ).optional(),
  SubnetIds: z.array(z.string().regex(new RegExp("^\\S{1,50}$"))).describe(
    "The unique identifiers of the subnets assigned to this runtime environment.",
  ).optional(),
  Tags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "Tags associated to this environment.",
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

/** Swamp extension model for M2 Environment. Registered at `@swamp/aws/m2/environment`. */
export const model = {
  type: "@swamp/aws/m2/environment",
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
      description: "M2 Environment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a M2 Environment",
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
          "AWS::M2::Environment",
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
      description: "Get a M2 Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the M2 Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::M2::Environment",
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
      description: "Update a M2 Environment",
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
        const identifier = existing.EnvironmentArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::M2::Environment",
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
          "AWS::M2::Environment",
          identifier,
          currentState,
          desiredState,
          [
            "Description",
            "EngineType",
            "KmsKeyId",
            "Name",
            "NetworkType",
            "PubliclyAccessible",
            "SecurityGroupIds",
            "StorageConfigurations",
            "SubnetIds",
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
      description: "Delete a M2 Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the M2 Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::M2::Environment",
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
      description: "Sync M2 Environment state from AWS",
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
        const identifier = existing.EnvironmentArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::M2::Environment",
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
