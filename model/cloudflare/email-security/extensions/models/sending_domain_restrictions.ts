// Auto-generated extension model for @swamp/cloudflare/email-security/sending-domain-restrictions
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Sending Domain Restrictions.
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  comments: z.string().max(1024).optional(),
  created_at: z.string().optional(),
  domain: z.string().describe("Domain that requires TLS enforcement.")
    .optional(),
  exclude: z.array(z.string()).describe(
    "Excluded subdomains that are exempt from TLS requirements.",
  ).optional(),
  id: z.string().describe("Sending domain restriction identifier.").optional(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
});

const ResourceSchema = z.object({
  comments: z.string().optional(),
  created_at: z.string().optional(),
  domain: z.string().optional(),
  exclude: z.array(z.string()).optional(),
  id: z.string(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  comments: z.string().max(1024).optional(),
  created_at: z.string().optional(),
  domain: z.string().optional(),
  exclude: z.array(z.string()).optional(),
  id: z.string().optional(),
  last_modified: z.string().optional(),
  modified_at: z.string().optional(),
});

/** Swamp extension model for Cloudflare Sending Domain Restrictions. Registered at `@swamp/cloudflare/email-security/sending-domain-restrictions`. */
export const model = {
  type: "@swamp/cloudflare/email-security/sending-domain-restrictions",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Sending Domain Restrictions resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Sending Domain Restrictions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/sending_domain_restrictions";
        const body: Record<string, unknown> = {};
        if (g.comments !== undefined) body.comments = g.comments;
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.domain !== undefined) body.domain = g.domain;
        if (g.exclude !== undefined) body.exclude = g.exclude;
        if (g.id !== undefined) body.id = g.id;
        if (g.last_modified !== undefined) body.last_modified = g.last_modified;
        if (g.modified_at !== undefined) body.modified_at = g.modified_at;
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
      description: "Get a Sending Domain Restrictions",
      arguments: z.object({
        id: z.string().describe("The ID of the Sending Domain Restrictions"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/sending_domain_restrictions";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
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
      description: "Update Sending Domain Restrictions attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/sending_domain_restrictions";
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
        if (g.comments !== undefined) body.comments = g.comments;
        if (g.created_at !== undefined) body.created_at = g.created_at;
        if (g.domain !== undefined) body.domain = g.domain;
        if (g.exclude !== undefined) body.exclude = g.exclude;
        if (g.id !== undefined) body.id = g.id;
        if (g.last_modified !== undefined) body.last_modified = g.last_modified;
        if (g.modified_at !== undefined) body.modified_at = g.modified_at;
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
      description: "Delete the Sending Domain Restrictions",
      arguments: z.object({
        id: z.string().describe("The ID of the Sending Domain Restrictions"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/sending_domain_restrictions";
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
      description: "Sync Sending Domain Restrictions state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/email-security/settings/sending_domain_restrictions";
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
