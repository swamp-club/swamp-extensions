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

// Auto-generated extension model for @swamp/aws/connect/instance
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Connect Instance (AWS::Connect::Instance).
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
  IdentityManagementType: z.enum([
    "SAML",
    "CONNECT_MANAGED",
    "EXISTING_DIRECTORY",
  ]).describe("Specifies the type of directory integration for new instance."),
  InstanceAlias: z.string().min(1).max(45).regex(
    new RegExp("^(?!d-)([\\da-zA-Z]+)([-]*[\\da-zA-Z])*$"),
  ).describe(
    "Alias of the new directory created as part of new instance creation.",
  ).optional(),
  DirectoryId: z.string().min(12).max(12).regex(new RegExp("^d-[0-9a-f]{10}$"))
    .describe(
      "Existing directoryId user wants to map to the new Connect instance.",
    ).optional(),
  Attributes: z.object({
    InboundCalls: z.boolean().describe(
      "Mandatory element which enables inbound calls on new instance.",
    ),
    OutboundCalls: z.boolean().describe(
      "Mandatory element which enables outbound calls on new instance.",
    ),
    ContactflowLogs: z.boolean().describe(
      "Boolean flag which enables CONTACTFLOW_LOGS on an instance.",
    ).optional(),
    ContactLens: z.boolean().describe(
      "Boolean flag which enables CONTACT_LENS on an instance.",
    ).optional(),
    AutoResolveBestVoices: z.boolean().describe(
      "Boolean flag which enables AUTO_RESOLVE_BEST_VOICES on an instance.",
    ).optional(),
    UseCustomTTSVoices: z.boolean().describe(
      "Boolean flag which enables USE_CUSTOM_TTS_VOICES on an instance.",
    ).optional(),
    EarlyMedia: z.boolean().describe(
      "Boolean flag which enables EARLY_MEDIA on an instance.",
    ).optional(),
    MultiPartyConference: z.boolean().describe(
      "Boolean flag which enables MULTI_PARTY_CONFERENCE on an instance.",
    ).optional(),
    HighVolumeOutBound: z.boolean().describe(
      "Boolean flag which enables HIGH_VOLUME_OUTBOUND on an instance.",
    ).optional(),
    EnhancedContactMonitoring: z.boolean().describe(
      "Boolean flag which enables ENHANCED_CONTACT_MONITORING on an instance.",
    ).optional(),
    EnhancedChatMonitoring: z.boolean().describe(
      "Boolean flag which enables ENHANCED_CHAT_MONITORING on an instance.",
    ).optional(),
    MultiPartyChatConference: z.boolean().describe(
      "Boolean flag which enables MULTI_PARTY_CHAT_CONFERENCE on an instance.",
    ).optional(),
    MessageStreaming: z.boolean().describe(
      "Boolean flag which enables MESSAGE_STREAMING on an instance.",
    ).optional(),
  }).describe("The attributes for the instance."),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string().optional(),
  Arn: z.string(),
  IdentityManagementType: z.string().optional(),
  InstanceAlias: z.string().optional(),
  CreatedTime: z.string().optional(),
  ServiceRole: z.string().optional(),
  InstanceStatus: z.string().optional(),
  DirectoryId: z.string().optional(),
  Attributes: z.object({
    InboundCalls: z.boolean(),
    OutboundCalls: z.boolean(),
    ContactflowLogs: z.boolean(),
    ContactLens: z.boolean(),
    AutoResolveBestVoices: z.boolean(),
    UseCustomTTSVoices: z.boolean(),
    EarlyMedia: z.boolean(),
    MultiPartyConference: z.boolean(),
    HighVolumeOutBound: z.boolean(),
    EnhancedContactMonitoring: z.boolean(),
    EnhancedChatMonitoring: z.boolean(),
    MultiPartyChatConference: z.boolean(),
    MessageStreaming: z.boolean(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  IdentityManagementType: z.enum([
    "SAML",
    "CONNECT_MANAGED",
    "EXISTING_DIRECTORY",
  ]).describe("Specifies the type of directory integration for new instance.")
    .optional(),
  InstanceAlias: z.string().min(1).max(45).regex(
    new RegExp("^(?!d-)([\\da-zA-Z]+)([-]*[\\da-zA-Z])*$"),
  ).describe(
    "Alias of the new directory created as part of new instance creation.",
  ).optional(),
  DirectoryId: z.string().min(12).max(12).regex(new RegExp("^d-[0-9a-f]{10}$"))
    .describe(
      "Existing directoryId user wants to map to the new Connect instance.",
    ).optional(),
  Attributes: z.object({
    InboundCalls: z.boolean().describe(
      "Mandatory element which enables inbound calls on new instance.",
    ).optional(),
    OutboundCalls: z.boolean().describe(
      "Mandatory element which enables outbound calls on new instance.",
    ).optional(),
    ContactflowLogs: z.boolean().describe(
      "Boolean flag which enables CONTACTFLOW_LOGS on an instance.",
    ).optional(),
    ContactLens: z.boolean().describe(
      "Boolean flag which enables CONTACT_LENS on an instance.",
    ).optional(),
    AutoResolveBestVoices: z.boolean().describe(
      "Boolean flag which enables AUTO_RESOLVE_BEST_VOICES on an instance.",
    ).optional(),
    UseCustomTTSVoices: z.boolean().describe(
      "Boolean flag which enables USE_CUSTOM_TTS_VOICES on an instance.",
    ).optional(),
    EarlyMedia: z.boolean().describe(
      "Boolean flag which enables EARLY_MEDIA on an instance.",
    ).optional(),
    MultiPartyConference: z.boolean().describe(
      "Boolean flag which enables MULTI_PARTY_CONFERENCE on an instance.",
    ).optional(),
    HighVolumeOutBound: z.boolean().describe(
      "Boolean flag which enables HIGH_VOLUME_OUTBOUND on an instance.",
    ).optional(),
    EnhancedContactMonitoring: z.boolean().describe(
      "Boolean flag which enables ENHANCED_CONTACT_MONITORING on an instance.",
    ).optional(),
    EnhancedChatMonitoring: z.boolean().describe(
      "Boolean flag which enables ENHANCED_CHAT_MONITORING on an instance.",
    ).optional(),
    MultiPartyChatConference: z.boolean().describe(
      "Boolean flag which enables MULTI_PARTY_CHAT_CONFERENCE on an instance.",
    ).optional(),
    MessageStreaming: z.boolean().describe(
      "Boolean flag which enables MESSAGE_STREAMING on an instance.",
    ).optional(),
  }).describe("The attributes for the instance.").optional(),
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

/** Swamp extension model for Connect Instance. Registered at `@swamp/aws/connect/instance`. */
export const model = {
  type: "@swamp/aws/connect/instance",
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
      description: "Connect Instance resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect Instance",
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
          "AWS::Connect::Instance",
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
      description: "Get a Connect Instance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect Instance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Connect::Instance",
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
      description: "Update a Connect Instance",
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
          "AWS::Connect::Instance",
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
          "AWS::Connect::Instance",
          identifier,
          currentState,
          desiredState,
          ["DirectoryId", "InstanceAlias", "IdentityManagementType"],
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
      description: "Delete a Connect Instance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect Instance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Connect::Instance",
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
      description: "Sync Connect Instance state from AWS",
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
            "AWS::Connect::Instance",
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
