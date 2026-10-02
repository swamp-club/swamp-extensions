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

// Auto-generated extension model for @swamp/tailscale/device-posture-attribute
// Do not edit manually. Re-generate with: deno task generate:tailscale

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Tailscale device posture attribute.
 *
 * One custom posture attribute on a device. Deleting the model removes the
 * attribute. Only one model should manage this setting for a given device; two
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
  attributeKey: z.string().describe(
    'The name of the posture attribute to set.\nThis must be prefixed with `custom`:\n\nKeys have a maximum length of 128 characters including the namespace,\nand can only contain letters, numbers, underscores, and colon.\n\nKeys are case-sensitive. Keys must be unique,\nbut are checked for uniqueness in a case-insensitive manner.\nFor example, `custom:MyAttribute` and `custom:myattribute` cannot both be set within a single tailnet.\n\nAll values for a given key need to be of the same type,\nwhich is determined when the first value is written for a given key.\nFor example, `custom:myattribute` cannot have a numeric value (`87`) for one node and a string value (`"78"`)\nfor another node within the same tailnet.',
  ),
  value: z.union([z.string(), z.number(), z.boolean()]).describe(
    "A value can be either a string, number or boolean.\n\nA string value can have a maximum length of 50 characters,\nand can only contain letters, numbers, underscores, and periods.\n\nA number value is an integer and must be a JSON safe number (up to 2^53 - 1).",
  ).optional(),
  expiry: z.string().describe(
    "An optional expiry time for a given posture attribute. If set, Tailscale\nwill automatically remove the attribute within a few minutes after the specified\ntime.",
  ).optional(),
  comment: z.string().describe(
    "An optional comment indicating a reason why an attribute is set,\nwhich will be added to the audit log.",
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
  attributeKey: z.string().optional(),
  value: z.unknown().optional(),
  expiry: z.string().optional(),
}).passthrough();

const InputsSchema = z.object({
  deviceId: z.string().optional(),
  attributeKey: z.string().optional(),
  value: z.union([z.string(), z.number(), z.boolean()]).optional(),
  expiry: z.string().optional(),
  comment: z.string().optional(),
});

/** Swamp extension model for a Tailscale device posture attribute. Registered at `@swamp/tailscale/device-posture-attribute`. */
export const model = {
  type: "@swamp/tailscale/device-posture-attribute",
  version: "2026.10.02.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Device posture attribute state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description:
        "Apply the device posture attribute from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["deviceId", "attributeKey", "value"], "create");
        const body: Record<string, unknown> = pickDefined(g, [
          "value",
          "expiry",
          "comment",
        ]);
        await apiRequest(
          g,
          "POST",
          expandPath("/device/{deviceId}/attributes/{attributeKey}", g, {
            deviceId: g.deviceId,
            attributeKey: g.attributeKey,
          }),
          { body },
        );
        const data = await readRequired(
          g,
          expandPath("/device/{deviceId}/attributes", g, {
            deviceId: g.deviceId,
            attributeKey: g.attributeKey,
          }),
        );
        const attributes = (data.attributes ?? {}) as Record<string, unknown>;
        const expiries = (data.expiries ?? {}) as Record<string, unknown>;
        const result = {
          attributeKey: g.attributeKey,
          value: attributes[g.attributeKey],
          expiry: expiries[g.attributeKey],
        };
        const handle = await context.writeResource(
          "state",
          instanceName([g.deviceId, g.attributeKey].join("-")),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Read the current device posture attribute into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["deviceId", "attributeKey"], "get");
        const data = await readRequired(
          g,
          expandPath("/device/{deviceId}/attributes", g, {
            deviceId: g.deviceId,
            attributeKey: g.attributeKey,
          }),
        );
        const attributes = (data.attributes ?? {}) as Record<string, unknown>;
        const expiries = (data.expiries ?? {}) as Record<string, unknown>;
        const result = {
          attributeKey: g.attributeKey,
          value: attributes[g.attributeKey],
          expiry: expiries[g.attributeKey],
        };
        const handle = await context.writeResource(
          "state",
          instanceName([g.deviceId, g.attributeKey].join("-")),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description:
        "Apply the device posture attribute from the global arguments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["deviceId", "attributeKey", "value"], "update");
        const body: Record<string, unknown> = pickDefined(g, [
          "value",
          "expiry",
          "comment",
        ]);
        await apiRequest(
          g,
          "POST",
          expandPath("/device/{deviceId}/attributes/{attributeKey}", g, {
            deviceId: g.deviceId,
            attributeKey: g.attributeKey,
          }),
          { body },
        );
        const data = await readRequired(
          g,
          expandPath("/device/{deviceId}/attributes", g, {
            deviceId: g.deviceId,
            attributeKey: g.attributeKey,
          }),
        );
        const attributes = (data.attributes ?? {}) as Record<string, unknown>;
        const expiries = (data.expiries ?? {}) as Record<string, unknown>;
        const result = {
          attributeKey: g.attributeKey,
          value: attributes[g.attributeKey],
          expiry: expiries[g.attributeKey],
        };
        const handle = await context.writeResource(
          "state",
          instanceName([g.deviceId, g.attributeKey].join("-")),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the device posture attribute",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["deviceId", "attributeKey"], "delete");
        const resp = await apiRequest(
          g,
          "DELETE",
          expandPath("/device/{deviceId}/attributes/{attributeKey}", g, {
            deviceId: g.deviceId,
            attributeKey: g.attributeKey,
          }),
          { allowStatus: [404] },
        );
        const handle = await context.writeResource(
          "state",
          instanceName([g.deviceId, g.attributeKey].join("-")),
          {
            status: resp.status === 404 ? "not_found" : "deleted",
            deletedAt: new Date().toISOString(),
          },
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Refresh the device posture attribute from Tailscale",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        requireArgs(g, ["deviceId", "attributeKey"], "sync");
        const data = await readRequired(
          g,
          expandPath("/device/{deviceId}/attributes", g, {
            deviceId: g.deviceId,
            attributeKey: g.attributeKey,
          }),
        );
        const attributes = (data.attributes ?? {}) as Record<string, unknown>;
        const expiries = (data.expiries ?? {}) as Record<string, unknown>;
        const result = {
          attributeKey: g.attributeKey,
          value: attributes[g.attributeKey],
          expiry: expiries[g.attributeKey],
        };
        const handle = await context.writeResource(
          "state",
          instanceName([g.deviceId, g.attributeKey].join("-")),
          result,
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
