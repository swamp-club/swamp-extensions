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

// Auto-generated extension model for @swamp/cloudflare/containers/applications
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Applications.
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
  configuration: z.object({
    authorized_keys: z.array(z.object({
      name: z.string().optional(),
      public_key: z.string(),
    })).optional(),
    command: z.array(z.string()).optional(),
    disk: z.object({
      size: z.string().optional(),
      size_mb: z.number().int().optional(),
    }).optional(),
    dns: z.object({
      searches: z.array(z.string()).optional(),
      servers: z.array(z.string()).optional(),
    }).optional(),
    entrypoint: z.array(z.string()).optional(),
    environment_variables: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })).optional(),
    experimental_flags: z.array(z.string()).optional(),
    image: z.string(),
    instance_type: z.enum([
      "lite",
      "basic",
      "standard-1",
      "standard-2",
      "standard-3",
      "standard-4",
    ]).optional(),
    labels: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })).optional(),
    lifecycle: z.object({
      max_termination_duration: z.string().optional(),
    }).optional(),
    memory: z.string().optional(),
    memory_mib: z.number().int().optional(),
    metadata_service: z.object({
      enabled: z.boolean(),
    }).optional(),
    observability: z.object({
      logs: z.object({
        enabled: z.boolean().optional(),
      }).optional(),
    }).optional(),
    secrets: z.array(z.object({
      name: z.string(),
      secret: z.string(),
      type: z.enum(["env"]),
    })).optional(),
    ssh_public_key_ids: z.array(z.string()).optional(),
    trusted_user_ca_keys: z.array(z.object({
      name: z.string().optional(),
      public_key: z.string(),
    })).optional(),
    vcpu: z.number().optional(),
    wrangler_ssh: z.object({
      enabled: z.boolean().optional(),
      port: z.number().optional(),
    }).optional(),
  }).describe(
    "Properties required to create a cloudchamber deployment specified by the user",
  ),
  constraints: z.object({
    jurisdiction: z.string().optional(),
    regions: z.array(z.string()).optional(),
  }).optional(),
  instances: z.number().int().describe("Number of deployments to create"),
  max_instances: z.number().int().describe(
    "Maximum number of instances that the application will allow. This is relevant for applications that auto-scale.",
  ).optional(),
  name: z.string().describe("The name for this application"),
  observability: z.object({
    logs: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    target_instance_count: z.number().int().min(1).optional(),
    target_instance_percentage: z.number().int().min(1).max(99).optional(),
  }).describe("Settings for application observability such as logging.")
    .optional(),
  rollout_active_grace_period: z.number().int().min(0).max(604800).describe(
    "Grace period for active instances to stay alive before becoming eligible for shutdown signal due to a rollout, in seconds.\nDefaults to 0.\n",
  ).optional(),
  scheduling_policy: z.enum(["default"]).describe(
    "The scheduling policy to use for an application",
  ),
  durable_objects: z.object({
    namespace_id: z.string(),
  }).describe("Durable object configuration using a namespace ID").optional(),
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
  account_id: z.string().optional(),
  active_rollout_id: z.string().optional(),
  configuration: z.object({
    authorized_keys: z.array(z.object({
      name: z.string().optional(),
      public_key: z.string().optional(),
    })).optional(),
    command: z.array(z.string()).optional(),
    disk: z.object({
      size: z.string().optional(),
      size_mb: z.number().optional(),
    }).optional(),
    dns: z.object({
      searches: z.array(z.string()).optional(),
      servers: z.array(z.string()).optional(),
    }).optional(),
    entrypoint: z.array(z.string()).optional(),
    environment_variables: z.array(z.object({
      name: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
    experimental_flags: z.array(z.string()).optional(),
    image: z.string().optional(),
    instance_type: z.string().optional(),
    labels: z.array(z.object({
      name: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
    lifecycle: z.object({
      max_termination_duration: z.string().optional(),
    }).optional(),
    memory: z.string().optional(),
    memory_mib: z.number().optional(),
    metadata_service: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    observability: z.object({
      logs: z.object({
        enabled: z.boolean().optional(),
      }).optional(),
    }).optional(),
    secrets: z.array(z.object({
      name: z.string().optional(),
      secret: z.string().optional(),
      type: z.string().optional(),
    })).optional(),
    ssh_public_key_ids: z.array(z.string()).optional(),
    trusted_user_ca_keys: z.array(z.object({
      name: z.string().optional(),
      public_key: z.string().optional(),
    })).optional(),
    vcpu: z.number().optional(),
    wrangler_ssh: z.object({
      enabled: z.boolean().optional(),
      port: z.number().optional(),
    }).optional(),
  }).optional(),
  constraints: z.object({
    jurisdiction: z.string().optional(),
    regions: z.array(z.string()).optional(),
  }).optional(),
  created_at: z.string().optional(),
  durable_objects: z.object({
    namespace_id: z.string().optional(),
  }).optional(),
  health: z.object({
    errors: z.array(z.object({
      event: z.object({
        details: z.record(z.string(), z.unknown()).optional(),
        id: z.string().optional(),
        message: z.string().optional(),
        name: z.string().optional(),
        statusChange: z.record(z.string(), z.unknown()).optional(),
        time: z.string().optional(),
        type: z.string().optional(),
      }).optional(),
      instance_id: z.string().optional(),
    })).optional(),
    instances: z.object({
      active: z.number().optional(),
      assigned: z.number().optional(),
    }).optional(),
    summary: z.string().optional(),
  }).optional(),
  id: z.string(),
  instances: z.number().optional(),
  max_instances: z.number().optional(),
  name: z.string().optional(),
  observability: z.object({
    logs: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    target_instance_count: z.number().optional(),
    target_instance_percentage: z.number().optional(),
  }).optional(),
  rollout_active_grace_period: z.number().optional(),
  scheduling_policy: z.string().optional(),
  updated_at: z.string().optional(),
  version: z.number().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  configuration: z.object({
    authorized_keys: z.array(z.object({
      name: z.string().optional(),
      public_key: z.string(),
    })).optional(),
    command: z.array(z.string()).optional(),
    disk: z.object({
      size: z.string().optional(),
      size_mb: z.number().int().optional(),
    }).optional(),
    dns: z.object({
      searches: z.array(z.string()).optional(),
      servers: z.array(z.string()).optional(),
    }).optional(),
    entrypoint: z.array(z.string()).optional(),
    environment_variables: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })).optional(),
    experimental_flags: z.array(z.string()).optional(),
    image: z.string(),
    instance_type: z.enum([
      "lite",
      "basic",
      "standard-1",
      "standard-2",
      "standard-3",
      "standard-4",
    ]).optional(),
    labels: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })).optional(),
    lifecycle: z.object({
      max_termination_duration: z.string().optional(),
    }).optional(),
    memory: z.string().optional(),
    memory_mib: z.number().int().optional(),
    metadata_service: z.object({
      enabled: z.boolean(),
    }).optional(),
    observability: z.object({
      logs: z.object({
        enabled: z.boolean().optional(),
      }).optional(),
    }).optional(),
    secrets: z.array(z.object({
      name: z.string(),
      secret: z.string(),
      type: z.enum(["env"]),
    })).optional(),
    ssh_public_key_ids: z.array(z.string()).optional(),
    trusted_user_ca_keys: z.array(z.object({
      name: z.string().optional(),
      public_key: z.string(),
    })).optional(),
    vcpu: z.number().optional(),
    wrangler_ssh: z.object({
      enabled: z.boolean().optional(),
      port: z.number().optional(),
    }).optional(),
  }).optional(),
  constraints: z.object({
    jurisdiction: z.string().optional(),
    regions: z.array(z.string()).optional(),
  }).optional(),
  instances: z.number().int().optional(),
  max_instances: z.number().int().optional(),
  name: z.string().optional(),
  observability: z.object({
    logs: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    target_instance_count: z.number().int().min(1).optional(),
    target_instance_percentage: z.number().int().min(1).max(99).optional(),
  }).optional(),
  rollout_active_grace_period: z.number().int().min(0).max(604800).optional(),
  scheduling_policy: z.enum(["default"]).optional(),
  durable_objects: z.object({
    namespace_id: z.string(),
  }).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Applications. Registered at `@swamp/cloudflare/containers/applications`. */
