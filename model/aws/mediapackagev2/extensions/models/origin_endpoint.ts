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

// Auto-generated extension model for @swamp/aws/mediapackagev2/origin-endpoint
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaPackageV2 OriginEndpoint (AWS::MediaPackageV2::OriginEndpoint).
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

const FilterConfigurationSchema = z.object({
  ManifestFilter: z.string().min(1).max(1024).describe(
    "Optionally specify one or more manifest filters for all of your manifest egress requests. When you include a manifest filter, note that you cannot use an identical manifest filter query parameter for this manifest's endpoint URL.",
  ).optional(),
  DrmSettings: z.string().min(1).max(1024).describe(
    "Optionally specify one or more DRM settings for all of your manifest egress requests. When you include a DRM setting, note that you cannot use an identical DRM setting query parameter for this manifest's endpoint URL.",
  ).optional(),
  Start: z.string().describe(
    "Optionally specify the start time for all of your manifest egress requests. When you include start time, note that you cannot use start time query parameters for this manifest's endpoint URL.",
  ).optional(),
  End: z.string().describe(
    "Optionally specify the end time for all of your manifest egress requests. When you include end time, note that you cannot use end time query parameters for this manifest's endpoint URL.",
  ).optional(),
  TimeDelaySeconds: z.number().int().min(0).max(1209600).describe(
    "Optionally specify the time delay for all of your manifest egress requests. Enter a value that is smaller than your endpoint's startover window. When you include time delay, note that you cannot use time delay query parameters for this manifest's endpoint URL.",
  ).optional(),
  ClipStartTime: z.string().describe(
    "Optionally specify the clip start time for all of your manifest egress requests. When you include clip start time, note that you cannot use clip start time query parameters for this manifest's endpoint URL.",
  ).optional(),
});

const ScteDashSchema = z.object({
  AdMarkerDash: z.enum(["BINARY", "XML"]).optional(),
  ScteInManifests: z.enum(["ALL", "MATCHES_FILTER"]).optional(),
});

const DashUtcTimingSchema = z.object({
  TimingMode: z.enum(["HTTP_HEAD", "HTTP_ISO", "HTTP_XSDATE", "UTC_DIRECT"])
    .optional(),
  TimingSource: z.string().min(1).max(1024).describe(
    "The the method that the player uses to synchronize to coordinated universal time (UTC) wall clock time.",
  ).optional(),
});

const DashBaseUrlSchema = z.object({
  Url: z.string().min(1).max(2048).describe("A source location for segments."),
  ServiceLocation: z.string().min(1).max(2048).describe(
    "The name of the source location.",
  ).optional(),
  DvbPriority: z.number().int().min(1).max(15000).describe(
    "For use with DVB-DASH profiles only. The priority of this location for servings segments. The lower the number, the higher the priority.",
  ).optional(),
  DvbWeight: z.number().int().min(1).max(15000).describe(
    "For use with DVB-DASH profiles only. The weighting for source locations that have the same priority.",
  ).optional(),
});

const DashProgramInformationSchema = z.object({
  Title: z.string().min(1).max(2048).describe("The title for the manifest.")
    .optional(),
  Source: z.string().min(1).max(2048).describe(
    "Information about the content provider.",
  ).optional(),
  Copyright: z.string().min(1).max(2048).describe(
    "A copyright statement about the content.",
  ).optional(),
  LanguageCode: z.string().min(2).max(5).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_-]*[a-zA-Z0-9]$"),
  ).describe("The language code for this manifest.").optional(),
  MoreInformationUrl: z.string().min(1).max(2048).describe(
    "An absolute URL that contains more information about this content.",
  ).optional(),
});

const DashDvbFontDownloadSchema = z.object({
  Url: z.string().min(1).max(2048).describe(
    "The URL for downloading fonts for subtitles.",
  ).optional(),
  MimeType: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9][a-zA-Z0-9_/-]*[a-zA-Z0-9]$"),
  ).describe(
    "The mimeType of the resource that's at the font download URL. For information about font MIME types, see the MPEG-DASH Profile for Transport of ISO BMFF Based DVB Services over IP Based Networks document.",
  ).optional(),
  FontFamily: z.string().min(1).max(256).describe(
    "The fontFamily name for subtitles, as described in EBU-TT-D Subtitling Distribution Format.",
  ).optional(),
});

