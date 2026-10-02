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

// Auto-generated extension model for @swamp/tailscale/dns-preferences
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale DNS preferences.
 *
 * The tailnet's DNS preferences (MagicDNS). Deleting the model turns MagicDNS
 * off. Do not combine dns_configuration with the dns_nameservers,
 * dns_preferences, dns_search_paths or dns_split_nameservers models on the
 * same tailnet: they manage the same settings and will overwrite each other.
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  apiRequest,
  expandPath,
  fillUnset,
  pickDefined,
  readRequired,
  requireArgs,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  magicDNS: z.boolean().describe("Whether MagicDNS is active for this tailnet.")
    .optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Tailscale API access token. Overrides the TAILSCALE_API_KEY environment variable. Wire with a vault.get(...) expression.",
  ).optional(),
  oauthClientId: z.string().describe(
    "OAuth client ID, used with oauthClientSecret instead of an API key. Overrides TAILSCALE_OAUTH_CLIENT_ID.",
  ).optional(),
  oauthClientSecret: z.string().meta({ sensitive: true }).describe(
    "OAuth client secret. Overrides TAILSCALE_OAUTH_CLIENT_SECRET. Wire with a vault.get(...) expression.",
  ).optional(),
  oauthScopes: z.array(z.string()).describe(
    "Scopes to request when exchanging the OAuth client credentials; defaults to all of the client's scopes.",
  ).optional(),
  tailnet: z.string().describe(
    "Tailnet ID. Defaults to TAILSCALE_TAILNET, then '-' (the tailnet of the credential in use).",
  ).optional(),
  baseUrl: z.string().describe(
    "Tailscale API base URL. Defaults to TAILSCALE_BASE_URL, then https://api.tailscale.com.",
  ).optional(),
});

const ResourceSchema = z.object({
  magicDNS: z.boolean().optional(),
}).passthrough();

const InputsSchema = z.object({
  magicDNS: z.boolean().optional(),
});

/** Swamp extension model for a Tailscale DNS preferences. Registered at `@swamp/tailscale/dns-preferences`. */
export const model = {
  type: "@swamp/tailscale/dns-preferences",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DNS preferences state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Apply the DNS preferences from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["magicDNS"], "create");
        let body: Record<string, unknown> = pickDefined(g, ["magicDNS"]);
        // This endpoint replaces the DNS preferences: keep the live value of unset fields.
        body = fillUnset(
          body,
          await readRequired(
            g,
            expandPath("/tailnet/{tailnet}/dns/preferences", g),
          ),
          ["magicDNS"],
        );
        await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/dns/preferences", g),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/preferences", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Read the current DNS preferences into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/preferences", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Apply the DNS preferences from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["magicDNS"], "update");
        let body: Record<string, unknown> = pickDefined(g, ["magicDNS"]);
        // This endpoint replaces the DNS preferences: keep the live value of unset fields.
        body = fillUnset(
          body,
          await readRequired(
            g,
            expandPath("/tailnet/{tailnet}/dns/preferences", g),
          ),
          ["magicDNS"],
        );
        await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/dns/preferences", g),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/preferences", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Clear the DNS preferences",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/dns/preferences", g),
          { body: { "magicDNS": false } },
        );
        const handle = await context.writeResource("state", "current", {
          status: "cleared",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the DNS preferences from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/preferences", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
  },
};
