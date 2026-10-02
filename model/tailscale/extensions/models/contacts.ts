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

// Auto-generated extension model for @swamp/tailscale/contacts
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale contacts.
 *
 * The tailnet's account, support and security contact email addresses.
 * Deleting the model leaves the contacts as they are.
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`, `resend_verification_email`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { apiRequest, expandPath, readRequired } from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  account: z.object({ email: z.string() }).describe("The account contact")
    .optional(),
  support: z.object({ email: z.string() }).describe("The support contact")
    .optional(),
  security: z.object({ email: z.string() }).describe("The security contact")
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
  account: z.object({
    email: z.string().optional(),
    fallbackEmail: z.string().optional(),
    needsVerification: z.boolean().optional(),
  }).passthrough().optional(),
  support: z.object({
    email: z.string().optional(),
    fallbackEmail: z.string().optional(),
    needsVerification: z.boolean().optional(),
  }).passthrough().optional(),
  security: z.object({
    email: z.string().optional(),
    fallbackEmail: z.string().optional(),
    needsVerification: z.boolean().optional(),
  }).passthrough().optional(),
}).passthrough();

const InputsSchema = z.object({
  account: z.object({ email: z.string() }).optional(),
  support: z.object({ email: z.string() }).optional(),
  security: z.object({ email: z.string() }).optional(),
});

/** Swamp extension model for a Tailscale contacts. Registered at `@swamp/tailscale/contacts`. */
export const model = {
  type: "@swamp/tailscale/contacts",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Contacts state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Apply the contacts from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        for (const contactType of ["account", "support", "security"]) {
          if (g[contactType] === undefined) continue;
          await apiRequest(
            g,
            "PATCH",
            expandPath("/tailnet/{tailnet}/contacts/{contactType}", g, {
              contactType,
            }),
            { body: g[contactType] },
          );
        }
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/contacts", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Read the current contacts into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/contacts", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Apply the contacts from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        for (const contactType of ["account", "support", "security"]) {
          if (g[contactType] === undefined) continue;
          await apiRequest(
            g,
            "PATCH",
            expandPath("/tailnet/{tailnet}/contacts/{contactType}", g, {
              contactType,
            }),
            { body: g[contactType] },
          );
        }
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/contacts", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description:
        "Stop managing the contacts; Tailscale keeps the current values",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        context.logger.warning(
          "Contacts were left unchanged: a tailnet's contacts cannot be unset, so deleting contacts only removes it from swamp.",
        );
        const handle = await context.writeResource("state", "current", {
          status: "unmanaged",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the contacts from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/contacts", g),
        );
        const handle = await context.writeResource("state", "current", result);
        return { dataHandles: [handle] };
      },
    },
    resend_verification_email: {
      description: "Resend the verification email for a contact",
      arguments: z.object({
        contactType: z.enum(["account", "support", "security"]).describe(
          "Type of contact.",
        ),
      }),
      execute: async (args: { contactType?: string }, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "POST",
          expandPath(
            "/tailnet/{tailnet}/contacts/{contactType}/resend-verification-email",
            g,
            { contactType: args.contactType },
          ),
        );
        void resp;
        return { dataHandles: [] };
      },
    },
  },
};
