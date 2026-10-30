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

// Auto-generated extension model for @swamp/cloudflare/billing/spend-policies
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Spend-policies.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
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
  action: z.enum(["notification", "usage_block"]).describe(
    "The action taken when the threshold is reached. `notification` sends an email to `notification_email`. `usage_block` blocks further usage of the product until the end of the billing period. Raising the threshold above the current balance, disabling the policy, or deleting it lifts the block early.",
  ).optional(),
  enabled: z.boolean().describe("Whether the policy is evaluated.").optional(),
  name: z.string().min(1).describe(
    "Display name of the policy. After surrounding whitespace is trimmed, it must be 1 to 200 bytes long. The value is stored as sent, untrimmed.",
  ).optional(),
  notification_email: z.string().describe(
    "Email address that receives notifications. Required when `action` is `notification`. When set, it must be a bare address (`user@example.com`); display-name forms such as `Name <user@example.com>` are rejected.",
  ).optional(),
  product_id: z.enum(["workers", "durable_objects"]).describe(
    "The product the policy applies to: `workers` or `durable_objects`. Each product's balance and policies are separate. Both products support `notification` and `usage_block` policies on create and update.",
  ).optional(),
  threshold_cents: z.number().int().min(1).describe(
    "The spend threshold for the current billing period, in US cents. Must be greater than zero.",
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
  account_id: z.number().optional(),
  action: z.string().optional(),
  current_state: z.object({
    balance_cents: z.number().optional(),
    billing_period_end: z.string().optional(),
    billing_period_start: z.string().optional(),
    enforcement: z.object({
      applied_generation: z.number().optional(),
      delivery_status: z.string().optional(),
      desired_generation: z.number().optional(),
      desired_state: z.string().optional(),
      expires_at: z.string().optional(),
    }).optional(),
    evaluated_at: z.string().optional(),
    status: z.string().optional(),
  }).optional(),
  enabled: z.boolean().optional(),
  id: z.string(),
  name: z.string().optional(),
  notification_email: z.string().optional(),
  product_id: z.string().optional(),
  threshold_cents: z.number().optional(),
  version: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  action: z.enum(["notification", "usage_block"]).optional(),
  enabled: z.boolean().optional(),
  name: z.string().min(1).optional(),
  notification_email: z.string().optional(),
  product_id: z.enum(["workers", "durable_objects"]).optional(),
  threshold_cents: z.number().int().min(1).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Spend-policies. Registered at `@swamp/cloudflare/billing/spend-policies`. */
export const model = {
  type: "@swamp/cloudflare/billing/spend-policies",
  version: "2026.10.30.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Spend-policies resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    lookupResult: {
      description: "Outcome of the most recent lookup",
      schema: z.object({
        found: z.boolean(),
        filters: z.record(z.string(), z.string()),
        id: z.string().optional(),
      }),
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Spend-policies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = [
          "action",
          "enabled",
          "name",
          "product_id",
          "threshold_cents",
        ].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id +
          "/billing/spend-policies";
        const body: Record<string, unknown> = {};
        if (g.action !== undefined) body.action = g.action;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.name !== undefined) body.name = g.name;
        if (g.notification_email !== undefined) {
          body.notification_email = g.notification_email;
        }
        if (g.product_id !== undefined) body.product_id = g.product_id;
        if (g.threshold_cents !== undefined) {
          body.threshold_cents = g.threshold_cents;
        }
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
      description: "Get a Spend-policies",
      arguments: z.object({
        id: z.string().describe("The ID of the Spend-policies"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/billing/spend-policies";
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
        "Look up an existing Spend-policies by matching global argument values and import it into state",
      arguments: z.object({
        allowMissing: z.boolean().optional().describe(
          "Succeed and record found: false in lookupResult when nothing matches, instead of failing",
        ),
      }),
      execute: async (args: { allowMissing?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/billing/spend-policies";
        const filters: [string, string][] = [];
        if (g.action !== undefined) filters.push(["action", String(g.action)]);
        if (g.enabled !== undefined) {
          filters.push(["enabled", String(g.enabled)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.notification_email !== undefined) {
          filters.push(["notification_email", String(g.notification_email)]);
        }
        if (g.product_id !== undefined) {
          filters.push(["product_id", String(g.product_id)]);
        }
        if (g.threshold_cents !== undefined) {
          filters.push(["threshold_cents", String(g.threshold_cents)]);
        }
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
        const resultName = `lookup-${
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "")
        }`;
        if (matches.length === 0) {
          if (args.allowMissing) {
            const missHandle = await context.writeResource(
              "lookupResult",
              resultName,
              { found: false, filters: Object.fromEntries(filters) },
            );
            return { dataHandles: [missHandle] };
          }
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `No spend-policies found matching filters: ${filterDesc}`,
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
        const resultHandle = await context.writeResource(
          "lookupResult",
          resultName,
          {
            found: true,
            filters: Object.fromEntries(filters),
            id: result.id?.toString(),
          },
        );
        return { dataHandles: [handle, resultHandle] };
      },
    },
    adopt: {
      description:
        "Import an existing Spend-policies by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Spend-policies to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/billing/spend-policies";
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
      description: "Update Spend-policies attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Spend-policies by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/billing/spend-policies";
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
        if (g.action !== undefined) body.action = g.action;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.name !== undefined) body.name = g.name;
        if (g.notification_email !== undefined) {
          body.notification_email = g.notification_email;
        }
        if (g.product_id !== undefined) body.product_id = g.product_id;
        if (g.threshold_cents !== undefined) {
          body.threshold_cents = g.threshold_cents;
        }
        const unset = [
          "action",
          "enabled",
          "name",
          "notification_email",
          "product_id",
          "threshold_cents",
        ].filter((k) => body[k] === undefined);
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
        const missingForUpdate = [
          "action",
          "enabled",
          "name",
          "product_id",
          "threshold_cents",
        ].filter((k) => body[k] === undefined);
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
      description: "Delete the Spend-policies",
      arguments: z.object({
        id: z.string().describe("The ID of the Spend-policies"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/billing/spend-policies";
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
      description: "Sync Spend-policies state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Spend-policies by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/billing/spend-policies";
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
