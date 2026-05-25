// Auto-generated extension model for @swamp/gcp/mybusinessbusinessinformation/categories
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud My Business Business Information Categories.
 *
 * A category describing what this business is (not what it does). For a list of valid category IDs, and the mappings to their human-readable names, see `categories.list`.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://mybusinessbusinessinformation.googleapis.com/";

const LIST_CONFIG = {
  "id": "mybusinessbusinessinformation.categories.list",
  "path": "v1/categories",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "languageCode": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "regionCode": {
      "location": "query",
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  displayName: z.string().optional(),
  moreHoursTypes: z.array(z.object({
    displayName: z.string(),
    hoursTypeId: z.string(),
    localizedDisplayName: z.string(),
  })).optional(),
  name: z.string(),
  serviceTypes: z.array(z.object({
    displayName: z.string(),
    serviceTypeId: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud My Business Business Information Categories. Registered at `@swamp/gcp/mybusinessbusinessinformation/categories`. */
export const model = {
  type: "@swamp/gcp/mybusinessbusinessinformation/categories",
  version: "2026.05.25.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A category describing what this business is (not what it does). For a list of...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a categories",
      arguments: z.object({
        identifier: z.string().describe("The name of the categories"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
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
      description: "Sync categories state from GCP",
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
      description: "List categories resources",
      arguments: z.object({
        filter: z.string().describe(
          "Optional. Filter string from user. The only field that supported is `displayName`. Eg: `filter=displayName=foo`.",
        ).optional(),
        languageCode: z.string().describe(
          "Required. The BCP 47 code of language.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. How many categories to fetch per page. Default is 100, minimum is 1, and maximum page size is 100.",
        ).optional(),
        regionCode: z.string().describe(
          "Required. The ISO 3166-1 alpha-2 country code.",
        ).optional(),
        view: z.string().describe(
          "Required. Specifies which parts to the Category resource should be returned in the response.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["languageCode"] !== undefined) {
          params["languageCode"] = String(args["languageCode"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["regionCode"] !== undefined) {
          params["regionCode"] = String(args["regionCode"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "categories",
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
    batch_get: {
      description: "batch get",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const result = await createResource(
          BASE_URL,
          {
            "id": "mybusinessbusinessinformation.categories.batchGet",
            "path": "v1/categories:batchGet",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "languageCode": { "location": "query" },
              "names": { "location": "query" },
              "regionCode": { "location": "query" },
              "view": { "location": "query" },
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
