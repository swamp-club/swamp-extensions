// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/storage/rapidcaches
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage JSON RapidCaches.
 *
 * A Rapid Cache instance.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://storage.googleapis.com/storage/v1/";

const GET_CONFIG = {
  "id": "storage.rapidCaches.get",
  "path": "b/{bucket}/rapidCaches/{rapidCacheId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
    "rapidCacheId",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "rapidCacheId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "storage.rapidCaches.insert",
  "path": "b/{bucket}/rapidCaches",
  "httpMethod": "POST",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "storage.rapidCaches.update",
  "path": "b/{bucket}/rapidCaches/{rapidCacheId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "bucket",
    "rapidCacheId",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "rapidCacheId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "storage.rapidCaches.list",
  "path": "b/{bucket}/rapidCaches",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  admissionPolicy: z.string().describe(
    "The cache-level entry admission policy.",
  ).optional(),
  bucket: z.string().describe(
    "The name of the bucket containing this cache instance.",
  ).optional(),
  cacheType: z.string().describe(
    'The type of Rapid Cache this represents. Valid values include: "rapid-cache" and "rapid-cache-ultra".',
  ).optional(),
  createTime: z.string().describe(
    "The creation time of the cache instance in RFC 3339 format.",
  ).optional(),
  id: z.string().describe(
    "The ID of the resource, including the project number, bucket name and rapid cache ID.",
  ).optional(),
  ingestOnWrite: z.boolean().describe(
    "Specifies whether objects are ingested into the cache upon write.",
  ).optional(),
  pendingUpdate: z.boolean().describe(
    "True if the cache instance has an active Update long-running operation.",
  ).optional(),
  rapidCacheId: z.string().describe("The ID of the Rapid cache instance.")
    .optional(),
  state: z.string().describe("The current state of the cache instance.")
    .optional(),
  ttl: z.string().describe(
    'The TTL of all cache entries in whole seconds. e.g., "7200s".',
  ).optional(),
  updateTime: z.string().describe(
    "The modification time of the cache instance metadata in RFC 3339 format.",
  ).optional(),
  zone: z.string().describe(
    "The zone in which the cache instance is running. For example, us-central1-a.",
  ).optional(),
});

const StateSchema = z.object({
  admissionPolicy: z.string().optional(),
  bucket: z.string().optional(),
  cacheType: z.string().optional(),
  createTime: z.string().optional(),
  id: z.string().optional(),
  ingestOnWrite: z.boolean().optional(),
  kind: z.string().optional(),
  pendingUpdate: z.boolean().optional(),
  rapidCacheId: z.string().optional(),
  selfLink: z.string().optional(),
  state: z.string().optional(),
  ttl: z.string().optional(),
  updateTime: z.string().optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  admissionPolicy: z.string().describe(
    "The cache-level entry admission policy.",
  ).optional(),
  bucket: z.string().describe(
    "The name of the bucket containing this cache instance.",
  ).optional(),
  cacheType: z.string().describe(
    'The type of Rapid Cache this represents. Valid values include: "rapid-cache" and "rapid-cache-ultra".',
  ).optional(),
  createTime: z.string().describe(
    "The creation time of the cache instance in RFC 3339 format.",
  ).optional(),
  id: z.string().describe(
    "The ID of the resource, including the project number, bucket name and rapid cache ID.",
  ).optional(),
  ingestOnWrite: z.boolean().describe(
    "Specifies whether objects are ingested into the cache upon write.",
  ).optional(),
  pendingUpdate: z.boolean().describe(
    "True if the cache instance has an active Update long-running operation.",
  ).optional(),
  rapidCacheId: z.string().describe("The ID of the Rapid cache instance.")
    .optional(),
  state: z.string().describe("The current state of the cache instance.")
    .optional(),
  ttl: z.string().describe(
    'The TTL of all cache entries in whole seconds. e.g., "7200s".',
  ).optional(),
  updateTime: z.string().describe(
    "The modification time of the cache instance metadata in RFC 3339 format.",
  ).optional(),
  zone: z.string().describe(
    "The zone in which the cache instance is running. For example, us-central1-a.",
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

/** Swamp extension model for Google Cloud Storage JSON RapidCaches. Registered at `@swamp/gcp/storage/rapidcaches`. */
export const model = {
  type: "@swamp/gcp/storage/rapidcaches",
  version: "2026.10.06.1",
  upgrades: [
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A Rapid Cache instance.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a rapidCaches",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        const body: Record<string, unknown> = {};
        if (g["admissionPolicy"] !== undefined) {
          body["admissionPolicy"] = g["admissionPolicy"];
        }
        if (g["cacheType"] !== undefined) body["cacheType"] = g["cacheType"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["ingestOnWrite"] !== undefined) {
          body["ingestOnWrite"] = g["ingestOnWrite"];
        }
        if (g["pendingUpdate"] !== undefined) {
          body["pendingUpdate"] = g["pendingUpdate"];
        }
        if (g["rapidCacheId"] !== undefined) {
          body["rapidCacheId"] = g["rapidCacheId"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["zone"] !== undefined) body["zone"] = g["zone"];
        if (g["name"] !== undefined) params["rapidCacheId"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
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
      description: "Get a rapidCaches",
      arguments: z.object({
        identifier: z.string().describe("The name of the rapidCaches"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        params["rapidCacheId"] = args.identifier;
        const result = await readResource(
          baseUrl,
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
    update: {
      description: "Update rapidCaches attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific rapidCaches by name (e.g. one discovered by list)",
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
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        else if (existing["bucket"]) {
          params["bucket"] = String(existing["bucket"]);
        }
        const resourceId = existing["rapidCacheId"]?.toString() ??
          g["rapidCacheId"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["rapidCacheId"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["admissionPolicy"] !== undefined) {
          body["admissionPolicy"] = g["admissionPolicy"];
        }
        if (g["cacheType"] !== undefined) body["cacheType"] = g["cacheType"];
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["ingestOnWrite"] !== undefined) {
          body["ingestOnWrite"] = g["ingestOnWrite"];
        }
        if (g["pendingUpdate"] !== undefined) {
          body["pendingUpdate"] = g["pendingUpdate"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["ttl"] !== undefined) body["ttl"] = g["ttl"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["zone"] !== undefined) body["zone"] = g["zone"];
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          baseUrl,
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
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
    sync: {
      description: "Sync rapidCaches state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific rapidCaches by name (e.g. one discovered by list)",
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
          if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
          else if (existing["bucket"]) {
            params["bucket"] = String(existing["bucket"]);
          }
          const identifier = existing["rapidCacheId"]?.toString() ??
            g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["rapidCacheId"] = identifier;
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
      description: "List rapidCaches resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of items to return in a single page of responses.",
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
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
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
    disable: {
      description: "disable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        if (g["rapidCacheId"] !== undefined) {
          params["rapidCacheId"] = String(g["rapidCacheId"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "storage.rapidCaches.disable",
            "path": "b/{bucket}/rapidCaches/{rapidCacheId}/disable",
            "httpMethod": "POST",
            "parameterOrder": ["bucket", "rapidCacheId"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "rapidCacheId": { "location": "path", "required": true },
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
