// Auto-generated extension model for @swamp/gcp/books/mylibrary-annotations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Books Mylibrary.Annotations.
 *
 * Retrieves a list of annotations, possibly filtered.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://books.googleapis.com/";

const INSERT_CONFIG = {
  "id": "books.mylibrary.annotations.insert",
  "path": "books/v1/mylibrary/annotations",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {
    "annotationId": {
      "location": "query",
    },
    "country": {
      "location": "query",
    },
    "showOnlySummaryInResponse": {
      "location": "query",
    },
    "source": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "books.mylibrary.annotations.update",
  "path": "books/v1/mylibrary/annotations/{annotationId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "annotationId",
  ],
  "parameters": {
    "annotationId": {
      "location": "path",
      "required": true,
    },
    "source": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "books.mylibrary.annotations.delete",
  "path": "books/v1/mylibrary/annotations/{annotationId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "annotationId",
  ],
  "parameters": {
    "annotationId": {
      "location": "path",
      "required": true,
    },
    "source": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "books.mylibrary.annotations.list",
  "path": "books/v1/mylibrary/annotations",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "contentVersion": {
      "location": "query",
    },
    "layerId": {
      "location": "query",
    },
    "layerIds": {
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
    "updatedMax": {
      "location": "query",
    },
    "updatedMin": {
      "location": "query",
    },
    "volumeId": {
      "location": "query",
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
  afterSelectedText: z.string().describe(
    "Anchor text after excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty.",
  ).optional(),
  beforeSelectedText: z.string().describe(
    "Anchor text before excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty.",
  ).optional(),
  clientVersionRanges: z.object({
    cfiRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    contentVersion: z.string().describe("Content version the client sent in.")
      .optional(),
    gbImageRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    gbTextRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    imageCfiRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
  }).describe("Selection ranges sent from the client.").optional(),
  created: z.string().describe(
    "Timestamp for the created time of this annotation.",
  ).optional(),
  currentVersionRanges: z.object({
    cfiRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    contentVersion: z.string().describe(
      "Content version applicable to ranges below.",
    ).optional(),
    gbImageRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    gbTextRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    imageCfiRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
  }).describe("Selection ranges for the most recent content version.")
    .optional(),
  data: z.string().describe("User-created data for this annotation.")
    .optional(),
  deleted: z.boolean().describe("Indicates that this annotation is deleted.")
    .optional(),
  highlightStyle: z.string().describe(
    "The highlight style for this annotation.",
  ).optional(),
  id: z.string().describe("Id of this annotation, in the form of a GUID.")
    .optional(),
  layerId: z.string().describe("The layer this annotation is for.").optional(),
  layerSummary: z.object({
    allowedCharacterCount: z.number().int().describe(
      'Maximum allowed characters on this layer, especially for the "copy" layer.',
    ).optional(),
    limitType: z.string().describe(
      'Type of limitation on this layer. "limited" or "unlimited" for the "copy" layer.',
    ).optional(),
    remainingCharacterCount: z.number().int().describe(
      'Remaining allowed characters on this layer, especially for the "copy" layer.',
    ).optional(),
  }).optional(),
  pageIds: z.array(z.string()).describe("Pages that this annotation spans.")
    .optional(),
  selectedText: z.string().describe("Excerpt from the volume.").optional(),
  updated: z.string().describe(
    "Timestamp for the last time this annotation was modified.",
  ).optional(),
  volumeId: z.string().describe("The volume that this annotation belongs to.")
    .optional(),
  annotationId: z.string().describe("The ID for the annotation to insert.")
    .optional(),
  country: z.string().describe(
    "ISO-3166-1 code to override the IP-based location.",
  ).optional(),
  showOnlySummaryInResponse: z.string().describe(
    "Requests that only the summary of the specified layer be provided in the response.",
  ).optional(),
  source: z.string().describe(
    "String to identify the originator of this request.",
  ).optional(),
});

const StateSchema = z.object({
  afterSelectedText: z.string().optional(),
  beforeSelectedText: z.string().optional(),
  clientVersionRanges: z.object({
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
    imageCfiRange: z.object({
      endOffset: z.string(),
      endPosition: z.string(),
      startOffset: z.string(),
      startPosition: z.string(),
    }),
  }).optional(),
  created: z.string().optional(),
  currentVersionRanges: z.object({
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
    imageCfiRange: z.object({
      endOffset: z.string(),
      endPosition: z.string(),
      startOffset: z.string(),
      startPosition: z.string(),
    }),
  }).optional(),
  data: z.string().optional(),
  deleted: z.boolean().optional(),
  highlightStyle: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  layerId: z.string().optional(),
  layerSummary: z.object({
    allowedCharacterCount: z.number(),
    limitType: z.string(),
    remainingCharacterCount: z.number(),
  }).optional(),
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
  afterSelectedText: z.string().describe(
    "Anchor text after excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty.",
  ).optional(),
  beforeSelectedText: z.string().describe(
    "Anchor text before excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty.",
  ).optional(),
  clientVersionRanges: z.object({
    cfiRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    contentVersion: z.string().describe("Content version the client sent in.")
      .optional(),
    gbImageRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    gbTextRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    imageCfiRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
  }).describe("Selection ranges sent from the client.").optional(),
  created: z.string().describe(
    "Timestamp for the created time of this annotation.",
  ).optional(),
  currentVersionRanges: z.object({
    cfiRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    contentVersion: z.string().describe(
      "Content version applicable to ranges below.",
    ).optional(),
    gbImageRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    gbTextRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
    imageCfiRange: z.object({
      endOffset: z.string().describe("The offset from the ending position.")
        .optional(),
      endPosition: z.string().describe("The ending position for the range.")
        .optional(),
      startOffset: z.string().describe("The offset from the starting position.")
        .optional(),
      startPosition: z.string().describe("The starting position for the range.")
        .optional(),
    }).optional(),
  }).describe("Selection ranges for the most recent content version.")
    .optional(),
  data: z.string().describe("User-created data for this annotation.")
    .optional(),
  deleted: z.boolean().describe("Indicates that this annotation is deleted.")
    .optional(),
  highlightStyle: z.string().describe(
    "The highlight style for this annotation.",
  ).optional(),
  id: z.string().describe("Id of this annotation, in the form of a GUID.")
    .optional(),
  layerId: z.string().describe("The layer this annotation is for.").optional(),
  layerSummary: z.object({
    allowedCharacterCount: z.number().int().describe(
      'Maximum allowed characters on this layer, especially for the "copy" layer.',
    ).optional(),
    limitType: z.string().describe(
      'Type of limitation on this layer. "limited" or "unlimited" for the "copy" layer.',
    ).optional(),
    remainingCharacterCount: z.number().int().describe(
      'Remaining allowed characters on this layer, especially for the "copy" layer.',
    ).optional(),
  }).optional(),
  pageIds: z.array(z.string()).describe("Pages that this annotation spans.")
    .optional(),
  selectedText: z.string().describe("Excerpt from the volume.").optional(),
  updated: z.string().describe(
    "Timestamp for the last time this annotation was modified.",
  ).optional(),
  volumeId: z.string().describe("The volume that this annotation belongs to.")
    .optional(),
  annotationId: z.string().describe("The ID for the annotation to insert.")
    .optional(),
  country: z.string().describe(
    "ISO-3166-1 code to override the IP-based location.",
  ).optional(),
  showOnlySummaryInResponse: z.string().describe(
    "Requests that only the summary of the specified layer be provided in the response.",
  ).optional(),
  source: z.string().describe(
    "String to identify the originator of this request.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Books Mylibrary.Annotations. Registered at `@swamp/gcp/books/mylibrary-annotations`. */
export const model = {
  type: "@swamp/gcp/books/mylibrary-annotations",
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
      toVersion: "2026.05.25.2",
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
      description: "Retrieves a list of annotations, possibly filtered.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a annotations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["afterSelectedText"] !== undefined) {
          body["afterSelectedText"] = g["afterSelectedText"];
        }
        if (g["beforeSelectedText"] !== undefined) {
          body["beforeSelectedText"] = g["beforeSelectedText"];
        }
        if (g["clientVersionRanges"] !== undefined) {
          body["clientVersionRanges"] = g["clientVersionRanges"];
        }
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["currentVersionRanges"] !== undefined) {
          body["currentVersionRanges"] = g["currentVersionRanges"];
        }
        if (g["data"] !== undefined) body["data"] = g["data"];
        if (g["deleted"] !== undefined) body["deleted"] = g["deleted"];
        if (g["highlightStyle"] !== undefined) {
          body["highlightStyle"] = g["highlightStyle"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["layerId"] !== undefined) body["layerId"] = g["layerId"];
        if (g["layerSummary"] !== undefined) {
          body["layerSummary"] = g["layerSummary"];
        }
        if (g["pageIds"] !== undefined) body["pageIds"] = g["pageIds"];
        if (g["selectedText"] !== undefined) {
          body["selectedText"] = g["selectedText"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["volumeId"] !== undefined) body["volumeId"] = g["volumeId"];
        if (g["annotationId"] !== undefined) {
          body["annotationId"] = g["annotationId"];
        }
        if (g["country"] !== undefined) body["country"] = g["country"];
        if (g["showOnlySummaryInResponse"] !== undefined) {
          body["showOnlySummaryInResponse"] = g["showOnlySummaryInResponse"];
        }
        if (g["source"] !== undefined) body["source"] = g["source"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {},
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
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
      description: "Get a annotations",
      arguments: z.object({
        identifier: z.string().describe("The name of the annotations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    update: {
      description: "Update annotations attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["annotationId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["afterSelectedText"] !== undefined) {
          body["afterSelectedText"] = g["afterSelectedText"];
        }
        if (g["beforeSelectedText"] !== undefined) {
          body["beforeSelectedText"] = g["beforeSelectedText"];
        }
        if (g["clientVersionRanges"] !== undefined) {
          body["clientVersionRanges"] = g["clientVersionRanges"];
        }
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["currentVersionRanges"] !== undefined) {
          body["currentVersionRanges"] = g["currentVersionRanges"];
        }
        if (g["data"] !== undefined) body["data"] = g["data"];
        if (g["deleted"] !== undefined) body["deleted"] = g["deleted"];
        if (g["highlightStyle"] !== undefined) {
          body["highlightStyle"] = g["highlightStyle"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["layerId"] !== undefined) body["layerId"] = g["layerId"];
        if (g["layerSummary"] !== undefined) {
          body["layerSummary"] = g["layerSummary"];
        }
        if (g["pageIds"] !== undefined) body["pageIds"] = g["pageIds"];
        if (g["selectedText"] !== undefined) {
          body["selectedText"] = g["selectedText"];
        }
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["volumeId"] !== undefined) body["volumeId"] = g["volumeId"];
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
          undefined,
          undefined,
          credentials,
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
      description: "Delete the annotations",
      arguments: z.object({
        identifier: z.string().describe("The name of the annotations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["annotationId"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync annotations state from GCP",
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
      description: "List annotations resources",
      arguments: z.object({
        contentVersion: z.string().describe(
          "The content version for the requested volume.",
        ).optional(),
        layerId: z.string().describe("The layer ID to limit annotation by.")
          .optional(),
        layerIds: z.string().describe("The layer ID(s) to limit annotation by.")
          .optional(),
        maxResults: z.number().describe("Maximum number of results to return")
          .optional(),
        showDeleted: z.boolean().describe(
          "Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false.",
        ).optional(),
        source: z.string().describe(
          "String to identify the originator of this request.",
        ).optional(),
        updatedMax: z.string().describe(
          "RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive).",
        ).optional(),
        updatedMin: z.string().describe(
          "RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive).",
        ).optional(),
        volumeId: z.string().describe("The volume to restrict annotations to.")
          .optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (args["contentVersion"] !== undefined) {
          params["contentVersion"] = String(args["contentVersion"]);
        }
        if (args["layerId"] !== undefined) {
          params["layerId"] = String(args["layerId"]);
        }
        if (args["layerIds"] !== undefined) {
          params["layerIds"] = String(args["layerIds"]);
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
        if (args["updatedMax"] !== undefined) {
          params["updatedMax"] = String(args["updatedMax"]);
        }
        if (args["updatedMin"] !== undefined) {
          params["updatedMin"] = String(args["updatedMin"]);
        }
        if (args["volumeId"] !== undefined) {
          params["volumeId"] = String(args["volumeId"]);
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
    summary: {
      description: "summary",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["volumeId"] !== undefined) {
          params["volumeId"] = String(g["volumeId"]);
        }
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["layerIds"] = existing["layerIds"]?.toString() ??
          g["layerIds"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "books.mylibrary.annotations.summary",
            "path": "books/v1/mylibrary/annotations/summary",
            "httpMethod": "POST",
            "parameterOrder": ["layerIds", "volumeId"],
            "parameters": {
              "layerIds": { "location": "query", "required": true },
              "source": { "location": "query" },
              "volumeId": { "location": "query", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