const DashDvbMetricsReportingSchema = z.object({
  ReportingUrl: z.string().min(1).max(2048).describe(
    "The URL where playback devices send error reports.",
  ),
  Probability: z.number().int().min(1).max(1000).describe(
    "The number of playback devices per 1000 that will send error reports to the reporting URL. This represents the probability that a playback device will be a reporting player for this session.",
  ).optional(),
});

const DashDvbSettingsSchema = z.object({
  FontDownload: DashDvbFontDownloadSchema.describe(
    "For use with DVB-DASH profiles only. The settings for font downloads that you want Elemental MediaPackage to pass through to the manifest.",
  ).optional(),
  ErrorMetrics: z.array(DashDvbMetricsReportingSchema).describe(
    "Playback device error reporting settings.",
  ).optional(),
});

const DashTtmlConfigurationSchema = z.object({
  TtmlProfile: z.enum(["IMSC_1", "EBU_TT_D_101"]),
});

const DashSubtitleConfigurationSchema = z.object({
  TtmlConfiguration: DashTtmlConfigurationSchema.describe(
    "The settings for TTML subtitles.",
  ).optional(),
});

const DashManifestConfigurationSchema = z.object({
  ManifestName: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "A short string that's appended to the endpoint URL. The manifest name creates a unique path to this endpoint. If you don't enter a value, MediaPackage uses the default manifest name, index.",
    ),
  ManifestWindowSeconds: z.number().int().describe(
    "The total duration (in seconds) of the manifest's content.",
  ).optional(),
  FilterConfiguration: FilterConfigurationSchema.describe(
    "Filter configuration includes settings for manifest filtering, start and end times, and time delay that apply to all of your egress requests for this manifest.",
  ).optional(),
  MinUpdatePeriodSeconds: z.number().int().describe(
    "Minimum amount of time (in seconds) that the player should wait before requesting updates to the manifest.",
  ).optional(),
  MinBufferTimeSeconds: z.number().int().describe(
    "Minimum amount of content (in seconds) that a player must keep available in the buffer.",
  ).optional(),
  SuggestedPresentationDelaySeconds: z.number().int().describe(
    "The amount of time (in seconds) that the player should be from the end of the manifest.",
  ).optional(),
  SegmentTemplateFormat: z.enum(["NUMBER_WITH_TIMELINE"]).optional(),
  PeriodTriggers: z.array(
    z.enum([
      "AVAILS",
      "DRM_KEY_ROTATION",
      "SOURCE_CHANGES",
      "SOURCE_DISRUPTIONS",
      "NONE",
    ]),
  ).describe(
    "A list of triggers that controls when AWS Elemental MediaPackage separates the MPEG-DASH manifest into multiple periods. Leave this value empty to indicate that the manifest is contained all in one period. For more information about periods in the DASH manifest, see Multi-period DASH in AWS Elemental MediaPackage.",
  ).optional(),
  ScteDash: ScteDashSchema.describe("The SCTE configuration.").optional(),
  DrmSignaling: z.enum(["INDIVIDUAL", "REFERENCED"]).optional(),
  UtcTiming: DashUtcTimingSchema.describe(
    "Determines the type of UTC timing included in the DASH Media Presentation Description (MPD).",
  ).optional(),
  Profiles: z.array(z.enum(["DVB_DASH"])).describe(
    "The profile that the output is compliant with.",
  ).optional(),
  BaseUrls: z.array(DashBaseUrlSchema).describe(
    "The base URL to use for retrieving segments.",
  ).optional(),
  ProgramInformation: DashProgramInformationSchema.describe(
    "Details about the content that you want MediaPackage to pass through in the manifest to the playback device.",
  ).optional(),
  DvbSettings: DashDvbSettingsSchema.describe(
    "For endpoints that use the DVB-DASH profile only. The font download and error reporting information that you want MediaPackage to pass through to the manifest.",
  ).optional(),
  Compactness: z.enum(["STANDARD", "NONE"]).optional(),
  SubtitleConfiguration: DashSubtitleConfigurationSchema.describe(
    "The configuration for DASH subtitles.",
  ).optional(),
  UriPathType: z.enum(["LEAF", "ROOT"]).optional(),
  AvailabilityStartTimeConfiguration: z.object({
    FixedAvailabilityStartTime: z.string().optional(),
  }).optional(),
});

