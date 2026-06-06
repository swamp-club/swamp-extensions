// Auto-generated extension model for @swamp/aws/cloudwatch/composite-alarm
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CloudWatch CompositeAlarm (AWS::CloudWatch::CompositeAlarm).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A unique identifier for the tag. The combination of tag keys and values can help you organize and categorize your resources.",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the specified tag key.",
  ),
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
  AlarmName: z.string().min(1).max(255).describe(
    "The name of the Composite Alarm",
  ).optional(),
  AlarmRule: z.string().min(1).max(10240).describe(
    "Expression which aggregates the state of other Alarms (Metric or Composite Alarms)",
  ),
  AlarmDescription: z.string().min(0).max(1024).describe(
    "The description of the alarm",
  ).optional(),
  ActionsEnabled: z.boolean().describe(
    "Indicates whether actions should be executed during any changes to the alarm state. The default is TRUE.",
  ).optional(),
  OKActions: z.array(z.string().min(1).max(1024)).describe(
    "The actions to execute when this alarm transitions to the OK state from any other state. Each action is specified as an Amazon Resource Name (ARN).",
  ).optional(),
  AlarmActions: z.array(z.string().min(1).max(1024)).describe(
    "The list of actions to execute when this alarm transitions into an ALARM state from any other state. Specify each action as an Amazon Resource Name (ARN).",
  ).optional(),
  InsufficientDataActions: z.array(z.string().min(1).max(1024)).describe(
    "The actions to execute when this alarm transitions to the INSUFFICIENT_DATA state from any other state. Each action is specified as an Amazon Resource Name (ARN).",
  ).optional(),
  ActionsSuppressor: z.string().min(1).max(1600).describe(
    "Actions will be suppressed if the suppressor alarm is in the ALARM state. ActionsSuppressor can be an AlarmName or an Amazon Resource Name (ARN) from an existing alarm.",
  ).optional(),
  ActionsSuppressorWaitPeriod: z.number().int().min(0).describe(
    "Actions will be suppressed if ExtensionPeriod is active. The length of time that actions are suppressed is in seconds.",
  ).optional(),
  ActionsSuppressorExtensionPeriod: z.number().int().min(0).describe(
    "Actions will be suppressed if WaitPeriod is active. The length of time that actions are suppressed is in seconds.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to associate with the composite alarm. You can associate as many as 50 tags with an alarm.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  AlarmName: z.string(),
  AlarmRule: z.string().optional(),
  AlarmDescription: z.string().optional(),
  ActionsEnabled: z.boolean().optional(),
  OKActions: z.array(z.string()).optional(),
  AlarmActions: z.array(z.string()).optional(),
  InsufficientDataActions: z.array(z.string()).optional(),
  ActionsSuppressor: z.string().optional(),
  ActionsSuppressorWaitPeriod: z.number().optional(),
  ActionsSuppressorExtensionPeriod: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AlarmName: z.string().min(1).max(255).describe(
    "The name of the Composite Alarm",
  ).optional(),
  AlarmRule: z.string().min(1).max(10240).describe(
    "Expression which aggregates the state of other Alarms (Metric or Composite Alarms)",
  ).optional(),
  AlarmDescription: z.string().min(0).max(1024).describe(
    "The description of the alarm",
  ).optional(),
  ActionsEnabled: z.boolean().describe(
    "Indicates whether actions should be executed during any changes to the alarm state. The default is TRUE.",
  ).optional(),
  OKActions: z.array(z.string().min(1).max(1024)).describe(
    "The actions to execute when this alarm transitions to the OK state from any other state. Each action is specified as an Amazon Resource Name (ARN).",
  ).optional(),
  AlarmActions: z.array(z.string().min(1).max(1024)).describe(
    "The list of actions to execute when this alarm transitions into an ALARM state from any other state. Specify each action as an Amazon Resource Name (ARN).",
  ).optional(),
  InsufficientDataActions: z.array(z.string().min(1).max(1024)).describe(
    "The actions to execute when this alarm transitions to the INSUFFICIENT_DATA state from any other state. Each action is specified as an Amazon Resource Name (ARN).",
  ).optional(),
  ActionsSuppressor: z.string().min(1).max(1600).describe(
    "Actions will be suppressed if the suppressor alarm is in the ALARM state. ActionsSuppressor can be an AlarmName or an Amazon Resource Name (ARN) from an existing alarm.",
  ).optional(),
  ActionsSuppressorWaitPeriod: z.number().int().min(0).describe(
    "Actions will be suppressed if ExtensionPeriod is active. The length of time that actions are suppressed is in seconds.",
  ).optional(),
  ActionsSuppressorExtensionPeriod: z.number().int().min(0).describe(
    "Actions will be suppressed if WaitPeriod is active. The length of time that actions are suppressed is in seconds.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs to associate with the composite alarm. You can associate as many as 50 tags with an alarm.",
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

/** Swamp extension model for CloudWatch CompositeAlarm. Registered at `@swamp/aws/cloudwatch/composite-alarm`. */
export const model = {
  type: "@swamp/aws/cloudwatch/composite-alarm",
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
      description: "CloudWatch CompositeAlarm resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CloudWatch CompositeAlarm",
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
          "AWS::CloudWatch::CompositeAlarm",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.AlarmName ?? g.AlarmName)?.toString() ?? "current").replace(
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
      description: "Get a CloudWatch CompositeAlarm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch CompositeAlarm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CloudWatch::CompositeAlarm",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.AlarmName ?? context.globalArgs.AlarmName)?.toString() ??
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
    update: {
      description: "Update a CloudWatch CompositeAlarm",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.AlarmName?.toString() ?? "current").replace(
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
        const identifier = existing.AlarmName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CloudWatch::CompositeAlarm",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CloudWatch::CompositeAlarm",
          identifier,
          currentState,
          desiredState,
          ["AlarmName"],
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
      description: "Delete a CloudWatch CompositeAlarm",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CloudWatch CompositeAlarm",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CloudWatch::CompositeAlarm",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.AlarmName?.toString() ?? args.identifier).replace(
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
      description: "Sync CloudWatch CompositeAlarm state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.AlarmName?.toString() ?? "current").replace(
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
        const identifier = existing.AlarmName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CloudWatch::CompositeAlarm",
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
