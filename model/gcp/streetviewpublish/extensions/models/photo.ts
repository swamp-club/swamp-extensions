// Auto-generated extension model for @swamp/gcp/streetviewpublish/photo
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Street View Publish Photo.
 *
 * Photo is used to store 360 photos along with photo metadata.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://streetviewpublish.googleapis.com/";

const GET_CONFIG = {
  "id": "streetviewpublish.photo.get",
  "path": "v1/photo/{photoId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "photoId",
  ],
  "parameters": {
    "languageCode": {
      "location": "query",
    },
    "photoId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "streetviewpublish.photo.create",
  "path": "v1/photo",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const UPDATE_CONFIG = {
  "id": "streetviewpublish.photo.update",
  "path": "v1/photo/{id}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "streetviewpublish.photo.delete",
  "path": "v1/photo/{photoId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "photoId",
  ],
  "parameters": {
    "photoId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  captureTime: z.string().describe(
    "Optional. Absolute time when the photo was captured. When the photo has no exif timestamp, this is used to set a timestamp in the photo metadata.",
  ).optional(),
  connections: z.array(z.object({
    target: z.object({
      id: z.string().describe("A unique identifier for a photo.").optional(),
    }).describe("Identifier for a Photo.").optional(),
  })).describe(
    "Optional. Connections to other photos. A connection represents the link from this photo to another photo.",
  ).optional(),
  photoId: z.object({
    id: z.string().describe("A unique identifier for a photo.").optional(),
  }).describe("Identifier for a Photo.").optional(),
  places: z.array(z.object({
    languageCode: z.string().describe(
      "Output only. The language_code that the name is localized with. This should be the language_code specified in the request, but may be a fallback.",
    ).optional(),
    name: z.string().describe(
      "Output only. The name of the place, localized to the language_code.",
    ).optional(),
    placeId: z.string().describe(
      "Place identifier, as described in https://developers.google.com/places/place-id.",
    ).optional(),
  })).describe("Optional. Places where this photo belongs.").optional(),
  pose: z.object({
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
  }).describe("Raw pose measurement for an entity.").optional(),
  uploadReference: z.object({
    uploadUrl: z.string().describe(
      'An upload reference should be unique for each user. It follows the form: "https://streetviewpublish.googleapis.com/media/user/{account_id}/photo/{upload_reference}"',
    ).optional(),
  }).describe("Upload reference for media files.").optional(),
});

const StateSchema = z.object({
  captureTime: z.string().optional(),
  connections: z.array(z.object({
    target: z.object({
      id: z.string(),
    }),
  })).optional(),
  downloadUrl: z.string().optional(),
  mapsPublishStatus: z.string().optional(),
  photoId: z.object({
    id: z.string(),
  }).optional(),
  places: z.array(z.object({
    languageCode: z.string(),
    name: z.string(),
    placeId: z.string(),
  })).optional(),
  pose: z.object({
    accuracyMeters: z.number(),
    altitude: z.number(),
    gpsRecordTimestampUnixEpoch: z.string(),
    heading: z.number(),
    latLngPair: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    level: z.object({
      name: z.string(),
      number: z.number(),
    }),
    pitch: z.number(),
    roll: z.number(),
  }).optional(),
  shareLink: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  transferStatus: z.string().optional(),
  uploadReference: z.object({
    uploadUrl: z.string(),
  }).optional(),
  uploadTime: z.string().optional(),
  viewCount: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  captureTime: z.string().describe(
    "Optional. Absolute time when the photo was captured. When the photo has no exif timestamp, this is used to set a timestamp in the photo metadata.",
  ).optional(),
  connections: z.array(z.object({
    target: z.object({
      id: z.string().describe("A unique identifier for a photo.").optional(),
    }).describe("Identifier for a Photo.").optional(),
  })).describe(
    "Optional. Connections to other photos. A connection represents the link from this photo to another photo.",
  ).optional(),
  photoId: z.object({
    id: z.string().describe("A unique identifier for a photo.").optional(),
  }).describe("Identifier for a Photo.").optional(),
  places: z.array(z.object({
    languageCode: z.string().describe(
      "Output only. The language_code that the name is localized with. This should be the language_code specified in the request, but may be a fallback.",
    ).optional(),
    name: z.string().describe(
      "Output only. The name of the place, localized to the language_code.",
    ).optional(),
    placeId: z.string().describe(
      "Place identifier, as described in https://developers.google.com/places/place-id.",
    ).optional(),
  })).describe("Optional. Places where this photo belongs.").optional(),
  pose: z.object({
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
  }).describe("Raw pose measurement for an entity.").optional(),
  uploadReference: z.object({
    uploadUrl: z.string().describe(
      'An upload reference should be unique for each user. It follows the form: "https://streetviewpublish.googleapis.com/media/user/{account_id}/photo/{upload_reference}"',
    ).optional(),
  }).describe("Upload reference for media files.").optional(),
});

/** Swamp extension model for Google Cloud Street View Publish Photo. Registered at `@swamp/gcp/streetviewpublish/photo`. */
export const model = {
  type: "@swamp/gcp/streetviewpublish/photo",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Photo is used to store 360 photos along with photo metadata.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a photo",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["captureTime"] !== undefined) {
          body["captureTime"] = g["captureTime"];
        }
        if (g["connections"] !== undefined) {
          body["connections"] = g["connections"];
        }
        if (g["photoId"] !== undefined) body["photoId"] = g["photoId"];
        if (g["places"] !== undefined) body["places"] = g["places"];
        if (g["pose"] !== undefined) body["pose"] = g["pose"];
        if (g["uploadReference"] !== undefined) {
          body["uploadReference"] = g["uploadReference"];
        }
        if (g["name"] !== undefined) params["photoId"] = String(g["name"]);
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
      description: "Get a photo",
      arguments: z.object({
        identifier: z.string().describe("The name of the photo"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["photoId"] = args.identifier;
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
    update: {
      description: "Update photo attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["id"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["captureTime"] !== undefined) {
          body["captureTime"] = g["captureTime"];
        }
        if (g["connections"] !== undefined) {
          body["connections"] = g["connections"];
        }
        if (g["photoId"] !== undefined) body["photoId"] = g["photoId"];
        if (g["places"] !== undefined) body["places"] = g["places"];
        if (g["pose"] !== undefined) body["pose"] = g["pose"];
        if (g["uploadReference"] !== undefined) {
          body["uploadReference"] = g["uploadReference"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the photo",
      arguments: z.object({
        identifier: z.string().describe("The name of the photo"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["photoId"] = args.identifier;
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
      description: "Sync photo state from GCP",
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
          params["photoId"] = identifier;
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
            "id": "streetviewpublish.photo.startUpload",
            "path": "v1/photo:startUpload",
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
