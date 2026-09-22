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

// Auto-generated extension model for @swamp/aws/chime/channel
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for Chime Channel (AWS::Chime::Channel).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key in a tag."),
  Value: z.string().min(1).max(256).describe("The value in a tag."),
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
  ChimeBearer: z.string().min(5).max(1600).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe(
    "The ARN of the AppInstanceUser or AppInstanceBot that performs every operation on this channel. Whichever of the two creates a channel automatically becomes one of its moderators, so the same ARN can subsequently read, update and delete the channel.",
  ),
  AppInstanceArn: z.string().min(5).max(1600).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("The ARN of the AppInstance that contains the channel."),
  ChannelId: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9]([A-Za-z0-9\\:\\-\\_\\.\\@]{0,62}[A-Za-z0-9])?$"),
  ).describe(
    "The ID of the channel. When omitted, the service generates a UUID.",
  ).optional(),
  Name: z.string().min(1).max(256).regex(
    new RegExp(
      "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD𐀀-􏿿]*$",
    ),
  ).describe("The name of the channel."),
  Mode: z.enum(["UNRESTRICTED", "RESTRICTED"]).describe(
    "The channel mode. In an UNRESTRICTED channel, members can add themselves and other members; in a RESTRICTED channel, only administrators and moderators can add members. An elastic channel must be RESTRICTED.",
  ).optional(),
  Privacy: z.enum(["PUBLIC", "PRIVATE"]).describe(
    "The channel's privacy level. A PUBLIC channel is discoverable by anyone in the AppInstance; a PRIVATE channel is not. Privacy cannot be changed after creation.",
  ).optional(),
  Metadata: z.string().min(0).max(1024).describe("The metadata of the channel.")
    .optional(),
  MemberArns: z.array(
    z.string().min(5).max(1600).regex(
      new RegExp(
        "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
      ),
    ),
  ).describe(
    "The ARNs of the AppInstanceUsers to add to the channel as members when it is created. Cannot be combined with ElasticChannelConfiguration.",
  ).optional(),
  ModeratorArns: z.array(
    z.string().min(5).max(1600).regex(
      new RegExp(
        "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
      ),
    ),
  ).describe(
    "The ARNs of the AppInstanceUsers to add to the channel as moderators when it is created.",
  ).optional(),
  ElasticChannelConfiguration: z.object({
    MaximumSubChannels: z.number().int().min(2).describe(
      "The maximum number of SubChannels allowed in the elastic channel.",
    ),
    TargetMembershipsPerSubChannel: z.number().int().min(2).describe(
      "The maximum number of members allowed in a SubChannel.",
    ),
    MinimumMembershipPercentage: z.number().int().min(1).max(40).describe(
      "The minimum allowed percentage of TargetMembershipsPerSubChannel users, used to balance members across SubChannels.",
    ),
  }).describe(
    "The attributes required to configure and create an elastic channel. An elastic channel must use RESTRICTED mode, cannot be created with MemberArns, and is available only in some regions.",
  ).optional(),
  ExpirationSettings: z.object({
    ExpirationDays: z.number().int().min(1).max(5475).describe(
      "The period in days after which the system automatically deletes the channel.",
    ),
    ExpirationCriterion: z.enum(["CREATED_TIMESTAMP", "LAST_MESSAGE_TIMESTAMP"])
      .describe("The condition the expiration period is measured from."),
  }).describe(
    "Settings that control the interval after which the channel is automatically deleted.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags for the channel.").optional(),
  CreatedBy: z.object({
    Name: z.string().min(0).max(256).describe("The name in an identity.")
      .optional(),
  }).describe("The AppInstanceUser or AppInstanceBot that created the channel.")
    .optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ChannelFlowArn: z.string().optional(),
  ChimeBearer: z.string(),
  AppInstanceArn: z.string().optional(),
  ChannelId: z.string().optional(),
  Name: z.string().optional(),
  Mode: z.string().optional(),
  Privacy: z.string().optional(),
  Metadata: z.string().optional(),
  MemberArns: z.array(z.string()).optional(),
  ModeratorArns: z.array(z.string()).optional(),
  ElasticChannelConfiguration: z.object({
    MaximumSubChannels: z.number(),
    TargetMembershipsPerSubChannel: z.number(),
    MinimumMembershipPercentage: z.number(),
  }).optional(),
  ExpirationSettings: z.object({
    ExpirationDays: z.number(),
    ExpirationCriterion: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  CreatedBy: z.object({
    Arn: z.string(),
    Name: z.string(),
  }).optional(),
  CreatedTimestamp: z.string().optional(),
  LastMessageTimestamp: z.string().optional(),
  LastUpdatedTimestamp: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ChimeBearer: z.string().min(5).max(1600).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe(
    "The ARN of the AppInstanceUser or AppInstanceBot that performs every operation on this channel. Whichever of the two creates a channel automatically becomes one of its moderators, so the same ARN can subsequently read, update and delete the channel.",
  ).optional(),
  AppInstanceArn: z.string().min(5).max(1600).regex(
    new RegExp(
      "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
    ),
  ).describe("The ARN of the AppInstance that contains the channel.")
    .optional(),
  ChannelId: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9]([A-Za-z0-9\\:\\-\\_\\.\\@]{0,62}[A-Za-z0-9])?$"),
  ).describe(
    "The ID of the channel. When omitted, the service generates a UUID.",
  ).optional(),
  Name: z.string().min(1).max(256).regex(
    new RegExp(
      "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD𐀀-􏿿]*$",
    ),
  ).describe("The name of the channel.").optional(),
  Mode: z.enum(["UNRESTRICTED", "RESTRICTED"]).describe(
    "The channel mode. In an UNRESTRICTED channel, members can add themselves and other members; in a RESTRICTED channel, only administrators and moderators can add members. An elastic channel must be RESTRICTED.",
  ).optional(),
  Privacy: z.enum(["PUBLIC", "PRIVATE"]).describe(
    "The channel's privacy level. A PUBLIC channel is discoverable by anyone in the AppInstance; a PRIVATE channel is not. Privacy cannot be changed after creation.",
  ).optional(),
  Metadata: z.string().min(0).max(1024).describe("The metadata of the channel.")
    .optional(),
  MemberArns: z.array(
    z.string().min(5).max(1600).regex(
      new RegExp(
        "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
      ),
    ),
  ).describe(
    "The ARNs of the AppInstanceUsers to add to the channel as members when it is created. Cannot be combined with ElasticChannelConfiguration.",
  ).optional(),
  ModeratorArns: z.array(
    z.string().min(5).max(1600).regex(
      new RegExp(
        "^arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}$",
      ),
    ),
  ).describe(
    "The ARNs of the AppInstanceUsers to add to the channel as moderators when it is created.",
  ).optional(),
  ElasticChannelConfiguration: z.object({
    MaximumSubChannels: z.number().int().min(2).describe(
      "The maximum number of SubChannels allowed in the elastic channel.",
    ).optional(),
    TargetMembershipsPerSubChannel: z.number().int().min(2).describe(
      "The maximum number of members allowed in a SubChannel.",
    ).optional(),
    MinimumMembershipPercentage: z.number().int().min(1).max(40).describe(
      "The minimum allowed percentage of TargetMembershipsPerSubChannel users, used to balance members across SubChannels.",
    ).optional(),
  }).describe(
    "The attributes required to configure and create an elastic channel. An elastic channel must use RESTRICTED mode, cannot be created with MemberArns, and is available only in some regions.",
  ).optional(),
  ExpirationSettings: z.object({
    ExpirationDays: z.number().int().min(1).max(5475).describe(
      "The period in days after which the system automatically deletes the channel.",
    ).optional(),
    ExpirationCriterion: z.enum(["CREATED_TIMESTAMP", "LAST_MESSAGE_TIMESTAMP"])
      .describe("The condition the expiration period is measured from.")
      .optional(),
  }).describe(
    "Settings that control the interval after which the channel is automatically deleted.",
  ).optional(),
  Tags: z.array(TagSchema).describe("The tags for the channel.").optional(),
  CreatedBy: z.object({
    Name: z.string().min(0).max(256).describe("The name in an identity.")
      .optional(),
  }).describe("The AppInstanceUser or AppInstanceBot that created the channel.")
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

/** Swamp extension model for Chime Channel. Registered at `@swamp/aws/chime/channel`. */
export const model = {
  type: "@swamp/aws/chime/channel",
  version: "2026.09.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Chime Channel resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Chime Channel",
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
          "AWS::Chime::Channel",
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
      description: "Get a Chime Channel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Chime Channel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Chime::Channel",
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
      description: "Update a Chime Channel",
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
        const idParts = [
          existing.Arn?.toString(),
          existing.ChimeBearer?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Chime::Channel",
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
          "AWS::Chime::Channel",
          identifier,
          currentState,
          desiredState,
          [
            "AppInstanceArn",
            "ChannelId",
            "ChimeBearer",
            "ElasticChannelConfiguration",
            "MemberArns",
            "ModeratorArns",
            "Privacy",
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
      description: "Delete a Chime Channel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Chime Channel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Chime::Channel",
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
      description: "Sync Chime Channel state from AWS",
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
        const idParts = [
          existing.Arn?.toString(),
          existing.ChimeBearer?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Chime::Channel",
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
      description: "List Chime Channel resources",
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
          "AWS::Chime::Channel",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
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
