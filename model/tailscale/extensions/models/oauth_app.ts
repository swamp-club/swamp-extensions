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

// Auto-generated extension model for @swamp/tailscale/oauth-app
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale OAuth app.
 *
 * A Tailscale OAuth app that third-party applications use to request access to
 * the tailnet. The client secret is returned only by create and is stored in
 * the `secret` resource.
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`, `list`, `lookup`, `adopt`.
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
  instanceName: z.string().describe(
    "Instance name for this OAuth app, used as the unique identifier in the factory pattern",
  ),
  name: z.string().describe(
    "The name of the OAuth app.\nMust be between 3 and 50 characters and contain only alphanumeric characters, dashes, periods, and underscores.",
  ).optional(),
  description: z.string().describe(
    "A human-readable description of the OAuth app.\nMust be at most 300 characters.",
  ).optional(),
  redirectURIs: z.array(z.string()).describe(
    "The list of permitted redirect URIs for the OAuth authorization code flow.\nAt least one redirect URI is required.\n\nEach URI must use the `https` scheme, except for `localhost`, `127.0.0.1`, and `::1`,\nwhich may use any scheme. Raw IP address hosts are not permitted.",
  ).optional(),
  scopes: z.array(z.string()).describe(
    "The list of OAuth scopes granted to the app.\nMust be non-empty.\nLearn more about [OAuth clients and scopes](/docs/features/oauth-clients).",
  ).optional(),
  allowedNodeAttributes: z.array(z.string()).describe(
    "The list of custom device attributes that the OAuth app is allowed to set.",
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
  name: z.string().optional(),
  description: z.string().optional(),
  redirectURIs: z.array(z.string()).optional(),
  scopes: z.array(z.string()).optional(),
  allowedNodeAttributes: z.array(z.string()).optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
}).passthrough();

const SecretSchema = z.object({
  clientSecret: z.string().meta({ sensitive: true }).optional(),
});

const InputsSchema = z.object({
  instanceName: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  redirectURIs: z.array(z.string()).optional(),
  scopes: z.array(z.string()).optional(),
  allowedNodeAttributes: z.array(z.string()).optional(),
});

/** Swamp extension model for a Tailscale OAuth app. Registered at `@swamp/tailscale/oauth-app`. */
export const model = {
  type: "@swamp/tailscale/oauth-app",
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
      description: "OAuth app state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    secret: {
      description:
        "Secrets returned only when the OAuth app is created (or its secret rotated). Stored in a vault.",
      schema: SecretSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create an OAuth app",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["name", "redirectURIs", "scopes"], "create");
        // Refuse to orphan a live OAuth app this instance already tracks.
        const existing = await readStored(
          context,
          instanceName(g.instanceName),
        );
        // Gone: deleted, not found, or (for keys) revoked or invalid.
        if (
          existing && !existing.deletedAt && existing.status !== "not_found" &&
          !existing.revoked && existing.invalid !== true
        ) {
          throw new Error(
            `Instance ${
              instanceName(g.instanceName)
            } already tracks OAuth app ${existing.id}. Delete it first, or use a different instanceName.`,
          );
        }
        const body = {
          ...pickDefined(g, [
            "name",
            "description",
            "redirectURIs",
            "scopes",
            "allowedNodeAttributes",
          ]),
        };
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/tailnet/{tailnet}/oauth-apps", g),
          { body },
        );
        const result = resp.data as Record<string, unknown>;
        const dataHandles = [
          await context.writeResource(
            "state",
            instanceName(g.instanceName, String(result.id)),
            omit(result, ["clientSecret"]),
          ),
        ];
        const secret = pickPresent(result, ["clientSecret"]);
        if (secret) {
          dataHandles.push(
            await context.writeResource(
              "secret",
              `secret-${instanceName(g.instanceName, String(result.id))}`,
              secret,
            ),
          );
        }
        return { dataHandles };
      },
    },
    get: {
      description: "Get an OAuth app by ID",
      arguments: z.object({ id: z.string().describe("The OAuth app's ID") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/oauth-apps/{appId}", g, {
            appId: args.id,
          }),
        );
        // Write to the tracked instance only when it is this resource (or tracks
        // nothing live); otherwise keep it apart, as list does. adopt re-targets.
        const tracked = await readStored(context, instanceName(g.instanceName));
        const tracksOther = tracked && tracked.id !== result.id &&
          !tracked.deletedAt && tracked.status !== "not_found" &&
          !tracked.revoked && tracked.invalid !== true;
        const name = tracksOther
          ? instanceName(`item-${args.id}`)
          : instanceName(g.instanceName, String(args.id));
        const handle = await context.writeResource(
          "state",
          name,
          omit(result, ["clientSecret"]),
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update the OAuth app from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const name = instanceName(g.instanceName);
        const stored = await requireStored(
          context,
          name,
          "run create, get or adopt first",
        );
        let body: Record<string, unknown> = {
          ...pickDefined(g, [
            "name",
            "description",
            "redirectURIs",
            "scopes",
            "allowedNodeAttributes",
          ]),
        };
        // PUT replaces the OAuth app: keep the live value of unset fields.
        const live = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/oauth-apps/{appId}", g, {
            appId: stored.id,
          }),
        );
        body = fillUnset(body, live, [
          "name",
          "description",
          "redirectURIs",
          "scopes",
          "allowedNodeAttributes",
        ]);
        await apiRequest(
          g,
          "PUT",
          expandPath("/tailnet/{tailnet}/oauth-apps/{appId}", g, {
            appId: stored.id,
          }),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/oauth-apps/{appId}", g, {
            appId: stored.id,
          }),
        );
        const handle = await context.writeResource(
          "state",
          name,
          omit(result, ["clientSecret"]),
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the OAuth app",
      arguments: z.object({
        id: z.string().describe(
          "The OAuth app's ID; defaults to the stored OAuth app",
        ).optional(),
      }),
      execute: async (args: { id?: string }, context: any) => {
        const g = context.globalArgs;
        const stored = await readStored(context, instanceName(g.instanceName));
        const id = args.id ?? stored?.id;
        if (id === undefined || id === null || id === "") {
          throw new Error("pass id, or run create, get or adopt first");
        }
        // Record the deletion on the stored instance only when it is that resource;
        // another ID is recorded under item-<id>, as get and list write it, so the
        // stored resource stays tracked.
        const name = stored && stored.id === id
          ? instanceName(g.instanceName)
          : instanceName(`item-${id}`);
        const resp = await apiRequest(
          g,
          "DELETE",
          expandPath("/tailnet/{tailnet}/oauth-apps/{appId}", g, { appId: id }),
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
      description: "Refresh the stored OAuth app from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const name = instanceName(g.instanceName);
        const stored = await requireStored(
          context,
          name,
          "run create, get or adopt first",
        );
        const result = await readOptional(
          g,
          expandPath("/tailnet/{tailnet}/oauth-apps/{appId}", g, {
            appId: stored.id,
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
          omit(result, ["clientSecret"]),
        );
        return { dataHandles: [handle] };
      },
    },
    list: {
      description: "List OAuth apps and write each to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/oauth-apps", g),
        );
        const items = unwrapList(resp.data, "oauthApps");
        const dataHandles: any[] = [];
        for (const item of items) {
          const name = instanceName(`item-${item.id}`, "unknown");
          dataHandles.push(
            await context.writeResource(
              "state",
              name,
              omit(item, ["clientSecret"]),
            ),
          );
        }
        return { dataHandles };
      },
    },
    lookup: {
      description: "Find an existing OAuth app by name and write it to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["name"], "lookup");
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/oauth-apps", g),
        );
        const matches = unwrapList(resp.data, "oauthApps").filter((item) =>
          item.name === g.name
        );
        if (matches.length !== 1) {
          throw new Error(
            `Expected one OAuth app with name=${g.name}, found ${matches.length}. Use adopt with a specific ID instead.`,
          );
        }
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/oauth-apps/{appId}", g, {
            appId: matches[0].id,
          }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.instanceName),
          omit(result, ["clientSecret"]),
        );
        return { dataHandles: [handle] };
      },
    },
    adopt: {
      description: "Adopt an existing OAuth app by ID into managed state",
      arguments: z.object({
        id: z.string().describe("The ID of the OAuth app to adopt"),
        expected_name: z.string().describe(
          "Expected name, checked before adopting",
        ).optional(),
      }),
      execute: async (
        args: { id: string; expected_name?: string },
        context: any,
      ) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/oauth-apps/{appId}", g, {
            appId: args.id,
          }),
        );
        if (
          args.expected_name !== undefined && result.name !== args.expected_name
        ) {
          throw new Error(
            `Identity mismatch: expected name=${args.expected_name} but got ${result.name}`,
          );
        }
        const handle = await context.writeResource(
          "state",
          instanceName(g.instanceName, String(args.id)),
          omit(result, ["clientSecret"]),
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
