// Auto-generated extension model for @swamp/gcp/safebrowsing/hashlists
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Safe Browsing HashLists.
 *
 * A list of hashes identified by its name.
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

const BASE_URL = "https://safebrowsing.googleapis.com/";

const LIST_CONFIG = {
  "id": "safebrowsing.hashLists.list",
  "path": "v5/hashLists",
  "httpMethod": "GET",
  "parameterOrder": [],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
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
  additionsEightBytes: z.object({
    encodedData: z.string(),
    entriesCount: z.number(),
    firstValue: z.string(),
    riceParameter: z.number(),
  }).optional(),
  additionsFourBytes: z.object({
    encodedData: z.string(),
    entriesCount: z.number(),
    firstValue: z.number(),
    riceParameter: z.number(),
  }).optional(),
  additionsSixteenBytes: z.object({
    encodedData: z.string(),
    entriesCount: z.number(),
    firstValueHi: z.string(),
    firstValueLo: z.string(),
    riceParameter: z.number(),
  }).optional(),
  additionsThirtyTwoBytes: z.object({
    encodedData: z.string(),
    entriesCount: z.number(),
    firstValueFirstPart: z.string(),
    firstValueFourthPart: z.string(),
    firstValueSecondPart: z.string(),
    firstValueThirdPart: z.string(),
    riceParameter: z.number(),
  }).optional(),
  compressedRemovals: z.object({
    encodedData: z.string(),
    entriesCount: z.number(),
    firstValue: z.number(),
    riceParameter: z.number(),
  }).optional(),
  metadata: z.object({
    description: z.string(),
    hashLength: z.string(),
    likelySafeTypes: z.array(z.string()),
    threatTypes: z.array(z.string()),
  }).optional(),
  minimumWaitDuration: z.string().optional(),
  name: z.string(),
  partialUpdate: z.boolean().optional(),
  sha256Checksum: z.string().optional(),
  version: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Safe Browsing HashLists. Registered at `@swamp/gcp/safebrowsing/hashlists`. */
export const model = {
  type: "@swamp/gcp/safebrowsing/hashlists",
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
      description: "A list of hashes identified by its name.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a hashLists",
      arguments: z.object({
        identifier: z.string().describe("The name of the hashLists"),
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
      description: "Sync hashLists state from GCP",
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
      description: "List hashLists resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of hash lists to return. The service may return fewer than this value. If unspecified, the server will choose a page size, which may be larger than the number of hash lists so that pagination is not necessary.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "hashLists",
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
            "id": "safebrowsing.hashLists.batchGet",
            "path": "v5/hashLists:batchGet",
            "httpMethod": "GET",
            "parameterOrder": [],
            "parameters": {
              "names": { "location": "query" },
              "sizeConstraints.maxDatabaseEntries": { "location": "query" },
              "sizeConstraints.maxUpdateEntries": { "location": "query" },
              "version": { "location": "query" },
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
