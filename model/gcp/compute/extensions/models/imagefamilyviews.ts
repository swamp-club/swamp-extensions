// Auto-generated extension model for @swamp/gcp/compute/imagefamilyviews
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine ImageFamilyViews.
 *
 * Returns the latest image that is part of an image family, is not deprecated and is rolled out in the specified zone.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.imageFamilyViews.get",
  "path": "projects/{project}/zones/{zone}/imageFamilyViews/{family}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "family",
  ],
  "parameters": {
    "family": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  image: z.object({
    architecture: z.string(),
    archiveSizeBytes: z.string(),
    creationTimestamp: z.string(),
    deprecated: z.object({
      deleted: z.string(),
      deprecated: z.string(),
      obsolete: z.string(),
      replacement: z.string(),
      state: z.string(),
    }),
    description: z.string(),
    diskSizeGb: z.string(),
    enableConfidentialCompute: z.boolean(),
    family: z.string(),
    guestOsFeatures: z.array(z.object({
      type: z.string(),
    })),
    id: z.string(),
    imageEncryptionKey: z.object({
      kmsKeyName: z.string(),
      kmsKeyServiceAccount: z.string(),
      rawKey: z.string(),
      rsaEncryptedKey: z.string(),
      sha256: z.string(),
    }),
    kind: z.string(),
    labelFingerprint: z.string(),
    labels: z.record(z.string(), z.unknown()),
    licenseCodes: z.array(z.string()),
    licenses: z.array(z.string()),
    name: z.string(),
    params: z.object({
      resourceManagerTags: z.record(z.string(), z.unknown()),
    }),
    rawDisk: z.object({
      containerType: z.string(),
      sha1Checksum: z.string(),
      source: z.string(),
    }),
    satisfiesPzi: z.boolean(),
    satisfiesPzs: z.boolean(),
    selfLink: z.string(),
    shieldedInstanceInitialState: z.object({
      dbs: z.array(z.object({
        content: z.string(),
        fileType: z.string(),
      })),
      dbxs: z.array(z.object({
        content: z.string(),
        fileType: z.string(),
      })),
      keks: z.array(z.object({
        content: z.string(),
        fileType: z.string(),
      })),
      pk: z.object({
        content: z.string(),
        fileType: z.string(),
      }),
    }),
    sourceDisk: z.string(),
    sourceDiskEncryptionKey: z.object({
      kmsKeyName: z.string(),
      kmsKeyServiceAccount: z.string(),
      rawKey: z.string(),
      rsaEncryptedKey: z.string(),
      sha256: z.string(),
    }),
    sourceDiskId: z.string(),
    sourceImage: z.string(),
    sourceImageEncryptionKey: z.object({
      kmsKeyName: z.string(),
      kmsKeyServiceAccount: z.string(),
      rawKey: z.string(),
      rsaEncryptedKey: z.string(),
      sha256: z.string(),
    }),
    sourceImageId: z.string(),
    sourceSnapshot: z.string(),
    sourceSnapshotEncryptionKey: z.object({
      kmsKeyName: z.string(),
      kmsKeyServiceAccount: z.string(),
      rawKey: z.string(),
      rsaEncryptedKey: z.string(),
      sha256: z.string(),
    }),
    sourceSnapshotId: z.string(),
    sourceType: z.string(),
    status: z.string(),
    storageLocations: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Compute Engine ImageFamilyViews. Registered at `@swamp/gcp/compute/imagefamilyviews`. */
export const model = {
  type: "@swamp/gcp/compute/imagefamilyviews",
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
        "Returns the latest image that is part of an image family, is not deprecated a...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a imageFamilyViews",
      arguments: z.object({
        identifier: z.string().describe("The name of the imageFamilyViews"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["family"] = args.identifier;
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
      description: "Sync imageFamilyViews state from GCP",
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
          if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
          else if (existing["zone"]) params["zone"] = String(existing["zone"]);
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["family"] = identifier;
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
