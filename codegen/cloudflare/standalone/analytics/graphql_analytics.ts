// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Standalone extension model for the Cloudflare GraphQL Analytics API.
// Supports all zone-level adaptive datasets (httpRequestsAdaptiveGroups,
// firewallEventsAdaptiveGroups, healthCheckEventsAdaptiveGroups, etc.).
// Source lives in codegen/cloudflare/standalone/ and is copied into
// model/cloudflare/analytics/ during generation.

import { z } from "npm:zod@4.6.7";
import type { AuthOverrides } from "./_lib/graphql.ts";
import { query } from "./_lib/graphql.ts";

interface ModelContext {
  globalArgs: {
    zone_id: string;
    apiToken?: string;
    apiKey?: string;
    email?: string;
  };
  modelType: string;
  modelId: string;
  writeResource: (
    resourceName: string,
    instanceName: string,
    data: Record<string, unknown>,
  ) => Promise<{ resourceName: string; instanceName: string }>;
  dataRepository: {
    getContent: (
      type: string,
      modelId: string,
      dataName: string,
    ) => Promise<Uint8Array | null>;
  };
}

const GRAPHQL_IDENTIFIER = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function validateIdentifier(value: string, label: string): void {
  if (!GRAPHQL_IDENTIFIER.test(value)) {
    throw new Error(
      `Invalid GraphQL identifier for ${label}: "${value}". Must match /^[a-zA-Z_][a-zA-Z0-9_]*$/.`,
    );
  }
}

