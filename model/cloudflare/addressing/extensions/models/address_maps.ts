// Auto-generated extension model for @swamp/cloudflare/addressing/address-maps
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Address Maps.
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
  default_sni: z.string().describe(
    "If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudflare receives a TLS handshake from a client without an SNI, it will respond with the default SNI on those IPs. The default SNI can be any valid zone or subdomain owned by the account.",
  ).optional(),
  description: z.string().describe(
    "An optional description field which may be used to describe the types of IPs or zones on the map.",
  ).optional(),
  enabled: z.boolean().describe(
    "Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.",
  ).optional(),
  ips: z.array(z.string()).optional(),
  memberships: z.array(z.object({
    identifier: z.string().max(32).optional(),
    kind: z.enum(["zone", "account"]).optional(),
  })).describe(
    "Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.",
  ).optional(),
});

const ResourceSchema = z.object({
  can_delete: z.boolean().optional(),
  can_modify_ips: z.boolean().optional(),
  created_at: z.string().optional(),
  default_sni: z.string().optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  id: z.string(),
  modified_at: z.string().optional(),
  ips: z.array(z.object({
    created_at: z.string().optional(),
    ip: z.string().optional(),
  })).optional(),
  memberships: z.array(z.object({
    can_delete: z.boolean().optional(),
    created_at: z.string().optional(),
    identifier: z.string().optional(),
    kind: z.string().optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  default_sni: z.string().optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  ips: z.array(z.string()).optional(),
  memberships: z.array(z.object({
    identifier: z.string().max(32).optional(),
    kind: z.enum(["zone", "account"]).optional(),
  })).optional(),
});

/** Swamp extension model for Cloudflare Address Maps. Registered at `@swamp/cloudflare/addressing/address-maps`. */
export const model = {
  type: "@swamp/cloudflare/addressing/address-maps",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Address Maps resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Address Maps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/addressing/address_maps";
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.ips !== undefined) body.ips = g.ips;
        if (g.memberships !== undefined) body.memberships = g.memberships;
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
      description: "Get a Address Maps",
      arguments: z.object({
        id: z.string().describe("The ID of the Address Maps"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/addressing/address_maps";
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
      description: "Update Address Maps attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/addressing/address_maps";
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
        if (g.default_sni !== undefined) body.default_sni = g.default_sni;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
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
      description: "Delete the Address Maps",
      arguments: z.object({
        id: z.string().describe("The ID of the Address Maps"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/addressing/address_maps";
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
      description: "Sync Address Maps state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/addressing/address_maps";
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
