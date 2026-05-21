// Auto-generated extension model for @swamp/gcp/streetviewpublish/photos
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Street View Publish Photos.
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
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://streetviewpublish.googleapis.com/";

const LIST_CONFIG = {
  "id": "streetviewpublish.photos.list",
  "path": "v1/photos",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "languageCode": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
});

/** Swamp extension model for Google Cloud Street View Publish Photos. Registered at `@swamp/gcp/streetviewpublish/photos`. */
export const model = {
  type: "@swamp/gcp/streetviewpublish/photos",
  version: "2026.05.21.1",
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
    get: {
      description: "Get a photos",
      arguments: z.object({
        identifier: z.string().describe("The name of the photos"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync photos state from GCP",
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
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        photoIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["photoIds"] !== undefined) body["photoIds"] = args["photoIds"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "streetviewpublish.photos.batchDelete",
            "path": "v1/photos:batchDelete",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_get: {
      description: "batch get",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "streetviewpublish.photos.batchGet",
            "path": "v1/photos:batchGet",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "languageCode": { "location": "query" },
              "photoIds": { "location": "query" },
              "view": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    batch_update: {
      description: "batch update",
      arguments: z.object({
        updatePhotoRequests: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["updatePhotoRequests"] !== undefined) {
          body["updatePhotoRequests"] = args["updatePhotoRequests"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "streetviewpublish.photos.batchUpdate",
            "path": "v1/photos:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
