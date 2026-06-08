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

// Auto-generated extension model for @swamp/cloudflare/firewall/rate-limits
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Rate Limits.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  zone_id: z.string().describe("Cloudflare zone ID"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  action: z.object({
    mode: z.enum([
      "simulate",
      "ban",
      "challenge",
      "js_challenge",
      "managed_challenge",
    ]).optional(),
    response: z.object({
      body: z.string().max(10240).optional(),
      content_type: z.string().max(50).optional(),
    }).optional(),
    timeout: z.number().min(1).max(86400).optional(),
  }),
  match: z.object({
    headers: z.array(z.object({
      name: z.string().optional(),
      op: z.enum(["eq", "ne"]).optional(),
      value: z.string().optional(),
    })).optional(),
    request: z.object({
      methods: z.array(
        z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "_ALL_"]),
      ).optional(),
      schemes: z.array(z.string()).optional(),
      url: z.string().max(1024).optional(),
    }).optional(),
    response: z.object({
      origin_traffic: z.boolean().optional(),
    }).optional(),
  }),
  period: z.number().min(10).max(86400).describe(
    "The time in seconds (an integer value) to count matching traffic. If the count exceeds the configured threshold within this period, Cloudflare will perform the configured action.",
  ),
  threshold: z.number().min(1).describe(
    "The threshold that will trigger the configured mitigation action. Configure this value along with the `period` property to establish a threshold per period.",
  ),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
});

const ResourceSchema = z.object({
  action: z.object({
    mode: z.string().optional(),
    response: z.object({
      body: z.string().optional(),
      content_type: z.string().optional(),
    }).optional(),
    timeout: z.number().optional(),
  }).optional(),
  bypass: z.array(z.object({
    name: z.string().optional(),
    value: z.string().optional(),
  })).optional(),
  description: z.string().optional(),
  disabled: z.boolean().optional(),
  id: z.string(),
  match: z.object({
    headers: z.array(z.object({
      name: z.string().optional(),
      op: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
    request: z.object({
      methods: z.array(z.string()).optional(),
      schemes: z.array(z.string()).optional(),
      url: z.string().optional(),
    }).optional(),
    response: z.object({
      origin_traffic: z.boolean().optional(),
    }).optional(),
  }).optional(),
  period: z.number().optional(),
  threshold: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  name: z.string().optional(),
  action: z.object({
    mode: z.enum([
      "simulate",
      "ban",
      "challenge",
      "js_challenge",
      "managed_challenge",
    ]).optional(),
    response: z.object({
      body: z.string().max(10240).optional(),
      content_type: z.string().max(50).optional(),
    }).optional(),
    timeout: z.number().min(1).max(86400).optional(),
  }).optional(),
  match: z.object({
    headers: z.array(z.object({
      name: z.string().optional(),
      op: z.enum(["eq", "ne"]).optional(),
      value: z.string().optional(),
    })).optional(),
    request: z.object({
      methods: z.array(
        z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "_ALL_"]),
      ).optional(),
      schemes: z.array(z.string()).optional(),
      url: z.string().max(1024).optional(),
    }).optional(),
    response: z.object({
      origin_traffic: z.boolean().optional(),
    }).optional(),
  }).optional(),
  period: z.number().min(10).max(86400).optional(),
  threshold: z.number().min(1).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Rate Limits. Registered at `@swamp/cloudflare/firewall/rate-limits`. */
export const model = {
  type: "@swamp/cloudflare/firewall/rate-limits",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
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
      description: "Rate Limits resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Rate Limits",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/rate_limits";
        const body: Record<string, unknown> = {};
        if (g.action !== undefined) body.action = g.action;
        if (g.match !== undefined) body.match = g.match;
        if (g.period !== undefined) body.period = g.period;
        if (g.threshold !== undefined) body.threshold = g.threshold;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Rate Limits",
      arguments: z.object({
        id: z.string().describe("The ID of the Rate Limits"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/rate_limits";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.name?.toString() ?? args.id).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update Rate Limits attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/rate_limits";
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
        if (g.action !== undefined) body.action = g.action;
        if (g.match !== undefined) body.match = g.match;
        if (g.period !== undefined) body.period = g.period;
        if (g.threshold !== undefined) body.threshold = g.threshold;
        const result = await update(endpoint, existing.id, body, "PUT", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Rate Limits",
      arguments: z.object({
        id: z.string().describe("The ID of the Rate Limits"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/rate_limits";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Rate Limits state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/rate_limits";
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
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
