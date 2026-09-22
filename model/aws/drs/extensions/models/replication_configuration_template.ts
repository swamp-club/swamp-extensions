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

// Auto-generated extension model for @swamp/aws/drs/replication-configuration-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DRS ReplicationConfigurationTemplate (AWS::DRS::ReplicationConfigurationTemplate).
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

const PITPolicyRuleSchema = z.object({
  RuleID: z.number().int().min(0).describe("The ID of the rule.").optional(),
  Units: z.enum(["MINUTE", "HOUR", "DAY"]).describe(
    "The units used to measure the interval and retentionDuration.",
  ),
  Interval: z.number().int().min(1).describe(
    "How often, in the chosen units, a snapshot should be taken.",
  ),
  RetentionDuration: z.number().int().min(1).describe(
    "The duration to retain a snapshot for, in the chosen units.",
  ),
  Enabled: z.boolean().describe("Whether this rule is enabled or not.")
    .optional(),
});

const TagSchema = z.object({
  Key: z.string().min(0).max(256).describe("The key of the tag."),
  Value: z.string().min(0).max(256).describe("The value of the tag."),
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
  StagingAreaSubnetId: z.string().max(255).regex(
    new RegExp("^subnet-[0-9a-fA-F]{8,}$"),
  ).describe("The subnet to be used by the replication staging area."),
  AssociateDefaultSecurityGroup: z.boolean().describe(
    "Whether to associate the default Elastic Disaster Recovery Security group with the Replication Configuration Template.",
  ).optional(),
  ReplicationServersSecurityGroupsIDs: z.array(
    z.string().max(255).regex(new RegExp("^sg-[0-9a-fA-F]{8,}$")),
  ).describe(
    "The security group IDs that will be used by the replication server.",
  ),
  ReplicationServerInstanceType: z.string().max(255).describe(
    "The instance type to be used for the replication server.",
  ).optional(),
  UseDedicatedReplicationServer: z.boolean().describe(
    "Whether to use a dedicated Replication Server in the replication staging area.",
  ).optional(),
  DefaultLargeStagingDiskType: z.enum(["GP2", "GP3", "ST1", "AUTO"]).describe(
    "The Staging Disk EBS volume type to be used during replication.",
  ).optional(),
  EbsEncryption: z.enum(["DEFAULT", "CUSTOM", "NONE"]).describe(
    "The type of EBS encryption to be used during replication.",
  ),
  EbsEncryptionKeyArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:.{16,2044}$"),
  ).describe("The ARN of the EBS encryption key to be used during replication.")
    .optional(),
  BandwidthThrottling: z.number().int().min(0).describe(
    "Configure bandwidth throttling for the outbound data transfer rate of the Source Server in Mbps.",
  ),
  DataPlaneRouting: z.enum(["PRIVATE_IP", "PUBLIC_IP"]).describe(
    "The data plane routing mechanism that will be used for replication.",
  ).optional(),
  CreatePublicIP: z.boolean().describe(
    "Whether to create a Public IP for the Recovery Instance by default.",
  ).optional(),
  StagingAreaTags: z.record(z.string(), z.string().max(256)).describe(
    "A set of tags to be associated with all resources created in the replication staging area: EC2 replication server, EBS volumes, EBS snapshots, etc.",
  ),
  PitPolicy: z.array(PITPolicyRuleSchema).describe(
    "The Point in time (PIT) policy to manage snapshots taken during replication.",
  ),
  Tags: z.array(TagSchema).describe(
    "A set of tags to be associated with the Replication Configuration Template resource.",
  ).optional(),
  AutoReplicateNewDisks: z.boolean().describe(
    "Whether to allow the AWS replication agent to automatically replicate newly added disks.",
  ).optional(),
  InternetProtocol: z.enum(["IPV4", "IPV6"]).describe(
    "Which version of the Internet Protocol to use for replication of data.",
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
  PitPolicy: z.array(PITPolicyRuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  AutoReplicateNewDisks: z.boolean().optional(),
  InternetProtocol: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  StagingAreaSubnetId: z.string().max(255).regex(
    new RegExp("^subnet-[0-9a-fA-F]{8,}$"),
  ).describe("The subnet to be used by the replication staging area.")
    .optional(),
  AssociateDefaultSecurityGroup: z.boolean().describe(
    "Whether to associate the default Elastic Disaster Recovery Security group with the Replication Configuration Template.",
  ).optional(),
  ReplicationServersSecurityGroupsIDs: z.array(
    z.string().max(255).regex(new RegExp("^sg-[0-9a-fA-F]{8,}$")),
  ).describe(
    "The security group IDs that will be used by the replication server.",
  ).optional(),
  ReplicationServerInstanceType: z.string().max(255).describe(
    "The instance type to be used for the replication server.",
  ).optional(),
  UseDedicatedReplicationServer: z.boolean().describe(
    "Whether to use a dedicated Replication Server in the replication staging area.",
  ).optional(),
  DefaultLargeStagingDiskType: z.enum(["GP2", "GP3", "ST1", "AUTO"]).describe(
    "The Staging Disk EBS volume type to be used during replication.",
  ).optional(),
  EbsEncryption: z.enum(["DEFAULT", "CUSTOM", "NONE"]).describe(
    "The type of EBS encryption to be used during replication.",
  ).optional(),
  EbsEncryptionKeyArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:.{16,2044}$"),
  ).describe("The ARN of the EBS encryption key to be used during replication.")
    .optional(),
  BandwidthThrottling: z.number().int().min(0).describe(
    "Configure bandwidth throttling for the outbound data transfer rate of the Source Server in Mbps.",
  ).optional(),
  DataPlaneRouting: z.enum(["PRIVATE_IP", "PUBLIC_IP"]).describe(
    "The data plane routing mechanism that will be used for replication.",
  ).optional(),
  CreatePublicIP: z.boolean().describe(
    "Whether to create a Public IP for the Recovery Instance by default.",
  ).optional(),
  StagingAreaTags: z.record(z.string(), z.string().max(256)).describe(
    "A set of tags to be associated with all resources created in the replication staging area: EC2 replication server, EBS volumes, EBS snapshots, etc.",
  ).optional(),
  PitPolicy: z.array(PITPolicyRuleSchema).describe(
    "The Point in time (PIT) policy to manage snapshots taken during replication.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A set of tags to be associated with the Replication Configuration Template resource.",
  ).optional(),
  AutoReplicateNewDisks: z.boolean().describe(
    "Whether to allow the AWS replication agent to automatically replicate newly added disks.",
  ).optional(),
  InternetProtocol: z.enum(["IPV4", "IPV6"]).describe(
    "Which version of the Internet Protocol to use for replication of data.",
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

/** Swamp extension model for DRS ReplicationConfigurationTemplate. Registered at `@swamp/aws/drs/replication-configuration-template`. */
export const model = {
  type: "@swamp/aws/drs/replication-configuration-template",
  version: "2026.09.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DRS ReplicationConfigurationTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DRS ReplicationConfigurationTemplate",
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
          "AWS::DRS::ReplicationConfigurationTemplate",
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
      description: "Get a DRS ReplicationConfigurationTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DRS ReplicationConfigurationTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DRS::ReplicationConfigurationTemplate",
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
      description: "Update a DRS ReplicationConfigurationTemplate",
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
          "AWS::DRS::ReplicationConfigurationTemplate",
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
          "AWS::DRS::ReplicationConfigurationTemplate",
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
      description: "Delete a DRS ReplicationConfigurationTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DRS ReplicationConfigurationTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DRS::ReplicationConfigurationTemplate",
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
      description: "Sync DRS ReplicationConfigurationTemplate state from AWS",
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
            "AWS::DRS::ReplicationConfigurationTemplate",
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
      description: "List DRS ReplicationConfigurationTemplate resources",
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
          "AWS::DRS::ReplicationConfigurationTemplate",
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
