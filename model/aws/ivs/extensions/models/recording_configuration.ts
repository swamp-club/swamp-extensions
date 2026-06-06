// Auto-generated extension model for @swamp/aws/ivs/recording-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IVS RecordingConfiguration (AWS::IVS::RecordingConfiguration).
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

const S3DestinationConfigurationSchema = z.object({
  BucketName: z.string().min(3).max(63).regex(new RegExp("^[a-z0-9-.]+$")),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9-_]*$"))
    .describe("Recording Configuration Name.").optional(),
  RecordingReconnectWindowSeconds: z.number().int().min(0).max(300).describe(
    "Recording Reconnect Window Seconds. (0 means disabled)",
  ).optional(),
  DestinationConfiguration: z.object({
    S3: S3DestinationConfigurationSchema.describe(
      "Recording S3 Destination Configuration.",
    ).optional(),
  }).describe("Recording Destination Configuration."),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the asset model.",
  ).optional(),
  ThumbnailConfiguration: z.object({
    RecordingMode: z.enum(["INTERVAL", "DISABLED"]).describe(
      "Thumbnail Recording Mode, which determines whether thumbnails are recorded at an interval or are disabled.",
    ).optional(),
    TargetIntervalSeconds: z.number().int().min(1).max(60).describe(
      "Target Interval Seconds defines the interval at which thumbnails are recorded. This field is required if RecordingMode is INTERVAL.",
    ).optional(),
    Resolution: z.enum(["FULL_HD", "HD", "SD", "LOWEST_RESOLUTION"]).describe(
      "Resolution indicates the desired resolution of recorded thumbnails.",
    ).optional(),
    Storage: z.array(z.enum(["SEQUENTIAL", "LATEST"])).describe(
      "Storage indicates the format in which thumbnails are recorded.",
    ).optional(),
  }).describe("Recording Thumbnail Configuration.").optional(),
  RenditionConfiguration: z.object({
    RenditionSelection: z.enum(["ALL", "NONE", "CUSTOM"]).describe(
      "Resolution Selection indicates which set of renditions are recorded for a stream.",
    ).optional(),
    Renditions: z.array(z.enum(["FULL_HD", "HD", "SD", "LOWEST_RESOLUTION"]))
      .describe(
        "Renditions indicates which renditions are recorded for a stream.",
      ).optional(),
  }).describe(
    "Rendition Configuration describes which renditions should be recorded for a stream.",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  Name: z.string().optional(),
  State: z.string().optional(),
  RecordingReconnectWindowSeconds: z.number().optional(),
  DestinationConfiguration: z.object({
    S3: S3DestinationConfigurationSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  ThumbnailConfiguration: z.object({
    RecordingMode: z.string(),
    TargetIntervalSeconds: z.number(),
    Resolution: z.string(),
    Storage: z.array(z.string()),
  }).optional(),
  RenditionConfiguration: z.object({
    RenditionSelection: z.string(),
    Renditions: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(0).max(128).regex(new RegExp("^[a-zA-Z0-9-_]*$"))
    .describe("Recording Configuration Name.").optional(),
  RecordingReconnectWindowSeconds: z.number().int().min(0).max(300).describe(
    "Recording Reconnect Window Seconds. (0 means disabled)",
  ).optional(),
  DestinationConfiguration: z.object({
    S3: S3DestinationConfigurationSchema.describe(
      "Recording S3 Destination Configuration.",
    ).optional(),
  }).describe("Recording Destination Configuration.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the asset model.",
  ).optional(),
  ThumbnailConfiguration: z.object({
    RecordingMode: z.enum(["INTERVAL", "DISABLED"]).describe(
      "Thumbnail Recording Mode, which determines whether thumbnails are recorded at an interval or are disabled.",
    ).optional(),
    TargetIntervalSeconds: z.number().int().min(1).max(60).describe(
      "Target Interval Seconds defines the interval at which thumbnails are recorded. This field is required if RecordingMode is INTERVAL.",
    ).optional(),
    Resolution: z.enum(["FULL_HD", "HD", "SD", "LOWEST_RESOLUTION"]).describe(
      "Resolution indicates the desired resolution of recorded thumbnails.",
    ).optional(),
    Storage: z.array(z.enum(["SEQUENTIAL", "LATEST"])).describe(
      "Storage indicates the format in which thumbnails are recorded.",
    ).optional(),
  }).describe("Recording Thumbnail Configuration.").optional(),
  RenditionConfiguration: z.object({
    RenditionSelection: z.enum(["ALL", "NONE", "CUSTOM"]).describe(
      "Resolution Selection indicates which set of renditions are recorded for a stream.",
    ).optional(),
    Renditions: z.array(z.enum(["FULL_HD", "HD", "SD", "LOWEST_RESOLUTION"]))
      .describe(
        "Renditions indicates which renditions are recorded for a stream.",
      ).optional(),
  }).describe(
    "Rendition Configuration describes which renditions should be recorded for a stream.",
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

/** Swamp extension model for IVS RecordingConfiguration. Registered at `@swamp/aws/ivs/recording-configuration`. */
export const model = {
  type: "@swamp/aws/ivs/recording-configuration",
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
      description: "IVS RecordingConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IVS RecordingConfiguration",
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
          "AWS::IVS::RecordingConfiguration",
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
      description: "Get a IVS RecordingConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IVS RecordingConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IVS::RecordingConfiguration",
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
      description: "Update a IVS RecordingConfiguration",
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
          "AWS::IVS::RecordingConfiguration",
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
          "AWS::IVS::RecordingConfiguration",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "DestinationConfiguration",
            "S3",
            "BucketName",
            "RecordingReconnectWindowSeconds",
            "ThumbnailConfiguration",
            "RecordingMode",
            "TargetIntervalSeconds",
            "Storage",
            "Resolution",
            "RenditionConfiguration",
            "RenditionSelection",
            "Renditions",
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
      description: "Delete a IVS RecordingConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IVS RecordingConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IVS::RecordingConfiguration",
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
      description: "Sync IVS RecordingConfiguration state from AWS",
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
            "AWS::IVS::RecordingConfiguration",
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
