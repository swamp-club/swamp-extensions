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

// Auto-generated extension model for @swamp/aws/dms/replication-config
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DMS ReplicationConfig (AWS::DMS::ReplicationConfig).
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
  Key: z.string().min(1).max(128).describe("Tag key."),
  Value: z.string().min(1).max(256).describe("Tag value."),
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
  ReplicationConfigIdentifier: z.string().describe(
    "A unique identifier of replication configuration",
  ),
  SourceEndpointArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the source endpoint for this AWS DMS Serverless replication configuration",
  ),
  TargetEndpointArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the target endpoint for this AWS DMS Serverless replication configuration",
  ),
  ReplicationType: z.enum(["full-load", "full-load-and-cdc", "cdc"]).describe(
    "The type of AWS DMS Serverless replication to provision using this replication configuration",
  ),
  ComputeConfig: z.object({
    AvailabilityZone: z.string().optional(),
    DnsNameServers: z.string().optional(),
    KmsKeyId: z.string().optional(),
    MaxCapacityUnits: z.number().int(),
    MinCapacityUnits: z.number().int().optional(),
    MultiAZ: z.boolean().optional(),
    PreferredMaintenanceWindow: z.string().optional(),
    ReplicationSubnetGroupId: z.string().optional(),
    VpcSecurityGroupIds: z.array(z.string()).optional(),
  }).describe(
    "Configuration parameters for provisioning a AWS DMS Serverless replication",
  ),
  ReplicationSettings: z.record(z.string(), z.unknown()).describe(
    "JSON settings for Servereless replications that are provisioned using this replication configuration",
  ).optional(),
  SupplementalSettings: z.record(z.string(), z.unknown()).describe(
    "JSON settings for specifying supplemental data",
  ).optional(),
  ResourceIdentifier: z.string().describe(
    "A unique value or name that you get set for a given resource that can be used to construct an Amazon Resource Name (ARN) for that resource",
  ).optional(),
  TableMappings: z.record(z.string(), z.unknown()).describe(
    "JSON table mappings for AWS DMS Serverless replications that are provisioned using this replication configuration",
  ),
  Tags: z.array(TagSchema).describe(
    "Contains a map of the key-value pairs for the resource tag or tags assigned to the dataset.",
  ).optional(),
});

const StateSchema = z.object({
  ReplicationConfigIdentifier: z.string().optional(),
  ReplicationConfigArn: z.string(),
  SourceEndpointArn: z.string().optional(),
  TargetEndpointArn: z.string().optional(),
  ReplicationType: z.string().optional(),
  ComputeConfig: z.object({
    AvailabilityZone: z.string(),
    DnsNameServers: z.string(),
    KmsKeyId: z.string(),
    MaxCapacityUnits: z.number(),
    MinCapacityUnits: z.number(),
    MultiAZ: z.boolean(),
    PreferredMaintenanceWindow: z.string(),
    ReplicationSubnetGroupId: z.string(),
    VpcSecurityGroupIds: z.array(z.string()),
  }).optional(),
  ReplicationSettings: z.record(z.string(), z.unknown()).optional(),
  SupplementalSettings: z.record(z.string(), z.unknown()).optional(),
  ResourceIdentifier: z.string().optional(),
  TableMappings: z.record(z.string(), z.unknown()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ReplicationConfigIdentifier: z.string().describe(
    "A unique identifier of replication configuration",
  ).optional(),
  SourceEndpointArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the source endpoint for this AWS DMS Serverless replication configuration",
  ).optional(),
  TargetEndpointArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the target endpoint for this AWS DMS Serverless replication configuration",
  ).optional(),
  ReplicationType: z.enum(["full-load", "full-load-and-cdc", "cdc"]).describe(
    "The type of AWS DMS Serverless replication to provision using this replication configuration",
  ).optional(),
  ComputeConfig: z.object({
    AvailabilityZone: z.string().optional(),
    DnsNameServers: z.string().optional(),
    KmsKeyId: z.string().optional(),
    MaxCapacityUnits: z.number().int().optional(),
    MinCapacityUnits: z.number().int().optional(),
    MultiAZ: z.boolean().optional(),
    PreferredMaintenanceWindow: z.string().optional(),
    ReplicationSubnetGroupId: z.string().optional(),
    VpcSecurityGroupIds: z.array(z.string()).optional(),
  }).describe(
    "Configuration parameters for provisioning a AWS DMS Serverless replication",
  ).optional(),
  ReplicationSettings: z.record(z.string(), z.unknown()).describe(
    "JSON settings for Servereless replications that are provisioned using this replication configuration",
  ).optional(),
  SupplementalSettings: z.record(z.string(), z.unknown()).describe(
    "JSON settings for specifying supplemental data",
  ).optional(),
  ResourceIdentifier: z.string().describe(
    "A unique value or name that you get set for a given resource that can be used to construct an Amazon Resource Name (ARN) for that resource",
  ).optional(),
  TableMappings: z.record(z.string(), z.unknown()).describe(
    "JSON table mappings for AWS DMS Serverless replications that are provisioned using this replication configuration",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Contains a map of the key-value pairs for the resource tag or tags assigned to the dataset.",
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

/** Swamp extension model for DMS ReplicationConfig. Registered at `@swamp/aws/dms/replication-config`. */
export const model = {
  type: "@swamp/aws/dms/replication-config",
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
      description: "DMS ReplicationConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DMS ReplicationConfig",
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
          "AWS::DMS::ReplicationConfig",
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
      description: "Get a DMS ReplicationConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DMS ReplicationConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DMS::ReplicationConfig",
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
      description: "Update a DMS ReplicationConfig",
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
        const identifier = existing.ReplicationConfigArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DMS::ReplicationConfig",
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
          "AWS::DMS::ReplicationConfig",
          identifier,
          currentState,
          desiredState,
          ["ResourceIdentifier"],
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
      description: "Delete a DMS ReplicationConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DMS ReplicationConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DMS::ReplicationConfig",
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
      description: "Sync DMS ReplicationConfig state from AWS",
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
        const identifier = existing.ReplicationConfigArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DMS::ReplicationConfig",
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
