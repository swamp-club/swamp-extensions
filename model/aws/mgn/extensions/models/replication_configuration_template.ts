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

// Auto-generated extension model for @swamp/aws/mgn/replication-configuration-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MGN ReplicationConfigurationTemplate (AWS::MGN::ReplicationConfigurationTemplate).
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
  StagingAreaSubnetId: z.string().min(0).max(255).regex(
    new RegExp("^subnet-[0-9a-fA-F]{8,}$"),
  ).describe("The subnet to be used by the replication staging area."),
  AssociateDefaultSecurityGroup: z.boolean().describe(
    "Whether to associate the default Application Migration Service Security Group with the Replication Configuration Template.",
  ),
  ReplicationServersSecurityGroupsIDs: z.array(
    z.string().min(0).max(255).regex(new RegExp("^sg-[0-9a-fA-F]{8,}$")),
  ).describe(
    "The security group IDs that will be used by the replication server.",
  ),
  ReplicationServerInstanceType: z.string().min(0).max(255).describe(
    "The instance type to be used for the replication server.",
  ),
  UseDedicatedReplicationServer: z.boolean().describe(
    "Whether to use a dedicated Replication Server in the replication staging area.",
  ),
  DefaultLargeStagingDiskType: z.enum(["GP2", "ST1", "GP3"]).describe(
    "The Staging Disk EBS volume type to be used during replication.",
  ),
  EbsEncryption: z.enum(["DEFAULT", "CUSTOM"]).describe(
    "The type of EBS encryption to be used during replication.",
  ),
  EbsEncryptionKeyArn: z.string().min(20).max(2048).describe(
    "The ARN of the EBS encryption key to be used during replication.",
  ).optional(),
  BandwidthThrottling: z.number().int().min(0).max(10000).describe(
    "Configure bandwidth throttling for the outbound data transfer rate of the Source Server in Mbps.",
  ),
  DataPlaneRouting: z.enum(["PRIVATE_IP", "PUBLIC_IP"]).describe(
    "The data plane routing mechanism that will be used for replication.",
  ),
  CreatePublicIP: z.boolean().describe(
    "Whether to create a Public IP for the Recovery Instance by default.",
  ),
  StagingAreaTags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "A set of tags to be associated with all resources created in the replication staging area: EC2 replication server, EBS volumes, EBS snapshots, etc.",
  ),
  UseFipsEndpoint: z.boolean().describe(
    "Whether to use a FIPS endpoint when initiating the agent connection to the Application Migration Service service.",
  ).optional(),
  InternetProtocol: z.enum(["IPV4", "IPV6"]).describe(
    "Which internet protocol to use for replication of data.",
  ).optional(),
  StoreSnapshotOnLocalZone: z.boolean().describe(
    "Whether to store the Snapshot in the Local Zone of the replication staging area subnet.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A set of tags to be associated with the Replication Configuration Template resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ReplicationConfigurationTemplateID: z.string().optional(),
  StagingAreaSubnetId: z.string().optional(),
  AssociateDefaultSecurityGroup: z.boolean().optional(),
  ReplicationServersSecurityGroupsIDs: z.array(z.string()).optional(),
  ReplicationServerInstanceType: z.string().optional(),
  UseDedicatedReplicationServer: z.boolean().optional(),
  DefaultLargeStagingDiskType: z.string().optional(),
  EbsEncryption: z.string().optional(),
  EbsEncryptionKeyArn: z.string().optional(),
  BandwidthThrottling: z.number().optional(),
  DataPlaneRouting: z.string().optional(),
  CreatePublicIP: z.boolean().optional(),
  StagingAreaTags: z.record(z.string(), z.unknown()).optional(),
  UseFipsEndpoint: z.boolean().optional(),
  InternetProtocol: z.string().optional(),
  StoreSnapshotOnLocalZone: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  StagingAreaSubnetId: z.string().min(0).max(255).regex(
    new RegExp("^subnet-[0-9a-fA-F]{8,}$"),
  ).describe("The subnet to be used by the replication staging area.")
    .optional(),
  AssociateDefaultSecurityGroup: z.boolean().describe(
    "Whether to associate the default Application Migration Service Security Group with the Replication Configuration Template.",
  ).optional(),
  ReplicationServersSecurityGroupsIDs: z.array(
    z.string().min(0).max(255).regex(new RegExp("^sg-[0-9a-fA-F]{8,}$")),
  ).describe(
    "The security group IDs that will be used by the replication server.",
  ).optional(),
  ReplicationServerInstanceType: z.string().min(0).max(255).describe(
    "The instance type to be used for the replication server.",
  ).optional(),
  UseDedicatedReplicationServer: z.boolean().describe(
    "Whether to use a dedicated Replication Server in the replication staging area.",
  ).optional(),
  DefaultLargeStagingDiskType: z.enum(["GP2", "ST1", "GP3"]).describe(
    "The Staging Disk EBS volume type to be used during replication.",
  ).optional(),
  EbsEncryption: z.enum(["DEFAULT", "CUSTOM"]).describe(
    "The type of EBS encryption to be used during replication.",
  ).optional(),
  EbsEncryptionKeyArn: z.string().min(20).max(2048).describe(
    "The ARN of the EBS encryption key to be used during replication.",
  ).optional(),
  BandwidthThrottling: z.number().int().min(0).max(10000).describe(
    "Configure bandwidth throttling for the outbound data transfer rate of the Source Server in Mbps.",
  ).optional(),
  DataPlaneRouting: z.enum(["PRIVATE_IP", "PUBLIC_IP"]).describe(
    "The data plane routing mechanism that will be used for replication.",
  ).optional(),
  CreatePublicIP: z.boolean().describe(
    "Whether to create a Public IP for the Recovery Instance by default.",
  ).optional(),
  StagingAreaTags: z.record(z.string(), z.string().min(0).max(256)).describe(
    "A set of tags to be associated with all resources created in the replication staging area: EC2 replication server, EBS volumes, EBS snapshots, etc.",
  ).optional(),
  UseFipsEndpoint: z.boolean().describe(
    "Whether to use a FIPS endpoint when initiating the agent connection to the Application Migration Service service.",
  ).optional(),
  InternetProtocol: z.enum(["IPV4", "IPV6"]).describe(
    "Which internet protocol to use for replication of data.",
  ).optional(),
  StoreSnapshotOnLocalZone: z.boolean().describe(
    "Whether to store the Snapshot in the Local Zone of the replication staging area subnet.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A set of tags to be associated with the Replication Configuration Template resource.",
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

/** Swamp extension model for MGN ReplicationConfigurationTemplate. Registered at `@swamp/aws/mgn/replication-configuration-template`. */
export const model = {
  type: "@swamp/aws/mgn/replication-configuration-template",
  version: "2026.10.29.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MGN ReplicationConfigurationTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MGN ReplicationConfigurationTemplate",
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
          "AWS::MGN::ReplicationConfigurationTemplate",
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
      description: "Get a MGN ReplicationConfigurationTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MGN ReplicationConfigurationTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MGN::ReplicationConfigurationTemplate",
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
      description: "Update a MGN ReplicationConfigurationTemplate",
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
          "AWS::MGN::ReplicationConfigurationTemplate",
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
          "AWS::MGN::ReplicationConfigurationTemplate",
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
      description: "Delete a MGN ReplicationConfigurationTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MGN ReplicationConfigurationTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MGN::ReplicationConfigurationTemplate",
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
      description: "Sync MGN ReplicationConfigurationTemplate state from AWS",
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
            "AWS::MGN::ReplicationConfigurationTemplate",
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
      description: "List MGN ReplicationConfigurationTemplate resources",
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
          "AWS::MGN::ReplicationConfigurationTemplate",
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
