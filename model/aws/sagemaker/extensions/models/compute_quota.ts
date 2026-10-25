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

// Auto-generated extension model for @swamp/aws/sagemaker/compute-quota
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker ComputeQuota (AWS::SageMaker::ComputeQuota).
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

const AcceleratorPartitionConfigSchema = z.object({
  Type: z.enum([
    "mig-1g.5gb",
    "mig-1g.10gb",
    "mig-1g.18gb",
    "mig-1g.20gb",
    "mig-1g.23gb",
    "mig-1g.35gb",
    "mig-1g.45gb",
    "mig-1g.47gb",
    "mig-2g.10gb",
    "mig-2g.20gb",
    "mig-2g.35gb",
    "mig-2g.45gb",
    "mig-2g.47gb",
    "mig-3g.20gb",
    "mig-3g.40gb",
    "mig-3g.71gb",
    "mig-3g.90gb",
    "mig-3g.93gb",
    "mig-4g.20gb",
    "mig-4g.40gb",
    "mig-4g.71gb",
    "mig-4g.90gb",
    "mig-4g.93gb",
    "mig-7g.40gb",
    "mig-7g.80gb",
    "mig-7g.141gb",
    "mig-7g.180gb",
    "mig-7g.186gb",
  ]).describe(
    "MIG profile type. Service rejects MIG profiles that the chosen InstanceType does not support.",
  ),
  Count: z.number().int().min(0).max(10000000).describe(
    "The number of MIG partitions of the specified Type allocated to the team.",
  ),
});

const ComputeQuotaResourceConfigSchema = z.object({
  InstanceType: z.string().describe(
    "The cluster instance type the quota applies to (e.g., 'ml.m5.xlarge', 'ml.p5.48xlarge'). Validated by the service against the supported HyperPod instance types.",
  ),
  Count: z.number().int().min(0).max(10000000).describe(
    "The number of instances of this type allocated to the team.",
  ).optional(),
  Accelerators: z.number().int().min(0).max(10000000).describe(
    "The number of accelerators (e.g., GPUs) of this type allocated to the team. SageMaker auto-fills VCpu / MemoryInGiB ratio-proportionally if only this is set.",
  ).optional(),
  VCpu: z.number().min(0).max(10000000).describe(
    "The number of vCPUs allocated to the team. Floating-point. SageMaker auto-fills Accelerators / MemoryInGiB ratio-proportionally if only this is set.",
  ).optional(),
  MemoryInGiB: z.number().min(0).max(10000000).describe(
    "The memory in GiB allocated to the team. Floating-point. SageMaker auto-fills Accelerators / VCpu ratio-proportionally if only this is set.",
  ).optional(),
  AcceleratorPartition: AcceleratorPartitionConfigSchema.describe(
    "Multi-instance GPU (MIG) partition profile and count, for fractional accelerator allocation. Service rejects MIG profiles that the chosen InstanceType does not support.",
  ).optional(),
});

const ResourceSharingConfigSchema = z.object({
  Strategy: z.enum(["Lend", "DontLend", "LendAndBorrow"]).describe(
    "How this team participates in idle-resource sharing.",
  ),
  BorrowLimit: z.number().int().min(0).max(10000).describe(
    "Maximum percentage of the team's idle quota that can be borrowed by other teams. Smithy admits 0..10000; in practice the service-documented operational range is 1..500. Defaults service-side to 50 when omitted on Create.",
  ).optional(),
  AbsoluteBorrowLimits: z.array(ComputeQuotaResourceConfigSchema).describe(
    "Per-instance-type absolute caps on resources this team can borrow.",
  ).optional(),
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
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe("The name of the compute allocation definition."),
  Description: z.string().min(0).max(1024).regex(
    new RegExp("^[\\p{L}\\p{M}\\p{Z}\\p{S}\\p{N}\\p{P}]*$", "u"),
  ).describe("A free-form description of the compute allocation definition.")
    .optional(),
  ClusterArn: z.string().min(20).max(256).regex(
    new RegExp(
      "^arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:cluster/[a-z0-9]{12}$",
    ),
  ).describe(
    "The ARN of the EKS-orchestrated SageMaker HyperPod cluster the compute allocation definition is bound to. Slurm-orchestrated clusters are rejected by the service.",
  ),
  ComputeQuotaConfig: z.object({
    ComputeQuotaResources: z.array(ComputeQuotaResourceConfigSchema).describe(
      "Per-instance-type compute quotas for the team. When VCpu / MemoryInGiB / Accelerators are partially specified, SageMaker auto-fills the remaining fields ratio-proportionally to the underlying instance — Read may return values the customer did not supply (drift may flag this).",
    ).optional(),
    ResourceSharingConfig: ResourceSharingConfigSchema.describe(
      "Idle-resource-sharing strategy for this team's quota. When omitted, the service applies defaults (Strategy=LendAndBorrow, BorrowLimit=50).",
    ).optional(),
    PreemptTeamTasks: z.enum(["Never", "LowerPriority"]).describe(
      "Team-task preemption policy. Defaults service-side to 'LowerPriority' when omitted on Create.",
    ).optional(),
  }).describe(
    "Compute allocation rules: per-resource quotas, idle-borrowing strategy, and team-task preemption policy.",
  ),
  ComputeQuotaTarget: z.object({
    TeamName: z.string().regex(
      new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9]){0,39}?$"),
    ).describe(
      "The name of the team. Materialized as Kubernetes namespace 'hyperpod-ns-' on the EKS cluster, so the value must satisfy RFC 1123 namespace constraints. Reassignment is not supported (createOnly).",
    ),
    FairShareWeight: z.number().int().min(0).max(100).describe(
      "Relative fair-share weight when fair-share scheduling is enabled on the parent ClusterSchedulerConfig. Defaults service-side to 0 when omitted.",
    ).optional(),
  }).describe("The team this compute allocation rule applies to."),
  ActivationState: z.enum(["Enabled", "Disabled"]).describe(
    "Whether the compute allocation rule is active. Defaults service-side to 'Enabled' when omitted on Create.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to associate with the compute allocation definition.",
  ).optional(),
});

