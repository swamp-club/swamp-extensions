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

// Auto-generated extension model for @swamp/aws/gamelift/game-server-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for GameLift GameServerGroup (AWS::GameLift::GameServerGroup).
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

const TargetTrackingConfigurationSchema = z.object({
  TargetValue: z.number().describe(
    "Desired value to use with a game server group target-based scaling policy.",
  ),
});

const InstanceDefinitionSchema = z.object({
  InstanceType: z.string().describe("An EC2 instance type designation."),
  WeightedCapacity: z.string().regex(
    new RegExp("^[\\u0031-\\u0039][\\u0030-\\u0039]{0,2}$"),
  ).describe(
    "Instance weighting that indicates how much this instance type contributes to the total capacity of a game server group.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().describe(
    "The key for a developer-defined key:value pair for tagging an AWS resource.",
  ).optional(),
  Value: z.string().describe(
    "The value for a developer-defined key:value pair for tagging an AWS resource.",
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
  AutoScalingPolicy: z.object({
    EstimatedInstanceWarmup: z.number().describe(
      "Length of time, in seconds, it takes for a new instance to start new game server processes and register with GameLift FleetIQ.",
    ).optional(),
    TargetTrackingConfiguration: TargetTrackingConfigurationSchema.describe(
      "Settings for a target-based scaling policy applied to Auto Scaling group.",
    ),
  }).describe(
    "Configuration settings to define a scaling policy for the Auto Scaling group that is optimized for game hosting. Updating this game server group property will not take effect for the created EC2 Auto Scaling group, please update the EC2 Auto Scaling group directly after creating the resource.",
  ).optional(),
  BalancingStrategy: z.enum(["SPOT_ONLY", "SPOT_PREFERRED", "ON_DEMAND_ONLY"])
    .describe(
      "The fallback balancing method to use for the game server group when Spot Instances in a Region become unavailable or are not viable for game hosting.",
    ).optional(),
  DeleteOption: z.enum(["SAFE_DELETE", "FORCE_DELETE", "RETAIN"]).describe(
    "The type of delete to perform.",
  ).optional(),
  GameServerGroupName: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z0-9-\\.]+"),
  ).describe("An identifier for the new game server group."),
  GameServerProtectionPolicy: z.enum(["NO_PROTECTION", "FULL_PROTECTION"])
    .describe(
      "A flag that indicates whether instances in the game server group are protected from early termination.",
    ).optional(),
  InstanceDefinitions: z.array(InstanceDefinitionSchema).describe(
    "A set of EC2 instance types to use when creating instances in the group.",
  ),
  LaunchTemplate: z.object({
    LaunchTemplateId: z.string().describe(
      "A unique identifier for an existing EC2 launch template.",
    ).optional(),
    LaunchTemplateName: z.string().describe(
      "A readable identifier for an existing EC2 launch template.",
    ).optional(),
    Version: z.string().describe(
      "The version of the EC2 launch template to use.",
    ).optional(),
  }).describe(
    "The EC2 launch template that contains configuration settings and game server code to be deployed to all instances in the game server group. Updating this game server group property will not take effect for the created EC2 Auto Scaling group, please update the EC2 Auto Scaling group directly after creating the resource.",
  ).optional(),
  MaxSize: z.number().min(1).describe(
    "The maximum number of instances allowed in the EC2 Auto Scaling group. Updating this game server group property will not take effect for the created EC2 Auto Scaling group, please update the EC2 Auto Scaling group directly after creating the resource.",
  ).optional(),
  MinSize: z.number().min(0).describe(
    "The minimum number of instances allowed in the EC2 Auto Scaling group. Updating this game server group property will not take effect for the created EC2 Auto Scaling group, please update the EC2 Auto Scaling group directly after creating the resource.",
  ).optional(),
  RoleArn: z.string().min(1).max(256).regex(
    new RegExp("^arn:.*:role\\/[\\w+=,.@-]+"),
  ).describe(
    "The Amazon Resource Name (ARN) for an IAM role that allows Amazon GameLift to access your EC2 Auto Scaling groups.",
  ),
  Tags: z.array(TagSchema).describe(
    "A list of labels to assign to the new game server group resource. Updating game server group tags with CloudFormation will not take effect. Please update this property using AWS GameLift APIs instead.",
  ).optional(),
  VpcSubnets: z.array(
    z.string().min(15).max(24).regex(new RegExp("^subnet-[0-9a-z]+$")),
  ).describe(
    "A list of virtual private cloud (VPC) subnets to use with instances in the game server group. Updating this game server group property will not take effect for the created EC2 Auto Scaling group, please update the EC2 Auto Scaling group directly after creating the resource.",
  ).optional(),
});

