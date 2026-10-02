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

// Auto-generated extension model for @swamp/tailscale/posture-integration
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale posture integration.
 *
 * A Tailscale device posture integration with a third-party provider (for
 * example CrowdStrike, Intune or Jamf).
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`, `list`, `adopt`.
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
    "Instance name for this posture integration, used as the unique identifier in the factory pattern",
  ),
  provider: z.enum([
    "falcon",
    "intune",
    "jamfpro",
    "kandji",
    "kolide",
    "sentinelone",
  ]).describe(
    "The device posture provider.\n\nRequired on POST requests, ignored on PATCH requests.",
  ).optional(),
  cloudId: z.string().describe(
    "Identifies which of the provider's clouds to integrate with.\n\n- For CrowdStrike Falcon, it will be one of `us-1`, `us-2`, `eu-1` or `us-gov`.\n- For Microsoft Intune, it will be one of `global` or `us-gov`. \n- For Jamf Pro, Kandji and Sentinel One, it is the FQDN of your subdomain, for example `mydomain.sentinelone.net`.\n- For Kolide, this is left blank.",
  ).optional(),
  clientId: z.string().describe(
    "Unique identifier for your client.\n\n- For Microsoft Intune, it will be your application's UUID.\n- For CrowdStrike Falcon and Jamf Pro, it will be your client id.\n- For Kandji, Kolide and Sentinel One, this is left blank.",
  ).optional(),
  tenantId: z.string().describe(
    "The Microsoft Intune directory (tenant) ID. For other providers, this is left blank.",
  ).optional(),
  clientSecret: z.string().meta({ sensitive: true }).describe(
    "The secret (auth key, token, etc.) used to authenticate with the provider.\n\nRequired when creating a new integration, may be omitted when updating an existing integration, in which case we retain the existing password.",
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
  provider: z.string().optional(),
  cloudId: z.string().optional(),
  clientId: z.string().optional(),
  tenantId: z.string().optional(),
  id: z.string().optional(),
  configUpdated: z.string().optional(),
  status: z.object({
    lastSync: z.string().optional(),
    error: z.string().optional(),
    providerHostCount: z.number().optional(),
    matchedCount: z.number().optional(),
    possibleMatchedCount: z.number().optional(),
  }).passthrough().optional(),
}).passthrough();

const InputsSchema = z.object({
  name: z.string().optional(),
  provider: z.enum([
    "falcon",
    "intune",
    "jamfpro",
    "kandji",
    "kolide",
    "sentinelone",
  ]).optional(),
  cloudId: z.string().optional(),
  clientId: z.string().optional(),
  tenantId: z.string().optional(),
  clientSecret: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for a Tailscale posture integration. Registered at `@swamp/tailscale/posture-integration`. */
export const model = {
  type: "@swamp/tailscale/posture-integration",
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
      description: "Posture integration state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a posture integration",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        // Refuse to orphan a live posture integration this instance already tracks.
        const existing = await readStored(context, instanceName(g.name));
        // Gone: deleted, not found, or (for keys) revoked or invalid.
        if (
          existing && !existing.deletedAt && existing.status !== "not_found" &&
          !existing.revoked && existing.invalid !== true
        ) {
          throw new Error(
            `Instance ${
              instanceName(g.name)
            } already tracks posture integration ${existing.id}. Delete it first, or use a different name.`,
          );
        }
        const body = {
          ...pickDefined(g, [
            "provider",
            "cloudId",
            "clientId",
            "tenantId",
            "clientSecret",
          ]),
        };
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/posture/integrations", g),
          { body },
        );
        const result = resp.data as Record<string, unknown>;
        const handle = await context.writeResource(
          "state",
          instanceName(g.name, String(result.id)),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a posture integration by ID",
      arguments: z.object({
        id: z.string().describe("The posture integration's ID"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/posture/integrations/{id}", g, { id: args.id }),
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
    update: {
      description: "Update the posture integration from the global arguments",
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
          ...pickDefined(g, [
            "provider",
            "cloudId",
            "clientId",
            "tenantId",
            "clientSecret",
          ]),
        };
        await apiRequest(
          g,
          "PATCH",
          expandPath("/posture/integrations/{id}", g, { id: stored.id }),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/posture/integrations/{id}", g, { id: stored.id }),
        );
        const handle = await context.writeResource("state", name, result);
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the posture integration",
      arguments: z.object({
        id: z.string().describe(
          "The posture integration's ID; defaults to the stored posture integration",
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
          expandPath("/posture/integrations/{id}", g, { id: id }),
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
      description: "Refresh the stored posture integration from Tailscale",
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
          expandPath("/posture/integrations/{id}", g, { id: stored.id }),
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
      description: "List posture integrations and write each to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/posture/integrations", g),
        );
        const items = unwrapList(resp.data, "integrations");
        const dataHandles: any[] = [];
        for (const item of items) {
          const name = instanceName(`item-${item.id}`, "unknown");
          dataHandles.push(await context.writeResource("state", name, item));
        }
        return { dataHandles };
      },
    },
    adopt: {
      description:
        "Adopt an existing posture integration by ID into managed state",
      arguments: z.object({
        id: z.string().describe("The ID of the posture integration to adopt"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/posture/integrations/{id}", g, { id: args.id }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.name, String(args.id)),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
