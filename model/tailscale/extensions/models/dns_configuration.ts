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

// Auto-generated extension model for @swamp/tailscale/dns-configuration
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale DNS configuration.
 *
 * The tailnet's whole DNS configuration: nameservers, split DNS, search paths
 * and preferences. Deleting the model clears it. Do not combine
 * dns_configuration with the dns_nameservers, dns_preferences,
 * dns_search_paths or dns_split_nameservers models on the same tailnet: they
 * manage the same settings and will overwrite each other.
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
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  nameservers: z.array(
    z.object({
      address: z.string().optional(),
      useWithExitNode: z.boolean().optional(),
    }),
  ).describe(
    "Global DNS resolvers to use. If `preferences.overrideLocalDNS` is true, these override the local OS configuration; otherwise they are used as fallback resolvers.",
  ).optional(),
  splitDNS: z.record(
    z.string(),
    z.array(
      z.object({
        address: z.string().optional(),
        useWithExitNode: z.boolean().optional(),
      }),
    ).nullable(),
  ).describe(
    "Map of DNS name suffixes (domains) to lists of resolvers for Split DNS and advanced routing overlays.",
  ).optional(),
  searchPaths: z.array(z.string()).describe("Search domain paths to apply.")
    .optional(),
  preferences: z.object({
    overrideLocalDNS: z.boolean().optional(),
    magicDNS: z.boolean().optional(),
  }).optional(),
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
  nameservers: z.array(
    z.object({
      address: z.string().optional(),
      useWithExitNode: z.boolean().optional(),
    }).passthrough(),
  ).optional(),
  splitDNS: z.record(
    z.string(),
    z.array(
      z.object({
        address: z.string().optional(),
        useWithExitNode: z.boolean().optional(),
      }).passthrough(),
    ).nullable(),
  ).optional(),
  searchPaths: z.array(z.string()).optional(),
  preferences: z.object({
    overrideLocalDNS: z.boolean().optional(),
    magicDNS: z.boolean().optional(),
  }).passthrough().optional(),
}).passthrough();

const InputsSchema = z.object({
  nameservers: z.array(
    z.object({
      address: z.string().optional(),
      useWithExitNode: z.boolean().optional(),
    }),
  ).optional(),
  splitDNS: z.record(
    z.string(),
    z.array(
      z.object({
        address: z.string().optional(),
        useWithExitNode: z.boolean().optional(),
      }),
    ).nullable(),
  ).optional(),
  searchPaths: z.array(z.string()).optional(),
  preferences: z.object({
    overrideLocalDNS: z.boolean().optional(),
    magicDNS: z.boolean().optional(),
  }).optional(),
});

/** Swamp extension model for a Tailscale DNS configuration. Registered at `@swamp/tailscale/dns-configuration`. */
export const model = {
  type: "@swamp/tailscale/dns-configuration",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DNS configuration state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Apply the DNS configuration from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        let body: Record<string, unknown> = pickDefined(g, [
          "nameservers",
          "splitDNS",
          "searchPaths",
          "preferences",
        ]);
        // This endpoint replaces the DNS configuration: keep the live value of unset fields.
        body = fillUnset(
          body,
          await readRequired(
            g,
            expandPath("/tailnet/{tailnet}/dns/configuration", g),
          ),
          ["nameservers", "splitDNS", "searchPaths", "preferences"],
        );
        await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/dns/configuration", g),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/configuration", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Read the current DNS configuration into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/configuration", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Apply the DNS configuration from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        let body: Record<string, unknown> = pickDefined(g, [
          "nameservers",
          "splitDNS",
          "searchPaths",
          "preferences",
        ]);
        // This endpoint replaces the DNS configuration: keep the live value of unset fields.
        body = fillUnset(
          body,
          await readRequired(
            g,
            expandPath("/tailnet/{tailnet}/dns/configuration", g),
          ),
          ["nameservers", "splitDNS", "searchPaths", "preferences"],
        );
        await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/dns/configuration", g),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/configuration", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Clear the DNS configuration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/dns/configuration", g),
          { body: {} },
        );
        const handle = await context.writeResource("state", "current", {
          status: "cleared",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the DNS configuration from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/configuration", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
  },
};
