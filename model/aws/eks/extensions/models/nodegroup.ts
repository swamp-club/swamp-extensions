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

// Auto-generated extension model for @swamp/aws/eks/nodegroup
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EKS Nodegroup (AWS::EKS::Nodegroup).
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

const TaintSchema = z.object({
  Key: z.string().min(1).optional(),
  Value: z.string().min(0).optional(),
  Effect: z.string().min(1).optional(),
});

const NodeRepairConfigOverridesSchema = z.object({
  NodeMonitoringCondition: z.string().describe(
    "Specify an unhealthy condition reported by the node monitoring agent that this override would apply to.",
  ).optional(),
  NodeUnhealthyReason: z.string().describe(
    "Specify a reason reported by the node monitoring agent that this override would apply to.",
  ).optional(),
  MinRepairWaitTimeMins: z.number().int().min(1).describe(
    "Specify the minimum time in minutes to wait before attempting to repair a node with this specific NodeMonitoringCondition and NodeUnhealthyReason.",
  ).optional(),
  RepairAction: z.enum(["Replace", "Reboot", "NoAction"]).describe(
    "Specify the repair action to take for nodes when all of the specified conditions are met.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  AmiType: z.string().describe("The AMI type for your node group.").optional(),
  CapacityType: z.string().describe(
    "The capacity type of your managed node group.",
  ).optional(),
  ClusterName: z.string().min(1).describe(
    "Name of the cluster to create the node group in.",
  ),
  DiskSize: z.number().int().describe(
    "The root device disk size (in GiB) for your node group instances.",
  ).optional(),
  ForceUpdateEnabled: z.boolean().describe(
    "Force the update if the existing node group's pods are unable to be drained due to a pod disruption budget issue.",
  ).optional(),
  InstanceTypes: z.array(z.string()).describe(
    "Specify the instance types for a node group.",
  ).optional(),
  Labels: z.record(z.string(), z.string()).describe(
    "The Kubernetes labels to be applied to the nodes in the node group when they are created.",
  ).optional(),
  LaunchTemplate: z.object({
    Version: z.string().min(1).optional(),
    Name: z.string().min(1).optional(),
  }).describe(
    "An object representing a node group's launch template specification.",
  ).optional(),
  NodegroupName: z.string().min(1).describe(
    "The unique name to give your node group.",
  ).optional(),
  NodeRole: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role to associate with your node group.",
  ),
  ReleaseVersion: z.string().describe(
    "The AMI version of the Amazon EKS-optimized AMI to use with your node group.",
  ).optional(),
  RemoteAccess: z.object({
    SourceSecurityGroups: z.array(z.string()).optional(),
    Ec2SshKey: z.string(),
  }).describe(
    "The remote access (SSH) configuration to use with your node group.",
  ).optional(),
  ScalingConfig: z.object({
    MinSize: z.number().int().min(0).optional(),
    DesiredSize: z.number().int().min(0).optional(),
    MaxSize: z.number().int().min(1).optional(),
  }).describe(
    "The scaling configuration details for the Auto Scaling group that is created for your node group.",
  ).optional(),
  Subnets: z.array(z.string()).describe(
    "The subnets to use for the Auto Scaling group that is created for your node group.",
  ),
  Tags: z.record(z.string(), z.string()).describe(
    "The metadata, as key-value pairs, to apply to the node group to assist with categorization and organization. Follows same schema as Labels for consistency.",
  ).optional(),
  Taints: z.array(TaintSchema).describe(
    "The Kubernetes taints to be applied to the nodes in the node group when they are created.",
  ).optional(),
  UpdateConfig: z.object({
    UpdateStrategy: z.string().describe(
      "The configuration for the behavior to follow during an node group version update of this managed node group. You choose between two possible strategies for replacing nodes during an UpdateNodegroupVersion action.",
    ).optional(),
    MaxUnavailable: z.number().min(1).describe(
      "The maximum number of nodes unavailable at once during a version update. Nodes will be updated in parallel. This value or maxUnavailablePercentage is required to have a value.The maximum number is 100.",
    ).optional(),
    MaxUnavailablePercentage: z.number().min(1).max(100).describe(
      "The maximum percentage of nodes unavailable during a version update. This percentage of nodes will be updated in parallel, up to 100 nodes at once. This value or maxUnavailable is required to have a value.",
    ).optional(),
  }).describe("The node group update configuration.").optional(),
  NodeRepairConfig: z.object({
    Enabled: z.boolean().describe(
      "Set this value to true to enable node auto repair for the node group.",
    ).optional(),
    MaxUnhealthyNodeThresholdCount: z.number().int().min(1).describe(
      "Specify a count threshold of unhealthy nodes, above which node auto repair actions will stop. When using this, you cannot also set MaxUnhealthyNodeThresholdPercentage at the same time.",
    ).optional(),
    MaxUnhealthyNodeThresholdPercentage: z.number().int().min(1).max(100)
      .describe(
        "Specify a percentage threshold of unhealthy nodes, above which node auto repair actions will stop. When using this, you cannot also set MaxUnhealthyNodeThresholdCount at the same time.",
      ).optional(),
    MaxParallelNodesRepairedCount: z.number().int().min(1).describe(
      "Specify the maximum number of nodes that can be repaired concurrently or in parallel, expressed as a count of unhealthy nodes. This gives you finer-grained control over the pace of node replacements. When using this, you cannot also set MaxParallelNodesRepairedPercentage at the same time.",
    ).optional(),
    MaxParallelNodesRepairedPercentage: z.number().int().min(1).max(100)
      .describe(
        "Specify the maximum number of nodes that can be repaired concurrently or in parallel, expressed as a percentage of unhealthy nodes. This gives you finer-grained control over the pace of node replacements. When using this, you cannot also set MaxParallelNodesRepairedCount at the same time.",
      ).optional(),
    NodeRepairConfigOverrides: z.array(NodeRepairConfigOverridesSchema)
      .describe(
        "Specify granular overrides for specific repair actions. These overrides control the repair action and the repair delay time before a node is considered eligible for repair. If you use this, you must specify all the values.",
      ).optional(),
  }).describe("The node auto repair configuration for node group.").optional(),
  WarmPoolConfig: z.object({
    Enabled: z.boolean().describe(
      "Enable or disable warm pool for the node group.",
    ).optional(),
    MaxGroupPreparedCapacity: z.number().int().min(-1).describe(
      "The maximum number of instances that are allowed to be in the warm pool.",
    ).optional(),
    MinSize: z.number().int().min(0).describe(
      "The minimum number of instances to maintain in the warm pool.",
    ).optional(),
    PoolState: z.string().describe("The desired state of warm pool instances.")
      .optional(),
    ReuseOnScaleIn: z.boolean().describe(
      "Whether to return instances to the warm pool during scale-in instead of terminating them.",
    ).optional(),
  }).describe(
    "The warm pool configuration details for the Auto Scaling group that is created for the node group.",
  ).optional(),
  Version: z.string().describe(
    "The Kubernetes version to use for your managed nodes.",
  ).optional(),
});

