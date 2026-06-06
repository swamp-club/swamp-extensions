// Auto-generated extension model for @swamp/aws/kinesis/stream
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Kinesis Stream (AWS::Kinesis::Stream).
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
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(255).describe(
    "The value for the tag. You can specify a value that is 0 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  Name: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9_.-]+$"))
    .describe("The name of the Kinesis stream.").optional(),
  DesiredShardLevelMetrics: z.array(
    z.enum([
      "IncomingBytes",
      "IncomingRecords",
      "OutgoingBytes",
      "OutgoingRecords",
      "WriteProvisionedThroughputExceeded",
      "ReadProvisionedThroughputExceeded",
      "IteratorAgeMilliseconds",
      "ALL",
    ]),
  ).describe("The final list of shard-level metrics").optional(),
  RetentionPeriodHours: z.number().int().min(24).describe(
    "The number of hours for the data records that are stored in shards to remain accessible.",
  ).optional(),
  ShardCount: z.number().int().min(1).describe(
    "The number of shards that the stream uses. Required when StreamMode = PROVISIONED is passed.",
  ).optional(),
  StreamModeDetails: z.object({
    StreamMode: z.enum(["ON_DEMAND", "PROVISIONED"]).describe(
      "The mode of the stream",
    ),
  }).describe("The mode in which the stream is running.").optional(),
  StreamEncryption: z.object({
    EncryptionType: z.enum(["KMS"]).describe(
      "The encryption type to use. The only valid value is KMS.",
    ),
    KeyId: z.string().min(1).max(2048).describe(
      'The GUID for the customer-managed AWS KMS key to use for encryption. This value can be a globally unique identifier, a fully specified Amazon Resource Name (ARN) to either an alias or a key, or an alias name prefixed by "alias/".You can also use a master key owned by Kinesis Data Streams by specifying the alias aws/kinesis.',
    ),
  }).describe(
    "When specified, enables or updates server-side encryption using an AWS KMS key for a specified stream.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) to associate with the Kinesis stream.",
  ).optional(),
  MaxRecordSizeInKiB: z.number().int().min(1024).max(10240).describe(
    "Maximum size of a data record in KiB allowed to be put into Kinesis stream.",
  ).optional(),
  WarmThroughputMiBps: z.number().int().describe(
    "Target warm throughput in MiB/s for the stream. This property can ONLY be set when StreamMode is ON_DEMAND.",
  ).optional(),
  WarmThroughputObject: z.object({
    TargetMiBps: z.number().int().describe(
      "Target warm throughput in MiB/s that a customer can write to a stream at any given time",
    ).optional(),
    CurrentMiBps: z.number().int().describe("Current warm throughput in MiB/s")
      .optional(),
  }).describe(
    "Warm throughput configuration details for the stream. Only present for ON_DEMAND streams.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Name: z.string(),
  DesiredShardLevelMetrics: z.array(z.string()).optional(),
  RetentionPeriodHours: z.number().optional(),
  ShardCount: z.number().optional(),
  StreamModeDetails: z.object({
    StreamMode: z.string(),
  }).optional(),
  StreamEncryption: z.object({
    EncryptionType: z.string(),
    KeyId: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  MaxRecordSizeInKiB: z.number().optional(),
  WarmThroughputMiBps: z.number().optional(),
  WarmThroughputObject: z.object({
    TargetMiBps: z.number(),
    CurrentMiBps: z.number(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9_.-]+$"))
    .describe("The name of the Kinesis stream.").optional(),
  DesiredShardLevelMetrics: z.array(
    z.enum([
      "IncomingBytes",
      "IncomingRecords",
      "OutgoingBytes",
      "OutgoingRecords",
      "WriteProvisionedThroughputExceeded",
      "ReadProvisionedThroughputExceeded",
      "IteratorAgeMilliseconds",
      "ALL",
    ]),
  ).describe("The final list of shard-level metrics").optional(),
  RetentionPeriodHours: z.number().int().min(24).describe(
    "The number of hours for the data records that are stored in shards to remain accessible.",
  ).optional(),
  ShardCount: z.number().int().min(1).describe(
    "The number of shards that the stream uses. Required when StreamMode = PROVISIONED is passed.",
  ).optional(),
  StreamModeDetails: z.object({
    StreamMode: z.enum(["ON_DEMAND", "PROVISIONED"]).describe(
      "The mode of the stream",
    ).optional(),
  }).describe("The mode in which the stream is running.").optional(),
  StreamEncryption: z.object({
    EncryptionType: z.enum(["KMS"]).describe(
      "The encryption type to use. The only valid value is KMS.",
    ).optional(),
    KeyId: z.string().min(1).max(2048).describe(
      'The GUID for the customer-managed AWS KMS key to use for encryption. This value can be a globally unique identifier, a fully specified Amazon Resource Name (ARN) to either an alias or a key, or an alias name prefixed by "alias/".You can also use a master key owned by Kinesis Data Streams by specifying the alias aws/kinesis.',
    ).optional(),
  }).describe(
    "When specified, enables or updates server-side encryption using an AWS KMS key for a specified stream.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) to associate with the Kinesis stream.",
  ).optional(),
  MaxRecordSizeInKiB: z.number().int().min(1024).max(10240).describe(
    "Maximum size of a data record in KiB allowed to be put into Kinesis stream.",
  ).optional(),
  WarmThroughputMiBps: z.number().int().describe(
    "Target warm throughput in MiB/s for the stream. This property can ONLY be set when StreamMode is ON_DEMAND.",
  ).optional(),
  WarmThroughputObject: z.object({
    TargetMiBps: z.number().int().describe(
      "Target warm throughput in MiB/s that a customer can write to a stream at any given time",
    ).optional(),
    CurrentMiBps: z.number().int().describe("Current warm throughput in MiB/s")
      .optional(),
  }).describe(
    "Warm throughput configuration details for the stream. Only present for ON_DEMAND streams.",
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

/** Swamp extension model for Kinesis Stream. Registered at `@swamp/aws/kinesis/stream`. */
export const model = {
  type: "@swamp/aws/kinesis/stream",
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
      description: "Kinesis Stream resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Kinesis Stream",
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
          "AWS::Kinesis::Stream",
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
      description: "Get a Kinesis Stream",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Kinesis Stream",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Kinesis::Stream",
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
      description: "Update a Kinesis Stream",
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
          "AWS::Kinesis::Stream",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Kinesis::Stream",
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
      description: "Delete a Kinesis Stream",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Kinesis Stream",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Kinesis::Stream",
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
      description: "Sync Kinesis Stream state from AWS",
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
            "AWS::Kinesis::Stream",
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
