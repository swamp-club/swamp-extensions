// Auto-generated extension model for @swamp/gcp/analytics/management-webproperties
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.Webproperties.
 *
 * JSON template for an Analytics web property.
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
  "id": "analytics.management.webproperties.get",
  "path": "management/accounts/{accountId}/webproperties/{webPropertyId}",
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
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "analytics.management.webproperties.insert",
  "path": "management/accounts/{accountId}/webproperties",
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
  "id": "analytics.management.webproperties.update",
  "path": "management/accounts/{accountId}/webproperties/{webPropertyId}",
  "httpMethod": "PUT",
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

const LIST_CONFIG = {
  "id": "analytics.management.webproperties.list",
  "path": "management/accounts/{accountId}/webproperties",
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
  accountId: z.string().describe(
    "Account ID to which this web property belongs.",
  ).optional(),
  childLink: z.object({
    href: z.string().describe(
      "Link to the list of views (profiles) for this web property.",
    ).optional(),
    type: z.string().describe(
      'Type of the parent link. Its value is "analytics#profiles".',
    ).optional(),
  }).describe(
    "Child link for this web property. Points to the list of views (profiles) for this web property.",
  ).optional(),
  created: z.string().describe("Time this web property was created.")
    .optional(),
  dataRetentionResetOnNewActivity: z.boolean().describe(
    "Set to true to reset the retention period of the user identifier with each new event from that user (thus setting the expiration date to current time plus retention period). Set to false to delete data associated with the user identifier automatically after the rentention period. This property cannot be set on insert.",
  ).optional(),
  dataRetentionTtl: z.string().describe(
    "The length of time for which user and event data is retained. This property cannot be set on insert.",
  ).optional(),
  defaultProfileId: z.string().describe("Default view (profile) ID.")
    .optional(),
  id: z.string().describe("Web property ID of the form UA-XXXXX-YY.")
    .optional(),
  industryVertical: z.string().describe(
    "The industry vertical/category selected for this web property.",
  ).optional(),
  internalWebPropertyId: z.string().describe(
    "Internal ID for this web property.",
  ).optional(),
  level: z.string().describe(
    "Level for this web property. Possible values are STANDARD or PREMIUM.",
  ).optional(),
  name: z.string().describe("Name of this web property.").optional(),
  parentLink: z.object({
    href: z.string().describe("Link to the account for this web property.")
      .optional(),
    type: z.string().describe(
      'Type of the parent link. Its value is "analytics#account".',
    ).optional(),
  }).describe(
    "Parent link for this web property. Points to the account to which this web property belongs.",
  ).optional(),
  permissions: z.object({
    effective: z.array(z.string()).describe(
      "All the permissions that the user has for this web property. These include any implied permissions (e.g., EDIT implies VIEW) or inherited permissions from the parent account.",
    ).optional(),
  }).describe("Permissions the user has for this web property.").optional(),
  profileCount: z.number().int().describe(
    "View (Profile) count for this web property.",
  ).optional(),
  starred: z.boolean().describe(
    "Indicates whether this web property is starred or not.",
  ).optional(),
  updated: z.string().describe("Time this web property was last modified.")
    .optional(),
  websiteUrl: z.string().describe("Website url for this web property.")
    .optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  childLink: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  created: z.string().optional(),
  dataRetentionResetOnNewActivity: z.boolean().optional(),
  dataRetentionTtl: z.string().optional(),
  defaultProfileId: z.string().optional(),
  id: z.string().optional(),
  industryVertical: z.string().optional(),
  internalWebPropertyId: z.string().optional(),
  kind: z.string().optional(),
  level: z.string().optional(),
  name: z.string(),
  parentLink: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  permissions: z.object({
    effective: z.array(z.string()),
  }).optional(),
  profileCount: z.number().optional(),
  selfLink: z.string().optional(),
  starred: z.boolean().optional(),
  updated: z.string().optional(),
  websiteUrl: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID to which this web property belongs.",
  ).optional(),
  childLink: z.object({
    href: z.string().describe(
      "Link to the list of views (profiles) for this web property.",
    ).optional(),
    type: z.string().describe(
      'Type of the parent link. Its value is "analytics#profiles".',
    ).optional(),
  }).describe(
    "Child link for this web property. Points to the list of views (profiles) for this web property.",
  ).optional(),
  created: z.string().describe("Time this web property was created.")
    .optional(),
  dataRetentionResetOnNewActivity: z.boolean().describe(
    "Set to true to reset the retention period of the user identifier with each new event from that user (thus setting the expiration date to current time plus retention period). Set to false to delete data associated with the user identifier automatically after the rentention period. This property cannot be set on insert.",
  ).optional(),
  dataRetentionTtl: z.string().describe(
    "The length of time for which user and event data is retained. This property cannot be set on insert.",
  ).optional(),
  defaultProfileId: z.string().describe("Default view (profile) ID.")
    .optional(),
  id: z.string().describe("Web property ID of the form UA-XXXXX-YY.")
    .optional(),
  industryVertical: z.string().describe(
    "The industry vertical/category selected for this web property.",
  ).optional(),
  internalWebPropertyId: z.string().describe(
    "Internal ID for this web property.",
  ).optional(),
  level: z.string().describe(
    "Level for this web property. Possible values are STANDARD or PREMIUM.",
  ).optional(),
  name: z.string().describe("Name of this web property.").optional(),
  parentLink: z.object({
    href: z.string().describe("Link to the account for this web property.")
      .optional(),
    type: z.string().describe(
      'Type of the parent link. Its value is "analytics#account".',
    ).optional(),
  }).describe(
    "Parent link for this web property. Points to the account to which this web property belongs.",
  ).optional(),
  permissions: z.object({
    effective: z.array(z.string()).describe(
      "All the permissions that the user has for this web property. These include any implied permissions (e.g., EDIT implies VIEW) or inherited permissions from the parent account.",
    ).optional(),
  }).describe("Permissions the user has for this web property.").optional(),
  profileCount: z.number().int().describe(
    "View (Profile) count for this web property.",
  ).optional(),
  starred: z.boolean().describe(
    "Indicates whether this web property is starred or not.",
  ).optional(),
  updated: z.string().describe("Time this web property was last modified.")
    .optional(),
  websiteUrl: z.string().describe("Website url for this web property.")
    .optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.Webproperties. Registered at `@swamp/gcp/analytics/management-webproperties`. */
