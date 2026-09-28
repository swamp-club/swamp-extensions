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

// Auto-generated extension model for @swamp/cloudflare/access/portals
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Portals.
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
  allow_code_mode: z.boolean().describe(
    "Deprecated: use `code_mode` for new integrations. `true` maps to any non-off Code Mode policy; `false` maps to `code_mode: off`. If both fields are sent, they must be consistent or the request returns a 400.",
  ).optional(),
  code_mode: z.enum(["off", "opt_in", "default_on", "enforced"]).describe(
    "Code Mode policy for this portal. `off`: Code Mode is unavailable; query parameters are ignored. `opt_in`: Code Mode is off by default; clients turn it on with `?codemode=search_and_execute`. `default_on`: Code Mode is on by default; clients can opt out with `?codemode=off`. `enforced`: Code Mode is always on; query parameters are ignored. Defaults to `opt_in` when omitted on create. If both `code_mode` and `allow_code_mode` are sent, they must be consistent or the request returns a 400.",
  ).optional(),
  description: z.string().max(512).describe(
    "Optional description of the MCP portal.",
  ).optional(),
  hostname: z.string().regex(
    new RegExp(
      "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$",
    ),
  ).describe("Hostname where the MCP portal is available.").optional(),
  name: z.string().max(350).describe("Display name for the MCP portal.")
    .optional(),
  secure_web_gateway: z.boolean().describe(
    "Route outbound MCP traffic through Zero Trust Secure Web Gateway.",
  ).optional(),
  servers: z.array(z.object({
    default_disabled: z.boolean().optional(),
    on_behalf: z.boolean().optional(),
    server_id: z.string().min(1).max(32).regex(
      new RegExp("^[a-z0-9_]+(?:-[a-z0-9_]+)*$"),
    ),
    updated_prompts: z.array(z.object({
      alias: z.string().max(40).regex(
        new RegExp("^[a-zA-Z0-9]+([_-][a-zA-Z0-9]+)*$"),
      ).optional(),
      description: z.string().optional(),
      enabled: z.boolean().optional(),
      name: z.string(),
    })).optional(),
    updated_tools: z.array(z.object({
      alias: z.string().max(40).regex(
        new RegExp("^[a-zA-Z0-9]+([_-][a-zA-Z0-9]+)*$"),
      ).optional(),
      description: z.string().optional(),
      enabled: z.boolean().optional(),
      name: z.string(),
    })).optional(),
  })).describe(
    "MCP servers attached to the portal and their portal-specific settings.",
  ).optional(),
  id: z.string().min(1).max(32).regex(
    new RegExp("^[a-z0-9_]+(?:-[a-z0-9_]+)*$"),
  ).describe("Unique identifier for the MCP portal.").optional(),
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
  allow_code_mode: z.boolean().optional(),
  code_mode: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  description: z.string().optional(),
  hostname: z.string().optional(),
  id: z.string(),
  modified_at: z.string().optional(),
  modified_by: z.string().optional(),
  name: z.string().optional(),
  secure_web_gateway: z.boolean().optional(),
  servers: z.array(z.object({
    auth_config_summary: z.object({
      auth_mode: z.string().optional(),
      client_secret_version: z.number().optional(),
      config: z.object({
        authorization_endpoint: z.string().optional(),
        issuer: z.string().optional(),
        resource: z.string().optional(),
        revocation_endpoint: z.string().optional(),
        token_endpoint: z.string().optional(),
      }).optional(),
      has_client_secret: z.boolean().optional(),
      registration_info: z.object({
        client_id: z.string().optional(),
        redirect_uris: z.array(z.string()).optional(),
        scope: z.string().optional(),
        token_endpoint_auth_method: z.string().optional(),
      }).optional(),
    }).optional(),
    auth_type: z.string().optional(),
    authentication_status: z.string().optional(),
    created_at: z.string().optional(),
    created_by: z.string().optional(),
    default_disabled: z.boolean().optional(),
    description: z.string().optional(),
    error: z.string().optional(),
    error_details: z.object({
      cause: z.string().optional(),
      is_upstream: z.boolean().optional(),
      mcp_code: z.number().optional(),
      retryable: z.boolean().optional(),
      status_code: z.number().optional(),
    }).optional(),
    hostname: z.string().optional(),
    id: z.string().optional(),
    is_shared_oauth_callback_enabled: z.boolean().optional(),
    last_successful_sync: z.string().optional(),
    last_synced: z.string().optional(),
    modified_at: z.string().optional(),
    modified_by: z.string().optional(),
    name: z.string().optional(),
    on_behalf: z.boolean().optional(),
    prompts: z.array(z.record(z.string(), z.unknown())).optional(),
    secure_web_gateway: z.boolean().optional(),
    server_id: z.string().optional(),
    status: z.string().optional(),
    tools: z.array(z.record(z.string(), z.unknown())).optional(),
    updated_prompts: z.array(z.object({
      enabled: z.boolean().optional(),
      name: z.string().optional(),
      portal_alias: z.string().optional(),
      portal_description: z.string().optional(),
      server_alias: z.string().optional(),
      server_description: z.string().optional(),
    })).optional(),
    updated_tools: z.array(z.object({
      enabled: z.boolean().optional(),
      name: z.string().optional(),
      portal_alias: z.string().optional(),
      portal_description: z.string().optional(),
      server_alias: z.string().optional(),
      server_description: z.string().optional(),
    })).optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  allow_code_mode: z.boolean().optional(),
  code_mode: z.enum(["off", "opt_in", "default_on", "enforced"]).optional(),
  description: z.string().max(512).optional(),
  hostname: z.string().regex(
    new RegExp(
      "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$",
    ),
  ).optional(),
  name: z.string().max(350).optional(),
  secure_web_gateway: z.boolean().optional(),
  servers: z.array(z.object({
    default_disabled: z.boolean().optional(),
    on_behalf: z.boolean().optional(),
    server_id: z.string().min(1).max(32).regex(
      new RegExp("^[a-z0-9_]+(?:-[a-z0-9_]+)*$"),
    ),
    updated_prompts: z.array(z.object({
      alias: z.string().max(40).regex(
        new RegExp("^[a-zA-Z0-9]+([_-][a-zA-Z0-9]+)*$"),
      ).optional(),
      description: z.string().optional(),
      enabled: z.boolean().optional(),
      name: z.string(),
    })).optional(),
    updated_tools: z.array(z.object({
      alias: z.string().max(40).regex(
        new RegExp("^[a-zA-Z0-9]+([_-][a-zA-Z0-9]+)*$"),
      ).optional(),
      description: z.string().optional(),
      enabled: z.boolean().optional(),
      name: z.string(),
    })).optional(),
  })).optional(),
  id: z.string().min(1).max(32).regex(
    new RegExp("^[a-z0-9_]+(?:-[a-z0-9_]+)*$"),
  ).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Portals. Registered at `@swamp/cloudflare/access/portals`. */
export const model = {
  type: "@swamp/cloudflare/access/portals",
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
      toVersion: "2026.06.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.14.1",
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
      toVersion: "2026.08.02.1",
      description: "Added: code_mode",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.07.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "Added: code_mode",
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
      description: "Portals resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Portals",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["hostname", "id", "name"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/portals";
        const body: Record<string, unknown> = {};
        if (g.allow_code_mode !== undefined) {
          body.allow_code_mode = g.allow_code_mode;
        }
        if (g.code_mode !== undefined) body.code_mode = g.code_mode;
        if (g.description !== undefined) body.description = g.description;
        if (g.hostname !== undefined) body.hostname = g.hostname;
        if (g.id !== undefined) body.id = g.id;
        if (g.name !== undefined) body.name = g.name;
        if (g.secure_web_gateway !== undefined) {
          body.secure_web_gateway = g.secure_web_gateway;
        }
        if (g.servers !== undefined) body.servers = g.servers;
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
      description: "Get a Portals",
      arguments: z.object({ id: z.string().describe("The ID of the Portals") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/portals";
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
        "Look up an existing Portals by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/portals";
        const filters: [string, string][] = [];
        if (g.allow_code_mode !== undefined) {
          filters.push(["allow_code_mode", String(g.allow_code_mode)]);
        }
        if (g.code_mode !== undefined) {
          filters.push(["code_mode", String(g.code_mode)]);
        }
        if (g.description !== undefined) {
          filters.push(["description", String(g.description)]);
        }
        if (g.hostname !== undefined) {
          filters.push(["hostname", String(g.hostname)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.secure_web_gateway !== undefined) {
          filters.push(["secure_web_gateway", String(g.secure_web_gateway)]);
        }
        if (g.id !== undefined) filters.push(["id", String(g.id)]);
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
          throw new Error(`No portals found matching filters: ${filterDesc}`);
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
      description: "Import an existing Portals by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Portals to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/portals";
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
      description: "Update Portals attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Portals by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/portals";
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
        if (g.allow_code_mode !== undefined) {
          body.allow_code_mode = g.allow_code_mode;
        }
        if (g.code_mode !== undefined) body.code_mode = g.code_mode;
        if (g.description !== undefined) body.description = g.description;
        if (g.hostname !== undefined) body.hostname = g.hostname;
        if (g.name !== undefined) body.name = g.name;
        if (g.secure_web_gateway !== undefined) {
          body.secure_web_gateway = g.secure_web_gateway;
        }
        if (g.servers !== undefined) body.servers = g.servers;
        const unset = ["hostname", "name"].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
            apiKey: g.apiKey,
            email: g.email,
          });
          for (const k of unset) if (live[k] !== undefined) body[k] = live[k];
        }
        const missingForUpdate = ["hostname", "name"].filter((k) =>
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
      description: "Delete the Portals",
      arguments: z.object({ id: z.string().describe("The ID of the Portals") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/portals";
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
      description: "Sync Portals state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Portals by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/portals";
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
