// Auto-generated extension model for @swamp/cloudflare/workers/queries
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Queries.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  description: z.string().max(1000),
  name: z.string().min(1).max(250).describe("Query name"),
  parameters: z.object({
    calculations: z.array(z.object({
      alias: z.string().optional(),
      key: z.string().optional(),
      keyType: z.enum(["string", "number", "boolean"]).optional(),
      operator: z.enum([
        "uniq",
        "count",
        "max",
        "min",
        "sum",
        "avg",
        "median",
        "p001",
        "p01",
        "p05",
        "p10",
        "p25",
        "p75",
        "p90",
        "p95",
        "p99",
        "p999",
        "stddev",
        "variance",
        "COUNT_DISTINCT",
        "COUNT",
        "MAX",
        "MIN",
        "SUM",
        "AVG",
        "MEDIAN",
        "P001",
        "P01",
        "P05",
        "P10",
        "P25",
        "P75",
        "P90",
        "P95",
        "P99",
        "P999",
        "STDDEV",
        "VARIANCE",
      ]),
    })).optional(),
    datasets: z.array(z.string()).optional(),
    filterCombination: z.enum(["and", "or", "AND", "OR"]).optional(),
    filters: z.array(z.object({
      filterCombination: z.enum(["and", "or", "AND", "OR"]),
      filters: z.array(z.string()),
      kind: z.enum(["group"]),
    })).optional(),
    groupBys: z.array(z.object({
      type: z.enum(["string", "number", "boolean"]),
      value: z.string(),
    })).optional(),
    havings: z.array(z.object({
      key: z.string(),
      operation: z.enum(["eq", "neq", "gt", "gte", "lt", "lte"]),
      value: z.number(),
    })).optional(),
    limit: z.number().int().min(0).max(100).optional(),
    needle: z.object({
      isRegex: z.boolean().optional(),
      matchCase: z.boolean().optional(),
      value: z.string(),
    }).optional(),
    orderBy: z.object({
      order: z.enum(["asc", "desc"]).optional(),
      value: z.string(),
    }).optional(),
  }),
});

const ResourceSchema = z.object({
  adhoc: z.boolean().optional(),
  created: z.string().optional(),
  createdBy: z.string().optional(),
  description: z.string().optional(),
  id: z.string(),
  name: z.string().optional(),
  parameters: z.object({
    calculations: z.array(z.object({
      alias: z.string().optional(),
      key: z.string().optional(),
      keyType: z.string().optional(),
      operator: z.string().optional(),
    })).optional(),
    datasets: z.array(z.string()).optional(),
    filterCombination: z.string().optional(),
    filters: z.array(z.object({
      filterCombination: z.string().optional(),
      filters: z.array(z.string()).optional(),
      kind: z.string().optional(),
    })).optional(),
    groupBys: z.array(z.object({
      type: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
    havings: z.array(z.object({
      key: z.string().optional(),
      operation: z.string().optional(),
      value: z.number().optional(),
    })).optional(),
    limit: z.number().optional(),
    needle: z.object({
      isRegex: z.boolean().optional(),
      matchCase: z.boolean().optional(),
      value: z.string().optional(),
    }).optional(),
    orderBy: z.object({
      order: z.string().optional(),
      value: z.string().optional(),
    }).optional(),
  }).optional(),
  updated: z.string().optional(),
  updatedBy: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  description: z.string().max(1000).optional(),
  name: z.string().min(1).max(250).optional(),
  parameters: z.object({
    calculations: z.array(z.object({
      alias: z.string().optional(),
      key: z.string().optional(),
      keyType: z.enum(["string", "number", "boolean"]).optional(),
      operator: z.enum([
        "uniq",
        "count",
        "max",
        "min",
        "sum",
        "avg",
        "median",
        "p001",
        "p01",
        "p05",
        "p10",
        "p25",
        "p75",
        "p90",
        "p95",
        "p99",
        "p999",
        "stddev",
        "variance",
        "COUNT_DISTINCT",
        "COUNT",
        "MAX",
        "MIN",
        "SUM",
        "AVG",
        "MEDIAN",
        "P001",
        "P01",
        "P05",
        "P10",
        "P25",
        "P75",
        "P90",
        "P95",
        "P99",
        "P999",
        "STDDEV",
        "VARIANCE",
      ]),
    })).optional(),
    datasets: z.array(z.string()).optional(),
    filterCombination: z.enum(["and", "or", "AND", "OR"]).optional(),
    filters: z.array(z.object({
      filterCombination: z.enum(["and", "or", "AND", "OR"]),
      filters: z.array(z.string()),
      kind: z.enum(["group"]),
    })).optional(),
    groupBys: z.array(z.object({
      type: z.enum(["string", "number", "boolean"]),
      value: z.string(),
    })).optional(),
    havings: z.array(z.object({
      key: z.string(),
      operation: z.enum(["eq", "neq", "gt", "gte", "lt", "lte"]),
      value: z.number(),
    })).optional(),
    limit: z.number().int().min(0).max(100).optional(),
    needle: z.object({
      isRegex: z.boolean().optional(),
      matchCase: z.boolean().optional(),
      value: z.string(),
    }).optional(),
    orderBy: z.object({
      order: z.enum(["asc", "desc"]).optional(),
      value: z.string(),
    }).optional(),
  }).optional(),
});

/** Swamp extension model for Cloudflare Queries. Registered at `@swamp/cloudflare/workers/queries`. */
export const model = {
  type: "@swamp/cloudflare/workers/queries",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Queries resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Queries",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/queries";
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.name !== undefined) body.name = g.name;
        if (g.parameters !== undefined) body.parameters = g.parameters;
        const result = await create(endpoint, body) as ResourceData;
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
      description: "Get a Queries",
      arguments: z.object({ id: z.string().describe("The ID of the Queries") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/queries";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (g.name?.toString() ?? args.id).replace(
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
      description: "Update Queries attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/queries";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.name !== undefined) body.name = g.name;
        if (g.parameters !== undefined) body.parameters = g.parameters;
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PATCH",
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Queries",
      arguments: z.object({ id: z.string().describe("The ID of the Queries") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/queries";
        const { existed } = await remove(endpoint, args.id);
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync Queries state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/queries";
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
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id) as
          | ResourceData
          | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
