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

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  captureTimeOverride: z.string().describe(
    "Optional. Absolute time when the photo sequence starts to be captured. If the photo sequence is a video, this is the start time of the video. If this field is populated in input, it overrides the capture time in the video or XDM file.",
  ).optional(),
  failureDetails: z.object({
    gpsDataGapDetails: z.object({
      gapDuration: z.string().describe(
        "The duration of the gap in GPS data that was found.",
      ).optional(),
      gapStartTime: z.string().describe(
        "Relative time (from the start of the video stream) when the gap started.",
      ).optional(),
    }).describe(
      "Details related to ProcessingFailureReason#GPS_DATA_GAP. If there are multiple GPS data gaps, only the one with the largest duration is reported here.",
    ).optional(),
    imuDataGapDetails: z.object({
      gapDuration: z.string().describe(
        "The duration of the gap in IMU data that was found.",
      ).optional(),
      gapStartTime: z.string().describe(
        "Relative time (from the start of the video stream) when the gap started.",
      ).optional(),
    }).describe(
      "Details related to ProcessingFailureReason#IMU_DATA_GAP. If there are multiple IMU data gaps, only the one with the largest duration is reported here.",
    ).optional(),
    insufficientGpsDetails: z.object({
      gpsPointsFound: z.number().int().describe(
        "The number of GPS points that were found in the video.",
      ).optional(),
    }).describe("Details related to ProcessingFailureReason#INSUFFICIENT_GPS.")
      .optional(),
    noOverlapGpsDetails: z.object({
      gpsEndTime: z.string().describe("Time of last recorded GPS point.")
        .optional(),
      gpsStartTime: z.string().describe("Time of first recorded GPS point.")
        .optional(),
      videoEndTime: z.string().describe("End time of video.").optional(),
      videoStartTime: z.string().describe("Start time of video.").optional(),
    }).describe(
      "Details related to PhotoSequenceProcessingFailureReason#NO_OVERLAP_GPS.",
    ).optional(),
    notOutdoorsDetails: z.object({
      startTime: z.string().describe(
        "Relative time (from the start of the video stream) when an indoor frame was found.",
      ).optional(),
    }).describe(
      "Details related to ProcessingFailureReason#NOT_OUTDOORS. If there are multiple indoor frames found, the first frame is recorded here.",
    ).optional(),
  }).describe(
    "Additional details to accompany the ProcessingFailureReason enum. This message is always expected to be used in conjunction with ProcessingFailureReason, and the oneof value set in this message should match the FailureReason.",
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
  }).describe("IMU data from the device sensors.").optional(),
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
      "An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.",
    ).optional(),
    level: z.object({
      name: z.string().describe(
        "Required. A name assigned to this Level, restricted to 3 characters. Consider how the elevator buttons would be labeled for this level if there was an elevator.",
      ).optional(),
      number: z.number().describe(
        "Optional. Floor number, used for ordering. 0 indicates the ground level, 1 indicates the first level above ground level, -1 indicates the first level under ground level. Non-integer values are OK.",
      ).optional(),
    }).describe(
      "Level information containing level number and its corresponding name.",
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
  sequenceBounds: z.object({
    northeast: z.object({
      latitude: z.number().describe(
        "The latitude in degrees. It must be in the range [-90.0, +90.0].",
      ).optional(),
      longitude: z.number().describe(
        "The longitude in degrees. It must be in the range [-180.0, +180.0].",
      ).optional(),
    }).describe(
      "An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.",
    ).optional(),
    southwest: z.object({
      latitude: z.number().describe(
        "The latitude in degrees. It must be in the range [-90.0, +90.0].",
      ).optional(),
      longitude: z.number().describe(
        "The longitude in degrees. It must be in the range [-180.0, +180.0].",
      ).optional(),
    }).describe(
      "An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.",
    ).optional(),
  }).describe("A rectangle in geographical coordinates.").optional(),
  uploadReference: z.object({
    uploadUrl: z.string().describe(
      'An upload reference should be unique for each user. It follows the form: "https://streetviewpublish.googleapis.com/media/user/{account_id}/photo/{upload_reference}"',
    ).optional(),
  }).describe("Upload reference for media files.").optional(),
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
  captureTimeOverride: z.string().describe(
    "Optional. Absolute time when the photo sequence starts to be captured. If the photo sequence is a video, this is the start time of the video. If this field is populated in input, it overrides the capture time in the video or XDM file.",
  ).optional(),
  failureDetails: z.object({
    gpsDataGapDetails: z.object({
      gapDuration: z.string().describe(
        "The duration of the gap in GPS data that was found.",
      ).optional(),
      gapStartTime: z.string().describe(
        "Relative time (from the start of the video stream) when the gap started.",
      ).optional(),
    }).describe(
      "Details related to ProcessingFailureReason#GPS_DATA_GAP. If there are multiple GPS data gaps, only the one with the largest duration is reported here.",
    ).optional(),
    imuDataGapDetails: z.object({
      gapDuration: z.string().describe(
        "The duration of the gap in IMU data that was found.",
      ).optional(),
      gapStartTime: z.string().describe(
        "Relative time (from the start of the video stream) when the gap started.",
      ).optional(),
    }).describe(
      "Details related to ProcessingFailureReason#IMU_DATA_GAP. If there are multiple IMU data gaps, only the one with the largest duration is reported here.",
    ).optional(),
    insufficientGpsDetails: z.object({
      gpsPointsFound: z.number().int().describe(
        "The number of GPS points that were found in the video.",
      ).optional(),
    }).describe("Details related to ProcessingFailureReason#INSUFFICIENT_GPS.")
      .optional(),
    noOverlapGpsDetails: z.object({
      gpsEndTime: z.string().describe("Time of last recorded GPS point.")
        .optional(),
      gpsStartTime: z.string().describe("Time of first recorded GPS point.")
        .optional(),
      videoEndTime: z.string().describe("End time of video.").optional(),
      videoStartTime: z.string().describe("Start time of video.").optional(),
    }).describe(
      "Details related to PhotoSequenceProcessingFailureReason#NO_OVERLAP_GPS.",
    ).optional(),
    notOutdoorsDetails: z.object({
      startTime: z.string().describe(
        "Relative time (from the start of the video stream) when an indoor frame was found.",
      ).optional(),
    }).describe(
      "Details related to ProcessingFailureReason#NOT_OUTDOORS. If there are multiple indoor frames found, the first frame is recorded here.",
    ).optional(),
  }).describe(
    "Additional details to accompany the ProcessingFailureReason enum. This message is always expected to be used in conjunction with ProcessingFailureReason, and the oneof value set in this message should match the FailureReason.",
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
  }).describe("IMU data from the device sensors.").optional(),
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
      "An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.",
    ).optional(),
    level: z.object({
      name: z.string().describe(
        "Required. A name assigned to this Level, restricted to 3 characters. Consider how the elevator buttons would be labeled for this level if there was an elevator.",
      ).optional(),
      number: z.number().describe(
        "Optional. Floor number, used for ordering. 0 indicates the ground level, 1 indicates the first level above ground level, -1 indicates the first level under ground level. Non-integer values are OK.",
      ).optional(),
    }).describe(
      "Level information containing level number and its corresponding name.",
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
  sequenceBounds: z.object({
    northeast: z.object({
      latitude: z.number().describe(
        "The latitude in degrees. It must be in the range [-90.0, +90.0].",
      ).optional(),
      longitude: z.number().describe(
        "The longitude in degrees. It must be in the range [-180.0, +180.0].",
      ).optional(),
    }).describe(
      "An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.",
    ).optional(),
    southwest: z.object({
      latitude: z.number().describe(
        "The latitude in degrees. It must be in the range [-90.0, +90.0].",
      ).optional(),
      longitude: z.number().describe(
        "The longitude in degrees. It must be in the range [-180.0, +180.0].",
      ).optional(),
    }).describe(
      "An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.",
    ).optional(),
  }).describe("A rectangle in geographical coordinates.").optional(),
  uploadReference: z.object({
    uploadUrl: z.string().describe(
      'An upload reference should be unique for each user. It follows the form: "https://streetviewpublish.googleapis.com/media/user/{account_id}/photo/{upload_reference}"',
    ).optional(),
  }).describe("Upload reference for media files.").optional(),
  inputType: z.string().describe("Required. The input form of PhotoSequence.")
    .optional(),
});

