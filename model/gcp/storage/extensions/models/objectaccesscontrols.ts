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

// Auto-generated extension model for @swamp/gcp/storage/objectaccesscontrols
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Storage JSON ObjectAccessControls.
 *
 * An access-control entry.
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
  "id": "storage.objectAccessControls.get",
  "path": "b/{bucket}/o/{object}/acl/{entity}",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
    "object",
    "entity",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "entity": {
      "location": "path",
      "required": true,
    },
    "generation": {
      "location": "query",
    },
    "object": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "storage.objectAccessControls.insert",
  "path": "b/{bucket}/o/{object}/acl",
  "httpMethod": "POST",
  "parameterOrder": [
    "bucket",
    "object",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "generation": {
      "location": "query",
    },
    "object": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "storage.objectAccessControls.update",
  "path": "b/{bucket}/o/{object}/acl/{entity}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "bucket",
    "object",
    "entity",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "entity": {
      "location": "path",
      "required": true,
    },
    "generation": {
      "location": "query",
    },
    "object": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "storage.objectAccessControls.delete",
  "path": "b/{bucket}/o/{object}/acl/{entity}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "bucket",
    "object",
    "entity",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "entity": {
      "location": "path",
      "required": true,
    },
    "generation": {
      "location": "query",
    },
    "object": {
      "location": "path",
      "required": true,
    },
    "userProject": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "storage.objectAccessControls.list",
  "path": "b/{bucket}/o/{object}/acl",
  "httpMethod": "GET",
  "parameterOrder": [
    "bucket",
    "object",
  ],
  "parameters": {
    "bucket": {
      "location": "path",
      "required": true,
    },
    "generation": {
      "location": "query",
    },
    "object": {
      "location": "path",
      "required": true,
    },
    "userProject": {
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
  bucket: z.string().describe("The name of the bucket.").optional(),
  domain: z.string().describe("The domain associated with the entity, if any.")
    .optional(),
  email: z.string().describe(
    "The email address associated with the entity, if any.",
  ).optional(),
  entity: z.string().describe(
    "The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.",
  ).optional(),
  entityId: z.string().describe("The ID for the entity, if any.").optional(),
  generation: z.string().describe(
    "The content generation of the object, if applied to an object.",
  ).optional(),
  id: z.string().describe("The ID of the access-control entry.").optional(),
  object: z.string().describe(
    "The name of the object, if applied to an object.",
  ).optional(),
  projectTeam: z.object({
    projectNumber: z.string().describe("The project number.").optional(),
    team: z.string().describe("The team.").optional(),
  }).describe("The project team associated with the entity, if any.")
    .optional(),
  role: z.string().describe("The access permission for the entity.").optional(),
  userProject: z.string().describe(
    "The project to be billed for this request. Required for Requester Pays buckets.",
  ).optional(),
});

const StateSchema = z.object({
  bucket: z.string().optional(),
  domain: z.string().optional(),
  email: z.string().optional(),
  entity: z.string().optional(),
  entityId: z.string().optional(),
  etag: z.string().optional(),
  generation: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  object: z.string().optional(),
  projectTeam: z.object({
    projectNumber: z.string(),
    team: z.string(),
  }).optional(),
  role: z.string().optional(),
  selfLink: z.string().optional(),
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
  bucket: z.string().describe("The name of the bucket.").optional(),
  domain: z.string().describe("The domain associated with the entity, if any.")
    .optional(),
  email: z.string().describe(
    "The email address associated with the entity, if any.",
  ).optional(),
  entity: z.string().describe(
    "The entity holding the permission, in one of the following forms: - user-userId - user-email - group-groupId - group-email - domain-domain - project-team-projectId - allUsers - allAuthenticatedUsers Examples: - The user liz@example.com would be user-liz@example.com. - The group example@googlegroups.com would be group-example@googlegroups.com. - To refer to all members of the Google Apps for Business domain example.com, the entity would be domain-example.com.",
  ).optional(),
  entityId: z.string().describe("The ID for the entity, if any.").optional(),
  generation: z.string().describe(
    "The content generation of the object, if applied to an object.",
  ).optional(),
  id: z.string().describe("The ID of the access-control entry.").optional(),
  object: z.string().describe(
    "The name of the object, if applied to an object.",
  ).optional(),
  projectTeam: z.object({
    projectNumber: z.string().describe("The project number.").optional(),
    team: z.string().describe("The team.").optional(),
  }).describe("The project team associated with the entity, if any.")
    .optional(),
  role: z.string().describe("The access permission for the entity.").optional(),
  userProject: z.string().describe(
    "The project to be billed for this request. Required for Requester Pays buckets.",
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

/** Swamp extension model for Google Cloud Storage JSON ObjectAccessControls. Registered at `@swamp/gcp/storage/objectaccesscontrols`. */
export const model = {
  type: "@swamp/gcp/storage/objectaccesscontrols",
  version: "2026.09.29.1",
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
      toVersion: "2026.07.21.3",
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
      toVersion: "2026.08.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An access-control entry.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a objectAccessControls",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["entity", "role"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        if (g["object"] !== undefined) params["object"] = String(g["object"]);
        const body: Record<string, unknown> = {};
        if (g["domain"] !== undefined) body["domain"] = g["domain"];
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["entity"] !== undefined) body["entity"] = g["entity"];
        if (g["entityId"] !== undefined) body["entityId"] = g["entityId"];
        if (g["generation"] !== undefined) {
          params["generation"] = String(g["generation"]);
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["projectTeam"] !== undefined) {
          body["projectTeam"] = g["projectTeam"];
        }
        if (g["role"] !== undefined) body["role"] = g["role"];
        if (g["userProject"] !== undefined) {
          params["userProject"] = String(g["userProject"]);
        }
        if (g["name"] !== undefined) params["entity"] = String(g["name"]);
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
      description: "Get a objectAccessControls",
      arguments: z.object({
        identifier: z.string().describe("The name of the objectAccessControls"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        if (g["object"] !== undefined) params["object"] = String(g["object"]);
        params["entity"] = args.identifier;
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
      description: "Update objectAccessControls attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific objectAccessControls by name (e.g. one discovered by list)",
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
        if (g["object"] !== undefined) params["object"] = String(g["object"]);
        else if (existing["object"]) {
          params["object"] = String(existing["object"]);
        }
        params["entity"] = existing["entity"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["domain"] !== undefined) body["domain"] = g["domain"];
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["entityId"] !== undefined) body["entityId"] = g["entityId"];
        if (g["generation"] !== undefined) {
          params["generation"] = String(g["generation"]);
        } else if (existing["generation"] !== undefined) {
          params["generation"] = String(existing["generation"]);
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["projectTeam"] !== undefined) {
          body["projectTeam"] = g["projectTeam"];
        }
        if (g["role"] !== undefined) body["role"] = g["role"];
        let live: Record<string, unknown> | undefined;
        const unset = [
          "domain",
          "email",
          "entityId",
          "id",
          "projectTeam",
          "role",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          live = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
          ) as Record<string, unknown>;
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const missingForUpdate = ["role"].filter((k) => body[k] === undefined);
        if (missingForUpdate.length > 0) {
          throw new Error(
            "update requires global arguments: " + missingForUpdate.join(", "),
          );
        }
        const concurrency: Record<string, unknown> = live ?? existing;
        for (const key of Object.keys(concurrency)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = concurrency[key];
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
      description: "Delete the objectAccessControls",
      arguments: z.object({
        identifier: z.string().describe("The name of the objectAccessControls"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["bucket"] !== undefined) params["bucket"] = String(g["bucket"]);
        if (g["object"] !== undefined) params["object"] = String(g["object"]);
        params["entity"] = args.identifier;
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
      description: "Sync objectAccessControls state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific objectAccessControls by name (e.g. one discovered by list)",
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
          if (g["object"] !== undefined) params["object"] = String(g["object"]);
          else if (existing["object"]) {
            params["object"] = String(existing["object"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["entity"] = identifier;
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
      description: "List objectAccessControls resources",
      arguments: z.object({
        generation: z.string().describe(
          "If present, selects a specific revision of this object (as opposed to the latest version, the default).",
        ).optional(),
        userProject: z.string().describe(
          "The project to be billed for this request. Required for Requester Pays buckets.",
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
        if (g["object"] !== undefined) params["object"] = String(g["object"]);
        if (args["generation"] !== undefined) {
          params["generation"] = String(args["generation"]);
        }
        if (args["userProject"] !== undefined) {
          params["userProject"] = String(args["userProject"]);
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
  },
};
