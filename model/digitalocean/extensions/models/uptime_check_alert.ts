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

// Auto-generated extension model for @swamp/digitalocean/uptime-check-alert
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean uptime check alert.
 *
 * Wraps the `/v2/uptime/checks/{check_id}/alerts` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  check_id: z.string().describe("Parent resource identifier"),
  name: z.string().describe("A human-friendly display name."),
  type: z.enum(["latency", "down", "down_global", "ssl_expiry"]).describe(
    "The type of alert.",
  ),
  threshold: z.number().int().describe(
    "The threshold at which the alert will enter a trigger state. The specific threshold is dependent on the alert type.",
  ).optional(),
  comparison: z.enum(["greater_than", "less_than"]).describe(
    "The comparison operator used against the alert's threshold.",
  ).optional(),
  notifications: z.object({
    email: z.array(z.string()),
    slack: z.array(z.object({
      channel: z.string(),
      url: z.string(),
    })),
  }).describe("The notification settings for a trigger alert."),
  period: z.enum(["2m", "3m", "5m", "10m", "15m", "30m", "1h"]).describe(
    "Period of time the threshold must be exceeded to trigger the alert.",
  ),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  type: z.string().optional(),
  threshold: z.number().optional(),
  comparison: z.string().optional(),
  notifications: z.object({
    email: z.array(z.string()).optional(),
    slack: z.array(z.object({
      channel: z.string().optional(),
      url: z.string().optional(),
    })).optional(),
  }).optional(),
  period: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  check_id: z.string().optional(),
  name: z.string().optional(),
  type: z.enum(["latency", "down", "down_global", "ssl_expiry"]).optional(),
  threshold: z.number().int().optional(),
  comparison: z.enum(["greater_than", "less_than"]).optional(),
  notifications: z.object({
    email: z.array(z.string()),
    slack: z.array(z.object({
      channel: z.string(),
      url: z.string(),
    })),
  }).optional(),
  period: z.enum(["2m", "3m", "5m", "10m", "15m", "30m", "1h"]).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean uptime check alert. Registered at `@swamp/digitalocean/uptime-check-alert`. */
export const model = {
  type: "@swamp/digitalocean/uptime-check-alert",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: token",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Uptime Check Alert resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a uptime check alert",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/uptime/checks/${g.check_id}/alerts`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            endpoint,
            "name",
            g.name?.toString() ?? "",
            g.token,
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.type !== undefined) body.type = g.type;
        if (g.threshold !== undefined) body.threshold = g.threshold;
        if (g.comparison !== undefined) body.comparison = g.comparison;
        if (g.notifications !== undefined) body.notifications = g.notifications;
        if (g.period !== undefined) body.period = g.period;
        const result = await create(
          endpoint,
          body,
          undefined,
          g.token,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a uptime check alert",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the uptime check alert",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/uptime/checks/${g.check_id}/alerts`;
        const result = await read(
          endpoint,
          args.id,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id.toString())
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update uptime check alert attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/uptime/checks/${g.check_id}/alerts`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.type !== undefined) body.type = g.type;
        if (g.threshold !== undefined) body.threshold = g.threshold;
        if (g.comparison !== undefined) body.comparison = g.comparison;
        if (g.notifications !== undefined) body.notifications = g.notifications;
        if (g.period !== undefined) body.period = g.period;
        const result = await update(
          endpoint,
          existing.id ?? existing.id,
          body,
          "PUT",
          undefined,
          g.token,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the uptime check alert",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the uptime check alert",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/uptime/checks/${g.check_id}/alerts`;
        const { existed } = await remove(
          endpoint,
          args.id,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync uptime check alert state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/uptime/checks/${g.check_id}/alerts`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const result = await tryRead(
          endpoint,
          existing.id ?? existing.id,
          undefined,
          g.token,
        ) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
