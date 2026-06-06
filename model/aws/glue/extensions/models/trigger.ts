// Auto-generated extension model for @swamp/aws/glue/trigger
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue Trigger (AWS::Glue::Trigger).
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

const NotificationPropertySchema = z.object({
  NotifyDelayAfter: z.number().int().describe(
    "After a job run starts, the number of minutes to wait before sending a job run delay notification",
  ).optional(),
});

const ActionSchema = z.object({
  NotificationProperty: NotificationPropertySchema.describe(
    "Specifies configuration properties of a job run notification.",
  ).optional(),
  CrawlerName: z.string().describe(
    "The name of the crawler to be used with this action.",
  ).optional(),
  Timeout: z.number().int().describe(
    "The JobRun timeout in minutes. This is the maximum time that a job run can consume resources before it is terminated and enters TIMEOUT status. The default is 2,880 minutes (48 hours). This overrides the timeout value set in the parent job.",
  ).optional(),
  JobName: z.string().describe("The name of a job to be executed.").optional(),
  Arguments: z.record(z.string(), z.unknown()).describe(
    "The job arguments used when this trigger fires. For this job run, they replace the default arguments set in the job definition itself.",
  ).optional(),
  SecurityConfiguration: z.string().describe(
    "The name of the SecurityConfiguration structure to be used with this action.",
  ).optional(),
});

const ConditionSchema = z.object({
  JobName: z.string().describe(
    "The name of the job whose JobRuns this condition applies to, and on which this trigger waits.",
  ).optional(),
  CrawlerName: z.string().describe(
    "The name of the crawler to which this condition applies.",
  ).optional(),
  State: z.string().describe(
    "The condition state. Currently, the values supported are SUCCEEDED, STOPPED, TIMEOUT, and FAILED.",
  ).optional(),
  CrawlState: z.string().describe(
    "The state of the crawler to which this condition applies.",
  ).optional(),
  LogicalOperator: z.string().describe("A logical operator.").optional(),
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
  Type: z.string().describe("The type of trigger that this is."),
  StartOnCreation: z.boolean().describe(
    "Set to true to start SCHEDULED and CONDITIONAL triggers when created. True is not supported for ON_DEMAND triggers.",
  ).optional(),
  Description: z.string().describe("A description of this trigger.").optional(),
  Actions: z.array(ActionSchema).describe(
    "The actions initiated by this trigger.",
  ),
  EventBatchingCondition: z.object({
    BatchSize: z.number().int().describe(
      "Number of events that must be received from Amazon EventBridge before EventBridge event trigger fires.",
    ),
    BatchWindow: z.number().int().describe(
      "Window of time in seconds after which EventBridge event trigger fires. Window starts when first event is received.",
    ).optional(),
  }).describe(
    "Batch condition that must be met (specified number of events received or batch time window expired) before EventBridge event trigger fires.",
  ).optional(),
  WorkflowName: z.string().describe(
    "The name of the workflow associated with the trigger.",
  ).optional(),
  Schedule: z.string().describe(
    "A cron expression used to specify the schedule.",
  ).optional(),
  Tags: z.record(z.string(), z.unknown()).describe(
    "The tags to use with this trigger.",
  ).optional(),
  Name: z.string().describe("The name of the trigger.").optional(),
  Predicate: z.object({
    Logical: z.string().describe(
      "An optional field if only one condition is listed. If multiple conditions are listed, then this field is required.",
    ).optional(),
    Conditions: z.array(ConditionSchema).describe(
      "A list of the conditions that determine when the trigger will fire.",
    ).optional(),
  }).describe("The predicate of this trigger, which defines when it will fire.")
    .optional(),
});

const StateSchema = z.object({
  Type: z.string().optional(),
  StartOnCreation: z.boolean().optional(),
  Description: z.string().optional(),
  Actions: z.array(ActionSchema).optional(),
  EventBatchingCondition: z.object({
    BatchSize: z.number(),
    BatchWindow: z.number(),
  }).optional(),
  WorkflowName: z.string().optional(),
  Schedule: z.string().optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  Name: z.string(),
  Predicate: z.object({
    Logical: z.string(),
    Conditions: z.array(ConditionSchema),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Type: z.string().describe("The type of trigger that this is.").optional(),
  StartOnCreation: z.boolean().describe(
    "Set to true to start SCHEDULED and CONDITIONAL triggers when created. True is not supported for ON_DEMAND triggers.",
  ).optional(),
  Description: z.string().describe("A description of this trigger.").optional(),
  Actions: z.array(ActionSchema).describe(
    "The actions initiated by this trigger.",
  ).optional(),
  EventBatchingCondition: z.object({
    BatchSize: z.number().int().describe(
      "Number of events that must be received from Amazon EventBridge before EventBridge event trigger fires.",
    ).optional(),
    BatchWindow: z.number().int().describe(
      "Window of time in seconds after which EventBridge event trigger fires. Window starts when first event is received.",
    ).optional(),
  }).describe(
    "Batch condition that must be met (specified number of events received or batch time window expired) before EventBridge event trigger fires.",
  ).optional(),
  WorkflowName: z.string().describe(
    "The name of the workflow associated with the trigger.",
  ).optional(),
  Schedule: z.string().describe(
    "A cron expression used to specify the schedule.",
  ).optional(),
  Tags: z.record(z.string(), z.unknown()).describe(
    "The tags to use with this trigger.",
  ).optional(),
  Name: z.string().describe("The name of the trigger.").optional(),
  Predicate: z.object({
    Logical: z.string().describe(
      "An optional field if only one condition is listed. If multiple conditions are listed, then this field is required.",
    ).optional(),
    Conditions: z.array(ConditionSchema).describe(
      "A list of the conditions that determine when the trigger will fire.",
    ).optional(),
  }).describe("The predicate of this trigger, which defines when it will fire.")
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

/** Swamp extension model for Glue Trigger. Registered at `@swamp/aws/glue/trigger`. */
export const model = {
  type: "@swamp/aws/glue/trigger",
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
      toVersion: "2026.05.27.1",
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
      description: "Glue Trigger resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue Trigger",
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
          "AWS::Glue::Trigger",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Glue Trigger",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Trigger",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::Trigger",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a Glue Trigger",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Glue::Trigger",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Glue::Trigger",
          identifier,
          currentState,
          desiredState,
          ["Name", "WorkflowName", "Type"],
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
      description: "Delete a Glue Trigger",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue Trigger",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::Trigger",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync Glue Trigger state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Glue::Trigger",
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
