// Auto-generated extension model for @swamp/aws/iotfleetwise/campaign
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for IoTFleetWise Campaign (AWS::IoTFleetWise::Campaign).
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

const SignalInformationSchema = z.object({
  MaxSampleCount: z.number().min(1).max(4294967295).optional(),
  Name: z.string().min(1).max(150).regex(
    new RegExp("^[\\w|*|-]+(\\.[\\w|*|-]+)*$"),
  ),
  MinimumSamplingIntervalMs: z.number().min(0).max(4294967295).optional(),
  DataPartitionId: z.string().min(1).max(128).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ).optional(),
});

const TimeBasedSignalFetchConfigSchema = z.object({
  ExecutionFrequencyMs: z.number().min(1),
});

const ConditionBasedSignalFetchConfigSchema = z.object({
  ConditionExpression: z.string().min(1).max(2048),
  TriggerMode: z.enum(["ALWAYS", "RISING_EDGE"]),
});

const SignalFetchInformationSchema = z.object({
  FullyQualifiedName: z.string().min(1).max(150).regex(
    new RegExp("^[a-zA-Z0-9_.]+$"),
  ),
  SignalFetchConfig: z.object({
    TimeBased: TimeBasedSignalFetchConfigSchema.optional(),
    ConditionBased: ConditionBasedSignalFetchConfigSchema.optional(),
  }),
  ConditionLanguageVersion: z.number().min(1).max(1).optional(),
  Actions: z.array(z.string().min(1).max(2048)),
});

const S3ConfigSchema = z.object({
  BucketArn: z.string().min(16).max(100).regex(
    new RegExp("^arn:(aws[a-zA-Z0-9-]*):s3:::.+$"),
  ),
  DataFormat: z.enum(["JSON", "PARQUET"]).optional(),
  StorageCompressionFormat: z.enum(["NONE", "GZIP"]).optional(),
  Prefix: z.string().min(1).max(512).regex(
    new RegExp("^[a-zA-Z0-9-_:./!*'()]+$"),
  ).optional(),
});

const TimestreamConfigSchema = z.object({
  TimestreamTableArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):timestream:[a-zA-Z0-9-]+:[0-9]{12}:database\\/[a-zA-Z0-9_.-]+\\/table\\/[a-zA-Z0-9_.-]+$",
    ),
  ),
  ExecutionRoleArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):iam::(\\d{12})?:(role((\\u002F)|(\\u002F[\\u0021-\\u007F]+\\u002F))[\\w+=,.@-]+)$",
    ),
  ),
});

const MqttTopicConfigSchema = z.object({
  MqttTopicArn: z.string().min(20).max(2048).regex(new RegExp("^arn:.*")),
  ExecutionRoleArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:(aws[a-zA-Z0-9-]*):iam::(\\d{12})?:(role((\\u002F)|(\\u002F[\\u0021-\\u007F]+\\u002F))[\\w+=,.@-]+)$",
    ),
  ),
});

const TimeBasedCollectionSchemeSchema = z.object({
  PeriodMs: z.number().min(10000).max(86400000),
});

const ConditionBasedCollectionSchemeSchema = z.object({
  MinimumTriggerIntervalMs: z.number().min(0).max(4294967295).optional(),
  Expression: z.string().min(1).max(2048),
  TriggerMode: z.enum(["ALWAYS", "RISING_EDGE"]).optional(),
  ConditionLanguageVersion: z.number().int().min(1).optional(),
});

const StorageMaximumSizeSchema = z.object({
  Unit: z.enum(["MB", "GB", "TB"]),
  Value: z.number().int().min(1).max(1073741824),
});

const StorageMinimumTimeToLiveSchema = z.object({
  Unit: z.enum(["HOURS", "DAYS", "WEEKS"]),
  Value: z.number().int().min(1).max(10000),
});

const DataPartitionStorageOptionsSchema = z.object({
  MaximumSize: StorageMaximumSizeSchema,
  MinimumTimeToLive: StorageMinimumTimeToLiveSchema,
  StorageLocation: z.string().min(1).max(4096),
});

const DataPartitionUploadOptionsSchema = z.object({
  Expression: z.string().min(1).max(2048),
  ConditionLanguageVersion: z.number().int().min(1).optional(),
});

