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

// Auto-generated extension model for @swamp/gcp/storage/managedfolders
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage JSON ManagedFolders.
 *
 * A managed folder.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://storage.googleapis.com/storage/v1/";

const GET_CONFIG = {
  "id": "storage.managedFolders.get",
  "path": "b/{bucket}/managedFolders/{managedFolder}",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
    "managedFolder",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "ifMetagenerationMatch": {
      "location": "query",
    },
    "ifMetagenerationNotMatch": {
      "location": "query",
    },
    "managedFolder": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "storage.managedFolders.insert",
  "path": "b/{bucket}/managedFolders",
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
  "id": "storage.managedFolders.update",
  "path": "b/{bucket}/managedFolders/{managedFolder}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "bucket",
    "managedFolder",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "ifMetagenerationMatch": {
      "location": "query",
    },
    "ifMetagenerationNotMatch": {
      "location": "query",
    },
    "managedFolder": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "storage.managedFolders.delete",
  "path": "b/{bucket}/managedFolders/{managedFolder}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "bucket",
    "managedFolder",
  ],
  "parameters": {
    "allowNonEmpty": {
      "location": "query",
    },
    "bucket": {
      "location": "path",
      "required": true,
    },
    "ifMetagenerationMatch": {
      "location": "query",
    },
    "ifMetagenerationNotMatch": {
      "location": "query",
    },
    "managedFolder": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "storage.managedFolders.list",
  "path": "b/{bucket}/managedFolders",
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
    "prefix": {
      "location": "query",
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
  bucket: z.string().describe(
    "The name of the bucket containing this managed folder.",
  ).optional(),
  createTime: z.string().describe(
    "The creation time of the managed folder in RFC 3339 format.",
  ).optional(),
  id: z.string().describe(
    "The ID of the managed folder, including the bucket name and managed folder name.",
  ).optional(),
  metageneration: z.string().describe(
    "The version of the metadata for this managed folder. Used for preconditions and for detecting changes in metadata.",
  ).optional(),
  name: z.string().describe(
    "The name of the managed folder. Required if not specified by URL parameter.",
  ).optional(),
  rapidCacheConfig: z.object({
    policies: z.record(
      z.string(),
      z.object({
        ingestOnWrite: z.enum(["enabled", "unspecified"]).describe(
          "The ingest-on-write policy for objects in the managed folder. When set to `enabled`, objects are automatically ingested into the cache when they are written to the managed folder.",
        ).optional(),
        rapidCacheId: z.string().describe(
          "The unique identifier of the rapid cache.",
        ).optional(),
      }),
    ).describe(
      "A map of rapid cache IDs to the corresponding `RapidCachePolicy` configurations for a managed folder.",
    ).optional(),
  }).describe("The rapid cache configuration for the managed folder.")
    .optional(),
  updateTime: z.string().describe(
    "The last update time of the managed folder metadata in RFC 3339 format.",
  ).optional(),
  ifMetagenerationMatch: z.string().describe(
    "Makes the operation conditional on whether the metageneration of the managed folder matches the specified value.",
  ).optional(),
  ifMetagenerationNotMatch: z.string().describe(
    "Makes the operation conditional on whether the metageneration of the managed folder doesn't match the specified value.",
  ).optional(),
});

