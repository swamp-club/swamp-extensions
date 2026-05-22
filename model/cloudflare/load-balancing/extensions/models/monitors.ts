// Auto-generated extension model for @swamp/cloudflare/load-balancing/monitors
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Monitors.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  allow_insecure: z.boolean().describe(
    "Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.",
  ).optional(),
  consecutive_down: z.number().int().describe(
    "To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.",
  ).optional(),
  consecutive_up: z.number().int().describe(
    "To be marked healthy the monitored origin must pass this healthcheck N consecutive times.",
  ).optional(),
  description: z.string().describe("Object description.").optional(),
  expected_body: z.string().describe(
    "A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  expected_codes: z.string().describe(
    "The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  follow_redirects: z.boolean().describe(
    "Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  header: z.record(z.string(), z.unknown()).describe(
    "The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  interval: z.number().int().describe(
    "The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations.",
  ).optional(),
  method: z.string().describe(
    "The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks.",
  ).optional(),
  path: z.string().describe(
    "The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  port: z.number().int().describe(
    "The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).",
  ).optional(),
  probe_zone: z.string().describe(
    "Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors.",
  ).optional(),
  retries: z.number().int().describe(
    "The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.",
  ).optional(),
  timeout: z.number().int().describe(
    "The timeout (in seconds) before marking the health check as failed.",
  ).optional(),
  type: z.enum(["http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp"])
    .describe(
      "The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'.",
    ).optional(),
});

const ResourceSchema = z.object({
  allow_insecure: z.boolean().optional(),
  consecutive_down: z.number().optional(),
  consecutive_up: z.number().optional(),
  description: z.string().optional(),
  expected_body: z.string().optional(),
  expected_codes: z.string().optional(),
  follow_redirects: z.boolean().optional(),
  header: z.record(z.string(), z.unknown()).optional(),
  interval: z.number().optional(),
  method: z.string().optional(),
  path: z.string().optional(),
  port: z.number().optional(),
  probe_zone: z.string().optional(),
  retries: z.number().optional(),
  timeout: z.number().optional(),
  type: z.string().optional(),
  created_on: z.string().optional(),
  id: z.string(),
  modified_on: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  allow_insecure: z.boolean().optional(),
  consecutive_down: z.number().int().optional(),
  consecutive_up: z.number().int().optional(),
  description: z.string().optional(),
  expected_body: z.string().optional(),
  expected_codes: z.string().optional(),
  follow_redirects: z.boolean().optional(),
  header: z.record(z.string(), z.unknown()).optional(),
  interval: z.number().int().optional(),
  method: z.string().optional(),
  path: z.string().optional(),
  port: z.number().int().optional(),
  probe_zone: z.string().optional(),
  retries: z.number().int().optional(),
  timeout: z.number().int().optional(),
  type: z.enum(["http", "https", "tcp", "udp_icmp", "icmp_ping", "smtp"])
    .optional(),
});

/** Swamp extension model for Cloudflare Monitors. Registered at `@swamp/cloudflare/load-balancing/monitors`. */
export const model = {
  type: "@swamp/cloudflare/load-balancing/monitors",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Monitors resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Monitors",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const body: Record<string, unknown> = {};
        if (g.allow_insecure !== undefined) {
          body.allow_insecure = g.allow_insecure;
        }
        if (g.consecutive_down !== undefined) {
          body.consecutive_down = g.consecutive_down;
        }
        if (g.consecutive_up !== undefined) {
          body.consecutive_up = g.consecutive_up;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.expected_body !== undefined) body.expected_body = g.expected_body;
        if (g.expected_codes !== undefined) {
          body.expected_codes = g.expected_codes;
        }
        if (g.follow_redirects !== undefined) {
          body.follow_redirects = g.follow_redirects;
        }
        if (g.header !== undefined) body.header = g.header;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.method !== undefined) body.method = g.method;
        if (g.path !== undefined) body.path = g.path;
        if (g.port !== undefined) body.port = g.port;
        if (g.probe_zone !== undefined) body.probe_zone = g.probe_zone;
        if (g.retries !== undefined) body.retries = g.retries;
        if (g.timeout !== undefined) body.timeout = g.timeout;
        if (g.type !== undefined) body.type = g.type;
        const result = await create(endpoint, body) as ResourceData;
        const instanceName = (g.description?.toString() ?? "current").replace(
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
      description: "Get a Monitors",
      arguments: z.object({
        id: z.string().describe("The ID of the Monitors"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (g.description?.toString() ?? args.id).replace(
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
      description: "Update Monitors attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const instanceName = (g.description?.toString() ?? "current").replace(
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
        if (g.allow_insecure !== undefined) {
          body.allow_insecure = g.allow_insecure;
        }
        if (g.consecutive_down !== undefined) {
          body.consecutive_down = g.consecutive_down;
        }
        if (g.consecutive_up !== undefined) {
          body.consecutive_up = g.consecutive_up;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.expected_body !== undefined) body.expected_body = g.expected_body;
        if (g.expected_codes !== undefined) {
          body.expected_codes = g.expected_codes;
        }
        if (g.follow_redirects !== undefined) {
          body.follow_redirects = g.follow_redirects;
        }
        if (g.header !== undefined) body.header = g.header;
        if (g.interval !== undefined) body.interval = g.interval;
        if (g.method !== undefined) body.method = g.method;
        if (g.path !== undefined) body.path = g.path;
        if (g.port !== undefined) body.port = g.port;
        if (g.probe_zone !== undefined) body.probe_zone = g.probe_zone;
        if (g.retries !== undefined) body.retries = g.retries;
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
      description: "Delete the Monitors",
      arguments: z.object({
        id: z.string().describe("The ID of the Monitors"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const { existed } = await remove(endpoint, args.id);
        const instanceName =
          (context.globalArgs.description?.toString() ?? args.id).replace(
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
      description: "Sync Monitors state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/load_balancers/monitors";
        const instanceName = (g.description?.toString() ?? "current").replace(
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
