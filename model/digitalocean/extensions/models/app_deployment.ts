// Auto-generated extension model for @swamp/digitalocean/app-deployment
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean app deployment.
 *
 * Wraps the `/v2/apps/{app_id}/deployments` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, tryRead } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  app_id: z.string().describe("Parent resource identifier"),
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  force_build: z.boolean().optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  cause: z.string().optional(),
  cloned_from: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string(),
  jobs: z.array(z.object({
    name: z.string().optional(),
    source_commit_hash: z.string().optional(),
  })).optional(),
  functions: z.array(z.object({
    name: z.string().optional(),
    source_commit_hash: z.string().optional(),
    namespace: z.string().optional(),
  })).optional(),
  phase: z.string().optional(),
  phase_last_updated_at: z.string().optional(),
  progress: z.object({
    error_steps: z.number().optional(),
    pending_steps: z.number().optional(),
    running_steps: z.number().optional(),
    steps: z.array(z.object({
      component_name: z.string().optional(),
      ended_at: z.string().optional(),
      message_base: z.string().optional(),
      name: z.string().optional(),
      reason: z.object({
        code: z.string().optional(),
        message: z.string().optional(),
      }).optional(),
      started_at: z.string().optional(),
      status: z.string().optional(),
      steps: z.array(z.record(z.string(), z.unknown())).optional(),
    })).optional(),
    success_steps: z.number().optional(),
    summary_steps: z.array(z.object({
      component_name: z.string().optional(),
      ended_at: z.string().optional(),
      message_base: z.string().optional(),
      name: z.string().optional(),
      reason: z.object({
        code: z.string().optional(),
        message: z.string().optional(),
      }).optional(),
      started_at: z.string().optional(),
      status: z.string().optional(),
      steps: z.array(z.record(z.string(), z.unknown())).optional(),
    })).optional(),
    total_steps: z.number().optional(),
  }).optional(),
  services: z.array(z.object({
    name: z.string().optional(),
    source_commit_hash: z.string().optional(),
  })).optional(),
  spec: z.object({
    name: z.string().optional(),
    region: z.string().optional(),
    disable_edge_cache: z.boolean().optional(),
    disable_email_obfuscation: z.boolean().optional(),
    enhanced_threat_control_enabled: z.boolean().optional(),
    domains: z.array(z.object({
      domain: z.string().optional(),
      type: z.string().optional(),
      wildcard: z.boolean().optional(),
      zone: z.string().optional(),
      minimum_tls_version: z.string().optional(),
    })).optional(),
    services: z.array(z.object({
      name: z.string().optional(),
      git: z.object({
        branch: z.string().optional(),
        repo_clone_url: z.string().optional(),
      }).optional(),
      github: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      gitlab: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      bitbucket: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      image: z.object({
        registry: z.string().optional(),
        registry_type: z.string().optional(),
        registry_credentials: z.string().optional(),
        repository: z.string().optional(),
        tag: z.string().optional(),
        digest: z.string().optional(),
        deploy_on_push: z.object({
          enabled: z.boolean().optional(),
        }).optional(),
      }).optional(),
      dockerfile_path: z.string().optional(),
      build_command: z.string().optional(),
      run_command: z.string().optional(),
      source_dir: z.string().optional(),
      envs: z.array(z.object({
        key: z.string().optional(),
        scope: z.string().optional(),
        type: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().optional(),
        papertrail: z.object({
          endpoint: z.string().optional(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string().optional(),
        }).optional(),
        logtail: z.object({
          token: z.string().optional(),
        }).optional(),
        open_search: z.object({
          endpoint: z.string().optional(),
          basic_auth: z.object({
            user: z.string().optional(),
            password: z.string().optional(),
          }).optional(),
          index_name: z.string().optional(),
          cluster_name: z.string().optional(),
        }).optional(),
      })).optional(),
      instance_count: z.number().optional(),
      instance_size_slug: z.string().optional(),
      autoscaling: z.object({
        min_instance_count: z.number().optional(),
        max_instance_count: z.number().optional(),
        metrics: z.object({
          requests_per_second: z.object({
            per_instance: z.number().optional(),
          }).optional(),
          request_duration: z.object({
            p95_milliseconds: z.number().optional(),
          }).optional(),
        }).optional(),
      }).optional(),
      cors: z.object({
        allow_origins: z.array(z.object({
          exact: z.string().optional(),
          prefix: z.string().optional(),
          regex: z.string().optional(),
        })).optional(),
        allow_methods: z.array(z.string()).optional(),
        allow_headers: z.array(z.string()).optional(),
        expose_headers: z.array(z.string()).optional(),
        max_age: z.string().optional(),
        allow_credentials: z.boolean().optional(),
      }).optional(),
      health_check: z.object({
        failure_threshold: z.number().optional(),
        port: z.number().optional(),
        http_path: z.string().optional(),
        initial_delay_seconds: z.number().optional(),
        period_seconds: z.number().optional(),
        success_threshold: z.number().optional(),
        timeout_seconds: z.number().optional(),
      }).optional(),
      liveness_health_check: z.object({
        failure_threshold: z.number().optional(),
        port: z.number().optional(),
        http_path: z.string().optional(),
        initial_delay_seconds: z.number().optional(),
        period_seconds: z.number().optional(),
        success_threshold: z.number().optional(),
        timeout_seconds: z.number().optional(),
      }).optional(),
      protocol: z.string().optional(),
      http_port: z.number().optional(),
      internal_ports: z.array(z.number()).optional(),
      routes: z.array(z.object({
        path: z.string().optional(),
        preserve_path_prefix: z.boolean().optional(),
      })).optional(),
      termination: z.object({
        drain_seconds: z.number().optional(),
        grace_period_seconds: z.number().optional(),
      }).optional(),
    })).optional(),
    static_sites: z.array(z.object({
      name: z.string().optional(),
      git: z.object({
        branch: z.string().optional(),
        repo_clone_url: z.string().optional(),
      }).optional(),
      github: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      gitlab: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      bitbucket: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      image: z.object({
        registry: z.string().optional(),
        registry_type: z.string().optional(),
        registry_credentials: z.string().optional(),
        repository: z.string().optional(),
        tag: z.string().optional(),
        digest: z.string().optional(),
        deploy_on_push: z.object({
          enabled: z.boolean().optional(),
        }).optional(),
      }).optional(),
      dockerfile_path: z.string().optional(),
      build_command: z.string().optional(),
      run_command: z.string().optional(),
      source_dir: z.string().optional(),
      envs: z.array(z.object({
        key: z.string().optional(),
        scope: z.string().optional(),
        type: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().optional(),
        papertrail: z.object({
          endpoint: z.string().optional(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string().optional(),
        }).optional(),
        logtail: z.object({
          token: z.string().optional(),
        }).optional(),
        open_search: z.object({
          endpoint: z.string().optional(),
          basic_auth: z.object({
            user: z.string().optional(),
            password: z.string().optional(),
          }).optional(),
          index_name: z.string().optional(),
          cluster_name: z.string().optional(),
        }).optional(),
      })).optional(),
      index_document: z.string().optional(),
      error_document: z.string().optional(),
      catchall_document: z.string().optional(),
      output_dir: z.string().optional(),
      cors: z.object({
        allow_origins: z.array(z.object({
          exact: z.string().optional(),
          prefix: z.string().optional(),
          regex: z.string().optional(),
        })).optional(),
        allow_methods: z.array(z.string()).optional(),
        allow_headers: z.array(z.string()).optional(),
        expose_headers: z.array(z.string()).optional(),
        max_age: z.string().optional(),
        allow_credentials: z.boolean().optional(),
      }).optional(),
      routes: z.array(z.object({
        path: z.string().optional(),
        preserve_path_prefix: z.boolean().optional(),
      })).optional(),
    })).optional(),
    jobs: z.array(z.object({
      name: z.string().optional(),
      git: z.object({
        branch: z.string().optional(),
        repo_clone_url: z.string().optional(),
      }).optional(),
      github: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      gitlab: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      bitbucket: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      image: z.object({
        registry: z.string().optional(),
        registry_type: z.string().optional(),
        registry_credentials: z.string().optional(),
        repository: z.string().optional(),
        tag: z.string().optional(),
        digest: z.string().optional(),
        deploy_on_push: z.object({
          enabled: z.boolean().optional(),
        }).optional(),
      }).optional(),
      dockerfile_path: z.string().optional(),
      build_command: z.string().optional(),
      run_command: z.string().optional(),
      source_dir: z.string().optional(),
      envs: z.array(z.object({
        key: z.string().optional(),
        scope: z.string().optional(),
        type: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().optional(),
        papertrail: z.object({
          endpoint: z.string().optional(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string().optional(),
        }).optional(),
        logtail: z.object({
          token: z.string().optional(),
        }).optional(),
        open_search: z.object({
          endpoint: z.string().optional(),
          basic_auth: z.object({
            user: z.string().optional(),
            password: z.string().optional(),
          }).optional(),
          index_name: z.string().optional(),
          cluster_name: z.string().optional(),
        }).optional(),
      })).optional(),
      instance_count: z.number().optional(),
      instance_size_slug: z.string().optional(),
      kind: z.string().optional(),
      termination: z.object({
        grace_period_seconds: z.number().optional(),
      }).optional(),
    })).optional(),
    workers: z.array(z.object({
      name: z.string().optional(),
      git: z.object({
        branch: z.string().optional(),
        repo_clone_url: z.string().optional(),
      }).optional(),
      github: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      gitlab: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      bitbucket: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      image: z.object({
        registry: z.string().optional(),
        registry_type: z.string().optional(),
        registry_credentials: z.string().optional(),
        repository: z.string().optional(),
        tag: z.string().optional(),
        digest: z.string().optional(),
        deploy_on_push: z.object({
          enabled: z.boolean().optional(),
        }).optional(),
      }).optional(),
      dockerfile_path: z.string().optional(),
      build_command: z.string().optional(),
      run_command: z.string().optional(),
      source_dir: z.string().optional(),
      envs: z.array(z.object({
        key: z.string().optional(),
        scope: z.string().optional(),
        type: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().optional(),
        papertrail: z.object({
          endpoint: z.string().optional(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string().optional(),
        }).optional(),
        logtail: z.object({
          token: z.string().optional(),
        }).optional(),
        open_search: z.object({
          endpoint: z.string().optional(),
          basic_auth: z.object({
            user: z.string().optional(),
            password: z.string().optional(),
          }).optional(),
          index_name: z.string().optional(),
          cluster_name: z.string().optional(),
        }).optional(),
      })).optional(),
      instance_count: z.number().optional(),
      instance_size_slug: z.string().optional(),
      autoscaling: z.object({
        min_instance_count: z.number().optional(),
        max_instance_count: z.number().optional(),
        metrics: z.object({
          cpu: z.object({
            percent: z.number().optional(),
          }).optional(),
        }).optional(),
      }).optional(),
      termination: z.object({
        grace_period_seconds: z.number().optional(),
      }).optional(),
      liveness_health_check: z.object({
        failure_threshold: z.number().optional(),
        port: z.number().optional(),
        http_path: z.string().optional(),
        initial_delay_seconds: z.number().optional(),
        period_seconds: z.number().optional(),
        success_threshold: z.number().optional(),
        timeout_seconds: z.number().optional(),
      }).optional(),
    })).optional(),
    functions: z.array(z.object({
      cors: z.object({
        allow_origins: z.array(z.object({
          exact: z.string().optional(),
          prefix: z.string().optional(),
          regex: z.string().optional(),
        })).optional(),
        allow_methods: z.array(z.string()).optional(),
        allow_headers: z.array(z.string()).optional(),
        expose_headers: z.array(z.string()).optional(),
        max_age: z.string().optional(),
        allow_credentials: z.boolean().optional(),
      }).optional(),
      routes: z.array(z.object({
        path: z.string().optional(),
        preserve_path_prefix: z.boolean().optional(),
      })).optional(),
      name: z.string().optional(),
      source_dir: z.string().optional(),
      alerts: z.array(z.object({
        rule: z.string().optional(),
        disabled: z.boolean().optional(),
        operator: z.string().optional(),
        value: z.number().optional(),
        window: z.string().optional(),
      })).optional(),
      envs: z.array(z.object({
        key: z.string().optional(),
        scope: z.string().optional(),
        type: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      git: z.object({
        branch: z.string().optional(),
        repo_clone_url: z.string().optional(),
      }).optional(),
      github: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      gitlab: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      bitbucket: z.object({
        branch: z.string().optional(),
        deploy_on_push: z.boolean().optional(),
        repo: z.string().optional(),
      }).optional(),
      log_destinations: z.array(z.object({
        name: z.string().optional(),
        papertrail: z.object({
          endpoint: z.string().optional(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string().optional(),
        }).optional(),
        logtail: z.object({
          token: z.string().optional(),
        }).optional(),
        open_search: z.object({
          endpoint: z.string().optional(),
          basic_auth: z.object({
            user: z.string().optional(),
            password: z.string().optional(),
          }).optional(),
          index_name: z.string().optional(),
          cluster_name: z.string().optional(),
        }).optional(),
      })).optional(),
    })).optional(),
    databases: z.array(z.object({
      cluster_name: z.string().optional(),
      db_name: z.string().optional(),
      db_user: z.string().optional(),
      engine: z.string().optional(),
      name: z.string().optional(),
      production: z.boolean().optional(),
      version: z.string().optional(),
    })).optional(),
    ingress: z.object({
      rules: z.array(z.object({
        match: z.object({
          path: z.object({
            prefix: z.string().optional(),
          }).optional(),
          authority: z.object({
            exact: z.string().optional(),
          }).optional(),
        }).optional(),
        cors: z.object({
          allow_origins: z.array(z.object({
            exact: z.string().optional(),
            prefix: z.string().optional(),
            regex: z.string().optional(),
          })).optional(),
          allow_methods: z.array(z.string()).optional(),
          allow_headers: z.array(z.string()).optional(),
          expose_headers: z.array(z.string()).optional(),
          max_age: z.string().optional(),
          allow_credentials: z.boolean().optional(),
        }).optional(),
        component: z.object({
          name: z.string().optional(),
          preserve_path_prefix: z.string().optional(),
          rewrite: z.string().optional(),
        }).optional(),
        redirect: z.object({
          uri: z.string().optional(),
          authority: z.string().optional(),
          port: z.number().optional(),
          scheme: z.string().optional(),
          redirect_code: z.number().optional(),
        }).optional(),
      })).optional(),
      custom_error_page_url: z.string().optional(),
    }).optional(),
    egress: z.object({
      type: z.string().optional(),
    }).optional(),
    maintenance: z.object({
      enabled: z.boolean().optional(),
      archive: z.boolean().optional(),
      offline_page_url: z.string().optional(),
    }).optional(),
    vpc: z.object({
      id: z.string().optional(),
      egress_ips: z.array(z.object({
        ip: z.string().optional(),
      })).optional(),
    }).optional(),
  }).optional(),
  static_sites: z.array(z.object({
    name: z.string().optional(),
    source_commit_hash: z.string().optional(),
  })).optional(),
  tier_slug: z.string().optional(),
  updated_at: z.string().optional(),
  workers: z.array(z.object({
    name: z.string().optional(),
    source_commit_hash: z.string().optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  app_id: z.string().optional(),
  name: z.string().optional(),
  force_build: z.boolean().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean app deployment. Registered at `@swamp/digitalocean/app-deployment`. */
export const model = {
  type: "@swamp/digitalocean/app-deployment",
  version: "2026.05.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: token",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "App Deployment resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a app deployment",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/apps/${g.app_id}/deployments`;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.force_build !== undefined) body.force_build = g.force_build;
        const result = await create(
          endpoint,
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
      description: "Get a app deployment",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the app deployment",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/apps/${g.app_id}/deployments`;
        const result = await read(
          endpoint,
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
    sync: {
      description: "Sync app deployment state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = `/v2/apps/${g.app_id}/deployments`;
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
          endpoint,
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
