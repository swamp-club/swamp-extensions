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

// Auto-generated extension model for @swamp/aws/mediaconnect/flow-media-stream
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaConnect FlowMediaStream (AWS::MediaConnect::FlowMediaStream).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const FmtpSchema = z.object({
  ChannelOrder: z.string().describe(
    "The format of the audio channel. Can only be specified for an audio media stream.",
  ).optional(),
  Colorimetry: z.enum([
    "BT601",
    "BT709",
    "BT2020",
    "BT2100",
    "ST2065-1",
    "ST2065-3",
    "XYZ",
  ]).describe("The format used for the representation of color.").optional(),
  ExactFramerate: z.string().describe(
    "The frame rate for the video stream, in frames/second. For example: 60000/1001.",
  ).optional(),
  Par: z.string().describe("The pixel aspect ratio (PAR) of the video.")
    .optional(),
  Range: z.enum(["NARROW", "FULL", "FULLPROTECT"]).describe(
    "The encoding range of the video.",
  ).optional(),
  ScanMode: z.enum(["progressive", "interlace", "progressive-segmented-frame"])
    .describe(
      "The type of compression that was used to smooth the video's appearance.",
    ).optional(),
  Tcs: z.enum([
    "SDR",
    "PQ",
    "HLG",
    "LINEAR",
    "BT2100LINPQ",
    "BT2100LINHLG",
    "ST2065-1",
    "ST428-1",
    "DENSITY",
  ]).describe(
    "The transfer characteristic system (TCS) that is used in the video.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key name of the tag."),
  Value: z.string().min(0).max(256).describe("The value for the tag."),
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
  FlowArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:flow:[a-zA-Z0-9-]+:[a-zA-Z0-9_-]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the flow that the media stream belongs to.",
  ),
  MediaStreamName: z.string().describe(
    "A name that helps you distinguish one media stream from another.",
  ),
  MediaStreamId: z.number().int().describe(
    "A unique identifier for the media stream.",
  ),
  MediaStreamType: z.enum(["video", "audio", "ancillary-data"]).describe(
    "The type of media stream.",
  ),
  ClockRate: z.number().int().describe(
    "The sample rate (in Hz) for the stream. If the media stream type is video or ancillary data, set this value to 90000. If the media stream type is audio, set this value to either 48000 or 96000.",
  ).optional(),
  Description: z.string().describe(
    "A description that can help you quickly identify what your media stream is used for.",
  ).optional(),
  VideoFormat: z.string().describe(
    "The resolution of the video. Required for a video media stream and rejected for other media stream types.",
  ).optional(),
  Attributes: z.object({
    Fmtp: FmtpSchema.describe(
      "A set of parameters that define the media stream.",
    ).optional(),
    Lang: z.string().describe(
      "The audio language, in a format that is recognized by the receiver. Can only be specified for an audio media stream.",
    ).optional(),
  }).describe("Attributes that are related to the media stream.").optional(),
  Tags: z.array(TagSchema).describe(
    "The key-value pairs that can be used to tag and organize the media stream.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  FlowArn: z.string().optional(),
  MediaStreamName: z.string().optional(),
  MediaStreamId: z.number().optional(),
  MediaStreamType: z.string().optional(),
  ClockRate: z.number().optional(),
  Description: z.string().optional(),
  VideoFormat: z.string().optional(),
  Attributes: z.object({
    Fmtp: FmtpSchema,
    Lang: z.string(),
  }).optional(),
  Fmt: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FlowArn: z.string().regex(
    new RegExp(
      "^arn:(aws[a-zA-Z-]*):mediaconnect:[a-z0-9-]+:[0-9]{12}:flow:[a-zA-Z0-9-]+:[a-zA-Z0-9_-]+$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the flow that the media stream belongs to.",
  ).optional(),
  MediaStreamName: z.string().describe(
    "A name that helps you distinguish one media stream from another.",
  ).optional(),
  MediaStreamId: z.number().int().describe(
    "A unique identifier for the media stream.",
  ).optional(),
  MediaStreamType: z.enum(["video", "audio", "ancillary-data"]).describe(
    "The type of media stream.",
  ).optional(),
  ClockRate: z.number().int().describe(
    "The sample rate (in Hz) for the stream. If the media stream type is video or ancillary data, set this value to 90000. If the media stream type is audio, set this value to either 48000 or 96000.",
  ).optional(),
  Description: z.string().describe(
    "A description that can help you quickly identify what your media stream is used for.",
  ).optional(),
  VideoFormat: z.string().describe(
    "The resolution of the video. Required for a video media stream and rejected for other media stream types.",
  ).optional(),
  Attributes: z.object({
    Fmtp: FmtpSchema.describe(
      "A set of parameters that define the media stream.",
    ).optional(),
    Lang: z.string().describe(
      "The audio language, in a format that is recognized by the receiver. Can only be specified for an audio media stream.",
    ).optional(),
  }).describe("Attributes that are related to the media stream.").optional(),
  Tags: z.array(TagSchema).describe(
    "The key-value pairs that can be used to tag and organize the media stream.",
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

/** Swamp extension model for MediaConnect FlowMediaStream. Registered at `@swamp/aws/mediaconnect/flow-media-stream`. */
export const model = {
  type: "@swamp/aws/mediaconnect/flow-media-stream",
  version: "2026.09.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MediaConnect FlowMediaStream resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaConnect FlowMediaStream",
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
          "AWS::MediaConnect::FlowMediaStream",
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
      description: "Get a MediaConnect FlowMediaStream",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect FlowMediaStream",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaConnect::FlowMediaStream",
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
      description: "Update a MediaConnect FlowMediaStream",
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
          "AWS::MediaConnect::FlowMediaStream",
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
          "AWS::MediaConnect::FlowMediaStream",
          identifier,
          currentState,
          desiredState,
          ["FlowArn", "MediaStreamName", "MediaStreamId"],
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
      description: "Delete a MediaConnect FlowMediaStream",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect FlowMediaStream",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaConnect::FlowMediaStream",
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
      description: "Sync MediaConnect FlowMediaStream state from AWS",
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
            "AWS::MediaConnect::FlowMediaStream",
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
    list: {
      description: "List MediaConnect FlowMediaStream resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::MediaConnect::FlowMediaStream",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.Arn?.toString() ?? item.identifier).replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
