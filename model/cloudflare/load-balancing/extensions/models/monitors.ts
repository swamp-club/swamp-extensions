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

// Auto-generated extension model for @swamp/cloudflare/load-balancing/monitors
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Monitors.
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
  allow_insecure: z.boolean().describe(
    "Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.",
  ).optional(),
  consecutive_down: z.number().int().describe(
    "To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.",
  ).optional(),
  consecutive_up: z.number().int().describe(
    "To be marked healthy the monitored origin must pass this healthcheck N consecutive times.",
  ).optional(),
  description: z.string().describe("Object description.").optional(),
  expected_body: z.string().describe(
    "A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  expected_codes: z.string().describe(
    "The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  follow_redirects: z.boolean().describe(
    "Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  header: z.record(z.string(), z.unknown()).describe(
    "The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  interval: z.number().int().describe(
    "The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations.",
  ).optional(),
  method: z.string().describe(
    "The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks.",
  ).optional(),
  path: z.string().describe(
    "The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  port: z.number().int().describe(
    "The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).",
  ).optional(),
  probe_zone: z.string().describe(
    "Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  retries: z.number().int().describe(
    "The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.",
  ).optional(),
  timeout: z.number().int().describe(
    "The timeout (in seconds) before marking the health check as failed.",
  ).optional(),
  type: z.enum(["http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp"])
    .describe(
      "The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'.",
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
  allow_insecure: z.boolean().optional(),
  consecutive_down: z.number().optional(),
  consecutive_up: z.number().optional(),
  description: z.string().optional(),
  expected_body: z.string().optional(),
  expected_codes: z.string().optional(),
  follow_redirects: z.boolean().optional(),
  header: z.record(z.string(), z.unknown()).optional(),
  interval: z.number().optional(),
  method: z.string().optional(),
  path: z.string().optional(),
  port: z.number().optional(),
  probe_zone: z.string().optional(),
  retries: z.number().optional(),
  timeout: z.number().optional(),
  type: z.string().optional(),
  created_on: z.string().optional(),
  id: z.string(),
  modified_on: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  allow_insecure: z.boolean().optional(),
  consecutive_down: z.number().int().optional(),
  consecutive_up: z.number().int().optional(),
  description: z.string().optional(),
  expected_body: z.string().optional(),
  expected_codes: z.string().optional(),
  follow_redirects: z.boolean().optional(),
  header: z.record(z.string(), z.unknown()).optional(),
  interval: z.number().int().optional(),
  method: z.string().optional(),
  path: z.string().optional(),
  port: z.number().int().optional(),
  probe_zone: z.string().optional(),
  retries: z.number().int().optional(),
  timeout: z.number().int().optional(),
  type: z.enum(["http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp"])
    .optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Monitors. Registered at `@swamp/cloudflare/load-balancing/monitors`. */
export const model = {
  type: "@swamp/cloudflare/load-balancing/monitors",
  version: "2026.10.20.1",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Monitors resource state",
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
      description: "Create a Monitors",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const body: Record<string, unknown> = {};
        if (g.allow_insecure !== undefined) {
          body.allow_insecure = g.allow_insecure;
        }
        if (g.consecutive_down !== undefined) {
          body.consecutive_down = g.consecutive_down;
        }
        if (g.consecutive_up !== undefined) {
          body.consecutive_up = g.consecutive_up;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.expected_body !== undefined) body.expected_body = g.expected_body;
        if (g.expected_codes !== undefined) {
          body.expected_codes = g.expected_codes;
        }
        if (g.follow_redirects !== undefined) {
          body.follow_redirects = g.follow_redirects;
        }
        if (g.header !== undefined) body.header = g.header;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.method !== undefined) body.method = g.method;
        if (g.path !== undefined) body.path = g.path;
        if (g.port !== undefined) body.port = g.port;
        if (g.probe_zone !== undefined) body.probe_zone = g.probe_zone;
        if (g.retries !== undefined) body.retries = g.retries;
        if (g.timeout !== undefined) body.timeout = g.timeout;
        if (g.type !== undefined) body.type = g.type;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.description?.toString() ?? "current").replace(
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
      description: "Get a Monitors",
      arguments: z.object({
        id: z.string().describe("The ID of the Monitors"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.description?.toString() ?? args.id).replace(
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
        "Look up an existing Monitors by matching global argument values and import it into state",
      arguments: z.object({
        allowMissing: z.boolean().optional().describe(
          "Succeed and record found: false in lookupResult when nothing matches, instead of failing",
        ),
      }),
      execute: async (args: { allowMissing?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const filters: [string, string][] = [];
        if (g.allow_insecure !== undefined) {
          filters.push(["allow_insecure", String(g.allow_insecure)]);
        }
        if (g.consecutive_down !== undefined) {
          filters.push(["consecutive_down", String(g.consecutive_down)]);
        }
        if (g.consecutive_up !== undefined) {
          filters.push(["consecutive_up", String(g.consecutive_up)]);
        }
        if (g.description !== undefined) {
          filters.push(["description", String(g.description)]);
        }
        if (g.expected_body !== undefined) {
          filters.push(["expected_body", String(g.expected_body)]);
        }
        if (g.expected_codes !== undefined) {
          filters.push(["expected_codes", String(g.expected_codes)]);
        }
        if (g.follow_redirects !== undefined) {
          filters.push(["follow_redirects", String(g.follow_redirects)]);
        }
        if (g.interval !== undefined) {
          filters.push(["interval", String(g.interval)]);
        }
        if (g.method !== undefined) filters.push(["method", String(g.method)]);
        if (g.path !== undefined) filters.push(["path", String(g.path)]);
        if (g.port !== undefined) filters.push(["port", String(g.port)]);
        if (g.probe_zone !== undefined) {
          filters.push(["probe_zone", String(g.probe_zone)]);
        }
        if (g.retries !== undefined) {
          filters.push(["retries", String(g.retries)]);
        }
        if (g.timeout !== undefined) {
          filters.push(["timeout", String(g.timeout)]);
        }
        if (g.type !== undefined) filters.push(["type", String(g.type)]);
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
          (g.description?.toString() ?? "current").replace(/[\/\\]/g, "_")
            .replace(/\.\./g, "_").replace(/\0/g, "")
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
          throw new Error(`No monitors found matching filters: ${filterDesc}`);
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
          (g.description?.toString() ?? result.id?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
        "Import an existing Monitors by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Monitors to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName =
          (result.description?.toString() ?? g.description?.toString() ??
            args.id).replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update Monitors attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Monitors by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const instanceName =
          (g.description?.toString() ?? args.identifier ?? "current").replace(
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
        if (g.allow_insecure !== undefined) {
          body.allow_insecure = g.allow_insecure;
        }
        if (g.consecutive_down !== undefined) {
          body.consecutive_down = g.consecutive_down;
        }
        if (g.consecutive_up !== undefined) {
          body.consecutive_up = g.consecutive_up;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.expected_body !== undefined) body.expected_body = g.expected_body;
        if (g.expected_codes !== undefined) {
          body.expected_codes = g.expected_codes;
        }
        if (g.follow_redirects !== undefined) {
          body.follow_redirects = g.follow_redirects;
        }
        if (g.header !== undefined) body.header = g.header;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.method !== undefined) body.method = g.method;
        if (g.path !== undefined) body.path = g.path;
        if (g.port !== undefined) body.port = g.port;
        if (g.probe_zone !== undefined) body.probe_zone = g.probe_zone;
        if (g.retries !== undefined) body.retries = g.retries;
        if (g.timeout !== undefined) body.timeout = g.timeout;
        if (g.type !== undefined) body.type = g.type;
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
      description: "Delete the Monitors",
      arguments: z.object({
        id: z.string().describe("The ID of the Monitors"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const instanceName =
          (context.globalArgs.description?.toString() ?? args.id).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Monitors state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Monitors by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const instanceName =
          (g.description?.toString() ?? args.identifier ?? "current").replace(
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
