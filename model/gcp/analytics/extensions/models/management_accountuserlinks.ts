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

// Auto-generated extension model for @swamp/gcp/analytics/management-accountuserlinks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.AccountUserLinks.
 *
 * JSON template for an Analytics Entity-User Link. Returns permissions that a user has for an entity.
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
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const INSERT_CONFIG = {
  "id": "analytics.management.accountUserLinks.insert",
  "path": "management/accounts/{accountId}/entityUserLinks",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "analytics.management.accountUserLinks.update",
  "path": "management/accounts/{accountId}/entityUserLinks/{linkId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "linkId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "linkId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "analytics.management.accountUserLinks.delete",
  "path": "management/accounts/{accountId}/entityUserLinks/{linkId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "accountId",
    "linkId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "linkId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "analytics.management.accountUserLinks.list",
  "path": "management/accounts/{accountId}/entityUserLinks",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "max-results": {
      "location": "query",
    },
    "start-index": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  entity: z.object({
    accountRef: z.object({
      href: z.string().describe("Link for this account.").optional(),
      id: z.string().describe("Account ID.").optional(),
      kind: z.string().describe("Analytics account reference.").optional(),
      name: z.string().describe("Account name.").optional(),
    }).describe("JSON template for a linked account.").optional(),
    profileRef: z.object({
      accountId: z.string().describe(
        "Account ID to which this view (profile) belongs.",
      ).optional(),
      href: z.string().describe("Link for this view (profile).").optional(),
      id: z.string().describe("View (Profile) ID.").optional(),
      internalWebPropertyId: z.string().describe(
        "Internal ID for the web property to which this view (profile) belongs.",
      ).optional(),
      kind: z.string().describe("Analytics view (profile) reference.")
        .optional(),
      name: z.string().describe("Name of this view (profile).").optional(),
      webPropertyId: z.string().describe(
        "Web property ID of the form UA-XXXXX-YY to which this view (profile) belongs.",
      ).optional(),
    }).describe("JSON template for a linked view (profile).").optional(),
    webPropertyRef: z.object({
      accountId: z.string().describe(
        "Account ID to which this web property belongs.",
      ).optional(),
      href: z.string().describe("Link for this web property.").optional(),
      id: z.string().describe("Web property ID of the form UA-XXXXX-YY.")
        .optional(),
      internalWebPropertyId: z.string().describe(
        "Internal ID for this web property.",
      ).optional(),
      kind: z.string().describe("Analytics web property reference.").optional(),
      name: z.string().describe("Name of this web property.").optional(),
    }).describe("JSON template for a web property reference.").optional(),
  }).describe(
    "Entity for this link. It can be an account, a web property, or a view (profile).",
  ).optional(),
  id: z.string().describe("Entity user link ID").optional(),
  permissions: z.object({
    effective: z.array(z.string()).describe(
      "Effective permissions represent all the permissions that a user has for this entity. These include any implied permissions (e.g., EDIT implies VIEW) or inherited permissions from the parent entity. Effective permissions are read-only.",
    ).optional(),
    local: z.array(z.string()).describe(
      "Permissions that a user has been assigned at this very level. Does not include any implied or inherited permissions. Local permissions are modifiable.",
    ).optional(),
  }).describe("Permissions the user has for this entity.").optional(),
  userRef: z.object({
    email: z.string().describe("Email ID of this user.").optional(),
    id: z.string().describe("User ID.").optional(),
    kind: z.string().optional(),
  }).describe("JSON template for a user reference.").optional(),
  accountId: z.string().describe("Account ID to create the user link for."),
});

