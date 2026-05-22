// Auto-generated extension model for @swamp/cloudflare/addressing/prefixes
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Prefixes.
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
  description: z.string().max(1000).describe("Description of the prefix.")
    .optional(),
  asn: z.number().int().describe(
    "Autonomous System Number (ASN) the prefix will be advertised under.",
  ),
  cidr: z.string().describe(
    "IP Prefix in Classless Inter-Domain Routing format.",
  ),
  delegate_loa_creation: z.boolean().describe(
    "Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.",
  ).optional(),
  loa_document_id: z.string().max(32).describe(
    "Identifier for the uploaded LOA document.",
  ).optional(),
});

const ResourceSchema = z.object({
  account_id: z.string().optional(),
  advertised: z.boolean().optional(),
  advertised_modified_at: z.string().optional(),
  approved: z.string().optional(),
  asn: z.number().optional(),
  cidr: z.string().optional(),
  created_at: z.string().optional(),
  delegate_loa_creation: z.boolean().optional(),
  description: z.string().optional(),
  id: z.string(),
  irr_validation_state: z.string().optional(),
  loa_document_id: z.string().optional(),
  modified_at: z.string().optional(),
  on_demand_enabled: z.boolean().optional(),
  on_demand_locked: z.boolean().optional(),
  ownership_validation_state: z.string().optional(),
  ownership_validation_token: z.string().optional(),
  rpki_validation_state: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  description: z.string().max(1000).optional(),
  asn: z.number().int().optional(),
  cidr: z.string().optional(),
  delegate_loa_creation: z.boolean().optional(),
  loa_document_id: z.string().max(32).optional(),
});

/** Swamp extension model for Cloudflare Prefixes. Registered at `@swamp/cloudflare/addressing/prefixes`. */
export const model = {
  type: "@swamp/cloudflare/addressing/prefixes",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Prefixes resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Prefixes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/addressing/prefixes";
        const body: Record<string, unknown> = {};
        if (g.asn !== undefined) body.asn = g.asn;
        if (g.cidr !== undefined) body.cidr = g.cidr;
        if (g.delegate_loa_creation !== undefined) {
          body.delegate_loa_creation = g.delegate_loa_creation;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.loa_document_id !== undefined) {
          body.loa_document_id = g.loa_document_id;
        }
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
      description: "Get a Prefixes",
      arguments: z.object({
        id: z.string().describe("The ID of the Prefixes"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/addressing/prefixes";
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
      description: "Update Prefixes attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/addressing/prefixes";
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
        if (g.description !== undefined) body.description = g.description;
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
      description: "Delete the Prefixes",
      arguments: z.object({
        id: z.string().describe("The ID of the Prefixes"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/addressing/prefixes";
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
      description: "Sync Prefixes state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/addressing/prefixes";
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
