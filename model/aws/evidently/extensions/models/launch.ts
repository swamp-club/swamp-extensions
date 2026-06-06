// Auto-generated extension model for @swamp/aws/evidently/launch
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Evidently Launch (AWS::Evidently::Launch).
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

const GroupToWeightSchema = z.object({
  GroupName: z.string().min(1).max(127).regex(new RegExp("[-a-zA-Z0-9._]*")),
  SplitWeight: z.number().int(),
});

const SegmentOverrideSchema = z.object({
  Segment: z.string().min(1).max(2048).regex(
    new RegExp(
      "([-a-zA-Z0-9._]*)|(arn:[^:]*:[^:]*:[^:]*:[^:]*:segment/[-a-zA-Z0-9._]*)",
    ),
  ),
  EvaluationOrder: z.number().int(),
  Weights: z.array(GroupToWeightSchema),
});

const StepConfigSchema = z.object({
  StartTime: z.string(),
  GroupWeights: z.array(GroupToWeightSchema),
  SegmentOverrides: z.array(SegmentOverrideSchema).optional(),
});

const LaunchGroupObjectSchema = z.object({
  GroupName: z.string().min(1).max(127).regex(new RegExp("[-a-zA-Z0-9._]*")),
  Description: z.string().min(0).max(160).optional(),
  Feature: z.string(),
  Variation: z.string(),
});

const MetricDefinitionObjectSchema = z.object({
  MetricName: z.string().min(1).max(255).regex(new RegExp("^[\\S]+$")),
  EntityIdKey: z.string().describe(
    "The JSON path to reference the entity id in the event.",
  ),
  ValueKey: z.string().describe(
    "The JSON path to reference the numerical metric value in the event.",
  ),
  EventPattern: z.string().describe(
    "Event patterns have the same structure as the events they match. Rules use event patterns to select events. An event pattern either matches an event or it doesn't.",
  ).optional(),
  UnitLabel: z.string().min(1).max(256).regex(new RegExp(".*")).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
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
  Name: z.string().min(1).max(127).regex(new RegExp("[-a-zA-Z0-9._]*")),
  Project: z.string().min(0).max(2048).regex(
    new RegExp(
      "([-a-zA-Z0-9._]*)|(arn:[^:]*:[^:]*:[^:]*:[^:]*:project/[-a-zA-Z0-9._]*)",
    ),
  ),
  Description: z.string().min(0).max(160).optional(),
  RandomizationSalt: z.string().min(0).max(127).regex(new RegExp(".*"))
    .optional(),
  ScheduledSplitsConfig: z.array(StepConfigSchema),
  Groups: z.array(LaunchGroupObjectSchema),
  MetricMonitors: z.array(MetricDefinitionObjectSchema).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ExecutionStatus: z.object({
    Status: z.string().describe(
      "Provide START or STOP action to apply on a launch",
    ),
    DesiredState: z.string().describe(
      "Provide CANCELLED or COMPLETED as the launch desired state. Defaults to Completed if not provided.",
    ).optional(),
    Reason: z.string().describe(
      "Provide a reason for stopping the launch. Defaults to empty if not provided.",
    ).optional(),
  }).describe("Start or Stop Launch Launch. Default is not started.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Project: z.string().optional(),
  Description: z.string().optional(),
  RandomizationSalt: z.string().optional(),
  ScheduledSplitsConfig: z.array(StepConfigSchema).optional(),
  Groups: z.array(LaunchGroupObjectSchema).optional(),
  MetricMonitors: z.array(MetricDefinitionObjectSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  ExecutionStatus: z.object({
    Status: z.string(),
    DesiredState: z.string(),
    Reason: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(127).regex(new RegExp("[-a-zA-Z0-9._]*"))
    .optional(),
  Project: z.string().min(0).max(2048).regex(
    new RegExp(
      "([-a-zA-Z0-9._]*)|(arn:[^:]*:[^:]*:[^:]*:[^:]*:project/[-a-zA-Z0-9._]*)",
    ),
  ).optional(),
  Description: z.string().min(0).max(160).optional(),
  RandomizationSalt: z.string().min(0).max(127).regex(new RegExp(".*"))
    .optional(),
  ScheduledSplitsConfig: z.array(StepConfigSchema).optional(),
  Groups: z.array(LaunchGroupObjectSchema).optional(),
  MetricMonitors: z.array(MetricDefinitionObjectSchema).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  ExecutionStatus: z.object({
    Status: z.string().describe(
      "Provide START or STOP action to apply on a launch",
    ).optional(),
    DesiredState: z.string().describe(
      "Provide CANCELLED or COMPLETED as the launch desired state. Defaults to Completed if not provided.",
    ).optional(),
    Reason: z.string().describe(
      "Provide a reason for stopping the launch. Defaults to empty if not provided.",
    ).optional(),
  }).describe("Start or Stop Launch Launch. Default is not started.")
    .optional(),
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

/** Swamp extension model for Evidently Launch. Registered at `@swamp/aws/evidently/launch`. */
export const model = {
  type: "@swamp/aws/evidently/launch",
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
      description: "Evidently Launch resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Evidently Launch",
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
          "AWS::Evidently::Launch",
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
      description: "Get a Evidently Launch",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Evidently Launch",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Evidently::Launch",
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
      description: "Update a Evidently Launch",
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
          "AWS::Evidently::Launch",
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
          "AWS::Evidently::Launch",
          identifier,
          currentState,
          desiredState,
          ["Name", "Project"],
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
      description: "Delete a Evidently Launch",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Evidently Launch",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Evidently::Launch",
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
      description: "Sync Evidently Launch state from AWS",
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
            "AWS::Evidently::Launch",
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
