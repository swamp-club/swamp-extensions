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

// Auto-generated extension model for @swamp/tailscale/oauth-client
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale OAuth client.
 *
 * A Tailscale OAuth client (trust credential) that exchanges its client secret
 * for short-lived API access tokens. The client secret is returned only by
 * create and is stored in the `secret` resource.
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`, `list`, `adopt`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  apiRequest,
  expandPath,
  fillUnset,
  instanceName,
  omit,
  pickDefined,
  pickPresent,
  readOptional,
  readRequired,
  readStored,
  requireArgs,
  requireStored,
  unwrapList,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this OAuth client, used as the unique identifier in the factory pattern",
  ),
  description: z.string().describe(
    "A short string specifying the purpose of the key. Can be a maximum of 50 alphanumeric characters. Hyphens and spaces are also allowed.",
  ).optional(),
  scopes: z.array(z.string()).describe(
    "A list of scopes to grant to the key. At least one scope is required for OAuth clients and federated identities.\nSee [trust credentials scopes](https://tailscale.com/docs/reference/trust-credentials#scopes) for a list of available scopes.\n\nOnly applies to OAuth clients and federated identities.",
  ).optional(),
  tags: z.array(z.string()).describe(
    'A list of tags associated to the trust credential. Auth keys created with this credential must have these exact tags, or tags owned by the credential\'s tags.\nMandatory if the scopes include "devices:core" or "auth_keys".\n\nOnly applies to OAuth clients and federated identities.',
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
  id: z.string().optional(),
  keyType: z.string().optional(),
  expirySeconds: z.number().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
  expires: z.string().optional(),
  revoked: z.string().optional(),
  capabilities: z.object({
    devices: z.object({
      create: z.object({
        reusable: z.boolean().optional(),
        ephemeral: z.boolean().optional(),
        preauthorized: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
      }).passthrough().optional(),
    }).passthrough().optional(),
  }).passthrough().optional(),
  scopes: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
  invalid: z.boolean().optional(),
  userId: z.string().optional(),
  audience: z.string().optional(),
  issuer: z.string().optional(),
  subject: z.string().optional(),
  customClaimRules: z.record(z.string(), z.string()).optional(),
}).passthrough();

const SecretSchema = z.object({
  key: z.string().meta({ sensitive: true }).optional(),
});

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

/** Swamp extension model for a Tailscale OAuth client. Registered at `@swamp/tailscale/oauth-client`. */
export const model = {
  type: "@swamp/tailscale/oauth-client",
  version: "2026.10.02.2",
  upgrades: [
    {
      toVersion: "2026.10.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "OAuth client state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    secret: {
      description:
        "Secrets returned only when the OAuth client is created (or its secret rotated). Stored in a vault.",
      schema: SecretSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create an OAuth client",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["scopes"], "create");
        // Refuse to orphan a live OAuth client this instance already tracks.
        const existing = await readStored(context, instanceName(g.name));
        // Gone: deleted, not found, or (for keys) revoked or invalid.
        if (
          existing && !existing.deletedAt && existing.status !== "not_found" &&
          !existing.revoked && existing.invalid !== true
        ) {
          throw new Error(
            `Instance ${
              instanceName(g.name)
            } already tracks OAuth client ${existing.id}. Delete it first, or use a different name.`,
          );
        }
        const body = {
          ...pickDefined(g, ["description", "scopes", "tags"]),
          ...{ "keyType": "client" },
        };
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/keys", g),
          { body },
        );
        const result = resp.data as Record<string, unknown>;
        const dataHandles = [
          await context.writeResource(
            "state",
            instanceName(g.name, String(result.id)),
            omit(result, ["key"]),
          ),
        ];
        const secret = pickPresent(result, ["key"]);
        if (secret) {
          dataHandles.push(
            await context.writeResource(
              "secret",
              `secret-${instanceName(g.name, String(result.id))}`,
              secret,
            ),
          );
        }
        return { dataHandles };
      },
    },
    get: {
      description: "Get an OAuth client by ID",
      arguments: z.object({ id: z.string().describe("The OAuth client's ID") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/keys/{keyId}", g, { keyId: args.id }),
        );
        // Write to the tracked instance only when it is this resource (or tracks
        // nothing live); otherwise keep it apart, as list does. adopt re-targets.
        const tracked = await readStored(context, instanceName(g.name));
        const tracksOther = tracked && tracked.id !== result.id &&
          !tracked.deletedAt && tracked.status !== "not_found" &&
          !tracked.revoked && tracked.invalid !== true;
        const name = tracksOther
          ? instanceName(`item-${args.id}`)
          : instanceName(g.name, String(args.id));
        const handle = await context.writeResource(
          "state",
          name,
          omit(result, ["key"]),
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update the OAuth client from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const name = instanceName(g.name);
        const stored = await requireStored(
          context,
          name,
          "run create, get or adopt first",
        );
        let body: Record<string, unknown> = {
          ...pickDefined(g, ["description", "scopes", "tags"]),
          ...{ "keyType": "client" },
        };
        // PUT replaces the OAuth client: keep the live value of unset fields.
        const live = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/keys/{keyId}", g, {
            keyId: stored.id,
          }),
        );
        body = fillUnset(body, live, ["description", "scopes", "tags"]);
        await apiRequest(
          g,
          "PUT",
          expandPath("/tailnet/{tailnet}/keys/{keyId}", g, {
            keyId: stored.id,
          }),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/keys/{keyId}", g, {
            keyId: stored.id,
          }),
        );
        const handle = await context.writeResource(
          "state",
          name,
          omit(result, ["key"]),
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the OAuth client",
      arguments: z.object({
        id: z.string().describe(
          "The OAuth client's ID; defaults to the stored OAuth client",
        ).optional(),
      }),
      execute: async (args: { id?: string }, context: any) => {
        const g = context.globalArgs;
        const stored = await readStored(context, instanceName(g.name));
        const id = args.id ?? stored?.id;
        if (id === undefined || id === null || id === "") {
          throw new Error("pass id, or run create, get or adopt first");
        }
        // Record the deletion on the stored instance only when it is that resource;
        // another ID is recorded under item-<id>, as get and list write it, so the
        // stored resource stays tracked.
        const name = stored && stored.id === id
          ? instanceName(g.name)
          : instanceName(`item-${id}`);
        const resp = await apiRequest(
          g,
          "DELETE",
          expandPath("/tailnet/{tailnet}/keys/{keyId}", g, { keyId: id }),
          { allowStatus: [404] },
        );
        const existed = resp.status !== 404;
        const handle = await context.writeResource("state", name, {
          id: id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the stored OAuth client from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const name = instanceName(g.name);
        const stored = await requireStored(
          context,
          name,
          "run create, get or adopt first",
        );
        const result = await readOptional(
          g,
          expandPath("/tailnet/{tailnet}/keys/{keyId}", g, {
            keyId: stored.id,
          }),
        );
        if (!result) {
          const handle = await context.writeResource("state", name, {
            id: stored.id,
            status: "not_found",
            syncedAt: new Date().toISOString(),
          });
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource(
          "state",
          name,
          omit(result, ["key"]),
        );
        return { dataHandles: [handle] };
      },
    },
    list: {
      description: "List OAuth clients and write each to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/keys", g),
          { query: { "all": "true" } },
        );
        const items = unwrapList(resp.data, "keys").filter((item) =>
          item.keyType === "client"
        );
        const dataHandles: any[] = [];
        for (const item of items) {
          const name = instanceName(`item-${item.id}`, "unknown");
          dataHandles.push(
            await context.writeResource("state", name, omit(item, ["key"])),
          );
        }
        return { dataHandles };
      },
    },
    adopt: {
      description: "Adopt an existing OAuth client by ID into managed state",
      arguments: z.object({
        id: z.string().describe("The ID of the OAuth client to adopt"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/keys/{keyId}", g, { keyId: args.id }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.name, String(args.id)),
          omit(result, ["key"]),
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
