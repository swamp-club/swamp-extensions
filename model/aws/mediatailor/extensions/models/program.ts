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

// Auto-generated extension model for @swamp/aws/mediatailor/program
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaTailor Program (AWS::MediaTailor::Program).
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

const KeyValuePairSchema = z.object({
  Key: z.string().describe("The key."),
  Value: z.string().describe("The value."),
});

const SlateSourceSchema = z.object({
  SourceLocationName: z.string().describe(
    "The name of the source location where the slate VOD source is stored.",
  ).optional(),
  VodSourceName: z.string().describe("The slate VOD source name.").optional(),
});

const SpliceInsertMessageSchema = z.object({
  AvailNum: z.number().int().describe(
    "This is written to splice_insert.avail_num.",
  ).optional(),
  AvailsExpected: z.number().int().describe(
    "This is written to splice_insert.avails_expected.",
  ).optional(),
  SpliceEventId: z.number().int().describe(
    "This is written to splice_insert.splice_event_id.",
  ).optional(),
  UniqueProgramId: z.number().int().describe(
    "This is written to splice_insert.unique_program_id.",
  ).optional(),
});

const SegmentationDescriptorSchema = z.object({
  SegmentationEventId: z.number().int().describe(
    "The Event Identifier to assign.",
  ).optional(),
  SegmentationUpidType: z.number().int().describe("The Upid Type to assign.")
    .optional(),
  SegmentationUpid: z.string().describe("The Upid to assign.").optional(),
  SegmentationTypeId: z.number().int().describe(
    "The Type Identifier to assign.",
  ).optional(),
  SegmentNum: z.number().int().describe("The segment number to assign.")
    .optional(),
  SegmentsExpected: z.number().int().describe(
    "The number of segments expected.",
  ).optional(),
  SubSegmentNum: z.number().int().describe("The sub-segment number to assign.")
    .optional(),
  SubSegmentsExpected: z.number().int().describe(
    "The number of sub-segments expected.",
  ).optional(),
});

const TimeSignalMessageSchema = z.object({
  SegmentationDescriptors: z.array(SegmentationDescriptorSchema).describe(
    "The configurations for the SCTE-35 segmentation_descriptor message(s).",
  ).optional(),
});

const AdBreakSchema = z.object({
  AdBreakMetadata: z.array(KeyValuePairSchema).describe(
    "Defines a list of key/value pairs that MediaTailor generates within the EXT-X-ASSET tag for SCTE35_ENHANCED output.",
  ).optional(),
  MessageType: z.enum(["SPLICE_INSERT", "TIME_SIGNAL"]).describe(
    "The SCTE-35 ad insertion type.",
  ).optional(),
  OffsetMillis: z.number().int().describe(
    "How long (in milliseconds) after the beginning of the program that an ad starts.",
  ),
  Slate: SlateSourceSchema.describe("Slate VOD source configuration.")
    .optional(),
  SpliceInsertMessage: SpliceInsertMessageSchema.describe(
    "Splice insert message configuration.",
  ).optional(),
  TimeSignalMessage: TimeSignalMessageSchema.describe(
    "The SCTE-35 time_signal message configuration.",
  ).optional(),
});

const ClipRangeSchema = z.object({
  EndOffsetMillis: z.number().int().describe(
    "The end offset of the clip range, in milliseconds.",
  ).optional(),
  StartOffsetMillis: z.number().int().describe(
    "The start offset of the clip range, in milliseconds.",
  ).optional(),
});

const AlternateMediaSchema = z.object({
  SourceLocationName: z.string().describe(
    "The name of the source location for alternateMedia.",
  ).optional(),
  LiveSourceName: z.string().describe(
    "The name of the live source for alternateMedia.",
  ).optional(),
  VodSourceName: z.string().describe(
    "The name of the VOD source for alternateMedia.",
  ).optional(),
  ClipRange: ClipRangeSchema.describe(
    "Clip range configuration for the VOD source associated with the program.",
  ).optional(),
  ScheduledStartTimeMillis: z.number().int().describe(
    "The date and time that the alternateMedia is scheduled to start, in epoch milliseconds.",
  ).optional(),
  AdBreaks: z.array(AdBreakSchema).describe(
    "Ad break configuration parameters defined in AlternateMedia.",
  ).optional(),
  DurationMillis: z.number().int().describe(
    "The duration of the alternateMedia in milliseconds.",
  ).optional(),
});

const AudienceMediaSchema = z.object({
  Audience: z.string().describe("The Audience defined in AudienceMedia.")
    .optional(),
  AlternateMedia: z.array(AlternateMediaSchema).describe(
    "The list of AlternateMedia defined in AudienceMedia.",
  ).optional(),
});

