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

// Auto-generated extension model for @swamp/tailscale/device-invite
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale device invite.
 *
 * An invitation to share a device with a user outside the tailnet.
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
    "Instance name for this device invite, used as the unique identifier in the factory pattern",
  ),
  deviceId: z.string().describe(
    "ID of the device. Using the device's `nodeId` is preferred, but its numeric `id` value can also be used.",
  ),
  multiUse: z.boolean().describe(
    "Whether the invite can be accepted more than once.\nWhen set to `true`, it results in an invite that can be accepted up to 1,000 times.",
  ).optional(),
  allowExitNode: z.boolean().describe(
    "Whether the invited user can use the device as an exit node when it advertises as one.",
  ).optional(),
  email: z.string().describe(
    "The email to send the created invite to.\nIf not set, the endpoint generates and returns an invite URL (but doesn't send it out).",
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
  created: z.string().optional(),
  tailnetId: z.number().optional(),
  deviceId: z.number().optional(),
  sharerId: z.number().optional(),
  multiUse: z.boolean().optional(),
  allowExitNode: z.boolean().optional(),
  email: z.string().optional(),
  lastEmailSentAt: z.string().optional(),
  inviteUrl: z.string().optional(),
  accepted: z.boolean().optional(),
  acceptedBy: z.object({
    id: z.number().optional(),
    loginName: z.string().optional(),
    profilePicUrl: z.string().optional(),
  }).passthrough().optional(),
}).passthrough();

const InputsSchema = z.object({
  name: z.string().optional(),
  deviceId: z.string().optional(),
  multiUse: z.boolean().optional(),
  allowExitNode: z.boolean().optional(),
  email: z.string().optional(),
});

/** Swamp extension model for a Tailscale device invite. Registered at `@swamp/tailscale/device-invite`. */
export const model = {
  type: "@swamp/tailscale/device-invite",
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
      description: "Device invite state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a device invite",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        // Refuse to orphan a live device invite this instance already tracks.
        const existing = await readStored(context, instanceName(g.name));
        // Gone: deleted, not found, or (for keys) revoked or invalid.
        if (
          existing && !existing.deletedAt && existing.status !== "not_found" &&
          !existing.revoked && existing.invalid !== true
        ) {
          throw new Error(
            `Instance ${
              instanceName(g.name)
            } already tracks device invite ${existing.id}. Delete it first, or use a different name.`,
          );
        }
        const body = {
          ...pickDefined(g, ["multiUse", "allowExitNode", "email"]),
        };
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/device/{deviceId}/device-invites", g, {
            deviceId: g.deviceId,
          }),
          { body: [body] },
        );
        const created = Array.isArray(resp.data) ? resp.data : [];
        if (created.length === 0) {
          throw new Error("Tailscale returned no device invite from create");
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
      description: "Get a device invite by ID",
      arguments: z.object({
        id: z.string().describe("The device invite's ID"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/device-invites/{deviceInviteId}", g, {
            deviceId: g.deviceId,
            deviceInviteId: args.id,
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
      description: "Delete the device invite",
      arguments: z.object({
        id: z.string().describe(
          "The device invite's ID; defaults to the stored device invite",
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
          expandPath("/device-invites/{deviceInviteId}", g, {
            deviceId: g.deviceId,
            deviceInviteId: id,
          }),
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
      description: "Refresh the stored device invite from Tailscale",
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
          expandPath("/device-invites/{deviceInviteId}", g, {
            deviceId: g.deviceId,
            deviceInviteId: stored.id,
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
      description: "List device invites and write each to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/device/{deviceId}/device-invites", g, {
            deviceId: g.deviceId,
          }),
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
      description: "Adopt an existing device invite by ID into managed state",
      arguments: z.object({
        id: z.string().describe("The ID of the device invite to adopt"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/device-invites/{deviceInviteId}", g, {
            deviceId: g.deviceId,
            deviceInviteId: args.id,
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
          expandPath("/device-invites/{deviceInviteId}/resend", g, {
            deviceId: g.deviceId,
            deviceInviteId: stored.id,
          }),
        );
        void resp;
        return { dataHandles: [] };
      },
    },
  },
};
