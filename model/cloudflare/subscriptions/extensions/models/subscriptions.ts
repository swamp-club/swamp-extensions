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

// Auto-generated extension model for @swamp/cloudflare/subscriptions/subscriptions
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Subscriptions.
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
  app: z.object({
    install_id: z.string().optional(),
  }).describe(
    "Cloudflare Apps Marketplace is sunset. This field is retained for legacy grandfathered app subscriptions only.",
  ).optional(),
  component_values: z.array(z.object({
    default: z.number().optional(),
    display_name: z.string().optional(),
    kind: z.enum(["enum", "sum", "usage"]).optional(),
    name: z.string().optional(),
    price: z.number().optional(),
    value: z.number().optional(),
  })).describe("Configurable component values for the subscription.")
    .optional(),
  currency: z.string().describe(
    "The monetary unit in which pricing information is displayed.",
  ).optional(),
  current_period_end: z.string().describe(
    "The end of the current period and also when the next billing is due.",
  ).optional(),
  current_period_start: z.string().describe(
    "When the current billing period started. May match initial_period_start if this is the first period.",
  ).optional(),
  frequency: z.enum(["weekly", "monthly", "quarterly", "yearly"]).describe(
    "How often the subscription is renewed automatically.",
  ).optional(),
  id: z.string().max(32).describe("Subscription identifier tag.").optional(),
  price: z.number().describe(
    "The price of the subscription that will be billed, in US dollars.",
  ).optional(),
  rate_plan: z.object({
    currency: z.string().optional(),
    externally_managed: z.boolean().optional(),
    id: z.string().optional(),
    is_contract: z.boolean().optional(),
    public_name: z.string().optional(),
    scope: z.string().optional(),
    sets: z.array(z.string()).optional(),
  }).describe("The rate plan applied to the subscription.").optional(),
  state: z.enum([
    "Trial",
    "Provisioned",
    "Paid",
    "AwaitingPayment",
    "Cancelled",
    "Failed",
    "Expired",
  ]).describe("The state that the subscription is in.").optional(),
  zone: z.object({
    id: z.string().max(32).optional(),
    name: z.string().max(253).regex(
      new RegExp("^([a-zA-Z0-9][\\-a-zA-Z0-9]*\\.)+[\\-a-zA-Z0-9]{2,20}$"),
    ).optional(),
  }).describe(
    "A simple zone object. May have null properties if not a zone subscription.",
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
  app: z.object({
    install_id: z.string().optional(),
  }).optional(),
  component_values: z.array(z.object({
    default: z.number().optional(),
    display_name: z.string().optional(),
    kind: z.string().optional(),
    name: z.string().optional(),
    price: z.number().optional(),
    value: z.number().optional(),
  })).optional(),
  currency: z.string().optional(),
  current_period_end: z.string().optional(),
  current_period_start: z.string().optional(),
  frequency: z.string().optional(),
  id: z.string(),
  price: z.number().optional(),
  rate_plan: z.object({
    currency: z.string().optional(),
    externally_managed: z.boolean().optional(),
    id: z.string().optional(),
    is_contract: z.boolean().optional(),
    public_name: z.string().optional(),
    scope: z.string().optional(),
    sets: z.array(z.string()).optional(),
  }).optional(),
  state: z.string().optional(),
  zone: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  app: z.object({
    install_id: z.string().optional(),
  }).optional(),
  component_values: z.array(z.object({
    default: z.number().optional(),
    display_name: z.string().optional(),
    kind: z.enum(["enum", "sum", "usage"]).optional(),
    name: z.string().optional(),
    price: z.number().optional(),
    value: z.number().optional(),
  })).optional(),
  currency: z.string().optional(),
  current_period_end: z.string().optional(),
  current_period_start: z.string().optional(),
  frequency: z.enum(["weekly", "monthly", "quarterly", "yearly"]).optional(),
  id: z.string().max(32).optional(),
  price: z.number().optional(),
  rate_plan: z.object({
    currency: z.string().optional(),
    externally_managed: z.boolean().optional(),
    id: z.string().optional(),
    is_contract: z.boolean().optional(),
    public_name: z.string().optional(),
    scope: z.string().optional(),
    sets: z.array(z.string()).optional(),
  }).optional(),
  state: z.enum([
    "Trial",
    "Provisioned",
    "Paid",
    "AwaitingPayment",
    "Cancelled",
    "Failed",
    "Expired",
  ]).optional(),
  zone: z.object({
    id: z.string().max(32).optional(),
    name: z.string().max(253).regex(
      new RegExp("^([a-zA-Z0-9][\\-a-zA-Z0-9]*\\.)+[\\-a-zA-Z0-9]{2,20}$"),
    ).optional(),
  }).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Subscriptions. Registered at `@swamp/cloudflare/subscriptions/subscriptions`. */
export const model = {
  type: "@swamp/cloudflare/subscriptions/subscriptions",
  version: "2026.09.01.1",
  upgrades: [
    {
      toVersion: "2026.09.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Subscriptions resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Subscriptions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/subscriptions";
        const body: Record<string, unknown> = {};
        if (g.app !== undefined) body.app = g.app;
        if (g.component_values !== undefined) {
          body.component_values = g.component_values;
        }
        if (g.currency !== undefined) body.currency = g.currency;
        if (g.current_period_end !== undefined) {
          body.current_period_end = g.current_period_end;
        }
        if (g.current_period_start !== undefined) {
          body.current_period_start = g.current_period_start;
        }
        if (g.frequency !== undefined) body.frequency = g.frequency;
        if (g.id !== undefined) body.id = g.id;
        if (g.price !== undefined) body.price = g.price;
        if (g.rate_plan !== undefined) body.rate_plan = g.rate_plan;
        if (g.state !== undefined) body.state = g.state;
        if (g.zone !== undefined) body.zone = g.zone;
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
      description: "Get a Subscriptions",
      arguments: z.object({
        id: z.string().describe("The ID of the Subscriptions"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/subscriptions";
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
        "Look up an existing Subscriptions by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/subscriptions";
        const filters: [string, string][] = [];
        if (g.currency !== undefined) {
          filters.push(["currency", String(g.currency)]);
        }
        if (g.current_period_end !== undefined) {
          filters.push(["current_period_end", String(g.current_period_end)]);
        }
        if (g.current_period_start !== undefined) {
          filters.push([
            "current_period_start",
            String(g.current_period_start),
          ]);
        }
        if (g.frequency !== undefined) {
          filters.push(["frequency", String(g.frequency)]);
        }
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
        if (g.price !== undefined) filters.push(["price", String(g.price)]);
        if (g.state !== undefined) filters.push(["state", String(g.state)]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "none", undefined, {
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
            `No subscriptions found matching filters: ${filterDesc}`,
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
        "Import an existing Subscriptions by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Subscriptions to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/subscriptions";
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
      description: "Update Subscriptions attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Subscriptions by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/subscriptions";
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
        if (g.app !== undefined) body.app = g.app;
        if (g.component_values !== undefined) {
          body.component_values = g.component_values;
        }
        if (g.currency !== undefined) body.currency = g.currency;
        if (g.current_period_end !== undefined) {
          body.current_period_end = g.current_period_end;
        }
        if (g.current_period_start !== undefined) {
          body.current_period_start = g.current_period_start;
        }
        if (g.frequency !== undefined) body.frequency = g.frequency;
        if (g.id !== undefined) body.id = g.id;
        if (g.price !== undefined) body.price = g.price;
        if (g.rate_plan !== undefined) body.rate_plan = g.rate_plan;
        if (g.state !== undefined) body.state = g.state;
        if (g.zone !== undefined) body.zone = g.zone;
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
      description: "Delete the Subscriptions",
      arguments: z.object({
        id: z.string().describe("The ID of the Subscriptions"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/subscriptions";
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
      description: "Sync Subscriptions state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Subscriptions by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/subscriptions";
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
