// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/deepreview/documents-reviews
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Deep Review Documents.Reviews.
 *
 * An evaluation run of a document.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/reviews/${shortName}`;
}

const BASE_URL = "https://deepreview.googleapis.com/";

const GET_CONFIG = {
  "id": "deepreview.documents.reviews.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "deepreview.documents.reviews.create",
  "path": "v1/{+parent}/reviews",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "reviewId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "deepreview.documents.reviews.list",
  "path": "v1/{+parent}/reviews",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name in format `documents/{document}/reviews/{review}`.",
  ).optional(),
  runConfig: z.object({
    geminiApiKey: z.string().describe(
      "Optional. Input only. Developer Bring-Your-Own-Key Gemini API key. When provided, requests are billed to the caller's Gemini API project. Input only; forwarded to the asynchronous review runner in the task payload and never persisted in database records or returned in review resources (see companion field `gemini_api_key_set`, AIP-147).",
    ).optional(),
    geminiApiKeySet: z.boolean().describe(
      "Output only. Indicates whether a developer Bring-Your-Own-Key Gemini API key was provided for this review run.",
    ).optional(),
    model: z.string().describe(
      "Optional. The Gemini model identifier to use for the review. If omitted, the server uses its default model. Unsupported values return INVALID_ARGUMENT.",
    ).optional(),
    topology: z.enum([
      "TOPOLOGY_UNSPECIFIED",
      "EXTRA_HIGH",
      "HIGH",
      "MID",
      "LOW",
    ]).describe("Optional. Review execution topology profile to use.")
      .optional(),
    userPrompt: z.string().describe(
      "Optional. User-provided guidance, focus areas, or custom evaluation instructions passed to the review agents.",
    ).optional(),
  }).describe("Optional. Run configuration parameters used for this review.")
    .optional(),
  requestId: z.string().describe(
    "Optional. Idempotency identifier for network retry safety (AIP-155). Must be a valid UUID4 string.",
  ).optional(),
  reviewId: z.string().describe(
    "Optional. The ID to use for the review, which will become the final component of the review's resource name. If not provided, a unique server-generated UUID will be assigned.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  endTime: z.string().optional(),
  name: z.string(),
  progressPercent: z.number().optional(),
  result: z.object({
    anchoredComments: z.array(z.object({
      bodyMarkdown: z.string(),
      citationReport: z.object({
        citationKey: z.string(),
        entryType: z.string(),
        extractedMetadata: z.object({
          authors: z.unknown(),
          doi: z.unknown(),
          journal: z.unknown(),
          pages: z.unknown(),
          publicationDate: z.unknown(),
          source: z.unknown(),
          title: z.unknown(),
          urls: z.unknown(),
          volume: z.unknown(),
        }),
        fieldComparisons: z.array(z.unknown()),
        finalVerdict: z.string(),
        firstAuthorFamilyNameMatch: z.boolean(),
        groundingUrls: z.array(z.unknown()),
        lookupVerdict: z.string(),
        rawReference: z.string(),
        refNum: z.number(),
        retrievedBibtex: z.string(),
        retrievedMetadata: z.object({
          authors: z.unknown(),
          doi: z.unknown(),
          journal: z.unknown(),
          pages: z.unknown(),
          publicationDate: z.unknown(),
          source: z.unknown(),
          title: z.unknown(),
          urls: z.unknown(),
          volume: z.unknown(),
        }),
        searchMethod: z.string(),
        searchRationale: z.string(),
        searchVerdict: z.string(),
      }),
      commentId: z.string(),
      location: z.object({
        pdf: z.object({
          boundingBoxes: z.unknown(),
          pageNumber: z.unknown(),
          quoteSelector: z.unknown(),
        }),
        text: z.object({
          firstColumn: z.unknown(),
          firstLine: z.unknown(),
          lastColumn: z.unknown(),
          lastLine: z.unknown(),
          quotedLinePreview: z.unknown(),
        }),
      }),
      severity: z.string(),
      suggestedEdit: z.string(),
      summary: z.string(),
    })),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    reviewMarkdown: z.string(),
  }).optional(),
  runConfig: z.object({
    geminiApiKey: z.string(),
    geminiApiKeySet: z.boolean(),
    model: z.string(),
    topology: z.string(),
    userPrompt: z.string(),
  }).optional(),
  startTime: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  name: z.string().describe(
    "Identifier. Resource name in format `documents/{document}/reviews/{review}`.",
  ).optional(),
  runConfig: z.object({
    geminiApiKey: z.string().describe(
      "Optional. Input only. Developer Bring-Your-Own-Key Gemini API key. When provided, requests are billed to the caller's Gemini API project. Input only; forwarded to the asynchronous review runner in the task payload and never persisted in database records or returned in review resources (see companion field `gemini_api_key_set`, AIP-147).",
    ).optional(),
    geminiApiKeySet: z.boolean().describe(
      "Output only. Indicates whether a developer Bring-Your-Own-Key Gemini API key was provided for this review run.",
    ).optional(),
    model: z.string().describe(
      "Optional. The Gemini model identifier to use for the review. If omitted, the server uses its default model. Unsupported values return INVALID_ARGUMENT.",
    ).optional(),
    topology: z.enum([
      "TOPOLOGY_UNSPECIFIED",
      "EXTRA_HIGH",
      "HIGH",
      "MID",
      "LOW",
    ]).describe("Optional. Review execution topology profile to use.")
      .optional(),
    userPrompt: z.string().describe(
      "Optional. User-provided guidance, focus areas, or custom evaluation instructions passed to the review agents.",
    ).optional(),
  }).describe("Optional. Run configuration parameters used for this review.")
    .optional(),
  requestId: z.string().describe(
    "Optional. Idempotency identifier for network retry safety (AIP-155). Must be a valid UUID4 string.",
  ).optional(),
  reviewId: z.string().describe(
    "Optional. The ID to use for the review, which will become the final component of the review's resource name. If not provided, a unique server-generated UUID will be assigned.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Deep Review Documents.Reviews. Registered at `@swamp/gcp/deepreview/documents-reviews`. */
export const model = {
  type: "@swamp/gcp/deepreview/documents-reviews",
  version: "2026.10.28.1",
  upgrades: [
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An evaluation run of a document.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a reviews",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["runConfig"] !== undefined) body["runConfig"] = g["runConfig"];
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["reviewId"] !== undefined) {
          params["reviewId"] = String(g["reviewId"]);
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING", "SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a reviews",
      arguments: z.object({
        identifier: z.string().describe("The name of the reviews"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Sync reviews state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific reviews by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List reviews resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Custom filter expressions are not currently supported; non-empty values return INVALID_ARGUMENT.",
        ).optional(),
        orderBy: z.string().describe(
          "Optional. Custom order_by expressions are not currently supported; non-empty values return INVALID_ARGUMENT.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of reviews to return in a single page. The server may return fewer than this value. If unspecified, at most 50 reviews will be returned. The maximum value is 100; values above 100 will be coerced to 100.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "reviews",
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
