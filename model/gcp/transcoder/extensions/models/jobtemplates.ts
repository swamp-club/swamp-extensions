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

// Auto-generated extension model for @swamp/gcp/transcoder/jobtemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Transcoder JobTemplates.
 *
 * Transcoding job template resource.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/jobTemplates/${shortName}`;
}

const BASE_URL = "https://transcoder.googleapis.com/";

const GET_CONFIG = {
  "id": "transcoder.projects.locations.jobTemplates.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "transcoder.projects.locations.jobTemplates.create",
  "path": "v1/{+parent}/jobTemplates",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "jobTemplateId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "transcoder.projects.locations.jobTemplates.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "transcoder.projects.locations.jobTemplates.list",
  "path": "v1/{+parent}/jobTemplates",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  config: z.object({
    adBreaks: z.array(z.object({
      startTimeOffset: z.string().describe(
        "Start time in seconds for the ad break, relative to the output file timeline. The default is `0s`.",
      ).optional(),
    })).describe(
      "List of ad breaks. Specifies where to insert ad break tags in the output manifests.",
    ).optional(),
    editList: z.array(z.object({
      endTimeOffset: z.string().describe(
        "End time in seconds for the atom, relative to the input file timeline. When `end_time_offset` is not specified, the `inputs` are used until the end of the atom.",
      ).optional(),
      inputs: z.array(z.string()).describe(
        "List of Input.key values identifying files that should be used in this atom. The listed `inputs` must have the same timeline.",
      ).optional(),
      key: z.string().describe(
        "A unique key for this atom. Must be specified when using advanced mapping.",
      ).optional(),
      startTimeOffset: z.string().describe(
        "Start time in seconds for the atom, relative to the input file timeline. The default is `0s`.",
      ).optional(),
    })).describe(
      "List of edit atoms. Defines the ultimate timeline of the resulting file or manifest.",
    ).optional(),
    elementaryStreams: z.array(z.object({
      audioStream: z.object({
        bitrateBps: z.number().int().describe(
          "Required. Audio bitrate in bits per second. Must be between 1 and 10,000,000.",
        ).optional(),
        channelCount: z.number().int().describe(
          "Number of audio channels. Must be between 1 and 6. The default is 2.",
        ).optional(),
        channelLayout: z.array(z.unknown()).describe(
          'A list of channel names specifying layout of the audio channels. This only affects the metadata embedded in the container headers, if supported by the specified format. The default is `["fl", "fr"]`. Supported channel names: - `fl` - Front left channel - `fr` - Front right channel - `sl` - Side left channel - `sr` - Side right channel - `fc` - Front center channel - `lfe` - Low frequency',
        ).optional(),
        codec: z.string().describe(
          "The codec for this audio stream. The default is `aac`. Supported audio codecs: - `aac` - `aac-he` - `aac-he-v2` - `mp3` - `ac3` - `eac3` - `vorbis`",
        ).optional(),
        displayName: z.string().describe(
          "The name for this particular audio stream that will be added to the HLS/DASH manifest. Not supported in MP4 files.",
        ).optional(),
        languageCode: z.string().describe(
          "The BCP-47 language code, such as `en-US` or `sr-Latn`. For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier. Not supported in MP4 files.",
        ).optional(),
        mapping: z.array(z.unknown()).describe(
          "The mapping for the JobConfig.edit_list atoms with audio EditAtom.inputs.",
        ).optional(),
        sampleRateHertz: z.number().int().describe(
          "The audio sample rate in Hertz. The default is 48000 Hertz.",
        ).optional(),
      }).describe("Audio stream resource.").optional(),
      key: z.string().describe("A unique key for this elementary stream.")
        .optional(),
      textStream: z.object({
        codec: z.string().describe(
          "The codec for this text stream. The default is `webvtt`. Supported text codecs: - `srt` - `ttml` - `cea608` - `cea708` - `webvtt`",
        ).optional(),
        displayName: z.string().describe(
          "The name for this particular text stream that will be added to the HLS/DASH manifest. Not supported in MP4 files.",
        ).optional(),
        languageCode: z.string().describe(
          "The BCP-47 language code, such as `en-US` or `sr-Latn`. For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier. Not supported in MP4 files.",
        ).optional(),
        mapping: z.array(z.unknown()).describe(
          "The mapping for the JobConfig.edit_list atoms with text EditAtom.inputs.",
        ).optional(),
      }).describe(
        "Encoding of a text stream. For example, closed captions or subtitles.",
      ).optional(),
      videoStream: z.object({
        h264: z.object({
          allowOpenGop: z.unknown().describe(
            "Specifies whether an open Group of Pictures (GOP) structure should be allowed or not. The default is `false`.",
          ).optional(),
          aqStrength: z.unknown().describe(
            "Specify the intensity of the adaptive quantizer (AQ). Must be between 0 and 1, where 0 disables the quantizer and 1 maximizes the quantizer. A higher value equals a lower bitrate but smoother image. The default is 0.",
          ).optional(),
          bFrameCount: z.unknown().describe(
            "The number of consecutive B-frames. Must be greater than or equal to zero. Must be less than H264CodecSettings.gop_frame_count if set. The default is 0.",
          ).optional(),
          bPyramid: z.unknown().describe(
            "Allow B-pyramid for reference frame selection. This may not be supported on all decoders. The default is `false`.",
          ).optional(),
          bitrateBps: z.unknown().describe(
            "Required. The video bitrate in bits per second. The minimum value is 1,000. The maximum value is 800,000,000.",
          ).optional(),
          crfLevel: z.unknown().describe(
            "Target CRF level. Must be between 10 and 36, where 10 is the highest quality and 36 is the most efficient compression. The default is 21.",
          ).optional(),
          enableTwoPass: z.unknown().describe(
            "Use two-pass encoding strategy to achieve better video quality. H264CodecSettings.rate_control_mode must be `vbr`. The default is `false`.",
          ).optional(),
          entropyCoder: z.unknown().describe(
            "The entropy coder to use. The default is `cabac`. Supported entropy coders: - `cavlc` - `cabac`",
          ).optional(),
          frameRate: z.unknown().describe(
            "Required. The target video frame rate in frames per second (FPS). Must be less than or equal to 120.",
          ).optional(),
          frameRateConversionStrategy: z.unknown().describe(
            "Optional. Frame rate conversion strategy for desired frame rate. The default is `DOWNSAMPLE`.",
          ).optional(),
          gopDuration: z.unknown().describe(
            "Select the GOP size based on the specified duration. The default is `3s`. Note that `gopDuration` must be less than or equal to [`segmentDuration`](#SegmentSettings), and [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`.",
          ).optional(),
          gopFrameCount: z.unknown().describe(
            "Select the GOP size based on the specified frame count. Must be greater than zero.",
          ).optional(),
          heightPixels: z.unknown().describe(
            "The height of the video in pixels. Must be an even integer. When not specified, the height is adjusted to match the specified width and input aspect ratio. If both are omitted, the input height is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
          hlg: z.unknown().describe(
            "Convert the input video to a Hybrid Log Gamma (HLG) video.",
          ).optional(),
          pixelFormat: z.unknown().describe(
            "Pixel format to use. The default is `yuv420p`. Supported pixel formats: - `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format - `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format - `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format - `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format",
          ).optional(),
          preset: z.unknown().describe(
            "Enforces the specified codec preset. The default is `veryfast`. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Preset). Note that certain values for this field may cause the transcoder to override other fields you set in the `H264CodecSettings` message.",
          ).optional(),
          profile: z.unknown().describe(
            "Enforces the specified codec profile. The following profiles are supported: * `baseline` * `main` * `high` (default) The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Tune). Note that certain values for this field may cause the transcoder to override other fields you set in the `H264CodecSettings` message.",
          ).optional(),
          rateControlMode: z.unknown().describe(
            "Specify the mode. The default is `vbr`. Supported rate control modes: - `vbr` - variable bitrate - `crf` - constant rate factor",
          ).optional(),
          sdr: z.unknown().describe(
            "Convert the input video to a Standard Dynamic Range (SDR) video.",
          ).optional(),
          tune: z.unknown().describe(
            "Enforces the specified codec tune. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Tune). Note that certain values for this field may cause the transcoder to override other fields you set in the `H264CodecSettings` message.",
          ).optional(),
          vbvFullnessBits: z.unknown().describe(
            "Initial fullness of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to 90% of H264CodecSettings.vbv_size_bits.",
          ).optional(),
          vbvSizeBits: z.unknown().describe(
            "Size of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to H264CodecSettings.bitrate_bps.",
          ).optional(),
          widthPixels: z.unknown().describe(
            "The width of the video in pixels. Must be an even integer. When not specified, the width is adjusted to match the specified height and input aspect ratio. If both are omitted, the input width is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
        }).describe("H264 codec settings.").optional(),
        h265: z.object({
          allowOpenGop: z.unknown().describe(
            "Specifies whether an open Group of Pictures (GOP) structure should be allowed or not. The default is `false`.",
          ).optional(),
          aqStrength: z.unknown().describe(
            "Specify the intensity of the adaptive quantizer (AQ). Must be between 0 and 1, where 0 disables the quantizer and 1 maximizes the quantizer. A higher value equals a lower bitrate but smoother image. The default is 0.",
          ).optional(),
          bFrameCount: z.unknown().describe(
            "The number of consecutive B-frames. Must be greater than or equal to zero. Must be less than H265CodecSettings.gop_frame_count if set. The default is 0.",
          ).optional(),
          bPyramid: z.unknown().describe(
            "Allow B-pyramid for reference frame selection. This may not be supported on all decoders. The default is `false`.",
          ).optional(),
          bitrateBps: z.unknown().describe(
            "Required. The video bitrate in bits per second. The minimum value is 1,000. The maximum value is 800,000,000.",
          ).optional(),
          crfLevel: z.unknown().describe(
            "Target CRF level. Must be between 10 and 36, where 10 is the highest quality and 36 is the most efficient compression. The default is 21.",
          ).optional(),
          enableTwoPass: z.unknown().describe(
            "Use two-pass encoding strategy to achieve better video quality. H265CodecSettings.rate_control_mode must be `vbr`. The default is `false`.",
          ).optional(),
          frameRate: z.unknown().describe(
            "Required. The target video frame rate in frames per second (FPS). Must be less than or equal to 120.",
          ).optional(),
          frameRateConversionStrategy: z.unknown().describe(
            "Optional. Frame rate conversion strategy for desired frame rate. The default is `DOWNSAMPLE`.",
          ).optional(),
          gopDuration: z.unknown().describe(
            "Select the GOP size based on the specified duration. The default is `3s`. Note that `gopDuration` must be less than or equal to [`segmentDuration`](#SegmentSettings), and [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`.",
          ).optional(),
          gopFrameCount: z.unknown().describe(
            "Select the GOP size based on the specified frame count. Must be greater than zero.",
          ).optional(),
          hdr10: z.unknown().describe(
            "Convert the input video to a High Dynamic Range 10 (HDR10) video.",
          ).optional(),
          heightPixels: z.unknown().describe(
            "The height of the video in pixels. Must be an even integer. When not specified, the height is adjusted to match the specified width and input aspect ratio. If both are omitted, the input height is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
          hlg: z.unknown().describe(
            "Convert the input video to a Hybrid Log Gamma (HLG) video.",
          ).optional(),
          pixelFormat: z.unknown().describe(
            "Pixel format to use. The default is `yuv420p`. Supported pixel formats: - `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format - `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format - `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format - `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format",
          ).optional(),
          preset: z.unknown().describe(
            "Enforces the specified codec preset. The default is `veryfast`. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.265). Note that certain values for this field may cause the transcoder to override other fields you set in the `H265CodecSettings` message.",
          ).optional(),
          profile: z.unknown().describe(
            "Enforces the specified codec profile. The following profiles are supported: * 8-bit profiles * `main` (default) * `main-intra` * `mainstillpicture` * 10-bit profiles * `main10` (default) * `main10-intra` * `main422-10` * `main422-10-intra` * `main444-10` * `main444-10-intra` * 12-bit profiles * `main12` (default) * `main12-intra` * `main422-12` * `main422-12-intra` * `main444-12` * `main444-12-intra` The available options are [FFmpeg-compatible](https://x265.readthedocs.io/). Note that certain values for this field may cause the transcoder to override other fields you set in the `H265CodecSettings` message.",
          ).optional(),
          rateControlMode: z.unknown().describe(
            "Specify the mode. The default is `vbr`. Supported rate control modes: - `vbr` - variable bitrate - `crf` - constant rate factor",
          ).optional(),
          sdr: z.unknown().describe(
            "Convert the input video to a Standard Dynamic Range (SDR) video.",
          ).optional(),
          tune: z.unknown().describe(
            "Enforces the specified codec tune. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.265). Note that certain values for this field may cause the transcoder to override other fields you set in the `H265CodecSettings` message.",
          ).optional(),
          vbvFullnessBits: z.unknown().describe(
            "Initial fullness of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to 90% of H265CodecSettings.vbv_size_bits.",
          ).optional(),
          vbvSizeBits: z.unknown().describe(
            "Size of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to `VideoStream.bitrate_bps`.",
          ).optional(),
          widthPixels: z.unknown().describe(
            "The width of the video in pixels. Must be an even integer. When not specified, the width is adjusted to match the specified height and input aspect ratio. If both are omitted, the input width is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
        }).describe("H265 codec settings.").optional(),
        vp9: z.object({
          bitrateBps: z.unknown().describe(
            "Required. The video bitrate in bits per second. The minimum value is 1,000. The maximum value is 480,000,000.",
          ).optional(),
          crfLevel: z.unknown().describe(
            "Target CRF level. Must be between 10 and 36, where 10 is the highest quality and 36 is the most efficient compression. The default is 21. **Note:** This field is not supported.",
          ).optional(),
          frameRate: z.unknown().describe(
            "Required. The target video frame rate in frames per second (FPS). Must be less than or equal to 120.",
          ).optional(),
          frameRateConversionStrategy: z.unknown().describe(
            "Optional. Frame rate conversion strategy for desired frame rate. The default is `DOWNSAMPLE`.",
          ).optional(),
          gopDuration: z.unknown().describe(
            "Select the GOP size based on the specified duration. The default is `3s`. Note that `gopDuration` must be less than or equal to [`segmentDuration`](#SegmentSettings), and [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`.",
          ).optional(),
          gopFrameCount: z.unknown().describe(
            "Select the GOP size based on the specified frame count. Must be greater than zero.",
          ).optional(),
          heightPixels: z.unknown().describe(
            "The height of the video in pixels. Must be an even integer. When not specified, the height is adjusted to match the specified width and input aspect ratio. If both are omitted, the input height is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
          hlg: z.unknown().describe(
            "Convert the input video to a Hybrid Log Gamma (HLG) video.",
          ).optional(),
          pixelFormat: z.unknown().describe(
            "Pixel format to use. The default is `yuv420p`. Supported pixel formats: - `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format - `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format - `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format - `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format",
          ).optional(),
          profile: z.unknown().describe(
            "Enforces the specified codec profile. The following profiles are supported: * `profile0` (default) * `profile1` * `profile2` * `profile3` The available options are [WebM-compatible](https://www.webmproject.org/vp9/profiles/). Note that certain values for this field may cause the transcoder to override other fields you set in the `Vp9CodecSettings` message.",
          ).optional(),
          rateControlMode: z.unknown().describe(
            "Specify the mode. The default is `vbr`. Supported rate control modes: - `vbr` - variable bitrate",
          ).optional(),
          sdr: z.unknown().describe(
            "Convert the input video to a Standard Dynamic Range (SDR) video.",
          ).optional(),
          widthPixels: z.unknown().describe(
            "The width of the video in pixels. Must be an even integer. When not specified, the width is adjusted to match the specified height and input aspect ratio. If both are omitted, the input width is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
        }).describe("VP9 codec settings.").optional(),
      }).describe("Video stream resource.").optional(),
    })).describe("List of elementary streams.").optional(),
    encryptions: z.array(z.object({
      aes128: z.object({}).describe("Configuration for AES-128 encryption.")
        .optional(),
      drmSystems: z.object({
        clearkey: z.object({}).describe("Clearkey configuration.").optional(),
        fairplay: z.object({}).describe("Fairplay configuration.").optional(),
        playready: z.object({}).describe("Playready configuration.").optional(),
        widevine: z.object({}).describe("Widevine configuration.").optional(),
      }).describe("Defines configuration for DRM systems in use.").optional(),
      id: z.string().describe(
        "Required. Identifier for this set of encryption options.",
      ).optional(),
      mpegCenc: z.object({
        scheme: z.string().describe(
          "Required. Specify the encryption scheme. Supported encryption schemes: - `cenc` - `cbcs`",
        ).optional(),
      }).describe("Configuration for MPEG Common Encryption (MPEG-CENC).")
        .optional(),
      sampleAes: z.object({}).describe(
        "Configuration for SAMPLE-AES encryption.",
      ).optional(),
      secretManagerKeySource: z.object({
        secretVersion: z.string().describe(
          'Required. The name of the Secret Version containing the encryption key in the following format: `projects/{project}/secrets/{secret_id}/versions/{version_number}` Note that only numbered versions are supported. Aliases like "latest" are not supported.',
        ).optional(),
      }).describe("Configuration for secrets stored in Google Secret Manager.")
        .optional(),
    })).describe(
      "List of encryption configurations for the content. Each configuration has an ID. Specify this ID in the MuxStream.encryption_id field to indicate the configuration to use for that `MuxStream` output.",
    ).optional(),
    inputs: z.array(z.object({
      attributes: z.object({
        trackDefinitions: z.array(z.unknown()).describe(
          "Optional. A list of track definitions for the input asset.",
        ).optional(),
      }).describe(
        "Input attributes that provide additional information about the input asset.",
      ).optional(),
      key: z.string().describe(
        "A unique key for this input. Must be specified when using advanced mapping and edit lists.",
      ).optional(),
      preprocessingConfig: z.object({
        audio: z.object({
          highBoost: z.unknown().describe(
            "Enable boosting high frequency components. The default is `false`. **Note:** This field is not supported.",
          ).optional(),
          lowBoost: z.unknown().describe(
            "Enable boosting low frequency components. The default is `false`. **Note:** This field is not supported.",
          ).optional(),
          lufs: z.unknown().describe(
            "Specify audio loudness normalization in loudness units relative to full scale (LUFS). Enter a value between -24 and 0 (the default), where: * -24 is the Advanced Television Systems Committee (ATSC A/85) standard * -23 is the EU R128 broadcast standard * -19 is the prior standard for online mono audio * -18 is the ReplayGain standard * -16 is the prior standard for stereo audio * -14 is the new online audio standard recommended by Spotify, as well as Amazon Echo * 0 disables normalization",
          ).optional(),
        }).describe("Audio preprocessing configuration.").optional(),
        color: z.object({
          brightness: z.unknown().describe(
            "Control brightness of the video. Enter a value between -1 and 1, where -1 is minimum brightness and 1 is maximum brightness. 0 is no change. The default is 0.",
          ).optional(),
          contrast: z.unknown().describe(
            "Control black and white contrast of the video. Enter a value between -1 and 1, where -1 is minimum contrast and 1 is maximum contrast. 0 is no change. The default is 0.",
          ).optional(),
          saturation: z.unknown().describe(
            "Control color saturation of the video. Enter a value between -1 and 1, where -1 is fully desaturated and 1 is maximum saturation. 0 is no change. The default is 0.",
          ).optional(),
        }).describe(
          "Color preprocessing configuration. **Note:** This configuration is not supported.",
        ).optional(),
        crop: z.object({
          bottomPixels: z.unknown().describe(
            "The number of pixels to crop from the bottom. The default is 0.",
          ).optional(),
          leftPixels: z.unknown().describe(
            "The number of pixels to crop from the left. The default is 0.",
          ).optional(),
          rightPixels: z.unknown().describe(
            "The number of pixels to crop from the right. The default is 0.",
          ).optional(),
          topPixels: z.unknown().describe(
            "The number of pixels to crop from the top. The default is 0.",
          ).optional(),
        }).describe(
          "Video cropping configuration for the input video. The cropped input video is scaled to match the output resolution.",
        ).optional(),
        deblock: z.object({
          enabled: z.unknown().describe(
            "Enable deblocker. The default is `false`.",
          ).optional(),
          strength: z.unknown().describe(
            "Set strength of the deblocker. Enter a value between 0 and 1. The higher the value, the stronger the block removal. 0 is no deblocking. The default is 0.",
          ).optional(),
        }).describe(
          "Deblock preprocessing configuration. **Note:** This configuration is not supported.",
        ).optional(),
        deinterlace: z.object({
          bwdif: z.unknown().describe(
            "Bob Weaver Deinterlacing Filter Configuration.",
          ).optional(),
          yadif: z.unknown().describe(
            "Yet Another Deinterlacing Filter Configuration.",
          ).optional(),
        }).describe("Deinterlace configuration for input video.").optional(),
        denoise: z.object({
          strength: z.unknown().describe(
            "Set strength of the denoise. Enter a value between 0 and 1. The higher the value, the smoother the image. 0 is no denoising. The default is 0.",
          ).optional(),
          tune: z.unknown().describe(
            "Set the denoiser mode. The default is `standard`. Supported denoiser modes: - `standard` - `grain`",
          ).optional(),
        }).describe(
          "Denoise preprocessing configuration. **Note:** This configuration is not supported.",
        ).optional(),
        pad: z.object({
          bottomPixels: z.unknown().describe(
            "The number of pixels to add to the bottom. The default is 0.",
          ).optional(),
          leftPixels: z.unknown().describe(
            "The number of pixels to add to the left. The default is 0.",
          ).optional(),
          rightPixels: z.unknown().describe(
            "The number of pixels to add to the right. The default is 0.",
          ).optional(),
          topPixels: z.unknown().describe(
            "The number of pixels to add to the top. The default is 0.",
          ).optional(),
        }).describe(
          "Pad filter configuration for the input video. The padded input video is scaled after padding with black to match the output resolution.",
        ).optional(),
      }).describe("Preprocessing configurations.").optional(),
      uri: z.string().describe(
        "URI of the media. Input files must be at least 5 seconds in duration and stored in Cloud Storage (for example, `gs://bucket/inputs/file.mp4`). If empty, the value is populated from Job.input_uri. See [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats).",
      ).optional(),
    })).describe("List of input assets stored in Cloud Storage.").optional(),
    manifests: z.array(z.object({
      dash: z.object({
        segmentReferenceScheme: z.enum([
          "SEGMENT_REFERENCE_SCHEME_UNSPECIFIED",
          "SEGMENT_LIST",
          "SEGMENT_TEMPLATE_NUMBER",
        ]).describe(
          "The segment reference scheme for a `DASH` manifest. The default is `SEGMENT_LIST`.",
        ).optional(),
      }).describe("`DASH` manifest configuration.").optional(),
      fileName: z.string().describe(
        "The name of the generated file. The default is `manifest` with the extension suffix corresponding to the Manifest.type.",
      ).optional(),
      muxStreams: z.array(z.string()).describe(
        "Required. List of user supplied MuxStream.key values that should appear in this manifest. When Manifest.type is `HLS`, a media manifest with name MuxStream.key and `.m3u8` extension is generated for each element in this list.",
      ).optional(),
      type: z.enum(["MANIFEST_TYPE_UNSPECIFIED", "HLS", "DASH"]).describe(
        "Required. Type of the manifest.",
      ).optional(),
    })).describe("List of output manifests.").optional(),
    muxStreams: z.array(z.object({
      container: z.string().describe(
        "The container format. The default is `mp4` Supported streaming formats: - `ts` - `fmp4`- the corresponding file extension is `.m4s` Supported standalone file formats: - `mp4` - `mp3` - `ogg` - `vtt` See also: [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats)",
      ).optional(),
      elementaryStreams: z.array(z.string()).describe(
        "List of ElementaryStream.key values multiplexed in this stream.",
      ).optional(),
      encryptionId: z.string().describe(
        "Identifier of the encryption configuration to use. If omitted, output will be unencrypted.",
      ).optional(),
      fileName: z.string().describe(
        "The name of the generated file. The default is MuxStream.key with the extension suffix corresponding to the MuxStream.container. Individual segments also have an incremental 10-digit zero-padded suffix starting from 0 before the extension, such as `mux_stream0000000123.ts`.",
      ).optional(),
      fmp4: z.object({
        codecTag: z.string().describe(
          "Optional. Specify the codec tag string that will be used in the media bitstream. When not specified, the codec appropriate value is used. Supported H265 codec tags: - `hvc1` (default) - `hev1`",
        ).optional(),
      }).describe("`fmp4` container configuration.").optional(),
      key: z.string().describe("A unique key for this multiplexed stream.")
        .optional(),
      segmentSettings: z.object({
        individualSegments: z.boolean().describe(
          "Required. Create an individual segment file. The default is `false`.",
        ).optional(),
        segmentDuration: z.string().describe(
          "Duration of the segments in seconds. The default is `6.0s`. Note that `segmentDuration` must be greater than or equal to [`gopDuration`](#videostream), and `segmentDuration` must be divisible by [`gopDuration`](#videostream).",
        ).optional(),
      }).describe("Segment settings for `ts`, `fmp4` and `vtt`.").optional(),
    })).describe("List of multiplexing settings for output streams.")
      .optional(),
    output: z.object({
      uri: z.string().describe(
        "URI for the output file(s). For example, `gs://my-bucket/outputs/`. Must be a directory and not a top-level bucket. If empty, the value is populated from Job.output_uri. See [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats).",
      ).optional(),
    }).describe("Location of output file(s) in a Cloud Storage bucket.")
      .optional(),
    overlays: z.array(z.object({
      animations: z.array(z.object({
        animationEnd: z.unknown().describe(
          "End previous overlay animation from the video. Without `AnimationEnd`, the overlay object will keep the state of previous animation until the end of the video.",
        ).optional(),
        animationFade: z.unknown().describe(
          "Display overlay object with fade animation.",
        ).optional(),
        animationStatic: z.unknown().describe("Display static overlay object.")
          .optional(),
      })).describe(
        "List of animations. The list should be chronological, without any time overlap.",
      ).optional(),
      image: z.object({
        alpha: z.number().describe(
          "Target image opacity. Valid values are from `1.0` (solid, default) to `0.0` (transparent), exclusive. Set this to a value greater than `0.0`.",
        ).optional(),
        resolution: z.object({
          x: z.unknown().describe("Normalized x coordinate.").optional(),
          y: z.unknown().describe("Normalized y coordinate.").optional(),
        }).describe("2D normalized coordinates. Default: `{0.0, 0.0}`")
          .optional(),
        uri: z.string().describe(
          "Required. URI of the image in Cloud Storage. For example, `gs://bucket/inputs/image.png`. Only PNG and JPEG images are supported.",
        ).optional(),
      }).describe("Overlaid image.").optional(),
    })).describe("List of overlays on the output video, in descending Z-order.")
      .optional(),
    pubsubDestination: z.object({
      topic: z.string().describe(
        "The name of the Pub/Sub topic to publish job completion notification to. For example: `projects/{project}/topics/{topic}`.",
      ).optional(),
    }).describe("A Pub/Sub destination.").optional(),
    spriteSheets: z.array(z.object({
      columnCount: z.number().int().describe(
        "The maximum number of sprites per row in a sprite sheet. The default is 0, which indicates no maximum limit.",
      ).optional(),
      endTimeOffset: z.string().describe(
        "End time in seconds, relative to the output file timeline. When `end_time_offset` is not specified, the sprites are generated until the end of the output file.",
      ).optional(),
      filePrefix: z.string().describe(
        "Required. File name prefix for the generated sprite sheets. Each sprite sheet has an incremental 10-digit zero-padded suffix starting from 0 before the extension, such as `sprite_sheet0000000123.jpeg`.",
      ).optional(),
      format: z.string().describe(
        "Format type. The default is `jpeg`. Supported formats: - `jpeg`",
      ).optional(),
      interval: z.string().describe(
        "Starting from `0s`, create sprites at regular intervals. Specify the interval value in seconds.",
      ).optional(),
      quality: z.number().int().describe(
        "The quality of the generated sprite sheet. Enter a value between 1 and 100, where 1 is the lowest quality and 100 is the highest quality. The default is 100. A high quality value corresponds to a low image data compression ratio.",
      ).optional(),
      rowCount: z.number().int().describe(
        "The maximum number of rows per sprite sheet. When the sprite sheet is full, a new sprite sheet is created. The default is 0, which indicates no maximum limit.",
      ).optional(),
      spriteHeightPixels: z.number().int().describe(
        "Required. The height of sprite in pixels. Must be an even integer. To preserve the source aspect ratio, set the SpriteSheet.sprite_height_pixels field or the SpriteSheet.sprite_width_pixels field, but not both (the API will automatically calculate the missing field). For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
      ).optional(),
      spriteWidthPixels: z.number().int().describe(
        "Required. The width of sprite in pixels. Must be an even integer. To preserve the source aspect ratio, set the SpriteSheet.sprite_width_pixels field or the SpriteSheet.sprite_height_pixels field, but not both (the API will automatically calculate the missing field). For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
      ).optional(),
      startTimeOffset: z.string().describe(
        "Start time in seconds, relative to the output file timeline. Determines the first sprite to pick. The default is `0s`.",
      ).optional(),
      totalCount: z.number().int().describe(
        "Total number of sprites. Create the specified number of sprites distributed evenly across the timeline of the output media. The default is 100.",
      ).optional(),
    })).describe(
      "List of output sprite sheets. Spritesheets require at least one VideoStream in the Jobconfig.",
    ).optional(),
  }).describe("Job configuration").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels associated with this job template. You can use these to organize and group your job templates.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the job template. Format: `projects/{project_number}/locations/{location}/jobTemplates/{job_template}`",
  ).optional(),
  jobTemplateId: z.string().describe(
    "Required. The ID to use for the job template, which will become the final component of the job template's resource name. This value should be 4-63 characters, and valid characters must match the regular expression `a-zA-Z*`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  config: z.object({
    adBreaks: z.array(z.object({
      startTimeOffset: z.string(),
    })),
    editList: z.array(z.object({
      endTimeOffset: z.string(),
      inputs: z.array(z.string()),
      key: z.string(),
      startTimeOffset: z.string(),
    })),
    elementaryStreams: z.array(z.object({
      audioStream: z.object({
        bitrateBps: z.number(),
        channelCount: z.number(),
        channelLayout: z.array(z.unknown()),
        codec: z.string(),
        displayName: z.string(),
        languageCode: z.string(),
        mapping: z.array(z.unknown()),
        sampleRateHertz: z.number(),
      }),
      key: z.string(),
      textStream: z.object({
        codec: z.string(),
        displayName: z.string(),
        languageCode: z.string(),
        mapping: z.array(z.unknown()),
      }),
      videoStream: z.object({
        h264: z.object({
          allowOpenGop: z.unknown(),
          aqStrength: z.unknown(),
          bFrameCount: z.unknown(),
          bPyramid: z.unknown(),
          bitrateBps: z.unknown(),
          crfLevel: z.unknown(),
          enableTwoPass: z.unknown(),
          entropyCoder: z.unknown(),
          frameRate: z.unknown(),
          frameRateConversionStrategy: z.unknown(),
          gopDuration: z.unknown(),
          gopFrameCount: z.unknown(),
          heightPixels: z.unknown(),
          hlg: z.unknown(),
          pixelFormat: z.unknown(),
          preset: z.unknown(),
          profile: z.unknown(),
          rateControlMode: z.unknown(),
          sdr: z.unknown(),
          tune: z.unknown(),
          vbvFullnessBits: z.unknown(),
          vbvSizeBits: z.unknown(),
          widthPixels: z.unknown(),
        }),
        h265: z.object({
          allowOpenGop: z.unknown(),
          aqStrength: z.unknown(),
          bFrameCount: z.unknown(),
          bPyramid: z.unknown(),
          bitrateBps: z.unknown(),
          crfLevel: z.unknown(),
          enableTwoPass: z.unknown(),
          frameRate: z.unknown(),
          frameRateConversionStrategy: z.unknown(),
          gopDuration: z.unknown(),
          gopFrameCount: z.unknown(),
          hdr10: z.unknown(),
          heightPixels: z.unknown(),
          hlg: z.unknown(),
          pixelFormat: z.unknown(),
          preset: z.unknown(),
          profile: z.unknown(),
          rateControlMode: z.unknown(),
          sdr: z.unknown(),
          tune: z.unknown(),
          vbvFullnessBits: z.unknown(),
          vbvSizeBits: z.unknown(),
          widthPixels: z.unknown(),
        }),
        vp9: z.object({
          bitrateBps: z.unknown(),
          crfLevel: z.unknown(),
          frameRate: z.unknown(),
          frameRateConversionStrategy: z.unknown(),
          gopDuration: z.unknown(),
          gopFrameCount: z.unknown(),
          heightPixels: z.unknown(),
          hlg: z.unknown(),
          pixelFormat: z.unknown(),
          profile: z.unknown(),
          rateControlMode: z.unknown(),
          sdr: z.unknown(),
          widthPixels: z.unknown(),
        }),
      }),
    })),
    encryptions: z.array(z.object({
      aes128: z.object({}),
      drmSystems: z.object({
        clearkey: z.object({}),
        fairplay: z.object({}),
        playready: z.object({}),
        widevine: z.object({}),
      }),
      id: z.string(),
      mpegCenc: z.object({
        scheme: z.string(),
      }),
      sampleAes: z.object({}),
      secretManagerKeySource: z.object({
        secretVersion: z.string(),
      }),
    })),
    inputs: z.array(z.object({
      attributes: z.object({
        trackDefinitions: z.array(z.unknown()),
      }),
      key: z.string(),
      preprocessingConfig: z.object({
        audio: z.object({
          highBoost: z.unknown(),
          lowBoost: z.unknown(),
          lufs: z.unknown(),
        }),
        color: z.object({
          brightness: z.unknown(),
          contrast: z.unknown(),
          saturation: z.unknown(),
        }),
        crop: z.object({
          bottomPixels: z.unknown(),
          leftPixels: z.unknown(),
          rightPixels: z.unknown(),
          topPixels: z.unknown(),
        }),
        deblock: z.object({
          enabled: z.unknown(),
          strength: z.unknown(),
        }),
        deinterlace: z.object({
          bwdif: z.unknown(),
          yadif: z.unknown(),
        }),
        denoise: z.object({
          strength: z.unknown(),
          tune: z.unknown(),
        }),
        pad: z.object({
          bottomPixels: z.unknown(),
          leftPixels: z.unknown(),
          rightPixels: z.unknown(),
          topPixels: z.unknown(),
        }),
      }),
      uri: z.string(),
    })),
    manifests: z.array(z.object({
      dash: z.object({
        segmentReferenceScheme: z.string(),
      }),
      fileName: z.string(),
      muxStreams: z.array(z.string()),
      type: z.string(),
    })),
    muxStreams: z.array(z.object({
      container: z.string(),
      elementaryStreams: z.array(z.string()),
      encryptionId: z.string(),
      fileName: z.string(),
      fmp4: z.object({
        codecTag: z.string(),
      }),
      key: z.string(),
      segmentSettings: z.object({
        individualSegments: z.boolean(),
        segmentDuration: z.string(),
      }),
    })),
    output: z.object({
      uri: z.string(),
    }),
    overlays: z.array(z.object({
      animations: z.array(z.object({
        animationEnd: z.unknown(),
        animationFade: z.unknown(),
        animationStatic: z.unknown(),
      })),
      image: z.object({
        alpha: z.number(),
        resolution: z.object({
          x: z.unknown(),
          y: z.unknown(),
        }),
        uri: z.string(),
      }),
    })),
    pubsubDestination: z.object({
      topic: z.string(),
    }),
    spriteSheets: z.array(z.object({
      columnCount: z.number(),
      endTimeOffset: z.string(),
      filePrefix: z.string(),
      format: z.string(),
      interval: z.string(),
      quality: z.number(),
      rowCount: z.number(),
      spriteHeightPixels: z.number(),
      spriteWidthPixels: z.number(),
      startTimeOffset: z.string(),
      totalCount: z.number(),
    })),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  config: z.object({
    adBreaks: z.array(z.object({
      startTimeOffset: z.string().describe(
        "Start time in seconds for the ad break, relative to the output file timeline. The default is `0s`.",
      ).optional(),
    })).describe(
      "List of ad breaks. Specifies where to insert ad break tags in the output manifests.",
    ).optional(),
    editList: z.array(z.object({
      endTimeOffset: z.string().describe(
        "End time in seconds for the atom, relative to the input file timeline. When `end_time_offset` is not specified, the `inputs` are used until the end of the atom.",
      ).optional(),
      inputs: z.array(z.string()).describe(
        "List of Input.key values identifying files that should be used in this atom. The listed `inputs` must have the same timeline.",
      ).optional(),
      key: z.string().describe(
        "A unique key for this atom. Must be specified when using advanced mapping.",
      ).optional(),
      startTimeOffset: z.string().describe(
        "Start time in seconds for the atom, relative to the input file timeline. The default is `0s`.",
      ).optional(),
    })).describe(
      "List of edit atoms. Defines the ultimate timeline of the resulting file or manifest.",
    ).optional(),
    elementaryStreams: z.array(z.object({
      audioStream: z.object({
        bitrateBps: z.number().int().describe(
          "Required. Audio bitrate in bits per second. Must be between 1 and 10,000,000.",
        ).optional(),
        channelCount: z.number().int().describe(
          "Number of audio channels. Must be between 1 and 6. The default is 2.",
        ).optional(),
        channelLayout: z.array(z.unknown()).describe(
          'A list of channel names specifying layout of the audio channels. This only affects the metadata embedded in the container headers, if supported by the specified format. The default is `["fl", "fr"]`. Supported channel names: - `fl` - Front left channel - `fr` - Front right channel - `sl` - Side left channel - `sr` - Side right channel - `fc` - Front center channel - `lfe` - Low frequency',
        ).optional(),
        codec: z.string().describe(
          "The codec for this audio stream. The default is `aac`. Supported audio codecs: - `aac` - `aac-he` - `aac-he-v2` - `mp3` - `ac3` - `eac3` - `vorbis`",
        ).optional(),
        displayName: z.string().describe(
          "The name for this particular audio stream that will be added to the HLS/DASH manifest. Not supported in MP4 files.",
        ).optional(),
        languageCode: z.string().describe(
          "The BCP-47 language code, such as `en-US` or `sr-Latn`. For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier. Not supported in MP4 files.",
        ).optional(),
        mapping: z.array(z.unknown()).describe(
          "The mapping for the JobConfig.edit_list atoms with audio EditAtom.inputs.",
        ).optional(),
        sampleRateHertz: z.number().int().describe(
          "The audio sample rate in Hertz. The default is 48000 Hertz.",
        ).optional(),
      }).describe("Audio stream resource.").optional(),
      key: z.string().describe("A unique key for this elementary stream.")
        .optional(),
      textStream: z.object({
        codec: z.string().describe(
          "The codec for this text stream. The default is `webvtt`. Supported text codecs: - `srt` - `ttml` - `cea608` - `cea708` - `webvtt`",
        ).optional(),
        displayName: z.string().describe(
          "The name for this particular text stream that will be added to the HLS/DASH manifest. Not supported in MP4 files.",
        ).optional(),
        languageCode: z.string().describe(
          "The BCP-47 language code, such as `en-US` or `sr-Latn`. For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier. Not supported in MP4 files.",
        ).optional(),
        mapping: z.array(z.unknown()).describe(
          "The mapping for the JobConfig.edit_list atoms with text EditAtom.inputs.",
        ).optional(),
      }).describe(
        "Encoding of a text stream. For example, closed captions or subtitles.",
      ).optional(),
      videoStream: z.object({
        h264: z.object({
          allowOpenGop: z.unknown().describe(
            "Specifies whether an open Group of Pictures (GOP) structure should be allowed or not. The default is `false`.",
          ).optional(),
          aqStrength: z.unknown().describe(
            "Specify the intensity of the adaptive quantizer (AQ). Must be between 0 and 1, where 0 disables the quantizer and 1 maximizes the quantizer. A higher value equals a lower bitrate but smoother image. The default is 0.",
          ).optional(),
          bFrameCount: z.unknown().describe(
            "The number of consecutive B-frames. Must be greater than or equal to zero. Must be less than H264CodecSettings.gop_frame_count if set. The default is 0.",
          ).optional(),
          bPyramid: z.unknown().describe(
            "Allow B-pyramid for reference frame selection. This may not be supported on all decoders. The default is `false`.",
          ).optional(),
          bitrateBps: z.unknown().describe(
            "Required. The video bitrate in bits per second. The minimum value is 1,000. The maximum value is 800,000,000.",
          ).optional(),
          crfLevel: z.unknown().describe(
            "Target CRF level. Must be between 10 and 36, where 10 is the highest quality and 36 is the most efficient compression. The default is 21.",
          ).optional(),
          enableTwoPass: z.unknown().describe(
            "Use two-pass encoding strategy to achieve better video quality. H264CodecSettings.rate_control_mode must be `vbr`. The default is `false`.",
          ).optional(),
          entropyCoder: z.unknown().describe(
            "The entropy coder to use. The default is `cabac`. Supported entropy coders: - `cavlc` - `cabac`",
          ).optional(),
          frameRate: z.unknown().describe(
            "Required. The target video frame rate in frames per second (FPS). Must be less than or equal to 120.",
          ).optional(),
          frameRateConversionStrategy: z.unknown().describe(
            "Optional. Frame rate conversion strategy for desired frame rate. The default is `DOWNSAMPLE`.",
          ).optional(),
          gopDuration: z.unknown().describe(
            "Select the GOP size based on the specified duration. The default is `3s`. Note that `gopDuration` must be less than or equal to [`segmentDuration`](#SegmentSettings), and [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`.",
          ).optional(),
          gopFrameCount: z.unknown().describe(
            "Select the GOP size based on the specified frame count. Must be greater than zero.",
          ).optional(),
          heightPixels: z.unknown().describe(
            "The height of the video in pixels. Must be an even integer. When not specified, the height is adjusted to match the specified width and input aspect ratio. If both are omitted, the input height is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
          hlg: z.unknown().describe(
            "Convert the input video to a Hybrid Log Gamma (HLG) video.",
          ).optional(),
          pixelFormat: z.unknown().describe(
            "Pixel format to use. The default is `yuv420p`. Supported pixel formats: - `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format - `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format - `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format - `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format",
          ).optional(),
          preset: z.unknown().describe(
            "Enforces the specified codec preset. The default is `veryfast`. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Preset). Note that certain values for this field may cause the transcoder to override other fields you set in the `H264CodecSettings` message.",
          ).optional(),
          profile: z.unknown().describe(
            "Enforces the specified codec profile. The following profiles are supported: * `baseline` * `main` * `high` (default) The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Tune). Note that certain values for this field may cause the transcoder to override other fields you set in the `H264CodecSettings` message.",
          ).optional(),
          rateControlMode: z.unknown().describe(
            "Specify the mode. The default is `vbr`. Supported rate control modes: - `vbr` - variable bitrate - `crf` - constant rate factor",
          ).optional(),
          sdr: z.unknown().describe(
            "Convert the input video to a Standard Dynamic Range (SDR) video.",
          ).optional(),
          tune: z.unknown().describe(
            "Enforces the specified codec tune. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Tune). Note that certain values for this field may cause the transcoder to override other fields you set in the `H264CodecSettings` message.",
          ).optional(),
          vbvFullnessBits: z.unknown().describe(
            "Initial fullness of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to 90% of H264CodecSettings.vbv_size_bits.",
          ).optional(),
          vbvSizeBits: z.unknown().describe(
            "Size of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to H264CodecSettings.bitrate_bps.",
          ).optional(),
          widthPixels: z.unknown().describe(
            "The width of the video in pixels. Must be an even integer. When not specified, the width is adjusted to match the specified height and input aspect ratio. If both are omitted, the input width is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
        }).describe("H264 codec settings.").optional(),
        h265: z.object({
          allowOpenGop: z.unknown().describe(
            "Specifies whether an open Group of Pictures (GOP) structure should be allowed or not. The default is `false`.",
          ).optional(),
          aqStrength: z.unknown().describe(
            "Specify the intensity of the adaptive quantizer (AQ). Must be between 0 and 1, where 0 disables the quantizer and 1 maximizes the quantizer. A higher value equals a lower bitrate but smoother image. The default is 0.",
          ).optional(),
          bFrameCount: z.unknown().describe(
            "The number of consecutive B-frames. Must be greater than or equal to zero. Must be less than H265CodecSettings.gop_frame_count if set. The default is 0.",
          ).optional(),
          bPyramid: z.unknown().describe(
            "Allow B-pyramid for reference frame selection. This may not be supported on all decoders. The default is `false`.",
          ).optional(),
          bitrateBps: z.unknown().describe(
            "Required. The video bitrate in bits per second. The minimum value is 1,000. The maximum value is 800,000,000.",
          ).optional(),
          crfLevel: z.unknown().describe(
            "Target CRF level. Must be between 10 and 36, where 10 is the highest quality and 36 is the most efficient compression. The default is 21.",
          ).optional(),
          enableTwoPass: z.unknown().describe(
            "Use two-pass encoding strategy to achieve better video quality. H265CodecSettings.rate_control_mode must be `vbr`. The default is `false`.",
          ).optional(),
          frameRate: z.unknown().describe(
            "Required. The target video frame rate in frames per second (FPS). Must be less than or equal to 120.",
          ).optional(),
          frameRateConversionStrategy: z.unknown().describe(
            "Optional. Frame rate conversion strategy for desired frame rate. The default is `DOWNSAMPLE`.",
          ).optional(),
          gopDuration: z.unknown().describe(
            "Select the GOP size based on the specified duration. The default is `3s`. Note that `gopDuration` must be less than or equal to [`segmentDuration`](#SegmentSettings), and [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`.",
          ).optional(),
          gopFrameCount: z.unknown().describe(
            "Select the GOP size based on the specified frame count. Must be greater than zero.",
          ).optional(),
          hdr10: z.unknown().describe(
            "Convert the input video to a High Dynamic Range 10 (HDR10) video.",
          ).optional(),
          heightPixels: z.unknown().describe(
            "The height of the video in pixels. Must be an even integer. When not specified, the height is adjusted to match the specified width and input aspect ratio. If both are omitted, the input height is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
          hlg: z.unknown().describe(
            "Convert the input video to a Hybrid Log Gamma (HLG) video.",
          ).optional(),
          pixelFormat: z.unknown().describe(
            "Pixel format to use. The default is `yuv420p`. Supported pixel formats: - `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format - `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format - `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format - `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format",
          ).optional(),
          preset: z.unknown().describe(
            "Enforces the specified codec preset. The default is `veryfast`. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.265). Note that certain values for this field may cause the transcoder to override other fields you set in the `H265CodecSettings` message.",
          ).optional(),
          profile: z.unknown().describe(
            "Enforces the specified codec profile. The following profiles are supported: * 8-bit profiles * `main` (default) * `main-intra` * `mainstillpicture` * 10-bit profiles * `main10` (default) * `main10-intra` * `main422-10` * `main422-10-intra` * `main444-10` * `main444-10-intra` * 12-bit profiles * `main12` (default) * `main12-intra` * `main422-12` * `main422-12-intra` * `main444-12` * `main444-12-intra` The available options are [FFmpeg-compatible](https://x265.readthedocs.io/). Note that certain values for this field may cause the transcoder to override other fields you set in the `H265CodecSettings` message.",
          ).optional(),
          rateControlMode: z.unknown().describe(
            "Specify the mode. The default is `vbr`. Supported rate control modes: - `vbr` - variable bitrate - `crf` - constant rate factor",
          ).optional(),
          sdr: z.unknown().describe(
            "Convert the input video to a Standard Dynamic Range (SDR) video.",
          ).optional(),
          tune: z.unknown().describe(
            "Enforces the specified codec tune. The available options are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.265). Note that certain values for this field may cause the transcoder to override other fields you set in the `H265CodecSettings` message.",
          ).optional(),
          vbvFullnessBits: z.unknown().describe(
            "Initial fullness of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to 90% of H265CodecSettings.vbv_size_bits.",
          ).optional(),
          vbvSizeBits: z.unknown().describe(
            "Size of the Video Buffering Verifier (VBV) buffer in bits. Must be greater than zero. The default is equal to `VideoStream.bitrate_bps`.",
          ).optional(),
          widthPixels: z.unknown().describe(
            "The width of the video in pixels. Must be an even integer. When not specified, the width is adjusted to match the specified height and input aspect ratio. If both are omitted, the input width is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
        }).describe("H265 codec settings.").optional(),
        vp9: z.object({
          bitrateBps: z.unknown().describe(
            "Required. The video bitrate in bits per second. The minimum value is 1,000. The maximum value is 480,000,000.",
          ).optional(),
          crfLevel: z.unknown().describe(
            "Target CRF level. Must be between 10 and 36, where 10 is the highest quality and 36 is the most efficient compression. The default is 21. **Note:** This field is not supported.",
          ).optional(),
          frameRate: z.unknown().describe(
            "Required. The target video frame rate in frames per second (FPS). Must be less than or equal to 120.",
          ).optional(),
          frameRateConversionStrategy: z.unknown().describe(
            "Optional. Frame rate conversion strategy for desired frame rate. The default is `DOWNSAMPLE`.",
          ).optional(),
          gopDuration: z.unknown().describe(
            "Select the GOP size based on the specified duration. The default is `3s`. Note that `gopDuration` must be less than or equal to [`segmentDuration`](#SegmentSettings), and [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`.",
          ).optional(),
          gopFrameCount: z.unknown().describe(
            "Select the GOP size based on the specified frame count. Must be greater than zero.",
          ).optional(),
          heightPixels: z.unknown().describe(
            "The height of the video in pixels. Must be an even integer. When not specified, the height is adjusted to match the specified width and input aspect ratio. If both are omitted, the input height is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
          hlg: z.unknown().describe(
            "Convert the input video to a Hybrid Log Gamma (HLG) video.",
          ).optional(),
          pixelFormat: z.unknown().describe(
            "Pixel format to use. The default is `yuv420p`. Supported pixel formats: - `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format - `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format - `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format - `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format",
          ).optional(),
          profile: z.unknown().describe(
            "Enforces the specified codec profile. The following profiles are supported: * `profile0` (default) * `profile1` * `profile2` * `profile3` The available options are [WebM-compatible](https://www.webmproject.org/vp9/profiles/). Note that certain values for this field may cause the transcoder to override other fields you set in the `Vp9CodecSettings` message.",
          ).optional(),
          rateControlMode: z.unknown().describe(
            "Specify the mode. The default is `vbr`. Supported rate control modes: - `vbr` - variable bitrate",
          ).optional(),
          sdr: z.unknown().describe(
            "Convert the input video to a Standard Dynamic Range (SDR) video.",
          ).optional(),
          widthPixels: z.unknown().describe(
            "The width of the video in pixels. Must be an even integer. When not specified, the width is adjusted to match the specified height and input aspect ratio. If both are omitted, the input width is used. For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
          ).optional(),
        }).describe("VP9 codec settings.").optional(),
      }).describe("Video stream resource.").optional(),
    })).describe("List of elementary streams.").optional(),
    encryptions: z.array(z.object({
      aes128: z.object({}).describe("Configuration for AES-128 encryption.")
        .optional(),
      drmSystems: z.object({
        clearkey: z.object({}).describe("Clearkey configuration.").optional(),
        fairplay: z.object({}).describe("Fairplay configuration.").optional(),
        playready: z.object({}).describe("Playready configuration.").optional(),
        widevine: z.object({}).describe("Widevine configuration.").optional(),
      }).describe("Defines configuration for DRM systems in use.").optional(),
      id: z.string().describe(
        "Required. Identifier for this set of encryption options.",
      ).optional(),
      mpegCenc: z.object({
        scheme: z.string().describe(
          "Required. Specify the encryption scheme. Supported encryption schemes: - `cenc` - `cbcs`",
        ).optional(),
      }).describe("Configuration for MPEG Common Encryption (MPEG-CENC).")
        .optional(),
      sampleAes: z.object({}).describe(
        "Configuration for SAMPLE-AES encryption.",
      ).optional(),
      secretManagerKeySource: z.object({
        secretVersion: z.string().describe(
          'Required. The name of the Secret Version containing the encryption key in the following format: `projects/{project}/secrets/{secret_id}/versions/{version_number}` Note that only numbered versions are supported. Aliases like "latest" are not supported.',
        ).optional(),
      }).describe("Configuration for secrets stored in Google Secret Manager.")
        .optional(),
    })).describe(
      "List of encryption configurations for the content. Each configuration has an ID. Specify this ID in the MuxStream.encryption_id field to indicate the configuration to use for that `MuxStream` output.",
    ).optional(),
    inputs: z.array(z.object({
      attributes: z.object({
        trackDefinitions: z.array(z.unknown()).describe(
          "Optional. A list of track definitions for the input asset.",
        ).optional(),
      }).describe(
        "Input attributes that provide additional information about the input asset.",
      ).optional(),
      key: z.string().describe(
        "A unique key for this input. Must be specified when using advanced mapping and edit lists.",
      ).optional(),
      preprocessingConfig: z.object({
        audio: z.object({
          highBoost: z.unknown().describe(
            "Enable boosting high frequency components. The default is `false`. **Note:** This field is not supported.",
          ).optional(),
          lowBoost: z.unknown().describe(
            "Enable boosting low frequency components. The default is `false`. **Note:** This field is not supported.",
          ).optional(),
          lufs: z.unknown().describe(
            "Specify audio loudness normalization in loudness units relative to full scale (LUFS). Enter a value between -24 and 0 (the default), where: * -24 is the Advanced Television Systems Committee (ATSC A/85) standard * -23 is the EU R128 broadcast standard * -19 is the prior standard for online mono audio * -18 is the ReplayGain standard * -16 is the prior standard for stereo audio * -14 is the new online audio standard recommended by Spotify, as well as Amazon Echo * 0 disables normalization",
          ).optional(),
        }).describe("Audio preprocessing configuration.").optional(),
        color: z.object({
          brightness: z.unknown().describe(
            "Control brightness of the video. Enter a value between -1 and 1, where -1 is minimum brightness and 1 is maximum brightness. 0 is no change. The default is 0.",
          ).optional(),
          contrast: z.unknown().describe(
            "Control black and white contrast of the video. Enter a value between -1 and 1, where -1 is minimum contrast and 1 is maximum contrast. 0 is no change. The default is 0.",
          ).optional(),
          saturation: z.unknown().describe(
            "Control color saturation of the video. Enter a value between -1 and 1, where -1 is fully desaturated and 1 is maximum saturation. 0 is no change. The default is 0.",
          ).optional(),
        }).describe(
          "Color preprocessing configuration. **Note:** This configuration is not supported.",
        ).optional(),
        crop: z.object({
          bottomPixels: z.unknown().describe(
            "The number of pixels to crop from the bottom. The default is 0.",
          ).optional(),
          leftPixels: z.unknown().describe(
            "The number of pixels to crop from the left. The default is 0.",
          ).optional(),
          rightPixels: z.unknown().describe(
            "The number of pixels to crop from the right. The default is 0.",
          ).optional(),
          topPixels: z.unknown().describe(
            "The number of pixels to crop from the top. The default is 0.",
          ).optional(),
        }).describe(
          "Video cropping configuration for the input video. The cropped input video is scaled to match the output resolution.",
        ).optional(),
        deblock: z.object({
          enabled: z.unknown().describe(
            "Enable deblocker. The default is `false`.",
          ).optional(),
          strength: z.unknown().describe(
            "Set strength of the deblocker. Enter a value between 0 and 1. The higher the value, the stronger the block removal. 0 is no deblocking. The default is 0.",
          ).optional(),
        }).describe(
          "Deblock preprocessing configuration. **Note:** This configuration is not supported.",
        ).optional(),
        deinterlace: z.object({
          bwdif: z.unknown().describe(
            "Bob Weaver Deinterlacing Filter Configuration.",
          ).optional(),
          yadif: z.unknown().describe(
            "Yet Another Deinterlacing Filter Configuration.",
          ).optional(),
        }).describe("Deinterlace configuration for input video.").optional(),
        denoise: z.object({
          strength: z.unknown().describe(
            "Set strength of the denoise. Enter a value between 0 and 1. The higher the value, the smoother the image. 0 is no denoising. The default is 0.",
          ).optional(),
          tune: z.unknown().describe(
            "Set the denoiser mode. The default is `standard`. Supported denoiser modes: - `standard` - `grain`",
          ).optional(),
        }).describe(
          "Denoise preprocessing configuration. **Note:** This configuration is not supported.",
        ).optional(),
        pad: z.object({
          bottomPixels: z.unknown().describe(
            "The number of pixels to add to the bottom. The default is 0.",
          ).optional(),
          leftPixels: z.unknown().describe(
            "The number of pixels to add to the left. The default is 0.",
          ).optional(),
          rightPixels: z.unknown().describe(
            "The number of pixels to add to the right. The default is 0.",
          ).optional(),
          topPixels: z.unknown().describe(
            "The number of pixels to add to the top. The default is 0.",
          ).optional(),
        }).describe(
          "Pad filter configuration for the input video. The padded input video is scaled after padding with black to match the output resolution.",
        ).optional(),
      }).describe("Preprocessing configurations.").optional(),
      uri: z.string().describe(
        "URI of the media. Input files must be at least 5 seconds in duration and stored in Cloud Storage (for example, `gs://bucket/inputs/file.mp4`). If empty, the value is populated from Job.input_uri. See [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats).",
      ).optional(),
    })).describe("List of input assets stored in Cloud Storage.").optional(),
    manifests: z.array(z.object({
      dash: z.object({
        segmentReferenceScheme: z.enum([
          "SEGMENT_REFERENCE_SCHEME_UNSPECIFIED",
          "SEGMENT_LIST",
          "SEGMENT_TEMPLATE_NUMBER",
        ]).describe(
          "The segment reference scheme for a `DASH` manifest. The default is `SEGMENT_LIST`.",
        ).optional(),
      }).describe("`DASH` manifest configuration.").optional(),
      fileName: z.string().describe(
        "The name of the generated file. The default is `manifest` with the extension suffix corresponding to the Manifest.type.",
      ).optional(),
      muxStreams: z.array(z.string()).describe(
        "Required. List of user supplied MuxStream.key values that should appear in this manifest. When Manifest.type is `HLS`, a media manifest with name MuxStream.key and `.m3u8` extension is generated for each element in this list.",
      ).optional(),
      type: z.enum(["MANIFEST_TYPE_UNSPECIFIED", "HLS", "DASH"]).describe(
        "Required. Type of the manifest.",
      ).optional(),
    })).describe("List of output manifests.").optional(),
    muxStreams: z.array(z.object({
      container: z.string().describe(
        "The container format. The default is `mp4` Supported streaming formats: - `ts` - `fmp4`- the corresponding file extension is `.m4s` Supported standalone file formats: - `mp4` - `mp3` - `ogg` - `vtt` See also: [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats)",
      ).optional(),
      elementaryStreams: z.array(z.string()).describe(
        "List of ElementaryStream.key values multiplexed in this stream.",
      ).optional(),
      encryptionId: z.string().describe(
        "Identifier of the encryption configuration to use. If omitted, output will be unencrypted.",
      ).optional(),
      fileName: z.string().describe(
        "The name of the generated file. The default is MuxStream.key with the extension suffix corresponding to the MuxStream.container. Individual segments also have an incremental 10-digit zero-padded suffix starting from 0 before the extension, such as `mux_stream0000000123.ts`.",
      ).optional(),
      fmp4: z.object({
        codecTag: z.string().describe(
          "Optional. Specify the codec tag string that will be used in the media bitstream. When not specified, the codec appropriate value is used. Supported H265 codec tags: - `hvc1` (default) - `hev1`",
        ).optional(),
      }).describe("`fmp4` container configuration.").optional(),
      key: z.string().describe("A unique key for this multiplexed stream.")
        .optional(),
      segmentSettings: z.object({
        individualSegments: z.boolean().describe(
          "Required. Create an individual segment file. The default is `false`.",
        ).optional(),
        segmentDuration: z.string().describe(
          "Duration of the segments in seconds. The default is `6.0s`. Note that `segmentDuration` must be greater than or equal to [`gopDuration`](#videostream), and `segmentDuration` must be divisible by [`gopDuration`](#videostream).",
        ).optional(),
      }).describe("Segment settings for `ts`, `fmp4` and `vtt`.").optional(),
    })).describe("List of multiplexing settings for output streams.")
      .optional(),
    output: z.object({
      uri: z.string().describe(
        "URI for the output file(s). For example, `gs://my-bucket/outputs/`. Must be a directory and not a top-level bucket. If empty, the value is populated from Job.output_uri. See [Supported input and output formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats).",
      ).optional(),
    }).describe("Location of output file(s) in a Cloud Storage bucket.")
      .optional(),
    overlays: z.array(z.object({
      animations: z.array(z.object({
        animationEnd: z.unknown().describe(
          "End previous overlay animation from the video. Without `AnimationEnd`, the overlay object will keep the state of previous animation until the end of the video.",
        ).optional(),
        animationFade: z.unknown().describe(
          "Display overlay object with fade animation.",
        ).optional(),
        animationStatic: z.unknown().describe("Display static overlay object.")
          .optional(),
      })).describe(
        "List of animations. The list should be chronological, without any time overlap.",
      ).optional(),
      image: z.object({
        alpha: z.number().describe(
          "Target image opacity. Valid values are from `1.0` (solid, default) to `0.0` (transparent), exclusive. Set this to a value greater than `0.0`.",
        ).optional(),
        resolution: z.object({
          x: z.unknown().describe("Normalized x coordinate.").optional(),
          y: z.unknown().describe("Normalized y coordinate.").optional(),
        }).describe("2D normalized coordinates. Default: `{0.0, 0.0}`")
          .optional(),
        uri: z.string().describe(
          "Required. URI of the image in Cloud Storage. For example, `gs://bucket/inputs/image.png`. Only PNG and JPEG images are supported.",
        ).optional(),
      }).describe("Overlaid image.").optional(),
    })).describe("List of overlays on the output video, in descending Z-order.")
      .optional(),
    pubsubDestination: z.object({
      topic: z.string().describe(
        "The name of the Pub/Sub topic to publish job completion notification to. For example: `projects/{project}/topics/{topic}`.",
      ).optional(),
    }).describe("A Pub/Sub destination.").optional(),
    spriteSheets: z.array(z.object({
      columnCount: z.number().int().describe(
        "The maximum number of sprites per row in a sprite sheet. The default is 0, which indicates no maximum limit.",
      ).optional(),
      endTimeOffset: z.string().describe(
        "End time in seconds, relative to the output file timeline. When `end_time_offset` is not specified, the sprites are generated until the end of the output file.",
      ).optional(),
      filePrefix: z.string().describe(
        "Required. File name prefix for the generated sprite sheets. Each sprite sheet has an incremental 10-digit zero-padded suffix starting from 0 before the extension, such as `sprite_sheet0000000123.jpeg`.",
      ).optional(),
      format: z.string().describe(
        "Format type. The default is `jpeg`. Supported formats: - `jpeg`",
      ).optional(),
      interval: z.string().describe(
        "Starting from `0s`, create sprites at regular intervals. Specify the interval value in seconds.",
      ).optional(),
      quality: z.number().int().describe(
        "The quality of the generated sprite sheet. Enter a value between 1 and 100, where 1 is the lowest quality and 100 is the highest quality. The default is 100. A high quality value corresponds to a low image data compression ratio.",
      ).optional(),
      rowCount: z.number().int().describe(
        "The maximum number of rows per sprite sheet. When the sprite sheet is full, a new sprite sheet is created. The default is 0, which indicates no maximum limit.",
      ).optional(),
      spriteHeightPixels: z.number().int().describe(
        "Required. The height of sprite in pixels. Must be an even integer. To preserve the source aspect ratio, set the SpriteSheet.sprite_height_pixels field or the SpriteSheet.sprite_width_pixels field, but not both (the API will automatically calculate the missing field). For portrait videos that contain horizontal ASR and rotation metadata, provide the height, in pixels, per the horizontal ASR. The API calculates the width per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
      ).optional(),
      spriteWidthPixels: z.number().int().describe(
        "Required. The width of sprite in pixels. Must be an even integer. To preserve the source aspect ratio, set the SpriteSheet.sprite_width_pixels field or the SpriteSheet.sprite_height_pixels field, but not both (the API will automatically calculate the missing field). For portrait videos that contain horizontal ASR and rotation metadata, provide the width, in pixels, per the horizontal ASR. The API calculates the height per the horizontal ASR. The API detects any rotation metadata and swaps the requested height and width for the output.",
      ).optional(),
      startTimeOffset: z.string().describe(
        "Start time in seconds, relative to the output file timeline. Determines the first sprite to pick. The default is `0s`.",
      ).optional(),
      totalCount: z.number().int().describe(
        "Total number of sprites. Create the specified number of sprites distributed evenly across the timeline of the output media. The default is 100.",
      ).optional(),
    })).describe(
      "List of output sprite sheets. Spritesheets require at least one VideoStream in the Jobconfig.",
    ).optional(),
  }).describe("Job configuration").optional(),
  labels: z.record(z.string(), z.string()).describe(
    "The labels associated with this job template. You can use these to organize and group your job templates.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the job template. Format: `projects/{project_number}/locations/{location}/jobTemplates/{job_template}`",
  ).optional(),
  jobTemplateId: z.string().describe(
    "Required. The ID to use for the job template, which will become the final component of the job template's resource name. This value should be 4-63 characters, and valid characters must match the regular expression `a-zA-Z*`.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Transcoder JobTemplates. Registered at `@swamp/gcp/transcoder/jobtemplates`. */
export const model = {
  type: "@swamp/gcp/transcoder/jobtemplates",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
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
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
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
      description: "Transcoding job template resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a jobTemplates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["jobTemplateId"] !== undefined) {
          body["jobTemplateId"] = g["jobTemplateId"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a jobTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
    delete: {
      description: "Delete the jobTemplates",
      arguments: z.object({
        identifier: z.string().describe("The name of the jobTemplates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Sync jobTemplates state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
      description: "List jobTemplates resources",
      arguments: z.object({
        filter: z.string().describe(
          "The filter expression, following the syntax outlined in https://google.aip.dev/160.",
        ).optional(),
        orderBy: z.string().describe(
          "One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering.",
        ).optional(),
        pageSize: z.number().describe("The maximum number of items to return.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "jobTemplates",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
  },
};
