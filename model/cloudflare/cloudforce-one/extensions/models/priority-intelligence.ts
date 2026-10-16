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

// Auto-generated extension model for @swamp/cloudflare/cloudforce-one/priority-intelligence
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Priority-intelligence.
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  confirm_query: z.boolean().describe(
    "Write-only. `true` confirms the query still fits the requirement, clearing `query_stale` without changing the query or its version. Requires a query.",
  ).optional(),
  dataset_scope: z.object({
    type: z.enum(["default", "datasets"]),
    dataset_ids: z.array(z.string()).optional(),
  }).optional(),
  digest_interval_hours: z.union([z.literal(6), z.literal(12), z.literal(24)])
    .describe(
      "Hours between digests: 6, 12, or 24. Used only when `notification_mode` is `digest`.",
    ).optional(),
  intent: z.object({
    clauses: z.array(z.object({
      actors: z.array(z.string().min(1).max(200)),
      attacker_countries: z.array(z.string().min(1).max(200)),
      categories: z.array(z.string().min(1).max(200)),
      cves: z.array(z.string().min(1).max(200)),
      keywords: z.array(z.string().min(1).max(200)),
      target_countries: z.array(z.string().min(1).max(200)),
      target_industries: z.array(z.string().min(1).max(200)),
      techniques: z.array(z.string().min(1).max(200)),
    })),
    indicators: z.array(z.string().min(1).max(200)),
    unsupported_terms: z.array(z.string().min(1).max(200)),
  }).optional(),
  labels: z.array(z.string().max(100)).optional(),
  model: z.string().min(1).max(200).optional(),
  notification_mode: z.enum(["none", "immediate", "digest"]).describe(
    "`none` or `digest`. Notifications are opt-in. `immediate` is reserved and currently rejected.",
  ).optional(),
  priority: z.number().int().min(0).optional(),
  query: z.object({
    branches: z.array(z.array(z.object({
      field: z.enum([
        "attacker",
        "attackerCountry",
        "category",
        "createdAt",
        "date",
        "event",
        "indicator",
        "indicatorType",
        "mitreAttack",
        "mitreCapec",
        "tags",
        "targetCountry",
        "targetIndustry",
        "tlp",
        "uuid",
        "killChain",
        "hasChildren",
      ]),
      op: z.enum([
        "equals",
        "not",
        "gt",
        "gte",
        "lt",
        "lte",
        "like",
        "contains",
        "startsWith",
        "endsWith",
        "find",
        "in",
      ]),
      value: z.string().min(1).max(512),
    }))),
    version: z.number().int().optional(),
  }).optional(),
  query_source: z.enum(["generated", "edited"]).optional(),
  requirement: z.string().min(1).max(4000).optional(),
  status: z.enum(["draft", "active"]).describe(
    "`draft`: not monitored. `active`: monitored, unless `pause_reason` is set. Setting `active` on a PIR with a `pause_reason` resumes it. Moving a PIR back to `draft` and activating it again starts matching afresh with a 30-day backfill.",
  ).optional(),
  title: z.string().min(1).max(200).optional(),
  tlp: z.string().optional(),
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
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  confirm_query: z.boolean().optional(),
  dataset_scope: z.object({
    type: z.enum(["default", "datasets"]),
    dataset_ids: z.array(z.string()).optional(),
  }).optional(),
  digest_interval_hours: z.union([z.literal(6), z.literal(12), z.literal(24)])
    .optional(),
  intent: z.object({
    clauses: z.array(z.object({
      actors: z.array(z.string().min(1).max(200)),
      attacker_countries: z.array(z.string().min(1).max(200)),
      categories: z.array(z.string().min(1).max(200)),
      cves: z.array(z.string().min(1).max(200)),
      keywords: z.array(z.string().min(1).max(200)),
      target_countries: z.array(z.string().min(1).max(200)),
      target_industries: z.array(z.string().min(1).max(200)),
      techniques: z.array(z.string().min(1).max(200)),
    })),
    indicators: z.array(z.string().min(1).max(200)),
    unsupported_terms: z.array(z.string().min(1).max(200)),
  }).optional(),
  labels: z.array(z.string().max(100)).optional(),
  model: z.string().min(1).max(200).optional(),
  notification_mode: z.enum(["none", "immediate", "digest"]).optional(),
  priority: z.number().int().min(0).optional(),
  query: z.object({
    branches: z.array(z.array(z.object({
      field: z.enum([
        "attacker",
        "attackerCountry",
        "category",
        "createdAt",
        "date",
        "event",
        "indicator",
        "indicatorType",
        "mitreAttack",
        "mitreCapec",
        "tags",
        "targetCountry",
        "targetIndustry",
        "tlp",
        "uuid",
        "killChain",
        "hasChildren",
      ]),
      op: z.enum([
        "equals",
        "not",
        "gt",
        "gte",
        "lt",
        "lte",
        "like",
        "contains",
        "startsWith",
        "endsWith",
        "find",
        "in",
      ]),
      value: z.string().min(1).max(512),
    }))),
    version: z.number().int().optional(),
  }).optional(),
  query_source: z.enum(["generated", "edited"]).optional(),
  requirement: z.string().min(1).max(4000).optional(),
  status: z.enum(["draft", "active"]).optional(),
  title: z.string().min(1).max(200).optional(),
  tlp: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Priority-intelligence. Registered at `@swamp/cloudflare/cloudforce-one/priority-intelligence`. */