const StateSchema = z.object({
  AutoScalingGroupArn: z.string().optional(),
  AutoScalingPolicy: z.object({
    EstimatedInstanceWarmup: z.number(),
    TargetTrackingConfiguration: TargetTrackingConfigurationSchema,
  }).optional(),
  BalancingStrategy: z.string().optional(),
  DeleteOption: z.string().optional(),
  GameServerGroupArn: z.string(),
  GameServerGroupName: z.string().optional(),
  GameServerProtectionPolicy: z.string().optional(),
  InstanceDefinitions: z.array(InstanceDefinitionSchema).optional(),
  LaunchTemplate: z.object({
    LaunchTemplateId: z.string(),
    LaunchTemplateName: z.string(),
    Version: z.string(),
  }).optional(),
  MaxSize: z.number().optional(),
  MinSize: z.number().optional(),
  RoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  VpcSubnets: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AutoScalingPolicy: z.object({
    EstimatedInstanceWarmup: z.number().describe(
      "Length of time, in seconds, it takes for a new instance to start new game server processes and register with GameLift FleetIQ.",
    ).optional(),
    TargetTrackingConfiguration: TargetTrackingConfigurationSchema.describe(
      "Settings for a target-based scaling policy applied to Auto Scaling group.",
    ).optional(),
  }).describe(
    "Configuration settings to define a scaling policy for the Auto Scaling group that is optimized for game hosting. Updating this game server group property will not take effect for the created EC2 Auto Scaling group, please update the EC2 Auto Scaling group directly after creating the resource.",
  ).optional(),
  BalancingStrategy: z.enum(["SPOT_ONLY", "SPOT_PREFERRED", "ON_DEMAND_ONLY"])
    .describe(
      "The fallback balancing method to use for the game server group when Spot Instances in a Region become unavailable or are not viable for game hosting.",
    ).optional(),
  DeleteOption: z.enum(["SAFE_DELETE", "FORCE_DELETE", "RETAIN"]).describe(
    "The type of delete to perform.",
  ).optional(),
  GameServerGroupName: z.string().min(1).max(128).regex(
    new RegExp("[a-zA-Z0-9-\\.]+"),
  ).describe("An identifier for the new game server group.").optional(),
  GameServerProtectionPolicy: z.enum(["NO_PROTECTION", "FULL_PROTECTION"])
    .describe(
      "A flag that indicates whether instances in the game server group are protected from early termination.",
    ).optional(),
  InstanceDefinitions: z.array(InstanceDefinitionSchema).describe(
    "A set of EC2 instance types to use when creating instances in the group.",
  ).optional(),
  LaunchTemplate: z.object({
    LaunchTemplateId: z.string().describe(
      "A unique identifier for an existing EC2 launch template.",
    ).optional(),
    LaunchTemplateName: z.string().describe(
      "A readable identifier for an existing EC2 launch template.",
    ).optional(),
    Version: z.string().describe(
      "The version of the EC2 launch template to use.",
    ).optional(),
  }).describe(
    "The EC2 launch template that contains configuration settings and game server code to be deployed to all instances in the game server group. Updating this game server group property will not take effect for the created EC2 Auto Scaling group, please update the EC2 Auto Scaling group directly after creating the resource.",
  ).optional(),
  MaxSize: z.number().min(1).describe(
    "The maximum number of instances allowed in the EC2 Auto Scaling group. Updating this game server group property will not take effect for the created EC2 Auto Scaling group, please update the EC2 Auto Scaling group directly after creating the resource.",
  ).optional(),
  MinSize: z.number().min(0).describe(
    "The minimum number of instances allowed in the EC2 Auto Scaling group. Updating this game server group property will not take effect for the created EC2 Auto Scaling group, please update the EC2 Auto Scaling group directly after creating the resource.",
  ).optional(),
  RoleArn: z.string().min(1).max(256).regex(
    new RegExp("^arn:.*:role\\/[\\w+=,.@-]+"),
  ).describe(
    "The Amazon Resource Name (ARN) for an IAM role that allows Amazon GameLift to access your EC2 Auto Scaling groups.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of labels to assign to the new game server group resource. Updating game server group tags with CloudFormation will not take effect. Please update this property using AWS GameLift APIs instead.",
  ).optional(),
  VpcSubnets: z.array(
    z.string().min(15).max(24).regex(new RegExp("^subnet-[0-9a-z]+$")),
  ).describe(
    "A list of virtual private cloud (VPC) subnets to use with instances in the game server group. Updating this game server group property will not take effect for the created EC2 Auto Scaling group, please update the EC2 Auto Scaling group directly after creating the resource.",
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

/** Swamp extension model for GameLift GameServerGroup. Registered at `@swamp/aws/gamelift/game-server-group`. */
export const model = {
  type: "@swamp/aws/gamelift/game-server-group",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GameLift GameServerGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GameLift GameServerGroup",
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
          "AWS::GameLift::GameServerGroup",
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
      description: "Get a GameLift GameServerGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GameLift GameServerGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::GameLift::GameServerGroup",
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
      description: "Update a GameLift GameServerGroup",
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
        const identifier = existing.GameServerGroupArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::GameLift::GameServerGroup",
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
          "AWS::GameLift::GameServerGroup",
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
      description: "Delete a GameLift GameServerGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GameLift GameServerGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::GameLift::GameServerGroup",
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
      description: "Sync GameLift GameServerGroup state from AWS",
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
        const identifier = existing.GameServerGroupArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::GameLift::GameServerGroup",
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