export const model = {
  type: "@swamp/gcp/analytics/management-webproperties",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "JSON template for an Analytics web property.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a webproperties",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["childLink"] !== undefined) body["childLink"] = g["childLink"];
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["dataRetentionResetOnNewActivity"] !== undefined) {
          body["dataRetentionResetOnNewActivity"] =
            g["dataRetentionResetOnNewActivity"];
        }
        if (g["dataRetentionTtl"] !== undefined) {
          body["dataRetentionTtl"] = g["dataRetentionTtl"];
        }
        if (g["defaultProfileId"] !== undefined) {
          body["defaultProfileId"] = g["defaultProfileId"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["industryVertical"] !== undefined) {
          body["industryVertical"] = g["industryVertical"];
        }
        if (g["internalWebPropertyId"] !== undefined) {
          body["internalWebPropertyId"] = g["internalWebPropertyId"];
        }
        if (g["level"] !== undefined) body["level"] = g["level"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["permissions"] !== undefined) {
          body["permissions"] = g["permissions"];
        }
        if (g["profileCount"] !== undefined) {
          body["profileCount"] = g["profileCount"];
        }
        if (g["starred"] !== undefined) body["starred"] = g["starred"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["websiteUrl"] !== undefined) body["websiteUrl"] = g["websiteUrl"];
        if (g["name"] !== undefined) {
          params["webPropertyId"] = String(g["name"]);
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
            listParams: { "accountId": String(g["accountId"] ?? "") },
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
      description: "Get a webproperties",
      arguments: z.object({
        identifier: z.string().describe("The name of the webproperties"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        params["webPropertyId"] = args.identifier;
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
      description: "Update webproperties attributes",
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
        params["webPropertyId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["childLink"] !== undefined) body["childLink"] = g["childLink"];
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["dataRetentionResetOnNewActivity"] !== undefined) {
          body["dataRetentionResetOnNewActivity"] =
            g["dataRetentionResetOnNewActivity"];
        }
        if (g["dataRetentionTtl"] !== undefined) {
          body["dataRetentionTtl"] = g["dataRetentionTtl"];
        }
        if (g["defaultProfileId"] !== undefined) {
          body["defaultProfileId"] = g["defaultProfileId"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["industryVertical"] !== undefined) {
          body["industryVertical"] = g["industryVertical"];
        }
        if (g["internalWebPropertyId"] !== undefined) {
          body["internalWebPropertyId"] = g["internalWebPropertyId"];
        }
        if (g["level"] !== undefined) body["level"] = g["level"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["permissions"] !== undefined) {
          body["permissions"] = g["permissions"];
        }
        if (g["profileCount"] !== undefined) {
          body["profileCount"] = g["profileCount"];
        }
        if (g["starred"] !== undefined) body["starred"] = g["starred"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["websiteUrl"] !== undefined) body["websiteUrl"] = g["websiteUrl"];
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
      description: "Sync webproperties state from GCP",
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
          params["webPropertyId"] = identifier;
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
      description: "List webproperties resources",
      arguments: z.object({
        max_results: z.number().describe(
          "The maximum number of web properties to include in this response.",
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
