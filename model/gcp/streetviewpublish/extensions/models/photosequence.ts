// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/streetviewpublish/photosequence
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Street View Publish PhotoSequence.
 *
 * This resource represents a long-running operation that is the result of a network API call.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://streetviewpublish.googleapis.com/";

const GET_CONFIG = {
  "id": "streetviewpublish.photoSequence.get",
  "path": "v1/photoSequence/{sequenceId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "sequenceId",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "sequenceId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "streetviewpublish.photoSequence.create",
  "path": "v1/photoSequence",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "inputType": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "streetviewpublish.photoSequence.delete",
  "path": "v1/photoSequence/{sequenceId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "sequenceId",
  ],
  "parameters": {
    "sequenceId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/streetviewpublish",
];

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  captureTimeOverride: z.string().describe(
    "Optional. Absolute time when the photo sequence starts to be captured. If the photo sequence is a video, this is the start time of the video. If this field is populated in input, it overrides the capture time in the video or XDM file.",
  ).optional(),
  gpsSource: z.enum(["PHOTO_SEQUENCE", "CAMERA_MOTION_METADATA_TRACK"])
    .describe(
      "Input only. If both raw_gps_timeline and the Camera Motion Metadata Track (CAMM) contain GPS measurements, indicate which takes precedence.",
    ).optional(),
  imu: z.object({
    accelMpsps: z.array(z.object({
      captureTime: z.string().describe("The timestamp of the IMU measurement.")
        .optional(),
      x: z.number().describe("The sensor measurement in the x axis.")
        .optional(),
      y: z.number().describe("The sensor measurement in the y axis.")
        .optional(),
      z: z.number().describe("The sensor measurement in the z axis.")
        .optional(),
    })).describe(
      "The accelerometer measurements in meters/sec^2 with increasing timestamps from devices.",
    ).optional(),
    gyroRps: z.array(z.object({
      captureTime: z.string().describe("The timestamp of the IMU measurement.")
        .optional(),
      x: z.number().describe("The sensor measurement in the x axis.")
        .optional(),
      y: z.number().describe("The sensor measurement in the y axis.")
        .optional(),
      z: z.number().describe("The sensor measurement in the z axis.")
        .optional(),
    })).describe(
      "The gyroscope measurements in radians/sec with increasing timestamps from devices.",
    ).optional(),
    magUt: z.array(z.object({
      captureTime: z.string().describe("The timestamp of the IMU measurement.")
        .optional(),
      x: z.number().describe("The sensor measurement in the x axis.")
        .optional(),
      y: z.number().describe("The sensor measurement in the y axis.")
        .optional(),
      z: z.number().describe("The sensor measurement in the z axis.")
        .optional(),
    })).describe(
      "The magnetometer measurements of the magnetic field in microtesla (uT) with increasing timestamps from devices.",
    ).optional(),
  }).describe(
    "Input only. Three axis IMU data for the collection. If this data is too large to put in the request, then it should be put in the CAMM track for the video. This data always takes precedence over the equivalent CAMM data, if it exists.",
  ).optional(),
  rawGpsTimeline: z.array(z.object({
    accuracyMeters: z.number().describe(
      "The estimated horizontal accuracy of this pose in meters with 68% confidence (one standard deviation). For example, on Android, this value is available from this method: https://developer.android.com/reference/android/location/Location#getAccuracy(). Other platforms have different methods of obtaining similar accuracy estimations.",
    ).optional(),
    altitude: z.number().describe(
      "Altitude of the pose in meters above WGS84 ellipsoid. NaN indicates an unmeasured quantity.",
    ).optional(),
    gpsRecordTimestampUnixEpoch: z.string().describe(
      "Time of the GPS record since UTC epoch.",
    ).optional(),
    heading: z.number().describe(
      "The following pose parameters pertain to the center of the photo. They match https://developers.google.com/streetview/spherical-metadata. Compass heading, measured at the center of the photo in degrees clockwise from North. Value must be >=0 and <360. NaN indicates an unmeasured quantity.",
    ).optional(),
    latLngPair: z.object({
      latitude: z.number().describe(
        "The latitude in degrees. It must be in the range [-90.0, +90.0].",
      ).optional(),
      longitude: z.number().describe(
        "The longitude in degrees. It must be in the range [-180.0, +180.0].",
      ).optional(),
    }).describe(
      "Latitude and longitude pair of the pose, as explained here: https://cloud.google.com/datastore/docs/reference/rest/Shared.Types/LatLng When creating a Photo, if the latitude and longitude pair are not provided, the geolocation from the exif header is used. A latitude and longitude pair not provided in the photo or exif header causes the photo process to fail.",
    ).optional(),
    level: z.object({
      name: z.string().describe(
        "Required. A name assigned to this Level, restricted to 3 characters. Consider how the elevator buttons would be labeled for this level if there was an elevator.",
      ).optional(),
      number: z.number().describe(
        "Optional. Floor number, used for ordering. 0 indicates the ground level, 1 indicates the first level above ground level, -1 indicates the first level under ground level. Non-integer values are OK.",
      ).optional(),
    }).describe(
      "Level (the floor in a building) used to configure vertical navigation.",
    ).optional(),
    pitch: z.number().describe(
      "Pitch, measured at the center of the photo in degrees. Value must be >=-90 and <= 90. A value of -90 means looking directly down, and a value of 90 means looking directly up. NaN indicates an unmeasured quantity.",
    ).optional(),
    roll: z.number().describe(
      "Roll, measured in degrees. Value must be >= 0 and <360. A value of 0 means level with the horizon. NaN indicates an unmeasured quantity.",
    ).optional(),
  })).describe(
    "Input only. Raw GPS measurements with increasing timestamps from the device that aren't time synced with each photo. These raw measurements will be used to infer the pose of each frame. Required in input when InputType is VIDEO and raw GPS measurements are not in Camera Motion Metadata Track (CAMM). User can indicate which takes precedence using gps_source if raw GPS measurements are provided in both raw_gps_timeline and Camera Motion Metadata Track (CAMM).",
  ).optional(),
  uploadReference: z.object({
    uploadUrl: z.string().describe(
      'An upload reference should be unique for each user. It follows the form: "https://streetviewpublish.googleapis.com/media/user/{account_id}/photo/{upload_reference}"',
    ).optional(),
  }).describe(
    "Input only. Required when creating photo sequence. The resource name where the bytes of the photo sequence (in the form of video) are uploaded.",
  ).optional(),
  inputType: z.string().describe("Required. The input form of PhotoSequence.")
    .optional(),
});

