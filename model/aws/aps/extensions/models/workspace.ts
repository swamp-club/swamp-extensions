// Auto-generated extension model for @swamp/aws/aps/workspace
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for APS Workspace (AWS::APS::Workspace).
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

const LimitsPerLabelSetEntrySchema = z.object({
  MaxSeries: z.number().int().min(0).describe(
    "The maximum number of active series that can be ingested for this label set",
  ).optional(),
});

const LabelSchema = z.object({
  Name: z.string().min(1).regex(new RegExp("^[a-zA-Z_][a-zA-Z0-9_]*$"))
    .describe("Name of the label"),
  Value: z.string().min(1).describe("Value of the label"),
});

const LimitsPerLabelSetSchema = z.object({
  Limits: LimitsPerLabelSetEntrySchema.describe(
    "Limits that can be applied to a label set",
  ),
  LabelSet: z.array(LabelSchema).describe("An array of series labels"),
});

const CloudWatchLogDestinationSchema = z.object({
  LogGroupArn: z.string().min(0).max(512).describe(
    "The ARN of the CloudWatch Logs log group",
  ),
});

const LoggingFilterSchema = z.object({
  QspThreshold: z.number().int().min(0).describe(
    "Query logs with QSP above this limit are vended",
  ),
});

const LoggingDestinationSchema = z.object({
  CloudWatchLogs: CloudWatchLogDestinationSchema.describe(
    "Represents a cloudwatch logs destination for query logging",
  ),
  Filters: LoggingFilterSchema.describe("Filters for logging"),
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
  Alias: z.string().min(0).max(100).describe("AMP Workspace alias.").optional(),
  AlertManagerDefinition: z.string().describe(
    "The AMP Workspace alert manager definition data",
  ).optional(),
  LoggingConfiguration: z.object({
    LogGroupArn: z.string().min(0).max(512).describe("CloudWatch log group ARN")
      .optional(),
  }).describe("Logging configuration").optional(),
  WorkspaceConfiguration: z.object({
    RetentionPeriodInDays: z.number().int().min(1).describe(
      "How many days that metrics are retained in the workspace",
    ).optional(),
    LimitsPerLabelSets: z.array(LimitsPerLabelSetSchema).describe(
      "An array of label set and associated limits",
    ).optional(),
  }).describe("Workspace configuration").optional(),
  QueryLoggingConfiguration: z.object({
    Destinations: z.array(LoggingDestinationSchema).describe(
      "The destinations configuration for query logging",
    ),
  }).describe("Query logging configuration").optional(),
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[-a-z]*:kms:[-a-z0-9]+:[0-9]{12}:key/.+$"),
  ).describe("KMS Key ARN used to encrypt and decrypt AMP workspace data.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  WorkspaceId: z.string().optional(),
  Alias: z.string().optional(),
  Arn: z.string(),
  AlertManagerDefinition: z.string().optional(),
  PrometheusEndpoint: z.string().optional(),
  LoggingConfiguration: z.object({
    LogGroupArn: z.string(),
  }).optional(),
  WorkspaceConfiguration: z.object({
    RetentionPeriodInDays: z.number(),
    LimitsPerLabelSets: z.array(LimitsPerLabelSetSchema),
  }).optional(),
  QueryLoggingConfiguration: z.object({
    Destinations: z.array(LoggingDestinationSchema),
  }).optional(),
  KmsKeyArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Alias: z.string().min(0).max(100).describe("AMP Workspace alias.").optional(),
  AlertManagerDefinition: z.string().describe(
    "The AMP Workspace alert manager definition data",
  ).optional(),
  LoggingConfiguration: z.object({
    LogGroupArn: z.string().min(0).max(512).describe("CloudWatch log group ARN")
      .optional(),
  }).describe("Logging configuration").optional(),
  WorkspaceConfiguration: z.object({
    RetentionPeriodInDays: z.number().int().min(1).describe(
      "How many days that metrics are retained in the workspace",
    ).optional(),
    LimitsPerLabelSets: z.array(LimitsPerLabelSetSchema).describe(
      "An array of label set and associated limits",
    ).optional(),
  }).describe("Workspace configuration").optional(),
  QueryLoggingConfiguration: z.object({
    Destinations: z.array(LoggingDestinationSchema).describe(
      "The destinations configuration for query logging",
    ).optional(),
  }).describe("Query logging configuration").optional(),
  KmsKeyArn: z.string().min(20).max(2048).regex(
    new RegExp("^arn:aws[-a-z]*:kms:[-a-z0-9]+:[0-9]{12}:key/.+$"),
  ).describe("KMS Key ARN used to encrypt and decrypt AMP workspace data.")
    .optional(),
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

/** Swamp extension model for APS Workspace. Registered at `@swamp/aws/aps/workspace`. */
export const model = {
  type: "@swamp/aws/aps/workspace",
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
      description: "APS Workspace resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a APS Workspace",
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
          "AWS::APS::Workspace",
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
      description: "Get a APS Workspace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the APS Workspace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::APS::Workspace",
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
      description: "Update a APS Workspace",
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
          "AWS::APS::Workspace",
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
          "AWS::APS::Workspace",
          identifier,
          currentState,
          desiredState,
          ["KmsKeyArn"],
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
      description: "Delete a APS Workspace",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the APS Workspace",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::APS::Workspace",
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
      description: "Sync APS Workspace state from AWS",
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
            "AWS::APS::Workspace",
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
