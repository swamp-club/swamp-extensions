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

// Auto-generated extension model for @swamp/aws/emr/instance-group-config
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EMR InstanceGroupConfig (AWS::EMR::InstanceGroupConfig).
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

const SimpleScalingPolicyConfigurationSchema = z.object({
  ScalingAdjustment: z.number().int(),
  CoolDown: z.number().int().optional(),
  AdjustmentType: z.string().optional(),
});

const ScalingActionSchema = z.object({
  Market: z.string().optional(),
  SimpleScalingPolicyConfiguration: SimpleScalingPolicyConfigurationSchema,
});

const MetricDimensionSchema = z.object({
  Value: z.string(),
  Key: z.string(),
});

const CloudWatchAlarmDefinitionSchema = z.object({
  MetricName: z.string(),
  ComparisonOperator: z.string(),
  Statistic: z.string().optional(),
  Dimensions: z.array(MetricDimensionSchema).optional(),
  Period: z.number().int(),
  EvaluationPeriods: z.number().int().optional(),
  Unit: z.string().optional(),
  Namespace: z.string().optional(),
  Threshold: z.number(),
});

const ScalingTriggerSchema = z.object({
  CloudWatchAlarmDefinition: CloudWatchAlarmDefinitionSchema,
});

const ScalingRuleSchema = z.object({
  Action: ScalingActionSchema,
  Description: z.string().optional(),
  Trigger: ScalingTriggerSchema,
  Name: z.string(),
});

const ScalingConstraintsSchema = z.object({
  MinCapacity: z.number().int(),
  MaxCapacity: z.number().int(),
});

const VolumeSpecificationSchema = z.object({
  SizeInGB: z.number().int(),
  Throughput: z.number().int().optional(),
  VolumeType: z.string(),
  Iops: z.number().int().optional(),
});

const EbsBlockDeviceConfigSchema = z.object({
  VolumeSpecification: VolumeSpecificationSchema,
  VolumesPerInstance: z.number().int().describe(
    "Use of this property can confuse CloudFormation drift detection. The EbsBlockDeviceConfigs read from the system may return a list with one entry per volume, replacing any entry specified in the template with a VolumesPerInstance greater than one by that many entries containing only the VolumeSpecification. Thus to avoid false drift detection, it is recommended to supply repeated entries in EbsBlockDeviceConfigs for any VolumeSpecification which is intended to be repeated and not to use this property.",
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
  JobFlowId: z.string(),
  AutoScalingPolicy: z.object({
    Rules: z.array(ScalingRuleSchema),
    Constraints: ScalingConstraintsSchema,
  }).optional(),
  BidPrice: z.string().optional(),
  InstanceCount: z.number().int(),
  EbsConfiguration: z.object({
    EbsBlockDeviceConfigs: z.array(EbsBlockDeviceConfigSchema).optional(),
    EbsOptimized: z.boolean().optional(),
  }).optional(),
  InstanceRole: z.string(),
  CustomAmiId: z.string().optional(),
  Configurations: z.array(z.string()).optional(),
  InstanceType: z.string(),
  Market: z.string().optional(),
  Name: z.string().optional(),
});

const StateSchema = z.object({
  JobFlowId: z.string(),
  AutoScalingPolicy: z.object({
    Rules: z.array(ScalingRuleSchema),
    Constraints: ScalingConstraintsSchema,
  }).optional(),
  BidPrice: z.string().optional(),
  InstanceCount: z.number().optional(),
  EbsConfiguration: z.object({
    EbsBlockDeviceConfigs: z.array(EbsBlockDeviceConfigSchema),
    EbsOptimized: z.boolean(),
  }).optional(),
  InstanceRole: z.string().optional(),
  CustomAmiId: z.string().optional(),
  InstanceGroupId: z.string(),
  Configurations: z.array(z.string()).optional(),
  InstanceType: z.string().optional(),
  Market: z.string().optional(),
  Name: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  JobFlowId: z.string().optional(),
  AutoScalingPolicy: z.object({
    Rules: z.array(ScalingRuleSchema).optional(),
    Constraints: ScalingConstraintsSchema.optional(),
  }).optional(),
  BidPrice: z.string().optional(),
  InstanceCount: z.number().int().optional(),
  EbsConfiguration: z.object({
    EbsBlockDeviceConfigs: z.array(EbsBlockDeviceConfigSchema).optional(),
    EbsOptimized: z.boolean().optional(),
  }).optional(),
  InstanceRole: z.string().optional(),
  CustomAmiId: z.string().optional(),
  Configurations: z.array(z.string()).optional(),
  InstanceType: z.string().optional(),
  Market: z.string().optional(),
  Name: z.string().optional(),
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

/** Swamp extension model for EMR InstanceGroupConfig. Registered at `@swamp/aws/emr/instance-group-config`. */
export const model = {
  type: "@swamp/aws/emr/instance-group-config",
  version: "2026.09.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EMR InstanceGroupConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EMR InstanceGroupConfig",
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
          "AWS::EMR::InstanceGroupConfig",
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
      description: "Get a EMR InstanceGroupConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR InstanceGroupConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EMR::InstanceGroupConfig",
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
      description: "Update a EMR InstanceGroupConfig",
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
          existing.InstanceGroupId?.toString(),
          existing.JobFlowId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::EMR::InstanceGroupConfig",
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
          "AWS::EMR::InstanceGroupConfig",
          identifier,
          currentState,
          desiredState,
          [
            "InstanceRole",
            "JobFlowId",
            "Name",
            "InstanceType",
            "CustomAmiId",
            "Configurations",
            "EbsConfiguration",
            "Market",
            "BidPrice",
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
      description: "Delete a EMR InstanceGroupConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EMR InstanceGroupConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EMR::InstanceGroupConfig",
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
      description: "Sync EMR InstanceGroupConfig state from AWS",
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
          existing.InstanceGroupId?.toString(),
          existing.JobFlowId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::EMR::InstanceGroupConfig",
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
      description: "List EMR InstanceGroupConfig resources",
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
          "AWS::EMR::InstanceGroupConfig",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
