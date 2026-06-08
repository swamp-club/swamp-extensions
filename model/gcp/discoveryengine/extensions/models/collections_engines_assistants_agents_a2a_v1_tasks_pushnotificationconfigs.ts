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

// Auto-generated extension model for @swamp/gcp/discoveryengine/collections-engines-assistants-agents-a2a-v1-tasks-pushnotificationconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Discovery Engine Collections.Engines.Assistants.Agents.A2a.V1.Tasks.PushNotificationConfigs.
 *
 * Get a push notification config for a task.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://discoveryengine.googleapis.com/";

const GET_CONFIG = {
  "id":
    "discoveryengine.projects.locations.collections.engines.assistants.agents.a2a.v1.tasks.pushNotificationConfigs.get",
  "path": "v1/{+tenant}/a2a/v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "tenant",
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "tenant": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id":
    "discoveryengine.projects.locations.collections.engines.assistants.agents.a2a.v1.tasks.pushNotificationConfigs.create",
  "path": "v1/{+tenant}/a2a/v1/{+parent}",
  "httpMethod": "POST",
  "parameterOrder": [
    "tenant",
    "parent",
  ],
  "parameters": {
    "configId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "tenant": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "discoveryengine.projects.locations.collections.engines.assistants.agents.a2a.v1.tasks.pushNotificationConfigs.delete",
  "path": "v1/{+tenant}/a2a/v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "tenant",
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "tenant": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id":
    "discoveryengine.projects.locations.collections.engines.assistants.agents.a2a.v1.tasks.pushNotificationConfigs.list",
  "path": "v1/{+tenant}/a2a/v1/{+parent}/pushNotificationConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "tenant",
    "parent",
  ],
  "parameters": {
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
    "tenant": {
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
  name: z.string().describe(
    "The resource name of the config. Format: tasks/{task_id}/pushNotificationConfigs/{config_id}",
  ).optional(),
  pushNotificationConfig: z.object({
    authentication: z.object({
      credentials: z.string().describe("Optional credentials").optional(),
      schemes: z.array(z.string()).describe(
        "Supported authentication schemes - e.g. Basic, Bearer, etc",
      ).optional(),
    }).describe("Defines authentication details, used for push notifications.")
      .optional(),
    id: z.string().describe(
      "A unique identifier (e.g. UUID) for this push notification.",
    ).optional(),
    token: z.string().describe("Token unique for this task/session").optional(),
    url: z.string().describe("Url to send the notification too").optional(),
  }).describe(
    "Configuration for setting up push notifications for task updates.",
  ).optional(),
  tenant: z.string().describe(
    "Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release.",
  ),
  configId: z.string().describe("Required. The ID for the new config.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  name: z.string(),
  pushNotificationConfig: z.object({
    authentication: z.object({
      credentials: z.string(),
      schemes: z.array(z.string()),
    }),
    id: z.string(),
    token: z.string(),
    url: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  name: z.string().describe(
    "The resource name of the config. Format: tasks/{task_id}/pushNotificationConfigs/{config_id}",
  ).optional(),
  pushNotificationConfig: z.object({
    authentication: z.object({
      credentials: z.string().describe("Optional credentials").optional(),
      schemes: z.array(z.string()).describe(
        "Supported authentication schemes - e.g. Basic, Bearer, etc",
      ).optional(),
    }).describe("Defines authentication details, used for push notifications.")
      .optional(),
    id: z.string().describe(
      "A unique identifier (e.g. UUID) for this push notification.",
    ).optional(),
    token: z.string().describe("Token unique for this task/session").optional(),
    url: z.string().describe("Url to send the notification too").optional(),
  }).describe(
    "Configuration for setting up push notifications for task updates.",
  ).optional(),
  tenant: z.string().describe(
    "Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release.",
  ).optional(),
  configId: z.string().describe("Required. The ID for the new config.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Discovery Engine Collections.Engines.Assistants.Agents.A2a.V1.Tasks.PushNotificationConfigs. Registered at `@swamp/gcp/discoveryengine/collections-engines-assistants-agents-a2a-v1-tasks-pushnotificationconfigs`. */
export const model = {
  type:
    "@swamp/gcp/discoveryengine/collections-engines-assistants-agents-a2a-v1-tasks-pushnotificationconfigs",
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
      toVersion: "2026.05.18.1",
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
      description: "Get a push notification config for a task.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a pushNotificationConfigs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["tenant"] !== undefined) params["tenant"] = String(g["tenant"]);
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["pushNotificationConfig"] !== undefined) {
          body["pushNotificationConfig"] = g["pushNotificationConfig"];
        }
        if (g["configId"] !== undefined) body["configId"] = g["configId"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
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
              "tenant": String(g["tenant"] ?? ""),
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
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
      description: "Get a pushNotificationConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the pushNotificationConfigs",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["tenant"] !== undefined) params["tenant"] = String(g["tenant"]);
        params["name"] = args.identifier;
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
    delete: {
      description: "Delete the pushNotificationConfigs",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the pushNotificationConfigs",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["tenant"] !== undefined) params["tenant"] = String(g["tenant"]);
        params["name"] = args.identifier;
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
      description: "Sync pushNotificationConfigs state from GCP",
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
          if (g["tenant"] !== undefined) params["tenant"] = String(g["tenant"]);
          else if (existing["tenant"]) {
            params["tenant"] = String(existing["tenant"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
      description: "List pushNotificationConfigs resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "For AIP-158 these fields are present. Usually not used/needed. The maximum number of configurations to return. If unspecified, all configs will be returned.",
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
        if (g["tenant"] !== undefined) params["tenant"] = String(g["tenant"]);
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "configs",
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
