// Auto-generated extension model for @swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Contact Center AI Insights AuthorizedViewSets.AuthorizedViews.
 *
 * An AuthorizedView represents a view of accessible Insights resources (for example, Conversation and Scorecard). Who have read access to the AuthorizedView resource will have access to these Insight resources as well.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/authorizedViews/${shortName}`;
}

const BASE_URL = "https://contactcenterinsights.googleapis.com/";

const GET_CONFIG = {
  "id":
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.get",
  "path": "v1/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id":
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.create",
  "path": "v1/{+parent}/authorizedViews",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "authorizedViewId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  conversationFilter: z.string().describe(
    "A filter to reduce conversation results to a specific subset. The AuthorizedView's assigned permission (read/write) could be applied to the subset of conversations. If conversation_filter is empty, there is no restriction on the conversations that the AuthorizedView can access. Having *authorizedViews.get* access to the AuthorizedView means having the same read/write access to the Conversations (as well as metadata/annotations linked to the conversation) that this AuthorizedView has.",
  ).optional(),
  displayName: z.string().describe("Display Name. Limit 64 characters.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the AuthorizedView. Format: projects/{project}/locations/{location}/authorizedViewSets/{authorized_view_set}/authorizedViews/{authorized_view}",
  ).optional(),
  authorizedViewId: z.string().describe(
    "Optional. A unique ID for the new AuthorizedView. This ID will become the final component of the AuthorizedView's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. See https://google.aip.dev/122#resource-id-segments",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  conversationFilter: z.string().optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  conversationFilter: z.string().describe(
    "A filter to reduce conversation results to a specific subset. The AuthorizedView's assigned permission (read/write) could be applied to the subset of conversations. If conversation_filter is empty, there is no restriction on the conversations that the AuthorizedView can access. Having *authorizedViews.get* access to the AuthorizedView means having the same read/write access to the Conversations (as well as metadata/annotations linked to the conversation) that this AuthorizedView has.",
  ).optional(),
  displayName: z.string().describe("Display Name. Limit 64 characters.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the AuthorizedView. Format: projects/{project}/locations/{location}/authorizedViewSets/{authorized_view_set}/authorizedViews/{authorized_view}",
  ).optional(),
  authorizedViewId: z.string().describe(
    "Optional. A unique ID for the new AuthorizedView. This ID will become the final component of the AuthorizedView's resource name. If no ID is specified, a server-generated ID will be used. This value should be 4-64 characters and must match the regular expression `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. See https://google.aip.dev/122#resource-id-segments",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Contact Center AI Insights AuthorizedViewSets.AuthorizedViews. Registered at `@swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews`. */
export const model = {
  type: "@swamp/gcp/contactcenterinsights/authorizedviewsets-authorizedviews",
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
      toVersion: "2026.05.18.1",
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
      description:
        "An AuthorizedView represents a view of accessible Insights resources (for exa...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a authorizedViews",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["conversationFilter"] !== undefined) {
          body["conversationFilter"] = g["conversationFilter"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["authorizedViewId"] !== undefined) {
          body["authorizedViewId"] = g["authorizedViewId"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
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
      description: "Get a authorizedViews",
      arguments: z.object({
        identifier: z.string().describe("The name of the authorizedViews"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Update authorizedViews attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["conversationFilter"] !== undefined) {
          body["conversationFilter"] = g["conversationFilter"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
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
          PATCH_CONFIG,
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
      description: "Delete the authorizedViews",
      arguments: z.object({
        identifier: z.string().describe("The name of the authorizedViews"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync authorizedViews state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
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
    generative_insights: {
      description: "generative insights",
      arguments: z.object({
        chart: z.any().optional(),
        comparisonFilter: z.any().optional(),
        filter: z.any().optional(),
        naturalLanguageQuery: z.any().optional(),
        revisionId: z.any().optional(),
        sessionId: z.any().optional(),
        sqlComparisonKey: z.any().optional(),
        sqlQuery: z.any().optional(),
        userProvidedChartSpec: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        const body: Record<string, unknown> = {};
        if (args["chart"] !== undefined) body["chart"] = args["chart"];
        if (args["comparisonFilter"] !== undefined) {
          body["comparisonFilter"] = args["comparisonFilter"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["naturalLanguageQuery"] !== undefined) {
          body["naturalLanguageQuery"] = args["naturalLanguageQuery"];
        }
        if (args["revisionId"] !== undefined) {
          body["revisionId"] = args["revisionId"];
        }
        if (args["sessionId"] !== undefined) {
          body["sessionId"] = args["sessionId"];
        }
        if (args["sqlComparisonKey"] !== undefined) {
          body["sqlComparisonKey"] = args["sqlComparisonKey"];
        }
        if (args["sqlQuery"] !== undefined) body["sqlQuery"] = args["sqlQuery"];
        if (args["userProvidedChartSpec"] !== undefined) {
          body["userProvidedChartSpec"] = args["userProvidedChartSpec"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.generativeInsights",
            "path": "v1/{+location}:generativeInsights",
            "httpMethod": "POST",
            "parameterOrder": ["location"],
            "parameters": {
              "location": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    query_metrics: {
      description: "query metrics",
      arguments: z.object({
        dimensions: z.any().optional(),
        filter: z.any().optional(),
        measureMask: z.any().optional(),
        timeGranularity: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["location"] !== undefined) {
          params["location"] = String(g["location"]);
        }
        const body: Record<string, unknown> = {};
        if (args["dimensions"] !== undefined) {
          body["dimensions"] = args["dimensions"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["measureMask"] !== undefined) {
          body["measureMask"] = args["measureMask"];
        }
        if (args["timeGranularity"] !== undefined) {
          body["timeGranularity"] = args["timeGranularity"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.queryMetrics",
            "path": "v1/{+location}:queryMetrics",
            "httpMethod": "POST",
            "parameterOrder": ["location"],
            "parameters": {
              "location": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    query_performance_overview: {
      description: "query performance overview",
      arguments: z.object({
        agentPerformanceSource: z.any().optional(),
        comparisonQueryInterval: z.any().optional(),
        filter: z.any().optional(),
        queryInterval: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["agentPerformanceSource"] !== undefined) {
          body["agentPerformanceSource"] = args["agentPerformanceSource"];
        }
        if (args["comparisonQueryInterval"] !== undefined) {
          body["comparisonQueryInterval"] = args["comparisonQueryInterval"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["queryInterval"] !== undefined) {
          body["queryInterval"] = args["queryInterval"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.queryPerformanceOverview",
            "path": "v1/{+parent}:queryPerformanceOverview",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    search: {
      description: "search",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "contactcenterinsights.projects.locations.authorizedViewSets.authorizedViews.search",
            "path": "v1/{+parent}/authorizedViews:search",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "orderBy": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "query": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
