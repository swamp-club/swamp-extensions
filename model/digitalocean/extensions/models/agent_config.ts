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

// Auto-generated extension model for @swamp/digitalocean/agent-config
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean agent config.
 *
 * Wraps the `/v2/agents/configs` API as a swamp model so create, get, update,
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
  name: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9]([A-Za-z0-9._-]{0,62}[A-Za-z0-9])?$"),
  ).describe(
    "Config name, case-insensitively unique among the team's active configs.",
  ),
  manifest_yaml: z.string().max(524288).describe(
    "Customer environment-spec YAML text. The HTTP JSON body is capped at 1 MiB and this field is capped at 512 KiB.",
  ).optional(),
  insights: z.object({
    metrics: z.boolean().optional(),
    logs: z.boolean().optional(),
    traces: z.boolean().optional(),
  }).describe(
    "Per-signal DigitalOcean Insights telemetry opt-in, mirroring the Insights-owned schema insights.telemetry.opt_in. Each signal is independently optional and tri-state: omitted or null records that the customer expressed no choice and falls back to the product default, which is NOT equivalent to false.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  agentspec_schema_version: z.string().optional(),
  manifest: z.object({
    apiVersion: z.string().optional(),
    kind: z.string().optional(),
    metadata: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      labels: z.record(z.string(), z.unknown()).optional(),
    }).optional(),
    spec: z.object({
      permissions: z.object({
        defaultAction: z.string().optional(),
        rules: z.array(z.object({
          tool: z.string().optional(),
          match: z.record(z.string(), z.unknown()).optional(),
          action: z.string().optional(),
          enforcement: z.string().optional(),
        })).optional(),
        filesystem: z.object({
          mode: z.string().optional(),
          allowWrite: z.array(z.string()).optional(),
        }).optional(),
        network: z.object({
          default: z.string().optional(),
          allow: z.array(z.string()).optional(),
        }).optional(),
      }).optional(),
      mode: z.string().optional(),
      runtime: z.object({
        adapter: z.string().optional(),
        custom: z.object({
          image: z.string().optional(),
          entrypoint: z.array(z.string()).optional(),
        }).optional(),
        config: z.record(z.string(), z.unknown()).optional(),
      }).optional(),
      workspace: z.object({
        repos: z.array(z.string()).optional(),
      }).optional(),
      sandbox: z.object({
        template: z.string().optional(),
        persistentWorkspace: z.boolean().optional(),
        idleTimeoutSeconds: z.number().optional(),
        maxLifetimeSeconds: z.number().optional(),
        sizeSlug: z.string().optional(),
        mounts: z.array(z.object({
          type: z.string().optional(),
          path: z.string().optional(),
          bucket: z.string().optional(),
          endpoint: z.string().optional(),
          readOnly: z.boolean().optional(),
          accessKeyRef: z.string().optional(),
          secretKeyRef: z.string().optional(),
        })).optional(),
        egress: z.object({
          allow: z.array(z.object({
            host: z.string().optional(),
          })).optional(),
          allowIps: z.array(z.string()).optional(),
          vpcUuid: z.string().optional(),
          subnetUuid: z.string().optional(),
          unrestricted: z.boolean().optional(),
        }).optional(),
      }).optional(),
      model: z.object({
        default: z.string().optional(),
        routing: z.string().optional(),
        profile: z.string().optional(),
      }).optional(),
      tools: z.object({
        mcpServers: z.array(z.object({
          ref: z.string().optional(),
          name: z.string().optional(),
          url: z.string().optional(),
          tools: z.array(z.string()).optional(),
          preloadTools: z.array(z.string()).optional(),
          auth: z.object({
            header: z.string().optional(),
            secretRef: z.string().optional(),
          }).optional(),
        })).optional(),
        bundle: z.string().optional(),
      }).optional(),
      skills: z.array(z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        instructions: z.string().optional(),
        license: z.string().optional(),
        metadata: z.record(z.string(), z.unknown()).optional(),
        allowedTools: z.array(z.string()).optional(),
      })).optional(),
      env: z.record(z.string(), z.unknown()).optional(),
      memory: z.object({
        backend: z.string().optional(),
        scope: z.string().optional(),
      }).optional(),
      secrets: z.array(z.object({
        name: z.string().optional(),
        source: z.string().optional(),
        provider: z.string().optional(),
        ref: z.string().optional(),
        value: z.string().optional(),
        env: z.boolean().optional(),
      })).optional(),
      defaults: z.object({
        budget: z.object({
          maxCostUSD: z.number().optional(),
          maxSteps: z.number().optional(),
          maxWallClockSeconds: z.number().optional(),
          onBreach: z.string().optional(),
        }).optional(),
      }).optional(),
      serving: z.object({
        minReplicas: z.number().optional(),
        maxReplicas: z.number().optional(),
        targetConcurrency: z.number().optional(),
        scaleToZero: z.object({
          idleSeconds: z.number().optional(),
        }).optional(),
      }).optional(),
    }).optional(),
  }).optional(),
  content_hash: z.string().optional(),
  insights: z.object({
    metrics: z.boolean().optional(),
    logs: z.boolean().optional(),
    traces: z.boolean().optional(),
  }).optional(),
  created_by: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  credentials: z.array(z.object({
    name: z.string().optional(),
    source: z.string().optional(),
    provider: z.string().optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().min(1).max(64).regex(
    new RegExp("^[A-Za-z0-9]([A-Za-z0-9._-]{0,62}[A-Za-z0-9])?$"),
  ).optional(),
  manifest_yaml: z.string().max(524288).optional(),
  insights: z.object({
    metrics: z.boolean().optional(),
    logs: z.boolean().optional(),
    traces: z.boolean().optional(),
  }).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean agent config. Registered at `@swamp/digitalocean/agent-config`. */
export const model = {
  type: "@swamp/digitalocean/agent-config",
  version: "2026.10.13.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Agent Config resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a agent config",
      arguments: z.object({
        checkExists: z.boolean().describe(
          "If true, check whether a resource with this name already exists before creating and fail if it does (default: false)",
        ).optional(),
      }),
      execute: async (args: { checkExists?: boolean }, context: any) => {
        const g = context.globalArgs;
        const missing = ["manifest_yaml", "name"].filter((k) =>
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
            "/v2/agents/configs",
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
        if (g.manifest_yaml !== undefined) body.manifest_yaml = g.manifest_yaml;
        if (g.insights !== undefined) body.insights = g.insights;
        const result = await create(
          "/v2/agents/configs",
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
      description: "Get a agent config",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the agent config",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/agents/configs",
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
      description: "Delete the agent config",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the agent config",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/agents/configs",
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
      description: "Sync agent config state from DigitalOcean",
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
          "/v2/agents/configs",
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
