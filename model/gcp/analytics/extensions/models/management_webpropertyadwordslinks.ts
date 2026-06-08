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

// Auto-generated extension model for @swamp/gcp/analytics/management-webpropertyadwordslinks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.WebPropertyAdWordsLinks.
 *
 * JSON template for Analytics Entity Google Ads Link.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.management.webPropertyAdWordsLinks.get",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "webPropertyAdWordsLinkId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "webPropertyAdWordsLinkId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "analytics.management.webPropertyAdWordsLinks.insert",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "analytics.management.webPropertyAdWordsLinks.update",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "webPropertyAdWordsLinkId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "webPropertyAdWordsLinkId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "analytics.management.webPropertyAdWordsLinks.delete",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks/{webPropertyAdWordsLinkId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "webPropertyAdWordsLinkId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "webPropertyAdWordsLinkId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "analytics.management.webPropertyAdWordsLinks.list",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/entityAdWordsLinks",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
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
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  adWordsAccounts: z.array(z.object({
    autoTaggingEnabled: z.boolean().describe(
      "True if auto-tagging is enabled on the Google Ads account. Read-only after the insert operation.",
    ).optional(),
    customerId: z.string().describe(
      "Customer ID. This field is required when creating a Google Ads link.",
    ).optional(),
    kind: z.string().describe("Resource type for Google Ads account.")
      .optional(),
  })).describe(
    "A list of Google Ads client accounts. These cannot be MCC accounts. This field is required when creating a Google Ads link. It cannot be empty.",
  ),
  entity: z.object({
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
  }).describe("Web property being linked.").optional(),
  id: z.string().describe("Entity Google Ads link ID").optional(),
  name: z.string().describe(
    "Name of the link. This field is required when creating a Google Ads link.",
  ),
  profileIds: z.array(z.string()).describe(
    "IDs of linked Views (Profiles) represented as strings.",
  ).optional(),
  accountId: z.string().describe(
    "ID of the Google Analytics account to create the link for.",
  ),
  webPropertyId: z.string().describe("Web property ID to create the link for."),
});

const StateSchema = z.object({
  adWordsAccounts: z.array(z.object({
    autoTaggingEnabled: z.boolean(),
    customerId: z.string(),
    kind: z.string(),
  })).optional(),
  entity: z.object({
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
  name: z.string(),
  profileIds: z.array(z.string()).optional(),
  selfLink: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  adWordsAccounts: z.array(z.object({
    autoTaggingEnabled: z.boolean().describe(
      "True if auto-tagging is enabled on the Google Ads account. Read-only after the insert operation.",
    ).optional(),
    customerId: z.string().describe(
      "Customer ID. This field is required when creating a Google Ads link.",
    ).optional(),
    kind: z.string().describe("Resource type for Google Ads account.")
      .optional(),
  })).describe(
    "A list of Google Ads client accounts. These cannot be MCC accounts. This field is required when creating a Google Ads link. It cannot be empty.",
  ).optional(),
  entity: z.object({
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
  }).describe("Web property being linked.").optional(),
  id: z.string().describe("Entity Google Ads link ID").optional(),
  name: z.string().describe(
    "Name of the link. This field is required when creating a Google Ads link.",
  ).optional(),
  profileIds: z.array(z.string()).describe(
    "IDs of linked Views (Profiles) represented as strings.",
  ).optional(),
  accountId: z.string().describe(
    "ID of the Google Analytics account to create the link for.",
  ).optional(),
  webPropertyId: z.string().describe("Web property ID to create the link for.")
    .optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.WebPropertyAdWordsLinks. Registered at `@swamp/gcp/analytics/management-webpropertyadwordslinks`. */
export const model = {
  type: "@swamp/gcp/analytics/management-webpropertyadwordslinks",
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
      description: "JSON template for Analytics Entity Google Ads Link.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a webPropertyAdWordsLinks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["adWordsAccounts"] !== undefined) {
          body["adWordsAccounts"] = g["adWordsAccounts"];
        }
        if (g["entity"] !== undefined) body["entity"] = g["entity"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["profileIds"] !== undefined) body["profileIds"] = g["profileIds"];
        if (g["name"] !== undefined) {
          params["webPropertyAdWordsLinkId"] = String(g["name"]);
        }
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
              "accountId": String(g["accountId"] ?? ""),
              "webPropertyId": String(g["webPropertyId"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a webPropertyAdWordsLinks",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the webPropertyAdWordsLinks",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        params["webPropertyAdWordsLinkId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Update webPropertyAdWordsLinks attributes",
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
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        } else if (existing["webPropertyId"]) {
          params["webPropertyId"] = String(existing["webPropertyId"]);
        }
        params["webPropertyAdWordsLinkId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["adWordsAccounts"] !== undefined) {
          body["adWordsAccounts"] = g["adWordsAccounts"];
        }
        if (g["entity"] !== undefined) body["entity"] = g["entity"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["profileIds"] !== undefined) body["profileIds"] = g["profileIds"];
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
      description: "Delete the webPropertyAdWordsLinks",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the webPropertyAdWordsLinks",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        params["webPropertyAdWordsLinkId"] = args.identifier;
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
      description: "Sync webPropertyAdWordsLinks state from GCP",
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
          if (g["webPropertyId"] !== undefined) {
            params["webPropertyId"] = String(g["webPropertyId"]);
          } else if (existing["webPropertyId"]) {
            params["webPropertyId"] = String(existing["webPropertyId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["webPropertyAdWordsLinkId"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
      description: "List webPropertyAdWordsLinks resources",
      arguments: z.object({
        max_results: z.number().describe(
          "The maximum number of webProperty-Google Ads links to include in this response.",
        ).optional(),
        start_index: z.number().describe(
          "An index of the first webProperty-Google Ads link to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.",
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
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
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
