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

// Auto-generated extension model for @swamp/tailscale/device-subnet-routes
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale device subnet routes.
 *
 * The subnet routes enabled on a device. Deleting the model disables all of
 * them. Only one model should manage this setting for a given device; two
 * models for the same device will overwrite each other.
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
  pickDefined,
  readRequired,
  requireArgs,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  deviceId: z.string().describe(
    "ID of the device. Using the device's `nodeId` is preferred, but its numeric `id` value can also be used.",
  ),
  routes: z.array(z.string()).describe("The new list of enabled subnet routes.")
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
  advertisedRoutes: z.array(z.string()).optional(),
  enabledRoutes: z.array(z.string()).optional(),
}).passthrough();

const InputsSchema = z.object({
  deviceId: z.string().optional(),
  routes: z.array(z.string()).optional(),
});

/** Swamp extension model for a Tailscale device subnet routes. Registered at `@swamp/tailscale/device-subnet-routes`. */
export const model = {
  type: "@swamp/tailscale/device-subnet-routes",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Device subnet routes state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Apply the device subnet routes from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["deviceId", "routes"], "create");
        const body: Record<string, unknown> = pickDefined(g, ["routes"]);
        await apiRequest(
          g,
          "POST",
          expandPath("/device/{deviceId}/routes", g, { deviceId: g.deviceId }),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/device/{deviceId}/routes", g, { deviceId: g.deviceId }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName([g.deviceId].join("-")),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Read the current device subnet routes into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["deviceId"], "get");
        const result = await readRequired(
          g,
          expandPath("/device/{deviceId}/routes", g, { deviceId: g.deviceId }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName([g.deviceId].join("-")),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Apply the device subnet routes from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["deviceId", "routes"], "update");
        const body: Record<string, unknown> = pickDefined(g, ["routes"]);
        await apiRequest(
          g,
          "POST",
          expandPath("/device/{deviceId}/routes", g, { deviceId: g.deviceId }),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/device/{deviceId}/routes", g, { deviceId: g.deviceId }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName([g.deviceId].join("-")),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Clear the device subnet routes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["deviceId"], "delete");
        await apiRequest(
          g,
          "POST",
          expandPath("/device/{deviceId}/routes", g, { deviceId: g.deviceId }),
          { body: { "routes": [] } },
        );
        const handle = await context.writeResource(
          "state",
          instanceName([g.deviceId].join("-")),
          { status: "cleared", deletedAt: new Date().toISOString() },
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the device subnet routes from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["deviceId"], "sync");
        const result = await readRequired(
          g,
          expandPath("/device/{deviceId}/routes", g, { deviceId: g.deviceId }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName([g.deviceId].join("-")),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
