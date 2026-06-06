// Auto-generated extension model for @swamp/aws/codedeploy/deployment-config
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CodeDeploy DeploymentConfig (AWS::CodeDeploy::DeploymentConfig).
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
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const MinimumHealthyHostsPerZoneSchema = z.object({
  Value: z.number().int(),
  Type: z.string(),
});

const TimeBasedLinearSchema = z.object({
  LinearInterval: z.number().int(),
  LinearPercentage: z.number().int(),
});

const TimeBasedCanarySchema = z.object({
  CanaryPercentage: z.number().int(),
  CanaryInterval: z.number().int(),
});

const GlobalArgsSchema = z.object({
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
  ComputePlatform: z.string().describe(
    "The destination platform type for the deployment (Lambda, Server, or ECS).",
  ).optional(),
  DeploymentConfigName: z.string().describe(
    "A name for the deployment configuration. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the deployment configuration name. For more information, see Name Type.",
  ).optional(),
  MinimumHealthyHosts: z.object({
    Value: z.number().int(),
    Type: z.string(),
  }).describe(
    "The minimum number of healthy instances that should be available at any time during the deployment. There are two parameters expected in the input: type and value.",
  ).optional(),
  ZonalConfig: z.object({
    FirstZoneMonitorDurationInSeconds: z.number().int().optional(),
    MonitorDurationInSeconds: z.number().int().optional(),
    MinimumHealthyHostsPerZone: MinimumHealthyHostsPerZoneSchema.optional(),
  }).describe(
    "The zonal deployment config that specifies how the zonal deployment behaves",
  ).optional(),
  TrafficRoutingConfig: z.object({
    Type: z.string(),
    TimeBasedLinear: TimeBasedLinearSchema.optional(),
    TimeBasedCanary: TimeBasedCanarySchema.optional(),
  }).describe(
    "The configuration that specifies how the deployment traffic is routed.",
  ).optional(),
});

const StateSchema = z.object({
  ComputePlatform: z.string().optional(),
  DeploymentConfigName: z.string(),
  MinimumHealthyHosts: z.object({
    Value: z.number(),
    Type: z.string(),
  }).optional(),
  ZonalConfig: z.object({
    FirstZoneMonitorDurationInSeconds: z.number(),
    MonitorDurationInSeconds: z.number(),
    MinimumHealthyHostsPerZone: MinimumHealthyHostsPerZoneSchema,
  }).optional(),
  TrafficRoutingConfig: z.object({
    Type: z.string(),
    TimeBasedLinear: TimeBasedLinearSchema,
    TimeBasedCanary: TimeBasedCanarySchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ComputePlatform: z.string().describe(
    "The destination platform type for the deployment (Lambda, Server, or ECS).",
  ).optional(),
  DeploymentConfigName: z.string().describe(
    "A name for the deployment configuration. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the deployment configuration name. For more information, see Name Type.",
  ).optional(),
  MinimumHealthyHosts: z.object({
    Value: z.number().int().optional(),
    Type: z.string().optional(),
  }).describe(
    "The minimum number of healthy instances that should be available at any time during the deployment. There are two parameters expected in the input: type and value.",
  ).optional(),
  ZonalConfig: z.object({
    FirstZoneMonitorDurationInSeconds: z.number().int().optional(),
    MonitorDurationInSeconds: z.number().int().optional(),
    MinimumHealthyHostsPerZone: MinimumHealthyHostsPerZoneSchema.optional(),
  }).describe(
    "The zonal deployment config that specifies how the zonal deployment behaves",
  ).optional(),
  TrafficRoutingConfig: z.object({
    Type: z.string().optional(),
    TimeBasedLinear: TimeBasedLinearSchema.optional(),
    TimeBasedCanary: TimeBasedCanarySchema.optional(),
  }).describe(
    "The configuration that specifies how the deployment traffic is routed.",
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

/** Swamp extension model for CodeDeploy DeploymentConfig. Registered at `@swamp/aws/codedeploy/deployment-config`. */
export const model = {
  type: "@swamp/aws/codedeploy/deployment-config",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CodeDeploy DeploymentConfig resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CodeDeploy DeploymentConfig",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CodeDeploy::DeploymentConfig",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DeploymentConfigName ?? g.DeploymentConfigName)
            ?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a CodeDeploy DeploymentConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeDeploy DeploymentConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CodeDeploy::DeploymentConfig",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName = ((result.DeploymentConfigName ??
          context.globalArgs.DeploymentConfigName)?.toString() ??
          args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
          .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a CodeDeploy DeploymentConfig",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CodeDeploy DeploymentConfig",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CodeDeploy::DeploymentConfig",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DeploymentConfigName?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
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
      description: "Sync CodeDeploy DeploymentConfig state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DeploymentConfigName?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.DeploymentConfigName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CodeDeploy::DeploymentConfig",
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
