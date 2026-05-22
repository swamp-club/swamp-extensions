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
    "When true, the gateway worker uses the shared Cloudflare-owned OAuth callback endpoint as the redirect_uri for upstream on-behalf OAuth, instead of the customer portal hostname. New servers default to true; existing servers default to false. Effective behavior is gated by the gateway worker's per-env rollout mode KV key.",
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
});

/** Swamp extension model for Cloudflare Servers. Registered at `@swamp/cloudflare/access/servers`. */
export const model = {
  type: "@swamp/cloudflare/access/servers",
  version: "2026.05.22.1",
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
        const result = await create(endpoint, body) as ResourceData;
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
        const result = await read(endpoint, args.id) as ResourceData;
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
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PUT",
        ) as ResourceData;
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
        const { existed } = await remove(endpoint, args.id);
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
        const result = await tryRead(endpoint, existing.id) as
          | ResourceData
          | null;
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