const StateSchema = z.object({
  done: z.boolean().optional(),
  error: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  response: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  captureTimeOverride: z.string().describe(
    "Optional. Absolute time when the photo sequence starts to be captured. If the photo sequence is a video, this is the start time of the video. If this field is populated in input, it overrides the capture time in the video or XDM file.",
  ).optional(),
  gpsSource: z.enum(["PHOTO_SEQUENCE", "CAMERA_MOTION_METADATA_TRACK"])
    .describe(
      "Input only. If both raw_gps_timeline and the Camera Motion Metadata Track (CAMM) contain GPS measurements, indicate which takes precedence.",
    ).optional(),
  imu: z.object({
    accelMpsps: z.array(z.object({
      captureTime: z.string().describe("The timestamp of the IMU measurement.")
        .optional(),
      x: z.number().describe("The sensor measurement in the x axis.")
        .optional(),
      y: z.number().describe("The sensor measurement in the y axis.")
        .optional(),
      z: z.number().describe("The sensor measurement in the z axis.")
        .optional(),
    })).describe(
      "The accelerometer measurements in meters/sec^2 with increasing timestamps from devices.",
    ).optional(),
    gyroRps: z.array(z.object({
      captureTime: z.string().describe("The timestamp of the IMU measurement.")
        .optional(),
      x: z.number().describe("The sensor measurement in the x axis.")
        .optional(),
      y: z.number().describe("The sensor measurement in the y axis.")
        .optional(),
      z: z.number().describe("The sensor measurement in the z axis.")
        .optional(),
    })).describe(
      "The gyroscope measurements in radians/sec with increasing timestamps from devices.",
    ).optional(),
    magUt: z.array(z.object({
      captureTime: z.string().describe("The timestamp of the IMU measurement.")
        .optional(),
      x: z.number().describe("The sensor measurement in the x axis.")
        .optional(),
      y: z.number().describe("The sensor measurement in the y axis.")
        .optional(),
      z: z.number().describe("The sensor measurement in the z axis.")
        .optional(),
    })).describe(
      "The magnetometer measurements of the magnetic field in microtesla (uT) with increasing timestamps from devices.",
    ).optional(),
  }).describe(
    "Input only. Three axis IMU data for the collection. If this data is too large to put in the request, then it should be put in the CAMM track for the video. This data always takes precedence over the equivalent CAMM data, if it exists.",
  ).optional(),
  rawGpsTimeline: z.array(z.object({
    accuracyMeters: z.number().describe(
      "The estimated horizontal accuracy of this pose in meters with 68% confidence (one standard deviation). For example, on Android, this value is available from this method: https://developer.android.com/reference/android/location/Location#getAccuracy(). Other platforms have different methods of obtaining similar accuracy estimations.",
    ).optional(),
    altitude: z.number().describe(
      "Altitude of the pose in meters above WGS84 ellipsoid. NaN indicates an unmeasured quantity.",
    ).optional(),
    gpsRecordTimestampUnixEpoch: z.string().describe(
      "Time of the GPS record since UTC epoch.",
    ).optional(),
    heading: z.number().describe(
      "The following pose parameters pertain to the center of the photo. They match https://developers.google.com/streetview/spherical-metadata. Compass heading, measured at the center of the photo in degrees clockwise from North. Value must be >=0 and <360. NaN indicates an unmeasured quantity.",
    ).optional(),
    latLngPair: z.object({
      latitude: z.number().describe(
        "The latitude in degrees. It must be in the range [-90.0, +90.0].",
      ).optional(),
      longitude: z.number().describe(
        "The longitude in degrees. It must be in the range [-180.0, +180.0].",
      ).optional(),
    }).describe(
      "Latitude and longitude pair of the pose, as explained here: https://cloud.google.com/datastore/docs/reference/rest/Shared.Types/LatLng When creating a Photo, if the latitude and longitude pair are not provided, the geolocation from the exif header is used. A latitude and longitude pair not provided in the photo or exif header causes the photo process to fail.",
    ).optional(),
    level: z.object({
      name: z.string().describe(
        "Required. A name assigned to this Level, restricted to 3 characters. Consider how the elevator buttons would be labeled for this level if there was an elevator.",
      ).optional(),
      number: z.number().describe(
        "Optional. Floor number, used for ordering. 0 indicates the ground level, 1 indicates the first level above ground level, -1 indicates the first level under ground level. Non-integer values are OK.",
      ).optional(),
    }).describe(
      "Level (the floor in a building) used to configure vertical navigation.",
    ).optional(),
    pitch: z.number().describe(
      "Pitch, measured at the center of the photo in degrees. Value must be >=-90 and <= 90. A value of -90 means looking directly down, and a value of 90 means looking directly up. NaN indicates an unmeasured quantity.",
    ).optional(),
    roll: z.number().describe(
      "Roll, measured in degrees. Value must be >= 0 and <360. A value of 0 means level with the horizon. NaN indicates an unmeasured quantity.",
    ).optional(),
  })).describe(
    "Input only. Raw GPS measurements with increasing timestamps from the device that aren't time synced with each photo. These raw measurements will be used to infer the pose of each frame. Required in input when InputType is VIDEO and raw GPS measurements are not in Camera Motion Metadata Track (CAMM). User can indicate which takes precedence using gps_source if raw GPS measurements are provided in both raw_gps_timeline and Camera Motion Metadata Track (CAMM).",
  ).optional(),
  uploadReference: z.object({
    uploadUrl: z.string().describe(
      'An upload reference should be unique for each user. It follows the form: "https://streetviewpublish.googleapis.com/media/user/{account_id}/photo/{upload_reference}"',
    ).optional(),
  }).describe(
    "Input only. Required when creating photo sequence. The resource name where the bytes of the photo sequence (in the form of video) are uploaded.",
  ).optional(),
  inputType: z.string().describe("Required. The input form of PhotoSequence.")
    .optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Street View Publish PhotoSequence. Registered at `@swamp/gcp/streetviewpublish/photosequence`. */
export const model = {
  type: "@swamp/gcp/streetviewpublish/photosequence",
  version: "2026.10.23.1",
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
      toVersion: "2026.04.23.1",
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
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: failureDetails, sequenceBounds",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          failureDetails: _failureDetails,
          sequenceBounds: _sequenceBounds,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "This resource represents a long-running operation that is the result of a net...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a photoSequence",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["captureTimeOverride"] !== undefined) {
          body["captureTimeOverride"] = g["captureTimeOverride"];
        }
        if (g["gpsSource"] !== undefined) body["gpsSource"] = g["gpsSource"];
        if (g["imu"] !== undefined) body["imu"] = g["imu"];
        if (g["rawGpsTimeline"] !== undefined) {
          body["rawGpsTimeline"] = g["rawGpsTimeline"];
        }
        if (g["uploadReference"] !== undefined) {
          body["uploadReference"] = g["uploadReference"];
        }
        if (g["inputType"] !== undefined) {
          params["inputType"] = String(g["inputType"]);
        }
        if (g["name"] !== undefined) params["sequenceId"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
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
      description: "Get a photoSequence",
      arguments: z.object({
        identifier: z.string().describe("The name of the photoSequence"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["sequenceId"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Delete the photoSequence",
      arguments: z.object({
        identifier: z.string().describe("The name of the photoSequence"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["sequenceId"] = args.identifier;
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync photoSequence state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific photoSequence by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["sequenceId"] = identifier;
          const result = await readResource(
            baseUrl,
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
    start_upload: {
      description: "start upload",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          baseUrl,
          {
            "id": "streetviewpublish.photoSequence.startUpload",
            "path": "v1/photoSequence:startUpload",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
