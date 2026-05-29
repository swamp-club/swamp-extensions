// Auto-generated extension model for @swamp/cloudflare/ssl/custom-csrs
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Custom Csrs.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().optional().describe(
    "Cloudflare account ID (provide account_id or zone_id)",
  ),
  zone_id: z.string().optional().describe(
    "Cloudflare zone ID (provide account_id or zone_id)",
  ),
  common_name: z.string().max(64).describe(
    "The common name (domain) for the CSR. Must be at most 64 characters.",
  ),
  country: z.string().describe("Two-letter ISO 3166-1 alpha-2 country code."),
  description: z.string().describe("Optional description for the CSR.")
    .optional(),
  key_type: z.enum(["rsa2048", "p256v1"]).describe(
    "Key algorithm to use for the CSR. Defaults to rsa2048 if not specified.",
  ).optional(),
  locality: z.string().describe("City or locality name."),
  name: z.string().describe("Human-readable name for the CSR.").optional(),
  organization: z.string().describe("Organization name."),
  organizational_unit: z.string().describe("Organizational unit name.")
    .optional(),
  sans: z.array(z.string().max(256)).describe(
    "Subject Alternative Names for the CSR. At least one SAN is required.",
  ),
  state: z.string().describe("State or province name."),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
}).refine(
  (d) => (d.account_id != null) !== (d.zone_id != null),
  "Exactly one of account_id or zone_id must be provided",
);

const ResourceSchema = z.object({
  account_tag: z.string().optional(),
  common_name: z.string().optional(),
  country: z.string().optional(),
  created_at: z.string().optional(),
  csr: z.string().optional(),
  description: z.string().optional(),
  id: z.string(),
  key_type: z.string().optional(),
  locality: z.string().optional(),
  name: z.string().optional(),
  organization: z.string().optional(),
  organizational_unit: z.string().optional(),
  sans: z.array(z.string()).optional(),
  state: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  zone_id: z.string().optional(),
  common_name: z.string().max(64).optional(),
  country: z.string().optional(),
  description: z.string().optional(),
  key_type: z.enum(["rsa2048", "p256v1"]).optional(),
  locality: z.string().optional(),
  name: z.string().optional(),
  organization: z.string().optional(),
  organizational_unit: z.string().optional(),
  sans: z.array(z.string().max(256)).optional(),
  state: z.string().optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Custom Csrs. Registered at `@swamp/cloudflare/ssl/custom-csrs`. */
export const model = {
  type: "@swamp/cloudflare/ssl/custom-csrs",
  version: "2026.05.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Custom Csrs resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Custom Csrs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/custom_csrs";
        const body: Record<string, unknown> = {};
        if (g.common_name !== undefined) body.common_name = g.common_name;
        if (g.country !== undefined) body.country = g.country;
        if (g.description !== undefined) body.description = g.description;
        if (g.key_type !== undefined) body.key_type = g.key_type;
        if (g.locality !== undefined) body.locality = g.locality;
        if (g.name !== undefined) body.name = g.name;
        if (g.organization !== undefined) body.organization = g.organization;
        if (g.organizational_unit !== undefined) {
          body.organizational_unit = g.organizational_unit;
        }
        if (g.sans !== undefined) body.sans = g.sans;
        if (g.state !== undefined) body.state = g.state;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Get a Custom Csrs",
      arguments: z.object({
        id: z.string().describe("The ID of the Custom Csrs"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/custom_csrs";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Delete the Custom Csrs",
      arguments: z.object({
        id: z.string().describe("The ID of the Custom Csrs"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/custom_csrs";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
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
      description: "Sync Custom Csrs state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/custom_csrs";
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
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
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
