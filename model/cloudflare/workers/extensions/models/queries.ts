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

// Auto-generated extension model for @swamp/cloudflare/workers/queries
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Queries.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  listAll,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  description: z.string().max(1000).optional(),
  name: z.string().min(1).max(250).describe("Query name").optional(),
  parameters: z.object({
    calculations: z.array(z.object({
      alias: z.string().optional(),
      key: z.string().optional(),
      keyType: z.enum(["string", "number", "boolean"]).optional(),
      operator: z.enum([
        "count",
        "COUNT",
        "uniq",
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
      filterCombination: z.enum(["and", "or", "AND", "OR"]).optional(),
      filters: z.array(z.string()).optional(),
      kind: z.enum(["group", "filter"]).optional(),
      key: z.string().optional(),
      operation: z.enum([
        "includes",
        "not_includes",
        "starts_with",
        "ends_with",
        "regex",
        "exists",
        "is_null",
        "in",
        "not_in",
        "eq",
        "neq",
        "gt",
        "gte",
        "lt",
        "lte",
        "=",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "INCLUDES",
        "DOES_NOT_INCLUDE",
        "MATCH_REGEX",
        "EXISTS",
        "DOES_NOT_EXIST",
        "IN",
        "NOT_IN",
        "STARTS_WITH",
        "ENDS_WITH",
      ]).optional(),
      type: z.enum(["string", "number", "boolean"]).optional(),
      value: z.string().optional(),
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
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
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
      key: z.string().optional(),
      operation: z.string().optional(),
      type: z.string().optional(),
      value: z.string().optional(),
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
        "count",
        "COUNT",
        "uniq",
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
      filterCombination: z.enum(["and", "or", "AND", "OR"]).optional(),
      filters: z.array(z.string()).optional(),
      kind: z.enum(["group", "filter"]).optional(),
      key: z.string().optional(),
      operation: z.enum([
        "includes",
        "not_includes",
        "starts_with",
        "ends_with",
        "regex",
        "exists",
        "is_null",
        "in",
        "not_in",
        "eq",
        "neq",
        "gt",
        "gte",
        "lt",
        "lte",
        "=",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "INCLUDES",
        "DOES_NOT_INCLUDE",
        "MATCH_REGEX",
        "EXISTS",
        "DOES_NOT_EXIST",
        "IN",
        "NOT_IN",
        "STARTS_WITH",
        "ENDS_WITH",
      ]).optional(),
      type: z.enum(["string", "number", "boolean"]).optional(),
      value: z.string().optional(),
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
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Queries. Registered at `@swamp/cloudflare/workers/queries`. */
export const model = {
  type: "@swamp/cloudflare/workers/queries",
  version: "2026.09.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.11.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
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
        const missing = ["description", "name", "parameters"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/queries";
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.name !== undefined) body.name = g.name;
        if (g.parameters !== undefined) body.parameters = g.parameters;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
    lookup: {
      description:
        "Look up an existing Queries by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/queries";
        const filters: [string, string][] = [];
        if (g.description !== undefined) {
          filters.push(["description", String(g.description)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "page", undefined, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const matches = items.filter((item) => {
          for (const [key, val] of filters) {
            if (String((item as Record<string, unknown>)[key]) !== val) {
              return false;
            }
          }
          return true;
        });
        if (matches.length === 0) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(`No queries found matching filters: ${filterDesc}`);
        }
        if (matches.length > 1) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `Expected exactly 1 match, found ${matches.length} for filters: ${filterDesc}`,
          );
        }
        const result = matches[0] as ResourceData;
        const instanceName =
          (g.name?.toString() ?? result.id?.toString() ?? "current").replace(
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
    adopt: {
      description: "Import an existing Queries by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Queries to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/queries";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName =
          (result.name?.toString() ?? g.name?.toString() ?? args.id).replace(
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Queries by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/queries";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.name !== undefined) body.name = g.name;
        if (g.parameters !== undefined) body.parameters = g.parameters;
        const result = await update(endpoint, existing.id, body, "PATCH", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Queries by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/queries";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
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