export const model = {
  type: "@swamp/cloudflare/containers/applications",
  version: "2026.06.08.2",
  upgrades: [
    {
      toVersion: "2026.06.08.1",
      description: "Removed: affinities, priorities, jobs",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          affinities: _affinities,
          priorities: _priorities,
          jobs: _jobs,
          ...rest
        } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.06.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Applications resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Applications",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/containers/applications";
        const body: Record<string, unknown> = {};
        if (g.configuration !== undefined) body.configuration = g.configuration;
        if (g.constraints !== undefined) body.constraints = g.constraints;
        if (g.durable_objects !== undefined) {
          body.durable_objects = g.durable_objects;
        }
        if (g.instances !== undefined) body.instances = g.instances;
        if (g.max_instances !== undefined) body.max_instances = g.max_instances;
        if (g.name !== undefined) body.name = g.name;
        if (g.observability !== undefined) body.observability = g.observability;
        if (g.rollout_active_grace_period !== undefined) {
          body.rollout_active_grace_period = g.rollout_active_grace_period;
        }
        if (g.scheduling_policy !== undefined) {
          body.scheduling_policy = g.scheduling_policy;
        }
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
      description: "Get a Applications",
      arguments: z.object({
        id: z.string().describe("The ID of the Applications"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/containers/applications";
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
    update: {
      description: "Update Applications attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/containers/applications";
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
        if (g.configuration !== undefined) body.configuration = g.configuration;
        if (g.constraints !== undefined) body.constraints = g.constraints;
        if (g.instances !== undefined) body.instances = g.instances;
        if (g.max_instances !== undefined) body.max_instances = g.max_instances;
        if (g.name !== undefined) body.name = g.name;
        if (g.observability !== undefined) body.observability = g.observability;
        if (g.rollout_active_grace_period !== undefined) {
          body.rollout_active_grace_period = g.rollout_active_grace_period;
        }
        if (g.scheduling_policy !== undefined) {
          body.scheduling_policy = g.scheduling_policy;
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
      description: "Delete the Applications",
      arguments: z.object({
        id: z.string().describe("The ID of the Applications"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/containers/applications";
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
      description: "Sync Applications state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id +
          "/containers/applications";
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
