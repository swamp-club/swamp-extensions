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

// Auto-generated extension model for @swamp/tailscale/service
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale service.
 *
 * A Tailscale Service: a stable virtual IP and DNS name in front of one or
 * more hosting devices. create refuses to overwrite an existing service with
 * the same name; adopt it with get instead.
 *
 * Methods: `create`, `get`, `update`, `delete`, `sync`, `list`, `list_devices`, `get_device_approval`, `set_device_approval`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  apiRequest,
  expandPath,
  fillUnset,
  instanceName,
  pickDefined,
  readOptional,
  readRequired,
  requireArgs,
  unwrapList,
} from "./_lib/tailscale.ts";

const GlobalArgsSchema = z.object({
  addrs: z.array(z.string()).describe(
    "The IP addresses assigned to the Service: the IPv4 followed by the IPv6.",
  ).optional(),
  name: z.string().describe("The unique name of the Service."),
  displayName: z.string().describe(
    "An optional human-readable label for the Service, shown in the Tailscale admin console\nand to clients with access to the Service.\nMust be 64 characters or fewer.",
  ).optional(),
  comment: z.string().describe("An optional comment for the Service.")
    .optional(),
  ports: z.array(z.string()).describe(
    'A list of protocol:port pairs to be exposed by the Service.\n\nThe only supported protocol is "tcp" at this time. "do-not-validate" can be used to skip validation.',
  ).optional(),
  tags: z.array(z.string()).describe(
    "A list of optional tags associated with the Service.",
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
  name: z.string().optional(),
  displayName: z.string().optional(),
  addrs: z.array(z.string()).optional(),
  comment: z.string().optional(),
  ports: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
}).passthrough();

const InputsSchema = z.object({
  addrs: z.array(z.string()).optional(),
  name: z.string().optional(),
  displayName: z.string().optional(),
  comment: z.string().optional(),
  ports: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

/** Swamp extension model for a Tailscale service. Registered at `@swamp/tailscale/service`. */
export const model = {
  type: "@swamp/tailscale/service",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Service state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    result: {
      description:
        "The response of the most recent run of each action that returns data",
      schema: z.record(z.string(), z.unknown()),
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create the service; fails if one already exists for name",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["name"], "create");
        const existing = await readOptional(
          g,
          expandPath("/tailnet/{tailnet}/services/{serviceName}", g, {
            serviceName: g.name,
          }),
        );
        if (existing) {
          throw new Error(
            `A service already exists for name=${g.name}. Run get to adopt it, then update.`,
          );
        }
        await apiRequest(
          g,
          "PUT",
          expandPath("/tailnet/{tailnet}/services/{serviceName}", g, {
            serviceName: g.name,
          }),
          {
            body: pickDefined(g, [
              "addrs",
              "name",
              "displayName",
              "comment",
              "ports",
              "tags",
            ]),
          },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/services/{serviceName}", g, {
            serviceName: g.name,
          }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.name),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get the service for name and write it to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["name"], "get");
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/services/{serviceName}", g, {
            serviceName: g.name,
          }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.name),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update the service from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["name"], "update");
        // PUT replaces the service: keep the live value of unset fields.
        const live = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/services/{serviceName}", g, {
            serviceName: g.name,
          }),
        );
        const body = fillUnset(
          pickDefined(g, [
            "addrs",
            "name",
            "displayName",
            "comment",
            "ports",
            "tags",
          ]),
          live,
          ["addrs", "name", "displayName", "comment", "ports", "tags"],
        );
        await apiRequest(
          g,
          "PUT",
          expandPath("/tailnet/{tailnet}/services/{serviceName}", g, {
            serviceName: g.name,
          }),
          { body },
        );
        const result = await readRequired(
          g,
          expandPath("/tailnet/{tailnet}/services/{serviceName}", g, {
            serviceName: g.name,
          }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.name),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the service",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["name"], "delete");
        const resp = await apiRequest(
          g,
          "DELETE",
          expandPath("/tailnet/{tailnet}/services/{serviceName}", g, {
            serviceName: g.name,
          }),
          { allowStatus: [404] },
        );
        const existed = resp.status !== 404;
        const handle = await context.writeResource(
          "state",
          instanceName(g.name),
          {
            name: g.name,
            existed,
            status: existed ? "deleted" : "not_found",
            deletedAt: new Date().toISOString(),
          },
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the service from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["name"], "sync");
        const result = await readOptional(
          g,
          expandPath("/tailnet/{tailnet}/services/{serviceName}", g, {
            serviceName: g.name,
          }),
        );
        const handle = await context.writeResource(
          "state",
          instanceName(g.name),
          result ??
            {
              name: g.name,
              status: "not_found",
              syncedAt: new Date().toISOString(),
            },
        );
        return { dataHandles: [handle] };
      },
    },
    list: {
      description: "List services and write each to state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/services", g),
        );
        const items = unwrapList(resp.data, "vipServices");
        const dataHandles: any[] = [];
        for (const item of items) {
          dataHandles.push(
            await context.writeResource(
              "state",
              instanceName(item.name, "unknown"),
              item,
            ),
          );
        }
        return { dataHandles };
      },
    },
    list_devices: {
      description: "List the devices hosting the service",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["name"], "list_devices");
        const resp = await apiRequest(
          g,
          "GET",
          expandPath("/tailnet/{tailnet}/services/{serviceName}/devices", g, {
            serviceName: g.name,
          }),
        );
        const data = resp.data && typeof resp.data === "object" &&
            !Array.isArray(resp.data)
          ? resp.data as Record<string, unknown>
          : { value: resp.data ?? null };
        const handle = await context.writeResource(
          "result",
          instanceName(`result-${g.name}-list_devices`),
          data,
        );
        return { dataHandles: [handle] };
      },
    },
    get_device_approval: {
      description: "Get whether a device is approved to host the service",
      arguments: z.object({
        deviceId: z.string().describe(
          "ID of the device. Using the device's `nodeId` is preferred, but its numeric `id` value can also be used.",
        ),
      }),
      execute: async (args: { deviceId?: string }, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["name"], "get_device_approval");
        const resp = await apiRequest(
          g,
          "GET",
          expandPath(
            "/tailnet/{tailnet}/services/{serviceName}/device/{deviceId}/approved",
            g,
            { serviceName: g.name, deviceId: args.deviceId },
          ),
        );
        const data = resp.data && typeof resp.data === "object" &&
            !Array.isArray(resp.data)
          ? resp.data as Record<string, unknown>
          : { value: resp.data ?? null };
        const handle = await context.writeResource(
          "result",
          instanceName(`result-${g.name}-get_device_approval`),
          data,
        );
        return { dataHandles: [handle] };
      },
    },
    set_device_approval: {
      description: "Approve or unapprove a device to host the service",
      arguments: z.object({
        deviceId: z.string().describe(
          "ID of the device. Using the device's `nodeId` is preferred, but its numeric `id` value can also be used.",
        ),
        approved: z.boolean().describe(
          "Indicates whether to approve or revoke approval for the Service on the device.",
        ).optional(),
      }),
      execute: async (
        args: { deviceId?: string; approved?: boolean },
        context: any,
      ) => {
        const g = context.globalArgs;
        requireArgs(g, ["name"], "set_device_approval");
        const resp = await apiRequest(
          g,
          "POST",
          expandPath(
            "/tailnet/{tailnet}/services/{serviceName}/device/{deviceId}/approved",
            g,
            { serviceName: g.name, deviceId: args.deviceId },
          ),
          { body: pickDefined(args, ["approved"]) },
        );
        const data = resp.data && typeof resp.data === "object" &&
            !Array.isArray(resp.data)
          ? resp.data as Record<string, unknown>
          : { value: resp.data ?? null };
        const handle = await context.writeResource(
          "result",
          instanceName(`result-${g.name}-set_device_approval`),
          data,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