const ScteHlsSchema = z.object({
  AdMarkerHls: z.enum(["DATERANGE", "SCTE35_ENHANCED"]).optional(),
  ScteInManifests: z.enum(["ALL", "MATCHES_FILTER"]).optional(),
});

const StartTagSchema = z.object({
  TimeOffset: z.number().describe(
    "Specify the value for TIME-OFFSET within your EXT-X-START tag. Enter a signed floating point value which, if positive, must be less than the configured manifest duration minus three times the configured segment target duration. If negative, the absolute value must be larger than three times the configured segment target duration, and the absolute value must be smaller than the configured manifest duration.",
  ),
  Precise: z.boolean().describe(
    "Specify the value for PRECISE within your EXT-X-START tag. Leave blank, or choose false, to use the default value NO. Choose yes to use the value YES.",
  ).optional(),
});

const HlsManifestConfigurationSchema = z.object({
  ManifestName: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "A short short string that's appended to the endpoint URL. The manifest name creates a unique path to this endpoint. If you don't enter a value, MediaPackage uses the default manifest name, index. MediaPackage automatically inserts the format extension, such as.m3u8. You can't use the same manifest name if you use HLS manifest and low-latency HLS manifest. The manifestName on the HLSManifest object overrides the manifestName you provided on the originEndpoint object.",
    ),
  Url: z.string().describe(
    "The egress domain URL for stream delivery from MediaPackage.",
  ).optional(),
  ChildManifestName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe(
    "A short string that's appended to the endpoint URL. The child manifest name creates a unique path to this endpoint. If you don't enter a value, MediaPackage uses the default child manifest name, index_1. The manifestName on the HLSManifest object overrides the manifestName you provided on the originEndpoint object.",
  ).optional(),
  ManifestWindowSeconds: z.number().int().describe(
    "The total duration (in seconds) of the manifest's content.",
  ).optional(),
  ProgramDateTimeIntervalSeconds: z.number().int().describe(
    "Inserts EXT-X-PROGRAM-DATE-TIME tags in the output manifest at the interval that you specify. If you don't enter an interval, EXT-X-PROGRAM-DATE-TIME tags aren't included in the manifest. The tags sync the stream to the wall clock so that viewers can seek to a specific time in the playback timeline on the player. Irrespective of this parameter, if any ID3Timed metadata is in the HLS input, it is passed through to the HLS output.",
  ).optional(),
  ScteHls: ScteHlsSchema.describe("The SCTE configuration.").optional(),
  FilterConfiguration: FilterConfigurationSchema.describe(
    "Filter configuration includes settings for manifest filtering, start and end times, and time delay that apply to all of your egress requests for this manifest.",
  ).optional(),
  StartTag: StartTagSchema.describe(
    "To insert an EXT-X-START tag in your HLS playlist, specify a StartTag configuration object with a valid TimeOffset. When you do, you can also optionally specify whether to include a PRECISE value in the EXT-X-START tag.",
  ).optional(),
  UrlEncodeChildManifest: z.boolean().describe(
    "When enabled, MediaPackage URL-encodes the query string for API requests for HLS child manifests to comply with Amazon Web Services Signature Version 4 (SigV4) signature signing protocol. For more information, see Amazon Web Services Signature Version 4 for API requests in Identity and Access Management User Guide.",
  ).optional(),
  UriPathType: z.enum(["LEAF", "ROOT"]).optional(),
});

