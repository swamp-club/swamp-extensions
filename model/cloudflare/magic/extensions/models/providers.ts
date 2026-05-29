// Auto-generated extension model for @swamp/cloudflare/magic/providers
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Providers.
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
  aws_arn: z.string().optional(),
  azure_subscription_id: z.string().optional(),
  azure_tenant_id: z.string().optional(),
  description: z.string().optional(),
  friendly_name: z.string(),
  gcp_project_id: z.string().optional(),
  gcp_service_account_email: z.string().optional(),
  cloud_type: z.enum(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
});

const ResourceSchema = z.object({
  aws_arn: z.string().optional(),
  azure_subscription_id: z.string().optional(),
  azure_tenant_id: z.string().optional(),
  cloud_type: z.string().optional(),
  description: z.string().optional(),
  friendly_name: z.string().optional(),
  gcp_project_id: z.string().optional(),
  gcp_service_account_email: z.string().optional(),
  id: z.string(),
  last_updated: z.string().optional(),
  lifecycle_state: z.string().optional(),
  state: z.string().optional(),
  state_v2: z.string().optional(),
  status: z.object({
    credentials_good_since: z.string().optional(),
    credentials_missing_since: z.string().optional(),
    credentials_rejected_since: z.string().optional(),
    discovery_message: z.string().optional(),
    discovery_message_v2: z.string().optional(),
    discovery_progress: z.object({
      done: z.number().optional(),
      total: z.number().optional(),
      unit: z.string().optional(),
    }).optional(),
    discovery_progress_v2: z.object({
      done: z.number().optional(),
      total: z.number().optional(),
      unit: z.string().optional(),
    }).optional(),
    in_use_by: z.array(z.object({
      client_type: z.string().optional(),
      id: z.string().optional(),
      name: z.string().optional(),
    })).optional(),
    last_discovery_completed_at: z.string().optional(),
    last_discovery_completed_at_v2: z.string().optional(),
    last_discovery_started_at: z.string().optional(),
    last_discovery_started_at_v2: z.string().optional(),
    last_discovery_status: z.string().optional(),
    last_discovery_status_v2: z.string().optional(),
    last_updated: z.string().optional(),
    regions: z.array(z.string()).optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  aws_arn: z.string().optional(),
  azure_subscription_id: z.string().optional(),
  azure_tenant_id: z.string().optional(),
  description: z.string().optional(),
  friendly_name: z.string().optional(),
  gcp_project_id: z.string().optional(),
  gcp_service_account_email: z.string().optional(),
  cloud_type: z.enum(["AWS", "AZURE", "GOOGLE", "CLOUDFLARE"]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Providers. Registered at `@swamp/cloudflare/magic/providers`. */
export const model = {
  type: "@swamp/cloudflare/magic/providers",
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
      description: "Providers resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Providers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/cloud/providers";
        const body: Record<string, unknown> = {};
        if (g.cloud_type !== undefined) body.cloud_type = g.cloud_type;
        if (g.description !== undefined) body.description = g.description;
        if (g.friendly_name !== undefined) body.friendly_name = g.friendly_name;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Get a Providers",
      arguments: z.object({
        id: z.string().describe("The ID of the Providers"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/cloud/providers";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Update Providers attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/cloud/providers";
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
        if (g.aws_arn !== undefined) body.aws_arn = g.aws_arn;
        if (g.azure_subscription_id !== undefined) {
          body.azure_subscription_id = g.azure_subscription_id;
        }
        if (g.azure_tenant_id !== undefined) {
          body.azure_tenant_id = g.azure_tenant_id;
        }
        if (g.description !== undefined) body.description = g.description;
        if (g.friendly_name !== undefined) body.friendly_name = g.friendly_name;
        if (g.gcp_project_id !== undefined) {
          body.gcp_project_id = g.gcp_project_id;
        }
        if (g.gcp_service_account_email !== undefined) {
          body.gcp_service_account_email = g.gcp_service_account_email;
        }
        const result = await update(endpoint, existing.id, body, "PATCH", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Providers",
      arguments: z.object({
        id: z.string().describe("The ID of the Providers"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/cloud/providers";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
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
      description: "Sync Providers state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/magic/cloud/providers";
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
