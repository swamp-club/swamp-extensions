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

// Auto-generated extension model for @swamp/digitalocean/action-gateway-mcp-server
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean action gateway mcp server.
 *
 * Wraps the `/v2/action-gateway/mcp-servers` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  read,
  remove,
  subResourceUpdate,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  description: z.string().max(1024).describe(
    "Optional description shown on the server's catalog card. At most 1024 characters.",
  ).optional(),
  serverRef: z.string().regex(new RegExp("^[a-z][a-z0-9-]{0,63}$")).describe(
    "Identifier for the server, unique within your team. Must match `^`[a-z]``[a-z0-9-]`{0,63}$`.",
  ),
  endpoint: z.string().describe(
    "HTTPS URL of the server's MCP endpoint. Its host must resolve only to public IP addresses. Required.",
  ),
  transport: z.enum(["streamable_http"]).describe(
    "Optional. `streamable_http`, the default and only accepted value.",
  ).optional(),
  credentialRefSource: z.enum(["none", "secret", "connection"]).describe(
    'How requests to the server authenticate: none (the default), secret, or connection. With secret, the value from `credentialRef` or `api_key` is sent in the Authorization header, prefixed with "Bearer " unless it already contains a space.',
  ).optional(),
  credentialRef: z.string().describe(
    "For `credentialRefSource` secret: a reference to a secret your team stores with DigitalOcean. Must match `^`[A-Za-z0-9]``[A-Za-z0-9:/_.-]`{0,254}$`. Set exactly one of `credentialRef` and `api_key`.",
  ).optional(),
  api_key: z.string().meta({ sensitive: true }).describe(
    "For `credentialRefSource` secret: the key or token itself. DigitalOcean stores it; it is write-only and no response returns it. Set exactly one of `credentialRef` and `api_key`.",
  ).optional(),
  oauth_client_id: z.string().describe(
    "Required for `credentialRefSource` connection: the client ID of your team's OAuth client for the server. Each user of the server then authorizes individually.",
  ).optional(),
  oauth_client_secret: z.string().meta({ sensitive: true }).describe(
    "Required for `credentialRefSource` connection. Write-only; no response returns it.",
  ).optional(),
  oauth_authorize_url: z.string().describe(
    "Required for `credentialRefSource` connection: the OAuth authorization endpoint. It must use the endpoint's scheme and port, on the endpoint's host or another host under the same registrable domain.",
  ).optional(),
  oauth_token_url: z.string().describe(
    "Required for `credentialRefSource` connection: the OAuth token endpoint, under the same rules as `oauth_authorize_url`.",
  ).optional(),
  oauth_scopes: z.array(z.string()).describe(
    "Required for `credentialRefSource` connection: the scopes to request from each user, 1 to 64 of them.",
  ).optional(),
  oauth_authorization_ttl_seconds: z.string().describe(
    "How long, in seconds, a user's authorization may be reused before they must consent again. Optional;\n0 means 30 days, and the maximum is 100 years.\n\nAuthorizations are not refreshed automatically, so this window, not the provider's token lifetime,\ndecides how often a user is sent back through consent. Set it no longer than the provider's own\ntoken lifetime, so the prompt arrives before a tool call fails against an expired token.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  serverRef: z.string().optional(),
  endpoint: z.string().optional(),
  transport: z.string().optional(),
  credentialRefSource: z.string().optional(),
  credentialRef: z.string().optional(),
  syncStatus: z.string().optional(),
  syncError: z.string().optional(),
  lastSyncedAt: z.string().optional(),
  protocolVersion: z.string().optional(),
  toolCount: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  description: z.string().optional(),
  oauth_authorize_url: z.string().optional(),
  oauth_scopes: z.array(z.string()).optional(),
  oauth_authorization_ttl_seconds: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().max(1024).optional(),
  serverRef: z.string().regex(new RegExp("^[a-z][a-z0-9-]{0,63}$")).optional(),
  endpoint: z.string().optional(),
  transport: z.enum(["streamable_http"]).optional(),
  credentialRefSource: z.enum(["none", "secret", "connection"]).optional(),
  credentialRef: z.string().optional(),
  api_key: z.string().meta({ sensitive: true }).optional(),
  oauth_client_id: z.string().optional(),
  oauth_client_secret: z.string().meta({ sensitive: true }).optional(),
  oauth_authorize_url: z.string().optional(),
  oauth_token_url: z.string().optional(),
  oauth_scopes: z.array(z.string()).optional(),
  oauth_authorization_ttl_seconds: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean action gateway mcp server. Registered at `@swamp/digitalocean/action-gateway-mcp-server`. */
export const model = {
  type: "@swamp/digitalocean/action-gateway-mcp-server",
  version: "2026.10.05.1",
  upgrades: [
    {
      toVersion: "2026.10.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Action Gateway Mcp Server resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a action gateway mcp server",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.serverRef !== undefined) body.serverRef = g.serverRef;
        if (g.endpoint !== undefined) body.endpoint = g.endpoint;
        if (g.transport !== undefined) body.transport = g.transport;
        if (g.credentialRefSource !== undefined) {
          body.credentialRefSource = g.credentialRefSource;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.credentialRef !== undefined) body.credentialRef = g.credentialRef;
        if (g.api_key !== undefined) body.api_key = g.api_key;
        if (g.oauth_client_id !== undefined) {
          body.oauth_client_id = g.oauth_client_id;
        }
        if (g.oauth_client_secret !== undefined) {
          body.oauth_client_secret = g.oauth_client_secret;
        }
        if (g.oauth_authorize_url !== undefined) {
          body.oauth_authorize_url = g.oauth_authorize_url;
        }
        if (g.oauth_token_url !== undefined) {
          body.oauth_token_url = g.oauth_token_url;
        }
        if (g.oauth_scopes !== undefined) body.oauth_scopes = g.oauth_scopes;
        if (g.oauth_authorization_ttl_seconds !== undefined) {
          body.oauth_authorization_ttl_seconds =
            g.oauth_authorization_ttl_seconds;
        }
        const result = await create(
          "/v2/action-gateway/mcp-servers",
          body,
          undefined,
          g.token,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a action gateway mcp server",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway mcp server",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/action-gateway/mcp-servers",
          args.id,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
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
      description: "Update action gateway mcp server attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        if (g.description !== undefined) body.description = g.description;
        const result = await update(
          "/v2/action-gateway/mcp-servers",
          existing.serverref ?? existing.id,
          body,
          "PATCH",
          undefined,
          g.token,
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
      description: "Delete the action gateway mcp server",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway mcp server",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/action-gateway/mcp-servers",
          args.id,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
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
      description: "Sync action gateway mcp server state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const result = await tryRead(
          "/v2/action-gateway/mcp-servers",
          existing.serverref ?? existing.id,
          undefined,
          g.token,
        ) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          serverref: existing.serverref ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    tools: {
      description: "tools the action gateway mcp server",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway mcp server",
        ),
        enabledToolSlugs: z.array(z.string()).describe(
          "The complete set of tool slugs (`<server_ref>_<name>`) to enable; every other tool of the server is disabled. Empty disables every tool.",
        ),
        user_id: z.string().describe(
          "Required for a server registered with `credentialRefSource` connection when a tool needs verification against the live server, which can only be reached as a user who has authorized it. Ignored otherwise.",
        ).optional(),
      }),
      execute: async (
        args: {
          id: string | number;
          enabledToolSlugs: unknown[];
          user_id?: string;
        },
        context: any,
      ) => {
        const body: Record<string, unknown> = {};
        if (args.enabledToolSlugs !== undefined) {
          body.enabledToolSlugs = args.enabledToolSlugs;
        }
        if (args.user_id !== undefined) body.user_id = args.user_id;
        await subResourceUpdate(
          "/v2/action-gateway/mcp-servers",
          args.id,
          "tools",
          body,
          "PUT",
          context.globalArgs.token,
        );
        const result = await read(
          "/v2/action-gateway/mcp-servers",
          args.id,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
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
  },
};
