// Auto-generated extension model for @swamp/gcp/compute/regionsnapshotsettings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine RegionSnapshotSettings.
 *
 * Get region snapshot settings.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.regionSnapshotSettings.get",
  "path": "projects/{project}/regions/{region}/snapshotSettings",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.regionSnapshotSettings.patch",
  "path": "projects/{project}/regions/{region}/snapshotSettings",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessLocation: z.object({
    locations: z.record(
      z.string(),
      z.object({
        region: z.string().describe("Accessible region name").optional(),
      }),
    ).describe(
      "List of regions that can restore a regional snapshot from the current region",
    ).optional(),
    policy: z.enum(["ALL_REGIONS", "POLICY_UNSPECIFIED", "SPECIFIC_REGIONS"])
      .describe("Policy of which location is allowed to access snapshot.")
      .optional(),
  }).optional(),
  storageLocation: z.object({
    locations: z.record(
      z.string(),
      z.object({
        name: z.string().describe(
          "Name of the location. It should be one of the Cloud Storage buckets. Only one location can be specified.",
        ).optional(),
      }),
    ).describe(
      "When the policy is SPECIFIC_LOCATIONS, snapshots will be stored in the locations listed in this field. Keys are Cloud Storage bucket locations. Only one location can be specified.",
    ).optional(),
    policy: z.enum([
      "LOCAL_REGION",
      "NEAREST_MULTI_REGION",
      "SPECIFIC_LOCATIONS",
      "STORAGE_LOCATION_POLICY_UNSPECIFIED",
    ]).describe("The chosen location policy.").optional(),
  }).optional(),
});

const StateSchema = z.object({
  accessLocation: z.object({
    locations: z.record(z.string(), z.unknown()),
    policy: z.string(),
  }).optional(),
  storageLocation: z.object({
    locations: z.record(z.string(), z.unknown()),
    policy: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessLocation: z.object({
    locations: z.record(
      z.string(),
      z.object({
        region: z.string().describe("Accessible region name").optional(),
      }),
    ).describe(
      "List of regions that can restore a regional snapshot from the current region",
    ).optional(),
    policy: z.enum(["ALL_REGIONS", "POLICY_UNSPECIFIED", "SPECIFIC_REGIONS"])
      .describe("Policy of which location is allowed to access snapshot.")
      .optional(),
  }).optional(),
  storageLocation: z.object({
    locations: z.record(
      z.string(),
      z.object({
        name: z.string().describe(
          "Name of the location. It should be one of the Cloud Storage buckets. Only one location can be specified.",
        ).optional(),
      }),
    ).describe(
      "When the policy is SPECIFIC_LOCATIONS, snapshots will be stored in the locations listed in this field. Keys are Cloud Storage bucket locations. Only one location can be specified.",
    ).optional(),
    policy: z.enum([
      "LOCAL_REGION",
      "NEAREST_MULTI_REGION",
      "SPECIFIC_LOCATIONS",
      "STORAGE_LOCATION_POLICY_UNSPECIFIED",
    ]).describe("The chosen location policy.").optional(),
  }).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine RegionSnapshotSettings. Registered at `@swamp/gcp/compute/regionsnapshotsettings`. */
export const model = {
  type: "@swamp/gcp/compute/regionsnapshotsettings",
  version: "2026.05.18.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Get region snapshot settings.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a regionSnapshotSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the regionSnapshotSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["region"] = args.identifier;
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
      description: "Update regionSnapshotSettings attributes",
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
        params["region"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accessLocation"] !== undefined) {
          body["accessLocation"] = g["accessLocation"];
        }
        if (g["storageLocation"] !== undefined) {
          body["storageLocation"] = g["storageLocation"];
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
          PATCH_CONFIG,
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
    sync: {
      description: "Sync regionSnapshotSettings state from GCP",
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
          params["region"] = identifier;
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
