// Auto-generated extension model for @swamp/aws/datasync/location-s3
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataSync LocationS3 (AWS::DataSync::LocationS3).
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
  Key: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9\\s+=._:/-]+$"))
    .describe("The key for an AWS resource tag."),
  Value: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9\\s+=._:@/-]+$"),
  ).describe("The value for an AWS resource tag."),
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
  S3Config: z.object({
    BucketAccessRoleArn: z.string().max(2048).regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):iam::[0-9]{12}:role/.*$",
      ),
    ).describe("The ARN of the IAM role of the Amazon S3 bucket."),
  }).describe(
    "The Amazon Resource Name (ARN) of the AWS IAM role that is used to access an Amazon S3 bucket.",
  ),
  S3BucketArn: z.string().max(156).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):s3:[a-z\\-0-9]*:[0-9]*:.*$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the Amazon S3 bucket.")
    .optional(),
  Subdirectory: z.string().max(1024).regex(
    new RegExp("^[\\p{L}\\p{M}\\p{Z}\\p{S}\\p{N}\\p{P}\\p{C}]*$", "u"),
  ).describe(
    "A subdirectory in the Amazon S3 bucket. This subdirectory in Amazon S3 is used to read data from the S3 source location or write data to the S3 destination.",
  ).optional(),
  S3StorageClass: z.enum([
    "STANDARD",
    "STANDARD_IA",
    "ONEZONE_IA",
    "INTELLIGENT_TIERING",
    "GLACIER",
    "GLACIER_INSTANT_RETRIEVAL",
    "DEEP_ARCHIVE",
  ]).describe(
    "The Amazon S3 storage class you want to store your files in when this location is used as a task destination.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  S3Config: z.object({
    BucketAccessRoleArn: z.string(),
  }).optional(),
  S3BucketArn: z.string().optional(),
  Subdirectory: z.string().optional(),
  S3StorageClass: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  LocationArn: z.string(),
  LocationUri: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  S3Config: z.object({
    BucketAccessRoleArn: z.string().max(2048).regex(
      new RegExp(
        "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):iam::[0-9]{12}:role/.*$",
      ),
    ).describe("The ARN of the IAM role of the Amazon S3 bucket.").optional(),
  }).describe(
    "The Amazon Resource Name (ARN) of the AWS IAM role that is used to access an Amazon S3 bucket.",
  ).optional(),
  S3BucketArn: z.string().max(156).regex(
    new RegExp(
      "^arn:(aws|aws-cn|aws-us-gov|aws-eusc|aws-iso|aws-iso-b):s3:[a-z\\-0-9]*:[0-9]*:.*$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the Amazon S3 bucket.")
    .optional(),
  Subdirectory: z.string().max(1024).regex(
    new RegExp("^[\\p{L}\\p{M}\\p{Z}\\p{S}\\p{N}\\p{P}\\p{C}]*$", "u"),
  ).describe(
    "A subdirectory in the Amazon S3 bucket. This subdirectory in Amazon S3 is used to read data from the S3 source location or write data to the S3 destination.",
  ).optional(),
  S3StorageClass: z.enum([
    "STANDARD",
    "STANDARD_IA",
    "ONEZONE_IA",
    "INTELLIGENT_TIERING",
    "GLACIER",
    "GLACIER_INSTANT_RETRIEVAL",
    "DEEP_ARCHIVE",
  ]).describe(
    "The Amazon S3 storage class you want to store your files in when this location is used as a task destination.",
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

/** Swamp extension model for DataSync LocationS3. Registered at `@swamp/aws/datasync/location-s3`. */
export const model = {
  type: "@swamp/aws/datasync/location-s3",
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
      description: "DataSync LocationS3 resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataSync LocationS3",
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
          "AWS::DataSync::LocationS3",
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
      description: "Get a DataSync LocationS3",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataSync LocationS3",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DataSync::LocationS3",
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
      description: "Update a DataSync LocationS3",
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
        const identifier = existing.LocationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::DataSync::LocationS3",
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
          "AWS::DataSync::LocationS3",
          identifier,
          currentState,
          desiredState,
          ["S3BucketArn"],
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
      description: "Delete a DataSync LocationS3",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataSync LocationS3",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DataSync::LocationS3",
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
      description: "Sync DataSync LocationS3 state from AWS",
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
        const identifier = existing.LocationArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::DataSync::LocationS3",
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
