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

// Auto-generated extension model for @swamp/aws/datazone/environment-blueprint-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataZone EnvironmentBlueprintConfiguration (AWS::DataZone::EnvironmentBlueprintConfiguration).
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

const RegionalParameterSchema = z.object({
  Parameters: z.record(z.string(), z.string()).optional(),
  Region: z.string().regex(
    new RegExp("^[a-z]{2}-?(iso|gov)?-{1}[a-z]*-{1}[0-9]$"),
  ).optional(),
});

const LakeFormationConfigurationSchema = z.object({
  LocationRegistrationExcludeS3Locations: z.array(
    z.string().min(1).max(1024).regex(new RegExp("^s3://.+$")),
  ).optional(),
  LocationRegistrationRole: z.string().regex(
    new RegExp(
      "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
    ),
  ).optional(),
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
  GlobalParameters: z.record(z.string(), z.string()).describe(
    "Region-agnostic environment blueprint parameters.",
  ).optional(),
  EnabledRegions: z.array(
    z.string().min(4).max(16).regex(
      new RegExp("^[a-z]{2}-?(iso|gov)?-{1}[a-z]*-{1}[0-9]$"),
    ),
  ),
  EnvironmentBlueprintIdentifier: z.string().regex(
    new RegExp("^[a-zA-Z0-9_-]{1,36}$"),
  ),
  RegionalParameters: z.array(RegionalParameterSchema).optional(),
  ProvisioningRoleArn: z.string().regex(
    new RegExp(
      "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
    ),
  ).optional(),
  ProvisioningConfigurations: z.array(z.object({
    LakeFormationConfiguration: LakeFormationConfigurationSchema.optional(),
  })).optional(),
  DomainIdentifier: z.string().regex(
    new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"),
  ),
  EnvironmentRolePermissionBoundary: z.string().regex(
    new RegExp("^arn:aws[^:]*:iam::(aws|\\d{12}):policy/[\\w+=,.@-]*$"),
  ).optional(),
  ManageAccessRoleArn: z.string().regex(
    new RegExp(
      "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
    ),
  ).optional(),
});

const StateSchema = z.object({
  GlobalParameters: z.record(z.string(), z.unknown()).optional(),
  CreatedAt: z.string().optional(),
  EnabledRegions: z.array(z.string()).optional(),
  EnvironmentBlueprintIdentifier: z.string().optional(),
  EnvironmentBlueprintId: z.string(),
  UpdatedAt: z.string().optional(),
  RegionalParameters: z.array(RegionalParameterSchema).optional(),
  ProvisioningRoleArn: z.string().optional(),
  DomainId: z.string(),
  ProvisioningConfigurations: z.array(z.object({
    LakeFormationConfiguration: LakeFormationConfigurationSchema,
  })).optional(),
  DomainIdentifier: z.string().optional(),
  EnvironmentRolePermissionBoundary: z.string().optional(),
  ManageAccessRoleArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  GlobalParameters: z.record(z.string(), z.string()).describe(
    "Region-agnostic environment blueprint parameters.",
  ).optional(),
  EnabledRegions: z.array(
    z.string().min(4).max(16).regex(
      new RegExp("^[a-z]{2}-?(iso|gov)?-{1}[a-z]*-{1}[0-9]$"),
    ),
  ).optional(),
  EnvironmentBlueprintIdentifier: z.string().regex(
    new RegExp("^[a-zA-Z0-9_-]{1,36}$"),
  ).optional(),
  RegionalParameters: z.array(RegionalParameterSchema).optional(),
  ProvisioningRoleArn: z.string().regex(
    new RegExp(
      "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
    ),
  ).optional(),
  ProvisioningConfigurations: z.array(z.object({
    LakeFormationConfiguration: LakeFormationConfigurationSchema.optional(),
  })).optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .optional(),
  EnvironmentRolePermissionBoundary: z.string().regex(
    new RegExp("^arn:aws[^:]*:iam::(aws|\\d{12}):policy/[\\w+=,.@-]*$"),
  ).optional(),
  ManageAccessRoleArn: z.string().regex(
    new RegExp(
      "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
    ),
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

/** Swamp extension model for DataZone EnvironmentBlueprintConfiguration. Registered at `@swamp/aws/datazone/environment-blueprint-configuration`. */
export const model = {
  type: "@swamp/aws/datazone/environment-blueprint-configuration",
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
      description: "DataZone EnvironmentBlueprintConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataZone EnvironmentBlueprintConfiguration",
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
          "AWS::DataZone::EnvironmentBlueprintConfiguration",
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
      description: "Get a DataZone EnvironmentBlueprintConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone EnvironmentBlueprintConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DataZone::EnvironmentBlueprintConfiguration",
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
      description: "Update a DataZone EnvironmentBlueprintConfiguration",
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
        const idParts = [
          existing.DomainId?.toString(),
          existing.EnvironmentBlueprintId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::DataZone::EnvironmentBlueprintConfiguration",
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
          "AWS::DataZone::EnvironmentBlueprintConfiguration",
          identifier,
          currentState,
          desiredState,
          ["DomainIdentifier", "EnvironmentBlueprintIdentifier"],
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
      description: "Delete a DataZone EnvironmentBlueprintConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone EnvironmentBlueprintConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DataZone::EnvironmentBlueprintConfiguration",
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
      description:
        "Sync DataZone EnvironmentBlueprintConfiguration state from AWS",
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
        const idParts = [
          existing.DomainId?.toString(),
          existing.EnvironmentBlueprintId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::DataZone::EnvironmentBlueprintConfiguration",
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