const DataPartitionSchema = z.object({
  Id: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9]+$")),
  StorageOptions: DataPartitionStorageOptionsSchema,
  UploadOptions: DataPartitionUploadOptionsSchema.optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(0).max(256),
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
  Action: z.enum(["APPROVE", "SUSPEND", "RESUME", "UPDATE"]).optional(),
  Compression: z.enum(["OFF", "SNAPPY"]).optional(),
  Description: z.string().min(1).max(2048).regex(
    new RegExp("^[^\\u0000-\\u001F\\u007F]+$"),
  ).optional(),
  Priority: z.number().int().min(0).optional(),
  SignalsToCollect: z.array(SignalInformationSchema).optional(),
  SignalsToFetch: z.array(SignalFetchInformationSchema).optional(),
  DataDestinationConfigs: z.array(z.object({
    S3Config: S3ConfigSchema.optional(),
    TimestreamConfig: TimestreamConfigSchema.optional(),
    MqttTopicConfig: MqttTopicConfigSchema.optional(),
  })).optional(),
  StartTime: z.string().optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z\\d\\-_:]+$")),
  ExpiryTime: z.string().optional(),
  SpoolingMode: z.enum(["OFF", "TO_DISK"]).optional(),
  SignalCatalogArn: z.string(),
  PostTriggerCollectionDuration: z.number().min(0).max(4294967295).optional(),
  DataExtraDimensions: z.array(
    z.string().min(1).max(150).regex(new RegExp("^[a-zA-Z0-9_.]+$")),
  ).optional(),
  DiagnosticsMode: z.enum(["OFF", "SEND_ACTIVE_DTCS"]).optional(),
  TargetArn: z.string(),
  CollectionScheme: z.object({
    TimeBasedCollectionScheme: TimeBasedCollectionSchemeSchema.optional(),
    ConditionBasedCollectionScheme: ConditionBasedCollectionSchemeSchema
      .optional(),
  }),
  DataPartitions: z.array(DataPartitionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Status: z.string().optional(),
  Action: z.string().optional(),
  CreationTime: z.string().optional(),
  Compression: z.string().optional(),
  Description: z.string().optional(),
  Priority: z.number().optional(),
  SignalsToCollect: z.array(SignalInformationSchema).optional(),
  SignalsToFetch: z.array(SignalFetchInformationSchema).optional(),
  DataDestinationConfigs: z.array(z.object({
    S3Config: S3ConfigSchema,
    TimestreamConfig: TimestreamConfigSchema,
    MqttTopicConfig: MqttTopicConfigSchema,
  })).optional(),
  StartTime: z.string().optional(),
  Name: z.string(),
  ExpiryTime: z.string().optional(),
  LastModificationTime: z.string().optional(),
  SpoolingMode: z.string().optional(),
  SignalCatalogArn: z.string().optional(),
  PostTriggerCollectionDuration: z.number().optional(),
  DataExtraDimensions: z.array(z.string()).optional(),
  DiagnosticsMode: z.string().optional(),
  TargetArn: z.string().optional(),
  Arn: z.string().optional(),
  CollectionScheme: z.object({
    TimeBasedCollectionScheme: TimeBasedCollectionSchemeSchema,
    ConditionBasedCollectionScheme: ConditionBasedCollectionSchemeSchema,
  }).optional(),
  DataPartitions: z.array(DataPartitionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Action: z.enum(["APPROVE", "SUSPEND", "RESUME", "UPDATE"]).optional(),
  Compression: z.enum(["OFF", "SNAPPY"]).optional(),
  Description: z.string().min(1).max(2048).regex(
    new RegExp("^[^\\u0000-\\u001F\\u007F]+$"),
  ).optional(),
  Priority: z.number().int().min(0).optional(),
  SignalsToCollect: z.array(SignalInformationSchema).optional(),
  SignalsToFetch: z.array(SignalFetchInformationSchema).optional(),
  DataDestinationConfigs: z.array(z.object({
    S3Config: S3ConfigSchema.optional(),
    TimestreamConfig: TimestreamConfigSchema.optional(),
    MqttTopicConfig: MqttTopicConfigSchema.optional(),
  })).optional(),
  StartTime: z.string().optional(),
  Name: z.string().min(1).max(100).regex(new RegExp("^[a-zA-Z\\d\\-_:]+$"))
    .optional(),
  ExpiryTime: z.string().optional(),
  SpoolingMode: z.enum(["OFF", "TO_DISK"]).optional(),
  SignalCatalogArn: z.string().optional(),
  PostTriggerCollectionDuration: z.number().min(0).max(4294967295).optional(),
  DataExtraDimensions: z.array(
    z.string().min(1).max(150).regex(new RegExp("^[a-zA-Z0-9_.]+$")),
  ).optional(),
  DiagnosticsMode: z.enum(["OFF", "SEND_ACTIVE_DTCS"]).optional(),
  TargetArn: z.string().optional(),
  CollectionScheme: z.object({
    TimeBasedCollectionScheme: TimeBasedCollectionSchemeSchema.optional(),
    ConditionBasedCollectionScheme: ConditionBasedCollectionSchemeSchema
      .optional(),
  }).optional(),
  DataPartitions: z.array(DataPartitionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for IoTFleetWise Campaign. Registered at `@swamp/aws/iotfleetwise/campaign`. */
export const model = {
  type: "@swamp/aws/iotfleetwise/campaign",
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
      description: "IoTFleetWise Campaign resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTFleetWise Campaign",
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
          "AWS::IoTFleetWise::Campaign",
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
      description: "Get a IoTFleetWise Campaign",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTFleetWise Campaign",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoTFleetWise::Campaign",
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
      description: "Update a IoTFleetWise Campaign",
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
          "AWS::IoTFleetWise::Campaign",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTFleetWise::Campaign",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "TargetArn",
            "SignalCatalogArn",
            "PostTriggerCollectionDuration",
            "DiagnosticsMode",
            "SpoolingMode",
            "CollectionScheme",
            "Priority",
            "Compression",
            "StartTime",
            "ExpiryTime",
            "DataPartitions",
            "SignalsToCollect",
            "SignalsToFetch",
            "DataDestinationConfigs",
          ],
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
      description: "Delete a IoTFleetWise Campaign",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTFleetWise Campaign",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoTFleetWise::Campaign",
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
      description: "Sync IoTFleetWise Campaign state from AWS",
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
            "AWS::IoTFleetWise::Campaign",
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
