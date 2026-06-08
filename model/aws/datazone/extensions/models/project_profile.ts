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

// Auto-generated extension model for @swamp/aws/datazone/project-profile
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataZone ProjectProfile (AWS::DataZone::ProjectProfile).
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

const EnvironmentConfigurationParameterSchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$")).optional(),
  Value: z.string().optional(),
  IsEditable: z.boolean().optional(),
});

const EnvironmentConfigurationParametersDetailsSchema = z.object({
  SsmPath: z.string().min(1).max(2048).optional(),
  ParameterOverrides: z.array(EnvironmentConfigurationParameterSchema)
    .optional(),
  ResolvedParameters: z.array(EnvironmentConfigurationParameterSchema)
    .optional(),
});

const AwsAccountSchema = z.object({
  AwsAccountId: z.string().regex(new RegExp("^\\d{12}$")),
});

const RegionSchema = z.object({
  RegionName: z.string().min(4).max(16).regex(
    new RegExp("^[a-z]{2}-?(iso|gov)?-{1}[a-z]*-{1}[0-9]$"),
  ),
});

const EnvironmentConfigurationSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\w -]+$")),
  EnvironmentConfigurationId: z.string().regex(
    new RegExp("^[a-zA-Z0-9_-]{1,36}$"),
  ).optional(),
  EnvironmentBlueprintId: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,36}$")),
  Description: z.string().max(2048).optional(),
  DeploymentMode: z.enum(["ON_CREATE", "ON_DEMAND"]).optional(),
  ConfigurationParameters: EnvironmentConfigurationParametersDetailsSchema
    .optional(),
  AwsAccount: AwsAccountSchema.optional(),
  AwsRegion: RegionSchema,
  DeploymentOrder: z.number().min(0).max(16).optional(),
});

const ResourceTagParameterSchema = z.object({
  Key: z.string().min(1).max(128).regex(new RegExp("^[\\w \\.:/=+@-]+$")),
  Value: z.string().min(0).max(256).regex(new RegExp("^[\\w \\.:/=+@-]*$")),
  IsValueEditable: z.boolean(),
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
  Description: z.string().max(2048).optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[_-][a-zA-Z0-9_-]{1,36}$"))
    .optional(),
  DomainUnitIdentifier: z.string().min(1).max(256).regex(
    new RegExp("^[a-z0-9_\\-]+$"),
  ).optional(),
  EnvironmentConfigurations: z.array(EnvironmentConfigurationSchema).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\w -]+$")),
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  UseDefaultConfigurations: z.boolean().optional(),
  ProjectResourceTags: z.array(ResourceTagParameterSchema).optional(),
  AllowCustomProjectResourceTags: z.boolean().optional(),
  ProjectResourceTagsDescription: z.string().max(2048).optional(),
});

const StateSchema = z.object({
  CreatedAt: z.string().optional(),
  CreatedBy: z.string().optional(),
  Description: z.string().optional(),
  DomainId: z.string().optional(),
  DomainIdentifier: z.string(),
  DomainUnitId: z.string().optional(),
  DomainUnitIdentifier: z.string().optional(),
  EnvironmentConfigurations: z.array(EnvironmentConfigurationSchema).optional(),
  Id: z.string().optional(),
  Identifier: z.string(),
  LastUpdatedAt: z.string().optional(),
  Name: z.string().optional(),
  Status: z.string().optional(),
  UseDefaultConfigurations: z.boolean().optional(),
  ProjectResourceTags: z.array(ResourceTagParameterSchema).optional(),
  AllowCustomProjectResourceTags: z.boolean().optional(),
  ProjectResourceTagsDescription: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().max(2048).optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[_-][a-zA-Z0-9_-]{1,36}$"))
    .optional(),
  DomainUnitIdentifier: z.string().min(1).max(256).regex(
    new RegExp("^[a-z0-9_\\-]+$"),
  ).optional(),
  EnvironmentConfigurations: z.array(EnvironmentConfigurationSchema).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[\\w -]+$")).optional(),
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  UseDefaultConfigurations: z.boolean().optional(),
  ProjectResourceTags: z.array(ResourceTagParameterSchema).optional(),
  AllowCustomProjectResourceTags: z.boolean().optional(),
  ProjectResourceTagsDescription: z.string().max(2048).optional(),
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

/** Swamp extension model for DataZone ProjectProfile. Registered at `@swamp/aws/datazone/project-profile`. */
export const model = {
  type: "@swamp/aws/datazone/project-profile",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description:
        "Added: ProjectResourceTags, AllowCustomProjectResourceTags, ProjectResourceTagsDescription",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      toVersion: "2026.04.03.3",
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
      description: "DataZone ProjectProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataZone ProjectProfile",
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
          "AWS::DataZone::ProjectProfile",
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
      description: "Get a DataZone ProjectProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone ProjectProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DataZone::ProjectProfile",
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
      description: "Update a DataZone ProjectProfile",
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
          existing.DomainIdentifier?.toString(),
          existing.Identifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::DataZone::ProjectProfile",
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
          "AWS::DataZone::ProjectProfile",
          identifier,
          currentState,
          desiredState,
          ["DomainIdentifier", "UseDefaultConfigurations"],
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
      description: "Delete a DataZone ProjectProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone ProjectProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DataZone::ProjectProfile",
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
      description: "Sync DataZone ProjectProfile state from AWS",
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
          existing.DomainIdentifier?.toString(),
          existing.Identifier?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::DataZone::ProjectProfile",
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
