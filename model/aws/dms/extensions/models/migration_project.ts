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

// Auto-generated extension model for @swamp/aws/dms/migration-project
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DMS MigrationProject (AWS::DMS::MigrationProject).
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

const DataProviderDescriptorSchema = z.object({
  DataProviderIdentifier: z.string().optional(),
  DataProviderName: z.string().optional(),
  DataProviderArn: z.string().optional(),
  SecretsManagerSecretId: z.string().optional(),
  SecretsManagerAccessRoleArn: z.string().optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =,, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =,, and -.",
  ),
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
  MigrationProjectName: z.string().min(1).max(255).describe(
    "The property describes a name to identify the migration project.",
  ).optional(),
  MigrationProjectIdentifier: z.string().min(1).max(255).describe(
    "The property describes an identifier for the migration project. It is used for describing/deleting/modifying can be name/arn",
  ).optional(),
  MigrationProjectCreationTime: z.string().min(1).max(40).describe(
    "The property describes a creating time of the migration project.",
  ).optional(),
  InstanceProfileIdentifier: z.string().min(1).max(255).describe(
    "The property describes an instance profile identifier for the migration project. For create",
  ).optional(),
  InstanceProfileName: z.string().min(1).max(255).describe(
    "The property describes an instance profile name for the migration project. For read",
  ).optional(),
  InstanceProfileArn: z.string().min(1).max(255).describe(
    "The property describes an instance profile arn for the migration project. For read",
  ).optional(),
  TransformationRules: z.string().describe(
    "The property describes transformation rules for the migration project.",
  ).optional(),
  Description: z.string().min(1).max(255).describe(
    "The optional description of the migration project.",
  ).optional(),
  SchemaConversionApplicationAttributes: z.object({
    S3BucketPath: z.string().optional(),
    S3BucketRoleArn: z.string().optional(),
  }).describe(
    "The property describes schema conversion application attributes for the migration project.",
  ).optional(),
  SourceDataProviderDescriptors: z.array(DataProviderDescriptorSchema).describe(
    "The property describes source data provider descriptors for the migration project.",
  ).optional(),
  TargetDataProviderDescriptors: z.array(DataProviderDescriptorSchema).describe(
    "The property describes target data provider descriptors for the migration project.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  MigrationProjectName: z.string().optional(),
  MigrationProjectIdentifier: z.string().optional(),
  MigrationProjectArn: z.string(),
  MigrationProjectCreationTime: z.string().optional(),
  InstanceProfileIdentifier: z.string().optional(),
  InstanceProfileName: z.string().optional(),
  InstanceProfileArn: z.string().optional(),
  TransformationRules: z.string().optional(),
  Description: z.string().optional(),
  SchemaConversionApplicationAttributes: z.object({
    S3BucketPath: z.string(),
    S3BucketRoleArn: z.string(),
  }).optional(),
  SourceDataProviderDescriptors: z.array(DataProviderDescriptorSchema)
    .optional(),
  TargetDataProviderDescriptors: z.array(DataProviderDescriptorSchema)
    .optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  MigrationProjectName: z.string().min(1).max(255).describe(
    "The property describes a name to identify the migration project.",
  ).optional(),
  MigrationProjectIdentifier: z.string().min(1).max(255).describe(
    "The property describes an identifier for the migration project. It is used for describing/deleting/modifying can be name/arn",
  ).optional(),
  MigrationProjectCreationTime: z.string().min(1).max(40).describe(
    "The property describes a creating time of the migration project.",
  ).optional(),
  InstanceProfileIdentifier: z.string().min(1).max(255).describe(
    "The property describes an instance profile identifier for the migration project. For create",
  ).optional(),
  InstanceProfileName: z.string().min(1).max(255).describe(
    "The property describes an instance profile name for the migration project. For read",
  ).optional(),
  InstanceProfileArn: z.string().min(1).max(255).describe(
    "The property describes an instance profile arn for the migration project. For read",
  ).optional(),
  TransformationRules: z.string().describe(
    "The property describes transformation rules for the migration project.",
  ).optional(),
  Description: z.string().min(1).max(255).describe(
    "The optional description of the migration project.",
  ).optional(),
  SchemaConversionApplicationAttributes: z.object({
    S3BucketPath: z.string().optional(),
    S3BucketRoleArn: z.string().optional(),
  }).describe(
    "The property describes schema conversion application attributes for the migration project.",
  ).optional(),
  SourceDataProviderDescriptors: z.array(DataProviderDescriptorSchema).describe(
    "The property describes source data provider descriptors for the migration project.",
  ).optional(),
  TargetDataProviderDescriptors: z.array(DataProviderDescriptorSchema).describe(
    "The property describes target data provider descriptors for the migration project.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for DMS MigrationProject. Registered at `@swamp/aws/dms/migration-project`. */
export const model = {
  type: "@swamp/aws/dms/migration-project",
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
      description: "DMS MigrationProject resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DMS MigrationProject",
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
          "AWS::DMS::MigrationProject",
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
      description: "Get a DMS MigrationProject",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DMS MigrationProject",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DMS::MigrationProject",
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
      description: "Update a DMS MigrationProject",
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
        const identifier = existing.MigrationProjectArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DMS::MigrationProject",
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
          "AWS::DMS::MigrationProject",
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
      description: "Delete a DMS MigrationProject",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DMS MigrationProject",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DMS::MigrationProject",
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
      description: "Sync DMS MigrationProject state from AWS",
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
        const identifier = existing.MigrationProjectArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DMS::MigrationProject",
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
