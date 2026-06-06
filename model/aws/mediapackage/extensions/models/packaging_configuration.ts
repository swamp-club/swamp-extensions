// Auto-generated extension model for @swamp/aws/mediapackage/packaging-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaPackage PackagingConfiguration (AWS::MediaPackage::PackagingConfiguration).
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
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const EncryptionContractConfigurationSchema = z.object({
  PresetSpeke20Audio: z.enum([
    "PRESET-AUDIO-1",
    "PRESET-AUDIO-2",
    "PRESET-AUDIO-3",
    "SHARED",
    "UNENCRYPTED",
  ]).describe("A collection of audio encryption presets."),
  PresetSpeke20Video: z.enum([
    "PRESET-VIDEO-1",
    "PRESET-VIDEO-2",
    "PRESET-VIDEO-3",
    "PRESET-VIDEO-4",
    "PRESET-VIDEO-5",
    "PRESET-VIDEO-6",
    "PRESET-VIDEO-7",
    "PRESET-VIDEO-8",
    "SHARED",
    "UNENCRYPTED",
  ]).describe("A collection of video encryption presets."),
});

const SpekeKeyProviderSchema = z.object({
  EncryptionContractConfiguration: EncryptionContractConfigurationSchema
    .describe(
      "The configuration to use for encrypting one or more content tracks separately for endpoints that use SPEKE 2.0.",
    ).optional(),
  RoleArn: z.string().describe(
    "An Amazon Resource Name (ARN) of an IAM role that AWS Elemental MediaPackage will assume when accessing the key provider service.",
  ),
  SystemIds: z.array(z.string()).describe(
    "The system IDs to include in key requests.",
  ),
  Url: z.string().describe("The URL of the external key provider service."),
});

const CmafEncryptionSchema = z.object({
  SpekeKeyProvider: SpekeKeyProviderSchema.describe(
    "A configuration for accessing an external Secure Packager and Encoder Key Exchange (SPEKE) service that will provide encryption keys.",
  ),
});

const StreamSelectionSchema = z.object({
  MaxVideoBitsPerSecond: z.number().int().describe(
    "The maximum video bitrate (bps) to include in output.",
  ).optional(),
  MinVideoBitsPerSecond: z.number().int().describe(
    "The minimum video bitrate (bps) to include in output.",
  ).optional(),
  StreamOrder: z.enum([
    "ORIGINAL",
    "VIDEO_BITRATE_ASCENDING",
    "VIDEO_BITRATE_DESCENDING",
  ]).describe("A directive that determines the order of streams in the output.")
    .optional(),
});

const HlsManifestSchema = z.object({
  AdMarkers: z.enum(["NONE", "SCTE35_ENHANCED", "PASSTHROUGH"]).describe(
    'This setting controls how ad markers are included in the packaged OriginEndpoint. "NONE" will omit all SCTE-35 ad markers from the output. "PASSTHROUGH" causes the manifest to contain a copy of the SCTE-35 ad markers (comments) taken directly from the input HTTP Live Streaming (HLS) manifest. "SCTE35_ENHANCED" generates ad markers and blackout tags based on SCTE-35 messages in the input source.',
  ).optional(),
  IncludeIframeOnlyStream: z.boolean().describe(
    "When enabled, an I-Frame only stream will be included in the output.",
  ).optional(),
  ManifestName: z.string().describe(
    "An optional string to include in the name of the manifest.",
  ).optional(),
  ProgramDateTimeIntervalSeconds: z.number().int().describe(
    "The interval (in seconds) between each EXT-X-PROGRAM-DATE-TIME tag inserted into manifests. Additionally, when an interval is specified ID3Timed Metadata messages will be generated every 5 seconds using the ingest time of the content. If the interval is not specified, or set to 0, then no EXT-X-PROGRAM-DATE-TIME tags will be inserted into manifests and no ID3Timed Metadata messages will be generated. Note that irrespective of this parameter, if any ID3 Timed Metadata is found in HTTP Live Streaming (HLS) input, it will be passed through to HLS output.",
  ).optional(),
  RepeatExtXKey: z.boolean().describe(
    "When enabled, the EXT-X-KEY tag will be repeated in output manifests.",
  ).optional(),
  StreamSelection: StreamSelectionSchema.describe(
    "A StreamSelection configuration.",
  ).optional(),
});

