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

// Auto-generated extension model for @swamp/digitalocean/action-gateway-endpoint
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean action gateway endpoint.
 *
 * Wraps the `/v2/action-gateway/endpoints` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createEnveloped,
  read,
  remove,
  tryFindByField,
  tryRead,
  update,
} from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z0-9._-]{1,64}$"))
    .describe("Endpoint name, unique within your team."),
  insights: z.object({
    metrics: z.boolean().optional(),
    logs: z.boolean().optional(),
    traces: z.boolean().optional(),
  }).describe(
    "The endpoint's Insights consent. It applies to every version of the endpoint, including pinned and older versions. For each signal independently, the latest explicit true enables and false disables. Omission preserves the existing value through updates, head replacement, and new-version creation; none of these operations implicitly resets a choice, and a stored choice cannot be cleared. Metrics defaults are unchanged.",
  ).optional(),
  version: z.object({
    actor_id: z.string().regex(new RegExp("^([A-Za-z0-9._-]{1,64})?$"))
      .optional(),
    policy: z.object({
      defaultAction: z.enum([
        "allow",
        "ask",
        "deny",
        "SESSION_POLICY_ACTION_UNSPECIFIED",
      ]).optional(),
      rules: z.array(z.object({
        tool: z.string(),
        match: z.record(z.string(), z.unknown()).optional(),
        action: z.enum(["allow", "ask", "deny"]),
      })).optional(),
    }).optional(),
    tools: z.array(z.string()).optional(),
    config: z.object({
      preloadTools: z.array(z.string()).optional(),
      outputViews: z.record(z.string(), z.unknown()).optional(),
      customInstructions: z.string().max(1000).optional(),
      cache: z.object({
        tools: z.array(z.string()).optional(),
        allEligible: z.boolean().optional(),
        maxAgeSeconds: z.number().int().min(1).max(300).optional(),
      }).optional(),
    }).optional(),
    network: z.object({
      vpcUuid: z.string().optional(),
    }).optional(),
    insights: z.object({
      metrics: z.boolean().optional(),
      logs: z.boolean().optional(),
      traces: z.boolean().optional(),
    }).optional(),
  }).describe(
    "Immutable version configuration. The endpoint owner and actor cannot change between versions. Omitted or empty actor_id means no actor binding.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  actor_id: z.string().optional(),
  is_default: z.boolean().optional(),
  head_version: z.object({
    id: z.string().optional(),
    endpoint_id: z.string().optional(),
    version_number: z.number().optional(),
    promoted_from_version_number: z.number().optional(),
    name: z.string().optional(),
    actor_id: z.string().optional(),
    policy: z.object({
      defaultAction: z.string().optional(),
      rules: z.array(z.object({
        tool: z.string().optional(),
        match: z.record(z.string(), z.unknown()).optional(),
        action: z.string().optional(),
      })).optional(),
    }).optional(),
    tools: z.object({
      references: z.array(z.object({
        kind: z.string().optional(),
        name: z.string().optional(),
        version: z.string().optional(),
      })).optional(),
    }).optional(),
    config: z.object({
      preloadTools: z.array(z.string()).optional(),
      outputViews: z.record(z.string(), z.unknown()).optional(),
      customInstructions: z.string().optional(),
      cache: z.object({
        tools: z.array(z.string()).optional(),
        allEligible: z.boolean().optional(),
        maxAgeSeconds: z.number().optional(),
      }).optional(),
    }).optional(),
    network: z.object({
      vpcUuid: z.string().optional(),
      region: z.string().optional(),
    }).optional(),
    insights: z.object({
      metrics: z.boolean().optional(),
      logs: z.boolean().optional(),
      traces: z.boolean().optional(),
    }).optional(),
    mcp_url: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  }).nullable().optional(),
  insights: z.object({
    metrics: z.boolean().optional(),
    logs: z.boolean().optional(),
    traces: z.boolean().optional(),
  }).nullable().optional(),
  mcp_url: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  version: z.object({
    id: z.string().optional(),
    endpoint_id: z.string().optional(),
    version_number: z.number().optional(),
    promoted_from_version_number: z.number().optional(),
    name: z.string().optional(),
    actor_id: z.string().optional(),
    policy: z.object({
      defaultAction: z.string().optional(),
      rules: z.array(z.object({
        tool: z.string().optional(),
        match: z.record(z.string(), z.unknown()).optional(),
        action: z.string().optional(),
      })).optional(),
    }).optional(),
    tools: z.object({
      references: z.array(z.object({
        kind: z.string().optional(),
        name: z.string().optional(),
        version: z.string().optional(),
      })).optional(),
    }).optional(),
    config: z.object({
      preloadTools: z.array(z.string()).optional(),
      outputViews: z.record(z.string(), z.unknown()).optional(),
      customInstructions: z.string().optional(),
      cache: z.object({
        tools: z.array(z.string()).optional(),
        allEligible: z.boolean().optional(),
        maxAgeSeconds: z.number().optional(),
      }).optional(),
    }).optional(),
    network: z.object({
      vpcUuid: z.string().optional(),
      region: z.string().optional(),
    }).optional(),
    insights: z.object({
      metrics: z.boolean().optional(),
      logs: z.boolean().optional(),
      traces: z.boolean().optional(),
    }).optional(),
    mcp_url: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  }).optional(),
  version_mcp_url: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().min(1).max(64).regex(new RegExp("^[A-Za-z0-9._-]{1,64}$"))
    .optional(),
  insights: z.object({
    metrics: z.boolean().optional(),
    logs: z.boolean().optional(),
    traces: z.boolean().optional(),
  }).optional(),
  version: z.object({
    actor_id: z.string().regex(new RegExp("^([A-Za-z0-9._-]{1,64})?$"))
      .optional(),
    policy: z.object({
      defaultAction: z.enum([
        "allow",
        "ask",
        "deny",
        "SESSION_POLICY_ACTION_UNSPECIFIED",
      ]).optional(),
      rules: z.array(z.object({
        tool: z.string(),
        match: z.record(z.string(), z.unknown()).optional(),
        action: z.enum(["allow", "ask", "deny"]),
      })).optional(),
    }).optional(),
    tools: z.array(z.string()).optional(),
    config: z.object({
      preloadTools: z.array(z.string()).optional(),
      outputViews: z.record(z.string(), z.unknown()).optional(),
      customInstructions: z.string().max(1000).optional(),
      cache: z.object({
        tools: z.array(z.string()).optional(),
        allEligible: z.boolean().optional(),
        maxAgeSeconds: z.number().int().min(1).max(300).optional(),
      }).optional(),
    }).optional(),
    network: z.object({
      vpcUuid: z.string().optional(),
    }).optional(),
    insights: z.object({
      metrics: z.boolean().optional(),
      logs: z.boolean().optional(),
      traces: z.boolean().optional(),
    }).optional(),
  }).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean action gateway endpoint. Registered at `@swamp/digitalocean/action-gateway-endpoint`. */
export const model = {
  type: "@swamp/digitalocean/action-gateway-endpoint",
  version: "2026.11.06.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Action Gateway Endpoint resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a action gateway endpoint",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const missing = ["name", "version"].filter((k) => g[k] === undefined);
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
            "/v2/action-gateway/endpoints",
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
        if (g.version !== undefined) body.version = g.version;
        if (g.insights !== undefined) body.insights = g.insights;
        const result = await createEnveloped(
          "/v2/action-gateway/endpoints",
          body,
          "endpoint",
          ["version", "version_mcp_url"],
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
      description: "Get a action gateway endpoint",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway endpoint",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/action-gateway/endpoints",
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
      description: "Update action gateway endpoint attributes",
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
        if (g.name !== undefined) body.name = g.name;
        if (g.insights !== undefined) body.insights = g.insights;
        const result = await update(
          "/v2/action-gateway/endpoints",
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
      description: "Delete the action gateway endpoint",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the action gateway endpoint",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/action-gateway/endpoints",
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
      description: "Sync action gateway endpoint state from DigitalOcean",
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
          "/v2/action-gateway/endpoints",
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
