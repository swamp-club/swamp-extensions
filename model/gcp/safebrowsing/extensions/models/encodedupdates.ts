// Auto-generated extension model for @swamp/gcp/safebrowsing/encodedupdates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Safe Browsing EncodedUpdates.
 *
 * GCP safebrowsing EncodedUpdates resource
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

const BASE_URL = "https://safebrowsing.googleapis.com/";

const GET_CONFIG = {
  "id": "safebrowsing.encodedUpdates.get",
  "path": "v4/encodedUpdates/{encodedRequest}",
  "httpMethod": "GET",
  "parameterOrder": [
    "encodedRequest",
  ],
  "parameters": {
    "clientId": {
      "location": "query",
    },
    "clientVersion": {
      "location": "query",
    },
    "encodedRequest": {
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
  listUpdateResponses: z.array(z.object({
    additions: z.array(z.object({
      compressionType: z.string(),
      rawHashes: z.object({
        prefixSize: z.unknown(),
        rawHashes: z.unknown(),
      }),
      rawIndices: z.object({
        indices: z.unknown(),
      }),
      riceHashes: z.object({
        encodedData: z.unknown(),
        firstValue: z.unknown(),
        numEntries: z.unknown(),
        riceParameter: z.unknown(),
      }),
      riceIndices: z.object({
        encodedData: z.unknown(),
        firstValue: z.unknown(),
        numEntries: z.unknown(),
        riceParameter: z.unknown(),
      }),
    })),
    checksum: z.object({
      sha256: z.string(),
    }),
    newClientState: z.string(),
    platformType: z.string(),
    removals: z.array(z.object({
      compressionType: z.string(),
      rawHashes: z.object({
        prefixSize: z.unknown(),
        rawHashes: z.unknown(),
      }),
      rawIndices: z.object({
        indices: z.unknown(),
      }),
      riceHashes: z.object({
        encodedData: z.unknown(),
        firstValue: z.unknown(),
        numEntries: z.unknown(),
        riceParameter: z.unknown(),
      }),
      riceIndices: z.object({
        encodedData: z.unknown(),
        firstValue: z.unknown(),
        numEntries: z.unknown(),
        riceParameter: z.unknown(),
      }),
    })),
    responseType: z.string(),
    threatEntryType: z.string(),
    threatType: z.string(),
  })).optional(),
  minimumWaitDuration: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Safe Browsing EncodedUpdates. Registered at `@swamp/gcp/safebrowsing/encodedupdates`. */
export const model = {
  type: "@swamp/gcp/safebrowsing/encodedupdates",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "GCP safebrowsing EncodedUpdates resource",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a encodedUpdates",
      arguments: z.object({
        identifier: z.string().describe("The name of the encodedUpdates"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["encodedRequest"] = args.identifier;
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
      description: "Sync encodedUpdates state from GCP",
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
          params["encodedRequest"] = identifier;
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
