// Auto-generated extension model for @swamp/cloudflare/zt-risk-scoring/integrations
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Integrations.
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
  active: z.boolean().describe(
    "Whether this integration is enabled. If disabled, no risk changes will be exported to the third-party.",
  ).optional(),
  reference_id: z.string().describe(
    "A reference id that can be supplied by the client. Currently this should be set to the Access-Okta IDP ID (a UUIDv4).\nhttps://developers.cloudflare.com/api/operations/access-identity-providers-get-an-access-identity-provider",
  ).optional(),
  tenant_url: z.string().describe(
    'The base url of the tenant, e.g. "https://tenant.okta.com".',
  ),
  integration_type: z.enum(["Okta"]),
});

const ResourceSchema = z.object({
  account_tag: z.string().optional(),
  active: z.boolean().optional(),
  created_at: z.string().optional(),
  id: z.string(),
  integration_type: z.string().optional(),
  reference_id: z.string().optional(),
  tenant_url: z.string().optional(),
  well_known_url: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().optional(),
  active: z.boolean().optional(),
  reference_id: z.string().optional(),
  tenant_url: z.string().optional(),
  integration_type: z.enum(["Okta"]).optional(),
});

/** Swamp extension model for Cloudflare Integrations. Registered at `@swamp/cloudflare/zt-risk-scoring/integrations`. */
export const model = {
  type: "@swamp/cloudflare/zt-risk-scoring/integrations",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Integrations resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Integrations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/zt_risk_scoring/integrations";
        const body: Record<string, unknown> = {};
        if (g.integration_type !== undefined) {
          body.integration_type = g.integration_type;
        }
        if (g.reference_id !== undefined) body.reference_id = g.reference_id;
        if (g.tenant_url !== undefined) body.tenant_url = g.tenant_url;
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
      description: "Get a Integrations",
      arguments: z.object({
        id: z.string().describe("The ID of the Integrations"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/zt_risk_scoring/integrations";
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
      description: "Update Integrations attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/zt_risk_scoring/integrations";
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
        if (g.active !== undefined) body.active = g.active;
        if (g.reference_id !== undefined) body.reference_id = g.reference_id;
        if (g.tenant_url !== undefined) body.tenant_url = g.tenant_url;
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PUT",
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
      description: "Delete the Integrations",
      arguments: z.object({
        id: z.string().describe("The ID of the Integrations"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/zt_risk_scoring/integrations";
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
      description: "Sync Integrations state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/zt_risk_scoring/integrations";
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
