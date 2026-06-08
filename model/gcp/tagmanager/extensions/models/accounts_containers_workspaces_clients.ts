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

// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-workspaces-clients
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Clients.
 *
 * Gets a GTM Client.
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
  "id": "tagmanager.accounts.containers.workspaces.clients.get",
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
  "id": "tagmanager.accounts.containers.workspaces.clients.create",
  "path": "tagmanager/v2/{+parent}/clients",
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
  "id": "tagmanager.accounts.containers.workspaces.clients.update",
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
  "id": "tagmanager.accounts.containers.workspaces.clients.delete",
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
  "id": "tagmanager.accounts.containers.workspaces.clients.list",
  "path": "tagmanager/v2/{+parent}/clients",
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
  clientId: z.string().describe(
    "The Client ID uniquely identifies the GTM client.",
  ).optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Client as computed at storage time. This value is recomputed whenever the client is modified.",
  ).optional(),
  name: z.string().describe("Client display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this tag in the container.",
  ).optional(),
  parameter: z.array(z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.record(z.string(), z.unknown())).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.record(z.string(), z.unknown())).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  })).describe("The client's parameters.").optional(),
  parentFolderId: z.string().describe("Parent folder id.").optional(),
  path: z.string().describe("GTM client's API relative path.").optional(),
  priority: z.number().int().describe(
    "Priority determines relative firing order.",
  ).optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  type: z.string().describe("Client type.").optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  clientId: z.string().optional(),
  containerId: z.string().optional(),
  fingerprint: z.string().optional(),
  name: z.string(),
  notes: z.string().optional(),
  parameter: z.array(z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.record(z.string(), z.unknown())),
    map: z.array(z.record(z.string(), z.unknown())),
    type: z.string(),
    value: z.string(),
  })).optional(),
  parentFolderId: z.string().optional(),
  path: z.string().optional(),
  priority: z.number().optional(),
  tagManagerUrl: z.string().optional(),
  type: z.string().optional(),
  workspaceId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  accountId: z.string().describe("GTM Account ID.").optional(),
  clientId: z.string().describe(
    "The Client ID uniquely identifies the GTM client.",
  ).optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Client as computed at storage time. This value is recomputed whenever the client is modified.",
  ).optional(),
  name: z.string().describe("Client display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this tag in the container.",
  ).optional(),
  parameter: z.array(z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.record(z.string(), z.unknown())).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.record(z.string(), z.unknown())).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  })).describe("The client's parameters.").optional(),
  parentFolderId: z.string().describe("Parent folder id.").optional(),
  path: z.string().describe("GTM client's API relative path.").optional(),
  priority: z.number().int().describe(
    "Priority determines relative firing order.",
  ).optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  type: z.string().describe("Client type.").optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
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

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Clients. Registered at `@swamp/gcp/tagmanager/accounts-containers-workspaces-clients`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-workspaces-clients",
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
      toVersion: "2026.05.27.1",
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
      description: "Gets a GTM Client.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a clients",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["clientId"] !== undefined) body["clientId"] = g["clientId"];
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["parameter"] !== undefined) body["parameter"] = g["parameter"];
        if (g["parentFolderId"] !== undefined) {
          body["parentFolderId"] = g["parentFolderId"];
        }
        if (g["path"] !== undefined) body["path"] = g["path"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Get a clients",
      arguments: z.object({
        identifier: z.string().describe("The name of the clients"),
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
      description: "Update clients attributes",
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
        if (g["clientId"] !== undefined) body["clientId"] = g["clientId"];
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["parameter"] !== undefined) body["parameter"] = g["parameter"];
        if (g["parentFolderId"] !== undefined) {
          body["parentFolderId"] = g["parentFolderId"];
        }
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the clients",
      arguments: z.object({
        identifier: z.string().describe("The name of the clients"),
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
      description: "Sync clients state from GCP",
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
      description: "List clients resources",
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
          "client",
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
    revert: {
      description: "revert",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.workspaces.clients.revert",
            "path": "tagmanager/v2/{+path}:revert",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": {
              "fingerprint": { "location": "query" },
              "path": { "location": "path", "required": true },
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
