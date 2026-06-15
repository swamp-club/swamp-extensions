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

// Auto-generated extension model for @swamp/aws/medialive/multiplexprogram
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaLive Multiplexprogram (AWS::MediaLive::Multiplexprogram).
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

const MultiplexProgramServiceDescriptorSchema = z.object({
  ProviderName: z.string().min(1).max(256).describe("Name of the provider."),
  ServiceName: z.string().min(1).max(256).describe("Name of the service."),
});

const MultiplexProgramPipelineDetailSchema = z.object({
  ActiveChannelPipeline: z.string().describe(
    "Identifies the channel pipeline that is currently active for the pipeline (identified by PipelineId) in the multiplex.",
  ).optional(),
  PipelineId: z.string().describe(
    "Identifies a specific pipeline in the multiplex.",
  ).optional(),
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
  MultiplexId: z.string().describe(
    "The ID of the multiplex that the program belongs to.",
  ).optional(),
  MultiplexProgramSettings: z.object({
    PreferredChannelPipeline: z.enum([
      "CURRENTLY_ACTIVE",
      "PIPELINE_0",
      "PIPELINE_1",
    ]).describe(
      'Indicates which pipeline is preferred by the multiplex for program ingest. If set to \\"PIPELINE_0\\" or \\"PIPELINE_1\\" and an unhealthy ingest causes the multiplex to switch to the non-preferred pipeline, it will switch back once that ingest is healthy again. If set to \\"CURRENTLY_ACTIVE\\", it will not switch back to the other pipeline based on it recovering to a healthy state, it will only switch if the active pipeline becomes unhealthy.',
    ).optional(),
    ProgramNumber: z.number().int().min(0).max(65535).describe(
      "Unique program number.",
    ),
    ServiceDescriptor: MultiplexProgramServiceDescriptorSchema.describe(
      "Transport stream service descriptor configuration for the Multiplex program.",
    ).optional(),
    VideoSettings: z.record(z.string(), z.unknown()).describe(
      "Program video settings configuration.",
    ).optional(),
  }).describe("The settings for this multiplex program.").optional(),
  PreferredChannelPipeline: z.enum([
    "CURRENTLY_ACTIVE",
    "PIPELINE_0",
    "PIPELINE_1",
  ]).describe("The settings for this multiplex program.").optional(),
  PacketIdentifiersMap: z.object({
    AudioPids: z.array(z.number().int()).optional(),
    DvbSubPids: z.array(z.number().int()).optional(),
    DvbTeletextPid: z.number().int().optional(),
    EtvPlatformPid: z.number().int().optional(),
    EtvSignalPid: z.number().int().optional(),
    KlvDataPids: z.array(z.number().int()).optional(),
    PcrPid: z.number().int().optional(),
    PmtPid: z.number().int().optional(),
    PrivateMetadataPid: z.number().int().optional(),
    Scte27Pids: z.array(z.number().int()).optional(),
    Scte35Pid: z.number().int().optional(),
    TimedMetadataPid: z.number().int().optional(),
    VideoPid: z.number().int().optional(),
  }).describe("The packet identifier map for this multiplex program.")
    .optional(),
  PipelineDetails: z.array(MultiplexProgramPipelineDetailSchema).describe(
    "Contains information about the current sources for the specified program in the specified multiplex. Keep in mind that each multiplex pipeline connects to both pipelines in a given source channel (the channel identified by the program). But only one of those channel pipelines is ever active at one time.",
  ).optional(),
  ProgramName: z.string().describe("The name of the multiplex program.")
    .optional(),
});

