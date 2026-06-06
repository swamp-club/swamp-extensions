// Auto-generated extension model for @swamp/aws/mediapackage/origin-endpoint
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaPackage OriginEndpoint (AWS::MediaPackage::OriginEndpoint).
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
  ResourceId: z.string().describe(
    "The resource ID to include in key requests.",
  ),
  SystemIds: z.array(z.string()).describe(
    "The system IDs to include in key requests.",
  ),
  RoleArn: z.string().describe(
    "An Amazon Resource Name (ARN) of an IAM role that AWS Elemental MediaPackage will assume when accessing the key provider service.",
  ),
  CertificateArn: z.string().describe(
    "An Amazon Resource Name (ARN) of a Certificate Manager certificate that MediaPackage will use for enforcing secure end-to-end data transfer with the key provider service.",
  ).optional(),
  EncryptionContractConfiguration: EncryptionContractConfigurationSchema
    .describe(
      "The configuration to use for encrypting one or more content tracks separately for endpoints that use SPEKE 2.0.",
    ).optional(),
});

const HlsEncryptionSchema = z.object({
  EncryptionMethod: z.enum(["AES_128", "SAMPLE_AES"]).describe(
    "The encryption method to use.",
  ).optional(),
  ConstantInitializationVector: z.string().describe(
    "A constant initialization vector for encryption (optional). When not specified the initialization vector will be periodically rotated.",
  ).optional(),
  KeyRotationIntervalSeconds: z.number().int().describe(
    "Interval (in seconds) between each encryption key rotation.",
  ).optional(),
  RepeatExtXKey: z.boolean().describe(
    "When enabled, the EXT-X-KEY tag will be repeated in output manifests.",
  ).optional(),
  SpekeKeyProvider: SpekeKeyProviderSchema.describe(
    "A configuration for accessing an external Secure Packager and Encoder Key Exchange (SPEKE) service that will provide encryption keys.",
  ),
});

const StreamSelectionSchema = z.object({
  MinVideoBitsPerSecond: z.number().int().describe(
    "The minimum video bitrate (bps) to include in output.",
  ).optional(),
  MaxVideoBitsPerSecond: z.number().int().describe(
    "The maximum video bitrate (bps) to include in output.",
  ).optional(),
  StreamOrder: z.enum([
    "ORIGINAL",
    "VIDEO_BITRATE_ASCENDING",
    "VIDEO_BITRATE_DESCENDING",
  ]).describe("A directive that determines the order of streams in the output.")
    .optional(),
});

