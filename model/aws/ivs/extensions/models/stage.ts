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

// Auto-generated extension model for @swamp/aws/ivs/stage
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IVS Stage (AWS::IVS::Stage).
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

const ParticipantRecordingHlsConfigurationSchema = z.object({
  TargetSegmentDurationSeconds: z.number().int().min(2).max(10).describe(
    "Defines the target duration for recorded segments generated when recording a stage participant. Segments may have durations longer than the specified value when needed to ensure each segment begins with a keyframe. Default: 6.",
  ).optional(),
});

const HlsConfigurationSchema = z.object({
  ParticipantRecordingHlsConfiguration:
    ParticipantRecordingHlsConfigurationSchema.describe(
      "An object representing a configuration of participant HLS recordings for individual participant recording.",
    ).optional(),
});

const ThumbnailConfigurationSchema = z.object({
  ParticipantThumbnailConfiguration: z.object({
    RecordingMode: z.enum(["INTERVAL", "DISABLED"]).describe(
      "Thumbnail recording mode. Default: DISABLED.",
    ).optional(),
    Storage: z.array(z.enum(["SEQUENTIAL", "LATEST"])).describe(
      "Indicates the format in which thumbnails are recorded. SEQUENTIAL records all generated thumbnails in a serial manner, to the media/thumbnails/high directory. LATEST saves the latest thumbnail in media/latest_thumbnail/high/thumb.jpg and overwrites it at the interval specified by targetIntervalSeconds. You can enable both SEQUENTIAL and LATEST. Default: SEQUENTIAL.",
    ).optional(),
    TargetIntervalSeconds: z.number().int().min(1).max(86400).describe(
      "The targeted thumbnail-generation interval in seconds. This is configurable only if recordingMode is INTERVAL. Default: 60.",
    ).optional(),
  }).describe(
    "An object representing a configuration of thumbnails for recorded video from an individual participant.",
  ).optional(),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9-_]*$"))
    .describe("Stage name").optional(),
  AutoParticipantRecordingConfiguration: z.object({
    StorageConfigurationArn: z.string().min(0).max(128).regex(
      new RegExp(
        "^$|^arn:aws:ivs:[a-z0-9-]+:[0-9]+:storage-configuration/[a-zA-Z0-9-]+$",
      ),
    ).describe(
      "ARN of the StorageConfiguration resource to use for individual participant recording.",
    ),
    MediaTypes: z.array(z.enum(["AUDIO_VIDEO", "AUDIO_ONLY"])).describe(
      "Types of media to be recorded. Default: AUDIO_VIDEO.",
    ).optional(),
    HlsConfiguration: HlsConfigurationSchema.describe(
      "HLS configuration object for individual participant recording.",
    ).optional(),
    RecordingReconnectWindowSeconds: z.number().int().min(0).max(300).describe(
      "If a stage publisher disconnects and then reconnects within the specified interval, the multiple recordings will be considered a single recording and merged together. The default value is 0, which disables merging.",
    ).optional(),
    ThumbnailConfiguration: ThumbnailConfigurationSchema.describe(
      "A complex type that allows you to enable/disable the recording of thumbnails for individual participant recording and modify the interval at which thumbnails are generated for the live session.",
    ).optional(),
  }).describe(
    "Configuration object for individual participant recording, to attach to the new stage.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  AutoParticipantRecordingConfiguration: z.object({
    StorageConfigurationArn: z.string(),
    MediaTypes: z.array(z.string()),
    HlsConfiguration: HlsConfigurationSchema,
    RecordingReconnectWindowSeconds: z.number(),
    ThumbnailConfiguration: ThumbnailConfigurationSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  ActiveSessionId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9-_]*$"))
    .describe("Stage name").optional(),
  AutoParticipantRecordingConfiguration: z.object({
    StorageConfigurationArn: z.string().min(0).max(128).regex(
      new RegExp(
        "^$|^arn:aws:ivs:[a-z0-9-]+:[0-9]+:storage-configuration/[a-zA-Z0-9-]+$",
      ),
    ).describe(
      "ARN of the StorageConfiguration resource to use for individual participant recording.",
    ).optional(),
    MediaTypes: z.array(z.enum(["AUDIO_VIDEO", "AUDIO_ONLY"])).describe(
      "Types of media to be recorded. Default: AUDIO_VIDEO.",
    ).optional(),
    HlsConfiguration: HlsConfigurationSchema.describe(
      "HLS configuration object for individual participant recording.",
    ).optional(),
    RecordingReconnectWindowSeconds: z.number().int().min(0).max(300).describe(
      "If a stage publisher disconnects and then reconnects within the specified interval, the multiple recordings will be considered a single recording and merged together. The default value is 0, which disables merging.",
    ).optional(),
    ThumbnailConfiguration: ThumbnailConfigurationSchema.describe(
      "A complex type that allows you to enable/disable the recording of thumbnails for individual participant recording and modify the interval at which thumbnails are generated for the live session.",
    ).optional(),
  }).describe(
    "Configuration object for individual participant recording, to attach to the new stage.",
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

/** Swamp extension model for IVS Stage. Registered at `@swamp/aws/ivs/stage`. */
export const model = {
  type: "@swamp/aws/ivs/stage",
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
      description: "IVS Stage resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IVS Stage",
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
          "AWS::IVS::Stage",
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
      description: "Get a IVS Stage",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IVS Stage",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IVS::Stage",
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
      description: "Update a IVS Stage",
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
          "AWS::IVS::Stage",
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
          "AWS::IVS::Stage",
          identifier,
          currentState,
          desiredState,
          undefined,
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
      description: "Delete a IVS Stage",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IVS Stage",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IVS::Stage",
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
      description: "Sync IVS Stage state from AWS",
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
            "AWS::IVS::Stage",
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
