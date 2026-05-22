// Auto-generated extension model for @swamp/cloudflare/pages/projects
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Projects.
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
  build_config: z.object({
    build_caching: z.boolean().optional(),
    build_command: z.string().optional(),
    destination_dir: z.string().optional(),
    root_dir: z.string().optional(),
    web_analytics_tag: z.string().optional(),
    web_analytics_token: z.string().optional(),
  }).describe("Configs for the project build process.").optional(),
  deployment_configs: z.object({
    preview: z.object({
      ai_bindings: z.record(z.string(), z.unknown()).optional(),
      always_use_latest_compatibility_date: z.boolean().optional(),
      analytics_engine_datasets: z.record(z.string(), z.unknown()).optional(),
      browsers: z.record(z.string(), z.unknown()).optional(),
      build_image_major_version: z.number().int().optional(),
      compatibility_date: z.string().optional(),
      compatibility_flags: z.array(z.string()).optional(),
      d1_databases: z.record(z.string(), z.unknown()).optional(),
      durable_object_namespaces: z.record(z.string(), z.unknown()).optional(),
      env_vars: z.record(z.string(), z.unknown()).optional(),
      fail_open: z.boolean().optional(),
      hyperdrive_bindings: z.record(z.string(), z.unknown()).optional(),
      kv_namespaces: z.record(z.string(), z.unknown()).optional(),
      limits: z.object({
        cpu_ms: z.number().int(),
      }).optional(),
      mtls_certificates: z.record(z.string(), z.unknown()).optional(),
      placement: z.object({
        mode: z.string(),
      }).optional(),
      queue_producers: z.record(z.string(), z.unknown()).optional(),
      r2_buckets: z.record(z.string(), z.unknown()).optional(),
      services: z.record(z.string(), z.unknown()).optional(),
      usage_model: z.enum(["standard", "bundled", "unbound"]).optional(),
      vectorize_bindings: z.record(z.string(), z.unknown()).optional(),
      wrangler_config_hash: z.string().optional(),
    }).optional(),
    production: z.object({
      ai_bindings: z.record(z.string(), z.unknown()).optional(),
      always_use_latest_compatibility_date: z.boolean().optional(),
      analytics_engine_datasets: z.record(z.string(), z.unknown()).optional(),
      browsers: z.record(z.string(), z.unknown()).optional(),
      build_image_major_version: z.number().int().optional(),
      compatibility_date: z.string().optional(),
      compatibility_flags: z.array(z.string()).optional(),
      d1_databases: z.record(z.string(), z.unknown()).optional(),
      durable_object_namespaces: z.record(z.string(), z.unknown()).optional(),
      env_vars: z.record(z.string(), z.unknown()).optional(),
      fail_open: z.boolean().optional(),
      hyperdrive_bindings: z.record(z.string(), z.unknown()).optional(),
      kv_namespaces: z.record(z.string(), z.unknown()).optional(),
      limits: z.object({
        cpu_ms: z.number().int(),
      }).optional(),
      mtls_certificates: z.record(z.string(), z.unknown()).optional(),
      placement: z.object({
        mode: z.string(),
      }).optional(),
      queue_producers: z.record(z.string(), z.unknown()).optional(),
      r2_buckets: z.record(z.string(), z.unknown()).optional(),
      services: z.record(z.string(), z.unknown()).optional(),
      usage_model: z.enum(["standard", "bundled", "unbound"]).optional(),
      vectorize_bindings: z.record(z.string(), z.unknown()).optional(),
      wrangler_config_hash: z.string().optional(),
    }).optional(),
  }).describe("Configs for deployments in a project.").optional(),
  name: z.string().describe("Name of the project."),
  production_branch: z.string().describe(
    "Production branch of the project. Used to identify production deployments.",
  ),
  source: z.object({
    config: z.object({
      deployments_enabled: z.boolean().optional(),
      owner: z.string().optional(),
      owner_id: z.string().optional(),
      path_excludes: z.array(z.string()).optional(),
      path_includes: z.array(z.string()).optional(),
      pr_comments_enabled: z.boolean().optional(),
      preview_branch_excludes: z.array(z.string()).optional(),
      preview_branch_includes: z.array(z.string()).optional(),
      preview_deployment_setting: z.enum(["all", "none", "custom"]).optional(),
      production_branch: z.string().optional(),
      production_deployments_enabled: z.boolean().optional(),
      repo_id: z.string().optional(),
      repo_name: z.string().optional(),
    }),
    type: z.enum(["github", "gitlab"]),
  }).describe("Configs for the project source control.").optional(),
});

