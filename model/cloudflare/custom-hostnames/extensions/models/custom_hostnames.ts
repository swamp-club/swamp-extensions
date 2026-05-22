// Auto-generated extension model for @swamp/cloudflare/custom-hostnames/custom-hostnames
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Custom Hostnames.
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
  custom_metadata: z.record(z.string(), z.unknown()).describe(
    "Unique key/value metadata for this hostname. These are per-hostname (customer) settings.",
  ).optional(),
  custom_origin_server: z.string().describe(
    "a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.",
  ).optional(),
  custom_origin_sni: z.string().describe(
    "A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ':request_host_header:' which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.",
  ).optional(),
  ssl: z.object({
    bundle_method: z.enum(["ubiquitous", "optimal", "force"]).optional(),
    certificate_authority: z.enum([
      "digicert",
      "google",
      "lets_encrypt",
      "ssl_com",
    ]).optional(),
    cloudflare_branding: z.boolean().optional(),
    custom_cert_bundle: z.array(z.object({
      custom_certificate: z.string(),
      custom_key: z.string(),
    })).optional(),
    custom_certificate: z.string().optional(),
    custom_csr_id: z.string().optional(),
    custom_key: z.string().optional(),
    method: z.enum(["http", "txt", "email"]).optional(),
    settings: z.object({
      ciphers: z.array(z.string()).optional(),
      early_hints: z.enum(["on", "off"]).optional(),
      http2: z.enum(["on", "off"]).optional(),
      min_tls_version: z.enum(["1.0", "1.1", "1.2", "1.3"]).optional(),
      tls_1_3: z.enum(["on", "off"]).optional(),
    }).optional(),
    type: z.enum(["dv"]).optional(),
    wildcard: z.boolean().optional(),
  }).optional(),
  hostname: z.string().max(255).describe(
    "The custom hostname that will point to your hostname via CNAME.",
  ),
});

const ResourceSchema = z.object({
  created_at: z.string().optional(),
  custom_metadata: z.record(z.string(), z.unknown()).optional(),
  custom_origin_server: z.string().optional(),
  custom_origin_sni: z.string().optional(),
  hostname: z.string().optional(),
  id: z.string(),
  ownership_verification: z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    value: z.string().optional(),
  }).optional(),
  ownership_verification_http: z.object({
    http_body: z.string().optional(),
    http_url: z.string().optional(),
  }).optional(),
  ssl: z.object({
    bundle_method: z.string().optional(),
    certificate_authority: z.string().optional(),
    custom_certificate: z.string().optional(),
    custom_csr_id: z.string().optional(),
    custom_key: z.string().optional(),
    dcv_delegation_records: z.array(z.object({
      cname: z.string().optional(),
      cname_target: z.string().optional(),
      emails: z.array(z.string()).optional(),
      http_body: z.string().optional(),
      http_url: z.string().optional(),
      status: z.string().optional(),
      txt_name: z.string().optional(),
      txt_value: z.string().optional(),
    })).optional(),
    expires_on: z.string().optional(),
    hosts: z.array(z.string()).optional(),
    id: z.string().optional(),
    issuer: z.string().optional(),
    method: z.string().optional(),
    serial_number: z.string().optional(),
    settings: z.object({
      ciphers: z.array(z.string()).optional(),
      early_hints: z.string().optional(),
      http2: z.string().optional(),
      min_tls_version: z.string().optional(),
      tls_1_3: z.string().optional(),
    }).optional(),
    signature: z.string().optional(),
    status: z.string().optional(),
    type: z.string().optional(),
    uploaded_on: z.string().optional(),
    validation_errors: z.array(z.object({
      message: z.string().optional(),
    })).optional(),
    validation_records: z.array(z.object({
      cname: z.string().optional(),
      cname_target: z.string().optional(),
      emails: z.array(z.string()).optional(),
      http_body: z.string().optional(),
      http_url: z.string().optional(),
      status: z.string().optional(),
      txt_name: z.string().optional(),
      txt_value: z.string().optional(),
    })).optional(),
    wildcard: z.boolean().optional(),
  }).optional(),
  status: z.string().optional(),
  verification_errors: z.array(z.string()).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  name: z.string().optional(),
  custom_metadata: z.record(z.string(), z.unknown()).optional(),
  custom_origin_server: z.string().optional(),
  custom_origin_sni: z.string().optional(),
  ssl: z.object({
    bundle_method: z.enum(["ubiquitous", "optimal", "force"]).optional(),
    certificate_authority: z.enum([
      "digicert",
      "google",
      "lets_encrypt",
      "ssl_com",
    ]).optional(),
    cloudflare_branding: z.boolean().optional(),
    custom_cert_bundle: z.array(z.object({
      custom_certificate: z.string(),
      custom_key: z.string(),
    })).optional(),
    custom_certificate: z.string().optional(),
    custom_csr_id: z.string().optional(),
    custom_key: z.string().optional(),
    method: z.enum(["http", "txt", "email"]).optional(),
    settings: z.object({
      ciphers: z.array(z.string()).optional(),
      early_hints: z.enum(["on", "off"]).optional(),
      http2: z.enum(["on", "off"]).optional(),
      min_tls_version: z.enum(["1.0", "1.1", "1.2", "1.3"]).optional(),
      tls_1_3: z.enum(["on", "off"]).optional(),
    }).optional(),
    type: z.enum(["dv"]).optional(),
    wildcard: z.boolean().optional(),
  }).optional(),
  hostname: z.string().max(255).optional(),
});

/** Swamp extension model for Cloudflare Custom Hostnames. Registered at `@swamp/cloudflare/custom-hostnames/custom-hostnames`. */
export const model = {
  type: "@swamp/cloudflare/custom-hostnames/custom-hostnames",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Custom Hostnames resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Custom Hostnames",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/custom_hostnames";
        const body: Record<string, unknown> = {};
        if (g.custom_metadata !== undefined) {
          body.custom_metadata = g.custom_metadata;
        }
        if (g.hostname !== undefined) body.hostname = g.hostname;
        if (g.ssl !== undefined) body.ssl = g.ssl;
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
      description: "Get a Custom Hostnames",
      arguments: z.object({
        id: z.string().describe("The ID of the Custom Hostnames"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/custom_hostnames";
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
      description: "Update Custom Hostnames attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/custom_hostnames";
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
        if (g.custom_metadata !== undefined) {
          body.custom_metadata = g.custom_metadata;
        }
        if (g.custom_origin_server !== undefined) {
          body.custom_origin_server = g.custom_origin_server;
        }
        if (g.custom_origin_sni !== undefined) {
          body.custom_origin_sni = g.custom_origin_sni;
        }
        if (g.ssl !== undefined) body.ssl = g.ssl;
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
      description: "Delete the Custom Hostnames",
      arguments: z.object({
        id: z.string().describe("The ID of the Custom Hostnames"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/custom_hostnames";
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
      description: "Sync Custom Hostnames state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/custom_hostnames";
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
