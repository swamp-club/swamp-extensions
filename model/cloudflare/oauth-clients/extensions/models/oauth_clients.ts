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

// Auto-generated extension model for @swamp/cloudflare/oauth-clients/oauth-clients
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Oauth Clients.
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  allowed_cors_origins: z.array(z.string()).describe(
    "Array of allowed CORS origins.",
  ).optional(),
  client_name: z.string().describe("Human-readable name of the OAuth client."),
  client_uri: z.string().describe("URL of the home page of the client.")
    .optional(),
  grant_types: z.array(z.enum(["authorization_code", "refresh_token"]))
    .describe(
      "Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.",
    ),
  logo_uri: z.string().describe("URL of the client's logo.").optional(),
  policy_uri: z.string().describe(
    "URL that points to a privacy policy document.",
  ).optional(),
  post_logout_redirect_uris: z.array(z.string()).describe(
    "Array of allowed post-logout redirect URIs.",
  ).optional(),
  redirect_uris: z.array(z.string()).describe(
    "Array of allowed redirect URIs for the client.",
  ),
  response_types: z.array(z.enum(["token", "id_token", "code"])).describe(
    "Array of OAuth response types the client is allowed to use.",
  ),
  scopes: z.array(z.string()).describe(
    "Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.",
  ),
  token_endpoint_auth_method: z.enum([
    "none",
    "client_secret_basic",
    "client_secret_post",
  ]).describe(
    "The authentication method the client uses at the token endpoint.",
  ),
  tos_uri: z.string().describe(
    "URL that points to a terms of service document.",
  ).optional(),
  visibility: z.enum(["public"]).describe(
    "Promote the OAuth client from private to public visibility. Only `public` is accepted; demotion to `private` is not supported. Promotion requires a non-empty client name, logo URI, verified client URI host, and at least one non-identity scope.",
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
  allowed_cors_origins: z.array(z.string()).optional(),
  client_name: z.string().optional(),
  client_uri: z.string().optional(),
  grant_types: z.array(z.string()).optional(),
  logo_uri: z.string().optional(),
  policy_uri: z.string().optional(),
  post_logout_redirect_uris: z.array(z.string()).optional(),
  redirect_uris: z.array(z.string()).optional(),
  response_types: z.array(z.string()).optional(),
  scopes: z.array(z.string()).optional(),
  token_endpoint_auth_method: z.string().optional(),
  tos_uri: z.string().optional(),
  client_id: z.string().optional(),
  client_uri_verification: z.object({
    status: z.string().optional(),
    text: z.string().optional(),
  }).optional(),
  created_at: z.string().optional(),
  has_rotated_secret: z.boolean().optional(),
  promoted_at: z.string().optional(),
  updated_at: z.string().optional(),
  visibility: z.string().optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  allowed_cors_origins: z.array(z.string()).optional(),
  client_name: z.string().optional(),
  client_uri: z.string().optional(),
  grant_types: z.array(z.enum(["authorization_code", "refresh_token"]))
    .optional(),
  logo_uri: z.string().optional(),
  policy_uri: z.string().optional(),
  post_logout_redirect_uris: z.array(z.string()).optional(),
  redirect_uris: z.array(z.string()).optional(),
  response_types: z.array(z.enum(["token", "id_token", "code"])).optional(),
  scopes: z.array(z.string()).optional(),
  token_endpoint_auth_method: z.enum([
    "none",
    "client_secret_basic",
    "client_secret_post",
  ]).optional(),
  tos_uri: z.string().optional(),
  visibility: z.enum(["public"]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Oauth Clients. Registered at `@swamp/cloudflare/oauth-clients/oauth-clients`. */
export const model = {
  type: "@swamp/cloudflare/oauth-clients/oauth-clients",
  version: "2026.06.08.2",
  upgrades: [
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
      description: "Oauth Clients resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Oauth Clients",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/oauth_clients";
        const body: Record<string, unknown> = {};
        if (g.allowed_cors_origins !== undefined) {
          body.allowed_cors_origins = g.allowed_cors_origins;
        }
        if (g.client_name !== undefined) body.client_name = g.client_name;
        if (g.client_uri !== undefined) body.client_uri = g.client_uri;
        if (g.grant_types !== undefined) body.grant_types = g.grant_types;
        if (g.logo_uri !== undefined) body.logo_uri = g.logo_uri;
        if (g.policy_uri !== undefined) body.policy_uri = g.policy_uri;
        if (g.post_logout_redirect_uris !== undefined) {
          body.post_logout_redirect_uris = g.post_logout_redirect_uris;
        }
        if (g.redirect_uris !== undefined) body.redirect_uris = g.redirect_uris;
        if (g.response_types !== undefined) {
          body.response_types = g.response_types;
        }
        if (g.scopes !== undefined) body.scopes = g.scopes;
        if (g.token_endpoint_auth_method !== undefined) {
          body.token_endpoint_auth_method = g.token_endpoint_auth_method;
        }
        if (g.tos_uri !== undefined) body.tos_uri = g.tos_uri;
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
      description: "Get a Oauth Clients",
      arguments: z.object({
        id: z.string().describe("The ID of the Oauth Clients"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/oauth_clients";
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
      description: "Update Oauth Clients attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/oauth_clients";
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
        if (g.allowed_cors_origins !== undefined) {
          body.allowed_cors_origins = g.allowed_cors_origins;
        }
        if (g.client_name !== undefined) body.client_name = g.client_name;
        if (g.client_uri !== undefined) body.client_uri = g.client_uri;
        if (g.grant_types !== undefined) body.grant_types = g.grant_types;
        if (g.logo_uri !== undefined) body.logo_uri = g.logo_uri;
        if (g.policy_uri !== undefined) body.policy_uri = g.policy_uri;
        if (g.post_logout_redirect_uris !== undefined) {
          body.post_logout_redirect_uris = g.post_logout_redirect_uris;
        }
        if (g.redirect_uris !== undefined) body.redirect_uris = g.redirect_uris;
        if (g.response_types !== undefined) {
          body.response_types = g.response_types;
        }
        if (g.scopes !== undefined) body.scopes = g.scopes;
        if (g.token_endpoint_auth_method !== undefined) {
          body.token_endpoint_auth_method = g.token_endpoint_auth_method;
        }
        if (g.tos_uri !== undefined) body.tos_uri = g.tos_uri;
        if (g.visibility !== undefined) body.visibility = g.visibility;
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
      description: "Delete the Oauth Clients",
      arguments: z.object({
        id: z.string().describe("The ID of the Oauth Clients"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/oauth_clients";
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
      description: "Sync Oauth Clients state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/oauth_clients";
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
