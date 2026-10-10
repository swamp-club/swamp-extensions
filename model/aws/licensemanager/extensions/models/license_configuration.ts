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

// Auto-generated extension model for @swamp/aws/licensemanager/license-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for LicenseManager LicenseConfiguration (AWS::LicenseManager::LicenseConfiguration).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const ProductInformationFilterSchema = z.object({
  ProductInformationFilterName: z.string().describe("Filter name."),
  ProductInformationFilterValue: z.array(z.string()).describe("Filter value.")
    .optional(),
  ProductInformationFilterComparator: z.string().describe("Logical operator."),
});

const ProductInformationSchema = z.object({
  ResourceType: z.string().describe(
    "Resource type. The possible values are SSM_MANAGED | RDS.",
  ),
  ProductInformationFilterList: z.array(ProductInformationFilterSchema)
    .describe("A product information filter list."),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
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
  Name: z.string().describe("Name of the license configuration."),
  Description: z.string().describe("Description of the license configuration.")
    .optional(),
  LicenseCountingType: z.enum(["vCPU", "Instance", "Core", "Socket"]).describe(
    "Dimension used to track the license inventory.",
  ),
  LicenseCount: z.number().int().describe(
    "Number of licenses managed by the license configuration.",
  ).optional(),
  LicenseCountHardLimit: z.boolean().describe(
    "Indicates whether hard or soft license enforcement is used. Exceeding a hard limit blocks the launch of new instances.",
  ).optional(),
  LicenseRules: z.array(z.string()).describe(
    "License rules. The syntax is #name=value (for example, #allowedTenancy=EC2-DedicatedHost).",
  ).optional(),
  LicenseExpiry: z.number().int().describe(
    "License configuration expiry as an epoch timestamp (seconds since 1970-01-01T00:00:00Z).",
  ).optional(),
  DisassociateWhenNotFound: z.boolean().describe(
    "When true, disassociates a resource when software is uninstalled.",
  ).optional(),
  ProductInformationList: z.array(ProductInformationSchema).describe(
    "Product information.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to add to the license configuration.")
    .optional(),
});

const StateSchema = z.object({
  LicenseConfigurationId: z.string().optional(),
  LicenseConfigurationArn: z.string(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  LicenseCountingType: z.string().optional(),
  LicenseCount: z.number().optional(),
  LicenseCountHardLimit: z.boolean().optional(),
  LicenseRules: z.array(z.string()).optional(),
  LicenseExpiry: z.number().optional(),
  DisassociateWhenNotFound: z.boolean().optional(),
  ProductInformationList: z.array(ProductInformationSchema).optional(),
  Status: z.string().optional(),
  OwnerAccountId: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().describe("Name of the license configuration.").optional(),
  Description: z.string().describe("Description of the license configuration.")
    .optional(),
  LicenseCountingType: z.enum(["vCPU", "Instance", "Core", "Socket"]).describe(
    "Dimension used to track the license inventory.",
  ).optional(),
  LicenseCount: z.number().int().describe(
    "Number of licenses managed by the license configuration.",
  ).optional(),
  LicenseCountHardLimit: z.boolean().describe(
    "Indicates whether hard or soft license enforcement is used. Exceeding a hard limit blocks the launch of new instances.",
  ).optional(),
  LicenseRules: z.array(z.string()).describe(
    "License rules. The syntax is #name=value (for example, #allowedTenancy=EC2-DedicatedHost).",
  ).optional(),
  LicenseExpiry: z.number().int().describe(
    "License configuration expiry as an epoch timestamp (seconds since 1970-01-01T00:00:00Z).",
  ).optional(),
  DisassociateWhenNotFound: z.boolean().describe(
    "When true, disassociates a resource when software is uninstalled.",
  ).optional(),
  ProductInformationList: z.array(ProductInformationSchema).describe(
    "Product information.",
  ).optional(),
  Tags: z.array(TagSchema).describe("Tags to add to the license configuration.")
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

/** Swamp extension model for LicenseManager LicenseConfiguration. Registered at `@swamp/aws/licensemanager/license-configuration`. */
export const model = {
  type: "@swamp/aws/licensemanager/license-configuration",
  version: "2026.10.09.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "LicenseManager LicenseConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a LicenseManager LicenseConfiguration",
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
          "AWS::LicenseManager::LicenseConfiguration",
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
      description: "Get a LicenseManager LicenseConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LicenseManager LicenseConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::LicenseManager::LicenseConfiguration",
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
      description: "Update a LicenseManager LicenseConfiguration",
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
        const identifier = existing.LicenseConfigurationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::LicenseManager::LicenseConfiguration",
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
          "AWS::LicenseManager::LicenseConfiguration",
          identifier,
          currentState,
          desiredState,
          ["LicenseCountingType", "LicenseRules"],
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
      description: "Delete a LicenseManager LicenseConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the LicenseManager LicenseConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::LicenseManager::LicenseConfiguration",
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
      description: "Sync LicenseManager LicenseConfiguration state from AWS",
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
        const identifier = existing.LicenseConfigurationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::LicenseManager::LicenseConfiguration",
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
    list: {
      description: "List LicenseManager LicenseConfiguration resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::LicenseManager::LicenseConfiguration",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.LicenseConfigurationArn?.toString() ??
              item.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
              .replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
