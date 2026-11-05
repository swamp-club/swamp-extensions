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

// Auto-generated extension model for @swamp/digitalocean/insight-dashboard
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean insight dashboard.
 *
 * Wraps the `/v2/insights/dashboards` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  spec: z.string().min(1).describe(
    "The dashboard definition as a JSON document serialized to a string. The document must have `kind` set to `Dashboard` and a `spec.display.name` between 1 and 255 characters. An empty value or a value that is not valid JSON is rejected with `400`. Retrieve the full JSON Schema from `GET /v2/insights/dashboards/schema`.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  uuid: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  spec: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  spec: z.string().min(1).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean insight dashboard. Registered at `@swamp/digitalocean/insight-dashboard`. */
export const model = {
  type: "@swamp/digitalocean/insight-dashboard",
  version: "2026.11.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Insight Dashboard resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a insight dashboard",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["spec"].filter((k) => g[k] === undefined);
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
        if (g.spec !== undefined) body.spec = g.spec;
        const result = await create(
          "/v2/insights/dashboards",
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
      description: "Get a insight dashboard",
      arguments: z.object({
        uuid: z.string().describe("The UUID of the insight dashboard"),
      }),
      execute: async (args: { uuid: string }, context: any) => {
        const result = await read(
          "/v2/insights/dashboards",
          args.uuid,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.uuid.toString()).replace(
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
      description: "Update insight dashboard attributes",
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
        const storedId = existing.uuid ?? existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no uuid; run get with the resource ID first",
          );
        }
        const body: Record<string, unknown> = {};
        if (g.spec !== undefined) body.spec = g.spec;
        const unset = ["spec"].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(
            "/v2/insights/dashboards",
            storedId,
            undefined,
            g.token,
          );
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const missingForUpdate = ["spec"].filter((k) => body[k] === undefined);
        if (missingForUpdate.length > 0) {
          throw new Error(
            "update requires global arguments: " + missingForUpdate.join(", "),
          );
        }
        const result = await update(
          "/v2/insights/dashboards",
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
      description: "Delete the insight dashboard",
      arguments: z.object({
        uuid: z.string().describe("The UUID of the insight dashboard"),
      }),
      execute: async (args: { uuid: string }, context: any) => {
        const { existed } = await remove(
          "/v2/insights/dashboards",
          args.uuid,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.uuid.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          uuid: args.uuid,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync insight dashboard state from DigitalOcean",
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
        const storedId = existing.uuid ?? existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no uuid; run get with the resource ID first",
          );
        }
        const result = await tryRead(
          "/v2/insights/dashboards",
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
          uuid: storedId,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
