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

// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-environments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Environments.
 *
 * Represents a Google Tag Manager Environment. Note that a user can create, delete and update environments of type USER, but can only update the enable_debug and url fields of environments of other types.
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

const BASE_URL = "https://tagmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "tagmanager.accounts.containers.environments.get",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "GET",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "tagmanager.accounts.containers.environments.create",
  "path": "tagmanager/v2/{+parent}/environments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "tagmanager.accounts.containers.environments.update",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "fingerprint": {
      "location": "query",
    },
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "tagmanager.accounts.containers.environments.delete",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "tagmanager.accounts.containers.environments.list",
  "path": "tagmanager/v2/{+parent}/environments",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  accountId: z.string().describe("GTM Account ID.").optional(),
  authorizationCode: z.string().describe("The environment authorization code.")
    .optional(),
  authorizationTimestamp: z.string().describe(
    "The last update time-stamp for the authorization code.",
  ).optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  containerVersionId: z.string().describe(
    "Represents a link to a container version.",
  ).optional(),
  description: z.string().describe(
    "The environment description. Can be set or changed only on USER type environments.",
  ).optional(),
  enableDebug: z.boolean().describe(
    "Whether or not to enable debug by default for the environment.",
  ).optional(),
  environmentId: z.string().describe(
    "GTM Environment ID uniquely identifies the GTM Environment.",
  ).optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM environment as computed at storage time. This value is recomputed whenever the environment is modified.",
  ).optional(),
  name: z.string().describe(
    "The environment display name. Can be set or changed only on USER type environments.",
  ).optional(),
  path: z.string().describe("GTM Environment's API relative path.").optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  type: z.enum(["user", "live", "latest", "workspace"]).describe(
    "The type of this environment.",
  ).optional(),
  url: z.string().describe("Default preview page url for the environment.")
    .optional(),
  workspaceId: z.string().describe(
    "Represents a link to a quick preview of a workspace.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  authorizationCode: z.string().optional(),
  authorizationTimestamp: z.string().optional(),
  containerId: z.string().optional(),
  containerVersionId: z.string().optional(),
  description: z.string().optional(),
  enableDebug: z.boolean().optional(),
  environmentId: z.string().optional(),
  fingerprint: z.string().optional(),
  name: z.string(),
  path: z.string().optional(),
  tagManagerUrl: z.string().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
  workspaceId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  accountId: z.string().describe("GTM Account ID.").optional(),
  authorizationCode: z.string().describe("The environment authorization code.")
    .optional(),
  authorizationTimestamp: z.string().describe(
    "The last update time-stamp for the authorization code.",
  ).optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  containerVersionId: z.string().describe(
    "Represents a link to a container version.",
  ).optional(),
  description: z.string().describe(
    "The environment description. Can be set or changed only on USER type environments.",
  ).optional(),
  enableDebug: z.boolean().describe(
    "Whether or not to enable debug by default for the environment.",
  ).optional(),
  environmentId: z.string().describe(
    "GTM Environment ID uniquely identifies the GTM Environment.",
  ).optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM environment as computed at storage time. This value is recomputed whenever the environment is modified.",
  ).optional(),
  name: z.string().describe(
    "The environment display name. Can be set or changed only on USER type environments.",
  ).optional(),
  path: z.string().describe("GTM Environment's API relative path.").optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  type: z.enum(["user", "live", "latest", "workspace"]).describe(
    "The type of this environment.",
  ).optional(),
  url: z.string().describe("Default preview page url for the environment.")
    .optional(),
  workspaceId: z.string().describe(
    "Represents a link to a quick preview of a workspace.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Environments. Registered at `@swamp/gcp/tagmanager/accounts-containers-environments`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-environments",
  version: "2026.06.08.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Google Tag Manager Environment. Note that a user can create, del...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a environments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["authorizationCode"] !== undefined) {
          body["authorizationCode"] = g["authorizationCode"];
        }
        if (g["authorizationTimestamp"] !== undefined) {
          body["authorizationTimestamp"] = g["authorizationTimestamp"];
        }
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["containerVersionId"] !== undefined) {
          body["containerVersionId"] = g["containerVersionId"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableDebug"] !== undefined) {
          body["enableDebug"] = g["enableDebug"];
        }
        if (g["environmentId"] !== undefined) {
          body["environmentId"] = g["environmentId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["path"] !== undefined) body["path"] = g["path"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["url"] !== undefined) body["url"] = g["url"];
        if (g["workspaceId"] !== undefined) {
          body["workspaceId"] = g["workspaceId"];
        }
        if (g["name"] !== undefined) params["path"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
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
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["path"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update environments attributes",
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
        params["path"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["authorizationCode"] !== undefined) {
          body["authorizationCode"] = g["authorizationCode"];
        }
        if (g["authorizationTimestamp"] !== undefined) {
          body["authorizationTimestamp"] = g["authorizationTimestamp"];
        }
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["containerVersionId"] !== undefined) {
          body["containerVersionId"] = g["containerVersionId"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enableDebug"] !== undefined) {
          body["enableDebug"] = g["enableDebug"];
        }
        if (g["environmentId"] !== undefined) {
          body["environmentId"] = g["environmentId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["url"] !== undefined) body["url"] = g["url"];
        if (g["workspaceId"] !== undefined) {
          body["workspaceId"] = g["workspaceId"];
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
          BASE_URL,
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
      description: "Delete the environments",
      arguments: z.object({
        identifier: z.string().describe("The name of the environments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["path"] = args.identifier;
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
      description: "Sync environments state from GCP",
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
          params["path"] = identifier;
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
      description: "List environments resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "environment",
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
    reauthorize: {
      description: "reauthorize",
      arguments: z.object({
        accountId: z.any().optional(),
        authorizationCode: z.any().optional(),
        authorizationTimestamp: z.any().optional(),
        containerId: z.any().optional(),
        containerVersionId: z.any().optional(),
        description: z.any().optional(),
        enableDebug: z.any().optional(),
        environmentId: z.any().optional(),
        fingerprint: z.any().optional(),
        name: z.any().optional(),
        path: z.any().optional(),
        tagManagerUrl: z.any().optional(),
        type: z.any().optional(),
        url: z.any().optional(),
        workspaceId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const body: Record<string, unknown> = {};
        if (args["accountId"] !== undefined) {
          body["accountId"] = args["accountId"];
        }
        if (args["authorizationCode"] !== undefined) {
          body["authorizationCode"] = args["authorizationCode"];
        }
        if (args["authorizationTimestamp"] !== undefined) {
          body["authorizationTimestamp"] = args["authorizationTimestamp"];
        }
        if (args["containerId"] !== undefined) {
          body["containerId"] = args["containerId"];
        }
        if (args["containerVersionId"] !== undefined) {
          body["containerVersionId"] = args["containerVersionId"];
        }
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["enableDebug"] !== undefined) {
          body["enableDebug"] = args["enableDebug"];
        }
        if (args["environmentId"] !== undefined) {
          body["environmentId"] = args["environmentId"];
        }
        if (args["fingerprint"] !== undefined) {
          body["fingerprint"] = args["fingerprint"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["path"] !== undefined) body["path"] = args["path"];
        if (args["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = args["tagManagerUrl"];
        }
        if (args["type"] !== undefined) body["type"] = args["type"];
        if (args["url"] !== undefined) body["url"] = args["url"];
        if (args["workspaceId"] !== undefined) {
          body["workspaceId"] = args["workspaceId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.environments.reauthorize",
            "path": "tagmanager/v2/{+path}:reauthorize",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": { "path": { "location": "path", "required": true } },
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
  },
};
