// Auto-generated extension model for @swamp/aws/observabilityadmin/telemetry-pipelines
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ObservabilityAdmin TelemetryPipelines (AWS::ObservabilityAdmin::TelemetryPipelines).
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

const TelemetryPipelineConfigurationSchema = z.object({
  Body: z.string().min(1).max(24000),
});

const TelemetryPipelineStatusReasonSchema = z.object({
  Description: z.string().optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
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
  Configuration: z.object({
    Body: z.string().min(1).max(24000),
  }),
  Name: z.string().min(3).max(28).regex(new RegExp("[a-z][a-z0-9\\-]+"))
    .optional(),
  Pipeline: z.object({
    CreatedTimeStamp: z.number().optional(),
    LastUpdateTimeStamp: z.number().optional(),
    Name: z.string().min(3).max(28).regex(new RegExp("[a-z][a-z0-9\\-]+"))
      .optional(),
    Configuration: TelemetryPipelineConfigurationSchema.optional(),
    StatusReason: TelemetryPipelineStatusReasonSchema.optional(),
    Tags: z.array(TagSchema).describe(
      "An array of key-value pairs to apply to this resource",
    ).optional(),
  }).optional(),
  StatusReason: z.object({
    Description: z.string().optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Configuration: TelemetryPipelineConfigurationSchema.optional(),
  Name: z.string().optional(),
  Pipeline: z.object({
    CreatedTimeStamp: z.number(),
    LastUpdateTimeStamp: z.number(),
    Arn: z.string(),
    Name: z.string(),
    Configuration: TelemetryPipelineConfigurationSchema,
    Status: z.string(),
    StatusReason: TelemetryPipelineStatusReasonSchema,
    Tags: z.array(TagSchema),
  }).optional(),
  PipelineIdentifier: z.string(),
  Status: z.string().optional(),
  StatusReason: TelemetryPipelineStatusReasonSchema.optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Configuration: z.object({
    Body: z.string().min(1).max(24000).optional(),
  }).optional(),
  Name: z.string().min(3).max(28).regex(new RegExp("[a-z][a-z0-9\\-]+"))
    .optional(),
  Pipeline: z.object({
    CreatedTimeStamp: z.number().optional(),
    LastUpdateTimeStamp: z.number().optional(),
    Name: z.string().min(3).max(28).regex(new RegExp("[a-z][a-z0-9\\-]+"))
      .optional(),
    Configuration: TelemetryPipelineConfigurationSchema.optional(),
    StatusReason: TelemetryPipelineStatusReasonSchema.optional(),
    Tags: z.array(TagSchema).describe(
      "An array of key-value pairs to apply to this resource",
    ).optional(),
  }).optional(),
  StatusReason: z.object({
    Description: z.string().optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource",
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

/** Swamp extension model for ObservabilityAdmin TelemetryPipelines. Registered at `@swamp/aws/observabilityadmin/telemetry-pipelines`. */
export const model = {
  type: "@swamp/aws/observabilityadmin/telemetry-pipelines",
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
      description: "ObservabilityAdmin TelemetryPipelines resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ObservabilityAdmin TelemetryPipelines",
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
          "AWS::ObservabilityAdmin::TelemetryPipelines",
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
      description: "Get a ObservabilityAdmin TelemetryPipelines",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ObservabilityAdmin TelemetryPipelines",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ObservabilityAdmin::TelemetryPipelines",
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
      description: "Update a ObservabilityAdmin TelemetryPipelines",
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
        const identifier = existing.PipelineIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ObservabilityAdmin::TelemetryPipelines",
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
          "AWS::ObservabilityAdmin::TelemetryPipelines",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a ObservabilityAdmin TelemetryPipelines",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ObservabilityAdmin TelemetryPipelines",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ObservabilityAdmin::TelemetryPipelines",
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
      description: "Sync ObservabilityAdmin TelemetryPipelines state from AWS",
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
        const identifier = existing.PipelineIdentifier?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ObservabilityAdmin::TelemetryPipelines",
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
