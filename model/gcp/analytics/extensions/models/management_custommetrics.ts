// Auto-generated extension model for @swamp/gcp/analytics/management-custommetrics
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.CustomMetrics.
 *
 * JSON template for Analytics Custom Metric.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.management.customMetrics.get",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics/{customMetricId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "customMetricId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "customMetricId": {
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
  "id": "analytics.management.customMetrics.insert",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics",
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
  "id": "analytics.management.customMetrics.update",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/customMetrics/{customMetricId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "customMetricId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "customMetricId": {
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

const GlobalArgsSchema = z.object({
  accountId: z.string().describe("Account ID.").optional(),
  active: z.boolean().describe(
    "Boolean indicating whether the custom metric is active.",
  ).optional(),
  created: z.string().describe("Time the custom metric was created.")
    .optional(),
  id: z.string().describe("Custom metric ID.").optional(),
  index: z.number().int().describe("Index of the custom metric.").optional(),
  max_value: z.string().describe("Max value of custom metric.").optional(),
  min_value: z.string().describe("Min value of custom metric.").optional(),
  name: z.string().describe("Name of the custom metric.").optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the property to which the custom metric belongs.",
    ).optional(),
    type: z.string().describe(
      'Type of the parent link. Set to "analytics#webproperty".',
    ).optional(),
  }).describe(
    "Parent link for the custom metric. Points to the property to which the custom metric belongs.",
  ).optional(),
  scope: z.string().describe("Scope of the custom metric: HIT or PRODUCT.")
    .optional(),
  type: z.string().describe("Data type of custom metric.").optional(),
  updated: z.string().describe("Time the custom metric was last modified.")
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
  max_value: z.string().optional(),
  min_value: z.string().optional(),
  name: z.string(),
  parentLink: z.object({
    href: z.string(),
    type: z.string(),
  }).optional(),
  scope: z.string().optional(),
  selfLink: z.string().optional(),
  type: z.string().optional(),
  updated: z.string().optional(),
  webPropertyId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("Account ID.").optional(),
  active: z.boolean().describe(
    "Boolean indicating whether the custom metric is active.",
  ).optional(),
  created: z.string().describe("Time the custom metric was created.")
    .optional(),
  id: z.string().describe("Custom metric ID.").optional(),
  index: z.number().int().describe("Index of the custom metric.").optional(),
  max_value: z.string().describe("Max value of custom metric.").optional(),
  min_value: z.string().describe("Min value of custom metric.").optional(),
  name: z.string().describe("Name of the custom metric.").optional(),
  parentLink: z.object({
    href: z.string().describe(
      "Link to the property to which the custom metric belongs.",
    ).optional(),
    type: z.string().describe(
      'Type of the parent link. Set to "analytics#webproperty".',
    ).optional(),
  }).describe(
    "Parent link for the custom metric. Points to the property to which the custom metric belongs.",
  ).optional(),
  scope: z.string().describe("Scope of the custom metric: HIT or PRODUCT.")
    .optional(),
  type: z.string().describe("Data type of custom metric.").optional(),
  updated: z.string().describe("Time the custom metric was last modified.")
    .optional(),
  webPropertyId: z.string().describe("Property ID.").optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.CustomMetrics. Registered at `@swamp/gcp/analytics/management-custommetrics`. */
export const model = {
  type: "@swamp/gcp/analytics/management-custommetrics",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "JSON template for Analytics Custom Metric.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customMetrics",
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
        if (g["max_value"] !== undefined) body["max_value"] = g["max_value"];
        if (g["min_value"] !== undefined) body["min_value"] = g["min_value"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["name"] !== undefined) {
          params["customMetricId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a customMetrics",
      arguments: z.object({
        identifier: z.string().describe("The name of the customMetrics"),
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
        params["customMetricId"] = args.identifier;
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
      description: "Update customMetrics attributes",
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
        params["customMetricId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["index"] !== undefined) body["index"] = g["index"];
        if (g["max_value"] !== undefined) body["max_value"] = g["max_value"];
        if (g["min_value"] !== undefined) body["min_value"] = g["min_value"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentLink"] !== undefined) body["parentLink"] = g["parentLink"];
        if (g["scope"] !== undefined) body["scope"] = g["scope"];
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Sync customMetrics state from GCP",
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
          params["customMetricId"] = identifier;
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
  },
};