const LowLatencyHlsManifestConfigurationSchema = z.object({
  ManifestName: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe(
      "A short short string that's appended to the endpoint URL. The manifest name creates a unique path to this endpoint. If you don't enter a value, MediaPackage uses the default manifest name, index. MediaPackage automatically inserts the format extension, such as.m3u8. You can't use the same manifest name if you use HLS manifest and low-latency HLS manifest. The manifestName on the HLSManifest object overrides the manifestName you provided on the originEndpoint object.",
    ),
  Url: z.string().describe(
    "The egress domain URL for stream delivery from MediaPackage.",
  ).optional(),
  ChildManifestName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).describe(
    "A short string that's appended to the endpoint URL. The child manifest name creates a unique path to this endpoint. If you don't enter a value, MediaPackage uses the default child manifest name, index_1. The manifestName on the HLSManifest object overrides the manifestName you provided on the originEndpoint object.",
  ).optional(),
  ManifestWindowSeconds: z.number().int().describe(
    "The total duration (in seconds) of the manifest's content.",
  ).optional(),
  ProgramDateTimeIntervalSeconds: z.number().int().describe(
    "Inserts EXT-X-PROGRAM-DATE-TIME tags in the output manifest at the interval that you specify. If you don't enter an interval, EXT-X-PROGRAM-DATE-TIME tags aren't included in the manifest. The tags sync the stream to the wall clock so that viewers can seek to a specific time in the playback timeline on the player. Irrespective of this parameter, if any ID3Timed metadata is in the HLS input, it is passed through to the HLS output.",
  ).optional(),
  ScteHls: ScteHlsSchema.describe("The SCTE configuration.").optional(),
  FilterConfiguration: FilterConfigurationSchema.describe(
    "Filter configuration includes settings for manifest filtering, start and end times, and time delay that apply to all of your egress requests for this manifest.",
  ).optional(),
  StartTag: StartTagSchema.describe(
    "To insert an EXT-X-START tag in your HLS playlist, specify a StartTag configuration object with a valid TimeOffset. When you do, you can also optionally specify whether to include a PRECISE value in the EXT-X-START tag.",
  ).optional(),
  UrlEncodeChildManifest: z.boolean().describe(
    "When enabled, MediaPackage URL-encodes the query string for API requests for LL-HLS child manifests to comply with Amazon Web Services Signature Version 4 (SigV4) signature signing protocol. For more information, see Amazon Web Services Signature Version 4 for API requests in Identity and Access Management User Guide.",
  ).optional(),
  UriPathType: z.enum(["LEAF", "ROOT"]).optional(),
});

const MssManifestConfigurationSchema = z.object({
  ManifestName: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9-]+$"))
    .describe(
      "The name of the MSS manifest. This name is appended to the origin endpoint URL to create the unique path for accessing this specific MSS manifest.",
    ),
  FilterConfiguration: FilterConfigurationSchema.describe(
    "Filter configuration includes settings for manifest filtering, start and end times, and time delay that apply to all of your egress requests for this manifest.",
  ).optional(),
  ManifestWindowSeconds: z.number().int().describe(
    "The duration (in seconds) of the manifest window. This represents the total amount of content available in the manifest at any given time.",
  ).optional(),
  ManifestLayout: z.enum(["FULL", "COMPACT"]).optional(),
});

const ScteSchema = z.object({
  ScteFilter: z.array(
    z.enum([
      "SPLICE_INSERT",
      "BREAK",
      "PROVIDER_ADVERTISEMENT",
      "DISTRIBUTOR_ADVERTISEMENT",
      "PROVIDER_PLACEMENT_OPPORTUNITY",
      "DISTRIBUTOR_PLACEMENT_OPPORTUNITY",
      "PROVIDER_OVERLAY_PLACEMENT_OPPORTUNITY",
      "DISTRIBUTOR_OVERLAY_PLACEMENT_OPPORTUNITY",
      "PROGRAM",
      "CHAPTER",
      "UNSCHEDULED_EVENT",
      "ALTERNATE_CONTENT_OPPORTUNITY",
      "NETWORK",
      "PROVIDER_PROMO",
      "DISTRIBUTOR_PROMO",
      "PROVIDER_AD_BLOCK",
      "DISTRIBUTOR_AD_BLOCK",
    ]),
  ).describe(
    "The SCTE-35 message types that you want to be treated as ad markers in the output.",
  ).optional(),
  ScteInSegments: z.enum(["NONE", "ALL", "MATCHES_FILTER"]).optional(),
  CustomAdTypes: z.array(
    z.enum([
      "PROGRAM",
      "CHAPTER",
      "UNSCHEDULED_EVENT",
      "ALTERNATE_CONTENT_OPPORTUNITY",
      "NETWORK",
    ]),
  ).describe(
    "A list of additional non-Ad SCTE-35 event types to treat as advertisements. When configured, events matching these types produce ad markers (such as SCTE35-OUT and SCTE35-IN in HLS DATERANGE tags) in manifests. Valid values: PROGRAM | CHAPTER | UNSCHEDULED_EVENT | ALTERNATE_CONTENT_OPPORTUNITY | NETWORK  If you don't specify any values, the default is empty (only default ad types are used).",
  ).optional(),
});

