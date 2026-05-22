// Auto-generated extension model for @swamp/digitalocean/app-platform
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean app platform.
 *
 * Wraps the `/v2/apps` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  spec: z.object({
    name: z.string().min(2).max(32).regex(
      new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
    ),
    region: z.enum([
      "atl",
      "nyc",
      "sfo",
      "tor",
      "ams",
      "fra",
      "lon",
      "blr",
      "sgp",
      "syd",
    ]).optional(),
    disable_edge_cache: z.boolean().optional(),
    disable_email_obfuscation: z.boolean().optional(),
    enhanced_threat_control_enabled: z.boolean().optional(),
    domains: z.array(z.object({
      domain: z.string().min(4).max(253).regex(
        new RegExp(
          "^((xn--)?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\\.)+[a-zA-Z]{2,}\\.?$",
        ),
      ),
      type: z.enum(["UNSPECIFIED", "DEFAULT", "PRIMARY", "ALIAS"]).optional(),
      wildcard: z.boolean().optional(),
      zone: z.string().optional(),
      minimum_tls_version: z.enum(["1.2", "1.3"]).optional(),
    })).optional(),
    services: z.array(z.object({
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
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
        registry_type: z.enum(["DOCKER_HUB", "DOCR", "GHCR"]).optional(),
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
        key: z.string().regex(new RegExp("^[_A-Za-z][_A-Za-z0-9]*$")),
        scope: z.enum(["UNSET", "RUN_TIME", "BUILD_TIME", "RUN_AND_BUILD_TIME"])
          .optional(),
        type: z.enum(["GENERAL", "SECRET"]).optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().min(2).max(42).regex(
          new RegExp(
            "^[A-Za-z0-9()\\[\\]'\"][-A-Za-z0-9_. \\/()\\[\\]]{0,40}[A-Za-z0-9()\\[\\]'\"]$",
          ),
        ),
        papertrail: z.object({
          endpoint: z.string(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string(),
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
      instance_count: z.number().int().min(1).optional(),
      instance_size_slug: z.string().optional(),
      autoscaling: z.object({
        min_instance_count: z.number().int().min(1).optional(),
        max_instance_count: z.number().int().min(1).max(250).optional(),
        metrics: z.object({
          requests_per_second: z.object({
            per_instance: z.number().int().min(1).optional(),
          }).optional(),
          request_duration: z.object({
            p95_milliseconds: z.number().int().min(1).optional(),
          }).optional(),
        }).optional(),
      }).optional(),
      cors: z.object({
        allow_origins: z.array(z.object({
          exact: z.string().max(256).optional(),
          prefix: z.string().max(256).optional(),
          regex: z.string().min(1).max(256).optional(),
        })).optional(),
        allow_methods: z.array(z.string()).optional(),
        allow_headers: z.array(z.string()).optional(),
        expose_headers: z.array(z.string()).optional(),
        max_age: z.string().optional(),
        allow_credentials: z.boolean().optional(),
      }).optional(),
      health_check: z.object({
        failure_threshold: z.number().int().optional(),
        port: z.number().int().min(1).max(65535).optional(),
        http_path: z.string().optional(),
        initial_delay_seconds: z.number().int().optional(),
        period_seconds: z.number().int().optional(),
        success_threshold: z.number().int().optional(),
        timeout_seconds: z.number().int().optional(),
      }).optional(),
      liveness_health_check: z.object({
        failure_threshold: z.number().int().min(1).max(50).optional(),
        port: z.number().int().min(1).max(65535).optional(),
        http_path: z.string().optional(),
        initial_delay_seconds: z.number().int().min(0).max(3600).optional(),
        period_seconds: z.number().int().min(1).max(300).optional(),
        success_threshold: z.number().int().min(1).max(1).optional(),
        timeout_seconds: z.number().int().min(1).max(120).optional(),
      }).optional(),
      protocol: z.enum(["HTTP", "HTTP2"]).optional(),
      http_port: z.number().int().min(1).max(65535).optional(),
      internal_ports: z.array(z.number().int()).optional(),
      routes: z.array(z.object({
        path: z.string().optional(),
        preserve_path_prefix: z.boolean().optional(),
      })).optional(),
      termination: z.object({
        drain_seconds: z.number().int().min(1).max(110).optional(),
        grace_period_seconds: z.number().int().min(1).max(600).optional(),
      }).optional(),
    })).optional(),
    static_sites: z.array(z.object({
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
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
        registry_type: z.enum(["DOCKER_HUB", "DOCR", "GHCR"]).optional(),
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
        key: z.string().regex(new RegExp("^[_A-Za-z][_A-Za-z0-9]*$")),
        scope: z.enum(["UNSET", "RUN_TIME", "BUILD_TIME", "RUN_AND_BUILD_TIME"])
          .optional(),
        type: z.enum(["GENERAL", "SECRET"]).optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().min(2).max(42).regex(
          new RegExp(
            "^[A-Za-z0-9()\\[\\]'\"][-A-Za-z0-9_. \\/()\\[\\]]{0,40}[A-Za-z0-9()\\[\\]'\"]$",
          ),
        ),
        papertrail: z.object({
          endpoint: z.string(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string(),
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
          exact: z.string().max(256).optional(),
          prefix: z.string().max(256).optional(),
          regex: z.string().min(1).max(256).optional(),
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
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
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
        registry_type: z.enum(["DOCKER_HUB", "DOCR", "GHCR"]).optional(),
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
        key: z.string().regex(new RegExp("^[_A-Za-z][_A-Za-z0-9]*$")),
        scope: z.enum(["UNSET", "RUN_TIME", "BUILD_TIME", "RUN_AND_BUILD_TIME"])
          .optional(),
        type: z.enum(["GENERAL", "SECRET"]).optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().min(2).max(42).regex(
          new RegExp(
            "^[A-Za-z0-9()\\[\\]'\"][-A-Za-z0-9_. \\/()\\[\\]]{0,40}[A-Za-z0-9()\\[\\]'\"]$",
          ),
        ),
        papertrail: z.object({
          endpoint: z.string(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string(),
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
      instance_count: z.number().int().min(1).optional(),
      instance_size_slug: z.string().optional(),
      kind: z.enum([
        "UNSPECIFIED",
        "PRE_DEPLOY",
        "POST_DEPLOY",
        "FAILED_DEPLOY",
      ]).optional(),
      termination: z.object({
        grace_period_seconds: z.number().int().min(1).max(600).optional(),
      }).optional(),
    })).optional(),
    workers: z.array(z.object({
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
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
        registry_type: z.enum(["DOCKER_HUB", "DOCR", "GHCR"]).optional(),
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
        key: z.string().regex(new RegExp("^[_A-Za-z][_A-Za-z0-9]*$")),
        scope: z.enum(["UNSET", "RUN_TIME", "BUILD_TIME", "RUN_AND_BUILD_TIME"])
          .optional(),
        type: z.enum(["GENERAL", "SECRET"]).optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().min(2).max(42).regex(
          new RegExp(
            "^[A-Za-z0-9()\\[\\]'\"][-A-Za-z0-9_. \\/()\\[\\]]{0,40}[A-Za-z0-9()\\[\\]'\"]$",
          ),
        ),
        papertrail: z.object({
          endpoint: z.string(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string(),
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
      instance_count: z.number().int().min(1).optional(),
      instance_size_slug: z.string().optional(),
      autoscaling: z.object({
        min_instance_count: z.number().int().min(1).optional(),
        max_instance_count: z.number().int().min(1).max(250).optional(),
        metrics: z.object({
          cpu: z.object({
            percent: z.number().int().min(1).max(100).optional(),
          }).optional(),
        }).optional(),
      }).optional(),
      termination: z.object({
        grace_period_seconds: z.number().int().min(1).max(600).optional(),
      }).optional(),
      liveness_health_check: z.object({
        failure_threshold: z.number().int().min(1).max(50).optional(),
        port: z.number().int().min(1).max(65535).optional(),
        http_path: z.string().optional(),
        initial_delay_seconds: z.number().int().min(0).max(3600).optional(),
        period_seconds: z.number().int().min(1).max(300).optional(),
        success_threshold: z.number().int().min(1).max(1).optional(),
        timeout_seconds: z.number().int().min(1).max(120).optional(),
      }).optional(),
    })).optional(),
    functions: z.array(z.object({
      cors: z.object({
        allow_origins: z.array(z.object({
          exact: z.string().max(256).optional(),
          prefix: z.string().max(256).optional(),
          regex: z.string().min(1).max(256).optional(),
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
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
      source_dir: z.string().optional(),
      alerts: z.array(z.object({
        rule: z.enum([
          "UNSPECIFIED_RULE",
          "CPU_UTILIZATION",
          "MEM_UTILIZATION",
          "RESTART_COUNT",
          "DEPLOYMENT_FAILED",
          "DEPLOYMENT_LIVE",
          "DOMAIN_FAILED",
          "DOMAIN_LIVE",
          "AUTOSCALE_FAILED",
          "AUTOSCALE_SUCCEEDED",
          "FUNCTIONS_ACTIVATION_COUNT",
          "FUNCTIONS_AVERAGE_DURATION_MS",
          "FUNCTIONS_ERROR_RATE_PER_MINUTE",
          "FUNCTIONS_AVERAGE_WAIT_TIME_MS",
          "FUNCTIONS_ERROR_COUNT",
          "FUNCTIONS_GB_RATE_PER_SECOND",
          "REQUESTS_PER_SECOND",
          "REQUEST_DURATION_P95_MS",
        ]).optional(),
        disabled: z.boolean().optional(),
        operator: z.enum(["UNSPECIFIED_OPERATOR", "GREATER_THAN", "LESS_THAN"])
          .optional(),
        value: z.number().optional(),
        window: z.enum([
          "UNSPECIFIED_WINDOW",
          "FIVE_MINUTES",
          "TEN_MINUTES",
          "THIRTY_MINUTES",
          "ONE_HOUR",
        ]).optional(),
      })).optional(),
      envs: z.array(z.object({
        key: z.string().regex(new RegExp("^[_A-Za-z][_A-Za-z0-9]*$")),
        scope: z.enum(["UNSET", "RUN_TIME", "BUILD_TIME", "RUN_AND_BUILD_TIME"])
          .optional(),
        type: z.enum(["GENERAL", "SECRET"]).optional(),
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
        name: z.string().min(2).max(42).regex(
          new RegExp(
            "^[A-Za-z0-9()\\[\\]'\"][-A-Za-z0-9_. \\/()\\[\\]]{0,40}[A-Za-z0-9()\\[\\]'\"]$",
          ),
        ),
        papertrail: z.object({
          endpoint: z.string(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string(),
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
      engine: z.enum([
        "UNSET",
        "MYSQL",
        "PG",
        "REDIS",
        "MONGODB",
        "KAFKA",
        "OPENSEARCH",
        "VALKEY",
      ]).optional(),
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
      production: z.boolean().optional(),
      version: z.string().optional(),
    })).optional(),
    ingress: z.object({
      rules: z.array(z.object({
        match: z.object({
          path: z.object({
            prefix: z.string().max(256),
          }).optional(),
          authority: z.object({
            exact: z.string().max(256),
          }).optional(),
        }).optional(),
        cors: z.object({
          allow_origins: z.array(z.object({
            exact: z.string().max(256).optional(),
            prefix: z.string().max(256).optional(),
            regex: z.string().min(1).max(256).optional(),
          })).optional(),
          allow_methods: z.array(z.string()).optional(),
          allow_headers: z.array(z.string()).optional(),
          expose_headers: z.array(z.string()).optional(),
          max_age: z.string().optional(),
          allow_credentials: z.boolean().optional(),
        }).optional(),
        component: z.object({
          name: z.string(),
          preserve_path_prefix: z.string().optional(),
          rewrite: z.string().optional(),
        }).optional(),
        redirect: z.object({
          uri: z.string().optional(),
          authority: z.string().optional(),
          port: z.number().int().optional(),
          scheme: z.string().optional(),
          redirect_code: z.number().int().optional(),
        }).optional(),
      })).optional(),
      custom_error_page_url: z.string().regex(new RegExp("^https://"))
        .optional(),
    }).optional(),
    egress: z.object({
      type: z.enum(["AUTOASSIGN", "DEDICATED_IP"]).optional(),
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
  }).describe("The desired configuration of an application."),
  update_all_source_versions: z.boolean().describe(
    "Whether or not to update the source versions (for example fetching a new commit or image digest) of all components. By default (when this is false) only newly added sources will be updated to avoid changes like updating the scale of a component from also updating the respective code.",
  ).optional(),
  project_id: z.string().describe(
    "The ID of the project the app should be assigned to. If omitted, it will be assigned to your default project.\n<br><br>Requires `project:update` scope.\n",
  ).optional(),
});

const ResourceSchema = z.object({
  active_deployment: z.object({
    cause: z.string().optional(),
    cloned_from: z.string().optional(),
    created_at: z.string().optional(),
    id: z.string().optional(),
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
  }).optional(),
  created_at: z.string().optional(),
  default_ingress: z.string().optional(),
  domains: z.array(z.object({
    id: z.string().optional(),
    phase: z.string().optional(),
    progress: z.object({
      steps: z.array(z.record(z.string(), z.unknown())).optional(),
    }).optional(),
    spec: z.object({
      domain: z.string().optional(),
      type: z.string().optional(),
      wildcard: z.boolean().optional(),
      zone: z.string().optional(),
      minimum_tls_version: z.string().optional(),
    }).optional(),
    validations: z.array(z.string()).optional(),
    rotate_validation_records: z.boolean().optional(),
    certificate_expires_at: z.string().optional(),
  })).optional(),
  id: z.string(),
  in_progress_deployment: z.object({
    cause: z.string().optional(),
    cloned_from: z.string().optional(),
    created_at: z.string().optional(),
    id: z.string().optional(),
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
  }).optional(),
  last_deployment_created_at: z.string().optional(),
  live_domain: z.string().optional(),
  live_url: z.string().optional(),
  live_url_base: z.string().optional(),
  owner_uuid: z.string().optional(),
  pending_deployment: z.object({
    cause: z.string().optional(),
    cloned_from: z.string().optional(),
    created_at: z.string().optional(),
    id: z.string().optional(),
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
  }).optional(),
  project_id: z.string().optional(),
  region: z.object({
    continent: z.string().optional(),
    data_centers: z.array(z.string()).optional(),
    default: z.boolean().optional(),
    disabled: z.boolean().optional(),
    flag: z.string().optional(),
    label: z.string().optional(),
    reason: z.string().optional(),
    slug: z.string().optional(),
  }).optional(),
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
  tier_slug: z.string().optional(),
  updated_at: z.string().optional(),
  pinned_deployment: z.object({
    cause: z.string().optional(),
    cloned_from: z.string().optional(),
    created_at: z.string().optional(),
    id: z.string().optional(),
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
  }).optional(),
  dedicated_ips: z.array(z.object({
    ip: z.string().optional(),
    id: z.string().optional(),
    status: z.string().optional(),
  })).optional(),
  vpc: z.object({
    id: z.string().optional(),
    egress_ips: z.array(z.object({
      ip: z.string().optional(),
    })).optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  spec: z.object({
    name: z.string().min(2).max(32).regex(
      new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
    ),
    region: z.enum([
      "atl",
      "nyc",
      "sfo",
      "tor",
      "ams",
      "fra",
      "lon",
      "blr",
      "sgp",
      "syd",
    ]).optional(),
    disable_edge_cache: z.boolean().optional(),
    disable_email_obfuscation: z.boolean().optional(),
    enhanced_threat_control_enabled: z.boolean().optional(),
    domains: z.array(z.object({
      domain: z.string().min(4).max(253).regex(
        new RegExp(
          "^((xn--)?[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\\.)+[a-zA-Z]{2,}\\.?$",
        ),
      ),
      type: z.enum(["UNSPECIFIED", "DEFAULT", "PRIMARY", "ALIAS"]).optional(),
      wildcard: z.boolean().optional(),
      zone: z.string().optional(),
      minimum_tls_version: z.enum(["1.2", "1.3"]).optional(),
    })).optional(),
    services: z.array(z.object({
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
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
        registry_type: z.enum(["DOCKER_HUB", "DOCR", "GHCR"]).optional(),
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
        key: z.string().regex(new RegExp("^[_A-Za-z][_A-Za-z0-9]*$")),
        scope: z.enum(["UNSET", "RUN_TIME", "BUILD_TIME", "RUN_AND_BUILD_TIME"])
          .optional(),
        type: z.enum(["GENERAL", "SECRET"]).optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().min(2).max(42).regex(
          new RegExp(
            "^[A-Za-z0-9()\\[\\]'\"][-A-Za-z0-9_. \\/()\\[\\]]{0,40}[A-Za-z0-9()\\[\\]'\"]$",
          ),
        ),
        papertrail: z.object({
          endpoint: z.string(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string(),
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
      instance_count: z.number().int().min(1).optional(),
      instance_size_slug: z.string().optional(),
      autoscaling: z.object({
        min_instance_count: z.number().int().min(1).optional(),
        max_instance_count: z.number().int().min(1).max(250).optional(),
        metrics: z.object({
          requests_per_second: z.object({
            per_instance: z.number().int().min(1).optional(),
          }).optional(),
          request_duration: z.object({
            p95_milliseconds: z.number().int().min(1).optional(),
          }).optional(),
        }).optional(),
      }).optional(),
      cors: z.object({
        allow_origins: z.array(z.object({
          exact: z.string().max(256).optional(),
          prefix: z.string().max(256).optional(),
          regex: z.string().min(1).max(256).optional(),
        })).optional(),
        allow_methods: z.array(z.string()).optional(),
        allow_headers: z.array(z.string()).optional(),
        expose_headers: z.array(z.string()).optional(),
        max_age: z.string().optional(),
        allow_credentials: z.boolean().optional(),
      }).optional(),
      health_check: z.object({
        failure_threshold: z.number().int().optional(),
        port: z.number().int().min(1).max(65535).optional(),
        http_path: z.string().optional(),
        initial_delay_seconds: z.number().int().optional(),
        period_seconds: z.number().int().optional(),
        success_threshold: z.number().int().optional(),
        timeout_seconds: z.number().int().optional(),
      }).optional(),
      liveness_health_check: z.object({
        failure_threshold: z.number().int().min(1).max(50).optional(),
        port: z.number().int().min(1).max(65535).optional(),
        http_path: z.string().optional(),
        initial_delay_seconds: z.number().int().min(0).max(3600).optional(),
        period_seconds: z.number().int().min(1).max(300).optional(),
        success_threshold: z.number().int().min(1).max(1).optional(),
        timeout_seconds: z.number().int().min(1).max(120).optional(),
      }).optional(),
      protocol: z.enum(["HTTP", "HTTP2"]).optional(),
      http_port: z.number().int().min(1).max(65535).optional(),
      internal_ports: z.array(z.number().int()).optional(),
      routes: z.array(z.object({
        path: z.string().optional(),
        preserve_path_prefix: z.boolean().optional(),
      })).optional(),
      termination: z.object({
        drain_seconds: z.number().int().min(1).max(110).optional(),
        grace_period_seconds: z.number().int().min(1).max(600).optional(),
      }).optional(),
    })).optional(),
    static_sites: z.array(z.object({
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
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
        registry_type: z.enum(["DOCKER_HUB", "DOCR", "GHCR"]).optional(),
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
        key: z.string().regex(new RegExp("^[_A-Za-z][_A-Za-z0-9]*$")),
        scope: z.enum(["UNSET", "RUN_TIME", "BUILD_TIME", "RUN_AND_BUILD_TIME"])
          .optional(),
        type: z.enum(["GENERAL", "SECRET"]).optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().min(2).max(42).regex(
          new RegExp(
            "^[A-Za-z0-9()\\[\\]'\"][-A-Za-z0-9_. \\/()\\[\\]]{0,40}[A-Za-z0-9()\\[\\]'\"]$",
          ),
        ),
        papertrail: z.object({
          endpoint: z.string(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string(),
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
          exact: z.string().max(256).optional(),
          prefix: z.string().max(256).optional(),
          regex: z.string().min(1).max(256).optional(),
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
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
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
        registry_type: z.enum(["DOCKER_HUB", "DOCR", "GHCR"]).optional(),
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
        key: z.string().regex(new RegExp("^[_A-Za-z][_A-Za-z0-9]*$")),
        scope: z.enum(["UNSET", "RUN_TIME", "BUILD_TIME", "RUN_AND_BUILD_TIME"])
          .optional(),
        type: z.enum(["GENERAL", "SECRET"]).optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().min(2).max(42).regex(
          new RegExp(
            "^[A-Za-z0-9()\\[\\]'\"][-A-Za-z0-9_. \\/()\\[\\]]{0,40}[A-Za-z0-9()\\[\\]'\"]$",
          ),
        ),
        papertrail: z.object({
          endpoint: z.string(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string(),
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
      instance_count: z.number().int().min(1).optional(),
      instance_size_slug: z.string().optional(),
      kind: z.enum([
        "UNSPECIFIED",
        "PRE_DEPLOY",
        "POST_DEPLOY",
        "FAILED_DEPLOY",
      ]).optional(),
      termination: z.object({
        grace_period_seconds: z.number().int().min(1).max(600).optional(),
      }).optional(),
    })).optional(),
    workers: z.array(z.object({
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
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
        registry_type: z.enum(["DOCKER_HUB", "DOCR", "GHCR"]).optional(),
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
        key: z.string().regex(new RegExp("^[_A-Za-z][_A-Za-z0-9]*$")),
        scope: z.enum(["UNSET", "RUN_TIME", "BUILD_TIME", "RUN_AND_BUILD_TIME"])
          .optional(),
        type: z.enum(["GENERAL", "SECRET"]).optional(),
        value: z.string().optional(),
      })).optional(),
      environment_slug: z.string().optional(),
      log_destinations: z.array(z.object({
        name: z.string().min(2).max(42).regex(
          new RegExp(
            "^[A-Za-z0-9()\\[\\]'\"][-A-Za-z0-9_. \\/()\\[\\]]{0,40}[A-Za-z0-9()\\[\\]'\"]$",
          ),
        ),
        papertrail: z.object({
          endpoint: z.string(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string(),
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
      instance_count: z.number().int().min(1).optional(),
      instance_size_slug: z.string().optional(),
      autoscaling: z.object({
        min_instance_count: z.number().int().min(1).optional(),
        max_instance_count: z.number().int().min(1).max(250).optional(),
        metrics: z.object({
          cpu: z.object({
            percent: z.number().int().min(1).max(100).optional(),
          }).optional(),
        }).optional(),
      }).optional(),
      termination: z.object({
        grace_period_seconds: z.number().int().min(1).max(600).optional(),
      }).optional(),
      liveness_health_check: z.object({
        failure_threshold: z.number().int().min(1).max(50).optional(),
        port: z.number().int().min(1).max(65535).optional(),
        http_path: z.string().optional(),
        initial_delay_seconds: z.number().int().min(0).max(3600).optional(),
        period_seconds: z.number().int().min(1).max(300).optional(),
        success_threshold: z.number().int().min(1).max(1).optional(),
        timeout_seconds: z.number().int().min(1).max(120).optional(),
      }).optional(),
    })).optional(),
    functions: z.array(z.object({
      cors: z.object({
        allow_origins: z.array(z.object({
          exact: z.string().max(256).optional(),
          prefix: z.string().max(256).optional(),
          regex: z.string().min(1).max(256).optional(),
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
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
      source_dir: z.string().optional(),
      alerts: z.array(z.object({
        rule: z.enum([
          "UNSPECIFIED_RULE",
          "CPU_UTILIZATION",
          "MEM_UTILIZATION",
          "RESTART_COUNT",
          "DEPLOYMENT_FAILED",
          "DEPLOYMENT_LIVE",
          "DOMAIN_FAILED",
          "DOMAIN_LIVE",
          "AUTOSCALE_FAILED",
          "AUTOSCALE_SUCCEEDED",
          "FUNCTIONS_ACTIVATION_COUNT",
          "FUNCTIONS_AVERAGE_DURATION_MS",
          "FUNCTIONS_ERROR_RATE_PER_MINUTE",
          "FUNCTIONS_AVERAGE_WAIT_TIME_MS",
          "FUNCTIONS_ERROR_COUNT",
          "FUNCTIONS_GB_RATE_PER_SECOND",
          "REQUESTS_PER_SECOND",
          "REQUEST_DURATION_P95_MS",
        ]).optional(),
        disabled: z.boolean().optional(),
        operator: z.enum(["UNSPECIFIED_OPERATOR", "GREATER_THAN", "LESS_THAN"])
          .optional(),
        value: z.number().optional(),
        window: z.enum([
          "UNSPECIFIED_WINDOW",
          "FIVE_MINUTES",
          "TEN_MINUTES",
          "THIRTY_MINUTES",
          "ONE_HOUR",
        ]).optional(),
      })).optional(),
      envs: z.array(z.object({
        key: z.string().regex(new RegExp("^[_A-Za-z][_A-Za-z0-9]*$")),
        scope: z.enum(["UNSET", "RUN_TIME", "BUILD_TIME", "RUN_AND_BUILD_TIME"])
          .optional(),
        type: z.enum(["GENERAL", "SECRET"]).optional(),
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
        name: z.string().min(2).max(42).regex(
          new RegExp(
            "^[A-Za-z0-9()\\[\\]'\"][-A-Za-z0-9_. \\/()\\[\\]]{0,40}[A-Za-z0-9()\\[\\]'\"]$",
          ),
        ),
        papertrail: z.object({
          endpoint: z.string(),
        }).optional(),
        datadog: z.object({
          endpoint: z.string().optional(),
          api_key: z.string(),
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
      engine: z.enum([
        "UNSET",
        "MYSQL",
        "PG",
        "REDIS",
        "MONGODB",
        "KAFKA",
        "OPENSEARCH",
        "VALKEY",
      ]).optional(),
      name: z.string().min(2).max(32).regex(
        new RegExp("^[a-z][a-z0-9-]{0,30}[a-z0-9]$"),
      ),
      production: z.boolean().optional(),
      version: z.string().optional(),
    })).optional(),
    ingress: z.object({
      rules: z.array(z.object({
        match: z.object({
          path: z.object({
            prefix: z.string().max(256),
          }).optional(),
          authority: z.object({
            exact: z.string().max(256),
          }).optional(),
        }).optional(),
        cors: z.object({
          allow_origins: z.array(z.object({
            exact: z.string().max(256).optional(),
            prefix: z.string().max(256).optional(),
            regex: z.string().min(1).max(256).optional(),
          })).optional(),
          allow_methods: z.array(z.string()).optional(),
          allow_headers: z.array(z.string()).optional(),
          expose_headers: z.array(z.string()).optional(),
          max_age: z.string().optional(),
          allow_credentials: z.boolean().optional(),
        }).optional(),
        component: z.object({
          name: z.string(),
          preserve_path_prefix: z.string().optional(),
          rewrite: z.string().optional(),
        }).optional(),
        redirect: z.object({
          uri: z.string().optional(),
          authority: z.string().optional(),
          port: z.number().int().optional(),
          scheme: z.string().optional(),
          redirect_code: z.number().int().optional(),
        }).optional(),
      })).optional(),
      custom_error_page_url: z.string().regex(new RegExp("^https://"))
        .optional(),
    }).optional(),
    egress: z.object({
      type: z.enum(["AUTOASSIGN", "DEDICATED_IP"]).optional(),
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
  update_all_source_versions: z.boolean().optional(),
  project_id: z.string().optional(),
});

/** Swamp extension model for DigitalOcean app platform. Registered at `@swamp/digitalocean/app-platform`. */
export const model = {
  type: "@swamp/digitalocean/app-platform",
  version: "2026.05.22.1",
  upgrades: [
    {
      toVersion: "2026.03.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.05.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "App Platform resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a app platform",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.spec !== undefined) body.spec = g.spec;
        if (g.project_id !== undefined) body.project_id = g.project_id;
        const result = await create("/v2/apps", body) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a app platform",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the app platform",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read("/v2/apps", args.id) as ResourceData;
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
      description: "Update app platform attributes",
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
        const body: Record<string, unknown> = {};
        if (g.spec !== undefined) body.spec = g.spec;
        if (g.update_all_source_versions !== undefined) {
          body.update_all_source_versions = g.update_all_source_versions;
        }
        const result = await update(
          "/v2/apps",
          existing.id ?? existing.id,
          body,
          "PUT",
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
      description: "Delete the app platform",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the app platform",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove("/v2/apps", args.id);
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
      description: "Sync app platform state from DigitalOcean",
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
        const result = await tryRead("/v2/apps", existing.id ?? existing.id) as
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
          id: existing.id ?? existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
