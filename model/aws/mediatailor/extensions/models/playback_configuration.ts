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

// Auto-generated extension model for @swamp/aws/mediatailor/playback-configuration
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaTailor PlaybackConfiguration (AWS::MediaTailor::PlaybackConfiguration).
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

const AdMarkerPassthroughSchema = z.object({
  Enabled: z.boolean().describe(
    "Enables ad marker passthrough for your configuration.",
  ).optional(),
});

const AdsInteractionLogSchema = z.object({
  ExcludeEventTypes: z.array(z.string()).describe(
    "Indicates that MediaTailor won't emit the selected events in the logs for playback sessions that are initialized with this configuration.",
  ).optional(),
  PublishOptInEventTypes: z.array(z.string()).describe(
    "Indicates that MediaTailor emits RAW_ADS_RESPONSE logs for playback sessions that are initialized with this configuration.",
  ).optional(),
});

const ManifestServiceInteractionLogSchema = z.object({
  ExcludeEventTypes: z.array(z.string()).describe(
    "Indicates that MediaTailor won't emit the selected events in the logs for playback sessions that are initialized with this configuration.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string(),
  Value: z.string(),
});

const HttpRequestSchema = z.object({
  HttpMethod: z.enum(["GET", "POST"]).describe(
    "Supported HTTP Methods for the request to the Ad Decision Server URL.",
  ).optional(),
  Body: z.string().describe(
    "The body of the request to the Ad Decision Server URL. The maximum length is 100,000 characters.",
  ).optional(),
  Headers: z.record(z.string(), z.string()).describe(
    "The headers in the request sent to the Ad Decision Server URL. The max length is 10,000 characters.",
  ).optional(),
  CompressRequest: z.enum(["NONE", "GZIP"]).describe(
    "The compression type of the request sent to the Ad Decision Server URL. Only the POST HTTP Method permits compression other than NONE.",
  ).optional(),
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  AdConditioningConfiguration: z.object({
    StreamingMediaFileConditioning: z.enum(["TRANSCODE", "NONE"]),
  }).describe(
    "The setting that indicates what conditioning MediaTailor will perform on ads that the ad decision server (ADS) returns.",
  ).optional(),
  AdDecisionServerUrl: z.string().describe(
    "The URL for the ad decision server (ADS). This includes the specification of static parameters and placeholders for dynamic parameters. AWS Elemental MediaTailor substitutes player-specific and session-specific parameters as needed when calling the ADS. Alternately, for testing you can provide a static VAST URL. The maximum length is 25,000 characters.",
  ),
  AvailSuppression: z.object({
    Mode: z.enum(["OFF", "BEHIND_LIVE_EDGE", "AFTER_LIVE_EDGE"]).describe(
      "Sets the ad suppression mode. By default, ad suppression is off and all ad breaks are filled with ads or slate. When Mode is set to BEHIND_LIVE_EDGE, ad suppression is active and MediaTailor won't fill ad breaks on or behind the ad suppression Value time in the manifest lookback window. When Mode is set to AFTER_LIVE_EDGE, ad suppression is active and MediaTailor won't fill ad breaks that are within the live edge plus the avail suppression value.",
    ).optional(),
    Value: z.string().describe(
      "A live edge offset time in HH:MM:SS. MediaTailor won't fill ad breaks on or behind this time in the manifest lookback window. If Value is set to 00:00:00, it is in sync with the live edge, and MediaTailor won't fill any ad breaks on or behind the live edge. If you set a Value time, MediaTailor won't fill any ad breaks on or behind this time in the manifest lookback window. For example, if you set 00:45:00, then MediaTailor will fill ad breaks that occur within 45 minutes behind the live edge, but won't fill ad breaks on or behind 45 minutes behind the live edge.",
    ).optional(),
    FillPolicy: z.enum(["PARTIAL_AVAIL", "FULL_AVAIL_ONLY"]).describe(
      "Defines the policy to apply to the avail suppression mode. BEHIND_LIVE_EDGE will always use the full avail suppression policy. AFTER_LIVE_EDGE mode can be used to invoke partial ad break fills when a session starts mid-break. Valid values are FULL_AVAIL_ONLY and PARTIAL_AVAIL",
    ).optional(),
  }).describe(
    "The configuration for avail suppression, also known as ad suppression. For more information about ad suppression, see Ad Suppression (https://docs.aws.amazon.com/mediatailor/latest/ug/ad-behavior.html).",
  ).optional(),
  Bumper: z.object({
    StartUrl: z.string().describe("The URL for the start bumper asset.")
      .optional(),
    EndUrl: z.string().describe("The URL for the end bumper asset.").optional(),
  }).describe(
    "The configuration for bumpers. Bumpers are short audio or video clips that play at the start or before the end of an ad break. To learn more about bumpers, see Bumpers (https://docs.aws.amazon.com/mediatailor/latest/ug/bumpers.html).",
  ).optional(),
  CdnConfiguration: z.object({
    AdSegmentUrlPrefix: z.string().describe(
      "A non-default content delivery network (CDN) to serve ad segments. By default, AWS Elemental MediaTailor uses Amazon CloudFront with default cache settings as its CDN for ad segments. To set up an alternate CDN, create a rule in your CDN for the origin ads.mediatailor.&lt;region>.amazonaws.com. Then specify the rule's name in this AdSegmentUrlPrefix. When AWS Elemental MediaTailor serves a manifest, it reports your CDN as the source for ad segments.",
    ).optional(),
    ContentSegmentUrlPrefix: z.string().describe(
      "A content delivery network (CDN) to cache content segments, so that content requests don't always have to go to the origin server. First, create a rule in your CDN for the content segment origin server. Then specify the rule's name in this ContentSegmentUrlPrefix. When AWS Elemental MediaTailor serves a manifest, it reports your CDN as the source for content segments.",
    ).optional(),
  }).describe(
    "The configuration for using a content delivery network (CDN), like Amazon CloudFront, for content and ad segment management.",
  ).optional(),
  DashConfiguration: z.object({
    MpdLocation: z.string().describe(
      "The setting that controls whether MediaTailor includes the Location tag in DASH manifests. MediaTailor populates the Location tag with the URL for manifest update requests, to be used by players that don't support sticky redirects. Disable this if you have CDN routing rules set up for accessing MediaTailor manifests, and you are either using client-side reporting or your players support sticky HTTP redirects. Valid values are DISABLED and EMT_DEFAULT. The EMT_DEFAULT setting enables the inclusion of the tag and is the default value.",
    ).optional(),
    OriginManifestType: z.enum(["SINGLE_PERIOD", "MULTI_PERIOD"]).describe(
      "The setting that controls whether MediaTailor handles manifests from the origin server as multi-period manifests or single-period manifests. If your origin server produces single-period manifests, set this to SINGLE_PERIOD. The default setting is MULTI_PERIOD. For multi-period manifests, omit this setting or set it to MULTI_PERIOD.",
    ).optional(),
  }).describe("The configuration for DASH content.").optional(),
  InsertionMode: z.enum(["STITCHED_ONLY", "PLAYER_SELECT"]).describe(
    "The setting that controls whether players can use stitched or guided ad insertion. The default, STITCHED_ONLY, forces all player sessions to use stitched (server-side) ad insertion. Choosing PLAYER_SELECT allows players to select either stitched or guided ad insertion at session-initialization time. The default for players that do not specify an insertion mode is stitched.",
  ).optional(),
  LivePreRollConfiguration: z.object({
    AdDecisionServerUrl: z.string().describe(
      "The URL for the ad decision server (ADS) for pre-roll ads. This includes the specification of static parameters and placeholders for dynamic parameters. AWS Elemental MediaTailor substitutes player-specific and session-specific parameters as needed when calling the ADS. Alternately, for testing, you can provide a static VAST URL. The maximum length is 25,000 characters.",
    ).optional(),
    MaxDurationSeconds: z.number().int().describe(
      "The maximum allowed duration for the pre-roll ad avail. AWS Elemental MediaTailor won't play pre-roll ads to exceed this duration, regardless of the total duration of ads that the ADS returns.",
    ).optional(),
  }).describe("The configuration for pre-roll ad insertion.").optional(),
  ManifestProcessingRules: z.object({
    AdMarkerPassthrough: AdMarkerPassthroughSchema.describe(
      "For HLS, when set to true, MediaTailor passes through EXT-X-CUE-IN, EXT-X-CUE-OUT, and EXT-X-SPLICEPOINT-SCTE35 ad markers from the origin manifest to the MediaTailor personalized manifest. No logic is applied to these ad markers. For example, if EXT-X-CUE-OUT has a value of 60, but no ads are filled for that ad break, MediaTailor will not set the value to 0.",
    ).optional(),
  }).describe(
    "The configuration for manifest processing rules. Manifest processing rules enable customization of the personalized manifests created by MediaTailor.",
  ).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The identifier for the playback configuration."),
  PersonalizationThresholdSeconds: z.number().int().describe(
    "Defines the maximum duration of underfilled ad time (in seconds) allowed in an ad break. If the duration of underfilled ad time exceeds the personalization threshold, then the personalization of the ad break is abandoned and the underlying content is shown. This feature applies to ad replacement in live and VOD streams, rather than ad insertion, because it relies on an underlying content stream. For more information about ad break behavior, including ad replacement and insertion, see Ad Behavior in AWS Elemental MediaTailor (https://docs.aws.amazon.com/mediatailor/latest/ug/ad-behavior.html).",
  ).optional(),
  LogConfiguration: z.object({
    AdsInteractionLog: AdsInteractionLogSchema.describe(
      "The event types that MediaTailor emits in logs for interactions with the ADS.",
    ).optional(),
    EnabledLoggingStrategies: z.array(z.string()).describe(
      "The method used for collecting logs from AWS Elemental MediaTailor. To configure MediaTailor to send logs directly to Amazon CloudWatch Logs, choose LEGACY_CLOUDWATCH. To configure MediaTailor to send logs to CloudWatch, which then vends the logs to your destination of choice, choose VENDED_LOGS. Supported destinations are CloudWatch Logs log group, Amazon S3 bucket, and Amazon Data Firehose stream. To use vended logs, you must configure the delivery destination in Amazon CloudWatch",
    ).optional(),
    ManifestServiceInteractionLog: ManifestServiceInteractionLogSchema.describe(
      "The event types that MediaTailor emits in logs for interactions with the origin server.",
    ).optional(),
    PercentEnabled: z.number().int().min(0).max(100).describe(
      "The percentage of session logs that MediaTailor sends to your CloudWatch Logs account. For example, if your playback configuration has 1000 sessions and percentEnabled is set to 60, MediaTailor sends logs for 600 of the sessions to CloudWatch Logs. MediaTailor decides at random which of the playback configuration sessions to send logs for. If you want to view logs for a specific session, you can use the debug log mode.",
    ),
  }).describe(
    "The configuration that defines where AWS Elemental MediaTailor sends logs for the playback configuration.",
  ).optional(),
  SlateAdUrl: z.string().describe(
    "The URL for a high-quality video asset to transcode and use to fill in time that's not used by ads. AWS Elemental MediaTailor shows the slate to fill in gaps in media content. Configuring the slate is optional for non-VPAID configurations. For VPAID, the slate is required because MediaTailor provides it in the slots that are designated for dynamic ad content. The slate must be a high-quality asset that contains both audio and video.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to assign to the playback configuration.",
  ).optional(),
  TranscodeProfileName: z.string().describe(
    "The name that is used to associate this playback configuration with a custom transcode profile. This overrides the dynamic transcoding defaults of MediaTailor. Use this only if you have already set up custom profiles with the help of AWS Support.",
  ).optional(),
  VideoContentSourceUrl: z.string().describe(
    "The URL prefix for the parent manifest for the stream, minus the asset ID. The maximum length is 512 characters.",
  ),
  AdDecisionServerConfiguration: z.object({
    HttpRequest: HttpRequestSchema.describe(
      "The configuration for the request to the Ad Decision Server URL.",
    ),
  }).describe(
    "The configuration for the request to the specified Ad Decision Server URL.",
  ).optional(),
  FunctionMapping: z.record(z.string(), z.string()).describe(
    "A map of event names to function identifiers for custom processing during session lifecycle events.",
  ).optional(),
});

const StateSchema = z.object({
  AdConditioningConfiguration: z.object({
    StreamingMediaFileConditioning: z.string(),
  }).optional(),
  AdDecisionServerUrl: z.string().optional(),
  AvailSuppression: z.object({
    Mode: z.string(),
    Value: z.string(),
    FillPolicy: z.string(),
  }).optional(),
  Bumper: z.object({
    StartUrl: z.string(),
    EndUrl: z.string(),
  }).optional(),
  CdnConfiguration: z.object({
    AdSegmentUrlPrefix: z.string(),
    ContentSegmentUrlPrefix: z.string(),
  }).optional(),
  DashConfiguration: z.object({
    MpdLocation: z.string(),
    OriginManifestType: z.string(),
    ManifestEndpointPrefix: z.string(),
  }).optional(),
  InsertionMode: z.string().optional(),
  LivePreRollConfiguration: z.object({
    AdDecisionServerUrl: z.string(),
    MaxDurationSeconds: z.number(),
  }).optional(),
  ManifestProcessingRules: z.object({
    AdMarkerPassthrough: AdMarkerPassthroughSchema,
  }).optional(),
  Name: z.string(),
  PersonalizationThresholdSeconds: z.number().optional(),
  SessionInitializationEndpointPrefix: z.string().optional(),
  HlsConfiguration: z.object({
    ManifestEndpointPrefix: z.string(),
  }).optional(),
  LogConfiguration: z.object({
    AdsInteractionLog: AdsInteractionLogSchema,
    EnabledLoggingStrategies: z.array(z.string()),
    ManifestServiceInteractionLog: ManifestServiceInteractionLogSchema,
    PercentEnabled: z.number(),
  }).optional(),
  PlaybackConfigurationArn: z.string().optional(),
  PlaybackEndpointPrefix: z.string().optional(),
  SlateAdUrl: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TranscodeProfileName: z.string().optional(),
  VideoContentSourceUrl: z.string().optional(),
  AdDecisionServerConfiguration: z.object({
    HttpRequest: HttpRequestSchema,
  }).optional(),
  FunctionMapping: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AdConditioningConfiguration: z.object({
    StreamingMediaFileConditioning: z.enum(["TRANSCODE", "NONE"]).optional(),
  }).describe(
    "The setting that indicates what conditioning MediaTailor will perform on ads that the ad decision server (ADS) returns.",
  ).optional(),
  AdDecisionServerUrl: z.string().describe(
    "The URL for the ad decision server (ADS). This includes the specification of static parameters and placeholders for dynamic parameters. AWS Elemental MediaTailor substitutes player-specific and session-specific parameters as needed when calling the ADS. Alternately, for testing you can provide a static VAST URL. The maximum length is 25,000 characters.",
  ).optional(),
  AvailSuppression: z.object({
    Mode: z.enum(["OFF", "BEHIND_LIVE_EDGE", "AFTER_LIVE_EDGE"]).describe(
      "Sets the ad suppression mode. By default, ad suppression is off and all ad breaks are filled with ads or slate. When Mode is set to BEHIND_LIVE_EDGE, ad suppression is active and MediaTailor won't fill ad breaks on or behind the ad suppression Value time in the manifest lookback window. When Mode is set to AFTER_LIVE_EDGE, ad suppression is active and MediaTailor won't fill ad breaks that are within the live edge plus the avail suppression value.",
    ).optional(),
    Value: z.string().describe(
      "A live edge offset time in HH:MM:SS. MediaTailor won't fill ad breaks on or behind this time in the manifest lookback window. If Value is set to 00:00:00, it is in sync with the live edge, and MediaTailor won't fill any ad breaks on or behind the live edge. If you set a Value time, MediaTailor won't fill any ad breaks on or behind this time in the manifest lookback window. For example, if you set 00:45:00, then MediaTailor will fill ad breaks that occur within 45 minutes behind the live edge, but won't fill ad breaks on or behind 45 minutes behind the live edge.",
    ).optional(),
    FillPolicy: z.enum(["PARTIAL_AVAIL", "FULL_AVAIL_ONLY"]).describe(
      "Defines the policy to apply to the avail suppression mode. BEHIND_LIVE_EDGE will always use the full avail suppression policy. AFTER_LIVE_EDGE mode can be used to invoke partial ad break fills when a session starts mid-break. Valid values are FULL_AVAIL_ONLY and PARTIAL_AVAIL",
    ).optional(),
  }).describe(
    "The configuration for avail suppression, also known as ad suppression. For more information about ad suppression, see Ad Suppression (https://docs.aws.amazon.com/mediatailor/latest/ug/ad-behavior.html).",
  ).optional(),
  Bumper: z.object({
    StartUrl: z.string().describe("The URL for the start bumper asset.")
      .optional(),
    EndUrl: z.string().describe("The URL for the end bumper asset.").optional(),
  }).describe(
    "The configuration for bumpers. Bumpers are short audio or video clips that play at the start or before the end of an ad break. To learn more about bumpers, see Bumpers (https://docs.aws.amazon.com/mediatailor/latest/ug/bumpers.html).",
  ).optional(),
  CdnConfiguration: z.object({
    AdSegmentUrlPrefix: z.string().describe(
      "A non-default content delivery network (CDN) to serve ad segments. By default, AWS Elemental MediaTailor uses Amazon CloudFront with default cache settings as its CDN for ad segments. To set up an alternate CDN, create a rule in your CDN for the origin ads.mediatailor.&lt;region>.amazonaws.com. Then specify the rule's name in this AdSegmentUrlPrefix. When AWS Elemental MediaTailor serves a manifest, it reports your CDN as the source for ad segments.",
    ).optional(),
    ContentSegmentUrlPrefix: z.string().describe(
      "A content delivery network (CDN) to cache content segments, so that content requests don't always have to go to the origin server. First, create a rule in your CDN for the content segment origin server. Then specify the rule's name in this ContentSegmentUrlPrefix. When AWS Elemental MediaTailor serves a manifest, it reports your CDN as the source for content segments.",
    ).optional(),
  }).describe(
    "The configuration for using a content delivery network (CDN), like Amazon CloudFront, for content and ad segment management.",
  ).optional(),
  DashConfiguration: z.object({
    MpdLocation: z.string().describe(
      "The setting that controls whether MediaTailor includes the Location tag in DASH manifests. MediaTailor populates the Location tag with the URL for manifest update requests, to be used by players that don't support sticky redirects. Disable this if you have CDN routing rules set up for accessing MediaTailor manifests, and you are either using client-side reporting or your players support sticky HTTP redirects. Valid values are DISABLED and EMT_DEFAULT. The EMT_DEFAULT setting enables the inclusion of the tag and is the default value.",
    ).optional(),
    OriginManifestType: z.enum(["SINGLE_PERIOD", "MULTI_PERIOD"]).describe(
      "The setting that controls whether MediaTailor handles manifests from the origin server as multi-period manifests or single-period manifests. If your origin server produces single-period manifests, set this to SINGLE_PERIOD. The default setting is MULTI_PERIOD. For multi-period manifests, omit this setting or set it to MULTI_PERIOD.",
    ).optional(),
  }).describe("The configuration for DASH content.").optional(),
  InsertionMode: z.enum(["STITCHED_ONLY", "PLAYER_SELECT"]).describe(
    "The setting that controls whether players can use stitched or guided ad insertion. The default, STITCHED_ONLY, forces all player sessions to use stitched (server-side) ad insertion. Choosing PLAYER_SELECT allows players to select either stitched or guided ad insertion at session-initialization time. The default for players that do not specify an insertion mode is stitched.",
  ).optional(),
  LivePreRollConfiguration: z.object({
    AdDecisionServerUrl: z.string().describe(
      "The URL for the ad decision server (ADS) for pre-roll ads. This includes the specification of static parameters and placeholders for dynamic parameters. AWS Elemental MediaTailor substitutes player-specific and session-specific parameters as needed when calling the ADS. Alternately, for testing, you can provide a static VAST URL. The maximum length is 25,000 characters.",
    ).optional(),
    MaxDurationSeconds: z.number().int().describe(
      "The maximum allowed duration for the pre-roll ad avail. AWS Elemental MediaTailor won't play pre-roll ads to exceed this duration, regardless of the total duration of ads that the ADS returns.",
    ).optional(),
  }).describe("The configuration for pre-roll ad insertion.").optional(),
  ManifestProcessingRules: z.object({
    AdMarkerPassthrough: AdMarkerPassthroughSchema.describe(
      "For HLS, when set to true, MediaTailor passes through EXT-X-CUE-IN, EXT-X-CUE-OUT, and EXT-X-SPLICEPOINT-SCTE35 ad markers from the origin manifest to the MediaTailor personalized manifest. No logic is applied to these ad markers. For example, if EXT-X-CUE-OUT has a value of 60, but no ads are filled for that ad break, MediaTailor will not set the value to 0.",
    ).optional(),
  }).describe(
    "The configuration for manifest processing rules. Manifest processing rules enable customization of the personalized manifests created by MediaTailor.",
  ).optional(),
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The identifier for the playback configuration.").optional(),
  PersonalizationThresholdSeconds: z.number().int().describe(
    "Defines the maximum duration of underfilled ad time (in seconds) allowed in an ad break. If the duration of underfilled ad time exceeds the personalization threshold, then the personalization of the ad break is abandoned and the underlying content is shown. This feature applies to ad replacement in live and VOD streams, rather than ad insertion, because it relies on an underlying content stream. For more information about ad break behavior, including ad replacement and insertion, see Ad Behavior in AWS Elemental MediaTailor (https://docs.aws.amazon.com/mediatailor/latest/ug/ad-behavior.html).",
  ).optional(),
  LogConfiguration: z.object({
    AdsInteractionLog: AdsInteractionLogSchema.describe(
      "The event types that MediaTailor emits in logs for interactions with the ADS.",
    ).optional(),
    EnabledLoggingStrategies: z.array(z.string()).describe(
      "The method used for collecting logs from AWS Elemental MediaTailor. To configure MediaTailor to send logs directly to Amazon CloudWatch Logs, choose LEGACY_CLOUDWATCH. To configure MediaTailor to send logs to CloudWatch, which then vends the logs to your destination of choice, choose VENDED_LOGS. Supported destinations are CloudWatch Logs log group, Amazon S3 bucket, and Amazon Data Firehose stream. To use vended logs, you must configure the delivery destination in Amazon CloudWatch",
    ).optional(),
    ManifestServiceInteractionLog: ManifestServiceInteractionLogSchema.describe(
      "The event types that MediaTailor emits in logs for interactions with the origin server.",
    ).optional(),
    PercentEnabled: z.number().int().min(0).max(100).describe(
      "The percentage of session logs that MediaTailor sends to your CloudWatch Logs account. For example, if your playback configuration has 1000 sessions and percentEnabled is set to 60, MediaTailor sends logs for 600 of the sessions to CloudWatch Logs. MediaTailor decides at random which of the playback configuration sessions to send logs for. If you want to view logs for a specific session, you can use the debug log mode.",
    ).optional(),
  }).describe(
    "The configuration that defines where AWS Elemental MediaTailor sends logs for the playback configuration.",
  ).optional(),
  SlateAdUrl: z.string().describe(
    "The URL for a high-quality video asset to transcode and use to fill in time that's not used by ads. AWS Elemental MediaTailor shows the slate to fill in gaps in media content. Configuring the slate is optional for non-VPAID configurations. For VPAID, the slate is required because MediaTailor provides it in the slots that are designated for dynamic ad content. The slate must be a high-quality asset that contains both audio and video.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags to assign to the playback configuration.",
  ).optional(),
  TranscodeProfileName: z.string().describe(
    "The name that is used to associate this playback configuration with a custom transcode profile. This overrides the dynamic transcoding defaults of MediaTailor. Use this only if you have already set up custom profiles with the help of AWS Support.",
  ).optional(),
  VideoContentSourceUrl: z.string().describe(
    "The URL prefix for the parent manifest for the stream, minus the asset ID. The maximum length is 512 characters.",
  ).optional(),
  AdDecisionServerConfiguration: z.object({
    HttpRequest: HttpRequestSchema.describe(
      "The configuration for the request to the Ad Decision Server URL.",
    ).optional(),
  }).describe(
    "The configuration for the request to the specified Ad Decision Server URL.",
  ).optional(),
  FunctionMapping: z.record(z.string(), z.string()).describe(
    "A map of event names to function identifiers for custom processing during session lifecycle events.",
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

/** Swamp extension model for MediaTailor PlaybackConfiguration. Registered at `@swamp/aws/mediatailor/playback-configuration`. */
export const model = {
  type: "@swamp/aws/mediatailor/playback-configuration",
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
      description: "Added: FunctionMapping",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MediaTailor PlaybackConfiguration resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaTailor PlaybackConfiguration",
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
          "AWS::MediaTailor::PlaybackConfiguration",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a MediaTailor PlaybackConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaTailor PlaybackConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaTailor::PlaybackConfiguration",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a MediaTailor PlaybackConfiguration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaTailor::PlaybackConfiguration",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MediaTailor::PlaybackConfiguration",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a MediaTailor PlaybackConfiguration",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaTailor PlaybackConfiguration",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaTailor::PlaybackConfiguration",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync MediaTailor PlaybackConfiguration state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaTailor::PlaybackConfiguration",
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
