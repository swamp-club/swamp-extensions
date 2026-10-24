// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/mgn/network-migration-definition
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for MGN NetworkMigrationDefinition (AWS::MGN::NetworkMigrationDefinition).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const SourceS3ConfigurationSchema = z.object({
  S3Bucket: z.string().regex(new RegExp("^[a-zA-Z0-9.\\-_]{1,255}$")).describe(
    "The name of the S3 bucket containing source data.",
  ),
  S3BucketOwner: z.string().min(12).max(12).regex(new RegExp("[0-9]{12,}"))
    .describe("The AWS account ID of the S3 bucket owner."),
  S3Key: z.string().regex(new RegExp("^[^\\x00]{1,1024}$")).describe(
    "The S3 key (path) for the source data.",
  ),
});

const SourceConfigurationSchema = z.object({
  SourceEnvironment: z.enum([
    "NSX",
    "VSPHERE",
    "FORTIGATE_FIREWALL",
    "PALO_ALTO_FIREWALL",
    "CISCO_ACI",
    "LOGICAL_MODEL",
    "MODELIZE_IT",
  ]).describe("The source environment type."),
  SourceS3Configuration: SourceS3ConfigurationSchema.describe(
    "S3 configuration for source network data.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(0).max(256).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
  Name: z.string().min(1).max(256).regex(
    new RegExp("^[^\\s\\x00]( *[^\\s\\x00])*$"),
  ).describe("The name of the network migration definition."),
  Description: z.string().min(0).max(600).regex(new RegExp("^[^\\x00]*$"))
    .describe("A description of the network migration definition.").optional(),
  SourceConfigurations: z.array(SourceConfigurationSchema).describe(
    "A list of source configurations for the network migration.",
  ),
  TargetS3Configuration: z.object({
    S3Bucket: z.string().regex(new RegExp("^[a-zA-Z0-9.\\-_]{1,255}$"))
      .describe("The name of the S3 bucket for target artifacts."),
    S3BucketOwner: z.string().min(12).max(12).regex(new RegExp("[0-9]{12,}"))
      .describe("The AWS account ID of the S3 bucket owner."),
  }).describe("The S3 configuration for storing the target network artifacts."),
  TargetNetwork: z.object({
    Topology: z.enum(["ISOLATED_VPC", "HUB_AND_SPOKE"]).describe(
      "The network topology type for the target environment.",
    ),
    InboundCidr: z.string().min(9).max(18).regex(
      new RegExp(
        "^((25[0-4]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])/(1[6-9]|2[0-8])$",
      ),
    ).describe("The CIDR block for inbound traffic in the target network.")
      .optional(),
    OutboundCidr: z.string().min(9).max(18).regex(
      new RegExp(
        "^((25[0-4]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])/(1[6-9]|2[0-8])$",
      ),
    ).describe("The CIDR block for outbound traffic in the target network.")
      .optional(),
    InspectionCidr: z.string().min(9).max(18).regex(
      new RegExp(
        "^((25[0-4]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])/(1[6-9]|2[0-8])$",
      ),
    ).describe("The CIDR block for inspection traffic in the target network.")
      .optional(),
  }).describe(
    "The target network configuration including topology and CIDR ranges.",
  ),
  TargetDeployment: z.enum(["SINGLE_ACCOUNT", "MULTI_ACCOUNT"]).describe(
    "The target deployment configuration for the migrated network.",
  ).optional(),
  ScopeTags: z.record(
    z.string(),
    z.string().max(256).regex(new RegExp("^[a-zA-Z0-9\\s+\\-=._:/@]*$")),
  ).describe("Scope tags for the network migration definition.").optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the network migration definition.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  NetworkMigrationDefinitionID: z.string().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  SourceConfigurations: z.array(SourceConfigurationSchema).optional(),
  TargetS3Configuration: z.object({
    S3Bucket: z.string(),
    S3BucketOwner: z.string(),
  }).optional(),
  TargetNetwork: z.object({
    Topology: z.string(),
    InboundCidr: z.string(),
    OutboundCidr: z.string(),
    InspectionCidr: z.string(),
  }).optional(),
  TargetDeployment: z.string().optional(),
  ScopeTags: z.record(z.string(), z.unknown()).optional(),
  Tags: z.array(TagSchema).optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(256).regex(
    new RegExp("^[^\\s\\x00]( *[^\\s\\x00])*$"),
  ).describe("The name of the network migration definition.").optional(),
  Description: z.string().min(0).max(600).regex(new RegExp("^[^\\x00]*$"))
    .describe("A description of the network migration definition.").optional(),
  SourceConfigurations: z.array(SourceConfigurationSchema).describe(
    "A list of source configurations for the network migration.",
  ).optional(),
  TargetS3Configuration: z.object({
    S3Bucket: z.string().regex(new RegExp("^[a-zA-Z0-9.\\-_]{1,255}$"))
      .describe("The name of the S3 bucket for target artifacts.").optional(),
    S3BucketOwner: z.string().min(12).max(12).regex(new RegExp("[0-9]{12,}"))
      .describe("The AWS account ID of the S3 bucket owner.").optional(),
  }).describe("The S3 configuration for storing the target network artifacts.")
    .optional(),
  TargetNetwork: z.object({
    Topology: z.enum(["ISOLATED_VPC", "HUB_AND_SPOKE"]).describe(
      "The network topology type for the target environment.",
    ).optional(),
    InboundCidr: z.string().min(9).max(18).regex(
      new RegExp(
        "^((25[0-4]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])/(1[6-9]|2[0-8])$",
      ),
    ).describe("The CIDR block for inbound traffic in the target network.")
      .optional(),
    OutboundCidr: z.string().min(9).max(18).regex(
      new RegExp(
        "^((25[0-4]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])/(1[6-9]|2[0-8])$",
      ),
    ).describe("The CIDR block for outbound traffic in the target network.")
      .optional(),
    InspectionCidr: z.string().min(9).max(18).regex(
      new RegExp(
        "^((25[0-4]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])/(1[6-9]|2[0-8])$",
      ),
    ).describe("The CIDR block for inspection traffic in the target network.")
      .optional(),
  }).describe(
    "The target network configuration including topology and CIDR ranges.",
  ).optional(),
  TargetDeployment: z.enum(["SINGLE_ACCOUNT", "MULTI_ACCOUNT"]).describe(
    "The target deployment configuration for the migrated network.",
  ).optional(),
  ScopeTags: z.record(
    z.string(),
    z.string().max(256).regex(new RegExp("^[a-zA-Z0-9\\s+\\-=._:/@]*$")),
  ).describe("Scope tags for the network migration definition.").optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to assign to the network migration definition.",
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

/** Swamp extension model for MGN NetworkMigrationDefinition. Registered at `@swamp/aws/mgn/network-migration-definition`. */
export const model = {
  type: "@swamp/aws/mgn/network-migration-definition",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MGN NetworkMigrationDefinition resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MGN NetworkMigrationDefinition",
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
          "AWS::MGN::NetworkMigrationDefinition",
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
      description: "Get a MGN NetworkMigrationDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MGN NetworkMigrationDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MGN::NetworkMigrationDefinition",
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
      description: "Update a MGN NetworkMigrationDefinition",
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
          "AWS::MGN::NetworkMigrationDefinition",
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
          "AWS::MGN::NetworkMigrationDefinition",
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
      description: "Delete a MGN NetworkMigrationDefinition",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MGN NetworkMigrationDefinition",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MGN::NetworkMigrationDefinition",
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
      description: "Sync MGN NetworkMigrationDefinition state from AWS",
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
            "AWS::MGN::NetworkMigrationDefinition",
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
      description: "List MGN NetworkMigrationDefinition resources",
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
          "AWS::MGN::NetworkMigrationDefinition",
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
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
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
