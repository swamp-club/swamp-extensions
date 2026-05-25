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
  listResources,
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

const LIST_CONFIG = {
  "id": "books.layers.annotationData.list",
  "path": "books/v1/volumes/{volumeId}/layers/{layerId}/data",
  "httpMethod": "GET",
  "parameterOrder": [
    "volumeId",
    "layerId",
    "contentVersion",
  ],
  "parameters": {
    "annotationDataId": {
      "location": "query",
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
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "scale": {
      "location": "query",
    },
    "source": {
      "location": "query",
    },
    "updatedMax": {
      "location": "query",
    },
    "updatedMin": {
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
  version: "2026.05.25.1",
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
    list: {
      description: "List annotationData resources",
      arguments: z.object({
        annotationDataId: z.string().describe(
          "The list of Annotation Data Ids to retrieve. Pagination is ignored if this is set.",
        ).optional(),
        contentVersion: z.string().describe(
          "The content version for the requested volume.",
        ).optional(),
        h: z.number().describe(
          "The requested pixel height for any images. If height is provided width must also be provided.",
        ).optional(),
        locale: z.string().describe(
          "The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'.",
        ).optional(),
        maxResults: z.number().describe("Maximum number of results to return")
          .optional(),
        scale: z.number().describe("The requested scale for the image.")
          .optional(),
        source: z.string().describe(
          "String to identify the originator of this request.",
        ).optional(),
        updatedMax: z.string().describe(
          "RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive).",
        ).optional(),
        updatedMin: z.string().describe(
          "RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive).",
        ).optional(),
        w: z.number().describe(
          "The requested pixel width for any images. If width is provided height must also be provided.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["volumeId"] !== undefined) {
          params["volumeId"] = String(g["volumeId"]);
        }
        if (g["layerId"] !== undefined) {
          params["layerId"] = String(g["layerId"]);
        }
        if (g["contentVersion"] !== undefined) {
          params["contentVersion"] = String(g["contentVersion"]);
        }
        if (args["annotationDataId"] !== undefined) {
          params["annotationDataId"] = String(args["annotationDataId"]);
        }
        if (args["contentVersion"] !== undefined) {
          params["contentVersion"] = String(args["contentVersion"]);
        }
        if (args["h"] !== undefined) params["h"] = String(args["h"]);
        if (args["locale"] !== undefined) {
          params["locale"] = String(args["locale"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["scale"] !== undefined) {
          params["scale"] = String(args["scale"]);
        }
        if (args["source"] !== undefined) {
          params["source"] = String(args["source"]);
        }
        if (args["updatedMax"] !== undefined) {
          params["updatedMax"] = String(args["updatedMax"]);
        }
        if (args["updatedMin"] !== undefined) {
          params["updatedMin"] = String(args["updatedMin"]);
        }
        if (args["w"] !== undefined) params["w"] = String(args["w"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
          (args.maxPages as number | undefined) ?? 10,
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
