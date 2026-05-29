// Auto-generated extension model for @swamp/cloudflare/access/portals
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Portals.
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
  allow_code_mode: z.boolean().describe(
    "Allow remote code execution in Dynamic Workers (beta)",
  ).optional(),
  description: z.string().max(512).optional(),
  hostname: z.string().regex(
    new RegExp(
      "^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$",
    ),
  ),
  name: z.string().max(350),
  secure_web_gateway: z.boolean().describe(
    "Route outbound MCP traffic through Zero Trust Secure Web Gateway",
  ).optional(),
  servers: z.array(z.object({
    default_disabled: z.boolean().optional(),
    is_shared_oauth_callback_enabled: z.boolean().optional(),
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
  ).describe("portal id"),
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
    auth_type: z.string().optional(),
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
    is_shared_oauth_callback_enabled: z.boolean().optional(),
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
  version: "2026.05.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
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
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/portals";
        const body: Record<string, unknown> = {};
        if (g.allow_code_mode !== undefined) {
          body.allow_code_mode = g.allow_code_mode;
        }
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
    update: {
      description: "Update Portals attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/portals";
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
        if (g.allow_code_mode !== undefined) {
          body.allow_code_mode = g.allow_code_mode;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.hostname !== undefined) body.hostname = g.hostname;
        if (g.name !== undefined) body.name = g.name;
        if (g.secure_web_gateway !== undefined) {
          body.secure_web_gateway = g.secure_web_gateway;
        }
        if (g.servers !== undefined) body.servers = g.servers;
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
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/access/ai-controls/mcp/portals";
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
