// Auto-generated extension model for @swamp/aws/sagemaker/mlflow-tracking-server
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SageMaker MlflowTrackingServer (AWS::SageMaker::MlflowTrackingServer).
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
  Value: z.string().max(256).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  TrackingServerName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,255}$"),
  ).describe("The name of the MLFlow Tracking Server."),
  TrackingServerSize: z.enum(["Small", "Medium", "Large"]).describe(
    "The size of the MLFlow Tracking Server.",
  ).optional(),
  MlflowVersion: z.string().min(1).max(32).regex(new RegExp("^\\d+(\\.\\d+)+$"))
    .describe("The MLFlow Version used on the MLFlow Tracking Server.")
    .optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws[a-z\\-]*:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_\\/]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role that enables Amazon SageMaker to perform tasks on behalf of the customer.",
  ),
  ArtifactStoreUri: z.string().min(1).max(2048).regex(
    new RegExp("^s3:\\/\\/([^\\/]+)\\/?(.*)$"),
  ).describe("The Amazon S3 URI for MLFlow Tracking Server artifacts."),
  AutomaticModelRegistration: z.boolean().describe(
    "A flag to enable Automatic SageMaker Model Registration.",
  ).optional(),
  WeeklyMaintenanceWindowStart: z.string().max(9).regex(
    new RegExp("^(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):([0-5]\\d)$"),
  ).describe(
    "The start of the time window for maintenance of the MLFlow Tracking Server in UTC time.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  TrackingServerName: z.string(),
  TrackingServerArn: z.string().optional(),
  TrackingServerSize: z.string().optional(),
  MlflowVersion: z.string().optional(),
  RoleArn: z.string().optional(),
  ArtifactStoreUri: z.string().optional(),
  AutomaticModelRegistration: z.boolean().optional(),
  WeeklyMaintenanceWindowStart: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  TrackingServerName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9]){0,255}$"),
  ).describe("The name of the MLFlow Tracking Server.").optional(),
  TrackingServerSize: z.enum(["Small", "Medium", "Large"]).describe(
    "The size of the MLFlow Tracking Server.",
  ).optional(),
  MlflowVersion: z.string().min(1).max(32).regex(new RegExp("^\\d+(\\.\\d+)+$"))
    .describe("The MLFlow Version used on the MLFlow Tracking Server.")
    .optional(),
  RoleArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:aws[a-z\\-]*:iam::\\d{12}:role\\/?[a-zA-Z_0-9+=,.@\\-_\\/]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of an IAM role that enables Amazon SageMaker to perform tasks on behalf of the customer.",
  ).optional(),
  ArtifactStoreUri: z.string().min(1).max(2048).regex(
    new RegExp("^s3:\\/\\/([^\\/]+)\\/?(.*)$"),
  ).describe("The Amazon S3 URI for MLFlow Tracking Server artifacts.")
    .optional(),
  AutomaticModelRegistration: z.boolean().describe(
    "A flag to enable Automatic SageMaker Model Registration.",
  ).optional(),
  WeeklyMaintenanceWindowStart: z.string().max(9).regex(
    new RegExp("^(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):([0-5]\\d)$"),
  ).describe(
    "The start of the time window for maintenance of the MLFlow Tracking Server in UTC time.",
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

/** Swamp extension model for SageMaker MlflowTrackingServer. Registered at `@swamp/aws/sagemaker/mlflow-tracking-server`. */
export const model = {
  type: "@swamp/aws/sagemaker/mlflow-tracking-server",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SageMaker MlflowTrackingServer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SageMaker MlflowTrackingServer",
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
          "AWS::SageMaker::MlflowTrackingServer",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.TrackingServerName ?? g.TrackingServerName)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a SageMaker MlflowTrackingServer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker MlflowTrackingServer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SageMaker::MlflowTrackingServer",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.TrackingServerName ?? context.globalArgs.TrackingServerName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
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
    update: {
      description: "Update a SageMaker MlflowTrackingServer",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.TrackingServerName?.toString() ?? "current")
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
        const identifier = existing.TrackingServerName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::SageMaker::MlflowTrackingServer",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::SageMaker::MlflowTrackingServer",
          identifier,
          currentState,
          desiredState,
          ["TrackingServerName"],
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
      description: "Delete a SageMaker MlflowTrackingServer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SageMaker MlflowTrackingServer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SageMaker::MlflowTrackingServer",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.TrackingServerName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync SageMaker MlflowTrackingServer state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.TrackingServerName?.toString() ?? "current")
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
        const identifier = existing.TrackingServerName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::SageMaker::MlflowTrackingServer",
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
