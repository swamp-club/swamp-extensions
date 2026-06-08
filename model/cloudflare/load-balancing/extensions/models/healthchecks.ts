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

// Auto-generated extension model for @swamp/cloudflare/load-balancing/healthchecks
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Healthchecks.
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
  address: z.string().describe(
    "The hostname or IP address of the origin server to run health checks on.",
  ),
  check_regions: z.array(
    z.enum([
      "WNAM",
      "ENAM",
      "WEU",
      "EEU",
      "NSAM",
      "SSAM",
      "OC",
      "ME",
      "NAF",
      "SAF",
      "IN",
      "SEAS",
      "NEAS",
      "ALL_REGIONS",
    ]),
  ).describe(
    "A list of regions from which to run health checks. Null means Cloudflare will pick a default region.",
  ).optional(),
  consecutive_fails: z.number().int().describe(
    "The number of consecutive fails required from a health check before changing the health to unhealthy.",
  ).optional(),
  consecutive_successes: z.number().int().describe(
    "The number of consecutive successes required from a health check before changing the health to healthy.",
  ).optional(),
  description: z.string().describe(
    "A human-readable description of the health check.",
  ).optional(),
  http_config: z.object({
    allow_insecure: z.boolean().optional(),
    expected_body: z.string().optional(),
    expected_codes: z.array(z.string()).optional(),
    follow_redirects: z.boolean().optional(),
    header: z.record(z.string(), z.unknown()).optional(),
    method: z.enum(["GET", "HEAD"]).optional(),
    path: z.string().optional(),
    port: z.number().int().optional(),
  }).describe("Parameters specific to an HTTP or HTTPS health check.")
    .optional(),
  interval: z.number().int().describe(
    "The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase load on the origin as we check from multiple locations.",
  ).optional(),
  name: z.string().describe(
    "A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.",
  ),
  retries: z.number().int().describe(
    "The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.",
  ).optional(),
  suspended: z.boolean().describe(
    "If suspended, no health checks are sent to the origin.",
  ).optional(),
  tcp_config: z.object({
    method: z.enum(["connection_established"]).optional(),
    port: z.number().int().optional(),
  }).describe("Parameters specific to TCP health check.").optional(),
  timeout: z.number().int().describe(
    "The timeout (in seconds) before marking the health check as failed.",
  ).optional(),
  type: z.string().describe(
    "The protocol to use for the health check. Currently supported protocols are 'HTTP', 'HTTPS' and 'TCP'.",
  ).optional(),
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
  address: z.string().optional(),
  check_regions: z.array(z.string()).optional(),
  consecutive_fails: z.number().optional(),
  consecutive_successes: z.number().optional(),
  created_on: z.string().optional(),
  description: z.string().optional(),
  failure_reason: z.string().optional(),
  http_config: z.object({
    allow_insecure: z.boolean().optional(),
    expected_body: z.string().optional(),
    expected_codes: z.array(z.string()).optional(),
    follow_redirects: z.boolean().optional(),
    header: z.record(z.string(), z.unknown()).optional(),
    method: z.string().optional(),
    path: z.string().optional(),
    port: z.number().optional(),
  }).optional(),
  id: z.string(),
  interval: z.number().optional(),
  modified_on: z.string().optional(),
  name: z.string().optional(),
  retries: z.number().optional(),
  status: z.string().optional(),
  suspended: z.boolean().optional(),
  tcp_config: z.object({
    method: z.string().optional(),
    port: z.number().optional(),
  }).optional(),
  timeout: z.number().optional(),
  type: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  address: z.string().optional(),
  check_regions: z.array(
    z.enum([
      "WNAM",
      "ENAM",
      "WEU",
      "EEU",
      "NSAM",
      "SSAM",
      "OC",
      "ME",
      "NAF",
      "SAF",
      "IN",
      "SEAS",
      "NEAS",
      "ALL_REGIONS",
    ]),
  ).optional(),
  consecutive_fails: z.number().int().optional(),
  consecutive_successes: z.number().int().optional(),
  description: z.string().optional(),
  http_config: z.object({
    allow_insecure: z.boolean().optional(),
    expected_body: z.string().optional(),
    expected_codes: z.array(z.string()).optional(),
    follow_redirects: z.boolean().optional(),
    header: z.record(z.string(), z.unknown()).optional(),
    method: z.enum(["GET", "HEAD"]).optional(),
    path: z.string().optional(),
    port: z.number().int().optional(),
  }).optional(),
  interval: z.number().int().optional(),
  name: z.string().optional(),
  retries: z.number().int().optional(),
  suspended: z.boolean().optional(),
  tcp_config: z.object({
    method: z.enum(["connection_established"]).optional(),
    port: z.number().int().optional(),
  }).optional(),
  timeout: z.number().int().optional(),
  type: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Healthchecks. Registered at `@swamp/cloudflare/load-balancing/healthchecks`. */
export const model = {
  type: "@swamp/cloudflare/load-balancing/healthchecks",
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
      description: "Healthchecks resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Healthchecks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/healthchecks";
        const body: Record<string, unknown> = {};
        if (g.address !== undefined) body.address = g.address;
        if (g.check_regions !== undefined) body.check_regions = g.check_regions;
        if (g.consecutive_fails !== undefined) {
          body.consecutive_fails = g.consecutive_fails;
        }
        if (g.consecutive_successes !== undefined) {
          body.consecutive_successes = g.consecutive_successes;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.http_config !== undefined) body.http_config = g.http_config;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.name !== undefined) body.name = g.name;
        if (g.retries !== undefined) body.retries = g.retries;
        if (g.suspended !== undefined) body.suspended = g.suspended;
        if (g.tcp_config !== undefined) body.tcp_config = g.tcp_config;
        if (g.timeout !== undefined) body.timeout = g.timeout;
        if (g.type !== undefined) body.type = g.type;
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
      description: "Get a Healthchecks",
      arguments: z.object({
        id: z.string().describe("The ID of the Healthchecks"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/healthchecks";
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
      description: "Update Healthchecks attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/healthchecks";
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
        if (g.address !== undefined) body.address = g.address;
        if (g.check_regions !== undefined) body.check_regions = g.check_regions;
        if (g.consecutive_fails !== undefined) {
          body.consecutive_fails = g.consecutive_fails;
        }
        if (g.consecutive_successes !== undefined) {
          body.consecutive_successes = g.consecutive_successes;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.http_config !== undefined) body.http_config = g.http_config;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.name !== undefined) body.name = g.name;
        if (g.retries !== undefined) body.retries = g.retries;
        if (g.suspended !== undefined) body.suspended = g.suspended;
        if (g.tcp_config !== undefined) body.tcp_config = g.tcp_config;
        if (g.timeout !== undefined) body.timeout = g.timeout;
        if (g.type !== undefined) body.type = g.type;
        const result = await update(endpoint, existing.id, body, "PATCH", {
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
      description: "Delete the Healthchecks",
      arguments: z.object({
        id: z.string().describe("The ID of the Healthchecks"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/healthchecks";
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
      description: "Sync Healthchecks state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/healthchecks";
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
