// Auto-generated extension model for @swamp/aws/ssm/maintenance-window-task
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SSM MaintenanceWindowTask (AWS::SSM::MaintenanceWindowTask).
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

const TargetSchema = z.object({
  Values: z.array(z.string()),
  Key: z.string(),
});

const MaintenanceWindowStepFunctionsParametersSchema = z.object({
  Input: z.string().optional(),
  Name: z.string().optional(),
});

const CloudWatchOutputConfigSchema = z.object({
  CloudWatchOutputEnabled: z.boolean().describe(
    "Enables Systems Manager to send command output to CloudWatch Logs.",
  ).optional(),
  CloudWatchLogGroupName: z.string().describe(
    "The name of the CloudWatch log group where you want to send command output.",
  ).optional(),
});

const NotificationConfigSchema = z.object({
  NotificationEvents: z.array(z.string()).optional(),
  NotificationArn: z.string(),
  NotificationType: z.string().optional(),
});

const MaintenanceWindowRunCommandParametersSchema = z.object({
  TimeoutSeconds: z.number().int().optional(),
  Comment: z.string().optional(),
  OutputS3KeyPrefix: z.string().optional(),
  Parameters: z.record(z.string(), z.unknown()).optional(),
  CloudWatchOutputConfig: CloudWatchOutputConfigSchema.optional(),
  DocumentHashType: z.string().optional(),
  ServiceRoleArn: z.string().optional(),
  NotificationConfig: NotificationConfigSchema.optional(),
  DocumentVersion: z.string().optional(),
  OutputS3BucketName: z.string().optional(),
  DocumentHash: z.string().optional(),
});

const MaintenanceWindowLambdaParametersSchema = z.object({
  Qualifier: z.string().optional(),
  Payload: z.string().optional(),
  ClientContext: z.string().optional(),
});

const MaintenanceWindowAutomationParametersSchema = z.object({
  Parameters: z.record(z.string(), z.unknown()).optional(),
  DocumentVersion: z.string().optional(),
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
  MaxErrors: z.string().describe(
    "The maximum number of errors allowed before this task stops being scheduled.",
  ).optional(),
  Description: z.string().describe("A description of the task.").optional(),
  ServiceRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM service role for AWS Systems Manager to assume when running a maintenance window task.",
  ).optional(),
  Priority: z.number().int().describe(
    "The priority of the task in the maintenance window. The lower the number, the higher the priority. Tasks that have the same priority are scheduled in parallel.",
  ),
  MaxConcurrency: z.string().describe(
    "The maximum number of targets this task can be run for, in parallel.",
  ).optional(),
  Targets: z.array(TargetSchema).describe(
    "The targets (either instances or window target ids).",
  ).optional(),
  Name: z.string().describe("The task name.").optional(),
  TaskArn: z.string().describe(
    "The resource that the task uses during execution.",
  ),
  TaskInvocationParameters: z.object({
    MaintenanceWindowStepFunctionsParameters:
      MaintenanceWindowStepFunctionsParametersSchema.optional(),
    MaintenanceWindowRunCommandParameters:
      MaintenanceWindowRunCommandParametersSchema.optional(),
    MaintenanceWindowLambdaParameters: MaintenanceWindowLambdaParametersSchema
      .optional(),
    MaintenanceWindowAutomationParameters:
      MaintenanceWindowAutomationParametersSchema.optional(),
  }).describe(
    "The parameters to pass to the task when it runs. Populate only the fields that match the task type. All other fields should be empty.",
  ).optional(),
  WindowId: z.string().describe(
    "The ID of the maintenance window where the task is registered.",
  ),
  TaskParameters: z.record(z.string(), z.unknown()).describe(
    "The parameters to pass to the task when it runs.",
  ).optional(),
  TaskType: z.string().describe("The type of task."),
  CutoffBehavior: z.string().describe(
    "The specification for whether tasks should continue to run after the cutoff time specified in the maintenance windows is reached.",
  ).optional(),
  LoggingInfo: z.object({
    Region: z.string(),
    S3Prefix: z.string().optional(),
    S3Bucket: z.string(),
  }).describe(
    "Information about an Amazon S3 bucket to write Run Command task-level logs to.",
  ).optional(),
});

