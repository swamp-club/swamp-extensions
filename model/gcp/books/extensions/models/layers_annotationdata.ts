// Auto-generated extension model for @swamp/gcp/books/layers-annotationdata
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Books Layers.AnnotationData.
 *
 * Gets the annotation data.
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

const BASE_URL = "https://books.googleapis.com/";

const GET_CONFIG = {
  "id": "books.layers.annotationData.get",
  "path":
    "books/v1/volumes/{volumeId}/layers/{layerId}/data/{annotationDataId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "volumeId",
    "layerId",
    "annotationDataId",
    "contentVersion",
  ],
  "parameters": {
    "allowWebDefinitions": {
      "location": "query",
    },
    "annotationDataId": {
      "location": "path",
      "required": true,
    },
    "contentVersion": {
      "location": "query",
      "required": true,
    },
    "h": {
      "location": "query",
    },
    "layerId": {
      "location": "path",
      "required": true,
    },
    "locale": {
      "location": "query",
    },
    "scale": {
      "location": "query",
    },
    "source": {
      "location": "query",
    },
    "volumeId": {
      "location": "path",
      "required": true,
    },
    "w": {
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
  annotationType: z.string().optional(),
  data: z.object({
    common: z.object({
      title: z.string(),
    }),
    dict: z.object({
      source: z.object({
        attribution: z.string(),
        url: z.string(),
      }),
      words: z.array(z.object({
        derivatives: z.array(z.unknown()),
        examples: z.array(z.unknown()),
        senses: z.array(z.unknown()),
        source: z.object({
          attribution: z.unknown(),
          url: z.unknown(),
        }),
      })),
    }),
    kind: z.string(),
  }).optional(),
  encodedData: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  layerId: z.string().optional(),
  selfLink: z.string().optional(),
  updated: z.string().optional(),
  volumeId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Books Layers.AnnotationData. Registered at `@swamp/gcp/books/layers-annotationdata`. */
export const model = {
  type: "@swamp/gcp/books/layers-annotationdata",
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
      description: "Gets the annotation data.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a annotationData",
      arguments: z.object({
        identifier: z.string().describe("The name of the annotationData"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["volumeId"] !== undefined) {
          params["volumeId"] = String(g["volumeId"]);
        }
        if (g["layerId"] !== undefined) {
          params["layerId"] = String(g["layerId"]);
        }
        if (g["annotationDataId"] !== undefined) {
          params["annotationDataId"] = String(g["annotationDataId"]);
        }
        params["contentVersion"] = args.identifier;
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
      description: "Sync annotationData state from GCP",
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
          if (g["volumeId"] !== undefined) {
            params["volumeId"] = String(g["volumeId"]);
          } else if (existing["volumeId"]) {
            params["volumeId"] = String(existing["volumeId"]);
          }
          if (g["layerId"] !== undefined) {
            params["layerId"] = String(g["layerId"]);
          } else if (existing["layerId"]) {
            params["layerId"] = String(existing["layerId"]);
          }
          if (g["annotationDataId"] !== undefined) {
            params["annotationDataId"] = String(g["annotationDataId"]);
          } else if (existing["annotationDataId"]) {
            params["annotationDataId"] = String(existing["annotationDataId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["contentVersion"] = identifier;
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
