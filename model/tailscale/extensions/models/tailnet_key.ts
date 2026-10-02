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

// Auto-generated extension model for @swamp/tailscale/tailnet-key
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale auth key.
 *
 * A Tailscale auth key, used to register new devices to the tailnet. Auth keys
 * cannot be changed after creation: to change one, delete it and create a new
 * one. The key value is returned only by create and is stored in the `secret`
 * resource. Deleting a key revokes it: Tailscale still returns it by ID,
 * marked revoked and invalid, so sync after delete records it that way rather
 * than as not found.
 *
 * Methods: `create`, `get`, `delete`, `sync`, `list`, `adopt`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  apiRequest,
  expandPath,
  instanceName,
  omit,
  pickDefined,
  pickPresent,
  readOptional,
  readRequired,
  readStored,
  requireStored,
  unwrapList,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this auth key, used as the unique identifier in the factory pattern",
  ),
  description: z.string().describe(
    "A short string specifying the purpose of the key. Can be a maximum of 50 alphanumeric characters. Hyphens and spaces are also allowed.",
  ).optional(),
  capabilities: z.object({
    devices: z.object({
      create: z.object({
        reusable: z.boolean().optional(),
        ephemeral: z.boolean().optional(),
        preauthorized: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
      }).optional(),
    }).optional(),
  }).describe(
    "`capabilities` is a mapping of resources to permissible actions.",
  ).optional(),
  expirySeconds: z.number().int().describe(
    "Specifies the duration in seconds until the key expires. Defaults to 90 days if not supplied.\n\nOnly applies to auth keys.",
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
  capabilities: z.object({
    devices: z.object({
      create: z.object({
        reusable: z.boolean().optional(),
        ephemeral: z.boolean().optional(),
        preauthorized: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
      }).optional(),
    }).optional(),
  }).optional(),
  expirySeconds: z.number().int().optional(),
});

/** Swamp extension model for a Tailscale auth key. Registered at `@swamp/tailscale/tailnet-key`. */
export const model = {
  type: "@swamp/tailscale/tailnet-key",
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
      description: "Auth key state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    secret: {
      description:
        "Secrets returned only when the auth key is created (or its secret rotated). Stored in a vault.",
      schema: SecretSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create an auth key",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        // Refuse to orphan a live auth key this instance already tracks.
        const existing = await readStored(context, instanceName(g.name));
        // Gone: deleted, not found, or (for keys) revoked or invalid.
        if (
          existing && !existing.deletedAt && existing.status !== "not_found" &&
          !existing.revoked && existing.invalid !== true
        ) {
          throw new Error(
            `Instance ${
              instanceName(g.name)
            } already tracks auth key ${existing.id}. Delete it first, or use a different name.`,
          );
        }
        const body = {
          ...{ "capabilities": { "devices": {} } },
          ...pickDefined(g, ["description", "capabilities", "expirySeconds"]),
          ...{ "keyType": "auth" },
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
      description: "Get an auth key by ID",
      arguments: z.object({ id: z.string().describe("The auth key's ID") }),
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
    delete: {
      description: "Delete the auth key",
      arguments: z.object({
        id: z.string().describe(
          "The auth key's ID; defaults to the stored auth key",
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
      description: "Refresh the stored auth key from Tailscale",
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
      description: "List auth keys and write each to state",
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
          item.keyType === "auth"
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
      description: "Adopt an existing auth key by ID into managed state",
      arguments: z.object({
        id: z.string().describe("The ID of the auth key to adopt"),
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