const StateSchema = z.object({
  MaxErrors: z.string().optional(),
  Description: z.string().optional(),
  ServiceRoleArn: z.string().optional(),
  Priority: z.number().optional(),
  MaxConcurrency: z.string().optional(),
  Targets: z.array(TargetSchema).optional(),
  Name: z.string().optional(),
  TaskArn: z.string().optional(),
  TaskInvocationParameters: z.object({
    MaintenanceWindowStepFunctionsParameters:
      MaintenanceWindowStepFunctionsParametersSchema,
    MaintenanceWindowRunCommandParameters:
      MaintenanceWindowRunCommandParametersSchema,
    MaintenanceWindowLambdaParameters: MaintenanceWindowLambdaParametersSchema,
    MaintenanceWindowAutomationParameters:
      MaintenanceWindowAutomationParametersSchema,
  }).optional(),
  WindowId: z.string(),
  TaskParameters: z.record(z.string(), z.unknown()).optional(),
  TaskType: z.string().optional(),
  CutoffBehavior: z.string().optional(),
  WindowTaskId: z.string(),
  LoggingInfo: z.object({
    Region: z.string(),
    S3Prefix: z.string(),
    S3Bucket: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  MaxErrors: z.string().describe(
    "The maximum number of errors allowed before this task stops being scheduled.",
  ).optional(),
  Description: z.string().describe("A description of the task.").optional(),
  ServiceRoleArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the IAM service role for AWS Systems Manager to assume when running a maintenance window task.",
  ).optional(),
  Priority: z.number().int().describe(
    "The priority of the task in the maintenance window. The lower the number, the higher the priority. Tasks that have the same priority are scheduled in parallel.",
  ).optional(),
  MaxConcurrency: z.string().describe(
    "The maximum number of targets this task can be run for, in parallel.",
  ).optional(),
  Targets: z.array(TargetSchema).describe(
    "The targets (either instances or window target ids).",
  ).optional(),
  Name: z.string().describe("The task name.").optional(),
  TaskArn: z.string().describe(
    "The resource that the task uses during execution.",
  ).optional(),
  TaskInvocationParameters: z.object({
    MaintenanceWindowStepFunctionsParameters:
      MaintenanceWindowStepFunctionsParametersSchema.optional(),
    MaintenanceWindowRunCommandParameters:
      MaintenanceWindowRunCommandParametersSchema.optional(),
    MaintenanceWindowLambdaParameters: MaintenanceWindowLambdaParametersSchema
      .optional(),
    MaintenanceWindowAutomationParameters:
      MaintenanceWindowAutomationParametersSchema.optional(),
  }).describe(
    "The parameters to pass to the task when it runs. Populate only the fields that match the task type. All other fields should be empty.",
  ).optional(),
  WindowId: z.string().describe(
    "The ID of the maintenance window where the task is registered.",
  ).optional(),
  TaskParameters: z.record(z.string(), z.unknown()).describe(
    "The parameters to pass to the task when it runs.",
  ).optional(),
  TaskType: z.string().describe("The type of task.").optional(),
  CutoffBehavior: z.string().describe(
    "The specification for whether tasks should continue to run after the cutoff time specified in the maintenance windows is reached.",
  ).optional(),
  LoggingInfo: z.object({
    Region: z.string().optional(),
    S3Prefix: z.string().optional(),
    S3Bucket: z.string().optional(),
  }).describe(
    "Information about an Amazon S3 bucket to write Run Command task-level logs to.",
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

/** Swamp extension model for SSM MaintenanceWindowTask. Registered at `@swamp/aws/ssm/maintenance-window-task`. */
export const model = {
  type: "@swamp/aws/ssm/maintenance-window-task",
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
      description: "SSM MaintenanceWindowTask resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSM MaintenanceWindowTask",
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
          "AWS::SSM::MaintenanceWindowTask",
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
      description: "Get a SSM MaintenanceWindowTask",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM MaintenanceWindowTask",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SSM::MaintenanceWindowTask",
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
      description: "Update a SSM MaintenanceWindowTask",
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
          existing.WindowId?.toString(),
          existing.WindowTaskId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::SSM::MaintenanceWindowTask",
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
          "AWS::SSM::MaintenanceWindowTask",
          identifier,
          currentState,
          desiredState,
          ["WindowId", "TaskType"],
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
      description: "Delete a SSM MaintenanceWindowTask",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM MaintenanceWindowTask",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SSM::MaintenanceWindowTask",
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
      description: "Sync SSM MaintenanceWindowTask state from AWS",
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
          existing.WindowId?.toString(),
          existing.WindowTaskId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::SSM::MaintenanceWindowTask",
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
