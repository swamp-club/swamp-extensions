// Auto-generated extension model for @swamp/aws/ivs/channel
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IVS Channel (AWS::IVS::Channel).
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9-_]*$"))
    .describe("Channel").optional(),
  Authorized: z.boolean().describe("Whether the channel is authorized.")
    .optional(),
  InsecureIngest: z.boolean().describe(
    "Whether the channel allows insecure ingest.",
  ).optional(),
  LatencyMode: z.enum(["NORMAL", "LOW"]).describe("Channel latency mode.")
    .optional(),
  Type: z.enum(["STANDARD", "BASIC", "ADVANCED_SD", "ADVANCED_HD"]).describe(
    "Channel type, which determines the allowable resolution and bitrate. If you exceed the allowable resolution or bitrate, the stream probably will disconnect immediately.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the asset model.",
  ).optional(),
  RecordingConfigurationArn: z.string().min(0).max(128).regex(
    new RegExp(
      "^$|arn:aws:ivs:[a-z0-9-]+:[0-9]+:recording-configuration/[a-zA-Z0-9-]+$",
    ),
  ).describe(
    'Recording Configuration ARN. A value other than an empty string indicates that recording is enabled. Default: "" (recording is disabled).',
  ).optional(),
  Preset: z.enum([
    "",
    "HIGHER_BANDWIDTH_DELIVERY",
    "CONSTRAINED_BANDWIDTH_DELIVERY",
  ]).describe(
    'Optional transcode preset for the channel. This is selectable only for ADVANCED_HD and ADVANCED_SD channel types. For those channel types, the default preset is HIGHER_BANDWIDTH_DELIVERY. For other channel types (BASIC and STANDARD), preset is the empty string ("").',
  ).optional(),
  MultitrackInputConfiguration: z.object({
    Enabled: z.boolean().describe(
      "Indicates whether multitrack input is enabled. Can be set to true only if channel type is STANDARD. Setting enabled to true with any other channel type will cause an exception. If true, then policy, maximumResolution, and containerFormat are required, and containerFormat must be set to FRAGMENTED_MP4. Default: false.",
    ).optional(),
    MaximumResolution: z.enum(["SD", "HD", "FULL_HD"]).describe(
      "Maximum resolution for multitrack input. Required if enabled is true.",
    ).optional(),
    Policy: z.enum(["ALLOW", "REQUIRE"]).describe(
      "Indicates whether multitrack input is allowed or required. Required if enabled is true.",
    ).optional(),
  }).optional(),
  ContainerFormat: z.enum(["TS", "FRAGMENTED_MP4"]).describe(
    "Indicates which content-packaging format is used (MPEG-TS or fMP4). If multitrackInputConfiguration is specified and enabled is true, then containerFormat is required and must be set to FRAGMENTED_MP4. Otherwise, containerFormat may be set to TS or FRAGMENTED_MP4. Default: TS.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  Authorized: z.boolean().optional(),
  InsecureIngest: z.boolean().optional(),
  LatencyMode: z.string().optional(),
  Type: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  PlaybackUrl: z.string().optional(),
  IngestEndpoint: z.string().optional(),
  RecordingConfigurationArn: z.string().optional(),
  Preset: z.string().optional(),
  MultitrackInputConfiguration: z.object({
    Enabled: z.boolean(),
    MaximumResolution: z.string(),
    Policy: z.string(),
  }).optional(),
  ContainerFormat: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9-_]*$"))
    .describe("Channel").optional(),
  Authorized: z.boolean().describe("Whether the channel is authorized.")
    .optional(),
  InsecureIngest: z.boolean().describe(
    "Whether the channel allows insecure ingest.",
  ).optional(),
  LatencyMode: z.enum(["NORMAL", "LOW"]).describe("Channel latency mode.")
    .optional(),
  Type: z.enum(["STANDARD", "BASIC", "ADVANCED_SD", "ADVANCED_HD"]).describe(
    "Channel type, which determines the allowable resolution and bitrate. If you exceed the allowable resolution or bitrate, the stream probably will disconnect immediately.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the asset model.",
  ).optional(),
  RecordingConfigurationArn: z.string().min(0).max(128).regex(
    new RegExp(
      "^$|arn:aws:ivs:[a-z0-9-]+:[0-9]+:recording-configuration/[a-zA-Z0-9-]+$",
    ),
  ).describe(
    'Recording Configuration ARN. A value other than an empty string indicates that recording is enabled. Default: "" (recording is disabled).',
  ).optional(),
  Preset: z.enum([
    "",
    "HIGHER_BANDWIDTH_DELIVERY",
    "CONSTRAINED_BANDWIDTH_DELIVERY",
  ]).describe(
    'Optional transcode preset for the channel. This is selectable only for ADVANCED_HD and ADVANCED_SD channel types. For those channel types, the default preset is HIGHER_BANDWIDTH_DELIVERY. For other channel types (BASIC and STANDARD), preset is the empty string ("").',
  ).optional(),
  MultitrackInputConfiguration: z.object({
    Enabled: z.boolean().describe(
      "Indicates whether multitrack input is enabled. Can be set to true only if channel type is STANDARD. Setting enabled to true with any other channel type will cause an exception. If true, then policy, maximumResolution, and containerFormat are required, and containerFormat must be set to FRAGMENTED_MP4. Default: false.",
    ).optional(),
    MaximumResolution: z.enum(["SD", "HD", "FULL_HD"]).describe(
      "Maximum resolution for multitrack input. Required if enabled is true.",
    ).optional(),
    Policy: z.enum(["ALLOW", "REQUIRE"]).describe(
      "Indicates whether multitrack input is allowed or required. Required if enabled is true.",
    ).optional(),
  }).optional(),
  ContainerFormat: z.enum(["TS", "FRAGMENTED_MP4"]).describe(
    "Indicates which content-packaging format is used (MPEG-TS or fMP4). If multitrackInputConfiguration is specified and enabled is true, then containerFormat is required and must be set to FRAGMENTED_MP4. Otherwise, containerFormat may be set to TS or FRAGMENTED_MP4. Default: TS.",
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

/** Swamp extension model for IVS Channel. Registered at `@swamp/aws/ivs/channel`. */
export const model = {
  type: "@swamp/aws/ivs/channel",
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
      description: "IVS Channel resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IVS Channel",
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
          "AWS::IVS::Channel",
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
      description: "Get a IVS Channel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IVS Channel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IVS::Channel",
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
      description: "Update a IVS Channel",
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
          "AWS::IVS::Channel",
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
          "AWS::IVS::Channel",
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
      description: "Delete a IVS Channel",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IVS Channel",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IVS::Channel",
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
      description: "Sync IVS Channel state from AWS",
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
            "AWS::IVS::Channel",
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
