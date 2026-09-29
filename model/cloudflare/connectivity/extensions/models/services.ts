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

// Auto-generated extension model for @swamp/cloudflare/connectivity/services
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Services.
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
  created_at: z.string().optional(),
  host: z.object({
    ipv4: z.string().optional(),
    network: z.object({
      tunnel_id: z.string(),
    }).optional(),
    ipv6: z.string().optional(),
    hostname: z.string().optional(),
    resolver_network: z.object({
      resolver_ips: z.array(z.string()).optional(),
      tunnel_id: z.string(),
    }).optional(),
  }).optional(),
  name: z.string().optional(),
  service_id: z.string().optional(),
  tls_settings: z.object({
    cert_verification_mode: z.string(),
  }).describe(
    "TLS settings for a connectivity service.\n\nIf omitted, the default mode (`verify_full`) is used.",
  ).optional(),
  type: z.enum(["tcp", "http"]).optional(),
  updated_at: z.string().optional(),
  http_port: z.number().int().min(1).optional(),
  https_port: z.number().int().min(1).optional(),
  app_protocol: z.enum(["postgresql", "mysql"]).optional(),
  tcp_port: z.number().int().min(1).optional(),
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
  errors: z.array(z.object({
    code: z.number().optional(),
    documentation_url: z.string().optional(),
    message: z.string().optional(),
    source: z.object({
      pointer: z.string().optional(),
    }).optional(),
  })).optional(),
  messages: z.array(z.object({
    code: z.number().optional(),
    documentation_url: z.string().optional(),
    message: z.string().optional(),
    source: z.object({
      pointer: z.string().optional(),
    }).optional(),
  })).optional(),
  success: z.boolean().optional(),
  result: z.object({
    created_at: z.string().optional(),
    host: z.object({
      ipv4: z.string().optional(),
      network: z.object({
        tunnel_id: z.string().optional(),
      }).optional(),
      ipv6: z.string().optional(),
      hostname: z.string().optional(),
      resolver_network: z.object({
        resolver_ips: z.array(z.string()).optional(),
        tunnel_id: z.string().optional(),
      }).optional(),
    }).optional(),
    name: z.string().optional(),
    service_id: z.string().optional(),
    tls_settings: z.object({
      cert_verification_mode: z.string().optional(),
    }).optional(),
    type: z.string().optional(),
    updated_at: z.string().optional(),
    http_port: z.number().optional(),
    https_port: z.number().optional(),
    app_protocol: z.string().optional(),
    tcp_port: z.number().optional(),
  }).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  created_at: z.string().optional(),
  host: z.object({
    ipv4: z.string().optional(),
    network: z.object({
      tunnel_id: z.string(),
    }).optional(),
    ipv6: z.string().optional(),
    hostname: z.string().optional(),
    resolver_network: z.object({
      resolver_ips: z.array(z.string()).optional(),
      tunnel_id: z.string(),
    }).optional(),
  }).optional(),
  name: z.string().optional(),
  service_id: z.string().optional(),
  tls_settings: z.object({
    cert_verification_mode: z.string(),
  }).optional(),
  type: z.enum(["tcp", "http"]).optional(),
  updated_at: z.string().optional(),
  http_port: z.number().int().min(1).optional(),
  https_port: z.number().int().min(1).optional(),
  app_protocol: z.enum(["postgresql", "mysql"]).optional(),
  tcp_port: z.number().int().min(1).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Services. Registered at `@swamp/cloudflare/connectivity/services`. */
export const model = {
  type: "@swamp/cloudflare/connectivity/services",
  version: "2026.09.29.2",
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
    {
      toVersion: "2026.09.29.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Services resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Services",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["host", "name", "type"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id +
          "/connectivity/directory/services";
        const body: Record<string, unknown> = {};
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.host !== undefined) body.host = g.host;
        if (g.name !== undefined) body.name = g.name;
        if (g.service_id !== undefined) body.service_id = g.service_id;
        if (g.tls_settings !== undefined) body.tls_settings = g.tls_settings;
        if (g.type !== undefined) body.type = g.type;
        if (g.updated_at !== undefined) body.updated_at = g.updated_at;
        if (g.http_port !== undefined) body.http_port = g.http_port;
        if (g.https_port !== undefined) body.https_port = g.https_port;
        if (g.app_protocol !== undefined) body.app_protocol = g.app_protocol;
        if (g.tcp_port !== undefined) body.tcp_port = g.tcp_port;
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
      description: "Get a Services",
      arguments: z.object({
        id: z.string().describe("The ID of the Services"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/connectivity/directory/services";
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
        "Look up an existing Services by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/connectivity/directory/services";
        const filters: [string, string][] = [];
        if (g.created_at !== undefined) {
          filters.push(["created_at", String(g.created_at)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.service_id !== undefined) {
          filters.push(["service_id", String(g.service_id)]);
        }
        if (g.type !== undefined) filters.push(["type", String(g.type)]);
        if (g.updated_at !== undefined) {
          filters.push(["updated_at", String(g.updated_at)]);
        }
        if (g.http_port !== undefined) {
          filters.push(["http_port", String(g.http_port)]);
        }
        if (g.https_port !== undefined) {
          filters.push(["https_port", String(g.https_port)]);
        }
        if (g.app_protocol !== undefined) {
          filters.push(["app_protocol", String(g.app_protocol)]);
        }
        if (g.tcp_port !== undefined) {
          filters.push(["tcp_port", String(g.tcp_port)]);
        }
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
          throw new Error(`No services found matching filters: ${filterDesc}`);
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
        "Import an existing Services by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Services to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/connectivity/directory/services";
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
      description: "Update Services attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Services by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/connectivity/directory/services";
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
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.host !== undefined) body.host = g.host;
        if (g.name !== undefined) body.name = g.name;
        if (g.service_id !== undefined) body.service_id = g.service_id;
        if (g.tls_settings !== undefined) body.tls_settings = g.tls_settings;
        if (g.type !== undefined) body.type = g.type;
        if (g.updated_at !== undefined) body.updated_at = g.updated_at;
        if (g.http_port !== undefined) body.http_port = g.http_port;
        if (g.https_port !== undefined) body.https_port = g.https_port;
        if (g.app_protocol !== undefined) body.app_protocol = g.app_protocol;
        if (g.tcp_port !== undefined) body.tcp_port = g.tcp_port;
        const unset = ["host", "name", "type"].filter((k) =>
          body[k] === undefined
        );
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
        const missingForUpdate = ["host", "name", "type"].filter((k) =>
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
      description: "Delete the Services",
      arguments: z.object({
        id: z.string().describe("The ID of the Services"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/connectivity/directory/services";
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
      description: "Sync Services state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Services by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/connectivity/directory/services";
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
