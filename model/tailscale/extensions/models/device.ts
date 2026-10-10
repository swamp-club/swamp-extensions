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

// Auto-generated extension model for @swamp/tailscale/device
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale device.
 *
 * A device in the tailnet. Devices join through an auth key or sign-in, so
 * they cannot be created here: find them with list and adopt them by ID.
 * Manage tags, routes, key expiry and authorization with the device_tags,
 * device_subnet_routes, device_key and device_authorization models.
 *
 * Methods: `get`, `delete`, `list`, `adopt`, `expire`, `set_name`, `set_ipv4_address`.
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
  unwrapList,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
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
  addresses: z.array(z.string()).optional(),
  id: z.string().optional(),
  nodeId: z.string().optional(),
  user: z.string().optional(),
  name: z.string().optional(),
  hostname: z.string().optional(),
  clientVersion: z.string().optional(),
  updateAvailable: z.boolean().optional(),
  os: z.string().optional(),
  created: z.string().optional(),
  connectedToControl: z.boolean().optional(),
  lastSeen: z.string().optional(),
  keyExpiryDisabled: z.boolean().optional(),
  expires: z.string().optional(),
  authorized: z.boolean().optional(),
  isExternal: z.boolean().optional(),
  multipleConnections: z.boolean().optional(),
  machineKey: z.string().optional(),
  nodeKey: z.string().optional(),
  blocksIncomingConnections: z.boolean().optional(),
  enabledRoutes: z.array(z.string()).optional(),
  advertisedRoutes: z.array(z.string()).optional(),
  clientConnectivity: z.object({
    endpoints: z.array(z.string()).optional(),
    mappingVariesByDestIP: z.boolean().optional(),
    latency: z.record(
      z.string(),
      z.object({
        preferred: z.boolean().optional(),
        latencyMs: z.number().optional(),
      }).passthrough(),
    ).optional(),
    clientSupports: z.object({
      hairPinning: z.boolean().nullable().optional(),
      ipv6: z.boolean().nullable().optional(),
      pcp: z.boolean().nullable().optional(),
      pmp: z.boolean().nullable().optional(),
      udp: z.boolean().nullable().optional(),
      upnp: z.boolean().nullable().optional(),
    }).passthrough().optional(),
  }).passthrough().optional(),
  tags: z.array(z.string()).optional(),
  tailnetLockError: z.string().optional(),
  tailnetLockKey: z.string().optional(),
  sshEnabled: z.boolean().optional(),
  postureIdentity: z.object({
    serialNumbers: z.array(z.string()).optional(),
    disabled: z.boolean().optional(),
  }).passthrough().optional(),
  postureStatus: z.object({
    passing: z.boolean().optional(),
    impacting: z.boolean().optional(),
    failingAssertions: z.array(z.string()).optional(),
  }).passthrough().optional(),
  isEphemeral: z.boolean().optional(),
  distro: z.object({
    name: z.string().optional(),
    version: z.string().optional(),
    codeName: z.string().optional(),
  }).passthrough().optional(),
}).passthrough();

const InputsSchema = z.object({});

/** Swamp extension model for a Tailscale device. Registered at `@swamp/tailscale/device`. */
export const model = {
  type: "@swamp/tailscale/device",
  version: "2026.10.09.1",
  upgrades: [
    {
      toVersion: "2026.10.09.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Device state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a device by ID",
      arguments: z.object({ id: z.string().describe("The device's ID") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const result = await readRequired(
          g,
          expandPath("/device/{deviceId}", g, { deviceId: args.id }),
          { "fields": "all" },
        );
        const handle = await context.writeResource(
          "state",
          instanceName(result.nodeId ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the device from the tailnet",
      arguments: z.object({ id: z.string().describe("The device's ID") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        // Read first so the record lands on the instance get, adopt and list wrote.
        const current = await readOptional(
          g,
          expandPath("/device/{deviceId}", g, { deviceId: args.id }),
          { "fields": "all" },
        );
        const resp = await apiRequest(
          g,
          "DELETE",
          expandPath("/device/{deviceId}", g, { deviceId: args.id }),
          { allowStatus: [404] },
        );
        const existed = resp.status !== 404;
        const handle = await context.writeResource(
          "state",
          instanceName(current?.nodeId ?? args.id),
          {
            nodeId: args.id,
            existed,
            status: existed ? "deleted" : "not_found",
            deletedAt: new Date().toISOString(),
          },
        );
        return { dataHandles: [handle] };
      },
    },
    list: {
      description: "List devices in the tailnet and write each to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/devices", g),
          { query: { "fields": "all" } },
        );
        const items = unwrapList(resp.data, "devices");
        const dataHandles: any[] = [];
        for (const item of items) {
          dataHandles.push(
            await context.writeResource(
              "state",
              instanceName(item.nodeId ?? item.nodeId ?? "unknown", "unknown"),
              item,
            ),
          );
        }
        return { dataHandles };
      },
    },
    adopt: {
      description: "Adopt an existing device by ID into managed state",
      arguments: z.object({
        id: z.string().describe("The ID of the device to adopt"),
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
          expandPath("/device/{deviceId}", g, { deviceId: args.id }),
          { "fields": "all" },
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
          instanceName(result.nodeId ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    expire: {
      description:
        "Expire the device's node key, forcing it to re-authenticate",
      arguments: z.object({ id: z.string().describe("The device's ID") }),
      execute: async (args: { id?: string }, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/device/{deviceId}/expire", g, { deviceId: args.id }),
        );
        void resp;
        const result = await readRequired(
          g,
          expandPath("/device/{deviceId}", g, { deviceId: args.id }),
          { "fields": "all" },
        );
        const handle = await context.writeResource(
          "state",
          instanceName(result.nodeId ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    set_name: {
      description: "Set the device's machine name",
      arguments: z.object({
        id: z.string().describe("The device's ID"),
        name: z.string().describe(
          'The new name for the device.\n\nThis can be provided as either the fully qualified domain name for the device (e.g. "nodename.your-domain.ts.net")\nor just the base name (e.g. "nodename").\n\nIf `name` is unset or provided empty, the device\'s name is reset to be\ngenerated from its OS hostname.',
        ),
      }),
      execute: async (args: { id?: string; name?: string }, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/device/{deviceId}/name", g, { deviceId: args.id }),
          { body: pickDefined(args, ["name"]) },
        );
        void resp;
        const result = await readRequired(
          g,
          expandPath("/device/{deviceId}", g, { deviceId: args.id }),
          { "fields": "all" },
        );
        const handle = await context.writeResource(
          "state",
          instanceName(result.nodeId ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    set_ipv4_address: {
      description: "Set the device's Tailscale IPv4 address",
      arguments: z.object({
        id: z.string().describe("The device's ID"),
        ipv4: z.string().describe("The new IPv4 address for the device."),
      }),
      execute: async (args: { id?: string; ipv4?: string }, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "POST",
          expandPath("/device/{deviceId}/ip", g, { deviceId: args.id }),
          { body: pickDefined(args, ["ipv4"]) },
        );
        void resp;
        const result = await readRequired(
          g,
          expandPath("/device/{deviceId}", g, { deviceId: args.id }),
          { "fields": "all" },
        );
        const handle = await context.writeResource(
          "state",
          instanceName(result.nodeId ?? args.id, "unknown"),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
