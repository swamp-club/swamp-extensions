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

// Auto-generated extension model for @swamp/cloudflare/page-rules/pagerules
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Pagerules.
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
  zone_id: z.string().describe("Cloudflare zone ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  actions: z.array(z.object({
    id: z.enum([
      "always_use_https",
      "automatic_https_rewrites",
      "browser_cache_ttl",
      "browser_check",
      "bypass_cache_on_cookie",
      "cache_by_device_type",
      "cache_deception_armor",
      "cache_key_fields",
      "cache_level",
      "cache_on_cookie",
      "cache_ttl_by_status",
      "disable_apps",
      "disable_performance",
      "disable_security",
      "disable_zaraz",
      "edge_cache_ttl",
      "email_obfuscation",
      "explicit_cache_control",
      "forwarding_url",
      "host_header_override",
      "ip_geolocation",
      "mirage",
      "opportunistic_encryption",
      "origin_error_page_pass_thru",
      "polish",
      "resolve_override",
      "respect_strong_etag",
      "response_buffering",
      "rocket_loader",
      "security_level",
      "sort_query_string_for_cache",
      "ssl",
      "true_client_ip_header",
      "waf",
    ]).optional(),
    value: z.enum([
      "on",
      "off",
      "bypass",
      "basic",
      "simplified",
      "aggressive",
      "cache_everything",
      "lossless",
      "lossy",
      "essentially_off",
      "low",
      "medium",
      "high",
      "under_attack",
      "flexible",
      "full",
      "strict",
      "origin_pull",
    ]).optional(),
  })).describe(
    "The set of actions to perform if the targets of this rule match the\nrequest. Actions can redirect to another URL or override settings, but\nnot both.\n",
  ).optional(),
  priority: z.number().int().describe(
    "The priority of the rule, used to define which Page Rule is processed\nover another. A higher number indicates a higher priority. For example,\nif you have a catch-all Page Rule (rule A: `/images/*`) but want a more\nspecific Page Rule to take precedence (rule B: `/images/special/*`),\nspecify a higher priority for rule B so it overrides rule A.\n",
  ).optional(),
  status: z.enum(["active", "disabled"]).describe(
    "The status of the Page Rule.",
  ).optional(),
  targets: z.array(z.object({
    constraint: z.object({
      operator: z.enum([
        "matches",
        "contains",
        "equals",
        "not_equal",
        "not_contain",
      ]),
      value: z.string().regex(
        new RegExp(
          "^(https?://)?(([-a-zA-Z0-9*]*\\.)+[-a-zA-Z0-9]{2,20})(:(8080|8443|443|80))?(/[\\S]+)?$",
        ),
      ),
    }).optional(),
    target: z.enum(["url"]).optional(),
  })).describe("The rule targets to evaluate on each request.").optional(),
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
  actions: z.array(z.object({
    id: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  created_on: z.string().optional(),
  id: z.string(),
  modified_on: z.string().optional(),
  priority: z.number().optional(),
  status: z.string().optional(),
  targets: z.array(z.object({
    constraint: z.object({
      operator: z.string().optional(),
      value: z.string().optional(),
    }).optional(),
    target: z.string().optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  name: z.string().optional(),
  actions: z.array(z.object({
    id: z.enum([
      "always_use_https",
      "automatic_https_rewrites",
      "browser_cache_ttl",
      "browser_check",
      "bypass_cache_on_cookie",
      "cache_by_device_type",
      "cache_deception_armor",
      "cache_key_fields",
      "cache_level",
      "cache_on_cookie",
      "cache_ttl_by_status",
      "disable_apps",
      "disable_performance",
      "disable_security",
      "disable_zaraz",
      "edge_cache_ttl",
      "email_obfuscation",
      "explicit_cache_control",
      "forwarding_url",
      "host_header_override",
      "ip_geolocation",
      "mirage",
      "opportunistic_encryption",
      "origin_error_page_pass_thru",
      "polish",
      "resolve_override",
      "respect_strong_etag",
      "response_buffering",
      "rocket_loader",
      "security_level",
      "sort_query_string_for_cache",
      "ssl",
      "true_client_ip_header",
      "waf",
    ]).optional(),
    value: z.enum([
      "on",
      "off",
      "bypass",
      "basic",
      "simplified",
      "aggressive",
      "cache_everything",
      "lossless",
      "lossy",
      "essentially_off",
      "low",
      "medium",
      "high",
      "under_attack",
      "flexible",
      "full",
      "strict",
      "origin_pull",
    ]).optional(),
  })).optional(),
  priority: z.number().int().optional(),
  status: z.enum(["active", "disabled"]).optional(),
  targets: z.array(z.object({
    constraint: z.object({
      operator: z.enum([
        "matches",
        "contains",
        "equals",
        "not_equal",
        "not_contain",
      ]),
      value: z.string().regex(
        new RegExp(
          "^(https?://)?(([-a-zA-Z0-9*]*\\.)+[-a-zA-Z0-9]{2,20})(:(8080|8443|443|80))?(/[\\S]+)?$",
        ),
      ),
    }).optional(),
    target: z.enum(["url"]).optional(),
  })).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Pagerules. Registered at `@swamp/cloudflare/page-rules/pagerules`. */
export const model = {
  type: "@swamp/cloudflare/page-rules/pagerules",
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
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Pagerules resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Pagerules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["actions", "targets"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/zones/" + g.zone_id + "/pagerules";
        const body: Record<string, unknown> = {};
        if (g.actions !== undefined) body.actions = g.actions;
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.status !== undefined) body.status = g.status;
        if (g.targets !== undefined) body.targets = g.targets;
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
      description: "Get a Pagerules",
      arguments: z.object({
        id: z.string().describe("The ID of the Pagerules"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/pagerules";
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
        "Look up an existing Pagerules by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/pagerules";
        const filters: [string, string][] = [];
        if (g.priority !== undefined) {
          filters.push(["priority", String(g.priority)]);
        }
        if (g.status !== undefined) filters.push(["status", String(g.status)]);
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
          throw new Error(`No pagerules found matching filters: ${filterDesc}`);
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
        "Import an existing Pagerules by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Pagerules to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/pagerules";
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
      description: "Update Pagerules attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Pagerules by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/pagerules";
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
        if (g.actions !== undefined) body.actions = g.actions;
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.status !== undefined) body.status = g.status;
        if (g.targets !== undefined) body.targets = g.targets;
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
      description: "Delete the Pagerules",
      arguments: z.object({
        id: z.string().describe("The ID of the Pagerules"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/pagerules";
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
      description: "Sync Pagerules state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Pagerules by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/pagerules";
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