const DashManifestSchema = z.object({
  ManifestLayout: z.enum(["FULL", "COMPACT"]).describe(
    "Determines the position of some tags in the Media Presentation Description (MPD). When set to FULL, elements like SegmentTemplate and ContentProtection are included in each Representation. When set to COMPACT, duplicate elements are combined and presented at the AdaptationSet level.",
  ).optional(),
  ManifestName: z.string().describe(
    "An optional string to include in the name of the manifest.",
  ).optional(),
  MinBufferTimeSeconds: z.number().int().describe(
    "Minimum duration (in seconds) that a player will buffer media before starting the presentation.",
  ).optional(),
  Profile: z.enum(["NONE", "HBBTV_1_5"]).describe(
    'The Dynamic Adaptive Streaming over HTTP (DASH) profile type. When set to "HBBTV_1_5", HbbTV 1.5 compliant output is enabled.',
  ).optional(),
  ScteMarkersSource: z.enum(["SEGMENTS", "MANIFEST"]).describe(
    "The source of scte markers used. When set to SEGMENTS, the scte markers are sourced from the segments of the ingested content. When set to MANIFEST, the scte markers are sourced from the manifest of the ingested content.",
  ).optional(),
  StreamSelection: StreamSelectionSchema.describe(
    "A StreamSelection configuration.",
  ).optional(),
});

const DashEncryptionSchema = z.object({
  SpekeKeyProvider: SpekeKeyProviderSchema.describe(
    "A configuration for accessing an external Secure Packager and Encoder Key Exchange (SPEKE) service that will provide encryption keys.",
  ),
});

const HlsEncryptionSchema = z.object({
  ConstantInitializationVector: z.string().describe(
    "An HTTP Live Streaming (HLS) encryption configuration.",
  ).optional(),
  EncryptionMethod: z.enum(["AES_128", "SAMPLE_AES"]).describe(
    "The encryption method to use.",
  ).optional(),
  SpekeKeyProvider: SpekeKeyProviderSchema.describe(
    "A configuration for accessing an external Secure Packager and Encoder Key Exchange (SPEKE) service that will provide encryption keys.",
  ),
});

const MssEncryptionSchema = z.object({
  SpekeKeyProvider: SpekeKeyProviderSchema.describe(
    "A configuration for accessing an external Secure Packager and Encoder Key Exchange (SPEKE) service that will provide encryption keys.",
  ),
});

