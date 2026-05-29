// Auto-generated extension model for @swamp/digitalocean/ssl-certificate
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean ssl certificate.
 *
 * Wraps the `/v2/certificates` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  read,
  remove,
  tryFindByField,
  tryRead,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "A unique human-readable name referring to a certificate.",
  ),
  type: z.enum(["custom", "lets_encrypt"]).describe(
    "A string representing the type of the certificate. The value will be `custom` for a user-uploaded certificate or `lets_encrypt` for one automatically generated with Let's Encrypt.",
  ).optional(),
  dns_names: z.array(z.string()).describe(
    "An array of fully qualified domain names (FQDNs) for which the certificate was issued. A certificate covering all subdomains can be issued using a wildcard (e.g. `*.example.com`).",
  ).optional(),
  private_key: z.string().describe(
    "The contents of a PEM-formatted private-key corresponding to the SSL certificate.",
  ).optional(),
  leaf_certificate: z.string().describe(
    "The contents of a PEM-formatted public SSL certificate.",
  ).optional(),
  certificate_chain: z.string().describe(
    "The full PEM-formatted trust chain between the certificate authority's certificate and your domain's SSL certificate.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  not_after: z.string().optional(),
  sha1_fingerprint: z.string().optional(),
  created_at: z.string().optional(),
  dns_names: z.array(z.string()).optional(),
  state: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  type: z.enum(["custom", "lets_encrypt"]).optional(),
  dns_names: z.array(z.string()).optional(),
  private_key: z.string().optional(),
  leaf_certificate: z.string().optional(),
  certificate_chain: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean ssl certificate. Registered at `@swamp/digitalocean/ssl-certificate`. */
export const model = {
  type: "@swamp/digitalocean/ssl-certificate",
  version: "2026.05.29.1",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.03.27.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.29.1",
      description: "Added: token",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "SSL Certificate resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ssl certificate",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/certificates",
            "name",
            g.name?.toString() ?? "",
            g.token,
          );
          if (existing) {
            throw new Error(`Resource already exists with name: ${g.name}`);
          }
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.type !== undefined) body.type = g.type;
        if (g.dns_names !== undefined) body.dns_names = g.dns_names;
        if (g.private_key !== undefined) body.private_key = g.private_key;
        if (g.leaf_certificate !== undefined) {
          body.leaf_certificate = g.leaf_certificate;
        }
        if (g.certificate_chain !== undefined) {
          body.certificate_chain = g.certificate_chain;
        }
        const result = await create(
          "/v2/certificates",
          body,
          undefined,
          g.token,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a ssl certificate",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the ssl certificate",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/certificates",
          args.id,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id.toString())
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the ssl certificate",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the ssl certificate",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/certificates",
          args.id,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
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
      description: "Sync ssl certificate state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const result = await tryRead(
          "/v2/certificates",
          existing.id ?? existing.id,
          undefined,
          g.token,
        ) as ResourceData | null;
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