const ResourceSchema = z.object({
  build_config: z.object({
    build_caching: z.boolean().optional(),
    build_command: z.string().optional(),
    destination_dir: z.string().optional(),
    root_dir: z.string().optional(),
    web_analytics_tag: z.string().optional(),
    web_analytics_token: z.string().optional(),
  }).optional(),
  canonical_deployment: z.object({
    aliases: z.array(z.string()).optional(),
    build_config: z.object({
      build_caching: z.boolean().optional(),
      build_command: z.string().optional(),
      destination_dir: z.string().optional(),
      root_dir: z.string().optional(),
      web_analytics_tag: z.string().optional(),
      web_analytics_token: z.string().optional(),
    }).optional(),
    created_on: z.string().optional(),
    deployment_trigger: z.object({
      metadata: z.object({
        branch: z.string().optional(),
        commit_dirty: z.boolean().optional(),
        commit_hash: z.string().optional(),
        commit_message: z.string().optional(),
      }).optional(),
      type: z.string().optional(),
    }).optional(),
    env_vars: z.record(z.string(), z.unknown()).optional(),
    environment: z.string().optional(),
    id: z.string().optional(),
    is_skipped: z.boolean().optional(),
    latest_stage: z.object({
      ended_on: z.string().optional(),
      name: z.string().optional(),
      started_on: z.string().optional(),
      status: z.string().optional(),
    }).optional(),
    modified_on: z.string().optional(),
    project_id: z.string().optional(),
    project_name: z.string().optional(),
    short_id: z.string().optional(),
    source: z.object({
      config: z.object({
        deployments_enabled: z.boolean().optional(),
        owner: z.string().optional(),
        owner_id: z.string().optional(),
        path_excludes: z.array(z.string()).optional(),
        path_includes: z.array(z.string()).optional(),
        pr_comments_enabled: z.boolean().optional(),
        preview_branch_excludes: z.array(z.string()).optional(),
        preview_branch_includes: z.array(z.string()).optional(),
        preview_deployment_setting: z.string().optional(),
        production_branch: z.string().optional(),
        production_deployments_enabled: z.boolean().optional(),
        repo_id: z.string().optional(),
        repo_name: z.string().optional(),
      }).optional(),
      type: z.string().optional(),
    }).optional(),
    stages: z.array(z.object({
      ended_on: z.string().optional(),
      name: z.string().optional(),
      started_on: z.string().optional(),
      status: z.string().optional(),
    })).optional(),
    url: z.string().optional(),
    uses_functions: z.boolean().optional(),
  }).optional(),
  created_on: z.string().optional(),
  deployment_configs: z.object({
    preview: z.object({
      ai_bindings: z.record(z.string(), z.unknown()).optional(),
      always_use_latest_compatibility_date: z.boolean().optional(),
      analytics_engine_datasets: z.record(z.string(), z.unknown()).optional(),
      browsers: z.record(z.string(), z.unknown()).optional(),
      build_image_major_version: z.number().optional(),
      compatibility_date: z.string().optional(),
      compatibility_flags: z.array(z.string()).optional(),
      d1_databases: z.record(z.string(), z.unknown()).optional(),
      durable_object_namespaces: z.record(z.string(), z.unknown()).optional(),
      env_vars: z.record(z.string(), z.unknown()).optional(),
      fail_open: z.boolean().optional(),
      hyperdrive_bindings: z.record(z.string(), z.unknown()).optional(),
      kv_namespaces: z.record(z.string(), z.unknown()).optional(),
      limits: z.object({
        cpu_ms: z.number().optional(),
      }).optional(),
      mtls_certificates: z.record(z.string(), z.unknown()).optional(),
      placement: z.object({
        mode: z.string().optional(),
      }).optional(),
      queue_producers: z.record(z.string(), z.unknown()).optional(),
      r2_buckets: z.record(z.string(), z.unknown()).optional(),
      services: z.record(z.string(), z.unknown()).optional(),
      usage_model: z.string().optional(),
      vectorize_bindings: z.record(z.string(), z.unknown()).optional(),
      wrangler_config_hash: z.string().optional(),
    }).optional(),
    production: z.object({
      ai_bindings: z.record(z.string(), z.unknown()).optional(),
      always_use_latest_compatibility_date: z.boolean().optional(),
      analytics_engine_datasets: z.record(z.string(), z.unknown()).optional(),
      browsers: z.record(z.string(), z.unknown()).optional(),
      build_image_major_version: z.number().optional(),
      compatibility_date: z.string().optional(),
      compatibility_flags: z.array(z.string()).optional(),
      d1_databases: z.record(z.string(), z.unknown()).optional(),
      durable_object_namespaces: z.record(z.string(), z.unknown()).optional(),
      env_vars: z.record(z.string(), z.unknown()).optional(),
      fail_open: z.boolean().optional(),
      hyperdrive_bindings: z.record(z.string(), z.unknown()).optional(),
      kv_namespaces: z.record(z.string(), z.unknown()).optional(),
      limits: z.object({
        cpu_ms: z.number().optional(),
      }).optional(),
      mtls_certificates: z.record(z.string(), z.unknown()).optional(),
      placement: z.object({
        mode: z.string().optional(),
      }).optional(),
      queue_producers: z.record(z.string(), z.unknown()).optional(),
      r2_buckets: z.record(z.string(), z.unknown()).optional(),
      services: z.record(z.string(), z.unknown()).optional(),
      usage_model: z.string().optional(),
      vectorize_bindings: z.record(z.string(), z.unknown()).optional(),
      wrangler_config_hash: z.string().optional(),
    }).optional(),
  }).optional(),
  domains: z.array(z.string()).optional(),
  framework: z.string().optional(),
  framework_version: z.string().optional(),
  id: z.string(),
  latest_deployment: z.object({
    aliases: z.array(z.string()).optional(),
    build_config: z.object({
      build_caching: z.boolean().optional(),
      build_command: z.string().optional(),
      destination_dir: z.string().optional(),
      root_dir: z.string().optional(),
      web_analytics_tag: z.string().optional(),
      web_analytics_token: z.string().optional(),
    }).optional(),
    created_on: z.string().optional(),
    deployment_trigger: z.object({
      metadata: z.object({
        branch: z.string().optional(),
        commit_dirty: z.boolean().optional(),
        commit_hash: z.string().optional(),
        commit_message: z.string().optional(),
      }).optional(),
      type: z.string().optional(),
    }).optional(),
    env_vars: z.record(z.string(), z.unknown()).optional(),
    environment: z.string().optional(),
    id: z.string().optional(),
    is_skipped: z.boolean().optional(),
    latest_stage: z.object({
      ended_on: z.string().optional(),
      name: z.string().optional(),
      started_on: z.string().optional(),
      status: z.string().optional(),
    }).optional(),
    modified_on: z.string().optional(),
    project_id: z.string().optional(),
    project_name: z.string().optional(),
    short_id: z.string().optional(),
    source: z.object({
      config: z.object({
        deployments_enabled: z.boolean().optional(),
        owner: z.string().optional(),
        owner_id: z.string().optional(),
        path_excludes: z.array(z.string()).optional(),
        path_includes: z.array(z.string()).optional(),
        pr_comments_enabled: z.boolean().optional(),
        preview_branch_excludes: z.array(z.string()).optional(),
        preview_branch_includes: z.array(z.string()).optional(),
        preview_deployment_setting: z.string().optional(),
        production_branch: z.string().optional(),
        production_deployments_enabled: z.boolean().optional(),
        repo_id: z.string().optional(),
        repo_name: z.string().optional(),
      }).optional(),
      type: z.string().optional(),
    }).optional(),
    stages: z.array(z.object({
      ended_on: z.string().optional(),
      name: z.string().optional(),
      started_on: z.string().optional(),
      status: z.string().optional(),
    })).optional(),
    url: z.string().optional(),
    uses_functions: z.boolean().optional(),
  }).optional(),
  name: z.string().optional(),
  preview_script_name: z.string().optional(),
  production_branch: z.string().optional(),
  production_script_name: z.string().optional(),
  source: z.object({
    config: z.object({
      deployments_enabled: z.boolean().optional(),
      owner: z.string().optional(),
      owner_id: z.string().optional(),
      path_excludes: z.array(z.string()).optional(),
      path_includes: z.array(z.string()).optional(),
      pr_comments_enabled: z.boolean().optional(),
      preview_branch_excludes: z.array(z.string()).optional(),
      preview_branch_includes: z.array(z.string()).optional(),
      preview_deployment_setting: z.string().optional(),
      production_branch: z.string().optional(),
      production_deployments_enabled: z.boolean().optional(),
      repo_id: z.string().optional(),
      repo_name: z.string().optional(),
    }).optional(),
    type: z.string().optional(),
  }).optional(),
  subdomain: z.string().optional(),
  uses_functions: z.boolean().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  build_config: z.object({
    build_caching: z.boolean().optional(),
    build_command: z.string().optional(),
    destination_dir: z.string().optional(),
    root_dir: z.string().optional(),
    web_analytics_tag: z.string().optional(),
    web_analytics_token: z.string().optional(),
  }).optional(),
  deployment_configs: z.object({
    preview: z.object({
      ai_bindings: z.record(z.string(), z.unknown()).optional(),
      always_use_latest_compatibility_date: z.boolean().optional(),
      analytics_engine_datasets: z.record(z.string(), z.unknown()).optional(),
      browsers: z.record(z.string(), z.unknown()).optional(),
      build_image_major_version: z.number().int().optional(),
      compatibility_date: z.string().optional(),
      compatibility_flags: z.array(z.string()).optional(),
      d1_databases: z.record(z.string(), z.unknown()).optional(),
      durable_object_namespaces: z.record(z.string(), z.unknown()).optional(),
      env_vars: z.record(z.string(), z.unknown()).optional(),
      fail_open: z.boolean().optional(),
      hyperdrive_bindings: z.record(z.string(), z.unknown()).optional(),
      kv_namespaces: z.record(z.string(), z.unknown()).optional(),
      limits: z.object({
        cpu_ms: z.number().int(),
      }).optional(),
      mtls_certificates: z.record(z.string(), z.unknown()).optional(),
      placement: z.object({
        mode: z.string(),
      }).optional(),
      queue_producers: z.record(z.string(), z.unknown()).optional(),
      r2_buckets: z.record(z.string(), z.unknown()).optional(),
      services: z.record(z.string(), z.unknown()).optional(),
      usage_model: z.enum(["standard", "bundled", "unbound"]).optional(),
      vectorize_bindings: z.record(z.string(), z.unknown()).optional(),
      wrangler_config_hash: z.string().optional(),
    }).optional(),
    production: z.object({
      ai_bindings: z.record(z.string(), z.unknown()).optional(),
      always_use_latest_compatibility_date: z.boolean().optional(),
      analytics_engine_datasets: z.record(z.string(), z.unknown()).optional(),
      browsers: z.record(z.string(), z.unknown()).optional(),
      build_image_major_version: z.number().int().optional(),
      compatibility_date: z.string().optional(),
      compatibility_flags: z.array(z.string()).optional(),
      d1_databases: z.record(z.string(), z.unknown()).optional(),
      durable_object_namespaces: z.record(z.string(), z.unknown()).optional(),
      env_vars: z.record(z.string(), z.unknown()).optional(),
      fail_open: z.boolean().optional(),
      hyperdrive_bindings: z.record(z.string(), z.unknown()).optional(),
      kv_namespaces: z.record(z.string(), z.unknown()).optional(),
      limits: z.object({
        cpu_ms: z.number().int(),
      }).optional(),
      mtls_certificates: z.record(z.string(), z.unknown()).optional(),
      placement: z.object({
        mode: z.string(),
      }).optional(),
      queue_producers: z.record(z.string(), z.unknown()).optional(),
      r2_buckets: z.record(z.string(), z.unknown()).optional(),
      services: z.record(z.string(), z.unknown()).optional(),
      usage_model: z.enum(["standard", "bundled", "unbound"]).optional(),
      vectorize_bindings: z.record(z.string(), z.unknown()).optional(),
      wrangler_config_hash: z.string().optional(),
    }).optional(),
  }).optional(),
  name: z.string().optional(),
  production_branch: z.string().optional(),
  source: z.object({
    config: z.object({
      deployments_enabled: z.boolean().optional(),
      owner: z.string().optional(),
      owner_id: z.string().optional(),
      path_excludes: z.array(z.string()).optional(),
      path_includes: z.array(z.string()).optional(),
      pr_comments_enabled: z.boolean().optional(),
      preview_branch_excludes: z.array(z.string()).optional(),
      preview_branch_includes: z.array(z.string()).optional(),
      preview_deployment_setting: z.enum(["all", "none", "custom"]).optional(),
      production_branch: z.string().optional(),
      production_deployments_enabled: z.boolean().optional(),
      repo_id: z.string().optional(),
      repo_name: z.string().optional(),
    }),
    type: z.enum(["github", "gitlab"]),
  }).optional(),
});

/** Swamp extension model for Cloudflare Projects. Registered at `@swamp/cloudflare/pages/projects`. */
export const model = {
  type: "@swamp/cloudflare/pages/projects",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Projects resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Projects",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pages/projects";
        const body: Record<string, unknown> = {};
        if (g.build_config !== undefined) body.build_config = g.build_config;
        if (g.deployment_configs !== undefined) {
          body.deployment_configs = g.deployment_configs;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.production_branch !== undefined) {
          body.production_branch = g.production_branch;
        }
        if (g.source !== undefined) body.source = g.source;
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
      description: "Get a Projects",
      arguments: z.object({
        id: z.string().describe("The ID of the Projects"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pages/projects";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id).replace(
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
      description: "Update Projects attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pages/projects";
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
        if (g.build_config !== undefined) body.build_config = g.build_config;
        if (g.deployment_configs !== undefined) {
          body.deployment_configs = g.deployment_configs;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.production_branch !== undefined) {
          body.production_branch = g.production_branch;
        }
        if (g.source !== undefined) body.source = g.source;
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PATCH",
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
      description: "Delete the Projects",
      arguments: z.object({
        id: z.string().describe("The ID of the Projects"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pages/projects";
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
      description: "Sync Projects state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/pages/projects";
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
