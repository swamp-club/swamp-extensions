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

// Auto-generated extension model for @swamp/tailscale/webhook
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale webhook.
 *
 * A Tailscale webhook endpoint that receives tailnet events. The signing
 * secret is returned only by create and rotate_secret and is stored in the
 * `secret` resource.
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`, `list`, `adopt`, `test`, `rotate_secret`.
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
  requireArgs,
  requireStored,
  unwrapList,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this webhook, used as the unique identifier in the factory pattern",
  ),
  endpointUrl: z.string().describe(
    "The endpoint that events are sent to from Tailscale via POST requests.",
  ).optional(),
  providerType: z.enum(["slack", "mattermost", "googlechat", "discord"])
    .describe(
      "The provider type for the webhook destination, or an empty string if none are applicable.\nOutgoing webhook events are sent in the format expected by the provider type if non-empty.",
    ).optional(),
  subscriptions: z.array(
    z.enum([
      "nodeCreated",
      "nodeNeedsApproval",
      "nodeApproved",
      "nodeKeyExpiringInOneDay",
      "nodeKeyExpired",
      "nodeDeleted",
      "nodeSigned",
      "nodeNeedsSignature",
      "policyUpdate",
      "userCreated",
      "userNeedsApproval",
      "userSuspended",
      "userRestored",
      "userDeleted",
      "userApproved",
      "userRoleUpdated",
      "subnetIPForwardingNotEnabled",
      "exitNodeIPForwardingNotEnabled",
    ]),
  ).describe(
    "The list of subscribed events that trigger POST requests to the configured endpoint URL.\nLearn more about [webhook events](/docs/features/webhooks#events).",
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
  endpointId: z.string().optional(),
  endpointUrl: z.string().optional(),
  providerType: z.string().optional(),
  creatorLoginName: z.string().optional(),
  created: z.string().optional(),
  lastModified: z.string().optional(),
  subscriptions: z.array(z.string()).optional(),
}).passthrough();

const SecretSchema = z.object({
  secret: z.string().meta({ sensitive: true }).optional(),
});

const InputsSchema = z.object({
  name: z.string().optional(),
  endpointUrl: z.string().optional(),
  providerType: z.enum(["slack", "mattermost", "googlechat", "discord"])
    .optional(),
  subscriptions: z.array(
    z.enum([
      "nodeCreated",
      "nodeNeedsApproval",
      "nodeApproved",
      "nodeKeyExpiringInOneDay",
      "nodeKeyExpired",
      "nodeDeleted",
      "nodeSigned",
      "nodeNeedsSignature",
      "policyUpdate",
      "userCreated",
      "userNeedsApproval",
      "userSuspended",
      "userRestored",
      "userDeleted",
      "userApproved",
      "userRoleUpdated",
      "subnetIPForwardingNotEnabled",
      "exitNodeIPForwardingNotEnabled",
    ]),
  ).optional(),
});

/** Swamp extension model for a Tailscale webhook. Registered at `@swamp/tailscale/webhook`. */
export const model = {
  type: "@swamp/tailscale/webhook",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Webhook state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    secret: {
      description:
        "Secrets returned only when the webhook is created (or its secret rotated). Stored in a vault.",
      schema: SecretSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a webhook",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["endpointUrl", "subscriptions"], "create");
        // Refuse to orphan a live webhook this instance already tracks.
        const existing = await readStored(context, instanceName(g.name));
        // Gone: deleted, not found, or (for keys) revoked or invalid.
        if (
          existing && !existing.deletedAt && existing.status !== "not_found" &&
          !existing.revoked && existing.invalid !== true
        ) {
          throw new Error(
            `Instance ${
              instanceName(g.name)
            } already tracks webhook ${existing.endpointId}. Delete it first, or use a different name.`,
          );
        }
        const body = {
          ...pickDefined(g, ["endpointUrl", "providerType", "subscriptions"]),
        };
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/webhooks", g),
          { body },
        );
        const result = resp.data as Record<string, unknown>;
        const dataHandles = [
          await context.writeResource(
            "state",
            instanceName(g.name, String(result.endpointId)),
            omit(result, ["secret"]),
          ),
        ];
        const secret = pickPresent(result, ["secret"]);
        if (secret) {
          dataHandles.push(
            await context.writeResource(
              "secret",
              `secret-${instanceName(g.name, String(result.endpointId))}`,
              secret,
            ),
          );
        }
        return { dataHandles };
      },
    },
    get: {
      description: "Get a webhook by ID",
      arguments: z.object({ id: z.string().describe("The webhook's ID") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/webhooks/{endpointId}", g, { endpointId: args.id }),
        );
        // Write to the tracked instance only when it is this resource (or tracks
        // nothing live); otherwise keep it apart, as list does. adopt re-targets.
        const tracked = await readStored(context, instanceName(g.name));
        const tracksOther = tracked &&
          tracked.endpointId !== result.endpointId && !tracked.deletedAt &&
          tracked.status !== "not_found" && !tracked.revoked &&
          tracked.invalid !== true;
        const name = tracksOther
          ? instanceName(`item-${args.id}`)
          : instanceName(g.name, String(args.id));
        const handle = await context.writeResource(
          "state",
          name,
          omit(result, ["secret"]),
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update the webhook from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const name = instanceName(g.name);
        const stored = await requireStored(
          context,
          name,
          "run create, get or adopt first",
        );
        const body: Record<string, unknown> = {
          ...pickDefined(g, ["subscriptions"]),
        };
        await apiRequest(
          g,
          "PATCH",
          expandPath("/webhooks/{endpointId}", g, {
            endpointId: stored.endpointId,
          }),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/webhooks/{endpointId}", g, {
            endpointId: stored.endpointId,
          }),
        );
        const handle = await context.writeResource(
          "state",
          name,
          omit(result, ["secret"]),
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the webhook",
      arguments: z.object({
        id: z.string().describe(
          "The webhook's ID; defaults to the stored webhook",
        ).optional(),
      }),
      execute: async (args: { id?: string }, context: any) => {
        const g = context.globalArgs;
        const stored = await readStored(context, instanceName(g.name));
        const id = args.id ?? stored?.endpointId;
        if (id === undefined || id === null || id === "") {
          throw new Error("pass id, or run create, get or adopt first");
        }
        // Record the deletion on the stored instance only when it is that resource;
        // another ID gets its own record, so the stored resource stays tracked.
        const name = stored && stored.endpointId === id
          ? instanceName(g.name)
          : instanceName(id);
        const resp = await apiRequest(
          g,
          "DELETE",
          expandPath("/webhooks/{endpointId}", g, { endpointId: id }),
          { allowStatus: [404] },
        );
        const existed = resp.status !== 404;
        const handle = await context.writeResource("state", name, {
          endpointId: id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the stored webhook from Tailscale",
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
          expandPath("/webhooks/{endpointId}", g, {
            endpointId: stored.endpointId,
          }),
        );
        if (!result) {
          const handle = await context.writeResource("state", name, {
            endpointId: stored.endpointId,
            status: "not_found",
            syncedAt: new Date().toISOString(),
          });
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource(
          "state",
          name,
          omit(result, ["secret"]),
        );
        return { dataHandles: [handle] };
      },
    },
    list: {
      description: "List webhooks and write each to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/webhooks", g),
        );
        const items = unwrapList(resp.data, "webhooks");
        const dataHandles: any[] = [];
        for (const item of items) {
          const name = instanceName(`item-${item.endpointId}`, "unknown");
          dataHandles.push(
            await context.writeResource("state", name, omit(item, ["secret"])),
          );
        }
        return { dataHandles };
      },
    },
    adopt: {
      description: "Adopt an existing webhook by ID into managed state",
      arguments: z.object({
        id: z.string().describe("The ID of the webhook to adopt"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/webhooks/{endpointId}", g, { endpointId: args.id }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.name, String(args.id)),
          omit(result, ["secret"]),
        );
        return { dataHandles: [handle] };
      },
    },
    test: {
      description: "Send a test event to the webhook endpoint",
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
          expandPath("/webhooks/{endpointId}/test", g, {
            endpointId: stored.endpointId,
          }),
        );
        void resp;
        return { dataHandles: [] };
      },
    },
    rotate_secret: {
      description:
        "Rotate the webhook's signing secret and store the new secret",
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
          expandPath("/webhooks/{endpointId}/rotate", g, {
            endpointId: stored.endpointId,
          }),
        );
        const result = resp.data as Record<string, unknown>;
        const dataHandles = [
          await context.writeResource("state", name, omit(result, ["secret"])),
        ];
        const secret = pickPresent(result, ["secret"]);
        if (secret) {
          dataHandles.push(
            await context.writeResource("secret", `secret-${name}`, secret),
          );
        }
        return { dataHandles };
      },
    },
  },
};
