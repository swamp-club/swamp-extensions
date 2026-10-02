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

// Auto-generated extension model for @swamp/tailscale/user-invite
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale user invite.
 *
 * An invitation for a user to join the tailnet.
 *
 * Methods: `create`, `get`, `delete`, `sync`, `list`, `adopt`, `resend`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  apiRequest,
  expandPath,
  instanceName,
  pickDefined,
  readOptional,
  readRequired,
  readStored,
  requireStored,
  unwrapList,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this user invite, used as the unique identifier in the factory pattern",
  ),
  role: z.enum([
    "member",
    "admin",
    "it-admin",
    "network-admin",
    "billing-admin",
    "auditor",
  ]).describe("Optionally specifies a user role to assign the invited user.")
    .optional(),
  email: z.string().describe(
    "Optionally specifies the email to send the created invite.\nIf not set, the endpoint generates and returns an invite URL, but does not email it out.",
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
  role: z.string().optional(),
  tailnetId: z.number().optional(),
  inviterId: z.number().optional(),
  email: z.string().optional(),
  lastEmailSentAt: z.string().optional(),
  inviteUrl: z.string().optional(),
}).passthrough();

const InputsSchema = z.object({
  name: z.string().optional(),
  role: z.enum([
    "member",
    "admin",
    "it-admin",
    "network-admin",
    "billing-admin",
    "auditor",
  ]).optional(),
  email: z.string().optional(),
});

/** Swamp extension model for a Tailscale user invite. Registered at `@swamp/tailscale/user-invite`. */
export const model = {
  type: "@swamp/tailscale/user-invite",
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
      description: "User invite state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create an user invite",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        // Refuse to orphan a live user invite this instance already tracks.
        const existing = await readStored(context, instanceName(g.name));
        // Gone: deleted, not found, or (for keys) revoked or invalid.
        if (
          existing && !existing.deletedAt && existing.status !== "not_found" &&
          !existing.revoked && existing.invalid !== true
        ) {
          throw new Error(
            `Instance ${
              instanceName(g.name)
            } already tracks user invite ${existing.id}. Delete it first, or use a different name.`,
          );
        }
        const body = { ...pickDefined(g, ["role", "email"]) };
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/user-invites", g),
          { body: [body] },
        );
        const created = Array.isArray(resp.data) ? resp.data : [];
        if (created.length === 0) {
          throw new Error("Tailscale returned no user invite from create");
        }
        const result = created[0] as Record<string, unknown>;
        const handle = await context.writeResource(
          "state",
          instanceName(g.name, String(result.id)),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get an user invite by ID",
      arguments: z.object({ id: z.string().describe("The user invite's ID") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/user-invites/{userInviteId}", g, {
            userInviteId: args.id,
          }),
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
        const handle = await context.writeResource("state", name, result);
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the user invite",
      arguments: z.object({
        id: z.string().describe(
          "The user invite's ID; defaults to the stored user invite",
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
          expandPath("/user-invites/{userInviteId}", g, { userInviteId: id }),
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
      description: "Refresh the stored user invite from Tailscale",
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
          expandPath("/user-invites/{userInviteId}", g, {
            userInviteId: stored.id,
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
        const handle = await context.writeResource("state", name, result);
        return { dataHandles: [handle] };
      },
    },
    list: {
      description: "List user invites and write each to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/user-invites", g),
        );
        const items = unwrapList(resp.data, null);
        const dataHandles: any[] = [];
        for (const item of items) {
          const name = instanceName(`item-${item.id}`, "unknown");
          dataHandles.push(await context.writeResource("state", name, item));
        }
        return { dataHandles };
      },
    },
    adopt: {
      description: "Adopt an existing user invite by ID into managed state",
      arguments: z.object({
        id: z.string().describe("The ID of the user invite to adopt"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/user-invites/{userInviteId}", g, {
            userInviteId: args.id,
          }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.name, String(args.id)),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    resend: {
      description: "Resend the invitation email",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const name = instanceName(g.name);
        const stored = await requireStored(
          context,
          name,
          "run create, get or adopt first",
        );
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/user-invites/{userInviteId}/resend", g, {
            userInviteId: stored.id,
          }),
        );
        void resp;
        return { dataHandles: [] };
      },
    },
  },
};
