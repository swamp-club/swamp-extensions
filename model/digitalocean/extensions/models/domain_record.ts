// Auto-generated extension model for @swamp/digitalocean/domain-record
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean domain record.
 *
 * Wraps the `/v2/domains/{domain_name}/records` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  domain_name: z.string().describe("Parent resource identifier"),
  instance_name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  type: z.string().describe(
    "The type of the DNS record. For example: A, CNAME, TXT, ...",
  ),
  name: z.string().describe(
    "The host name, alias, or service being defined by the record.",
  ).optional(),
  data: z.string().describe(
    'Variable data depending on record type. For example, the "data" value for an A record would be the IPv4 address to which the domain will be mapped. For a CAA record, it would contain the domain name of the CA being granted permission to issue certificates.',
  ).optional(),
  priority: z.number().int().describe("The priority for SRV and MX records.")
    .optional(),
  port: z.number().int().describe("The port for SRV records.").optional(),
  ttl: z.number().int().describe(
    "This value is the time to live for the record, in seconds. This defines the time frame that clients can cache queried information before a refresh should be requested.",
  ).optional(),
  weight: z.number().int().describe("The weight for SRV records.").optional(),
  flags: z.number().int().describe(
    "An unsigned integer between 0-255 used for CAA records.",
  ).optional(),
  tag: z.string().describe(
    'The parameter tag for CAA records. Valid values are "issue", "issuewild", or "iodef"',
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  type: z.string().optional(),
  name: z.string().optional(),
  data: z.string().optional(),
  priority: z.number().nullable().optional(),
  port: z.number().nullable().optional(),
  ttl: z.number().optional(),
  weight: z.number().nullable().optional(),
  flags: z.number().nullable().optional(),
  tag: z.string().nullable().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  domain_name: z.string().optional(),
  instance_name: z.string().optional(),
  type: z.string().optional(),
  name: z.string().optional(),
  data: z.string().optional(),
  priority: z.number().int().optional(),
  port: z.number().int().optional(),
  ttl: z.number().int().optional(),
  weight: z.number().int().optional(),
  flags: z.number().int().optional(),
  tag: z.string().optional(),
});

/** Swamp extension model for DigitalOcean domain record. Registered at `@swamp/digitalocean/domain-record`. */
export const model = {
  type: "@swamp/digitalocean/domain-record",
  version: "2026.05.22.4",
  upgrades: [
    {
      toVersion: "2026.05.22.2",
      description: "Removed: domain_name",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { domain_name: _domain_name, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.22.3",
      description: "Removed: domain_name",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { domain_name: _domain_name, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.05.22.4",
      description: "Removed: domain_name, instance_name",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          domain_name: _domain_name,
          instance_name: _instance_name,
          ...rest
        } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Domain Record resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a domain record",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/domains/${g.domain_name}/records`;
        const instanceName = (g.instance_name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.type !== undefined) body.type = g.type;
        if (g.name !== undefined) body.name = g.name;
        if (g.data !== undefined) body.data = g.data;
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.port !== undefined) body.port = g.port;
        if (g.ttl !== undefined) body.ttl = g.ttl;
        if (g.weight !== undefined) body.weight = g.weight;
        if (g.flags !== undefined) body.flags = g.flags;
        if (g.tag !== undefined) body.tag = g.tag;
        const result = await create(endpoint, body) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a domain record",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the domain record",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/domains/${g.domain_name}/records`;
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName =
          (context.globalArgs.instance_name?.toString() ?? args.id.toString())
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
      description: "Update domain record attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/domains/${g.domain_name}/records`;
        const instanceName = (g.instance_name?.toString() ?? "current").replace(
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
        if (g.type !== undefined) body.type = g.type;
        if (g.name !== undefined) body.name = g.name;
        if (g.data !== undefined) body.data = g.data;
        if (g.priority !== undefined) body.priority = g.priority;
        if (g.port !== undefined) body.port = g.port;
        if (g.ttl !== undefined) body.ttl = g.ttl;
        if (g.weight !== undefined) body.weight = g.weight;
        if (g.flags !== undefined) body.flags = g.flags;
        if (g.tag !== undefined) body.tag = g.tag;
        const result = await update(
          endpoint,
          existing.id ?? existing.id,
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
      description: "Delete the domain record",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the domain record",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/domains/${g.domain_name}/records`;
        const { existed } = await remove(endpoint, args.id);
        const instanceName =
          (context.globalArgs.instance_name?.toString() ?? args.id.toString())
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
      description: "Sync domain record state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/domains/${g.domain_name}/records`;
        const instanceName = (g.instance_name?.toString() ?? "current").replace(
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
        const result = await tryRead(endpoint, existing.id ?? existing.id) as
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
          id: existing.id ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
