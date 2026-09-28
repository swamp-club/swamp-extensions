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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  allowed_cors_origins: z.array(z.string()).describe(
    "Array of allowed CORS origins.",
  ).optional(),
  client_name: z.string().describe("Human-readable name of the OAuth client.")
    .optional(),
  client_uri: z.string().describe("URL of the home page of the client.")
    .optional(),
  grant_types: z.array(z.enum(["authorization_code", "refresh_token"]))
    .describe(
      "Array of OAuth grant types the client is allowed to use. `authorization_code` is required; `refresh_token` may be included optionally.",
    ).optional(),
  logo_uri: z.string().describe("URL of the client's logo.").optional(),
  optional_scopes: z.array(z.string()).describe(
    "Scopes that the authorizing user may decline during consent. Each value must also appear in `scopes`. The scopes `openid`, `offline`, and `offline_access` cannot be optional.",
  ).optional(),
  policy_uri: z.string().describe(
    "URL that points to a privacy policy document.",
  ).optional(),
  post_logout_redirect_uris: z.array(z.string()).describe(
    "Array of allowed post-logout redirect URIs.",
  ).optional(),
  redirect_uris: z.array(z.string()).describe(
    "Array of allowed redirect URIs for the client.",
  ).optional(),
  response_types: z.array(z.enum(["token", "id_token", "code"])).describe(
    "Array of OAuth response types the client is allowed to use.",
  ).optional(),
  scopes: z.array(z.string()).describe(
    "Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes `offline_access` and `openid` are added or removed automatically based on `grant_types` and `response_types`.",
  ).optional(),
  token_endpoint_auth_method: z.enum([
    "none",
    "client_secret_basic",
    "client_secret_post",
  ]).describe(
    "The authentication method the client uses at the token endpoint.",
  ).optional(),
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
  optional_scopes: z.array(z.string()).optional(),
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
  optional_scopes: z.array(z.string()).optional(),
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
  version: "2026.09.29.1",
  upgrades: [
    {
      toVersion: "2026.06.08.2",
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
      toVersion: "2026.08.26.1",
      description: "Added: optional_scopes",
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
        const missing = [
          "client_name",
          "grant_types",
          "redirect_uris",
          "response_types",
          "scopes",
          "token_endpoint_auth_method",
        ].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id + "/oauth_clients";
        const body: Record<string, unknown> = {};
        if (g.allowed_cors_origins !== undefined) {
          body.allowed_cors_origins = g.allowed_cors_origins;
        }
        if (g.client_name !== undefined) body.client_name = g.client_name;
        if (g.client_uri !== undefined) body.client_uri = g.client_uri;
        if (g.grant_types !== undefined) body.grant_types = g.grant_types;
        if (g.logo_uri !== undefined) body.logo_uri = g.logo_uri;
        if (g.optional_scopes !== undefined) {
          body.optional_scopes = g.optional_scopes;
        }
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
    lookup: {
      description:
        "Look up an existing Oauth Clients by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/oauth_clients";
        const filters: [string, string][] = [];
        if (g.client_name !== undefined) {
          filters.push(["client_name", String(g.client_name)]);
        }
        if (g.client_uri !== undefined) {
          filters.push(["client_uri", String(g.client_uri)]);
        }
        if (g.logo_uri !== undefined) {
          filters.push(["logo_uri", String(g.logo_uri)]);
        }
        if (g.policy_uri !== undefined) {
          filters.push(["policy_uri", String(g.policy_uri)]);
        }
        if (g.token_endpoint_auth_method !== undefined) {
          filters.push([
            "token_endpoint_auth_method",
            String(g.token_endpoint_auth_method),
          ]);
        }
        if (g.tos_uri !== undefined) {
          filters.push(["tos_uri", String(g.tos_uri)]);
        }
        if (g.visibility !== undefined) {
          filters.push(["visibility", String(g.visibility)]);
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
        if (matches.length === 0) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `No oauth clients found matching filters: ${filterDesc}`,
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
        return { dataHandles: [handle] };
      },
    },
    adopt: {
      description:
        "Import an existing Oauth Clients by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Oauth Clients to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/oauth_clients";
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
      description: "Update Oauth Clients attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Oauth Clients by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/oauth_clients";
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
        if (g.allowed_cors_origins !== undefined) {
          body.allowed_cors_origins = g.allowed_cors_origins;
        }
        if (g.client_name !== undefined) body.client_name = g.client_name;
        if (g.client_uri !== undefined) body.client_uri = g.client_uri;
        if (g.grant_types !== undefined) body.grant_types = g.grant_types;
        if (g.logo_uri !== undefined) body.logo_uri = g.logo_uri;
        if (g.optional_scopes !== undefined) {
          body.optional_scopes = g.optional_scopes;
        }
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
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Oauth Clients by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/oauth_clients";
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
