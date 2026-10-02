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

// Auto-generated extension model for @swamp/tailscale/dns-split-nameservers
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale split DNS nameservers.
 *
 * The nameservers used for one split-DNS domain. Each model manages a single
 * domain, so separate definitions can own separate domains. Deleting the model
 * removes that domain's nameservers. Do not combine dns_configuration with the
 * dns_nameservers, dns_preferences, dns_search_paths or dns_split_nameservers
 * models on the same tailnet: they manage the same settings and will overwrite
 * each other.
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  apiRequest,
  expandPath,
  instanceName,
  readRequired,
  requireArgs,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  domain: z.string().describe("The split-DNS domain this model manages"),
  nameservers: z.array(z.string()).describe(
    "Nameservers that resolve the domain",
  ).optional(),
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
  domain: z.string().optional(),
  nameservers: z.array(z.string()).optional(),
}).passthrough();

const InputsSchema = z.object({
  domain: z.string().optional(),
  nameservers: z.array(z.string()).optional(),
});

/** Swamp extension model for a Tailscale split DNS nameservers. Registered at `@swamp/tailscale/dns-split-nameservers`. */
export const model = {
  type: "@swamp/tailscale/dns-split-nameservers",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Split DNS nameservers state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Apply the split DNS nameservers from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["domain", "nameservers"], "create");
        await apiRequest(
          g,
          "PATCH",
          expandPath("/tailnet/{tailnet}/dns/split-dns", g),
          { body: { [g.domain]: g.nameservers } },
        );
        const data = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/split-dns", g),
        );
        const result = {
          domain: g.domain,
          nameservers: (data[g.domain] as string[] | null | undefined) ?? [],
        };
        const handle = await context.writeResource(
          "state",
          instanceName(g.domain),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Read the current split DNS nameservers into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["domain"], "get");
        const data = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/split-dns", g),
        );
        const result = {
          domain: g.domain,
          nameservers: (data[g.domain] as string[] | null | undefined) ?? [],
        };
        const handle = await context.writeResource(
          "state",
          instanceName(g.domain),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Apply the split DNS nameservers from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["domain", "nameservers"], "update");
        await apiRequest(
          g,
          "PATCH",
          expandPath("/tailnet/{tailnet}/dns/split-dns", g),
          { body: { [g.domain]: g.nameservers } },
        );
        const data = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/split-dns", g),
        );
        const result = {
          domain: g.domain,
          nameservers: (data[g.domain] as string[] | null | undefined) ?? [],
        };
        const handle = await context.writeResource(
          "state",
          instanceName(g.domain),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Clear the split DNS nameservers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["domain"], "delete");
        await apiRequest(
          g,
          "PATCH",
          expandPath("/tailnet/{tailnet}/dns/split-dns", g),
          { body: { [g.domain]: null } },
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.domain),
          { status: "cleared", deletedAt: new Date().toISOString() },
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the split DNS nameservers from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["domain"], "sync");
        const data = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/dns/split-dns", g),
        );
        const result = {
          domain: g.domain,
          nameservers: (data[g.domain] as string[] | null | undefined) ?? [],
        };
        const handle = await context.writeResource(
          "state",
          instanceName(g.domain),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
