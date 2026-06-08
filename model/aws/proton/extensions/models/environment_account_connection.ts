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

// Auto-generated extension model for @swamp/aws/proton/environment-account-connection
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Proton EnvironmentAccountConnection (AWS::Proton::EnvironmentAccountConnection).
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
  Key: z.string().min(1).max(128).describe("The key of the resource tag."),
  Value: z.string().min(0).max(256).describe("The value of the resource tag."),
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
  CodebuildRoleArn: z.string().min(1).max(200).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov):iam::\\d{12}:role/([\\w+=,.@-]{1,512}[/:])*([\\w+=,.@-]{1,64})$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM service role in the environment account. AWS Proton uses this role to provision infrastructure resources using CodeBuild-based provisioning in the associated environment account.",
  ).optional(),
  ComponentRoleArn: z.string().min(1).max(200).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov):iam::\\d{12}:role/([\\w+=,.@-]{1,512}[/:])*([\\w+=,.@-]{1,64})$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM service role that AWS Proton uses when provisioning directly defined components in the associated environment account. It determines the scope of infrastructure that a component can provision in the account.",
  ).optional(),
  EnvironmentAccountId: z.string().regex(new RegExp("^\\d{12}$")).describe(
    "The environment account that's connected to the environment account connection.",
  ).optional(),
  EnvironmentName: z.string().min(1).max(100).regex(
    new RegExp("^[0-9A-Za-z]+[0-9A-Za-z_\\-]*$"),
  ).describe(
    "The name of the AWS Proton environment that's created in the associated management account.",
  ).optional(),
  ManagementAccountId: z.string().regex(new RegExp("^\\d{12}$")).describe(
    "The ID of the management account that accepts or rejects the environment account connection. You create an manage the AWS Proton environment in this account. If the management account accepts the environment account connection, AWS Proton can use the associated IAM role to provision environment infrastructure resources in the associated environment account.",
  ).optional(),
  RoleArn: z.string().min(1).max(200).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov):iam::\\d{12}:role/([\\w+=,.@-]{1,512}[/:])*([\\w+=,.@-]{1,64})$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM service role that's created in the environment account. AWS Proton uses this role to provision infrastructure resources in the associated environment account.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An optional list of metadata items that you can associate with the Proton environment account connection. A tag is a key-value pair. For more information, see Proton resources and tagging in the Proton User Guide.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  CodebuildRoleArn: z.string().optional(),
  ComponentRoleArn: z.string().optional(),
  EnvironmentAccountId: z.string().optional(),
  EnvironmentName: z.string().optional(),
  Id: z.string().optional(),
  ManagementAccountId: z.string().optional(),
  RoleArn: z.string().optional(),
  Status: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CodebuildRoleArn: z.string().min(1).max(200).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov):iam::\\d{12}:role/([\\w+=,.@-]{1,512}[/:])*([\\w+=,.@-]{1,64})$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM service role in the environment account. AWS Proton uses this role to provision infrastructure resources using CodeBuild-based provisioning in the associated environment account.",
  ).optional(),
  ComponentRoleArn: z.string().min(1).max(200).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov):iam::\\d{12}:role/([\\w+=,.@-]{1,512}[/:])*([\\w+=,.@-]{1,64})$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM service role that AWS Proton uses when provisioning directly defined components in the associated environment account. It determines the scope of infrastructure that a component can provision in the account.",
  ).optional(),
  EnvironmentAccountId: z.string().regex(new RegExp("^\\d{12}$")).describe(
    "The environment account that's connected to the environment account connection.",
  ).optional(),
  EnvironmentName: z.string().min(1).max(100).regex(
    new RegExp("^[0-9A-Za-z]+[0-9A-Za-z_\\-]*$"),
  ).describe(
    "The name of the AWS Proton environment that's created in the associated management account.",
  ).optional(),
  ManagementAccountId: z.string().regex(new RegExp("^\\d{12}$")).describe(
    "The ID of the management account that accepts or rejects the environment account connection. You create an manage the AWS Proton environment in this account. If the management account accepts the environment account connection, AWS Proton can use the associated IAM role to provision environment infrastructure resources in the associated environment account.",
  ).optional(),
  RoleArn: z.string().min(1).max(200).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov):iam::\\d{12}:role/([\\w+=,.@-]{1,512}[/:])*([\\w+=,.@-]{1,64})$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the IAM service role that's created in the environment account. AWS Proton uses this role to provision infrastructure resources in the associated environment account.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An optional list of metadata items that you can associate with the Proton environment account connection. A tag is a key-value pair. For more information, see Proton resources and tagging in the Proton User Guide.",
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

/** Swamp extension model for Proton EnvironmentAccountConnection. Registered at `@swamp/aws/proton/environment-account-connection`. */
export const model = {
  type: "@swamp/aws/proton/environment-account-connection",
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
      description: "Proton EnvironmentAccountConnection resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Proton EnvironmentAccountConnection",
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
          "AWS::Proton::EnvironmentAccountConnection",
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
      description: "Get a Proton EnvironmentAccountConnection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Proton EnvironmentAccountConnection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Proton::EnvironmentAccountConnection",
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
      description: "Update a Proton EnvironmentAccountConnection",
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
          "AWS::Proton::EnvironmentAccountConnection",
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
          "AWS::Proton::EnvironmentAccountConnection",
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
      description: "Delete a Proton EnvironmentAccountConnection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Proton EnvironmentAccountConnection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Proton::EnvironmentAccountConnection",
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
      description: "Sync Proton EnvironmentAccountConnection state from AWS",
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
            "AWS::Proton::EnvironmentAccountConnection",
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
