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

// Auto-generated extension model for @swamp/cloudflare/access/servers
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Servers.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  auth_credentials: z.string().optional(),
  description: z.string().max(512).optional(),
  is_shared_oauth_callback_enabled: z.boolean().describe(
    "When true, the gateway worker uses the shared Cloudflare-owned OAuth callback endpoint as the redirect_uri for upstream on-behalf OAuth, instead of the customer portal hostname. New public server creates default to true; existing servers default to false from migration until explicitly updated. Effective behavior is gated by the gateway worker's per-env rollout mode KV key.",
  ).optional(),
  name: z.string().max(350),
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
  auth_type: z.enum(["oauth", "bearer", "unauthenticated"]),
  hostname: z.string(),
  id: z.string().min(1).max(32).regex(
    new RegExp("^[a-z0-9_]+(?:-[a-z0-9_]+)*$"),
  ).describe("server id"),
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
  auth_type: z.string().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
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
  id: z.string(),
  is_shared_oauth_callback_enabled: z.boolean().optional(),
  last_successful_sync: z.string().optional(),
  last_synced: z.string().optional(),
  modified_at: z.string().optional(),
  modified_by: z.string().optional(),
  name: z.string().optional(),
  prompts: z.array(z.record(z.string(), z.unknown())).optional(),
  status: z.string().optional(),
  tools: z.array(z.record(z.string(), z.unknown())).optional(),
  updated_prompts: z.array(z.object({
    alias: z.string().optional(),
    description: z.string().optional(),
    enabled: z.boolean().optional(),
    name: z.string().optional(),
  })).optional(),
  updated_tools: z.array(z.object({
    alias: z.string().optional(),
    description: z.string().optional(),
    enabled: z.boolean().optional(),
    name: z.string().optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  auth_credentials: z.string().optional(),
  description: z.string().max(512).optional(),
  is_shared_oauth_callback_enabled: z.boolean().optional(),
  name: z.string().max(350).optional(),
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
  auth_type: z.enum(["oauth", "bearer", "unauthenticated"]).optional(),
  hostname: z.string().optional(),
  id: z.string().min(1).max(32).regex(
    new RegExp("^[a-z0-9_]+(?:-[a-z0-9_]+)*$"),
  ).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Servers. Registered at `@swamp/cloudflare/access/servers`. */
export const model = {
  type: "@swamp/cloudflare/access/servers",
  version: "2026.06.08.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Servers resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Servers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/servers";
        const body: Record<string, unknown> = {};
        if (g.auth_credentials !== undefined) {
          body.auth_credentials = g.auth_credentials;
        }
        if (g.auth_type !== undefined) body.auth_type = g.auth_type;
        if (g.description !== undefined) body.description = g.description;
        if (g.hostname !== undefined) body.hostname = g.hostname;
        if (g.id !== undefined) body.id = g.id;
        if (g.is_shared_oauth_callback_enabled !== undefined) {
          body.is_shared_oauth_callback_enabled =
            g.is_shared_oauth_callback_enabled;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.updated_prompts !== undefined) {
          body.updated_prompts = g.updated_prompts;
        }
        if (g.updated_tools !== undefined) body.updated_tools = g.updated_tools;
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
      description: "Get a Servers",
      arguments: z.object({ id: z.string().describe("The ID of the Servers") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/servers";
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
    update: {
      description: "Update Servers attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/servers";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.auth_credentials !== undefined) {
          body.auth_credentials = g.auth_credentials;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.is_shared_oauth_callback_enabled !== undefined) {
          body.is_shared_oauth_callback_enabled =
            g.is_shared_oauth_callback_enabled;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.updated_prompts !== undefined) {
          body.updated_prompts = g.updated_prompts;
        }
        if (g.updated_tools !== undefined) body.updated_tools = g.updated_tools;
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
      description: "Delete the Servers",
      arguments: z.object({ id: z.string().describe("The ID of the Servers") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/servers";
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
      description: "Sync Servers state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/servers";
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
