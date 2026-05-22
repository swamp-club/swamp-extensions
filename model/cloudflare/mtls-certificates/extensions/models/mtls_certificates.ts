// Auto-generated extension model for @swamp/cloudflare/mtls-certificates/mtls-certificates
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Mtls Certificates.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  ca: z.boolean().describe(
    "Indicates whether the certificate is a CA or leaf certificate.",
  ),
  certificates: z.string().describe("The uploaded root CA certificate."),
  name: z.string().describe(
    "Optional unique name for the certificate. Only used for human readability.",
  ).optional(),
  private_key: z.string().describe(
    "The private key for the certificate. This field is only needed for specific use cases such as using a custom certificate with Zero Trust's block page.",
  ).optional(),
});

const ResourceSchema = z.object({
  ca: z.boolean().optional(),
  certificates: z.string().optional(),
  expires_on: z.string().optional(),
  id: z.string(),
  issuer: z.string().optional(),
  name: z.string().optional(),
  serial_number: z.string().optional(),
  signature: z.string().optional(),
  type: z.string().optional(),
  uploaded_on: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  ca: z.boolean().optional(),
  certificates: z.string().optional(),
  name: z.string().optional(),
  private_key: z.string().optional(),
});

/** Swamp extension model for Cloudflare Mtls Certificates. Registered at `@swamp/cloudflare/mtls-certificates/mtls-certificates`. */
export const model = {
  type: "@swamp/cloudflare/mtls-certificates/mtls-certificates",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Mtls Certificates resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Mtls Certificates",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/mtls_certificates";
        const body: Record<string, unknown> = {};
        if (g.ca !== undefined) body.ca = g.ca;
        if (g.certificates !== undefined) body.certificates = g.certificates;
        if (g.name !== undefined) body.name = g.name;
        if (g.private_key !== undefined) body.private_key = g.private_key;
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
      description: "Get a Mtls Certificates",
      arguments: z.object({
        id: z.string().describe("The ID of the Mtls Certificates"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/mtls_certificates";
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
    delete: {
      description: "Delete the Mtls Certificates",
      arguments: z.object({
        id: z.string().describe("The ID of the Mtls Certificates"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/mtls_certificates";
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
      description: "Sync Mtls Certificates state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/mtls_certificates";
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