const StateSchema = z.object({
  AmiType: z.string().optional(),
  CapacityType: z.string().optional(),
  ClusterName: z.string().optional(),
  DiskSize: z.number().optional(),
  ForceUpdateEnabled: z.boolean().optional(),
  InstanceTypes: z.array(z.string()).optional(),
  Labels: z.record(z.string(), z.unknown()).optional(),
  LaunchTemplate: z.object({
    Id: z.string(),
    Version: z.string(),
    Name: z.string(),
  }).optional(),
  NodegroupName: z.string().optional(),
  NodeRole: z.string().optional(),
  ReleaseVersion: z.string().optional(),
  RemoteAccess: z.object({
    SourceSecurityGroups: z.array(z.string()),
    Ec2SshKey: z.string(),
  }).optional(),
  ScalingConfig: z.object({
    MinSize: z.number(),
    DesiredSize: z.number(),
    MaxSize: z.number(),
  }).optional(),
  Subnets: z.array(z.string()).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Taints: z.array(TaintSchema).optional(),
  UpdateConfig: z.object({
    UpdateStrategy: z.string(),
    MaxUnavailable: z.number(),
    MaxUnavailablePercentage: z.number(),
  }).optional(),
  NodeRepairConfig: z.object({
    Enabled: z.boolean(),
    MaxUnhealthyNodeThresholdCount: z.number(),
    MaxUnhealthyNodeThresholdPercentage: z.number(),
    MaxParallelNodesRepairedCount: z.number(),
    MaxParallelNodesRepairedPercentage: z.number(),
    NodeRepairConfigOverrides: z.array(NodeRepairConfigOverridesSchema),
  }).optional(),
  WarmPoolConfig: z.object({
    Enabled: z.boolean(),
    MaxGroupPreparedCapacity: z.number(),
    MinSize: z.number(),
    PoolState: z.string(),
    ReuseOnScaleIn: z.boolean(),
  }).optional(),
  Version: z.string().optional(),
  Id: z.string(),
  Arn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AmiType: z.string().describe("The AMI type for your node group.").optional(),
  CapacityType: z.string().describe(
    "The capacity type of your managed node group.",
  ).optional(),
  ClusterName: z.string().min(1).describe(
    "Name of the cluster to create the node group in.",
  ).optional(),
  DiskSize: z.number().int().describe(
    "The root device disk size (in GiB) for your node group instances.",
  ).optional(),
  ForceUpdateEnabled: z.boolean().describe(
    "Force the update if the existing node group's pods are unable to be drained due to a pod disruption budget issue.",
  ).optional(),
  InstanceTypes: z.array(z.string()).describe(
    "Specify the instance types for a node group.",
  ).optional(),
  Labels: z.record(z.string(), z.string()).describe(
    "The Kubernetes labels to be applied to the nodes in the node group when they are created.",
  ).optional(),
  LaunchTemplate: z.object({
    Version: z.string().min(1).optional(),
    Name: z.string().min(1).optional(),
  }).describe(
    "An object representing a node group's launch template specification.",
  ).optional(),
  NodegroupName: z.string().min(1).describe(
    "The unique name to give your node group.",
  ).optional(),
  NodeRole: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM role to associate with your node group.",
  ).optional(),
  ReleaseVersion: z.string().describe(
    "The AMI version of the Amazon EKS-optimized AMI to use with your node group.",
  ).optional(),
  RemoteAccess: z.object({
    SourceSecurityGroups: z.array(z.string()).optional(),
    Ec2SshKey: z.string().optional(),
  }).describe(
    "The remote access (SSH) configuration to use with your node group.",
  ).optional(),
  ScalingConfig: z.object({
    MinSize: z.number().int().min(0).optional(),
    DesiredSize: z.number().int().min(0).optional(),
    MaxSize: z.number().int().min(1).optional(),
  }).describe(
    "The scaling configuration details for the Auto Scaling group that is created for your node group.",
  ).optional(),
  Subnets: z.array(z.string()).describe(
    "The subnets to use for the Auto Scaling group that is created for your node group.",
  ).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "The metadata, as key-value pairs, to apply to the node group to assist with categorization and organization. Follows same schema as Labels for consistency.",
  ).optional(),
  Taints: z.array(TaintSchema).describe(
    "The Kubernetes taints to be applied to the nodes in the node group when they are created.",
  ).optional(),
  UpdateConfig: z.object({
    UpdateStrategy: z.string().describe(
      "The configuration for the behavior to follow during an node group version update of this managed node group. You choose between two possible strategies for replacing nodes during an UpdateNodegroupVersion action.",
    ).optional(),
    MaxUnavailable: z.number().min(1).describe(
      "The maximum number of nodes unavailable at once during a version update. Nodes will be updated in parallel. This value or maxUnavailablePercentage is required to have a value.The maximum number is 100.",
    ).optional(),
    MaxUnavailablePercentage: z.number().min(1).max(100).describe(
      "The maximum percentage of nodes unavailable during a version update. This percentage of nodes will be updated in parallel, up to 100 nodes at once. This value or maxUnavailable is required to have a value.",
    ).optional(),
  }).describe("The node group update configuration.").optional(),
  NodeRepairConfig: z.object({
    Enabled: z.boolean().describe(
      "Set this value to true to enable node auto repair for the node group.",
    ).optional(),
    MaxUnhealthyNodeThresholdCount: z.number().int().min(1).describe(
      "Specify a count threshold of unhealthy nodes, above which node auto repair actions will stop. When using this, you cannot also set MaxUnhealthyNodeThresholdPercentage at the same time.",
    ).optional(),
    MaxUnhealthyNodeThresholdPercentage: z.number().int().min(1).max(100)
      .describe(
        "Specify a percentage threshold of unhealthy nodes, above which node auto repair actions will stop. When using this, you cannot also set MaxUnhealthyNodeThresholdCount at the same time.",
      ).optional(),
    MaxParallelNodesRepairedCount: z.number().int().min(1).describe(
      "Specify the maximum number of nodes that can be repaired concurrently or in parallel, expressed as a count of unhealthy nodes. This gives you finer-grained control over the pace of node replacements. When using this, you cannot also set MaxParallelNodesRepairedPercentage at the same time.",
    ).optional(),
    MaxParallelNodesRepairedPercentage: z.number().int().min(1).max(100)
      .describe(
        "Specify the maximum number of nodes that can be repaired concurrently or in parallel, expressed as a percentage of unhealthy nodes. This gives you finer-grained control over the pace of node replacements. When using this, you cannot also set MaxParallelNodesRepairedCount at the same time.",
      ).optional(),
    NodeRepairConfigOverrides: z.array(NodeRepairConfigOverridesSchema)
      .describe(
        "Specify granular overrides for specific repair actions. These overrides control the repair action and the repair delay time before a node is considered eligible for repair. If you use this, you must specify all the values.",
      ).optional(),
  }).describe("The node auto repair configuration for node group.").optional(),
  WarmPoolConfig: z.object({
    Enabled: z.boolean().describe(
      "Enable or disable warm pool for the node group.",
    ).optional(),
    MaxGroupPreparedCapacity: z.number().int().min(-1).describe(
      "The maximum number of instances that are allowed to be in the warm pool.",
    ).optional(),
    MinSize: z.number().int().min(0).describe(
      "The minimum number of instances to maintain in the warm pool.",
    ).optional(),
    PoolState: z.string().describe("The desired state of warm pool instances.")
      .optional(),
    ReuseOnScaleIn: z.boolean().describe(
      "Whether to return instances to the warm pool during scale-in instead of terminating them.",
    ).optional(),
  }).describe(
    "The warm pool configuration details for the Auto Scaling group that is created for the node group.",
  ).optional(),
  Version: z.string().describe(
    "The Kubernetes version to use for your managed nodes.",
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

/** Swamp extension model for EKS Nodegroup. Registered at `@swamp/aws/eks/nodegroup`. */
export const model = {
  type: "@swamp/aws/eks/nodegroup",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "Added: WarmPoolConfig",
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
      description: "EKS Nodegroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EKS Nodegroup",
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
          "AWS::EKS::Nodegroup",
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
      description: "Get a EKS Nodegroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EKS Nodegroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EKS::Nodegroup",
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
      description: "Update a EKS Nodegroup",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EKS::Nodegroup",
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
          "AWS::EKS::Nodegroup",
          identifier,
          currentState,
          desiredState,
          [
            "CapacityType",
            "NodegroupName",
            "RemoteAccess",
            "NodeRole",
            "ClusterName",
            "InstanceTypes",
            "DiskSize",
            "AmiType",
            "Subnets",
          ],
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
      description: "Delete a EKS Nodegroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EKS Nodegroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EKS::Nodegroup",
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
      description: "Sync EKS Nodegroup state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EKS::Nodegroup",
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
