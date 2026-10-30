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

// Auto-generated extension model for @swamp/digitalocean/security-secret
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean security secret.
 *
 * Wraps the `/v2/security/secrets` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  create,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  region: z.enum([
    "nyc1",
    "sfo1",
    "nyc2",
    "ams2",
    "sgp1",
    "lon1",
    "nyc3",
    "ams3",
    "fra1",
    "tor1",
    "sfo2",
    "blr1",
    "sfo3",
    "syd1",
    "atl1",
  ]).describe("The region where the secret will be stored.").optional(),
  version: z.number().int().describe(
    "The current version of the secret to update.",
  ).optional(),
  values: z.record(z.string(), z.unknown()).describe(
    "Key-value pairs to store in the secret.",
  ).optional(),
  name: z.string().describe("The name of the secret to create."),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  secret: z.string(),
  region: z.string().optional(),
  version: z.number().optional(),
  values: z.record(z.string(), z.unknown()).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  delete_requested_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  region: z.enum([
    "nyc1",
    "sfo1",
    "nyc2",
    "ams2",
    "sgp1",
    "lon1",
    "nyc3",
    "ams3",
    "fra1",
    "tor1",
    "sfo2",
    "blr1",
    "sfo3",
    "syd1",
    "atl1",
  ]).optional(),
  version: z.number().int().optional(),
  values: z.record(z.string(), z.unknown()).optional(),
  name: z.string().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean security secret. Registered at `@swamp/digitalocean/security-secret`. */
export const model = {
  type: "@swamp/digitalocean/security-secret",
  version: "2026.10.30.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Security Secret resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a security secret",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const missing = ["name", "region", "values"].filter((k) =>
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
        if (args.checkExists) {
          const existing = await tryFindByField(
            "/v2/security/secrets",
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
        if (g.region !== undefined) body.region = g.region;
        if (g.values !== undefined) body.values = g.values;
        const result = await create(
          "/v2/security/secrets",
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
      description: "Get a security secret",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the security secret",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/security/secrets",
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
    update: {
      description: "Update security secret attributes",
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
        const storedId = existing.secret ?? existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no secret; run get with the resource ID first",
          );
        }
        const body: Record<string, unknown> = {};
        if (g.region !== undefined) body.region = g.region;
        if (g.version !== undefined) body.version = g.version;
        if (g.values !== undefined) body.values = g.values;
        const unset = ["region", "values", "version"].filter((k) =>
          body[k] === undefined
        );
        if (unset.length > 0) {
          const live = await read(
            "/v2/security/secrets",
            storedId,
            undefined,
            g.token,
          );
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const missingForUpdate = ["region", "values"].filter((k) =>
          body[k] === undefined
        );
        if (missingForUpdate.length > 0) {
          throw new Error(
            "update requires global arguments: " + missingForUpdate.join(", "),
          );
        }
        const result = await update(
          "/v2/security/secrets",
          storedId,
          body,
          "PUT",
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
      description: "Delete the security secret",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the security secret",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/security/secrets",
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
          secret: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync security secret state from DigitalOcean",
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
        const storedId = existing.secret ?? existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no secret; run get with the resource ID first",
          );
        }
        const result = await tryRead(
          "/v2/security/secrets",
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
          secret: storedId,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
