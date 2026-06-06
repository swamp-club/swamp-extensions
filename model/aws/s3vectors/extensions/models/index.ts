// Auto-generated extension model for @swamp/aws/s3vectors/index
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for S3Vectors Index (AWS::S3Vectors::Index).
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
    "Tag key must be between 1 to 128 characters in length. Tag key cannot start with 'aws:' and can only contain alphanumeric characters, spaces, _,., /, =, +, -, and @.",
  ),
  Value: z.string().max(256).describe(
    "Tag value must be between 0 to 256 characters in length. Tag value can only contain alphanumeric characters, spaces, _,., /, =, +, -, and @.",
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
  DataType: z.enum(["float32"]).describe(
    "The data type of the vectors to be inserted into the vector index.",
  ),
  Dimension: z.number().int().min(1).max(4096).describe(
    "The dimensions of the vectors to be inserted into the vector index.",
  ),
  DistanceMetric: z.enum(["cosine", "euclidean"]).describe(
    "The distance metric to be used for similarity search.",
  ),
  EncryptionConfiguration: z.object({
    SseType: z.enum(["AES256", "aws:kms"]).describe(
      "Defines the server-side encryption type for index encryption configuration. Defaults to the parent vector bucket's encryption settings when unspecified.",
    ).optional(),
    KmsKeyArn: z.string().min(1).max(2048).regex(
      new RegExp("^(arn:aws[-a-z0-9]*:kms:[-a-z0-9]*:[0-9]{12}:key/.+)$"),
    ).describe(
      "AWS Key Management Service (KMS) customer managed key ID to use for the encryption configuration. This parameter is allowed if and only if sseType is set to aws:kms",
    ).optional(),
  }).describe("The encryption configuration for the index.").optional(),
  IndexName: z.string().min(3).max(63).describe(
    "The name of the vector index to create.",
  ).optional(),
  MetadataConfiguration: z.object({
    NonFilterableMetadataKeys: z.array(z.string().min(1).max(63)).describe(
      "Non-filterable metadata keys allow you to enrich vectors with additional context during storage and retrieval. Unlike default metadata keys, these keys cannot be used as query filters. Non-filterable metadata keys can be retrieved but cannot be searched, queried, or filtered. You can access non-filterable metadata keys of your vectors after finding the vectors.",
    ).optional(),
  }).describe("The metadata configuration for the vector index.").optional(),
  VectorBucketArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the vector bucket.",
  ).optional(),
  VectorBucketName: z.string().min(3).max(63).describe(
    "The name of the vector bucket that contains the vector index.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "User tags (key-value pairs) to associate with the index.",
  ).optional(),
});

const StateSchema = z.object({
  CreationTime: z.string().optional(),
  DataType: z.string().optional(),
  Dimension: z.number().optional(),
  DistanceMetric: z.string().optional(),
  EncryptionConfiguration: z.object({
    SseType: z.string(),
    KmsKeyArn: z.string(),
  }).optional(),
  IndexArn: z.string(),
  IndexName: z.string().optional(),
  MetadataConfiguration: z.object({
    NonFilterableMetadataKeys: z.array(z.string()),
  }).optional(),
  VectorBucketArn: z.string().optional(),
  VectorBucketName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DataType: z.enum(["float32"]).describe(
    "The data type of the vectors to be inserted into the vector index.",
  ).optional(),
  Dimension: z.number().int().min(1).max(4096).describe(
    "The dimensions of the vectors to be inserted into the vector index.",
  ).optional(),
  DistanceMetric: z.enum(["cosine", "euclidean"]).describe(
    "The distance metric to be used for similarity search.",
  ).optional(),
  EncryptionConfiguration: z.object({
    SseType: z.enum(["AES256", "aws:kms"]).describe(
      "Defines the server-side encryption type for index encryption configuration. Defaults to the parent vector bucket's encryption settings when unspecified.",
    ).optional(),
    KmsKeyArn: z.string().min(1).max(2048).regex(
      new RegExp("^(arn:aws[-a-z0-9]*:kms:[-a-z0-9]*:[0-9]{12}:key/.+)$"),
    ).describe(
      "AWS Key Management Service (KMS) customer managed key ID to use for the encryption configuration. This parameter is allowed if and only if sseType is set to aws:kms",
    ).optional(),
  }).describe("The encryption configuration for the index.").optional(),
  IndexName: z.string().min(3).max(63).describe(
    "The name of the vector index to create.",
  ).optional(),
  MetadataConfiguration: z.object({
    NonFilterableMetadataKeys: z.array(z.string().min(1).max(63)).describe(
      "Non-filterable metadata keys allow you to enrich vectors with additional context during storage and retrieval. Unlike default metadata keys, these keys cannot be used as query filters. Non-filterable metadata keys can be retrieved but cannot be searched, queried, or filtered. You can access non-filterable metadata keys of your vectors after finding the vectors.",
    ).optional(),
  }).describe("The metadata configuration for the vector index.").optional(),
  VectorBucketArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the vector bucket.",
  ).optional(),
  VectorBucketName: z.string().min(3).max(63).describe(
    "The name of the vector bucket that contains the vector index.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "User tags (key-value pairs) to associate with the index.",
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

/** Swamp extension model for S3Vectors Index. Registered at `@swamp/aws/s3vectors/index`. */
export const model = {
  type: "@swamp/aws/s3vectors/index",
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
      description: "S3Vectors Index resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3Vectors Index",
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
          "AWS::S3Vectors::Index",
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
      description: "Get a S3Vectors Index",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Vectors Index",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::S3Vectors::Index",
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
      description: "Update a S3Vectors Index",
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
        const identifier = existing.IndexArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::S3Vectors::Index",
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
          "AWS::S3Vectors::Index",
          identifier,
          currentState,
          desiredState,
          [
            "DataType",
            "Dimension",
            "DistanceMetric",
            "EncryptionConfiguration",
            "IndexName",
            "MetadataConfiguration",
            "VectorBucketArn",
            "VectorBucketName",
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
      description: "Delete a S3Vectors Index",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3Vectors Index",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::S3Vectors::Index",
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
      description: "Sync S3Vectors Index state from AWS",
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
        const identifier = existing.IndexArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::S3Vectors::Index",
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
