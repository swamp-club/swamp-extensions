// Auto-generated extension model for @swamp/cloudflare/smart-shield/healthchecks
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
});

/** Swamp extension model for Cloudflare Healthchecks. Registered at `@swamp/cloudflare/smart-shield/healthchecks`. */
export const model = {
  type: "@swamp/cloudflare/smart-shield/healthchecks",
  version: "2026.05.22.1",
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
        const endpoint = "/zones/" + g.zone_id + "/smart_shield/healthchecks";
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
        const result = await create(endpoint, body) as ResourceData;
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
        const endpoint = "/zones/" + g.zone_id + "/smart_shield/healthchecks";
        const result = await read(endpoint, args.id) as ResourceData;
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
        const endpoint = "/zones/" + g.zone_id + "/smart_shield/healthchecks";
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
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PATCH",
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
      description: "Delete the Healthchecks",
      arguments: z.object({
        id: z.string().describe("The ID of the Healthchecks"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/smart_shield/healthchecks";
        const { existed } = await remove(endpoint, args.id);
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
        const endpoint = "/zones/" + g.zone_id + "/smart_shield/healthchecks";
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
        const result = await tryRead(endpoint, existing.id) as
          | ResourceData
          | null;
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
