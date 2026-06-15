// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/kinesisvideo/stream
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for KinesisVideo Stream (AWS::KinesisVideo::Stream).
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
    "The key name of the tag. Specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. The following characters can be used: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. Specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. The following characters can be used: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().min(1).max(256).regex(new RegExp("[a-zA-Z0-9_.-]+"))
    .describe("The name of the Kinesis Video stream.").optional(),
  DataRetentionInHours: z.number().int().min(0).max(87600).describe(
    "The number of hours till which Kinesis Video will retain the data in the stream",
  ).optional(),
  DeviceName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_.-]+"))
    .describe("The name of the device that is writing to the stream.")
    .optional(),
  KmsKeyId: z.string().min(1).max(2048).regex(new RegExp(".+")).describe(
    "AWS KMS key ID that Kinesis Video Streams uses to encrypt stream data.",
  ).optional(),
  MediaType: z.string().min(1).max(128).regex(
    new RegExp(
      "[\\w\\-\\.\\+]+/[\\w\\-\\.\\+]+(,[\\w\\-\\.\\+]+/[\\w\\-\\.\\+]+)*",
    ),
  ).describe(
    "The media type of the stream. Consumers of the stream can use this information when processing the stream.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs associated with the Kinesis Video Stream.",
  ).optional(),
  StreamStorageConfiguration: z.object({
    DefaultStorageTier: z.enum(["HOT", "WARM"]).describe(
      "The storage tier for the Kinesis Video Stream. Determines the storage class used for stream data.",
    ).optional(),
  }).describe("Configuration for the storage tier of the Kinesis Video Stream.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Name: z.string(),
  DataRetentionInHours: z.number().optional(),
  DeviceName: z.string().optional(),
  KmsKeyId: z.string().optional(),
  MediaType: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  StreamStorageConfiguration: z.object({
    DefaultStorageTier: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(256).regex(new RegExp("[a-zA-Z0-9_.-]+"))
    .describe("The name of the Kinesis Video stream.").optional(),
  DataRetentionInHours: z.number().int().min(0).max(87600).describe(
    "The number of hours till which Kinesis Video will retain the data in the stream",
  ).optional(),
  DeviceName: z.string().min(1).max(128).regex(new RegExp("[a-zA-Z0-9_.-]+"))
    .describe("The name of the device that is writing to the stream.")
    .optional(),
  KmsKeyId: z.string().min(1).max(2048).regex(new RegExp(".+")).describe(
    "AWS KMS key ID that Kinesis Video Streams uses to encrypt stream data.",
  ).optional(),
  MediaType: z.string().min(1).max(128).regex(
    new RegExp(
      "[\\w\\-\\.\\+]+/[\\w\\-\\.\\+]+(,[\\w\\-\\.\\+]+/[\\w\\-\\.\\+]+)*",
    ),
  ).describe(
    "The media type of the stream. Consumers of the stream can use this information when processing the stream.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs associated with the Kinesis Video Stream.",
  ).optional(),
  StreamStorageConfiguration: z.object({
    DefaultStorageTier: z.enum(["HOT", "WARM"]).describe(
      "The storage tier for the Kinesis Video Stream. Determines the storage class used for stream data.",
    ).optional(),
  }).describe("Configuration for the storage tier of the Kinesis Video Stream.")
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

/** Swamp extension model for KinesisVideo Stream. Registered at `@swamp/aws/kinesisvideo/stream`. */
export const model = {
  type: "@swamp/aws/kinesisvideo/stream",
  version: "2026.06.15.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "KinesisVideo Stream resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a KinesisVideo Stream",
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
          "AWS::KinesisVideo::Stream",
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
      description: "Get a KinesisVideo Stream",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the KinesisVideo Stream",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::KinesisVideo::Stream",
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
      description: "Update a KinesisVideo Stream",
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
          "AWS::KinesisVideo::Stream",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::KinesisVideo::Stream",
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
      description: "Delete a KinesisVideo Stream",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the KinesisVideo Stream",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::KinesisVideo::Stream",
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
      description: "Sync KinesisVideo Stream state from AWS",
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
            "AWS::KinesisVideo::Stream",
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