export const model = {
  type: "@swamp/cloudflare/cloudforce-one/priority-intelligence",
  version: "2026.10.16.1",
  upgrades: [
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description:
        "Added: confirm_query, dataset_scope, intent, model, notification_mode, query, query_source, status, title",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.14.1",
      description: "Added: digest_interval_hours",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.16.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Priority-intelligence resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Priority-intelligence",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["requirement"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/priority-intelligence";
        const body: Record<string, unknown> = {};
        if (g.dataset_scope !== undefined) body.dataset_scope = g.dataset_scope;
        if (g.digest_interval_hours !== undefined) {
          body.digest_interval_hours = g.digest_interval_hours;
        }
        if (g.intent !== undefined) body.intent = g.intent;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.model !== undefined) body.model = g.model;
        if (g.notification_mode !== undefined) {
          body.notification_mode = g.notification_mode;
        }
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.query !== undefined) body.query = g.query;
        if (g.query_source !== undefined) body.query_source = g.query_source;
        if (g.requirement !== undefined) body.requirement = g.requirement;
        if (g.status !== undefined) body.status = g.status;
        if (g.title !== undefined) body.title = g.title;
        if (g.tlp !== undefined) body.tlp = g.tlp;
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
      description: "Get a Priority-intelligence",
      arguments: z.object({
        id: z.string().describe("The ID of the Priority-intelligence"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/priority-intelligence";
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
        "Look up an existing Priority-intelligence by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/priority-intelligence";
        const filters: [string, string][] = [];
        if (g.confirm_query !== undefined) {
          filters.push(["confirm_query", String(g.confirm_query)]);
        }
        if (g.digest_interval_hours !== undefined) {
          filters.push([
            "digest_interval_hours",
            String(g.digest_interval_hours),
          ]);
        }
        if (g.model !== undefined) filters.push(["model", String(g.model)]);
        if (g.notification_mode !== undefined) {
          filters.push(["notification_mode", String(g.notification_mode)]);
        }
        if (g.priority !== undefined) {
          filters.push(["priority", String(g.priority)]);
        }
        if (g.query_source !== undefined) {
          filters.push(["query_source", String(g.query_source)]);
        }
        if (g.requirement !== undefined) {
          filters.push(["requirement", String(g.requirement)]);
        }
        if (g.status !== undefined) filters.push(["status", String(g.status)]);
        if (g.title !== undefined) filters.push(["title", String(g.title)]);
        if (g.tlp !== undefined) filters.push(["tlp", String(g.tlp)]);
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
          throw new Error(
            `No priority-intelligence found matching filters: ${filterDesc}`,
          );
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
      description:
        "Import an existing Priority-intelligence by ID into state for management",
      arguments: z.object({
        id: z.string().describe(
          "The ID of the Priority-intelligence to import",
        ),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/priority-intelligence";
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
      description: "Update Priority-intelligence attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Priority-intelligence by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/priority-intelligence";
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
        if (g.confirm_query !== undefined) body.confirm_query = g.confirm_query;
        if (g.dataset_scope !== undefined) body.dataset_scope = g.dataset_scope;
        if (g.digest_interval_hours !== undefined) {
          body.digest_interval_hours = g.digest_interval_hours;
        }
        if (g.intent !== undefined) body.intent = g.intent;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.model !== undefined) body.model = g.model;
        if (g.notification_mode !== undefined) {
          body.notification_mode = g.notification_mode;
        }
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.query !== undefined) body.query = g.query;
        if (g.query_source !== undefined) body.query_source = g.query_source;
        if (g.requirement !== undefined) body.requirement = g.requirement;
        if (g.status !== undefined) body.status = g.status;
        if (g.title !== undefined) body.title = g.title;
        if (g.tlp !== undefined) body.tlp = g.tlp;
        const unset = ["requirement"].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
            apiKey: g.apiKey,
            email: g.email,
          });
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const missingForUpdate = ["requirement"].filter((k) =>
          body[k] === undefined
        );
        if (missingForUpdate.length > 0) {
          throw new Error(
            "update requires global arguments: " + missingForUpdate.join(", "),
          );
        }
        const result = await update(endpoint, existing.id, body, "PUT", {
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
      description: "Delete the Priority-intelligence",
      arguments: z.object({
        id: z.string().describe("The ID of the Priority-intelligence"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/priority-intelligence";
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
      description: "Sync Priority-intelligence state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Priority-intelligence by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/cloudforce-one/v2/priority-intelligence";
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