const StateSchema = z.object({
  ComputeQuotaArn: z.string(),
  ComputeQuotaId: z.string().optional(),
  ComputeQuotaVersion: z.number().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  ClusterArn: z.string().optional(),
  ComputeQuotaConfig: z.object({
    ComputeQuotaResources: z.array(ComputeQuotaResourceConfigSchema),
    ResourceSharingConfig: ResourceSharingConfigSchema,
    PreemptTeamTasks: z.string(),
  }).optional(),
  ComputeQuotaTarget: z.object({
    TeamName: z.string(),
    FairShareWeight: z.number(),
  }).optional(),
  ActivationState: z.string().optional(),
  Status: z.string().optional(),
  CreationTime: z.string().optional(),
  LastModifiedTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,62}$"),
  ).describe("The name of the compute allocation definition.").optional(),
  Description: z.string().min(0).max(1024).regex(
    new RegExp("^[\\p{L}\\p{M}\\p{Z}\\p{S}\\p{N}\\p{P}]*$", "u"),
  ).describe("A free-form description of the compute allocation definition.")
    .optional(),
  ClusterArn: z.string().min(20).max(256).regex(
    new RegExp(
      "^arn:aws[a-z\\-]*:sagemaker:[a-z0-9\\-]*:[0-9]{12}:cluster/[a-z0-9]{12}$",
    ),
  ).describe(
    "The ARN of the EKS-orchestrated SageMaker HyperPod cluster the compute allocation definition is bound to. Slurm-orchestrated clusters are rejected by the service.",
  ).optional(),
  ComputeQuotaConfig: z.object({
    ComputeQuotaResources: z.array(ComputeQuotaResourceConfigSchema).describe(
      "Per-instance-type compute quotas for the team. When VCpu / MemoryInGiB / Accelerators are partially specified, SageMaker auto-fills the remaining fields ratio-proportionally to the underlying instance — Read may return values the customer did not supply (drift may flag this).",
    ).optional(),
    ResourceSharingConfig: ResourceSharingConfigSchema.describe(
      "Idle-resource-sharing strategy for this team's quota. When omitted, the service applies defaults (Strategy=LendAndBorrow, BorrowLimit=50).",
    ).optional(),
    PreemptTeamTasks: z.enum(["Never", "LowerPriority"]).describe(
      "Team-task preemption policy. Defaults service-side to 'LowerPriority' when omitted on Create.",
    ).optional(),
  }).describe(
    "Compute allocation rules: per-resource quotas, idle-borrowing strategy, and team-task preemption policy.",
  ).optional(),
  ComputeQuotaTarget: z.object({
    TeamName: z.string().regex(
      new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9]){0,39}?$"),
    ).describe(
      "The name of the team. Materialized as Kubernetes namespace 'hyperpod-ns-' on the EKS cluster, so the value must satisfy RFC 1123 namespace constraints. Reassignment is not supported (createOnly).",
    ).optional(),
    FairShareWeight: z.number().int().min(0).max(100).describe(
      "Relative fair-share weight when fair-share scheduling is enabled on the parent ClusterSchedulerConfig. Defaults service-side to 0 when omitted.",
    ).optional(),
  }).describe("The team this compute allocation rule applies to.").optional(),
  ActivationState: z.enum(["Enabled", "Disabled"]).describe(
    "Whether the compute allocation rule is active. Defaults service-side to 'Enabled' when omitted on Create.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Tags to associate with the compute allocation definition.",
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

/** Swamp extension model for SageMaker ComputeQuota. Registered at `@swamp/aws/sagemaker/compute-quota`. */
export const model = {
  type: "@swamp/aws/sagemaker/compute-quota",
  version: "2026.10.25.1",
  upgrades: [
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker ComputeQuota resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker ComputeQuota",
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
          "AWS::SageMaker::ComputeQuota",
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
      description: "Get a SageMaker ComputeQuota",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker ComputeQuota",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::ComputeQuota",
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
      description: "Update a SageMaker ComputeQuota",
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
        const identifier = existing.ComputeQuotaArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::ComputeQuota",
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
          "AWS::SageMaker::ComputeQuota",
          identifier,
          currentState,
          desiredState,
          ["Name", "ClusterArn", "ComputeQuotaTarget/TeamName"],
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
      description: "Delete a SageMaker ComputeQuota",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker ComputeQuota",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::ComputeQuota",
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
      description: "Sync SageMaker ComputeQuota state from AWS",
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
        const identifier = existing.ComputeQuotaArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::ComputeQuota",
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
      description: "List SageMaker ComputeQuota resources",
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
          "AWS::SageMaker::ComputeQuota",
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
            (item.properties?.ComputeQuotaArn?.toString() ?? item.identifier)
              .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