const TransitionSchema = z.object({
  RelativePosition: z.enum(["BEFORE_PROGRAM", "AFTER_PROGRAM"]).describe(
    "The position where this program will be inserted relative to the RelativePosition.",
  ),
  RelativeProgram: z.string().describe(
    "The name of the program that this program will be inserted next to.",
  ).optional(),
  ScheduledStartTimeMillis: z.number().int().describe(
    "The date and time that the program is scheduled to start, in epoch milliseconds.",
  ).optional(),
  Type: z.string().describe(
    "Defines when the program plays in the schedule. You can set the value to ABSOLUTE or RELATIVE.",
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
  ChannelName: z.string().describe("The name of the channel for this Program."),
  ProgramName: z.string().describe("The name of the Program."),
  SourceLocationName: z.string().describe("The name of the source location."),
  LiveSourceName: z.string().describe(
    "The name of the LiveSource for this Program.",
  ).optional(),
  VodSourceName: z.string().describe(
    "The name that's used to refer to a VOD source.",
  ).optional(),
  AdBreaks: z.array(AdBreakSchema).describe(
    "The ad break configuration settings.",
  ).optional(),
  AudienceMedia: z.array(AudienceMediaSchema).describe(
    "The list of AudienceMedia defined in program.",
  ).optional(),
  ScheduleConfiguration: z.object({
    Transition: TransitionSchema.describe("Program transition configuration."),
    ClipRange: ClipRangeSchema.describe(
      "Clip range configuration for the VOD source associated with the program.",
    ).optional(),
  }).describe("The schedule configuration settings.").optional(),
  ClipRange: z.object({
    EndOffsetMillis: z.number().int().describe(
      "The end offset of the clip range, in milliseconds.",
    ).optional(),
    StartOffsetMillis: z.number().int().describe(
      "The start offset of the clip range, in milliseconds.",
    ).optional(),
  }).describe("The clip range configuration settings.").optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ChannelName: z.string().optional(),
  ProgramName: z.string().optional(),
  SourceLocationName: z.string().optional(),
  LiveSourceName: z.string().optional(),
  VodSourceName: z.string().optional(),
  AdBreaks: z.array(AdBreakSchema).optional(),
  AudienceMedia: z.array(AudienceMediaSchema).optional(),
  ScheduleConfiguration: z.object({
    Transition: TransitionSchema,
    ClipRange: ClipRangeSchema,
  }).optional(),
  ClipRange: ClipRangeSchema.optional(),
  CreationTime: z.string().optional(),
  ScheduledStartTime: z.string().optional(),
  DurationMillis: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ChannelName: z.string().describe("The name of the channel for this Program.")
    .optional(),
  ProgramName: z.string().describe("The name of the Program.").optional(),
  SourceLocationName: z.string().describe("The name of the source location.")
    .optional(),
  LiveSourceName: z.string().describe(
    "The name of the LiveSource for this Program.",
  ).optional(),
  VodSourceName: z.string().describe(
    "The name that's used to refer to a VOD source.",
  ).optional(),
  AdBreaks: z.array(AdBreakSchema).describe(
    "The ad break configuration settings.",
  ).optional(),
  AudienceMedia: z.array(AudienceMediaSchema).describe(
    "The list of AudienceMedia defined in program.",
  ).optional(),
  ScheduleConfiguration: z.object({
    Transition: TransitionSchema.describe("Program transition configuration.")
      .optional(),
    ClipRange: ClipRangeSchema.describe(
      "Clip range configuration for the VOD source associated with the program.",
    ).optional(),
  }).describe("The schedule configuration settings.").optional(),
  ClipRange: z.object({
    EndOffsetMillis: z.number().int().describe(
      "The end offset of the clip range, in milliseconds.",
    ).optional(),
    StartOffsetMillis: z.number().int().describe(
      "The start offset of the clip range, in milliseconds.",
    ).optional(),
  }).describe("The clip range configuration settings.").optional(),
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

/** Swamp extension model for MediaTailor Program. Registered at `@swamp/aws/mediatailor/program`. */
export const model = {
  type: "@swamp/aws/mediatailor/program",
  version: "2026.10.01.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MediaTailor Program resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaTailor Program",
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
          "AWS::MediaTailor::Program",
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
      description: "Get a MediaTailor Program",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaTailor Program",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaTailor::Program",
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
      description: "Update a MediaTailor Program",
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
          "AWS::MediaTailor::Program",
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
          "AWS::MediaTailor::Program",
          identifier,
          currentState,
          desiredState,
          [
            "ChannelName",
            "ProgramName",
            "SourceLocationName",
            "VodSourceName",
            "LiveSourceName",
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
      description: "Delete a MediaTailor Program",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaTailor Program",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaTailor::Program",
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
      description: "Sync MediaTailor Program state from AWS",
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
            "AWS::MediaTailor::Program",
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
      description: "List MediaTailor Program resources",
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
          "AWS::MediaTailor::Program",
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
