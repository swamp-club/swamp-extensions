// Auto-generated extension model for @swamp/gcp/books/layers-volumeannotations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Books Layers.VolumeAnnotations.
 *
 * Gets the volume annotation.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://books.googleapis.com/";

const GET_CONFIG = {
  "id": "books.layers.volumeAnnotations.get",
  "path":
    "books/v1/volumes/{volumeId}/layers/{layerId}/annotations/{annotationId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "volumeId",
    "layerId",
    "annotationId",
  ],
  "parameters": {
    "annotationId": {
      "location": "path",
      "required": true,
    },
    "layerId": {
      "location": "path",
      "required": true,
    },
    "locale": {
      "location": "query",
    },
    "source": {
      "location": "query",
    },
    "volumeId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "books.layers.volumeAnnotations.list",
  "path": "books/v1/volumes/{volumeId}/layers/{layerId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "volumeId",
    "layerId",
    "contentVersion",
  ],
  "parameters": {
    "contentVersion": {
      "location": "query",
      "required": true,
    },
    "endOffset": {
      "location": "query",
    },
    "endPosition": {
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
    "showDeleted": {
      "location": "query",
    },
    "source": {
      "location": "query",
    },
    "startOffset": {
      "location": "query",
    },
    "startPosition": {
      "location": "query",
    },
    "updatedMax": {
      "location": "query",
    },
    "updatedMin": {
      "location": "query",
    },
    "volumeAnnotationsVersion": {
      "location": "query",
    },
    "volumeId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

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
});

const StateSchema = z.object({
  annotationDataId: z.string().optional(),
  annotationDataLink: z.string().optional(),
  annotationType: z.string().optional(),
  contentRanges: z.object({
    cfiRange: z.object({
      endOffset: z.string(),
      endPosition: z.string(),
      startOffset: z.string(),
      startPosition: z.string(),
    }),
    contentVersion: z.string(),
    gbImageRange: z.object({
      endOffset: z.string(),
      endPosition: z.string(),
      startOffset: z.string(),
      startPosition: z.string(),
    }),
    gbTextRange: z.object({
      endOffset: z.string(),
      endPosition: z.string(),
      startOffset: z.string(),
      startPosition: z.string(),
    }),
  }).optional(),
  data: z.string().optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  layerId: z.string().optional(),
  pageIds: z.array(z.string()).optional(),
  selectedText: z.string().optional(),
  selfLink: z.string().optional(),
  updated: z.string().optional(),
  volumeId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Books Layers.VolumeAnnotations. Registered at `@swamp/gcp/books/layers-volumeannotations`. */
export const model = {
  type: "@swamp/gcp/books/layers-volumeannotations",
  version: "2026.06.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Gets the volume annotation.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a volumeAnnotations",
      arguments: z.object({
        identifier: z.string().describe("The name of the volumeAnnotations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["volumeId"] !== undefined) {
          params["volumeId"] = String(g["volumeId"]);
        }
        if (g["layerId"] !== undefined) {
          params["layerId"] = String(g["layerId"]);
        }
        params["annotationId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
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
    sync: {
      description: "Sync volumeAnnotations state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["annotationId"] = identifier;
          const result = await readResource(
            BASE_URL,
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
    list: {
      description: "List volumeAnnotations resources",
      arguments: z.object({
        contentVersion: z.string().describe(
          "The content version for the requested volume.",
        ).optional(),
        endOffset: z.string().describe(
          "The end offset to end retrieving data from.",
        ).optional(),
        endPosition: z.string().describe(
          "The end position to end retrieving data from.",
        ).optional(),
        locale: z.string().describe(
          "The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'.",
        ).optional(),
        maxResults: z.number().describe("Maximum number of results to return")
          .optional(),
        showDeleted: z.boolean().describe(
          "Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false.",
        ).optional(),
        source: z.string().describe(
          "String to identify the originator of this request.",
        ).optional(),
        startOffset: z.string().describe(
          "The start offset to start retrieving data from.",
        ).optional(),
        startPosition: z.string().describe(
          "The start position to start retrieving data from.",
        ).optional(),
        updatedMax: z.string().describe(
          "RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive).",
        ).optional(),
        updatedMin: z.string().describe(
          "RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive).",
        ).optional(),
        volumeAnnotationsVersion: z.string().describe(
          "The version of the volume annotations that you are requesting.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (args["contentVersion"] !== undefined) {
          params["contentVersion"] = String(args["contentVersion"]);
        }
        if (args["endOffset"] !== undefined) {
          params["endOffset"] = String(args["endOffset"]);
        }
        if (args["endPosition"] !== undefined) {
          params["endPosition"] = String(args["endPosition"]);
        }
        if (args["locale"] !== undefined) {
          params["locale"] = String(args["locale"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        if (args["source"] !== undefined) {
          params["source"] = String(args["source"]);
        }
        if (args["startOffset"] !== undefined) {
          params["startOffset"] = String(args["startOffset"]);
        }
        if (args["startPosition"] !== undefined) {
          params["startPosition"] = String(args["startPosition"]);
        }
        if (args["updatedMax"] !== undefined) {
          params["updatedMax"] = String(args["updatedMax"]);
        }
        if (args["updatedMin"] !== undefined) {
          params["updatedMin"] = String(args["updatedMin"]);
        }
        if (args["volumeAnnotationsVersion"] !== undefined) {
          params["volumeAnnotationsVersion"] = String(
            args["volumeAnnotationsVersion"],
          );
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
