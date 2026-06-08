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

// Auto-generated extension model for @swamp/cloudflare/workers/query
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Query.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  chart: z.boolean().describe(
    "When true, includes time-series data in the response.",
  ).optional(),
  compare: z.boolean().describe(
    "When true, includes a comparison dataset from the previous time period of equal length.",
  ).optional(),
  dry: z.boolean().describe(
    "When true, executes the query without persisting the results. Useful for validation or previewing.",
  ).optional(),
  granularity: z.number().describe(
    "Number of time-series buckets. Only used when view is 'calculations'. Omit to let the system auto-detect an appropriate granularity.",
  ).optional(),
  ignoreSeries: z.boolean().describe(
    "When true, omits time-series data from the response and returns only aggregated values. Reduces response size when series are not needed.",
  ).optional(),
  limit: z.number().max(2000).describe(
    "Maximum number of events to return when view is 'events'. Also controls the number of group-by rows when view is 'calculations'.",
  ).optional(),
  offset: z.string().describe(
    "Cursor for pagination in event, trace, and invocation views. Pass the $metadata.id of the last returned item to fetch the next page.",
  ).optional(),
  offsetBy: z.number().describe(
    "Numeric offset for paginating grouped/pattern results (top-N lists). Use together with limit. Not used by cursor-based pagination.",
  ).optional(),
  offsetDirection: z.string().describe(
    "Pagination direction: 'next' for forward, 'prev' for backward.",
  ).optional(),
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
    filters: z.array(z.record(z.string(), z.unknown())).optional(),
    groupBys: z.array(z.object({
      type: z.enum(["string", "number", "boolean"]),
      value: z.string(),
    })).optional(),
    havings: z.array(z.object({
      key: z.string(),
      operation: z.enum(["eq", "neq", "gt", "gte", "lt", "lte"]),
      value: z.number(),
    })).optional(),
    limit: z.number().int().min(0).max(2000).optional(),
    needle: z.object({
      isRegex: z.boolean().optional(),
      matchCase: z.boolean().optional(),
      value: z.string(),
    }).optional(),
    orderBy: z.object({
      order: z.enum(["asc", "desc"]).optional(),
      value: z.string(),
    }).optional(),
  }).describe(
    "Query parameters defining what data to retrieve — filters, calculations, group-bys, and ordering. In practice this should always be provided for ad-hoc queries. Only omit when executing a previously saved query by queryId. Use the keys and values endpoints to discover available fields before building filters.",
  ).optional(),
  queryId: z.string().describe(
    "Identifier for the query. When parameters are omitted, this ID is used to load a previously saved query's parameters. When providing parameters inline, pass any identifier (e.g. an ad-hoc ID).",
  ),
  timeframe: z.object({
    from: z.number(),
    to: z.number(),
  }).describe(
    "Timeframe for the query using Unix timestamps in milliseconds. Narrower timeframes produce faster responses and more specific results.",
  ),
  view: z.enum([
    "traces",
    "events",
    "calculations",
    "invocations",
    "requests",
    "agents",
  ]).describe(
    "Controls the shape of the response. 'events': individual log lines matching the query. 'calculations': aggregated metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series. 'invocations': events grouped by request ID. 'traces': distributed trace summaries. 'agents': Durable Object agent summaries.",
  ).optional(),
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
  agents: z.array(z.object({
    agentClass: z.string().optional(),
    eventTypeCounts: z.record(z.string(), z.unknown()).optional(),
    firstEventMs: z.number().optional(),
    hasErrors: z.boolean().optional(),
    lastEventMs: z.number().optional(),
    namespace: z.string().optional(),
    service: z.string().optional(),
    totalEvents: z.number().optional(),
  })).optional(),
  calculations: z.array(z.object({
    aggregates: z.array(z.object({
      count: z.number().optional(),
      groups: z.array(z.object({
        key: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      interval: z.number().optional(),
      sampleInterval: z.number().optional(),
      value: z.number().optional(),
    })).optional(),
    alias: z.string().optional(),
    calculation: z.string().optional(),
    series: z.array(z.object({
      data: z.array(z.object({
        count: z.number().optional(),
        firstSeen: z.string().optional(),
        groups: z.array(z.object({
          key: z.string().optional(),
          value: z.string().optional(),
        })).optional(),
        interval: z.number().optional(),
        lastSeen: z.string().optional(),
        sampleInterval: z.number().optional(),
        value: z.number().optional(),
      })).optional(),
      time: z.string().optional(),
    })).optional(),
  })).optional(),
  compare: z.array(z.object({
    aggregates: z.array(z.object({
      count: z.number().optional(),
      groups: z.array(z.object({
        key: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      interval: z.number().optional(),
      sampleInterval: z.number().optional(),
      value: z.number().optional(),
    })).optional(),
    alias: z.string().optional(),
    calculation: z.string().optional(),
    series: z.array(z.object({
      data: z.array(z.object({
        count: z.number().optional(),
        firstSeen: z.string().optional(),
        groups: z.array(z.object({
          key: z.string().optional(),
          value: z.string().optional(),
        })).optional(),
        interval: z.number().optional(),
        lastSeen: z.string().optional(),
        sampleInterval: z.number().optional(),
        value: z.number().optional(),
      })).optional(),
      time: z.string().optional(),
    })).optional(),
  })).optional(),
  events: z.object({
    count: z.number().optional(),
    events: z.array(z.object({
      $containers: z.record(z.string(), z.unknown()).optional(),
      $metadata: z.object({
        account: z.string().optional(),
        cloudService: z.string().optional(),
        coldStart: z.number().optional(),
        cost: z.number().optional(),
        duration: z.number().optional(),
        endTime: z.number().optional(),
        error: z.string().optional(),
        errorTemplate: z.string().optional(),
        fingerprint: z.string().optional(),
        id: z.string().optional(),
        level: z.string().optional(),
        message: z.string().optional(),
        messageTemplate: z.string().optional(),
        metricName: z.string().optional(),
        origin: z.string().optional(),
        parentSpanId: z.string().optional(),
        provider: z.string().optional(),
        region: z.string().optional(),
        requestId: z.string().optional(),
        service: z.string().optional(),
        spanId: z.string().optional(),
        spanName: z.string().optional(),
        stackId: z.string().optional(),
        startTime: z.number().optional(),
        statusCode: z.number().optional(),
        traceDuration: z.number().optional(),
        traceId: z.string().optional(),
        transactionName: z.string().optional(),
        trigger: z.string().optional(),
        type: z.string().optional(),
        url: z.string().optional(),
      }).optional(),
      $workers: z.object({
        durableObjectId: z.string().optional(),
        entrypoint: z.string().optional(),
        event: z.record(z.string(), z.unknown()).optional(),
        eventType: z.string().optional(),
        executionModel: z.string().optional(),
        outcome: z.string().optional(),
        preview: z.object({
          id: z.string().optional(),
          name: z.string().optional(),
          slug: z.string().optional(),
        }).optional(),
        requestId: z.string().optional(),
        scriptName: z.string().optional(),
        scriptVersion: z.object({
          id: z.string().optional(),
          message: z.string().optional(),
          tag: z.string().optional(),
        }).optional(),
        spanId: z.string().optional(),
        traceId: z.string().optional(),
        truncated: z.boolean().optional(),
      }).optional(),
      dataset: z.string().optional(),
      source: z.string().optional(),
      timestamp: z.number().optional(),
    })).optional(),
    fields: z.array(z.object({
      key: z.string().optional(),
      type: z.string().optional(),
    })).optional(),
    series: z.array(z.object({
      data: z.array(z.object({
        aggregates: z.object({
          _count: z.number().optional(),
          _firstSeen: z.string().optional(),
          _interval: z.number().optional(),
          _lastSeen: z.string().optional(),
          bin: z.record(z.string(), z.unknown()).optional(),
        }).optional(),
        count: z.number().optional(),
        errors: z.number().optional(),
        groups: z.record(z.string(), z.unknown()).optional(),
        interval: z.number().optional(),
        sampleInterval: z.number().optional(),
      })).optional(),
      time: z.string().optional(),
    })).optional(),
  }).optional(),
  invocations: z.record(z.string(), z.unknown()).optional(),
  run: z.object({
    accountId: z.string().optional(),
    created: z.string().optional(),
    dry: z.boolean().optional(),
    granularity: z.number().optional(),
    id: z.string().optional(),
    query: z.object({
      adhoc: z.boolean().optional(),
      created: z.string().optional(),
      createdBy: z.string().optional(),
      description: z.string().optional(),
      id: z.string().optional(),
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
    }).optional(),
    statistics: z.object({
      abr_level: z.number().optional(),
      bytes_read: z.number().optional(),
      elapsed: z.number().optional(),
      rows_read: z.number().optional(),
    }).optional(),
    status: z.string().optional(),
    timeframe: z.object({
      from: z.number().optional(),
      to: z.number().optional(),
    }).optional(),
    updated: z.string().optional(),
    userId: z.string().optional(),
  }).optional(),
  statistics: z.object({
    abr_level: z.number().optional(),
    bytes_read: z.number().optional(),
    elapsed: z.number().optional(),
    rows_read: z.number().optional(),
  }).optional(),
  traces: z.array(z.object({
    errors: z.array(z.string()).optional(),
    rootSpanName: z.string().optional(),
    rootTransactionName: z.string().optional(),
    service: z.array(z.string()).optional(),
    spans: z.number().optional(),
    traceDurationMs: z.number().optional(),
    traceEndMs: z.number().optional(),
    traceId: z.string().optional(),
    traceStartMs: z.number().optional(),
  })).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  chart: z.boolean().optional(),
  compare: z.boolean().optional(),
  dry: z.boolean().optional(),
  granularity: z.number().optional(),
  ignoreSeries: z.boolean().optional(),
  limit: z.number().max(2000).optional(),
  offset: z.string().optional(),
  offsetBy: z.number().optional(),
  offsetDirection: z.string().optional(),
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
    filters: z.array(z.record(z.string(), z.unknown())).optional(),
    groupBys: z.array(z.object({
      type: z.enum(["string", "number", "boolean"]),
      value: z.string(),
    })).optional(),
    havings: z.array(z.object({
      key: z.string(),
      operation: z.enum(["eq", "neq", "gt", "gte", "lt", "lte"]),
      value: z.number(),
    })).optional(),
    limit: z.number().int().min(0).max(2000).optional(),
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
  queryId: z.string().optional(),
  timeframe: z.object({
    from: z.number(),
    to: z.number(),
  }).optional(),
  view: z.enum([
    "traces",
    "events",
    "calculations",
    "invocations",
    "requests",
    "agents",
  ]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Query. Registered at `@swamp/cloudflare/workers/query`. */
export const model = {
  type: "@swamp/cloudflare/workers/query",
  version: "2026.06.08.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Query resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Query",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/shared/query";
        const body: Record<string, unknown> = {};
        if (g.chart !== undefined) body.chart = g.chart;
        if (g.compare !== undefined) body.compare = g.compare;
        if (g.dry !== undefined) body.dry = g.dry;
        if (g.granularity !== undefined) body.granularity = g.granularity;
        if (g.ignoreSeries !== undefined) body.ignoreSeries = g.ignoreSeries;
        if (g.limit !== undefined) body.limit = g.limit;
        if (g.offset !== undefined) body.offset = g.offset;
        if (g.offsetBy !== undefined) body.offsetBy = g.offsetBy;
        if (g.offsetDirection !== undefined) {
          body.offsetDirection = g.offsetDirection;
        }
        if (g.parameters !== undefined) body.parameters = g.parameters;
        if (g.queryId !== undefined) body.queryId = g.queryId;
        if (g.timeframe !== undefined) body.timeframe = g.timeframe;
        if (g.view !== undefined) body.view = g.view;
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
      description: "Get a Query",
      arguments: z.object({ id: z.string().describe("The ID of the Query") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/shared/query";
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
    sync: {
      description: "Sync Query state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/workers/observability/shared/query";
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