/** Swamp extension model for Google Cloud Street View Publish PhotoSequence. Registered at `@swamp/gcp/streetviewpublish/photosequence`. */
export const model = {
  type: "@swamp/gcp/streetviewpublish/photosequence",
  version: "2026.05.21.2",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["captureTimeOverride"] !== undefined) {
          body["captureTimeOverride"] = g["captureTimeOverride"];
        }
        if (g["failureDetails"] !== undefined) {
          body["failureDetails"] = g["failureDetails"];
        }
        if (g["gpsSource"] !== undefined) body["gpsSource"] = g["gpsSource"];
        if (g["imu"] !== undefined) body["imu"] = g["imu"];
        if (g["rawGpsTimeline"] !== undefined) {
          body["rawGpsTimeline"] = g["rawGpsTimeline"];
        }
        if (g["sequenceBounds"] !== undefined) {
          body["sequenceBounds"] = g["sequenceBounds"];
        }
        if (g["uploadReference"] !== undefined) {
          body["uploadReference"] = g["uploadReference"];
        }
        if (g["inputType"] !== undefined) body["inputType"] = g["inputType"];
        if (g["name"] !== undefined) params["sequenceId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["sequenceId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["sequenceId"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
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
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["sequenceId"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "streetviewpublish.photoSequence.startUpload",
            "path": "v1/photoSequence:startUpload",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