const GlobalArgsSchema = z.object({
  zone_id: z.string().describe("Cloudflare zone ID"),
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

const AnalyticsRowSchema = z.object({
  dimensions: z.record(z.string(), z.unknown()).optional(),
  count: z.number().optional(),
  sum: z.record(z.string(), z.unknown()).optional(),
  avg: z.record(z.string(), z.unknown()).optional(),
  ratio: z.record(z.string(), z.unknown()).optional(),
  quantiles: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

const ResultSchema = z.object({
  queriedAt: z.string(),
  zone_id: z.string(),
  dataset: z.string(),
  datetime_geq: z.string(),
  datetime_lt: z.string(),
  dimensions: z.array(z.string()),
  sumFields: z.array(z.string()).optional(),
  avgFields: z.array(z.string()).optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  orderBy: z.array(z.string()).optional(),
  limit: z.number(),
  rows: z.array(AnalyticsRowSchema),
  rowCount: z.number(),
}).passthrough();

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

function buildSelectionFields(
  dimensions: string[],
  sumFields: string[],
  avgFields: string[],
): string {
  let fields = "";

  if (dimensions.length > 0) {
    fields += `        dimensions {\n`;
    for (const d of dimensions) {
      fields += `          ${d}\n`;
    }
    fields += `        }\n`;
  }

  fields += `        count\n`;

  if (sumFields.length > 0) {
    fields += `        sum {\n`;
    for (const f of sumFields) {
      fields += `          ${f}\n`;
    }
    fields += `        }\n`;
  }

  if (avgFields.length > 0) {
    fields += `        avg {\n`;
    for (const f of avgFields) {
      fields += `          ${f}\n`;
    }
    fields += `        }\n`;
  }

  return fields;
}

function buildFilterLiteral(
  extraFilters?: Record<string, unknown>,
): string {
  const parts: string[] = [
    "datetime_geq: $mintime",
    "datetime_lt: $maxtime",
  ];
  if (extraFilters) {
    for (const [key, value] of Object.entries(extraFilters)) {
      validateIdentifier(key, "filter key");
      parts.push(`${key}: ${JSON.stringify(value)}`);
    }
  }
  return parts.join(", ");
}

function buildGraphQLQuery(
  dataset: string,
  dimensions: string[],
  sumFields: string[],
  avgFields: string[],
  extraFilters?: Record<string, unknown>,
  orderBy?: string[],
): string {
  validateIdentifier(dataset, "dataset");
  for (const d of dimensions) validateIdentifier(d, "dimension");
  for (const f of sumFields) validateIdentifier(f, "sumField");
  for (const f of avgFields) validateIdentifier(f, "avgField");
  if (orderBy) {
    for (const o of orderBy) validateIdentifier(o, "orderBy");
  }

  const fields = buildSelectionFields(dimensions, sumFields, avgFields);
  const filterLiteral = buildFilterLiteral(extraFilters);
  const orderByLiteral = orderBy && orderBy.length > 0
    ? `, orderBy: [${orderBy.join(", ")}]`
    : "";

  return `query ($zoneTag: String!, $mintime: Time!, $maxtime: Time!, $limit: Int!) {
    viewer {
      zones(filter: { zoneTag: $zoneTag }) {
        ${dataset}(limit: $limit, filter: { ${filterLiteral} }${orderByLiteral}) {
${fields}        }
      }
    }
  }`;
}

function extractRows(
  data: Record<string, unknown>,
  dataset: string,
): Array<Record<string, unknown>> {
  const viewer = data.viewer as Record<string, unknown> | undefined;
  const zones = viewer?.zones as
    | Array<Record<string, unknown>>
    | undefined;
  const groups = zones?.[0]?.[dataset] as
    | Array<Record<string, unknown>>
    | undefined;
  return groups ?? [];
}

function sanitizeInstanceName(name: string): string {
  return name.replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
    /\0/g,
    "",
  );
}

function buildAuth(g: ModelContext["globalArgs"]): AuthOverrides {
  return { apiToken: g.apiToken, apiKey: g.apiKey, email: g.email };
}

export const model = {
  type: "@swamp/cloudflare/analytics/graphql-analytics",
  version: "VERSION_PLACEHOLDER",
  // The pipeline fills in the computed version here too, so this no-op entry
  // always steps an older instance to the current version. A schema change
  // needs a real upgrade entry instead.
  upgrades: [
    {
      toVersion: "VERSION_PLACEHOLDER",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    result: {
      description: "GraphQL Analytics query result",
      schema: ResultSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    query: {
      description:
        "Query a Cloudflare zone-level adaptive analytics dataset. " +
        "Supports httpRequestsAdaptiveGroups, firewallEventsAdaptiveGroups, " +
        "healthCheckEventsAdaptiveGroups, loadBalancingRequestsAdaptiveGroups, " +
        "and other zone-scoped GraphQL Analytics datasets. Returns grouped " +
        "rows with count, sum, and avg metric wrappers. Free plans cap " +
        "each query to a 1-day window and retain per-client-IP data for " +
        "~8 days. Some dimensions may require a higher plan tier.",
      arguments: z.object({
        dataset: z.string().describe(
          "GraphQL Analytics dataset to query (e.g. httpRequestsAdaptiveGroups, " +
            "firewallEventsAdaptiveGroups, healthCheckEventsAdaptiveGroups). " +
            "Must match the exact Cloudflare GraphQL node name.",
        ),
        dimensions: z.array(z.string()).describe(
          "Dimensions to group by. Available dimensions depend on the dataset. " +
            "For httpRequestsAdaptiveGroups: clientIP, clientRequestPath, " +
            "clientRequestHTTPHost, edgeResponseStatus, clientCountryName, " +
            "coloCode, userAgent, datetimeHour, etc.",
        ),
        sumFields: z.array(z.string()).describe(
          "Fields to aggregate with sum (e.g. edgeResponseBytes, visits). " +
            "Returned under the sum {} wrapper in each row.",
        ).optional(),
        avgFields: z.array(z.string()).describe(
          "Fields to aggregate with avg (e.g. sampleInterval). " +
            "Returned under the avg {} wrapper in each row.",
        ).optional(),
        datetime_geq: z.string().describe(
          "Start of time range, inclusive (ISO 8601, e.g. 2026-07-01T00:00:00Z)",
        ),
        datetime_lt: z.string().describe(
          "End of time range, exclusive (ISO 8601, e.g. 2026-07-02T00:00:00Z)",
        ),
        filters: z.record(z.string(), z.unknown()).describe(
          'Additional filter fields beyond the datetime range (e.g. { clientRequestHTTPHost: "example.com", edgeResponseStatus: 200 })',
        ).optional(),
        orderBy: z.array(z.string()).describe(
          'Order-by fields (e.g. ["count_DESC", "sum_edgeResponseBytes_DESC"])',
        ).optional(),
        limit: z.number().min(1).max(10000).describe(
          "Maximum number of grouped rows to return (default: 100)",
        ).optional(),
        name: z.string().describe(
          'Instance name for the result artifact (default: "current")',
        ).optional(),
      }),
      execute: async (
        args: {
          dataset: string;
          dimensions: string[];
          sumFields?: string[];
          avgFields?: string[];
          datetime_geq: string;
          datetime_lt: string;
          filters?: Record<string, unknown>;
          orderBy?: string[];
          limit?: number;
          name?: string;
        },
        context: ModelContext,
      ) => {
        const g = context.globalArgs;
        const auth = buildAuth(g);

        const sumFields = args.sumFields ?? [];
        const avgFields = args.avgFields ?? [];
        const limit = args.limit ?? 100;
        const graphqlBody = buildGraphQLQuery(
          args.dataset,
          args.dimensions,
          sumFields,
          avgFields,
          args.filters,
          args.orderBy,
        );
        const variables: Record<string, unknown> = {
          zoneTag: g.zone_id,
          mintime: args.datetime_geq,
          maxtime: args.datetime_lt,
          limit,
        };

        const data = await query(graphqlBody, variables, auth);
        const rows = extractRows(data, args.dataset);

        const result: Record<string, unknown> = {
          queriedAt: new Date().toISOString(),
          zone_id: g.zone_id,
          dataset: args.dataset,
          datetime_geq: args.datetime_geq,
          datetime_lt: args.datetime_lt,
          dimensions: args.dimensions,
          limit,
          rows,
          rowCount: rows.length,
        };
        if (sumFields.length > 0) result.sumFields = sumFields;
        if (avgFields.length > 0) result.avgFields = avgFields;
        if (args.filters) result.filters = args.filters;
        if (args.orderBy && args.orderBy.length > 0) {
          result.orderBy = args.orderBy;
        }

        const instanceName = sanitizeInstanceName(args.name ?? "current");
        const handle = await context.writeResource(
          "result",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Re-run the analytics query using the stored parameters " +
        "to refresh the snapshot. Reads the existing result artifact and " +
        "re-queries with the same dataset, dimensions, filters, orderBy, " +
        "limit, and time range.",
      arguments: z.object({
        identifier: z.string().describe(
          'Instance name of the result to refresh (default: "current")',
        ).optional(),
      }),
      execute: async (
        args: { identifier?: string },
        context: ModelContext,
      ) => {
        const instanceName = sanitizeInstanceName(
          args.identifier ?? "current",
        );

        const rawContent = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!rawContent) {
          throw new Error(
            `No existing result found for instance "${instanceName}". Run query first.`,
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(rawContent));

        const g = context.globalArgs;
        const auth = buildAuth(g);

        const dataset = existing.dataset as string;
        if (!dataset) {
          throw new Error(
            "Existing result is missing dataset field. Run a fresh query.",
          );
        }

        const dimensions = (existing.dimensions as string[]) ?? [];
        const sumFields = (existing.sumFields as string[]) ?? [];
        const avgFields = (existing.avgFields as string[]) ?? [];
        const filters = existing.filters as
          | Record<string, unknown>
          | undefined;
        const orderBy = existing.orderBy as string[] | undefined;
        const limit = (existing.limit as number) ?? 100;

        const datetimeGeq = existing.datetime_geq as string;
        const datetimeLt = existing.datetime_lt as string;
        if (!datetimeGeq || !datetimeLt) {
          throw new Error(
            "Existing result is missing datetime_geq or datetime_lt. Run a fresh query.",
          );
        }

        const graphqlBody = buildGraphQLQuery(
          dataset,
          dimensions,
          sumFields,
          avgFields,
          filters,
          orderBy,
        );
        const variables: Record<string, unknown> = {
          zoneTag: g.zone_id,
          mintime: datetimeGeq,
          maxtime: datetimeLt,
          limit,
        };

        const data = await query(graphqlBody, variables, auth);
        const rows = extractRows(data, dataset);

        const result: Record<string, unknown> = {
          queriedAt: new Date().toISOString(),
          zone_id: g.zone_id,
          dataset,
          datetime_geq: datetimeGeq,
          datetime_lt: datetimeLt,
          dimensions,
          limit,
          rows,
          rowCount: rows.length,
        };
        if (sumFields.length > 0) result.sumFields = sumFields;
        if (avgFields.length > 0) result.avgFields = avgFields;
        if (filters) result.filters = filters;
        if (orderBy && orderBy.length > 0) result.orderBy = orderBy;

        const handle = await context.writeResource(
          "result",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