const EncryptionMethodSchema = z.object({
  TsEncryptionMethod: z.enum(["AES_128", "SAMPLE_AES"]).optional(),
  CmafEncryptionMethod: z.enum(["CENC", "CBCS"]).optional(),
  IsmEncryptionMethod: z.enum(["CENC"]).optional(),
});

const EncryptionContractConfigurationSchema = z.object({
  PresetSpeke20Audio: z.enum([
    "PRESET_AUDIO_1",
    "PRESET_AUDIO_2",
    "PRESET_AUDIO_3",
    "SHARED",
    "UNENCRYPTED",
  ]),
  PresetSpeke20Video: z.enum([
    "PRESET_VIDEO_1",
    "PRESET_VIDEO_2",
    "PRESET_VIDEO_3",
    "PRESET_VIDEO_4",
    "PRESET_VIDEO_5",
    "PRESET_VIDEO_6",
    "PRESET_VIDEO_7",
    "PRESET_VIDEO_8",
    "SHARED",
    "UNENCRYPTED",
  ]),
});

const SpekeKeyProviderSchema = z.object({
  EncryptionContractConfiguration: EncryptionContractConfigurationSchema
    .describe(
      "Configure one or more content encryption keys for your endpoints that use SPEKE Version 2.0. The encryption contract defines which content keys are used to encrypt the audio and video tracks in your stream. To configure the encryption contract, specify which audio and video encryption presets to use.",
    ),
  ResourceId: z.string().min(1).max(256).regex(new RegExp("^[0-9a-zA-Z_-]+$"))
    .describe(
      "The unique identifier for the content. The service sends this to the key server to identify the current endpoint. How unique you make this depends on how fine-grained you want access controls to be. The service does not permit you to use the same ID for two simultaneous encryption processes. The resource ID is also known as the content ID. The following example shows a resource ID: MovieNight20171126093045",
    ),
  DrmSystems: z.array(
    z.enum([
      "CLEAR_KEY_AES_128",
      "FAIRPLAY",
      "PLAYREADY",
      "WIDEVINE",
      "IRDETO",
    ]),
  ).describe(
    "The DRM solution provider you're using to protect your content during distribution.",
  ),
  RoleArn: z.string().min(1).max(2048).describe(
    "The ARN for the IAM role granted by the key provider that provides access to the key provider API. This role must have a trust policy that allows MediaPackage to assume the role, and it must have a sufficient permissions policy to allow access to the specific key retrieval URL. Get this from your DRM solution provider. Valid format: arn:aws:iam::{accountID}:role/{name}. The following example shows a role ARN: arn:aws:iam::444455556666:role/SpekeAccess",
  ),
  CertificateArn: z.string().min(20).max(2048).regex(
    new RegExp(
      "^arn:([^:\\n]+):acm:([^:\\n]+):([0-9]+):certificate/[a-zA-Z0-9-_]+$",
    ),
  ).describe(
    "The ARN for the certificate that you imported to Amazon Web Services Certificate Manager to add content key encryption to this endpoint. For this feature to work, your DRM key provider must support content key encryption.",
  ).optional(),
});