const StateSchema = z.object({
  ChannelId: z.string().optional(),
  MultiplexId: z.string(),
  MultiplexProgramSettings: z.object({
    PreferredChannelPipeline: z.string(),
    ProgramNumber: z.number(),
    ServiceDescriptor: MultiplexProgramServiceDescriptorSchema,
    VideoSettings: z.record(z.string(), z.unknown()),
  }).optional(),
  PreferredChannelPipeline: z.string().optional(),
  PacketIdentifiersMap: z.object({
    AudioPids: z.array(z.number()),
    DvbSubPids: z.array(z.number()),
    DvbTeletextPid: z.number(),
    EtvPlatformPid: z.number(),
    EtvSignalPid: z.number(),
    KlvDataPids: z.array(z.number()),
    PcrPid: z.number(),
    PmtPid: z.number(),
    PrivateMetadataPid: z.number(),
    Scte27Pids: z.array(z.number()),
    Scte35Pid: z.number(),
    TimedMetadataPid: z.number(),
    VideoPid: z.number(),
  }).optional(),
  PipelineDetails: z.array(MultiplexProgramPipelineDetailSchema).optional(),
  ProgramName: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  MultiplexId: z.string().describe(
    "The ID of the multiplex that the program belongs to.",
  ).optional(),
  MultiplexProgramSettings: z.object({
    PreferredChannelPipeline: z.enum([
      "CURRENTLY_ACTIVE",
      "PIPELINE_0",
      "PIPELINE_1",
    ]).describe(
      'Indicates which pipeline is preferred by the multiplex for program ingest. If set to \\"PIPELINE_0\\" or \\"PIPELINE_1\\" and an unhealthy ingest causes the multiplex to switch to the non-preferred pipeline, it will switch back once that ingest is healthy again. If set to \\"CURRENTLY_ACTIVE\\", it will not switch back to the other pipeline based on it recovering to a healthy state, it will only switch if the active pipeline becomes unhealthy.',
    ).optional(),
    ProgramNumber: z.number().int().min(0).max(65535).describe(
      "Unique program number.",
    ).optional(),
    ServiceDescriptor: MultiplexProgramServiceDescriptorSchema.describe(
      "Transport stream service descriptor configuration for the Multiplex program.",
    ).optional(),
    VideoSettings: z.record(z.string(), z.unknown()).describe(
      "Program video settings configuration.",
    ).optional(),
  }).describe("The settings for this multiplex program.").optional(),
  PreferredChannelPipeline: z.enum([
    "CURRENTLY_ACTIVE",
    "PIPELINE_0",
    "PIPELINE_1",
  ]).describe("The settings for this multiplex program.").optional(),
  PacketIdentifiersMap: z.object({
    AudioPids: z.array(z.number().int()).optional(),
    DvbSubPids: z.array(z.number().int()).optional(),
    DvbTeletextPid: z.number().int().optional(),
    EtvPlatformPid: z.number().int().optional(),
    EtvSignalPid: z.number().int().optional(),
    KlvDataPids: z.array(z.number().int()).optional(),
    PcrPid: z.number().int().optional(),
    PmtPid: z.number().int().optional(),
    PrivateMetadataPid: z.number().int().optional(),
    Scte27Pids: z.array(z.number().int()).optional(),
    Scte35Pid: z.number().int().optional(),
    TimedMetadataPid: z.number().int().optional(),
    VideoPid: z.number().int().optional(),
  }).describe("The packet identifier map for this multiplex program.")
    .optional(),
  PipelineDetails: z.array(MultiplexProgramPipelineDetailSchema).describe(
    "Contains information about the current sources for the specified program in the specified multiplex. Keep in mind that each multiplex pipeline connects to both pipelines in a given source channel (the channel identified by the program). But only one of those channel pipelines is ever active at one time.",
  ).optional(),
  ProgramName: z.string().describe("The name of the multiplex program.")
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

/** Swamp extension model for MediaLive Multiplexprogram. Registered at `@swamp/aws/medialive/multiplexprogram`. */
export const model = {
  type: "@swamp/aws/medialive/multiplexprogram",
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
      toVersion: "2026.05.27.1",
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
      description: "MediaLive Multiplexprogram resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaLive Multiplexprogram",
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
          "AWS::MediaLive::Multiplexprogram",
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
      description: "Get a MediaLive Multiplexprogram",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaLive Multiplexprogram",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaLive::Multiplexprogram",
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
      description: "Update a MediaLive Multiplexprogram",
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
          existing.ProgramName?.toString(),
          existing.MultiplexId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::MediaLive::Multiplexprogram",
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
          "AWS::MediaLive::Multiplexprogram",
          identifier,
          currentState,
          desiredState,
          ["ProgramName", "MultiplexId"],
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
      description: "Delete a MediaLive Multiplexprogram",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaLive Multiplexprogram",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaLive::Multiplexprogram",
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
      description: "Sync MediaLive Multiplexprogram state from AWS",
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
          existing.ProgramName?.toString(),
          existing.MultiplexId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::MediaLive::Multiplexprogram",
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