const MssManifestSchema = z.object({
  ManifestName: z.string().describe(
    "An optional string to include in the name of the manifest.",
  ).optional(),
  StreamSelection: StreamSelectionSchema.describe(
    "A StreamSelection configuration.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Id: z.string().describe("The ID of the PackagingConfiguration."),
  PackagingGroupId: z.string().describe("The ID of a PackagingGroup."),
  CmafPackage: z.object({
    Encryption: CmafEncryptionSchema.describe(
      "A CMAF encryption configuration.",
    ).optional(),
    HlsManifests: z.array(HlsManifestSchema).describe(
      "A list of HLS manifest configurations.",
    ),
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each fragment. Actual fragments will be rounded to the nearest multiple of the source fragment duration.",
    ).optional(),
    IncludeEncoderConfigurationInSegments: z.boolean().describe(
      "When includeEncoderConfigurationInSegments is set to true, MediaPackage places your encoder's Sequence Parameter Set (SPS), Picture Parameter Set (PPS), and Video Parameter Set (VPS) metadata in every video segment instead of in the init fragment. This lets you use different SPS/PPS/VPS settings for your assets during content playback.",
    ).optional(),
  }).describe("A CMAF packaging configuration.").optional(),
  DashPackage: z.object({
    DashManifests: z.array(DashManifestSchema).describe(
      "A list of DASH manifest configurations.",
    ),
    Encryption: DashEncryptionSchema.describe(
      "A Dynamic Adaptive Streaming over HTTP (DASH) encryption configuration.",
    ).optional(),
    PeriodTriggers: z.array(z.enum(["ADS"])).describe(
      'A list of triggers that controls when the outgoing Dynamic Adaptive Streaming over HTTP (DASH) Media Presentation Description (MPD) will be partitioned into multiple periods. If empty, the content will not be partitioned into more than one period. If the list contains "ADS", new periods will be created where the Asset contains SCTE-35 ad markers.',
    ).optional(),
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each fragment. Actual fragments will be rounded to the nearest multiple of the source fragment duration.",
    ).optional(),
    SegmentTemplateFormat: z.enum([
      "NUMBER_WITH_TIMELINE",
      "TIME_WITH_TIMELINE",
      "NUMBER_WITH_DURATION",
    ]).describe(
      "Determines the type of SegmentTemplate included in the Media Presentation Description (MPD). When set to NUMBER_WITH_TIMELINE, a full timeline is presented in each SegmentTemplate, with $Number$ media URLs. When set to TIME_WITH_TIMELINE, a full timeline is presented in each SegmentTemplate, with $Time$ media URLs. When set to NUMBER_WITH_DURATION, only a duration is included in each SegmentTemplate, with $Number$ media URLs.",
    ).optional(),
    IncludeEncoderConfigurationInSegments: z.boolean().describe(
      "When includeEncoderConfigurationInSegments is set to true, MediaPackage places your encoder's Sequence Parameter Set (SPS), Picture Parameter Set (PPS), and Video Parameter Set (VPS) metadata in every video segment instead of in the init fragment. This lets you use different SPS/PPS/VPS settings for your assets during content playback.",
    ).optional(),
    IncludeIframeOnlyStream: z.boolean().describe(
      "When enabled, an I-Frame only stream will be included in the output.",
    ).optional(),
  }).describe(
    "A Dynamic Adaptive Streaming over HTTP (DASH) packaging configuration.",
  ).optional(),
  HlsPackage: z.object({
    Encryption: HlsEncryptionSchema.describe(
      "An HTTP Live Streaming (HLS) encryption configuration.",
    ).optional(),
    HlsManifests: z.array(HlsManifestSchema).describe(
      "A list of HLS manifest configurations.",
    ),
    IncludeDvbSubtitles: z.boolean().describe(
      "When enabled, MediaPackage passes through digital video broadcasting (DVB) subtitles into the output.",
    ).optional(),
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each fragment. Actual fragments will be rounded to the nearest multiple of the source fragment duration.",
    ).optional(),
    UseAudioRenditionGroup: z.boolean().describe(
      "When enabled, audio streams will be placed in rendition groups in the output.",
    ).optional(),
  }).describe("An HTTP Live Streaming (HLS) packaging configuration.")
    .optional(),
  MssPackage: z.object({
    Encryption: MssEncryptionSchema.describe("A CMAF encryption configuration.")
      .optional(),
    MssManifests: z.array(MssManifestSchema).describe(
      "A list of MSS manifest configurations.",
    ),
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each fragment. Actual fragments will be rounded to the nearest multiple of the source fragment duration.",
    ).optional(),
  }).describe("A Microsoft Smooth Streaming (MSS) PackagingConfiguration.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  PackagingGroupId: z.string().optional(),
  Arn: z.string().optional(),
  CmafPackage: z.object({
    Encryption: CmafEncryptionSchema,
    HlsManifests: z.array(HlsManifestSchema),
    SegmentDurationSeconds: z.number(),
    IncludeEncoderConfigurationInSegments: z.boolean(),
  }).optional(),
  DashPackage: z.object({
    DashManifests: z.array(DashManifestSchema),
    Encryption: DashEncryptionSchema,
    PeriodTriggers: z.array(z.string()),
    SegmentDurationSeconds: z.number(),
    SegmentTemplateFormat: z.string(),
    IncludeEncoderConfigurationInSegments: z.boolean(),
    IncludeIframeOnlyStream: z.boolean(),
  }).optional(),
  HlsPackage: z.object({
    Encryption: HlsEncryptionSchema,
    HlsManifests: z.array(HlsManifestSchema),
    IncludeDvbSubtitles: z.boolean(),
    SegmentDurationSeconds: z.number(),
    UseAudioRenditionGroup: z.boolean(),
  }).optional(),
  MssPackage: z.object({
    Encryption: MssEncryptionSchema,
    MssManifests: z.array(MssManifestSchema),
    SegmentDurationSeconds: z.number(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Id: z.string().describe("The ID of the PackagingConfiguration.").optional(),
  PackagingGroupId: z.string().describe("The ID of a PackagingGroup.")
    .optional(),
  CmafPackage: z.object({
    Encryption: CmafEncryptionSchema.describe(
      "A CMAF encryption configuration.",
    ).optional(),
    HlsManifests: z.array(HlsManifestSchema).describe(
      "A list of HLS manifest configurations.",
    ).optional(),
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each fragment. Actual fragments will be rounded to the nearest multiple of the source fragment duration.",
    ).optional(),
    IncludeEncoderConfigurationInSegments: z.boolean().describe(
      "When includeEncoderConfigurationInSegments is set to true, MediaPackage places your encoder's Sequence Parameter Set (SPS), Picture Parameter Set (PPS), and Video Parameter Set (VPS) metadata in every video segment instead of in the init fragment. This lets you use different SPS/PPS/VPS settings for your assets during content playback.",
    ).optional(),
  }).describe("A CMAF packaging configuration.").optional(),
  DashPackage: z.object({
    DashManifests: z.array(DashManifestSchema).describe(
      "A list of DASH manifest configurations.",
    ).optional(),
    Encryption: DashEncryptionSchema.describe(
      "A Dynamic Adaptive Streaming over HTTP (DASH) encryption configuration.",
    ).optional(),
    PeriodTriggers: z.array(z.enum(["ADS"])).describe(
      'A list of triggers that controls when the outgoing Dynamic Adaptive Streaming over HTTP (DASH) Media Presentation Description (MPD) will be partitioned into multiple periods. If empty, the content will not be partitioned into more than one period. If the list contains "ADS", new periods will be created where the Asset contains SCTE-35 ad markers.',
    ).optional(),
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each fragment. Actual fragments will be rounded to the nearest multiple of the source fragment duration.",
    ).optional(),
    SegmentTemplateFormat: z.enum([
      "NUMBER_WITH_TIMELINE",
      "TIME_WITH_TIMELINE",
      "NUMBER_WITH_DURATION",
    ]).describe(
      "Determines the type of SegmentTemplate included in the Media Presentation Description (MPD). When set to NUMBER_WITH_TIMELINE, a full timeline is presented in each SegmentTemplate, with $Number$ media URLs. When set to TIME_WITH_TIMELINE, a full timeline is presented in each SegmentTemplate, with $Time$ media URLs. When set to NUMBER_WITH_DURATION, only a duration is included in each SegmentTemplate, with $Number$ media URLs.",
    ).optional(),
    IncludeEncoderConfigurationInSegments: z.boolean().describe(
      "When includeEncoderConfigurationInSegments is set to true, MediaPackage places your encoder's Sequence Parameter Set (SPS), Picture Parameter Set (PPS), and Video Parameter Set (VPS) metadata in every video segment instead of in the init fragment. This lets you use different SPS/PPS/VPS settings for your assets during content playback.",
    ).optional(),
    IncludeIframeOnlyStream: z.boolean().describe(
      "When enabled, an I-Frame only stream will be included in the output.",
    ).optional(),
  }).describe(
    "A Dynamic Adaptive Streaming over HTTP (DASH) packaging configuration.",
  ).optional(),
  HlsPackage: z.object({
    Encryption: HlsEncryptionSchema.describe(
      "An HTTP Live Streaming (HLS) encryption configuration.",
    ).optional(),
    HlsManifests: z.array(HlsManifestSchema).describe(
      "A list of HLS manifest configurations.",
    ).optional(),
    IncludeDvbSubtitles: z.boolean().describe(
      "When enabled, MediaPackage passes through digital video broadcasting (DVB) subtitles into the output.",
    ).optional(),
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each fragment. Actual fragments will be rounded to the nearest multiple of the source fragment duration.",
    ).optional(),
    UseAudioRenditionGroup: z.boolean().describe(
      "When enabled, audio streams will be placed in rendition groups in the output.",
    ).optional(),
  }).describe("An HTTP Live Streaming (HLS) packaging configuration.")
    .optional(),
  MssPackage: z.object({
    Encryption: MssEncryptionSchema.describe("A CMAF encryption configuration.")
      .optional(),
    MssManifests: z.array(MssManifestSchema).describe(
      "A list of MSS manifest configurations.",
    ).optional(),
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each fragment. Actual fragments will be rounded to the nearest multiple of the source fragment duration.",
    ).optional(),
  }).describe("A Microsoft Smooth Streaming (MSS) PackagingConfiguration.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
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

/** Swamp extension model for MediaPackage PackagingConfiguration. Registered at `@swamp/aws/mediapackage/packaging-configuration`. */
export const model = {
  type: "@swamp/aws/mediapackage/packaging-configuration",
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
      description: "MediaPackage PackagingConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaPackage PackagingConfiguration",
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
          "AWS::MediaPackage::PackagingConfiguration",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Id ?? g.Id)?.toString() ?? "current")
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
      description: "Get a MediaPackage PackagingConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaPackage PackagingConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaPackage::PackagingConfiguration",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Id ?? context.globalArgs.Id)?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a MediaPackage PackagingConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaPackage PackagingConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaPackage::PackagingConfiguration",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Id?.toString() ?? args.identifier).replace(
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
      description: "Sync MediaPackage PackagingConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Id?.toString() ?? "current").replace(
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaPackage::PackagingConfiguration",
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
