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

// Auto-generated extension model for @swamp/gcp/analytics/management-customdimensions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.CustomDimensions.
 *
 * JSON template for Analytics Custom Dimension.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.management.customDimensions.get",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions/{customDimensionId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "customDimensionId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "customDimensionId": {
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
  "id": "analytics.management.customDimensions.insert",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions",
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
  "id": "analytics.management.customDimensions.update",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions/{customDimensionId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "customDimensionId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "customDimensionId": {
      "location": "path",
      "required": true,
    },
    "ignoreCustomDataSourceLinks": {
      "location": "query",
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "analytics.management.customDimensions.list",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/customDimensions",
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
  accountId: z.string().describe("Account ID.").optional(),
  active: z.boolean().describe(
    "Boolean indicating whether the custom dimension is active.",
  ).optional(),
  created: z.string().describe("Time the custom dimension was created.")
    .optional(),
  id: z.string().describe("Custom dimension ID.").optional(),
  index: z.number().int().describe("Index of the custom dimension.").optional(),
  name: z.string().describe("Name of the custom dimension.").optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the property to which the custom dimension belongs.",
    ).optional(),
    type: z.string().describe(
      'Type of the parent link. Set to "analytics#webproperty".',
    ).optional(),
  }).describe(
    "Parent link for the custom dimension. Points to the property to which the custom dimension belongs.",
  ).optional(),
  scope: z.string().describe(
    "Scope of the custom dimension: HIT, SESSION, USER or PRODUCT.",
  ).optional(),
  updated: z.string().describe("Time the custom dimension was last modified.")
    .optional(),
  webPropertyId: z.string().describe("Property ID.").optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  active: z.boolean().optional(),
  created: z.string().optional(),
  id: z.string().optional(),
  index: z.number().optional(),
  kind: z.string().optional(),
  name: z.string(),
  parentLink: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  scope: z.string().optional(),
  selfLink: z.string().optional(),
  updated: z.string().optional(),
  webPropertyId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("Account ID.").optional(),
  active: z.boolean().describe(
    "Boolean indicating whether the custom dimension is active.",
  ).optional(),
  created: z.string().describe("Time the custom dimension was created.")
    .optional(),
  id: z.string().describe("Custom dimension ID.").optional(),
  index: z.number().int().describe("Index of the custom dimension.").optional(),
  name: z.string().describe("Name of the custom dimension.").optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the property to which the custom dimension belongs.",
    ).optional(),
    type: z.string().describe(
      'Type of the parent link. Set to "analytics#webproperty".',
    ).optional(),
  }).describe(
    "Parent link for the custom dimension. Points to the property to which the custom dimension belongs.",
  ).optional(),
  scope: z.string().describe(
    "Scope of the custom dimension: HIT, SESSION, USER or PRODUCT.",
  ).optional(),
  updated: z.string().describe("Time the custom dimension was last modified.")
    .optional(),
  webPropertyId: z.string().describe("Property ID.").optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.CustomDimensions. Registered at `@swamp/gcp/analytics/management-customdimensions`. */
export const model = {
  type: "@swamp/gcp/analytics/management-customdimensions",
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
      description: "JSON template for Analytics Custom Dimension.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customDimensions",
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
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["index"] !== undefined) body["index"] = g["index"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["name"] !== undefined) {
          params["customDimensionId"] = String(g["name"]);
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
      description: "Get a customDimensions",
      arguments: z.object({
        identifier: z.string().describe("The name of the customDimensions"),
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
        params["customDimensionId"] = args.identifier;
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
      description: "Update customDimensions attributes",
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
        params["customDimensionId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["index"] !== undefined) body["index"] = g["index"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
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
    sync: {
      description: "Sync customDimensions state from GCP",
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
          params["customDimensionId"] = identifier;
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
      description: "List customDimensions resources",
      arguments: z.object({
        max_results: z.number().describe(
          "The maximum number of custom dimensions to include in this response.",
        ).optional(),
        start_index: z.number().describe(
          "An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.",
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