const StateSchema = z.object({
  bucket: z.string().optional(),
  createTime: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  metageneration: z.string().optional(),
  name: z.string(),
  rapidCacheConfig: z.object({
    policies: z.record(z.string(), z.unknown()),
  }).optional(),
  selfLink: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  bucket: z.string().describe(
    "The name of the bucket containing this managed folder.",
  ).optional(),
  createTime: z.string().describe(
    "The creation time of the managed folder in RFC 3339 format.",
  ).optional(),
  id: z.string().describe(
    "The ID of the managed folder, including the bucket name and managed folder name.",
  ).optional(),
  metageneration: z.string().describe(
    "The version of the metadata for this managed folder. Used for preconditions and for detecting changes in metadata.",
  ).optional(),
  name: z.string().describe(
    "The name of the managed folder. Required if not specified by URL parameter.",
  ).optional(),
  rapidCacheConfig: z.object({
    policies: z.record(
      z.string(),
      z.object({
        ingestOnWrite: z.enum(["enabled", "unspecified"]).describe(
          "The ingest-on-write policy for objects in the managed folder. When set to `enabled`, objects are automatically ingested into the cache when they are written to the managed folder.",
        ).optional(),
        rapidCacheId: z.string().describe(
          "The unique identifier of the rapid cache.",
        ).optional(),
      }),
    ).describe(
      "A map of rapid cache IDs to the corresponding `RapidCachePolicy` configurations for a managed folder.",
    ).optional(),
  }).describe("The rapid cache configuration for the managed folder.")
    .optional(),
  updateTime: z.string().describe(
    "The last update time of the managed folder metadata in RFC 3339 format.",
  ).optional(),
  ifMetagenerationMatch: z.string().describe(
    "Makes the operation conditional on whether the metageneration of the managed folder matches the specified value.",
  ).optional(),
  ifMetagenerationNotMatch: z.string().describe(
    "Makes the operation conditional on whether the metageneration of the managed folder doesn't match the specified value.",
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

/** Swamp extension model for Google Cloud Storage JSON ManagedFolders. Registered at `@swamp/gcp/storage/managedfolders`. */
export const model = {
  type: "@swamp/gcp/storage/managedfolders",
  version: "2026.10.06.1",
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
      toVersion: "2026.05.22.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.14.1",
      description: "Added: rapidCacheConfig",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.07.1",
      description: "Added: ifMetagenerationMatch, ifMetagenerationNotMatch",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      description: "A managed folder.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a managedFolders",
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
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["metageneration"] !== undefined) {
          body["metageneration"] = g["metageneration"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rapidCacheConfig"] !== undefined) {
          body["rapidCacheConfig"] = g["rapidCacheConfig"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["name"] !== undefined) {
          params["managedFolder"] = String(g["name"]);
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "bucket": String(g["bucket"] ?? "") },
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
      description: "Get a managedFolders",
      arguments: z.object({
        identifier: z.string().describe("The name of the managedFolders"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        params["managedFolder"] = args.identifier;
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
    update: {
      description: "Update managedFolders attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific managedFolders by name (e.g. one discovered by list)",
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
        const resourceId = existing["name"]?.toString() ??
          g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["managedFolder"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["metageneration"] !== undefined) {
          body["metageneration"] = g["metageneration"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["rapidCacheConfig"] !== undefined) {
          body["rapidCacheConfig"] = g["rapidCacheConfig"];
        }
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["ifMetagenerationMatch"] !== undefined) {
          params["ifMetagenerationMatch"] = String(g["ifMetagenerationMatch"]);
        } else if (existing["ifMetagenerationMatch"] !== undefined) {
          params["ifMetagenerationMatch"] = String(
            existing["ifMetagenerationMatch"],
          );
        }
        if (g["ifMetagenerationNotMatch"] !== undefined) {
          params["ifMetagenerationNotMatch"] = String(
            g["ifMetagenerationNotMatch"],
          );
        } else if (existing["ifMetagenerationNotMatch"] !== undefined) {
          params["ifMetagenerationNotMatch"] = String(
            existing["ifMetagenerationNotMatch"],
          );
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
    delete: {
      description: "Delete the managedFolders",
      arguments: z.object({
        identifier: z.string().describe("The name of the managedFolders"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        params["managedFolder"] = args.identifier;
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync managedFolders state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific managedFolders by name (e.g. one discovered by list)",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["managedFolder"] = identifier;
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
      description: "List managedFolders resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of items to return in a single page of responses.",
        ).optional(),
        prefix: z.string().describe(
          "The managed folder name/path prefix to filter the output list of results.",
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
        if (args["prefix"] !== undefined) {
          params["prefix"] = String(args["prefix"]);
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        optionsRequestedPolicyVersion: z.any().optional(),
        userProject: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
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
        params["managedFolder"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["optionsRequestedPolicyVersion"] !== undefined) {
          params["optionsRequestedPolicyVersion"] = String(
            args["optionsRequestedPolicyVersion"],
          );
        }
        if (args["userProject"] !== undefined) {
          params["userProject"] = String(args["userProject"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "storage.managedFolders.getIamPolicy",
            "path": "b/{bucket}/managedFolders/{managedFolder}/iam",
            "httpMethod": "GET",
            "parameterOrder": ["bucket", "managedFolder"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "managedFolder": { "location": "path", "required": true },
              "optionsRequestedPolicyVersion": { "location": "query" },
              "userProject": { "location": "query" },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        bindings: z.any().optional(),
        etag: z.any().optional(),
        kind: z.any().optional(),
        resourceId: z.any().optional(),
        version: z.any().optional(),
        userProject: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
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
        params["managedFolder"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["userProject"] !== undefined) {
          params["userProject"] = String(args["userProject"]);
        }
        const body: Record<string, unknown> = {};
        if (args["bindings"] !== undefined) body["bindings"] = args["bindings"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["resourceId"] !== undefined) {
          body["resourceId"] = args["resourceId"];
        }
        if (args["version"] !== undefined) body["version"] = args["version"];
        const result = await createResource(
          baseUrl,
          {
            "id": "storage.managedFolders.setIamPolicy",
            "path": "b/{bucket}/managedFolders/{managedFolder}/iam",
            "httpMethod": "PUT",
            "parameterOrder": ["bucket", "managedFolder"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "managedFolder": { "location": "path", "required": true },
              "userProject": { "location": "query" },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        userProject: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
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
        params["managedFolder"] = existing["name"]?.toString() ??
          g["managedFolder"]?.toString() ?? "";
        params["permissions"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        if (args["userProject"] !== undefined) {
          params["userProject"] = String(args["userProject"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "storage.managedFolders.testIamPermissions",
            "path":
              "b/{bucket}/managedFolders/{managedFolder}/iam/testPermissions",
            "httpMethod": "GET",
            "parameterOrder": ["bucket", "managedFolder", "permissions"],
            "parameters": {
              "bucket": { "location": "path", "required": true },
              "managedFolder": { "location": "path", "required": true },
              "permissions": { "location": "query", "required": true },
              "userProject": { "location": "query" },
            },
          },
          params,
          undefined,
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