const StateSchema = z.object({
  entity: z.object({
    accountRef: z.object({
      href: z.string(),
      id: z.string(),
      kind: z.string(),
      name: z.string(),
    }),
    profileRef: z.object({
      accountId: z.string(),
      href: z.string(),
      id: z.string(),
      internalWebPropertyId: z.string(),
      kind: z.string(),
      name: z.string(),
      webPropertyId: z.string(),
    }),
    webPropertyRef: z.object({
      accountId: z.string(),
      href: z.string(),
      id: z.string(),
      internalWebPropertyId: z.string(),
      kind: z.string(),
      name: z.string(),
    }),
  }).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  permissions: z.object({
    effective: z.array(z.string()),
    local: z.array(z.string()),
  }).optional(),
  selfLink: z.string().optional(),
  userRef: z.object({
    email: z.string(),
    id: z.string(),
    kind: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  entity: z.object({
    accountRef: z.object({
      href: z.string().describe("Link for this account.").optional(),
      id: z.string().describe("Account ID.").optional(),
      kind: z.string().describe("Analytics account reference.").optional(),
      name: z.string().describe("Account name.").optional(),
    }).describe("JSON template for a linked account.").optional(),
    profileRef: z.object({
      accountId: z.string().describe(
        "Account ID to which this view (profile) belongs.",
      ).optional(),
      href: z.string().describe("Link for this view (profile).").optional(),
      id: z.string().describe("View (Profile) ID.").optional(),
      internalWebPropertyId: z.string().describe(
        "Internal ID for the web property to which this view (profile) belongs.",
      ).optional(),
      kind: z.string().describe("Analytics view (profile) reference.")
        .optional(),
      name: z.string().describe("Name of this view (profile).").optional(),
      webPropertyId: z.string().describe(
        "Web property ID of the form UA-XXXXX-YY to which this view (profile) belongs.",
      ).optional(),
    }).describe("JSON template for a linked view (profile).").optional(),
    webPropertyRef: z.object({
      accountId: z.string().describe(
        "Account ID to which this web property belongs.",
      ).optional(),
      href: z.string().describe("Link for this web property.").optional(),
      id: z.string().describe("Web property ID of the form UA-XXXXX-YY.")
        .optional(),
      internalWebPropertyId: z.string().describe(
        "Internal ID for this web property.",
      ).optional(),
      kind: z.string().describe("Analytics web property reference.").optional(),
      name: z.string().describe("Name of this web property.").optional(),
    }).describe("JSON template for a web property reference.").optional(),
  }).describe(
    "Entity for this link. It can be an account, a web property, or a view (profile).",
  ).optional(),
  id: z.string().describe("Entity user link ID").optional(),
  permissions: z.object({
    effective: z.array(z.string()).describe(
      "Effective permissions represent all the permissions that a user has for this entity. These include any implied permissions (e.g., EDIT implies VIEW) or inherited permissions from the parent entity. Effective permissions are read-only.",
    ).optional(),
    local: z.array(z.string()).describe(
      "Permissions that a user has been assigned at this very level. Does not include any implied or inherited permissions. Local permissions are modifiable.",
    ).optional(),
  }).describe("Permissions the user has for this entity.").optional(),
  userRef: z.object({
    email: z.string().describe("Email ID of this user.").optional(),
    id: z.string().describe("User ID.").optional(),
    kind: z.string().optional(),
  }).describe("JSON template for a user reference.").optional(),
  accountId: z.string().describe("Account ID to create the user link for.")
    .optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.AccountUserLinks. Registered at `@swamp/gcp/analytics/management-accountuserlinks`. */
export const model = {
  type: "@swamp/gcp/analytics/management-accountuserlinks",
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
      toVersion: "2026.05.25.1",
      description: "No schema changes",
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
        "JSON template for an Analytics Entity-User Link. Returns permissions that a u...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a accountUserLinks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["entity"] !== undefined) body["entity"] = g["entity"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["permissions"] !== undefined) {
          body["permissions"] = g["permissions"];
        }
        if (g["userRef"] !== undefined) body["userRef"] = g["userRef"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "accountId": String(g["accountId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a accountUserLinks",
      arguments: z.object({
        identifier: z.string().describe("The name of the accountUserLinks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Update accountUserLinks attributes",
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
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        } else if (existing["accountId"]) {
          params["accountId"] = String(existing["accountId"]);
        }
        params["linkId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["entity"] !== undefined) body["entity"] = g["entity"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["permissions"] !== undefined) {
          body["permissions"] = g["permissions"];
        }
        if (g["userRef"] !== undefined) body["userRef"] = g["userRef"];
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
      description: "Delete the accountUserLinks",
      arguments: z.object({
        identifier: z.string().describe("The name of the accountUserLinks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        params["linkId"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
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
      description: "Sync accountUserLinks state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
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
      description: "List accountUserLinks resources",
      arguments: z.object({
        max_results: z.number().describe(
          "The maximum number of account-user links to include in this response.",
        ).optional(),
        start_index: z.number().describe(
          "An index of the first account-user link to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (args["max_results"] !== undefined) {
          params["max-results"] = String(args["max_results"]);
        }
        if (args["start_index"] !== undefined) {
          params["start-index"] = String(args["start_index"]);
        }
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
