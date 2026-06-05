// Auto-generated extension model for @swamp/gcp/run/namespaces-routes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Run Admin Namespaces.Routes.
 *
 * Route is responsible for configuring ingress over a collection of Revisions. Some of the Revisions a Route distributes traffic over may be specified by referencing the Configuration responsible for creating them; in these cases the Route is additionally responsible for monitoring the Configuration for "latest ready" revision changes, and smoothly rolling out latest revisions. Cloud Run currently supports referencing a single Configuration to automatically deploy the "latest ready" Revision from that Configuration.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/routes/${shortName}`;
}

const BASE_URL = "https://run.googleapis.com/";

const GET_CONFIG = {
  "id": "run.namespaces.routes.get",
  "path": "apis/serving.knative.dev/v1/{+name}",
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

const LIST_CONFIG = {
  "id": "run.namespaces.routes.list",
  "path": "apis/serving.knative.dev/v1/{+parent}/routes",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "continue": {
      "location": "query",
    },
    "fieldSelector": {
      "location": "query",
    },
    "includeUninitialized": {
      "location": "query",
    },
    "labelSelector": {
      "location": "query",
    },
    "limit": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "resourceVersion": {
      "location": "query",
    },
    "watch": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  apiVersion: z.string().optional(),
  kind: z.string().optional(),
  metadata: z.object({
    annotations: z.record(z.string(), z.unknown()),
    clusterName: z.string(),
    creationTimestamp: z.string(),
    deletionGracePeriodSeconds: z.number(),
    deletionTimestamp: z.string(),
    finalizers: z.array(z.string()),
    generateName: z.string(),
    generation: z.number(),
    labels: z.record(z.string(), z.unknown()),
    name: z.string(),
    namespace: z.string(),
    ownerReferences: z.array(z.object({
      apiVersion: z.string(),
      blockOwnerDeletion: z.boolean(),
      controller: z.boolean(),
      kind: z.string(),
      name: z.string(),
      uid: z.string(),
    })),
    resourceVersion: z.string(),
    selfLink: z.string(),
    uid: z.string(),
  }).optional(),
  spec: z.object({
    traffic: z.array(z.object({
      configurationName: z.string(),
      latestRevision: z.boolean(),
      percent: z.number(),
      revisionName: z.string(),
      tag: z.string(),
      url: z.string(),
    })),
  }).optional(),
  status: z.object({
    address: z.object({
      url: z.string(),
    }),
    conditions: z.array(z.object({
      lastTransitionTime: z.string(),
      message: z.string(),
      reason: z.string(),
      severity: z.string(),
      status: z.string(),
      type: z.string(),
    })),
    observedGeneration: z.number(),
    traffic: z.array(z.object({
      configurationName: z.string(),
      latestRevision: z.boolean(),
      percent: z.number(),
      revisionName: z.string(),
      tag: z.string(),
      url: z.string(),
    })),
    url: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Run Admin Namespaces.Routes. Registered at `@swamp/gcp/run/namespaces-routes`. */
export const model = {
  type: "@swamp/gcp/run/namespaces-routes",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Route is responsible for configuring ingress over a collection of Revisions. ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a routes",
      arguments: z.object({
        identifier: z.string().describe("The name of the routes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Sync routes state from GCP",
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
            String(g["parent"] ?? ""),
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
    list: {
      description: "List routes resources",
      arguments: z.object({
        continue: z.string().describe(
          "Optional. Encoded string to continue paging.",
        ).optional(),
        fieldSelector: z.string().describe(
          "Allows to filter resources based on a specific value for a field name. Send this in a query string format. i.e. 'metadata.name%3Dlorem'. Not currently used by Cloud Run.",
        ).optional(),
        includeUninitialized: z.boolean().describe(
          "Not currently used by Cloud Run.",
        ).optional(),
        labelSelector: z.string().describe(
          "Allows to filter resources based on a label. Supported operations are =, !=, exists, in, and notIn.",
        ).optional(),
        limit: z.number().describe(
          "Optional. The maximum number of records that should be returned.",
        ).optional(),
        resourceVersion: z.string().describe(
          "The baseline resource version from which the list or watch operation should start. Not currently used by Cloud Run.",
        ).optional(),
        watch: z.boolean().describe(
          "Flag that indicates that the client expects to watch this resource as well. Not currently used by Cloud Run.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["continue"] !== undefined) {
          params["continue"] = String(args["continue"]);
        }
        if (args["fieldSelector"] !== undefined) {
          params["fieldSelector"] = String(args["fieldSelector"]);
        }
        if (args["includeUninitialized"] !== undefined) {
          params["includeUninitialized"] = String(args["includeUninitialized"]);
        }
        if (args["labelSelector"] !== undefined) {
          params["labelSelector"] = String(args["labelSelector"]);
        }
        if (args["limit"] !== undefined) {
          params["limit"] = String(args["limit"]);
        }
        if (args["resourceVersion"] !== undefined) {
          params["resourceVersion"] = String(args["resourceVersion"]);
        }
        if (args["watch"] !== undefined) {
          params["watch"] = String(args["watch"]);
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
