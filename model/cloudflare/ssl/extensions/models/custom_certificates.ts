// Auto-generated extension model for @swamp/cloudflare/ssl/custom-certificates
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Custom Certificates.
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
  bundle_method: z.enum(["ubiquitous", "optimal", "force"]).describe(
    "A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.",
  ).optional(),
  certificate: z.string().describe(
    "The zone's SSL certificate or certificate and the intermediate(s).",
  ),
  custom_csr_id: z.string().describe(
    "The identifier for the Custom CSR that was used.",
  ).optional(),
  deploy: z.enum(["staging", "production"]).describe(
    "The environment to deploy the certificate to, defaults to production",
  ).optional(),
  geo_restrictions: z.object({
    label: z.enum(["us", "eu", "highest_security"]).optional(),
  }).describe(
    "Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Options allow distribution to only to U.S. data centers, only to E.U. data centers, or only to highest security data centers. Default distribution is to all Cloudflare datacenters, for optimal performance.",
  ).optional(),
  policy: z.string().describe(
    'Specify the policy that determines the region where your private key will be held locally. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Any combination of countries, specified by their two letter country code (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) can be chosen, such as \'country: IN\', as well as \'region: EU\' which refers to the EU region. If there are too few data centers satisfying the policy, it will be rejected.\nNote: The API accepts this field as either "policy" or "policy_restrictions" in requests. Responses return this field as "policy_restrictions".',
  ).optional(),
  private_key: z.string().describe(
    "The zone's private key. Not required if custom_csr_id is provided, in which case the private key is retrieved from the CSR record held by Cloudflare.",
  ).optional(),
  type: z.enum(["legacy_custom", "sni_custom"]).describe(
    "The type 'legacy_custom' enables support for legacy clients which do not include SNI in the TLS handshake.",
  ).optional(),
});

const ResourceSchema = z.object({
  bundle_method: z.string().optional(),
  custom_csr_id: z.string().optional(),
  expires_on: z.string().optional(),
  geo_restrictions: z.object({
    label: z.string().optional(),
  }).optional(),
  hosts: z.array(z.string()).optional(),
  id: z.string(),
  issuer: z.string().optional(),
  keyless_server: z.object({
    created_on: z.string().optional(),
    enabled: z.boolean().optional(),
    host: z.string().optional(),
    id: z.string().optional(),
    modified_on: z.string().optional(),
    name: z.string().optional(),
    permissions: z.array(z.string()).optional(),
    port: z.number().optional(),
    status: z.string().optional(),
    tunnel: z.object({
      private_ip: z.string().optional(),
      vnet_id: z.string().optional(),
    }).optional(),
  }).optional(),
  modified_on: z.string().optional(),
  policy_restrictions: z.string().optional(),
  priority: z.number().optional(),
  signature: z.string().optional(),
  status: z.string().optional(),
  uploaded_on: z.string().optional(),
  zone_id: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  zone_id: z.string().optional(),
  name: z.string().optional(),
  bundle_method: z.enum(["ubiquitous", "optimal", "force"]).optional(),
  certificate: z.string().optional(),
  custom_csr_id: z.string().optional(),
  deploy: z.enum(["staging", "production"]).optional(),
  geo_restrictions: z.object({
    label: z.enum(["us", "eu", "highest_security"]).optional(),
  }).optional(),
  policy: z.string().optional(),
  private_key: z.string().optional(),
  type: z.enum(["legacy_custom", "sni_custom"]).optional(),
});

/** Swamp extension model for Cloudflare Custom Certificates. Registered at `@swamp/cloudflare/ssl/custom-certificates`. */
export const model = {
  type: "@swamp/cloudflare/ssl/custom-certificates",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Custom Certificates resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Custom Certificates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/custom_certificates";
        const body: Record<string, unknown> = {};
        if (g.bundle_method !== undefined) body.bundle_method = g.bundle_method;
        if (g.certificate !== undefined) body.certificate = g.certificate;
        if (g.custom_csr_id !== undefined) body.custom_csr_id = g.custom_csr_id;
        if (g.deploy !== undefined) body.deploy = g.deploy;
        if (g.geo_restrictions !== undefined) {
          body.geo_restrictions = g.geo_restrictions;
        }
        if (g.policy !== undefined) body.policy = g.policy;
        if (g.private_key !== undefined) body.private_key = g.private_key;
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
      description: "Get a Custom Certificates",
      arguments: z.object({
        id: z.string().describe("The ID of the Custom Certificates"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/custom_certificates";
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
      description: "Update Custom Certificates attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/custom_certificates";
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
        if (g.bundle_method !== undefined) body.bundle_method = g.bundle_method;
        if (g.certificate !== undefined) body.certificate = g.certificate;
        if (g.custom_csr_id !== undefined) body.custom_csr_id = g.custom_csr_id;
        if (g.deploy !== undefined) body.deploy = g.deploy;
        if (g.geo_restrictions !== undefined) {
          body.geo_restrictions = g.geo_restrictions;
        }
        if (g.policy !== undefined) body.policy = g.policy;
        if (g.private_key !== undefined) body.private_key = g.private_key;
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
      description: "Delete the Custom Certificates",
      arguments: z.object({
        id: z.string().describe("The ID of the Custom Certificates"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/custom_certificates";
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
      description: "Sync Custom Certificates state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/zones/" + g.zone_id + "/custom_certificates";
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
