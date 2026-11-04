// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/digitalocean/action-gateway-provider-credential
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean action gateway provider credential.
 *
 * Wraps the `/v2/action-gateway/provider-credentials` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createEnveloped,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  display_name: z.string().min(1).max(255).describe(
    "Required label, unique among the team's credentials for this provider, ignoring case. A duplicate returns 409.",
  ).optional(),
  api_key: z.string().min(1).max(4096).meta({ sensitive: true }).describe(
    "Required for API-key credentials. Rejected for other kinds. Never returned.",
  ).optional(),
  client_id: z.string().min(1).max(255).describe(
    "Required for OAuth client credentials. Rejected for other kinds.",
  ).optional(),
  client_secret: z.string().min(1).max(1024).meta({ sensitive: true }).describe(
    "Required for OAuth client credentials. Rejected for other kinds. Never returned.",
  ).optional(),
  base_url: z.string().max(255).describe(
    "Provider API HTTPS origin. Accepted only when the provider allows one, restricted to its allowed hosts, and required when the provider requires it. Do not send this alongside credential_parameters.",
  ).optional(),
  credential_parameters: z.record(z.string(), z.unknown()).describe(
    "Non-secret configuration for API-key providers that declare credential parameters. Validated against the provider's parameter definitions and used to derive base_url. Rejected for other credential kinds.",
  ).optional(),
  reusable_by_team: z.boolean().describe(
    "Share the credential with the team. Defaults to false, so only its creator can see and use it. Requires the team owner role when team-scoped provider credentials are enabled for the account.",
  ).optional(),
  provider: z.string().min(1).describe(
    "Required provider slug from the provider catalog.",
  ).optional(),
  kind: z.enum(["PROVIDER_CREDENTIAL_KIND_NONE"]).optional(),
  redirect_url: z.string().max(1024).describe(
    "OAuth clients only. Optional absolute HTTPS redirect URI registered at the provider, with no user information or fragment. Requires custom OAuth redirects to be enabled for the account. Omit to use DigitalOcean's callback. Cannot be changed after registration.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  provider: z.string().optional(),
  display_name: z.string().optional(),
  kind: z.string().optional(),
  base_url: z.string().optional(),
  status: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  owning_user_id: z.string().optional(),
  reusable_by_team: z.boolean().optional(),
  redirect_url: z.string().optional(),
  scope: z.string().optional(),
  discovery: z.object({
    status: z.string().optional(),
    consented_by_user_id: z.string().optional(),
    consented_at: z.string().optional(),
    authorization_url: z.string().optional(),
  }).nullable().optional(),
  revoked_connections: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  display_name: z.string().min(1).max(255).optional(),
  api_key: z.string().min(1).max(4096).meta({ sensitive: true }).optional(),
  client_id: z.string().min(1).max(255).optional(),
  client_secret: z.string().min(1).max(1024).meta({ sensitive: true })
    .optional(),
  base_url: z.string().max(255).optional(),
  credential_parameters: z.record(z.string(), z.unknown()).optional(),
  reusable_by_team: z.boolean().optional(),
  provider: z.string().min(1).optional(),
  kind: z.enum(["PROVIDER_CREDENTIAL_KIND_NONE"]).optional(),
  redirect_url: z.string().max(1024).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean action gateway provider credential. Registered at `@swamp/digitalocean/action-gateway-provider-credential`. */
export const model = {
  type: "@swamp/digitalocean/action-gateway-provider-credential",
  version: "2026.11.03.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Action Gateway Provider Credential resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a action gateway provider credential",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["display_name", "kind", "provider"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.provider !== undefined) body.provider = g.provider;
        if (g.kind !== undefined) body.kind = g.kind;
        if (g.display_name !== undefined) body.display_name = g.display_name;
        if (g.api_key !== undefined) body.api_key = g.api_key;
        if (g.client_id !== undefined) body.client_id = g.client_id;
        if (g.client_secret !== undefined) body.client_secret = g.client_secret;
        if (g.base_url !== undefined) body.base_url = g.base_url;
        if (g.credential_parameters !== undefined) {
          body.credential_parameters = g.credential_parameters;
        }
        if (g.reusable_by_team !== undefined) {
          body.reusable_by_team = g.reusable_by_team;
        }
        if (g.redirect_url !== undefined) body.redirect_url = g.redirect_url;
        const result = await createEnveloped(
          "/v2/action-gateway/provider-credentials",
          body,
          "credential",
          ["revoked_connections"],
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
      description: "Get a action gateway provider credential",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway provider credential",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/action-gateway/provider-credentials",
          args.id,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
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
      description: "Update action gateway provider credential attributes",
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
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const storedId = existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no id; run get with the resource ID first",
          );
        }
        const body: Record<string, unknown> = {};
        if (g.display_name !== undefined) body.display_name = g.display_name;
        if (g.api_key !== undefined) body.api_key = g.api_key;
        if (g.client_id !== undefined) body.client_id = g.client_id;
        if (g.client_secret !== undefined) body.client_secret = g.client_secret;
        if (g.base_url !== undefined) body.base_url = g.base_url;
        if (g.credential_parameters !== undefined) {
          body.credential_parameters = g.credential_parameters;
        }
        if (g.reusable_by_team !== undefined) {
          body.reusable_by_team = g.reusable_by_team;
        }
        const result = await update(
          "/v2/action-gateway/provider-credentials",
          storedId,
          body,
          "PATCH",
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
    delete: {
      description: "Delete the action gateway provider credential",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway provider credential",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/action-gateway/provider-credentials",
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
      description:
        "Sync action gateway provider credential state from DigitalOcean",
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
        const storedId = existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no id; run get with the resource ID first",
          );
        }
        const result = await tryRead(
          "/v2/action-gateway/provider-credentials",
          storedId,
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
          id: storedId,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
