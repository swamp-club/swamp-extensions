// Auto-generated extension model for @swamp/gcp/solar/datalayers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Solar DataLayers.
 *
 * Information about the solar potential of a region. The actual data are contained in a number of GeoTIFF files covering the requested region, for which this message contains URLs: Each string in the `DataLayers` message contains a URL from which the corresponding GeoTIFF can be fetched. These URLs are valid for a few hours after they've been generated. Most of the GeoTIFF files are at a resolution of 0.1m/pixel, but the monthly flux file is at 0.5m/pixel, and the hourly shade files are at 1m/pixel. If a `pixel_size_meters` value was specified in the `GetDataLayersRequest`, then the minimum resolution in the GeoTIFF files will be that value.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://solar.googleapis.com/";

const GET_CONFIG = {
  "id": "solar.dataLayers.get",
  "path": "v1/dataLayers:get",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "exactQualityRequired": {
      "location": "query",
    },
    "experiments": {
      "location": "query",
    },
    "location.latitude": {
      "location": "query",
    },
    "location.longitude": {
      "location": "query",
    },
    "pixelSizeMeters": {
      "location": "query",
    },
    "radiusMeters": {
      "location": "query",
    },
    "requiredQuality": {
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
  annualFluxUrl: z.string().optional(),
  dsmUrl: z.string().optional(),
  hourlyShadeUrls: z.array(z.string()).optional(),
  imageryDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }).optional(),
  imageryProcessedDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }).optional(),
  imageryQuality: z.string().optional(),
  maskUrl: z.string().optional(),
  monthlyFluxUrl: z.string().optional(),
  rgbUrl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Solar DataLayers. Registered at `@swamp/gcp/solar/datalayers`. */
export const model = {
  type: "@swamp/gcp/solar/datalayers",
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
        "Information about the solar potential of a region. The actual data are contai...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a dataLayers",
      arguments: z.object({
        identifier: z.string().describe("The name of the dataLayers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
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
    sync: {
      description: "Sync dataLayers state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        try {
          const params: Record<string, string> = { project: projectId };
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
  },
};
