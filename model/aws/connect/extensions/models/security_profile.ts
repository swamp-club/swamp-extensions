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

// Auto-generated extension model for @swamp/aws/connect/security-profile
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for Connect SecurityProfile (AWS::Connect::SecurityProfile).
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
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const ApplicationSchema = z.object({
  ApplicationPermissions: z.array(z.string().min(1).max(128)).describe(
    "The permissions that the agent is granted on the application",
  ),
  Namespace: z.string().min(1).max(128).describe(
    "Namespace of the application that you want to give access to.",
  ),
  Type: z.enum(["MCP", "THIRD_PARTY_APPLICATION"]).describe(
    "The type of the application.",
  ).optional(),
});

const FlowModuleSchema = z.object({
  Type: z.string().min(1).max(128).describe(
    "The type of the first-party application",
  ),
  FlowModuleId: z.string().min(1).max(128).describe(
    "The identifier of the application that you want to give access to.",
  ),
});

const PrimaryAttributeValueSchema = z.object({
  AccessType: z.enum(["ALLOW"]).describe(
    'Specifies the type of access granted. Currently, only "ALLOW" is supported',
  ),
  AttributeName: z.string().min(1).max(127).regex(
    new RegExp("^(?!aws:|connect:)[\\p{L}\\p{Z}\\p{N}\\-_.:=@'|]+$", "u"),
  ).describe("The name of the primary attribute."),
  Values: z.array(
    z.string().min(1).max(1000).regex(
      new RegExp("^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u00A1-\\u00FF]+$"),
    ),
  ).describe(
    "An array of allowed primary values for the specified primary attribute.",
  ),
});

const PrimaryAttributeAccessControlConfigurationItemSchema = z.object({
  PrimaryAttributeValues: z.array(PrimaryAttributeValueSchema).describe(
    "An array of PrimaryAttributeValue objects.",
  ),
});

const DataTableAccessControlConfigurationSchema = z.object({
  PrimaryAttributeAccessControlConfiguration:
    PrimaryAttributeAccessControlConfigurationItemSchema.describe(
      "Contains the configuration for record-based access control.",
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
  AllowedAccessControlTags: z.array(TagSchema).describe(
    "The list of tags that a security profile uses to restrict access to resources in Amazon Connect.",
  ).optional(),
  Description: z.string().min(0).max(250).describe(
    "The description of the security profile.",
  ).optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance."),
  Permissions: z.array(z.string().min(1).max(128)).describe(
    "Permissions assigned to the security profile.",
  ).optional(),
  SecurityProfileName: z.string().min(1).max(127).regex(
    new RegExp("^[ a-zA-Z0-9_@-]+$"),
  ).describe("The name of the security profile."),
  TagRestrictedResources: z.array(z.string().min(1).max(128)).describe(
    "The list of resources that a security profile applies tag restrictions to in Amazon Connect.",
  ).optional(),
  HierarchyRestrictedResources: z.array(z.string().min(1).max(128)).describe(
    "The list of resources that a security profile applies hierarchy restrictions to in Amazon Connect.",
  ).optional(),
  AllowedAccessControlHierarchyGroupId: z.string().min(0).max(127).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ).describe(
    "The identifier of the hierarchy group that a security profile uses to restrict access to resources in Amazon Connect.",
  ).optional(),
  Applications: z.array(ApplicationSchema).describe(
    "A list of third-party applications that the security profile will give access to.",
  ).optional(),
  AllowedFlowModules: z.array(FlowModuleSchema).describe(
    "The list of flow-module resources to be linked to a security profile in Amazon Connect.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags used to organize, track, or control access for this resource.",
  ).optional(),
  GranularAccessControlConfiguration: z.object({
    DataTableAccessControlConfiguration:
      DataTableAccessControlConfigurationSchema.describe(
        "Defines the access control configuration for data tables.",
      ).optional(),
  }).optional(),
});

const StateSchema = z.object({
  AllowedAccessControlTags: z.array(TagSchema).optional(),
  Description: z.string().optional(),
  InstanceArn: z.string().optional(),
  Permissions: z.array(z.string()).optional(),
  SecurityProfileArn: z.string(),
  SecurityProfileName: z.string().optional(),
  TagRestrictedResources: z.array(z.string()).optional(),
  HierarchyRestrictedResources: z.array(z.string()).optional(),
  AllowedAccessControlHierarchyGroupId: z.string().optional(),
  Applications: z.array(ApplicationSchema).optional(),
  AllowedFlowModules: z.array(FlowModuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  LastModifiedRegion: z.string().optional(),
  LastModifiedTime: z.number().optional(),
  GranularAccessControlConfiguration: z.object({
    DataTableAccessControlConfiguration:
      DataTableAccessControlConfigurationSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AllowedAccessControlTags: z.array(TagSchema).describe(
    "The list of tags that a security profile uses to restrict access to resources in Amazon Connect.",
  ).optional(),
  Description: z.string().min(0).max(250).describe(
    "The description of the security profile.",
  ).optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The identifier of the Amazon Connect instance.").optional(),
  Permissions: z.array(z.string().min(1).max(128)).describe(
    "Permissions assigned to the security profile.",
  ).optional(),
  SecurityProfileName: z.string().min(1).max(127).regex(
    new RegExp("^[ a-zA-Z0-9_@-]+$"),
  ).describe("The name of the security profile.").optional(),
  TagRestrictedResources: z.array(z.string().min(1).max(128)).describe(
    "The list of resources that a security profile applies tag restrictions to in Amazon Connect.",
  ).optional(),
  HierarchyRestrictedResources: z.array(z.string().min(1).max(128)).describe(
    "The list of resources that a security profile applies hierarchy restrictions to in Amazon Connect.",
  ).optional(),
  AllowedAccessControlHierarchyGroupId: z.string().min(0).max(127).regex(
    new RegExp("^[a-zA-Z0-9-]+$"),
  ).describe(
    "The identifier of the hierarchy group that a security profile uses to restrict access to resources in Amazon Connect.",
  ).optional(),
  Applications: z.array(ApplicationSchema).describe(
    "A list of third-party applications that the security profile will give access to.",
  ).optional(),
  AllowedFlowModules: z.array(FlowModuleSchema).describe(
    "The list of flow-module resources to be linked to a security profile in Amazon Connect.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags used to organize, track, or control access for this resource.",
  ).optional(),
  GranularAccessControlConfiguration: z.object({
    DataTableAccessControlConfiguration:
      DataTableAccessControlConfigurationSchema.describe(
        "Defines the access control configuration for data tables.",
      ).optional(),
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

/** Swamp extension model for Connect SecurityProfile. Registered at `@swamp/aws/connect/security-profile`. */
export const model = {
  type: "@swamp/aws/connect/security-profile",
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
      description: "Connect SecurityProfile resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect SecurityProfile",
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
          "AWS::Connect::SecurityProfile",
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
      description: "Get a Connect SecurityProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect SecurityProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Connect::SecurityProfile",
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
      description: "Update a Connect SecurityProfile",
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
        const identifier = existing.SecurityProfileArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Connect::SecurityProfile",
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
          "AWS::Connect::SecurityProfile",
          identifier,
          currentState,
          desiredState,
          ["SecurityProfileName", "InstanceArn"],
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
      description: "Delete a Connect SecurityProfile",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect SecurityProfile",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Connect::SecurityProfile",
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
      description: "Sync Connect SecurityProfile state from AWS",
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
        const identifier = existing.SecurityProfileArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Connect::SecurityProfile",
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