const EncryptionSchema = z.object({
  ConstantInitializationVector: z.string().min(32).max(32).regex(
    new RegExp("^[0-9a-fA-F]+$"),
  ).describe(
    "A 128-bit, 16-byte hex value represented by a 32-character string, used in conjunction with the key for encrypting content. If you don't specify a value, then MediaPackage creates the constant initialization vector (IV).",
  ).optional(),
  EncryptionMethod: EncryptionMethodSchema.describe("The encryption type."),
  KeyRotationIntervalSeconds: z.number().int().min(300).max(31536000).describe(
    "The frequency (in seconds) of key changes for live workflows, in which content is streamed real time. The service retrieves content keys before the live content begins streaming, and then retrieves them as needed over the lifetime of the workflow. By default, key rotation is set to 300 seconds (5 minutes), the minimum rotation interval, which is equivalent to setting it to 300. If you don't enter an interval, content keys aren't rotated. The following example setting causes the service to rotate keys every thirty minutes: 1800",
  ).optional(),
  CmafExcludeSegmentDrmMetadata: z.boolean().describe(
    "Excludes SEIG and SGPD boxes from segment metadata in CMAF containers. When set to true, MediaPackage omits these DRM metadata boxes from CMAF segments, which can improve compatibility with certain devices and players that don't support these boxes. Important considerations:   This setting only affects CMAF container formats   Key rotation can still be handled through media playlist signaling   PSSH and TENC boxes remain unaffected   Default behavior is preserved when this setting is disabled   Valid values: true | false  Default: false",
  ).optional(),
  SpekeKeyProvider: SpekeKeyProviderSchema.describe(
    "The parameters for the SPEKE key provider.",
  ),
});

