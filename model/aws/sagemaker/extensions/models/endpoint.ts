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

// Auto-generated extension model for @swamp/aws/sagemaker/endpoint
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker Endpoint (AWS::SageMaker::Endpoint).
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

const AlarmSchema = z.object({
  AlarmName: z.string().describe("The name of the CloudWatch alarm."),
});

const AutoRollbackConfigSchema = z.object({
  Alarms: z.array(AlarmSchema).describe(
    "List of CloudWatch alarms to monitor during the deployment. If any alarm goes off, the deployment is rolled back.",
  ),
});

const CapacitySizeSchema = z.object({
  Type: z.string().describe(
    "Specifies whether the `Value` is an instance count or a capacity unit.",
  ),
  Value: z.number().int().describe(
    "The value representing either the number of instances or the number of capacity units.",
  ),
});

const TrafficRoutingConfigSchema = z.object({
  CanarySize: CapacitySizeSchema.describe(
    "Specifies the size of the canary traffic in a canary deployment.",
  ).optional(),
  LinearStepSize: CapacitySizeSchema.describe(
    "Specifies the step size for linear traffic routing.",
  ).optional(),
  Type: z.string().describe(
    "Specifies the type of traffic routing (e.g., 'AllAtOnce', 'Canary', 'Linear').",
  ),
  WaitIntervalInSeconds: z.number().int().describe(
    "Specifies the wait interval between traffic shifts, in seconds.",
  ).optional(),
});

const BlueGreenUpdatePolicySchema = z.object({
  MaximumExecutionTimeoutInSeconds: z.number().int().describe(
    "The maximum time allowed for the blue/green update, in seconds.",
  ).optional(),
  TerminationWaitInSeconds: z.number().int().describe(
    "The wait time before terminating the old endpoint during a blue/green deployment.",
  ).optional(),
  TrafficRoutingConfiguration: TrafficRoutingConfigSchema.describe(
    "The traffic routing configuration for the blue/green deployment.",
  ),
});

const RollingUpdatePolicySchema = z.object({
  MaximumBatchSize: CapacitySizeSchema.describe(
    "Specifies the maximum batch size for each rolling update.",
  ),
  MaximumExecutionTimeoutInSeconds: z.number().int().describe(
    "The maximum time allowed for the rolling update, in seconds.",
  ).optional(),
  RollbackMaximumBatchSize: CapacitySizeSchema.describe(
    "The maximum batch size for rollback during an update failure.",
  ).optional(),
  WaitIntervalInSeconds: z.number().int().describe(
    "The time to wait between steps during the rolling update, in seconds.",
  ),
});

const VariantPropertySchema = z.object({
  VariantPropertyType: z.string().describe(
    "The type of variant property (e.g., 'DesiredInstanceCount', 'DesiredWeight', 'DataCaptureConfig').",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().describe("The key of the tag."),
  Value: z.string().describe("The value of the tag."),
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
  DeploymentConfig: z.object({
    AutoRollbackConfiguration: AutoRollbackConfigSchema.describe(
      "Configuration for automatic rollback if an error occurs during deployment.",
    ).optional(),
    BlueGreenUpdatePolicy: BlueGreenUpdatePolicySchema.describe(
      "Configuration for blue-green update deployment policies.",
    ).optional(),
    RollingUpdatePolicy: RollingUpdatePolicySchema.describe(
      "Configuration for rolling update deployment policies.",
    ).optional(),
  }).describe(
    "Specifies deployment configuration for updating the SageMaker endpoint. Includes rollback and update policies.",
  ).optional(),
  EndpointConfigName: z.string().describe(
    "The name of the endpoint configuration for the SageMaker endpoint. This is a required property.",
  ),
  ExcludeRetainedVariantProperties: z.array(VariantPropertySchema).describe(
    "Specifies a list of variant properties that you want to exclude when updating an endpoint.",
  ).optional(),
  RetainAllVariantProperties: z.boolean().describe(
    "When set to true, retains all variant properties for an endpoint when it is updated.",
  ).optional(),
  RetainDeploymentConfig: z.boolean().describe(
    "When set to true, retains the deployment configuration during endpoint updates.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  DeploymentConfig: z.object({
    AutoRollbackConfiguration: AutoRollbackConfigSchema,
    BlueGreenUpdatePolicy: BlueGreenUpdatePolicySchema,
    RollingUpdatePolicy: RollingUpdatePolicySchema,
  }).optional(),
  EndpointArn: z.string(),
  EndpointConfigName: z.string().optional(),
  EndpointName: z.string().optional(),
  ExcludeRetainedVariantProperties: z.array(VariantPropertySchema).optional(),
  RetainAllVariantProperties: z.boolean().optional(),
  RetainDeploymentConfig: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DeploymentConfig: z.object({
    AutoRollbackConfiguration: AutoRollbackConfigSchema.describe(
      "Configuration for automatic rollback if an error occurs during deployment.",
    ).optional(),
    BlueGreenUpdatePolicy: BlueGreenUpdatePolicySchema.describe(
      "Configuration for blue-green update deployment policies.",
    ).optional(),
    RollingUpdatePolicy: RollingUpdatePolicySchema.describe(
      "Configuration for rolling update deployment policies.",
    ).optional(),
  }).describe(
    "Specifies deployment configuration for updating the SageMaker endpoint. Includes rollback and update policies.",
  ).optional(),
  EndpointConfigName: z.string().describe(
    "The name of the endpoint configuration for the SageMaker endpoint. This is a required property.",
  ).optional(),
  ExcludeRetainedVariantProperties: z.array(VariantPropertySchema).describe(
    "Specifies a list of variant properties that you want to exclude when updating an endpoint.",
  ).optional(),
  RetainAllVariantProperties: z.boolean().describe(
    "When set to true, retains all variant properties for an endpoint when it is updated.",
  ).optional(),
  RetainDeploymentConfig: z.boolean().describe(
    "When set to true, retains the deployment configuration during endpoint updates.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for SageMaker Endpoint. Registered at `@swamp/aws/sagemaker/endpoint`. */
export const model = {
  type: "@swamp/aws/sagemaker/endpoint",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
      description: "SageMaker Endpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker Endpoint",
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
          "AWS::SageMaker::Endpoint",
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
      description: "Get a SageMaker Endpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Endpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::Endpoint",
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
      description: "Update a SageMaker Endpoint",
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
        const identifier = existing.EndpointArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::Endpoint",
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
          "AWS::SageMaker::Endpoint",
          identifier,
          currentState,
          desiredState,
          ["EndpointName"],
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
      description: "Delete a SageMaker Endpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker Endpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::Endpoint",
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
      description: "Sync SageMaker Endpoint state from AWS",
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
        const identifier = existing.EndpointArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::Endpoint",
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
