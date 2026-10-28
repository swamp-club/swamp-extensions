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

// Auto-generated extension model for @swamp/vercel/deployments/deployments
// Do not edit manually. Re-generate with: deno task generate:vercel

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Vercel Deployments.
 *
 * Wraps the Vercel API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import { create, listAll, read, remove, tryRead } from "./_lib/vercel.ts";

const GlobalArgsSchema = z.object({
  teamId: z.string().optional().describe("Vercel team ID"),
  slug: z.string().optional().describe(
    "Vercel team slug (alternative to teamId)",
  ),
  buildMachine: z.enum(["turbo"]).describe(
    "Selects a custom build machine for this deployment without changing project settings.",
  ).optional(),
  customEnvironmentSlugOrId: z.string().describe(
    "The slug or ID of a custom environment to deploy to, overriding the default target environment. When omitted, the deployment targets the environment inferred from the branch (production or preview).",
  ).optional(),
  deploymentId: z.string().describe(
    "The ID of an existing deployment to redeploy. All project settings and environment variables are inherited from the original unless explicitly overridden in this request. The redeployment gets a new ID, URL, and build.",
  ).optional(),
  files: z.array(z.object({
    data: z.string(),
    encoding: z.enum(["base64", "utf-8"]).optional(),
    file: z.string(),
  })).describe(
    "The files to include in the deployment. Each entry is either an inlined file (with `data` and `encoding`) or a reference to a previously uploaded file (with `sha` and `size`). Required for non-git deployments. Cannot be used together with `gitSource`.",
  ).optional(),
  gitAccessToken: z.string().max(1024).meta({ sensitive: true }).describe(
    "Available only to Vercel platform accounts. A read-only GitHub access token scoped to the requested repository. Use a token with a lifetime of 24 hours or less that remains valid until source retrieval completes. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  gitMetadata: z.object({
    remoteUrl: z.string().optional(),
    commitAuthorName: z.string().optional(),
    commitAuthorEmail: z.string().optional(),
    commitMessage: z.string().optional(),
    commitRef: z.string().optional(),
    commitSha: z.string().optional(),
    dirty: z.boolean().optional(),
    ci: z.boolean().optional(),
    ciType: z.string().optional(),
    ciGitProviderUsername: z.string().optional(),
    ciGitRepoVisibility: z.string().optional(),
    rootDirectory: z.string().optional(),
  }).describe("Populates initial git metadata for different git providers.")
    .optional(),
  gitSource: z.object({
    type: z.enum(["vercel"]),
    repoId: z.string(),
    sha: z.string(),
  }).optional(),
  meta: z.record(z.string(), z.unknown()).describe(
    "An object containing the deployment's metadata. Multiple key-value pairs can be attached to a deployment. For deployments created with a Cursor Origin `gitSource`, Vercel automatically adds `cursorOriginDeployment`, `cursorOriginCommitSha`, `cursorOriginCommitRef`, `cursorOriginCommitMessage`, `cursorOriginCommitAuthorName`, `cursorOriginCommitAuthorEmail` when available, `cursorOriginOwner`, `cursorOriginRepo`, `cursorOriginRepoId`, and `cursorOriginPrId` for pull request deployments.",
  ).optional(),
  monorepoManager: z.string().describe(
    "The monorepo manager that is being used for this deployment. When `null` is used no monorepo manager is selected",
  ).optional(),
  name: z.string().describe(
    "A string with the project name used in the deployment URL",
  ).optional(),
  project: z.string().describe(
    "The target project identifier in which the deployment will be created. When defined, this parameter overrides name",
  ).optional(),
  projectSettings: z.object({
    buildCommand: z.string().max(256).optional(),
    commandForIgnoringBuildStep: z.string().max(256).optional(),
    devCommand: z.string().max(256).optional(),
    framework: z.enum([
      "services",
      "container",
      "blitzjs",
      "nextjs",
      "gatsby",
      "remix",
      "react-router",
      "astro",
      "hexo",
      "eleventy",
      "docusaurus-2",
      "docusaurus",
      "preact",
      "solidstart-1",
      "solidstart",
      "dojo",
      "ember",
      "vue",
      "scully",
      "ionic-angular",
      "angular",
      "polymer",
      "svelte",
      "sveltekit",
      "sveltekit-1",
      "ionic-react",
      "create-react-app",
      "gridsome",
      "umijs",
      "sapper",
      "saber",
      "stencil",
      "nuxtjs",
      "redwoodjs",
      "hugo",
      "jekyll",
      "brunch",
      "middleman",
      "zola",
      "hydrogen",
      "vite",
      "tanstack-start",
      "tanstack-start-lovable",
      "vitepress",
      "vuepress",
      "parcel",
      "fastapi",
      "flask",
      "fasthtml",
      "django",
      "ash",
      "factory-eve",
      "eve",
      "sanity",
      "sanity-v2",
      "storybook",
      "nitro",
      "hono",
      "express",
      "h3",
      "koa",
      "nestjs",
      "elysia",
      "fastify",
      "xmcp",
      "python",
      "ruby",
      "rust",
      "axum",
      "actix-web",
      "bun",
      "node",
      "go",
      "mastra",
    ]).optional(),
    installCommand: z.string().max(256).optional(),
    nodeVersion: z.enum([
      "26.x",
      "24.x",
      "22.x",
      "20.x",
      "18.x",
      "16.x",
      "14.x",
      "12.x",
      "10.x",
      "8.10.x",
    ]).optional(),
    outputDirectory: z.string().max(256).optional(),
    rootDirectory: z.string().max(256).optional(),
    serverlessFunctionRegion: z.string().max(4).optional(),
    skipGitConnectDuringLink: z.boolean().optional(),
    sourceFilesOutsideRootDirectory: z.boolean().optional(),
  }).describe(
    "Project settings that will be applied to the deployment. It is required for the first deployment of a project and will be saved for any following deployments",
  ).optional(),
  target: z.string().describe(
    "Either not defined, `staging`, `production`, or a custom environment identifier. If `staging`, a staging alias in the format `<project>-<team>.vercel.app` will be assigned. If `production`, any aliases defined in `alias` will be assigned. If omitted, the target will be `preview`.",
  ).optional(),
  withLatestCommit: z.boolean().describe(
    "When `true` and `deploymentId` is passed in, the sha from the previous deployment's `gitSource` is removed forcing the latest commit to be used.",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Vercel API token; overrides the VERCEL_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  alias: z.array(z.string()).nullable().optional(),
  aliasAssigned: z.boolean().nullable().optional(),
  aliasError: z.object({
    code: z.string().optional(),
    message: z.string().optional(),
  }).nullable().optional(),
  aliasWarning: z.object({
    action: z.string().optional(),
    code: z.string().optional(),
    link: z.string().optional(),
    message: z.string().optional(),
  }).nullable().optional(),
  duration: z.object({
    endTime: z.number().optional(),
    endTimeCapped: z.number().optional(),
    startTime: z.number().optional(),
    timeForBilling: z.number().optional(),
    timeToContainerExit: z.number().optional(),
    timeToContainerExitCapped: z.number().optional(),
    timeToReady: z.number().optional(),
  }).nullable().optional(),
  errorCode: z.string().nullable().optional(),
  errorMessage: z.string().nullable().optional(),
  id: z.string(),
  readyState: z.string().nullable().optional(),
  target: z.string().nullable().optional(),
  aliasAssignedAt: z.number().nullable().optional(),
  aliasFinal: z.string().nullable().optional(),
  alwaysRefuseToBuild: z.boolean().nullable().optional(),
  atproto: z.object({
    enabled: z.boolean().optional(),
  }).nullable().optional(),
  attribution: z.object({
    commitMeta: z.object({
      email: z.string().optional(),
      isVerified: z.boolean().optional(),
      name: z.string().optional(),
    }).optional(),
    gitUser: z.object({
      id: z.string().optional(),
      login: z.string().optional(),
      provider: z.string().optional(),
      type: z.string().optional(),
    }).optional(),
    vercelUser: z.object({
      id: z.string().optional(),
      teamRoles: z.array(z.string()).optional(),
      username: z.string().optional(),
    }).optional(),
  }).nullable().optional(),
  autoAssignCustomDomains: z.boolean().nullable().optional(),
  automaticAliases: z.array(z.string()).nullable().optional(),
  bootedAt: z.number().nullable().optional(),
  build: z.object({
    env: z.array(z.string()).optional(),
  }).nullable().optional(),
  buildArtifactUrls: z.array(z.string()).nullable().optional(),
  buildContainerFinishedAt: z.number().nullable().optional(),
  buildErrorAt: z.number().nullable().optional(),
  buildingAt: z.number().nullable().optional(),
  builds: z.array(z.object({
    config: z.record(z.string(), z.unknown()).optional(),
    src: z.string().optional(),
    use: z.string().optional(),
  })).nullable().optional(),
  buildSkipped: z.boolean().nullable().optional(),
  canceledAt: z.number().nullable().optional(),
  checks: z.object({
    "deployment-alias": z.object({
      completedAt: z.number().optional(),
      startedAt: z.number().optional(),
      state: z.string().optional(),
    }).optional(),
  }).nullable().optional(),
  checksConclusion: z.string().nullable().optional(),
  checksState: z.string().nullable().optional(),
  config: z.object({
    functionMemoryType: z.string().optional(),
    functionTimeout: z.number().optional(),
    functionType: z.string().optional(),
    isUsingActiveCPU: z.boolean().optional(),
    resourceConfig: z.object({
      buildQueue: z.object({
        configuration: z.string().optional(),
      }).optional(),
      elasticConcurrency: z.string().optional(),
      buildMachine: z.object({
        purchaseType: z.string().optional(),
      }).optional(),
    }).optional(),
    secureComputeFallbackRegion: z.string().optional(),
    secureComputePrimaryRegion: z.string().optional(),
    version: z.number().optional(),
  }).nullable().optional(),
  connectBuildsEnabled: z.boolean().nullable().optional(),
  connectConfigurationId: z.string().nullable().optional(),
  createdAt: z.number().nullable().optional(),
  createdIn: z.string().nullable().optional(),
  creator: z.object({
    avatar: z.string().optional(),
    type: z.string().optional(),
    uid: z.string().optional(),
    username: z.string().optional(),
  }).nullable().optional(),
  crons: z.array(z.object({
    path: z.string().optional(),
    schedule: z.string().optional(),
  })).nullable().optional(),
  customEnvironment: z.object({
    branchMatcher: z.object({
      pattern: z.string().optional(),
      type: z.string().optional(),
    }).optional(),
    createdAt: z.number().optional(),
    currentDeploymentAliases: z.array(z.string()).optional(),
    description: z.string().optional(),
    domains: z.array(z.object({
      apexName: z.string().optional(),
      createdAt: z.number().optional(),
      customEnvironmentId: z.string().optional(),
      gitBranch: z.string().optional(),
      name: z.string().optional(),
      projectId: z.string().optional(),
      redirect: z.string().optional(),
      redirectStatusCode: z.number().optional(),
      updatedAt: z.number().optional(),
      verification: z.array(z.object({
        domain: z.string().optional(),
        reason: z.string().optional(),
        type: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      verified: z.boolean().optional(),
    })).optional(),
    id: z.string().optional(),
    slug: z.string().optional(),
    type: z.string().optional(),
    updatedAt: z.number().optional(),
  }).nullable().optional(),
  defaultRoute: z.string().nullable().optional(),
  deletedAt: z.number().nullable().optional(),
  env: z.array(z.string()).nullable().optional(),
  errorLink: z.string().nullable().optional(),
  errorStep: z.string().nullable().optional(),
  flags: z.object({
    definitions: z.record(z.string(), z.unknown()).optional(),
  }).nullable().optional(),
  functions: z.record(z.string(), z.unknown()).nullable().optional(),
  gitRepo: z.object({
    defaultBranch: z.string().optional(),
    name: z.string().optional(),
    namespace: z.string().optional(),
    ownerType: z.string().optional(),
    path: z.string().optional(),
    private: z.boolean().optional(),
    projectId: z.number().optional(),
    type: z.string().optional(),
    url: z.string().optional(),
  }).nullable().optional(),
  gitSource: z.object({
    prId: z.number().optional(),
    ref: z.string().optional(),
    repoId: z.string().optional(),
    sha: z.string().optional(),
    type: z.string().optional(),
  }).nullable().optional(),
  images: z.object({
    contentDispositionType: z.string().optional(),
    contentSecurityPolicy: z.string().optional(),
    dangerouslyAllowSVG: z.boolean().optional(),
    domains: z.array(z.string()).optional(),
    formats: z.array(z.string()).optional(),
    localPatterns: z.array(z.object({
      pathname: z.string().optional(),
      search: z.string().optional(),
    })).optional(),
    minimumCacheTTL: z.number().optional(),
    qualities: z.array(z.number()).optional(),
    remotePatterns: z.array(z.object({
      hostname: z.string().optional(),
      pathname: z.string().optional(),
      port: z.string().optional(),
      protocol: z.string().optional(),
      search: z.string().optional(),
    })).optional(),
    sizes: z.array(z.number()).optional(),
  }).nullable().optional(),
  initReadyAt: z.number().nullable().optional(),
  inspectorUrl: z.string().nullable().optional(),
  integrations: z.object({
    claimedAt: z.number().optional(),
    completedAt: z.number().optional(),
    skippedAt: z.number().optional(),
    skippedBy: z.string().optional(),
    startedAt: z.number().optional(),
    status: z.string().optional(),
  }).nullable().optional(),
  isFirstBranchDeployment: z.boolean().nullable().optional(),
  isInConcurrentBuildsQueue: z.boolean().nullable().optional(),
  isInstantStatic: z.boolean().nullable().optional(),
  isInSystemBuildsQueue: z.boolean().nullable().optional(),
  lambdas: z.array(z.object({
    createdAt: z.number().optional(),
    entrypoint: z.string().optional(),
    id: z.string().optional(),
    readyState: z.string().optional(),
    readyStateAt: z.number().optional(),
    output: z.array(z.object({
      functionName: z.string().optional(),
      path: z.string().optional(),
    })).optional(),
  })).nullable().optional(),
  manualProvisioning: z.object({
    completedAt: z.number().optional(),
    state: z.string().optional(),
  }).nullable().optional(),
  meta: z.record(z.string(), z.unknown()).nullable().optional(),
  microfrontends: z.object({
    defaultAppProjectName: z.string().optional(),
    defaultRoute: z.string().optional(),
    groupIds: z.array(z.string()).optional(),
    isDefaultApp: z.boolean().optional(),
  }).nullable().optional(),
  monorepoManager: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  nodeVersion: z.string().nullable().optional(),
  oidcTokenClaims: z.object({
    aud: z.string().optional(),
    custom_environment_id: z.string().optional(),
    deployment_id: z.string().optional(),
    environment: z.string().optional(),
    iss: z.string().optional(),
    mfe_group_ids: z.array(z.string()).optional(),
    owner: z.string().optional(),
    owner_id: z.string().optional(),
    plan: z.string().optional(),
    project: z.string().optional(),
    project_id: z.string().optional(),
    scope: z.string().optional(),
    sub: z.string().optional(),
  }).nullable().optional(),
  oomReport: z.string().nullable().optional(),
  originCacheRegion: z.string().nullable().optional(),
  ownerId: z.string().nullable().optional(),
  passiveConnectConfigurationId: z.string().nullable().optional(),
  passiveRegions: z.array(z.string()).nullable().optional(),
  plan: z.string().nullable().optional(),
  platform: z.object({
    creator: z.object({
      avatar: z.string().optional(),
      name: z.string().optional(),
    }).optional(),
    meta: z.record(z.string(), z.unknown()).optional(),
    origin: z.object({
      type: z.string().optional(),
      value: z.string().optional(),
    }).optional(),
    source: z.object({
      name: z.string().optional(),
    }).optional(),
  }).nullable().optional(),
  prebuilt: z.boolean().nullable().optional(),
  previewCommentsEnabled: z.boolean().nullable().optional(),
  project: z.object({
    framework: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
  }).nullable().optional(),
  projectId: z.string().nullable().optional(),
  projectSettings: z.object({
    buildCommand: z.string().optional(),
    commandForIgnoringBuildStep: z.string().optional(),
    devCommand: z.string().optional(),
    framework: z.string().optional(),
    installCommand: z.string().optional(),
    nodeVersion: z.string().optional(),
    outputDirectory: z.string().optional(),
    speedInsights: z.object({
      canceledAt: z.number().optional(),
      dataReceivedAt: z.number().optional(),
      disabledAt: z.number().optional(),
      enabledAt: z.number().optional(),
      hasData: z.boolean().optional(),
      id: z.string().optional(),
      paidAt: z.number().optional(),
    }).optional(),
    vercelFlags: z.object({
      enabledAt: z.number().optional(),
    }).optional(),
    webAnalytics: z.object({
      canceledAt: z.number().optional(),
      disabledAt: z.number().optional(),
      enabledAt: z.number().optional(),
      hasData: z.boolean().optional(),
      id: z.string().optional(),
    }).optional(),
  }).nullable().optional(),
  public: z.boolean().nullable().optional(),
  ready: z.number().nullable().optional(),
  readyStateReason: z.string().nullable().optional(),
  readySubstate: z.string().nullable().optional(),
  regions: z.array(z.string()).nullable().optional(),
  resourceConfig: z.object({
    buildMachine: z.object({
      machineSelectionType: z.string().optional(),
      purchaseType: z.string().optional(),
      cores: z.number().optional(),
      defaultPurchaseType: z.string().optional(),
      memory: z.number().optional(),
      selectionSource: z.string().optional(),
    }).optional(),
  }).nullable().optional(),
  routes: z.array(z.object({
    caseSensitive: z.boolean().optional(),
    check: z.boolean().optional(),
    continue: z.boolean().optional(),
    dest: z.string().optional(),
    destination: z.string().optional(),
    env: z.array(z.string()).optional(),
    has: z.array(z.object({
      type: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
    headers: z.record(z.string(), z.unknown()).optional(),
    important: z.boolean().optional(),
    locale: z.object({
      cookie: z.string().optional(),
      redirect: z.record(z.string(), z.unknown()).optional(),
    }).optional(),
    methods: z.array(z.string()).optional(),
    middleware: z.number().optional(),
    middlewarePath: z.string().optional(),
    middlewareRawSrc: z.array(z.string()).optional(),
    missing: z.array(z.object({
      type: z.string().optional(),
      value: z.string().optional(),
    })).optional(),
    mitigate: z.object({
      action: z.string().optional(),
    }).optional(),
    override: z.boolean().optional(),
    respectOriginCacheControl: z.boolean().optional(),
    source: z.string().optional(),
    src: z.string().optional(),
    status: z.number().optional(),
    statusCode: z.number().optional(),
    transforms: z.array(z.object({
      args: z.string().optional(),
      env: z.array(z.string()).optional(),
      op: z.string().optional(),
      target: z.object({
        key: z.string().optional(),
      }).optional(),
      type: z.string().optional(),
    })).optional(),
  })).nullable().optional(),
  seatBlock: z.object({
    blockCode: z.string().optional(),
    gitProvider: z.string().optional(),
    gitUserId: z.string().optional(),
    isVerified: z.boolean().optional(),
    userId: z.string().optional(),
  }).nullable().optional(),
  services: z.array(z.object({
    buildCommand: z.string().optional(),
    builder: z.object({
      config: z.object({
        buildCommand: z.string().optional(),
        buildpack: z.string().optional(),
        bundle: z.boolean().optional(),
        bunVersion: z.string().optional(),
        daemon: z.object({
          bindings: z.array(z.object({
            env: z.string().optional(),
            format: z.string().optional(),
            service: z.string().optional(),
            type: z.string().optional(),
          })).optional(),
          command: z.array(z.string()).optional(),
          entrypoint: z.string().optional(),
          instances: z.record(z.string(), z.unknown()).optional(),
          livenessProbe: z.object({
            failureThreshold: z.number().optional(),
            httpGet: z.object({
              host: z.string().optional(),
              httpHeaders: z.array(z.object({
                name: z.string().optional(),
                value: z.string().optional(),
              })).optional(),
              path: z.string().optional(),
              port: z.number().optional(),
              scheme: z.string().optional(),
            }).optional(),
            initialDelaySeconds: z.number().optional(),
            periodSeconds: z.number().optional(),
            successThreshold: z.number().optional(),
            timeoutSeconds: z.number().optional(),
          }).optional(),
          replicas: z.record(z.string(), z.unknown()).optional(),
          resources: z.object({
            requests: z.object({
              memory: z.string().optional(),
            }).optional(),
          }).optional(),
          root: z.string().optional(),
          terminationGracePeriodSeconds: z.number().optional(),
          name: z.string().optional(),
        }).optional(),
        debug: z.boolean().optional(),
        devCommand: z.string().optional(),
        excludeFiles: z.string().optional(),
        framework: z.string().optional(),
        functions: z.record(z.string(), z.unknown()).optional(),
        helpers: z.boolean().optional(),
        import: z.record(z.string(), z.unknown()).optional(),
        includeFiles: z.string().optional(),
        installCommand: z.string().optional(),
        ldsflags: z.string().optional(),
        maxLambdaSize: z.string().optional(),
        middleware: z.boolean().optional(),
        middlewareMatcher: z.string().optional(),
        middlewareRuntime: z.string().optional(),
        nodeVersion: z.string().optional(),
        outputDirectory: z.string().optional(),
        projectSettings: z.object({
          autoExposeSystemEnvs: z.boolean().optional(),
          buildCommand: z.string().optional(),
          commandForIgnoringBuildStep: z.string().optional(),
          createdAt: z.number().optional(),
          devCommand: z.string().optional(),
          directoryListing: z.boolean().optional(),
          framework: z.string().optional(),
          gitForkProtection: z.boolean().optional(),
          installCommand: z.string().optional(),
          monorepoManager: z.string().optional(),
          nodeVersion: z.string().optional(),
          outputDirectory: z.string().optional(),
          rootDirectory: z.string().optional(),
          sourceFilesOutsideRootDirectory: z.boolean().optional(),
          vercelFlags: z.object({
            enabledAt: z.number().optional(),
          }).optional(),
        }).optional(),
        rust: z.string().optional(),
        scheduleFunction: z.object({
          entrypoints: z.array(z.object({
            entrypoint: z.string().optional(),
            scheduleNames: z.array(z.string()).optional(),
            sourceFile: z.string().optional(),
          })).optional(),
          outputPath: z.string().optional(),
        }).optional(),
        serviceName: z.string().optional(),
        zeroConfig: z.boolean().optional(),
      }).optional(),
      src: z.string().optional(),
      use: z.string().optional(),
    }).optional(),
    entrypoint: z.string().optional(),
    env: z.record(z.string(), z.unknown()).optional(),
    framework: z.string().optional(),
    group: z.string().optional(),
    handlerFunction: z.string().optional(),
    installCommand: z.string().optional(),
    name: z.string().optional(),
    preDeployCommand: z.string().optional(),
    routePrefix: z.string().optional(),
    routePrefixSource: z.string().optional(),
    runtime: z.string().optional(),
    schedule: z.string().optional(),
    schema: z.string().optional(),
    subdomain: z.string().optional(),
    topics: z.array(z.string()).optional(),
    trigger: z.string().optional(),
    type: z.string().optional(),
    workspace: z.string().optional(),
  })).nullable().optional(),
  softDeletedByRetention: z.boolean().nullable().optional(),
  source: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  team: z.object({
    avatar: z.string().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    slug: z.string().optional(),
  }).nullable().optional(),
  ttyBuildLogs: z.boolean().nullable().optional(),
  type: z.string().nullable().optional(),
  undeletedAt: z.number().nullable().optional(),
  url: z.string().nullable().optional(),
  userAliases: z.array(z.string()).nullable().optional(),
  userConfiguredDeploymentId: z.string().nullable().optional(),
  version: z.number().nullable().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  teamId: z.string().optional(),
  slug: z.string().optional(),
  buildMachine: z.enum(["turbo"]).optional(),
  customEnvironmentSlugOrId: z.string().optional(),
  deploymentId: z.string().optional(),
  files: z.array(z.object({
    data: z.string(),
    encoding: z.enum(["base64", "utf-8"]).optional(),
    file: z.string(),
  })).optional(),
  gitAccessToken: z.string().max(1024).meta({ sensitive: true }).optional(),
  gitMetadata: z.object({
    remoteUrl: z.string().optional(),
    commitAuthorName: z.string().optional(),
    commitAuthorEmail: z.string().optional(),
    commitMessage: z.string().optional(),
    commitRef: z.string().optional(),
    commitSha: z.string().optional(),
    dirty: z.boolean().optional(),
    ci: z.boolean().optional(),
    ciType: z.string().optional(),
    ciGitProviderUsername: z.string().optional(),
    ciGitRepoVisibility: z.string().optional(),
    rootDirectory: z.string().optional(),
  }).optional(),
  gitSource: z.object({
    type: z.enum(["vercel"]),
    repoId: z.string(),
    sha: z.string(),
  }).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
  monorepoManager: z.string().optional(),
  name: z.string().optional(),
  project: z.string().optional(),
  projectSettings: z.object({
    buildCommand: z.string().max(256).optional(),
    commandForIgnoringBuildStep: z.string().max(256).optional(),
    devCommand: z.string().max(256).optional(),
    framework: z.enum([
      "services",
      "container",
      "blitzjs",
      "nextjs",
      "gatsby",
      "remix",
      "react-router",
      "astro",
      "hexo",
      "eleventy",
      "docusaurus-2",
      "docusaurus",
      "preact",
      "solidstart-1",
      "solidstart",
      "dojo",
      "ember",
      "vue",
      "scully",
      "ionic-angular",
      "angular",
      "polymer",
      "svelte",
      "sveltekit",
      "sveltekit-1",
      "ionic-react",
      "create-react-app",
      "gridsome",
      "umijs",
      "sapper",
      "saber",
      "stencil",
      "nuxtjs",
      "redwoodjs",
      "hugo",
      "jekyll",
      "brunch",
      "middleman",
      "zola",
      "hydrogen",
      "vite",
      "tanstack-start",
      "tanstack-start-lovable",
      "vitepress",
      "vuepress",
      "parcel",
      "fastapi",
      "flask",
      "fasthtml",
      "django",
      "ash",
      "factory-eve",
      "eve",
      "sanity",
      "sanity-v2",
      "storybook",
      "nitro",
      "hono",
      "express",
      "h3",
      "koa",
      "nestjs",
      "elysia",
      "fastify",
      "xmcp",
      "python",
      "ruby",
      "rust",
      "axum",
      "actix-web",
      "bun",
      "node",
      "go",
      "mastra",
    ]).optional(),
    installCommand: z.string().max(256).optional(),
    nodeVersion: z.enum([
      "26.x",
      "24.x",
      "22.x",
      "20.x",
      "18.x",
      "16.x",
      "14.x",
      "12.x",
      "10.x",
      "8.10.x",
    ]).optional(),
    outputDirectory: z.string().max(256).optional(),
    rootDirectory: z.string().max(256).optional(),
    serverlessFunctionRegion: z.string().max(4).optional(),
    skipGitConnectDuringLink: z.boolean().optional(),
    sourceFilesOutsideRootDirectory: z.boolean().optional(),
  }).optional(),
  target: z.string().optional(),
  withLatestCommit: z.boolean().optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Vercel Deployments. Registered at `@swamp/vercel/deployments/deployments`. */
export const model = {
  type: "@swamp/vercel/deployments/deployments",
  version: "2026.10.28.1",
  upgrades: [
    {
      toVersion: "2026.08.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.02.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.04.1",
      description: "Added: gitAccessToken",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.19.1",
      description: "Added: gitAccessToken",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.12.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.17.1",
      description: "Added: buildMachine",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.02.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.20.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.20.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.28.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Deployments resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    lookupResult: {
      description: "Outcome of the most recent lookup",
      schema: z.object({
        found: z.boolean(),
        filters: z.record(z.string(), z.string()),
        id: z.string().optional(),
      }),
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Deployments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["name"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/v13/deployments";
        const body: Record<string, unknown> = {};
        if (g.buildMachine !== undefined) body.buildMachine = g.buildMachine;
        if (g.customEnvironmentSlugOrId !== undefined) {
          body.customEnvironmentSlugOrId = g.customEnvironmentSlugOrId;
        }
        if (g.deploymentId !== undefined) body.deploymentId = g.deploymentId;
        if (g.files !== undefined) body.files = g.files;
        if (g.gitAccessToken !== undefined) {
          body.gitAccessToken = g.gitAccessToken;
        }
        if (g.gitMetadata !== undefined) body.gitMetadata = g.gitMetadata;
        if (g.gitSource !== undefined) body.gitSource = g.gitSource;
        if (g.meta !== undefined) body.meta = g.meta;
        if (g.monorepoManager !== undefined) {
          body.monorepoManager = g.monorepoManager;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.project !== undefined) body.project = g.project;
        if (g.projectSettings !== undefined) {
          body.projectSettings = g.projectSettings;
        }
        if (g.target !== undefined) body.target = g.target;
        if (g.withLatestCommit !== undefined) {
          body.withLatestCommit = g.withLatestCommit;
        }
        const raw = await create(endpoint, body, { token: g.token }, {
          teamId: g.teamId,
          slug: g.slug,
        });
        const result = raw as ResourceData;
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
      description: "Get a Deployments",
      arguments: z.object({
        id: z.string().describe("The ID of the Deployments"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v13/deployments";
        const result = await read(endpoint, args.id, { token: g.token }, {
          teamId: g.teamId,
          slug: g.slug,
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
    lookup: {
      description:
        "Look up an existing Deployments by matching global argument values and import it into state",
      arguments: z.object({
        allowMissing: z.boolean().optional().describe(
          "Succeed and record found: false in lookupResult when nothing matches, instead of failing",
        ),
      }),
      execute: async (args: { allowMissing?: boolean }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v7/deployments";
        const filters: [string, string, string][] = [];
        if (g.name !== undefined) {
          filters.push(["name", String(g.name), "name"]);
        }
        if (g.project !== undefined) {
          filters.push(["projectId", String(g.project), "project"]);
        }
        if (g.target !== undefined) {
          filters.push(["target", String(g.target), "target"]);
        }
        if (g.aliasAssigned !== undefined) {
          filters.push([
            "aliasAssigned",
            String(g.aliasAssigned),
            "aliasAssigned",
          ]);
        }
        if (g.errorCode !== undefined) {
          filters.push(["errorCode", String(g.errorCode), "errorCode"]);
        }
        if (g.errorMessage !== undefined) {
          filters.push([
            "errorMessage",
            String(g.errorMessage),
            "errorMessage",
          ]);
        }
        if (g.id !== undefined) filters.push(["uid", String(g.id), "id"]);
        if (g.readyState !== undefined) {
          filters.push(["readyState", String(g.readyState), "readyState"]);
        }
        if (g.buildingAt !== undefined) {
          filters.push(["buildingAt", String(g.buildingAt), "buildingAt"]);
        }
        if (g.checksConclusion !== undefined) {
          filters.push([
            "checksConclusion",
            String(g.checksConclusion),
            "checksConclusion",
          ]);
        }
        if (g.checksState !== undefined) {
          filters.push(["checksState", String(g.checksState), "checksState"]);
        }
        if (g.connectBuildsEnabled !== undefined) {
          filters.push([
            "connectBuildsEnabled",
            String(g.connectBuildsEnabled),
            "connectBuildsEnabled",
          ]);
        }
        if (g.connectConfigurationId !== undefined) {
          filters.push([
            "connectConfigurationId",
            String(g.connectConfigurationId),
            "connectConfigurationId",
          ]);
        }
        if (g.createdAt !== undefined) {
          filters.push(["createdAt", String(g.createdAt), "createdAt"]);
        }
        if (g.defaultRoute !== undefined) {
          filters.push([
            "defaultRoute",
            String(g.defaultRoute),
            "defaultRoute",
          ]);
        }
        if (g.inspectorUrl !== undefined) {
          filters.push([
            "inspectorUrl",
            String(g.inspectorUrl),
            "inspectorUrl",
          ]);
        }
        if (g.oomReport !== undefined) {
          filters.push(["oomReport", String(g.oomReport), "oomReport"]);
        }
        if (g.passiveConnectConfigurationId !== undefined) {
          filters.push([
            "passiveConnectConfigurationId",
            String(g.passiveConnectConfigurationId),
            "passiveConnectConfigurationId",
          ]);
        }
        if (g.prebuilt !== undefined) {
          filters.push(["prebuilt", String(g.prebuilt), "prebuilt"]);
        }
        if (g.projectId !== undefined) {
          filters.push(["projectId", String(g.projectId), "projectId"]);
        }
        if (g.ready !== undefined) {
          filters.push(["ready", String(g.ready), "ready"]);
        }
        if (g.readySubstate !== undefined) {
          filters.push([
            "readySubstate",
            String(g.readySubstate),
            "readySubstate",
          ]);
        }
        if (g.softDeletedByRetention !== undefined) {
          filters.push([
            "softDeletedByRetention",
            String(g.softDeletedByRetention),
            "softDeletedByRetention",
          ]);
        }
        if (g.source !== undefined) {
          filters.push(["source", String(g.source), "source"]);
        }
        if (g.type !== undefined) {
          filters.push(["type", String(g.type), "type"]);
        }
        if (g.url !== undefined) filters.push(["url", String(g.url), "url"]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(
          endpoint,
          "cursor",
          { token: g.token },
          { teamId: g.teamId, slug: g.slug },
          undefined,
          "until",
        );
        const matches = items.filter((item) => {
          for (const [key, val] of filters) {
            if (String((item as Record<string, unknown>)[key]) !== val) {
              return false;
            }
          }
          return true;
        });
        const resultName = `lookup-${
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "")
        }`;
        if (matches.length === 0) {
          if (args.allowMissing) {
            const missHandle = await context.writeResource(
              "lookupResult",
              resultName,
              {
                found: false,
                filters: Object.fromEntries(
                  filters.map(([, v, arg]) => [arg, v]),
                ),
              },
            );
            return { dataHandles: [missHandle] };
          }
          const filterDesc = filters.map(([k, v, arg]) =>
            `${arg}=${JSON.stringify(v)}${
              arg === k ? "" : ` (matched against ${k})`
            }`
          ).join(", ");
          throw new Error(
            `No deployments found matching filters: ${filterDesc}`,
          );
        }
        if (matches.length > 1) {
          const filterDesc = filters.map(([k, v, arg]) =>
            `${arg}=${JSON.stringify(v)}${
              arg === k ? "" : ` (matched against ${k})`
            }`
          ).join(", ");
          throw new Error(
            `Expected exactly 1 match, found ${matches.length} for filters: ${filterDesc}`,
          );
        }
        const result = matches[0] as ResourceData;
        const instanceName =
          (g.name?.toString() ?? result.uid?.toString() ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        const resultHandle = await context.writeResource(
          "lookupResult",
          resultName,
          {
            found: true,
            filters: Object.fromEntries(filters.map(([, v, arg]) => [arg, v])),
            id: result.uid?.toString(),
          },
        );
        return { dataHandles: [handle, resultHandle] };
      },
    },
    adopt: {
      description:
        "Import an existing Deployments by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Deployments to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v13/deployments";
        const result = await read(endpoint, args.id, { token: g.token }, {
          teamId: g.teamId,
          slug: g.slug,
        }) as ResourceData;
        const instanceName =
          (result.name?.toString() ?? g.name?.toString() ?? args.id).replace(
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
      description: "Delete the Deployments",
      arguments: z.object({
        id: z.string().describe("The ID of the Deployments"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v13/deployments";
        const { existed } = await remove(
          endpoint,
          args.id,
          { token: g.token },
          { teamId: g.teamId, slug: g.slug },
        );
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
      description: "Sync Deployments state from Vercel",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Deployments by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/v13/deployments";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const existingId = existing.id ?? existing.uid;
        if (!existingId) {
          throw new Error("Stored state has no id or uid - cannot sync");
        }
        const result = await tryRead(endpoint, existingId, { token: g.token }, {
          teamId: g.teamId,
          slug: g.slug,
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
          id: existingId,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