const TagSchema = z.object({
  Key: z.string().optional(),
  Value: z.string().optional(),
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
  ChannelGroupName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ),
  ChannelName: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
  ContainerType: z.enum(["TS", "CMAF", "ISM"]),
  DashManifests: z.array(DashManifestConfigurationSchema).describe(
    "A DASH manifest configuration.",
  ).optional(),
  Description: z.string().min(0).max(1024).describe(
    "Enter any descriptive text that helps you to identify the origin endpoint.",
  ).optional(),
  ForceEndpointErrorConfiguration: z.object({
    EndpointErrorConditions: z.array(
      z.enum([
        "STALE_MANIFEST",
        "INCOMPLETE_MANIFEST",
        "MISSING_DRM_KEY",
        "SLATE_INPUT",
      ]),
    ).describe(
      "The failover conditions for the endpoint. The options are:    STALE_MANIFEST - The manifest stalled and there are no new segments or parts.    INCOMPLETE_MANIFEST - There is a gap in the manifest.    MISSING_DRM_KEY - Key rotation is enabled but we're unable to fetch the key for the current key period.    SLATE_INPUT - The segments which contain slate content are considered to be missing content.",
    ).optional(),
  }).describe("The failover settings for the endpoint.").optional(),
  HlsManifests: z.array(HlsManifestConfigurationSchema).describe(
    "An HTTP live streaming (HLS) manifest configuration.",
  ).optional(),
  LowLatencyHlsManifests: z.array(LowLatencyHlsManifestConfigurationSchema)
    .describe("A low-latency HLS manifest configuration.").optional(),
  MssManifests: z.array(MssManifestConfigurationSchema).describe(
    "The Microsoft Smooth Streaming (MSS) manifest configurations associated with this origin endpoint.",
  ).optional(),
  OriginEndpointName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ),
  Segment: z.object({
    SegmentDurationSeconds: z.number().int().min(1).max(30).describe(
      "The duration (in seconds) of each segment. Enter a value equal to, or a multiple of, the input segment duration. If the value that you enter is different from the input segment duration, MediaPackage rounds segments to the nearest multiple of the input segment duration.",
    ).optional(),
    SegmentName: z.string().min(1).max(256).regex(
      new RegExp("^[a-zA-Z0-9_-]+$"),
    ).describe(
      "The name that describes the segment. The name is the base name of the segment used in all content manifests inside of the endpoint. You can't use spaces in the name.",
    ).optional(),
    TsUseAudioRenditionGroup: z.boolean().describe(
      "When selected, MediaPackage bundles all audio tracks in a rendition group. All other tracks in the stream can be used with any audio rendition from the group.",
    ).optional(),
    IncludeIframeOnlyStreams: z.boolean().describe(
      "When selected, the stream set includes an additional I-frame only stream, along with the other tracks. If false, this extra stream is not included. MediaPackage generates an I-frame only stream from the first rendition in the manifest. The service inserts EXT-I-FRAMES-ONLY tags in the output manifest, and then generates and includes an I-frames only playlist in the stream. This playlist permits player functionality like fast forward and rewind.",
    ).optional(),
    TsIncludeDvbSubtitles: z.boolean().describe(
      "By default, MediaPackage excludes all digital video broadcasting (DVB) subtitles from the output. When selected, MediaPackage passes through DVB subtitles into the output.",
    ).optional(),
    Scte: ScteSchema.describe("The SCTE configuration.").optional(),
    Encryption: EncryptionSchema.describe(
      "The parameters for encrypting content.",
    ).optional(),
  }).describe(
    "The segment configuration, including the segment name, duration, and other configuration values.",
  ).optional(),
  StartoverWindowSeconds: z.number().int().min(0).max(1209600).describe(
    "The size of the window (in seconds) to create a window of the live stream that's available for on-demand viewing. Viewers can start-over or catch-up on content that falls within the window. The maximum startover window is 1,209,600 seconds (14 days).",
  ).optional(),
  UriSeparator: z.enum(["UNDERSCORE", "HYPHEN"]).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Arn: z.string(),
  ChannelGroupName: z.string().optional(),
  ChannelName: z.string().optional(),
  ContainerType: z.string().optional(),
  CreatedAt: z.string().optional(),
  DashManifests: z.array(DashManifestConfigurationSchema).optional(),
  Description: z.string().optional(),
  ForceEndpointErrorConfiguration: z.object({
    EndpointErrorConditions: z.array(z.string()),
  }).optional(),
  HlsManifests: z.array(HlsManifestConfigurationSchema).optional(),
  LowLatencyHlsManifests: z.array(LowLatencyHlsManifestConfigurationSchema)
    .optional(),
  ModifiedAt: z.string().optional(),
  MssManifests: z.array(MssManifestConfigurationSchema).optional(),
  OriginEndpointName: z.string().optional(),
  Segment: z.object({
    SegmentDurationSeconds: z.number(),
    SegmentName: z.string(),
    TsUseAudioRenditionGroup: z.boolean(),
    IncludeIframeOnlyStreams: z.boolean(),
    TsIncludeDvbSubtitles: z.boolean(),
    Scte: ScteSchema,
    Encryption: EncryptionSchema,
  }).optional(),
  StartoverWindowSeconds: z.number().optional(),
  UriSeparator: z.string().optional(),
  DashManifestUrls: z.array(z.string()).optional(),
  MssManifestUrls: z.array(z.string()).optional(),
  HlsManifestUrls: z.array(z.string()).optional(),
  LowLatencyHlsManifestUrls: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ChannelGroupName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).optional(),
  ChannelName: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .optional(),
  ContainerType: z.enum(["TS", "CMAF", "ISM"]).optional(),
  DashManifests: z.array(DashManifestConfigurationSchema).describe(
    "A DASH manifest configuration.",
  ).optional(),
  Description: z.string().min(0).max(1024).describe(
    "Enter any descriptive text that helps you to identify the origin endpoint.",
  ).optional(),
  ForceEndpointErrorConfiguration: z.object({
    EndpointErrorConditions: z.array(
      z.enum([
        "STALE_MANIFEST",
        "INCOMPLETE_MANIFEST",
        "MISSING_DRM_KEY",
        "SLATE_INPUT",
      ]),
    ).describe(
      "The failover conditions for the endpoint. The options are:    STALE_MANIFEST - The manifest stalled and there are no new segments or parts.    INCOMPLETE_MANIFEST - There is a gap in the manifest.    MISSING_DRM_KEY - Key rotation is enabled but we're unable to fetch the key for the current key period.    SLATE_INPUT - The segments which contain slate content are considered to be missing content.",
    ).optional(),
  }).describe("The failover settings for the endpoint.").optional(),
  HlsManifests: z.array(HlsManifestConfigurationSchema).describe(
    "An HTTP live streaming (HLS) manifest configuration.",
  ).optional(),
  LowLatencyHlsManifests: z.array(LowLatencyHlsManifestConfigurationSchema)
    .describe("A low-latency HLS manifest configuration.").optional(),
  MssManifests: z.array(MssManifestConfigurationSchema).describe(
    "The Microsoft Smooth Streaming (MSS) manifest configurations associated with this origin endpoint.",
  ).optional(),
  OriginEndpointName: z.string().min(1).max(256).regex(
    new RegExp("^[a-zA-Z0-9_-]+$"),
  ).optional(),
  Segment: z.object({
    SegmentDurationSeconds: z.number().int().min(1).max(30).describe(
      "The duration (in seconds) of each segment. Enter a value equal to, or a multiple of, the input segment duration. If the value that you enter is different from the input segment duration, MediaPackage rounds segments to the nearest multiple of the input segment duration.",
    ).optional(),
    SegmentName: z.string().min(1).max(256).regex(
      new RegExp("^[a-zA-Z0-9_-]+$"),
    ).describe(
      "The name that describes the segment. The name is the base name of the segment used in all content manifests inside of the endpoint. You can't use spaces in the name.",
    ).optional(),
    TsUseAudioRenditionGroup: z.boolean().describe(
      "When selected, MediaPackage bundles all audio tracks in a rendition group. All other tracks in the stream can be used with any audio rendition from the group.",
    ).optional(),
    IncludeIframeOnlyStreams: z.boolean().describe(
      "When selected, the stream set includes an additional I-frame only stream, along with the other tracks. If false, this extra stream is not included. MediaPackage generates an I-frame only stream from the first rendition in the manifest. The service inserts EXT-I-FRAMES-ONLY tags in the output manifest, and then generates and includes an I-frames only playlist in the stream. This playlist permits player functionality like fast forward and rewind.",
    ).optional(),
    TsIncludeDvbSubtitles: z.boolean().describe(
      "By default, MediaPackage excludes all digital video broadcasting (DVB) subtitles from the output. When selected, MediaPackage passes through DVB subtitles into the output.",
    ).optional(),
    Scte: ScteSchema.describe("The SCTE configuration.").optional(),
    Encryption: EncryptionSchema.describe(
      "The parameters for encrypting content.",
    ).optional(),
  }).describe(
    "The segment configuration, including the segment name, duration, and other configuration values.",
  ).optional(),
  StartoverWindowSeconds: z.number().int().min(0).max(1209600).describe(
    "The size of the window (in seconds) to create a window of the live stream that's available for on-demand viewing. Viewers can start-over or catch-up on content that falls within the window. The maximum startover window is 1,209,600 seconds (14 days).",
  ).optional(),
  UriSeparator: z.enum(["UNDERSCORE", "HYPHEN"]).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for MediaPackageV2 OriginEndpoint. Registered at `@swamp/aws/mediapackagev2/origin-endpoint`. */
export const model = {
  type: "@swamp/aws/mediapackagev2/origin-endpoint",
  version: "2026.06.08.1",
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
      toVersion: "2026.05.29.1",
      description: "Added: UriSeparator",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MediaPackageV2 OriginEndpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaPackageV2 OriginEndpoint",
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
          "AWS::MediaPackageV2::OriginEndpoint",
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
      description: "Get a MediaPackageV2 OriginEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaPackageV2 OriginEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaPackageV2::OriginEndpoint",
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
      description: "Update a MediaPackageV2 OriginEndpoint",
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
          "AWS::MediaPackageV2::OriginEndpoint",
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
          "AWS::MediaPackageV2::OriginEndpoint",
          identifier,
          currentState,
          desiredState,
          ["ChannelGroupName", "ChannelName", "OriginEndpointName"],
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
      description: "Delete a MediaPackageV2 OriginEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaPackageV2 OriginEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaPackageV2::OriginEndpoint",
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
      description: "Sync MediaPackageV2 OriginEndpoint state from AWS",
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
            "AWS::MediaPackageV2::OriginEndpoint",
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
