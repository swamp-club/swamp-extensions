// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/digitalocean/action-gateway-connection
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean action gateway connection.
 *
 * Wraps the `/v2/action-gateway/connections` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  provider: z.string().describe(
    "Required provider slug, from the provider list.",
  ),
  user_id: z.string().regex(new RegExp("^[A-Za-z0-9._-]{1,64}$")).describe(
    "Required. Your identifier for the user the connection acts for: 1 to 64 characters from `[A-Za-z0-9._-]`. A session whose `actor_id` equals it uses this connection.",
  ),
  scopes: z.array(z.string()).describe(
    "Optional OAuth scopes to request. Defaults to every scope the provider offers; scopes outside that set are rejected. Ignored for API-key credentials.",
  ).optional(),
  connection_parameters: z.record(z.string(), z.unknown()).describe(
    "Values for the provider's `connection_parameters`, validated against their specifications.",
  ).optional(),
  credential: z.object({
    digitalocean_oauth: z.record(z.string(), z.unknown()).optional(),
    team_credential: z.object({
      credential_id: z.string().optional(),
    }).optional(),
  }).describe(
    "Optional credential to connect through. Omitted uses DigitalOcean's shared OAuth application.",
  ).optional(),
  network: z.object({
    vpc: z.object({
      vpc_uuid: z.string().optional(),
      destinations: z.array(z.object({
        host: z.string().optional(),
        port: z.number().int().optional(),
        allowed_ip_cidrs: z.array(z.string()).optional(),
      })).optional(),
    }).optional(),
  }).describe(
    "Optional private network for the connection's calls. Requires VPC networking to be enabled for your account (403 otherwise).",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  provider: z.string().optional(),
  provider_display_name: z.string().optional(),
  user_id: z.string().optional(),
  status: z.string().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  revoked_at: z.string().nullable().optional(),
  connection_parameters: z.record(z.string(), z.unknown()).nullable()
    .optional(),
  credential_kind: z.string().optional(),
  credential_id: z.string().optional(),
  network: z.object({
    vpc: z.object({
      vpc_uuid: z.string().optional(),
      region: z.string().optional(),
      destinations: z.array(z.object({
        host: z.string().optional(),
        port: z.number().optional(),
        allowed_ip_cidrs: z.array(z.string()).optional(),
      })).optional(),
    }).optional(),
  }).nullable().optional(),
  oauth: z.object({
    scopes: z.array(z.string()).optional(),
    granted_at: z.string().optional(),
  }).optional(),
  api_key: z.record(z.string(), z.unknown()).optional(),
  scopes: z.array(z.string()).optional(),
  granted_at: z.string().nullable().optional(),
  owning_user_id: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  provider: z.string().optional(),
  user_id: z.string().regex(new RegExp("^[A-Za-z0-9._-]{1,64}$")).optional(),
  scopes: z.array(z.string()).optional(),
  connection_parameters: z.record(z.string(), z.unknown()).optional(),
  credential: z.object({
    digitalocean_oauth: z.record(z.string(), z.unknown()).optional(),
    team_credential: z.object({
      credential_id: z.string().optional(),
    }).optional(),
  }).optional(),
  network: z.object({
    vpc: z.object({
      vpc_uuid: z.string().optional(),
      destinations: z.array(z.object({
        host: z.string().optional(),
        port: z.number().int().optional(),
        allowed_ip_cidrs: z.array(z.string()).optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean action gateway connection. Registered at `@swamp/digitalocean/action-gateway-connection`. */
export const model = {
  type: "@swamp/digitalocean/action-gateway-connection",
  version: "2026.10.01.1",
  upgrades: [
    {
      toVersion: "2026.10.01.1",
      description: "Added: credential, network. Removed: id",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { id: _id, ...rest } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Action Gateway Connection resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a action gateway connection",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.provider !== undefined) body.provider = g.provider;
        if (g.user_id !== undefined) body.user_id = g.user_id;
        if (g.scopes !== undefined) body.scopes = g.scopes;
        if (g.connection_parameters !== undefined) {
          body.connection_parameters = g.connection_parameters;
        }
        if (g.credential !== undefined) body.credential = g.credential;
        if (g.network !== undefined) body.network = g.network;
        const result = await create(
          "/v2/action-gateway/connections",
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
      description: "Get a action gateway connection",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway connection",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/action-gateway/connections",
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
    delete: {
      description: "Delete the action gateway connection",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway connection",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/action-gateway/connections",
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
      description: "Sync action gateway connection state from DigitalOcean",
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
          "/v2/action-gateway/connections",
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