const DashEncryptionSchema = z.object({
  KeyRotationIntervalSeconds: z.number().int().describe(
    "Time (in seconds) between each encryption key rotation.",
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

const CmafEncryptionSchema = z.object({
  KeyRotationIntervalSeconds: z.number().int().describe(
    "Time (in seconds) between each encryption key rotation.",
  ).optional(),
  SpekeKeyProvider: SpekeKeyProviderSchema.describe(
    "A configuration for accessing an external Secure Packager and Encoder Key Exchange (SPEKE) service that will provide encryption keys.",
  ),
  ConstantInitializationVector: z.string().min(32).max(32).regex(
    new RegExp("^[0-9a-fA-F]+$"),
  ).describe(
    "An optional 128-bit, 16-byte hex value represented by a 32-character string, used in conjunction with the key for encrypting blocks. If you don't specify a value, then MediaPackage creates the constant initialization vector (IV).",
  ).optional(),
  EncryptionMethod: z.enum(["SAMPLE_AES", "AES_CTR"]).describe(
    "The encryption method used",
  ).optional(),
});

const HlsManifestSchema = z.object({
  Id: z.string().describe(
    "The ID of the manifest. The ID must be unique within the OriginEndpoint and it cannot be changed after it is created.",
  ),
  ManifestName: z.string().describe(
    "An optional short string appended to the end of the OriginEndpoint URL. If not specified, defaults to the manifestName for the OriginEndpoint.",
  ).optional(),
  Url: z.string().describe(
    "The URL of the packaged OriginEndpoint for consumption.",
  ).optional(),
  PlaylistWindowSeconds: z.number().int().describe(
    "Time window (in seconds) contained in each parent manifest.",
  ).optional(),
  PlaylistType: z.enum(["NONE", "EVENT", "VOD"]).describe(
    'The HTTP Live Streaming (HLS) playlist type. When either "EVENT" or "VOD" is specified, a corresponding EXT-X-PLAYLIST-TYPE entry will be included in the media playlist.',
  ).optional(),
  AdMarkers: z.enum(["NONE", "SCTE35_ENHANCED", "PASSTHROUGH", "DATERANGE"])
    .describe(
      'This setting controls how ad markers are included in the packaged OriginEndpoint. "NONE" will omit all SCTE-35 ad markers from the output. "PASSTHROUGH" causes the manifest to contain a copy of the SCTE-35 ad markers (comments) taken directly from the input HTTP Live Streaming (HLS) manifest. "SCTE35_ENHANCED" generates ad markers and blackout tags based on SCTE-35 messages in the input source. "DATERANGE" inserts EXT-X-DATERANGE tags to signal ad and program transition events in HLS and CMAF manifests. For this option, you must set a programDateTimeIntervalSeconds value that is greater than 0.',
    ).optional(),
  ProgramDateTimeIntervalSeconds: z.number().int().describe(
    "The interval (in seconds) between each EXT-X-PROGRAM-DATE-TIME tag inserted into manifests. Additionally, when an interval is specified ID3Timed Metadata messages will be generated every 5 seconds using the ingest time of the content. If the interval is not specified, or set to 0, then no EXT-X-PROGRAM-DATE-TIME tags will be inserted into manifests and no ID3Timed Metadata messages will be generated. Note that irrespective of this parameter, if any ID3 Timed Metadata is found in HTTP Live Streaming (HLS) input, it will be passed through to HLS output.",
  ).optional(),
  IncludeIframeOnlyStream: z.boolean().describe(
    "When enabled, an I-Frame only stream will be included in the output.",
  ).optional(),
  AdTriggers: z.array(
    z.enum([
      "SPLICE_INSERT",
      "BREAK",
      "PROVIDER_ADVERTISEMENT",
      "DISTRIBUTOR_ADVERTISEMENT",
      "PROVIDER_PLACEMENT_OPPORTUNITY",
      "DISTRIBUTOR_PLACEMENT_OPPORTUNITY",
      "PROVIDER_OVERLAY_PLACEMENT_OPPORTUNITY",
      "DISTRIBUTOR_OVERLAY_PLACEMENT_OPPORTUNITY",
    ]),
  ).describe(
    "A list of SCTE-35 message types that are treated as ad markers in the output. If empty, no ad markers are output. Specify multiple items to create ad markers for all of the included message types.",
  ).optional(),
  AdsOnDeliveryRestrictions: z.enum([
    "NONE",
    "RESTRICTED",
    "UNRESTRICTED",
    "BOTH",
  ]).describe(
    'This setting allows the delivery restriction flags on SCTE-35 segmentation descriptors to determine whether a message signals an ad. Choosing "NONE" means no SCTE-35 messages become ads. Choosing "RESTRICTED" means SCTE-35 messages of the types specified in AdTriggers that contain delivery restrictions will be treated as ads. Choosing "UNRESTRICTED" means SCTE-35 messages of the types specified in AdTriggers that do not contain delivery restrictions will be treated as ads. Choosing "BOTH" means all SCTE-35 messages of the types specified in AdTriggers will be treated as ads. Note that Splice Insert messages do not have these flags and are always treated as ads if specified in AdTriggers.',
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
  Id: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z-_]+$")).describe(
    "The ID of the OriginEndpoint.",
  ),
  ChannelId: z.string().describe(
    "The ID of the Channel the OriginEndpoint is associated with.",
  ),
  Description: z.string().describe(
    "A short text description of the OriginEndpoint.",
  ).optional(),
  Whitelist: z.array(z.string()).describe(
    "A list of source IP CIDR blocks that will be allowed to access the OriginEndpoint.",
  ).optional(),
  StartoverWindowSeconds: z.number().int().describe(
    "Maximum duration (seconds) of content to retain for startover playback. If not specified, startover playback will be disabled for the OriginEndpoint.",
  ).optional(),
  TimeDelaySeconds: z.number().int().describe(
    "Amount of delay (seconds) to enforce on the playback of live content. If not specified, there will be no time delay in effect for the OriginEndpoint.",
  ).optional(),
  ManifestName: z.string().describe(
    "A short string appended to the end of the OriginEndpoint URL.",
  ).optional(),
  Origination: z.enum(["ALLOW", "DENY"]).describe(
    "Control whether origination of video is allowed for this OriginEndpoint. If set to ALLOW, the OriginEndpoint may by requested, pursuant to any other form of access control. If set to DENY, the OriginEndpoint may not be requested. This can be helpful for Live to VOD harvesting, or for temporarily disabling origination",
  ).optional(),
  Authorization: z.object({
    SecretsRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the IAM role that allows MediaPackage to communicate with AWS Secrets Manager.",
    ),
    CdnIdentifierSecret: z.string().describe(
      "The Amazon Resource Name (ARN) for the secret in Secrets Manager that your Content Distribution Network (CDN) uses for authorization to access your endpoint.",
    ),
  }).describe("CDN Authorization credentials").optional(),
  HlsPackage: z.object({
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each fragment. Actual fragments will be rounded to the nearest multiple of the source fragment duration.",
    ).optional(),
    PlaylistWindowSeconds: z.number().int().describe(
      "Time window (in seconds) contained in each parent manifest.",
    ).optional(),
    PlaylistType: z.enum(["NONE", "EVENT", "VOD"]).describe(
      'The HTTP Live Streaming (HLS) playlist type. When either "EVENT" or "VOD" is specified, a corresponding EXT-X-PLAYLIST-TYPE entry will be included in the media playlist.',
    ).optional(),
    AdMarkers: z.enum(["NONE", "SCTE35_ENHANCED", "PASSTHROUGH", "DATERANGE"])
      .describe(
        'This setting controls how ad markers are included in the packaged OriginEndpoint. "NONE" will omit all SCTE-35 ad markers from the output. "PASSTHROUGH" causes the manifest to contain a copy of the SCTE-35 ad markers (comments) taken directly from the input HTTP Live Streaming (HLS) manifest. "SCTE35_ENHANCED" generates ad markers and blackout tags based on SCTE-35 messages in the input source. "DATERANGE" inserts EXT-X-DATERANGE tags to signal ad and program transition events in HLS and CMAF manifests. For this option, you must set a programDateTimeIntervalSeconds value that is greater than 0.',
      ).optional(),
    AdTriggers: z.array(
      z.enum([
        "SPLICE_INSERT",
        "BREAK",
        "PROVIDER_ADVERTISEMENT",
        "DISTRIBUTOR_ADVERTISEMENT",
        "PROVIDER_PLACEMENT_OPPORTUNITY",
        "DISTRIBUTOR_PLACEMENT_OPPORTUNITY",
        "PROVIDER_OVERLAY_PLACEMENT_OPPORTUNITY",
        "DISTRIBUTOR_OVERLAY_PLACEMENT_OPPORTUNITY",
      ]),
    ).describe(
      "A list of SCTE-35 message types that are treated as ad markers in the output. If empty, no ad markers are output. Specify multiple items to create ad markers for all of the included message types.",
    ).optional(),
    AdsOnDeliveryRestrictions: z.enum([
      "NONE",
      "RESTRICTED",
      "UNRESTRICTED",
      "BOTH",
    ]).describe(
      'This setting allows the delivery restriction flags on SCTE-35 segmentation descriptors to determine whether a message signals an ad. Choosing "NONE" means no SCTE-35 messages become ads. Choosing "RESTRICTED" means SCTE-35 messages of the types specified in AdTriggers that contain delivery restrictions will be treated as ads. Choosing "UNRESTRICTED" means SCTE-35 messages of the types specified in AdTriggers that do not contain delivery restrictions will be treated as ads. Choosing "BOTH" means all SCTE-35 messages of the types specified in AdTriggers will be treated as ads. Note that Splice Insert messages do not have these flags and are always treated as ads if specified in AdTriggers.',
    ).optional(),
    ProgramDateTimeIntervalSeconds: z.number().int().describe(
      "The interval (in seconds) between each EXT-X-PROGRAM-DATE-TIME tag inserted into manifests. Additionally, when an interval is specified ID3Timed Metadata messages will be generated every 5 seconds using the ingest time of the content. If the interval is not specified, or set to 0, then no EXT-X-PROGRAM-DATE-TIME tags will be inserted into manifests and no ID3Timed Metadata messages will be generated. Note that irrespective of this parameter, if any ID3 Timed Metadata is found in HTTP Live Streaming (HLS) input, it will be passed through to HLS output.",
    ).optional(),
    IncludeIframeOnlyStream: z.boolean().describe(
      "When enabled, an I-Frame only stream will be included in the output.",
    ).optional(),
    UseAudioRenditionGroup: z.boolean().describe(
      "When enabled, audio streams will be placed in rendition groups in the output.",
    ).optional(),
    IncludeDvbSubtitles: z.boolean().describe(
      "When enabled, MediaPackage passes through digital video broadcasting (DVB) subtitles into the output.",
    ).optional(),
    Encryption: HlsEncryptionSchema.describe(
      "An HTTP Live Streaming (HLS) encryption configuration.",
    ).optional(),
    StreamSelection: StreamSelectionSchema.describe(
      "A StreamSelection configuration.",
    ).optional(),
  }).describe("An HTTP Live Streaming (HLS) packaging configuration.")
    .optional(),
  DashPackage: z.object({
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each segment. Actual segments will be rounded to the nearest multiple of the source segment duration.",
    ).optional(),
    ManifestWindowSeconds: z.number().int().describe(
      "Time window (in seconds) contained in each manifest.",
    ).optional(),
    Profile: z.enum(["NONE", "HBBTV_1_5", "HYBRIDCAST", "DVB_DASH_2014"])
      .describe(
        'The Dynamic Adaptive Streaming over HTTP (DASH) profile type. When set to "HBBTV_1_5", HbbTV 1.5 compliant output is enabled.',
      ).optional(),
    MinUpdatePeriodSeconds: z.number().int().describe(
      "Minimum duration (in seconds) between potential changes to the Dynamic Adaptive Streaming over HTTP (DASH) Media Presentation Description (MPD).",
    ).optional(),
    MinBufferTimeSeconds: z.number().int().describe(
      "Minimum duration (in seconds) that a player will buffer media before starting the presentation.",
    ).optional(),
    SuggestedPresentationDelaySeconds: z.number().int().describe(
      "Duration (in seconds) to delay live content before presentation.",
    ).optional(),
    PeriodTriggers: z.array(z.enum(["ADS"])).describe(
      'A list of triggers that controls when the outgoing Dynamic Adaptive Streaming over HTTP (DASH) Media Presentation Description (MPD) will be partitioned into multiple periods. If empty, the content will not be partitioned into more than one period. If the list contains "ADS", new periods will be created where the Channel source contains SCTE-35 ad markers.',
    ).optional(),
    IncludeIframeOnlyStream: z.boolean().describe(
      "When enabled, an I-Frame only stream will be included in the output.",
    ).optional(),
    ManifestLayout: z.enum(["FULL", "COMPACT", "DRM_TOP_LEVEL_COMPACT"])
      .describe(
        "Determines the position of some tags in the Media Presentation Description (MPD). When set to FULL, elements like SegmentTemplate and ContentProtection are included in each Representation. When set to COMPACT, duplicate elements are combined and presented at the AdaptationSet level.",
      ).optional(),
    SegmentTemplateFormat: z.enum([
      "NUMBER_WITH_TIMELINE",
      "TIME_WITH_TIMELINE",
      "NUMBER_WITH_DURATION",
    ]).describe(
      "Determines the type of SegmentTemplate included in the Media Presentation Description (MPD). When set to NUMBER_WITH_TIMELINE, a full timeline is presented in each SegmentTemplate, with $Number$ media URLs. When set to TIME_WITH_TIMELINE, a full timeline is presented in each SegmentTemplate, with $Time$ media URLs. When set to NUMBER_WITH_DURATION, only a duration is included in each SegmentTemplate, with $Number$ media URLs.",
    ).optional(),
    AdTriggers: z.array(
      z.enum([
        "SPLICE_INSERT",
        "BREAK",
        "PROVIDER_ADVERTISEMENT",
        "DISTRIBUTOR_ADVERTISEMENT",
        "PROVIDER_PLACEMENT_OPPORTUNITY",
        "DISTRIBUTOR_PLACEMENT_OPPORTUNITY",
        "PROVIDER_OVERLAY_PLACEMENT_OPPORTUNITY",
        "DISTRIBUTOR_OVERLAY_PLACEMENT_OPPORTUNITY",
      ]),
    ).describe(
      "A list of SCTE-35 message types that are treated as ad markers in the output. If empty, no ad markers are output. Specify multiple items to create ad markers for all of the included message types.",
    ).optional(),
    AdsOnDeliveryRestrictions: z.enum([
      "NONE",
      "RESTRICTED",
      "UNRESTRICTED",
      "BOTH",
    ]).describe(
      'This setting allows the delivery restriction flags on SCTE-35 segmentation descriptors to determine whether a message signals an ad. Choosing "NONE" means no SCTE-35 messages become ads. Choosing "RESTRICTED" means SCTE-35 messages of the types specified in AdTriggers that contain delivery restrictions will be treated as ads. Choosing "UNRESTRICTED" means SCTE-35 messages of the types specified in AdTriggers that do not contain delivery restrictions will be treated as ads. Choosing "BOTH" means all SCTE-35 messages of the types specified in AdTriggers will be treated as ads. Note that Splice Insert messages do not have these flags and are always treated as ads if specified in AdTriggers.',
    ).optional(),
    Encryption: DashEncryptionSchema.describe(
      "A Dynamic Adaptive Streaming over HTTP (DASH) encryption configuration.",
    ).optional(),
    StreamSelection: StreamSelectionSchema.describe(
      "A StreamSelection configuration.",
    ).optional(),
    UtcTiming: z.enum(["HTTP-XSDATE", "HTTP-ISO", "HTTP-HEAD", "NONE"])
      .describe(
        "Determines the type of UTCTiming included in the Media Presentation Description (MPD)",
      ).optional(),
    UtcTimingUri: z.string().describe(
      "Specifies the value attribute of the UTCTiming field when utcTiming is set to HTTP-ISO, HTTP-HEAD or HTTP-XSDATE",
    ).optional(),
  }).describe(
    "A Dynamic Adaptive Streaming over HTTP (DASH) packaging configuration.",
  ).optional(),
  MssPackage: z.object({
    ManifestWindowSeconds: z.number().int().describe(
      "The time window (in seconds) contained in each manifest.",
    ).optional(),
    SegmentDurationSeconds: z.number().int().describe(
      "The duration (in seconds) of each segment.",
    ).optional(),
    Encryption: MssEncryptionSchema.describe(
      "A Microsoft Smooth Streaming (MSS) encryption configuration.",
    ).optional(),
    StreamSelection: StreamSelectionSchema.describe(
      "A StreamSelection configuration.",
    ).optional(),
  }).describe("A Microsoft Smooth Streaming (MSS) packaging configuration.")
    .optional(),
  CmafPackage: z.object({
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each segment. Actual segments will be rounded to the nearest multiple of the source segment duration.",
    ).optional(),
    SegmentPrefix: z.string().describe(
      "An optional custom string that is prepended to the name of each segment. If not specified, it defaults to the ChannelId.",
    ).optional(),
    Encryption: CmafEncryptionSchema.describe(
      "A Common Media Application Format (CMAF) encryption configuration.",
    ).optional(),
    StreamSelection: StreamSelectionSchema.describe(
      "A StreamSelection configuration.",
    ).optional(),
    HlsManifests: z.array(HlsManifestSchema).describe(
      "A list of HLS manifest configurations",
    ).optional(),
  }).describe(
    "A Common Media Application Format (CMAF) packaging configuration.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "A collection of tags associated with a resource",
  ).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  Url: z.string().optional(),
  Id: z.string(),
  ChannelId: z.string().optional(),
  Description: z.string().optional(),
  Whitelist: z.array(z.string()).optional(),
  StartoverWindowSeconds: z.number().optional(),
  TimeDelaySeconds: z.number().optional(),
  ManifestName: z.string().optional(),
  Origination: z.string().optional(),
  Authorization: z.object({
    SecretsRoleArn: z.string(),
    CdnIdentifierSecret: z.string(),
  }).optional(),
  HlsPackage: z.object({
    SegmentDurationSeconds: z.number(),
    PlaylistWindowSeconds: z.number(),
    PlaylistType: z.string(),
    AdMarkers: z.string(),
    AdTriggers: z.array(z.string()),
    AdsOnDeliveryRestrictions: z.string(),
    ProgramDateTimeIntervalSeconds: z.number(),
    IncludeIframeOnlyStream: z.boolean(),
    UseAudioRenditionGroup: z.boolean(),
    IncludeDvbSubtitles: z.boolean(),
    Encryption: HlsEncryptionSchema,
    StreamSelection: StreamSelectionSchema,
  }).optional(),
  DashPackage: z.object({
    SegmentDurationSeconds: z.number(),
    ManifestWindowSeconds: z.number(),
    Profile: z.string(),
    MinUpdatePeriodSeconds: z.number(),
    MinBufferTimeSeconds: z.number(),
    SuggestedPresentationDelaySeconds: z.number(),
    PeriodTriggers: z.array(z.string()),
    IncludeIframeOnlyStream: z.boolean(),
    ManifestLayout: z.string(),
    SegmentTemplateFormat: z.string(),
    AdTriggers: z.array(z.string()),
    AdsOnDeliveryRestrictions: z.string(),
    Encryption: DashEncryptionSchema,
    StreamSelection: StreamSelectionSchema,
    UtcTiming: z.string(),
    UtcTimingUri: z.string(),
  }).optional(),
  MssPackage: z.object({
    ManifestWindowSeconds: z.number(),
    SegmentDurationSeconds: z.number(),
    Encryption: MssEncryptionSchema,
    StreamSelection: StreamSelectionSchema,
  }).optional(),
  CmafPackage: z.object({
    SegmentDurationSeconds: z.number(),
    SegmentPrefix: z.string(),
    Encryption: CmafEncryptionSchema,
    StreamSelection: StreamSelectionSchema,
    HlsManifests: z.array(HlsManifestSchema),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Id: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z-_]+$")).describe(
    "The ID of the OriginEndpoint.",
  ).optional(),
  ChannelId: z.string().describe(
    "The ID of the Channel the OriginEndpoint is associated with.",
  ).optional(),
  Description: z.string().describe(
    "A short text description of the OriginEndpoint.",
  ).optional(),
  Whitelist: z.array(z.string()).describe(
    "A list of source IP CIDR blocks that will be allowed to access the OriginEndpoint.",
  ).optional(),
  StartoverWindowSeconds: z.number().int().describe(
    "Maximum duration (seconds) of content to retain for startover playback. If not specified, startover playback will be disabled for the OriginEndpoint.",
  ).optional(),
  TimeDelaySeconds: z.number().int().describe(
    "Amount of delay (seconds) to enforce on the playback of live content. If not specified, there will be no time delay in effect for the OriginEndpoint.",
  ).optional(),
  ManifestName: z.string().describe(
    "A short string appended to the end of the OriginEndpoint URL.",
  ).optional(),
  Origination: z.enum(["ALLOW", "DENY"]).describe(
    "Control whether origination of video is allowed for this OriginEndpoint. If set to ALLOW, the OriginEndpoint may by requested, pursuant to any other form of access control. If set to DENY, the OriginEndpoint may not be requested. This can be helpful for Live to VOD harvesting, or for temporarily disabling origination",
  ).optional(),
  Authorization: z.object({
    SecretsRoleArn: z.string().describe(
      "The Amazon Resource Name (ARN) for the IAM role that allows MediaPackage to communicate with AWS Secrets Manager.",
    ).optional(),
    CdnIdentifierSecret: z.string().describe(
      "The Amazon Resource Name (ARN) for the secret in Secrets Manager that your Content Distribution Network (CDN) uses for authorization to access your endpoint.",
    ).optional(),
  }).describe("CDN Authorization credentials").optional(),
  HlsPackage: z.object({
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each fragment. Actual fragments will be rounded to the nearest multiple of the source fragment duration.",
    ).optional(),
    PlaylistWindowSeconds: z.number().int().describe(
      "Time window (in seconds) contained in each parent manifest.",
    ).optional(),
    PlaylistType: z.enum(["NONE", "EVENT", "VOD"]).describe(
      'The HTTP Live Streaming (HLS) playlist type. When either "EVENT" or "VOD" is specified, a corresponding EXT-X-PLAYLIST-TYPE entry will be included in the media playlist.',
    ).optional(),
    AdMarkers: z.enum(["NONE", "SCTE35_ENHANCED", "PASSTHROUGH", "DATERANGE"])
      .describe(
        'This setting controls how ad markers are included in the packaged OriginEndpoint. "NONE" will omit all SCTE-35 ad markers from the output. "PASSTHROUGH" causes the manifest to contain a copy of the SCTE-35 ad markers (comments) taken directly from the input HTTP Live Streaming (HLS) manifest. "SCTE35_ENHANCED" generates ad markers and blackout tags based on SCTE-35 messages in the input source. "DATERANGE" inserts EXT-X-DATERANGE tags to signal ad and program transition events in HLS and CMAF manifests. For this option, you must set a programDateTimeIntervalSeconds value that is greater than 0.',
      ).optional(),
    AdTriggers: z.array(
      z.enum([
        "SPLICE_INSERT",
        "BREAK",
        "PROVIDER_ADVERTISEMENT",
        "DISTRIBUTOR_ADVERTISEMENT",
        "PROVIDER_PLACEMENT_OPPORTUNITY",
        "DISTRIBUTOR_PLACEMENT_OPPORTUNITY",
        "PROVIDER_OVERLAY_PLACEMENT_OPPORTUNITY",
        "DISTRIBUTOR_OVERLAY_PLACEMENT_OPPORTUNITY",
      ]),
    ).describe(
      "A list of SCTE-35 message types that are treated as ad markers in the output. If empty, no ad markers are output. Specify multiple items to create ad markers for all of the included message types.",
    ).optional(),
    AdsOnDeliveryRestrictions: z.enum([
      "NONE",
      "RESTRICTED",
      "UNRESTRICTED",
      "BOTH",
    ]).describe(
      'This setting allows the delivery restriction flags on SCTE-35 segmentation descriptors to determine whether a message signals an ad. Choosing "NONE" means no SCTE-35 messages become ads. Choosing "RESTRICTED" means SCTE-35 messages of the types specified in AdTriggers that contain delivery restrictions will be treated as ads. Choosing "UNRESTRICTED" means SCTE-35 messages of the types specified in AdTriggers that do not contain delivery restrictions will be treated as ads. Choosing "BOTH" means all SCTE-35 messages of the types specified in AdTriggers will be treated as ads. Note that Splice Insert messages do not have these flags and are always treated as ads if specified in AdTriggers.',
    ).optional(),
    ProgramDateTimeIntervalSeconds: z.number().int().describe(
      "The interval (in seconds) between each EXT-X-PROGRAM-DATE-TIME tag inserted into manifests. Additionally, when an interval is specified ID3Timed Metadata messages will be generated every 5 seconds using the ingest time of the content. If the interval is not specified, or set to 0, then no EXT-X-PROGRAM-DATE-TIME tags will be inserted into manifests and no ID3Timed Metadata messages will be generated. Note that irrespective of this parameter, if any ID3 Timed Metadata is found in HTTP Live Streaming (HLS) input, it will be passed through to HLS output.",
    ).optional(),
    IncludeIframeOnlyStream: z.boolean().describe(
      "When enabled, an I-Frame only stream will be included in the output.",
    ).optional(),
    UseAudioRenditionGroup: z.boolean().describe(
      "When enabled, audio streams will be placed in rendition groups in the output.",
    ).optional(),
    IncludeDvbSubtitles: z.boolean().describe(
      "When enabled, MediaPackage passes through digital video broadcasting (DVB) subtitles into the output.",
    ).optional(),
    Encryption: HlsEncryptionSchema.describe(
      "An HTTP Live Streaming (HLS) encryption configuration.",
    ).optional(),
    StreamSelection: StreamSelectionSchema.describe(
      "A StreamSelection configuration.",
    ).optional(),
  }).describe("An HTTP Live Streaming (HLS) packaging configuration.")
    .optional(),
  DashPackage: z.object({
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each segment. Actual segments will be rounded to the nearest multiple of the source segment duration.",
    ).optional(),
    ManifestWindowSeconds: z.number().int().describe(
      "Time window (in seconds) contained in each manifest.",
    ).optional(),
    Profile: z.enum(["NONE", "HBBTV_1_5", "HYBRIDCAST", "DVB_DASH_2014"])
      .describe(
        'The Dynamic Adaptive Streaming over HTTP (DASH) profile type. When set to "HBBTV_1_5", HbbTV 1.5 compliant output is enabled.',
      ).optional(),
    MinUpdatePeriodSeconds: z.number().int().describe(
      "Minimum duration (in seconds) between potential changes to the Dynamic Adaptive Streaming over HTTP (DASH) Media Presentation Description (MPD).",
    ).optional(),
    MinBufferTimeSeconds: z.number().int().describe(
      "Minimum duration (in seconds) that a player will buffer media before starting the presentation.",
    ).optional(),
    SuggestedPresentationDelaySeconds: z.number().int().describe(
      "Duration (in seconds) to delay live content before presentation.",
    ).optional(),
    PeriodTriggers: z.array(z.enum(["ADS"])).describe(
      'A list of triggers that controls when the outgoing Dynamic Adaptive Streaming over HTTP (DASH) Media Presentation Description (MPD) will be partitioned into multiple periods. If empty, the content will not be partitioned into more than one period. If the list contains "ADS", new periods will be created where the Channel source contains SCTE-35 ad markers.',
    ).optional(),
    IncludeIframeOnlyStream: z.boolean().describe(
      "When enabled, an I-Frame only stream will be included in the output.",
    ).optional(),
    ManifestLayout: z.enum(["FULL", "COMPACT", "DRM_TOP_LEVEL_COMPACT"])
      .describe(
        "Determines the position of some tags in the Media Presentation Description (MPD). When set to FULL, elements like SegmentTemplate and ContentProtection are included in each Representation. When set to COMPACT, duplicate elements are combined and presented at the AdaptationSet level.",
      ).optional(),
    SegmentTemplateFormat: z.enum([
      "NUMBER_WITH_TIMELINE",
      "TIME_WITH_TIMELINE",
      "NUMBER_WITH_DURATION",
    ]).describe(
      "Determines the type of SegmentTemplate included in the Media Presentation Description (MPD). When set to NUMBER_WITH_TIMELINE, a full timeline is presented in each SegmentTemplate, with $Number$ media URLs. When set to TIME_WITH_TIMELINE, a full timeline is presented in each SegmentTemplate, with $Time$ media URLs. When set to NUMBER_WITH_DURATION, only a duration is included in each SegmentTemplate, with $Number$ media URLs.",
    ).optional(),
    AdTriggers: z.array(
      z.enum([
        "SPLICE_INSERT",
        "BREAK",
        "PROVIDER_ADVERTISEMENT",
        "DISTRIBUTOR_ADVERTISEMENT",
        "PROVIDER_PLACEMENT_OPPORTUNITY",
        "DISTRIBUTOR_PLACEMENT_OPPORTUNITY",
        "PROVIDER_OVERLAY_PLACEMENT_OPPORTUNITY",
        "DISTRIBUTOR_OVERLAY_PLACEMENT_OPPORTUNITY",
      ]),
    ).describe(
      "A list of SCTE-35 message types that are treated as ad markers in the output. If empty, no ad markers are output. Specify multiple items to create ad markers for all of the included message types.",
    ).optional(),
    AdsOnDeliveryRestrictions: z.enum([
      "NONE",
      "RESTRICTED",
      "UNRESTRICTED",
      "BOTH",
    ]).describe(
      'This setting allows the delivery restriction flags on SCTE-35 segmentation descriptors to determine whether a message signals an ad. Choosing "NONE" means no SCTE-35 messages become ads. Choosing "RESTRICTED" means SCTE-35 messages of the types specified in AdTriggers that contain delivery restrictions will be treated as ads. Choosing "UNRESTRICTED" means SCTE-35 messages of the types specified in AdTriggers that do not contain delivery restrictions will be treated as ads. Choosing "BOTH" means all SCTE-35 messages of the types specified in AdTriggers will be treated as ads. Note that Splice Insert messages do not have these flags and are always treated as ads if specified in AdTriggers.',
    ).optional(),
    Encryption: DashEncryptionSchema.describe(
      "A Dynamic Adaptive Streaming over HTTP (DASH) encryption configuration.",
    ).optional(),
    StreamSelection: StreamSelectionSchema.describe(
      "A StreamSelection configuration.",
    ).optional(),
    UtcTiming: z.enum(["HTTP-XSDATE", "HTTP-ISO", "HTTP-HEAD", "NONE"])
      .describe(
        "Determines the type of UTCTiming included in the Media Presentation Description (MPD)",
      ).optional(),
    UtcTimingUri: z.string().describe(
      "Specifies the value attribute of the UTCTiming field when utcTiming is set to HTTP-ISO, HTTP-HEAD or HTTP-XSDATE",
    ).optional(),
  }).describe(
    "A Dynamic Adaptive Streaming over HTTP (DASH) packaging configuration.",
  ).optional(),
  MssPackage: z.object({
    ManifestWindowSeconds: z.number().int().describe(
      "The time window (in seconds) contained in each manifest.",
    ).optional(),
    SegmentDurationSeconds: z.number().int().describe(
      "The duration (in seconds) of each segment.",
    ).optional(),
    Encryption: MssEncryptionSchema.describe(
      "A Microsoft Smooth Streaming (MSS) encryption configuration.",
    ).optional(),
    StreamSelection: StreamSelectionSchema.describe(
      "A StreamSelection configuration.",
    ).optional(),
  }).describe("A Microsoft Smooth Streaming (MSS) packaging configuration.")
    .optional(),
  CmafPackage: z.object({
    SegmentDurationSeconds: z.number().int().describe(
      "Duration (in seconds) of each segment. Actual segments will be rounded to the nearest multiple of the source segment duration.",
    ).optional(),
    SegmentPrefix: z.string().describe(
      "An optional custom string that is prepended to the name of each segment. If not specified, it defaults to the ChannelId.",
    ).optional(),
    Encryption: CmafEncryptionSchema.describe(
      "A Common Media Application Format (CMAF) encryption configuration.",
    ).optional(),
    StreamSelection: StreamSelectionSchema.describe(
      "A StreamSelection configuration.",
    ).optional(),
    HlsManifests: z.array(HlsManifestSchema).describe(
      "A list of HLS manifest configurations",
    ).optional(),
  }).describe(
    "A Common Media Application Format (CMAF) packaging configuration.",
  ).optional(),
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

/** Swamp extension model for MediaPackage OriginEndpoint. Registered at `@swamp/aws/mediapackage/origin-endpoint`. */
export const model = {
  type: "@swamp/aws/mediapackage/origin-endpoint",
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
      description: "MediaPackage OriginEndpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaPackage OriginEndpoint",
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
          "AWS::MediaPackage::OriginEndpoint",
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
      description: "Get a MediaPackage OriginEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaPackage OriginEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaPackage::OriginEndpoint",
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
    update: {
      description: "Update a MediaPackage OriginEndpoint",
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
        const currentState = await readResource(
          "AWS::MediaPackage::OriginEndpoint",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MediaPackage::OriginEndpoint",
          identifier,
          currentState,
          desiredState,
          ["Id"],
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
      description: "Delete a MediaPackage OriginEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaPackage OriginEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaPackage::OriginEndpoint",
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
      description: "Sync MediaPackage OriginEndpoint state from AWS",
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
            "AWS::MediaPackage::OriginEndpoint",
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
