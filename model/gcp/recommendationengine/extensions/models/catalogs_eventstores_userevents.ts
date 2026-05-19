// Auto-generated extension model for @swamp/gcp/recommendationengine/catalogs-eventstores-userevents
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Recommendations AI (Beta) Catalogs.EventStores.UserEvents.
 *
 * UserEvent captures all metadata information recommendation engine needs to know about how end users interact with customers' website.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://recommendationengine.googleapis.com/";

const LIST_CONFIG = {
  "id":
    "recommendationengine.projects.locations.catalogs.eventStores.userEvents.list",
  "path": "v1beta1/{+parent}/userEvents",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  eventDetail: z.object({
    eventAttributes: z.object({
      categoricalFeatures: z.record(z.string(), z.unknown()),
      numericalFeatures: z.record(z.string(), z.unknown()),
    }),
    experimentIds: z.array(z.string()),
    pageViewId: z.string(),
    recommendationToken: z.string(),
    referrerUri: z.string(),
    uri: z.string(),
  }).optional(),
  eventSource: z.string().optional(),
  eventTime: z.string().optional(),
  eventType: z.string().optional(),
  productEventDetail: z.object({
    cartId: z.string(),
    listId: z.string(),
    pageCategories: z.array(z.object({
      categories: z.array(z.string()),
    })),
    productDetails: z.array(z.object({
      availableQuantity: z.number(),
      currencyCode: z.string(),
      displayPrice: z.number(),
      id: z.string(),
      itemAttributes: z.object({
        categoricalFeatures: z.record(z.string(), z.unknown()),
        numericalFeatures: z.record(z.string(), z.unknown()),
      }),
      originalPrice: z.number(),
      quantity: z.number(),
      stockState: z.string(),
    })),
    purchaseTransaction: z.object({
      costs: z.record(z.string(), z.unknown()),
      currencyCode: z.string(),
      id: z.string(),
      revenue: z.number(),
      taxes: z.record(z.string(), z.unknown()),
    }),
    searchQuery: z.string(),
  }).optional(),
  userInfo: z.object({
    directUserRequest: z.boolean(),
    ipAddress: z.string(),
    userAgent: z.string(),
    userId: z.string(),
    visitorId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Recommendations AI (Beta) Catalogs.EventStores.UserEvents. Registered at `@swamp/gcp/recommendationengine/catalogs-eventstores-userevents`. */
export const model = {
  type: "@swamp/gcp/recommendationengine/catalogs-eventstores-userevents",
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
        "UserEvent captures all metadata information recommendation engine needs to kn...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a userEvents",
      arguments: z.object({
        identifier: z.string().describe("The name of the userEvents"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
    sync: {
      description: "Sync userEvents state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
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
    collect: {
      description: "collect",
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
              "recommendationengine.projects.locations.catalogs.eventStores.userEvents.collect",
            "path": "v1beta1/{+parent}/userEvents:collect",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "ets": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "uri": { "location": "query" },
              "userEvent": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    import: {
      description: "import",
      arguments: z.object({
        errorsConfig: z.any().optional(),
        inputConfig: z.any().optional(),
        requestId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["errorsConfig"] !== undefined) {
          body["errorsConfig"] = args["errorsConfig"];
        }
        if (args["inputConfig"] !== undefined) {
          body["inputConfig"] = args["inputConfig"];
        }
        if (args["requestId"] !== undefined) {
          body["requestId"] = args["requestId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "recommendationengine.projects.locations.catalogs.eventStores.userEvents.import",
            "path": "v1beta1/{+parent}/userEvents:import",
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
    purge: {
      description: "purge",
      arguments: z.object({
        filter: z.any().optional(),
        force: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["force"] !== undefined) body["force"] = args["force"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "recommendationengine.projects.locations.catalogs.eventStores.userEvents.purge",
            "path": "v1beta1/{+parent}/userEvents:purge",
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
    rejoin: {
      description: "rejoin",
      arguments: z.object({
        userEventRejoinScope: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["userEventRejoinScope"] !== undefined) {
          body["userEventRejoinScope"] = args["userEventRejoinScope"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "recommendationengine.projects.locations.catalogs.eventStores.userEvents.rejoin",
            "path": "v1beta1/{+parent}/userEvents:rejoin",
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
    write: {
      description: "write",
      arguments: z.object({
        eventDetail: z.any().optional(),
        eventSource: z.any().optional(),
        eventTime: z.any().optional(),
        eventType: z.any().optional(),
        productEventDetail: z.any().optional(),
        userInfo: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["eventDetail"] !== undefined) {
          body["eventDetail"] = args["eventDetail"];
        }
        if (args["eventSource"] !== undefined) {
          body["eventSource"] = args["eventSource"];
        }
        if (args["eventTime"] !== undefined) {
          body["eventTime"] = args["eventTime"];
        }
        if (args["eventType"] !== undefined) {
          body["eventType"] = args["eventType"];
        }
        if (args["productEventDetail"] !== undefined) {
          body["productEventDetail"] = args["productEventDetail"];
        }
        if (args["userInfo"] !== undefined) body["userInfo"] = args["userInfo"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "recommendationengine.projects.locations.catalogs.eventStores.userEvents.write",
            "path": "v1beta1/{+parent}/userEvents:write",
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
  },
};
